function connectAudioNodeToTarget(node, target) {
  if (!node || !target) return;
  if (typeof Tone !== "undefined" && typeof Tone.connect === "function") {
    Tone.connect(node, target);
  } else if (target.input && typeof node.connect === "function") {
    node.connect(target.input);
  } else if (typeof node.connect === "function") {
    node.connect(target);
  }
}

const SAMPLED_STEM_CONFIG = {
  piano:   { demoStyle: "piano",   attackSec: 0.0025, releaseSec: 0.55, fallbackMult: 0.72, sampledMult: 0.90, demoGain: 0.85, useReverb: true,  maxPolyphony: 18 },
  guitar:  { demoStyle: "guitar",  attackSec: 0.0025, releaseSec: 0.50, fallbackMult: 0.65, sampledMult: 0.78, demoGain: 0.85, useReverb: true,  maxPolyphony: 14 },
  strings: { demoStyle: "strings", attackSec: 0.015,  releaseSec: 0.65, fallbackMult: 0.55, sampledMult: 0.58, demoGain: 0.85, useReverb: true,  maxPolyphony: 16 },
  brass:   { demoStyle: "brass",   attackSec: 0.008,  releaseSec: 0.45, fallbackMult: 0.42, sampledMult: 0.62, demoGain: 0.85, useReverb: true,  maxPolyphony: 14 },
  voice:   { demoStyle: "choir",   attackSec: 0.012,  releaseSec: 0.60, fallbackMult: 0.45, sampledMult: 0.58, demoGain: 0.85, useReverb: true,  maxPolyphony: 14 },
  bass:    { demoStyle: "ebass",   attackSec: 0.002,  releaseSec: 0.25, fallbackMult: 0.92, sampledMult: 0.92, demoGain: 0.85, useReverb: false, maxPolyphony: 4 }
};

const PIANO_CHARACTER_PROFILES = {
  dry:     { filterHz: 18000, reverbDampHz: 5200, roomSize: 0.58, defaultReverb: 0.00, releaseSec: 0.55, holdDecayFloor: 1.00, attackSec: 0.0025, spreadMs: 0,  humanize: false },
  natural: { filterHz: 5800,  reverbDampHz: 4800, roomSize: 0.72, defaultReverb: 0.24, releaseSec: 0.78, holdDecayFloor: 0.68, attackSec: 0.0035, spreadMs: 9,  humanize: true  },
  concert: { filterHz: 5000,  reverbDampHz: 5600, roomSize: 0.86, defaultReverb: 0.48, releaseSec: 1.05, holdDecayFloor: 0.62, attackSec: 0.0042, spreadMs: 13, humanize: true  }
};

const STEM_REVERB_BY_CHAR = {
  dry:     { piano: 0.00, guitar: 0.00, strings: 0.00, brass: 0.00, voice: 0.00, bass: 0.00 },
  natural: { piano: 0.24, guitar: 0.22, strings: 0.34, brass: 0.26, voice: 0.30, bass: 0.06 },
  concert: { piano: 0.48, guitar: 0.42, strings: 0.56, brass: 0.46, voice: 0.52, bass: 0.16 }
};

/**
 * Schlanker nativer WebAudio-Sampler für Studio-Samples.
 * Vermeidet komplexe Tone.Sampler/ToneBufferSource-Wrapper-Allokationen pro Note
 * und verhindert Audio-Buffer-Underruns / Knackser auf Safari & Chrome.
 */
class EarLabSampledInstrument {
  constructor(bufferMap, targetToneGain, options = {}) {
    this.urls = bufferMap || {};
    this.rawCtx = options.rawCtx;
    this.targetToneGain = targetToneGain;
    this.attackSec = options.attackSec ?? 0.0025;
    this.releaseSec = options.releaseSec ?? 0.55;
    this.maxPolyphony = options.maxPolyphony ?? 18;
    this.getSoundProfile = typeof options.getSoundProfile === "function" ? options.getSoundProfile : null;
    this.activeVoices = [];
    this._played = [];
    this._humanizeCounter = 0;

    this.samples = Object.entries(this.urls)
      .map(([note, buffer]) => ({
        note,
        midi: EarLabSampledInstrument.noteToMidi(note),
        buffer
      }))
      .filter(entry => entry.midi !== null && entry.buffer)
      .sort((a, b) => a.midi - b.midi);
  }

  static noteToMidi(noteOrMidi) {
    if (typeof noteOrMidi === "number" && Number.isFinite(noteOrMidi)) return noteOrMidi;
    const m = String(noteOrMidi || "").trim().match(/^([A-Ga-g])([#b]?)(-?\d)$/);
    if (!m) return null;
    const baseMap = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
    let pc = baseMap[m[1].toLowerCase()];
    if (m[2] === "#") pc += 1;
    else if (m[2] === "b") pc -= 1;
    const oct = parseInt(m[3], 10);
    return (oct + 1) * 12 + pc;
  }

  findClosestSample(targetMidi) {
    let best = this.samples[0];
    let bestDist = Infinity;
    for (let i = 0; i < this.samples.length; i++) {
      const d = Math.abs(this.samples[i].midi - targetMidi);
      if (d < bestDist) {
        bestDist = d;
        best = this.samples[i];
      }
    }
    return best;
  }

  connectGainToTarget(gainNode) {
    connectAudioNodeToTarget(gainNode, this.targetToneGain);
  }

  retireVoice(voice, fadeSec = 0.035) {
    if (!voice || voice.released) return;
    voice.released = true;
    try {
      const now = this.rawCtx?.currentTime || 0;
      const p = voice.gain.gain;
      if (typeof p.cancelAndHoldAtTime === "function") {
        p.cancelAndHoldAtTime(now);
      } else {
        p.cancelScheduledValues(now);
        p.setValueAtTime(Math.max(0.0001, Number(p.value) || 0.0001), now);
      }
      p.linearRampToValueAtTime(0, now + fadeSec);
      voice.src.stop(now + fadeSec + 0.015);
    } catch (_) {}
  }

  triggerAttackRelease(notes, durationSec = 1.0, whenTime = null, velocity = 1, envOverride = null) {
    if (!this.rawCtx || this.samples.length === 0) return;
    const noteList = Array.isArray(notes) ? notes : [notes];
    if (noteList.length === 0) return;

    this._played.push({ notes: noteList, dur: durationSec, time: whenTime, vel: velocity });

    const now = this.rawCtx.currentTime || 0;
    const startAt = Math.max(now + 0.022, Number.isFinite(whenTime) ? whenTime : now + 0.022);
    const dur = Math.max(0.06, Number(durationSec) || 0.6);
    const safeVel = Math.max(0.02, Math.min(1, Number.isFinite(velocity) ? velocity : 1));
    const prof = this.getSoundProfile ? this.getSoundProfile() : null;
    const effAttackSec = Number.isFinite(envOverride?.attackSec)
      ? Math.max(0.001, envOverride.attackSec)
      : (prof ? (prof.attackSec ?? this.attackSec) : this.attackSec);
    const baseReleaseSec = Number.isFinite(envOverride?.releaseSec)
      ? Math.max(0.03, envOverride.releaseSec)
      : (prof ? (prof.releaseSec ?? this.releaseSec) : this.releaseSec);
    const effReleaseSec = (!Number.isFinite(envOverride?.releaseSec) && prof && noteList.length === 1 && dur <= 0.38)
      ? Math.min(baseReleaseSec, Math.max(0.32, dur * 1.45))
      : baseReleaseSec;
    const resolvedEntries = noteList
      .map(noteToken => ({ noteToken, targetMidi: EarLabSampledInstrument.noteToMidi(noteToken) }))
      .filter(entry => entry.targetMidi !== null);
    const sortedMidis = prof && prof.humanize && resolvedEntries.length >= 3
      ? resolvedEntries.map(e => e.targetMidi).sort((a, b) => a - b)
      : null;

    resolvedEntries.forEach(({ targetMidi }, entryIdx) => {
      const chosen = this.findClosestSample(targetMidi);
      if (!chosen) return;

      while (this.activeVoices.length >= this.maxPolyphony) {
        const oldest = this.activeVoices.shift();
        this.retireVoice(oldest, 0.025);
      }

      const rate = Math.pow(2, (targetMidi - chosen.midi) / 12);
      const src = this.rawCtx.createBufferSource();
      src.buffer = chosen.buffer;
      src.playbackRate.value = rate;

      let voiceStartAt = startAt;
      let voiceVel = safeVel;
      if (prof && prof.humanize) {
        const stepSeed = ((++this._humanizeCounter * 37 + entryIdx * 13 + targetMidi) % 100) / 100;
        const velJitter = 0.97 + stepSeed * 0.055;
        if (sortedMidis && sortedMidis.length >= 3) {
          const rank = sortedMidis.indexOf(targetMidi);
          const normPos = sortedMidis.length > 1 ? rank / (sortedMidis.length - 1) : 0;
          const balanceScale = rank === sortedMidis.length - 1 ? 1.00 : (rank === 0 ? 0.93 : 0.82);
          voiceVel = Math.max(0.02, Math.min(1, safeVel * balanceScale * velJitter));
          voiceStartAt += normPos * ((prof.spreadMs || 0) / 1000) + stepSeed * 0.0016;
        } else if (resolvedEntries.length === 1) {
          voiceVel = Math.max(0.02, Math.min(1, safeVel * velJitter));
        }
      }

      const envGain = this.rawCtx.createGain();
      const gainParam = envGain.gain;
      const relAt = voiceStartAt + dur;
      const peakAt = voiceStartAt + effAttackSec;
      const fadeOutEnd = relAt + effReleaseSec;
      const maxBufDur = (chosen.buffer?.duration || 4.0) / Math.max(0.25, rate);
      const stopAt = Math.min(fadeOutEnd + 0.025, voiceStartAt + maxBufDur + 0.04);

      gainParam.setValueAtTime(0.0001, voiceStartAt);
      gainParam.linearRampToValueAtTime(voiceVel, peakAt);
      if (prof && prof.holdDecayFloor < 0.99 && relAt > peakAt + 0.04) {
        const octFactor = Math.max(0.75, Math.min(1.06, 1.0 - (targetMidi - 60) * 0.006));
        const holdEndVel = Math.max(0.18 * voiceVel, Math.min(voiceVel * 0.95, voiceVel * prof.holdDecayFloor * octFactor));
        gainParam.exponentialRampToValueAtTime(holdEndVel, relAt);
      } else {
        gainParam.setValueAtTime(voiceVel, relAt);
      }
      gainParam.exponentialRampToValueAtTime(0.001, fadeOutEnd);
      gainParam.linearRampToValueAtTime(0, fadeOutEnd + 0.018);

      src.connect(envGain);
      this.connectGainToTarget(envGain);

      const voice = { src, gain: envGain, released: false };
      this.activeVoices.push(voice);

      src.onended = () => {
        this.activeVoices = this.activeVoices.filter(v => v !== voice);
        try { src.disconnect(); } catch (_) {}
        try { envGain.disconnect(); } catch (_) {}
      };

      src.start(voiceStartAt);
      src.stop(stopAt);
    });
  }

  releaseAll() {
    const copy = this.activeVoices.slice();
    this.activeVoices = [];
    copy.forEach(v => this.retireVoice(v, 0.045));
  }
}

/**
 * EarLab Audio Engine
 * Lineare Gain-Architektur für verzögerungsfreie Mixer- und Master-Steuerung.
 */
class AudioEngine {
  constructor() {
    this.isInitialized = false;
    this.graphBuilt = false;
    this.samplesLoaded = false;
    this.contextConfigured = false;
    this.preparePromise = null;
    this.initPromise = null;

    this.masterLimiter = null;
    this.masterGain = null;
    this.reverb = null;
    this.reverbReturn = null;
    this.pianoReverb = null;
    this.pianoReverbBoost = null;
    this.pianoFreeverb = null;
    this.pianoReverbReturn = null;
    this.pianoReverbDamp = null;
    this.pianoReverbSend = null;
    this.stemReverbSends = {};
    this.demoReverbSends = {};
    this.pianoToneFilter = null;
    this.demoPianoToneFilter = null;
    this.pianoCharacter = "natural";
    this.pianoReverbMix = PIANO_CHARACTER_PROFILES.natural.defaultReverb;
    this.instrumentReverbMix = { ...STEM_REVERB_BY_CHAR.natural };
    this.dronePadGainScale = 0.70;
    this.droneToneGainScale = 1.00;

    // 5 Stem-Synthesizer und zugehörige lineare Gain-Knoten
    this.piano = null;
    this.pianoFallbackSynth = null;
    this.pianoGain = null;
    this.pianoGainMultiplier = SAMPLED_STEM_CONFIG.piano.fallbackMult;
    this.pianoUsingSampler = false;
    this.demoPiano = null;
    this.demoPianoGain = null;
    this.guitar = null;
    this.guitarFallbackSynth = null;
    this.guitarGain = null;
    this.strings = null;
    this.stringsFallbackSynth = null;
    this.stringsGain = null;
    this.brass = null;
    this.brassFallbackSynth = null;
    this.brassGain = null;
    this.voice = null;
    this.voiceFallbackSynth = null;
    this.voiceGain = null;
    this.bass = null;
    this.bassFallbackSynth = null;
    this.bassGain = null;

    this.sampledStems = { piano: false, guitar: false, strings: false, brass: false, voice: false, bass: false };
    this.stemGainMultipliers = {
      piano: SAMPLED_STEM_CONFIG.piano.fallbackMult,
      guitar: SAMPLED_STEM_CONFIG.guitar.fallbackMult,
      strings: SAMPLED_STEM_CONFIG.strings.fallbackMult,
      brass: SAMPLED_STEM_CONFIG.brass.fallbackMult,
      voice: SAMPLED_STEM_CONFIG.voice.fallbackMult,
      bass: SAMPLED_STEM_CONFIG.bass.fallbackMult
    };
    this.demoSamplers = {};
    this.demoGains = {};
    this.percSamples = {};
    this.percSampleRawCtx = null;
    this.percSampleGain = null;
    this.percUsingSamples = false;

    this.activeTimers = [];
    this.activeDemoNodes = [];
    this.activeNoiseSession = null;
    this.playbackId = 0;

    // Trockener Schutz-Limiter für Frequenz- & Noise-Training (-14 dBFS vor Master)
    this.prodSafetyLimiter = null;

    // Perkussions-Synthesizer für Rhythmus-Hörbeispiele (werden bei Bedarf initialisiert)
    this.percInitialized = false;
    this.percMembrane = null;
    this.percSnare = null;
    this.percHat = null;
    this.percShaker = null;
    this.percTone = null;
  }

  async prepareAudioGraph(initialMaster = 0.67, initialMuted = false, initialMixer = null) {
    if (this.preparePromise) return this.preparePromise;

    this.preparePromise = (async () => {
      try {
        // Stabilen Audio-Render-Puffer ("playback") vor Node-Erstellung setzen, um Knackser/CPU-Underruns zu vermeiden
        if (!this.contextConfigured && typeof Tone?.Context === "function" && typeof Tone?.setContext === "function") {
          try {
            const oldCtx = typeof Tone.getContext === "function" ? Tone.getContext() : Tone.context;
            const playbackCtx = new Tone.Context({ latencyHint: "playback", lookAhead: 0.08 });
            Tone.setContext(playbackCtx);
            if (oldCtx && oldCtx !== playbackCtx) oldCtx.dispose?.();
            this.contextConfigured = true;
          } catch (_) {}
        }

        // Master-Limiter (-0.3 dBFS) & Master-Lautstärke
        this.masterLimiter = new Tone.Limiter(-0.3).toDestination();
        const startMaster = initialMuted ? 0 : initialMaster * 0.45;
        this.masterGain = new Tone.Gain(startMaster).connect(this.masterLimiter);

        // Hardware-beschleunigter Faltungshall (Tone.Reverb / ConvolverNode) auf echtem 100%-Wet-Aux-Bus
        this.reverbReturn = new Tone.Gain(0.22).connect(this.masterGain);
        let reverbGenPromise = Promise.resolve();
        if (typeof Tone?.Reverb === "function") {
          this.reverb = new Tone.Reverb({
            decay: 1.55,
            preDelay: 0.014,
            wet: 1.0
          }).connect(this.reverbReturn);
          reverbGenPromise = this.reverb.generate();
        } else {
          this.reverb = new Tone.Freeverb({
            roomSize: 0.55,
            dampening: 3400
          }).connect(this.reverbReturn);
          this.reverb.wet.value = 1.0;
        }

        const initPianoProf = PIANO_CHARACTER_PROFILES[this.pianoCharacter] || PIANO_CHARACTER_PROFILES.natural;
        const initPianoMix = Number.isFinite(this.instrumentReverbMix?.piano)
          ? Math.max(0, Math.min(1, this.instrumentReverbMix.piano))
          : (Number.isFinite(this.pianoReverbMix) ? Math.max(0, Math.min(1, this.pianoReverbMix)) : initPianoProf.defaultReverb);
        this.pianoReverbReturn = new Tone.Gain(1.0).connect(this.masterGain);
        this.pianoReverbDamp = new Tone.Filter(initPianoProf.reverbDampHz, "lowpass");
        this.pianoReverbSend = new Tone.Gain(initPianoMix * 1.15).connect(this.pianoReverbDamp);
        this.stemReverbSends = { piano: this.pianoReverbSend };

        // Sofortige Stereo-Erstreflexionen + synchrones Raum-Tank-Netzwerk (unabhängig von OfflineAudioContext)
        if (typeof Tone?.Delay === "function" && typeof Tone?.Panner === "function") {
          const earlyGainL = new Tone.Gain(0.32).connect(this.pianoReverbReturn);
          const earlyPanL = new Tone.Panner(-0.55).connect(earlyGainL);
          const earlyTapL = new Tone.Delay(0.017).connect(earlyPanL);
          const earlyGainR = new Tone.Gain(0.32).connect(this.pianoReverbReturn);
          const earlyPanR = new Tone.Panner(0.55).connect(earlyGainR);
          const earlyTapR = new Tone.Delay(0.027).connect(earlyPanR);
          this.pianoReverbDamp.connect(earlyTapL);
          this.pianoReverbDamp.connect(earlyTapR);
        }
        if (typeof Tone?.Freeverb === "function") {
          this.pianoFreeverb = new Tone.Freeverb({
            roomSize: initPianoProf.roomSize,
            dampening: initPianoProf.reverbDampHz
          });
          this.pianoFreeverb.wet.value = 1.0;
          const freeverbOut = new Tone.Gain(0.68).connect(this.pianoReverbReturn);
          this.pianoFreeverb.connect(freeverbOut);
          this.pianoReverbDamp.connect(this.pianoFreeverb);
        }
        let pianoReverbGenPromise = Promise.resolve();
        if (typeof Tone?.Reverb === "function") {
          this.pianoReverbBoost = new Tone.Gain(2.8).connect(this.pianoReverbReturn);
          this.pianoReverb = new Tone.Reverb({
            decay: 2.35,
            preDelay: 0.016,
            wet: 1.0
          }).connect(this.pianoReverbBoost);
          this.pianoReverbDamp.connect(this.pianoReverb);
          pianoReverbGenPromise = this.pianoReverb.generate();
        }

        const levels = initialMixer || {
          piano: 1.00,
          guitar: 0.00,
          strings: 0.00,
          brass: 0.00,
          voice: 0.00,
          bass: 0.00
        };

        const wireStemReverbSend = (stemKey, gainNode) => {
          const stemMix = Number.isFinite(this.instrumentReverbMix?.[stemKey])
            ? Math.max(0, Math.min(1, this.instrumentReverbMix[stemKey]))
            : initPianoMix;
          const sendNode = new Tone.Gain(stemMix * 1.15).connect(this.pianoReverbDamp);
          this.stemReverbSends[stemKey] = sendNode;
          gainNode.connect(sendNode);
        };

        // 1. Klavier (Synth als Fallback, wird bei geladenem DAW-Pack durch nativen EarLabSampledInstrument ersetzt)
        this.pianoGain = new Tone.Gain(levels.piano * this.stemGainMultipliers.piano).connect(this.masterGain);
        this.pianoGain.connect(this.pianoReverbSend);
        this.pianoToneFilter = new Tone.Filter(initPianoProf.filterHz, "lowpass").connect(this.pianoGain);
        this.pianoFallbackSynth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "triangle8" },
          envelope: { attack: 0.006, decay: 1.4, sustain: 0.30, release: 1.3 }
        }).connect(this.pianoToneFilter);
        this.piano = this.pianoFallbackSynth;

        // 2. Gitarre
        this.guitarGain = new Tone.Gain(levels.guitar * this.stemGainMultipliers.guitar).connect(this.masterGain);
        wireStemReverbSend("guitar", this.guitarGain);
        this.guitarFallbackSynth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "triangle" },
          envelope: { attack: 0.015, decay: 0.95, sustain: 0.22, release: 1.0 }
        }).connect(this.guitarGain);
        this.guitar = this.guitarFallbackSynth;

        // 3. Streicher
        this.stringsGain = new Tone.Gain(levels.strings * this.stemGainMultipliers.strings).connect(this.masterGain);
        wireStemReverbSend("strings", this.stringsGain);
        this.stringsFallbackSynth = new Tone.PolySynth(Tone.AMSynth, {
          harmonicity: 1.25,
          envelope: { attack: 0.30, decay: 0.45, sustain: 0.85, release: 1.5 }
        }).connect(this.stringsGain);
        this.strings = this.stringsFallbackSynth;

        // 4. Bläser
        this.brassGain = new Tone.Gain(levels.brass * this.stemGainMultipliers.brass).connect(this.masterGain);
        wireStemReverbSend("brass", this.brassGain);
        this.brassFallbackSynth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "sawtooth" },
          envelope: { attack: 0.07, decay: 0.35, sustain: 0.65, release: 0.8 }
        }).connect(this.brassGain);
        this.brass = this.brassFallbackSynth;

        // 5. Stimme (Chor; mit regelbarem Raumklang-Send)
        this.voiceGain = new Tone.Gain((levels.voice || 0) * this.stemGainMultipliers.voice).connect(this.masterGain);
        wireStemReverbSend("voice", this.voiceGain);
        this.voiceFallbackSynth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "triangle8" },
          envelope: { attack: 0.14, decay: 0.25, sustain: 0.82, release: 0.65 }
        }).connect(this.voiceGain);
        this.voice = this.voiceFallbackSynth;

        // 6. Bass (mit eigenem Send; Standardwert niedrig für definiertes Fundament)
        this.bassGain = new Tone.Gain(levels.bass * this.stemGainMultipliers.bass).connect(this.masterGain);
        wireStemReverbSend("bass", this.bassGain);
        const bassFallbackFilter = new Tone.Filter(380, "lowpass").connect(this.bassGain);
        this.bassFallbackSynth = new Tone.MonoSynth({
          oscillator: { type: "triangle" },
          envelope: { attack: 0.01, decay: 0.6, sustain: 0.45, release: 0.6 }
        }).connect(bassFallbackFilter);
        this.bass = this.bassFallbackSynth;

        this.graphBuilt = true;

        await Promise.all([
          reverbGenPromise,
          pianoReverbGenPromise,
          this.loadSampledPacks(levels)
        ]);

        this.setPianoSoundProfile(this.pianoCharacter, this.instrumentReverbMix);
        this.samplesLoaded = true;
        return true;
      } catch (err) {
        this.preparePromise = null;
        this.graphBuilt = false;
        throw err;
      }
    })();

    return this.preparePromise;
  }

  /**
   * Startet Audiopuffer- und Impuls-Vorladen direkt beim App-Start ohne auf den ersten Klick zu warten.
   */
  preload(initialMaster = 0.67, initialMuted = false, initialMixer = null) {
    return this.prepareAudioGraph(initialMaster, initialMuted, initialMixer).catch(() => false);
  }

  async init(initialMaster = 0.67, initialMuted = false, initialMixer = null) {
    // User-Geste synchron vor jeglichem await erfassen (essentiell für iOS Safari AudioContext.resume)
    const rawCtx = typeof Tone?.getContext === "function" ? Tone.getContext()?.rawContext : Tone?.context?.rawContext;
    if (rawCtx && typeof rawCtx.resume === "function") {
      try { Promise.resolve(rawCtx.resume()).catch(() => {}); } catch (_) {}
    }
    const startPromise = typeof Tone?.start === "function" ? Tone.start() : Promise.resolve();

    if (this.isInitialized && this.preparePromise) {
      await Promise.all([startPromise, this.preparePromise]);
      this.setMasterVolume(initialMaster, initialMuted);
      if (initialMixer) this.setMixerGains(initialMixer);
      return true;
    }

    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        await Promise.all([
          startPromise,
          this.prepareAudioGraph(initialMaster, initialMuted, initialMixer)
        ]);

        const postCtx = typeof Tone?.getContext === "function" ? Tone.getContext()?.rawContext : Tone?.context?.rawContext;
        if (postCtx && postCtx.state === "suspended" && typeof Tone?.start === "function") {
          try { await Tone.start(); } catch (_) {}
        }
        if (this.pianoReverb && this.pianoReverb.ready === false && typeof this.pianoReverb.generate === "function") {
          try { await this.pianoReverb.generate(); } catch (_) {}
        }

        this.setMasterVolume(initialMaster, initialMuted);
        if (initialMixer) this.setMixerGains(initialMixer);

        this.isInitialized = true;
        return true;
      } catch (err) {
        this.initPromise = null;
        throw err;
      }
    })();

    return this.initPromise;
  }

  base64ToArrayBuffer(b64) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    return bytes.buffer;
  }

  decodeAudioBufferCompat(arrayBuffer) {
    const rawCtx = typeof Tone !== "undefined" && typeof Tone.getContext === "function"
      ? Tone.getContext()?.rawContext
      : Tone?.context?.rawContext;
    if (!rawCtx || typeof rawCtx.decodeAudioData !== "function") {
      return Promise.reject(new Error("WebAudio decodeAudioData unavailable"));
    }
    return new Promise((resolve, reject) => {
      let settled = false;
      const onOk = (buf) => { if (!settled) { settled = true; resolve(buf); } };
      const onErr = (err) => { if (!settled) { settled = true; reject(err); } };
      try {
        const maybePromise = rawCtx.decodeAudioData(arrayBuffer, onOk, onErr);
        if (maybePromise && typeof maybePromise.then === "function") {
          maybePromise.then(onOk, onErr);
        }
      } catch (err) {
        onErr(err);
      }
    });
  }

  /**
   * Entfernt ggf. browserseitig belassene AAC/MP4-Encoder-Vorlaufstille (> 3 ms),
   * sodass der Tonanschlag plattformübergreifend latenzfrei auf dem Beat sitzt.
   */
  trimLeadingEncoderSilence(audioBuffer, thresholdDb = -62, prePadMs = 1.0) {
    const rawCtx = typeof Tone !== "undefined" && typeof Tone.getContext === "function"
      ? Tone.getContext()?.rawContext
      : Tone?.context?.rawContext;
    if (!rawCtx || typeof rawCtx.createBuffer !== "function") return audioBuffer;

    const sr = audioBuffer.sampleRate;
    const len = audioBuffer.length;
    const chCount = audioBuffer.numberOfChannels;
    const thresh = Math.pow(10, thresholdDb / 20);
    const scanLimit = Math.min(len, Math.floor(sr * 0.25));
    let firstActive = len;

    for (let c = 0; c < chCount; c++) {
      const data = audioBuffer.getChannelData(c);
      for (let i = 0; i < scanLimit; i++) {
        if (Math.abs(data[i]) >= thresh) {
          if (i < firstActive) firstActive = i;
          break;
        }
      }
    }

    const preSamples = Math.floor((prePadMs / 1000) * sr);
    const trimStart = firstActive - preSamples;
    if (firstActive >= len || trimStart <= Math.floor(sr * 0.003)) {
      return audioBuffer;
    }

    const newLen = Math.max(1, len - trimStart);
    const out = rawCtx.createBuffer(chCount, newLen, sr);
    const fadeIn = Math.min(newLen, Math.max(1, Math.floor(sr * 0.0005)));
    for (let c = 0; c < chCount; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = out.getChannelData(c);
      dst.set(src.subarray(trimStart));
      for (let k = 0; k < fadeIn; k++) {
        dst[k] *= k / fadeIn;
      }
    }
    return out;
  }

  normalizeSamplerNoteKey(noteName) {
    const flatToSharp = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };
    return String(noteName).replace(/^([A-G]b)(\d)$/, (_, pc, oct) => `${flatToSharp[pc] || pc}${oct}`);
  }

  async decodeSamplePackBuffers(pack, normalizeNoteKeys = true) {
    const rawCtx = typeof Tone !== "undefined" && typeof Tone.getContext === "function"
      ? Tone.getContext()?.rawContext
      : Tone?.context?.rawContext;
    if (!pack || !pack.notes || !rawCtx || typeof rawCtx.createBufferSource !== "function") return null;

    const entries = Object.entries(pack.notes);
    if (entries.length === 0) return null;

    const bufferMap = {};
    await Promise.all(entries.map(async ([key, b64]) => {
      const arrBuf = this.base64ToArrayBuffer(b64);
      const decoded = await this.decodeAudioBufferCompat(arrBuf);
      const trimmed = this.trimLeadingEncoderSilence(decoded);
      const outKey = normalizeNoteKeys ? this.normalizeSamplerNoteKey(key) : key;
      bufferMap[outKey] = trimmed;
    }));

    return { bufferMap, rawCtx };
  }

  async initSampledInstrument(pack, targetGainNode, samplerOpts = {}) {
    const decoded = await this.decodeSamplePackBuffers(pack, true);
    if (!decoded) return null;

    const sampler = new EarLabSampledInstrument(decoded.bufferMap, targetGainNode, {
      rawCtx: decoded.rawCtx,
      attackSec: samplerOpts.attackSec ?? 0.0025,
      releaseSec: samplerOpts.releaseSec ?? 0.55,
      maxPolyphony: samplerOpts.maxPolyphony ?? 18,
      getSoundProfile: samplerOpts.getSoundProfile
    });

    return { sampler, bufferMap: decoded.bufferMap, rawCtx: decoded.rawCtx };
  }

  getActivePianoProfile() {
    return PIANO_CHARACTER_PROFILES[this.pianoCharacter] || PIANO_CHARACTER_PROFILES.natural;
  }

  async loadSingleSampledStem(stemKey, cfg, packs, levelMap) {
    if (!packs[stemKey]) return;
    const gainNode = this[`${stemKey}Gain`];
    if (!gainNode) return;
    const isPiano = stemKey === "piano";
    const stemTargetNode = (isPiano && this.pianoToneFilter) ? this.pianoToneFilter : gainNode;
    const pianoProfGetter = isPiano ? () => this.getActivePianoProfile() : null;
    try {
      const decoded = await this.initSampledInstrument(packs[stemKey], stemTargetNode, {
        attackSec: cfg.attackSec,
        releaseSec: cfg.releaseSec,
        maxPolyphony: cfg.maxPolyphony,
        getSoundProfile: pianoProfGetter
      });
      if (!decoded) return;

      this[stemKey] = decoded.sampler;
      this.sampledStems[stemKey] = true;
      this.stemGainMultipliers[stemKey] = cfg.sampledMult;
      const level = levelMap[stemKey];
      if (Number.isFinite(level) && gainNode.gain) {
        gainNode.gain.value = level * cfg.sampledMult;
      }

      // Separater Demo-Bus für Instrumentenkunde/Theorie-Beispiele (teilt dieselben AudioBuffer im RAM)
      const demoGain = new Tone.Gain(cfg.demoGain).connect(this.masterGain);
      const initDemoReverbMix = this.instrumentReverbMix?.[stemKey] ?? (isPiano ? this.pianoReverbMix : 0.22);
      if (this.pianoReverbDamp) {
        const demoSend = new Tone.Gain(initDemoReverbMix * 1.15).connect(this.pianoReverbDamp);
        this.demoReverbSends[stemKey] = demoSend;
        demoGain.connect(demoSend);
      } else if (cfg.useReverb && this.reverb) {
        demoGain.connect(this.reverb);
      }
      const demoTarget = isPiano
        ? (this.demoPianoToneFilter = new Tone.Filter(this.getActivePianoProfile().filterHz, "lowpass").connect(demoGain))
        : demoGain;
      const demoSampler = new EarLabSampledInstrument(decoded.bufferMap, demoTarget, {
        rawCtx: decoded.rawCtx,
        attackSec: cfg.attackSec,
        releaseSec: cfg.releaseSec,
        maxPolyphony: cfg.maxPolyphony,
        getSoundProfile: pianoProfGetter
      });
      this.demoGains[cfg.demoStyle] = demoGain;
      this.demoSamplers[cfg.demoStyle] = demoSampler;

      if (isPiano) {
        this.pianoUsingSampler = true;
        this.pianoGainMultiplier = cfg.sampledMult;
        this.demoPianoGain = demoGain;
        this.demoPiano = demoSampler;
      }
    } catch (stemErr) {
      console.warn(`Sample-Pack "${stemKey}" konnte nicht decodiert werden, nutze Synth-Fallback:`, stemErr);
      const fallback = this[`${stemKey}FallbackSynth`];
      if (fallback) this[stemKey] = fallback;
      this.sampledStems[stemKey] = false;
      this.stemGainMultipliers[stemKey] = cfg.fallbackMult;
      if (stemKey === "piano") {
        this.pianoUsingSampler = false;
        this.pianoGainMultiplier = cfg.fallbackMult;
      }
    }
  }

  async loadSampledPacks(initialLevels = {}) {
    const levelMap = typeof initialLevels === "number"
      ? { piano: initialLevels }
      : (initialLevels || {});
    try {
      const packs = typeof window !== "undefined" ? window.EARLAB_SAMPLE_PACKS : null;
      if (!packs) return;

      const allEntries = Object.entries(SAMPLED_STEM_CONFIG);
      const prioritySet = new Set(["piano", "voice"]);
      allEntries.forEach(([stemKey]) => {
        if ((levelMap[stemKey] || 0) > 0) prioritySet.add(stemKey);
      });

      const wave1Tasks = allEntries
        .filter(([stemKey]) => prioritySet.has(stemKey))
        .map(([stemKey, cfg]) => this.loadSingleSampledStem(stemKey, cfg, packs, levelMap));

      if (packs.percussion) {
        wave1Tasks.push((async () => {
          try {
            const decodedPerc = await this.decodeSamplePackBuffers(packs.percussion, false);
            if (decodedPerc && Object.keys(decodedPerc.bufferMap).length > 0) {
              this.percSampleRawCtx = decodedPerc.rawCtx;
              this.percSampleGain = new Tone.Gain(1.0).connect(this.masterGain);
              this.percSamples = decodedPerc.bufferMap;
              this.percUsingSamples = true;
            }
          } catch (percErr) {
            console.warn("Percussion-Sample-Pack konnte nicht decodiert werden, nutze Synth-Fallback:", percErr);
            this.percSamples = {};
            this.percUsingSamples = false;
          }
        })());
      }

      // Welle 1 (Klavier, Stimme, aktive Mixer-Stems & Perkussion) priorisiert zuerst laden
      await Promise.all(wave1Tasks);

      // Welle 2 (übrige Orchester-/Band-Stems) direkt im Anschluss fertig decodieren
      const wave2Tasks = allEntries
        .filter(([stemKey]) => !prioritySet.has(stemKey))
        .map(([stemKey, cfg]) => this.loadSingleSampledStem(stemKey, cfg, packs, levelMap));

      if (wave2Tasks.length > 0) {
        await Promise.all(wave2Tasks);
      }
    } catch (err) {
      console.warn("Sample-Packs konnten nicht geladen werden, nutze Synth-Fallback:", err);
    }
  }

  setMasterVolume(val, isMuted) {
    if ((!this.isInitialized && !this.graphBuilt) || !this.masterGain) return;
    const target = isMuted ? 0 : val * 0.45;
    this.masterGain.gain.rampTo(target, 0.04);
  }

  updateSendGainNode(sendNode, targetSend, rampSec = 0.045) {
    if (!sendNode?.gain) return;
    const rawState = (typeof Tone?.getContext === "function" ? Tone.getContext()?.rawContext?.state : Tone?.context?.rawContext?.state)
      || Tone?.context?.state;
    const now = Tone?.now?.() || 0;
    try {
      sendNode.gain.cancelScheduledValues?.(now);
      if (rawState === "running" && typeof sendNode.gain.rampTo === "function") {
        sendNode.gain.rampTo(targetSend, rampSec);
      } else {
        sendNode.gain.setValueAtTime?.(targetSend, now);
        sendNode.gain.value = targetSend;
      }
    } catch (_) {
      sendNode.gain.value = targetSend;
    }
  }

  setInstrumentReverb(instrumentKey = "piano", reverbMix = null) {
    const validKeys = Object.keys(SAMPLED_STEM_CONFIG);
    const key = validKeys.includes(instrumentKey) ? instrumentKey : "piano";
    const charProf = STEM_REVERB_BY_CHAR[this.pianoCharacter] || STEM_REVERB_BY_CHAR.natural;
    const rawNum = Number(reverbMix);
    const mix = Number.isFinite(rawNum)
      ? Math.max(0, Math.min(1, rawNum))
      : (charProf[key] ?? 0.24);
    this.instrumentReverbMix[key] = mix;
    if (key === "piano") this.pianoReverbMix = mix;

    if (!this.isInitialized && !this.graphBuilt) return;
    const targetSend = mix * 1.15;
    this.updateSendGainNode(this.stemReverbSends?.[key], targetSend);
    this.updateSendGainNode(this.demoReverbSends?.[key], targetSend);
  }

  setAllInstrumentReverbs(reverbMap = null) {
    const src = (reverbMap && typeof reverbMap === "object")
      ? reverbMap
      : (STEM_REVERB_BY_CHAR[this.pianoCharacter] || STEM_REVERB_BY_CHAR.natural);
    Object.keys(SAMPLED_STEM_CONFIG).forEach(stemKey => {
      if (Object.prototype.hasOwnProperty.call(src, stemKey)) {
        this.setInstrumentReverb(stemKey, src[stemKey]);
      }
    });
  }

  setPianoSoundProfile(character = "natural", reverbMixOrMap = null) {
    const charKey = Object.prototype.hasOwnProperty.call(PIANO_CHARACTER_PROFILES, character)
      ? character
      : "natural";
    const prof = PIANO_CHARACTER_PROFILES[charKey];
    const presetMap = STEM_REVERB_BY_CHAR[charKey] || STEM_REVERB_BY_CHAR.natural;
    this.pianoCharacter = charKey;

    if (reverbMixOrMap && typeof reverbMixOrMap === "object") {
      Object.keys(SAMPLED_STEM_CONFIG).forEach(stemKey => {
        const val = Number(reverbMixOrMap[stemKey]);
        this.instrumentReverbMix[stemKey] = Number.isFinite(val)
          ? Math.max(0, Math.min(1, val))
          : (presetMap[stemKey] ?? prof.defaultReverb);
      });
      this.pianoReverbMix = this.instrumentReverbMix.piano;
    } else if (reverbMixOrMap !== null && reverbMixOrMap !== undefined && Number.isFinite(Number(reverbMixOrMap))) {
      const pianoMix = Math.max(0, Math.min(1, Number(reverbMixOrMap)));
      this.instrumentReverbMix.piano = pianoMix;
      this.pianoReverbMix = pianoMix;
    } else {
      Object.keys(SAMPLED_STEM_CONFIG).forEach(stemKey => {
        this.instrumentReverbMix[stemKey] = presetMap[stemKey] ?? prof.defaultReverb;
      });
      this.pianoReverbMix = this.instrumentReverbMix.piano;
    }

    if ((!this.isInitialized && !this.graphBuilt)) return;
    const now = Tone?.now?.() || 0;
    this.setAllInstrumentReverbs(this.instrumentReverbMix);
    if (this.pianoFreeverb) {
      try {
        if (this.pianoFreeverb.roomSize && typeof this.pianoFreeverb.roomSize === "object") {
          this.pianoFreeverb.roomSize.value = prof.roomSize;
        } else {
          this.pianoFreeverb.roomSize = prof.roomSize;
        }
        if (this.pianoFreeverb.dampening && typeof this.pianoFreeverb.dampening === "object") {
          this.pianoFreeverb.dampening.value = prof.reverbDampHz;
        } else {
          this.pianoFreeverb.dampening = prof.reverbDampHz;
        }
      } catch (_) {}
    }
    const setFilterFreq = (filterNode, hz) => {
      if (!filterNode?.frequency) return;
      try { filterNode.frequency.cancelScheduledValues?.(now); } catch (_) {}
      try { filterNode.frequency.setValueAtTime?.(hz, now); } catch (_) {}
      filterNode.frequency.value = hz;
    };
    setFilterFreq(this.pianoToneFilter, prof.filterHz);
    setFilterFreq(this.demoPianoToneFilter, prof.filterHz);
    setFilterFreq(this.pianoReverbDamp, prof.reverbDampHz);
    try {
      this.pianoFallbackSynth?.set?.({ envelope: { release: prof.releaseSec + 0.45 } });
    } catch (_) {}
  }

  setDroneIntervalMix(padLevel = 0.70, toneLevel = 1.00) {
    const padNum = Number(padLevel);
    const toneNum = Number(toneLevel);
    if (Number.isFinite(padNum)) this.dronePadGainScale = Math.max(0, Math.min(1, padNum));
    if (Number.isFinite(toneNum)) this.droneToneGainScale = Math.max(0, Math.min(1, toneNum));
  }

  setMixerGains(levels) {
    if ((!this.isInitialized && !this.graphBuilt) || !levels) return;
    Object.keys(SAMPLED_STEM_CONFIG).forEach(stemKey => {
      const gainNode = this[`${stemKey}Gain`];
      const rawLevel = levels[stemKey];
      const level = Number.isFinite(rawLevel) ? rawLevel : (stemKey === "voice" ? 0 : undefined);
      if (gainNode?.gain && Number.isFinite(level)) {
        gainNode.gain.rampTo(level * this.stemGainMultipliers[stemKey], 0.04);
      }
    });
  }

  stopNoiseEntryNow(entry) {
    if (!entry) return;
    if (entry.autoStopTimer) {
      clearTimeout(entry.autoStopTimer);
      entry.autoStopTimer = null;
    }
    const now = typeof Tone !== "undefined" && typeof Tone.now === "function" ? Tone.now() : 0;
    try {
      if (entry.fadeGain?.gain) {
        entry.fadeGain.gain.cancelScheduledValues?.(now);
        entry.fadeGain.gain.rampTo?.(0.0001, 0.02, now);
      }
      setTimeout(() => {
        try {
          entry.noise?.stop?.();
          entry.noise?.dispose?.();
          entry.hpFilter?.dispose?.();
          entry.lpFilter?.dispose?.();
          entry.eqFilter?.dispose?.();
          entry.fadeGain?.dispose?.();
        } catch (_) {}
      }, 30);
    } catch (_) {}
  }

  stopBreathEntryNow(entry) {
    const v = entry?.breathVoice;
    if (!v || v.stopped) return;
    v.stopped = true;
    if (v.cleanupTimer) {
      clearTimeout(v.cleanupTimer);
      v.cleanupTimer = null;
    }
    try {
      const now = v.rawCtx?.currentTime || 0;
      const p = v.envGain?.gain;
      if (p) {
        if (typeof p.cancelAndHoldAtTime === "function") {
          p.cancelAndHoldAtTime(now);
        } else {
          p.cancelScheduledValues(now);
          p.setValueAtTime(Math.max(0.0001, Number(p.value) || 0.0001), now);
        }
        p.linearRampToValueAtTime(0, now + 0.045);
      }
      setTimeout(() => {
        v.stopNodes.forEach(osc => { try { osc.stop(); } catch (_) {} });
        v.cleanupNodes.forEach(node => { try { node.disconnect(); } catch (_) {} });
      }, 65);
    } catch (_) {}
  }

  stopPlayback() {
    this.playbackId++;
    this.activeTimers.forEach(timer => clearTimeout(timer));
    this.activeTimers = [];

    if (this.activeNoiseSession?.autoStopTimer) {
      clearTimeout(this.activeNoiseSession.autoStopTimer);
    }
    this.activeNoiseSession = null;

    this.activeDemoNodes.forEach(entry => {
      try {
        if (entry.noise) {
          this.stopNoiseEntryNow(entry);
          return;
        }
        if (entry.breathVoice) {
          this.stopBreathEntryNow(entry);
          return;
        }
        if (entry.demoSampler) {
          entry.demoSampler.releaseAll?.();
          return;
        }
        entry.synth?.releaseAll?.();
        entry.synth?.dispose?.();
        entry.filter?.dispose?.();
        entry.gain?.dispose?.();
      } catch (_) {}
    });
    this.activeDemoNodes = [];

    if (!this.isInitialized) return;
    [this.piano, this.guitar, this.strings, this.brass, this.voice, this.bass].forEach(inst => {
      if (!inst) return;
      if (typeof inst.releaseAll === "function") inst.releaseAll();
      else inst.triggerRelease?.();
    });
    Object.values(this.demoSamplers).forEach(sampler => sampler?.releaseAll?.());
  }

  /**
   * Stellt einen trockenen Schutz-Bus mit -14 dBFS Limiter vor dem Master-Gain bereit,
   * damit Reintöne und Rosa Rauschen die Ohren nicht überlasten.
   */
  ensureProductionBus() {
    if (!this.isInitialized || !this.masterGain) return null;
    if (!this.prodSafetyLimiter) {
      this.prodSafetyLimiter = new Tone.Limiter(-14).connect(this.masterGain);
    }
    return this.prodSafetyLimiter;
  }

  /**
   * Lautheits-Ausgleichskurve (angelehnt an Kurven gleicher Lautheit),
   * um empfindliche Ohrresonanzen bei 2–4 kHz abzusenken und Bässe ausgewogen zu halten.
   */
  getSafeSineGain(freqHz) {
    const f = Math.max(40, Math.min(16000, Number(freqHz) || 1000));
    const table = [
      [63, 0.21],
      [125, 0.17],
      [250, 0.14],
      [500, 0.115],
      [1000, 0.095],
      [2000, 0.068],
      [4000, 0.062],
      [8000, 0.082],
      [12000, 0.095]
    ];
    if (f <= table[0][0]) return table[0][1];
    if (f >= table[table.length - 1][0]) return table[table.length - 1][1];
    const logF = Math.log2(f);
    for (let i = 0; i < table.length - 1; i++) {
      const [f0, g0] = table[i];
      const [f1, g1] = table[i + 1];
      if (f >= f0 && f <= f1) {
        const t = (logF - Math.log2(f0)) / (Math.log2(f1) - Math.log2(f0));
        return Math.max(0.04, Math.min(0.24, g0 + t * (g1 - g0)));
      }
    }
    return 0.095;
  }

  /**
   * Spielt einen gehörschonenden Reinton (Sinus) mit weichem Ein-/Ausblenden
   * über den trockenen Produktions-Schutzbus ab.
   */
  playProductionTone(freqHz, durationSec = 1.35) {
    if (!this.isInitialized || !this.masterGain) return;
    const dest = this.ensureProductionBus() || this.masterGain;
    const now = Tone.now();
    const dur = Math.max(0.25, Math.min(4.0, Number(durationSec) || 1.35));
    const safeGain = this.getSafeSineGain(freqHz);

    const tempGain = new Tone.Gain(safeGain).connect(dest);
    const tempSynth = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.045, decay: 0.10, sustain: 0.80, release: 0.24 }
    }).connect(tempGain);

    const entry = { synth: tempSynth, gain: tempGain };
    this.activeDemoNodes.push(entry);
    tempSynth.triggerAttackRelease(freqHz, dur, now);

    setTimeout(() => {
      try {
        tempSynth.dispose();
        tempGain.dispose();
      } catch (_) {}
      this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== entry);
    }, (dur + 0.6) * 1000);
  }

  /**
   * Baut die bandbegrenzte Rosa-Rauschen-Signalkette mit parametrischer Peaking-EQ-Stufe auf.
   */
  createNoiseChain(dest, freqHz, qVal, initialGainDb) {
    const fadeGain = new Tone.Gain(0).connect(dest);
    const eqFilter = new Tone.Filter({
      type: "peaking",
      frequency: freqHz,
      Q: qVal,
      gain: initialGainDb
    }).connect(fadeGain);
    const lpFilter = new Tone.Filter(15000, "lowpass").connect(eqFilter);
    const hpFilter = new Tone.Filter(28, "highpass").connect(lpFilter);
    const noise = new Tone.Noise("pink").connect(hpFilter);
    return { noise, hpFilter, lpFilter, eqFilter, fadeGain };
  }

  /**
   * Startet dauerhaftes Rosa Rauschen (Pink Noise) mit aktiver EQ-Anhebung bis zum Treffer oder Stopp.
   * Ermöglicht nahtloses Live-Umschalten auf das neutrale Original (Bypass) per setProductionNoiseBypass().
   */
  startProductionNoiseContinuous(options = {}) {
    if (!this.isInitialized || !this.masterGain) return false;
    const dest = this.ensureProductionBus() || this.masterGain;

    if (this.activeNoiseSession) {
      const prev = this.activeNoiseSession;
      this.activeNoiseSession = null;
      this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== prev);
      this.stopNoiseEntryNow(prev);
    }

    const freqHz = Math.max(40, Math.min(14000, Number(options.freqHz) || 1000));
    const qVal = Math.max(0.7, Math.min(6.0, Number(options.q) || 2.0));
    const gainDb = Math.max(-12, Math.min(11, Number(options.gainDb) ?? 9));
    const startBypassed = Boolean(options.startBypassed);
    const maxDurationSec = Math.max(5, Math.min(180, Number(options.maxDurationSec) || 120));

    // Etwas sanfterer Dauerpegel für ermüdungsfreies Hören + Make-up-Ausgleich bei aktivem Boost
    const baseNoiseGain = 0.115;
    const makeup = Number.isFinite(options.makeupGain)
      ? Math.max(0.55, Math.min(1, options.makeupGain))
      : Math.max(0.66, Math.min(0.88, 1 - gainDb * 0.025));

    const chain = this.createNoiseChain(dest, freqHz, qVal, startBypassed ? 0 : gainDb);
    const session = {
      ...chain,
      baseNoiseGain,
      makeup,
      gainDb,
      bypassed: startBypassed,
      autoStopTimer: null,
      onAutoStop: typeof options.onAutoStop === "function" ? options.onAutoStop : null
    };

    this.activeDemoNodes.push(session);
    this.activeNoiseSession = session;

    const now = typeof Tone.now === "function" ? Tone.now() : 0;
    const targetGain = startBypassed ? baseNoiseGain : (baseNoiseGain * makeup);
    session.fadeGain.gain.setValueAtTime(0.0001, now);
    session.fadeGain.gain.rampTo(targetGain, 0.09, now);
    session.noise.start(now);

    session.autoStopTimer = setTimeout(() => {
      if (this.activeNoiseSession !== session) return;
      const cb = session.onAutoStop;
      this.stopPlayback();
      cb?.();
    }, maxDurationSec * 1000);

    return true;
  }

  /**
   * Schaltet beim laufenden Dauer-Noise fließend zwischen EQ-Boost (false) und Flat/Bypass (true) um.
   */
  setProductionNoiseBypass(isBypassed = false) {
    const s = this.activeNoiseSession;
    if (!s) return false;
    const bypass = Boolean(isBypassed);
    s.bypassed = bypass;

    const now = typeof Tone.now === "function" ? Tone.now() : 0;
    const rampSec = 0.055;
    s.eqFilter?.gain?.cancelScheduledValues?.(now);
    s.eqFilter?.gain?.rampTo?.(bypass ? 0 : s.gainDb, rampSec, now);
    s.fadeGain?.gain?.cancelScheduledValues?.(now);
    s.fadeGain?.gain?.rampTo?.(bypass ? s.baseNoiseGain : (s.baseNoiseGain * s.makeup), rampSec, now);
    return true;
  }

  /**
   * Spielt Rosa Rauschen (Pink Noise, -3 dB/Oktave) mit optionaler parametrischer Peaking-EQ-Anhebung ab.
   * Nutzt geringen Basispegel, Make-up-Absenkung bei aktivem Boost, weiche Blenden und den -14 dBFS Schutz-Limiter.
   */
  playProductionNoiseEQ(options = {}) {
    if (!this.isInitialized || !this.masterGain) return;
    const dest = this.ensureProductionBus() || this.masterGain;

    const mode = options.mode || "ab-switch";
    const freqHz = Math.max(40, Math.min(14000, Number(options.freqHz) || 1000));
    const qVal = Math.max(0.7, Math.min(6.0, Number(options.q) || 2.0));
    const gainDb = Math.max(-12, Math.min(11, Number(options.gainDb) ?? 9));
    const flatDur = Math.max(0.35, Math.min(2.5, Number(options.flatDurationSec) || 0.85));
    const boostDur = Math.max(0.45, Math.min(3.5, Number(options.boostDurationSec) || 1.65));
    const singleDur = Math.max(0.35, Math.min(3.5, Number(options.durationSec) || 1.35));
    const totalDur = mode === "ab-switch" ? (flatDur + boostDur) : singleDur;

    const baseNoiseGain = 0.13;
    const defaultMakeup = Math.max(0.68, Math.min(0.88, 1 - gainDb * 0.024));
    const makeup = Number.isFinite(options.makeupGain)
      ? Math.max(0.55, Math.min(1, options.makeupGain))
      : defaultMakeup;

    const entry = this.createNoiseChain(dest, freqHz, qVal, mode === "boost-only" ? gainDb : 0);
    const { noise, hpFilter, lpFilter, eqFilter, fadeGain } = entry;
    this.activeDemoNodes.push(entry);

    const now = Tone.now();
    const fadeInSec = 0.085;
    const fadeOutSec = 0.13;
    const startGain = mode === "boost-only" ? (baseNoiseGain * makeup) : baseNoiseGain;

    fadeGain.gain.setValueAtTime(0.0001, now);
    fadeGain.gain.rampTo(startGain, fadeInSec, now);

    if (mode === "ab-switch") {
      const switchAt = now + flatDur;
      eqFilter.gain.rampTo(gainDb, 0.055, switchAt);
      fadeGain.gain.rampTo(baseNoiseGain * makeup, 0.055, switchAt);
    }

    const fadeOutAt = now + Math.max(fadeInSec + 0.05, totalDur - fadeOutSec);
    fadeGain.gain.rampTo(0.0001, fadeOutSec, fadeOutAt);

    noise.start(now);
    noise.stop(now + totalDur + 0.04);

    setTimeout(() => {
      try {
        noise.stop();
        noise.dispose();
        hpFilter.dispose();
        lpFilter.dispose();
        eqFilter.dispose();
        fadeGain.dispose();
      } catch (_) {}
      this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== entry);
    }, (totalDur + 0.45) * 1000);
  }

  /**
   * Spielt exakte Frequenzen in Hz mit wählbarer Wellenform über den Master-Bus ab
   * (z. B. für Wellenform-, Schwebungs- und Stimmungs-Experimente im Wissensbereich).
   */
  playFrequencies(freqs, durationSec = 1.6, oscType = "sine", level = 0.28) {
    if (!this.isInitialized || !this.masterGain || !freqs || freqs.length === 0) return;
    const now = Tone.now();
    const dur = Math.max(0.25, durationSec);
    const voiceLevel = level / Math.sqrt(freqs.length);

    const tempGain = new Tone.Gain(voiceLevel).connect(this.masterGain);
    const tempSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: oscType },
      envelope: { attack: 0.03, decay: 0.15, sustain: 0.8, release: 0.28 }
    }).connect(tempGain);

    const entry = { synth: tempSynth, gain: tempGain };
    this.activeDemoNodes.push(entry);

    tempSynth.triggerAttackRelease(freqs, dur, now);

    setTimeout(() => {
      try {
        tempSynth.dispose();
        tempGain.dispose();
      } catch (_) {}
      this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== entry);
    }, (dur + 0.6) * 1000);
  }

  /**
   * Spielt eine isolierte Instrumenten- oder Gesangsklangprobe direkt über den Master-Bus ab
   * (unabhängig davon, wie die 6 Mixer-Fader der Übung gerade stehen).
   */
  playInstrumentSample(style, notes, durationSec = 1.35, arpeggioStepMs = 0, gainScale = 1.0, envOverride = null) {
    if (!this.isInitialized || !this.masterGain || !notes || notes.length === 0) return;
    if (Number.isFinite(gainScale) && gainScale <= 0) return;

    const safeGainScale = Math.max(0.01, Math.min(1.25, Number.isFinite(gainScale) ? gainScale : 1.0));
    const demoSampler = this.demoSamplers[style] || (style === "piano" ? this.demoPiano : null);
    if (demoSampler) {
      const isSeq = arpeggioStepMs > 0 && notes.length > 1;
      const stepDur = Math.max(0.2, durationSec);
      const totalWindowSec = isSeq ? ((notes.length - 1) * arpeggioStepMs) / 1000 + stepDur : stepDur;
      const samplerNotes = isSeq ? notes : [...new Set(notes)];
      const vel = Math.min(1, (isSeq ? 0.92 : Math.min(1, 1.05 / Math.sqrt(samplerNotes.length))) * safeGainScale);
      const entry = { demoSampler };
      this.activeDemoNodes.push(entry);

      const currentId = this.playbackId;
      if (isSeq) {
        samplerNotes.forEach((n, idx) => {
          this.registerTimer(() => {
            if (!this.isInitialized || this.playbackId !== currentId) return;
            demoSampler.triggerAttackRelease(n, stepDur, Tone.now(), vel, envOverride);
          }, idx * arpeggioStepMs);
        });
      } else {
        demoSampler.triggerAttackRelease(samplerNotes, stepDur, Tone.now(), vel, envOverride);
      }

      setTimeout(() => {
        this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== entry);
      }, (totalWindowSec + 0.9) * 1000);
      return;
    }

    const PRESETS = {
      strings:   { Synth: Tone.AMSynth, harmonicity: 1.5, env: { attack: 0.22, decay: 0.30, sustain: 0.85, release: 0.65 }, gain: 0.34 },
      pizzicato: { osc: "triangle", env: { attack: 0.004, decay: 0.22, sustain: 0.01, release: 0.14 }, gain: 0.38 },
      brass:     { osc: "sawtooth", filter: 2100, env: { attack: 0.055, decay: 0.20, sustain: 0.72, release: 0.35 }, gain: 0.24 },
      flute:     { osc: "sine",     env: { attack: 0.09, decay: 0.10, sustain: 0.85, release: 0.32 }, gain: 0.32 },
      reed:      { osc: "square",   filter: 1450, env: { attack: 0.04, decay: 0.15, sustain: 0.78, release: 0.28 }, gain: 0.20 },
      piano:     { osc: "triangle8",env: { attack: 0.006, decay: 1.15, sustain: 0.26, release: 0.75 }, gain: 0.34 },
      cembalo:   { osc: "sawtooth", filter: 3800, env: { attack: 0.003, decay: 0.48, sustain: 0.04, release: 0.22 }, gain: 0.22 },
      organ:     { osc: "sawtooth", filter: 2000, env: { attack: 0.015, decay: 0.10, sustain: 0.94, release: 0.14 }, gain: 0.20 },
      guitar:    { osc: "triangle", env: { attack: 0.008, decay: 0.82, sustain: 0.16, release: 0.55 }, gain: 0.34 },
      ebass:     { osc: "sawtooth", filter: 520,  env: { attack: 0.01, decay: 0.48, sustain: 0.45, release: 0.32 }, gain: 0.42 },
      "synth-saw": { osc: "sawtooth", filter: 2900, env: { attack: 0.02, decay: 0.22, sustain: 0.74, release: 0.38 }, gain: 0.22 },
      "synth-pad": { osc: "triangle", filter: 1600, env: { attack: 0.34, decay: 0.30, sustain: 0.86, release: 0.85 }, gain: 0.28 },
      choir:     { osc: "triangle8",filter: 1900, env: { attack: 0.16, decay: 0.22, sustain: 0.82, release: 0.58 }, gain: 0.30 }
    };

    const cfg = PRESETS[style] || PRESETS.piano;
    const isSeq = arpeggioStepMs > 0 && notes.length > 1;
    const stepDur = Math.max(0.2, durationSec);
    const totalWindowSec = isSeq ? ((notes.length - 1) * arpeggioStepMs) / 1000 + stepDur : stepDur;

    const voiceCount = isSeq ? 1 : Math.sqrt(notes.length);
    const tempGain = new Tone.Gain((cfg.gain * safeGainScale) / voiceCount).connect(this.masterGain);
    const tempFilter = cfg.filter ? new Tone.Filter(cfg.filter, "lowpass").connect(tempGain) : null;
    const destNode = tempFilter || tempGain;

    const tempSynth = cfg.Synth
      ? new Tone.PolySynth(cfg.Synth, { harmonicity: cfg.harmonicity || 1.5, envelope: cfg.env }).connect(destNode)
      : new Tone.PolySynth(Tone.Synth, { oscillator: { type: cfg.osc || "triangle" }, envelope: cfg.env }).connect(destNode);

    const entry = { synth: tempSynth, gain: tempGain, filter: tempFilter };
    this.activeDemoNodes.push(entry);

    const currentId = this.playbackId;
    if (isSeq) {
      notes.forEach((n, idx) => {
        this.registerTimer(() => {
          if (!this.isInitialized || this.playbackId !== currentId) return;
          tempSynth.triggerAttackRelease(n, stepDur, Tone.now());
        }, idx * arpeggioStepMs);
      });
    } else {
      tempSynth.triggerAttackRelease(notes, stepDur, Tone.now());
    }

    setTimeout(() => {
      try {
        tempSynth.dispose();
        tempFilter?.dispose();
        tempGain.dispose();
      } catch (_) {}
      this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== entry);
    }, (totalWindowSec + 0.9) * 1000);
  }

  /**
   * Spielt Begleit- oder Stimmführungs-Töne für den Einsing-Helfer direkt über den Master-Bus ab
   * (unabhängig von den Übungs-Mixer-Fadern).
   */
  playWarmupNotes(soundMode, notes, durationSec = 0.85, isChordCue = false, layerChoirOnChord = false) {
    if (!this.isInitialized || !notes || notes.length === 0) return;
    const dur = Math.max(0.22, Number(durationSec) || 0.85);
    const mode = soundMode === "voice" || soundMode === "piano-voice" ? soundMode : "piano";

    if (mode === "voice") {
      this.playInstrumentSample("choir", notes, dur, 0, isChordCue ? 0.72 : 0.88);
      return;
    }

    this.playInstrumentSample("piano", notes, dur, 0, isChordCue ? 0.80 : 0.90);
    if (mode === "piano-voice" && (!isChordCue || layerChoirOnChord)) {
      this.playInstrumentSample("choir", notes, Math.max(0.32, dur * 1.04), 0, isChordCue ? 0.44 : 0.56);
    }
  }

  /**
   * Spielt einen ruhigen, tiefen Bass-Klangteppich für die Atemübung im Einsing-Helfer ab,
   * der sich über die exakte Dauer des jeweiligen Atemfensters weich ein- und ausblendet.
   */
  playWarmupBreathTone(noteOrMidi, durationSec = 4.0, options = {}) {
    if (!this.isInitialized || !this.masterGain) return;
    const midi = EarLabSampledInstrument.noteToMidi(noteOrMidi);
    if (midi === null) return;

    const rawCtx = this.piano?.rawCtx
      ?? (typeof Tone !== "undefined" && typeof Tone.getContext === "function" ? Tone.getContext()?.rawContext : Tone?.context?.rawContext);
    if (!rawCtx || typeof rawCtx.createOscillator !== "function") return;

    const freq = 440 * Math.pow(2, (midi - 69) / 12);
    const dur = Math.max(0.4, Number(durationSec) || 4.0);
    const phase = options.phase || "inhale";
    const now = rawCtx.currentTime || 0;
    const startAt = now + 0.022;
    const endAt = startAt + dur;
    const attackSec = Math.min(0.85, Math.max(0.18, dur * 0.22));
    const releaseSec = Math.min(1.10, Math.max(0.24, dur * 0.27));
    const sustainEndAt = Math.max(startAt + attackSec + 0.02, endAt - releaseSec);

    const filter = rawCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 0.65;
    const lowCutoff = Math.max(155, Math.min(360, freq * 2.45));
    const highCutoff = Math.max(250, Math.min(520, freq * 4.10));
    if (phase === "inhale") {
      filter.frequency.setValueAtTime(lowCutoff, startAt);
      filter.frequency.exponentialRampToValueAtTime(highCutoff, startAt + dur * 0.72);
      filter.frequency.exponentialRampToValueAtTime(lowCutoff * 1.18, endAt);
    } else {
      filter.frequency.setValueAtTime(highCutoff * 0.90, startAt);
      filter.frequency.exponentialRampToValueAtTime(lowCutoff * 0.92, endAt);
    }

    const envGain = rawCtx.createGain();
    const freqBoost = freq < 110 ? Math.min(1.18, 1 + ((110 - freq) / 50) * 0.16) : 1.0;
    const peakGain = Math.min(0.40, 0.33 * freqBoost);
    envGain.gain.setValueAtTime(0.0001, startAt);
    envGain.gain.linearRampToValueAtTime(peakGain * 0.32, startAt + attackSec * 0.35);
    envGain.gain.linearRampToValueAtTime(peakGain, startAt + attackSec);
    envGain.gain.linearRampToValueAtTime(phase === "exhale" ? peakGain * 0.80 : peakGain * 0.94, sustainEndAt);
    envGain.gain.linearRampToValueAtTime(0.0001, Math.max(sustainEndAt + 0.02, endAt - 0.012));
    envGain.gain.linearRampToValueAtTime(0, endAt);

    filter.connect(envGain);
    connectAudioNodeToTarget(envGain, this.masterGain);

    let reverbSendGain = null;
    const wetMix = Number.isFinite(this.instrumentReverbMix?.strings)
      ? Math.max(0, Math.min(0.28, this.instrumentReverbMix.strings * 0.65))
      : 0.20;
    if (this.pianoReverbDamp && wetMix > 0.005) {
      reverbSendGain = rawCtx.createGain();
      reverbSendGain.gain.value = wetMix;
      envGain.connect(reverbSendGain);
      connectAudioNodeToTarget(reverbSendGain, this.pianoReverbDamp);
    }

    const oscSpecs = [
      { type: "sine", freq, gain: 0.58 },
      { type: "triangle", freq: freq * 0.9988, gain: 0.22 },
      { type: "triangle", freq: freq * 1.0012, gain: 0.22 },
      { type: "sine", freq: freq * 2, gain: 0.20 }
    ];
    const stopNodes = [];
    const cleanupNodes = [filter, envGain];
    if (reverbSendGain) cleanupNodes.push(reverbSendGain);

    oscSpecs.forEach(spec => {
      const osc = rawCtx.createOscillator();
      osc.type = spec.type;
      osc.frequency.setValueAtTime(spec.freq, startAt);
      const layerGain = rawCtx.createGain();
      layerGain.gain.value = spec.gain;
      osc.connect(layerGain);
      layerGain.connect(filter);
      stopNodes.push(osc);
      cleanupNodes.push(osc, layerGain);
    });

    const breathVoice = { rawCtx, envGain, stopNodes, cleanupNodes, stopped: false, cleanupTimer: null };
    const entry = { breathVoice };
    this.activeDemoNodes.push(entry);

    stopNodes.forEach(osc => {
      osc.start(startAt);
      osc.stop(endAt + 0.04);
    });

    breathVoice.cleanupTimer = setTimeout(() => {
      if (breathVoice.stopped) return;
      breathVoice.stopped = true;
      cleanupNodes.forEach(node => { try { node.disconnect(); } catch (_) {} });
      this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== entry);
    }, (dur + 0.35) * 1000);
  }

  /**
   * Spielt eine weiche Streicher-Grundtonfläche ab und lässt nach definierter Verzögerung
   * den gesuchten Intervallton auf dem Klavier darüber erklingen.
   */
  playDroneIntervalCue(padNotes, pianoNotes, options = {}) {
    if (!this.isInitialized || !Array.isArray(padNotes) || padNotes.length === 0) return;
    const currentId = this.playbackId;
    const padDurSec = Math.max(1.0, Number(options.padDurSec) || 2.8);
    const delayMs = Math.max(0, Math.round(Number(options.delayMs) ?? 1100));
    const pianoDurSec = Math.max(0.35, Number(options.pianoDurSec) || 1.35);
    const padGainScale = Number.isFinite(options.padGainScale) ? options.padGainScale : this.dronePadGainScale;
    const pianoGainScale = Number.isFinite(options.pianoGainScale) ? options.pianoGainScale : this.droneToneGainScale;

    this.playInstrumentSample("strings", padNotes, padDurSec, 0, padGainScale, {
      attackSec: 0.14,
      releaseSec: 0.85
    });

    if (Array.isArray(pianoNotes) && pianoNotes.length > 0) {
      this.registerTimer(() => {
        if (!this.isInitialized || this.playbackId !== currentId) return;
        options.onTargetStart?.();
        this.playInstrumentSample("piano", pianoNotes, pianoDurSec, 0, pianoGainScale);
      }, delayMs);
    }
  }

  /**
   * Spielt eine weiche Streicher-Fläche auf dem Bezugsgrundton (z. B. unter Modi-Übungen).
   */
  playRootPad(padNotes, durSec, options = {}) {
    if (!this.isInitialized || !Array.isArray(padNotes) || padNotes.length === 0) return;
    const gainScale = Number.isFinite(options.gainScale) ? options.gainScale : this.dronePadGainScale * 0.75;
    this.playInstrumentSample("strings", padNotes, Math.max(1.0, Number(durSec) || 3), 0, gainScale, {
      attackSec: 0.3,
      releaseSec: 1.0
    });
  }

  /**
   * Spielt einen Schritt über alle aktiven Mixer-Kanäle (Klavier, Gitarre, Streicher,
   * Bläser, Stimme sowie Bass bei übergebenem bassNote) gemäß den aktuellen Mixer-Reglern ab.
   */
  playStep(notes, durationSec = 1.2, bassNote = null, _mode = "cadence", timingOpts = null) {
    if (!this.isInitialized) return;
    const now = Tone.now();
    const rawCtxNow = this.piano?.rawCtx?.currentTime ?? Tone.context?.rawContext?.currentTime ?? now;
    const requestedAt = Number.isFinite(timingOpts?.atTime) ? timingOpts.atTime : now;
    const at = Math.max(now, rawCtxNow, requestedAt);
    const velScale = Number.isFinite(timingOpts?.velocity) ? Math.max(0.08, Math.min(1, timingOpts.velocity)) : 1;
    const minDur = timingOpts ? 0.14 : 0.2;
    const dur = Math.max(minDur, durationSec);
    const hasNotes = Array.isArray(notes) && notes.length > 0;
    const uniqNotes = hasNotes ? [...new Set(notes)] : [];
    const chordVel = uniqNotes.length > 0 ? Math.min(1, 1.05 / Math.sqrt(uniqNotes.length)) * velScale : velScale;

    // Bei zweistimmigen harmonischen Intervallen (z. B. Oktave vs. Prime) verhindert ein minimaler
    // Onset-Versatz mit klarer Oberstimmen-Betonung die Oberton-Verschmelzung am selben Einschwingmoment.
    let harmonicVoices = null;
    if (_mode === "interval-harmonic" && uniqNotes.length === 2) {
      const sorted = uniqNotes.slice().sort(
        (a, b) => EarLabSampledInstrument.noteToMidi(a) - EarLabSampledInstrument.noteToMidi(b)
      );
      const rawNow = this.piano?.rawCtx?.currentTime ?? Tone.context?.rawContext?.currentTime ?? 0;
      const onsetGapSec = 0.022;
      const baseAt = Math.max(at, rawNow + 0.024);
      harmonicVoices = [
        { note: sorted[0], dur, at: baseAt, vel: 0.50 * velScale },
        { note: sorted[1], dur: Math.max(0.2, dur - onsetGapSec), at: baseAt + onsetGapSec, vel: 1.0 * velScale }
      ];
    }

    const triggerChordStem = (stemKey) => {
      if (!hasNotes) return;
      const inst = this[stemKey];
      if (!inst) return;
      const isSampled = this.sampledStems[stemKey] || (stemKey === "piano" && this.pianoUsingSampler);
      if (harmonicVoices) {
        harmonicVoices.forEach(v => inst.triggerAttackRelease([v.note], v.dur, v.at, v.vel));
      } else if (isSampled) {
        inst.triggerAttackRelease(uniqNotes, dur, at, chordVel);
      } else if (timingOpts?.velocity !== undefined) {
        inst.triggerAttackRelease(notes, dur, at, velScale);
      } else {
        inst.triggerAttackRelease(notes, dur, at);
      }
    };

    if (hasNotes) {
      ["piano", "guitar", "strings", "brass", "voice"].forEach(triggerChordStem);
    }

    if (bassNote && this.bass) {
      if (this.sampledStems.bass) {
        this.bass.triggerAttackRelease(bassNote, dur, at, 0.95 * velScale);
      } else if (timingOpts?.velocity !== undefined) {
        this.bass.triggerAttackRelease(bassNote, dur, at, velScale);
      } else {
        this.bass.triggerAttackRelease(bassNote, dur, at);
      }
    }
  }

  ensurePercussionSynths() {
    if (this.percInitialized || !this.isInitialized || !this.masterGain) return;

    const kickGain = new Tone.Gain(0.85).connect(this.masterGain);
    this.percMembrane = new Tone.MembraneSynth({
      pitchDecay: 0.045,
      octaves: 5,
      oscillator: { type: "sine" },
      envelope: { attack: 0.002, decay: 0.22, sustain: 0.0, release: 0.08 }
    }).connect(kickGain);

    const snareFilter = new Tone.Filter(1500, "highpass").connect(this.masterGain);
    const snareGain = new Tone.Gain(0.45).connect(snareFilter);
    this.percSnare = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.002, decay: 0.14, sustain: 0.0 }
    }).connect(snareGain);

    const hatFilter = new Tone.Filter(6200, "highpass").connect(this.masterGain);
    const hatGain = new Tone.Gain(0.24).connect(hatFilter);
    this.percHat = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.001, decay: 0.045, sustain: 0.0 }
    }).connect(hatGain);

    const shakerFilter = new Tone.Filter({ frequency: 4400, type: "bandpass", Q: 1.5 }).connect(this.masterGain);
    const shakerGain = new Tone.Gain(0.22).connect(shakerFilter);
    this.percShaker = new Tone.NoiseSynth({
      noise: { type: "pink" },
      envelope: { attack: 0.01, decay: 0.065, sustain: 0.0 }
    }).connect(shakerGain);

    const toneGain = new Tone.Gain(0.35).connect(this.masterGain);
    this.percTone = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.002, decay: 0.065, sustain: 0.0, release: 0.03 }
    }).connect(toneGain);

    this.percInitialized = true;
  }

  playPercussionSample(buffer, when, gainVal, rate = 1.0) {
    if (!buffer || !this.percSampleRawCtx || !this.percSampleGain) return false;
    const rawCtx = this.percSampleRawCtx;
    const startAt = Math.max(when, rawCtx.currentTime || 0);
    const src = rawCtx.createBufferSource();
    src.buffer = buffer;
    src.playbackRate.value = rate;

    const gainNode = rawCtx.createGain();
    const peak = Math.max(0.01, Math.min(1.5, gainVal));
    gainNode.gain.setValueAtTime(peak, startAt);

    src.connect(gainNode);
    connectAudioNodeToTarget(gainNode, this.percSampleGain);

    src.onended = () => {
      try { src.disconnect(); } catch (_) {}
      try { gainNode.disconnect(); } catch (_) {}
    };

    const maxDur = (buffer.duration || 1.2) / Math.max(0.25, rate);
    src.start(startAt);
    src.stop(startAt + maxDur + 0.03);
    return true;
  }

  triggerPercussion(kind, scheduledTime = null, velocity = 1) {
    if (!this.isInitialized) return;
    this.ensurePercussionSynths();
    const now = Tone.now();
    const when = scheduledTime !== null && scheduledTime !== undefined
      ? Math.max(now, scheduledTime)
      : now;
    const vel = Math.max(0.05, Math.min(1, Number.isFinite(velocity) ? velocity : 1));

    if (this.percUsingSamples) {
      const sampleTable = {
        kick:           { key: "kick",    gain: 0.92, rate: 1.0 },
        snare:          { key: "snare",   gain: 0.88, rate: 1.0 },
        tick:           { key: "tick",    gain: 0.72, rate: 1.0 },
        accent:         { key: "tick",    gain: 0.95, rate: 1.335 },
        wood_accent:    { key: "clave",   gain: 0.96, rate: 1.28 },
        wood_tick:      { key: "clave",   gain: 0.78, rate: 0.96 },
        wood_sub:       { key: "clave",   gain: 0.62, rate: 1.48 },
        cowbell_accent: { key: "cowbell", gain: 0.94, rate: 1.22 },
        cowbell_tick:   { key: "cowbell", gain: 0.78, rate: 0.96 },
        cowbell_sub:    { key: "cowbell", gain: 0.58, rate: 1.42 },
        rimshot_accent: { key: "snare",   gain: 0.96, rate: 1.45 },
        rimshot_tick:   { key: "snare",   gain: 0.78, rate: 1.15 },
        rimshot_sub:    { key: "hat",     gain: 0.68, rate: 1.2 },
        hat:            { key: "hat",     gain: 0.78, rate: 1.0 },
        clave:          { key: "clave",   gain: 0.84, rate: 1.0 },
        shaker:         { key: "shaker",  gain: 0.75, rate: 1.0 },
        cowbell:        { key: "cowbell", gain: 0.82, rate: 1.0 }
      };
      const spec = sampleTable[kind];
      const sampleBuf = spec ? this.percSamples[spec.key] : null;
      if (sampleBuf && this.playPercussionSample(sampleBuf, when, vel * spec.gain, spec.rate)) {
        return;
      }
    }

    const membraneMap = {
      kick: "C1",
      tom_low: "G2",
      tom_mid: "C3",
      tom_high: "F3",
      conga_low: "A2",
      conga_high: "E3",
      timpani: "C2"
    };
    const toneMap = {
      accent: { note: "C6", dur: 0.05 },
      tick: { note: "G5", dur: 0.04 },
      clave: { note: "E6", dur: 0.035 },
      wood_accent: { note: "G6", dur: 0.04 },
      wood_tick: { note: "D6", dur: 0.035 },
      wood_sub: { note: "A6", dur: 0.025 },
      cowbell: { note: "G#5", dur: 0.11 },
      cowbell_accent: { note: "B5", dur: 0.11 },
      cowbell_tick: { note: "G#5", dur: 0.095 },
      cowbell_sub: { note: "E6", dur: 0.045 }
    };

    if (membraneMap[kind]) {
      this.percMembrane?.triggerAttackRelease(membraneMap[kind], 0.16, when, vel);
    } else if (kind === "rimshot_accent") {
      this.percTone?.triggerAttackRelease("F5", 0.03, when, vel);
      this.percSnare?.triggerAttackRelease("32n", when, vel * 0.85);
    } else if (kind === "rimshot_tick") {
      this.percTone?.triggerAttackRelease("C5", 0.025, when, vel * 0.75);
      this.percSnare?.triggerAttackRelease("64n", when, vel * 0.55);
    } else if (kind === "rimshot_sub") {
      this.percHat?.triggerAttackRelease("32n", when, vel * 0.85);
    } else if (kind === "snare") {
      this.percSnare?.triggerAttackRelease("16n", when, vel);
    } else if (kind === "hat") {
      this.percHat?.triggerAttackRelease("32n", when, vel);
    } else if (kind === "shaker") {
      this.percShaker?.triggerAttackRelease("32n", when, vel);
    } else if (toneMap[kind]) {
      const def = toneMap[kind];
      this.percTone?.triggerAttackRelease(def.note, def.dur, when, vel);
    }
  }

  /**
   * Spielt ein Rhythmus-Muster aus [delayMs, instrumentKind, optionalVelocity] Paaren ab.
   * Nutzt einen kurzen Lookahead auf die WebAudio-Uhr für präzises Timing ohne JS-Timer-Jittern.
   */
  playRhythmSequence(events, baseAudioTimeOverride = null) {
    if (!this.isInitialized || !events || events.length === 0) return;
    this.ensurePercussionSynths();
    const currentId = this.playbackId;
    const baseAudioTime = baseAudioTimeOverride !== null && baseAudioTimeOverride !== undefined
      ? baseAudioTimeOverride
      : Tone.now() + 0.035;
    const lookaheadMs = 95;

    events.forEach(([delayMs, kind, vel]) => {
      const safeDelay = Math.max(0, delayMs);
      const targetAudioTime = baseAudioTime + safeDelay / 1000;
      const timerDelay = Math.max(0, safeDelay - lookaheadMs);
      this.registerTimer(() => {
        if (!this.isInitialized || this.playbackId !== currentId) return;
        this.triggerPercussion(kind, targetAudioTime, vel !== undefined ? vel : 1);
      }, timerDelay);
    });
  }

  registerTimer(callback, delayMs) {
    const timerId = setTimeout(callback, delayMs);
    this.activeTimers.push(timerId);
    return timerId;
  }
}

const audioEngine = new AudioEngine();