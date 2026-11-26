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
    { mode: "notation-symbols",    levelKey: "notationSymbolsDifficulty", levels: [1, 2, 3] },
    { mode: "sing-interval",       levelKey: "singIntervalDifficulty", levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    { mode: "sing-degree",         levelKey: "singDegreeDifficulty",  levels: [1, 2, 3, 4, 5] }
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

// =====================================================
// „… treffen“: Nachsingen mit Rückmeldung (Auswertung & Aufgaben)
// =====================================================
function makeSungFrames(segments, hopMs = 25) {
  // segments: [{ ms, midi | null }] → Messpunkte wie aus js/pitch-capture.js
  const frames = [];
  let t = 0;
  for (const seg of segments) {
    const n = Math.round(seg.ms / hopMs);
    for (let i = 0; i < n; i++) {
      const voiced = seg.midi !== null && seg.midi !== undefined;
      const midi = voiced ? (typeof seg.midi === "function" ? seg.midi(i, n) : seg.midi) : null;
      frames.push({ t, db: voiced ? -30 : -70, floorDb: -70, voiced, freq: voiced ? 440 : 0, midi, clarity: voiced ? 0.95 : 0 });
      t += hopMs;
    }
  }
  return frames;
}

runTest("Nachsingen: großzügige, oktavunabhängige Auswertung ohne Cent-Werte", () => {
  const target = 67; // G4
  const clean = sb.evaluateSungPitch(makeSungFrames([{ ms: 900, midi: 67.05 }]), target);
  assert.equal(clean.status, "hit");
  assert.equal(clean.direction, "center");

  // gut ein halber Halbton zu hoch zählt noch als Treffer (mit Richtungshinweis)
  const sharp = sb.evaluateSungPitch(makeSungFrames([{ ms: 900, midi: 67.55 }]), target);
  assert.equal(sharp.status, "hit");
  assert.equal(sharp.direction, "high");

  // eine Oktave tiefer (Männerstimme) zählt gleich
  const octaveDown = sb.evaluateSungPitch(makeSungFrames([{ ms: 900, midi: 55.1 }]), target);
  assert.equal(octaveDown.status, "hit");

  // ein Ganzton daneben: kein Treffer, aber „Fast“ mit Richtung
  const near = sb.evaluateSungPitch(makeSungFrames([{ ms: 900, midi: 65.9 }]), target);
  assert.equal(near.status, "miss");
  assert.equal(near.nearMiss, true);
  assert.equal(near.direction, "low");

  // klar daneben (Terz)
  const far = sb.evaluateSungPitch(makeSungFrames([{ ms: 900, midi: 71 }]), target);
  assert.equal(far.status, "miss");
  assert.equal(far.nearMiss, false);

  // Anschleifen von unten wird ignoriert, der gehaltene Ton zählt
  const scoop = sb.evaluateSungPitch(makeSungFrames([
    { ms: 175, midi: (i, n) => 65.6 + (1.4 * i) / n },
    { ms: 800, midi: 67 }
  ]), target);
  assert.equal(scoop.status, "hit");

  // zu kurz oder Stille: nichts gehört
  assert.equal(sb.evaluateSungPitch(makeSungFrames([{ ms: 200, midi: 67 }]), target).status, "none");
  assert.equal(sb.evaluateSungPitch(makeSungFrames([{ ms: 1500, midi: null }]), target).status, "none");

  // Faltung auf ±6 Halbtöne
  assert.ok(Math.abs(sb.foldSingMatchSemis(12.2) - 0.2) < 1e-9);
  assert.ok(Math.abs(sb.foldSingMatchSemis(-11.5) - 0.5) < 1e-9);
});

runTest("Nachsingen: Aufgaben liegen in der gewählten Stimmlage", () => {
  sb.renderUI = () => {};
  const spans = getLex("SING_MATCH_VOICE_SPANS");
  for (const voice of ["mixed", "soprano", "alto", "tenor", "bass"]) {
    appState.profile.singVoiceRange = voice;
    const [lo, hi] = spans[voice];
    for (const dir of ["up", "down", "mixed"]) {
      appState.settings.mode = "sing-interval";
      appState.settings.singIntervalDirection = dir;
      appState.settings.singIntervalDifficulty = 5;
      for (let i = 0; i < 12; i++) {
        sb.generateExercise();
        const ex = appState.currentExercise;
        assert.equal(ex.type, "sing-interval");
        assert.ok(ex.singTask && Number.isFinite(ex.singTask.targetMidi), "singTask fehlt");
        assert.ok(ex.rootMidi >= lo && ex.rootMidi <= hi, `${voice}: Ausgangston ${ex.rootMidi} außerhalb ${lo}–${hi}`);
        assert.ok(ex.targetMidi >= lo && ex.targetMidi <= hi, `${voice}/${dir}: Zielton ${ex.targetMidi} außerhalb ${lo}–${hi}`);
        if (dir === "up") assert.ok(ex.targetMidi >= ex.rootMidi);
        if (dir === "down") assert.ok(ex.targetMidi <= ex.rootMidi);
      }
    }
    appState.settings.mode = "sing-degree";
    for (const lvl of [1, 4, 5]) {
      appState.settings.singDegreeDifficulty = lvl;
      for (let i = 0; i < 8; i++) {
        sb.generateExercise();
        const ex = appState.currentExercise;
        assert.equal(ex.type, "sing-degree");
        assert.equal(ex.cadenceChords.length, 4);
        assert.ok(ex.targetMidi >= lo && ex.targetMidi <= hi + 1, `${voice} L${lvl}: Zielton ${ex.targetMidi} außerhalb ${lo}–${hi}`);
        assert.ok(ex.choices.includes(ex.reviewKey), "Stufe nicht im Tonvorrat");
      }
    }
  }
  appState.profile.singVoiceRange = "";
});

runTest("Nachsingen: Stimm-Profil erkennt gesungene Töne", () => {
  const sr = 48000;
  const profile = sb.getTunerDspProfile("voice");
  assert.ok(profile && profile.searchRange[0] <= 70, "Stimm-Profil fehlt");
  for (const midi of [43, 52, 60, 69, 79]) {
    const freq = 440 * Math.pow(2, (midi - 69) / 12);
    const sig = makeHarmonicSignal(freq, sr, 4096, [1.0, 0.6, 0.35, 0.2, 0.1]);
    const prep = sb.prepareTunerMainWorkBuffer(sig, sr, null);
    const res = sb.detectTunerPitchWithProfile(sig, sr, prep, profile.searchRange[0], profile.searchRange[1], profile, 0);
    assert.ok(res.freq > 0, `MIDI ${midi}: kein Ton erkannt`);
    const errSemis = Math.abs(sb.tunerFreqToMidiFloat(res.freq, 440) - midi);
    assert.ok(errSemis < 0.15, `MIDI ${midi}: ${res.freq.toFixed(1)} Hz statt ${freq.toFixed(1)} Hz`);
  }
});

runTest("MIDI: Protokoll-Parser (NoteOn, Vel0-Off, Running Status, Sustain, Realtime-Filter)", () => {
  const ev1 = sb.parseMidiMessageBytes([0x90, 60, 96]);
  assert.equal(ev1.length, 1);
  assert.equal(ev1[0].type, "noteon");
  assert.equal(ev1[0].midi, 60);
  assert.equal(ev1[0].velocity, 96);

  // Note-On mit Velocity 0 muss als Note-Off erkannt werden
  const ev2 = sb.parseMidiMessageBytes([0x90, 60, 0]);
  assert.equal(ev2.length, 1);
  assert.equal(ev2[0].type, "noteoff");
  assert.equal(ev2[0].midi, 60);

  // Running Status + Clock (0xF8) + Active Sensing (0xFE) dazwischen + Sustain CC 64
  const ev3 = sb.parseMidiMessageBytes([0xF8, 0x90, 60, 80, 0xFE, 64, 75, 0xB0, 64, 127]);
  assert.equal(ev3.length, 3);
  assert.equal(ev3[0].midi, 60);
  assert.equal(ev3[1].type, "noteon");
  assert.equal(ev3[1].midi, 64);
  assert.equal(ev3[2].type, "cc");
  assert.equal(ev3[2].cc, 64);
  assert.equal(ev3[2].value, 127);

  // SysEx wird übersprungen
  const ev4 = sb.parseMidiMessageBytes([0xF0, 0x7E, 0x7F, 0x06, 0x01, 0xF7, 0x80, 64, 0]);
  assert.equal(ev4.length, 1);
  assert.equal(ev4[0].type, "noteoff");
  assert.equal(ev4[0].midi, 64);
});

runTest("MIDI: Geräteauswahl übersteht geänderte IDs und blockiert nie still", () => {
  const devices = [
    { id: "3Kb9+/Zq7w==", name: "Digital Piano", hasInput: true },
    { id: "x1", name: "Pad Controller", hasInput: true }
  ];
  assert.equal(sb.resolveMidiDeviceSelection("all", "", devices), "all");
  assert.equal(sb.resolveMidiDeviceSelection("x1", "Pad Controller", devices), "x1");
  // Firefox vergibt nach Neustart eine neue ID → per Name wiederfinden
  assert.equal(sb.resolveMidiDeviceSelection("alteID==", "Digital Piano", devices), "3Kb9+/Zq7w==");
  // Unbekannte ID ohne passenden Namen → alle Geräte statt Stille
  assert.equal(sb.resolveMidiDeviceSelection("alteID==", "", devices), "all");
  assert.equal(sb.resolveMidiDeviceSelection("alteID==", "Anderes Gerät", devices), "all");
  assert.equal(sb.resolveMidiDeviceSelection("x1", "Pad Controller", []), "all");
});

runTest("MIDI: Notenlesen verlangt exakte Oktave & erkennt Oktav-Abweichung", () => {
  const target = { midi: 48, pc: 0 }; // C3
  const hit = sb.evaluateMidiNotationMatch(target, 48, { exactOctave: true });
  assert.equal(hit.ok, true);
  assert.equal(hit.status, "correct");

  const octHigh = sb.evaluateMidiNotationMatch(target, 60, { exactOctave: true });
  assert.equal(octHigh.ok, false);
  assert.equal(octHigh.status, "wrong-octave");
  assert.equal(octHigh.octaveDiff, 1);

  const octLow = sb.evaluateMidiNotationMatch(target, 36, { exactOctave: true });
  assert.equal(octLow.ok, false);
  assert.equal(octLow.status, "wrong-octave");
  assert.equal(octLow.octaveDiff, -1);

  const tolerant = sb.evaluateMidiNotationMatch(target, 60, { exactOctave: false });
  assert.equal(tolerant.ok, true);
  assert.equal(tolerant.status, "correct");

  const wrong = sb.evaluateMidiNotationMatch(target, 50, { exactOctave: true });
  assert.equal(wrong.ok, false);
  assert.equal(wrong.status, "wrong");
});

runTest("MIDI: Akkord-, Umkehrungs- & Tonleiter-Auswertung (Phase 2)", () => {
  // Exakter Akkord (C-Dur in 1. Umkehrung: E4-G4-C5)
  const chordTask = { targetMidis: [64, 67, 72], requireBassPc: 4 };
  assert.equal(sb.evaluateMidiChordAttempt(chordTask, [64, 67, 72]).ok, true);
  // Gleiche Töne, aber C im Bass statt E -> wrong-bass
  const badBass = sb.evaluateMidiChordAttempt(chordTask, [60, 64, 67]);
  assert.equal(badBass.ok, false);
  assert.equal(badBass.status, "wrong-bass");
  // Falscher Ton dabei (F# statt G) -> wrong-notes
  assert.equal(sb.evaluateMidiChordAttempt(chordTask, [64, 66, 72]).status, "wrong-notes");
  // Noch unvollständig -> incomplete
  assert.equal(sb.evaluateMidiChordAttempt(chordTask, [64, 67]).status, "incomplete");

  // Tonleiter-Schritte: Schritt 0 verankert Oktave (z. B. C3 = 48), danach aufwärts
  const scaleTask = { rootMidi: 60, rootPc: 0, scaleIntervals: [0, 2, 4, 5, 7, 9, 11, 12] };
  const s0 = sb.evaluateMidiScaleStep(scaleTask, 0, 48, null);
  assert.equal(s0.ok, true);
  assert.equal(s0.nextAnchorMidi, 48);
  const s1 = sb.evaluateMidiScaleStep(scaleTask, 1, 50, s0.nextAnchorMidi);
  assert.equal(s1.ok, true);
  const s1WrongOct = sb.evaluateMidiScaleStep(scaleTask, 1, 62, s0.nextAnchorMidi);
  assert.equal(s1WrongOct.ok, false);
  assert.equal(s1WrongOct.status, "wrong-octave");

  // Intervall spielen: C4 -> E4 (M3)
  const intTask = { rootMidi: 60, targetMidi: 64 };
  assert.equal(sb.evaluateMidiIntervalAttempt(intTask, 64).ok, true);
  assert.equal(sb.evaluateMidiIntervalAttempt(intTask, 76).status, "wrong-octave");
  const m3 = sb.evaluateMidiIntervalAttempt(intTask, 63);
  assert.equal(m3.ok, false);
  assert.equal(m3.playedSemis, 3);
});

runTest("MIDI: Phase-2 Generatoren erzeugen gültige Aufgaben (Intervalle, Akkorde, Tonleitern)", () => {
  sb.renderUI = () => {};
  appState.settings.mode = "midi-interval";
  for (const lvl of [1, 5, 9]) {
    appState.settings.midiIntervalDifficulty = lvl;
    for (const dir of ["up", "down", "mixed"]) {
      appState.settings.midiIntervalDirection = dir;
      sb.generateExercise();
      const ex = appState.currentExercise;
      assert.equal(ex.type, "midi-interval");
      assert.ok(ex.midiTask && Number.isFinite(ex.midiTask.targetMidi));
      if (dir === "up") assert.ok(ex.midiTask.targetMidi >= ex.midiTask.rootMidi);
      if (dir === "down") assert.ok(ex.midiTask.targetMidi <= ex.midiTask.rootMidi);
    }
  }
  appState.settings.mode = "midi-chord";
  for (const lvl of [1, 2, 3, 4]) {
    appState.settings.midiChordDifficulty = lvl;
    sb.generateExercise();
    const ex = appState.currentExercise;
    assert.equal(ex.type, "midi-chord");
    assert.ok(ex.midiTask.targetMidis.length >= (lvl === 4 ? 4 : 3));
    if (lvl === 3) assert.notEqual(ex.midiTask.requireBassPc, null);
  }
  appState.settings.mode = "midi-scale";
  for (const lvl of [1, 2, 3]) {
    appState.settings.midiScaleDifficulty = lvl;
    sb.generateExercise();
    const ex = appState.currentExercise;
    assert.equal(ex.type, "midi-scale");
    assert.ok(ex.midiTask.scaleIntervals.length >= 6);
    assert.equal(ex.midiTask.scaleMidis.length, ex.midiTask.scaleIntervals.length);
  }
});

runTest("MIDI: Bildschirm-Klaviatur deckt jede Aufgabe ab & Tonleiter-Start ist dort exakt", () => {
  sb.renderUI = () => {};
  const isWhite = (m) => [0, 2, 4, 5, 7, 9, 11].includes(((m % 12) + 12) % 12);
  const checkRange = (ex, needed) => {
    const r = sb.getMidiPlayFallbackRange(ex);
    assert.ok(r, "Bereich fehlt");
    needed.forEach(m => assert.ok(m >= r.lo && m <= r.hi, `Ton ${m} außerhalb ${r.lo}–${r.hi}`));
    assert.ok(isWhite(r.firstWhite) && isWhite(r.lastWhite));
    assert.ok(r.firstWhite < r.lo && r.lastWhite > r.hi);
    // höchstens gut zwei Oktaven, damit die Tasten auf dem Handy tippbar bleiben
    assert.ok(r.lastWhite - r.firstWhite <= 26, `Bereich zu groß: ${r.lastWhite - r.firstWhite}`);
    return r;
  };
  for (const [mode, key, levels] of [
    ["midi-interval", "midiIntervalDifficulty", [1, 5, 9]],
    ["midi-chord", "midiChordDifficulty", [1, 2, 3, 4]],
    ["midi-scale", "midiScaleDifficulty", [1, 2, 3]]
  ]) {
    appState.settings.mode = mode;
    for (const lvl of levels) {
      appState.settings[key] = lvl;
      for (const dir of ["up", "down"]) {
        appState.settings.midiIntervalDirection = dir;
        for (let i = 0; i < 12; i++) {
          sb.generateExercise();
          const ex = appState.currentExercise;
          const t = ex.midiTask;
          if (mode === "midi-interval") checkRange(ex, [t.rootMidi, t.targetMidi]);
          else if (mode === "midi-chord") {
            const r = checkRange(ex, t.targetMidis);
            // Umkehrungen: eine falsche Lage (Basston eine Oktave höher oder Oberton eine Oktave tiefer) muss greifbar sein
            if (t.inversion > 0) {
              const bassUp = t.targetMidis[0] + 12;
              const topDown = t.targetMidis[t.targetMidis.length - 1] - 12;
              assert.ok(bassUp <= r.hi || topDown >= r.lo, "Keine andere Lage greifbar");
            }
          }
          else checkRange(ex, t.scaleMidis);
        }
      }
    }
  }

  // Bildschirm: Tonleiter muss auf dem angezeigten Grundton starten (nicht eine Oktave höher)
  const scaleTask = { rootMidi: 60, rootPc: 0, scaleIntervals: [0, 2, 4, 5, 7, 9, 11, 12] };
  const topStart = sb.evaluateMidiScaleStep(scaleTask, 0, 72, null, { exactRoot: true });
  assert.equal(topStart.ok, false);
  assert.equal(topStart.status, "wrong-octave");
  assert.equal(sb.evaluateMidiScaleStep(scaleTask, 0, 60, null, { exactRoot: true }).ok, true);
  // Ohne exactRoot (MIDI) darf jede Oktave starten
  assert.equal(sb.evaluateMidiScaleStep(scaleTask, 0, 72, null).ok, true);
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
