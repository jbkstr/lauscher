// =====================================================
// EINSING-HELFER / VOCAL WARMUP ENGINE (#viewWarmup)
// =====================================================

const WARMUP_KEY_CODES_BY_PC = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const WARMUP_FLAT_PITCH_CLASSES = new Set([1, 3, 5, 8, 10]);

const WARMUP_VOICE_RANGES = {
  mixed:   { id: "mixed",   baseMidi: 60, de: "Chor-Mitte", en: "Choir Mid", subDe: "c¹–e²", subEn: "C4–E5" },
  soprano: { id: "soprano", baseMidi: 62, de: "Sopran",     en: "Soprano",   subDe: "d¹–a²", subEn: "D4–A5" },
  alto:    { id: "alto",    baseMidi: 57, de: "Alt",        en: "Alto",      subDe: "a–d²",  subEn: "A3–D5" },
  tenor:   { id: "tenor",   baseMidi: 48, de: "Tenor",      en: "Tenor",     subDe: "c–g¹",  subEn: "C3–G4" },
  bass:    { id: "bass",    baseMidi: 43, de: "Bass",       en: "Bass",      subDe: "G–d¹",  subEn: "G2–D4" }
};

const WARMUP_SOUND_MODES = {
  piano:         { id: "piano",       de: "Klavier",         en: "Piano" },
  "piano-voice": { id: "piano-voice", de: "Klavier + Stimme",en: "Piano + Voice" },
  voice:         { id: "voice",       de: "Stimme",          en: "Voice" }
};

const WARMUP_PHASES = [
  { id: "breath",    num: 1, cls: "phase-breath",    shortDe: "1 Atem",     shortEn: "1 Breath",    labelDe: "PHASE 1 • ATEM & KÖRPER",       labelEn: "PHASE 1 • BREATH & BODY" },
  { id: "resonance", num: 2, cls: "phase-resonance", shortDe: "2 Summen",   shortEn: "2 Humming",   labelDe: "PHASE 2 • RESONANZ & STIMMSITZ", labelEn: "PHASE 2 • RESONANCE & TONE" },
  { id: "arpeggio",  num: 3, cls: "phase-arpeggio",  shortDe: "3 Arpeggio", shortEn: "3 Arpeggios", labelDe: "PHASE 3 • ARPEGGIOS & UMFANG",  labelEn: "PHASE 3 • ARPEGGIOS & RANGE" },
  { id: "choir",     num: 4, cls: "phase-choir",     shortDe: "4 Chorklang",shortEn: "4 Choir",     labelDe: "PHASE 4 • VOKALE & CHORKLANG",  labelEn: "PHASE 4 • VOWELS & BLEND" }
];

const WARMUP_STEP_CATALOG = {
  "breath-circle": {
    id: "breath-circle",
    phaseId: "breath",
    kind: "breath-orb",
    titleDe: "Ruhige Bauchatmung",
    titleEn: "Calm Diaphragmatic Breathing",
    syllableDe: "ffff · ssss",
    syllableEn: "ffff · ssss",
    hintDe: "Schultern entspannt lassen – sanft in den Bauch einatmen und gleichmäßig auf ffff/ssss ausströmen.",
    hintEn: "Keep shoulders relaxed — breathe low into the belly and exhale steadily on ffff/ssss.",
    cycles: 4,
    cyclePhases: [
      { cue: "inhale", sec: 4.0, cueNoteOffset: 7,    de: "Einatmen", en: "Inhale",  detailDe: "Tief in den Bauch einatmen…",         detailEn: "Inhale deeply into the belly…" },
      { cue: "hold",   sec: 1.5, cueNoteOffset: null, de: "Halten",   en: "Hold",    detailDe: "Kurz weich und offen halten",         detailEn: "Hold gently without tension" },
      { cue: "exhale", sec: 5.5, cueNoteOffset: 0,    de: "Ausatmen", en: "Exhale",  detailDe: "Gleichmäßig ausströmen: ffff / ssss", detailEn: "Exhale steadily: ffff / ssss" },
      { cue: "rest",   sec: 1.5, cueNoteOffset: null, de: "Lösen",    en: "Release", detailDe: "Bauchdecke lösen & nachspüren",       detailEn: "Release & soften between cycles" }
    ]
  },
  "diaphragm-pulse": {
    id: "diaphragm-pulse",
    phaseId: "breath",
    kind: "breath-pulse",
    titleDe: "Zwerchfell-Impulse",
    titleEn: "Diaphragm Pulses",
    syllableDe: "P – T – K – Sch!",
    syllableEn: "P – T – K – Sh!",
    hintDe: "Kurze, federnde Bauchimpulse im Puls setzen – zwischen den Takten locker einatmen.",
    hintEn: "Articulate crisp rhythmic pulses from the core — let breath drop back in between bars.",
    rounds: 5,
    pulseCount: 4,
    restBeats: 2.5
  },
  "humming-wave": {
    id: "humming-wave",
    phaseId: "resonance",
    kind: "vocal-pattern",
    titleDe: "Summen & Lippenflattern",
    titleEn: "Humming & Lip Trills",
    syllableDe: "Mmm / Brrrr",
    syllableEn: "Mmm / Brrrr",
    degreesText: "1 – 2 – 3 – 2 – 1",
    hintDe: "Weich nach vorne an die Lippen summen oder locker blubbern lassen (SOVT).",
    hintEn: "Hum gently forward to the lips or flutter with a relaxed lip trill (SOVT).",
    semitones: [0, 2, 4, 2, 0],
    noteBeats: [0.9, 0.9, 0.9, 0.9, 1.75],
    keyOffsets: [0, 1, 2, 3, 4, 5, 6],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.85,
    staccato: false
  },
  "fifth-sigh": {
    id: "fifth-sigh",
    phaseId: "resonance",
    kind: "vocal-pattern",
    titleDe: "Seufzer-Abgang (Quinte)",
    titleEn: "Descending 5th Sigh",
    syllableDe: "Mjaa – Nuu",
    syllableEn: "Myaa – Noo",
    degreesText: "5 – 4 – 3 – 2 – 1",
    hintDe: "Mit einem sanften Seufzer von oben weich durch das Register gleiten – Kiefer bleibt locker.",
    hintEn: "Glide gently downward like a relaxed sigh — keep the jaw soft and effortless.",
    semitones: [7, 5, 4, 2, 0],
    noteBeats: [1.0, 0.9, 0.9, 0.9, 1.85],
    keyOffsets: [5, 4, 3, 2, 1, 0],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.85,
    staccato: false
  },
  "triad-syllables": {
    id: "triad-syllables",
    phaseId: "arpeggio",
    kind: "vocal-pattern",
    titleDe: "Dreiklangs-Arpeggio",
    titleEn: "Triad Syllable Arpeggio",
    syllableDe: "Ma – Me – Mi – Mo – Mu",
    syllableEn: "Mah – Meh – Mee – Moh – Moo",
    degreesText: "1 – 3 – 5 – 3 – 1",
    hintDe: "Vokale auf demselben Stimmstrom verbinden, bei jedem Halbton frisch nach oben denken.",
    hintEn: "Link vowels on one steady airflow; think gently upward as each half-step rises.",
    semitones: [0, 4, 7, 4, 0],
    noteBeats: [0.85, 0.85, 0.9, 0.85, 1.7],
    keyOffsets: [0, 1, 2, 3, 4, 5, 6, 7],
    cueChordBeats: 1.25,
    breathGapBeats: 0.7,
    postRestBeats: 0.8,
    staccato: false
  },
  "octave-staccato": {
    id: "octave-staccato",
    phaseId: "arpeggio",
    kind: "vocal-pattern",
    titleDe: "Oktav-Arpeggio (federnd)",
    titleEn: "Bouncy Octave Arpeggio",
    syllableDe: "Ha – ha – ha – ha!",
    syllableEn: "Ha – ha – ha – ha!",
    degreesText: "1 – 3 – 5 – 8 – 5 – 3 – 1",
    hintDe: "Leicht und präzise aus dem Zwerchfell abfedern – oben offen und ohne Druck klingen.",
    hintEn: "Bounce lightly from the core — let the top octave ring open without pushing.",
    semitones: [0, 4, 7, 12, 7, 4, 0],
    noteBeats: [0.65, 0.65, 0.65, 0.95, 0.65, 0.65, 1.55],
    keyOffsets: [2, 3, 4, 5, 6, 7],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.85,
    staccato: true
  },
  "cool-down-arp": {
    id: "cool-down-arp",
    phaseId: "arpeggio",
    kind: "vocal-pattern",
    titleDe: "Lagen-Ausgleich (Abwärts)",
    titleEn: "Register Cool-Down (Descending)",
    syllableDe: "Joo – oo – ooh",
    syllableEn: "Yoh – oh – ooh",
    degreesText: "8 – 5 – 3 – 1",
    hintDe: "Kopfklang behutsam in die entspannte Mittellage mitnehmen und weich abrunden.",
    hintEn: "Carry head resonance smoothly back down into a relaxed middle voice.",
    semitones: [12, 7, 4, 0],
    noteBeats: [1.0, 0.9, 0.9, 1.85],
    keyOffsets: [6, 5, 4, 3, 2],
    cueChordBeats: 1.2,
    breathGapBeats: 0.7,
    postRestBeats: 0.85,
    staccato: false
  },
  "vowel-blend": {
    id: "vowel-blend",
    phaseId: "choir",
    kind: "vowel-blend",
    titleDe: "Vokal-Wandern (Chor-Blend)",
    titleEn: "Vowel Morph & Blend",
    syllableDe: "U → O → A → E → I",
    syllableEn: "Oo → Oh → Ah → Eh → Ee",
    degreesText: "1 • Vokalausgleich",
    hintDe: "Auf einem liegenden Ton weich von dunklem U bis hellem I übergehen, ohne dass der Klang abreißt.",
    hintEn: "Morph smoothly across all five vowels on one steady pitch without breaking the line.",
    vowelsDe: ["Uuuu…", "Oooo…", "Aaaa…", "Eeee…", "Iiii…"],
    vowelsEn: ["Oooo…", "Ohhh…", "Ahhh…", "Ehhh…", "Eeee…"],
    vowelsFr: ["Ouuu…", "Oooo…", "Aaaa…", "Éééé…", "Iiii…"],
    vowelsEs: ["Uuuu…", "Oooo…", "Aaaa…", "Eeee…", "Iiii…"],
    vowelsPl: ["Uuuu…", "Oooo…", "Aaaa…", "Eeee…", "Iiii…"],
    vowelsUk: ["Уууу…", "Оооо…", "Аааа…", "Ееее…", "Іііі…"],
    vowelsUr: ["اُووو…", "اووو…", "آااا…", "اےےے…", "اِییی…"],
    keyOffsets: [0, 2, 4, 5],
    cueChordBeats: 1.35,
    breathGapBeats: 0.8,
    vowelStepBeats: 1.9,
    postRestBeats: 1.0
  },
  "choir-cadence": {
    id: "choir-cadence",
    phaseId: "choir",
    kind: "choir-cadence",
    titleDe: "SATB Chor-Blend & Schlusskadenz",
    titleEn: "SATB Choir Blend & Cadence",
    syllableDe: "Nuu / Ahh (SATB)",
    syllableEn: "Noo / Ahh (SATB)",
    degreesText: "Bass → Tenor → Alt → Sopran",
    hintDe: "Jede Stimme rastet nacheinander in den reinen Schlussakkord ein – ruhig lauschen und einschwingen.",
    hintEn: "Hear each voice lock in from root up to 3rd and 8ve — blend smoothly into just intonation.",
    keyOffsets: [0, 2, 4],
    cadenceBeat: 1.35,
    stackStepBeats: 1.15,
    holdBeats: 4.5,
    postRestBeats: 1.4
  }
};

const WARMUP_PRESETS = [
  {
    id: "full-5min",
    badge: "5:00",
    circle: "circle-sage",
    titleDe: "5-Minuten Komplett-Einsingen",
    titleEn: "5-Min Complete Vocal Warmup",
    descDe: "Alle 4 Phasen: Bauchatmung, Summen, modulierte Arpeggios & SATB-Chorklang",
    descEn: "All 4 phases: deep breathing, humming, modulated arpeggios & SATB blend",
    steps: [
      { id: "breath-circle" },
      { id: "diaphragm-pulse" },
      { id: "humming-wave" },
      { id: "fifth-sigh" },
      { id: "triad-syllables" },
      { id: "octave-staccato" },
      { id: "cool-down-arp" },
      { id: "vowel-blend" },
      { id: "choir-cadence" }
    ]
  },
  {
    id: "quick-3min",
    badge: "3:00",
    circle: "circle-lilac",
    titleDe: "Kompakt-Warmup (ca. 3 Min.)",
    titleEn: "Compact Warmup (~3 Min.)",
    descDe: "Kurzer Start für die Unterrichtsstunde: Atem, Summen, Dreiklang & Chorklang",
    descEn: "Fast lesson opener: breathing, humming, triad syllables & closing choir blend",
    steps: [
      { id: "breath-circle", cycles: 3 },
      { id: "humming-wave", keyOffsets: [0, 1, 2, 3, 4, 5, 6] },
      { id: "fifth-sigh", keyOffsets: [5, 4, 3, 2, 1] },
      { id: "triad-syllables" },
      { id: "vowel-blend", keyOffsets: [0, 2] },
      { id: "choir-cadence", keyOffsets: [0, 2] }
    ]
  },
  {
    id: "arpeggio-focus",
    badge: "1–3–5–8",
    circle: "circle-peach node-circle-compact node-circle-nowrap",
    titleDe: "Arpeggio & Register-Training",
    titleEn: "Arpeggio & Register Drill",
    descDe: "Fokus auf Beweglichkeit, Staccato-Oktaven und sanften Lagen-Ausgleich",
    descEn: "Focused agility work: humming, triad vows, staccato octaves & cool-down",
    steps: [
      { id: "humming-wave", keyOffsets: [0, 2, 4] },
      { id: "triad-syllables" },
      { id: "octave-staccato" },
      { id: "cool-down-arp" },
      { id: "choir-cadence", keyOffsets: [0] }
    ]
  },
  {
    id: "breath-choir",
    badge: "SATB",
    circle: "circle-sage",
    titleDe: "Chor-Atem & Intonation",
    titleEn: "Choir Breath & Intonation",
    descDe: "Atemstütze, Zwerchfell-Impulse, Vokalausgleich und reiner Chorklang",
    descEn: "Breath support, core pulses, vowel morphing & pure choral chord tuning",
    steps: [
      { id: "breath-circle" },
      { id: "diaphragm-pulse" },
      { id: "humming-wave", keyOffsets: [0, 1, 2, 3] },
      { id: "vowel-blend" },
      { id: "choir-cadence" }
    ]
  }
];

function getLocalizedWarmupPreset(presetId = state?.warmup?.presetId) {
  const raw = WARMUP_PRESETS.find(p => p.id === presetId) || WARMUP_PRESETS[0];
  return {
    ...raw,
    title: tr(raw.titleDe, raw.titleEn),
    desc: tr(raw.descDe, raw.descEn)
  };
}

function getLocalizedWarmupVoiceRange(voiceId = state?.warmup?.voiceRange) {
  const raw = WARMUP_VOICE_RANGES[voiceId] || WARMUP_VOICE_RANGES.mixed;
  return {
    ...raw,
    label: tr(raw.de, raw.en),
    sub: tr(raw.subDe, raw.subEn)
  };
}

function getLocalizedWarmupSoundMode(soundId = state?.warmup?.soundMode) {
  const raw = WARMUP_SOUND_MODES[soundId] || WARMUP_SOUND_MODES["piano-voice"];
  return { ...raw, label: tr(raw.de, raw.en) };
}

function getWarmupStepsForPreset(presetId = state?.warmup?.presetId) {
  const preset = WARMUP_PRESETS.find(p => p.id === presetId) || WARMUP_PRESETS[0];
  return preset.steps.map(entry => {
    const base = WARMUP_STEP_CATALOG[entry.id];
    return { ...base, ...entry };
  });
}

function getWarmupPhaseInfo(phaseId) {
  const raw = WARMUP_PHASES.find(p => p.id === phaseId) || WARMUP_PHASES[0];
  return {
    ...raw,
    short: tr(raw.shortDe, raw.shortEn),
    label: tr(raw.labelDe, raw.labelEn)
  };
}

function getWarmupKeyNameFromMidi(midi) {
  const pc = ((midi % 12) + 12) % 12;
  const keyCode = WARMUP_KEY_CODES_BY_PC[pc] || "C";
  return {
    keyCode,
    keyName: getKeyDisplayName(keyCode),
    preferFlat: WARMUP_FLAT_PITCH_CLASSES.has(pc)
  };
}

function getWarmupStepRoundCount(step) {
  if (!step) return 1;
  if (step.kind === "breath-orb") return 1;
  if (step.kind === "breath-pulse") return step.rounds || 4;
  return Array.isArray(step.keyOffsets) && step.keyOffsets.length ? step.keyOffsets.length : 1;
}

function getWarmupRoundDurationSec(step, bpm = WARMUP_DEFAULT_BPM) {
  const beatSec = 60 / Math.max(60, Math.min(140, Number(bpm) || WARMUP_DEFAULT_BPM));
  if (step.kind === "breath-orb") {
    const oneCycle = (step.cyclePhases || []).reduce((sum, p) => sum + p.sec, 0);
    return (step.cycles || 3) * oneCycle;
  }
  if (step.kind === "breath-pulse") {
    return ((step.pulseCount || 4) + (step.restBeats || 2.5)) * beatSec;
  }
  if (step.kind === "vowel-blend") {
    const vowelsLen = (step.vowelsDe || []).length || 5;
    return ((step.cueChordBeats || 1.35) + (step.breathGapBeats || 0.8) + vowelsLen * (step.vowelStepBeats || 1.9) + (step.postRestBeats || 1.0)) * beatSec;
  }
  if (step.kind === "choir-cadence") {
    return (4 * (step.cadenceBeat || 1.35) + 4 * (step.stackStepBeats || 1.15) + (step.holdBeats || 4.5) + (step.postRestBeats || 1.4)) * beatSec;
  }
  const notesBeats = (step.noteBeats || []).reduce((sum, b) => sum + b, 0);
  return ((step.cueChordBeats || 1.25) + (step.breathGapBeats || 0.75) + notesBeats + (step.postRestBeats || 0.85)) * beatSec;
}

function getWarmupRemainingSec(w = state.warmup) {
  const steps = getWarmupStepsForPreset(w?.presetId);
  const bpm = w?.bpm || WARMUP_DEFAULT_BPM;
  const sIdx = Math.max(0, Math.min(steps.length, w?.stepIndex || 0));
  if (w?.status === "completed") return 0;

  let totalSec = 0;
  for (let i = sIdx; i < steps.length; i++) {
    const step = steps[i];
    const roundCount = getWarmupStepRoundCount(step);
    const roundSec = getWarmupRoundDurationSec(step, bpm);
    const startRound = i === sIdx ? Math.max(0, Math.min(roundCount - 1, w?.keyOffsetIndex || 0)) : 0;
    totalSec += (roundCount - startRound) * roundSec;
  }
  return Math.max(0, Math.round(totalSec));
}

function getWarmupTonicMidi(step, roundIdx = 0, w = state.warmup) {
  const voiceDef = getLocalizedWarmupVoiceRange(w?.voiceRange);
  const offset = Array.isArray(step?.keyOffsets) && step.keyOffsets.length > 0
    ? step.keyOffsets[Math.max(0, Math.min(step.keyOffsets.length - 1, roundIdx))]
    : 0;
  const rawMidi = voiceDef.baseMidi + offset + (w?.transposeShift || 0);
  return Math.max(36, Math.min(82, rawMidi));
}

function clearWarmupTimers() {
  const w = state.warmup;
  if (!w) return;
  w.token += 1;
  if (w.timerId !== null) {
    clearTimeout(w.timerId);
    w.timerId = null;
  }
  if (w.tickIntervalId !== null) {
    clearInterval(w.tickIntervalId);
    w.tickIntervalId = null;
  }
}

function scheduleWarmupCallback(fn, delayMs, expectedToken) {
  const w = state.warmup;
  if (!w) return;
  if (w.timerId !== null) {
    clearTimeout(w.timerId);
    w.timerId = null;
  }
  w.timerId = setTimeout(() => {
    w.timerId = null;
    if (!state.warmup || state.warmup.token !== expectedToken || state.warmup.status !== "running" || state.currentView !== "warmup") {
      return;
    }
    fn(expectedToken);
  }, Math.max(0, Math.round(delayMs)));
}

function toggleWarmupPopover(popoverId, btnId) {
  const target = document.getElementById(popoverId);
  if (!target) return;
  const wasHidden = target.classList.contains("hidden");
  closeTransientPopovers();
  if (wasHidden) {
    target.classList.remove("hidden");
    document.getElementById(btnId)?.classList.add("chip-open");
  }
}

function renderWarmupKeyboard(tonicMidi, activeMidis = []) {
  const wrap = document.getElementById("warmupKeyboardWrap");
  if (!wrap) return;

  const activeSet = new Set(Array.isArray(activeMidis) ? activeMidis : []);
  const startBase = Math.max(36, Math.min(72, (Number.isFinite(tonicMidi) ? tonicMidi : 60) - 2));
  const firstWhite = prevWhiteMidi(startBase);

  const whiteKeys = [];
  const blackKeys = [];
  let m = firstWhite;
  while (whiteKeys.length < 15 && m <= 96) {
    if (isWhiteMidi(m)) {
      whiteKeys.push({ midi: m, label: getWhiteNoteLabel(m % 12) });
    } else {
      blackKeys.push({ midi: m, afterWhiteIdx: whiteKeys.length - 1 });
    }
    m += 1;
  }

  const kb = document.createElement("div");
  kb.className = "warmup-kb";

  whiteKeys.forEach(wk => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "warmup-kb-white";
    btn.id = `warmupKey_${wk.midi}`;
    btn.dataset.midi = wk.midi;
    if (wk.midi === tonicMidi) btn.classList.add("is-tonic");
    if (activeSet.has(wk.midi)) btn.classList.add("is-active");

    const pc = ((wk.midi % 12) + 12) % 12;
    if (pc === 0 || wk.midi === tonicMidi) {
      const oct = Math.floor(wk.midi / 12) - 1;
      const lbl = document.createElement("span");
      lbl.className = "warmup-kb-note";
      lbl.textContent = pc === 0 ? `${wk.label}${oct}` : wk.label;
      btn.appendChild(lbl);
    }

    btn.addEventListener("click", () => auditionWarmupKeyboardNote(wk.midi));
    kb.appendChild(btn);
  });

  const whiteCount = whiteKeys.length || 15;
  const blackWidthPct = (100 / whiteCount) * 0.64;

  blackKeys.forEach(bk => {
    if (bk.afterWhiteIdx < 0 || bk.afterWhiteIdx >= whiteCount - 1) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "warmup-kb-black";
    btn.id = `warmupKey_${bk.midi}`;
    btn.dataset.midi = bk.midi;
    btn.style.left = `${((bk.afterWhiteIdx + 1) / whiteCount) * 100}%`;
    btn.style.width = `${blackWidthPct}%`;
    if (bk.midi === tonicMidi) btn.classList.add("is-tonic");
    if (activeSet.has(bk.midi)) btn.classList.add("is-active");

    btn.addEventListener("click", () => auditionWarmupKeyboardNote(bk.midi));
    kb.appendChild(btn);
  });

  wrap.innerHTML = "";
  wrap.appendChild(kb);
}

function updateWarmupKeyboardHighlights(tonicMidi, activeMidis = []) {
  const wrap = document.getElementById("warmupKeyboardWrap");
  if (!wrap) return;
  const hasTonicEl = document.getElementById(`warmupKey_${tonicMidi}`);
  const activeArr = Array.isArray(activeMidis) ? activeMidis : [];
  const missingActive = activeArr.some(m => !document.getElementById(`warmupKey_${m}`));
  if (!hasTonicEl || missingActive) {
    renderWarmupKeyboard(tonicMidi, activeArr);
    return;
  }
  const activeSet = new Set(activeArr);
  wrap.querySelectorAll("[data-midi]").forEach(el => {
    const midi = parseInt(el.dataset.midi, 10);
    el.classList.toggle("is-tonic", midi === tonicMidi);
    el.classList.toggle("is-active", activeSet.has(midi));
  });
}

async function auditionWarmupKeyboardNote(midi) {
  await ensureAudioReady();
  const w = state.warmup;
  audioEngine.playWarmupNotes(w.soundMode, [midiToNote(midi)], 0.85, false);
  w.activeMidis = [midi];
  updateWarmupKeyboardHighlights(w.currentTonicMidi, [midi]);
  const checkToken = w.token;
  setTimeout(() => {
    if (state.warmup.token === checkToken && state.warmup.status !== "running") {
      state.warmup.activeMidis = [];
      updateWarmupKeyboardHighlights(state.warmup.currentTonicMidi, []);
    }
  }, 550);
}

function syncWarmupCountdownDisplay(liveDecrementSec = 0) {
  const badge = document.getElementById("warmupRemainingBadge");
  if (!badge) return;
  const baseRem = getWarmupRemainingSec(state.warmup);
  const shown = Math.max(0, baseRem - Math.max(0, Math.floor(liveDecrementSec)));
  badge.textContent = `${formatSessionMMSS(shown)}`;
}

function renderWarmupView() {
  const w = state.warmup;
  if (!w) return;
  const preset = getLocalizedWarmupPreset(w.presetId);
  const steps = getWarmupStepsForPreset(w.presetId);
  const safeIdx = Math.max(0, Math.min(steps.length - 1, w.stepIndex));
  const step = steps[safeIdx];
  const phaseInfo = getWarmupPhaseInfo(step.phaseId);
  const voiceRange = getLocalizedWarmupVoiceRange(w.voiceRange);
  const soundMode = getLocalizedWarmupSoundMode(w.soundMode);
  const tonicMidi = getWarmupTonicMidi(step, w.keyOffsetIndex, w);
  w.currentTonicMidi = tonicMidi;

  const titleEl = document.getElementById("warmupTitleText");
  if (titleEl) titleEl.textContent = preset.title;

  const voiceBtn = document.getElementById("warmupVoiceBtn");
  if (voiceBtn) voiceBtn.textContent = voiceRange.label;
  document.querySelectorAll("[data-warmup-voice]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.warmupVoice === w.voiceRange);
  });

  const soundBtn = document.getElementById("warmupSoundBtn");
  if (soundBtn) soundBtn.textContent = soundMode.label;
  document.querySelectorAll("[data-warmup-sound]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.warmupSound === w.soundMode);
  });

  const bpmBtn = document.getElementById("warmupBpmBtn");
  const bpmSlider = document.getElementById("warmupBpmSlider");
  const bpmVal = document.getElementById("warmupBpmVal");
  if (bpmBtn) bpmBtn.textContent = `${w.bpm} BPM`;
  if (bpmSlider) bpmSlider.value = w.bpm;
  if (bpmVal) bpmVal.textContent = `${w.bpm} BPM`;

  syncWarmupCountdownDisplay(0);

  const pillsWrap = document.getElementById("warmupPhasePills");
  if (pillsWrap) {
    const activePhaseNum = phaseInfo.num;
    pillsWrap.innerHTML = WARMUP_PHASES.map(p => {
      const hasPhaseSteps = steps.some(s => s.phaseId === p.id);
      if (!hasPhaseSteps) return "";
      const cls = p.num < activePhaseNum ? "is-done" : (p.num === activePhaseNum ? "is-active" : "");
      return `<button type="button" class="warmup-phase-pill ${cls}" data-warmup-phase="${p.id}">${tr(p.shortDe, p.shortEn)}</button>`;
    }).join("");
    pillsWrap.querySelectorAll("[data-warmup-phase]").forEach(pill => {
      pill.addEventListener("click", () => {
        jumpToWarmupPhase(pill.dataset.warmupPhase);
      });
    });
  }

  const pct = w.status === "completed"
    ? 100
    : Math.round(((safeIdx + (w.keyOffsetIndex / Math.max(1, getWarmupStepRoundCount(step)))) / Math.max(1, steps.length)) * 100);
  const progressEl = document.getElementById("warmupProgressFill");
  if (progressEl) progressEl.style.width = `${Math.max(0, Math.min(100, pct))}%`;

  const counterEl = document.getElementById("warmupStepCounter");
  if (counterEl) {
    counterEl.textContent = w.status === "completed"
      ? tr("Fertig ✓", "Done ✓")
      : `${safeIdx + 1} / ${steps.length}`;
  }

  const isBreath = step.kind === "breath-orb" || step.kind === "breath-pulse";
  const stageCard = document.getElementById("warmupStageCard");
  if (stageCard) {
    stageCard.className = `central-stage warmup-stage-card ${phaseInfo.cls}${isBreath && w.status !== "completed" ? " is-breath-step" : ""}`;
  }

  const mascotEl = document.getElementById("warmupMascotWrap");
  if (mascotEl) {
    const mood = w.status === "completed" ? "happy" : (w.status === "running" ? "idle" : "thinking");
    mascotEl.innerHTML = getMascotSVG(mood);
  }

  const phaseBadgeEl = document.getElementById("warmupPhaseBadge");
  if (phaseBadgeEl) {
    phaseBadgeEl.textContent = w.status === "completed"
      ? tr("EINSINGEN ABGESCHLOSSEN", "WARMUP COMPLETE")
      : phaseInfo.label;
  }

  const orbWrap = document.getElementById("warmupBreathOrbWrap");
  const orb = document.getElementById("warmupBreathOrb");
  const orbCue = document.getElementById("warmupBreathCue");
  if (orbWrap && orb && orbCue) {
    orbWrap.classList.toggle("hidden", !isBreath || w.status === "completed");
    orb.className = "warmup-breath-orb";
    if (w.breathCueKey === "inhale") orb.classList.add("is-inhale");
    else if (w.breathCueKey === "hold") orb.classList.add("is-hold");
    else if (w.breathCueKey === "exhale") orb.classList.add("is-exhale");
    else if (w.breathCueKey === "rest") orb.classList.add("is-rest");
    else if (w.breathCueKey === "pulse") orb.classList.add("is-pulse");
    orbCue.textContent = w.breathCueText || tr("Bereit", "Ready");
  }

  const titleStepEl = document.getElementById("warmupStepTitle");
  if (titleStepEl) {
    titleStepEl.textContent = w.status === "completed"
      ? tr("Stimme ist warm & bereit!", "Voice is warm & ready!")
      : tr(step.titleDe, step.titleEn);
  }

  const sylEl = document.getElementById("warmupSyllableMain");
  if (sylEl) {
    sylEl.textContent = w.status === "completed"
      ? tr("Bravo!", "Great job!")
      : (w.vowelLabel || tr(step.syllableDe, step.syllableEn));
  }

  const degEl = document.getElementById("warmupPatternDegrees");
  const showDeg = !isBreath && w.status !== "completed" && Boolean(step.degreesText);
  if (degEl) {
    degEl.classList.toggle("hidden", !showDeg);
    if (showDeg) degEl.textContent = step.degreesText;
  }

  const keyInfo = getWarmupKeyNameFromMidi(tonicMidi);
  const noteText = midiToGermanNote(tonicMidi, keyInfo.preferFlat);
  const keyBadgeEl = document.getElementById("warmupKeyNoteBadge");
  const roundTotal = getWarmupStepRoundCount(step);
  const showKeyBadge = !isBreath && w.status !== "completed";
  if (keyBadgeEl) {
    keyBadgeEl.classList.toggle("hidden", !showKeyBadge);
    if (showKeyBadge) {
      keyBadgeEl.textContent = `${keyInfo.keyName} (${noteText}) • ${w.keyOffsetIndex + 1}/${roundTotal}`;
    }
  }
  const metaRow = document.getElementById("warmupMetaRow");
  if (metaRow) {
    metaRow.classList.toggle("hidden", !showDeg && !showKeyBadge);
  }

  const hintEl = document.getElementById("warmupStageHint");
  if (hintEl) {
    if (w.status === "completed") {
      hintEl.textContent = tr(
        "Viel Freude beim Singen und Musizieren! Tippe unten auf Starten für eine neue Runde.",
        "Have a great rehearsal or practice session! Tap below to restart anytime."
      );
    } else if (w.hintText) {
      hintEl.textContent = w.hintText;
    } else {
      hintEl.textContent = tr(step.hintDe, step.hintEn);
    }
  }

  const manualBar = document.getElementById("warmupManualBar");
  const kbWrap = document.getElementById("warmupKeyboardWrap");
  const hideTonalTools = isBreath;
  if (manualBar) manualBar.classList.toggle("hidden", isBreath || w.status === "completed");
  if (kbWrap) {
    kbWrap.classList.toggle("hidden", hideTonalTools || w.status === "completed");
    if (!hideTonalTools && w.status !== "completed") {
      renderWarmupKeyboard(tonicMidi, w.activeMidis);
    }
  }

  const playBtn = document.getElementById("warmupPlayBtn");
  if (playBtn) {
    if (w.status === "running") {
      playBtn.textContent = tr("⏸ Pause", "⏸ Pause");
      playBtn.classList.add("btn-stop");
    } else if (w.status === "paused") {
      playBtn.textContent = tr("▶ Weiter", "▶ Resume");
      playBtn.classList.remove("btn-stop");
    } else if (w.status === "completed") {
      playBtn.innerHTML = `${REFRESH_ICON_SVG}${escapeHtml(tr("Nochmal einsingen", "Warmup Again"))}`;
      playBtn.classList.remove("btn-stop");
    } else {
      playBtn.textContent = tr("▶ Einsingen starten", "▶ Start Warmup");
      playBtn.classList.remove("btn-stop");
    }
  }

  const prevBtn = document.getElementById("warmupPrevBtn");
  const nextBtn = document.getElementById("warmupNextBtn");
  if (prevBtn) prevBtn.disabled = safeIdx <= 0 && w.keyOffsetIndex <= 0;
  if (nextBtn) nextBtn.disabled = safeIdx >= steps.length - 1 && w.status === "completed";

  state.updateHeaderSubtext();
}

function playWarmupMajorTriadCue(tonicMidi, durSec, soundMode) {
  const notes = [midiToNote(tonicMidi), midiToNote(tonicMidi + 4), midiToNote(tonicMidi + 7)];
  audioEngine.playWarmupNotes(soundMode, notes, durSec, true);
}

function runCurrentWarmupRound() {
  const w = state.warmup;
  if (!w || w.status !== "running" || state.currentView !== "warmup") return;

  const steps = getWarmupStepsForPreset(w.presetId);
  if (w.stepIndex >= steps.length) {
    finishWarmupSession();
    return;
  }

  const step = steps[w.stepIndex];
  const roundCount = getWarmupStepRoundCount(step);
  if (w.keyOffsetIndex >= roundCount) {
    w.stepIndex += 1;
    w.keyOffsetIndex = 0;
    w.transposeShift = 0;
    runCurrentWarmupRound();
    return;
  }

  const token = w.token;
  const beatSec = 60 / Math.max(60, Math.min(140, w.bpm || WARMUP_DEFAULT_BPM));
  const beatMs = beatSec * 1000;
  const tonicMidi = getWarmupTonicMidi(step, w.keyOffsetIndex, w);
  const keyInfo = getWarmupKeyNameFromMidi(tonicMidi);
  w.currentTonicMidi = tonicMidi;
  w.activeMidis = [];
  w.vowelLabel = "";
  w.breathCueKey = "idle";
  w.breathCueText = "";
  w.hintText = tr(step.hintDe, step.hintEn);
  w.roundStartedWallMs = Date.now();

  if (w.tickIntervalId !== null) clearInterval(w.tickIntervalId);
  w.tickIntervalId = setInterval(() => {
    if (!state.warmup || state.warmup.status !== "running" || state.warmup.token !== token) return;
    const elapsedSec = (Date.now() - state.warmup.roundStartedWallMs) / 1000;
    syncWarmupCountdownDisplay(elapsedSec);
  }, 500);

  renderWarmupView();

  const advanceRoundOrStep = () => {
    if (!state.warmup || state.warmup.token !== token || state.warmup.status !== "running") return;
    w.keyOffsetIndex += 1;
    if (w.keyOffsetIndex >= roundCount) {
      w.stepIndex += 1;
      w.keyOffsetIndex = 0;
      w.transposeShift = 0;
    }
    runCurrentWarmupRound();
  };

  if (step.kind === "breath-orb") {
    const cycles = step.cycles || 3;
    const oneCycleMs = (step.cyclePhases || []).reduce((sum, p) => sum + p.sec * 1000, 0);
    // Tiefes, erdendes Bass-Register (C2–H2 als Grundton) für ruhige Atemführung
    let breathBaseMidi = tonicMidi;
    while (breathBaseMidi > 47) breathBaseMidi -= 12;
    while (breathBaseMidi < 36) breathBaseMidi += 12;
    let cursorMs = 0;
    for (let c = 0; c < cycles; c++) {
      step.cyclePhases.forEach(p => {
        const atMs = cursorMs;
        cursorMs += p.sec * 1000;
        const cycleLabel = `${tr("Zyklus", "Cycle")} ${c + 1}/${cycles}`;
        audioEngine.registerTimer(() => {
          if (state.warmup.token !== token || state.warmup.status !== "running") return;
          w.breathCueKey = p.cue;
          w.breathCueText = tr(p.de, p.en);
          w.hintText = `${cycleLabel} • ${tr(p.detailDe || step.hintDe, p.detailEn || step.hintEn)}`;
          const orb = document.getElementById("warmupBreathOrb");
          const cueEl = document.getElementById("warmupBreathCue");
          const hintEl = document.getElementById("warmupStageHint");
          if (orb) {
            orb.className = "warmup-breath-orb";
            orb.classList.add(`is-${p.cue}`);
          }
          if (cueEl) cueEl.textContent = w.breathCueText;
          if (hintEl) hintEl.textContent = w.hintText;
          if (p.cueNoteOffset !== null && p.cueNoteOffset !== undefined) {
            audioEngine.playWarmupBreathTone(breathBaseMidi + p.cueNoteOffset, p.sec, { phase: p.cue });
          }
        }, atMs);
      });
    }
    scheduleWarmupCallback(advanceRoundOrStep, cycles * oneCycleMs + 220, token);
    return;
  }

  if (step.kind === "breath-pulse") {
    const pulses = step.pulseCount || 4;
    for (let i = 0; i < pulses; i++) {
      audioEngine.registerTimer(() => {
        if (state.warmup.token !== token || state.warmup.status !== "running") return;
        audioEngine.triggerPercussion(i === 0 ? "accent" : "clave", null, i === 0 ? 0.92 : 0.78);
        w.breathCueKey = "pulse";
        w.breathCueText = `${tr("Impuls", "Pulse")} ${i + 1}/${pulses}`;
        const orb = document.getElementById("warmupBreathOrb");
        const cueEl = document.getElementById("warmupBreathCue");
        if (orb) {
          orb.classList.add("is-pulse");
          setTimeout(() => orb.classList.remove("is-pulse"), Math.min(200, Math.round(beatMs * 0.4)));
        }
        if (cueEl) cueEl.textContent = w.breathCueText;
      }, i * beatMs);
    }
    audioEngine.registerTimer(() => {
      if (state.warmup.token !== token || state.warmup.status !== "running") return;
      w.breathCueKey = "inhale";
      w.breathCueText = tr("Einatmen", "Breathe in");
      const cueEl = document.getElementById("warmupBreathCue");
      const orb = document.getElementById("warmupBreathOrb");
      if (orb) orb.className = "warmup-breath-orb is-inhale";
      if (cueEl) cueEl.textContent = w.breathCueText;
    }, pulses * beatMs);
    scheduleWarmupCallback(advanceRoundOrStep, (pulses + (step.restBeats || 2.5)) * beatMs, token);
    return;
  }

  // Cue-Akkord + kurze Einatem-Lücke vor allen gesungenen Übungen
  const cueMs = (step.cueChordBeats || 1.25) * beatMs;
  const startVocalMs = cueMs + (step.breathGapBeats || 0.75) * beatMs;
  playWarmupMajorTriadCue(tonicMidi, Math.max(0.55, cueMs / 1000 * 0.92), w.soundMode);
  w.activeMidis = [tonicMidi, tonicMidi + 4, tonicMidi + 7];
  updateWarmupKeyboardHighlights(tonicMidi, w.activeMidis);

  if (step.kind === "vowel-blend") {
    const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
    const vowels = lang === "ur"
      ? (step.vowelsUr || step.vowelsEn)
      : lang === "uk"
        ? (step.vowelsUk || step.vowelsEn)
        : lang === "pl"
          ? (step.vowelsPl || step.vowelsEn)
          : lang === "es"
            ? (step.vowelsEs || step.vowelsDe)
            : lang === "fr"
              ? (step.vowelsFr || step.vowelsEn)
              : (lang === "en" ? step.vowelsEn : step.vowelsDe);
    const stepMs = (step.vowelStepBeats || 1.9) * beatMs;
    const tonicNote = midiToNote(tonicMidi);
    const subDomNotes = [midiToNote(tonicMidi), midiToNote(tonicMidi + 5), midiToNote(tonicMidi + 9)];
    const homeChordNotes = [midiToNote(tonicMidi), midiToNote(tonicMidi + 4), midiToNote(tonicMidi + 7)];

    audioEngine.registerTimer(() => {
      if (state.warmup.token !== token || state.warmup.status !== "running") return;
      audioEngine.playWarmupNotes(w.soundMode, [tonicNote], (vowels.length * stepMs) / 1000 * 0.96, false);
      w.activeMidis = [tonicMidi];
      updateWarmupKeyboardHighlights(tonicMidi, [tonicMidi]);
    }, startVocalMs);

    vowels.forEach((vLabel, vIdx) => {
      audioEngine.registerTimer(() => {
        if (state.warmup.token !== token || state.warmup.status !== "running") return;
        w.vowelLabel = vLabel;
        const sylEl = document.getElementById("warmupSyllableMain");
        if (sylEl) sylEl.textContent = vLabel;
        if (vIdx === 2) {
          audioEngine.playWarmupNotes("piano", subDomNotes, (stepMs * 2) / 1000, true);
        } else if (vIdx === 4) {
          audioEngine.playWarmupNotes("piano", homeChordNotes, (stepMs * 1.4) / 1000, true);
        }
      }, startVocalMs + vIdx * stepMs);
    });

    const endMs = startVocalMs + vowels.length * stepMs + (step.postRestBeats || 1.0) * beatMs;
    scheduleWarmupCallback(advanceRoundOrStep, endMs, token);
    return;
  }

  if (step.kind === "choir-cadence") {
    const cBeatMs = (step.cadenceBeat || 1.35) * beatMs;
    const sBeatMs = (step.stackStepBeats || 1.15) * beatMs;
    const holdMs = (step.holdBeats || 4.5) * beatMs;
    const bassMidi = Math.max(40, tonicMidi >= 48 ? tonicMidi - 12 : tonicMidi);
    const tenorMidi = bassMidi + 7;
    const altMidi = bassMidi + 12;
    const sopMidi = bassMidi + 16;

    const layers = [
      { midi: bassMidi, labelDe: "1. Bass: Grundton einstimmen",   labelEn: "1. Bass: Lock the root" },
      { midi: tenorMidi,labelDe: "2. Tenor: Reine Quinte darüber", labelEn: "2. Tenor: Pure 5th above" },
      { midi: altMidi,  labelDe: "3. Alt: Oktave einschwingen",    labelEn: "3. Alto: Blend the octave" },
      { midi: sopMidi,  labelDe: "4. Sopran: Strahlende Terz!",    labelEn: "4. Soprano: Shining major 3rd!" }
    ];

    const stackStartMs = cueMs + beatMs * 0.8;
    const accumulated = [];
    layers.forEach((layer, idx) => {
      audioEngine.registerTimer(() => {
        if (state.warmup.token !== token || state.warmup.status !== "running") return;
        accumulated.push(layer.midi);
        const isLast = idx === layers.length - 1;
        const holdNoteSec = ((layers.length - idx) * sBeatMs + holdMs) / 1000 * 0.94;
        audioEngine.playWarmupNotes(
          w.soundMode === "piano" ? "piano" : "voice",
          [midiToNote(layer.midi)],
          holdNoteSec,
          false
        );
        if (isLast && w.soundMode !== "voice") {
          audioEngine.playWarmupNotes(
            "piano-voice",
            accumulated.map(m => midiToNote(m)),
            holdMs / 1000 * 0.96,
            false,
            true
          );
        }
        w.activeMidis = accumulated.slice();
        w.hintText = `${tr(layer.labelDe, layer.labelEn)} (${keyInfo.keyName})`;
        const hintEl = document.getElementById("warmupStageHint");
        if (hintEl) hintEl.textContent = w.hintText;
        updateWarmupKeyboardHighlights(tonicMidi, w.activeMidis);
      }, stackStartMs + idx * sBeatMs);
    });

    const totalEndMs = stackStartMs + layers.length * sBeatMs + holdMs + (step.postRestBeats || 1.2) * beatMs;
    scheduleWarmupCallback(advanceRoundOrStep, totalEndMs, token);
    return;
  }

  // Standard vocal-pattern (Summen, Seufzer, Dreiklangs-Arpeggio, Oktav-Staccato, Cool-Down)
  let elapsedNoteMs = 0;
  (step.semitones || []).forEach((semi, nIdx) => {
    const noteBeatDur = (step.noteBeats?.[nIdx] || 0.9) * beatMs;
    const noteDurSec = step.staccato && nIdx < step.semitones.length - 1
      ? Math.max(0.22, (noteBeatDur / 1000) * 0.56)
      : Math.max(0.28, (noteBeatDur / 1000) * 0.94);
    const playMidi = tonicMidi + semi;
    const playAtMs = startVocalMs + elapsedNoteMs;
    elapsedNoteMs += noteBeatDur;

    audioEngine.registerTimer(() => {
      if (state.warmup.token !== token || state.warmup.status !== "running") return;
      audioEngine.playWarmupNotes(w.soundMode, [midiToNote(playMidi)], noteDurSec, false);
      w.activeMidis = [playMidi];
      updateWarmupKeyboardHighlights(tonicMidi, [playMidi]);
    }, playAtMs);
  });

  const roundEndMs = startVocalMs + elapsedNoteMs + (step.postRestBeats || 0.85) * beatMs;
  scheduleWarmupCallback(advanceRoundOrStep, roundEndMs, token);
}

async function startOrResumeWarmup() {
  const w = state.warmup;
  if (!w) return;
  if (w.status === "completed") {
    w.stepIndex = 0;
    w.keyOffsetIndex = 0;
    w.transposeShift = 0;
  }
  clearWarmupTimers();
  const entryToken = w.token;
  w.status = "running";
  renderWarmupView();

  await ensureAudioReady();
  if (!state.warmup || state.warmup.token !== entryToken || state.warmup.status !== "running" || state.currentView !== "warmup") {
    return;
  }
  runCurrentWarmupRound();
}

function pauseWarmupSession(options = {}) {
  const w = state.warmup;
  if (!w) return;
  clearWarmupTimers();
  if (!options.keepPlayback) {
    stopPlayback();
  }
  if (w.status === "running") {
    w.status = "paused";
  }
  w.activeMidis = [];
  if (state.currentView === "warmup") {
    renderWarmupView();
  }
}

function finishWarmupSession() {
  clearWarmupTimers();
  stopPlayback();
  const w = state.warmup;
  w.status = "completed";
  w.activeMidis = [];
  w.breathCueKey = "idle";
  w.vowelLabel = "";
  renderWarmupView();
}

function toggleWarmupPlayPause() {
  if (state.warmup?.status === "running") {
    pauseWarmupSession();
  } else {
    startOrResumeWarmup();
  }
}

function jumpToWarmupPhase(phaseId) {
  const steps = getWarmupStepsForPreset(state.warmup.presetId);
  const idx = steps.findIndex(s => s.phaseId === phaseId);
  if (idx < 0) return;
  const wasRunning = state.warmup.status === "running";
  clearWarmupTimers();
  stopPlayback();
  state.warmup.stepIndex = idx;
  state.warmup.keyOffsetIndex = 0;
  state.warmup.transposeShift = 0;
  state.warmup.activeMidis = [];
  state.warmup.vowelLabel = "";
  state.warmup.breathCueKey = "idle";
  if (wasRunning) {
    startOrResumeWarmup();
  } else {
    if (state.warmup.status === "completed") state.warmup.status = "idle";
    renderWarmupView();
  }
}

function stepWarmupIndex(delta) {
  const steps = getWarmupStepsForPreset(state.warmup.presetId);
  const nextIdx = Math.max(0, Math.min(steps.length - 1, state.warmup.stepIndex + delta));
  const wasRunning = state.warmup.status === "running";
  clearWarmupTimers();
  stopPlayback();
  state.warmup.stepIndex = nextIdx;
  state.warmup.keyOffsetIndex = 0;
  state.warmup.transposeShift = 0;
  state.warmup.activeMidis = [];
  state.warmup.vowelLabel = "";
  state.warmup.breathCueKey = "idle";
  if (wasRunning) {
    startOrResumeWarmup();
  } else {
    if (state.warmup.status === "completed") state.warmup.status = "idle";
    renderWarmupView();
  }
}

async function replayWarmupRound() {
  const w = state.warmup;
  if (!w) return;
  if (w.status === "running") {
    clearWarmupTimers();
    stopPlayback();
    runCurrentWarmupRound();
    return;
  }
  await ensureAudioReady();
  const steps = getWarmupStepsForPreset(w.presetId);
  const step = steps[Math.max(0, Math.min(steps.length - 1, w.stepIndex))];
  const tonicMidi = getWarmupTonicMidi(step, w.keyOffsetIndex, w);
  playWarmupMajorTriadCue(tonicMidi, 0.85, w.soundMode);
  w.activeMidis = [tonicMidi, tonicMidi + 4, tonicMidi + 7];
  renderWarmupView();
}

async function shiftWarmupTranspose(deltaSemitones) {
  const w = state.warmup;
  if (!w) return;
  const steps = getWarmupStepsForPreset(w.presetId);
  const step = steps[Math.max(0, Math.min(steps.length - 1, w.stepIndex))];
  const nextShift = Math.max(-12, Math.min(12, (w.transposeShift || 0) + deltaSemitones));
  const previewTonic = getWarmupTonicMidi(step, w.keyOffsetIndex, { ...w, transposeShift: nextShift });
  if (previewTonic < 36 || previewTonic > 82) return;

  w.transposeShift = nextShift;
  if (w.status === "running") {
    clearWarmupTimers();
    stopPlayback();
    runCurrentWarmupRound();
  } else {
    renderWarmupView();
    await ensureAudioReady();
    playWarmupMajorTriadCue(previewTonic, 0.75, w.soundMode);
  }
}

function setWarmupVoiceRange(voiceId) {
  if (!WARMUP_VOICE_RANGES[voiceId]) return;
  state.warmup.voiceRange = voiceId;
  state.warmup.transposeShift = 0;
  closeTransientPopovers();
  if (state.warmup.status === "running") {
    clearWarmupTimers();
    stopPlayback();
    runCurrentWarmupRound();
  } else {
    renderWarmupView();
  }
}

function setWarmupSoundMode(soundId) {
  if (!WARMUP_SOUND_MODES[soundId]) return;
  state.warmup.soundMode = soundId;
  closeTransientPopovers();
  renderWarmupView();
}

function setWarmupBpm(bpm) {
  const clamped = Math.max(65, Math.min(135, parseInt(bpm, 10) || WARMUP_DEFAULT_BPM));
  state.warmup.bpm = clamped;
  renderWarmupView();
}

function openWarmupView(presetId = "full-5min", options = {}) {
  clearWarmupTimers();
  stopPlayback();
  const validPreset = WARMUP_PRESETS.some(p => p.id === presetId) ? presetId : "full-5min";
  state.warmupReturnView = options.returnView || "category";
  state.warmup.presetId = validPreset;
  state.warmup.status = "idle";
  state.warmup.stepIndex = 0;
  state.warmup.keyOffsetIndex = 0;
  state.warmup.transposeShift = 0;
  state.warmup.activeMidis = [];
  state.warmup.breathCueKey = "idle";
  state.warmup.breathCueText = "";
  state.warmup.vowelLabel = "";
  state.warmup.hintText = "";
  switchView("warmup");
}

