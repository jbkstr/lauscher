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
  { token: "1",  degreeIdx: 0, semitone: 0,  quality: "maj", roman: "I",   fnKey: "tonic" },
  { token: "2-", degreeIdx: 1, semitone: 2,  quality: "min", roman: "ii",  fnKey: "subdom" },
  { token: "3-", degreeIdx: 2, semitone: 4,  quality: "min", roman: "iii", fnKey: "tonic" },
  { token: "4",  degreeIdx: 3, semitone: 5,  quality: "maj", roman: "IV",  fnKey: "subdom" },
  { token: "5",  degreeIdx: 4, semitone: 7,  quality: "maj", roman: "V",   fnKey: "dom" },
  { token: "6-", degreeIdx: 5, semitone: 9,  quality: "min", roman: "vi",  fnKey: "tonic" },
  { token: "7°", degreeIdx: 6, semitone: 11, quality: "dim", roman: "vii°", fnKey: "dom" }
];

const NNS_MINOR_DEGREES = [
  { token: "1-", degreeIdx: 0, semitone: 0,  quality: "min", roman: "i",    fnKey: "tonic" },
  { token: "2°", degreeIdx: 1, semitone: 2,  quality: "dim", roman: "ii°",  fnKey: "subdom" },
  { token: "♭3", degreeIdx: 2, semitone: 3,  quality: "maj", roman: "♭III", fnKey: "tonic" },
  { token: "4-", degreeIdx: 3, semitone: 5,  quality: "min", roman: "iv",   fnKey: "subdom" },
  { token: "5-", degreeIdx: 4, semitone: 7,  quality: "min", roman: "v",    fnKey: "dom" },
  { token: "♭6", degreeIdx: 5, semitone: 8,  quality: "maj", roman: "♭VI",  fnKey: "subdom" },
  { token: "♭7", degreeIdx: 6, semitone: 10, quality: "maj", roman: "♭VII", fnKey: "dom" }
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

function nnsFunctionShort(fnKey) {
  if (fnKey === "tonic") return tr("Tonika", "Tonic");
  if (fnKey === "subdom") return tr("Subdominante", "Subdominant");
  return tr("Dominante", "Dominant");
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
    fnKey: direct.fnKey
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

  const nodes = [
    { item: resolved[0], x: 280, y: 54,  r: 36, cls: "nns-svg-node-tonic nns-svg-node-root" },
    { item: resolved[3], x: 112, y: 92,  r: 30, cls: "nns-svg-node-subdom" },
    { item: resolved[4], x: 448, y: 92,  r: 30, cls: "nns-svg-node-dom" },
    { item: resolved[1], x: 76,  y: 174, r: 25, cls: "nns-svg-node-subdom" },
    { item: resolved[5], x: 222, y: 174, r: 26, cls: "nns-svg-node-tonic" },
    { item: resolved[2], x: 338, y: 174, r: 25, cls: "nns-svg-node-tonic" },
    { item: resolved[6], x: 484, y: 174, r: 25, cls: "nns-svg-node-dom" }
  ];

  const tonicLbl = escapeHtml(nnsFunctionShort("tonic"));
  const subdomLbl = escapeHtml(nnsFunctionShort("subdom"));
  const domLbl = escapeHtml(nnsFunctionShort("dom"));

  return `
    <svg class="nns-diagram-svg" viewBox="0 0 560 228" role="img" aria-label="${escapeHtml(tf("Nashville-Diagramm für {key}", "Nashville diagram for {key}", { key: formatNnsKeyTitle(keyEntry, mode) }))}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="nnsArrowDom" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 2 L 8 5 L 1 8 z" fill="var(--peach-strong)"/>
        </marker>
        <marker id="nnsArrowSub" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 2 L 8 5 L 1 8 z" fill="var(--lilac-strong)"/>
        </marker>
      </defs>

      <rect x="16" y="42" width="144" height="170" rx="18" class="nns-svg-zone nns-svg-zone-subdom"/>
      <rect x="172" y="10" width="216" height="202" rx="20" class="nns-svg-zone nns-svg-zone-tonic"/>
      <rect x="400" y="42" width="144" height="170" rx="18" class="nns-svg-zone nns-svg-zone-dom"/>

      <text x="88" y="210" text-anchor="middle" font-family="Andika, sans-serif" font-size="11.5" font-weight="700" class="nns-svg-zone-lbl-subdom">${subdomLbl}</text>
      <text x="280" y="210" text-anchor="middle" font-family="Andika, sans-serif" font-size="11.5" font-weight="700" class="nns-svg-zone-lbl-tonic">${tonicLbl}</text>
      <text x="472" y="210" text-anchor="middle" font-family="Andika, sans-serif" font-size="11.5" font-weight="700" class="nns-svg-zone-lbl-dom">${domLbl}</text>

      <path d="M 244 62 Q 194 64 146 82" fill="none" stroke="var(--lilac-strong)" stroke-width="2" stroke-dasharray="4 4" opacity="0.72" marker-end="url(#nnsArrowSub)"/>
      <path d="M 144 102 Q 280 132 414 102" fill="none" stroke="var(--peach-strong)" stroke-width="2" stroke-dasharray="5 4" opacity="0.65" marker-end="url(#nnsArrowDom)"/>
      <path d="M 418 78 Q 370 58 320 56" fill="none" stroke="var(--peach-strong)" stroke-width="2.3" opacity="0.88" marker-end="url(#nnsArrowDom)"/>
      <line x1="264" y1="88" x2="234" y2="148" stroke="var(--sage-strong)" stroke-width="1.6" stroke-dasharray="3 4" opacity="0.5"/>
      <line x1="296" y1="88" x2="326" y2="148" stroke="var(--sage-strong)" stroke-width="1.6" stroke-dasharray="3 4" opacity="0.5"/>
      <line x1="104" y1="122" x2="86" y2="150" stroke="var(--lilac-strong)" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.5"/>
      <line x1="456" y1="122" x2="474" y2="150" stroke="var(--peach-strong)" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.5"/>

      ${nodes.map(n => `
        <g class="nns-svg-node ${n.cls}" role="button" tabindex="0"
           data-nns-play="${escapeHtml(n.item.token)}"
           data-nns-flash="${escapeHtml(n.item.token)}"
           aria-label="${escapeHtml(`${n.item.token}: ${n.item.chordName}`)}">
          <circle cx="${n.x}" cy="${n.y}" r="${n.r}"/>
          <text x="${n.x}" y="${n.y - 3}" text-anchor="middle" font-family="Andika, sans-serif" font-size="${n.r >= 34 ? 19 : (n.r >= 29 ? 16.5 : 14.5)}" font-weight="700" class="nns-svg-num">${escapeHtml(n.item.token)}</text>
          <text x="${n.x}" y="${n.y + (n.r >= 34 ? 16 : 13.5)}" text-anchor="middle" font-family="Andika, sans-serif" font-size="${n.r >= 34 ? 13 : 11.5}" font-weight="700" class="nns-svg-chord">${escapeHtml(n.item.chordName)}</text>
        </g>
      `).join("")}
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

      <div class="nns-degree-grid">
        ${resolvedDegrees.map(item => `
          <button type="button" class="nns-degree-tile nns-fn-${item.fnKey}"
                  data-nns-play="${escapeHtml(item.token)}"
                  data-nns-flash="${escapeHtml(item.token)}">
            <span class="nns-deg-num">${escapeHtml(item.token)}</span>
            <span class="nns-deg-chord">${escapeHtml(item.chordName)}</span>
            <span class="nns-deg-meta">${escapeHtml(item.roman)} · ${escapeHtml(nnsFunctionShort(item.fnKey))}</span>
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
