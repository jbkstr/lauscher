/**
 * Lauscher • Notenlesen- & Notationssymbol-Übungs-UI, Inline-Kopf, Warteschlange & Nur-Hören
 */

function getNotationLedgerLevelTag(ex) {
  const lvlCfg = NOTATION_LEVELS[ex?.level] || NOTATION_LEVELS[1];
  const hasKeySig = ex?.keySignatureId && ex.keySignatureId !== "none";
  if (lvlCfg.maxLedgers === 0) return tr("Stammlinien", "5-Line Staff");
  if (lvlCfg.maxLedgers <= 2) return tr("±2 Hilfslinien", "±2 Ledger Lines");
  return ex?.level >= 4
    ? (hasKeySig ? tr("±3 + ♮/♯/♭", "±3 + ♮/♯/♭") : tr("±3 Hilfsl. + ♯/♭", "±3 Ledger + ♯/♭"))
    : tr("±3 Hilfslinien", "±3 Ledger Lines");
}

function getNotationActiveKeyChipLabel(ex) {
  if (!ex) return getLocalizedNotationKeySigName("none", true);
  const sigId = normalizeNotationKeySigId(ex.keySignatureId || "none");
  if (sigId === "none") return getLocalizedNotationKeySigName("none", true);
  const name = getLocalizedNotationKeySigName(sigId, true);
  const badge = getLocalizedNotationKeySigBadge(sigId, false);
  const progress = isNotationKeyPoolMode(ex.notationKeyMode) && !state.exam?.active
    ? ` • ${(ex.keySignaturePhraseProgress || 0) + 1}/${ex.keySignaturePhraseLength || NOTATION_KEY_PHRASE_LEN}`
    : "";
  return `${name} (${badge})${progress}`;
}

function renderInlineNotationKeyPopover() {
  const pop = document.getElementById("inlineNotationKeyPopover");
  if (!pop) return;
  const activeKeyMode = normalizeNotationKeyMode(state.settings.notationKeyMode);
  const ex = state.currentExercise;
  const activeSig = ex && isNotationMode(ex.type) ? normalizeNotationKeySigId(ex.keySignatureId || "none") : "none";
  const showNextKeyBtn = Boolean(ex && isNotationMode(ex.type) && isNotationKeyPoolMode(activeKeyMode) && !state.exam?.active);

  const poolBtns = [
    { id: "none",   label: tr("Ohne (C-Dur)", "None (C)") },
    { id: "easy",   label: tr("1–2 ♯/♭", "1–2 ♯/♭") },
    { id: "medium", label: tr("3–4 ♯/♭", "3–4 ♯/♭") },
    { id: "hard",   label: tr("5–6 ♯/♭", "5–6 ♯/♭") },
    { id: "all",    label: tr("Alle 12", "All 12") }
  ].map(item => `
    <button type="button" class="popover-pill-btn${activeKeyMode === item.id ? " active" : ""}" data-inline-notation-key="${item.id}">
      ${escapeHtml(item.label)}
    </button>
  `).join("");

  const renderSigPopBtn = (sigId) => {
    const badge = getLocalizedNotationKeySigBadge(sigId, false);
    const shortName = getLocalizedNotationKeySigName(sigId, true).replace(/-Dur$| Major$| majeur$| мажор$/i, "");
    const isSel = activeKeyMode === sigId || (isNotationKeyPoolMode(activeKeyMode) && activeSig === sigId);
    return `
      <button type="button" class="popover-pill-btn${isSel ? " active" : ""}" data-inline-notation-key="${sigId}">
        ${escapeHtml(shortName)} ${escapeHtml(badge)}
      </button>
    `;
  };

  pop.innerHTML = `
    <div class="notation-key-pop-head">
      <span class="popover-label">${escapeHtml(tr("Tonart (Vorzeichen):", "Key Signature:"))}</span>
      ${showNextKeyBtn ? `
        <button type="button" class="popover-pill-btn" data-inline-notation-rotate="1">
          ${REFRESH_ICON_SVG}${escapeHtml(tr("Nächste Tonart", "Next Key"))}
        </button>
      ` : ""}
    </div>
    <div class="popover-pills-row">${poolBtns}</div>
    <div class="notation-key-pop-grid">
      ${NOTATION_SHARP_KEY_ORDER.map(renderSigPopBtn).join("")}
      ${NOTATION_FLAT_KEY_ORDER.map(renderSigPopBtn).join("")}
    </div>
  `;

  pop.querySelectorAll("[data-inline-notation-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      applyInlineNotationKeyMode(btn.dataset.inlineNotationKey);
    });
  });
  pop.querySelector("[data-inline-notation-rotate]")?.addEventListener("click", () => {
    rotateNotationExerciseKeyNow();
  });
}

function applyInlineNotationKeyMode(nextKeyMode) {
  if (state.exam?.active) return;
  const normalized = normalizeNotationKeyMode(nextKeyMode);
  state.setNotationKeyMode(normalized);
  cancelListenOnlyTimers();
  stopPlayback();
  generateExercise();
  if (state.listenOnly?.active) {
    startListenOnlyCycle();
  }
}

function rotateNotationExerciseKeyNow() {
  const ex = state.currentExercise;
  if (!ex || !isNotationMode(ex.type) || state.exam?.active) return;
  const nextSig = resolveNotationKeySignatureId(ex.notationKeyMode, ex.keySignatureId);
  ex.keySignatureId = nextSig;
  ex.keySignaturePhraseProgress = 0;
  ex.allowAccidentals = Boolean((NOTATION_LEVELS[ex.level] || NOTATION_LEVELS[1]).allowAccidentals || nextSig !== "none");
  populateNotationExerciseQueue(ex);
  ex.notationPanelState = "";
  renderUI();
}

const DEFAULT_NOTATION_LISTEN_PACE = 50;

function clampNotationListenPace(val) {
  const num = Number(val);
  if (!Number.isFinite(num)) return DEFAULT_NOTATION_LISTEN_PACE;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function getLocalizedNotationPaceLabel(paceVal = state?.settings?.notationListenOnlyPace) {
  const p = clampNotationListenPace(paceVal);
  if (p <= 19) return tr("Sehr langsam", "Very slow", { fr: "Très lent", es: "Muy lento", it: "Molto lento", pl: "Bardzo wolno", tr: "Çok yavaş", uk: "Дуже повільно", ur: "بہت آہستہ", ar: "بطيء جداً" });
  if (p <= 39) return tr("Langsam", "Slow", { fr: "Lent", es: "Lento", it: "Lento", pl: "Wolno", tr: "Yavaş", uk: "Повільно", ur: "آہستہ", ar: "بطيء" });
  if (p <= 60) return tr("Mittel", "Medium", { fr: "Moyen", es: "Medio", it: "Medio", pl: "Średnio", tr: "Orta", uk: "Середньо", ur: "درمیانہ", ar: "متوسط" });
  if (p <= 80) return tr("Schnell", "Fast", { fr: "Rapide", es: "Rápido", it: "Veloce", pl: "Szybko", tr: "Hızlı", uk: "Швидко", ur: "تیز", ar: "سريع" });
  return tr("Sehr schnell", "Very fast", { fr: "Très rapide", es: "Muy rápido", it: "Molto veloce", pl: "Bardzo szybko", tr: "Çok hızlı", uk: "Дуже швидко", ur: "بہت تیز", ar: "سريع جداً" });
}

function getNotationListenOnlyKeyRevealDelayMs(paceVal = state?.settings?.notationListenOnlyPace) {
  const p = clampNotationListenPace(paceVal);
  if (p <= 50) {
    return Math.round(1900 + (LISTEN_ONLY_NOTATION_KEY_REVEAL_DELAY_MS - 1900) * (p / 50));
  }
  return Math.round(LISTEN_ONLY_NOTATION_KEY_REVEAL_DELAY_MS + (380 - LISTEN_ONLY_NOTATION_KEY_REVEAL_DELAY_MS) * ((p - 50) / 50));
}

function getNotationListenOnlyAdvanceDelayMs(paceVal = state?.settings?.notationListenOnlyPace) {
  const p = clampNotationListenPace(paceVal);
  if (p <= 50) {
    return Math.round(2100 + (LISTEN_ONLY_NOTATION_ADVANCE_DELAY_MS - 2100) * (p / 50));
  }
  return Math.round(LISTEN_ONLY_NOTATION_ADVANCE_DELAY_MS + (480 - LISTEN_ONLY_NOTATION_ADVANCE_DELAY_MS) * ((p - 50) / 50));
}

function getNotationListenOnlyToneDurationSec(paceVal = state?.settings?.notationListenOnlyPace) {
  const p = clampNotationListenPace(paceVal);
  return Number((1.15 - (p / 100) * 0.4).toFixed(2));
}

function syncNotationPaceUI() {
  const p = clampNotationListenPace(state?.settings?.notationListenOnlyPace);
  const paceLabel = getLocalizedNotationPaceLabel(p);
  const paceBtn = document.getElementById("moduleNotationPaceBtn");
  const paceSlider = document.getElementById("inlineNotationPaceSlider");
  const paceVal = document.getElementById("inlineNotationPaceVal");
  if (paceBtn) {
    paceBtn.textContent = tf("Tempo: {p}", "Pace: {p}", { p: paceLabel });
  }
  if (paceSlider && String(paceSlider.value) !== String(p)) {
    paceSlider.value = String(p);
  }
  if (paceVal) {
    paceVal.textContent = paceLabel;
  }
}

/**
 * Notenlesen: Der Tempo-Knopf („Tempo: …“) wirkt nur im Nur-Hören-Modus und ist deshalb
 * nur dann sichtbar und bedienbar.
 */
function syncNotationPaceVisibility(ex = state.currentExercise) {
  const paceBtn = document.getElementById("moduleNotationPaceBtn");
  if (!paceBtn) return false;
  const show = Boolean(ex) && isNotationStaffMode(ex.type) && Boolean(state.listenOnly?.active);
  const changed = paceBtn.classList.contains("hidden") === show;
  paceBtn.classList.toggle("hidden", !show);
  if (!show) {
    paceBtn.classList.remove("chip-open");
    document.getElementById("inlineNotationPacePopover")?.classList.add("hidden");
  }
  return changed;
}

function setNotationListenOnlyPace(nextVal) {
  const clamped = clampNotationListenPace(nextVal);
  if (state?.settings) {
    state.settings.notationListenOnlyPace = clamped;
  }
  syncNotationPaceUI();
}

function syncNotationHeaderUI(ex = state.currentExercise) {
  if (!ex || !isNotationMode(ex.type)) return;
  if (isNotationSymbolsMode(ex.type)) {
    const moduleTitleEl = document.getElementById("moduleTitleText");
    const targetBadgeEl = document.getElementById("targetBarBadge");
    const tonicRefRow = document.getElementById("tonicRefRow");
    const tonicRefBtn = document.getElementById("tonicRefBtn");
    const inputPromptText = document.getElementById("inputPromptText");
    if (moduleTitleEl) {
      moduleTitleEl.textContent = tr("Symbole & Spielanweisungen", "Symbols & Markings");
    }
    if (targetBadgeEl) {
      const lvlTag = typeof getNotationSymbolsLevelLabel === "function" ? getNotationSymbolsLevelLabel(ex.level || 1) : String(ex.level || 1);
      targetBadgeEl.textContent = tf("Stufe {lvl} • {tag}", "Level {lvl} • {tag}", { lvl: ex.level || 1, tag: lvlTag });
    }
    tonicRefRow?.classList.add("hidden");
    tonicRefBtn?.classList.add("hidden");
    if (inputPromptText) {
      if (ex.promptKind === "flow-order") {
        inputPromptText.textContent = tr("Spielreihenfolge wählen:", "Choose the play order:");
      } else if (ex.promptKind === "meaning-to-symbol") {
        inputPromptText.textContent = tr("Passendes Symbol wählen:", "Pick the matching symbol:");
      } else {
        inputPromptText.textContent = tr("Bedeutung wählen:", "Pick the meaning:");
      }
    }
    return;
  }
  syncNotationPaceUI();
  const targetClefId = ex.targetItem?.clefId || ex.baseClefId || "treble";
  const targetClefName = getLocalizedNotationClefName(targetClefId);
  const moduleTitleEl = document.getElementById("moduleTitleText");
  const moduleNotationKeyBtn = document.getElementById("moduleNotationKeyBtn");
  const targetBadgeEl = document.getElementById("targetBarBadge");
  const tonicRefRow = document.getElementById("tonicRefRow");
  const tonicRefBtn = document.getElementById("tonicRefBtn");
  const inputPromptText = document.getElementById("inputPromptText");

  if (moduleTitleEl) {
    if (ex.isChordReading) {
      moduleTitleEl.textContent = tf("Akkorde • {clef}", "Chords • {clef}", { clef: targetClefName });
    } else if (ex.isGrandStaff) {
      moduleTitleEl.textContent = tr("Doppelsystem", "Grand Staff");
    } else {
      moduleTitleEl.textContent = ex.isMixedClef && !state.exam?.active
        ? tf("Schlüssel-Mix • {clef}", "Clef Mix • {clef}", { clef: targetClefName })
        : targetClefName;
    }
  }
  if (moduleNotationKeyBtn) {
    moduleNotationKeyBtn.textContent = getNotationActiveKeyChipLabel(ex);
  }
  renderInlineNotationKeyPopover();
  if (targetBadgeEl) {
    targetBadgeEl.textContent = tf("Stufe {lvl} • {tag}", "Level {lvl} • {tag}", {
      lvl: ex.level || 1,
      tag: ex.isChordReading ? getNotationChordLevelTag(ex.level) : getNotationLedgerLevelTag(ex)
    });
  }
  tonicRefRow?.classList.add("hidden");
  tonicRefBtn?.classList.add("hidden");
  if (inputPromptText) {
    if (ex.isChordReading && ex.targetItem?.isChord) {
      inputPromptText.textContent = ex.keySignatureId && ex.keySignatureId !== "none"
        ? tr("Akkord links (mit Vorzeichen) wählen:", "Pick the left chord (mind key sig.):")
        : tr("Akkord links wählen:", "Pick the left chord:");
    } else {
      inputPromptText.textContent = ex.keySignatureId && ex.keySignatureId !== "none"
        ? tr("Note links (mit Vorzeichen) wählen:", "Play left note (mind key sig.):")
        : tr("Note links wählen:", "Play left note:");
    }
  }
}

function getNotationChordLevelTag(level) {
  const lvl = Math.max(1, Math.min(4, parseInt(level, 10) || 1));
  if (lvl === 1) return tr("Dreiklänge • Violinschlüssel", "Triads • Treble");
  if (lvl === 2) return tr("Dreiklänge • Bassschlüssel", "Triads • Bass");
  if (lvl === 3) return tr("Umkehrungen", "Inversions");
  return tr("Alle Typen & Septakkorde", "All Types & 7th Chords");
}

function cancelNotationChordAdvance(ex = state.currentExercise) {
  if (!ex) return;
  ex.chordAdvanceToken = (ex.chordAdvanceToken || 0) + 1;
  ex.chordAdvanceLock = false;
  if (ex.chordAdvanceTimerId) {
    clearTimeout(ex.chordAdvanceTimerId);
    ex.chordAdvanceTimerId = null;
  }
}

function renderNotationStaffPanel(ex, didShift = false, targetGrid = document.getElementById("barsGrid")) {
  if (!ex || !targetGrid) return;
  const target = ex.targetItem || ex.notationQueue?.[0];
  const clefId = target?.clefId || ex.baseClefId || "treble";
  const keySigId = normalizeNotationKeySigId(ex.keySignatureId || target?.keySignatureId || "none");
  const clefName = getLocalizedNotationClefName(clefId);
  // Der frühere Lagen-Hinweis oben rechts („Im 5-Linien-System“ …) entfällt bewusst.
  const showClefPill = Boolean((ex.isMixedClef || ex.isGrandStaff) && !state.exam?.active);
  const showKeySigPill = keySigId !== "none";
  const hasLeftPill = showClefPill || showKeySigPill;

  const keySigPillText = showKeySigPill
    ? `${getLocalizedNotationKeySigName(keySigId, true)} • ${getLocalizedNotationKeySigBadge(keySigId, true)}${
        isNotationKeyPoolMode(ex.notationKeyMode) && !state.exam?.active
          ? ` (${(ex.keySignaturePhraseProgress || 0) + 1}/${ex.keySignaturePhraseLength || NOTATION_KEY_PHRASE_LEN})`
          : ""
      }`
    : "";

  const panel = document.createElement("div");
  panel.className = `notation-staff-panel${ex.notationPanelState ? " " + ex.notationPanelState : ""}`;
  panel.id = "notationStaffPanel";

  const svg = ex.isGrandStaff
    ? buildNotationGrandStaffSVG(ex.notationQueue, {
        keySignatureId: keySigId,
        highlightFirst: true,
        didShift: Boolean(didShift)
      })
    : buildNotationStaffSVG(ex.notationQueue, {
        clefId: clefId,
        keySignatureId: keySigId,
        level: ex.level || 1,
        highlightFirst: true,
        showChangeClefs: Boolean(ex.isMixedClef && !state.exam?.active),
        foundPcs: null,
        isChordStaff: Boolean(ex.isChordReading),
        didShift: Boolean(didShift)
      });

  panel.innerHTML = `
    ${hasLeftPill ? `
      <div class="notation-queue-strip">
        <span class="notation-queue-pills" style="display:inline-flex;flex-wrap:wrap;gap:0.28rem;align-items:center;">
          ${showClefPill ? `<span class="notation-clef-pill">${escapeHtml(clefName)}</span>` : ""}
          ${showKeySigPill ? `<span class="notation-keysig-pill">${escapeHtml(keySigPillText)}</span>` : ""}
        </span>
      </div>
    ` : ""}
    ${svg}
  `;

  targetGrid.innerHTML = "";
  targetGrid.appendChild(panel);
}

function advanceNotationPhraseKeyIfNeeded(ex) {
  if (!ex || !isNotationKeyPoolMode(ex.notationKeyMode) || state.exam?.active) return null;
  const len = ex.keySignaturePhraseLength || NOTATION_KEY_PHRASE_LEN;
  ex.keySignaturePhraseProgress = (ex.keySignaturePhraseProgress || 0) + 1;
  if (ex.keySignaturePhraseProgress < len) return null;

  const nextKeySig = resolveNotationKeySignatureId(ex.notationKeyMode, ex.keySignatureId);
  ex.keySignatureId = nextKeySig;
  ex.keySignaturePhraseProgress = 0;
  ex.allowAccidentals = Boolean((NOTATION_LEVELS[ex.level] || NOTATION_LEVELS[1]).allowAccidentals || nextKeySig !== "none");
  populateNotationExerciseQueue(ex);
  return nextKeySig;
}

function shiftAndAdvanceNotationQueue(ex, feedbackKind, stageSub, stageMain, stageDesc, keyBtn) {
  if (!ex) return;
  cancelNotationChordAdvance(ex);
  ex.chordFoundPcs = [];
  const rotatedKeySig = advanceNotationPhraseKeyIfNeeded(ex);
  if (!rotatedKeySig) {
    const queue = Array.isArray(ex.notationQueue) ? ex.notationQueue.slice(1) : [];
    const lastNote = queue[queue.length - 1] || ex.targetItem || null;
    queue.push(buildNextNotationQueueNote(ex, lastNote));
    ex.notationQueue = queue;
    injectNotationSessionReview(ex);
    ex.targetItem = queue[0] || null;
    ex.choices = ex.isChordReading && Array.isArray(ex.targetItem?.choices) ? [...ex.targetItem.choices] : [];
    ex.keyName = getLocalizedNotationClefName(ex.targetItem?.clefId || ex.baseClefId || "treble");
  }
  ex.notationPanelState = feedbackKind === "correct" ? "is-correct" : "";

  if (ex.isChordReading) {
    renderExerciseChoiceButtonsGrid(ex);
  } else {
    document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
      el.classList.remove("key-wrong", "key-correct");
    });
    if (feedbackKind === "correct" && keyBtn) {
      keyBtn.classList.add("key-correct");
      setTimeout(() => keyBtn.classList.remove("key-correct"), 230);
    }
  }

  renderNotationStaffPanel(ex, true);
  syncNotationHeaderUI(ex);
  queueFitExerciseLayout(false);

  if (feedbackKind === "correct") {
    const panelEl = document.getElementById("notationStaffPanel");
    setTimeout(() => {
      if (ex.notationPanelState === "is-correct") ex.notationPanelState = "";
      panelEl?.classList.remove("is-correct");
    }, 240);
  }

  const finalDesc = rotatedKeySig
    ? tf("Neue Tonart: {key} ({acc})!", "New key: {key} ({acc})!", {
        key: getLocalizedNotationKeySigName(rotatedKeySig, true),
        acc: getLocalizedNotationKeySigBadge(rotatedKeySig, true)
      })
    : stageDesc;

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode(feedbackKind === "correct" ? "stage-playing" : "stage-target");
    updateStageMascot(feedbackKind === "correct" ? "happy" : "idle");
    document.getElementById("stageSubtext").textContent = feedbackKind === "correct"
      ? getPersonalizedCorrectStageSubtext(stageSub)
      : stageSub;
    document.getElementById("stageMainText").textContent = stageMain;
    document.getElementById("stageFunctionText").textContent = finalDesc;
    renderStageStreakUI();
  }
}

async function handleNotationChordChoice(selectedKey, btnElement, options = {}) {
  const ex = state.currentExercise;
  if (!ex || !ex.isChordReading || !ex.targetItem || ex.chordAdvanceLock) return;
  const capturedInputPoint = resolveInputPointFromOptions(options);
  const isListenOnly = Boolean(options.fromListenOnly && state.listenOnly?.active);
  const listenOnlyToken = isListenOnly ? state.listenOnly.token : null;
  if (!options.fromListenOnly && state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }

  prepareAudioNonBlocking();
  if (isListenOnly && (!state.listenOnly?.active || state.listenOnly.token !== listenOnlyToken || state.currentView !== "exercise" || state.currentExercise !== ex)) {
    return;
  }
  if (ex.chordAdvanceLock) return;

  if (state.exam?.active) {
    handleExamNotationChordAnswer(ex, selectedKey, btnElement);
    return;
  }

  const target = ex.targetItem;
  const isCorrect = selectedKey === target.key;

  if (!isCorrect) {
    if (!isListenOnly) {
      resetExerciseStreakOnAttempt(ex);
      noteNotationReviewAnswer(ex, target, false);
    }
    ex.notationPanelState = "is-wrong";
    btnElement?.classList.add("btn-wrong");
    const panelEl = document.getElementById("notationStaffPanel");
    panelEl?.classList.remove("is-correct");
    panelEl?.classList.add("is-wrong");

    if (document.getElementById("centralStageCard")) {
      setCentralStageMode("stage-wrong");
      updateStageMascot("thinking");
      const chosen = getNotationChordChoiceItem(selectedKey);
      const pickedSym = chosen?.symbol || selectedKey || "?";
      const sameRoot = Number(chosen?.rootPc) === Number(target.rootPc);
      const activeKeySig = normalizeNotationKeySigId(ex.keySignatureId || "none");
      document.getElementById("stageSubtext").textContent = tr("NOCH NICHT GANZ", "NOT QUITE");
      document.getElementById("stageMainText").textContent = tf("{sym}? Nein", "{sym}? No", { sym: pickedSym });
      if (sameRoot) {
        document.getElementById("stageFunctionText").textContent = tr(
          "Grundton stimmt! Prüfe Vorzeichen, Terz & Zusatztöne genau.",
          "Right root! Check accidentals, the 3rd, and extensions closely."
        );
      } else if (target.inversion > 0) {
        document.getElementById("stageFunctionText").textContent = tr(
          "Achte auf den echten Grundton (Umkehrung!) und den Schlüssel.",
          "Watch for the true root (inversion!) and check the clef."
        );
      } else if (activeKeySig !== "none") {
        document.getElementById("stageFunctionText").textContent = tf(
          "Tonart {key} ({acc}) beachten – oder „Überspringen“.",
          "Watch {key} ({acc}) — or tap “Skip”.",
          {
            key: getLocalizedNotationKeySigName(activeKeySig, true),
            acc: getLocalizedNotationKeySigBadge(activeKeySig, true)
          }
        );
      } else {
        document.getElementById("stageFunctionText").textContent = tf(
          "Lies zuerst den Grundton im {clef} – oder tippe „Überspringen“.",
          "Check the root note in {clef} — or tap “Skip”.",
          { clef: getLocalizedNotationClefName(target.clefId) }
        );
      }
    }
    return;
  }

  ex.chordAdvanceLock = true;
  const advanceToken = (ex.chordAdvanceToken || 0) + 1;
  ex.chordAdvanceToken = advanceToken;

  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);
  if ((isListenOnly || shouldPlayCorrectAnswerAudio()) && !options.skipCorrectAudio) {
    audioEngine.playStep(getNotationPlayNotes(target), 1.1, null, "interval");
  }

  btnElement?.classList.remove("btn-wrong");
  btnElement?.classList.add("btn-correct");
  ex.notationPanelState = "is-correct";
  const panelEl = document.getElementById("notationStaffPanel");
  panelEl?.classList.remove("is-wrong");
  panelEl?.classList.add("is-correct");

  const streakRes = isListenOnly
    ? { count: state.streakState?.count || 0, isMilestone: false }
    : recordExerciseStreakSuccess(ex);
  if (!isListenOnly) noteNotationReviewAnswer(ex, target, true);
  ex.notationSolvedCount = (ex.notationSolvedCount || 0) + 1;

  if (!isListenOnly) {
    triggerCelebrationFeedback(btnElement, { isMilestone: streakRes.isMilestone, inputPoint: capturedInputPoint });
  }

  const stageSub = tr("RICHTIG GELESEN!", "READ CORRECTLY!");
  const stageMain = target.displayName;
  const stageDesc = tf("{clef} • {ledger}", "{clef} • {ledger}", {
    clef: getLocalizedNotationClefName(target.clefId),
    ledger: `${target.inversionDesc || target.ledgerDesc} • ${target.toneNames}`
  });

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    document.getElementById("stageSubtext").textContent = stageSub;
    document.getElementById("stageMainText").textContent = stageMain;
    document.getElementById("stageFunctionText").textContent = stageDesc;
    renderStageStreakUI();
  }

  ex.chordAdvanceTimerId = setTimeout(() => {
    ex.chordAdvanceTimerId = null;
    if (state.currentView !== "exercise" || state.currentExercise !== ex || ex.chordAdvanceToken !== advanceToken || state.exam?.active) {
      return;
    }
    ex.chordAdvanceLock = false;
    shiftAndAdvanceNotationQueue(ex, "correct", stageSub, stageMain, stageDesc, btnElement);
  }, 260);
}

async function handleNotationKeyClick(clickedKeyDef, keyBtn, options = {}) {
  const ex = state.currentExercise;
  if (!ex || !isNotationMode(ex.type) || !ex.targetItem) return;
  const capturedInputPoint = resolveInputPointFromOptions(options);
  const isListenOnly = Boolean(options.fromListenOnly && state.listenOnly?.active);
  const listenOnlyToken = isListenOnly ? state.listenOnly.token : null;
  if (!options.fromListenOnly && state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }

  prepareAudioNonBlocking();
  if (isListenOnly && (!state.listenOnly?.active || state.listenOnly.token !== listenOnlyToken || state.currentView !== "exercise" || state.currentExercise !== ex)) {
    return;
  }

  if (state.exam?.active) {
    handleExamNotationAnswer(ex, clickedKeyDef, keyBtn);
    return;
  }

  const target = ex.targetItem;
  // MIDI mit exakter Oktave: richtige Tonklasse, aber falsche Oktave zählt als Fehler
  const midiWrongOctave = options.midiWrongOctave || null;
  let isCorrect = !midiWrongOctave && Boolean(clickedKeyDef && Number(clickedKeyDef.pc) === Number(target.pc));

  // Akkorde lesen: jeder richtige Akkordton wird markiert; fertig, wenn alle gefunden sind
  if (target.isChord && Array.isArray(target.pcs) && !midiWrongOctave) {
    const clickedPc = Number(clickedKeyDef?.pc);
    isCorrect = Boolean(clickedKeyDef) && target.pcs.includes(clickedPc);
    if (isCorrect) {
      ex.chordFoundPcs = Array.isArray(ex.chordFoundPcs) ? ex.chordFoundPcs : [];
      if (!ex.chordFoundPcs.includes(clickedPc)) ex.chordFoundPcs.push(clickedPc);
      if (ex.chordFoundPcs.length < target.pcs.length) {
        keyBtn?.classList.remove("key-wrong");
        keyBtn?.classList.add("key-correct");
        const tone = target.chordTones.find(t => Number(t.pc) === clickedPc);
        if (tone && (isListenOnly || shouldPlayCorrectAnswerAudio())) {
          audioEngine.playStep([tone.noteName], 0.6, null, "interval");
        }
        ex.notationPanelState = "";
        renderNotationStaffPanel(ex, false);
        syncNotationHeaderUI(ex);
        if (document.getElementById("centralStageCard")) {
          setCentralStageMode("stage-playing");
          updateStageMascot("listening");
          document.getElementById("stageSubtext").textContent = tf("AKKORDTON {found}/{total}", "CHORD TONE {found}/{total}", {
            found: ex.chordFoundPcs.length,
            total: target.pcs.length
          });
          document.getElementById("stageMainText").textContent = tone ? tone.shortName : "✓";
          document.getElementById("stageFunctionText").textContent = tr("Weiter so – welche Töne fehlen noch?", "Keep going — which notes are still missing?");
        }
        return;
      }
    }
  }

  if (!isCorrect) {
    if (!isListenOnly) {
      resetExerciseStreakOnAttempt(ex);
      noteNotationReviewAnswer(ex, target, false);
    }
    ex.notationPanelState = "is-wrong";
    keyBtn?.classList.add("key-wrong");
    const panelEl = document.getElementById("notationStaffPanel");
    panelEl?.classList.remove("is-correct");
    panelEl?.classList.add("is-wrong");

    if (document.getElementById("centralStageCard")) {
      setCentralStageMode("stage-wrong");
      updateStageMascot("thinking");
      const pickedLbl = clickedKeyDef?.noteLabel
        ? String(clickedKeyDef.noteLabel).replace(/\s*\n\s*/g, " / ")
        : "?";
      const activeKeySig = normalizeNotationKeySigId(ex.keySignatureId || "none");
      document.getElementById("stageSubtext").textContent = tr("NOCH NICHT GANZ", "NOT QUITE");
      document.getElementById("stageMainText").textContent = tf("{note}? Nein", "{note}? No", { note: pickedLbl });
      document.getElementById("stageFunctionText").textContent = activeKeySig !== "none"
        ? tf("Tonart {key} ({acc}) beachten – oder „Überspringen“.", "Watch {key} ({acc}) — or tap “Skip”.", {
            key: getLocalizedNotationKeySigName(activeKeySig, true),
            acc: getLocalizedNotationKeySigBadge(activeKeySig, true)
          })
        : tf("Schau genau in den {clef} — oder tippe „Überspringen“.", "Check the {clef} carefully — or tap “Skip”.", {
            clef: getLocalizedNotationClefName(target.clefId)
          });
      if (midiWrongOctave) {
        const absOct = Math.abs(midiWrongOctave.octaveDiff) || 1;
        const dirHint = midiWrongOctave.octaveDiff > 0
          ? (absOct === 1 ? tr("1 Oktave zu hoch", "1 octave too high") : tf("{n} Oktaven zu hoch", "{n} octaves too high", { n: absOct }))
          : (absOct === 1 ? tr("1 Oktave zu tief", "1 octave too low") : tf("{n} Oktaven zu tief", "{n} octaves too low", { n: absOct }));
        const targetLbl = typeof formatMidiNoteDisplay === "function"
          ? formatMidiNoteDisplay(midiWrongOctave.targetMidi)
          : target.displayName;
        document.getElementById("stageSubtext").textContent = tr("RICHTIGER TON, ANDERE OKTAVE", "RIGHT NOTE, WRONG OCTAVE");
        document.getElementById("stageMainText").textContent = `${midiWrongOctave.noteLabel} (${dirHint})`;
        document.getElementById("stageFunctionText").textContent = tf(
          "Gesucht ist {target} – spiele in der notierten Oktave.",
          "Target is {target} — play in the written octave.",
          { target: targetLbl }
        );
      }
    }
    return;
  }

  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);
  if ((isListenOnly || shouldPlayCorrectAnswerAudio()) && !options.skipCorrectAudio) {
    audioEngine.playStep(getNotationPlayNotes(target), target.isChord ? 1.1 : 0.85, null, "interval");
  }

  const streakRes = isListenOnly
    ? { count: state.streakState?.count || 0, isMilestone: false }
    : recordExerciseStreakSuccess(ex);
  if (!isListenOnly) noteNotationReviewAnswer(ex, target, true);
  ex.notationSolvedCount = (ex.notationSolvedCount || 0) + 1;

  if (!isListenOnly) {
    triggerCelebrationFeedback(keyBtn, { isMilestone: streakRes.isMilestone, inputPoint: capturedInputPoint });
  }

  shiftAndAdvanceNotationQueue(
    ex,
    "correct",
    tr("RICHTIG GELESEN!", "READ CORRECTLY!"),
    target.displayName,
    tf("{clef} • {ledger}", "{clef} • {ledger}", {
      clef: getLocalizedNotationClefName(target.clefId),
      ledger: target.isChord ? `${target.ledgerDesc} • ${target.toneNames}` : target.ledgerDesc
    }),
    keyBtn
  );
}

function cancelNotationSymbolAdvance(ex = state.currentExercise) {
  if (!ex) return;
  ex.advanceToken = (ex.advanceToken || 0) + 1;
  if (ex.advanceTimerId) {
    clearTimeout(ex.advanceTimerId);
    ex.advanceTimerId = null;
  }
}

function renderNotationSymbolPromptPanel(ex, targetGrid = document.getElementById("barsGrid")) {
  if (!ex || !targetGrid) return;
  const panel = document.createElement("div");
  panel.className = `notation-staff-panel notation-symbol-panel is-${ex.promptKind || "symbol-to-meaning"}${ex.notationPanelState ? " " + ex.notationPanelState : ""}`;
  panel.id = "notationStaffPanel";

  if (ex.promptKind === "flow-order") {
    panel.innerHTML = `
      <div class="nts-prompt-flow-wrap" dir="ltr">${buildNotationFlowDiagramSVG(ex.flowScenarioId)}</div>
      <div class="nts-prompt-question">${escapeHtml(ex.promptQuestion || "")}</div>
    `;
  } else if (ex.promptKind === "meaning-to-symbol") {
    panel.innerHTML = `
      <div class="nts-prompt-kind-badge">${escapeHtml(tr("Welches Symbol passt?", "Which symbol matches?"))}</div>
      <div class="nts-prompt-meaning-lead">${escapeHtml(ex.promptQuestion || "")}</div>
    `;
  } else {
    // symbol-to-meaning
    const showTermLine = ex.promptTitle && ex.svgKey && !["largo", "adagio", "andante", "moderato", "allegretto", "allegro", "vivace", "presto", "dolce", "cantabile", "maestoso", "scherzando", "leggiero", "sotto-voce", "pizzicato", "con-sordino", "tutti-solo", "attacca", "simile", "a-tempo", "rubato", "piu-mosso", "meno-mosso", "fine", "dc-al-fine", "morendo"].includes(ex.svgKey);
    panel.innerHTML = `
      <div class="nts-prompt-svg-wrap" dir="ltr">${buildNotationSymbolSVG(ex.svgKey)}</div>
      ${showTermLine ? `<div class="nts-prompt-term-sub">${escapeHtml(ex.promptTitle)}</div>` : ""}
    `;
  }

  targetGrid.innerHTML = "";
  targetGrid.appendChild(panel);
}

function showNotationSymbolHint(ex = state.currentExercise) {
  if (!ex || !ex.isNotationSymbols || ex.isSolved || state.exam?.active) return;
  ex.hintRevealed = true;
  const target = ex.targetItem;
  if (!target) return;
  const hintText = target.tip
    || (ex.promptKind === "flow-order"
        ? tr("Lies zuerst von links nach rechts bis zum Sprungzeichen, ignoriere Fine/Coda im 1. Durchgang!", "Read left to right to the jump sign first, ignoring Fine/Coda on pass 1!")
        : target.explanation);
  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-target");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tr("MERKHILFE", "HINT");
    document.getElementById("stageMainText").textContent = ex.promptKind === "meaning-to-symbol"
      ? (target.abbr || target.termLabel)
      : (target.termLabel || tr("Hinweis", "Hint"));
    document.getElementById("stageFunctionText").textContent = hintText;
  }
  queueFitExerciseLayout(false);
}

function handleNotationSymbolChoice(selectedKey, btnElement, options = {}) {
  const ex = state.currentExercise;
  if (!ex || !ex.isNotationSymbols || !ex.targetItem) return;
  const capturedInputPoint = resolveInputPointFromOptions(options);

  if (state.exam?.active) {
    handleExamNotationSymbolAnswer(ex, selectedKey, btnElement);
    return;
  }
  if (ex.isSolved) return;

  const target = ex.targetItem;
  const isCorrect = selectedKey === target.key;

  if (!isCorrect) {
    resetExerciseStreakOnAttempt(ex);
    if (ex.reviewScope && ex.reviewKey) {
      rememberSessionMistake(ex.reviewScope, ex.reviewKey);
    }
    ex.notationPanelState = "is-wrong";
    btnElement?.classList.add("btn-wrong");
    const panelEl = document.getElementById("notationStaffPanel");
    panelEl?.classList.remove("is-correct");
    panelEl?.classList.add("is-wrong");

    if (document.getElementById("centralStageCard")) {
      setCentralStageMode("stage-wrong");
      updateStageMascot("thinking");
      const chosenMeta = ex.symbolChoiceMeta?.[selectedKey];
      const wrongHint = (ex.promptKind === "meaning-to-symbol" && chosenMeta)
        ? tf("Das war „{term}“ ({short}). Probier es nochmal!", "That was “{term}” ({short}). Try again!", {
            term: chosenMeta.term,
            short: chosenMeta.short
          })
        : (target.tip || tr("Noch nicht ganz – probier eine andere Antwort oder tippe auf „Hinweis“.", "Not quite — try another answer or tap “Hint”."));
      document.getElementById("stageSubtext").textContent = tr("NOCH NICHT GANZ", "NOT QUITE");
      document.getElementById("stageMainText").textContent = tr("Fast!", "Almost!");
      document.getElementById("stageFunctionText").textContent = wrongHint;
    }
    return;
  }

  ex.isSolved = true;
  state.exerciseSolved = true;
  if (ex.reviewScope && ex.reviewKey) {
    recordSessionReviewSuccess(ex.reviewScope, ex.reviewKey);
  }

  btnElement?.classList.remove("btn-wrong");
  btnElement?.classList.add("btn-correct");
  ex.notationPanelState = "is-correct";
  const panelEl = document.getElementById("notationStaffPanel");
  panelEl?.classList.remove("is-wrong");
  panelEl?.classList.add("is-correct");

  const streakRes = recordExerciseStreakSuccess(ex);
  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    triggerCelebrationFeedback(btnElement, { isMilestone: streakRes.isMilestone, inputPoint: capturedInputPoint });
    document.getElementById("stageSubtext").textContent = getPersonalizedCorrectStageSubtext(tr("RICHTIG!", "CORRECT!"));
    document.getElementById("stageMainText").textContent = ex.promptKind === "flow-order"
      ? target.displayName
      : `${target.termLabel} (${target.abbr})`;
    document.getElementById("stageFunctionText").textContent = target.explanation || target.shortMeaning || "";
    renderStageStreakUI();
  }
  updatePlayButtonUI(false);
  queueFitExerciseLayout(false);

  if (state.settings.autoNextAfterCorrect) {
    cancelNotationSymbolAdvance(ex);
    const token = ex.advanceToken;
    ex.advanceTimerId = setTimeout(() => {
      ex.advanceTimerId = null;
      if (state.currentView !== "exercise" || state.currentExercise !== ex || ex.advanceToken !== token || state.exam?.active) return;
      generateExercise();
    }, 1550);
  }
}

function skipNotationSymbol() {
  const ex = state.currentExercise;
  if (!ex || !ex.isNotationSymbols || state.exam?.active || !ex.targetItem) return;
  cancelNotationSymbolAdvance(ex);
  if (ex.isSolved) {
    generateExercise();
    return;
  }
  const target = ex.targetItem;
  resetExerciseStreakOnAttempt(ex);
  if (ex.reviewScope && ex.reviewKey) {
    rememberSessionMistake(ex.reviewScope, ex.reviewKey);
  }
  ex.isSolved = true;
  state.exerciseSolved = true;
  document.querySelectorAll("#degreeButtonsGrid .degree-btn").forEach(el => {
    if (el.dataset.choice === target.key) el.classList.add("btn-correct");
  });
  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-target");
    updateStageMascot("idle");
    document.getElementById("stageSubtext").textContent = tr("AUFLÖSUNG", "SOLUTION");
    document.getElementById("stageMainText").textContent = ex.promptKind === "flow-order"
      ? target.displayName
      : `${target.termLabel} (${target.abbr})`;
    document.getElementById("stageFunctionText").textContent = target.explanation || target.shortMeaning || "";
  }
  updatePlayButtonUI(false);
  queueFitExerciseLayout(false);
}

function skipNotationNote() {
  const ex = state.currentExercise;
  if (ex?.isNotationSymbols) {
    skipNotationSymbol();
    return;
  }
  if (!ex || !isNotationMode(ex.type) || state.exam?.active || !ex.targetItem) return;
  cancelNotationChordAdvance(ex);
  const target = ex.targetItem;
  stopPlayback();
  if (state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }
  ex.notationSkippedCount = (ex.notationSkippedCount || 0) + 1;
  resetExerciseStreakOnAttempt(ex);
  noteNotationReviewAnswer(ex, target, false);

  if (shouldPlayCorrectAnswerAudio()) {
    ensureAudioReady().then(() => {
      if (state.currentView === "exercise" && state.currentExercise === ex && !state.exam?.active) {
        audioEngine.playStep(getNotationPlayNotes(target), target.isChord ? 1.0 : 0.72, null, "interval");
      }
    }).catch(() => {});
  }

  const detailDesc = target.isChord
    ? `${target.inversionDesc || target.ledgerDesc} • ${target.toneNames}`
    : target.ledgerDesc;
  shiftAndAdvanceNotationQueue(
    ex,
    "skip",
    tr("ÜBERSPRUNGEN • DAS WAR:", "SKIPPED • THAT WAS:"),
    target.displayName,
    tf("{clef} • {ledger}", "{clef} • {ledger}", {
      clef: getLocalizedNotationClefName(target.clefId),
      ledger: detailDesc
    }),
    null
  );
}

function revealNotationListenOnly(ex, token) {
  if (!ex || !ex.targetItem || !state.listenOnly?.active || state.listenOnly.token !== token || state.currentView !== "exercise") {
    return;
  }
  const target = ex.targetItem;
  state.listenOnly.phase = "reveal";

  if (ex.isChordReading) {
    document.querySelectorAll("#degreeButtonsGrid .degree-btn").forEach(el => {
      el.classList.remove("btn-wrong");
      el.classList.toggle("btn-correct", el.dataset.choice === target.key);
    });
  } else {
    const keyBtn = document.getElementById(`solfegeKey_${60 + Number(target.pc)}`) ||
      Array.from(document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key"))
        .find(el => parseInt(el.dataset.pc, 10) === Number(target.pc)) || null;
    document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
      el.classList.remove("key-wrong", "key-correct");
    });
    keyBtn?.classList.add("key-correct");
  }

  ex.notationPanelState = "is-correct";
  const panelEl = document.getElementById("notationStaffPanel");
  panelEl?.classList.remove("is-wrong");
  panelEl?.classList.add("is-correct");

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    document.getElementById("stageSubtext").textContent = tr("RICHTIG GELESEN!", "READ CORRECTLY!");
    document.getElementById("stageMainText").textContent = target.displayName;
    document.getElementById("stageFunctionText").textContent = tf("{clef} • {ledger}", "{clef} • {ledger}", {
      clef: getLocalizedNotationClefName(target.clefId),
      ledger: target.isChord ? `${target.inversionDesc || target.ledgerDesc} • ${target.toneNames}` : target.ledgerDesc
    });
  }

  scheduleListenOnlyStep((nextToken) => {
    if (!state.listenOnly?.active || state.listenOnly.token !== nextToken || state.currentView !== "exercise" || state.currentExercise !== ex) {
      return;
    }
    ex.notationSolvedCount = (ex.notationSolvedCount || 0) + 1;
    shiftAndAdvanceNotationQueue(
      ex,
      "listen-advance",
      tr("NUR HÖREN • NOTENLESEN", "LISTEN ONLY • SIGHT-READ"),
      getLocalizedNotationClefName(ex.targetItem?.clefId || ex.baseClefId || "treble"),
      ex.isChordReading
        ? tr("Höre den Akkord & schau auf den ersten Akkord links…", "Hear the chord & read the leftmost chord…")
        : tr("Höre den Ton & schau auf die erste Note links…", "Hear the tone & read the leftmost note…"),
      null
    );
    startListenOnlyCycle();
  }, getNotationListenOnlyAdvanceDelayMs(), token);
}

/**
 * Verarbeitet das Antippen einer Taste auf der Solfège-Klaviatur:
 * - Falsch: Taste wird rot, Nutzer kann weiter tippen.
 * - Richtig: Taste wird grün, Auflösung zur Tonika erklingt (Do-Fa abwärts, Sol-Ti aufwärts)
 *   mit rhythmisch sich verjüngenden Notenwerten hin zur Tonika.
 */
async function handleSolfegeKeyClick(clickedKeyDef, keyBtn, options = {}) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "solfege" || state.solfegeAnswered) return;
  const capturedInputPoint = resolveInputPointFromOptions(options);
  const isListenOnly = Boolean(options.fromListenOnly && state.listenOnly?.active);
  const listenOnlyToken = isListenOnly ? state.listenOnly.token : null;
  if (!options.fromListenOnly && state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }

  prepareAudioNonBlocking();
  if (isListenOnly && (!state.listenOnly?.active || state.listenOnly.token !== listenOnlyToken || state.currentView !== "exercise" || state.currentExercise !== ex || state.solfegeAnswered)) {
    return;
  }

  if (state.exam?.active) {
    handleExamSolfegeAnswer(ex, clickedKeyDef, keyBtn);
    return;
  }

  const target = ex.targetItem;
  // Prüfe, ob die richtige Taste (oder bei Do eine der beiden Do-Tasten) getroffen wurde
  const isCorrect = clickedKeyDef.midi === target.midi ||
    (target.syllable === "Do" && clickedKeyDef.syllable === "Do");

  if (!isListenOnly) noteSessionReviewAnswer(ex, isCorrect);

  if (!isCorrect) {
    // Falsche Antwort: Taste nur rot färben (KEIN Ton erklingt, damit der gehörte Zielton im Ohr bleibt)
    if (!isListenOnly) resetExerciseStreakOnAttempt(ex);
    keyBtn?.classList.add("key-wrong");

    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tr("NOCH NICHT GANZ", "NOT QUITE");
    document.getElementById("stageMainText").textContent = `${getSolfegeDisplayLabel(clickedKeyDef.syllable)}? ${tr("Nein", "No")}`;
    document.getElementById("stageFunctionText").textContent = tr("Tippe weiter oder hör dir den Ton nochmal an!", "Keep trying or replay the tone!");
    return;
  }

  // Richtige Antwort!
  state.solfegeAnswered = true;
  state.exerciseSolved = true;
  ex.isSolved = true;
  if (isListenOnly) {
    state.listenOnly.phase = "reveal";
  }
  audioEngine.stopPlayback();
  state.isPlaying = false;

  const keyboardResolveSeq = target.resolveMidis;
  const audioResolveSeq = target.audioResolveMidis || target.resolveMidis;
  const currentId = audioEngine.playbackId;

  // Alle bisherigen Falsch-Markierungen aufheben (auf weißen & schwarzen Tonleiter-Tasten)
  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-wrong", "key-correct");
  });

  const initialGreenEl = document.getElementById(`solfegeKey_${target.midi}`) || keyBtn;
  initialGreenEl?.classList.add("key-correct");

  const streakRes = isListenOnly
    ? { count: state.streakState?.count || 0, isMilestone: false }
    : recordExerciseStreakSuccess(ex);
  setCentralStageMode("stage-playing");
  updateStageMascot("happy");
  if (!isListenOnly) {
    triggerCelebrationFeedback(keyBtn || initialGreenEl, { isMilestone: streakRes.isMilestone, inputPoint: capturedInputPoint });
  }
  document.getElementById("stageSubtext").textContent = tr("RICHTIG! AUFLÖSUNG ZUR TONIKA", "CORRECT! RESOLVING TO TONIC");
  document.getElementById("stageMainText").textContent = getSolfegeDisplayLabel(target.syllable);
  document.getElementById("stageFunctionText").textContent = target.label;

  updatePlayButtonUI(false);

  // Auflösung zur Tonika abspielen (takt-technisch gestaffelt & gekoppelt an state.activeBpm)
  const resolutionSchedule = buildSolfegeResolutionSchedule(keyboardResolveSeq.length, state.activeBpm);

  keyboardResolveSeq.forEach((kbMidi, idx) => {
    const soundMidi = audioResolveSeq[idx] !== undefined ? audioResolveSeq[idx] : kbMidi;
    const step = resolutionSchedule.steps[idx];
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== currentId) return;

      document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
        el.classList.toggle("key-correct", parseInt(el.dataset.midi, 10) === kbMidi);
      });

      audioEngine.playStep([midiToNote(soundMidi)], step.durationSec, null, "interval");
    }, step.delayMs);
  });

  // Falls Auto-Weiter oder der Nur-Hören-Modus aktiv ist:
  // Nach dem Ausklingen der Auflösung automatisch die nächste Abfrage starten!
  const autoNextDelayMs = resolutionSchedule.totalEndMs + 320;
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== currentId) return;
    if ((state.settings.solfegeAutoNext || isListenOnly) && state.currentView === "exercise" && state.settings.mode === "solfege") {
      if (isListenOnly) {
        if (!state.listenOnly.active || state.listenOnly.token !== listenOnlyToken) return;
        generateExercise();
        startListenOnlyCycle();
      } else {
        generateExercise();
        playSequence();
      }
    }
  }, autoNextDelayMs);
}

