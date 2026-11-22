// =====================================================
// WERKZEUG: NASHVILLE NUMBER SYSTEM (#viewNashville)
// Interaktives Tonarten-Diagramm, 12-Tonarten-Matrix &
// unabhängiger Kapodaster-Übersetzer für Gitarre
// =====================================================

const NNS_KEYS = [
  {
    id: "C", pc: 0, sig: "0", minorSig: "3♭", rootMidi: 60,
    majorScale: ["C", "D", "E", "F", "G", "A", "B"],
    minorScale: ["C", "D", "E♭", "F", "G", "A♭", "B♭"]
  },
  {
    id: "G", pc: 7, sig: "1♯", minorSig: "2♭", rootMidi: 55,
    majorScale: ["G", "A", "B", "C", "D", "E", "F♯"],
    minorScale: ["G", "A", "B♭", "C", "D", "E♭", "F"]
  },
  {
    id: "D", pc: 2, sig: "2♯", minorSig: "1♭", rootMidi: 62,
    majorScale: ["D", "E", "F♯", "G", "A", "B", "C♯"],
    minorScale: ["D", "E", "F", "G", "A", "B♭", "C"]
  },
  {
    id: "A", pc: 9, sig: "3♯", minorSig: "0", rootMidi: 57,
    majorScale: ["A", "B", "C♯", "D", "E", "F♯", "G♯"],
    minorScale: ["A", "B", "C", "D", "E", "F", "G"]
  },
  {
    id: "E", pc: 4, sig: "4♯", minorSig: "1♯", rootMidi: 64,
    majorScale: ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"],
    minorScale: ["E", "F♯", "G", "A", "B", "C", "D"]
  },
  {
    id: "B", pc: 11, sig: "5♯", minorSig: "2♯", rootMidi: 59,
    majorScale: ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯"],
    minorScale: ["B", "C♯", "D", "E", "F♯", "G", "A"]
  },
  {
    id: "F#", pc: 6, sig: "6♯/6♭", minorSig: "3♯", rootMidi: 54,
    majorScale: ["F♯", "G♯", "A♯", "B", "C♯", "D♯", "E♯"],
    minorScale: ["F♯", "G♯", "A", "B", "C♯", "D", "E"]
  },
  {
    id: "Db", pc: 1, sig: "5♭", minorSig: "4♯", rootMidi: 61,
    majorScale: ["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C"],
    minorScale: ["C♯", "D♯", "E", "F♯", "G♯", "A", "B"]
  },
  {
    id: "Ab", pc: 8, sig: "4♭", minorSig: "5♯", rootMidi: 56,
    majorScale: ["A♭", "B♭", "C", "D♭", "E♭", "F", "G"],
    minorScale: ["G♯", "A♯", "B", "C♯", "D♯", "E", "F♯"]
  },
  {
    id: "Eb", pc: 3, sig: "3♭", minorSig: "6♭", rootMidi: 63,
    majorScale: ["E♭", "F", "G", "A♭", "B♭", "C", "D"],
    minorScale: ["E♭", "F", "G♭", "A♭", "B♭", "C♭", "D♭"]
  },
  {
    id: "Bb", pc: 10, sig: "2♭", minorSig: "5♭", rootMidi: 58,
    majorScale: ["B♭", "C", "D", "E♭", "F", "G", "A"],
    minorScale: ["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭"]
  },
  {
    id: "F", pc: 5, sig: "1♭", minorSig: "4♭", rootMidi: 53,
    majorScale: ["F", "G", "A", "B♭", "C", "D", "E"],
    minorScale: ["F", "G", "A♭", "B♭", "C", "D♭", "E♭"]
  }
];

const NNS_MAJOR_DEGREES = [
  { token: "1",  degreeIdx: 0, semitone: 0,  quality: "maj", roman: "I",    fnKey: "tonic",  fnSym: "T",       roleKey: "maj_1" },
  { token: "2-", degreeIdx: 1, semitone: 2,  quality: "min", roman: "ii",   fnKey: "subdom", fnSym: "Sp",      roleKey: "maj_2" },
  { token: "3-", degreeIdx: 2, semitone: 4,  quality: "min", roman: "iii",  fnKey: "dom",    fnSym: "Dp / Tg", roleKey: "maj_3" },
  { token: "4",  degreeIdx: 3, semitone: 5,  quality: "maj", roman: "IV",   fnKey: "subdom", fnSym: "S",       roleKey: "maj_4" },
  { token: "5",  degreeIdx: 4, semitone: 7,  quality: "maj", roman: "V",    fnKey: "dom",    fnSym: "D",       roleKey: "maj_5" },
  { token: "6-", degreeIdx: 5, semitone: 9,  quality: "min", roman: "vi",   fnKey: "tonic",  fnSym: "Tp",      roleKey: "maj_6" },
  { token: "7°", degreeIdx: 6, semitone: 11, quality: "dim", roman: "vii°", fnKey: "dom",    fnSym: "Đ⁷",      roleKey: "maj_7" }
];

const NNS_MINOR_DEGREES = [
  { token: "1-", degreeIdx: 0, semitone: 0,  quality: "min", roman: "i",    fnKey: "tonic",  fnSym: "t",  roleKey: "min_1" },
  { token: "2°", degreeIdx: 1, semitone: 2,  quality: "dim", roman: "ii°",  fnKey: "subdom", fnSym: "s²", roleKey: "min_2" },
  { token: "♭3", degreeIdx: 2, semitone: 3,  quality: "maj", roman: "♭III", fnKey: "tonic",  fnSym: "tP", roleKey: "min_3" },
  { token: "4-", degreeIdx: 3, semitone: 5,  quality: "min", roman: "iv",   fnKey: "subdom", fnSym: "s",  roleKey: "min_4" },
  { token: "5-", degreeIdx: 4, semitone: 7,  quality: "min", roman: "v",    fnKey: "dom",    fnSym: "d",  roleKey: "min_5" },
  { token: "♭6", degreeIdx: 5, semitone: 8,  quality: "maj", roman: "♭VI",  fnKey: "subdom", fnSym: "sP", roleKey: "min_6" },
  { token: "♭7", degreeIdx: 6, semitone: 10, quality: "maj", roman: "♭VII", fnKey: "dom",    fnSym: "dP", roleKey: "min_7" }
];

// Bequeme offene Gitarren-Formen (CAGED für Dur, Em/Am/Dm für Moll)
const NNS_CAPO_OPEN_SHAPES_MAJOR = [7, 0, 2, 9, 4]; // G, C, D, A, E
const NNS_CAPO_OPEN_SHAPES_MINOR = [4, 9, 2];       // Em, Am, Dm

let _nnsFlashTimers = [];
let _nnsOpenDropdown = null; // "capoKey" | "capoFret" | null
let _nnsOutsideClickBound = false;

function getNashvilleState() {
  if (!state.nashvilleState) {
    state.nashvilleState = {
      keyIdx: 0,
      mode: "major",
      capoKeyIdx: 0,
      capoMode: "major",
      capoFret: 0
    };
  }
  if (typeof state.nashvilleState.capoKeyIdx !== "number" || Number.isNaN(state.nashvilleState.capoKeyIdx)) {
    state.nashvilleState.capoKeyIdx = 0;
  }
  if (state.nashvilleState.capoMode !== "major" && state.nashvilleState.capoMode !== "minor") {
    state.nashvilleState.capoMode = "major";
  }
  if (typeof state.nashvilleState.capoFret !== "number" || Number.isNaN(state.nashvilleState.capoFret)) {
    state.nashvilleState.capoFret = 0;
  }
  return state.nashvilleState;
}

function bindNashvilleOutsideClickCloser() {
  if (_nnsOutsideClickBound || typeof document === "undefined") return;
  _nnsOutsideClickBound = true;
  document.addEventListener("click", (ev) => {
    if (!_nnsOpenDropdown) return;
    if (ev.target?.closest?.(".nns-capo-dropdown-anchor")) return;
    closeNashvilleDropdowns();
  });
}

function closeNashvilleDropdowns() {
  if (!_nnsOpenDropdown) return false;
  _nnsOpenDropdown = null;
  const root = document.getElementById("nashvilleToolContent");
  if (root) {
    root.querySelectorAll("[data-nns-dropdown-menu]").forEach(m => m.classList.add("hidden"));
    root.querySelectorAll("[data-nns-dropdown-trigger]").forEach(btn => {
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  }
  return true;
}

function getNnsKeyByPc(pc) {
  const norm = ((pc % 12) + 12) % 12;
  return NNS_KEYS.find(k => k.pc === norm) || NNS_KEYS[0];
}

function getNnsCapoSuggestions(keyEntry, mode) {
  const openShapes = mode === "minor" ? NNS_CAPO_OPEN_SHAPES_MINOR : NNS_CAPO_OPEN_SHAPES_MAJOR;
  const list = [];
  for (let fret = 0; fret <= 9; fret++) {
    const shapePc = (keyEntry.pc - fret + 12) % 12;
    if (openShapes.includes(shapePc)) {
      const shapeKey = getNnsKeyByPc(shapePc);
      const rawRoot = mode === "minor" ? shapeKey.minorScale[0] : shapeKey.majorScale[0];
      const shapeLabel = formatNnsPitch(rawRoot) + (mode === "minor" ? "m" : "");
      list.push({ fret, shapeKey, shapeLabel });
    }
  }
  return list;
}

function nnsUseGermanH() {
  const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
  const prefIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  return lang === "de" && !prefIntl;
}

function formatNnsPitch(noteStr) {
  if (!noteStr) return "";
  if (!nnsUseGermanH()) return noteStr;
  if (noteStr === "B") return "H";
  if (noteStr === "B♭") return "B";
  return noteStr;
}

function formatNnsKeyTitle(keyEntry, mode) {
  const rawRoot = mode === "minor" ? keyEntry.minorScale[0] : keyEntry.majorScale[0];
  const root = formatNnsPitch(rawRoot);
  if (mode === "minor") {
    return tf("{root}-Moll", "{root} Minor", { root });
  }
  return tf("{root}-Dur", "{root} Major", { root });
}

function nnsQualitySuffix(quality) {
  if (quality === "min") return "m";
  if (quality === "dim") return "°";
  return "";
}

function nnsFunctionZoneLabel(fnKey) {
  if (fnKey === "tonic") return tr("Tonika-Bereich", "Tonic Area");
  if (fnKey === "subdom") return tr("Subdominant-Bereich", "Subdominant Area");
  return tr("Dominant-Bereich", "Dominant Area");
}

function nnsDegreeRoleLabel(roleKey) {
  switch (roleKey) {
    case "maj_1": return tr("Tonika", "Tonic");
    case "maj_2": return tr("Subdom.-Parallele", "Subdom. Relative");
    case "maj_3": return tr("Dominant-Parallele", "Dominant Relative");
    case "maj_4": return tr("Subdominante", "Subdominant");
    case "maj_5": return tr("Dominante", "Dominant");
    case "maj_6": return tr("Tonika-Parallele", "Tonic Relative");
    case "maj_7": return tr("Leitton-Dominante", "Leading-Tone Dom.");
    case "min_1": return tr("Moll-Tonika", "Minor Tonic");
    case "min_2": return tr("Verm. Subdom.", "Dim. Subdominant");
    case "min_3": return tr("Tonika-Parallele", "Tonic Relative");
    case "min_4": return tr("Moll-Subdominante", "Minor Subdominant");
    case "min_5": return tr("Moll-Dominante", "Minor Dominant");
    case "min_6": return tr("Subdom.-Parallele", "Subdom. Relative");
    case "min_7": return tr("Dominant-Parallele", "Dominant Relative");
    default: return "";
  }
}

function nnsDiagramNodeBadge(roleKey) {
  switch (roleKey) {
    case "maj_1": return tr("T · Tonika", "T · Tonic");
    case "maj_2": return tr("Sp · Parallele zu 4", "Sp · Relative of 4");
    case "maj_3": return tr("Dp · Parallele", "Dp · Relative");
    case "maj_4": return tr("S · Subdominante", "S · Subdominant");
    case "maj_5": return tr("D · Dominante", "D · Dominant");
    case "maj_6": return tr("Tp · Parallele zu 1", "Tp · Relative of 1");
    case "maj_7": return tr("Đ⁷ · Leitton", "vii° · Leading");
    case "min_1": return tr("t · Moll-Tonika", "t · Minor Tonic");
    case "min_2": return tr("s² · Vermind.", "ii° · Diminished");
    case "min_3": return tr("tP · Parallele zu 1-", "tP · Relative of 1-");
    case "min_4": return tr("s · Subdominante", "s · Subdominant");
    case "min_5": return tr("d · Dominante", "d · Dominant");
    case "min_6": return tr("sP · Parallele", "sP · Relative");
    case "min_7": return tr("dP · Parallele zu 5-", "dP · Relative of 5-");
    default: return "";
  }
}

function resolveNnsToken(token, keyEntry, mode = "major") {
  const clean = String(token || "1").trim();
  const scale = mode === "minor" ? keyEntry.minorScale : keyEntry.majorScale;
  const degList = mode === "minor" ? NNS_MINOR_DEGREES : NNS_MAJOR_DEGREES;

  const direct = degList.find(d => d.token === clean) || degList[0];
  const rootName = formatNnsPitch(scale[direct.degreeIdx]);
  return {
    token: direct.token,
    chordName: rootName + nnsQualitySuffix(direct.quality),
    rootSemi: direct.semitone,
    quality: direct.quality,
    roman: direct.roman,
    fnKey: direct.fnKey,
    fnSym: direct.fnSym,
    roleKey: direct.roleKey
  };
}

function buildNnsChordNoteNames(resolved, keyEntry) {
  const baseRoot = keyEntry.rootMidi;
  const triadIntervals = resolved.quality === "min"
    ? [0, 3, 7]
    : (resolved.quality === "dim" ? [0, 3, 6] : [0, 4, 7]);

  let bassMidi = baseRoot - 12 + resolved.rootSemi;
  while (bassMidi < 40) bassMidi += 12;
  while (bassMidi > 55) bassMidi -= 12;

  let chordRoot = baseRoot + resolved.rootSemi;
  while (chordRoot < 57) chordRoot += 12;
  while (chordRoot > 69) chordRoot -= 12;

  const midis = [bassMidi, ...triadIntervals.map(iv => chordRoot + iv)];
  return midis.map(m => midiToNote(m));
}

function stopNashvillePlayback() {
  _nnsFlashTimers.forEach(id => clearTimeout(id));
  _nnsFlashTimers = [];
  if (typeof audioEngine !== "undefined" && audioEngine?.stopPlayback) {
    audioEngine.stopPlayback();
  }
  const root = document.getElementById("nashvilleToolContent");
  if (root) {
    root.querySelectorAll(".is-active-sound").forEach(el => el.classList.remove("is-active-sound"));
  }
}

function playNnsSingleToken(token, keyIdx, mode = "major", flashAttr = null, flashVal = null, preferGuitar = false) {
  stopNashvillePlayback();
  if (typeof prepareAudioNonBlocking === "function") {
    prepareAudioNonBlocking();
  }
  const keyEntry = NNS_KEYS[keyIdx] || NNS_KEYS[0];
  const resolved = resolveNnsToken(token, keyEntry, mode);
  const notes = buildNnsChordNoteNames(resolved, keyEntry);
  if (typeof audioEngine !== "undefined") {
    if (preferGuitar && typeof audioEngine.playInstrumentSample === "function") {
      audioEngine.playInstrumentSample("guitar", notes, 1.25, 22, 0.95);
    } else if (typeof audioEngine.playStep === "function") {
      const atTime = audioEngine.getAudioTime() + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
      audioEngine.playStep(notes, 1.15, null, "cadence", { atTime, legato: "chord" });
    }
  }
  if (flashAttr && flashVal) {
    flashNnsElements(flashAttr, flashVal);
  }
}

function flashNnsElements(attrName, val) {
  const root = document.getElementById("nashvilleToolContent");
  if (!root) return;
  root.querySelectorAll(`[${attrName}]`).forEach(el => {
    el.classList.toggle("is-active-sound", el.getAttribute(attrName) === val);
  });
  const tId = setTimeout(() => {
    const cur = document.getElementById("nashvilleToolContent");
    if (!cur) return;
    cur.querySelectorAll(".is-active-sound").forEach(el => el.classList.remove("is-active-sound"));
  }, 620);
  _nnsFlashTimers.push(tId);
}

function renderNashvilleDiagramSVG(keyEntry, mode) {
  const degrees = mode === "minor" ? NNS_MINOR_DEGREES : NNS_MAJOR_DEGREES;
  const resolved = degrees.map(d => resolveNnsToken(d.token, keyEntry, mode));

  // Obere Reihe: die 3 Hauptfunktionen (1, 4, 5).
  // Untere Reihe: ihre jeweiligen Parallelen & Stellvertreter im passenden Funktionsbereich.
  const nodes = mode === "minor"
    ? [
        { item: resolved[0], x: 280, y: 50,  r: 34, cls: "nns-svg-node-tonic nns-svg-node-root" }, // 1- (t)
        { item: resolved[3], x: 96,  y: 74,  r: 29, cls: "nns-svg-node-subdom" },                  // 4- (s)
        { item: resolved[4], x: 464, y: 74,  r: 29, cls: "nns-svg-node-dom" },                     // 5- (d)
        { item: resolved[1], x: 56,  y: 164, r: 23, cls: "nns-svg-node-subdom" },                  // 2° (s²)
        { item: resolved[5], x: 136, y: 164, r: 23, cls: "nns-svg-node-subdom" },                  // ♭6 (sP)
        { item: resolved[2], x: 280, y: 164, r: 24, cls: "nns-svg-node-tonic" },                   // ♭3 (tP)
        { item: resolved[6], x: 464, y: 164, r: 24, cls: "nns-svg-node-dom" }                      // ♭7 (dP)
      ]
    : [
        { item: resolved[0], x: 280, y: 50,  r: 34, cls: "nns-svg-node-tonic nns-svg-node-root" }, // 1 (T)
        { item: resolved[3], x: 96,  y: 74,  r: 29, cls: "nns-svg-node-subdom" },                  // 4 (S)
        { item: resolved[4], x: 464, y: 74,  r: 29, cls: "nns-svg-node-dom" },                     // 5 (D)
        { item: resolved[1], x: 96,  y: 164, r: 24, cls: "nns-svg-node-subdom" },                  // 2- (Sp)
        { item: resolved[5], x: 280, y: 164, r: 24, cls: "nns-svg-node-tonic" },                   // 6- (Tp)
        { item: resolved[2], x: 424, y: 164, r: 23, cls: "nns-svg-node-dom" },                     // 3- (Dp / Tg)
        { item: resolved[6], x: 504, y: 164, r: 23, cls: "nns-svg-node-dom" }                      // 7° (Đ⁷)
      ];

  const tonicLbl = escapeHtml(nnsFunctionZoneLabel("tonic"));
  const subdomLbl = escapeHtml(nnsFunctionZoneLabel("subdom"));
  const domLbl = escapeHtml(nnsFunctionZoneLabel("dom"));

  const relationLines = mode === "minor"
    ? `
      <line x1="84" y1="120" x2="64" y2="140" stroke="var(--lilac-strong)" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="108" y1="120" x2="128" y2="140" stroke="var(--lilac-strong)" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="280" y1="104" x2="280" y2="138" stroke="var(--sage-strong)" stroke-width="1.6" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="464" y1="120" x2="464" y2="138" stroke="var(--peach-strong)" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.55"/>
    `
    : `
      <line x1="96" y1="120" x2="96" y2="138" stroke="var(--lilac-strong)" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="280" y1="104" x2="280" y2="138" stroke="var(--sage-strong)" stroke-width="1.6" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="452" y1="120" x2="432" y2="140" stroke="var(--peach-strong)" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="476" y1="120" x2="496" y2="140" stroke="var(--peach-strong)" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="308" y1="74" x2="404" y2="148" stroke="var(--sage-strong)" stroke-width="1.4" stroke-dasharray="2 4" opacity="0.4"/>
    `;

  return `
    <svg class="nns-diagram-svg" viewBox="0 0 560 250" role="img" aria-label="${escapeHtml(tf("Nashville-Diagramm für {key}", "Nashville diagram for {key}", { key: formatNnsKeyTitle(keyEntry, mode) }))}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="nnsArrowDom" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 2 L 8 5 L 1 8 z" fill="var(--peach-strong)"/>
        </marker>
        <marker id="nnsArrowSub" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 2 L 8 5 L 1 8 z" fill="var(--lilac-strong)"/>
        </marker>
      </defs>

      <rect x="12" y="34" width="168" height="208" rx="18" class="nns-svg-zone nns-svg-zone-subdom"/>
      <rect x="196" y="10" width="168" height="232" rx="20" class="nns-svg-zone nns-svg-zone-tonic"/>
      <rect x="380" y="34" width="168" height="208" rx="18" class="nns-svg-zone nns-svg-zone-dom"/>

      <text x="96" y="231" text-anchor="middle" font-family="Andika, sans-serif" font-size="11" font-weight="700" class="nns-svg-zone-lbl-subdom">${subdomLbl}</text>
      <text x="280" y="231" text-anchor="middle" font-family="Andika, sans-serif" font-size="11" font-weight="700" class="nns-svg-zone-lbl-tonic">${tonicLbl}</text>
      <text x="464" y="231" text-anchor="middle" font-family="Andika, sans-serif" font-size="11" font-weight="700" class="nns-svg-zone-lbl-dom">${domLbl}</text>

      <path d="M 244 58 Q 184 60 128 72" fill="none" stroke="var(--lilac-strong)" stroke-width="2" stroke-dasharray="4 4" opacity="0.72" marker-end="url(#nnsArrowSub)"/>
      <path d="M 128 86 Q 280 122 432 86" fill="none" stroke="var(--peach-strong)" stroke-width="2" stroke-dasharray="5 4" opacity="0.65" marker-end="url(#nnsArrowDom)"/>
      <path d="M 434 66 Q 376 46 318 50" fill="none" stroke="var(--peach-strong)" stroke-width="2.3" opacity="0.88" marker-end="url(#nnsArrowDom)"/>
      ${relationLines}

      ${nodes.map(n => {
        const badge = nnsDiagramNodeBadge(n.item.roleKey);
        const roleLabel = nnsDegreeRoleLabel(n.item.roleKey);
        return `
        <g class="nns-svg-node ${n.cls}" role="button" tabindex="0"
           data-nns-play="${escapeHtml(n.item.token)}"
           data-nns-flash="${escapeHtml(n.item.token)}"
           aria-label="${escapeHtml(`${n.item.token}: ${n.item.chordName} (${n.item.roman}, ${roleLabel})`)}">
          <circle cx="${n.x}" cy="${n.y}" r="${n.r}"/>
          <text x="${n.x}" y="${n.y - 3}" text-anchor="middle" font-family="Andika, sans-serif" font-size="${n.r >= 33 ? 18.5 : (n.r >= 28 ? 16 : 14)}" font-weight="700" class="nns-svg-num">${escapeHtml(n.item.token)}</text>
          <text x="${n.x}" y="${n.y + (n.r >= 33 ? 15.5 : 13)}" text-anchor="middle" font-family="Andika, sans-serif" font-size="${n.r >= 33 ? 12.5 : 11}" font-weight="700" class="nns-svg-chord">${escapeHtml(n.item.chordName)}</text>
          <text x="${n.x}" y="${n.y + n.r + 13}" text-anchor="middle" font-family="Andika, sans-serif" font-size="9.3" font-weight="700" class="nns-svg-role">${escapeHtml(badge)}</text>
        </g>
      `;
      }).join("")}
    </svg>
  `;
}

function buildNnsChevronSvg() {
  return `<svg class="nns-capo-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;
}

function renderNashvilleView() {
  const container = document.getElementById("nashvilleToolContent");
  if (!container) return;
  bindNashvilleOutsideClickCloser();

  const nns = getNashvilleState();
  const safeKeyIdx = ((nns.keyIdx % NNS_KEYS.length) + NNS_KEYS.length) % NNS_KEYS.length;
  nns.keyIdx = safeKeyIdx;
  const keyEntry = NNS_KEYS[safeKeyIdx];
  const mode = nns.mode === "minor" ? "minor" : "major";

  const degrees = mode === "minor" ? NNS_MINOR_DEGREES : NNS_MAJOR_DEGREES;
  const resolvedDegrees = degrees.map(d => resolveNnsToken(d.token, keyEntry, mode));
  const keyTitle = formatNnsKeyTitle(keyEntry, mode);
  const relMinorName = formatNnsPitch(keyEntry.majorScale[5]) + "m";

  // Unabhängiger Zustand für den Kapodaster-Übersetzer
  const safeCapoKeyIdx = ((nns.capoKeyIdx % NNS_KEYS.length) + NNS_KEYS.length) % NNS_KEYS.length;
  nns.capoKeyIdx = safeCapoKeyIdx;
  const capoKeyEntry = NNS_KEYS[safeCapoKeyIdx];
  const capoMode = nns.capoMode === "minor" ? "minor" : "major";
  const capoFret = Math.max(0, Math.min(9, parseInt(nns.capoFret, 10) || 0));
  nns.capoFret = capoFret;

  const capoDegrees = capoMode === "minor" ? NNS_MINOR_DEGREES : NNS_MAJOR_DEGREES;
  const capoSoundingTitle = formatNnsKeyTitle(capoKeyEntry, capoMode);
  const capoSoundingResolved = capoDegrees.map(d => resolveNnsToken(d.token, capoKeyEntry, capoMode));
  const capoShapePc = (capoKeyEntry.pc - capoFret + 12) % 12;
  const capoShapeKey = getNnsKeyByPc(capoShapePc);
  const capoShapeTitle = formatNnsKeyTitle(capoShapeKey, capoMode);
  const capoShapeResolved = capoDegrees.map(d => resolveNnsToken(d.token, capoShapeKey, capoMode));
  const capoSuggestions = getNnsCapoSuggestions(capoKeyEntry, capoMode);

  const isKeyMenuOpen = _nnsOpenDropdown === "capoKey";
  const isFretMenuOpen = _nnsOpenDropdown === "capoFret";

  container.innerHTML = `
    <!-- 1. TONART & MODUS (FÜR DIAGRAMM & 12-TONARTEN-MATRIX) -->
    <section class="k-card nns-card">
      <div class="nns-card-head">
        <div>
          <span class="k-card-tag tag-peach">${tr("Tonart wählen", "Choose Key")}</span>
          <h3 class="nns-section-title">${escapeHtml(keyTitle)} <span class="nns-key-sig-pill">${escapeHtml(mode === "minor" ? keyEntry.minorSig : keyEntry.sig)}</span></h3>
        </div>
        <div class="nns-mode-toggle" role="tablist" aria-label="${escapeHtml(tr("Tongeschlecht", "Key Mode"))}">
          <button type="button" class="nns-mode-btn${mode === "major" ? " active" : ""}" data-nns-mode="major" role="tab" aria-selected="${mode === "major"}">${tr("Dur (Standard)", "Major (Standard)")}</button>
          <button type="button" class="nns-mode-btn${mode === "minor" ? " active" : ""}" data-nns-mode="minor" role="tab" aria-selected="${mode === "minor"}">${tr("Moll (1-)", "Minor (1-)")}</button>
        </div>
      </div>

      <div class="nns-key-grid" role="group" aria-label="${escapeHtml(tr("Alle 12 Tonarten", "All 12 Keys"))}">
        ${NNS_KEYS.map((k, idx) => {
          const lbl = formatNnsPitch(mode === "minor" ? k.minorScale[0] : k.majorScale[0]);
          const isAct = idx === safeKeyIdx;
          return `
            <button type="button" class="nns-key-pill${isAct ? " active" : ""}" data-nns-key="${idx}" aria-pressed="${isAct}">
              <span class="nns-key-pill-name">${escapeHtml(mode === "minor" ? `${lbl}m` : lbl)}</span>
              <span class="nns-key-pill-sig">${escapeHtml(mode === "minor" ? k.minorSig : k.sig)}</span>
            </button>
          `;
        }).join("")}
      </div>

      <p class="nns-mode-note">
        ${mode === "major"
          ? tf("Parallele Molltonart ist {rel} (Stufe 6-). Tippe auf beliebige Ziffern im Diagramm, um den Akkord sofort zu hören.",
               "Relative minor is {rel} (degree 6-). Tap any number in the diagram to hear the chord right away.",
               { rel: relMinorName })
          : tr("Moll-Referenz mit 1- als Grundton. Tipp: In Nashville-Studios werden Moll-Songs oft auch relativ zur Dur-Parallele (Start auf 6-) notiert.",
               "Minor reference with 1- as tonic. Tip: In Nashville studios, minor songs are also often charted relative to the parallel major (starting on 6-).")}
      </p>
    </section>

    <!-- 2. INTERAKTIVES DIAGRAMM & STUFEN-KACHELN -->
    <section class="k-card nns-card">
      <div class="nns-card-head">
        <div>
          <span class="k-card-tag tag-sage">${tr("Funktions-Diagramm", "Function Diagram")}</span>
          <h3 class="nns-section-title">${tf("Stufen-Diagramm in {key}", "Degree Diagram in {key}", { key: keyTitle })}</h3>
        </div>
      </div>

      <div class="nns-diagram-wrap">
        ${renderNashvilleDiagramSVG(keyEntry, mode)}
      </div>

      <p class="nns-mode-note nns-diagram-note">
        ${mode === "major"
          ? tr("Obere Reihe: die 3 Hauptfunktionen Tonika (1), Subdominante (4) und Dominante (5). Darunter: ihre Moll-Parallelen (6-, 2-, 3-) und der Leittonakkord (7°) – sie teilen je zwei Töne mit ihrer Hauptstufe und können sie vertreten (3- ist zugleich Dominant-Parallele Dp zur 5 und Tonika-Gegenklang Tg zur 1).",
               "Top row: the 3 primary functions Tonic (1), Subdominant (4), and Dominant (5). Below them: their relative minors (6-, 2-, 3-) and the leading-tone chord (7°) — each shares two notes with its primary chord and can substitute for it (3- acts both as dominant relative Dp to 5 and tonic counter-relative Tg to 1).")
          : tr("Obere Reihe: die 3 Moll-Hauptfunktionen Tonika (1-), Subdominante (4-) und Dominante (5-). Darunter: ihre Dur-Parallelen (♭3, ♭6, ♭7) sowie die verminderte 2°, die jeweils zwei Töne mit ihrer Hauptstufe teilen.",
               "Top row: the 3 minor primary functions Tonic (1-), Subdominant (4-), and Dominant (5-). Below them: their relative major chords (♭3, ♭6, ♭7) and the diminished 2°, each sharing two notes with its primary chord.")}
      </p>

      <div class="nns-degree-grid">
        ${resolvedDegrees.map(item => `
          <button type="button" class="nns-degree-tile nns-fn-${item.fnKey}"
                  data-nns-play="${escapeHtml(item.token)}"
                  data-nns-flash="${escapeHtml(item.token)}">
            <span class="nns-deg-num">${escapeHtml(item.token)}</span>
            <span class="nns-deg-chord">${escapeHtml(item.chordName)}</span>
            <span class="nns-deg-meta">${escapeHtml(item.roman)} · ${escapeHtml(item.fnSym)}</span>
            <span class="nns-deg-role">${escapeHtml(nnsDegreeRoleLabel(item.roleKey))}</span>
          </button>
        `).join("")}
      </div>
    </section>

    <!-- 3. ALLE 12 TONARTEN AUF EINEN BLICK (NACHSCHLAGE-DIAGRAMM) -->
    <section class="k-card nns-card">
      <div class="nns-card-head">
        <div>
          <span class="k-card-tag tag-sage">${tr("Nachschlage-Diagramm", "Reference Chart")}</span>
          <h3 class="nns-section-title">${tr("Alle 12 Tonarten auf einen Blick", "All 12 Keys at a Glance")}</h3>
        </div>
      </div>
      <p class="nns-matrix-hint">${tr("Tippe auf eine Tonart links zum Umschalten – oder direkt auf einen Akkord zum Anhören.", "Tap a key on the left to switch – or tap any chord cell directly to hear it.")}</p>

      <div class="nns-matrix-scroll" data-no-swipe="true">
        <table class="nns-matrix-table">
          <thead>
            <tr>
              <th class="nns-sticky-col">${tr("Tonart", "Key")}</th>
              ${degrees.map(d => `<th class="nns-th-${d.fnKey}">${escapeHtml(d.token)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${NNS_KEYS.map((k, kIdx) => {
              const isCur = kIdx === safeKeyIdx;
              const kLbl = formatNnsPitch(mode === "minor" ? k.minorScale[0] : k.majorScale[0]) + (mode === "minor" ? "m" : "");
              return `
                <tr class="${isCur ? "is-current-key" : ""}">
                  <th class="nns-sticky-col">
                    <button type="button" class="nns-row-key-btn" data-nns-key="${kIdx}">
                      <span>${escapeHtml(kLbl)}</span>
                      <small>${escapeHtml(mode === "minor" ? k.minorSig : k.sig)}</small>
                    </button>
                  </th>
                  ${degrees.map(d => {
                    const r = resolveNnsToken(d.token, k, mode);
                    return `
                      <td>
                        <button type="button" class="nns-cell-btn" data-nns-cell-key="${kIdx}" data-nns-cell-tok="${escapeHtml(d.token)}">
                          ${escapeHtml(r.chordName)}
                        </button>
                      </td>
                    `;
                  }).join("")}
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </section>

    <!-- 4. UNABHÄNGIGER KAPODASTER-ÜBERSETZER FÜR GITARRE -->
    <section class="k-card nns-card nns-capo-card">
      <div class="nns-card-head">
        <div>
          <span class="k-card-tag tag-peach">${tr("Gitarren-Praxis", "Guitar Practice")}</span>
          <h3 class="nns-section-title">${tr("Kapodaster-Übersetzer", "Capo Translator")}</h3>
        </div>
        <div class="nns-mode-toggle" role="tablist" aria-label="${escapeHtml(tr("Tongeschlecht", "Key Mode"))}">
          <button type="button" class="nns-mode-btn${capoMode === "major" ? " active" : ""}" data-nns-capo-mode="major" role="tab" aria-selected="${capoMode === "major"}">${tr("Dur (Standard)", "Major (Standard)")}</button>
          <button type="button" class="nns-mode-btn${capoMode === "minor" ? " active" : ""}" data-nns-capo-mode="minor" role="tab" aria-selected="${capoMode === "minor"}">${tr("Moll (1-)", "Minor (1-)")}</button>
        </div>
      </div>

      <div class="nns-capo-summary">
        <!-- Klickbares Dropdown: Klingende Ausgangstonart -->
        <div class="nns-capo-dropdown-anchor">
          <button type="button"
                  class="nns-capo-stat is-interactive${isKeyMenuOpen ? " is-open" : ""}"
                  data-nns-dropdown-trigger="capoKey"
                  aria-haspopup="listbox"
                  aria-expanded="${isKeyMenuOpen}">
            <span class="nns-capo-stat-lbl">${tr("Klingt in", "Sounds in")} ${buildNnsChevronSvg()}</span>
            <strong class="nns-capo-stat-val">${escapeHtml(capoSoundingTitle)}</strong>
          </button>
          <div class="nns-capo-dropdown-menu${isKeyMenuOpen ? "" : " hidden"}" data-nns-dropdown-menu="capoKey" role="listbox" aria-label="${escapeHtml(tr("Klingende Ausgangstonart", "Sounding key"))}">
            ${NNS_KEYS.map((k, idx) => {
              const title = formatNnsKeyTitle(k, capoMode);
              const sig = capoMode === "minor" ? k.minorSig : k.sig;
              const isSel = idx === safeCapoKeyIdx;
              return `
                <button type="button" class="nns-capo-dropdown-opt${isSel ? " is-selected" : ""}" data-nns-capo-key="${idx}" role="option" aria-selected="${isSel}">
                  <span>${escapeHtml(title)}</span>
                  <small>${escapeHtml(sig)}</small>
                </button>
              `;
            }).join("")}
          </div>
        </div>

        <span class="nns-capo-arrow" aria-hidden="true">→</span>

        <!-- Klickbares Dropdown: Kapodaster-Bund -->
        <div class="nns-capo-dropdown-anchor">
          <button type="button"
                  class="nns-capo-stat is-capo is-interactive${isFretMenuOpen ? " is-open" : ""}"
                  data-nns-dropdown-trigger="capoFret"
                  aria-haspopup="listbox"
                  aria-expanded="${isFretMenuOpen}">
            <span class="nns-capo-stat-lbl">${tr("Kapodaster", "Capo")} ${buildNnsChevronSvg()}</span>
            <strong class="nns-capo-stat-val">${capoFret === 0 ? tr("Ohne Kapo", "No Capo") : tf("Bund {n}", "Fret {n}", { n: capoFret })}</strong>
          </button>
          <div class="nns-capo-dropdown-menu${isFretMenuOpen ? "" : " hidden"}" data-nns-dropdown-menu="capoFret" role="listbox" aria-label="${escapeHtml(tr("Kapodaster-Bund", "Capo Fret"))}">
            ${Array.from({ length: 10 }, (_, f) => {
              const resShapeKey = getNnsKeyByPc((capoKeyEntry.pc - f + 12) % 12);
              const resShapeTitle = formatNnsKeyTitle(resShapeKey, capoMode);
              const isSel = f === capoFret;
              return `
                <button type="button" class="nns-capo-dropdown-opt${isSel ? " is-selected" : ""}" data-nns-capo="${f}" role="option" aria-selected="${isSel}">
                  <span>${f === 0 ? tr("Ohne Kapo", "No Capo") : tf("Bund {n}", "Fret {n}", { n: f })}</span>
                  <small>${escapeHtml(resShapeTitle)}</small>
                </button>
              `;
            }).join("")}
          </div>
        </div>

        <span class="nns-capo-arrow" aria-hidden="true">→</span>

        <div class="nns-capo-stat is-shape">
          <span class="nns-capo-stat-lbl">${tr("Greife wie in", "Play shapes of")}</span>
          <strong class="nns-capo-stat-val">${escapeHtml(capoShapeTitle)}</strong>
        </div>
      </div>

      <div class="nns-capo-subblock">
        <div class="nns-extras-label">${tr("Bequeme offene Gitarren-Formen für diese Tonart:", "Comfortable open guitar shapes for this key:")}</div>
        <div class="nns-capo-suggest-row">
          ${capoSuggestions.map(s => `
            <button type="button" class="nns-capo-suggest-chip${s.fret === capoFret ? " active" : ""}" data-nns-capo="${s.fret}">
              <span>${s.fret === 0 ? tr("Offen (0)", "Open (0)") : tf("Kapo {n}", "Capo {n}", { n: s.fret })}</span>
              <strong>${tf("{shape}-Form", "{shape} shapes", { shape: s.shapeLabel })}</strong>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="nns-capo-grid">
        ${capoShapeResolved.map((shapeItem, idx) => {
          const soundingItem = capoSoundingResolved[idx];
          return `
            <button type="button" class="nns-capo-tile nns-fn-${shapeItem.fnKey}"
                    data-nns-capo-play="${escapeHtml(soundingItem.token)}"
                    data-nns-capo-flash="${escapeHtml(soundingItem.token)}">
              <span class="nns-capo-num">${escapeHtml(shapeItem.token)}</span>
              <span class="nns-capo-shape-chord">${escapeHtml(shapeItem.chordName)}</span>
              <span class="nns-capo-sound-chord">${capoFret === 0 ? escapeHtml(shapeItem.roman) : tf("= {chord}", "= {chord}", { chord: soundingItem.chordName })}</span>
            </button>
          `;
        }).join("")}
      </div>
    </section>

    <!-- 5. DIREKT-LINK ZUM WISSENSARTIKEL -->
    <button type="button" id="nnsOpenArticleBtn" class="category-nav-card card-accent-lilac category-card-wide nns-article-link-card">
      <div class="cat-icon-box badge-lilac">
        <svg class="icon-svg-large" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/>
          <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>
        </svg>
      </div>
      <div class="cat-text-box">
        <h3>${tr("Artikel: Wie das Nashville-Zahlensystem funktioniert & entstand", "Article: How the Nashville Number System Works & Began")}</h3>
        <p>${tr("Geschichte, Studio-Zeichen, Slash-Akkorde & Hörbeispiele", "History, chart symbols, slash chords & audio examples")}</p>
      </div>
      <span class="cat-chevron">›</span>
    </button>
  `;

  bindNashvilleViewEvents(container);
}

function bindNashvilleViewEvents(container) {
  const nns = getNashvilleState();

  // Oberes Diagramm + 12-Tonarten-Matrix (unabhängig vom Kapodaster-Übersetzer)
  container.querySelectorAll("[data-nns-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      stopNashvillePlayback();
      _nnsOpenDropdown = null;
      nns.keyIdx = parseInt(btn.dataset.nnsKey || "0", 10);
      renderNashvilleView();
    });
  });

  container.querySelectorAll("[data-nns-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      stopNashvillePlayback();
      _nnsOpenDropdown = null;
      const nextMode = btn.dataset.nnsMode === "minor" ? "minor" : "major";
      if (nns.mode !== nextMode) {
        nns.mode = nextMode;
        renderNashvilleView();
      }
    });
  });

  // Kapodaster-Übersetzer: unabhängiger Dur/Moll-Umschalter
  container.querySelectorAll("[data-nns-capo-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      stopNashvillePlayback();
      _nnsOpenDropdown = null;
      const nextMode = btn.dataset.nnsCapoMode === "minor" ? "minor" : "major";
      if (nns.capoMode !== nextMode) {
        nns.capoMode = nextMode;
        renderNashvilleView();
      }
    });
  });

  // Kapodaster-Dropdown-Trigger ("Klingt in" & "Kapodaster")
  container.querySelectorAll("[data-nns-dropdown-trigger]").forEach(btn => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const targetKey = btn.dataset.nnsDropdownTrigger;
      _nnsOpenDropdown = (_nnsOpenDropdown === targetKey) ? null : targetKey;
      renderNashvilleView();
      if (_nnsOpenDropdown) {
        const opened = document.querySelector(`#nashvilleToolContent [data-nns-dropdown-menu="${_nnsOpenDropdown}"]`);
        opened?.querySelector(".is-selected")?.scrollIntoView?.({ block: "nearest" });
      }
    });
  });

  // Auswahl im "Klingt in"-Dropdown
  container.querySelectorAll("[data-nns-capo-key]").forEach(btn => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      stopNashvillePlayback();
      _nnsOpenDropdown = null;
      nns.capoKeyIdx = parseInt(btn.dataset.nnsCapoKey || "0", 10);
      renderNashvilleView();
    });
  });

  // Auswahl im "Kapodaster"-Dropdown oder über offene Formen-Chips
  container.querySelectorAll("[data-nns-capo]").forEach(btn => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      stopNashvillePlayback();
      _nnsOpenDropdown = null;
      nns.capoFret = Math.max(0, Math.min(9, parseInt(btn.dataset.nnsCapo || "0", 10) || 0));
      renderNashvilleView();
    });
  });

  container.querySelectorAll("[data-nns-play]").forEach(el => {
    const trigger = () => {
      const tok = el.dataset.nnsPlay;
      playNnsSingleToken(tok, nns.keyIdx, nns.mode, "data-nns-flash", tok, false);
    };
    el.addEventListener("click", trigger);
    if (el.tagName.toLowerCase() !== "button") {
      el.addEventListener("keydown", ev => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          trigger();
        }
      });
    }
  });

  container.querySelectorAll("[data-nns-capo-play]").forEach(btn => {
    btn.addEventListener("click", () => {
      const tok = btn.dataset.nnsCapoPlay;
      playNnsSingleToken(tok, nns.capoKeyIdx, nns.capoMode, "data-nns-capo-flash", tok, true);
    });
  });

  container.querySelectorAll("[data-nns-cell-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      const kIdx = parseInt(btn.dataset.nnsCellKey || "0", 10);
      const tok = btn.dataset.nnsCellTok || "1";
      playNnsSingleToken(tok, kIdx, nns.mode, null, null, false);
      btn.classList.add("is-active-sound");
      const tid = setTimeout(() => btn.classList.remove("is-active-sound"), 550);
      _nnsFlashTimers.push(tid);
    });
  });

  container.querySelector("#nnsOpenArticleBtn")?.addEventListener("click", () => {
    stopNashvillePlayback();
    _nnsOpenDropdown = null;
    if (typeof openKnowledgeArticle === "function") {
      openKnowledgeArticle("art-nashville-number-system", { returnView: "nashville" });
    }
  });
}

function openNashvilleView(returnView = "tools") {
  _nnsOpenDropdown = null;
  state.nashvilleReturnView = returnView;
  switchView("nashville");
}
