/**
 * Lauscher • Feste Übungshöhe (fitExerciseLayout), Streak, Music-Juice & zentrale Bühne/Maskottchen
 */

// ---------- FESTE ÜBUNGSHÖHE ----------
// Die Übung scrollt nie. Bleibt für die mittlere Bühne zu wenig Platz, wird stufenweise verdichtet
// (#viewExercise.fit-1 … fit-3 in styles.css). Die Bühne selbst passt sich per Container-Query an.
const EXERCISE_FIT_LEVELS = 3;
// Mindesthöhe der Bühne: knapp über der Container-Query-Stufe (max-height: 96px), ab der die
// Beschreibung auf eine Zeile gekürzt wird. Darunter werden lieber Kacheln/Knöpfe verdichtet,
// damit Text und Maskottchen der Bühne nicht abgeschnitten wirken.
const EXERCISE_MIN_STAGE_PX = 98;
let lastExerciseFitSnapshot = "";

function getExerciseFitSnapshot() {
  const view = document.getElementById("viewExercise");
  if (!view || view.classList.contains("hidden") || view.clientHeight <= 0) return "";
  const card = document.getElementById("exerciseModuleCard");
  const dock = view.querySelector(".bottom-dock");
  return `${view.clientWidth}x${view.clientHeight}:${card?.offsetHeight || 0}:${dock?.offsetHeight || 0}`;
}

function hasActiveExerciseResultExtension() {
  const fb = document.getElementById("feedbackContainer");
  if (fb && !fb.classList.contains("hidden")) return true;
  const tl = document.getElementById("rhythmTapTimeline");
  if (tl && !tl.classList.contains("hidden")) return true;
  return false;
}

/** Positioniert schwebende Einstellungs-Popovers direkt unterhalb von .module-header
 *  und begrenzt ihre Höhe sicher auf den sichtbaren Bereich von #viewExercise. */
function positionOpenModulePopovers() {
  const card = document.getElementById("exerciseModuleCard");
  const view = document.getElementById("viewExercise");
  if (!card) return;
  const header = card.querySelector(".module-header");
  const headerBottom = header ? (header.offsetTop + header.offsetHeight + 4) : 48;
  const cardTopInView = card.offsetTop || 0;
  const viewH = view && view.clientHeight > 0 ? view.clientHeight : window.innerHeight;
  const maxPopoverH = Math.max(110, Math.min(420, viewH - cardTopInView - headerBottom - 12));
  card.querySelectorAll(":scope > .module-inline-popover").forEach(pop => {
    if (pop.classList.contains("is-pinned")) {
      pop.style.top = "";
      pop.style.maxHeight = "";
      return;
    }
    if (pop.classList.contains("hidden")) return;
    pop.style.top = `${headerBottom}px`;
    pop.style.maxHeight = `${maxPopoverH}px`;
  });
  const singHint = document.getElementById("singAlongHint");
  if (singHint) {
    if (view?.classList.contains("sing-hint-float") && !singHint.classList.contains("hidden") && viewH > 0) {
      const floatTop = cardTopInView + card.offsetHeight + 6;
      const maxHintH = Math.max(96, Math.min(260, viewH - floatTop - 12));
      singHint.style.maxHeight = `${maxHintH}px`;
    } else {
      singHint.style.maxHeight = "";
    }
  }
}

// reset = neue Aufgabe oder neue Fenstergröße. Solange keine Feedback-Karte / Tap-Auswertung aktiv ist,
// darf das Layout immer zur optimalen (größtmöglichen) Stufe zurückkehren; nur bei aktiver Ergebnis-Karte
// wird innerhalb derselben Aufgabe nicht zurückgesprungen, damit die Antwortknöpfe ruhig bleiben.
function fitExerciseLayout(reset = true) {
  const view = document.getElementById("viewExercise");
  if (!view) return;
  if (view.classList.contains("hidden") || view.clientHeight <= 0) {
    if (reset) {
      view.dataset.fitLevel = "0"; // beim Einblenden misst der ResizeObserver neu
      view.classList.remove("sing-hint-float", "fit-overflow");
      for (let i = 1; i <= EXERCISE_FIT_LEVELS; i++) view.classList.remove(`fit-${i}`);
      lastExerciseFitSnapshot = "";
    }
    return;
  }
  const card = document.getElementById("exerciseModuleCard");
  const openFloatingPopovers = card
    ? Array.from(card.querySelectorAll(":scope > .module-inline-popover:not(.is-pinned):not(.hidden)"))
    : [];
  const tutorialCard = document.getElementById("exerciseTutorialCard");
  if (tutorialCard && !tutorialCard.classList.contains("hidden")) {
    openFloatingPopovers.push(tutorialCard);
  }
  const tutorialBackdrop = document.getElementById("exerciseTutorialBackdrop");
  if (tutorialBackdrop && !tutorialBackdrop.classList.contains("hidden")) {
    openFloatingPopovers.push(tutorialBackdrop);
  }
  // Schwebende Einstellungs-Popovers & Tutorial-Karte für die synchrone Messung ausblenden, damit sie
  // view.scrollHeight selbst auf sehr kleinen Bildschirmen nie verfälschen (kein Paint dazwischen).
  openFloatingPopovers.forEach(pop => { pop.style.display = "none"; });

  try {
    const stageWrap = view.querySelector(".stage-wrapper");
    const stageCard = stageWrap?.querySelector(".central-stage");
    const fits = () => view.scrollHeight <= view.clientHeight + 1 &&
      (!stageWrap || stageWrap.clientHeight >= EXERCISE_MIN_STAGE_PX) &&
      (!stageCard || stageCard.scrollHeight <= stageCard.clientHeight + 2);
    const keepFloor = !reset && hasActiveExerciseResultExtension();
    const floor = keepFloor ? (parseInt(view.dataset.fitLevel, 10) || 0) : 0;
    const singHint = document.getElementById("singAlongHint");
    const singHintVisible = Boolean(singHint && !singHint.classList.contains("hidden"));

    view.classList.remove("sing-hint-float", "fit-overflow");
    const runLevels = (startLvl = floor) => {
      for (let i = 1; i <= EXERCISE_FIT_LEVELS; i++) view.classList.remove(`fit-${i}`);
      let lvl = startLvl;
      if (lvl > 0) view.classList.add(`fit-${lvl}`);
      while (lvl < EXERCISE_FIT_LEVELS && !fits()) {
        if (lvl > 0) view.classList.remove(`fit-${lvl}`);
        lvl += 1;
        view.classList.add(`fit-${lvl}`);
      }
      return lvl;
    };

    let level;
    if (singHintVisible) {
      // Erst messen, welches Level die eigentliche Übung (ohne Mitsing-Karte im Fluss) braucht:
      // manuell aufgeklappte Mitsing-Karte schwebt immer; automatisches Intro bleibt nur im Fluss,
      // wenn es ohne zusätzliche Verdichtung hineinpasst.
      view.classList.add("sing-hint-float");
      singHint.style.display = "none";
      level = runLevels(floor);
      if (!state?.singAlongExpanded) {
        singHint.style.display = "";
        view.classList.remove("sing-hint-float");
        if (!fits()) {
          view.classList.add("sing-hint-float");
          singHint.style.display = "none";
        }
      }
    } else {
      level = runLevels(floor);
    }

    if (view.scrollHeight > view.clientHeight + 1) view.classList.add("fit-overflow");
    view.dataset.fitLevel = String(level);
    const grid = document.getElementById("degreeButtonsGrid");
    if (grid && (grid.querySelector(".degree-step") || grid.classList.contains("grid-chords"))) fitChoiceNamesToTiles(grid);
    lastExerciseFitSnapshot = getExerciseFitSnapshot();
  } finally {
    const singHintEl = document.getElementById("singAlongHint");
    if (singHintEl) singHintEl.style.display = "";
    openFloatingPopovers.forEach(pop => { pop.style.display = ""; });
    positionOpenModulePopovers();
  }
}

let exerciseFitQueued = null;
function queueFitExerciseLayout(reset = false) {
  if (exerciseFitQueued !== null) {
    exerciseFitQueued = exerciseFitQueued || reset;
    return;
  }
  exerciseFitQueued = reset;
  setTimeout(() => {
    const doReset = exerciseFitQueued;
    exerciseFitQueued = null;
    fitExerciseLayout(doReset);
  }, 0);
}

function initExerciseFitObserver() {
  window.addEventListener("resize", () => queueFitExerciseLayout(true));
  if (typeof ResizeObserver !== "function") return;
  const ro = new ResizeObserver(() => {
    const snap = getExerciseFitSnapshot();
    if (!snap || snap === lastExerciseFitSnapshot) {
      positionOpenModulePopovers();
      return;
    }
    queueFitExerciseLayout(false);
  });
  ["viewExercise", "exerciseModuleCard"].forEach(id => {
    const el = document.getElementById(id);
    if (el) ro.observe(el);
  });
  const dock = document.querySelector("#viewExercise .bottom-dock");
  if (dock) ro.observe(dock);
}

const STREAK_MILESTONES = new Set([3, 5, 8, 10, 15, 20, 25, 30, 40, 50, 75, 100]);

function isStreakMilestone(count) {
  return STREAK_MILESTONES.has(count) || (count > 100 && count % 25 === 0);
}

function getStreakMilestoneText(count) {
  const name = getProfileUserName(true);
  if (count === 3) {
    return name
      ? tf("3 in Folge, {name} – schöner Flow!", "3 in a row, {name} — nice flow!", { name })
      : tr("3 in Folge – schöner Flow!", "3 in a row — nice flow!");
  }
  if (count === 5) return tr("5 in Folge – dein Ohr ist voll da!", "5 in a row — your ear is dialed in!");
  if (count === 8) {
    return name
      ? tf("8 in Folge, {name} – eine ganze Oktave!", "8 in a row, {name} — a full octave!", { name })
      : tr("8 in Folge – eine ganze Oktave!", "8 in a row — a full octave!");
  }
  if (count === 10) return tr("10 in Folge – beeindruckend sicher!", "10 in a row — remarkably sharp!");
  if (count === 15) {
    return name
      ? tf("15 in Folge, {name} – echtes Musiker-Gehör!", "15 in a row, {name} — true musician’s ear!", { name })
      : tr("15 in Folge – echtes Musiker-Gehör!", "15 in a row — true musician’s ear!");
  }
  if (count === 20) return tr("20 in Folge – absolut souverän!", "20 in a row — effortless precision!");
  return name
    ? tf("{n} in Folge, {name} – starker Fokus!", "{n} in a row, {name} — razor-sharp focus!", { n: count, name })
    : tf("{n} in Folge – starker Fokus!", "{n} in a row — razor-sharp focus!", { n: count });
}

function renderStageStreakUI() {
  const isExam = Boolean(state?.exam?.active);
  const st = state?.streakState || { count: 0, activeNoticeMilestone: 0 };
  const count = isExam ? 0 : (Number(st.count) || 0);
  const milestone = isExam ? 0 : (Number(st.activeNoticeMilestone) || 0);

  const pillEl = document.getElementById("stageStreakPill");
  if (pillEl) {
    if (count >= 3) {
      pillEl.textContent = tf("✦ {n} in Folge", "✦ {n} in a row", { n: count });
      pillEl.classList.remove("hidden");
      pillEl.classList.toggle("is-high", count >= 8);
    } else {
      pillEl.textContent = "";
      pillEl.classList.add("hidden");
      pillEl.classList.remove("is-high");
    }
  }

  const noticeEl = document.getElementById("stageStreakNotice");
  if (noticeEl) {
    if (milestone >= 3) {
      noticeEl.textContent = `✦ ${getStreakMilestoneText(milestone)}`;
      noticeEl.classList.remove("hidden");
      noticeEl.classList.toggle("is-high", milestone >= 8);
    } else {
      noticeEl.textContent = "";
      noticeEl.classList.add("hidden");
      noticeEl.classList.remove("is-high");
    }
  }
}

function getExerciseStreakScopeKey() {
  const s = state?.settings;
  if (!s) return "";
  const mode = String(s.mode || "cadence");
  if (mode === "cadence" || mode === "cadence-minor") {
    return `${mode}:${s.difficulty}:${s.cadencePos}`;
  }
  if (mode === "solfege") {
    if (String(s.solfegeDifficulty) === "17") {
      return `solfege:17:${s.solfegeCustomTonality}:${s.solfegeCustomKey}:${s.solfegeCustomRange}:${s.solfegeCustomOctave}`;
    }
    return `solfege:${s.solfegeDifficulty}`;
  }
  if (mode === "melody") {
    return `melody:${s.melodyStyle}:${s.melodyRange}:${s.melodyKeyMode}:${s.melodyOctave}`;
  }
  if (mode === "rhythm-tap") {
    return `rhythm-tap:${s.rhythmDifficulty}:${s.rhythmTapRead ? "read" : "ear"}`;
  }
  if (mode.startsWith("rhythm-")) {
    return `${mode}:${s.rhythmDifficulty}`;
  }
  if (mode.startsWith("prod-")) {
    return `${mode}:${s.prodDifficulty}`;
  }
  if (mode.startsWith("modes-")) {
    return `${mode}:${s.modesDifficulty}`;
  }
  if (mode.startsWith("notation-")) {
    return `${mode}:${s.notationDifficulty}`;
  }
  if (mode === "chord-inversions") {
    return `chord-inversions:${s.chordInvDifficulty}`;
  }
  if (mode === "interval-chords" || mode === "chord-arp-up" || mode === "chord-arp-down") {
    return `${mode}:${s.chordDifficulty}`;
  }
  if (mode === "interval-custom") {
    return `interval-custom:${s.intervalCustomScale}:${s.intervalCustomPlayMode || "melodic"}`;
  }
  return `${mode}:${s.intervalDifficulty}`;
}

function resetExerciseStreakState(scopeKey = null) {
  if (!state) return;
  state.streakState = { count: 0, activeNoticeMilestone: 0, scopeKey };
  renderStageStreakUI();
}

function syncExerciseStreakScope() {
  if (!state) return;
  const nextScope = getExerciseStreakScopeKey();
  if (!state.streakState || state.streakState.scopeKey !== nextScope) {
    state.streakState = { count: 0, activeNoticeMilestone: 0, scopeKey: nextScope };
  }
}

function resetExerciseStreakOnAttempt(ex) {
  if (ex) ex.hadWrongAttempt = true;
  const scopeKey = getExerciseStreakScopeKey();
  if (!state.streakState) state.streakState = { count: 0, activeNoticeMilestone: 0, scopeKey };
  state.streakState.count = 0;
  state.streakState.activeNoticeMilestone = 0;
  state.streakState.scopeKey = scopeKey;
  renderStageStreakUI();
}

function recordExerciseStreakSuccess(ex) {
  syncExerciseStreakScope();
  if (!ex || ex.streakCounted) {
    return {
      count: state.streakState.count,
      isMilestone: state.streakState.activeNoticeMilestone > 0
    };
  }
  ex.streakCounted = true;
  if (ex.hadWrongAttempt) {
    state.streakState.count = 0;
    state.streakState.activeNoticeMilestone = 0;
  } else {
    state.streakState.count += 1;
    state.streakState.activeNoticeMilestone = isStreakMilestone(state.streakState.count)
      ? state.streakState.count
      : 0;
  }
  renderStageStreakUI();
  if (typeof recordAchievementEvent === "function") {
    const mode = ex.type || state?.settings?.mode || "";
    const isNotationStaff = mode.startsWith("notation-") && mode !== "notation-symbols";
    const isIntervalMode = mode.startsWith("interval-") && mode !== "interval-chords";
    recordAchievementEvent({
      type: "exercise-solved",
      mode,
      streak: state.streakState.count,
      clefId: isNotationStaff ? (ex.targetItem?.clefId || ex.baseClefId || "") : "",
      isTritone: isIntervalMode && Number(ex.targetItem?.semitones) === 6,
      isFlowOrder: mode === "notation-symbols" && ex.promptKind === "flow-order",
      isBlindTap: mode === "rhythm-tap" && Boolean(ex.blind)
    });
  }
  return {
    count: state.streakState.count,
    isMilestone: state.streakState.activeNoticeMilestone > 0
  };
}

const MUSIC_JUICE_SVGS = {
  // Violinschlüssel (G-Schlüssel)
  treble: `<svg viewBox="0 0 28 36" fill="none" aria-hidden="true"><path d="M15.8 25.5 C19.5 25.2 21.5 22.4 21 19 C20.4 15.5 17.2 14.3 14.3 15.4 C11.5 16.5 10.6 19.5 12.2 21.6 C13.2 22.9 14.9 23.2 16.1 22.4" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.8 25.5 C10.4 25.6 7.5 22.3 7.8 17.9 C8.2 13.2 13.5 10.5 16.6 7 C18.1 5.3 18.2 3.3 16.5 3.1 C14.8 2.9 14 4.8 14.2 7.5 L15.1 29.2 C15.2 31.6 13.6 33.2 11.4 33 C10.2 32.9 9.5 32.2 9.4 31.2" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.2" cy="30.8" r="2.1" fill="currentColor"/></svg>`,
  // Bassschlüssel (F-Schlüssel)
  bass: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6.6" cy="9.2" r="2.4" fill="currentColor"/><path d="M6.8 9.2 C6.5 5.4 10.2 4 13.4 4.8 C16.8 5.6 17.8 9.5 15.8 13.2 C13.9 16.6 9.8 18.6 5.8 19.8" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><circle cx="19.8" cy="7.6" r="1.5" fill="currentColor"/><circle cx="19.8" cy="12.6" r="1.5" fill="currentColor"/></svg>`,
  // C-Schlüssel (Alt-/Tenorschlüssel)
  alto: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><line x1="5.2" y1="3.8" x2="5.2" y2="20.2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="8.6" y1="3.8" x2="8.6" y2="20.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M9.6 4.8 C15 4.3 18.2 6.6 17.4 9.3 C16.7 11.1 13.2 11.8 10.4 12 C13.2 12.2 16.7 12.9 17.4 14.7 C18.2 17.4 15 19.7 9.6 19.2" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/><circle cx="14.6" cy="7.6" r="1.15" fill="currentColor"/><circle cx="14.6" cy="16.4" r="1.15" fill="currentColor"/></svg>`,
  // Viertelnote
  quarter: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="9.4" cy="18.2" rx="4.2" ry="2.9" transform="rotate(-22 9.4 18.2)" fill="currentColor"/><line x1="12.9" y1="17.2" x2="12.9" y2="4.2" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/></svg>`,
  // Halbe Note
  half: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="9.4" cy="18.2" rx="4.1" ry="2.8" transform="rotate(-22 9.4 18.2)" stroke="currentColor" stroke-width="2.2"/><line x1="13" y1="17.2" x2="13" y2="4.2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  // Achtelnote
  eighth: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="8.5" cy="18.2" rx="4" ry="2.8" transform="rotate(-22 8.5 18.2)" fill="currentColor"/><line x1="11.9" y1="17.2" x2="11.9" y2="4.2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M11.9 4.2 C16.5 6.6 18.6 9.8 16.6 13.8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  // Balken-Achtelpaar
  beamed: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="6.2" cy="18.6" rx="3.4" ry="2.4" transform="rotate(-20 6.2 18.6)" fill="currentColor"/><line x1="9.1" y1="18" x2="9.1" y2="6.2" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><ellipse cx="16.8" cy="16.6" rx="3.4" ry="2.4" transform="rotate(-20 16.8 16.6)" fill="currentColor"/><line x1="19.7" y1="16" x2="19.7" y2="4.2" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><line x1="9.1" y1="6.2" x2="19.7" y2="4.2" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  // Sechzehntelnote
  sixteenth: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="8.5" cy="18.5" rx="3.9" ry="2.7" transform="rotate(-22 8.5 18.5)" fill="currentColor"/><line x1="11.8" y1="17.6" x2="11.8" y2="3.8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M11.8 3.8 C16.3 5.8 18.2 8.3 16.4 11.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><path d="M11.8 8.3 C16.3 10.3 18.2 12.8 16.4 15.8" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>`
};

const JUICE_SYMBOL_ROTATION = ["treble", "beamed", "bass", "quarter", "alto", "eighth", "sixteenth", "half"];
// Themes können die Partikelfarben über --juice-1 … --juice-4 überschreiben (z. B. Bonus-Themes)
const JUICE_THEME_COLORS = [
  "var(--juice-1, var(--sage-strong))",
  "var(--juice-2, var(--lilac-strong))",
  "var(--juice-3, var(--status-ok))",
  "var(--juice-4, var(--raccoon-dark))"
];

const JUICE_PARTICLE_PRESETS = {
  micro: [
    { x: -17, y: -26, rot: -12, delay: 0,  size: 14 },
    { x: 0,   y: -32, rot: 0,   delay: 35, size: 17 },
    { x: 18,  y: -25, rot: 12,  delay: 65, size: 14 }
  ],
  standard: [
    { x: -24, y: -32, rot: -14, delay: 0,  size: 17 },
    { x: -10, y: -40, rot: -8,  delay: 30, size: 19 },
    { x: 12,  y: -39, rot: 10,  delay: 50, size: 18 },
    { x: 26,  y: -29, rot: 14,  delay: 75, size: 17 },
    { x: 2,   y: -28, rot: 4,   delay: 95, size: 15 }
  ],
  stage: [
    { x: -45, y: -26, rot: -14, delay: 0,  size: 18 },
    { x: -21, y: -42, rot: -10, delay: 35, size: 20 },
    { x: 0,   y: -45, rot: 2,   delay: 55, size: 19 },
    { x: 24,  y: -41, rot: 12,  delay: 75, size: 20 },
    { x: 46,  y: -25, rot: 15,  delay: 95, size: 18 }
  ]
};

let juiceBurstSeq = 0;
let lastPointerInputPoint = null;
let globalPointerTrackerBound = false;

function extractEventInputPoint(ev) {
  if (!ev || typeof ev !== "object") return null;
  if (ev.changedTouches && ev.changedTouches.length > 0) {
    const t = ev.changedTouches[0];
    if (Number.isFinite(t.clientX) && Number.isFinite(t.clientY) && (t.clientX !== 0 || t.clientY !== 0)) {
      return { x: t.clientX, y: t.clientY, atMs: Date.now() };
    }
  }
  if (ev.touches && ev.touches.length > 0) {
    const t = ev.touches[0];
    if (Number.isFinite(t.clientX) && Number.isFinite(t.clientY) && (t.clientX !== 0 || t.clientY !== 0)) {
      return { x: t.clientX, y: t.clientY, atMs: Date.now() };
    }
  }
  if (Number.isFinite(ev.clientX) && Number.isFinite(ev.clientY) && (ev.clientX !== 0 || ev.clientY !== 0)) {
    return { x: ev.clientX, y: ev.clientY, atMs: Date.now() };
  }
  return null;
}

function getFreshPointerInputPoint(maxAgeMs = 1800) {
  if (!lastPointerInputPoint) return null;
  if (Date.now() - lastPointerInputPoint.atMs > maxAgeMs) return null;
  return lastPointerInputPoint;
}

function resolveInputPointFromOptions(options = {}) {
  const fromOpt = options.inputPoint && Number.isFinite(options.inputPoint.x) && Number.isFinite(options.inputPoint.y)
    ? options.inputPoint
    : null;
  return fromOpt || extractEventInputPoint(options.inputEvent) || getFreshPointerInputPoint();
}

function bindGlobalPointerInputTracker() {
  if (globalPointerTrackerBound || typeof document === "undefined" || typeof document.addEventListener !== "function") return;
  globalPointerTrackerBound = true;
  const capturePoint = (ev) => {
    const pt = extractEventInputPoint(ev);
    if (pt) lastPointerInputPoint = pt;
  };
  document.addEventListener("pointerdown", capturePoint, { capture: true, passive: true });
  document.addEventListener("touchstart", capturePoint, { capture: true, passive: true });
  document.addEventListener("click", (ev) => {
    // Tastatur-Aktivierung (Enter/Space) sendet detail===0 & (0,0) — nur echte Zeiger-/Touch-Klicks übernehmen
    if (ev && ev.detail === 0 && ev.clientX === 0 && ev.clientY === 0) {
      if (!lastPointerInputPoint || (Date.now() - lastPointerInputPoint.atMs > 450)) {
        lastPointerInputPoint = null;
      }
      return;
    }
    capturePoint(ev);
  }, { capture: true, passive: true });
  document.addEventListener("keydown", () => {
    lastPointerInputPoint = null;
  }, { capture: true, passive: true });
}

function resolveJuiceOrigin(hostEl, options = {}) {
  const fallbackX = options.originX || "50%";
  const fallbackY = options.originY || "26%";
  const pt = resolveInputPointFromOptions(options);
  if (!pt || !hostEl || typeof hostEl.getBoundingClientRect !== "function") {
    return { originX: fallbackX, originY: fallbackY };
  }
  const rect = hostEl.getBoundingClientRect();
  if (!rect || !(rect.width > 0) || !(rect.height > 0)) {
    return { originX: fallbackX, originY: fallbackY };
  }
  const tol = options.containTolerancePx ?? 16;
  const inBounds =
    pt.x >= rect.left - tol &&
    pt.x <= rect.right + tol &&
    pt.y >= rect.top - tol &&
    pt.y <= rect.bottom + tol;
  if (!inBounds && !options.allowOutsideHost) {
    return { originX: fallbackX, originY: fallbackY };
  }
  const relX = Math.max(0, Math.min(rect.width, pt.x - rect.left));
  const relY = Math.max(0, Math.min(rect.height, pt.y - rect.top));
  return {
    originX: `${relX.toFixed(1)}px`,
    originY: `${relY.toFixed(1)}px`
  };
}

function shouldAnimateJuice() {
  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    } catch (_e) {}
  }
  return true;
}

// Gesamtgröße der Erfolgs-Animation (Symbolgröße & Flugweite), 1 = ursprüngliche Presets (+15 % gegenüber 1.2)
const JUICE_BURST_SCALE = 1.38;

function spawnJuiceBurst(hostEl, options = {}) {
  bindGlobalPointerInputTracker();
  if (!hostEl || typeof hostEl.appendChild !== "function" || typeof document?.createElement !== "function") return;
  if (!shouldAnimateJuice()) return;
  if (typeof hostEl.querySelectorAll === "function") {
    hostEl.querySelectorAll(".juice-particle").forEach(prev => {
      if (typeof prev.remove === "function") prev.remove();
      else if (prev.parentNode?.removeChild) prev.parentNode.removeChild(prev);
    });
  }
  const specs = JUICE_PARTICLE_PRESETS[options.intensity || "standard"] || JUICE_PARTICLE_PRESETS.standard;
  const { originX, originY } = resolveJuiceOrigin(hostEl, options);
  const seqOffset = juiceBurstSeq;
  juiceBurstSeq = (juiceBurstSeq + 1) % JUICE_SYMBOL_ROTATION.length;

  specs.forEach((spec, idx) => {
    const symbolKey = JUICE_SYMBOL_ROTATION[(seqOffset + idx) % JUICE_SYMBOL_ROTATION.length];
    const color = JUICE_THEME_COLORS[(seqOffset + idx) % JUICE_THEME_COLORS.length];
    const p = document.createElement("span");
    p.className = "juice-particle is-symbol";
    p.dataset.musicSymbol = symbolKey;
    p.innerHTML = MUSIC_JUICE_SVGS[symbolKey];
    p.setAttribute("aria-hidden", "true");
    p.style.setProperty("--jx0", originX);
    p.style.setProperty("--jy0", originY);
    p.style.setProperty("--jx", `${Math.round(spec.x * JUICE_BURST_SCALE)}px`);
    p.style.setProperty("--jy", `${Math.round(spec.y * JUICE_BURST_SCALE)}px`);
    p.style.setProperty("--jr", `${spec.rot}deg`);
    p.style.setProperty("--jdelay", `${spec.delay}ms`);
    p.style.setProperty("--jsize", `${Math.round(spec.size * JUICE_BURST_SCALE)}px`);
    p.style.color = color;
    p.addEventListener?.("animationend", () => {
      if (typeof p.remove === "function") p.remove();
      else if (p.parentNode?.removeChild) p.parentNode.removeChild(p);
    });
    hostEl.appendChild(p);
  });
}

function triggerMascotHappyHop() {
  if (!shouldAnimateJuice()) return;
  const wrap = document.getElementById("stageMascotWrap");
  if (!wrap) return;
  if (!wrap._hopAnimBound) {
    wrap._hopAnimBound = true;
    wrap.addEventListener?.("animationend", () => wrap.classList.remove("mascot-happy-hop"));
  }
  wrap.classList.remove("mascot-happy-hop");
  void wrap.offsetWidth;
  wrap.classList.add("mascot-happy-hop");
}

function triggerCelebrationFeedback(anchorEl, options = {}) {
  if (!shouldAnimateJuice()) return;
  const resolvedPoint = resolveInputPointFromOptions(options);
  const stage = document.getElementById("centralStageCard");
  if (stage) {
    if (!stage._celebrateAnimBound) {
      stage._celebrateAnimBound = true;
      stage.addEventListener?.("animationend", () => stage.classList.remove("stage-celebrate"));
    }
    stage.classList.remove("stage-celebrate");
    void stage.offsetWidth;
    stage.classList.add("stage-celebrate");
  }
  triggerMascotHappyHop();
  if (anchorEl && !options.skipAnchorBurst) {
    spawnJuiceBurst(anchorEl, { intensity: "standard", originY: "24%", inputPoint: resolvedPoint });
  }
  if (options.isMilestone || options.stageBurst || !anchorEl) {
    const burstLayer = document.getElementById("stageBurstLayer");
    spawnJuiceBurst(burstLayer, { intensity: "stage", originX: "50%", originY: "28%", inputPoint: resolvedPoint });
  }
}

function updateStageMascot(mood, options = null) {
  const wrap = document.getElementById("stageMascotWrap");
  if (!wrap) return;
  if (mood !== "happy") wrap.classList.remove("mascot-happy-hop");
  rotateMascotSlot(wrap, mood, false, {
    slot: "stage",
    keepIfSameMood: true,
    ...(options || {})
  });
}

/** Übungen, die über eine Klaviatur beantwortet werden (Solfège, Melodie, Notations-Diktat). */
function isKeyboardAnswerExercise(ex = state.currentExercise) {
  const type = ex?.type;
  if (!type) return false;
  return type === "solfege" || type === "melody" || (isNotationMode(type) && !isNotationChordMode(type) && !isNotationSymbolsMode(type));
}

/**
 * Antwort-Hinweis im unteren Modul: „answer-cue“ (Fragezeichen-Etikett an der Aufforderung) gilt für alle
 * Übungen mit Antwort-Knöpfen, „answer-ready“ (zarte Tönung der Knöpfe) nur, solange eine Antwort erwartet wird.
 * Klaviatur-Übungen bleiben bewusst ohne diese Gestaltung.
 */
function syncAnswerCueState(stageStateClass = null) {
  const view = document.getElementById("viewExercise");
  if (!view) return;
  const ex = state.currentExercise;
  const cue = Boolean(ex) && !isKeyboardAnswerExercise(ex);
  view.classList.toggle("answer-cue", cue);
  if (stageStateClass !== null) {
    view.classList.toggle("answer-ready", cue && stageStateClass === "stage-awaiting" && !isCurrentExerciseSolved(ex));
  }
}

function setCentralStageMode(stageStateClass) {
  const stage = document.getElementById("centralStageCard");
  if (!stage) return;
  syncAnswerCueState(stageStateClass);
  const exType = state.currentExercise?.type;
  if (isNotationSymbolsMode(exType)) {
    stage.className = `central-stage ${stageStateClass} is-notation is-notation-symbols`;
    return;
  }
  if (isNotationMode(exType)) {
    stage.className = `central-stage ${stageStateClass} is-notation`;
    return;
  }
  if (exType === "rhythm-tap") {
    stage.className = `central-stage ${stageStateClass} is-rhythm-tap`;
    return;
  }
  const isKeyboardLayout = exType === "solfege" || exType === "melody";
  stage.className = isKeyboardLayout
    ? `central-stage ${stageStateClass} is-solfege${exType === "melody" ? " is-melody" : ""}`
    : `central-stage ${stageStateClass}`;
}

function resetCentralStage() {
  if (!document.getElementById("centralStageCard")) return;
  const burstLayer = document.getElementById("stageBurstLayer");
  if (burstLayer) burstLayer.innerHTML = "";
  setCentralStageMode("stage-idle");
  resetMascotSlot("stage");
  updateStageMascot("idle", { forceRotate: true });
  const ex = state.currentExercise;
  const mode = ex?.type;
  if (isNotationSymbolsMode(mode)) {
    const lvlLabel = typeof getNotationSymbolsLevelLabel === "function"
      ? getNotationSymbolsLevelLabel(ex?.level || 1)
      : "";
    document.getElementById("stageSubtext").textContent = tr("NOTATIONS-WISSEN", "NOTATION KNOWLEDGE");
    document.getElementById("stageMainText").textContent = lvlLabel || tr("Symbole & Begriffe", "Symbols & Markings");
    document.getElementById("stageFunctionText").textContent = ex?.promptKind === "flow-order"
      ? tr("Folge den Sprung- & Wiederholungszeichen und wähle die Spielreihenfolge.", "Follow the repeats & jump signs and pick the play order.")
      : (ex?.promptKind === "meaning-to-symbol"
          ? tr("Finde das passende Notationssymbol zur Beschreibung oben.", "Pick the matching notation symbol for the description above.")
          : tr("Wähle unten die richtige Bedeutung für dieses Zeichen.", "Pick the right meaning for this symbol below."));
    renderStageStreakUI();
    return;
  }
  if (isNotationMode(mode)) {
    const clefName = getLocalizedNotationClefName(ex?.targetItem?.clefId || ex?.baseClefId || "treble");
    document.getElementById("stageSubtext").textContent = tr("NOTENLESEN", "SIGHT-READING");
    document.getElementById("stageMainText").textContent = clefName;
    document.getElementById("stageFunctionText").textContent = state.exam?.active
      ? (ex?.isChordReading
          ? tr("Lies den Akkord im System und wähle unten das passende Symbol.", "Read the chord on the staff and pick its symbol below.")
          : tr("Lies die Note im System und wähle die Taste unten.", "Read the note on the staff and tap the key below."))
      : (ex?.isChordReading
          ? tr("Lies den ersten Akkord links und wähle das Symbol unten — oder „Überspringen“.", "Read the leftmost chord and pick its symbol below — or tap “Skip”.")
          : tr("Lies die erste Note links — oder tippe „Überspringen“.", "Read the leftmost note — or tap “Skip”."));
    renderStageStreakUI();
    return;
  }
  const readyName = getProfileUserName(true);
  const useNamedReady = Boolean(readyName) && ((readyStagePromptCounter++ % 2) === 0);
  document.getElementById("stageSubtext").textContent = tr("STATUS", "STATUS");
  document.getElementById("stageMainText").textContent = useNamedReady
    ? tf("Bereit, {name}?", "Ready, {name}?", { name: readyName })
    : tr("Bereit", "Ready");
  document.getElementById("stageFunctionText").textContent =
    mode === "rhythm-tap"
      ? tr("Starte unten die Runde und klopfe danach im Takt mit!", "Press Play below and tap along in time!")
      : tr("Drücke unten auf Abspielen", "Press Play below to listen");
  renderStageStreakUI();
}

const AWAITING_STAGE_HEADLINES = [
  { de: "Na, was war’s?", en: "What’s your call?" },
  { de: "Ganz Ohr!",      en: "I’m all ears!" },
  { de: "Was meinst du?", en: "What do you hear?" },
  { de: "Und …?",         en: "Your hunch?" }
];
const AWAITING_STAGE_NAMED_HEADLINES = [
  { de: "Was meinst du, {name}?", en: "What do you hear, {name}?" },
  { de: "Na, was war’s, {name}?", en: "What’s your call, {name}?" },
  { de: "Ganz Ohr, {name}!",      en: "I’m all ears, {name}!" },
  { de: "Dein Tipp, {name}?",     en: "Your pick, {name}?" }
];
const NAMED_CORRECT_STAGE_SUBTEXTS = [
  { de: "RICHTIG, {name}!",        en: "CORRECT, {name}!" },
  { de: "STARK GEHÖRT, {name}!",   en: "GREAT EAR, {name}!" },
  { de: "TREFFER, {name}!",        en: "SPOT ON, {name}!" },
  { de: "SAUBER, {name}!",         en: "NICE ONE, {name}!" }
];
let readyStagePromptCounter = 0;
let awaitingPromptCounter = 0;
let correctStagePersonalizeCounter = 0;
let wrongStagePersonalizeCounter = 0;

function getPersonalizedCorrectStageSubtext(fallbackText) {
  const name = getProfileUserName(true);
  const idx = correctStagePersonalizeCounter++;
  if (!name || state.exam?.active || (idx % 2 !== 0)) return fallbackText;
  const item = NAMED_CORRECT_STAGE_SUBTEXTS[Math.floor(idx / 2) % NAMED_CORRECT_STAGE_SUBTEXTS.length];
  return tf(item.de, item.en, { name: name.toUpperCase() });
}

function getPersonalizedWrongStageMainText(fallbackText) {
  const name = getProfileUserName(true);
  const idx = wrongStagePersonalizeCounter++;
  if (!name || state.exam?.active || (idx % 2 !== 0)) return fallbackText;
  return tf("Vergleichen hilft, {name}", "Compare both, {name}", { name });
}

function getAwaitingStageHint(ex, personalizeHint = false) {
  const type = ex?.type || "";
  const name = personalizeHint ? getProfileUserName(true) : "";
  if (isSingAlongTipsEnabled() && !state.exam?.active && isSingAlongExerciseType(type)) {
    const singPrompt = getSingAlongShortPrompt(type);
    if (singPrompt) return singPrompt;
  }
  if (type === "cadence") {
    return name
      ? tf("{name}, welche Stufe schwingt noch nach? Tippe sie unten an.", "{name}, which chord degree lingers? Tap it below.", { name })
      : tr("Welche Stufe schwingt noch nach? Tippe sie unten an.", "Which chord degree lingers? Tap it below.");
  }
  if (isChordArpeggioMode(type)) {
    return name
      ? tf(
          "{name}, achte vor allem auf die Terzen zwischen den Tönen – welche Akkordfarbe war’s?",
          "{name}, listen especially for the thirds between the notes — which chord color was it?",
          { name },
          {
            fr: "{name}, tends surtout l’oreille aux tierces entre les notes — quelle couleur d’accord était-ce ?",
            es: "{name}, presta especial atención a las terceras entre las notas: ¿qué color de acorde era?",
            it: "{name}, fai attenzione soprattutto alle terze tra le note: che colore di accordo era?",
            pl: "{name}, wsłuchaj się przede wszystkim w tercje między dźwiękami — jaka to barwa akordu?",
            tr: "{name}, özellikle notalar arasındaki üçlülere dikkat et — bu hangi akor rengiydi?",
            uk: "{name}, дослухайся насамперед до терцій між нотами — яке це забарвлення акорду?",
            ur: "{name}، سُروں کے درمیان خاص طور پر تِیسرے سُروں (تھرڈز) پر دھیان دیں — یہ کون سا کارڈ تھا؟",
            ar: "{name}، انتبه بشكل خاص للمسافات الثالثة بين النغمات — ما لون هذا التآلف؟"
          }
        )
      : tr(
          "Achte vor allem auf die Terzen zwischen den Tönen – welche Akkordfarbe war’s?",
          "Listen especially for the thirds between the notes — which chord color was it?",
          {
            fr: "Tends surtout l’oreille aux tierces entre les notes — quelle couleur d’accord était-ce ?",
            es: "Presta especial atención a las terceras entre las notas: ¿qué color de acorde era?",
            it: "Fai attenzione soprattutto alle terze tra le note: che colore di accordo era?",
            pl: "Wsłuchaj się przede wszystkim w tercje między dźwiękami — jaka to barwa akordu?",
            tr: "Özellikle notalar arasındaki üçlülere dikkat et — bu hangi akor rengiydi?",
            uk: "Дослухайся насамперед до терцій між нотами — яке це забарвлення акорду?",
            ur: "سُروں کے درمیان خاص طور پر تِیسرے سُروں (تھرڈز) پر دھیان دیں — یہ کون سا کارڈ تھا؟",
            ar: "انتبه بشكل خاص للمسافات الثالثة بين النغمات — ما لون هذا التآلف؟"
          }
        );
  }
  if (isChordQualityMode(type)) {
    return name
      ? tf("{name}, welche Akkordfarbe ist hängengeblieben? Wähle unten aus.", "{name}, which chord color stayed with you? Pick below.", { name })
      : tr("Welche Akkordfarbe ist hängengeblieben? Wähle unten aus.", "Which chord color stayed with you? Pick below.");
  }
  if (type === "chord-inversions") {
    return name
      ? tf("{name}, welcher Akkordton saß ganz unten im Bass?", "{name}, which chord tone sat lowest in the bass?", { name })
      : tr("Welcher Akkordton saß ganz unten im Bass? Wähle die Umkehrung.", "Which chord tone sat lowest in the bass? Pick the inversion below.");
  }
  if (type.startsWith("interval")) {
    return name
      ? tf("{name}, wie weit fühlte sich der Abstand an? Wähle das Intervall.", "{name}, how wide did that leap feel? Pick the interval below.", { name })
      : tr("Wie weit fühlte sich der Abstand an? Wähle das Intervall.", "How wide did that leap feel? Pick the interval below.");
  }
  if (type === "solfege") {
    return name
      ? tf("{name}, wo sitzt dieser Ton in der Tonleiter? Tippe auf die Taste.", "{name}, where does that pitch sit? Tap the matching key.", { name })
      : tr("Wo sitzt dieser Ton in der Tonleiter? Tippe auf die Taste.", "Where does that pitch sit? Tap the matching key.");
  }
  if (type === "melody") {
    const curStep = (ex.melodyStep || 0) + 1;
    if (ex.melodyStyle === "dictation") {
      return tf("Wie klingt Ton {n} und wie lang ist er? Wähle Tonhöhe & Notenwert.", "Which pitch and note value did Note {n} have? Pick both below.", { n: curStep });
    }
    return tf("Welche Silbe war Ton {n}? Tippe auf die Tasten (oder „Ton nochmal“).", "Which syllable was Note {n}? Tap the keys (or “Replay Tone”).", { n: curStep });
  }
  if (type === "rhythm-dictation") {
    return tf("Welches Muster lag auf Schlag {n}? Wähle unten (oder „Schlag nochmal“).", "Which pattern landed on Beat {n}? Pick below (or “Replay Beat”).", { n: (ex.rhythmStep || 0) + 1 });
  }
  if (type === "rhythm-meter") {
    return name
      ? tf("{name}, wo lag die betonte Eins? Wähle die passende Taktart.", "{name}, where did the heavy beat land? Pick the meter below.", { name })
      : tr("Wo lag die betonte Eins? Wähle die passende Taktart.", "Where did the heavy beat land? Pick the meter below.");
  }
  if (type === "rhythm-groove") {
    return name
      ? tf("{name}, wie hat der Groove für dich geatmet? Wähle unten aus.", "{name}, how did that groove feel? Pick your answer below.", { name })
      : tr("Wie hat der Groove für dich geatmet? Wähle unten aus.", "How did that groove feel? Pick your answer below.");
  }
  if (type === "prod-tone" || type === "prod-eq-noise") {
    return name
      ? tf("{name}, in welchem Band lag der Schwerpunkt? Tippe es unten an.", "{name}, which band carried the focus? Tap it below.", { name })
      : tr("In welchem Band lag der Schwerpunkt? Tippe es unten an.", "Which band carried the focus? Tap it below.");
  }
  if (type.startsWith("modes-")) {
    return name
      ? tf("{name}, welche Klangfarbe schwang da mit? Wähle den Modus.", "{name}, which modal color shone through? Pick the mode below.", { name })
      : tr("Welche Klangfarbe schwang da mit? Wähle den Modus.", "Which modal color shone through? Pick the mode below.");
  }
  return tr("Wähle unten deine Antwort – oder hör’s dir noch einmal an.", "Pick your answer below — or replay anytime.");
}

function showAwaitingAnswerStage(ex = state.currentExercise) {
  if (!document.getElementById("centralStageCard")) return;
  if (!ex || isCurrentExerciseSolved(ex)) return;

  const promptIdx = awaitingPromptCounter;
  const headline = AWAITING_STAGE_HEADLINES[promptIdx % AWAITING_STAGE_HEADLINES.length];
  awaitingPromptCounter += 1;
  const name = getProfileUserName(true);
  const useNamedHeadline = Boolean(name) && !state.exam?.active && (promptIdx % 2 === 0);
  const useNamedHint = Boolean(name) && !state.exam?.active && !useNamedHeadline && (promptIdx % 4 === 1);
  const namedHeadline = AWAITING_STAGE_NAMED_HEADLINES[Math.floor(promptIdx / 2) % AWAITING_STAGE_NAMED_HEADLINES.length];

  setCentralStageMode("stage-awaiting");
  updateStageMascot("awaiting");

  let subtext = tr("DEIN TIPP", "YOUR PICK");
  if (ex.type === "melody") {
    const tot = ex.melodySlots?.length || 4;
    subtext = tf("TON {n} VON {tot} • DEIN TIPP", "NOTE {n} OF {tot} • YOUR PICK", { n: (ex.melodyStep || 0) + 1, tot });
  } else if (ex.type === "rhythm-dictation") {
    subtext = tf("SCHLAG {n} VON 4 • DEIN TIPP", "BEAT {n} OF 4 • YOUR PICK", { n: (ex.rhythmStep || 0) + 1 });
  }

  document.getElementById("stageSubtext").textContent = subtext;
  document.getElementById("stageMainText").textContent = useNamedHeadline
    ? tf(namedHeadline.de, namedHeadline.en, { name })
    : tr(headline.de, headline.en);
  document.getElementById("stageFunctionText").textContent = getAwaitingStageHint(ex, useNamedHint);
}

function completePromptPlayback(ex = state.currentExercise) {
  stopPlayback({ preserveStage: true });
  if (typeof isExerciseTutorialRunning === "function" && isExerciseTutorialRunning()) {
    onExerciseTutorialPlaybackEnded(ex);
  } else if (state.listenOnly?.active) {
    handleListenOnlyPromptEnded(ex);
  } else if (ex && state.currentExercise === ex && !isCurrentExerciseSolved(ex)) {
    if (shouldRunHumPause(ex)) startHumPause(ex);
    else showAwaitingAnswerStage(ex);
  }
}

