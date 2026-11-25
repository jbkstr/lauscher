// =====================================================
// WERKZEUG: GITARREN-GRIFFBRETT (#viewFretboard)
// Akkord-Bibliothek & Lagen, direktes Abwandeln,
// Umkehrsuche (Reverse Chord Finder) & Tonleitern (0–15)
// =====================================================
const FB_MAX_FRET = 15;
const FB_FRET_PX = 44;
const FB_INLAY_FRETS = new Set([3, 5, 7, 9, 12, 15]);
const FB_GUITAR_GAIN_BOOST = 1.15;

const FB_TUNINGS = [
  { id: "standard", de: "Standard (E)",      en: "Standard (E)",      midis: [40, 45, 50, 55, 59, 64] },
  { id: "drop-d",   de: "Drop D",            en: "Drop D",            midis: [38, 45, 50, 55, 59, 64] },
  { id: "eb",       de: "Halbton tiefer (E♭)", en: "Half-Step Down (E♭)", midis: [39, 44, 49, 54, 58, 63] },
  { id: "dadgad",   de: "DADGAD",            en: "DADGAD",            midis: [38, 45, 50, 55, 57, 62] },
  { id: "open-g",   de: "Open G",            en: "Open G",            midis: [38, 43, 50, 55, 59, 62] }
];

const FB_CHORD_QUALITIES = [
  { id: "maj",    btn: "Dur",     btnEn: "Maj",    suffix: "",        chordKey: "maj",   intervals: [0, 4, 7],         required: [0, 4, 7],     invOrder: [0, 4, 7] },
  { id: "min",    btn: "m",       btnEn: "m",      suffix: "m",       chordKey: "min",   intervals: [0, 3, 7],         required: [0, 3, 7],     invOrder: [0, 3, 7] },
  { id: "5",      btn: "5",       btnEn: "5",      suffix: "5",       de: "Powerchord (1–5)",          en: "Power Chord (1–5)",          intervals: [0, 7],            required: [0, 7],        invOrder: [0, 7] },
  { id: "sus2",   btn: "sus2",    btnEn: "sus2",   suffix: "sus2",    chordKey: "sus2",  intervals: [0, 2, 7],         required: [0, 2, 7],     invOrder: [0, 2, 7] },
  { id: "sus4",   btn: "sus4",    btnEn: "sus4",   suffix: "sus4",    chordKey: "sus4",  intervals: [0, 5, 7],         required: [0, 5, 7],     invOrder: [0, 5, 7] },
  { id: "dim",    btn: "°",       btnEn: "°",      suffix: "°",       chordKey: "dim",   intervals: [0, 3, 6],         required: [0, 3, 6],     invOrder: [0, 3, 6] },
  { id: "aug",    btn: "+",       btnEn: "+",      suffix: "+",       chordKey: "aug",   intervals: [0, 4, 8],         required: [0, 4, 8],     invOrder: [0, 4, 8] },
  { id: "6",      btn: "6",       btnEn: "6",      suffix: "6",       de: "Dur-Sextakkord (1–3–5–6)",   en: "Major 6th (1–3–5–6)",        intervals: [0, 4, 7, 9],      required: [0, 4, 9],     invOrder: [0, 4, 7, 9] },
  { id: "m6",     btn: "m6",      btnEn: "m6",     suffix: "m6",      de: "Moll-Sextakkord (1–♭3–5–6)", en: "Minor 6th (1–♭3–5–6)",       intervals: [0, 3, 7, 9],      required: [0, 3, 9],     invOrder: [0, 3, 7, 9] },
  { id: "7",      btn: "7",       btnEn: "7",      suffix: "7",       chordKey: "7",     intervals: [0, 4, 7, 10],     required: [0, 4, 10],    invOrder: [0, 4, 7, 10] },
  { id: "maj7",   btn: "maj7",    btnEn: "maj7",   suffix: "maj7",    chordKey: "maj7",  intervals: [0, 4, 7, 11],     required: [0, 4, 11],    invOrder: [0, 4, 7, 11] },
  { id: "m7",     btn: "m7",      btnEn: "m7",     suffix: "m7",      chordKey: "m7",    intervals: [0, 3, 7, 10],     required: [0, 3, 10],    invOrder: [0, 3, 7, 10] },
  { id: "m7b5",   btn: "m7♭5",    btnEn: "m7♭5",   suffix: "m7♭5",    chordKey: "m7b5",  intervals: [0, 3, 6, 10],     required: [0, 3, 6, 10], invOrder: [0, 3, 6, 10] },
  { id: "dim7",   btn: "°7",      btnEn: "°7",     suffix: "°7",      chordKey: "dim7",  intervals: [0, 3, 6, 9],      required: [0, 3, 6, 9],  invOrder: [0, 3, 6, 9] },
  { id: "mMaj7",  btn: "mMaj7",   btnEn: "mMaj7",  suffix: "m(maj7)", chordKey: "mMaj7", intervals: [0, 3, 7, 11],     required: [0, 3, 11],    invOrder: [0, 3, 7, 11] },
  { id: "7sus4",  btn: "7sus4",   btnEn: "7sus4",  suffix: "7sus4",   de: "7sus4 (1–4–5–♭7)",           en: "7sus4 (1–4–5–♭7)",           intervals: [0, 5, 7, 10],     required: [0, 5, 10],    invOrder: [0, 5, 7, 10] },
  { id: "add9",   btn: "add9",    btnEn: "add9",   suffix: "add9",    de: "Dur add9 (1–3–5–9)",         en: "Major add9 (1–3–5–9)",       intervals: [0, 2, 4, 7],      required: [0, 2, 4],     invOrder: [0, 4, 7, 2] },
  { id: "madd9",  btn: "madd9",   btnEn: "madd9",  suffix: "m(add9)", de: "Moll add9 (1–♭3–5–9)",       en: "Minor add9 (1–♭3–5–9)",      intervals: [0, 2, 3, 7],      required: [0, 2, 3],     invOrder: [0, 3, 7, 2] },
  { id: "9",      btn: "9",       btnEn: "9",      suffix: "9",       de: "Dominant-9 (1–3–5–♭7–9)",    en: "Dominant 9th (1–3–5–♭7–9)",  intervals: [0, 2, 4, 7, 10],  required: [0, 2, 4, 10], invOrder: [0, 4, 7, 10] },
  { id: "maj9",   btn: "maj9",    btnEn: "maj9",   suffix: "maj9",    chordKey: "maj9",  intervals: [0, 2, 4, 7, 11],  required: [0, 2, 4, 11], invOrder: [0, 4, 7, 11] },
  { id: "m9",     btn: "m9",      btnEn: "m9",     suffix: "m9",      de: "Moll-9 (1–♭3–5–♭7–9)",       en: "Minor 9th (1–♭3–5–♭7–9)",    intervals: [0, 2, 3, 7, 10],  required: [0, 2, 3, 10], invOrder: [0, 3, 7, 10] },
  { id: "7b9",    btn: "7♭9",     btnEn: "7♭9",    suffix: "7♭9",     chordKey: "7b9",   intervals: [0, 1, 4, 7, 10],  required: [0, 1, 4, 10], invOrder: [0, 4, 7, 10] },
  { id: "7s9",    btn: "7♯9",     btnEn: "7♯9",    suffix: "7♯9",     chordKey: "7s9",   intervals: [0, 3, 4, 7, 10],  required: [0, 3, 4, 10], invOrder: [0, 4, 7, 10] },
  { id: "69",     btn: "6/9",     btnEn: "6/9",    suffix: "6/9",     de: "Dur 6/9 (1–3–5–6–9)",        en: "Major 6/9 (1–3–5–6–9)",      intervals: [0, 2, 4, 7, 9],   required: [0, 2, 4, 9],  invOrder: [0, 4, 7, 9] }
];

// Klassische Standard-Stimmungs-Griffe (höchste musikalische Priorität bei offenen & populären Formen)
const FB_CANONICAL_STANDARD_SHAPES = {
  "0:maj:0":    [[-1, 3, 2, 0, 1, 0], [-1, 3, 5, 5, 5, 3], [8, 10, 10, 9, 8, 8]],
  "0:maj:4":    [[0, 3, 2, 0, 1, 0]],
  "0:maj:7":    [[3, 3, 2, 0, 1, 0]],
  "2:maj:2":    [[-1, -1, 0, 2, 3, 2], [-1, 5, 7, 7, 7, 5], [10, 12, 12, 11, 10, 10]],
  "2:maj:6":    [[2, 0, 0, 2, 3, 2]],
  "4:maj:4":    [[0, 2, 2, 1, 0, 0], [-1, 7, 9, 9, 9, 7], [12, 14, 14, 13, 12, 12]],
  "5:maj:5":    [[1, 3, 3, 2, 1, 1], [-1, -1, 3, 2, 1, 1], [-1, 8, 10, 10, 10, 8]],
  "5:maj:7":    [[3, -1, 3, 2, 1, 1]],
  "7:maj:7":    [[3, 2, 0, 0, 0, 3], [3, 2, 0, 0, 3, 3], [3, 5, 5, 4, 3, 3], [-1, 10, 12, 12, 12, 10]],
  "7:maj:11":   [[-1, 2, 0, 0, 3, 3], [-1, 2, 0, 0, 0, 3]],
  "9:maj:9":    [[-1, 0, 2, 2, 2, 0], [5, 7, 7, 6, 5, 5]],
  "11:maj:11":  [[-1, 2, 4, 4, 4, 2], [7, 9, 9, 8, 7, 7]],
  "9:min:9":    [[-1, 0, 2, 2, 1, 0], [5, 7, 7, 5, 5, 5]],
  "9:min:7":    [[3, 0, 2, 2, 1, 0]],
  "4:min:4":    [[0, 2, 2, 0, 0, 0], [-1, 7, 9, 9, 8, 7]],
  "2:min:2":    [[-1, -1, 0, 2, 3, 1], [-1, 5, 7, 7, 6, 5], [10, 12, 12, 10, 10, 10]],
  "0:min:0":    [[-1, 3, 5, 5, 4, 3], [8, 10, 10, 8, 8, 8]],
  "5:min:5":    [[1, 3, 3, 1, 1, 1], [-1, 8, 10, 10, 9, 8]],
  "7:min:7":    [[3, 5, 5, 3, 3, 3], [-1, 10, 12, 12, 11, 10]],
  "11:min:11":  [[-1, 2, 4, 4, 3, 2], [7, 9, 9, 7, 7, 7]],
  "0:7:0":      [[-1, 3, 2, 3, 1, 0], [-1, 3, 5, 3, 5, 3], [8, 10, 8, 9, 8, 8]],
  "2:7:2":      [[-1, -1, 0, 2, 1, 2], [-1, 5, 7, 5, 7, 5]],
  "4:7:4":      [[0, 2, 0, 1, 0, 0], [0, 2, 2, 1, 3, 0], [-1, 7, 9, 7, 9, 7]],
  "5:7:5":      [[1, 3, 1, 2, 1, 1]],
  "7:7:7":      [[3, 2, 0, 0, 0, 1], [3, 5, 3, 4, 3, 3]],
  "9:7:9":      [[-1, 0, 2, 0, 2, 0], [5, 7, 5, 6, 5, 5]],
  "11:7:11":    [[-1, 2, 1, 2, 0, 2], [7, 9, 7, 8, 7, 7]],
  "0:maj7:0":   [[-1, 3, 2, 0, 0, 0], [-1, 3, 5, 4, 5, 3]],
  "2:maj7:2":   [[-1, -1, 0, 2, 2, 2], [-1, 5, 7, 6, 7, 5]],
  "4:maj7:4":   [[0, 2, 1, 1, 0, 0]],
  "5:maj7:5":   [[-1, -1, 3, 2, 1, 0], [1, -1, 2, 2, 1, -1]],
  "7:maj7:7":   [[3, 2, 0, 0, 0, 2], [3, -1, 4, 4, 3, -1]],
  "9:maj7:9":   [[-1, 0, 2, 1, 2, 0], [5, -1, 6, 6, 5, -1]],
  "9:m7:9":     [[-1, 0, 2, 0, 1, 0], [5, 7, 5, 5, 5, 5]],
  "2:m7:2":     [[-1, -1, 0, 2, 1, 1], [-1, 5, 7, 5, 6, 5]],
  "4:m7:4":     [[0, 2, 2, 0, 3, 0], [0, 2, 0, 0, 0, 0], [-1, 7, 9, 7, 8, 7]],
  "0:add9:0":   [[-1, 3, 2, 0, 3, 0], [-1, 3, 2, 0, 3, 3]],
  "2:sus4:2":   [[-1, -1, 0, 2, 3, 3]],
  "2:sus2:2":   [[-1, -1, 0, 2, 3, 0]],
  "9:sus2:9":   [[-1, 0, 2, 2, 0, 0]],
  "9:sus4:9":   [[-1, 0, 2, 2, 3, 0]],
  "4:sus4:4":   [[0, 2, 2, 2, 0, 0]],
  "4:7s9:4":    [[0, 7, 6, 7, 8, -1], [-1, 7, 6, 7, 8, -1]]
};

const FB_SCALES = [
  { id: "minor-pent",     de: "Moll-Pentatonik",     en: "Minor Pentatonic",   intervals: [0, 3, 5, 7, 10],       degrees: ["1", "♭3", "4", "5", "♭7"],              charOffsets: [],       companion: "m7",   isMinor: true },
  { id: "major-pent",     de: "Dur-Pentatonik",      en: "Major Pentatonic",   intervals: [0, 2, 4, 7, 9],        degrees: ["1", "2", "3", "5", "6"],                charOffsets: [],       companion: "maj",  isMinor: false },
  { id: "minor-blues",    de: "Moll-Blues",          en: "Minor Blues",        intervals: [0, 3, 5, 6, 7, 10],    degrees: ["1", "♭3", "4", "♭5", "5", "♭7"],        charOffsets: [6],      companion: "7",    isMinor: true },
  { id: "major-blues",    de: "Dur-Blues",           en: "Major Blues",        intervals: [0, 2, 3, 4, 7, 9],     degrees: ["1", "2", "♭3", "3", "5", "6"],          charOffsets: [3],      companion: "7",    isMinor: false },
  { id: "major",          de: "Dur (Ionisch)",       en: "Major (Ionian)",     intervals: [0, 2, 4, 5, 7, 9, 11], degrees: ["1", "2", "3", "4", "5", "6", "7"],      charOffsets: [11],     companion: "maj7", isMinor: false },
  { id: "minor",          de: "Moll (Äolisch)",      en: "Natural Minor",      intervals: [0, 2, 3, 5, 7, 8, 10], degrees: ["1", "2", "♭3", "4", "5", "♭6", "♭7"],   charOffsets: [8],      companion: "m7",   isMinor: true },
  { id: "dorian",         de: "Dorisch",             en: "Dorian",             intervals: [0, 2, 3, 5, 7, 9, 10], degrees: ["1", "2", "♭3", "4", "5", "6", "♭7"],    charOffsets: [9],      companion: "m7",   isMinor: true },
  { id: "mixolydian",     de: "Mixolydisch",         en: "Mixolydian",         intervals: [0, 2, 4, 5, 7, 9, 10], degrees: ["1", "2", "3", "4", "5", "6", "♭7"],     charOffsets: [10],     companion: "7",    isMinor: false },
  { id: "lydian",         de: "Lydisch",             en: "Lydian",             intervals: [0, 2, 4, 6, 7, 9, 11], degrees: ["1", "2", "3", "♯4", "5", "6", "7"],     charOffsets: [6],      companion: "maj7", isMinor: false },
  { id: "phrygian",       de: "Phrygisch",           en: "Phrygian",           intervals: [0, 1, 3, 5, 7, 8, 10], degrees: ["1", "♭2", "♭3", "4", "5", "♭6", "♭7"],  charOffsets: [1],      companion: "m7",   isMinor: true },
  { id: "locrian",        de: "Lokrisch",            en: "Locrian",            intervals: [0, 1, 3, 5, 6, 8, 10], degrees: ["1", "♭2", "♭3", "4", "♭5", "♭6", "♭7"], charOffsets: [6],      companion: "m7b5", isMinor: true },
  { id: "harmonic-minor", de: "Harmonisch Moll",     en: "Harmonic Minor",     intervals: [0, 2, 3, 5, 7, 8, 11], degrees: ["1", "2", "♭3", "4", "5", "♭6", "7"],    charOffsets: [11],     companion: "min",  isMinor: true },
  { id: "melodic-minor",  de: "Melodisch Moll",      en: "Melodic Minor",      intervals: [0, 2, 3, 5, 7, 9, 11], degrees: ["1", "2", "♭3", "4", "5", "6", "7"],     charOffsets: [9, 11],  companion: "mMaj7",isMinor: true },
  { id: "phrygian-dom",   de: "Phrygisch Dominant",  en: "Phrygian Dominant",  intervals: [0, 1, 4, 5, 7, 8, 10], degrees: ["1", "♭2", "3", "4", "5", "♭6", "♭7"],   charOffsets: [1, 4],   companion: "7",    isMinor: false }
];

const _fb = {
  tab: "chords",        // "chords" | "reverse" | "scales"
  tuningId: "standard",
  labelMode: "notes",   // "notes" | "intervals" | "fingers"
  // Akkord-Modus
  chordRoot: 0,         // C
  chordQuality: "maj",
  chordBass: "root",    // "root" | 0..11
  voicings: [],
  voicingIdx: 0,
  workingFrets: [-1, 3, 2, 0, 1, 0],
  isModified: false,
  // Umkehrsuche
  reverseFrets: [-1, -1, -1, -1, -1, -1],
  lastReverseChord: null,
  // Tonleitern
  scaleRoot: 9,         // A
  scaleId: "minor-pent",
  scalePosIdx: -1,      // -1 = alle Bünde (0–15), 0..4 = Lage 1..5
  scaleBoxes: [],
  // Runtime
  timers: [],
  vibrations: new Map(),
  vibeRafId: null,
  voicingCache: new Map(),
  bound: false
};

// Physikalisch abgestufte Saiten-Parameter (Index 0 = tiefe E6 bis 5 = hohe e1)
const FB_STRING_VIBE_CFG = [
  { width: 3.1, maxAmp: 3.2, freq: 0.056, wound: true },
  { width: 2.7, maxAmp: 2.8, freq: 0.068, wound: true },
  { width: 2.3, maxAmp: 2.5, freq: 0.082, wound: true },
  { width: 1.9, maxAmp: 2.2, freq: 0.098, wound: false },
  { width: 1.5, maxAmp: 1.85, freq: 0.116, wound: false },
  { width: 1.2, maxAmp: 1.55, freq: 0.136, wound: false }
];

function isFretboardReducedMotion() {
  try {
    return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  } catch (_) {
    return false;
  }
}

function resetFretboardStringWire(row) {
  if (!row) return;
  row.classList.remove("is-vibrating");
  const wire = row.querySelector(".fb-string-wire");
  if (wire) {
    wire.style.width = "";
    wire.style.right = "";
  }
  row.querySelector(".fb-string-vibe-svg")?.remove();
}

function stopFretboardStringVibrations() {
  if (_fb.vibeRafId !== null) {
    cancelAnimationFrame(_fb.vibeRafId);
    _fb.vibeRafId = null;
  }
  _fb.vibrations.clear();
  document.querySelectorAll("#fbNeckHost .fb-string-row").forEach(resetFretboardStringWire);
}

function ensureFretboardVibeSvg(row, stringIdx) {
  let svg = row.querySelector(".fb-string-vibe-svg");
  if (svg) return svg;
  const ns = "http://www.w3.org/2000/svg";
  const cfg = FB_STRING_VIBE_CFG[stringIdx] || FB_STRING_VIBE_CFG[3];
  svg = document.createElementNS(ns, "svg");
  svg.setAttribute("class", `fb-string-vibe-svg${cfg.wound ? " is-wound" : ""}`);
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("preserveAspectRatio", "none");

  const halo = document.createElementNS(ns, "path");
  halo.setAttribute("class", "fb-string-vibe-halo");
  halo.setAttribute("fill", "currentColor");
  halo.setAttribute("stroke", "none");

  const core = document.createElementNS(ns, "path");
  core.setAttribute("class", "fb-string-vibe-core");
  core.setAttribute("fill", "none");
  core.setAttribute("stroke", "currentColor");
  core.setAttribute("stroke-width", String(cfg.width));
  core.setAttribute("stroke-linecap", "round");

  svg.appendChild(halo);
  svg.appendChild(core);
  row.appendChild(svg);
  return svg;
}

function stepFretboardStringVibrations(nowMs) {
  _fb.vibeRafId = null;
  const host = document.getElementById("fbNeckHost");
  if (!host || !host.isConnected || _fb.vibrations.size === 0) {
    if (_fb.vibrations.size > 0 && (!host || !host.isConnected)) {
      _fb.vibrations.clear();
    }
    return;
  }

  const reducedMotion = isFretboardReducedMotion();
  const toDelete = [];

  _fb.vibrations.forEach((vibe, stringIdx) => {
    const row = host.querySelector(`.fb-string-row[data-string-idx="${stringIdx}"]`);
    const elapsed = nowMs - vibe.startMs;
    if (!row || elapsed >= vibe.durationMs) {
      resetFretboardStringWire(row);
      toDelete.push(stringIdx);
      return;
    }

    const totalW = Math.max(FB_MAX_FRET * FB_FRET_PX, row.clientWidth - 58);
    const startX = vibe.fret > 0 ? Math.min(totalW - 12, vibe.fret * FB_FRET_PX - 4) : 0;
    const spanW = Math.max(12, totalW - startX);
    const progress = Math.max(0, Math.min(1, elapsed / vibe.durationMs));
    const env = Math.exp(-3.3 * progress) * (1 - progress * 0.25);

    const cfg = FB_STRING_VIBE_CFG[stringIdx] || FB_STRING_VIBE_CFG[3];
    // Kurze gegriffene Saiten in hohen Bünden schwingen minimal straffer aus
    const fretDamp = Math.max(0.58, 1 - vibe.fret * 0.025);
    const amp = reducedMotion ? 0 : cfg.maxAmp * fretDamp * env;
    const dy = amp * Math.sin(elapsed * cfg.freq * (1 + vibe.fret * 0.035));

    // Ruhender Saitenteil links vom gegriffenen Bund bleibt still
    row.classList.add("is-vibrating");
    const wire = row.querySelector(".fb-string-wire");
    if (wire) {
      wire.style.right = "auto";
      wire.style.width = `${startX}px`;
    }

    const svg = ensureFretboardVibeSvg(row, stringIdx);
    svg.setAttribute("viewBox", `0 0 ${totalW} 34`);
    const midY = 17;
    // Virtueller Steg rechts außerhalb des sichtbaren 15. Bunds → natürliche Biegung ohne Knick am Rand
    const bridgeX = totalW + 170;
    const ctrlX = startX + (bridgeX - startX) * 0.46;

    const core = svg.querySelector(".fb-string-vibe-core");
    const halo = svg.querySelector(".fb-string-vibe-halo");

    if (core) {
      core.setAttribute("d", `M ${startX} ${midY} Q ${ctrlX.toFixed(1)} ${(midY + dy).toFixed(2)} ${bridgeX} ${midY}`);
      core.style.opacity = String(0.88 + 0.12 * env);
    }
    if (halo) {
      const hEnv = reducedMotion ? (cfg.width * 0.6 + 1.4 * env) : (Math.max(cfg.width * 0.5, amp * 0.92 + cfg.width * 0.45));
      halo.setAttribute(
        "d",
        `M ${startX} ${midY} Q ${ctrlX.toFixed(1)} ${(midY - hEnv).toFixed(2)} ${bridgeX} ${midY} Q ${ctrlX.toFixed(1)} ${(midY + hEnv).toFixed(2)} ${startX} ${midY} Z`
      );
      halo.style.opacity = String((reducedMotion ? 0.34 : 0.24) * env);
    }
  });

  toDelete.forEach(s => _fb.vibrations.delete(s));

  if (_fb.vibrations.size > 0) {
    _fb.vibeRafId = requestAnimationFrame(stepFretboardStringVibrations);
  }
}

function vibrateFretboardString(stringIdx, fret = 0, durationMs = 1050) {
  if (!Number.isInteger(stringIdx) || stringIdx < 0 || stringIdx > 5) return;
  const safeFret = Number.isFinite(fret) ? Math.max(0, Math.min(FB_MAX_FRET, Math.round(fret))) : 0;
  const nowMs = (typeof performance !== "undefined" && typeof performance.now === "function")
    ? performance.now()
    : Date.now();
  _fb.vibrations.set(stringIdx, {
    fret: safeFret,
    startMs: nowMs,
    durationMs: Math.max(320, durationMs)
  });
  if (_fb.vibeRafId === null) {
    _fb.vibeRafId = requestAnimationFrame(stepFretboardStringVibrations);
  }
}

function getFretboardTuning() {
  return FB_TUNINGS.find(t => t.id === _fb.tuningId) || FB_TUNINGS[0];
}

function getFretboardQualityDef(id) {
  return FB_CHORD_QUALITIES.find(q => q.id === id) || FB_CHORD_QUALITIES[0];
}

function getFretboardScaleDef(id) {
  return FB_SCALES.find(s => s.id === id) || FB_SCALES[0];
}

function getFretboardActiveBassPc() {
  if (_fb.chordBass === "root") return _fb.chordRoot;
  const n = Number(_fb.chordBass);
  return Number.isFinite(n) ? ((n % 12) + 12) % 12 : _fb.chordRoot;
}

function clearFretboardTimers() {
  _fb.timers.forEach(id => clearTimeout(id));
  _fb.timers = [];
  document.querySelectorAll("#fbNeckHost .is-playing").forEach(el => el.classList.remove("is-playing"));
  stopFretboardStringVibrations();
}

function pulseFretboardPosition(stringIdx, fret, durationMs = 360, vibeDurationMs = null) {
  const host = document.getElementById("fbNeckHost");
  if (!host) return;
  vibrateFretboardString(stringIdx, fret, vibeDurationMs ?? Math.max(durationMs * 2.1, 780));
  let target = null;
  if (fret === 0) {
    target = host.querySelector(`.fb-nut-btn[data-fb-s="${stringIdx}"]`);
  } else if (fret > 0) {
    target = host.querySelector(`.fb-fret-cell[data-fb-s="${stringIdx}"][data-fb-f="${fret}"] .fb-dot`);
  }
  if (!target) return;
  target.classList.add("is-playing");
  const tid = setTimeout(() => {
    target.classList.remove("is-playing");
  }, durationMs);
  _fb.timers.push(tid);
}

function fretsToSoundingNotes(frets, tuningMidis) {
  const res = [];
  for (let s = 0; s < 6; s++) {
    const f = frets[s];
    if (typeof f === "number" && f >= 0) {
      res.push({ stringIdx: s, fret: f, midi: tuningMidis[s] + f });
    }
  }
  return res;
}

function formatFretReadout(frets) {
  return frets.map(f => (f < 0 ? "x" : String(f))).join(" · ");
}

/**
 * Berechnet die Greifbarkeit, Fingerbelegung (1–4) und eventuelle Barré-Balken für einen Griff.
 */
function computeGuitarFingering(frets) {
  const fretted = [];
  for (let s = 0; s < 6; s++) {
    if (frets[s] > 0) fretted.push({ s, f: frets[s] });
  }
  const fingers = [0, 0, 0, 0, 0, 0];
  if (fretted.length === 0) {
    return { playable: true, fingerCount: 0, barre: null, fingers, minFret: 0, maxFret: 0 };
  }

  let minF = 99;
  let maxF = 0;
  for (const p of fretted) {
    if (p.f < minF) minF = p.f;
    if (p.f > maxF) maxF = p.f;
  }
  const span = maxF - minF;
  if (span > 4 || (minF <= 4 && span > 3)) {
    return { playable: false, fingerCount: 99, barre: null, fingers, minFret: minF, maxFret: maxF };
  }

  const atMinF = fretted.filter(p => p.f === minF);
  const aboveMinF = fretted.filter(p => p.f > minF);

  // Prüfen, ob ein Zeigefinger-Barré auf minF physikalisch sauber greifbar ist
  let canBarre = false;
  let barreFrom = 0;
  let barreTo = 0;
  if (atMinF.length >= 2) {
    barreFrom = atMinF[0].s;
    barreTo = atMinF[atMinF.length - 1].s;
    let blocked = false;
    for (let s = barreFrom; s <= barreTo; s++) {
      if (frets[s] < minF) { // Leersaite (0) oder gedämpft (-1) mitten im Barré vermeiden
        blocked = true;
        break;
      }
    }
    if (!blocked) canBarre = true;
  }

  // Klassischer Doppel-Barré (z. B. A-Form Dur x-3-5-5-5-3: Zeigefinger auf 3, Ringfinger auf 5)
  let canDoubleBarre = false;
  if (canBarre && aboveMinF.length === 3) {
    const f2 = aboveMinF[0].f;
    const sameFret = aboveMinF.every(p => p.f === f2);
    const contiguous = (aboveMinF[2].s - aboveMinF[0].s) === 2;
    if (sameFret && contiguous && f2 <= minF + 2) {
      canDoubleBarre = true;
    }
  }

  const shouldUseBarre = canBarre && (
    fretted.length > 4 ||
    canDoubleBarre ||
    (barreTo - barreFrom >= 3) ||
    (atMinF.length >= 2 && barreFrom >= 4) // Kleiner Barré auf hohen Saiten (z. B. Dm7, F klein)
  );

  if (shouldUseBarre) {
    atMinF.forEach(p => { fingers[p.s] = 1; });
    if (canDoubleBarre) {
      aboveMinF.forEach(p => { fingers[p.s] = 3; });
      return {
        playable: true,
        fingerCount: 2,
        barre: { fret: minF, fromString: barreFrom, toString: barreTo, finger: 1 },
        fingers,
        minFret: minF,
        maxFret: maxF
      };
    }
    if (1 + aboveMinF.length <= 4) {
      const sortedAbove = aboveMinF.slice().sort((a, b) => (a.f - b.f) || (a.s - b.s));
      sortedAbove.forEach((p, i) => {
        fingers[p.s] = Math.min(4, i + 2);
      });
      return {
        playable: true,
        fingerCount: 1 + aboveMinF.length,
        barre: { fret: minF, fromString: barreFrom, toString: barreTo, finger: 1 },
        fingers,
        minFret: minF,
        maxFret: maxF
      };
    }
    return { playable: false, fingerCount: 99, barre: null, fingers, minFret: minF, maxFret: maxF };
  }

  // Ohne Barré: maximal 4 Finger
  if (fretted.length <= 4) {
    const sorted = fretted.slice().sort((a, b) => (a.f - b.f) || (a.s - b.s));
    const useOffset = (minF > 0 && span <= 2 && sorted.length <= 3) ? 1 : 1;
    sorted.forEach((p, i) => {
      fingers[p.s] = Math.min(4, i + useOffset);
    });
    return {
      playable: true,
      fingerCount: fretted.length,
      barre: null,
      fingers,
      minFret: minF,
      maxFret: maxF
    };
  }

  return { playable: false, fingerCount: 99, barre: null, fingers, minFret: minF, maxFret: maxF };
}

/**
 * Generiert musikalisch spielbare Gitarren-Voicings über das gesamte Griffbrett (0–15)
 * für beliebige Kombinationen aus Grundton, Qualität, Basston (Umkehrung/Slash) und Stimmung.
 */
function generateGuitarChordVoicings(rootPc, qualityId, bassPc, tuning) {
  const cacheKey = `${tuning.id}|${rootPc}|${qualityId}|${bassPc}`;
  if (_fb.voicingCache.has(cacheKey)) {
    return _fb.voicingCache.get(cacheKey);
  }

  const q = getFretboardQualityDef(qualityId);
  const tuningMidis = tuning.midis;
  const chordPcs = new Set(q.intervals.map(i => (rootPc + i) % 12));
  const requiredPcs = new Set(q.required.map(i => (rootPc + i) % 12));
  const isForeignBass = !chordPcs.has(bassPc);
  const minStrings = q.id === "5" ? 2 : Math.min(4, Math.max(3, requiredPcs.size + (isForeignBass ? 1 : 0)));
  const maxStrings = q.id === "5" ? 3 : 6;

  const canonicalSet = new Set();
  const rawCandidates = new Map(); // fretsKey -> voicingObj

  const evaluateAndStore = (frets, isCanonical = false) => {
    const sounding = [];
    for (let s = 0; s < 6; s++) {
      if (frets[s] >= 0) sounding.push({ s, f: frets[s], midi: tuningMidis[s] + frets[s] });
    }
    if (sounding.length < minStrings || sounding.length > maxStrings) return;

    // Tiefster klingender Ton muss exakter Basston sein
    const lowest = sounding[0];
    if (((lowest.midi % 12) + 12) % 12 !== bassPc) return;

    // Bei fremdem Slash-Basston darf dieser nicht die oberen Akkordtöne verdrängen
    const presentPcs = new Set();
    const upperPcs = new Set();
    for (let i = 0; i < sounding.length; i++) {
      const pc = ((sounding[i].midi % 12) + 12) % 12;
      presentPcs.add(pc);
      if (i > 0) upperPcs.add(pc);
      if (i > 0 && isForeignBass && pc === bassPc) return;
      if (!chordPcs.has(pc) && !(i === 0 && pc === bassPc)) return;
    }

    // Alle erforderlichen Intervalle prüfen
    for (const req of requiredPcs) {
      if (isForeignBass) {
        if (!upperPcs.has(req)) return;
      } else {
        if (!presentPcs.has(req)) return;
      }
    }

    // Innere Dämpfungen prüfen (zusammenhängend bevorzugt; max. 1 Lücke direkt über dem Bass für Jazz-Voicings)
    let interiorMutes = 0;
    let badGap = false;
    const firstS = sounding[0].s;
    const lastS = sounding[sounding.length - 1].s;
    for (let s = firstS + 1; s < lastS; s++) {
      if (frets[s] < 0) {
        interiorMutes += 1;
        if (s !== firstS + 1) badGap = true;
      }
    }
    if (interiorMutes > 1 || badGap) return;

    const fingering = computeGuitarFingering(frets);
    if (!fingering.playable) return;

    // Musikalisch-ergonomisches Scoring
    let score = 100;
    if (isCanonical) score += 55;

    // Bonus für vollständige Intervalle (inkl. Quinte)
    let allIntervalCount = 0;
    chordPcs.forEach(pc => { if (presentPcs.has(pc)) allIntervalCount += 1; });
    if (allIntervalCount === chordPcs.size) score += 18;

    // Saitenanzahl & Zusammenhang
    if (q.id === "5") {
      score += sounding.length === 3 ? 16 : 10;
      if (interiorMutes > 0) score -= 35;
    } else {
      score += Math.min(5, sounding.length) * 6;
      if (sounding.length === 6) score += 4;
      score += interiorMutes === 0 ? 16 : -6;
    }

    const openCount = sounding.filter(x => x.f === 0).length;
    const span = fingering.maxFret > 0 ? (fingering.maxFret - fingering.minFret) : 0;
    score -= span * 6;
    score -= fingering.fingerCount * 3;
    if (openCount > 0 && fingering.maxFret <= 4) score += openCount * 5;
    if (fingering.barre && !isCanonical) score -= 3;
    if (fingering.minFret >= 12) score -= 5;

    // Zu enge tiefe Terz/Sekunde unter Bb2 (MIDI 46) abwerten (klingt auf Gitarre dumpf)
    if (sounding.length >= 2 && sounding[0].midi < 46 && (sounding[1].midi - sounding[0].midi) <= 4) {
      score -= 28;
    }
    if (!isCanonical && frets[0] > 0 && frets[1] === 0 && sounding.length >= 4) {
      score -= 22;
    }

    const key = frets.join(",");
    const prev = rawCandidates.get(key);
    if (!prev || score > prev.score) {
      rawCandidates.set(key, {
        frets: frets.slice(),
        fingering,
        score,
        isCanonical,
        hasOpen: openCount > 0,
        posFret: openCount > 0 && fingering.maxFret <= 4 ? 0 : fingering.minFret,
        bassString: firstS
      });
    }
  };

  // 1. Kuratierte Standard-Griffe vorab einspeisen
  if (tuning.id === "standard") {
    const canonKey = `${rootPc}:${qualityId}:${bassPc}`;
    const list = FB_CANONICAL_STANDARD_SHAPES[canonKey] || [];
    list.forEach(shape => {
      canonicalSet.add(shape.join(","));
      evaluateAndStore(shape, true);
    });
  }

  // 2. Fenster-Suche über das gesamte Griffbrett (Offen + Bünde 1–15)
  const searchWindow = (minW, maxW, allowOpen) => {
    const perString = [];
    for (let s = 0; s < 6; s++) {
      const opts = [-1];
      if (allowOpen) {
        const pc0 = ((tuningMidis[s] % 12) + 12) % 12;
        if (chordPcs.has(pc0) || pc0 === bassPc) opts.push(0);
      }
      for (let f = minW; f <= maxW; f++) {
        const pc = (((tuningMidis[s] + f) % 12) + 12) % 12;
        if (chordPcs.has(pc) || pc === bassPc) opts.push(f);
      }
      perString.push(opts);
    }

    const cur = [-1, -1, -1, -1, -1, -1];
    const dfs = (s, started, soundingCount, interiorMutes) => {
      if (soundingCount > maxStrings) return;
      if (s === 6) {
        if (soundingCount >= minStrings) {
          evaluateAndStore(cur, canonicalSet.has(cur.join(",")));
        }
        return;
      }
      // Verbleibende Saiten reichen nicht mehr für minStrings
      if (soundingCount + (6 - s) < minStrings) return;

      const opts = perString[s];
      for (let i = 0; i < opts.length; i++) {
        const f = opts[i];
        if (f === -1) {
          if (started && soundingCount >= minStrings) {
            // Entweder enden die klingenden Saiten hier, oder 1 Lücke direkt über dem Bass
            cur[s] = -1;
            if (interiorMutes === 0 && soundingCount === 1) {
              dfs(s + 1, true, soundingCount, 1);
            } else {
              // Alle weiteren Saiten bleiben gedämpft
              for (let k = s + 1; k < 6; k++) cur[k] = -1;
              evaluateAndStore(cur, canonicalSet.has(cur.join(",")));
              for (let k = s + 1; k < 6; k++) cur[k] = -1;
            }
          } else if (!started) {
            cur[s] = -1;
            dfs(s + 1, false, 0, 0);
          } else if (interiorMutes === 0 && soundingCount === 1) {
            cur[s] = -1;
            dfs(s + 1, true, 1, 1);
          }
          continue;
        }

        const pc = (((tuningMidis[s] + f) % 12) + 12) % 12;
        if (!started) {
          if (pc !== bassPc) continue;
          cur[s] = f;
          dfs(s + 1, true, 1, 0);
        } else {
          if (isForeignBass && pc === bassPc) continue;
          cur[s] = f;
          dfs(s + 1, true, soundingCount + 1, interiorMutes);
        }
      }
      cur[s] = -1;
    };

    dfs(0, false, 0, 0);
  };

  // Offene Lage (Bund 0 + 1..4)
  searchWindow(1, 4, true);
  // Bewegliche Lagen (4-Bund-Fenster entlang des Griffbretts)
  for (let start = 1; start <= FB_MAX_FRET - 2; start++) {
    searchWindow(start, Math.min(FB_MAX_FRET, start + 3), false);
  }
  // Falls seltener Slash-Akkord noch keine Treffer hat: 5-Bund-Fenster in höheren Lagen (ab Bund 5)
  if (rawCandidates.size === 0) {
    for (let start = 5; start <= FB_MAX_FRET - 3; start++) {
      searchWindow(start, Math.min(FB_MAX_FRET, start + 4), false);
    }
  }

  // 3. Diversifizierung über das gesamte Griffbrett (pro Lage/Anker das beste Voicing wählen)
  const all = [...rawCandidates.values()].sort((a, b) => b.score - a.score);
  const picked = [];
  const usedZones = new Map();

  for (const v of all) {
    const zone = v.posFret === 0 ? "open" : `z${Math.floor((v.posFret + 1) / 2)}_${v.bassString}`;
    const fretBucket = v.posFret === 0 ? "open" : `f${Math.floor(v.posFret / 2)}`;
    const zoneCount = usedZones.get(zone) || 0;
    const bucketCount = usedZones.get(fretBucket) || 0;

    if (v.isCanonical && picked.length < 8) {
      picked.push(v);
      usedZones.set(zone, zoneCount + 1);
      usedZones.set(fretBucket, bucketCount + 1);
      continue;
    }

    if (zoneCount === 0 && bucketCount < 2 && picked.length < 8) {
      picked.push(v);
      usedZones.set(zone, zoneCount + 1);
      usedZones.set(fretBucket, bucketCount + 1);
    }
    if (picked.length >= 8) break;
  }

  // Falls noch < 4 Voicings gefunden wurden, mit weiteren besten Kandidaten auffüllen
  if (picked.length < 4) {
    const pickedKeys = new Set(picked.map(v => v.frets.join(",")));
    for (const v of all) {
      const k = v.frets.join(",");
      if (pickedKeys.has(k)) continue;
      picked.push(v);
      pickedKeys.add(k);
      if (picked.length >= 5) break;
    }
  }

  // Nach Griffbrett-Position (Offen → höhere Bünde) sortieren; kanonische Standard-Griffe in Lage 0/1 zuerst
  const posRank = (v) => {
    if (v.isCanonical && v.posFret === 0) return -2;
    if (v.isCanonical && v.posFret === 1) return -1;
    return v.posFret;
  };
  picked.sort((a, b) => {
    const ra = posRank(a);
    const rb = posRank(b);
    if (ra !== rb) return ra - rb;
    if (a.isCanonical !== b.isCanonical) return a.isCanonical ? -1 : 1;
    return b.score - a.score;
  });

  const finalized = picked.map((v, idx) => ({ ...v, idx }));

  _fb.voicingCache.set(cacheKey, finalized);
  return finalized;
}

function getFretboardVoicingShortLabel(v) {
  if (!v) return "";
  return v.posFret === 0
    ? tr("Offen", "Open")
    : tf("Bund {f}", "Fret {f}", { f: v.posFret });
}

/**
 * Berechnet die 5 CAGED-Lagen (Boxen) für beliebige Tonleitern, Grundtöne und Stimmungen.
 */
function computeScalePositions(rootPc, scaleDef, tuning) {
  const lowMidi = tuning.midis[0];
  const r0 = ((rootPc - (lowMidi % 12)) % 12 + 12) % 12; // Tiefster Grundton-Bund (0..11) auf der tiefsten Saite
  const isPent = scaleDef.intervals.length <= 6;
  const anchorOffsets = scaleDef.isMinor ? [0, 3, 5, 7, 10] : [0, 2, 4, 7, 9];

  const boxes = anchorOffsets.map((off, idx) => {
    const anchorFret = (r0 + off) % 12;
    let minFret;
    let maxFret;
    if (anchorFret === 0) {
      minFret = 0;
      maxFret = isPent ? 3 : 4;
    } else if (idx === 0 && isPent) {
      minFret = anchorFret;
      maxFret = Math.min(FB_MAX_FRET, anchorFret + 3);
    } else {
      minFret = Math.max(0, anchorFret - 1);
      maxFret = Math.min(FB_MAX_FRET, anchorFret + 3);
    }
    return {
      idx,
      minFret,
      maxFret,
      anchorFret
    };
  });

  return boxes;
}

function scrollFretboardToRange(minFret, maxFret) {
  const scroller = document.getElementById("fbNeckScroll");
  if (!scroller) return;
  const targetX = minFret <= 1 ? 0 : Math.max(0, (minFret - 2) * FB_FRET_PX);
  const behavior = typeof prefersReducedMotion === "function" && prefersReducedMotion() ? "auto" : "smooth";
  try {
    scroller.scrollTo({ left: targetX, behavior });
  } catch (e) {
    scroller.scrollLeft = targetX;
  }
  void maxFret;
}

async function playFretboardSingleNote(midi, stringIdx = null, fret = null) {
  await ensureAudioReady();
  const noteName = midiToNote(midi);
  audioEngine.playInstrumentSample("guitar", [noteName], 1.15, 0, 1.0 * FB_GUITAR_GAIN_BOOST);
  if (stringIdx !== null && fret !== null) {
    pulseFretboardPosition(stringIdx, fret, 360, 1050);
  }
}

async function playFretboardFrets(frets, stepMs = 30) {
  clearFretboardTimers();
  const tuning = getFretboardTuning();
  const sounding = fretsToSoundingNotes(frets, tuning.midis);
  if (sounding.length === 0) return;

  await ensureAudioReady();
  stopPlayback();

  const noteNames = sounding.map(n => midiToNote(n.midi));
  const durSec = stepMs > 80 ? 1.15 : 1.75;
  audioEngine.playInstrumentSample("guitar", noteNames, durSec, stepMs, 1.0 * FB_GUITAR_GAIN_BOOST);

  sounding.forEach((n, idx) => {
    const tid = setTimeout(() => {
      pulseFretboardPosition(n.stringIdx, n.fret, stepMs > 80 ? 320 : 520, stepMs > 80 ? 920 : 1280);
    }, idx * stepMs);
    _fb.timers.push(tid);
  });
}

async function playFretboardScaleRun() {
  clearFretboardTimers();
  const tuning = getFretboardTuning();
  const scale = getFretboardScaleDef(_fb.scaleId);
  const scaleSet = new Set(scale.intervals.map(i => (_fb.scaleRoot + i) % 12));

  let minF = 0;
  let maxF = FB_MAX_FRET;
  if (_fb.scalePosIdx >= 0 && _fb.scaleBoxes[_fb.scalePosIdx]) {
    minF = _fb.scaleBoxes[_fb.scalePosIdx].minFret;
    maxF = _fb.scaleBoxes[_fb.scalePosIdx].maxFret;
  } else {
    // Im Gesamt-Modus 1 Oktave sauber ab dem tiefsten Grundton (Bund 0–11) spielen
    const lowRoot = ((_fb.scaleRoot - (tuning.midis[0] % 12)) % 12 + 12) % 12;
    minF = Math.max(0, lowRoot - 1);
    maxF = Math.min(FB_MAX_FRET, lowRoot + 4);
  }

  // Alle Tonleiter-Positionen im aktiven Fenster sammeln (pro Tonhöhe das griffigste Bund/Saiten-Paar)
  const byMidi = new Map();
  for (let s = 0; s < 6; s++) {
    for (let f = minF; f <= maxF; f++) {
      const midi = tuning.midis[s] + f;
      const pc = ((midi % 12) + 12) % 12;
      if (!scaleSet.has(pc)) continue;
      if (!byMidi.has(midi)) {
        byMidi.set(midi, { midi, stringIdx: s, fret: f, pc });
      }
    }
  }

  const allSorted = [...byMidi.values()].sort((a, b) => a.midi - b.midi);
  if (allSorted.length === 0) return;

  // Ab dem ersten Grundton starten (falls vorhanden) für ein musikalisches Hörgefühl
  let startIdx = allSorted.findIndex(n => n.pc === _fb.scaleRoot);
  if (startIdx < 0) startIdx = 0;
  const asc = allSorted.slice(startIdx, startIdx + 15);
  const desc = asc.length > 2 ? asc.slice(0, -1).reverse() : [];
  const sequence = asc.concat(desc);

  await ensureAudioReady();
  stopPlayback();

  const stepMs = 195;
  const noteNames = sequence.map(n => midiToNote(n.midi));
  audioEngine.playInstrumentSample("guitar", noteNames, 0.52, stepMs, 0.98 * FB_GUITAR_GAIN_BOOST);

  sequence.forEach((n, idx) => {
    const tid = setTimeout(() => {
      pulseFretboardPosition(n.stringIdx, n.fret, 230, 500);
    }, idx * stepMs);
    _fb.timers.push(tid);
  });
}

async function playFretboardScaleCompanionChord() {
  const tuning = getFretboardTuning();
  const scale = getFretboardScaleDef(_fb.scaleId);
  const voicings = generateGuitarChordVoicings(_fb.scaleRoot, scale.companion || "maj", _fb.scaleRoot, tuning);
  if (voicings.length > 0) {
    await playFretboardFrets(voicings[0].frets, 32);
    return;
  }
  // Fallback: Grundton + Terz + Quinte spielen
  await ensureAudioReady();
  const base = 48 + _fb.scaleRoot;
  const q = getFretboardQualityDef(scale.companion || "maj");
  const notes = q.intervals.map(i => midiToNote(base + i));
  audioEngine.playInstrumentSample("guitar", notes, 1.6, 32, 1.0 * FB_GUITAR_GAIN_BOOST);
}

function loadFretboardChordVoicings(options = {}) {
  const tuning = getFretboardTuning();
  const bassPc = getFretboardActiveBassPc();
  _fb.voicings = generateGuitarChordVoicings(_fb.chordRoot, _fb.chordQuality, bassPc, tuning);
  _fb.voicingIdx = Math.max(0, Math.min(_fb.voicingIdx, Math.max(0, _fb.voicings.length - 1)));
  if (options.resetIndex !== false) _fb.voicingIdx = 0;
  _fb.isModified = false;
  if (_fb.voicings.length > 0) {
    _fb.workingFrets = _fb.voicings[_fb.voicingIdx].frets.slice();
  } else {
    _fb.workingFrets = [-1, -1, -1, -1, -1, -1];
  }
}

function getFretboardDisplayFrets() {
  return _fb.tab === "reverse" ? _fb.reverseFrets : _fb.workingFrets;
}

function getFretboardQualityLabel(q) {
  if (!q) return "";
  if (q.chordKey && typeof getLocalizedChordDef === "function") {
    const def = getLocalizedChordDef(q.chordKey);
    if (def?.label) return def.label;
    if (def?.short) return def.short;
  }
  return tr(q.de || q.btn, q.en || q.btnEn);
}

function renderFretboardTuningSelects() {
  const html = FB_TUNINGS.map(t => `<option value="${t.id}"${t.id === _fb.tuningId ? " selected" : ""}>${escapeHtml(tr(t.de, t.en))}</option>`).join("");
  ["fbTuningSelect", "fbReverseTuningSelect", "fbScaleTuningSelect"].forEach(id => {
    const sel = document.getElementById(id);
    if (sel) {
      sel.innerHTML = html;
      sel.value = _fb.tuningId;
    }
  });
}

function renderFretboardRootGrids() {
  const buildRootButtons = (activePc, attr) => {
    const pcs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return pcs.map(pc => {
      const preferFlat = [3, 8, 10].includes(pc);
      const label = formatFreeplayPitchClass(pc, preferFlat);
      return `<button type="button" class="fb-root-btn${pc === activePc ? " active" : ""}" ${attr}="${pc}">${escapeHtml(label)}</button>`;
    }).join("");
  };

  const chordRootHost = document.getElementById("fbChordRootGrid");
  if (chordRootHost) {
    chordRootHost.innerHTML = buildRootButtons(_fb.chordRoot, "data-fb-chord-root");
    chordRootHost.querySelectorAll("[data-fb-chord-root]").forEach(btn => {
      btn.addEventListener("click", () => {
        _fb.chordRoot = Number(btn.dataset.fbChordRoot);
        _fb.chordBass = "root";
        loadFretboardChordVoicings({ resetIndex: true });
        renderFretboardView({ autoScroll: true });
        if (_fb.voicings.length > 0) playFretboardFrets(_fb.workingFrets, 28);
      });
    });
  }

  const scaleRootHost = document.getElementById("fbScaleRootGrid");
  if (scaleRootHost) {
    scaleRootHost.innerHTML = buildRootButtons(_fb.scaleRoot, "data-fb-scale-root");
    scaleRootHost.querySelectorAll("[data-fb-scale-root]").forEach(btn => {
      btn.addEventListener("click", () => {
        _fb.scaleRoot = Number(btn.dataset.fbScaleRoot);
        renderFretboardView({ autoScroll: _fb.scalePosIdx >= 0 });
      });
    });
  }
}

function renderFretboardQualityGrid() {
  const host = document.getElementById("fbChordQualityGrid");
  if (!host) return;
  host.innerHTML = FB_CHORD_QUALITIES.map(q => {
    const lbl = q.id === "maj" ? tr(q.btn, q.btnEn) : q.btn;
    return `<button type="button" class="fb-quality-btn${q.id === _fb.chordQuality ? " active" : ""}" data-fb-quality="${q.id}">${escapeHtml(lbl)}</button>`;
  }).join("");

  host.querySelectorAll("[data-fb-quality]").forEach(btn => {
    btn.addEventListener("click", () => {
      _fb.chordQuality = btn.dataset.fbQuality;
      loadFretboardChordVoicings({ resetIndex: true });
      renderFretboardView({ autoScroll: true });
      if (_fb.voicings.length > 0) playFretboardFrets(_fb.workingFrets, 28);
    });
  });
}

function renderFretboardBassSelect() {
  const sel = document.getElementById("fbBassSelect");
  if (!sel) return;
  const q = getFretboardQualityDef(_fb.chordQuality);
  const preferFlat = getFreeplayPreferFlatForRoot(_fb.chordRoot, q.id);
  const rootName = formatFreeplayPitchClass(_fb.chordRoot, preferFlat);

  const opts = [];
  opts.push(`<option value="root"${_fb.chordBass === "root" ? " selected" : ""}>${escapeHtml(tf("{note} (Grundstellung)", "{note} (Root Position)", { note: rootName }))}</option>`);

  const chordTones = new Set([_fb.chordRoot]);
  q.intervals.forEach(off => {
    if (off === 0) return;
    const pc = (_fb.chordRoot + off) % 12;
    chordTones.add(pc);
    const noteName = formatFreeplayPitchClass(pc, preferFlat);
    const invIdx = Array.isArray(q.invOrder) ? q.invOrder.indexOf(off) : -1;
    const invKey = invIdx >= 1 && invIdx <= 3 ? `inv${invIdx}` : null;
    const invDef = invKey && typeof getLocalizedChordInversionDef === "function" ? getLocalizedChordInversionDef(invKey) : null;
    const role = getFreeplayDegreeRole(off, q.id);
    const desc = invDef?.short ? `${noteName} (${invDef.short})` : `${noteName} (${role})`;
    opts.push(`<option value="${pc}"${String(_fb.chordBass) === String(pc) ? " selected" : ""}>/${escapeHtml(desc)}</option>`);
  });

  for (let pc = 0; pc < 12; pc++) {
    if (chordTones.has(pc)) continue;
    const noteName = formatFreeplayPitchClass(pc, [1, 3, 8, 10].includes(pc));
    opts.push(`<option value="${pc}"${String(_fb.chordBass) === String(pc) ? " selected" : ""}>/${escapeHtml(noteName)} (${escapeHtml(tr("Slash-Bass", "Slash Bass"))})</option>`);
  }

  sel.innerHTML = opts.join("");
  sel.value = String(_fb.chordBass);
}

function renderFretboardScaleControls() {
  const typeHost = document.getElementById("fbScaleTypeGrid");
  if (typeHost) {
    typeHost.innerHTML = FB_SCALES.map(sc => {
      const name = tr(sc.de, sc.en);
      const formula = sc.degrees.join("–");
      return `
        <button type="button" class="fb-scale-btn${sc.id === _fb.scaleId ? " active" : ""}" data-fb-scale="${sc.id}">
          <span class="fb-scale-btn-name">${escapeHtml(name)}</span>
          <span class="fb-scale-btn-formula">${escapeHtml(formula)}</span>
        </button>
      `;
    }).join("");

    typeHost.querySelectorAll("[data-fb-scale]").forEach(btn => {
      btn.addEventListener("click", () => {
        _fb.scaleId = btn.dataset.fbScale;
        renderFretboardView({ autoScroll: _fb.scalePosIdx >= 0 });
      });
    });
  }

  const posHost = document.getElementById("fbScalePositionRow");
  if (posHost) {
    const allActive = _fb.scalePosIdx === -1;
    const pills = [
      `<button type="button" class="fb-scale-pos-btn${allActive ? " active" : ""}" data-fb-scale-pos="-1">${escapeHtml(tr("Alle Bünde (0–15)", "All Frets (0–15)"))}</button>`
    ];
    _fb.scaleBoxes.forEach((box, idx) => {
      const lbl = tf("Lage {n} ({a}–{b})", "Pos {n} ({a}–{b})", { n: idx + 1, a: box.minFret, b: box.maxFret });
      pills.push(`<button type="button" class="fb-scale-pos-btn${_fb.scalePosIdx === idx ? " active" : ""}" data-fb-scale-pos="${idx}">${escapeHtml(lbl)}</button>`);
    });
    posHost.innerHTML = pills.join("");

    posHost.querySelectorAll("[data-fb-scale-pos]").forEach(btn => {
      btn.addEventListener("click", () => {
        _fb.scalePosIdx = Number(btn.dataset.fbScalePos);
        renderFretboardView({ autoScroll: true });
      });
    });
  }
}

function renderFretboardVoicingPills() {
  const host = document.getElementById("fbVoicingPills");
  if (!host) return;
  if (_fb.tab !== "chords" || _fb.voicings.length === 0) {
    host.classList.add("hidden");
    host.innerHTML = "";
    return;
  }
  host.classList.remove("hidden");
  host.innerHTML = _fb.voicings.map((v, idx) => {
    const active = idx === _fb.voicingIdx && !_fb.isModified;
    const barreTag = v.fingering?.barre ? " ▮" : "";
    return `<button type="button" class="fb-voicing-pill${active ? " active" : ""}" data-fb-vidx="${idx}">${escapeHtml(`${idx + 1}. ${getFretboardVoicingShortLabel(v)}${barreTag}`)}</button>`;
  }).join("");

  host.querySelectorAll("[data-fb-vidx]").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.fbVidx);
      if (!Number.isFinite(idx) || !_fb.voicings[idx]) return;
      _fb.voicingIdx = idx;
      _fb.workingFrets = _fb.voicings[idx].frets.slice();
      _fb.isModified = false;
      renderFretboardView({ autoScroll: true });
      playFretboardFrets(_fb.workingFrets, 28);
    });
  });
}

function jumpFromRecognizedChordToPositions(rootPc, qualityId, bassPc) {
  const validQuality = FB_CHORD_QUALITIES.some(q => q.id === qualityId) ? qualityId : "maj";
  _fb.chordRoot = ((rootPc % 12) + 12) % 12;
  _fb.chordQuality = validQuality;
  _fb.chordBass = (bassPc !== undefined && bassPc !== null && bassPc !== _fb.chordRoot) ? (((bassPc % 12) + 12) % 12) : "root";
  _fb.tab = "chords";
  loadFretboardChordVoicings({ resetIndex: true });
  renderFretboardView({ autoScroll: true });
  if (_fb.voicings.length > 0) {
    playFretboardFrets(_fb.workingFrets, 28);
  }
}

function renderFretboardStage() {
  const typeBadge = document.getElementById("fbTypeBadge");
  const modBadge = document.getElementById("fbModifiedBadge");
  const titleEl = document.getElementById("fbMainTitle");
  const subEl = document.getElementById("fbSubInfo");
  const notesRow = document.getElementById("fbNotesRow");
  const altRow = document.getElementById("fbAltRow");
  const primaryBtn = document.getElementById("fbPrimaryPlayBtn");
  const primaryLbl = document.getElementById("fbPrimaryPlayLabel");
  const secondaryBtn = document.getElementById("fbSecondaryPlayBtn");
  const secondaryLbl = document.getElementById("fbSecondaryPlayLabel");
  const resetBtn = document.getElementById("fbResetOrClearBtn");
  const resetLbl = document.getElementById("fbResetOrClearLabel");
  const inspectBtn = document.getElementById("fbInspectPositionsBtn");

  const tuning = getFretboardTuning();

  if (_fb.tab === "scales") {
    const scale = getFretboardScaleDef(_fb.scaleId);
    const preferFlat = getFreeplayPreferFlatForRoot(_fb.scaleRoot, scale.isMinor ? "min" : "maj");
    const rootName = formatFreeplayPitchClass(_fb.scaleRoot, preferFlat);
    const scaleName = tr(scale.de, scale.en);
    const activeBox = _fb.scalePosIdx >= 0 ? _fb.scaleBoxes[_fb.scalePosIdx] : null;
    const posTxt = activeBox
      ? tf("Lage {n} (Bünde {a}–{b})", "Position {n} (Frets {a}–{b})", { n: _fb.scalePosIdx + 1, a: activeBox.minFret, b: activeBox.maxFret })
      : tr("Komplettes Griffbrett (Bünde 0–15)", "Full Fretboard (Frets 0–15)");

    if (typeBadge) {
      typeBadge.textContent = tr("Tonleiter", "Scale");
      typeBadge.className = "k-card-tag tag-sage";
    }
    modBadge?.classList.add("hidden");
    if (titleEl) titleEl.textContent = `${rootName} ${scaleName}`;
    if (subEl) subEl.textContent = `${scale.degrees.join(" – ")} • ${posTxt}`;
    altRow?.classList.add("hidden");
    inspectBtn?.classList.add("hidden");

    const baseMidi = 48 + _fb.scaleRoot;
    const scaleMidis = scale.intervals.map(off => baseMidi + off).concat([baseMidi + 12]);
    const scaleFlats = scale.degrees.map(deg => deg.includes("♭") ? true : (deg.includes("♯") ? false : preferFlat)).concat([preferFlat]);
    renderFreeplayMiniStaff(scaleMidis, _fb.scaleRoot, preferFlat, "fbStaffBox", {
      octaveShift: 12,
      forceTreble: true,
      spreadHorizontal: true,
      perNotePreferFlat: scaleFlats
    });

    if (notesRow) {
      notesRow.innerHTML = scale.intervals.map((off, idx) => {
        const pc = (_fb.scaleRoot + off) % 12;
        const deg = scale.degrees[idx] || "";
        const notePf = deg.includes("♭") ? true : (deg.includes("♯") ? false : preferFlat);
        const nLbl = formatFreeplayPitchClass(pc, notePf);
        const isRoot = off === 0;
        return `
          <button type="button" class="freeplay-note-pill${isRoot ? " is-root" : ""}" data-fb-pill-midi="${baseMidi + off}">
            <span>${escapeHtml(nLbl)}</span>
            <span class="freeplay-note-pill-role">${escapeHtml(deg)}</span>
          </button>
        `;
      }).join("");
      notesRow.querySelectorAll("[data-fb-pill-midi]").forEach(btn => {
        btn.addEventListener("click", () => playFretboardSingleNote(Number(btn.dataset.fbPillMidi)));
      });
    }

    if (primaryLbl) primaryLbl.textContent = tr("▶ Tonleiter spielen", "▶ Play Scale");
    if (secondaryLbl) secondaryLbl.textContent = tr("▶ Begleit-Akkord", "▶ Backing Chord");
    if (primaryBtn) primaryBtn.disabled = false;
    if (secondaryBtn) secondaryBtn.disabled = false;
    resetBtn?.classList.add("hidden");
    return;
  }

  // Akkord-Modus oder Umkehrsuche
  const frets = getFretboardDisplayFrets();
  const sounding = fretsToSoundingNotes(frets, tuning.midis);
  const midis = sounding.map(n => n.midi);
  const preferFlatChord = getFreeplayPreferFlatForRoot(_fb.chordRoot, _fb.chordQuality);

  if (primaryLbl) primaryLbl.textContent = tr("▶ Anschlagen", "▶ Strum");
  if (secondaryLbl) secondaryLbl.textContent = tr("↗ Zupfen", "↗ Pluck");
  if (primaryBtn) primaryBtn.disabled = midis.length === 0;
  if (secondaryBtn) secondaryBtn.disabled = midis.length < 2;

  if (_fb.tab === "chords" && !_fb.isModified) {
    modBadge?.classList.add("hidden");
    resetBtn?.classList.add("hidden");
    inspectBtn?.classList.add("hidden");
    altRow?.classList.add("hidden");

    const q = getFretboardQualityDef(_fb.chordQuality);
    const bassPc = getFretboardActiveBassPc();
    const rootName = formatFreeplayPitchClass(_fb.chordRoot, preferFlatChord);
    const bassName = formatFreeplayPitchClass(bassPc, preferFlatChord);
    const isRootPos = bassPc === _fb.chordRoot;
    const symbol = isRootPos ? `${rootName}${q.suffix}` : `${rootName}${q.suffix}/${bassName}`;
    const qLabel = getFretboardQualityLabel(q);

    if (typeBadge) {
      const isInversion = !isRootPos && q.intervals.includes(((bassPc - _fb.chordRoot) + 12) % 12);
      typeBadge.textContent = isRootPos ? tr("Akkord", "Chord") : (isInversion ? tr("Umkehrung", "Inversion") : tr("Slash-Akkord", "Slash Chord"));
      typeBadge.className = `k-card-tag ${isRootPos ? "tag-peach" : "tag-lilac"}`;
    }
    if (titleEl) titleEl.textContent = symbol;

    if (_fb.voicings.length === 0) {
      if (subEl) subEl.textContent = tr("Kein bequemer Griff in dieser Stimmung gefunden – tippe Töne frei an.", "No comfortable voicing found in this tuning — tap frets directly.");
    } else if (isRootPos) {
      const v = _fb.voicings[_fb.voicingIdx];
      const posInfo = getFretboardVoicingShortLabel(v);
      if (subEl) subEl.textContent = `${qLabel} • ${posInfo}`;
    } else {
      if (subEl) subEl.textContent = tf("{quality} über Bass {bass}", "{quality} over Bass {bass}", { quality: qLabel, bass: bassName });
    }

    renderFreeplayMiniStaff(midis, _fb.chordRoot, preferFlatChord, "fbStaffBox", { octaveShift: 12, forceTreble: true });

    if (notesRow) {
      if (sounding.length === 0) {
        notesRow.innerHTML = `<span class="freeplay-notes-placeholder">${escapeHtml(tr("Noch keine klingenden Saiten", "No sounding strings yet"))}</span>`;
      } else {
        notesRow.innerHTML = sounding.map((n, idx) => {
          const pc = ((n.midi % 12) + 12) % 12;
          const lbl = formatFreeplayMidiLabel(n.midi, preferFlatChord);
          const role = (idx === 0 && !isRootPos && !q.intervals.includes(((pc - _fb.chordRoot) + 12) % 12))
            ? "Bass"
            : getFreeplayDegreeRole(pc - _fb.chordRoot, q.id);
          const isRoot = pc === _fb.chordRoot;
          return `
            <button type="button" class="freeplay-note-pill${isRoot ? " is-root" : ""}" data-fb-pill-midi="${n.midi}" data-fb-pill-s="${n.stringIdx}" data-fb-pill-f="${n.fret}">
              <span>${escapeHtml(lbl)}</span>
              <span class="freeplay-note-pill-role">${escapeHtml(role)}</span>
            </button>
          `;
        }).join("");
        notesRow.querySelectorAll("[data-fb-pill-midi]").forEach(btn => {
          btn.addEventListener("click", () => {
            playFretboardSingleNote(Number(btn.dataset.fbPillMidi), Number(btn.dataset.fbPillS), Number(btn.dataset.fbPillF));
          });
        });
      }
    }
    return;
  }

  // Live-Erkennung für Umkehrsuche ODER bearbeiteten Akkord im Akkord-Tab
  const { primary, alternatives } = findAllFreeplayChordMatches(midis);
  _fb.lastReverseChord = (primary.kind === "chord" && primary.rootPc !== null)
    ? { rootPc: primary.rootPc, qualityId: primary.tplId || "maj", bassPc: primary.bassPc ?? primary.rootPc }
    : null;

  if (_fb.tab === "chords" && _fb.isModified) {
    modBadge?.classList.remove("hidden");
    resetBtn?.classList.remove("hidden");
    if (resetLbl) resetLbl.textContent = tr("↺ Original", "↺ Reset");
    inspectBtn?.classList.add("hidden");
  } else {
    modBadge?.classList.add("hidden");
    resetBtn?.classList.add("hidden");
    inspectBtn?.classList.toggle("hidden", !_fb.lastReverseChord);
  }

  if (midis.length === 0) {
    if (typeBadge) {
      typeBadge.textContent = tr("Umkehrsuche", "Reverse Finder");
      typeBadge.className = "k-card-tag tag-lilac";
    }
    if (titleEl) titleEl.textContent = tr("Tippe Bünde an", "Tap frets to identify");
    if (subEl) subEl.textContent = tr("Setze Finger auf das Griffbrett – hier erscheint live der erkannte Akkord.", "Place notes on the fretboard to identify the chord live.");
  } else {
    if (typeBadge) {
      typeBadge.textContent = primary.badge;
      typeBadge.className = `k-card-tag ${primary.badgeClass}`;
    }
    if (titleEl) titleEl.textContent = primary.title;
    if (subEl) subEl.textContent = primary.sub;
  }

  renderFreeplayMiniStaff(midis, primary.rootPc, primary.preferFlat, "fbStaffBox", { octaveShift: 12, forceTreble: true });

  if (notesRow) {
    if (primary.noteRoles.length === 0) {
      notesRow.innerHTML = `<span class="freeplay-notes-placeholder">${escapeHtml(tr("Noch keine Töne ausgewählt", "No notes selected yet"))}</span>`;
    } else {
      notesRow.innerHTML = primary.noteRoles.map(n => {
        const matchPos = sounding.find(sn => sn.midi === n.midi);
        const posAttrs = matchPos ? ` data-fb-pill-s="${matchPos.stringIdx}" data-fb-pill-f="${matchPos.fret}"` : "";
        return `
        <button type="button" class="freeplay-note-pill${n.isRoot ? " is-root" : ""}" data-fb-pill-midi="${n.midi}"${posAttrs}>
          <span>${escapeHtml(n.label)}</span>
          <span class="freeplay-note-pill-role">${escapeHtml(n.role)}</span>
        </button>
      `;
      }).join("");
      notesRow.querySelectorAll("[data-fb-pill-midi]").forEach(btn => {
        btn.addEventListener("click", () => {
          const s = btn.dataset.fbPillS !== undefined ? Number(btn.dataset.fbPillS) : null;
          const f = btn.dataset.fbPillF !== undefined ? Number(btn.dataset.fbPillF) : null;
          playFretboardSingleNote(Number(btn.dataset.fbPillMidi), s, f);
        });
      });
    }
  }

  if (altRow) {
    if (alternatives.length > 0) {
      altRow.classList.remove("hidden");
      altRow.innerHTML = `
        <span class="fb-alt-label">${escapeHtml(tr("Auch möglich:", "Also:"))}</span>
        ${alternatives.map((alt, i) => `
          <button type="button" class="fb-alt-chip" data-fb-alt-idx="${i}">${escapeHtml(alt.symbol)}</button>
        `).join("")}
      `;
      altRow.querySelectorAll("[data-fb-alt-idx]").forEach(btn => {
        btn.addEventListener("click", () => {
          const alt = alternatives[Number(btn.dataset.fbAltIdx)];
          if (alt) jumpFromRecognizedChordToPositions(alt.rootPc, alt.qualityId, alt.bassPc);
        });
      });
    } else {
      altRow.classList.add("hidden");
      altRow.innerHTML = "";
    }
  }
}

function handleFretboardCellTap(stringIdx, fret) {
  const tuning = getFretboardTuning();

  if (_fb.tab === "scales") {
    const midi = tuning.midis[stringIdx] + fret;
    playFretboardSingleNote(midi, stringIdx, fret);
    return;
  }

  if (_fb.tab === "reverse") {
    if (fret === 0) {
      _fb.reverseFrets[stringIdx] = _fb.reverseFrets[stringIdx] === 0 ? -1 : 0;
    } else {
      _fb.reverseFrets[stringIdx] = _fb.reverseFrets[stringIdx] === fret ? -1 : fret;
    }
    if (_fb.reverseFrets[stringIdx] >= 0) {
      playFretboardSingleNote(tuning.midis[stringIdx] + _fb.reverseFrets[stringIdx], stringIdx, _fb.reverseFrets[stringIdx]);
    }
    renderFretboardStage();
    renderFretboardNeck();
    return;
  }

  // Akkord-Modus: direktes Abwandeln auf dem Griffbrett!
  if (fret === 0) {
    if (_fb.workingFrets[stringIdx] === 0) {
      _fb.workingFrets[stringIdx] = -1;
    } else {
      _fb.workingFrets[stringIdx] = 0;
    }
  } else {
    if (_fb.workingFrets[stringIdx] === fret) {
      _fb.workingFrets[stringIdx] = 0; // Finger abheben → Leersaite
    } else {
      _fb.workingFrets[stringIdx] = fret;
    }
  }

  const orig = _fb.voicings[_fb.voicingIdx]?.frets;
  _fb.isModified = !orig || orig.some((v, idx) => v !== _fb.workingFrets[idx]);

  if (_fb.workingFrets[stringIdx] >= 0) {
    playFretboardSingleNote(tuning.midis[stringIdx] + _fb.workingFrets[stringIdx], stringIdx, _fb.workingFrets[stringIdx]);
  }
  renderFretboardStage();
  renderFretboardNeck();
  renderFretboardVoicingPills();
}

function renderFretboardNeck() {
  const host = document.getElementById("fbNeckHost");
  if (!host) return;

  const tuning = getFretboardTuning();
  const isScaleMode = _fb.tab === "scales";
  const frets = getFretboardDisplayFrets();
  const sounding = fretsToSoundingNotes(frets, tuning.midis);
  const midis = sounding.map(n => n.midi);

  // Kontext für Farben & Beschriftungen bestimmen
  let rootPc = _fb.chordRoot;
  let preferFlat = false;
  let tplId = _fb.chordQuality;
  let fingering = null;
  let boxMin = -1;
  let boxMax = -1;
  let scaleDef = null;
  let scaleIntervalMap = null;
  let scaleCharSet = null;

  if (isScaleMode) {
    scaleDef = getFretboardScaleDef(_fb.scaleId);
    rootPc = _fb.scaleRoot;
    preferFlat = getFreeplayPreferFlatForRoot(rootPc, scaleDef.isMinor ? "min" : "maj");
    scaleIntervalMap = new Map();
    scaleDef.intervals.forEach((off, idx) => {
      scaleIntervalMap.set((rootPc + off) % 12, { off, deg: scaleDef.degrees[idx] || "" });
    });
    scaleCharSet = new Set(scaleDef.charOffsets || []);
    if (_fb.scalePosIdx >= 0 && _fb.scaleBoxes[_fb.scalePosIdx]) {
      boxMin = _fb.scaleBoxes[_fb.scalePosIdx].minFret;
      boxMax = _fb.scaleBoxes[_fb.scalePosIdx].maxFret;
    }
  } else if (_fb.tab === "chords" && !_fb.isModified) {
    rootPc = _fb.chordRoot;
    tplId = _fb.chordQuality;
    preferFlat = getFreeplayPreferFlatForRoot(rootPc, tplId);
    fingering = _fb.voicings[_fb.voicingIdx]?.fingering || computeGuitarFingering(frets);
    if (fingering.maxFret > 0) {
      boxMin = fingering.minFret;
      boxMax = fingering.maxFret;
    }
  } else {
    const analysis = analyzeFreeplayMidis(midis);
    rootPc = analysis.rootPc;
    preferFlat = analysis.preferFlat;
    tplId = analysis.tplId || "";
    fingering = computeGuitarFingering(frets);
  }

  // Toolbar-Elemente je nach Modus umschalten
  const voicingNav = document.getElementById("fbVoicingNav");
  const reverseBar = document.getElementById("fbReverseQuickBar");
  const scalePosBadge = document.getElementById("fbScalePosBadge");
  const thirdLabelBtn = document.getElementById("fbThirdLabelModeBtn");
  const posCounter = document.getElementById("fbPosCounter");
  const prevBtn = document.getElementById("fbPosPrevBtn");
  const nextBtn = document.getElementById("fbPosNextBtn");
  const hintEl = document.getElementById("fbNeckHint");
  const readoutEl = document.getElementById("fbFretReadout");

  voicingNav?.classList.toggle("hidden", _fb.tab !== "chords");
  reverseBar?.classList.toggle("hidden", _fb.tab !== "reverse");
  scalePosBadge?.classList.toggle("hidden", !isScaleMode);
  thirdLabelBtn?.classList.toggle("hidden", isScaleMode);

  if (isScaleMode && _fb.labelMode === "fingers") {
    _fb.labelMode = "notes";
  }
  document.querySelectorAll("#viewFretboard [data-fb-label-mode]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.fbLabelMode === _fb.labelMode);
  });

  if (_fb.tab === "chords") {
    const total = _fb.voicings.length;
    if (posCounter) {
      posCounter.textContent = total > 0
        ? tf("Lage {cur} / {tot}", "Pos {cur} / {tot}", { cur: _fb.voicingIdx + 1, tot: total })
        : tr("Keine Lage", "No position");
    }
    if (prevBtn) prevBtn.disabled = total <= 1;
    if (nextBtn) nextBtn.disabled = total <= 1;
    if (hintEl) hintEl.textContent = tr("Tippe auf Bünde, Leersaiten (◯) oder ✕ zum Abwandeln.", "Tap frets, open strings (◯), or ✕ to modify the chord.");
    if (readoutEl) {
      readoutEl.classList.remove("hidden");
      readoutEl.textContent = formatFretReadout(frets);
    }
  } else if (_fb.tab === "reverse") {
    if (hintEl) hintEl.textContent = tr("Tippe Bünde an – erneutes Tippen entfernt den Ton.", "Tap frets to place notes — tap again to remove.");
    if (readoutEl) {
      readoutEl.classList.remove("hidden");
      readoutEl.textContent = formatFretReadout(frets);
    }
  } else {
    const activeBox = _fb.scalePosIdx >= 0 ? _fb.scaleBoxes[_fb.scalePosIdx] : null;
    if (scalePosBadge) {
      scalePosBadge.textContent = activeBox
        ? tf("Lage {n}: Bünde {a}–{b}", "Pos {n}: Frets {a}–{b}", { n: _fb.scalePosIdx + 1, a: activeBox.minFret, b: activeBox.maxFret })
        : tr("Alle Bünde 0–15", "All Frets 0–15");
    }
    if (hintEl) hintEl.textContent = tr("Tippe auf beliebige Punkte, um die Töne anzuhören. Wische quer für Bünde 0–15.", "Tap any dot to hear its pitch. Swipe horizontally for frets 0–15.");
    readoutEl?.classList.add("hidden");
  }

  // Inlay-Layer (Bund 1..15)
  const inlaysHtml = [];
  for (let f = 1; f <= FB_MAX_FRET; f++) {
    let dots = "";
    if (f === 12) {
      dots = `<span class="fb-inlay-dot is-top"></span><span class="fb-inlay-dot is-bot"></span>`;
    } else if (FB_INLAY_FRETS.has(f)) {
      dots = `<span class="fb-inlay-dot is-mid"></span>`;
    }
    inlaysHtml.push(`<div class="fb-inlay-col">${dots}</div>`);
  }

  // Barré-Layer (nur im Akkord-/Umkehr-Modus, wenn ein sauberer Barré vorliegt)
  let barreHtml = "";
  if (!isScaleMode && fingering?.barre && fingering.playable) {
    const b = fingering.barre;
    const leftPx = (b.fret - 1) * FB_FRET_PX + FB_FRET_PX / 2;
    const topRow = 5 - b.toString;
    const botRow = 5 - b.fromString;
    const topPx = topRow * 34 + 6;
    const heightPx = (botRow - topRow) * 34 + 22;
    barreHtml = `<div class="fb-barre-bar" style="left:${leftPx}px;top:${topPx}px;height:${heightPx}px"></div>`;
  }

  // 6 Saiten-Reihen von hoher e1-Saite (Index 5) oben bis tiefer E6-Saite (Index 0) unten
  const rowsHtml = [];
  for (let s = 5; s >= 0; s--) {
    const openMidi = tuning.midis[s];
    const openPc = ((openMidi % 12) + 12) % 12;
    const openNameRaw = formatFreeplayPitchClass(openPc, [1, 3, 8, 10].includes(openPc));
    const stringLabel = s === 5 ? openNameRaw.toLowerCase() : openNameRaw;
    const activeFret = isScaleMode ? null : frets[s];
    const isMutedRow = !isScaleMode && activeFret < 0;

    // Sattel-Button (Bund 0 / Leersaite / Gedämpft)
    let nutClass = "fb-nut-btn";
    let nutText = "";
    if (isScaleMode) {
      const info = scaleIntervalMap.get(openPc);
      if (info) {
        const inBox = boxMin < 0 || (0 >= boxMin && 0 <= boxMax);
        const isRoot = info.off === 0;
        const isChar = scaleCharSet.has(info.off);
        const notePf = info.deg.includes("♭") ? true : (info.deg.includes("♯") ? false : preferFlat);
        nutClass += isRoot ? " is-root" : (isChar ? " is-char" : " is-tone");
        if (!inBox) nutClass += " is-dimmed";
        nutText = _fb.labelMode === "intervals"
          ? info.deg
          : formatFreeplayPitchClass(openPc, notePf);
      } else {
        nutClass += " is-muted";
        nutText = "·";
      }
    } else if (activeFret === 0) {
      const isRoot = rootPc !== null && openPc === rootPc;
      nutClass += isRoot ? " is-root" : " is-open-ring";
      if (_fb.labelMode === "notes") {
        nutText = formatFreeplayPitchClass(openPc, preferFlat);
      } else if (_fb.labelMode === "intervals" && rootPc !== null) {
        nutText = getFreeplayDegreeRole(openPc - rootPc, tplId);
      } else {
        nutText = "◯";
      }
    } else if (activeFret < 0) {
      nutClass += " is-muted";
      nutText = "✕";
    } else {
      // Saite ist weiter oben gegriffen → Sattel zeigt dezenten Punkt (Tippen öffnet Leersaite)
      nutClass += " is-muted";
      nutText = "·";
    }

    const cellsHtml = [];
    for (let f = 1; f <= FB_MAX_FRET; f++) {
      const midi = openMidi + f;
      const pc = ((midi % 12) + 12) % 12;
      const inBoxHighlight = boxMin >= 0 && f >= boxMin && f <= boxMax;
      let dotHtml = "";

      if (isScaleMode) {
        const info = scaleIntervalMap.get(pc);
        if (info) {
          const isRoot = info.off === 0;
          const isChar = scaleCharSet.has(info.off);
          const inBox = boxMin < 0 || (f >= boxMin && f <= boxMax);
          const notePf = info.deg.includes("♭") ? true : (info.deg.includes("♯") ? false : preferFlat);
          const dotClass = `fb-dot ${isRoot ? "is-root" : (isChar ? "is-char" : "is-tone")}${inBox ? "" : " is-dimmed"}`;
          const dotLabel = _fb.labelMode === "intervals"
            ? info.deg
            : formatFreeplayPitchClass(pc, notePf);
          dotHtml = `<span class="${dotClass}">${escapeHtml(dotLabel)}</span>`;
        }
      } else if (activeFret === f) {
        const isRoot = rootPc !== null && pc === rootPc;
        const dotClass = `fb-dot ${isRoot ? "is-root" : "is-tone"}`;
        let dotLabel = formatFreeplayPitchClass(pc, preferFlat);
        if (_fb.labelMode === "intervals" && rootPc !== null) {
          dotLabel = getFreeplayDegreeRole(pc - rootPc, tplId);
        } else if (_fb.labelMode === "fingers") {
          const fNum = fingering?.fingers?.[s] || 0;
          dotLabel = fNum > 0 ? String(fNum) : "•";
        }
        dotHtml = `<span class="${dotClass}">${escapeHtml(dotLabel)}</span>`;
      }

      cellsHtml.push(
        `<button type="button" class="fb-fret-cell${inBoxHighlight ? " is-in-box" : ""}" data-fb-s="${s}" data-fb-f="${f}" aria-label="${escapeHtml(`${stringLabel} ${f}`)}">${dotHtml}</button>`
      );
    }

    rowsHtml.push(`
      <div class="fb-string-row${isMutedRow ? " is-muted" : ""}" data-string-idx="${s}">
        <div class="fb-string-wire" aria-hidden="true"></div>
        <div class="fb-nut-cell">
          <span class="fb-string-name">${escapeHtml(stringLabel)}</span>
          <button type="button" class="${nutClass}" data-fb-s="${s}" data-fb-f="0" aria-label="${escapeHtml(`${stringLabel} 0`)}">${escapeHtml(nutText)}</button>
        </div>
        ${cellsHtml.join("")}
      </div>
    `);
  }

  // Bund-Nummern 0..15 unten
  const numsHtml = [`<div class="fb-fret-num-nut">0</div>`];
  for (let f = 1; f <= FB_MAX_FRET; f++) {
    const isMarker = FB_INLAY_FRETS.has(f);
    const isBoxNum = boxMin >= 0 && f >= boxMin && f <= boxMax;
    numsHtml.push(`<div class="fb-fret-num${isMarker ? " is-marker" : ""}${isBoxNum ? " is-active-box" : ""}">${f}</div>`);
  }

  host.innerHTML = `
    <div class="fb-board">
      <div class="fb-strings-area">
        <div class="fb-inlay-layer" aria-hidden="true">${inlaysHtml.join("")}</div>
        <div class="fb-barre-layer" aria-hidden="true">${barreHtml}</div>
        ${rowsHtml.join("")}
      </div>
      <div class="fb-fret-nums-row" aria-hidden="true">${numsHtml.join("")}</div>
    </div>
  `;

  host.querySelectorAll("[data-fb-s][data-fb-f]").forEach(btn => {
    btn.addEventListener("click", () => {
      const s = Number(btn.dataset.fbS);
      const f = Number(btn.dataset.fbF);
      if (Number.isFinite(s) && Number.isFinite(f)) {
        handleFretboardCellTap(s, f);
      }
    });
  });
}

function renderFretboardView(options = {}) {
  const tuning = getFretboardTuning();

  // Tab-Buttons & Parameter-Karten synchronisieren
  document.querySelectorAll("#viewFretboard [data-fb-tab]").forEach(btn => {
    const active = btn.dataset.fbTab === _fb.tab;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
  document.getElementById("fbChordParamsCard")?.classList.toggle("hidden", _fb.tab !== "chords");
  document.getElementById("fbReverseParamsCard")?.classList.toggle("hidden", _fb.tab !== "reverse");
  document.getElementById("fbScaleParamsCard")?.classList.toggle("hidden", _fb.tab !== "scales");

  // Voicings & Scale-Boxen aktuell halten
  if (_fb.tab === "chords" && _fb.voicings.length === 0 && !_fb.isModified) {
    loadFretboardChordVoicings({ resetIndex: true });
  }
  const scale = getFretboardScaleDef(_fb.scaleId);
  _fb.scaleBoxes = computeScalePositions(_fb.scaleRoot, scale, tuning);

  renderFretboardTuningSelects();
  renderFretboardRootGrids();
  renderFretboardQualityGrid();
  renderFretboardBassSelect();
  renderFretboardScaleControls();
  renderFretboardStage();
  renderFretboardNeck();
  renderFretboardVoicingPills();

  if (options.autoScroll) {
    if (_fb.tab === "scales") {
      const box = _fb.scalePosIdx >= 0 ? _fb.scaleBoxes[_fb.scalePosIdx] : null;
      scrollFretboardToRange(box ? box.minFret : 0, box ? box.maxFret : 15);
    } else if (_fb.tab === "chords" && _fb.voicings[_fb.voicingIdx]) {
      const v = _fb.voicings[_fb.voicingIdx];
      scrollFretboardToRange(v.posFret, v.fingering.maxFret);
    }
  }
}

function initFretboardEventListeners() {
  if (_fb.bound) return;
  _fb.bound = true;

  // 3-Wege Tab-Leiste
  document.querySelectorAll("#viewFretboard [data-fb-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      const nextTab = btn.dataset.fbTab;
      if (!["chords", "reverse", "scales"].includes(nextTab)) return;
      clearFretboardTimers();
      _fb.tab = nextTab;
      renderFretboardView({ autoScroll: nextTab !== "reverse" });
    });
  });

  // Beschriftungs-Modus (Noten / Stufen / Finger)
  document.querySelectorAll("#viewFretboard [data-fb-label-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.fbLabelMode;
      if (!["notes", "intervals", "fingers"].includes(mode)) return;
      _fb.labelMode = mode;
      renderFretboardNeck();
    });
  });

  // Lagen-Navigation im Akkord-Modus
  document.getElementById("fbPosPrevBtn")?.addEventListener("click", () => {
    if (_fb.voicings.length <= 1) return;
    _fb.voicingIdx = (_fb.voicingIdx - 1 + _fb.voicings.length) % _fb.voicings.length;
    _fb.workingFrets = _fb.voicings[_fb.voicingIdx].frets.slice();
    _fb.isModified = false;
    renderFretboardView({ autoScroll: true });
    playFretboardFrets(_fb.workingFrets, 28);
  });

  document.getElementById("fbPosNextBtn")?.addEventListener("click", () => {
    if (_fb.voicings.length <= 1) return;
    _fb.voicingIdx = (_fb.voicingIdx + 1) % _fb.voicings.length;
    _fb.workingFrets = _fb.voicings[_fb.voicingIdx].frets.slice();
    _fb.isModified = false;
    renderFretboardView({ autoScroll: true });
    playFretboardFrets(_fb.workingFrets, 28);
  });

  // Bühnen-Aktionsbuttons
  document.getElementById("fbPrimaryPlayBtn")?.addEventListener("click", () => {
    if (_fb.tab === "scales") {
      playFretboardScaleRun();
    } else {
      playFretboardFrets(getFretboardDisplayFrets(), 28);
    }
  });

  document.getElementById("fbSecondaryPlayBtn")?.addEventListener("click", () => {
    if (_fb.tab === "scales") {
      playFretboardScaleCompanionChord();
    } else {
      playFretboardFrets(getFretboardDisplayFrets(), 155);
    }
  });

  document.getElementById("fbResetOrClearBtn")?.addEventListener("click", () => {
    clearFretboardTimers();
    if (_fb.tab === "chords" && _fb.isModified) {
      if (_fb.voicings[_fb.voicingIdx]) {
        _fb.workingFrets = _fb.voicings[_fb.voicingIdx].frets.slice();
      }
      _fb.isModified = false;
      renderFretboardView({ autoScroll: false });
    } else if (_fb.tab === "reverse") {
      _fb.reverseFrets = [-1, -1, -1, -1, -1, -1];
      renderFretboardStage();
      renderFretboardNeck();
    }
  });

  // Umkehrsuche Schnell-Buttons
  document.getElementById("fbOpenAllBtn")?.addEventListener("click", () => {
    _fb.reverseFrets = [0, 0, 0, 0, 0, 0];
    renderFretboardStage();
    renderFretboardNeck();
    playFretboardFrets(_fb.reverseFrets, 30);
  });

  document.getElementById("fbClearAllBtn")?.addEventListener("click", () => {
    clearFretboardTimers();
    _fb.reverseFrets = [-1, -1, -1, -1, -1, -1];
    renderFretboardStage();
    renderFretboardNeck();
  });

  document.getElementById("fbInspectPositionsBtn")?.addEventListener("click", () => {
    if (!_fb.lastReverseChord) return;
    jumpFromRecognizedChordToPositions(
      _fb.lastReverseChord.rootPc,
      _fb.lastReverseChord.qualityId,
      _fb.lastReverseChord.bassPc
    );
  });

  // Stimmungs-Auswahl (synchron in allen 3 Tabs)
  ["fbTuningSelect", "fbReverseTuningSelect", "fbScaleTuningSelect"].forEach(id => {
    document.getElementById(id)?.addEventListener("change", (e) => {
      _fb.tuningId = e.target.value;
      _fb.voicingCache.clear();
      loadFretboardChordVoicings({ resetIndex: true });
      renderFretboardView({ autoScroll: _fb.tab !== "reverse" });
    });
  });

  // Basston-Auswahl (Umkehrung / Slash-Akkord)
  document.getElementById("fbBassSelect")?.addEventListener("change", (e) => {
    _fb.chordBass = e.target.value === "root" ? "root" : Number(e.target.value);
    loadFretboardChordVoicings({ resetIndex: true });
    renderFretboardView({ autoScroll: true });
    if (_fb.voicings.length > 0) playFretboardFrets(_fb.workingFrets, 28);
  });

  // Direkt weiterüben
  document.querySelectorAll("#viewFretboard [data-fb-jump]").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.fbJump;
      stopFretboardSession();
      if (cat) openCategoryPage(cat);
    });
  });
}

function stopFretboardSession() {
  clearFretboardTimers();
  stopPlayback();
}

function openFretboardView(returnView = "tools") {
  state.fretboardReturnView = returnView;
  loadFretboardChordVoicings({ resetIndex: false });
  // Gitarren-Samples vorab laden (auf iOS werden inaktive Instrumente nicht im Hintergrund decodiert)
  audioEngine?.prefetchStem?.("guitar");
  switchView("fretboard");
}

