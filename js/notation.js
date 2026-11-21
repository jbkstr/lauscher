/* =====================================================
   NOTATION (NOTENLESEN) • SCHLÜSSEL, HILFSLINIEN & SVG
   ===================================================== */
const NOTATION_LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const NOTATION_LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const NOTATION_GERMAN_SPELLED = {
  C: { "-1": "Ces", 0: "C", 1: "Cis" },
  D: { "-1": "Des", 0: "D", 1: "Dis" },
  E: { "-1": "Es",  0: "E", 1: "Eis" },
  F: { "-1": "Fes", 0: "F", 1: "Fis" },
  G: { "-1": "Ges", 0: "G", 1: "Gis" },
  A: { "-1": "As",  0: "A", 1: "Ais" },
  B: { "-1": "B",   0: "H", 1: "His" }
};
const NOTATION_SHARP_ELIGIBLE = new Set(["C", "D", "F", "G", "A"]);
const NOTATION_FLAT_ELIGIBLE  = new Set(["D", "E", "G", "A", "B"]);
const NOTATION_QUEUE_SIZE = 6;
const NOTATION_ACTIVE_CLEFS = ["treble", "bass", "alto"];

const NOTATION_CLEFS = {
  treble: {
    id: "treble",
    mode: "notation-treble",
    anchorDiatonicIndex: 32, // G4 = 4*7 + 4
    anchorStep: 2,           // 2. Linie von unten
    anchorMidi: 67,
    anchorNote: "G4",
    active: true
  },
  bass: {
    id: "bass",
    mode: "notation-bass",
    anchorDiatonicIndex: 24, // F3 = 3*7 + 3
    anchorStep: 6,           // 4. Linie von unten
    anchorMidi: 53,
    anchorNote: "F3",
    active: true
  },
  alto: {
    id: "alto",
    mode: "notation-alto",
    anchorDiatonicIndex: 28, // C4 = 4*7 + 0
    anchorStep: 4,           // 3. (mittlere) Linie
    anchorMidi: 60,
    anchorNote: "C4",
    active: true
  },
  tenor: {
    id: "tenor",
    mode: "notation-tenor",
    anchorDiatonicIndex: 28, // C4 = 4*7 + 0
    anchorStep: 6,           // 4. Linie von unten (Spezialschlüssel für Ausbau/Wissen)
    anchorMidi: 60,
    anchorNote: "C4",
    active: false
  }
};

const NOTATION_LEVELS = {
  1: { level: 1, minStep: -1, maxStep: 9,  maxLedgers: 0, allowAccidentals: false },
  2: { level: 2, minStep: -4, maxStep: 12, maxLedgers: 2, allowAccidentals: false },
  3: { level: 3, minStep: -7, maxStep: 15, maxLedgers: 3, allowAccidentals: false },
  4: { level: 4, minStep: -7, maxStep: 15, maxLedgers: 3, allowAccidentals: true }
};

const NOTATION_SHARP_ORDER = ["F", "C", "G", "D", "A", "E", "B"];
const NOTATION_FLAT_ORDER  = ["B", "E", "A", "D", "G", "C", "F"];
const NOTATION_KEY_PHRASE_LEN = 8;

const NOTATION_KEY_SIGNATURES = {
  none: { id: "none", rootKey: "C",  type: "none",  count: 0, tier: "base" },
  G:    { id: "G",    rootKey: "G",  type: "sharp", count: 1, tier: "easy" },
  D:    { id: "D",    rootKey: "D",  type: "sharp", count: 2, tier: "easy" },
  A:    { id: "A",    rootKey: "A",  type: "sharp", count: 3, tier: "medium" },
  E:    { id: "E",    rootKey: "E",  type: "sharp", count: 4, tier: "medium" },
  B:    { id: "B",    rootKey: "B",  type: "sharp", count: 5, tier: "hard" },
  "F#": { id: "F#",   rootKey: "F#", type: "sharp", count: 6, tier: "hard" },
  F:    { id: "F",    rootKey: "F",  type: "flat",  count: 1, tier: "easy" },
  Bb:   { id: "Bb",   rootKey: "Bb", type: "flat",  count: 2, tier: "easy" },
  Eb:   { id: "Eb",   rootKey: "Eb", type: "flat",  count: 3, tier: "medium" },
  Ab:   { id: "Ab",   rootKey: "Ab", type: "flat",  count: 4, tier: "medium" },
  Db:   { id: "Db",   rootKey: "Db", type: "flat",  count: 5, tier: "hard" },
  Gb:   { id: "Gb",   rootKey: "Gb", type: "flat",  count: 6, tier: "hard" }
};

const NOTATION_KEY_POOLS = {
  easy:   ["G", "D", "F", "Bb"],
  medium: ["A", "E", "Eb", "Ab"],
  hard:   ["B", "F#", "Db", "Gb"],
  all:    ["G", "D", "A", "E", "B", "F#", "F", "Bb", "Eb", "Ab", "Db", "Gb"]
};

const NOTATION_SHARP_KEY_ORDER = ["G", "D", "A", "E", "B", "F#"];
const NOTATION_FLAT_KEY_ORDER  = ["F", "Bb", "Eb", "Ab", "Db", "Gb"];

// Klassische Gravur-Positionen (staffStep) der Generalvorzeichen je Notenschlüssel
const NOTATION_KEY_SIG_STEPS = {
  treble: { sharps: [8, 5, 9, 6, 3, 7, 4], flats: [4, 7, 3, 6, 2, 5, 1] },
  bass:   { sharps: [6, 3, 7, 4, 1, 5, 2], flats: [2, 5, 1, 4, 0, 3, -1] },
  alto:   { sharps: [7, 4, 8, 5, 2, 6, 3], flats: [3, 6, 2, 5, 1, 4, 0] },
  tenor:  { sharps: [2, 6, 3, 7, 4, 8, 5], flats: [5, 8, 4, 7, 3, 6, 2] }
};

function normalizeNotationKeySigId(raw) {
  if (!raw || raw === "C" || raw === "none") return "none";
  return Object.prototype.hasOwnProperty.call(NOTATION_KEY_SIGNATURES, raw) ? raw : "none";
}

function normalizeNotationKeyMode(raw) {
  if (!raw || raw === "C" || raw === "none") return "none";
  if (Object.prototype.hasOwnProperty.call(NOTATION_KEY_POOLS, raw)) return raw;
  return normalizeNotationKeySigId(raw);
}

function isNotationKeyPoolMode(keyMode = "none") {
  return Object.prototype.hasOwnProperty.call(NOTATION_KEY_POOLS, keyMode);
}

function resolveNotationKeySignatureId(keyMode = "none", excludeId = null) {
  const safeMode = normalizeNotationKeyMode(keyMode);
  if (safeMode === "none") return "none";
  if (isNotationKeyPoolMode(safeMode)) {
    const pool = NOTATION_KEY_POOLS[safeMode];
    const filtered = excludeId && pool.length > 1 ? pool.filter(id => id !== excludeId) : pool;
    const pickFrom = filtered.length > 0 ? filtered : pool;
    return pickFrom[Math.floor(Math.random() * pickFrom.length)];
  }
  return safeMode;
}

function getKeySignatureDef(keySigId = "none") {
  const safeId = normalizeNotationKeySigId(keySigId);
  return NOTATION_KEY_SIGNATURES[safeId] || NOTATION_KEY_SIGNATURES.none;
}

function getKeySignatureAlteredLetters(keySigId = "none") {
  const def = getKeySignatureDef(keySigId);
  if (def.type === "sharp") return NOTATION_SHARP_ORDER.slice(0, def.count);
  if (def.type === "flat") return NOTATION_FLAT_ORDER.slice(0, def.count);
  return [];
}

function getKeySignatureAccidentalForLetter(keySigId = "none", letter = "C") {
  const def = getKeySignatureDef(keySigId);
  if (def.type === "none" || !letter) return 0;
  const altered = getKeySignatureAlteredLetters(def.id);
  if (!altered.includes(letter)) return 0;
  return def.type === "sharp" ? 1 : -1;
}

function getNotationKeySignatureSteps(clefId = "treble", keySigId = "none") {
  const def = getKeySignatureDef(keySigId);
  if (def.type === "none" || def.count <= 0) return [];
  const stepTbl = NOTATION_KEY_SIG_STEPS[clefId] || NOTATION_KEY_SIG_STEPS.treble;
  const steps = def.type === "sharp" ? stepTbl.sharps : stepTbl.flats;
  const letters = getKeySignatureAlteredLetters(def.id);
  const acc = def.type === "sharp" ? 1 : -1;
  return letters.map((lt, idx) => ({
    letter: lt,
    accidental: acc,
    staffStep: steps[idx]
  }));
}

function getLocalizedNotationKeySigName(keySigId = "none", shortZero = false) {
  const safeId = normalizeNotationKeySigId(keySigId);
  if (safeId === "none") {
    return shortZero ? tr("C-Dur (0)", "C Maj (0)") : tr("Ohne (C-Dur)", "None (C Major)");
  }
  if (safeId === "Gb") {
    const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
    return tr(useIntl ? "G♭-Dur" : "Ges-Dur", "G♭ Major", { fr: "Sol♭ majeur", es: "Sol♭ mayor", pl: useIntl ? "G♭-dur" : "Ges-dur", uk: "Соль♭ мажор", ur: useIntl ? "G♭ میجر" : "Ges میجر" });
  }
  return getKeyDisplayName(safeId);
}

function getLocalizedNotationKeySigBadge(keySigId = "none", includeAccNames = false) {
  const def = getKeySignatureDef(keySigId);
  if (def.type === "none" || def.count === 0) return "0";
  const sym = def.type === "sharp" ? "♯" : "♭";
  const head = `${def.count}${sym}`;
  if (!includeAccNames) return head;
  const acc = def.type === "sharp" ? 1 : -1;
  const accList = getKeySignatureAlteredLetters(def.id)
    .map(lt => formatSpelledNotationNote(lt, acc, 4, false))
    .join(", ");
  return `${head}: ${accList}`;
}

function getLocalizedNotationKeyModeLabel(keyMode = "none", compact = false) {
  const mode = normalizeNotationKeyMode(keyMode);
  if (mode === "none") return getLocalizedNotationKeySigName("none", compact);
  if (mode === "easy") return compact ? tr("Tonarten 1–2 ♯/♭", "Keys 1–2 ♯/♭") : tr("Leicht (1–2 ♯/♭)", "Easy (1–2 ♯/♭)");
  if (mode === "medium") return compact ? tr("Tonarten 3–4 ♯/♭", "Keys 3–4 ♯/♭") : tr("Mittel (3–4 ♯/♭)", "Medium (3–4 ♯/♭)");
  if (mode === "hard") return compact ? tr("Tonarten 5–6 ♯/♭", "Keys 5–6 ♯/♭") : tr("Schwer (5–6 ♯/♭)", "Hard (5–6 ♯/♭)");
  if (mode === "all") return compact ? tr("Alle Tonarten", "All Keys") : tr("Alle 12 Tonarten (1–6 ♯/♭)", "All 12 Keys (1–6 ♯/♭)");
  return `${getLocalizedNotationKeySigName(mode)} (${getLocalizedNotationKeySigBadge(mode, false)})`;
}

function isNotationMode(mode = state?.settings?.mode) {
  return typeof mode === "string" && mode.startsWith("notation-");
}

function getNotationClefFromMode(mode = state?.settings?.mode) {
  if (mode === "notation-bass") return "bass";
  if (mode === "notation-alto") return "alto";
  if (mode === "notation-tenor") return "tenor";
  return "treble";
}

function getLocalizedNotationClefName(clefId) {
  const names = {
    treble: tr("Violinschlüssel", "Treble Clef"),
    bass:   tr("Bassschlüssel", "Bass Clef"),
    alto:   tr("Altschlüssel", "Alto Clef"),
    tenor:  tr("Tenorschlüssel", "Tenor Clef")
  };
  return names[clefId] || names.treble;
}

function getLocalizedNotationClefAnchorHint(clefId) {
  const hints = {
    treble: tr("G4 (g') • 2. Linie", "G4 • Line 2"),
    bass:   tr("F3 (f) • 4. Linie", "F3 • Line 4"),
    alto:   tr("C4 (c') • Mittellinie", "C4 • Center Line"),
    tenor:  tr("C4 (c') • 4. Linie", "C4 • Line 4")
  };
  return hints[clefId] || hints.treble;
}

function formatSpelledNotationNote(letter, accidental = 0, octave = 4, includeOctave = true) {
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  const safeLetter = NOTATION_LETTER_PC[letter] !== undefined ? letter : "C";
  const safeAcc = accidental > 0 ? 1 : (accidental < 0 ? -1 : 0);
  let base = "";
  if (useIntl) {
    const accSym = safeAcc === 1 ? "♯" : (safeAcc === -1 ? "♭" : "");
    base = `${safeLetter}${accSym}`;
  } else {
    base = (NOTATION_GERMAN_SPELLED[safeLetter] && NOTATION_GERMAN_SPELLED[safeLetter][String(safeAcc)]) || safeLetter;
  }
  return includeOctave ? `${base}${octave}` : base;
}

function getLedgerLinesForStep(staffStep) {
  if (!Number.isFinite(staffStep)) return [];
  if (staffStep <= -2) {
    return [-2, -4, -6].filter(s => s >= staffStep);
  }
  if (staffStep >= 10) {
    return [10, 12, 14].filter(s => s <= staffStep);
  }
  return [];
}

function getNotationLedgerDescription(staffStep) {
  const ledgers = getLedgerLinesForStep(staffStep);
  if (ledgers.length === 0) {
    if (staffStep === -1) return tr("Unter der 1. Linie", "Space below Line 1");
    if (staffStep === 9) return tr("Über der 5. Linie", "Space above Line 5");
    return tr("Im 5-Linien-System", "Inside the 5-line staff");
  }
  const n = ledgers.length;
  if (staffStep < 0) {
    return tf("{n}. Hilfslinie unten", "{n} ledger line(s) below", { n });
  }
  return tf("{n}. Hilfslinie oben", "{n} ledger line(s) above", { n });
}

function getNotationNoteFromStaffStep(clefId = "treble", staffStep = 4, accidental = 0, keySignatureId = "none", shownAccidental = undefined) {
  const clef = NOTATION_CLEFS[clefId] || NOTATION_CLEFS.treble;
  const clampedStep = Math.max(-7, Math.min(15, Math.round(staffStep)));
  const safeAcc = accidental > 0 ? 1 : (accidental < 0 ? -1 : 0);
  const safeKeySig = normalizeNotationKeySigId(keySignatureId);
  const diatonicIndex = clef.anchorDiatonicIndex + (clampedStep - clef.anchorStep);
  const octave = Math.floor(diatonicIndex / 7);
  const letterIdx = ((diatonicIndex % 7) + 7) % 7;
  const letter = NOTATION_LETTERS[letterIdx];
  const baseMidi = (octave + 1) * 12 + NOTATION_LETTER_PC[letter];
  const midi = baseMidi + safeAcc;
  const pc = ((midi % 12) + 12) % 12;
  const ledgerSteps = getLedgerLinesForStep(clampedStep);
  const keySigAcc = getKeySignatureAccidentalForLetter(safeKeySig, letter);

  let resolvedShownAcc = 0;
  if (shownAccidental !== undefined && shownAccidental !== null) {
    resolvedShownAcc = (shownAccidental === "nat" || shownAccidental === 2)
      ? "nat"
      : (shownAccidental > 0 ? 1 : (shownAccidental < 0 ? -1 : 0));
  } else if (safeKeySig === "none") {
    resolvedShownAcc = safeAcc;
  } else if (safeAcc === keySigAcc) {
    resolvedShownAcc = 0;
  } else if (safeAcc === 0 && keySigAcc !== 0) {
    resolvedShownAcc = "nat";
  } else {
    resolvedShownAcc = safeAcc;
  }

  return {
    clefId: clef.id,
    staffStep: clampedStep,
    letter: letter,
    accidental: safeAcc,
    keySignatureId: safeKeySig,
    keySigAccidental: keySigAcc,
    shownAccidental: resolvedShownAcc,
    octave: octave,
    midi: midi,
    pc: pc,
    noteName: midiToNote(midi),
    displayName: formatSpelledNotationNote(letter, safeAcc, octave, true),
    shortName: formatSpelledNotationNote(letter, safeAcc, octave, false),
    ledgerSteps: ledgerSteps,
    ledgerCount: ledgerSteps.length,
    ledgerDesc: getNotationLedgerDescription(clampedStep)
  };
}

function pickRandomNotationNoteItem(clefId, level = 1, prevItem = null, keySignatureId = "none") {
  const lvl = Math.max(1, Math.min(4, parseInt(level, 10) || 1));
  const cfg = NOTATION_LEVELS[lvl] || NOTATION_LEVELS[1];
  const safeKeySig = normalizeNotationKeySigId(keySignatureId);
  const hasKeySig = safeKeySig !== "none";
  const allSteps = [];
  for (let s = cfg.minStep; s <= cfg.maxStep; s++) {
    allSteps.push(s);
  }

  // Bei Stufe 3 & 4 die äußeren Hilfslinien etwas häufiger trainieren, statt fast immer in der Mitte zu bleiben
  let candidatePool = allSteps;
  if (lvl >= 3 && Math.random() < 0.56) {
    const outerSteps = allSteps.filter(s => s <= -2 || s >= 10);
    if (outerSteps.length > 0) candidatePool = outerSteps;
  }

  // Bei aktiver Tonart ~54% gezielt Töne wählen, die vom Generalvorzeichen verändert werden (sonst z. B. F# bei G-Dur zu selten)
  if (hasKeySig && Math.random() < 0.54) {
    const sigSteps = candidatePool.filter(s => {
      const probe = getNotationNoteFromStaffStep(clefId, s, 0);
      return getKeySignatureAccidentalForLetter(safeKeySig, probe.letter) !== 0;
    });
    if (sigSteps.length > 0) candidatePool = sigSteps;
  }

  for (let attempt = 0; attempt < 28; attempt++) {
    const step = candidatePool[Math.floor(Math.random() * candidatePool.length)];
    const probe = getNotationNoteFromStaffStep(clefId, step, 0);
    const keySigAcc = hasKeySig ? getKeySignatureAccidentalForLetter(safeKeySig, probe.letter) : 0;
    let acc = keySigAcc;

    if (hasKeySig) {
      if (cfg.allowAccidentals && Math.random() < 0.36) {
        if (keySigAcc !== 0) {
          acc = 0; // Auflösungszeichen (♮)
        } else {
          const accChoices = [];
          if (NOTATION_SHARP_ELIGIBLE.has(probe.letter)) accChoices.push(1);
          if (NOTATION_FLAT_ELIGIBLE.has(probe.letter)) accChoices.push(-1);
          if (accChoices.length > 0) {
            acc = accChoices[Math.floor(Math.random() * accChoices.length)];
          }
        }
      }
    } else if (cfg.allowAccidentals && Math.random() < 0.44) {
      const accChoices = [];
      if (NOTATION_SHARP_ELIGIBLE.has(probe.letter)) accChoices.push(1);
      if (NOTATION_FLAT_ELIGIBLE.has(probe.letter)) accChoices.push(-1);
      if (accChoices.length > 0) {
        acc = accChoices[Math.floor(Math.random() * accChoices.length)];
      }
    }

    const candidate = getNotationNoteFromStaffStep(clefId, step, acc, safeKeySig);
    const sameAsPrev = prevItem &&
      prevItem.clefId === candidate.clefId &&
      prevItem.staffStep === candidate.staffStep &&
      prevItem.accidental === candidate.accidental &&
      (prevItem.keySignatureId || "none") === candidate.keySignatureId;
    if (!sameAsPrev || attempt >= 22) {
      return candidate;
    }
  }
  const fbProbe = getNotationNoteFromStaffStep(clefId, 4, 0);
  const fbAcc = hasKeySig ? getKeySignatureAccidentalForLetter(safeKeySig, fbProbe.letter) : 0;
  return getNotationNoteFromStaffStep(clefId, 4, fbAcc, safeKeySig);
}

function getNotationClefGlyphSVG(clefId = "treble", x = 22, scale = 1, opacity = 1) {
  const opAttr = opacity < 1 ? ` opacity="${opacity}"` : "";
  if (clefId === "bass") {
    const by = scale === 1 ? "0" : (76 * (1 - scale)).toFixed(1);
    return `<g transform="translate(${(x - 22).toFixed(1)}, ${by}) scale(${scale})"${opAttr}>
      <circle cx="25" cy="76" r="4.1" fill="currentColor"/>
      <path d="M24.5 76 C23 67.5, 31 63.2, 37.5 66.2 C43.8 69.2, 43.2 84.5, 34 95 C28 102, 21.5 106, 17.5 108.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
      <circle cx="48" cy="70" r="2.4" fill="currentColor"/>
      <circle cx="48" cy="82" r="2.4" fill="currentColor"/>
    </g>`;
  }
  if (clefId === "alto" || clefId === "tenor") {
    const centerY = clefId === "tenor" ? 76 : 88;
    const cy = scale === 1 ? "0" : (centerY * (1 - scale)).toFixed(1);
    const topY = centerY - 24;
    const botY = centerY + 24;
    return `<g transform="translate(${(x - 20).toFixed(1)}, ${cy}) scale(${scale})"${opAttr}>
      <rect x="20" y="${topY}" width="4.4" height="48" rx="1" fill="currentColor"/>
      <line x1="27.5" y1="${topY}" x2="27.5" y2="${botY}" stroke="currentColor" stroke-width="1.7"/>
      <path d="M29 ${centerY} C32 ${centerY - 7}, 42.5 ${centerY - 6.5}, 43.5 ${centerY - 14.5} C44.5 ${centerY - 21}, 39 ${centerY - 24}, 33 ${centerY - 22.5} C30.5 ${centerY - 21.8}, 30 ${centerY - 19}, 32.5 ${centerY - 17.5}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M29 ${centerY} C32 ${centerY + 7}, 42.5 ${centerY + 6.5}, 43.5 ${centerY + 14.5} C44.5 ${centerY + 21}, 39 ${centerY + 24}, 33 ${centerY + 22.5} C30.5 ${centerY + 21.8}, 30 ${centerY + 19}, 32.5 ${centerY + 17.5}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
    </g>`;
  }
  // Violinschlüssel (G-Schlüssel: Spirale um 2. Linie G4 y = 100 / localY = 58, Bauch auf 1. Linie y = 112 / localY = 70, Bogendach an 3. Linie y = 88 / localY = 46, Kreuzung an 4. Linie y = 76 / localY = 34)
  const ty = scale === 1 ? "42" : (100 - 58 * scale).toFixed(1);
  return `<g transform="translate(${x.toFixed(1)}, ${ty}) scale(${scale})"${opAttr} fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17.6 59.2 C15.6 62.2, 12.0 61.8, 10.2 58.6 C8.0 54.2, 9.2 48.0, 13.6 46.8 C18.2 45.6, 23.2 49.2, 23.8 56.8 C24.4 64.2, 20.8 70.0, 14.4 70.0 C7.5 70.0, 2.9 63.2, 3.4 54.0 C3.8 44.2, 14.6 35.8, 18.8 21.0 C20.6 14.2, 20.0 4.8, 16.5 4.4 C13.7 4.0, 12.6 9.5, 12.8 17.5 L13.6 79.8 C13.8 86.0, 10.8 88.6, 7.8 88.0 C5.8 87.6, 4.8 85.6, 5.2 83.4" stroke-width="2.4"/>
    <circle cx="6.0" cy="82.8" r="2.35" fill="currentColor" stroke="none"/>
  </g>`;
}

function getNotationAccidentalGlyphSVG(accidental, x, y, scale = 1) {
  const scAttr = scale !== 1 ? ` scale(${scale})` : "";
  if (accidental === 1) {
    return `<g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})${scAttr}" stroke="currentColor" stroke-linecap="round">
      <line x1="-2.8" y1="-9" x2="-2.8" y2="9" stroke-width="1.5"/>
      <line x1="2.8" y1="-10" x2="2.8" y2="8" stroke-width="1.5"/>
      <line x1="-6" y1="-2.2" x2="6" y2="-4.2" stroke-width="2.3"/>
      <line x1="-6" y1="3.8" x2="6" y2="1.8" stroke-width="2.3"/>
    </g>`;
  }
  if (accidental === -1) {
    return `<g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})${scAttr}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <line x1="-2.5" y1="-13.5" x2="-2.5" y2="4.2" stroke-width="1.65"/>
      <path d="M-2.5 -0.8 C1.2 -3.6, 5.2 -1.8, 4.8 1.5 C4.3 4.2, 0.2 5.2, -2.5 4.2" stroke-width="1.9"/>
    </g>`;
  }
  if (accidental === "nat" || accidental === 2) {
    return `<g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})${scAttr}" stroke="currentColor" stroke-linecap="round">
      <line x1="-2.7" y1="-10.8" x2="-2.7" y2="5.4" stroke-width="1.55"/>
      <line x1="2.7" y1="-5.4" x2="2.7" y2="10.8" stroke-width="1.55"/>
      <line x1="-2.7" y1="-2.5" x2="2.7" y2="-4.1" stroke-width="2.15"/>
      <line x1="-2.7" y1="4.1" x2="2.7" y2="2.5" stroke-width="2.15"/>
    </g>`;
  }
  return "";
}

function notationStepToY(staffStep) {
  return 88 + (4 - staffStep) * 6;
}

/**
 * Gemeinsamer Notensystem-SVG-Renderer für Übungs-Warteschlange, Prüfungs-Rückschau und Wissensmodul.
 */
/**
 * Zeichnet einen Einzelton oder einen Akkord (item.chordTones) an Position nx.
 * Koordinaten im Einzelsystem (Linien y=64…112). Liefert Markup und Tinten-Grenzen.
 */
function buildNotationNoteGlyph(item, nx, opts = {}) {
  const tones = item?.isChord && Array.isArray(item.chordTones) && item.chordTones.length
    ? [...item.chordTones].sort((a, b) => a.staffStep - b.staffStep)
    : [item];
  const found = new Set((opts.foundPcs || []).map(Number));
  let minY = Infinity;
  let maxY = -Infinity;

  // Hilfslinien (Vereinigung aller Töne)
  const ledgerSteps = new Set();
  tones.forEach(t => getLedgerLinesForStep(t.staffStep).forEach(ls => ledgerSteps.add(ls)));

  // Sekunden im Akkord: oberen Notenkopf seitlich versetzen
  const headX = [];
  tones.forEach((t, i) => {
    const prev = i > 0 ? tones[i - 1] : null;
    const shifted = prev && (t.staffStep - prev.staffStep === 1) && headX[i - 1] === nx;
    headX.push(shifted ? nx + 12.6 : nx);
  });
  const hasShift = headX.some(x => x !== nx);
  const ledgerHalf = hasShift ? 19 : 12.5;
  const ledgerHtml = [...ledgerSteps].map(ls => {
    const ly = notationStepToY(ls);
    return `<line class="notation-ledger-line" x1="${nx - 12.5}" y1="${ly}" x2="${nx + ledgerHalf}" y2="${ly}"/>`;
  }).join("");

  // Vorzeichen: von oben nach unten, bei engem Abstand nach links gestaffelt
  let accHtml = "";
  let lastAccStep = null;
  let accCol = 0;
  [...tones].reverse().forEach(t => {
    const drawnAcc = t.shownAccidental !== undefined ? t.shownAccidental : t.accidental;
    if (!drawnAcc) return;
    const col = (lastAccStep !== null && lastAccStep - t.staffStep < 6) ? accCol + 1 : 0;
    const ty = notationStepToY(t.staffStep);
    accHtml += getNotationAccidentalGlyphSVG(drawnAcc, nx - 14.5 - col * 9, ty);
    const accTopY = drawnAcc === -1 ? (ty - 15) : (ty - 11);
    const accBotY = drawnAcc === -1 ? (ty + 7) : (ty + 11);
    minY = Math.min(minY, accTopY);
    maxY = Math.max(maxY, accBotY);
    lastAccStep = t.staffStep;
    accCol = col;
  });

  // Hals: Richtung nach mittlerer Lage; am äußeren Notenkopf angesetzt
  const lowY = notationStepToY(tones[0].staffStep);
  const highY = notationStepToY(tones[tones.length - 1].staffStep);
  const avgStep = tones.reduce((s, t) => s + t.staffStep, 0) / tones.length;
  const stemDown = avgStep >= 4;
  const stemX = stemDown ? (nx - 6.3) : (nx + 6.3);
  const stemY1 = stemDown ? (highY + 1) : (lowY - 1);
  const stemY2 = stemDown ? (lowY + 28) : (highY - 28);

  const headsHtml = tones.map((t, i) => {
    const ty = notationStepToY(t.staffStep);
    const hx = headX[i];
    minY = Math.min(minY, ty - 7);
    maxY = Math.max(maxY, ty + 7);
    const isFound = item?.isChord && found.has(Number(t.pc));
    const fill = isFound ? "var(--sage-strong, #2E6F4E)" : "currentColor";
    return `<ellipse${isFound ? ' class="notation-chord-found"' : ""} cx="${hx.toFixed(1)}" cy="${ty.toFixed(1)}" rx="7.0" ry="5.1" transform="rotate(-18 ${hx.toFixed(1)} ${ty.toFixed(1)})" fill="${fill}"/>`;
  }).join("");

  minY = Math.min(minY, stemDown ? stemY1 : stemY2 - 1);
  maxY = Math.max(maxY, stemDown ? stemY2 + 1 : stemY1);

  const html = `${ledgerHtml}
        ${accHtml}
        <line x1="${stemX.toFixed(1)}" y1="${stemY1.toFixed(1)}" x2="${stemX.toFixed(1)}" y2="${stemY2.toFixed(1)}" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
        ${headsHtml}`;
  return { html, minY, maxY };
}

const NOTATION_GRAND_STAFF_OFFSET = 96; // vertikaler Abstand Violin- → Bass-System (SVG-Einheiten)

/**
 * Doppelsystem (Klaviersystem): Violinschlüssel oben, Bassschlüssel unten, mit Klammer.
 * Noten tragen ihr clefId ("treble" | "bass") und werden im passenden System gezeichnet.
 */
function buildNotationGrandStaffSVG(notes, options = {}) {
  const list = Array.isArray(notes) ? notes : [notes].filter(Boolean);
  const off = NOTATION_GRAND_STAFF_OFFSET;
  const keySigId = normalizeNotationKeySigId(options.keySignatureId || "none");
  const trebleSig = getNotationKeySignatureSteps("treble", keySigId);
  const bassSig = getNotationKeySignatureSteps("bass", keySigId);
  const keySigCount = Math.max(trebleSig.length, bassSig.length);
  const width = Number(options.width) || (340 + (keySigCount > 0 ? Math.min(52, keySigCount * 8 + 4) : 0));
  const startX = 18;
  const endX = width - 8;
  const highlightFirst = options.highlightFirst !== false;

  const staffLines = (dy) => [0, 2, 4, 6, 8].map(st => {
    const ly = notationStepToY(st) + dy;
    return `<line class="notation-staff-line" x1="${startX}" y1="${ly}" x2="${endX}" y2="${ly}"/>`;
  }).join("");

  const topY = notationStepToY(8);
  const bottomY = notationStepToY(0) + off;
  const braceX = startX - 7;
  const midY = (topY + bottomY) / 2;
  const braceHtml = `
    <line x1="${startX}" y1="${topY}" x2="${startX}" y2="${bottomY}" stroke="currentColor" stroke-width="1.6"/>
    <path d="M ${braceX + 4} ${topY} C ${braceX - 3} ${topY + 18}, ${braceX + 3} ${midY - 18}, ${braceX - 3} ${midY} C ${braceX + 3} ${midY + 18}, ${braceX - 3} ${bottomY - 18}, ${braceX + 4} ${bottomY}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`;

  const clefX = startX + 10;
  const clefHtml = `${getNotationClefGlyphSVG("treble", clefX, 1, 1)}
    <g transform="translate(0 ${off})">${getNotationClefGlyphSVG("bass", clefX, 1, 1)}</g>`;

  const keySigPitch = keySigCount > 4 ? 9.5 : 10.5;
  const keySigStartX = startX + 46;
  const sigMarkup = (items) => items.map((ks, idx) =>
    getNotationAccidentalGlyphSVG(ks.accidental, keySigStartX + idx * keySigPitch, notationStepToY(ks.staffStep), 0.88)
  ).join("");
  const keySigHtml = keySigCount > 0
    ? `<g class="notation-keysig-layer">${sigMarkup(trebleSig)}<g transform="translate(0 ${off})">${sigMarkup(bassSig)}</g></g>`
    : "";
  const keySigRightEdge = keySigCount > 0 ? (keySigStartX + (keySigCount - 1) * keySigPitch + 8) : (startX + 46);

  let inkMinY = topY - 22;
  let inkMaxY = bottomY + 10;

  const firstNoteX = Math.max(startX + 74, Math.round(keySigRightEdge + 22));
  const spacing = list.length > 1
    ? Math.min(46, Math.max(30, Math.floor((endX - firstNoteX - 16) / Math.max(1, list.length - 1))))
    : 0;

  const notesHtml = list.map((item, idx) => {
    if (!item) return "";
    const nx = firstNoteX + idx * spacing;
    const dy = item.clefId === "bass" ? off : 0;
    const isTarget = highlightFirst && idx === 0;
    const glyph = buildNotationNoteGlyph(item, nx, { foundPcs: isTarget ? options.foundPcs : null });
    inkMinY = Math.min(inkMinY, glyph.minY + dy);
    inkMaxY = Math.max(inkMaxY, glyph.maxY + dy);
    const fadeOp = isTarget ? 1 : Math.max(0.64, 0.78 - idx * 0.028);
    return `<g class="notation-note-group ${isTarget ? "is-target" : "is-upcoming"}" opacity="${fadeOp.toFixed(2)}" transform="translate(0 ${dy})">${glyph.html}</g>`;
  }).join("");

  const vbTop = Math.floor(inkMinY - 4);
  const vbHeight = Math.ceil(inkMaxY + 4) - vbTop;
  return `<svg class="${options.className || "notation-staff-svg"} is-grand-staff" viewBox="0 ${vbTop} ${width} ${vbHeight}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(options.ariaLabel || tr("Doppelsystem (Violin- und Bassschlüssel)", "Grand staff (treble and bass clef)"))}">
    ${staffLines(0)}
    ${staffLines(off)}
    ${braceHtml}
    ${clefHtml}
    ${keySigHtml}
    <g class="notation-notes-layer${options.didShift ? " did-shift" : ""}">
      ${notesHtml}
    </g>
  </svg>`;
}

function buildNotationStaffSVG(notes, options = {}) {
  const list = Array.isArray(notes) ? notes : [notes].filter(Boolean);
  const firstClef = options.clefId || list[0]?.clefId || "treble";
  const keySigId = normalizeNotationKeySigId(options.keySignatureId !== undefined ? options.keySignatureId : (list[0]?.keySignatureId || "none"));
  const keySigItems = getNotationKeySignatureSteps(firstClef, keySigId);
  const keySigCount = keySigItems.length;
  const isExerciseStaff = options.level != null;
  const isChordStaff = Boolean(options.isChordStaff || (list.length > 0 && list.some(it => it?.isChord)));
  const defaultWidth = isExerciseStaff
    ? ((isChordStaff && list.length > 1 ? 356 : 320) + (keySigCount > 0 ? Math.min(52, keySigCount * 8 + 4) : 0))
    : 360;
  const width = Number(options.width) || defaultWidth;
  const height = Number(options.height) || 176;
  const startX = Number(options.startX) || (isExerciseStaff ? 8 : 12);
  const endX = width - (isExerciseStaff ? 8 : 10);
  const highlightFirst = options.highlightFirst !== false;
  const highlightAll = Boolean(options.highlightAll);
  const showChangeClefs = options.showChangeClefs !== false;
  const didShift = Boolean(options.didShift);
  const clsName = options.className || "notation-staff-svg";

  const getClefYBounds = (cId, sc = 1) => {
    if (cId === "bass") return [62, 111];
    if (cId === "alto" || cId === "tenor") {
      return cId === "tenor" ? [51, 101] : [63, 113];
    }
    return [42 + 4 * sc, 42 + 88 * sc];
  };

  let [inkMinY, inkMaxY] = getClefYBounds(firstClef, 1);
  inkMinY = Math.min(inkMinY, 64);
  inkMaxY = Math.max(inkMaxY, 112);

  // Fünf Stammlinien (Schritt 0, 2, 4, 6, 8)
  const staffLinesHtml = [0, 2, 4, 6, 8].map(st => {
    const ly = notationStepToY(st);
    return `<line class="notation-staff-line" x1="${startX}" y1="${ly}" x2="${endX}" y2="${ly}"/>`;
  }).join("");

  // Optionale Anker-Linien-Betonung (z. B. für Erklärgrafiken im Wissensmodul)
  const anchorStep = (NOTATION_CLEFS[firstClef] || NOTATION_CLEFS.treble).anchorStep;
  const anchorHighlightHtml = options.highlightAnchorLine
    ? `<line x1="${startX}" y1="${notationStepToY(anchorStep)}" x2="${endX}" y2="${notationStepToY(anchorStep)}" stroke="var(--peach-strong)" stroke-width="2.1" opacity="0.68"/>`
    : "";

  const clefMarkup = getNotationClefGlyphSVG(firstClef, startX + (isExerciseStaff ? 8 : 10), 1, 1);

  // Generalvorzeichen direkt rechts neben dem Notenschlüssel rendern
  const keySigPitch = keySigCount > 4 ? 9.5 : 10.5;
  const keySigScale = isExerciseStaff || options.compact ? 0.88 : 0.92;
  const keySigStartX = startX + (isExerciseStaff ? 44 : 46);
  const keySigMarkup = keySigItems.map((ks, idx) => {
    const kx = keySigStartX + idx * keySigPitch;
    const ky = notationStepToY(ks.staffStep);
    inkMinY = Math.min(inkMinY, ks.accidental === -1 ? (ky - 13) : (ky - 10));
    inkMaxY = Math.max(inkMaxY, ky + 9);
    return getNotationAccidentalGlyphSVG(ks.accidental, kx, ky, keySigScale);
  }).join("");
  const keySigRightEdge = keySigCount > 0 ? (keySigStartX + (keySigCount - 1) * keySigPitch + 8) : (startX + 46);

  // X-Koordinaten pro Note berechnen
  let positions = Array.isArray(options.xPositions) ? options.xPositions : null;
  if (!positions && list.length > 0) {
    if (list.length === 1) {
      const minSingleX = keySigCount > 0 ? Math.round(keySigRightEdge + 22) : Math.round(width * 0.56);
      const baseSingleX = Number(options.firstNoteX) || Math.round(width * 0.56);
      positions = [Math.min(endX - 18, Math.max(baseSingleX, minSingleX))];
    } else {
      const chordPad = isChordStaff ? 14 : 0;
      const minMultiX = keySigCount > 0 ? Math.round(keySigRightEdge + 20 + (isChordStaff ? 8 : 0)) : (startX + (isExerciseStaff ? 68 + chordPad : 86));
      const firstNoteX = Math.max(Number(options.firstNoteX) || (startX + (isExerciseStaff ? 68 + chordPad : 86)), minMultiX);
      const maxSpace = isChordStaff ? 60 : 46;
      const minSpace = isChordStaff ? 42 : 30;
      const spacing = Number(options.noteSpacing) || (isExerciseStaff
        ? Math.min(maxSpace, Math.max(minSpace, Math.floor((endX - firstNoteX - 18) / Math.max(1, list.length - 1))))
        : Math.min(48, Math.max(34, Math.floor((endX - firstNoteX - 18) / Math.max(1, list.length - 1)))));
      positions = list.map((_, i) => firstNoteX + i * spacing);
    }
  } else if (!positions) {
    positions = [];
  }

  const notesHtml = list.map((item, idx) => {
    if (!item) return "";
    const nx = positions[idx] || (startX + 86 + idx * 46);
    const ny = notationStepToY(item.staffStep);
    const isTarget = highlightAll || (highlightFirst && idx === 0);
    const prevClef = idx > 0 ? list[idx - 1]?.clefId : firstClef;

    let changeClefHtml = "";
    if (showChangeClefs && idx > 0 && item.clefId && prevClef && item.clefId !== prevClef) {
      changeClefHtml = getNotationClefGlyphSVG(item.clefId, nx - 27, 0.72, 0.78);
      const [cMin, cMax] = getClefYBounds(item.clefId, 0.72);
      inkMinY = Math.min(inkMinY, cMin);
      inkMaxY = Math.max(inkMaxY, cMax);
    }

    const glyph = buildNotationNoteGlyph(item, nx, { foundPcs: isTarget ? options.foundPcs : null });
    inkMinY = Math.min(inkMinY, glyph.minY, ny - 7);
    inkMaxY = Math.max(inkMaxY, glyph.maxY, ny + 7);

    // Realistische Notenschrift ohne Einrahmung: aktive Note vorn leicht klarer (1.0), Folge-Noten minimal ruhiger
    const fadeOp = isTarget ? 1 : Math.max(0.64, 0.78 - idx * 0.028);
    const grpClass = `notation-note-group ${isTarget ? "is-target" : "is-upcoming"}`;

    return `${changeClefHtml}
      <g class="${grpClass}" opacity="${fadeOp.toFixed(2)}">
        ${glyph.html}
        ${options.showLabels ? `<text x="${nx.toFixed(1)}" y="170" text-anchor="middle" font-size="10.5" font-weight="800" fill="currentColor">${escapeHtml(options.labelShort ? item.shortName : item.displayName)}</text>` : ""}
      </g>`;
  }).join("");

  let vbTop = 0;
  let vbHeight = height;
  if (options.level != null || options.compact) {
    const isEmptyCompact = Boolean(options.compact && list.length === 0);
    const lvl = Number(options.level) || 1;
    const padY = isEmptyCompact ? 2 : 4;
    const baseTop = isEmptyCompact ? 44 : (lvl <= 1 ? 26 : lvl === 2 ? 18 : 6);
    const baseBottom = isEmptyCompact ? 132 : (lvl <= 1 ? 148 : lvl === 2 ? 156 : 168);
    vbTop = Math.min(baseTop, Math.floor(inkMinY - padY));
    const vbBottom = Math.max(baseBottom, Math.ceil(inkMaxY + padY), options.showLabels ? 176 : 0);
    vbHeight = vbBottom - vbTop;
  }

  return `<svg class="${clsName}" viewBox="0 ${vbTop} ${width} ${vbHeight}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(options.ariaLabel || tr("Notensystem", "Musical staff"))}">
    ${staffLinesHtml}
    ${anchorHighlightHtml}
    ${clefMarkup}
    ${keySigMarkup ? `<g class="notation-keysig-layer">${keySigMarkup}</g>` : ""}
    <g class="notation-notes-layer${didShift ? " did-shift" : ""}">
      ${notesHtml}
    </g>
  </svg>`;
}

function buildNotationMiniStaffSVG(snapshot) {
  if (!snapshot) return "";
  const snapKeySig = normalizeNotationKeySigId(snapshot.keySignatureId || "none");
  const clefId = snapshot.clefId || "treble";
  let item = null;
  if (snapshot.isChord && Array.isArray(snapshot.chordTonesSpec) && snapshot.chordTonesSpec.length > 0) {
    const tones = snapshot.chordTonesSpec.map(sp =>
      getNotationNoteFromStaffStep(
        clefId,
        Number.isFinite(Number(sp.step)) ? Number(sp.step) : 4,
        Number(sp.acc) || 0,
        snapKeySig,
        sp.shownAcc
      )
    );
    item = { ...tones[0], isChord: true, chordTones: tones };
  } else {
    item = getNotationNoteFromStaffStep(
      clefId,
      Number.isFinite(Number(snapshot.staffStep)) ? Number(snapshot.staffStep) : 4,
      Number(snapshot.accidental) || 0,
      snapKeySig,
      snapshot.shownAccidental
    );
  }
  return buildNotationStaffSVG([item], {
    clefId: item.clefId,
    keySignatureId: snapKeySig,
    width: 220,
    height: 176,
    firstNoteX: 132,
    highlightFirst: true,
    showChangeClefs: false,
    isChordStaff: Boolean(item.isChord),
    className: "notation-mini-staff-svg"
  });
}

function buildNotationKnowledgeStaffSVG(clefId, stepsOrSpecs, options = {}) {
  const keySigId = normalizeNotationKeySigId(options.keySignatureId || "none");
  const list = (Array.isArray(stepsOrSpecs) ? stepsOrSpecs : [stepsOrSpecs]).map(entry => {
    if (typeof entry === "number") {
      const defAcc = keySigId !== "none"
        ? getKeySignatureAccidentalForLetter(keySigId, getNotationNoteFromStaffStep(clefId, entry, 0).letter)
        : 0;
      return getNotationNoteFromStaffStep(clefId, entry, defAcc, keySigId);
    }
    return getNotationNoteFromStaffStep(clefId, entry.step ?? 4, entry.accidental ?? 0, keySigId, entry.shownAccidental);
  });
  return buildNotationStaffSVG(list, {
    clefId: clefId,
    keySignatureId: keySigId,
    width: options.width || 300,
    height: options.height || 176,
    startX: 10,
    firstNoteX: list.length === 1 ? 160 : (keySigId !== "none" ? 114 : 88),
    noteSpacing: options.noteSpacing || 48,
    highlightFirst: false,
    highlightAll: Boolean(options.highlightAll),
    highlightAnchorLine: Boolean(options.highlightAnchorLine),
    showLabels: options.showLabels !== false,
    labelShort: Boolean(options.labelShort),
    className: options.className || "notation-knowledge-svg"
  });
}

const SOLFEGE_SCALE_STEPS = [
  { key: "Do_low",  syllable: "Do",  label: "Grundton (Do)",       semitones: 0,  resolveOffsets: [0] },
  { key: "Re",      syllable: "Re",  label: "2. Stufe (Re → Do)",  semitones: 2,  resolveOffsets: [2, 0] },
  { key: "Mi",      syllable: "Mi",  label: "3. Stufe (Mi → Do)",  semitones: 4,  resolveOffsets: [4, 2, 0] },
  { key: "Fa",      syllable: "Fa",  label: "4. Stufe (Fa → Do)",  semitones: 5,  resolveOffsets: [5, 4, 2, 0] },
  { key: "Sol",     syllable: "Sol", label: "5. Stufe (Sol → Do)", semitones: 7,  resolveOffsets: [7, 9, 11, 12] },
  { key: "La",      syllable: "La",  label: "6. Stufe (La → Do)",  semitones: 9,  resolveOffsets: [9, 11, 12] },
  { key: "Ti",      syllable: "Ti",  label: "7. Stufe (Ti → Do)",  semitones: 11, resolveOffsets: [11, 12] },
  { key: "Do_high", syllable: "Do",  label: "Obere Tonika (Do)",   semitones: 12, resolveOffsets: [12] }
];

const SOLFEGE_MINOR_SCALE_STEPS = [
  { key: "Do_low",  syllable: "Do",  label: "Grundton (Do)",        semitones: 0,  resolveOffsets: [0] },
  { key: "Re",      syllable: "Re",  label: "2. Stufe (Re → Do)",   semitones: 2,  resolveOffsets: [2, 0] },
  { key: "Me",      syllable: "Me",  label: "b3. Stufe (Me → Do)",  semitones: 3,  resolveOffsets: [3, 2, 0] },
  { key: "Fa",      syllable: "Fa",  label: "4. Stufe (Fa → Do)",   semitones: 5,  resolveOffsets: [5, 3, 2, 0] },
  { key: "Sol",     syllable: "Sol", label: "5. Stufe (Sol → Do)",  semitones: 7,  resolveOffsets: [7, 8, 10, 12] },
  { key: "Le",      syllable: "Le",  label: "b6. Stufe (Le → Do)",  semitones: 8,  resolveOffsets: [8, 10, 12] },
  { key: "Te",      syllable: "Te",  label: "b7. Stufe (Te → Do)",  semitones: 10, resolveOffsets: [10, 12] },
  { key: "Do_high", syllable: "Do",  label: "Obere Tonika (Do)",    semitones: 12, resolveOffsets: [12] }
];

function getSolfegeScaleSteps(tonality = "major") {
  return tonality === "minor" ? SOLFEGE_MINOR_SCALE_STEPS : SOLFEGE_SCALE_STEPS;
}

const MELODY_RANGE_CONFIG = {
  "do-fa":  { label: "Do–Fa",        semitones: [0, 2, 4, 5],               badge: "Do–Fa" },
  "sol-do": { label: "Sol–Do",       semitones: [7, 9, 11, 12],             badge: "Sol–Do" },
  "full":   { label: "Ganze Tonart", semitones: [0, 2, 4, 5, 7, 9, 11, 12], badge: "Do–Do" }
};

const MELODY_RHYTHM_VALUES = {
  eighth:        { key: "eighth",        beats: 0.5, short: "1/8",  symbol: "♪",  de: "Achtel",         en: "Eighth" },
  quarter:       { key: "quarter",       beats: 1.0, short: "1/4",  symbol: "♩",  de: "Viertel",        en: "Quarter" },
  dottedQuarter: { key: "dottedQuarter", beats: 1.5, short: "1/4.", symbol: "♩.", de: "Punkt. Viertel", en: "Dotted 1/4" },
  half:          { key: "half",          beats: 2.0, short: "1/2",  symbol: "𝅗𝅥",  de: "Halbe",          en: "Half" }
};

const MELODY_RHYTHM_ORDER = ["eighth", "quarter", "dottedQuarter", "half"];

function getLocalizedMelodyRhythmValue(key) {
  const def = MELODY_RHYTHM_VALUES[key] || MELODY_RHYTHM_VALUES.quarter;
  return { ...def, label: tr(def.de, def.en) };
}

function getMelodyNoteValueSVG(rhythmKey, width = 18, height = 18) {
  let body = "";
  const filledHead = `<ellipse cx="8" cy="14" rx="3.4" ry="2.3" transform="rotate(-18 8 14)" fill="currentColor"/>`;
  const hollowHead = `<ellipse cx="8" cy="14" rx="3.4" ry="2.3" transform="rotate(-18 8 14)" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
  const stem = `<line x1="11" y1="13.5" x2="11" y2="2.5" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/>`;
  if (rhythmKey === "eighth") {
    body = filledHead + stem + `<path d="M11 2.5 C15 4.2 16 7.5 14 10" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" fill="none"/>`;
  } else if (rhythmKey === "dottedQuarter") {
    body = filledHead + stem + `<circle cx="14.5" cy="14.2" r="1.55" fill="currentColor"/>`;
  } else if (rhythmKey === "half") {
    body = hollowHead + stem;
  } else {
    body = filledHead + stem;
  }
  return `<svg class="melody-note-svg" width="${width}" height="${height}" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
}

function getMelodyRestSVG(width = 11, height = 14) {
  return `<svg class="melody-note-svg" width="${width}" height="${height}" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 3 L9 7 L5 10.5 L9 14.5 C6 14.5 4.5 16 6.5 17.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
}

const MELODY_PHRASE_TEMPLATES = [
  // 4-Ton-Phrasen (ohne Pause, sowohl für Rhythmic als auch Dictation)
  { id: "p4_44_song1", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 1.5, rhythm: "dottedQuarter" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 3.0, beats: 1.0, rhythm: "quarter" }
  ] },
  { id: "p4_44_run1", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 1.0, rhythm: "quarter" },
    { offset: 1.0, beats: 0.5, rhythm: "eighth" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p4_44_lift1", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 0.5, rhythm: "eighth" },
    { offset: 0.5, beats: 0.5, rhythm: "eighth" },
    { offset: 1.0, beats: 1.0, rhythm: "quarter" },
    { offset: 2.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p4_44_sync1", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 0.5, rhythm: "eighth" },
    { offset: 0.5, beats: 1.0, rhythm: "quarter" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p4_44_breath1", meter: "4/4", beatsPerBar: 4, totalBeats: 8, hasRest: true, steps: [
    { offset: 0.0, beats: 1.0, rhythm: "quarter" },
    { offset: 1.0, beats: 2.0, rhythm: "half" },
    { offset: 4.0, beats: 2.0, rhythm: "half", restBefore: 1.0 },
    { offset: 6.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p4_34_sarabande", meter: "3/4", beatsPerBar: 3, totalBeats: 6, hasRest: false, steps: [
    { offset: 0.0, beats: 2.0, rhythm: "half" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 3.0, beats: 1.0, rhythm: "quarter" },
    { offset: 4.0, beats: 2.0, rhythm: "half" }
  ] },

  // 5-Ton-Phrasen
  { id: "p5_44_flow1", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 1.0, rhythm: "quarter" },
    { offset: 1.0, beats: 0.5, rhythm: "eighth" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 3.0, beats: 1.0, rhythm: "quarter" }
  ] },
  { id: "p5_44_drive", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 0.5, rhythm: "eighth" },
    { offset: 0.5, beats: 0.5, rhythm: "eighth" },
    { offset: 1.0, beats: 0.5, rhythm: "eighth" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p5_44_arc", meter: "4/4", beatsPerBar: 4, totalBeats: 8, hasRest: false, steps: [
    { offset: 0.0, beats: 1.5, rhythm: "dottedQuarter" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 2.0, rhythm: "half" },
    { offset: 4.0, beats: 2.0, rhythm: "half" },
    { offset: 6.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p5_44_pausePhrase", meter: "4/4", beatsPerBar: 4, totalBeats: 8, hasRest: true, steps: [
    { offset: 0.0, beats: 1.5, rhythm: "dottedQuarter" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 4.0, beats: 2.0, rhythm: "half", restBefore: 1.0 },
    { offset: 6.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p5_34_waltz", meter: "3/4", beatsPerBar: 3, totalBeats: 6, hasRest: false, steps: [
    { offset: 0.0, beats: 1.5, rhythm: "dottedQuarter" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 3.0, beats: 1.0, rhythm: "quarter" },
    { offset: 4.0, beats: 2.0, rhythm: "half" }
  ] },

  // 6-Ton-Phrasen
  { id: "p6_44_qa", meter: "4/4", beatsPerBar: 4, totalBeats: 8, hasRest: false, steps: [
    { offset: 0.0, beats: 1.0, rhythm: "quarter" },
    { offset: 1.0, beats: 0.5, rhythm: "eighth" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 2.0, rhythm: "half" },
    { offset: 4.0, beats: 2.0, rhythm: "half" },
    { offset: 6.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p6_44_chant", meter: "4/4", beatsPerBar: 4, totalBeats: 8, hasRest: true, steps: [
    { offset: 0.0, beats: 1.0, rhythm: "quarter" },
    { offset: 1.0, beats: 1.0, rhythm: "quarter" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 4.0, beats: 1.5, rhythm: "dottedQuarter", restBefore: 1.0 },
    { offset: 5.5, beats: 0.5, rhythm: "eighth" },
    { offset: 6.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p6_44_eighths", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 1.0, rhythm: "quarter" },
    { offset: 1.0, beats: 0.5, rhythm: "eighth" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 0.5, rhythm: "eighth" },
    { offset: 2.5, beats: 0.5, rhythm: "eighth" },
    { offset: 3.0, beats: 1.0, rhythm: "quarter" }
  ] },
  { id: "p6_34_song", meter: "3/4", beatsPerBar: 3, totalBeats: 6, hasRest: false, steps: [
    { offset: 0.0, beats: 1.5, rhythm: "dottedQuarter" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 3.0, beats: 0.5, rhythm: "eighth" },
    { offset: 3.5, beats: 0.5, rhythm: "eighth" },
    { offset: 4.0, beats: 2.0, rhythm: "half" }
  ] }
];

function pickMelodyPhraseTemplate(range, style) {
  if (style === "steady") {
    return {
      id: "steady_4_half",
      meter: "4/4",
      beatsPerBar: 4,
      totalBeats: 8,
      hasRest: false,
      steps: [
        { offset: 0, beats: 2, rhythm: "half" },
        { offset: 2, beats: 2, rhythm: "half" },
        { offset: 4, beats: 2, rhythm: "half" },
        { offset: 6, beats: 2, rhythm: "half" }
      ]
    };
  }
  const allowedCounts = range === "do-fa" ? [4, 5] : [4, 5, 6];
  const allowRests = style !== "dictation";
  const candidates = MELODY_PHRASE_TEMPLATES.filter(t =>
    allowedCounts.includes(t.steps.length) && (allowRests || !t.hasRest)
  );
  const pool = candidates.length > 0 ? candidates : MELODY_PHRASE_TEMPLATES;
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateMusicalMelodySteps(pool, template, isMultiOctave, rootMidi) {
  const count = template.steps.length;
  const maxIdx = pool.length - 1;
  const pickWeightedIdx = (items) => {
    const totalW = items.reduce((s, x) => s + x.w, 0);
    let r = Math.random() * totalW;
    for (let i = 0; i < items.length; i++) {
      r -= items[i].w;
      if (r <= 0) return items[i].idx;
    }
    return items[items.length - 1].idx;
  };

  // Startton: stabiler Ruheton im Tonvorrat (Do, Mi, Sol, Do2) bevorzugt
  const anchorKeys = new Set(["Do", "Mi", "Sol", "Do2"]);
  const startCandidates = pool.map((st, idx) => ({
    idx,
    w: anchorKeys.has(st.key) ? 3.2 : 1.0
  }));
  const indices = [pickWeightedIdx(startCandidates)];
  let lastMove = 0;

  for (let i = 1; i < count; i++) {
    const prevIdx = indices[i - 1];
    const stepTiming = template.steps[i];
    const isLast = i === count - 1;
    const isFast = stepTiming.beats <= 0.5;
    const candidates = [];

    for (let cIdx = 0; cIdx <= maxIdx; cIdx++) {
      const diff = cIdx - prevIdx;
      const absDiff = Math.abs(diff);
      let w = 0.3;

      if (absDiff === 0) {
        // Tonwiederholungen besonders auf schnellen Achteln musikalisch natürlich, sonst sparsam
        w = isFast && i < count - 1 ? 1.8 : 0.45;
      } else if (absDiff === 1) {
        // Stufenweise Sekund-Bewegung bildet das Rückgrat singbarer Melodien
        w = 4.6;
        if (Math.abs(lastMove) >= 2 && Math.sign(diff) !== Math.sign(lastMove)) {
          w *= 1.85; // Gegenbewegung nach Sprung
        }
      } else if (absDiff === 2) {
        // Terzsprung
        w = 2.1;
        if (Math.abs(lastMove) >= 2 && Math.sign(diff) === Math.sign(lastMove)) {
          w *= 0.45;
        }
      } else if (absDiff === 3) {
        w = 0.9;
      } else {
        w = 0.35;
      }

      // Phrasenschluss: ruhende Endung (Do, Mi, Sol) oder offener Halbschluss (Re, Sol) bevorzugen
      if (isLast) {
        const key = pool[cIdx].key;
        if (key === "Do" || key === "Do2" || key === "Sol") w *= 2.4;
        else if (key === "Mi" || key === "Re") w *= 1.5;
        if (absDiff === 0 && stepTiming.beats >= 1.5) w *= 0.35;
      }

      candidates.push({ idx: cIdx, w });
    }

    const pickedIdx = pickWeightedIdx(candidates);
    lastMove = pickedIdx - prevIdx;
    indices.push(pickedIdx);
  }

  // Sicherstellen, dass nicht alle Töne identisch sind
  if (pool.length > 1 && indices.every(idx => idx === indices[0])) {
    indices[count - 1] = indices[0] > 0 ? indices[0] - 1 : 1;
  }

  // Mehr-Oktav-Modus: zusammenhängende Register-Abschnitte statt wildem Zickzack
  const octaveShifts = new Array(count).fill(0);
  if (isMultiOctave) {
    const regChoices = [-12, 0, 12];
    let curShift = regChoices[Math.floor(Math.random() * regChoices.length)];
    for (let i = 0; i < count; i++) {
      const valid = getValidOctaveShifts(rootMidi + pool[indices[i]].semitones);
      if (!valid.includes(curShift)) {
        curShift = valid.includes(0) ? 0 : valid[0];
      }
      // Optionale Register-Verlagerung an einer Phrasenmitte / Auftaktstelle
      if (i === Math.floor(count / 2) && Math.random() < 0.72) {
        const alt = valid.filter(s => s !== curShift);
        if (alt.length > 0) curShift = alt[Math.floor(Math.random() * alt.length)];
      }
      octaveShifts[i] = curShift;
    }
    if (octaveShifts.every(s => s === 0)) {
      const idx = Math.floor(Math.random() * count);
      const nonZero = getValidOctaveShifts(rootMidi + pool[indices[idx]].semitones).filter(s => s !== 0);
      if (nonZero.length > 0) {
        octaveShifts[idx] = nonZero[Math.floor(Math.random() * nonZero.length)];
      }
    }
  }

  return indices.map((poolIdx, i) => ({
    step: pool[poolIdx],
    octaveShift: octaveShifts[i]
  }));
}

function buildContextCadenceBars(rootMidi, tonality = "major") {
  const degKeys = tonality === "minor" ? ["i", "VI", "iv", "V"] : ["I", "vi", "IV", "V"];
  return degKeys.map(degKey => {
    const def = getLocalizedDegreeDef(degKey);
    const n = buildChordNotes(rootMidi, def);
    return {
      key: degKey,
      symbol: def.roman,
      label: def.label,
      short: def.short,
      notes: n.chordNotes,
      bass: n.bassNote
    };
  });
}

function getValidOctaveShifts(keyboardMidi, minMidi = 45, maxMidi = 84) {
  return [-12, 0, 12].filter(shift => {
    const m = keyboardMidi + shift;
    return m >= minMidi && m <= maxMidi;
  });
}

function midiToNote(midi) {
  const octave = Math.floor(midi / 12) - 1;
  const name = NOTE_NAMES[((midi % 12) + 12) % 12];
  return `${name}${octave}`;
}

const GERMAN_SHARP_NAMES = ["C", "Cis", "D", "Dis", "E", "F", "Fis", "G", "Gis", "A", "B", "H"];
const GERMAN_FLAT_NAMES  = ["C", "Des", "D", "Es",  "E", "F", "Ges", "G", "As",  "A", "B", "H"];
const INTL_SHARP_NAMES   = ["C", "C#",  "D", "D#",  "E", "F", "F#",  "G", "G#",  "A", "A#", "B"];
const INTL_FLAT_NAMES    = ["C", "Db",  "D", "Eb",  "E", "F", "Gb",  "G", "Ab",  "A", "Bb", "B"];
const FLAT_KEYS = new Set(["F", "Bb", "Eb", "Ab", "Db"]);
const MINOR_INTERVAL_KEYS = new Set(["m2", "m3", "m6", "m7", "m9"]);

function midiToGermanNote(midi, preferFlat = false) {
  const octave = Math.floor(midi / 12) - 1;
  const pc = ((midi % 12) + 12) % 12;
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  const names = useIntl
    ? (preferFlat ? INTL_FLAT_NAMES : INTL_SHARP_NAMES)
    : (preferFlat ? GERMAN_FLAT_NAMES : GERMAN_SHARP_NAMES);
  return `${names[pc]}${octave}`;
}

const HARMONIC_DATA = {
  roots: {
    "C":  { midi: 60, name: "C-Dur" },
    "G":  { midi: 67, name: "G-Dur" },
    "D":  { midi: 62, name: "D-Dur" },
    "F":  { midi: 65, name: "F-Dur" },
    "Bb": { midi: 58, name: "B-Dur" },
    "Eb": { midi: 63, name: "Es-Dur" },
    "Ab": { midi: 56, name: "As-Dur" },
    "A":  { midi: 57, name: "A-Dur" },
    "E":  { midi: 64, name: "E-Dur" },
    "B":  { midi: 59, name: "H-Dur" },
    "F#": { midi: 66, name: "Fis-Dur" },
    "Db": { midi: 61, name: "Des-Dur" }
  },

  degrees: {
    "I":     { roman: "I",     label: "Tonika",           short: "Tonika",     semitones: 0,  type: "maj",  bassOffset: 0 },
    "I7":    { roman: "I7",    label: "Tonika-Dom.7",     short: "I7",         semitones: 0,  type: "dom7", bassOffset: 0 },
    "Imaj7": { roman: "Imaj7", label: "Tonika-Maj7",      short: "Imaj7",      semitones: 0,  type: "maj7", bassOffset: 0 },
    "ii":    { roman: "ii",    label: "Moll-Subdom.",     short: "ii (Moll)",  semitones: 2,  type: "min",  bassOffset: 2 },
    "iii":   { roman: "iii",   label: "Moll-Mediante",    short: "iii (Moll)", semitones: 4,  type: "min",  bassOffset: 4 },
    "III7":  { roman: "III7",  label: "Zwischendom. III", short: "III7",       semitones: 4,  type: "dom7", bassOffset: 4 },
    "IV":    { roman: "IV",    label: "Subdominante",     short: "Subdom.",    semitones: 5,  type: "maj",  bassOffset: 5 },
    "IV7":   { roman: "IV7",   label: "Subdom.-Dom.7",    short: "IV7",        semitones: 5,  type: "dom7", bassOffset: 5 },
    "iv":    { roman: "iv",    label: "Moll-Subdom.",     short: "iv (Moll)",  semitones: 5,  type: "min",  bassOffset: 5 },
    "V":     { roman: "V",     label: "Dominante",        short: "Dominante",  semitones: 7,  type: "maj",  bassOffset: 7 },
    "V7":    { roman: "V7",    label: "Dominant-7",       short: "Dom. 7",     semitones: 7,  type: "dom7", bassOffset: 7 },
    "Vsus4": { roman: "Vsus4", label: "Dom.-Vorhalt",     short: "Vsus4",      semitones: 7,  type: "sus4", bassOffset: 7 },
    "vi":    { roman: "vi",    label: "Moll-Parallele",   short: "Moll-Par.",  semitones: 9,  type: "min",  bassOffset: 9 },
    "bVI":   { roman: "bVI",   label: "Modal-bVI",        short: "bVI",        semitones: 8,  type: "maj",  bassOffset: 8 },
    "bVII":  { roman: "bVII",  label: "Modal-bVII",       short: "bVII",       semitones: 10, type: "maj",  bassOffset: 10 },
    "V/V":   { roman: "V/V",   label: "Doppeldom.",       short: "V/V",        semitones: 2,  type: "maj",  bassOffset: 2 },
    "bII7":  { roman: "bII7",  label: "Tritonussub.",     short: "bII7 (Sub)", semitones: 1,  type: "dom7", bassOffset: 1 },

    // Stufen für Moll-Kadenzen (Funktionsbezeichnungen bezogen auf die Moll-Tonika)
    "i":     { roman: "i",     label: "Moll-Tonika",      short: "Tonika",     semitones: 0,  type: "min",  bassOffset: 0 },
    "iio":   { roman: "ii°",   label: "Verminderte II",   short: "ii° (verm.)", semitones: 2, type: "dim",  bassOffset: 2 },
    "ii7b5": { roman: "iiø7",  label: "Halbverminderte II", short: "iiø7",     semitones: 2,  type: "m7b5", bassOffset: 2 },
    "III":   { roman: "III",   label: "Dur-Parallele",    short: "Dur-Par.",   semitones: 3,  type: "maj",  bassOffset: 3 },
    "v":     { roman: "v",     label: "Moll-Dominante",   short: "v (Moll)",   semitones: 7,  type: "min",  bassOffset: 7 },
    "VI":    { roman: "VI",    label: "VI. Stufe (Dur)",  short: "VI",         semitones: 8,  type: "maj",  bassOffset: 8 },
    "VII":   { roman: "VII",   label: "VII. Stufe (Dur)", short: "VII",        semitones: 10, type: "maj",  bassOffset: 10 },
    "N6":    { roman: "N6",    label: "Neapolitaner (♭II⁶)", short: "N6",      semitones: 1,  type: "maj",  bassOffset: 5 }
  },

  intervals: {
    "P1": { symbol: "P1", label: "Reine Prime",     short: "Prime",     semitones: 0 },
    "m2": { symbol: "m2", label: "Kleine Sekunde",  short: "kl. Sek.",  semitones: 1 },
    "M2": { symbol: "M2", label: "Große Sekunde",   short: "gr. Sek.",  semitones: 2 },
    "m3": { symbol: "m3", label: "Kleine Terz",     short: "kl. Terz",  semitones: 3 },
    "M3": { symbol: "M3", label: "Große Terz",      short: "gr. Terz",  semitones: 4 },
    "P4": { symbol: "P4", label: "Reine Quarte",    short: "Quarte",    semitones: 5 },
    "TT": { symbol: "TT", label: "Tritonus",        short: "Tritonus",  semitones: 6 },
    "P5": { symbol: "P5", label: "Reine Quinte",    short: "Quinte",    semitones: 7 },
    "m6": { symbol: "m6", label: "Kleine Sexte",    short: "kl. Sexte", semitones: 8 },
    "M6": { symbol: "M6", label: "Große Sexte",     short: "gr. Sexte", semitones: 9 },
    "m7": { symbol: "m7", label: "Kleine Septime",  short: "kl. Sept.", semitones: 10 },
    "M7": { symbol: "M7", label: "Große Septime",   short: "gr. Sept.", semitones: 11 },
    "P8": { symbol: "P8", label: "Reine Oktave",    short: "Oktave",    semitones: 12 },
    "m9": { symbol: "m9", label: "Kleine None",     short: "kl. None",  semitones: 13 },
    "M9": { symbol: "M9", label: "Große None",      short: "gr. None",  semitones: 14 }
  },

  chords: {
    "maj":   { symbol: "maj",     label: "Dur-Dreiklang (1–3–5)",         short: "Dur",        offsets: [0, 4, 7] },
    "min":   { symbol: "m",       label: "Moll-Dreiklang (1–♭3–5)",       short: "Moll",       offsets: [0, 3, 7] },
    "dim":   { symbol: "dim",     label: "Verminderter Dreiklang (1–♭3–♭5)", short: "Vermindert", offsets: [0, 3, 6] },
    "aug":   { symbol: "aug",     label: "Übermäßiger Dreiklang (1–3–♯5)", short: "Übermäßig", offsets: [0, 4, 8] },
    "sus4":  { symbol: "sus4",    label: "Quartvorhalt (1–4–5)",          short: "Vorhalt",    offsets: [0, 5, 7] },
    "7":     { symbol: "7",       label: "Dominantseptakkord (1–3–5–♭7)", short: "Dom. 7",     offsets: [0, 4, 7, 10] },
    "maj7":  { symbol: "maj7",    label: "Großer Septakkord (1–3–5–7)",   short: "Major 7",    offsets: [0, 4, 7, 11] },
    "m7":    { symbol: "m7",      label: "Moll-Septakkord (1–♭3–5–♭7)",   short: "Moll 7",     offsets: [0, 3, 7, 10] },
    "sus2":  { symbol: "sus2",    label: "Sekundvorhalt (1–2–5)",         short: "Sus 2",      offsets: [0, 2, 7] },
    "m7b5":  { symbol: "m7♭5",    label: "Halbvermindert (1–♭3–♭5–♭7)",   short: "Halbverm.",  offsets: [0, 3, 6, 10] },
    "dim7":  { symbol: "°7",      label: "Vollvermindert (1–♭3–♭5–♭♭7)",  short: "Vollverm.",  offsets: [0, 3, 6, 9] },
    "mMaj7": { symbol: "m(maj7)", label: "Moll-Major-7 (1–♭3–5–7)",       short: "Moll-Maj7",  offsets: [0, 3, 7, 11] },
    "maj9":  { symbol: "maj9",    label: "Major-9 (1–3–5–7–9)",           short: "Major 9",    offsets: [0, 4, 7, 11, 14] },
    "7b9":   { symbol: "7♭9",     label: "Dominant-7♭9 (1–3–5–♭7–♭9)",   short: "Dom. 7♭9",   offsets: [0, 4, 7, 10, 13] },
    "7s9":   { symbol: "7♯9",     label: "Dominant-7♯9 (1–3–5–♭7–♯9)",   short: "Jazz 7♯9",   offsets: [0, 4, 7, 10, 15] }
  },

  chordInversions: {
    "inv0": { symbol: "Bass: 1", label: "Grundstellung (Grundton im Bass)", short: "Grundstellung", stepIndex: 0 },
    "inv1": { symbol: "Bass: 3", label: "1. Umkehrung (Terz im Bass)",      short: "1. Umkehrung",  stepIndex: 1 },
    "inv2": { symbol: "Bass: 5", label: "2. Umkehrung (Quinte im Bass)",    short: "2. Umkehrung",  stepIndex: 2 },
    "inv3": { symbol: "Bass: 7", label: "3. Umkehrung (Septime im Bass)",   short: "3. Umkehrung",  stepIndex: 3 }
  },

  // Solfège-Stufen für C-Dur (inklusive Auflösungsweg zur Tonika)
  solfegeScale: [
    { key: "Do_low",  syllable: "Do",  label: "Grundton (Do)",        midi: 60, semitones: 0,  resolveMidis: [60] },
    { key: "Re",      syllable: "Re",  label: "2. Stufe (Re → Do)",   midi: 62, semitones: 2,  resolveMidis: [62, 60] },
    { key: "Mi",      syllable: "Mi",  label: "3. Stufe (Mi → Do)",   midi: 64, semitones: 4,  resolveMidis: [64, 62, 60] },
    { key: "Fa",      syllable: "Fa",  label: "4. Stufe (Fa → Do)",   midi: 65, semitones: 5,  resolveMidis: [65, 64, 62, 60] },
    { key: "Sol",     syllable: "Sol", label: "5. Stufe (Sol → Do)",  midi: 67, semitones: 7,  resolveMidis: [67, 69, 71, 72] },
    { key: "La",      syllable: "La",  label: "6. Stufe (La → Do)",   midi: 69, semitones: 9,  resolveMidis: [69, 71, 72] },
    { key: "Ti",      syllable: "Ti",  label: "7. Stufe (Ti → Do)",   midi: 71, semitones: 11, resolveMidis: [71, 72] },
    { key: "Do_high", syllable: "Do",  label: "Obere Tonika (Do)",    midi: 72, semitones: 12, resolveMidis: [72] }
  ]
};

function buildChordNotes(rootMidi, degreeDef) {
  const rootNote = rootMidi + degreeDef.semitones;
  let offsets = [0, 4, 7];
  if (degreeDef.type === "min") offsets = [0, 3, 7];
  if (degreeDef.type === "dom7") offsets = [0, 4, 7, 10];
  if (degreeDef.type === "maj7") offsets = [0, 4, 7, 11];
  if (degreeDef.type === "sus4") offsets = [0, 5, 7];
  if (degreeDef.type === "dim") offsets = [0, 3, 6];
  if (degreeDef.type === "m7b5") offsets = [0, 3, 6, 10];

  const chordNotes = offsets.map(s => midiToNote(rootNote + s));
  const bassNote = midiToNote(rootMidi - 12 + degreeDef.bassOffset);
  return { chordNotes, bassNote };
}

const CHORD_LEVEL_POOLS = {
  1: ["maj", "min", "dim", "aug"],
  2: ["maj", "min", "dim", "aug", "sus4", "7", "maj7", "m7"],
  3: ["maj", "min", "dim", "aug", "sus4", "7", "maj7", "m7", "sus2", "m7b5", "dim7", "mMaj7"],
  4: ["maj", "min", "dim", "aug", "sus4", "7", "maj7", "m7", "sus2", "m7b5", "dim7", "mMaj7", "maj9", "7b9", "7s9"]
};

const CHORD_FLAT_SEMITONES = new Set([1, 3, 6, 10, 13]);
const CHORD_SHARP_SEMITONES = new Set([8, 15]);

function formatChordMidiNoteList(midis, rootMidi, rootKey) {
  const keyPreferFlat = FLAT_KEYS.has(rootKey);
  return midis.map(m => {
    const semi = ((m - rootMidi) % 12 + 12) % 12;
    let useFlat = keyPreferFlat;
    if (CHORD_SHARP_SEMITONES.has(semi)) useFlat = false;
    else if (CHORD_FLAT_SEMITONES.has(semi)) useFlat = true;
    return midiToGermanNote(m, useFlat);
  });
}

function formatChordGermanNotes(rootMidi, offsets, rootKey) {
  return formatChordMidiNoteList(offsets.map(semi => rootMidi + semi), rootMidi, rootKey).join(" · ");
}

const CHORD_INVERSION_LEVELS = {
  1: { chordKeys: ["maj"],             choices: ["inv0", "inv1", "inv2"] },
  2: { chordKeys: ["maj", "min"],      choices: ["inv0", "inv1", "inv2"] },
  3: { chordKeys: ["7", "maj7", "m7"], choices: ["inv0", "inv1", "inv2", "inv3"] }
};

function isChordArpeggioMode(mode) {
  return mode === "chord-arp-up" || mode === "chord-arp-down";
}

function isBlockChordMode(mode) {
  return mode === "interval-chords" || mode === "chord-inversions";
}

function isChordQualityMode(mode) {
  return mode === "interval-chords" || isChordArpeggioMode(mode);
}

function isChordMode(mode) {
  return isChordQualityMode(mode) || mode === "chord-inversions";
}

function formatInversionChordTitle(rootMidi, rootKey, chordKey, bassMidi, inversionStep) {
  const keyPreferFlat = FLAT_KEYS.has(rootKey);
  const rootName = midiToGermanNote(rootMidi, keyPreferFlat).replace(/[0-9]/g, "");
  const suffixMap = { maj: "", min: "m", "7": "7", maj7: "maj7", m7: "m7" };
  const suffix = Object.prototype.hasOwnProperty.call(suffixMap, chordKey) ? suffixMap[chordKey] : chordKey;
  if (inversionStep === 0) return `${rootName}${suffix}`;
  const bassSemi = ((bassMidi - rootMidi) % 12 + 12) % 12;
  let bassUseFlat = keyPreferFlat;
  if (CHORD_SHARP_SEMITONES.has(bassSemi)) bassUseFlat = false;
  else if (CHORD_FLAT_SEMITONES.has(bassSemi)) bassUseFlat = true;
  const bassName = midiToGermanNote(bassMidi, bassUseFlat).replace(/[0-9]/g, "");
  return `${rootName}${suffix}/${bassName}`;
}

function buildChordInversionNotes(rootMidi, chordKey, inversionStep, rootKey = "C") {
  const chordDef = HARMONIC_DATA.chords[chordKey] || HARMONIC_DATA.chords["maj"];
  const baseOffsets = chordDef.offsets;
  const len = baseOffsets.length;
  const step = ((inversionStep % len) + len) % len;
  const rotatedOffsets = [
    ...baseOffsets.slice(step),
    ...baseOffsets.slice(0, step).map(o => o + 12)
  ];
  let midis = rotatedOffsets.map(o => rootMidi + o);
  while (midis[0] > 63) midis = midis.map(m => m - 12);
  while (midis[0] < 52) midis = midis.map(m => m + 12);
  const bassMidi = midis[0];
  return {
    midis,
    bassMidi,
    bassNote: midiToNote(bassMidi),
    notes: midis.map(m => midiToNote(m)),
    noteDisplay: formatChordMidiNoteList(midis, rootMidi, rootKey).join(" · "),
    slashTitle: formatInversionChordTitle(rootMidi, rootKey, chordKey, bassMidi, step)
  };
}

const RHYTHM_METERS = {
  "4/4": { key: "4/4", symbol: "4/4", roman: "4/4", short: "4er-Takt",    label: "4/4-Takt (4 Viertel)",     stepUnit: "quarter", beats: 4 },
  "3/4": { key: "3/4", symbol: "3/4", roman: "3/4", short: "3er-Walzer",  label: "3/4-Takt (Walzer)",        stepUnit: "quarter", beats: 3 },
  "2/4": { key: "2/4", symbol: "2/4", roman: "2/4", short: "2er-Marsch",  label: "2/4-Takt (Marsch)",        stepUnit: "quarter", beats: 2 },
  "6/8": { key: "6/8", symbol: "6/8", roman: "6/8", short: "Wiegetakt",   label: "6/8-Takt (2×3 Achtel)",    stepUnit: "eighth",  beats: 6 },
  "5/4": { key: "5/4", symbol: "5/4", roman: "5/4", short: "3 + 2 Takt",  label: "5/4-Takt (Ungerade 3+2)",  stepUnit: "quarter", beats: 5 },
  "7/8": { key: "7/8", symbol: "7/8", roman: "7/8", short: "2+2+3 Takt",  label: "7/8-Takt (Ungerade 7/8)",  stepUnit: "eighth",  beats: 7 }
};

const RHYTHM_METER_LEVELS = {
  1: ["4/4", "3/4"],
  2: ["2/4", "3/4", "4/4", "6/8"],
  3: ["4/4", "3/4", "6/8", "5/4", "7/8"]
};

function getRhythmMeterTiming(meterKey, bpm) {
  const def = RHYTHM_METERS[meterKey] || RHYTHM_METERS["4/4"];
  const beatMs = 60000 / bpm;
  const stepMs = def.stepUnit === "eighth" ? beatMs * 0.52 : beatMs;
  const barMs = def.beats * stepMs;
  return { def, stepMs, barMs };
}

function buildRhythmMeterEvents(meterKey, bpm, barsCount = 2, accentOnly = false) {
  const { def, stepMs, barMs } = getRhythmMeterTiming(meterKey, bpm);
  const events = [];

  for (let bar = 0; bar < barsCount; bar++) {
    const barOffset = bar * barMs;
    for (let b = 0; b < def.beats; b++) {
      const t = Math.round(barOffset + b * stepMs);
      if (b === 0) {
        events.push([t, accentOnly ? "accent" : "kick", 0.95]);
        if (!accentOnly) events.push([t, "accent", 0.85]);
      } else if (accentOnly) {
        events.push([t, "tick", 0.55]);
      } else if (meterKey === "4/4") {
        if (b === 2) events.push([t, "snare", 0.72]);
        events.push([t, b === 2 ? "tick" : "hat", b === 2 ? 0.65 : 0.72]);
      } else if (meterKey === "3/4") {
        events.push([t, "hat", 0.68], [t, "tick", 0.58]);
      } else if (meterKey === "2/4") {
        events.push([t, "snare", 0.74], [t, "tick", 0.62]);
      } else if (meterKey === "6/8") {
        if (b === 3) {
          events.push([t, "snare", 0.68], [t, "tick", 0.7]);
        } else {
          events.push([t, "hat", 0.56]);
        }
      } else if (meterKey === "5/4") {
        if (b === 3) {
          events.push([t, "snare", 0.74], [t, "tick", 0.68]);
        } else {
          events.push([t, "hat", 0.62], [t, "tick", 0.52]);
        }
      } else if (meterKey === "7/8") {
        if (b === 2) events.push([t, "snare", 0.7]);
        else if (b === 4) events.push([t, "tick", 0.78]);
        else events.push([t, "hat", 0.56]);
      }
    }
  }
  return { events, barMs, totalMs: barsCount * barMs };
}

const RHYTHM_DICTATION_CELLS = {
  quarter:          { key: "quarter",          symbol: "♩",     short: "Viertel",       label: "Viertelnote (1 Schlag)",            offsets: [0] },
  eighth2:          { key: "eighth2",          symbol: "♫",     short: "2 Achtel",      label: "Achtelpaar (1-und)",                offsets: [0, 0.5] },
  rest:             { key: "rest",             symbol: "Pause", short: "Pause",         label: "Viertelpause (Stille)",             offsets: [] },
  offbeat:          { key: "offbeat",          symbol: "und",   short: "Offbeat",       label: "Achtelpause + Achtel („und“)",      offsets: [0.5] },
  triplet:          { key: "triplet",          symbol: "3×♪",   short: "Triole",        label: "Achteltriole (3 gleichmäßige)",     offsets: [0, 1 / 3, 2 / 3] },
  eighths16:        { key: "eighths16",        symbol: "♪♬",   short: "Lang-k-k",      label: "Achtel + zwei Sechzehntel",         offsets: [0, 0.5, 0.75] },
  sixteenths8:      { key: "sixteenths8",      symbol: "♬♪",   short: "K-k-lang",      label: "Zwei Sechzehntel + Achtel",         offsets: [0, 0.25, 0.5] },
  sixteenth4:       { key: "sixteenth4",       symbol: "♬",     short: "4×16tel",       label: "Vier Sechzehntel",                  offsets: [0, 0.25, 0.5, 0.75] },
  dotEighth16:      { key: "dotEighth16",      symbol: "♩.♬",  short: "Lang–kurz",     label: "Punktierte Achtel + Sechzehntel",   offsets: [0, 0.75] },
  sixteenDotEighth: { key: "sixteenDotEighth", symbol: "♬♩.",  short: "Kurz–lang",     label: "Sechzehntel + punktierte Achtel",   offsets: [0, 0.25] },
  sync16:           { key: "sync16",           symbol: "Synk.", short: "16.-Synkope",   label: "16tel-Pause + 16tel-Synkopen",      offsets: [0.25, 0.75] }
};

const RHYTHM_DICTATION_LEVELS = {
  1: ["quarter", "eighth2", "rest"],
  2: ["quarter", "eighth2", "rest", "offbeat", "triplet"],
  3: ["quarter", "eighth2", "rest", "triplet", "eighths16", "sixteenths8", "sixteenth4"],
  4: ["quarter", "eighth2", "rest", "offbeat", "triplet", "dotEighth16", "sixteenDotEighth", "sync16"]
};

const RHYTHM_TAP_LEVELS = {
  1: { label: "Puls-Anker",        toleranceMs: 115, meters: ["4/4"],       cells: ["quarter", "rest"],                               blind: false },
  2: { label: "Achtel & 3/4",      toleranceMs: 90,  meters: ["4/4", "3/4"], cells: ["quarter", "rest", "eighth2"],                   blind: false },
  3: { label: "Synkopen & Triolen", toleranceMs: 70, meters: ["4/4"],       cells: ["quarter", "rest", "eighth2", "offbeat", "triplet"], blind: false },
  4: { label: "Blindflug",         toleranceMs: 80,  meters: ["4/4"],       cells: ["quarter", "rest", "eighth2", "offbeat"],          blind: true  }
};

function getRhythmCellSVG(cellKey, width = 44, height = 26) {
  const head = (cx, cy = 21) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="3.4" ry="2.4" transform="rotate(-18 ${cx} ${cy})" fill="currentColor"/>`;
  const stem = (x, yBottom = 20.5, yTop = 5.5) =>
    `<line x1="${x}" y1="${yBottom}" x2="${x}" y2="${yTop}" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`;
  const quarterRestPath = (ox = 0, scale = 1) =>
    `<g transform="translate(${ox},0) scale(${scale})">
      <path d="M22 5.5 L26.5 10.5 L21.5 14.5 L26.5 19.5 C23 19.5 21 21.5 23.5 24" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </g>`;

  let body = "";
  switch (cellKey) {
    case "quarter":
      body = head(22) + stem(24.9);
      break;
    case "rest":
      body = quarterRestPath(0, 1);
      break;
    case "eighth2":
      body = head(14) + stem(16.9) + head(31) + stem(33.9) +
        `<line x1="16.9" y1="5.5" x2="33.9" y2="5.5" stroke="currentColor" stroke-width="3" stroke-linecap="butt"/>`;
      break;
    case "offbeat":
      body = `<circle cx="13" cy="11" r="1.8" fill="currentColor"/>
        <path d="M13 12.2 C16 12.8 18 11.2 19 10 L14.8 22.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" fill="none"/>` +
        head(30) + stem(32.9) +
        `<path d="M32.9 5.5 C36.5 7.5 37.5 10.5 35.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`;
      break;
    case "triplet":
      body = `<text x="24" y="7.5" text-anchor="middle" fill="currentColor" font-size="8.5" font-weight="900" font-family="Andika, sans-serif">3</text>` +
        head(10, 22) + stem(12.6, 21.5, 10) +
        head(22, 22) + stem(24.6, 21.5, 10) +
        head(34, 22) + stem(36.6, 21.5, 10) +
        `<line x1="12.6" y1="10" x2="36.6" y2="10" stroke="currentColor" stroke-width="2.8" stroke-linecap="butt"/>`;
      break;
    case "eighths16":
      body = head(9.5) + stem(12.1) + head(23.5) + stem(26.1) + head(35) + stem(37.6) +
        `<line x1="12.1" y1="5.5" x2="37.6" y2="5.5" stroke="currentColor" stroke-width="2.8"/>` +
        `<line x1="26.1" y1="10" x2="37.6" y2="10" stroke="currentColor" stroke-width="2.4"/>`;
      break;
    case "sixteenths8":
      body = head(9.5) + stem(12.1) + head(21) + stem(23.6) + head(35) + stem(37.6) +
        `<line x1="12.1" y1="5.5" x2="37.6" y2="5.5" stroke="currentColor" stroke-width="2.8"/>` +
        `<line x1="12.1" y1="10" x2="23.6" y2="10" stroke="currentColor" stroke-width="2.4"/>`;
      break;
    case "sixteenth4":
      body = head(8) + stem(10.5) + head(18) + stem(20.5) + head(28) + stem(30.5) + head(38) + stem(40.5) +
        `<line x1="10.5" y1="5.5" x2="40.5" y2="5.5" stroke="currentColor" stroke-width="2.8"/>` +
        `<line x1="10.5" y1="9.8" x2="40.5" y2="9.8" stroke="currentColor" stroke-width="2.4"/>`;
      break;
    case "dotEighth16":
      body = head(11.5) + stem(14.3) + `<circle cx="18.2" cy="21" r="1.6" fill="currentColor"/>` +
        head(33.5) + stem(36.3) +
        `<line x1="14.3" y1="5.5" x2="36.3" y2="5.5" stroke="currentColor" stroke-width="2.8"/>` +
        `<line x1="29.5" y1="10" x2="36.3" y2="10" stroke="currentColor" stroke-width="2.4"/>`;
      break;
    case "sixteenDotEighth":
      body = head(11) + stem(13.8) + head(28.5) + stem(31.3) + `<circle cx="35.6" cy="21" r="1.6" fill="currentColor"/>` +
        `<line x1="13.8" y1="5.5" x2="31.3" y2="5.5" stroke="currentColor" stroke-width="2.8"/>` +
        `<line x1="13.8" y1="10" x2="20.6" y2="10" stroke="currentColor" stroke-width="2.4"/>`;
      break;
    case "sync16":
      body = `<circle cx="10.5" cy="11" r="1.5" fill="currentColor"/>
        <circle cx="9.2" cy="15.5" r="1.5" fill="currentColor"/>
        <path d="M10.5 11.5 C13 12 14.5 10.8 15.2 9.8 L11.5 22.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/>` +
        head(22.5) + stem(25.2) + head(36) + stem(38.7) +
        `<line x1="25.2" y1="5.5" x2="38.7" y2="5.5" stroke="currentColor" stroke-width="2.8"/>`;
      break;
    default:
      body = head(22) + stem(24.9);
  }

  return `<svg class="rhythm-glyph-svg" width="${width}" height="${height}" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
}

const RHYTHM_GROOVE_STYLES = {
  march:       { key: "march",       symbol: "1 & 3",  roman: "Marsch",   short: "Betonung 1 & 3",     label: "Marsch (Snare auf 1 & 3)" },
  backbeat:    { key: "backbeat",    symbol: "2 & 4",  roman: "Backbeat", short: "Pop/Rock 2 & 4",     label: "Backbeat (Snare auf 2 & 4)" },
  syncopation: { key: "syncopation", symbol: "Off",    roman: "Synkope",  short: "Betonte „und“",      label: "Synkopen-Groove (Offbeats)" },
  swing:       { key: "swing",       symbol: "Swing",  roman: "Swing",    short: "Federnde Triole",    label: "Swing / Shuffle (triolisch)" },
  poly32:      { key: "poly32",      symbol: "3 : 2",  roman: "3 vs. 2",  short: "Polyrhythmus",       label: "Polyrhythmik (3 gegen 2)" }
};

const RHYTHM_OFFBEAT_POSITIONS = {
  "1":  { key: "1",  symbol: "1",   roman: "1",     short: "Onbeat 1",   label: "Schlag 1 (Onbeat)",     beatPos: 0 },
  "1+": { key: "1+", symbol: "1+",  roman: "1-und", short: "Offbeat",    label: "1-und (Offbeat)",       beatPos: 0.5 },
  "2":  { key: "2",  symbol: "2",   roman: "2",     short: "Onbeat 2",   label: "Schlag 2 (Onbeat)",     beatPos: 1 },
  "2+": { key: "2+", symbol: "2+",  roman: "2-und", short: "Offbeat",    label: "2-und (Offbeat)",       beatPos: 1.5 },
  "3":  { key: "3",  symbol: "3",   roman: "3",     short: "Onbeat 3",   label: "Schlag 3 (Onbeat)",     beatPos: 2 },
  "3+": { key: "3+", symbol: "3+",  roman: "3-und", short: "Offbeat",    label: "3-und (Offbeat)",       beatPos: 2.5 },
  "4":  { key: "4",  symbol: "4",   roman: "4",     short: "Onbeat 4",   label: "Schlag 4 (Onbeat)",     beatPos: 3 },
  "4+": { key: "4+", symbol: "4+",  roman: "4-und", short: "Offbeat",    label: "4-und (Offbeat)",       beatPos: 3.5 }
};

const RHYTHM_MICRO_TIMING_OPTIONS = {
  early:  { key: "early",  symbol: "↖", roman: "↖ Früh",  short: "Treibend",      label: "Zu früh (treibend vor dem Beat)" },
  pocket: { key: "pocket", symbol: "◎", roman: "◎ Exakt", short: "In the Pocket", label: "Exakt auf dem Beat („In the Pocket“)" },
  late:   { key: "late",   symbol: "↘", roman: "↘ Spät",  short: "Laid-back",     label: "Zu spät (zurückgelehnt / laid-back)" }
};

function buildRhythmGrooveEvents(ex, overrideKey = null, bpm = 90) {
  const beatMs = 60000 / bpm;
  const events = [];
  const subMode = ex.grooveKind; // 'style' | 'offbeat' | 'micro'
  const key = overrideKey || ex.targetItem.key;

  if (subMode === "style") {
    for (let bar = 0; bar < 2; bar++) {
      const bo = bar * 4 * beatMs;
      if (key === "march") {
        for (let b = 0; b < 4; b++) {
          events.push([Math.round(bo + b * beatMs), "hat", 0.5]);
          if (b === 0 || b === 2) events.push([Math.round(bo + b * beatMs), "snare", 0.85], [Math.round(bo + b * beatMs), "kick", 0.85]);
          else events.push([Math.round(bo + b * beatMs), "tick", 0.45]);
        }
      } else if (key === "backbeat") {
        for (let b = 0; b < 4; b++) {
          events.push([Math.round(bo + b * beatMs), "hat", 0.55]);
          events.push([Math.round(bo + (b + 0.5) * beatMs), "hat", 0.4]);
          if (b === 0 || b === 2) events.push([Math.round(bo + b * beatMs), "kick", 0.9]);
          else events.push([Math.round(bo + b * beatMs), "snare", 0.88]);
        }
      } else if (key === "syncopation") {
        for (let b = 0; b < 4; b++) {
          events.push([Math.round(bo + b * beatMs), b % 2 === 0 ? "kick" : "hat", 0.55]);
          events.push([Math.round(bo + (b + 0.5) * beatMs), "clave", 0.92]);
          if (b === 1 || b === 3) events.push([Math.round(bo + (b + 0.5) * beatMs), "snare", 0.72]);
        }
      } else if (key === "swing") {
        for (let b = 0; b < 4; b++) {
          events.push([Math.round(bo + b * beatMs), "hat", 0.78]);
          events.push([Math.round(bo + (b + 2 / 3) * beatMs), "hat", 0.58]);
          if (b === 0 || b === 2) events.push([Math.round(bo + b * beatMs), "kick", 0.82]);
          else events.push([Math.round(bo + b * beatMs), "snare", 0.68]);
        }
      } else if (key === "poly32") {
        // Pro Halbtakt (2 Beats): 2 Kicks vs 3 Claves
        for (let half = 0; half < 2; half++) {
          const ho = bo + half * 2 * beatMs;
          events.push([Math.round(ho), "kick", 0.9]);
          events.push([Math.round(ho + beatMs), "kick", 0.85]);
          events.push([Math.round(ho), "clave", 0.92]);
          events.push([Math.round(ho + (2 / 3) * beatMs), "clave", 0.85]);
          events.push([Math.round(ho + (4 / 3) * beatMs), "clave", 0.85]);
        }
      }
    }
    return { events, totalMs: 8 * beatMs, barMs: 4 * beatMs };
  }

  if (subMode === "offbeat") {
    const posDef = RHYTHM_OFFBEAT_POSITIONS[key] || RHYTHM_OFFBEAT_POSITIONS["1+"];
    // Takt 1 etabliert 1-2-3-4 Puls, Takt 2 spielt Groove + Cowbell-Akzent an Zielposition
    for (let bar = 0; bar < 2; bar++) {
      const bo = bar * 4 * beatMs;
      for (let b = 0; b < 4; b++) {
        events.push([Math.round(bo + b * beatMs), b % 2 === 0 ? "kick" : "hat", 0.6]);
        events.push([Math.round(bo + (b + 0.5) * beatMs), "hat", 0.32]);
        if (bar === 0 && b === 0) events.push([Math.round(bo), "accent", 0.55]);
      }
    }
    const targetMs = Math.round(4 * beatMs + posDef.beatPos * beatMs);
    events.push([targetMs, "cowbell", 1.0], [targetMs, "clave", 0.9]);
    return { events, totalMs: 8 * beatMs, barMs: 4 * beatMs };
  }

  // subMode === "micro" (Stufe 3 & 4)
  const sign = key === "early" ? -1 : (key === "late" ? 1 : 0);
  const mag = overrideKey ? (ex.microMagMs || 56) : ex.microMagMs;
  const shiftMs = sign * mag;

  for (let bar = 0; bar < 2; bar++) {
    const bo = bar * 4 * beatMs;
    for (let b = 0; b < 4; b++) {
      const t = bo + b * beatMs;
      events.push([Math.round(t), "hat", 0.45]);
      events.push([Math.round(t + 0.5 * beatMs), "hat", 0.34]);
      if (b === 0 || b === 2) {
        events.push([Math.round(t), "kick", 0.9]);
      } else {
        events.push([Math.round(Math.max(10, t + shiftMs)), "snare", 0.92]);
      }
    }
  }
  return { events, totalMs: 8 * beatMs, barMs: 4 * beatMs };
}

/**
 * Bewertet angetippte Zeitpunkte (ms relativ zum Start der Spieler-Zählzeit) gegen erwartete Zielzeitpunkte.
 * Nutzt Minimum-Distance-Matching, damit ein leicht verschobener Schlag keine Nachbarn verdrängt.
 */
function evaluateRhythmTaps(expectedEvents, actualTapsMs, toleranceMs) {
  const maxWindow = toleranceMs * 1.35;
  const exactWindow = toleranceMs * 0.65;
  const pairs = [];

  expectedEvents.forEach((ev, expIdx) => {
    actualTapsMs.forEach((tapMs, tapIdx) => {
      const diff = tapMs - ev.relMs;
      const absDiff = Math.abs(diff);
      if (absDiff <= maxWindow) {
        pairs.push({ expIdx, tapIdx, diff, absDiff });
      }
    });
  });

  pairs.sort((a, b) => a.absDiff - b.absDiff);

  const usedExp = new Set();
  const usedTaps = new Set();
  const expResults = expectedEvents.map(ev => ({
    ...ev,
    status: "missed",
    diffMs: null
  }));

  pairs.forEach(p => {
    if (usedExp.has(p.expIdx) || usedTaps.has(p.tapIdx)) return;
    usedExp.add(p.expIdx);
    usedTaps.add(p.tapIdx);
    expResults[p.expIdx].status = p.absDiff <= exactWindow ? "exact" : "close";
    expResults[p.expIdx].diffMs = Math.round(p.diff);
  });

  const extraTapsMs = actualTapsMs.filter((_, idx) => !usedTaps.has(idx));
  const exactCount = expResults.filter(r => r.status === "exact").length;
  const closeCount = expResults.filter(r => r.status === "close").length;
  const missedCount = expResults.filter(r => r.status === "missed").length;
  const extraCount = extraTapsMs.length;
  const matchedDiffs = expResults.filter(r => r.diffMs !== null).map(r => r.diffMs);
  const avgDiffMs = matchedDiffs.length > 0
    ? Math.round(matchedDiffs.reduce((s, v) => s + v, 0) / matchedDiffs.length)
    : null;

  return {
    expResults,
    extraCount,
    extraTapsMs,
    exactCount,
    closeCount,
    missedCount,
    avgDiffMs,
    passed: missedCount === 0 && extraCount === 0
  };
}

const PROD_FREQUENCIES = {
  "63":    { key: "63",    freqHz: 63,    symbol: "63 Hz",   roman: "63 Hz",   short: "Subbass",  label: "63 Hz – Subbass & Kick-Fundament" },
  "125":   { key: "125",   freqHz: 125,   symbol: "125 Hz",  roman: "125 Hz",  short: "Bass",     label: "125 Hz – Bass-Druck & Wärme" },
  "250":   { key: "250",   freqHz: 250,   symbol: "250 Hz",  roman: "250 Hz",  short: "Fülle",    label: "250 Hz – Tiefmitten („Matsch“-Zone)" },
  "500":   { key: "500",   freqHz: 500,   symbol: "500 Hz",  roman: "500 Hz",  short: "Holz",     label: "500 Hz – Untere Mitten („Karton“)" },
  "800":   { key: "800",   freqHz: 800,   symbol: "800 Hz",  roman: "800 Hz",  short: "Bauch",    label: "800 Hz – Nasale Mitten & Holz" },
  "1000":  { key: "1000",  freqHz: 1000,  symbol: "1 kHz",   roman: "1 kHz",   short: "Kern",     label: "1 kHz – Zentrales Mittelband" },
  "1600":  { key: "1600",  freqHz: 1600,  symbol: "1,6 kHz", roman: "1,6 kHz", short: "Attack",   label: "1,6 kHz – Obermitten & Ansprache" },
  "2000":  { key: "2000",  freqHz: 2000,  symbol: "2 kHz",   roman: "2 kHz",   short: "Präsenz",  label: "2 kHz – Stimm-Fokus & Präsenz" },
  "2500":  { key: "2500",  freqHz: 2500,  symbol: "2,5 kHz", roman: "2,5 kHz", short: "Kante",    label: "2,5 kHz – Biss & Durchsetzungskraft" },
  "4000":  { key: "4000",  freqHz: 4000,  symbol: "4 kHz",   roman: "4 kHz",   short: "Direkt",   label: "4 kHz – Direktheit & Konsonanten" },
  "6300":  { key: "6300",  freqHz: 6300,  symbol: "6,3 kHz", roman: "6,3 kHz", short: "S-Laute",  label: "6,3 kHz – Sibilanz & Definition" },
  "8000":  { key: "8000",  freqHz: 8000,  symbol: "8 kHz",   roman: "8 kHz",   short: "Brillanz", label: "8 kHz – Höhen-Glanz & Frische" },
  "12000": { key: "12000", freqHz: 12000, symbol: "12 kHz",  roman: "12 kHz",  short: "Luft",     label: "12 kHz – Super-Höhen & „Air“-Band" }
};

const PROD_TONE_LEVELS = {
  1: { label: "5 Bänder (Basis)", choices: ["125", "250", "1000", "2000", "4000"] },
  2: { label: "8 Oktavbänder",    choices: ["63", "125", "250", "500", "1000", "2000", "4000", "8000"] },
  3: { label: "12 Bänder",        choices: ["63", "125", "250", "500", "800", "1000", "1600", "2500", "4000", "6300", "8000", "12000"] }
};

const PROD_EQ_NOISE_LEVELS = {
  1: { label: "Breiter EQ",  boostDb: 10.0, q: 1.6, choices: ["125", "250", "500", "1000", "2000", "4000"] },
  2: { label: "Oktav-EQ",    boostDb: 8.5,  q: 2.6, choices: ["63", "125", "250", "500", "1000", "2000", "4000", "8000"] },
  3: { label: "Chirurgisch", boostDb: 7.0,  q: 4.2, choices: ["63", "125", "250", "500", "800", "1000", "1600", "2500", "4000", "8000"] }
};

const MODES_TRAINING_DATA = {
  "ionian": {
    key: "ionian", degree: 1, roman: "Ionisch", short: "Dur (1 2 3 4 5 6 7)",
    label: "Ionisch (Dur-Tonleiter)",
    intervals: [0, 2, 4, 5, 7, 9, 11, 12],
    charTurn: [0, 4, 5, 7, 11, 12],
    vampOffsets: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]]
  },
  "dorian": {
    key: "dorian", degree: 2, roman: "Dorisch", short: "Moll mit ♮6",
    label: "Dorisch (1 2 b3 4 5 6 b7)",
    intervals: [0, 2, 3, 5, 7, 9, 10, 12],
    charTurn: [0, 3, 7, 9, 10, 7],
    vampOffsets: [[0, 3, 7, 10], [5, 9, 12]]
  },
  "phrygian": {
    key: "phrygian", degree: 3, roman: "Phrygisch", short: "Moll mit b2",
    label: "Phrygisch (1 b2 b3 4 5 b6 b7)",
    intervals: [0, 1, 3, 5, 7, 8, 10, 12],
    charTurn: [0, 3, 7, 8, 1, 0],
    vampOffsets: [[0, 3, 7], [1, 5, 8]]
  },
  "lydian": {
    key: "lydian", degree: 4, roman: "Lydisch", short: "Dur mit #4",
    label: "Lydisch (1 2 3 #4 5 6 7)",
    intervals: [0, 2, 4, 6, 7, 9, 11, 12],
    charTurn: [0, 4, 7, 6, 7, 11],
    vampOffsets: [[0, 4, 7, 11], [2, 6, 9]]
  },
  "mixolydian": {
    key: "mixolydian", degree: 5, roman: "Mixolydisch", short: "Dur mit b7",
    label: "Mixolydisch (1 2 3 4 5 6 b7)",
    intervals: [0, 2, 4, 5, 7, 9, 10, 12],
    charTurn: [0, 4, 7, 10, 9, 7],
    vampOffsets: [[0, 4, 7], [-2, 2, 5]]
  },
  "aeolian": {
    key: "aeolian", degree: 6, roman: "Äolisch", short: "Natürliches Moll (b6, b7)",
    label: "Äolisch (1 2 b3 4 5 b6 b7)",
    intervals: [0, 2, 3, 5, 7, 8, 10, 12],
    charTurn: [0, 3, 7, 8, 7, 10],
    vampOffsets: [[0, 3, 7], [-4, 0, 3]]
  },
  "locrian": {
    key: "locrian", degree: 7, roman: "Lokrisch", short: "Moll mit b2 & b5",
    label: "Lokrisch (1 b2 b3 4 b5 b6 b7)",
    intervals: [0, 1, 3, 5, 6, 8, 10, 12],
    charTurn: [0, 3, 6, 1, 0],
    vampOffsets: [[0, 3, 6, 10], [1, 5, 8]]
  },
  "harm_minor": {
    key: "harm_minor", roman: "Harm. Moll", short: "Moll mit #7",
    label: "Harmonisch Moll (b6 & Leitton 7)",
    intervals: [0, 2, 3, 5, 7, 8, 11, 12],
    charTurn: [0, 3, 7, 8, 11, 12],
    vampOffsets: [[0, 3, 7], [7, 11, 14, 17]]
  }
};

const MODE_SCALE_LEVELS = {
  1: { label: "4 Grund-Modi",      randomRoot: false, choices: ["ionian", "aeolian", "dorian", "mixolydian"] },
  2: { label: "Alle 7 Modi (C)",   randomRoot: false, choices: ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"] },
  3: { label: "Alle 7 + Grundton", randomRoot: true,  choices: ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"] }
};

const MODE_CHAR_LEVELS = {
  1: { label: "Dur-Modi",           randomRoot: false, choices: ["ionian", "lydian", "mixolydian"] },
  2: { label: "Moll-Modi",          randomRoot: false, choices: ["aeolian", "dorian", "phrygian", "locrian"] },
  3: { label: "Alle + Harm. Moll",  randomRoot: true,  choices: ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian", "harm_minor"] }
};

const MODE_CADENCE_LEVELS = {
  1: { label: "4 Standard-Akkordpendel",   randomRoot: false, choices: ["ionian", "dorian", "mixolydian", "aeolian"] },
  2: { label: "Alle 6 modalen Akkordpendel", randomRoot: true,  choices: ["ionian", "dorian", "mixolydian", "aeolian", "lydian", "phrygian"] }
};

function getChoiceItem(exType, choiceKey) {
  if (exType === "cadence") return getLocalizedDegreeDef(choiceKey);
  if (isNotationChordMode(exType)) return getNotationChordChoiceItem(choiceKey);
  if (isChordQualityMode(exType)) return getLocalizedChordDef(choiceKey);
  if (exType === "chord-inversions") return getLocalizedChordInversionDef(choiceKey);
  if (exType === "rhythm-meter") return getLocalizedRhythmMeter(choiceKey);
  if (exType === "rhythm-dictation") return getLocalizedRhythmCell(choiceKey);
  if (exType === "rhythm-groove") {
    if (RHYTHM_GROOVE_STYLES[choiceKey]) return getLocalizedRhythmGroove(choiceKey);
    if (RHYTHM_OFFBEAT_POSITIONS[choiceKey]) return getLocalizedRhythmOffbeat(choiceKey);
    return getLocalizedRhythmMicroTiming(choiceKey);
  }
  if (exType === "prod-tone" || exType === "prod-eq-noise") {
    return getLocalizedProdFreq(choiceKey);
  }
  if (exType.startsWith("modes-")) {
    return getLocalizedModeDef(choiceKey);
  }
  return getLocalizedIntervalDef(choiceKey);
}

function computeBalancedRows(items) {
  const n = items.length;
  if (n <= 4) {
    return { rows: [items], maxCols: n };
  }
  if (n <= 8) {
    const r1 = Math.ceil(n / 2);
    return {
      rows: [items.slice(0, r1), items.slice(r1)],
      maxCols: r1
    };
  }
  const r1 = Math.ceil(n / 3);
  const rem = n - r1;
  const r2 = Math.ceil(rem / 2);
  return {
    rows: [
      items.slice(0, r1),
      items.slice(r1, r1 + r2),
      items.slice(r1 + r2)
    ],
    maxCols: r1
  };
}
