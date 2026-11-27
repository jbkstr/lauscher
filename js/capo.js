// =====================================================
// WERKZEUG: KAPODASTER-ÜBERSETZER (#viewCapo)
// Eigenständiges Gitarren-Werkzeug: Klingende Tonart,
// Kapodaster-Bund (0–11) & Greif-Tonart mit Priorität
// auf „Klingt in“ sowie direkt anhörbaren Akkorden.
// Nutzt die gemeinsamen Tonarten-/Akkord-Helfer aus js/nashville.js.
// =====================================================
"use strict";

let _capoOpenDropdown = null; // "capoKey" | "capoFret" | "capoShape" | null
let _capoOutsideClickBound = false;

function getCapoState() {
  if (!state.capoState) {
    state.capoState = {
      keyIdx: 0,
      mode: "major",
      fret: 0
    };
  }
  if (typeof state.capoState.keyIdx !== "number" || Number.isNaN(state.capoState.keyIdx)) {
    state.capoState.keyIdx = 0;
  }
  if (state.capoState.mode !== "major" && state.capoState.mode !== "minor") {
    state.capoState.mode = "major";
  }
  if (typeof state.capoState.fret !== "number" || Number.isNaN(state.capoState.fret)) {
    state.capoState.fret = 0;
  }
  return state.capoState;
}

function bindCapoOutsideClickCloser() {
  if (_capoOutsideClickBound || typeof document === "undefined") return;
  _capoOutsideClickBound = true;
  document.addEventListener("click", (ev) => {
    if (!_capoOpenDropdown) return;
    if (ev.target?.closest?.(".nns-capo-dropdown-anchor")) return;
    closeCapoDropdowns();
  });
}

function closeCapoDropdowns() {
  if (!_capoOpenDropdown) return false;
  _capoOpenDropdown = null;
  const root = document.getElementById("capoToolContent");
  if (root) {
    root.querySelectorAll("[data-nns-dropdown-menu]").forEach(m => m.classList.add("hidden"));
    root.querySelectorAll("[data-nns-dropdown-trigger]").forEach(btn => {
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  }
  return true;
}

function renderCapoView() {
  const container = document.getElementById("capoToolContent");
  if (!container) return;
  bindCapoOutsideClickCloser();

  const capo = getCapoState();
  const safeKeyIdx = ((capo.keyIdx % NNS_KEYS.length) + NNS_KEYS.length) % NNS_KEYS.length;
  capo.keyIdx = safeKeyIdx;
  const capoKeyEntry = NNS_KEYS[safeKeyIdx];
  const capoMode = capo.mode === "minor" ? "minor" : "major";
  const capoFret = Math.max(0, Math.min(11, parseInt(capo.fret, 10) || 0));
  capo.fret = capoFret;

  const capoDegrees = capoMode === "minor" ? NNS_MINOR_DEGREES : NNS_MAJOR_DEGREES;
  const capoSoundingTitle = formatNnsKeyTitle(capoKeyEntry, capoMode);
  const capoSoundingResolved = capoDegrees.map(d => resolveNnsToken(d.token, capoKeyEntry, capoMode));
  const capoShapePc = (capoKeyEntry.pc - capoFret + 12) % 12;
  const capoShapeKey = getNnsKeyByPc(capoShapePc);
  const capoShapeTitle = formatNnsKeyTitle(capoShapeKey, capoMode);
  const capoShapeResolved = capoDegrees.map(d => resolveNnsToken(d.token, capoShapeKey, capoMode));

  const isKeyMenuOpen = _capoOpenDropdown === "capoKey";
  const isFretMenuOpen = _capoOpenDropdown === "capoFret";
  const isShapeMenuOpen = _capoOpenDropdown === "capoShape";

  container.innerHTML = `
    <section class="k-card nns-card nns-capo-card">
      <div class="nns-card-head">
        <div>
          <span class="k-card-tag tag-peach">${tr("Gitarren-Praxis", "Guitar Practice")}</span>
          <h3 class="nns-section-title">${tr("Kapodaster-Übersetzer", "Capo Translator")}</h3>
        </div>
        <div class="nns-mode-toggle" role="tablist" aria-label="${escapeHtml(tr("Tongeschlecht", "Key Mode"))}">
          <button type="button" class="nns-mode-btn${capoMode === "major" ? " active" : ""}" data-capo-mode="major" role="tab" aria-selected="${capoMode === "major"}">${tr("Dur (Standard)", "Major (Standard)")}</button>
          <button type="button" class="nns-mode-btn${capoMode === "minor" ? " active" : ""}" data-capo-mode="minor" role="tab" aria-selected="${capoMode === "minor"}">${tr("Moll (1-)", "Minor (1-)")}</button>
        </div>
      </div>

      <div class="nns-capo-summary">
        <!-- Klickbares Dropdown: Klingende Ausgangstonart (Priorität) -->
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
              const isSel = idx === safeKeyIdx;
              return `
                <button type="button" class="nns-capo-dropdown-opt${isSel ? " is-selected" : ""}" data-capo-key="${idx}" role="option" aria-selected="${isSel}">
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
            ${Array.from({ length: 12 }, (_, f) => {
              const resShapeKey = getNnsKeyByPc((capoKeyEntry.pc - f + 12) % 12);
              const resShapeTitle = formatNnsKeyTitle(resShapeKey, capoMode);
              const isSel = f === capoFret;
              return `
                <button type="button" class="nns-capo-dropdown-opt${isSel ? " is-selected" : ""}" data-capo-fret="${f}" role="option" aria-selected="${isSel}">
                  <span>${f === 0 ? tr("Ohne Kapo", "No Capo") : tf("Bund {n}", "Fret {n}", { n: f })}</span>
                  <small>${escapeHtml(resShapeTitle)}</small>
                </button>
              `;
            }).join("")}
          </div>
        </div>

        <span class="nns-capo-arrow" aria-hidden="true">→</span>

        <!-- Klickbares Dropdown: Greif-Tonart (Klingt in bleibt Priorität -> Kapo-Bund passt sich an) -->
        <div class="nns-capo-dropdown-anchor">
          <button type="button"
                  class="nns-capo-stat is-shape is-interactive${isShapeMenuOpen ? " is-open" : ""}"
                  data-nns-dropdown-trigger="capoShape"
                  aria-haspopup="listbox"
                  aria-expanded="${isShapeMenuOpen}">
            <span class="nns-capo-stat-lbl">${tr("Greife wie in", "Play shapes of")} ${buildNnsChevronSvg()}</span>
            <strong class="nns-capo-stat-val">${escapeHtml(capoShapeTitle)}</strong>
          </button>
          <div class="nns-capo-dropdown-menu${isShapeMenuOpen ? "" : " hidden"}" data-nns-dropdown-menu="capoShape" role="listbox" aria-label="${escapeHtml(tr("Greife wie in", "Play shapes of"))}">
            ${NNS_KEYS.map((k) => {
              const title = formatNnsKeyTitle(k, capoMode);
              const reqFret = (capoKeyEntry.pc - k.pc + 12) % 12;
              const fretLabel = reqFret === 0 ? tr("Ohne Kapo", "No Capo") : tf("Bund {n}", "Fret {n}", { n: reqFret });
              const isSel = k.pc === capoShapeKey.pc;
              return `
                <button type="button" class="nns-capo-dropdown-opt${isSel ? " is-selected" : ""}" data-capo-shape-pc="${k.pc}" role="option" aria-selected="${isSel}">
                  <span>${escapeHtml(title)}</span>
                  <small>${escapeHtml(fretLabel)}</small>
                </button>
              `;
            }).join("")}
          </div>
        </div>
      </div>

      <div class="nns-capo-grid">
        ${capoShapeResolved.map((shapeItem, idx) => {
          const soundingItem = capoSoundingResolved[idx];
          return `
            <button type="button" class="nns-capo-tile nns-fn-${shapeItem.fnKey}"
                    data-capo-play="${escapeHtml(soundingItem.token)}"
                    data-capo-flash="${escapeHtml(soundingItem.token)}">
              <span class="nns-capo-num">${escapeHtml(shapeItem.token)}</span>
              <span class="nns-capo-shape-chord">${escapeHtml(shapeItem.chordName)}</span>
              <span class="nns-capo-sound-chord">${capoFret === 0 ? escapeHtml(shapeItem.roman) : tf("= {chord}", "= {chord}", { chord: soundingItem.chordName })}</span>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;

  bindCapoViewEvents(container);
}

function bindCapoViewEvents(container) {
  const capo = getCapoState();

  container.querySelectorAll("[data-capo-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      stopNashvillePlayback();
      _capoOpenDropdown = null;
      const nextMode = btn.dataset.capoMode === "minor" ? "minor" : "major";
      if (capo.mode !== nextMode) {
        capo.mode = nextMode;
        renderCapoView();
      }
    });
  });

  container.querySelectorAll("[data-nns-dropdown-trigger]").forEach(btn => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const targetKey = btn.dataset.nnsDropdownTrigger;
      _capoOpenDropdown = (_capoOpenDropdown === targetKey) ? null : targetKey;
      renderCapoView();
      if (_capoOpenDropdown) {
        const opened = document.querySelector(`#capoToolContent [data-nns-dropdown-menu="${_capoOpenDropdown}"]`);
        opened?.querySelector(".is-selected")?.scrollIntoView?.({ block: "nearest" });
      }
    });
  });

  // Auswahl im "Klingt in"-Dropdown (Priorität: Kapo bleibt, Greif-Tonart passt sich an)
  container.querySelectorAll("[data-capo-key]").forEach(btn => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      stopNashvillePlayback();
      _capoOpenDropdown = null;
      capo.keyIdx = parseInt(btn.dataset.capoKey || "0", 10);
      renderCapoView();
    });
  });

  // Auswahl im "Kapodaster"-Dropdown (Klingt in bleibt Priorität -> Greif-Tonart passt sich an)
  container.querySelectorAll("[data-capo-fret]").forEach(btn => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      stopNashvillePlayback();
      _capoOpenDropdown = null;
      capo.fret = Math.max(0, Math.min(11, parseInt(btn.dataset.capoFret || "0", 10) || 0));
      renderCapoView();
    });
  });

  // Auswahl im "Greife wie in"-Dropdown (Klingt in bleibt Priorität -> Kapo-Bund passt sich an)
  container.querySelectorAll("[data-capo-shape-pc]").forEach(btn => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      stopNashvillePlayback();
      _capoOpenDropdown = null;
      const shapePc = parseInt(btn.dataset.capoShapePc || "0", 10);
      const safeKeyIdx = ((capo.keyIdx % NNS_KEYS.length) + NNS_KEYS.length) % NNS_KEYS.length;
      const soundingPc = NNS_KEYS[safeKeyIdx].pc;
      capo.fret = (soundingPc - shapePc + 12) % 12;
      renderCapoView();
    });
  });

  container.querySelectorAll("[data-capo-play]").forEach(btn => {
    btn.addEventListener("click", () => {
      const tok = btn.dataset.capoPlay;
      playNnsSingleToken(tok, capo.keyIdx, capo.mode, "data-capo-flash", tok, true, "capoToolContent");
    });
  });
}

function openCapoView(returnView = "tools") {
  _capoOpenDropdown = null;
  state.capoReturnView = returnView;
  switchView("capo");
}
