/**
 * Lauscher • AppState, AudioEngine-Instanz & Einstellungs-/Theme-/Sprach-Synchronisation
 */

class AppState {
  constructor() {
    this.currentView = "home"; // 'home' | 'category' | 'knowledge' | 'knowledge-detail' | 'space' | 'exercise'
    this.activeCategory = "cadence";
    this.activeCategorySection = null;
    this.activeCategorySectionTitle = "";
    this.activeKnowledgeTab = "theory";
    this.activeKnowledgeDetail = null;
    this.knowledgeTitle = "Wissen";
    this.knowledgeSub = "Theorie & Hörbeispiele";
    this.exerciseReturnView = "home";

    const initialVisual = loadVisualPrefs();

    this.settings = {
      mode: "cadence", // 'cadence' | 'interval-*' | 'solfege' | 'melody' | 'rhythm-*' | 'prod-tone' | 'prod-eq-noise'
      difficulty: 1,
      cadencePos: "last", // 'last' (Takt 4) | 'random' (zufälliger Takt 1–4)
      intervalDifficulty: 1,
      intervalCustomRoot: "random", // "random" oder Tonklasse "0".."11"
      intervalCustomScale: "ionian", // "ionian" | "aeolian" | "harm_minor" | "mel_minor" | "dorian" | "phrygian" | "lydian" | "mixolydian" | "locrian" | "chromatic"
      intervalCustomScope: "full",   // "triad" | "lower" | "upper" | "full"
      intervalCustomPool: null,      // Optionale manuelle Intervall-Liste (mind. 2 Schlüssel)
      chordDifficulty: 1,
      chordInversionDifficulty: 1,
      solfegeDifficulty: 1,
      solfegeCustomKey: "C",         // "C", "G", ..., "F" oder "random"
      solfegeCustomTonality: "major",// "major" | "minor"
      solfegeCustomRange: "full",    // "do-fa" | "sol-do" | "full"
      solfegeCustomOctave: "single", // "single" | "multi"
      melodyRange: "do-fa",      // 'do-fa' | 'sol-do' | 'full'
      melodyKeyMode: "fixed",    // 'fixed' (C-Dur) | 'random' (Zufallstonarten)
      melodyOctaveMode: "single",// 'single' (1 Oktave) | 'multi' (Mehrere Oktaven)
      melodyStyle: "rhythmic",   // 'steady' (4 gleichlang) | 'rhythmic' (4–6 Töne phrasiert) | 'dictation' (Ton + Rhythmus)
      melodyPulse: true,         // Dezenter Takt-Puls beim Melodie-Abspielen
      modesRootPad: true,        // Modi: Bezugsgrundton standardmäßig als Streicher-Fläche unterlegen
      modesRoot: "auto",         // Modi: Grundton – "auto" (je Stufe), "random" oder Tonklasse 0–11 als String
      rhythmTapReadMode: false,  // Rhythmus vom Blatt: Notenbild lesen & zum Metronom tappen (statt nachklopfen)
      rhythmMeterDifficulty: 1,
      rhythmDictationDifficulty: 1,
      rhythmTapDifficulty: 1,
      rhythmTapClick: true,
      rhythmTapAutoNext: initialVisual.autoNextAfterCorrect,
      rhythmDictationAutoNext: initialVisual.autoNextAfterCorrect,
      rhythmGrooveDifficulty: 1,
      prodToneDifficulty: 1,
      prodEqNoiseDifficulty: 1,
      modesScaleDifficulty: 1,
      modesCharDifficulty: 1,
      modesCadenceDifficulty: 1,
      notationDifficulty: 1,
      notationKeyMode: "none",
      notationKeyTrainerClef: "notation-treble",
      notationKeyTrainerLevel: 2,
      notationListenOnlyPace: 50,
      singIntervalDifficulty: 1,   // „Intervalle treffen“ (gleiche Stufen wie die Intervall-Übungen, ohne „Frei“)
      singIntervalDirection: "up", // "up" | "down" | "mixed"
      singDegreeDifficulty: 1,     // „Stufen treffen“
      singMatchAutoNext: true,     // Nach einem Treffer automatisch die nächste Aufgabe vorspielen
      midiIntervalDifficulty: 1,   // „Intervalle spielen“ (MIDI)
      midiIntervalDirection: "up", // "up" | "down" | "mixed"
      midiChordDifficulty: 1,      // „Akkorde greifen“ (MIDI)
      midiScaleDifficulty: 1,      // „Tonleitern & Modi spielen“ (MIDI)
      keyMode: "fixed",
      timeSig: "4/4",
      defaultBpm: 90,
      bpm: CADENCE_DEFAULT_BPM,
      randomBpm: false,
      loop: false,
      autoNextAfterCorrect: initialVisual.autoNextAfterCorrect,
      playCorrectAnswerAudio: initialVisual.playCorrectAnswerAudio !== false,
      solfegeAutoNext: initialVisual.autoNextAfterCorrect,
      melodyAutoNext: initialVisual.autoNextAfterCorrect,
      appearance: initialVisual.appearance,
      theme: initialVisual.theme,
      language: initialVisual.language,
      onboardingDone: initialVisual.onboardingDone !== false,
      explorerMode: initialVisual.explorerMode === true,
      explorerPinHash: initialVisual.explorerPinHash || ""
    };

    this.master = {
      volume: 0.67,
      muted: false
    };

    this.mixer = {
      piano: 0.90,
      guitar: 0.00,
      strings: 0.00,
      brass: 0.00,
      voice: 0.00,
      bass: 0.00
    };
    this.customMixer = { ...this.mixer };
    this.activePreset = "piano";

    this.currentKey = "C";
    this.solfegeSessionKey = "G";
    this.activeTimeSig = "4/4";
    this.activeBpm = CADENCE_DEFAULT_BPM;
    this.hasManualExerciseBpm = false;
    this.currentExercise = null;
    this.isPlaying = false;
    this.solfegeAnswered = false;
    this.melodyCompleted = false;
    this.rhythmDictationCompleted = false;
    this.rhythmTapSession = null;
    this.exerciseSolved = false;
    this.listenOnly = {
      active: false,
      token: 0,
      timerId: null,
      phase: "idle"
    };
    this.warmupReturnView = "category";
    this.warmup = {
      presetId: "full-5min",
      voiceRange: "mixed",
      soundMode: "piano-voice",
      bpm: WARMUP_DEFAULT_BPM,
      status: "idle", // 'idle' | 'running' | 'paused' | 'completed'
      stepIndex: 0,
      keyOffsetIndex: 0,
      transposeShift: 0,
      token: 0,
      timerId: null,
      tickIntervalId: null,
      tickAnchorSec: 0,
      roundStartedWallMs: 0,
      currentTonicMidi: 60,
      activeMidis: [],
      breathCueKey: "idle",
      breathCueText: "",
      vowelLabel: "",
      hintText: ""
    };
    this.metronomeReturnView = "tools";
    this.tunerReturnView = "tools";
    this.freeplayReturnView = "tools";
    this.fretboardReturnView = "tools";
    this.tunerStream = null;
    this.metronome = {
      bpm: METRONOME_DEFAULT_BPM,
      beats: getDefaultMeterBeats(4),
      subdivision: 1,
      running: false,
      activeProfileId: "metro_default_4_4",
      mix: sanitizeMetronomeMix(DEFAULT_METRONOME_MIX),
      sound: DEFAULT_METRONOME_SOUND
    };
    this.lastAnswerWasWrong = false;
    this.wrongAnswerData = null;
    this.streakState = { count: 0, activeNoticeMilestone: 0, scopeKey: null };
    this.currentQuoteIndex = -1;
    this.quotesSincePriorityNotice = 0;
    this.lastPriorityQuoteIndex = -1;
    this.waveAnimFrame = null;
    this.waveResume = null;
    this.circleOfFifthsState = { idx: 0, ringMode: "major", tab: "chords" };
    this.capoState = { keyIdx: 0, mode: "major", fret: 0 };
    this.capoReturnView = "tools";
    this.nashvilleState = { keyIdx: 0, mode: "major" };
    this.nashvilleReturnView = "tools";
    this.wavePaused = false;

    this.profile = loadUserProfile();
    this.metronome.mix = sanitizeMetronomeMix(this.profile.metronomeMix);
    this.metronome.sound = normalizeMetronomeSoundProfile(this.profile.metronomeSound);
    const initLangCfg = typeof getLanguageConfig === "function" ? getLanguageConfig(this.settings.language) : null;
    if (!this.profile.notationManual) {
      this.profile.notation = initLangCfg ? initLangCfg.defaultNotation : (this.settings.language === "en" ? "intl" : "de");
    }
    if (!this.profile.intervalNotationManual) {
      this.profile.intervalNotation = initLangCfg ? initLangCfg.defaultIntervalNotation : (this.settings.language === "en" ? "intl" : "de");
    }
    this.customThemeEditor = {
      open: false,
      slotIndex: 0,
      name: "",
      colors: sanitizeCustomThemeColors(CUSTOM_THEME_TEMPLATES["waldlichtung-light"]),
      activeRole: null,
      pickerHsv: rgbToHsv(parseCssColorToRgba("#FAF7F2")),
      livePreview: true
    };
    this.breakReminder = {
      elapsedSec: 0,
      intervalId: null,
      lastActivityWallMs: Date.now(),
      hiddenSinceWallMs: null,
      promptOpen: false,
      pausedOnBreak: false
    };
    this.resetConfirmArmed = false;
    this.appResetConfirmArmed = false;

    this.examSetupCategory = "interval";
    this.examResultReturnView = "exam-setup";
    this.activeExamResultId = null;
    this.activeExamResultObj = null;
    this.examResultReviewFilter = "all";
    this.examHistoryShowAll = false;
    this.examHistoryClearArmed = false;
    this.examConfig = { count: 10, feedbackMode: "blind", maxReplays: 2 };
    this.exam = null;
  }

  setMode(mode) {
    this.settings.mode = mode;
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setDifficulty(level) {
    this.settings.difficulty = parseInt(level, 10);
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setCadencePos(pos) {
    this.settings.cadencePos = pos === "random" ? "random" : "last";
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setSingMatchLevel(mode, level) {
    const key = mode === "sing-degree" ? "singDegreeDifficulty" : "singIntervalDifficulty";
    const levels = SING_MATCH_MODE_CATALOG[mode]?.levels || [1];
    const lvl = parseInt(level, 10);
    this.settings[key] = levels.includes(lvl) ? lvl : levels[0];
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setMidiPlayLevel(mode, level) {
    const key = mode === "midi-chord"
      ? "midiChordDifficulty"
      : (mode === "midi-scale" ? "midiScaleDifficulty" : "midiIntervalDifficulty");
    const levels = MIDI_PLAY_MODE_CATALOG[mode]?.levels || [1];
    const lvl = parseInt(level, 10);
    this.settings[key] = levels.includes(lvl) ? lvl : levels[0];
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setIntervalDifficulty(level) {
    this.settings.intervalDifficulty = parseInt(level, 10);
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setChordDifficulty(level) {
    this.settings.chordDifficulty = parseInt(level, 10);
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setChordInversionDifficulty(level) {
    this.settings.chordInversionDifficulty = parseInt(level, 10);
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setSolfegeDifficulty(level) {
    this.settings.solfegeDifficulty = parseInt(level, 10) || 1;
    // Für die Stufen „Feste Zufallstonart“ (Dur 4/6, Moll 12/14): Zufällige Nicht-C-Tonart einmal würfeln und festhalten
    const cfg = getSolfegeLevelConfig(this.settings.solfegeDifficulty);
    if (cfg.keyMode === "session") {
      this.solfegeSessionKey = pickRandomNonCKey(this.solfegeSessionKey);
    }
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setMelodyConfig(range, keyMode, octaveMode, style = null, pulse = null) {
    this.settings.melodyRange = MELODY_RANGE_CONFIG[range] ? range : "do-fa";
    this.settings.melodyKeyMode = keyMode === "random" ? "random" : "fixed";
    this.settings.melodyOctaveMode = octaveMode === "multi" ? "multi" : "single";
    if (["steady", "rhythmic", "dictation"].includes(style)) {
      this.settings.melodyStyle = style;
    }
    if (typeof pulse === "boolean") {
      this.settings.melodyPulse = pulse;
    }
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setRhythmLevel(subMode, level, readMode = false) {
    const lvl = parseInt(level, 10) || 1;
    this.settings.mode = subMode;
    this.settings.rhythmTapReadMode = subMode === "rhythm-tap" && Boolean(readMode);
    if (subMode === "rhythm-meter") this.settings.rhythmMeterDifficulty = lvl;
    else if (subMode === "rhythm-dictation") this.settings.rhythmDictationDifficulty = lvl;
    else if (subMode === "rhythm-tap") this.settings.rhythmTapDifficulty = lvl;
    else if (subMode === "rhythm-groove") this.settings.rhythmGrooveDifficulty = lvl;
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setProdLevel(subMode, level) {
    const lvl = Math.max(1, Math.min(3, parseInt(level, 10) || 1));
    this.settings.mode = subMode;
    if (subMode === "prod-tone") this.settings.prodToneDifficulty = lvl;
    else if (subMode === "prod-eq-noise") this.settings.prodEqNoiseDifficulty = lvl;
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setModesLevel(subMode, level) {
    const maxLvl = subMode === "modes-cadence" ? 2 : 3;
    const lvl = Math.max(1, Math.min(maxLvl, parseInt(level, 10) || 1));
    this.settings.mode = subMode;
    if (subMode === "modes-scale") this.settings.modesScaleDifficulty = lvl;
    else if (subMode === "modes-char") this.settings.modesCharDifficulty = lvl;
    else if (subMode === "modes-cadence") this.settings.modesCadenceDifficulty = lvl;
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setNotationLevel(subModeOrLevel, maybeLevel, maybeKeyMode = undefined) {
    let validMode = isNotationMode(this.settings.mode) ? this.settings.mode : "notation-treble";
    let rawLevel = maybeLevel;
    let resolvedKeyMode = maybeKeyMode;
    if (isNotationMode(subModeOrLevel)) {
      validMode = subModeOrLevel;
    } else {
      rawLevel = subModeOrLevel;
      if (resolvedKeyMode === undefined && typeof maybeLevel === "string") {
        resolvedKeyMode = maybeLevel;
      }
    }
    const maxLvl = (isNotationSymbolsMode(validMode) || validMode === "notation-grand") ? 5 : 4;
    const lvl = Math.max(1, Math.min(maxLvl, parseInt(rawLevel, 10) || 1));
    this.settings.mode = validMode;
    this.settings.notationDifficulty = lvl;
    if (resolvedKeyMode !== undefined) {
      this.settings.notationKeyMode = normalizeNotationKeyMode(resolvedKeyMode);
    }
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setNotationKeyMode(nextKeyMode) {
    this.settings.notationKeyMode = normalizeNotationKeyMode(nextKeyMode);
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  getModeSummaryText(includeCategory = true) {
    const lvlWord = tr("Stufe", "Level");
    if (isCadenceMode(this.settings.mode)) {
      const minorTag = isMinorCadenceMode(this.settings.mode) ? ` • ${tr("Moll", "Minor")}` : "";
      const diffNames = {
        1: tr("Basis", "Basics"),
        2: tr("Diatonisch", "Diatonic"),
        3: tr("Doppeldom.", "Sec. Dom."),
        4: tr("Jazz & Tritone", "Jazz & Tritone")
      };
      const posShort = this.settings.cadencePos === "random"
        ? tr("Zufallstakt", "Random Bar")
        : tr("Takt 4", "Bar 4");
      const diffText = `${lvlWord} ${this.settings.difficulty} (${diffNames[this.settings.difficulty] || tr("Basis", "Basics")})`;
      return includeCategory
        ? `${tr("Kadenzen", "Cadences")}${minorTag} • ${diffText} • ${posShort}`
        : `${posShort} • ${diffText}${minorTag}`;
    }
    if (this.settings.mode === "melody") {
      const rangeInfo = getLocalizedMelodyRange(this.settings.melodyRange || "do-fa");
      const keyLabel = this.settings.melodyKeyMode === "random" ? tr("Zufallstonart", "Random Keys") : getKeyDisplayName("C");
      const octLabel = this.settings.melodyOctaveMode === "multi" ? tr("Mehrere Okt.", "Multi-Octave") : tr("1 Oktave", "1 Octave");
      const mStyle = this.settings.melodyStyle || "rhythmic";
      const styleTag = mStyle === "dictation"
        ? tr("Kombi-Diktat", "Full Dictation")
        : (mStyle === "steady" ? tr("Gleichmäßig", "Steady") : tr("Rhythmisch", "Rhythmic"));
      return includeCategory
        ? `${tr("Melodien", "Melodies")} • ${styleTag} • ${rangeInfo.label} (${keyLabel}, ${octLabel})`
        : `${styleTag} • ${rangeInfo.label} • ${keyLabel}, ${octLabel}`;
    }
    if (isSingMatchMode(this.settings.mode) && typeof getSingMatchSummaryText === "function") {
      return getSingMatchSummaryText(this.settings.mode, includeCategory);
    }
    if (isMidiPlayMode(this.settings.mode) && typeof getMidiPlaySummaryText === "function") {
      return getMidiPlaySummaryText(this.settings.mode, includeCategory);
    }
    if (this.settings.mode === "solfege") {
      const lvl = parseInt(this.settings.solfegeDifficulty, 10) || 1;
      const lvlText = getSolfegeLevelSummaryLabel(lvl);
      return includeCategory ? `Solfège • ${lvlText}` : lvlText;
    }
    if (this.settings.mode === "rhythm-meter") {
      const names = {
        1: tr("Basis (4/4 & 3/4)", "Basics (4/4 & 3/4)"),
        2: "2/4, 3/4, 4/4, 6/8",
        3: tr("Ungerade Takte", "Odd Meters")
      };
      const lvl = this.settings.rhythmMeterDifficulty || 1;
      const prefix = includeCategory ? tr("Rhythmus: Taktart", "Rhythm: Meter") : tr("Taktart", "Meter");
      return `${prefix} • ${lvlWord} ${lvl} (${names[lvl] || tr("Basis", "Basics")})`;
    }
    if (this.settings.mode === "rhythm-dictation") {
      const names = {
        1: tr("Puls & Pausen", "Pulse & Rests"),
        2: tr("Achtel & Triolen", "Eighths & Triplets"),
        3: tr("Sechzehntel", "16th Notes"),
        4: tr("Punkt. & Synkopen", "Dotted & Syncopation")
      };
      const lvl = this.settings.rhythmDictationDifficulty || 1;
      const prefix = includeCategory ? tr("Rhythmus: Diktat", "Rhythm: Dictation") : tr("Diktat", "Dictation");
      return `${prefix} • ${lvlWord} ${lvl} (${names[lvl] || tr("Basis", "Basics")})`;
    }
    if (this.settings.mode === "rhythm-tap") {
      const lvl = this.settings.rhythmTapDifficulty || 1;
      const lvlObj = getLocalizedRhythmTapLevel(lvl);
      const isRead = Boolean(this.settings.rhythmTapReadMode);
      const prefix = isRead
        ? (includeCategory ? tr("Rhythmus: Vom Blatt tappen", "Rhythm: Tap from Notation") : tr("Vom Blatt tappen", "Tap from Notation"))
        : (includeCategory ? tr("Rhythmus: Nachklopfen", "Rhythm: Rhythm Tap") : tr("Nachklopfen", "Rhythm Tap"));
      return `${prefix} • ${lvlWord} ${lvl} (${lvlObj?.label || tr("Puls-Anker", "Pulse Anchor")})`;
    }
    if (this.settings.mode === "rhythm-groove") {
      const names = {
        1: tr("Groove-Stile", "Groove Styles"),
        2: tr("Offbeat-Akzent", "Offbeat Accent"),
        3: tr("Mikro-Timing (Mittel)", "Micro-Timing (Mid)"),
        4: tr("Mikro-Timing (Profi)", "Micro-Timing (Pro)")
      };
      const lvl = this.settings.rhythmGrooveDifficulty || 1;
      const prefix = includeCategory ? tr("Rhythmus: Groove & Timing", "Rhythm: Groove & Timing") : tr("Groove & Timing", "Groove & Timing");
      return `${prefix} • ${lvlWord} ${lvl} (${names[lvl] || tr("Basis", "Basics")})`;
    }
    if (this.settings.mode === "prod-tone") {
      const lvl = this.settings.prodToneDifficulty || 1;
      const prefix = includeCategory ? tr("Produktion: Frequenzen", "Production: Frequencies") : tr("Frequenzen", "Frequencies");
      return `${prefix} • ${lvlWord} ${lvl} (${getLocalizedProdLevelLabel("tone", lvl)})`;
    }
    if (this.settings.mode === "prod-eq-noise") {
      const names = {
        1: tr("Breiter EQ (+10 dB)", "Wide EQ (+10 dB)"),
        2: tr("Oktav-EQ (+8,5 dB)", "Octave EQ (+8.5 dB)"),
        3: tr("Chirurgisch (+7 dB)", "Surgical (+7 dB)")
      };
      const lvl = this.settings.prodEqNoiseDifficulty || 1;
      const prefix = includeCategory ? tr("Produktion: EQ im Noise", "Production: Pink Noise EQ") : tr("EQ im Noise", "Pink Noise EQ");
      return `${prefix} • ${lvlWord} ${lvl} (${names[lvl] || tr("Breiter EQ", "Wide EQ")})`;
    }
    if (this.settings.mode === "modes-scale") {
      const lvl = this.settings.modesScaleDifficulty || 1;
      const prefix = includeCategory ? tr("Modi: Tonleitern", "Modes: Scales") : tr("Tonleitern", "Scales");
      return `${prefix} • ${lvlWord} ${lvl} (${getLocalizedModeLevelLabel("scale", lvl)})`;
    }
    if (this.settings.mode === "modes-char") {
      const lvl = this.settings.modesCharDifficulty || 1;
      const prefix = includeCategory ? tr("Modi: Charakterton", "Modes: Color Note") : tr("Charakterton", "Color Note");
      return `${prefix} • ${lvlWord} ${lvl} (${getLocalizedModeLevelLabel("char", lvl)})`;
    }
    if (this.settings.mode === "modes-cadence") {
      const lvl = this.settings.modesCadenceDifficulty || 1;
      const prefix = includeCategory ? tr("Modi: Kadenzen", "Modes: Chord Loops") : tr("Kadenzen & Akkordpendel", "Modal Chord Loops");
      return `${prefix} • ${lvlWord} ${lvl} (${getLocalizedModeLevelLabel("cadence", lvl)})`;
    }
    if (isNotationMode(this.settings.mode)) {
      const isSym = isNotationSymbolsMode(this.settings.mode);
      const maxLvl = (isSym || this.settings.mode === "notation-grand") ? 5 : 4;
      const lvl = Math.max(1, Math.min(maxLvl, parseInt(this.settings.notationDifficulty, 10) || 1));
      const clefNames = {
        "notation-treble":  tr("Violinschlüssel", "Treble Clef"),
        "notation-bass":    tr("Bassschlüssel", "Bass Clef"),
        "notation-alto":    tr("Altschlüssel", "Alto Clef"),
        "notation-mixed":   tr("Schlüssel-Mix", "Mixed Clefs"),
        "notation-grand":   tr("Doppelsystem", "Grand Staff"),
        "notation-chords":  tr("Akkorde lesen", "Chord Reading"),
        "notation-symbols": tr("Symbole & Spielanweisungen", "Symbols & Markings")
      };
      const lvlNames = {
        1: tr("5 Linien", "On Staff"),
        2: tr("±2 Hilfslinien", "±2 Ledgers"),
        3: tr("±3 Hilfslinien", "±3 Ledgers"),
        4: tr("3 Hilfsl. + ♯/♭", "3 Ledgers + ♯/♭")
      };
      const clefText = clefNames[this.settings.mode] || tr("Violinschlüssel", "Treble Clef");
      const prefix = includeCategory ? `${tr("Notation", "Notation")}: ${clefText}` : clefText;
      const keyMode = isSym ? "none" : normalizeNotationKeyMode(this.settings.notationKeyMode);
      const keyTag = keyMode !== "none" ? ` • ${getLocalizedNotationKeyModeLabel(keyMode, true)}` : "";
      const lvlText = isSym
        ? (typeof getNotationSymbolsLevelLabel === "function" ? getNotationSymbolsLevelLabel(lvl) : String(lvl))
        : (this.settings.mode === "notation-chords" ? getNotationChordLevelTag(lvl) : lvlNames[lvl]);
      return `${prefix} • ${lvlWord} ${lvl} (${lvlText})${keyTag}`;
    }
    if (isChordQualityMode(this.settings.mode)) {
      const chordDiffNames = {
        1: tr("Dreiklänge", "Triads"),
        2: tr("Sept & Sus", "7th & Sus"),
        3: tr("Erweitert", "Extended"),
        4: tr("Jazz & Optionstöne", "Jazz Tensions")
      };
      const chordTypeLabels = includeCategory
        ? {
            "chord-arp-up":   tr("Akkord-Arpeggio (Aufwärts ↗)", "Chords (Arpeggio ↗)"),
            "chord-arp-down": tr("Akkord-Arpeggio (Abwärts ↘)", "Chords (Arpeggio ↘)"),
            "interval-chords": tr("Akkorde (Gleichzeitig)", "Chords (Simultaneous)")
          }
        : {
            "chord-arp-up":   tr("Arpeggio (Aufwärts ↗)", "Arpeggio (Ascending ↗)"),
            "chord-arp-down": tr("Arpeggio (Abwärts ↘)", "Arpeggio (Descending ↘)"),
            "interval-chords": tr("Gleichzeitiger Klang", "Simultaneous")
          };
      const lvl = this.settings.chordDifficulty || 1;
      return `${chordTypeLabels[this.settings.mode] || tr("Akkorde", "Chords")} • ${lvlWord} ${lvl} (${chordDiffNames[lvl] || tr("Dreiklänge", "Triads")})`;
    }
    if (this.settings.mode === "chord-inversions") {
      const invDiffNames = {
        1: tr("Dur-Dreiklang", "Major Triad"),
        2: tr("Dur & Moll", "Major & Minor"),
        3: tr("Septakkorde (4)", "7th Chords (4)")
      };
      const lvl = this.settings.chordInversionDifficulty || 1;
      const prefix = includeCategory ? tr("Akkordumkehrungen", "Chord Inversions") : tr("Umkehrungen", "Inversions");
      return `${prefix} • ${lvlWord} ${lvl} (${invDiffNames[lvl] || tr("Dur-Dreiklang", "Major Triad")})`;
    }
    const intLvl = parseInt(this.settings.intervalDifficulty, 10) || 1;
    const intDiffNames = {
      1: `${lvlWord} 1 (${tr("Einsteiger", "Beginner")})`,
      2: `${lvlWord} 2 (${tr("Dur 1–4", "Major 1–4")})`,
      3: `${lvlWord} 3 (${tr("Dur 5–8", "Major 5–8")})`,
      4: `${lvlWord} 4 (${tr("Dur-Tonleiter", "Major Scale")})`,
      5: `${lvlWord} 5 (${tr("Alle Intervalle", "All Intervals")})`,
      6: `${tr("Moll", "Minor")} 1 (${tr("Einsteiger", "Beginner")})`,
      7: `${tr("Moll", "Minor")} 2 (${tr("Moll 1–4", "Minor 1–4")})`,
      8: `${tr("Moll", "Minor")} 3 (${tr("Moll 5–8", "Minor 5–8")})`,
      9: `${tr("Moll", "Minor")} 4 (${tr("Moll-Tonleiter", "Minor Scale")})`,
      10: typeof getIntervalCustomSummaryLabel === "function"
        ? getIntervalCustomSummaryLabel()
        : tr("Eigene Tonart & Modus", "Custom Key & Mode")
    };
    const typeLabels = includeCategory
      ? {
          "interval-melodic": tr("Intervalle Melodisch (Aufwärts)", "Melodic Intervals (Ascending)"),
          "interval-melodic-down": tr("Intervalle Melodisch (Abwärts)", "Melodic Intervals (Descending)"),
          "interval-harmonic": tr("Intervalle Harmonisch", "Harmonic Intervals"),
          "interval-drone": tr("Intervalle über Grundton-Fläche", "Intervals Over Root Pad")
        }
      : {
          "interval-melodic": tr("Melodisch (Aufwärts)", "Melodic (Ascending)"),
          "interval-melodic-down": tr("Melodisch (Abwärts)", "Melodic (Descending)"),
          "interval-harmonic": tr("Harmonisch", "Harmonic"),
          "interval-drone": tr("Grundton-Fläche", "Root Pad")
        };
    const typeLabel = typeLabels[this.settings.mode] || tr("Intervalle", "Intervals");
    return `${typeLabel} • ${intDiffNames[intLvl] || intDiffNames[1]}`;
  }

  updateHeaderSubtext() {
    const el = document.getElementById("subHeaderInfo");
    const mainTitle = document.getElementById("headerMainTitle");
    if (!el || !mainTitle) return;
    // Hauptreiter (Übungen, Werkzeuge, Wissen, Konto) bekommen einen großen Titel;
    // Unterseiten und Übungen behalten die kompakte Größe für lange Titel.
    mainTitle.classList.toggle("is-main-tab-title", ["home", "tools", "knowledge", "space"].includes(this.currentView));

    if (this.currentView === "home") {
      mainTitle.textContent = tr("Übungen", "Home");
      el.textContent = typeof getStaticI18nText === "function"
        ? (getStaticI18nText("app.tagline") || tr("Genauer hinhören.", "Listen a little closer."))
        : tr("Genauer hinhören.", "Listen a little closer.");
    } else if (this.currentView === "tools") {
      mainTitle.textContent = tr("Werkzeuge", "Tools");
      el.textContent = tr("Metronom, Tuner, Freies Spiel & Griffbrett", "Metronome, Tuner, Free Play & Fretboard");
    } else if (this.currentView === "knowledge") {
      mainTitle.textContent = tr("Wissen", "Knowledge");
      if (this.activeKnowledgeTab === "instruments") {
        el.textContent = tr("Instrumentenkunde, Besetzungen & Klangfarben", "Instrument Families, Ensembles & Timbres");
      } else if (this.activeKnowledgeTab === "articles") {
        el.textContent = tr("Hintergründe, Musikpsychologie & Praxiswissen", "Insights, Music Psychology & Practical Essays");
      } else {
        el.textContent = tr("Referenzen, Quintenzirkel, Gesang & Klang-Physik", "References, Circle of Fifths, Voice & Acoustics");
      }
    } else if (this.currentView === "knowledge-detail") {
      mainTitle.textContent = this.knowledgeTitle;
      el.textContent = this.knowledgeSub;
    } else if (this.currentView === "space") {
      mainTitle.textContent = tr("Mein Konto", "My Account");
      el.textContent = tr("Profil, Mixe & Vorlieben", "Profile, Mixes & Preferences");
    } else if (this.currentView === "category" || this.currentView === "category-help") {
      if (this.currentView === "category" && this.activeCategorySection) {
        mainTitle.textContent = this.activeCategorySectionTitle || getCategoryTitle(this.activeCategory);
        el.textContent = `${getCategoryTitle(this.activeCategory)} • ${tr("Schwierigkeitsgrad wählen", "Choose difficulty")}`;
      } else {
        mainTitle.textContent = getCategoryTitle(this.activeCategory);
        el.textContent = this.currentView === "category-help"
          ? tr("So funktioniert’s • Anleitung & Aufgaben", "How It Works • Guide & Levels")
          : (this.activeCategory === "warmup"
              ? tr("Wähle Programm & Tonumfang", "Choose routine & vocal range")
              : tr("Wähle einen Aufgabentyp", "Choose an exercise type"));
      }
    } else if (this.currentView === "exam-setup") {
      mainTitle.textContent = tf("{cat} • Prüfung", "{cat} • Exam", {
        cat: getCategoryTitle(this.examSetupCategory || this.activeCategory)
      });
      el.textContent = tr("Schwierigkeitsstufe & Optionen wählen", "Choose level & exam options");
    } else if (this.currentView === "exam-result") {
      const resCat = this.activeExamResultObj?.categoryKey || this.examSetupCategory || this.activeCategory;
      mainTitle.textContent = tr("Ergebnis", "Result");
      el.textContent = getCategoryTitle(resCat);
    } else if (this.currentView === "warmup") {
      const presetId = this.warmup?.presetId || "full-5min";
      const preset = typeof getLocalizedWarmupPreset === "function"
        ? getLocalizedWarmupPreset(presetId)
        : null;
      const range = typeof getLocalizedWarmupVoiceRange === "function"
        ? getLocalizedWarmupVoiceRange(this.warmup?.voiceRange || "mixed")
        : null;
      const isWarmupPreset = presetId === "full-5min" || presetId === "quick-3min";
      mainTitle.textContent = isWarmupPreset
        ? tr("Einsing-Helfer", "Vocal Warmup")
        : tr("Singen", "Singing");
      el.textContent = `${preset ? preset.title : tr("5-Minuten Einsingen", "5-Min Warmup")} • ${range ? range.label : tr("Chor-Mitte", "Choir Mid")}`;
    } else if (this.currentView === "metronome") {
      const metro = this.metronome || {};
      const beatLen = Array.isArray(metro.beats) ? metro.beats.length : 4;
      mainTitle.textContent = tr("Metronom", "Metronome");
      el.textContent = tf("{bpm} BPM • {n} Zählzeiten", "{bpm} BPM • {n} Beats", {
        bpm: metro.bpm || METRONOME_DEFAULT_BPM,
        n: beatLen
      });
    } else if (this.currentView === "tuner") {
      mainTitle.textContent = tr("Tuner", "Tuner");
      const tp = typeof getTunerPrefs === "function" ? getTunerPrefs() : null;
      const tInst = tp ? TUNER_INSTRUMENTS[tp.instrument] : null;
      const tTun = tInst?.tunings ? tInst.tunings[tp.tuning] : null;
      el.textContent = tInst
        ? `${tr(tInst.de, tInst.en)}${tTun ? ` • ${tr(tTun.de, tTun.en)}` : ""}`
        : tr("Stimmgerät & Tonhöhen-Anzeige", "Chromatic tuner & pitch meter");
    } else if (this.currentView === "freeplay") {
      mainTitle.textContent = tr("Freies Spiel", "Free Play");
      el.textContent = tr("Freies Ausprobieren mit Klaviatur & Klängen", "Explore notes & sounds freely");
    } else if (this.currentView === "fretboard") {
      mainTitle.textContent = tr("Griffbrett", "Fretboard");
      el.textContent = tr("Gitarren-Akkorde, Umkehrsuche & Tonleitern", "Guitar chords, reverse finder & scales");
    } else if (this.currentView === "circle") {
      mainTitle.textContent = tr("Quintenzirkel", "Circle of Fifths");
      el.textContent = tr("Interaktives Klangrad, Akkorde, Vorzeichen & Modulation", "Interactive key wheel, chords, key signatures & modulation");
    } else if (this.currentView === "capo") {
      mainTitle.textContent = tr("Kapodaster-Übersetzer", "Capo Translator");
      el.textContent = tr("Klingende Tonart, Kapo-Bund & Greif-Formen direkt umrechnen", "Convert sounding key, capo fret & chord shapes instantly");
    } else if (this.currentView === "nashville") {
      mainTitle.textContent = tr("Nashville-Zahlensystem", "Nashville Number System");
      el.textContent = tr("Tonarten-Diagramm & 12-Tonarten-Matrix", "Key diagram & 12-key matrix");
    } else if (this.currentView === "exercise" && this.exam?.active) {
      const curQ = Math.min((this.exam.currentIdx || 0) + 1, this.exam.totalQuestions || 1);
      const presetMeta = typeof getExamPresetById === "function" ? getExamPresetById(this.exam.categoryKey, this.exam.levelId) : null;
      const levelLbl = presetMeta ? (tr(presetMeta.title.de, presetMeta.title.en)) : "";
      mainTitle.textContent = tf("Prüfung: {cat}", "Exam: {cat}", { cat: getCategoryTitle(this.exam.categoryKey) });
      el.textContent = `${levelLbl ? `${levelLbl} • ` : ""}${tf("Frage {n} / {tot}", "Question {n} / {tot}", { n: curQ, tot: this.exam.totalQuestions })}`;
    } else {
      mainTitle.textContent = getCategoryTitle(getCategoryForMode(this.settings.mode));
      el.textContent = this.getModeSummaryText(false);
    }
  }

  updateQuickStartLabel() {
    const label = document.getElementById("quickStartLabel");
    if (label) {
      const key = "home.continue";
      label.setAttribute("data-i18n", key);
      const text = typeof getStaticI18nText === "function" ? getStaticI18nText(key) : null;
      if (text) label.textContent = text;
    }
  }
}

const state = new AppState();

function getCustomThemeEntry(themeId) {
  if (!CUSTOM_THEME_SLOT_IDS.includes(themeId)) return null;
  const slots = typeof state !== "undefined" ? state?.profile?.customThemes : null;
  if (!Array.isArray(slots)) return null;
  return slots.find(item => item && item.id === themeId) || null;
}

function getActivePaletteMeta() {
  const theme = ALL_VALID_THEMES.includes(state.settings.theme) ? state.settings.theme : "waldlichtung";
  const customEntry = getCustomThemeEntry(theme);
  if (customEntry?.paletteMeta) {
    return customEntry.paletteMeta;
  }
  const effective = (theme === "metal" || theme === "mitternacht") ? "dark" : resolveEffectiveAppearance(state.settings.appearance);
  const entry = THEME_PALETTE_META[theme] || THEME_PALETTE_META.waldlichtung;
  return entry[effective] || entry.light;
}

function applyThemeAndAppearance() {
  const appearance = VALID_APPEARANCES.includes(state.settings.appearance) ? state.settings.appearance : "light";
  let theme = ALL_VALID_THEMES.includes(state.settings.theme) ? state.settings.theme : "waldlichtung";
  let customEntry = getCustomThemeEntry(theme);
  if (CUSTOM_THEME_SLOT_IDS.includes(theme) && !customEntry) {
    theme = "waldlichtung";
    saveVisualPrefs(appearance, theme, state.settings.language);
  }
  if (typeof isThemeAllowedInExplorer === "function" && !isThemeAllowedInExplorer(theme)) {
    theme = "waldlichtung";
    saveVisualPrefs(appearance, theme, state.settings.language);
  }
  if (typeof getBonusThemeLockInfo === "function") {
    const activeBonus = getBonusThemeLockInfo(theme);
    if (activeBonus.isBonus && !activeBonus.unlocked) {
      theme = "waldlichtung";
      saveVisualPrefs(appearance, theme, state.settings.language);
    }
  }
  const effective = customEntry
    ? (customEntry.isDark ? "dark" : "light")
    : ((theme === "metal" || theme === "mitternacht") ? "dark" : resolveEffectiveAppearance(appearance));

  state.settings.appearance = appearance;
  state.settings.theme = theme;

  if (customEntry) {
    applyCustomThemeCssVars(customEntry);
  } else {
    clearCustomThemeCssVars();
  }

  if (typeof document !== "undefined" && document.documentElement) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-appearance", effective);
  }
  if (typeof refreshAllVisibleMascotsForTheme === "function") {
    refreshAllVisibleMascotsForTheme();
  }

  const activeMeta = customEntry?.paletteMeta || (THEME_PALETTE_META[theme] || THEME_PALETTE_META.waldlichtung)[effective];
  const metaEl = typeof document !== "undefined" ? document.getElementById("metaThemeColor") : null;
  if (metaEl && activeMeta) {
    metaEl.setAttribute("content", activeMeta.bg);
  }
  if (typeof syncNativeSystemBars === "function") {
    syncNativeSystemBars(effective);
  }

  if (typeof document !== "undefined" && typeof document.querySelectorAll === "function") {
    document.querySelectorAll("button[data-appearance]").forEach(btn => {
      const btnVal = btn.dataset?.appearance
        || btn.getAttribute?.("data-appearance");
      const isSelected = btnVal === appearance;
      btn.classList?.toggle("active", isSelected);
      btn.setAttribute?.("aria-pressed", String(isSelected));
    });

    const builtInEffective = resolveEffectiveAppearance(appearance);
    document.querySelectorAll("[data-theme-choice]").forEach(card => {
      const cardTheme = card.dataset?.themeChoice;
      const bonusInfo = typeof getBonusThemeLockInfo === "function" ? getBonusThemeLockInfo(cardTheme) : { isBonus: false, unlocked: true };
      const isLocked = Boolean(bonusInfo.isBonus && !bonusInfo.unlocked);
      const isSelected = !isLocked && cardTheme === theme;
      card.classList?.toggle("active", isSelected);
      card.classList?.toggle("is-bonus-locked", isLocked);
      card.setAttribute?.("aria-pressed", String(isSelected));
      if (isLocked) {
        card.setAttribute?.("aria-disabled", "true");
      } else {
        card.removeAttribute?.("aria-disabled");
      }

      const statusEl = typeof card.querySelector === "function" ? card.querySelector(".theme-status") : null;
      if (statusEl) {
        if (isLocked && typeof formatAchievementUI === "function") {
          statusEl.textContent = formatAchievementUI("lockAt", { n: bonusInfo.requiredCount });
        } else {
          statusEl.textContent = isSelected ? tr("Aktiv", "Active") : tr("Auswählen", "Select");
        }
      }

      const customCard = getCustomThemeEntry(cardTheme);
      const cardPalette = customCard?.paletteMeta || (THEME_PALETTE_META[cardTheme] || THEME_PALETTE_META.waldlichtung)[(cardTheme === "metal" || cardTheme === "mitternacht") ? "dark" : builtInEffective];
      if (cardPalette && typeof card.querySelectorAll === "function") {
        card.querySelectorAll("[data-swatch]").forEach(dot => {
          const idx = parseInt(dot.dataset?.swatch, 10);
          if (!Number.isNaN(idx) && cardPalette.swatches[idx] && dot.style) {
            dot.style.backgroundColor = cardPalette.swatches[idx];
          }
        });
      }
    });
  }

  if (typeof renderCustomThemeSlots === "function") {
    renderCustomThemeSlots();
  }
  if (typeof renderSettingsCustomThemes === "function") {
    renderSettingsCustomThemes();
  }
}

function setAppearancePreference(nextAppearance) {
  state.settings.appearance = VALID_APPEARANCES.includes(nextAppearance) ? nextAppearance : "light";
  if (CUSTOM_THEME_SLOT_IDS.includes(state.settings.theme)) {
    state.settings.theme = "waldlichtung";
  }
  saveVisualPrefs(state.settings.appearance, state.settings.theme, state.settings.language);
  applyThemeAndAppearance();
}

function setThemePreference(nextTheme) {
  if (typeof isThemeAllowedInExplorer === "function" && !isThemeAllowedInExplorer(nextTheme)) {
    return;
  }
  if (typeof getBonusThemeLockInfo === "function") {
    const bonusInfo = getBonusThemeLockInfo(nextTheme);
    if (bonusInfo.isBonus && !bonusInfo.unlocked) {
      if (typeof showAppToast === "function" && typeof formatAchievementUI === "function") {
        showAppToast(formatAchievementUI("lockNeedMore", { n: bonusInfo.remaining }), "info", 3200);
      }
      return;
    }
  }
  const valid = ALL_VALID_THEMES.includes(nextTheme)
    && (!CUSTOM_THEME_SLOT_IDS.includes(nextTheme) || Boolean(getCustomThemeEntry(nextTheme)));
  state.settings.theme = valid ? nextTheme : "waldlichtung";
  saveVisualPrefs(state.settings.appearance, state.settings.theme, state.settings.language);
  applyThemeAndAppearance();
}

function syncLanguageControls(lang = state?.settings?.language || "de") {
  const active = typeof normalizeAppLanguage === "function" ? normalizeAppLanguage(lang) : "de";
  if (typeof syncLanguageSelectOptions === "function") {
    syncLanguageSelectOptions(active);
  } else {
    const selectEl = document.getElementById("languageSelect");
    if (selectEl && selectEl.value !== active) {
      selectEl.value = active;
    }
  }
  if (typeof renderSettingsLanguageDropdown === "function") {
    renderSettingsLanguageDropdown(active);
  }
}

/**
 * Zeichnet die Ansichten neu, die Wissenstexte zeigen – nach dem Nachladen einer Wissens-Sprache
 * (ensureKnowledgeLanguageLoaded in knowledge.js). Nur wenn die Sprache noch aktiv ist.
 */
function refreshKnowledgeDependentViews(loadedLang) {
  if (loadedLang && state.settings.language !== loadedLang) return;
  renderKnowledgeHub();
  if (state.currentView === "category-help") {
    openCategoryHelpPage(state.activeCategory, { refreshOnly: true });
  } else if (state.currentView === "circle" && typeof renderCircleOfFifthsView === "function") {
    renderCircleOfFifthsView();
  } else if (state.currentView === "knowledge-detail" && state.activeKnowledgeDetail) {
    if (state.activeKnowledgeDetail.kind === "article") {
      openKnowledgeArticle(state.activeKnowledgeDetail.id, { refreshOnly: true });
    } else {
      openKnowledgeRef(state.activeKnowledgeDetail.key, { refreshOnly: true });
    }
  }
}

function requestKnowledgeLanguage(lang) {
  if (typeof ensureKnowledgeLanguageLoaded === "function") {
    ensureKnowledgeLanguageLoaded(lang, refreshKnowledgeDependentViews);
  }
}

function setLanguagePreference(nextLang) {
  const lang = typeof normalizeAppLanguage === "function" ? normalizeAppLanguage(nextLang) : (nextLang === "en" ? "en" : "de");
  const langCfg = typeof getLanguageConfig === "function" ? getLanguageConfig(lang) : null;
  state.settings.language = lang;
  saveVisualPrefs(state.settings.appearance, state.settings.theme, lang);
  requestKnowledgeLanguage(lang);

  if (state.profile) {
    let profileUpdated = false;
    if (!state.profile.notationManual) {
      state.profile.notation = langCfg ? langCfg.defaultNotation : (lang === "en" ? "intl" : "de");
      profileUpdated = true;
    }
    if (!state.profile.intervalNotationManual) {
      state.profile.intervalNotation = langCfg ? langCfg.defaultIntervalNotation : (lang === "en" ? "intl" : "de");
      profileUpdated = true;
    }
    if (profileUpdated) {
      saveUserProfile(state.profile);
      if (state.currentExercise) {
        applyProfileDisplayChanges();
      }
    }
  }

  if (typeof applyStaticDomLanguage === "function") {
    applyStaticDomLanguage(lang);
  }
  syncLanguageControls(lang);
  syncAnswerSoundToggleUI();
  syncBreakReminderControls();
  syncPianoSoundControls();
  if (typeof syncAllMidiUI === "function") syncAllMidiUI();
  applyThemeAndAppearance();

  const muteBtn = document.getElementById("masterMuteToggle");
  if (muteBtn) {
    muteBtn.textContent = state.master.muted ? tr("Stumm", "Muted") : tr("An", "On");
    muteBtn.title = state.master.muted ? tr("Ton einschalten", "Unmute Audio") : tr("Stummschalten", "Mute Audio");
  }

  if (state.settings.randomBpm) {
    const inlineBpmVal = document.getElementById("inlineBpmVal");
    if (inlineBpmVal) inlineBpmVal.textContent = tr("Zufall", "Random");
  }

  refreshCurrentQuoteLocalization();
  renderHomeProfileGreeting();
  renderHomeQuickMixBar();
  state.updateQuickStartLabel();
  renderKnowledgeHub();
  renderProfileAccountView();
  populateMixCreatorControls({ forceRepopulate: true });

  if (state.currentView === "category") {
    openCategoryPage(state.activeCategory, { sectionId: state.activeCategorySection, refreshOnly: true });
  } else if (state.currentView === "category-help") {
    openCategoryHelpPage(state.activeCategory, { refreshOnly: true });
  } else if (state.currentView === "exam-setup") {
    openExamSetupPage(state.examSetupCategory, { refreshOnly: true });
  } else if (state.currentView === "exam-result") {
    renderExamResultView();
  } else if (state.currentView === "circle" && typeof renderCircleOfFifthsView === "function") {
    renderCircleOfFifthsView();
  } else if (state.currentView === "capo" && typeof renderCapoView === "function") {
    renderCapoView();
  } else if (state.currentView === "nashville" && typeof renderNashvilleView === "function") {
    renderNashvilleView();
  } else if (state.currentView === "knowledge-detail" && state.activeKnowledgeDetail) {
    if (state.activeKnowledgeDetail.kind === "article") {
      openKnowledgeArticle(state.activeKnowledgeDetail.id, { refreshOnly: true });
    } else {
      openKnowledgeRef(state.activeKnowledgeDetail.key, { refreshOnly: true });
    }
  }

  if (state.currentExercise) {
    refreshExerciseLocalization(state.currentExercise);
    if (state.currentView === "exercise") {
      renderUI();
    }
  } else {
    updatePlayButtonUI(state.isPlaying);
    if (typeof renderStageStreakUI === "function") renderStageStreakUI();
  }

  if (state.exam?.active && state.currentView === "exercise") {
    renderExamStatusBar();
  }

  if (typeof renderWarmupView === "function" && state.currentView === "warmup") {
    renderWarmupView();
  }
  if (typeof renderMetronomeView === "function" && state.currentView === "metronome") {
    renderMetronomeView();
  }
  if (typeof renderTunerPreviewView === "function" && state.currentView === "tuner") {
    renderTunerPreviewView();
  }

  state.updateHeaderSubtext();
}

function syncAutoNextControls() {
  const enabled = state.settings.autoNextAfterCorrect !== false;
  document.querySelectorAll("[data-auto-next]").forEach(btn => {
    const rawVal = btn.dataset?.autoNext !== undefined ? btn.dataset.autoNext : btn.dataset?.welcomeAutonext;
    const isMatch = (rawVal !== "off") === enabled;
    btn.classList?.toggle("active", isMatch);
    btn.setAttribute?.("aria-pressed", String(isMatch));
  });
  const loopBtn = document.getElementById("loopToggleBtn");
  if (loopBtn) {
    const modeAutoNextMap = {
      melody: state.settings.melodyAutoNext,
      "rhythm-dictation": state.settings.rhythmDictationAutoNext,
      "rhythm-tap": state.settings.rhythmTapAutoNext
    };
    if (Object.prototype.hasOwnProperty.call(modeAutoNextMap, state.settings.mode)) {
      loopBtn.classList.toggle("btn-active", Boolean(modeAutoNextMap[state.settings.mode]));
    } else {
      loopBtn.classList.toggle("btn-active", Boolean(state.settings.loop));
    }
  }
}

function shouldPlayCorrectAnswerAudio() {
  return state?.settings?.playCorrectAnswerAudio !== false;
}

function syncAnswerSoundToggleUI() {
  const btn = document.getElementById("answerSoundToggleBtn");
  const lbl = document.getElementById("answerSoundBtnLabel");
  const enabled = shouldPlayCorrectAnswerAudio();
  const isNotationPractice = isNotationStaffMode(state?.currentExercise?.type) && !state?.exam?.active;
  if (btn) {
    btn.classList.toggle("hidden", !isNotationPractice);
    btn.classList.toggle("is-muted", !enabled);
    btn.setAttribute("aria-pressed", enabled ? "true" : "false");
    btn.title = tr(
      "Abspielen der richtigen Note ein-/ausschalten (Aus = stumm zur nächsten Note)",
      "Toggle playing the correct note sound (Off = move silently to next note)"
    );
  }
  if (lbl) {
    lbl.textContent = enabled
      ? tr("Notenton: An", "Note Audio: On")
      : tr("Notenton: Aus", "Note Audio: Off");
  }
}

function setPlayCorrectAnswerAudioPreference(nextEnabled) {
  const enabled = nextEnabled !== false && nextEnabled !== "off";
  state.settings.playCorrectAnswerAudio = enabled;
  saveVisualPrefs(
    state.settings.appearance,
    state.settings.theme,
    state.settings.language,
    state.settings.autoNextAfterCorrect,
    enabled
  );
  syncAnswerSoundToggleUI();
}

// ---------- ÜBUNGSSTAND (profile.practice, Prüfung in js/catalogs.js) ----------
// Merkt sich die zuletzt gestartete Übung samt Stufen & Optionen, damit Neustart, Handywechsel
// (Profil-Sicherung) und „Weiterüben“ dort weitermachen. Prüfungen ändern den Übungsstand nicht.
let _practiceDefaultSettings = null;

function getPracticeProgressKeys() {
  return ["mode", ...Object.keys(PRACTICE_LEVEL_KEYS), "notationKeyTrainerLevel", ...Object.keys(PRACTICE_OPTION_RULES), "intervalCustomPool"];
}

function snapshotPracticeSettings(settings = state.settings) {
  const raw = {};
  getPracticeProgressKeys().forEach(key => {
    if (settings[key] !== undefined) raw[key] = settings[key];
  });
  return sanitizePracticeProgress(raw);
}

function rememberPracticeProgress() {
  if (typeof state === "undefined" || !state?.profile || state.exam?.active) return;
  if (!_practiceDefaultSettings) _practiceDefaultSettings = snapshotPracticeSettings();
  const snap = snapshotPracticeSettings();
  const prev = state.profile.practice || {};
  if (JSON.stringify(snap) === JSON.stringify(prev)) return;
  state.profile.practice = snap;
  saveUserProfile(state.profile);
}

/**
 * Übernimmt einen gespeicherten Übungsstand in state.settings (Start, Profil laden).
 * resetMissing: Schlüssel ohne gespeicherten Wert auf die App-Standards zurücksetzen (Konto zurücksetzen).
 */
function applyPracticeProgressToSettings(practice = state?.profile?.practice, { resetMissing = false } = {}) {
  if (typeof state === "undefined" || !state?.settings || state.exam?.active) return false;
  if (!_practiceDefaultSettings) _practiceDefaultSettings = snapshotPracticeSettings();
  const saved = sanitizePracticeProgress(practice);
  const next = resetMissing ? { ..._practiceDefaultSettings, ...saved } : saved;
  if (resetMissing && !Object.prototype.hasOwnProperty.call(saved, "intervalCustomPool")) {
    next.intervalCustomPool = null;
  }
  if (!Object.keys(next).length) return false;

  // Feinprüfung gegen die Musik-Kataloge (erst jetzt geladen)
  if (typeof INTERVAL_SCALE_PRESETS === "object" && next.intervalCustomScale && !INTERVAL_SCALE_PRESETS[next.intervalCustomScale]) {
    delete next.intervalCustomScale;
  }
  if (Array.isArray(next.intervalCustomPool) && typeof HARMONIC_DATA === "object") {
    const pool = next.intervalCustomPool.filter(k => Object.prototype.hasOwnProperty.call(HARMONIC_DATA.intervals, k));
    next.intervalCustomPool = pool.length >= 2 ? pool : null;
  }
  if (typeof MELODY_RANGE_CONFIG === "object" && next.melodyRange && !MELODY_RANGE_CONFIG[next.melodyRange]) {
    delete next.melodyRange;
  }
  if (next.notationKeyMode !== undefined && typeof normalizeNotationKeyMode === "function") {
    next.notationKeyMode = normalizeNotationKeyMode(next.notationKeyMode);
  }
  if (next.notationKeyTrainerClef !== undefined && typeof isNotationMode === "function" && !isNotationMode(next.notationKeyTrainerClef)) {
    delete next.notationKeyTrainerClef;
  }
  // Notensystem-Übungen haben 4 Stufen, „Doppelsystem“ und „Symbole & Begriffe“ haben 5
  const nextMode = next.mode || state.settings.mode;
  if (next.notationDifficulty > 4 && typeof isNotationStaffMode === "function" && isNotationStaffMode(nextMode) && nextMode !== "notation-grand") {
    next.notationDifficulty = 4;
  }

  const solfegeLevel = next.solfegeDifficulty;
  delete next.solfegeDifficulty;
  Object.assign(state.settings, next);
  // Solfège über den Setter, damit Stufen mit „fester Zufallstonart“ ihre Sitzungstonart würfeln
  if (solfegeLevel !== undefined && typeof state.setSolfegeDifficulty === "function") {
    state.setSolfegeDifficulty(solfegeLevel);
  }
  if (typeof state.updateHeaderSubtext === "function") state.updateHeaderSubtext();
  return true;
}

function setAutoNextPreference(nextEnabled) {
  const enabled = nextEnabled !== false && nextEnabled !== "off";
  state.settings.autoNextAfterCorrect = enabled;
  state.settings.solfegeAutoNext = enabled;
  state.settings.melodyAutoNext = enabled;
  state.settings.rhythmDictationAutoNext = enabled;
  state.settings.rhythmTapAutoNext = enabled;
  saveVisualPrefs(
    state.settings.appearance,
    state.settings.theme,
    state.settings.language,
    enabled
  );
  syncAutoNextControls();
  if (state.currentExercise && state.currentView === "exercise") {
    renderUI();
  }
}

let _activeMixerTab = "levels";

const REVERB_DOM_MAP = Object.freeze({
  piano:   ["pianoReverbSlider", "pianoReverbDisplay"],
  guitar:  ["reverbGuitarSlider", "reverbGuitarDisplay"],
  strings: ["reverbStringsSlider", "reverbStringsDisplay"],
  brass:   ["reverbBrassSlider", "reverbBrassDisplay"],
  voice:   ["reverbVoiceSlider", "reverbVoiceDisplay"],
  bass:    ["reverbBassSlider", "reverbBassDisplay"]
});

const REVERB_PREVIEW_PROBES = Object.freeze({
  piano:   { style: "piano",   notes: ["C3", "G3", "D4", "E4", "B4"], dur: 1.55, gain: 0.95 },
  guitar:  { style: "guitar",  notes: ["C3", "G3", "D4", "E4"],       dur: 1.45, gain: 0.92 },
  strings: { style: "strings", notes: ["C3", "G3", "D4", "B4"],       dur: 1.85, gain: 0.90 },
  brass:   { style: "brass",   notes: ["C3", "G3", "C4", "E4"],       dur: 1.45, gain: 0.90 },
  voice:   { style: "choir",   notes: ["C4", "E4", "G4"],             dur: 1.65, gain: 0.90 },
  bass:    { style: "ebass",   notes: ["C2", "G2", "C3"],             dur: 1.15, gain: 0.95 }
});

function switchMixerTab(tabKey = "levels") {
  const nextTab = tabKey === "reverb" ? "reverb" : "levels";
  _activeMixerTab = nextTab;
  const levelsBtn = document.getElementById("mixerTabLevelsBtn");
  const reverbBtn = document.getElementById("mixerTabReverbBtn");
  const levelsPanel = document.getElementById("mixerTabLevels");
  const reverbPanel = document.getElementById("mixerTabReverb");
  levelsBtn?.classList.toggle("active", nextTab === "levels");
  reverbBtn?.classList.toggle("active", nextTab === "reverb");
  levelsBtn?.setAttribute("aria-selected", String(nextTab === "levels"));
  reverbBtn?.setAttribute("aria-selected", String(nextTab === "reverb"));
  levelsPanel?.classList.toggle("hidden", nextTab !== "levels");
  reverbPanel?.classList.toggle("hidden", nextTab !== "reverb");
}

async function previewInstrumentReverbSound(instKey = "piano") {
  await ensureAudioReady();
  audioEngine.stopPlayback();
  const probe = REVERB_PREVIEW_PROBES[instKey] || REVERB_PREVIEW_PROBES.piano;
  audioEngine.playInstrumentSample(probe.style, probe.notes, probe.dur, 0, probe.gain);
}

function getActivePianoSoundSettings() {
  return sanitizePianoSound(state?.profile?.pianoSound);
}

function syncPianoSoundControls() {
  const { character, reverb, instruments } = getActivePianoSoundSettings();

  document.querySelectorAll("[data-piano-char]").forEach(btn => {
    const isMatch = btn.dataset.pianoChar === character;
    btn.classList.toggle("active", isMatch);
    btn.setAttribute("aria-pressed", String(isMatch));
  });

  REVERB_INSTRUMENT_KEYS.forEach(instKey => {
    const [sliderId, displayId] = REVERB_DOM_MAP[instKey] || [];
    const pct = Math.round((instruments?.[instKey] ?? reverb) * 100);
    const slider = sliderId ? document.getElementById(sliderId) : null;
    const display = displayId ? document.getElementById(displayId) : null;
    if (slider) slider.value = String(pct);
    if (display) display.textContent = `${pct}%`;
  });

  audioEngine?.setPianoSoundProfile?.(character, instruments);
}

function setPianoCharacterPreference(character) {
  const validChar = Object.prototype.hasOwnProperty.call(PIANO_REVERB_BY_CHAR, character)
    ? character
    : DEFAULT_PIANO_SOUND.character;
  const presetMap = STEM_REVERB_PRESETS[validChar] || STEM_REVERB_PRESETS.natural;
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile.pianoSound = {
    character: validChar,
    reverb: presetMap.piano,
    instruments: { ...presetMap }
  };
  saveUserProfile(state.profile);
  syncPianoSoundControls();
}

function setInstrumentReverbPreference(instrumentKey, mixNormalized) {
  const key = REVERB_INSTRUMENT_KEYS.includes(instrumentKey) ? instrumentKey : "piano";
  const cur = getActivePianoSoundSettings();
  const nextInstruments = {
    ...cur.instruments,
    [key]: sanitizeMetronomeMixValue(mixNormalized, cur.instruments[key] ?? cur.reverb)
  };
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile.pianoSound = {
    character: cur.character,
    reverb: nextInstruments.piano,
    instruments: nextInstruments
  };
  saveUserProfile(state.profile);
  syncPianoSoundControls();
}

function setPianoReverbPreference(mixNormalized) {
  setInstrumentReverbPreference("piano", mixNormalized);
}

function getActiveDroneMixSettings() {
  return sanitizeDroneMix(state?.profile?.droneMix);
}

function syncDroneMixControls() {
  const { pad, tone } = getActiveDroneMixSettings();
  const padPct = Math.round(pad * 100);
  const tonePct = Math.round(tone * 100);
  const padSlider = document.getElementById("dronePadVolSlider");
  const padVal = document.getElementById("dronePadVolVal");
  const toneSlider = document.getElementById("droneToneVolSlider");
  const toneVal = document.getElementById("droneToneVolVal");
  if (padSlider) padSlider.value = String(padPct);
  if (padVal) padVal.textContent = `${padPct}%`;
  if (toneSlider) toneSlider.value = String(tonePct);
  if (toneVal) toneVal.textContent = `${tonePct}%`;
  audioEngine?.setDroneIntervalMix?.(pad, tone);
}

function setDroneMixValue(channel, mixNormalized) {
  if (channel !== "pad" && channel !== "tone") return;
  const cur = getActiveDroneMixSettings();
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile.droneMix = {
    ...cur,
    [channel]: sanitizeMetronomeMixValue(mixNormalized, cur[channel])
  };
  saveUserProfile(state.profile);
  syncDroneMixControls();
}

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const GERMAN_WHITE_LABELS = { 0: "C", 2: "D", 4: "E", 5: "F", 7: "G", 9: "A", 11: "H" };
const INTL_WHITE_LABELS   = { 0: "C", 2: "D", 4: "E", 5: "F", 7: "G", 9: "A", 11: "B" };
const INTL_KEY_NAMES = {
  "Bb": "Bb-Dur", "Eb": "Eb-Dur", "Ab": "Ab-Dur", "B": "B-Dur", "F#": "F#-Dur", "Db": "Db-Dur"
};
const SOLFEGE_DEGREE_NUMBERS = {
  "Do": "1", "Do_low": "1", "Do_high": "1",
  "Re": "2",
  "Mi": "3", "Me": "b3",
  "Fa": "4",
  "Sol": "5",
  "La": "6", "Le": "b6",
  "Ti": "7", "Te": "b7"
};

function getSolfegeLevelConfig(level = state?.settings?.solfegeDifficulty || 1) {
  const lvl = parseInt(level, 10) || 1;
  if (lvl === 17) {
    const customRange = state?.settings?.solfegeCustomRange;
    return {
      level: 17,
      tonality: state?.settings?.solfegeCustomTonality === "minor" ? "minor" : "major",
      range: (customRange === "do-fa" || customRange === "sol-do") ? customRange : "full",
      keyMode: "custom",
      isMultiOctave: state?.settings?.solfegeCustomOctave === "multi",
      isCustom: true
    };
  }
  const isMinor = lvl >= 9 && lvl <= 16;
  const sub = isMinor ? (lvl - 8) : lvl;
  const map = {
    1: { range: "do-fa",  keyMode: "fixed",   isMultiOctave: false },
    2: { range: "sol-do", keyMode: "fixed",   isMultiOctave: false },
    3: { range: "full",   keyMode: "fixed",   isMultiOctave: false },
    4: { range: "full",   keyMode: "session", isMultiOctave: false },
    5: { range: "full",   keyMode: "fixed",   isMultiOctave: true },
    6: { range: "full",   keyMode: "session", isMultiOctave: true },
    7: { range: "full",   keyMode: "random",  isMultiOctave: false },
    8: { range: "full",   keyMode: "random",  isMultiOctave: true }
  };
  const cfg = map[sub] || map[3];
  return {
    level: lvl,
    tonality: isMinor ? "minor" : "major",
    range: cfg.range,
    keyMode: cfg.keyMode,
    isMultiOctave: cfg.isMultiOctave,
    isCustom: false
  };
}

function getSolfegeCustomBadgeLabel() {
  const tonality = state?.settings?.solfegeCustomTonality === "minor" ? "minor" : "major";
  const keySetting = state?.settings?.solfegeCustomKey || "C";
  const keyText = keySetting === "random"
    ? `${tr("Zufall", "Random")} (${tonality === "minor" ? tr("Moll", "Minor") : tr("Dur", "Major")})`
    : getKeyDisplayName(keySetting, tonality);
  const range = state?.settings?.solfegeCustomRange || "full";
  const rangeText = range === "do-fa" ? "Do–Fa" : (range === "sol-do" ? "Sol–Do" : "Do–Do");
  return `${keyText} • ${rangeText}`;
}

function getSolfegeLevelSummaryLabel(level = state?.settings?.solfegeDifficulty || 1) {
  const lvl = parseInt(level, 10) || 1;
  const lvlWord = tr("Stufe", "Level");
  const minorWord = tr("Moll", "Minor");
  if (lvl === 17) {
    const tonality = state?.settings?.solfegeCustomTonality === "minor" ? "minor" : "major";
    const keySetting = state?.settings?.solfegeCustomKey || "C";
    const keyText = keySetting === "random"
      ? `${tr("Zufall", "Random")} (${tonality === "minor" ? tr("Moll", "Minor") : tr("Dur", "Major")})`
      : getKeyDisplayName(keySetting, tonality);
    const octText = state?.settings?.solfegeCustomOctave === "multi"
      ? tr("mehrere Okt.", "Multi-Oct.")
      : tr("1 Oktave", "1 Octave");
    return `${tr("Eigene Tonart", "Custom Key")} (${keyText}, ${octText})`;
  }
  const labels = {
    1: `${lvlWord} 1 (${tr("Do–Fa, C-Dur", "Do–Fa, C Major")})`,
    2: `${lvlWord} 2 (${tr("Sol–Do, C-Dur", "Sol–Do, C Major")})`,
    3: `${lvlWord} 3 (${tr("C-Dur, 1 Oktave", "C Major, 1 Octave")})`,
    4: `${lvlWord} 4 (${tr("Feste Zufallstonart, 1 Okt.", "Fixed Random Key, 1 Oct.")})`,
    5: `${lvlWord} 5 (${tr("C-Dur, mehrere Oktaven", "C Major, Multi-Octave")})`,
    6: `${lvlWord} 6 (${tr("Feste Zufallstonart, mehrere Okt.", "Fixed Random Key, Multi-Oct.")})`,
    7: `${lvlWord} 7 (${tr("Tonartwechsel, 1 Oktave", "Changing Keys, 1 Octave")})`,
    8: `${lvlWord} 8 (${tr("Tonartwechsel, mehrere Okt.", "Changing Keys, Multi-Oct.")})`,
    9: `${minorWord} 1 (${tr("Do–Fa, c-Moll", "Do–Fa, C Minor")})`,
    10: `${minorWord} 2 (${tr("Sol–Do, c-Moll", "Sol–Do, C Minor")})`,
    11: `${minorWord} 3 (${tr("c-Moll, 1 Oktave", "C Minor, 1 Octave")})`,
    12: `${minorWord} 4 (${tr("Feste Zufallstonart, 1 Okt.", "Fixed Random Key, 1 Oct.")})`,
    13: `${minorWord} 5 (${tr("c-Moll, mehrere Oktaven", "C Minor, Multi-Octave")})`,
    14: `${minorWord} 6 (${tr("Feste Zufallstonart, mehrere Okt.", "Fixed Random Key, Multi-Oct.")})`,
    15: `${minorWord} 7 (${tr("Tonartwechsel, 1 Oktave", "Changing Keys, 1 Octave")})`,
    16: `${minorWord} 8 (${tr("Tonartwechsel, mehrere Okt.", "Changing Keys, Multi-Oct.")})`
  };
  return labels[lvl] || labels[3];
}

function getWhiteNoteLabel(pc) {
  const norm = ((pc % 12) + 12) % 12;
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  return (useIntl ? INTL_WHITE_LABELS[norm] : GERMAN_WHITE_LABELS[norm]) || "";
}

// Moll-Tonartnamen (gleicher Grundton wie die Dur-Tonart; übliche enharmonische Schreibweise)
const MINOR_KEY_NAMES_DE = {
  "C": "c-Moll", "G": "g-Moll", "D": "d-Moll", "F": "f-Moll", "Bb": "b-Moll", "Eb": "es-Moll",
  "Ab": "gis-Moll", "A": "a-Moll", "E": "e-Moll", "B": "h-Moll", "F#": "fis-Moll", "Db": "cis-Moll"
};
const MINOR_KEY_NAMES_INTL = {
  "C": "C-Moll", "G": "G-Moll", "D": "D-Moll", "F": "F-Moll", "Bb": "Bb-Moll", "Eb": "Eb-Moll",
  "Ab": "G#-Moll", "A": "A-Moll", "E": "E-Moll", "B": "B-Moll", "F#": "F#-Moll", "Db": "C#-Moll"
};

function getKeyDisplayName(keyCode, tonality = "major") {
  if (tonality === "minor") {
    if (typeof getLocalizedTableEntry === "function") {
      const localized = getLocalizedTableEntry("minorKeyNames", keyCode);
      if (localized) return localized;
    }
    const useIntlMinor = typeof state !== "undefined" && state?.profile?.notation === "intl";
    return (useIntlMinor ? MINOR_KEY_NAMES_INTL[keyCode] : MINOR_KEY_NAMES_DE[keyCode]) || `${keyCode}-Moll`;
  }
  if (typeof getLocalizedKeyName === "function") {
    const localized = getLocalizedKeyName(keyCode);
    if (localized) return localized;
  }
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  if (useIntl) {
    return INTL_KEY_NAMES[keyCode] || HARMONIC_DATA.roots[keyCode]?.name || `${keyCode}-Dur`;
  }
  return HARMONIC_DATA.roots[keyCode]?.name || `${keyCode}-Dur`;
}

function getSolfegeDisplayLabel(syllableOrStep) {
  const useNums = typeof state !== "undefined" && state?.profile?.solfegeLabels === "numbers";
  if (useNums) {
    return SOLFEGE_DEGREE_NUMBERS[syllableOrStep] || syllableOrStep;
  }
  return syllableOrStep;
}
const WHITE_PITCH_CLASSES = new Set([0, 2, 4, 5, 7, 9, 11]);
const NON_C_KEYS = ["G", "D", "F", "Bb", "Eb", "Ab", "A", "E", "B", "F#", "Db"];

const ICON_LOOP_SVG = `
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
`;

const ICON_AUTO_NEXT_SVG = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="3 5 11 12 3 19 3 5"/>
    <polygon points="12 5 20 12 12 19 12 5"/>
    <circle cx="19.5" cy="5.5" r="2.2" fill="currentColor" stroke="none"/>
  </svg>
`;

function isWhiteMidi(midi) {
  return WHITE_PITCH_CLASSES.has(((midi % 12) + 12) % 12);
}

function prevWhiteMidi(midi) {
  if (!Number.isFinite(midi)) return 59;
  let m = midi - 1;
  while (!isWhiteMidi(m)) m--;
  return m;
}

function nextWhiteMidi(midi) {
  if (!Number.isFinite(midi)) return 74;
  let m = midi + 1;
  while (!isWhiteMidi(m)) m++;
  return m;
}

/**
 * Liefert die konsistenten Grenzen der 1-Oktav-Klaviatur für Solfège & Melodie:
 * - Alle aktiven Skalentöne (auch bei schwarzen Tonarten wie Des, Es, Fis, As, B)
 *   sitzen vollständig zwischen gleich breiten regulären weißen Tasten (keine schmalen Rahmentasten).
 */
function getSolfegeKeyboardBounds(rootMidi) {
  const safeRoot = Number.isFinite(rootMidi) ? rootMidi : 60;
  const firstFullWhite = isWhiteMidi(safeRoot) ? safeRoot : prevWhiteMidi(safeRoot);
  const lastFullWhite = isWhiteMidi(safeRoot + 12) ? (safeRoot + 12) : nextWhiteMidi(safeRoot + 12);
  return {
    firstFullWhite,
    lastFullWhite,
    firstWhite: firstFullWhite,
    lastWhite: lastFullWhite
  };
}

function pickRandomNonCKey(excludeKey = null) {
  const pool = NON_C_KEYS.filter(k => k !== excludeKey);
  return pool[Math.floor(Math.random() * pool.length)];
}

function pickRandomAnyKey(excludeKey = null) {
  const allKeys = Object.keys(HARMONIC_DATA.roots);
  const pool = allKeys.filter(k => k !== excludeKey);
  return pool[Math.floor(Math.random() * pool.length)];
}

