/**
 * Lauscher • Einstiegspunkt: Markenname-Styling & DOMContentLoaded-Initialisierung
 * Die Fachmodule liegen in js/*.js und werden in index.html in fester Reihenfolge geladen.
 */

// =====================================================
// MARKENNAME „Lauscher“: überall fett & kursiv
// Texte werden fast überall per textContent gesetzt. Ein MutationObserver
// umschließt deshalb jedes sichtbare „Lauscher“ automatisch mit
// <span class="brand-word"> (Stil in styles.css).
// =====================================================
const BRAND_WORD = "Lauscher";
const BRAND_WORD_SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT", "OPTION", "TITLE", "NOSCRIPT"]);

function isBrandWordSkippedNode(textNode) {
  let el = textNode.parentElement;
  while (el) {
    if (el.classList?.contains("brand-word")) return true;
    if (BRAND_WORD_SKIP_TAGS.has(el.tagName)) return true;
    if (el.isContentEditable) return true;
    if (el.namespaceURI === "http://www.w3.org/2000/svg") return true;
    el = el.parentElement;
  }
  return false;
}

function wrapBrandWordInTextNode(textNode) {
  const text = textNode.nodeValue;
  if (!text || !text.includes(BRAND_WORD) || !textNode.parentNode) return;
  if (isBrandWordSkippedNode(textNode)) return;
  const frag = document.createDocumentFragment();
  const parts = text.split(BRAND_WORD);
  parts.forEach((part, idx) => {
    if (part) frag.appendChild(document.createTextNode(part));
    if (idx < parts.length - 1) {
      const span = document.createElement("span");
      span.className = "brand-word";
      span.textContent = BRAND_WORD;
      frag.appendChild(span);
    }
  });
  textNode.parentNode.replaceChild(frag, textNode);
}

function wrapBrandWordsIn(root) {
  if (!root) return;
  if (root.nodeType === 3) {
    wrapBrandWordInTextNode(root);
    return;
  }
  if (root.nodeType !== 1 && root.nodeType !== 11) return;
  if (!root.textContent || !root.textContent.includes(BRAND_WORD)) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const hits = [];
  while (walker.nextNode()) {
    if (walker.currentNode.nodeValue.includes(BRAND_WORD)) hits.push(walker.currentNode);
  }
  hits.forEach(wrapBrandWordInTextNode);
}

function startBrandWordStyling() {
  if (typeof document === "undefined" || !document.body || typeof MutationObserver !== "function") return;
  wrapBrandWordsIn(document.body);
  const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
      if (m.type === "characterData") {
        wrapBrandWordsIn(m.target);
      } else {
        m.addedNodes.forEach(node => wrapBrandWordsIn(node));
      }
    }
  });
  observer.observe(document.body, { childList: true, characterData: true, subtree: true });
}

function initPwaServiceWorker() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  if (typeof window === "undefined" || !window.location) return;
  try {
    if (window.Capacitor && typeof window.Capacitor.isNativePlatform === "function" && window.Capacitor.isNativePlatform()) {
      return;
    }
  } catch (_) {}
  const proto = window.location.protocol;
  const host = window.location.hostname;
  const isLocal = host === "localhost" || host === "127.0.0.1" || host === "[::1]";
  if (proto !== "https:" && !(proto === "http:" && isLocal)) return;

  const register = () => {
    navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).catch(() => {});
  };
  if (document.readyState === "complete") {
    register();
  } else {
    window.addEventListener("load", register, { once: true });
  }
}

/**
 * Bildschirmtastatur (v. a. iOS): Die App scrollt selbst nicht und 100dvh schrumpft beim Einblenden
 * der Tastatur nicht. Liegt ein fokussiertes Textfeld danach unter der Tastatur, wird es in seinem
 * Scroll-Container sichtbar gerückt.
 */
function initKeyboardFocusVisibility() {
  const vv = window.visualViewport;
  if (!vv) return;
  let focusedField = null;
  const ensureFieldVisible = () => {
    const el = focusedField;
    if (!el || document.activeElement !== el) return;
    const rect = el.getBoundingClientRect();
    const visibleTop = vv.offsetTop;
    const visibleBottom = vv.offsetTop + vv.height;
    if (rect.bottom > visibleBottom - 8 || rect.top < visibleTop) {
      try {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
      } catch (_) {
        el.scrollIntoView();
      }
    }
  };
  document.addEventListener("focusin", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLElement)) return;
    if (!el.matches('input[type="text"], input[type="number"], input[type="search"], input:not([type]), textarea')) return;
    focusedField = el;
    setTimeout(ensureFieldVisible, 350);
  });
  document.addEventListener("focusout", () => {
    focusedField = null;
  });
  vv.addEventListener("resize", ensureFieldVisible);
}

document.addEventListener("DOMContentLoaded", () => {
  // Gemerkten Übungsstand (Übung, Stufen, Optionen) übernehmen – erst hier sind alle Kataloge geladen
  applyPracticeProgressToSettings();
  startBrandWordStyling();
  initExerciseFitObserver();
  initAnswerFeedbackAnnouncer();
  if (typeof initExerciseTutorialUI === "function") {
    initExerciseTutorialUI();
  }
  bindGlobalPointerInputTracker();
  hydrateMascotStaticSlots();
  startMascotAmbientRotation();
  if (typeof applyStaticDomLanguage === "function") {
    applyStaticDomLanguage(state.settings.language);
  }
  // Wissenstexte der aktiven Sprache (außer DE/EN) nachladen; bis dahin gilt der englische Fallback
  requestKnowledgeLanguage(state.settings.language);
  syncLanguageControls(state.settings.language);
  // Kopfzeilen-Titel ("Übungen") steht statisch in index.html – beim Start in der aktiven Sprache setzen.
  state.updateHeaderSubtext();
  renderHomeProfileGreeting();
  renderProfileAccountView();
  populateMixCreatorControls();

  pickRandomQuote();
  state.updateQuickStartLabel();
  renderKnowledgeHub();
  generateExercise();

  // Globale Aktivitätserfassung für die Hintergrund-Pausen-Erinnerung
  let lastActivitySampleMs = 0;
  const onAnyUserActivity = () => {
    const now = Date.now();
    if (now - lastActivitySampleMs < 1000) return;
    lastActivitySampleMs = now;
    markSessionActivity();
  };
  document.addEventListener("pointerdown", onAnyUserActivity);
  document.addEventListener("keydown", onAnyUserActivity);
  document.addEventListener("scroll", onAnyUserActivity);
  document.addEventListener("visibilitychange", () => {
    const br = state.breakReminder;
    if (!br) return;
    if (document.hidden) {
      br.hiddenSinceWallMs = Date.now();
    } else {
      br.hiddenSinceWallMs = null;
      br.lastActivityWallMs = Date.now();
    }
  });

  // Konto-Steuerung: Profil, Übe-Mixe, Notation & Backup
  document.getElementById("profileNameInput")?.addEventListener("input", (e) => {
    state.profile.name = String(e.target.value || "").trim().slice(0, 24);
    saveUserProfile(state.profile);
    const titleEl = document.getElementById("spaceGreetingTitle");
    if (titleEl) {
      titleEl.textContent = state.profile.name
        ? tf("Hallo, {name}!", "Hi, {name}!", { name: state.profile.name })
        : tr("Dein Musiker-Profil", "Your Musician Profile");
    }
    renderHomeProfileGreeting();
  });

  document.getElementById("mixModeSelect")?.addEventListener("change", () => {
    populateMixCreatorControls();
  });
  document.getElementById("mixToggleCreateBtn")?.addEventListener("click", () => {
    const form = document.getElementById("mixCreatorForm");
    if (!form) return;
    if (String(_openProfileDropdownKey || "").startsWith("mix-")) {
      _openProfileDropdownKey = null;
    }
    populateMixCreatorControls();
    form.classList.toggle("hidden");
  });
  document.getElementById("mixCreateCancelBtn")?.addEventListener("click", () => {
    if (String(_openProfileDropdownKey || "").startsWith("mix-")) {
      _openProfileDropdownKey = null;
    }
    document.getElementById("mixCreatorForm")?.classList.add("hidden");
    renderMixCreatorDropdowns();
  });
  document.getElementById("mixCreateSaveBtn")?.addEventListener("click", () => {
    const title = document.getElementById("mixNameInput")?.value || "";
    const mode = document.getElementById("mixModeSelect")?.value || "cadence";
    const level = document.getElementById("mixLevelSelect")?.value || 1;
    const bpm = parseInt(document.getElementById("mixBpmSelect")?.value || "0", 10);
    const created = sanitizeMixEntry({
      id: `mix_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      title: title,
      mode: mode,
      level: level,
      melodyRange: mode === "melody" ? level : "do-fa",
      bpm: bpm
    });
    if (created) {
      state.profile.mixes = [created, ...(state.profile.mixes || [])].slice(0, 16);
      saveUserProfile(state.profile);
      renderProfileMixes();
      if (typeof recordAchievementEvent === "function") {
        recordAchievementEvent({ type: "personal-style" });
      }
      if (document.getElementById("mixNameInput")) document.getElementById("mixNameInput").value = "";
      if (String(_openProfileDropdownKey || "").startsWith("mix-")) {
        _openProfileDropdownKey = null;
      }
      document.getElementById("mixCreatorForm")?.classList.add("hidden");
      renderMixCreatorDropdowns();
    }
  });
  document.getElementById("mixSaveCurrentBtn")?.addEventListener("click", () => {
    captureCurrentExerciseAsMix();
  });

  // Nutzer-Reiter: Eigene Themes (3 Speicherplätze) & RGBA Color-Picker
  document.getElementById("toggleCustomThemeEditorBtn")?.addEventListener("click", () => {
    if (state.customThemeEditor.open) {
      closeCustomThemeEditor(true);
      return;
    }
    const activeSlotIdx = CUSTOM_THEME_SLOT_IDS.indexOf(state.settings.theme);
    const firstEmptyIdx = (state.profile?.customThemes || []).findIndex(slot => !slot);
    const targetSlot = activeSlotIdx >= 0 ? activeSlotIdx : (firstEmptyIdx >= 0 ? firstEmptyIdx : 0);
    openCustomThemeEditor(targetSlot);
  });

  document.querySelectorAll("[data-editor-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.editorSlot, 10) || 0;
      selectCustomThemeEditorSlot(idx);
      renderCustomThemeEditor();
    });
  });

  document.getElementById("customThemeNameInput")?.addEventListener("input", (e) => {
    state.customThemeEditor.name = String(e.target.value || "").slice(0, 28);
    renderCustomThemeMiniPreview();
  });

  document.getElementById("customThemeLoadTemplateBtn")?.addEventListener("click", () => {
    const sel = document.getElementById("customThemeTemplateSelect");
    const tplKey = sel?.value || "waldlichtung-light";
    state.customThemeEditor.colors = getThemeEditorTemplateColors(tplKey);
    if (state.customThemeEditor.activeRole) {
      const activeRgba = parseCssColorToRgba(state.customThemeEditor.colors[state.customThemeEditor.activeRole]);
      state.customThemeEditor.pickerHsv = rgbToHsv(activeRgba);
    }
    syncColorPickerUI();
    if (state.customThemeEditor.open && state.customThemeEditor.livePreview) {
      applyCustomThemeDraftPreview();
    }
  });

  const bindRgbaChannelControl = (channelKey, rangeId, numId) => {
    const onChannelInput = (rawVal) => {
      const ed = state.customThemeEditor;
      if (!ed.activeRole) return;
      const cur = parseCssColorToRgba(ed.colors[ed.activeRole]);
      if (channelKey === "a") {
        cur.a = rangeId === numId ? clampAlpha(rawVal) : clampAlpha(parseFloat(rawVal));
      } else {
        cur[channelKey] = clampByte(rawVal);
      }
      setCustomThemeRoleColorFromRgba(cur, channelKey !== "a");
    };
    document.getElementById(rangeId)?.addEventListener("input", (e) => {
      const val = channelKey === "a" ? (parseFloat(e.target.value) / 100) : e.target.value;
      onChannelInput(val);
    });
    document.getElementById(numId)?.addEventListener("input", (e) => {
      onChannelInput(e.target.value);
    });
  };
  bindRgbaChannelControl("r", "cpRangeR", "cpNumR");
  bindRgbaChannelControl("g", "cpRangeG", "cpNumG");
  bindRgbaChannelControl("b", "cpRangeB", "cpNumB");
  bindRgbaChannelControl("a", "cpRangeA", "cpNumA");

  document.getElementById("cpHueSlider")?.addEventListener("input", (e) => {
    const ed = state.customThemeEditor;
    if (!ed.activeRole) return;
    const h = Math.max(0, Math.min(360, parseInt(e.target.value, 10) || 0));
    ed.pickerHsv = { ...(ed.pickerHsv || { h: 0, s: 100, v: 100 }), h };
    const rgb = hsvToRgb(ed.pickerHsv);
    const cur = parseCssColorToRgba(ed.colors[ed.activeRole]);
    setCustomThemeRoleColorFromRgba({ ...rgb, a: cur.a }, false);
  });

  document.getElementById("cpNativeColorInput")?.addEventListener("input", (e) => {
    const ed = state.customThemeEditor;
    if (!ed.activeRole) return;
    const parsed = parseCssColorToRgba(e.target.value);
    const cur = parseCssColorToRgba(ed.colors[ed.activeRole]);
    setCustomThemeRoleColorFromRgba({ r: parsed.r, g: parsed.g, b: parsed.b, a: cur.a }, true);
  });

  const svPad = document.getElementById("cpSvPad");
  if (svPad) {
    let svDragging = false;
    const updateSvFromPointer = (clientX, clientY) => {
      const ed = state.customThemeEditor;
      if (!ed.activeRole) return;
      const rect = svPad.getBoundingClientRect?.();
      if (!rect || !rect.width || !rect.height) return;
      const xRatio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const yRatio = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      const hue = ed.pickerHsv?.h || 0;
      ed.pickerHsv = { h: hue, s: Math.round(xRatio * 100), v: Math.round((1 - yRatio) * 100) };
      const rgb = hsvToRgb(ed.pickerHsv);
      const cur = parseCssColorToRgba(ed.colors[ed.activeRole]);
      setCustomThemeRoleColorFromRgba({ ...rgb, a: cur.a }, false);
    };
    svPad.addEventListener("pointerdown", (e) => {
      svDragging = true;
      svPad.setPointerCapture?.(e.pointerId);
      updateSvFromPointer(e.clientX, e.clientY);
    });
    svPad.addEventListener("pointermove", (e) => {
      if (svDragging) updateSvFromPointer(e.clientX, e.clientY);
    });
    const endSvDrag = () => { svDragging = false; };
    svPad.addEventListener("pointerup", endSvDrag);
    svPad.addEventListener("pointercancel", endSvDrag);
  }

  document.getElementById("customThemeLivePreviewChk")?.addEventListener("change", (e) => {
    state.customThemeEditor.livePreview = Boolean(e.target.checked);
    if (state.customThemeEditor.livePreview) {
      applyCustomThemeDraftPreview();
    } else {
      applyThemeAndAppearance();
    }
  });

  document.getElementById("customThemeSaveBtn")?.addEventListener("click", () => {
    saveCustomThemeSlot();
  });

  document.getElementById("customThemeCancelBtn")?.addEventListener("click", () => {
    closeCustomThemeEditor(true);
  });

  document.querySelectorAll("[data-notation]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.profile.notation = btn.dataset.notation === "intl" ? "intl" : "de";
      state.profile.notationManual = true;
      saveUserProfile(state.profile);
      applyProfileDisplayChanges();
      renderProfileAccountView();
    });
  });
  document.querySelectorAll("[data-interval-notation]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.profile.intervalNotation = btn.dataset.intervalNotation === "intl" ? "intl" : "de";
      state.profile.intervalNotationManual = true;
      saveUserProfile(state.profile);
      applyProfileDisplayChanges();
      renderProfileAccountView();
    });
  });
  document.querySelectorAll("[data-interval-distance-help]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (typeof setIntervalDistanceHelpPreference === "function") {
        setIntervalDistanceHelpPreference(btn.dataset.intervalDistanceHelp);
      }
    });
  });
  document.querySelectorAll("[data-solfege-labels]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.profile.solfegeLabels = btn.dataset.solfegeLabels === "numbers" ? "numbers" : "syllables";
      saveUserProfile(state.profile);
      applyProfileDisplayChanges();
      renderProfileAccountView();
    });
  });

  document.getElementById("exportProfileBtn")?.addEventListener("click", () => {
    exportUserProfileBackup();
  });
  document.getElementById("exportSaveLocalBtn")?.addEventListener("click", () => {
    saveProfileBackupLocally();
  });
  document.getElementById("exportShareBtn")?.addEventListener("click", () => {
    shareProfileBackup();
  });
  document.getElementById("spaceBackupDisclosure")?.addEventListener("toggle", (e) => {
    if (!e?.target?.open) hideProfileExportChooser();
  });
  document.getElementById("importProfileBtn")?.addEventListener("click", () => {
    const input = document.getElementById("importProfileFile");
    if (!input) return;
    // Android-Dateiauswahl graut .json aus Drive/Downloads oft aus (falscher MIME-Typ) –
    // in der App deshalb ohne Filter; ungültige Dateien fängt importUserProfileJSON ab.
    if (getCapacitorNativePlugin("Filesystem")) input.removeAttribute?.("accept");
    input.click?.();
  });
  document.getElementById("importProfileFile")?.addEventListener("change", (e) => {
    const file = e.target?.files?.[0];
    if (!file || typeof FileReader === "undefined") return;
    const reader = new FileReader();
    reader.onload = () => {
      importUserProfileJSON(reader.result, { confirmOverwrite: true });
    };
    reader.readAsText(file);
    e.target.value = "";
  });
  document.getElementById("resetProfileBtn")?.addEventListener("click", () => {
    const btn = document.getElementById("resetProfileBtn");
    if (!state.resetConfirmArmed) {
      state.resetConfirmArmed = true;
      if (btn) {
        btn.textContent = tr("Wirklich leeren?", "Confirm reset?");
        btn.classList.add("is-confirm-armed");
      }
      setSpaceBackupStatus(tr("Tippe erneut auf „Wirklich leeren?“, um das Konto zurückzusetzen.", "Tap “Confirm reset?” again to reset your local account."), true, { toast: false });
      setTimeout(() => {
        state.resetConfirmArmed = false;
        const b = document.getElementById("resetProfileBtn");
        if (b) {
          b.textContent = tr("Konto zurücksetzen", "Reset Account");
          b.classList.remove("is-confirm-armed");
        }
      }, 4200);
      return;
    }
    resetUserProfile();
  });
  document.getElementById("appResetBtn")?.addEventListener("click", () => {
    // Erster Tipp öffnet die Bestätigung, ein zweiter Tipp an derselben Stelle bricht ab.
    if (state.appResetConfirmArmed) {
      disarmAppResetConfirm();
    } else if (typeof requestExplorerPinProtectedAction === "function" && typeof isExplorerPinLockActive === "function" && isExplorerPinLockActive()) {
      requestExplorerPinProtectedAction(() => armAppResetConfirm(), {
        description: tr(
          "Gib die Eltern-PIN ein, um den App-Reset freizugeben.",
          "Enter the parent PIN to unlock the app reset."
        ),
        returnModal: "settings"
      });
    } else {
      armAppResetConfirm();
    }
  });
  document.getElementById("appResetConfirmBtn")?.addEventListener("click", () => {
    if (!state.appResetConfirmArmed || Date.now() < (state.appResetConfirmReadyAt || 0)) return;
    performFullAppReset();
  });

  const triggerHeroQuoteRefresh = () => {
    pickRandomQuote();
    const tapMood = Math.random() < 0.25 ? "happy" : "idle";
    rotateMascotSlot("heroMascotSvg", tapMood, true, { slot: "hero", forceRotate: true });
  };
  document.getElementById("heroMascotBtn")?.addEventListener("click", triggerHeroQuoteRefresh);
  document.getElementById("refreshQuoteBtn")?.addEventListener("click", triggerHeroQuoteRefresh);

  // Untere 4-Icon Reiter-Navigation
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.nav;
      if (target) navigateToMainTab(target);
    });
  });

  // Zurück-Pfeil oben links
  document.getElementById("backBtn")?.addEventListener("click", () => {
    navigateBackFromUI();
  });

  // Startseite: Übungstyp-Karten öffnen die Kategorie-Unterseite
  document.querySelectorAll("[data-open-category]").forEach(card => {
    card.addEventListener("click", () => {
      openCategoryPage(card.dataset.openCategory);
    });
  });

  // Tools-Tab: Metronom, Tuner & Freies Spiel
  document.getElementById("openMetronomeBtn")?.addEventListener("click", () => {
    openMetronomeView("tools");
  });
  document.getElementById("openTunerBtn")?.addEventListener("click", () => {
    openTunerView("tools");
  });
  document.getElementById("openFreeplayBtn")?.addEventListener("click", () => {
    openFreeplayView("tools");
  });
  document.getElementById("openFretboardBtn")?.addEventListener("click", () => {
    openFretboardView("tools");
  });
  document.getElementById("openCircleBtn")?.addEventListener("click", () => {
    openCircleOfFifthsView("tools");
  });
  document.getElementById("openCapoBtn")?.addEventListener("click", () => {
    openCapoView("tools");
  });
  document.getElementById("openNashvilleBtn")?.addEventListener("click", () => {
    openNashvilleView("tools");
  });
  initMetronomeEventListeners();
  initFreeplayEventListeners();
  initFretboardEventListeners();

  // Wissens-Hub: Reiter (Theorie & Artikel / Instrumentenkunde) & Kacheln
  document.querySelectorAll("[data-ktab]").forEach(btn => {
    btn.addEventListener("click", () => {
      setKnowledgeTab(btn.dataset.ktab);
    });
  });
  setKnowledgeTab(state.activeKnowledgeTab);

  document.querySelectorAll("[data-open-ref]").forEach(tile => {
    tile.addEventListener("click", () => {
      openKnowledgeRef(tile.dataset.openRef);
    });
  });

  // Floating-Button auf der Übungen-Seite: Weiterüben
  document.getElementById("quickStartBtn")?.addEventListener("click", () => {
    state.exerciseReturnView = "home";
    switchView("exercise");
  });

  // Transport-Steuerung in der Übung
  syncAnswerSoundToggleUI();
  document.getElementById("answerSoundToggleBtn")?.addEventListener("click", () => {
    if (state.exam?.active || !isNotationStaffMode(state.currentExercise?.type)) return;
    setPlayCorrectAnswerAudioPreference(!(state.settings.playCorrectAnswerAudio !== false));
  });
  document.getElementById("listenOnlyBtn")?.addEventListener("click", () => {
    if (state.exam?.active || isNotationSymbolsMode(state.currentExercise?.type)) return;
    setListenOnlyMode(!state.listenOnly.active);
  });

  document.getElementById("playBtn")?.addEventListener("click", () => {
    if (typeof isExerciseTutorialActive === "function" && isExerciseTutorialActive()) {
      stopExerciseTutorial({ keepPlayback: false });
    }
    if (state.exam?.active) {
      if (state.exam.currentAnswered && state.exam.feedbackMode === "instant") {
        advanceExamQuestion();
        return;
      }
      if (state.isPlaying) stopPlayback();
      else triggerExamPlayAction();
      return;
    }
    if (state.listenOnly.active) {
      setListenOnlyMode(false);
      return;
    }
    if (state.settings.mode === "solfege" && state.solfegeAnswered) {
      generateExercise();
      playSequence();
      return;
    }
    if (state.isPlaying) stopPlayback();
    else playSequence();
  });

  document.getElementById("skipBtn")?.addEventListener("click", () => {
    if (typeof isExerciseTutorialActive === "function" && isExerciseTutorialActive()) {
      stopExerciseTutorial({ keepPlayback: false });
    }
    if (state.exam?.active) {
      if (state.exam.currentAnswered) {
        advanceExamQuestion();
      } else {
        skipCurrentExamQuestion();
      }
      return;
    }
    if (isNotationMode(state.settings.mode)) {
      skipNotationNote();
      return;
    }
    if (state.listenOnly.active) {
      cancelListenOnlyTimers();
      stopPlayback();
      generateExercise();
      startListenOnlyCycle();
      return;
    }
    stopPlayback();
    generateExercise();
    if (state.settings.mode === "solfege" || state.settings.mode === "melody" || state.settings.mode === "rhythm-dictation" || isSingMatchMode(state.settings.mode)) {
      playSequence();
    }
  });

  document.getElementById("repeatToneBtn")?.addEventListener("click", () => {
    if (isSingMatchMode(state.settings.mode)) {
      playSingMatchTargetReveal();
      return;
    }
    if (state.listenOnly.active) {
      setListenOnlyMode(false, { keepPlayback: true });
    }
    repeatSolfegeTargetTone();
  });

  document.getElementById("examNextQuestionBtn")?.addEventListener("click", () => {
    if (state.exam?.active) advanceExamQuestion();
  });
  document.getElementById("examAbortBtn")?.addEventListener("click", () => {
    requestExamAbort();
  });
  document.getElementById("examContinueBtn")?.addEventListener("click", () => {
    cancelExamAbort();
  });
  document.getElementById("examConfirmAbortBtn")?.addEventListener("click", () => {
    abortCategoryExam();
  });
  document.getElementById("clearExamHistoryBtn")?.addEventListener("click", () => {
    handleClearExamHistoryClick();
  });
  document.getElementById("confirmClearExamHistoryBtn")?.addEventListener("click", () => {
    confirmClearExamHistory();
  });
  document.getElementById("cancelClearExamHistoryBtn")?.addEventListener("click", () => {
    cancelClearExamHistory();
  });
  document.getElementById("toggleAllExamHistoryBtn")?.addEventListener("click", () => {
    state.examHistoryShowAll = !state.examHistoryShowAll;
    renderExamHistoryCard();
  });

  const loopBtn = document.getElementById("loopToggleBtn");
  loopBtn?.addEventListener("click", () => {
    if (state.exam?.active) return;
    if (state.settings.mode === "melody") {
      state.settings.melodyAutoNext = !state.settings.melodyAutoNext;
      loopBtn.classList.toggle("btn-active", state.settings.melodyAutoNext);
    } else if (state.settings.mode === "rhythm-dictation") {
      state.settings.rhythmDictationAutoNext = !state.settings.rhythmDictationAutoNext;
      loopBtn.classList.toggle("btn-active", state.settings.rhythmDictationAutoNext);
    } else if (state.settings.mode === "rhythm-tap") {
      state.settings.rhythmTapAutoNext = !state.settings.rhythmTapAutoNext;
      loopBtn.classList.toggle("btn-active", state.settings.rhythmTapAutoNext);
    } else if (isSingMatchMode(state.settings.mode)) {
      state.settings.singMatchAutoNext = !state.settings.singMatchAutoNext;
      loopBtn.classList.toggle("btn-active", state.settings.singMatchAutoNext);
    } else {
      state.settings.loop = !state.settings.loop;
      if (state.settings.loop && state.listenOnly.active) {
        setListenOnlyMode(false, { keepPlayback: true });
      }
      loopBtn.classList.toggle("btn-active", state.settings.loop);
      if (state.settings.mode === "solfege") {
        const ex = state.currentExercise;
        if (state.settings.loop) {
          if (!state.isPlaying && ex?.solfegePromptPlayed && !state.solfegeAnswered) {
            startSolfegeTargetLoop(true);
          }
        } else if (state.isPlaying && ex?.solfegePromptPlayed && !state.solfegeAnswered) {
          stopPlayback();
        }
      }
    }
  });

  // Tonart-Button links neben Tonika (spielt in Solfège den Tonika-Dreiklang der aktuellen Tonart an)
  document.getElementById("solfegeKeyBtn")?.addEventListener("click", async () => {
    await ensureAudioReady();
    const ex = state.currentExercise;
    const rootMidi = ex?.rootMidi || HARMONIC_DATA.roots[state.currentKey].midi;
    const tonicKey = ex?.tonality === "minor" ? "i" : "I";
    const tonicNotes = buildChordNotes(rootMidi, HARMONIC_DATA.degrees[tonicKey]);
    audioEngine.playStep(tonicNotes.chordNotes, 1.15, tonicNotes.bassNote, "cadence");
  });

  // Tonika / Ausgangston / Rhythmus-Klick-Referenz
  document.getElementById("tonicRefBtn")?.addEventListener("click", async () => {
    const mode = state.settings.mode;
    const ex = state.currentExercise;
    // „… treffen“: Ausgangston bzw. Do in der Stimmlage – direkt im Tipp (iOS), Mikrofon kurz taub schalten
    if (isSingMatchMode(mode) && ex?.singTask) {
      prepareAudioNonBlocking();
      if (typeof abortSingMatchRound === "function") abortSingMatchRound();
      if (typeof setPitchCaptureFloorFrozen === "function") setPitchCaptureFloorFrozen(true);
      audioEngine.playStep([midiToNote(ex.singTask.refMidi)], 1.1, null, "interval");
      setTimeout(() => {
        if (typeof setPitchCaptureFloorFrozen === "function") setPitchCaptureFloorFrozen(false);
      }, 1500);
      return;
    }
    if (isMidiPlayMode(mode) && ex?.midiTask) {
      if (typeof playMidiPlayPrompt === "function") playMidiPlayPrompt(ex);
      return;
    }
    await ensureAudioReady();

    if (mode === "rhythm-tap") {
      if (ex?.blind) return;
      state.settings.rhythmTapClick = !state.settings.rhythmTapClick;
      const btn = document.getElementById("tonicRefBtn");
      const lbl = document.getElementById("tonicRefLabel");
      if (lbl) lbl.textContent = state.settings.rhythmTapClick ? tr("Klick: An", "Click: On") : tr("Klick: Aus", "Click: Off");
      if (btn) btn.classList.toggle("click-muted", !state.settings.rhythmTapClick);
      if (state.settings.rhythmTapClick) {
        audioEngine.triggerPercussion("tick", null, 0.72);
      }
      return;
    }

    if (mode === "prod-tone") {
      if (state.listenOnly.active) {
        setListenOnlyMode(false, { keepPlayback: true });
      }
      audioEngine.stopPlayback();
      audioEngine.playProductionTone(1000, 1.05);
      return;
    }

    if (mode === "prod-eq-noise") {
      if (state.listenOnly.active && (!state.isPlaying || !audioEngine.activeNoiseSession)) {
        setListenOnlyMode(false, { keepPlayback: true });
      }
      await triggerProdEqNoiseComparison(null);
      return;
    }

    if (mode.startsWith("modes-") && ex?.anchorNotes) {
      audioEngine.playStep(ex.anchorNotes, 1.2, null, "cadence");
      return;
    }

    if (isNotationMode(mode)) return;

    if (mode.startsWith("rhythm-")) {
      const beatMs = 60000 / (state.activeBpm || 90);
      audioEngine.playRhythmSequence([
        [0, "accent", 0.92],
        [Math.round(beatMs), "tick", 0.68],
        [Math.round(2 * beatMs), "tick", 0.68],
        [Math.round(3 * beatMs), "tick", 0.68]
      ]);
      return;
    }

    const rootMidi = HARMONIC_DATA.roots[state.currentKey].midi;
    if (isCadenceMode(mode)) {
      const tonicNotes = buildChordNotes(rootMidi, HARMONIC_DATA.degrees[getCadenceTonicKey(ex?.tonality)]);
      audioEngine.playStep(tonicNotes.chordNotes, 1.2, tonicNotes.bassNote, "cadence");
    } else if ((mode.startsWith("interval") || isChordMode(mode)) && ex?.targetItem?.refNote) {
      audioEngine.playStep([ex.targetItem.refNote], 1.1, null, "cadence");
    } else {
      const refNote = midiToNote(rootMidi);
      audioEngine.playStep([refNote], 1.1, null, "cadence");
    }
  });

  // Master-Lautstärke & Mute (oben im Lautstärke-Modal)
  const volSlider = document.getElementById("masterVolSlider");
  const volVal = document.getElementById("masterVolVal");
  const muteBtn = document.getElementById("masterMuteToggle");

  const syncMasterVolumeControls = () => {
    if (volSlider) volSlider.value = String(state.master.volume);
    if (volVal) volVal.textContent = `${Math.round(state.master.volume * 100)}%`;
    if (muteBtn) {
      muteBtn.textContent = state.master.muted ? tr("Stumm", "Muted") : tr("An", "On");
      muteBtn.title = state.master.muted ? tr("Ton einschalten", "Unmute Audio") : tr("Stummschalten", "Mute Audio");
      muteBtn.classList.toggle("muted", Boolean(state.master.muted));
    }
  };
  syncMasterVolumeControls();

  volSlider?.addEventListener("input", async (e) => {
    state.master.volume = parseFloat(e.target.value);
    if (state.master.volume > 0 && state.master.muted) {
      state.master.muted = false;
      muteBtn.textContent = tr("An", "On");
      muteBtn.title = tr("Stummschalten", "Mute Audio");
      muteBtn.classList.remove("muted");
    }
    volVal.textContent = `${Math.round(state.master.volume * 100)}%`;
    await ensureAudioReady();
    audioEngine.setMasterVolume(state.master.volume, state.master.muted);
  });

  muteBtn?.addEventListener("click", async () => {
    state.master.muted = !state.master.muted;
    muteBtn.textContent = state.master.muted ? tr("Stumm", "Muted") : tr("An", "On");
    muteBtn.title = state.master.muted ? tr("Ton einschalten", "Unmute Audio") : tr("Stummschalten", "Mute Audio");
    muteBtn.classList.toggle("muted", state.master.muted);
    await ensureAudioReady();
    audioEngine.setMasterVolume(state.master.volume, state.master.muted);
  });

  // Modals öffnen & schließen
  const mixerModal = document.getElementById("mixerBackdrop");
  const settingsModal = document.getElementById("settingsBackdrop");
  const aboutModal = document.getElementById("aboutBackdrop");
  const breakModal = document.getElementById("breakReminderBackdrop");
  const themeUnlockModal = document.getElementById("themeUnlockBackdrop");
  const homeworkShareModal = document.getElementById("homeworkShareBackdrop");
  const homeworkStartModal = document.getElementById("homeworkStartBackdrop");
  const explorerPinModal = document.getElementById("explorerPinBackdrop");
  if (typeof initHomeworkControls === "function") initHomeworkControls();
  if (typeof initExplorerModeControls === "function") initExplorerModeControls();

  document.getElementById("openAboutFromSettingsBtn")?.addEventListener("click", () => {
    openAboutModal();
  });
  document.getElementById("closeAboutBtn")?.addEventListener("click", () => closeActiveModal());
  document.querySelectorAll("[data-about-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      handleAboutAction(btn.dataset.aboutAction);
    });
  });
  document.getElementById("aboutLegalBackBtn")?.addEventListener("click", () => {
    closeAboutLegal();
  });
  document.getElementById("aboutCopyContactBtn")?.addEventListener("click", () => {
    copyContactAddressToClipboard();
  });

  document.getElementById("openMixerBtn")?.addEventListener("click", () => {
    if (getOpenModalName() === "mixer") return;
    syncMasterVolumeControls();
    setModalVisibility("mixer");
    pushAppHistory("mixer");
  });
  document.getElementById("closeMixerBtn")?.addEventListener("click", () => closeActiveModal());

  document.getElementById("openSettingsBtn")?.addEventListener("click", () => {
    if (getOpenModalName() === "settings") return;
    setModalVisibility("settings");
    pushAppHistory("settings");
  });
  document.getElementById("closeSettingsBtn")?.addEventListener("click", () => closeActiveModal());
  document.getElementById("settingsManageMixesBtn")?.addEventListener("click", () => {
    setModalVisibility(null);
    switchView("space", { skipHistoryPush: true });
    replaceAppHistory(null);
    setTimeout(() => {
      document.getElementById("spaceMixesCard")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
    }, 60);
  });
  // Farbdesigner im Konto → Theme-Auswahl gibt es nur in den App-Einstellungen
  document.getElementById("spaceChooseThemeBtn")?.addEventListener("click", () => {
    if (getOpenModalName() !== "settings") {
      setModalVisibility("settings");
      pushAppHistory("settings");
    }
    setTimeout(() => {
      document.getElementById("settingsAppearanceGroupLabel")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
    }, 60);
  });
  document.getElementById("settingsCustomizeThemesBtn")?.addEventListener("click", () => {
    setModalVisibility(null);
    switchView("space", { skipHistoryPush: true });
    replaceAppHistory(null);
    const activeSlotIdx = CUSTOM_THEME_SLOT_IDS.indexOf(state.settings.theme);
    const firstEmptyIdx = (state.profile?.customThemes || []).findIndex(slot => !slot);
    const targetSlot = activeSlotIdx >= 0 ? activeSlotIdx : (firstEmptyIdx >= 0 ? firstEmptyIdx : 0);
    openCustomThemeEditor(targetSlot);
    setTimeout(() => {
      document.getElementById("spaceThemesCard")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
    }, 60);
  });

  // Schnellstart-Mixe auf der Startseite ein-/ausblenden
  document.querySelectorAll("[data-home-mixes]").forEach(btn => {
    btn.addEventListener("click", () => {
      setHomeQuickMixesEnabled(btn.dataset.homeMixes === "on");
    });
  });

  // Pausen-Erinnerung bei Übungen: Einstellungen & Dialog-Aktionen
  document.querySelectorAll("[data-break-enabled]").forEach(btn => {
    btn.addEventListener("click", () => {
      setBreakReminderEnabled(btn.dataset.breakEnabled !== "off");
    });
  });
  document.getElementById("breakReminderSlider")?.addEventListener("input", (e) => {
    setBreakReminderMinutes(e.target.value);
  });
  document.querySelectorAll("[data-break-preset]").forEach(btn => {
    btn.addEventListener("click", () => {
      setBreakReminderMinutes(btn.dataset.breakPreset);
    });
  });
  document.getElementById("breakTakePauseBtn")?.addEventListener("click", () => {
    dismissBreakReminder("pause");
  });
  document.getElementById("breakContinueBtn")?.addEventListener("click", () => {
    dismissBreakReminder("continue");
  });
  document.getElementById("breakDisableBtn")?.addEventListener("click", () => {
    dismissBreakReminder("disable");
  });
  syncBreakReminderControls();

  [mixerModal, settingsModal, aboutModal, breakModal, themeUnlockModal, homeworkShareModal, homeworkStartModal, explorerPinModal].forEach(backdrop => {
    backdrop?.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        if (backdrop === homeworkStartModal && typeof clearHomeworkUrlHash === "function") {
          clearHomeworkUrlHash();
        }
        if (backdrop === explorerPinModal && typeof closeExplorerPinModalToReturn === "function") {
          closeExplorerPinModalToReturn();
          return;
        }
        closeActiveModal();
      }
    });
  });

  // Direkt im oberen Aufgabenmodul ausklappbare Steuerungen (Tempo-Schieberegler, Tonart, Taktart)
  const moduleBpmBtn = document.getElementById("moduleBpmBtn");
  const moduleKeyBtn = document.getElementById("moduleKeyBtn");
  const moduleNotationKeyBtn = document.getElementById("moduleNotationKeyBtn");
  const moduleNotationPaceBtn = document.getElementById("moduleNotationPaceBtn");
  const moduleTimeSigBtn = document.getElementById("moduleTimeSigBtn");
  const melodyPulseBtn = document.getElementById("melodyPulseBtn");

  const inlineBpmPopover = document.getElementById("inlineBpmPopover");
  const inlineKeyPopover = document.getElementById("inlineKeyPopover");
  const inlineModesRootPopover = document.getElementById("inlineModesRootPopover");
  const modesRootBadge = document.getElementById("targetBarBadge");
  const inlineModesPadPopover = document.getElementById("inlineModesPadPopover");
  const modesPadBtn = document.getElementById("modesPadBtn");
  const inlineNotationKeyPopover = document.getElementById("inlineNotationKeyPopover");
  const inlineNotationPacePopover = document.getElementById("inlineNotationPacePopover");
  const inlineNotationPaceSlider = document.getElementById("inlineNotationPaceSlider");
  const inlineTimeSigPopover = document.getElementById("inlineTimeSigPopover");
  const inlineIntervalHelpPopover = document.getElementById("inlineIntervalHelpPopover");
  const intervalHelpChipBtn = document.getElementById("intervalHelpChipBtn");

  function closeAllInlinePopovers(exceptPopover = null) {
    [
      [inlineBpmPopover, moduleBpmBtn],
      [inlineKeyPopover, moduleKeyBtn],
      [inlineNotationKeyPopover, moduleNotationKeyBtn],
      [inlineNotationPacePopover, moduleNotationPaceBtn],
      [inlineTimeSigPopover, moduleTimeSigBtn],
      [inlineIntervalHelpPopover, intervalHelpChipBtn],
      [inlineModesRootPopover, modesRootBadge],
      [inlineModesPadPopover, modesPadBtn]
    ].forEach(([pop, btn]) => {
      if (pop?.classList.contains("is-pinned")) return;
      if (pop && pop !== exceptPopover) {
        pop.classList.add("hidden");
        btn?.classList.remove("chip-open");
        if (btn === intervalHelpChipBtn) btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  moduleBpmBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllInlinePopovers(inlineBpmPopover);
    const isHidden = inlineBpmPopover.classList.toggle("hidden");
    moduleBpmBtn.classList.toggle("chip-open", !isHidden);
    if (!isHidden && typeof positionOpenModulePopovers === "function") positionOpenModulePopovers();
  });

  document.getElementById("singAlongChipBtn")?.addEventListener("click", (e) => {
    e?.stopPropagation?.();
    closeAllInlinePopovers();
    const ex = state.currentExercise;
    const isOpen = !document.getElementById("singAlongHint")?.classList.contains("hidden");
    state.singAlongExpanded = !isOpen;
    if (isOpen && ex) ex.singIntroShown = false;
    syncSingAlongUI(ex);
    if (typeof queueFitExerciseLayout === "function") queueFitExerciseLayout(isOpen);
  });
  document.getElementById("singAlongDismissBtn")?.addEventListener("click", () => {
    const ex = state.currentExercise;
    if (ex?.singIntroShown && !state.singAlongExpanded && state.profile) {
      state.profile.singAlongIntroDone = true;
      saveUserProfile(state.profile);
    }
    if (ex) ex.singIntroShown = false;
    state.singAlongExpanded = false;
    syncSingAlongUI(ex);
    if (typeof queueFitExerciseLayout === "function") queueFitExerciseLayout(true);
  });
  document.getElementById("singAlongPauseToggle")?.addEventListener("click", () => {
    setSingAlongPreference("singAlongPause", !state.profile?.singAlongPause);
  });
  document.querySelectorAll("[data-sing-tips]").forEach(btn => {
    btn.addEventListener("click", () => setSingAlongPreference("singAlongTips", btn.dataset.singTips === "on"));
  });
  document.querySelectorAll("[data-sing-pause]").forEach(btn => {
    btn.addEventListener("click", () => setSingAlongPreference("singAlongPause", btn.dataset.singPause === "on"));
  });

  // Tonleitern & Modi: Flächen-Chip öffnet An/Aus + Lautstärke
  modesPadBtn?.addEventListener("click", (e) => {
    e?.stopPropagation?.();
    if (state.exam?.active || !inlineModesPadPopover) return;
    closeAllInlinePopovers(inlineModesPadPopover);
    renderModesPadPopover();
    const isHidden = inlineModesPadPopover.classList.toggle("hidden");
    modesPadBtn.classList.toggle("chip-open", !isHidden);
    if (!isHidden && typeof positionOpenModulePopovers === "function") positionOpenModulePopovers();
  });

  melodyPulseBtn?.addEventListener("click", (e) => {
    e?.stopPropagation?.();
    if (state.exam?.active) return;
    closeAllInlinePopovers();
    state.settings.melodyPulse = !state.settings.melodyPulse;
    const pulseOn = Boolean(state.settings.melodyPulse);
    melodyPulseBtn.textContent = pulseOn ? tr("Puls: An", "Pulse: On") : tr("Puls: Aus", "Pulse: Off");
    melodyPulseBtn.classList.toggle("btn-active", pulseOn);
    melodyPulseBtn.classList.toggle("click-muted", !pulseOn);
    if (pulseOn && audioEngine.isInitialized) {
      audioEngine.triggerPercussion("accent", undefined, 0.45);
    }
    state.updateQuickStartLabel();
  });

  moduleKeyBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    dismissCadenceKeyHint(true);
    closeAllInlinePopovers(inlineKeyPopover);
    const isHidden = inlineKeyPopover.classList.toggle("hidden");
    moduleKeyBtn.classList.toggle("chip-open", !isHidden);
    if (!isHidden && typeof positionOpenModulePopovers === "function") positionOpenModulePopovers();
  });

  moduleNotationKeyBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (state.exam?.active) return;
    closeAllInlinePopovers(inlineNotationKeyPopover);
    renderInlineNotationKeyPopover();
    const isHidden = inlineNotationKeyPopover.classList.toggle("hidden");
    moduleNotationKeyBtn.classList.toggle("chip-open", !isHidden);
    if (!isHidden && typeof positionOpenModulePopovers === "function") positionOpenModulePopovers();
  });

  moduleNotationPaceBtn?.addEventListener("click", (e) => {
    e?.stopPropagation?.();
    if (state.exam?.active) return;
    closeAllInlinePopovers(inlineNotationPacePopover);
    syncNotationPaceUI();
    const isHidden = inlineNotationPacePopover.classList.toggle("hidden");
    moduleNotationPaceBtn.classList.toggle("chip-open", !isHidden);
    if (!isHidden && typeof positionOpenModulePopovers === "function") positionOpenModulePopovers();
  });

  inlineNotationPaceSlider?.addEventListener("input", (e) => {
    setNotationListenOnlyPace(e.target.value);
  });

  moduleTimeSigBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllInlinePopovers(inlineTimeSigPopover);
    const isHidden = inlineTimeSigPopover.classList.toggle("hidden");
    moduleTimeSigBtn.classList.toggle("chip-open", !isHidden);
    if (!isHidden && typeof positionOpenModulePopovers === "function") positionOpenModulePopovers();
  });

  intervalHelpChipBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (state.exam?.active || !inlineIntervalHelpPopover) return;
    closeAllInlinePopovers(inlineIntervalHelpPopover);
    const isHidden = inlineIntervalHelpPopover.classList.toggle("hidden");
    intervalHelpChipBtn.classList.toggle("chip-open", !isHidden);
    intervalHelpChipBtn.setAttribute("aria-expanded", String(!isHidden));
    if (!isHidden && typeof positionOpenModulePopovers === "function") positionOpenModulePopovers();
  });

  document.querySelectorAll("[data-inline-interval-help]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (typeof setIntervalDistanceHelpPreference === "function") {
        setIntervalDistanceHelpPreference(btn.dataset.inlineIntervalHelp);
      }
      inlineIntervalHelpPopover?.classList.add("hidden");
      intervalHelpChipBtn?.classList.remove("chip-open");
      intervalHelpChipBtn?.setAttribute("aria-expanded", "false");
    });
  });

  [inlineBpmPopover, inlineKeyPopover, inlineNotationKeyPopover, inlineNotationPacePopover, inlineTimeSigPopover, inlineIntervalHelpPopover, inlineModesRootPopover, inlineModesPadPopover, document.getElementById("inlineSingVoicePopover")].forEach(pop => {
    pop?.addEventListener("click", (e) => e.stopPropagation());
  });

  // Tonleitern & Modi: Grundton-Badge öffnet die Grundton-Auswahl
  const toggleModesRootPopover = (e) => {
    e?.stopPropagation?.();
    if (!modesRootBadge?.classList.contains("module-badge-btn") || !inlineModesRootPopover) return;
    dismissModesRootHint(true);
    closeAllInlinePopovers(inlineModesRootPopover);
    renderModesRootPopover();
    const isHidden = inlineModesRootPopover.classList.toggle("hidden");
    modesRootBadge.classList.toggle("chip-open", !isHidden);
    if (!isHidden && typeof positionOpenModulePopovers === "function") positionOpenModulePopovers();
  };
  modesRootBadge?.addEventListener("click", toggleModesRootPopover);
  modesRootBadge?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleModesRootPopover(e);
    }
  });

  document.addEventListener("click", () => {
    closeAllInlinePopovers();
    if (typeof closeSingMatchVoicePopover === "function") closeSingMatchVoicePopover();
  });

  function setActivePresetButton(presetKey) {
    document.querySelectorAll("[data-preset]").forEach(b => {
      b.classList.toggle("active", b.dataset.preset === presetKey);
    });
  }

  // Mixer Sliders & Presets
  ["Piano", "Guitar", "Strings", "Brass", "Voice", "Bass"].forEach(ch => {
    document.getElementById(`mix${ch}`)?.addEventListener("input", async (e) => {
      const key = ch.toLowerCase();
      state.mixer[key] = parseFloat(e.target.value);
      document.getElementById(`val${ch}`).textContent = `${Math.round(state.mixer[key] * 100)}%`;
      // Sobald ein Preset manuell verändert wird, automatisch "Benutzerdefiniert" aktivieren & Stand sichern
      state.customMixer = { ...state.mixer };
      state.activePreset = "custom";
      setActivePresetButton("custom");
      if (typeof renderFreeplayInstrumentGrid === "function") renderFreeplayInstrumentGrid();
      await ensureAudioReady();
      audioEngine.setMixerGains(state.mixer);
    });
  });

  const MIX_PRESETS = {
    duo:       { piano: 0.90, guitar: 0.85, strings: 0.00, brass: 0.00, voice: 0.00, bass: 0.00 },
    ensemble:  { piano: 0.85, guitar: 0.70, strings: 0.45, brass: 0.00, voice: 0.00, bass: 0.80 },
    orchestra: { piano: 0.35, guitar: 0.00, strings: 0.85, brass: 0.65, voice: 0.00, bass: 0.85 },
    piano:     { piano: 0.90, guitar: 0.00, strings: 0.00, brass: 0.00, voice: 0.00, bass: 0.00 }
  };

  document.querySelectorAll("[data-preset]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const presetKey = btn.dataset.preset;
      const preset = presetKey === "custom" ? state.customMixer : MIX_PRESETS[presetKey];
      if (!preset) return;
      state.activePreset = presetKey;
      setActivePresetButton(presetKey);
      state.mixer = { voice: 0.00, ...preset };
      syncMixerSliders();
      await ensureAudioReady();
      audioEngine.setMixerGains(state.mixer);
    });
  });

  syncMixerSliders();
  setActivePresetButton(state.activePreset);

  // Einstellungen: Tonart, Tempo (Schieberegler inline & Modal), Taktart
  document.querySelectorAll("[data-keymode]").forEach(btn => {
    btn.addEventListener("click", () => {
      const chosenMode = btn.dataset.keymode;
      document.querySelectorAll("[data-keymode]").forEach(b => {
        b.classList.toggle("active", b.dataset.keymode === chosenMode);
      });
      state.settings.keyMode = chosenMode;
      cancelListenOnlyTimers();
      stopPlayback();
      generateExercise();
      if (state.listenOnly.active) {
        startListenOnlyCycle();
      }
    });
  });

  const inlineBpmSlider = document.getElementById("inlineBpmSlider");
  const inlineBpmVal = document.getElementById("inlineBpmVal");

  function syncExerciseBpmUI(newBpm, isManualInExercise = false) {
    if (isManualInExercise) {
      state.hasManualExerciseBpm = true;
    }
    state.settings.randomBpm = false;
    state.settings.bpm = newBpm;
    state.activeBpm = newBpm;

    if (inlineBpmSlider) inlineBpmSlider.value = newBpm;
    if (inlineBpmVal) inlineBpmVal.textContent = `${newBpm} BPM`;
    if (moduleBpmBtn) moduleBpmBtn.textContent = `${newBpm} BPM`;
  }

  // Manueller Tempo-Schieberegler im Übungsmodul:
  inlineBpmSlider?.addEventListener("input", (e) => {
    syncExerciseBpmUI(parseInt(e.target.value, 10), true);
  });

  document.querySelectorAll("[data-timesig]").forEach(btn => {
    btn.addEventListener("click", () => {
      const chosenSig = btn.dataset.timesig;
      document.querySelectorAll("[data-timesig]").forEach(b => {
        b.classList.toggle("active", b.dataset.timesig === chosenSig);
      });
      state.settings.timeSig = chosenSig;
      cancelListenOnlyTimers();
      stopPlayback();
      generateExercise();
      if (state.listenOnly.active) {
        startListenOnlyCycle();
      }
    });
  });

  // Diagnose-Werkzeuge bei Fehlern
  document.getElementById("btnDiagBass")?.addEventListener("click", async () => {
    if (!state.wrongAnswerData) return;
    await ensureAudioReady();
    const ex = state.currentExercise;
    if (ex.type === "cadence") {
      audioEngine.playStep([], 1.2, state.wrongAnswerData.target.bass, "cadence");
    } else if (ex.type === "prod-tone") {
      stopPlayback();
      audioEngine.playProductionTone(1000, 0.95);
    } else if (ex.type === "prod-eq-noise") {
      stopPlayback();
      audioEngine.playProductionNoiseEQ({
        mode: "ab-switch",
        freqHz: state.wrongAnswerData.target.freqHz,
        q: ex.q,
        gainDb: ex.boostDb,
        flatDurationSec: 0.75,
        boostDurationSec: 1.30
      });
    } else if (ex.type.startsWith("modes-")) {
      stopPlayback();
      audioEngine.playStep(ex.anchorNotes, 1.2, null, "cadence");
    } else if (ex.type.startsWith("rhythm-")) {
      const bpm = state.activeBpm || 90;
      if (ex.type === "rhythm-meter") {
        const pulse = buildRhythmMeterEvents(ex.targetItem.key, bpm, 1, true);
        audioEngine.playRhythmSequence(pulse.events);
      } else {
        const beatMs = 60000 / bpm;
        audioEngine.playRhythmSequence([
          [0, "accent", 0.92],
          [Math.round(beatMs), "tick", 0.68],
          [Math.round(2 * beatMs), "tick", 0.68],
          [Math.round(3 * beatMs), "tick", 0.68]
        ]);
      }
    } else if (ex.type === "chord-inversions") {
      stopPlayback();
      audioEngine.playStep([state.wrongAnswerData.target.bassNote || state.wrongAnswerData.target.refNote], 1.3, null, "interval");
    } else if (ex.type === "interval-drone") {
      stopPlayback();
      const padNotes = ex.padNotes || state.wrongAnswerData.target.padNotes || [state.wrongAnswerData.target.refNote];
      audioEngine.playInstrumentSample("strings", padNotes, 1.85, 0, audioEngine.dronePadGainScale, { attackSec: 0.14, releaseSec: 0.85 });
    } else {
      audioEngine.playStep([state.wrongAnswerData.target.refNote], 1.3, null, "interval");
    }
  });

  document.getElementById("btnDiagCompare")?.addEventListener("click", async () => {
    if (!state.wrongAnswerData) return;
    await ensureAudioReady();
    // Fester Bezug: „Weiter“ setzt state.wrongAnswerData auf null, während Timer noch laufen
    const diag = state.wrongAnswerData;
    if (!diag) return;
    const ex = state.currentExercise;
    const rootMidi = HARMONIC_DATA.roots[state.currentKey].midi;

    if (ex.type === "prod-tone") {
      stopPlayback();
      audioEngine.playProductionTone(diag.chosen.freqHz, 0.85);
      audioEngine.registerTimer(() => {
        audioEngine.playProductionTone(diag.target.freqHz, 1.05);
      }, 1100);
    } else if (ex.type === "prod-eq-noise") {
      stopPlayback();
      audioEngine.playProductionNoiseEQ({
        mode: "boost-only",
        freqHz: diag.chosen.freqHz,
        q: ex.q,
        gainDb: ex.boostDb,
        durationSec: 1.05
      });
      audioEngine.registerTimer(() => {
        audioEngine.playProductionNoiseEQ({
          mode: "boost-only",
          freqHz: diag.target.freqHz,
          q: ex.q,
          gainDb: ex.boostDb,
          durationSec: 1.25
        });
      }, 1350);
    } else if (ex.type.startsWith("modes-")) {
      stopPlayback();
      const dur1 = playModeExercisePattern(ex, diag.chosen, 0);
      playModeExercisePattern(ex, diag.target, dur1 + 420);
    } else if (ex.type === "rhythm-meter") {
      const bpm = state.activeBpm || 90;
      const chosenBar = buildRhythmMeterEvents(diag.chosen.key, bpm, 1, false);
      const targetBar = buildRhythmMeterEvents(diag.target.key, bpm, 1, false);
      audioEngine.stopPlayback();
      const baseSec = getAudioClockSec() + 0.04;
      audioEngine.playRhythmSequence(chosenBar.events, baseSec);
      const gapMs = Math.round(chosenBar.totalMs + 340);
      audioEngine.registerTimer(() => {
        audioEngine.playRhythmSequence(targetBar.events);
      }, gapMs);
    } else if (ex.type === "rhythm-groove") {
      const bpm = state.activeBpm || 90;
      const sliceBar = (key) => {
        const res = buildRhythmGrooveEvents(ex, key, bpm);
        if (ex.grooveKind === "offbeat") {
          const filtered = res.events
            .filter(([t]) => t >= res.barMs - 10)
            .map(([t, k, v]) => [Math.max(0, Math.round(t - res.barMs)), k, v]);
          return { events: filtered, barMs: res.barMs };
        }
        return {
          events: res.events.filter(([t]) => t < res.barMs - 10),
          barMs: res.barMs
        };
      };
      const chosenSlice = sliceBar(diag.chosen.key);
      const targetSlice = sliceBar(diag.target.key);
      audioEngine.stopPlayback();
      audioEngine.playRhythmSequence(chosenSlice.events);
      audioEngine.registerTimer(() => {
        audioEngine.playRhythmSequence(targetSlice.events);
      }, Math.round(chosenSlice.barMs + 360));
    } else if (ex.type === "cadence") {
      stopPlayback();
      const chosen = buildChordNotes(rootMidi, diag.chosen);
      const target = diag.target;
      const comparePlaybackId = audioEngine.playbackId;
      audioEngine.playStep(chosen.chordNotes, 0.9, chosen.bassNote, "cadence");
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== comparePlaybackId || !target?.notes) return;
        audioEngine.playStep(target.notes, 1.2, target.bass, "cadence");
      }, 1000);
    } else if (ex.type === "interval-melodic" || ex.type === "interval-melodic-down") {
      stopPlayback();
      const cmpId = audioEngine.playbackId;
      const baseRootMidi = ex.targetItem.rootMidi ?? rootMidi;
      const dirSign = ex.type === "interval-melodic-down" ? -1 : 1;
      const refNote = ex.targetItem.refNote || midiToNote(baseRootMidi);
      const chosenTarget = midiToNote(baseRootMidi + dirSign * diag.chosen.semitones);
      const actualTarget = diag.target.targetNote;
      const { stepMs, note1DurSec, note2DurSec } = getMelodicIntervalTiming(state.activeBpm);
      const pauseBetweenPairsMs = Math.max(420, Math.round(stepMs * 0.75));
      const secondPairStartMs = stepMs + Math.round(note2DurSec * 1000) + pauseBetweenPairsMs;

      if (typeof renderStageIntervalVisual === "function") {
        renderStageIntervalVisual(ex, { mode: "compare-a", chosenDef: diag.chosen });
      }
      audioEngine.playStep([refNote], note1DurSec, null, "cadence");
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== cmpId) return;
        audioEngine.playStep([chosenTarget], note2DurSec, null, "cadence");
      }, stepMs);
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== cmpId) return;
        if (typeof renderStageIntervalVisual === "function") {
          renderStageIntervalVisual(ex, { mode: "compare-b" });
        }
        audioEngine.playStep([refNote], note1DurSec, null, "cadence");
      }, secondPairStartMs);
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== cmpId) return;
        audioEngine.playStep([actualTarget], note2DurSec, null, "cadence");
      }, secondPairStartMs + stepMs);
    } else if (isChordQualityMode(ex.type)) {
      stopPlayback();
      const cmpId = audioEngine.playbackId;
      const baseRoot = ex.targetItem.rootMidi || rootMidi;
      const chosenNotes = (diag.chosen.offsets || [0, 4, 7]).map(s => midiToNote(baseRoot + s));
      const targetNotes = diag.target.notes || [];

      if (isChordArpeggioMode(ex.type)) {
        const reverse = ex.type === "chord-arp-down";
        const seqChosen = reverse ? [...chosenNotes].reverse() : chosenNotes;
        const seqTarget = reverse ? [...targetNotes].reverse() : targetNotes;
        const tChosen = getChordArpeggioPromptTiming(seqChosen.length, state.activeBpm);
        const tTarget = getChordArpeggioPromptTiming(seqTarget.length, state.activeBpm);
        const scheduleArp = (seq, timing, baseOffsetMs) => {
          seq.forEach((note, idx) => {
            const dur = idx === seq.length - 1 ? timing.lastNoteDurSec : timing.noteDurSec;
            const atMs = baseOffsetMs + idx * timing.stepMs;
            if (atMs === 0) {
              audioEngine.playStep([note], dur, null, "cadence");
            } else {
              audioEngine.registerTimer(() => {
                if (audioEngine.playbackId !== cmpId) return;
                audioEngine.playStep([note], dur, null, "cadence");
              }, atMs);
            }
          });
        };
        scheduleArp(seqChosen, tChosen, 0);
        scheduleArp(seqTarget, tTarget, tChosen.cycleMs);
      } else {
        audioEngine.playStep(chosenNotes, 1.05, null, "cadence");
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== cmpId) return;
          audioEngine.playStep(targetNotes, 1.25, null, "cadence");
        }, 1150);
      }
    } else if (ex.type === "chord-inversions") {
      stopPlayback();
      const cmpId = audioEngine.playbackId;
      const baseRoot = ex.targetItem.rootMidi ?? rootMidi;
      const chosenStep = diag.chosen.stepIndex ?? 0;
      const chosenInv = buildChordInversionNotes(baseRoot, ex.chordKey, chosenStep, ex.rootKey || state.currentKey);
      audioEngine.playStep(chosenInv.notes, 1.05, null, "cadence");
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== cmpId) return;
        audioEngine.playStep(diag.target.notes, 1.25, null, "cadence");
      }, 1150);
    } else if (ex.type === "interval-drone") {
      stopPlayback();
      const cmpId = audioEngine.playbackId;
      const baseRootMidi = ex.targetItem.rootMidi ?? rootMidi;
      const padNotes = ex.padNotes || [midiToNote(baseRootMidi - 12), ex.targetItem.refNote || midiToNote(baseRootMidi)];
      const chosenTarget = midiToNote(baseRootMidi + diag.chosen.semitones);
      const actualTarget = diag.target.targetNote;
      if (typeof renderStageIntervalVisual === "function") {
        renderStageIntervalVisual(ex, { mode: "compare-a", chosenDef: diag.chosen });
      }
      audioEngine.playDroneIntervalCue(padNotes, [chosenTarget], { delayMs: 650, padDurSec: 1.75, pianoDurSec: 0.95 });
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== cmpId) return;
        if (typeof renderStageIntervalVisual === "function") {
          renderStageIntervalVisual(ex, { mode: "compare-b" });
        }
        audioEngine.playDroneIntervalCue(padNotes, [actualTarget], { delayMs: 650, padDurSec: 1.9, pianoDurSec: 1.1 });
      }, 1950);
    } else {
      stopPlayback();
      const cmpId = audioEngine.playbackId;
      const baseRootMidi = ex.targetItem.rootMidi ?? rootMidi;
      const refNote = ex.targetItem.refNote || midiToNote(baseRootMidi);
      const chosenTarget = midiToNote(baseRootMidi + diag.chosen.semitones);
      const stepMode = ex.type === "interval-harmonic" ? "interval-harmonic" : "cadence";

      if (typeof renderStageIntervalVisual === "function") {
        renderStageIntervalVisual(ex, { mode: "compare-a", chosenDef: diag.chosen });
      }
      audioEngine.playStep([refNote, chosenTarget], 1.15, null, stepMode);
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== cmpId) return;
        if (typeof renderStageIntervalVisual === "function") {
          renderStageIntervalVisual(ex, { mode: "compare-b" });
        }
        audioEngine.playStep(diag.target.notes, 1.35, null, stepMode);
      }, 1250);
    }
  });

  // Browser- & Android-Zurück-Geste / Zurück-Taste via History API synchronisieren
  appHistoryState.idx = 0;
  replaceAppHistory(null);

  window.addEventListener("popstate", (e) => {
    if (e.state && typeof e.state.idx === "number") {
      applyHistorySnapshot(e.state);
    } else {
      applyHistorySnapshot({
        idx: 0,
        view: "home",
        activeCategory: state.activeCategory,
        knowledgeTab: state.activeKnowledgeTab,
        knowledgeDetail: null,
        exerciseReturnView: state.exerciseReturnView,
        modal: null
      });
    }
  });

  initStartupSplash();
  const initPianoPrefs = getActivePianoSoundSettings();
  const initDroneMix = getActiveDroneMixSettings();
  audioEngine?.setPianoSoundProfile?.(initPianoPrefs.character, initPianoPrefs.reverb);
  audioEngine?.setDroneIntervalMix?.(initDroneMix.pad, initDroneMix.tone);
  if (typeof audioEngine?.preload === "function") {
    Promise.resolve(audioEngine.preload(state.master.volume, state.master.muted, state.mixer)).catch(() => {});
  }
  // iOS Safari / WKWebView Audio-Unlock: aktiv bleiben bis AudioContext wirklich "running"
  // und AudioSession entsperrt sind (touchstart/pointerdown allein genügen auf iOS oft nicht).
  const audioUnlockEvents = ["pointerdown", "touchstart", "touchend", "click", "keydown"];
  let audioUnlockListenersBound = false;
  const disarmAudioUnlockListeners = () => {
    if (!audioUnlockListenersBound) return;
    audioUnlockListenersBound = false;
    audioUnlockEvents.forEach((evt) => {
      document.removeEventListener?.(evt, onAudioUnlockGesture, true);
    });
  };
  const onAudioUnlockGesture = () => {
    unlockWebAudioSync();
    if (typeof audioEngine?.preload === "function" && !audioEngine.preparePromise) {
      Promise.resolve(audioEngine.preload(state.master.volume, state.master.muted, state.mixer)).catch(() => {});
    }
    if (typeof audioEngine?.isAudioUnlocked === "function" && audioEngine.isAudioUnlocked()) {
      disarmAudioUnlockListeners();
    }
  };
  const armAudioUnlockListeners = () => {
    if (audioUnlockListenersBound) return;
    audioUnlockListenersBound = true;
    audioUnlockEvents.forEach((evt) => {
      document.addEventListener(evt, onAudioUnlockGesture, true);
    });
  };
  armAudioUnlockListeners();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      if (typeof audioEngine?.isAudioUnlocked !== "function" || !audioEngine.isAudioUnlocked()) {
        audioEngine?.markAudioSessionInterrupted?.();
        armAudioUnlockListeners();
      }
      if (typeof onMidiAppForeground === "function") onMidiAppForeground();
    } else if (document.visibilityState === "hidden") {
      if (typeof onMidiAppBackground === "function") onMidiAppBackground();
      if (isIOSLikeDevice() && !window.Capacitor?.isNativePlatform?.()) {
        // iOS-Safari/Home-Bildschirm-App: WebAudio wird im Hintergrund unterbrochen → Sitzungen sauber stoppen
        // (die Android-App erledigt das über appStateChange in initCapacitorNativeBridge)
        if (typeof stopAllAudioSessionsForBackground === "function") stopAllAudioSessionsForBackground();
      }
    }
  });
  // Unterbrechung bei sichtbarer Seite (Siri, Wecker, Anruf-Banner): Unlock-Listener neu scharf stellen,
  // damit schon der nächste beliebige Tipp die Ausgabe wieder freigibt
  if (audioEngine) {
    audioEngine.onSessionInterrupted = () => {
      if (document.visibilityState === "visible") armAudioUnlockListeners();
    };
  }
  initTabSwipeNavigation();
  initCapacitorNativeBridge();
  initPwaServiceWorker();
  if (typeof initAchievementsSystem === "function") {
    initAchievementsSystem();
  }
  applyThemeAndAppearance();
  syncAutoNextControls();
  if (typeof initTapLatencySettings === "function") initTapLatencySettings();
  if (typeof initMidiModule === "function") initMidiModule();
  document.getElementById("midiDirChipBtn")?.addEventListener("click", () => {
    if (typeof cycleMidiIntervalDirection === "function") cycleMidiIntervalDirection();
  });
  if (typeof initStoragePersistence === "function") initStoragePersistence().catch(() => {});
  initKeyboardFocusVisibility();
  syncPianoSoundControls();
  syncDroneMixControls();

  document.getElementById("dronePadVolSlider")?.addEventListener("input", (e) => {
    const pct = parseFloat(e.target.value);
    if (Number.isFinite(pct)) {
      setDroneMixValue("pad", pct / 100);
    }
  });

  document.getElementById("droneToneVolSlider")?.addEventListener("input", (e) => {
    const pct = parseFloat(e.target.value);
    if (Number.isFinite(pct)) {
      setDroneMixValue("tone", pct / 100);
    }
  });

  document.querySelectorAll("[data-mixer-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      switchMixerTab(btn.dataset.mixerTab);
    });
  });

  document.querySelectorAll("[data-piano-char]").forEach(btn => {
    btn.addEventListener("click", () => {
      setPianoCharacterPreference(btn.dataset.pianoChar);
    });
  });

  document.querySelectorAll("[data-reverb-slider]").forEach(slider => {
    slider.addEventListener("input", (e) => {
      const pct = parseFloat(e.target.value);
      if (Number.isFinite(pct)) {
        setInstrumentReverbPreference(slider.dataset.reverbSlider, pct / 100);
      }
    });
  });

  document.querySelectorAll("[data-reverb-preview]").forEach(btn => {
    btn.addEventListener("click", () => {
      previewInstrumentReverbSound(btn.dataset.reverbPreview);
    });
  });

  const languageSelectEl = document.getElementById("languageSelect");
  if (languageSelectEl) {
    languageSelectEl.addEventListener("change", () => {
      if (typeof isLanguageAvailable === "function" && !isLanguageAvailable(languageSelectEl.value)) {
        syncLanguageControls(state.settings.language);
        return;
      }
      setLanguagePreference(languageSelectEl.value);
    });
  }

  document.querySelectorAll("[data-auto-next]").forEach(btn => {
    btn.addEventListener("click", () => {
      setAutoNextPreference(btn.dataset.autoNext);
    });
  });

  document.querySelectorAll("button[data-appearance]").forEach(btn => {
    btn.addEventListener("click", () => {
      setAppearancePreference(btn.dataset.appearance);
    });
  });

  document.querySelectorAll("[data-theme-choice]").forEach(card => {
    card.addEventListener("click", () => {
      setThemePreference(card.dataset.themeChoice);
    });
  });

  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    const colorSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemAppearanceChange = () => {
      if (state.settings.appearance === "system") {
        applyThemeAndAppearance();
      }
    };
    if (typeof colorSchemeMedia.addEventListener === "function") {
      colorSchemeMedia.addEventListener("change", onSystemAppearanceChange);
    } else if (typeof colorSchemeMedia.addListener === "function") {
      colorSchemeMedia.addListener(onSystemAppearanceChange);
    }
  }

  // Subtile Auswahl-/Tipp-Animation auf allen interaktiven Kacheln & Auswahlelementen
  document.addEventListener("click", (e) => {
    const tile = typeof e.target?.closest === "function"
      ? e.target.closest(
          ".category-nav-card, .subpage-node-btn, .warmup-range-btn, .ref-hub-card, .degree-btn, .opt-btn:not(:disabled), .theme-preview-item, .popover-pill-btn, .k-filter-pill, .knowledge-tab-btn, .tonic-btn, .answer-sound-btn, .listen-only-btn, .warmup-phase-pill, .overtone-btn, .category-help-btn, .btn-primary-action, .btn-secondary-action, .module-chip-btn, .btn-tool"
        )
      : null;
    if (tile) triggerTilePulse(tile);
  });

  // Transport-Steuerung im Einsing-Helfer (#viewWarmup)
  document.getElementById("warmupVoiceBtn")?.addEventListener("click", () => {
    toggleWarmupPopover("warmupVoicePopover", "warmupVoiceBtn");
  });
  document.getElementById("warmupSoundBtn")?.addEventListener("click", () => {
    toggleWarmupPopover("warmupSoundPopover", "warmupSoundBtn");
  });
  document.getElementById("warmupBpmBtn")?.addEventListener("click", () => {
    toggleWarmupPopover("warmupBpmPopover", "warmupBpmBtn");
  });

  document.querySelectorAll("[data-warmup-voice]").forEach(btn => {
    btn.addEventListener("click", () => {
      setWarmupVoiceRange(btn.dataset.warmupVoice);
    });
  });

  document.querySelectorAll("[data-warmup-sound]").forEach(btn => {
    btn.addEventListener("click", () => {
      setWarmupSoundMode(btn.dataset.warmupSound);
    });
  });

  document.getElementById("warmupBpmSlider")?.addEventListener("input", (e) => {
    setWarmupBpm(parseInt(e.target.value, 10) || WARMUP_DEFAULT_BPM);
  });

  document.getElementById("warmupKeyDownBtn")?.addEventListener("click", () => {
    shiftWarmupTranspose(-1);
  });
  document.getElementById("warmupReplayStepBtn")?.addEventListener("click", () => {
    replayWarmupRound();
  });
  document.getElementById("warmupKeyUpBtn")?.addEventListener("click", () => {
    shiftWarmupTranspose(1);
  });
  document.getElementById("warmupPrevBtn")?.addEventListener("click", () => {
    stepWarmupIndex(-1);
  });
  document.getElementById("warmupPlayBtn")?.addEventListener("click", () => {
    toggleWarmupPlayPause();
  });
  document.getElementById("warmupNextBtn")?.addEventListener("click", () => {
    stepWarmupIndex(1);
  });

  // Leertaste als Takt-/Tap-Taste (Rhythmus) bzw. Start/Pause (Einsing-Helfer); Escape schließt Tutorial
  document.addEventListener("keydown", (e) => {
    const tutorialOpen = typeof isExerciseTutorialActive === "function" && isExerciseTutorialActive();
    if (e.key === "Escape" && tutorialOpen && !getOpenModalName()) {
      dismissExerciseTutorialByUser();
      return;
    }
    // Escape schließt das offene Modal (offene Dropdowns fangen Escape vorher selbst ab)
    if (e.key === "Escape" && !e.defaultPrevented && getOpenModalName()) {
      e.preventDefault();
      closeActiveModal();
      return;
    }
    if (e.code !== "Space" && e.key !== " ") return;
    if (e.repeat) return;
    const tag = e.target?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    // Per Tastatur fokussierte Bedienelemente behalten die Leertaste (Knopf auslösen, Dropdown öffnen) –
    // außer dem Tap-Pad, das genau dafür da ist. Nach Mausklick (kein :focus-visible) bleibt die Abkürzung.
    const focusedControl = e.target?.closest?.('button, a[href], summary, [role="button"], [role="option"], [role="listbox"], [role="menuitem"], [role="switch"], [role="checkbox"], [contenteditable=""], [contenteditable="true"]');
    if (focusedControl && focusedControl.id !== "rhythmTapPadBtn") {
      let keyboardFocused = true;
      try { keyboardFocused = focusedControl.matches(":focus-visible"); } catch (_) {}
      if (keyboardFocused) return;
    }
    if (getOpenModalName()) return;

    if (state.currentView === "warmup") {
      e.preventDefault();
      toggleWarmupPlayPause();
      return;
    }

    if (state.currentView === "metronome") {
      e.preventDefault();
      toggleMetronomePlayback();
      return;
    }

    if (state.currentView !== "exercise" || state.settings.mode !== "rhythm-tap" || state.listenOnly?.active) return;
    // Offenes Tutorial: Leertaste darf weder Wiedergabe starten noch in die Vorführung tippen
    if (tutorialOpen) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const session = state.rhythmTapSession;
    if (session && !session.ended) {
      if (session.phase === "listen") {
        handleRhythmTapInput();
      }
    } else if (!state.isPlaying) {
      if (state.exam?.active) {
        if (!state.exam.currentAnswered) triggerExamPlayAction();
      } else {
        playSequence();
      }
    }
  });
});
