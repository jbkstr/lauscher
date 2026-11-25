// =====================================================
// TUNER DSP ENGINE (js/tuner-dsp.js)
// Reine Signalverarbeitung ohne DOM-/UI-Abhängigkeiten:
// - Zentrale Parameter, Instrumenten-Profile, Railsback-Kurve & Sweetened-Offsets
// - Tiefton-Dezimierung (4.-Ordnung Anti-Aliasing-Tiefpass + 4×/8× Downsampling)
// - Onset-Detektor (Energieanstieg + normalisierter Spectral Flux)
// - Dynamisches Zero-Phase-Kammfilter gegen mitschwingende Nachbarsaiten
// - Vibrato-Erkennung & periodengenaue Mittelung
// - Hybrider Quadratur-Phasen-Tracker (0,1 Cent Präzision)
// Alle Audio-Loop-Puffer werden vorab allokiert und GC-frei wiederverwendet.
// =====================================================

// Zentrale Tuning- & DSP-Parameter
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

  // 2) Anschlag (Transienten), Onset-Spectral-Flux & Ausklang (Pitch-Lock)
  transientRiseDb: 9.0,         // Standard-Pegelanstieg pro Hop für Anschlag-Erkennung
  transientBlankMs: 40,         // Standard-Anschlag-Ausblendung gegen Zupf-Überschwinger
  onsetFluxBins: 128,           // Spektral-Bins für Spectral Flux (unterer/mittlerer Bereich)
  onsetFluxThreshold: 0.42,     // Normalisierter positiver Spectral-Flux-Sprung für Onset
  onsetFluxMinOverFloorDb: 6.0, // Mindest-SNR über Noise-Floor für Flux-Onsets
  pitchLockMinStableFrames: 3,  // Stabile gültige Frames vor Aktivierung des Pitch-Locks
  pitchLockStableCents: 35,     // Max. Abweichung für „stabil erkannt“
  pitchLockWindowRatio: 0.18,   // Suchfenster im Ausklang: ±18 % um letzte stabile Frequenz
  decayDropDb: 2.5,             // Pegelabfall unter Peak ab dem Ausklang angenommen wird
  pitchLockMissLimit: 2,        // Standard-Fehlschläge bei starkem Signal bis zum Legato-Unlock
  combMinLockHz: 35,            // Untere Frequenzgrenze für das harmonische Kammfilter
  combMaxLockHz: 1400,          // Obere Frequenzgrenze für das harmonische Kammfilter

  // 3) Tiefton-Dezimierung (Anti-Aliasing + 4×/8× Downsampling)
  lowDecimTriggerHz: 155,       // Frequenzgrenze für parallelen Tiefton-Analysepfad
  lowDecimCutoffHz: 1800,       // Anti-Aliasing-Tiefpass vor Downsampling (lässt 1f..5f durch)
  lowDecimMaxCutoffRatio: 0.28, // Sicherheitsabstand zur neuen Nyquist-Frequenz (0,28 × sr_low)

  // 4) Vibrato-Erkennung & periodengenaue Mittelung
  vibratoRingSize: 24,          // ~600 ms Verlauf bei 25 ms Hop
  vibratoMinSamples: 14,        // ~350 ms Mindestbeobachtung
  vibratoMinRateHz: 3.8,        // Untere Vibrato-Frequenz
  vibratoMaxRateHz: 8.2,        // Obere Vibrato-Frequenz
  vibratoMinDepthActive: 6.0,   // RMS-Tiefe (Cent) für Profil „Bläser / Gesang / Streicher“
  vibratoMinDepthAuto: 9.5,     // Etwas höhere Schwelle im chromatischen Modus
  vibratoMaxDepthCents: 110,    // Darüber liegt eher Glissando/Triller statt Vibrato vor
  vibratoZeroHystCents: 2.2,    // Hysterese gegen Mikro-Rauschen um den Mittelwert
  vibratoMinPeriodMs: 130,      // Kürzestes Mittelungsfenster (~7,7 Hz)
  vibratoMaxPeriodMs: 250,      // Längstes Mittelungsfenster (~4,0 Hz)
  vibratoHoldMs: 220,           // Kurze Nachlaufzeit, damit Vibrato-Status nicht flackert

  // 5) Hybrider Quadratur-Phasen-Tracker (0,1 Cent Präzision)
  phaseTrackEngageCents: 26,    // Maximale Grobabweichung für Zuschaltung des Phasen-Trackers
  phaseTrackFullCents: 14,      // Ab hier volle Gewichtung des Phasen-Trackers
  phaseTrackMaxDriftCents: 14,  // Konsistenz-Fenster gegenüber MPM/NSDF
  phaseTrackMinCoherence: 0.55, // Mindest-Amplitudenstabilität zwischen Block 1 und Block 2
  phaseTrackMinSnr: 0.11,       // Mindest-Phasor-Anteil am Signal
  phaseTrackMaxPhaseRad: 2.2,   // Sicherheitsabstand zu ±π gegen Phase-Wrapping
  phaseTrackEmaAlpha: 0.36,     // Schnelle, ruhige Glättung im 0,1-Cent-Feinbereich

  // 6) Konfidenz, Ausreißer-Filterung & ruhige UI
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
  inTuneHoldMs: 450,            // Haltedauer in der Zielzone für „Sauber gestimmt!“
  strobeSpeedScale: 0.42        // Strobe-Laufgeschwindigkeit (Perioden/s pro Cent)
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

// Instrumenten-spezifische DSP-Profile (kein statischer EQ, sondern gezielte Analyse-Parameter)
const TUNER_DSP_PROFILES = Object.freeze({
  chromatic: Object.freeze({
    id: "chromatic",
    searchRange: [27, 2000],
    transientBlankMs: 35,
    transientRiseDb: 9.0,
    onsetFluxThreshold: 0.44,
    onsetLockStrict: false,
    useLowDecimation: "auto",   // Tiefton-Dezimierung automatisch < 155 Hz
    combFilterMix: 0.45,
    combPasses: 1,
    vibratoMode: "auto",
    medianLength: 5,
    emaAlpha: 0.28,
    pitchLockMissLimit: 2,
    phaseTrackerEnabled: true
  }),
  guitar: Object.freeze({
    id: "guitar",
    searchRange: [65, 1200],
    transientBlankMs: 40,       // 35–45 ms gegen Zupf-Pitch-Overshoot
    transientRiseDb: 8.5,
    onsetFluxThreshold: 0.38,
    onsetLockStrict: true,      // Schützt im Decay gegen mitschwingende Nachbarsaiten
    useLowDecimation: "auto",   // Hilft auch bei Drop-Stimmungen & 7-Saiter (B1 = 61,7 Hz)
    combFilterMix: 0.72,        // Starkes harmonisches Kammfilter im Ausklang
    combPasses: 2,
    vibratoMode: "off",
    medianLength: 5,
    emaAlpha: 0.28,
    pitchLockMissLimit: 4,
    phaseTrackerEnabled: true
  }),
  bass: Object.freeze({
    id: "bass",
    searchRange: [27, 350],
    transientBlankMs: 70,       // 60–80 ms gegen kräftige Bass-Anschlag-Transienten
    transientRiseDb: 8.0,
    onsetFluxThreshold: 0.36,
    onsetLockStrict: true,
    useLowDecimation: "always", // Immer über Anti-Aliasing + 4×-Tiefton-Pfad
    combFilterMix: 0.70,
    combPasses: 2,
    vibratoMode: "off",
    medianLength: 5,
    emaAlpha: 0.24,
    pitchLockMissLimit: 4,
    phaseTrackerEnabled: true
  }),
  sustained: Object.freeze({
    id: "sustained",
    searchRange: [55, 2200],
    transientBlankMs: 0,        // Transienten-Masking deaktiviert (Bläser / Gesang / Streicher)
    transientRiseDb: 99,
    onsetFluxThreshold: 99,
    onsetLockStrict: false,     // Legato-Übergänge ohne Onset-Sperre
    useLowDecimation: "auto",   // Hilft bei Cello / tiefen Bläsern
    combFilterMix: 0.22,        // Nur sehr sanfte Nachführung
    combPasses: 1,
    vibratoMode: "active",      // Automatische Vibrato-Erkennung & 1-Perioden-Mittelung
    medianLength: 6,
    emaAlpha: 0.20,
    pitchLockMissLimit: 2,
    phaseTrackerEnabled: true
  }),
  // Singstimme in Übungen („… treffen“, js/pitch-capture.js): kürzeres Fenster, Suchbereich der Stimme
  voice: Object.freeze({
    id: "voice",
    searchRange: [65, 1100],    // C2 bis Cis6 (tiefer Bass bis hoher Sopran)
    transientBlankMs: 0,
    transientRiseDb: 99,
    onsetFluxThreshold: 99,
    onsetLockStrict: false,
    useLowDecimation: "auto",   // Tiefe Männerstimmen (< 155 Hz) über den Tiefton-Pfad absichern
    combFilterMix: 0,
    combPasses: 1,
    vibratoMode: "active",
    medianLength: 3,
    emaAlpha: 0.3,
    pitchLockMissLimit: 2,
    phaseTrackerEnabled: false
  }),
  piano: Object.freeze({
    id: "piano",
    searchRange: [25, 4200],    // A0 (27,5 Hz) bis C8 (4186 Hz)
    transientBlankMs: 35,       // Kurze Hammer-Anschlag-Maskierung
    transientRiseDb: 8.5,
    onsetFluxThreshold: 0.40,
    onsetLockStrict: true,      // Schutz gegen Resonanzboden-Mitschwingen
    useLowDecimation: "auto",   // Tiefton-Pfad für Bass-Oktaven A0–D3
    combFilterMix: 0.60,
    combPasses: 1,
    vibratoMode: "off",
    medianLength: 5,
    emaAlpha: 0.26,
    pitchLockMissLimit: 3,
    phaseTrackerEnabled: true
  })
});

// Approximierte Railsback-Kurve für Klavier-Spreizung (MIDI-Taste → Cent-Offset)
// Kompensiert die Saiten-Inharmonizität in den tiefsten und höchsten Oktaven.
const TUNER_RAILSBACK_CURVE = Object.freeze([
  Object.freeze({ midi: 21, cents: -30.0 }),  // A0
  Object.freeze({ midi: 24, cents: -24.0 }),  // C1
  Object.freeze({ midi: 36, cents: -10.0 }),  // C2
  Object.freeze({ midi: 48, cents: -3.0 }),   // C3
  Object.freeze({ midi: 60, cents: -0.5 }),   // C4
  Object.freeze({ midi: 69, cents: 0.0 }),    // A4 (Referenz)
  Object.freeze({ midi: 72, cents: 1.0 }),    // C5
  Object.freeze({ midi: 84, cents: 5.5 }),    // C6
  Object.freeze({ midi: 96, cents: 16.0 }),   // C7
  Object.freeze({ midi: 108, cents: 32.0 })   // C8
]);

// Sweetened Guitar Tuning (angelehnt an Peterson GTR / James Taylor für schwebungsfreiere Akkorde)
// Werte in Cent relativ zur gleichstufigen Stimmung (tiefste Saite zuerst).
const TUNER_SWEETENED_OFFSETS = Object.freeze({
  sixString: Object.freeze([-2.3, -1.9, -1.2, -1.6, 0.0, -0.5]),        // E2, A2, D3, G3, B3, E4
  sevenString: Object.freeze([-2.5, -2.3, -1.9, -1.2, -1.6, 0.0, -0.5]) // B1, E2, A2, D3, G3, B3, E4
});

// Transpositionen für klingende / transponierende Instrumente (Anzeige-Versatz in Halbtönen)
// Beispiel Bb: klingendes Bb3 erscheint als geschriebenes C4 (+2 Halbtöne).
const TUNER_TRANSPOSITIONS = Object.freeze({
  C:  Object.freeze({ key: "C",  semis: 0, label: "C",  de: "C (klingend)", en: "C (concert)" }),
  Bb: Object.freeze({ key: "Bb", semis: 2, label: "Bb", de: "Bb",           en: "Bb" }),
  Eb: Object.freeze({ key: "Eb", semis: 9, label: "Eb", de: "Eb",           en: "Eb" }),
  F:  Object.freeze({ key: "F",  semis: 7, label: "F",  de: "F",            en: "F" })
});

// Instrumente & Stimmungen (Noten in internationaler Schreibweise, tiefste Saite zuerst)
const TUNER_INSTRUMENTS = {
  chromatic: { de: "Chromatisch", en: "Chromatic", dspProfile: "chromatic", range: [27, 2000], tolerance: 4, supportsTransposition: true, tunings: null },
  guitar: { de: "Gitarre", en: "Guitar", dspProfile: "guitar", tolerance: 4, supportsSweetened: true, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["E2", "A2", "D3", "G3", "B3", "E4"] },
    halfDown: { de: "Halbton tiefer", en: "Half step down", notes: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"], flat: true },
    dropD: { de: "Drop D", en: "Drop D", notes: ["D2", "A2", "D3", "G3", "B3", "E4"] },
    dadgad: { de: "DADGAD", en: "DADGAD", notes: ["D2", "A2", "D3", "G3", "A3", "D4"] },
    openG: { de: "Open G", en: "Open G", notes: ["D2", "G2", "D3", "G3", "B3", "D4"] },
    openD: { de: "Open D", en: "Open D", notes: ["D2", "A2", "D3", "F#3", "A3", "D4"] }
  } },
  eguitar: { de: "E-Gitarre", en: "Electric guitar", dspProfile: "guitar", tolerance: 4, supportsSweetened: true, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["E2", "A2", "D3", "G3", "B3", "E4"] },
    halfDown: { de: "Halbton tiefer", en: "Half step down", notes: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"], flat: true },
    dropD: { de: "Drop D", en: "Drop D", notes: ["D2", "A2", "D3", "G3", "B3", "E4"] },
    dropC: { de: "Drop C", en: "Drop C", notes: ["C2", "G2", "C3", "F3", "A3", "D4"] },
    sevenString: { de: "7-saitig", en: "7-string", notes: ["B1", "E2", "A2", "D3", "G3", "B3", "E4"] }
  } },
  ebass: { de: "E-Bass", en: "Electric bass", dspProfile: "bass", tolerance: 4, tunings: {
    four: { de: "4-saitig", en: "4-string", notes: ["E1", "A1", "D2", "G2"] },
    five: { de: "5-saitig", en: "5-string", notes: ["B0", "E1", "A1", "D2", "G2"] },
    dropD: { de: "Drop D", en: "Drop D", notes: ["D1", "A1", "D2", "G2"] },
    halfDown: { de: "Halbton tiefer", en: "Half step down", notes: ["Eb1", "Ab1", "Db2", "Gb2"], flat: true }
  } },
  piano: { de: "Klavier", en: "Piano", dspProfile: "piano", range: [25, 4200], tolerance: 3, supportsStretch: true, tunings: null },
  winds: { de: "Bläser", en: "Winds", dspProfile: "sustained", range: [55, 2200], tolerance: 6, smooth: true, supportsTransposition: true, tunings: null },
  voice: { de: "Gesang", en: "Voice", dspProfile: "sustained", range: [65, 1300], tolerance: 10, smooth: true, tunings: null },
  violin: { de: "Violine", en: "Violin", dspProfile: "sustained", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["G3", "D4", "A4", "E5"] }
  } },
  viola: { de: "Viola", en: "Viola", dspProfile: "sustained", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["C3", "G3", "D4", "A4"] }
  } },
  cello: { de: "Cello", en: "Cello", dspProfile: "sustained", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["C2", "G2", "D3", "A3"] }
  } },
  doublebass: { de: "Kontrabass", en: "Double bass", dspProfile: "bass", tolerance: 4, tunings: {
    orchestra: { de: "Orchester", en: "Orchestral", notes: ["E1", "A1", "D2", "G2"] },
    solo: { de: "Solo", en: "Solo", notes: ["F#1", "B1", "E2", "A2"] }
  } },
  mandolin: { de: "Mandoline", en: "Mandolin", dspProfile: "guitar", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["G3", "D4", "A4", "E5"] }
  } },
  banjo: { de: "Banjo", en: "Banjo", dspProfile: "guitar", tolerance: 4, tunings: {
    openG: { de: "Open G", en: "Open G", notes: ["G4", "D3", "G3", "B3", "D4"] },
    doubleC: { de: "Double C", en: "Double C", notes: ["G4", "C3", "G3", "C4", "D4"] }
  } }
};

const TUNER_NOTE_LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function tunerNoteToMidi(name) {
  const m = /^([A-G])([#b]?)(-?\d)$/.exec(String(name || ""));
  if (!m) return 69;
  const acc = m[2] === "#" ? 1 : (m[2] === "b" ? -1 : 0);
  return (parseInt(m[3], 10) + 1) * 12 + TUNER_NOTE_LETTER_PC[m[1]] + acc;
}

function tunerMidiToFreq(midi, a4 = TUNER_A4_DEFAULT) {
  return a4 * Math.pow(2, (midi - 69) / 12);
}

function tunerFreqToMidiFloat(freq, a4 = TUNER_A4_DEFAULT) {
  return 69 + 12 * Math.log2(freq / a4);
}

function tunerRmsToDb(rms) {
  return 20 * Math.log10(Math.max(1e-7, rms));
}

function getTunerDspProfile(instrumentKey) {
  const inst = TUNER_INSTRUMENTS[instrumentKey] || TUNER_INSTRUMENTS.chromatic;
  return TUNER_DSP_PROFILES[inst.dspProfile] || TUNER_DSP_PROFILES.chromatic;
}

function getTunerTranspositionSemis(prefs) {
  if (!prefs) return 0;
  const inst = TUNER_INSTRUMENTS[prefs.instrument];
  if (!inst || !inst.supportsTransposition) return 0;
  const trDef = TUNER_TRANSPOSITIONS[prefs.transposition];
  return trDef ? trDef.semis : 0;
}

function getTunerRailsbackOffset(midi) {
  const pts = TUNER_RAILSBACK_CURVE;
  if (midi <= pts[0].midi) return pts[0].cents;
  const last = pts[pts.length - 1];
  if (midi >= last.midi) return last.cents;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    if (midi >= a.midi && midi <= b.midi) {
      const t = (midi - a.midi) / Math.max(1, b.midi - a.midi);
      return a.cents + t * (b.cents - a.cents);
    }
  }
  return 0;
}

function getTunerSweetenedOffset(prefs, stringIndex, midi) {
  if (!prefs || !prefs.guitarSweetened) return 0;
  const inst = TUNER_INSTRUMENTS[prefs.instrument];
  if (!inst || !inst.supportsSweetened) return 0;
  const tuning = inst.tunings ? inst.tunings[prefs.tuning] : null;
  if (!tuning || !tuning.notes) return 0;
  const table = tuning.notes.length === 7
    ? TUNER_SWEETENED_OFFSETS.sevenString
    : TUNER_SWEETENED_OFFSETS.sixString;
  if (Number.isInteger(stringIndex) && stringIndex >= 0 && stringIndex < table.length) {
    return table[stringIndex];
  }
  if (Number.isFinite(midi)) {
    for (let i = 0; i < tuning.notes.length && i < table.length; i++) {
      if (tunerNoteToMidi(tuning.notes[i]) === midi) return table[i];
    }
  }
  return 0;
}

function getTunerTargetOffsetCents(prefs, midi, stringIndex = -1) {
  if (!prefs) return 0;
  const inst = TUNER_INSTRUMENTS[prefs.instrument];
  if (!inst) return 0;
  if (inst.supportsSweetened && prefs.guitarSweetened) {
    return getTunerSweetenedOffset(prefs, stringIndex, midi);
  }
  if (inst.supportsStretch && prefs.pianoStretch && Number.isFinite(midi)) {
    return getTunerRailsbackOffset(midi);
  }
  return 0;
}

function getTunerTargetFreq(midi, prefs, stringIndex = -1) {
  const a4 = prefs?.a4 || TUNER_A4_DEFAULT;
  const base = tunerMidiToFreq(midi, a4);
  const offset = getTunerTargetOffsetCents(prefs, midi, stringIndex);
  return offset ? base * Math.pow(2, offset / 1200) : base;
}

// Läuft bereits beim Laden des Profils → eigenständig und abwärtskompatibel
function sanitizeTunerPrefs(raw) {
  if (!raw || typeof raw !== "object") return {};
  const out = {};
  if (typeof raw.instrument === "string" && Object.prototype.hasOwnProperty.call(TUNER_INSTRUMENTS, raw.instrument)) {
    out.instrument = raw.instrument;
  }
  if (typeof raw.tuning === "string" && /^[A-Za-z]{1,24}$/.test(raw.tuning)) out.tuning = raw.tuning;
  if (Number.isFinite(Number(raw.a4))) {
    out.a4 = Math.max(TUNER_A4_MIN, Math.min(TUNER_A4_MAX, Math.round(Number(raw.a4))));
  }
  out.mode = raw.mode === "single" ? "single" : "auto";
  if (Number.isFinite(Number(raw.targetMidi))) {
    out.targetMidi = Math.max(21, Math.min(108, Math.round(Number(raw.targetMidi))));
  }
  out.displayMode = raw.displayMode === "strobe" ? "strobe" : "gauge";
  out.transposition = Object.prototype.hasOwnProperty.call(TUNER_TRANSPOSITIONS, raw.transposition)
    ? raw.transposition
    : "C";
  out.guitarSweetened = Boolean(raw.guitarSweetened);
  out.pianoStretch = Boolean(raw.pianoStretch);
  return out;
}

// =====================================================
// DSP-BAUSTEIN 1: Biquad-Helfer & Tiefton-Dezimierungspfad
// =====================================================
function computeTunerBiquadCoeffs(type, fc, q, sampleRate) {
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
  return {
    b0: b0 / a0,
    b1: b1 / a0,
    b2: b2 / a0,
    a1: (-2 * cosW) / a0,
    a2: (1 - alpha) / a0
  };
}

class TunerLowFreqDownsampler {
  constructor() {
    this.filtered = null;
    this.decimated = null;
    this.cachedSr = 0;
    this.cachedFactor = 0;
    this.cachedCutoff = 0;
    this.stage1 = null;
    this.stage2 = null;
    this.result = { buffer: null, length: 0, sampleRate: 0, factor: 1 };
  }

  getFactor(sampleRate) {
    if (sampleRate > 72000) return 8;
    if (sampleRate > 36000) return 4;
    if (sampleRate > 20000) return 2;
    return 1;
  }

  ensureFilters(sampleRate, factor) {
    const targetSr = sampleRate / factor;
    const cutoff = Math.min(TUNER_CONFIG.lowDecimCutoffHz, targetSr * TUNER_CONFIG.lowDecimMaxCutoffRatio);
    if (this.cachedSr === sampleRate && this.cachedFactor === factor && Math.abs(this.cachedCutoff - cutoff) < 1) {
      return;
    }
    this.stage1 = computeTunerBiquadCoeffs("lowpass", cutoff, TUNER_BW4_Q1, sampleRate);
    this.stage2 = computeTunerBiquadCoeffs("lowpass", cutoff, TUNER_BW4_Q2, sampleRate);
    this.cachedSr = sampleRate;
    this.cachedFactor = factor;
    this.cachedCutoff = cutoff;
  }

  process(input, sampleRate) {
    const n = input.length;
    const factor = this.getFactor(sampleRate);
    const outLen = Math.floor(n / factor);
    if (!this.filtered || this.filtered.length !== n) this.filtered = new Float32Array(n);
    if (!this.decimated || this.decimated.length !== outLen) this.decimated = new Float32Array(outLen);

    const filt = this.filtered;
    // DC-Entfernung vor Anti-Aliasing-Filterung
    let mean = 0;
    for (let i = 0; i < n; i++) mean += input[i];
    mean /= Math.max(1, n);
    for (let i = 0; i < n; i++) filt[i] = input[i] - mean;

    if (factor > 1) {
      this.ensureFilters(sampleRate, factor);
      const warmup = Math.min(n - 1, Math.round(sampleRate * 0.025));
      for (let s = 0; s < 2; s++) {
        const f = s === 0 ? this.stage1 : this.stage2;
        const b0 = f.b0, b1 = f.b1, b2 = f.b2, a1 = f.a1, a2 = f.a2;
        let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
        for (let i = warmup; i > 0; i--) {
          const x0 = filt[i];
          const y0 = b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
          x2 = x1; x1 = x0; y2 = y1; y1 = y0;
        }
        for (let i = 0; i < n; i++) {
          const x0 = filt[i];
          const y0 = b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
          x2 = x1; x1 = x0; y2 = y1; y1 = y0;
          filt[i] = y0;
        }
      }
    }

    const out = this.decimated;
    for (let i = 0; i < outLen; i++) {
      out[i] = filt[i * factor];
    }
    this.result.buffer = out;
    this.result.length = outLen;
    this.result.sampleRate = sampleRate / factor;
    this.result.factor = factor;
    return this.result;
  }
}

// =====================================================
// DSP-BAUSTEIN 2: Dynamisches Zero-Phase-Kammfilter
// Verstärkt Grundton + Obertöne (1f, 2f, 3f, 4f, ...) mit 0° Phasenfehler
// und dämpft dazwischenliegende Frequenzen mitschwingender Nachbarsaiten.
// =====================================================
class TunerHarmonicCombFilter {
  constructor() {
    this.bufA = null;
    this.bufB = null;
  }

  applyPass(src, dst, n, delaySamples, mix) {
    const dInt = Math.floor(delaySamples);
    const frac = delaySamples - dInt;
    const invFrac = 1 - frac;
    const keep = 1 - mix;
    const safeStart = dInt + 1;
    const safeEnd = n - dInt - 2;

    for (let i = 0; i < n; i++) {
      const center = src[i];
      let comb = center;
      if (i >= safeStart && i <= safeEnd) {
        const prev = src[i - dInt] * invFrac + src[i - dInt - 1] * frac;
        const next = src[i + dInt] * invFrac + src[i + dInt + 1] * frac;
        // Symmetrisches Zero-Phase-Kammfilter: H(f) = cos²(π·f / f_lock)
        comb = 0.25 * prev + 0.5 * center + 0.25 * next;
      }
      dst[i] = keep * center + mix * comb;
    }
  }

  process(input, sampleRate, lockFreq, mix, passes = 1) {
    const n = input.length;
    if (
      !lockFreq ||
      mix <= 0.01 ||
      lockFreq < TUNER_CONFIG.combMinLockHz ||
      lockFreq > TUNER_CONFIG.combMaxLockHz
    ) {
      return input;
    }
    const delaySamples = sampleRate / lockFreq;
    if (delaySamples < 3 || delaySamples * 2.5 >= n) return input;

    if (!this.bufA || this.bufA.length !== n) this.bufA = new Float32Array(n);
    this.applyPass(input, this.bufA, n, delaySamples, mix);
    if (passes >= 2) {
      if (!this.bufB || this.bufB.length !== n) this.bufB = new Float32Array(n);
      this.applyPass(this.bufA, this.bufB, n, delaySamples, mix * 0.85);
      return this.bufB;
    }
    return this.bufA;
  }
}

// =====================================================
// DSP-BAUSTEIN 3: Onset-Detektor (Pegelanstieg + Spectral Flux)
// =====================================================
class TunerOnsetDetector {
  constructor() {
    this.prevMag = new Float32Array(TUNER_CONFIG.onsetFluxBins);
    this.hasPrev = false;
    this.result = { isTransient: false, isOnset: false, flux: 0, dbRise: 0 };
  }

  reset() {
    this.prevMag.fill(0);
    this.hasPrev = false;
    this.result.isTransient = false;
    this.result.isOnset = false;
    this.result.flux = 0;
    this.result.dbRise = 0;
  }

  evaluate(mag, hopDb, prevHopDb, noiseFloorDb, gateOpenDb, profile) {
    const out = this.result;
    const dbRise = prevHopDb > -115 ? hopDb - prevHopDb : 0;
    let flux = 0;

    if (mag && mag.length > 4) {
      const bins = Math.min(this.prevMag.length, mag.length - 1);
      let normEnergy = 0;
      for (let i = 1; i <= bins; i++) {
        const m = mag[i];
        normEnergy += m * m;
      }
      const invNorm = normEnergy > 1e-12 ? 1 / Math.sqrt(normEnergy) : 0;
      if (this.hasPrev && invNorm > 0) {
        for (let i = 1; i <= bins; i++) {
          const cur = mag[i] * invNorm;
          const diff = cur - this.prevMag[i - 1];
          if (diff > 0) flux += diff;
          this.prevMag[i - 1] = cur;
        }
        // Auf Anzahl signifikanter Bins skalieren (~0..2 Bereich)
        flux /= Math.sqrt(bins) * 0.35;
      } else if (invNorm > 0) {
        for (let i = 1; i <= bins; i++) {
          this.prevMag[i - 1] = mag[i] * invNorm;
        }
        this.hasPrev = true;
      }
    }

    const riseThresh = profile?.transientRiseDb ?? TUNER_CONFIG.transientRiseDb;
    const fluxThresh = profile?.onsetFluxThreshold ?? TUNER_CONFIG.onsetFluxThreshold;
    const aboveFloor = hopDb >= Math.max(gateOpenDb - 2, noiseFloorDb + TUNER_CONFIG.onsetFluxMinOverFloorDb);
    const energyTransient = dbRise >= riseThresh && hopDb >= gateOpenDb;
    const fluxOnset = aboveFloor && flux >= fluxThresh && dbRise >= -1.5;

    out.dbRise = dbRise;
    out.flux = flux;
    out.isTransient = energyTransient;
    out.isOnset = energyTransient || fluxOnset;
    return out;
  }
}

// =====================================================
// DSP-BAUSTEIN 4: Vibrato-Erkennung & periodengenaue Mittelung
// =====================================================
class TunerVibratoTracker {
  constructor() {
    const cap = TUNER_CONFIG.vibratoRingSize;
    this.centsRing = new Float64Array(cap);
    this.timeRing = new Float64Array(cap);
    this.count = 0;
    this.pos = 0;
    this.lastTime = 0;
    this.lastCents = 0;
    this.activeUntil = 0;
    this.lastRateHz = 0;
    this.result = { active: false, rateHz: 0, depthCents: 0, centerCents: 0 };
  }

  reset() {
    this.count = 0;
    this.pos = 0;
    this.lastTime = 0;
    this.lastCents = 0;
    this.activeUntil = 0;
    this.lastRateHz = 0;
    this.result.active = false;
    this.result.rateHz = 0;
    this.result.depthCents = 0;
    this.result.centerCents = 0;
  }

  push(midiFloat, now, mode) {
    const out = this.result;
    const absCents = midiFloat * 100;
    if (mode === "off") {
      this.reset();
      out.centerCents = absCents;
      return out;
    }

    // Bei größerem Tonhöhensprung (> 95 Cent) oder längerer Pause (> 180 ms) sauber neu starten
    if (this.count > 0 && (now - this.lastTime > 180 || Math.abs(absCents - this.lastCents) > 95)) {
      this.count = 0;
      this.pos = 0;
      this.activeUntil = 0;
    }

    const cap = this.centsRing.length;
    this.centsRing[this.pos] = absCents;
    this.timeRing[this.pos] = now;
    this.pos = (this.pos + 1) % cap;
    if (this.count < cap) this.count++;
    this.lastTime = now;
    this.lastCents = absCents;

    out.centerCents = absCents;
    if (this.count < TUNER_CONFIG.vibratoMinSamples) {
      out.active = false;
      out.rateHz = 0;
      out.depthCents = 0;
      return out;
    }

    // Chronologische Auswertung über die vorhandenen Samples
    const startIdx = (this.pos - this.count + cap) % cap;
    const oldestTime = this.timeRing[startIdx];
    const spanSec = (now - oldestTime) / 1000;
    if (spanSec < 0.25) {
      out.active = false;
      return out;
    }

    let sum = 0;
    for (let k = 0; k < this.count; k++) {
      sum += this.centsRing[(startIdx + k) % cap];
    }
    const mean = sum / this.count;

    let varSum = 0;
    let crossings = 0;
    let sign = 0;
    const hyst = TUNER_CONFIG.vibratoZeroHystCents;
    for (let k = 0; k < this.count; k++) {
      const d = this.centsRing[(startIdx + k) % cap] - mean;
      varSum += d * d;
      if (d > hyst) {
        if (sign === -1) crossings++;
        sign = 1;
      } else if (d < -hyst) {
        if (sign === 1) crossings++;
        sign = -1;
      }
    }

    const rmsDepth = Math.sqrt(varSum / this.count);
    const rateHz = crossings / (2 * spanSec);
    const minDepth = mode === "active"
      ? TUNER_CONFIG.vibratoMinDepthActive
      : TUNER_CONFIG.vibratoMinDepthAuto;

    const detected =
      crossings >= 3 &&
      rateHz >= TUNER_CONFIG.vibratoMinRateHz &&
      rateHz <= TUNER_CONFIG.vibratoMaxRateHz &&
      rmsDepth >= minDepth &&
      rmsDepth <= TUNER_CONFIG.vibratoMaxDepthCents;

    if (detected) {
      this.activeUntil = now + TUNER_CONFIG.vibratoHoldMs;
      this.lastRateHz = this.lastRateHz > 0 ? this.lastRateHz * 0.6 + rateHz * 0.4 : rateHz;
    }

    const isActive = detected || now < this.activeUntil;
    out.active = isActive;
    out.rateHz = isActive ? (this.lastRateHz || rateHz) : 0;
    out.depthCents = isActive ? rmsDepth : 0;

    if (isActive) {
      // Exakte periodengenaue Trapez-Integration über genau eine volle Vibrato-Periode [now - periodMs, now]
      const periodMs = Math.max(
        TUNER_CONFIG.vibratoMinPeriodMs,
        Math.min(TUNER_CONFIG.vibratoMaxPeriodMs, 1000 / Math.max(TUNER_CONFIG.vibratoMinRateHz, out.rateHz))
      );
      const cutoffTime = now - periodMs;
      let area = 0;
      let span = 0;
      for (let k = this.count - 1; k > 0; k--) {
        const idxHi = (startIdx + k) % cap;
        const idxLo = (startIdx + k - 1) % cap;
        const tHi = this.timeRing[idxHi];
        const tLo = this.timeRing[idxLo];
        const vHi = this.centsRing[idxHi];
        const vLo = this.centsRing[idxLo];
        const segDt = tHi - tLo;
        if (segDt <= 0) continue;
        if (tLo >= cutoffTime) {
          area += 0.5 * (vHi + vLo) * segDt;
          span += segDt;
        } else {
          // Exakte lineare Interpolation an der linken Periodengrenze cutoffTime
          const frac = Math.max(0, Math.min(1, (tHi - cutoffTime) / segDt));
          const vCut = vHi + (vLo - vHi) * frac;
          const partDt = tHi - cutoffTime;
          if (partDt > 0) {
            area += 0.5 * (vHi + vCut) * partDt;
            span += partDt;
          }
          break;
        }
      }
      if (span > 0) out.centerCents = area / span;
    }

    return out;
  }
}

// =====================================================
// DSP-BAUSTEIN 5: Hybrider Quadratur-Phasen-Tracker (0,1 Cent)
// I/Q-Phasenvergleich zwischen zwei exakt zeitkohärenten Hann-Blöcken
// innerhalb desselben Audio-Puffers gegen die exakte Zielfrequenz.
// =====================================================
class TunerPhaseTracker {
  constructor() {
    this.winBuf = null;
    this.winLen = 0;
    this.smoothCents = 0;
    this.hasSmooth = false;
    this.lastTargetMidi = null;
    this.result = { valid: false, cents: 0, freq: 0, confidence: 0, harmonic: 1 };
    this.probe = { valid: false, cents: 0, confidence: 0, snr: 0 };
  }

  reset() {
    this.smoothCents = 0;
    this.hasSmooth = false;
    this.lastTargetMidi = null;
    this.result.valid = false;
    this.result.cents = 0;
    this.result.freq = 0;
    this.result.confidence = 0;
    this.result.harmonic = 1;
  }

  ensureWindow(len) {
    if (this.winLen === len && this.winBuf) return this.winBuf;
    const win = new Float32Array(len);
    const denom = Math.max(1, len - 1);
    for (let i = 0; i < len; i++) {
      win[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / denom));
    }
    this.winBuf = win;
    this.winLen = len;
    return win;
  }

  measureHarmonic(signal, sampleRate, targetFreq, harmonic, coarseCents) {
    const out = this.probe;
    out.valid = false;
    const n = signal.length;
    const fRef = targetFreq * harmonic;
    if (fRef < 25 || fRef >= sampleRate * 0.42 || n < 1024) return out;

    const L = n >> 1;
    // Dynamischer Blockversatz gegen Phase-Wrapping bei hohen Frequenzen
    const maxDf = Math.max(0.5, fRef * 0.018); // ~31 Cent Sicherheitsspanne
    const maxSafeHop = Math.floor((TUNER_CONFIG.phaseTrackMaxPhaseRad * sampleRate) / (2 * Math.PI * maxDf));
    const hopQ = Math.max(128, Math.min(L, maxSafeHop));
    const start2 = n - L;
    const start1 = start2 - hopQ;
    if (start1 < 0) return out;

    const win = this.ensureWindow(L);
    const w = (2 * Math.PI * fRef) / sampleRate;
    const cStep = Math.cos(w);
    const sStep = Math.sin(w);

    let c = 1;
    let s = 0;
    let i1 = 0, q1 = 0, i2 = 0, q2 = 0;
    let e1 = 0, e2 = 0;

    for (let i = 0; i < L; i++) {
      const wv = win[i];
      const v1 = signal[start1 + i] * wv;
      const v2 = signal[start2 + i] * wv;
      e1 += v1 * v1;
      e2 += v2 * v2;
      i1 += v1 * c;
      q1 -= v1 * s;
      i2 += v2 * c;
      q2 -= v2 * s;
      const nc = c * cStep - s * sStep;
      s = c * sStep + s * cStep;
      c = nc;
    }

    const mag1 = Math.hypot(i1, q1);
    const mag2 = Math.hypot(i2, q2);
    if (mag1 < 1e-7 || mag2 < 1e-7) return out;

    const coherence = (2 * mag1 * mag2) / (mag1 * mag1 + mag2 * mag2 + 1e-12);
    // Hann-Fenster-Korrektur für Energie-Verhältnis (SNR des Zielton-Phasors)
    const snr = (mag1 + mag2) / (Math.sqrt(e1 * L * 0.5) + Math.sqrt(e2 * L * 0.5) + 1e-12);
    if (coherence < TUNER_CONFIG.phaseTrackMinCoherence || snr < TUNER_CONFIG.phaseTrackMinSnr) {
      return out;
    }

    // Referenz-Phasenfortschritt über hopQ Samples herausdrehen → reine Abweichungsphase Δφ
    const refAngle = w * hopQ;
    const cr = Math.cos(refAngle);
    const sr = Math.sin(refAngle);
    const i2d = i2 * cr + q2 * sr;
    const q2d = -i2 * sr + q2 * cr;

    // Kreuzprodukt Z2_derot * conj(Z1)
    const reCross = i2d * i1 + q2d * q1;
    const imCross = q2d * i1 - i2d * q1;
    const dPhi = Math.atan2(imCross, reCross);
    const dt = hopQ / sampleRate;
    const fErr = dPhi / (2 * Math.PI * dt);
    const actualHarmFreq = fRef + fErr;
    if (actualHarmFreq <= 0) return out;

    const cents = 1200 * Math.log2(actualHarmFreq / fRef);
    if (!Number.isFinite(cents) || Math.abs(cents - coarseCents) > TUNER_CONFIG.phaseTrackMaxDriftCents) {
      return out;
    }

    out.valid = true;
    out.cents = cents;
    out.confidence = Math.min(1, coherence * Math.min(1, snr * 3.2));
    out.snr = snr;
    return out;
  }

  track(signal, sampleRate, targetFreq, targetMidi, coarseFreq) {
    const out = this.result;
    out.valid = false;
    if (!signal || !sampleRate || !targetFreq || !coarseFreq) return out;

    const coarseCents = 1200 * Math.log2(coarseFreq / targetFreq);
    if (Math.abs(coarseCents) > TUNER_CONFIG.phaseTrackEngageCents) {
      this.hasSmooth = false;
      this.lastTargetMidi = null;
      return out;
    }

    // Grundton prüfen; im Tiefbass bei schwachem Grundton ggf. 2. Oberton heranziehen
    let bestValid = false;
    let bestCents = 0;
    let bestConf = 0;
    let bestHarm = 1;

    const p1 = this.measureHarmonic(signal, sampleRate, targetFreq, 1, coarseCents);
    if (p1.valid) {
      bestValid = true;
      bestCents = p1.cents;
      bestConf = p1.confidence;
      bestHarm = 1;
    }

    if (targetFreq < 140 && (!bestValid || p1.snr < 0.16)) {
      const p2 = this.measureHarmonic(signal, sampleRate, targetFreq, 2, coarseCents);
      if (p2.valid && (!bestValid || p2.confidence > bestConf * 1.15)) {
        bestValid = true;
        bestCents = p2.cents;
        bestConf = p2.confidence;
        bestHarm = 2;
      }
    }

    if (!bestValid) return out;

    if (!this.hasSmooth || this.lastTargetMidi !== targetMidi || Math.abs(bestCents - this.smoothCents) > 12) {
      this.smoothCents = bestCents;
      this.hasSmooth = true;
      this.lastTargetMidi = targetMidi;
    } else {
      this.smoothCents += TUNER_CONFIG.phaseTrackEmaAlpha * (bestCents - this.smoothCents);
    }

    out.valid = true;
    out.cents = this.smoothCents;
    out.freq = targetFreq * Math.pow(2, this.smoothCents / 1200);
    out.confidence = bestConf;
    out.harmonic = bestHarm;
    return out;
  }
}
