// =====================================================
// ENTDECKER-MODUS (KINDER & EINSTEIGER) & ELTERN-PIN (js/explorer.js)
// =====================================================
// Filtert Profi-Bereiche (Studio/EQ, Kirchentonarten, Nashville, hohe Stufen)
// zugunsten eines klaren Einstiegs mit optionaler 4-stelliger Eltern-/Lehrkraft-PIN.
// Hausaufgaben-Links (#hw=… / #mix=…) bleiben immer uneingeschränkt nutzbar.
"use strict";

const EXPLORER_MODE_POLICY = {
  hiddenCategories: ["production", "modes"],
  hiddenTools: ["circle", "capo", "nashville"],
  hiddenThemes: ["metal"],
  hiddenKnowledgeArticles: [
    "art-minor-plagal",
    "art-physics-waves",
    "art-functional",
    "art-nashville-number-system"
  ],
  allowedSections: {
    cadence:  ["major-last", "minor-last"],
    interval: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "sing-interval", "midi-interval"],
    chords:   ["chord-arp-up", "chord-arp-down", "interval-chords", "midi-chord"],
    melody:   ["steady", "rhythmic"],
    solfege:  ["major", "sing-degree"],
    rhythm:   ["rhythm-meter", "rhythm-tap", "rhythm-dictation"],
    notation: ["notation-treble", "notation-bass", "notation-grand", "notation-symbols"]
  },
  maxLevelsByMode: {
    "cadence": 2,
    "cadence-minor": 2,
    "interval-melodic": 3,
    "interval-melodic-down": 3,
    "interval-harmonic": 3,
    "sing-interval": 3,
    "midi-interval": 3,
    "chord-arp-up": 2,
    "chord-arp-down": 2,
    "interval-chords": 2,
    "midi-chord": 2,
    "solfege": 4,
    "sing-degree": 2,
    "rhythm-meter": 2,
    "rhythm-tap": 2,
    "rhythm-dictation": 1,
    "notation-treble": 2,
    "notation-bass": 2,
    "notation-grand": 2,
    "notation-symbols": 2
  },
  allowedMelodyRanges: ["do-fa", "sol-do"],
  examMaxLevelNumber: 2
};

const EXPLORER_PIN_HASH_RE = /^v1:[0-9a-f]{16}$/;
let _explorerPinModalState = {
  mode: "verify", // "setup" | "verify"
  onAuthorized: null,
  returnModal: "settings"
};

// ---------- 1. PIN-HASHING & STATUS-HELFER ----------

function isValidExplorerPin(pin) {
  return /^\d{4}$/.test(String(pin || "").trim());
}

function hashExplorerPin(pin) {
  const clean = String(pin || "").trim();
  if (!isValidExplorerPin(clean)) return "";
  // Synchroner, offline-fähiger 64-Bit-Hash mit App-Salt (kein Klartext im localStorage)
  const salted = `lauscher-explorer-pin-v1:${clean}:94731`;
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  for (let round = 0; round < 64; round++) {
    const str = `${salted}#${round}`;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 0x01000193) >>> 0;
      h2 = Math.imul(h2 ^ ((ch + round) & 0xff), 0x85ebca6b) >>> 0;
      h2 = ((h2 << 13) | (h2 >>> 19)) >>> 0;
    }
    const mix = h1;
    h1 = (h1 ^ (h2 >>> 7)) >>> 0;
    h2 = (h2 ^ (mix >>> 11)) >>> 0;
  }
  return `v1:${h1.toString(16).padStart(8, "0")}${h2.toString(16).padStart(8, "0")}`;
}

function sanitizeExplorerPinHash(raw) {
  return typeof raw === "string" && EXPLORER_PIN_HASH_RE.test(raw) ? raw : "";
}

function isExplorerModeEnabled() {
  return Boolean(typeof state !== "undefined" && state?.settings?.explorerMode === true);
}

function hasExplorerPin() {
  return Boolean(typeof state !== "undefined" && sanitizeExplorerPinHash(state?.settings?.explorerPinHash));
}

function isExplorerPinLockActive() {
  return isExplorerModeEnabled() && hasExplorerPin();
}

function verifyExplorerPin(inputPin) {
  if (!hasExplorerPin()) return true;
  const hashed = hashExplorerPin(inputPin);
  return Boolean(hashed && hashed === state.settings.explorerPinHash);
}

// ---------- 2. FILTER-LOGIK FÜR KATEGORIEN, PRÜFUNGEN, WISSEN & MIXE ----------

function getExplorerMaxLevelForSection(categoryKey, sectionId) {
  if (categoryKey === "cadence") {
    return sectionId === "minor-last" ? EXPLORER_MODE_POLICY.maxLevelsByMode["cadence-minor"] : EXPLORER_MODE_POLICY.maxLevelsByMode["cadence"];
  }
  if (categoryKey === "solfege") {
    return sectionId === "sing-degree" ? EXPLORER_MODE_POLICY.maxLevelsByMode["sing-degree"] : EXPLORER_MODE_POLICY.maxLevelsByMode["solfege"];
  }
  if (categoryKey === "melody") {
    return EXPLORER_MODE_POLICY.allowedMelodyRanges.length;
  }
  return EXPLORER_MODE_POLICY.maxLevelsByMode[sectionId] || null;
}

function filterExplorerCategoryItems(categoryKey, items) {
  if (!isExplorerModeEnabled() || !Array.isArray(items)) return items;
  const allowed = EXPLORER_MODE_POLICY.allowedSections[categoryKey];
  if (!Array.isArray(allowed)) return items;
  return items
    .filter(item => item && allowed.includes(item.id))
    .map(item => {
      const maxLvl = getExplorerMaxLevelForSection(categoryKey, item.id);
      if (!maxLvl || !item.meta) return item;
      const metaLabel = categoryKey === "melody"
        ? tf("{n} Bereiche", "{n} Ranges", { n: maxLvl })
        : tf("{n} Stufen", "{n} Levels", { n: maxLvl });
      return { ...item, meta: metaLabel };
    });
}

function isExplorerCategoryNodeAllowed(btn, categoryKey) {
  if (!btn || !btn.dataset) return true;
  const d = btn.dataset;
  const maxMap = EXPLORER_MODE_POLICY.maxLevelsByMode;

  if (d.launchCadence) {
    const mode = d.cadenceTonality === "minor" ? "cadence-minor" : "cadence";
    return parseInt(d.launchCadence, 10) <= (maxMap[mode] || 2);
  }
  if (d.launchInt) {
    const maxLvl = maxMap[d.launchInt];
    return typeof maxLvl === "number" && parseInt(d.intLvl, 10) <= maxLvl;
  }
  if (d.launchSingInt) {
    return parseInt(d.launchSingInt, 10) <= (maxMap["sing-interval"] || 3);
  }
  if (d.launchMidiInt) {
    return parseInt(d.launchMidiInt, 10) <= (maxMap["midi-interval"] || 3);
  }
  if (d.launchChord) {
    const maxLvl = maxMap[d.launchChord];
    return typeof maxLvl === "number" && parseInt(d.chordLvl, 10) <= maxLvl;
  }
  if (d.launchMelody) {
    return EXPLORER_MODE_POLICY.allowedMelodyRanges.includes(d.launchMelody) && d.melodyOctave !== "multi";
  }
  if (d.launchSolfege) {
    return parseInt(d.launchSolfege, 10) <= (maxMap["solfege"] || 4);
  }
  if (d.launchSingDegree) {
    return parseInt(d.launchSingDegree, 10) <= (maxMap["sing-degree"] || 2);
  }
  if (d.launchRhythm) {
    if (d.rhythmRead === "1") return false;
    const maxLvl = maxMap[d.launchRhythm];
    return typeof maxLvl === "number" && parseInt(d.rhythmLvl, 10) <= maxLvl;
  }
  if (d.launchNotationKey) {
    return false;
  }
  if (d.launchNotation) {
    const maxLvl = maxMap[d.launchNotation];
    return typeof maxLvl === "number" && parseInt(d.notationLvl, 10) <= maxLvl;
  }
  if (categoryKey === "production" || categoryKey === "modes") {
    return false;
  }
  return true;
}

function applyExplorerCategoryNodeFilter(container, categoryKey) {
  if (!isExplorerModeEnabled() || !container || typeof container.querySelectorAll !== "function") return;
  container.querySelectorAll(".subpage-node-btn").forEach(btn => {
    if (!isExplorerCategoryNodeAllowed(btn, categoryKey)) {
      btn.remove();
    }
  });
  // Leere Unterabschnitte entfernen (z. B. volle Oktave in Melodien oder hohe Noten-Gruppen)
  container.querySelectorAll(".subpage-section").forEach(sec => {
    const grid = sec.querySelector(".subpage-nodes-grid");
    if (grid && grid.querySelectorAll(".subpage-node-btn").length === 0) {
      sec.remove();
    }
  });
  // Bei Notenlesen im Entdecker-Modus auch die Vorzeichen-Auswahlleiste (Generalvorzeichen) ausblenden
  if (categoryKey === "notation") {
    container.querySelectorAll(".notation-key-toolbar").forEach(el => el.remove());
  }
}

function filterExplorerExamPresets(categoryKey, presets) {
  if (!isExplorerModeEnabled() || !Array.isArray(presets)) return presets;
  const filtered = presets.filter(p => {
    if (!p || p.isCustomIntervalExam || p.isCustomSolfegeExam) return false;
    const lvl = Number(p.levelNumber) || 1;
    return lvl <= EXPLORER_MODE_POLICY.examMaxLevelNumber;
  });
  return filtered.length > 0 ? filtered : presets.slice(0, 1);
}

function isThemeAllowedInExplorer(themeId) {
  if (!isExplorerModeEnabled()) return true;
  return !EXPLORER_MODE_POLICY.hiddenThemes.includes(themeId);
}

function filterExplorerKnowledgeArticles(articles) {
  if (!isExplorerModeEnabled() || !Array.isArray(articles)) return articles;
  return articles.filter(art => art && !EXPLORER_MODE_POLICY.hiddenKnowledgeArticles.includes(art.id));
}

function isModeAllowedInExplorerMix(mode) {
  if (!isExplorerModeEnabled()) return true;
  if (mode === "melody") return true;
  return Object.prototype.hasOwnProperty.call(EXPLORER_MODE_POLICY.maxLevelsByMode, mode);
}

function getExplorerAllowedLevelsForMix(mode, levels) {
  if (!isExplorerModeEnabled() || !Array.isArray(levels)) return levels;
  if (mode === "melody") {
    return levels.filter(l => EXPLORER_MODE_POLICY.allowedMelodyRanges.includes(String(l)));
  }
  const maxLvl = EXPLORER_MODE_POLICY.maxLevelsByMode[mode];
  if (typeof maxLvl !== "number") return levels;
  const filtered = levels.filter(l => Number(l) <= maxLvl);
  return filtered.length > 0 ? filtered : levels.slice(0, 1);
}

// ---------- 3. ZUSTANDS-SYNC & UMSCHALTUNG ----------

function syncExplorerModeUI() {
  const enabled = isExplorerModeEnabled();
  const pinned = hasExplorerPin();

  if (typeof document !== "undefined" && document.documentElement) {
    if (enabled) {
      document.documentElement.setAttribute("data-explorer-mode", "1");
    } else {
      document.documentElement.removeAttribute("data-explorer-mode");
    }
  }

  // Startseiten-Badge
  const homeBadge = document.getElementById("homeExplorerBadge");
  if (homeBadge) {
    homeBadge.classList.toggle("hidden", !enabled);
    const labelEl = document.getElementById("homeExplorerBadgeLabel");
    if (labelEl) {
      labelEl.textContent = pinned
        ? tr("Entdecker-Modus (PIN)", "Explorer Mode (PIN)")
        : tr("Entdecker-Modus", "Explorer Mode");
    }
  }

  // Einstellungs-Schalter
  document.querySelectorAll("[data-explorer-mode-opt]").forEach(btn => {
    const active = (btn.dataset.explorerModeOpt === "on") === enabled;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  // PIN-Steuerung in den Einstellungen
  const pinBox = document.getElementById("explorerPinSettingsBox");
  const pinBadge = document.getElementById("explorerPinStatusBadge");
  const setPinBtn = document.getElementById("explorerSetPinBtn");
  const removePinBtn = document.getElementById("explorerRemovePinBtn");
  if (pinBox) pinBox.classList.toggle("hidden", !enabled);
  if (pinBadge) {
    pinBadge.textContent = pinned
      ? tr("🔒 Eltern-PIN aktiv", "🔒 Parent PIN active")
      : tr("Keine PIN gesetzt", "No PIN set");
    pinBadge.classList.toggle("is-locked", pinned);
  }
  if (setPinBtn) {
    setPinBtn.textContent = pinned
      ? tr("Eltern-PIN ändern", "Change parent PIN")
      : tr("Eltern-PIN festlegen", "Set parent PIN");
  }
  if (removePinBtn) {
    removePinBtn.classList.toggle("hidden", !pinned);
  }

  // Onboarding-Schalter
  const obOff = document.getElementById("welcomeExplorerOffBtn");
  const obOn = document.getElementById("welcomeExplorerOnBtn");
  if (obOff) {
    obOff.classList.toggle("active", !enabled);
    obOff.setAttribute("aria-pressed", String(!enabled));
  }
  if (obOn) {
    obOn.classList.toggle("active", enabled);
    obOn.setAttribute("aria-pressed", String(enabled));
  }

  // Metal-Vorlage im Farbdesigner im Entdecker-Modus ausblenden
  const tplSelect = document.getElementById("customThemeTemplateSelect");
  if (tplSelect && typeof tplSelect.querySelector === "function") {
    const metalOpt = tplSelect.querySelector('option[value="metal-dark"]');
    if (metalOpt) {
      metalOpt.hidden = enabled;
      metalOpt.disabled = enabled;
    }
    if (enabled && tplSelect.value === "metal-dark") {
      tplSelect.value = "waldlichtung-light";
    }
  }
}

function setExplorerMode(enabled, options = {}) {
  const next = Boolean(enabled);
  if (!state?.settings) return;
  const prev = Boolean(state.settings.explorerMode);
  state.settings.explorerMode = next;

  const switchedFromHiddenTheme = next && !isThemeAllowedInExplorer(state.settings.theme);
  if (switchedFromHiddenTheme) {
    state.settings.theme = "waldlichtung";
  }

  if (next && !prev && options.applyFriendlyDefaults !== false) {
    // Sanfte, kindgerechte Defaults beim Einschalten
    state.settings.autoNextAfterCorrect = true;
    state.settings.playCorrectAnswerAudio = true;
    if (state.examConfig) {
      state.examConfig.count = 10;
      state.examConfig.feedbackMode = "instant";
      state.examConfig.maxReplays = 0;
    }
    // Falls die zuletzt gewählte Übung im Entdecker-Modus ausgeblendet ist, auf freundlichen Startpunkt setzen
    const curMode = state.settings.mode || "";
    if (curMode.startsWith("prod-") || curMode.startsWith("modes-")) {
      state.settings.mode = "interval-melodic";
      state.settings.intervalDifficulty = 1;
      if (typeof rememberPracticeProgress === "function") rememberPracticeProgress();
    }
    if (typeof syncAutoNextControls === "function") syncAutoNextControls();
    if (typeof syncAnswerSoundToggleUI === "function") syncAnswerSoundToggleUI();
  }

  if (options.save !== false) {
    saveVisualPrefs(
      state.settings.appearance,
      state.settings.theme,
      state.settings.language,
      state.settings.autoNextAfterCorrect,
      state.settings.playCorrectAnswerAudio,
      state.settings.onboardingDone,
      state.settings.explorerMode,
      state.settings.explorerPinHash || ""
    );
  }

  syncExplorerModeUI();

  if (switchedFromHiddenTheme && typeof applyThemeAndAppearance === "function") {
    applyThemeAndAppearance();
  }

  if (typeof renderKnowledgeHub === "function") renderKnowledgeHub();
  if (typeof syncIntervalHelpSettingsUI === "function") syncIntervalHelpSettingsUI();
  if (state.currentView === "exercise" && typeof applyProfileDisplayChanges === "function") {
    applyProfileDisplayChanges();
  }
  if (typeof populateMixCreatorControls === "function") populateMixCreatorControls({ forceRepopulate: true });
  if (typeof renderHomeQuickMixBar === "function") renderHomeQuickMixBar();
  if (typeof renderHomeProfileGreeting === "function") renderHomeProfileGreeting();
  if (typeof state.updateQuickStartLabel === "function") state.updateQuickStartLabel();

  // Laufende Kategorie-/Werkzeugansicht aktualisieren oder bei ausgeblendeter Ansicht sauber nach Home
  if (next) {
    const view = state.currentView;
    const hiddenCat = (view === "category" || view === "category-help" || view === "exam-setup") &&
      EXPLORER_MODE_POLICY.hiddenCategories.includes(state.activeCategory);
    const hiddenTool = EXPLORER_MODE_POLICY.hiddenTools.includes(view);
    if (hiddenCat || hiddenTool) {
      switchView("home", { animate: false, skipHistoryPush: true });
    } else if (view === "category" && typeof openCategoryPage === "function") {
      openCategoryPage(state.activeCategory, { skipHistoryPush: true, sectionId: null });
    } else if (view === "exam-setup" && typeof openExamSetupPage === "function") {
      openExamSetupPage(state.examSetupCategory || state.activeCategory, { skipHistoryPush: true });
    }
  } else {
    if (state.currentView === "category" && typeof openCategoryPage === "function") {
      openCategoryPage(state.activeCategory, { skipHistoryPush: true, sectionId: state.activeCategorySection });
    } else if (state.currentView === "exam-setup" && typeof openExamSetupPage === "function") {
      openExamSetupPage(state.examSetupCategory || state.activeCategory, { skipHistoryPush: true });
    }
  }

  if (options.toast !== false && prev !== next && typeof showAppToast === "function") {
    showAppToast(
      next
        ? `✓ ${tr("Entdecker-Modus aktiviert", "Explorer Mode enabled")}`
        : `✓ ${tr("Alle Inhalte wieder sichtbar", "All content visible again")}`,
      "success"
    );
  }
}

function saveExplorerPinHash(nextHash) {
  if (!state?.settings) return;
  state.settings.explorerPinHash = sanitizeExplorerPinHash(nextHash);
  saveVisualPrefs(
    state.settings.appearance,
    state.settings.theme,
    state.settings.language,
    state.settings.autoNextAfterCorrect,
    state.settings.playCorrectAnswerAudio,
    state.settings.onboardingDone,
    state.settings.explorerMode,
    state.settings.explorerPinHash
  );
  syncExplorerModeUI();
}

// ---------- 4. ELTERN-/LEHRKRAFT-PIN-MODAL (#explorerPinBackdrop) ----------

function openExplorerPinModal(mode, options = {}) {
  const isSetup = mode === "setup";
  _explorerPinModalState = {
    mode: isSetup ? "setup" : "verify",
    onAuthorized: typeof options.onAuthorized === "function" ? options.onAuthorized : null,
    returnModal: options.returnModal !== undefined ? options.returnModal : "settings"
  };

  const titleEl = document.getElementById("explorerPinModalTitle");
  const descEl = document.getElementById("explorerPinModalDesc");
  const noteEl = document.getElementById("explorerPinSetupNote");
  const input1 = document.getElementById("explorerPinInput");
  const confirmWrap = document.getElementById("explorerPinConfirmWrap");
  const input2 = document.getElementById("explorerPinConfirmInput");
  const errorEl = document.getElementById("explorerPinError");
  const submitBtn = document.getElementById("explorerPinSubmitBtn");

  if (titleEl) {
    titleEl.textContent = isSetup
      ? tr("Eltern-PIN festlegen", "Set parent PIN")
      : tr("Eltern-PIN eingeben", "Enter parent PIN");
  }
  if (descEl) {
    descEl.textContent = options.description || (isSetup
      ? tr("Vergib eine 4-stellige PIN, damit Kinder den Entdecker-Modus nicht selbst ausschalten können.", "Set a 4-digit PIN so children cannot turn off Explorer Mode on their own.")
      : tr("Bitte gib die 4-stellige Eltern- oder Lehrkraft-PIN ein, um fortzufahren.", "Please enter the 4-digit parent or teacher PIN to continue."));
  }
  if (noteEl) noteEl.classList.toggle("hidden", !isSetup);
  if (confirmWrap) confirmWrap.classList.toggle("hidden", !isSetup);
  if (input1) input1.value = "";
  if (input2) input2.value = "";
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
  }
  if (submitBtn) {
    submitBtn.textContent = isSetup
      ? tr("PIN speichern", "Save PIN")
      : tr("Entsperren", "Unlock");
  }

  setModalVisibility("explorerPin");
  pushAppHistory("explorerPin");
  setTimeout(() => {
    try { input1?.focus(); } catch (_) {}
  }, 40);
}

function closeExplorerPinModalToReturn() {
  const ret = _explorerPinModalState.returnModal;
  _explorerPinModalState.onAuthorized = null;
  if (ret) {
    setModalVisibility(ret);
    replaceAppHistory(ret);
  } else {
    closeActiveModal();
  }
}

function showExplorerPinModalError(msg) {
  const errorEl = document.getElementById("explorerPinError");
  if (!errorEl) return;
  errorEl.textContent = msg;
  errorEl.classList.remove("hidden");
}

function handleExplorerPinFormSubmit(e) {
  if (e && typeof e.preventDefault === "function") e.preventDefault();
  const input1 = document.getElementById("explorerPinInput");
  const input2 = document.getElementById("explorerPinConfirmInput");
  const pin1 = String(input1?.value || "").replace(/\D/g, "").slice(0, 4);

  if (!isValidExplorerPin(pin1)) {
    showExplorerPinModalError(tr("Bitte gib genau 4 Ziffern ein.", "Please enter exactly 4 digits."));
    input1?.focus();
    return;
  }

  if (_explorerPinModalState.mode === "setup") {
    const pin2 = String(input2?.value || "").replace(/\D/g, "").slice(0, 4);
    if (pin1 !== pin2) {
      showExplorerPinModalError(tr("Die beiden PINs stimmen nicht überein.", "The two PINs do not match."));
      if (input2) {
        input2.value = "";
        input2.focus();
      }
      return;
    }
    const hashed = hashExplorerPin(pin1);
    saveExplorerPinHash(hashed);
    const cb = _explorerPinModalState.onAuthorized;
    closeExplorerPinModalToReturn();
    if (typeof showAppToast === "function") {
      showAppToast(`✓ ${tr("Eltern-PIN gespeichert", "Parent PIN saved")}`, "success");
    }
    if (typeof cb === "function") cb();
    return;
  }

  // Verify-Modus
  if (!verifyExplorerPin(pin1)) {
    showExplorerPinModalError(tr("Falsche PIN – bitte erneut versuchen.", "Wrong PIN — please try again."));
    if (input1) {
      input1.value = "";
      input1.focus();
    }
    return;
  }

  const cb = _explorerPinModalState.onAuthorized;
  closeExplorerPinModalToReturn();
  if (typeof cb === "function") cb();
}

function requestExplorerPinProtectedAction(onAuthorized, options = {}) {
  if (!isExplorerPinLockActive()) {
    if (typeof onAuthorized === "function") onAuthorized();
    return;
  }
  openExplorerPinModal("verify", {
    description: options.description,
    returnModal: options.returnModal !== undefined ? options.returnModal : "settings",
    onAuthorized
  });
}

function requestExplorerModeToggle(targetEnabled) {
  const next = Boolean(targetEnabled);
  if (next === isExplorerModeEnabled()) return;
  if (!next && isExplorerPinLockActive()) {
    requestExplorerPinProtectedAction(
      () => setExplorerMode(false),
      {
        description: tr(
          "Gib die Eltern-PIN ein, um den Entdecker-Modus zu verlassen und alle Inhalte freizugeben.",
          "Enter the parent PIN to leave Explorer Mode and unlock all content."
        )
      }
    );
    return;
  }
  setExplorerMode(next);
}

function initExplorerModeControls() {
  syncExplorerModeUI();

  // Einstellungs-Schalter: Entdecker-Modus Ein / Aus
  document.querySelectorAll("[data-explorer-mode-opt]").forEach(btn => {
    btn.addEventListener("click", () => {
      requestExplorerModeToggle(btn.dataset.explorerModeOpt === "on");
    });
  });

  // PIN festlegen / ändern
  document.getElementById("explorerSetPinBtn")?.addEventListener("click", () => {
    if (hasExplorerPin()) {
      openExplorerPinModal("verify", {
        description: tr("Gib zuerst die aktuelle Eltern-PIN ein, um eine neue festzulegen.", "Enter the current parent PIN first to set a new one."),
        returnModal: "settings",
        onAuthorized: () => openExplorerPinModal("setup", { returnModal: "settings" })
      });
    } else {
      openExplorerPinModal("setup", { returnModal: "settings" });
    }
  });

  // PIN entfernen
  document.getElementById("explorerRemovePinBtn")?.addEventListener("click", () => {
    if (!hasExplorerPin()) return;
    openExplorerPinModal("verify", {
      description: tr("Gib die Eltern-PIN ein, um den PIN-Schutz zu entfernen.", "Enter the parent PIN to remove PIN protection."),
      returnModal: "settings",
      onAuthorized: () => {
        saveExplorerPinHash("");
        if (typeof showAppToast === "function") {
          showAppToast(`✓ ${tr("Eltern-PIN entfernt", "Parent PIN removed")}`, "success");
        }
      }
    });
  });

  // Startseiten-Badge → öffnet Einstellungen direkt beim Entdecker-Modus
  document.getElementById("homeExplorerBadge")?.addEventListener("click", () => {
    if (getOpenModalName() !== "settings") {
      setModalVisibility("settings");
      pushAppHistory("settings");
    }
    setTimeout(() => {
      document.getElementById("explorerModeSettingsSection")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
    }, 60);
  });

  // Onboarding-Schalter
  document.getElementById("welcomeExplorerOffBtn")?.addEventListener("click", () => {
    setExplorerMode(false, { toast: false });
  });
  document.getElementById("welcomeExplorerOnBtn")?.addEventListener("click", () => {
    setExplorerMode(true, { toast: false });
  });

  // PIN-Modal Formular & Schließen
  document.getElementById("explorerPinForm")?.addEventListener("submit", handleExplorerPinFormSubmit);
  document.getElementById("closeExplorerPinBtn")?.addEventListener("click", () => closeExplorerPinModalToReturn());
  document.getElementById("explorerPinCancelBtn")?.addEventListener("click", () => closeExplorerPinModalToReturn());
  ["explorerPinInput", "explorerPinConfirmInput"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => {
      const digits = String(el.value || "").replace(/\D/g, "").slice(0, 4);
      if (el.value !== digits) el.value = digits;
    });
  });
}
