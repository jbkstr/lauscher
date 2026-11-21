// =====================================================
// WERKZEUG: FREIES SPIEL / KLANG-LABOR (#viewFreeplay)
// =====================================================
const FREEPLAY_WHITE_OFFSETS = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16]; // C bis E (+1 Oktave + gr. Terz)
const FREEPLAY_BLACK_SPECS = [
  { offset: 1,  afterWhite: 0 },
  { offset: 3,  afterWhite: 1 },
  { offset: 6,  afterWhite: 3 },
  { offset: 8,  afterWhite: 4 },
  { offset: 10, afterWhite: 5 },
  { offset: 13, afterWhite: 7 },
  { offset: 15, afterWhite: 8 }
];
const FREEPLAY_PC_KEY_MAP = {
  KeyA: 0, KeyW: 1, KeyS: 2, KeyE: 3, KeyD: 4, KeyF: 5, KeyT: 6,
  KeyG: 7, KeyY: 8, KeyH: 9, KeyU: 10, KeyJ: 11,
  KeyK: 12, KeyO: 13, KeyL: 14, KeyP: 15, Semicolon: 16
};
const FREEPLAY_INSTRUMENT_KEYS = ["piano", "guitar", "strings", "brass", "voice", "bass"];
const FREEPLAY_DEFAULT_MIX_LEVELS = {
  piano: 0.90,
  guitar: 0.85,
  strings: 0.75,
  brass: 0.65,
  voice: 0.75,
  bass: 0.85
};
const FREEPLAY_MIX_PRESETS = {
  piano:     { piano: 0.90, guitar: 0.00, strings: 0.00, brass: 0.00, voice: 0.00, bass: 0.00 },
  duo:       { piano: 0.90, guitar: 0.85, strings: 0.00, brass: 0.00, voice: 0.00, bass: 0.00 },
  ensemble:  { piano: 0.85, guitar: 0.70, strings: 0.45, brass: 0.00, voice: 0.00, bass: 0.80 },
  orchestra: { piano: 0.35, guitar: 0.00, strings: 0.85, brass: 0.65, voice: 0.00, bass: 0.85 }
};
const FREEPLAY_CHORD_PADS = [
  { id: "pad-c",     rootPc: 0,  suffix: "",     qualityKey: "maj",  offsets: [0, 4, 7] },
  { id: "pad-dm",    rootPc: 2,  suffix: "m",    qualityKey: "min",  offsets: [2, 5, 9] },
  { id: "pad-em",    rootPc: 4,  suffix: "m",    qualityKey: "min",  offsets: [4, 7, 11] },
  { id: "pad-f",     rootPc: 5,  suffix: "",     qualityKey: "maj",  offsets: [5, 9, 12] },
  { id: "pad-g",     rootPc: 7,  suffix: "",     qualityKey: "maj",  offsets: [7, 11, 14] },
  { id: "pad-am",    rootPc: 9,  suffix: "m",    qualityKey: "min",  offsets: [9, 12, 16] },
  { id: "pad-cmaj7", rootPc: 0,  suffix: "maj7", qualityKey: "maj7", offsets: [0, 4, 7, 11] },
  { id: "pad-c-e",   rootPc: 0,  suffix: "",     bassPc: 4, qualityKey: "maj", offsets: [4, 7, 12] }
];
const FREEPLAY_CHORD_TEMPLATES = [
  // 3-Ton-Akkorde
  { id: "maj",     suffix: "",        chordKey: "maj",   intervals: [0, 4, 7],         score: 100, invOrder: [0, 4, 7] },
  { id: "min",     suffix: "m",       chordKey: "min",   intervals: [0, 3, 7],         score: 100, invOrder: [0, 3, 7] },
  { id: "dim",     suffix: "°",       chordKey: "dim",   intervals: [0, 3, 6],         score: 95,  invOrder: [0, 3, 6] },
  { id: "aug",     suffix: "+",       chordKey: "aug",   intervals: [0, 4, 8],         score: 90,  invOrder: [0, 4, 8] },
  { id: "sus4",    suffix: "sus4",    chordKey: "sus4",  intervals: [0, 5, 7],         score: 92,  invOrder: [0, 5, 7] },
  { id: "sus2",    suffix: "sus2",    chordKey: "sus2",  intervals: [0, 2, 7],         score: 92,  invOrder: [0, 2, 7] },
  { id: "7no5",    suffix: "7",       chordKey: "7",     intervals: [0, 4, 10],        score: 74,  invOrder: [0, 4, 10] },
  { id: "maj7no5", suffix: "maj7",    chordKey: "maj7",  intervals: [0, 4, 11],        score: 72,  invOrder: [0, 4, 11] },
  { id: "m7no5",   suffix: "m7",      chordKey: "m7",    intervals: [0, 3, 10],        score: 72,  invOrder: [0, 3, 10] },
  // 4-Ton-Akkorde
  { id: "maj7",    suffix: "maj7",    chordKey: "maj7",  intervals: [0, 4, 7, 11],     score: 100, invOrder: [0, 4, 7, 11] },
  { id: "7",       suffix: "7",       chordKey: "7",     intervals: [0, 4, 7, 10],     score: 100, invOrder: [0, 4, 7, 10] },
  { id: "m7",      suffix: "m7",      chordKey: "m7",    intervals: [0, 3, 7, 10],     score: 100, invOrder: [0, 3, 7, 10] },
  { id: "m7b5",    suffix: "m7♭5",    chordKey: "m7b5",  intervals: [0, 3, 6, 10],     score: 96,  invOrder: [0, 3, 6, 10] },
  { id: "dim7",    suffix: "°7",      chordKey: "dim7",  intervals: [0, 3, 6, 9],      score: 95,  invOrder: [0, 3, 6, 9] },
  { id: "mMaj7",   suffix: "m(maj7)", chordKey: "mMaj7", intervals: [0, 3, 7, 11],     score: 95,  invOrder: [0, 3, 7, 11] },
  { id: "6",       suffix: "6",       de: "Dur-Sextakkord (1–3–5–6)",   en: "Major 6th (1–3–5–6)",   intervals: [0, 4, 7, 9],  score: 94, invOrder: [0, 4, 7, 9] },
  { id: "m6",      suffix: "m6",      de: "Moll-Sextakkord (1–♭3–5–6)", en: "Minor 6th (1–♭3–5–6)",  intervals: [0, 3, 7, 9],  score: 93, invOrder: [0, 3, 7, 9] },
  { id: "add9",    suffix: "add9",    de: "Dur add9 (1–3–5–9)",         en: "Major add9 (1–3–5–9)",  intervals: [0, 2, 4, 7],  score: 94, invOrder: [0, 4, 7, 2] },
  { id: "madd9",   suffix: "m(add9)", de: "Moll add9 (1–♭3–5–9)",       en: "Minor add9 (1–♭3–5–9)", intervals: [0, 2, 3, 7],  score: 93, invOrder: [0, 3, 7, 2] },
  { id: "7sus4",   suffix: "7sus4",   de: "7sus4 (1–4–5–♭7)",           en: "7sus4 (1–4–5–♭7)",      intervals: [0, 5, 7, 10], score: 92, invOrder: [0, 5, 7, 10] },
  { id: "maj7s5",  suffix: "maj7♯5",  de: "Major-7♯5 (1–3–♯5–7)",       en: "Major 7♯5 (1–3–♯5–7)",  intervals: [0, 4, 8, 11], score: 86, invOrder: [0, 4, 8, 11] },
  { id: "7s5",     suffix: "7♯5",     de: "Dominant-7♯5 (1–3–♯5–♭7)",   en: "Dominant 7♯5 (1–3–♯5–♭7)", intervals: [0, 4, 8, 10], score: 86, invOrder: [0, 4, 8, 10] },
  { id: "9no5",    suffix: "9",       de: "Dominant-9 (1–3–5–♭7–9)",    en: "Dominant 9th (1–3–5–♭7–9)", intervals: [0, 2, 4, 10], score: 78, invOrder: [0, 4, 10, 2] },
  { id: "maj9no5", suffix: "maj9",    chordKey: "maj9",  intervals: [0, 2, 4, 11],     score: 77,  invOrder: [0, 4, 11, 2] },
  { id: "m9no5",   suffix: "m9",      de: "Moll-9 (1–♭3–5–♭7–9)",       en: "Minor 9th (1–♭3–5–♭7–9)", intervals: [0, 2, 3, 10], score: 77, invOrder: [0, 3, 10, 2] },
  { id: "7b9no5",  suffix: "7♭9",     chordKey: "7b9",   intervals: [0, 1, 4, 10],     score: 76,  invOrder: [0, 4, 10, 1] },
  { id: "7s9no5",  suffix: "7♯9",     chordKey: "7s9",   intervals: [0, 3, 4, 10],     score: 76,  invOrder: [0, 4, 10, 3] },
  { id: "69no5",   suffix: "6/9",     de: "Dur 6/9 (1–3–5–6–9)",        en: "Major 6/9 (1–3–5–6–9)",   intervals: [0, 2, 4, 9],  score: 75, invOrder: [0, 4, 9, 2] },
  { id: "13no5",   suffix: "13",      de: "Dominant-13 (1–3–♭7–13)",    en: "Dominant 13th (1–3–♭7–13)", intervals: [0, 4, 9, 10], score: 75, invOrder: [0, 4, 10, 9] },
  // 5-Ton-Akkorde
  { id: "maj9",    suffix: "maj9",    chordKey: "maj9",  intervals: [0, 2, 4, 7, 11],  score: 100, invOrder: [0, 4, 7, 11] },
  { id: "9",       suffix: "9",       de: "Dominant-9 (1–3–5–♭7–9)",    en: "Dominant 9th (1–3–5–♭7–9)", intervals: [0, 2, 4, 7, 10], score: 100, invOrder: [0, 4, 7, 10] },
  { id: "m9",      suffix: "m9",      de: "Moll-9 (1–♭3–5–♭7–9)",       en: "Minor 9th (1–♭3–5–♭7–9)",   intervals: [0, 2, 3, 7, 10], score: 100, invOrder: [0, 3, 7, 10] },
  { id: "7b9",     suffix: "7♭9",     chordKey: "7b9",   intervals: [0, 1, 4, 7, 10],  score: 96,  invOrder: [0, 4, 7, 10] },
  { id: "7s9",     suffix: "7♯9",     chordKey: "7s9",   intervals: [0, 3, 4, 7, 10],  score: 96,  invOrder: [0, 4, 7, 10] },
  { id: "69",      suffix: "6/9",     de: "Dur 6/9 (1–3–5–6–9)",        en: "Major 6/9 (1–3–5–6–9)",     intervals: [0, 2, 4, 7, 9],  score: 95, invOrder: [0, 4, 7, 9] },
  { id: "9sus4",   suffix: "9sus4",   de: "9sus4 (1–4–5–♭7–9)",         en: "9sus4 (1–4–5–♭7–9)",        intervals: [0, 2, 5, 7, 10], score: 92, invOrder: [0, 5, 7, 10] }
];
const FREEPLAY_SEMITONE_TO_INTERVAL_KEY = {
  0: "P1", 1: "m2", 2: "M2", 3: "m3", 4: "M3", 5: "P4", 6: "TT",
  7: "P5", 8: "m6", 9: "M6", 10: "m7", 11: "M7", 12: "P8", 13: "m9", 14: "M9"
};

const _freeplay = {
  mode: "live", // "live" | "hold"
  baseOctave: 4,
  showLabels: true,
  latchedMidis: [],
  pressedMidis: new Set(),
  recentMidis: [],
  lastTapWallMs: 0,
  activePadId: null,
  lastNonZeroMix: { ...FREEPLAY_DEFAULT_MIX_LEVELS },
  arpTimers: [],
  bound: false
};

function formatFreeplayPitchClass(pc, preferFlat = false) {
  const norm = ((pc % 12) + 12) % 12;
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  if (useIntl) {
    const sharp = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
    const flat  = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
    return (preferFlat ? flat : sharp)[norm];
  }
  const sharpDe = ["C", "Cis", "D", "Dis", "E", "F", "Fis", "G", "Gis", "A", "B", "H"];
  const flatDe  = ["C", "Des", "D", "Es",  "E", "F", "Ges", "G", "As",  "A", "B", "H"];
  return (preferFlat ? flatDe : sharpDe)[norm];
}

function formatFreeplayBlackKeyLabel(pc) {
  const norm = ((pc % 12) + 12) % 12;
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  if (useIntl) {
    return { 1: "C♯", 3: "E♭", 6: "F♯", 8: "A♭", 10: "B♭" }[norm] || "";
  }
  return { 1: "Cis", 3: "Es", 6: "Fis", 8: "As", 10: "B" }[norm] || "";
}

function formatFreeplayMidiLabel(midi, preferFlat = false) {
  const oct = Math.floor(midi / 12) - 1;
  return `${formatFreeplayPitchClass(midi % 12, preferFlat)}${oct}`;
}

function getFreeplayTemplateLabel(tpl) {
  if (!tpl) return "";
  if (tpl.chordKey && typeof getLocalizedChordDef === "function") {
    const def = getLocalizedChordDef(tpl.chordKey);
    if (def?.label) return def.label;
    if (def?.short) return def.short;
  }
  return tr(tpl.de || tpl.suffix, tpl.en || tpl.suffix);
}

function getFreeplayDegreeRole(semitoneOffset, tplId = "") {
  const off = ((semitoneOffset % 12) + 12) % 12;
  if (off === 0) return "1";
  if (off === 1) return (tplId === "7b9" || tplId === "7b9no5") ? "♭9" : "♭2";
  if (off === 2) return (tplId === "sus2") ? "2" : "9";
  if (off === 3) return (tplId === "7s9" || tplId === "7s9no5") ? "♯9" : "♭3";
  if (off === 4) return "3";
  if (off === 5) return "4";
  if (off === 6) return "♭5";
  if (off === 7) return "5";
  if (off === 8) return (tplId === "aug" || tplId === "maj7s5" || tplId === "7s5") ? "♯5" : "♭6";
  if (off === 9) return tplId === "dim7" ? "♭♭7" : (tplId === "13no5" ? "13" : "6");
  if (off === 10) return "♭7";
  if (off === 11) return "7";
  return "";
}

function getFreeplayPreferFlatForRoot(rootPc, tplId = "") {
  if ([5, 10, 3, 8, 1].includes(rootPc)) return true;
  if (tplId === "min" || tplId === "m7" || tplId === "dim" || tplId === "dim7" || tplId === "m7b5") {
    return [0, 5, 7, 10, 3, 8].includes(rootPc);
  }
  return false;
}

function matchAllFreeplayChordTemplates(pcs, bassPc) {
  const results = [];
  for (let i = 0; i < pcs.length; i++) {
    const rootPc = pcs[i];
    const relSet = pcs.map(p => ((p - rootPc) % 12 + 12) % 12).sort((a, b) => a - b);
    const relKey = relSet.join(",");
    for (let t = 0; t < FREEPLAY_CHORD_TEMPLATES.length; t++) {
      const tpl = FREEPLAY_CHORD_TEMPLATES[t];
      if (tpl.intervals.length !== relSet.length) continue;
      if (tpl.intervals.join(",") !== relKey) continue;
      // Liegt die 9 ausschließlich im Bass (z. B. G3 + F4-A4-C5), ist F/G musikalischer als Fadd9/G
      if ((tpl.id === "add9" || tpl.id === "madd9") && ((bassPc - rootPc + 12) % 12) === 2) continue;
      let score = tpl.score;
      if (rootPc === bassPc) score += 14;
      if ([0, 2, 4, 5, 7, 9, 11].includes(rootPc)) score += 1;
      results.push({ rootPc, tpl, score });
    }
  }
  results.sort((a, b) => b.score - a.score);
  return results;
}

function matchFreeplayChordTemplate(pcs, bassPc) {
  const all = matchAllFreeplayChordTemplates(pcs, bassPc);
  return all.length > 0 ? all[0] : null;
}

function normalizeFreeplayTemplateToQualityId(tplId) {
  const map = {
    "7no5": "7",
    "maj7no5": "maj7",
    "m7no5": "m7",
    "9no5": "9",
    "maj9no5": "maj9",
    "m9no5": "m9",
    "7b9no5": "7b9",
    "7s9no5": "7s9",
    "69no5": "69",
    "13no5": "7",
    "9sus4": "7sus4"
  };
  return map[tplId] || tplId;
}

function findAllFreeplayChordMatches(rawMidis) {
  const primary = analyzeFreeplayMidis(rawMidis);
  const alternatives = [];
  const sorted = primary.midis || [];
  if (sorted.length < 3) return { primary, alternatives };

  const bassPc = ((sorted[0] % 12) + 12) % 12;
  const pcs = [...new Set(sorted.map(m => ((m % 12) + 12) % 12))];
  const seen = new Set([primary.title]);

  const addCandidate = (rootPc, tpl, forceSlash = false) => {
    const preferFlat = getFreeplayPreferFlatForRoot(rootPc, tpl.id);
    const rootName = formatFreeplayPitchClass(rootPc, preferFlat);
    const bassName = formatFreeplayPitchClass(bassPc, preferFlat);
    const isRootPos = !forceSlash && rootPc === bassPc;
    const symbol = isRootPos ? `${rootName}${tpl.suffix}` : `${rootName}${tpl.suffix}/${bassName}`;
    if (seen.has(symbol)) return;
    seen.add(symbol);
    alternatives.push({
      symbol,
      rootPc,
      qualityId: normalizeFreeplayTemplateToQualityId(tpl.id),
      bassPc,
      label: getFreeplayTemplateLabel(tpl)
    });
  };

  if (pcs.length >= 3) {
    const exactMatches = matchAllFreeplayChordTemplates(pcs, bassPc);
    exactMatches.forEach(m => {
      if (alternatives.length < 3) addCandidate(m.rootPc, m.tpl, false);
    });
  }

  // Auch obere Dreiklang-/Vierklangs-Slash-Deutungen als Alternative anbieten
  const upperPcs = pcs.filter(p => p !== bassPc);
  if (upperPcs.length >= 3 && alternatives.length < 3) {
    const upperBassPc = ((sorted[1] % 12) + 12) % 12;
    const upperMatches = matchAllFreeplayChordTemplates(upperPcs, upperBassPc);
    upperMatches.forEach(m => {
      if (alternatives.length < 3 && m.tpl.score >= 90) addCandidate(m.rootPc, m.tpl, true);
    });
  }

  return { primary, alternatives };
}

function analyzeFreeplayMidis(rawMidis) {
  const sorted = [...new Set((Array.isArray(rawMidis) ? rawMidis : []).filter(n => Number.isFinite(n)))].sort((a, b) => a - b);
  if (sorted.length === 0) {
    return {
      kind: "empty",
      badge: tr("Klang-Labor", "Sound Lab"),
      badgeClass: "tag-sage",
      title: tr("Tippe auf Tasten", "Tap keys to play"),
      sub: tr("Greife Töne oder baue Akkorde – hier siehst du Name, Töne und Umkehrung.", "Play notes or build chords — see the chord name, tones, and inversion live."),
      rootPc: null,
      preferFlat: false,
      midis: [],
      noteRoles: []
    };
  }

  if (sorted.length === 1) {
    const m = sorted[0];
    const pc = ((m % 12) + 12) % 12;
    const preferFlat = [3, 8, 10].includes(pc);
    const label = formatFreeplayMidiLabel(m, preferFlat);
    const freqNum = 440 * Math.pow(2, (m - 69) / 12);
    const freqStr = (typeof getAppLanguage === "function" && ["en", "ur"].includes(getAppLanguage()))
      ? freqNum.toFixed(1)
      : freqNum.toFixed(1).replace(".", ",");
    return {
      kind: "note",
      badge: tr("Einzelton", "Single Note"),
      badgeClass: "tag-sage",
      title: label,
      sub: tf("{freq} Hz • Grundton", "{freq} Hz • Pitch", { freq: freqStr }),
      rootPc: pc,
      preferFlat,
      midis: sorted,
      noteRoles: [{ midi: m, label, role: "1", isRoot: true }]
    };
  }

  const bassMidi = sorted[0];
  const bassPc = ((bassMidi % 12) + 12) % 12;
  const pcs = [...new Set(sorted.map(m => ((m % 12) + 12) % 12))];

  if (pcs.length === 1) {
    const preferFlat = [3, 8, 10].includes(bassPc);
    const rootName = formatFreeplayPitchClass(bassPc, preferFlat);
    return {
      kind: "interval",
      badge: tr("Intervall", "Interval"),
      badgeClass: "tag-lilac",
      title: `${rootName} • ${tr("Oktave", "Octave")}`,
      sub: tf("{notes} • {semi} Halbtöne", "{notes} • {semi} semitones", {
        notes: sorted.map(m => formatFreeplayMidiLabel(m, preferFlat)).join(" → "),
        semi: sorted[sorted.length - 1] - sorted[0]
      }),
      rootPc: bassPc,
      preferFlat,
      midis: sorted,
      noteRoles: sorted.map((m, idx) => ({
        midi: m,
        label: formatFreeplayMidiLabel(m, preferFlat),
        role: idx === 0 ? "1" : "8",
        isRoot: idx === 0
      }))
    };
  }

  if (sorted.length === 2 || (pcs.length === 2 && sorted.length === 2)) {
    const diff = sorted[1] - sorted[0];
    const intervalKey = FREEPLAY_SEMITONE_TO_INTERVAL_KEY[diff] || FREEPLAY_SEMITONE_TO_INTERVAL_KEY[diff % 12] || "P5";
    const intDef = typeof getLocalizedIntervalDef === "function" ? getLocalizedIntervalDef(intervalKey) : null;
    const preferFlat = [3, 5, 8, 10].includes(bassPc);
    const notesTxt = `${formatFreeplayMidiLabel(sorted[0], preferFlat)} → ${formatFreeplayMidiLabel(sorted[1], preferFlat)}`;
    const sub = diff === 1
      ? tf("{notes} • 1 Halbton", "{notes} • 1 semitone", { notes: notesTxt })
      : tf("{notes} • {semi} Halbtöne", "{notes} • {semi} semitones", { notes: notesTxt, semi: diff });
    return {
      kind: "interval",
      badge: tr("Intervall", "Interval"),
      badgeClass: "tag-lilac",
      title: intDef?.label || intervalKey,
      sub,
      rootPc: bassPc,
      preferFlat,
      midis: sorted,
      noteRoles: [
        { midi: sorted[0], label: formatFreeplayMidiLabel(sorted[0], preferFlat), role: "1", isRoot: true },
        { midi: sorted[1], label: formatFreeplayMidiLabel(sorted[1], preferFlat), role: intDef?.symbol || String(diff), isRoot: false }
      ]
    };
  }

  if (pcs.length === 2) {
    const rel = ((pcs[1] - bassPc) % 12 + 12) % 12;
    const altRel = ((pcs[0] - bassPc) % 12 + 12) % 12;
    const otherPc = rel === 0 ? pcs[0] : pcs[1];
    const diffPc = ((otherPc - bassPc) % 12 + 12) % 12;
    if (diffPc === 7) {
      const preferFlat = [3, 5, 8, 10].includes(bassPc);
      const rootName = formatFreeplayPitchClass(bassPc, preferFlat);
      return {
        kind: "chord",
        badge: tr("Akkord", "Chord"),
        badgeClass: "tag-peach",
        title: `${rootName}5`,
        sub: tr("Powerchord (1–5)", "Power Chord (1–5)"),
        rootPc: bassPc,
        bassPc,
        tplId: "5",
        preferFlat,
        midis: sorted,
        noteRoles: sorted.map(m => {
          const pc = ((m % 12) + 12) % 12;
          return {
            midi: m,
            label: formatFreeplayMidiLabel(m, preferFlat),
            role: pc === bassPc ? "1" : "5",
            isRoot: pc === bassPc
          };
        })
      };
    }
    void altRel;
  }

  // Exakter Akkord-Match über alle Kandidaten-Grundtöne
  const match = matchFreeplayChordTemplate(pcs, bassPc);
  if (match) {
    const { rootPc, tpl } = match;
    const preferFlat = getFreeplayPreferFlatForRoot(rootPc, tpl.id);
    const rootName = formatFreeplayPitchClass(rootPc, preferFlat);
    const bassName = formatFreeplayPitchClass(bassPc, preferFlat);
    const qualityLabel = getFreeplayTemplateLabel(tpl);
    const isRootPos = rootPc === bassPc;
    const symbol = isRootPos ? `${rootName}${tpl.suffix}` : `${rootName}${tpl.suffix}/${bassName}`;

    let sub = tf("{quality} • Grundstellung", "{quality} • Root Position", { quality: qualityLabel });
    let badge = tr("Akkord", "Chord");
    let badgeClass = "tag-peach";

    if (!isRootPos) {
      badge = tr("Umkehrung", "Inversion");
      badgeClass = "tag-lilac";
      const bassOffset = ((bassPc - rootPc) % 12 + 12) % 12;
      const invIdx = Array.isArray(tpl.invOrder) ? tpl.invOrder.indexOf(bassOffset) : -1;
      const invKey = invIdx >= 1 && invIdx <= 3 ? `inv${invIdx}` : null;
      const invDef = invKey && typeof getLocalizedChordInversionDef === "function" ? getLocalizedChordInversionDef(invKey) : null;
      if (invDef?.short) {
        sub = tf("{quality} • {inv} (Bass: {bass})", "{quality} • {inv} (Bass: {bass})", {
          quality: qualityLabel,
          inv: invDef.short,
          bass: bassName
        });
      } else {
        sub = tf("{quality} über Bass {bass}", "{quality} over Bass {bass}", {
          quality: qualityLabel,
          bass: bassName
        });
      }
    }

    return {
      kind: "chord",
      badge,
      badgeClass,
      title: symbol,
      sub,
      rootPc,
      bassPc,
      tplId: normalizeFreeplayTemplateToQualityId(tpl.id),
      preferFlat,
      midis: sorted,
      noteRoles: sorted.map(m => {
        const pc = ((m % 12) + 12) % 12;
        return {
          midi: m,
          label: formatFreeplayMidiLabel(m, preferFlat),
          role: getFreeplayDegreeRole(pc - rootPc, tpl.id),
          isRoot: pc === rootPc
        };
      })
    };
  }

  // Slash-Akkord-Fallback (z. B. F/G: oberer Akkord über fremdem Basston)
  const upperPcs = pcs.filter(p => p !== bassPc);
  if (upperPcs.length >= 3) {
    const upperBassPc = ((sorted[1] % 12) + 12) % 12;
    const upperMatch = matchFreeplayChordTemplate(upperPcs, upperBassPc);
    if (upperMatch && upperMatch.tpl.score >= 90) {
      const { rootPc, tpl } = upperMatch;
      const preferFlat = getFreeplayPreferFlatForRoot(rootPc, tpl.id);
      const rootName = formatFreeplayPitchClass(rootPc, preferFlat);
      const bassName = formatFreeplayPitchClass(bassPc, preferFlat);
      const qualityLabel = getFreeplayTemplateLabel(tpl);
      return {
        kind: "chord",
        badge: tr("Slash-Akkord", "Slash Chord"),
        badgeClass: "tag-lilac",
        title: `${rootName}${tpl.suffix}/${bassName}`,
        sub: tf("{quality} über Bass {bass}", "{quality} over Bass {bass}", {
          quality: qualityLabel,
          bass: bassName
        }),
        rootPc,
        bassPc,
        tplId: normalizeFreeplayTemplateToQualityId(tpl.id),
        preferFlat,
        midis: sorted,
        noteRoles: sorted.map((m, idx) => {
          const pc = ((m % 12) + 12) % 12;
          return {
            midi: m,
            label: formatFreeplayMidiLabel(m, preferFlat),
            role: idx === 0 ? "Bass" : getFreeplayDegreeRole(pc - rootPc, tpl.id),
            isRoot: pc === rootPc
          };
        })
      };
    }
  }

  // Freier Cluster / eigener Klang
  const preferFlat = [3, 5, 8, 10].includes(bassPc);
  return {
    kind: "custom",
    badge: tr("Freier Klang", "Custom Voicing"),
    badgeClass: "tag-sage",
    title: sorted.map(m => formatFreeplayPitchClass(m % 12, preferFlat)).filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 5).join(" · "),
    sub: tf("{n} Töne • Umfang: {span} Halbtöne", "{n} notes • Span: {span} semitones", {
      n: sorted.length,
      span: sorted[sorted.length - 1] - sorted[0]
    }),
    rootPc: bassPc,
    preferFlat,
    midis: sorted,
    noteRoles: sorted.map((m, idx) => ({
      midi: m,
      label: formatFreeplayMidiLabel(m, preferFlat),
      role: idx === 0 ? "Bass" : `+${m - bassMidi}`,
      isRoot: idx === 0
    }))
  };
}

function getFreeplayMiniStaffStep(midi, preferFlat = false) {
  const oct = Math.floor(midi / 12) - 1;
  const pc = ((midi % 12) + 12) % 12;
  const sharpMap = [
    [0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [3, 0],
    [3, 1], [4, 0], [4, 1], [5, 0], [5, 1], [6, 0]
  ];
  const flatMap = [
    [0, 0], [1, -1], [1, 0], [2, -1], [2, 0], [3, 0],
    [4, -1], [4, 0], [5, -1], [5, 0], [6, -1], [6, 0]
  ];
  const [deg, acc] = (preferFlat ? flatMap : sharpMap)[pc];
  return { diatonic: oct * 7 + deg, acc };
}

function renderFreeplayMiniStaff(sortedMidis, rootPc = null, preferFlat = false, targetElOrId = "freeplayStaffBox", options = null) {
  const box = typeof targetElOrId === "string" ? document.getElementById(targetElOrId) : targetElOrId;
  if (!box) return;
  const octaveShift = Number(options?.octaveShift) || 0;
  const rawMidis = Array.isArray(sortedMidis) ? sortedMidis : [];
  const midis = octaveShift ? rawMidis.map(m => m + octaveShift) : rawMidis;
  const avgMidi = midis.length > 0 ? midis.reduce((a, b) => a + b, 0) / midis.length : 64;
  const useBass = !options?.forceTreble && midis.length > 0 && avgMidi < 56;
  // Diatonische Referenz für unterste Notenlinie: Violin = E4 (4*7+2 = 30), Bass = G2 (2*7+4 = 18)
  const bottomLineDia = useBass ? 18 : 30;
  const lineGap = 7.4;
  const bottomY = 53;

  const linesSvg = [0, 1, 2, 3, 4].map(i => {
    const y = bottomY - i * lineGap;
    return `<line x1="8" y1="${y}" x2="96" y2="${y}" stroke="var(--border-strong)" stroke-width="1"/>`;
  }).join("");

  const clefSvg = useBass
    ? `<text x="12" y="45" font-size="25" font-family="serif" fill="var(--raccoon-mid)">𝄢</text>`
    : `<text x="11" y="51" font-size="31" font-family="serif" fill="var(--raccoon-mid)">𝄞</text>`;

  const spreadHorizontal = Boolean(options?.spreadHorizontal && midis.length > 1);
  const perNoteFlats = Array.isArray(options?.perNotePreferFlat) ? options.perNotePreferFlat : null;
  const placed = midis.map((m, idx) => {
    const pf = perNoteFlats && perNoteFlats[idx] !== undefined ? perNoteFlats[idx] : preferFlat;
    const { diatonic, acc } = getFreeplayMiniStaffStep(m, pf);
    const step = diatonic - bottomLineDia; // 0 = 1. Linie, 8 = 5. Linie
    return { midi: m, step, acc, isRoot: rootPc !== null && (((m % 12) + 12) % 12) === rootPc };
  });

  if (spreadHorizontal) {
    const startX = 35;
    const endX = 91;
    const stepX = placed.length > 1 ? (endX - startX) / (placed.length - 1) : 0;
    placed.forEach((n, idx) => {
      n.cx = startX + idx * stepX;
    });
  } else {
    // Horizontales Ausweichen bei Sekunden (step-Abstand === 1)
    let shiftNext = false;
    placed.forEach((n, idx) => {
      if (idx > 0 && (n.step - placed[idx - 1].step) <= 1 && !shiftNext) {
        n.cx = 56 + 8.5;
        shiftNext = true;
      } else {
        n.cx = 56;
        shiftNext = false;
      }
    });
  }

  let ledgersSvg = "";
  if (spreadHorizontal) {
    const parts = [];
    placed.forEach(n => {
      const clampedStep = Math.max(-6, Math.min(14, n.step));
      if (clampedStep <= -2) {
        for (let s = -2; s >= clampedStep; s -= 2) {
          const y = bottomY - (s * lineGap) / 2;
          parts.push(`<line x1="${n.cx - 5.5}" y1="${y}" x2="${n.cx + 5.5}" y2="${y}" stroke="var(--raccoon-mid)" stroke-width="1"/>`);
        }
      } else if (clampedStep >= 10) {
        for (let s = 10; s <= clampedStep; s += 2) {
          const y = bottomY - (s * lineGap) / 2;
          parts.push(`<line x1="${n.cx - 5.5}" y1="${y}" x2="${n.cx + 5.5}" y2="${y}" stroke="var(--raccoon-mid)" stroke-width="1"/>`);
        }
      }
    });
    ledgersSvg = parts.join("");
  } else {
    const ledgerSteps = new Set();
    placed.forEach(n => {
      if (n.step <= -2) {
        for (let s = -2; s >= Math.max(-8, n.step); s -= 2) ledgerSteps.add(s);
      } else if (n.step >= 10) {
        for (let s = 10; s <= Math.min(16, n.step); s += 2) ledgerSteps.add(s);
      }
    });
    ledgersSvg = [...ledgerSteps].map(s => {
      const y = bottomY - (s * lineGap) / 2;
      return `<line x1="47" y1="${y}" x2="72" y2="${y}" stroke="var(--raccoon-mid)" stroke-width="1.1"/>`;
    }).join("");
  }

  const rx = spreadHorizontal ? 3.5 : 4.4;
  const ry = spreadHorizontal ? 2.6 : 3.2;
  const notesSvg = placed.map(n => {
    const clampedStep = Math.max(-6, Math.min(14, n.step));
    const y = bottomY - (clampedStep * lineGap) / 2;
    const cx = n.cx;
    const fill = n.isRoot ? "var(--peach-strong)" : "var(--raccoon-dark)";
    const accGlyph = n.acc === 1 ? "♯" : (n.acc === -1 ? "♭" : "");
    const accSvg = (accGlyph && !spreadHorizontal)
      ? `<text x="${cx - 12}" y="${y + 3.6}" font-size="11" font-weight="800" fill="${fill}">${accGlyph}</text>`
      : "";
    return `${accSvg}<ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(-18 ${cx} ${y})" fill="${fill}"/>`;
  }).join("");

  box.innerHTML = `<svg viewBox="0 0 104 76" aria-hidden="true">${linesSvg}${clefSvg}${ledgersSvg}${notesSvg}</svg>`;
}

function getFreeplayDisplayedMidis() {
  if (_freeplay.mode === "hold") {
    return _freeplay.latchedMidis.slice();
  }
  const combined = new Set([..._freeplay.pressedMidis, ..._freeplay.recentMidis]);
  return [...combined].sort((a, b) => a - b);
}

function clearFreeplayArpTimers() {
  _freeplay.arpTimers.forEach(id => clearTimeout(id));
  _freeplay.arpTimers = [];
}

function ensureAtLeastOneMixerInstrument() {
  const sum = FREEPLAY_INSTRUMENT_KEYS.reduce((acc, k) => acc + (Number(state.mixer[k]) || 0), 0);
  if (sum <= 0.001) {
    state.mixer.piano = 0.90;
    syncMixerSliders();
    if (audioEngine?.isInitialized) audioEngine.setMixerGains(state.mixer);
  }
}

async function playFreeplayNotes(rawMidis, options = {}) {
  const sorted = [...new Set((Array.isArray(rawMidis) ? rawMidis : [rawMidis]).filter(n => Number.isFinite(n)))].sort((a, b) => a - b);
  if (sorted.length === 0) return;
  markSessionActivity();
  ensureAtLeastOneMixerInstrument();
  await ensureAudioReady();
  audioEngine.setMixerGains(state.mixer);

  const upperSum = (state.mixer.piano || 0) + (state.mixer.guitar || 0) + (state.mixer.strings || 0)
    + (state.mixer.brass || 0) + (state.mixer.voice || 0);
  const bassVol = state.mixer.bass || 0;
  const dur = Number.isFinite(options.durSec) ? options.durSec : (sorted.length >= 2 ? 1.35 : 0.95);
  const noteNames = sorted.map(midiToNote);

  let bassNote = null;
  if (bassVol > 0.001) {
    const lowest = sorted[0];
    const bassMidi = (sorted.length >= 2 && upperSum > 0.001 && lowest >= 57) ? lowest - 12 : lowest;
    bassNote = midiToNote(bassMidi);
  }

  audioEngine.playStep(upperSum > 0.001 ? noteNames : [], dur, bassNote, "cadence", {
    velocity: options.velocity ?? 0.95
  });
}

async function playFreeplayArpeggio(rawMidis) {
  const sorted = [...new Set((Array.isArray(rawMidis) ? rawMidis : []).filter(n => Number.isFinite(n)))].sort((a, b) => a - b);
  if (sorted.length === 0) return;
  clearFreeplayArpTimers();
  markSessionActivity();
  ensureAtLeastOneMixerInstrument();
  await ensureAudioReady();
  audioEngine.setMixerGains(state.mixer);

  sorted.forEach((midi, idx) => {
    const tid = setTimeout(() => {
      if (state.currentView !== "freeplay") return;
      playFreeplayNotes([midi], { durSec: idx === sorted.length - 1 ? 1.3 : 0.72, velocity: 0.92 });
      const keyEl = document.getElementById(`freeplayKey_${midi}`);
      if (keyEl) {
        keyEl.classList.add("is-pressed");
        setTimeout(() => keyEl.classList.remove("is-pressed"), 210);
      }
    }, idx * 155);
    _freeplay.arpTimers.push(tid);
  });
}

function updateFreeplayAnalyzerUI() {
  const midis = getFreeplayDisplayedMidis();
  const analysis = analyzeFreeplayMidis(midis);

  const badgeEl = document.getElementById("freeplayTypeBadge");
  const titleEl = document.getElementById("freeplayMainTitle");
  const subEl = document.getElementById("freeplaySubInfo");
  const notesRow = document.getElementById("freeplayNotesRow");
  const playChordBtn = document.getElementById("freeplayPlayChordBtn");
  const playArpBtn = document.getElementById("freeplayPlayArpBtn");
  const clearBtn = document.getElementById("freeplayClearBtn");

  if (badgeEl) {
    badgeEl.textContent = analysis.badge;
    badgeEl.className = `k-card-tag ${analysis.badgeClass}`;
  }
  if (titleEl) titleEl.textContent = analysis.title;
  if (subEl) subEl.textContent = analysis.sub;

  if (notesRow) {
    if (analysis.noteRoles.length === 0) {
      notesRow.innerHTML = `<span class="freeplay-notes-placeholder">${escapeHtml(tr("Töne erscheinen hier live beim Spielen", "Notes appear here live as you play"))}</span>`;
    } else {
      notesRow.innerHTML = analysis.noteRoles.map(nr => `
        <button type="button" class="freeplay-note-pill${nr.isRoot ? " is-root" : ""}" data-freeplay-audition="${nr.midi}">
          <span>${escapeHtml(nr.label)}</span>
          ${nr.role ? `<span class="freeplay-note-pill-role">${escapeHtml(nr.role)}</span>` : ""}
        </button>
      `).join("");
      notesRow.querySelectorAll("[data-freeplay-audition]").forEach(btn => {
        btn.addEventListener("click", () => {
          const m = parseInt(btn.dataset.freeplayAudition, 10);
          if (Number.isFinite(m)) playFreeplayNotes([m], { durSec: 0.85 });
        });
      });
    }
  }

  const hasNotes = midis.length > 0;
  if (playChordBtn) playChordBtn.disabled = !hasNotes;
  if (playArpBtn) playArpBtn.disabled = midis.length < 2;
  if (clearBtn) clearBtn.disabled = !hasNotes;

  renderFreeplayMiniStaff(midis, analysis.rootPc, analysis.preferFlat);

  // Tasten-Hervorhebung aktualisieren
  const activeSet = new Set(midis);
  document.querySelectorAll("#freeplayKeyboardWrap [data-fp-midi]").forEach(el => {
    const m = parseInt(el.dataset.fpMidi, 10);
    const isActive = activeSet.has(m);
    const isRoot = isActive && analysis.rootPc !== null && (((m % 12) + 12) % 12) === analysis.rootPc && midis.length >= 2;
    el.classList.toggle("is-active", isActive);
    el.classList.toggle("is-root-key", isRoot);
    el.classList.toggle("is-pressed", _freeplay.pressedMidis.has(m));
  });

  // Passende Übungs-Brücke dezent betonen
  document.querySelectorAll("#viewFreeplay [data-freeplay-jump]").forEach(btn => {
    const target = btn.dataset.freeplayJump;
    const highlight =
      (analysis.kind === "chord" && target === "chords") ||
      (analysis.kind === "interval" && target === "interval");
    btn.classList.toggle("active", highlight);
  });
}

function renderFreeplayKeyboard() {
  const wrap = document.getElementById("freeplayKeyboardWrap");
  if (!wrap) return;

  const baseC = (_freeplay.baseOctave + 1) * 12; // C4 = 60
  const octLabel = document.getElementById("freeplayOctLabel");
  if (octLabel) {
    octLabel.textContent = `${formatFreeplayMidiLabel(baseC, false)}–${formatFreeplayMidiLabel(baseC + 16, false)}`;
  }

  const octDownBtn = document.getElementById("freeplayOctDownBtn");
  const octUpBtn = document.getElementById("freeplayOctUpBtn");
  if (octDownBtn) octDownBtn.disabled = _freeplay.baseOctave <= 2;
  if (octUpBtn) octUpBtn.disabled = _freeplay.baseOctave >= 5;

  const kb = document.createElement("div");
  kb.className = `freeplay-kb${_freeplay.showLabels ? "" : " labels-hidden"}`;

  FREEPLAY_WHITE_OFFSETS.forEach(off => {
    const midi = baseC + off;
    const pc = ((midi % 12) + 12) % 12;
    const oct = Math.floor(midi / 12) - 1;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `freeplay-kb-white${pc === 0 ? " is-c-key" : ""}`;
    btn.id = `freeplayKey_${midi}`;
    btn.dataset.fpMidi = String(midi);

    const lbl = document.createElement("span");
    lbl.className = "freeplay-kb-white-label";
    lbl.textContent = pc === 0 ? `${getWhiteNoteLabel(pc)}${oct}` : getWhiteNoteLabel(pc);
    btn.appendChild(lbl);

    bindFreeplayKeyEvents(btn, midi);
    kb.appendChild(btn);
  });

  const whiteCount = FREEPLAY_WHITE_OFFSETS.length;
  const blackWidthPct = (100 / whiteCount) * 0.62;
  FREEPLAY_BLACK_SPECS.forEach(spec => {
    const midi = baseC + spec.offset;
    const pc = ((midi % 12) + 12) % 12;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "freeplay-kb-black";
    btn.id = `freeplayKey_${midi}`;
    btn.dataset.fpMidi = String(midi);
    btn.style.left = `${((spec.afterWhite + 1) / whiteCount) * 100}%`;
    btn.style.width = `${blackWidthPct}%`;

    const lbl = document.createElement("span");
    lbl.className = "freeplay-kb-black-label";
    lbl.textContent = formatFreeplayBlackKeyLabel(pc);
    btn.appendChild(lbl);

    bindFreeplayKeyEvents(btn, midi);
    kb.appendChild(btn);
  });

  wrap.innerHTML = "";
  wrap.appendChild(kb);
  updateFreeplayAnalyzerUI();
}

function bindFreeplayKeyEvents(btn, midi) {
  btn.addEventListener("pointerdown", (e) => {
    if (e?.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    handleFreeplayKeyDown(midi);
  });
  const release = () => handleFreeplayKeyUp(midi);
  btn.addEventListener("pointerup", release);
  btn.addEventListener("pointercancel", release);
  btn.addEventListener("pointerleave", release);
}

function handleFreeplayKeyDown(midi) {
  clearFreeplayArpTimers();
  _freeplay.activePadId = null;
  updateFreeplayPadHighlights();

  if (_freeplay.mode === "hold") {
    const idx = _freeplay.latchedMidis.indexOf(midi);
    if (idx >= 0) {
      _freeplay.latchedMidis.splice(idx, 1);
      if (_freeplay.latchedMidis.length > 0) {
        playFreeplayNotes(_freeplay.latchedMidis, { durSec: 1.1 });
      }
    } else {
      _freeplay.latchedMidis.push(midi);
      _freeplay.latchedMidis.sort((a, b) => a - b);
      playFreeplayNotes(_freeplay.latchedMidis, { durSec: 1.3 });
    }
    updateFreeplayAnalyzerUI();
    return;
  }

  // Frei-Modus (Live): sofort abspielen, Multitouch + schnelle Akkord-Folge (< 950ms) erkennen
  const now = Date.now();
  if (_freeplay.pressedMidis.size === 0 && (now - _freeplay.lastTapWallMs) > 950) {
    _freeplay.recentMidis = [];
  }
  _freeplay.lastTapWallMs = now;
  _freeplay.pressedMidis.add(midi);
  if (!_freeplay.recentMidis.includes(midi)) {
    _freeplay.recentMidis.push(midi);
    if (_freeplay.recentMidis.length > 6) _freeplay.recentMidis.shift();
  }

  playFreeplayNotes([midi], { durSec: 1.05 });
  updateFreeplayAnalyzerUI();
}

function handleFreeplayKeyUp(midi) {
  if (!_freeplay.pressedMidis.has(midi)) return;
  _freeplay.pressedMidis.delete(midi);
  const el = document.getElementById(`freeplayKey_${midi}`);
  el?.classList.remove("is-pressed");
}

function setFreeplayMode(nextMode) {
  const target = nextMode === "hold" ? "hold" : "live";
  if (_freeplay.mode === target) return;
  if (target === "hold" && _freeplay.latchedMidis.length === 0 && _freeplay.recentMidis.length > 0) {
    _freeplay.latchedMidis = [...new Set(_freeplay.recentMidis)].sort((a, b) => a - b);
  }
  _freeplay.mode = target;
  document.querySelectorAll("#viewFreeplay [data-freeplay-mode]").forEach(btn => {
    const active = btn.dataset.freeplayMode === target;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-checked", active ? "true" : "false");
  });
  updateFreeplayAnalyzerUI();
}

function clearFreeplayNotes() {
  clearFreeplayArpTimers();
  _freeplay.latchedMidis = [];
  _freeplay.pressedMidis.clear();
  _freeplay.recentMidis = [];
  _freeplay.activePadId = null;
  stopPlayback();
  updateFreeplayPadHighlights();
  updateFreeplayAnalyzerUI();
}

function renderFreeplayInstrumentGrid() {
  const grid = document.getElementById("freeplayInstrumentGrid");
  if (!grid) return;

  const labels = {
    piano:   typeof getStaticI18nText === "function" ? getStaticI18nText("mixer.piano")   : tr("Klavier", "Piano"),
    guitar:  typeof getStaticI18nText === "function" ? getStaticI18nText("mixer.guitar")  : tr("Gitarre", "Guitar"),
    strings: typeof getStaticI18nText === "function" ? getStaticI18nText("mixer.strings") : tr("Streicher", "Strings"),
    brass:   typeof getStaticI18nText === "function" ? getStaticI18nText("mixer.brass")   : tr("Bläser", "Brass"),
    voice:   typeof getStaticI18nText === "function" ? getStaticI18nText("mixer.voice")   : tr("Stimme", "Voice"),
    bass:    typeof getStaticI18nText === "function" ? getStaticI18nText("mixer.bass")    : tr("Bass", "Bass")
  };

  grid.innerHTML = FREEPLAY_INSTRUMENT_KEYS.map(key => {
    const val = Math.max(0, Math.min(1, Number(state.mixer[key]) || 0));
    const pct = Math.round(val * 100);
    const isOn = val > 0.001;
    if (isOn) _freeplay.lastNonZeroMix[key] = val;
    return `
      <button type="button" class="freeplay-inst-chip${isOn ? " is-on" : ""}" data-fp-inst="${key}" aria-pressed="${isOn ? "true" : "false"}">
        <span class="freeplay-inst-top">
          <span class="freeplay-inst-name">${escapeHtml(labels[key] || key)}</span>
          <span class="freeplay-inst-pct">${pct}%</span>
        </span>
        <span class="freeplay-inst-bar" aria-hidden="true">
          <span class="freeplay-inst-bar-fill" style="width:${pct}%"></span>
        </span>
      </button>
    `;
  }).join("");

  grid.querySelectorAll("[data-fp-inst]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const key = btn.dataset.fpInst;
      const curVal = Number(state.mixer[key]) || 0;
      if (curVal > 0.001) {
        const otherSum = FREEPLAY_INSTRUMENT_KEYS.reduce((s, k) => s + (k === key ? 0 : (Number(state.mixer[k]) || 0)), 0);
        if (otherSum <= 0.001) return; // mindestens ein Instrument bleibt aktiv
        _freeplay.lastNonZeroMix[key] = curVal;
        state.mixer[key] = 0;
      } else {
        state.mixer[key] = _freeplay.lastNonZeroMix[key] || FREEPLAY_DEFAULT_MIX_LEVELS[key] || 0.8;
      }
      state.customMixer = { ...state.mixer };
      state.activePreset = "custom";
      document.querySelectorAll("[data-preset]").forEach(b => b.classList.toggle("active", b.dataset.preset === "custom"));
      syncMixerSliders();
      await ensureAudioReady();
      audioEngine.setMixerGains(state.mixer);
      const activeMidis = getFreeplayDisplayedMidis();
      if (activeMidis.length > 0) {
        playFreeplayNotes(activeMidis, { durSec: 1.25 });
      }
    });
  });

  document.querySelectorAll("#freeplayPresetRow [data-freeplay-preset]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.freeplayPreset === state.activePreset);
  });
}

function renderFreeplayChordPads() {
  const host = document.getElementById("freeplayChordPads");
  if (!host) return;

  host.innerHTML = FREEPLAY_CHORD_PADS.map(pad => {
    const rootName = formatFreeplayPitchClass(pad.rootPc, false);
    const bassName = pad.bassPc !== undefined ? formatFreeplayPitchClass(pad.bassPc, false) : "";
    const symbol = bassName ? `${rootName}${pad.suffix}/${bassName}` : `${rootName}${pad.suffix}`;
    const def = typeof getLocalizedChordDef === "function" ? getLocalizedChordDef(pad.qualityKey) : null;
    const sub = bassName ? `Bass: ${bassName}` : (def?.short || pad.qualityKey);
    return `
      <button type="button" class="freeplay-pad-btn${_freeplay.activePadId === pad.id ? " is-active" : ""}" data-fp-pad="${pad.id}">
        <span class="freeplay-pad-sym">${escapeHtml(symbol)}</span>
        <span class="freeplay-pad-sub">${escapeHtml(sub)}</span>
      </button>
    `;
  }).join("");

  host.querySelectorAll("[data-fp-pad]").forEach(btn => {
    btn.addEventListener("click", () => {
      const pad = FREEPLAY_CHORD_PADS.find(p => p.id === btn.dataset.fpPad);
      if (!pad) return;
      clearFreeplayArpTimers();
      const baseC = (_freeplay.baseOctave + 1) * 12;
      let midis = pad.offsets.map(off => baseC + off);
      // Falls Akkord über E5 hinausgeht, sanft eine Oktave in das sichtbare Fenster rücken
      if (midis[midis.length - 1] > baseC + 16) {
        midis = midis.map(m => (m > baseC + 16 ? m - 12 : m)).sort((a, b) => a - b);
      }
      _freeplay.mode = "hold";
      document.querySelectorAll("#viewFreeplay [data-freeplay-mode]").forEach(b => {
        const active = b.dataset.freeplayMode === "hold";
        b.classList.toggle("active", active);
        b.setAttribute("aria-checked", active ? "true" : "false");
      });
      _freeplay.latchedMidis = [...new Set(midis)].sort((a, b) => a - b);
      _freeplay.activePadId = pad.id;
      updateFreeplayPadHighlights();
      updateFreeplayAnalyzerUI();
      playFreeplayNotes(_freeplay.latchedMidis, { durSec: 1.45 });
    });
  });
}

function updateFreeplayPadHighlights() {
  document.querySelectorAll("#freeplayChordPads [data-fp-pad]").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.fpPad === _freeplay.activePadId);
  });
}

function renderFreeplayView() {
  ensureAtLeastOneMixerInstrument();
  renderFreeplayKeyboard();
  renderFreeplayInstrumentGrid();
  renderFreeplayChordPads();
  updateFreeplayAnalyzerUI();
}

function initFreeplayEventListeners() {
  if (_freeplay.bound) return;
  _freeplay.bound = true;

  document.querySelectorAll("#viewFreeplay [data-freeplay-mode]").forEach(btn => {
    btn.addEventListener("click", () => setFreeplayMode(btn.dataset.freeplayMode));
  });

  document.getElementById("freeplayOctDownBtn")?.addEventListener("click", () => {
    if (_freeplay.baseOctave <= 2) return;
    _freeplay.baseOctave -= 1;
    _freeplay.latchedMidis = _freeplay.latchedMidis.map(m => m - 12).filter(m => m >= 36);
    _freeplay.recentMidis = [];
    renderFreeplayKeyboard();
  });

  document.getElementById("freeplayOctUpBtn")?.addEventListener("click", () => {
    if (_freeplay.baseOctave >= 5) return;
    _freeplay.baseOctave += 1;
    _freeplay.latchedMidis = _freeplay.latchedMidis.map(m => m + 12).filter(m => m <= 96);
    _freeplay.recentMidis = [];
    renderFreeplayKeyboard();
  });

  document.getElementById("freeplayLabelsBtn")?.addEventListener("click", (e) => {
    _freeplay.showLabels = !_freeplay.showLabels;
    const btn = e.currentTarget;
    btn.classList.toggle("active", _freeplay.showLabels);
    btn.setAttribute("aria-pressed", _freeplay.showLabels ? "true" : "false");
    document.querySelector("#freeplayKeyboardWrap .freeplay-kb")?.classList.toggle("labels-hidden", !_freeplay.showLabels);
  });

  document.getElementById("freeplayPlayChordBtn")?.addEventListener("click", () => {
    const midis = getFreeplayDisplayedMidis();
    if (midis.length > 0) playFreeplayNotes(midis, { durSec: 1.45 });
  });

  document.getElementById("freeplayPlayArpBtn")?.addEventListener("click", () => {
    const midis = getFreeplayDisplayedMidis();
    if (midis.length > 1) playFreeplayArpeggio(midis);
  });

  document.getElementById("freeplayClearBtn")?.addEventListener("click", () => {
    clearFreeplayNotes();
  });

  document.getElementById("freeplayOpenMixerBtn")?.addEventListener("click", () => {
    document.getElementById("openMixerBtn")?.click();
  });

  document.querySelectorAll("#freeplayPresetRow [data-freeplay-preset]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const key = btn.dataset.freeplayPreset;
      const preset = FREEPLAY_MIX_PRESETS[key];
      if (!preset) return;
      state.activePreset = key;
      state.mixer = { voice: 0, ...preset };
      document.querySelectorAll("[data-preset]").forEach(b => b.classList.toggle("active", b.dataset.preset === key));
      syncMixerSliders();
      await ensureAudioReady();
      audioEngine.setMixerGains(state.mixer);
      const midis = getFreeplayDisplayedMidis();
      if (midis.length > 0) playFreeplayNotes(midis, { durSec: 1.35 });
    });
  });

  document.querySelectorAll("#viewFreeplay [data-freeplay-jump]").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.freeplayJump;
      if (cat) openCategoryPage(cat);
    });
  });

  // Desktop-Tastatur-Unterstützung im Freien Spiel (A–; spielt C bis E)
  document.addEventListener("keydown", (e) => {
    if (state.currentView !== "freeplay" || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = e.target?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (typeof getOpenModalName === "function" && getOpenModalName()) return;
    const off = FREEPLAY_PC_KEY_MAP[e.code];
    if (off === undefined) return;
    const midi = (_freeplay.baseOctave + 1) * 12 + off;
    handleFreeplayKeyDown(midi);
  });

  document.addEventListener("keyup", (e) => {
    if (state.currentView !== "freeplay") return;
    const off = FREEPLAY_PC_KEY_MAP[e.code];
    if (off === undefined) return;
    const midi = (_freeplay.baseOctave + 1) * 12 + off;
    handleFreeplayKeyUp(midi);
  });
}

function stopFreeplaySession() {
  clearFreeplayArpTimers();
  _freeplay.pressedMidis.clear();
  stopPlayback();
}

function openTunerView(returnView = "tools") {
  state.tunerReturnView = returnView;
  switchView("tuner");
}

function openFreeplayView(returnView = "tools") {
  state.freeplayReturnView = returnView;
  switchView("freeplay");
}

