/**
 * Lauscher • Sitzungs-Gedächtnis & Übungs-Generatoren aller Kategorien
 */

// ---------- SITZUNGS-GEDÄCHTNIS ----------
// Verwechselte Intervalle, Akkorde, Modi, Solfège-Stufen und Noten kommen in den nächsten
// 2–5 Aufgaben gezielt wieder dran, bis sie zweimal auf Anhieb sitzen – nie direkt hintereinander.
// Nur im Arbeitsspeicher: keine Anzeige, keine Punkte, nichts wird gespeichert.
const SESSION_REVIEW_HITS_NEEDED = 2;
const SESSION_REVIEW_MAX_PER_SCOPE = 4;
const SESSION_REVIEW_PICK_CHANCE = 0.6;   // Chance, ein fälliges Element einzustreuen
const SESSION_REVIEW_OVERDUE = -2;         // so viele Aufgaben „überfällig“ → wird sicher eingestreut
const sessionReviewMemory = new Map();     // scope -> Map(key -> entry)

function randomSessionReviewWait(entry = null) {
  // Notenlesen: Die Warteschlange (Platz 3–5) sorgt schon für den Abstand
  if (entry?.queueBased) return 0;
  return 2 + Math.floor(Math.random() * 2); // frühestens in der 2. oder 3. Aufgabe danach
}

function getSessionReviewBucket(scope, create = false) {
  if (!scope) return null;
  let bucket = sessionReviewMemory.get(scope);
  if (!bucket && create) {
    bucket = new Map();
    sessionReviewMemory.set(scope, bucket);
  }
  return bucket || null;
}

function rememberSessionMistake(scope, key, payload = null, queueBased = false) {
  if (!scope || key == null || state.exam?.active) return;
  const bucket = getSessionReviewBucket(scope, true);
  const entry = bucket.get(key) || { key: key, payload: null };
  entry.queueBased = Boolean(queueBased);
  entry.hits = 0;
  entry.wait = randomSessionReviewWait(entry);
  entry.pending = false;
  entry.missedAt = Date.now();
  if (payload) entry.payload = payload;
  bucket.delete(key);
  bucket.set(key, entry);
  while (bucket.size > SESSION_REVIEW_MAX_PER_SCOPE) {
    bucket.delete(bucket.keys().next().value); // ältesten Fehler vergessen
  }
}

function recordSessionReviewSuccess(scope, key) {
  const bucket = getSessionReviewBucket(scope);
  const entry = bucket?.get(key);
  if (!entry) return;
  entry.hits += 1;
  entry.pending = false;
  if (entry.hits >= SESSION_REVIEW_HITS_NEEDED) {
    bucket.delete(key);
    if (bucket.size === 0) sessionReviewMemory.delete(scope);
  } else {
    entry.wait = randomSessionReviewWait(entry);
  }
}

// Eine neue Aufgabe beginnt: Wartezeiten herunterzählen, liegengebliebene Einstreuungen freigeben
function tickSessionReview(scope, isStillQueued = null) {
  const bucket = getSessionReviewBucket(scope);
  if (!bucket) return;
  bucket.forEach(entry => {
    if (entry.pending) {
      if (isStillQueued && isStillQueued(entry)) return;
      entry.pending = false; // gezeigt, aber nicht beantwortet (z. B. Nur-Hören) → bald erneut
      entry.wait = 1;
    }
    entry.wait -= 1;
  });
}

function pickDueSessionReviewEntry(scope, isAllowed = null) {
  if (state.exam?.active) return null;
  const bucket = getSessionReviewBucket(scope);
  if (!bucket) return null;
  const due = [...bucket.values()].filter(e => !e.pending && e.wait <= 0 && (!isAllowed || isAllowed(e)));
  if (!due.length) return null;
  const overdue = due.filter(e => e.queueBased || e.wait <= SESSION_REVIEW_OVERDUE);
  if (!overdue.length && Math.random() >= SESSION_REVIEW_PICK_CHANCE) return null;
  const pool = overdue.length ? overdue : due;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Auswahl für Übungen mit festem Antwort-Pool: liefert den Schlüssel oder null (= normal zufällig)
function pickSessionReviewKey(scope, pool, lastKey = null) {
  if (!Array.isArray(pool) || pool.length < 2) return null;
  tickSessionReview(scope);
  const entry = pickDueSessionReviewEntry(scope, e => pool.includes(e.key) && e.key !== lastKey);
  if (!entry) return null;
  entry.pending = true;
  return entry.key;
}

// Während der Wartezeit soll ein verwechseltes Element nicht zufällig sofort wieder kommen
function filterCoolingSessionReviewKeys(scope, pool, lastKey = null) {
  const bucket = getSessionReviewBucket(scope);
  if (!bucket || state.exam?.active) return pool;
  const free = pool.filter(k => !bucket.has(k) || (bucket.get(k).wait <= 0 && k !== lastKey));
  return free.length ? free : pool;
}

function pickTargetKeyWithSessionReview(scope, pool, lastKey = null) {
  const reviewKey = pickSessionReviewKey(scope, pool, lastKey);
  if (reviewKey != null) return reviewKey;
  const free = filterCoolingSessionReviewKeys(scope, pool, lastKey);
  return free[Math.floor(Math.random() * free.length)];
}

function getLastTargetKeyForType(type) {
  const prev = state.currentExercise;
  return prev && prev.type === type ? (prev.reviewKey ?? prev.targetItem?.key ?? null) : null;
}

// Antwort-Ergebnis für Übungen mit reviewScope/reviewKey (einmal pro Aufgabe zählt der erste Versuch)
function noteSessionReviewAnswer(ex, isCorrect) {
  if (!ex?.reviewScope || ex.reviewKey == null || state.exam?.active) return;
  if (!isCorrect) {
    if (!ex.reviewMissed) {
      ex.reviewMissed = true;
      rememberSessionMistake(ex.reviewScope, ex.reviewKey);
    }
    return;
  }
  if (!ex.reviewMissed && !ex.reviewCounted) {
    ex.reviewCounted = true;
    recordSessionReviewSuccess(ex.reviewScope, ex.reviewKey);
  }
}

// Notenlesen: Noten/Akkorde aus der Warteschlange
function getNotationReviewScope(ex) {
  return ex ? `${ex.type}|L${ex.level || 1}` : null;
}

function getNotationReviewKey(item) {
  if (!item) return null;
  if (item.isChord) return `chord|${item.clefId}|${item.staffStep}|${item.chordSymbol}|${item.inversion}`;
  return `${item.clefId}|${item.staffStep}|${item.accidental}|${item.keySignatureId || "none"}`;
}

function noteNotationReviewAnswer(ex, item, isCorrect) {
  if (!ex || !item || state.exam?.active) return;
  const scope = getNotationReviewScope(ex);
  const key = getNotationReviewKey(item);
  if (!isCorrect) {
    if (!item.reviewMissed) {
      item.reviewMissed = true;
      const { reviewMissed, ...clean } = item;
      rememberSessionMistake(scope, key, clean, true);
    }
    return;
  }
  if (!item.reviewMissed) recordSessionReviewSuccess(scope, key);
}

// Nach dem Weiterrücken: ein fälliges Element an Platz 3–5 der kommenden Noten einsetzen
function injectNotationSessionReview(ex) {
  if (!ex || !Array.isArray(ex.notationQueue) || state.exam?.active) return;
  const scope = getNotationReviewScope(ex);
  const queueKeys = ex.notationQueue.map(getNotationReviewKey);
  tickSessionReview(scope, entry => queueKeys.includes(entry.key));
  const keySig = normalizeNotationKeySigId(ex.keySignatureId || "none");
  const slots = [2, 3, 4].filter(i => i < ex.notationQueue.length);
  const fitsSlot = (entry, i) => {
    if (!entry.payload) return false;
    return queueKeys[i - 1] !== entry.key && queueKeys[i + 1] !== entry.key;
  };
  const entry = pickDueSessionReviewEntry(scope, e => {
    const p = e.payload;
    if (!p || queueKeys.includes(e.key)) return false;
    if (!p.isChord && (p.keySignatureId || "none") !== keySig) return false;
    return slots.some(i => fitsSlot(e, i));
  });
  if (!entry) return;
  let okSlots = slots.filter(i => fitsSlot(entry, i));
  // Schlüssel-Mix: möglichst einen Platz im passenden Schlüssel-Block wählen
  if (ex.isMixedClef) {
    const sameClef = okSlots.filter(i => ex.notationQueue[i]?.clefId === entry.payload.clefId);
    if (sameClef.length) okSlots = sameClef;
  }
  const idx = okSlots[Math.floor(Math.random() * okSlots.length)];
  ex.notationQueue[idx] = { ...entry.payload };
  entry.pending = true;
}

function generateExercise() {
  if (state.settings.mode === "solfege") {
    const sLvl = state.settings.solfegeDifficulty || 1;
    if (sLvl === 1 || sLvl === 3) {
      state.currentKey = "C";
    } else if (sLvl === 2 || sLvl === 4) {
      if (!state.solfegeSessionKey || state.solfegeSessionKey === "C") {
        state.solfegeSessionKey = pickRandomNonCKey();
      }
      state.currentKey = state.solfegeSessionKey;
    } else {
      // Stufe 5 & 6: Neue zufällige Nicht-C-Dur-Tonart nach jeder Antwort
      state.currentKey = pickRandomNonCKey(state.currentKey);
    }
  } else if (state.settings.mode === "melody") {
    state.currentKey = state.settings.melodyKeyMode === "random"
      ? pickRandomAnyKey(state.currentKey)
      : "C";
  } else if (state.settings.keyMode === "fixed") {
    state.currentKey = "C";
  } else if (state.settings.keyMode === "easy") {
    const pool = ["C", "G", "F", "D", "Bb"];
    state.currentKey = pool[Math.floor(Math.random() * pool.length)];
  } else {
    const keys = Object.keys(HARMONIC_DATA.roots);
    state.currentKey = keys[Math.floor(Math.random() * keys.length)];
  }

  if (!CADENCE_TIME_SIG_PICKER_ENABLED) {
    state.activeTimeSig = "4/4";
  } else if (state.settings.timeSig === "random") {
    const sigs = ["4/4", "3/4", "6/8", "odd"];
    state.activeTimeSig = sigs[Math.floor(Math.random() * sigs.length)];
  } else {
    state.activeTimeSig = state.settings.timeSig;
  }

  if (state.settings.randomBpm) {
    const steps = [65, 75, 85, 95, 105, 115, 125, 135];
    state.activeBpm = steps[Math.floor(Math.random() * steps.length)];
  } else {
    state.activeBpm = state.settings.bpm;
  }

  const rootMidi = HARMONIC_DATA.roots[state.currentKey].midi;

  if (isCadenceMode(state.settings.mode)) {
    generateCadenceExercise(rootMidi, isMinorCadenceMode(state.settings.mode) ? "minor" : "major");
  } else if (state.settings.mode === "solfege") {
    generateSolfegeExercise(rootMidi);
  } else if (state.settings.mode === "melody") {
    generateMelodyExercise(rootMidi);
  } else if (state.settings.mode === "rhythm-meter") {
    generateRhythmMeterExercise();
  } else if (state.settings.mode === "rhythm-dictation") {
    generateRhythmDictationExercise();
  } else if (state.settings.mode === "rhythm-tap") {
    generateRhythmTapExercise();
  } else if (state.settings.mode === "rhythm-groove") {
    generateRhythmGrooveExercise();
  } else if (state.settings.mode === "prod-tone") {
    generateProdToneExercise();
  } else if (state.settings.mode === "prod-eq-noise") {
    generateProdEqNoiseExercise();
  } else if (state.settings.mode === "modes-scale") {
    generateModesScaleExercise();
  } else if (state.settings.mode === "modes-char") {
    generateModesCharExercise();
  } else if (state.settings.mode === "modes-cadence") {
    generateModesCadenceExercise();
  } else if (isNotationMode(state.settings.mode)) {
    generateNotationExercise(state.settings.mode);
  } else if (isChordQualityMode(state.settings.mode)) {
    generateChordExercise(rootMidi, state.settings.mode);
  } else if (state.settings.mode === "chord-inversions") {
    generateChordInversionExercise(rootMidi);
  } else {
    generateIntervalExercise(rootMidi, state.settings.mode);
  }

  state.solfegeAnswered = false;
  state.melodyCompleted = false;
  state.rhythmDictationCompleted = false;
  state.rhythmTapSession = null;
  state.exerciseSolved = false;
  state.lastAnswerWasWrong = false;
  state.wrongAnswerData = null;
  if (state.streakState) {
    state.streakState.activeNoticeMilestone = 0;
  }
  cancelHumPause();
  markSingAlongIntroForExercise(state.currentExercise);
  renderUI();
}

// Moll-Kadenzen: gleiche Stufen-Logik wie Dur, Stufen bezogen auf die Moll-Tonika.
// V/V7 = harmonisches Moll (Leitton), v = natürliches Moll.
const MINOR_CADENCE_POOLS = {
  1: ["i", "iv", "V", "VI"],
  2: ["i", "iio", "III", "iv", "v", "V", "VI", "VII"],
  3: ["i", "iio", "iv", "V", "V7", "VI", "V/V", "N6"],
  4: ["i", "ii7b5", "III", "iv", "V7", "VI", "VII", "V/V", "bII7"]
};
// Übersetzung der Dur-Grundmuster (Stufe 1) in ihre Moll-Entsprechung
const MAJOR_TO_MINOR_L1 = { "I": "i", "IV": "iv", "V": "V", "vi": "VI" };

// Taktart-Auswahl in Kadenz-Übungen: abgeschaltet, weil sie bei 4 Akkorden pro Aufgabe nur das
// Tempo verändert (gleicher Effekt wie die Tempo-Auswahl). Solange aus, laufen Kadenzen immer in 4/4.
const CADENCE_TIME_SIG_PICKER_ENABLED = false;

function isCadenceMode(mode) {
  return mode === "cadence" || mode === "cadence-minor";
}

function isMinorCadenceMode(mode) {
  return mode === "cadence-minor";
}

function getCadenceTonicKey(tonality = "major") {
  return tonality === "minor" ? "i" : "I";
}

function generateCadenceExercise(rootMidi, tonality = "major") {
  const isMinor = tonality === "minor";
  const tonic = getCadenceTonicKey(tonality);
  let available = ["I", "IV", "V", "vi"];
  if (state.settings.difficulty === 2) available = ["I", "ii", "iii", "IV", "V", "vi"];
  if (state.settings.difficulty === 3) available = ["I", "ii", "IV", "V", "V7", "vi", "V/V"];
  if (state.settings.difficulty >= 4) available = ["I", "ii", "iii", "IV", "V", "V7", "vi", "V/V", "bII7"];
  if (isMinor) {
    const lvl = Math.max(1, Math.min(4, Number(state.settings.difficulty) || 1));
    available = MINOR_CADENCE_POOLS[lvl];
  }

  const isRandomPos = state.settings.cadencePos === "random";
  const targetIndex = isRandomPos ? Math.floor(Math.random() * 4) : 3;

  const cadencesL1 = [
    ["I", "IV", "V", "I"],
    ["I", "vi", "IV", "V"],
    ["I", "V", "vi", "IV"],
    ["I", "IV", "I", "V"]
  ];

  // Erweiterter L1-Pool für Zufallstakte: deckt an jeder Position 1–4 alle Stufen (I, IV, V, vi) gleichmäßig ab
  const cadencesL1RandomPool = [
    ...cadencesL1,
    ["I", "I", "IV", "V"],
    ["I", "V", "I", "vi"],
    ["I", "IV", "vi", "I"],
    ["I", "IV", "V", "vi"],
    ["vi", "IV", "I", "V"],
    ["IV", "V", "I", "I"],
    ["IV", "I", "V", "I"],
    ["V", "I", "IV", "I"],
    ["V", "vi", "IV", "I"]
  ];

  const toTonality = (pattern) => (isMinor ? pattern.map(k => MAJOR_TO_MINOR_L1[k] || k) : pattern);
  const l1Patterns = cadencesL1.map(toTonality);
  const l1RandomPool = cadencesL1RandomPool.map(toTonality);

  let raw;
  if (state.settings.difficulty === 1) {
    if (!isRandomPos) {
      raw = l1Patterns[Math.floor(Math.random() * l1Patterns.length)];
    } else {
      const wantedChord = available[Math.floor(Math.random() * available.length)];
      const matches = l1RandomPool.filter(p =>
        p[targetIndex] === wantedChord && (targetIndex > 0 || p.slice(1).includes(tonic))
      );
      raw = matches.length
        ? matches[Math.floor(Math.random() * matches.length)]
        : l1RandomPool[Math.floor(Math.random() * l1RandomPool.length)];
    }
  } else if (!isRandomPos) {
    raw = [tonic, ...Array.from({ length: 3 }, () => available[Math.floor(Math.random() * available.length)])];
  } else {
    raw = Array.from({ length: 4 }, () => available[Math.floor(Math.random() * available.length)]);
    if (targetIndex > 0) {
      raw[0] = tonic;
    } else if (![1, 2, 3].some(i => raw[i] === tonic)) {
      // Wenn Takt 1 gesucht ist, sorgt mindestens eine sichtbare Tonika in Takt 2–4 für klaren Kontext
      raw[1 + Math.floor(Math.random() * 3)] = tonic;
    }
  }

  const bars = raw.map(degKey => {
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

  state.currentExercise = {
    type: "cadence",
    tonality: isMinor ? "minor" : "major",
    keyName: getKeyDisplayName(state.currentKey, isMinor ? "minor" : "major"),
    targetIndex: targetIndex,
    targetItem: bars[targetIndex],
    bars: bars,
    choices: available
  };
}

let lastMelodicRootMidi = null;
const MELODIC_FLAT_KEY_PCS = new Set([1, 3, 5, 8, 10]);
const DOWNWARD_FLAT_INTERVAL_KEYS = new Set(["M2", "M3", "TT", "M6", "M7", "M9"]);

function pickMelodicRootMidi(isDown) {
  // Sinnvoller mittlerer Tonraum (auf dem Handy & im Ensemble klar hörbar, max. None innerhalb E3–Fis5):
  // Aufwärts: F3 (53) – E4 (64), Abwärts: Fis4 (66) – F5 (77)
  const minMidi = isDown ? 66 : 53;
  const maxMidi = isDown ? 77 : 64;
  const candidates = [];
  for (let m = minMidi; m <= maxMidi; m++) {
    if (m !== lastMelodicRootMidi) candidates.push(m);
  }
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  lastMelodicRootMidi = picked;
  return picked;
}

function getMelodicIntervalTiming(bpm = state.activeBpm) {
  const safeBpm = Math.max(40, Math.min(220, Number(bpm) || 90));
  const beatSec = 60 / safeBpm;
  const stepMs = Math.round(beatSec * 1000);
  const note1DurSec = Math.max(0.22, beatSec * 0.86);
  const note2DurSec = Math.max(0.28, beatSec * 1.25);
  const cycleMs = Math.round(beatSec * 2.4 * 1000);
  return { beatSec, stepMs, note1DurSec, note2DurSec, cycleMs };
}

function getDroneIntervalTiming(bpm = state.activeBpm) {
  const safeBpm = Math.max(40, Math.min(220, Number(bpm) || 90));
  const beatSec = 60 / safeBpm;
  const delayMs = Math.max(680, Math.min(1850, Math.round(beatSec * 1.75 * 1000)));
  const pianoDurSec = Math.max(0.85, Math.min(2.2, beatSec * 2.15));
  const padDurSec = Math.max(2.0, Number((delayMs / 1000 + pianoDurSec * 0.92).toFixed(2)));
  const cycleMs = Math.round(padDurSec * 1000 + 380);
  return { beatSec, delayMs, pianoDurSec, padDurSec, cycleMs };
}

/**
 * Berechnet kompakte, musikalisch gebundene Schrittabstände und Kadenzdauern
 * (~1,5–2 Schläge je Stufe mit längerem Schlussakkord, skaliert über BPM & Taktart).
 */
function getCadenceStepTiming(bpm = state.activeBpm, timeSig = state.activeTimeSig) {
  const safeBpm = Math.max(40, Math.min(220, Number(bpm) || CADENCE_DEFAULT_BPM));
  const beatSec = 60 / safeBpm;
  let stepBeats = 1.8;
  let finalHoldBeats = 2.4;
  if (timeSig === "3/4" || timeSig === "6/8") {
    stepBeats = 1.5;
    finalHoldBeats = 2.1;
  } else if (timeSig === "odd") {
    stepBeats = 2.0;
    finalHoldBeats = 2.6;
  }
  const stepSec = stepBeats * beatSec;
  const stepMs = Math.round(stepSec * 1000);
  const finalHoldSec = finalHoldBeats * beatSec;
  const finalHoldMs = Math.round(finalHoldSec * 1000);
  const stepDurSec = Math.max(0.32, stepSec * 0.99);
  const finalDurSec = Math.max(0.55, finalHoldSec * 0.94);
  return { beatSec, stepBeats, finalHoldBeats, stepMs, finalHoldMs, stepDurSec, finalDurSec };
}

const INTERVAL_SCALE_PRESETS = {
  ionian:     { id: "ionian",     pool: ["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"], triad: ["P1", "M3", "P5", "P8"] },
  aeolian:    { id: "aeolian",    pool: ["P1", "M2", "m3", "P4", "P5", "m6", "m7", "P8"], triad: ["P1", "m3", "P5", "P8"] },
  harm_minor: { id: "harm_minor", pool: ["P1", "M2", "m3", "P4", "P5", "m6", "M7", "P8"], triad: ["P1", "m3", "P5", "P8"] },
  mel_minor:  { id: "mel_minor",  pool: ["P1", "M2", "m3", "P4", "P5", "M6", "M7", "P8"], triad: ["P1", "m3", "P5", "P8"] },
  dorian:     { id: "dorian",     pool: ["P1", "M2", "m3", "P4", "P5", "M6", "m7", "P8"], triad: ["P1", "m3", "P5", "P8"] },
  phrygian:   { id: "phrygian",   pool: ["P1", "m2", "m3", "P4", "P5", "m6", "m7", "P8"], triad: ["P1", "m3", "P5", "P8"] },
  lydian:     { id: "lydian",     pool: ["P1", "M2", "M3", "TT", "P5", "M6", "M7", "P8"], triad: ["P1", "M3", "P5", "P8"] },
  mixolydian: { id: "mixolydian", pool: ["P1", "M2", "M3", "P4", "P5", "M6", "m7", "P8"], triad: ["P1", "M3", "P5", "P8"] },
  locrian:    { id: "locrian",    pool: ["P1", "m2", "m3", "P4", "TT", "m6", "m7", "P8"], triad: ["P1", "m3", "TT", "P8"] },
  chromatic:  { id: "chromatic",  pool: ["P1", "m2", "M2", "m3", "M3", "P4", "TT", "P5", "m6", "M6", "m7", "M7", "P8", "m9", "M9"], triad: ["P1", "m3", "M3", "P5", "P8"] }
};

function getLocalizedIntervalCustomScaleLabel(scaleId = state?.settings?.intervalCustomScale || "ionian") {
  const map = {
    ionian:     tr("Dur (Ionisch)", "Major (Ionian)"),
    aeolian:    tr("Natürlich Moll", "Natural Minor"),
    harm_minor: tr("Harmonisch Moll", "Harmonic Minor"),
    mel_minor:  tr("Melodisch Moll", "Melodic Minor"),
    dorian:     tr("Dorisch", "Dorian"),
    phrygian:   tr("Phrygisch", "Phrygian"),
    lydian:     tr("Lydisch", "Lydian"),
    mixolydian: tr("Mixolydisch", "Mixolydian"),
    locrian:    tr("Lokrisch", "Locrian"),
    chromatic:  tr("Chromatisch", "Chromatic")
  };
  return map[scaleId] || map.ionian;
}

function getLocalizedIntervalCustomScopeLabel(scope = state?.settings?.intervalCustomScope || "full") {
  const map = {
    triad: tr("Einsteiger (1/3/5/8)", "Beginner (1/3/5/8)"),
    lower: tr("Untere Hälfte (1–4)", "Lower Half (1–4)"),
    upper: tr("Obere Hälfte (5–8)", "Upper Half (5–8)"),
    full:  tr("Ganze Tonleiter (1–8)", "Full Scale (1–8)")
  };
  return map[scope] || map.full;
}

function getIntervalCustomDefaultPool(scaleId = "ionian", scope = "full") {
  const preset = INTERVAL_SCALE_PRESETS[scaleId] || INTERVAL_SCALE_PRESETS.ionian;
  if (scope === "triad") return [...preset.triad];
  if (scope === "lower") {
    return preset.id === "chromatic"
      ? ["P1", "m2", "M2", "m3", "M3", "P4", "TT"]
      : preset.pool.slice(0, 4);
  }
  if (scope === "upper") {
    return preset.id === "chromatic"
      ? ["P5", "m6", "M6", "m7", "M7", "P8", "m9", "M9"]
      : preset.pool.slice(4, 8);
  }
  return [...preset.pool];
}

function getActiveIntervalCustomPool() {
  const allOrder = Object.keys(HARMONIC_DATA.intervals);
  const custom = state?.settings?.intervalCustomPool;
  if (Array.isArray(custom)) {
    const valid = allOrder.filter(k => custom.includes(k));
    if (valid.length >= 2) return valid;
  }
  return getIntervalCustomDefaultPool(
    state?.settings?.intervalCustomScale || "ionian",
    state?.settings?.intervalCustomScope || "full"
  );
}

function getIntervalCustomRootLabel(rootSetting = state?.settings?.intervalCustomRoot ?? "random") {
  const v = String(rootSetting ?? "random");
  if (/^(?:[0-9]|1[01])$/.test(v)) {
    return getModesRootDisplayName(MODES_ROOT_MIDI_BY_PC[Number(v)]);
  }
  return tr("Zufall", "Random");
}

function getIntervalCustomBadgeLabel() {
  const rootLbl = getIntervalCustomRootLabel();
  const scaleLbl = getLocalizedIntervalCustomScaleLabel();
  return `${rootLbl} • ${scaleLbl}`;
}

function getIntervalCustomSummaryLabel() {
  const rootLbl = getIntervalCustomRootLabel();
  const scaleLbl = getLocalizedIntervalCustomScaleLabel();
  return `${scaleLbl} (${rootLbl})`;
}

function generateIntervalExercise(rootMidi, intervalMode) {
  const lvl = parseInt(state.settings.intervalDifficulty, 10) || 1;
  let pool = ["P1", "M3", "P5", "P8"];
  if (lvl === 2) {
    pool = ["P1", "M2", "M3", "P4"];
  } else if (lvl === 3) {
    pool = ["P5", "M6", "M7", "P8"];
  } else if (lvl === 4) {
    pool = ["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"];
  } else if (lvl === 5) {
    pool = Object.keys(HARMONIC_DATA.intervals);
  } else if (lvl === 6) {
    pool = ["P1", "m3", "P5", "P8"];
  } else if (lvl === 7) {
    pool = ["P1", "M2", "m3", "P4"];
  } else if (lvl === 8) {
    pool = ["P5", "m6", "m7", "P8"];
  } else if (lvl === 9) {
    pool = ["P1", "M2", "m3", "P4", "P5", "m6", "m7", "P8"];
  } else if (lvl === 10) {
    pool = getActiveIntervalCustomPool();
  }
  if (state.exam?.active && Array.isArray(state.exam.fixedIntervalPool) && state.exam.fixedIntervalPool.length >= 2) {
    pool = [...state.exam.fixedIntervalPool];
  }

  const chosenKey = pickTargetKeyWithSessionReview(intervalMode, pool, getLastTargetKeyForType(intervalMode));
  const targetDef = getLocalizedIntervalDef(chosenKey);

  const isMelodicUp = intervalMode === "interval-melodic";
  const isMelodicDown = intervalMode === "interval-melodic-down";
  const isMelodic = isMelodicUp || isMelodicDown;
  const isDrone = intervalMode === "interval-drone";

  let effectiveRootMidi = (isMelodic || isDrone) ? pickMelodicRootMidi(isMelodicDown) : rootMidi;
  if (lvl === 10 && (!state.exam?.active || state.exam?.useCustomIntervalRoot)) {
    const customRoot = String(state.settings.intervalCustomRoot ?? "random");
    if (/^(?:[0-9]|1[01])$/.test(customRoot)) {
      const baseMidi = MODES_ROOT_MIDI_BY_PC[Number(customRoot)] || 60;
      effectiveRootMidi = isMelodicDown && baseMidi < 64 ? baseMidi + 12 : baseMidi;
    } else if (!isMelodic && !isDrone) {
      effectiveRootMidi = MODES_ROOT_MIDI_BY_PC[Math.floor(Math.random() * 12)];
    }
  }
  const directionSign = isMelodicDown ? -1 : 1;
  const targetMidi = effectiveRootMidi + directionSign * targetDef.semitones;

  const refNoteName = midiToNote(effectiveRootMidi);
  const targetNoteName = midiToNote(targetMidi);
  const padLowNoteName = midiToNote(effectiveRootMidi - 12);
  const padNotes = [padLowNoteName, refNoteName];

  const rootPc = ((effectiveRootMidi % 12) + 12) % 12;
  const refPreferFlat = (isMelodic || isDrone)
    ? MELODIC_FLAT_KEY_PCS.has(rootPc)
    : FLAT_KEYS.has(state.currentKey);
  const targetPreferFlat = isMelodicDown
    ? (refPreferFlat || DOWNWARD_FLAT_INTERVAL_KEYS.has(chosenKey))
    : (refPreferFlat || MINOR_INTERVAL_KEYS.has(chosenKey));

  const refDisplayNote = midiToGermanNote(effectiveRootMidi, refPreferFlat);
  const targetDisplayNote = midiToGermanNote(targetMidi, targetPreferFlat);

  let bars = [];
  let targetIdx = 0;

  if (isMelodic) {
    bars = [
      {
        symbol: refDisplayNote,
        label: isMelodicDown ? tr("Ausgangston (Hoch)", "Root Note (High)") : tr("Ausgangston (Ton 1)", "Root Note (Note 1)"),
        short: tr("Ausgangston", "Root Note"),
        notes: [refNoteName],
        bass: null
      },
      {
        symbol: targetDisplayNote,
        label: targetDef.label,
        short: targetDef.short,
        notes: [targetNoteName],
        bass: null,
        key: chosenKey
      }
    ];
    targetIdx = 1;
  } else if (isDrone) {
    bars = [
      {
        symbol: refDisplayNote,
        label: tr("Grundton (Streicher-Fläche)", "Root (Strings Pad)"),
        short: tr("Streicher-Fläche", "Strings Pad"),
        notes: padNotes,
        bass: null
      },
      {
        symbol: targetDisplayNote,
        label: targetDef.label,
        short: targetDef.short,
        notes: [targetNoteName],
        bass: null,
        key: chosenKey
      }
    ];
    targetIdx = 1;
  } else {
    bars = [
      { symbol: `${refDisplayNote} + ${targetDisplayNote}`, label: targetDef.label, short: targetDef.short, notes: [refNoteName, targetNoteName], bass: null, key: chosenKey }
    ];
    targetIdx = 0;
  }

  state.currentExercise = {
    type: intervalMode,
    effectiveRootMidi: effectiveRootMidi,
    targetMidi: targetMidi,
    refPreferFlat: refPreferFlat,
    targetPreferFlat: targetPreferFlat,
    isMelodic: isMelodic,
    isMelodicDown: isMelodicDown,
    isDrone: isDrone,
    padNotes: padNotes,
    keyName: `${tr("Ausgangston", "Root")} ${refDisplayNote.replace(/[0-9]/g, "")}`,
    targetIndex: targetIdx,
    targetItem: {
      ...targetDef,
      key: chosenKey,
      rootMidi: effectiveRootMidi,
      directionSign: directionSign,
      refNote: refNoteName,
      targetNote: targetNoteName,
      padNotes: padNotes,
      displayMain: bars[targetIdx].symbol,
      notes: [refNoteName, targetNoteName]
    },
    bars: bars,
    choices: pool,
    reviewScope: intervalMode,
    reviewKey: chosenKey
  };
}

function generateChordExercise(rootMidi, chordMode = "interval-chords") {
  const lvl = state.settings.chordDifficulty || 1;
  const pool = CHORD_LEVEL_POOLS[lvl] || CHORD_LEVEL_POOLS[1];
  const chosenKey = pickTargetKeyWithSessionReview(chordMode, pool, getLastTargetKeyForType(chordMode));
  const targetDef = getLocalizedChordDef(chosenKey);

  const chordNotes = targetDef.offsets.map(s => midiToNote(rootMidi + s));
  const refNoteName = midiToNote(rootMidi);
  const notesDisplay = formatChordGermanNotes(rootMidi, targetDef.offsets, state.currentKey);
  const rootDisplay = midiToGermanNote(rootMidi, FLAT_KEYS.has(state.currentKey)).replace(/[0-9]/g, "");

  const bars = [
    {
      symbol: notesDisplay,
      label: targetDef.label,
      short: targetDef.short,
      notes: chordNotes,
      bass: null,
      key: chosenKey
    }
  ];

  state.currentExercise = {
    type: chordMode,
    offsets: targetDef.offsets,
    rootKey: state.currentKey,
    keyName: `${tr("Grundton", "Root")} ${rootDisplay}`,
    targetIndex: 0,
    targetItem: {
      ...targetDef,
      key: chosenKey,
      rootMidi: rootMidi,
      refNote: refNoteName,
      targetNote: chordNotes[1] || refNoteName,
      displayMain: notesDisplay,
      notes: chordNotes
    },
    bars: bars,
    choices: pool,
    reviewScope: chordMode,
    reviewKey: chosenKey
  };
}

function generateChordInversionExercise(rootMidi) {
  const lvl = state.settings.chordInversionDifficulty || 1;
  const cfg = CHORD_INVERSION_LEVELS[lvl] || CHORD_INVERSION_LEVELS[1];
  const chordKey = cfg.chordKeys[Math.floor(Math.random() * cfg.chordKeys.length)];
  const chosenInvKey = pickTargetKeyWithSessionReview("chord-inversions", cfg.choices, getLastTargetKeyForType("chord-inversions"));
  const invDef = getLocalizedChordInversionDef(chosenInvKey);
  const chordDef = getLocalizedChordDef(chordKey);
  const invData = buildChordInversionNotes(rootMidi, chordKey, invDef.stepIndex, state.currentKey);
  const rootDisplay = midiToGermanNote(rootMidi, FLAT_KEYS.has(state.currentKey)).replace(/[0-9]/g, "");
  const solvedShort = `${invData.slashTitle} • ${invDef.short}`;
  const fullLabel = `${invDef.label} • ${invData.slashTitle} (${chordDef.short})`;

  const bars = [
    {
      symbol: invData.noteDisplay,
      label: fullLabel,
      short: solvedShort,
      notes: invData.notes,
      bass: null,
      key: chosenInvKey
    }
  ];

  state.currentExercise = {
    type: "chord-inversions",
    chordKey: chordKey,
    inversionLevel: lvl,
    rootKey: state.currentKey,
    keyName: `${tr("Grundton", "Root")} ${rootDisplay}`,
    targetIndex: 0,
    targetItem: {
      ...invDef,
      label: fullLabel,
      key: chosenInvKey,
      chordKey: chordKey,
      rootMidi: rootMidi,
      bassMidi: invData.bassMidi,
      bassNote: invData.bassNote,
      refNote: midiToNote(rootMidi),
      displayMain: invData.noteDisplay,
      slashTitle: invData.slashTitle,
      notes: invData.notes,
      midis: invData.midis
    },
    bars: bars,
    choices: cfg.choices,
    reviewScope: "chord-inversions",
    reviewKey: chosenInvKey
  };
}

function generateRhythmMeterExercise() {
  const lvl = state.settings.rhythmMeterDifficulty || 1;
  const pool = RHYTHM_METER_LEVELS[lvl] || RHYTHM_METER_LEVELS[1];
  const chosenKey = pool[Math.floor(Math.random() * pool.length)];
  const targetDef = getLocalizedRhythmMeter(chosenKey) || getLocalizedRhythmMeter("4/4");

  const bars = [
    { symbol: targetDef.symbol, short: targetDef.short, label: targetDef.label, key: chosenKey },
    { symbol: targetDef.symbol, short: targetDef.short, label: targetDef.label, key: chosenKey }
  ];

  state.currentExercise = {
    type: "rhythm-meter",
    level: lvl,
    keyName: tr("Metrum", "Meter"),
    targetIndex: 0,
    targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.symbol },
    bars: bars,
    choices: pool
  };
}

function generateProdToneExercise() {
  const lvl = state.settings.prodToneDifficulty || 1;
  const cfg = PROD_TONE_LEVELS[lvl] || PROD_TONE_LEVELS[1];
  const prevKey = state.currentExercise?.type === "prod-tone" ? state.currentExercise.targetItem?.key : null;
  const candidates = cfg.choices.length > 1 ? cfg.choices.filter(k => k !== prevKey) : cfg.choices;
  const chosenKey = candidates[Math.floor(Math.random() * candidates.length)] || cfg.choices[0];
  const targetDef = getLocalizedProdFreq(chosenKey) || getLocalizedProdFreq("1000");

  state.currentExercise = {
    type: "prod-tone",
    level: lvl,
    levelLabel: getLocalizedProdLevelLabel("tone", lvl),
    keyName: tr("Sinuston", "Sine Wave"),
    targetIndex: 0,
    targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.symbol },
    bars: [
      { symbol: targetDef.symbol, short: targetDef.short, label: targetDef.label, key: chosenKey }
    ],
    choices: cfg.choices
  };
}

function formatEqParamsLabel(boostDb, q) {
  const commaLabel = `+${String(boostDb).replace(".", ",")} dB • Q ${String(q).replace(".", ",")}`;
  return tr(commaLabel, `+${boostDb} dB • Q ${q}`, { fr: commaLabel, uk: commaLabel });
}

function generateProdEqNoiseExercise() {
  const lvl = state.settings.prodEqNoiseDifficulty || 1;
  const cfg = PROD_EQ_NOISE_LEVELS[lvl] || PROD_EQ_NOISE_LEVELS[1];
  const prevKey = state.currentExercise?.type === "prod-eq-noise" ? state.currentExercise.targetItem?.key : null;
  const candidates = cfg.choices.length > 1 ? cfg.choices.filter(k => k !== prevKey) : cfg.choices;
  const chosenKey = candidates[Math.floor(Math.random() * candidates.length)] || cfg.choices[0];
  const targetDef = getLocalizedProdFreq(chosenKey) || getLocalizedProdFreq("1000");

  state.currentExercise = {
    type: "prod-eq-noise",
    level: lvl,
    levelLabel: getLocalizedProdLevelLabel("eq", lvl),
    boostDb: cfg.boostDb,
    q: cfg.q,
    noiseBypassed: false,
    keyName: formatEqParamsLabel(cfg.boostDb, cfg.q),
    targetIndex: 1,
    targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.symbol },
    bars: [
      { symbol: "Flat", short: tr("Original-Noise", "Original Noise"), label: tr("Klicken für Flat-Vergleich (Bypass)", "Click for Flat A/B comparison (Bypass)"), key: "ref" },
      { symbol: targetDef.symbol, short: targetDef.short, label: targetDef.label, key: chosenKey }
    ],
    choices: cfg.choices
  };
}

// ---------- Tonleitern & Modi: wählbarer Grundton ----------
// Tonklasse → Grundton-MIDI im bequemen Mittelregister (G3 … F#4)
const MODES_ROOT_MIDI_BY_PC = [60, 61, 62, 63, 64, 65, 66, 55, 56, 57, 58, 59];
const MODES_ROOT_FLAT_MIDIS = new Set([56, 58, 61, 63]); // As, B(b), Des, Es mit b schreiben
const MODES_ROOT_LEGACY_POOL = [55, 57, 58, 60, 62, 63, 64, 65]; // „Automatisch“ auf Stufen mit Zufallsgrundton

function getModesRootSetting() {
  if (state.exam?.active) return "auto"; // Prüfungen bleiben bei den Vorgaben der Stufe
  const v = String(state.settings.modesRoot ?? "auto");
  return v === "random" || /^(?:[0-9]|1[01])$/.test(v) ? v : "auto";
}

function resolveModesRootMidi(levelCfg) {
  const setting = getModesRootSetting();
  if (setting === "random") {
    return MODES_ROOT_MIDI_BY_PC[Math.floor(Math.random() * 12)];
  }
  if (setting !== "auto") return MODES_ROOT_MIDI_BY_PC[Number(setting)];
  return levelCfg?.randomRoot
    ? MODES_ROOT_LEGACY_POOL[Math.floor(Math.random() * MODES_ROOT_LEGACY_POOL.length)]
    : 60;
}

/** Anzeigename des Grundtons gemäß Notations-Einstellung (z. B. „Es“/„Eb“, „H“/„B“). */
function getModesRootDisplayName(rootMidi) {
  return midiToGermanNote(rootMidi, MODES_ROOT_FLAT_MIDIS.has(rootMidi)).replace(/-?\d+$/, "");
}

function getModesRootSettingLabel(setting = getModesRootSetting()) {
  if (setting === "random") return tr("Zufall", "Random");
  if (setting === "auto") return tr("Automatisch", "Automatic", { fr: "Automatique", es: "Automático", pl: "Automatycznie", uk: "Автоматично", ur: "خودکار" });
  return getModesRootDisplayName(MODES_ROOT_MIDI_BY_PC[Number(setting)]);
}

function renderModesRootPopover() {
  const pop = document.getElementById("inlineModesRootPopover");
  if (!pop) return;
  const exType = String(state.currentExercise?.type || state.settings.mode || "");
  if (exType.startsWith("interval-") && exType !== "interval-chords" && parseInt(state.settings.intervalDifficulty, 10) === 10) {
    const curRoot = String(state.settings.intervalCustomRoot ?? "random");
    const curScale = String(state.settings.intervalCustomScale || "ionian");
    const curScope = String(state.settings.intervalCustomScope || "full");
    const rootOptions = ["random", ...Array.from({ length: 12 }, (_, pc) => String(pc))];
    const scaleIds = Object.keys(INTERVAL_SCALE_PRESETS);
    const scopeIds = ["triad", "lower", "upper", "full"];
    pop.innerHTML = `
      <span class="popover-label">${escapeHtml(tr("Grundton:", "Root:"))}</span>
      <div class="popover-pills-row modes-root-pills">
        ${rootOptions.map(opt => `<button type="button" class="popover-pill-btn${opt === curRoot ? " active" : ""}" data-int-pop-root="${opt}" aria-pressed="${opt === curRoot}">${escapeHtml(getIntervalCustomRootLabel(opt))}</button>`).join("")}
      </div>
      <span class="popover-label" style="margin-top:0.35rem;">${escapeHtml(tr("Tonleiter / Modus:", "Scale / Mode:"))}</span>
      <div class="popover-pills-row modes-root-pills">
        ${scaleIds.map(sid => `<button type="button" class="popover-pill-btn${sid === curScale ? " active" : ""}" data-int-pop-scale="${sid}" aria-pressed="${sid === curScale}">${escapeHtml(getLocalizedIntervalCustomScaleLabel(sid))}</button>`).join("")}
      </div>
      <span class="popover-label" style="margin-top:0.35rem;">${escapeHtml(tr("Umfang:", "Range:"))}</span>
      <div class="popover-pills-row modes-root-pills">
        ${scopeIds.map(sc => `<button type="button" class="popover-pill-btn${sc === curScope && !state.settings.intervalCustomPool ? " active" : ""}" data-int-pop-scope="${sc}" aria-pressed="${sc === curScope && !state.settings.intervalCustomPool}">${escapeHtml(getLocalizedIntervalCustomScopeLabel(sc))}</button>`).join("")}
      </div>
    `;
    const refreshCustomIntervalEx = () => {
      state.updateHeaderSubtext();
      renderModesRootPopover();
      cancelListenOnlyTimers();
      stopPlayback();
      generateExercise();
      if (state.listenOnly.active) startListenOnlyCycle();
    };
    pop.querySelectorAll("[data-int-pop-root]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        state.settings.intervalCustomRoot = btn.dataset.intPopRoot;
        refreshCustomIntervalEx();
      });
    });
    pop.querySelectorAll("[data-int-pop-scale]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        state.settings.intervalCustomScale = btn.dataset.intPopScale;
        state.settings.intervalCustomPool = null;
        refreshCustomIntervalEx();
      });
    });
    pop.querySelectorAll("[data-int-pop-scope]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        state.settings.intervalCustomScope = btn.dataset.intPopScope;
        state.settings.intervalCustomPool = null;
        refreshCustomIntervalEx();
      });
    });
    return;
  }
  const current = getModesRootSetting();
  const options = ["auto", ...Array.from({ length: 12 }, (_, pc) => String(pc)), "random"];
  const label = tr("Grundton:", "Root:", { fr: "Tonique :", es: "Tónica:", pl: "Dźwięk podstawowy:", uk: "Тоніка:", ur: "بنیادی سُر:" });
  const hint = tr(
    "„Automatisch“: C auf den Stufen 1–2, wechselnd auf Stufe 3.",
    "“Automatic”: C on levels 1–2, changing on level 3.",
    {
      fr: "« Automatique » : Do aux niveaux 1–2, variable au niveau 3.",
      es: "«Automático»: Do en los niveles 1–2, variable en el nivel 3.",
      pl: "„Automatycznie”: C na poziomach 1–2, zmienny na poziomie 3.",
      uk: "«Автоматично»: C на рівнях 1–2, змінна на рівні 3.",
      ur: "„خودکار“: لیول 1–2 پر C، لیول 3 پر بدلتا ہوا۔"
    }
  );
  pop.innerHTML = `
    <span class="popover-label">${escapeHtml(label)}</span>
    <div class="popover-pills-row modes-root-pills">
      ${options.map(opt => `<button type="button" class="popover-pill-btn${opt === current ? " active" : ""}" data-modes-root="${opt}" aria-pressed="${opt === current}">${escapeHtml(getModesRootSettingLabel(opt))}</button>`).join("")}
    </div>
    <span class="modes-root-hint">${escapeHtml(hint)}</span>`;
  pop.querySelectorAll("[data-modes-root]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      state.settings.modesRoot = btn.dataset.modesRoot;
      pop.classList.add("hidden");
      document.getElementById("targetBarBadge")?.classList.remove("chip-open");
      cancelListenOnlyTimers();
      stopPlayback();
      generateExercise();
      if (state.listenOnly.active) startListenOnlyCycle();
    });
  });
}

function buildModesExercise(exType, level, levelCfg) {
  const prevKey = state.currentExercise?.type === exType ? state.currentExercise.targetItem?.key : null;
  const candidates = levelCfg.choices.length > 1
    ? levelCfg.choices.filter(k => k !== prevKey)
    : levelCfg.choices;
  const reviewKey = pickSessionReviewKey(exType, levelCfg.choices, prevKey);
  const freeCandidates = filterCoolingSessionReviewKeys(exType, candidates, prevKey);
  const chosenKey = reviewKey ?? (freeCandidates[Math.floor(Math.random() * freeCandidates.length)] || levelCfg.choices[0]);
  const targetDef = getLocalizedModeDef(chosenKey) || getLocalizedModeDef("ionian");

  const rootMidi = resolveModesRootMidi(levelCfg);
  const rootLabel = getModesRootDisplayName(rootMidi);
  const preferFlat = ["dorian", "phrygian", "mixolydian", "aeolian", "locrian", "harm_minor"].includes(chosenKey)
    || [58, 63, 65].includes(rootMidi);
  const toNote = (semi) => midiToNote(rootMidi + semi, preferFlat);

  const modeKind = exType === "modes-char"
    ? "char"
    : (exType === "modes-cadence" ? "cadence" : "scale");
  const kindLabel = modeKind === "char"
    ? tr("Charakterton", "Color Tone")
    : (modeKind === "cadence" ? tr("Kadenz", "Chord Loop") : tr("Tonleiter", "Scale"));

  state.currentExercise = {
    type: exType,
    level: level,
    modeKind: modeKind,
    chosenKey: chosenKey,
    reviewScope: exType,
    reviewKey: chosenKey,
    levelLabel: getLocalizedModeLevelLabel(modeKind, level),
    rootMidi: rootMidi,
    rootLabel: rootLabel,
    keyName: `${tr("Grundton", "Root")} ${rootLabel}`,
    anchorBass: midiToNote(rootMidi - 12, preferFlat),
    anchorNotes: [midiToNote(rootMidi - 12, preferFlat), toNote(0), toNote(7)],
    scaleNotes: targetDef.intervals.map(toNote),
    charNotes: targetDef.charTurn.map(toNote),
    vampChords: targetDef.vampOffsets.map(ch => ch.map(toNote)),
    targetIndex: 1,
    targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.roman },
    bars: [
      { symbol: `${rootLabel}5`, short: tr("Anker-Quinte", "Anchor Fifth"), label: tf("Neutraler Ausgangsklang ({root}5)", "Neutral open fifth ({root}5)", { root: rootLabel }), key: "ref" },
      { symbol: targetDef.roman, short: targetDef.short, label: `${kindLabel} (${rootLabel})`, key: chosenKey }
    ],
    choices: levelCfg.choices
  };
}

function generateModesScaleExercise() {
  const lvl = state.settings.modesScaleDifficulty || 1;
  buildModesExercise("modes-scale", lvl, MODE_SCALE_LEVELS[lvl] || MODE_SCALE_LEVELS[1]);
}

function generateModesCharExercise() {
  const lvl = state.settings.modesCharDifficulty || 1;
  buildModesExercise("modes-char", lvl, MODE_CHAR_LEVELS[lvl] || MODE_CHAR_LEVELS[1]);
}

function generateModesCadenceExercise() {
  const lvl = state.settings.modesCadenceDifficulty || 1;
  buildModesExercise("modes-cadence", lvl, MODE_CADENCE_LEVELS[lvl] || MODE_CADENCE_LEVELS[1]);
}

function generateRhythmDictationExercise() {
  const lvl = state.settings.rhythmDictationDifficulty || 1;
  const pool = RHYTHM_DICTATION_LEVELS[lvl] || RHYTHM_DICTATION_LEVELS[1];

  let pickedKeys = null;
  for (let attempt = 0; attempt < 24; attempt++) {
    const candidate = [];
    for (let i = 0; i < 4; i++) {
      let avail = pool;
      if (lvl === 1 && i === 0) {
        avail = pool.filter(k => k !== "rest");
      }
      candidate.push(avail[Math.floor(Math.random() * avail.length)]);
    }
    const distinct = new Set(candidate);
    const totalHits = candidate.reduce((sum, k) => sum + RHYTHM_DICTATION_CELLS[k].offsets.length, 0);
    if (distinct.size >= 2 && totalHits >= 2) {
      pickedKeys = candidate;
      break;
    }
  }
  if (!pickedKeys) {
    pickedKeys = [pool[0], pool[Math.min(1, pool.length - 1)], pool[pool.length - 1], pool[0]];
  }

  const rhythmSlots = pickedKeys.map((cellKey, idx) => {
    const cell = getLocalizedRhythmCell(cellKey);
    return {
      index: idx,
      cellKey: cellKey,
      cell: cell,
      solved: false
    };
  });

  state.currentExercise = {
    type: "rhythm-dictation",
    level: lvl,
    keyName: "4/4",
    targetIndex: 0,
    targetItem: rhythmSlots[0].cell,
    rhythmSlots: rhythmSlots,
    rhythmStep: 0,
    bars: rhythmSlots.map((_, i) => ({ symbol: "?", short: `${tr("Schlag", "Beat")} ${i + 1}`, label: `${tr("Schlag", "Beat")} ${i + 1}` })),
    choices: pool
  };
}

function generateRhythmTapExercise() {
  const lvl = state.settings.rhythmTapDifficulty || 1;
  const cfg = RHYTHM_TAP_LEVELS[lvl] || RHYTHM_TAP_LEVELS[1];
  const meterKey = cfg.meters[Math.floor(Math.random() * cfg.meters.length)];
  const beatsPerBar = meterKey === "3/4" ? 3 : 4;

  let pickedKeys = null;
  for (let attempt = 0; attempt < 24; attempt++) {
    const candidate = [];
    let tripletCount = 0;
    for (let i = 0; i < beatsPerBar; i++) {
      let avail = cfg.cells.slice();
      if (lvl === 1 && i === 0) avail = avail.filter(k => k !== "rest");
      if (tripletCount >= 1) avail = avail.filter(k => k !== "triplet");
      const k = avail[Math.floor(Math.random() * avail.length)];
      if (k === "triplet") tripletCount++;
      candidate.push(k);
    }
    const totalHits = candidate.reduce((s, k) => s + RHYTHM_DICTATION_CELLS[k].offsets.length, 0);
    if (totalHits >= 2 && totalHits <= 7) {
      pickedKeys = candidate;
      break;
    }
  }
  if (!pickedKeys) {
    pickedKeys = beatsPerBar === 3 ? ["quarter", "rest", "quarter"] : ["quarter", "rest", "quarter", "quarter"];
  }

  const tapSlots = pickedKeys.map((cellKey, idx) => ({
    index: idx,
    cellKey: cellKey,
    cell: getLocalizedRhythmCell(cellKey)
  }));

  // Vom Blatt: Toleranz nie größer als 35 % des kleinsten Notenabstands, damit jeder Tap eindeutig einer Note zugeordnet wird
  const readMode = Boolean(state.settings.rhythmTapReadMode);
  let toleranceMs = cfg.toleranceMs;
  if (readMode) {
    const beatMsNow = 60000 / (state.activeBpm || state.settings.bpm || 90);
    const onsets = [];
    pickedKeys.forEach((k, beatIdx) => RHYTHM_DICTATION_CELLS[k].offsets.forEach(off => onsets.push((beatIdx + off) * beatMsNow)));
    let minGap = Infinity;
    for (let i = 1; i < onsets.length; i++) minGap = Math.min(minGap, onsets[i] - onsets[i - 1]);
    if (Number.isFinite(minGap)) toleranceMs = Math.max(45, Math.min(cfg.toleranceMs, Math.round(minGap * 0.35)));
  }

  state.currentExercise = {
    type: "rhythm-tap",
    level: lvl,
    readMode: readMode,
    levelLabel: getLocalizedRhythmTapLevel(lvl).label,
    meterKey: meterKey,
    beatsPerBar: beatsPerBar,
    toleranceMs: toleranceMs,
    blind: cfg.blind,
    tapSlots: tapSlots,
    tapEvaluated: false,
    lastEvaluation: null,
    targetIndex: 0,
    targetItem: tapSlots[0].cell,
    bars: tapSlots.map((s, i) => ({ symbol: String(i + 1), short: s.cell.short, label: s.cell.label })),
    choices: []
  };
}

function generateRhythmGrooveExercise() {
  const lvl = state.settings.rhythmGrooveDifficulty || 1;

  if (lvl === 1) {
    const pool = ["march", "backbeat", "syncopation", "swing", "poly32"];
    const chosenKey = pool[Math.floor(Math.random() * pool.length)];
    const targetDef = getLocalizedRhythmGroove(chosenKey);
    state.currentExercise = {
      type: "rhythm-groove",
      level: lvl,
      grooveKind: "style",
      keyName: tr("4/4 Groove", "4/4 Groove"),
      targetIndex: 0,
      targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.roman },
      bars: [
        { symbol: targetDef.roman, short: targetDef.short, label: targetDef.label, key: chosenKey },
        { symbol: targetDef.roman, short: targetDef.short, label: targetDef.label, key: chosenKey }
      ],
      choices: pool
    };
    return;
  }

  if (lvl === 2) {
    const pool = ["1", "1+", "2", "2+", "3", "3+", "4", "4+"];
    const chosenKey = pool[Math.floor(Math.random() * pool.length)];
    const targetDef = getLocalizedRhythmOffbeat(chosenKey);
    state.currentExercise = {
      type: "rhythm-groove",
      level: lvl,
      grooveKind: "offbeat",
      keyName: tr("Akzent-Takt", "Accent Bar"),
      targetIndex: 1,
      targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.roman },
      bars: [
        { symbol: "1–4", short: tr("Puls", "Pulse"), label: tr("Referenz-Takt", "Reference Bar"), key: "ref" },
        { symbol: targetDef.roman, short: targetDef.short, label: targetDef.label, key: chosenKey }
      ],
      choices: pool
    };
    return;
  }

  // Stufe 3 (Mittel: 48–66 ms) & Stufe 4 (Profi: 24–34 ms)
  const pool = ["early", "pocket", "late"];
  const chosenKey = pool[Math.floor(Math.random() * pool.length)];
  const targetDef = getLocalizedRhythmMicroTiming(chosenKey);
  const minMag = lvl >= 4 ? 24 : 48;
  const maxMag = lvl >= 4 ? 34 : 66;
  const microMagMs = chosenKey === "pocket"
    ? 0
    : minMag + Math.floor(Math.random() * (maxMag - minMag + 1));

  state.currentExercise = {
    type: "rhythm-groove",
    level: lvl,
    grooveKind: "micro",
    microMagMs: microMagMs,
    keyName: lvl >= 4 ? tr("Profi ±28 ms", "Pro ±28 ms") : tr("Pocket ±55 ms", "Pocket ±55 ms"),
    targetIndex: 0,
    targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.roman },
    bars: [
      { symbol: targetDef.roman, short: targetDef.short, label: targetDef.label, key: chosenKey }
    ],
    choices: pool
  };
}

/**
 * Erstellt eine Solfège-Aufgabe für alle 6 Schwierigkeitsstufen:
 * - Stufe 1: C-Dur, 1 Oktave (mittlere Höhe)
 * - Stufe 2: Nicht C-Dur (fest für Sitzung), 1 Oktave
 * - Stufe 3: C-Dur, mehrere Oktaven
 * - Stufe 4: Nicht C-Dur (fest für Sitzung), mehrere Oktaven
 * - Stufe 5: Nicht C-Dur (neu nach jeder Antwort), 1 Oktave
 * - Stufe 6: Nicht C-Dur (neu nach jeder Antwort), mehrere Oktaven
 */
// Kreispfeil („nochmal/neu/wechseln“) als Linien-Icon. Das Zeichen „↻“ fehlt in der App-Schrift Andika
// und erschien auf Mobilgeräten/in der App als fremdes Emoji-/Systemsymbol.
const REFRESH_ICON_SVG = '<svg class="inline-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.35-5.66"/><path d="M20 4.5v4.6h-4.6"/></svg>';

// Solfège „Mehrere Oktaven“: drei feste Tonlagen (je 12 Halbtöne, jede Tonstufe passt genau einmal hinein).
// Tief ≈ um C3, mittel ≈ um C4, hoch ≈ um C5 – unabhängig davon, wo die Tonart auf der Klaviatur liegt.
const SOLFEGE_OCTAVE_BANDS = {
  low:  { min: 43, max: 54 },   // G2 – Fis3
  mid:  { min: 55, max: 66 },   // G3 – Fis4
  high: { min: 67, max: 78 }    // G4 – Fis5
};
let solfegeOctaveBag = [];
let lastSolfegeOctaveBand = null;

/**
 * Gemischte, aber gleichmäßige Lagen: In jedem Dreierblock kommt jede Lage genau einmal vor
 * (Reihenfolge zufällig, keine direkte Wiederholung über die Blockgrenze).
 */
function nextSolfegeOctaveBand() {
  if (!solfegeOctaveBag.length) {
    const bag = Object.keys(SOLFEGE_OCTAVE_BANDS);
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    if (bag[0] === lastSolfegeOctaveBand) bag.push(bag.shift());
    solfegeOctaveBag = bag;
  }
  lastSolfegeOctaveBand = solfegeOctaveBag.shift();
  return lastSolfegeOctaveBand;
}

/** Oktavverschiebung (Vielfaches von 12), die den Klaviatur-Ton in die gewünschte Lage bringt. */
function getSolfegeOctaveShiftForBand(keyboardMidi, bandKey) {
  const band = SOLFEGE_OCTAVE_BANDS[bandKey];
  if (!band) return 0;
  for (let shift = -36; shift <= 36; shift += 12) {
    const m = keyboardMidi + shift;
    if (m >= band.min && m <= band.max) return shift;
  }
  return 0;
}

function generateSolfegeExercise(rootMidi) {
  const sLvl = state.settings.solfegeDifficulty || 1;
  const isMultiOctave = sLvl === 3 || sLvl === 4 || sLvl === 6;

  const solfegeLastKey = getLastTargetKeyForType("solfege");
  const solfegeReviewKey = pickSessionReviewKey("solfege", SOLFEGE_SCALE_STEPS.map(st => st.key), solfegeLastKey);
  const solfegeFreeKeys = filterCoolingSessionReviewKeys("solfege", SOLFEGE_SCALE_STEPS.map(st => st.key), solfegeLastKey);
  const solfegeKey = solfegeReviewKey ?? solfegeFreeKeys[Math.floor(Math.random() * solfegeFreeKeys.length)];
  const chosenStep = SOLFEGE_SCALE_STEPS.find(st => st.key === solfegeKey) || SOLFEGE_SCALE_STEPS[0];
  const keyboardMidi = rootMidi + chosenStep.semitones;

  // Bei „Mehrere Oktaven“ (Stufe 3, 4, 6) erklingt der abgefragte Ton in einer von drei festen Lagen
  // (tief/mittel/hoch, gleichmäßig rotiert), während die Klaviatur 1 Oktave zeigt.
  let octaveShift = 0;
  if (isMultiOctave) {
    octaveShift = getSolfegeOctaveShiftForBand(keyboardMidi, nextSolfegeOctaveBand());
  }

  const playedMidi = keyboardMidi + octaveShift;
  const keyboardResolveMidis = chosenStep.resolveOffsets.map(off => rootMidi + off);
  const audioResolveMidis = chosenStep.resolveOffsets.map(off => rootMidi + off + octaveShift);
  const cadenceBars = buildContextCadenceBars(rootMidi);

  const leftFrameMidi = prevWhiteMidi(rootMidi);
  const rightFrameMidi = nextWhiteMidi(rootMidi + 12);
  const leftFrameName = getWhiteNoteLabel(((leftFrameMidi % 12) + 12) % 12);
  const rightFrameName = getWhiteNoteLabel(((rightFrameMidi % 12) + 12) % 12);
  const keyBaseName = getKeyDisplayName(state.currentKey);

  state.currentExercise = {
    type: "solfege",
    rootMidi: rootMidi,
    keyCode: state.currentKey,
    keyName: `${keyBaseName} (${leftFrameName}–${rightFrameName})`,
    isMultiOctave: isMultiOctave,
    targetIndex: 4,
    reviewScope: "solfege",
    reviewKey: chosenStep.key,
    targetItem: {
      ...chosenStep,
      label: getLocalizedSolfegeStepLabel(chosenStep.key, chosenStep.label),
      midi: keyboardMidi,
      playedMidi: playedMidi,
      noteName: midiToNote(playedMidi),
      resolveMidis: keyboardResolveMidis,
      audioResolveMidis: audioResolveMidis
    },
    bars: cadenceBars
  };
}

/**
 * Erstellt eine 4-Ton-Melodieübung auf demselben Grundgerüst wie Solfège:
 * - Vor jeder Aufgabe erklingt die Kontext-Kadenz (I–vi–IV–V)
 * - Danach erklingen (tempoabhängig) 4 halbe Noten aus dem gewählten Tonraum (Do–Fa, Sol–Do oder Ganze Tonart)
 * - Oben stehen 4 Fragezeichen (?), die Schritt für Schritt durch die erkannten Solfège-Namen ersetzt werden
 */
function generateMelodyExercise(rootMidi) {
  const melodyStyle = state.settings.melodyStyle || "rhythmic";
  const range = state.settings.melodyRange || "do-fa";
  const rangeCfg = getLocalizedMelodyRange(range) || getLocalizedMelodyRange("do-fa");
  const isMultiOctave = state.settings.melodyOctaveMode === "multi";
  const isRandomKey = state.settings.melodyKeyMode === "random";
  const allowedSemitones = new Set(rangeCfg.semitones);
  const pool = SOLFEGE_SCALE_STEPS.filter(step => allowedSemitones.has(step.semitones));

  const template = pickMelodyPhraseTemplate(range, melodyStyle);
  const generatedSteps = generateMusicalMelodySteps(pool, template, isMultiOctave, rootMidi);

  const preferFlat = FLAT_KEYS.has(state.currentKey);
  const beatsPerBar = template.beatsPerBar || 4;

  const melodySlots = generatedSteps.map((entry, idx) => {
    const step = entry.step;
    const stepTiming = template.steps[idx] || { offset: idx * 2, beats: 2, rhythm: "half" };
    const beatOffset = Number(stepTiming.offset) || 0;
    const durationBeats = Number(stepTiming.beats) || 2;
    const rhythmKey = stepTiming.rhythm || "half";
    const barIndex = Math.floor((beatOffset + 0.0001) / beatsPerBar);
    const prevBarIndex = idx > 0
      ? Math.floor(((template.steps[idx - 1]?.offset || 0) + 0.0001) / beatsPerBar)
      : 0;
    const beatInBar = beatOffset - barIndex * beatsPerBar;
    const isDownbeat = Math.abs(beatInBar) < 0.01;
    const isOnBeat = Math.abs(beatInBar - Math.round(beatInBar)) < 0.05;
    const velocity = isDownbeat ? 0.96 : (isOnBeat ? 0.84 : 0.72);

    const keyboardMidi = rootMidi + step.semitones;
    const playedMidi = keyboardMidi + (entry.octaveShift || 0);
    return {
      index: idx,
      key: step.key,
      syllable: step.syllable,
      label: getLocalizedSolfegeStepLabel(step.key, step.label),
      midi: keyboardMidi,
      playedMidi: playedMidi,
      noteName: midiToNote(playedMidi),
      germanNote: midiToGermanNote(playedMidi, preferFlat).replace(/[0-9]/g, ""),
      beatOffset: beatOffset,
      durationBeats: durationBeats,
      rhythmKey: rhythmKey,
      restBeforeBeats: Number(stepTiming.restBefore) || 0,
      barIndex: barIndex,
      barDivider: idx > 0 && barIndex > prevBarIndex,
      isDownbeat: isDownbeat,
      velocity: velocity,
      pitchSolved: false,
      rhythmSolved: melodyStyle !== "dictation",
      solved: false
    };
  });

  const leftFrameMidi = prevWhiteMidi(rootMidi);
  const rightFrameMidi = nextWhiteMidi(rootMidi + 12);
  const leftFrameName = getWhiteNoteLabel(((leftFrameMidi % 12) + 12) % 12);
  const rightFrameName = getWhiteNoteLabel(((rightFrameMidi % 12) + 12) % 12);
  const keyBaseName = getKeyDisplayName(state.currentKey);

  state.currentExercise = {
    type: "melody",
    melodyStyle: melodyStyle,
    templateId: template.id,
    meterKey: template.meter || "4/4",
    beatsPerBar: beatsPerBar,
    totalMelodyBeats: Number(template.totalBeats) || 8,
    totalSlots: melodySlots.length,
    rootMidi: rootMidi,
    keyCode: state.currentKey,
    range: range,
    rangeLabel: rangeCfg.label,
    isRandomKey: isRandomKey,
    isMultiOctave: isMultiOctave,
      keyName: `${keyBaseName} (${leftFrameName}–${rightFrameName})`,
      activeSemitones: rangeCfg.semitones,
      cadenceBars: buildContextCadenceBars(rootMidi),
      melodySlots: melodySlots,
      melodyStep: 0,
      bars: melodySlots
    };
  }

function isNotationGrandMode(mode) {
  return mode === "notation-grand";
}

function isNotationChordMode(mode) {
  return mode === "notation-chords";
}

function getNotationPlayNotes(item) {
  if (Array.isArray(item?.playNotes) && item.playNotes.length > 0) return item.playNotes;
  return item?.noteName ? [item.noteName] : [];
}

// Akkorde lesen (Multiple Choice): Stufe 1 Violin, 2 Bass, 3 + Umkehrungen, 4 Alle Typen & Septakkorde
const NOTATION_CHORD_LEVELS = {
  1: {
    clefs: ["treble"],
    inversions: false,
    sevenths: false,
    minStep: -2,
    maxStep: 10,
    qualities: ["maj", "min", "dim", "aug", "sus4", "sus2"]
  },
  2: {
    clefs: ["bass"],
    inversions: false,
    sevenths: false,
    minStep: -2,
    maxStep: 10,
    qualities: ["maj", "min", "dim", "aug", "sus4", "sus2"]
  },
  3: {
    clefs: ["treble", "bass"],
    inversions: true,
    sevenths: false,
    minStep: -2,
    maxStep: 10,
    qualities: ["maj", "min", "dim", "aug", "sus4", "sus2"]
  },
  4: {
    clefs: ["treble", "bass"],
    inversions: true,
    sevenths: true,
    minStep: -3,
    maxStep: 11,
    qualities: ["maj", "min", "dim", "aug", "sus4", "sus2", "7", "maj7", "m7", "m7b5", "dim7", "mMaj7"]
  }
};

const NOTATION_CHORD_SPECS = {
  maj:   { suffix: "",        steps: [[0, 0], [2, 4], [4, 7]],         isSeventh: false },
  min:   { suffix: "m",       steps: [[0, 0], [2, 3], [4, 7]],         isSeventh: false },
  dim:   { suffix: "°",       steps: [[0, 0], [2, 3], [4, 6]],         isSeventh: false },
  aug:   { suffix: "+",       steps: [[0, 0], [2, 4], [4, 8]],         isSeventh: false },
  sus4:  { suffix: "sus4",    steps: [[0, 0], [3, 5], [4, 7]],         isSeventh: false },
  sus2:  { suffix: "sus2",    steps: [[0, 0], [1, 2], [4, 7]],         isSeventh: false },
  "7":   { suffix: "7",       steps: [[0, 0], [2, 4], [4, 7], [6, 10]], isSeventh: true },
  maj7:  { suffix: "maj7",    steps: [[0, 0], [2, 4], [4, 7], [6, 11]], isSeventh: true },
  m7:    { suffix: "m7",      steps: [[0, 0], [2, 3], [4, 7], [6, 10]], isSeventh: true },
  m7b5:  { suffix: "m7♭5",    steps: [[0, 0], [2, 3], [4, 6], [6, 10]], isSeventh: true },
  dim7:  { suffix: "°7",      steps: [[0, 0], [2, 3], [4, 6], [6, 9]],  isSeventh: true },
  mMaj7: { suffix: "m(maj7)", steps: [[0, 0], [2, 3], [4, 7], [6, 11]], isSeventh: true }
};

const NOTATION_CHORD_QUALITY_ORDER = [
  "maj", "min", "dim", "aug", "sus4", "sus2", "7", "maj7", "m7", "m7b5", "dim7", "mMaj7"
];

const NOTATION_CHORD_FAMILIES_TRIAD = {
  maj:  [["maj", "min", "dim", "sus4"], ["maj", "min", "aug", "sus4"], ["maj", "min", "sus4", "sus2"]],
  min:  [["maj", "min", "dim", "sus4"], ["maj", "min", "dim", "sus2"], ["maj", "min", "aug", "sus4"]],
  dim:  [["maj", "min", "dim", "sus4"], ["min", "dim", "aug", "sus2"]],
  aug:  [["maj", "min", "aug", "sus4"], ["maj", "dim", "aug", "sus2"]],
  sus4: [["maj", "min", "sus4", "sus2"], ["maj", "min", "dim", "sus4"]],
  sus2: [["maj", "min", "sus4", "sus2"], ["maj", "min", "aug", "sus2"]]
};

const NOTATION_CHORD_FAMILIES_FULL = {
  maj:   [["maj", "min", "7", "sus4"], ["maj", "min", "maj7", "sus4"], ["maj", "7", "maj7", "m7"]],
  min:   [["maj", "min", "7", "sus4"], ["min", "m7", "m7b5", "mMaj7"], ["maj", "min", "m7", "7"]],
  dim:   [["maj", "min", "dim", "7"], ["min", "dim", "m7b5", "dim7"]],
  aug:   [["maj", "min", "aug", "7"], ["maj", "aug", "maj7", "7"]],
  sus4:  [["maj", "min", "7", "sus4"], ["maj", "sus4", "sus2", "7"]],
  sus2:  [["maj", "min", "sus4", "sus2"], ["maj", "sus2", "sus4", "7"]],
  "7":   [["maj", "min", "7", "sus4"], ["7", "maj7", "m7", "sus4"], ["maj", "7", "maj7", "m7"]],
  maj7:  [["maj", "7", "maj7", "m7"], ["maj", "maj7", "m7", "mMaj7"]],
  m7:    [["maj", "min", "7", "m7"], ["min", "m7", "m7b5", "dim7"], ["7", "maj7", "m7", "sus4"]],
  m7b5:  [["min", "m7", "m7b5", "dim7"], ["dim", "m7", "m7b5", "7"]],
  dim7:  [["dim", "m7", "m7b5", "dim7"], ["min", "dim", "m7b5", "dim7"]],
  mMaj7: [["min", "m7", "maj7", "mMaj7"], ["maj", "min", "maj7", "mMaj7"]]
};

function makeNotationChordChoiceKey(letter = "C", acc = 0, qualityKey = "maj") {
  const safeLetter = NOTATION_LETTER_PC[letter] !== undefined ? letter : "C";
  const safeAcc = acc > 0 ? 1 : (acc < 0 ? -1 : 0);
  const safeQual = NOTATION_CHORD_SPECS[qualityKey] ? qualityKey : "maj";
  return `${safeLetter}:${safeAcc}|${safeQual}`;
}

function parseNotationChordChoiceKey(choiceKey) {
  const raw = String(choiceKey || "C:0|maj");
  const [rootPart, qualPart] = raw.split("|");
  const [rawLetter, rawAcc] = (rootPart || "C:0").split(":");
  const letter = NOTATION_LETTER_PC[rawLetter] !== undefined ? rawLetter : "C";
  const accNum = parseInt(rawAcc, 10);
  const acc = accNum > 0 ? 1 : (accNum < 0 ? -1 : 0);
  const qualityKey = NOTATION_CHORD_SPECS[qualPart] ? qualPart : "maj";
  return { letter, acc, qualityKey };
}

function formatNotationChordSymbol(letter = "C", acc = 0, qualityKey = "maj") {
  const rootName = formatSpelledNotationNote(letter, acc, 4, false);
  const suffix = NOTATION_CHORD_SPECS[qualityKey]?.suffix ?? "";
  return `${rootName}${suffix}`;
}

function getNotationChordChoiceItem(choiceKey) {
  const { letter, acc, qualityKey } = parseNotationChordChoiceKey(choiceKey);
  const symbol = formatNotationChordSymbol(letter, acc, qualityKey);
  const def = getLocalizedChordDef(qualityKey);
  const spelled = spellNotationChord(letter, acc, qualityKey);
  const midiNotes = spelled
    ? spelled.toneSpecs.map((ts, idx) => 60 + ((ts.pc - spelled.rootPc + 12) % 12) + (idx > 0 && ts.deg >= 7 ? 12 : 0))
    : [60, 64, 67];
  return {
    key: makeNotationChordChoiceKey(letter, acc, qualityKey),
    symbol: symbol,
    roman: symbol,
    short: def.short || symbol,
    label: `${symbol} • ${def.label || def.short}`,
    rootLetter: letter,
    rootAcc: acc,
    rootPc: ((NOTATION_LETTER_PC[letter] + acc) % 12 + 12) % 12,
    qualityKey: qualityKey,
    notes: midiNotes.map(m => midiToNote(m))
  };
}

function spellNotationChord(letter, acc, qualityKey) {
  const spec = NOTATION_CHORD_SPECS[qualityKey];
  if (!spec || NOTATION_LETTER_PC[letter] === undefined) return null;
  const safeAcc = acc > 0 ? 1 : (acc < 0 ? -1 : 0);
  const rootPc = ((NOTATION_LETTER_PC[letter] + safeAcc) % 12 + 12) % 12;
  const rootIdx = NOTATION_LETTERS.indexOf(letter);
  const toneSpecs = [];
  for (const [degOff, semiOff] of spec.steps) {
    const tIdx = (rootIdx + degOff) % 7;
    const tLetter = NOTATION_LETTERS[tIdx];
    const targetPc = (rootPc + semiOff) % 12;
    const toneAcc = ((targetPc - NOTATION_LETTER_PC[tLetter] + 18) % 12) - 6;
    if (Math.abs(toneAcc) > 1) return null;
    toneSpecs.push({ deg: degOff, letterIdx: tIdx, letter: tLetter, acc: toneAcc, pc: targetPc });
  }
  return { letter, acc: safeAcc, rootPc, qualityKey, toneSpecs };
}

function getNotationInversionLabel(inversion) {
  if (inversion === 1) return tr("1. Umkehrung", "1st inversion");
  if (inversion === 2) return tr("2. Umkehrung", "2nd inversion");
  if (inversion === 3) return tr("3. Umkehrung", "3rd inversion");
  return tr("Grundstellung", "Root position");
}

function pickNotationChordQualityFamily(level, targetQualityKey, rootLetter, rootAcc) {
  const cfg = NOTATION_CHORD_LEVELS[level] || NOTATION_CHORD_LEVELS[1];
  const validInPool = cfg.qualities.filter(q => Boolean(spellNotationChord(rootLetter, rootAcc, q)));
  const familyMap = cfg.sevenths ? NOTATION_CHORD_FAMILIES_FULL : NOTATION_CHORD_FAMILIES_TRIAD;
  const templates = familyMap[targetQualityKey] || [];
  const validTemplates = templates.filter(tpl => tpl.every(q => validInPool.includes(q)));
  let group = validTemplates.length > 0
    ? [...validTemplates[Math.floor(Math.random() * validTemplates.length)]]
    : [targetQualityKey];

  for (const q of validInPool) {
    if (group.length >= 4) break;
    if (!group.includes(q)) group.push(q);
  }
  group = group.slice(0, 4);
  group.sort((a, b) => NOTATION_CHORD_QUALITY_ORDER.indexOf(a) - NOTATION_CHORD_QUALITY_ORDER.indexOf(b));
  return group;
}

function pickNotationChordDistractorRoot(rootLetter, rootAcc, qualityGroup, keySig, lowestTone, inversion) {
  const rootPc = ((NOTATION_LETTER_PC[rootLetter] + rootAcc) % 12 + 12) % 12;
  const rootIdx = NOTATION_LETTERS.indexOf(rootLetter);
  const candidates = [];
  const seen = new Set([`${rootLetter}:${rootAcc}`]);
  const pushCandidate = (letter, acc) => {
    const k = `${letter}:${acc}`;
    if (seen.has(k) || NOTATION_LETTER_PC[letter] === undefined) return;
    const candPc = ((NOTATION_LETTER_PC[letter] + acc) % 12 + 12) % 12;
    if (candPc === rootPc) return;
    seen.add(k);
    candidates.push({ letter, acc });
  };

  // Bei Umkehrungen zuerst den Basston als verlockenden Alternativ-Grundton anbieten
  if (inversion > 0 && lowestTone && lowestTone.letter) {
    pushCandidate(lowestTone.letter, lowestTone.accidental || 0);
    if (keySig !== "none") {
      pushCandidate(lowestTone.letter, getKeySignatureAccidentalForLetter(keySig, lowestTone.letter));
    }
  }

  // Nachbartöne (+1/-1) und Terz-/Schlüssel-Sprünge (+2/-2)
  const stepDeltas = [1, -1, 2, -2, 3, -3, 4, -4];
  // Reihenfolge leicht durchmischen, damit nicht immer derselbe Abstand gewinnt
  for (let i = stepDeltas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [stepDeltas[i], stepDeltas[j]] = [stepDeltas[j], stepDeltas[i]];
  }
  for (const d of stepDeltas) {
    const l = NOTATION_LETTERS[(rootIdx + d + 7) % 7];
    const sigAcc = keySig !== "none" ? getKeySignatureAccidentalForLetter(keySig, l) : 0;
    pushCandidate(l, sigAcc);
    if (sigAcc !== 0) pushCandidate(l, 0);
  }
  // Rückfall auf Stammtöne
  NOTATION_LETTERS.forEach(l => pushCandidate(l, 0));

  for (const cand of candidates) {
    if (qualityGroup.every(q => Boolean(spellNotationChord(cand.letter, cand.acc, q)))) {
      return cand;
    }
  }
  return null;
}

function buildNotationChordItem(ex, prevItem = null) {
  const lvl = Math.max(1, Math.min(4, parseInt(ex.level, 10) || 1));
  const cfg = NOTATION_CHORD_LEVELS[lvl] || NOTATION_CHORD_LEVELS[1];
  const keySig = normalizeNotationKeySigId(ex.keySignatureId || "none");
  const extraRoots = [
    { letter: "F", acc: 1 },
    { letter: "B", acc: -1 },
    { letter: "E", acc: -1 },
    { letter: "A", acc: -1 },
    { letter: "C", acc: 1 }
  ];

  for (let attempt = 0; attempt < 60; attempt++) {
    const clefId = cfg.clefs[Math.floor(Math.random() * cfg.clefs.length)];
    let qualityKey = cfg.qualities[Math.floor(Math.random() * cfg.qualities.length)];
    // Gewichtung: gebräuchliche Typen (Dur, Moll, Dom.7, Maj7, Moll7, Sus4) etwas häufiger
    if (lvl === 4 && Math.random() < 0.45) {
      const coreL4 = ["maj", "min", "7", "sus4", "m7", "maj7"];
      qualityKey = coreL4[Math.floor(Math.random() * coreL4.length)];
    } else if (lvl <= 3 && Math.random() < 0.35) {
      const coreTriad = ["maj", "min", "sus4", "dim"];
      qualityKey = coreTriad[Math.floor(Math.random() * coreTriad.length)];
    }

    let rootLetter = NOTATION_LETTERS[Math.floor(Math.random() * 7)];
    let rootAcc = 0;
    if (keySig !== "none") {
      rootAcc = Math.random() < 0.8
        ? getKeySignatureAccidentalForLetter(keySig, rootLetter)
        : 0;
    } else if ((lvl >= 3 && Math.random() < 0.24) || (lvl === 2 && Math.random() < 0.14)) {
      const pick = extraRoots[Math.floor(Math.random() * extraRoots.length)];
      rootLetter = pick.letter;
      rootAcc = pick.acc;
    }

    // Eindeutige Standard-Grundtöne bevorzugen (keine theoretischen Eis/His/Ces/Fes-Grundtöne)
    if (
      (rootAcc === 1 && (rootLetter === "E" || rootLetter === "B")) ||
      (rootAcc === -1 && (rootLetter === "C" || rootLetter === "F"))
    ) {
      rootAcc = 0;
    }

    const spelled = spellNotationChord(rootLetter, rootAcc, qualityKey);
    if (!spelled) continue;

    const qualityGroup = pickNotationChordQualityFamily(lvl, qualityKey, rootLetter, rootAcc);
    if (qualityGroup.length < 4) continue;

    const size = spelled.toneSpecs.length;
    const inversion = cfg.inversions && Math.random() < 0.65
      ? Math.floor(Math.random() * size)
      : 0;
    const voiced = spelled.toneSpecs.slice(inversion).concat(spelled.toneSpecs.slice(0, inversion));

    const offsets = [0];
    for (let i = 1; i < voiced.length; i++) {
      let d = (voiced[i].letterIdx - voiced[i - 1].letterIdx + 7) % 7;
      if (d === 0) d = 7;
      offsets.push(offsets[i - 1] + d);
    }
    const span = offsets[offsets.length - 1];
    const lowSteps = [];
    for (let s = cfg.minStep; s + span <= cfg.maxStep; s++) {
      const probe = getNotationNoteFromStaffStep(clefId, s, 0);
      if (NOTATION_LETTERS.indexOf(probe.letter) === voiced[0].letterIdx) lowSteps.push(s);
    }
    if (lowSteps.length === 0) continue;
    const baseStep = lowSteps[Math.floor(Math.random() * lowSteps.length)];

    const tones = offsets.map((o, idx) =>
      getNotationNoteFromStaffStep(clefId, baseStep + o, voiced[idx].acc, keySig)
    );
    const symbol = formatNotationChordSymbol(rootLetter, rootAcc, qualityKey);
    const targetChoiceKey = makeNotationChordChoiceKey(rootLetter, rootAcc, qualityKey);

    if (prevItem?.isChord && prevItem.key === targetChoiceKey && prevItem.staffStep === baseStep && attempt < 45) {
      continue;
    }

    const distractorRoot = pickNotationChordDistractorRoot(rootLetter, rootAcc, qualityGroup, keySig, tones[0], inversion);
    if (!distractorRoot) continue;

    const groupA = qualityGroup.map(q => makeNotationChordChoiceKey(rootLetter, rootAcc, q));
    const groupB = qualityGroup.map(q => makeNotationChordChoiceKey(distractorRoot.letter, distractorRoot.acc, q));
    const choices = Math.random() < 0.5 ? [...groupA, ...groupB] : [...groupB, ...groupA];

    const toneNames = tones.map(t => t.shortName).join(" – ");
    const invDesc = getNotationInversionLabel(inversion);
    return {
      ...tones[0],
      isChord: true,
      key: targetChoiceKey,
      qualityKey: qualityKey,
      rootLetter: rootLetter,
      rootAcc: rootAcc,
      rootPc: spelled.rootPc,
      chordTones: tones,
      pcs: [...new Set(tones.map(t => t.pc))],
      playNotes: tones.map(t => t.noteName),
      chordSymbol: symbol,
      inversion: inversion,
      inversionDesc: invDesc,
      chordSize: size,
      choices: choices,
      displayName: symbol,
      shortName: symbol,
      toneNames: toneNames,
      ledgerDesc: getNotationLedgerDescription(tones[0].staffStep)
    };
  }

  // Rückfall: E-Dur im Violinschlüssel gegen D-Dur-Familie
  const fbTones = [
    getNotationNoteFromStaffStep("treble", 0, 0, keySig),
    getNotationNoteFromStaffStep("treble", 2, 1, keySig),
    getNotationNoteFromStaffStep("treble", 4, 0, keySig)
  ];
  const fbKey = makeNotationChordChoiceKey("E", 0, "maj");
  const fbGroup = ["maj", "min", "dim", "sus4"];
  const fbSymbol = formatNotationChordSymbol("E", 0, "maj");
  return {
    ...fbTones[0],
    isChord: true,
    key: fbKey,
    qualityKey: "maj",
    rootLetter: "E",
    rootAcc: 0,
    rootPc: 4,
    chordTones: fbTones,
    pcs: fbTones.map(t => t.pc),
    playNotes: fbTones.map(t => t.noteName),
    chordSymbol: fbSymbol,
    inversion: 0,
    inversionDesc: getNotationInversionLabel(0),
    chordSize: 3,
    choices: [
      ...fbGroup.map(q => makeNotationChordChoiceKey("E", 0, q)),
      ...fbGroup.map(q => makeNotationChordChoiceKey("G", 0, q))
    ],
    displayName: fbSymbol,
    shortName: fbSymbol,
    toneNames: fbTones.map(t => t.shortName).join(" – "),
    ledgerDesc: getNotationLedgerDescription(fbTones[0].staffStep)
  };
}

function pickNotationGrandClef(ex) {
  const hist = Array.isArray(ex.grandClefHistory) ? ex.grandClefHistory : [];
  let clefId = Math.random() < 0.5 ? "treble" : "bass";
  // Höchstens zwei Noten hintereinander im selben System
  if (hist.length >= 2 && hist[hist.length - 1] === hist[hist.length - 2]) {
    clefId = hist[hist.length - 1] === "treble" ? "bass" : "treble";
  }
  ex.grandClefHistory = [...hist.slice(-3), clefId];
  return clefId;
}

function buildNextNotationQueueNote(ex, prevNote = null) {
  if (isNotationChordMode(ex.type)) return buildNotationChordItem(ex, prevNote);
  if (isNotationGrandMode(ex.type)) {
    return pickRandomNotationNoteItem(pickNotationGrandClef(ex), ex.level, prevNote, ex.keySignatureId || "none");
  }
  let clefId = ex.baseClefId || "treble";
  if (ex.isMixedClef && !state.exam?.active) {
    // Im Schlüssel-Mix alle 3 Noten geordnet den Schlüssel wechseln (mit kleinem Wechsel-Schlüssel)
    ex.mixedCounter = (ex.mixedCounter || 0);
    if (prevNote && ex.mixedCounter > 0 && ex.mixedCounter % 3 === 0) {
      const nextIdx = ((ex.mixedClefCursor || 0) + 1) % NOTATION_ACTIVE_CLEFS.length;
      ex.mixedClefCursor = nextIdx;
    }
    clefId = NOTATION_ACTIVE_CLEFS[ex.mixedClefCursor || 0];
    ex.mixedCounter += 1;
  }
  return pickRandomNotationNoteItem(clefId, ex.level, prevNote, ex.keySignatureId || "none");
}

function populateNotationExerciseQueue(ex) {
  if (!ex) return;
  const queueLen = state.exam?.active ? 1 : (ex.isChordReading ? 5 : NOTATION_QUEUE_SIZE);
  ex.notationQueue = [];
  ex.mixedCounter = 0;
  for (let i = 0; i < queueLen; i++) {
    const prev = i > 0 ? ex.notationQueue[i - 1] : null;
    ex.notationQueue.push(buildNextNotationQueueNote(ex, prev));
  }
  ex.targetItem = ex.notationQueue[0] || null;
  ex.choices = ex.isChordReading && Array.isArray(ex.targetItem?.choices) ? [...ex.targetItem.choices] : [];
  ex.keyName = getLocalizedNotationClefName(ex.targetItem?.clefId || ex.baseClefId || "treble");
}

function generateNotationExercise(modeOverride = state.settings.mode) {
  if (state.currentExercise?.isChordReading) {
    cancelNotationChordAdvance(state.currentExercise);
  }
  const mode = isNotationMode(modeOverride) ? modeOverride : "notation-treble";
  const lvl = Math.max(1, Math.min(4, parseInt(state.settings.notationDifficulty, 10) || 1));
  const keyMode = normalizeNotationKeyMode(state.settings.notationKeyMode);
  const initialKeySig = resolveNotationKeySignatureId(keyMode);
  const isMixed = mode === "notation-mixed";
  const initialClef = isMixed
    ? NOTATION_ACTIVE_CLEFS[Math.floor(Math.random() * NOTATION_ACTIVE_CLEFS.length)]
    : (isNotationChordMode(mode) ? (NOTATION_CHORD_LEVELS[lvl]?.clefs?.[0] || "treble") : getNotationClefFromMode(mode));
  const lvlCfg = NOTATION_LEVELS[lvl] || NOTATION_LEVELS[1];

  const ex = {
    type: mode,
    level: lvl,
    notationKeyMode: keyMode,
    keySignatureId: initialKeySig,
    keySignaturePhraseProgress: 0,
    keySignaturePhraseLength: NOTATION_KEY_PHRASE_LEN,
    allowAccidentals: Boolean(lvlCfg.allowAccidentals || initialKeySig !== "none"),
    isMixedClef: isMixed,
    isGrandStaff: isNotationGrandMode(mode),
    isChordReading: isNotationChordMode(mode),
    chordFoundPcs: [],
    chordAdvanceLock: false,
    chordAdvanceToken: 0,
    chordAdvanceTimerId: null,
    choices: [],
    grandClefHistory: [],
    baseClefId: initialClef,
    mixedClefCursor: Math.max(0, NOTATION_ACTIVE_CLEFS.indexOf(initialClef)),
    mixedCounter: 0,
    rootMidi: 60,
    notationQueue: [],
    notationSolvedCount: 0,
    notationSkippedCount: 0,
    notationDidShift: false,
    notationPanelState: "",
    notationLastFeedback: null,
    targetItem: null,
    bars: []
  };

  populateNotationExerciseQueue(ex);
  state.currentExercise = ex;
}

function refreshNotationQueueLocalization(ex) {
  if (!ex || !Array.isArray(ex.notationQueue)) return;
  const exSig = normalizeNotationKeySigId(ex.keySignatureId || "none");
  ex.notationQueue = ex.notationQueue.map(n => {
    if (n?.isChord && Array.isArray(n.chordTones)) {
      const sig = n.keySignatureId || exSig;
      const tones = n.chordTones.map(t =>
        getNotationNoteFromStaffStep(t.clefId, t.staffStep, t.accidental, sig, t.shownAccidental)
      );
      const symbol = formatNotationChordSymbol(n.rootLetter || "C", n.rootAcc || 0, n.qualityKey || "maj");
      return {
        ...tones[0],
        isChord: true,
        key: n.key,
        qualityKey: n.qualityKey,
        rootLetter: n.rootLetter,
        rootAcc: n.rootAcc,
        rootPc: n.rootPc,
        chordTones: tones,
        pcs: [...new Set(tones.map(t => t.pc))],
        playNotes: tones.map(t => t.noteName),
        chordSymbol: symbol,
        inversion: n.inversion || 0,
        inversionDesc: getNotationInversionLabel(n.inversion || 0),
        chordSize: tones.length,
        choices: Array.isArray(n.choices) ? [...n.choices] : [],
        displayName: symbol,
        shortName: symbol,
        toneNames: tones.map(t => t.shortName).join(" – "),
        ledgerDesc: getNotationLedgerDescription(tones[0].staffStep)
      };
    }
    return getNotationNoteFromStaffStep(n.clefId, n.staffStep, n.accidental, n.keySignatureId || exSig, n.shownAccidental);
  });
  ex.targetItem = ex.notationQueue[0] || null;
  if (ex.isChordReading && ex.targetItem) {
    ex.choices = Array.isArray(ex.targetItem.choices) ? [...ex.targetItem.choices] : [];
  }
  if (ex.targetItem) {
    ex.keyName = getLocalizedNotationClefName(ex.targetItem.clefId);
  }
}

function refreshExerciseLocalization(ex) {
  if (typeof renderStageStreakUI === "function") renderStageStreakUI();
  if (!ex) return;

  if (ex.type === "cadence") {
    ex.keyName = getKeyDisplayName(state.currentKey, ex.tonality || "major");
    (ex.bars || []).forEach(bar => {
      const def = getLocalizedDegreeDef(bar.key);
      if (def) {
        bar.symbol = def.roman;
        bar.label = def.label;
        bar.short = def.short;
      }
    });
    return;
  }

  if (isChordQualityMode(ex.type)) {
    const def = getLocalizedChordDef(ex.targetItem?.key);
    if (!def) return;
    const rootMidi = ex.targetItem.rootMidi;
    const rootKey = ex.rootKey || state.currentKey;
    const notesDisplay = formatChordGermanNotes(rootMidi, ex.offsets || def.offsets, rootKey);
    const rootDisplay = midiToGermanNote(rootMidi, FLAT_KEYS.has(rootKey)).replace(/[0-9]/g, "");
    ex.keyName = `${tr("Grundton", "Root")} ${rootDisplay}`;
    Object.assign(ex.targetItem, def, { displayMain: notesDisplay });
    if (ex.bars?.[0]) {
      ex.bars[0].symbol = notesDisplay;
      ex.bars[0].label = def.label;
      ex.bars[0].short = def.short;
    }
    return;
  }

  if (ex.type === "chord-inversions") {
    const invDef = getLocalizedChordInversionDef(ex.targetItem?.key);
    const chordDef = getLocalizedChordDef(ex.chordKey);
    if (!invDef || !chordDef) return;
    const rootMidi = ex.targetItem.rootMidi;
    const rootKey = ex.rootKey || state.currentKey;
    const midis = ex.targetItem.midis || [];
    const noteDisplay = formatChordMidiNoteList(midis, rootMidi, rootKey).join(" · ");
    const slashTitle = formatInversionChordTitle(rootMidi, rootKey, ex.chordKey, ex.targetItem.bassMidi, invDef.stepIndex);
    const rootDisplay = midiToGermanNote(rootMidi, FLAT_KEYS.has(rootKey)).replace(/[0-9]/g, "");
    const solvedShort = `${slashTitle} • ${invDef.short}`;
    const fullLabel = `${invDef.label} • ${slashTitle} (${chordDef.short})`;
    ex.keyName = `${tr("Grundton", "Root")} ${rootDisplay}`;
    Object.assign(ex.targetItem, invDef, {
      label: fullLabel,
      displayMain: noteDisplay,
      slashTitle: slashTitle
    });
    if (ex.bars?.[0]) {
      ex.bars[0].symbol = noteDisplay;
      ex.bars[0].label = fullLabel;
      ex.bars[0].short = solvedShort;
    }
    return;
  }

  if (String(ex.type || "").startsWith("interval-")) {
    const def = getLocalizedIntervalDef(ex.targetItem?.key);
    if (!def) return;
    const refDisplayNote = midiToGermanNote(ex.effectiveRootMidi ?? ex.targetItem.rootMidi, Boolean(ex.refPreferFlat));
    const targetDisplayNote = ex.targetMidi != null
      ? midiToGermanNote(ex.targetMidi, Boolean(ex.targetPreferFlat))
      : ex.targetItem.displayMain;
    ex.keyName = `${tr("Ausgangston", "Root")} ${refDisplayNote.replace(/[0-9]/g, "")}`;
    if (ex.isMelodic && ex.bars?.length >= 2) {
      ex.bars[0].symbol = refDisplayNote;
      ex.bars[0].short = tr("Ausgangston", "Root Note");
      ex.bars[0].label = ex.isMelodicDown ? tr("Ausgangston (Hoch)", "Root Note (High)") : tr("Ausgangston (Ton 1)", "Root Note (Note 1)");
      ex.bars[1].symbol = targetDisplayNote;
      ex.bars[1].short = def.short;
      ex.bars[1].label = def.label;
    } else if (ex.type === "interval-drone" && ex.bars?.length >= 2) {
      ex.bars[0].symbol = refDisplayNote;
      ex.bars[0].short = tr("Streicher-Fläche", "Strings Pad");
      ex.bars[0].label = tr("Grundton (Streicher-Fläche)", "Root (Strings Pad)");
      ex.bars[1].symbol = targetDisplayNote;
      ex.bars[1].short = def.short;
      ex.bars[1].label = def.label;
    } else if (ex.bars?.[0]) {
      ex.bars[0].symbol = `${refDisplayNote} + ${targetDisplayNote}`;
      ex.bars[0].short = def.short;
      ex.bars[0].label = def.label;
    }
    Object.assign(ex.targetItem, def, { displayMain: ex.bars[ex.targetIndex]?.symbol || targetDisplayNote });
    if (state.wrongAnswerData && state.wrongAnswerData.target === ex.targetItem && state.wrongAnswerData.chosen?.key) {
      const refreshedChosen = getLocalizedIntervalDef(state.wrongAnswerData.chosen.key);
      if (refreshedChosen) {
        state.wrongAnswerData.chosen = { ...state.wrongAnswerData.chosen, ...refreshedChosen };
      }
    }
    return;
  }

  if (ex.type === "rhythm-meter") {
    const def = getLocalizedRhythmMeter(ex.targetItem?.key);
    if (!def) return;
    ex.keyName = tr("Metrum", "Meter");
    Object.assign(ex.targetItem, def, { displayMain: def.symbol });
    (ex.bars || []).forEach(b => {
      b.symbol = def.symbol;
      b.short = def.short;
      b.label = def.label;
    });
    return;
  }

  if (ex.type === "prod-tone") {
    const def = getLocalizedProdFreq(ex.targetItem?.key);
    if (!def) return;
    ex.levelLabel = getLocalizedProdLevelLabel("tone", ex.level);
    ex.keyName = tr("Sinuston", "Sine Wave");
    Object.assign(ex.targetItem, def, { displayMain: def.symbol });
    if (ex.bars?.[0]) {
      ex.bars[0].symbol = def.symbol;
      ex.bars[0].short = def.short;
      ex.bars[0].label = def.label;
    }
    return;
  }

  if (ex.type === "prod-eq-noise") {
    const def = getLocalizedProdFreq(ex.targetItem?.key);
    if (!def) return;
    ex.levelLabel = getLocalizedProdLevelLabel("eq", ex.level);
    ex.keyName = formatEqParamsLabel(ex.boostDb, ex.q);
    Object.assign(ex.targetItem, def, { displayMain: def.symbol });
    if (ex.bars?.[0]) {
      ex.bars[0].short = tr("Original-Noise", "Original Noise");
      ex.bars[0].label = tr("Klicken für Flat-Vergleich (Bypass)", "Click for Flat A/B comparison (Bypass)");
    }
    if (ex.bars?.[1]) {
      ex.bars[1].symbol = def.symbol;
      ex.bars[1].short = def.short;
      ex.bars[1].label = def.label;
    }
    return;
  }

  if (String(ex.type || "").startsWith("modes-")) {
    const key = ex.chosenKey || ex.targetItem?.key;
    const def = getLocalizedModeDef(key);
    if (!def) return;
    const modeKind = ex.modeKind || (ex.type === "modes-char" ? "char" : (ex.type === "modes-cadence" ? "cadence" : "scale"));
    const kindLabel = modeKind === "char"
      ? tr("Charakterton", "Color Tone")
      : (modeKind === "cadence" ? tr("Kadenz", "Chord Loop") : tr("Tonleiter", "Scale"));
    ex.levelLabel = getLocalizedModeLevelLabel(modeKind, ex.level);
    ex.keyName = `${tr("Grundton", "Root")} ${ex.rootLabel}`;
    Object.assign(ex.targetItem, def, { displayMain: def.roman });
    if (ex.bars?.[0]) {
      ex.bars[0].short = tr("Anker-Quinte", "Anchor Fifth");
      ex.bars[0].label = tf("Neutraler Ausgangsklang ({root}5)", "Neutral open fifth ({root}5)", { root: ex.rootLabel });
    }
    if (ex.bars?.[1]) {
      ex.bars[1].symbol = def.roman;
      ex.bars[1].short = def.short;
      ex.bars[1].label = `${kindLabel} (${ex.rootLabel})`;
    }
    return;
  }

  if (ex.type === "rhythm-dictation") {
    ex.keyName = "4/4";
    (ex.rhythmSlots || []).forEach((slot, i) => {
      const cell = getLocalizedRhythmCell(slot.cellKey);
      if (cell) slot.cell = cell;
      if (ex.bars?.[i]) {
        ex.bars[i].short = `${tr("Schlag", "Beat")} ${i + 1}`;
        ex.bars[i].label = `${tr("Schlag", "Beat")} ${i + 1}`;
      }
    });
    const curSlot = ex.rhythmSlots?.[ex.rhythmStep || 0];
    if (curSlot) ex.targetItem = curSlot.cell;
    return;
  }

  if (ex.type === "rhythm-tap") {
    ex.levelLabel = getLocalizedRhythmTapLevel(ex.level)?.label || ex.levelLabel;
    (ex.tapSlots || []).forEach((slot, i) => {
      const cell = getLocalizedRhythmCell(slot.cellKey);
      if (cell) {
        slot.cell = cell;
        if (ex.bars?.[i]) {
          ex.bars[i].short = cell.short;
          ex.bars[i].label = cell.label;
        }
      }
    });
    if (ex.tapSlots?.[0]) ex.targetItem = ex.tapSlots[0].cell;
    return;
  }

  if (ex.type === "rhythm-groove") {
    const key = ex.targetItem?.key;
    if (ex.grooveKind === "style") {
      const def = getLocalizedRhythmGroove(key);
      if (!def) return;
      ex.keyName = tr("4/4 Groove", "4/4 Groove");
      Object.assign(ex.targetItem, def, { displayMain: def.roman });
      (ex.bars || []).forEach(b => {
        b.symbol = def.roman;
        b.short = def.short;
        b.label = def.label;
      });
    } else if (ex.grooveKind === "offbeat") {
      const def = getLocalizedRhythmOffbeat(key);
      if (!def) return;
      ex.keyName = tr("Akzent-Takt", "Accent Bar");
      Object.assign(ex.targetItem, def, { displayMain: def.roman });
      if (ex.bars?.[0]) {
        ex.bars[0].short = tr("Puls", "Pulse");
        ex.bars[0].label = tr("Referenz-Takt", "Reference Bar");
      }
      if (ex.bars?.[1]) {
        ex.bars[1].symbol = def.roman;
        ex.bars[1].short = def.short;
        ex.bars[1].label = def.label;
      }
    } else {
      const def = getLocalizedRhythmMicroTiming(key);
      if (!def) return;
      ex.keyName = ex.level >= 4 ? tr("Profi ±28 ms", "Pro ±28 ms") : tr("Pocket ±55 ms", "Pocket ±55 ms");
      Object.assign(ex.targetItem, def, { displayMain: def.roman });
      if (ex.bars?.[0]) {
        ex.bars[0].symbol = def.roman;
        ex.bars[0].short = def.short;
        ex.bars[0].label = def.label;
      }
    }
    return;
  }

  if (ex.type === "solfege") {
    const keyCode = ex.keyCode || state.currentKey;
    const leftFrameName = getWhiteNoteLabel(((prevWhiteMidi(ex.rootMidi) % 12) + 12) % 12);
    const rightFrameName = getWhiteNoteLabel(((nextWhiteMidi(ex.rootMidi + 12) % 12) + 12) % 12);
    ex.keyName = `${getKeyDisplayName(keyCode)} (${leftFrameName}–${rightFrameName})`;
    if (ex.targetItem?.key) {
      const baseStep = SOLFEGE_SCALE_STEPS.find(s => s.key === ex.targetItem.key);
      ex.targetItem.label = getLocalizedSolfegeStepLabel(ex.targetItem.key, baseStep?.label || ex.targetItem.label);
    }
    ex.bars = buildContextCadenceBars(ex.rootMidi);
    return;
  }

  if (ex.type === "melody") {
    const keyCode = ex.keyCode || state.currentKey;
    const rangeCfg = getLocalizedMelodyRange(ex.range) || getLocalizedMelodyRange("do-fa");
    const preferFlat = FLAT_KEYS.has(keyCode);
    const leftFrameName = getWhiteNoteLabel(((prevWhiteMidi(ex.rootMidi) % 12) + 12) % 12);
    const rightFrameName = getWhiteNoteLabel(((nextWhiteMidi(ex.rootMidi + 12) % 12) + 12) % 12);
    ex.rangeLabel = rangeCfg.label;
    ex.keyName = `${getKeyDisplayName(keyCode)} (${leftFrameName}–${rightFrameName})`;
    ex.cadenceBars = buildContextCadenceBars(ex.rootMidi);
    (ex.melodySlots || []).forEach(slot => {
      const baseStep = SOLFEGE_SCALE_STEPS.find(s => s.key === slot.key);
      slot.label = getLocalizedSolfegeStepLabel(slot.key, baseStep?.label || slot.label);
      slot.germanNote = midiToGermanNote(slot.playedMidi, preferFlat).replace(/[0-9]/g, "");
    });
    return;
  }

  if (isNotationMode(ex.type)) {
    refreshNotationQueueLocalization(ex);
  }
}
