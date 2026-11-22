// =====================================================
// CHROMATISCHER TUNER (#viewTuner)
// Rohmikrofon (Android AudioSource.UNPROCESSED / Web getUserMedia ohne OS-DSP)
// → universeller Bandpass (25 Hz HP / 4,2 kHz LP)
// → Adaptives Noise-Gate + RMS-Normalisierung + Transienten-Ausblendung + Decay-Pitch-Lock
// → MPM/NSDF + Oberton-HPS (Residualton) + Parabolische Interpolation
// → Median-Filter + EMA mit Sprung-Reset → Zeiger, Spektrum & Saiten.
// Alles läuft lokal; das Mikrofon wird beim Verlassen sofort freigegeben.
// =====================================================

// Zentrale Tuning-Parameter (für einfaches Feinjustieren an einer Stelle gebündelt)
const TUNER_CONFIG = Object.freeze({
  // Referenz & Anzeige
  a4Default: 440,
  a4Min: 430,
  a4Max: 450,
  centsRange: 50,               // Zeigerausschlag ±50 Cent
  gaugeDeg: 58,                 // Winkel bei ±50 Cent

  // Sliding-Window-Analyse & Bandpass
  windowSize: 8192,             // ~170 ms bei 48 kHz (≥ 5 Perioden selbst bei tiefem B0 = 30,9 Hz)
  windowSizeHighSr: 16384,      // Fenstergröße bei Sample-Rates > 64 kHz (z. B. 96 kHz Audio-Interface)
  hopMs: 25,                    // Hop Size für flüssige Auswertung (20–30 ms)
  hpHz: 25,                     // Universeller Hochpass gegen Trittschall / Rumpeln (4. Ordnung)
  lpHz: 4200,                   // Universeller Tiefpass gegen hochfrequentes Zischen & Aliasing (4. Ordnung)
  bw4Q1: 0.5411961,             // 4. Ordnung Butterworth Stufe 1
  bw4Q2: 1.3065630,             // 4. Ordnung Butterworth Stufe 2

  // 1) Adaptives Noise-Gate & RMS-Normalisierung
  noiseFloorInitMs: 350,        // Kurze Grundrausch-Messung direkt nach Start
  noiseFloorDefaultDb: -60,     // Start-Schätzwert vor den ersten Frames
  noiseFloorMinDb: -78,         // Untere Schranke (digitale Stille)
  noiseFloorMaxDb: -28,         // Obere Schranke (sehr laute Umgebung)
  noiseFloorAdaptDownAlpha: 0.06, // Nachführung nach unten in Spielpausen
  noiseFloorAdaptUpAlpha: 0.025,  // Langsame Nachführung nach oben in Spielpausen
  noiseGateOffsetDb: 13.5,      // Öffnungsschwelle relativ zum Noise-Floor (+12 bis +15 dB)
  noiseGateCloseOffsetDb: 9.5,  // Hysterese-Schließschwelle im Ausklang
  noiseGateAbsMinRms: 0.0005,   // Absolutes Minimum (~ -66 dBFS) gegen Null-Puffer
  rmsNormTarget: 0.2,           // Ziel-RMS für Normalisierung vor Pitch-Analyse

  // 2) Anschlag (Transienten) & Ausklang (Pitch-Lock)
  transientRiseDb: 9.0,         // Sprunghafter Pegelanstieg pro Hop für Anschlag-Erkennung
  transientBlankMs: 45,         // Anschlag-Ausblendung (30–50 ms) gegen Zupf-Überschwinger
  pitchLockMinStableFrames: 3,  // Stabile gültige Frames vor Aktivierung des Pitch-Locks
  pitchLockStableCents: 35,     // Max. Abweichung für „stabil erkannt“
  pitchLockWindowRatio: 0.18,   // Suchfenster im Ausklang: ±18 % um letzte stabile Frequenz
  decayDropDb: 2.5,             // Pegelabfall unter Peak ab dem Ausklang angenommen wird
  pitchLockMissLimit: 2,        // Fehlschläge bei starkem Signal bis zum Legato-Unlock

  // 4) Konfidenz, Ausreißer-Filterung & ruhige UI
  clarityMin: 0.78,             // Reguläre Konfidenz-Schwelle (NSDF-Clarity)
  clarityLockMin: 0.70,         // Leicht gelockerte Konfidenz-Schwelle im Pitch-Lock-Ausklang
  clarityInTuneMin: 0.88,       // Hohe Konfidenz für „Sauber gestimmt“-Bestätigung
  medianLength: 5,              // Median-Filterlänge (3–5 gültige Messwerte)
  medianLengthVoice: 7,         // Etwas längerer Median für Gesang
  emaAlpha: 0.28,               // EMA-Glättungsfaktor für Instrumente
  emaAlphaVoice: 0.16,          // Ruhigerer EMA-Faktor für Gesang
  emaResetCents: 65,            // Sofortiger EMA-Reset bei Frequenzsprung > 50–80 Cent
  holdMs: 360,                  // Haltezeit bei Signalverlust / niedriger Konfidenz
  idleFadeMs: 460,              // Sanfter Übergang in den Ruhezustand nach der Haltezeit
  inTuneHoldMs: 450             // Haltedauer in der Zielzone für „Sauber gestimmt!“
});

const TUNER_A4_DEFAULT = TUNER_CONFIG.a4Default;
const TUNER_A4_MIN = TUNER_CONFIG.a4Min;
const TUNER_A4_MAX = TUNER_CONFIG.a4Max;
const TUNER_CENTS_RANGE = TUNER_CONFIG.centsRange;
const TUNER_GAUGE_DEG = TUNER_CONFIG.gaugeDeg;
const TUNER_HP_HZ = TUNER_CONFIG.hpHz;
const TUNER_LP_HZ = TUNER_CONFIG.lpHz;
const TUNER_BW4_Q1 = TUNER_CONFIG.bw4Q1;
const TUNER_BW4_Q2 = TUNER_CONFIG.bw4Q2;

// Instrumente & Stimmungen (Noten in internationaler Schreibweise, tiefste Saite zuerst)
const TUNER_INSTRUMENTS = {
  chromatic: { de: "Chromatisch", en: "Chromatic", range: [30, 1800], tolerance: 4, tunings: null },
  guitar: { de: "Gitarre", en: "Guitar", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["E2", "A2", "D3", "G3", "B3", "E4"] },
    halfDown: { de: "Halbton tiefer", en: "Half step down", notes: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"], flat: true },
    dropD: { de: "Drop D", en: "Drop D", notes: ["D2", "A2", "D3", "G3", "B3", "E4"] },
    dadgad: { de: "DADGAD", en: "DADGAD", notes: ["D2", "A2", "D3", "G3", "A3", "D4"] },
    openG: { de: "Open G", en: "Open G", notes: ["D2", "G2", "D3", "G3", "B3", "D4"] },
    openD: { de: "Open D", en: "Open D", notes: ["D2", "A2", "D3", "F#3", "A3", "D4"] }
  } },
  eguitar: { de: "E-Gitarre", en: "Electric guitar", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["E2", "A2", "D3", "G3", "B3", "E4"] },
    halfDown: { de: "Halbton tiefer", en: "Half step down", notes: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"], flat: true },
    dropD: { de: "Drop D", en: "Drop D", notes: ["D2", "A2", "D3", "G3", "B3", "E4"] },
    dropC: { de: "Drop C", en: "Drop C", notes: ["C2", "G2", "C3", "F3", "A3", "D4"] },
    sevenString: { de: "7-saitig", en: "7-string", notes: ["B1", "E2", "A2", "D3", "G3", "B3", "E4"] }
  } },
  ebass: { de: "E-Bass", en: "Electric bass", tolerance: 4, tunings: {
    four: { de: "4-saitig", en: "4-string", notes: ["E1", "A1", "D2", "G2"] },
    five: { de: "5-saitig", en: "5-string", notes: ["B0", "E1", "A1", "D2", "G2"] },
    dropD: { de: "Drop D", en: "Drop D", notes: ["D1", "A1", "D2", "G2"] },
    halfDown: { de: "Halbton tiefer", en: "Half step down", notes: ["Eb1", "Ab1", "Db2", "Gb2"], flat: true }
  } },
  mandolin: { de: "Mandoline", en: "Mandolin", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["G3", "D4", "A4", "E5"] }
  } },
  banjo: { de: "Banjo", en: "Banjo", tolerance: 4, tunings: {
    openG: { de: "Open G", en: "Open G", notes: ["G4", "D3", "G3", "B3", "D4"] },
    doubleC: { de: "Double C", en: "Double C", notes: ["G4", "C3", "G3", "C4", "D4"] }
  } },
  violin: { de: "Violine", en: "Violin", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["G3", "D4", "A4", "E5"] }
  } },
  viola: { de: "Viola", en: "Viola", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["C3", "G3", "D4", "A4"] }
  } },
  cello: { de: "Cello", en: "Cello", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["C2", "G2", "D3", "A3"] }
  } },
  doublebass: { de: "Kontrabass", en: "Double bass", tolerance: 4, tunings: {
    orchestra: { de: "Orchester", en: "Orchestral", notes: ["E1", "A1", "D2", "G2"] },
    solo: { de: "Solo", en: "Solo", notes: ["F#1", "B1", "E2", "A2"] }
  } },
  voice: { de: "Gesang", en: "Voice", range: [65, 1300], tolerance: 10, smooth: true, tunings: null }
};

const TUNER_NOTE_LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function tunerNoteToMidi(name) {
  const m = /^([A-G])([#b]?)(-?\d)$/.exec(String(name || ""));
  if (!m) return 69;
  const acc = m[2] === "#" ? 1 : (m[2] === "b" ? -1 : 0);
  return (parseInt(m[3], 10) + 1) * 12 + TUNER_NOTE_LETTER_PC[m[1]] + acc;
}

function getTunerPrefs() {
  const raw = state.profile?.tuner || {};
  let instrument = TUNER_INSTRUMENTS[raw.instrument] ? raw.instrument : null;
  if (!instrument) {
    // Erstes Öffnen: Instrument aus dem Musiker-Profil ableiten
    const insts = state.profile?.instruments || [];
    instrument = insts.includes("Gitarre") ? "guitar"
      : (insts.includes("Bass") ? "ebass"
        : (insts.includes("Streicher") ? "violin"
          : (insts.includes("Gesang") ? "voice" : "chromatic")));
  }
  const tunings = TUNER_INSTRUMENTS[instrument].tunings;
  const tuning = tunings ? (tunings[raw.tuning] ? raw.tuning : Object.keys(tunings)[0]) : "";
  const a4 = Math.max(TUNER_A4_MIN, Math.min(TUNER_A4_MAX, Math.round(Number(raw.a4) || TUNER_A4_DEFAULT)));
  const mode = raw.mode === "single" ? "single" : "auto";
  const targetMidi = Number.isFinite(Number(raw.targetMidi)) ? Math.max(24, Math.min(96, Math.round(Number(raw.targetMidi)))) : 69;
  return { instrument, tuning, a4, mode, targetMidi };
}

// Läuft schon beim Laden des Profils (vor den Tuner-Konstanten) → nur Literale verwenden
function sanitizeTunerPrefs(raw) {
  if (!raw || typeof raw !== "object") return {};
  const out = {};
  const instrumentKeys = ["chromatic", "guitar", "eguitar", "ebass", "mandolin", "banjo", "violin", "viola", "cello", "doublebass", "voice"];
  if (instrumentKeys.includes(raw.instrument)) out.instrument = raw.instrument;
  if (typeof raw.tuning === "string" && /^[A-Za-z]{1,24}$/.test(raw.tuning)) out.tuning = raw.tuning;
  if (Number.isFinite(Number(raw.a4))) out.a4 = Math.max(430, Math.min(450, Math.round(Number(raw.a4))));
  out.mode = raw.mode === "single" ? "single" : "auto";
  if (Number.isFinite(Number(raw.targetMidi))) out.targetMidi = Math.max(24, Math.min(96, Math.round(Number(raw.targetMidi))));
  return out;
}

function setTunerPrefs(patch) {
  if (!state.profile) return;
  state.profile.tuner = { ...getTunerPrefs(), ...patch };
  saveUserProfile(state.profile);
}

// Aktive Saiten (oder leer bei Chromatisch/Gesang)
function getTunerStrings(prefs = getTunerPrefs()) {
  const inst = TUNER_INSTRUMENTS[prefs.instrument];
  const tuning = inst.tunings ? inst.tunings[prefs.tuning] : null;
  if (!tuning) return [];
  return tuning.notes.map((n, i) => ({ index: i, name: n, midi: tunerNoteToMidi(n), flat: Boolean(tuning.flat) }));
}

function getTunerRange(prefs = getTunerPrefs()) {
  const inst = TUNER_INSTRUMENTS[prefs.instrument];
  const strings = getTunerStrings(prefs);
  if (strings.length) {
    const lo = Math.min(...strings.map(st => st.midi));
    const hi = Math.max(...strings.map(st => st.midi));
    return [tunerMidiToFreq(lo, prefs.a4) / 1.45, tunerMidiToFreq(hi, prefs.a4) * 1.6];
  }
  return inst.range || [30, 1800];
}

function tunerMidiToFreq(midi, a4 = TUNER_A4_DEFAULT) {
  return a4 * Math.pow(2, (midi - 69) / 12);
}

function tunerFreqToMidiFloat(freq, a4 = TUNER_A4_DEFAULT) {
  return 69 + 12 * Math.log2(freq / a4);
}

function formatTunerNote(midi, preferFlat = false) {
  const full = midiToGermanNote(midi, preferFlat);
  const m = /^(.*?)(-?\d+)$/.exec(full);
  return m ? { name: m[1], octave: m[2] } : { name: full, octave: "" };
}

const _tuner = {
  ctx: null, stream: null, source: null, filterNodes: [], analyser: null, sink: null,
  nativeActive: false, nativeSampleRate: 0, nativeSource: "", nativeSeq: -1, nativePending: false,
  activeSampleRate: 0, windowSize: TUNER_CONFIG.windowSize, bluetoothMic: false,
  running: false, starting: false, rafId: 0, lastHopAt: 0,
  // Wiederverwendete TypedArrays für GC-freien Audio-Analyse-Loop
  timeBuf: null, filteredBuf: null, freqBuf: null, work: null, nsdf: null,
  fftRe: null, fftIm: null, fftWin: null, fftMag: null, fftBitRev: null, fftSizeWork: 0,
  peaks: new Int32Array(256), peakHeights: new Float32Array(256), specFloorBuf: new Float32Array(40),
  noiseInitSamples: new Float32Array(24), noiseInitCount: 0, noiseInitUntil: 0,
  noiseFloorDb: TUNER_CONFIG.noiseFloorDefaultDb,
  gateOpen: false, prevHopDb: -120, peakDb: -120, transientUntil: 0,
  // Pitch-Lock (Ausklang)
  lockFreq: 0, lockActive: false, stableFreq: 0, stableCount: 0, lockMissCount: 0,
  // Median-Filter & EMA
  medianRing: new Float64Array(8), medianScratch: new Float64Array(8),
  medianCount: 0, medianPos: 0, jumpCandFreq: 0, jumpCandCount: 0,
  emaFreq: 0, smoothCents: null, displayMidi: null, lastFreq: 0, lastClarity: 0,
  lastPitchAt: 0, idleFadeStartAt: 0, idleStartCents: 0, inQuietFade: false,
  inTuneSince: 0, inTune: false, tunedStrings: new Set(),
  pitchResult: { freq: 0, clarity: 0, rms: 0, hopRms: 0, hopDb: -120, windowDb: -120 },
  loopCtx: { prefs: null, inst: null, tol: 4, strings: null, flat: false, isSingle: false, targetMidi: null, now: 0 },
  refUntil: 0, refNodes: null, wakeLock: null, colors: null, gaugeBuilt: false, openDropdown: null
};

function tunerRmsToDb(rms) {
  return 20 * Math.log10(Math.max(1e-7, rms));
}

function resetTunerMedian() {
  _tuner.medianCount = 0;
  _tuner.medianPos = 0;
  _tuner.jumpCandFreq = 0;
  _tuner.jumpCandCount = 0;
}

function resetTunerPitchLock() {
  _tuner.lockFreq = 0;
  _tuner.lockActive = false;
  _tuner.stableFreq = 0;
  _tuner.stableCount = 0;
  _tuner.lockMissCount = 0;
}

function resetTunerTrackingState(now = performance.now()) {
  _tuner.noiseInitCount = 0;
  _tuner.noiseInitUntil = now + TUNER_CONFIG.noiseFloorInitMs;
  _tuner.noiseFloorDb = TUNER_CONFIG.noiseFloorDefaultDb;
  _tuner.gateOpen = false;
  _tuner.prevHopDb = -120;
  _tuner.peakDb = -120;
  _tuner.transientUntil = 0;
  _tuner.lastHopAt = 0;
  resetTunerPitchLock();
  resetTunerMedian();
  _tuner.emaFreq = 0;
  _tuner.smoothCents = null;
  _tuner.displayMidi = null;
  _tuner.lastFreq = 0;
  _tuner.lastClarity = 0;
  _tuner.lastPitchAt = 0;
  _tuner.idleFadeStartAt = 0;
  _tuner.idleStartCents = 0;
  _tuner.inQuietFade = false;
  _tuner.inTuneSince = 0;
  _tuner.inTune = false;
}

/**
 * Universeller Bandpass (25 Hz Hochpass + 4,2 kHz Tiefpass, 4. Ordnung Butterworth, −24 dB/Okt.)
 * für Roh-PCM-Puffer (nativer Android-Pfad). Nutzt exakt dieselben Filterstufen wie die
 * kaskadierten BiquadFilterNodes im WebAudio-Pfad.
 */
function applyTunerBandpass(input, sampleRate, outBuf) {
  const n = input.length;
  const out = outBuf && outBuf.length === n ? outBuf : new Float32Array(n);
  let mean = 0;
  for (let i = 0; i < n; i++) mean += input[i];
  mean /= Math.max(1, n);

  const calcBiquad = (type, fc, q) => {
    const clampedFc = Math.max(5, Math.min(sampleRate * 0.45, fc));
    const w0 = (2 * Math.PI * clampedFc) / sampleRate;
    const cosW = Math.cos(w0);
    const alpha = Math.sin(w0) / (2 * q);
    let b0, b1, b2;
    if (type === "highpass") {
      b0 = (1 + cosW) * 0.5;
      b1 = -(1 + cosW);
      b2 = (1 + cosW) * 0.5;
    } else {
      b0 = (1 - cosW) * 0.5;
      b1 = 1 - cosW;
      b2 = (1 - cosW) * 0.5;
    }
    const a0 = 1 + alpha;
    return { b0: b0 / a0, b1: b1 / a0, b2: b2 / a0, a1: (-2 * cosW) / a0, a2: (1 - alpha) / a0 };
  };

  const stages = [
    calcBiquad("highpass", TUNER_HP_HZ, TUNER_BW4_Q1),
    calcBiquad("highpass", TUNER_HP_HZ, TUNER_BW4_Q2),
    calcBiquad("lowpass", TUNER_LP_HZ, TUNER_BW4_Q1),
    calcBiquad("lowpass", TUNER_LP_HZ, TUNER_BW4_Q2)
  ];

  for (let i = 0; i < n; i++) out[i] = input[i] - mean;

  // Einschwing-Vorlauf über gespiegelte Anfangs-Samples verhindert Phasenversatz bei tiefem Bass (B0/E1)
  const warmup = Math.min(n - 1, Math.round(sampleRate * 0.08));
  for (let s = 0; s < stages.length; s++) {
    const f = stages[s];
    let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    for (let i = warmup; i > 0; i--) {
      const x0 = out[i];
      const y0 = f.b0 * x0 + f.b1 * x1 + f.b2 * x2 - f.a1 * y1 - f.a2 * y2;
      x2 = x1; x1 = x0; y2 = y1; y1 = y0;
    }
    for (let i = 0; i < n; i++) {
      const x0 = out[i];
      const y0 = f.b0 * x0 + f.b1 * x1 + f.b2 * x2 - f.a1 * y1 - f.a2 * y2;
      x2 = x1; x1 = x0; y2 = y1; y1 = y0;
      out[i] = y0;
    }
  }
  return out;
}

/**
 * Schnelle In-Place-Radix-2-FFT (Hann-gefenstert) für Oberton-Analyse (HPS / Residualton)
 * sowie Spektrum-Anzeige im nativen Android-Modus.
 */
function ensureTunerFftBuffers(n) {
  if (_tuner.fftSizeWork === n && _tuner.fftRe && _tuner.fftIm && _tuner.fftWin && _tuner.fftMag && _tuner.fftBitRev) {
    return;
  }
  const bits = Math.round(Math.log2(n));
  const rev = new Uint32Array(n);
  for (let i = 0; i < n; i++) {
    let x = i, y = 0;
    for (let b = 0; b < bits; b++) {
      y = (y << 1) | (x & 1);
      x >>= 1;
    }
    rev[i] = y;
  }
  const win = new Float32Array(n);
  const denom = Math.max(1, n - 1);
  for (let i = 0; i < n; i++) {
    win[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / denom));
  }
  _tuner.fftRe = new Float32Array(n);
  _tuner.fftIm = new Float32Array(n);
  _tuner.fftWin = win;
  _tuner.fftMag = new Float32Array((n >> 1) + 1);
  _tuner.fftBitRev = rev;
  _tuner.fftSizeWork = n;
}

function computeTunerMagnitudeSpectrum(signal, smoothDbOut = null, dbGainOffset = 0) {
  const n = signal.length;
  if ((n & (n - 1)) !== 0 || n < 64) return null;
  ensureTunerFftBuffers(n);
  const re = _tuner.fftRe;
  const im = _tuner.fftIm;
  const win = _tuner.fftWin;
  const rev = _tuner.fftBitRev;
  const mag = _tuner.fftMag;

  for (let i = 0; i < n; i++) {
    const j = rev[i];
    re[j] = signal[i] * win[i];
    im[j] = 0;
  }

  for (let len = 2; len <= n; len <<= 1) {
    const half = len >> 1;
    const ang = (-2 * Math.PI) / len;
    const wCos = Math.cos(ang);
    const wSin = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let curRe = 1;
      let curIm = 0;
      for (let j = 0; j < half; j++) {
        const uRe = re[i + j];
        const uIm = im[i + j];
        const k = i + j + half;
        const vRe = re[k] * curRe - im[k] * curIm;
        const vIm = re[k] * curIm + im[k] * curRe;
        re[i + j] = uRe + vRe;
        im[i + j] = uIm + vIm;
        re[k] = uRe - vRe;
        im[k] = uIm - vIm;
        const nextRe = curRe * wCos - curIm * wSin;
        curIm = curRe * wSin + curIm * wCos;
        curRe = nextRe;
      }
    }
  }

  const scale = 2 / (n * 0.5); // Hann-Fenster-Korrektur
  const halfBins = n >> 1;
  for (let i = 0; i <= halfBins; i++) {
    const m = Math.hypot(re[i], im[i]) * scale;
    mag[i] = m;
    if (smoothDbOut && i < smoothDbOut.length) {
      const db = 20 * Math.log10(Math.max(1e-7, m)) + dbGainOffset;
      const prev = Number.isFinite(smoothDbOut[i]) && smoothDbOut[i] > -139 ? smoothDbOut[i] : db;
      smoothDbOut[i] = prev * 0.55 + db * 0.45;
    }
  }
  return mag;
}

function tunerSpectralPeakAround(mag, freqHz, binHz) {
  if (!mag || !binHz || freqHz <= 0) return 0;
  const maxBin = mag.length - 1;
  const center = freqHz / binHz;
  if (center < 1 || center >= maxBin) return 0;
  const r = Math.max(1, Math.min(3, Math.round(center * 0.035)));
  const lo = Math.max(1, Math.floor(center) - r);
  const hi = Math.min(maxBin, Math.ceil(center) + r);
  let best = 0;
  for (let b = lo; b <= hi; b++) {
    if (mag[b] > best) best = mag[b];
  }
  return best;
}

function tunerSpectralNoiseFloor(mag, freqHz, binHz) {
  if (!mag || !binHz) return 0;
  const center = Math.round(freqHz / binHz);
  const lo = Math.max(2, center - 16);
  const hi = Math.min(mag.length - 1, center + 16);
  const vals = _tuner.specFloorBuf;
  let count = 0;
  for (let b = lo; b <= hi && count < vals.length; b++) {
    if (Math.abs(b - center) <= 2) continue;
    // In-Place-Insertionsort ohne Heap-Allokation
    const v = mag[b];
    let pos = count;
    while (pos > 0 && vals[pos - 1] > v) {
      vals[pos] = vals[pos - 1];
      pos--;
    }
    vals[pos] = v;
    count++;
  }
  if (!count) return 0;
  return vals[Math.floor(count * 0.4)];
}

/**
 * Oberton-Kamm (Harmonic Product Spectrum inkl. Missing-Fundamental-Variante):
 * Bestimmt bei stark abgeschwächtem Grundton (z. B. tiefes E1 = 41,2 Hz über Smartphone-Mikrofon)
 * die Grundfrequenz direkt aus den Abständen der Obertöne (2f, 3f, 4f, 5f).
 */
function estimateTunerHpsFreq(mag, binHz, minFreq, maxFreq) {
  if (!mag || !binHz) return 0;
  const maxBin = mag.length - 1;
  const bMin = Math.max(2, Math.floor(minFreq / binHz));
  const bMax = Math.min(Math.floor(maxBin / 4), Math.ceil(maxFreq / binHz));
  if (bMax <= bMin) return 0;

  let bestBin = 0;
  let bestScore = 0;
  for (let b = bMin; b <= bMax; b++) {
    const f = b * binHz;
    const m1 = tunerSpectralPeakAround(mag, f, binHz);
    const m2 = tunerSpectralPeakAround(mag, f * 2, binHz);
    const m3 = tunerSpectralPeakAround(mag, f * 3, binHz);
    const m4 = tunerSpectralPeakAround(mag, f * 4, binHz);
    const m5 = f * 5 < maxBin * binHz ? tunerSpectralPeakAround(mag, f * 5, binHz) : m4;
    // Klassisches HPS (1..4) + Residualton-HPS (2..5) für fehlenden Grundton im Tiefbass
    const hpsFull = m1 * m2 * m3 * m4;
    const hpsMissing = f < 220 ? m2 * m3 * m4 * m5 * 0.9 : 0;
    const score = Math.max(hpsFull, hpsMissing);
    if (score > bestScore) {
      bestScore = score;
      bestBin = b;
    }
  }
  if (!bestBin || bestScore <= 1e-12) return 0;
  return bestBin * binHz;
}

function measureTunerSignalLevels(input, sampleRate) {
  const out = _tuner.pitchResult;
  const rawLen = input.length;
  const hopSamples = Math.max(64, Math.min(rawLen, Math.round((sampleRate * TUNER_CONFIG.hopMs) / 1000)));
  const hopStart = rawLen - hopSamples;
  let hopMean = 0;
  for (let i = hopStart; i < rawLen; i++) hopMean += input[i];
  hopMean /= hopSamples;
  let hopEnergy = 0;
  for (let i = hopStart; i < rawLen; i++) {
    const d = input[i] - hopMean;
    hopEnergy += d * d;
  }
  const hopRms = Math.sqrt(hopEnergy / hopSamples);

  // Schneller Gesamtfenster-RMS (mit kleinem Stride für minimalen Overhead)
  const stride = rawLen > 4096 ? 4 : 2;
  let winMean = 0;
  let winCount = 0;
  for (let i = 0; i < rawLen; i += stride) {
    winMean += input[i];
    winCount++;
  }
  winMean /= Math.max(1, winCount);
  let winEnergy = 0;
  for (let i = 0; i < rawLen; i += stride) {
    const d = input[i] - winMean;
    winEnergy += d * d;
  }
  const windowRms = Math.sqrt(winEnergy / Math.max(1, winCount));

  out.rms = windowRms;
  out.hopRms = hopRms;
  out.hopDb = tunerRmsToDb(hopRms);
  out.windowDb = tunerRmsToDb(windowRms);
  return out;
}

/**
 * Oberton-fähige Tonhöhen-Erkennung (GC-frei mit wiederverwendeten TypedArrays):
 * 1) Dynamische Sample-Rate-Dezimierung + DC-Entfernung + RMS-Normalisierung
 * 2) McLeod Pitch Method (NSDF) im Sliding-Window (~170 ms), im Ausklang optional
 *    über Pitch-Lock eng um die letzte stabile Frequenz begrenzt
 * 3) Residualton-/Oktav-Disambiguierung über FFT (ungerade Obertöne 3f/5f & HPS),
 *    damit z. B. ein tiefes E1 (41,2 Hz) auch ohne starken Grundton nicht auf E2 (82,4 Hz) kippt
 * 4) Parabolische Interpolation über die Nachbarwerte für Sub-Cent-Genauigkeit.
 */
function detectTunerPitch(input, sampleRate, minFreq, maxFreq, smoothDbOut = null, lockFreq = 0, spectrumOnly = false) {
  const out = _tuner.pitchResult;
  out.freq = 0;
  out.clarity = 0;

  const rawLen = input.length;
  // Dezimierung abhängig von der tatsächlichen Hardware-Sample-Rate
  const dec = sampleRate > 72000 ? 4 : (sampleRate > 36000 ? 2 : 1);
  const n = Math.floor(rawLen / dec);
  if (!_tuner.work || _tuner.work.length !== n) _tuner.work = new Float32Array(n);
  const x = _tuner.work;
  let mean = 0;
  if (dec === 4) {
    for (let i = 0; i < n; i++) {
      const k = 4 * i;
      const v = (input[k] + input[k + 1] + input[k + 2] + input[k + 3]) * 0.25;
      x[i] = v;
      mean += v;
    }
  } else if (dec === 2) {
    for (let i = 0; i < n; i++) {
      const k = 2 * i;
      const v = (input[k] + input[k + 1]) * 0.5;
      x[i] = v;
      mean += v;
    }
  } else {
    for (let i = 0; i < n; i++) {
      const v = input[i];
      x[i] = v;
      mean += v;
    }
  }
  mean /= Math.max(1, n);
  let rawEnergy = 0;
  for (let i = 0; i < n; i++) {
    const v = x[i] - mean;
    x[i] = v;
    rawEnergy += v * v;
  }
  const windowRms = Math.sqrt(rawEnergy / Math.max(1, n));
  out.rms = windowRms;
  out.windowDb = tunerRmsToDb(windowRms);

  // RMS-Normalisierung vor Pitch-Analyse (unabhängig von Geräte-Mikrofonempfindlichkeit).
  // Für die visuelle Spektrum-Anzeige (smoothDbOut) wird der reale dB-Pegelversatz mitgegeben.
  let energy = rawEnergy;
  let dbGainOffset = 0;
  if (windowRms > 1e-7) {
    const normGain = TUNER_CONFIG.rmsNormTarget / windowRms;
    for (let i = 0; i < n; i++) x[i] *= normGain;
    energy = n * TUNER_CONFIG.rmsNormTarget * TUNER_CONFIG.rmsNormTarget;
    dbGainOffset = -20 * Math.log10(normGain);
  }

  const sr = sampleRate / dec;
  const mag = computeTunerMagnitudeSpectrum(x, smoothDbOut, dbGainOffset);

  if (spectrumOnly) return out;
  if (windowRms < TUNER_CONFIG.noiseGateAbsMinRms) return out;

  // Optionales Pitch-Lock-Suchfenster im Ausklang (±15–20 % um letzte stabile Frequenz)
  const lockRatio = TUNER_CONFIG.pitchLockWindowRatio;
  const searchMinFreq = lockFreq > 0 ? Math.max(minFreq, lockFreq * (1 - lockRatio)) : minFreq;
  const searchMaxFreq = lockFreq > 0 ? Math.min(maxFreq, lockFreq * (1 + lockRatio)) : maxFreq;
  if (searchMaxFreq <= searchMinFreq) return out;

  const minLag = Math.max(2, Math.floor(sr / searchMaxFreq));
  const maxLag = Math.min(Math.floor(n * 0.52), Math.ceil(sr / searchMinFreq));
  if (maxLag <= minLag) return out;

  if (!_tuner.nsdf || _tuner.nsdf.length < maxLag + 2) _tuner.nsdf = new Float32Array(maxLag + 2);
  const nsdf = _tuner.nsdf;
  nsdf.fill(0, 0, maxLag + 2);

  // m(τ) inkrementell: Summe der Quadrate beider Fensterteile
  let m = 2 * energy;
  for (let tau = 1; tau <= maxLag + 1; tau++) {
    m -= x[tau - 1] * x[tau - 1] + x[n - tau] * x[n - tau];
    if (tau < minLag - 1) continue;
    let acf = 0;
    const lim = n - tau;
    for (let j = 0; j < lim; j++) acf += x[j] * x[j + tau];
    nsdf[tau] = m > 1e-9 ? (2 * acf) / m : 0;
  }

  // Positive Bereiche nach dem ersten Nulldurchgang: jeweils höchste Spitze merken (ohne Heap-Allokation).
  // Start ab tau = minLag, damit nsdf[p - 1] und nsdf[p + 1] für die Parabel-Interpolation immer berechnet sind.
  const peaks = _tuner.peaks;
  const peakHeights = _tuner.peakHeights;
  let peakCount = 0;
  let tau = minLag;
  if (tau < maxLag && nsdf[tau] > 0 && nsdf[tau + 1] <= nsdf[tau] && nsdf[tau - 1] >= nsdf[tau]) {
    while (tau <= maxLag && nsdf[tau] > 0) tau++;
  }
  let bestInRegion = -1;
  for (; tau <= maxLag; tau++) {
    const v = nsdf[tau];
    if (v > 0) {
      if (bestInRegion < 0 || v > nsdf[bestInRegion]) bestInRegion = tau;
    } else if (bestInRegion >= 0) {
      if (peakCount < peaks.length) peaks[peakCount++] = bestInRegion;
      bestInRegion = -1;
    }
  }
  if (bestInRegion >= 0 && bestInRegion < maxLag && peakCount < peaks.length) {
    peaks[peakCount++] = bestInRegion;
  }
  if (!peakCount) return out;

  // Parabolisch interpolierte Spitzenhöhe (vermeidet Oktav-Fehlsprünge bei kurzen Lags / hohen Tönen)
  const calcPeakHeight = (p) => {
    const a = nsdf[p - 1];
    const b = nsdf[p];
    const c = nsdf[p + 1];
    const denom = a - 2 * b + c;
    const shift = denom < -1e-9 ? Math.max(-0.5, Math.min(0.5, (a - c) / (2 * denom))) : 0;
    return Math.min(1, b - 0.25 * (a - c) * shift);
  };

  let maxPeak = -Infinity;
  for (let i = 0; i < peakCount; i++) {
    const h = calcPeakHeight(peaks[i]);
    peakHeights[i] = h;
    if (h > maxPeak) maxPeak = h;
  }

  let chosenIdx = 0;
  const threshold = 0.88 * maxPeak;
  for (let i = 0; i < peakCount; i++) {
    if (peakHeights[i] >= threshold) {
      chosenIdx = i;
      break;
    }
  }
  let chosen = peaks[chosenIdx];
  let chosenHeight = peakHeights[chosenIdx];
  const binHz = sr / n;

  // Hilfsfunktion: stärksten NSDF-Peak im ±6%-Fenster um einen Ziel-Lag finden
  const findPeakIdxNear = (targetLag) => {
    if (targetLag < minLag || targetLag > maxLag) return -1;
    const tol = Math.max(2, targetLag * 0.06);
    let bestIdx = -1;
    let bestH = -Infinity;
    for (let i = 0; i < peakCount; i++) {
      const p = peaks[i];
      if (Math.abs(p - targetLag) <= tol && peakHeights[i] > bestH) {
        bestH = peakHeights[i];
        bestIdx = i;
      }
    }
    return bestIdx;
  };

  // Residualton-/Oktav-Prüfung (2× und 3× Lag) nur außerhalb des engen Pitch-Locks:
  // Bei fehlendem/schwachem Grundton (z. B. tiefes E1 = 41,2 Hz) verraten die ungeraden Obertöne
  // (3f, 5f) bzw. der Grundton 1f eindeutig die wahre Grundfrequenz.
  if (!lockFreq) {
    for (let pass = 0; pass < 2; pass++) {
      let improved = false;
      const hCur = chosenHeight;

      // 1) Oktave tiefer (fCur / 2 → Lag ~ 2 * chosen)
      const idx2 = findPeakIdxNear(chosen * 2);
      if (idx2 >= 0) {
        const p2 = peaks[idx2];
        const h2 = peakHeights[idx2];
        const fSub = sr / p2;
        const nsdfRise = h2 > hCur + 0.03;
        let hasAnyOddOrFund = !mag;
        let spectralProof = false;
        if (mag) {
          const m1 = tunerSpectralPeakAround(mag, fSub, binHz);
          const m2 = tunerSpectralPeakAround(mag, fSub * 2, binHz);
          const m3 = tunerSpectralPeakAround(mag, fSub * 3, binHz);
          const m4 = tunerSpectralPeakAround(mag, fSub * 4, binHz);
          const m5 = tunerSpectralPeakAround(mag, fSub * 5, binHz);
          const fl1 = tunerSpectralNoiseFloor(mag, fSub, binHz);
          const fl3 = tunerSpectralNoiseFloor(mag, fSub * 3, binHz);
          const fl5 = tunerSpectralNoiseFloor(mag, fSub * 5, binHz);
          const oddSig = (m3 > fl3 * 3.2 ? m3 : 0) + (m5 > fl5 * 3.2 ? m5 : 0);
          const evenSig = m2 + m4;
          const fundSig = m1 > fl1 * 3.5 ? m1 : 0;
          hasAnyOddOrFund = evenSig > 1e-6 && (fundSig + oddSig) > evenSig * 0.08;
          if (h2 >= hCur * 0.88) {
            const hasRealFund = fundSig > m2 * 0.25;
            const hasOddHarmonics = evenSig > 1e-6 && oddSig > evenSig * 0.22;
            spectralProof = hasRealFund || hasOddHarmonics;
          }
        }
        if ((nsdfRise && hasAnyOddOrFund) || spectralProof) {
          chosen = p2;
          chosenHeight = h2;
          improved = true;
        }
      }

      // 2) Duodezime tiefer (fCur / 3 → Lag ~ 3 * chosen, falls 3. Oberton extrem dominierte)
      if (!improved) {
        const idx3 = findPeakIdxNear(chosen * 3);
        if (idx3 >= 0) {
          const p3 = peaks[idx3];
          const h3 = peakHeights[idx3];
          const fSub = sr / p3;
          const nsdfRise = h3 > hCur + 0.04;
          let hasAnyNonTriple = !mag;
          let spectralProof = false;
          if (mag) {
            const m2 = tunerSpectralPeakAround(mag, fSub * 2, binHz);
            const m3 = tunerSpectralPeakAround(mag, fSub * 3, binHz);
            const m4 = tunerSpectralPeakAround(mag, fSub * 4, binHz);
            const m6 = tunerSpectralPeakAround(mag, fSub * 6, binHz);
            const fl2 = tunerSpectralNoiseFloor(mag, fSub * 2, binHz);
            const fl4 = tunerSpectralNoiseFloor(mag, fSub * 4, binHz);
            const nonTriple = (m2 > fl2 * 3.2 ? m2 : 0) + (m4 > fl4 * 3.2 ? m4 : 0);
            const triple = m3 + m6;
            hasAnyNonTriple = triple > 1e-6 && nonTriple > triple * 0.10;
            if (h3 >= hCur * 0.88) {
              spectralProof = triple > 1e-6 && nonTriple > triple * 0.30;
            }
          }
          if ((nsdfRise && hasAnyNonTriple) || spectralProof) {
            chosen = p3;
            chosenHeight = h3;
            improved = true;
          }
        }
      }
      if (!improved) break;
    }

    // HPS-Absicherung bei grenzwertiger NSDF-Klarheit (z. B. stark verrauschtes/obertonlastiges Signal)
    if (mag && chosenHeight < 0.82) {
      const hpsFreq = estimateTunerHpsFreq(mag, binHz, searchMinFreq, searchMaxFreq);
      if (hpsFreq > 0) {
        const idxHps = findPeakIdxNear(sr / hpsFreq);
        if (idxHps >= 0 && peakHeights[idxHps] >= chosenHeight * 0.92) {
          chosen = peaks[idxHps];
          chosenHeight = peakHeights[idxHps];
        }
      }
    }
  }

  // Parabolische Interpolation über die Nachbarwerte (chosen - 1, chosen, chosen + 1) für Sub-Cent-Genauigkeit
  const a = nsdf[chosen - 1];
  const b = nsdf[chosen];
  const c = nsdf[chosen + 1];
  const denom = a - 2 * b + c;
  const shift = denom < -1e-9 ? Math.max(-0.5, Math.min(0.5, (a - c) / (2 * denom))) : 0;
  const lag = chosen + shift;
  const clarity = Math.min(1, b - 0.25 * (a - c) * shift);
  const freq = sr / lag;
  if (!Number.isFinite(freq) || freq < searchMinFreq * 0.9 || freq > searchMaxFreq * 1.1) return out;
  out.freq = freq;
  out.clarity = clarity;
  return out;
}

function readTunerColors() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name, fb) => (cs.getPropertyValue(name) || "").trim() || fb;
  _tuner.colors = {
    ink: v("--raccoon-dark", "#1F3342"),
    muted: v("--raccoon-muted", "#7A8A94"),
    border: v("--border-soft", "#DDE3E0"),
    lilac: v("--lilac-strong", "#7B6FB3"),
    peach: v("--peach-strong", "#E0704F"),
    sage: v("--sage-strong", "#2E6F4E")
  };
}

// ---------- Zeigerinstrument ----------
function buildTunerGauge() {
  const ticks = document.getElementById("tunerGaugeTicks");
  const zone = document.getElementById("tunerGaugeZone");
  if (!ticks || !zone) return;
  const cx = 150;
  const cy = 168;
  const polar = (deg, r) => {
    const rad = (deg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  let html = "";
  for (let c = -TUNER_CENTS_RANGE; c <= TUNER_CENTS_RANGE; c += 5) {
    const deg = (c / TUNER_CENTS_RANGE) * TUNER_GAUGE_DEG;
    const major = c % 25 === 0;
    const [x1, y1] = polar(deg, major ? 128 : 134);
    const [x2, y2] = polar(deg, 142);
    html += `<line class="tuner-tick${major ? " is-major" : ""}${c === 0 ? " is-center" : ""}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  }
  [[-50, "−50"], [0, "0"], [50, "+50"]].forEach(([c, lbl]) => {
    const [tx, ty] = polar((c / TUNER_CENTS_RANGE) * TUNER_GAUGE_DEG, 116);
    html += `<text class="tuner-tick-label" x="${tx.toFixed(1)}" y="${(ty + 4).toFixed(1)}" text-anchor="middle" font-family="Andika, sans-serif">${lbl}</text>`;
  });
  ticks.innerHTML = html;
  _tuner.gaugeBuilt = true;
  updateTunerGaugeZone();
}

function updateTunerGaugeZone() {
  const zone = document.getElementById("tunerGaugeZone");
  if (!zone) return;
  const tol = TUNER_INSTRUMENTS[getTunerPrefs().instrument].tolerance || 4;
  const cx = 150;
  const cy = 168;
  const r = 136;
  const a = (Math.max(3, tol) / TUNER_CENTS_RANGE) * TUNER_GAUGE_DEG;
  const pt = (deg) => {
    const rad = (deg - 90) * Math.PI / 180;
    return `${(cx + r * Math.cos(rad)).toFixed(1)} ${(cy + r * Math.sin(rad)).toFixed(1)}`;
  };
  zone.setAttribute("d", `M ${pt(-a)} A ${r} ${r} 0 0 1 ${pt(a)}`);
}

// Sichtbarer Ausschnitt des Zeigerinstruments passt sich der verfügbaren Höhe an: immer volle Breite,
// bei viel Höhe mit Drehpunkt (bis 180 Einheiten), bei wenig nur der Skalenbogen (ab 118 Einheiten)
function updateTunerGaugeViewBox() {
  const svg = document.getElementById("tunerGauge");
  if (!svg || !svg.clientWidth) return;
  // Erst das ganze Instrument anbieten, dann messen, wie viel Höhe das Layout tatsächlich hergibt
  svg.setAttribute("viewBox", "0 0 300 180");
  if (!svg.clientHeight) return;
  const vbH = Math.max(118, Math.min(180, Math.round((svg.clientHeight / svg.clientWidth) * 300)));
  const next = `0 0 300 ${vbH}`;
  if (svg.getAttribute("viewBox") !== next) svg.setAttribute("viewBox", next);
}

function setTunerNeedle(cents) {
  const needle = document.getElementById("tunerNeedle");
  if (!needle) return;
  const clamped = Math.max(-TUNER_CENTS_RANGE - 4, Math.min(TUNER_CENTS_RANGE + 4, cents || 0));
  needle.style.transform = `rotate(${((clamped / TUNER_CENTS_RANGE) * TUNER_GAUGE_DEG).toFixed(2)}deg)`;
}

// ---------- Spektrum ----------
function drawTunerSpectrum(detectFreq, targetFreq, inTune) {
  const canvas = document.getElementById("tunerSpectrum");
  if (!canvas || !canvas.getContext) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(10, Math.round(canvas.clientWidth * dpr));
  const h = Math.max(10, Math.round(canvas.clientHeight * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const g = canvas.getContext("2d");
  g.clearRect(0, 0, w, h);
  if (!_tuner.colors) readTunerColors();
  const col = _tuner.colors;
  const prefs = getTunerPrefs();
  const [rLo, rHi] = getTunerRange(prefs);
  const fLo = Math.max(25, rLo);
  const fHi = Math.min(4000, rHi * 2.4);
  const logLo = Math.log(fLo);
  const logSpan = Math.log(fHi) - logLo;
  const xOf = (f) => ((Math.log(f) - logLo) / logSpan) * w;
  const labelH = 13 * dpr;
  const plotH = h - labelH;

  // Raster: Saiten bzw. alle C
  g.font = `700 ${Math.round(9.5 * dpr)}px Andika, sans-serif`;
  g.textAlign = "center";
  g.textBaseline = "bottom";
  const strings = getTunerStrings(prefs);
  const marks = strings.length
    ? strings.map(st => ({ f: tunerMidiToFreq(st.midi, prefs.a4), label: formatTunerNote(st.midi, st.flat).name, idx: st.index }))
    : [];
  if (!strings.length) {
    for (let midi = 12; midi <= 120; midi += 12) {
      const f = tunerMidiToFreq(midi, prefs.a4);
      if (f >= fLo && f <= fHi) marks.push({ f, label: formatTunerNote(midi).name + formatTunerNote(midi).octave });
    }
  }
  marks.forEach(mk => {
    const x = xOf(mk.f);
    if (x < 0 || x > w) return;
    g.strokeStyle = col.border;
    g.lineWidth = dpr;
    g.setLineDash([2 * dpr, 3 * dpr]);
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, plotH);
    g.stroke();
    g.setLineDash([]);
    g.fillStyle = _tuner.tunedStrings.has(mk.idx) ? col.sage : col.muted;
    g.fillText(mk.label, x, h);
  });

  // Live-Spektrum (WebAudio AnalyserNode oder nativer Android-Rohpuffer, dB)
  const hasWebSpec = Boolean(_tuner.analyser && _tuner.ctx && _tuner.freqBuf);
  const hasNativeSpec = Boolean(_tuner.nativeActive && _tuner.freqBuf && _tuner.nativeSampleRate);
  if (_tuner.running && (hasWebSpec || hasNativeSpec)) {
    let binHz;
    if (hasWebSpec) {
      _tuner.analyser.getFloatFrequencyData(_tuner.freqBuf);
      binHz = _tuner.ctx.sampleRate / _tuner.analyser.fftSize;
    } else {
      binHz = _tuner.nativeSampleRate / (_tuner.windowSize || TUNER_CONFIG.windowSize);
    }
    g.beginPath();
    g.moveTo(0, plotH);
    for (let px = 0; px <= w; px += 2 * dpr) {
      const f = Math.exp(logLo + (px / w) * logSpan);
      const bin = f / binHz;
      const i0 = Math.floor(bin);
      const frac = bin - i0;
      const v0 = _tuner.freqBuf[i0] ?? -140;
      const v1 = _tuner.freqBuf[i0 + 1] ?? v0;
      const db = v0 + (v1 - v0) * frac;
      const norm = Math.max(0, Math.min(1, (db + 100) / 72));
      g.lineTo(px, plotH - norm * (plotH - 2 * dpr));
    }
    g.lineTo(w, plotH);
    g.closePath();
    g.fillStyle = col.lilac;
    g.globalAlpha = 0.22;
    g.fill();
    g.globalAlpha = 0.85;
    g.strokeStyle = col.lilac;
    g.lineWidth = 1.4 * dpr;
    g.stroke();
    g.globalAlpha = 1;
  }

  // Zielton (Einzelton)
  if (targetFreq) {
    const tx = xOf(targetFreq);
    g.strokeStyle = col.sage;
    g.lineWidth = 1.6 * dpr;
    g.setLineDash([4 * dpr, 3 * dpr]);
    g.beginPath();
    g.moveTo(tx, 0);
    g.lineTo(tx, plotH);
    g.stroke();
    g.setLineDash([]);
  }

  // Zeiger an der erkannten Grundfrequenz
  if (detectFreq) {
    const px = xOf(detectFreq);
    const c = inTune ? col.sage : col.peach;
    g.strokeStyle = c;
    g.fillStyle = c;
    g.lineWidth = 2.2 * dpr;
    g.beginPath();
    g.moveTo(px, 5 * dpr);
    g.lineTo(px, plotH);
    g.stroke();
    g.beginPath();
    g.moveTo(px - 5 * dpr, 0);
    g.lineTo(px + 5 * dpr, 0);
    g.lineTo(px, 6 * dpr);
    g.closePath();
    g.fill();
  }
}

// ---------- Anzeige ----------
function setTunerStatus(text, kind = "") {
  const el = document.getElementById("tunerStatus");
  if (!el) return;
  el.textContent = text;
  el.dataset.kind = kind;
}

function renderTunerReadout(info) {
  const display = document.getElementById("tunerDisplay");
  const nameEl = document.getElementById("tunerNoteName");
  const octEl = document.getElementById("tunerNoteOctave");
  const centsEl = document.getElementById("tunerCents");
  const freqEl = document.getElementById("tunerFreq");
  const targetEl = document.getElementById("tunerTargetLabel");
  if (!display) return;
  const prefs = getTunerPrefs();

  if (targetEl) {
    // Einzelton: Ziel in der Messzeile („Ziel: E4 • +3 ¢ • 330 Hz“); automatisch ohne Zusatz
    const isSingle = prefs.mode === "single";
    if (isSingle) {
      const t = getTunerTargetMidi(prefs);
      const flat = getTunerStrings(prefs).some(st => st.flat);
      const tn = formatTunerNote(t, flat);
      targetEl.textContent = tf("Ziel: {note}", "Target: {note}", { note: `${tn.name}${tn.octave}` });
    } else {
      targetEl.textContent = "";
    }
    targetEl.classList.toggle("hidden", !isSingle);
    document.getElementById("tunerTargetDot")?.classList.toggle("hidden", !isSingle);
  }

  if (!info) {
    display.classList.toggle("is-quiet", _tuner.running);
    return;
  }
  display.classList.remove("is-quiet", "is-idle");
  const note = formatTunerNote(info.midi, info.flat);
  if (nameEl) nameEl.textContent = note.name;
  if (octEl) octEl.textContent = note.octave;
  const rounded = Math.round(info.cents);
  if (centsEl) centsEl.textContent = `${rounded > 0 ? "+" : (rounded < 0 ? "−" : "±")} ${Math.abs(rounded)} ¢`;
  if (freqEl) freqEl.textContent = `${info.freq.toFixed(1)} Hz`;
  display.classList.toggle("is-sharp", rounded > (info.tol || 4));
  display.classList.toggle("is-flat", rounded < -(info.tol || 4));
}

function getTunerTargetMidi(prefs = getTunerPrefs()) {
  const strings = getTunerStrings(prefs);
  if (strings.length) {
    const hit = strings.find(st => st.midi === prefs.targetMidi);
    return hit ? hit.midi : strings[0].midi;
  }
  return prefs.targetMidi || 69;
}

function renderTunerStrings() {
  const row = document.getElementById("tunerStringsRow");
  const stepper = document.getElementById("tunerNoteStepper");
  const stepNote = document.getElementById("tunerStepperNote");
  if (!row) return;
  const prefs = getTunerPrefs();
  const strings = getTunerStrings(prefs);
  row.classList.toggle("hidden", strings.length === 0);
  stepper?.classList.toggle("hidden", strings.length > 0 || prefs.mode !== "single");
  if (stepNote) {
    const tn = formatTunerNote(prefs.targetMidi || 69);
    stepNote.textContent = `${tn.name}${tn.octave}`;
  }
  const target = getTunerTargetMidi(prefs);
  row.innerHTML = strings.map(st => {
    const n = formatTunerNote(st.midi, st.flat);
    const isTarget = prefs.mode === "single" && st.midi === target;
    const tuned = _tuner.tunedStrings.has(st.index);
    return `<button class="tuner-string-chip${isTarget ? " is-target" : ""}${tuned ? " is-tuned" : ""}" type="button" data-tuner-string="${st.index}" aria-pressed="${isTarget}" aria-label="${escapeHtml(tf("Saite {n}: {note}", "String {n}: {note}", { n: strings.length - st.index, note: n.name + n.octave }))}">
      <span class="tuner-string-name">${escapeHtml(n.name)}</span><span class="tuner-string-oct">${escapeHtml(n.octave)}</span>
    </button>`;
  }).join("");
}

// Einfachauswahl im Stil der Konto-Auswahl „Deine Instrumente / Rollen“ (Klassen .multi-dropdown-*)
function renderTunerDropdown(host, { key, ariaLabel, options, selectedKey, onSelect }) {
  if (!host) return;
  const isOpen = _tuner.openDropdown === key;
  const selected = options.find(o => o.key === selectedKey) || options[0];
  const optionsHtml = options.map(opt => {
    const isSel = opt.key === selected?.key;
    const hint = opt.hint ? `<span class="multi-dropdown-opt-hint">${escapeHtml(opt.hint)}</span>` : "";
    return `<button type="button" class="multi-dropdown-option${isSel ? " is-selected" : ""}" role="option" aria-selected="${isSel}" data-tuner-option="${escapeHtml(opt.key)}">
        <span class="multi-dropdown-check" aria-hidden="true">${isSel ? "✓" : ""}</span>
        <span class="multi-dropdown-opt-text"><span>${escapeHtml(opt.label)}</span>${hint}</span>
      </button>`;
  }).join("");
  host.innerHTML = `<div class="multi-dropdown-wrap">
      <button type="button" class="account-select multi-dropdown-trigger${isOpen ? " is-open" : ""}" aria-haspopup="listbox" aria-expanded="${isOpen}" aria-label="${escapeHtml(ariaLabel)}" data-tuner-trigger="${key}">
        <span class="multi-dropdown-summary">${escapeHtml(selected ? selected.label : "")}</span>
        <span class="multi-dropdown-meta">${selected?.badge ? `<span class="tuner-dropdown-badge">${escapeHtml(selected.badge)}</span>` : ""}${buildDropdownChevronSVG()}</span>
      </button>
      <div class="multi-dropdown-menu${isOpen ? "" : " hidden"}" role="listbox" aria-label="${escapeHtml(ariaLabel)}">${optionsHtml}</div>
    </div>`;
  host.querySelector("[data-tuner-trigger]")?.addEventListener("click", (e) => {
    e.stopPropagation();
    _tuner.openDropdown = isOpen ? null : key;
    syncTunerSetupUI();
  });
  host.querySelectorAll("[data-tuner-option]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      _tuner.openDropdown = null;
      onSelect(btn.dataset.tunerOption);
    });
  });
  if (isOpen) {
    host.querySelector(".multi-dropdown-option.is-selected")?.scrollIntoView?.({ block: "nearest" });
  }
}

function closeTunerDropdowns() {
  if (typeof _tuner === "undefined" || !_tuner.openDropdown) return false;
  _tuner.openDropdown = null;
  syncTunerSetupUI();
  return true;
}

function selectTunerInstrument(instrument) {
  const tunings = TUNER_INSTRUMENTS[instrument]?.tunings;
  if (!TUNER_INSTRUMENTS[instrument]) return;
  _tuner.tunedStrings.clear();
  const firstTuning = tunings ? Object.keys(tunings)[0] : "";
  const firstNote = tunings ? tunerNoteToMidi(tunings[firstTuning].notes[0]) : getTunerPrefs().targetMidi;
  setTunerPrefs({ instrument, tuning: firstTuning, targetMidi: firstNote });
  syncTunerSetupUI();
}

function selectTunerTuning(tuningKey) {
  const prefs = getTunerPrefs();
  const tuning = TUNER_INSTRUMENTS[prefs.instrument].tunings?.[tuningKey];
  if (!tuning) return;
  _tuner.tunedStrings.clear();
  setTunerPrefs({ tuning: tuningKey, targetMidi: tunerNoteToMidi(tuning.notes[0]) });
  syncTunerSetupUI();
}

function syncTunerSetupUI() {
  const prefs = getTunerPrefs();
  const tunings = TUNER_INSTRUMENTS[prefs.instrument].tunings;
  const tunField = document.getElementById("tunerTuningField");
  const tuningNotes = (def) => def.notes.map(n => formatTunerNote(tunerNoteToMidi(n), def.flat).name).join(" ");

  renderTunerDropdown(document.getElementById("tunerInstrumentHost"), {
    key: "instrument",
    ariaLabel: tr("Instrument", "Instrument"),
    selectedKey: prefs.instrument,
    options: Object.entries(TUNER_INSTRUMENTS).map(([key, def]) => {
      const first = def.tunings ? Object.values(def.tunings)[0] : null;
      return {
        key,
        label: tr(def.de, def.en),
        hint: first ? tuningNotes(first) : (key === "voice" ? tr("Alle Töne, ruhige Anzeige", "All notes, calm display") : tr("Alle Töne", "All notes"))
      };
    }),
    onSelect: selectTunerInstrument
  });

  const hasTuningChoice = Boolean(tunings) && Object.keys(tunings).length > 1;
  tunField?.classList.toggle("hidden", !hasTuningChoice);
  if (hasTuningChoice) {
    renderTunerDropdown(tunField, {
      key: "tuning",
      ariaLabel: tr("Stimmung", "Tuning"),
      selectedKey: prefs.tuning,
      options: Object.entries(tunings).map(([key, def]) => ({ key, label: tr(def.de, def.en), hint: tuningNotes(def) })),
      onSelect: selectTunerTuning
    });
  } else if (tunField) {
    tunField.innerHTML = "";
  }
  document.querySelectorAll("[data-tuner-mode]").forEach(btn => {
    const on = btn.dataset.tunerMode === prefs.mode;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-checked", String(on));
  });
  const a4El = document.getElementById("tunerA4Value");
  if (a4El) a4El.textContent = `A = ${prefs.a4} Hz`;
  renderTunerStrings();
  updateTunerGaugeZone();
  renderTunerReadout(null);
  if (state.currentView === "tuner") state.updateHeaderSubtext();
}

function syncTunerStartButton() {
  const btn = document.getElementById("tunerStartBtn");
  if (!btn) return;
  btn.textContent = _tuner.running ? tr("Tuner stoppen", "Stop tuner") : tr("Tuner starten", "Start tuner");
  btn.classList.toggle("btn-stop", _tuner.running);
  btn.disabled = _tuner.starting;
}

// ---------- Mikrofon ----------
function getNativeRawAudioTunerPlugin() {
  if (typeof getCapacitorNativePlugin !== "function") return null;
  const plugin = getCapacitorNativePlugin("RawAudioTuner");
  return plugin && typeof plugin.start === "function" && typeof plugin.readBuffer === "function" ? plugin : null;
}

function decodePcm16Base64ToFloat32(b64, outBuf) {
  const bin = atob(b64);
  const sampleCount = bin.length >> 1;
  const out = outBuf && outBuf.length === sampleCount ? outBuf : new Float32Array(sampleCount);
  for (let i = 0; i < sampleCount; i++) {
    const lo = bin.charCodeAt(2 * i);
    const hi = bin.charCodeAt(2 * i + 1);
    let s = lo | (hi << 8);
    if (s >= 0x8000) s -= 0x10000;
    out[i] = s / 32768;
  }
  return out;
}

function setTunerBluetoothNotice(visible) {
  const el = document.getElementById("tunerBluetoothNotice");
  if (!el) return;
  _tuner.bluetoothMic = Boolean(visible);
  el.classList.toggle("hidden", !visible);
  if (visible) {
    el.textContent = tr(
      "Bluetooth-Mikrofon aktiv – für genaueres Stimmen besser das interne Mikrofon nutzen.",
      "Bluetooth microphone active — use the built-in microphone for more accurate tuning."
    );
  }
}

function isTunerBluetoothMicLabel(label) {
  if (!label) return false;
  return /bluetooth|hands-?free|\bhfp\b|\bsco\b|ag audio|airpods|earbuds|galaxy buds|pixel buds|headset/i.test(label);
}

function isTunerBuiltInMicLabel(label) {
  if (!label || isTunerBluetoothMicLabel(label)) return false;
  return /built-?in|internal|integriert|intern|macbook|iphone|ipad|microphone array|mikrofonarray|bottom mic|camcorder/i.test(label);
}

function isTunerTrackBluetooth(track) {
  if (!track) return false;
  if (isTunerBluetoothMicLabel(track.label)) return true;
  try {
    const settings = typeof track.getSettings === "function" ? track.getSettings() : null;
    // Bluetooth Handsfree/HFP arbeitet typischerweise mit 8 kHz oder 16 kHz Sprachbandbreite
    if (settings && Number(settings.sampleRate) > 0 && Number(settings.sampleRate) <= 16000) {
      return true;
    }
  } catch (_) {}
  return false;
}

async function findTunerBuiltInMicDeviceId(excludeDeviceId = "") {
  if (!navigator.mediaDevices?.enumerateDevices) return "";
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const inputs = devices.filter(d => d.kind === "audioinput" && d.deviceId && d.deviceId !== excludeDeviceId);
    const builtIn = inputs.find(d => isTunerBuiltInMicLabel(d.label));
    if (builtIn) return builtIn.deviceId;
    // Fallback: beliebiges benanntes Nicht-Bluetooth-Mikrofon (außer "default"/"communications")
    const nonBt = inputs.find(d =>
      d.label &&
      d.deviceId !== "default" &&
      d.deviceId !== "communications" &&
      !isTunerBluetoothMicLabel(d.label)
    );
    return nonBt ? nonBt.deviceId : "";
  } catch (_) {
    return "";
  }
}

function buildRawTunerConstraintCandidates(deviceId = "", exactDevice = false) {
  const devConstraint = deviceId ? (exactDevice ? { exact: deviceId } : { ideal: deviceId }) : undefined;
  const fullAudio = {
    echoCancellation: { ideal: false },
    noiseSuppression: { ideal: false },
    autoGainControl: { ideal: false },
    voiceIsolation: { ideal: false },
    channelCount: { ideal: 1 },
    // Legacy-Chromium-Flags für ältere Android-WebViews
    googEchoCancellation: false,
    googAutoGainControl: false,
    googNoiseSuppression: false,
    googHighpassFilter: false,
    googTypingNoiseDetection: false
  };
  const basicAudio = { echoCancellation: false, noiseSuppression: false, autoGainControl: false };
  if (devConstraint) {
    fullAudio.deviceId = devConstraint;
    basicAudio.deviceId = devConstraint;
  }
  const list = [{ audio: fullAudio }, { audio: basicAudio }];
  if (!exactDevice) list.push({ audio: true });
  return list;
}

async function acquireRawTunerStreamWithConstraints(candidates) {
  let lastErr = null;
  for (const constraints of candidates) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const track = stream.getAudioTracks?.()[0];
      if (track && typeof track.applyConstraints === "function") {
        // Einige mobile Browser/WebViews übernehmen die Raw-Flags erst zuverlässig per applyConstraints
        track.applyConstraints({
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          voiceIsolation: false
        }).catch(() => {});
      }
      return stream;
    } catch (err) {
      lastErr = err;
      const name = err?.name || "";
      if (name === "NotAllowedError" || name === "SecurityError" || name === "NotFoundError") {
        throw err;
      }
    }
  }
  throw lastErr || new Error("Microphone unavailable");
}

/**
 * Öffnet das Mikrofon im Browser/WebView ohne OS-Sprachverarbeitung
 * (keine Echo Cancellation, keine Noise Suppression, kein AGC, keine Voice Isolation).
 * Bevorzugt nach Möglichkeit das interne Mikrofon statt eines Bluetooth-HFP-Mikrofons.
 *
 * Hinweis zu Plattform-Grenzen:
 * - Android-App (Capacitor): nutzt nativ MediaRecorder.AudioSource.UNPROCESSED (RawAudioTunerPlugin.java)
 *   und bevorzugt dort AudioDeviceInfo.TYPE_BUILTIN_MIC.
 * - iOS / Browser (Web-Kontext): AVAudioSessionModeMeasurement ist nur in nativen iOS-Apps verfügbar;
 *   im Web-Kontext setzen wir navigator.audioSession.type = "play-and-record" und die Web-Audio-Constraints
 *   (echoCancellation/noiseSuppression/autoGainControl/voiceIsolation: false).
 */
async function requestRawTunerMediaStream() {
  const preferredBuiltInId = await findTunerBuiltInMicDeviceId();
  let stream = await acquireRawTunerStreamWithConstraints(
    buildRawTunerConstraintCandidates(preferredBuiltInId, false)
  );
  let track = stream.getAudioTracks?.()[0];
  let isBt = isTunerTrackBluetooth(track);

  // Nach erteilter Mikrofon-Freigabe stehen Geräte-Labels bereit: falls BT-HFP aktiv ist,
  // gezielt versuchen, auf das interne Mikrofon zu wechseln.
  if (isBt) {
    const activeId = track?.getSettings?.()?.deviceId || "";
    const builtInId = await findTunerBuiltInMicDeviceId(activeId);
    if (builtInId) {
      try {
        const altStream = await acquireRawTunerStreamWithConstraints(
          buildRawTunerConstraintCandidates(builtInId, true)
        );
        stream.getTracks?.().forEach(t => { try { t.stop(); } catch (_) {} });
        stream = altStream;
        track = stream.getAudioTracks?.()[0];
        isBt = isTunerTrackBluetooth(track);
      } catch (_) {
        // Wechsel nicht möglich → bestehendes BT-Mikrofon weiter nutzen und dezenten Hinweis anzeigen
      }
    }
  }
  return { stream, bluetoothMic: isBt };
}

async function startTunerSession() {
  if (_tuner.running || _tuner.starting) return;
  const nativePlugin = getNativeRawAudioTunerPlugin();
  const hasMedia = typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia);
  if (!nativePlugin && (!hasMedia || window.isSecureContext === false)) {
    setTunerStatus(tr("Das Mikrofon ist nur über HTTPS oder localhost verfügbar.", "The microphone is only available via HTTPS or localhost."), "warn");
    return;
  }
  _tuner.starting = true;
  syncTunerStartButton();
  setTunerBluetoothNotice(false);
  setTunerStatus(tr("Mikrofon wird gestartet …", "Starting microphone …"));
  try {
    stopPlayback();

    // 1) Android-App: gezielter Zugriff auf das Rohsignal über AudioSource.UNPROCESSED
    if (nativePlugin) {
      try {
        const info = await nativePlugin.start();
        if (state.currentView !== "tuner") {
          nativePlugin.stop?.().catch(() => {});
          return;
        }
        const sr = Number(info?.sampleRate) || 48000;
        const bufSize = Number(info?.bufferSize) || TUNER_CONFIG.windowSize;
        const dec = sr > 72000 ? 4 : (sr > 36000 ? 2 : 1);
        const specBins = Math.floor(bufSize / dec / 2) + 1;
        const freqBuf = new Float32Array(specBins);
        freqBuf.fill(-140);
        const now = performance.now();
        resetTunerTrackingState(now);
        Object.assign(_tuner, {
          nativeActive: true,
          nativeSampleRate: sr,
          activeSampleRate: sr,
          windowSize: bufSize,
          nativeSource: String(info?.source || "unprocessed"),
          nativeSeq: -1,
          nativePending: false,
          timeBuf: new Float32Array(bufSize),
          filteredBuf: new Float32Array(bufSize),
          freqBuf,
          running: true
        });
        setTunerBluetoothNotice(Boolean(info?.bluetoothMic));
        readTunerColors();
        requestTunerWakeLock();
        setTunerStatus(tr("Spiel oder sing einen Ton …", "Play or sing a note …"));
        document.getElementById("tunerDisplay")?.classList.remove("is-idle");
        _tuner.rafId = requestAnimationFrame(tunerLoop);
        return;
      } catch (nativeErr) {
        const code = String(nativeErr?.code || nativeErr?.message || "");
        if (/PERMISSION_DENIED|denied/i.test(code)) {
          const permErr = new Error(code);
          permErr.name = "NotAllowedError";
          throw permErr;
        }
        // Fallback auf getUserMedia, falls das native AudioRecord auf einem Gerät nicht startet
        if (!hasMedia) throw nativeErr;
      }
    }

    // 2) Browser / iOS / WebView: getUserMedia ohne OS-DSP + universeller Bandpass (25 Hz – 4,2 kHz)
    try {
      if (navigator.audioSession && navigator.audioSession.type !== "play-and-record") {
        navigator.audioSession.type = "play-and-record";
      }
    } catch (_) {}
    const { stream, bluetoothMic } = await requestRawTunerMediaStream();
    if (state.currentView !== "tuner") {
      stream.getTracks().forEach(t => t.stop());
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = _tuner.ctx && _tuner.ctx.state !== "closed" ? _tuner.ctx : new Ctx();
    if (ctx.state === "suspended") await ctx.resume();
    // Tatsächliche Hardware-Sample-Rate dynamisch aus dem AudioContext auslesen
    const actualSr = Number(ctx.sampleRate) || 48000;
    const winSize = actualSr > 64000 ? TUNER_CONFIG.windowSizeHighSr : TUNER_CONFIG.windowSize;
    const source = ctx.createMediaStreamSource(stream);

    // Universelles Bandpass-Vorfilter (4. Ordnung Butterworth, −24 dB/Okt.):
    // 25 Hz Hochpass gegen Trittschall/Rumpeln + 4,2 kHz Tiefpass gegen hochfrequentes Zischen
    const lpHz = Math.min(TUNER_LP_HZ, actualSr * 0.45);
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

    // AnalyserNode dient als Audio-Thread-Ringpuffer (Sliding Window über winSize Samples)
    const analyser = ctx.createAnalyser();
    analyser.fftSize = winSize;
    analyser.smoothingTimeConstant = 0.55;
    // Stummer Abzweig zum Ausgang hält die Kette in allen Browsern (Safari) aktiv – ohne Rückkopplung
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

    const now = performance.now();
    resetTunerTrackingState(now);
    Object.assign(_tuner, {
      ctx, stream, source, filterNodes, analyser, sink,
      nativeActive: false, nativePending: false,
      activeSampleRate: actualSr,
      windowSize: analyser.fftSize,
      timeBuf: new Float32Array(analyser.fftSize),
      freqBuf: new Float32Array(analyser.frequencyBinCount),
      running: true
    });
    state.tunerStream = stream;
    setTunerBluetoothNotice(bluetoothMic);
    readTunerColors();
    requestTunerWakeLock();
    setTunerStatus(tr("Spiel oder sing einen Ton …", "Play or sing a note …"));
    document.getElementById("tunerDisplay")?.classList.remove("is-idle");
    _tuner.rafId = requestAnimationFrame(tunerLoop);
  } catch (err) {
    const name = err?.name || "";
    if (name === "NotAllowedError" || name === "SecurityError") {
      setTunerStatus(tr("Mikrofon-Zugriff verweigert – bitte in den Browser- bzw. App-Einstellungen erlauben.", "Microphone access denied — please allow it in your browser or app settings."), "warn");
    } else if (name === "NotFoundError" || name === "OverconstrainedError") {
      setTunerStatus(tr("Kein Mikrofon gefunden.", "No microphone found."), "warn");
    } else {
      setTunerStatus(tr("Das Mikrofon konnte nicht gestartet werden.", "The microphone could not be started."), "warn");
    }
  } finally {
    _tuner.starting = false;
    syncTunerStartButton();
  }
}

function releaseTunerMicStream() {
  if (_tuner.nativeActive) {
    _tuner.nativeActive = false;
    _tuner.nativePending = false;
    _tuner.nativeSeq = -1;
    try { getNativeRawAudioTunerPlugin()?.stop?.().catch?.(() => {}); } catch (_) {}
  }
  const stream = _tuner.stream || state.tunerStream;
  if (stream) {
    try {
      stream.getTracks?.().forEach(track => {
        try { track.stop(); } catch (_) {}
      });
    } catch (_) {}
  }
  try { _tuner.source?.disconnect(); } catch (_) {}
  (_tuner.filterNodes || []).forEach(node => { try { node?.disconnect(); } catch (_) {} });
  try { _tuner.analyser?.disconnect(); } catch (_) {}
  try { _tuner.sink?.disconnect(); } catch (_) {}
  _tuner.stream = null;
  _tuner.source = null;
  _tuner.filterNodes = [];
  _tuner.analyser = null;
  _tuner.sink = null;
  state.tunerStream = null;
  // iOS/Safari: Audio-Sitzung nach dem Mikrofon wieder auf reine Wiedergabe stellen, damit
  // Bluetooth-Kopfhörer nicht im (verzerrten) Telefonie-Modus bleiben
  try {
    if (stream && navigator.audioSession && navigator.audioSession.type !== "playback") {
      navigator.audioSession.type = "playback";
    }
  } catch (_) {}
}

function stopTunerSession() {
  _tuner.openDropdown = null;
  if (_tuner.rafId) cancelAnimationFrame(_tuner.rafId);
  _tuner.rafId = 0;
  const wasRunning = _tuner.running;
  _tuner.running = false;
  releaseTunerMicStream();
  stopTunerReference();
  releaseTunerWakeLock();
  if (_tuner.ctx && _tuner.ctx.state !== "closed") {
    const ctx = _tuner.ctx;
    _tuner.ctx = null;
    try { ctx.close(); } catch (_) {}
  }
  resetTunerTrackingState(performance.now());
  setTunerBluetoothNotice(false);
  const display = document.getElementById("tunerDisplay");
  display?.classList.remove("is-in-tune", "is-sharp", "is-flat", "is-quiet");
  display?.classList.add("is-idle");
  setTunerNeedle(0);
  syncTunerStartButton();
  if (wasRunning) {
    setTunerStatus(tr("Tuner pausiert.", "Tuner paused."));
  }
  if (document.getElementById("tunerSpectrum")) drawTunerSpectrum(0, null, false);
}

async function requestTunerWakeLock() {
  try {
    if (navigator.wakeLock?.request) _tuner.wakeLock = await navigator.wakeLock.request("screen");
  } catch (_) {
    _tuner.wakeLock = null;
  }
}

function releaseTunerWakeLock() {
  try { _tuner.wakeLock?.release?.(); } catch (_) {}
  _tuner.wakeLock = null;
}

// ---------- Messschleife: Noise-Floor, Transienten, Pitch-Lock, Median & EMA ----------
function clampTunerNoiseFloor(db) {
  return Math.max(TUNER_CONFIG.noiseFloorMinDb, Math.min(TUNER_CONFIG.noiseFloorMaxDb, db));
}

function updateTunerNoiseFloor(hopDb, now) {
  if (!Number.isFinite(hopDb)) return;
  if (now < _tuner.noiseInitUntil) {
    // Initiale Grundrausch-Messung: 30.-Perzentil (robust gegen sofortiges Anspielen)
    const buf = _tuner.noiseInitSamples;
    if (_tuner.noiseInitCount < buf.length) {
      let pos = _tuner.noiseInitCount;
      while (pos > 0 && buf[pos - 1] > hopDb) {
        buf[pos] = buf[pos - 1];
        pos--;
      }
      buf[pos] = hopDb;
      _tuner.noiseInitCount++;
      const idx = Math.floor((_tuner.noiseInitCount - 1) * 0.3);
      _tuner.noiseFloorDb = clampTunerNoiseFloor(buf[idx]);
    }
    return;
  }
  // Langsame Nachführung ausschließlich in Spielpausen (unterhalb der Gate-Öffnungsschwelle)
  if (!_tuner.gateOpen && hopDb < _tuner.noiseFloorDb + TUNER_CONFIG.noiseGateOffsetDb) {
    const alpha = hopDb < _tuner.noiseFloorDb
      ? TUNER_CONFIG.noiseFloorAdaptDownAlpha
      : TUNER_CONFIG.noiseFloorAdaptUpAlpha;
    _tuner.noiseFloorDb = clampTunerNoiseFloor(_tuner.noiseFloorDb + alpha * (hopDb - _tuner.noiseFloorDb));
  }
}

function computeTunerMedianFromRing() {
  const count = _tuner.medianCount;
  if (!count) return 0;
  const ring = _tuner.medianRing;
  const scratch = _tuner.medianScratch;
  for (let i = 0; i < count; i++) {
    const v = ring[i];
    let pos = i;
    while (pos > 0 && scratch[pos - 1] > v) {
      scratch[pos] = scratch[pos - 1];
      pos--;
    }
    scratch[pos] = v;
  }
  return scratch[count >> 1];
}

function pushTunerMedian(freq, maxLen) {
  const cap = Math.max(3, Math.min(_tuner.medianRing.length, maxLen));
  const curMedian = computeTunerMedianFromRing();
  if (_tuner.medianCount >= 2 && curMedian > 0) {
    const jumpCents = Math.abs(1200 * Math.log2(freq / curMedian));
    if (jumpCents > TUNER_CONFIG.emaResetCents) {
      // Einzelner Ausreißer (Oktav-/Quintsprung) wird vom Median verworfen;
      // 2 konsistente Frames auf einem neuen Ton (z. B. Legato-Wechsel) setzen den Median direkt um.
      if (_tuner.jumpCandFreq > 0 && Math.abs(1200 * Math.log2(freq / _tuner.jumpCandFreq)) <= TUNER_CONFIG.pitchLockStableCents) {
        _tuner.jumpCandCount++;
        if (_tuner.jumpCandCount >= 2) {
          _tuner.medianRing[0] = _tuner.jumpCandFreq;
          _tuner.medianRing[1] = freq;
          _tuner.medianCount = 2;
          _tuner.medianPos = 2 % cap;
          _tuner.jumpCandFreq = 0;
          _tuner.jumpCandCount = 0;
          return computeTunerMedianFromRing();
        }
      } else {
        _tuner.jumpCandFreq = freq;
        _tuner.jumpCandCount = 1;
      }
    } else {
      _tuner.jumpCandFreq = 0;
      _tuner.jumpCandCount = 0;
    }
  }
  if (_tuner.medianCount < cap) {
    _tuner.medianRing[_tuner.medianCount++] = freq;
    _tuner.medianPos = _tuner.medianCount % cap;
  } else {
    _tuner.medianRing[_tuner.medianPos] = freq;
    _tuner.medianPos = (_tuner.medianPos + 1) % cap;
  }
  return computeTunerMedianFromRing();
}

function handleTunerNoPitch(now) {
  if (!_tuner.lastPitchAt) return;
  const elapsed = now - _tuner.lastPitchAt;
  // Phase 1: Kurze stabile Haltezeit bei niedrigem Pegel / geringer Konfidenz
  if (elapsed <= TUNER_CONFIG.holdMs) return;

  // Phase 2: Sanfter Übergang in den Ruhezustand (Anzeige dimmen & Nadel weich zur Mitte führen)
  const fadeElapsed = elapsed - TUNER_CONFIG.holdMs;
  if (fadeElapsed < TUNER_CONFIG.idleFadeMs) {
    if (!_tuner.inQuietFade) {
      _tuner.inQuietFade = true;
      _tuner.idleFadeStartAt = now;
      _tuner.idleStartCents = _tuner.smoothCents || 0;
      if (_tuner.inTune || _tuner.inTuneSince) {
        _tuner.inTune = false;
        _tuner.inTuneSince = 0;
        document.getElementById("tunerDisplay")?.classList.remove("is-in-tune");
      }
      renderTunerReadout(null);
    }
    const t = Math.min(1, fadeElapsed / TUNER_CONFIG.idleFadeMs);
    const eased = 1 - (1 - t) * (1 - t);
    const glideCents = _tuner.idleStartCents * (1 - eased);
    _tuner.smoothCents = glideCents;
    setTunerNeedle(glideCents);
    return;
  }

  // Phase 3: Ruhezustand
  resetTunerMedian();
  resetTunerPitchLock();
  _tuner.emaFreq = 0;
  _tuner.smoothCents = null;
  _tuner.inQuietFade = false;
  if (_tuner.inTune || _tuner.inTuneSince) {
    _tuner.inTune = false;
    _tuner.inTuneSince = 0;
    document.getElementById("tunerDisplay")?.classList.remove("is-in-tune");
  }
  renderTunerReadout(null);
  setTunerNeedle(0);
  setTunerStatus(tr("Spiel oder sing einen Ton …", "Play or sing a note …"));
}

function analyzeTunerBuffer(signal, sampleRate, smoothDbOut, ctx) {
  const now = ctx.now;
  const [minF, maxF] = getTunerRange(ctx.prefs);

  // 1) Schnelle Pegelmessung für den aktuellen Hop & das Gesamtfenster (GC-frei, ohne doppelte FFT)
  const levelProbe = measureTunerSignalLevels(signal, sampleRate);
  const hopDb = levelProbe.hopDb;
  const windowDb = levelProbe.windowDb;
  const windowRms = levelProbe.rms;
  const prevHopDb = _tuner.prevHopDb;
  _tuner.prevHopDb = hopDb;

  // Adaptiver Noise-Floor (Start-Kalibrierung + langsame Nachführung in Pausen)
  updateTunerNoiseFloor(hopDb, now);

  const gateOpenDb = _tuner.noiseFloorDb + TUNER_CONFIG.noiseGateOffsetDb;
  const gateCloseDb = _tuner.noiseFloorDb + TUNER_CONFIG.noiseGateCloseOffsetDb;
  const hasMinRms = windowRms >= TUNER_CONFIG.noiseGateAbsMinRms;
  if (!_tuner.gateOpen) {
    if (hasMinRms && hopDb >= gateOpenDb) {
      _tuner.gateOpen = true;
      _tuner.peakDb = hopDb;
    }
  } else {
    if (!hasMinRms || Math.max(hopDb, windowDb) < gateCloseDb) {
      _tuner.gateOpen = false;
      _tuner.peakDb = -120;
      resetTunerPitchLock();
    } else if (hopDb > _tuner.peakDb) {
      _tuner.peakDb = hopDb;
    }
  }

  // Gate geschlossen → ggf. natives Spektrum abklingen lassen, kein Pitch-Update
  if (!_tuner.gateOpen) {
    if (smoothDbOut) detectTunerPitch(signal, sampleRate, minF, maxF, smoothDbOut, 0, true);
    handleTunerNoPitch(now);
    return;
  }

  // 2) Anschlag / Transient erkennen (sprunghafter Pegelanstieg) → 30–50 ms verwerfen
  const isTransientJump = prevHopDb > -115 && (hopDb - prevHopDb) >= TUNER_CONFIG.transientRiseDb && hopDb >= gateOpenDb;
  if (isTransientJump) {
    _tuner.transientUntil = now + TUNER_CONFIG.transientBlankMs;
    _tuner.peakDb = hopDb;
    resetTunerPitchLock();
    resetTunerMedian();
    if (smoothDbOut) detectTunerPitch(signal, sampleRate, minF, maxF, smoothDbOut, 0, true);
    return;
  }
  if (now < _tuner.transientUntil) {
    if (smoothDbOut) detectTunerPitch(signal, sampleRate, minF, maxF, smoothDbOut, 0, true);
    return;
  }

  // 3) Decay-Erkennung & Pitch-Lock aktivieren, sobald ein stabiler Ton ausklingt
  const isDecaying = _tuner.stableCount >= TUNER_CONFIG.pitchLockMinStableFrames &&
    _tuner.lockFreq > 0 &&
    (hopDb < _tuner.peakDb - TUNER_CONFIG.decayDropDb || hopDb <= prevHopDb + 0.5);
  _tuner.lockActive = isDecaying;

  let res = detectTunerPitch(
    signal,
    sampleRate,
    minF,
    maxF,
    smoothDbOut,
    isDecaying ? _tuner.lockFreq : 0,
    false
  );

  let clarityThreshold = isDecaying ? TUNER_CONFIG.clarityLockMin : TUNER_CONFIG.clarityMin;

  // Legato-Schutz: Wenn im Pitch-Lock trotz starkem Signal kein Ton mehr gefunden wird (z. B. Saiten-/Tonwechsel
  // ohne Zupf-Transient bei Gesang/Streichern), Pitch-Lock lösen und sofort im vollen Bereich suchen.
  if (isDecaying && (!res.freq || res.clarity < clarityThreshold)) {
    if (hopDb >= gateOpenDb + 3) {
      _tuner.lockMissCount++;
      if (_tuner.lockMissCount >= TUNER_CONFIG.pitchLockMissLimit) {
        resetTunerPitchLock();
        clarityThreshold = TUNER_CONFIG.clarityMin;
        res = detectTunerPitch(signal, sampleRate, minF, maxF, null, 0, false);
      }
    }
  } else if (isDecaying) {
    _tuner.lockMissCount = 0;
  }

  applyTunerPitchResult(res, clarityThreshold, ctx);
}

function applyTunerPitchResult(res, clarityThreshold, ctx) {
  const { inst, now } = ctx;
  if (res.freq && res.clarity >= clarityThreshold) {
    const histLen = inst.smooth ? TUNER_CONFIG.medianLengthVoice : TUNER_CONFIG.medianLength;
    const median = pushTunerMedian(res.freq, histLen);

    // Stabilität für Pitch-Lock fortschreiben
    if (_tuner.stableFreq > 0 && Math.abs(1200 * Math.log2(median / _tuner.stableFreq)) <= TUNER_CONFIG.pitchLockStableCents) {
      _tuner.stableCount = Math.min(20, _tuner.stableCount + 1);
      _tuner.stableFreq = _tuner.stableFreq * 0.7 + median * 0.3;
    } else {
      _tuner.stableFreq = median;
      _tuner.stableCount = 1;
    }
    if (_tuner.stableCount >= TUNER_CONFIG.pitchLockMinStableFrames) {
      _tuner.lockFreq = median;
    }

    _tuner.inQuietFade = false;
    _tuner.lastFreq = median;
    _tuner.lastClarity = res.clarity;
    _tuner.lastPitchAt = now;
    updateTunerReading(median, res.clarity, clarityThreshold, ctx);
  } else {
    handleTunerNoPitch(now);
  }
}

function pollNativeTunerFrame(ctx) {
  if (!_tuner.running || !_tuner.nativeActive || _tuner.nativePending) return;
  const plugin = getNativeRawAudioTunerPlugin();
  if (!plugin) return;
  _tuner.nativePending = true;
  // Aktuelle Kontextwerte für den asynchronen Callback sichern
  const snapPrefs = ctx.prefs;
  const snapInst = ctx.inst;
  const snapTol = ctx.tol;
  const snapStrings = ctx.strings;
  const snapFlat = ctx.flat;
  const snapSingle = ctx.isSingle;
  const snapTargetMidi = ctx.targetMidi;
  plugin.readBuffer({ lastSeq: _tuner.nativeSeq }).then(frame => {
    _tuner.nativePending = false;
    if (!_tuner.running || !_tuner.nativeActive) return;
    if (frame && frame.running === false) {
      stopTunerSession();
      return;
    }
    if (!frame || frame.unchanged || !frame.pcm16Base64) return;
    _tuner.nativeSeq = Number(frame.seq ?? _tuner.nativeSeq);
    const sr = Number(frame.sampleRate) || _tuner.nativeSampleRate || 48000;
    _tuner.nativeSampleRate = sr;
    _tuner.activeSampleRate = sr;
    const raw = decodePcm16Base64ToFloat32(frame.pcm16Base64, _tuner.timeBuf);
    _tuner.timeBuf = raw;
    _tuner.windowSize = raw.length;
    const signal = frame.bandpassApplied ? raw : applyTunerBandpass(raw, sr, _tuner.filteredBuf);
    if (!frame.bandpassApplied) _tuner.filteredBuf = signal;
    const loopCtx = _tuner.loopCtx;
    loopCtx.prefs = snapPrefs;
    loopCtx.inst = snapInst;
    loopCtx.tol = snapTol;
    loopCtx.strings = snapStrings;
    loopCtx.flat = snapFlat;
    loopCtx.isSingle = snapSingle;
    loopCtx.targetMidi = snapTargetMidi;
    loopCtx.now = performance.now();
    analyzeTunerBuffer(signal, sr, _tuner.freqBuf, loopCtx);
  }).catch(() => {
    _tuner.nativePending = false;
  });
}

function tunerLoop() {
  if (!_tuner.running || (!_tuner.analyser && !_tuner.nativeActive)) return;
  _tuner.rafId = requestAnimationFrame(tunerLoop);
  const now = performance.now();
  const prefs = getTunerPrefs();
  const isSingle = prefs.mode === "single";
  const targetMidi = isSingle ? getTunerTargetMidi(prefs) : null;

  // Auswertung im festen Hop-Intervall (20–30 ms) unabhängig von der Bildschirm-Bildwiederholrate
  if (now - _tuner.lastHopAt >= TUNER_CONFIG.hopMs) {
    _tuner.lastHopAt = now;
    if (now < _tuner.refUntil) {
      setTunerStatus(tr("Referenzton …", "Reference tone …"));
    } else {
      const inst = TUNER_INSTRUMENTS[prefs.instrument];
      const strings = getTunerStrings(prefs);
      const loopCtx = _tuner.loopCtx;
      loopCtx.prefs = prefs;
      loopCtx.inst = inst;
      loopCtx.tol = inst.tolerance || 4;
      loopCtx.strings = strings;
      loopCtx.flat = strings.some(st => st.flat);
      loopCtx.isSingle = isSingle;
      loopCtx.targetMidi = targetMidi;
      loopCtx.now = now;

      if (_tuner.nativeActive) {
        pollNativeTunerFrame(loopCtx);
      } else if (_tuner.analyser && _tuner.ctx) {
        _tuner.analyser.getFloatTimeDomainData(_tuner.timeBuf);
        analyzeTunerBuffer(_tuner.timeBuf, _tuner.ctx.sampleRate, null, loopCtx);
      }
    }
  } else if (_tuner.inQuietFade) {
    // Sanfte Nadel-Rückführung in den Ruhezustand flüssig mit 60/120 fps fortschreiben
    handleTunerNoPitch(now);
  }

  const showFreq = now - _tuner.lastPitchAt <= (TUNER_CONFIG.holdMs + TUNER_CONFIG.idleFadeMs) ? _tuner.lastFreq : 0;
  drawTunerSpectrum(showFreq, targetMidi !== null ? tunerMidiToFreq(targetMidi, prefs.a4) : null, _tuner.inTune);
}

function updateTunerReading(freq, clarity, clarityThreshold, ctx) {
  const { prefs, tol, strings, flat, isSingle, targetMidi, now } = ctx;
  const midiFloat = tunerFreqToMidiFloat(freq, prefs.a4);
  const refMidi = isSingle ? targetMidi : Math.round(midiFloat);
  const rawCents = (midiFloat - refMidi) * 100;
  const freqJumpCents = _tuner.emaFreq > 0 ? Math.abs(1200 * Math.log2(freq / _tuner.emaFreq)) : Infinity;

  if (
    _tuner.displayMidi !== refMidi ||
    _tuner.smoothCents === null ||
    freqJumpCents > TUNER_CONFIG.emaResetCents ||
    Math.abs(rawCents - _tuner.smoothCents) > TUNER_CONFIG.emaResetCents
  ) {
    // Neuer Ton oder großer Frequenzsprung (> 50–80 Cent, z. B. Saitenwechsel): sofortiger EMA-Reset
    _tuner.displayMidi = refMidi;
    _tuner.smoothCents = rawCents;
    _tuner.emaFreq = freq;
    _tuner.inTuneSince = 0;
  } else {
    const alpha = TUNER_INSTRUMENTS[prefs.instrument].smooth ? TUNER_CONFIG.emaAlphaVoice : TUNER_CONFIG.emaAlpha;
    _tuner.smoothCents += alpha * (rawCents - _tuner.smoothCents);
    _tuner.emaFreq += alpha * (freq - _tuner.emaFreq);
  }
  const cents = _tuner.smoothCents;
  setTunerNeedle(cents);
  renderTunerReadout({ midi: refMidi, cents, freq: _tuner.emaFreq || freq, flat, tol });

  // Saite, die gerade klingt (±60 Cent)
  const matchString = strings.find(st => Math.abs(midiFloat - st.midi) * 100 <= 60);
  document.querySelectorAll(".tuner-string-chip").forEach(chip => {
    chip.classList.toggle("is-sounding", Boolean(matchString) && Number(chip.dataset.tunerString) === matchString.index);
  });

  // Sauber gestimmt? Kurz halten, dann feiern
  const display = document.getElementById("tunerDisplay");
  const inZone = Math.abs(cents) <= tol && clarity >= TUNER_CONFIG.clarityInTuneMin;
  if (inZone) {
    if (!_tuner.inTuneSince) _tuner.inTuneSince = now;
    if (!_tuner.inTune && now - _tuner.inTuneSince >= TUNER_CONFIG.inTuneHoldMs) {
      _tuner.inTune = true;
      if (display) {
        display.classList.remove("is-in-tune");
        void display.offsetWidth;
        display.classList.add("is-in-tune");
      }
      try { navigator.vibrate?.(28); } catch (_) {}
      const tunedString = isSingle ? strings.find(st => st.midi === targetMidi) : matchString;
      if (tunedString && !_tuner.tunedStrings.has(tunedString.index)) {
        _tuner.tunedStrings.add(tunedString.index);
        renderTunerStrings();
      }
    }
  } else if (Math.abs(cents) > tol * 1.6 || clarity < clarityThreshold) {
    _tuner.inTuneSince = 0;
    if (_tuner.inTune) {
      _tuner.inTune = false;
      display?.classList.remove("is-in-tune");
    }
  }

  if (_tuner.inTune) {
    setTunerStatus(tr("Sauber gestimmt!", "Nicely in tune!"), "ok");
  } else if (Math.abs(cents) >= 100) {
    const semis = Math.round(Math.abs(cents) / 100);
    setTunerStatus(cents < 0
      ? tf("Etwa {n} Halbtöne zu tief", "About {n} semitones too low", { n: semis })
      : tf("Etwa {n} Halbtöne zu hoch", "About {n} semitones too high", { n: semis }), "far");
  } else if (cents < -tol) {
    setTunerStatus(tr("Zu tief – etwas höher stimmen", "Too low — tune up a little"), "low");
  } else if (cents > tol) {
    setTunerStatus(tr("Zu hoch – etwas tiefer stimmen", "Too high — tune down a little"), "high");
  } else {
    setTunerStatus(tr("Fast da – Ton ruhig halten …", "Almost there — hold the note steady …"), "near");
  }
}

// ---------- Referenzton ----------
function stopTunerReference() {
  const nodes = _tuner.refNodes;
  _tuner.refNodes = null;
  _tuner.refUntil = 0;
  if (!nodes) return;
  try {
    const t = nodes.ctx.currentTime;
    nodes.gain.gain.cancelScheduledValues(t);
    nodes.gain.gain.setTargetAtTime(0, t, 0.03);
    nodes.oscs.forEach(o => { try { o.stop(t + 0.2); } catch (_) {} });
    if (nodes.ownCtx) setTimeout(() => { try { nodes.ctx.close(); } catch (_) {} }, 400);
  } catch (_) {}
}

async function playTunerReference(midi) {
  stopTunerReference();
  const prefs = getTunerPrefs();
  const freq = tunerMidiToFreq(midi, prefs.a4);
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  const ownCtx = !(_tuner.ctx && _tuner.ctx.state !== "closed");
  const ctx = ownCtx ? new Ctx() : _tuner.ctx;
  try { if (ctx.state === "suspended") await ctx.resume(); } catch (_) {}
  const dur = 2.2;
  const t0 = ctx.currentTime + 0.02;
  const gain = ctx.createGain();
  const vol = state.master?.muted ? 0 : Math.max(0.05, Math.min(1, state.master?.volume ?? 0.67)) * 0.34;
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.04);
  gain.gain.setTargetAtTime(vol * 0.72, t0 + 0.25, 0.4);
  gain.gain.setTargetAtTime(0.0001, t0 + dur - 0.35, 0.12);
  gain.connect(ctx.destination);
  // Warmer, klar ortbarer Ton: Grundton + leise Obertöne
  const oscs = [[1, 1], [2, 0.28], [3, 0.1]].map(([mult, amp]) => {
    const o = ctx.createOscillator();
    const og = ctx.createGain();
    o.type = "sine";
    o.frequency.value = freq * mult;
    og.gain.value = amp;
    o.connect(og);
    og.connect(gain);
    o.start(t0);
    o.stop(t0 + dur + 0.1);
    return o;
  });
  _tuner.refNodes = { ctx, gain, oscs, ownCtx };
  _tuner.refUntil = performance.now() + (dur + 0.25) * 1000;
  const btn = document.getElementById("tunerRefBtn");
  btn?.classList.add("is-playing");
  setTimeout(() => {
    btn?.classList.remove("is-playing");
    if (_tuner.refNodes?.oscs === oscs) {
      _tuner.refNodes = null;
      if (ownCtx) { try { ctx.close(); } catch (_) {} }
    }
  }, (dur + 0.2) * 1000);
}

function getTunerReferenceMidi() {
  const prefs = getTunerPrefs();
  if (prefs.mode === "single") return getTunerTargetMidi(prefs);
  if (_tuner.displayMidi !== null && _tuner.running && performance.now() - _tuner.lastPitchAt < 4000) return _tuner.displayMidi;
  const strings = getTunerStrings(prefs);
  return strings.length ? strings[0].midi : 69;
}

// ---------- Ansicht & Bedienung ----------
function renderTunerPreviewView() {
  renderTunerView();
}

function renderTunerView() {
  if (!_tuner.gaugeBuilt) buildTunerGauge();
  updateTunerGaugeViewBox();
  bindTunerControls();
  syncTunerSetupUI();
  syncTunerStartButton();
  readTunerColors();
  const noticeEl = document.getElementById("tunerSecureContextNotice");
  const hasMedia = typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia);
  const isSecure = typeof window === "undefined" || window.isSecureContext !== false;
  if (noticeEl) {
    noticeEl.classList.toggle("hidden", isSecure && hasMedia);
    noticeEl.classList.add("is-warning");
    noticeEl.textContent = tr(
      "Hinweis: Das Mikrofon funktioniert nur über HTTPS oder http://localhost – auf file:// oder unverschlüsseltem LAN-HTTP blockieren Browser den Zugriff.",
      "Note: The microphone only works via HTTPS or http://localhost — browsers block access on file:// or unencrypted LAN HTTP."
    );
  }
  if (!_tuner.running) {
    setTunerStatus(tr("Tippe auf „Tuner starten“ – beim ersten Mal fragt dein Gerät nach dem Mikrofon.", "Tap “Start tuner” — your device asks for microphone access the first time."));
    drawTunerSpectrum(0, null, false);
  }
}

function bindTunerControls() {
  const root = document.getElementById("viewTuner");
  if (!root || root._tunerBound) return;
  root._tunerBound = true;

  document.getElementById("tunerStartBtn")?.addEventListener("click", () => {
    if (_tuner.running) stopTunerSession();
    else startTunerSession();
  });
  // Auswahllisten schließen bei Klick daneben oder Escape
  document.addEventListener("click", (e) => {
    if (!_tuner.openDropdown) return;
    if (e.target?.closest?.("[data-tuner-dropdown]")) return;
    closeTunerDropdowns();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && _tuner.openDropdown) closeTunerDropdowns();
  });
  document.querySelectorAll("[data-tuner-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      setTunerPrefs({ mode: btn.dataset.tunerMode === "single" ? "single" : "auto" });
      _tuner.displayMidi = null;
      syncTunerSetupUI();
    });
  });
  document.getElementById("tunerStringsRow")?.addEventListener("click", (e) => {
    const chip = e.target.closest?.("[data-tuner-string]");
    if (!chip) return;
    const st = getTunerStrings()[Number(chip.dataset.tunerString)];
    if (!st) return;
    // Saite antippen = gezielt diese Saite stimmen
    setTunerPrefs({ mode: "single", targetMidi: st.midi });
    _tuner.displayMidi = null;
    syncTunerSetupUI();
  });
  const stepTarget = (delta) => {
    const prefs = getTunerPrefs();
    setTunerPrefs({ targetMidi: Math.max(24, Math.min(96, (prefs.targetMidi || 69) + delta)) });
    _tuner.displayMidi = null;
    syncTunerSetupUI();
  };
  document.getElementById("tunerNoteDownBtn")?.addEventListener("click", () => stepTarget(-1));
  document.getElementById("tunerNoteUpBtn")?.addEventListener("click", () => stepTarget(1));
  const stepA4 = (delta) => {
    const prefs = getTunerPrefs();
    setTunerPrefs({ a4: Math.max(TUNER_A4_MIN, Math.min(TUNER_A4_MAX, prefs.a4 + delta)) });
    syncTunerSetupUI();
  };
  document.getElementById("tunerA4DownBtn")?.addEventListener("click", () => stepA4(-1));
  document.getElementById("tunerA4UpBtn")?.addEventListener("click", () => stepA4(1));
  document.getElementById("tunerRefBtn")?.addEventListener("click", () => {
    if (_tuner.refNodes) {
      stopTunerReference();
      document.getElementById("tunerRefBtn")?.classList.remove("is-playing");
      return;
    }
    playTunerReference(getTunerReferenceMidi());
  });
  // Zeigerinstrument bei Größenänderung neu zuschneiden
  if (typeof ResizeObserver === "function") {
    const gauge = document.getElementById("tunerGauge");
    if (gauge) new ResizeObserver(() => updateTunerGaugeViewBox()).observe(gauge);
  } else {
    window.addEventListener("resize", updateTunerGaugeViewBox);
  }
  // Mobile Browser: beim Wechsel in den Hintergrund Mikrofon freigeben
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && _tuner.running) stopTunerSession();
  });
}

