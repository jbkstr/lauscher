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
  const sessionStore = new Map();
  const docEl = createStubElement();
  const bodyEl = createStubElement();
  const headEl = createStubElement();

  const sandbox = {
    console,
    Math, Date, JSON, Object, Array, Map, Set, Number, String, Boolean, RegExp, Error, TypeError, RangeError, Promise,
    parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent, URLSearchParams, TextEncoder,
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
    sessionStorage: {
      getItem: (k) => (sessionStore.has(k) ? sessionStore.get(k) : null),
      setItem: (k, v) => { sessionStore.set(k, String(v)); },
      removeItem: (k) => { sessionStore.delete(k); },
      clear: () => { sessionStore.clear(); }
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
      location: { protocol: "https:", hostname: "jbkstr.github.io", origin: "https://jbkstr.github.io", pathname: "/lauscher/", hash: "", search: "", href: "https://jbkstr.github.io/lauscher/" },
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
  sandbox.window.sessionStorage = sandbox.sessionStorage;
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

  // Modi & Stufen direkt aus den App-Katalogen (statt einer eigenen Liste, die veralten kann)
  const catalog = getLex("({ ...MIX_MODE_CATALOG, ...SING_MATCH_MODE_CATALOG, ...MIDI_PLAY_MODE_CATALOG })");
  // Sing- & MIDI-Modi haben keine Übe-Mixe → Stufe direkt setzen
  const directLevelKeys = {
    "sing-interval": "singIntervalDifficulty",
    "sing-degree": "singDegreeDifficulty",
    "midi-interval": "midiIntervalDifficulty",
    "midi-chord": "midiChordDifficulty",
    "midi-scale": "midiScaleDifficulty"
  };
  // Jeder Modus muss seinen eigenen Generator erreichen (nicht den Intervall-Fallback in generateExercise)
  const expectedTypeOverrides = { "cadence-minor": "cadence" };

  let generatedCount = 0;
  for (const [mode, info] of Object.entries(catalog)) {
    for (const lvl of info.levels) {
      if (directLevelKeys[mode]) {
        appState.settings.mode = mode;
        appState.settings[directLevelKeys[mode]] = lvl;
      } else {
        sb.applyModeAndLevelFromConfig({ mode, level: lvl });
      }
      assert.equal(appState.settings.mode, mode, `${mode} L${lvl}: Modus wurde nicht übernommen`);
      for (let i = 0; i < 4; i++) {
        sb.generateExercise();
        const ex = appState.currentExercise;
        assert.ok(ex && typeof ex === "object", `${mode} L${lvl}: currentExercise fehlt`);
        assert.ok(typeof ex.type === "string" && ex.type.length > 0, `${mode} L${lvl}: ex.type fehlt`);
        assert.equal(ex.type, expectedTypeOverrides[mode] || mode, `${mode} L${lvl}: falscher Aufgabentyp (Fallback?)`);
        if (Array.isArray(ex.choices) && ex.choices.length > 0) {
          const targetKey = ex.targetKey ?? ex.correctKey ?? ex.target;
          if (typeof targetKey === "string") {
            assert.ok(
              ex.choices.includes(targetKey),
              `${mode} L${lvl}: Ziel "${targetKey}" nicht in choices [${ex.choices.join(", ")}]`
            );
          }
        }
        generatedCount++;
      }
    }
  }
  assert.ok(Object.keys(catalog).length >= 33, `Katalog unvollständig: ${Object.keys(catalog).length} Modi`);
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

  // Fremde JSON-Dateien dürfen das Profil nicht überschreiben
  const nameBefore = appState.profile.name;
  for (const bad of ["{}", "[1,2,3]", '{"name":"pkg","version":"1.0.0"}', '{"app":"Other","profile":{"name":"X"}}', "kein json"]) {
    const r = sb.importUserProfileJSON(bad);
    assert.equal(r.ok, false, `Import sollte abgelehnt werden: ${bad}`);
  }
  assert.equal(appState.profile.name, nameBefore);
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
    assert.ok(r.firstWhite <= r.lo && r.lastWhite >= r.hi);
    // Bei Intervall & Tonleiter rastet das Fenster sauber auf C oder F ein (12–15 weiße Tasten)
    if (ex.type === "midi-interval" || ex.type === "midi-scale") {
      const startPc = ((r.firstWhite % 12) + 12) % 12;
      assert.ok(startPc === 0 || startPc === 5, `Unerwarteter Fenster-Anker pc=${startPc}`);
    }
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

  // Hysterese: zwei aufeinanderfolgende Aufgaben im selben C/F-Block halten die Klaviatur stabil
  const ex1 = { type: "midi-interval", choices: ["P8"], midiTask: { rootMidi: 62, targetMidi: 74, directionSign: 1 } }; // D4..D5
  const r1 = sb.getMidiPlayFallbackRange(ex1, null);
  assert.equal(r1.firstWhite, 60); // C4..G5
  assert.equal(r1.lastWhite, 79);
  const ex2 = { type: "midi-interval", choices: ["P8"], midiTask: { rootMidi: 67, targetMidi: 79, directionSign: 1 } }; // G4..G5
  const r2 = sb.getMidiPlayFallbackRange(ex2, { type: "midi-interval", firstWhite: r1.firstWhite, lastWhite: r1.lastWhite });
  assert.equal(r2.firstWhite, r1.firstWhite, "Klaviatur sollte bei passender Folgeaufgabe nicht springen");
  assert.equal(r2.lastWhite, r1.lastWhite);

  // Bildschirm: Tonleiter muss auf dem angezeigten Grundton starten (nicht eine Oktave höher)
  const scaleTask = { rootMidi: 60, rootPc: 0, scaleIntervals: [0, 2, 4, 5, 7, 9, 11, 12] };
  const topStart = sb.evaluateMidiScaleStep(scaleTask, 0, 72, null, { exactRoot: true });
  assert.equal(topStart.ok, false);
  assert.equal(topStart.status, "wrong-octave");
  assert.equal(sb.evaluateMidiScaleStep(scaleTask, 0, 60, null, { exactRoot: true }).ok, true);
  // Ohne exactRoot (MIDI) darf jede Oktave starten
  assert.equal(sb.evaluateMidiScaleStep(scaleTask, 0, 72, null).ok, true);
});

runTest("MIDI: Gerätelisten-Vergleich verhindert statechange-Schleifen", () => {
  const d1 = { id: "a", name: "Casio PX-S", hasInput: true, hasOutput: true };
  const d2 = { id: "b", name: "Roland FP-30X", hasInput: true, hasOutput: false };
  assert.equal(sb.haveMidiDeviceListsChanged([d1, d2], [d2, d1]), false);
  assert.equal(sb.haveMidiDeviceListsChanged([d1], [d1]), false);
  assert.equal(sb.haveMidiDeviceListsChanged([d1], [d1, d2]), true);
  assert.equal(sb.haveMidiDeviceListsChanged([], [d1]), true);
  assert.equal(sb.haveMidiDeviceListsChanged([d1], []), true);
});

runTest("MIDI-Prüfungen: Tonleiter-Durchspiel-Wertung (anteilig) & Prüfungs-Presets", () => {
  const cMajor = { rootMidi: 60, rootPc: 0, scaleIntervals: [0, 2, 4, 5, 7, 9, 11, 12] };

  // 1) Perfekter Durchlauf (auch eine Oktave tiefer am MIDI-Keyboard gestartet)
  const perfect = sb.evaluateMidiScaleExamRun(cMajor, [48, 50, 52, 53, 55, 57, 59, 60]);
  assert.equal(perfect.status, "correct");
  assert.equal(perfect.score, 1);
  assert.equal(perfect.correctCount, 8);
  assert.equal(perfect.wrongSteps.length, 0);

  // 2) Anteiliger Durchlauf: 7 von 8 richtig (Stufe 4 Fis statt F)
  const partial = sb.evaluateMidiScaleExamRun(cMajor, [60, 62, 64, 66, 67, 69, 71, 72]);
  assert.equal(partial.status, "partial");
  assert.equal(partial.correctCount, 7);
  assert.equal(partial.score, 0.88);
  assert.equal(partial.wrongSteps.length, 1);
  assert.equal(partial.wrongSteps[0].stepNumber, 4);
  assert.equal(partial.wrongSteps[0].expectedMidi, 65);
  assert.equal(partial.wrongSteps[0].playedMidi, 66);

  // 3) Falscher Startton fällt sauber auf erwartete Start-Oktave zurück, Rest wird weiter bewertet
  const wrongStart = sb.evaluateMidiScaleExamRun(cMajor, [61, 62, 64, 65, 67, 69, 71, 72]);
  assert.equal(wrongStart.status, "partial");
  assert.equal(wrongStart.correctCount, 7);
  assert.equal(wrongStart.wrongSteps[0].stepNumber, 1);

  // 3b) Falscher Startton in Oktave 3 (88-Tasten-Klavier): Rest zählt in Oktave 3 weiter als richtig
  const wrongStartLow = sb.evaluateMidiScaleExamRun(cMajor, [49, 50, 52, 53, 55, 57, 59, 60]);
  assert.equal(wrongStartLow.correctCount, 7);
  assert.equal(wrongStartLow.anchorMidi, 48);
  assert.equal(wrongStartLow.wrongSteps[0].stepNumber, 1);
  assert.equal(wrongStartLow.wrongSteps[0].expectedMidi, 48);

  // 4) Bildschirm-Klaviatur (exactRoot: true) verlangt die angezeigte Oktave auf Schritt 0
  const wrongOctScreen = sb.evaluateMidiScaleExamRun(cMajor, [72, 62, 64, 65, 67, 69, 71, 72], { exactRoot: true });
  assert.equal(wrongOctScreen.steps[0].ok, false);
  assert.equal(wrongOctScreen.steps[0].wrongOctave, true);
  assert.equal(wrongOctScreen.correctCount, 7);

  // 5) Alle 3 Spiel-Prüfungskategorien enthalten sauber getrennte examGroup:"play"-Presets
  const cats = getLex("EXAM_CATEGORY_LEVELS");
  for (const [catKey, modeName, minCount] of [
    ["interval", "midi-interval", 3],
    ["chords", "midi-chord", 4],
    ["modes", "midi-scale", 3]
  ]) {
    const playPresets = (cats[catKey]?.presets || []).filter(p => p.examGroup === "play");
    assert.ok(playPresets.length >= minCount, `Zu wenige Play-Presets in ${catKey}`);
    playPresets.forEach(p => {
      assert.deepEqual(Array.from(p.modes), [modeName]);
      assert.ok(p.apply && Object.keys(p.apply).length > 0, `apply fehlt in ${p.id}`);
    });
  }
});

runTest("Doppelsystem (Grand Staff): Stufen 1–5 erzeugen gültige ein- und zweihändige Aufgaben & SVGs", () => {
  appState.settings.mode = "notation-grand";
  appState.settings.notationKeyMode = "none";
  for (const lvl of [1, 2, 3, 4, 5]) {
    appState.settings.notationDifficulty = lvl;
    for (let i = 0; i < 10; i++) {
      sb.generateNotationExercise("notation-grand");
      const ex = appState.currentExercise;
      assert.equal(ex.type, "notation-grand");
      assert.equal(ex.level, lvl);
      assert.ok(ex.isGrandStaff);
      const t = ex.targetItem;
      assert.ok(t, `targetItem fehlt auf Stufe ${lvl}`);
      if (lvl <= 2) {
        assert.ok(!t.isGrandMulti, `Stufe ${lvl} sollte Einzelnoten erzeugen`);
        assert.ok(t.clefId === "treble" || t.clefId === "bass");
      } else {
        assert.ok(t.isGrandMulti, `Stufe ${lvl} sollte mehrstimmige Grand-Staff-Aufgaben erzeugen`);
        assert.ok(t.bassTones.length >= 1 && t.trebleTones.length >= 1, `Beide Systeme erwartet auf Stufe ${lvl}`);
        const maxBass = Math.max(...t.bassTones.map(n => n.midi));
        const minTreble = Math.min(...t.trebleTones.map(n => n.midi));
        assert.ok(minTreble > maxBass, `Überkreuzte Hände: Bass ${maxBass} >= Violin ${minTreble}`);
        if (lvl === 3) {
          assert.equal(t.targetMidis.length, 2, "Stufe 3 erwartet Zweiklänge (1+1)");
        } else if (lvl === 4) {
          assert.ok(t.targetMidis.length >= 3 && t.targetMidis.length <= 4, `Stufe 4 erwartet 3–4 Töne, war ${t.targetMidis.length}`);
        }
        // SVG muss beide Systeme zeichnen und foundMidis unterstützen
        const svg = sb.buildNotationGrandStaffSVG(ex.notationQueue, {
          keySignatureId: ex.keySignatureId,
          foundMidis: [t.bassTones[0].midi]
        });
        assert.ok(svg.includes("notation-grand-treble") && svg.includes("notation-grand-bass"));
        assert.ok(svg.includes("notation-chord-found"));
      }
    }
  }
});

// =====================================================
// Profil-Schema, Theme-Speicher & Härtung gegen manipulierte Sicherungen
// =====================================================
runTest("Profil-Schema: Migration 1 → 2 & Theme-Speicher ist nur noch Darstellungs-Cache", () => {
  const ls = sb.localStorage;
  const PROFILE_KEY = getLex("PERSONAL_PROFILE_STORAGE_KEY");
  const THEMES_KEY = getLex("CUSTOM_THEMES_STORAGE_KEY");
  const CURRENT = getLex("PROFILE_SCHEMA_VERSION");
  const legacyTheme = { id: "custom_2", slotIndex: 1, name: "Altes Theme", colors: { bgBase: "#102030", sage: "#33aa66" } };
  ls.setItem(PROFILE_KEY, JSON.stringify({ name: "Alt", customThemes: [null, null, null] }));
  ls.setItem(THEMES_KEY, JSON.stringify([null, legacyTheme, null]));

  // Schema 1: Lücke im Profil wird einmalig aus dem Alt-Speicher gefüllt
  const migrated = sb.loadUserProfile();
  assert.equal(migrated.schemaVersion, CURRENT);
  assert.equal(migrated.name, "Alt");
  assert.equal(migrated.customThemes[1]?.name, "Altes Theme");

  // Speichern: Profil hält die Farben, der Theme-Speicher nur noch, was das <head>-Skript braucht
  sb.saveUserProfile(migrated);
  const storedProfile = JSON.parse(ls.getItem(PROFILE_KEY));
  assert.equal(storedProfile.schemaVersion, CURRENT);
  assert.ok(storedProfile.customThemes[1]?.colors?.bgBase, "Profil soll die Grundfarben enthalten");
  const cache = JSON.parse(ls.getItem(THEMES_KEY));
  assert.ok(cache[1]?.cssVars && cache[1].metaBg, "Cache soll CSS-Variablen & metaBg enthalten");
  assert.equal(cache[1].colors, undefined, "Cache soll keine Grundfarben mehr doppelt speichern");

  // Schema 2: Der Cache wird beim Laden nicht mehr gelesen (gelöschtes Theme kommt nicht zurück)
  ls.setItem(PROFILE_KEY, JSON.stringify({ ...storedProfile, customThemes: [null, null, null] }));
  ls.setItem(THEMES_KEY, JSON.stringify([null, legacyTheme, null]));
  assert.equal(sb.loadUserProfile().customThemes[1], null);

  // Import einer alten Sicherung: wird migriert, aber nie mit Themes dieses Geräts gemischt
  const imported = sb.migrateUserProfileSchema({ name: "Backup" });
  assert.equal(imported.schemaVersion, CURRENT);
  assert.equal(imported.customThemes, undefined);
  ls.removeItem(PROFILE_KEY);
  ls.removeItem(THEMES_KEY);
});

runTest("Härtung: Prüfungs-Snapshots aus Sicherungen werden strukturell bereinigt", () => {
  const melody = {
    type: "melody", activeBpm: 92, melodyStyle: "dictation", melodyPulse: true, beatsPerBar: 4,
    targetSlots: [{ syllable: "Do", noteName: "C4", beatOffset: 0, durationBeats: 1, rhythmKey: "q", velocity: 0.8 }],
    chosenSlots: [{ syllable: "Re", noteName: "D4", beatOffset: 0, durationBeats: 1, rhythmKey: "q", velocity: 0.8 }]
  };
  assert.deepEqual(JSON.parse(JSON.stringify(sb.sanitizeExamAudioSnapshot(melody))), melody, "gültige Snapshots bleiben unverändert");
  const cadence = { type: "cadence", currentKey: "F#", activeTimeSig: "6/8", chosenKey: "ii-V-I", targetKey: "IV-V-I", rootMidi: 66 };
  assert.deepEqual(JSON.parse(JSON.stringify(sb.sanitizeExamAudioSnapshot(cadence))), cadence);

  const evil = JSON.parse('{"type":"notation-symbols","svgKey":"<img src=x onerror=alert(1)>","promptText":"ok","__proto__":{"polluted":1},"bad key":1,"deep":{"a":{"b":{"c":{"d":{"e":1}}}}},"n":1e999}');
  const clean = sb.sanitizeExamAudioSnapshot(evil);
  assert.equal(clean.svgKey, undefined, "Markup in Bezeichner-Feldern fliegt raus");
  assert.equal(clean.promptText, "ok");
  assert.equal(clean["bad key"], undefined);
  assert.equal(({}).polluted, undefined);
  assert.equal(clean.n, undefined, "Unendlich ist kein gültiger Zahlenwert");
  assert.equal(clean.deep.a.b.c, undefined, "Verschachtelung ist begrenzt");
  assert.equal(sb.sanitizeExamAudioSnapshot("x"), null);
  assert.equal(sb.sanitizeExamAudioSnapshot([1, 2]), null);
  assert.equal(sb.sanitizeExamAudioSnapshot({ tapsMs: new Array(5000).fill(1) }).tapsMs.length, 128);

  // Auch ein unbekannter Symbol-Schlüssel wird im SVG nur als Text gezeigt
  const svg = sb.buildNotationSymbolSVG("<b>x</b>", { compact: true });
  assert.ok(!svg.includes("<b>"), "unbekannter svgKey darf kein Markup erzeugen");
});

runTest("Härtung: Eigene Themes setzen nur harmlose CSS-Variablen (JS & <head>-Skript gleich)", () => {
  const templates = getLex("CUSTOM_THEME_TEMPLATES");
  for (const [tplKey, colors] of Object.entries(templates)) {
    const built = sb.buildDerivedCustomThemeVars(colors);
    for (const [prop, val] of Object.entries(built.cssVars)) {
      assert.ok(sb.isSafeCustomThemeCssVar(prop, val), `Vorlage ${tplKey}: ${prop} = ${val} würde verworfen`);
    }
    assert.ok(/^#[0-9a-fA-F]{3,8}$/.test(built.metaBg), `Vorlage ${tplKey}: metaBg ${built.metaBg}`);
  }
  for (const bad of ["url(https://example.com/x.png)", "URL( //x )", "image-set(x)", "red; background: blue", "expression(alert(1))", "var(--x)", "\"quoted\""]) {
    assert.equal(sb.isSafeCustomThemeCssVar("--bg-base", bad), false, `sollte abgelehnt werden: ${bad}`);
  }
  assert.equal(sb.isSafeCustomThemeCssVar("color", "#fff"), false, "nur eigene CSS-Variablen (--…)");

  // Das Inline-Skript in index.html muss dieselben Regeln nutzen
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const pick = (name) => {
    const m = html.match(new RegExp(`var ${name} = (/.+?/[a-z]*);`));
    assert.ok(m, `${name} fehlt im <head>-Skript`);
    return m[1];
  };
  assert.equal(pick("CUSTOM_VAR_NAME_RE"), String(getLex("CUSTOM_THEME_VAR_NAME_RE")));
  assert.equal(pick("CUSTOM_VAR_VALUE_RE"), String(getLex("CUSTOM_THEME_VAR_VALUE_RE")));
  assert.equal(pick("CUSTOM_VAR_BLOCKED_RE"), String(getLex("CUSTOM_THEME_VAR_BLOCKED_RE")));
});

runTest("Prüfungs-Zwischenstand: sessionStorage speichert, validiert und räumt sauber auf", () => {
  const st = getLex("state");
  sb.clearActiveExamSession();
  assert.equal(sb.loadSavedExamSession(), null);

  const preset = sb.getExamPresetById("interval", "interval_l1");
  assert.ok(preset, "Preset interval_l1 muss existieren");

  st.exam = {
    active: true,
    categoryKey: "interval",
    levelId: preset.id,
    levelNumber: preset.levelNumber,
    feedbackMode: "blind",
    maxReplays: 2,
    totalQuestions: 10,
    currentIdx: 2,
    plan: new Array(10).fill("interval-melodic"),
    difficultyPlan: null,
    fixedIntervalPool: null,
    useCustomIntervalRoot: false,
    questions: [
      { qIndex: 1, mode: "interval-melodic", status: "correct", score: 1, chosenKey: "P5", targetKey: "P5", chosenLabel: "Reine Quinte", targetLabel: "Reine Quinte", detailNote: "", audioSnapshot: null },
      { qIndex: 2, mode: "interval-melodic", status: "wrong", score: 0, chosenKey: "P4", targetKey: "P5", chosenLabel: "Reine Quarte", targetLabel: "Reine Quinte", detailNote: "", audioSnapshot: null }
    ],
    currentAnswered: false,
    currentPromptPlayedOnce: false,
    currentReplaysUsed: 0,
    startedWallMs: Date.now() - 45000,
    advanceTimerId: null,
    autoPlayTimerId: null,
    prevSettings: { ...st.settings },
    prevHasManualBpm: false
  };
  sb.saveActiveExamSession();

  const restored = sb.loadSavedExamSession();
  assert.ok(restored, "Gültige laufende Prüfung muss wiederhergestellt werden");
  assert.equal(restored.categoryKey, "interval");
  assert.equal(restored.levelId, preset.id);
  assert.equal(restored.currentIdx, 2);
  assert.equal(restored.questions.length, 2);

  // Manipulierter bzw. abgelaufener Eintrag wird verworfen und gelöscht
  const key = getLex("EXAM_SESSION_STORAGE_KEY");
  sb.sessionStorage.setItem(key, JSON.stringify({ v: 1, categoryKey: "interval", levelId: "does_not_exist", plan: ["interval-melodic"], totalQuestions: 1, savedAt: Date.now() }));
  assert.equal(sb.loadSavedExamSession(), null);
  assert.equal(sb.sessionStorage.getItem(key), null, "Ungültiger Eintrag muss gelöscht werden");

  sb.sessionStorage.setItem(key, JSON.stringify({ v: 1, categoryKey: "interval", levelId: preset.id, plan: ["interval-melodic"], totalQuestions: 1, savedAt: Date.now() - 24 * 60 * 60 * 1000 }));
  assert.equal(sb.loadSavedExamSession(), null, "Abgelaufene Prüfung wird nicht geladen");

  st.exam = null;
  sb.clearActiveExamSession();
});

runTest("Hausaufgaben-Links & Offline-QR-Code: Roundtrip, Sanitization & ISO-Struktur", () => {
  const cases = [
    { mode: "interval-melodic", level: 3, bpm: 85 },
    { mode: "cadence", level: 2, cadencePos: "random", keyMode: "easy", timeSignature: "3/4", bpm: 95 },
    { mode: "melody", level: "sol-do", melodyRange: "sol-do", melodyKeyMode: "random", melodyOctaveMode: "multi", melodyStyle: "rhythmic", melodyPulse: false },
    { mode: "notation-treble", level: 2, notationKeyMode: "G" },
    { mode: "interval-custom", level: 1, intervalCustomRoot: "0", intervalCustomScale: "dorian", intervalCustomScope: "lower", intervalCustomPool: ["m3", "M3", "P5"] },
    { mode: "sing-interval", level: 4, singIntervalDirection: "mixed" },
    { mode: "midi-interval", level: 2, midiIntervalDirection: "down" },
    { mode: "rhythm-tap", level: 3, rhythmTapReadMode: true, rhythmTapClick: false, bpm: 100 },
    { mode: "modes-scale", level: 2, modesRoot: "7", modesRootPad: true }
  ];

  for (const sample of cases) {
    const hash = sb.encodeHomeworkHash(sample);
    assert.ok(hash.startsWith("#hw="), `Hash für ${sample.mode}: ${hash}`);
    const parsed = sb.parseHomeworkHash(hash);
    assert.ok(parsed, `Parser für ${sample.mode}`);
    assert.equal(parsed.mode, sample.mode);
    assert.equal(parsed.level, sample.level);
    if (sample.bpm) assert.equal(parsed.bpm, sample.bpm);
    if (sample.notationKeyMode) assert.equal(parsed.notationKeyMode, sample.notationKeyMode);
    if (sample.intervalCustomPool) assert.deepEqual(Array.from(parsed.intervalCustomPool), sample.intervalCustomPool);
    if (sample.singIntervalDirection) assert.equal(parsed.singIntervalDirection, sample.singIntervalDirection);
    if (sample.midiIntervalDirection) assert.equal(parsed.midiIntervalDirection, sample.midiIntervalDirection);
  }

  // Kurzform #mix=mode:level[:bpm]
  const shortParsed = sb.parseHomeworkHash("#mix=interval-melodic:2:80");
  assert.ok(shortParsed);
  assert.equal(shortParsed.mode, "interval-melodic");
  assert.equal(shortParsed.level, 2);
  assert.equal(shortParsed.bpm, 80);

  // Doppelt encodiertes Fragment (z. B. durch Messenger-Apps)
  const reEncoded = sb.parseHomeworkHash("#hw=m%3Dinterval-melodic%26l%3D2%26bpm%3D85");
  assert.ok(reEncoded);
  assert.equal(reEncoded.mode, "interval-melodic");
  assert.equal(reEncoded.level, 2);
  assert.equal(reEncoded.bpm, 85);

  // Ungültige / bösartige Hashes werden abgelehnt
  assert.equal(sb.parseHomeworkHash("#hw=m=evil-mode&l=1"), null);
  assert.equal(sb.parseHomeworkHash("#hw=" + "a".repeat(600)), null);
  assert.equal(sb.parseHomeworkHash("#other=123"), null);

  // Offline-QR-Code: gültige Matrix, Finder-Ecken, Reed-Solomon-Syndrome = 0 und sauberes SVG
  const url = sb.buildHomeworkShareUrl({ mode: "interval-melodic", level: 2, bpm: 85 });
  assert.ok(url.startsWith("https://jbkstr.github.io/lauscher/#hw="));
  const qr = sb.generateQrMatrix(url);
  assert.ok(qr && qr.version >= 1 && qr.version <= 10, "QR-Version muss in V1–V10 liegen");
  // Alle 3 Finder-Zentren (3,3), (3,size-4), (size-4,3) sind dunkel, umgeben von weißem Ring
  for (const [r, c] of [[3, 3], [3, qr.size - 4], [qr.size - 4, 3]]) {
    assert.equal(qr.modules[r][c], 1);
    assert.equal(qr.modules[r - 2][c], 0);
    assert.equal(qr.modules[r - 3][c], 1);
  }
  // Reed-Solomon-Syndrom-Check auf V1-M
  const cw = sb.qrBuildCodewordsM(sb.qrUtf8Bytes("Hello, world!"), 1);
  let root = 1;
  for (let k = 0; k < 10; k++) {
    let syn = 0;
    for (const b of cw) syn = sb.qrGfMul(syn, root) ^ b;
    assert.equal(syn, 0, `RS-Syndrom an Wurzel ${k} muss 0 sein`);
    root = sb.qrGfMul(root, 2);
  }
  const svg = sb.renderQrCodeSvg(url);
  assert.ok(svg.startsWith("<svg ") && svg.includes('fill="#ffffff"') && svg.includes('fill="#1a1a1a"'));
});

runTest("Querformat-Unterstützung: keine Hochformat-Sperre & 2-Spalten-Layout vorhanden", () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "manifest.webmanifest"), "utf8"));
  assert.equal(manifest.orientation, "any", "manifest.webmanifest muss Querformat erlauben");

  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert.ok(!html.includes("portraitLockOverlay"), "Hochformat-Sperre darf nicht mehr im Markup stehen");

  const css = fs.readFileSync(path.join(ROOT, "styles.css"), "utf8");
  assert.ok(!css.includes(".portrait-lock-overlay"), "Hochformat-Sperre darf nicht mehr im CSS stehen");
  assert.ok(css.includes("@media (orientation: landscape) and (min-width: 600px)"), "Landscape-Breakpoint fehlt");
  assert.equal(sb.isExerciseLandscapeSplit(null), false);
});

runTest("Entdecker-Modus & Eltern-PIN: Hash, Sperre, Filter & Hausaufgaben-Freigabe", () => {
  const st = getLex("state");
  assert.equal(sb.isValidExplorerPin("1234"), true);
  assert.equal(sb.isValidExplorerPin("123"), false);
  assert.equal(sb.isValidExplorerPin("12a4"), false);

  const h1 = sb.hashExplorerPin("2580");
  const h2 = sb.hashExplorerPin("1357");
  assert.ok(/^v1:[0-9a-f]{16}$/.test(h1), `Unerwartetes Hash-Format: ${h1}`);
  assert.notEqual(h1, h2);
  assert.ok(!h1.includes("2580"), "PIN darf nie im Klartext im Hash stehen");

  // Metal-Theme ist im Entdecker-Modus gesperrt: aktives Metal wird auf waldlichtung zurückgesetzt
  sb.setThemePreference("metal");
  assert.equal(st.settings.theme, "metal");
  sb.setExplorerMode(true, { toast: false });
  assert.equal(sb.isExplorerModeEnabled(), true);
  assert.equal(sb.document.documentElement.getAttribute("data-explorer-mode"), "1");
  assert.equal(sb.isExplorerPinLockActive(), false);
  assert.equal(sb.isThemeAllowedInExplorer("metal"), false);
  assert.equal(sb.isThemeAllowedInExplorer("waldlichtung"), true);
  assert.equal(st.settings.theme, "waldlichtung", "Aktivieren des Entdecker-Modus muss Metal-Theme abwählen");
  sb.setThemePreference("metal");
  assert.equal(st.settings.theme, "waldlichtung", "Metal-Theme darf im Entdecker-Modus nicht wählbar sein");

  sb.saveExplorerPinHash(h1);
  assert.equal(sb.isExplorerPinLockActive(), true);
  assert.equal(sb.verifyExplorerPin("2580"), true);
  assert.equal(sb.verifyExplorerPin("0000"), false);

  // Import mit explorerMode: false darf aktive PIN-Sperre nicht umgehen und Metal-Theme nicht aktivieren
  sb.applyImportedDisplayPrefs({ explorerMode: false, appearance: "dark", theme: "metal" });
  assert.equal(sb.isExplorerModeEnabled(), true, "Import darf aktiven PIN-geschützten Entdecker-Modus nicht abschalten");
  assert.equal(st.settings.theme, "waldlichtung", "Import darf Metal-Theme im Entdecker-Modus nicht aktivieren");

  // Kategorie- & Mix-Filter: Kadenzen bleiben drin (major-last, minor-last), Studio/Modi raus
  const filteredCad = sb.filterExplorerCategoryItems("cadence", [
    { id: "major-last", meta: "4 Stufen" },
    { id: "major-random", meta: "4 Stufen" },
    { id: "minor-last", meta: "4 Stufen" }
  ]);
  assert.deepEqual(filteredCad.map(x => x.id), ["major-last", "minor-last"]);
  assert.equal(sb.isModeAllowedInExplorerMix("cadence"), true);
  assert.equal(sb.isModeAllowedInExplorerMix("prod-eq-noise"), false);
  assert.equal(sb.isModeAllowedInExplorerMix("modes-scale"), false);
  assert.deepEqual(Array.from(sb.getExplorerAllowedLevelsForMix("cadence", [1, 2, 3, 4])), [1, 2]);
  assert.deepEqual(Array.from(sb.getExplorerAllowedLevelsForMix("melody", ["do-fa", "sol-do", "full"])), ["do-fa", "sol-do"]);

  // Prüfungen im Entdecker-Modus: nur Einsteiger-Stufen <= 2, keine Custom-Prüfung
  const presets = sb.filterExplorerExamPresets("interval", getLex("EXAM_CATEGORY_LEVELS").interval.presets);
  assert.ok(presets.length > 0 && presets.every(p => p.levelNumber <= 2 && !p.isCustomIntervalExam));

  // Hausaufgaben-Links bleiben auch im Entdecker-Modus voll funktionsfähig
  const hw = sb.parseHomeworkHash("#hw=m=modes-scale&l=2");
  assert.ok(hw && hw.mode === "modes-scale" && hw.level === 2);

  // Aufräumen für nachfolgende Tests
  sb.saveExplorerPinHash("");
  sb.setExplorerMode(false, { toast: false });
  assert.equal(st.settings.explorerMode, false);
  assert.equal(sb.document.documentElement.getAttribute("data-explorer-mode"), null);
});

runTest("Profil-Rolle: Entkopplung, Sanitization, i18n & rollenabhängige Teilen-Texte", () => {
  const st = getLex("state");
  const roles = getLex("PROFILE_ROLE_OPTIONS");
  const defRole = getLex("PROFILE_ROLE_DEFAULT");
  assert.equal(defRole, "self");
  assert.deepEqual(Object.keys(roles), ["self", "student", "teacher", "parent", "ensemble"]);

  const defProfile = sb.createDefaultProfile();
  assert.equal(defProfile.role, "self");

  // Sanitization: gültige Rolle bleibt, ungültige oder fehlende fällt auf "self" zurück
  assert.equal(sb.sanitizeUserProfile({ role: "teacher", instruments: ["Gitarre"] }).role, "teacher");
  assert.equal(sb.sanitizeUserProfile({ role: "student" }).role, "student");
  assert.equal(sb.sanitizeUserProfile({ role: "ungueltig" }).role, "self");
  assert.equal(sb.sanitizeUserProfile({}).role, "self");

  // Alle Rollen haben Übersetzungen in allen 10 Sprachen
  const langs = getLex("VALID_LANGUAGES");
  langs.forEach(lang => {
    st.settings.language = lang;
    Object.keys(roles).forEach(rk => {
      const loc = sb.getLocalizedProfileRole(rk);
      assert.ok(loc && typeof loc.label === "string" && loc.label.length > 0, `Rolle ${rk} fehlt in ${lang}`);
      assert.ok(typeof loc.hint === "string" && loc.hint.length > 0, `Rollen-Hint ${rk} fehlt in ${lang}`);
    });
  });
  st.settings.language = "de";

  // Rollenabhängige Texte für Teilen / Hausaufgaben
  const prevRole = st.profile.role;
  st.profile.role = "teacher";
  assert.equal(sb.isTeacherShareRole(), true);
  assert.equal(sb.isHomeworkReceiveRole(), true);
  assert.equal(sb.getHomeworkShareActionLabel(), "Als Hausaufgabe teilen");

  st.profile.role = "student";
  assert.equal(sb.isTeacherShareRole(), false);
  assert.equal(sb.isHomeworkReceiveRole(), true);
  assert.equal(sb.getHomeworkShareActionLabel(), "Übung teilen");

  st.profile.role = "self";
  assert.equal(sb.isTeacherShareRole(), false);
  assert.equal(sb.isHomeworkReceiveRole(), false);
  assert.equal(sb.getHomeworkShareActionLabel(), "Übung teilen");

  st.profile.role = prevRole;
});

runTest("Onboarding-Willkommensmelodie: Klavier-Komposition & Schutz vor stopPlayback()", () => {
  const melody = getLex("ONBOARDING_WELCOME_MELODY");
  const SampledInst = getLex("EarLabSampledInstrument");
  const Engine = getLex("AudioEngine");
  assert.ok(Array.isArray(melody) && melody.length >= 16);

  // Jede Note muss gültig sein, Spielzeit zwischen 3 und 5 Sekunden
  let maxStart = 0;
  melody.forEach(ev => {
    const midi = SampledInst.noteToMidi(ev.note);
    assert.ok(Number.isInteger(midi) && midi >= 36 && midi <= 96, `Ungültige Note: ${ev.note}`);
    assert.ok(ev.t >= 0 && ev.dur > 0 && ev.vel > 0 && ev.vel <= 1);
    if (ev.t > maxStart) maxStart = ev.t;
  });
  assert.ok(maxStart >= 3.0 && maxStart <= 5.0, `Melodie-Länge außerhalb 3–5 s: ${maxStart}`);

  // stopPlayback() darf eine laufende Welcome-Session NICHT vorzeitig abbrechen
  const engine = new Engine();
  let released = false;
  engine.activeWelcomeSession = {
    instrument: { releaseAll() { released = true; } },
    tempGain: null,
    cleanupTimer: null
  };
  engine.stopPlayback();
  assert.equal(released, false, "stopPlayback() darf die Onboarding-Melodie nicht stoppen");
  assert.ok(engine.activeWelcomeSession, "activeWelcomeSession muss bei stopPlayback() erhalten bleiben");

  // Explizites stopOnboardingWelcomeMelody() (z. B. App-Hintergrund) stoppt sie sauber
  engine.stopOnboardingWelcomeMelody();
  assert.equal(released, true, "stopOnboardingWelcomeMelody() muss die Melodie sauber beenden");
  assert.equal(engine.activeWelcomeSession, null);
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
