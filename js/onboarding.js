// =====================================================
// WILLKOMMENS-ASSISTENT & STARTBILDSCHIRM (#welcomeOnboarding, #startupSplash)
// =====================================================

const WELCOME_WIZARD_STEPS = [
  "welcomeStepLang",
  "welcomeStepLook",
  "welcomeStepProfile",
  "welcomeStepFocus",
  "welcomeStepGreet"
];

const BEGINNER_WELCOME_WIZARD_STEPS = [
  "welcomeStepLang",
  "welcomeStepLook",
  "welcomeStepProfile",
  "welcomeStepFocus",
  "welcomeStepBeginner1",
  "welcomeStepBeginner2",
  "welcomeStepBeginner3",
  "welcomeStepGreet"
];

const _welcomeOnboardingState = {
  currentStep: 0,
  beginnerIntroOptIn: false,
  beginnerPresetApplied: false,
  selecting: false,
  exiting: false,
  stepTimer: null,
  autoTimer: null,
  exitTimer: null
};

function getActiveWelcomeWizardSteps() {
  return _welcomeOnboardingState.beginnerIntroOptIn
    ? BEGINNER_WELCOME_WIZARD_STEPS
    : WELCOME_WIZARD_STEPS;
}

function clearWelcomeOnboardingTimers() {
  if (_welcomeOnboardingState.stepTimer) {
    clearTimeout(_welcomeOnboardingState.stepTimer);
    _welcomeOnboardingState.stepTimer = null;
  }
  if (_welcomeOnboardingState.autoTimer) {
    clearTimeout(_welcomeOnboardingState.autoTimer);
    _welcomeOnboardingState.autoTimer = null;
  }
  if (_welcomeOnboardingState.exitTimer) {
    clearTimeout(_welcomeOnboardingState.exitTimer);
    _welcomeOnboardingState.exitTimer = null;
  }
}

function getWelcomeText(key, fallback) {
  const lang = state?.settings?.language || "de";
  return (typeof getStaticI18nText === "function" && getStaticI18nText(key, lang)) || fallback;
}

function syncWelcomeBeginnerOptInUI() {
  const optIn = Boolean(_welcomeOnboardingState.beginnerIntroOptIn);
  const noBtn = document.getElementById("welcomeBeginnerOptInNoBtn");
  const yesBtn = document.getElementById("welcomeBeginnerOptInYesBtn");
  if (noBtn) {
    noBtn.classList.toggle("active", !optIn);
    noBtn.setAttribute?.("aria-pressed", String(!optIn));
  }
  if (yesBtn) {
    yesBtn.classList.toggle("active", optIn);
    yesBtn.setAttribute?.("aria-pressed", String(optIn));
  }
  const presetBtn = document.getElementById("welcomeApplyBeginnerSetupBtn");
  if (presetBtn) {
    const applied = Boolean(_welcomeOnboardingState.beginnerPresetApplied);
    presetBtn.classList.toggle("is-applied", applied);
    presetBtn.textContent = applied
      ? getWelcomeText("welcome.begApplyPresetDone", "✓ Empfohlener Startpunkt (Intervalle • Stufe 1) ausgewählt")
      : getWelcomeText("welcome.begApplyPresetBtn", "Empfohlenen Startpunkt (Intervalle • Stufe 1) auswählen");
  }
  const greetBegBtn = document.getElementById("welcomeGreetBeginnerBtn");
  if (greetBegBtn) {
    greetBegBtn.classList.toggle("hidden", optIn);
  }
}

function setWelcomeBeginnerIntroOptIn(enabled) {
  _welcomeOnboardingState.beginnerIntroOptIn = Boolean(enabled);
  syncWelcomeBeginnerOptInUI();
  renderWelcomeProgress(_welcomeOnboardingState.currentStep);
}

function applyWelcomeBeginnerPreset() {
  _welcomeOnboardingState.beginnerPresetApplied = true;
  if (state?.settings) {
    // Empfohlener Startpunkt: Intervalle melodisch aufwärts, Stufe 1
    state.settings.mode = "interval-melodic";
    state.settings.intervalDifficulty = 1;
  }
  if (!state.profile) state.profile = createDefaultProfile();
  // Lernschwerpunkt bleibt unverändert (es gibt keinen eigenen Intervall-Schwerpunkt)
  saveUserProfile(state.profile);
  renderProfileAccountView();
  renderHomeProfileGreeting();
  state.updateQuickStartLabel?.();
  syncWelcomeBeginnerOptInUI();
}

function renderWelcomeProgress(stepIdx = _welcomeOnboardingState.currentStep) {
  const activeSteps = getActiveWelcomeWizardSteps();
  const total = activeSteps.length;
  const idx = Math.max(0, Math.min(total - 1, Number(stepIdx) || 0));
  const textEl = document.getElementById("welcomeProgressText");
  const fillEl = document.getElementById("welcomeProgressFill");
  if (textEl) {
    textEl.textContent = getWelcomeText("welcome.stepProgress", "Schritt {n} von {total}")
      .replace("{n}", String(idx + 1))
      .replace("{total}", String(total));
  }
  if (fillEl?.style) {
    fillEl.style.width = `${Math.round(((idx + 1) / total) * 100)}%`;
  }
}

function renderWelcomeLanguageList() {
  const listEl = document.getElementById("welcomeLangList");
  if (!listEl || typeof document.createElement !== "function") return;
  const codes = typeof getAvailableLanguages === "function"
    ? getAvailableLanguages()
    : ["de", "en", "es", "fr", "pl", "uk", "ur"];
  listEl.innerHTML = "";
  codes.forEach(code => {
    const cfg = typeof APP_LANGUAGES !== "undefined" ? (APP_LANGUAGES[code] || {}) : {};
    const nativeName = cfg.nativeName || code.toUpperCase();
    const tagline = typeof getStaticI18nText === "function"
      ? (getStaticI18nText("app.tagline", code) || "")
      : "";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "welcome-lang-btn";
    btn.dataset.welcomeLang = code;
    btn.setAttribute?.("role", "listitem");
    btn.innerHTML = `<span class="welcome-lang-text"><span class="welcome-lang-name">${escapeHtml(nativeName)}</span>${tagline ? `<span class="welcome-lang-tagline">${escapeHtml(tagline)}</span>` : ""}</span><span class="welcome-lang-arrow" aria-hidden="true">→</span>`;
    btn.addEventListener("click", () => selectWelcomeLanguage(code, btn));
    listEl.appendChild(btn);
  });
}

function renderWelcomeProfileStep() {
  const p = state.profile || createDefaultProfile();
  const nameInput = document.getElementById("welcomeProfileNameInput");
  if (nameInput && nameInput.value !== (p.name || "")) {
    nameInput.value = p.name || "";
  }
  const instWrap = document.getElementById("welcomeInstrumentsGroup");
  if (!instWrap || typeof document.createElement !== "function") return;
  instWrap.innerHTML = "";
  PROFILE_INSTRUMENT_OPTIONS.forEach(inst => {
    const active = (p.instruments || []).includes(inst);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `k-filter-pill${active ? " active" : ""}`;
    btn.dataset.welcomeInst = inst;
    btn.setAttribute?.("aria-pressed", String(active));
    btn.textContent = getLocalizedProfileInstrumentLabel(inst);
    btn.addEventListener("click", () => {
      if (!state.profile) state.profile = createDefaultProfile();
      const set = new Set(state.profile.instruments || []);
      if (set.has(inst)) set.delete(inst);
      else set.add(inst);
      state.profile.instruments = PROFILE_INSTRUMENT_OPTIONS.filter(i => set.has(i));
      saveUserProfile(state.profile);
      renderProfileAccountView();
      renderHomeProfileGreeting();
      renderWelcomeProfileStep();
    });
    instWrap.appendChild(btn);
  });

  const hasNone = (p.instruments || []).length === 0;
  const noneBtn = document.createElement("button");
  noneBtn.type = "button";
  noneBtn.className = `k-filter-pill${hasNone ? " active" : ""}`;
  noneBtn.dataset.welcomeInst = "none";
  noneBtn.setAttribute?.("aria-pressed", String(hasNone));
  noneBtn.textContent = tr("Kein Instrument", "No instrument");
  noneBtn.addEventListener("click", () => {
    if (!state.profile) state.profile = createDefaultProfile();
    state.profile.instruments = [];
    saveUserProfile(state.profile);
    renderProfileAccountView();
    renderHomeProfileGreeting();
    renderWelcomeProfileStep();
  });
  instWrap.appendChild(noneBtn);
}

function renderWelcomeFocusStep() {
  const p = state.profile || createDefaultProfile();
  const listEl = document.getElementById("welcomeFocusList");
  if (!listEl || typeof document.createElement !== "function") return;
  const activeFocuses = getResolvedProfileFocuses(p);
  listEl.innerHTML = "";
  Object.values(PROFILE_FOCUS_OPTIONS).forEach(opt => {
    const def = getLocalizedProfileFocus(opt.key);
    const isActive = activeFocuses.includes(opt.key);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `welcome-choice-card welcome-focus-card${isActive ? " active" : ""}`;
    btn.dataset.welcomeFocus = opt.key;
    btn.setAttribute?.("aria-pressed", String(isActive));
    btn.innerHTML = `<strong>${escapeHtml(def.label)}</strong><span>${escapeHtml(def.hint)}</span>`;
    btn.addEventListener("click", () => {
      if (!state.profile) state.profile = createDefaultProfile();
      const nextList = toggleProfileFocusValue(getResolvedProfileFocuses(state.profile), opt.key);
      state.profile.focuses = nextList;
      state.profile.focus = nextList[0] || "allround";
      saveUserProfile(state.profile);
      renderProfileAccountView();
      renderHomeProfileGreeting();
      renderWelcomeFocusStep();
    });
    listEl.appendChild(btn);
  });
}

function renderWelcomeGreetStep() {
  const greetMascot = document.getElementById("welcomeGreetMascot");
  const greetTitle = document.getElementById("welcomeGreetTitle");
  const greetBody = document.getElementById("welcomeGreetBody");
  const continueBtn = document.getElementById("welcomeContinueBtn");
  const redirectHint = document.getElementById("welcomeRedirectHint");

  if (greetMascot) {
    greetMascot.innerHTML = getMascotSVG("happy");
    greetMascot.classList.add("mascot-happy-hop");
  }
  const userName = String(state.profile?.name || "").trim();
  if (greetTitle) {
    greetTitle.textContent = userName
      ? getWelcomeText("welcome.greetNamedTitle", "Hallo, {name}! Schön, dass du da bist.").replace("{name}", userName)
      : getWelcomeText("welcome.greetTitle", "Hallo! Schön, dass du da bist.");
  }
  if (greetBody) {
    greetBody.textContent = getWelcomeText("welcome.greetBody", "Ich bin Lauscher und freue mich darauf, mit dir zu hören, Noten zu entdecken und Musik zu verstehen. Viel Freude und Erfolg beim Lernen!");
  }
  if (continueBtn) {
    continueBtn.textContent = getWelcomeText("welcome.continueBtn", "Los geht’s →");
  }
  if (redirectHint) {
    redirectHint.textContent = getWelcomeText("welcome.redirectHint", "Du wirst gleich zum Homescreen weitergeleitet …");
  }
  syncWelcomeBeginnerOptInUI();
}

function bindWelcomeOnboardingControls() {
  const overlay = document.getElementById("welcomeOnboarding");
  if (!overlay || overlay._welcomeWizardBound) return;
  overlay._welcomeWizardBound = true;

  document.querySelectorAll("[data-welcome-appearance]").forEach(btn => {
    btn.addEventListener("click", () => setAppearancePreference(btn.dataset.welcomeAppearance));
  });
  document.querySelectorAll("[data-welcome-theme]").forEach(btn => {
    btn.addEventListener("click", () => setThemePreference(btn.dataset.welcomeTheme));
  });
  document.getElementById("welcomeBeginnerOptInNoBtn")?.addEventListener("click", () => {
    setWelcomeBeginnerIntroOptIn(false);
  });
  document.getElementById("welcomeBeginnerOptInYesBtn")?.addEventListener("click", () => {
    setWelcomeBeginnerIntroOptIn(true);
  });
  document.getElementById("welcomeApplyBeginnerSetupBtn")?.addEventListener("click", () => {
    applyWelcomeBeginnerPreset();
  });
  document.getElementById("welcomeGreetBeginnerBtn")?.addEventListener("click", () => {
    setWelcomeBeginnerIntroOptIn(true);
    goToWelcomeStep(BEGINNER_WELCOME_WIZARD_STEPS.indexOf("welcomeStepBeginner1"));
  });

  const nameInput = document.getElementById("welcomeProfileNameInput");
  if (nameInput) {
    nameInput.addEventListener("input", () => {
      if (!state.profile) state.profile = createDefaultProfile();
      state.profile.name = String(nameInput.value || "").trim().slice(0, 24);
      saveUserProfile(state.profile);
      renderProfileAccountView();
      renderHomeProfileGreeting();
    });
  }

  document.getElementById("welcomeContinueBtn")?.addEventListener("click", () => {
    completeWelcomeOnboarding();
  });

  [
    "welcomeLookBackBtn", "welcomeLookNextBtn",
    "welcomeProfileBackBtn", "welcomeProfileNextBtn",
    "welcomeFocusBackBtn", "welcomeFocusNextBtn",
    "welcomeBeginner1BackBtn", "welcomeBeginner1NextBtn",
    "welcomeBeginner2BackBtn", "welcomeBeginner2NextBtn",
    "welcomeBeginner3BackBtn", "welcomeBeginner3NextBtn",
    "welcomeGreetBackBtn"
  ].forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener("click", () => {
      const dir = (btn.dataset?.welcomeNav === "prev" || btnId.endsWith("BackBtn")) ? -1 : 1;
      goToWelcomeStep(_welcomeOnboardingState.currentStep + dir);
    });
  });
}

function goToWelcomeStep(targetIdx, options = {}) {
  if (_welcomeOnboardingState.exiting) return;
  const activeSteps = getActiveWelcomeWizardSteps();
  const total = activeSteps.length;
  const nextIdx = Math.max(0, Math.min(total - 1, Number(targetIdx) || 0));
  const prevIdx = _welcomeOnboardingState.currentStep;
  const prevStepId = activeSteps[prevIdx] || WELCOME_WIZARD_STEPS[prevIdx];
  const nextStepId = activeSteps[nextIdx];

  clearWelcomeOnboardingTimers();
  _welcomeOnboardingState.currentStep = nextIdx;
  _welcomeOnboardingState.selecting = false;

  const autoFill = document.getElementById("welcomeAutoFill");
  autoFill?.classList.remove("is-counting");

  renderWelcomeProgress(nextIdx);
  if (nextStepId === "welcomeStepLook") applyThemeAndAppearance();
  if (nextStepId === "welcomeStepProfile") renderWelcomeProfileStep();
  if (nextStepId === "welcomeStepFocus") {
    renderWelcomeFocusStep();
    syncWelcomeBeginnerOptInUI();
  }
  if (nextStepId === "welcomeStepBeginner2") syncWelcomeBeginnerOptInUI();
  if (nextStepId === "welcomeStepGreet") renderWelcomeGreetStep();

  const applyStepVisibility = () => {
    BEGINNER_WELCOME_WIZARD_STEPS.forEach((stepId) => {
      const el = document.getElementById(stepId);
      if (!el) return;
      el.classList.remove("is-step-exiting");
      el.classList.toggle("hidden", stepId !== nextStepId);
    });
    if (nextStepId === "welcomeStepGreet") {
      if (autoFill) autoFill.classList.add("is-counting");
      _welcomeOnboardingState.autoTimer = setTimeout(() => {
        completeWelcomeOnboarding();
      }, 9000);
    }
  };

  const prevEl = prevStepId && prevStepId !== nextStepId ? document.getElementById(prevStepId) : null;
  if (options.immediate || !prevEl) {
    applyStepVisibility();
    return;
  }

  const prefersReduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  prevEl.classList.add("is-step-exiting");
  _welcomeOnboardingState.stepTimer = setTimeout(() => {
    _welcomeOnboardingState.stepTimer = null;
    applyStepVisibility();
  }, prefersReduced ? 80 : 210);
}

function completeWelcomeOnboarding() {
  if (_welcomeOnboardingState.exiting) return;
  _welcomeOnboardingState.exiting = true;
  clearWelcomeOnboardingTimers();

  const overlay = document.getElementById("welcomeOnboarding");
  const homeView = document.getElementById("viewHome");
  const prefersReduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  state.settings.onboardingDone = true;
  saveVisualPrefs(
    state.settings.appearance,
    state.settings.theme,
    state.settings.language,
    state.settings.autoNextAfterCorrect,
    state.settings.playCorrectAnswerAudio,
    true
  );

  if (typeof document !== "undefined" && document.documentElement?.removeAttribute) {
    document.documentElement.removeAttribute("data-first-run");
  }
  if (state.currentView !== "home") {
    switchView("home", { animate: false, skipHistoryPush: true });
  }
  if (homeView) {
    homeView.classList.remove("home-welcome-enter");
    homeView.classList.add("home-welcome-enter");
  }
  if (overlay) {
    overlay.classList.add("welcome-out");
  }

  const exitDuration = prefersReduced ? 160 : 620;
  _welcomeOnboardingState.exitTimer = setTimeout(() => {
    if (overlay) {
      overlay.classList.add("hidden");
      overlay.classList.remove("welcome-out");
    }
    if (homeView) {
      homeView.classList.remove("home-welcome-enter");
    }
    _welcomeOnboardingState.selecting = false;
    _welcomeOnboardingState.exiting = false;
    _welcomeOnboardingState.exitTimer = null;
  }, exitDuration);
}

function selectWelcomeLanguage(lang, clickedBtn) {
  if (_welcomeOnboardingState.selecting || _welcomeOnboardingState.exiting) return;
  _welcomeOnboardingState.selecting = true;
  clearWelcomeOnboardingTimers();

  if (clickedBtn?.classList) clickedBtn.classList.add("is-selected");
  state.settings.onboardingDone = false;
  setLanguagePreference(lang);
  renderWelcomeProfileStep();
  renderWelcomeFocusStep();
  goToWelcomeStep(1);
}

function openFirstRunOnboarding() {
  const overlay = document.getElementById("welcomeOnboarding");
  if (!overlay) return false;
  clearWelcomeOnboardingTimers();
  _welcomeOnboardingState.currentStep = 0;
  _welcomeOnboardingState.beginnerIntroOptIn = false;
  _welcomeOnboardingState.beginnerPresetApplied = false;
  _welcomeOnboardingState.selecting = false;
  _welcomeOnboardingState.exiting = false;

  if (typeof document !== "undefined" && document.documentElement?.setAttribute) {
    document.documentElement.setAttribute("data-first-run", "1");
  }
  bindWelcomeOnboardingControls();
  const langMascot = document.getElementById("welcomeLangMascot");
  if (langMascot) langMascot.innerHTML = getMascotSVG("idle");
  renderWelcomeLanguageList();
  applyThemeAndAppearance();
  renderWelcomeProfileStep();
  renderWelcomeFocusStep();
  goToWelcomeStep(0, { immediate: true });

  overlay.classList.remove("hidden", "welcome-out");
  return true;
}

function applyRestoredNativeAppState() {
  const restoredVisual = loadVisualPrefs();
  state.settings.appearance = restoredVisual.appearance;
  state.settings.theme = restoredVisual.theme;
  state.settings.language = restoredVisual.language;
  state.settings.autoNextAfterCorrect = restoredVisual.autoNextAfterCorrect;
  state.settings.playCorrectAnswerAudio = restoredVisual.playCorrectAnswerAudio;
  state.settings.onboardingDone = restoredVisual.onboardingDone;
  state.profile = loadUserProfile();

  if (typeof applyThemeAndAppearance === "function") applyThemeAndAppearance();
  if (typeof applyStaticDomLanguage === "function") applyStaticDomLanguage(state.settings.language);
  if (typeof syncLanguageControls === "function") syncLanguageControls(state.settings.language);
  if (typeof syncAutoNextControls === "function") syncAutoNextControls();
  if (typeof syncAnswerSoundToggleUI === "function") syncAnswerSoundToggleUI();
  if (typeof renderHomeProfileGreeting === "function") renderHomeProfileGreeting();
  if (typeof renderProfileAccountView === "function") renderProfileAccountView();
  if (typeof state.updateHeaderSubtext === "function") state.updateHeaderSubtext();
  if (typeof state.updateQuickStartLabel === "function") state.updateQuickStartLabel();
}

function initStartupSplash() {
  hydrateMascotStaticSlots();
  const splash = document.getElementById("startupSplash");
  const welcome = document.getElementById("welcomeOnboarding");

  const continueAfterRestoreCheck = () => {
    if (isFirstRunOnboardingNeeded() && welcome) {
      if (splash) {
        splash.classList.add("splash-out");
        splash.classList.add("splash-hidden");
      }
      openFirstRunOnboarding();
      return;
    }

    if (welcome) {
      welcome.classList.add("hidden");
      welcome.classList.remove("welcome-out");
    }
    if (typeof document !== "undefined" && document.documentElement?.removeAttribute) {
      document.documentElement.removeAttribute("data-first-run");
    }
    if (!splash) return;

    splash.classList.remove("splash-out");
    splash.classList.remove("splash-hidden");

    let dismissed = false;
    let autoTimer = null;

    function dismissSplash() {
      if (dismissed) return;
      dismissed = true;
      if (autoTimer) clearTimeout(autoTimer);
      splash.classList.add("splash-out");
      setTimeout(() => {
        splash.classList.add("splash-hidden");
      }, 360);
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!splash._dismissSplashBound) {
      splash._dismissSplashBound = true;
      splash.addEventListener("click", () => {
        if (splash._activeDismissFn) splash._activeDismissFn();
      });
    }
    splash._activeDismissFn = dismissSplash;
    autoTimer = setTimeout(dismissSplash, prefersReduced ? 450 : 1200);
  };

  if (
    isFirstRunOnboardingNeeded() &&
    typeof restoreNativeStorageMirrorIfNeeded === "function" &&
    typeof getNativeMirrorFilesystem === "function" &&
    getNativeMirrorFilesystem()
  ) {
    restoreNativeStorageMirrorIfNeeded()
      .then(restored => {
        if (restored) applyRestoredNativeAppState();
        continueAfterRestoreCheck();
      })
      .catch(() => {
        continueAfterRestoreCheck();
      });
    return;
  }

  // Bei vorhandenem localStorage den nativen Spiegel einmal still nachziehen (für Alt-Installationen)
  if (!isFirstRunOnboardingNeeded() && typeof syncNativeStorageMirror === "function") {
    syncNativeStorageMirror();
  }
  continueAfterRestoreCheck();
}

