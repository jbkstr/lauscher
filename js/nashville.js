// =====================================================
// WERKZEUG: NASHVILLE NUMBER SYSTEM (#viewNashville)
// Interaktives Tonarten-Diagramm & 12-Tonarten-Matrix
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

let _nnsFlashTimers = [];

function getNashvilleState() {
  if (!state.nashvilleState) {
    state.nashvilleState = {
      keyIdx: 0,
      mode: "major"
    };
  }
  return state.nashvilleState;
}

function getNnsKeyByPc(pc) {
  const norm = ((pc % 12) + 12) % 12;
  return NNS_KEYS.find(k => k.pc === norm) || NNS_KEYS[0];
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
  ["nashvilleToolContent", "capoToolContent"].forEach(id => {
    const root = document.getElementById(id);
    if (root) {
      root.querySelectorAll(".is-active-sound").forEach(el => el.classList.remove("is-active-sound"));
    }
  });
}

function playNnsSingleToken(token, keyIdx, mode = "major", flashAttr = null, flashVal = null, preferGuitar = false, flashRootId = "nashvilleToolContent") {
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
    flashNnsElements(flashAttr, flashVal, flashRootId);
  }
}

function flashNnsElements(attrName, val, rootId = "nashvilleToolContent") {
  const root = document.getElementById(rootId);
  if (!root) return;
  root.querySelectorAll(`[${attrName}]`).forEach(el => {
    el.classList.toggle("is-active-sound", el.getAttribute(attrName) === val);
  });
  const tId = setTimeout(() => {
    const cur = document.getElementById(rootId);
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
  // 2er-Untergruppen (3-/7° in Dur bzw. 2°/♭6 in Moll) sind gestaffelt, damit das Diagramm
  // vertikal großzügig und auf Mobilgeräten gut lesbar & bequem tippbar bleibt.
  const nodes = mode === "minor"
    ? [
        { item: resolved[0], x: 228, y: 58,  r: 36, cls: "nns-svg-node-tonic nns-svg-node-root" }, // 1- (t)
        { item: resolved[3], x: 78,  y: 86,  r: 32, cls: "nns-svg-node-subdom" },                  // 4- (s)
        { item: resolved[4], x: 378, y: 86,  r: 32, cls: "nns-svg-node-dom" },                     // 5- (d)
        { item: resolved[5], x: 112, y: 204, r: 27, cls: "nns-svg-node-subdom" },                  // ♭6 (sP)
        { item: resolved[1], x: 44,  y: 266, r: 27, cls: "nns-svg-node-subdom" },                  // 2° (s²)
        { item: resolved[2], x: 228, y: 232, r: 29, cls: "nns-svg-node-tonic" },                   // ♭3 (tP)
        { item: resolved[6], x: 378, y: 232, r: 29, cls: "nns-svg-node-dom" }                      // ♭7 (dP)
      ]
    : [
        { item: resolved[0], x: 228, y: 58,  r: 36, cls: "nns-svg-node-tonic nns-svg-node-root" }, // 1 (T)
        { item: resolved[3], x: 78,  y: 86,  r: 32, cls: "nns-svg-node-subdom" },                  // 4 (S)
        { item: resolved[4], x: 378, y: 86,  r: 32, cls: "nns-svg-node-dom" },                     // 5 (D)
        { item: resolved[1], x: 78,  y: 232, r: 29, cls: "nns-svg-node-subdom" },                  // 2- (Sp)
        { item: resolved[5], x: 228, y: 232, r: 29, cls: "nns-svg-node-tonic" },                   // 6- (Tp)
        { item: resolved[2], x: 344, y: 204, r: 27, cls: "nns-svg-node-dom" },                     // 3- (Dp / Tg)
        { item: resolved[6], x: 412, y: 266, r: 27, cls: "nns-svg-node-dom" }                      // 7° (Đ⁷)
      ];

  const tonicLbl = escapeHtml(nnsFunctionZoneLabel("tonic"));
  const subdomLbl = escapeHtml(nnsFunctionZoneLabel("subdom"));
  const domLbl = escapeHtml(nnsFunctionZoneLabel("dom"));

  const relationLines = mode === "minor"
    ? `
      <line x1="64" y1="154" x2="48" y2="237" stroke="var(--lilac-strong)" stroke-width="1.6" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="90" y1="154" x2="104" y2="175" stroke="var(--lilac-strong)" stroke-width="1.6" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="228" y1="138" x2="228" y2="199" stroke="var(--sage-strong)" stroke-width="1.7" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="378" y1="154" x2="378" y2="199" stroke="var(--peach-strong)" stroke-width="1.6" stroke-dasharray="3 4" opacity="0.55"/>
    `
    : `
      <line x1="78" y1="154" x2="78" y2="199" stroke="var(--lilac-strong)" stroke-width="1.6" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="228" y1="138" x2="228" y2="199" stroke="var(--sage-strong)" stroke-width="1.7" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="366" y1="154" x2="352" y2="175" stroke="var(--peach-strong)" stroke-width="1.6" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="392" y1="154" x2="408" y2="237" stroke="var(--peach-strong)" stroke-width="1.6" stroke-dasharray="3 4" opacity="0.55"/>
      <line x1="258" y1="84" x2="324" y2="184" stroke="var(--sage-strong)" stroke-width="1.5" stroke-dasharray="2 4" opacity="0.42"/>
    `;

  return `
    <svg class="nns-diagram-svg" viewBox="0 0 456 368" role="img" aria-label="${escapeHtml(tf("Nashville-Diagramm für {key}", "Nashville diagram for {key}", { key: formatNnsKeyTitle(keyEntry, mode) }))}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="nnsArrowDom" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 2 L 8 5 L 1 8 z" fill="var(--peach-strong)"/>
        </marker>
        <marker id="nnsArrowSub" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 2 L 8 5 L 1 8 z" fill="var(--lilac-strong)"/>
        </marker>
      </defs>

      <rect x="6" y="32" width="144" height="326" rx="18" class="nns-svg-zone nns-svg-zone-subdom"/>
      <rect x="156" y="10" width="144" height="348" rx="20" class="nns-svg-zone nns-svg-zone-tonic"/>
      <rect x="306" y="32" width="144" height="326" rx="18" class="nns-svg-zone nns-svg-zone-dom"/>

      <text x="78" y="347" text-anchor="middle" font-family="Andika, sans-serif" font-size="12" font-weight="700" class="nns-svg-zone-lbl-subdom">${subdomLbl}</text>
      <text x="228" y="347" text-anchor="middle" font-family="Andika, sans-serif" font-size="12" font-weight="700" class="nns-svg-zone-lbl-tonic">${tonicLbl}</text>
      <text x="378" y="347" text-anchor="middle" font-family="Andika, sans-serif" font-size="12" font-weight="700" class="nns-svg-zone-lbl-dom">${domLbl}</text>

      <path d="M 190 66 Q 148 68 112 80" fill="none" stroke="var(--lilac-strong)" stroke-width="2.1" stroke-dasharray="4 4" opacity="0.72" marker-end="url(#nnsArrowSub)"/>
      <path d="M 110 102 Q 228 168 346 102" fill="none" stroke="var(--peach-strong)" stroke-width="2.1" stroke-dasharray="5 4" opacity="0.65" marker-end="url(#nnsArrowDom)"/>
      <path d="M 346 74 Q 306 52 266 56" fill="none" stroke="var(--peach-strong)" stroke-width="2.4" opacity="0.88" marker-end="url(#nnsArrowDom)"/>
      ${relationLines}

      ${nodes.map(n => {
        const badge = nnsDiagramNodeBadge(n.item.roleKey);
        const roleLabel = nnsDegreeRoleLabel(n.item.roleKey);
        const badgeParts = String(badge || "").split(" · ");
        const badgeY = n.y + n.r + 14;
        const badgeMarkup = badgeParts.length >= 2
          ? `<text x="${n.x}" y="${badgeY}" text-anchor="middle" font-family="Andika, sans-serif" font-size="12" font-weight="700" class="nns-svg-role">
              <tspan x="${n.x}" dy="0">${escapeHtml(badgeParts[0])}</tspan>
              <tspan x="${n.x}" dy="13" font-size="10.8" class="nns-svg-role-sub">${escapeHtml(badgeParts.slice(1).join(" · "))}</tspan>
            </text>`
          : `<text x="${n.x}" y="${badgeY}" text-anchor="middle" font-family="Andika, sans-serif" font-size="11.5" font-weight="700" class="nns-svg-role">${escapeHtml(badge)}</text>`;
        const numSize = n.r >= 35 ? 21 : (n.r >= 31 ? 18.5 : (n.r >= 28 ? 17 : 16));
        const chordSize = n.r >= 35 ? 14 : (n.r >= 31 ? 13 : (n.r >= 28 ? 12.5 : 12));
        const chordDy = n.r >= 35 ? 16 : (n.r >= 31 ? 15 : 14);
        return `
        <g class="nns-svg-node ${n.cls}" role="button" tabindex="0"
           data-nns-play="${escapeHtml(n.item.token)}"
           data-nns-flash="${escapeHtml(n.item.token)}"
           aria-label="${escapeHtml(`${n.item.token}: ${n.item.chordName} (${n.item.roman}, ${roleLabel})`)}">
          <circle cx="${n.x}" cy="${n.y}" r="${n.r}"/>
          <text x="${n.x}" y="${n.y - 3.5}" text-anchor="middle" font-family="Andika, sans-serif" font-size="${numSize}" font-weight="700" class="nns-svg-num">${escapeHtml(n.item.token)}</text>
          <text x="${n.x}" y="${n.y + chordDy}" text-anchor="middle" font-family="Andika, sans-serif" font-size="${chordSize}" font-weight="700" class="nns-svg-chord">${escapeHtml(n.item.chordName)}</text>
          ${badgeMarkup}
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

  const nns = getNashvilleState();
  const safeKeyIdx = ((nns.keyIdx % NNS_KEYS.length) + NNS_KEYS.length) % NNS_KEYS.length;
  nns.keyIdx = safeKeyIdx;
  const keyEntry = NNS_KEYS[safeKeyIdx];
  const mode = nns.mode === "minor" ? "minor" : "major";

  const degrees = mode === "minor" ? NNS_MINOR_DEGREES : NNS_MAJOR_DEGREES;
  const resolvedDegrees = degrees.map(d => resolveNnsToken(d.token, keyEntry, mode));
  const keyTitle = formatNnsKeyTitle(keyEntry, mode);
  const relMinorName = formatNnsPitch(keyEntry.majorScale[5]) + "m";

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

    <!-- 4. DIREKT-LINK ZUM WISSENSARTIKEL -->
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

  container.querySelectorAll("[data-nns-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      stopNashvillePlayback();
      nns.keyIdx = parseInt(btn.dataset.nnsKey || "0", 10);
      renderNashvilleView();
    });
  });

  container.querySelectorAll("[data-nns-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      stopNashvillePlayback();
      const nextMode = btn.dataset.nnsMode === "minor" ? "minor" : "major";
      if (nns.mode !== nextMode) {
        nns.mode = nextMode;
        renderNashvilleView();
      }
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
    if (typeof openKnowledgeArticle === "function") {
      openKnowledgeArticle("art-nashville-number-system", { returnView: "nashville" });
    }
  });
}

function openNashvilleView(returnView = "tools") {
  state.nashvilleReturnView = returnView;
  switchView("nashville");
}
