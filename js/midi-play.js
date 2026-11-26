// =====================================================
// AKTIVE MIDI-SPIELÜBUNGEN (js/midi-play.js)
// Phase-2-Unterübungen direkt im jeweiligen Themengebiet:
//  - „Intervalle spielen“        (midi-interval, Kategorie Intervalle)
//  - „Akkorde greifen“           (midi-chord,    Kategorie Akkorde)
//  - „Tonleitern & Modi spielen“ (midi-scale,    Kategorie Tonleitern & Modi)
// Lauscher gibt Grundton und Ziel vor, du spielst die Antwort direkt
// auf deinem MIDI-Instrument. Ohne verbundenes Gerät erscheint eine
// Bildschirm-Klaviatur im Antwortbereich (#solfegeKeyboardWrap.is-midi-fallback).
// =====================================================

const MIDI_PLAY_CONFIG = Object.freeze({
  autoNextDelayMs: 1450,
  // Einschwingzeit für Akkorde am MIDI-Keyboard im Prüfungsmodus (ms ab voller Stimmenzahl)
  examChordSettleMs: 320
});

const _midiPlay = {
  autoNextTimer: 0,
  chordSettleTimer: 0,
  chordSettleArmed: false,
  chordLastFullHeld: [],
  examScaleSteps: [],
  lastPlayedMidi: null,
  fallbackSelectedMidis: new Set(),
  fallbackKbShown: false,
  fallbackKbEx: null,
  showSolutionHint: false
};

// ---------- Reine, testbare Bewertungsfunktionen ----------

/**
 * Bewertet einen gespielten Ton bei „Intervalle spielen“ (midi-interval).
 * Erwartet die genaue Zielnote (passend zu Grundton + Richtung).
 */
function evaluateMidiIntervalAttempt(task, playedMidi) {
  const pMidi = Math.round(Number(playedMidi));
  if (!task || !Number.isFinite(pMidi) || pMidi < 0 || pMidi > 127) {
    return { ok: false, status: "wrong", playedMidi: pMidi, targetMidi: task?.targetMidi ?? null, octaveDiff: 0, playedSemis: 0 };
  }
  const targetMidi = Math.round(Number(task.targetMidi));
  const rootMidi = Math.round(Number(task.rootMidi));
  const playedSemis = pMidi - rootMidi;

  if (pMidi === targetMidi) {
    return { ok: true, status: "correct", playedMidi: pMidi, targetMidi, octaveDiff: 0, playedSemis };
  }

  const targetPc = ((targetMidi % 12) + 12) % 12;
  const playedPc = ((pMidi % 12) + 12) % 12;
  if (playedPc === targetPc) {
    const octaveDiff = Math.round((pMidi - targetMidi) / 12);
    return { ok: false, status: "wrong-octave", playedMidi: pMidi, targetMidi, octaveDiff, playedSemis };
  }

  return { ok: false, status: "wrong", playedMidi: pMidi, targetMidi, octaveDiff: 0, playedSemis };
}

/**
 * Bewertet eine Menge gleichzeitig gehaltener MIDI-Noten bei „Akkorde greifen“ (midi-chord).
 * Auf Stufe 3 (Umkehrungen) wird zusätzlich der tiefste Ton (Basston) geprüft.
 */
function evaluateMidiChordAttempt(task, heldMidis) {
  if (!task || !Array.isArray(task.targetMidis) || task.targetMidis.length === 0) {
    return { ok: false, status: "incomplete", matchedCount: 0, totalCount: 0, extraMidis: [], missingMidis: [] };
  }
  return evaluateMidiChordMatch(task.targetMidis, heldMidis, {
    requireExactMidis: false,
    requireBassPc: task.requireBassPc !== undefined ? task.requireBassPc : null
  });
}

/**
 * Bewertet den nächsten Schritt einer aufwärts gespielten Tonleiter (midi-scale).
 * Schritt 0 akzeptiert den Grundton in beliebiger Oktave und verankert ab dort die Oktavlage,
 * sodass jede weitere Stufe sauber aufwärts erwartet wird.
 */
function evaluateMidiScaleStep(task, stepIdx, playedMidi, anchorMidi = null, options = {}) {
  const pMidi = Math.round(Number(playedMidi));
  if (!task || !Array.isArray(task.scaleIntervals) || stepIdx < 0 || stepIdx >= task.scaleIntervals.length) {
    return { ok: false, status: "wrong", nextAnchorMidi: anchorMidi, expectedMidi: null, expectedPc: null, playedMidi: pMidi };
  }
  const rootPc = ((Math.round(Number(task.rootPc)) % 12) + 12) % 12;
  const interval = Math.round(Number(task.scaleIntervals[stepIdx]));
  const expectedPc = ((rootPc + interval) % 12 + 12) % 12;
  const playedPc = ((pMidi % 12) + 12) % 12;

  if (stepIdx === 0) {
    // options.exactRoot: Start nur auf dem vorgegebenen Grundton (Bildschirm-Klaviatur zeigt genau eine Oktave)
    if (playedPc === rootPc && options.exactRoot && pMidi !== Math.round(Number(task.rootMidi))) {
      const octaveDiff = Math.round((pMidi - Number(task.rootMidi)) / 12);
      return { ok: false, status: "wrong-octave", nextAnchorMidi: null, expectedMidi: task.rootMidi, expectedPc: rootPc, playedMidi: pMidi, octaveDiff };
    }
    if (playedPc === rootPc) {
      return { ok: true, status: "correct", nextAnchorMidi: pMidi, expectedMidi: pMidi, expectedPc: rootPc, playedMidi: pMidi };
    }
    return { ok: false, status: "wrong", nextAnchorMidi: null, expectedMidi: task.rootMidi, expectedPc: rootPc, playedMidi: pMidi };
  }

  const baseAnchor = Number.isFinite(Number(anchorMidi)) ? Math.round(Number(anchorMidi)) : Math.round(Number(task.rootMidi));
  const expectedMidi = baseAnchor + interval;

  if (pMidi === expectedMidi) {
    return { ok: true, status: "correct", nextAnchorMidi: baseAnchor, expectedMidi, expectedPc, playedMidi: pMidi };
  }
  if (playedPc === expectedPc) {
    const octaveDiff = Math.round((pMidi - expectedMidi) / 12);
    return { ok: false, status: "wrong-octave", nextAnchorMidi: baseAnchor, expectedMidi, expectedPc, playedMidi: pMidi, octaveDiff };
  }
  return { ok: false, status: "wrong", nextAnchorMidi: baseAnchor, expectedMidi, expectedPc, playedMidi: pMidi };
}

/**
 * Bewertet einen kompletten Tonleiter-Durchlauf im Prüfungsmodus (midi-scale).
 * Die Nutzer spielen die komplette Tonleiter durch; jeder richtige Schritt bringt anteilige Punkte.
 */
function evaluateMidiScaleExamRun(task, playedMidis, options = {}) {
  const intervals = Array.isArray(task?.scaleIntervals) ? task.scaleIntervals : [];
  const total = intervals.length;
  const fallbackRoot = Math.round(Number(task?.rootMidi ?? 60));
  if (!task || total === 0) {
    return { total: 0, correctCount: 0, score: 0, status: "wrong", anchorMidi: fallbackRoot, expectedMidis: [], steps: [], wrongSteps: [] };
  }
  const played = Array.isArray(playedMidis) ? playedMidis : [];
  let anchorMidi = null;
  const steps = [];
  const expectedMidis = [];

  for (let i = 0; i < total; i++) {
    const pMidi = i < played.length ? Math.round(Number(played[i])) : NaN;
    const stepRes = evaluateMidiScaleStep(task, i, pMidi, anchorMidi, options);
    if (i === 0) {
      anchorMidi = stepRes.ok && Number.isFinite(stepRes.nextAnchorMidi) ? stepRes.nextAnchorMidi : fallbackRoot;
    }
    const expMidi = i === 0
      ? (stepRes.ok && Number.isFinite(stepRes.expectedMidi) ? stepRes.expectedMidi : fallbackRoot)
      : anchorMidi + Math.round(Number(intervals[i]));
    expectedMidis.push(expMidi);
    steps.push({
      stepIdx: i,
      stepNumber: i + 1,
      expectedMidi: expMidi,
      playedMidi: Number.isFinite(pMidi) ? pMidi : null,
      ok: Boolean(stepRes.ok),
      wrongOctave: stepRes.status === "wrong-octave"
    });
  }

  const correctCount = steps.filter(s => s.ok).length;
  const score = Math.round((correctCount / total) * 100) / 100;
  const status = correctCount === total ? "correct" : (correctCount > 0 ? "partial" : "wrong");
  const wrongSteps = steps.filter(s => !s.ok);
  return { total, correctCount, score, status, anchorMidi, expectedMidis, steps, wrongSteps };
}

// ---------- Texte & Zusammenfassungen ----------

function getMidiPlayModeTitle(mode) {
  if (mode === "midi-chord") return tr("Akkorde greifen", "Play Chords");
  if (mode === "midi-scale") return tr("Tonleitern & Modi spielen", "Play Scales & Modes");
  return tr("Intervalle spielen", "Play Intervals");
}

// Beschriftung des Referenzton-Knopfs: Intervall → Ausgangston, Akkord → Basston, Tonleiter → Grundton
function getMidiPlayRefLabel(mode) {
  if (mode === "midi-chord") return tr("Basston", "Bass Note");
  if (mode === "midi-scale") return tr("Grundton", "Root");
  return tr("Ausgangston", "Root Note");
}

// Eingabe-Hinweis über dem Antwortbereich – je nachdem, ob ein MIDI-Gerät verbunden ist
function getMidiPlayInputPrompt(mode) {
  const connected = typeof isMidiConnected === "function" && isMidiConnected();
  if (mode === "midi-chord") {
    return connected
      ? tr("Greife den Akkord auf deinem MIDI-Keyboard:", "Play the chord on your MIDI keyboard:")
      : tr("Greife den Akkord auf der Klaviatur:", "Play the chord on the keyboard:");
  }
  if (mode === "midi-scale") {
    return connected
      ? tr("Spiele die Tonleiter aufwärts auf deinem MIDI-Keyboard:", "Play the scale ascending on your MIDI keyboard:")
      : tr("Spiele die Tonleiter aufwärts auf der Klaviatur:", "Play the scale ascending on the keyboard:");
  }
  return connected
    ? tr("Spiele das gesuchte Intervall auf deinem MIDI-Keyboard:", "Play the target interval on your MIDI keyboard:")
    : tr("Spiele das gesuchte Intervall auf der Klaviatur:", "Play the target interval on the keyboard:");
}

function getMidiChordLevelLabel(lvl) {
  const names = {
    1: tr("Dur & Moll", "Major & Minor"),
    2: tr("Alle Dreiklänge", "All Triads"),
    3: tr("Umkehrungen", "Inversions"),
    4: tr("Vierklänge (Sept)", "7th Chords")
  };
  return names[lvl] || names[1];
}

function getMidiScaleLevelLabel(lvl) {
  const names = {
    1: tr("Dur & Moll", "Major & Minor"),
    2: tr("7 Kirchentonarten", "All 7 Modes"),
    3: tr("Erweitert (+ Pent./Harm.)", "Extended (+ Pent./Harm.)")
  };
  return names[lvl] || names[1];
}

function getMidiIntervalDirectionLabel(dir = state?.settings?.midiIntervalDirection) {
  if (dir === "down") return tr("Abwärts", "Descending");
  if (dir === "mixed") return tr("Gemischt", "Mixed");
  return tr("Aufwärts", "Ascending");
}

function getMidiPlaySummaryText(mode, includeCategory = true) {
  const lvlWord = tr("Stufe", "Level");
  if (mode === "midi-chord") {
    const lvl = parseInt(state?.settings?.midiChordDifficulty, 10) || 1;
    const detail = `${lvlWord} ${lvl} (${getMidiChordLevelLabel(lvl)})`;
    return includeCategory ? `${getMidiPlayModeTitle(mode)} • ${detail}` : detail;
  }
  if (mode === "midi-scale") {
    const lvl = parseInt(state?.settings?.midiScaleDifficulty, 10) || 1;
    const detail = `${lvlWord} ${lvl} (${getMidiScaleLevelLabel(lvl)})`;
    return includeCategory ? `${getMidiPlayModeTitle(mode)} • ${detail}` : detail;
  }
  const lvl = parseInt(state?.settings?.midiIntervalDifficulty, 10) || 1;
  const lvlText = typeof getSingIntervalLevelLabel === "function"
    ? getSingIntervalLevelLabel(lvl)
    : `${lvlWord} ${lvl}`;
  const dirText = getMidiIntervalDirectionLabel();
  const detail = `${lvlWord} ${lvl} (${lvlText} • ${dirText})`;
  return includeCategory ? `${getMidiPlayModeTitle(mode)} • ${detail}` : detail;
}

function cancelMidiPlayTimers() {
  if (_midiPlay.autoNextTimer) {
    clearTimeout(_midiPlay.autoNextTimer);
    _midiPlay.autoNextTimer = 0;
  }
  if (_midiPlay.chordSettleTimer) {
    clearTimeout(_midiPlay.chordSettleTimer);
    _midiPlay.chordSettleTimer = 0;
  }
}

function resetMidiPlayRuntimeState() {
  cancelMidiPlayTimers();
  _midiPlay.chordSettleArmed = false;
  _midiPlay.chordLastFullHeld = [];
  _midiPlay.examScaleSteps = [];
  _midiPlay.lastPlayedMidi = null;
  _midiPlay.fallbackSelectedMidis.clear();
  _midiPlay.showSolutionHint = false;
}

function cycleMidiIntervalDirection() {
  const order = ["up", "down", "mixed"];
  const cur = state?.settings?.midiIntervalDirection || "up";
  const next = order[(order.indexOf(cur) + 1) % order.length];
  state.settings.midiIntervalDirection = next;
  if (typeof rememberPracticeProgress === "function") rememberPracticeProgress();
  state.updateHeaderSubtext();
  state.updateQuickStartLabel();
  if (state.currentView === "exercise" && state.currentExercise?.type === "midi-interval") {
    stopPlayback();
    generateExercise();
  }
}

function syncMidiDirChip() {
  const chip = document.getElementById("midiDirChipBtn");
  if (!chip) return;
  const isMidiInt = state?.currentView === "exercise" && state?.currentExercise?.type === "midi-interval";
  chip.classList.toggle("hidden", !isMidiInt);
  if (!isMidiInt) return;
  const dir = state?.settings?.midiIntervalDirection || "up";
  const arrow = dir === "down" ? "↘" : (dir === "mixed" ? "↕" : "↗");
  chip.textContent = `${arrow} ${getMidiIntervalDirectionLabel(dir)}`;
}

// ---------- Aufgaben-Vorspielen ----------

async function playMidiPlayPrompt(ex = state?.currentExercise) {
  if (!ex || !ex.midiTask || !isMidiPlayMode(ex.type)) return;
  if (typeof prepareAudioNonBlocking === "function") prepareAudioNonBlocking();
  audioEngine.stopPlayback();
  const task = ex.midiTask;

  if (ex.type === "midi-interval") {
    audioEngine.playStep([midiToNote(task.rootMidi)], 1.05, null, "interval", { velocity: 0.78 });
    return;
  }
  if (ex.type === "midi-chord") {
    // Grundton bzw. tiefsten Ton kurz anspielen als Referenz
    audioEngine.playStep([midiToNote(task.rootMidi)], 0.9, null, "interval", { velocity: 0.74 });
    return;
  }
  if (ex.type === "midi-scale") {
    audioEngine.playStep([midiToNote(task.rootMidi)], 0.95, null, "interval", { velocity: 0.76 });
  }
}

function playMidiPlaySolution(ex = state?.currentExercise) {
  if (!ex || !ex.midiTask || !isMidiPlayMode(ex.type)) return;
  if (typeof prepareAudioNonBlocking === "function") prepareAudioNonBlocking();
  audioEngine.stopPlayback();
  const task = ex.midiTask;
  _midiPlay.showSolutionHint = true;

  if (!ex.isSolved && typeof resetExerciseStreakOnAttempt === "function") {
    resetExerciseStreakOnAttempt(ex);
  }

  if (ex.type === "midi-interval") {
    const notes = [midiToNote(task.rootMidi), midiToNote(task.targetMidi)];
    audioEngine.playStep([notes[0]], 0.55, null, "interval", { velocity: 0.75 });
    setTimeout(() => {
      if (state.currentExercise === ex && state.currentView === "exercise") {
        audioEngine.playStep([notes[1]], 0.9, null, "interval", { velocity: 0.82 });
      }
    }, 520);
  } else if (ex.type === "midi-chord") {
    const notes = task.targetMidis.map(m => midiToNote(m));
    audioEngine.playStep(notes, 1.35, null, "chord", { velocity: 0.78 });
  } else if (ex.type === "midi-scale") {
    const stepMs = 240;
    task.scaleMidis.forEach((m, idx) => {
      setTimeout(() => {
        if (state.currentExercise === ex && state.currentView === "exercise") {
          audioEngine.playStep([midiToNote(m)], 0.35, null, "interval", { velocity: 0.76 });
        }
      }, idx * stepMs);
    });
  }

  renderMidiPlayPad(ex);
}

// ---------- Eingabe-Verarbeitung (MIDI & Bildschirm-Rückfall) ----------

function describePlayedIntervalFromSemis(semis) {
  const abs = Math.abs(Math.round(semis));
  if (abs === 0) return tr("Prime (gleicher Ton)", "Unison (same note)");
  const map = {
    1: "m2", 2: "M2", 3: "m3", 4: "M3", 5: "P4", 6: "TT",
    7: "P5", 8: "m6", 9: "M6", 10: "m7", 11: "M7", 12: "P8"
  };
  const key = map[abs];
  if (key && typeof getLocalizedIntervalDef === "function") {
    const def = getLocalizedIntervalDef(key);
    if (def?.name) return def.name;
  }
  return tf("{n} Halbtöne", "{n} semitones", { n: abs });
}

function handleMidiPlaySolved(ex, headline, subline) {
  ex.isSolved = true;
  state.exerciseSolved = true;
  cancelMidiPlayTimers();

  if (typeof noteSessionReviewAnswer === "function") noteSessionReviewAnswer(ex, true);
  const streakRes = typeof recordExerciseStreakSuccess === "function"
    ? recordExerciseStreakSuccess(ex)
    : { count: 0, isMilestone: false };
  if (typeof triggerCelebrationFeedback === "function") {
    const anchorEl = document.getElementById("midiPlayPadWrap") || document.getElementById("centralStageCard");
    triggerCelebrationFeedback(anchorEl, { isMilestone: Boolean(streakRes?.isMilestone) });
  }

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-correct");
    updateStageMascot("happy");
    document.getElementById("stageSubtext").textContent = typeof getPersonalizedCorrectStageSubtext === "function"
      ? getPersonalizedCorrectStageSubtext(tr("SAUBER GESPIELT!", "NICELY PLAYED!"))
      : tr("SAUBER GESPIELT!", "NICELY PLAYED!");
    document.getElementById("stageMainText").textContent = headline;
    document.getElementById("stageFunctionText").textContent = subline;
    if (typeof renderStageStreakUI === "function") renderStageStreakUI();
  }

  renderMidiPlayPad(ex);
  syncMidiPlayFallbackKeyboardMarks(ex);

  if (state.settings.autoNextAfterCorrect) {
    _midiPlay.autoNextTimer = setTimeout(() => {
      if (state.currentView === "exercise" && state.currentExercise === ex && ex.isSolved) {
        generateExercise();
      }
    }, MIDI_PLAY_CONFIG.autoNextDelayMs);
  }
}

function playMidiPlayScreenTone(midi, durSec = 0.85) {
  if (typeof audioEngine === "undefined" || !audioEngine) return;
  if (typeof prepareAudioNonBlocking === "function") prepareAudioNonBlocking();
  const noteName = typeof midiToNote === "function" ? midiToNote(midi) : null;
  if (!noteName) return;
  audioEngine.playStep([noteName], durSec, null, "interval", { velocity: 0.8 });
}

/**
 * Verarbeitet einen gespielten Ton (MIDI-Taste oder Bildschirm-Klaviatur mit options.fromScreen).
 * Gibt das Bewertungsergebnis zurück (für die Tasten-Rückmeldung der Bildschirm-Klaviatur).
 */
function handleMidiPlayNoteOn(midi, velocity = 90, options = {}) {
  const ex = state?.currentExercise;
  if (!ex || !ex.midiTask || !isMidiPlayMode(ex.type)) return null;
  const fromScreen = Boolean(options.fromScreen);

  // Bildschirm-Tasten klingen immer; MIDI-Tasten nur mit eingeschaltetem App-Klang
  if (fromScreen) playMidiPlayScreenTone(midi);
  else playMidiAppTone(midi, velocity, 0.85);
  _midiPlay.lastPlayedMidi = midi;

  const isExam = Boolean(state?.exam?.active);
  if (isExam) {
    return handleMidiPlayExamNoteOn(ex, midi, { fromScreen });
  }

  if (ex.isSolved) return null;

  const task = ex.midiTask;

  // 1) Intervalle spielen
  if (ex.type === "midi-interval") {
    const res = evaluateMidiIntervalAttempt(task, midi);
    if (res.ok) {
      const targetLbl = task.targetLabel || formatMidiNoteDisplay(task.targetMidi);
      handleMidiPlaySolved(
        ex,
        `${task.intervalName} ✓`,
        `${task.rootLabel || formatMidiNoteDisplay(task.rootMidi)} → ${targetLbl}`
      );
      return res;
    }

    if (typeof resetExerciseStreakOnAttempt === "function") resetExerciseStreakOnAttempt(ex);
    if (typeof noteSessionReviewAnswer === "function") noteSessionReviewAnswer(ex, false);

    if (document.getElementById("centralStageCard")) {
      setCentralStageMode("stage-wrong");
      updateStageMascot("thinking");
      if (res.status === "wrong-octave") {
        const dirWord = res.octaveDiff > 0 ? tr("zu hoch", "too high") : tr("zu tief", "too low");
        document.getElementById("stageSubtext").textContent = tr("RICHTIGER TON, ANDERE OKTAVE", "RIGHT NOTE, WRONG OCTAVE");
        document.getElementById("stageMainText").textContent = `${formatMidiNoteDisplay(midi)} (${dirWord})`;
        document.getElementById("stageFunctionText").textContent = tf(
          "Gesucht: {dir} ab {root}",
          "Target: {dir} from {root}",
          { dir: task.directionArrow, root: task.rootLabel || formatMidiNoteDisplay(task.rootMidi) }
        );
      } else {
        const playedName = describePlayedIntervalFromSemis(res.playedSemis);
        document.getElementById("stageSubtext").textContent = tr("NOCH NICHT GANZ", "NOT QUITE");
        document.getElementById("stageMainText").textContent = `${formatMidiNoteDisplay(midi)} (${playedName})`;
        document.getElementById("stageFunctionText").textContent = tf(
          "Gesucht: {name} {arrow} ab {root}",
          "Target: {name} {arrow} from {root}",
          { name: task.intervalName, arrow: task.directionArrow, root: task.rootLabel || formatMidiNoteDisplay(task.rootMidi) }
        );
      }
    }
    renderMidiPlayPad(ex);
    return res;
  }

  // 2) Akkorde greifen
  if (ex.type === "midi-chord") {
    const held = getMidiPlayActiveChordNotes();
    const res = evaluateMidiChordAttempt(task, held);

    if (res.ok) {
      handleMidiPlaySolved(
        ex,
        `${task.chordLabel} ✓`,
        task.toneNamesDisplay
      );
      return res;
    }

    // Vollständig gegriffener, aber falscher Akkord zählt wie ein falscher Tipp (wie bei den anderen Übungen)
    const isWrongAttempt = res.status === "wrong-bass" || (res.status === "wrong-notes" && held.length >= task.targetMidis.length);
    if (isWrongAttempt) {
      if (typeof resetExerciseStreakOnAttempt === "function") resetExerciseStreakOnAttempt(ex);
      if (typeof noteSessionReviewAnswer === "function") noteSessionReviewAnswer(ex, false);
    }

    if (document.getElementById("centralStageCard")) {
      if (res.status === "wrong-bass") {
        setCentralStageMode("stage-wrong");
        updateStageMascot("thinking");
        document.getElementById("stageSubtext").textContent = tr("BASSTON PRÜFEN", "CHECK THE BASS NOTE");
        document.getElementById("stageMainText").textContent = held.map(formatMidiNoteDisplay).join(" · ");
        document.getElementById("stageFunctionText").textContent = tf(
          "Richtige Töne, aber für {inv} muss {bass} ganz unten liegen!",
          "Right notes, but for {inv} the lowest note must be {bass}!",
          { inv: task.inversionLabel, bass: task.expectedBassName }
        );
      } else if (res.status === "wrong-notes" && held.length >= task.targetMidis.length) {
        setCentralStageMode("stage-wrong");
        updateStageMascot("thinking");
        document.getElementById("stageSubtext").textContent = tr("NOCH NICHT GANZ", "NOT QUITE");
        document.getElementById("stageMainText").textContent = held.map(formatMidiNoteDisplay).join(" · ");
        document.getElementById("stageFunctionText").textContent = tf(
          "Gesucht: {chord} – probiere es nochmal!",
          "Target: {chord} — try again!",
          { chord: task.chordLabel }
        );
      } else {
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("AKKORDTON {found}/{total}", "CHORD TONE {found}/{total}", {
          found: res.matchedCount,
          total: res.totalCount
        });
        document.getElementById("stageMainText").textContent = held.map(formatMidiNoteDisplay).join(" · ");
        document.getElementById("stageFunctionText").textContent = fromScreen || _midiPlay.fallbackSelectedMidis.size > 0
          ? tr("Tippe alle Akkordtöne an – nochmal tippen hebt die Auswahl auf.", "Tap all chord tones — tap again to deselect.")
          : tr("Halte alle Akkordtöne gleichzeitig gedrückt!", "Hold all chord tones together!");
      }
    }
    renderMidiPlayPad(ex);
    syncMidiPlayFallbackKeyboardMarks(ex);
    return res;
  }

  // 3) Tonleitern & Modi spielen
  if (ex.type === "midi-scale") {
    const stepIdx = task.currentStep || 0;
    const res = evaluateMidiScaleStep(task, stepIdx, midi, task.anchorMidi, { exactRoot: fromScreen });

    if (res.ok) {
      task.anchorMidi = res.nextAnchorMidi;
      task.currentStep = stepIdx + 1;

      if (task.currentStep >= task.scaleIntervals.length) {
        handleMidiPlaySolved(
          ex,
          `${task.scaleTitle} ✓`,
          task.scaleNoteNames.join(" – ")
        );
        return res;
      }

      if (document.getElementById("centralStageCard")) {
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("TON {n} VON {tot}", "NOTE {n} OF {tot}", {
          n: task.currentStep,
          tot: task.scaleIntervals.length
        });
        document.getElementById("stageMainText").textContent = `${formatMidiNoteDisplay(midi)} ✓`;
        document.getElementById("stageFunctionText").textContent = tr("Weiter aufwärts zum nächsten Ton!", "Continue upward to the next note!");
      }
      renderMidiPlayPad(ex);
      syncMidiPlayFallbackKeyboardMarks(ex);
      return res;
    }

    if (typeof resetExerciseStreakOnAttempt === "function") resetExerciseStreakOnAttempt(ex);
    if (typeof noteSessionReviewAnswer === "function") noteSessionReviewAnswer(ex, false);
    if (document.getElementById("centralStageCard")) {
      setCentralStageMode("stage-wrong");
      updateStageMascot("thinking");
      if (res.status === "wrong-octave") {
        document.getElementById("stageSubtext").textContent = tr("RICHTIGER TON, ANDERE OKTAVE", "RIGHT NOTE, WRONG OCTAVE");
        document.getElementById("stageMainText").textContent = formatMidiNoteDisplay(midi);
        document.getElementById("stageFunctionText").textContent = tf(
          "Spiele den nächsten Ton aufwärts ({note}).",
          "Play the next note upward ({note}).",
          { note: formatMidiNoteDisplay(res.expectedMidi) }
        );
      } else {
        document.getElementById("stageSubtext").textContent = tf("TON {n} VON {tot} • NOCH NICHT", "NOTE {n} OF {tot} • NOT QUITE", {
          n: stepIdx + 1,
          tot: task.scaleIntervals.length
        });
        document.getElementById("stageMainText").textContent = `${formatMidiNoteDisplay(midi)}? ${tr("Nein", "No")}`;
        document.getElementById("stageFunctionText").textContent = stepIdx === 0
          ? tf("Starte auf dem Grundton {root}!", "Start on the root note {root}!", { root: task.rootName })
          : tr("Prüfe den Halbton-/Ganztonschritt und probiere diesen Ton nochmal.", "Check the half/whole step and try this note again.");
      }
    }
    renderMidiPlayPad(ex);
    return res;
  }
  return null;
}

// ---------- Prüfungs-Eingabelogik (js/exam.js) ----------

function scheduleMidiExamChordSettle(ex, heldSnapshot) {
  if (_midiPlay.chordSettleTimer) {
    clearTimeout(_midiPlay.chordSettleTimer);
    _midiPlay.chordSettleTimer = 0;
  }
  _midiPlay.chordSettleArmed = true;
  _midiPlay.chordLastFullHeld = [...heldSnapshot];
  _midiPlay.chordSettleTimer = setTimeout(() => {
    _midiPlay.chordSettleTimer = 0;
    const exam = state?.exam;
    if (!exam || !exam.active || exam.currentAnswered || state.currentExercise !== ex) return;
    const currentHeld = getMidiPlayActiveChordNotes();
    const finalHeld = currentHeld.length >= ex.midiTask.targetMidis.length
      ? currentHeld
      : (_midiPlay.chordLastFullHeld.length > 0 ? [..._midiPlay.chordLastFullHeld] : currentHeld);
    _midiPlay.chordSettleArmed = false;
    _midiPlay.chordLastFullHeld = [];
    const res = evaluateMidiChordAttempt(ex.midiTask, finalHeld);
    if (typeof handleExamMidiChordAnswer === "function") {
      handleExamMidiChordAnswer(ex, finalHeld, res);
    }
  }, MIDI_PLAY_CONFIG.examChordSettleMs);
}

function submitMidiPlayExamChord() {
  const ex = state?.currentExercise;
  const exam = state?.exam;
  if (!exam || !exam.active || exam.currentAnswered || !ex || ex.type !== "midi-chord" || !ex.midiTask) return;
  const held = getMidiPlayActiveChordNotes();
  if (held.length === 0) return;
  cancelMidiPlayTimers();
  _midiPlay.chordSettleArmed = false;
  _midiPlay.chordLastFullHeld = [];
  const res = evaluateMidiChordAttempt(ex.midiTask, held);
  if (typeof handleExamMidiChordAnswer === "function") {
    handleExamMidiChordAnswer(ex, held, res);
  }
}

function handleMidiPlayExamNoteOn(ex, midi, options = {}) {
  const exam = state?.exam;
  if (!exam || !exam.active || exam.currentAnswered || !ex?.midiTask) return null;
  const fromScreen = Boolean(options.fromScreen);
  const task = ex.midiTask;

  // 1) Intervalle spielen: 1 Versuch pro Frage
  if (ex.type === "midi-interval") {
    const res = evaluateMidiIntervalAttempt(task, midi);
    if (typeof handleExamMidiIntervalAnswer === "function") {
      handleExamMidiIntervalAnswer(ex, midi, res, { fromScreen });
    }
    return res;
  }

  // 2) Akkorde greifen: Bildschirm wählt aus + „Antwort prüfen“; MIDI mit kurzer Einschwingzeit
  if (ex.type === "midi-chord") {
    const held = getMidiPlayActiveChordNotes();
    const total = task.targetMidis.length;
    if (fromScreen) {
      if (document.getElementById("centralStageCard")) {
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("GEWÄHLTE TÖNE {n}/{total}", "SELECTED NOTES {n}/{total}", {
          n: held.length,
          total
        });
        document.getElementById("stageMainText").textContent = held.map(formatMidiNoteDisplay).join(" · ");
        document.getElementById("stageFunctionText").textContent = tr(
          "Tippe auf „Antwort prüfen“, sobald dein Akkord steht.",
          "Tap “Check Answer” once your chord is ready."
        );
      }
      renderMidiPlayPad(ex);
      syncMidiPlayFallbackKeyboardMarks(ex);
      return { ok: false, status: "selecting" };
    }

    const res = evaluateMidiChordAttempt(task, held);
    if (res.ok) {
      cancelMidiPlayTimers();
      _midiPlay.chordSettleArmed = false;
      _midiPlay.chordLastFullHeld = [];
      if (typeof handleExamMidiChordAnswer === "function") {
        handleExamMidiChordAnswer(ex, held, res);
      }
      return res;
    }

    if (held.length >= total) {
      scheduleMidiExamChordSettle(ex, held);
    }

    if (document.getElementById("centralStageCard")) {
      setCentralStageMode("stage-playing");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tf("GEGRIFFENE TÖNE {n}/{total}", "HELD NOTES {n}/{total}", {
        n: held.length,
        total
      });
      document.getElementById("stageMainText").textContent = held.map(formatMidiNoteDisplay).join(" · ");
      document.getElementById("stageFunctionText").textContent = tr(
        "Halte alle Akkordtöne gleichzeitig gedrückt!",
        "Hold all chord tones together!"
      );
    }
    renderMidiPlayPad(ex);
    return res;
  }

  // 3) Tonleitern & Modi spielen: Komplett durchspielen mit anteiliger Auswertung am Ende
  if (ex.type === "midi-scale") {
    const stepIdx = _midiPlay.examScaleSteps.length;
    const total = task.scaleIntervals.length;
    if (stepIdx >= total) return null;

    const stepRes = evaluateMidiScaleStep(task, stepIdx, midi, task.anchorMidi, { exactRoot: fromScreen });
    if (stepIdx === 0) {
      task.anchorMidi = stepRes.ok && Number.isFinite(stepRes.nextAnchorMidi)
        ? stepRes.nextAnchorMidi
        : Math.round(Number(task.rootMidi));
    }
    const expMidi = stepIdx === 0
      ? (stepRes.ok && Number.isFinite(stepRes.expectedMidi) ? stepRes.expectedMidi : Math.round(Number(task.rootMidi)))
      : Number(task.anchorMidi) + Number(task.scaleIntervals[stepIdx]);

    _midiPlay.examScaleSteps.push({
      stepIdx,
      stepNumber: stepIdx + 1,
      expectedMidi: expMidi,
      playedMidi: midi,
      ok: Boolean(stepRes.ok),
      wrongOctave: stepRes.status === "wrong-octave"
    });
    task.currentStep = _midiPlay.examScaleSteps.length;

    if (task.currentStep >= total) {
      const playedList = _midiPlay.examScaleSteps.map(s => s.playedMidi);
      const runRes = evaluateMidiScaleExamRun(task, playedList, { exactRoot: fromScreen });
      if (typeof handleExamMidiScaleFinished === "function") {
        handleExamMidiScaleFinished(ex, runRes);
      }
      return stepRes;
    }

    const isBlind = exam.feedbackMode === "blind";
    if (document.getElementById("centralStageCard")) {
      if (isBlind) {
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("TON {n} VON {tot}", "NOTE {n} OF {tot}", {
          n: task.currentStep,
          tot: total
        });
        document.getElementById("stageMainText").textContent = formatMidiNoteDisplay(midi);
        document.getElementById("stageFunctionText").textContent = tr("Weiter aufwärts zum nächsten Ton!", "Continue upward to the next note!");
      } else if (stepRes.ok) {
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("TON {n} VON {tot}", "NOTE {n} OF {tot}", {
          n: task.currentStep,
          tot: total
        });
        document.getElementById("stageMainText").textContent = `${formatMidiNoteDisplay(midi)} ✓`;
        document.getElementById("stageFunctionText").textContent = tr("Weiter aufwärts zum nächsten Ton!", "Continue upward to the next note!");
      } else {
        setCentralStageMode("stage-wrong");
        updateStageMascot("thinking");
        document.getElementById("stageSubtext").textContent = tf("TON {n} VON {tot} • DANEBEN", "NOTE {n} OF {tot} • OFF", {
          n: task.currentStep,
          tot: total
        });
        document.getElementById("stageMainText").textContent = `${formatMidiNoteDisplay(midi)} (${tr("Ziel", "Target")}: ${formatMidiNoteDisplay(expMidi)})`;
        document.getElementById("stageFunctionText").textContent = tr("Spiele die Tonleiter einfach weiter bis zum Schluss!", "Keep playing the rest of the scale to the end!");
      }
    }
    renderMidiPlayPad(ex);
    syncMidiPlayFallbackKeyboardMarks(ex);
    return stepRes;
  }

  return null;
}

function handleMidiPlayNoteOff(midi) {
  const ex = state?.currentExercise;
  if (!ex || ex.type !== "midi-chord" || ex.isSolved) return;
  const exam = state?.exam;
  if (exam && exam.active && !exam.currentAnswered) {
    const held = getMidiPlayActiveChordNotes();
    if (held.length >= ex.midiTask.targetMidis.length) {
      const res = evaluateMidiChordAttempt(ex.midiTask, held);
      if (res.ok) {
        cancelMidiPlayTimers();
        _midiPlay.chordSettleArmed = false;
        _midiPlay.chordLastFullHeld = [];
        if (typeof handleExamMidiChordAnswer === "function") {
          handleExamMidiChordAnswer(ex, held, res);
        }
        return;
      }
      if (_midiPlay.chordSettleArmed) {
        _midiPlay.chordLastFullHeld = [...held];
      }
    } else if (_midiPlay.chordSettleArmed && held.length === 0) {
      // Alle Tasten nach vollständigem Griff losgelassen → direkt auswerten
      cancelMidiPlayTimers();
      const finalHeld = [..._midiPlay.chordLastFullHeld];
      _midiPlay.chordSettleArmed = false;
      _midiPlay.chordLastFullHeld = [];
      const res = evaluateMidiChordAttempt(ex.midiTask, finalHeld);
      if (typeof handleExamMidiChordAnswer === "function") {
        handleExamMidiChordAnswer(ex, finalHeld, res);
      }
      return;
    }
  }
  renderMidiPlayPad(ex);
}

// Bildschirm-Klaviatur bei „Akkorde greifen“: Tippen wählt einen Ton an bzw. wieder ab
function toggleMidiPlayFallbackChordNote(midi) {
  const ex = state?.currentExercise;
  if (!ex || ex.type !== "midi-chord" || !ex.midiTask) return;
  const isExam = Boolean(state?.exam?.active);
  if (ex.isSolved || (isExam && state.exam.currentAnswered)) {
    playMidiPlayScreenTone(midi);
    return;
  }
  if (_midiPlay.fallbackSelectedMidis.has(midi)) {
    _midiPlay.fallbackSelectedMidis.delete(midi);
    syncMidiPlayFallbackKeyboardMarks(ex);
    if (_midiPlay.fallbackSelectedMidis.size === 0) {
      _midiPlay.lastPlayedMidi = null;
      syncMidiPlayStage(ex);
      renderMidiPlayPad(ex);
    } else {
      const held = getMidiPlayActiveChordNotes();
      if (document.getElementById("centralStageCard")) {
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        if (isExam) {
          document.getElementById("stageSubtext").textContent = tf("GEWÄHLTE TÖNE {n}/{total}", "SELECTED NOTES {n}/{total}", {
            n: held.length,
            total: ex.midiTask.targetMidis.length
          });
          document.getElementById("stageMainText").textContent = held.map(formatMidiNoteDisplay).join(" · ");
          document.getElementById("stageFunctionText").textContent = tr(
            "Tippe auf „Antwort prüfen“, sobald dein Akkord steht.",
            "Tap “Check Answer” once your chord is ready."
          );
        } else {
          const res = evaluateMidiChordAttempt(ex.midiTask, held);
          document.getElementById("stageSubtext").textContent = tf("AKKORDTON {found}/{total}", "CHORD TONE {found}/{total}", {
            found: res.matchedCount,
            total: res.totalCount
          });
          document.getElementById("stageMainText").textContent = held.map(formatMidiNoteDisplay).join(" · ");
          document.getElementById("stageFunctionText").textContent = tr("Tippe alle Akkordtöne an – nochmal tippen hebt die Auswahl auf.", "Tap all chord tones — tap again to deselect.");
        }
      }
      renderMidiPlayPad(ex);
    }
    return;
  }
  _midiPlay.fallbackSelectedMidis.add(midi);
  handleMidiPlayNoteOn(midi, 96, { fromScreen: true });
}

function getMidiPlayActiveChordNotes() {
  const hardwareHeld = typeof getMidiHeldNotesArray === "function" ? getMidiHeldNotesArray() : [];
  const combined = new Set([...hardwareHeld, ..._midiPlay.fallbackSelectedMidis]);
  return Array.from(combined).sort((a, b) => a - b);
}

// ---------- UI-Rendering (#midiPlayPadWrap & Bühne) ----------

function syncMidiPlayStage(ex = state?.currentExercise) {
  if (!ex || !ex.midiTask || !isMidiPlayMode(ex.type)) return;
  const task = ex.midiTask;
  if (!document.getElementById("centralStageCard")) return;
  if (ex.isSolved) return;
  // Läuft die Aufgabe schon (Ton gespielt / Akkordtöne angewählt), die Rückmeldung auf der Bühne stehen lassen,
  // z. B. wenn renderUI durch Theme- oder Sprachwechsel erneut läuft
  if (_midiPlay.lastPlayedMidi !== null || _midiPlay.fallbackSelectedMidis.size > 0) return;

  // Die Aufgabe selbst steht schon in der Karte oben – die Bühne zeigt nur Status & Anleitung
  setCentralStageMode("stage-target");
  updateStageMascot("awaiting");
  const onScreen = !(typeof isMidiConnected === "function" && isMidiConnected());
  document.getElementById("stageSubtext").textContent = getMidiPlayModeTitle(ex.type).toUpperCase();
  document.getElementById("stageMainText").textContent = tr("Dein Einsatz", "Your turn");

  let instruction = "";
  if (ex.type === "midi-interval") {
    const rootLbl = task.rootLabel || formatMidiNoteDisplay(task.rootMidi);
    instruction = onScreen
      ? tf("Tippe den Zielton ab {root} auf der Klaviatur.", "Tap the target note from {root} on the keyboard.", { root: rootLbl })
      : tf("Spiele den Zielton ab {root} auf deinem MIDI-Keyboard.", "Play the target note from {root} on your MIDI keyboard.", { root: rootLbl });
  } else if (ex.type === "midi-chord") {
    const how = onScreen
      ? tr("Tippe alle Akkordtöne an.", "Tap all chord tones.")
      : tr("Halte alle Akkordtöne gleichzeitig gedrückt.", "Hold all chord tones together.");
    instruction = task.requireBassPc !== null
      ? `${tf("{bass} muss ganz unten liegen.", "{bass} must be the lowest note.", { bass: task.expectedBassName })} ${how}`
      : how;
  } else if (ex.type === "midi-scale") {
    instruction = tf(
      "Starte auf {root} und spiele alle {n} Töne aufwärts.",
      "Start on {root} and play all {n} notes upward.",
      { root: task.rootName, n: task.scaleIntervals.length }
    );
  }
  document.getElementById("stageFunctionText").textContent = instruction;
}

function renderMidiPlayPad(ex = state?.currentExercise) {
  const wrap = document.getElementById("midiPlayPadWrap");
  if (!wrap) return;
  if (!ex || !ex.midiTask || !isMidiPlayMode(ex.type)) {
    wrap.classList.add("hidden");
    wrap.innerHTML = "";
    return;
  }

  wrap.classList.remove("hidden");
  const task = ex.midiTask;
  const isExam = Boolean(state?.exam?.active);
  const isBlindExam = isExam && state.exam.feedbackMode === "blind";
  const connected = typeof isMidiConnected === "function" && isMidiConnected();
  const enabled = typeof isMidiEnabled === "function" && isMidiEnabled();
  wrap.classList.toggle("has-screen-kb", !connected);

  let statusPillHtml = "";
  if (connected) {
    const devs = typeof getSelectedMidiDevices === "function" ? getSelectedMidiDevices() : [];
    const devName = devs[0]?.name || "MIDI";
    statusPillHtml = `<span class="midi-pad-conn is-connected"><span class="midi-dot" aria-hidden="true"></span>${escapeHtml(devName)}</span>`;
  } else {
    statusPillHtml = `
      <button type="button" class="midi-pad-conn is-disconnected" data-midi-pad-action="setup">
        <span class="midi-dot" aria-hidden="true"></span>
        <span>${escapeHtml(enabled ? tr("Warte auf MIDI-Gerät …", "Waiting for MIDI device …") : tr("MIDI verbinden …", "Connect MIDI …"))}</span>
      </button>
    `;
  }

  let bodyHtml = "";
  if (ex.type === "midi-interval") {
    if (connected) {
      const rootLbl = task.rootLabel || formatMidiNoteDisplay(task.rootMidi);
      const revealTarget = !isExam && (_midiPlay.showSolutionHint || ex.isSolved)
        || (isExam && !isBlindExam && state.exam.currentAnswered);
      const hintText = revealTarget
        ? `${rootLbl} → ${task.targetLabel || formatMidiNoteDisplay(task.targetMidi)}`
        : `${rootLbl} → ?`;
      const lastText = _midiPlay.lastPlayedMidi !== null
        ? tf("Zuletzt: {note}", "Last: {note}", { note: formatMidiNoteDisplay(_midiPlay.lastPlayedMidi) })
        : tr("Warte auf Taste …", "Waiting for key …");
      bodyHtml = `
        <div class="midi-pad-pills-row">
          <span class="midi-pad-pill is-root">${escapeHtml(hintText)}</span>
          <span class="midi-pad-pill">${escapeHtml(lastText)}</span>
        </div>
      `;
    }
  } else if (ex.type === "midi-chord") {
    const held = getMidiPlayActiveChordNotes();
    const total = task.targetMidis.length;
    const revealNotes = (!isExam && (_midiPlay.showSolutionHint || ex.isSolved))
      || (isExam && !isBlindExam && state.exam.currentAnswered);
    const res = isExam ? null : evaluateMidiChordAttempt(task, held);
    const dots = Array.from({ length: total }, (_, idx) => {
      const hintNote = revealNotes ? formatMidiNoteDisplay(task.targetMidis[idx]) : (idx + 1);
      if (isExam) {
        const recorded = idx < held.length;
        return `<span class="midi-step-dot${recorded ? " is-recorded" : ""}">${escapeHtml(String(hintNote))}</span>`;
      }
      const filled = ex.isSolved || (res && idx < res.matchedCount);
      return `<span class="midi-step-dot${filled ? " is-done" : ""}">${escapeHtml(String(hintNote))}</span>`;
    }).join("");
    const heldLabel = held.length > 0
      ? held.map(formatMidiNoteDisplay).join(" · ")
      : tr("Greife den Akkord …", "Hold the chord …");
    bodyHtml = `
      <div class="midi-pad-steps-row">${dots}</div>
      ${connected ? `<div class="midi-pad-live-line">${escapeHtml(heldLabel)}</div>` : ""}
    `;
  } else if (ex.type === "midi-scale") {
    const cur = task.currentStep || 0;
    const stepsHtml = task.scaleNoteNames.map((nm, idx) => {
      if (isExam) {
        const rec = _midiPlay.examScaleSteps[idx] || null;
        const active = !state.exam.currentAnswered && idx === cur;
        let cls = "";
        let label = idx === 0 ? nm : "•";
        if (rec) {
          if (isBlindExam) {
            cls = " is-recorded";
            label = formatMidiNoteDisplay(rec.playedMidi).replace(/\d+$/, "");
          } else {
            cls = rec.ok ? " is-done" : " is-wrong";
            label = nm;
          }
        } else if (!isBlindExam && state.exam.currentAnswered) {
          label = nm;
        }
        return `<span class="midi-step-dot${cls}${active ? " is-current" : ""}">${escapeHtml(label)}</span>`;
      }
      const done = ex.isSolved || idx < cur;
      const active = !ex.isSolved && idx === cur;
      const showName = done || idx === 0 || _midiPlay.showSolutionHint;
      return `<span class="midi-step-dot${done ? " is-done" : ""}${active ? " is-current" : ""}">${escapeHtml(showName ? nm : "•")}</span>`;
    }).join("");
    bodyHtml = `<div class="midi-pad-steps-row is-scale">${stepsHtml}</div>`;
  }

  let actionsHtml = "";
  if (isExam) {
    if (ex.type === "midi-chord" && !connected && !state.exam.currentAnswered) {
      const canSubmit = _midiPlay.fallbackSelectedMidis.size > 0;
      actionsHtml = `<button type="button" class="btn-primary-action midi-pad-btn" data-midi-pad-action="submit-chord"${canSubmit ? "" : " disabled"}>${escapeHtml(tr("Antwort prüfen", "Check Answer"))}</button>`;
    }
  } else {
    actionsHtml = `
      <button type="button" class="btn-tool midi-pad-btn" data-midi-pad-action="hint">${escapeHtml(tr("Lösung", "Solution"))}</button>
      ${ex.isSolved ? `<button type="button" class="btn-primary-action midi-pad-btn" data-midi-pad-action="next">${escapeHtml(tr("Weiter", "Next"))}</button>` : ""}
    `;
  }

  wrap.innerHTML = `
    <div class="midi-pad-card">
      <div class="midi-pad-top">
        ${statusPillHtml}
        ${actionsHtml ? `<div class="midi-pad-mini-actions">${actionsHtml}</div>` : ""}
      </div>
      ${bodyHtml ? `<div class="midi-pad-body">${bodyHtml}</div>` : ""}
    </div>
  `;

  wrap.querySelectorAll("[data-midi-pad-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const act = btn.dataset.midiPadAction;
      if (act === "setup") {
        if (typeof openSettingsModal === "function") openSettingsModal("midi");
      } else if (act === "hint") {
        playMidiPlaySolution(ex);
      } else if (act === "next") {
        generateExercise();
      } else if (act === "submit-chord") {
        submitMidiPlayExamChord();
      }
    });
  });

  if (typeof queueFitExerciseLayout === "function") queueFitExerciseLayout(false);
}

function syncMidiPlayPadUI() {
  if (state?.currentView === "exercise" && state?.currentExercise && isMidiPlayMode(state.currentExercise.type)) {
    const ex = state.currentExercise;
    renderMidiPlayPad(ex);
    syncMidiDirChip();
    // Gerät verbunden/getrennt: Bildschirm-Klaviatur ein- bzw. ausblenden
    const wantKb = !(typeof isMidiConnected === "function" && isMidiConnected());
    if (wantKb !== _midiPlay.fallbackKbShown || _midiPlay.fallbackKbEx !== ex) {
      renderMidiPlayFallbackKeyboard(ex);
      if (!ex.isSolved && _midiPlay.lastPlayedMidi === null && _midiPlay.fallbackSelectedMidis.size === 0) syncMidiPlayStage(ex);
    }
  }
}

// ---------- Bildschirm-Klaviatur (Rückfall ohne MIDI-Gerät) ----------

/**
 * Tastenbereich der Bildschirm-Klaviatur je Aufgabe (reine Funktion, testbar).
 * Intervall: Ausgangston bis zum größten Intervall der Stufe (mind. Oktave) in Spielrichtung, Tonleiter: Grundton bis Oktave,
 * Akkord: je 5 Halbtöne unter dem tiefsten und über dem höchsten Akkordton (andere Lagen bleiben greifbar).
 * Liefert { lo, hi } (Aufgaben-Spanne) und { firstWhite, lastWhite } (volle äußere weiße Tasten ohne ausgegraute Rahmentasten).
 */
function getMidiPlayFallbackRange(ex) {
  const task = ex?.midiTask;
  if (!task) return null;
  let lo;
  let hi;
  if (ex.type === "midi-interval") {
    const root = Math.round(Number(task.rootMidi));
    // Spannweite = größtes Intervall der Stufe (bis zur großen None), damit der Zielton nicht aus der Lage verrät
    const poolSemis = (Array.isArray(ex.choices) ? ex.choices : [])
      .map(k => (typeof HARMONIC_DATA !== "undefined" ? Number(HARMONIC_DATA.intervals?.[k]?.semitones) : NaN))
      .filter(Number.isFinite);
    const span = Math.max(12, Math.abs(Number(task.targetMidi) - root), ...poolSemis);
    if (Number(task.directionSign) < 0) {
      lo = root - span;
      hi = root;
    } else {
      lo = root;
      hi = root + span;
    }
  } else if (ex.type === "midi-scale") {
    lo = Math.round(Number(task.rootMidi));
    hi = lo + Math.max(12, ...task.scaleIntervals.map(Number));
  } else {
    // Je 5 Halbtöne Luft: so lässt sich jeder Akkordton auch eine Oktave versetzt greifen,
    // die Klaviatur verrät also nicht, welche Umkehrung gesucht ist
    const mids = task.targetMidis.map(Number);
    lo = Math.min(...mids) - 5;
    hi = Math.max(...mids) + 5;
  }
  const isWhite = (m) => [0, 2, 4, 5, 7, 9, 11].includes(((m % 12) + 12) % 12);
  let firstWhite = lo;
  while (!isWhite(firstWhite)) firstWhite--;
  let lastWhite = hi;
  while (!isWhite(lastWhite)) lastWhite++;
  return { lo, hi, firstWhite, lastWhite };
}

function getMidiKeyboardBlackLabel(pc) {
  const norm = ((pc % 12) + 12) % 12;
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  if (useIntl) {
    return { 1: "C♯", 3: "E♭", 6: "F♯", 8: "A♭", 10: "B♭" }[norm] || "";
  }
  return { 1: "Cis", 3: "Es", 6: "Fis", 8: "As", 10: "B" }[norm] || "";
}

function renderMidiPlayFallbackKeyboard(ex = state?.currentExercise) {
  const wrap = document.getElementById("solfegeKeyboardWrap");
  if (!wrap) return;
  const connected = typeof isMidiConnected === "function" && isMidiConnected();
  const show = Boolean(ex && ex.midiTask && isMidiPlayMode(ex.type) && !connected);
  if (ex && ex.midiTask && isMidiPlayMode(ex.type)) {
    const promptEl = document.getElementById("inputPromptText");
    if (promptEl) promptEl.textContent = getMidiPlayInputPrompt(ex.type);
  }
  _midiPlay.fallbackKbShown = show;
  _midiPlay.fallbackKbEx = ex || null;
  document.getElementById("midiPlayPadWrap")?.classList.toggle("has-screen-kb", show);
  if (!show) {
    if (wrap.classList.contains("is-midi-fallback")) {
      wrap.classList.add("hidden");
      wrap.classList.remove("is-midi-fallback");
      wrap.innerHTML = "";
      if (typeof queueFitExerciseLayout === "function") queueFitExerciseLayout(true);
    }
    return;
  }

  const range = getMidiPlayFallbackRange(ex);
  if (!range) return;
  wrap.classList.remove("is-notation");
  wrap.classList.add("is-midi-fallback");
  wrap.classList.remove("hidden");

  const rootMidi = ex.type === "midi-chord" ? null : Math.round(Number(ex.midiTask.rootMidi));
  const rootShortLabel = ex.midiTask.rootLabel
    ? String(ex.midiTask.rootLabel).replace(/\d+$/, "")
    : (ex.midiTask.rootName || "");
  const whiteKeys = [];
  const blackKeys = [];
  for (let m = range.firstWhite; m <= range.lastWhite; m++) {
    const pc = ((m % 12) + 12) % 12;
    const oct = Math.floor(m / 12) - 1;
    if (isWhiteMidi(m)) {
      whiteKeys.push({
        midi: m,
        pc,
        label: pc === 0 ? `${getWhiteNoteLabel(pc)}${oct}` : getWhiteNoteLabel(pc)
      });
    } else {
      blackKeys.push({
        midi: m,
        pc,
        afterWhiteIdx: whiteKeys.length - 1,
        label: (m === rootMidi && rootShortLabel) ? rootShortLabel : getMidiKeyboardBlackLabel(pc)
      });
    }
  }

  const isDense = whiteKeys.length > 10;
  const kb = document.createElement("div");
  kb.className = `piano-keyboard midi-fallback-kb${isDense ? " is-dense" : ""}`;
  const whiteKeyEls = [];
  const blackKeyEls = [];
  const bindKey = (el, midi) => {
    el.addEventListener("click", () => handleMidiPlayFallbackKeyTap(midi, el));
  };

  whiteKeys.forEach(wk => {
    const keyBtn = document.createElement("button");
    keyBtn.type = "button";
    const isRoot = wk.midi === rootMidi;
    const isC = wk.pc === 0;
    keyBtn.className = `piano-white-key piano-key-scale${isC ? " is-c-key" : ""}${isRoot ? " is-root-key" : ""}`;
    keyBtn.dataset.midi = wk.midi;
    keyBtn.setAttribute("aria-label", formatMidiNoteDisplay(wk.midi));

    const hint = document.createElement("span");
    hint.className = "piano-note-hint";
    hint.textContent = wk.label;
    keyBtn.appendChild(hint);

    bindKey(keyBtn, wk.midi);
    whiteKeyEls.push(keyBtn);
    kb.appendChild(keyBtn);
  });

  blackKeys.forEach(bk => {
    const blackEl = document.createElement("button");
    blackEl.type = "button";
    const isRoot = bk.midi === rootMidi;
    blackEl.className = `piano-black-key key-in-scale${isRoot ? " is-root-key" : ""}`;
    blackEl.dataset.midi = bk.midi;
    blackEl.setAttribute("aria-label", formatMidiNoteDisplay(bk.midi));

    if ((!isDense || isRoot) && bk.label) {
      const lbl = document.createElement("span");
      lbl.className = "piano-black-label";
      lbl.textContent = bk.label;
      blackEl.appendChild(lbl);
    }

    bindKey(blackEl, bk.midi);
    blackKeyEls.push(blackEl);
    kb.appendChild(blackEl);
  });

  applyPianoKeyboardGeometry(whiteKeyEls, whiteKeys, blackKeyEls, blackKeys);
  wrap.innerHTML = "";
  wrap.appendChild(kb);
  syncMidiPlayFallbackKeyboardMarks(ex);
  if (typeof queueFitExerciseLayout === "function") queueFitExerciseLayout(false);
}

// Markiert angewählte Akkordtöne bzw. bereits gespielte Tonleiter-Töne
function syncMidiPlayFallbackKeyboardMarks(ex = state?.currentExercise) {
  const wrap = document.getElementById("solfegeKeyboardWrap");
  if (!wrap || !wrap.classList.contains("is-midi-fallback") || !ex?.midiTask) return;
  const task = ex.midiTask;
  const isExam = Boolean(state?.exam?.active);
  const isBlindExam = isExam && state.exam.feedbackMode === "blind";
  const doneMidis = new Set();
  const recordedMidis = new Set();
  if (ex.type === "midi-scale") {
    if (isExam) {
      _midiPlay.examScaleSteps.forEach(s => {
        if (isBlindExam) recordedMidis.add(s.playedMidi);
        else if (s.ok) doneMidis.add(s.playedMidi);
      });
    } else if (Number.isFinite(Number(task.anchorMidi))) {
      const anchor = Number(task.anchorMidi);
      for (let i = 0; i < (task.currentStep || 0); i++) doneMidis.add(anchor + Number(task.scaleIntervals[i]));
    }
  }
  wrap.querySelectorAll("[data-midi]").forEach(el => {
    const m = parseInt(el.dataset.midi, 10);
    const isSel = (ex.type === "midi-chord" && _midiPlay.fallbackSelectedMidis.has(m)) || recordedMidis.has(m);
    el.classList.toggle("is-selected", isSel);
    el.classList.toggle("is-done", doneMidis.has(m));
  });
}

function handleMidiPlayFallbackKeyTap(midi, keyEl) {
  const ex = state?.currentExercise;
  if (!ex || !ex.midiTask || !isMidiPlayMode(ex.type)) return;
  if (ex.type === "midi-chord") {
    toggleMidiPlayFallbackChordNote(midi);
    return;
  }
  const isExam = Boolean(state?.exam?.active);
  const res = handleMidiPlayNoteOn(midi, 96, { fromScreen: true });
  if (!res || !keyEl) return;
  if (isExam) {
    // Im Blind-Modus kein richtig/falsch aufblitzen; bei abgeschlossener Frage markiert js/exam.js dauerhaft
    if (state.exam.feedbackMode === "blind") {
      keyEl.classList.add("key-exam-recorded");
      setTimeout(() => keyEl.classList.remove("key-exam-recorded"), 260);
    } else if (!state.exam.currentAnswered) {
      const cls = res.ok ? "key-correct" : "key-wrong";
      keyEl.classList.add(cls);
      setTimeout(() => keyEl.classList.remove(cls), 320);
    }
    return;
  }
  const cls = res.ok ? "key-correct" : "key-wrong";
  keyEl.classList.add(cls);
  setTimeout(() => keyEl.classList.remove(cls), 320);
}

