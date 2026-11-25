#!/usr/bin/env node
/**
 * Lauscher • Automatisierte Logik-Tests (ohne npm / externe Abhängigkeiten).
 *
 * Lädt die App-Skripte in exakter index.html-Reihenfolge (ohne Audio-Samples)
 * in eine isolierte Node-VM und prüft:
 *   1. Tuner-DSP & Pitch-Erkennung (synthetische Signale inkl. Tiefton-Dezimierung)
 *   2. Alle Übungs-Generatoren über sämtliche Modi und Stufen + Sitzungs-Gedächtnis
 *   3. Rhythmus-Tap-Auswertung & Notations-/Akkord-Helfer
 *   4. Nashville Number System & Tonarten-/Transpositions-Helfer
 *   5. Lokales Meilenstein-System (Achievements)
 *
 * Aufruf:
 *   node scripts/run-tests.js
 */

"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");

function createStubElement() {
  const attrs = new Map();
  const classes = new Set();
  const styleMap = new Map();
  const el = {
    tagName: "DIV",
    id: "",
    innerHTML: "",
    textContent: "",
    value: "",
    checked: false,
    disabled: false,
    hidden: false,
    dataset: {},
    clientWidth: 390,
    clientHeight: 700,
    scrollWidth: 390,
    scrollHeight: 700,
    offsetWidth: 390,
    offsetHeight: 700,
    children: [],
    childNodes: [],
    parentElement: null,
    classList: {
      add(...names) { names.forEach(n => classes.add(n)); },
      remove(...names) { names.forEach(n => classes.delete(n)); },
      toggle(n, force) {
        if (force === undefined) {
          if (classes.has(n)) { classes.delete(n); return false; }
          classes.add(n); return true;
        }
        if (force) classes.add(n); else classes.delete(n);
        return Boolean(force);
      },
      contains(n) { return classes.has(n); }
    },
    style: {
      setProperty(k, v) { styleMap.set(k, String(v)); },
      removeProperty(k) { styleMap.delete(k); },
      getPropertyValue(k) { return styleMap.get(k) || ""; }
    },
    setAttribute(k, v) { attrs.set(k, String(v)); },
    getAttribute(k) { return attrs.has(k) ? attrs.get(k) : null; },
    removeAttribute(k) { attrs.delete(k); },
    hasAttribute(k) { return attrs.has(k); },
    addEventListener() {},
    removeEventListener() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    closest() { return null; },
    appendChild(child) { this.children.push(child); return child; },
    removeChild(child) { return child; },
    insertBefore(child) { this.children.push(child); return child; },
    replaceChildren(...nodes) { this.children = nodes; },
    getBoundingClientRect() { return { top: 0, left: 0, width: 390, height: 80, right: 390, bottom: 80 }; },
    focus() {},
    blur() {},
    click() {},
    scrollIntoView() {}
  };
  return el;
}

function loadAppSandbox() {
  const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const scriptRe = /<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g;
  const scripts = [];
  let match;
  while ((match = scriptRe.exec(indexHtml)) !== null) {
    const src = match[1];
    if (/^(https?:|\/\/|data:)/i.test(src)) continue;
    if (src.startsWith("samples/")) continue;
    scripts.push(src);
  }

  const storage = new Map();
  const docEl = createStubElement();
  const bodyEl = createStubElement();
  const headEl = createStubElement();

  const sandbox = {
    console,
    Math, Date, JSON, Object, Array, Map, Set, Number, String, Boolean, RegExp, Error, TypeError, RangeError, Promise,
    parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent,
    Float32Array, Float64Array, Int16Array, Int32Array, Uint8Array, Uint16Array, Uint32Array,
    setTimeout: () => 0,
    clearTimeout() {},
    setInterval: () => 0,
    clearInterval() {},
    requestAnimationFrame: () => 0,
    cancelAnimationFrame() {},
    performance: { now: () => 1000 },
    navigator: { language: "de-DE", languages: ["de-DE"], userAgent: "lauscher-test" },
    localStorage: {
      getItem: (k) => (storage.has(k) ? storage.get(k) : null),
      setItem: (k, v) => { storage.set(k, String(v)); },
      removeItem: (k) => { storage.delete(k); },
      clear: () => { storage.clear(); }
    },
    document: {
      readyState: "complete",
      documentElement: docEl,
      body: bodyEl,
      head: headEl,
      addEventListener() {},
      removeEventListener() {},
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      createElement: () => createStubElement(),
      createTextNode: (t) => ({ nodeType: 3, textContent: String(t) })
    },
    window: {
      addEventListener() {},
      removeEventListener() {},
      matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
      history: { pushState() {}, replaceState() {}, back() {} },
      location: { protocol: "https:", hostname: "jbkstr.github.io", hash: "", search: "", href: "https://jbkstr.github.io/lauscher/" },
      innerWidth: 390,
      innerHeight: 844,
      devicePixelRatio: 2
    },
    ResizeObserver: class { observe() {} unobserve() {} disconnect() {} },
    MutationObserver: class { observe() {} disconnect() {} }
  };

  sandbox.globalThis = sandbox;
  sandbox.self = sandbox;
  sandbox.window.document = sandbox.document;
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.window.navigator = sandbox.navigator;

  vm.createContext(sandbox);
  for (const rel of scripts) {
    const code = fs.readFileSync(path.join(ROOT, rel), "utf8");
    vm.runInContext(code, sandbox, { filename: rel });
  }
  return sandbox;
}

function makeHarmonicSignal(freqHz, sampleRate, length, harmonics = [1.0, 0.55, 0.3, 0.15]) {
  const buf = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    let sum = 0;
    for (let h = 0; h < harmonics.length; h++) {
      sum += harmonics[h] * Math.sin(2 * Math.PI * freqHz * (h + 1) * t);
    }
    buf[i] = sum * 0.25;
  }
  return buf;
}

function centsDiff(measuredHz, expectedHz) {
  return 1200 * Math.log2(measuredHz / expectedHz);
}

const results = [];
function runTest(name, fn) {
  try {
    fn();
    results.push({ name, ok: true });
  } catch (err) {
    results.push({ name, ok: false, err });
  }
}

const sb = loadAppSandbox();
const getLex = (expr) => vm.runInContext(expr, sb);
const appState = getLex("state");
const TUNER_A4_MAX = getLex("TUNER_A4_MAX");
const TunerLowFreqDownsampler = getLex("TunerLowFreqDownsampler");

// =====================================================
// 1. Tuner-DSP & Pitch-Erkennung
// =====================================================
runTest("Tuner-DSP: Noten/MIDI/Frequenz-Umrechnung & Kalibrierung", () => {
  assert.equal(sb.tunerNoteToMidi("A4"), 69);
  assert.equal(sb.tunerNoteToMidi("C4"), 60);
  assert.equal(sb.tunerNoteToMidi("E2"), 40);
  assert.equal(sb.tunerNoteToMidi("E1"), 28);
  assert.equal(sb.tunerNoteToMidi("Bb3"), 58);
  assert.equal(sb.tunerNoteToMidi("F#4"), 66);

  assert.ok(Math.abs(sb.tunerMidiToFreq(69, 440) - 440) < 1e-6);
  assert.ok(Math.abs(sb.tunerMidiToFreq(69, 442) - 442) < 1e-6);
  assert.ok(Math.abs(sb.tunerMidiToFreq(57, 440) - 220) < 1e-6);
  assert.ok(Math.abs(sb.tunerFreqToMidiFloat(440, 440) - 69) < 1e-6);
  assert.ok(Math.abs(sb.tunerFreqToMidiFloat(82.406889, 440) - 40) < 1e-3);

  const prefs = sb.sanitizeTunerPrefs({ a4: 999, instrument: "nicht-existent", transposition: "Bb" });
  assert.equal(prefs.a4, TUNER_A4_MAX);
  assert.equal(prefs.instrument, undefined);
  assert.equal(prefs.transposition, "Bb");
  assert.equal(sb.getTunerTranspositionSemis(prefs), 0);
  const transpPrefs = sb.sanitizeTunerPrefs({ a4: 440, instrument: "chromatic", transposition: "Bb" });
  assert.equal(sb.getTunerTranspositionSemis(transpPrefs), 2);
  const validPrefs = sb.sanitizeTunerPrefs({ a4: 440, instrument: "guitar", displayMode: "strobe" });
  assert.equal(validPrefs.instrument, "guitar");
  assert.equal(validPrefs.displayMode, "strobe");
});

runTest("Tuner-DSP: Biquad-Koeffizienten & Tiefton-Dezimierung", () => {
  const lp = sb.computeTunerBiquadCoeffs("lowpass", 420, 0.7071, 48000);
  const hp = sb.computeTunerBiquadCoeffs("highpass", 30, 0.7071, 48000);
  for (const coeff of [lp.b0, lp.b1, lp.b2, lp.a1, lp.a2, hp.b0, hp.b1, hp.b2, hp.a1, hp.a2]) {
    assert.ok(Number.isFinite(coeff), "Biquad-Koeffizient nicht endlich");
  }
  const ds = new TunerLowFreqDownsampler();
  const sig = makeHarmonicSignal(41.2034, 48000, 8192);
  const res = ds.process(sig, 48000);
  assert.equal(res.factor, 4);
  assert.equal(res.sampleRate, 12000);
  assert.equal(res.length, 2048);
});

runTest("Tuner-Pitch: A4 (440 Hz), Gitarre E2 (82,41 Hz), Bass E1 (41,20 Hz) & Stille", () => {
  const sr = 48000;
  const winLen = 8192;

  const cases = [
    { label: "A4 chromatisch", freq: 440.0, profileKey: "chromatic", minF: 27, maxF: 4200, maxCents: 2.0 },
    { label: "Gitarre E2",     freq: 82.4069, profileKey: "guitar",  minF: 60, maxF: 1200, maxCents: 2.5 },
    { label: "Gitarre G3",     freq: 195.9977, profileKey: "guitar", minF: 60, maxF: 1200, maxCents: 2.0 },
    { label: "Bass E1",        freq: 41.2034, profileKey: "bass",    minF: 27, maxF: 400,  maxCents: 3.5 }
  ];

  for (const c of cases) {
    const signal = makeHarmonicSignal(c.freq, sr, winLen);
    const prep = sb.prepareTunerMainWorkBuffer(signal, sr);
    const profile = sb.getTunerDspProfile(c.profileKey);
    const detected = sb.detectTunerPitchWithProfile(signal, sr, prep, c.minF, c.maxF, profile, 0);
    assert.ok(detected.freq > 0, `${c.label}: keine Frequenz erkannt`);
    const errCents = Math.abs(centsDiff(detected.freq, c.freq));
    assert.ok(errCents <= c.maxCents, `${c.label}: ${detected.freq.toFixed(2)} Hz statt ${c.freq} Hz (${errCents.toFixed(2)} Cent)`);
  }

  // Stille darf keinen Ton erkennen
  const silence = new Float32Array(winLen);
  const prepSilence = sb.prepareTunerMainWorkBuffer(silence, sr);
  const resSilence = sb.detectTunerPitchWithProfile(silence, sr, prepSilence, 27, 4200, sb.getTunerDspProfile("chromatic"), 0);
  assert.equal(resSilence.freq, 0);
});

// =====================================================
// 2. Übungs-Generatoren & Sitzungs-Gedächtnis
// =====================================================
runTest("Übungs-Generatoren: alle Modi über mehrere Stufen ohne Fehler & valide Daten", () => {
  // UI-Rendern im headless Test als No-Op stubben (getestet wird hier die reine Generator-Logik)
  sb.renderUI = () => {};

  const modeMatrix = [
    { mode: "cadence",             levelKey: "difficulty",            levels: [1, 2, 3, 4] },
    { mode: "cadence-minor",       levelKey: "difficulty",            levels: [1, 2, 3, 4] },
    { mode: "intervals-melodic",   levelKey: "intervalDifficulty",    levels: [1, 2, 3, 4, 5] },
    { mode: "intervals-harmonic",  levelKey: "intervalDifficulty",    levels: [1, 2, 3, 4, 5] },
    { mode: "intervals-custom",    levelKey: "intervalDifficulty",    levels: [1] },
    { mode: "interval-chords",     levelKey: "chordDifficulty",       levels: [1, 2, 3] },
    { mode: "interval-chords-arp", levelKey: "chordDifficulty",       levels: [1, 2, 3] },
    { mode: "chord-inversions",    levelKey: "chordInversionDifficulty", levels: [1, 2, 3] },
    { mode: "solfege",             levelKey: "solfegeDifficulty",     levels: [1, 2, 3, 4, 5] },
    { mode: "melody",              levelKey: "melodyDifficulty",      levels: [1, 2, 3, 4, 5] },
    { mode: "rhythm-meter",        levelKey: "rhythmMeterDifficulty", levels: [1, 2, 3] },
    { mode: "rhythm-dictation",    levelKey: "rhythmDictationDifficulty", levels: [1, 2, 3] },
    { mode: "rhythm-tap",          levelKey: "rhythmTapDifficulty",   levels: [1, 2, 3] },
    { mode: "rhythm-groove",       levelKey: "rhythmGrooveDifficulty", levels: [1, 2, 3] },
    { mode: "prod-tone",           levelKey: "prodToneDifficulty",    levels: [1, 2, 3] },
    { mode: "prod-eq-noise",       levelKey: "prodEqNoiseDifficulty", levels: [1, 2, 3] },
    { mode: "modes-scale",         levelKey: "modesScaleDifficulty",  levels: [1, 2, 3] },
    { mode: "modes-char",          levelKey: "modesCharDifficulty",   levels: [1, 2, 3] },
    { mode: "modes-cadence",       levelKey: "modesCadenceDifficulty", levels: [1, 2] },
    { mode: "notation-treble",     levelKey: "notationDifficulty",    levels: [1, 2, 3, 4] },
    { mode: "notation-bass",       levelKey: "notationDifficulty",    levels: [1, 2, 3, 4] },
    { mode: "notation-grand",      levelKey: "notationDifficulty",    levels: [1, 2, 3, 4] },
    { mode: "notation-chords",     levelKey: "notationChordsDifficulty", levels: [1, 2, 3] },
    { mode: "notation-symbols",    levelKey: "notationSymbolsDifficulty", levels: [1, 2, 3] }
  ];

  let generatedCount = 0;
  for (const spec of modeMatrix) {
    for (const lvl of spec.levels) {
      appState.settings.mode = spec.mode;
      appState.settings[spec.levelKey] = lvl;
      for (let i = 0; i < 4; i++) {
        sb.generateExercise();
        const ex = appState.currentExercise;
        assert.ok(ex && typeof ex === "object", `${spec.mode} L${lvl}: currentExercise fehlt`);
        assert.ok(typeof ex.type === "string" && ex.type.length > 0, `${spec.mode} L${lvl}: ex.type fehlt`);
        if (Array.isArray(ex.choices) && ex.choices.length > 0) {
          const targetKey = ex.targetKey ?? ex.correctKey ?? ex.target;
          if (typeof targetKey === "string") {
            assert.ok(
              ex.choices.includes(targetKey),
              `${spec.mode} L${lvl}: Ziel "${targetKey}" nicht in choices [${ex.choices.join(", ")}]`
            );
          }
        }
        generatedCount++;
      }
    }
  }
  assert.ok(generatedCount >= 250, `Erwartet >= 250 generierte Aufgaben, erhalten: ${generatedCount}`);
});

runTest("Sitzungs-Gedächtnis: Fehler merken, herunterzählen & erfolgreich abhaken", () => {
  const scope = "__unit_test_scope__";
  sb.rememberSessionMistake(scope, "M3");
  const bucket = sb.getSessionReviewBucket(scope, false);
  assert.ok(bucket && bucket.has("M3"), "Fehlereintrag wurde nicht angelegt");

  // Runterzählen bis überfällig (sicheres Einstreuen)
  for (let i = 0; i < 10; i++) {
    sb.tickSessionReview(scope);
  }
  const picked = sb.pickSessionReviewKey(scope, ["m2", "M2", "m3", "M3"], "m2");
  assert.equal(picked, "M3");

  // Zwei Treffer räumen den Eintrag ab (hitsNeeded = 2)
  sb.recordSessionReviewSuccess(scope, "M3");
  sb.recordSessionReviewSuccess(scope, "M3");
  assert.equal(Boolean(sb.getSessionReviewBucket(scope, false)?.has("M3")), false);
});

runTest("Sitzungs-Gedächtnis: Kadenzen, Taktart & Produktion holen Verwechseltes zurück", () => {
  sb.renderUI = () => {};
  const specs = [
    { mode: "cadence",       levelKey: "difficulty",            level: 1, extra: { cadencePos: "end" } },
    { mode: "cadence",       levelKey: "difficulty",            level: 1, extra: { cadencePos: "random" } },
    { mode: "cadence",       levelKey: "difficulty",            level: 3, extra: { cadencePos: "end" } },
    { mode: "cadence-minor", levelKey: "difficulty",            level: 4, extra: { cadencePos: "random" } },
    { mode: "rhythm-meter",  levelKey: "rhythmMeterDifficulty", level: 3 },
    { mode: "prod-tone",     levelKey: "prodToneDifficulty",    level: 3 },
    { mode: "prod-eq-noise", levelKey: "prodEqNoiseDifficulty", level: 3 }
  ];
  const prevCadencePos = appState.settings.cadencePos;
  for (const spec of specs) {
    const label = `${spec.mode} L${spec.level} ${spec.extra?.cadencePos || ""}`.trim();
    appState.settings.mode = spec.mode;
    appState.settings[spec.levelKey] = spec.level;
    Object.assign(appState.settings, spec.extra || {});
    // Mehrere Durchläufe, weil die Auswahl zufällig ist
    for (let run = 0; run < 15; run++) {
      sb.generateExercise();
      const missed = appState.currentExercise;
      sb.getSessionReviewBucket(missed.reviewScope, false)?.clear(); // jeder Durchlauf für sich
      assert.ok(missed.reviewScope && missed.reviewKey != null, `${label}: reviewScope/reviewKey fehlt`);
      assert.equal(missed.reviewKey, missed.targetItem.key, `${label}: reviewKey ≠ Zielantwort`);
      sb.noteSessionReviewAnswer(missed, false);

      let backAt = -1;
      for (let i = 1; i <= 6; i++) {
        sb.generateExercise();
        const ex = appState.currentExercise;
        if (ex.targetItem.key === missed.reviewKey) {
          if (i === 1) assert.fail(`${label}: Verwechseltes kam direkt in der nächsten Aufgabe`);
          backAt = i;
          sb.noteSessionReviewAnswer(ex, true);
          break;
        }
        sb.noteSessionReviewAnswer(ex, true);
      }
      assert.ok(backAt > 1, `${label}: "${missed.reviewKey}" kam in 6 Aufgaben nicht wieder`);
    }
    sb.getSessionReviewBucket(appState.currentExercise.reviewScope, false)?.clear();
  }
  appState.settings.cadencePos = prevCadencePos;
});

runTest("Sitzungs-Gedächtnis: einmal pro Aufgabe zählen, Moll-Solfège & nur Erstversuch", () => {
  sb.renderUI = () => {};

  // Notationssymbole: Wartezeit sinkt pro Aufgabe um genau 1
  appState.settings.mode = "notation-symbols";
  appState.settings.notationDifficulty = 2;
  sb.generateExercise();
  const symScope = appState.currentExercise.reviewScope;
  sb.rememberSessionMistake(symScope, "__probe__");
  const probe = sb.getSessionReviewBucket(symScope, false).get("__probe__");
  const waitBefore = probe.wait;
  sb.generateExercise();
  assert.equal(probe.wait, waitBefore - 1, "Notationssymbole zählen die Wartezeit doppelt herunter");
  sb.getSessionReviewBucket(symScope, false).clear();

  // Nur der erste Versuch zählt: falsch, dann richtig → kein Treffer gutgeschrieben
  const ex = appState.currentExercise;
  sb.noteSessionReviewAnswer(ex, false);
  sb.noteSessionReviewAnswer(ex, true);
  assert.equal(sb.getSessionReviewBucket(symScope, false).get(ex.reviewKey).hits, 0);
  sb.getSessionReviewBucket(symScope, false).clear();

  // Moll-Solfège: ein überfälliger Fehler kommt nie direkt nach derselben Stufe
  appState.settings.mode = "solfege";
  appState.settings.solfegeDifficulty = 11;
  for (let run = 0; run < 20; run++) {
    sb.generateExercise();
    const prev = appState.currentExercise;
    assert.equal(prev.reviewScope, "solfege-minor");
    sb.rememberSessionMistake("solfege-minor", prev.reviewKey);
    const entry = sb.getSessionReviewBucket("solfege-minor", false).get(prev.reviewKey);
    entry.wait = -5; // überfällig → würde sicher eingestreut
    sb.generateExercise();
    assert.notEqual(appState.currentExercise.reviewKey, prev.reviewKey, "Moll-Solfège wiederholt die Stufe direkt");
    sb.getSessionReviewBucket("solfege-minor", false)?.clear();
  }

  // Prüfungen zählen die Wartezeit nicht herunter
  sb.rememberSessionMistake("__exam_scope__", "A");
  const examEntry = sb.getSessionReviewBucket("__exam_scope__", false).get("A");
  const examWait = examEntry.wait;
  const prevExam = appState.exam;
  appState.exam = { active: true };
  sb.tickSessionReview("__exam_scope__");
  appState.exam = prevExam;
  assert.equal(examEntry.wait, examWait);
  sb.getSessionReviewBucket("__exam_scope__", false).clear();
});

runTest("Sitzungs-Gedächtnis: Kontrast, wachsende Abstände & Platz schaffen", () => {
  appState.exam = null;
  const scope = "__unit_contrast__";
  const ex = { reviewScope: scope, reviewKey: "M6" };
  sb.noteSessionReviewAnswer(ex, false, "m6");
  sb.noteSessionReviewAnswer(ex, false, "P5"); // zweiter Fehlversuch zählt nicht
  const bucket = sb.getSessionReviewBucket(scope, false);
  assert.ok(bucket.has("M6") && bucket.has("m6"), "Ziel und gewählte Antwort fehlen im Gedächtnis");
  assert.equal(bucket.has("P5"), false, "nur der erste Fehlversuch liefert den Kontrast");
  assert.equal(bucket.get("m6").contrast, true);
  assert.ok(bucket.get("M6").wait >= 2 && bucket.get("M6").wait <= 3);

  // Echte Fehler kommen vor Kontrast-Einträgen dran
  bucket.forEach(e => { e.wait = -5; });
  assert.equal(sb.pickSessionReviewKey(scope, ["M6", "m6", "P5", "P4"], null), "M6");

  // Kontrast: ein Treffer genügt
  sb.recordSessionReviewSuccess(scope, "m6");
  assert.equal(bucket.has("m6"), false);

  // Ein Kontrast-Eintrag schwächt einen echten Fehler nicht ab
  sb.rememberSessionMistake(scope, "M6", null, false, { contrast: true });
  assert.equal(bucket.get("M6").contrast, false);

  // Wachsender Abstand: nach dem 1. Treffer 5–8 Aufgaben, mehrfach Verwechseltes braucht 3 Treffer
  sb.rememberSessionMistake(scope, "M6"); // 2. Fehler → misses = 2
  const m6 = bucket.get("M6");
  assert.equal(m6.misses >= 2, true);
  sb.recordSessionReviewSuccess(scope, "M6");
  assert.ok(m6.wait >= 5 && m6.wait <= 8, `Abstand nach 1. Treffer: ${m6.wait}`);
  sb.recordSessionReviewSuccess(scope, "M6");
  assert.ok(bucket.has("M6"), "mehrfach Verwechseltes braucht 3 Treffer");
  assert.ok(m6.wait >= 8 && m6.wait <= 11, `Abstand nach 2. Treffer: ${m6.wait}`);
  sb.recordSessionReviewSuccess(scope, "M6");
  assert.equal(Boolean(sb.getSessionReviewBucket(scope, false)?.has("M6")), false);

  // Platz schaffen: Kontrast und fast Gelerntes gehen vor frischen Fehlern
  ["a", "b", "c", "d", "e"].forEach(k => sb.rememberSessionMistake(scope, k));
  sb.recordSessionReviewSuccess(scope, "b");
  sb.rememberSessionMistake(scope, "x", null, false, { contrast: true });
  sb.rememberSessionMistake(scope, "f"); // 7 Einträge → x (Kontrast) fliegt
  const b2 = sb.getSessionReviewBucket(scope, false);
  assert.equal(b2.has("x"), false);
  sb.rememberSessionMistake(scope, "g"); // → b (schon ein Treffer) fliegt
  assert.equal(b2.has("b"), false);
  assert.ok(["a", "c", "d", "e", "f", "g"].every(k => b2.has(k)));
  sb.clearSessionReviewMemory();

  // Kleiner Pool, alles wartet: nie die vorige Aufgabe
  sb.rememberSessionMistake(scope, "I");
  sb.rememberSessionMistake(scope, "IV");
  sb.rememberSessionMistake(scope, "V");
  const freeKeys = Array.from(sb.filterCoolingSessionReviewKeys(scope, ["I", "IV", "V"], "I"));
  assert.equal(freeKeys.includes("I"), false);
  sb.clearSessionReviewMemory();
});

runTest("Schwächen-Gewichte: lernen, abklingen, gewichtet ziehen & sichern", () => {
  appState.exam = null;
  const profileBackup = appState.profile;
  appState.profile = sb.createDefaultProfile();
  const scope = "interval-melodic";

  sb.noteSessionReviewAnswer({ reviewScope: scope, reviewKey: "M6" }, false, "m6");
  assert.equal(sb.getReviewWeight(scope, "M6"), 1);
  assert.equal(sb.getReviewWeight(scope, "m6"), 0.5);
  sb.noteSessionReviewAnswer({ reviewScope: scope, reviewKey: "m6" }, true);
  assert.equal(sb.getReviewWeight(scope, "m6"), 0, "Treffer auf Anhieb baut die Schwäche ab");
  assert.equal(appState.profile.reviewWeights[scope].m6, undefined);

  // Abklingen: nach 4 Tagen die Hälfte, nach 2 Wochen weg (beim Laden aufgeräumt)
  const today = sb.getReviewWeightDay();
  assert.ok(Math.abs(sb.getEffectiveReviewWeight([2, today - 4], today) - 1) < 1e-9);
  const loaded = sb.sanitizeReviewWeights({
    "interval-melodic": { M6: [2, today - 1], P4: [1, today - 20], "<bad>": "x" },
    "BAD SCOPE": { a: [1, today] },
    "notation-symbols:2": { "term:presto": [9, today] }
  });
  assert.ok(loaded["interval-melodic"].M6);
  assert.equal(loaded["interval-melodic"].P4, undefined);
  assert.equal(loaded["BAD SCOPE"], undefined);
  assert.equal(loaded["notation-symbols:2"]["term:presto"][0], 4, "Gewicht wird auf das Maximum begrenzt");

  // Gewichtete Auswahl: Schwaches kommt deutlich öfter, in Prüfungen gleich verteilt
  appState.profile.reviewWeights = { [scope]: { M6: [4, today] } };
  const pool = ["P1", "M3", "P5", "M6"];
  const count = (n) => { let c = 0; for (let i = 0; i < n; i++) if (sb.pickWeightedReviewItem(scope, pool) === "M6") c++; return c / n; };
  const share = count(4000);
  assert.ok(share > 0.45 && share < 0.65, `Anteil des schwachen Elements: ${share}`); // erwartet 4/7 ≈ 0,57
  appState.exam = { active: true };
  const examShare = count(4000);
  appState.exam = null;
  assert.ok(examShare > 0.18 && examShare < 0.32, `Prüfung nicht gleich verteilt: ${examShare}`);

  // Prüfungsantworten verändern keine Gewichte
  appState.exam = { active: true };
  sb.noteSessionReviewAnswer({ reviewScope: scope, reviewKey: "P1" }, false, "M3");
  appState.exam = null;
  assert.equal(sb.getReviewWeight(scope, "P1"), 0);

  // Sicherung: Gewichte wandern mit; alte Sicherungen ohne Feld behalten die aktuellen
  const json = sb.exportUserProfileJSON();
  assert.ok(JSON.parse(json).profile.reviewWeights[scope].M6);
  appState.profile = sb.createDefaultProfile();
  sb.importUserProfileJSON(json);
  assert.ok(sb.getReviewWeight(scope, "M6") > 3.9);
  const oldBackup = JSON.parse(json);
  delete oldBackup.profile.reviewWeights;
  sb.importUserProfileJSON(JSON.stringify(oldBackup));
  assert.ok(sb.getReviewWeight(scope, "M6") > 3.9, "Import ohne Gewichte löscht die aktuellen");

  // Konto zurücksetzen leert Gewichte und Sitzungs-Gedächtnis
  sb.rememberSessionMistake(scope, "M6");
  sb.resetUserProfile();
  assert.equal(sb.getReviewWeight(scope, "M6"), 0);
  assert.equal(sb.getSessionReviewBucket(scope, false), null);

  appState.profile = profileBackup;
  sb.clearSessionReviewMemory();
});

// =====================================================
// 3. Rhythmus-Auswertung & Notations-/Akkord-Helfer
// =====================================================
runTest("Rhythmus-Tap-Auswertung: exakt, knapp, verpasst und Extra-Taps", () => {
  const expected = [{ relMs: 0 }, { relMs: 500 }, { relMs: 1000 }, { relMs: 1500 }];

  const exact = sb.evaluateRhythmTaps(expected, [5, 495, 1008, 1492], 120);
  assert.equal(exact.passed, true);
  assert.equal(exact.exactCount, 4);
  assert.equal(exact.missedCount, 0);
  assert.equal(exact.extraCount, 0);

  const close = sb.evaluateRhythmTaps(expected, [0, 595, 1000, 1500], 120);
  assert.equal(close.passed, true);
  assert.equal(close.closeCount, 1);

  const missed = sb.evaluateRhythmTaps(expected, [0, 500, 1500], 120);
  assert.equal(missed.passed, false);
  assert.equal(missed.missedCount, 1);

  const extra = sb.evaluateRhythmTaps(expected, [0, 250, 500, 1000, 1500], 120);
  assert.equal(extra.passed, false);
  assert.equal(extra.extraCount, 1);
});

runTest("Notation & Akkorde: MIDI-Namen, deutsches H/B, Hilfslinien & Umkehrungen", () => {
  assert.equal(sb.midiToNote(60), "C4");
  assert.equal(sb.midiToNote(69), "A4");

  appState.settings.language = "de";
  assert.equal(sb.midiToGermanNote(71, false), "H4");
  assert.equal(sb.midiToGermanNote(70, true), "B4");

  assert.deepEqual(Array.from(sb.getLedgerLinesForStep(0)), []);
  assert.deepEqual(Array.from(sb.getLedgerLinesForStep(-2)), [-2]);
  assert.deepEqual(Array.from(sb.getLedgerLinesForStep(10)), [10]);

  const inv = sb.buildChordInversionNotes(60, "maj", 1, "C");
  assert.ok(Array.isArray(inv.midis) && inv.midis.length === 3);
  assert.equal(inv.bassMidi % 12, 4, "1. Umkehrung von C-Dur muss E (pc 4) im Bass haben");

  const layout = sb.computeBalancedRows(["a", "b", "c", "d", "e", "f"]);
  assert.equal(layout.maxCols, 3);
  assert.equal(layout.rows.length, 2);
  assert.equal(layout.rows.reduce((sum, r) => sum + r.length, 0), 6);
});

// =====================================================
// 4. Nashville Number System
// =====================================================
runTest("Nashville Number System: Stufenauflösung, Akkordtöne & deutsche Schreibweise", () => {
  const keyC = sb.getNnsKeyByPc(0);
  const keyG = sb.getNnsKeyByPc(7);
  assert.ok(keyC && keyG);

  appState.settings.language = "en";
  const cOne = sb.resolveNnsToken("1", keyC, "major");
  const cFour = sb.resolveNnsToken("4", keyC, "major");
  const cSix = sb.resolveNnsToken("6-", keyC, "major");
  assert.equal(cOne.chordName, "C");
  assert.equal(cFour.chordName, "F");
  assert.equal(cSix.chordName, "Am");
  assert.deepEqual(Array.from(sb.buildNnsChordNoteNames(cOne, keyC)), ["C3", "C4", "E4", "G4"]);

  const gFive = sb.resolveNnsToken("5", keyG, "major");
  assert.equal(gFive.chordName, "D");

  appState.settings.language = "de";
  assert.equal(sb.formatNnsPitch("B"), "H");
  assert.equal(sb.formatNnsPitch("B♭"), "B");
});

// =====================================================
// 5. Lokale Meilensteine (Achievements)
// =====================================================
runTest("Meilensteine: Retroaktive Synchronisation auf Profilen", () => {
  assert.equal(typeof sb.syncRetroactiveAchievements, "function");
  sb.syncRetroactiveAchievements({ silent: true });
  assert.ok(appState.profile && typeof appState.profile.achievements === "object");
});

// =====================================================
// 6. Profil-Sicherung: Übungsstand, Prüfungsverlauf & Meilensteine
// =====================================================
runTest("Profil-Sicherung: Übungsstand, Prüfungsverlauf & Meilensteine (Export, Import, alte Sicherungen)", () => {
  // Ungültige Werte fliegen raus, gültige bleiben
  const clean = sb.sanitizePracticeProgress({
    mode: "solfege", solfegeDifficulty: 7, intervalDifficulty: 99, melodyStyle: "jazz",
    modesRoot: "5", rhythmTapClick: false, intervalCustomPool: ["P1", "M3", "<x>"], foo: "bar"
  });
  assert.equal(clean.mode, "solfege");
  assert.equal(clean.solfegeDifficulty, 7);
  assert.equal(clean.intervalDifficulty, undefined);
  assert.equal(clean.melodyStyle, undefined);
  assert.equal(clean.modesRoot, "5");
  assert.equal(clean.rhythmTapClick, false);
  assert.deepEqual(Array.from(clean.intervalCustomPool), ["P1", "M3"]);
  assert.equal(clean.foo, undefined);

  // Übungsstand merken
  appState.exam = null;
  appState.settings.mode = "interval-melodic";
  appState.settings.intervalDifficulty = 6;
  appState.settings.chordDifficulty = 3;
  appState.settings.melodyStyle = "dictation";
  sb.rememberPracticeProgress();
  assert.equal(appState.profile.practice.mode, "interval-melodic");
  assert.equal(appState.profile.practice.intervalDifficulty, 6);

  // Prüfung & Meilenstein ins Profil legen
  const catKey = Object.keys(getLex("EXAM_CATEGORY_LEVELS"))[0];
  const preset = getLex("EXAM_CATEGORY_LEVELS")[catKey].presets[0];
  appState.profile.examHistory = [{ id: "exam_test_1", categoryKey: catKey, levelId: preset.id, totalQuestions: 10, earnedScore: 8, correctCount: 8, percent: 80, completedAt: 1700000000000 }];
  const achId = Array.from(getLex("ACHIEVEMENT_VALID_IDS"))[0];
  appState.profile.achievements.unlocked[achId] = 1700000000000;

  const json = sb.exportUserProfileJSON();
  const payload = JSON.parse(json);
  assert.equal(payload.version, 2);
  assert.equal(payload.progressStored, true);
  assert.equal(payload.profile.practice.intervalDifficulty, 6);
  assert.equal(payload.profile.practice.melodyStyle, "dictation");
  assert.equal(payload.profile.examHistory.length, 1);
  assert.ok(payload.profile.achievements.unlocked[achId] > 0);
  assert.equal(typeof payload.display.language, "string");

  // Neues Gerät simulieren: Stand zurücksetzen, dann Sicherung laden
  appState.settings.mode = "cadence";
  appState.settings.intervalDifficulty = 1;
  appState.settings.chordDifficulty = 1;
  appState.settings.melodyStyle = "rhythmic";
  appState.profile = sb.createDefaultProfile();
  const res = sb.importUserProfileJSON(json);
  assert.equal(res.ok, true);
  assert.equal(appState.settings.mode, "interval-melodic");
  assert.equal(appState.settings.intervalDifficulty, 6);
  assert.equal(appState.settings.chordDifficulty, 3);
  assert.equal(appState.settings.melodyStyle, "dictation");
  assert.equal(appState.profile.examHistory.length, 1);
  assert.ok(appState.profile.achievements.unlocked[achId] > 0);

  // Alte Sicherung (Version 1, ohne Übungsstand): aktueller Übungsstand bleibt erhalten
  const v1 = JSON.stringify({ app: "Lauschebaer", version: 1, progressStored: false, profile: { name: "Alt" } });
  const resV1 = sb.importUserProfileJSON(v1);
  assert.equal(resV1.ok, true);
  assert.equal(appState.profile.name, "Alt");
  assert.equal(appState.settings.intervalDifficulty, 6);
  assert.equal(appState.profile.practice.intervalDifficulty, 6);
});

// Ergebnis-Ausgabe
const failed = results.filter(r => !r.ok);
for (const r of results) {
  if (r.ok) {
    console.log(`  ✓ ${r.name}`);
  } else {
    console.error(`  ✗ ${r.name}`);
    console.error(`    ${r.err && r.err.stack ? r.err.stack : r.err}`);
  }
}

if (failed.length > 0) {
  console.error(`\n✗ ${failed.length} von ${results.length} Logik-Tests fehlgeschlagen.`);
  process.exit(1);
}
console.log(`✓ ${results.length} Logik-Tests bestanden.`);
