/**
 * Lauscher • Native WebAudio-Engine (ohne externe Audio-Frameworks)
 *
 * Schwerpunkte für maximale Stabilität auf allen Endgeräten (Desktop, iOS/Safari, Android/WebView, Bluetooth):
 * 1. Reiner nativer AudioContext ({ latencyHint: "playback" }) ohne Wrapper-Overhead oder Doppel-Contexte.
 * 2. Nur im Mixer aktive Stems (> 0 %) werden überhaupt ausgelöst (kein stummes 6-Spur-Mitlaufen).
 * 3. Automatisches Multi-Stem-Headroom-Scaling + Master-Compressor + transparenter Soft-Clipper (0 digitales Clipping).
 * 4. Globales Voice-Budget & knacksfreies Voice-Stealing / Stoppen per setTargetAtTime (C¹-stetig in allen Browsern).
 * 5. Sample-Puffer-Ende-Schutz (jede Stimme blendet garantiert vor Pufferende aus) & Zero-Copy-Trim-Offset.
 * 6. Synchron erzeugte, warme Stereo-Hall-IR (kein OfflineAudioContext, kein Freeverb, kein +17,5-dB-Boost).
 * 7. Schonendes, Playback-bewusstes Sample-Decoding mit Main-Thread-Pausen (schützt Android/iOS MediaCodec-Pools).
 */

/**
 * Dreiecksverteilter Zufallswert in [0, 1] (häuft sich organisch um 0,5, vermeidet harte Ausreißer).
 */
function triRand01() {
  return (Math.random() + Math.random()) * 0.5;
}

const SAMPLED_STEM_CONFIG = {
  piano:   { demoStyle: "piano",   attackSec: 0.004, legatoAttackSec: 0.007, legatoStartSkipSec: 0.000, releaseSec: 0.62, legatoOverlapSec: 0.025, chordCrossfadeSec: 0.16, melodyCrossfadeSec: 0.15, chordSpreadMs: 9,  noteJitterMs: 3.5, chordRollMode: "roll",     ensembleRangeMs: [0, 4],  fallbackMult: 0.72, sampledMult: 0.92, demoGain: 0.85, useReverb: true,  maxPolyphony: 16 },
  guitar:  { demoStyle: "guitar",  attackSec: 0.004, legatoAttackSec: 0.008, legatoStartSkipSec: 0.000, releaseSec: 0.58, legatoOverlapSec: 0.022, chordCrossfadeSec: 0.15, melodyCrossfadeSec: 0.14, chordSpreadMs: 14, noteJitterMs: 3.0, chordRollMode: "roll",     ensembleRangeMs: [2, 8],  fallbackMult: 0.65, sampledMult: 0.78, demoGain: 0.85, useReverb: true,  maxPolyphony: 12 },
  strings: { demoStyle: "strings", attackSec: 0.024, legatoAttackSec: 0.048, legatoStartSkipSec: 0.042, releaseSec: 0.72, legatoOverlapSec: 0.055, chordCrossfadeSec: 0.16, melodyCrossfadeSec: 0.14, chordSpreadMs: 11, noteJitterMs: 5.0, chordRollMode: "ensemble", ensembleRangeMs: [4, 13], fallbackMult: 0.55, sampledMult: 0.58, demoGain: 0.85, useReverb: true,  maxPolyphony: 12 },
  brass:   { demoStyle: "brass",   attackSec: 0.012, legatoAttackSec: 0.026, legatoStartSkipSec: 0.018, releaseSec: 0.50, legatoOverlapSec: 0.036, chordCrossfadeSec: 0.13, melodyCrossfadeSec: 0.12, chordSpreadMs: 8,  noteJitterMs: 4.5, chordRollMode: "ensemble", ensembleRangeMs: [3, 10], fallbackMult: 0.42, sampledMult: 0.62, demoGain: 0.85, useReverb: true,  maxPolyphony: 12 },
  voice:   { demoStyle: "choir",   attackSec: 0.020, legatoAttackSec: 0.055, legatoStartSkipSec: 0.075, releaseSec: 0.68, legatoOverlapSec: 0.070, chordCrossfadeSec: 0.17, melodyCrossfadeSec: 0.15, chordSpreadMs: 13, noteJitterMs: 6.0, chordRollMode: "ensemble", ensembleRangeMs: [5, 15], fallbackMult: 0.45, sampledMult: 0.58, demoGain: 0.85, useReverb: true,  maxPolyphony: 12 },
  bass:    { demoStyle: "ebass",   attackSec: 0.004, legatoAttackSec: 0.007, legatoStartSkipSec: 0.000, releaseSec: 0.34, legatoOverlapSec: 0.016, chordCrossfadeSec: 0.075, melodyCrossfadeSec: 0.075, chordSpreadMs: 0, noteJitterMs: 2.5, chordRollMode: "ensemble", ensembleRangeMs: [0, 6],  fallbackMult: 0.92, sampledMult: 0.92, demoGain: 0.85, useReverb: false, maxPolyphony: 4 }
};

const PIANO_CHARACTER_PROFILES = {
  dry:     { filterHz: 18000, reverbDampHz: 5200, roomSize: 0.58, defaultReverb: 0.00, releaseSec: 0.60, holdDecayFloor: 1.00, attackSec: 0.004,  spreadMs: 3.5, jitterMs: 1.5, humanize: true },
  natural: { filterHz: 5800,  reverbDampHz: 4800, roomSize: 0.72, defaultReverb: 0.24, releaseSec: 0.84, holdDecayFloor: 0.86, attackSec: 0.0045, spreadMs: 9.0, jitterMs: 3.5, humanize: true },
  concert: { filterHz: 5000,  reverbDampHz: 5600, roomSize: 0.86, defaultReverb: 0.48, releaseSec: 1.12, holdDecayFloor: 0.82, attackSec: 0.005,  spreadMs: 13.0, jitterMs: 4.5, humanize: true }
};

const STEM_REVERB_BY_CHAR = {
  dry:     { piano: 0.00, guitar: 0.00, strings: 0.00, brass: 0.00, voice: 0.00, bass: 0.00 },
  natural: { piano: 0.24, guitar: 0.22, strings: 0.34, brass: 0.26, voice: 0.30, bass: 0.06 },
  concert: { piano: 0.48, guitar: 0.42, strings: 0.56, brass: 0.46, voice: 0.52, bass: 0.16 }
};

const IOS_SILENT_WAV_DATA_URI = "data:audio/wav;base64,UklGRsQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

function isIOSLikeDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = String(navigator.userAgent || "");
  const platform = String(navigator.platform || "");
  const maxTouch = Number(navigator.maxTouchPoints || 0);
  return /iPad|iPhone|iPod/i.test(ua) || (platform === "MacIntel" && maxTouch > 1);
}

/**
 * Erkennt Mobilgeräte (Android, iOS/iPadOS) und Safari/WebKit, die von kürzeren Faltungs-IRs,
 * strafferem Voice-Budget und etwas größerem Scheduling-Lookahead besonders profitieren.
 */
function shouldUseLiteReverb() {
  if (typeof navigator === "undefined") return false;
  const ua = String(navigator.userAgent || "");
  const isAndroid = /Android/i.test(ua);
  const isWebKitOnly = /AppleWebKit/i.test(ua) && !/Chrome|Chromium|Edg\/|OPR\//i.test(ua);
  return isIOSLikeDevice() || isWebKitOnly || isAndroid || /CriOS|FxiOS/i.test(ua);
}

function connectAudioNodeToTarget(node, target) {
  if (!node || !target) return;
  if (typeof node.connect === "function") {
    node.connect(target.input || target);
  }
}

/**
 * Knacksfreie Parameter-Änderung per setTargetAtTime (C¹-stetig, frei vom Safari/Firefox-p.value-Bug).
 */
function smoothSetAudioParam(param, targetValue, rawCtx, rampSec = 0.03) {
  if (!param) return;
  const val = Number.isFinite(targetValue) ? targetValue : 0;
  const now = rawCtx?.currentTime || 0;
  const state = rawCtx?.state || "suspended";
  try {
    const t = now + 0.004;
    if (state === "running" && typeof param.setTargetAtTime === "function" && rampSec > 0.001) {
      if (typeof param.cancelAndHoldAtTime === "function") {
        param.cancelAndHoldAtTime(t);
      } else if (typeof param.cancelScheduledValues === "function") {
        param.cancelScheduledValues(t);
      }
      param.setTargetAtTime(val, t, Math.max(0.003, rampSec / 3));
    } else {
      param.cancelScheduledValues?.(now);
      param.setValueAtTime?.(val, now);
      param.value = val;
    }
  } catch (_) {
    try { param.value = val; } catch (_e) {}
  }
}

/**
 * Erzeugt eine transparente Soft-Clipper-Kennlinie für WaveShaperNode:
 * - Innerhalb [-0.72, +0.72] exakt linear (y = x, 0 % Verzerrung bei Normalpegel).
 * - Oberhalb 0.72 weiche C¹-stetige tanh-Sättigung asymptotisch gegen ±0.94 (-0,54 dBFS),
 *   sodass digitales 0-dBFS-Clipping (hartes Knacksen/Kratzen) physisch ausgeschlossen ist.
 */
function createSoftClipperCurve(samples = 4096) {
  const curve = new Float32Array(samples);
  const knee = 0.72;
  const ceiling = 0.94;
  const headroom = ceiling - knee;
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / (samples - 1) - 1;
    const ax = Math.abs(x);
    if (ax <= knee) {
      curve[i] = x;
    } else {
      const y = knee + headroom * Math.tanh((ax - knee) / headroom);
      curve[i] = x < 0 ? -y : y;
    }
  }
  return curve;
}

/**
 * Erzeugt synchron im RAM eine warme, dekorrelierte Stereo-Raum-Impulsantwort (ohne OfflineAudioContext!).
 * RMS-normiert für gleichmäßigen, kontrollierten Hall-Pegel ohne extremen Nachverstärkungs-Boost.
 */
function buildNativeReverbIR(rawCtx, durationSec = 1.35, dampHz = 4800) {
  const sr = rawCtx.sampleRate || 44100;
  const len = Math.max(1024, Math.floor(sr * Math.max(0.4, Math.min(2.2, durationSec))));
  const buffer = rawCtx.createBuffer(2, len, sr);
  const attackSamples = Math.max(64, Math.floor(sr * 0.014));
  const preDelaySamples = Math.floor(sr * 0.012);
  // 1-Pol-Tiefpass-Koeffizient für warme, natürliche Höhendämpfung in der Hallfahne
  const lpCoeff = Math.exp((-2 * Math.PI * Math.min(sr * 0.4, Math.max(1200, dampHz))) / sr);
  const lpInv = 1 - lpCoeff;

  const makeRng = (seed) => {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return (((t ^ (t >>> 14)) >>> 0) / 4294967296) * 2 - 1;
    };
  };

  let energySum = 0;
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    const rng = makeRng(ch === 0 ? 0x51A7BEEF : 0xC0FFEE42);
    let lpState = 0;
    const decayRate = 6.2 / Math.max(0.3, (len - preDelaySamples) / sr);
    for (let i = preDelaySamples; i < len; i++) {
      const rel = i - preDelaySamples;
      const tSec = rel / sr;
      const env = Math.exp(-decayRate * tSec);
      const fadeIn = rel < attackSamples ? Math.sin((rel / attackSamples) * (Math.PI * 0.5)) : 1;
      // Leichtes Ausblenden am absoluten Ende (10 ms) gegen IR-Abbruch
      const tailLeft = len - i;
      const fadeOut = tailLeft < 480 ? tailLeft / 480 : 1;
      const white = rng();
      lpState = lpState * lpCoeff + white * lpInv;
      const sample = lpState * env * fadeIn * fadeOut;
      data[i] = sample;
      energySum += sample * sample;
    }
  }

  // Exakte Faltungs-Energie-Normierung (L2-Norm pro Kanal = 0,85 → ~ -1,4 dB bei 100 % Wet,
  // unabhängig von Sample-Rate und IR-Länge; niemals Übersteuerung im Hall-Bus)
  const channelL2 = Math.sqrt(energySum / 2);
  const normScale = channelL2 > 1e-6 ? (0.85 / channelL2) : 0.015;
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      data[i] *= normScale;
    }
  }
  return buffer;
}

/**
 * Erzeugt einmalig einen nahtlos geloopten 4-Sekunden-Puffer mit echtem Rosa Rauschen (-3 dB/Okt., Paul Kellet).
 */
function buildLoopedPinkNoiseBuffer(rawCtx, seconds = 4.0) {
  const sr = rawCtx.sampleRate || 44100;
  const len = Math.max(sr, Math.floor(sr * seconds));
  const buffer = rawCtx.createBuffer(1, len, sr);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  // Warmlauf, damit der Filter bereits im eingeschwungenen Zustand startet
  for (let i = 0; i < 512; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    b6 = white * 0.115926;
  }
  let maxAbs = 0.001;
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    const pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
    data[i] = pink;
    const a = Math.abs(pink);
    if (a > maxAbs) maxAbs = a;
  }
  const scale = 0.82 / maxAbs;
  for (let i = 0; i < len; i++) data[i] *= scale;
  // Kurzer Crossfade (20 ms) an der Loop-Naht für 100 % knackfreie Endlosschleife
  const xfade = Math.min(Math.floor(sr * 0.02), Math.floor(len * 0.05));
  for (let i = 0; i < xfade; i++) {
    const t = i / xfade;
    data[i] = data[i] * t + data[len - xfade + i] * (1 - t);
  }
  return buffer;
}

function buildWhiteNoiseBuffer(rawCtx, seconds = 1.0) {
  const sr = rawCtx.sampleRate || 44100;
  const len = Math.max(4096, Math.floor(sr * seconds));
  const buffer = rawCtx.createBuffer(1, len, sr);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

/**
 * Gitarren-Griffe für Kadenzen: Sucht zu einem Akkord (Tonnamen + Basston) einen Griff, wie ihn ein Gitarrist
 * in Standardstimmung (E2 A2 D3 G3 B3 E4) spielen würde: 4–6 zusammenhängende Saiten, tiefster Ton = Basston,
 * alle Akkordtöne (bei Vierklängen darf einer fehlen), Spannweite ≤ 3 Bünde, höchstens 4 Finger bzw. Barré + 3.
 * Bevorzugt volle Griffe, offene Akkorde und tiefe Lagen.
 * Ergebnis: Tonnamen von tief nach hoch, oder null (dann spielt die Gitarre die übergebenen Töne).
 */
const GUITAR_STANDARD_TUNING = [40, 45, 50, 55, 59, 64];
const GUITAR_VOICING_NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const guitarVoicingCache = new Map();

function getGuitarChordVoicing(notes, bassNote = null) {
  const pcOf = (m) => ((m % 12) + 12) % 12;
  const midis = (notes || []).map(n => EarLabSampledInstrument.noteToMidi(n)).filter(Number.isFinite);
  if (midis.length < 3) return null;
  const pcs = [...new Set(midis.map(pcOf))];
  const bassMidi = EarLabSampledInstrument.noteToMidi(bassNote);
  const bassPc = Number.isFinite(bassMidi) ? pcOf(bassMidi) : pcOf(Math.min(...midis));
  if (!pcs.includes(bassPc)) pcs.push(bassPc);
  if (pcs.length < 3 || pcs.length > 4) return null;
  const cacheKey = `${pcs.slice().sort((a, b) => a - b).join(",")}/${bassPc}`;
  if (guitarVoicingCache.has(cacheKey)) return guitarVoicingCache.get(cacheKey);

  // Bei Vierklängen (Grundton + Terz + Quinte + Sexte/Septime) darf nur die Quinte fehlen
  let omittablePc = null;
  if (pcs.length === 4) {
    for (const r of pcs) {
      const iv = new Set(pcs.map(p => pcOf(p - r)));
      if (iv.has(7) && (iv.has(3) || iv.has(4)) && (iv.has(9) || iv.has(10) || iv.has(11))) {
        omittablePc = pcOf(r + 7);
        break;
      }
    }
  }

  const tuning = GUITAR_STANDARD_TUNING;
  let best = null;
  const evaluate = (frets) => {
    const played = [];
    for (let s = 0; s < 6; s++) if (frets[s] >= 0) played.push(s);
    if (played.length < 4 || played[played.length - 1] - played[0] + 1 !== played.length) return;
    const sounding = played.map(s => tuning[s] + frets[s]);
    if (pcOf(sounding[0]) !== bassPc || Math.min(...sounding) !== sounding[0]) return;
    const covered = new Set(sounding.map(pcOf));
    const missingPcs = pcs.filter(pc => !covered.has(pc));
    if (missingPcs.length > 1 || (missingPcs.length === 1 && missingPcs[0] !== omittablePc)) return;
    const missing = missingPcs.length;
    const fretted = played.map(s => frets[s]).filter(f => f > 0);
    const minF = fretted.length ? Math.min(...fretted) : 0;
    const maxF = fretted.length ? Math.max(...fretted) : 0;
    if (maxF - minF > 3) return;
    const hasOpen = played.some(s => frets[s] === 0);
    let fingers = fretted.length;
    let barre = false;
    if (fingers > 4) {
      // Barré: Zeigefinger über den tiefsten Bund, nur ohne Leersaiten oberhalb der tiefsten Barré-Saite
      const barreFrom = played.find(s => frets[s] === minF);
      if (!played.some(s => s > barreFrom && frets[s] === 0)) {
        fingers = 1 + fretted.filter(f => f > minF).length;
        barre = true;
      }
    }
    if (fingers > 4) return;
    const unisons = sounding.length - new Set(sounding).size; // gleicher Ton auf zwei Saiten klingt nicht nach Griff
    let score = -3 * played.length + 0.9 * minF + 2 * missing + 4 * unisons; // fehlende Quinte ist bei Gitarren üblich
    score += 1.5 * (maxF - minF);                     // Spreizung
    if (barre) score += frets[played[0]] === minF ? 3 : 6; // Barré, ungewohnt, wenn der Basston darüber gegriffen wird
    if (hasOpen) score += minF > 4 ? 5 : (maxF > 3 ? 1.5 * (maxF - 3) : -1); // offene Griffe bevorzugen, aber ohne Streckung
    if (played[played.length - 1] !== 5) score += 2;  // hohe E-Saite nicht gespielt
    if (sounding[0] > 52) score += 0.5 * (sounding[0] - 52); // Basston über E3
    if (!best || score < best.score) best = { score, sounding };
  };

  const frets = new Array(6);
  for (let pos = 0; pos <= 9; pos++) {
    const lo = Math.max(1, pos);
    const hi = pos === 0 ? 3 : pos + 3;
    const options = tuning.map(open => {
      const opts = [-1];
      if (pcs.includes(pcOf(open))) opts.push(0);
      for (let f = lo; f <= hi; f++) if (pcs.includes(pcOf(open + f))) opts.push(f);
      return opts;
    });
    const walk = (s) => {
      if (s === 6) { evaluate(frets); return; }
      for (const f of options[s]) { frets[s] = f; walk(s + 1); }
    };
    walk(0);
  }

  const result = best
    ? best.sounding.map(m => `${GUITAR_VOICING_NAMES[pcOf(m)]}${Math.floor(m / 12) - 1}`)
    : null;
  guitarVoicingCache.set(cacheKey, result);
  return result;
}

/**
 * Schlanker nativer WebAudio-Sampler für Studio-Samples.
 * Features:
 * - Zero-Copy Trim-Offset (keine doppelten AudioBuffer im RAM).
 * - Sample-Puffer-Ende-Schutz (blendet garantiert vor Ende des Samples aus → 0 Knackser bei hohen/langen Tönen).
 * - Knacksfreies Ausblenden per setTargetAtTime (in allen Browsern C¹-stetig).
 * - Anbindung an globales Voice-Budget & Same-Note-Anti-Stacking.
 */
class EarLabSampledInstrument {
  constructor(bufferMap, targetNode, options = {}) {
    this.urls = bufferMap || {};
    this.rawCtx = options.rawCtx;
    this.targetNode = targetNode;
    this.attackSec = Math.max(0.004, options.attackSec ?? 0.004);
    this.legatoAttackSec = Math.max(this.attackSec, options.legatoAttackSec ?? Math.min(0.045, this.attackSec * 1.6));
    this.legatoStartSkipSec = Math.max(0, options.legatoStartSkipSec ?? 0);
    this.releaseSec = options.releaseSec ?? 0.60;
    this.legatoOverlapSec = Math.max(0.008, options.legatoOverlapSec ?? 0.025);
    this.chordCrossfadeSec = Math.max(0.04, options.chordCrossfadeSec ?? 0.15);
    this.melodyCrossfadeSec = Math.max(0.04, options.melodyCrossfadeSec ?? 0.14);
    this.chordSpreadMs = Math.max(0, options.chordSpreadMs ?? 9);
    this.noteJitterMs = Math.max(0, options.noteJitterMs ?? 3.5);
    this.chordRollMode = options.chordRollMode || "roll";
    this.maxPolyphony = options.maxPolyphony ?? 16;
    this.getSoundProfile = typeof options.getSoundProfile === "function" ? options.getSoundProfile : null;
    this.onVoiceStart = typeof options.onVoiceStart === "function" ? options.onVoiceStart : null;
    this.onVoiceEnd = typeof options.onVoiceEnd === "function" ? options.onVoiceEnd : null;
    this.activeVoices = [];
    this._played = [];
    this._humanizeCounter = 0;
    // Optionale Velocity-Layer (z. B. Gitarre p/f), geteilt zwischen Haupt- und Demo-Sampler
    this.velocityLayerStore = options.velocityLayerStore || null;

    this.samples = EarLabSampledInstrument.buildSampleList(this.urls);
  }

  static buildSampleList(bufferMap) {
    return Object.entries(bufferMap || {})
      .map(([note, entry]) => {
        const isObj = entry && typeof entry === "object" && entry.buffer;
        return {
          note,
          midi: EarLabSampledInstrument.noteToMidi(note),
          buffer: isObj ? entry.buffer : entry,
          trimOffsetSec: isObj ? (entry.trimOffsetSec || 0) : 0
        };
      })
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

  static midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  findClosestSample(targetMidi, sampleList = null) {
    const list = sampleList && sampleList.length > 0 ? sampleList : this.samples;
    let best = list[0];
    let bestDist = Infinity;
    for (let i = 0; i < list.length; i++) {
      const d = Math.abs(list[i].midi - targetMidi);
      if (d < bestDist) {
        bestDist = d;
        best = list[i];
      }
    }
    return best;
  }

  retireVoice(voice, fadeSec = 0.032, whenSec = null) {
    if (!voice) return;
    const now = this.rawCtx?.currentTime || 0;
    const t = Number.isFinite(whenSec) ? Math.max(now + 0.006, whenSec) : (now + 0.006);
    if (voice.released) return;
    if (Number.isFinite(voice.retiredAt) && voice.retiredAt <= t + 0.002) return;
    if (Number.isFinite(voice.fadeOutEnd) && t >= voice.fadeOutEnd - 0.012) {
      voice.retiredAt = voice.fadeOutEnd;
      if (t <= now + 0.015) voice.released = true;
      return;
    }
    voice.retiredAt = t;
    const isImmediate = t <= now + 0.015;
    if (isImmediate) voice.released = true;
    try {
      const p = voice.gain.gain;
      if (Number.isFinite(voice.startAt) && t < voice.startAt - 0.004) {
        // Noch nicht gestartete, vorab geplante Stimme lautlos abbrechen
        p.cancelScheduledValues(0);
        p.setValueAtTime(0, t);
        voice.released = true;
        try { voice.src.stop(t); } catch (_) {}
        return;
      }
      const safeFade = Math.max(0.02, fadeSec);
      const tau = Math.max(0.004, safeFade / 4.5);
      if (typeof p.cancelAndHoldAtTime === "function") {
        p.cancelAndHoldAtTime(t);
      } else {
        p.cancelScheduledValues(t);
      }
      p.setTargetAtTime(0, t, tau);
      try { voice.src.stop(t + safeFade + 0.055); } catch (_) {}
    } catch (_) {}
  }

  triggerAttackRelease(notes, durationSec = 1.0, whenTime = null, velocity = 1, envOverride = null) {
    if (!this.rawCtx || this.samples.length === 0) return;
    const noteList = Array.isArray(notes) ? notes : [notes];
    if (noteList.length === 0) return;

    const now = this.rawCtx.currentTime || 0;
    const minLead = shouldUseLiteReverb() ? 0.032 : 0.022;
    const startAt = Math.max(now + minLead, Number.isFinite(whenTime) ? whenTime : now + minLead);
    const dur = Math.max(0.06, Number(durationSec) || 0.6);
    const safeVel = Math.max(0.02, Math.min(1, Number.isFinite(velocity) ? velocity : 1));
    const prof = this.getSoundProfile ? this.getSoundProfile() : null;
    const legatoGroup = (envOverride?.legatoGroup === "chord" || envOverride?.legatoGroup === "melody")
      ? envOverride.legatoGroup
      : null;

    const resolvedEntries = noteList
      .map(noteToken => ({ noteToken, targetMidi: EarLabSampledInstrument.noteToMidi(noteToken) }))
      .filter(entry => entry.targetMidi !== null);
    if (resolvedEntries.length === 0) return;
    const incomingMidiSet = new Set(resolvedEntries.map(e => e.targetMidi));

    // Legato-Übergänge & Same-Note-Anti-Stacking präzise auf den echten Einsatzzeitpunkt (startAt) planen
    let hasLegatoPredecessor = false;
    let hasDifferentPitchPredecessor = false;
    const overlapSec = Number.isFinite(envOverride?.legatoOverlapSec)
      ? Math.max(0.005, envOverride.legatoOverlapSec)
      : this.legatoOverlapSec;
    const crossfadeSec = Number.isFinite(envOverride?.legatoCrossfadeSec)
      ? Math.max(0.035, envOverride.legatoCrossfadeSec)
      : (legatoGroup === "melody" ? this.melodyCrossfadeSec : this.chordCrossfadeSec);

    for (let i = 0; i < this.activeVoices.length; i++) {
      const existing = this.activeVoices[i];
      if (!existing || existing.released || existing.startAt > startAt - 0.012) continue;
      const existingEnd = Number.isFinite(existing.retiredAt) ? existing.retiredAt : (existing.fadeOutEnd || 0);
      const isSamePitch = incomingMidiSet.has(existing.midi);

      if (legatoGroup && existing.legatoGroup === legatoGroup && existingEnd >= startAt - 0.08) {
        hasLegatoPredecessor = true;
        if (!isSamePitch) hasDifferentPitchPredecessor = true;
        if (isSamePitch) {
          if (legatoGroup === "melody") {
            // Tonwiederholung in einer Melodie: minimaler sauberer Neuansatz vor startAt für klare Rhythmik
            this.retireVoice(existing, 0.026, Math.max(now + 0.006, startAt - 0.022));
          } else {
            // Gemeinsamer Akkordton (z. B. C in I → vi): nahtlose Übergabe ohne Lücke & ohne Kammfilter
            this.retireVoice(existing, 0.042, Math.max(now + 0.006, startAt - 0.004));
          }
        } else {
          // Klangwechsel: Vorgängerton trägt bis kurz nach startAt und blendet dann wie beim Halbpedal/Bogenwechsel weich aus
          this.retireVoice(existing, crossfadeSec, startAt + overlapSec);
        }
      } else if (isSamePitch && existingEnd > startAt - 0.01) {
        // Same-Note-Anti-Stacking erst am tatsächlichen startAt statt sofort bei Lookahead-Vorplanung
        this.retireVoice(existing, 0.036, Math.max(now + 0.006, startAt - 0.004));
      }
    }

    const useLegatoContinuation = Boolean(legatoGroup && hasLegatoPredecessor && (legatoGroup === "chord" || hasDifferentPitchPredecessor));
    const baseAttackSec = prof ? (prof.attackSec ?? this.attackSec) : this.attackSec;
    const effAttackSec = Math.max(
      0.004,
      Number.isFinite(envOverride?.attackSec)
        ? envOverride.attackSec
        : (useLegatoContinuation ? Math.max(baseAttackSec, this.legatoAttackSec) : baseAttackSec)
    );
    const extraStartSkipSec = useLegatoContinuation ? this.legatoStartSkipSec : 0;
    const baseReleaseSec = Number.isFinite(envOverride?.releaseSec)
      ? Math.max(0.04, envOverride.releaseSec)
      : (prof ? (prof.releaseSec ?? this.releaseSec) : this.releaseSec);
    const effReleaseSec = (!Number.isFinite(envOverride?.releaseSec) && prof && noteList.length === 1 && dur <= 0.38)
      ? Math.min(baseReleaseSec, Math.max(0.40, dur * 1.6))
      : baseReleaseSec;

    const allowHumanize = envOverride?.humanize !== false && (!prof || prof.humanize !== false);
    const effSpreadMs = prof && Number.isFinite(prof.spreadMs) ? prof.spreadMs : this.chordSpreadMs;
    const effJitterMs = prof && Number.isFinite(prof.jitterMs) ? prof.jitterMs : this.noteJitterMs;
    const sortedMidis = allowHumanize && resolvedEntries.length >= 2
      ? resolvedEntries.map(e => e.targetMidi).sort((a, b) => a - b)
      : null;
    // Pro Akkord einmalig gewürfelte, dezente Roll-Varianz (nie zweimal identisch, nie übertrieben)
    const chordRollFactor = 0.65 + triRand01() * 0.70;
    const invertRoll = this.chordRollMode === "roll" && resolvedEntries.length >= 3 && Math.random() < 0.16;
    // Klangfarbe nach ausdrücklich angegebener Dynamik (nicht nach der akkordbedingt abgesenkten Velocity);
    // noch nicht decodierte Layer werden angestoßen, bis dahin klingt der Hauptlayer
    const layerSamples = this.velocityLayerStore && Number.isFinite(envOverride?.dynamic)
      ? this.velocityLayerStore.pick(envOverride.dynamic)
      : null;

    resolvedEntries.forEach(({ targetMidi }) => {
      let chosen = this.findClosestSample(targetMidi, layerSamples);
      // Layer deckt nicht jeden Ton ab (z. B. Klavier p/f nur C2–C6): bei weitem Abstand lieber den Hauptlayer,
      // statt ein Sample stark zu transponieren
      if (layerSamples && chosen && Math.abs(chosen.midi - targetMidi) > 2) {
        chosen = this.findClosestSample(targetMidi);
      }
      if (!chosen) return;

      while (this.activeVoices.length >= this.maxPolyphony) {
        let evictIdx = this.activeVoices.findIndex(v => Number.isFinite(v.retiredAt) && v.retiredAt <= startAt + 0.02);
        if (evictIdx === -1) evictIdx = 0;
        const oldest = this.activeVoices.splice(evictIdx, 1)[0];
        this.retireVoice(oldest, 0.028, Math.max(now + 0.006, Math.min(startAt, oldest?.retiredAt ?? startAt)));
      }

      const rate = Math.pow(2, (targetMidi - chosen.midi) / 12);
      const src = this.rawCtx.createBufferSource();
      src.buffer = chosen.buffer;
      src.playbackRate.value = rate;

      let voiceStartAt = startAt;
      let voiceVel = safeVel;
      if (allowHumanize) {
        const velJitter = 0.96 + triRand01() * 0.08;
        if (sortedMidis && sortedMidis.length >= 2) {
          const rank = sortedMidis.indexOf(targetMidi);
          const rawPos = sortedMidis.length > 1 ? rank / (sortedMidis.length - 1) : 0;
          const normPos = invertRoll ? (1 - rawPos) : rawPos;
          const dyadScale = sortedMidis.length === 2 ? 0.55 : 1.0;
          if (sortedMidis.length >= 3) {
            const balanceScale = rank === sortedMidis.length - 1 ? 1.00 : (rank === 0 ? 0.94 : 0.83);
            voiceVel = Math.max(0.02, Math.min(1, safeVel * balanceScale * velJitter));
          } else {
            voiceVel = Math.max(0.02, Math.min(1, safeVel * velJitter));
          }
          if (this.chordRollMode === "ensemble") {
            // Streicher/Chor/Bläser: jede Stimme im Ensemble setzt organisch minimal versetzt ein
            const spreadRange = (effSpreadMs * dyadScale + effJitterMs) / 1000;
            voiceStartAt += triRand01() * spreadRange;
          } else {
            // Klavier/Gitarre: feines organisches Akkord-Roll + zufälliger Finger-Mikroversatz
            const rollSec = normPos * ((effSpreadMs * dyadScale * chordRollFactor) / 1000);
            const jitterSec = triRand01() * (effJitterMs / 1000);
            voiceStartAt += rollSec + jitterSec;
          }
        } else {
          voiceVel = Math.max(0.02, Math.min(1, safeVel * velJitter));
        }
      }
      const gainMult = Number.isFinite(envOverride?.gainMult)
        ? Math.max(0.05, Math.min(1.5, envOverride.gainMult))
        : 1.0;
      voiceVel *= gainMult;

      const envGain = this.rawCtx.createGain();
      const gainParam = envGain.gain;
      const trimOff = Math.max(0, Math.min((chosen.buffer.duration || 0) - 0.12, (chosen.trimOffsetSec || 0) + extraStartSkipSec));
      const availBufDur = Math.max(0.08, ((chosen.buffer.duration || 4.0) - trimOff) / Math.max(0.25, rate));
      const safeEndCeiling = voiceStartAt + Math.max(0.06, availBufDur - 0.02);

      const peakAt = Math.min(voiceStartAt + effAttackSec, safeEndCeiling - 0.035);
      let relAt = voiceStartAt + dur;
      let fadeOutEnd = relAt + effReleaseSec;

      // Sample-Puffer-Ende-Schutz: jede Stimme blendet garantiert weich auf 0 aus, BEVOR der Puffer endet!
      if (fadeOutEnd > safeEndCeiling) {
        fadeOutEnd = safeEndCeiling;
        const minRelSpan = Math.min(effReleaseSec, Math.max(0.045, availBufDur * 0.28));
        relAt = Math.max(peakAt + 0.008, fadeOutEnd - minRelSpan);
      }
      const stopAt = fadeOutEnd + 0.025;

      gainParam.value = 0.0001;
      gainParam.setValueAtTime(0.0001, voiceStartAt);
      gainParam.linearRampToValueAtTime(voiceVel, peakAt);

      let relStartVel = voiceVel;
      if (prof && prof.holdDecayFloor < 0.99 && relAt > peakAt + 0.04) {
        const octFactor = Math.max(0.84, Math.min(1.04, 1.0 - (targetMidi - 60) * 0.004));
        relStartVel = Math.max(0.35 * voiceVel, Math.min(voiceVel * 0.96, voiceVel * prof.holdDecayFloor * octFactor));
        gainParam.exponentialRampToValueAtTime(relStartVel, relAt);
      } else if (relAt > peakAt) {
        gainParam.setValueAtTime(voiceVel, relAt);
      }

      // Zweistufiges musikalisches Ausklingen (weiche Dämpfer-Schulter statt steiler -62-dB-Klippe)
      const relSpan = Math.max(0.025, fadeOutEnd - relAt);
      if (relSpan >= 0.09) {
        const kneeAt = relAt + relSpan * 0.36;
        const tailAt = Math.max(kneeAt + 0.02, fadeOutEnd - 0.014);
        const kneeVel = Math.max(0.002, relStartVel * 0.42);
        gainParam.exponentialRampToValueAtTime(kneeVel, kneeAt);
        gainParam.exponentialRampToValueAtTime(0.0008, tailAt);
        gainParam.linearRampToValueAtTime(0, fadeOutEnd);
      } else {
        gainParam.exponentialRampToValueAtTime(0.0008, Math.max(relAt + 0.015, fadeOutEnd - 0.01));
        gainParam.linearRampToValueAtTime(0, fadeOutEnd);
      }

      src.connect(envGain);
      connectAudioNodeToTarget(envGain, this.targetNode);

      const voice = {
        src,
        gain: envGain,
        midi: targetMidi,
        startAt: voiceStartAt,
        releaseAt: relAt,
        fadeOutEnd,
        retiredAt: undefined,
        legatoGroup,
        released: false,
        retire: (fade = 0.028, when = null) => this.retireVoice(voice, fade, when)
      };
      this.activeVoices.push(voice);
      this.onVoiceStart?.(voice);

      src.onended = () => {
        const idx = this.activeVoices.indexOf(voice);
        if (idx !== -1) this.activeVoices.splice(idx, 1);
        this.onVoiceEnd?.(voice);
        try { src.disconnect(); } catch (_) {}
        try { envGain.disconnect(); } catch (_) {}
      };

      src.start(voiceStartAt, trimOff);
      src.stop(stopAt);
    });
  }

  releaseAll() {
    const copy = this.activeVoices.slice();
    this.activeVoices = [];
    copy.forEach(v => this.retireVoice(v, 0.038));
  }
}

/**
 * Schlanker nativer WebAudio-Synthesizer als Fallback (solange Samples laden oder für Theorie-/Klang-Demos).
 * Ersetzt schwere Tone.PolySynth/Tone.AMSynth-Wrapper durch direkte OscillatorNode + BiquadFilterNode + GainNode
 * mit garantiert knacksfreiem Ausblenden.
 */
class EarLabNativeSynth {
  constructor(rawCtx, targetNode, options = {}) {
    this.rawCtx = rawCtx;
    this.targetNode = targetNode;
    this.oscType = options.oscType || "triangle";
    this.filterHz = Number.isFinite(options.filterHz) ? options.filterHz : 0;
    this.attack = Math.max(0.005, options.attack ?? 0.01);
    this.decay = Math.max(0.04, options.decay ?? 0.5);
    this.sustain = Math.max(0.02, Math.min(1, options.sustain ?? 0.35));
    this.release = Math.max(0.04, options.release ?? 0.45);
    this.baseGain = Number.isFinite(options.baseGain) ? options.baseGain : 0.32;
    this.maxPolyphony = options.maxPolyphony ?? 10;
    this.monophonic = Boolean(options.monophonic);
    this.detuneSpread = Number.isFinite(options.detuneSpread) ? options.detuneSpread : 0;
    this.onVoiceStart = typeof options.onVoiceStart === "function" ? options.onVoiceStart : null;
    this.onVoiceEnd = typeof options.onVoiceEnd === "function" ? options.onVoiceEnd : null;
    this.activeVoices = [];
  }

  retireVoice(voice, fadeSec = 0.03, whenSec = null) {
    if (!voice || voice.released) return;
    const now = this.rawCtx?.currentTime || 0;
    const t = Number.isFinite(whenSec) ? Math.max(now + 0.006, whenSec) : (now + 0.006);
    if (Number.isFinite(voice.retiredAt) && voice.retiredAt <= t + 0.002) return;
    if (Number.isFinite(voice.fadeOutEnd) && t >= voice.fadeOutEnd - 0.012) {
      voice.retiredAt = voice.fadeOutEnd;
      if (t <= now + 0.015) voice.released = true;
      return;
    }
    voice.retiredAt = t;
    if (t <= now + 0.015) voice.released = true;
    try {
      const p = voice.gain.gain;
      if (Number.isFinite(voice.startAt) && t < voice.startAt - 0.004) {
        p.cancelScheduledValues(0);
        p.setValueAtTime(0, t);
        voice.released = true;
        voice.oscs.forEach(o => { try { o.stop(t); } catch (_) {} });
        return;
      }
      const safeFade = Math.max(0.02, fadeSec);
      const tau = Math.max(0.004, safeFade / 4.5);
      if (typeof p.cancelAndHoldAtTime === "function") {
        p.cancelAndHoldAtTime(t);
      } else {
        p.cancelScheduledValues(t);
      }
      p.setTargetAtTime(0, t, tau);
      const stopAt = t + safeFade + 0.055;
      voice.oscs.forEach(o => { try { o.stop(stopAt); } catch (_) {} });
    } catch (_) {}
  }

  triggerAttackRelease(notesOrFreqs, durationSec = 1.0, whenTime = null, velocity = 1, envOverride = null) {
    if (!this.rawCtx) return;
    const list = Array.isArray(notesOrFreqs) ? notesOrFreqs : [notesOrFreqs];
    if (list.length === 0) return;

    const now = this.rawCtx.currentTime || 0;
    const minLead = shouldUseLiteReverb() ? 0.032 : 0.022;
    const startAt = Math.max(now + minLead, Number.isFinite(whenTime) ? whenTime : now + minLead);
    const dur = Math.max(0.06, Number(durationSec) || 0.6);
    const safeVel = Math.max(0.02, Math.min(1, Number.isFinite(velocity) ? velocity : 1));
    const polyScale = list.length > 1 ? (1 / Math.sqrt(list.length)) : 1;
    const legatoGroup = (envOverride?.legatoGroup === "chord" || envOverride?.legatoGroup === "melody")
      ? envOverride.legatoGroup
      : null;

    const parsed = list.map(token => {
      let freq = null;
      let midi = null;
      if (typeof token === "number" && Number.isFinite(token) && token > 15) {
        freq = token;
      } else {
        midi = EarLabSampledInstrument.noteToMidi(token);
        if (midi !== null) freq = EarLabSampledInstrument.midiToFreq(midi);
      }
      return { freq, midi };
    }).filter(x => Number.isFinite(x.freq) && x.freq > 15);
    if (parsed.length === 0) return;

    const incomingMidiSet = new Set(parsed.map(x => x.midi).filter(m => m !== null));
    if (this.monophonic) {
      this.activeVoices.forEach(existing => {
        if (existing && !existing.released && existing.startAt <= startAt - 0.01) {
          this.retireVoice(existing, 0.055, Math.max(now + 0.006, startAt + 0.01));
        }
      });
    } else if (legatoGroup) {
      this.activeVoices.forEach(existing => {
        if (!existing || existing.released || existing.startAt > startAt - 0.012) return;
        const existingEnd = Number.isFinite(existing.retiredAt) ? existing.retiredAt : (existing.fadeOutEnd || 0);
        if (existing.legatoGroup === legatoGroup && existingEnd >= startAt - 0.08) {
          const isSamePitch = existing.midi !== null && incomingMidiSet.has(existing.midi);
          if (isSamePitch && legatoGroup === "melody") {
            this.retireVoice(existing, 0.026, Math.max(now + 0.006, startAt - 0.022));
          } else if (isSamePitch) {
            this.retireVoice(existing, 0.04, Math.max(now + 0.006, startAt - 0.004));
          } else {
            this.retireVoice(existing, 0.13, startAt + 0.022);
          }
        }
      });
    }

    parsed.forEach(({ freq, midi }) => {
      if (!this.monophonic) {
        while (this.activeVoices.length >= this.maxPolyphony) {
          let evictIdx = this.activeVoices.findIndex(v => Number.isFinite(v.retiredAt) && v.retiredAt <= startAt + 0.02);
          if (evictIdx === -1) evictIdx = 0;
          const oldest = this.activeVoices.splice(evictIdx, 1)[0];
          this.retireVoice(oldest, 0.025, Math.max(now + 0.006, Math.min(startAt, oldest?.retiredAt ?? startAt)));
        }
      }

      const envGain = this.rawCtx.createGain();
      let dest = envGain;
      let filter = null;
      if (this.filterHz > 0) {
        filter = this.rawCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = this.filterHz;
        filter.Q.value = 0.7;
        filter.connect(envGain);
        dest = filter;
      }

      const oscs = [];
      const detunes = this.detuneSpread > 0 ? [-this.detuneSpread, this.detuneSpread] : [0];
      const oscGainScale = 1 / detunes.length;
      detunes.forEach(det => {
        const osc = this.rawCtx.createOscillator();
        osc.type = this.oscType;
        osc.frequency.setValueAtTime(freq, startAt);
        if (det !== 0) osc.detune.setValueAtTime(det, startAt);
        osc.connect(dest);
        oscs.push(osc);
      });

      const peak = Math.min(0.9, this.baseGain * safeVel * polyScale * oscGainScale);
      const sustainVal = Math.max(0.0005, peak * this.sustain);
      const peakAt = startAt + this.attack;
      const decayEnd = Math.min(startAt + dur, peakAt + this.decay);
      const relAt = Math.max(peakAt + 0.01, startAt + dur);
      const fadeEnd = relAt + this.release;

      const gp = envGain.gain;
      gp.value = 0.0001;
      gp.setValueAtTime(0.0001, startAt);
      gp.linearRampToValueAtTime(peak, peakAt);
      let relStartVal = peak;
      if (decayEnd > peakAt + 0.005) {
        gp.exponentialRampToValueAtTime(sustainVal, decayEnd);
        relStartVal = sustainVal;
      }
      if (relAt > decayEnd) {
        gp.setValueAtTime(relStartVal, relAt);
      }
      const relSpan = Math.max(0.025, fadeEnd - relAt);
      if (relSpan >= 0.09) {
        const kneeAt = relAt + relSpan * 0.36;
        const tailAt = Math.max(kneeAt + 0.02, fadeEnd - 0.014);
        gp.exponentialRampToValueAtTime(Math.max(0.002, relStartVal * 0.42), kneeAt);
        gp.exponentialRampToValueAtTime(0.0005, tailAt);
        gp.linearRampToValueAtTime(0, fadeEnd);
      } else {
        gp.exponentialRampToValueAtTime(0.0005, Math.max(relAt + 0.015, fadeEnd - 0.01));
        gp.linearRampToValueAtTime(0, fadeEnd);
      }

      connectAudioNodeToTarget(envGain, this.targetNode);

      const voice = {
        oscs,
        filter,
        gain: envGain,
        midi,
        startAt,
        releaseAt: relAt,
        fadeOutEnd: fadeEnd,
        retiredAt: undefined,
        legatoGroup,
        released: false,
        retire: (fade = 0.028, when = null) => this.retireVoice(voice, fade, when)
      };
      this.activeVoices.push(voice);
      this.onVoiceStart?.(voice);

      const primaryOsc = oscs[0];
      primaryOsc.onended = () => {
        const idx = this.activeVoices.indexOf(voice);
        if (idx !== -1) this.activeVoices.splice(idx, 1);
        this.onVoiceEnd?.(voice);
        oscs.forEach(o => { try { o.disconnect(); } catch (_) {} });
        try { filter?.disconnect(); } catch (_) {}
        try { envGain.disconnect(); } catch (_) {}
      };

      const stopAt = fadeEnd + 0.03;
      oscs.forEach(o => {
        o.start(startAt);
        o.stop(stopAt);
      });
    });
  }

  triggerRelease() {
    this.releaseAll();
  }

  releaseAll() {
    const copy = this.activeVoices.slice();
    this.activeVoices = [];
    copy.forEach(v => this.retireVoice(v, 0.035));
  }
}

/**
 * EarLab Audio Engine (100 % native Web Audio API)
 */
class AudioEngine {
  constructor() {
    this.isInitialized = false;
    this.graphBuilt = false;
    this.samplesLoaded = false;
    this.wave1SamplesReady = false;
    this.wave1SamplesPromise = null;
    this.preparePromise = null;
    this.rawCtx = null;
    this._iosUnlockAudioEl = null;
    this._iosHtmlAudioUnlocked = false;
    this._silentBufferPlayed = false;

    this.liteReverb = shouldUseLiteReverb();
    this.maxGlobalVoices = this.liteReverb ? 28 : 44;
    this.globalVoices = [];

    this.softClipper = null;
    this.limiterTrim = null;
    this.masterLimiter = null;
    this.masterGain = null;
    this.stemMixCompGain = null;
    this.stemReverbBusGain = null;
    this.pianoReverb = null;
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
    this.dronePadGainScale = 0.50;
    this.droneToneGainScale = 1.00;
    this.masterLevel = 0.67;
    this.masterMuted = false;

    this.stemLevels = { piano: 0.90, guitar: 0, strings: 0, brass: 0, voice: 0, bass: 0 };
    this.stemLoadingPromises = {};

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

    this.pinkNoiseBuffer = null;
    this.whiteNoiseBuffer = null;

    this.activeTimers = [];
    this.activeDemoNodes = [];
    this.activeNoiseSession = null;
    this.playbackId = 0;

    // Trockener Schutz-Limiter für Frequenz- & Noise-Training (-14 dBFS vor Master)
    this.prodSafetyLimiter = null;
  }

  getRawAudioContext() {
    return this.rawCtx || null;
  }

  /**
   * Einheitliche Hardware-Audio-Uhr (Sekunden) für alle Sequenzen, Rhythmen & das Metronom.
   */
  getAudioTime() {
    if (this.rawCtx && Number.isFinite(this.rawCtx.currentTime)) {
      return this.rawCtx.currentTime;
    }
    return Date.now() / 1000;
  }

  getScheduleLookaheadSec() {
    return this.liteReverb ? 0.045 : 0.028;
  }

  ensurePlaybackContext() {
    if (this.rawCtx && this.rawCtx.state !== "closed") {
      return this.rawCtx;
    }
    const Ctx = typeof window !== "undefined" ? (window.AudioContext || window.webkitAudioContext) : null;
    if (!Ctx) return null;
    try {
      // "playback" nutzt größere Hardware-Puffer → drastisch stabiler auf Mobilgeräten & Bluetooth
      this.rawCtx = new Ctx({ latencyHint: "playback" });
    } catch (_) {
      try {
        this.rawCtx = new Ctx();
      } catch (_e) {
        return null;
      }
    }
    if (this.rawCtx && !this.rawCtx._earlabStateListenerAttached && typeof this.rawCtx.addEventListener === "function") {
      this.rawCtx._earlabStateListenerAttached = true;
      this.rawCtx.addEventListener("statechange", () => {
        if (this.rawCtx.state === "interrupted" || this.rawCtx.state === "suspended") {
          this._iosHtmlAudioUnlocked = false;
          this._silentBufferPlayed = false;
        }
      });
    }
    return this.rawCtx;
  }

  isAudioUnlocked() {
    const rawCtx = this.getRawAudioContext();
    if (!rawCtx || rawCtx.state !== "running") return false;
    if (isIOSLikeDevice() && !this._iosHtmlAudioUnlocked) return false;
    return true;
  }

  markAudioSessionInterrupted() {
    this._iosHtmlAudioUnlocked = false;
    this._silentBufferPlayed = false;
  }

  registerVoice(voice) {
    if (!voice) return;
    this.globalVoices.push(voice);
    if (this.globalVoices.length > this.maxGlobalVoices) {
      const now = this.rawCtx?.currentTime || 0;
      // Bevorzugt eine bereits im Release/Crossfade befindliche Stimme ablösen, sonst die älteste aktive Stimme
      let victimIdx = this.globalVoices.findIndex(v => v !== voice && !v.released && ((v.retiredAt ?? v.releaseAt) <= now));
      if (victimIdx === -1) {
        victimIdx = this.globalVoices.findIndex(v => v !== voice && !v.released);
      }
      if (victimIdx !== -1) {
        const victim = this.globalVoices[victimIdx];
        victim.retire?.(0.024);
      }
    }
  }

  unregisterVoice(voice) {
    const idx = this.globalVoices.indexOf(voice);
    if (idx !== -1) this.globalVoices.splice(idx, 1);
  }

  /**
   * Synchroner Audio-Unlock direkt innerhalb einer Nutzer-Geste (insbesondere iOS Safari & WKWebView):
   * 1. Setzt iOS 17+ AudioSession auf "playback" (umgeht Hardware-Stummschalter).
   * 2. Spielt einen winzigen stummen HTML5-<audio playsinline>-WAV-Clip (iOS < 17 & WKWebView).
   * 3. Weckt den nativen WebAudio-Kontext aus "suspended" / "interrupted" + 1-Sample-Silent-Buffer.
   */
  unlockAudioSessionSync() {
    try {
      if (typeof navigator !== "undefined" && navigator.audioSession) {
        if (navigator.audioSession.type !== "playback") {
          navigator.audioSession.type = "playback";
        }
      }
    } catch (_) {}

    const rawCtx = this.ensurePlaybackContext();

    if (typeof document !== "undefined" && typeof Audio !== "undefined" && (!this._iosHtmlAudioUnlocked || rawCtx?.state !== "running")) {
      try {
        if (!this._iosUnlockAudioEl) {
          const el = new Audio();
          el.preload = "auto";
          el.playsInline = true;
          el.setAttribute?.("playsinline", "");
          el.setAttribute?.("webkit-playsinline", "");
          el.muted = false;
          el.volume = 0.01;
          el.src = IOS_SILENT_WAV_DATA_URI;
          this._iosUnlockAudioEl = el;
        }
        const el = this._iosUnlockAudioEl;
        if (el.paused || el.ended) {
          try { el.currentTime = 0; } catch (_) {}
          const playRes = el.play();
          if (playRes && typeof playRes.then === "function") {
            playRes.then(() => {
              this._iosHtmlAudioUnlocked = true;
            }).catch(() => {});
          } else {
            this._iosHtmlAudioUnlocked = true;
          }
        }
      } catch (_) {}
    }

    if (rawCtx && (rawCtx.state === "suspended" || rawCtx.state === "interrupted") && typeof rawCtx.resume === "function") {
      try {
        Promise.resolve(rawCtx.resume()).catch(() => {});
      } catch (_) {}
    }

    if (rawCtx && (!this._silentBufferPlayed || rawCtx.state !== "running")
      && typeof rawCtx.createBuffer === "function" && typeof rawCtx.createBufferSource === "function") {
      try {
        const silentBuf = rawCtx.createBuffer(1, 1, 22050);
        const src = rawCtx.createBufferSource();
        src.buffer = silentBuf;
        src.connect(rawCtx.destination);
        src.start(0);
        this._silentBufferPlayed = true;
      } catch (_) {}
    }

    return rawCtx;
  }

  /**
   * Automatisches Headroom-Scaling bei mehreren gleichzeitig aktiven Mixer-Spuren:
   * - Ein einzelnes Instrument bleibt bei Faktor 1,0 (unveränderte Lautstärke).
   * - Bei 2–6 gleichzeitig aktiven Spuren wird der Summenbus sanft abgesenkt, sodass
   *   weder der Master-Compressor pumpt noch Transienten übersteuern.
   */
  computeMultiStemCompensation() {
    let effSum = 0;
    Object.keys(SAMPLED_STEM_CONFIG).forEach(k => {
      const lv = Math.max(0, Number(this.stemLevels[k]) || 0);
      if (lv > 0.005) {
        effSum += lv * (this.stemGainMultipliers[k] || 0.75);
      }
    });
    if (effSum <= 0.95) return 1.0;
    return Math.max(0.38, Math.min(1.0, 1 / Math.pow(effSum / 0.95, 0.56)));
  }

  updateMultiStemCompensation(rampSec = 0.045) {
    if (!this.rawCtx) return;
    const comp = this.computeMultiStemCompensation();
    smoothSetAudioParam(this.stemMixCompGain?.gain, comp, this.rawCtx, rampSec);
    // Hall-Bus noch etwas ruhiger halten, wenn viele Spuren gleichzeitig senden
    const revComp = Math.max(0.32, Math.min(1.0, comp * 0.95));
    smoothSetAudioParam(this.stemReverbBusGain?.gain, revComp, this.rawCtx, rampSec);
  }

  hasAnyActiveReverb() {
    return Object.values(this.instrumentReverbMix || {}).some(v => Number(v) > 0.005);
  }

  syncReverbReturnState() {
    if (!this.pianoReverbReturn?.gain || !this.rawCtx) return;
    const target = this.hasAnyActiveReverb() ? 0.55 : 0;
    smoothSetAudioParam(this.pianoReverbReturn.gain, target, this.rawCtx, 0.06);
  }

  buildAudioGraphSync(initialMaster = 0.67, initialMuted = false, initialMixer = null) {
    if (this.graphBuilt) return true;

    const rawCtx = this.ensurePlaybackContext();
    if (!rawCtx) return false;
    this.liteReverb = shouldUseLiteReverb();
    this.maxGlobalVoices = this.liteReverb ? 28 : 44;

    // 1. Klippsichere Master-Ausgangskette:
    //    masterGain → masterLimiter (transparenter Peak-Compressor) → limiterTrim → softClipper (tanh ab -2,8 dB) → destination
    this.softClipper = rawCtx.createWaveShaper();
    this.softClipper.curve = createSoftClipperCurve(4096);
    this.softClipper.oversample = "none";
    this.softClipper.connect(rawCtx.destination);

    this.limiterTrim = rawCtx.createGain();
    this.limiterTrim.gain.value = Math.pow(10, -2.0 / 20);
    this.limiterTrim.connect(this.softClipper);

    this.masterLimiter = rawCtx.createDynamicsCompressor();
    this.masterLimiter.threshold.value = -8;
    this.masterLimiter.knee.value = 8;
    this.masterLimiter.ratio.value = 10;
    this.masterLimiter.attack.value = 0.003;
    this.masterLimiter.release.value = 0.18;
    this.masterLimiter.connect(this.limiterTrim);

    this.masterLevel = Number.isFinite(initialMaster) ? initialMaster : 0.67;
    this.masterMuted = Boolean(initialMuted);
    this.masterGain = rawCtx.createGain();
    this.masterGain.gain.value = this.masterMuted ? 0 : this.masterLevel * 0.48;
    this.masterGain.connect(this.masterLimiter);

    // Gemeinsamer Summenbus für die 6 Mixer-Spuren (automatischer Headroom bei Mehrspur-Mix)
    this.stemMixCompGain = rawCtx.createGain();
    this.stemMixCompGain.gain.value = 1.0;
    this.stemMixCompGain.connect(this.masterGain);

    // 2. Schlanker, synchron generierter Faltungshall (0 OfflineAudioContext, 0 Freeverb, kein 7,5×-Boost)
    const initPianoProf = PIANO_CHARACTER_PROFILES[this.pianoCharacter] || PIANO_CHARACTER_PROFILES.natural;
    const initPianoMix = Number.isFinite(this.instrumentReverbMix?.piano)
      ? Math.max(0, Math.min(1, this.instrumentReverbMix.piano))
      : (Number.isFinite(this.pianoReverbMix) ? Math.max(0, Math.min(1, this.pianoReverbMix)) : initPianoProf.defaultReverb);

    this.pianoReverbReturn = rawCtx.createGain();
    this.pianoReverbReturn.gain.value = this.hasAnyActiveReverb() ? 0.55 : 0;
    this.pianoReverbReturn.connect(this.masterGain);

    this.pianoReverbDamp = rawCtx.createBiquadFilter();
    this.pianoReverbDamp.type = "lowpass";
    this.pianoReverbDamp.frequency.value = initPianoProf.reverbDampHz;
    this.pianoReverbDamp.Q.value = 0.7;

    this.stemReverbBusGain = rawCtx.createGain();
    this.stemReverbBusGain.gain.value = 1.0;
    this.stemReverbBusGain.connect(this.pianoReverbDamp);

    // Dezente Stereo-Erstreflexionen (sehr leichtgewichtig)
    try {
      const earlyTapL = rawCtx.createDelay(0.06);
      earlyTapL.delayTime.value = 0.017;
      const earlyGainL = rawCtx.createGain();
      earlyGainL.gain.value = 0.16;
      const earlyTapR = rawCtx.createDelay(0.06);
      earlyTapR.delayTime.value = 0.026;
      const earlyGainR = rawCtx.createGain();
      earlyGainR.gain.value = 0.16;

      if (typeof rawCtx.createStereoPanner === "function") {
        const panL = rawCtx.createStereoPanner();
        panL.pan.value = -0.55;
        const panR = rawCtx.createStereoPanner();
        panR.pan.value = 0.55;
        this.pianoReverbDamp.connect(earlyTapL);
        earlyTapL.connect(panL);
        panL.connect(earlyGainL);
        earlyGainL.connect(this.pianoReverbReturn);

        this.pianoReverbDamp.connect(earlyTapR);
        earlyTapR.connect(panR);
        panR.connect(earlyGainR);
        earlyGainR.connect(this.pianoReverbReturn);
      } else {
        this.pianoReverbDamp.connect(earlyTapL);
        earlyTapL.connect(earlyGainL);
        earlyGainL.connect(this.pianoReverbReturn);
      }
    } catch (_) {}

    // Native ConvolverNode mit synchron berechneter, kurzer & warmer IR
    if (typeof rawCtx.createConvolver === "function") {
      try {
        this.pianoReverb = rawCtx.createConvolver();
        this.pianoReverb.normalize = false;
        this.pianoReverb.buffer = buildNativeReverbIR(
          rawCtx,
          this.liteReverb ? 1.15 : 1.65,
          initPianoProf.reverbDampHz
        );
        this.pianoReverbDamp.connect(this.pianoReverb);
        this.pianoReverb.connect(this.pianoReverbReturn);
      } catch (_) {}
    }

    // 3. Die 6 Instrumenten-Stems + schlanke native Fallback-Synths
    const levels = initialMixer || {
      piano: 0.90,
      guitar: 0.00,
      strings: 0.00,
      brass: 0.00,
      voice: 0.00,
      bass: 0.00
    };
    Object.keys(SAMPLED_STEM_CONFIG).forEach(k => {
      const lv = Number(levels[k]);
      this.stemLevels[k] = Number.isFinite(lv) ? Math.max(0, Math.min(1, lv)) : 0;
    });

    const voiceHooks = {
      onVoiceStart: (v) => this.registerVoice(v),
      onVoiceEnd: (v) => this.unregisterVoice(v)
    };

    const wireStemBus = (stemKey) => {
      const gainNode = rawCtx.createGain();
      gainNode.gain.value = this.stemLevels[stemKey] * this.stemGainMultipliers[stemKey];
      gainNode.connect(this.stemMixCompGain);

      const stemMix = Number.isFinite(this.instrumentReverbMix?.[stemKey])
        ? Math.max(0, Math.min(1, this.instrumentReverbMix[stemKey]))
        : initPianoMix;
      const sendNode = rawCtx.createGain();
      sendNode.gain.value = stemMix;
      sendNode.connect(this.stemReverbBusGain);
      gainNode.connect(sendNode);

      this[`${stemKey}Gain`] = gainNode;
      this.stemReverbSends[stemKey] = sendNode;
      if (stemKey === "piano") this.pianoReverbSend = sendNode;
      return gainNode;
    };

    // 1. Klavier
    const pianoGain = wireStemBus("piano");
    this.pianoToneFilter = rawCtx.createBiquadFilter();
    this.pianoToneFilter.type = "lowpass";
    this.pianoToneFilter.frequency.value = initPianoProf.filterHz;
    this.pianoToneFilter.Q.value = 0.7;
    this.pianoToneFilter.connect(pianoGain);
    this.pianoFallbackSynth = new EarLabNativeSynth(rawCtx, this.pianoToneFilter, {
      oscType: "triangle", filterHz: 3200, attack: 0.006, decay: 1.2, sustain: 0.25, release: 0.85, baseGain: 0.36, maxPolyphony: 12, ...voiceHooks
    });
    this.piano = this.pianoFallbackSynth;

    // 2. Gitarre
    const guitarGain = wireStemBus("guitar");
    this.guitarFallbackSynth = new EarLabNativeSynth(rawCtx, guitarGain, {
      oscType: "triangle", filterHz: 2600, attack: 0.008, decay: 0.85, sustain: 0.20, release: 0.75, baseGain: 0.34, maxPolyphony: 10, ...voiceHooks
    });
    this.guitar = this.guitarFallbackSynth;

    // 3. Streicher
    const stringsGain = wireStemBus("strings");
    this.stringsFallbackSynth = new EarLabNativeSynth(rawCtx, stringsGain, {
      oscType: "sawtooth", filterHz: 1850, attack: 0.20, decay: 0.35, sustain: 0.78, release: 0.85, baseGain: 0.22, detuneSpread: 5, maxPolyphony: 10, ...voiceHooks
    });
    this.strings = this.stringsFallbackSynth;

    // 4. Bläser
    const brassGain = wireStemBus("brass");
    this.brassFallbackSynth = new EarLabNativeSynth(rawCtx, brassGain, {
      oscType: "sawtooth", filterHz: 2100, attack: 0.055, decay: 0.25, sustain: 0.65, release: 0.55, baseGain: 0.24, maxPolyphony: 10, ...voiceHooks
    });
    this.brass = this.brassFallbackSynth;

    // 5. Stimme (Chor)
    const voiceGain = wireStemBus("voice");
    this.voiceFallbackSynth = new EarLabNativeSynth(rawCtx, voiceGain, {
      oscType: "triangle", filterHz: 1900, attack: 0.14, decay: 0.22, sustain: 0.80, release: 0.60, baseGain: 0.30, detuneSpread: 4, maxPolyphony: 10, ...voiceHooks
    });
    this.voice = this.voiceFallbackSynth;

    // 6. Bass
    const bassGain = wireStemBus("bass");
    this.bassFallbackSynth = new EarLabNativeSynth(rawCtx, bassGain, {
      oscType: "triangle", filterHz: 420, attack: 0.008, decay: 0.50, sustain: 0.45, release: 0.35, baseGain: 0.44, monophonic: true, maxPolyphony: 2, ...voiceHooks
    });
    this.bass = this.bassFallbackSynth;

    this.updateMultiStemCompensation(0);
    this.graphBuilt = true;
    this.isInitialized = true;
    return true;
  }

  async prepareAudioGraph(initialMaster = 0.67, initialMuted = false, initialMixer = null) {
    if (this.preparePromise) return this.preparePromise;

    const levels = initialMixer || {
      piano: 0.90,
      guitar: 0.00,
      strings: 0.00,
      brass: 0.00,
      voice: 0.00,
      bass: 0.00
    };

    try {
      this.buildAudioGraphSync(initialMaster, initialMuted, levels);
    } catch (err) {
      this.graphBuilt = false;
      this.isInitialized = false;
      throw err;
    }

    this.preparePromise = (async () => {
      try {
        await this.loadSampledPacks(levels);
        this.setPianoSoundProfile(this.pianoCharacter, this.instrumentReverbMix);
        this.samplesLoaded = true;
        return true;
      } catch (err) {
        console.warn("Audio-Vorbereitung mit Synth-Fallback abgeschlossen:", err);
        return true;
      }
    })();

    return this.preparePromise;
  }

  /**
   * Startet Audiopuffer-Vorladen direkt beim App-Start ohne auf den ersten Klick zu warten.
   */
  preload(initialMaster = 0.67, initialMuted = false, initialMixer = null) {
    return this.prepareAudioGraph(initialMaster, initialMuted, initialMixer).catch(() => false);
  }

  async init(initialMaster = 0.67, initialMuted = false, initialMixer = null) {
    // 1. User-Geste & iOS-AudioSession synchron vor jedem await erfassen
    const rawCtx = this.unlockAudioSessionSync();

    // 2. Audio-Graph synchron aufbauen -> Fallback-Synths sind sofort spielbereit
    try {
      this.buildAudioGraphSync(initialMaster, initialMuted, initialMixer);
    } catch (err) {
      console.warn("Audio-Graph konnte nicht aufgebaut werden:", err);
      return false;
    }

    // 3. Sample-Packs im Hintergrund starten (idempotent)
    if (!this.preparePromise) {
      this.prepareAudioGraph(initialMaster, initialMuted, initialMixer).catch(() => {});
    }

    // 4. Context-Resume mit kurzem Timeout abwarten
    if (rawCtx && rawCtx.state !== "running" && typeof rawCtx.resume === "function") {
      await Promise.race([
        Promise.resolve(rawCtx.resume()).catch(() => {}),
        new Promise(resolve => setTimeout(resolve, 260))
      ]);
    }

    // 5. Welle 1 (Klavier, Perkussion, Stimme & aktive Stems) kurz abwarten
    if (!this.wave1SamplesReady && this.wave1SamplesPromise) {
      await Promise.race([
        this.wave1SamplesPromise.catch(() => {}),
        new Promise(resolve => setTimeout(resolve, 1600))
      ]);
    }

    this.setMasterVolume(initialMaster, initialMuted);
    if (initialMixer) this.setMixerGains(initialMixer);
    this.isInitialized = true;
    return true;
  }

  base64ToArrayBuffer(b64) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    return bytes.buffer;
  }

  decodeAudioBufferCompat(arrayBuffer, timeoutMs = 5000) {
    const rawCtx = this.getRawAudioContext();
    if (!rawCtx || typeof rawCtx.decodeAudioData !== "function") {
      return Promise.reject(new Error("WebAudio decodeAudioData unavailable"));
    }
    return new Promise((resolve, reject) => {
      let settled = false;
      const timerId = setTimeout(() => {
        if (!settled) {
          settled = true;
          reject(new Error("WebAudio decodeAudioData timeout"));
        }
      }, timeoutMs);
      const onOk = (buf) => {
        if (!settled) {
          settled = true;
          clearTimeout(timerId);
          resolve(buf);
        }
      };
      const onErr = (err) => {
        if (!settled) {
          settled = true;
          clearTimeout(timerId);
          reject(err);
        }
      };
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
   * Ermittelt ggf. browserseitig belassene AAC/MP4-Encoder-Vorlaufstille (> 3 ms)
   * als reinen Start-Offset (Zero-Copy, keine doppelte AudioBuffer-Allokation im RAM!).
   */
  findLeadingSilenceOffsetSec(audioBuffer, thresholdDb = -62, prePadMs = 1.0) {
    if (!audioBuffer || !audioBuffer.sampleRate || !audioBuffer.length) return 0;
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
      return 0;
    }
    return Math.min(audioBuffer.duration - 0.05, trimStart / sr);
  }

  normalizeSamplerNoteKey(noteName) {
    const flatToSharp = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };
    return String(noteName).replace(/^([A-G]b)(\d)$/, (_, pc, oct) => `${flatToSharp[pc] || pc}${oct}`);
  }

  yieldToMainThread(ms = 6) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Wartet für Welle-2-Hintergrund-Decoding kurz ab, falls gerade aktiv Töne laufen,
   * damit Base64-Parsing und MediaCodec niemals laufendes Audio ins Stottern bringen.
   */
  async waitForPlaybackBreath(maxWaitMs = 1200) {
    const started = Date.now();
    while (this.globalVoices.length > 0 && Date.now() - started < maxWaitMs) {
      await this.yieldToMainThread(90);
    }
  }

  async decodeSamplePackBuffers(pack, normalizeNoteKeys = true, isBackgroundWave = false) {
    const rawCtx = this.getRawAudioContext();
    if (!pack || !pack.notes || !rawCtx || typeof rawCtx.createBufferSource !== "function") return null;

    const entries = Object.entries(pack.notes);
    if (entries.length === 0) return null;

    // Begrenzte Parallelität schützt Android-MediaCodec- & iOS-AAC-Decoder-Pools vor Überlastung
    const isConstrained = this.liteReverb;
    const concurrency = isBackgroundWave ? 1 : (isConstrained ? 2 : 3);
    const yieldMs = isBackgroundWave ? 14 : (isConstrained ? 8 : 2);
    const bufferMap = {};
    let cursor = 0;

    const worker = async () => {
      while (cursor < entries.length) {
        if (isBackgroundWave && this.globalVoices.length > 0) {
          await this.waitForPlaybackBreath(1000);
        }
        const idx = cursor++;
        if (idx >= entries.length) break;
        const [key, b64] = entries[idx];
        const arrBuf = this.base64ToArrayBuffer(b64);
        const decoded = await this.decodeAudioBufferCompat(arrBuf);
        const trimOffsetSec = this.findLeadingSilenceOffsetSec(decoded);
        const outKey = normalizeNoteKeys ? this.normalizeSamplerNoteKey(key) : key;
        bufferMap[outKey] = { buffer: decoded, trimOffsetSec };
        if (yieldMs > 0) await this.yieldToMainThread(yieldMs);
      }
    };

    const workers = [];
    const workerCount = Math.min(concurrency, entries.length);
    for (let i = 0; i < workerCount; i++) {
      workers.push(worker());
    }
    await Promise.all(workers);

    return { bufferMap, rawCtx };
  }

  async initSampledInstrument(pack, targetNode, samplerOpts = {}, isBackgroundWave = false) {
    const decoded = await this.decodeSamplePackBuffers(pack, true, isBackgroundWave);
    if (!decoded) return null;

    const sampler = new EarLabSampledInstrument(decoded.bufferMap, targetNode, {
      rawCtx: decoded.rawCtx,
      attackSec: samplerOpts.attackSec ?? 0.004,
      legatoAttackSec: samplerOpts.legatoAttackSec,
      legatoStartSkipSec: samplerOpts.legatoStartSkipSec,
      releaseSec: samplerOpts.releaseSec ?? 0.60,
      legatoOverlapSec: samplerOpts.legatoOverlapSec,
      chordCrossfadeSec: samplerOpts.chordCrossfadeSec,
      melodyCrossfadeSec: samplerOpts.melodyCrossfadeSec,
      chordSpreadMs: samplerOpts.chordSpreadMs,
      noteJitterMs: samplerOpts.noteJitterMs,
      chordRollMode: samplerOpts.chordRollMode,
      maxPolyphony: samplerOpts.maxPolyphony ?? 16,
      getSoundProfile: samplerOpts.getSoundProfile,
      velocityLayerStore: samplerOpts.velocityLayerStore || null,
      onVoiceStart: (v) => this.registerVoice(v),
      onVoiceEnd: (v) => this.unregisterVoice(v)
    });

    return { sampler, bufferMap: decoded.bufferMap, rawCtx: decoded.rawCtx };
  }

  getActivePianoProfile() {
    return PIANO_CHARACTER_PROFILES[this.pianoCharacter] || PIANO_CHARACTER_PROFILES.natural;
  }

  loadSingleSampledStem(stemKey, cfg, packs, levelMap, isBackgroundWave = false) {
    if (!packs?.[stemKey]) return Promise.resolve();
    if (this.sampledStems[stemKey]) return Promise.resolve();
    if (this.stemLoadingPromises[stemKey]) return this.stemLoadingPromises[stemKey];

    const gainNode = this[`${stemKey}Gain`];
    const rawCtx = this.getRawAudioContext();
    if (!gainNode || !rawCtx) return Promise.resolve();

    const isPiano = stemKey === "piano";
    const stemTargetNode = (isPiano && this.pianoToneFilter) ? this.pianoToneFilter : gainNode;
    const pianoProfGetter = isPiano ? () => this.getActivePianoProfile() : null;
    const velocityLayerStore = this.createVelocityLayerStore(stemKey, packs[stemKey]);

    const promise = (async () => {
      try {
        const decoded = await this.initSampledInstrument(packs[stemKey], stemTargetNode, {
          attackSec: cfg.attackSec,
          legatoAttackSec: cfg.legatoAttackSec,
          legatoStartSkipSec: cfg.legatoStartSkipSec,
          releaseSec: cfg.releaseSec,
          legatoOverlapSec: cfg.legatoOverlapSec,
          chordCrossfadeSec: cfg.chordCrossfadeSec,
          melodyCrossfadeSec: cfg.melodyCrossfadeSec,
          chordSpreadMs: cfg.chordSpreadMs,
          noteJitterMs: cfg.noteJitterMs,
          chordRollMode: cfg.chordRollMode,
          maxPolyphony: cfg.maxPolyphony,
          getSoundProfile: pianoProfGetter,
          velocityLayerStore
        }, isBackgroundWave);
        if (!decoded) return;

        // Evtl. noch klingende Fallback-Synth-Stimmen weich verabschieden
        this[`${stemKey}FallbackSynth`]?.releaseAll?.();

        this[stemKey] = decoded.sampler;
        this.sampledStems[stemKey] = true;
        this.stemGainMultipliers[stemKey] = cfg.sampledMult;

        const currentLevel = Number.isFinite(this.stemLevels[stemKey])
          ? this.stemLevels[stemKey]
          : (Number.isFinite(levelMap?.[stemKey]) ? levelMap[stemKey] : 0);
        smoothSetAudioParam(gainNode.gain, currentLevel * cfg.sampledMult, rawCtx, 0.04);
        this.updateMultiStemCompensation(0.04);

        // Separater Demo-Bus für Instrumentenkunde/Theorie-Beispiele (teilt dieselben AudioBuffer im RAM)
        const demoGain = rawCtx.createGain();
        demoGain.gain.value = cfg.demoGain;
        demoGain.connect(this.masterGain);

        const initDemoReverbMix = this.instrumentReverbMix?.[stemKey] ?? (isPiano ? this.pianoReverbMix : 0.22);
        if (this.pianoReverbDamp) {
          const demoSend = rawCtx.createGain();
          demoSend.gain.value = initDemoReverbMix;
          demoSend.connect(this.pianoReverbDamp);
          this.demoReverbSends[stemKey] = demoSend;
          demoGain.connect(demoSend);
        }

        let demoTarget = demoGain;
        if (isPiano) {
          this.demoPianoToneFilter = rawCtx.createBiquadFilter();
          this.demoPianoToneFilter.type = "lowpass";
          this.demoPianoToneFilter.frequency.value = this.getActivePianoProfile().filterHz;
          this.demoPianoToneFilter.Q.value = 0.7;
          this.demoPianoToneFilter.connect(demoGain);
          demoTarget = this.demoPianoToneFilter;
        }

        const demoSampler = new EarLabSampledInstrument(decoded.bufferMap, demoTarget, {
          rawCtx: decoded.rawCtx,
          attackSec: cfg.attackSec,
          legatoAttackSec: cfg.legatoAttackSec,
          legatoStartSkipSec: cfg.legatoStartSkipSec,
          releaseSec: cfg.releaseSec,
          legatoOverlapSec: cfg.legatoOverlapSec,
          chordCrossfadeSec: cfg.chordCrossfadeSec,
          melodyCrossfadeSec: cfg.melodyCrossfadeSec,
          chordSpreadMs: cfg.chordSpreadMs,
          noteJitterMs: cfg.noteJitterMs,
          chordRollMode: cfg.chordRollMode,
          maxPolyphony: cfg.maxPolyphony,
          getSoundProfile: pianoProfGetter,
          velocityLayerStore,
          onVoiceStart: (v) => this.registerVoice(v),
          onVoiceEnd: (v) => this.unregisterVoice(v)
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
      } finally {
        delete this.stemLoadingPromises[stemKey];
      }
    })();

    this.stemLoadingPromises[stemKey] = promise;
    return promise;
  }

  /**
   * Velocity-Layer eines Sample-Packs (pack.velocityLayers = { p: { maxDynamic, notes }, f: { minDynamic, notes } }).
   * Die Layer werden erst beim ersten Bedarf schonend decodiert (spart RAM, solange keine Übung Dynamik vorgibt);
   * bis dahin liefert pick() null und der Sampler spielt den Hauptlayer.
   */
  createVelocityLayerStore(stemKey, pack) {
    const defs = pack?.velocityLayers;
    if (!defs || typeof defs !== "object") return null;
    const engine = this;
    const store = {
      samples: {},
      loading: {},
      pick(dynamic) {
        const name = Object.keys(defs).find(key => {
          const def = defs[key] || {};
          if (Number.isFinite(def.maxDynamic) && dynamic <= def.maxDynamic) return true;
          if (Number.isFinite(def.minDynamic) && dynamic >= def.minDynamic) return true;
          return false;
        });
        if (!name) return null;
        if (store.samples[name]) return store.samples[name];
        if (!store.loading[name]) {
          store.loading[name] = engine.decodeSamplePackBuffers({ notes: defs[name].notes || {} }, true, true)
            .then(decoded => {
              const list = decoded ? EarLabSampledInstrument.buildSampleList(decoded.bufferMap) : [];
              if (list.length > 0) store.samples[name] = list;
            })
            .catch(err => {
              console.warn(`Velocity-Layer "${stemKey}/${name}" konnte nicht decodiert werden:`, err);
            });
        }
        return null;
      }
    };
    return store;
  }

  prioritizeStemDecode(stemKey) {
    if (!stemKey || this.sampledStems[stemKey] || this.stemLoadingPromises[stemKey]) return;
    const packs = typeof window !== "undefined" ? window.EARLAB_SAMPLE_PACKS : null;
    const cfg = SAMPLED_STEM_CONFIG[stemKey];
    if (!packs?.[stemKey] || !cfg) return;
    this.loadSingleSampledStem(stemKey, cfg, packs, this.stemLevels, false).catch(() => {});
  }

  async loadSampledPacks(initialLevels = {}) {
    const levelMap = typeof initialLevels === "number"
      ? { piano: initialLevels }
      : (initialLevels || {});
    try {
      const packs = typeof window !== "undefined" ? window.EARLAB_SAMPLE_PACKS : null;
      if (!packs) {
        this.wave1SamplesReady = true;
        return;
      }

      const allEntries = Object.entries(SAMPLED_STEM_CONFIG);
      const prioritySet = new Set(["piano"]);
      allEntries.forEach(([stemKey]) => {
        if ((levelMap[stemKey] || 0) > 0.005) prioritySet.add(stemKey);
      });

      const loadPercussionPack = async () => {
        if (!packs.percussion || this.percUsingSamples) return;
        try {
          const decodedPerc = await this.decodeSamplePackBuffers(packs.percussion, false, false);
          if (decodedPerc && Object.keys(decodedPerc.bufferMap).length > 0) {
            this.percSampleRawCtx = decodedPerc.rawCtx;
            this.percSampleGain = decodedPerc.rawCtx.createGain();
            this.percSampleGain.gain.value = 1.0;
            this.percSampleGain.connect(this.masterGain);
            this.percSamples = decodedPerc.bufferMap;
            this.percUsingSamples = true;
          }
        } catch (percErr) {
          console.warn("Percussion-Sample-Pack konnte nicht decodiert werden, nutze Synth-Fallback:", percErr);
          this.percSamples = {};
          this.percUsingSamples = false;
        }
      };

      const priorityEntries = allEntries.filter(([stemKey]) => prioritySet.has(stemKey));
      const wave2Entries = allEntries.filter(([stemKey]) => !prioritySet.has(stemKey));

      // Welle 1 (Klavier, Perkussion & aktuell aktive Mixer-Stems) seriell pro Pack laden,
      // damit Android- & iOS-Hardware-Decoder nie überlastet werden.
      const runWave1 = async () => {
        const pianoEntry = priorityEntries.find(([k]) => k === "piano");
        if (pianoEntry) {
          await this.loadSingleSampledStem(pianoEntry[0], pianoEntry[1], packs, levelMap, false);
        }
        await loadPercussionPack();
        for (const [stemKey, cfg] of priorityEntries) {
          if (stemKey === "piano") continue;
          await this.loadSingleSampledStem(stemKey, cfg, packs, levelMap, false);
        }
        this.wave1SamplesReady = true;
      };

      this.wave1SamplesPromise = runWave1().catch(() => {
        this.wave1SamplesReady = true;
      });
      await this.wave1SamplesPromise;

      // Welle 2 (inaktive Orchester-/Band-Stems) extrem schonend im Hintergrund (pausiert während Wiedergabe)
      for (const [stemKey, cfg] of wave2Entries) {
        if (this.sampledStems[stemKey]) continue;
        await this.waitForPlaybackBreath(1400);
        await this.loadSingleSampledStem(stemKey, cfg, packs, levelMap, true);
      }
    } catch (err) {
      this.wave1SamplesReady = true;
      console.warn("Sample-Packs konnten nicht geladen werden, nutze Synth-Fallback:", err);
    }
  }

  setMasterVolume(val, isMuted) {
    this.masterLevel = Number.isFinite(Number(val)) ? Math.max(0, Math.min(1, Number(val))) : this.masterLevel;
    this.masterMuted = Boolean(isMuted);
    if ((!this.isInitialized && !this.graphBuilt) || !this.masterGain) return;
    const target = this.masterMuted ? 0 : this.masterLevel * 0.48;
    smoothSetAudioParam(this.masterGain.gain, target, this.rawCtx, 0.04);
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
    smoothSetAudioParam(this.stemReverbSends?.[key]?.gain, mix, this.rawCtx, 0.05);
    smoothSetAudioParam(this.demoReverbSends?.[key]?.gain, mix, this.rawCtx, 0.05);
    this.syncReverbReturnState();
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

    if (!this.isInitialized && !this.graphBuilt) return;
    this.setAllInstrumentReverbs(this.instrumentReverbMix);
    smoothSetAudioParam(this.pianoToneFilter?.frequency, prof.filterHz, this.rawCtx, 0.04);
    smoothSetAudioParam(this.demoPianoToneFilter?.frequency, prof.filterHz, this.rawCtx, 0.04);
    smoothSetAudioParam(this.pianoReverbDamp?.frequency, prof.reverbDampHz, this.rawCtx, 0.04);
    if (this.pianoFallbackSynth) {
      this.pianoFallbackSynth.release = prof.releaseSec + 0.35;
    }
  }

  setDroneIntervalMix(padLevel = 0.60, toneLevel = 1.00) {
    const padNum = Number(padLevel);
    const toneNum = Number(toneLevel);
    if (Number.isFinite(padNum)) this.dronePadGainScale = Math.max(0, Math.min(1, padNum));
    if (Number.isFinite(toneNum)) this.droneToneGainScale = Math.max(0, Math.min(1, toneNum));
  }

  setMixerGains(levels) {
    if (!levels) return;
    Object.keys(SAMPLED_STEM_CONFIG).forEach(stemKey => {
      const rawLevel = levels[stemKey];
      const level = Number.isFinite(rawLevel) ? Math.max(0, Math.min(1, rawLevel)) : (stemKey === "voice" ? 0 : undefined);
      if (Number.isFinite(level)) {
        this.stemLevels[stemKey] = level;
        const gainNode = this[`${stemKey}Gain`];
        if ((this.isInitialized || this.graphBuilt) && gainNode?.gain) {
          smoothSetAudioParam(gainNode.gain, level * this.stemGainMultipliers[stemKey], this.rawCtx, 0.04);
        }
        // Wird ein noch nicht fertig geladener Stem aufgedreht, sofort bevorzugt decodieren
        if (level > 0.005 && this.graphBuilt && !this.sampledStems[stemKey]) {
          this.prioritizeStemDecode(stemKey);
        }
      }
    });
    if (this.isInitialized || this.graphBuilt) {
      this.updateMultiStemCompensation(0.045);
    }
  }

  stopNoiseEntryNow(entry) {
    if (!entry || entry.stopped) return;
    entry.stopped = true;
    if (entry.autoStopTimer) {
      clearTimeout(entry.autoStopTimer);
      entry.autoStopTimer = null;
    }
    try {
      smoothSetAudioParam(entry.fadeGain?.gain, 0, this.rawCtx, 0.025);
      setTimeout(() => {
        try { entry.src?.stop?.(); } catch (_) {}
        [entry.src, entry.hpFilter, entry.lpFilter, entry.eqFilter, entry.fadeGain].forEach(n => {
          try { n?.disconnect?.(); } catch (_) {}
        });
      }, 90);
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
      smoothSetAudioParam(v.envGain?.gain, 0, v.rawCtx, 0.035);
      setTimeout(() => {
        v.stopNodes.forEach(osc => { try { osc.stop(); } catch (_) {} });
        v.cleanupNodes.forEach(node => { try { node.disconnect(); } catch (_) {} });
      }, 95);
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
        if (entry.nativeSynth) {
          // Knacksfrei ausblenden statt hartem .dispose()!
          entry.nativeSynth.releaseAll();
          setTimeout(() => {
            try { entry.gain?.disconnect?.(); } catch (_) {}
            try { entry.filter?.disconnect?.(); } catch (_) {}
          }, 120);
          return;
        }
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
    if (!this.isInitialized || !this.masterGain || !this.rawCtx) return null;
    if (!this.prodSafetyLimiter) {
      const comp = this.rawCtx.createDynamicsCompressor();
      comp.threshold.value = -14;
      comp.knee.value = 3;
      comp.ratio.value = 18;
      comp.attack.value = 0.002;
      comp.release.value = 0.14;
      comp.connect(this.masterGain);
      this.prodSafetyLimiter = comp;
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
    if (!this.isInitialized || !this.masterGain || !this.rawCtx) return;
    const dest = this.ensureProductionBus() || this.masterGain;
    const dur = Math.max(0.25, Math.min(4.0, Number(durationSec) || 1.35));
    const safeGain = this.getSafeSineGain(freqHz);

    const tempGain = this.rawCtx.createGain();
    tempGain.gain.value = safeGain;
    tempGain.connect(dest);

    const tempSynth = new EarLabNativeSynth(this.rawCtx, tempGain, {
      oscType: "sine",
      attack: 0.045,
      decay: 0.10,
      sustain: 0.85,
      release: 0.24,
      baseGain: 1.0,
      onVoiceStart: (v) => this.registerVoice(v),
      onVoiceEnd: (v) => this.unregisterVoice(v)
    });

    const entry = { nativeSynth: tempSynth, gain: tempGain };
    this.activeDemoNodes.push(entry);
    tempSynth.triggerAttackRelease([Number(freqHz) || 1000], dur, this.getAudioTime() + this.getScheduleLookaheadSec(), 1.0);

    setTimeout(() => {
      try { tempGain.disconnect(); } catch (_) {}
      this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== entry);
    }, (dur + 0.65) * 1000);
  }

  /**
   * Baut die bandbegrenzte Rosa-Rauschen-Signalkette mit parametrischer Peaking-EQ-Stufe auf.
   */
  createNoiseChain(dest, freqHz, qVal, initialGainDb) {
    const rawCtx = this.rawCtx;
    if (!this.pinkNoiseBuffer) {
      this.pinkNoiseBuffer = buildLoopedPinkNoiseBuffer(rawCtx, 4.0);
    }
    const fadeGain = rawCtx.createGain();
    fadeGain.gain.value = 0;
    fadeGain.connect(dest);

    const eqFilter = rawCtx.createBiquadFilter();
    eqFilter.type = "peaking";
    eqFilter.frequency.value = freqHz;
    eqFilter.Q.value = qVal;
    eqFilter.gain.value = initialGainDb;
    eqFilter.connect(fadeGain);

    const lpFilter = rawCtx.createBiquadFilter();
    lpFilter.type = "lowpass";
    lpFilter.frequency.value = 15000;
    lpFilter.connect(eqFilter);

    const hpFilter = rawCtx.createBiquadFilter();
    hpFilter.type = "highpass";
    hpFilter.frequency.value = 28;
    hpFilter.connect(lpFilter);

    const src = rawCtx.createBufferSource();
    src.buffer = this.pinkNoiseBuffer;
    src.loop = true;
    src.connect(hpFilter);

    return { noise: true, src, hpFilter, lpFilter, eqFilter, fadeGain, stopped: false };
  }

  /**
   * Startet dauerhaftes Rosa Rauschen (Pink Noise) mit aktiver EQ-Anhebung bis zum Treffer oder Stopp.
   */
  startProductionNoiseContinuous(options = {}) {
    if (!this.isInitialized || !this.masterGain || !this.rawCtx) return false;
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

    const baseNoiseGain = 0.14;
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

    const startAt = this.getAudioTime() + 0.02;
    const targetGain = startBypassed ? baseNoiseGain : (baseNoiseGain * makeup);
    session.fadeGain.gain.setValueAtTime(0.0001, startAt);
    session.fadeGain.gain.linearRampToValueAtTime(targetGain, startAt + 0.09);
    session.src.start(startAt);

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
    if (!s || !this.rawCtx) return false;
    const bypass = Boolean(isBypassed);
    s.bypassed = bypass;
    smoothSetAudioParam(s.eqFilter?.gain, bypass ? 0 : s.gainDb, this.rawCtx, 0.055);
    smoothSetAudioParam(s.fadeGain?.gain, bypass ? s.baseNoiseGain : (s.baseNoiseGain * s.makeup), this.rawCtx, 0.055);
    return true;
  }

  /**
   * Spielt Rosa Rauschen mit optionaler parametrischer Peaking-EQ-Anhebung (Flat → Boost / Boost-Only).
   */
  playProductionNoiseEQ(options = {}) {
    if (!this.isInitialized || !this.masterGain || !this.rawCtx) return;
    const dest = this.ensureProductionBus() || this.masterGain;

    const mode = options.mode || "ab-switch";
    const freqHz = Math.max(40, Math.min(14000, Number(options.freqHz) || 1000));
    const qVal = Math.max(0.7, Math.min(6.0, Number(options.q) || 2.0));
    const gainDb = Math.max(-12, Math.min(11, Number(options.gainDb) ?? 9));
    const flatDur = Math.max(0.35, Math.min(2.5, Number(options.flatDurationSec) || 0.85));
    const boostDur = Math.max(0.45, Math.min(3.5, Number(options.boostDurationSec) || 1.65));
    const singleDur = Math.max(0.35, Math.min(3.5, Number(options.durationSec) || 1.35));
    const totalDur = mode === "ab-switch" ? (flatDur + boostDur) : singleDur;

    const baseNoiseGain = 0.155;
    const defaultMakeup = Math.max(0.68, Math.min(0.88, 1 - gainDb * 0.024));
    const makeup = Number.isFinite(options.makeupGain)
      ? Math.max(0.55, Math.min(1, options.makeupGain))
      : defaultMakeup;

    const entry = this.createNoiseChain(dest, freqHz, qVal, mode === "boost-only" ? gainDb : 0);
    const { src, eqFilter, fadeGain } = entry;
    this.activeDemoNodes.push(entry);

    const startAt = this.getAudioTime() + 0.025;
    const fadeInSec = 0.085;
    const fadeOutSec = 0.13;
    const startGain = mode === "boost-only" ? (baseNoiseGain * makeup) : baseNoiseGain;

    fadeGain.gain.setValueAtTime(0.0001, startAt);
    fadeGain.gain.linearRampToValueAtTime(startGain, startAt + fadeInSec);

    if (mode === "ab-switch") {
      const switchAt = startAt + flatDur;
      eqFilter.gain.setValueAtTime(0, switchAt);
      eqFilter.gain.linearRampToValueAtTime(gainDb, switchAt + 0.055);
      fadeGain.gain.setValueAtTime(baseNoiseGain, switchAt);
      fadeGain.gain.linearRampToValueAtTime(baseNoiseGain * makeup, switchAt + 0.055);
    }

    const fadeOutAt = startAt + Math.max(fadeInSec + 0.05, totalDur - fadeOutSec);
    fadeGain.gain.setValueAtTime(mode === "flat-only" ? baseNoiseGain : (baseNoiseGain * makeup), fadeOutAt);
    fadeGain.gain.linearRampToValueAtTime(0, startAt + totalDur);

    src.start(startAt);
    src.stop(startAt + totalDur + 0.04);

    setTimeout(() => {
      if (!entry.stopped) {
        entry.stopped = true;
        [entry.src, entry.hpFilter, entry.lpFilter, entry.eqFilter, entry.fadeGain].forEach(n => {
          try { n?.disconnect?.(); } catch (_) {}
        });
      }
      this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== entry);
    }, (totalDur + 0.45) * 1000);
  }

  /**
   * Spielt exakte Frequenzen in Hz mit wählbarer Wellenform über den Master-Bus ab
   * (z. B. für Wellenform-, Schwebungs- und Stimmungs-Experimente im Wissensbereich).
   */
  playFrequencies(freqs, durationSec = 1.6, oscType = "sine", level = 0.28) {
    if (!this.isInitialized || !this.masterGain || !this.rawCtx || !freqs || freqs.length === 0) return;
    const dur = Math.max(0.25, durationSec);
    const wave = oscType || "sine";
    // Psychoakustische Lautheits-Angleichung (Fletcher-Munson): obertonreiche Sägezahn-/Rechteckwellen
    // besitzen im empfindlichen 1–5-kHz-Bereich ein Vielfaches der gefühlten Lautheit einer Sinuswelle.
    const waveLoudnessScale = wave === "sawtooth"
      ? 0.28
      : (wave === "square" ? 0.24 : (wave === "triangle" ? 0.88 : 1.0));
    const filterHz = (wave === "sawtooth" || wave === "square") ? 3200 : 0;
    const voiceLevel = (level * waveLoudnessScale) / Math.sqrt(freqs.length);

    const tempGain = this.rawCtx.createGain();
    tempGain.gain.value = voiceLevel;
    tempGain.connect(this.masterGain);

    const tempSynth = new EarLabNativeSynth(this.rawCtx, tempGain, {
      oscType: wave,
      filterHz,
      attack: 0.03,
      decay: 0.15,
      sustain: 0.80,
      release: 0.28,
      baseGain: 1.0,
      onVoiceStart: (v) => this.registerVoice(v),
      onVoiceEnd: (v) => this.unregisterVoice(v)
    });

    const entry = { nativeSynth: tempSynth, gain: tempGain };
    this.activeDemoNodes.push(entry);
    tempSynth.triggerAttackRelease(freqs, dur, this.getAudioTime() + this.getScheduleLookaheadSec(), 1.0);

    setTimeout(() => {
      try { tempGain.disconnect(); } catch (_) {}
      this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== entry);
    }, (dur + 0.65) * 1000);
  }

  /**
   * Spielt eine isolierte Instrumenten- oder Gesangsklangprobe direkt über den Master-Bus ab
   * (unabhängig davon, wie die 6 Mixer-Fader der Übung gerade stehen).
   */
  playInstrumentSample(style, notes, durationSec = 1.35, arpeggioStepMs = 0, gainScale = 1.0, envOverride = null) {
    if (!this.isInitialized || !this.masterGain || !this.rawCtx || !notes || notes.length === 0) return;
    if (Number.isFinite(gainScale) && gainScale <= 0) return;

    const safeGainScale = Math.max(0.01, Math.min(1.25, Number.isFinite(gainScale) ? gainScale : 1.0));
    const demoSampler = this.demoSamplers[style] || (style === "piano" ? this.demoPiano : null);
    if (demoSampler) {
      const isSeq = arpeggioStepMs > 0 && notes.length > 1;
      const stepDur = Math.max(0.2, durationSec);
      const totalWindowSec = isSeq ? ((notes.length - 1) * arpeggioStepMs) / 1000 + stepDur : stepDur;
      const samplerNotes = isSeq ? notes : [...new Set(notes)];
      const baseVel = isSeq ? 0.92 : Math.min(1, 1.05 / Math.sqrt(samplerNotes.length));
      const vel = Math.min(1, baseVel * Math.min(1, safeGainScale));
      const samplerEnv = safeGainScale > 1
        ? { ...(envOverride || {}), gainMult: (Number.isFinite(envOverride?.gainMult) ? envOverride.gainMult : 1) * safeGainScale }
        : envOverride;
      const entry = { demoSampler };
      this.activeDemoNodes.push(entry);

      const nowAt = this.getAudioTime();
      const leadAt = this.getScheduleLookaheadSec();
      const reqAt = Number.isFinite(envOverride?.atTime) ? envOverride.atTime : (nowAt + leadAt);
      const baseAt = Math.max(nowAt + 0.018, reqAt > nowAt + 30 ? (nowAt + leadAt) : reqAt);
      if (isSeq) {
        samplerNotes.forEach((n, idx) => {
          const tNote = baseAt + (idx * arpeggioStepMs) / 1000;
          demoSampler.triggerAttackRelease(n, stepDur, tNote, vel, samplerEnv);
        });
      } else {
        demoSampler.triggerAttackRelease(samplerNotes, stepDur, baseAt, vel, samplerEnv);
      }

      setTimeout(() => {
        this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== entry);
      }, (totalWindowSec + 0.9) * 1000);
      return;
    }

    const PRESETS = {
      strings:     { osc: "sawtooth", filter: 1900, detune: 5, attack: 0.22, decay: 0.30, sustain: 0.82, release: 0.65, gain: 0.28 },
      pizzicato:   { osc: "triangle", filter: 2800, detune: 0, attack: 0.005, decay: 0.22, sustain: 0.02, release: 0.16, gain: 0.38 },
      brass:       { osc: "sawtooth", filter: 2100, detune: 3, attack: 0.055, decay: 0.20, sustain: 0.72, release: 0.35, gain: 0.24 },
      flute:       { osc: "sine",     filter: 0,    detune: 0, attack: 0.09, decay: 0.10, sustain: 0.85, release: 0.32, gain: 0.32 },
      reed:        { osc: "square",   filter: 1450, detune: 0, attack: 0.04, decay: 0.15, sustain: 0.78, release: 0.28, gain: 0.20 },
      piano:       { osc: "triangle", filter: 3200, detune: 0, attack: 0.006, decay: 1.15, sustain: 0.26, release: 0.75, gain: 0.34 },
      cembalo:     { osc: "sawtooth", filter: 3800, detune: 0, attack: 0.005, decay: 0.48, sustain: 0.04, release: 0.22, gain: 0.22 },
      organ:       { osc: "sawtooth", filter: 2000, detune: 4, attack: 0.015, decay: 0.10, sustain: 0.92, release: 0.18, gain: 0.20 },
      guitar:      { osc: "triangle", filter: 2600, detune: 0, attack: 0.008, decay: 0.82, sustain: 0.16, release: 0.55, gain: 0.34 },
      ebass:       { osc: "sawtooth", filter: 520,  detune: 0, attack: 0.01, decay: 0.48, sustain: 0.45, release: 0.32, gain: 0.42 },
      "synth-saw": { osc: "sawtooth", filter: 2900, detune: 5, attack: 0.02, decay: 0.22, sustain: 0.74, release: 0.38, gain: 0.22 },
      "synth-pad": { osc: "triangle", filter: 1600, detune: 6, attack: 0.34, decay: 0.30, sustain: 0.86, release: 0.85, gain: 0.28 },
      choir:       { osc: "triangle", filter: 1900, detune: 4, attack: 0.16, decay: 0.22, sustain: 0.82, release: 0.58, gain: 0.30 }
    };

    const cfg = PRESETS[style] || PRESETS.piano;
    const isSeq = arpeggioStepMs > 0 && notes.length > 1;
    const stepDur = Math.max(0.2, durationSec);
    const totalWindowSec = isSeq ? ((notes.length - 1) * arpeggioStepMs) / 1000 + stepDur : stepDur;

    const tempGain = this.rawCtx.createGain();
    tempGain.gain.value = safeGainScale;
    tempGain.connect(this.masterGain);

    const tempSynth = new EarLabNativeSynth(this.rawCtx, tempGain, {
      oscType: cfg.osc,
      filterHz: cfg.filter,
      detuneSpread: cfg.detune,
      attack: Number.isFinite(envOverride?.attackSec) ? envOverride.attackSec : cfg.attack,
      decay: cfg.decay,
      sustain: cfg.sustain,
      release: Number.isFinite(envOverride?.releaseSec) ? envOverride.releaseSec : cfg.release,
      baseGain: cfg.gain,
      onVoiceStart: (v) => this.registerVoice(v),
      onVoiceEnd: (v) => this.unregisterVoice(v)
    });

    const entry = { nativeSynth: tempSynth, gain: tempGain };
    this.activeDemoNodes.push(entry);

    const nowAt = this.getAudioTime();
    const leadAt = this.getScheduleLookaheadSec();
    const reqAt = Number.isFinite(envOverride?.atTime) ? envOverride.atTime : (nowAt + leadAt);
    const baseAt = Math.max(nowAt + 0.018, reqAt > nowAt + 30 ? (nowAt + leadAt) : reqAt);
    if (isSeq) {
      notes.forEach((n, idx) => {
        tempSynth.triggerAttackRelease([n], stepDur, baseAt + (idx * arpeggioStepMs) / 1000, 1.0, envOverride);
      });
    } else {
      tempSynth.triggerAttackRelease(notes, stepDur, baseAt, 1.0, envOverride);
    }

    setTimeout(() => {
      try { tempGain.disconnect(); } catch (_) {}
      this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== entry);
    }, (totalWindowSec + 0.95) * 1000);
  }

  /**
   * Spielt Begleit- oder Stimmführungs-Töne für den Einsing-Helfer direkt über den Master-Bus ab.
   */
  playWarmupNotes(soundMode, notes, durationSec = 0.85, isChordCue = false, layerChoirOnChord = false, options = null) {
    if (!this.isInitialized || !notes || notes.length === 0) return;
    const dur = Math.max(0.22, Number(durationSec) || 0.85);
    const mode = soundMode === "voice" || soundMode === "piano-voice" ? soundMode : "piano";
    const envOverride = options && typeof options === "object"
      ? {
          atTime: options.atTime,
          legatoGroup: options.legato === false
            ? null
            : (options.legato === "chord" || options.legato === "melody" ? options.legato : null)
        }
      : null;

    if (mode === "voice") {
      this.playInstrumentSample("choir", notes, dur, 0, isChordCue ? 0.72 : 0.88, envOverride);
      return;
    }

    this.playInstrumentSample("piano", notes, dur, 0, isChordCue ? 0.80 : 0.90, envOverride);
    if (mode === "piano-voice" && (!isChordCue || layerChoirOnChord)) {
      this.playInstrumentSample("choir", notes, Math.max(0.32, dur * 1.06), 0, isChordCue ? 0.44 : 0.56, envOverride);
    }
  }

  /**
   * Spielt einen ruhigen, tiefen Bass-Klangteppich für die Atemübung im Einsing-Helfer ab.
   */
  playWarmupBreathTone(noteOrMidi, durationSec = 4.0, options = {}) {
    if (!this.isInitialized || !this.masterGain || !this.rawCtx) return;
    const midi = EarLabSampledInstrument.noteToMidi(noteOrMidi);
    if (midi === null) return;

    const rawCtx = this.rawCtx;
    const freq = 440 * Math.pow(2, (midi - 69) / 12);
    const dur = Math.max(0.4, Number(durationSec) || 4.0);
    const phase = options.phase || "inhale";
    const startAt = (rawCtx.currentTime || 0) + 0.025;
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
    envGain.connect(this.masterGain);

    let reverbSendGain = null;
    const wetMix = Number.isFinite(this.instrumentReverbMix?.strings)
      ? Math.max(0, Math.min(0.28, this.instrumentReverbMix.strings * 0.65))
      : 0.20;
    if (this.pianoReverbDamp && wetMix > 0.005) {
      reverbSendGain = rawCtx.createGain();
      reverbSendGain.gain.value = wetMix;
      envGain.connect(reverbSendGain);
      reverbSendGain.connect(this.pianoReverbDamp);
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
   * Spielt einen warmen, stufenlosen Vokal-Glide (Sirenenübung) entlang gegebener Waypoints.
   * waypoints: [{ tFrac: 0..1, midi: number }, ...]
   */
  playWarmupSirenGlide(waypoints, durationSec = 4.2, options = {}) {
    if (!this.isInitialized || !this.masterGain || !this.rawCtx) return;
    if (!Array.isArray(waypoints) || waypoints.length < 2) return;

    const rawCtx = this.rawCtx;
    const dur = Math.max(0.8, Number(durationSec) || 4.2);
    const startAt = Number.isFinite(options.atTime)
      ? Math.max((rawCtx.currentTime || 0) + 0.02, options.atTime)
      : ((rawCtx.currentTime || 0) + 0.03);
    const endAt = startAt + dur;

    const evalMidiAt = (frac) => {
      const f = Math.max(0, Math.min(1, frac));
      for (let i = 0; i < waypoints.length - 1; i++) {
        const a = waypoints[i];
        const b = waypoints[i + 1];
        if (f <= b.tFrac || i === waypoints.length - 2) {
          const span = Math.max(0.0001, b.tFrac - a.tFrac);
          const u = Math.max(0, Math.min(1, (f - a.tFrac) / span));
          // Weiche S-Kurve an Gipfel- und Talpunkten
          const ease = 0.5 - 0.5 * Math.cos(Math.PI * u);
          return a.midi + (b.midi - a.midi) * ease;
        }
      }
      return waypoints[waypoints.length - 1].midi;
    };

    const midiToHz = (m) => 440 * Math.pow(2, (m - 69) / 12);
    const sampleSteps = 32;
    const startHz = Math.max(60, midiToHz(evalMidiAt(0)));

    const filter = rawCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 0.75;
    filter.frequency.setValueAtTime(Math.min(2200, Math.max(360, startHz * 2.9)), startAt);

    const envGain = rawCtx.createGain();
    const peakGain = 0.28;
    const attackSec = Math.min(0.28, dur * 0.12);
    const releaseSec = Math.min(0.35, dur * 0.14);
    envGain.gain.setValueAtTime(0.0001, startAt);
    envGain.gain.linearRampToValueAtTime(peakGain, startAt + attackSec);
    envGain.gain.setValueAtTime(peakGain * 0.94, Math.max(startAt + attackSec + 0.02, endAt - releaseSec));
    envGain.gain.linearRampToValueAtTime(0.0001, Math.max(startAt + attackSec + 0.04, endAt - 0.01));
    envGain.gain.linearRampToValueAtTime(0, endAt);

    filter.connect(envGain);
    envGain.connect(this.masterGain);

    let reverbSendGain = null;
    const wetMix = Number.isFinite(this.instrumentReverbMix?.voice)
      ? Math.max(0.10, Math.min(0.32, this.instrumentReverbMix.voice * 0.72))
      : 0.22;
    if (this.pianoReverbDamp && wetMix > 0.005) {
      reverbSendGain = rawCtx.createGain();
      reverbSendGain.gain.value = wetMix;
      envGain.connect(reverbSendGain);
      reverbSendGain.connect(this.pianoReverbDamp);
    }

    const oscSpecs = [
      { type: "sine", mult: 1.0, gain: 0.64 },
      { type: "triangle", mult: 0.999, gain: 0.20 },
      { type: "sine", mult: 2.0, gain: 0.14 }
    ];
    const stopNodes = [];
    const cleanupNodes = [filter, envGain];
    if (reverbSendGain) cleanupNodes.push(reverbSendGain);

    oscSpecs.forEach(spec => {
      const osc = rawCtx.createOscillator();
      osc.type = spec.type;
      osc.frequency.setValueAtTime(startHz * spec.mult, startAt);
      for (let s = 1; s <= sampleSteps; s++) {
        const frac = s / sampleSteps;
        const t = startAt + frac * dur;
        const hz = Math.max(55, midiToHz(evalMidiAt(frac)));
        osc.frequency.exponentialRampToValueAtTime(hz * spec.mult, t);
        if (spec.mult === 1.0) {
          filter.frequency.exponentialRampToValueAtTime(Math.min(2400, Math.max(360, hz * 2.9)), t);
        }
      }
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
      osc.stop(endAt + 0.05);
    });

    breathVoice.cleanupTimer = setTimeout(() => {
      if (breathVoice.stopped) return;
      breathVoice.stopped = true;
      cleanupNodes.forEach(node => { try { node.disconnect(); } catch (_) {} });
      this.activeDemoNodes = this.activeDemoNodes.filter(item => item !== entry);
    }, (Math.max(0, endAt - (rawCtx.currentTime || 0)) + 0.35) * 1000);
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
   * Spielt einen Schritt ausschließlich über die aktuell im Mixer aktiven Kanäle (> 0 %) ab.
   * Stumme Spuren erzeugen keine AudioNodes und verbrauchen 0 % CPU.
   */
  playStep(notes, durationSec = 1.2, bassNote = null, _mode = "cadence", timingOpts = null) {
    if (!this.isInitialized || !this.rawCtx) return;
    if ((this.rawCtx.state === "suspended" || this.rawCtx.state === "interrupted") && typeof this.rawCtx.resume === "function") {
      try { Promise.resolve(this.rawCtx.resume()).catch(() => {}); } catch (_) {}
    }

    const now = this.rawCtx.currentTime || 0;
    const lead = this.getScheduleLookaheadSec();
    const rawRequested = Number.isFinite(timingOpts?.atTime) ? timingOpts.atTime : (now + lead);
    // Schutz gegen Uhr-Mismatch (z. B. Fallback-Date.now() vor Context-Start)
    const safeRequested = rawRequested > now + 30 ? (now + lead) : rawRequested;
    const at = Math.max(now + 0.018, safeRequested);
    const velScale = Number.isFinite(timingOpts?.velocity) ? Math.max(0.08, Math.min(1, timingOpts.velocity)) : 1;
    const minDur = timingOpts ? 0.14 : 0.2;
    const dur = Math.max(minDur, durationSec);
    const hasNotes = Array.isArray(notes) && notes.length > 0;
    const uniqNotes = hasNotes ? [...new Set(notes)] : [];
    const chordVel = uniqNotes.length > 0 ? Math.min(1, 1.02 / Math.sqrt(uniqNotes.length)) * velScale : velScale;

    let harmonicVoices = null;
    if (_mode === "interval-harmonic" && uniqNotes.length === 2) {
      const sorted = uniqNotes.slice().sort(
        (a, b) => EarLabSampledInstrument.noteToMidi(a) - EarLabSampledInstrument.noteToMidi(b)
      );
      const onsetGapSec = 0.022;
      harmonicVoices = [
        { note: sorted[0], dur, at, vel: 0.50 * velScale },
        { note: sorted[1], dur: Math.max(0.2, dur - onsetGapSec), at: at + onsetGapSec, vel: 1.0 * velScale }
      ];
    }

    const legatoMode = timingOpts?.legato === false
      ? null
      : (timingOpts?.legato === "chord" || timingOpts?.legato === "melody"
          ? timingOpts.legato
          : (timingOpts?.legato === true
              ? (uniqNotes.length <= 1 ? "melody" : "chord")
              : (_mode === "cadence" && uniqNotes.length >= 2 ? "chord" : null)));
    const hasExplicitDynamic = Number.isFinite(timingOpts?.velocity);
    const envOverride = (legatoMode || hasExplicitDynamic)
      ? {
          ...(legatoMode ? { legatoGroup: legatoMode } : {}),
          // Ausdrücklich angegebene Spieldynamik wählt bei Instrumenten mit Velocity-Layern die Anschlagsfarbe
          ...(hasExplicitDynamic ? { dynamic: velScale } : {})
        }
      : null;

    // Nur aktive Stems (> 0,5 %) auslösen; im Mehr-Instrumenten-Zusammenspiel feiner menschlicher Ensemble-Versatz
    const activeChordStems = hasNotes
      ? ["piano", "guitar", "strings", "brass", "voice"].filter(k => (this.stemLevels[k] || 0) > 0.005)
      : [];
    const hasBass = Boolean(bassNote && this.bass && (this.stemLevels.bass || 0) > 0.005);
    const totalActiveStems = activeChordStems.length + (hasBass ? 1 : 0);
    // Bei rhythmischen Melodien bleibt der Ensemble-Versatz besonders straff, bei Akkorden/Kadenzen organisch
    const ensembleScale = totalActiveStems >= 2
      ? (_mode === "melody-note" ? 0.35 : 1.0)
      : 0;
    const sampleEnsembleOffsetSec = (stemKey) => {
      if (ensembleScale <= 0) return 0;
      const range = SAMPLED_STEM_CONFIG[stemKey]?.ensembleRangeMs || [0, 6];
      const ms = (range[0] + triRand01() * (range[1] - range[0])) * ensembleScale;
      return ms / 1000;
    };

    // Ist die Bass-Spur stumm, übernimmt das Klavier den Basston als linke Hand (sonst klingen Kadenzen
    // im Standard-Mix nur in der Mittellage). Lautstärke bleibt die der Akkordtöne.
    const pianoLeftHand = !hasBass && !harmonicVoices && bassNote && hasNotes
      && timingOpts?.pianoBass !== false
      && activeChordStems.includes("piano") && !uniqNotes.includes(bassNote)
      ? bassNote
      : null;

    // In Kadenzen greift die Gitarre echte Gitarren-Akkorde (eigener Griff über 4–6 Saiten, angeschlagen)
    // statt der Klavier-Lage; ohne passenden Griff spielt sie die übergebenen Töne
    const guitarVoicing = !harmonicVoices && _mode === "cadence" && timingOpts?.guitarVoicing !== false
      && uniqNotes.length >= 3 && activeChordStems.includes("guitar")
      ? getGuitarChordVoicing(uniqNotes, bassNote)
      : null;

    if (hasNotes) {
      activeChordStems.forEach(stemKey => {
        const inst = this[stemKey];
        if (!inst) return;
        const stemOffset = sampleEnsembleOffsetSec(stemKey);
        if (harmonicVoices) {
          harmonicVoices.forEach(v => inst.triggerAttackRelease([v.note], v.dur, v.at + stemOffset, v.vel, envOverride));
        } else if (stemKey === "guitar" && guitarVoicing) {
          const guitarVel = Math.min(1, 1.02 / Math.sqrt(guitarVoicing.length)) * velScale;
          inst.triggerAttackRelease(guitarVoicing, dur, at + stemOffset, guitarVel, envOverride);
        } else {
          const stemNotes = stemKey === "piano" && pianoLeftHand ? [pianoLeftHand, ...uniqNotes] : uniqNotes;
          inst.triggerAttackRelease(stemNotes, dur, at + stemOffset, chordVel, envOverride);
        }
      });
    }

    if (hasBass) {
      const bassEnv = legatoMode ? { legatoGroup: legatoMode } : null;
      const bassOffset = sampleEnsembleOffsetSec("bass");
      this.bass.triggerAttackRelease(bassNote, dur, at + bassOffset, 0.95 * velScale, bassEnv);
    }
  }

  /**
   * Nativer Percussion-Sample-Player mit 1-ms-Attack-Rampe gegen Nulldurchgangs-Clicks.
   */
  playPercussionSample(entry, when, gainVal, rate = 1.0) {
    const buffer = entry?.buffer || entry;
    const trimOff = entry?.trimOffsetSec || 0;
    if (!buffer || !this.percSampleRawCtx || !this.percSampleGain) return false;
    const rawCtx = this.percSampleRawCtx;
    const startAt = Math.max(when, (rawCtx.currentTime || 0) + 0.006);
    const src = rawCtx.createBufferSource();
    src.buffer = buffer;
    src.playbackRate.value = rate;

    const gainNode = rawCtx.createGain();
    const peak = Math.max(0.01, Math.min(1.4, gainVal));
    gainNode.gain.setValueAtTime(0.0001, startAt);
    gainNode.gain.linearRampToValueAtTime(peak, startAt + 0.0015);

    src.connect(gainNode);
    gainNode.connect(this.percSampleGain);

    src.onended = () => {
      try { src.disconnect(); } catch (_) {}
      try { gainNode.disconnect(); } catch (_) {}
    };

    const availDur = Math.max(0.05, ((buffer.duration || 1.2) - trimOff) / Math.max(0.25, rate));
    const fadeStart = startAt + Math.max(0.02, availDur - 0.015);
    gainNode.gain.setValueAtTime(peak, fadeStart);
    gainNode.gain.linearRampToValueAtTime(0, startAt + availDur);

    src.start(startAt, trimOff);
    src.stop(startAt + availDur + 0.02);
    return true;
  }

  /**
   * Schlanker nativer Percussion-Synthesizer (für Toms/Congas/Timpani sowie als Sample-Fallback).
   */
  triggerNativePercussionSynth(kind, when, vel) {
    const rawCtx = this.rawCtx;
    if (!rawCtx || !this.masterGain) return;
    const startAt = Math.max(when, (rawCtx.currentTime || 0) + 0.006);

    const playMembrane = (baseNote, dur = 0.22, octaves = 3.2, level = 0.72) => {
      const midi = EarLabSampledInstrument.noteToMidi(baseNote) ?? 36;
      const baseFreq = EarLabSampledInstrument.midiToFreq(midi);
      const osc = rawCtx.createOscillator();
      const gain = rawCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq * Math.pow(2, octaves * 0.45), startAt);
      osc.frequency.exponentialRampToValueAtTime(baseFreq, startAt + 0.045);

      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.linearRampToValueAtTime(level * vel, startAt + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0005, startAt + dur);
      gain.gain.linearRampToValueAtTime(0, startAt + dur + 0.01);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.onended = () => {
        try { osc.disconnect(); } catch (_) {}
        try { gain.disconnect(); } catch (_) {}
      };
      osc.start(startAt);
      osc.stop(startAt + dur + 0.025);
    };

    const playNoiseBurst = (filterType, freqHz, qVal, decaySec, level) => {
      if (!this.whiteNoiseBuffer) this.whiteNoiseBuffer = buildWhiteNoiseBuffer(rawCtx, 1.0);
      const src = rawCtx.createBufferSource();
      src.buffer = this.whiteNoiseBuffer;
      const filter = rawCtx.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.value = freqHz;
      filter.Q.value = qVal;
      const gain = rawCtx.createGain();
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.linearRampToValueAtTime(level * vel, startAt + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0005, startAt + decaySec);
      gain.gain.linearRampToValueAtTime(0, startAt + decaySec + 0.01);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      src.onended = () => {
        try { src.disconnect(); } catch (_) {}
        try { filter.disconnect(); } catch (_) {}
        try { gain.disconnect(); } catch (_) {}
      };
      src.start(startAt);
      src.stop(startAt + decaySec + 0.025);
    };

    const playClickTone = (note, dur, level = 0.34) => {
      const midi = EarLabSampledInstrument.noteToMidi(note) ?? 79;
      const osc = rawCtx.createOscillator();
      const gain = rawCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(EarLabSampledInstrument.midiToFreq(midi), startAt);
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.linearRampToValueAtTime(level * vel, startAt + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0005, startAt + dur);
      gain.gain.linearRampToValueAtTime(0, startAt + dur + 0.01);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.onended = () => {
        try { osc.disconnect(); } catch (_) {}
        try { gain.disconnect(); } catch (_) {}
      };
      osc.start(startAt);
      osc.stop(startAt + dur + 0.02);
    };

    const membraneMap = {
      kick: "C1", tom_low: "G2", tom_mid: "C3", tom_high: "F3",
      conga_low: "A2", conga_high: "E3", timpani: "C2"
    };
    const toneMap = {
      accent: { note: "C6", dur: 0.055 },
      tick: { note: "G5", dur: 0.045 },
      clave: { note: "E6", dur: 0.04 },
      wood_accent: { note: "G6", dur: 0.045 },
      wood_tick: { note: "D6", dur: 0.04 },
      wood_sub: { note: "A6", dur: 0.03 },
      cowbell: { note: "G#5", dur: 0.11 },
      cowbell_accent: { note: "B5", dur: 0.11 },
      cowbell_tick: { note: "G#5", dur: 0.095 },
      cowbell_sub: { note: "E6", dur: 0.045 }
    };

    if (membraneMap[kind]) {
      playMembrane(membraneMap[kind], kind === "timpani" ? 0.42 : 0.22);
    } else if (kind === "rimshot_accent") {
      playClickTone("F5", 0.035, 0.36);
      playNoiseBurst("highpass", 1500, 0.8, 0.11, 0.32);
    } else if (kind === "rimshot_tick") {
      playClickTone("C5", 0.03, 0.28);
      playNoiseBurst("highpass", 1500, 0.8, 0.07, 0.22);
    } else if (kind === "rimshot_sub") {
      playNoiseBurst("highpass", 6200, 0.8, 0.045, 0.20);
    } else if (kind === "snare") {
      playMembrane("D3", 0.10, 1.2, 0.28);
      playNoiseBurst("highpass", 1500, 0.8, 0.14, 0.38);
    } else if (kind === "hat") {
      playNoiseBurst("highpass", 6200, 0.8, 0.05, 0.22);
    } else if (kind === "shaker") {
      playNoiseBurst("bandpass", 4400, 1.5, 0.07, 0.22);
    } else if (toneMap[kind]) {
      const def = toneMap[kind];
      playClickTone(def.note, def.dur, 0.35);
    }
  }

  triggerPercussion(kind, scheduledTime = null, velocity = 1) {
    if (!this.isInitialized || !this.rawCtx) return;
    if ((this.rawCtx.state === "suspended" || this.rawCtx.state === "interrupted") && typeof this.rawCtx.resume === "function") {
      try { Promise.resolve(this.rawCtx.resume()).catch(() => {}); } catch (_) {}
    }
    const now = this.rawCtx.currentTime || 0;
    const hasSched = scheduledTime !== null && scheduledTime !== undefined && Number.isFinite(scheduledTime) && scheduledTime <= now + 30;
    const when = hasSched
      ? Math.max(now + 0.006, scheduledTime)
      : (now + 0.015);
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
      const sampleEntry = spec ? this.percSamples[spec.key] : null;
      if (sampleEntry && this.playPercussionSample(sampleEntry, when, vel * spec.gain, spec.rate)) {
        return;
      }
    }

    this.triggerNativePercussionSynth(kind, when, vel);
  }

  /**
   * Spielt ein Rhythmus-Muster aus [delayMs, instrumentKind, optionalVelocity] Paaren ab.
   * Nutzt Lookahead auf die WebAudio-Hardware-Uhr für jitterfreies Timing.
   */
  playRhythmSequence(events, baseAudioTimeOverride = null) {
    if (!this.isInitialized || !events || events.length === 0) return;
    const currentId = this.playbackId;
    const baseAudioTime = baseAudioTimeOverride !== null && baseAudioTimeOverride !== undefined
      ? baseAudioTimeOverride
      : (this.getAudioTime() + 0.045);
    const lookaheadMs = 110;

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
