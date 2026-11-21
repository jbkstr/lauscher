/**
 * Lauscher • Antwort-Auswertung (handleAnswer), Rhythmus-Tap, Nur-Hören & Audio-Wiedergabe (playSequence)
 */

function handleAnswer(selectedKey, btnElement, options = {}) {
  const ex = state.currentExercise;
  if (!ex) return;
  const capturedInputPoint = resolveInputPointFromOptions(options);

  if (ex.type === "rhythm-dictation") {
    return handleRhythmDictationChoice(selectedKey, btnElement, { ...options, inputPoint: capturedInputPoint });
  }
  if (ex.isChordReading) {
    return handleNotationChordChoice(selectedKey, btnElement, { ...options, inputPoint: capturedInputPoint });
  }
  if (state.exam?.active) {
    handleExamChoiceAnswer(ex, selectedKey, btnElement);
    return;
  }
  if (ex.isSolved) return;

  const isListenOnly = Boolean(options.fromListenOnly && state.listenOnly?.active);
  const listenOnlyToken = isListenOnly ? state.listenOnly.token : null;
  if (!options.fromListenOnly && state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }

  const isCorrect = selectedKey === ex.targetItem.key;
  if (!isListenOnly) noteSessionReviewAnswer(ex, isCorrect);

  if (isCorrect) {
    ex.isSolved = true;
    state.exerciseSolved = true;
    if (isListenOnly) {
      state.listenOnly.phase = "reveal";
    }
    // Wenn Auto-Weiter, Loop oder Nur-Hören aktiv ist, nach richtiger Antwort automatisch nächste Abfrage starten
    const shouldAutoContinue = isListenOnly || state.settings.autoNextAfterCorrect || state.settings.loop;
    audioEngine.stopPlayback();
    state.isPlaying = false;
    updatePlayButtonUI(false);

    btnElement?.classList.add("btn-correct");
    const streakRes = isListenOnly
      ? { count: state.streakState?.count || 0, isMilestone: false }
      : recordExerciseStreakSuccess(ex);
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    if (!isListenOnly) {
      triggerCelebrationFeedback(btnElement, { isMilestone: streakRes.isMilestone, inputPoint: capturedInputPoint });
    }
    document.getElementById("stageSubtext").textContent = getPersonalizedCorrectStageSubtext(tr("RICHTIG!", "CORRECT!"));
    document.getElementById("stageMainText").textContent = ex.targetItem.roman || ex.targetItem.symbol;
    document.getElementById("stageFunctionText").textContent = ex.targetItem.label;

    const revealAllNonRef = ex.type === "rhythm-meter" ||
      (ex.type === "rhythm-groove" && ex.grooveKind === "style");
    ex.bars.forEach((bar, i) => {
      if (i === ex.targetIndex || (revealAllNonRef && bar.key !== "ref")) {
        const card = document.getElementById(`barCard_${i}`);
        if (card) {
          card.querySelector(".bar-roman").textContent = ex.targetItem.displayMain || ex.targetItem.roman || ex.targetItem.symbol;
          card.querySelector(".bar-label").textContent = ex.type === "chord-inversions" ? (bar.short || ex.targetItem.short) : ex.targetItem.short;
          card.classList.remove("bar-target");
          card.classList.add("bar-active");
        }
      }
    });

    const advanceToNextExercise = () => {
      if (state.currentView !== "exercise") return;
      if (isListenOnly) {
        if (!state.listenOnly.active || state.listenOnly.token !== listenOnlyToken) return;
        generateExercise();
        startListenOnlyCycle();
        return;
      }
      generateExercise();
      if (shouldAutoContinue) {
        playSequence();
      }
    };

    const runAudioRevealOrAdvance = (revealPlaybackId, startAudioRevealFn, onFallbackAdvance) => {
      if (audioEngine.isInitialized) {
        startAudioRevealFn();
        return;
      }
      ensureAudioReady().then(() => {
        if (audioEngine.playbackId !== revealPlaybackId || state.currentView !== "exercise") return;
        if (audioEngine.isInitialized) {
          startAudioRevealFn();
        } else {
          onFallbackAdvance();
        }
      }).catch(() => {
        if (audioEngine.playbackId === revealPlaybackId) {
          onFallbackAdvance();
        }
      });
    };

    const isProdReveal = ex.type === "prod-eq-noise" || ex.type === "prod-tone";
    const listenOnlyPostRevealMs = isProdReveal ? LISTEN_ONLY_PROD_POST_REVEAL_MS : LISTEN_ONLY_POST_REVEAL_MS;

    const scheduleSimpleRevealAdvance = (delayPlaybackId, delayMs = 1050) => {
      if (isListenOnly) {
        scheduleListenOnlyStep(advanceToNextExercise, listenOnlyPostRevealMs, listenOnlyToken);
      } else {
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== delayPlaybackId) return;
          advanceToNextExercise();
        }, delayMs);
      }
    };

    const chordNotes = (ex.type === "interval-chords" || ex.type === "chord-inversions") && Array.isArray(ex.targetItem?.notes)
      ? ex.targetItem.notes
      : null;
    const arpBlockNotes = isChordArpeggioMode(ex.type) && Array.isArray(ex.targetItem?.notes)
      ? ex.targetItem.notes
      : null;

    if (chordNotes && chordNotes.length > 0) {
      const { stepMs, noteDurSec, lastNoteDurSec, nextExerciseDelayMs } = getChordArpeggioTiming(
        chordNotes.length,
        state.activeBpm
      );
      const arpeggioPlaybackId = audioEngine.playbackId;
      runAudioRevealOrAdvance(
        arpeggioPlaybackId,
        () => {
          if (!audioEngine.isInitialized || audioEngine.playbackId !== arpeggioPlaybackId) return;
          chordNotes.forEach((note, idx) => {
            const isLast = idx === chordNotes.length - 1;
            const noteDur = isLast ? lastNoteDurSec : noteDurSec;
            const delayMs = idx * stepMs;
            if (delayMs === 0) {
              audioEngine.playStep([note], noteDur, null, "interval");
            } else {
              audioEngine.registerTimer(() => {
                if (audioEngine.playbackId !== arpeggioPlaybackId || state.currentView !== "exercise") return;
                audioEngine.playStep([note], noteDur, null, "interval");
              }, delayMs);
            }
          });
          audioEngine.registerTimer(() => {
            if (audioEngine.playbackId !== arpeggioPlaybackId) return;
            advanceToNextExercise();
          }, nextExerciseDelayMs);
        },
        () => scheduleSimpleRevealAdvance(arpeggioPlaybackId, 1050)
      );
    } else if (arpBlockNotes && arpBlockNotes.length > 0) {
      const confirmPlaybackId = audioEngine.playbackId;
      const blockDurSec = Math.max(0.85, Math.min(1.4, (60 / (state.activeBpm || 90)) * 1.4));
      runAudioRevealOrAdvance(
        confirmPlaybackId,
        () => {
          if (!audioEngine.isInitialized || audioEngine.playbackId !== confirmPlaybackId) return;
          audioEngine.playStep(arpBlockNotes, blockDurSec, null, "cadence");
          scheduleSimpleRevealAdvance(confirmPlaybackId, 1150);
        },
        () => scheduleSimpleRevealAdvance(confirmPlaybackId, 1050)
      );
    } else if (isListenOnly) {
      scheduleListenOnlyStep(advanceToNextExercise, listenOnlyPostRevealMs, listenOnlyToken);
    } else {
      setTimeout(advanceToNextExercise, 1050);
    }

  } else {
    if (!isListenOnly) resetExerciseStreakOnAttempt(ex);
    btnElement.classList.add("btn-wrong");
    state.lastAnswerWasWrong = true;
    const chosenDef = getChoiceItem(ex.type, selectedKey);
    state.wrongAnswerData = { chosen: chosenDef, target: ex.targetItem };

    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tr("KNAPP DANEBEN", "NOT QUITE");
    document.getElementById("stageMainText").textContent = getPersonalizedWrongStageMainText(tr("Vergleichen hilft", "Compare Both"));
    const isRhythmWrong = ex.type.startsWith("rhythm-");
    const isProdWrong = ex.type.startsWith("prod-");
    const isModesWrong = ex.type.startsWith("modes-");
    document.getElementById("stageFunctionText").textContent = isRhythmWrong
      ? tr("Hör dir beide Rhythmen direkt nacheinander an:", "Hear both rhythms back-to-back:")
      : (isProdWrong
          ? tr("Vergleiche deine Wahl direkt mit der Ziel-Frequenz:", "Compare your pick directly with the target frequency:")
          : (isModesWrong
              ? tr("Vergleiche beide Modi über demselben Grundton:", "Compare both modes over the same root:")
              : tr("Hör dir beide Klänge direkt nacheinander an:", "Hear both sounds back-to-back:")));

    renderWrongChoiceFeedbackCard(ex, chosenDef, selectedKey, true);
  }
}

/**
 * Verarbeitet die Auswahl eines Rhythmus-Bausteins im 4-Zählzeiten-Diktat.
 * Bereits gelöste Fragezeichen bleiben erhalten.
 */
async function handleRhythmDictationChoice(cellKey, btnElement, options = {}) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "rhythm-dictation" || state.rhythmDictationCompleted) return;
  const capturedInputPoint = resolveInputPointFromOptions(options);
  if (state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }

  prepareAudioNonBlocking();

  if (state.exam?.active) {
    handleExamRhythmDictationAnswer(ex, cellKey, btnElement);
    return;
  }

  const currentIdx = ex.rhythmStep;
  const slot = ex.rhythmSlots[currentIdx];
  if (!slot) return;

  const isCorrect = cellKey === slot.cellKey;
  if (!isCorrect) {
    resetExerciseStreakOnAttempt(ex);
    btnElement?.classList.add("btn-wrong");
    const chosenCell = getChoiceItem("rhythm-dictation", cellKey);
    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tf("SCHLAG {n} VON 4 • NOCH NICHT", "BEAT {n} OF 4 • NOT QUITE", { n: currentIdx + 1 });
    document.getElementById("stageMainText").textContent = `${chosenCell?.short || cellKey}? ${tr("Nein", "No")}`;
    document.getElementById("stageFunctionText").textContent =
      tr("Tippe weiter oder nutze „Schlag nochmal“ (bzw. das ?-Feld).", "Keep trying or tap “Replay Beat” (or the ? card).");
    return;
  }

  slot.solved = true;
  document.querySelectorAll("#degreeButtonsGrid .degree-btn").forEach(el => {
    el.classList.remove("btn-wrong", "btn-correct");
  });
  btnElement?.classList.add("btn-correct");

  const card = document.getElementById(`barCard_${currentIdx}`);
  if (card) {
    card.className = "bar-card melody-slot-solved rhythm-slot-clickable tile-selected-pulse";
    const romanEl = card.querySelector(".bar-roman");
    const lblEl = card.querySelector(".bar-label");
    if (romanEl) romanEl.innerHTML = getRhythmCellSVG(slot.cellKey, 40, 22);
    if (lblEl) lblEl.textContent = `✓ ${slot.cell.short}`;
  }

  const isLast = currentIdx >= ex.rhythmSlots.length - 1;
  if (!state.isPlaying && slot.cell.offsets.length > 0) {
    const beatMs = 60000 / (state.activeBpm || 90);
    const beatEvents = slot.cell.offsets.map(off => [Math.round(off * beatMs), "clave", 0.92]);
    audioEngine.playRhythmSequence(beatEvents);
  }

  if (!isLast) {
    spawnJuiceBurst(btnElement, { intensity: "micro", inputPoint: capturedInputPoint });
    ex.rhythmStep = currentIdx + 1;
    ex.targetIndex = ex.rhythmStep;
    ex.targetItem = ex.rhythmSlots[ex.rhythmStep].cell;

    const nextIdx = ex.rhythmStep;
    const nextCard = document.getElementById(`barCard_${nextIdx}`);
    if (nextCard) {
      nextCard.classList.remove("melody-slot-pending");
      nextCard.classList.add("bar-target", "rhythm-slot-clickable");
      const nextLbl = nextCard.querySelector(".bar-label");
      if (nextLbl) nextLbl.textContent = tr("Gesucht", "Target");
    }

    const badge = document.getElementById("targetBarBadge");
    if (badge) badge.textContent = tf("Schlag {n} / 4", "Beat {n} / 4", { n: nextIdx + 1 });
    const promptEl = document.getElementById("inputPromptText");
    if (promptEl) promptEl.textContent = tf("Muster für Schlag {step}/4:", "Pattern for beat {step}/4:", { step: nextIdx + 1 }, {
      fr: "Motif pour le temps {step}/4 :",
      es: "Patrón para el pulso {step}/4:",
      pl: "Wzór na miarę {step}/4:",
      uk: "Малюнок для долі {step}/4:",
      ur: "دھڑکن {step}/4 کا نمونہ:"
    });

    if (!state.isPlaying) {
      setCentralStageMode("stage-playing");
      updateStageMascot("happy");
      triggerMascotHappyHop();
      document.getElementById("stageSubtext").textContent = tf("SCHLAG {n} RICHTIG", "BEAT {n} CORRECT", { n: currentIdx + 1 });
      document.getElementById("stageMainText").textContent = slot.cell.short;
      document.getElementById("stageFunctionText").textContent = tf("Jetzt gesucht: Schlag {n} von 4", "Next target: Beat {n} of 4", { n: nextIdx + 1 });
    }

    const clearId = audioEngine.playbackId;
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId === clearId && !state.rhythmDictationCompleted) {
        btnElement?.classList.remove("btn-correct");
      }
    }, 380);
    return;
  }

  // Alle 4 Schläge gelöst -> nächste Aufgabe vorbereiten/starten
  state.rhythmDictationCompleted = true;
  state.exerciseSolved = true;
  ex.isSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  const badge = document.getElementById("targetBarBadge");
  if (badge) badge.textContent = tr("4 / 4 gelöst ✓", "4 / 4 solved ✓");
  const promptEl = document.getElementById("inputPromptText");
  if (promptEl) promptEl.textContent = tr("Alle 4 Zählzeiten gelöst – weiter geht’s!", "All 4 beats solved — moving on!");

  const streakRes = recordExerciseStreakSuccess(ex);
  setCentralStageMode("stage-playing");
  updateStageMascot("happy");
  triggerCelebrationFeedback(btnElement, { isMilestone: streakRes.isMilestone, inputPoint: capturedInputPoint });
  document.getElementById("stageSubtext").textContent = tr("RHYTHMUS GELÖST! (4/4)", "RHYTHM SOLVED! (4/4)");
  document.getElementById("stageMainText").textContent = ex.rhythmSlots.map(s => s.cell.short).join(" • ");
  document.getElementById("stageFunctionText").textContent = tr("Nächste Aufgabe wird geladen…", "Loading next exercise…");

  const completionPlaybackId = audioEngine.playbackId;
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== completionPlaybackId) return;
    if (state.currentView !== "exercise" || state.settings.mode !== "rhythm-dictation") return;
    generateExercise();
    if (state.settings.rhythmDictationAutoNext) {
      playSequence();
    }
  }, 1150);
}

/**
 * Spielt im Rhythmus-Diktat einen einzelnen Schlag mit kurzem Referenz-Vorpuls ab,
 * damit auch Pausen und Offbeats eindeutig einzuordnen sind.
 */
async function repeatRhythmDictationBeat(slotIdx = null) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "rhythm-dictation") return;
  if (state.exam?.active && !tryConsumeExamReplay()) return;
  if (state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }
  const idx = typeof slotIdx === "number" ? slotIdx : ex.rhythmStep;
  const slot = ex.rhythmSlots[idx];
  if (!slot) return;

  await ensureAudioReady();
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  ex.rhythmSlots.forEach((_, i) => {
    document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === idx);
  });

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode(slot.solved ? "stage-playing" : "stage-target");
    updateStageMascot(slot.solved ? "happy" : "question");
    document.getElementById("stageSubtext").textContent = tf("SCHLAG {n} VON 4 (EINZELN)", "BEAT {n} OF 4 (ISOLATED)", { n: idx + 1 });
    document.getElementById("stageMainText").textContent = slot.solved ? slot.cell.short : "?";
    document.getElementById("stageFunctionText").textContent = slot.solved
      ? tf("Gelöstes Muster ({lbl})", "Solved pattern ({lbl})", { lbl: slot.cell.label })
      : tr("Vorpuls + Schlag-Muster + Endpuls", "Lead-in pulse + beat pattern + closing pulse");
  }

  const beatMs = 60000 / (state.activeBpm || 90);
  const events = [
    [0, "tick", 0.56],
    [Math.round(beatMs), idx === 0 ? "accent" : "tick", 0.34]
  ];
  slot.cell.offsets.forEach(off => {
    events.push([Math.round((1 + off) * beatMs), "clave", 0.96]);
  });
  events.push([Math.round(2 * beatMs), "tick", 0.28]);

  audioEngine.playRhythmSequence(events);

  const singlePlaybackId = audioEngine.playbackId;
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== singlePlaybackId) return;
    document.getElementById(`barCard_${idx}`)?.classList.remove("bar-active");
    if (!slot.solved && !state.rhythmDictationCompleted && !state.isPlaying && !state.listenOnly?.active) {
      showAwaitingAnswerStage(ex);
    }
  }, Math.round(2 * beatMs + 140));
}

function getAudioClockSec() {
  if (typeof Tone !== "undefined" && typeof Tone.now === "function") {
    try {
      const t = Tone.now();
      if (Number.isFinite(t)) return t;
    } catch (_) {}
  }
  return Date.now() / 1000;
}

function renderRhythmTapPad() {
  const wrap = document.getElementById("rhythmTapPadWrap");
  const ex = state.currentExercise;
  if (!wrap || !ex || ex.type !== "rhythm-tap") return;

  wrap.innerHTML = `
    <button id="rhythmTapPadBtn" type="button" class="rhythm-tap-pad" aria-label="${tr("Rhythmus-Tap-Pad", "Rhythm Tap Pad")}">
      <div class="rhythm-pad-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="8"/>
          <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>
        </svg>
      </div>
      <div id="rhythmPadTitle" class="rhythm-pad-title">${tr("Bereit zum Klopfen", "Ready to Tap")}</div>
      <div id="rhythmPadSub" class="rhythm-pad-sub">${tr("Tippe „▶ Abspielen“ oder drücke die Leertaste", "Tap “▶ Play” or press Spacebar")}</div>
    </button>
  `;

  const padBtn = document.getElementById("rhythmTapPadBtn");
  if (!padBtn) return;

  let lastPointerDownWallMs = 0;

  padBtn.addEventListener("pointerdown", (e) => {
    const session = state.rhythmTapSession;
    if (!session || session.ended) return;
    lastPointerDownWallMs = Date.now();
    if (session.phase === "listen") {
      e.preventDefault();
      handleRhythmTapInput(null, extractEventInputPoint(e));
    } else if (session.phase === "counting" || session.phase === "demo") {
      e.preventDefault();
      const subEl = document.getElementById("rhythmPadSub");
      if (subEl) subEl.textContent = tr("Noch einen Moment – erst zu Ende hören!", "Hold on — listen to the whole demo first!");
    }
  });

  padBtn.addEventListener("click", (e) => {
    if (Date.now() - lastPointerDownWallMs < 350) return;
    const session = state.rhythmTapSession;
    if (session && !session.ended) {
      if (session.phase === "listen") {
        handleRhythmTapInput(null, extractEventInputPoint(e));
      } else {
        const subEl = document.getElementById("rhythmPadSub");
        if (subEl) subEl.textContent = tr("Noch einen Moment – erst zu Ende hören!", "Hold on — listen to the whole demo first!");
      }
      return;
    }
    if (state.listenOnly?.active) {
      setListenOnlyMode(false, { keepPlayback: true });
    }
    if (state.exam?.active) {
      if (state.exam.currentAnswered) return;
      triggerExamPlayAction();
      return;
    }
    playSequence();
  });
}

async function playRhythmTapDemoOnly(options = {}) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "rhythm-tap") return;
  if (state.exam?.active && !options.fromListenOnly && !tryConsumeExamReplay()) return;

  await ensureAudioReady();
  if (options.fromListenOnly && (!state.listenOnly?.active || state.listenOnly.token !== options.token || state.currentView !== "exercise" || state.currentExercise !== ex)) {
    return;
  }
  audioEngine.stopPlayback();
  state.rhythmTapSession = null;
  state.isPlaying = true;
  updatePlayButtonUI(true);

  const currentId = audioEngine.playbackId;
  const beatMs = 60000 / (state.activeBpm || 90);
  const beatsPerBar = ex.beatsPerBar;
  const barMs = beatsPerBar * beatMs;
  const audioEpochSec = getAudioClockSec();
  const baseAudioSec = audioEpochSec + 0.05;

  const events = [];
  for (let b = 0; b < beatsPerBar; b++) {
    events.push([Math.round(b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.92 : 0.7]);
  }
  for (let b = 0; b < beatsPerBar; b++) {
    events.push([Math.round(barMs + b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.55 : 0.36]);
  }
  ex.tapSlots.forEach((slot, beatIdx) => {
    slot.cell.offsets.forEach(off => {
      events.push([Math.round(barMs + (beatIdx + off) * beatMs), "clave", 0.96]);
    });
  });

  audioEngine.playRhythmSequence(events, baseAudioSec);

  const padBtn = document.getElementById("rhythmTapPadBtn");
  const titleEl = document.getElementById("rhythmPadTitle");
  const subEl = document.getElementById("rhythmPadSub");
  padBtn?.classList.remove("is-ready", "is-hit");
  padBtn?.classList.add("is-counting");

  for (let b = 0; b < beatsPerBar; b++) {
    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      setCentralStageMode("stage-playing");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tr("NUR ANHÖREN • VORZÄHLER", "LISTEN ONLY • COUNT-IN");
      document.getElementById("stageMainText").textContent = `${b + 1}`;
      document.getElementById("stageFunctionText").textContent = tr("Gleich erklingt das Muster…", "Pattern coming up…");
      if (titleEl) titleEl.textContent = tf("Vorzähler: {n}", "Count-in: {n}", { n: b + 1 });
      if (subEl) subEl.textContent = tr("Nur anhören (ohne Eingabe)", "Listen only (no input)");
    }, 50 + Math.round(b * beatMs));

    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      for (let i = 0; i < beatsPerBar; i++) {
        document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === b);
      }
      document.getElementById("stageSubtext").textContent = tf("MUSTER • SCHLAG {n}/{tot}", "PATTERN • BEAT {n}/{tot}", { n: b + 1, tot: beatsPerBar });
      document.getElementById("stageMainText").textContent = ex.tapSlots[b].cell.short;
      document.getElementById("stageFunctionText").textContent = tr("Hör dir den Rhythmus in Ruhe ein.", "Internalize the rhythm calmly.");
      if (titleEl) titleEl.textContent = tf("Muster: Schlag {n}", "Pattern: Beat {n}", { n: b + 1 });
    }, 50 + Math.round(barMs + b * beatMs));
  }

  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== currentId) return;
    stopPlayback();
    handleListenOnlyPromptEnded(ex);
  }, 50 + Math.round(2 * barMs + 140));
}

function handleRhythmTapInput(overrideRelMs = null, inputPoint = null) {
  const session = state.rhythmTapSession;
  const ex = state.currentExercise;
  if (!session || session.ended || session.phase !== "listen" || !ex || ex.type !== "rhythm-tap") {
    return null;
  }
  const tapPoint = (inputPoint && Number.isFinite(inputPoint.x) && Number.isFinite(inputPoint.y))
    ? inputPoint
    : (typeof overrideRelMs === "number" ? null : getFreshPointerInputPoint());
  session.lastTapClientPoint = tapPoint || null;

  let relMs;
  if (typeof overrideRelMs === "number" && Number.isFinite(overrideRelMs)) {
    relMs = overrideRelMs;
  } else {
    const nowAudioSec = getAudioClockSec();
    if (Math.abs(nowAudioSec - session.audioEpochSec) > 0.005) {
      relMs = (nowAudioSec - session.playerBarAudioStartSec) * 1000;
    } else {
      relMs = Date.now() - session.playerBarWallStartMs;
    }
  }

  const roundedMs = Math.round(relMs);
  session.tapsMs.push(roundedMs);

  audioEngine.triggerPercussion("clave", null, 0.92);

  const padBtn = document.getElementById("rhythmTapPadBtn");
  const subEl = document.getElementById("rhythmPadSub");
  if (padBtn) {
    padBtn.classList.remove("is-hit");
    void padBtn.offsetWidth;
    padBtn.classList.add("is-hit");
    setTimeout(() => {
      padBtn.classList.remove("is-hit");
    }, 115);
  }
  if (subEl) {
    const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
    if (lang === "uk") {
      const n = session.tapsMs.length;
      const mod100 = n % 100;
      const mod10 = n % 10;
      const unit = (mod100 >= 11 && mod100 <= 19)
        ? "ударів"
        : (mod10 === 1 ? "удар" : (mod10 >= 2 && mod10 <= 4 ? "удари" : "ударів"));
      subEl.textContent = `${n} ${unit} записано`;
    } else if (lang === "pl") {
      const n = session.tapsMs.length;
      const mod100 = n % 100;
      const mod10 = n % 10;
      if (n === 1) {
        subEl.textContent = "1 uderzenie zapisane";
      } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
        subEl.textContent = `${n} uderzenia zapisane`;
      } else {
        subEl.textContent = `${n} uderzeń zapisanych`;
      }
    } else if (lang === "ur") {
      const n = session.tapsMs.length;
      subEl.textContent = n === 1 ? "1 تھاپ ریکارڈ ہوئی" : `${n} تھاپیں ریکارڈ ہوئیں`;
    } else if (lang === "es") {
      subEl.textContent = `${session.tapsMs.length} ${session.tapsMs.length === 1 ? "golpe registrado" : "golpes registrados"}`;
    } else if (lang === "fr") {
      subEl.textContent = `${session.tapsMs.length} ${session.tapsMs.length === 1 ? "frappe enregistrée" : "frappes enregistrées"}`;
    } else if (lang === "en") {
      subEl.textContent = `${session.tapsMs.length} ${session.tapsMs.length === 1 ? "tap" : "taps"} recorded`;
    } else {
      subEl.textContent = `${session.tapsMs.length} ${session.tapsMs.length === 1 ? "Schlag" : "Schläge"} erfasst`;
    }
  }
  return roundedMs;
}

function finishRhythmTapRound() {
  const session = state.rhythmTapSession;
  const ex = state.currentExercise;
  if (!session || session.ended || !ex || ex.type !== "rhythm-tap") return null;

  session.ended = true;
  session.phase = "done";
  state.isPlaying = false;

  const res = evaluateRhythmTaps(session.expectedEvents, session.tapsMs, ex.toleranceMs);
  ex.tapEvaluated = true;
  ex.lastEvaluation = res;
  state.exerciseSolved = true;
  ex.isSolved = true;

  if (state.exam?.active) {
    handleExamRhythmTapFinished(ex, session, res);
    return res;
  }

  const padBtn = document.getElementById("rhythmTapPadBtn");
  padBtn?.classList.remove("is-counting", "is-ready", "is-hit");

  for (let i = 0; i < ex.beatsPerBar; i++) {
    const card = document.getElementById(`barCard_${i}`);
    if (!card) continue;
    card.classList.remove("bar-active", "rhythm-blind", "melody-slot-pending", "rhythm-tap-exact", "rhythm-tap-close", "rhythm-tap-missed");
    const lblEl = card.querySelector(".bar-label");
    const beatEvents = res.expResults.filter(r => r.beatIdx === i);

    if (beatEvents.length === 0) {
      const hitDuringRest = res.extraTapsMs.some(
        t => t >= i * session.beatMs - 60 && t < (i + 1) * session.beatMs - 60
      );
      card.classList.add(hitDuringRest ? "rhythm-tap-missed" : "rhythm-tap-exact");
      if (lblEl) lblEl.textContent = hitDuringRest ? tr("Stille!", "Rest!") : tr("✓ Pause", "✓ Rest");
    } else if (beatEvents.some(r => r.status === "missed")) {
      card.classList.add("rhythm-tap-missed");
      if (lblEl) lblEl.textContent = tr("Daneben", "Missed");
    } else if (beatEvents.some(r => r.status === "close")) {
      card.classList.add("rhythm-tap-close");
      const firstDiff = (beatEvents.find(r => r.status === "close") || beatEvents.find(r => r.diffMs !== null))?.diffMs ?? 0;
      if (lblEl) lblEl.textContent = `~ ${firstDiff > 0 ? "+" : ""}${firstDiff}ms`;
    } else {
      card.classList.add("rhythm-tap-exact");
      if (lblEl) lblEl.textContent = tr("✓ Exakt", "✓ Exact");
    }
  }

  renderRhythmTapTimeline(ex, res, session.beatMs);

  const totalExpected = session.expectedEvents.length;
  const hitCount = res.exactCount + res.closeCount;
  const badge = document.getElementById("targetBarBadge");
  if (badge) badge.textContent = res.passed ? tr("Treffer ✓", "Hit ✓") : tr("Nochmal!", "Try Again!");

  const streakRes = res.passed
    ? recordExerciseStreakSuccess(ex)
    : (resetExerciseStreakOnAttempt(ex), { count: 0, isMilestone: false });

  if (document.getElementById("centralStageCard")) {
    const tapPadBtn = document.getElementById("rhythmTapPadBtn");
    const tapCelebratePoint = session.lastTapClientPoint || null;
    if (res.passed && res.closeCount === 0 && res.extraCount === 0) {
      setCentralStageMode("stage-playing");
      updateStageMascot("happy");
      triggerCelebrationFeedback(tapPadBtn, {
        isMilestone: streakRes.isMilestone,
        stageBurst: !tapPadBtn,
        inputPoint: tapCelebratePoint
      });
      document.getElementById("stageSubtext").textContent = tr("PERFEKT GETROFFEN!", "NAILED IT!");
      document.getElementById("stageMainText").textContent = `${res.exactCount}/${totalExpected}`;
      document.getElementById("stageFunctionText").textContent =
        tf("Durchschnitt {avg} (Toleranz ±{tol} ms)", "Average {avg} (tolerance ±{tol} ms)", {
          avg: res.avgDiffMs !== null ? `${res.avgDiffMs > 0 ? "+" : ""}${res.avgDiffMs} ms` : "0 ms",
          tol: ex.toleranceMs
        });
    } else if (res.passed) {
      setCentralStageMode("stage-playing");
      updateStageMascot("happy");
      triggerCelebrationFeedback(tapPadBtn, {
        isMilestone: streakRes.isMilestone,
        stageBurst: !tapPadBtn,
        inputPoint: tapCelebratePoint
      });
      document.getElementById("stageSubtext").textContent = tr("SAUBER IM TAKT!", "SOLID TIMING!");
      document.getElementById("stageMainText").textContent = `${hitCount}/${totalExpected}`;
      document.getElementById("stageFunctionText").textContent =
        tf("{exact} exakt, {close} knapp • Avg {avg} ms", "{exact} exact, {close} close • Avg {avg} ms", {
          exact: res.exactCount,
          close: res.closeCount,
          avg: `${res.avgDiffMs > 0 ? "+" : ""}${res.avgDiffMs ?? 0}`
        });
    } else {
      setCentralStageMode("stage-wrong");
      updateStageMascot("thinking");
      document.getElementById("stageSubtext").textContent = tr("NOCHMAL VERSUCHEN", "TRY AGAIN");
      document.getElementById("stageMainText").textContent = tf("{hit}/{tot} Treffer", "{hit}/{tot} hits", { hit: hitCount, tot: totalExpected });
      document.getElementById("stageFunctionText").textContent =
        tf("Verfehlt: {missed} • Extraschläge: {extra} (Toleranz ±{tol} ms)", "Missed: {missed} • Extra taps: {extra} (tolerance ±{tol} ms)", {
          missed: res.missedCount,
          extra: res.extraCount,
          tol: ex.toleranceMs
        });
    }
  }

  const titleEl = document.getElementById("rhythmPadTitle");
  const subEl = document.getElementById("rhythmPadSub");
  if (titleEl) {
    titleEl.textContent = res.passed
      ? tf("Sauber! {hit}/{tot} Treffer", "Clean! {hit}/{tot} hits", { hit: hitCount, tot: totalExpected })
      : tf("Knapp ({hit}/{tot}) – nochmal tippen", "Close ({hit}/{tot}) — tap again", { hit: hitCount, tot: totalExpected });
  }
  if (subEl) {
    subEl.textContent = res.passed && state.settings.rhythmTapAutoNext
      ? tr("Nächste Runde startet gleich…", "Next round starting soon…")
      : tr("Tippe das Pad oder „▶ Abspielen“", "Tap the pad or press “▶ Play”");
  }

  updatePlayButtonUI(false);

  if (res.passed && state.settings.rhythmTapAutoNext) {
    const finishPlaybackId = audioEngine.playbackId;
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== finishPlaybackId) return;
      if (state.currentView !== "exercise" || state.settings.mode !== "rhythm-tap") return;
      generateExercise();
      playSequence();
    }, 1350);
  }

  return res;
}

function unlockWebAudioSync() {
  try {
    if (typeof audioEngine?.unlockAudioSessionSync === "function") {
      audioEngine.unlockAudioSessionSync();
      return;
    }
    if (typeof Tone === "undefined") return;
    const ctx = typeof Tone.getContext === "function" ? Tone.getContext() : null;
    const rawCtx = ctx?.rawContext || ctx?._context || Tone.context?.rawContext || Tone.context?._context;
    if (rawCtx && (rawCtx.state === "suspended" || rawCtx.state === "interrupted") && typeof rawCtx.resume === "function") {
      Promise.resolve(rawCtx.resume()).catch(() => {});
    }
    if (typeof Tone.start === "function") {
      Promise.resolve(Tone.start()).catch(() => {});
    }
  } catch (_) {}
}

function prepareAudioNonBlocking() {
  unlockWebAudioSync();
  try {
    const pianoPrefs = getActivePianoSoundSettings();
    const droneMix = getActiveDroneMixSettings();
    audioEngine?.setPianoSoundProfile?.(pianoPrefs.character, pianoPrefs.reverb);
    audioEngine?.setDroneIntervalMix?.(droneMix.pad, droneMix.tone);
    if (!audioEngine.graphBuilt && typeof audioEngine.buildAudioGraphSync === "function") {
      audioEngine.buildAudioGraphSync(state.master.volume, state.master.muted, state.mixer);
    }
    audioEngine.setMasterVolume(state.master.volume, state.master.muted);
    audioEngine.setMixerGains(state.mixer);
  } catch (_) {}
  ensureAudioReady().catch(() => {});
}

async function ensureAudioReady() {
  unlockWebAudioSync();
  const initialMixer = audioEngine.preparePromise ? null : state.mixer;
  const pianoPrefs = getActivePianoSoundSettings();
  const droneMix = getActiveDroneMixSettings();
  audioEngine?.setPianoSoundProfile?.(pianoPrefs.character, pianoPrefs.reverb);
  audioEngine?.setDroneIntervalMix?.(droneMix.pad, droneMix.tone);
  await audioEngine.init(state.master.volume, state.master.muted, initialMixer);
  audioEngine.setMasterVolume(state.master.volume, state.master.muted);
  audioEngine.setMixerGains(state.mixer);
  audioEngine?.setPianoSoundProfile?.(pianoPrefs.character, pianoPrefs.reverb);
  audioEngine?.setDroneIntervalMix?.(droneMix.pad, droneMix.tone);
}

/**
 * Spielt in der Melodieübung einen einzelnen Ton ab (standardmäßig den aktuell gesuchten Ton),
 * ohne die bisherigen Fortschritte zurückzusetzen.
 */
async function repeatMelodySlotTone(slotIdx = null) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "melody") return;
  if (state.exam?.active && !tryConsumeExamReplay()) return;
  if (state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }
  const slots = ex.melodySlots || [];
  const tot = slots.length || 4;
  const idx = typeof slotIdx === "number" ? slotIdx : ex.melodyStep;
  const slot = slots[idx];
  if (!slot) return;

  await ensureAudioReady();
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  slots.forEach((_, i) => {
    document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === idx);
  });

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode(slot.solved ? "stage-playing" : "stage-target");
    updateStageMascot(slot.solved ? "happy" : "question");
    document.getElementById("stageSubtext").textContent = tf("TON {n} VON {tot} (EINZELN)", "NOTE {n} OF {tot} (ISOLATED)", { n: idx + 1, tot });
    document.getElementById("stageMainText").textContent = (slot.pitchSolved || slot.solved)
      ? getSolfegeDisplayLabel(slot.syllable)
      : "?";
    document.getElementById("stageFunctionText").textContent = slot.solved
      ? tf("Gelöster Ton ({note})", "Solved note ({note})", { note: slot.germanNote })
      : (ex.melodyStyle === "dictation"
          ? tr("Höre Tonhöhe & Länge relativ zum Puls!", "Listen to pitch & duration against the beat!")
          : tr("Welche Solfège-Stufe hörst du hier?", "Which Solfège degree do you hear here?"));
  }

  const beatSec = 60 / (state.activeBpm || 90);
  const beatMs = Math.round(beatSec * 1000);
  const durBeats = Number(slot.durationBeats) || 2;
  const playDurSec = Math.max(0.18, durBeats * beatSec * 0.88);
  const usePulseCue = ex.melodyStyle !== "steady" && (Boolean(state.settings.melodyPulse) || ex.melodyStyle === "dictation");
  const singlePlaybackId = audioEngine.playbackId;

  if (usePulseCue) {
    const baseClock = getAudioClockSec() + 0.04;
    const cueClicks = [
      [0, "accent", 0.56],
      [beatMs, "tick", 0.44]
    ];
    if (durBeats >= 1.5) cueClicks.push([beatMs * 2, "tick", 0.36]);
    audioEngine.playRhythmSequence(cueClicks, baseClock);

    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== singlePlaybackId) return;
      audioEngine.playStep([slot.noteName], playDurSec, null, "melody-note", {
        atTime: baseClock + beatSec,
        velocity: slot.velocity || 0.9
      });
    }, Math.max(0, beatMs - 85));

    const totalWaitMs = Math.max(820, Math.round((1 + durBeats) * beatMs + 160));
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== singlePlaybackId) return;
      document.getElementById(`barCard_${idx}`)?.classList.remove("bar-active");
      if (!slot.solved && !state.melodyCompleted && !state.isPlaying && !state.listenOnly?.active) {
        showAwaitingAnswerStage(ex);
      }
    }, totalWaitMs);
  } else {
    audioEngine.playStep([slot.noteName], Math.max(0.32, playDurSec), null, "interval");
    const waitMs = Math.max(680, Math.round(durBeats * beatMs + 120));
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== singlePlaybackId) return;
      document.getElementById(`barCard_${idx}`)?.classList.remove("bar-active");
      if (!slot.solved && !state.melodyCompleted && !state.isPlaying && !state.listenOnly?.active) {
        showAwaitingAnswerStage(ex);
      }
    }, waitMs);
  }
}

/**
 * Spielt je nach Modus die gezielte Einzel-Referenz / Hörhilfe nochmal ab
 */
function applyProdEqNoiseComparisonUI(ex, isBypassed) {
  if (!ex || ex.type !== "prod-eq-noise") return;
  const bypass = Boolean(isBypassed);
  ex.noiseBypassed = bypass;

  document.getElementById("barCard_0")?.classList.toggle("bar-active", bypass);
  document.getElementById("barCard_1")?.classList.toggle("bar-active", !bypass);

  const refBtn = document.getElementById("tonicRefBtn");
  const refLbl = document.getElementById("tonicRefLabel");
  if (refBtn) refBtn.classList.toggle("btn-active", bypass);
  if (refLbl) refLbl.textContent = bypass ? tr("Flat: AN", "Flat: ON") : tr("Flat-Bypass", "Flat Bypass");

  if (document.getElementById("centralStageCard")) {
    const isListenOnlyProd = Boolean(state.listenOnly?.active);
    setCentralStageMode(bypass ? "stage-playing" : "stage-target");
    updateStageMascot(bypass ? "listening" : "question");
    document.getElementById("stageSubtext").textContent = bypass
      ? tr("FLAT / BYPASS (ORIGINAL)", "FLAT / BYPASS (ORIGINAL)")
      : tf("EQ-BOOST AKTIV ({info})", "EQ BOOST ACTIVE ({info})", { info: ex.keyName });
    document.getElementById("stageMainText").textContent = bypass ? "Flat" : "?";
    if (isListenOnlyProd) {
      document.getElementById("stageFunctionText").textContent = bypass
        ? tr("Nur Hören: Unbearbeitetes Rosa Rauschen – gleich folgt der EQ-Boost…", "Listen Only: Unprocessed pink noise — EQ boost coming up…")
        : tr("Nur Hören: EQ-Boost aktiv – welches Band tritt hervor?", "Listen Only: EQ boost active — which band stands out?");
    } else {
      document.getElementById("stageFunctionText").textContent = bypass
        ? tr("Unbearbeitetes Rosa Rauschen – schalte zurück auf Ziel-EQ für den Kontrast", "Unprocessed pink noise — switch back to Target EQ to compare")
        : tr("Dauerbetrieb: Höre das angehobene Band heraus oder tippe „Flat-Bypass“", "Continuous playback: spot the boosted band or toggle “Flat Bypass”");
    }
  }
}

async function triggerProdEqNoiseComparison(forceBypass = null) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "prod-eq-noise") return;
  if (state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }
  await ensureAudioReady();

  if (state.isPlaying && audioEngine.activeNoiseSession) {
    const nextBypass = forceBypass === null ? !ex.noiseBypassed : Boolean(forceBypass);
    audioEngine.setProductionNoiseBypass(nextBypass);
    applyProdEqNoiseComparisonUI(ex, nextBypass);
    return;
  }

  // Wenn aktuell gestoppt: Ziel-EQ startet nahtlos im Dauerbetrieb; Flat spielt eine saubere Kurz-Referenz
  if (forceBypass === false) {
    playSequence();
    return;
  }

  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);
  applyProdEqNoiseComparisonUI(ex, true);
  document.getElementById("barCard_1")?.classList.remove("bar-active");

  audioEngine.playProductionNoiseEQ({ mode: "flat-only", durationSec: 1.4 });
  const flatId = audioEngine.playbackId;
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== flatId || state.isPlaying) return;
    document.getElementById("barCard_0")?.classList.remove("bar-active");
    document.getElementById("tonicRefBtn")?.classList.remove("btn-active");
    const refLbl = document.getElementById("tonicRefLabel");
    if (refLbl) refLbl.textContent = tr("Flat-Bypass", "Flat Bypass");
    ex.noiseBypassed = false;
    resetCentralStage();
  }, 1450);
}

function playModeExercisePattern(ex, modeDef, startDelayMs = 0) {
  if (!ex || !modeDef) return 0;
  const preferFlat = ["dorian", "phrygian", "mixolydian", "aeolian", "locrian", "harm_minor"].includes(modeDef.key)
    || [58, 63, 65].includes(ex.rootMidi);
  const toNote = (semi) => midiToNote(ex.rootMidi + semi, preferFlat);
  const currentId = audioEngine.playbackId;

  if (ex.type === "modes-cadence") {
    const chords = modeDef.vampOffsets || [[0, 4, 7], [5, 9, 12]];
    const stepMs = 880;
    chords.forEach((offsets, idx) => {
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== currentId) return;
        const notes = offsets.map(toNote);
        const bassNote = midiToNote(ex.rootMidi + offsets[0] - 12, preferFlat);
        audioEngine.playStep(notes, idx === chords.length - 1 ? 0.95 : 0.78, bassNote, "cadence");
      }, startDelayMs + idx * stepMs);
    });
    return chords.length * stepMs + 220;
  }

  const seqOffsets = ex.type === "modes-char"
    ? (modeDef.charTurn || modeDef.intervals)
    : (modeDef.intervals || [0, 2, 4, 5, 7, 9, 11, 12]);
  const stepMs = ex.type === "modes-char" ? 390 : 340;
  const totalNotesMs = seqOffsets.length * stepMs + 520;

  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== currentId) return;
    audioEngine.playStep([], (totalNotesMs + 200) / 1000, ex.anchorBass, "cadence");
  }, startDelayMs);

  seqOffsets.forEach((semi, idx) => {
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== currentId) return;
      const isLast = idx === seqOffsets.length - 1;
      audioEngine.playStep([toNote(semi)], isLast ? 0.92 : 0.36, null, "interval");
    }, startDelayMs + idx * stepMs);
  });

  return totalNotesMs;
}

function scheduleSolfegeTargetLoopTick(expectedEx, expectedPlaybackId, delayMs = SOLFEGE_LOOP_INTERVAL_MS) {
  audioEngine.registerTimer(() => {
    if (
      !state.isPlaying ||
      audioEngine.playbackId !== expectedPlaybackId ||
      state.currentExercise !== expectedEx ||
      state.solfegeAnswered ||
      !state.settings.loop
    ) {
      return;
    }
    audioEngine.playStep(getNotationPlayNotes(expectedEx.targetItem), 1.1, null, "interval");
    scheduleSolfegeTargetLoopTick(expectedEx, expectedPlaybackId, SOLFEGE_LOOP_INTERVAL_MS);
  }, delayMs);
}

async function startSolfegeTargetLoop(playImmediately = true) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "solfege" || state.solfegeAnswered) return;
  if (!audioEngine.isInitialized) await ensureAudioReady();
  audioEngine.stopPlayback();
  ex.solfegePromptPlayed = true;
  state.isPlaying = true;
  updatePlayButtonUI(true);

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-target");
    updateStageMascot("question");
    document.getElementById("stageSubtext").textContent = tr("GESUCHTER TON", "TARGET NOTE");
    document.getElementById("stageMainText").textContent = "?";
    document.getElementById("stageFunctionText").textContent = tr("Welche Stufe (Do bis Do) hörst du?", "Which scale degree (Do to Do) do you hear?");
  }

  const currentId = audioEngine.playbackId;
  if (playImmediately) {
    audioEngine.playStep(getNotationPlayNotes(ex.targetItem), 1.1, null, "interval");
  }
  scheduleSolfegeTargetLoopTick(ex, currentId, SOLFEGE_LOOP_INTERVAL_MS);
}

/**
 * Spielt in den Kadenzübungen die aktuell abgefragte Akkordstufe isoliert erneut ab.
 */
async function repeatCadenceTargetChord() {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "cadence" || !ex.targetItem) return;
  if (state.exam?.active && !tryConsumeExamReplay()) return;
  if (!audioEngine.isInitialized) await ensureAudioReady();
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  const totalBars = ex.bars?.length ?? 4;
  for (let i = 0; i < totalBars; i++) {
    document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === ex.targetIndex);
  }

  if (document.getElementById("centralStageCard") && !ex.isSolved) {
    setCentralStageMode("stage-target");
    updateStageMascot("question");
    document.getElementById("stageSubtext").textContent = tf("TAKT {n} • GESUCHT", "BAR {n} • TARGET", { n: ex.targetIndex + 1 });
    document.getElementById("stageMainText").textContent = "?";
    document.getElementById("stageFunctionText").textContent = tr("Welche Stufe erklingt jetzt?", "Which chord degree plays now?");
  }

  const playId = audioEngine.playbackId;
  audioEngine.playStep(ex.targetItem.notes, 1.2, ex.targetItem.bass, "cadence");
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== playId) return;
    document.getElementById(`barCard_${ex.targetIndex}`)?.classList.remove("bar-active");
    if (!ex.isSolved && !state.isPlaying && !state.listenOnly?.active) {
      showAwaitingAnswerStage(ex);
    }
  }, 1200);
}

async function repeatSolfegeTargetTone() {
  const ex = state.currentExercise;
  if (!ex) return;
  if (ex.type === "cadence") {
    await repeatCadenceTargetChord();
    return;
  }
  if (ex.type === "melody") {
    await repeatMelodySlotTone(ex.melodyStep);
    return;
  }
  if (ex.type === "rhythm-dictation") {
    await repeatRhythmDictationBeat(ex.rhythmStep);
    return;
  }
  if (ex.type === "rhythm-tap") {
    await playRhythmTapDemoOnly();
    return;
  }
  if (ex.type !== "solfege") return;
  if (state.exam?.active && !tryConsumeExamReplay()) return;
  await ensureAudioReady();
  if (state.settings.loop && !state.solfegeAnswered) {
    await startSolfegeTargetLoop(true);
    return;
  }
  audioEngine.stopPlayback();
  state.isPlaying = false;
  if (!state.solfegeAnswered) updatePlayButtonUI(false);

  if (document.getElementById("centralStageCard") && !state.solfegeAnswered) {
    setCentralStageMode("stage-target");
    updateStageMascot("question");
    document.getElementById("stageSubtext").textContent = tr("GESUCHTER TON", "TARGET NOTE");
    document.getElementById("stageMainText").textContent = "?";
    document.getElementById("stageFunctionText").textContent = tr("Welche Stufe (Do bis Do) hörst du?", "Which scale degree (Do to Do) do you hear?");
  }

  const playId = audioEngine.playbackId;
  audioEngine.playStep(getNotationPlayNotes(ex.targetItem), 0.95, null, "interval");
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== playId) return;
    if (!state.solfegeAnswered && !state.isPlaying && !state.listenOnly?.active) {
      showAwaitingAnswerStage(ex);
    }
  }, 950);
}

const LISTEN_ONLY_REVEAL_DELAY_MS = 2000;
const LISTEN_ONLY_POST_REVEAL_MS = 1350;
const LISTEN_ONLY_MULTI_POST_REVEAL_MS = 1800;
const LISTEN_ONLY_EQ_FLAT_MS = 2400;
const LISTEN_ONLY_EQ_BOOST_MS = 2800;
const LISTEN_ONLY_PROD_REVEAL_DELAY_MS = 2500;
const LISTEN_ONLY_PROD_POST_REVEAL_MS = 2200;
const LISTEN_ONLY_NOTATION_KEY_REVEAL_DELAY_MS = 950;
const LISTEN_ONLY_NOTATION_ADVANCE_DELAY_MS = 1150;
const LISTEN_ONLY_LOOP_MODE_EXCLUSIONS = new Set(["melody", "rhythm-dictation", "rhythm-tap"]);

function cancelListenOnlyTimers() {
  if (!state.listenOnly) return;
  state.listenOnly.token += 1;
  if (state.listenOnly.timerId !== null) {
    clearTimeout(state.listenOnly.timerId);
    state.listenOnly.timerId = null;
  }
  state.listenOnly.phase = "idle";
  // Nur die Summ-Pause-Anzeige des Nur-Hören-Modus aufräumen (die normale läuft über humPauseTimer)
  if (!humPauseTimer) cancelHumPause();
}

function isCurrentExerciseSolved(ex = state.currentExercise) {
  if (!ex) return false;
  return Boolean(
    state.exerciseSolved ||
    ex.isSolved ||
    state.solfegeAnswered ||
    state.melodyCompleted ||
    state.rhythmDictationCompleted ||
    ex.tapEvaluated
  );
}

function clearTransientExerciseWrongMarks() {
  document.querySelectorAll("#degreeButtonsGrid .degree-btn").forEach(el => {
    el.classList.remove("btn-wrong", "btn-correct");
  });
  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-wrong", "key-correct");
  });
  document.getElementById("notationStaffPanel")?.classList.remove("is-wrong", "is-correct");
  document.getElementById("feedbackContainer")?.classList.add("hidden");
  state.lastAnswerWasWrong = false;
  state.wrongAnswerData = null;
}

function syncListenOnlyUI() {
  const btn = document.getElementById("listenOnlyBtn");
  const lbl = document.getElementById("listenOnlyBtnLabel");
  const active = Boolean(state.listenOnly?.active);
  if (syncNotationPaceVisibility() && typeof queueFitExerciseLayout === "function") queueFitExerciseLayout(true);
  if (btn) {
    btn.classList.toggle("btn-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
    btn.title = active
      ? tr("Nur-Hören-Modus läuft (Tippen zum Beenden)", "Listen-Only Mode active (tap to stop)")
      : tr("Nur-Hören-Modus ein-/ausschalten", "Toggle Listen-Only Mode");
  }
  if (lbl) {
    lbl.textContent = tr("Nur Hören", "Listen Only");
  }
  syncAnswerSoundToggleUI();
  updatePlayButtonUI(state.isPlaying);
}

function scheduleListenOnlyStep(fn, delayMs, expectedToken) {
  if (!state.listenOnly) return;
  if (state.listenOnly.timerId !== null) {
    clearTimeout(state.listenOnly.timerId);
    state.listenOnly.timerId = null;
  }
  state.listenOnly.timerId = setTimeout(() => {
    state.listenOnly.timerId = null;
    if (!state.listenOnly?.active || state.listenOnly.token !== expectedToken || state.currentView !== "exercise") {
      return;
    }
    fn(expectedToken);
  }, Math.max(0, Math.round(delayMs)));
}

function scheduleNextListenOnlyExercise(delayMs, token) {
  scheduleListenOnlyStep(() => {
    generateExercise();
    startListenOnlyCycle();
  }, delayMs, token);
}

function revealMelodyListenOnly(ex, token) {
  state.listenOnly.phase = "reveal";
  state.melodyCompleted = true;
  state.exerciseSolved = true;
  ex.isSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;

  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-wrong", "key-correct", "key-pending-pair");
  });

  const slots = ex.melodySlots || [];
  const tot = slots.length || 4;

  slots.forEach((slot, idx) => {
    slot.pitchSolved = true;
    slot.rhythmSolved = true;
    slot.solved = true;
    syncMelodySlotCardUI(ex, idx);
    document.getElementById(`barCard_${idx}`)?.classList.add("tile-selected-pulse");
    const keyEl = document.getElementById(`solfegeKey_${slot.midi}`) ||
      document.getElementById(`solfegeKey_${slot.playedMidi}`) ||
      document.querySelector(`#solfegeKeyboardWrap [data-syllable="${slot.syllable}"]`);
    keyEl?.classList.add("key-correct");
  });

  syncMelodyHeaderAndPromptUI(ex);
  if (ex.melodyStyle === "dictation") {
    renderMelodyRhythmPicker(ex);
  }

  setCentralStageMode("stage-playing");
  updateStageMascot("happy");
  document.getElementById("stageSubtext").textContent = tf("MELODIE GELÖST! ({tot}/{tot})", "MELODY SOLVED! ({tot}/{tot})", { tot });
  document.getElementById("stageMainText").textContent = slots.map(s => getSolfegeDisplayLabel(s.syllable)).join(" – ");
  document.getElementById("stageFunctionText").textContent = tr("Nächste Aufgabe wird geladen…", "Loading next exercise…");
  updatePlayButtonUI(false);

  scheduleNextListenOnlyExercise(LISTEN_ONLY_MULTI_POST_REVEAL_MS, token);
}

function revealRhythmDictationListenOnly(ex, token) {
  state.listenOnly.phase = "reveal";
  state.rhythmDictationCompleted = true;
  state.exerciseSolved = true;
  ex.isSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;

  document.querySelectorAll("#degreeButtonsGrid .degree-btn").forEach(el => {
    el.classList.remove("btn-wrong", "btn-correct");
  });

  ex.rhythmSlots.forEach((slot, idx) => {
    slot.solved = true;
    const card = document.getElementById(`barCard_${idx}`);
    if (card) {
      card.className = "bar-card melody-slot-solved rhythm-slot-clickable tile-selected-pulse";
      const romanEl = card.querySelector(".bar-roman");
      const lblEl = card.querySelector(".bar-label");
      if (romanEl) romanEl.innerHTML = getRhythmCellSVG(slot.cellKey, 40, 22);
      if (lblEl) lblEl.textContent = `✓ ${slot.cell.short}`;
    }
    const matchingChoice = Array.from(document.querySelectorAll("#degreeButtonsGrid .degree-btn"))
      .find(el => el.dataset.choice === slot.cellKey);
    matchingChoice?.classList.add("btn-correct");
  });

  const badge = document.getElementById("targetBarBadge");
  if (badge) badge.textContent = tr("4 / 4 gelöst ✓", "4 / 4 solved ✓");
  const promptEl = document.getElementById("inputPromptText");
  if (promptEl) promptEl.textContent = tr("Alle 4 Zählzeiten gelöst – weiter geht’s!", "All 4 beats solved — moving on!");

  setCentralStageMode("stage-playing");
  updateStageMascot("happy");
  document.getElementById("stageSubtext").textContent = tr("RHYTHMUS GELÖST! (4/4)", "RHYTHM SOLVED! (4/4)");
  document.getElementById("stageMainText").textContent = ex.rhythmSlots.map(s => s.cell.short).join(" • ");
  document.getElementById("stageFunctionText").textContent = tr("Nächste Aufgabe wird geladen…", "Loading next exercise…");
  updatePlayButtonUI(false);

  scheduleNextListenOnlyExercise(LISTEN_ONLY_MULTI_POST_REVEAL_MS, token);
}

function revealRhythmTapListenOnly(ex, token) {
  state.listenOnly.phase = "reveal";
  ex.tapEvaluated = true;
  ex.isSolved = true;
  state.exerciseSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;

  const padBtn = document.getElementById("rhythmTapPadBtn");
  padBtn?.classList.remove("is-counting", "is-ready", "is-hit");
  const padTitle = document.getElementById("rhythmPadTitle");
  const padSub = document.getElementById("rhythmPadSub");
  if (padTitle) padTitle.textContent = tr("Rhythmus-Muster ✓", "Rhythm Pattern ✓");
  if (padSub) padSub.textContent = tr("Nächste Runde startet gleich…", "Next round starting soon…");

  for (let i = 0; i < ex.beatsPerBar; i++) {
    const card = document.getElementById(`barCard_${i}`);
    if (!card) continue;
    card.classList.remove("bar-active", "rhythm-blind", "melody-slot-pending", "rhythm-tap-exact", "rhythm-tap-close", "rhythm-tap-missed");
    card.classList.add("rhythm-tap-exact");
    const lbl = card.querySelector(".bar-label");
    if (lbl && ex.tapSlots[i]?.cell) {
      lbl.textContent = `✓ ${ex.tapSlots[i].cell.short}`;
    }
  }

  const badge = document.getElementById("targetBarBadge");
  if (badge) badge.textContent = tr("Muster gezeigt ✓", "Pattern shown ✓");

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    document.getElementById("stageSubtext").textContent = tr("MUSTER • NUR HÖREN", "PATTERN • LISTEN ONLY");
    document.getElementById("stageMainText").textContent = ex.tapSlots.map(s => s.cell.short).join(" • ");
    document.getElementById("stageFunctionText").textContent = tr("Nächste Aufgabe wird geladen…", "Loading next exercise…");
  }
  updatePlayButtonUI(false);

  scheduleNextListenOnlyExercise(LISTEN_ONLY_MULTI_POST_REVEAL_MS, token);
}

function revealListenOnlyAnswer(token) {
  const ex = state.currentExercise;
  if (!ex || !state.listenOnly?.active || state.listenOnly.token !== token || state.currentView !== "exercise") {
    return;
  }
  if (isCurrentExerciseSolved(ex)) {
    const postRevealMs = (ex.type === "prod-eq-noise" || ex.type === "prod-tone")
      ? LISTEN_ONLY_PROD_POST_REVEAL_MS
      : LISTEN_ONLY_POST_REVEAL_MS;
    scheduleNextListenOnlyExercise(postRevealMs, token);
    return;
  }

  if (ex.type === "solfege") {
    const target = ex.targetItem;
    const keyBtn = document.getElementById(`solfegeKey_${target.midi}`) ||
      document.querySelector(`#solfegeKeyboardWrap [data-syllable="${target.syllable}"]`);
    handleSolfegeKeyClick({ midi: target.midi, syllable: target.syllable }, keyBtn, { fromListenOnly: true });
    return;
  }

  if (ex.type === "melody") {
    revealMelodyListenOnly(ex, token);
    return;
  }

  if (ex.type === "rhythm-dictation") {
    revealRhythmDictationListenOnly(ex, token);
    return;
  }

  if (ex.type === "rhythm-tap") {
    revealRhythmTapListenOnly(ex, token);
    return;
  }

  if (isNotationMode(ex.type)) {
    revealNotationListenOnly(ex, token);
    return;
  }

  const targetKey = ex.targetItem?.key;
  const targetBtn = Array.from(document.querySelectorAll("#degreeButtonsGrid .degree-btn"))
    .find(el => el.dataset.choice === targetKey) || null;
  handleAnswer(targetKey, targetBtn, { fromListenOnly: true });
}

/** Summ-Pause im Nur-Hören-Modus: gleiche Bedingungen wie in der normalen Übung (außer Prüfung). */
function shouldRunListenOnlyHumPause(ex) {
  return Boolean(ex && state.profile?.singAlongPause && isSingAlongTipsEnabled()
    && isSingAlongExerciseType(ex.type) && !state.exam?.active);
}

function handleListenOnlyPromptEnded(expectedEx) {
  if (!state.listenOnly?.active || state.currentView !== "exercise") return;
  if (!expectedEx || state.currentExercise !== expectedEx) return;
  if (state.listenOnly.phase !== "playing") return;

  const token = state.listenOnly.token;
  state.listenOnly.phase = "think";

  if (shouldRunListenOnlyHumPause(expectedEx) && !isCurrentExerciseSolved(expectedEx)
      && renderHumPauseStage(expectedEx, tr("NUR HÖREN • SUMM-PAUSE", "LISTEN ONLY • HUM PAUSE"))) {
    scheduleListenOnlyStep(() => {
      cancelHumPause();
      if (state.currentExercise !== expectedEx) return;
      revealListenOnlyAnswer(token);
    }, Math.max(HUM_PAUSE_MS, LISTEN_ONLY_REVEAL_DELAY_MS), token);
    return;
  }

  if (document.getElementById("centralStageCard") && !isCurrentExerciseSolved(expectedEx)) {
    setCentralStageMode("stage-target");
    updateStageMascot("question");
    document.getElementById("stageSubtext").textContent = tr("NUR HÖREN • DENKPAUSE", "LISTEN ONLY • THINK");
    document.getElementById("stageMainText").textContent = "?";
    document.getElementById("stageFunctionText").textContent =
      expectedEx.type === "prod-eq-noise"
        ? tr("EQ-Boost läuft – Auflösung folgt gleich…", "EQ boost playing — showing answer shortly…")
        : tr("Lösung wird gleich angezeigt…", "Showing answer shortly…");
  }

  const revealDelayMs = (expectedEx.type === "prod-eq-noise" || expectedEx.type === "prod-tone")
    ? LISTEN_ONLY_PROD_REVEAL_DELAY_MS
    : LISTEN_ONLY_REVEAL_DELAY_MS;
  scheduleListenOnlyStep(() => {
    if (state.currentExercise !== expectedEx) return;
    revealListenOnlyAnswer(token);
  }, revealDelayMs, token);
}

async function startListenOnlyCycle() {
  if (!state.listenOnly?.active || state.currentView !== "exercise") return;
  cancelListenOnlyTimers();
  const token = state.listenOnly.token;
  state.listenOnly.phase = "playing";

  if (isCurrentExerciseSolved()) {
    generateExercise();
  } else {
    clearTransientExerciseWrongMarks();
    syncListenOnlyUI();
  }

  const targetEx = state.currentExercise;
  await ensureAudioReady();
  if (!state.listenOnly?.active || state.listenOnly.token !== token || state.currentView !== "exercise") {
    return;
  }
  if (state.currentExercise !== targetEx) return;

  await playSequence();
}

function setListenOnlyMode(enabled, options = {}) {
  const nextActive = Boolean(enabled);
  if (!state.listenOnly) {
    state.listenOnly = { active: false, token: 0, timerId: null, phase: "idle" };
  }
  if (nextActive === state.listenOnly.active && !options.restart) {
    syncListenOnlyUI();
    return;
  }

  cancelListenOnlyTimers();

  if (!nextActive || state.currentView !== "exercise") {
    state.listenOnly.active = false;
    clearTransientExerciseWrongMarks();
    document.getElementById("inlineNotationPacePopover")?.classList.add("hidden");
    document.getElementById("moduleNotationPaceBtn")?.classList.remove("chip-open");
    syncListenOnlyUI();
    if (!options.keepPlayback) {
      stopPlayback();
    }
    return;
  }

  state.listenOnly.active = true;
  if (isNotationMode(state.currentExercise?.type)) {
    syncNotationPaceUI();
    document.getElementById("inlineNotationKeyPopover")?.classList.add("hidden");
    document.getElementById("moduleNotationKeyBtn")?.classList.remove("chip-open");
  }
  if (state.settings.loop && !LISTEN_ONLY_LOOP_MODE_EXCLUSIONS.has(state.settings.mode)) {
    state.settings.loop = false;
    document.getElementById("loopToggleBtn")?.classList.remove("btn-active");
  }
  syncListenOnlyUI();
  startListenOnlyCycle();
}

async function playSequence(options = {}) {
  cancelHumPause();
  if (state.exam?.active && !tryConsumeExamReplay({ isInitialAuto: Boolean(options.examAutoStart) })) {
    return;
  }
  const listenOnlyCycleToken = state.listenOnly?.active ? state.listenOnly.token : null;
  await ensureAudioReady();
  if (listenOnlyCycleToken !== null && (!state.listenOnly?.active || state.listenOnly.token !== listenOnlyCycleToken || state.currentView !== "exercise")) {
    return;
  }
  audioEngine.stopPlayback();
  state.rhythmTapSession = null;
  state.isPlaying = true;
  updatePlayButtonUI(true);

  const ex = state.currentExercise;
  const currentId = audioEngine.playbackId;
  const keepPromptLooping = () => Boolean(state.settings.loop && !state.listenOnly?.active);

  // Notation (Notenlesen):
  // - Im Nur-Hören-Modus: linke Note markieren & kurz Zeit zum Mitlesen lassen
  // - Im Prüfungs-Modus: nur Schlüssel-Ankerton spielen (niemals Zielton vorspielen!)
  // - Im freien Training: als optionale Hörhilfe die aktuelle Zielnote links anspielen
  if (isNotationMode(ex?.type)) {
    const target = ex.targetItem;
    const clefId = target?.clefId || ex.baseClefId || "treble";
    if (state.listenOnly?.active) {
      const targetNotes = getNotationPlayNotes(target);
      setCentralStageMode("stage-target");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tr("NUR HÖREN • NOTENLESEN", "LISTEN ONLY • SIGHT-READ");
      document.getElementById("stageMainText").textContent = getLocalizedNotationClefName(clefId);
      document.getElementById("stageFunctionText").textContent = ex.isChordReading
        ? tr("Höre den Akkord & schau auf den ersten Akkord links…", "Hear the chord & read the leftmost chord…")
        : tr("Höre den Ton & schau auf die erste Note links…", "Hear the tone & read the leftmost note…");
      if (shouldPlayCorrectAnswerAudio()) {
        audioEngine.playStep(
          targetNotes,
          ex.isChordReading ? Math.max(1.05, getNotationListenOnlyToneDurationSec()) : getNotationListenOnlyToneDurationSec(),
          null,
          "interval"
        );
      }
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        state.isPlaying = false;
        updatePlayButtonUI(false);
        if (!state.listenOnly?.active || state.listenOnly.token !== listenOnlyCycleToken || state.currentView !== "exercise" || state.currentExercise !== ex) {
          return;
        }
        revealNotationListenOnly(ex, listenOnlyCycleToken);
      }, getNotationListenOnlyKeyRevealDelayMs());
      return;
    }

    const previewNotes = state.exam?.active
      ? [NOTATION_CLEFS[clefId]?.anchorNote || "G4"]
      : getNotationPlayNotes(target);
    audioEngine.playStep(previewNotes, target?.isChord ? 1.15 : 0.95, null, "interval");
    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      state.isPlaying = false;
      updatePlayButtonUI(false);
    }, target?.isChord ? 1150 : 980);
    return;
  }

  // Produktion 1: Isolierte Sinus-Frequenz erkennen
  if (ex.type === "prod-tone") {
    const isListenOnlyProd = Boolean(state.listenOnly?.active);
    const toneDurSec = isListenOnlyProd ? 1.95 : 1.45;
    const toneWaitMs = isListenOnlyProd ? 2020 : 1520;
    function runProdToneLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

      document.getElementById("barCard_0")?.classList.add("bar-active");
      setCentralStageMode("stage-target");
      updateStageMascot("question");
      document.getElementById("stageSubtext").textContent = tf("SINUSTON • STUFE {lvl}", "SINE WAVE • LEVEL {lvl}", { lvl: ex.level });
      document.getElementById("stageMainText").textContent = "?";
      document.getElementById("stageFunctionText").textContent =
        tr("Höre genau hin – zu welchem Frequenzband gehört dieser Ton?", "Listen closely — which frequency band does this tone belong to?");

      audioEngine.playProductionTone(ex.targetItem.freqHz, toneDurSec);

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        document.getElementById("barCard_0")?.classList.remove("bar-active");
        if (keepPromptLooping()) {
          audioEngine.registerTimer(() => {
            if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
            runProdToneLoopCycle();
          }, 380);
        } else {
          completePromptPlayback(ex);
        }
      }, toneWaitMs);
    }

    runProdToneLoopCycle();
    return;
  }

  // Produktion 2: EQ-Boost im Pink Noise (im Nur-Hören-Modus zuerst Flat, dann länger EQ-Boost)
  if (ex.type === "prod-eq-noise") {
    const isListenOnlyProd = Boolean(state.listenOnly?.active);
    applyProdEqNoiseComparisonUI(ex, isListenOnlyProd);
    audioEngine.startProductionNoiseContinuous({
      freqHz: ex.targetItem.freqHz,
      q: ex.q,
      gainDb: ex.boostDb,
      startBypassed: isListenOnlyProd,
      maxDurationSec: 120,
      onAutoStop: () => {
        if (state.isPlaying && state.currentExercise?.type === "prod-eq-noise") {
          if (!state.listenOnly?.active) {
            completePromptPlayback(ex);
          } else {
            stopPlayback();
          }
        }
      }
    });
    if (isListenOnlyProd) {
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        if (!state.listenOnly?.active || state.listenOnly.token !== listenOnlyCycleToken || state.currentExercise !== ex) return;
        audioEngine.setProductionNoiseBypass(false);
        applyProdEqNoiseComparisonUI(ex, false);
      }, LISTEN_ONLY_EQ_FLAT_MS);

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        if (!state.listenOnly?.active || state.listenOnly.token !== listenOnlyCycleToken || state.currentExercise !== ex) return;
        handleListenOnlyPromptEnded(ex);
      }, LISTEN_ONLY_EQ_FLAT_MS + LISTEN_ONLY_EQ_BOOST_MS);
    }
    return;
  }

  // Tonleitern & Modi: Phase 1 Anker-Quinte -> Phase 2 Modus-Tonleiter / Charakterton / Modales Akkordpendel
  if (ex.type.startsWith("modes-")) {
    function runModeLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

      document.getElementById("barCard_0")?.classList.add("bar-active");
      document.getElementById("barCard_1")?.classList.remove("bar-active");
      setCentralStageMode("stage-playing");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tf("PHASE 1 • {k}", "PHASE 1 • {k}", { k: ex.keyName.toUpperCase() });
      document.getElementById("stageMainText").textContent = `${ex.rootLabel}5`;
      document.getElementById("stageFunctionText").textContent =
        tr("Neutrale Grundton-Quinte (ohne Terz) – gleich erklingt der Modus…", "Neutral open fifth (no 3rd) — target mode coming up…");

      audioEngine.playStep(ex.anchorNotes, 0.95, null, "cadence");

      const phase2DelayMs = 1620;
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        document.getElementById("barCard_0")?.classList.remove("bar-active");
        document.getElementById("barCard_1")?.classList.add("bar-active");
        setCentralStageMode("stage-target");
        updateStageMascot("question");
        document.getElementById("stageSubtext").textContent =
          ex.type === "modes-cadence" ? tr("MODALES AKKORDPENDEL", "MODAL CHORD LOOP") : (ex.type === "modes-char" ? tr("CHARAKTERTON", "COLOR TONE") : tr("KIRCHENTONART", "SCALE MODE"));
        document.getElementById("stageMainText").textContent = "?";
        document.getElementById("stageFunctionText").textContent =
          ex.type === "modes-cadence"
            ? tr("Welcher modale Klang prägt diese Akkordfolge?", "Which modal sound colors this progression?")
            : tr("Welche Tonleiter bzw. Klangfarbe hörst du?", "Which mode or tonal color do you hear?");
      }, phase2DelayMs);

      const patternDurMs = playModeExercisePattern(ex, ex.targetItem, phase2DelayMs);
      const cycleEndMs = phase2DelayMs + patternDurMs + 220;

      // Optional: Bezugsgrundton (Grundton des Modus) als Fläche unter dem ganzen Durchlauf
      if (state.settings.modesRootPad && !state.exam?.active) {
        audioEngine.playRootPad(
          [midiToNote(ex.rootMidi - 12), midiToNote(ex.rootMidi)],
          (cycleEndMs + 300) / 1000
        );
      }

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        document.getElementById("barCard_0")?.classList.remove("bar-active");
        document.getElementById("barCard_1")?.classList.remove("bar-active");
        if (keepPromptLooping()) {
          audioEngine.registerTimer(() => {
            if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
            runModeLoopCycle();
          }, 420);
        } else {
          completePromptPlayback(ex);
        }
      }, cycleEndMs);
    }

    runModeLoopCycle();
    return;
  }

  // 1. Taktart & Metrum (Rhythmus)
  if (ex.type === "rhythm-meter") {
    function runMeterLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      const { events, barMs, totalMs } = buildRhythmMeterEvents(ex.targetItem.key, state.activeBpm, 2, false);
      const audioEpochSec = getAudioClockSec();
      const baseAudioSec = audioEpochSec + 0.04;
      audioEngine.playRhythmSequence(events, baseAudioSec);

      for (let bar = 0; bar < 2; bar++) {
        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
          for (let i = 0; i < 2; i++) {
            document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === bar);
          }
          setCentralStageMode("stage-target");
          updateStageMascot("question");
          document.getElementById("stageSubtext").textContent = tf("METRUM • TAKT {n}/2", "METER • BAR {n}/2", { n: bar + 1 });
          document.getElementById("stageMainText").textContent = "?";
          document.getElementById("stageFunctionText").textContent = tr("Achte auf die betonte Eins – welche Taktart erklingt?", "Feel the accented downbeat — which meter do you hear?");
        }, 40 + Math.round(bar * barMs));
      }

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        if (keepPromptLooping()) {
          runMeterLoopCycle();
        } else {
          completePromptPlayback(ex);
        }
      }, 40 + Math.round(totalMs));
    }

    runMeterLoopCycle();
    return;
  }

  // 2. Rhythmus-Diktat (4 Zählzeiten nach 1 Takt Vorzähler)
  if (ex.type === "rhythm-dictation") {
    const beatMs = 60000 / (state.activeBpm || 90);
    const barMs = 4 * beatMs;
    const events = [];

    for (let b = 0; b < 4; b++) {
      events.push([Math.round(b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.92 : 0.7]);
    }
    for (let b = 0; b < 4; b++) {
      events.push([Math.round(barMs + b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.48 : 0.34]);
    }
    ex.rhythmSlots.forEach((slot, idx) => {
      slot.cell.offsets.forEach(off => {
        events.push([Math.round(barMs + (idx + off) * beatMs), "clave", 0.96]);
      });
    });

    const baseAudioSec = getAudioClockSec() + 0.04;
    audioEngine.playRhythmSequence(events, baseAudioSec);

    ex.rhythmSlots.forEach((_, i) => {
      document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
    });

    for (let b = 0; b < 4; b++) {
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("VORZÄHLER ({n}/4)", "COUNT-IN ({n}/4)", { n: b + 1 });
        document.getElementById("stageMainText").textContent = `${b + 1}`;
        document.getElementById("stageFunctionText").textContent = tf("Tempo {bpm} BPM – gleich folgt die Clave", "Tempo {bpm} BPM — clave entering next", { bpm: state.activeBpm });
      }, 40 + Math.round(b * beatMs));
    }

    ex.rhythmSlots.forEach((slot, idx) => {
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        for (let i = 0; i < ex.rhythmSlots.length; i++) {
          document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === idx);
        }
        setCentralStageMode(slot.solved ? "stage-playing" : "stage-target");
        updateStageMascot(slot.solved ? "listening" : "question");
        document.getElementById("stageSubtext").textContent = tf("RHYTHMUS • SCHLAG {n}/4", "RHYTHM • BEAT {n}/4", { n: idx + 1 });
        document.getElementById("stageMainText").textContent = slot.solved ? slot.cell.short : "?";
        document.getElementById("stageFunctionText").textContent = slot.solved
          ? tf("Bereits gelöst ({lbl})", "Already solved ({lbl})", { lbl: slot.cell.label })
          : tr("Welcher Rhythmus-Baustein erklingt auf diesem Schlag?", "Which rhythm cell plays on this beat?");
      }, 40 + Math.round(barMs + idx * beatMs));
    });

    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      for (let i = 0; i < ex.rhythmSlots.length; i++) {
        document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
      }
      state.isPlaying = false;
      updatePlayButtonUI(false);

      if (state.listenOnly?.active) {
        handleListenOnlyPromptEnded(ex);
      } else if (!state.rhythmDictationCompleted) {
        showAwaitingAnswerStage(ex);
      }
    }, 40 + Math.round(2 * barMs + 80));

    return;
  }

  // 3. Rhythmus nachklopfen (Tap-Pad): 1 Takt Vorzähler -> 1 Takt Demo -> 1 Takt Nachklopfen (im Nur-Hören-Modus nur Demo)
  if (ex.type === "rhythm-tap") {
    if (state.listenOnly?.active) {
      await playRhythmTapDemoOnly({ fromListenOnly: true, token: state.listenOnly.token });
      return;
    }
    ex.tapEvaluated = false;
    ex.lastEvaluation = null;
    document.getElementById("rhythmTapTimeline")?.remove();

    const beatMs = 60000 / (state.activeBpm || 90);
    const beatsPerBar = ex.beatsPerBar;
    const barMs = beatsPerBar * beatMs;
    const isReadMode = Boolean(ex.readMode);
    const playerBarIdx = isReadMode ? 1 : 2; // Vom Blatt: kein Demo-Takt
    const badge = document.getElementById("targetBarBadge");
    if (badge) badge.textContent = `${ex.meterKey} • ±${ex.toleranceMs} ms`;

    ex.tapSlots.forEach((slot, i) => {
      const card = document.getElementById(`barCard_${i}`);
      if (card) {
        card.className = `bar-card${ex.blind ? " melody-slot-pending" : ""}`;
        const lbl = card.querySelector(".bar-label");
        if (lbl) lbl.textContent = slot.cell.short;
      }
    });

    const events = [];
    // Takt 1: Vorzähler
    for (let b = 0; b < beatsPerBar; b++) {
      events.push([Math.round(b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.94 : 0.72]);
    }
    // Takt 2: Demo (leiser Referenz-Puls + Clave-Muster) – entfällt beim Lesen vom Blatt
    if (!isReadMode) {
      for (let b = 0; b < beatsPerBar; b++) {
        events.push([Math.round(barMs + b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.55 : 0.36]);
      }
    }
    const expectedEvents = [];
    ex.tapSlots.forEach((slot, beatIdx) => {
      slot.cell.offsets.forEach(off => {
        const relMs = Math.round((beatIdx + off) * beatMs);
        expectedEvents.push({ relMs, beatIdx, offset: off, cellKey: slot.cellKey });
        if (!isReadMode) events.push([Math.round(barMs + relMs), "clave", 0.96]);
      });
    });
    // Eingabe-Takt: Metronom-Klick (nur wenn aktiviert und NICHT Blindflug)
    if (!ex.blind && state.settings.rhythmTapClick) {
      for (let b = 0; b < beatsPerBar; b++) {
        events.push([Math.round(playerBarIdx * barMs + b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.65 : 0.48]);
      }
    }

    const audioEpochSec = getAudioClockSec();
    const baseAudioSec = audioEpochSec + 0.05;
    const wallEpochMs = Date.now();

    state.rhythmTapSession = {
      playbackId: currentId,
      phase: "counting",
      audioEpochSec: audioEpochSec,
      baseAudioSec: baseAudioSec,
      playerBarAudioStartSec: baseAudioSec + (playerBarIdx * barMs) / 1000,
      playerBarWallStartMs: wallEpochMs + Math.round(50 + playerBarIdx * barMs),
      barMs: barMs,
      beatMs: beatMs,
      beatsPerBar: beatsPerBar,
      expectedEvents: expectedEvents,
      tapsMs: [],
      ended: false
    };

    audioEngine.playRhythmSequence(events, baseAudioSec);

    const padBtn = document.getElementById("rhythmTapPadBtn");
    const padTitle = document.getElementById("rhythmPadTitle");
    const padSub = document.getElementById("rhythmPadSub");
    padBtn?.classList.remove("is-ready", "is-hit");
    padBtn?.classList.add("is-counting");

    for (let b = 0; b < beatsPerBar; b++) {
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("VORZÄHLER • {m}", "COUNT-IN • {m}", { m: ex.meterKey });
        document.getElementById("stageMainText").textContent = `${b + 1}`;
        document.getElementById("stageFunctionText").textContent = isReadMode
          ? tr("Lies den Rhythmus mit – nach dem Vorzähler tippst du ihn zum Metronom", "Read along — after the count-in, tap it with the metronome")
          : tr("Merke dir den Puls – gleich folgt die Demo", "Lock into the pulse — demo coming up next");
        if (padTitle) padTitle.textContent = tf("Vorzähler: {n}", "Count-in: {n}", { n: b + 1 });
        if (padSub) padSub.textContent = isReadMode
          ? tr("Gleich geht's los – Einsatz auf der Eins!", "Get ready — come in on beat one!")
          : tr("Noch warten – erst zuhören", "Wait — listen first");
      }, 50 + Math.round(b * beatMs));

      if (isReadMode) continue;
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        if (state.rhythmTapSession?.playbackId === currentId) {
          state.rhythmTapSession.phase = "demo";
        }
        for (let i = 0; i < beatsPerBar; i++) {
          document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === b);
        }
        document.getElementById("stageSubtext").textContent = tf("VORSPIEL • SCHLAG {n}/{tot}", "DEMO • BEAT {n}/{tot}", { n: b + 1, tot: beatsPerBar });
        document.getElementById("stageMainText").textContent = ex.tapSlots[b].cell.short;
        document.getElementById("stageFunctionText").textContent = tr("Höre zu und bereite deinen Einsatz vor…", "Listen closely and get ready to tap…");
        if (padTitle) padTitle.textContent = tf("Demo: Schlag {n}", "Demo: Beat {n}", { n: b + 1 });
        if (padSub) padSub.textContent = tr("Danach sofort nachklopfen!", "Tap right back after this!");
      }, 50 + Math.round(barMs + b * beatMs));
    }

    // Leicht vorgezogener Start der „listen“-Phase (-140 ms vor dem Eingabe-Takt), damit minimal verfrühte Schläge auf die 1 zählen
    const listenGateDelayMs = Math.max(20, 50 + Math.round(playerBarIdx * barMs - 140));
    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      if (state.rhythmTapSession?.playbackId === currentId) {
        state.rhythmTapSession.phase = "listen";
      }
      padBtn?.classList.remove("is-counting");
      padBtn?.classList.add("is-ready");
      if (padTitle) padTitle.textContent = isReadMode
        ? (ex.blind ? tr("Blindflug: Jetzt vom Blatt tappen!", "Blind Mode: Tap from the page!") : tr("Jetzt vom Blatt tappen!", "Tap what you read!"))
        : (ex.blind ? tr("Blindflug: Jetzt klopfen!", "Blind Mode: Tap Now!") : tr("Jetzt nachklopfen!", "Tap It Back Now!"));
      if (padSub) padSub.textContent = tr("Tippe auf das Pad oder die Leertaste", "Tap the pad or press Spacebar");

      setCentralStageMode("stage-target");
      updateStageMascot("question");
      document.getElementById("stageSubtext").textContent = ex.blind ? tr("BLINDFLUG • DEIN EINSATZ!", "BLIND MODE • YOUR TURN!") : tr("DEIN EINSATZ!", "YOUR TURN!");
      document.getElementById("stageMainText").textContent = tr("Klopfen!", "Tap!");
      document.getElementById("stageFunctionText").textContent = ex.blind
        ? tr("Kein Klick, keine Anzeige – zähle im Kopf weiter!", "No click, no display — keep counting silently!")
        : (isReadMode
            ? tf("Tippe den notierten Rhythmus im {m}-Takt zum Metronom.", "Tap the written rhythm in {m} time with the metronome.", { m: ex.meterKey })
            : tf("Klopfe das Muster im {m}-Takt nach.", "Tap the pattern back in {m} time.", { m: ex.meterKey }));

      if (ex.blind && !isReadMode) {
        for (let i = 0; i < beatsPerBar; i++) {
          const card = document.getElementById(`barCard_${i}`);
          card?.classList.remove("bar-active");
          card?.classList.add("rhythm-blind");
        }
      }
    }, listenGateDelayMs);

    if (!ex.blind) {
      for (let b = 0; b < beatsPerBar; b++) {
        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
          for (let i = 0; i < beatsPerBar; i++) {
            document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === b);
          }
        }, 50 + Math.round(playerBarIdx * barMs + b * beatMs));
      }
    }

    const roundEndMs = 50 + Math.round((playerBarIdx + 1) * barMs + ex.toleranceMs * 1.45);
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== currentId) return;
      finishRhythmTapRound();
    }, roundEndMs);

    return;
  }

  // 4. Groove, Offbeat & Mikro-Timing (Rhythmus)
  if (ex.type === "rhythm-groove") {
    function runGrooveLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      const { events, totalMs, barMs } = buildRhythmGrooveEvents(ex, null, state.activeBpm);
      const baseAudioSec = getAudioClockSec() + 0.04;
      audioEngine.playRhythmSequence(events, baseAudioSec);

      const barCount = ex.bars.length;
      for (let bar = 0; bar < barCount; bar++) {
        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
          for (let i = 0; i < barCount; i++) {
            document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === bar);
          }
          if (ex.grooveKind === "offbeat" && bar === 0) {
            setCentralStageMode("stage-playing");
            updateStageMascot("listening");
            document.getElementById("stageSubtext").textContent = tr("TAKT 1 • REFERENZ-PULS", "BAR 1 • REFERENCE PULSE");
            document.getElementById("stageMainText").textContent = "1–4";
            document.getElementById("stageFunctionText").textContent = tr("Spüre die Zählzeiten – gleich kommt der Cowbell-Akzent", "Feel the beats — cowbell accent coming in Bar 2");
          } else {
            setCentralStageMode("stage-target");
            updateStageMascot("question");
            document.getElementById("stageSubtext").textContent =
              ex.grooveKind === "micro" ? tr("MIKRO-TIMING", "MICRO-TIMING") : (ex.grooveKind === "offbeat" ? tr("TAKT 2 • AKZENT", "BAR 2 • ACCENT") : tf("GROOVE • TAKT {n}/2", "GROOVE • BAR {n}/2", { n: bar + 1 }));
            document.getElementById("stageMainText").textContent = "?";
            document.getElementById("stageFunctionText").textContent =
              ex.grooveKind === "micro"
                ? tr("Höre genau auf die Snare (2 & 4): zu früh, exakt oder zu spät?", "Focus on the snare (2 & 4): ahead, in the pocket, or laid back?")
                : (ex.grooveKind === "offbeat"
                    ? tr("Wo sitzt der Cowbell-Schlag (1, 1-und … 4-und)?", "Where does the cowbell accent fall (1, 1-and … 4-and)?")
                    : tr("Welcher Groove-Charakter erklingt?", "Which groove feel do you hear?"));
          }
        }, 40 + Math.round(bar * barMs));
      }

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        if (keepPromptLooping()) {
          runGrooveLoopCycle();
        } else {
          completePromptPlayback(ex);
        }
      }, 40 + Math.round(totalMs));
    }

    runGrooveLoopCycle();
    return;
  }

  // Spezieller Ablauf für Melodieübungen (4-Akkord-Kadenz bleibt stabil, danach je nach Stil):
  // 1. Kontext-Kadenz (I - vi - IV - V)
  // 2. Im Basis-Stil: Pause + 4 halbe Noten; im Takt-/Diktat-Stil: 1 Takt Einzähler + samplegenaue rhythmische Phrasen-Noten
  if (ex.type === "melody") {
    const bpm = state.activeBpm || 90;
    const beatSec = 60 / bpm;
    const beatMs = Math.round(beatSec * 1000);
    const chordSec = beatSec * 1.45;
    const chordMs = Math.round(chordSec * 1000);
    const totalChords = ex.cadenceBars.length;
    const slots = ex.melodySlots || [];
    const tot = slots.length || 4;
    const isSteady = ex.melodyStyle === "steady";
    const isDictation = ex.melodyStyle === "dictation";
    const pulseEnabled = Boolean(state.settings.melodyPulse);

    slots.forEach((_, i) => {
      document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
    });

    ex.cadenceBars.forEach((bar, index) => {
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("KONTEXT-KADENZ ({n}/4)", "CONTEXT CADENCE ({n}/4)", { n: index + 1 });
        document.getElementById("stageMainText").textContent = bar.symbol;
        document.getElementById("stageFunctionText").textContent = bar.label;

        audioEngine.playStep(bar.notes, chordSec * 0.88, bar.bass, "cadence");
      }, index * chordMs);
    });

    if (isSteady) {
      const pauseAfterCadenceMs = Math.round(beatSec * 1.35 * 1000);
      const melodyStartMs = totalChords * chordMs + pauseAfterCadenceMs;
      const halfNoteSec = 2 * beatSec;
      const halfNoteMs = Math.round(halfNoteSec * 1000);
      const halfPlaySec = Math.max(0.32, halfNoteSec * 0.88);

      if (pulseEnabled) {
        const steadyClicks = [];
        for (let b = 0; b < tot * 2; b++) {
          steadyClicks.push([
            melodyStartMs + b * beatMs,
            b % 4 === 0 ? "accent" : "tick",
            b % 4 === 0 ? 0.52 : 0.34
          ]);
        }
        audioEngine.playRhythmSequence(steadyClicks, getAudioClockSec() + 0.04);
      }

      slots.forEach((slot, idx) => {
        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

          for (let i = 0; i < slots.length; i++) {
            document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === idx);
          }

          setCentralStageMode(slot.solved ? "stage-playing" : "stage-target");
          updateStageMascot(slot.solved ? "listening" : "question");
          document.getElementById("stageSubtext").textContent = tf("MELODIE • TON {n}/{tot}", "MELODY • NOTE {n}/{tot}", { n: idx + 1, tot });
          document.getElementById("stageMainText").textContent = slot.solved ? getSolfegeDisplayLabel(slot.syllable) : "?";
          document.getElementById("stageFunctionText").textContent = slot.solved
            ? tf("Bereits gelöst ({note})", "Already solved ({note})", { note: slot.germanNote })
            : tf("Halbe Note ({bpm} BPM) • Höre genau hin", "Half note ({bpm} BPM) • Listen closely", { bpm });

          audioEngine.playStep([slot.noteName], halfPlaySec, null, "interval");
        }, melodyStartMs + idx * halfNoteMs);
      });

      const melodyEndMs = melodyStartMs + slots.length * halfNoteMs;
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        for (let i = 0; i < slots.length; i++) {
          document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
        }
        state.isPlaying = false;
        updatePlayButtonUI(false);

        if (state.listenOnly?.active) {
          handleListenOnlyPromptEnded(ex);
        } else if (!state.melodyCompleted) {
          showAwaitingAnswerStage(ex);
        }
      }, melodyEndMs);

      return;
    }

    // Rhythmische Phrase oder Melodiediktat: 1 Takt Einzähler + samplegenaue WebAudio-Planung
    const beatsPerBar = ex.beatsPerBar || 4;
    const totalMelodyBeats = ex.totalMelodyBeats || 4;
    const pauseAfterCadenceMs = Math.round(beatSec * 0.9 * 1000);
    const countInStartMs = totalChords * chordMs + pauseAfterCadenceMs;
    const melodyStartMs = countInStartMs + beatsPerBar * beatMs;
    const baseAudioTime = getAudioClockSec() + 0.04;
    const lookaheadMs = 95;

    const pulseEvents = [];
    for (let b = 0; b < beatsPerBar; b++) {
      const clickDelayMs = countInStartMs + b * beatMs;
      pulseEvents.push([clickDelayMs, b === 0 ? "accent" : "tick", b === 0 ? 0.68 : 0.44]);
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("EINZÄHLER • {meter}", "COUNT-IN • {meter}", { meter: ex.meterKey || "4/4" });
        document.getElementById("stageMainText").textContent = String(b + 1);
        document.getElementById("stageFunctionText").textContent = tr("Fühle den Puls… gleich startet die Melodie", "Feel the pulse… melody enters on 1");
      }, clickDelayMs);
    }

    if (pulseEnabled) {
      const totalClicks = Math.ceil(totalMelodyBeats);
      for (let b = 0; b < totalClicks; b++) {
        pulseEvents.push([
          melodyStartMs + b * beatMs,
          b % beatsPerBar === 0 ? "accent" : "tick",
          b % beatsPerBar === 0 ? 0.56 : 0.36
        ]);
      }
    }

    audioEngine.playRhythmSequence(pulseEvents, baseAudioTime);

    slots.forEach((slot, idx) => {
      const offsetMs = Math.round((Number(slot.beatOffset) || 0) * beatMs);
      const noteDelayMs = melodyStartMs + offsetMs;
      const timerAudioDelayMs = Math.max(0, noteDelayMs - lookaheadMs);
      const targetAudioTime = baseAudioTime + noteDelayMs / 1000;
      const durSec = Math.max(0.16, (Number(slot.durationBeats) || 1) * beatSec * 0.86);
      const rDef = getLocalizedMelodyRhythmValue(slot.rhythmKey);

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        audioEngine.playStep([slot.noteName], durSec, null, "melody-note", {
          atTime: targetAudioTime,
          velocity: slot.velocity || 0.88
        });
      }, timerAudioDelayMs);

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        for (let i = 0; i < slots.length; i++) {
          document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === idx);
        }
        setCentralStageMode(slot.solved ? "stage-playing" : "stage-target");
        updateStageMascot(slot.solved ? "listening" : "question");
        document.getElementById("stageSubtext").textContent = tf("MELODIE • TON {n}/{tot}", "MELODY • NOTE {n}/{tot}", { n: idx + 1, tot });
        document.getElementById("stageMainText").textContent = (slot.pitchSolved || slot.solved)
          ? getSolfegeDisplayLabel(slot.syllable)
          : "?";
        document.getElementById("stageFunctionText").textContent = slot.solved
          ? tf("Bereits gelöst ({note})", "Already solved ({note})", { note: slot.germanNote })
          : (isDictation
              ? tf("Melodiediktat ({bpm} BPM) • Höre Tonhöhe & Länge", "Melody Dictation ({bpm} BPM) • Hear pitch & length", { bpm })
              : tf("{rhythm} ({bpm} BPM) • Höre genau hin", "{rhythm} ({bpm} BPM) • Listen closely", { rhythm: rDef.label, bpm }));
      }, noteDelayMs);
    });

    const melodyEndMs = melodyStartMs + Math.round(totalMelodyBeats * beatMs + 140);
    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      for (let i = 0; i < slots.length; i++) {
        document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
      }
      state.isPlaying = false;
      updatePlayButtonUI(false);

      if (state.listenOnly?.active) {
        handleListenOnlyPromptEnded(ex);
      } else if (!state.melodyCompleted) {
        showAwaitingAnswerStage(ex);
      }
    }, melodyEndMs);

    return;
  }

  // Spezieller Ablauf für Solfège (abhängig vom eingestellten Tempo state.activeBpm!):
  // 1. Ruhige Kadenz (I - vi - IV - V) -> 2. Deutliche Pause -> 3. Einzelner Zielton (optional alle 3 s im Loop)
  if (ex.type === "solfege") {
    ex.solfegePromptPlayed = false;
    const beatSec = 60 / state.activeBpm;
    // Jeder Akkord der Kadenz dauert 1,45 Schläge (bei 90 BPM ca. 970 ms pro Akkord)
    const chordSec = beatSec * 1.45;
    const chordMs = Math.round(chordSec * 1000);
    // Nach dem Ausklingen des 4. Akkords folgt eine deutliche Pause (bei 90 BPM ca. 900 ms echte Stille)
    const pauseAfterCadenceMs = Math.round(beatSec * 1.35 * 1000);
    const totalChords = ex.bars.length;

    ex.bars.forEach((bar, index) => {
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

        for (let i = 0; i < totalChords; i++) {
          document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === index);
        }

        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("KONTEXT-KADENZ ({n}/4)", "CONTEXT CADENCE ({n}/4)", { n: index + 1 });
        document.getElementById("stageMainText").textContent = bar.symbol;
        document.getElementById("stageFunctionText").textContent = bar.label;

        audioEngine.playStep(bar.notes, chordSec * 0.88, bar.bass, "cadence");
      }, index * chordMs);
    });

    // Nach deutlicher Pause: Einzelner abgefragter Ton (bei Loop alle 3 s nur Zielton wiederholen)
    const targetDelayMs = totalChords * chordMs + pauseAfterCadenceMs;
    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

      ex.solfegePromptPlayed = true;
      for (let i = 0; i < totalChords; i++) {
        document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
      }

      setCentralStageMode("stage-target");
      updateStageMascot("question");
      document.getElementById("stageSubtext").textContent = tr("GESUCHTER TON", "TARGET NOTE");
      document.getElementById("stageMainText").textContent = "?";
      document.getElementById("stageFunctionText").textContent = tr("Tippe die Stufe auf der Klaviatur an!", "Tap the scale degree on the keyboard!");

      audioEngine.playStep(getNotationPlayNotes(ex.targetItem), 1.1, null, "interval");

      if (keepPromptLooping() && !state.solfegeAnswered) {
        scheduleSolfegeTargetLoopTick(ex, currentId, SOLFEGE_LOOP_INTERVAL_MS);
      } else {
        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
          if (keepPromptLooping() && !state.solfegeAnswered) {
            scheduleSolfegeTargetLoopTick(ex, currentId, Math.max(0, SOLFEGE_LOOP_INTERVAL_MS - 1150));
          } else {
            state.isPlaying = false;
            updatePlayButtonUI(false);
            if (state.listenOnly?.active) {
              handleListenOnlyPromptEnded(ex);
            } else if (!state.solfegeAnswered) {
              showAwaitingAnswerStage(ex);
            }
          }
        }, 1150);
      }
    }, targetDelayMs);

    return;
  }

  // Ablauf für Kadenzen, harmonische Intervalle & Akkordtypen — sowie schnelles, tempo-gesteuertes Spiel für melodische Intervalle
  if (ex.type === "interval-melodic" || ex.type === "interval-melodic-down") {
    function runMelodicIntervalLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      const { stepMs, note1DurSec, note2DurSec, cycleMs } = getMelodicIntervalTiming(state.activeBpm);

      ex.bars.forEach((bar, index) => {
        const delay = index === 0 ? 0 : stepMs;
        const noteDur = index === 0 ? note1DurSec : note2DurSec;

        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

          for (let i = 0; i < ex.bars.length; i++) {
            document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === index);
          }

          if (index === ex.targetIndex) {
            setCentralStageMode("stage-target");
            updateStageMascot("question");
            document.getElementById("stageSubtext").textContent = tf("TON {n} • GESUCHT", "NOTE {n} • TARGET", { n: index + 1 });
            document.getElementById("stageMainText").textContent = "?";
            document.getElementById("stageFunctionText").textContent = tr("Welches Intervall erklingt jetzt?", "Which interval plays now?");
          } else {
            setCentralStageMode("stage-playing");
            updateStageMascot("listening");
            document.getElementById("stageSubtext").textContent = tf("TON 1 • {bpm} BPM", "NOTE 1 • {bpm} BPM", { bpm: state.activeBpm });
            document.getElementById("stageMainText").textContent = bar.symbol;
            document.getElementById("stageFunctionText").textContent = bar.label;
          }

          audioEngine.playStep(bar.notes, noteDur, null, "cadence");
        }, delay);
      });

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        if (keepPromptLooping()) {
          runMelodicIntervalLoopCycle();
        } else {
          completePromptPlayback(ex);
        }
      }, cycleMs);
    }

    runMelodicIntervalLoopCycle();
    return;
  }

  if (ex.type === "interval-drone") {
    function runDroneIntervalLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      const { delayMs, pianoDurSec, padDurSec, cycleMs } = getDroneIntervalTiming(state.activeBpm);

      document.getElementById("barCard_0")?.classList.add("bar-active");
      document.getElementById("barCard_1")?.classList.remove("bar-active");
      setCentralStageMode("stage-playing");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tf("FLÄCHE • {bpm} BPM", "PAD • {bpm} BPM", { bpm: state.activeBpm });
      document.getElementById("stageMainText").textContent = ex.bars[0]?.symbol || "?";
      document.getElementById("stageFunctionText").textContent =
        tr("Streicher-Fläche hält den Grundton – gleich folgt das Klavier…", "Strings pad sustains the root — piano pitch coming up…");

      audioEngine.playDroneIntervalCue(ex.padNotes, [ex.targetItem.targetNote], {
        delayMs,
        padDurSec,
        pianoDurSec,
        onTargetStart: () => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
          document.getElementById("barCard_0")?.classList.remove("bar-active");
          document.getElementById("barCard_1")?.classList.add("bar-active");
          setCentralStageMode("stage-target");
          updateStageMascot("question");
          document.getElementById("stageSubtext").textContent = tr("KLAVIER • GESUCHT", "PIANO • TARGET");
          document.getElementById("stageMainText").textContent = "?";
          document.getElementById("stageFunctionText").textContent =
            tr("Welches Intervall erklingt über der Grundton-Fläche?", "Which interval plays over the root pad?");
        }
      });

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        document.getElementById("barCard_0")?.classList.remove("bar-active");
        document.getElementById("barCard_1")?.classList.remove("bar-active");
        if (keepPromptLooping()) {
          runDroneIntervalLoopCycle();
        } else {
          completePromptPlayback(ex);
        }
      }, cycleMs);
    }

    runDroneIntervalLoopCycle();
    return;
  }

  if (isChordArpeggioMode(ex.type)) {
    function runChordArpeggioLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      const rawNotes = Array.isArray(ex.targetItem?.notes) ? ex.targetItem.notes : [];
      const seqNotes = ex.type === "chord-arp-down" ? [...rawNotes].reverse() : rawNotes;
      const { stepMs, noteDurSec, lastNoteDurSec, cycleMs } = getChordArpeggioPromptTiming(
        seqNotes.length,
        state.activeBpm
      );
      const dirArrow = ex.type === "chord-arp-down" ? "↘" : "↗";

      seqNotes.forEach((note, idx) => {
        const delay = idx * stepMs;
        const noteDur = idx === seqNotes.length - 1 ? lastNoteDurSec : noteDurSec;

        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
          for (let i = 0; i < ex.bars.length; i++) {
            document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === 0);
          }
          setCentralStageMode("stage-target");
          updateStageMascot("question");
          document.getElementById("stageSubtext").textContent = tf("ARPEGGIO {dir} • {bpm} BPM", "ARPEGGIO {dir} • {bpm} BPM", {
            dir: dirArrow,
            bpm: state.activeBpm
          });
          document.getElementById("stageMainText").textContent = "?";
          document.getElementById("stageFunctionText").textContent = tr("Welcher Akkord erklingt jetzt?", "Which chord quality plays now?");

          audioEngine.playStep([note], noteDur, null, "cadence");
        }, delay);
      });

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        if (keepPromptLooping()) {
          runChordArpeggioLoopCycle();
        } else {
          completePromptPlayback(ex);
        }
      }, cycleMs);
    }

    runChordArpeggioLoopCycle();
    return;
  }

  // Ablauf für Kadenzen (kompakter Legato-Wechsel), harmonische Intervalle & Akkordtypen
  const totalBars = ex.bars.length;
  let stepScheduleMs;
  let stepDursSec;
  let totalDurationMs;

  if (ex.type === "cadence") {
    const cadTiming = getCadenceStepTiming(state.activeBpm, state.activeTimeSig);
    stepScheduleMs = ex.bars.map((_, index) => index * cadTiming.stepMs);
    stepDursSec = ex.bars.map((_, index) =>
      index === totalBars - 1 ? cadTiming.finalDurSec : cadTiming.stepDurSec
    );
    totalDurationMs = Math.max(0, totalBars - 1) * cadTiming.stepMs + cadTiming.finalHoldMs;
  } else {
    const beatSec = 60 / state.activeBpm;
    let beatsPerBar = 4;
    if (state.activeTimeSig === "3/4") beatsPerBar = 3;
    if (state.activeTimeSig === "6/8") beatsPerBar = 3;
    if (state.activeTimeSig === "odd") beatsPerBar = 5;

    const barSec = beatsPerBar * beatSec;
    const barMs = barSec * 1000;
    stepScheduleMs = ex.bars.map((_, index) => index * barMs);
    stepDursSec = ex.bars.map(() => barSec * 0.9);
    totalDurationMs = totalBars * barMs;
  }

  function runLoopCycle() {
    if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

    ex.bars.forEach((bar, index) => {
      const delay = stepScheduleMs[index];
      const stepDur = stepDursSec[index];

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

        for (let i = 0; i < totalBars; i++) {
          document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === index);
        }

        if (index === ex.targetIndex) {
          setCentralStageMode("stage-target");
          updateStageMascot("question");
          document.getElementById("stageSubtext").textContent = tf("TAKT {n} • GESUCHT", "BAR {n} • TARGET", { n: index + 1 });
          document.getElementById("stageMainText").textContent = "?";
          document.getElementById("stageFunctionText").textContent = ex.type === "cadence"
            ? tr("Welche Stufe erklingt jetzt?", "Which chord degree plays now?")
            : (ex.type === "chord-inversions"
                ? tr("Welcher Akkordton liegt im Bass?", "Which chord tone is in the bass?")
                : (isChordQualityMode(ex.type)
                    ? tr("Welcher Akkord erklingt jetzt?", "Which chord quality plays now?")
                    : tr("Welches Intervall erklingt jetzt?", "Which interval plays now?")));
        } else {
          setCentralStageMode("stage-playing");
          updateStageMascot("listening");
          document.getElementById("stageSubtext").textContent = tf("TAKT {n}", "BAR {n}", { n: index + 1 });
          document.getElementById("stageMainText").textContent = bar.symbol;
          document.getElementById("stageFunctionText").textContent = bar.label;
        }

        audioEngine.playStep(bar.notes, stepDur, bar.bass, ex.type === "interval-harmonic" ? "interval-harmonic" : "cadence");

      }, delay);
    });

    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      if (keepPromptLooping()) {
        runLoopCycle();
      } else {
        completePromptPlayback(ex);
      }
    }, totalDurationMs);
  }

  runLoopCycle();
}

function stopPlayback(options = {}) {
  state.isPlaying = false;
  state.rhythmTapSession = null;
  audioEngine.stopPlayback();
  updatePlayButtonUI(false);

  if (state.currentExercise?.type === "prod-eq-noise") {
    state.currentExercise.noiseBypassed = false;
    document.getElementById("tonicRefBtn")?.classList.remove("btn-active");
    const refLbl = document.getElementById("tonicRefLabel");
    if (refLbl) refLbl.textContent = tr("Flat-Bypass", "Flat Bypass");
  }

  const padBtn = document.getElementById("rhythmTapPadBtn");
  if (padBtn) {
    padBtn.classList.remove("is-counting", "is-ready", "is-hit");
    const padTitle = document.getElementById("rhythmPadTitle");
    const padSub = document.getElementById("rhythmPadSub");
    if (padTitle && !state.currentExercise?.tapEvaluated) {
      padTitle.textContent = tr("Bereit zum Klopfen", "Ready to Tap");
    }
    if (padSub && !state.currentExercise?.tapEvaluated) {
      padSub.textContent = tr("Tippe „▶ Abspielen“ oder drücke die Leertaste", "Tap “▶ Play” or press Spacebar");
    }
  }

  const tapFinished = state.currentExercise?.type === "rhythm-tap" && state.currentExercise?.tapEvaluated;
  if (!options?.preserveStage && !state.solfegeAnswered && !state.melodyCompleted && !state.rhythmDictationCompleted && !tapFinished) {
    resetCentralStage();
  }
  const totalBars = state.currentExercise?.bars?.length ?? 4;
  for (let i = 0; i < totalBars; i++) {
    const card = document.getElementById(`barCard_${i}`);
    if (card) {
      card.classList.remove("bar-active", "rhythm-blind");
    }
  }
}

function updatePlayButtonUI(isPlaying) {
  const btn = document.getElementById("playBtn");
  if (!btn) return;
  if (state.exam?.active && state.exam.currentAnswered && state.exam.feedbackMode === "instant") {
    const isLast = state.exam.currentIdx >= state.exam.totalQuestions - 1;
    btn.innerHTML = isLast ? tr("Auswertung →", "Results →") : tr("Nächste Frage →", "Next Question →");
    btn.classList.remove("btn-stop");
    return;
  }
  if (state.listenOnly?.active && state.currentView === "exercise") {
    btn.innerHTML = tr("■ Stopp", "■ Stop");
    btn.classList.add("btn-stop");
    return;
  }
  if (state.solfegeAnswered && !isPlaying && state.settings.mode === "solfege") {
    btn.innerHTML = tr("Nächste Abfrage ⏭", "Next Prompt ⏭");
    btn.classList.remove("btn-stop");
    return;
  }
  if (isPlaying) {
    btn.innerHTML = tr("■ Stopp", "■ Stop");
    btn.classList.add("btn-stop");
  } else if (isNotationMode(state.currentExercise?.type)) {
    btn.innerHTML = state.exam?.active
      ? tr("▶ Ankerton", "▶ Anchor Pitch")
      : (isNotationChordMode(state.currentExercise?.type)
          ? tr("▶ Akkord anhören", "▶ Hear Chord")
          : tr("▶ Ton anhören", "▶ Hear Note"));
    btn.classList.remove("btn-stop");
  } else {
    btn.innerHTML = tr("▶ Abspielen", "▶ Play");
    btn.classList.remove("btn-stop");
  }
}

