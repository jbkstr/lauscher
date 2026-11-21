// =====================================================
// PRAXIS-METRONOM (#viewMetronome)
// =====================================================

const METRONOME_TAP_TIMEOUT_MS = 2200;
const METRONOME_TAP_MIN_INTERVAL_MS = 110;
const METRONOME_TAP_MAX_TIMESTAMPS = 9;

const _metroRuntime = {
  runToken: 0,
  intervalId: null,
  nextNoteTime: 0,
  currentBeatIndex: 0,
  currentSubIndex: 0,
  activeBeatIndex: -1,
  swingLeft: false,
  tapTimestamps: [],
  awaitingPointerClick: false,
  lastPointerUpMs: 0,
  tapPulseTimer: null,
  tapResetTimer: null,
  hitClearTimer: null,
  visualTimers: []
};

function getMetronomeTempoMarking(bpm) {
  const safe = clampMetronomeBpm(bpm);
  if (safe < 52) return tr("Largo (Sehr breit)", "Largo (Very slow)");
  if (safe < 68) return tr("Adagio (Ruhig)", "Adagio (Slow & expressive)");
  if (safe < 88) return tr("Andante (Gehend)", "Andante (Walking pace)");
  if (safe < 112) return tr("Moderato (Mäßig)", "Moderato (Moderate)");
  if (safe < 132) return tr("Allegretto (Beschwingt)", "Allegretto (Moderately fast)");
  if (safe < 164) return tr("Allegro (Lebhaft)", "Allegro (Fast & bright)");
  if (safe < 192) return tr("Vivace (Sehr lebhaft)", "Vivace (Lively)");
  return tr("Presto (Sehr schnell)", "Presto (Very fast)");
}

function cycleMetronomeBeatState(curState) {
  if (curState === "normal") return "accent";
  if (curState === "accent") return "muted";
  return "normal";
}

/**
 * Berechnet aus einer Zeitstempel-Historie ein geglättetes Tap-Tempo in BPM.
 * Reine Funktion für UI-Taps und automatisierte Tests.
 */
function computeTapTempoFromHistory(timestamps, nowMs) {
  const prev = Array.isArray(timestamps) ? timestamps : [];
  const tNow = Number.isFinite(Number(nowMs)) ? Number(nowMs) : Date.now();
  const last = prev.length > 0 ? prev[prev.length - 1] : null;

  if (last !== null && tNow - last < METRONOME_TAP_MIN_INTERVAL_MS) {
    return { timestamps: prev.slice(), bpm: null, tapCount: prev.length, ignoredBounce: true };
  }

  const base = (last !== null && tNow - last > METRONOME_TAP_TIMEOUT_MS) ? [] : prev.slice();
  base.push(tNow);
  const trimmed = base.slice(-METRONOME_TAP_MAX_TIMESTAMPS);

  if (trimmed.length < 2) {
    return { timestamps: trimmed, bpm: null, tapCount: trimmed.length, ignoredBounce: false };
  }

  const intervals = [];
  for (let i = 1; i < trimmed.length; i++) {
    const dt = trimmed[i] - trimmed[i - 1];
    if (dt >= METRONOME_TAP_MIN_INTERVAL_MS && dt <= METRONOME_TAP_TIMEOUT_MS) {
      intervals.push(dt);
    }
  }
  if (intervals.length === 0) {
    return { timestamps: [tNow], bpm: null, tapCount: 1, ignoredBounce: false };
  }

  // Bei 4+ Intervallen sanfte Ausreißer-Bereinigung (Min/Max verwerfen), sonst gerader Mittelwert
  const used = intervals.length >= 4
    ? intervals.slice().sort((a, b) => a - b).slice(1, -1)
    : intervals;
  const avgMs = used.reduce((sum, v) => sum + v, 0) / used.length;
  const bpm = clampMetronomeBpm(60000 / avgMs);
  return { timestamps: trimmed, bpm, tapCount: trimmed.length, ignoredBounce: false };
}

function resetMetronomeStateToDefault() {
  stopMetronome();
  state.metronome = {
    bpm: METRONOME_DEFAULT_BPM,
    beats: getDefaultMeterBeats(4),
    subdivision: 1,
    running: false,
    activeProfileId: "metro_default_4_4",
    mix: sanitizeMetronomeMix(state.profile?.metronomeMix),
    sound: normalizeMetronomeSoundProfile(state.profile?.metronomeSound)
  };
  _metroRuntime.tapTimestamps = [];
  _metroRuntime.activeBeatIndex = -1;
  renderMetronomeView();
}

function syncMetronomeTransportUI() {
  const playBtn = document.getElementById("metroPlayStopBtn");
  const running = Boolean(state.metronome?.running);
  if (playBtn) {
    playBtn.textContent = running
      ? tr("■ Metronom stoppen", "■ Stop Metronome")
      : tr("▶ Metronom starten", "▶ Start Metronome");
    playBtn.classList.toggle("is-playing", running);
    playBtn.classList.toggle("btn-stop", running);
  }
  const track = document.getElementById("metroPendulumTrack");
  if (track) {
    track.classList.toggle("is-running", running);
    if (!running) {
      track.classList.remove("swing-left", "swing-right", "is-accent-hit", "is-muted-hit");
    }
  }
}

function getMetronomeGridTiles() {
  const grid = document.getElementById("metroBeatGrid");
  if (!grid || !grid.children) return [];
  return Array.from(grid.children);
}

function clearMetronomeVisualPulseClasses() {
  if (_metroRuntime.hitClearTimer) {
    clearTimeout(_metroRuntime.hitClearTimer);
    _metroRuntime.hitClearTimer = null;
  }
  getMetronomeGridTiles().forEach(tile => {
    tile?.classList?.remove?.("is-current", "is-beat-hit", "is-sub-hit");
  });
  const tapBtn = document.getElementById("metroTapCircle");
  tapBtn?.classList?.remove?.("is-beat-accent", "is-beat-normal", "is-beat-muted");
  const track = document.getElementById("metroPendulumTrack");
  track?.classList?.remove?.("swing-left", "swing-right", "is-accent-hit", "is-muted-hit");
}

function triggerMetronomeBeatVisual(beatIdx, beatState, subIdx = 0) {
  const beats = state.metronome?.beats || [];
  if (!state.metronome?.running || beatIdx < 0 || beatIdx >= beats.length) return;

  const tiles = getMetronomeGridTiles();
  if (subIdx > 0) {
    const activeTile = tiles[beatIdx];
    if (activeTile?.classList && beatState !== "muted") {
      activeTile.classList.remove("is-sub-hit");
      void activeTile.offsetWidth;
      activeTile.classList.add("is-sub-hit");
    }
    return;
  }

  _metroRuntime.activeBeatIndex = beatIdx;
  tiles.forEach((tile, idx) => {
    if (!tile?.classList) return;
    const isCurrent = idx === beatIdx;
    tile.classList.toggle("is-current", isCurrent);
    tile.classList.remove("is-beat-hit", "is-sub-hit");
    if (isCurrent) {
      void tile.offsetWidth;
      tile.classList.add("is-beat-hit");
    }
  });

  _metroRuntime.swingLeft = !_metroRuntime.swingLeft;
  const track = document.getElementById("metroPendulumTrack");
  if (track?.classList) {
    track.classList.add("is-running");
    track.classList.toggle("swing-left", _metroRuntime.swingLeft);
    track.classList.toggle("swing-right", !_metroRuntime.swingLeft);
    track.classList.toggle("is-accent-hit", beatState === "accent");
    track.classList.toggle("is-muted-hit", beatState === "muted");
  }

  const tapCircle = document.getElementById("metroTapCircle");
  if (tapCircle?.classList) {
    tapCircle.classList.toggle("is-beat-accent", beatState === "accent");
    tapCircle.classList.toggle("is-beat-normal", beatState === "normal");
    tapCircle.classList.toggle("is-beat-muted", beatState === "muted");
  }

  if (_metroRuntime.hitClearTimer) clearTimeout(_metroRuntime.hitClearTimer);
  const pulseMs = Math.max(90, Math.min(260, Math.round((60000 / clampMetronomeBpm(state.metronome.bpm)) * 0.45)));
  _metroRuntime.hitClearTimer = setTimeout(() => {
    _metroRuntime.hitClearTimer = null;
    getMetronomeGridTiles().forEach(tile => tile?.classList?.remove?.("is-beat-hit", "is-sub-hit"));
    tapCircle?.classList?.remove?.("is-beat-accent", "is-beat-normal", "is-beat-muted");
  }, pulseMs);
}

function clearPendingMetronomeVisualTimers() {
  if (Array.isArray(_metroRuntime.visualTimers)) {
    _metroRuntime.visualTimers.forEach(id => clearTimeout(id));
  }
  _metroRuntime.visualTimers = [];
}

function advanceMetronomePointer() {
  const beats = state.metronome.beats || ["accent", "normal", "normal", "normal"];
  const beatCount = Math.max(1, beats.length);
  const offsets = getMetronomeSubOffsets(normalizeMetronomeSubdivision(state.metronome.subdivision));
  const secPerBeat = 60 / clampMetronomeBpm(state.metronome.bpm);
  const curIdx = Math.min(_metroRuntime.currentSubIndex, offsets.length - 1);
  const nextOffset = curIdx + 1 < offsets.length ? offsets[curIdx + 1] : 1;

  _metroRuntime.nextNoteTime += (nextOffset - offsets[curIdx]) * secPerBeat;
  _metroRuntime.currentSubIndex = curIdx + 1;
  if (_metroRuntime.currentSubIndex >= offsets.length) {
    _metroRuntime.currentSubIndex = 0;
    _metroRuntime.currentBeatIndex = (_metroRuntime.currentBeatIndex + 1) % beatCount;
  }
}

function scheduleSingleMetronomeStep(beatIdx, subIdx, whenSec, nowAudioSec, runToken) {
  const beats = state.metronome.beats || ["accent", "normal", "normal", "normal"];
  const beatCount = Math.max(1, beats.length);
  const safeIdx = ((beatIdx % beatCount) + beatCount) % beatCount;
  const beatState = beats[safeIdx] || "normal";

  if (beatState !== "muted" && audioEngine?.isInitialized) {
    const mix = getMetronomeMix();
    const masterVel = sanitizeMetronomeMixValue(mix.master, DEFAULT_METRONOME_MIX.master);
    const vel = subIdx === 0
      ? masterVel * sanitizeMetronomeMixValue(beatState === "accent" ? mix.accent : mix.normal, beatState === "accent" ? DEFAULT_METRONOME_MIX.accent : DEFAULT_METRONOME_MIX.normal)
      : masterVel * sanitizeMetronomeMixValue(mix.normal, DEFAULT_METRONOME_MIX.normal) * 0.38;
    if (vel > 0.001) {
      const kind = resolveMetronomePercussionKind(getMetronomeSoundProfile(), beatState, subIdx);
      audioEngine.triggerPercussion(kind, whenSec, Math.min(1, vel));
    }
  }

  const delayMs = Math.max(0, Math.round((whenSec - nowAudioSec) * 1000));
  if (delayMs <= 6) {
    if (state.metronome.running && _metroRuntime.runToken === runToken) {
      triggerMetronomeBeatVisual(safeIdx, beatState, subIdx);
    }
  } else {
    const vtId = setTimeout(() => {
      _metroRuntime.visualTimers = _metroRuntime.visualTimers.filter(t => t !== vtId);
      if (state.metronome.running && _metroRuntime.runToken === runToken) {
        triggerMetronomeBeatVisual(safeIdx, beatState, subIdx);
      }
    }, delayMs);
    _metroRuntime.visualTimers.push(vtId);
  }
}

function scheduleMetronomeLoop() {
  if (!state.metronome?.running) return;
  const runToken = _metroRuntime.runToken;
  const nowAudio = (typeof audioEngine !== "undefined" && typeof audioEngine.getAudioTime === "function") ? audioEngine.getAudioTime() : 0;
  const lookaheadSec = 0.11;

  if (_metroRuntime.nextNoteTime < nowAudio - 0.5) {
    _metroRuntime.nextNoteTime = nowAudio + 0.02;
  }

  let guard = 0;
  while (state.metronome.running && _metroRuntime.nextNoteTime < nowAudio + lookaheadSec && guard < 16) {
    guard += 1;
    scheduleSingleMetronomeStep(_metroRuntime.currentBeatIndex, _metroRuntime.currentSubIndex, _metroRuntime.nextNoteTime, nowAudio, runToken);
    advanceMetronomePointer();
  }
}

async function startMetronome() {
  unlockWebAudioSync();
  stopPlayback();
  _metroRuntime.runToken += 1;
  const token = _metroRuntime.runToken;
  state.metronome.running = true;
  syncMetronomeTransportUI();

  await ensureAudioReady();
  if (!state.metronome.running || _metroRuntime.runToken !== token) return;

  if (_metroRuntime.intervalId) {
    clearInterval(_metroRuntime.intervalId);
    _metroRuntime.intervalId = null;
  }
  clearPendingMetronomeVisualTimers();

  const nowAudio = (typeof audioEngine !== "undefined" && typeof audioEngine.getAudioTime === "function") ? audioEngine.getAudioTime() : 0;
  _metroRuntime.nextNoteTime = nowAudio + 0.04;
  _metroRuntime.currentBeatIndex = 0;
  _metroRuntime.currentSubIndex = 0;
  _metroRuntime.activeBeatIndex = -1;
  _metroRuntime.swingLeft = false;

  scheduleMetronomeLoop();
  _metroRuntime.intervalId = setInterval(() => {
    scheduleMetronomeLoop();
  }, 25);
}

function stopMetronome() {
  _metroRuntime.runToken += 1;
  if (_metroRuntime.intervalId) {
    clearInterval(_metroRuntime.intervalId);
    _metroRuntime.intervalId = null;
  }
  clearPendingMetronomeVisualTimers();
  _metroRuntime.activeBeatIndex = -1;
  if (state?.metronome) {
    state.metronome.running = false;
  }
  clearMetronomeVisualPulseClasses();
  syncMetronomeTransportUI();
}

function toggleMetronomePlayback() {
  if (state.metronome?.running) {
    stopMetronome();
    return Promise.resolve(false);
  }
  return startMetronome().then(() => Boolean(state.metronome?.running));
}

function openMetronomeBpmEditor() {
  const valEl = document.getElementById("metroBpmValue");
  const inputEl = document.getElementById("metroBpmInput");
  if (!valEl || !inputEl) return;
  inputEl.value = String(clampMetronomeBpm(state.metronome?.bpm));
  valEl.classList.add("hidden");
  inputEl.classList.remove("hidden");
  inputEl.focus?.();
  inputEl.select?.();
}

function closeMetronomeBpmEditor(commit = true) {
  const valEl = document.getElementById("metroBpmValue");
  const inputEl = document.getElementById("metroBpmInput");
  if (!valEl || !inputEl) return;
  const wasOpen = !inputEl.classList.contains("hidden");
  inputEl.classList.add("hidden");
  valEl.classList.remove("hidden");
  if (commit && wasOpen) {
    const parsed = parseInt(String(inputEl.value || "").trim(), 10);
    if (Number.isFinite(parsed)) {
      setMetronomeBpm(parsed, { reschedule: true });
    } else {
      renderMetronomeBpmUI();
    }
  }
}

function renderMetronomeBpmUI() {
  const bpm = clampMetronomeBpm(state.metronome?.bpm);
  const valEl = document.getElementById("metroBpmValue");
  if (valEl) valEl.textContent = String(bpm);
  const inputEl = document.getElementById("metroBpmInput");
  if (inputEl && document?.activeElement !== inputEl) {
    inputEl.value = String(bpm);
    inputEl.classList.add("hidden");
    valEl?.classList.remove("hidden");
  }
  const sliderEl = document.getElementById("metroBpmSlider");
  if (sliderEl) sliderEl.value = String(bpm);
  const nameEl = document.getElementById("metroTempoName");
  if (nameEl) nameEl.textContent = getMetronomeTempoMarking(bpm);
  if (state.currentView === "metronome") {
    state.updateHeaderSubtext();
  }
}

function setMetronomeBpm(nextBpm, options = {}) {
  const clamped = clampMetronomeBpm(nextBpm);
  state.metronome.bpm = clamped;
  renderMetronomeBpmUI();

  // Wenn das Metronom bereits läuft, das nächste geplante Intervall direkt an das neue Tempo anpassen
  if (state.metronome?.running) {
    const nowAudio = (typeof audioEngine !== "undefined" && typeof audioEngine.getAudioTime === "function") ? audioEngine.getAudioTime() : 0;
    const secPerStep = getMetronomeShortestStepSec(normalizeMetronomeSubdivision(state.metronome.subdivision), clamped);
    if (_metroRuntime.nextNoteTime > nowAudio + secPerStep) {
      _metroRuntime.nextNoteTime = nowAudio + secPerStep;
    }
    if (options.reschedule) {
      scheduleMetronomeLoop();
    }
  }
  return clamped;
}

function adjustMetronomeBpm(delta) {
  const step = parseInt(delta, 10) || 0;
  return setMetronomeBpm((state.metronome?.bpm || METRONOME_DEFAULT_BPM) + step);
}

function getCurrentMetronomeClockMs() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now();
  }
  return Date.now();
}

function handleMetronomeTap(customNowMs = null) {
  const hasExplicitNow =
    customNowMs !== null &&
    customNowMs !== undefined &&
    typeof customNowMs !== "boolean" &&
    Number.isFinite(Number(customNowMs));
  const nowMs = hasExplicitNow ? Number(customNowMs) : getCurrentMetronomeClockMs();
  const res = computeTapTempoFromHistory(_metroRuntime.tapTimestamps, nowMs);
  if (res.ignoredBounce) return null;

  _metroRuntime.tapTimestamps = res.timestamps;
  const tapBtn = document.getElementById("metroTapCircle");
  if (tapBtn?.classList) {
    tapBtn.classList.remove("is-tap-pulse");
    tapBtn.classList.add("is-tap-pulse");
    if (_metroRuntime.tapPulseTimer) clearTimeout(_metroRuntime.tapPulseTimer);
    _metroRuntime.tapPulseTimer = setTimeout(() => {
      _metroRuntime.tapPulseTimer = null;
      tapBtn.classList.remove("is-tap-pulse");
    }, 240);
  }

  if (res.bpm !== null) {
    setMetronomeBpm(res.bpm, { reschedule: true });
  }

  const tapSub = document.getElementById("metroTapSub");
  if (tapSub) {
    tapSub.textContent = res.bpm !== null
      ? tr("Tempo tippen", "Tap tempo")
      : tr("Weiter tippen …", "Keep tapping …");
  }

  if (_metroRuntime.tapResetTimer) clearTimeout(_metroRuntime.tapResetTimer);
  _metroRuntime.tapResetTimer = setTimeout(() => {
    _metroRuntime.tapResetTimer = null;
    _metroRuntime.tapTimestamps = [];
    const sub = document.getElementById("metroTapSub");
    if (sub) sub.textContent = tr("Tempo tippen", "Tap tempo");
  }, METRONOME_TAP_TIMEOUT_MS + 150);

  return res.bpm;
}

function syncMetronomeBeatTileAppearance(tile, beatIdx, beatState) {
  if (!tile) return;
  const stateClass = `state-${beatState}`;
  tile.classList.remove("state-normal", "state-accent", "state-muted");
  tile.classList.add(stateClass);
  tile.dataset.beatState = beatState;

  const getLabel = (key, deFallback, enFallback) =>
    (typeof getStaticI18nText === "function" && getStaticI18nText(key)) || tr(deFallback, enFallback);
  const num = beatIdx + 1;
  let glyphHtml = "●";
  let badgeText = getLabel("metro.stateNormal", "Normal", "Normal");
  let stateDesc = tr("Normal", "Normal");
  if (beatState === "accent") {
    glyphHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 17l2-9 6 4 6-4 2 9H4z"/></svg>`;
    badgeText = getLabel("metro.stateAccent", "Akzent", "Accent");
    stateDesc = tr("Akzentuiert", "Accented");
  } else if (beatState === "muted") {
    glyphHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>`;
    badgeText = getLabel("metro.stateMuted", "Stumm", "Mute");
    stateDesc = tr("Stumm geschaltet", "Muted");
  }

  tile.setAttribute?.("aria-label", tf("Zählzeit {n}: {state}", "Beat {n}: {state}", { n: num, state: stateDesc }));
  tile.setAttribute?.("title", tf("Zählzeit {n}: {state} (tippen zum Ändern)", "Beat {n}: {state} (tap to cycle)", { n: num, state: stateDesc }));
  tile.innerHTML = `<span class="metro-beat-num">${num}</span><span class="metro-beat-indicator">${glyphHtml}</span><span class="metro-beat-state-lbl">${escapeHtml(badgeText)}</span>`;
}

function renderMetronomeBeatGrid() {
  const beats = sanitizeMetronomeBeatsArray(state.metronome?.beats);
  state.metronome.beats = beats;
  const sub = normalizeMetronomeSubdivision(state.metronome.subdivision);

  const countEl = document.getElementById("metroBeatCountVal");
  if (countEl) countEl.textContent = String(beats.length);

  document.querySelectorAll("[data-metro-meter]").forEach(btn => {
    const m = parseInt(btn.dataset.metroMeter, 10);
    btn.classList.toggle("active", m === beats.length);
  });

  document.querySelectorAll("[data-metro-subdiv]").forEach(btn => {
    btn.classList.toggle("active", normalizeMetronomeSubdivision(btn.dataset.metroSubdiv) === sub);
  });

  const grid = document.getElementById("metroBeatGrid");
  if (!grid || typeof document.createElement !== "function") return;
  grid.innerHTML = "";

  beats.forEach((beatState, idx) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "metro-beat-tile";
    tile.dataset.metroBeat = String(idx);
    syncMetronomeBeatTileAppearance(tile, idx, beatState);
    if (state.metronome.running && _metroRuntime.activeBeatIndex === idx) {
      tile.classList.add("is-current");
    }
    tile.addEventListener("click", () => {
      toggleMetronomeBeatState(idx);
    });
    grid.appendChild(tile);
  });

  if (state.currentView === "metronome") {
    state.updateHeaderSubtext();
  }
}

function toggleMetronomeBeatState(index) {
  const beats = sanitizeMetronomeBeatsArray(state.metronome?.beats);
  if (index < 0 || index >= beats.length) return null;
  const nextState = cycleMetronomeBeatState(beats[index]);
  beats[index] = nextState;
  state.metronome.beats = beats;
  state.metronome.activeProfileId = null;

  const tiles = getMetronomeGridTiles();
  const tile = tiles[index] || null;
  if (tile) {
    syncMetronomeBeatTileAppearance(tile, index, nextState);
  } else {
    renderMetronomeBeatGrid();
  }
  renderMetronomeProfiles();
  return nextState;
}

function setMetronomeBeatCount(nextCount) {
  const targetCount = Math.max(METRONOME_MIN_BEATS, Math.min(METRONOME_MAX_BEATS, parseInt(nextCount, 10) || 4));
  const cur = sanitizeMetronomeBeatsArray(state.metronome?.beats);
  if (targetCount > cur.length) {
    while (cur.length < targetCount) cur.push("normal");
  } else if (targetCount < cur.length) {
    cur.length = targetCount;
  }
  state.metronome.beats = cur;
  state.metronome.activeProfileId = null;
  if (_metroRuntime.currentBeatIndex >= targetCount) _metroRuntime.currentBeatIndex = 0;
  if (_metroRuntime.activeBeatIndex >= targetCount) _metroRuntime.activeBeatIndex = 0;
  renderMetronomeBeatGrid();
  renderMetronomeProfiles();
  return cur.length;
}

function applyMetronomeMeterPreset(beatCount) {
  const n = Math.max(METRONOME_MIN_BEATS, Math.min(METRONOME_MAX_BEATS, parseInt(beatCount, 10) || 4));
  state.metronome.beats = getDefaultMeterBeats(n);
  state.metronome.activeProfileId = null;
  _metroRuntime.currentBeatIndex = 0;
  _metroRuntime.activeBeatIndex = -1;
  renderMetronomeBeatGrid();
  renderMetronomeProfiles();
  return state.metronome.beats.slice();
}

function setMetronomeSubdivision(sub) {
  const valid = normalizeMetronomeSubdivision(sub);
  state.metronome.subdivision = valid;
  _metroRuntime.currentSubIndex = 0;
  renderMetronomeBeatGrid();
  renderMetronomeProfiles();
  return valid;
}

function renderMetronomeProfiles() {
  const listEl = document.getElementById("metroProfileList");
  const countEl = document.getElementById("metroProfilesCount");
  const profiles = Array.isArray(state.profile?.metronomeProfiles) ? state.profile.metronomeProfiles : [];
  if (countEl) countEl.textContent = String(profiles.length);
  if (!listEl || typeof document.createElement !== "function") return;
  listEl.innerHTML = "";

  if (profiles.length === 0) {
    const empty = document.createElement("p");
    empty.className = "metro-sound-desc";
    empty.textContent = tr(
      "Noch keine Profile gespeichert. Lege oben ein eigenes Metronom-Preset ab!",
      "No profiles saved yet. Store your current metronome setup above!"
    );
    listEl.appendChild(empty);
    return;
  }

  profiles.forEach(prof => {
    const row = document.createElement("div");
    row.className = "metro-profile-row";
    const isActive = state.metronome?.activeProfileId === prof.id;
    row.classList.toggle("is-active", isActive);
    row.dataset.metroProfileId = prof.id;

    const loadBtn = document.createElement("button");
    loadBtn.type = "button";
    loadBtn.className = "metro-profile-load-btn";
    const dotsHtml = (prof.beats || []).map(st => `<span class="metro-pdot is-${st}"></span>`).join("");
    const subTag = prof.subdivision === METRONOME_SHUFFLE
      ? ` · ${tr("Shuffle", "Shuffle")}`
      : (prof.subdivision > 1 ? ` · ${prof.subdivision}×` : "");
    const soundTag = prof.sound ? ` · ${escapeHtml(getMetronomeSoundLabel(prof.sound))}` : "";
    loadBtn.innerHTML = `
      <span class="metro-profile-name">${escapeHtml(prof.name)}</span>
      <span class="metro-profile-meta">
        <span>${prof.bpm} BPM</span>
        <span>·</span>
        <span>${tf("{n} Zählzeiten", "{n} beats", { n: (prof.beats || []).length })}${subTag}${soundTag}</span>
        <span class="metro-profile-dots" aria-hidden="true">${dotsHtml}</span>
      </span>
    `;
    loadBtn.addEventListener("click", () => {
      loadMetronomeProfile(prof.id);
    });

    const actions = document.createElement("div");
    actions.className = "metro-profile-actions";

    const updateBtn = document.createElement("button");
    updateBtn.type = "button";
    updateBtn.className = "metro-profile-icon-btn";
    updateBtn.innerHTML = REFRESH_ICON_SVG;
    updateBtn.title = tr("Aktuelle Werte in diesem Profil speichern", "Update profile with current settings");
    updateBtn.setAttribute?.("aria-label", tr("Profil aktualisieren", "Update profile"));
    updateBtn.addEventListener("click", () => {
      overwriteMetronomeProfile(prof.id);
    });

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "metro-profile-icon-btn is-delete";
    delBtn.textContent = "✕";
    delBtn.title = tr("Profil löschen", "Delete profile");
    delBtn.setAttribute?.("aria-label", tr("Profil löschen", "Delete profile"));
    delBtn.addEventListener("click", () => {
      deleteMetronomeProfile(prof.id);
    });

    actions.appendChild(updateBtn);
    actions.appendChild(delBtn);
    row.appendChild(loadBtn);
    row.appendChild(actions);
    listEl.appendChild(row);
  });
}

function saveCurrentMetronomeProfile(nameOverride = null) {
  if (!state.profile) return null;
  if (!Array.isArray(state.profile.metronomeProfiles)) {
    state.profile.metronomeProfiles = [];
  }
  const inputEl = document.getElementById("metroProfileNameInput");
  const rawName = nameOverride !== null && nameOverride !== undefined
    ? String(nameOverride)
    : String(inputEl?.value || "");
  const beats = sanitizeMetronomeBeatsArray(state.metronome?.beats);
  const bpm = clampMetronomeBpm(state.metronome?.bpm);
  const sub = normalizeMetronomeSubdivision(state.metronome?.subdivision);
  const cleanName = rawName.trim().slice(0, 32) || `${beats.length}/4 · ${bpm} BPM`;

  const newEntry = sanitizeMetronomeProfileEntry({
    id: `metro_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name: cleanName,
    bpm,
    beats,
    subdivision: sub,
    sound: getMetronomeSoundProfile()
  }, state.profile.metronomeProfiles.length);

  state.profile.metronomeProfiles = [newEntry, ...state.profile.metronomeProfiles].slice(0, 16);
  state.metronome.activeProfileId = newEntry.id;
  if (inputEl && nameOverride === null) inputEl.value = "";
  saveUserProfile(state.profile);
  renderMetronomeProfiles();
  return newEntry;
}

function loadMetronomeProfile(profileId) {
  const list = state.profile?.metronomeProfiles || [];
  const found = list.find(p => p.id === profileId);
  if (!found) return false;
  state.metronome.bpm = clampMetronomeBpm(found.bpm);
  state.metronome.beats = sanitizeMetronomeBeatsArray(found.beats);
  state.metronome.subdivision = normalizeMetronomeSubdivision(found.subdivision);
  state.metronome.activeProfileId = found.id;
  if (found.sound && METRONOME_SOUND_PROFILES.includes(found.sound)) {
    state.metronome.sound = found.sound;
    if (state.profile) {
      state.profile.metronomeSound = found.sound;
      saveUserProfile(state.profile);
    }
  }
  _metroRuntime.currentBeatIndex = 0;
  _metroRuntime.currentSubIndex = 0;
  renderMetronomeView();
  return true;
}

function overwriteMetronomeProfile(profileId) {
  const list = state.profile?.metronomeProfiles || [];
  const idx = list.findIndex(p => p.id === profileId);
  if (idx === -1) return false;
  const existing = list[idx];
  list[idx] = sanitizeMetronomeProfileEntry({
    ...existing,
    bpm: clampMetronomeBpm(state.metronome?.bpm),
    beats: sanitizeMetronomeBeatsArray(state.metronome?.beats),
    subdivision: state.metronome?.subdivision || 1,
    sound: getMetronomeSoundProfile()
  }, idx);
  state.metronome.activeProfileId = list[idx].id;
  saveUserProfile(state.profile);
  renderMetronomeProfiles();
  return true;
}

function deleteMetronomeProfile(profileId) {
  if (!state.profile || !Array.isArray(state.profile.metronomeProfiles)) return false;
  const before = state.profile.metronomeProfiles.length;
  state.profile.metronomeProfiles = state.profile.metronomeProfiles.filter(p => p.id !== profileId);
  if (state.metronome.activeProfileId === profileId) {
    state.metronome.activeProfileId = null;
  }
  saveUserProfile(state.profile);
  renderMetronomeProfiles();
  return state.profile.metronomeProfiles.length < before;
}

const METRONOME_MIX_SLIDERS = [
  { key: "master", sliderId: "metroMasterVolSlider", valId: "metroMasterVolVal" },
  { key: "accent", sliderId: "metroAccentVolSlider", valId: "metroAccentVolVal" },
  { key: "normal", sliderId: "metroNormalVolSlider", valId: "metroNormalVolVal" }
];

function getMetronomeMix() {
  if (!state.metronome.mix) {
    state.metronome.mix = sanitizeMetronomeMix(state.profile?.metronomeMix);
  }
  return state.metronome.mix;
}

function syncMetronomeVolumeUI() {
  const mix = getMetronomeMix();
  METRONOME_MIX_SLIDERS.forEach(({ key, sliderId, valId }) => {
    const val = sanitizeMetronomeMixValue(mix[key], DEFAULT_METRONOME_MIX[key]);
    const slider = document.getElementById(sliderId);
    if (slider) slider.value = String(val);
    const valEl = document.getElementById(valId);
    if (valEl) valEl.textContent = `${Math.round(val * 100)}%`;
  });
}

function setMetronomeMixValue(key, rawValue) {
  if (!Object.prototype.hasOwnProperty.call(DEFAULT_METRONOME_MIX, key)) return;
  const nextVal = sanitizeMetronomeMixValue(rawValue, DEFAULT_METRONOME_MIX[key]);
  const mix = { ...getMetronomeMix(), [key]: nextVal };
  state.metronome.mix = mix;
  if (state.profile) {
    state.profile.metronomeMix = { ...mix };
    saveUserProfile(state.profile);
  }
  syncMetronomeVolumeUI();
}

function getMetronomeSoundProfile() {
  if (!state.metronome?.sound) {
    state.metronome.sound = normalizeMetronomeSoundProfile(state.profile?.metronomeSound);
  }
  return normalizeMetronomeSoundProfile(state.metronome.sound);
}

function syncMetronomeSoundUI() {
  const active = getMetronomeSoundProfile();
  const badgeEl = document.getElementById("metroActiveSoundBadge");
  if (badgeEl) {
    badgeEl.textContent = getMetronomeSoundLabel(active);
  }
  document.querySelectorAll("[data-metro-sound-slot]").forEach(btn => {
    const isMatch = btn.dataset?.metroSoundSlot === active;
    btn.classList?.toggle("active", isMatch);
    btn.setAttribute?.("aria-pressed", isMatch ? "true" : "false");
  });
}

function previewMetronomeSound(soundProfile) {
  if (state.metronome?.running) return;
  if (typeof unlockWebAudioSync === "function") unlockWebAudioSync();
  if (typeof ensureAudioReady !== "function") return;
  const targetSound = normalizeMetronomeSoundProfile(soundProfile);
  ensureAudioReady().then(() => {
    if (state.metronome?.running || !audioEngine?.isInitialized) return;
    const mix = getMetronomeMix();
    const vel = sanitizeMetronomeMixValue(mix.master, DEFAULT_METRONOME_MIX.master)
      * sanitizeMetronomeMixValue(mix.accent, DEFAULT_METRONOME_MIX.accent);
    if (vel > 0.001) {
      const kind = resolveMetronomePercussionKind(targetSound, "accent", 0);
      audioEngine.triggerPercussion(kind, null, Math.min(1, vel));
    }
  }).catch(() => {});
}

function setMetronomeSoundProfile(soundKey, options = {}) {
  const valid = normalizeMetronomeSoundProfile(soundKey);
  state.metronome.sound = valid;
  if (options.save !== false && state.profile) {
    state.profile.metronomeSound = valid;
    saveUserProfile(state.profile);
  }
  syncMetronomeSoundUI();
  if (options.preview) {
    previewMetronomeSound(valid);
  }
  return valid;
}

function renderMetronomeView() {
  renderMetronomeBpmUI();
  renderMetronomeBeatGrid();
  syncMetronomeVolumeUI();
  renderMetronomeProfiles();
  syncMetronomeSoundUI();
  syncMetronomeTransportUI();
}

function openMetronomeView(returnView = "tools") {
  state.metronomeReturnView = returnView;
  _metroRuntime.tapTimestamps = [];
  const tapSub = document.getElementById("metroTapSub");
  if (tapSub) tapSub.textContent = tr("Tempo tippen", "Tap tempo");
  switchView("metronome");
}


function initMetronomeEventListeners() {
  const tapCircle = document.getElementById("metroTapCircle");
  if (tapCircle && !tapCircle._metroBound) {
    tapCircle._metroBound = true;
    tapCircle.addEventListener("pointerdown", (e) => {
      if (e?.button !== undefined && e.button !== 0) return;
      _metroRuntime.awaitingPointerClick = true;
      handleMetronomeTap();
    });
    tapCircle.addEventListener("pointerup", () => {
      _metroRuntime.lastPointerUpMs = Date.now();
    });
    tapCircle.addEventListener("pointercancel", () => {
      _metroRuntime.awaitingPointerClick = false;
    });
    tapCircle.addEventListener("click", () => {
      if (_metroRuntime.awaitingPointerClick) {
        _metroRuntime.awaitingPointerClick = false;
        if (Date.now() - _metroRuntime.lastPointerUpMs < 400) return;
      }
      handleMetronomeTap();
    });
  }

  document.getElementById("metroBpmValue")?.addEventListener("click", () => {
    openMetronomeBpmEditor();
  });

  const bpmInputEl = document.getElementById("metroBpmInput");
  if (bpmInputEl) {
    bpmInputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault?.();
        closeMetronomeBpmEditor(true);
      } else if (e.key === "Escape") {
        e.preventDefault?.();
        closeMetronomeBpmEditor(false);
      }
    });
    bpmInputEl.addEventListener("blur", () => {
      closeMetronomeBpmEditor(true);
    });
  }

  document.getElementById("metroBpmSlider")?.addEventListener("input", (e) => {
    setMetronomeBpm(parseInt(e.target?.value, 10) || METRONOME_DEFAULT_BPM);
  });

  [
    ["metroBpmMinus5Btn", -5],
    ["metroBpmMinusBtn", -1],
    ["metroBpmPlusBtn", 1],
    ["metroBpmPlus5Btn", 5]
  ].forEach(([id, delta]) => {
    document.getElementById(id)?.addEventListener("click", () => adjustMetronomeBpm(delta));
  });

  document.getElementById("metroPlayStopBtn")?.addEventListener("click", () => {
    toggleMetronomePlayback();
  });

  document.getElementById("metroBeatDecBtn")?.addEventListener("click", () => {
    setMetronomeBeatCount((state.metronome?.beats?.length || 4) - 1);
  });
  document.getElementById("metroBeatIncBtn")?.addEventListener("click", () => {
    setMetronomeBeatCount((state.metronome?.beats?.length || 4) + 1);
  });

  document.querySelectorAll("[data-metro-meter]").forEach(btn => {
    btn.addEventListener("click", () => {
      applyMetronomeMeterPreset(parseInt(btn.dataset.metroMeter, 10));
    });
  });

  document.querySelectorAll("[data-metro-subdiv]").forEach(btn => {
    btn.addEventListener("click", () => {
      setMetronomeSubdivision(btn.dataset.metroSubdiv);
    });
  });

  METRONOME_MIX_SLIDERS.forEach(({ key, sliderId }) => {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    slider.addEventListener("input", (e) => {
      setMetronomeMixValue(key, parseFloat(e?.target?.value ?? slider.value));
    });
  });

  document.getElementById("metroProfileSaveForm")?.addEventListener("submit", (e) => {
    e?.preventDefault?.();
    saveCurrentMetronomeProfile();
  });
  document.getElementById("metroSaveProfileBtn")?.addEventListener("click", () => {
    saveCurrentMetronomeProfile();
  });

  document.querySelectorAll("[data-metro-sound-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      setMetronomeSoundProfile(btn.dataset.metroSoundSlot, { save: true, preview: true });
    });
  });
}

