/**
 * Lauscher • Mixer-Sync, Home-Schnellmix, Sitzungs-Timer, Konto, Farb-Editor, Toasts, Profil-Backup & Reset
 */

function syncMixerSliders() {
  const map = { Piano: "piano", Guitar: "guitar", Strings: "strings", Brass: "brass", Voice: "voice", Bass: "bass" };
  Object.entries(map).forEach(([label, key]) => {
    const val = Number.isFinite(state.mixer[key]) ? state.mixer[key] : 0;
    const slider = document.getElementById(`mix${label}`);
    const valEl = document.getElementById(`val${label}`);
    if (slider) slider.value = val;
    if (valEl) valEl.textContent = `${Math.round(val * 100)}%`;
  });
  if (typeof renderFreeplayInstrumentGrid === "function") {
    renderFreeplayInstrumentGrid();
  }
}

/**
 * Markiert Nutzeraktivität für die automatische Inaktivitäts-Abschaltung des Session-Timers.
 */
function markSessionActivity() {
  if (typeof state === "undefined") return;
  const now = Date.now();
  if (state.sessionTimer) {
    state.sessionTimer.lastActivityWallMs = now;
    state.sessionTimer.hiddenSinceWallMs = null;
  }
  if (state.breakReminder) {
    state.breakReminder.lastActivityWallMs = now;
    if (state.currentView === "exercise" && !state.breakReminder.promptOpen && state.breakReminder.pausedOnBreak) {
      state.breakReminder.pausedOnBreak = false;
      startBreakReminderTicker();
    }
  }
}

function getLevelDisplayForMix(mode, level) {
  if (mode === "melody") {
    return (getLocalizedMelodyRange(level)?.label) || "Do–Fa";
  }
  if (mode === "rhythm-tap" && RHYTHM_TAP_LEVELS[level]) {
    return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", {
      lvl: level,
      lbl: getLocalizedRhythmTapLevel(level).label
    });
  }
  if (mode === "prod-tone" && PROD_TONE_LEVELS[level]) {
    return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", {
      lvl: level,
      lbl: getLocalizedProdLevelLabel("tone", level)
    });
  }
  if (mode === "prod-eq-noise" && PROD_EQ_NOISE_LEVELS[level]) {
    return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", {
      lvl: level,
      lbl: getLocalizedProdLevelLabel("eq", level)
    });
  }
  if (mode === "modes-scale" && MODE_SCALE_LEVELS[level]) {
    return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", {
      lvl: level,
      lbl: getLocalizedModeLevelLabel("scale", level)
    });
  }
  if (mode === "modes-char" && MODE_CHAR_LEVELS[level]) {
    return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", {
      lvl: level,
      lbl: getLocalizedModeLevelLabel("char", level)
    });
  }
  if (mode === "modes-cadence" && MODE_CADENCE_LEVELS[level]) {
    return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", {
      lvl: level,
      lbl: getLocalizedModeLevelLabel("cadence", level)
    });
  }
  if (isChordQualityMode(mode)) {
    const chordLvlLabels = {
      1: tr("Dreiklänge", "Triads"),
      2: tr("Sept & Sus", "7th & Sus"),
      3: tr("Erweitert", "Extended"),
      4: tr("Jazz & Optionstöne", "Jazz Tensions")
    };
    const lbl = chordLvlLabels[level];
    if (lbl) return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", { lvl: level, lbl });
  }
  if (mode === "chord-inversions") {
    const invLvlLabels = {
      1: tr("Dur-Dreiklang", "Major Triad"),
      2: tr("Dur & Moll", "Major & Minor"),
      3: tr("Septakkorde (4)", "7th Chords (4)")
    };
    const lbl = invLvlLabels[level];
    if (lbl) return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", { lvl: level, lbl });
  }
  if (isNotationSymbolsMode(mode)) {
    const lbl = typeof getNotationSymbolsLevelLabel === "function" ? getNotationSymbolsLevelLabel(level) : "";
    if (lbl) return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", { lvl: level, lbl });
  }
  if (isNotationMode(mode)) {
    const notationLvlLabels = {
      1: tr("Stammlinien", "5-Line Staff"),
      2: tr("±2 Hilfslinien", "±2 Ledger Lines"),
      3: tr("±3 Hilfslinien", "±3 Ledger Lines"),
      4: tr("±3 Hilfsl. + ♯/♭", "±3 Ledger + ♯/♭")
    };
    const lbl = notationLvlLabels[level];
    if (lbl) return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", { lvl: level, lbl });
  }
  if (mode === "solfege" && typeof getSolfegeLevelSummaryLabel === "function") {
    return getSolfegeLevelSummaryLabel(level);
  }
  if (String(mode || "").startsWith("interval-") && mode !== "interval-chords") {
    const intLvl = parseInt(level, 10) || 1;
    const intMixLabels = {
      1: tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", { lvl: 1, lbl: tr("Einsteiger", "Beginner") }),
      2: tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", { lvl: 2, lbl: tr("Dur 1–4", "Major 1–4") }),
      3: tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", { lvl: 3, lbl: tr("Dur 5–8", "Major 5–8") }),
      4: tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", { lvl: 4, lbl: tr("Dur-Tonleiter", "Major Scale") }),
      5: tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", { lvl: 5, lbl: tr("Alle Intervalle", "All Intervals") }),
      6: `${tr("Moll", "Minor")} 1 (${tr("Einsteiger", "Beginner")})`,
      7: `${tr("Moll", "Minor")} 2 (${tr("Moll 1–4", "Minor 1–4")})`,
      8: `${tr("Moll", "Minor")} 3 (${tr("Moll 5–8", "Minor 5–8")})`,
      9: `${tr("Moll", "Minor")} 4 (${tr("Moll-Tonleiter", "Minor Scale")})`,
      10: tr("Eigene Tonart & Modus", "Custom Key & Mode")
    };
    if (intMixLabels[intLvl]) return intMixLabels[intLvl];
  }
  return tf("Stufe {lvl}", "Level {lvl}", { lvl: level });
}

function formatMixSubtitle(mix) {
  const modeLabel = getLocalizedMixModeLabel(mix.mode);
  const lvlText = getLevelDisplayForMix(mix.mode, mix.level);
  const notKeyMode = isNotationStaffMode(mix.mode) ? normalizeNotationKeyMode(mix.notationKeyMode) : "none";
  const notKeyText = notKeyMode !== "none" ? ` • ${getLocalizedNotationKeyModeLabel(notKeyMode, true)}` : "";
  const bpmText = !mix.mode.startsWith("prod-") && !mix.mode.startsWith("modes-") && !isNotationMode(mix.mode) && !isBlockChordMode(mix.mode) && mix.bpm > 0 ? ` • ${mix.bpm} BPM` : "";
  return `${modeLabel} • ${lvlText}${notKeyText}${bpmText}`;
}

function applyModeAndLevelFromConfig(cfg) {
  const mode = cfg.mode;
  state.setMode(mode);
  if (isCadenceMode(mode)) {
    state.setDifficulty(cfg.level || 1);
  } else if (isChordQualityMode(mode)) {
    state.setChordDifficulty(cfg.level || 1);
  } else if (mode === "chord-inversions") {
    state.setChordInversionDifficulty(cfg.level || 1);
  } else if (mode === "solfege") {
    state.setSolfegeDifficulty(cfg.level || 1);
  } else if (isNotationMode(mode)) {
    state.setNotationLevel(mode, cfg.level || 1, cfg.notationKeyMode || "none");
  } else if (mode === "melody") {
    state.setMelodyConfig(
      cfg.melodyRange || cfg.level || "do-fa",
      cfg.melodyKeyMode || "fixed",
      cfg.melodyOctaveMode || "single",
      cfg.melodyStyle || null,
      typeof cfg.melodyPulse === "boolean" ? cfg.melodyPulse : null
    );
  } else if (mode.startsWith("rhythm-")) {
    state.setRhythmLevel(mode, cfg.level || 1);
  } else if (mode.startsWith("prod-")) {
    state.setProdLevel(mode, cfg.level || 1);
  } else if (mode.startsWith("modes-")) {
    state.setModesLevel(mode, cfg.level || 1);
  } else {
    state.setIntervalDifficulty(cfg.level || 1);
  }

  if (cfg.bpm && Number(cfg.bpm) >= 55) {
    const b = Number(cfg.bpm);
    state.settings.bpm = b;
    state.settings.randomBpm = false;
    state.activeBpm = b;
    state.hasManualExerciseBpm = true;
    const inlineSlider = document.getElementById("inlineBpmSlider");
    if (inlineSlider) inlineSlider.value = b;
    document.getElementById("inlineBpmRandomBtn")?.classList.remove("active");
  }
}

function launchProfileMix(mixId, returnView = state.currentView === "home" ? "home" : "space") {
  const mix = (state.profile?.mixes || []).find(m => m.id === mixId);
  if (!mix) return;
  markSessionActivity();
  const hasCustomBpm = Boolean(mix.bpm && Number(mix.bpm) >= 55);
  applyModeAndLevelFromConfig(mix);
  state.exerciseReturnView = returnView;
  switchView("exercise", { preserveBpm: hasCustomBpm });
}

function captureCurrentExerciseAsMix(customTitle = "") {
  const mode = state.settings.mode;
  let level = 1;
  if (isCadenceMode(mode)) level = state.settings.difficulty;
  else if (isChordQualityMode(mode)) level = state.settings.chordDifficulty;
  else if (mode === "chord-inversions") level = state.settings.chordInversionDifficulty;
  else if (mode === "solfege") level = state.settings.solfegeDifficulty;
  else if (mode === "melody") level = state.settings.melodyRange;
  else if (mode === "rhythm-meter") level = state.settings.rhythmMeterDifficulty;
  else if (mode === "rhythm-dictation") level = state.settings.rhythmDictationDifficulty;
  else if (mode === "rhythm-tap") level = state.settings.rhythmTapDifficulty;
  else if (mode === "rhythm-groove") level = state.settings.rhythmGrooveDifficulty;
  else if (mode === "prod-tone") level = state.settings.prodToneDifficulty;
  else if (mode === "prod-eq-noise") level = state.settings.prodEqNoiseDifficulty;
  else if (mode === "modes-scale") level = state.settings.modesScaleDifficulty;
  else if (mode === "modes-char") level = state.settings.modesCharDifficulty;
  else if (mode === "modes-cadence") level = state.settings.modesCadenceDifficulty;
  else if (isNotationMode(mode)) level = state.settings.notationDifficulty;
  else level = state.settings.intervalDifficulty;

  const mix = sanitizeMixEntry({
    id: `mix_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    title: customTitle || getLocalizedMixModeLabel(mode) || tr("Mein Mix", "My Mix"),
    mode: mode,
    level: level,
    melodyRange: state.settings.melodyRange,
    melodyKeyMode: state.settings.melodyKeyMode,
    melodyOctaveMode: state.settings.melodyOctaveMode,
    melodyStyle: state.settings.melodyStyle,
    melodyPulse: state.settings.melodyPulse,
    notationKeyMode: isNotationMode(mode) ? normalizeNotationKeyMode(state.settings.notationKeyMode) : "none",
    bpm: !mode.startsWith("prod-") && !mode.startsWith("modes-") && !isNotationMode(mode) && !isBlockChordMode(mode) && state.hasManualExerciseBpm ? state.activeBpm : 0
  });
  if (!mix) return null;

  state.profile.mixes = [mix, ...(state.profile.mixes || [])].slice(0, 16);
  saveUserProfile(state.profile);
  renderProfileMixes();
  return mix;
}

function deleteProfileMix(mixId) {
  state.profile.mixes = (state.profile.mixes || []).filter(m => m.id !== mixId);
  saveUserProfile(state.profile);
  renderProfileMixes();
}

function renderHomeQuickMixBar() {
  const wrap = document.getElementById("homeQuickMixBar");
  if (!wrap) return;

  const mixes = state.profile?.mixes || [];
  if (mixes.length === 0 || !state.profile?.showHomeQuickMixes) {
    wrap.classList.add("hidden");
    wrap.innerHTML = "";
    return;
  }

  wrap.classList.remove("hidden");
  wrap.innerHTML = `
    <span class="home-quick-mix-label">${tr("Schnellstart • Deine Mixe", "Quick Start • Your Mixes")}</span>
    <div class="home-quick-mix-chips">
      ${mixes.slice(0, 4).map(mix => `
        <button type="button" class="quick-mix-chip" data-home-launch-mix="${escapeHtml(mix.id)}" title="${escapeHtml(formatMixSubtitle(mix))}">
          <span class="quick-mix-play" aria-hidden="true">▶</span>
          <span class="quick-mix-name">${escapeHtml(getLocalizedMixTitle(mix))}</span>
        </button>
      `).join("")}
    </div>
  `;

  wrap.querySelectorAll("[data-home-launch-mix]").forEach(btn => {
    btn.addEventListener("click", () => launchProfileMix(btn.dataset.homeLaunchMix, "home"));
  });
}

function markPracticeStarted() {
  if (!state.profile || state.profile.hasPracticed !== false) return;
  state.profile.hasPracticed = true;
  saveUserProfile(state.profile);
  state.updateQuickStartLabel();
}

function syncHomeQuickMixToggle() {
  const enabled = Boolean(state.profile?.showHomeQuickMixes);
  document.querySelectorAll("[data-home-mixes]").forEach(btn => {
    const active = (btn.dataset.homeMixes === "on") === enabled;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

function setHomeQuickMixesEnabled(enabled) {
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile.showHomeQuickMixes = Boolean(enabled);
  saveUserProfile(state.profile);
  syncHomeQuickMixToggle();
  renderHomeQuickMixBar();
}

function syncHomeFocusHighlights() {
  if (typeof document === "undefined" || typeof getFocusedHomeCategories !== "function") return;
  const homeView = document.getElementById("viewHome");
  if (!homeView) return;

  const focusedCats = getFocusedHomeCategories(state?.profile);
  const topLabel = tr("Dein", "Your");
  const bottomLabel = tr("Fokus", "Focus");

  homeView.querySelectorAll(".category-nav-card[data-open-category]").forEach(card => {
    const cat = card.dataset?.openCategory;
    const isMatch = Boolean(cat && focusedCats.has(cat));
    card.classList.toggle("is-focus-match", isMatch);

    let pill = card.querySelector(".cat-focus-pill");
    if (isMatch) {
      if (!pill) {
        pill = document.createElement("span");
        pill.className = "cat-focus-pill";
        const chevron = card.querySelector(".cat-chevron");
        if (chevron) card.insertBefore(pill, chevron);
        else card.appendChild(pill);
      }
      pill.innerHTML = `<span class="cat-focus-line-top">${escapeHtml(topLabel)}</span><span class="cat-focus-line-bottom"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.4l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z"/></svg><span>${escapeHtml(bottomLabel)}</span></span>`;
    } else if (pill) {
      pill.remove();
    }
  });
}

function renderHomeProfileGreeting() {
  state.updateQuickStartLabel();
  rotateMascotSlot("heroMascotSvg", "idle", true, {
    slot: "hero",
    keepIfSameMood: state.currentView !== "home",
    forceRotate: state.currentView === "home"
  });

  const bar = document.getElementById("homeProfileGreeting");
  if (bar) {
    bar.classList.add("hidden");
    bar.innerHTML = "";
  }

  refreshCurrentQuoteLocalization();
  renderHomeQuickMixBar();
  syncHomeFocusHighlights();
}

function getSessionTimerLocalizedNote(st) {
  if (!st) return tr("Bereit für eine entspannte Session.", "Ready for a calm session.");
  const idleMins = getSessionIdleMinutes();
  if (st.noteKind === "custom" && st.statusNote) return st.statusNote;
  if (st.noteKind === "running" && idleMins === SESSION_IDLE_NEVER) {
    return tr("Läuft (ohne Auto-Stopp).", "Running (no auto-stop).");
  }
  if (st.noteKind === "running") {
    return tf("Läuft (stoppt automatisch nach {mins} Min Inaktivität).", "Running (auto-stops after {mins} min idle).", { mins: idleMins });
  }
  if (st.noteKind === "paused") {
    return tr("Pausiert – tippe auf „Fortsetzen“, wenn es weitergeht.", "Paused — tap “Resume” whenever you’re ready.");
  }
  if (st.noteKind === "completed") {
    return tr("Session geschafft! Gönn deinen Ohren eine kurze Pause – hier wird nichts gezählt.", "Session complete! Give your ears a quick rest — nothing is tracked here.");
  }
  if (st.noteKind === "auto-stopped-idle") {
    return tf("Automatisch beendet nach {mins} Min Inaktivität.", "Auto-stopped after {mins} min of inactivity.", { mins: idleMins });
  }
  if (st.noteKind === "auto-stopped-pause") {
    return tf("Automatisch beendet nach {mins} Min Pause.", "Auto-stopped after {mins} min away.", { mins: idleMins });
  }
  return tr("Bereit für eine entspannte Session.", "Ready for a calm session.");
}

function renderSessionTimerUI() {
  const st = state.sessionTimer;
  if (!st) return;

  const displayEl = document.getElementById("spaceTimerDisplay");
  const badgeEl = document.getElementById("spaceTimerStatusBadge");
  const noteEl = document.getElementById("spaceTimerNote");
  const toggleBtn = document.getElementById("timerToggleBtn");

  if (displayEl) displayEl.textContent = formatSessionMMSS(st.remainingSec);
  const localizedNote = getSessionTimerLocalizedNote(st);
  if (st.noteKind !== "custom") st.statusNote = localizedNote;
  if (noteEl) noteEl.textContent = localizedNote;

  if (badgeEl) {
    const statusMap = {
      "idle": tr("Bereit", "Ready"),
      "running": tr("Läuft", "Running"),
      "paused": tr("Pausiert", "Paused"),
      "completed": tr("Geschafft", "Done"),
      "auto-stopped": tr("Auto-Stopp", "Auto-Stop")
    };
    badgeEl.textContent = statusMap[st.status] || tr("Bereit", "Ready");
  }

  if (toggleBtn) {
    if (st.status === "running") {
      toggleBtn.textContent = tr("⏸ Pausieren", "⏸ Pause");
    } else if (st.status === "paused") {
      toggleBtn.textContent = tr("▶ Fortsetzen", "▶ Resume");
    } else {
      toggleBtn.textContent = tr("▶ Session starten", "▶ Start Session");
    }
  }

  const durMins = sanitizeSessionTimerMinutes(state.profile.sessionMinutes);
  const idleMinsNow = getSessionIdleMinutes();
  const durIsCustom = !SESSION_TIMER_PRESETS.includes(durMins);
  const idleIsCustom = idleMinsNow !== SESSION_IDLE_NEVER && !SESSION_IDLE_PRESETS.includes(idleMinsNow);
  document.querySelectorAll("[data-timer-mins]").forEach(btn => {
    const isCustomBtn = btn.dataset.timerMins === "custom";
    btn.classList.toggle("active", isCustomBtn ? durIsCustom : parseInt(btn.dataset.timerMins, 10) === durMins);
  });
  document.querySelectorAll("[data-timer-idle]").forEach(btn => {
    const isCustomBtn = btn.dataset.timerIdle === "custom";
    btn.classList.toggle("active", isCustomBtn ? idleIsCustom : parseInt(btn.dataset.timerIdle, 10) === idleMinsNow);
  });
  const durCustomBtn = document.getElementById("timerDurationCustomBtn");
  if (durCustomBtn) durCustomBtn.textContent = getSessionTimerCustomChipLabel(durIsCustom ? durMins : null);
  const idleCustomBtn = document.getElementById("timerIdleCustomBtn");
  if (idleCustomBtn) idleCustomBtn.textContent = getSessionTimerCustomChipLabel(idleIsCustom ? idleMinsNow : null);

  const summaryEl = document.getElementById("spaceTimerConfigSummary");
  if (summaryEl) {
    summaryEl.textContent = idleMinsNow === SESSION_IDLE_NEVER
      ? tf("{dur} Min • ohne Auto-Stopp", "{dur} min • no auto-stop", { dur: durMins })
      : tf("{dur} Min • Auto-Stopp {idle} Min", "{dur} min • Auto-stop {idle} min", { dur: durMins, idle: idleMinsNow });
  }
}

/** Beschriftung des „Eigene Zeit“-Chips: ohne eigenen Wert neutral, sonst mit der gewählten Minutenzahl. */
function getSessionTimerCustomChipLabel(mins = null) {
  if (!Number.isFinite(mins)) {
    return tr("Eigene Zeit", "Set your own", { fr: "Autre durée", es: "Otra duración", it: "Durata personalizzata", pl: "Własny czas", uk: "Свій час", ur: "اپنا وقت" });
  }
  return tf("Eigene: {n} Min", "Own: {n} min", { n: mins });
}

/** Klappt die Eingabezeile für eine eigene Minutenzahl auf/zu und füllt den aktuellen Wert vor. */
function toggleSessionTimerCustomRow(kind, forceOpen = null) {
  const isIdle = kind === "idle";
  const row = document.getElementById(isIdle ? "timerIdleCustomRow" : "timerDurationCustomRow");
  const btn = document.getElementById(isIdle ? "timerIdleCustomBtn" : "timerDurationCustomBtn");
  const input = document.getElementById(isIdle ? "timerIdleCustomInput" : "timerDurationCustomInput");
  if (!row) return;
  const open = forceOpen === null ? row.classList.contains("hidden") : Boolean(forceOpen);
  row.classList.toggle("hidden", !open);
  btn?.setAttribute("aria-expanded", String(open));
  if (open && input) {
    const cur = isIdle ? getSessionIdleMinutes() : sanitizeSessionTimerMinutes(state.profile.sessionMinutes);
    input.value = cur > 0 ? String(cur) : "";
    try { input.focus({ preventScroll: true }); input.select(); } catch (_) {}
  }
}

/** Übernimmt die eingegebene Minutenzahl (mit Bereichsprüfung). */
function applySessionTimerCustomValue(kind) {
  const isIdle = kind === "idle";
  const input = document.getElementById(isIdle ? "timerIdleCustomInput" : "timerDurationCustomInput");
  const min = isIdle ? SESSION_IDLE_MIN_MINUTES : SESSION_TIMER_MIN_MINUTES;
  const max = isIdle ? SESSION_IDLE_MAX_MINUTES : SESSION_TIMER_MAX_MINUTES;
  const raw = String(input?.value ?? "").trim().replace(",", ".");
  const num = Number(raw);
  if (!raw || !Number.isInteger(num) || num < min || num > max) {
    showAppToast(tf("Bitte eine ganze Zahl zwischen {min} und {max} eingeben.", "Please enter a whole number between {min} and {max}.", { min, max }), "error");
    try { input?.focus(); } catch (_) {}
    return;
  }
  if (isIdle) setSessionIdleMinutes(num);
  else setSessionDurationMinutes(num);
  toggleSessionTimerCustomRow(kind, false);
}

function stopSessionTimer(nextStatus = "idle", customNote = null, noteKind = null) {
  const st = state.sessionTimer;
  if (!st) return;
  if (st.intervalId !== null) {
    clearInterval(st.intervalId);
    st.intervalId = null;
  }
  st.status = nextStatus;
  st.hiddenSinceWallMs = null;
  st.totalSec = (state.profile.sessionMinutes || 10) * 60;
  st.remainingSec = st.totalSec;
  if (noteKind) {
    st.noteKind = noteKind;
    st.statusNote = customNote || getSessionTimerLocalizedNote(st);
  } else if (customNote) {
    st.noteKind = "custom";
    st.statusNote = customNote;
  } else if (nextStatus === "idle") {
    st.noteKind = "idle";
    st.statusNote = getSessionTimerLocalizedNote(st);
  }
  renderSessionTimerUI();
  state.updateHeaderSubtext();
}

function completeSessionTimer() {
  const st = state.sessionTimer;
  if (!st) return;
  if (st.intervalId !== null) {
    clearInterval(st.intervalId);
    st.intervalId = null;
  }
  st.status = "completed";
  st.remainingSec = 0;
  st.hiddenSinceWallMs = null;
  st.noteKind = "completed";
  st.statusNote = getSessionTimerLocalizedNote(st);

  if (typeof audioEngine !== "undefined" && audioEngine.isInitialized && !state.master.muted) {
    audioEngine.playStep(["C5"], 0.45, null, "interval");
    setTimeout(() => audioEngine.playStep(["E5", "G5"], 0.85, null, "interval"), 220);
  }

  renderSessionTimerUI();
  state.updateHeaderSubtext();
}

function tickSessionTimer(nowWallMs = Date.now()) {
  const st = state.sessionTimer;
  if (!st || st.status !== "running") return;

  if (state.isPlaying) {
    st.lastActivityWallMs = nowWallMs;
    st.hiddenSinceWallMs = null;
  }

  const idleMins = getSessionIdleMinutes();
  const idleLimitMs = idleMins * 60 * 1000;
  const inactiveSinceWall = nowWallMs - st.lastActivityWallMs;
  const hiddenDuration = st.hiddenSinceWallMs !== null ? (nowWallMs - st.hiddenSinceWallMs) : 0;

  // Auto-Stopp „Nie“: Timer läuft unabhängig von Inaktivität bis zum Ende
  if (idleMins !== SESSION_IDLE_NEVER && (inactiveSinceWall >= idleLimitMs || hiddenDuration >= idleLimitMs)) {
    stopSessionTimer("auto-stopped", null, "auto-stopped-idle");
    return;
  }

  st.remainingSec = Math.max(0, st.remainingSec - 1);
  if (st.remainingSec <= 0) {
    completeSessionTimer();
    return;
  }

  renderSessionTimerUI();
  state.updateHeaderSubtext();
}

function startOrResumeSessionTimer() {
  const st = state.sessionTimer;
  if (!st) return;
  markSessionActivity();

  if (st.status !== "paused") {
    st.totalSec = (state.profile.sessionMinutes || 10) * 60;
    st.remainingSec = st.totalSec;
  }
  st.status = "running";
  st.noteKind = "running";
  st.statusNote = getSessionTimerLocalizedNote(st);

  if (st.intervalId !== null) clearInterval(st.intervalId);
  st.intervalId = setInterval(() => tickSessionTimer(), 1000);

  renderSessionTimerUI();
  state.updateHeaderSubtext();
}

function pauseSessionTimer() {
  const st = state.sessionTimer;
  if (!st || st.status !== "running") return;
  if (st.intervalId !== null) {
    clearInterval(st.intervalId);
    st.intervalId = null;
  }
  st.status = "paused";
  st.noteKind = "paused";
  st.statusNote = getSessionTimerLocalizedNote(st);
  renderSessionTimerUI();
  state.updateHeaderSubtext();
}

function setSessionDurationMinutes(mins) {
  if (mins === "custom") {
    toggleSessionTimerCustomRow("duration");
    return;
  }
  toggleSessionTimerCustomRow("duration", false);
  const parsed = sanitizeSessionTimerMinutes(mins);
  state.profile.sessionMinutes = parsed;
  saveUserProfile(state.profile);
  if (state.sessionTimer.status === "idle" || state.sessionTimer.status === "completed" || state.sessionTimer.status === "auto-stopped") {
    state.sessionTimer.totalSec = parsed * 60;
    state.sessionTimer.remainingSec = parsed * 60;
    state.sessionTimer.status = "idle";
    state.sessionTimer.noteKind = "idle";
    state.sessionTimer.statusNote = getSessionTimerLocalizedNote(state.sessionTimer);
  }
  renderSessionTimerUI();
  state.updateHeaderSubtext();
}

function setSessionIdleMinutes(mins) {
  if (mins === "custom") {
    toggleSessionTimerCustomRow("idle");
    return;
  }
  toggleSessionTimerCustomRow("idle", false);
  const parsed = sanitizeSessionIdleMinutes(mins);
  state.profile.inactivityMinutes = parsed;
  saveUserProfile(state.profile);
  if (state.sessionTimer.status === "running") {
    state.sessionTimer.noteKind = "running";
    state.sessionTimer.statusNote = getSessionTimerLocalizedNote(state.sessionTimer);
  }
  renderSessionTimerUI();
}

function getBreakReminderMinutes() {
  const raw = state?.profile?.breakReminderMinutes;
  return sanitizeBreakReminderMinutes(raw);
}

function syncBreakReminderControls() {
  syncSingAlongSettingsControls();
  if (typeof syncTutorialSettingsControls === "function") {
    syncTutorialSettingsControls();
  }
  const enabled = state?.profile?.breakReminderEnabled !== false;
  const mins = getBreakReminderMinutes();

  if (typeof document !== "undefined" && typeof document.querySelectorAll === "function") {
    document.querySelectorAll("[data-break-enabled]").forEach(btn => {
      const isOnBtn = btn.dataset?.breakEnabled !== "off";
      const active = isOnBtn === enabled;
      btn.classList?.toggle("active", active);
      btn.setAttribute?.("aria-pressed", String(active));
    });
    document.querySelectorAll("[data-break-preset]").forEach(btn => {
      const val = parseInt(btn.dataset?.breakPreset, 10);
      btn.classList?.toggle("active", val === mins);
      if (Number.isFinite(val)) {
        btn.textContent = tf("{mins} Min", "{mins} min", { mins: val });
      }
    });
  }

  const sliderEl = document.getElementById("breakReminderSlider");
  if (sliderEl) sliderEl.value = String(mins);
  const valEl = document.getElementById("breakReminderVal");
  if (valEl) valEl.textContent = tf("{mins} Min", "{mins} min", { mins });
  const rowEl = document.getElementById("breakReminderDurationRow");
  if (rowEl) rowEl.classList.toggle("is-disabled", !enabled);

  if (state?.breakReminder?.promptOpen) {
    renderBreakReminderModalContent();
  }
}

function renderBreakReminderModalContent() {
  const mins = getBreakReminderMinutes();
  rotateMascotSlot("breakReminderMascot", "break", true, { slot: "break", forceRotate: true });
  const bodyEl = document.getElementById("breakReminderBody");
  if (bodyEl) {
    bodyEl.textContent = tf(
      "Du übst schon seit {mins} Minuten am Stück. Eine kurze Verschnaufpause von 2–3 Minuten hält deine Ohren frisch!",
      "You’ve been practicing for {mins} minutes straight. A short 2–3 minute breather keeps your ears fresh!",
      { mins }
    );
  }
  const contEl = document.getElementById("breakContinueBtn");
  if (contEl) {
    contEl.textContent = tf("Weiterüben (+{mins} Min)", "Keep Practicing (+{mins} min)", { mins });
  }
}

function stopBreakReminderTicker() {
  const br = state?.breakReminder;
  if (!br) return;
  if (br.intervalId !== null) {
    clearInterval(br.intervalId);
    br.intervalId = null;
  }
}

function startBreakReminderTicker() {
  const br = state?.breakReminder;
  if (!br || !state?.profile?.breakReminderEnabled) return;
  if (state.currentView !== "exercise" || br.promptOpen) return;
  if (br.intervalId === null) {
    br.intervalId = setInterval(() => tickBreakReminder(), 1000);
  }
}

function resetBreakReminderTimer(options = {}) {
  const br = state?.breakReminder;
  if (!br) return;
  stopBreakReminderTicker();
  br.elapsedSec = 0;
  br.hiddenSinceWallMs = null;
  br.lastActivityWallMs = Date.now();
  br.promptOpen = false;
  br.pausedOnBreak = Boolean(options.pausedOnBreak);
  if (options.restartTicker !== false && !br.pausedOnBreak && state.currentView === "exercise" && state.profile?.breakReminderEnabled) {
    startBreakReminderTicker();
  }
}

function setBreakReminderEnabled(enabled) {
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile.breakReminderEnabled = Boolean(enabled);
  saveUserProfile(state.profile);
  if (!state.profile.breakReminderEnabled) {
    resetBreakReminderTimer();
  } else {
    state.breakReminder.pausedOnBreak = false;
    state.breakReminder.lastActivityWallMs = Date.now();
    if (state.currentView === "exercise") startBreakReminderTicker();
  }
  syncBreakReminderControls();
}

function setBreakReminderMinutes(mins) {
  if (!state.profile) state.profile = createDefaultProfile();
  const parsed = sanitizeBreakReminderMinutes(mins);
  state.profile.breakReminderMinutes = parsed;
  saveUserProfile(state.profile);
  if (state.breakReminder) {
    const targetSec = parsed * 60;
    if (state.breakReminder.elapsedSec >= targetSec) {
      state.breakReminder.elapsedSec = 0;
    }
  }
  syncBreakReminderControls();
}

function openBreakReminderModal() {
  const br = state?.breakReminder;
  if (!br || br.promptOpen) return;
  br.promptOpen = true;
  stopBreakReminderTicker();
  stopPlayback();
  renderBreakReminderModalContent();
  if (typeof audioEngine !== "undefined" && audioEngine.isInitialized && !state.master?.muted) {
    audioEngine.playStep(["E5"], 0.36, null, "interval");
    setTimeout(() => audioEngine.playStep(["G5"], 0.65, null, "interval"), 200);
  }
  setModalVisibility("break");
  pushAppHistory("break");
}

function dismissBreakReminder(action = "continue") {
  const br = state?.breakReminder;
  if (!br) return;
  if (action === "disable") {
    setBreakReminderEnabled(false);
    setModalVisibility(null);
    return;
  }
  if (action === "pause") {
    resetBreakReminderTimer({ pausedOnBreak: true, restartTicker: false });
    setModalVisibility(null);
    if (state.currentView === "exercise") {
      switchView("home");
    }
    return;
  }
  resetBreakReminderTimer({ pausedOnBreak: false, restartTicker: true });
  setModalVisibility(null);
}

/**
 * Zählt aktive Übezeit im Hintergrund ohne sichtbare Daueranzeige und meldet sich nach X Minuten.
 */
function tickBreakReminder(nowWallMs = Date.now()) {
  const br = state?.breakReminder;
  if (!br || !state?.profile?.breakReminderEnabled) {
    stopBreakReminderTicker();
    return;
  }
  if (state.currentView !== "exercise") {
    stopBreakReminderTicker();
    return;
  }
  if (br.promptOpen || br.pausedOnBreak) return;
  if (typeof document !== "undefined" && document.hidden) return;

  if (state.isPlaying) {
    br.lastActivityWallMs = nowWallMs;
  }
  const idleMs = nowWallMs - (br.lastActivityWallMs || nowWallMs);
  if (!state.isPlaying && idleMs >= 120000) {
    return;
  }

  br.elapsedSec += 1;
  const targetSec = getBreakReminderMinutes() * 60;
  if (br.elapsedSec >= targetSec) {
    if (state.exam?.active) return;
    openBreakReminderModal();
  }
}

function renderProfileMixes() {
  syncHomeQuickMixToggle();
  const listEl = document.getElementById("spaceMixList");
  if (!listEl) {
    renderHomeQuickMixBar();
    return;
  }

  const mixes = state.profile?.mixes || [];
  if (mixes.length === 0) {
    listEl.innerHTML = `<p class="account-card-sub">${tr("Noch keine eigenen Mixe gespeichert – erstelle oben einen Favoriten.", "No custom mixes saved yet — create a favorite above.")}</p>`;
    renderHomeQuickMixBar();
    return;
  }

  listEl.innerHTML = mixes.map(mix => `
    <div class="account-mix-item" data-mix-id="${escapeHtml(mix.id)}">
      <div class="account-mix-info">
        <div class="account-mix-title">${escapeHtml(getLocalizedMixTitle(mix))}</div>
        <div class="account-mix-meta">${escapeHtml(formatMixSubtitle(mix))}</div>
      </div>
      <div class="account-mix-actions">
        <button type="button" class="btn-tool" data-launch-mix="${escapeHtml(mix.id)}">${tr("▶ Starten", "▶ Start")}</button>
        <button type="button" class="account-mix-del" data-delete-mix="${escapeHtml(mix.id)}" title="${tr("Mix entfernen", "Remove mix")}" aria-label="${tr("Mix entfernen", "Remove mix")}">✕</button>
      </div>
    </div>
  `).join("");

  listEl.querySelectorAll("[data-launch-mix]").forEach(btn => {
    btn.addEventListener("click", () => launchProfileMix(btn.dataset.launchMix));
  });
  listEl.querySelectorAll("[data-delete-mix]").forEach(btn => {
    btn.addEventListener("click", () => deleteProfileMix(btn.dataset.deleteMix));
  });
  renderHomeQuickMixBar();
}

function populateMixCreatorControls(options = {}) {
  const modeSel = document.getElementById("mixModeSelect");
  const lvlSel = document.getElementById("mixLevelSelect");
  if (!modeSel || !lvlSel) return;

  const prevMode = modeSel.value;
  if (options.forceRepopulate || !modeSel.dataset.populated) {
    modeSel.innerHTML = Object.entries(MIX_MODE_CATALOG)
      .map(([k]) => `<option value="${k}">${escapeHtml(getLocalizedMixModeLabel(k))}</option>`)
      .join("");
    if (prevMode && MIX_MODE_CATALOG[prevMode]) {
      modeSel.value = prevMode;
    }
    modeSel.dataset.populated = "1";
  }

  const prevLvl = lvlSel.value;
  const chosenMode = MIX_MODE_CATALOG[modeSel.value] ? modeSel.value : "cadence";
  const levels = MIX_MODE_CATALOG[chosenMode].levels;
  lvlSel.innerHTML = levels.map(l => `
    <option value="${escapeHtml(l)}">${escapeHtml(getLevelDisplayForMix(chosenMode, l))}</option>
  `).join("");
  if (prevLvl && levels.map(String).includes(String(prevLvl))) {
    lvlSel.value = prevLvl;
  }
  if (typeof renderMixCreatorDropdowns === "function") {
    renderMixCreatorDropdowns();
  }
}

function renderProfileSingleDropdown({
  containerEl,
  key,
  options,
  selectedKey,
  ariaLabelledBy = "",
  onToggle = null,
  onSelect
}) {
  if (!containerEl || typeof document === "undefined" || typeof document.createElement !== "function") return;
  bindProfileDropdownOutsideCloser();
  containerEl.dataset.profileDropdownHost = key;
  containerEl.innerHTML = "";

  const isOpen = _openProfileDropdownKey === key;
  const activeKey = String(selectedKey ?? "");
  const selectedOpt = options.find(opt => String(opt.key) === activeKey) || options[0] || null;

  const wrap = document.createElement("div");
  wrap.className = "multi-dropdown-wrap";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = `account-select multi-dropdown-trigger${isOpen ? " is-open" : ""}`;
  trigger.dataset.dropdownTrigger = key;
  trigger.setAttribute?.("aria-haspopup", "listbox");
  trigger.setAttribute?.("aria-expanded", String(isOpen));
  if (ariaLabelledBy) trigger.setAttribute?.("aria-labelledby", ariaLabelledBy);
  trigger.innerHTML = `<span class="multi-dropdown-summary">${escapeHtml(selectedOpt ? selectedOpt.label : "")}</span><span class="multi-dropdown-meta">${buildDropdownChevronSVG()}</span>`;
  trigger.addEventListener("click", (e) => {
    e?.stopPropagation?.();
    _openProfileDropdownKey = isOpen ? null : key;
    if (typeof onToggle === "function") {
      onToggle(_openProfileDropdownKey === key);
    } else {
      renderProfileAccountView();
    }
    if (_openProfileDropdownKey === key) {
      const openedMenu = containerEl.querySelector(".multi-dropdown-menu");
      openedMenu?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
      const activeEl = containerEl.querySelector(".multi-dropdown-option.is-selected");
      activeEl?.scrollIntoView?.({ block: "nearest" });
    }
  });
  wrap.appendChild(trigger);

  const menu = document.createElement("div");
  menu.className = `multi-dropdown-menu${isOpen ? "" : " hidden"}`;
  menu.setAttribute?.("role", "listbox");
  if (ariaLabelledBy) menu.setAttribute?.("aria-labelledby", ariaLabelledBy);

  options.forEach(opt => {
    const isSel = selectedOpt && String(opt.key) === String(selectedOpt.key);
    const isDisabled = Boolean(opt.disabled);
    const optBtn = document.createElement("button");
    optBtn.type = "button";
    optBtn.className = `multi-dropdown-option${isSel ? " is-selected" : ""}${isDisabled ? " is-disabled" : ""}`;
    optBtn.dataset.dropdownOption = String(opt.key);
    optBtn.setAttribute?.("role", "option");
    optBtn.setAttribute?.("aria-selected", String(Boolean(isSel)));
    if (isDisabled) {
      optBtn.disabled = true;
      optBtn.setAttribute?.("aria-disabled", "true");
    }
    const hintHtml = opt.hint ? `<span class="multi-dropdown-opt-hint">${escapeHtml(opt.hint)}</span>` : "";
    const tagHtml = opt.metaTag ? `<span class="multi-dropdown-opt-tag">${escapeHtml(opt.metaTag)}</span>` : "";
    optBtn.innerHTML = `<span class="multi-dropdown-check" aria-hidden="true">${isSel ? "✓" : ""}</span><span class="multi-dropdown-opt-text"><span>${escapeHtml(opt.label)}</span>${hintHtml}</span>${tagHtml}`;
    optBtn.addEventListener("click", (e) => {
      e?.stopPropagation?.();
      if (isDisabled) return;
      _openProfileDropdownKey = null;
      if (typeof onSelect === "function") onSelect(opt.key);
    });
    menu.appendChild(optBtn);
  });

  wrap.appendChild(menu);
  containerEl.appendChild(wrap);
}

function renderSettingsLanguageDropdown(lang = state?.settings?.language || "de") {
  const host = document.getElementById("settingsLanguageDropdown");
  if (!host) return;
  const active = typeof normalizeAppLanguage === "function" ? normalizeAppLanguage(lang) : "de";
  const ordered = typeof getOrderedDropdownLanguages === "function"
    ? getOrderedDropdownLanguages(active)
    : [{ code: active, nativeName: active === "en" ? "English" : "Deutsch", disabled: false }];
  const soonTag = typeof getLanguageSoonLabel === "function" ? getLanguageSoonLabel(active) : "demnächst";

  const options = ordered.map(item => ({
    key: item.code,
    label: item.nativeName || item.label || item.code,
    disabled: Boolean(item.disabled),
    metaTag: item.disabled ? soonTag : ""
  }));

  renderProfileSingleDropdown({
    containerEl: host,
    key: "settings-language",
    options,
    selectedKey: active,
    ariaLabelledBy: "settingsLanguageHeading",
    onToggle: () => {
      renderSettingsLanguageDropdown(state?.settings?.language || active);
    },
    onSelect: (nextLang) => {
      if (typeof isLanguageAvailable === "function" && !isLanguageAvailable(nextLang)) {
        renderSettingsLanguageDropdown(state?.settings?.language || active);
        return;
      }
      setLanguagePreference(nextLang);
    }
  });
}

const MIX_BPM_OPTION_SPECS = [
  { key: "0",   i18nKey: "space.mixBpmDefault", fallback: "Standardtempo" },
  { key: "70",  i18nKey: "space.mixBpm70",      fallback: "70 BPM (Ruhig)" },
  { key: "85",  i18nKey: "space.mixBpm85",      fallback: "85 BPM (Entspannt)" },
  { key: "95",  i18nKey: "space.mixBpm95",      fallback: "95 BPM (Mittel)" },
  { key: "110", i18nKey: "space.mixBpm110",     fallback: "110 BPM (Flott)" },
  { key: "125", i18nKey: "space.mixBpm125",     fallback: "125 BPM (Sportlich)" }
];

function renderMixCreatorDropdowns() {
  const modeSel = document.getElementById("mixModeSelect");
  const lvlSel = document.getElementById("mixLevelSelect");
  const bpmSel = document.getElementById("mixBpmSelect");
  const modeHost = document.getElementById("mixModeDropdown");
  const lvlHost = document.getElementById("mixLevelDropdown");
  const bpmHost = document.getElementById("mixBpmDropdown");
  if (!modeSel || !lvlSel || !bpmSel) return;

  const chosenMode = MIX_MODE_CATALOG[modeSel.value] ? modeSel.value : "cadence";
  if (modeHost) {
    const modeOptions = Object.keys(MIX_MODE_CATALOG).map(k => ({
      key: k,
      label: getLocalizedMixModeLabel(k)
    }));
    renderProfileSingleDropdown({
      containerEl: modeHost,
      key: "mix-mode",
      options: modeOptions,
      selectedKey: chosenMode,
      ariaLabelledBy: "mixModeLabel",
      onSelect: (nextMode) => {
        modeSel.value = nextMode;
        populateMixCreatorControls();
      }
    });
  }

  if (lvlHost) {
    const levels = MIX_MODE_CATALOG[chosenMode].levels || [];
    const levelOptions = levels.map(l => ({
      key: String(l),
      label: getLevelDisplayForMix(chosenMode, l)
    }));
    const currentLvl = levelOptions.some(o => o.key === String(lvlSel.value))
      ? String(lvlSel.value)
      : (levelOptions[0]?.key || "1");
    if (lvlSel.value !== currentLvl) lvlSel.value = currentLvl;
    renderProfileSingleDropdown({
      containerEl: lvlHost,
      key: "mix-level",
      options: levelOptions,
      selectedKey: currentLvl,
      ariaLabelledBy: "mixLevelLabel",
      onSelect: (nextLevel) => {
        lvlSel.value = String(nextLevel);
        renderMixCreatorDropdowns();
      }
    });
  }

  if (bpmHost) {
    const bpmOptions = MIX_BPM_OPTION_SPECS.map(spec => {
      const localized = typeof getStaticI18nText === "function" ? getStaticI18nText(spec.i18nKey) : null;
      return { key: spec.key, label: localized || spec.fallback };
    });
    const currentBpm = bpmOptions.some(o => o.key === String(bpmSel.value)) ? String(bpmSel.value) : "0";
    if (bpmSel.value !== currentBpm) bpmSel.value = currentBpm;
    renderProfileSingleDropdown({
      containerEl: bpmHost,
      key: "mix-bpm",
      options: bpmOptions,
      selectedKey: currentBpm,
      ariaLabelledBy: "mixBpmLabel",
      onSelect: (nextBpm) => {
        bpmSel.value = String(nextBpm);
        renderMixCreatorDropdowns();
      }
    });
  }
}

function applyProfileDisplayChanges() {
  state.profileDisplayDirty = true;
  const ex = state.currentExercise;
  if (ex) {
    refreshExerciseLocalization(ex);
    if (state.currentView === "exercise") {
      renderUI();
      if (ex.isSolved && (String(ex.type || "").startsWith("interval-") || isChordMode(ex.type)) && ex.targetItem) {
        const stageMain = document.getElementById("stageMainText");
        const stageFn = document.getElementById("stageFunctionText");
        if (stageMain) stageMain.textContent = ex.targetItem.roman || ex.targetItem.symbol;
        if (stageFn) stageFn.textContent = ex.targetItem.label;
        const targetCard = document.getElementById(`barCard_${ex.targetIndex}`);
        if (targetCard) {
          const romanEl = targetCard.querySelector(".bar-roman");
          const lblEl = targetCard.querySelector(".bar-label");
          if (romanEl) romanEl.textContent = ex.targetItem.displayMain || ex.targetItem.roman || ex.targetItem.symbol;
          if (lblEl) {
            lblEl.textContent = ex.type === "chord-inversions"
              ? (ex.bars?.[ex.targetIndex]?.short || ex.targetItem.short)
              : ex.targetItem.short;
          }
        }
      }
      if (state.lastAnswerWasWrong && state.wrongAnswerData?.chosen) {
        const chosenDef = state.wrongAnswerData.chosen;
        renderWrongChoiceFeedbackCard(ex, chosenDef, chosenDef.key || "?", false);
      }
      state.profileDisplayDirty = false;
    }
  }
  if (state.currentView === "category-help") {
    openCategoryHelpPage(state.activeCategory, { refreshOnly: true });
  } else if (state.currentView === "freeplay" && typeof renderFreeplayView === "function") {
    renderFreeplayView();
  } else if (state.currentView === "fretboard" && typeof renderFretboardView === "function") {
    renderFretboardView();
  } else if (state.currentView === "knowledge-detail" && state.activeKnowledgeDetail) {
    if (state.activeKnowledgeDetail.kind === "article") {
      openKnowledgeArticle(state.activeKnowledgeDetail.id, { refreshOnly: true });
    } else if (state.activeKnowledgeDetail.kind === "ref") {
      openKnowledgeRef(state.activeKnowledgeDetail.key, { refreshOnly: true });
    }
  }
}

let _openProfileDropdownKey = null;
let _profileDropdownOutsideBound = false;

function bindProfileDropdownOutsideCloser() {
  if (_profileDropdownOutsideBound || typeof document === "undefined" || typeof document.addEventListener !== "function") {
    return;
  }
  _profileDropdownOutsideBound = true;
  document.addEventListener("click", (e) => {
    if (!_openProfileDropdownKey) return;
    const host = typeof e?.target?.closest === "function"
      ? e.target.closest("[data-profile-dropdown-host]")
      : null;
    if (!host || host.dataset?.profileDropdownHost !== _openProfileDropdownKey) {
      const prevKey = _openProfileDropdownKey;
      _openProfileDropdownKey = null;
      if (prevKey === "settings-language") {
        if (typeof renderSettingsLanguageDropdown === "function") renderSettingsLanguageDropdown();
      } else {
        renderProfileAccountView();
      }
    }
  });
}

function buildDropdownChevronSVG() {
  return `<svg class="multi-dropdown-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;
}

function formatMultiDropdownSummary(selectedItems, placeholderText) {
  if (!selectedItems || selectedItems.length === 0) {
    return { text: placeholderText, isPlaceholder: true };
  }
  if (selectedItems.length <= 2) {
    return { text: selectedItems.map(it => it.label).join(", "), isPlaceholder: false };
  }
  return {
    text: `${selectedItems[0].label}, ${selectedItems[1].label} (+${selectedItems.length - 2})`,
    isPlaceholder: false
  };
}

function renderProfileMultiDropdown({
  containerEl,
  key,
  options,
  selectedKeys,
  placeholderText,
  emptyTagsText,
  resetOption = null,
  onToggle,
  onReset = null
}) {
  if (!containerEl || typeof document === "undefined") return;
  bindProfileDropdownOutsideCloser();
  containerEl.dataset.profileDropdownHost = key;
  containerEl.innerHTML = "";

  const isOpen = _openProfileDropdownKey === key;
  const selectedSet = new Set(selectedKeys || []);
  const selectedOptions = options.filter(opt => selectedSet.has(opt.key));
  const summaryInfo = formatMultiDropdownSummary(selectedOptions, placeholderText);

  if (typeof document.createElement !== "function") return;

  const wrap = document.createElement("div");
  wrap.className = "multi-dropdown-wrap";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = `account-select multi-dropdown-trigger${isOpen ? " is-open" : ""}`;
  trigger.dataset.dropdownTrigger = key;
  trigger.setAttribute?.("aria-haspopup", "listbox");
  trigger.setAttribute?.("aria-expanded", String(isOpen));
  const badgeHtml = selectedOptions.length > 0
    ? `<span class="multi-dropdown-count" title="${escapeHtml(tf("{n} ausgewählt", "{n} selected", { n: selectedOptions.length }))}">${selectedOptions.length}</span>`
    : "";
  trigger.innerHTML = `<span class="multi-dropdown-summary${summaryInfo.isPlaceholder ? " is-placeholder" : ""}">${escapeHtml(summaryInfo.text)}</span><span class="multi-dropdown-meta">${badgeHtml}${buildDropdownChevronSVG()}</span>`;
  trigger.addEventListener("click", (e) => {
    e?.stopPropagation?.();
    _openProfileDropdownKey = isOpen ? null : key;
    renderProfileAccountView();
  });
  wrap.appendChild(trigger);

  const menu = document.createElement("div");
  menu.className = `multi-dropdown-menu${isOpen ? "" : " hidden"}`;
  menu.setAttribute?.("role", "listbox");
  menu.setAttribute?.("aria-multiselectable", "true");

  if (resetOption && typeof onReset === "function") {
    const isResetActive = Boolean(resetOption.isActive);
    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = `multi-dropdown-option multi-dropdown-option-divider${isResetActive ? " is-selected" : ""}`;
    resetBtn.dataset.dropdownOption = resetOption.key;
    resetBtn.setAttribute?.("role", "option");
    resetBtn.setAttribute?.("aria-selected", String(isResetActive));
    resetBtn.innerHTML = `<span class="multi-dropdown-check" aria-hidden="true">${isResetActive ? "✓" : ""}</span><span class="multi-dropdown-opt-text"><span>${escapeHtml(resetOption.label)}</span></span>`;
    resetBtn.addEventListener("click", (e) => {
      e?.stopPropagation?.();
      onReset();
    });
    menu.appendChild(resetBtn);
  }

  options.forEach(opt => {
    const isSel = selectedSet.has(opt.key);
    const optBtn = document.createElement("button");
    optBtn.type = "button";
    optBtn.className = `multi-dropdown-option${isSel ? " is-selected" : ""}`;
    optBtn.dataset.dropdownOption = opt.key;
    optBtn.setAttribute?.("role", "option");
    optBtn.setAttribute?.("aria-selected", String(isSel));
    const hintHtml = opt.hint ? `<span class="multi-dropdown-opt-hint">${escapeHtml(opt.hint)}</span>` : "";
    optBtn.innerHTML = `<span class="multi-dropdown-check" aria-hidden="true">${isSel ? "✓" : ""}</span><span class="multi-dropdown-opt-text"><span>${escapeHtml(opt.label)}</span>${hintHtml}</span>`;
    optBtn.addEventListener("click", (e) => {
      e?.stopPropagation?.();
      onToggle(opt.key);
    });
    menu.appendChild(optBtn);
  });

  wrap.appendChild(menu);
  containerEl.appendChild(wrap);

  const tagsRow = document.createElement("div");
  tagsRow.className = "multi-selected-tags";
  if (selectedOptions.length === 0) {
    const emptyEl = document.createElement("span");
    emptyEl.className = "multi-empty-note";
    emptyEl.textContent = emptyTagsText;
    tagsRow.appendChild(emptyEl);
  } else {
    selectedOptions.forEach(opt => {
      if (opt.fixed) {
        const fixedEl = document.createElement("span");
        fixedEl.className = "k-filter-pill active";
        fixedEl.dataset.selectedBadge = opt.key;
        fixedEl.textContent = opt.label;
        tagsRow.appendChild(fixedEl);
        return;
      }
      const chipBtn = document.createElement("button");
      chipBtn.type = "button";
      chipBtn.className = "k-filter-pill active multi-selected-tag";
      chipBtn.dataset.dropdownRemove = opt.key;
      chipBtn.setAttribute?.("aria-label", tf("{item} entfernen", "Remove {item}", { item: opt.label }));
      chipBtn.innerHTML = `<span>${escapeHtml(opt.label)}</span><span class="multi-selected-remove" aria-hidden="true">×</span>`;
      chipBtn.addEventListener("click", (e) => {
        e?.stopPropagation?.();
        onToggle(opt.key);
      });
      tagsRow.appendChild(chipBtn);
    });
  }
  containerEl.appendChild(tagsRow);
}

function renderProfileAccountView() {
  const p = state.profile || createDefaultProfile();
  rotateMascotSlot("spaceMascotSvg", "idle", true, { slot: "space", forceRotate: true });

  const titleEl = document.getElementById("spaceGreetingTitle");
  const subEl = document.getElementById("spaceGreetingSub");
  const focusKeys = getResolvedProfileFocuses(p);
  const focusDefs = focusKeys.map(getLocalizedProfileFocus);

  if (titleEl) {
    titleEl.textContent = p.name
      ? tf("Hallo, {name}!", "Hi, {name}!", { name: p.name })
      : tr("Dein Musiker-Profil", "Your Musician Profile");
  }
  if (subEl) {
    const instText = p.instruments && p.instruments.length > 0
      ? p.instruments.map(getLocalizedProfileInstrumentLabel).join(" • ")
      : tr("Kein Instrument gewählt", "No instrument selected");
    const focusSummary = focusDefs.length === 1
      ? focusDefs[0].hint
      : focusDefs.map(d => d.label).join(" • ");
    subEl.textContent = `${instText} — ${focusSummary}`;
  }

  const nameInput = document.getElementById("profileNameInput");
  if (nameInput && nameInput.value !== p.name) {
    nameInput.value = p.name;
  }

  const instWrap = document.getElementById("profileInstrumentsGroup");
  if (instWrap) {
    const activeInsts = p.instruments || [];
    const instOptions = PROFILE_INSTRUMENT_OPTIONS.map(inst => ({
      key: inst,
      label: getLocalizedProfileInstrumentLabel(inst)
    }));
    renderProfileMultiDropdown({
      containerEl: instWrap,
      key: "instruments",
      options: instOptions,
      selectedKeys: activeInsts,
      placeholderText: tr("Kein Instrument", "No instrument"),
      emptyTagsText: tr("Kein Instrument gewählt", "No instrument selected"),
      resetOption: {
        key: "none",
        label: tr("Kein Instrument", "No instrument"),
        isActive: activeInsts.length === 0
      },
      onReset: () => {
        state.profile.instruments = [];
        saveUserProfile(state.profile);
        renderProfileAccountView();
        renderHomeProfileGreeting();
        renderWelcomeProfileStep();
      },
      onToggle: (inst) => {
        const set = new Set(state.profile.instruments || []);
        if (set.has(inst)) set.delete(inst);
        else set.add(inst);
        state.profile.instruments = PROFILE_INSTRUMENT_OPTIONS.filter(i => set.has(i));
        saveUserProfile(state.profile);
        renderProfileAccountView();
        renderHomeProfileGreeting();
        renderWelcomeProfileStep();
      }
    });
  }

  const focusWrap = document.getElementById("profileFocusGroup");
  const focusSuggRow = document.getElementById("spaceFocusSuggestionRow");
  if (focusWrap) {
    const focusOptions = Object.values(PROFILE_FOCUS_OPTIONS).map(opt => {
      const def = getLocalizedProfileFocus(opt.key);
      return {
        key: opt.key,
        label: def.label,
        hint: def.hint,
        fixed: opt.key === "allround"
      };
    });
    renderProfileMultiDropdown({
      containerEl: focusWrap,
      key: "focus",
      options: focusOptions,
      selectedKeys: focusKeys,
      placeholderText: tr("Auswählen …", "Choose …"),
      emptyTagsText: getLocalizedProfileFocus("allround").label,
      onToggle: (focusKey) => {
        const nextList = toggleProfileFocusValue(getResolvedProfileFocuses(state.profile), focusKey);
        state.profile.focuses = nextList;
        state.profile.focus = nextList[0] || "allround";
        saveUserProfile(state.profile);
        renderProfileAccountView();
        renderHomeProfileGreeting();
      }
    });
  }
  if (focusSuggRow) {
    const specificDefs = focusKeys.filter(k => k !== "allround").map(getLocalizedProfileFocus);
    if (specificDefs.length > 0) {
      focusSuggRow.classList.remove("hidden");
      const primaryDef = specificDefs[0];
      const hintSummary = specificDefs.length === 1
        ? primaryDef.hint
        : specificDefs.map(d => d.label).join(" • ");
      focusSuggRow.innerHTML = `
        <span>${tf("Empfehlung: {hint}", "Suggested: {hint}", { hint: hintSummary })}</span>
        <div class="account-focus-actions">
          ${specificDefs.map((def, idx) => `
            <button type="button" ${idx === 0 ? 'id="launchFocusSuggestionBtn"' : ""} class="btn-tool" data-launch-focus-mode="${escapeHtml(def.mode)}">
              ${escapeHtml(specificDefs.length > 1 ? `${def.label} ▶` : tr("Jetzt üben ▶", "Practice Now ▶"))}
            </button>
          `).join("")}
        </div>
      `;
      focusSuggRow.querySelectorAll("[data-launch-focus-mode]").forEach(btn => {
        btn.addEventListener("click", () => {
          applyModeAndLevelFromConfig({ mode: btn.dataset.launchFocusMode, level: 1, melodyRange: "do-fa" });
          state.exerciseReturnView = "space";
          switchView("exercise");
        });
      });
    } else {
      focusSuggRow.classList.add("hidden");
      focusSuggRow.innerHTML = "";
    }
  }

  const accField = document.getElementById("profileAccessoryField");
  if (accField) accField.classList.toggle("hidden", !MASCOT_LOOKS_ENABLED);
  const accWrap = MASCOT_LOOKS_ENABLED ? document.getElementById("profileAccessoryGroup") : null;
  if (accWrap) {
    const activeAccs = getResolvedProfileAccessories(p);
    const accOptions = PROFILE_ACCESSORY_OPTIONS.map(opt => ({
      key: opt.key,
      label: getLocalizedProfileAccessoryLabel(opt)
    }));
    renderProfileMultiDropdown({
      containerEl: accWrap,
      key: "accessory",
      options: accOptions,
      selectedKeys: activeAccs,
      placeholderText: tr("Klassisch (ohne Extras)", "Classic (no extras)"),
      emptyTagsText: tr("Klassisch (ohne Extras)", "Classic (no extras)"),
      resetOption: {
        key: PROFILE_ACCESSORY_NONE_KEY,
        label: tr("Ohne Extras (Klassisch)", "No extras (Classic)"),
        isActive: activeAccs.length === 0
      },
      onReset: () => {
        state.profile.companionAccessories = [];
        state.profile.companionAccessory = PROFILE_ACCESSORY_NONE_KEY;
        saveUserProfile(state.profile);
        renderProfileAccountView();
        renderHomeProfileGreeting();
      },
      onToggle: (accKey) => {
        const nextAccs = toggleProfileAccessoryValue(getResolvedProfileAccessories(state.profile), accKey);
        state.profile.companionAccessories = nextAccs;
        state.profile.companionAccessory = nextAccs[0] || PROFILE_ACCESSORY_NONE_KEY;
        saveUserProfile(state.profile);
        renderProfileAccountView();
        renderHomeProfileGreeting();
      }
    });
  }

  document.querySelectorAll("[data-notation]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.notation === p.notation);
  });
  document.querySelectorAll("[data-interval-notation]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.intervalNotation === (p.intervalNotation === "intl" ? "intl" : "de"));
  });
  document.querySelectorAll("[data-solfege-labels]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.solfegeLabels === p.solfegeLabels);
  });
  syncLanguageControls(state.settings.language);

  renderExamHistoryCard();
  renderSessionTimerUI();
  renderProfileMixes();
  renderMixCreatorDropdowns();
  renderCustomThemeSection();
}

function getThemeEditorTemplateColors(templateKey) {
  const tpl = CUSTOM_THEME_TEMPLATES[templateKey] || CUSTOM_THEME_TEMPLATES["waldlichtung-light"];
  return sanitizeCustomThemeColors(tpl);
}

function getCustomThemeSlotLabel(slotIndex) {
  return tf("Platz {n}", "Slot {n}", { n: (Number(slotIndex) || 0) + 1 });
}

function renderCustomThemeStorageHint() {
  const el = document.getElementById("customThemeStorageHint");
  if (!el) return;
  const writable = isCustomThemeStorageWritable();
  el.textContent = writable
    ? tr(
        "Lokal im Browser gespeichert (3 Plätze + .json-Backup im Profil unten). Cloud-Synchronisation folgt in einer späteren Version.",
        "Saved locally in your browser (3 slots + .json backup below). Cross-device cloud sync is planned for a future version."
      )
    : tr(
        "Hinweis: Dauerhafter Browser-Speicher ist hier eingeschränkt – deine 3 Themes gelten für diese Sitzung (über .json unten sicherbar).",
        "Note: Persistent browser storage is restricted here — your 3 custom themes stay active for this session (back up via .json below)."
      );
}

function renderCustomThemeSlots() {
  const listEl = document.getElementById("spaceCustomThemeSlots");
  if (!listEl) return;

  const slots = Array.isArray(state.profile?.customThemes) ? state.profile.customThemes : [null, null, null];
  const activeTheme = state.settings.theme;

  listEl.innerHTML = CUSTOM_THEME_SLOT_IDS.map((slotId, idx) => {
    const entry = slots[idx];
    const slotBadge = getCustomThemeSlotLabel(idx);
    if (!entry) {
      return `
        <div class="custom-theme-slot-card is-empty" data-slot-card="${idx}">
          <div class="custom-theme-slot-main">
            <div class="custom-theme-slot-head">
              <span class="custom-theme-slot-badge">${escapeHtml(slotBadge)}</span>
              <span class="custom-theme-slot-name">${escapeHtml(tr("Freier Speicherplatz", "Empty Save Slot"))}</span>
            </div>
            <div class="custom-theme-slot-sub">${escapeHtml(tr("Noch kein eigenes Theme gespeichert", "No custom theme saved yet"))}</div>
          </div>
          <div class="custom-theme-slot-actions">
            <button type="button" class="btn-tool" data-edit-custom-slot="${idx}">${tr("+ Gestalten", "+ Design")}</button>
          </div>
        </div>
      `;
    }

    const isActive = activeTheme === entry.id;
    const sw = entry.paletteMeta?.swatches || [entry.colors.bgBase, entry.colors.sage, entry.colors.peach, entry.colors.lilac];
    return `
      <div class="custom-theme-slot-card ${isActive ? "active" : ""}" data-slot-card="${idx}">
        <div class="custom-theme-slot-main">
          <div class="custom-theme-slot-head">
            <span class="custom-theme-slot-badge">${escapeHtml(slotBadge)}</span>
            <span class="custom-theme-slot-name">${escapeHtml(entry.name)}</span>
          </div>
          <div class="theme-swatches">
            ${sw.map(col => `<span class="swatch-dot swatch-dot-checker"><span class="swatch-dot-fill" style="background:${escapeHtml(col)};"></span></span>`).join("")}
          </div>
        </div>
        <div class="custom-theme-slot-actions">
          <button type="button" class="btn-tool" data-activate-custom-slot="${idx}">${isActive ? tr("Aktiv", "Active") : tr("Aktivieren", "Apply")}</button>
          <button type="button" class="btn-tool" data-edit-custom-slot="${idx}" title="${escapeHtml(tr("Theme bearbeiten", "Edit theme"))}">${tr("Bearbeiten", "Edit")}</button>
          <button type="button" class="account-mix-del" data-delete-custom-slot="${idx}" title="${escapeHtml(tr("Theme löschen", "Delete theme"))}" aria-label="${escapeHtml(tr("Theme löschen", "Delete theme"))}">✕</button>
        </div>
      </div>
    `;
  }).join("");

  listEl.querySelectorAll("[data-activate-custom-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.activateCustomSlot, 10);
      if (state.profile?.customThemes?.[idx]) {
        setThemePreference(CUSTOM_THEME_SLOT_IDS[idx]);
      }
    });
  });
  listEl.querySelectorAll("[data-edit-custom-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      openCustomThemeEditor(parseInt(btn.dataset.editCustomSlot, 10) || 0);
    });
  });
  listEl.querySelectorAll("[data-delete-custom-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      deleteCustomThemeSlot(parseInt(btn.dataset.deleteCustomSlot, 10));
    });
  });
}

function renderSettingsCustomThemes() {
  const wrap = document.getElementById("settingsCustomThemeList");
  if (!wrap) return;
  const slots = Array.isArray(state.profile?.customThemes) ? state.profile.customThemes : [];
  const saved = slots.filter(Boolean);
  if (saved.length === 0) {
    wrap.classList.add("hidden");
    wrap.innerHTML = "";
    return;
  }

  wrap.classList.remove("hidden");
  const activeTheme = state.settings.theme;
  wrap.innerHTML = saved.map(entry => {
    const isSel = activeTheme === entry.id;
    const sw = entry.paletteMeta?.swatches || [entry.colors.bgBase, entry.colors.sage, entry.colors.peach, entry.colors.lilac];
    return `
      <button class="theme-preview-item ${isSel ? "active" : ""}" type="button" data-theme-choice="${escapeHtml(entry.id)}" aria-pressed="${String(isSel)}">
        <div class="theme-info">
          <span class="theme-name">${escapeHtml(entry.name)} (${escapeHtml(getCustomThemeSlotLabel(entry.slotIndex))})</span>
          <span class="theme-status">${isSel ? tr("Aktiv", "Active") : tr("Auswählen", "Select")}</span>
        </div>
        <div class="theme-swatches">
          ${sw.map((col, sIdx) => `<span class="swatch-dot swatch-dot-checker"><span class="swatch-dot-fill" data-swatch="${sIdx}" style="background:${escapeHtml(col)};"></span></span>`).join("")}
        </div>
      </button>
    `;
  }).join("");

  wrap.querySelectorAll("[data-theme-choice]").forEach(btn => {
    btn.addEventListener("click", () => setThemePreference(btn.dataset.themeChoice));
  });
}

function applyCustomThemeDraftPreview() {
  const ed = state.customThemeEditor;
  if (!ed?.open || !ed.livePreview) return;
  const built = buildDerivedCustomThemeVars(ed.colors);
  applyCustomThemeCssVars(built);
  if (typeof document !== "undefined" && document.documentElement) {
    document.documentElement.setAttribute("data-theme", CUSTOM_THEME_SLOT_IDS[ed.slotIndex] || "custom_1");
    document.documentElement.setAttribute("data-appearance", built.isDark ? "dark" : "light");
  }
  const metaEl = typeof document !== "undefined" ? document.getElementById("metaThemeColor") : null;
  if (metaEl && built.metaBg) {
    metaEl.setAttribute("content", built.metaBg);
  }
}

function renderCustomThemeMiniPreview() {
  const wrap = document.getElementById("customThemeMiniPreview");
  if (!wrap) return;
  const ed = state.customThemeEditor;
  const built = buildDerivedCustomThemeVars(ed.colors);
  const v = built.cssVars;
  const previewName = (ed.name || "").trim() || tr("Vorschau", "Preview", { fr: "Aperçu", it: "Anteprima" });

  wrap.style.backgroundColor = v["--bg-base"];
  wrap.style.borderColor = v["--border-strong"];

  wrap.innerHTML = `
    <div class="theme-mini-card" style="background:${escapeHtml(v["--surface-white"])};border:1px solid ${escapeHtml(v["--border-soft"])};">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;">
        <strong style="font-size:0.8rem;color:${escapeHtml(v["--raccoon-dark"])};">${escapeHtml(previewName)}</strong>
        <span style="font-size:0.68rem;color:${escapeHtml(v["--raccoon-mid"])};">${tr("Live-Vorschau", "Live Preview", { fr: "Aperçu en direct", it: "Anteprima dal vivo" })}</span>
      </div>
      <div class="theme-mini-badges">
        <span class="theme-mini-pill" style="background:${escapeHtml(v["--sage"])};color:${escapeHtml(v["--sage-strong"])};">${tr("Tonika / Salbei", "Tonic / Sage")}</span>
        <span class="theme-mini-pill" style="background:${escapeHtml(v["--peach"])};color:${escapeHtml(v["--peach-strong"])};">${tr("Dominante", "Dominant")}</span>
        <span class="theme-mini-pill" style="background:${escapeHtml(v["--lilac"])};color:${escapeHtml(v["--lilac-strong"])};">${tr("Moll / Klang", "Minor / Color")}</span>
      </div>
      <div class="theme-mini-badges">
        <span class="theme-mini-pill" style="background:${escapeHtml(v["--surface-warm"])};color:${escapeHtml(v["--status-ok"])};border:1px solid ${escapeHtml(v["--status-ok"])};">✓ ${tr("OK", "OK")}</span>
        <span class="theme-mini-pill" style="background:${escapeHtml(v["--surface-warm"])};color:${escapeHtml(v["--status-warn"])};border:1px solid ${escapeHtml(v["--status-warn"])};">! ${tr("Warnung", "Warn")}</span>
        <span class="theme-mini-pill" style="background:${escapeHtml(v["--surface-warm"])};color:${escapeHtml(v["--status-err"])};border:1px solid ${escapeHtml(v["--status-err"])};">✕ ${tr("Fehler", "Err")}</span>
      </div>
    </div>
  `;
}

function rescueColorPickerToHost() {
  const pickerEl = document.getElementById("rgbaColorPicker");
  const hostEl = document.getElementById("customThemePickerHost");
  if (!pickerEl) return;
  pickerEl.classList?.add("hidden");
  if (hostEl && pickerEl.parentNode !== hostEl && typeof hostEl.appendChild === "function") {
    hostEl.appendChild(pickerEl);
  }
}

function syncActiveRoleDrawer() {
  const ed = state.customThemeEditor;
  const pickerEl = document.getElementById("rgbaColorPicker");
  const roleGrid = document.getElementById("customThemeRoleGrid");
  if (!pickerEl) return;

  roleGrid?.querySelectorAll?.("[data-role-item]")?.forEach(item => {
    const isAct = item.dataset?.roleItem === ed.activeRole;
    item.classList?.toggle("is-open", isAct);
  });
  roleGrid?.querySelectorAll?.("[data-theme-role]")?.forEach(btn => {
    const isAct = btn.dataset?.themeRole === ed.activeRole;
    btn.classList?.toggle("active", isAct);
    btn.setAttribute?.("aria-expanded", String(isAct));
  });

  if (!ed.activeRole) {
    rescueColorPickerToHost();
    return;
  }

  let targetDrawer = null;
  roleGrid?.querySelectorAll?.("[data-role-drawer]")?.forEach(dr => {
    if (dr.dataset?.roleDrawer === ed.activeRole) targetDrawer = dr;
  });
  if (targetDrawer && typeof targetDrawer.appendChild === "function" && pickerEl.parentNode !== targetDrawer) {
    targetDrawer.appendChild(pickerEl);
  }
  pickerEl.classList?.remove("hidden");
}

function syncColorPickerUI() {
  const ed = state.customThemeEditor;

  document.querySelectorAll("[data-theme-role]").forEach(chip => {
    const key = chip.dataset?.themeRole;
    chip.classList?.toggle("active", key === ed.activeRole);
    chip.setAttribute?.("aria-expanded", String(key === ed.activeRole));
    const dot = chip.querySelector?.(".theme-role-dot");
    if (dot?.style && ed.colors[key]) {
      dot.style.backgroundColor = ed.colors[key];
    }
    const valEl = chip.querySelector?.(".theme-role-val");
    if (valEl && ed.colors[key]) {
      valEl.textContent = ed.colors[key];
    }
  });

  if (!ed.activeRole) {
    renderCustomThemeMiniPreview();
    return;
  }

  const field = CUSTOM_THEME_COLOR_FIELDS.find(f => f.key === ed.activeRole) || CUSTOM_THEME_COLOR_FIELDS[0];
  const colorStr = ed.colors[field.key] || field.def;
  const rgba = parseCssColorToRgba(colorStr, field.def);
  const hsv = ed.pickerHsv || rgbToHsv(rgba);

  const roleNameEl = document.getElementById("cpActiveRoleName");
  if (roleNameEl) roleNameEl.textContent = tr(field.de, field.en);

  const swatchEl = document.getElementById("cpPreviewSwatch");
  if (swatchEl?.style) swatchEl.style.backgroundColor = rgbaToExplicitString(rgba);

  const rgbaReadout = document.getElementById("cpReadoutRgba");
  if (rgbaReadout) rgbaReadout.textContent = rgbaToExplicitString(rgba);

  const hexReadout = document.getElementById("cpReadoutHex");
  if (hexReadout) hexReadout.textContent = rgbaToHex(rgba, true);

  const nativeInput = document.getElementById("cpNativeColorInput");
  if (nativeInput) nativeInput.value = rgbaToHex(rgba, false);

  const svPad = document.getElementById("cpSvPad");
  if (svPad?.style) svPad.style.backgroundColor = `hsl(${hsv.h}, 100%, 50%)`;

  const svThumb = document.getElementById("cpSvThumb");
  if (svThumb?.style) {
    svThumb.style.left = `${Math.max(0, Math.min(100, hsv.s))}%`;
    svThumb.style.top = `${100 - Math.max(0, Math.min(100, hsv.v))}%`;
    svThumb.style.backgroundColor = `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
  }

  const hueSlider = document.getElementById("cpHueSlider");
  const hueVal = document.getElementById("cpHueVal");
  if (hueSlider) hueSlider.value = String(hsv.h);
  if (hueVal) hueVal.textContent = `${hsv.h}°`;

  const rRange = document.getElementById("cpRangeR");
  const rNum = document.getElementById("cpNumR");
  const gRange = document.getElementById("cpRangeG");
  const gNum = document.getElementById("cpNumG");
  const bRange = document.getElementById("cpRangeB");
  const bNum = document.getElementById("cpNumB");
  const aRange = document.getElementById("cpRangeA");
  const aNum = document.getElementById("cpNumA");
  const aTrack = document.getElementById("cpAlphaTrackFill");

  if (rRange) {
    rRange.value = String(rgba.r);
    if (rRange.style) rRange.style.background = `linear-gradient(to right, rgb(0, ${rgba.g}, ${rgba.b}), rgb(255, ${rgba.g}, ${rgba.b}))`;
  }
  if (rNum) rNum.value = String(rgba.r);

  if (gRange) {
    gRange.value = String(rgba.g);
    if (gRange.style) gRange.style.background = `linear-gradient(to right, rgb(${rgba.r}, 0, ${rgba.b}), rgb(${rgba.r}, 255, ${rgba.b}))`;
  }
  if (gNum) gNum.value = String(rgba.g);

  if (bRange) {
    bRange.value = String(rgba.b);
    if (bRange.style) bRange.style.background = `linear-gradient(to right, rgb(${rgba.r}, ${rgba.g}, 0), rgb(${rgba.r}, ${rgba.g}, 255))`;
  }
  if (bNum) bNum.value = String(rgba.b);

  if (aRange) aRange.value = String(Math.round(rgba.a * 100));
  if (aNum) aNum.value = rgba.a.toFixed(2);
  if (aTrack?.style) {
    aTrack.style.background = `linear-gradient(to right, rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0), rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 1))`;
  }

  renderCustomThemeMiniPreview();
}

function setCustomThemeRoleColorFromRgba(nextRgba, syncHsv = true) {
  const ed = state.customThemeEditor;
  if (!ed.activeRole) return;
  const rgba = {
    r: clampByte(nextRgba?.r),
    g: clampByte(nextRgba?.g),
    b: clampByte(nextRgba?.b),
    a: clampAlpha(nextRgba?.a)
  };
  ed.colors[ed.activeRole] = rgbaToCssString(rgba);
  if (syncHsv) {
    const computed = rgbToHsv(rgba);
    const keepHue = (rgba.r === rgba.g && rgba.g === rgba.b) ? (ed.pickerHsv?.h || 0) : computed.h;
    ed.pickerHsv = { h: keepHue, s: computed.s, v: computed.v };
  }
  syncColorPickerUI();
  if (ed.open && ed.livePreview) {
    applyCustomThemeDraftPreview();
  }
}

function toggleCustomThemeRole(roleKey) {
  const ed = state.customThemeEditor;
  if (!CUSTOM_THEME_COLOR_FIELDS.some(f => f.key === roleKey)) return;
  if (ed.activeRole === roleKey) {
    ed.activeRole = null;
    syncActiveRoleDrawer();
    return;
  }
  ed.activeRole = roleKey;
  const rgba = parseCssColorToRgba(ed.colors[roleKey]);
  ed.pickerHsv = rgbToHsv(rgba);
  syncActiveRoleDrawer();
  syncColorPickerUI();
}

function selectCustomThemeEditorSlot(slotIndex) {
  const idx = Math.max(0, Math.min(2, Number(slotIndex) || 0));
  const ed = state.customThemeEditor;
  ed.slotIndex = idx;
  ed.activeRole = null;
  const existing = state.profile?.customThemes?.[idx];
  if (existing) {
    ed.name = existing.name;
    ed.colors = sanitizeCustomThemeColors(existing.colors);
  } else {
    ed.name = tf("Eigenes Theme {n}", "Custom Theme {n}", { n: idx + 1 });
    const tplKey = state.settings.theme === "metal"
      ? "metal-dark"
      : (state.settings.theme === "morgentau"
          ? "morgentau-light"
          : (state.settings.theme === "abenddaemmerung" ? "abenddaemmerung-light" : "waldlichtung-light"));
    ed.colors = getThemeEditorTemplateColors(tplKey);
  }
  const activeRgba = parseCssColorToRgba(ed.colors.bgBase);
  ed.pickerHsv = rgbToHsv(activeRgba);
}

function renderCustomThemeEditor() {
  const edEl = document.getElementById("customThemeEditor");
  if (!edEl) return;
  const ed = state.customThemeEditor;
  edEl.classList.toggle("hidden", !ed.open);
  if (!ed.open) {
    rescueColorPickerToHost();
    return;
  }

  document.querySelectorAll("[data-editor-slot]").forEach(btn => {
    const idx = parseInt(btn.dataset?.editorSlot, 10);
    btn.classList?.toggle("active", idx === ed.slotIndex);
    btn.textContent = getCustomThemeSlotLabel(idx);
  });

  const nameInput = document.getElementById("customThemeNameInput");
  if (nameInput && nameInput.value !== ed.name) {
    nameInput.value = ed.name;
  }

  const liveChk = document.getElementById("customThemeLivePreviewChk");
  if (liveChk) liveChk.checked = Boolean(ed.livePreview);

  const roleGrid = document.getElementById("customThemeRoleGrid");
  if (roleGrid) {
    rescueColorPickerToHost();
    roleGrid.innerHTML = CUSTOM_THEME_COLOR_FIELDS.map(f => {
      const val = ed.colors[f.key] || f.def;
      const isAct = ed.activeRole === f.key;
      const label = tr(f.de, f.en);
      return `
        <div class="theme-role-item ${isAct ? "is-open" : ""}" data-role-item="${f.key}">
          <button type="button" class="theme-role-chip ${isAct ? "active" : ""}" data-theme-role="${f.key}" aria-expanded="${String(isAct)}">
            <span class="theme-role-dot-wrap swatch-dot-checker"><span class="swatch-dot-fill theme-role-dot" style="background:${escapeHtml(val)};"></span></span>
            <span class="theme-role-text">
              <span class="theme-role-label">${escapeHtml(label)}</span>
              <span class="theme-role-val">${escapeHtml(val)}</span>
            </span>
            <span class="theme-role-chevron" aria-hidden="true">▾</span>
          </button>
          <div class="theme-role-drawer" data-role-drawer="${f.key}"></div>
        </div>
      `;
    }).join("");

    let dragStartX = 0;
    let dragStartY = 0;
    let touchMoved = false;
    roleGrid.querySelectorAll("[data-theme-role]").forEach(btn => {
      btn.addEventListener("pointerdown", (e) => {
        dragStartX = e.clientX || 0;
        dragStartY = e.clientY || 0;
        touchMoved = false;
      });
      btn.addEventListener("pointermove", (e) => {
        if (Math.abs((e.clientX || 0) - dragStartX) > 8 || Math.abs((e.clientY || 0) - dragStartY) > 8) {
          touchMoved = true;
        }
      });
      btn.addEventListener("click", () => {
        if (touchMoved) {
          touchMoved = false;
          return;
        }
        toggleCustomThemeRole(btn.dataset.themeRole);
      });
    });
  }

  syncActiveRoleDrawer();
  syncColorPickerUI();
  if (ed.livePreview) {
    applyCustomThemeDraftPreview();
  }
}

function openCustomThemeEditor(slotIndex = 0) {
  selectCustomThemeEditorSlot(slotIndex);
  state.customThemeEditor.open = true;
  renderCustomThemeEditor();
  document.getElementById("customThemeEditor")?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
}

function closeCustomThemeEditor(revertPreview = true) {
  state.customThemeEditor.open = false;
  state.customThemeEditor.activeRole = null;
  rescueColorPickerToHost();
  document.getElementById("customThemeEditor")?.classList.add("hidden");
  if (revertPreview) {
    applyThemeAndAppearance();
  }
}

function saveCustomThemeSlot() {
  const ed = state.customThemeEditor;
  const idx = Math.max(0, Math.min(2, Number(ed.slotIndex) || 0));
  const rawName = (document.getElementById("customThemeNameInput")?.value ?? ed.name).trim();
  const entry = sanitizeCustomThemeEntry({
    id: CUSTOM_THEME_SLOT_IDS[idx],
    name: rawName || tf("Eigenes Theme {n}", "Custom Theme {n}", { n: idx + 1 }),
    colors: ed.colors,
    updatedAt: Date.now()
  }, idx);

  if (!Array.isArray(state.profile.customThemes)) {
    state.profile.customThemes = [null, null, null];
  }
  state.profile.customThemes[idx] = entry;
  saveUserProfile(state.profile);
  ed.open = false;
  ed.activeRole = null;
  rescueColorPickerToHost();
  document.getElementById("customThemeEditor")?.classList.add("hidden");
  setThemePreference(entry.id);
  return entry;
}

function deleteCustomThemeSlot(slotIndex) {
  const idx = Math.max(0, Math.min(2, Number(slotIndex) || 0));
  if (!Array.isArray(state.profile.customThemes)) return;
  state.profile.customThemes[idx] = null;
  saveUserProfile(state.profile);

  const deletedId = CUSTOM_THEME_SLOT_IDS[idx];
  if (state.settings.theme === deletedId) {
    setThemePreference("waldlichtung");
  } else {
    renderCustomThemeSlots();
    renderSettingsCustomThemes();
  }
}

function renderCustomThemeSection() {
  renderCustomThemeStorageHint();
  renderCustomThemeSlots();
  renderSettingsCustomThemes();
  if (state.customThemeEditor?.open) {
    renderCustomThemeEditor();
  }
}

let _appToastHideTimer = null;
let _appToastFadeTimer = null;

function showAppToast(msg, variant = "success", durationMs = 3400) {
  const el = document.getElementById("appToast");
  if (!el || !msg) return;
  clearTimeout(_appToastHideTimer);
  clearTimeout(_appToastFadeTimer);
  el.textContent = msg;
  el.classList.remove("hidden", "is-visible", "is-success", "is-error");
  if (variant === "error") el.classList.add("is-error");
  else if (variant === "success") el.classList.add("is-success");
  void el.offsetWidth;
  el.classList.add("is-visible");
  _appToastFadeTimer = setTimeout(() => {
    el.classList.remove("is-visible");
    _appToastHideTimer = setTimeout(() => {
      el.classList.add("hidden");
    }, 220);
  }, Math.max(1500, durationMs));
}

function setSpaceBackupStatus(msg, isError = false, options = null) {
  const el = document.getElementById("spaceBackupStatus");
  if (el) {
    el.textContent = msg;
    el.classList.toggle("is-error", Boolean(isError));
    el.classList.toggle("hidden", !msg);
    if (msg) {
      el.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
    }
  }
  if (msg && options?.toast !== false) {
    const toastText = typeof options?.toastText === "string" && options.toastText ? options.toastText : msg;
    showAppToast(toastText, isError ? "error" : "success");
  }
}

function setSettingsAppResetStatus(msg) {
  const el = document.getElementById("settingsAppResetStatus");
  if (!el) return;
  el.textContent = msg;
  el.style.color = "var(--status-err)";
  el.classList.toggle("hidden", !msg);
}

function exportUserProfileJSON() {
  const cleanProf = sanitizeUserProfile(state.profile);
  cleanProf.customThemes = cleanProf.customThemes.map(t => t ? {
    id: t.id,
    slotIndex: t.slotIndex,
    name: t.name,
    colors: t.colors,
    updatedAt: t.updatedAt
  } : null);
  const payload = {
    app: "Lauschebaer",
    version: 1,
    progressStored: false,
    profile: cleanProf
  };
  return JSON.stringify(payload, null, 2);
}

// ---------- Profil-Sicherung (Export) ----------
// Android-App & mobile Browser mit Web Share: Auswahl zwischen lokalem Speichern
// (Android: Dokumente/Lauscher/…, Browser: Download) und System-Teilen-Menü.
// Desktop: direkter lokaler Download mit In-App-Bestätigung.
function getCapacitorNativePlugin(name) {
  if (typeof window === "undefined") return null;
  const cap = window.Capacitor;
  if (!cap || typeof cap.isNativePlatform !== "function" || !cap.isNativePlatform()) return null;
  return cap.Plugins?.[name] || null;
}

function getProfileBackupFileName() {
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  return `lauscher-profil-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.json`;
}

function isShareCancelError(err) {
  const msg = String(err?.message || err || "").toLowerCase();
  return err?.name === "AbortError" || msg.includes("cancel") || msg.includes("abort");
}

function downloadProfileBackupFile(json, fileName) {
  if (typeof Blob === "undefined" || typeof URL === "undefined" || typeof URL.createObjectURL !== "function") return false;
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body?.appendChild?.(a);
  a.click?.();
  a.remove?.();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
}

function canShareProfileBackup() {
  const fsPlugin = getCapacitorNativePlugin("Filesystem");
  const sharePlugin = getCapacitorNativePlugin("Share");
  if (fsPlugin && sharePlugin) return true;
  const isTouch = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches;
  if (!isTouch || typeof File === "undefined" || typeof navigator === "undefined" || typeof navigator.share !== "function") {
    return false;
  }
  try {
    if (typeof navigator.canShare === "function") {
      const probe = new File(["{}"], "probe.json", { type: "application/json" });
      return navigator.canShare({ files: [probe] });
    }
    return true;
  } catch (_e) {
    return false;
  }
}

function hideProfileExportChooser() {
  const chooser = document.getElementById("spaceBackupExportChooser");
  chooser?.classList.add("hidden");
  document.getElementById("exportProfileBtn")?.setAttribute("aria-expanded", "false");
}

async function saveProfileBackupLocally() {
  hideProfileExportChooser();
  const json = exportUserProfileJSON();
  const fileName = getProfileBackupFileName();
  const toastOk = `✓ ${tr("Profil lokal gespeichert", "Profile saved locally")}`;
  const failMsg = tr("Sicherung fehlgeschlagen – bitte erneut versuchen.", "Backup failed – please try again.");

  const fsPlugin = getCapacitorNativePlugin("Filesystem");
  if (fsPlugin) {
    try {
      if (typeof fsPlugin.requestPermissions === "function") {
        try { await fsPlugin.requestPermissions(); } catch (_permErr) {}
      }
      await fsPlugin.writeFile({
        path: `Lauscher/${fileName}`,
        data: json,
        directory: "DOCUMENTS",
        encoding: "utf8",
        recursive: true
      });
      setSpaceBackupStatus(
        `✓ ${tf("Profil gespeichert unter Dokumente/Lauscher/{file}", "Profile saved to Documents/Lauscher/{file}", { file: fileName })}`,
        false,
        { toastText: toastOk }
      );
      return;
    } catch (_docErr) {
      try {
        await fsPlugin.writeFile({
          path: `Lauscher/${fileName}`,
          data: json,
          directory: "EXTERNAL",
          encoding: "utf8",
          recursive: true
        });
        setSpaceBackupStatus(
          `✓ ${tf("Profil lokal gespeichert ({file})", "Profile saved locally ({file})", { file: fileName })}`,
          false,
          { toastText: toastOk }
        );
        return;
      } catch (_extErr) {
        setSpaceBackupStatus(failMsg, true);
        return;
      }
    }
  }

  if (downloadProfileBackupFile(json, fileName)) {
    setSpaceBackupStatus(
      `✓ ${tf("Profil lokal gespeichert ({file})", "Profile saved locally ({file})", { file: fileName })}`,
      false,
      { toastText: toastOk }
    );
  } else {
    setSpaceBackupStatus(failMsg, true);
  }
}

async function shareProfileBackup() {
  hideProfileExportChooser();
  const json = exportUserProfileJSON();
  const fileName = getProfileBackupFileName();
  const shareTitle = tr("Lauscher-Profil sichern", "Back up Lauscher profile");
  const sharedMsg = `✓ ${tf("Profil-Sicherung geteilt ({file})", "Profile backup shared ({file})", { file: fileName })}`;
  const sharedToast = `✓ ${tr("Profil-Sicherung geteilt", "Profile backup shared")}`;
  const cancelMsg = tr("Sicherung abgebrochen – es wurde nichts gespeichert.", "Backup cancelled – nothing was saved.");
  const failMsg = tr("Sicherung fehlgeschlagen – bitte erneut versuchen.", "Backup failed – please try again.");

  const fsPlugin = getCapacitorNativePlugin("Filesystem");
  const sharePlugin = getCapacitorNativePlugin("Share");
  if (fsPlugin && sharePlugin) {
    try {
      const written = await fsPlugin.writeFile({ path: fileName, data: json, directory: "CACHE", encoding: "utf8" });
      await sharePlugin.share({ title: shareTitle, dialogTitle: shareTitle, files: [written.uri] });
      setSpaceBackupStatus(sharedMsg, false, { toastText: sharedToast });
    } catch (err) {
      if (isShareCancelError(err)) {
        setSpaceBackupStatus(cancelMsg, true, { toast: false });
      } else {
        setSpaceBackupStatus(failMsg, true);
      }
    }
    return;
  }

  if (typeof File !== "undefined" && typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      const file = new File([json], fileName, { type: "application/json" });
      if (!navigator.canShare || navigator.canShare({ files: [file] })) {
        await navigator.share({ title: shareTitle, files: [file] });
        setSpaceBackupStatus(sharedMsg, false, { toastText: sharedToast });
        return;
      }
    } catch (err) {
      if (isShareCancelError(err)) {
        setSpaceBackupStatus(cancelMsg, true, { toast: false });
        return;
      }
    }
  }

  await saveProfileBackupLocally();
}

async function exportUserProfileBackup() {
  if (canShareProfileBackup()) {
    const chooser = document.getElementById("spaceBackupExportChooser");
    const btn = document.getElementById("exportProfileBtn");
    if (chooser) {
      const willOpen = chooser.classList.contains("hidden");
      chooser.classList.toggle("hidden", !willOpen);
      btn?.setAttribute("aria-expanded", String(willOpen));
      if (willOpen) {
        chooser.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
      }
      return;
    }
  }
  await saveProfileBackupLocally();
}

function importUserProfileJSON(rawText) {
  try {
    const parsed = JSON.parse(String(rawText || ""));
    const candidate = parsed && parsed.profile ? parsed.profile : parsed;
    if (!candidate || typeof candidate !== "object") {
      setSpaceBackupStatus(tr("Datei konnte nicht als Profil gelesen werden.", "Could not read file as a profile."), true);
      return { ok: false, error: tr("Ungültiges Profil-Format.", "Invalid profile format.") };
    }
    state.profile = sanitizeUserProfile(candidate);
    saveUserProfile(state.profile);
    if (state.customThemeEditor) state.customThemeEditor.open = false;
    stopSessionTimer("idle", null, "idle");
    applyThemeAndAppearance();
    applyProfileDisplayChanges();
    renderProfileAccountView();
    renderHomeProfileGreeting();
    if (typeof sanitizeMetronomeMix === "function" && state.metronome) {
      state.metronome.mix = sanitizeMetronomeMix(state.profile.metronomeMix);
    }
    if (typeof normalizeMetronomeSoundProfile === "function" && state.metronome) {
      state.metronome.sound = normalizeMetronomeSoundProfile(state.profile.metronomeSound);
    }
    if (typeof syncMetronomeVolumeUI === "function") syncMetronomeVolumeUI();
    if (typeof syncMetronomeSoundUI === "function") syncMetronomeSoundUI();
    syncPianoSoundControls();
    syncDroneMixControls();
    resetBreakReminderTimer();
    syncBreakReminderControls();
    if (typeof renderMetronomeProfiles === "function") renderMetronomeProfiles();
    setSpaceBackupStatus(tr("Profil erfolgreich geladen!", "Profile loaded successfully!"));
    return { ok: true };
  } catch (_err) {
    setSpaceBackupStatus(tr("Datei konnte nicht als Profil gelesen werden.", "Could not read file as a profile."), true);
    return { ok: false, error: "Parse error" };
  }
}

function resetUserProfile() {
  state.profile = createDefaultProfile();
  const langCfg = typeof getLanguageConfig === "function" ? getLanguageConfig(state.settings.language) : null;
  if (langCfg) {
    if (!state.profile.notationManual) state.profile.notation = langCfg.defaultNotation;
    if (!state.profile.intervalNotationManual) state.profile.intervalNotation = langCfg.defaultIntervalNotation;
  } else if (state.settings.language === "en") {
    if (!state.profile.notationManual) state.profile.notation = "intl";
    if (!state.profile.intervalNotationManual) state.profile.intervalNotation = "intl";
  }
  saveUserProfile(state.profile);
  if (state.customThemeEditor) state.customThemeEditor.open = false;
  if (CUSTOM_THEME_SLOT_IDS.includes(state.settings.theme)) {
    state.settings.theme = "waldlichtung";
    saveVisualPrefs(state.settings.appearance, state.settings.theme, state.settings.language);
  }
  state.resetConfirmArmed = false;
  state.appResetConfirmArmed = false;
  state.examHistoryClearArmed = false;
  state.streakState = { count: 0, activeNoticeMilestone: 0, scopeKey: null };
  if (typeof renderStageStreakUI === "function") renderStageStreakUI();
  stopSessionTimer("idle", null, "idle");
  resetBreakReminderTimer();
  syncBreakReminderControls();
  if (typeof resetMetronomeStateToDefault === "function") resetMetronomeStateToDefault();
  syncPianoSoundControls();
  syncDroneMixControls();
  applyThemeAndAppearance();
  applyProfileDisplayChanges();
  renderProfileAccountView();
  renderHomeProfileGreeting();
  const resetBtn = document.getElementById("resetProfileBtn");
  if (resetBtn) {
    resetBtn.textContent = tr("Konto zurücksetzen", "Reset Account");
    resetBtn.classList.remove("is-confirm-armed");
  }
  disarmAppResetConfirm();
  setSettingsAppResetStatus("");
  setSpaceBackupStatus(tr("Lokales Konto auf Standardwerte zurückgesetzt.", "Local account reset to defaults."));
}

// App-Reset: zweistufig. Der eigentliche Lösch-Knopf liegt unterhalb (andere Stelle)
// und ist erst nach kurzer Sperrzeit aktiv – ein Doppeltipp kann so nichts löschen.
const APP_RESET_CONFIRM_DELAY_MS = 2000;
const APP_RESET_CONFIRM_TIMEOUT_MS = 15000;
let appResetConfirmTimers = [];

function clearAppResetConfirmTimers() {
  appResetConfirmTimers.forEach(id => clearTimeout(id));
  appResetConfirmTimers = [];
}

function getAppResetConfirmLabel(secondsLeft = 0) {
  const base = tr("Endgültig alles löschen", "Permanently delete everything", {
    fr: "Tout effacer définitivement",
    es: "Borrar todo definitivamente",
    it: "Elimina tutto definitivamente",
    pl: "Usuń wszystko na stałe",
    uk: "Остаточно видалити все",
    ur: "سب کچھ مستقل طور پر حذف کریں"
  });
  return secondsLeft > 0 ? `${base} (${secondsLeft})` : base;
}

function armAppResetConfirm() {
  clearAppResetConfirmTimers();
  state.appResetConfirmArmed = true;
  state.appResetConfirmReadyAt = Date.now() + APP_RESET_CONFIRM_DELAY_MS;
  setSettingsAppResetStatus("");

  const btn = document.getElementById("appResetBtn");
  if (btn) {
    btn.textContent = tr("Abbrechen", "Cancel", { fr: "Annuler", es: "Cancelar", it: "Annulla", pl: "Anuluj", uk: "Скасувати", ur: "منسوخ کریں" });
    btn.classList.add("is-cancel-mode");
  }
  const panel = document.getElementById("appResetConfirmPanel");
  const text = document.getElementById("appResetConfirmText");
  const confirmBtn = document.getElementById("appResetConfirmBtn");
  if (text) {
    text.textContent = tr(
      "Wirklich alles löschen? Einstellungen, Themes und Profil gehen verloren – das lässt sich nicht rückgängig machen. Tipp: Sichere vorher dein Profil unter Konto → Datensicherung.",
      "Really delete everything? Settings, themes and your profile will be lost – this cannot be undone. Tip: back up your profile first under Account → Backup.",
      {
        fr: "Vraiment tout effacer ? Réglages, thèmes et profil seront perdus – impossible d’annuler. Astuce : sauvegarde d’abord ton profil dans Compte → Sauvegarde.",
        es: "¿De verdad quieres borrarlo todo? Se perderán los ajustes, los temas y el perfil, y no se puede deshacer. Consejo: guarda antes tu perfil en Cuenta → Copia de seguridad.",
        it: "Vuoi davvero eliminare tutto? Impostazioni, temi e profilo andranno persi: l’operazione non si può annullare. Consiglio: salva prima il tuo profilo in Account → Backup.",
        pl: "Na pewno usunąć wszystko? Ustawienia, motywy i profil zostaną utracone – tego nie da się cofnąć. Wskazówka: najpierw zapisz profil w Konto → Kopia zapasowa.",
        uk: "Справді видалити все? Налаштування, теми й профіль буде втрачено – це не можна скасувати. Порада: спершу збережи профіль у Профіль → Резервна копія.",
        ur: "کیا واقعی سب کچھ حذف کرنا ہے؟ سیٹنگز، تھیمز اور پروفائل ختم ہو جائیں گے – اسے واپس نہیں کیا جا سکتا۔ مشورہ: پہلے اکاؤنٹ → بیک اپ میں اپنا پروفائل محفوظ کریں۔"
      }
    );
  }
  if (panel) panel.classList.remove("hidden");
  if (confirmBtn) {
    confirmBtn.disabled = true;
    const totalSec = Math.ceil(APP_RESET_CONFIRM_DELAY_MS / 1000);
    confirmBtn.textContent = getAppResetConfirmLabel(totalSec);
    for (let i = 1; i <= totalSec; i++) {
      appResetConfirmTimers.push(setTimeout(() => {
        if (!state.appResetConfirmArmed) return;
        const left = totalSec - i;
        confirmBtn.textContent = getAppResetConfirmLabel(left);
        if (left <= 0) confirmBtn.disabled = false;
      }, i * 1000));
    }
  }
  appResetConfirmTimers.push(setTimeout(disarmAppResetConfirm, APP_RESET_CONFIRM_TIMEOUT_MS));
}

function disarmAppResetConfirm() {
  clearAppResetConfirmTimers();
  state.appResetConfirmArmed = false;
  state.appResetConfirmReadyAt = 0;
  const btn = document.getElementById("appResetBtn");
  if (btn) {
    btn.textContent = tr("App-Reset", "App Reset");
    btn.classList.remove("is-confirm-armed", "is-cancel-mode");
  }
  document.getElementById("appResetConfirmPanel")?.classList.add("hidden");
  const confirmBtn = document.getElementById("appResetConfirmBtn");
  if (confirmBtn) confirmBtn.disabled = true;
}

function performFullAppReset() {
  if (typeof stopMetronome === "function") stopMetronome();
  audioEngine?.stopPlayback?.();
  state.isPlaying = false;
  updatePlayButtonUI?.(false);
  stopSessionTimer("idle", null, "idle");

  state.appResetConfirmArmed = false;
  state.resetConfirmArmed = false;
  state.examHistoryClearArmed = false;
  state.exam = null;
  state.streakState = { count: 0, activeNoticeMilestone: 0, scopeKey: null };
  if (typeof renderStageStreakUI === "function") renderStageStreakUI();

  state.profile = createDefaultProfile();
  state.settings.appearance = "light";
  state.settings.theme = "waldlichtung";
  state.settings.language = "de";
  state.settings.autoNextAfterCorrect = true;
  state.settings.playCorrectAnswerAudio = true;
  state.settings.solfegeAutoNext = true;
  state.settings.melodyAutoNext = true;
  state.settings.rhythmDictationAutoNext = true;
  state.settings.rhythmTapAutoNext = true;
  state.settings.onboardingDone = false;
  if (state.customThemeEditor) state.customThemeEditor.open = false;

  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(VISUAL_PREFS_STORAGE_KEY);
      localStorage.removeItem(PERSONAL_PROFILE_STORAGE_KEY);
      localStorage.removeItem(CUSTOM_THEMES_STORAGE_KEY);
    }
  } catch (_err) {
    // Auf eingeschränkten WebViews ignorieren
  }
  if (typeof clearNativeStorageMirror === "function") {
    clearNativeStorageMirror();
  }

  clearCustomThemeCssVars();
  applyThemeAndAppearance();
  if (typeof applyStaticDomLanguage === "function") {
    applyStaticDomLanguage("de");
  }
  syncLanguageControls("de");
  syncAnswerSoundToggleUI();
  syncAutoNextControls();
  syncPianoSoundControls();
  syncDroneMixControls();

  const backupDisc = document.getElementById("spaceBackupDisclosure");
  if (backupDisc) {
    backupDisc.open = false;
    backupDisc.removeAttribute?.("open");
  }
  const resetBtn = document.getElementById("resetProfileBtn");
  if (resetBtn) {
    resetBtn.textContent = tr("Konto zurücksetzen", "Reset Account");
    resetBtn.classList.remove("is-confirm-armed");
  }
  disarmAppResetConfirm();
  setSettingsAppResetStatus("");
  const statusEl = document.getElementById("spaceBackupStatus");
  if (statusEl) {
    statusEl.textContent = "";
    statusEl.classList.add("hidden");
  }

  renderProfileAccountView();
  renderHomeProfileGreeting();
  renderHomeQuickMixBar();
  if (typeof resetMetronomeStateToDefault === "function") resetMetronomeStateToDefault();
  state.updateQuickStartLabel();
  renderKnowledgeHub();
  pickRandomQuote();
  generateExercise();

  setModalVisibility(null);
  switchView("home", { animate: false, skipHistoryPush: true });
  replaceAppHistory(null);
  openFirstRunOnboarding();
}
