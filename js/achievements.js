/**
 * Lauscher • Lokale Meilensteine, Musiker-Titel & Bonus-Themes
 * 100 % lokal im Profil gespeichert, abschaltbar, ohne Punktestand- oder Serien-Zwang.
 * Texte liegen ko-lokalisiert für alle 10 Sprachen in i18n/achievements.js.
 */

// DEV-ONLY: 7× Tippen auf das Versions-Badge in „Über Lauscher“ schaltet alle Meilensteine frei
// (nochmal 7× setzt sie zum Testen wieder zurück). Vor Release auf false setzen oder entfernen.
const DEV_ACHIEVEMENTS_TAP_UNLOCK_ENABLED = false;

const ACHIEVEMENT_GROUPS = ["explore", "music", "exams", "habit"];

const ACHIEVEMENT_DEFAULT_MIX_IDS = new Set(["mix_warmup", "mix_intervals", "mix_groove"]);

const ACHIEVEMENT_TOOL_VIEWS = new Set([
  "metronome",
  "tuner",
  "freeplay",
  "fretboard",
  "circle",
  "capo",
  "nashville"
]);

// Jedes Bonus-Theme hat ein eigenes Bühnenbild (styles.css), eine Kurzbeschreibung und
// eine kleine Erkennungsmelodie für den Freischalt-Moment: [Startzeit s, Töne, Dauer s].
const ACHIEVEMENT_BONUS_THEMES = [
  {
    id: "konzertsaal",
    requiredCount: 5,
    nameKey: "themeConcert",
    taglineKey: "taglineConcert",
    jingle: [
      [0, ["C4"], 0.5], [0.14, ["E4"], 0.5], [0.28, ["G4"], 0.5], [0.42, ["C5"], 0.7],
      [0.78, ["C3", "G3", "E4", "G4", "C5"], 1.8]
    ]
  },
  {
    id: "mitternacht",
    requiredCount: 10,
    nameKey: "themeMidnight",
    taglineKey: "taglineMidnight",
    jingle: [
      [0, ["D3", "F4", "A4", "C5", "E5"], 0.6],
      [0.5, ["G2", "F4", "B4", "E5"], 0.6],
      [1.0, ["C3", "E4", "G4", "B4", "D5"], 2.0]
    ]
  }
];

const ACHIEVEMENT_TITLES = [
  { id: "title-explorer", milestoneId: "category-explorer" },
  { id: "title-ear",      milestoneId: "streak-10" },
  { id: "title-reader",   milestoneId: "three-clefs" },
  { id: "title-groove",   milestoneId: "blind-groove" },
  { id: "title-voice",    milestoneId: "sing-session" },
  { id: "title-gold",     milestoneId: "exam-perfect" },
  { id: "title-allrounder", milestoneId: "exam-allrounder" },
  { id: "title-steady",   milestoneId: "days-7" }
];

const ACHIEVEMENTS_CATALOG = [
  // ===== 1. ENTDECKER =====
  {
    id: "first-sound",
    group: "explore",
    icon: "note",
    target: 1,
    getValue: (stats) => Math.min(1, Number(stats.solvedCount) || 0)
  },
  {
    id: "category-explorer",
    group: "explore",
    icon: "compass",
    titleRewardId: "title-explorer",
    target: 5,
    getValue: (stats) => Math.min(5, (stats.categoriesTried || []).length)
  },
  {
    id: "knowledge-reader",
    group: "explore",
    icon: "book",
    target: 4,
    getValue: (stats) => Math.min(4, (stats.knowledgeSeen || []).length)
  },
  {
    id: "tool-explorer",
    group: "explore",
    icon: "tuning",
    target: 3,
    getValue: (stats) => Math.min(3, (stats.toolsUsed || []).length)
  },
  {
    id: "listen-only",
    group: "explore",
    icon: "ear",
    target: 1,
    getValue: (stats) => stats.usedListenOnly ? 1 : 0
  },

  // ===== 2. HÖR- & SPIELPRAXIS =====
  {
    id: "streak-5",
    group: "music",
    icon: "wave",
    target: 5,
    getValue: (stats) => Math.min(5, Number(stats.maxSessionStreak) || 0)
  },
  {
    id: "streak-10",
    group: "music",
    icon: "spark",
    titleRewardId: "title-ear",
    target: 10,
    getValue: (stats) => Math.min(10, Number(stats.maxSessionStreak) || 0)
  },
  {
    id: "three-clefs",
    group: "music",
    icon: "clef",
    titleRewardId: "title-reader",
    target: 3,
    getValue: (stats) => Math.min(3, (stats.clefsRead || []).length)
  },
  {
    id: "score-pilot",
    group: "music",
    icon: "coda",
    target: 1,
    getValue: (stats) => Math.min(1, Number(stats.flowPuzzlesSolved) || 0)
  },
  {
    id: "sing-session",
    group: "music",
    icon: "voice",
    titleRewardId: "title-voice",
    target: 1,
    getValue: (stats) => Math.min(1, Number(stats.singSessionsCompleted) || 0)
  },
  {
    id: "blind-groove",
    group: "music",
    icon: "pulse",
    titleRewardId: "title-groove",
    target: 1,
    getValue: (stats) => Math.min(1, Number(stats.blindGroovesPassed) || 0)
  },
  {
    id: "tritone-tamer",
    group: "music",
    icon: "bolt",
    target: 5,
    getValue: (stats) => Math.min(5, Number(stats.tritoneSolved) || 0)
  },

  // ===== 3. PRÜFUNGEN =====
  {
    id: "exam-first",
    group: "exams",
    icon: "medal",
    target: 1,
    getValue: (stats) => Math.min(1, (stats.examCategoriesPassed || []).length)
  },
  {
    id: "exam-allrounder",
    group: "exams",
    icon: "laurel",
    titleRewardId: "title-allrounder",
    target: 3,
    getValue: (stats) => Math.min(3, (stats.examCategoriesPassed || []).length)
  },
  {
    id: "exam-perfect",
    group: "exams",
    icon: "star",
    titleRewardId: "title-gold",
    target: 1,
    getValue: (stats) => stats.perfectExamDone ? 1 : 0
  },
  {
    id: "exam-notation-pro",
    group: "exams",
    icon: "score",
    target: 1,
    getValue: (stats) => stats.notationSymbolsExamPassed ? 1 : 0
  },

  // ===== 4. GEWOHNHEIT & STIL =====
  {
    id: "days-3",
    group: "habit",
    icon: "calendar",
    target: 3,
    getValue: (stats) => Math.min(3, (stats.practiceDays || []).length)
  },
  {
    id: "days-7",
    group: "habit",
    icon: "calendar",
    titleRewardId: "title-steady",
    target: 7,
    getValue: (stats) => Math.min(7, (stats.practiceDays || []).length)
  },
  {
    id: "days-21",
    group: "habit",
    icon: "sun",
    target: 21,
    getValue: (stats) => Math.min(21, (stats.practiceDays || []).length)
  },
  {
    id: "personal-style",
    group: "habit",
    icon: "palette",
    target: 1,
    getValue: (stats) => stats.personalStyleCreated ? 1 : 0
  }
];

const ACHIEVEMENT_VALID_IDS = new Set(ACHIEVEMENTS_CATALOG.map(a => a.id));
const ACHIEVEMENT_VALID_TITLE_IDS = new Set(ACHIEVEMENT_TITLES.map(t => t.id));
let _achievementsActiveFilter = "all";

function getAchievementLanguageCode() {
  if (typeof getCurrentAppLanguage === "function") return getCurrentAppLanguage();
  return state?.settings?.language || "de";
}

function pickAchievementLang(map, fallback = "") {
  if (!map || typeof map !== "object") return fallback;
  const lang = getAchievementLanguageCode();
  return map[lang] || map.en || map.de || fallback;
}

function formatAchievementUI(key, vars = null) {
  const dict = typeof ACHIEVEMENTS_UI_I18N !== "undefined" ? ACHIEVEMENTS_UI_I18N : null;
  let text = pickAchievementLang(dict?.[key], "");
  if (vars && typeof vars === "object") {
    Object.keys(vars).forEach(k => {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(vars[k]));
    });
  }
  return text;
}

function getLocalizedAchievementCopy(id) {
  const dict = typeof ACHIEVEMENTS_I18N !== "undefined" ? ACHIEVEMENTS_I18N : null;
  const entry = dict?.[id];
  return {
    title: pickAchievementLang(entry?.title, id),
    desc: pickAchievementLang(entry?.desc, "")
  };
}

function getLocalizedAchievementTitleLabel(titleId) {
  const dict = typeof ACHIEVEMENT_TITLES_I18N !== "undefined" ? ACHIEVEMENT_TITLES_I18N : null;
  const entry = dict?.[titleId] || dict?.none;
  return pickAchievementLang(entry, "");
}

function getLocalDateKey(ts = Date.now()) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function sanitizeUniqueStringList(raw, maxLen = 64, itemFilter = null) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  const seen = new Set();
  for (const item of raw) {
    if (typeof item !== "string") continue;
    const clean = item.trim().slice(0, 64);
    if (!clean || seen.has(clean)) continue;
    if (typeof itemFilter === "function" && !itemFilter(clean)) continue;
    seen.add(clean);
    out.push(clean);
    if (out.length >= maxLen) break;
  }
  return out;
}

function createDefaultAchievementsData() {
  return {
    unlocked: {},
    stats: {
      solvedCount: 0,
      maxSessionStreak: 0,
      categoriesTried: [],
      knowledgeSeen: [],
      toolsUsed: [],
      usedListenOnly: false,
      clefsRead: [],
      flowPuzzlesSolved: 0,
      singSessionsCompleted: 0,
      blindGroovesPassed: 0,
      tritoneSolved: 0,
      examCategoriesPassed: [],
      perfectExamDone: false,
      notationSymbolsExamPassed: false,
      practiceDays: [],
      personalStyleCreated: false
    }
  };
}

function sanitizeAchievementsData(raw) {
  const def = createDefaultAchievementsData();
  if (!raw || typeof raw !== "object") return def;

  const unlocked = {};
  if (raw.unlocked && typeof raw.unlocked === "object") {
    Object.keys(raw.unlocked).forEach(id => {
      if (!ACHIEVEMENT_VALID_IDS.has(id)) return;
      const ts = Number(raw.unlocked[id]);
      if (Number.isFinite(ts) && ts > 0) {
        unlocked[id] = Math.round(ts);
      }
    });
  }

  const s = raw.stats && typeof raw.stats === "object" ? raw.stats : {};
  const clampInt = (v, max = 100000) => {
    const n = parseInt(v, 10);
    return Number.isFinite(n) && n > 0 ? Math.min(max, n) : 0;
  };
  const validClefs = new Set(["treble", "bass", "alto"]);

  return {
    unlocked,
    stats: {
      solvedCount: clampInt(s.solvedCount, 1000000),
      maxSessionStreak: clampInt(s.maxSessionStreak, 10000),
      categoriesTried: sanitizeUniqueStringList(s.categoriesTried, 24),
      knowledgeSeen: sanitizeUniqueStringList(s.knowledgeSeen, 64),
      toolsUsed: sanitizeUniqueStringList(s.toolsUsed, 16, v => ACHIEVEMENT_TOOL_VIEWS.has(v)),
      usedListenOnly: Boolean(s.usedListenOnly),
      clefsRead: sanitizeUniqueStringList(s.clefsRead, 4, v => validClefs.has(v)),
      flowPuzzlesSolved: clampInt(s.flowPuzzlesSolved, 10000),
      singSessionsCompleted: clampInt(s.singSessionsCompleted, 10000),
      blindGroovesPassed: clampInt(s.blindGroovesPassed, 10000),
      tritoneSolved: clampInt(s.tritoneSolved, 10000),
      examCategoriesPassed: sanitizeUniqueStringList(s.examCategoriesPassed, 24),
      perfectExamDone: Boolean(s.perfectExamDone),
      notationSymbolsExamPassed: Boolean(s.notationSymbolsExamPassed),
      practiceDays: sanitizeUniqueStringList(s.practiceDays, 400, v => /^\d{4}-\d{2}-\d{2}$/.test(v)),
      personalStyleCreated: Boolean(s.personalStyleCreated)
    }
  };
}

function ensureProfileAchievements() {
  if (!state || !state.profile) return createDefaultAchievementsData();
  if (!state.profile.achievements || typeof state.profile.achievements !== "object" || !state.profile.achievements.stats) {
    state.profile.achievements = sanitizeAchievementsData(state.profile.achievements);
  }
  return state.profile.achievements;
}

function getUnlockedAchievementIds() {
  const data = ensureProfileAchievements();
  return Object.keys(data.unlocked).filter(id => ACHIEVEMENT_VALID_IDS.has(id));
}

function getUnlockedAchievementCount() {
  return getUnlockedAchievementIds().length;
}

function getBonusThemeLockInfo(themeId) {
  const def = ACHIEVEMENT_BONUS_THEMES.find(t => t.id === themeId);
  if (!def) {
    return { isBonus: false, unlocked: true, requiredCount: 0, currentCount: 0, remaining: 0, label: "" };
  }
  const currentCount = getUnlockedAchievementCount();
  const unlocked = currentCount >= def.requiredCount;
  return {
    isBonus: true,
    unlocked,
    requiredCount: def.requiredCount,
    currentCount,
    remaining: Math.max(0, def.requiredCount - currentCount),
    label: formatAchievementUI(def.nameKey)
  };
}

/* ---------- Freischalt-Moment für Bonus-Themes ---------- */

let _bonusThemeRevealTimer = null;
let _bonusThemeRevealId = null;

function showBonusThemeUnlockToast(themeDef) {
  if (typeof showAppToast !== "function") return;
  showAppToast(`${formatAchievementUI("bonusToast")} ${formatAchievementUI(themeDef.nameKey)}`, "success", 4200);
}

/** Wartet kurz, damit die Erfolgs-Animation der Übung erst ausspielen kann. */
function scheduleBonusThemeUnlockReveal(themeDef) {
  if (!themeDef) return;
  if (_bonusThemeRevealTimer) clearTimeout(_bonusThemeRevealTimer);
  _bonusThemeRevealTimer = setTimeout(() => {
    _bonusThemeRevealTimer = null;
    openBonusThemeUnlockModal(themeDef);
  }, 950);
}

function playBonusThemeJingle(themeDef) {
  if (typeof audioEngine === "undefined" || !audioEngine.isInitialized || !audioEngine.rawCtx) return;
  if (state.master?.muted || !Array.isArray(themeDef?.jingle)) return;
  const t0 = (audioEngine.rawCtx.currentTime || 0) + 0.05;
  themeDef.jingle.forEach(([offset, notes, dur]) => {
    try {
      audioEngine.playStep(notes, dur, null, "interval", { atTime: t0 + offset, legato: false });
    } catch (_) {}
  });
}

function openBonusThemeUnlockModal(themeDef) {
  const backdrop = document.getElementById("themeUnlockBackdrop");
  const blockedByOtherModal = typeof getOpenModalName === "function" && getOpenModalName();
  const busyInExam = Boolean(state.exam?.active);
  if (!backdrop || typeof setModalVisibility !== "function" || blockedByOtherModal || busyInExam) {
    showBonusThemeUnlockToast(themeDef);
    return;
  }
  _bonusThemeRevealId = themeDef.id;
  backdrop.dataset.unlockTheme = themeDef.id;
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  setText("themeUnlockTag", formatAchievementUI("unlockTitle"));
  setText("themeUnlockName", formatAchievementUI(themeDef.nameKey));
  setText("themeUnlockTagline", formatAchievementUI(themeDef.taglineKey));
  setText("themeUnlockEarned", formatAchievementUI("unlockEarned", { n: themeDef.requiredCount }));
  setText("themeUnlockApplyBtn", formatAchievementUI("unlockApply"));
  setText("themeUnlockLaterBtn", formatAchievementUI("unlockLater"));
  const isActive = state.settings?.theme === themeDef.id;
  document.getElementById("themeUnlockApplyBtn")?.classList.toggle("hidden", isActive);
  if (typeof stopPlayback === "function") stopPlayback();
  setModalVisibility("themeUnlock");
  if (typeof pushAppHistory === "function") pushAppHistory("themeUnlock");
  playBonusThemeJingle(themeDef);
}

function applyRevealedBonusTheme() {
  const themeId = _bonusThemeRevealId;
  if (typeof closeActiveModal === "function") closeActiveModal();
  if (!themeId || typeof setThemePreference !== "function") return;
  setThemePreference(themeId);
  const def = ACHIEVEMENT_BONUS_THEMES.find(t => t.id === themeId);
  if (def && typeof showAppToast === "function") {
    showAppToast(`✦ ${formatAchievementUI(def.nameKey)}`, "success", 2600);
  }
}

function initBonusThemeUnlockModal() {
  document.getElementById("themeUnlockApplyBtn")?.addEventListener("click", () => applyRevealedBonusTheme());
  document.getElementById("themeUnlockLaterBtn")?.addEventListener("click", () => {
    if (typeof closeActiveModal === "function") closeActiveModal();
  });
}

function getUnlockedAchievementTitles() {
  const data = ensureProfileAchievements();
  return ACHIEVEMENT_TITLES.filter(t => Boolean(data.unlocked[t.milestoneId]));
}

function getActiveProfileTitleLabel() {
  if (!state?.profile || state.profile.showAchievements === false) return "";
  const selectedId = typeof state.profile.selectedTitleId === "string" ? state.profile.selectedTitleId : "";
  if (!selectedId || !ACHIEVEMENT_VALID_TITLE_IDS.has(selectedId)) return "";
  const unlocked = getUnlockedAchievementTitles();
  if (!unlocked.some(t => t.id === selectedId)) return "";
  return getLocalizedAchievementTitleLabel(selectedId);
}

function evaluateAchievementUnlocks(data, now = Date.now()) {
  const newlyUnlocked = [];
  for (const item of ACHIEVEMENTS_CATALOG) {
    if (data.unlocked[item.id]) continue;
    const val = item.getValue(data.stats);
    if (val >= item.target) {
      data.unlocked[item.id] = now;
      newlyUnlocked.push(item);
    }
  }
  return newlyUnlocked;
}

function addUniqueStatItem(arr, value, maxLen = 64) {
  if (!Array.isArray(arr) || !value) return false;
  if (arr.includes(value)) return false;
  if (arr.length >= maxLen) return false;
  arr.push(value);
  return true;
}

function addPracticeDay(stats, ts = Date.now()) {
  const key = getLocalDateKey(ts);
  if (!key) return false;
  return addUniqueStatItem(stats.practiceDays, key, 400);
}

function syncRetroactiveAchievements(options = {}) {
  if (!state?.profile) return [];
  const data = ensureProfileAchievements();
  const stats = data.stats;
  let dirty = false;

  // 1. Prüfungsverlauf rückwirkend anrechnen
  const history = Array.isArray(state.profile.examHistory) ? state.profile.examHistory : [];
  for (const entry of history) {
    if (!entry || typeof entry !== "object") continue;
    if (entry.completedAt && addPracticeDay(stats, entry.completedAt)) dirty = true;
    const pct = Number(entry.percent) || 0;
    if (pct >= 80 && entry.categoryKey) {
      if (addUniqueStatItem(stats.examCategoriesPassed, String(entry.categoryKey), 24)) dirty = true;
      if (addUniqueStatItem(stats.categoriesTried, String(entry.categoryKey), 24)) dirty = true;
    }
    if (pct >= 100 && !stats.perfectExamDone) {
      stats.perfectExamDone = true;
      dirty = true;
    }
    if (pct >= 80 && entry.levelId === "notation_l7" && !stats.notationSymbolsExamPassed) {
      stats.notationSymbolsExamPassed = true;
      dirty = true;
    }
    if ((Number(entry.correctCount) || 0) > 0 && stats.solvedCount === 0) {
      stats.solvedCount = Math.max(stats.solvedCount, Number(entry.correctCount) || 0);
      dirty = true;
    }
  }

  // 2. Eigene Farbthemes oder selbst angelegte Übe-Mixe rückwirkend anrechnen
  const hasCustomTheme = Array.isArray(state.profile.customThemes)
    && state.profile.customThemes.some(Boolean);
  const hasCustomMix = Array.isArray(state.profile.mixes)
    && state.profile.mixes.some(m => m && m.id && !ACHIEVEMENT_DEFAULT_MIX_IDS.has(m.id));
  if ((hasCustomTheme || hasCustomMix) && !stats.personalStyleCreated) {
    stats.personalStyleCreated = true;
    dirty = true;
  }

  const newlyUnlocked = evaluateAchievementUnlocks(data, Date.now());
  if (dirty || newlyUnlocked.length > 0) {
    if (typeof saveUserProfile === "function" && options.save !== false) {
      saveUserProfile(state.profile);
    }
    if (typeof applyThemeAndAppearance === "function") {
      applyThemeAndAppearance();
    }
  }
  return newlyUnlocked;
}

function recordAchievementEvent(event) {
  if (!event || typeof event !== "object" || !state?.profile) return [];
  const data = ensureProfileAchievements();
  const stats = data.stats;
  const prevCount = getUnlockedAchievementCount();
  let dirty = false;

  switch (event.type) {
    case "exercise-solved": {
      stats.solvedCount = Math.min(1000000, (Number(stats.solvedCount) || 0) + 1);
      dirty = true;
      if (addPracticeDay(stats)) dirty = true;

      const mode = typeof event.mode === "string" ? event.mode : "";
      const cat = event.categoryKey
        || (typeof MODE_CATEGORY_MAP !== "undefined" && MODE_CATEGORY_MAP[mode])
        || "";
      if (cat && addUniqueStatItem(stats.categoriesTried, cat, 24)) dirty = true;

      const streak = parseInt(event.streak, 10) || 0;
      if (streak > stats.maxSessionStreak) {
        stats.maxSessionStreak = Math.min(10000, streak);
        dirty = true;
      }

      if (event.clefId && ["treble", "bass", "alto"].includes(event.clefId)) {
        if (addUniqueStatItem(stats.clefsRead, event.clefId, 4)) dirty = true;
      }
      if (event.isFlowOrder) {
        stats.flowPuzzlesSolved = Math.min(10000, (Number(stats.flowPuzzlesSolved) || 0) + 1);
        dirty = true;
      }
      if (event.isBlindTap) {
        stats.blindGroovesPassed = Math.min(10000, (Number(stats.blindGroovesPassed) || 0) + 1);
        dirty = true;
      }
      if (event.isTritone) {
        stats.tritoneSolved = Math.min(10000, (Number(stats.tritoneSolved) || 0) + 1);
        dirty = true;
      }
      break;
    }

    case "exam-completed": {
      if (addPracticeDay(stats)) dirty = true;
      const pct = Number(event.percent) || 0;
      if (event.categoryKey && addUniqueStatItem(stats.categoriesTried, String(event.categoryKey), 24)) {
        dirty = true;
      }
      if (pct >= 80 && event.categoryKey) {
        if (addUniqueStatItem(stats.examCategoriesPassed, String(event.categoryKey), 24)) dirty = true;
      }
      if (pct >= 100 && !stats.perfectExamDone) {
        stats.perfectExamDone = true;
        dirty = true;
      }
      if (pct >= 80 && event.levelId === "notation_l7" && !stats.notationSymbolsExamPassed) {
        stats.notationSymbolsExamPassed = true;
        dirty = true;
      }
      break;
    }

    case "warmup-finished": {
      stats.singSessionsCompleted = Math.min(10000, (Number(stats.singSessionsCompleted) || 0) + 1);
      addPracticeDay(stats);
      dirty = true;
      break;
    }

    case "listen-only": {
      if (!stats.usedListenOnly) {
        stats.usedListenOnly = true;
        dirty = true;
      }
      break;
    }

    case "knowledge-seen": {
      const key = typeof event.key === "string" ? event.key.trim() : "";
      if (key && addUniqueStatItem(stats.knowledgeSeen, key, 64)) {
        dirty = true;
      }
      break;
    }

    case "tool-used": {
      const tool = typeof event.tool === "string" ? event.tool.trim() : "";
      if (ACHIEVEMENT_TOOL_VIEWS.has(tool) && addUniqueStatItem(stats.toolsUsed, tool, 16)) {
        dirty = true;
      }
      break;
    }

    case "personal-style": {
      if (!stats.personalStyleCreated) {
        stats.personalStyleCreated = true;
        dirty = true;
      }
      break;
    }

    default:
      return [];
  }

  const newlyUnlocked = evaluateAchievementUnlocks(data, Date.now());
  if (!dirty && newlyUnlocked.length === 0) return [];

  if (typeof saveUserProfile === "function") {
    saveUserProfile(state.profile);
  }

  if (newlyUnlocked.length > 0) {
    const nextCount = getUnlockedAchievementCount();
    const newlyUnlockedTheme = ACHIEVEMENT_BONUS_THEMES.find(
      t => prevCount < t.requiredCount && nextCount >= t.requiredCount
    );

    if (newlyUnlockedTheme && typeof applyThemeAndAppearance === "function") {
      applyThemeAndAppearance();
    }

    if (state.profile.showAchievements !== false && typeof showAppToast === "function") {
      if (newlyUnlockedTheme) {
        // Eigener Freischalt-Moment mit Vorschau statt nur eines Toasts
        scheduleBonusThemeUnlockReveal(newlyUnlockedTheme);
      } else {
        const primary = newlyUnlocked[newlyUnlocked.length - 1];
        const copy = getLocalizedAchievementCopy(primary.id);
        showAppToast(`${formatAchievementUI("toastPrefix")} ${copy.title}`, "success", 3600);
      }
    }

    if (state.currentView === "space") {
      renderSpaceAchievementsCard();
      renderProfileTitleSelector();
    }
  } else if (state.currentView === "space") {
    renderSpaceAchievementsCard();
  }

  return newlyUnlocked;
}

function buildAchievementIconSVG(iconKey) {
  const icons = {
    note: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="9.2" cy="17.8" rx="3.8" ry="2.6" transform="rotate(-20 9.2 17.8)" fill="currentColor"/><path d="M12.6 17V5.2l6.2-1.4v4.2l-6.2 1.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    compass: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="2"/><polygon points="15.4,8.6 13.3,13.3 8.6,15.4 10.7,10.7" fill="currentColor"/></svg>`,
    book: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 6.2A2.5 2.5 0 0 1 7 4.2h4.2v14.8H7a2.5 2.5 0 0 0-2.5 2V6.2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M19.5 6.2A2.5 2.5 0 0 0 17 4.2h-4.2v14.8H17a2.5 2.5 0 0 1 2.5 2V6.2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    tuning: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.5 4.2v6.6a3.5 3.5 0 0 0 7 0V4.2" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><line x1="12" y1="14.3" x2="12" y2="20.2" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><circle cx="12" cy="20.2" r="1.4" fill="currentColor"/></svg>`,
    ear: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 10.5a4.8 4.8 0 0 1 9.6 0c0 3.2-2.4 4.2-3.2 6-.5 1.1-1.3 2.3-2.9 2.3a2.4 2.4 0 0 1-2.4-2.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10.4 10.6a2 2 0 0 1 3.9.4c0 1.4-1.2 2-1.8 2.9" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
    wave: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 13c2-4.8 4-4.8 6 0s4 4.8 6 0 3.5-4.4 5 0" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
    spark: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5l2.1 5.9 5.9 2.1-5.9 2.1-2.1 5.9-2.1-5.9-5.9-2.1 5.9-2.1L12 3.5Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`,
    clef: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13.5 17.5c2.6-.2 4-2.1 3.7-4.5-.4-2.4-2.7-3.2-4.7-2.4-2 .8-2.6 2.9-1.5 4.4.7.9 1.9 1.1 2.7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M13.5 17.5c-3.8.1-5.8-2.2-5.6-5.3.3-3.3 4-5.2 6.2-7.6 1-1.1 1-2.5-.2-2.6-1.2-.1-1.7 1.2-1.6 3.1l.6 14.5c.1 1.7-1.1 2.8-2.6 2.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    coda: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="12" rx="5.5" ry="6.8" stroke="currentColor" stroke-width="2"/><line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    voice: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8.8" y="4" width="6.4" height="10.2" rx="3.2" stroke="currentColor" stroke-width="2"/><path d="M5.8 11.4a6.2 6.2 0 0 0 12.4 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="17.6" x2="12" y2="20.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    pulse: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 12h3.8l2.2-5.5 3.6 11 2.4-5.5h5" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13.5 3.5L6.5 13h5l-1 7.5 7-9.5h-5l1-7.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    medal: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="14" r="5.5" stroke="currentColor" stroke-width="2"/><path d="M8.8 9.2L6.8 4h10.4l-2 5.2" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    laurel: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 18.5C4.8 15.5 4.8 9.5 8.2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16.5 18.5c2.7-3 2.7-9-.7-12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="2"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4l2.4 5 5.5.7-4 3.9 1 5.4-4.9-2.6L7.1 19l1-5.4-4-3.9 5.5-.7L12 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    score: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="4" y1="11.5" x2="20" y2="11.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="4" y1="16" x2="20" y2="16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="10" cy="13.8" r="2.2" fill="currentColor"/><line x1="12" y1="13.5" x2="12" y2="5.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5" stroke="currentColor" stroke-width="2"/><line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" stroke-width="1.8"/><line x1="8.5" y1="3.5" x2="8.5" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="15.5" y1="3.5" x2="15.5" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    sun: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="2"/><line x1="12" y1="3.5" x2="12" y2="5.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="18.2" x2="12" y2="20.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="3.5" y1="12" x2="5.8" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.2" y1="12" x2="20.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="6" x2="7.6" y2="7.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="16.4" y1="16.4" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="6" x2="16.4" y2="7.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="7.6" y1="16.4" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    palette: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4a8 8 0 1 0 0 16h1.3a2.2 2.2 0 0 0 1.6-3.7c-.7-.8-.2-2 .8-2H17a3 3 0 0 0 3-3A7.3 7.3 0 0 0 12 4Z" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="11" r="1.2" fill="currentColor"/><circle cx="11.5" cy="8.2" r="1.2" fill="currentColor"/><circle cx="15.2" cy="9.4" r="1.2" fill="currentColor"/></svg>`
  };
  return icons[iconKey] || icons.note;
}

function formatAchievementDate(ts) {
  if (!ts) return "";
  try {
    const lang = getAchievementLanguageCode();
    return new Date(ts).toLocaleDateString(lang === "de" ? "de-DE" : lang, {
      day: "2-digit",
      month: "short"
    });
  } catch (e) {
    return "";
  }
}

function setAchievementsEnabled(enabled) {
  if (!state?.profile) return;
  state.profile.showAchievements = Boolean(enabled);
  if (typeof saveUserProfile === "function") {
    saveUserProfile(state.profile);
  }
  renderSpaceAchievementsCard();
  renderProfileTitleSelector();
}

function setSelectedProfileTitle(titleId) {
  if (!state?.profile) return;
  const clean = typeof titleId === "string" && ACHIEVEMENT_VALID_TITLE_IDS.has(titleId) ? titleId : "";
  const unlocked = getUnlockedAchievementTitles();
  state.profile.selectedTitleId = unlocked.some(t => t.id === clean) ? clean : "";
  if (typeof saveUserProfile === "function") {
    saveUserProfile(state.profile);
  }
  renderProfileTitleSelector();
}

function renderProfileTitleSelector() {
  const badgeEl = document.getElementById("spaceProfileTitleBadge");
  const fieldEl = document.getElementById("profileTitleField");
  const hostEl = document.getElementById("profileTitleDropdown");
  const labelEl = document.getElementById("profileTitleLabel");

  const enabled = state?.profile?.showAchievements !== false;
  const unlockedTitles = enabled ? getUnlockedAchievementTitles() : [];
  const activeLabel = getActiveProfileTitleLabel();

  if (badgeEl) {
    if (activeLabel) {
      badgeEl.textContent = activeLabel;
      badgeEl.classList.remove("hidden");
    } else {
      badgeEl.textContent = "";
      badgeEl.classList.add("hidden");
    }
  }

  if (labelEl) {
    labelEl.textContent = formatAchievementUI("titleLabel");
  }

  if (!fieldEl || !hostEl) return;
  if (!enabled || unlockedTitles.length === 0) {
    fieldEl.classList.add("hidden");
    hostEl.innerHTML = "";
    return;
  }

  fieldEl.classList.remove("hidden");
  const currentId = typeof state.profile.selectedTitleId === "string" ? state.profile.selectedTitleId : "";
  const selectedKey = unlockedTitles.some(t => t.id === currentId) ? currentId : "";
  const options = [
    { key: "", label: getLocalizedAchievementTitleLabel("none") },
    ...unlockedTitles.map(t => ({
      key: t.id,
      label: getLocalizedAchievementTitleLabel(t.id)
    }))
  ];

  if (typeof renderProfileSingleDropdown === "function") {
    renderProfileSingleDropdown({
      containerEl: hostEl,
      key: "profile-title",
      options,
      selectedKey,
      ariaLabelledBy: "profileTitleLabel",
      onSelect: (nextId) => {
        setSelectedProfileTitle(nextId);
      }
    });
  }
}

function renderSpaceAchievementsCard() {
  const card = document.getElementById("spaceAchievementsCard");
  if (!card || !state?.profile) return;

  const enabled = state.profile.showAchievements !== false;
  const data = ensureProfileAchievements();
  const totalCount = ACHIEVEMENTS_CATALOG.length;
  const unlockedCount = getUnlockedAchievementCount();

  // Ein/Aus-Schalter synchronisieren
  card.querySelectorAll("[data-achievements-toggle]").forEach(btn => {
    const active = (btn.dataset.achievementsToggle === "on") === enabled;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  const counterBadge = document.getElementById("spaceAchievementsCountBadge");
  if (counterBadge) {
    counterBadge.textContent = `${unlockedCount} / ${totalCount}`;
    counterBadge.classList.toggle("hidden", !enabled);
  }

  const bodyEl = document.getElementById("spaceAchievementsBody");
  const hiddenNoteEl = document.getElementById("spaceAchievementsHiddenNote");
  if (!bodyEl || !hiddenNoteEl) return;

  if (!enabled) {
    bodyEl.classList.add("hidden");
    hiddenNoteEl.textContent = formatAchievementUI("hiddenNote");
    hiddenNoteEl.classList.remove("hidden");
    return;
  }

  hiddenNoteEl.classList.add("hidden");
  bodyEl.classList.remove("hidden");

  const wasOpen = Boolean(bodyEl.querySelector(".ach-details")?.open);
  const pct = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  // Bonus-Theme-Fortschritt (ruhige Hinweiszeile)
  const bonusPillsHtml = ACHIEVEMENT_BONUS_THEMES.map(themeDef => {
    const unlocked = unlockedCount >= themeDef.requiredCount;
    const name = formatAchievementUI(themeDef.nameKey);
    const meta = unlocked
      ? formatAchievementUI("unlockedWord")
      : formatAchievementUI("lockAt", { n: themeDef.requiredCount });
    return `
      <span class="ach-bonus-pill ${unlocked ? "is-unlocked" : ""}">
        <span class="ach-bonus-dot" aria-hidden="true"></span>
        <span><strong>${escapeHtml(name)}</strong> · ${escapeHtml(meta)}</span>
      </span>
    `;
  }).join("");

  const groupDefs = [
    { key: "all",     label: formatAchievementUI("groupAll") },
    { key: "explore", label: formatAchievementUI("groupExplore") },
    { key: "music",   label: formatAchievementUI("groupMusic") },
    { key: "exams",   label: formatAchievementUI("groupExams") },
    { key: "habit",   label: formatAchievementUI("groupHabit") }
  ];

  const filterHtml = groupDefs.map(g => `
    <button type="button" class="k-filter-pill ${_achievementsActiveFilter === g.key ? "active" : ""}" data-ach-filter="${g.key}">
      ${escapeHtml(g.label)}
    </button>
  `).join("");

  const visibleItems = ACHIEVEMENTS_CATALOG.filter(
    item => _achievementsActiveFilter === "all" || item.group === _achievementsActiveFilter
  );

  const cardsHtml = visibleItems.map(item => {
    const unlockedTs = data.unlocked[item.id] || 0;
    const isUnlocked = Boolean(unlockedTs);
    const copy = getLocalizedAchievementCopy(item.id);
    const currentVal = isUnlocked ? item.target : Math.min(item.target, item.getValue(data.stats));
    const showProgress = !isUnlocked && item.target > 1;
    const progressPct = item.target > 0 ? Math.round((currentVal / item.target) * 100) : 0;
    const rewardTitle = item.titleRewardId ? getLocalizedAchievementTitleLabel(item.titleRewardId) : "";
    const dateStr = isUnlocked ? formatAchievementDate(unlockedTs) : "";

    return `
      <article class="ach-card ${isUnlocked ? "is-unlocked" : "is-locked"}">
        <div class="ach-icon-wrap" aria-hidden="true">${buildAchievementIconSVG(item.icon)}</div>
        <div class="ach-card-body">
          <div class="ach-card-top">
            <h4 class="ach-card-title">${escapeHtml(copy.title)}</h4>
            ${dateStr ? `<span class="ach-card-date">${escapeHtml(dateStr)}</span>` : ""}
          </div>
          <p class="ach-card-desc">${escapeHtml(copy.desc)}</p>
          ${showProgress ? `
            <div class="ach-item-progress">
              <div class="ach-item-bar"><span style="width:${progressPct}%"></span></div>
              <span class="ach-item-ratio">${currentVal}/${item.target}</span>
            </div>
          ` : ""}
          ${rewardTitle ? `
            <span class="ach-reward-chip">${escapeHtml(rewardTitle)}</span>
          ` : ""}
        </div>
      </article>
    `;
  }).join("");

  bodyEl.innerHTML = `
    <div class="ach-summary-strip">
      <div class="ach-overall-bar" aria-hidden="true">
        <span class="ach-overall-fill" style="width:${pct}%"></span>
      </div>
      <div class="ach-bonus-row">
        <span class="ach-bonus-label">${escapeHtml(formatAchievementUI("bonusHeading"))}</span>
        <div class="ach-bonus-pills">${bonusPillsHtml}</div>
      </div>
    </div>

    <details class="ach-details"${wasOpen ? " open" : ""}>
      <summary class="ach-details-summary">
        <span>${escapeHtml(formatAchievementUI("expandSummary", { unlocked: unlockedCount, total: totalCount }))}</span>
        <span class="ach-details-chevron" aria-hidden="true">▾</span>
      </summary>
      <div class="ach-details-content">
        <div class="ach-filter-row" role="tablist">${filterHtml}</div>
        <div class="ach-grid">${cardsHtml}</div>
      </div>
    </details>
  `;

  bodyEl.querySelectorAll("[data-ach-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      _achievementsActiveFilter = btn.dataset.achFilter || "all";
      const detailsEl = bodyEl.querySelector(".ach-details");
      const keepOpen = detailsEl ? detailsEl.open : true;
      renderSpaceAchievementsCard();
      const reopened = bodyEl.querySelector(".ach-details");
      if (reopened && keepOpen) reopened.open = true;
    });
  });
}

function devUnlockAllAchievements() {
  if (!state?.profile) return;
  const data = ensureProfileAchievements();
  const now = Date.now();
  for (const item of ACHIEVEMENTS_CATALOG) {
    if (!data.unlocked[item.id]) {
      data.unlocked[item.id] = now;
    }
  }
  state.profile.showAchievements = true;
  if (typeof saveUserProfile === "function") {
    saveUserProfile(state.profile);
  }
  if (typeof applyThemeAndAppearance === "function") {
    applyThemeAndAppearance();
  }
  renderProfileTitleSelector();
  renderSpaceAchievementsCard();
  if (typeof showAppToast === "function") {
    showAppToast(`Dev: Alle ${ACHIEVEMENTS_CATALOG.length} Meilensteine freigeschaltet!`, "success", 3600);
  }
}

function devResetAllAchievements() {
  if (!state?.profile) return;
  state.profile.achievements = createDefaultAchievementsData();
  state.profile.selectedTitleId = "";
  if (typeof saveUserProfile === "function") {
    saveUserProfile(state.profile);
  }
  if (typeof applyThemeAndAppearance === "function") {
    applyThemeAndAppearance();
  }
  renderProfileTitleSelector();
  renderSpaceAchievementsCard();
  if (typeof showAppToast === "function") {
    showAppToast("Dev: Meilensteine zurückgesetzt.", "info", 3200);
  }
}

function bindDevAchievementsVersionTap() {
  if (!DEV_ACHIEVEMENTS_TAP_UNLOCK_ENABLED || typeof document === "undefined") return;
  const badge = document.getElementById("aboutVersionBadge");
  if (!badge || badge.dataset.devAchBound === "1") return;
  badge.dataset.devAchBound = "1";
  badge.style.userSelect = "none";
  badge.style.webkitUserSelect = "none";
  badge.style.cursor = "pointer";

  let tapCount = 0;
  let lastTapMs = 0;

  badge.addEventListener("click", () => {
    const now = Date.now();
    if (now - lastTapMs > 2500) {
      tapCount = 0;
    }
    lastTapMs = now;
    tapCount += 1;

    if (tapCount >= 7) {
      tapCount = 0;
      if (getUnlockedAchievementCount() < ACHIEVEMENTS_CATALOG.length) {
        devUnlockAllAchievements();
      } else {
        devResetAllAchievements();
      }
    }
  });
}

function initAchievementsSystem() {
  if (!state?.profile) return;
  syncRetroactiveAchievements({ save: true });

  document.querySelectorAll("[data-achievements-toggle]").forEach(btn => {
    if (btn.dataset.achBound === "1") return;
    btn.dataset.achBound = "1";
    btn.addEventListener("click", () => {
      setAchievementsEnabled(btn.dataset.achievementsToggle === "on");
    });
  });

  bindDevAchievementsVersionTap();
  initBonusThemeUnlockModal();
  renderProfileTitleSelector();
  renderSpaceAchievementsCard();
}
