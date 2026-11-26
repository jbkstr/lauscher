// =====================================================
// VORMACHEN-DEMO / INTERAKTIVER TUTORIAL-MODUS
// Zeigt pro Übungsmechanik eine kompakte Live-Beispielrunde
// mit Audio, Fokus-Spotlight und visueller Antwort-Hervorhebung.
// =====================================================

const _exTutorial = {
  active: false,
  phase: "idle", // "idle" | "intro" | "listen" | "demo" | "done"
  token: 0,
  groupId: null,
  timers: [],
  autoPlayTimer: null,
  spotlightEls: [],
  markedEls: [],
  demoEx: null
};

const TUTORIAL_AUTO_START_DELAY_MS = 950;

function isExerciseTutorialsEnabled() {
  return state?.profile?.exerciseTutorials !== false;
}

function getSeenTutorialSet() {
  const list = Array.isArray(state?.profile?.seenTutorials) ? state.profile.seenTutorials : [];
  return new Set(list);
}

function markTutorialGroupSeen(groupId) {
  if (!groupId) return;
  if (!state.profile) state.profile = createDefaultProfile();
  const list = Array.isArray(state.profile.seenTutorials) ? [...state.profile.seenTutorials] : [];
  if (!list.includes(groupId)) {
    list.push(groupId);
    state.profile.seenTutorials = list.slice(0, 32);
    saveUserProfile(state.profile);
  }
}

function setExerciseTutorialsPreference(enabled) {
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile.exerciseTutorials = Boolean(enabled);
  saveUserProfile(state.profile);
  syncTutorialSettingsControls();
}

function resetSeenExerciseTutorials() {
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile.seenTutorials = [];
  state.profile.exerciseTutorials = true;
  saveUserProfile(state.profile);
  syncTutorialSettingsControls();
  if (typeof showAppToast === "function") {
    showAppToast(
      tr("Alle Übungs-Einführungen wurden zurückgesetzt.", "All exercise tutorials have been reset."),
      "info"
    );
  }
}

function syncTutorialSettingsControls() {
  const on = isExerciseTutorialsEnabled();
  document.querySelectorAll("[data-ex-tutorials]").forEach(btn => {
    const active = (btn.dataset.exTutorials === "on") === on;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

function getTutorialGroupId(ex = state?.currentExercise) {
  if (!ex || !ex.type) return null;
  const type = String(ex.type);
  if (type === "cadence") return "cadence";
  if (type === "solfege") return "solfege";
  if (type === "melody") return ex.melodyStyle === "dictation" ? "melody-dictation" : "melody";
  if (type === "rhythm-dictation") return "rhythm-dictation";
  if (type === "rhythm-tap") return "rhythm-tap";
  if (type === "rhythm-meter" || type === "rhythm-groove") return "rhythm-choice";
  if (isNotationMode(type)) {
    if (isNotationSymbolsMode(type)) return null;
    return ex.isChordReading ? "notation-chords" : "notation-keys";
  }
  if (type === "prod-tone" || type === "prod-eq-noise") return "production";
  if (type.startsWith("modes-")) return "modes";
  if (type === "interval-chords" || type === "chord-inversions" || isChordArpeggioMode(type)) return "chord";
  if (type.startsWith("interval-")) return "interval";
  return null;
}

function getTutorialMeta(groupId, ex) {
  switch (groupId) {
    case "cadence":
      return {
        title: tr("So funktioniert: Kadenz", "How it works: Cadence"),
        intro: tr(
          "Höre die 4 Takte der Kadenz, erkenne die fehlende Akkordstufe und tippe sie unten an.",
          "Listen to the 4-bar cadence, spot the missing chord degree, and tap it below."
        ),
        listen: tr(
          "Hör zu: Die 4 Takte laufen oben mit – achte besonders auf den markierten Zieltakt.",
          "Listen closely: the 4 bars play at the top — focus on the highlighted target bar."
        ),
        answerPrompt: (lbl) => tf(
          "Das war {lbl}! Tippe genau auf diese Kachel, um zu lösen.",
          "That was {lbl}! Tap this tile to answer.",
          { lbl }
        )
      };
    case "interval":
      return {
        title: tr("So funktioniert: Intervalle", "How it works: Intervals"),
        intro: tr(
          "Vergleiche den Abstand zwischen den beiden Tönen und wähle unten das passende Intervall.",
          "Compare the distance between the two notes and pick the matching interval below."
        ),
        listen: tr(
          "Hör zu: Erst der Ausgangston, dann der Zielton – achte auf den Abstand dazwischen.",
          "Listen: notice the distance between the reference note and the target note."
        ),
        answerPrompt: (lbl) => tf(
          "Das gesuchte Intervall ist {lbl} – die passende Kachel leuchtet unten auf.",
          "The target interval is {lbl} — the matching tile lights up below.",
          { lbl }
        )
      };
    case "chord":
      return {
        title: tr("So funktioniert: Akkorde", "How it works: Chords"),
        intro: tr(
          "Höre dir den Klang oder die Lage des Akkords an und wähle unten den passenden Typ.",
          "Listen to the chord quality or inversion and select the matching tile below."
        ),
        listen: tr(
          "Hör zu: Achte auf den Gesamtklang (hell, dunkel, gespannt) und den tiefsten Ton.",
          "Listen: focus on the overall color (bright, dark, tense) and the bass note."
        ),
        answerPrompt: (lbl) => tf(
          "Dieser Akkord ist {lbl} – wähle unten die markierte Kachel.",
          "This chord is {lbl} — choose the highlighted tile below.",
          { lbl }
        )
      };
    case "modes":
      return {
        title: tr("So funktioniert: Tonleitern & Modi", "How it works: Scales & Modes"),
        intro: tr(
          "Der Grundton gibt dir Halt – erkenne am typischen Charakterton den Modus und tippe ihn an.",
          "The root gives you an anchor — spot the mode by its signature color and tap it below."
        ),
        listen: tr(
          "Hör zu: Achte auf die besondere Klangfarbe über dem Grundton.",
          "Listen: focus on the characteristic color tone over the root."
        ),
        answerPrompt: (lbl) => tf(
          "Diese Klangfarbe gehört zu {lbl} – tippe unten auf die hervorgehobene Kachel.",
          "That color belongs to {lbl} — tap the highlighted tile below.",
          { lbl }
        )
      };
    case "solfege":
      return {
        title: tr("So funktioniert: Solfège", "How it works: Solfège"),
        intro: tr(
          "Erst hörst du die Tonart-Kadenz, dann einen einzelnen Zielton – tippe seine Taste auf der Klaviatur.",
          "First you hear the key cadence, then one target note — tap its key on the keyboard."
        ),
        listen: tr(
          "Hör zu: Die Kadenz verankert Do – merk dir danach genau den einzelnen Zielton.",
          "Listen: the cadence anchors Do — then focus on the single target pitch."
        ),
        answerPrompt: (lbl) => tf(
          "Das war {lbl}! Nach dem Antippen löst sich der Ton musikalisch zu Do auf.",
          "That was {lbl}! After tapping, the note resolves musically back to Do.",
          { lbl }
        )
      };
    case "melody":
      return {
        title: tr("So funktioniert: Melodie", "How it works: Melody"),
        intro: tr(
          "Höre die kurze Melodie und spiele sie anschließend Ton für Ton auf der Klaviatur nach.",
          "Listen to the short melody, then play it back note by note on the keyboard."
        ),
        listen: tr(
          "Hör zu: Die Töne laufen oben der Reihe nach durch.",
          "Listen: follow the melody slots along the top."
        ),
        answerPrompt: () => tr(
          "Jetzt wird Ton für Ton auf der Klaviatur nachgespielt – jede grüne Taste löst den nächsten Platz.",
          "Now play back note by note on the keyboard — each green key fills the next slot."
        )
      };
    case "melody-dictation":
      return {
        title: tr("So funktioniert: Melodie-Diktat", "How it works: Melody Dictation"),
        intro: tr(
          "Wähle für jeden Ton der Melodie sowohl die richtige Klaviatur-Taste als auch den Notenwert.",
          "For each note of the melody, pick both the right keyboard key and its rhythmic note value."
        ),
        listen: tr(
          "Hör zu: Merke dir Melodieverlauf und Rhythmus der Phrase.",
          "Listen: memorize both the pitch contour and the rhythm of the phrase."
        ),
        answerPrompt: () => tr(
          "Pro Platz erst Taste antippen, dann den passenden Notenwert wählen – schon rückt der nächste Ton nach.",
          "For each slot, tap the key and the matching note value to advance."
        )
      };
    case "rhythm-dictation":
      return {
        title: tr("So funktioniert: Rhythmus-Diktat", "How it works: Rhythm Dictation"),
        intro: tr(
          "Höre den 4-Schlag-Rhythmus und setze unten für jede Zählzeit das passende Notenbild ein.",
          "Listen to the 4-beat rhythm and pick the matching rhythm pattern for each beat below."
        ),
        listen: tr(
          "Hör zu: Nach dem Einzähler erklingt das Muster über 4 Zählzeiten.",
          "Listen: after the count-in, the 4-beat pattern plays."
        ),
        answerPrompt: () => tr(
          "Jetzt werden die 4 Zählzeiten nacheinander über die Rhythmus-Kacheln unten eingetragen.",
          "Now each of the 4 beats is filled in step by step using the rhythm tiles below."
        )
      };
    case "rhythm-tap":
      return {
        title: tr("So funktioniert: Rhythmus klopfen", "How it works: Rhythm Tap"),
        intro: tr(
          "Nach dem Einzähler hörst du das Muster – danach klopfst du es exakt im Takt auf das Pad.",
          "After the count-in you hear the pattern — then tap it right in time on the pad."
        ),
        listen: tr(
          "Hör zu & schau aufs Pad: Erst der Einzähler, dann blitzt das Pad genau auf jedem Ziel-Schlag auf.",
          "Listen & watch the pad: after the count-in, the pad flashes on every target beat."
        ),
        answerPrompt: () => tr(
          "Schau genau hin: Immer wenn das Pad grün aufblitzt, wird geklopft!",
          "Watch closely: tap the pad right whenever it flashes green!"
        )
      };
    case "rhythm-choice":
      return {
        title: tr("So funktioniert: Taktart & Groove", "How it works: Meter & Groove"),
        intro: tr(
          "Achte auf den betonten ersten Schlag und das Grundmuster – wähle dann unten die passende Kachel.",
          "Listen for the accented beat one and the feel — then pick the matching tile below."
        ),
        listen: tr(
          "Hör zu: Zähle leise bis zur nächsten betonten Eins mit.",
          "Listen: quietly count along until the next accented beat one."
        ),
        answerPrompt: (lbl) => tf(
          "Das gehörte Muster ist {lbl} – tippe unten auf diese Kachel.",
          "That pattern is {lbl} — tap this tile below.",
          { lbl }
        )
      };
    case "notation-keys":
      return {
        title: tr("So funktioniert: Notenlesen", "How it works: Sight-Reading"),
        intro: tr(
          "Lies immer die vorderste markierte Note links im Notensystem ab und tippe die passende Taste.",
          "Always read the leftmost highlighted note on the staff and tap its key on the keyboard."
        ),
        listen: tr(
          "Schau auf die erste Note links im System (inklusive Vorzeichen).",
          "Look at the leftmost note on the staff (including any key signature or accidental)."
        ),
        answerPrompt: (lbl) => tf(
          "Diese Note ist {lbl} – tippe die grün markierte Taste, dann rückt die nächste Note nach.",
          "This note is {lbl} — tap the green key and the next note slides in.",
          { lbl }
        )
      };
    case "notation-chords":
      return {
        title: tr("So funktioniert: Akkorde lesen", "How it works: Chord Reading"),
        intro: tr(
          "Lies den vordersten Akkord im Notensystem von unten nach oben und wähle die passende Kachel.",
          "Read the leftmost chord on the staff from bottom to top and pick the matching tile."
        ),
        listen: tr(
          "Schau auf den markierten Akkord links – Grundton, Terz und Klangfarbe bestimmen die Antwort.",
          "Inspect the highlighted chord on the left — root, third, and intervals determine the answer."
        ),
        answerPrompt: (lbl) => tf(
          "Der notierte Akkord ist {lbl} – tippe unten auf die passende Kachel.",
          "The written chord is {lbl} — tap the matching tile below.",
          { lbl }
        )
      };
    case "production":
      return {
        title: tr("So funktioniert: Frequenz- & EQ-Training", "How it works: Frequency & EQ"),
        intro: ex?.type === "prod-eq-noise"
          ? tr(
              "Vergleiche das neutrale Rauschen (Flat) mit dem EQ-Boost und wähle das angehobene Frequenzband.",
              "Compare the flat noise against the EQ boost and pick the boosted frequency band."
            )
          : tr(
              "Höre die reine Tonhöhe des Sinustons und ordne sie unten der passenden Frequenz zu.",
              "Listen to the pure sine pitch and match it to its frequency tile below."
            ),
        listen: ex?.type === "prod-eq-noise"
          ? tr(
              "Hör zu: Erst neutrales Rauschen (Flat), dann schaltet der EQ-Boost dazu.",
              "Listen: first flat noise, then the EQ boost switches in."
            )
          : tr(
              "Hör zu: Präge dir die Höhe des Sinustons ein.",
              "Listen: focus on the exact pitch of the sine wave."
            ),
        answerPrompt: (lbl) => tf(
          "Die gesuchte Frequenz ist {lbl} – tippe unten auf die hervorgehobene Kachel.",
          "The target frequency is {lbl} — tap the highlighted tile below.",
          { lbl }
        )
      };
    default:
      return {
        title: tr("So funktioniert diese Übung", "How this exercise works"),
        intro: tr(
          "Höre die Aufgabe an und wähle anschließend unten die passende Antwort.",
          "Listen to the prompt and select the matching answer below."
        ),
        listen: tr("Hör genau hin – das Beispiel läuft gerade.", "Listen closely — the example is playing."),
        answerPrompt: (lbl) => tf("Die Lösung ist {lbl}.", "The answer is {lbl}.", { lbl })
      };
  }
}

function isExerciseTutorialActive() {
  return Boolean(_exTutorial.active);
}

function isExerciseTutorialRunning() {
  return Boolean(_exTutorial.active && (_exTutorial.phase === "listen" || _exTutorial.phase === "demo"));
}

function clearTutorialTimers() {
  _exTutorial.timers.forEach(id => clearTimeout(id));
  _exTutorial.timers = [];
  if (_exTutorial.autoPlayTimer !== null) {
    clearTimeout(_exTutorial.autoPlayTimer);
    _exTutorial.autoPlayTimer = null;
  }
}

function scheduleTutorialTimer(fn, delayMs, token = _exTutorial.token) {
  const id = setTimeout(() => {
    _exTutorial.timers = _exTutorial.timers.filter(t => t !== id);
    if (!_exTutorial.active || _exTutorial.token !== token || state.currentView !== "exercise") return;
    fn();
  }, Math.max(0, Math.round(delayMs)));
  _exTutorial.timers.push(id);
  return id;
}

/**
 * Übungstyp-spezifisches Timing-Profil (alle Werte in ms):
 * - readLeadMs:        ruhige Lesezeit für Schritt 1, bevor der erste Ton erklingt
 * - postAudioPauseMs:  Auskling- & Denk-Pause nach Audio-Ende vor Schritt 2
 * - answerLeadMs:      Lesezeit in Schritt 2 vor Start der Animation / Bestätigung
 * - stepMs:            Abstand zwischen Einzelschritten bei Mehr-Schritt-Übungen
 */
function getTutorialTimingProfile(groupId, ex) {
  switch (groupId) {
    case "cadence":
      return { readLeadMs: 2400, postAudioPauseMs: 1300, answerLeadMs: 900, stepMs: 0 };
    case "interval":
      return { readLeadMs: 2300, postAudioPauseMs: 1300, answerLeadMs: 900, stepMs: 0 };
    case "chord":
      return { readLeadMs: 2300, postAudioPauseMs: 1300, answerLeadMs: 900, stepMs: 0 };
    case "modes":
      return { readLeadMs: 2400, postAudioPauseMs: 1300, answerLeadMs: 900, stepMs: 0 };
    case "solfege":
      return { readLeadMs: 2500, postAudioPauseMs: 1300, answerLeadMs: 1100, stepMs: 0 };
    case "melody":
      return { readLeadMs: 2300, postAudioPauseMs: 1300, answerLeadMs: 2000, stepMs: 1050 };
    case "melody-dictation":
      return { readLeadMs: 2600, postAudioPauseMs: 1300, answerLeadMs: 2300, stepMs: 1450 };
    case "rhythm-dictation":
      return { readLeadMs: 2500, postAudioPauseMs: 1300, answerLeadMs: 2100, stepMs: 1100 };
    case "rhythm-tap":
      return { readLeadMs: 2600, postAudioPauseMs: 1100, answerLeadMs: 2200, stepMs: 0 };
    case "rhythm-choice":
      return { readLeadMs: 2300, postAudioPauseMs: 1300, answerLeadMs: 900, stepMs: 0 };
    case "notation-keys":
      return { readLeadMs: 2300, postAudioPauseMs: 2000, answerLeadMs: 900, stepMs: 0 };
    case "notation-chords":
      return { readLeadMs: 2500, postAudioPauseMs: 2300, answerLeadMs: 900, stepMs: 0 };
    case "production":
      return ex?.type === "prod-eq-noise"
        ? { readLeadMs: 2600, postAudioPauseMs: 1100, answerLeadMs: 900, stepMs: 0 }
        : { readLeadMs: 2400, postAudioPauseMs: 1300, answerLeadMs: 900, stepMs: 0 };
    default:
      return { readLeadMs: 2300, postAudioPauseMs: 1300, answerLeadMs: 900, stepMs: 0 };
  }
}

function setTutorialBackdropVisible(visible) {
  document.getElementById("exerciseTutorialBackdrop")?.classList.toggle("hidden", !visible);
}

/** Mitsing-Karte an den Tutorial-Zustand anpassen (offen → zu, beendet → wieder erlaubt). */
function syncSingAlongForTutorial(starting) {
  if (starting && typeof deferSingAlongIntroForTutorial === "function") {
    deferSingAlongIntroForTutorial(_exTutorial.demoEx || state?.currentExercise);
  }
  if (typeof syncSingAlongUI === "function") syncSingAlongUI();
  if (typeof queueFitExerciseLayout === "function") queueFitExerciseLayout(true);
}

function clearTutorialSpotlights() {
  _exTutorial.spotlightEls.forEach(el => el?.classList?.remove("tutorial-spotlight"));
  _exTutorial.spotlightEls = [];
  _exTutorial.markedEls.forEach(el => {
    el?.classList?.remove("tutorial-target-pulse", "btn-correct", "key-correct", "is-hit", "bar-active", "tile-selected-pulse");
  });
  _exTutorial.markedEls = [];
  document.getElementById("viewExercise")?.classList.remove("is-tutorial-running");
}

function setTutorialSpotlight(elements) {
  _exTutorial.spotlightEls.forEach(el => el?.classList?.remove("tutorial-spotlight"));
  _exTutorial.spotlightEls = [];
  const list = (Array.isArray(elements) ? elements : [elements]).filter(Boolean);
  list.forEach(el => {
    el.classList.add("tutorial-spotlight");
    _exTutorial.spotlightEls.push(el);
  });
}

function markTutorialTargetEl(el, extraClasses = []) {
  if (!el) return;
  el.classList.add("tutorial-target-pulse", ...extraClasses);
  if (!_exTutorial.markedEls.includes(el)) {
    _exTutorial.markedEls.push(el);
  }
}

function updateTutorialCardUI({ badge, title, text, mood = "idle", compact = false, position = "center", actions = [] }) {
  const card = document.getElementById("exerciseTutorialCard");
  if (!card) return;
  setTutorialBackdropVisible(true);
  card.classList.remove("hidden", "is-compact", "is-pos-top", "is-pos-bottom", "is-pos-center");
  if (compact) card.classList.add("is-compact");
  card.classList.add(position === "top" ? "is-pos-top" : (position === "bottom" ? "is-pos-bottom" : "is-pos-center"));

  const badgeEl = document.getElementById("exTutorialStepBadge");
  const titleEl = document.getElementById("exTutorialTitle");
  const textEl = document.getElementById("exTutorialText");
  const actionsEl = document.getElementById("exTutorialActions");
  const mascotEl = document.getElementById("exTutorialMascot");

  if (badgeEl) badgeEl.textContent = badge || "";
  if (titleEl) titleEl.textContent = title || "";
  if (textEl) textEl.textContent = text || "";

  if (mascotEl && typeof rotateMascotSlot === "function") {
    rotateMascotSlot(mascotEl, mood, false, { slot: "tutorial", keepIfSameMood: true });
  }

  if (actionsEl) {
    actionsEl.innerHTML = "";
    actions.forEach(act => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = act.cls || "ex-tutorial-btn";
      btn.textContent = act.label;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        act.onClick?.();
      });
      actionsEl.appendChild(btn);
    });
  }
}

function syncExerciseDemoButtonUI() {
  const btn = document.getElementById("exerciseDemoBtn");
  if (!btn) return;
  const hide = Boolean(state.exam?.active) || !getTutorialGroupId();
  btn.classList.toggle("hidden", hide);
  btn.classList.toggle("is-active", isExerciseTutorialActive());
}

function stopExerciseTutorial(options = {}) {
  const wasRunning = isExerciseTutorialRunning();
  const hadCard = _exTutorial.active;
  _exTutorial.token += 1;
  _exTutorial.active = false;
  _exTutorial.phase = "idle";
  _exTutorial.demoEx = null;
  clearTutorialTimers();
  clearTutorialSpotlights();
  setTutorialBackdropVisible(false);

  const card = document.getElementById("exerciseTutorialCard");
  card?.classList.add("hidden");
  syncExerciseDemoButtonUI();
  if (hadCard) syncSingAlongForTutorial(false);

  if ((wasRunning || hadCard) && !options.keepPlayback) {
    stopPlayback();
  }
  if (options.refreshExercise && hadCard && state.currentView === "exercise" && !state.exam?.active) {
    generateExercise();
    const freshEx = state.currentExercise;
    if (options.autoPlay && freshEx && !isNotationMode(freshEx.type)) {
      if (typeof ensureAudioReady === "function") ensureAudioReady();
      _exTutorial.autoPlayTimer = setTimeout(() => {
        _exTutorial.autoPlayTimer = null;
        if (
          state.currentView !== "exercise"
          || state.exam?.active
          || state.listenOnly?.active
          || state.isPlaying
          || _exTutorial.active
          || state.currentExercise !== freshEx
        ) {
          return;
        }
        playSequence();
      }, TUTORIAL_AUTO_START_DELAY_MS);
    }
  }
}

/**
 * Nutzer schließt das Tutorial (✕, Escape, Android-„Zurück“): Einführung gilt als gesehen,
 * nach einer Vorführung gibt es eine frische Aufgabe.
 */
function dismissExerciseTutorialByUser() {
  if (!isExerciseTutorialActive()) return false;
  const shouldRefresh = _exTutorial.phase === "demo" || _exTutorial.phase === "done";
  if (_exTutorial.groupId && _exTutorial.phase === "intro") {
    markTutorialGroupSeen(_exTutorial.groupId);
  }
  stopExerciseTutorial({ refreshExercise: shouldRefresh });
  return true;
}

function maybeOfferExerciseTutorial(ex = state?.currentExercise) {
  if (!ex || state.currentView !== "exercise") return false;
  if (state.exam?.active || state.listenOnly?.active) return false;
  if (!isExerciseTutorialsEnabled()) return false;
  const groupId = getTutorialGroupId(ex);
  if (!groupId || getSeenTutorialSet().has(groupId)) return false;

  openExerciseTutorialIntro(ex, groupId);
  return true;
}

function openExerciseTutorialIntro(ex = state?.currentExercise, explicitGroupId = null) {
  if (!ex || state.currentView !== "exercise" || state.exam?.active) return;
  const groupId = explicitGroupId || getTutorialGroupId(ex);
  if (!groupId) return;

  stopExerciseTutorial({ keepPlayback: false });
  if (typeof closeTransientPopovers === "function") closeTransientPopovers();

  _exTutorial.active = true;
  _exTutorial.phase = "intro";
  _exTutorial.groupId = groupId;
  _exTutorial.demoEx = ex;
  syncExerciseDemoButtonUI();
  syncSingAlongForTutorial(true);

  const meta = getTutorialMeta(groupId, ex);
  updateTutorialCardUI({
    badge: tr("NEUE ÜBUNG • VORMACHEN", "NEW EXERCISE • WALKTHROUGH"),
    title: meta.title,
    text: meta.intro,
    mood: "idle",
    compact: false,
    position: "center",
    actions: [
      {
        label: tr("▶ Beispiel vormachen", "▶ Show me once"),
        cls: "ex-tutorial-btn is-primary",
        onClick: () => runExerciseTutorialDemo()
      },
      {
        label: tr("Direkt starten", "Start right away"),
        cls: "ex-tutorial-btn is-secondary",
        onClick: () => {
          markTutorialGroupSeen(groupId);
          stopExerciseTutorial();
        }
      },
      {
        label: tr("Nicht mehr automatisch zeigen", "Don’t show automatically"),
        cls: "ex-tutorial-btn is-ghost",
        onClick: () => {
          setExerciseTutorialsPreference(false);
          stopExerciseTutorial();
        }
      }
    ]
  });
}

async function startExerciseTutorialManually() {
  const ex = state?.currentExercise;
  if (!ex || state.currentView !== "exercise" || state.exam?.active) return;
  if (isExerciseTutorialActive()) {
    stopExerciseTutorial({ refreshExercise: _exTutorial.phase === "demo" || _exTutorial.phase === "done" });
    return;
  }
  await runExerciseTutorialDemo();
}

function getTutorialTargetDisplayLabel(ex, groupId) {
  if (!ex) return "";
  if (groupId === "solfege") {
    return getSolfegeDisplayLabel(ex.targetItem?.syllable || "Do");
  }
  if (groupId === "notation-keys") {
    return ex.targetItem?.displayName || ex.targetItem?.letter || "";
  }
  if (groupId === "notation-chords") {
    return ex.targetItem?.displayName || ex.targetItem?.label || "";
  }
  const item = ex.targetItem;
  if (!item) return "";
  const sym = item.roman || item.symbol || item.short || "";
  const lbl = item.label || item.name || "";
  if (sym && lbl && sym !== lbl) return `${sym} (${lbl})`;
  return sym || lbl || "";
}

async function runExerciseTutorialDemo(options = {}) {
  if (state.currentView !== "exercise" || state.exam?.active) return;

  if (state.listenOnly?.active && typeof setListenOnlyMode === "function") {
    setListenOnlyMode(false, { keepPlayback: false });
  }
  if (typeof closeTransientPopovers === "function") closeTransientPopovers();
  if (typeof cancelHumPause === "function") cancelHumPause(false);

  clearTutorialTimers();
  clearTutorialSpotlights();
  stopPlayback();

  // Falls aktuelle Aufgabe schon gelöst ist oder explizit ein neues Beispiel angefordert wurde
  if (options.fresh || !state.currentExercise || isCurrentExerciseSolved(state.currentExercise)) {
    generateExercise();
  }
  const ex = state.currentExercise;
  const groupId = getTutorialGroupId(ex);
  if (!ex || !groupId) return;

  _exTutorial.token += 1;
  const token = _exTutorial.token;
  _exTutorial.active = true;
  _exTutorial.phase = "listen";
  _exTutorial.groupId = groupId;
  _exTutorial.demoEx = ex;
  document.getElementById("viewExercise")?.classList.add("is-tutorial-running");
  syncExerciseDemoButtonUI();
  syncSingAlongForTutorial(true);

  const meta = getTutorialMeta(groupId, ex);
  updateTutorialCardUI({
    badge: tr("SCHRITT 1 / 2 · ZUHÖREN", "STEP 1 / 2 · LISTEN"),
    title: meta.title,
    text: meta.listen,
    mood: "listening",
    compact: true,
    position: "bottom",
    actions: [
      {
        label: tr("Abbrechen", "Cancel"),
        cls: "ex-tutorial-btn is-secondary",
        onClick: () => stopExerciseTutorial({ refreshExercise: true })
      }
    ]
  });

  // Oberes Modul komplett im Spotlight hervorheben (alles andere ist abgedunkelt)
  setTutorialSpotlight(document.getElementById("exerciseModuleCard"));

  await ensureAudioReady();
  if (!_exTutorial.active || _exTutorial.token !== token || state.currentView !== "exercise") return;

  const timing = getTutorialTimingProfile(groupId, ex);
  // Entspannter Lese-Vorlauf je Übungstyp, damit der Nutzer den Hinweis in Ruhe liest, bevor Audio startet
  scheduleTutorialTimer(async () => {
    // Sonderfall 1: Rhythmus-Tap (erst Muster im Modul hören, dann nach Lese-Pause live aufs Pad schauen)
    if (groupId === "rhythm-tap") {
      runRhythmTapTutorialDemo(ex, meta, timing, token);
      return;
    }

    // Sonderfall 2: Studio EQ-Vergleich (Flat -> EQ-Boost -> Antwort zeigen)
    if (ex.type === "prod-eq-noise") {
      runProdEqTutorialDemo(ex, meta, timing, token);
      return;
    }

    // Sonderfall 3: Notenlesen (linke Note / Akkord anspielen -> in Ruhe im System ablesen -> Antwort)
    if (groupId === "notation-keys" || groupId === "notation-chords") {
      const playNotes = getNotationPlayNotes(ex.targetItem);
      if (playNotes && playNotes.length) {
        audioEngine.playStep(playNotes, ex.isChordReading ? 1.25 : 1.0, null, "interval");
      }
      scheduleTutorialTimer(() => {
        runExerciseTutorialAnswerPhase(ex, groupId, meta, token);
      }, timing.postAudioPauseMs, token);
      return;
    }

    // Standardfall: reguläre Audio-Sequenz der Übung abspielen; Ende ruft onExerciseTutorialPlaybackEnded(ex)
    await playSequence();
  }, timing.readLeadMs, token);
}

function onExerciseTutorialPlaybackEnded(ex) {
  if (!_exTutorial.active || _exTutorial.phase !== "listen") return;
  if (!ex || ex !== _exTutorial.demoEx) return;
  const token = _exTutorial.token;
  const groupId = _exTutorial.groupId;
  const meta = getTutorialMeta(groupId, ex);
  const timing = getTutorialTimingProfile(groupId, ex);
  scheduleTutorialTimer(() => {
    runExerciseTutorialAnswerPhase(ex, groupId, meta, token);
  }, timing.postAudioPauseMs, token);
}

function buildTutorialDoneActions(groupId) {
  return [
    {
      label: tr("▶ Jetzt selbst probieren", "▶ Try it myself"),
      cls: "ex-tutorial-btn is-primary",
      onClick: () => stopExerciseTutorial({ refreshExercise: true, autoPlay: true })
    },
    {
      label: tr("Nochmal ansehen", "Watch again"),
      cls: "ex-tutorial-btn is-secondary",
      onClick: () => runExerciseTutorialDemo({ fresh: true })
    }
  ];
}

function setTutorialCardActionsOnly(actions) {
  const actionsEl = document.getElementById("exTutorialActions");
  if (!actionsEl) return;
  actionsEl.innerHTML = "";
  actions.forEach(act => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = act.cls || "ex-tutorial-btn";
    btn.textContent = act.label;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      act.onClick?.();
    });
    actionsEl.appendChild(btn);
  });
}

function runRhythmTapTutorialDemo(ex, meta, timing, token) {
  const beatMs = 60000 / (state.activeBpm || 90);
  const beatsPerBar = ex.beatsPerBar || 4;
  const barMs = beatsPerBar * beatMs;
  const padBtn = document.getElementById("rhythmTapPadBtn");
  const padTitle = document.getElementById("rhythmPadTitle");
  const padSub = document.getElementById("rhythmPadSub");

  const hitDelaysMs = [];
  (ex.tapSlots || []).forEach((slot, beatIdx) => {
    (slot.cell?.offsets || []).forEach(off => {
      hitDelaysMs.push({ relMs: Math.round((beatIdx + off) * beatMs), beatIdx });
    });
  });

  // Schritt 1: 1 Takt Vorzähler + 1 Takt Muster zum Zuhören (Fokus auf oberem Modul)
  const listenEvents = [];
  for (let b = 0; b < beatsPerBar; b++) {
    listenEvents.push([Math.round(b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.92 : 0.7]);
    listenEvents.push([Math.round(barMs + b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.56 : 0.36]);
  }
  hitDelaysMs.forEach(({ relMs }) => {
    listenEvents.push([Math.round(barMs + relMs), "clave", 0.96]);
  });
  audioEngine.playRhythmSequence(listenEvents, audioEngine.getAudioTime() + 0.05);

  for (let b = 0; b < beatsPerBar; b++) {
    scheduleTutorialTimer(() => {
      if (padTitle) padTitle.textContent = tf("Vorzähler: {n}", "Count-in: {n}", { n: b + 1 });
      if (padSub) padSub.textContent = tr("Erst den Puls aufnehmen…", "Feel the pulse first…");
    }, 50 + Math.round(b * beatMs), token);

    scheduleTutorialTimer(() => {
      for (let i = 0; i < beatsPerBar; i++) {
        document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === b);
      }
    }, 50 + Math.round(barMs + b * beatMs), token);
  }

  // Nach Ende von Schritt 1: Pause, dann Schritt 2 mit echtem Lese-Vorlauf, BEVOR das Pad blinkt!
  scheduleTutorialTimer(() => {
    for (let i = 0; i < beatsPerBar; i++) {
      document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
    }
    _exTutorial.phase = "demo";
    setTutorialSpotlight(document.getElementById("rhythmTapPadWrap") || padBtn);
    updateTutorialCardUI({
      badge: tr("SCHRITT 2 / 2 · MITKLOPFEN", "STEP 2 / 2 · TAP IN TIME"),
      title: meta.title,
      text: meta.answerPrompt(),
      mood: "happy",
      compact: false,
      position: "top",
      actions: [
        {
          label: tr("Abbrechen", "Cancel"),
          cls: "ex-tutorial-btn is-secondary",
          onClick: () => stopExerciseTutorial({ refreshExercise: true })
        }
      ]
    });
    if (padTitle) padTitle.textContent = tr("Jetzt im Takt klopfen!", "Tap in time now!");
    if (padSub) padSub.textContent = tr("Jedes grüne Aufblitzen = 1 Tippen", "Every green flash = 1 tap");

    // Nach dem Lese-Vorlauf für Schritt 2 spielt der Demo-Takt mit grün aufblitzendem Pad
    scheduleTutorialTimer(() => {
      const tapDemoEvents = [];
      for (let b = 0; b < beatsPerBar; b++) {
        tapDemoEvents.push([Math.round(b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.56 : 0.36]);
      }
      hitDelaysMs.forEach(({ relMs }) => {
        tapDemoEvents.push([relMs, "clave", 0.96]);
      });
      audioEngine.playRhythmSequence(tapDemoEvents, audioEngine.getAudioTime() + 0.05);

      hitDelaysMs.forEach(({ relMs }) => {
        scheduleTutorialTimer(() => {
          if (!padBtn) return;
          padBtn.classList.add("is-hit", "tutorial-target-pulse");
          if (!_exTutorial.markedEls.includes(padBtn)) _exTutorial.markedEls.push(padBtn);
          scheduleTutorialTimer(() => {
            padBtn.classList.remove("is-hit");
          }, Math.min(220, Math.round(beatMs * 0.45)), token);
        }, 50 + relMs, token);
      });

      scheduleTutorialTimer(() => {
        _exTutorial.phase = "done";
        markTutorialGroupSeen(_exTutorial.groupId);
        setTutorialCardActionsOnly(buildTutorialDoneActions(_exTutorial.groupId));
      }, 50 + Math.round(barMs + 500), token);
    }, timing.answerLeadMs, token);
  }, 50 + Math.round(2 * barMs + timing.postAudioPauseMs), token);
}

function runProdEqTutorialDemo(ex, meta, timing, token) {
  audioEngine.startProductionNoiseLoop({
    freqHz: ex.targetItem.freqHz,
    q: ex.q,
    gainDb: ex.boostDb,
    startBypassed: true,
    maxDurationSec: 15
  });
  const refBtn = document.getElementById("tonicRefBtn");
  refBtn?.classList.add("btn-active");

  scheduleTutorialTimer(() => {
    audioEngine.setProductionNoiseBypass(false);
    refBtn?.classList.remove("btn-active");
    updateTutorialCardUI({
      badge: tr("SCHRITT 1 / 2 · EQ-BOOST", "STEP 1 / 2 · EQ BOOST"),
      title: meta.title,
      text: tr(
        "Jetzt ist der EQ-Boost aktiv – hörst du, welches Frequenzband hervortritt?",
        "Now the EQ boost is active — hear which frequency band stands out?"
      ),
      mood: "listening",
      compact: true,
      position: "bottom",
      actions: [
        {
          label: tr("Abbrechen", "Cancel"),
          cls: "ex-tutorial-btn is-secondary",
          onClick: () => stopExerciseTutorial({ refreshExercise: true })
        }
      ]
    });
  }, 2400, token);

  scheduleTutorialTimer(() => {
    audioEngine.stopPlayback();
    scheduleTutorialTimer(() => {
      runExerciseTutorialAnswerPhase(ex, "production", meta, token);
    }, timing.postAudioPauseMs, token);
  }, 5200, token);
}

function playTutorialConfirmationAudio(ex, groupId) {
  if (!ex || !audioEngine?.isInitialized) return;
  if (groupId === "cadence" && ex.targetItem?.notes) {
    audioEngine.playStep(ex.targetItem.notes, 1.2, ex.targetItem.bass, "cadence");
    return;
  }
  if (groupId === "interval") {
    if (ex.type === "interval-harmonic" && ex.targetItem?.notes) {
      audioEngine.playStep(ex.targetItem.notes, 1.25, null, "interval-harmonic");
    } else if (ex.type === "interval-drone" && ex.padNotes && ex.targetItem?.targetNote) {
      audioEngine.playDroneIntervalCue(ex.padNotes, [ex.targetItem.targetNote], {
        delayMs: 320,
        padDurSec: 1.4,
        pianoDurSec: 1.05
      });
    } else if (Array.isArray(ex.bars) && ex.bars.length >= 2) {
      if (ex.bars[0]?.notes) audioEngine.playStep(ex.bars[0].notes, 0.55, null, "interval");
      scheduleTutorialTimer(() => {
        if (ex.bars[1]?.notes) audioEngine.playStep(ex.bars[1].notes, 1.05, null, "interval");
      }, 520, _exTutorial.token);
    }
    return;
  }
  if (groupId === "chord" && Array.isArray(ex.targetItem?.notes)) {
    audioEngine.playStep(ex.targetItem.notes, 1.25, ex.targetItem.bass || null, "cadence");
    return;
  }
  if (groupId === "notation-keys" || groupId === "notation-chords") {
    const playNotes = getNotationPlayNotes(ex.targetItem);
    if (playNotes?.length) audioEngine.playStep(playNotes, ex.isChordReading ? 1.2 : 0.95, null, "interval");
    return;
  }
  if (ex.type === "prod-tone" && Number.isFinite(ex.targetItem?.freqHz)) {
    audioEngine.playProductionTone(ex.targetItem.freqHz, 0.85);
  }
}

function runExerciseTutorialAnswerPhase(ex, groupId, meta, token) {
  if (!_exTutorial.active || _exTutorial.token !== token || state.currentView !== "exercise") return;
  _exTutorial.phase = "demo";

  const timing = getTutorialTimingProfile(groupId, ex);
  const label = getTutorialTargetDisplayLabel(ex, groupId);
  const answerText = meta.answerPrompt(label);
  const isMultiStep = groupId === "melody" || groupId === "melody-dictation" || groupId === "rhythm-dictation";
  const inputContainer = groupId === "solfege" || groupId === "melody" || groupId === "melody-dictation" || groupId === "notation-keys"
    ? document.getElementById("solfegeKeyboardWrap")
    : document.getElementById("degreeButtonsGrid");

  const spotEls = [inputContainer];
  if (isMultiStep) {
    spotEls.unshift(document.getElementById("exerciseModuleCard"));
  }
  if (groupId === "melody-dictation") {
    const picker = document.getElementById("melodyRhythmPicker");
    if (picker && !picker.classList.contains("hidden")) spotEls.push(picker);
  }
  setTutorialSpotlight(spotEls);

  const cardPos = isMultiStep ? "center" : "top";

  // 1. Mehr-Schritt-Übungen: erst Lese-Vorlauf mit [Abbrechen], dann ruhige Schritt-für-Schritt-Demo,
  //    danach wechseln nur die Buttons auf [Jetzt selbst probieren] [Nochmal ansehen] (ohne Karte neu zu bauen)
  if (isMultiStep) {
    updateTutorialCardUI({
      badge: tr("SCHRITT 2 / 2 · ANTWORT", "STEP 2 / 2 · ANSWER"),
      title: meta.title,
      text: answerText,
      mood: "happy",
      compact: true,
      position: cardPos,
      actions: [
        {
          label: tr("Abbrechen", "Cancel"),
          cls: "ex-tutorial-btn is-secondary",
          onClick: () => stopExerciseTutorial({ refreshExercise: true })
        }
      ]
    });

    if (groupId === "melody" || groupId === "melody-dictation") {
      const slots = (ex.melodySlots || []).slice(0, 5);
      const stepMs = timing.stepMs;
      const startDelay = timing.answerLeadMs;
      slots.forEach((slot, idx) => {
        scheduleTutorialTimer(() => {
          document.querySelectorAll("#solfegeKeyboardWrap .tutorial-target-pulse").forEach(el => {
            el.classList.remove("tutorial-target-pulse", "key-correct");
          });
          document.querySelectorAll("#melodyRhythmPicker .tutorial-target-pulse").forEach(el => {
            el.classList.remove("tutorial-target-pulse");
          });
          const card = document.getElementById(`barCard_${idx}`);
          if (card) markTutorialTargetEl(card, ["bar-active"]);
          const keyEl = document.getElementById(`solfegeKey_${slot.midi}`)
            || document.getElementById(`solfegeKey_${slot.playedMidi}`)
            || document.querySelector(`#solfegeKeyboardWrap [data-syllable="${slot.syllable}"]`);
          if (keyEl) markTutorialTargetEl(keyEl, ["key-correct"]);
          if (Number.isFinite(slot.playedMidi)) {
            audioEngine.playStep([midiToNote(slot.playedMidi)], 0.58, null, "interval");
          }
          // Im Melodie-Diktat kurz versetzt den zugehörigen Notenwert hervorheben
          if (groupId === "melody-dictation" && slot.rhythmKey) {
            scheduleTutorialTimer(() => {
              const rBtn = document.querySelector(`#melodyRhythmPicker [data-melody-rhythm="${slot.rhythmKey}"]`);
              if (rBtn) markTutorialTargetEl(rBtn, []);
            }, 420, token);
          }
        }, startDelay + idx * stepMs, token);
      });
      scheduleTutorialTimer(() => {
        _exTutorial.phase = "done";
        markTutorialGroupSeen(groupId);
        setTutorialCardActionsOnly(buildTutorialDoneActions(groupId));
      }, startDelay + Math.max(1100, slots.length * stepMs + 450), token);
      return;
    }

    // Rhythmus-Diktat: 4 Zählzeiten ruhig Schritt für Schritt vormachen
    const slots = ex.rhythmSlots || [];
    const stepMs = timing.stepMs;
    const startDelay = timing.answerLeadMs;
    const beatMs = 60000 / (state.activeBpm || 90);
    slots.forEach((slot, idx) => {
      scheduleTutorialTimer(() => {
        document.querySelectorAll("#degreeButtonsGrid .tutorial-target-pulse").forEach(el => {
          el.classList.remove("tutorial-target-pulse", "btn-correct");
        });
        const card = document.getElementById(`barCard_${idx}`);
        if (card) {
          markTutorialTargetEl(card, ["bar-active"]);
          const romanEl = card.querySelector(".bar-roman");
          const lblEl = card.querySelector(".bar-label");
          if (romanEl && typeof getRhythmCellSVG === "function") {
            romanEl.innerHTML = getRhythmCellSVG(slot.cellKey, 40, 22);
          }
          if (lblEl && slot.cell?.short) lblEl.textContent = slot.cell.short;
        }
        const btn = Array.from(document.querySelectorAll("#degreeButtonsGrid .degree-btn"))
          .find(el => el.dataset.choice === slot.cellKey);
        if (btn) markTutorialTargetEl(btn, ["btn-correct"]);
        const cellEvents = (slot.cell?.offsets || []).map(off => [Math.round(off * beatMs), "clave", 0.92]);
        if (cellEvents.length) audioEngine.playRhythmSequence(cellEvents);
      }, startDelay + idx * stepMs, token);
    });
    scheduleTutorialTimer(() => {
      _exTutorial.phase = "done";
      markTutorialGroupSeen(groupId);
      setTutorialCardActionsOnly(buildTutorialDoneActions(groupId));
    }, startDelay + Math.max(1100, slots.length * stepMs + 450), token);
    return;
  }

  // 2. Alle Einzel-Antwort-Übungen: Karte erscheint direkt im finalen, ruhigen Lösungszustand
  //    (kein 650-ms-Umspringen, kein Größenwechsel, kein Badge-Flackern – Nutzer liest im eigenen Tempo!)
  _exTutorial.phase = "done";
  markTutorialGroupSeen(groupId);
  updateTutorialCardUI({
    badge: tr("SCHRITT 2 / 2 · ANTWORT", "STEP 2 / 2 · ANSWER"),
    title: meta.title,
    text: answerText,
    mood: "happy",
    compact: false,
    position: cardPos,
    actions: buildTutorialDoneActions(groupId)
  });

  // Solfège: Taste grün markieren + nach kurzem Lesemoment die Auflösung zu Do spielen
  if (groupId === "solfege") {
    const target = ex.targetItem;
    const keyBtn = document.getElementById(`solfegeKey_${target?.midi}`)
      || document.querySelector(`#solfegeKeyboardWrap [data-syllable="${target?.syllable}"]`);
    if (keyBtn) markTutorialTargetEl(keyBtn, ["key-correct"]);
    if (target && Array.isArray(target.audioResolveMidis) && target.audioResolveMidis.length) {
      const steps = buildSolfegeResolutionSchedule(target.audioResolveMidis.length, state.activeBpm || 120);
      scheduleTutorialTimer(() => {
        target.audioResolveMidis.forEach((midi, idx) => {
          const st = steps[idx] || { delayMs: idx * 320, durationSec: 0.5 };
          scheduleTutorialTimer(() => {
            audioEngine.playStep([midiToNote(midi)], st.durationSec, null, "interval");
          }, st.delayMs, token);
        });
      }, timing.answerLeadMs, token);
    }
    return;
  }

  // Notenlesen (Klaviatur): passende Taste grün markieren + Bestätigungston nach kurzem Lesemoment
  if (groupId === "notation-keys") {
    const target = ex.targetItem;
    const pc = Number(target?.pc);
    const keyBtn = Array.from(document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key"))
      .find(el => Number(el.dataset.pc) === pc);
    if (keyBtn) markTutorialTargetEl(keyBtn, ["key-correct"]);
    scheduleTutorialTimer(() => {
      playTutorialConfirmationAudio(ex, groupId);
    }, timing.answerLeadMs, token);
    return;
  }

  // Alle Kachel-Übungen (Kadenz, Intervall, Akkord, Modi, Taktart/Groove, Noten-Akkorde, Studio)
  const targetKey = ex.targetItem?.key;
  const targetBtn = Array.from(document.querySelectorAll("#degreeButtonsGrid .degree-btn"))
    .find(el => el.dataset.choice === targetKey);
  if (targetBtn) markTutorialTargetEl(targetBtn, ["btn-correct"]);

  if (groupId === "cadence" && Number.isFinite(ex.targetIndex)) {
    const card = document.getElementById(`barCard_${ex.targetIndex}`);
    if (card) {
      markTutorialTargetEl(card, ["bar-active"]);
      const romanEl = card.querySelector(".bar-roman");
      const lblEl = card.querySelector(".bar-label");
      if (romanEl && ex.targetItem?.roman) romanEl.textContent = ex.targetItem.roman;
      if (lblEl && ex.targetItem?.short) lblEl.textContent = ex.targetItem.short;
    }
  }

  // Kurzes Bestätigungs-Audio nach ruhigem Lesemoment (damit Ohr & Blick die Lösung verknüpfen)
  scheduleTutorialTimer(() => {
    playTutorialConfirmationAudio(ex, groupId);
  }, timing.answerLeadMs, token);
}

function initExerciseTutorialUI() {
  document.getElementById("exerciseDemoBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    startExerciseTutorialManually();
  });
  document.getElementById("exTutorialCloseBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    dismissExerciseTutorialByUser();
  });
  document.querySelectorAll("[data-ex-tutorials]").forEach(btn => {
    btn.addEventListener("click", () => {
      setExerciseTutorialsPreference(btn.dataset.exTutorials === "on");
    });
  });
  document.getElementById("resetTutorialsBtn")?.addEventListener("click", () => {
    resetSeenExerciseTutorials();
  });
  syncTutorialSettingsControls();
}
