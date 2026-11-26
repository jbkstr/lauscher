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
  selectedDeviceName: "",    // Name zur Wiedererkennung, falls sich die ID ändert (Firefox, Neuverbinden)
  appSound: true,            // Standard: App-eigene Klänge beim MIDI-Spiel
  localControlOff: true,     // Standard: CC 122 = 0 ans E-Piano senden (Eigenklang aus)
  notationExactOctave: true  // Standard: beim Notenlesen die echte Oktave verlangen
});

const _midi = {
  prefs: { ...DEFAULT_MIDI_PREFS },
  transport: "none",         // "native" | "web" | "none"
  status: "idle",            // "idle" | "unsupported" | "connecting" | "needs-activation" | "permission-denied" | "ready" | "connected"
  lastErrorName: "",         // z. B. "SecurityError", wenn der Browser den Zugriff ablehnt
  webAccess: null,
  boundWebInputs: new Map(), // devId -> MIDIInput (verhindert doppelte open()/onstatechange-Schleifen)
  webPollTimer: 0,
  webRecheckInFlight: false,
  permissionStatus: null,
  permissionState: "unknown", // "unknown" | "granted" | "prompt" | "denied"
  lastRescanAt: 0,
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

function isFirefoxBrowser() {
  return typeof navigator !== "undefined" && /firefox/i.test(navigator.userAgent || "");
}

/**
 * Vergleicht zwei Gerätelisten anhand von ID, Name und Typ.
 * Verhindert unnötige UI-Neuzeichnungen und CC-122-Wiederholungen, wenn ein Port
 * lediglich von "closed" auf "open" wechselt (onstatechange-Schleife in Firefox/Chrome).
 */
function haveMidiDeviceListsChanged(prevList, nextList) {
  const norm = (list) => (Array.isArray(list) ? list : [])
    .map(d => `${d.id || ""}|${d.name || ""}|${d.hasInput !== false ? 1 : 0}|${d.hasOutput ? 1 : 0}`)
    .sort()
    .join("\n");
  return norm(prevList) !== norm(nextList);
}

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
      selectedDeviceName: typeof parsed.selectedDeviceName === "string" ? parsed.selectedDeviceName : "",
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

/**
 * Ermittelt das tatsächlich aktive Gerät: gespeicherte ID, sonst ein Gerät mit
 * gleichem Namen (IDs ändern sich z. B. in Firefox oder nach dem Neuverbinden),
 * sonst "all". So blockiert eine veraltete Auswahl nie still alle Eingaben.
 */
function resolveMidiDeviceSelection(selectedId, selectedName, devices) {
  if (!selectedId || selectedId === "all") return "all";
  const inputs = Array.isArray(devices) ? devices.filter(d => d && d.hasInput !== false) : [];
  if (inputs.some(d => d.id === selectedId)) return selectedId;
  if (selectedName) {
    const byName = inputs.find(d => d.name === selectedName);
    if (byName) return byName.id;
  }
  return "all";
}

function getEffectiveMidiDeviceId() {
  return resolveMidiDeviceSelection(_midi.prefs.selectedDeviceId, _midi.prefs.selectedDeviceName, _midi.devices);
}

function isMidiEventFromSelectedDevice(devId) {
  const effective = getEffectiveMidiDeviceId();
  return effective === "all" || devId === effective;
}

function getSelectedMidiDevices() {
  if (!Array.isArray(_midi.devices)) return [];
  const inputs = _midi.devices.filter(d => d.hasInput !== false);
  const effective = getEffectiveMidiDeviceId();
  if (effective === "all") return inputs;
  return inputs.filter(d => d.id === effective);
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
  const targetId = deviceId || getEffectiveMidiDeviceId();
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
        if (output.connection !== "open" && typeof output.open === "function") {
          Promise.resolve(output.open()).then(() => {
            try { output.send(bytes); } catch (e) {}
          }).catch(() => {});
        } else {
          output.send(bytes);
        }
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

// ---------- Verbindung aufbauen, Berechtigung beobachten & beenden ----------

async function queryMidiPermissionState() {
  if (typeof navigator === "undefined" || !navigator.permissions || typeof navigator.permissions.query !== "function") {
    return "unknown";
  }
  try {
    const status = await navigator.permissions.query({ name: "midi" });
    _midi.permissionStatus = status;
    _midi.permissionState = status.state || "unknown";
    if (!status._lauscherBound) {
      status._lauscherBound = true;
      status.onchange = () => {
        const nextState = status.state || "unknown";
        _midi.permissionState = nextState;
        // Sobald Firefox die Website-Berechtigung nachträglich erteilt (z. B. nach Add-on-Bestätigung),
        // automatisch verbinden, ohne dass ein zweiter Klick oder Seiten-Neuladen nötig ist
        if (nextState === "granted" && (_midi.prefs.enabled || _midi.status === "permission-denied" || _midi.status === "needs-activation")) {
          _midi.prefs.enabled = true;
          saveMidiPrefs();
          enableWebMidiTransport({ userInitiated: false, silentRefresh: false });
        } else if (nextState === "denied" && _midi.prefs.enabled) {
          _midi.status = "permission-denied";
          stopWebMidiPollTimer();
          syncAllMidiUI();
        }
      };
    }
    return _midi.permissionState;
  } catch (e) {
    return "unknown";
  }
}

function stopWebMidiPollTimer() {
  if (_midi.webPollTimer) {
    clearInterval(_midi.webPollTimer);
    _midi.webPollTimer = 0;
  }
}

/**
 * Firefox meldet nachträglich angeschlossene MIDI-Geräte nicht immer über onstatechange.
 * Solange die Berechtigung bereits erteilt ist, kein Gerät verbunden ist und die Seite
 * sichtbar ist, fragt Lauscher die Geräteliste sanft nach (ohne jemals einen Dialog auszulösen).
 */
function syncWebMidiPollTimer() {
  stopWebMidiPollTimer();
  if (!_midi.prefs.enabled || _midi.transport !== "web") return;
  if (_midi.devices.length > 0) return;
  if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
  // Nur pollen, wenn Web MIDI bereits einmal bewilligt wurde (nie einen unerwarteten Prompt auslösen!)
  const hasPermission = Boolean(_midi.webAccess) || _midi.permissionState === "granted";
  if (!hasPermission) return;

  const settingsOpen = typeof getOpenModalName === "function" && getOpenModalName() === "settings";
  const intervalMs = settingsOpen ? 3000 : 6000;
  _midi.webPollTimer = setInterval(() => {
    if (!_midi.prefs.enabled || _midi.transport !== "web" || _midi.devices.length > 0) {
      stopWebMidiPollTimer();
      return;
    }
    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      stopWebMidiPollTimer();
      return;
    }
    enableWebMidiTransport({ userInitiated: false, silentRefresh: true });
  }, intervalMs);
}

function detachWebMidiAccess(access) {
  if (!access) return;
  try {
    access.onstatechange = null;
    access.inputs?.forEach(input => {
      if (input) input.onmidimessage = null;
    });
  } catch (e) {}
  _midi.boundWebInputs.clear();
}

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
  _midi.lastErrorName = "";

  if (_midi.transport === "native") {
    _midi.status = "connecting";
    syncAllMidiUI();
    return enableNativeMidiTransport();
  }

  // Beim automatischen Wiederverbinden nach Seitenstart (ohne Klick):
  // Erst prüfen, ob die Berechtigung bereits erteilt ist – sonst in Firefox keinen
  // zum Scheitern verurteilten Prompt ohne Nutzergeste auslösen und MIDI nicht still abschalten!
  const perm = await queryMidiPermissionState();
  if (!fromUserGesture && perm === "prompt") {
    _midi.status = "needs-activation";
    syncAllMidiUI();
    return false;
  }
  if (!fromUserGesture && perm === "denied") {
    _midi.status = "permission-denied";
    syncAllMidiUI();
    return false;
  }

  // Sofort „Ein“ und „Verbinde …“ zeigen: Firefox wartet hier ggf. auf die Installation des Hilfsprogramms
  _midi.status = "connecting";
  syncAllMidiUI();
  return enableWebMidiTransport({ userInitiated: fromUserGesture, silentRefresh: false });
}

async function disableMidiInput() {
  stopNativeBleScan();
  stopWebMidiPollTimer();
  if (_midi.localControlApplied) {
    applyMidiLocalControl(false);
  }
  clearMidiHeldNotes();
  _midi.prefs.enabled = false;
  saveMidiPrefs();

  if (_midi.transport === "web" && _midi.webAccess) {
    detachWebMidiAccess(_midi.webAccess);
    _midi.webAccess = null;
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

async function enableWebMidiTransport({ userInitiated = true, silentRefresh = false } = {}) {
  if (_midi.webRecheckInFlight) return false;
  _midi.webRecheckInFlight = true;
  _midi.lastRescanAt = Date.now();
  try {
    // Beim stillen Nachfragen (z. B. Polling oder Fenster-Fokus) nie einen Berechtigungsdialog erzwingen
    if (!userInitiated && !_midi.webAccess) {
      const perm = await queryMidiPermissionState();
      if (perm !== "granted" && perm !== "unknown") {
        _midi.status = perm === "denied" ? "permission-denied" : "needs-activation";
        syncAllMidiUI();
        return false;
      }
    }

    const access = await navigator.requestMIDIAccess({ sysex: false });
    if (!_midi.prefs.enabled) {
      detachWebMidiAccess(access);
      return false;
    }

    const prevAccess = _midi.webAccess;
    if (prevAccess && prevAccess !== access) {
      detachWebMidiAccess(prevAccess);
    }
    _midi.webAccess = access;
    _midi.permissionState = "granted";
    _midi.lastErrorName = "";

    access.onstatechange = () => {
      refreshWebMidiDevices({ fromStateChange: true, forceLocalControl: false });
    };

    refreshWebMidiDevices({ fromStateChange: false, forceLocalControl: !silentRefresh });
    return true;
  } catch (err) {
    if (silentRefresh && _midi.webAccess) {
      // Stiller Re-Check fehlgeschlagen, bestehende Verbindung behalten
      return false;
    }
    _midi.status = "permission-denied";
    _midi.lastErrorName = String(err?.name || "");
    stopWebMidiPollTimer();
    if (userInitiated) {
      // Bei explizitem Klick abgelehnt: Schalter zurück auf Aus, Grund bleibt im Status sichtbar
      _midi.prefs.enabled = false;
      saveMidiPrefs();
    }
    // Permission-Watcher trotzdem aktiv halten, falls Firefox die Berechtigung kurz danach erteilt
    queryMidiPermissionState();
    syncAllMidiUI();
    return false;
  } finally {
    _midi.webRecheckInFlight = false;
  }
}

function refreshWebMidiDevices({ fromStateChange = false, forceLocalControl = false } = {}) {
  if (!_midi.webAccess || !_midi.prefs.enabled) return;
  const list = [];
  const connectedIds = new Set();
  const outputNames = new Set();

  _midi.webAccess.outputs.forEach(out => {
    if (out && out.state === "connected") outputNames.add(out.name || out.id);
  });

  _midi.webAccess.inputs.forEach(input => {
    if (!input || input.state !== "connected") return;
    const devId = input.id;
    const devName = (input.name || "MIDI").trim();
    connectedIds.add(devId);
    list.push({
      id: devId,
      name: devName,
      manufacturer: (input.manufacturer || "").trim(),
      type: /bluetooth|ble/i.test(devName) ? "bluetooth" : "usb",
      hasInput: true,
      hasOutput: outputNames.has(devName) || _midi.webAccess.outputs.size > 0
    });

    // Port nur einmalig binden & öffnen – sonst löst jedes onmidimessage = ... erneut statechange aus!
    if (_midi.boundWebInputs.get(devId) !== input) {
      _midi.boundWebInputs.set(devId, input);
      input.onmidimessage = (ev) => {
        if (!_midi.prefs.enabled) return;
        if (!isMidiEventFromSelectedDevice(devId)) return;
        const parsed = parseMidiMessageBytes(ev.data);
        parsed.forEach(msg => handleParsedMidiEvent(msg, devId, devName));
      };
      if (input.connection !== "open" && typeof input.open === "function") {
        Promise.resolve(input.open()).catch(() => {});
      }
    }
  });

  // Getrennte Ports sauber abmelden
  for (const [oldId, oldPort] of _midi.boundWebInputs.entries()) {
    if (!connectedIds.has(oldId)) {
      try { if (oldPort) oldPort.onmidimessage = null; } catch (e) {}
      _midi.boundWebInputs.delete(oldId);
    }
  }

  const prevDevices = _midi.devices;
  const changed = haveMidiDeviceListsChanged(prevDevices, list);
  const nextStatus = list.length > 0 ? "connected" : "ready";
  const statusChanged = _midi.status !== nextStatus;

  _midi.devices = list;
  _midi.status = nextStatus;

  // Redundantes statechange (nur Port-Status closed -> open) ignorieren:
  // schließt kein offenes Dropdown und sendet kein unnötiges CC-122-Gewitter
  if (fromStateChange && !changed && !statusChanged) {
    return;
  }

  if (list.length > 0 && shouldSilenceExternalKeyboard() && (changed || forceLocalControl || !_midi.localControlApplied)) {
    applyMidiLocalControl(true);
  }
  if (list.length === 0) {
    _midi.localControlApplied = false;
  }

  syncWebMidiPollTimer();
  syncAllMidiUI({ devicesChanged: changed });
}

async function rescanMidiDevices({ userInitiated = true } = {}) {
  if (!_midi.prefs.enabled) return false;
  _midi.transport = detectMidiTransport();
  if (_midi.transport === "native") {
    const plugin = getNativeMidiPlugin();
    if (plugin && typeof plugin.start === "function") {
      try {
        const res = await plugin.start();
        updateNativeDeviceList(res?.devices || []);
        return true;
      } catch (e) {}
    }
    return false;
  }
  if (_midi.transport === "web") {
    if (userInitiated) {
      _midi.status = "connecting";
      syncAllMidiUI();
    }
    const ok = await enableWebMidiTransport({ userInitiated, silentRefresh: !userInitiated });
    if (userInitiated && ok && typeof showAppToast === "function") {
      const n = getSelectedMidiDevices().length;
      showAppToast(
        n > 0
          ? tf("{n} MIDI-Gerät(e) gefunden", "{n} MIDI device(s) found", { n })
          : tr("Kein MIDI-Gerät gefunden – prüfe Kabel/Bluetooth", "No MIDI device found — check cable/Bluetooth"),
        n > 0 ? "success" : "error"
      );
    }
    return ok;
  }
  return false;
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
      if (!isMidiEventFromSelectedDevice(devId)) return;
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
    const proto = typeof window !== "undefined" ? String(window.location?.protocol || "") : "";
    const secure = typeof window !== "undefined" ? window.isSecureContext : true;
    if (proto === "file:") {
      return tr(
        "Über eine lokale Datei (file://) sperrt dieser Browser Web MIDI aus Sicherheitsgründen. Öffne Lauscher über Start-Lauscher.command (http://localhost:8000), über https:// oder öffne lauscher-mobile.html in Chrome/Edge.",
        "This browser blocks Web MIDI for local files (file://). Open Lauscher via Start-Lauscher.command (http://localhost:8000), over https://, or open lauscher-mobile.html in Chrome/Edge."
      );
    }
    if (secure === false) {
      return tr(
        "Web MIDI braucht eine sichere Verbindung (https:// oder localhost). Über unverschlüsseltes http:// sperrt der Browser den MIDI-Zugriff.",
        "Web MIDI requires a secure connection (https:// or localhost). The browser blocks MIDI over unencrypted http://."
      );
    }
    if (isFirefoxBrowser()) {
      return tr(
        "Firefox stellt Web MIDI in diesem Fenster nicht bereit (z. B. Privates Fenster oder abgeschaltetes dom.webmidi.enabled). Öffne Lauscher in einem normalen Firefox-Fenster oder in Chrome/Edge.",
        "Firefox does not expose Web MIDI in this window (e.g. Private Browsing or disabled dom.webmidi.enabled). Open Lauscher in a normal Firefox window or in Chrome/Edge."
      );
    }
    return tr(
      "Dein aktueller Browser unterstützt kein Web MIDI (z. B. Safari/iOS). Nutze Chrome, Edge oder Firefox am Computer oder die Lauscher Android-App.",
      "Your current browser does not support Web MIDI (e.g. Safari/iOS). Use Chrome, Edge or Firefox on desktop, or the Lauscher Android app."
    );
  }
  // Vor „Ausgeschaltet“ prüfen: Nach einer Ablehnung ist MIDI wieder aus, der Grund soll aber sichtbar sein
  if (_midi.status === "permission-denied") {
    const base = isFirefoxBrowser() && _midi.transport === "web"
      ? tr(
        "MIDI-Zugriff wurde verweigert. Firefox braucht ein Hilfsprogramm (Website-Berechtigung) und erkennt nur Geräte, die schon beim Start angeschlossen waren: Keyboard anschließen, Firefox ganz neu starten, MIDI einschalten und die Installation erlauben. Schon abgelehnt? Unter Add-ons → Website-Berechtigungen prüfen.",
        "MIDI access was denied. Firefox needs a helper add-on (site permission) and only detects devices connected when it starts: plug in your keyboard, fully restart Firefox, turn MIDI on and allow the installation. Already declined? Check Add-ons → Site permissions."
      )
      : tr("MIDI-Zugriff wurde verweigert. Bitte in den Browser- oder App-Einstellungen erlauben.", "MIDI access was denied. Please allow it in your browser or app settings.");
    return _midi.lastErrorName ? `${base} (${_midi.lastErrorName})` : base;
  }
  if (_midi.status === "needs-activation") {
    return tr(
      "Dein Browser braucht einen kurzen Klick, um MIDI für diese Sitzung freizugeben.",
      "Your browser needs a quick click to activate MIDI for this session."
    );
  }
  if (!_midi.prefs.enabled) {
    return tr("Ausgeschaltet – aktiviere MIDI, um ein Digitalpiano oder Keyboard per Bluetooth/USB zu nutzen.", "Off — enable MIDI to play with a Bluetooth or USB digital piano or keyboard.");
  }
  if (_midi.status === "connecting") {
    return tr("Verbinde mit MIDI … Erlaube den Zugriff, falls dein Browser nachfragt.", "Connecting to MIDI … Allow access if your browser asks.");
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
  const validKey = getEffectiveMidiDeviceId();
  renderProfileSingleDropdown({
    containerEl: container,
    key: "settings-midi-device",
    options,
    selectedKey: validKey,
    // Ohne onToggle würde renderProfileSingleDropdown die Konto-Ansicht neu zeichnen und das Menü bliebe zu
    onToggle: () => renderMidiDeviceDropdown(),
    onSelect: (nextKey) => {
      _midi.prefs.selectedDeviceId = nextKey;
      _midi.prefs.selectedDeviceName = nextKey === "all" ? "" : (_midi.devices.find(d => d.id === nextKey)?.name || "");
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

function syncMidiSettingsUI(options = {}) {
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

  const needsAct = Boolean(_midi.prefs.enabled && _midi.status === "needs-activation" && !unsupported);
  const quickRow = document.getElementById("midiQuickActionsRow");
  const activateBtn = document.getElementById("midiActivateBtn");
  if (quickRow) quickRow.classList.toggle("hidden", !needsAct);
  if (activateBtn) activateBtn.classList.toggle("hidden", !needsAct);

  const optionsWrap = document.getElementById("midiOptionsWrap");
  if (optionsWrap) {
    optionsWrap.classList.toggle("hidden", !_midi.prefs.enabled || unsupported || needsAct);
  }

  const ffHint = document.getElementById("midiFirefoxHint");
  if (ffHint) {
    const showFfHint = Boolean(
      isFirefoxBrowser() &&
      _midi.transport !== "native" &&
      !isMidiConnected()
    );
    ffHint.classList.toggle("hidden", !showFfHint);
    if (showFfHint) {
      ffHint.textContent = tr(
        "Hinweis für Firefox: Firefox macht Web MIDI leider umständlich (eigenes Berechtigungs-Add-on, kein MIDI in lokalen Dateien, oft kein Plug & Play nach Browserstart). Für reibungsloses MIDI am Computer empfehlen wir Chrome, Edge oder Brave – oder die Lauscher Android-App.",
        "Note for Firefox: Firefox makes Web MIDI cumbersome (requires a site-permission add-on, blocks local files, and often misses keyboards plugged in after startup). For smooth plug-and-play MIDI on desktop, we recommend Chrome, Edge or Brave — or the Lauscher Android app."
      );
    }
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

  // Offenes Geräte-Dropdown nicht während eines stillen Polling-Ticks schließen
  const dropdownOpen = typeof _openProfileDropdownKey !== "undefined" && _openProfileDropdownKey === "settings-midi-device";
  if (!dropdownOpen || options.devicesChanged) {
    renderMidiDeviceDropdown();
  }
  renderMidiBleDevicesUI();

  // Beim Öffnen der Einstellungen in Web MIDI still nach neu angeschlossenen Geräten schauen (max. alle 2 s)
  const settingsOpen = typeof getOpenModalName === "function" && getOpenModalName() === "settings";
  if (settingsOpen && _midi.prefs.enabled && _midi.transport === "web" && _midi.devices.length === 0 &&
      _midi.webAccess && (Date.now() - _midi.lastRescanAt) > 2000) {
    syncWebMidiPollTimer();
    enableWebMidiTransport({ userInitiated: false, silentRefresh: true });
  }
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
      ${!connected && _midi.prefs.enabled ? `
        <button type="button" class="popover-pill-btn" data-midi-pop="rescan">
          ${escapeHtml(_midi.status === "needs-activation" ? tr("Jetzt verbinden", "Connect now") : tr("Neu suchen", "Rescan"))}
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
      } else if (act === "rescan") {
        if (_midi.status === "needs-activation") {
          enableMidiInput(true).then(() => renderInlineMidiPopover());
        } else {
          rescanMidiDevices({ userInitiated: true }).then(() => renderInlineMidiPopover());
        }
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

function syncAllMidiUI(options = {}) {
  syncMidiSettingsUI(options);
  syncMidiStatusChips();
  if (typeof syncMidiPlayPadUI === "function") syncMidiPlayPadUI();
}

// ---------- App-Lebenszyklus (Hintergrund / Vordergrund / Start) ----------

function onMidiAppBackground() {
  stopNativeBleScan();
  stopWebMidiPollTimer();
  clearMidiHeldNotes();
  if (_midi.localControlApplied) {
    applyMidiLocalControl(false);
  }
}

function onMidiAppForeground() {
  if (!_midi.prefs.enabled) return;
  if (_midi.transport === "web") {
    syncWebMidiPollTimer();
    if (_midi.devices.length === 0 && (_midi.webAccess || _midi.permissionState === "granted") &&
        (Date.now() - _midi.lastRescanAt) > 1500) {
      enableWebMidiTransport({ userInitiated: false, silentRefresh: true });
    }
  }
  if (shouldSilenceExternalKeyboard() && _midi.devices.length > 0) {
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

  document.getElementById("midiRescanBtn")?.addEventListener("click", () => {
    rescanMidiDevices({ userInitiated: true });
  });

  document.getElementById("midiActivateBtn")?.addEventListener("click", () => {
    enableMidiInput(true);
  });

  document.getElementById("exerciseMidiChipBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleInlineMidiPopover();
  });

  document.getElementById("freeplayMidiChipBtn")?.addEventListener("click", () => {
    if (typeof openSettingsModal === "function") openSettingsModal("midi");
  });

  // Beim Schließen der Seite Local Control sauber wiederherstellen;
  // bei Fenster-Fokus (z. B. Rückkehr aus Audio-MIDI-Setup) in Firefox/Web MIDI still nach Geräten suchen
  if (typeof window !== "undefined") {
    window.addEventListener("pagehide", () => {
      onMidiAppBackground();
    });
    window.addEventListener("focus", () => {
      if (_midi.prefs.enabled && _midi.transport === "web" && _midi.devices.length === 0 &&
          (_midi.webAccess || _midi.permissionState === "granted") &&
          (Date.now() - _midi.lastRescanAt) > 1500) {
        enableWebMidiTransport({ userInitiated: false, silentRefresh: true });
      }
    });
  }

  // Wenn Nutzer MIDI früher schon bewusst eingeschaltet hat, still wiederverbinden
  if (_midi.prefs.enabled && _midi.transport !== "none") {
    enableMidiInput(false);
  } else {
    if (_midi.transport === "web") queryMidiPermissionState();
    syncAllMidiUI();
  }
}
