// =====================================================
// HAUSAUFGABEN-LINKS & OFFLINE-QR-CODE (js/homework.js)
// =====================================================
// Erzeugt kompakte, serverlose Hash-Links (#hw=… / #mix=…)
// samt rein lokal gerendertem SVG-QR-Code (ISO/IEC 18004,
// ECC Level M, Version 1–10) und freundlicher Schüler-Startkarte.
"use strict";

// ---------- 1. OFFLINE QR-CODE GENERATOR (ISO/IEC 18004, ECC M, V1–V10) ----------

const QR_VERSION_SPECS_M = [
  null,
  // [ecPerBlock, g1Blocks, g1DataCw, g2Blocks, g2DataCw, alignCoords]
  [10, 1, 16, 0, 0, []],
  [16, 1, 28, 0, 0, [6, 18]],
  [26, 1, 44, 0, 0, [6, 22]],
  [18, 2, 32, 0, 0, [6, 26]],
  [24, 2, 43, 0, 0, [6, 30]],
  [16, 4, 27, 0, 0, [6, 34]],
  [18, 4, 31, 0, 0, [6, 22, 38]],
  [22, 2, 38, 2, 39, [6, 24, 42]],
  [22, 3, 36, 2, 37, [6, 26, 46]],
  [26, 4, 43, 1, 44, [6, 28, 50]]
];

function qrUtf8Bytes(text) {
  const str = String(text || "");
  if (typeof TextEncoder === "function") {
    return Array.from(new TextEncoder().encode(str));
  }
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code >= 0xd800 && code <= 0xdbff && i + 1 < str.length) {
      const next = str.charCodeAt(++i);
      const cp = 0x10000 + (((code & 0x3ff) << 10) | (next & 0x3ff));
      bytes.push(
        0xf0 | (cp >> 18),
        0x80 | ((cp >> 12) & 0x3f),
        0x80 | ((cp >> 6) & 0x3f),
        0x80 | (cp & 0x3f)
      );
    } else {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    }
  }
  return bytes;
}

function qrGfMul(x, y) {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >> 7) * 0x11d);
    z ^= ((y >> i) & 1) * x;
  }
  return z;
}

function qrReedSolomonDivisor(degree) {
  const result = new Array(degree).fill(0);
  result[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      result[j] = qrGfMul(result[j], root);
      if (j + 1 < degree) result[j] ^= result[j + 1];
    }
    root = qrGfMul(root, 0x02);
  }
  return result;
}

function qrReedSolomonRemainder(data, divisor) {
  const result = new Array(divisor.length).fill(0);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ result.shift();
    result.push(0);
    for (let j = 0; j < divisor.length; j++) {
      result[j] ^= qrGfMul(divisor[j], factor);
    }
  }
  return result;
}

function qrSelectVersionM(byteCount) {
  for (let v = 1; v < QR_VERSION_SPECS_M.length; v++) {
    const spec = QR_VERSION_SPECS_M[v];
    const totalDataCw = spec[1] * spec[2] + spec[3] * spec[4];
    const countBits = v <= 9 ? 8 : 16;
    const totalDataBits = totalDataCw * 8;
    const neededBits = 4 + countBits + byteCount * 8;
    if (neededBits <= totalDataBits) return v;
  }
  return -1;
}

function qrBuildCodewordsM(bytes, version) {
  const [ecPerBlock, g1Blocks, g1DataCw, g2Blocks, g2DataCw] = QR_VERSION_SPECS_M[version];
  const totalDataCw = g1Blocks * g1DataCw + g2Blocks * g2DataCw;
  const countBits = version <= 9 ? 8 : 16;

  const bits = [];
  const pushBits = (val, len) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };

  pushBits(0x4, 4); // Byte-Modus
  pushBits(bytes.length, countBits);
  for (let i = 0; i < bytes.length; i++) pushBits(bytes[i], 8);

  const maxBits = totalDataCw * 8;
  const termLen = Math.min(4, maxBits - bits.length);
  for (let i = 0; i < termLen; i++) bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);

  const dataCw = [];
  for (let i = 0; i < bits.length; i += 8) {
    let b = 0;
    for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
    dataCw.push(b);
  }
  let padToggle = 0;
  while (dataCw.length < totalDataCw) {
    dataCw.push(padToggle === 0 ? 0xec : 0x11);
    padToggle ^= 1;
  }

  // Blöcke aufteilen & Reed-Solomon-Korrektur berechnen
  const divisor = qrReedSolomonDivisor(ecPerBlock);
  const dataBlocks = [];
  const ecBlocks = [];
  let offset = 0;
  const totalBlocks = g1Blocks + g2Blocks;
  for (let b = 0; b < totalBlocks; b++) {
    const len = b < g1Blocks ? g1DataCw : g2DataCw;
    const block = dataCw.slice(offset, offset + len);
    offset += len;
    dataBlocks.push(block);
    ecBlocks.push(qrReedSolomonRemainder(block, divisor));
  }

  // Interleaving: zuerst Daten-Codewörter, dann EC-Codewörter
  const interleaved = [];
  const maxDataLen = Math.max(g1DataCw, g2DataCw);
  for (let i = 0; i < maxDataLen; i++) {
    for (let b = 0; b < totalBlocks; b++) {
      if (i < dataBlocks[b].length) interleaved.push(dataBlocks[b][i]);
    }
  }
  for (let i = 0; i < ecPerBlock; i++) {
    for (let b = 0; b < totalBlocks; b++) {
      interleaved.push(ecBlocks[b][i]);
    }
  }
  return interleaved;
}

function qrApplyFormatBits(modules, size, mask) {
  // ECC Level M = 0b00
  const data = (0 << 3) | mask;
  let rem = data;
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >> 9) * 0x537);
  const bits = ((data << 10) | rem) ^ 0x5412;

  for (let i = 0; i <= 5; i++) modules[i][8] = (bits >> i) & 1;
  modules[7][8] = (bits >> 6) & 1;
  modules[8][8] = (bits >> 7) & 1;
  modules[8][7] = (bits >> 8) & 1;
  for (let i = 9; i < 15; i++) modules[8][14 - i] = (bits >> i) & 1;

  for (let i = 0; i < 8; i++) modules[8][size - 1 - i] = (bits >> i) & 1;
  for (let i = 8; i < 15; i++) modules[size - 15 + i][8] = (bits >> i) & 1;
  modules[size - 8][8] = 1; // Fester dunkler Punkt
}

function qrApplyVersionBits(modules, isFunction, size, version) {
  if (version < 7) return;
  let rem = version;
  for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >> 11) * 0x1f25);
  const bits = (version << 12) | rem;
  for (let i = 0; i < 18; i++) {
    const bit = (bits >> i) & 1;
    const a = size - 11 + (i % 3);
    const b = Math.floor(i / 3);
    modules[b][a] = bit;
    isFunction[b][a] = true;
    modules[a][b] = bit;
    isFunction[a][b] = true;
  }
}

function qrMaskBit(mask, r, c) {
  switch (mask) {
    case 0: return ((r + c) % 2) === 0;
    case 1: return (r % 2) === 0;
    case 2: return (c % 3) === 0;
    case 3: return ((r + c) % 3) === 0;
    case 4: return ((Math.floor(r / 2) + Math.floor(c / 3)) % 2) === 0;
    case 5: return ((r * c) % 2 + (r * c) % 3) === 0;
    case 6: return ((((r * c) % 2) + ((r * c) % 3)) % 2) === 0;
    case 7: return ((((r + c) % 2) + ((r * c) % 3)) % 2) === 0;
    default: return false;
  }
}

function qrScorePenalty(modules, size) {
  let penalty = 0;

  // Regel 1: Läufe gleicher Farbe >= 5 in Zeilen und Spalten
  for (let r = 0; r < size; r++) {
    let runColor = modules[r][0];
    let runLen = 1;
    for (let c = 1; c < size; c++) {
      if (modules[r][c] === runColor) {
        runLen++;
      } else {
        if (runLen >= 5) penalty += 3 + (runLen - 5);
        runColor = modules[r][c];
        runLen = 1;
      }
    }
    if (runLen >= 5) penalty += 3 + (runLen - 5);
  }
  for (let c = 0; c < size; c++) {
    let runColor = modules[0][c];
    let runLen = 1;
    for (let r = 1; r < size; r++) {
      if (modules[r][c] === runColor) {
        runLen++;
      } else {
        if (runLen >= 5) penalty += 3 + (runLen - 5);
        runColor = modules[r][c];
        runLen = 1;
      }
    }
    if (runLen >= 5) penalty += 3 + (runLen - 5);
  }

  // Regel 2: 2×2-Blöcke gleicher Farbe
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const col = modules[r][c];
      if (col === modules[r][c + 1] && col === modules[r + 1][c] && col === modules[r + 1][c + 1]) {
        penalty += 3;
      }
    }
  }

  // Regel 3: Finder-ähnliche Muster (1011101 + 4×0)
  const checkLine = (getVal) => {
    for (let i = 0; i <= size - 11; i++) {
      const a =
        getVal(i) === 1 && getVal(i + 1) === 0 && getVal(i + 2) === 1 && getVal(i + 3) === 1 &&
        getVal(i + 4) === 1 && getVal(i + 5) === 0 && getVal(i + 6) === 1 &&
        getVal(i + 7) === 0 && getVal(i + 8) === 0 && getVal(i + 9) === 0 && getVal(i + 10) === 0;
      const b =
        getVal(i) === 0 && getVal(i + 1) === 0 && getVal(i + 2) === 0 && getVal(i + 3) === 0 &&
        getVal(i + 4) === 1 && getVal(i + 5) === 0 && getVal(i + 6) === 1 && getVal(i + 7) === 1 &&
        getVal(i + 8) === 1 && getVal(i + 9) === 0 && getVal(i + 10) === 1;
      if (a || b) penalty += 40;
    }
  };
  for (let r = 0; r < size; r++) checkLine(i => modules[r][i]);
  for (let c = 0; c < size; c++) checkLine(i => modules[i][c]);

  // Regel 4: Verhältnis dunkler Module zu 50 %
  let dark = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) dark += modules[r][c];
  }
  const total = size * size;
  const k = Math.floor(Math.abs(dark * 20 - total * 10) / total);
  penalty += k * 10;

  return penalty;
}

function generateQrMatrix(text) {
  const bytes = qrUtf8Bytes(text);
  const version = qrSelectVersionM(bytes.length);
  if (version < 1) return null;

  const size = 17 + 4 * version;
  const modules = Array.from({ length: size }, () => new Array(size).fill(0));
  const isFunction = Array.from({ length: size }, () => new Array(size).fill(false));

  const setFunc = (r, c, val) => {
    if (r < 0 || r >= size || c < 0 || c >= size) return;
    modules[r][c] = val ? 1 : 0;
    isFunction[r][c] = true;
  };

  // Timing-Muster
  for (let i = 0; i < size; i++) {
    setFunc(6, i, i % 2 === 0);
    setFunc(i, 6, i % 2 === 0);
  }

  // Finder-Muster inkl. Separator
  const drawFinder = (cr, cc) => {
    for (let dr = -4; dr <= 4; dr++) {
      for (let dc = -4; dc <= 4; dc++) {
        const dist = Math.max(Math.abs(dr), Math.abs(dc));
        setFunc(cr + dr, cc + dc, dist !== 2 && dist !== 4);
      }
    }
  };
  drawFinder(3, 3);
  drawFinder(3, size - 4);
  drawFinder(size - 4, 3);

  // Alignment-Muster
  const alignCoords = QR_VERSION_SPECS_M[version][5];
  const lastAlignIdx = alignCoords.length - 1;
  for (let i = 0; i < alignCoords.length; i++) {
    for (let j = 0; j < alignCoords.length; j++) {
      if ((i === 0 && j === 0) || (i === 0 && j === lastAlignIdx) || (i === lastAlignIdx && j === 0)) {
        continue;
      }
      const cr = alignCoords[i];
      const cc = alignCoords[j];
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const dist = Math.max(Math.abs(dr), Math.abs(dc));
          setFunc(cr + dr, cc + dc, dist !== 1);
        }
      }
    }
  }

  // Format- und Versions-Plätze als Funktionsmodule reservieren
  for (let i = 0; i <= 8; i++) {
    if (i !== 6) {
      isFunction[i][8] = true;
      isFunction[8][i] = true;
    }
  }
  for (let i = 0; i < 8; i++) isFunction[8][size - 1 - i] = true;
  for (let i = 0; i < 8; i++) isFunction[size - 1 - i][8] = true;
  qrApplyVersionBits(modules, isFunction, size, version);

  // Codewörter im Zickzack platzieren
  const codewords = qrBuildCodewordsM(bytes, version);
  let bitIdx = 0;
  const totalBits = codewords.length * 8;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    const upward = ((right + 1) & 2) === 0;
    for (let step = 0; step < size; step++) {
      const r = upward ? size - 1 - step : step;
      for (let j = 0; j < 2; j++) {
        const c = right - j;
        if (isFunction[r][c]) continue;
        let bit = 0;
        if (bitIdx < totalBits) {
          bit = (codewords[bitIdx >> 3] >> (7 - (bitIdx & 7))) & 1;
          bitIdx++;
        }
        modules[r][c] = bit;
      }
    }
  }

  // Beste Maske (0–7) nach ISO-Penalty wählen
  let bestMask = 0;
  let bestPenalty = Infinity;
  let bestModules = null;

  for (let mask = 0; mask < 8; mask++) {
    const candidate = modules.map((row, r) =>
      row.map((val, c) => (!isFunction[r][c] && qrMaskBit(mask, r, c) ? val ^ 1 : val))
    );
    qrApplyFormatBits(candidate, size, mask);
    const penalty = qrScorePenalty(candidate, size);
    if (penalty < bestPenalty) {
      bestPenalty = penalty;
      bestMask = mask;
      bestModules = candidate;
    }
  }

  return { version, size, mask: bestMask, modules: bestModules };
}

function renderQrCodeSvg(text, options = {}) {
  const qr = generateQrMatrix(text);
  if (!qr) return "";
  const quiet = Number.isInteger(options.quietZone) ? options.quietZone : 4;
  const full = qr.size + quiet * 2;
  const paths = [];
  for (let r = 0; r < qr.size; r++) {
    let runStart = -1;
    for (let c = 0; c <= qr.size; c++) {
      const dark = c < qr.size && qr.modules[r][c] === 1;
      if (dark && runStart === -1) {
        runStart = c;
      } else if (!dark && runStart !== -1) {
        const x = runStart + quiet;
        const y = r + quiet;
        const w = c - runStart;
        paths.push(`M${x},${y}h${w}v1h-${w}z`);
        runStart = -1;
      }
    }
  }
  const ariaLabel = typeof options.ariaLabel === "string" && options.ariaLabel
    ? options.ariaLabel
    : "QR-Code";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${full} ${full}" width="216" height="216" shape-rendering="crispEdges" role="img" aria-label="${escapeHtml(ariaLabel)}" class="homework-qr-svg"><rect width="${full}" height="${full}" fill="#ffffff"/><path d="${paths.join("")}" fill="#1a1a1a"/></svg>`;
}

// ---------- 2. HAUSAUFGABEN-DATENFORMAT & URL-ENCODING ----------

const HOMEWORK_ALLOWED_KEY_MODES = ["fixed", "easy", "all"];
const HOMEWORK_ALLOWED_TIME_SIGS = ["4/4", "3/4", "6/8", "odd", "random"];

let _pendingHomeworkFromUrl = null;
let _activeHomeworkShareData = null;
let _activeHomeworkStartData = null;

function getHomeworkValidLevelsForMode(mode) {
  if (mode === "interval-custom") return [1];
  const entry = MIX_MODE_CATALOG[mode] || SING_MATCH_MODE_CATALOG[mode] || MIDI_PLAY_MODE_CATALOG[mode];
  return entry?.levels || [];
}

function getCurrentExerciseLevelForMode(mode) {
  const s = state?.settings;
  if (!s) return 1;
  if (isCadenceMode(mode)) return s.difficulty;
  if (isChordQualityMode(mode)) return s.chordDifficulty;
  if (mode === "chord-inversions") return s.chordInversionDifficulty;
  if (mode === "solfege") return s.solfegeDifficulty;
  if (mode === "melody") return s.melodyRange;
  if (mode === "rhythm-meter") return s.rhythmMeterDifficulty;
  if (mode === "rhythm-dictation") return s.rhythmDictationDifficulty;
  if (mode === "rhythm-tap") return s.rhythmTapDifficulty;
  if (mode === "rhythm-groove") return s.rhythmGrooveDifficulty;
  if (mode === "prod-tone") return s.prodToneDifficulty;
  if (mode === "prod-eq-noise") return s.prodEqNoiseDifficulty;
  if (mode === "modes-scale") return s.modesScaleDifficulty;
  if (mode === "modes-char") return s.modesCharDifficulty;
  if (mode === "modes-cadence") return s.modesCadenceDifficulty;
  if (isNotationMode(mode)) return s.notationDifficulty;
  if (mode === "sing-interval") return s.singIntervalDifficulty;
  if (mode === "sing-degree") return s.singDegreeDifficulty;
  if (mode === "midi-interval") return s.midiIntervalDifficulty;
  if (mode === "midi-chord") return s.midiChordDifficulty;
  if (mode === "midi-scale") return s.midiScaleDifficulty;
  if (mode === "interval-custom") return 1;
  return s.intervalDifficulty;
}

function homeworkModeSupportsBpm(mode) {
  if (!mode) return false;
  if (mode.startsWith("prod-") || mode.startsWith("modes-")) return false;
  if (isNotationMode(mode) || isBlockChordMode(mode)) return false;
  if (isSingMatchMode(mode) || isMidiPlayMode(mode)) return false;
  return true;
}

function sanitizeHomeworkPayload(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const validModes = getPracticeValidModes();
  const mode = typeof raw.mode === "string" && validModes.includes(raw.mode) ? raw.mode : null;
  if (!mode) return null;

  const validLevels = getHomeworkValidLevelsForMode(mode);
  let level = validLevels[0] ?? 1;
  if (mode === "melody") {
    const mr = raw.melodyRange || raw.level;
    level = ["do-fa", "sol-do", "full"].includes(mr) ? mr : "do-fa";
  } else if (mode === "interval-custom") {
    level = 1;
  } else {
    const parsed = parseInt(raw.level, 10);
    level = validLevels.includes(parsed) ? parsed : (validLevels[0] ?? 1);
  }

  const out = { mode, level };

  const title = String(raw.title || "").trim().slice(0, 32);
  if (title) out.title = title;

  const bpm = parseInt(raw.bpm, 10);
  if (homeworkModeSupportsBpm(mode) && Number.isFinite(bpm) && bpm >= 55 && bpm <= 160) {
    out.bpm = bpm;
  }

  if (isCadenceMode(mode)) {
    if (raw.cadencePos === "random") out.cadencePos = "random";
    if (HOMEWORK_ALLOWED_KEY_MODES.includes(raw.keyMode) && raw.keyMode !== "fixed") {
      out.keyMode = raw.keyMode;
    }
    if (HOMEWORK_ALLOWED_TIME_SIGS.includes(raw.timeSignature) && raw.timeSignature !== "4/4") {
      out.timeSignature = raw.timeSignature;
    }
  }

  if (mode === "interval-custom") {
    if (PRACTICE_OPTION_RULES.intervalCustomRoot.includes(raw.intervalCustomRoot)) {
      out.intervalCustomRoot = raw.intervalCustomRoot;
    }
    if (PRACTICE_OPTION_RULES.intervalCustomScale.includes(raw.intervalCustomScale)) {
      out.intervalCustomScale = raw.intervalCustomScale;
    }
    if (PRACTICE_OPTION_RULES.intervalCustomScope.includes(raw.intervalCustomScope)) {
      out.intervalCustomScope = raw.intervalCustomScope;
    }
    if (Array.isArray(raw.intervalCustomPool)) {
      const pool = Array.from(new Set(raw.intervalCustomPool
        .filter(k => typeof k === "string" && /^[A-Za-z0-9]{2,4}$/.test(k)))).slice(0, 16);
      if (pool.length >= 2) out.intervalCustomPool = pool;
    }
  }

  if (mode === "solfege" && level === 17) {
    if (PRACTICE_OPTION_RULES.solfegeCustomKey.includes(raw.solfegeCustomKey)) {
      out.solfegeCustomKey = raw.solfegeCustomKey;
    }
    if (PRACTICE_OPTION_RULES.solfegeCustomTonality.includes(raw.solfegeCustomTonality)) {
      out.solfegeCustomTonality = raw.solfegeCustomTonality;
    }
    if (PRACTICE_OPTION_RULES.solfegeCustomRange.includes(raw.solfegeCustomRange)) {
      out.solfegeCustomRange = raw.solfegeCustomRange;
    }
    if (PRACTICE_OPTION_RULES.solfegeCustomOctave.includes(raw.solfegeCustomOctave)) {
      out.solfegeCustomOctave = raw.solfegeCustomOctave;
    }
  }

  if (mode === "melody") {
    out.melodyRange = level;
    if (PRACTICE_OPTION_RULES.melodyKeyMode.includes(raw.melodyKeyMode) && raw.melodyKeyMode !== "fixed") {
      out.melodyKeyMode = raw.melodyKeyMode;
    }
    if (PRACTICE_OPTION_RULES.melodyOctaveMode.includes(raw.melodyOctaveMode) && raw.melodyOctaveMode !== "single") {
      out.melodyOctaveMode = raw.melodyOctaveMode;
    }
    if (PRACTICE_OPTION_RULES.melodyStyle.includes(raw.melodyStyle) && raw.melodyStyle !== "steady") {
      out.melodyStyle = raw.melodyStyle;
    }
    if (typeof raw.melodyPulse === "boolean" && raw.melodyPulse === false) {
      out.melodyPulse = false;
    }
  }

  if (mode === "rhythm-tap") {
    if (raw.rhythmTapReadMode === true) out.rhythmTapReadMode = true;
    if (raw.rhythmTapClick === false) out.rhythmTapClick = false;
  }

  if (mode.startsWith("modes-")) {
    if (PRACTICE_OPTION_RULES.modesRoot.includes(raw.modesRoot) && raw.modesRoot !== "auto") {
      out.modesRoot = raw.modesRoot;
    }
    if (raw.modesRootPad === true) out.modesRootPad = true;
  }

  if (isNotationMode(mode) && raw.notationKeyMode) {
    const nkm = typeof normalizeNotationKeyMode === "function"
      ? normalizeNotationKeyMode(raw.notationKeyMode)
      : "none";
    if (nkm && nkm !== "none") out.notationKeyMode = nkm;
  }

  if (mode === "sing-interval" && PRACTICE_OPTION_RULES.singIntervalDirection.includes(raw.singIntervalDirection) && raw.singIntervalDirection !== "up") {
    out.singIntervalDirection = raw.singIntervalDirection;
  }
  if (mode === "midi-interval" && PRACTICE_OPTION_RULES.midiIntervalDirection.includes(raw.midiIntervalDirection) && raw.midiIntervalDirection !== "up") {
    out.midiIntervalDirection = raw.midiIntervalDirection;
  }

  return out;
}

function buildHomeworkPayloadFromCurrentExercise() {
  const s = state?.settings;
  if (!s) return null;
  const mode = s.mode;
  const level = getCurrentExerciseLevelForMode(mode);
  const raw = {
    mode,
    level,
    bpm: homeworkModeSupportsBpm(mode) && state.hasManualExerciseBpm ? state.activeBpm : 0,
    cadencePos: s.cadencePos,
    keyMode: s.keyMode,
    timeSignature: s.timeSignature,
    intervalCustomRoot: s.intervalCustomRoot,
    intervalCustomScale: s.intervalCustomScale,
    intervalCustomScope: s.intervalCustomScope,
    intervalCustomPool: Array.isArray(s.intervalCustomPool) ? [...s.intervalCustomPool] : null,
    solfegeCustomKey: s.solfegeCustomKey,
    solfegeCustomTonality: s.solfegeCustomTonality,
    solfegeCustomRange: s.solfegeCustomRange,
    solfegeCustomOctave: s.solfegeCustomOctave,
    melodyRange: s.melodyRange,
    melodyKeyMode: s.melodyKeyMode,
    melodyOctaveMode: s.melodyOctaveMode,
    melodyStyle: s.melodyStyle,
    melodyPulse: s.melodyPulse,
    rhythmTapReadMode: s.rhythmTapReadMode,
    rhythmTapClick: s.rhythmTapClick,
    modesRoot: s.modesRoot,
    modesRootPad: s.modesRootPad,
    notationKeyMode: isNotationMode(mode) ? s.notationKeyMode : "none",
    singIntervalDirection: s.singIntervalDirection,
    midiIntervalDirection: s.midiIntervalDirection
  };
  return sanitizeHomeworkPayload(raw);
}

function buildHomeworkPayloadFromMix(mix) {
  if (!mix || typeof mix !== "object") return null;
  const localizedTitle = typeof getLocalizedMixTitle === "function" ? getLocalizedMixTitle(mix) : (mix.title || "");
  const defaultModeLabel = typeof getLocalizedMixModeLabel === "function" ? getLocalizedMixModeLabel(mix.mode) : "";
  const title = localizedTitle && localizedTitle !== defaultModeLabel ? localizedTitle : "";
  return sanitizeHomeworkPayload({
    mode: mix.mode,
    level: mix.level,
    title,
    bpm: mix.bpm,
    melodyRange: mix.melodyRange,
    melodyKeyMode: mix.melodyKeyMode,
    melodyOctaveMode: mix.melodyOctaveMode,
    melodyStyle: mix.melodyStyle,
    melodyPulse: mix.melodyPulse,
    notationKeyMode: mix.notationKeyMode
  });
}

function encodeHomeworkHash(payload) {
  const clean = sanitizeHomeworkPayload(payload);
  if (!clean) return "";
  const params = new URLSearchParams();
  params.set("m", clean.mode);
  if (clean.mode !== "interval-custom") {
    params.set("l", String(clean.level));
  }
  if (clean.bpm) params.set("bpm", String(clean.bpm));
  if (clean.cadencePos) params.set("cp", clean.cadencePos);
  if (clean.keyMode) params.set("km", clean.keyMode);
  if (clean.timeSignature) params.set("ts", clean.timeSignature);
  if (clean.intervalCustomRoot && clean.intervalCustomRoot !== "random") params.set("icr", clean.intervalCustomRoot);
  if (clean.intervalCustomScale && clean.intervalCustomScale !== "ionian") params.set("ics", clean.intervalCustomScale);
  if (clean.intervalCustomScope && clean.intervalCustomScope !== "full") params.set("ico", clean.intervalCustomScope);
  if (Array.isArray(clean.intervalCustomPool) && clean.intervalCustomPool.length >= 2) {
    params.set("icp", clean.intervalCustomPool.join(","));
  }
  if (clean.solfegeCustomKey && clean.solfegeCustomKey !== "C") params.set("sck", clean.solfegeCustomKey);
  if (clean.solfegeCustomTonality && clean.solfegeCustomTonality !== "major") params.set("sct", clean.solfegeCustomTonality);
  if (clean.solfegeCustomRange && clean.solfegeCustomRange !== "full") params.set("scr", clean.solfegeCustomRange);
  if (clean.solfegeCustomOctave && clean.solfegeCustomOctave !== "single") params.set("sco", clean.solfegeCustomOctave);
  if (clean.melodyKeyMode) params.set("mkm", clean.melodyKeyMode);
  if (clean.melodyOctaveMode) params.set("mom", clean.melodyOctaveMode);
  if (clean.melodyStyle) params.set("ms", clean.melodyStyle);
  if (clean.melodyPulse === false) params.set("mp", "0");
  if (clean.rhythmTapReadMode) params.set("rtr", "1");
  if (clean.rhythmTapClick === false) params.set("rtc", "0");
  if (clean.modesRoot) params.set("mr", clean.modesRoot);
  if (clean.modesRootPad) params.set("mpd", "1");
  if (clean.notationKeyMode) params.set("nkm", clean.notationKeyMode);
  if (clean.singIntervalDirection) params.set("sdr", clean.singIntervalDirection);
  if (clean.midiIntervalDirection) params.set("mdr", clean.midiIntervalDirection);
  if (clean.title) params.set("t", clean.title);
  return `#hw=${params.toString()}`;
}

function parseHomeworkHash(hashStr) {
  const raw = String(hashStr || "").trim();
  if (!raw) return null;
  const stripped = raw.startsWith("#") ? raw.slice(1) : raw;

  // Kurzform #mix=interval-melodic:2 (auch manuell leicht tippbar)
  if (stripped.startsWith("mix=")) {
    const body = decodeURIComponent(stripped.slice(4)).trim();
    const parts = body.split(":");
    const mode = parts[0] || "";
    const level = parts[1] || "";
    const bpm = parts[2] || "";
    return sanitizeHomeworkPayload({ mode, level, bpm });
  }

  if (!stripped.startsWith("hw=")) return null;
  let query = stripped.slice(3);
  if (!query || query.length > 512) return null;
  // Manche Messenger encodieren das gesamte Fragment nach #hw= einmal zusätzlich
  if (!query.includes("=") && /%3d/i.test(query)) {
    try { query = decodeURIComponent(query); } catch (_) { return null; }
  }

  let params;
  try {
    params = new URLSearchParams(query);
  } catch (_) {
    return null;
  }

  const mode = params.get("m") || "";
  const icpRaw = params.get("icp");
  const candidate = {
    mode,
    level: params.get("l"),
    title: params.get("t") || "",
    bpm: params.get("bpm"),
    cadencePos: params.get("cp"),
    keyMode: params.get("km"),
    timeSignature: params.get("ts"),
    intervalCustomRoot: params.get("icr") || undefined,
    intervalCustomScale: params.get("ics") || undefined,
    intervalCustomScope: params.get("ico") || undefined,
    intervalCustomPool: icpRaw ? icpRaw.split(",").map(s => s.trim()).filter(Boolean) : undefined,
    solfegeCustomKey: params.get("sck") || undefined,
    solfegeCustomTonality: params.get("sct") || undefined,
    solfegeCustomRange: params.get("scr") || undefined,
    solfegeCustomOctave: params.get("sco") || undefined,
    melodyRange: mode === "melody" ? params.get("l") : undefined,
    melodyKeyMode: params.get("mkm") || undefined,
    melodyOctaveMode: params.get("mom") || undefined,
    melodyStyle: params.get("ms") || undefined,
    melodyPulse: params.has("mp") ? params.get("mp") !== "0" : undefined,
    rhythmTapReadMode: params.get("rtr") === "1" ? true : undefined,
    rhythmTapClick: params.has("rtc") ? params.get("rtc") !== "0" : undefined,
    modesRoot: params.get("mr") || undefined,
    modesRootPad: params.get("mpd") === "1" ? true : undefined,
    notationKeyMode: params.get("nkm") || undefined,
    singIntervalDirection: params.get("sdr") || undefined,
    midiIntervalDirection: params.get("mdr") || undefined
  };
  return sanitizeHomeworkPayload(candidate);
}

function getHomeworkShareBaseUrl() {
  const fallback = typeof LAUSCHER_WEB_URL === "string" && LAUSCHER_WEB_URL
    ? LAUSCHER_WEB_URL
    : "https://jbkstr.github.io/lauscher/";
  if (typeof window === "undefined" || !window.location) return fallback;
  const proto = window.location.protocol;
  const host = window.location.hostname || "";
  const isLocal = host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "";
  const isNative = typeof isRunningInNativeApp === "function" && isRunningInNativeApp();
  if (isNative || (proto !== "https:" && proto !== "http:") || isLocal) {
    return fallback;
  }
  return `${window.location.origin}${window.location.pathname}`;
}

function buildHomeworkShareUrl(payload) {
  const hash = encodeHomeworkHash(payload);
  if (!hash) return "";
  return `${getHomeworkShareBaseUrl()}${hash}`;
}

function getHomeworkModeDisplayName(mode) {
  if (mode === "interval-custom") {
    return tr("Intervalle • Eigene Auswahl", "Intervals • Custom selection");
  }
  if (MIX_MODE_CATALOG[mode] && typeof getLocalizedMixModeLabel === "function") {
    return getLocalizedMixModeLabel(mode);
  }
  if (SING_MATCH_MODE_CATALOG[mode]) {
    if (mode === "sing-interval") return tr("Intervalle treffen", "Match intervals");
    if (mode === "sing-degree") return tr("Stufen treffen", "Match scale degrees");
    return SING_MATCH_MODE_CATALOG[mode].label;
  }
  if (MIDI_PLAY_MODE_CATALOG[mode]) {
    if (mode === "midi-interval") return tr("Intervalle spielen", "Play intervals");
    if (mode === "midi-chord") return tr("Akkorde greifen", "Play chords");
    if (mode === "midi-scale") return tr("Tonleitern & Modi spielen", "Play scales & modes");
    return MIDI_PLAY_MODE_CATALOG[mode].label;
  }
  return mode;
}

function getHomeworkLevelDisplay(hw) {
  if (!hw) return "";
  if (hw.mode === "interval-custom") {
    if (Array.isArray(hw.intervalCustomPool) && hw.intervalCustomPool.length >= 2) {
      return tf("{n} Intervalle", "{n} intervals", { n: hw.intervalCustomPool.length });
    }
    return tr("Eigene Auswahl", "Custom selection");
  }
  if (typeof getLevelDisplayForMix === "function") {
    return getLevelDisplayForMix(hw.mode, hw.level);
  }
  return tf("Stufe {n}", "Level {n}", { n: hw.level });
}

function formatHomeworkSummaryChips(hw) {
  if (!hw) return [];
  const chips = [];
  const lvlText = getHomeworkLevelDisplay(hw);
  if (lvlText) chips.push(lvlText);

  if (hw.bpm) {
    chips.push(`${hw.bpm} BPM`);
  }
  if (hw.cadencePos === "random") {
    chips.push(tr("Zufälliger Takt", "Random bar"));
  }
  if (hw.keyMode === "easy") {
    chips.push(tr("Tonart: Leichte", "Key: Easy"));
  } else if (hw.keyMode === "all") {
    chips.push(tr("Tonart: Alle 12", "Key: All 12"));
  }
  if (hw.timeSignature) {
    chips.push(hw.timeSignature === "odd" ? "5/4" : hw.timeSignature === "random" ? tr("Taktart: Zufall", "Meter: Random") : hw.timeSignature);
  }
  if (hw.notationKeyMode && hw.notationKeyMode !== "none") {
    const label = typeof getLocalizedNotationKeyModeLabel === "function"
      ? getLocalizedNotationKeyModeLabel(hw.notationKeyMode, true)
      : hw.notationKeyMode;
    chips.push(label);
  }
  if (hw.mode === "melody") {
    if (hw.melodyKeyMode === "random") chips.push(tr("Zufällige Tonart", "Random key"));
    if (hw.melodyOctaveMode === "multi") chips.push(tr("Mehrere Oktaven", "Multiple octaves"));
    if (hw.melodyStyle === "rhythmic") chips.push(tr("Rhythmisch", "Rhythmic"));
    else if (hw.melodyStyle === "dictation") chips.push(tr("Kombi-Diktat", "Combined dictation"));
    if (hw.melodyPulse === false) chips.push(tr("Puls: Aus", "Pulse: Off"));
  }
  if (hw.mode === "rhythm-tap") {
    if (hw.rhythmTapReadMode) chips.push(tr("Vom Blatt", "Sight-tap"));
    if (hw.rhythmTapClick === false) chips.push(tr("Klick: Aus", "Click: Off"));
  }
  if (hw.mode.startsWith("modes-")) {
    if (hw.modesRoot && hw.modesRoot !== "auto") {
      chips.push(hw.modesRoot === "random" ? tr("Grundton: Zufall", "Root: Random") : tf("Grundton: {n}", "Root: {n}", { n: getHomeworkPitchClassName(hw.modesRoot) }));
    }
    if (hw.modesRootPad) chips.push(tr("Grundton-Fläche", "Root drone"));
  }
  if (hw.singIntervalDirection === "down" || hw.midiIntervalDirection === "down") {
    chips.push(tr("Abwärts", "Descending"));
  } else if (hw.singIntervalDirection === "mixed" || hw.midiIntervalDirection === "mixed") {
    chips.push(tr("Gemischt (↗/↘)", "Mixed (↗/↘)"));
  }
  if (hw.mode === "solfege" && hw.level === 17) {
    if (hw.solfegeCustomKey) {
      chips.push(hw.solfegeCustomKey === "random" ? tr("Tonart: Zufall", "Key: Random") : hw.solfegeCustomKey);
    }
    if (hw.solfegeCustomTonality === "minor") chips.push(tr("Moll", "Minor"));
  }
  return chips;
}

function getHomeworkPitchClassName(pcStr) {
  const pc = parseInt(pcStr, 10);
  const names = typeof getAppLanguage === "function" && getAppLanguage() === "de"
    ? ["C", "Cis", "D", "Es", "E", "F", "Fis", "G", "As", "A", "B", "H"]
    : ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  return Number.isInteger(pc) && pc >= 0 && pc < 12 ? names[pc] : String(pcStr || "");
}

function applyHomeworkConfigAndLaunch(hw) {
  const clean = sanitizeHomeworkPayload(hw);
  if (!clean) return false;

  if (typeof state.exam !== "undefined" && state.exam?.active && typeof cleanupActiveExamState === "function") {
    cleanupActiveExamState({ restoreSettings: true });
  }

  const mode = clean.mode;
  if (isSingMatchMode(mode) && typeof state.setSingMatchLevel === "function") {
    state.setMode(mode);
    state.setSingMatchLevel(mode, clean.level);
    if (mode === "sing-interval") {
      state.settings.singIntervalDirection = clean.singIntervalDirection || "up";
    }
  } else if (isMidiPlayMode(mode) && typeof state.setMidiPlayLevel === "function") {
    state.setMode(mode);
    state.setMidiPlayLevel(mode, clean.level);
    if (mode === "midi-interval") {
      state.settings.midiIntervalDirection = clean.midiIntervalDirection || "up";
    }
  } else if (mode === "interval-custom") {
    state.setMode("interval-custom");
    state.settings.intervalCustomRoot = clean.intervalCustomRoot || "random";
    state.settings.intervalCustomScale = clean.intervalCustomScale || "ionian";
    state.settings.intervalCustomScope = clean.intervalCustomScope || "full";
    state.settings.intervalCustomPool = Array.isArray(clean.intervalCustomPool) ? [...clean.intervalCustomPool] : null;
  } else {
    applyModeAndLevelFromConfig({
      mode: clean.mode,
      level: clean.level,
      bpm: clean.bpm || 0,
      melodyRange: clean.melodyRange || (mode === "melody" ? clean.level : undefined),
      melodyKeyMode: clean.melodyKeyMode || "fixed",
      melodyOctaveMode: clean.melodyOctaveMode || "single",
      melodyStyle: clean.melodyStyle || "steady",
      melodyPulse: clean.melodyPulse !== false,
      notationKeyMode: clean.notationKeyMode || "none"
    });
  }

  if (isCadenceMode(mode)) {
    state.settings.cadencePos = clean.cadencePos === "random" ? "random" : "last";
    state.settings.keyMode = clean.keyMode || "fixed";
    state.settings.timeSignature = clean.timeSignature || "4/4";
  }
  if (mode === "solfege" && clean.level === 17) {
    state.settings.solfegeCustomKey = clean.solfegeCustomKey || "C";
    state.settings.solfegeCustomTonality = clean.solfegeCustomTonality || "major";
    state.settings.solfegeCustomRange = clean.solfegeCustomRange || "full";
    state.settings.solfegeCustomOctave = clean.solfegeCustomOctave || "single";
  }
  if (mode === "rhythm-tap") {
    state.settings.rhythmTapReadMode = Boolean(clean.rhythmTapReadMode);
    state.settings.rhythmTapClick = clean.rhythmTapClick !== false;
  }
  if (mode.startsWith("modes-")) {
    state.settings.modesRoot = clean.modesRoot || "auto";
    state.settings.modesRootPad = Boolean(clean.modesRootPad);
  }

  const hasCustomBpm = Boolean(clean.bpm && clean.bpm >= 55);
  if (hasCustomBpm) {
    state.settings.bpm = clean.bpm;
    state.settings.randomBpm = false;
    state.activeBpm = clean.bpm;
    state.hasManualExerciseBpm = true;
    const inlineSlider = document.getElementById("inlineBpmSlider");
    if (inlineSlider) inlineSlider.value = clean.bpm;
  }

  if (typeof markSessionActivity === "function") markSessionActivity();
  state.exerciseReturnView = "home";
  clearHomeworkUrlHash();
  setModalVisibility(null);
  switchView("exercise", { preserveBpm: hasCustomBpm });
  return true;
}

function saveHomeworkAsProfileMix(hw) {
  const clean = sanitizeHomeworkPayload(hw);
  if (!clean || !Object.prototype.hasOwnProperty.call(MIX_MODE_CATALOG, clean.mode)) return null;
  if (!state.profile) state.profile = createDefaultProfile();

  const title = clean.title || getHomeworkModeDisplayName(clean.mode);
  const entry = sanitizeMixEntry({
    id: `mix_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    title,
    mode: clean.mode,
    level: clean.level,
    melodyRange: clean.melodyRange || (clean.mode === "melody" ? clean.level : "do-fa"),
    melodyKeyMode: clean.melodyKeyMode || "fixed",
    melodyOctaveMode: clean.melodyOctaveMode || "single",
    melodyStyle: clean.melodyStyle || "steady",
    melodyPulse: clean.melodyPulse !== false,
    notationKeyMode: clean.notationKeyMode || "none",
    bpm: clean.bpm || 0
  });
  if (!entry) return null;

  state.profile.mixes = [entry, ...(state.profile.mixes || [])].slice(0, 16);
  saveUserProfile(state.profile);
  if (typeof renderProfileMixes === "function") renderProfileMixes();
  return entry;
}

function clearHomeworkUrlHash() {
  if (typeof window === "undefined" || !window.location) return;
  const h = window.location.hash || "";
  if (!h.startsWith("#hw=") && !h.startsWith("#mix=")) return;
  try {
    if (typeof window.history?.replaceState === "function") {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(window.history.state, "", cleanUrl);
    } else {
      window.location.hash = "";
    }
  } catch (_) {}
}

// ---------- 3. UI: TEILEN-MODAL (#homeworkShareBackdrop) & STARTKARTE (#homeworkStartBackdrop) ----------

function syncExerciseHomeworkButtonVisibility() {
  const btn = document.getElementById("shareHomeworkHeaderBtn");
  if (!btn) return;
  const visible = state?.currentView === "exercise" && !state?.exam?.active;
  btn.classList.toggle("hidden", !visible);
}

function openHomeworkShareModal(payload = null) {
  const hw = sanitizeHomeworkPayload(payload || buildHomeworkPayloadFromCurrentExercise());
  if (!hw) return;
  _activeHomeworkShareData = hw;

  const url = buildHomeworkShareUrl(hw);
  const titleEl = document.getElementById("homeworkShareSummaryTitle");
  const chipsEl = document.getElementById("homeworkShareSummaryChips");
  const qrWrap = document.getElementById("homeworkShareQrWrap");
  const linkInput = document.getElementById("homeworkShareUrlInput");
  const shareBtn = document.getElementById("homeworkShareNativeBtn");

  if (titleEl) {
    const modeLabel = getHomeworkModeDisplayName(hw.mode);
    titleEl.textContent = hw.title ? `${hw.title} — ${modeLabel}` : modeLabel;
  }
  if (chipsEl) {
    const chips = formatHomeworkSummaryChips(hw);
    chipsEl.innerHTML = chips.map(c => `<span class="homework-chip">${escapeHtml(c)}</span>`).join("");
  }
  if (qrWrap) {
    const qrSvg = renderQrCodeSvg(url, {
      ariaLabel: tr("QR-Code für diese Hausaufgabe", "QR code for this homework")
    });
    qrWrap.innerHTML = qrSvg || `<p class="homework-qr-fallback">${escapeHtml(tr("Link ist für einen QR-Code zu lang – bitte kopieren.", "Link is too long for a QR code — please copy it."))}</p>`;
  }
  if (linkInput) {
    linkInput.value = url;
  }
  if (shareBtn) {
    const canNativeShare = Boolean(
      (typeof getCapacitorNativePlugin === "function" && getCapacitorNativePlugin("Share")) ||
      (typeof navigator !== "undefined" && typeof navigator.share === "function")
    );
    shareBtn.classList.toggle("hidden", !canNativeShare);
  }

  setModalVisibility("homeworkShare");
  pushAppHistory("homeworkShare");
}

function openHomeworkShareForMix(mixId) {
  const mix = (state.profile?.mixes || []).find(m => m.id === mixId);
  if (!mix) return;
  const payload = buildHomeworkPayloadFromMix(mix);
  if (payload) openHomeworkShareModal(payload);
}

async function copyHomeworkShareLink() {
  const input = document.getElementById("homeworkShareUrlInput");
  const url = input?.value || (_activeHomeworkShareData ? buildHomeworkShareUrl(_activeHomeworkShareData) : "");
  if (!url) return;
  const copied = typeof copyTextToClipboard === "function" ? await copyTextToClipboard(url) : false;
  if (copied) {
    showAppToast(`✓ ${tr("Hausaufgaben-Link kopiert", "Homework link copied")}`, "success");
  } else if (input) {
    input.focus();
    input.select();
    showAppToast(tr("Bitte Link manuell kopieren", "Please copy the link manually"), "error");
  }
}

async function triggerHomeworkNativeShare() {
  if (!_activeHomeworkShareData) return;
  const url = buildHomeworkShareUrl(_activeHomeworkShareData);
  const modeLabel = getHomeworkModeDisplayName(_activeHomeworkShareData.mode);
  const levelLabel = getHomeworkLevelDisplay(_activeHomeworkShareData);
  const title = tr("Lauscher Hausaufgabe", "Lauscher Homework");
  const text = `${modeLabel} (${levelLabel})`;

  const sharePlugin = typeof getCapacitorNativePlugin === "function" ? getCapacitorNativePlugin("Share") : null;
  try {
    if (sharePlugin) {
      await sharePlugin.share({ title, text, url, dialogTitle: title });
      return;
    }
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      await navigator.share({ title, text, url });
      return;
    }
  } catch (err) {
    if (typeof isShareCancelError === "function" && isShareCancelError(err)) return;
  }
  await copyHomeworkShareLink();
}

function openHomeworkStartModal(hw) {
  const clean = sanitizeHomeworkPayload(hw);
  if (!clean) return false;
  _activeHomeworkStartData = clean;

  const mascotEl = document.getElementById("homeworkStartMascot");
  const titleEl = document.getElementById("homeworkStartModeTitle");
  const customTitleEl = document.getElementById("homeworkStartCustomTitle");
  const chipsEl = document.getElementById("homeworkStartChips");
  const saveMixBtn = document.getElementById("homeworkStartSaveMixBtn");

  if (mascotEl && typeof getMascotSVG === "function") {
    mascotEl.innerHTML = getMascotSVG("happy");
  }
  if (titleEl) {
    titleEl.textContent = getHomeworkModeDisplayName(clean.mode);
  }
  if (customTitleEl) {
    customTitleEl.textContent = clean.title || "";
    customTitleEl.classList.toggle("hidden", !clean.title);
  }
  if (chipsEl) {
    const chips = formatHomeworkSummaryChips(clean);
    chipsEl.innerHTML = chips.map(c => `<span class="homework-chip">${escapeHtml(c)}</span>`).join("");
  }
  if (saveMixBtn) {
    const canSaveMix = Object.prototype.hasOwnProperty.call(MIX_MODE_CATALOG, clean.mode);
    saveMixBtn.classList.toggle("hidden", !canSaveMix);
    saveMixBtn.disabled = false;
    saveMixBtn.textContent = tr("Als Übe-Mix speichern", "Save as practice mix");
  }

  setModalVisibility("homeworkStart");
  pushAppHistory("homeworkStart");
  return true;
}

function capturePendingHomeworkFromLocation() {
  if (typeof window === "undefined" || !window.location) return null;
  const parsed = parseHomeworkHash(window.location.hash);
  if (parsed) _pendingHomeworkFromUrl = parsed;
  return parsed;
}

function consumePendingHomeworkIfAny() {
  if (!_pendingHomeworkFromUrl) return false;
  const hw = _pendingHomeworkFromUrl;
  _pendingHomeworkFromUrl = null;
  return openHomeworkStartModal(hw);
}

function hasPendingHomeworkFromUrl() {
  return Boolean(_pendingHomeworkFromUrl);
}

function initHomeworkControls() {
  document.getElementById("shareHomeworkHeaderBtn")?.addEventListener("click", () => {
    openHomeworkShareModal();
  });

  document.getElementById("closeHomeworkShareBtn")?.addEventListener("click", () => {
    closeActiveModal();
  });
  document.getElementById("homeworkShareCopyBtn")?.addEventListener("click", () => {
    copyHomeworkShareLink();
  });
  document.getElementById("homeworkShareNativeBtn")?.addEventListener("click", () => {
    triggerHomeworkNativeShare();
  });
  document.getElementById("homeworkShareUrlInput")?.addEventListener("click", (e) => {
    e.target.select?.();
  });

  document.getElementById("closeHomeworkStartBtn")?.addEventListener("click", () => {
    clearHomeworkUrlHash();
    closeActiveModal();
  });
  document.getElementById("homeworkStartLaterBtn")?.addEventListener("click", () => {
    clearHomeworkUrlHash();
    closeActiveModal();
  });
  document.getElementById("homeworkStartLaunchBtn")?.addEventListener("click", () => {
    if (typeof prepareAudioNonBlocking === "function") prepareAudioNonBlocking();
    if (_activeHomeworkStartData) {
      applyHomeworkConfigAndLaunch(_activeHomeworkStartData);
      _activeHomeworkStartData = null;
    } else {
      closeActiveModal();
    }
  });
  document.getElementById("homeworkStartSaveMixBtn")?.addEventListener("click", (e) => {
    if (!_activeHomeworkStartData) return;
    const saved = saveHomeworkAsProfileMix(_activeHomeworkStartData);
    if (saved) {
      const btn = e.currentTarget;
      if (btn) {
        btn.disabled = true;
        btn.textContent = `✓ ${tr("Als Übe-Mix gespeichert", "Saved as practice mix")}`;
      }
      showAppToast(`✓ ${tr("Hausaufgabe als Übe-Mix gespeichert", "Homework saved as practice mix")}`, "success");
    }
  });

  // Laufende App reagiert auch auf nachträgliche Hash-Änderungen (z. B. neuer Link im selben Tab)
  if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
    window.addEventListener("hashchange", () => {
      const hw = parseHomeworkHash(window.location.hash);
      if (hw) openHomeworkStartModal(hw);
    });
  }
}
