// =====================================================
// „… TREFFEN“: NACHSINGEN MIT RÜCKMELDUNG (js/sing-match.js)
// Unterübungen „Intervalle treffen“ (sing-interval) und „Stufen treffen“ (sing-degree):
// Lauscher spielt vor, dann singst du, und das Mikrofon (js/pitch-capture.js) hört zu.
// Ablauf je Aufgabe: Vorspielen (Mikro taub) → Nachhall abwarten → Zuhören → Auswerten.
// Nie gleichzeitig, weil ohne Echo-Unterdrückung sonst das Klavier statt der Stimme erkannt würde.
// Die Wertung ist bewusst großzügig und oktavunabhängig; Cent-Zahlen werden nie angezeigt.
// =====================================================

// Bequemer Tonraum je Stimmlage (MIDI), passend zu den Stimmlagen des Einsing-Helfers
const SING_MATCH_VOICE_SPANS = {
  mixed:   [60, 76],
  soprano: [62, 81],
  alto:    [57, 74],
  tenor:   [48, 67],
  bass:    [43, 62]
};
const SING_MATCH_VOICE_ORDER = ["mixed", "soprano", "alto", "tenor", "bass"];

const SING_MATCH_CONFIG = Object.freeze({
  hitToleranceSemis: 0.65,   // großzügig: gut ein halber Halbton daneben zählt noch als Treffer
  closeToleranceSemis: 0.3,  // darüber: Treffer mit Richtungshinweis („ein Hauch zu hoch“)
  nearMissSemis: 1.6,        // bis hier: „Fast – etwas zu hoch/tief“
  onsetSkipMs: 150,          // Anschleifen & Konsonanten am Tonanfang ignorieren
  stableStepSemis: 0.45,     // max. Sprung zwischen zwei Messpunkten innerhalb eines Tons
  stableSpreadSemis: 0.7,    // max. Abstand zum Median des Tons
  maxGapMs: 140,
  minRunMs: 300,             // so lange muss ein Ton stehen, damit er zählt
  earlyHitMs: 650,           // so lange im Ziel → sofort als Treffer werten
  silenceEndMs: 950,         // Stille nach einem gültigen Ton → Auswertung
  maxListenMs: 6500,
  settleMinMs: 220,
  settleMaxMs: 1500,
  settleQuietDb: 7,
  hopMs: 25,
  idleMicCloseMs: 45000,     // Mikrofon nach so langer Pause automatisch schließen
  autoNextDelayMs: 1700,
  traceWindowMs: 6500
});

const _singMatch = {
  phase: "idle",             // idle | starting | prompt | settle | listen | result
  token: 0,
  ex: null,
  frames: [],
  listenStartAt: 0,
  settleStartAt: 0,
  settleTimer: 0,
  idleTimer: 0,
  rafId: 0,
  lastFrame: null,
  result: null,
  showGuide: false,
  micError: ""
};

// ---------- Stimmlage ----------

function getSingMatchVoiceId() {
  const id = state?.profile?.singVoiceRange;
  return SING_MATCH_VOICE_SPANS[id] ? id : "mixed";
}

function hasChosenSingMatchVoice() {
  return Boolean(SING_MATCH_VOICE_SPANS[state?.profile?.singVoiceRange]);
}

function getSingMatchVoiceSpan(voiceId = getSingMatchVoiceId()) {
  return SING_MATCH_VOICE_SPANS[voiceId] || SING_MATCH_VOICE_SPANS.mixed;
}

function getSingMatchVoiceLabel(voiceId = getSingMatchVoiceId()) {
  if (typeof getLocalizedWarmupVoiceRange === "function") {
    return getLocalizedWarmupVoiceRange(voiceId);
  }
  return { id: voiceId, label: voiceId, sub: "" };
}

function setSingMatchVoiceRange(voiceId) {
  if (!SING_MATCH_VOICE_SPANS[voiceId]) return;
  if (!state.profile) state.profile = createDefaultProfile();
  const changed = state.profile.singVoiceRange !== voiceId;
  state.profile.singVoiceRange = voiceId;
  saveUserProfile(state.profile);
  state.singDegreeSessionTonic = null;
  closeSingMatchVoicePopover();
  if (changed && state.currentView === "exercise" && isSingMatchMode(state.currentExercise?.type)) {
    stopPlayback();
    generateExercise();
  } else {
    syncSingMatchVoiceChip();
  }
}

// ---------- Texte ----------

function getSingMatchModeTitle(mode) {
  return mode === "sing-degree"
    ? tr("Stufen treffen", "Sing Degrees")
    : tr("Intervalle treffen", "Sing Intervals");
}

function getSingIntervalLevelLabel(lvl) {
  const names = {
    1: tr("Einsteiger", "Beginner"),
    2: tr("Dur 1–4", "Major 1–4"),
    3: tr("Dur 5–8", "Major 5–8"),
    4: tr("Dur-Tonleiter", "Major Scale"),
    5: tr("Alle Intervalle", "All Intervals"),
    6: `${tr("Moll", "Minor")} • ${tr("Einsteiger", "Beginner")}`,
    7: tr("Moll 1–4", "Minor 1–4"),
    8: tr("Moll 5–8", "Minor 5–8"),
    9: tr("Moll-Tonleiter", "Minor Scale")
  };
  return names[lvl] || names[1];
}

function getSingDegreeLevelLabel(lvl) {
  const lab = (syl) => getSolfegeDisplayLabel(syl);
  const names = {
    1: `${lab("Do")}, ${lab("Mi")}, ${lab("Sol")}`,
    2: `${lab("Do")}–${lab("Fa")}`,
    3: `${lab("Sol")}–${lab("Do")}`,
    4: tr("Ganze Dur-Tonleiter", "Full Major Scale"),
    5: tr("Ganze Moll-Tonleiter", "Full Minor Scale")
  };
  return names[lvl] || names[1];
}

function getSingIntervalDirectionLabel(dir = state?.settings?.singIntervalDirection) {
  if (dir === "down") return tr("Abwärts", "Descending");
  if (dir === "mixed") return tr("Gemischt", "Mixed");
  return tr("Aufwärts", "Ascending");
}

function getSingMatchSummaryText(mode, includeCategory = true) {
  const lvlWord = tr("Stufe", "Level");
  if (mode === "sing-degree") {
    const lvl = parseInt(state.settings.singDegreeDifficulty, 10) || 1;
    const text = `${lvlWord} ${lvl} (${getSingDegreeLevelLabel(lvl)})`;
    return includeCategory ? `${getSingMatchModeTitle(mode)} • ${text}` : text;
  }
  const lvl = parseInt(state.settings.singIntervalDifficulty, 10) || 1;
  const text = `${lvlWord} ${lvl} (${getSingIntervalLevelLabel(lvl)}) • ${getSingIntervalDirectionLabel()}`;
  return includeCategory ? `${getSingMatchModeTitle(mode)} • ${text}` : text;
}

function getSingMatchMicErrorText(reason) {
  if (reason === "insecure") return tr("Das Mikrofon ist nur über HTTPS oder localhost verfügbar.", "The microphone is only available via HTTPS or localhost.");
  if (reason === "denied") return tr("Mikrofon-Zugriff verweigert – bitte in den Browser- bzw. App-Einstellungen erlauben.", "Microphone access denied — please allow it in your browser or app settings.");
  if (reason === "notfound") return tr("Kein Mikrofon gefunden.", "No microphone found.");
  return tr("Das Mikrofon konnte nicht gestartet werden.", "The microphone could not be started.");
}

// ---------- Auswertung (reine Funktionen, ohne DOM) ----------

function foldSingMatchSemis(diff) {
  let x = diff % 12;
  if (x > 6) x -= 12;
  if (x < -6) x += 12;
  return x;
}

function medianOfNumbers(values) {
  if (!values.length) return NaN;
  const sorted = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Zerlegt Messpunkte in stabile Töne. Liefert nur Töne mit Mindestdauer:
 * [{ startT, endT, durationMs, median }]
 */
function findSungPitchRuns(frames, cfg = SING_MATCH_CONFIG) {
  const rawRuns = [];
  let cur = null;
  const close = () => {
    if (cur) rawRuns.push(cur);
    cur = null;
  };
  for (const f of frames || []) {
    const voiced = f && f.voiced && Number.isFinite(f.midi);
    if (!voiced) {
      if (cur && f && f.t - cur.lastT > cfg.maxGapMs) close();
      continue;
    }
    if (cur) {
      const jump = Math.abs(f.midi - cur.lastMidi);
      const spread = Math.abs(f.midi - medianOfNumbers(cur.midis));
      if (f.t - cur.lastT > cfg.maxGapMs || jump > cfg.stableStepSemis || spread > cfg.stableSpreadSemis) close();
    }
    if (!cur) cur = { startT: f.t, lastT: f.t, lastMidi: f.midi, midis: [], times: [] };
    cur.midis.push(f.midi);
    cur.times.push(f.t);
    cur.lastT = f.t;
    cur.lastMidi = f.midi;
  }
  close();

  const runs = [];
  rawRuns.forEach(run => {
    const keepFrom = run.startT + cfg.onsetSkipMs;
    let kept = [];
    let firstT = null;
    run.times.forEach((t, i) => {
      if (t >= keepFrom) {
        kept.push(run.midis[i]);
        if (firstT === null) firstT = t;
      }
    });
    if (kept.length < 3) {
      kept = run.midis.slice();
      firstT = run.startT;
    }
    const durationMs = run.lastT - firstT + cfg.hopMs;
    if (durationMs < cfg.minRunMs) return;
    runs.push({ startT: firstT, endT: run.lastT, durationMs, median: medianOfNumbers(kept) });
  });
  return runs;
}

/**
 * Bewertet gesungene Messpunkte gegen den Zielton (oktavunabhängig, großzügig).
 * status: "hit" | "miss" | "none"; deviation = gefaltete Abweichung in Halbtönen (+ = zu hoch)
 */
function evaluateSungPitch(frames, targetMidi, cfg = SING_MATCH_CONFIG) {
  const runs = findSungPitchRuns(frames, cfg);
  if (!runs.length) return { status: "none", runs };
  const scored = runs.map(run => ({ ...run, deviation: foldSingMatchSemis(run.median - targetMidi) }));
  const hits = scored.filter(r => Math.abs(r.deviation) <= cfg.hitToleranceSemis);
  const pool = hits.length ? hits : scored;
  const best = pool.reduce((a, b) => (b.durationMs > a.durationMs ? b : a));
  const dev = best.deviation;
  const direction = dev > cfg.closeToleranceSemis ? "high" : (dev < -cfg.closeToleranceSemis ? "low" : "center");
  return {
    status: hits.length ? "hit" : "miss",
    sungMidi: best.median,
    deviation: dev,
    direction,
    nearMiss: !hits.length && Math.abs(dev) <= cfg.nearMissSemis,
    durationMs: best.durationMs,
    runs: scored
  };
}

// ---------- Mikrofon-Sitzung ----------

function isSingMatchExercise(ex = state.currentExercise) {
  return Boolean(ex && isSingMatchMode(ex.type) && ex.singTask);
}

function clearSingMatchIdleTimer() {
  if (_singMatch.idleTimer) clearTimeout(_singMatch.idleTimer);
  _singMatch.idleTimer = 0;
}

function armSingMatchIdleTimer() {
  clearSingMatchIdleTimer();
  _singMatch.idleTimer = setTimeout(() => {
    _singMatch.idleTimer = 0;
    if (_singMatch.phase === "result" || _singMatch.phase === "idle") {
      stopSingMatchCapture();
    }
  }, SING_MATCH_CONFIG.idleMicCloseMs);
}

/** Mikrofon schließen und laufende Runde beenden (Ansicht verlassen, Hintergrund, Moduswechsel). */
function stopSingMatchCapture() {
  abortSingMatchRound();
  clearSingMatchIdleTimer();
  setPitchCaptureListener(null);
  stopPitchCapture();
  stopSingMatchTraceLoop();
  renderSingMatchPad();
}

/** Laufendes Zuhören abbrechen (Mikrofon bleibt für die nächste Runde offen). */
function abortSingMatchRound() {
  _singMatch.token += 1;
  if (_singMatch.settleTimer) clearTimeout(_singMatch.settleTimer);
  _singMatch.settleTimer = 0;
  if (typeof setPitchCaptureFloorFrozen === "function") setPitchCaptureFloorFrozen(false);
  if (_singMatch.phase !== "idle" && _singMatch.phase !== "result") {
    _singMatch.phase = _singMatch.result ? "result" : "idle";
    state.isPlaying = false;
    updatePlayButtonUI(false);
    renderSingMatchPad();
    drawSingMatchTrace();
  }
}

/** Wird nach jeder neuen Aufgabe aufgerufen (js/generators.js). */
function onSingMatchExerciseGenerated(ex) {
  if (!isSingMatchExercise(ex)) {
    if (isPitchCaptureRunning() || _singMatch.phase !== "idle") stopSingMatchCapture();
    _singMatch.ex = null;
    return;
  }
  _singMatch.token += 1;
  if (_singMatch.settleTimer) clearTimeout(_singMatch.settleTimer);
  _singMatch.settleTimer = 0;
  _singMatch.ex = ex;
  _singMatch.phase = "idle";
  _singMatch.frames = [];
  _singMatch.result = null;
  _singMatch.showGuide = false;
  _singMatch.micError = "";
}

/**
 * Startet eine Runde: optional Vorspielen, dann Zuhören. Muss direkt aus einem Tipp kommen
 * (iOS: synchroner Audio-Unlock vor dem ersten await).
 */
async function startSingMatchRound(options = {}) {
  const ex = state.currentExercise;
  if (!isSingMatchExercise(ex) || state.exam?.active) return;
  const withPrompt = options.withPrompt !== false;
  if (typeof prepareAudioNonBlocking === "function") prepareAudioNonBlocking();
  clearSingMatchIdleTimer();
  const token = ++_singMatch.token;
  if (_singMatch.settleTimer) clearTimeout(_singMatch.settleTimer);
  _singMatch.settleTimer = 0;
  _singMatch.ex = ex;
  _singMatch.frames = [];
  _singMatch.result = null;
  _singMatch.micError = "";
  if (ex.isSolved) {
    // Gelöste Aufgabe nochmal singen: nur üben, nicht neu werten
    ex.singReplay = true;
  }

  if (!isPitchCaptureRunning()) {
    _singMatch.phase = "starting";
    renderSingMatchPad();
    const res = await startPitchCapture();
    if (token !== _singMatch.token || state.currentExercise !== ex || state.currentView !== "exercise") {
      if (state.currentView !== "exercise") stopSingMatchCapture();
      return;
    }
    if (!res.ok) {
      _singMatch.phase = "idle";
      _singMatch.micError = getSingMatchMicErrorText(res.reason);
      renderSingMatchPad();
      setSingMatchStageText(tr("MIKROFON", "MICROPHONE"), tr("Kein Zugriff", "No access"), _singMatch.micError);
      return;
    }
  }
  setPitchCaptureListener(onSingMatchFrame);
  startSingMatchTraceLoop();

  if (withPrompt) {
    playSingMatchPrompt(ex, token);
  } else {
    audioEngine.stopPlayback();
    beginSingMatchSettle(token);
  }
}

function getSingMatchPromptPlan(ex) {
  const task = ex.singTask;
  if (task.kind === "degree") {
    const stepSec = 0.62;
    const chordDur = 0.78;
    const events = (ex.cadenceChords || []).map((ch, i) => ({ atSec: i * stepSec, notes: ch.notes, bass: ch.bass, dur: i === 3 ? 1.0 : chordDur, mode: "cadence" }));
    const doAt = events.length * stepSec + 0.55;
    events.push({ atSec: doAt, notes: [midiToNote(task.refMidi)], bass: null, dur: 1.05, mode: "interval", isRef: true });
    return { events, totalMs: Math.round((doAt + 1.05) * 1000) };
  }
  return {
    events: [{ atSec: 0, notes: [midiToNote(task.refMidi)], bass: null, dur: 1.25, mode: "interval", isRef: true }],
    totalMs: 1250
  };
}

function playSingMatchPrompt(ex, token) {
  audioEngine.stopPlayback();
  setPitchCaptureFloorFrozen(true);
  _singMatch.phase = "prompt";
  state.isPlaying = true;
  updatePlayButtonUI(true);
  renderSingMatchPad();
  setSingMatchStageMode("stage-playing");
  updateStageMascot("listening");
  setSingMatchStageText(
    tr("HÖR ZU", "LISTEN"),
    ex.singTask.kind === "degree" ? (ex.keyName || "") : tr("Ausgangston", "Root Note"),
    ex.singTask.kind === "degree"
      ? tr("Die Kadenz legt die Tonart fest – danach erklingt Do.", "The cadence sets the key — then you hear Do.")
      : tr("Merk dir den Ton – gleich bist du dran.", "Remember this note — you’re up next.")
  );
  drawSingMatchTrace();

  const plan = getSingMatchPromptPlan(ex);
  const playbackId = audioEngine.playbackId;
  const base = (typeof getAudioClockSec === "function" ? getAudioClockSec() : (audioEngine.rawCtx?.currentTime || 0))
    + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
  plan.events.forEach(ev => {
    audioEngine.playStep(ev.notes, ev.dur, ev.bass, ev.mode, { atTime: base + ev.atSec, legato: false });
  });
  const refCard = document.getElementById("barCard_0");
  refCard?.classList.add("bar-active");
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== playbackId || token !== _singMatch.token) return;
    document.getElementById("barCard_0")?.classList.remove("bar-active");
    beginSingMatchSettle(token);
  }, plan.totalMs);
}

function beginSingMatchSettle(token) {
  if (token !== _singMatch.token) return;
  _singMatch.phase = "settle";
  _singMatch.settleStartAt = performance.now();
  setPitchCaptureFloorFrozen(true);
  state.isPlaying = true;
  updatePlayButtonUI(true);
  renderSingMatchPad();
  if (_singMatch.settleTimer) clearTimeout(_singMatch.settleTimer);
  _singMatch.settleTimer = setTimeout(() => {
    _singMatch.settleTimer = 0;
    if (token === _singMatch.token && _singMatch.phase === "settle") beginSingMatchListen(token);
  }, SING_MATCH_CONFIG.settleMaxMs);
}

function beginSingMatchListen(token) {
  if (token !== _singMatch.token) return;
  if (_singMatch.settleTimer) clearTimeout(_singMatch.settleTimer);
  _singMatch.settleTimer = 0;
  setPitchCaptureFloorFrozen(false);
  _singMatch.phase = "listen";
  _singMatch.frames = [];
  _singMatch.listenStartAt = performance.now();
  const ex = _singMatch.ex;
  setSingMatchStageMode("stage-awaiting");
  updateStageMascot("listening");
  setSingMatchStageText(
    tr("JETZT DU", "YOUR TURN"),
    "",
    ex?.singTask?.kind === "degree"
      ? tf("Sing {target} – auf der Silbe oder auf „la“.", "Sing {target} — on the syllable or on “la”.", { target: ex.singTask.taskMain })
      : tf("Sing {target} vom Ausgangston aus.", "Sing {target} from the root note.", { target: ex?.singTask?.taskLabel || "" })
  );
  renderSingMatchPad();
}

function onSingMatchFrame(frame) {
  _singMatch.lastFrame = frame;
  const phase = _singMatch.phase;
  if (phase === "settle") {
    const elapsed = frame.t - _singMatch.settleStartAt;
    if (elapsed >= SING_MATCH_CONFIG.settleMinMs && frame.db < frame.floorDb + SING_MATCH_CONFIG.settleQuietDb) {
      beginSingMatchListen(_singMatch.token);
    }
    return;
  }
  if (phase !== "listen") return;
  _singMatch.frames.push(frame);
  const cfg = SING_MATCH_CONFIG;
  const elapsed = frame.t - _singMatch.listenStartAt;
  if (elapsed >= cfg.maxListenMs) {
    finishSingMatchListening();
    return;
  }
  const target = _singMatch.ex?.singTask?.targetMidi;
  const runs = findSungPitchRuns(_singMatch.frames, cfg);
  if (Number.isFinite(target) && runs.some(r => r.durationMs >= cfg.earlyHitMs && Math.abs(foldSingMatchSemis(r.median - target)) <= cfg.hitToleranceSemis)) {
    finishSingMatchListening();
    return;
  }
  if (runs.length) {
    let lastVoicedT = 0;
    for (let i = _singMatch.frames.length - 1; i >= 0; i--) {
      if (_singMatch.frames[i].voiced) {
        lastVoicedT = _singMatch.frames[i].t;
        break;
      }
    }
    if (lastVoicedT && frame.t - lastVoicedT >= cfg.silenceEndMs) finishSingMatchListening();
  }
}

function finishSingMatchListening() {
  if (_singMatch.phase !== "listen") return;
  const ex = _singMatch.ex;
  _singMatch.phase = "result";
  state.isPlaying = false;
  updatePlayButtonUI(false);
  if (!ex || state.currentExercise !== ex) return;
  const res = evaluateSungPitch(_singMatch.frames, ex.singTask.targetMidi);
  _singMatch.result = res;
  applySingMatchResult(ex, res);
  renderSingMatchPad();
  drawSingMatchTrace();
  armSingMatchIdleTimer();
}

// ---------- Ergebnis anzeigen & werten ----------

function getSingMatchSungLabel(ex, res) {
  const task = ex.singTask;
  const rel = Math.round(foldSingMatchSemis(res.sungMidi - task.refMidi));
  const relPos = ((rel % 12) + 12) % 12;
  if (task.kind === "degree") {
    const step = (task.scaleSteps || []).find(st => (st.semitones % 12) === relPos);
    if (step) return getSolfegeDisplayLabel(step.syllable);
    return midiToGermanNote(Math.round(res.sungMidi), task.refPreferFlat).replace(/-?\d+$/, "");
  }
  // Intervall: Abstand in Singrichtung (oktavgefaltet)
  const dirRel = ex.directionSign < 0 ? ((12 - relPos) % 12) : relPos;
  const sungSemis = dirRel === 0 && Math.abs(task.targetMidi - task.refMidi) === 12 ? 12 : dirRel;
  const key = Object.keys(HARMONIC_DATA.intervals).find(k => HARMONIC_DATA.intervals[k].semitones === sungSemis);
  return key ? getLocalizedIntervalDef(key).label : midiToGermanNote(Math.round(res.sungMidi)).replace(/-?\d+$/, "");
}

function revealSingMatchTargetCard(ex) {
  const card = document.getElementById("barCard_1");
  if (!card) return;
  const main = card.querySelector(".bar-roman");
  const lbl = card.querySelector(".bar-label");
  if (main) main.textContent = ex.singTask.kind === "degree"
    ? ex.singTask.taskMain
    : midiToGermanNote(ex.singTask.targetMidi, ex.singTask.targetPreferFlat);
  if (lbl) lbl.textContent = ex.singTask.taskLabel;
  card.classList.remove("bar-target");
  card.classList.add("bar-active");
}

function applySingMatchResult(ex, res) {
  const padBtn = document.getElementById("singPadBtn");
  const isReplay = Boolean(ex.singReplay);
  if (res.status === "hit") {
    if (!isReplay) noteSessionReviewAnswer(ex, true);
    ex.isSolved = true;
    state.exerciseSolved = true;
    const streakRes = isReplay
      ? { count: state.streakState?.count || 0, isMilestone: false }
      : recordExerciseStreakSuccess(ex);
    setSingMatchStageMode("stage-playing");
    updateStageMascot("happy");
    triggerCelebrationFeedback(padBtn, { isMilestone: streakRes.isMilestone, stageBurst: !padBtn });
    const hint = res.direction === "high"
      ? tr("Getroffen – ein Hauch zu hoch.", "Got it — a touch sharp.")
      : (res.direction === "low" ? tr("Getroffen – ein Hauch zu tief.", "Got it — a touch flat.") : tr("Genau in der Mitte.", "Right in the middle."));
    setSingMatchStageText(getPersonalizedCorrectStageSubtext(tr("GETROFFEN!", "SPOT ON!")), ex.singTask.taskMain, hint);
    revealSingMatchTargetCard(ex);
    if (shouldPlayCorrectAnswerAudio()) {
      audioEngine.playStep([midiToNote(ex.singTask.targetMidi)], 0.9, null, "interval");
    }
    if (!isReplay && state.settings.singMatchAutoNext) {
      const playbackId = audioEngine.playbackId;
      const token = _singMatch.token;
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== playbackId || token !== _singMatch.token) return;
        if (state.currentView !== "exercise" || state.currentExercise !== ex) return;
        generateExercise();
        startSingMatchRound({ withPrompt: true });
      }, SING_MATCH_CONFIG.autoNextDelayMs);
    }
    return;
  }

  if (res.status === "none") {
    setSingMatchStageMode("stage-awaiting");
    updateStageMascot("thinking");
    setSingMatchStageText(
      tr("NICHTS GEHÖRT", "NOTHING HEARD"),
      tr("Ich habe dich nicht gehört", "I didn’t hear you"),
      tr("Sing etwas lauter oder näher am Gerät – und halte den Ton kurz.", "Sing a little louder or closer to the device — and hold the note briefly.")
    );
    return;
  }

  // Daneben
  if (!isReplay && !ex.isSolved) {
    noteSessionReviewAnswer(ex, false);
    resetExerciseStreakOnAttempt(ex);
  }
  _singMatch.showGuide = true;
  setSingMatchStageMode("stage-wrong");
  updateStageMascot("thinking");
  const sungLabel = getSingMatchSungLabel(ex, res);
  const dirText = res.deviation < 0
    ? tr("Das Ziel liegt höher.", "The target is higher.")
    : tr("Das Ziel liegt tiefer.", "The target is lower.");
  if (res.nearMiss) {
    setSingMatchStageText(
      tr("FAST!", "ALMOST!"),
      res.deviation < 0 ? tr("Etwas zu tief", "A bit too low") : tr("Etwas zu hoch", "A bit too high"),
      tr("Das Zielband hilft dir beim nächsten Versuch.", "The target band will guide your next try.")
    );
  } else {
    setSingMatchStageText(
      tr("KNAPP DANEBEN", "NOT QUITE"),
      tf("Gesungen: {sung}", "You sang: {sung}", { sung: sungLabel }),
      `${tf("Gesucht: {target}.", "Target: {target}.", { target: ex.singTask.taskLabel })} ${dirText}`
    );
  }
}

// ---------- Bühne: Texte & Singspur ----------

function setSingMatchStageMode(mode) {
  _singMatch.stageMode = mode;
  setCentralStageMode(mode);
}

function setSingMatchStageText(sub, main, desc) {
  _singMatch.stageText = [sub, main, desc];
  const subEl = document.getElementById("stageSubtext");
  const mainEl = document.getElementById("stageMainText");
  const descEl = document.getElementById("stageFunctionText");
  if (subEl) subEl.textContent = sub || "";
  if (mainEl) {
    mainEl.textContent = main || "";
    mainEl.classList.toggle("is-empty", !main);
  }
  if (descEl) descEl.textContent = desc || "";
}

function ensureSingMatchTraceCanvas() {
  const stage = document.getElementById("centralStageCard");
  if (!stage) return null;
  let canvas = document.getElementById("singTraceCanvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "singTraceCanvas";
    canvas.className = "sing-trace-canvas";
    canvas.setAttribute("aria-hidden", "true");
    const sub = document.getElementById("stageSubtext");
    if (sub && sub.parentNode === stage) stage.insertBefore(canvas, sub.nextSibling);
    else stage.appendChild(canvas);
    // Bühne verdichtet sich (fit-*, Container-Query) → Spur in neuer Größe neu zeichnen statt strecken
    if (typeof ResizeObserver === "function") {
      _singMatch.traceResizeObserver?.disconnect();
      _singMatch.traceResizeObserver = new ResizeObserver(() => drawSingMatchTrace());
      _singMatch.traceResizeObserver.observe(canvas);
    }
  }
  return canvas;
}

/** Bühne für „… treffen“ vorbereiten bzw. aufräumen (aus renderUI). */
function syncSingMatchStage(ex = state.currentExercise) {
  const isSing = isSingMatchExercise(ex);
  if (!isSing) {
    _singMatch.traceResizeObserver?.disconnect();
    _singMatch.traceResizeObserver = null;
    document.getElementById("singTraceCanvas")?.remove();
    document.getElementById("stageMainText")?.classList.remove("is-empty");
    return;
  }
  ensureSingMatchTraceCanvas();
  // Läuft gerade eine Runde zu dieser Aufgabe oder steht ihr Ergebnis: Bühne nicht auf „bereit“ zurücksetzen
  // (z. B. wenn renderUI/resetCentralStage nachträglich durch einen anderen Ablauf ausgelöst wird)
  if (_singMatch.ex === ex && _singMatch.phase !== "idle" && _singMatch.stageText) {
    setCentralStageMode(_singMatch.stageMode || "stage-idle");
    const [sub, main, desc] = _singMatch.stageText;
    setSingMatchStageText(sub, main, desc);
    drawSingMatchTrace();
    return;
  }
  setSingMatchStageMode("stage-idle");
  if (_singMatch.micError) {
    setSingMatchStageText(tr("MIKROFON", "MICROPHONE"), tr("Kein Zugriff", "No access"), _singMatch.micError);
  } else {
    setSingMatchStageText(
      getSingMatchModeTitle(ex.type).toUpperCase(),
      ex.singTask.taskMain,
      tr("Drück ▶ – Lauscher spielt vor, dann singst du.", "Press ▶ — Lauscher plays first, then you sing.")
    );
  }
  drawSingMatchTrace();
}

function readSingMatchColors(stage) {
  const cs = stage ? getComputedStyle(stage) : null;
  const v = (name, fallback) => (cs?.getPropertyValue(name) || "").trim() || fallback;
  return {
    grid: v("--border-soft", "rgba(0,0,0,0.12)"),
    text: v("--raccoon-muted", "#7a7a7a"),
    ref: v("--lilac-strong", "#7d6bb3"),
    band: v("--sage", "#cfe3d4"),
    bandEdge: v("--sage-strong", "#2e6f4e"),
    line: v("--raccoon-dark", "#333"),
    miss: v("--peach-strong", "#c46b3c")
  };
}

function startSingMatchTraceLoop() {
  if (_singMatch.rafId) return;
  const loop = () => {
    _singMatch.rafId = 0;
    if (!isPitchCaptureRunning() || state.currentView !== "exercise") return;
    drawSingMatchTrace();
    updateSingMatchLevelMeter();
    _singMatch.rafId = requestAnimationFrame(loop);
  };
  _singMatch.rafId = requestAnimationFrame(loop);
}

function stopSingMatchTraceLoop() {
  if (_singMatch.rafId) cancelAnimationFrame(_singMatch.rafId);
  _singMatch.rafId = 0;
}

function updateSingMatchLevelMeter() {
  const meter = document.getElementById("singPadLevel");
  if (!meter) return;
  const f = _singMatch.lastFrame;
  const listening = _singMatch.phase === "listen";
  let level = 0;
  if (f && listening && Number.isFinite(f.db)) {
    level = Math.max(0, Math.min(1, (f.db - f.floorDb) / 30));
  }
  meter.style.setProperty("--sing-level", level.toFixed(3));
  const pad = document.getElementById("singPadBtn");
  if (pad && listening) {
    const p = Math.min(1, (performance.now() - _singMatch.listenStartAt) / SING_MATCH_CONFIG.maxListenMs);
    pad.style.setProperty("--sing-progress", p.toFixed(3));
  }
}

function drawSingMatchTrace() {
  const canvas = document.getElementById("singTraceCanvas");
  const ex = _singMatch.ex || state.currentExercise;
  if (!canvas || !isSingMatchExercise(ex) || typeof canvas.getContext !== "function") return;
  const cssW = canvas.clientWidth;
  const cssH = canvas.clientHeight;
  if (!cssW || !cssH) return;
  const dpr = Math.min(3, window.devicePixelRatio || 1);
  const w = Math.round(cssW * dpr);
  const h = Math.round(cssH * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const g = canvas.getContext("2d");
  if (!g) return;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, cssW, cssH);
  // Spur läuft immer links → rechts (Zeit), auch bei RTL-Sprachen; sonst rutschen die Tonnamen aus dem Bild
  if ("direction" in g) g.direction = "ltr";
  const colors = readSingMatchColors(document.getElementById("centralStageCard"));
  const task = ex.singTask;
  const ref = task.refMidi;
  const target = task.targetMidi;
  const lo = Math.min(ref, target) - 3;
  const hi = Math.max(ref, target) + 3;
  const padL = 30;
  const padR = 6;
  const yOf = (m) => cssH - 4 - ((m - lo) / (hi - lo)) * (cssH - 8);
  const xOf = (t) => padL + Math.max(0, Math.min(1, (t - _singMatch.listenStartAt) / SING_MATCH_CONFIG.traceWindowMs)) * (cssW - padL - padR);
  const revealTarget = _singMatch.showGuide || _singMatch.phase === "result" || ex.isSolved;

  // Halbton-Raster
  g.lineWidth = 1;
  g.strokeStyle = colors.grid;
  g.globalAlpha = 0.55;
  for (let m = Math.ceil(lo); m <= Math.floor(hi); m++) {
    const y = Math.round(yOf(m)) + 0.5;
    g.beginPath();
    g.moveTo(padL, y);
    g.lineTo(cssW - padR, y);
    g.stroke();
  }
  g.globalAlpha = 1;

  // Zielband (erst nach dem Versuch bzw. als Hilfe nach einem Fehlversuch)
  g.font = "700 10px Andika, sans-serif";
  g.textBaseline = "middle";
  if (revealTarget) {
    const tol = SING_MATCH_CONFIG.hitToleranceSemis;
    const yTop = yOf(target + tol);
    const yBot = yOf(target - tol);
    g.fillStyle = colors.band;
    g.globalAlpha = 0.75;
    g.fillRect(padL, yTop, cssW - padL - padR, yBot - yTop);
    g.globalAlpha = 1;
    g.strokeStyle = colors.bandEdge;
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(padL, yOf(target));
    g.lineTo(cssW - padR, yOf(target));
    g.stroke();
    g.fillStyle = colors.bandEdge;
    g.fillText(task.kind === "degree" ? task.taskMain : midiToGermanNote(target, task.targetPreferFlat).replace(/-?\d+$/, ""), 2, yOf(target));
  }

  // Ausgangston / Tonika als gestrichelte Linie
  g.strokeStyle = colors.ref;
  g.lineWidth = 1.5;
  if (typeof g.setLineDash === "function") g.setLineDash([4, 4]);
  g.beginPath();
  g.moveTo(padL, yOf(ref));
  g.lineTo(cssW - padR, yOf(ref));
  g.stroke();
  if (typeof g.setLineDash === "function") g.setLineDash([]);
  g.fillStyle = colors.ref;
  g.fillText(task.kind === "degree" ? getSolfegeDisplayLabel("Do") : midiToGermanNote(ref, task.refPreferFlat).replace(/-?\d+$/, ""), 2, yOf(ref));

  // Eigene Stimme (oktavgefaltet zum Ziel, damit tiefe/hohe Stimmen am selben Ort erscheinen)
  const frames = _singMatch.frames;
  if (frames.length) {
    const center = (ref + target) / 2;
    g.lineWidth = 2.6;
    g.lineJoin = "round";
    g.lineCap = "round";
    g.strokeStyle = _singMatch.result?.status === "miss" ? colors.miss : colors.line;
    let drawing = false;
    let prevT = 0;
    g.beginPath();
    frames.forEach(f => {
      if (!f.voiced || !Number.isFinite(f.midi)) {
        drawing = false;
        return;
      }
      const m = f.midi + 12 * Math.round((center - f.midi) / 12);
      const clamped = Math.max(lo, Math.min(hi, m));
      const x = xOf(f.t);
      const y = yOf(clamped);
      if (!drawing || f.t - prevT > 140) g.moveTo(x, y);
      else g.lineTo(x, y);
      drawing = true;
      prevT = f.t;
    });
    g.stroke();
  }
}

// ---------- Sing-Pad (Antwortbereich) ----------

const SING_PAD_MIC_SVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><line x1="12" y1="17.5" x2="12" y2="21.5"/><line x1="8.5" y1="21.5" x2="15.5" y2="21.5"/></svg>`;

function renderSingMatchPad() {
  const wrap = document.getElementById("singPadWrap");
  const ex = state.currentExercise;
  if (!wrap || !isSingMatchExercise(ex)) return;
  if (!document.getElementById("singPadBtn")) {
    wrap.innerHTML = `
      <button id="singPadBtn" type="button" class="sing-pad">
        <span class="sing-pad-icon">${SING_PAD_MIC_SVG}</span>
        <span class="sing-pad-copy">
          <span id="singPadTitle" class="sing-pad-title"></span>
          <span id="singPadSub" class="sing-pad-sub"></span>
        </span>
        <span id="singPadLevel" class="sing-pad-level" aria-hidden="true"><span></span></span>
        <span class="sing-pad-progress" aria-hidden="true"></span>
      </button>
    `;
    document.getElementById("singPadBtn").addEventListener("click", handleSingMatchPadTap);
  }
  const pad = document.getElementById("singPadBtn");
  const titleEl = document.getElementById("singPadTitle");
  const subEl = document.getElementById("singPadSub");
  const phase = _singMatch.phase;
  const micOn = isPitchCaptureRunning();
  pad.classList.toggle("is-busy", phase === "starting" || phase === "prompt" || phase === "settle");
  pad.classList.toggle("is-listening", phase === "listen");
  pad.classList.toggle("is-hit", phase === "result" && _singMatch.result?.status === "hit");
  pad.classList.toggle("is-miss", phase === "result" && _singMatch.result?.status === "miss");
  pad.classList.toggle("mic-on", micOn);
  if (phase !== "listen") pad.style.setProperty("--sing-progress", "0");

  let title = "";
  let sub = "";
  if (phase === "starting") {
    title = tr("Mikrofon wird gestartet …", "Starting microphone …");
    sub = tr("Nichts wird aufgenommen oder gespeichert.", "Nothing is recorded or stored.");
  } else if (phase === "prompt") {
    title = tr("Hör zu …", "Listen …");
    sub = tr("Gleich bist du dran.", "You’re up next.");
  } else if (phase === "settle") {
    title = tr("Gleich …", "Get ready …");
    sub = tr("Warte, bis der Klang verklungen ist.", "Wait for the sound to fade.");
  } else if (phase === "listen") {
    title = tr("Jetzt singen!", "Sing now!");
    sub = tr("Tippe hier, wenn du fertig bist.", "Tap here when you’re done.");
  } else if (phase === "result") {
    const status = _singMatch.result?.status;
    if (status === "hit") {
      title = tr("Getroffen!", "Spot on!");
      sub = state.settings.singMatchAutoNext && !ex.singReplay
        ? tr("Die nächste Aufgabe kommt gleich …", "Next task coming up …")
        : tr("Tippe für die nächste Aufgabe.", "Tap for the next task.");
    } else {
      title = tr("Nochmal singen", "Sing again");
      sub = tr("Tippe hier – oder ▶, um nochmal zu hören.", "Tap here — or ▶ to listen again.");
    }
  } else if (_singMatch.micError) {
    title = tr("Mikrofon nicht verfügbar", "Microphone unavailable");
    sub = _singMatch.micError;
  } else {
    title = tr("Tippen und singen", "Tap and sing");
    sub = micOn
      ? tr("Lauscher hört nur zu, solange die Übung läuft.", "Lauscher only listens while the exercise is running.")
      : tr("Lauscher hört dir per Mikrofon zu. Nichts wird aufgenommen.", "Lauscher listens through the microphone. Nothing is recorded.");
  }
  if (isPitchCaptureBluetooth() && (phase === "listen" || phase === "settle")) {
    sub = tr("Bluetooth-Mikrofon aktiv – das eingebaute Mikrofon ist genauer.", "Bluetooth microphone active — the built-in mic is more accurate.");
  }
  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = sub;
  pad.setAttribute("aria-label", `${title}. ${sub}`);
}

function handleSingMatchPadTap() {
  const ex = state.currentExercise;
  if (!isSingMatchExercise(ex)) return;
  const phase = _singMatch.phase;
  if (phase === "listen") {
    finishSingMatchListening();
    return;
  }
  if (phase === "settle") {
    beginSingMatchListen(_singMatch.token);
    return;
  }
  if (phase === "starting" || phase === "prompt") return;
  if (phase === "result" && _singMatch.result?.status === "hit" && !ex.singReplay) {
    stopPlayback({ preserveStage: true });
    generateExercise();
    startSingMatchRound({ withPrompt: true });
    return;
  }
  if (phase === "result") {
    startSingMatchRound({ withPrompt: false });
    return;
  }
  startSingMatchRound({ withPrompt: true });
}

/** „Ziel anhören“: spielt Ausgangston + Ziel bzw. den Zielton und zeigt das Zielband. */
function playSingMatchTargetReveal() {
  const ex = state.currentExercise;
  if (!isSingMatchExercise(ex)) return;
  if (typeof prepareAudioNonBlocking === "function") prepareAudioNonBlocking();
  abortSingMatchRound();
  if (!ex.isSolved && !ex.hadWrongAttempt) {
    resetExerciseStreakOnAttempt(ex);
  }
  _singMatch.showGuide = true;
  audioEngine.stopPlayback();
  setPitchCaptureFloorFrozen(true);
  const task = ex.singTask;
  const base = (typeof getAudioClockSec === "function" ? getAudioClockSec() : (audioEngine.rawCtx?.currentTime || 0))
    + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
  audioEngine.playStep([midiToNote(task.refMidi)], 0.85, null, "interval", { atTime: base, legato: false });
  audioEngine.playStep([midiToNote(task.targetMidi)], 1.1, null, "interval", { atTime: base + 0.9, legato: false });
  const playbackId = audioEngine.playbackId;
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId === playbackId) setPitchCaptureFloorFrozen(false);
  }, 2100);
  revealSingMatchTargetCard(ex);
  setSingMatchStageText(
    tr("ZIEL", "TARGET"),
    task.taskMain,
    tr("Jetzt du: Tippe aufs Mikrofon und sing den Zielton.", "Your turn: tap the microphone and sing the target note.")
  );
  drawSingMatchTrace();
  renderSingMatchPad();
}

// ---------- Stimmlage-Chip & Popover im Übungskopf ----------

function syncSingMatchVoiceChip() {
  const chip = document.getElementById("singVoiceChipBtn");
  const ex = state.currentExercise;
  const show = isSingMatchExercise(ex) && !state.exam?.active;
  if (chip) {
    chip.classList.toggle("hidden", !show);
    if (show) {
      const voice = getSingMatchVoiceLabel();
      chip.textContent = `${tr("Stimme", "Voice")}: ${voice.label} ▾`;
      chip.title = tr("Stimmlage wählen", "Choose your voice range");
    }
  }
  const dirChip = document.getElementById("singDirChipBtn");
  if (dirChip) {
    const showDir = show && ex.type === "sing-interval";
    dirChip.classList.toggle("hidden", !showDir);
    if (showDir) {
      const arrows = { up: "↗", down: "↘", mixed: "↗↘" };
      dirChip.textContent = `${arrows[state.settings.singIntervalDirection] || "↗"} ${getSingIntervalDirectionLabel()}`;
      dirChip.title = tr("Richtung umschalten", "Switch direction");
    }
  }
  if (!show) closeSingMatchVoicePopover();
}

function renderSingMatchVoicePopover() {
  const pop = document.getElementById("inlineSingVoicePopover");
  if (!pop) return;
  const cur = hasChosenSingMatchVoice() ? getSingMatchVoiceId() : "";
  pop.innerHTML = `
    <span class="popover-label">${escapeHtml(tr("Deine Stimmlage:", "Your voice range:"))}</span>
    <div class="popover-pills-row">
      ${SING_MATCH_VOICE_ORDER.map(id => {
        const v = getSingMatchVoiceLabel(id);
        return `<button type="button" class="popover-pill-btn${cur === id ? " active" : ""}" data-sing-voice="${id}">${escapeHtml(v.label)} <span class="sing-voice-sub">${escapeHtml(v.sub)}</span></button>`;
      }).join("")}
    </div>
    <span class="sing-voice-hint">${escapeHtml(tr("Die Aufgaben liegen dann bequem in deiner Lage. Oktaven zählen gleich.", "Tasks then sit comfortably in your range. Octaves count the same."))}</span>
  `;
  pop.querySelectorAll("[data-sing-voice]").forEach(btn => {
    btn.addEventListener("click", () => setSingMatchVoiceRange(btn.dataset.singVoice));
  });
}

function toggleSingMatchVoicePopover(forceOpen = null) {
  const pop = document.getElementById("inlineSingVoicePopover");
  const chip = document.getElementById("singVoiceChipBtn");
  if (!pop) return;
  const open = forceOpen === null ? pop.classList.contains("hidden") : Boolean(forceOpen);
  if (open) renderSingMatchVoicePopover();
  pop.classList.toggle("hidden", !open);
  chip?.classList.toggle("chip-open", open);
  chip?.setAttribute("aria-expanded", open ? "true" : "false");
  if (typeof queueFitExerciseLayout === "function") queueFitExerciseLayout(true);
}

function closeSingMatchVoicePopover() {
  const pop = document.getElementById("inlineSingVoicePopover");
  if (!pop || pop.classList.contains("hidden")) return false;
  pop.classList.add("hidden");
  const chip = document.getElementById("singVoiceChipBtn");
  chip?.classList.remove("chip-open");
  chip?.setAttribute("aria-expanded", "false");
  return true;
}

function cycleSingIntervalDirection() {
  const order = ["up", "down", "mixed"];
  const cur = order.indexOf(state.settings.singIntervalDirection);
  state.settings.singIntervalDirection = order[(cur + 1) % order.length];
  state.updateHeaderSubtext();
  stopPlayback();
  generateExercise();
}

/** Ab renderUI: Chips, Pad und Bühne für „… treffen“ synchronisieren. */
function syncSingMatchUI(ex = state.currentExercise) {
  syncSingMatchVoiceChip();
  if (!isSingMatchExercise(ex)) return;
  renderSingMatchPad();
  // Beim ersten Mal (einmal pro Sitzung) direkt die Stimmlage abfragen – nicht bei jeder neuen Aufgabe
  if (!hasChosenSingMatchVoice() && !state.exam?.active && !_singMatch.voicePromptShown && state.currentView === "exercise") {
    _singMatch.voicePromptShown = true;
    // erst nach dem auslösenden Klick öffnen, sonst schließt ihn der Außenklick-Handler sofort wieder
    setTimeout(() => {
      if (state.currentView === "exercise" && isSingMatchExercise() && !hasChosenSingMatchVoice()) {
        toggleSingMatchVoicePopover(true);
      }
    }, 0);
  }
}

function initSingMatchControls() {
  document.getElementById("singVoiceChipBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSingMatchVoicePopover();
  });
  document.getElementById("singDirChipBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    cycleSingIntervalDirection();
  });
}

if (typeof document !== "undefined" && document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSingMatchControls);
} else {
  initSingMatchControls();
}
