// =====================================================
// CHROMATISCHER TUNER (#viewTuner)
// Mikrofon → AnalyserNode → Tonhöhe per McLeod-Verfahren (NSDF) → Zeiger, Spektrum & Saiten.
// Alles läuft lokal im Browser; der Mikrofon-Stream wird beim Verlassen sofort freigegeben.
// =====================================================
const TUNER_A4_DEFAULT = 440;
const TUNER_A4_MIN = 430;
const TUNER_A4_MAX = 450;
const TUNER_IN_TUNE_HOLD_MS = 450;
const TUNER_SILENCE_MS = 420;
const TUNER_CENTS_RANGE = 50;       // Zeigerausschlag ±50 Cent
const TUNER_GAUGE_DEG = 58;         // Winkel bei ±50 Cent

// Instrumente & Stimmungen (Noten in internationaler Schreibweise, tiefste Saite zuerst)
const TUNER_INSTRUMENTS = {
  chromatic: { de: "Chromatisch", en: "Chromatic", range: [30, 1800], tolerance: 4, tunings: null },
  guitar: { de: "Gitarre", en: "Guitar", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["E2", "A2", "D3", "G3", "B3", "E4"] },
    halfDown: { de: "Halbton tiefer", en: "Half step down", notes: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"], flat: true },
    dropD: { de: "Drop D", en: "Drop D", notes: ["D2", "A2", "D3", "G3", "B3", "E4"] },
    dadgad: { de: "DADGAD", en: "DADGAD", notes: ["D2", "A2", "D3", "G3", "A3", "D4"] },
    openG: { de: "Open G", en: "Open G", notes: ["D2", "G2", "D3", "G3", "B3", "D4"] },
    openD: { de: "Open D", en: "Open D", notes: ["D2", "A2", "D3", "F#3", "A3", "D4"] }
  } },
  eguitar: { de: "E-Gitarre", en: "Electric guitar", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["E2", "A2", "D3", "G3", "B3", "E4"] },
    halfDown: { de: "Halbton tiefer", en: "Half step down", notes: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"], flat: true },
    dropD: { de: "Drop D", en: "Drop D", notes: ["D2", "A2", "D3", "G3", "B3", "E4"] },
    dropC: { de: "Drop C", en: "Drop C", notes: ["C2", "G2", "C3", "F3", "A3", "D4"] },
    sevenString: { de: "7-saitig", en: "7-string", notes: ["B1", "E2", "A2", "D3", "G3", "B3", "E4"] }
  } },
  ebass: { de: "E-Bass", en: "Electric bass", tolerance: 4, tunings: {
    four: { de: "4-saitig", en: "4-string", notes: ["E1", "A1", "D2", "G2"] },
    five: { de: "5-saitig", en: "5-string", notes: ["B0", "E1", "A1", "D2", "G2"] },
    dropD: { de: "Drop D", en: "Drop D", notes: ["D1", "A1", "D2", "G2"] },
    halfDown: { de: "Halbton tiefer", en: "Half step down", notes: ["Eb1", "Ab1", "Db2", "Gb2"], flat: true }
  } },
  mandolin: { de: "Mandoline", en: "Mandolin", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["G3", "D4", "A4", "E5"] }
  } },
  banjo: { de: "Banjo", en: "Banjo", tolerance: 4, tunings: {
    openG: { de: "Open G", en: "Open G", notes: ["G4", "D3", "G3", "B3", "D4"] },
    doubleC: { de: "Double C", en: "Double C", notes: ["G4", "C3", "G3", "C4", "D4"] }
  } },
  violin: { de: "Violine", en: "Violin", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["G3", "D4", "A4", "E5"] }
  } },
  viola: { de: "Viola", en: "Viola", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["C3", "G3", "D4", "A4"] }
  } },
  cello: { de: "Cello", en: "Cello", tolerance: 4, tunings: {
    standard: { de: "Standard", en: "Standard", notes: ["C2", "G2", "D3", "A3"] }
  } },
  doublebass: { de: "Kontrabass", en: "Double bass", tolerance: 4, tunings: {
    orchestra: { de: "Orchester", en: "Orchestral", notes: ["E1", "A1", "D2", "G2"] },
    solo: { de: "Solo", en: "Solo", notes: ["F#1", "B1", "E2", "A2"] }
  } },
  voice: { de: "Gesang", en: "Voice", range: [65, 1300], tolerance: 10, smooth: true, tunings: null }
};

const TUNER_NOTE_LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function tunerNoteToMidi(name) {
  const m = /^([A-G])([#b]?)(-?\d)$/.exec(String(name || ""));
  if (!m) return 69;
  const acc = m[2] === "#" ? 1 : (m[2] === "b" ? -1 : 0);
  return (parseInt(m[3], 10) + 1) * 12 + TUNER_NOTE_LETTER_PC[m[1]] + acc;
}

function getTunerPrefs() {
  const raw = state.profile?.tuner || {};
  let instrument = TUNER_INSTRUMENTS[raw.instrument] ? raw.instrument : null;
  if (!instrument) {
    // Erstes Öffnen: Instrument aus dem Musiker-Profil ableiten
    const insts = state.profile?.instruments || [];
    instrument = insts.includes("Gitarre") ? "guitar"
      : (insts.includes("Bass") ? "ebass" : (insts.includes("Gesang") ? "voice" : "chromatic"));
  }
  const tunings = TUNER_INSTRUMENTS[instrument].tunings;
  const tuning = tunings ? (tunings[raw.tuning] ? raw.tuning : Object.keys(tunings)[0]) : "";
  const a4 = Math.max(TUNER_A4_MIN, Math.min(TUNER_A4_MAX, Math.round(Number(raw.a4) || TUNER_A4_DEFAULT)));
  const mode = raw.mode === "single" ? "single" : "auto";
  const targetMidi = Number.isFinite(Number(raw.targetMidi)) ? Math.max(24, Math.min(96, Math.round(Number(raw.targetMidi)))) : 69;
  return { instrument, tuning, a4, mode, targetMidi };
}

// Läuft schon beim Laden des Profils (vor den Tuner-Konstanten) → nur Literale verwenden
function sanitizeTunerPrefs(raw) {
  if (!raw || typeof raw !== "object") return {};
  const out = {};
  const instrumentKeys = ["chromatic", "guitar", "eguitar", "ebass", "mandolin", "banjo", "violin", "viola", "cello", "doublebass", "voice"];
  if (instrumentKeys.includes(raw.instrument)) out.instrument = raw.instrument;
  if (typeof raw.tuning === "string" && /^[A-Za-z]{1,24}$/.test(raw.tuning)) out.tuning = raw.tuning;
  if (Number.isFinite(Number(raw.a4))) out.a4 = Math.max(430, Math.min(450, Math.round(Number(raw.a4))));
  out.mode = raw.mode === "single" ? "single" : "auto";
  if (Number.isFinite(Number(raw.targetMidi))) out.targetMidi = Math.max(24, Math.min(96, Math.round(Number(raw.targetMidi))));
  return out;
}

function setTunerPrefs(patch) {
  if (!state.profile) return;
  state.profile.tuner = { ...getTunerPrefs(), ...patch };
  saveUserProfile(state.profile);
}

// Aktive Saiten (oder leer bei Chromatisch/Gesang)
function getTunerStrings(prefs = getTunerPrefs()) {
  const inst = TUNER_INSTRUMENTS[prefs.instrument];
  const tuning = inst.tunings ? inst.tunings[prefs.tuning] : null;
  if (!tuning) return [];
  return tuning.notes.map((n, i) => ({ index: i, name: n, midi: tunerNoteToMidi(n), flat: Boolean(tuning.flat) }));
}

function getTunerRange(prefs = getTunerPrefs()) {
  const inst = TUNER_INSTRUMENTS[prefs.instrument];
  const strings = getTunerStrings(prefs);
  if (strings.length) {
    const lo = Math.min(...strings.map(st => st.midi));
    const hi = Math.max(...strings.map(st => st.midi));
    return [tunerMidiToFreq(lo, prefs.a4) / 1.45, tunerMidiToFreq(hi, prefs.a4) * 1.6];
  }
  return inst.range || [30, 1800];
}

function tunerMidiToFreq(midi, a4 = TUNER_A4_DEFAULT) {
  return a4 * Math.pow(2, (midi - 69) / 12);
}

function tunerFreqToMidiFloat(freq, a4 = TUNER_A4_DEFAULT) {
  return 69 + 12 * Math.log2(freq / a4);
}

function formatTunerNote(midi, preferFlat = false) {
  const full = midiToGermanNote(midi, preferFlat);
  const m = /^(.*?)(-?\d+)$/.exec(full);
  return m ? { name: m[1], octave: m[2] } : { name: full, octave: "" };
}

const _tuner = {
  ctx: null, stream: null, source: null, analyser: null, sink: null,
  running: false, starting: false, rafId: 0, frame: 0,
  timeBuf: null, freqBuf: null, work: null, nsdf: null,
  history: [], smoothCents: null, displayMidi: null, lastFreq: 0, lastClarity: 0,
  lastPitchAt: 0, inTuneSince: 0, inTune: false, tunedStrings: new Set(),
  refUntil: 0, refNodes: null, wakeLock: null, colors: null, gaugeBuilt: false, openDropdown: null
};

/**
 * McLeod Pitch Method: normierte Autokorrelation (NSDF) mit Spitzenwahl & Parabel-Interpolation.
 * Liefert { freq, clarity, rms }. Das Signal wird auf ~24 kHz heruntergemischt (spart Rechenzeit).
 */
function detectTunerPitch(input, sampleRate, minFreq, maxFreq) {
  const dec = sampleRate > 30000 ? 2 : 1;
  const n = Math.floor(input.length / dec);
  if (!_tuner.work || _tuner.work.length !== n) _tuner.work = new Float32Array(n);
  const x = _tuner.work;
  let mean = 0;
  for (let i = 0; i < n; i++) {
    const v = dec === 2 ? (input[2 * i] + input[2 * i + 1]) * 0.5 : input[i];
    x[i] = v;
    mean += v;
  }
  mean /= n;
  let energy = 0;
  for (let i = 0; i < n; i++) {
    x[i] -= mean;
    energy += x[i] * x[i];
  }
  const rms = Math.sqrt(energy / n);
  if (rms < 0.006) return { freq: 0, clarity: 0, rms };

  const sr = sampleRate / dec;
  const minLag = Math.max(2, Math.floor(sr / maxFreq));
  const maxLag = Math.min(Math.floor(n / 2), Math.ceil(sr / minFreq));
  if (!_tuner.nsdf || _tuner.nsdf.length < maxLag + 2) _tuner.nsdf = new Float32Array(maxLag + 2);
  const nsdf = _tuner.nsdf;
  nsdf.fill(0);

  // m(τ) inkrementell: Summe der Quadrate beider Fensterteile
  let m = 2 * energy;
  for (let tau = 1; tau <= maxLag + 1; tau++) {
    m -= x[tau - 1] * x[tau - 1] + x[n - tau] * x[n - tau];
    if (tau < minLag - 1) continue;
    let acf = 0;
    const lim = n - tau;
    for (let j = 0; j < lim; j++) acf += x[j] * x[j + tau];
    nsdf[tau] = m > 1e-9 ? (2 * acf) / m : 0;
  }

  // Positive Bereiche nach dem ersten Nulldurchgang: jeweils höchste Spitze merken
  const peaks = [];
  let tau = Math.max(1, minLag - 1);
  while (tau <= maxLag && nsdf[tau] > 0) tau++;
  let bestInRegion = -1;
  for (; tau <= maxLag; tau++) {
    const v = nsdf[tau];
    if (v > 0) {
      if (bestInRegion < 0 || v > nsdf[bestInRegion]) bestInRegion = tau;
    } else if (bestInRegion >= 0) {
      peaks.push(bestInRegion);
      bestInRegion = -1;
    }
  }
  if (bestInRegion >= 0 && bestInRegion < maxLag) peaks.push(bestInRegion);
  if (!peaks.length) return { freq: 0, clarity: 0, rms };

  const maxPeak = Math.max(...peaks.map(p => nsdf[p]));
  const chosen = peaks.find(p => nsdf[p] >= 0.9 * maxPeak) || peaks[0];
  const a = nsdf[chosen - 1] || 0;
  const b = nsdf[chosen];
  const c = nsdf[chosen + 1] || 0;
  const denom = a - 2 * b + c;
  const shift = Math.abs(denom) > 1e-9 ? (a - c) / (2 * denom) : 0;
  const lag = chosen + Math.max(-1, Math.min(1, shift));
  const clarity = Math.min(1, b - 0.25 * (a - c) * shift);
  const freq = sr / lag;
  if (!Number.isFinite(freq) || freq < minFreq * 0.9 || freq > maxFreq * 1.1) return { freq: 0, clarity: 0, rms };
  return { freq, clarity, rms };
}

function readTunerColors() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name, fb) => (cs.getPropertyValue(name) || "").trim() || fb;
  _tuner.colors = {
    ink: v("--raccoon-dark", "#1F3342"),
    muted: v("--raccoon-muted", "#7A8A94"),
    border: v("--border-soft", "#DDE3E0"),
    lilac: v("--lilac-strong", "#7B6FB3"),
    peach: v("--peach-strong", "#E0704F"),
    sage: v("--sage-strong", "#2E6F4E")
  };
}

// ---------- Zeigerinstrument ----------
function buildTunerGauge() {
  const ticks = document.getElementById("tunerGaugeTicks");
  const zone = document.getElementById("tunerGaugeZone");
  if (!ticks || !zone) return;
  const cx = 150;
  const cy = 168;
  const polar = (deg, r) => {
    const rad = (deg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  let html = "";
  for (let c = -TUNER_CENTS_RANGE; c <= TUNER_CENTS_RANGE; c += 5) {
    const deg = (c / TUNER_CENTS_RANGE) * TUNER_GAUGE_DEG;
    const major = c % 25 === 0;
    const [x1, y1] = polar(deg, major ? 128 : 134);
    const [x2, y2] = polar(deg, 142);
    html += `<line class="tuner-tick${major ? " is-major" : ""}${c === 0 ? " is-center" : ""}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  }
  [[-50, "−50"], [0, "0"], [50, "+50"]].forEach(([c, lbl]) => {
    const [tx, ty] = polar((c / TUNER_CENTS_RANGE) * TUNER_GAUGE_DEG, 116);
    html += `<text class="tuner-tick-label" x="${tx.toFixed(1)}" y="${(ty + 4).toFixed(1)}" text-anchor="middle" font-family="Andika, sans-serif">${lbl}</text>`;
  });
  ticks.innerHTML = html;
  _tuner.gaugeBuilt = true;
  updateTunerGaugeZone();
}

function updateTunerGaugeZone() {
  const zone = document.getElementById("tunerGaugeZone");
  if (!zone) return;
  const tol = TUNER_INSTRUMENTS[getTunerPrefs().instrument].tolerance || 4;
  const cx = 150;
  const cy = 168;
  const r = 136;
  const a = (Math.max(3, tol) / TUNER_CENTS_RANGE) * TUNER_GAUGE_DEG;
  const pt = (deg) => {
    const rad = (deg - 90) * Math.PI / 180;
    return `${(cx + r * Math.cos(rad)).toFixed(1)} ${(cy + r * Math.sin(rad)).toFixed(1)}`;
  };
  zone.setAttribute("d", `M ${pt(-a)} A ${r} ${r} 0 0 1 ${pt(a)}`);
}

// Sichtbarer Ausschnitt des Zeigerinstruments passt sich der verfügbaren Höhe an: immer volle Breite,
// bei viel Höhe mit Drehpunkt (bis 180 Einheiten), bei wenig nur der Skalenbogen (ab 118 Einheiten)
function updateTunerGaugeViewBox() {
  const svg = document.getElementById("tunerGauge");
  if (!svg || !svg.clientWidth) return;
  // Erst das ganze Instrument anbieten, dann messen, wie viel Höhe das Layout tatsächlich hergibt
  svg.setAttribute("viewBox", "0 0 300 180");
  if (!svg.clientHeight) return;
  const vbH = Math.max(118, Math.min(180, Math.round((svg.clientHeight / svg.clientWidth) * 300)));
  const next = `0 0 300 ${vbH}`;
  if (svg.getAttribute("viewBox") !== next) svg.setAttribute("viewBox", next);
}

function setTunerNeedle(cents) {
  const needle = document.getElementById("tunerNeedle");
  if (!needle) return;
  const clamped = Math.max(-TUNER_CENTS_RANGE - 4, Math.min(TUNER_CENTS_RANGE + 4, cents || 0));
  needle.style.transform = `rotate(${((clamped / TUNER_CENTS_RANGE) * TUNER_GAUGE_DEG).toFixed(2)}deg)`;
}

// ---------- Spektrum ----------
function drawTunerSpectrum(detectFreq, targetFreq, inTune) {
  const canvas = document.getElementById("tunerSpectrum");
  if (!canvas || !canvas.getContext) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(10, Math.round(canvas.clientWidth * dpr));
  const h = Math.max(10, Math.round(canvas.clientHeight * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const g = canvas.getContext("2d");
  g.clearRect(0, 0, w, h);
  if (!_tuner.colors) readTunerColors();
  const col = _tuner.colors;
  const prefs = getTunerPrefs();
  const [rLo, rHi] = getTunerRange(prefs);
  const fLo = Math.max(25, rLo);
  const fHi = Math.min(4000, rHi * 2.4);
  const logLo = Math.log(fLo);
  const logSpan = Math.log(fHi) - logLo;
  const xOf = (f) => ((Math.log(f) - logLo) / logSpan) * w;
  const labelH = 13 * dpr;
  const plotH = h - labelH;

  // Raster: Saiten bzw. alle C
  g.font = `700 ${Math.round(9.5 * dpr)}px Andika, sans-serif`;
  g.textAlign = "center";
  g.textBaseline = "bottom";
  const strings = getTunerStrings(prefs);
  const marks = strings.length
    ? strings.map(st => ({ f: tunerMidiToFreq(st.midi, prefs.a4), label: formatTunerNote(st.midi, st.flat).name, idx: st.index }))
    : [];
  if (!strings.length) {
    for (let midi = 12; midi <= 120; midi += 12) {
      const f = tunerMidiToFreq(midi, prefs.a4);
      if (f >= fLo && f <= fHi) marks.push({ f, label: formatTunerNote(midi).name + formatTunerNote(midi).octave });
    }
  }
  marks.forEach(mk => {
    const x = xOf(mk.f);
    if (x < 0 || x > w) return;
    g.strokeStyle = col.border;
    g.lineWidth = dpr;
    g.setLineDash([2 * dpr, 3 * dpr]);
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, plotH);
    g.stroke();
    g.setLineDash([]);
    g.fillStyle = _tuner.tunedStrings.has(mk.idx) ? col.sage : col.muted;
    g.fillText(mk.label, x, h);
  });

  // Live-Spektrum (Analyser, dB)
  if (_tuner.running && _tuner.analyser && _tuner.freqBuf) {
    _tuner.analyser.getFloatFrequencyData(_tuner.freqBuf);
    const binHz = _tuner.ctx.sampleRate / _tuner.analyser.fftSize;
    g.beginPath();
    g.moveTo(0, plotH);
    for (let px = 0; px <= w; px += 2 * dpr) {
      const f = Math.exp(logLo + (px / w) * logSpan);
      const bin = f / binHz;
      const i0 = Math.floor(bin);
      const frac = bin - i0;
      const v0 = _tuner.freqBuf[i0] ?? -140;
      const v1 = _tuner.freqBuf[i0 + 1] ?? v0;
      const db = v0 + (v1 - v0) * frac;
      const norm = Math.max(0, Math.min(1, (db + 100) / 72));
      g.lineTo(px, plotH - norm * (plotH - 2 * dpr));
    }
    g.lineTo(w, plotH);
    g.closePath();
    g.fillStyle = col.lilac;
    g.globalAlpha = 0.22;
    g.fill();
    g.globalAlpha = 0.85;
    g.strokeStyle = col.lilac;
    g.lineWidth = 1.4 * dpr;
    g.stroke();
    g.globalAlpha = 1;
  }

  // Zielton (Einzelton)
  if (targetFreq) {
    const tx = xOf(targetFreq);
    g.strokeStyle = col.sage;
    g.lineWidth = 1.6 * dpr;
    g.setLineDash([4 * dpr, 3 * dpr]);
    g.beginPath();
    g.moveTo(tx, 0);
    g.lineTo(tx, plotH);
    g.stroke();
    g.setLineDash([]);
  }

  // Zeiger an der erkannten Grundfrequenz
  if (detectFreq) {
    const px = xOf(detectFreq);
    const c = inTune ? col.sage : col.peach;
    g.strokeStyle = c;
    g.fillStyle = c;
    g.lineWidth = 2.2 * dpr;
    g.beginPath();
    g.moveTo(px, 5 * dpr);
    g.lineTo(px, plotH);
    g.stroke();
    g.beginPath();
    g.moveTo(px - 5 * dpr, 0);
    g.lineTo(px + 5 * dpr, 0);
    g.lineTo(px, 6 * dpr);
    g.closePath();
    g.fill();
  }
}

// ---------- Anzeige ----------
function setTunerStatus(text, kind = "") {
  const el = document.getElementById("tunerStatus");
  if (!el) return;
  el.textContent = text;
  el.dataset.kind = kind;
}

function renderTunerReadout(info) {
  const display = document.getElementById("tunerDisplay");
  const nameEl = document.getElementById("tunerNoteName");
  const octEl = document.getElementById("tunerNoteOctave");
  const centsEl = document.getElementById("tunerCents");
  const freqEl = document.getElementById("tunerFreq");
  const targetEl = document.getElementById("tunerTargetLabel");
  if (!display) return;
  const prefs = getTunerPrefs();

  if (targetEl) {
    // Einzelton: Ziel in der Messzeile („Ziel: E4 • +3 ¢ • 330 Hz“); automatisch ohne Zusatz
    const isSingle = prefs.mode === "single";
    if (isSingle) {
      const t = getTunerTargetMidi(prefs);
      const flat = getTunerStrings(prefs).some(st => st.flat);
      const tn = formatTunerNote(t, flat);
      targetEl.textContent = tf("Ziel: {note}", "Target: {note}", { note: `${tn.name}${tn.octave}` });
    } else {
      targetEl.textContent = "";
    }
    targetEl.classList.toggle("hidden", !isSingle);
    document.getElementById("tunerTargetDot")?.classList.toggle("hidden", !isSingle);
  }

  if (!info) {
    display.classList.toggle("is-quiet", _tuner.running);
    return;
  }
  display.classList.remove("is-quiet", "is-idle");
  const note = formatTunerNote(info.midi, info.flat);
  if (nameEl) nameEl.textContent = note.name;
  if (octEl) octEl.textContent = note.octave;
  const rounded = Math.round(info.cents);
  if (centsEl) centsEl.textContent = `${rounded > 0 ? "+" : (rounded < 0 ? "−" : "±")} ${Math.abs(rounded)} ¢`;
  if (freqEl) freqEl.textContent = `${info.freq.toFixed(1)} Hz`;
  display.classList.toggle("is-sharp", rounded > (info.tol || 4));
  display.classList.toggle("is-flat", rounded < -(info.tol || 4));
}

function getTunerTargetMidi(prefs = getTunerPrefs()) {
  const strings = getTunerStrings(prefs);
  if (strings.length) {
    const hit = strings.find(st => st.midi === prefs.targetMidi);
    return hit ? hit.midi : strings[0].midi;
  }
  return prefs.targetMidi || 69;
}

function renderTunerStrings() {
  const row = document.getElementById("tunerStringsRow");
  const stepper = document.getElementById("tunerNoteStepper");
  const stepNote = document.getElementById("tunerStepperNote");
  if (!row) return;
  const prefs = getTunerPrefs();
  const strings = getTunerStrings(prefs);
  row.classList.toggle("hidden", strings.length === 0);
  stepper?.classList.toggle("hidden", strings.length > 0 || prefs.mode !== "single");
  if (stepNote) {
    const tn = formatTunerNote(prefs.targetMidi || 69);
    stepNote.textContent = `${tn.name}${tn.octave}`;
  }
  const target = getTunerTargetMidi(prefs);
  row.innerHTML = strings.map(st => {
    const n = formatTunerNote(st.midi, st.flat);
    const isTarget = prefs.mode === "single" && st.midi === target;
    const tuned = _tuner.tunedStrings.has(st.index);
    return `<button class="tuner-string-chip${isTarget ? " is-target" : ""}${tuned ? " is-tuned" : ""}" type="button" data-tuner-string="${st.index}" aria-pressed="${isTarget}" aria-label="${escapeHtml(tf("Saite {n}: {note}", "String {n}: {note}", { n: strings.length - st.index, note: n.name + n.octave }))}">
      <span class="tuner-string-name">${escapeHtml(n.name)}</span><span class="tuner-string-oct">${escapeHtml(n.octave)}</span>
    </button>`;
  }).join("");
}

// Einfachauswahl im Stil der Konto-Auswahl „Deine Instrumente / Rollen“ (Klassen .multi-dropdown-*)
function renderTunerDropdown(host, { key, ariaLabel, options, selectedKey, onSelect }) {
  if (!host) return;
  const isOpen = _tuner.openDropdown === key;
  const selected = options.find(o => o.key === selectedKey) || options[0];
  const optionsHtml = options.map(opt => {
    const isSel = opt.key === selected?.key;
    const hint = opt.hint ? `<span class="multi-dropdown-opt-hint">${escapeHtml(opt.hint)}</span>` : "";
    return `<button type="button" class="multi-dropdown-option${isSel ? " is-selected" : ""}" role="option" aria-selected="${isSel}" data-tuner-option="${escapeHtml(opt.key)}">
        <span class="multi-dropdown-check" aria-hidden="true">${isSel ? "✓" : ""}</span>
        <span class="multi-dropdown-opt-text"><span>${escapeHtml(opt.label)}</span>${hint}</span>
      </button>`;
  }).join("");
  host.innerHTML = `<div class="multi-dropdown-wrap">
      <button type="button" class="account-select multi-dropdown-trigger${isOpen ? " is-open" : ""}" aria-haspopup="listbox" aria-expanded="${isOpen}" aria-label="${escapeHtml(ariaLabel)}" data-tuner-trigger="${key}">
        <span class="multi-dropdown-summary">${escapeHtml(selected ? selected.label : "")}</span>
        <span class="multi-dropdown-meta">${selected?.badge ? `<span class="tuner-dropdown-badge">${escapeHtml(selected.badge)}</span>` : ""}${buildDropdownChevronSVG()}</span>
      </button>
      <div class="multi-dropdown-menu${isOpen ? "" : " hidden"}" role="listbox" aria-label="${escapeHtml(ariaLabel)}">${optionsHtml}</div>
    </div>`;
  host.querySelector("[data-tuner-trigger]")?.addEventListener("click", (e) => {
    e.stopPropagation();
    _tuner.openDropdown = isOpen ? null : key;
    syncTunerSetupUI();
  });
  host.querySelectorAll("[data-tuner-option]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      _tuner.openDropdown = null;
      onSelect(btn.dataset.tunerOption);
    });
  });
  if (isOpen) {
    host.querySelector(".multi-dropdown-option.is-selected")?.scrollIntoView?.({ block: "nearest" });
  }
}

function closeTunerDropdowns() {
  if (typeof _tuner === "undefined" || !_tuner.openDropdown) return false;
  _tuner.openDropdown = null;
  syncTunerSetupUI();
  return true;
}

function selectTunerInstrument(instrument) {
  const tunings = TUNER_INSTRUMENTS[instrument]?.tunings;
  if (!TUNER_INSTRUMENTS[instrument]) return;
  _tuner.tunedStrings.clear();
  const firstTuning = tunings ? Object.keys(tunings)[0] : "";
  const firstNote = tunings ? tunerNoteToMidi(tunings[firstTuning].notes[0]) : getTunerPrefs().targetMidi;
  setTunerPrefs({ instrument, tuning: firstTuning, targetMidi: firstNote });
  syncTunerSetupUI();
}

function selectTunerTuning(tuningKey) {
  const prefs = getTunerPrefs();
  const tuning = TUNER_INSTRUMENTS[prefs.instrument].tunings?.[tuningKey];
  if (!tuning) return;
  _tuner.tunedStrings.clear();
  setTunerPrefs({ tuning: tuningKey, targetMidi: tunerNoteToMidi(tuning.notes[0]) });
  syncTunerSetupUI();
}

function syncTunerSetupUI() {
  const prefs = getTunerPrefs();
  const tunings = TUNER_INSTRUMENTS[prefs.instrument].tunings;
  const tunField = document.getElementById("tunerTuningField");
  const tuningNotes = (def) => def.notes.map(n => formatTunerNote(tunerNoteToMidi(n), def.flat).name).join(" ");

  renderTunerDropdown(document.getElementById("tunerInstrumentHost"), {
    key: "instrument",
    ariaLabel: tr("Instrument", "Instrument"),
    selectedKey: prefs.instrument,
    options: Object.entries(TUNER_INSTRUMENTS).map(([key, def]) => {
      const first = def.tunings ? Object.values(def.tunings)[0] : null;
      return {
        key,
        label: tr(def.de, def.en),
        hint: first ? tuningNotes(first) : (key === "voice" ? tr("Alle Töne, ruhige Anzeige", "All notes, calm display") : tr("Alle Töne", "All notes"))
      };
    }),
    onSelect: selectTunerInstrument
  });

  const hasTuningChoice = Boolean(tunings) && Object.keys(tunings).length > 1;
  tunField?.classList.toggle("hidden", !hasTuningChoice);
  if (hasTuningChoice) {
    renderTunerDropdown(tunField, {
      key: "tuning",
      ariaLabel: tr("Stimmung", "Tuning"),
      selectedKey: prefs.tuning,
      options: Object.entries(tunings).map(([key, def]) => ({ key, label: tr(def.de, def.en), hint: tuningNotes(def) })),
      onSelect: selectTunerTuning
    });
  } else if (tunField) {
    tunField.innerHTML = "";
  }
  document.querySelectorAll("[data-tuner-mode]").forEach(btn => {
    const on = btn.dataset.tunerMode === prefs.mode;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-checked", String(on));
  });
  const a4El = document.getElementById("tunerA4Value");
  if (a4El) a4El.textContent = `A = ${prefs.a4} Hz`;
  renderTunerStrings();
  updateTunerGaugeZone();
  renderTunerReadout(null);
  if (state.currentView === "tuner") state.updateHeaderSubtext();
}

function syncTunerStartButton() {
  const btn = document.getElementById("tunerStartBtn");
  if (!btn) return;
  btn.textContent = _tuner.running ? tr("Tuner stoppen", "Stop tuner") : tr("Tuner starten", "Start tuner");
  btn.classList.toggle("btn-stop", _tuner.running);
  btn.disabled = _tuner.starting;
}

// ---------- Mikrofon ----------
async function startTunerSession() {
  if (_tuner.running || _tuner.starting) return;
  const hasMedia = typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia);
  if (!hasMedia || window.isSecureContext === false) {
    setTunerStatus(tr("Das Mikrofon ist nur über HTTPS oder localhost verfügbar.", "The microphone is only available via HTTPS or localhost."), "warn");
    return;
  }
  _tuner.starting = true;
  syncTunerStartButton();
  setTunerStatus(tr("Mikrofon wird gestartet …", "Starting microphone …"));
  try {
    stopPlayback();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
    });
    if (state.currentView !== "tuner") {
      stream.getTracks().forEach(t => t.stop());
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = _tuner.ctx && _tuner.ctx.state !== "closed" ? _tuner.ctx : new Ctx();
    if (ctx.state === "suspended") await ctx.resume();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 4096;
    analyser.smoothingTimeConstant = 0.55;
    // Stummer Abzweig zum Ausgang hält die Kette in allen Browsern (Safari) aktiv – ohne Rückkopplung
    const sink = ctx.createGain();
    sink.gain.value = 0;
    source.connect(analyser);
    analyser.connect(sink);
    sink.connect(ctx.destination);

    Object.assign(_tuner, {
      ctx, stream, source, analyser, sink,
      timeBuf: new Float32Array(analyser.fftSize),
      freqBuf: new Float32Array(analyser.frequencyBinCount),
      running: true, history: [], smoothCents: null, displayMidi: null,
      lastPitchAt: 0, inTuneSince: 0, inTune: false
    });
    state.tunerStream = stream;
    readTunerColors();
    requestTunerWakeLock();
    setTunerStatus(tr("Spiel oder sing einen Ton …", "Play or sing a note …"));
    document.getElementById("tunerDisplay")?.classList.remove("is-idle");
    _tuner.rafId = requestAnimationFrame(tunerLoop);
  } catch (err) {
    const name = err?.name || "";
    if (name === "NotAllowedError" || name === "SecurityError") {
      setTunerStatus(tr("Mikrofon-Zugriff verweigert – bitte in den Browser- bzw. App-Einstellungen erlauben.", "Microphone access denied — please allow it in your browser or app settings."), "warn");
    } else if (name === "NotFoundError" || name === "OverconstrainedError") {
      setTunerStatus(tr("Kein Mikrofon gefunden.", "No microphone found."), "warn");
    } else {
      setTunerStatus(tr("Das Mikrofon konnte nicht gestartet werden.", "The microphone could not be started."), "warn");
    }
  } finally {
    _tuner.starting = false;
    syncTunerStartButton();
  }
}

function releaseTunerMicStream() {
  const stream = _tuner.stream || state.tunerStream;
  if (stream) {
    try {
      stream.getTracks?.().forEach(track => {
        try { track.stop(); } catch (_) {}
      });
    } catch (_) {}
  }
  try { _tuner.source?.disconnect(); } catch (_) {}
  try { _tuner.analyser?.disconnect(); } catch (_) {}
  try { _tuner.sink?.disconnect(); } catch (_) {}
  _tuner.stream = null;
  _tuner.source = null;
  _tuner.analyser = null;
  _tuner.sink = null;
  state.tunerStream = null;
  // iOS/Safari: Audio-Sitzung nach dem Mikrofon wieder auf reine Wiedergabe stellen, damit
  // Bluetooth-Kopfhörer nicht im (verzerrten) Telefonie-Modus bleiben
  try {
    if (stream && navigator.audioSession && navigator.audioSession.type !== "playback") {
      navigator.audioSession.type = "playback";
    }
  } catch (_) {}
}

function stopTunerSession() {
  _tuner.openDropdown = null;
  if (_tuner.rafId) cancelAnimationFrame(_tuner.rafId);
  _tuner.rafId = 0;
  const wasRunning = _tuner.running;
  _tuner.running = false;
  releaseTunerMicStream();
  stopTunerReference();
  releaseTunerWakeLock();
  if (_tuner.ctx && _tuner.ctx.state !== "closed") {
    const ctx = _tuner.ctx;
    _tuner.ctx = null;
    try { ctx.close(); } catch (_) {}
  }
  const display = document.getElementById("tunerDisplay");
  display?.classList.remove("is-in-tune", "is-sharp", "is-flat", "is-quiet");
  display?.classList.add("is-idle");
  setTunerNeedle(0);
  syncTunerStartButton();
  if (wasRunning) {
    setTunerStatus(tr("Tuner pausiert.", "Tuner paused."));
  }
  if (document.getElementById("tunerSpectrum")) drawTunerSpectrum(0, null, false);
}

async function requestTunerWakeLock() {
  try {
    if (navigator.wakeLock?.request) _tuner.wakeLock = await navigator.wakeLock.request("screen");
  } catch (_) {
    _tuner.wakeLock = null;
  }
}

function releaseTunerWakeLock() {
  try { _tuner.wakeLock?.release?.(); } catch (_) {}
  _tuner.wakeLock = null;
}

// ---------- Messschleife ----------
function tunerLoop() {
  if (!_tuner.running || !_tuner.analyser) return;
  _tuner.rafId = requestAnimationFrame(tunerLoop);
  _tuner.frame += 1;
  const now = performance.now();
  const prefs = getTunerPrefs();
  const inst = TUNER_INSTRUMENTS[prefs.instrument];
  const tol = inst.tolerance || 4;
  const strings = getTunerStrings(prefs);
  const flat = strings.some(st => st.flat);
  const isSingle = prefs.mode === "single";
  const targetMidi = isSingle ? getTunerTargetMidi(prefs) : null;

  // Tonhöhe nur jeden zweiten Frame (~30×/s) – schont Akku & Prozessor
  if (_tuner.frame % 2 === 0) {
    if (now < _tuner.refUntil) {
      setTunerStatus(tr("Referenzton …", "Reference tone …"));
    } else {
      const [minF, maxF] = getTunerRange(prefs);
      _tuner.analyser.getFloatTimeDomainData(_tuner.timeBuf);
      const res = detectTunerPitch(_tuner.timeBuf, _tuner.ctx.sampleRate, minF, maxF);
      if (res.freq && res.clarity >= 0.8) {
        _tuner.history.push(res.freq);
        const histLen = inst.smooth ? 7 : 5;
        while (_tuner.history.length > histLen) _tuner.history.shift();
        const sorted = [..._tuner.history].sort((p, q) => p - q);
        const median = sorted[Math.floor(sorted.length / 2)];
        _tuner.lastFreq = median;
        _tuner.lastClarity = res.clarity;
        _tuner.lastPitchAt = now;
        updateTunerReading(median, res.clarity, { prefs, tol, strings, flat, isSingle, targetMidi, now });
      } else if (now - _tuner.lastPitchAt > TUNER_SILENCE_MS) {
        _tuner.history = [];
        _tuner.smoothCents = null;
        if (_tuner.inTune || _tuner.inTuneSince) {
          _tuner.inTune = false;
          _tuner.inTuneSince = 0;
          document.getElementById("tunerDisplay")?.classList.remove("is-in-tune");
        }
        renderTunerReadout(null);
        setTunerNeedle(0);
        setTunerStatus(tr("Spiel oder sing einen Ton …", "Play or sing a note …"));
      }
    }
  }

  const showFreq = now - _tuner.lastPitchAt <= TUNER_SILENCE_MS ? _tuner.lastFreq : 0;
  drawTunerSpectrum(showFreq, targetMidi !== null ? tunerMidiToFreq(targetMidi, prefs.a4) : null, _tuner.inTune);
}

function updateTunerReading(freq, clarity, ctx) {
  const { prefs, tol, strings, flat, isSingle, targetMidi, now } = ctx;
  const midiFloat = tunerFreqToMidiFloat(freq, prefs.a4);
  const refMidi = isSingle ? targetMidi : Math.round(midiFloat);
  const rawCents = (midiFloat - refMidi) * 100;

  if (_tuner.displayMidi !== refMidi || _tuner.smoothCents === null || Math.abs(rawCents - _tuner.smoothCents) > 50) {
    // Neuer Ton oder großer Sprung: sofort folgen statt langsam hinüberzugleiten
    _tuner.displayMidi = refMidi;
    _tuner.smoothCents = rawCents;
    _tuner.inTuneSince = 0;
  } else {
    const alpha = TUNER_INSTRUMENTS[prefs.instrument].smooth ? 0.18 : 0.32;
    _tuner.smoothCents += alpha * (rawCents - _tuner.smoothCents);
  }
  const cents = _tuner.smoothCents;
  setTunerNeedle(cents);
  renderTunerReadout({ midi: refMidi, cents, freq, flat, tol });

  // Saite, die gerade klingt (±60 Cent)
  const matchString = strings.find(st => Math.abs(midiFloat - st.midi) * 100 <= 60);
  document.querySelectorAll(".tuner-string-chip").forEach(chip => {
    chip.classList.toggle("is-sounding", Boolean(matchString) && Number(chip.dataset.tunerString) === matchString.index);
  });

  // Sauber gestimmt? Kurz halten, dann feiern
  const display = document.getElementById("tunerDisplay");
  const inZone = Math.abs(cents) <= tol && clarity >= 0.88;
  if (inZone) {
    if (!_tuner.inTuneSince) _tuner.inTuneSince = now;
    if (!_tuner.inTune && now - _tuner.inTuneSince >= TUNER_IN_TUNE_HOLD_MS) {
      _tuner.inTune = true;
      if (display) {
        display.classList.remove("is-in-tune");
        void display.offsetWidth;
        display.classList.add("is-in-tune");
      }
      try { navigator.vibrate?.(28); } catch (_) {}
      const tunedString = isSingle ? strings.find(st => st.midi === targetMidi) : matchString;
      if (tunedString && !_tuner.tunedStrings.has(tunedString.index)) {
        _tuner.tunedStrings.add(tunedString.index);
        renderTunerStrings();
      }
    }
  } else if (Math.abs(cents) > tol * 1.6 || clarity < 0.8) {
    _tuner.inTuneSince = 0;
    if (_tuner.inTune) {
      _tuner.inTune = false;
      display?.classList.remove("is-in-tune");
    }
  }

  if (_tuner.inTune) {
    setTunerStatus(tr("Sauber gestimmt!", "Nicely in tune!"), "ok");
  } else if (Math.abs(cents) >= 100) {
    const semis = Math.round(Math.abs(cents) / 100);
    setTunerStatus(cents < 0
      ? tf("Etwa {n} Halbtöne zu tief", "About {n} semitones too low", { n: semis })
      : tf("Etwa {n} Halbtöne zu hoch", "About {n} semitones too high", { n: semis }), "far");
  } else if (cents < -tol) {
    setTunerStatus(tr("Zu tief – etwas höher stimmen", "Too low — tune up a little"), "low");
  } else if (cents > tol) {
    setTunerStatus(tr("Zu hoch – etwas tiefer stimmen", "Too high — tune down a little"), "high");
  } else {
    setTunerStatus(tr("Fast da – Ton ruhig halten …", "Almost there — hold the note steady …"), "near");
  }
}

// ---------- Referenzton ----------
function stopTunerReference() {
  const nodes = _tuner.refNodes;
  _tuner.refNodes = null;
  _tuner.refUntil = 0;
  if (!nodes) return;
  try {
    const t = nodes.ctx.currentTime;
    nodes.gain.gain.cancelScheduledValues(t);
    nodes.gain.gain.setTargetAtTime(0, t, 0.03);
    nodes.oscs.forEach(o => { try { o.stop(t + 0.2); } catch (_) {} });
    if (nodes.ownCtx) setTimeout(() => { try { nodes.ctx.close(); } catch (_) {} }, 400);
  } catch (_) {}
}

async function playTunerReference(midi) {
  stopTunerReference();
  const prefs = getTunerPrefs();
  const freq = tunerMidiToFreq(midi, prefs.a4);
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  const ownCtx = !(_tuner.ctx && _tuner.ctx.state !== "closed");
  const ctx = ownCtx ? new Ctx() : _tuner.ctx;
  try { if (ctx.state === "suspended") await ctx.resume(); } catch (_) {}
  const dur = 2.2;
  const t0 = ctx.currentTime + 0.02;
  const gain = ctx.createGain();
  const vol = state.master?.muted ? 0 : Math.max(0.05, Math.min(1, state.master?.volume ?? 0.67)) * 0.34;
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.04);
  gain.gain.setTargetAtTime(vol * 0.72, t0 + 0.25, 0.4);
  gain.gain.setTargetAtTime(0.0001, t0 + dur - 0.35, 0.12);
  gain.connect(ctx.destination);
  // Warmer, klar ortbarer Ton: Grundton + leise Obertöne
  const oscs = [[1, 1], [2, 0.28], [3, 0.1]].map(([mult, amp]) => {
    const o = ctx.createOscillator();
    const og = ctx.createGain();
    o.type = "sine";
    o.frequency.value = freq * mult;
    og.gain.value = amp;
    o.connect(og);
    og.connect(gain);
    o.start(t0);
    o.stop(t0 + dur + 0.1);
    return o;
  });
  _tuner.refNodes = { ctx, gain, oscs, ownCtx };
  _tuner.refUntil = performance.now() + (dur + 0.25) * 1000;
  const btn = document.getElementById("tunerRefBtn");
  btn?.classList.add("is-playing");
  setTimeout(() => {
    btn?.classList.remove("is-playing");
    if (_tuner.refNodes?.oscs === oscs) {
      _tuner.refNodes = null;
      if (ownCtx) { try { ctx.close(); } catch (_) {} }
    }
  }, (dur + 0.2) * 1000);
}

function getTunerReferenceMidi() {
  const prefs = getTunerPrefs();
  if (prefs.mode === "single") return getTunerTargetMidi(prefs);
  if (_tuner.displayMidi !== null && _tuner.running && performance.now() - _tuner.lastPitchAt < 4000) return _tuner.displayMidi;
  const strings = getTunerStrings(prefs);
  return strings.length ? strings[0].midi : 69;
}

// ---------- Ansicht & Bedienung ----------
function renderTunerPreviewView() {
  renderTunerView();
}

function renderTunerView() {
  if (!_tuner.gaugeBuilt) buildTunerGauge();
  updateTunerGaugeViewBox();
  bindTunerControls();
  syncTunerSetupUI();
  syncTunerStartButton();
  readTunerColors();
  const noticeEl = document.getElementById("tunerSecureContextNotice");
  const hasMedia = typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia);
  const isSecure = typeof window === "undefined" || window.isSecureContext !== false;
  if (noticeEl) {
    noticeEl.classList.toggle("hidden", isSecure && hasMedia);
    noticeEl.classList.add("is-warning");
    noticeEl.textContent = tr(
      "Hinweis: Das Mikrofon funktioniert nur über HTTPS oder http://localhost – auf file:// oder unverschlüsseltem LAN-HTTP blockieren Browser den Zugriff.",
      "Note: The microphone only works via HTTPS or http://localhost — browsers block access on file:// or unencrypted LAN HTTP."
    );
  }
  if (!_tuner.running) {
    setTunerStatus(tr("Tippe auf „Tuner starten“ – beim ersten Mal fragt dein Gerät nach dem Mikrofon.", "Tap “Start tuner” — your device asks for microphone access the first time."));
    drawTunerSpectrum(0, null, false);
  }
}

function bindTunerControls() {
  const root = document.getElementById("viewTuner");
  if (!root || root._tunerBound) return;
  root._tunerBound = true;

  document.getElementById("tunerStartBtn")?.addEventListener("click", () => {
    if (_tuner.running) stopTunerSession();
    else startTunerSession();
  });
  // Auswahllisten schließen bei Klick daneben oder Escape
  document.addEventListener("click", (e) => {
    if (!_tuner.openDropdown) return;
    if (e.target?.closest?.("[data-tuner-dropdown]")) return;
    closeTunerDropdowns();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && _tuner.openDropdown) closeTunerDropdowns();
  });
  document.querySelectorAll("[data-tuner-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      setTunerPrefs({ mode: btn.dataset.tunerMode === "single" ? "single" : "auto" });
      _tuner.displayMidi = null;
      syncTunerSetupUI();
    });
  });
  document.getElementById("tunerStringsRow")?.addEventListener("click", (e) => {
    const chip = e.target.closest?.("[data-tuner-string]");
    if (!chip) return;
    const st = getTunerStrings()[Number(chip.dataset.tunerString)];
    if (!st) return;
    // Saite antippen = gezielt diese Saite stimmen
    setTunerPrefs({ mode: "single", targetMidi: st.midi });
    _tuner.displayMidi = null;
    syncTunerSetupUI();
  });
  const stepTarget = (delta) => {
    const prefs = getTunerPrefs();
    setTunerPrefs({ targetMidi: Math.max(24, Math.min(96, (prefs.targetMidi || 69) + delta)) });
    _tuner.displayMidi = null;
    syncTunerSetupUI();
  };
  document.getElementById("tunerNoteDownBtn")?.addEventListener("click", () => stepTarget(-1));
  document.getElementById("tunerNoteUpBtn")?.addEventListener("click", () => stepTarget(1));
  const stepA4 = (delta) => {
    const prefs = getTunerPrefs();
    setTunerPrefs({ a4: Math.max(TUNER_A4_MIN, Math.min(TUNER_A4_MAX, prefs.a4 + delta)) });
    syncTunerSetupUI();
  };
  document.getElementById("tunerA4DownBtn")?.addEventListener("click", () => stepA4(-1));
  document.getElementById("tunerA4UpBtn")?.addEventListener("click", () => stepA4(1));
  document.getElementById("tunerRefBtn")?.addEventListener("click", () => {
    if (_tuner.refNodes) {
      stopTunerReference();
      document.getElementById("tunerRefBtn")?.classList.remove("is-playing");
      return;
    }
    playTunerReference(getTunerReferenceMidi());
  });
  // Zeigerinstrument bei Größenänderung neu zuschneiden
  if (typeof ResizeObserver === "function") {
    const gauge = document.getElementById("tunerGauge");
    if (gauge) new ResizeObserver(() => updateTunerGaugeViewBox()).observe(gauge);
  } else {
    window.addEventListener("resize", updateTunerGaugeViewBox);
  }
  // Mobile Browser: beim Wechsel in den Hintergrund Mikrofon freigeben
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && _tuner.running) stopTunerSession();
  });
}

