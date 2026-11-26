// =====================================================
// MIDI-EINGABE & GERÄTESTEUERUNG (js/midi.js)
// Unterstützt USB-MIDI & Bluetooth-LE-MIDI über:
//  1) Natives Android-Plugin (MidiInputPlugin.java via Capacitor)
//  2) Web MIDI API (Chrome, Edge, Firefox, Brave, Opera)
// Sendet auf Wunsch CC 122 = 0 (Local Control Off), damit das
// Digitalpiano stumm bleibt und stattdessen die App-Klänge erklingen,
// und stellt beim Deaktivieren/Hintergrund CC 122 = 127 wieder her.
// =====================================================

const MIDI_PREFS_STORAGE_KEY = "lauschebaer_midi_prefs_v1";

const DEFAULT_MIDI_PREFS = Object.freeze({
  enabled: false,
  selectedDeviceId: "all",
  appSound: true,            // Standard: App-eigene Klänge beim MIDI-Spiel
  localControlOff: true,     // Standard: CC 122 = 0 ans E-Piano senden (Eigenklang aus)
  notationExactOctave: true  // Standard: beim Notenlesen die echte Oktave verlangen
});

const _midi = {
  prefs: { ...DEFAULT_MIDI_PREFS },
  transport: "none",         // "native" | "web" | "none"
  status: "idle",            // "idle" | "unsupported" | "permission-denied" | "ready" | "connected"
  webAccess: null,
  nativeListenersBound: false,
  devices: [],               // [{ id, name, manufacturer, type, hasInput, hasOutput }]
  activeNotes: new Set(),    // aktuell gedrückte MIDI-Notennummern (physisch)
  sustainedNotes: new Set(), // über Sustain-Pedal (CC 64) gehaltene Noten
  sustainDown: false,
  lastNoteAt: new Map(),     // Entprellung gegen doppelt geroutete Ports (midi -> ms)
  lastEventText: "",
  bleScanning: false,
  bleFoundDevices: [],       // [{ address, name }]
  bleStatusText: "",
  chipPulseTimer: 0,
  localControlApplied: false,
  notationChordHeld: new Set()
};

// ---------- Reine, testbare Protokoll- & Bewertungsfunktionen ----------

/**
 * Zerlegt 1–3 Bytes (oder einen ganzen Byte-Puffer) einer MIDI-Nachricht.
 * Wandelt Note-On mit Velocity 0 sauber in Note-Off um und filtert Echtzeit/SysEx.
 */
function parseMidiMessageBytes(bytes) {
  if (!bytes || typeof bytes.length !== "number" || bytes.length === 0) return [];
  const events = [];
  let runningStatus = 0;
  let i = 0;
  const len = bytes.length;

  while (i < len) {
    const b = bytes[i] & 0xFF;
    if (b >= 0xF8) {
      i++;
      continue;
    }
    if (b === 0xF0) {
      runningStatus = 0;
      i++;
      while (i < len && (bytes[i] & 0xFF) !== 0xF7) i++;
      if (i < len) i++;
      continue;
    }
    if (b >= 0xF1) {
      runningStatus = 0;
      if (b === 0xF1 || b === 0xF3) i += 2;
      else if (b === 0xF2) i += 3;
      else i += 1;
      continue;
    }

    let status;
    if ((b & 0x80) !== 0) {
      status = b;
      runningStatus = status;
      i++;
    } else {
      status = runningStatus;
      if (!status) {
        i++;
        continue;
      }
    }

    const high = status & 0xF0;
    const channel = status & 0x0F;
    const dataLen = (high === 0xC0 || high === 0xD0) ? 1 : 2;
    if (i + dataLen > len) break;

    const d1 = bytes[i] & 0x7F;
    const d2 = dataLen === 2 ? (bytes[i + 1] & 0x7F) : 0;
    i += dataLen;

    if (high === 0x90) {
      if (d2 === 0) {
        events.push({ type: "noteoff", midi: d1, velocity: 0, channel });
      } else {
        events.push({ type: "noteon", midi: d1, velocity: d2, channel });
      }
    } else if (high === 0x80) {
      events.push({ type: "noteoff", midi: d1, velocity: d2, channel });
    } else if (high === 0xB0) {
      events.push({ type: "cc", cc: d1, value: d2, channel });
    }
  }
  return events;
}

/**
 * Vergleicht eine gespielte MIDI-Note mit einer Zielnote im Notenlesen.
 * Mit exactOctave: true muss neben der Tonklasse auch die genaue Oktave stimmen.
 */
function evaluateMidiNotationMatch(target, playedMidi, options = {}) {
  const exactOctave = options.exactOctave !== false;
  const pMidi = Math.round(Number(playedMidi));
  if (!target || !Number.isFinite(pMidi) || pMidi < 0 || pMidi > 127) {
    return { ok: false, status: "wrong", octaveDiff: 0, expectedMidi: null, playedMidi: pMidi };
  }
  const targetMidi = Number.isFinite(Number(target.midi)) ? Math.round(Number(target.midi)) : null;
  const targetPc = Number.isFinite(Number(target.pc))
    ? ((Math.round(Number(target.pc)) % 12) + 12) % 12
    : (targetMidi !== null ? ((targetMidi % 12) + 12) % 12 : -1);
  const playedPc = ((pMidi % 12) + 12) % 12;

  if (playedPc !== targetPc) {
    return {
      ok: false,
      status: "wrong",
      octaveDiff: 0,
      expectedMidi: targetMidi,
      playedMidi: pMidi
    };
  }

  if (!exactOctave || targetMidi === null) {
    return {
      ok: true,
      status: "correct",
      octaveDiff: targetMidi !== null ? Math.round((pMidi - targetMidi) / 12) : 0,
      expectedMidi: targetMidi,
      playedMidi: pMidi
    };
  }

  const diffSemis = pMidi - targetMidi;
  if (diffSemis === 0) {
    return {
      ok: true,
      status: "correct",
      octaveDiff: 0,
      expectedMidi: targetMidi,
      playedMidi: pMidi
    };
  }

  return {
    ok: false,
    status: "wrong-octave",
    octaveDiff: Math.round(diffSemis / 12),
    expectedMidi: targetMidi,
    playedMidi: pMidi
  };
}

/**
 * Prüft eine Menge gehaltener MIDI-Noten gegen einen Ziel-Akkord.
 * Unterstützt exakte Noten (z. B. Notenlesen-Akkorde mit Oktave) sowie
 * Tonklassen-Prüfung mit optionaler Basston-Pflicht (Umkehrungen).
 */
function evaluateMidiChordMatch(targetMidis, heldMidis, options = {}) {
  const requireExactMidis = Boolean(options.requireExactMidis);
  const requireBassPc = options.requireBassPc !== undefined && options.requireBassPc !== null
    ? (((Math.round(Number(options.requireBassPc)) % 12) + 12) % 12)
    : null;

  const cleanTarget = Array.from(new Set(
    (Array.isArray(targetMidis) ? targetMidis : []).map(n => Math.round(Number(n))).filter(Number.isFinite)
  )).sort((a, b) => a - b);
  const cleanHeld = Array.from(new Set(
    (Array.isArray(heldMidis) ? heldMidis : []).map(n => Math.round(Number(n))).filter(Number.isFinite)
  )).sort((a, b) => a - b);

  if (cleanTarget.length === 0) {
    return { ok: false, status: "incomplete", matchedCount: 0, totalCount: 0, extraMidis: [], missingMidis: [] };
  }

  if (requireExactMidis) {
    const targetSet = new Set(cleanTarget);
    const heldSet = new Set(cleanHeld);
    const extraMidis = cleanHeld.filter(m => !targetSet.has(m));
    const missingMidis = cleanTarget.filter(m => !heldSet.has(m));
    const matchedCount = cleanTarget.length - missingMidis.length;
    if (missingMidis.length === 0 && extraMidis.length === 0) {
      return { ok: true, status: "correct", matchedCount, totalCount: cleanTarget.length, extraMidis, missingMidis };
    }
    if (extraMidis.length > 0) {
      // Prüfen, ob nur die Oktave verschoben ist (alle Tonklassen passen!)
      const targetPcs = new Set(cleanTarget.map(m => ((m % 12) + 12) % 12));
      const heldPcs = new Set(cleanHeld.map(m => ((m % 12) + 12) % 12));
      const samePcs = targetPcs.size === heldPcs.size && [...targetPcs].every(pc => heldPcs.has(pc));
      return {
        ok: false,
        status: samePcs ? "wrong-octave" : "wrong-notes",
        matchedCount,
        totalCount: cleanTarget.length,
        extraMidis,
        missingMidis
      };
    }
    return { ok: false, status: "incomplete", matchedCount, totalCount: cleanTarget.length, extraMidis, missingMidis };
  }

  const targetPcs = Array.from(new Set(cleanTarget.map(m => ((m % 12) + 12) % 12)));
  const targetPcSet = new Set(targetPcs);
  const heldPcs = Array.from(new Set(cleanHeld.map(m => ((m % 12) + 12) % 12)));
  const heldPcSet = new Set(heldPcs);

  const extraMidis = cleanHeld.filter(m => !targetPcSet.has(((m % 12) + 12) % 12));
  const missingPcs = targetPcs.filter(pc => !heldPcSet.has(pc));
  const matchedCount = targetPcs.length - missingPcs.length;

  if (extraMidis.length > 0) {
    return { ok: false, status: "wrong-notes", matchedCount, totalCount: targetPcs.length, extraMidis, missingMidis: missingPcs };
  }
  if (missingPcs.length > 0) {
    return { ok: false, status: "incomplete", matchedCount, totalCount: targetPcs.length, extraMidis, missingMidis: missingPcs };
  }

  if (requireBassPc !== null && cleanHeld.length > 0) {
    const lowestPc = ((cleanHeld[0] % 12) + 12) % 12;
    if (lowestPc !== requireBassPc) {
      return {
        ok: false,
        status: "wrong-bass",
        matchedCount,
        totalCount: targetPcs.length,
        extraMidis: [],
        missingMidis: [],
        playedBassPc: lowestPc,
        expectedBassPc: requireBassPc
      };
    }
  }

  return { ok: true, status: "correct", matchedCount, totalCount: targetPcs.length, extraMidis: [], missingMidis: [] };
}

function formatMidiNoteDisplay(midi) {
  const m = Math.round(Number(midi));
  if (!Number.isFinite(m) || m < 0 || m > 127) return "?";
  const pc = ((m % 12) + 12) % 12;
  const oct = Math.floor(m / 12) - 1;
  const useGerman = typeof isGermanNotationActive === "function" ? isGermanNotationActive() : false;
  const names = useGerman
    ? ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B", "H"]
    : ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
  return `${names[pc]}${oct}`;
}

// ---------- Persistenz (gerätespezifisch) ----------

function loadMidiPrefs() {
  try {
    const raw = localStorage.getItem(MIDI_PREFS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_MIDI_PREFS };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { ...DEFAULT_MIDI_PREFS };
    return {
      enabled: Boolean(parsed.enabled),
      selectedDeviceId: typeof parsed.selectedDeviceId === "string" && parsed.selectedDeviceId ? parsed.selectedDeviceId : "all",
      appSound: parsed.appSound !== undefined ? Boolean(parsed.appSound) : true,
      localControlOff: parsed.localControlOff !== undefined ? Boolean(parsed.localControlOff) : true,
      notationExactOctave: parsed.notationExactOctave !== undefined ? Boolean(parsed.notationExactOctave) : true
    };
  } catch (e) {
    return { ...DEFAULT_MIDI_PREFS };
  }
}

function saveMidiPrefs() {
  try {
    localStorage.setItem(MIDI_PREFS_STORAGE_KEY, JSON.stringify(_midi.prefs));
  } catch (e) {}
}

function getMidiPrefs() {
  return _midi.prefs;
}

function isMidiEnabled() {
  return Boolean(_midi.prefs.enabled);
}

function isMidiConnected() {
  return Boolean(_midi.prefs.enabled && getSelectedMidiDevices().length > 0);
}

function getSelectedMidiDevices() {
  if (!Array.isArray(_midi.devices)) return [];
  const inputs = _midi.devices.filter(d => d.hasInput !== false);
  if (_midi.prefs.selectedDeviceId === "all") return inputs;
  const exact = inputs.filter(d => d.id === _midi.prefs.selectedDeviceId);
  return exact.length > 0 ? exact : inputs;
}

function getNativeMidiPlugin() {
  if (typeof getCapacitorNativePlugin === "function") {
    return getCapacitorNativePlugin("MidiInput");
  }
  return typeof window !== "undefined" ? (window.Capacitor?.Plugins?.MidiInput || null) : null;
}

function detectMidiTransport() {
  const nativePlugin = getNativeMidiPlugin();
  if (nativePlugin && typeof nativePlugin.start === "function") {
    return "native";
  }
  if (typeof navigator !== "undefined" && typeof navigator.requestMIDIAccess === "function") {
    return "web";
  }
  return "none";
}

function getMidiHeldNotesArray() {
  const combined = new Set([..._midi.activeNotes, ..._midi.sustainedNotes]);
  return Array.from(combined).sort((a, b) => a - b);
}

function clearMidiHeldNotes() {
  _midi.activeNotes.clear();
  _midi.sustainedNotes.clear();
  _midi.sustainDown = false;
  _midi.notationChordHeld.clear();
}

// ---------- Local Control (CC 122 = 0 Aus / 127 Ein) ----------

function shouldSilenceExternalKeyboard() {
  return Boolean(_midi.prefs.enabled && _midi.prefs.appSound && _midi.prefs.localControlOff);
}

function sendMidiRawMessage(bytes, deviceId = null) {
  const targetId = deviceId || _midi.prefs.selectedDeviceId || "all";
  if (_midi.transport === "native") {
    const plugin = getNativeMidiPlugin();
    if (!plugin || typeof plugin.sendMessage !== "function") return;
    Promise.resolve(plugin.sendMessage({ deviceId: targetId, data: Array.from(bytes) })).catch(() => {});
    return;
  }
  if (_midi.transport === "web" && _midi.webAccess && _midi.webAccess.outputs) {
    _midi.webAccess.outputs.forEach(output => {
      if (!output || output.state !== "connected") return;
      if (targetId !== "all" && output.id !== targetId) {
        // Bei Web MIDI haben Input und Output teils leicht abweichende IDs aber denselben Namen
        const selectedDev = _midi.devices.find(d => d.id === targetId);
        if (!selectedDev || output.name !== selectedDev.name) return;
      }
      try {
        output.send(bytes);
      } catch (e) {}
    });
  }
}

/**
 * Sendet MIDI CC 122 (Local Control): 0 = Tastatur-Eigenklang aus, 127 = wieder an.
 * Sendet auf Kanal 1 (und 2–16 für Split/Multi-Channel-Keyboards).
 */
function applyMidiLocalControl(silenceKeyboard) {
  if (!_midi.devices.length) {
    _midi.localControlApplied = false;
    return;
  }
  const value = silenceKeyboard ? 0 : 127;
  // Kanal 0 (MIDI-Kanal 1) ist Standard bei fast allen Digitalpianos;
  // zusätzlich senden wir es kompakt auf allen 16 Kanälen bei Local Control Off/On,
  // falls ein Keyboard auf einem anderen Sendekanal steht.
  for (let ch = 0; ch < 16; ch++) {
    sendMidiRawMessage([0xB0 | ch, 122, value]);
  }
  _midi.localControlApplied = Boolean(silenceKeyboard);
}

function syncMidiLocalControlState() {
  if (!_midi.prefs.enabled) {
    if (_midi.localControlApplied) applyMidiLocalControl(false);
    return;
  }
  const wantSilent = shouldSilenceExternalKeyboard();
  if (wantSilent) {
    applyMidiLocalControl(true);
  } else if (_midi.localControlApplied) {
    applyMidiLocalControl(false);
  }
}

// ---------- App-Klang bei MIDI-Eingabe ----------

function playMidiAppTone(midi, velocity = 90, durSec = 0.85) {
  if (!_midi.prefs.appSound) return;
  if (typeof audioEngine === "undefined" || !audioEngine) return;
  if (typeof prepareAudioNonBlocking === "function") prepareAudioNonBlocking();
  const noteName = typeof midiToNote === "function" ? midiToNote(midi) : null;
  if (!noteName) return;
  const velNorm = Math.max(0.28, Math.min(1.0, 0.25 + (Math.max(1, Math.min(127, velocity)) / 127) * 0.75));
  audioEngine.playStep([noteName], durSec, null, "interval", { velocity: velNorm });
}

// ---------- Verbindung aufbauen & beenden ----------

async function enableMidiInput(fromUserGesture = true) {
  _midi.transport = detectMidiTransport();
  if (_midi.transport === "none") {
    _midi.status = "unsupported";
    _midi.prefs.enabled = false;
    saveMidiPrefs();
    syncAllMidiUI();
    return false;
  }

  _midi.prefs.enabled = true;
  saveMidiPrefs();

  if (_midi.transport === "native") {
    return enableNativeMidiTransport();
  }
  return enableWebMidiTransport(fromUserGesture);
}

async function disableMidiInput() {
  stopNativeBleScan();
  if (_midi.localControlApplied) {
    applyMidiLocalControl(false);
  }
  clearMidiHeldNotes();
  _midi.prefs.enabled = false;
  saveMidiPrefs();

  if (_midi.transport === "web" && _midi.webAccess) {
    try {
      _midi.webAccess.inputs.forEach(input => {
        input.onmidimessage = null;
      });
    } catch (e) {}
  } else if (_midi.transport === "native") {
    const plugin = getNativeMidiPlugin();
    if (plugin && typeof plugin.stop === "function") {
      try { await plugin.stop(); } catch (e) {}
    }
  }

  _midi.devices = [];
  _midi.status = "idle";
  _midi.lastEventText = "";
  syncAllMidiUI();
}

async function enableWebMidiTransport() {
  try {
    const access = await navigator.requestMIDIAccess({ sysex: false });
    _midi.webAccess = access;
    access.onstatechange = () => {
      refreshWebMidiDevices();
    };
    refreshWebMidiDevices();
    return true;
  } catch (err) {
    _midi.status = "permission-denied";
    _midi.prefs.enabled = false;
    saveMidiPrefs();
    syncAllMidiUI();
    return false;
  }
}

function refreshWebMidiDevices() {
  if (!_midi.webAccess || !_midi.prefs.enabled) return;
  const list = [];
  const outputNames = new Set();
  _midi.webAccess.outputs.forEach(out => {
    if (out && out.state === "connected") outputNames.add(out.name || out.id);
  });

  _midi.webAccess.inputs.forEach(input => {
    if (!input || input.state !== "connected") return;
    const devId = input.id;
    const devName = (input.name || "MIDI").trim();
    list.push({
      id: devId,
      name: devName,
      manufacturer: (input.manufacturer || "").trim(),
      type: /bluetooth|ble/i.test(devName) ? "bluetooth" : "usb",
      hasInput: true,
      hasOutput: outputNames.has(devName) || _midi.webAccess.outputs.size > 0
    });
    input.onmidimessage = (ev) => {
      if (!_midi.prefs.enabled) return;
      if (_midi.prefs.selectedDeviceId !== "all" && devId !== _midi.prefs.selectedDeviceId) return;
      const parsed = parseMidiMessageBytes(ev.data);
      parsed.forEach(msg => handleParsedMidiEvent(msg, devId, devName));
    };
  });

  _midi.devices = list;
  _midi.status = list.length > 0 ? "connected" : "ready";
  if (list.length > 0 && shouldSilenceExternalKeyboard()) {
    applyMidiLocalControl(true);
  }
  syncAllMidiUI();
}

async function enableNativeMidiTransport() {
  const plugin = getNativeMidiPlugin();
  if (!plugin) {
    _midi.status = "unsupported";
    syncAllMidiUI();
    return false;
  }

  if (!_midi.nativeListenersBound && typeof plugin.addListener === "function") {
    _midi.nativeListenersBound = true;
    plugin.addListener("midiMessage", (ev) => {
      if (!_midi.prefs.enabled || !ev) return;
      const devId = String(ev.deviceId || "");
      const devName = String(ev.deviceName || "MIDI");
      if (_midi.prefs.selectedDeviceId !== "all" && devId !== _midi.prefs.selectedDeviceId) return;
      const parsed = parseMidiMessageBytes([ev.status & 0xFF, ev.data1 & 0x7F, ev.data2 & 0x7F]);
      parsed.forEach(msg => handleParsedMidiEvent(msg, devId, devName));
    });
    plugin.addListener("midiDevicesChanged", (ev) => {
      if (!_midi.prefs.enabled) return;
      updateNativeDeviceList(ev?.devices || []);
    });
    plugin.addListener("bleDeviceFound", (ev) => {
      if (!ev || !ev.address) return;
      if (!_midi.bleFoundDevices.some(d => d.address === ev.address)) {
        _midi.bleFoundDevices.push({ address: ev.address, name: ev.name || ev.address });
        renderMidiBleDevicesUI();
      }
    });
    plugin.addListener("bleScanState", (ev) => {
      _midi.bleScanning = Boolean(ev?.scanning);
      renderMidiBleDevicesUI();
    });
  }

  try {
    const res = await plugin.start();
    updateNativeDeviceList(res?.devices || []);
    return true;
  } catch (err) {
    _midi.status = err?.code === "PERMISSION_DENIED" ? "permission-denied" : "unsupported";
    _midi.prefs.enabled = false;
    saveMidiPrefs();
    syncAllMidiUI();
    return false;
  }
}

function updateNativeDeviceList(rawDevices) {
  const list = Array.isArray(rawDevices) ? rawDevices.map(d => ({
    id: String(d.id || ""),
    name: String(d.name || "MIDI").trim(),
    manufacturer: String(d.manufacturer || "").trim(),
    type: String(d.type || "usb"),
    hasInput: d.hasInput !== false,
    hasOutput: Boolean(d.hasOutput)
  })) : [];
  _midi.devices = list;
  _midi.status = list.length > 0 ? "connected" : "ready";
  if (list.length > 0 && shouldSilenceExternalKeyboard()) {
    applyMidiLocalControl(true);
  }
  syncAllMidiUI();
}

// ---------- Native Android BLE-MIDI Suche & Verbindung ----------

async function startNativeBleScan() {
  const plugin = getNativeMidiPlugin();
  if (!plugin || typeof plugin.scanBluetoothDevices !== "function") return;
  _midi.bleFoundDevices = [];
  _midi.bleStatusText = tr("Suche nach Bluetooth-MIDI-Instrumenten …", "Searching for Bluetooth MIDI instruments …");
  _midi.bleScanning = true;
  renderMidiBleDevicesUI();
  try {
    await plugin.scanBluetoothDevices();
  } catch (err) {
    _midi.bleScanning = false;
    const code = String(err?.code || "");
    if (code === "BLUETOOTH_OFF") {
      _midi.bleStatusText = tr("Bitte schalte Bluetooth auf deinem Gerät ein.", "Please turn on Bluetooth on your device.");
    } else if (code === "PERMISSION_DENIED") {
      _midi.bleStatusText = tr("Bluetooth-Berechtigung verweigert – erlaube „Geräte in der Nähe“ in den Android-Einstellungen.", "Bluetooth permission denied — allow “Nearby devices” in Android settings.");
    } else {
      _midi.bleStatusText = tr("Bluetooth-Suche konnte nicht gestartet werden.", "Could not start Bluetooth scan.");
    }
    renderMidiBleDevicesUI();
  }
}

function stopNativeBleScan() {
  if (!_midi.bleScanning) return;
  _midi.bleScanning = false;
  const plugin = getNativeMidiPlugin();
  if (plugin && typeof plugin.stopBluetoothScan === "function") {
    Promise.resolve(plugin.stopBluetoothScan()).catch(() => {});
  }
  renderMidiBleDevicesUI();
}

async function connectNativeBleDevice(address, name) {
  const plugin = getNativeMidiPlugin();
  if (!plugin || typeof plugin.connectBluetoothDevice !== "function") return;
  _midi.bleStatusText = tf("Verbinde mit {name} …", "Connecting to {name} …", { name });
  renderMidiBleDevicesUI();
  try {
    const res = await plugin.connectBluetoothDevice({ address });
    _midi.bleStatusText = tf("Verbunden mit {name}!", "Connected to {name}!", { name });
    updateNativeDeviceList(res?.devices || []);
    if (typeof showAppToast === "function") {
      showAppToast(tf("MIDI verbunden: {name}", "MIDI connected: {name}", { name }), "success");
    }
  } catch (err) {
    _midi.bleStatusText = tr("Verbindung fehlgeschlagen – schalte Bluetooth-MIDI am Instrument ein und versuche es erneut.", "Connection failed — make sure Bluetooth MIDI is on at your instrument and try again.");
    renderMidiBleDevicesUI();
  }
}

// ---------- Zentrale MIDI-Nachrichtenverarbeitung & Routing ----------

function handleParsedMidiEvent(msg, deviceId, deviceName) {
  if (!msg) return;
  const nowMs = typeof performance !== "undefined" ? performance.now() : Date.now();

  if (msg.type === "cc") {
    if (msg.cc === 64) {
      const down = msg.value >= 64;
      if (down !== _midi.sustainDown) {
        _midi.sustainDown = down;
        if (!down) {
          _midi.sustainedNotes.forEach(m => {
            if (!_midi.activeNotes.has(m)) {
              dispatchMidiNoteOff(m);
            }
          });
          _midi.sustainedNotes.clear();
        }
        if (state?.currentView === "freeplay" && typeof handleFreeplayMidiSustain === "function") {
          handleFreeplayMidiSustain(down);
        }
      }
    }
    return;
  }

  if (msg.type === "noteoff") {
    _midi.activeNotes.delete(msg.midi);
    if (_midi.sustainDown) {
      _midi.sustainedNotes.add(msg.midi);
    } else {
      dispatchMidiNoteOff(msg.midi);
    }
    return;
  }

  if (msg.type === "noteon") {
    // Entprellung gegen doppelt geroutete Ports (20 ms)
    const prevAt = _midi.lastNoteAt.get(msg.midi) || 0;
    if (nowMs - prevAt < 20) return;
    _midi.lastNoteAt.set(msg.midi, nowMs);

    _midi.activeNotes.add(msg.midi);
    _midi.sustainedNotes.delete(msg.midi);
    pulseMidiStatusChips();

    const noteLbl = formatMidiNoteDisplay(msg.midi);
    _midi.lastEventText = `${noteLbl} · ${tr("Anschlag", "Vel")} ${msg.velocity}`;
    updateMidiLiveTesterUI(noteLbl, msg.velocity, deviceName);

    dispatchMidiNoteOn(msg.midi, msg.velocity, deviceName);
  }
}

function isBlockingOverlayOpenForMidi() {
  if (typeof getOpenModalName === "function" && getOpenModalName()) return true;
  const tut = document.getElementById("exerciseTutorialBackdrop");
  if (tut && !tut.classList.contains("hidden") && !tut.classList.contains("modal-hidden")) return true;
  const welcome = document.getElementById("welcomeOnboarding");
  if (welcome && !welcome.classList.contains("hidden")) return true;
  return false;
}

function dispatchMidiNoteOn(midi, velocity, deviceName) {
  // Offene Fenster/Overlays (Einstellungen mit Live-Tester, Tutorial, Onboarding …):
  // Taste klingt, löst aber keine Übung im Hintergrund aus. Wichtig, weil Local Control Off
  // den Eigenklang des E-Pianos stummschaltet – ohne App-Ton bliebe es sonst still.
  if (isBlockingOverlayOpenForMidi()) {
    playMidiAppTone(midi, velocity, 0.75);
    return;
  }

  const view = state?.currentView;

  // 1) Freies Spiel / Klang-Labor
  if (view === "freeplay") {
    if (typeof handleFreeplayMidiNoteOn === "function") {
      handleFreeplayMidiNoteOn(midi, velocity, { playSound: _midi.prefs.appSound });
    } else if (typeof handleFreeplayKeyDown === "function") {
      handleFreeplayKeyDown(midi);
    }
    return;
  }

  // Ansichten ohne MIDI-Anbindung (Startseite, Wissen, Werkzeuge …): einfach den App-Ton spielen
  if (view !== "exercise" || !state?.currentExercise) {
    playMidiAppTone(midi, velocity, 0.85);
    return;
  }
  const ex = state.currentExercise;

  // 2) Phase-2 MIDI-Spielübungen („Intervalle spielen“, „Akkorde greifen“, „Tonleitern & Modi spielen“)
  if (typeof isMidiPlayMode === "function" && isMidiPlayMode(ex.type)) {
    if (typeof handleMidiPlayNoteOn === "function") {
      handleMidiPlayNoteOn(midi, velocity);
    }
    return;
  }

  // 3) Rhythmus • Nachklopfen
  if (ex.type === "rhythm-tap") {
    // Während der Aufnahme klingt der Tap-Klick; außerhalb der Aufnahme den App-Ton spielen
    const tapped = typeof handleRhythmTapInput === "function"
      ? handleRhythmTapInput(null, null, { silent: !_midi.prefs.appSound })
      : null;
    if (tapped === null) playMidiAppTone(midi, velocity, 0.6);
    return;
  }

  // 4) Notenlesen (Einzelnoten & Akkorde)
  if (typeof isNotationMode === "function" && isNotationMode(ex.type) &&
      !(typeof isNotationSymbolsMode === "function" && isNotationSymbolsMode(ex.type))) {
    handleNotationMidiNoteOn(ex, midi, velocity);
    return;
  }

  // 5) Solfège
  if (ex.type === "solfege") {
    handleSolfegeMidiNoteOn(ex, midi, velocity);
    return;
  }

  // 6) Melodie-Phrasen
  if (ex.type === "melody") {
    handleMelodyMidiNoteOn(ex, midi, velocity);
    return;
  }

  // 7) Übungen ohne MIDI-Eingabe (Hörübungen, Symbole …): nur klingen lassen
  playMidiAppTone(midi, velocity, 0.85);
}

function dispatchMidiNoteOff(midi) {
  _midi.notationChordHeld.delete(midi);
  const view = state?.currentView;
  if (view === "freeplay" && typeof handleFreeplayMidiNoteOff === "function") {
    handleFreeplayMidiNoteOff(midi);
    return;
  }
  if (view === "exercise" && state?.currentExercise &&
      typeof isMidiPlayMode === "function" && isMidiPlayMode(state.currentExercise.type) &&
      typeof handleMidiPlayNoteOff === "function") {
    handleMidiPlayNoteOff(midi);
  }
}

// ---------- Phase-1 Übungs-Adapter: Notenlesen, Solfège, Melodie ----------

function findSolfegeKeyboardBtnByPc(pc) {
  const normPc = ((pc % 12) + 12) % 12;
  const btns = Array.from(document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key"));
  // Bevorzuge aktive Skalen-Tasten
  const activeMatch = btns.find(el => {
    const m = parseInt(el.dataset.midi, 10);
    const active = el.classList.contains("piano-key-scale") || el.classList.contains("key-in-scale") || el.classList.contains("notation-black-active");
    return Number.isFinite(m) && (((m % 12) + 12) % 12) === normPc && active;
  });
  if (activeMatch) return activeMatch;
  return btns.find(el => {
    const m = parseInt(el.dataset.midi, 10);
    return Number.isFinite(m) && (((m % 12) + 12) % 12) === normPc;
  }) || null;
}

function handleNotationMidiNoteOn(ex, midi, velocity) {
  if (!ex || !ex.targetItem) {
    playMidiAppTone(midi, velocity, 0.75);
    return;
  }

  // Akkorde lesen (notation-chords): Akkord direkt auf dem MIDI-Keyboard greifen!
  if (ex.isChordReading && ex.targetItem.isChord) {
    playMidiAppTone(midi, velocity, 0.9);
    if (ex.chordAdvanceLock) return;
    const target = ex.targetItem;
    const targetMidis = Array.isArray(target.chordTones)
      ? target.chordTones.map(t => Number(t.midi)).filter(Number.isFinite)
      : [];
    const held = getMidiHeldNotesArray();
    const res = evaluateMidiChordMatch(targetMidis, held, {
      requireExactMidis: _midi.prefs.notationExactOctave,
      requireBassPc: !_midi.prefs.notationExactOctave && target.inversion > 0 && targetMidis.length > 0
        ? ((targetMidis[0] % 12) + 12) % 12
        : null
    });

    if (res.ok) {
      const btn = document.querySelector(`#degreeButtonsGrid .degree-btn[data-choice="${CSS.escape(target.key)}"]`) || null;
      if (typeof handleNotationChordChoice === "function") {
        handleNotationChordChoice(target.key, btn, { fromMidi: true, skipCorrectAudio: true });
      }
      return;
    }

    // Vollständig gegriffener, aber falscher Akkord zählt wie ein falscher Tipp
    const isWrongAttempt = res.status === "wrong-octave" || (res.status === "wrong-notes" && held.length >= targetMidis.length);
    if (isWrongAttempt) {
      if (typeof resetExerciseStreakOnAttempt === "function") resetExerciseStreakOnAttempt(ex);
      if (typeof noteNotationReviewAnswer === "function") noteNotationReviewAnswer(ex, target, false);
    }

    if (document.getElementById("centralStageCard")) {
      if (res.status === "wrong-octave") {
        setCentralStageMode("stage-wrong");
        updateStageMascot("thinking");
        document.getElementById("stageSubtext").textContent = tr("RICHTIGER AKKORD, ANDERE OKTAVE", "RIGHT CHORD, WRONG OCTAVE");
        document.getElementById("stageMainText").textContent = target.chordSymbol || "?";
        document.getElementById("stageFunctionText").textContent = tr(
          "Spiele den Akkord in der notierten Oktavlage!",
          "Play the chord in the written octave!"
        );
      } else if (res.status === "incomplete" && res.matchedCount > 0) {
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("AKKORDTON {found}/{total}", "CHORD TONE {found}/{total}", {
          found: res.matchedCount,
          total: res.totalCount
        });
        document.getElementById("stageMainText").textContent = held.map(formatMidiNoteDisplay).join(" · ");
        document.getElementById("stageFunctionText").textContent = tr("Halte alle Akkordtöne gleichzeitig gedrückt!", "Hold all chord tones together!");
      } else if (res.status === "wrong-notes" && held.length >= targetMidis.length) {
        setCentralStageMode("stage-wrong");
        updateStageMascot("thinking");
        document.getElementById("stageSubtext").textContent = tr("NOCH NICHT GANZ", "NOT QUITE");
        document.getElementById("stageMainText").textContent = held.map(formatMidiNoteDisplay).join(" · ");
        document.getElementById("stageFunctionText").textContent = tr(
          "Prüfe Vorzeichen und Lage im Notensystem.",
          "Check accidentals and octave on the staff."
        );
      }
    }
    return;
  }

  // Einzelnoten-Lesen (Violinschlüssel, Bassschlüssel, Altschlüssel, Mix, Doppelsystem)
  const target = ex.targetItem;
  const match = evaluateMidiNotationMatch(target, midi, {
    exactOctave: _midi.prefs.notationExactOctave
  });
  const pc = ((midi % 12) + 12) % 12;
  const keyBtn = document.getElementById(`solfegeKey_${midi}`) || findSolfegeKeyboardBtnByPc(pc);
  const noteLabel = formatMidiNoteDisplay(midi);

  // Im Prüfungsmodus direkt an handleNotationKeyClick -> handleExamNotationAnswer
  if (state.exam?.active) {
    playMidiAppTone(midi, velocity, 0.7);
    if (typeof handleNotationKeyClick === "function") {
      handleNotationKeyClick(
        { midi, pc, noteLabel, midiExactOk: match.ok, fromMidi: true },
        keyBtn,
        { fromMidi: true, midiExactOk: match.ok, skipCorrectAudio: true }
      );
    }
    return;
  }

  // Falsche Oktave: über die normale Fehlerbehandlung (Serie, Sitzungs-Wiederholung, Panel),
  // die Bühne zeigt danach zusätzlich, wie viele Oktaven daneben gespielt wurde.
  if (match.status === "wrong-octave") {
    playMidiAppTone(midi, velocity, 0.75);
    if (typeof handleNotationKeyClick === "function") {
      // Keine Bildschirmtaste rot färben: dort läge ja die richtige Tonklasse
      handleNotationKeyClick(
        { midi, pc, noteLabel, fromMidi: true },
        null,
        {
          fromMidi: true,
          skipCorrectAudio: true,
          midiWrongOctave: { octaveDiff: match.octaveDiff, targetMidi: target.midi, noteLabel }
        }
      );
    }
    return;
  }

  // Gespielter Ton klingt nur über playMidiAppTone (respektiert „App-Klang“); die Übung spielt kein zweites Echo
  playMidiAppTone(midi, velocity, 0.65);

  if (typeof handleNotationKeyClick === "function") {
    handleNotationKeyClick(
      { midi, pc, noteLabel, fromMidi: true },
      keyBtn,
      { fromMidi: true, skipCorrectAudio: true }
    );
  }
}

function handleSolfegeMidiNoteOn(ex, midi, velocity) {
  if (!ex || state.solfegeAnswered) {
    playMidiAppTone(midi, velocity, 0.75);
    return;
  }
  const pc = ((midi % 12) + 12) % 12;
  const keyBtn = findSolfegeKeyboardBtnByPc(pc);
  const keySyllable = keyBtn?.dataset?.syllable || null;
  const keyMidi = keyBtn ? parseInt(keyBtn.dataset.midi, 10) : midi;
  const isActiveScaleKey = Boolean(keyBtn && (keyBtn.classList.contains("piano-key-scale") || keyBtn.classList.contains("key-in-scale")));

  if (isActiveScaleKey && keySyllable && typeof handleSolfegeKeyClick === "function") {
    const isHit = keyMidi === ex.targetItem?.midi || (ex.targetItem?.syllable === "Do" && keySyllable === "Do");
    if (!isHit) {
      playMidiAppTone(midi, velocity, 0.55);
    }
    handleSolfegeKeyClick(
      { midi: keyMidi, pc, syllable: keySyllable, noteLabel: formatMidiNoteDisplay(midi) },
      keyBtn,
      { fromMidi: true }
    );
    return;
  }

  // Gespielte Taste liegt außerhalb der aktuellen Tonleiter
  playMidiAppTone(midi, velocity, 0.55);
  if (state.exam?.active && typeof handleExamSolfegeAnswer === "function") {
    handleExamSolfegeAnswer(ex, { midi, pc, syllable: formatMidiNoteDisplay(midi), noteLabel: formatMidiNoteDisplay(midi) }, keyBtn);
    return;
  }
  if (typeof resetExerciseStreakOnAttempt === "function") resetExerciseStreakOnAttempt(ex);
  if (typeof noteSessionReviewAnswer === "function") noteSessionReviewAnswer(ex, false);
  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tr("NICHT IN DER TONLEITER", "OUTSIDE THE SCALE");
    document.getElementById("stageMainText").textContent = `${formatMidiNoteDisplay(midi)}? ${tr("Nein", "No")}`;
    document.getElementById("stageFunctionText").textContent = tr("Dieser Ton gehört nicht zur aktuellen Tonleiter.", "That note is not in the current scale.");
  }
}

function handleMelodyMidiNoteOn(ex, midi, velocity) {
  if (!ex || state.melodyCompleted) {
    playMidiAppTone(midi, velocity, 0.75);
    return;
  }
  const pc = ((midi % 12) + 12) % 12;
  const keyBtn = findSolfegeKeyboardBtnByPc(pc);
  const keySyllable = keyBtn?.dataset?.syllable || null;
  const keyMidi = keyBtn ? parseInt(keyBtn.dataset.midi, 10) : midi;
  const isActiveScaleKey = Boolean(keyBtn && (keyBtn.classList.contains("piano-key-scale") || keyBtn.classList.contains("key-in-scale")));

  if (isActiveScaleKey && keySyllable && typeof handleMelodyKeyClick === "function") {
    playMidiAppTone(midi, velocity, 0.55);
    handleMelodyKeyClick(
      { midi: keyMidi, pc, syllable: keySyllable, noteLabel: formatMidiNoteDisplay(midi) },
      keyBtn,
      { fromMidi: true, skipInputAudio: true }
    );
    return;
  }

  playMidiAppTone(midi, velocity, 0.55);
  if (state.exam?.active && typeof handleExamMelodyAnswer === "function") {
    handleExamMelodyAnswer(ex, { midi, pc, syllable: formatMidiNoteDisplay(midi), noteLabel: formatMidiNoteDisplay(midi) }, keyBtn);
    return;
  }
  if (typeof resetExerciseStreakOnAttempt === "function") resetExerciseStreakOnAttempt(ex);
  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tr("NICHT IN DER TONLEITER", "OUTSIDE THE SCALE");
    document.getElementById("stageMainText").textContent = `${formatMidiNoteDisplay(midi)}? ${tr("Nein", "No")}`;
    document.getElementById("stageFunctionText").textContent = tr("Dieser Ton gehört nicht zur aktuellen Tonleiter.", "That note is not in the current scale.");
  }
}

// ---------- UI-Sync: Einstellungen, Status-Chips & Schnell-Popover ----------

function getMidiStatusSummaryText() {
  if (_midi.transport === "none") {
    return tr(
      "Dein aktueller Browser unterstützt kein Web MIDI (z. B. Safari/iOS). Nutze Chrome, Edge oder Firefox am Computer oder die Lauscher Android-App.",
      "Your current browser does not support Web MIDI (e.g. Safari/iOS). Use Chrome, Edge or Firefox on desktop, or the Lauscher Android app."
    );
  }
  if (!_midi.prefs.enabled) {
    return tr("Ausgeschaltet – aktiviere MIDI, um ein Digitalpiano oder Keyboard per Bluetooth/USB zu nutzen.", "Off — enable MIDI to play with a Bluetooth or USB digital piano or keyboard.");
  }
  if (_midi.status === "permission-denied") {
    return tr("MIDI-Zugriff wurde verweigert. Bitte in den Browser- oder App-Einstellungen erlauben.", "MIDI access was denied. Please allow it in your browser or app settings.");
  }
  const devs = getSelectedMidiDevices();
  if (devs.length === 0) {
    return _midi.transport === "native"
      ? tr("Warte auf MIDI-Gerät … Schließe ein USB-Keyboard an oder verbinde dein Digitalpiano per Bluetooth.", "Waiting for MIDI device … Plug in a USB keyboard or connect your digital piano via Bluetooth.")
      : tr("Warte auf MIDI-Gerät … Schließe ein USB-Keyboard an oder kopple dein Bluetooth-Piano in den Systemeinstellungen.", "Waiting for MIDI device … Plug in a USB keyboard or pair your Bluetooth piano in system settings.");
  }
  if (devs.length === 1) {
    return tf("Verbunden: {name}", "Connected: {name}", { name: devs[0].name });
  }
  return tf("{n} MIDI-Geräte verbunden", "{n} MIDI devices connected", { n: devs.length });
}

function updateMidiLiveTesterUI(noteLabel, velocity, deviceName) {
  const tester = document.getElementById("midiLiveTester");
  if (!tester) return;
  tester.classList.add("is-active");
  tester.textContent = tf("● Empfangen: {note} (Anschlag {vel}) • {dev}", "● Received: {note} (vel {vel}) • {dev}", {
    note: noteLabel,
    vel: velocity,
    dev: deviceName || "MIDI"
  });
  clearTimeout(tester._fadeTimer);
  tester._fadeTimer = setTimeout(() => {
    tester.classList.remove("is-active");
  }, 900);
}

function renderMidiDeviceDropdown() {
  const container = document.getElementById("midiDeviceDropdownWrap");
  if (!container || typeof renderProfileSingleDropdown !== "function") return;
  const options = [
    { key: "all", label: tr("Alle verbundenen Geräte", "All connected devices") },
    ..._midi.devices.map(d => ({
      key: d.id,
      label: d.type === "bluetooth" ? `${d.name} (Bluetooth)` : d.name
    }))
  ];
  const validKey = options.some(o => o.key === _midi.prefs.selectedDeviceId) ? _midi.prefs.selectedDeviceId : "all";
  renderProfileSingleDropdown({
    containerEl: container,
    key: "settings-midi-device",
    options,
    selectedKey: validKey,
    // Ohne onToggle würde renderProfileSingleDropdown die Konto-Ansicht neu zeichnen und das Menü bliebe zu
    onToggle: () => renderMidiDeviceDropdown(),
    onSelect: (nextKey) => {
      _midi.prefs.selectedDeviceId = nextKey;
      saveMidiPrefs();
      syncMidiLocalControlState();
      syncAllMidiUI();
    }
  });
}

function renderMidiBleDevicesUI() {
  const wrap = document.getElementById("midiBleWrap");
  if (!wrap) return;
  const isNative = _midi.transport === "native";
  wrap.classList.toggle("hidden", !isNative || !_midi.prefs.enabled);
  if (!isNative || !_midi.prefs.enabled) return;

  const scanBtn = document.getElementById("midiBleScanBtn");
  if (scanBtn) {
    scanBtn.textContent = _midi.bleScanning
      ? tr("Suche stoppen", "Stop scan")
      : tr("Bluetooth-MIDI-Instrument suchen", "Scan for Bluetooth MIDI instrument");
    scanBtn.classList.toggle("active", _midi.bleScanning);
  }
  const statusEl = document.getElementById("midiBleStatus");
  if (statusEl) {
    statusEl.textContent = _midi.bleStatusText || "";
    statusEl.classList.toggle("hidden", !_midi.bleStatusText);
  }
  const listEl = document.getElementById("midiBleList");
  if (!listEl) return;
  if (_midi.bleFoundDevices.length === 0) {
    listEl.innerHTML = "";
    listEl.classList.add("hidden");
    return;
  }
  listEl.classList.remove("hidden");
  listEl.innerHTML = _midi.bleFoundDevices.map(d => `
    <button type="button" class="midi-ble-item-btn" data-ble-addr="${escapeHtml(d.address)}" data-ble-name="${escapeHtml(d.name)}">
      <span class="midi-ble-item-name">${escapeHtml(d.name)}</span>
      <span class="midi-ble-item-action">${escapeHtml(tr("Verbinden", "Connect"))}</span>
    </button>
  `).join("");
  listEl.querySelectorAll("[data-ble-addr]").forEach(btn => {
    btn.addEventListener("click", () => {
      connectNativeBleDevice(btn.dataset.bleAddr, btn.dataset.bleName);
    });
  });
}

function syncMidiSettingsUI() {
  _midi.transport = detectMidiTransport();
  const unsupported = _midi.transport === "none";

  const toggleGroup = document.getElementById("midiEnabledGroup");
  if (toggleGroup) {
    toggleGroup.querySelectorAll("[data-midi-enabled]").forEach(btn => {
      const active = (btn.dataset.midiEnabled === "on") === Boolean(_midi.prefs.enabled);
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.disabled = unsupported && btn.dataset.midiEnabled === "on";
    });
  }

  const statusEl = document.getElementById("midiStatusText");
  if (statusEl) {
    statusEl.textContent = getMidiStatusSummaryText();
    statusEl.classList.toggle("is-connected", isMidiConnected());
    statusEl.classList.toggle("is-unsupported", unsupported);
  }

  const optionsWrap = document.getElementById("midiOptionsWrap");
  if (optionsWrap) {
    optionsWrap.classList.toggle("hidden", !_midi.prefs.enabled || unsupported);
  }

  const appSoundGroup = document.getElementById("midiAppSoundGroup");
  if (appSoundGroup) {
    appSoundGroup.querySelectorAll("[data-midi-app-sound]").forEach(btn => {
      const active = (btn.dataset.midiAppSound === "on") === Boolean(_midi.prefs.appSound);
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  const localCtrlRow = document.getElementById("midiLocalCtrlRow");
  if (localCtrlRow) {
    localCtrlRow.classList.toggle("hidden", !_midi.prefs.appSound);
  }
  const localCtrlGroup = document.getElementById("midiLocalCtrlGroup");
  if (localCtrlGroup) {
    localCtrlGroup.querySelectorAll("[data-midi-local-off]").forEach(btn => {
      const active = (btn.dataset.midiLocalOff === "on") === Boolean(_midi.prefs.localControlOff);
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  const exactOctGroup = document.getElementById("midiExactOctaveGroup");
  if (exactOctGroup) {
    exactOctGroup.querySelectorAll("[data-midi-exact-oct]").forEach(btn => {
      const active = (btn.dataset.midiExactOct === "on") === Boolean(_midi.prefs.notationExactOctave);
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  const tester = document.getElementById("midiLiveTester");
  if (tester && !_midi.lastEventText) {
    tester.textContent = tr("Spiele eine Taste auf deinem MIDI-Instrument zum Testen …", "Press a key on your MIDI instrument to test …");
  }

  renderMidiDeviceDropdown();
  renderMidiBleDevicesUI();
}

function isMidiSupportedForExercise(ex) {
  if (!ex) return false;
  if (typeof isMidiPlayMode === "function" && isMidiPlayMode(ex.type)) return true;
  if (ex.type === "solfege" || ex.type === "melody" || ex.type === "rhythm-tap") return true;
  if (typeof isNotationMode === "function" && isNotationMode(ex.type) &&
      !(typeof isNotationSymbolsMode === "function" && isNotationSymbolsMode(ex.type))) {
    return true;
  }
  return false;
}

function pulseMidiStatusChips() {
  const chips = [
    document.getElementById("exerciseMidiChipBtn"),
    document.getElementById("freeplayMidiChipBtn")
  ];
  chips.forEach(el => {
    if (!el || el.classList.contains("hidden")) return;
    el.classList.add("is-midi-pulse");
  });
  clearTimeout(_midi.chipPulseTimer);
  _midi.chipPulseTimer = setTimeout(() => {
    chips.forEach(el => el?.classList.remove("is-midi-pulse"));
  }, 180);
}

function syncMidiStatusChips() {
  const connected = isMidiConnected();
  const enabled = _midi.prefs.enabled;

  // 1) Übungs-Chip
  const exChip = document.getElementById("exerciseMidiChipBtn");
  if (exChip) {
    const ex = state?.currentExercise;
    const isMidiEx = Boolean(ex && typeof isMidiPlayMode === "function" && isMidiPlayMode(ex.type));
    const show = Boolean(state?.currentView === "exercise" && ex && (enabled && isMidiSupportedForExercise(ex) || isMidiEx));
    exChip.classList.toggle("hidden", !show);
    exChip.classList.toggle("is-connected", connected);
    exChip.innerHTML = `<span class="midi-dot" aria-hidden="true"></span><span>MIDI</span>`;
    exChip.title = getMidiStatusSummaryText();
  }

  // 2) Freies-Spiel-Chip
  const fpChip = document.getElementById("freeplayMidiChipBtn");
  if (fpChip) {
    const showFp = Boolean(enabled);
    fpChip.classList.toggle("hidden", !showFp);
    fpChip.classList.toggle("is-connected", connected);
    fpChip.innerHTML = `<span class="midi-dot" aria-hidden="true"></span><span>${escapeHtml(connected ? "MIDI" : tr("MIDI warten", "MIDI idle"))}</span>`;
    fpChip.title = getMidiStatusSummaryText();
  }
}

function renderInlineMidiPopover() {
  const pop = document.getElementById("inlineMidiPopover");
  if (!pop) return;
  const ex = state?.currentExercise;
  const isNotation = Boolean(ex && typeof isNotationMode === "function" && isNotationMode(ex.type));
  const connected = isMidiConnected();
  const devs = getSelectedMidiDevices();
  const devLabel = connected
    ? (devs.length === 1 ? devs[0].name : tf("{n} Geräte", "{n} devices", { n: devs.length }))
    : tr("Kein Gerät verbunden", "No device connected");

  pop.innerHTML = `
    <div class="midi-pop-row">
      <span class="popover-label">${escapeHtml(tr("MIDI-Gerät:", "MIDI device:"))}</span>
      <span class="midi-pop-status${connected ? " is-connected" : ""}">${escapeHtml(devLabel)}</span>
    </div>
    <div class="midi-pop-controls">
      <button type="button" class="popover-pill-btn${_midi.prefs.appSound ? " active" : ""}" data-midi-pop="appSound">
        ${escapeHtml(_midi.prefs.appSound ? tr("App-Klang: Ein", "App sound: On") : tr("App-Klang: Aus", "App sound: Off"))}
      </button>
      ${isNotation ? `
        <button type="button" class="popover-pill-btn${_midi.prefs.notationExactOctave ? " active" : ""}" data-midi-pop="exactOct">
          ${escapeHtml(_midi.prefs.notationExactOctave ? tr("Oktave: Exakt", "Octave: Exact") : tr("Oktave: Tolerant", "Octave: Any"))}
        </button>
      ` : ""}
      <button type="button" class="popover-pill-btn" data-midi-pop="openSettings">
        ${escapeHtml(tr("Einstellungen …", "Settings …"))}
      </button>
    </div>
  `;

  pop.querySelectorAll("[data-midi-pop]").forEach(btn => {
    btn.addEventListener("click", () => {
      const act = btn.dataset.midiPop;
      if (act === "appSound") {
        _midi.prefs.appSound = !_midi.prefs.appSound;
        saveMidiPrefs();
        syncMidiLocalControlState();
        syncAllMidiUI();
        renderInlineMidiPopover();
      } else if (act === "exactOct") {
        _midi.prefs.notationExactOctave = !_midi.prefs.notationExactOctave;
        saveMidiPrefs();
        syncAllMidiUI();
        renderInlineMidiPopover();
      } else if (act === "openSettings") {
        closeInlineMidiPopover();
        if (typeof openSettingsModal === "function") openSettingsModal("midi");
      }
    });
  });
}

function toggleInlineMidiPopover() {
  const pop = document.getElementById("inlineMidiPopover");
  const chip = document.getElementById("exerciseMidiChipBtn");
  if (!pop) return;
  const opening = pop.classList.contains("hidden");
  if (typeof closeTransientPopovers === "function") closeTransientPopovers();
  if (opening) {
    renderInlineMidiPopover();
    pop.classList.remove("hidden");
    chip?.setAttribute("aria-expanded", "true");
    if (typeof queueFitExerciseLayout === "function") queueFitExerciseLayout(false);
  }
}

function closeInlineMidiPopover() {
  const pop = document.getElementById("inlineMidiPopover");
  const chip = document.getElementById("exerciseMidiChipBtn");
  if (pop) pop.classList.add("hidden");
  if (chip) chip.setAttribute("aria-expanded", "false");
}

function syncAllMidiUI() {
  syncMidiSettingsUI();
  syncMidiStatusChips();
  if (typeof syncMidiPlayPadUI === "function") syncMidiPlayPadUI();
}

// ---------- App-Lebenszyklus (Hintergrund / Vordergrund / Start) ----------

function onMidiAppBackground() {
  stopNativeBleScan();
  clearMidiHeldNotes();
  if (_midi.localControlApplied) {
    applyMidiLocalControl(false);
  }
}

function onMidiAppForeground() {
  if (_midi.prefs.enabled && shouldSilenceExternalKeyboard() && _midi.devices.length > 0) {
    applyMidiLocalControl(true);
  }
}

function initMidiModule() {
  _midi.prefs = loadMidiPrefs();
  _midi.transport = detectMidiTransport();

  // Einstellungs-Buttons verdrahten
  document.querySelectorAll("#midiEnabledGroup [data-midi-enabled]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.midiEnabled === "on") {
        enableMidiInput(true);
      } else {
        disableMidiInput();
      }
    });
  });

  document.querySelectorAll("#midiAppSoundGroup [data-midi-app-sound]").forEach(btn => {
    btn.addEventListener("click", () => {
      _midi.prefs.appSound = btn.dataset.midiAppSound === "on";
      saveMidiPrefs();
      syncMidiLocalControlState();
      syncAllMidiUI();
    });
  });

  document.querySelectorAll("#midiLocalCtrlGroup [data-midi-local-off]").forEach(btn => {
    btn.addEventListener("click", () => {
      _midi.prefs.localControlOff = btn.dataset.midiLocalOff === "on";
      saveMidiPrefs();
      syncMidiLocalControlState();
      syncAllMidiUI();
    });
  });

  document.querySelectorAll("#midiExactOctaveGroup [data-midi-exact-oct]").forEach(btn => {
    btn.addEventListener("click", () => {
      _midi.prefs.notationExactOctave = btn.dataset.midiExactOct === "on";
      saveMidiPrefs();
      syncAllMidiUI();
    });
  });

  document.getElementById("midiBleScanBtn")?.addEventListener("click", () => {
    if (_midi.bleScanning) stopNativeBleScan();
    else startNativeBleScan();
  });

  document.getElementById("exerciseMidiChipBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleInlineMidiPopover();
  });

  document.getElementById("freeplayMidiChipBtn")?.addEventListener("click", () => {
    if (typeof openSettingsModal === "function") openSettingsModal("midi");
  });

  // Beim Schließen der Seite Local Control sauber wiederherstellen
  if (typeof window !== "undefined") {
    window.addEventListener("pagehide", () => {
      onMidiAppBackground();
    });
  }

  // Wenn Nutzer MIDI früher schon bewusst eingeschaltet hat, still wiederverbinden
  if (_midi.prefs.enabled && _midi.transport !== "none") {
    enableMidiInput(false);
  } else {
    syncAllMidiUI();
  }
}
