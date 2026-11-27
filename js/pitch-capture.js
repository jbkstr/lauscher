// =====================================================
// MIKROFON-TONHÖHENERKENNUNG FÜR ÜBUNGEN (js/pitch-capture.js)
// - Öffnet das Mikrofon im Haupt-AudioContext der Engine (ein Context für Wiedergabe und
//   Aufnahme – wichtig auf dem iPhone) bzw. über das native Android-Plugin.
// - Liefert alle ~25 ms einen Messpunkt { t, db, voiced, freq, midi, clarity } an einen Listener.
// - Die eigentliche Tonhöhenerkennung (MPM/NSDF + Tiefton-Pfad) kommt aus js/tuner.js.
//   Tuner und Übungen laufen nie gleichzeitig, deshalb sind die geteilten Arbeitspuffer in
//   _tuner frei (vor dem Start wird ein laufender Tuner sicherheitshalber beendet).
// Nichts wird aufgezeichnet oder gespeichert: Jeder Puffer wird sofort ausgewertet und überschrieben.
// =====================================================
"use strict";

const PITCH_CAPTURE_CONFIG = Object.freeze({
  windowSize: 4096,          // ~85 ms bei 48 kHz: reicht für tiefe Männerstimmen, reagiert schneller als der Tuner
  windowSizeHighSr: 8192,    // bei Abtastraten > 64 kHz
  hopMs: 25,
  floorInitDb: -62,
  floorMinDb: -82,
  floorMaxDb: -30,
  floorAdaptDown: 0.14,      // Grundrauschen sinkt schnell nach …
  floorAdaptUp: 0.02,        // … und steigt nur langsam (Gesang soll die Schwelle nicht hochziehen)
  gateOpenDb: 12,            // Öffnungsschwelle über dem Grundrauschen
  gateCloseDb: 8,
  clarityMin: 0.8,
  medianLength: 3
});

const _pitchCapture = {
  running: false,
  startPromise: null,
  startGen: 0,          // wird von stopPitchCapture() erhöht → bricht einen laufenden Start ab
  ctx: null,
  stream: null,
  source: null,
  filterNodes: [],
  analyser: null,
  sink: null,
  native: false,
  nativeSeq: -1,
  nativePending: false,
  nativeSampleRate: 48000,
  timeBuf: null,
  filteredBuf: null,
  timerId: 0,
  floorDb: PITCH_CAPTURE_CONFIG.floorInitDb,
  floorFrozen: false,
  gateOpen: false,
  medianRing: [],
  bluetoothMic: false,
  listener: null
};

function isPitchCaptureRunning() {
  return _pitchCapture.running;
}

function isPitchCaptureBluetooth() {
  return Boolean(_pitchCapture.bluetoothMic);
}

/** Einen einzigen Empfänger für Messpunkte setzen (null = keiner). */
function setPitchCaptureListener(fn) {
  _pitchCapture.listener = typeof fn === "function" ? fn : null;
}

/**
 * Grundrausch-Messung einfrieren, solange die App selbst Klang abspielt
 * (sonst würde das eigene Vorspielen die Öffnungsschwelle hochziehen).
 */
function setPitchCaptureFloorFrozen(frozen) {
  _pitchCapture.floorFrozen = Boolean(frozen);
}

function getPitchCaptureFloorDb() {
  return _pitchCapture.floorDb;
}

function mapPitchCaptureError(err) {
  const name = String(err?.name || "");
  const code = String(err?.code || err?.message || "");
  if (name === "NotAllowedError" || name === "SecurityError" || /PERMISSION_DENIED|denied/i.test(code)) return "denied";
  if (name === "NotFoundError" || name === "OverconstrainedError") return "notfound";
  return "failed";
}

/**
 * Startet das Mikrofon. Ergebnis: { ok: true } oder { ok: false, reason: "insecure" | "denied" | "notfound" | "failed" }.
 * Mehrfache Aufrufe während des Starts teilen sich denselben Vorgang.
 */
function startPitchCapture() {
  if (_pitchCapture.running) return Promise.resolve({ ok: true });
  if (_pitchCapture.startPromise) return _pitchCapture.startPromise;
  _pitchCapture.startPromise = startPitchCaptureInternal().finally(() => {
    _pitchCapture.startPromise = null;
  });
  return _pitchCapture.startPromise;
}

async function startPitchCaptureInternal() {
  if (typeof _tuner !== "undefined" && _tuner.running && typeof stopTunerSession === "function") {
    stopTunerSession();
  }
  const nativePlugin = typeof getNativeRawAudioTunerPlugin === "function" ? getNativeRawAudioTunerPlugin() : null;
  const hasMedia = typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia);
  if (!nativePlugin && (!hasMedia || window.isSecureContext === false)) {
    return { ok: false, reason: "insecure" };
  }

  resetPitchCaptureTracking();
  // Wurde während eines await gestoppt (z. B. „Zurück“ im Berechtigungsdialog), nicht mehr starten
  const startGen = _pitchCapture.startGen;
  const isStartCancelled = () => startGen !== _pitchCapture.startGen;

  // 1) Android-App: Rohsignal über das native Plugin (AudioSource.UNPROCESSED)
  if (nativePlugin) {
    try {
      const info = await nativePlugin.start();
      if (isStartCancelled()) {
        try { nativePlugin.stop?.()?.catch?.(() => {}); } catch (_) {}
        return { ok: false, reason: "cancelled" };
      }
      const sr = Number(info?.sampleRate) || 48000;
      const bufSize = Number(info?.bufferSize) || PITCH_CAPTURE_CONFIG.windowSize;
      Object.assign(_pitchCapture, {
        native: true,
        nativeSeq: -1,
        nativePending: false,
        nativeSampleRate: sr,
        timeBuf: new Float32Array(bufSize),
        filteredBuf: new Float32Array(bufSize),
        bluetoothMic: Boolean(info?.bluetoothMic),
        running: true
      });
      _pitchCapture.timerId = setInterval(pitchCaptureTick, PITCH_CAPTURE_CONFIG.hopMs);
      return { ok: true };
    } catch (nativeErr) {
      const reason = mapPitchCaptureError(nativeErr);
      if (reason === "denied" || !hasMedia) return { ok: false, reason };
    }
  }

  // 2) Browser / iOS / WebView: getUserMedia ohne Sprachverarbeitung des Systems, im Context der Engine
  let pendingStream = null;
  try {
    if (typeof setTunerCaptureSession === "function") setTunerCaptureSession(true);
    if (!audioEngine.isInitialized || !audioEngine.rawCtx) {
      await ensureAudioReady();
    }
    const throwIfCancelled = () => {
      if (!isStartCancelled()) return;
      const cancelErr = new Error("Pitch capture start cancelled");
      cancelErr.name = "PitchCaptureCancelled";
      throw cancelErr;
    };
    throwIfCancelled();
    const ctx = audioEngine.rawCtx;
    if (!ctx) throw new Error("No AudioContext");

    const { stream, bluetoothMic } = await requestRawTunerMediaStream();
    pendingStream = stream;
    throwIfCancelled();

    // Nach dem Wechsel auf "play-and-record" kann der Context auf iOS kurz unterbrochen sein
    if (ctx.state === "suspended" || ctx.state === "interrupted") {
      await Promise.race([
        Promise.resolve(ctx.resume()).catch(() => {}),
        new Promise(resolve => setTimeout(resolve, 1500))
      ]);
    }
    throwIfCancelled();
    if (ctx.state !== "running") {
      const ctxErr = new Error(`AudioContext state: ${ctx.state}`);
      ctxErr.name = "AudioContextNotRunning";
      throw ctxErr;
    }

    const sr = Number(ctx.sampleRate) || 48000;
    const winSize = sr > 64000 ? PITCH_CAPTURE_CONFIG.windowSizeHighSr : PITCH_CAPTURE_CONFIG.windowSize;
    const source = ctx.createMediaStreamSource(stream);
    const lpHz = Math.min(TUNER_LP_HZ, sr * 0.45);
    const makeBiquad = (type, freq, q) => {
      const node = ctx.createBiquadFilter();
      node.type = type;
      node.frequency.value = freq;
      node.Q.value = q;
      return node;
    };
    const filterNodes = [
      makeBiquad("highpass", TUNER_HP_HZ, TUNER_BW4_Q1),
      makeBiquad("highpass", TUNER_HP_HZ, TUNER_BW4_Q2),
      makeBiquad("lowpass", lpHz, TUNER_BW4_Q1),
      makeBiquad("lowpass", lpHz, TUNER_BW4_Q2)
    ];
    const analyser = ctx.createAnalyser();
    analyser.fftSize = winSize;
    analyser.smoothingTimeConstant = 0;
    // Stummer Abzweig zum Ausgang, damit der Analyser zuverlässig mitläuft (nie hörbar)
    const sink = ctx.createGain();
    sink.gain.value = 0;
    let chain = source;
    filterNodes.forEach(node => {
      chain.connect(node);
      chain = node;
    });
    chain.connect(analyser);
    analyser.connect(sink);
    sink.connect(ctx.destination);

    Object.assign(_pitchCapture, {
      native: false,
      ctx,
      stream,
      source,
      filterNodes,
      analyser,
      sink,
      timeBuf: new Float32Array(analyser.fftSize),
      bluetoothMic: Boolean(bluetoothMic),
      running: true
    });
    pendingStream = null;
    _pitchCapture.timerId = setInterval(pitchCaptureTick, PITCH_CAPTURE_CONFIG.hopMs);
    return { ok: true };
  } catch (err) {
    if (pendingStream) {
      try { pendingStream.getTracks().forEach(t => t.stop()); } catch (_) {}
    }
    if (!_pitchCapture.running && typeof setTunerCaptureSession === "function") setTunerCaptureSession(false);
    if (err?.name === "PitchCaptureCancelled") return { ok: false, reason: "cancelled" };
    return { ok: false, reason: mapPitchCaptureError(err) };
  }
}

/** Mikrofon schließen (der AudioContext gehört der Engine und bleibt offen). */
function stopPitchCapture() {
  _pitchCapture.startGen++;
  if (_pitchCapture.timerId) clearInterval(_pitchCapture.timerId);
  _pitchCapture.timerId = 0;
  const wasRunning = _pitchCapture.running;
  _pitchCapture.running = false;
  if (_pitchCapture.native) {
    _pitchCapture.native = false;
    _pitchCapture.nativePending = false;
    try { getNativeRawAudioTunerPlugin()?.stop?.().catch?.(() => {}); } catch (_) {}
  }
  if (_pitchCapture.stream) {
    try { _pitchCapture.stream.getTracks().forEach(t => { try { t.stop(); } catch (_) {} }); } catch (_) {}
  }
  try { _pitchCapture.source?.disconnect(); } catch (_) {}
  (_pitchCapture.filterNodes || []).forEach(node => { try { node?.disconnect(); } catch (_) {} });
  try { _pitchCapture.analyser?.disconnect(); } catch (_) {}
  try { _pitchCapture.sink?.disconnect(); } catch (_) {}
  Object.assign(_pitchCapture, {
    ctx: null, stream: null, source: null, filterNodes: [], analyser: null, sink: null,
    timeBuf: null, filteredBuf: null, bluetoothMic: false
  });
  if (wasRunning && typeof setTunerCaptureSession === "function") setTunerCaptureSession(false);
  resetPitchCaptureTracking();
}

function resetPitchCaptureTracking() {
  _pitchCapture.floorDb = PITCH_CAPTURE_CONFIG.floorInitDb;
  _pitchCapture.gateOpen = false;
  _pitchCapture.medianRing = [];
}

function pitchCaptureTick() {
  if (!_pitchCapture.running) return;
  if (_pitchCapture.native) {
    pollPitchCaptureNativeFrame();
    return;
  }
  const analyser = _pitchCapture.analyser;
  const ctx = _pitchCapture.ctx;
  if (!analyser || !ctx) return;
  analyser.getFloatTimeDomainData(_pitchCapture.timeBuf);
  analyzePitchCaptureBuffer(_pitchCapture.timeBuf, ctx.sampleRate);
}

function pollPitchCaptureNativeFrame() {
  if (_pitchCapture.nativePending) return;
  const plugin = getNativeRawAudioTunerPlugin();
  if (!plugin) return;
  _pitchCapture.nativePending = true;
  plugin.readBuffer({ lastSeq: _pitchCapture.nativeSeq }).then(frame => {
    _pitchCapture.nativePending = false;
    if (!_pitchCapture.running || !_pitchCapture.native) return;
    if (frame && frame.running === false) {
      stopPitchCapture();
      return;
    }
    if (!frame || frame.unchanged || !frame.pcm16Base64) return;
    _pitchCapture.nativeSeq = Number(frame.seq ?? _pitchCapture.nativeSeq);
    const sr = Number(frame.sampleRate) || _pitchCapture.nativeSampleRate || 48000;
    _pitchCapture.nativeSampleRate = sr;
    const raw = decodePcm16Base64ToFloat32(frame.pcm16Base64, _pitchCapture.timeBuf);
    _pitchCapture.timeBuf = raw;
    const signal = frame.bandpassApplied ? raw : applyTunerBandpass(raw, sr, _pitchCapture.filteredBuf);
    if (!frame.bandpassApplied) _pitchCapture.filteredBuf = signal;
    analyzePitchCaptureBuffer(signal, sr);
  }).catch(() => {
    _pitchCapture.nativePending = false;
  });
}

function pushPitchCaptureMedian(midi) {
  const ring = _pitchCapture.medianRing;
  // Bei Tonsprung (> 1,5 Halbtöne) neu anfangen, damit der neue Ton sofort erscheint
  if (ring.length && Math.abs(ring[ring.length - 1] - midi) > 1.5) ring.length = 0;
  ring.push(midi);
  while (ring.length > PITCH_CAPTURE_CONFIG.medianLength) ring.shift();
  const sorted = ring.slice().sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function analyzePitchCaptureBuffer(signal, sampleRate) {
  const cfg = PITCH_CAPTURE_CONFIG;
  const now = performance.now();
  const levels = measureTunerSignalLevels(signal, sampleRate);
  const hopDb = levels.hopDb;
  const hasMinRms = levels.rms >= TUNER_CONFIG.noiseGateAbsMinRms;

  // Adaptives Grundrauschen (nur bei geschlossenem Gate und nicht während eigener Wiedergabe)
  if (!_pitchCapture.gateOpen && !_pitchCapture.floorFrozen && Number.isFinite(hopDb)) {
    const alpha = hopDb < _pitchCapture.floorDb ? cfg.floorAdaptDown : cfg.floorAdaptUp;
    _pitchCapture.floorDb += alpha * (hopDb - _pitchCapture.floorDb);
    _pitchCapture.floorDb = Math.max(cfg.floorMinDb, Math.min(cfg.floorMaxDb, _pitchCapture.floorDb));
  }

  const openDb = _pitchCapture.floorDb + cfg.gateOpenDb;
  const closeDb = _pitchCapture.floorDb + cfg.gateCloseDb;
  if (!_pitchCapture.gateOpen) {
    if (hasMinRms && hopDb >= openDb) _pitchCapture.gateOpen = true;
  } else if (!hasMinRms || Math.max(hopDb, levels.windowDb) < closeDb) {
    _pitchCapture.gateOpen = false;
    _pitchCapture.medianRing = [];
  }

  const frame = { t: now, db: hopDb, floorDb: _pitchCapture.floorDb, voiced: false, freq: 0, midi: null, clarity: 0 };
  if (_pitchCapture.gateOpen) {
    const profile = TUNER_DSP_PROFILES.voice;
    const prep = prepareTunerMainWorkBuffer(signal, sampleRate, null);
    const res = detectTunerPitchWithProfile(signal, sampleRate, prep, profile.searchRange[0], profile.searchRange[1], profile, 0);
    if (res.freq > 0 && res.clarity >= cfg.clarityMin) {
      const midiRaw = tunerFreqToMidiFloat(res.freq);
      const midi = pushPitchCaptureMedian(midiRaw);
      frame.voiced = true;
      frame.freq = res.freq;
      frame.midi = midi;
      frame.clarity = res.clarity;
    }
  }
  if (_pitchCapture.listener) {
    try { _pitchCapture.listener(frame); } catch (err) { console.error(err); }
  }
}
