// =====================================================
// AKTIVE MIDI-SPIELÜBUNGEN (js/midi-play.js)
// Phase-2-Unterübungen direkt im jeweiligen Themengebiet:
//  - „Intervalle spielen“        (midi-interval, Kategorie Intervalle)
//  - „Akkorde greifen“           (midi-chord,    Kategorie Akkorde)
//  - „Tonleitern & Modi spielen“ (midi-scale,    Kategorie Tonleitern & Modi)
// Lauscher gibt Grundton und Ziel vor, du spielst die Antwort direkt
// auf deinem MIDI-Instrument (mit Bildschirm-Rückfall ohne Gerät).
// =====================================================

const MIDI_PLAY_CONFIG = Object.freeze({
  autoNextDelayMs: 1450
});

const _midiPlay = {
  autoNextTimer: 0,
  lastPlayedMidi: null,
  fallbackSelectedMidis: new Set(),
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
function evaluateMidiScaleStep(task, stepIdx, playedMidi, anchorMidi = null) {
  const pMidi = Math.round(Number(playedMidi));
  if (!task || !Array.isArray(task.scaleIntervals) || stepIdx < 0 || stepIdx >= task.scaleIntervals.length) {
    return { ok: false, status: "wrong", nextAnchorMidi: anchorMidi, expectedMidi: null, expectedPc: null, playedMidi: pMidi };
  }
  const rootPc = ((Math.round(Number(task.rootPc)) % 12) + 12) % 12;
  const interval = Math.round(Number(task.scaleIntervals[stepIdx]));
  const expectedPc = ((rootPc + interval) % 12 + 12) % 12;
  const playedPc = ((pMidi % 12) + 12) % 12;

  if (stepIdx === 0) {
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

// ---------- Texte & Zusammenfassungen ----------

function getMidiPlayModeTitle(mode) {
  if (mode === "midi-chord") return tr("Akkorde greifen", "Play Chords");
  if (mode === "midi-scale") return tr("Tonleitern & Modi spielen", "Play Scales & Modes");
  return tr("Intervalle spielen", "Play Intervals");
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
}

function resetMidiPlayRuntimeState() {
  cancelMidiPlayTimers();
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

  if (state.settings.autoNextAfterCorrect) {
    _midiPlay.autoNextTimer = setTimeout(() => {
      if (state.currentView === "exercise" && state.currentExercise === ex && ex.isSolved) {
        generateExercise();
      }
    }, MIDI_PLAY_CONFIG.autoNextDelayMs);
  }
}

function handleMidiPlayNoteOn(midi, velocity = 90) {
  const ex = state?.currentExercise;
  if (!ex || !ex.midiTask || !isMidiPlayMode(ex.type)) return;

  playMidiAppTone(midi, velocity, 0.85);
  _midiPlay.lastPlayedMidi = midi;

  if (ex.isSolved) return;

  const task = ex.midiTask;

  // 1) Intervalle spielen
  if (ex.type === "midi-interval") {
    const res = evaluateMidiIntervalAttempt(task, midi);
    if (res.ok) {
      const targetLbl = formatMidiNoteDisplay(task.targetMidi);
      handleMidiPlaySolved(
        ex,
        `${task.intervalName} ✓`,
        `${formatMidiNoteDisplay(task.rootMidi)} → ${targetLbl}`
      );
      return;
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
          { dir: task.directionArrow, root: formatMidiNoteDisplay(task.rootMidi) }
        );
      } else {
        const playedName = describePlayedIntervalFromSemis(res.playedSemis);
        document.getElementById("stageSubtext").textContent = tr("NOCH NICHT GANZ", "NOT QUITE");
        document.getElementById("stageMainText").textContent = `${formatMidiNoteDisplay(midi)} (${playedName})`;
        document.getElementById("stageFunctionText").textContent = tf(
          "Gesucht: {name} {arrow} ab {root}",
          "Target: {name} {arrow} from {root}",
          { name: task.intervalName, arrow: task.directionArrow, root: formatMidiNoteDisplay(task.rootMidi) }
        );
      }
    }
    renderMidiPlayPad(ex);
    return;
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
      return;
    }

    if (document.getElementById("centralStageCard")) {
      if (res.status === "wrong-bass") {
        if (typeof resetExerciseStreakOnAttempt === "function") resetExerciseStreakOnAttempt(ex);
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
        if (typeof resetExerciseStreakOnAttempt === "function") resetExerciseStreakOnAttempt(ex);
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
        document.getElementById("stageFunctionText").textContent = tr("Halte alle Akkordtöne gleichzeitig gedrückt!", "Hold all chord tones together!");
      }
    }
    renderMidiPlayPad(ex);
    return;
  }

  // 3) Tonleitern & Modi spielen
  if (ex.type === "midi-scale") {
    const stepIdx = task.currentStep || 0;
    const res = evaluateMidiScaleStep(task, stepIdx, midi, task.anchorMidi);

    if (res.ok) {
      task.anchorMidi = res.nextAnchorMidi;
      task.currentStep = stepIdx + 1;

      if (task.currentStep >= task.scaleIntervals.length) {
        handleMidiPlaySolved(
          ex,
          `${task.scaleTitle} ✓`,
          task.scaleNoteNames.join(" – ")
        );
        return;
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
      return;
    }

    if (typeof resetExerciseStreakOnAttempt === "function") resetExerciseStreakOnAttempt(ex);
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
  }
}

function handleMidiPlayNoteOff(midi) {
  const ex = state?.currentExercise;
  if (!ex || ex.type !== "midi-chord" || ex.isSolved) return;
  renderMidiPlayPad(ex);
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

  setCentralStageMode("stage-target");
  updateStageMascot("awaiting");

  if (ex.type === "midi-interval") {
    document.getElementById("stageSubtext").textContent = tf("GRUNDTON: {root}", "ROOT NOTE: {root}", {
      root: formatMidiNoteDisplay(task.rootMidi)
    });
    document.getElementById("stageMainText").textContent = `${task.intervalName} ${task.directionArrow}`;
    document.getElementById("stageFunctionText").textContent = tr(
      "Spiele den Zielton auf deinem MIDI-Keyboard!",
      "Play the target note on your MIDI keyboard!"
    );
  } else if (ex.type === "midi-chord") {
    document.getElementById("stageSubtext").textContent = task.requireBassPc !== null
      ? tf("UMKEHRUNG • BASS: {bass}", "INVERSION • BASS: {bass}", { bass: task.expectedBassName })
      : tr("AKKORD GREIFEN", "PLAY CHORD");
    document.getElementById("stageMainText").textContent = task.chordLabel;
    document.getElementById("stageFunctionText").textContent = task.inversionDesc
      ? `${task.inversionDesc} – ${tr("halte alle Töne gleichzeitig gedrückt", "hold all notes together")}`
      : tr("Greife alle Akkordtöne gleichzeitig auf deinem MIDI-Keyboard!", "Hold all chord tones together on your MIDI keyboard!");
  } else if (ex.type === "midi-scale") {
    document.getElementById("stageSubtext").textContent = tr("TONLEITER AUFWÄRTS SPIELEN", "PLAY SCALE ASCENDING");
    document.getElementById("stageMainText").textContent = task.scaleTitle;
    document.getElementById("stageFunctionText").textContent = tf(
      "Starte auf {root} und spiele alle {n} Töne aufwärts.",
      "Start on {root} and play all {n} notes upward.",
      { root: task.rootName, n: task.scaleIntervals.length }
    );
  }
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
  const connected = typeof isMidiConnected === "function" && isMidiConnected();
  const enabled = typeof isMidiEnabled === "function" && isMidiEnabled();

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
    const hintText = _midiPlay.showSolutionHint || ex.isSolved
      ? `${formatMidiNoteDisplay(task.rootMidi)} → ${formatMidiNoteDisplay(task.targetMidi)}`
      : `${formatMidiNoteDisplay(task.rootMidi)} → ?`;
    const lastText = _midiPlay.lastPlayedMidi !== null
      ? tf("Zuletzt: {note}", "Last: {note}", { note: formatMidiNoteDisplay(_midiPlay.lastPlayedMidi) })
      : tr("Warte auf Taste …", "Waiting for key …");
    bodyHtml = `
      <div class="midi-pad-pills-row">
        <span class="midi-pad-pill is-root">${escapeHtml(hintText)}</span>
        <span class="midi-pad-pill">${escapeHtml(lastText)}</span>
      </div>
    `;
  } else if (ex.type === "midi-chord") {
    const held = getMidiPlayActiveChordNotes();
    const res = evaluateMidiChordAttempt(task, held);
    const total = task.targetMidis.length;
    const dots = Array.from({ length: total }, (_, idx) => {
      const filled = ex.isSolved || idx < res.matchedCount;
      const hintNote = (_midiPlay.showSolutionHint || ex.isSolved) ? formatMidiNoteDisplay(task.targetMidis[idx]) : (idx + 1);
      return `<span class="midi-step-dot${filled ? " is-done" : ""}">${escapeHtml(String(hintNote))}</span>`;
    }).join("");
    const heldLabel = held.length > 0
      ? held.map(formatMidiNoteDisplay).join(" · ")
      : tr("Greife den Akkord …", "Hold the chord …");
    bodyHtml = `
      <div class="midi-pad-steps-row">${dots}</div>
      <div class="midi-pad-live-line">${escapeHtml(heldLabel)}</div>
    `;
  } else if (ex.type === "midi-scale") {
    const cur = task.currentStep || 0;
    const stepsHtml = task.scaleNoteNames.map((nm, idx) => {
      const done = ex.isSolved || idx < cur;
      const active = !ex.isSolved && idx === cur;
      const showName = done || idx === 0 || _midiPlay.showSolutionHint;
      return `<span class="midi-step-dot${done ? " is-done" : ""}${active ? " is-current" : ""}">${escapeHtml(showName ? nm : "•")}</span>`;
    }).join("");
    bodyHtml = `<div class="midi-pad-steps-row is-scale">${stepsHtml}</div>`;
  }

  wrap.innerHTML = `
    <div class="midi-pad-card">
      <div class="midi-pad-top">
        ${statusPillHtml}
        <div class="midi-pad-mini-actions">
          <button type="button" class="btn-tool midi-pad-btn" data-midi-pad-action="root">${escapeHtml(tr("Grundton", "Root"))}</button>
          <button type="button" class="btn-tool midi-pad-btn" data-midi-pad-action="hint">${escapeHtml(tr("Lösung", "Hint"))}</button>
          ${ex.isSolved ? `<button type="button" class="btn-primary-action midi-pad-btn" data-midi-pad-action="next">${escapeHtml(tr("Weiter", "Next"))}</button>` : ""}
        </div>
      </div>
      <div class="midi-pad-body">
        ${bodyHtml}
      </div>
    </div>
  `;

  wrap.querySelectorAll("[data-midi-pad-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const act = btn.dataset.midiPadAction;
      if (act === "setup") {
        if (typeof openSettingsModal === "function") openSettingsModal("midi");
      } else if (act === "root") {
        playMidiPlayPrompt(ex);
      } else if (act === "hint") {
        playMidiPlaySolution(ex);
      } else if (act === "next") {
        generateExercise();
      }
    });
  });

  if (typeof queueFitExerciseLayout === "function") queueFitExerciseLayout(false);
}

function syncMidiPlayPadUI() {
  if (state?.currentView === "exercise" && state?.currentExercise && isMidiPlayMode(state.currentExercise.type)) {
    renderMidiPlayPad(state.currentExercise);
    syncMidiDirChip();
  }
}
