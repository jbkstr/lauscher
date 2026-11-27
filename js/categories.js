/**
 * Lauscher • Kategorie-Übersichten (#viewCategory) & Kategorie-Hilfeseiten (#viewCategoryHelp)
 */

/**
 * Baut die Auswahl-Unterseite (#viewCategory) für den gewählten Übungstyp auf
 */
// Einsteiger-Übungen (zentral gepflegt): Schlüssel siehe getExerciseNodeKey()
const BEGINNER_EXERCISES = new Set([
  "cadence:1:last",
  "interval-melodic:1",
  "interval-melodic-down:1",
  "interval-harmonic:1",
  "interval-drone:1",
  "interval-melodic:6",
  "interval-melodic-down:6",
  "interval-harmonic:6",
  "interval-drone:6",
  "chord-arp-up:1",
  "chord-arp-down:1",
  "interval-chords:1",
  "melody:do-fa:fixed:single",
  "solfege:1",
  "solfege:2",
  "solfege:9",
  "rhythm-meter:1",
  "rhythm-dictation:1",
  "rhythm-tap:1",
  "notation-treble:1"
]);

function getExerciseNodeKey(btn) {
  const d = btn?.dataset || {};
  if (d.launchCadence) return `${d.cadenceTonality === "minor" ? "cadence-minor" : "cadence"}:${d.launchCadence}:${d.cadencePos}`;
  if (d.launchInt) return `${d.launchInt}:${d.intLvl}`;
  if (d.launchChord) return `${d.launchChord}:${d.chordLvl}`;
  if (d.launchMelody) return `melody:${d.launchMelody}:${d.melodyKey}:${d.melodyOctave}`;
  if (d.launchSolfege) return `solfege:${d.launchSolfege}`;
  if (d.launchRhythm) return `${d.launchRhythm}${d.rhythmRead === "1" ? "-read" : ""}:${d.rhythmLvl}`;
  if (d.launchProd) return `${d.launchProd}:${d.prodLvl}`;
  if (d.launchModes) return `${d.launchModes}:${d.modesLvl}`;
  if (d.launchNotation) return `${d.launchNotation}:${d.notationLvl}`;
  return null;
}

function markBeginnerExerciseNodes(container) {
  if (!container) return;
  const label = escapeHtml(tr("Einsteiger", "Beginner"));
  container.querySelectorAll(".subpage-node-btn").forEach(btn => {
    if (!BEGINNER_EXERCISES.has(getExerciseNodeKey(btn))) return;
    if (btn.querySelector(".node-beginner-badge")) return;
    btn.classList.add("is-beginner");
    btn.insertAdjacentHTML("beforeend", `<span class="node-beginner-badge">${label}</span>`);
  });
}

const CATEGORY_CHEVRON_SVG = `<svg class="category-type-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>`;

function getCategoryBadgeSVG(kind) {
  let body = "";
  if (kind === "treble") {
    body = `
      <g opacity="0.24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
        <line x1="9" y1="15" x2="39" y2="15"/>
        <line x1="9" y1="20" x2="39" y2="20"/>
        <line x1="9" y1="25" x2="39" y2="25"/>
        <line x1="9" y1="30" x2="39" y2="30"/>
      </g>
      <g transform="translate(18.4, 5.0) scale(0.41)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.6 59.2 C15.6 62.2, 12.0 61.8, 10.2 58.6 C8.0 54.2, 9.2 48.0, 13.6 46.8 C18.2 45.6, 23.2 49.2, 23.8 56.8 C24.4 64.2, 20.8 70.0, 14.4 70.0 C7.5 70.0, 2.9 63.2, 3.4 54.0 C3.8 44.2, 14.6 35.8, 18.8 21.0 C20.6 14.2, 20.0 4.8, 16.5 4.4 C13.7 4.0, 12.6 9.5, 12.8 17.5 L13.6 79.8 C13.8 86.0, 10.8 88.6, 7.8 88.0 C5.8 87.6, 4.8 85.6, 5.2 83.4" stroke-width="5.2"/>
        <circle cx="6.0" cy="82.8" r="3.2" fill="currentColor" stroke="none"/>
      </g>`;
  } else if (kind === "bass") {
    body = `
      <g opacity="0.24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
        <line x1="9" y1="15" x2="39" y2="15"/>
        <line x1="9" y1="20" x2="39" y2="20"/>
        <line x1="9" y1="25" x2="39" y2="25"/>
        <line x1="9" y1="30" x2="39" y2="30"/>
      </g>
      <g transform="translate(3.6, -27.7) scale(0.60)">
        <circle cx="25" cy="76" r="4.2" fill="currentColor"/>
        <path d="M24.5 76 C23 67.5, 31 63.2, 37.5 66.2 C43.8 69.2, 43.2 84.5, 34 95 C28 102, 21.5 106, 17.5 108.5" fill="none" stroke="currentColor" stroke-width="3.8" stroke-linecap="round"/>
        <circle cx="48" cy="70" r="2.7" fill="currentColor"/>
        <circle cx="48" cy="82" r="2.7" fill="currentColor"/>
      </g>`;
  } else if (kind === "alto") {
    body = `
      <g opacity="0.24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
        <line x1="9" y1="15" x2="39" y2="15"/>
        <line x1="9" y1="20" x2="39" y2="20"/>
        <line x1="9" y1="25" x2="39" y2="25"/>
        <line x1="9" y1="30" x2="39" y2="30"/>
      </g>
      <g transform="translate(5.4, -27.0) scale(0.58)">
        <rect x="20" y="64" width="4.8" height="48" rx="1.2" fill="currentColor"/>
        <line x1="28" y1="64" x2="28" y2="112" stroke="currentColor" stroke-width="2.1"/>
        <path d="M29.5 88 C32.5 81, 43 81.5, 44 73.5 C45 67, 39.5 64, 33.5 65.5 C31 66.2, 30.5 69, 33 70.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M29.5 88 C32.5 95, 43 94.5, 44 102.5 C45 109, 39.5 112, 33.5 110.5 C31 109.8, 30.5 107, 33 105.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
      </g>`;
  } else if (kind === "mixed") {
    body = `
      <g transform="translate(10.0, 9.2) scale(0.32)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.6 59.2 C15.6 62.2, 12.0 61.8, 10.2 58.6 C8.0 54.2, 9.2 48.0, 13.6 46.8 C18.2 45.6, 23.2 49.2, 23.8 56.8 C24.4 64.2, 20.8 70.0, 14.4 70.0 C7.5 70.0, 2.9 63.2, 3.4 54.0 C3.8 44.2, 14.6 35.8, 18.8 21.0 C20.6 14.2, 20.0 4.8, 16.5 4.4 C13.7 4.0, 12.6 9.5, 12.8 17.5 L13.6 79.8 C13.8 86.0, 10.8 88.6, 7.8 88.0 C5.8 87.6, 4.8 85.6, 5.2 83.4" stroke-width="6.2"/>
        <circle cx="6.0" cy="82.8" r="3.6" fill="currentColor" stroke="none"/>
      </g>
      <g transform="translate(13.2, -16.8) scale(0.47)">
        <circle cx="25" cy="76" r="4.4" fill="currentColor"/>
        <path d="M24.5 76 C23 67.5, 31 63.2, 37.5 66.2 C43.8 69.2, 43.2 84.5, 34 95 C28 102, 21.5 106, 17.5 108.5" fill="none" stroke="currentColor" stroke-width="4.4" stroke-linecap="round"/>
        <circle cx="48" cy="70" r="2.9" fill="currentColor"/>
        <circle cx="48" cy="82" r="2.9" fill="currentColor"/>
      </g>`;
  } else if (kind === "grand") {
    body = `
      <path d="M14.5 12 C11.5 12.5, 12.2 21, 9.5 24 C12.2 27, 11.5 35.5, 14.5 36" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="17" y1="12.5" x2="17" y2="35.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <g stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity="0.65">
        <line x1="17" y1="13" x2="37" y2="13"/>
        <line x1="17" y1="17" x2="37" y2="17"/>
        <line x1="17" y1="21" x2="37" y2="21"/>
        <line x1="17" y1="27" x2="37" y2="27"/>
        <line x1="17" y1="31" x2="37" y2="31"/>
        <line x1="17" y1="35" x2="37" y2="35"/>
      </g>
      <ellipse cx="29" cy="17" rx="3.1" ry="2.2" transform="rotate(-18 29 17)" fill="currentColor"/>
      <line x1="31.8" y1="16.5" x2="31.8" y2="9.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
      <ellipse cx="24.5" cy="31" rx="3.1" ry="2.2" transform="rotate(-18 24.5 31)" fill="currentColor"/>
      <line x1="21.7" y1="31.5" x2="21.7" y2="38.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`;
  } else if (kind === "keysig") {
    body = `
      <g transform="translate(15.5, 22) scale(0.95)" stroke="currentColor" stroke-linecap="round">
        <line x1="-2.8" y1="-9" x2="-2.8" y2="9" stroke-width="1.9"/>
        <line x1="2.8" y1="-10" x2="2.8" y2="8" stroke-width="1.9"/>
        <line x1="-6" y1="-2.2" x2="6" y2="-4.2" stroke-width="2.6"/>
        <line x1="-6" y1="3.8" x2="6" y2="1.8" stroke-width="2.6"/>
      </g>
      <line x1="22" y1="31.5" x2="26.5" y2="16.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" opacity="0.45"/>
      <g transform="translate(33, 27.5) scale(1.05)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <line x1="-2.5" y1="-13.5" x2="-2.5" y2="4.2" stroke-width="2.0"/>
        <path d="M-2.5 -0.8 C1.2 -3.6, 5.2 -1.8, 4.8 1.5 C4.3 4.2, 0.2 5.2, -2.5 4.2" stroke-width="2.2"/>
      </g>`;
  } else if (kind === "keysig-nat") {
    body = `
      <g transform="translate(16.2, 23.8) scale(0.92)" stroke="currentColor" stroke-linecap="round">
        <line x1="-2.8" y1="-9" x2="-2.8" y2="9" stroke-width="1.95"/>
        <line x1="2.8" y1="-10" x2="2.8" y2="8" stroke-width="1.95"/>
        <line x1="-6" y1="-2.2" x2="6" y2="-4.2" stroke-width="2.65"/>
        <line x1="-6" y1="3.8" x2="6" y2="1.8" stroke-width="2.65"/>
      </g>
      <line x1="23.0" y1="31.5" x2="27.2" y2="16.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" opacity="0.45"/>
      <g transform="translate(33.8, 24.0) scale(0.96)" stroke="currentColor" stroke-linecap="round">
        <line x1="-3.0" y1="-10.5" x2="-3.0" y2="4.6" stroke-width="1.95"/>
        <line x1="3.0" y1="-4.6" x2="3.0" y2="10.5" stroke-width="1.95"/>
        <line x1="-3.0" y1="-2.6" x2="3.0" y2="-4.4" stroke-width="2.55"/>
        <line x1="-3.0" y1="4.4" x2="3.0" y2="2.6" stroke-width="2.55"/>
      </g>`;
  } else if (kind === "nat-sharp") {
    body = `
      <g transform="translate(14.8, 24.0) scale(0.96)" stroke="currentColor" stroke-linecap="round">
        <line x1="-3.0" y1="-10.5" x2="-3.0" y2="4.6" stroke-width="1.95"/>
        <line x1="3.0" y1="-4.6" x2="3.0" y2="10.5" stroke-width="1.95"/>
        <line x1="-3.0" y1="-2.6" x2="3.0" y2="-4.4" stroke-width="2.55"/>
        <line x1="-3.0" y1="4.4" x2="3.0" y2="2.6" stroke-width="2.55"/>
      </g>
      <line x1="21.0" y1="31.5" x2="25.2" y2="16.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" opacity="0.45"/>
      <g transform="translate(32.0, 23.8) scale(0.92)" stroke="currentColor" stroke-linecap="round">
        <line x1="-2.8" y1="-9" x2="-2.8" y2="9" stroke-width="1.95"/>
        <line x1="2.8" y1="-10" x2="2.8" y2="8" stroke-width="1.95"/>
        <line x1="-6" y1="-2.2" x2="6" y2="-4.2" stroke-width="2.65"/>
        <line x1="-6" y1="3.8" x2="6" y2="1.8" stroke-width="2.65"/>
      </g>`;
  } else if (kind === "melody-dict") {
    body = `
      <ellipse cx="14.5" cy="32" rx="4.2" ry="3.0" transform="rotate(-18 14.5 32)" fill="currentColor"/>
      <line x1="18.2" y1="31.2" x2="18.2" y2="15" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>
      <ellipse cx="29.5" cy="27.5" rx="4.2" ry="3.0" transform="rotate(-18 29.5 27.5)" fill="currentColor"/>
      <line x1="33.2" y1="26.7" x2="33.2" y2="11.5" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>
      <path d="M18.2 15 L33.2 11.5" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/>
      <circle cx="38" cy="27.5" r="2.1" fill="currentColor"/>`;
  }
  return `<svg class="node-rhythm-icon" width="46" height="46" viewBox="0 0 48 48" aria-hidden="true">${body}</svg>`;
}

function formatStackedParenTitle(title) {
  const s = String(title || "").trim();
  const m = s.match(/^(.+?)\s+(\([^)]+\))$/);
  if (!m) return s;
  return `<span class="stacked-title-main">${m[1]}</span><span class="stacked-title-paren">${m[2]}</span>`;
}

// Mikrofon-Symbol für die „… treffen“-Karten (Nachsingen mit Rückmeldung)
const SING_MATCH_NODE_MIC_SVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><line x1="12" y1="17.5" x2="12" y2="21.5"/><line x1="8.5" y1="21.5" x2="15.5" y2="21.5"/></svg>`;

function renderCategoryTypeMenu(container, categoryKey, items, options = {}) {
  const visibleItems = typeof filterExplorerCategoryItems === "function"
    ? filterExplorerCategoryItems(categoryKey, items)
    : items;
  container.innerHTML = `
    ${options.introHtml || ""}
    <div class="category-types-list">
      ${visibleItems.map(item => `
        <button type="button" class="category-type-card" data-open-cat-section="${escapeHtml(item.id)}">
          <span class="category-type-badge-wrap" aria-hidden="true">${item.badgeHtml}</span>
          <span class="category-type-body">
            <span class="category-type-title">${item.titleHtml || item.title}</span>
            <span class="category-type-desc">${item.desc}</span>
            ${item.meta ? `<span class="category-type-meta">${escapeHtml(item.meta)}</span>` : ""}
          </span>
          ${CATEGORY_CHEVRON_SVG}
        </button>
      `).join("")}
    </div>
  `;

  container.querySelectorAll("[data-open-cat-section]").forEach(btn => {
    btn.addEventListener("click", () => {
      openCategoryPage(categoryKey, { sectionId: btn.dataset.openCatSection });
    });
  });
}

function openCategoryPage(categoryKey, options = {}) {
  const container = document.getElementById("categoryPageContent");
  if (!container) return;

  const wasSameView = state.currentView === "category";
  const prevCat = state.activeCategory;
  const prevSec = state.activeCategorySection || null;
  const activeSection = categoryKey === "warmup" ? null : (options.sectionId || null);

  state.activeCategory = categoryKey;
  state.activeCategorySection = activeSection;
  state.activeCategorySectionTitle = "";

  if (categoryKey === "cadence") {
    const CADENCE_LEVELS = [
      { level: 1, circle: "circle-sage",  badge: "I–V",   title: tr("Stufe 1: Basis", "Level 1: Basics"),              sub: tr("I, IV, V und vi", "I, IV, V & vi") },
      { level: 2, circle: "circle-sage",  badge: "ii–vi", title: tr("Stufe 2: Diatonisch", "Level 2: Diatonic"),       sub: tr("Alle leitereigenen Stufen", "All diatonic scale degrees") },
      { level: 3, circle: "circle-peach", badge: "V/V",   title: tr("Stufe 3: Erweitert", "Level 3: Extended"),        sub: tr("Mit Sekundärdominante & V7", "With secondary dominant & V7") },
      { level: 4, circle: "circle-lilac", badge: "bII7",  title: tr("Stufe 4: Jazz & Tritone", "Level 4: Jazz & Tritone"), sub: tr("Inklusive Tritonussubstitution", "Including tritone substitution") }
    ];

    const MINOR_CADENCE_LEVELS = [
      { level: 1, circle: "circle-sage",  badge: "i–V",     title: tr("Stufe 1: Basis", "Level 1: Basics"),              sub: tr("i, iv, V und VI", "i, iv, V & VI") },
      { level: 2, circle: "circle-sage",  badge: "ii°–VII", nodeClass: "node-circle-nowrap", title: tr("Stufe 2: Diatonisch", "Level 2: Diatonic"),     sub: tr("Alle leitereigenen Stufen inkl. v und V", "All diatonic degrees incl. v & V") },
      { level: 3, circle: "circle-peach", badge: "N6",      title: tr("Stufe 3: Erweitert", "Level 3: Extended"),        sub: tr("Mit V7, V/V & Neapolitaner", "With V7, V/V & Neapolitan") },
      { level: 4, circle: "circle-lilac", badge: "iiø7",    title: tr("Stufe 4: Jazz & Tritone", "Level 4: Jazz & Tritone"), sub: tr("Moll-ii–V & Tritonussubstitution", "Minor ii–V & tritone substitution") }
    ];

    const CADENCE_TYPES = [
      {
        id: "major-last",
        posMode: "last",
        tonality: "major",
        isBeginner: true,
        badgeHtml: `<div class="node-circle circle-sage">I–V</div>`,
        title: tr("Dur • Ziel: Takt 4", "Major • Target: Bar 4"),
        sectionTitle: tr("Übungen zu Kadenzen • Ziel: Takt 4", "Cadence Exercises • Target: Bar 4"),
        desc: tr("Höre drei Takte Kontext und bestimme die gesuchte 4. Stufe", "Listen to three bars of context and identify the missing 4th chord"),
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 })
      },
      {
        id: "major-random",
        posMode: "random",
        tonality: "major",
        isBeginner: false,
        badgeHtml: `<div class="node-circle circle-peach has-random-badge">I–V<span class="node-random-badge">?</span></div>`,
        title: tr("Dur • Zufälliger Takt", "Major • Random Bar"),
        sectionTitle: tr("Übungen zu Kadenzen • Zufälliger Takt", "Cadence Exercises • Random Bar"),
        desc: tr("Die fehlende Stufe steht an einer zufälligen Stelle (Takt 1–4)", "The missing chord appears in a random position (Bars 1–4)"),
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 })
      },
      {
        id: "minor-last",
        posMode: "last",
        tonality: "minor",
        isBeginner: true,
        badgeHtml: `<div class="node-circle circle-lilac">i–V</div>`,
        title: tr("Moll • Ziel: Takt 4", "Minor • Target: Bar 4"),
        sectionTitle: tr("Moll-Kadenzen • Ziel: Takt 4", "Minor Cadences • Target: Bar 4"),
        desc: tr("Dieselben Übungen in Moll-Tonarten: Höre drei Takte Kontext und bestimme die gesuchte 4. Stufe", "The same exercises in minor keys: listen to three bars of context and identify the missing 4th chord"),
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 })
      },
      {
        id: "minor-random",
        posMode: "random",
        tonality: "minor",
        isBeginner: false,
        badgeHtml: `<div class="node-circle circle-lilac has-random-badge">i–V<span class="node-random-badge">?</span></div>`,
        title: tr("Moll • Zufälliger Takt", "Minor • Random Bar"),
        sectionTitle: tr("Moll-Kadenzen • Zufälliger Takt", "Minor Cadences • Random Bar"),
        desc: tr("Die fehlende Moll-Stufe steht an einer zufälligen Stelle (Takt 1–4)", "The missing minor-key chord appears in a random position (Bars 1–4)"),
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 })
      }
    ];

    const selectedCad = activeSection ? CADENCE_TYPES.find(t => t.id === activeSection) : null;
    if (!selectedCad) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, CADENCE_TYPES);
    } else {
      state.activeCategorySectionTitle = selectedCad.title;
      const levels = selectedCad.tonality === "minor" ? MINOR_CADENCE_LEVELS : CADENCE_LEVELS;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${selectedCad.sectionTitle}</h3>
          <p class="subpage-section-desc">${selectedCad.desc}</p>
          <div class="subpage-nodes-grid">
            ${levels.map(lv => `
              <button class="subpage-node-btn" data-launch-cadence="${lv.level}" data-cadence-pos="${selectedCad.posMode}" data-cadence-tonality="${selectedCad.tonality}">
                <div class="node-circle ${lv.circle}${lv.nodeClass ? ` ${lv.nodeClass}` : ""}${selectedCad.posMode === "random" ? " has-random-badge" : ""}">${lv.badge}${selectedCad.posMode === "random" ? `<span class="node-random-badge" title="${tr("Zufälliger Takt", "Random Measure")}">?</span>` : ""}</div>
                <span class="node-title">${lv.title}</span>
                <span class="node-sub">${selectedCad.posMode === "random" ? `${lv.sub} ${tr("(Zufallstakt)", "(Random Bar)")}` : lv.sub}</span>
              </button>
            `).join("")}
          </div>
        </div>
      `;

      container.querySelectorAll("[data-launch-cadence]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setMode(btn.dataset.cadenceTonality === "minor" ? "cadence-minor" : "cadence");
          state.setDifficulty(btn.dataset.launchCadence);
          state.setCadencePos(btn.dataset.cadencePos);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    }

  } else if (categoryKey === "interval") {
    const INTERVAL_PLAY_SECTIONS = [
      {
        mode: "interval-melodic",
        title: tr("Melodische Intervalle (Aufwärts)", "Melodic Intervals (Ascending)"),
        desc: tr("Zwei Töne erklingen nacheinander vom Ausgangston nach oben", "Two notes played sequentially upward from the reference pitch"),
        circle: "circle-peach",
        dir: "up",
        badgeHtml: renderDirectionNodeCircle("1–5", "up", "circle-peach"),
        isBeginner: true
      },
      {
        mode: "interval-melodic-down",
        title: tr("Melodische Intervalle (Abwärts)", "Melodic Intervals (Descending)"),
        desc: tr("Zwei Töne erklingen nacheinander vom Ausgangston nach unten", "Two notes played sequentially downward from the reference pitch"),
        circle: "circle-peach",
        dir: "down",
        badgeHtml: renderDirectionNodeCircle("1–5", "down", "circle-peach"),
        isBeginner: true
      },
      {
        mode: "interval-harmonic",
        title: tr("Harmonische Intervalle", "Harmonic Intervals"),
        desc: tr("Beide Töne erklingen gleichzeitig als Zusammenklang", "Both notes sounded simultaneously in harmony"),
        circle: "circle-lilac",
        dir: null,
        badgeHtml: `<div class="node-circle circle-lilac">1+5</div>`,
        isBeginner: true
      },
      {
        mode: "interval-drone",
        title: tr("Intervalle über Grundton-Fläche", "Intervals Over Root Pad"),
        desc: tr("Eine warme Streicher-Fläche hält den Grundton – nach kurzer Verzögerung erklingt der gesuchte Intervallton auf dem Klavier darüber", "A warm strings pad sustains the root pitch — after a short delay, piano plays the target interval tone above it"),
        circle: "circle-sage",
        dir: null,
        badgeHtml: `<div class="node-circle circle-sage node-circle-compact">Pad</div>`,
        isBeginner: true
      }
    ];

    const INTERVAL_TYPE_ITEMS = [
      ...INTERVAL_PLAY_SECTIONS.map(sec => ({
        id: sec.mode,
        title: sec.title,
        desc: sec.desc,
        badgeHtml: sec.badgeHtml,
        meta: tr("9 Stufen • Dur, Moll & Chromatisch", "9 Levels • Major, Minor & Chromatic"),
        isBeginner: sec.isBeginner
      })),
      {
        id: "interval-custom",
        title: tr("Freie Tonart & Modi", "Custom Key & Modes"),
        desc: tr(
          "Wähle deinen festen Grundton (oder Zufall), eine Tonleiter bzw. Kirchentonart und passe die abgefragten Intervalle beliebig an.",
          "Choose a fixed root key (or random), pick any scale or church mode, and customize which intervals are tested."
        ),
        badgeHtml: `<div class="node-circle circle-peach node-circle-compact">${tr("Frei", "Free")}</div>`,
        meta: tr("Frei wählbar • alle 4 Spielarten", "Custom • all 4 playback modes"),
        isBeginner: false
      },
      {
        id: "sing-interval",
        title: getSingMatchModeTitle("sing-interval"),
        desc: tr(
          "Der Ausgangston erklingt, du singst das angezeigte Intervall – Lauscher hört über das Mikrofon zu und sagt dir, ob du getroffen hast.",
          "The root note plays, you sing the interval shown — Lauscher listens through the microphone and tells you whether you hit it."
        ),
        badgeHtml: `<div class="node-circle circle-sage">${SING_MATCH_NODE_MIC_SVG}</div>`,
        meta: tr("9 Stufen • mit Mikrofon", "9 Levels • with microphone"),
        isBeginner: false
      },
      {
        id: "midi-interval",
        title: typeof getMidiPlayModeTitle === "function" ? getMidiPlayModeTitle("midi-interval") : tr("Intervalle spielen", "Play Intervals"),
        desc: tr(
          "Der Ausgangston erklingt, du spielst das angezeigte Intervall auf deinem MIDI-Keyboard – ohne Gerät auf der Bildschirm-Klaviatur.",
          "The root note plays and you play the shown interval on your MIDI keyboard — or on the on-screen keyboard without a device."
        ),
        badgeHtml: `<div class="node-circle circle-lilac"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M7.5 5v8.5M12 5v8.5M16.5 5v8.5"/><rect x="6" y="5" width="3" height="7" rx="0.6" fill="currentColor"/><rect x="10.5" y="5" width="3" height="7" rx="0.6" fill="currentColor"/><rect x="15" y="5" width="3" height="7" rx="0.6" fill="currentColor"/></svg></div>`,
        meta: tr("9 Stufen • MIDI oder Bildschirm", "9 Levels • MIDI or screen"),
        isBeginner: false
      }
    ];

    const renderIntBadge = (sec, text) => {
      if (sec.dir) {
        return renderDirectionNodeCircle(text, sec.dir, sec.circle);
      }
      const cls = String(text).length > 3 ? " node-circle-compact node-circle-nowrap" : "";
      return `<div class="node-circle ${sec.circle}${cls}">${text}</div>`;
    };

    const getSectionCardGroups = (sec) => {
      const begCircleHtml = sec.dir
        ? renderDirectionNodeCircle("1–5", sec.dir, sec.circle)
        : `<div class="node-circle ${sec.circle}">1+5</div>`;
      const begMinCircleHtml = sec.dir
        ? renderDirectionNodeCircle("1–♭3", sec.dir, sec.circle)
        : `<div class="node-circle ${sec.circle} node-circle-compact node-circle-nowrap">1+♭3</div>`;
      return {
        major: [
          {
            lvl: 1,
            circleHtml: begCircleHtml,
            title: tr("Stufe 1: Einsteiger", "Level 1: Beginner"),
            sub: tr("Prime, gr. Terz, Quinte, Oktave", "Unison, Maj 3rd, 5th & Octave")
          },
          {
            lvl: 2,
            circleHtml: renderIntBadge(sec, "1–4"),
            title: tr("Stufe 2: Dur 1–4", "Level 2: Major 1–4"),
            sub: tr("Untere Hälfte: Prime, gr. Sek., gr. Terz, Quarte", "Lower half: Unison, Maj 2nd, Maj 3rd, 4th")
          },
          {
            lvl: 3,
            circleHtml: renderIntBadge(sec, "5–8"),
            title: tr("Stufe 3: Dur 5–8", "Level 3: Major 5–8"),
            sub: tr("Obere Hälfte: Quinte, gr. Sexte, gr. Sept., Oktave", "Upper half: 5th, Maj 6th, Maj 7th, Octave")
          },
          {
            lvl: 4,
            circleHtml: renderIntBadge(sec, tr("Dur", "Maj")),
            title: tr("Stufe 4: Dur-Tonleiter", "Level 4: Major Scale"),
            sub: tr("Alle 8 diatonischen Dur-Intervalle", "All 8 diatonic major intervals")
          }
        ],
        minor: [
          {
            lvl: 6,
            circleHtml: begMinCircleHtml,
            title: tr("Moll 1: Einsteiger", "Minor 1: Beginner"),
            sub: tr("Prime, kl. Terz, Quinte, Oktave", "Unison, Min 3rd, 5th & Octave")
          },
          {
            lvl: 7,
            circleHtml: renderIntBadge(sec, "1–4m"),
            title: tr("Moll 2: Moll 1–4", "Minor 2: Minor 1–4"),
            sub: tr("Untere Hälfte: Prime, gr. Sek., kl. Terz, Quarte", "Lower half: Unison, Maj 2nd, Min 3rd, 4th")
          },
          {
            lvl: 8,
            circleHtml: renderIntBadge(sec, "5–8m"),
            title: tr("Moll 3: Moll 5–8", "Minor 3: Minor 5–8"),
            sub: tr("Obere Hälfte: Quinte, kl. Sexte, kl. Sept., Oktave", "Upper half: 5th, Min 6th, Min 7th, Octave")
          },
          {
            lvl: 9,
            circleHtml: renderIntBadge(sec, tr("Moll", "Min")),
            title: tr("Moll 4: Moll-Tonleiter", "Minor 4: Minor Scale"),
            sub: tr("Alle 8 Intervalle in natürlichem Moll", "All 8 natural minor intervals")
          }
        ],
        chromatic: [
          {
            lvl: 5,
            circleHtml: renderIntBadge(sec, tr("Alle", "All")),
            title: tr("Stufe 5: Chromatisch", "Level 5: Chromatic"),
            sub: tr("Alle 15 Intervalle bis zur None", "All 15 intervals up to a 9th")
          }
        ]
      };
    };

    const selectedIntItem = activeSection ? INTERVAL_TYPE_ITEMS.find(t => t.id === activeSection) : null;
    if (!selectedIntItem) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, INTERVAL_TYPE_ITEMS);
    } else if (selectedIntItem.id === "sing-interval") {
      state.activeCategorySectionTitle = selectedIntItem.title;
      const renderSingIntervalSubpage = () => {
        const curDir = ["up", "down", "mixed"].includes(state.settings.singIntervalDirection) ? state.settings.singIntervalDirection : "up";
        const sec = { circle: "circle-sage", dir: curDir === "mixed" ? null : curDir };
        const groups = getSectionCardGroups(sec);
        const renderSingCards = (cards) => cards.map(card => `
          <button class="subpage-node-btn" data-launch-sing-int="${card.lvl}">
            ${card.circleHtml}
            <span class="node-title">${card.title}</span>
            <span class="node-sub">${card.sub}</span>
          </button>
        `).join("");
        container.innerHTML = `
          <div class="subpage-section">
            <h3 class="subpage-section-title">${escapeHtml(selectedIntItem.title)}</h3>
            <p class="subpage-section-desc">${selectedIntItem.desc}</p>
            <div class="notation-key-toolbar">
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("Richtung:", "Direction:")}</span>
                <div class="notation-key-quick-row">
                  ${["up", "down", "mixed"].map(dir => `
                    <button type="button" class="k-filter-pill${curDir === dir ? " active" : ""}" data-sing-int-dir="${dir}" aria-pressed="${curDir === dir}">
                      ${escapeHtml(getSingIntervalDirectionLabel(dir))}
                    </button>
                  `).join("")}
                </div>
              </div>
            </div>
          </div>
          <div class="subpage-section">
            <h3 class="subpage-section-title">${tr("Dur-Intervalle", "Major Intervals")}</h3>
            <div class="subpage-nodes-grid">${renderSingCards(groups.major)}</div>
          </div>
          <div class="subpage-section">
            <h3 class="subpage-section-title">${tr("Moll-Intervalle", "Minor Intervals")}</h3>
            <div class="subpage-nodes-grid">${renderSingCards(groups.minor)}</div>
          </div>
          <div class="subpage-section">
            <h3 class="subpage-section-title">${tr("Chromatisch (Alle 15 Intervalle)", "Chromatic (All 15 Intervals)")}</h3>
            <div class="subpage-nodes-grid">${renderSingCards(groups.chromatic)}</div>
          </div>
        `;
        container.querySelectorAll("[data-sing-int-dir]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.singIntervalDirection = btn.dataset.singIntDir;
            renderSingIntervalSubpage();
          });
        });
        container.querySelectorAll("[data-launch-sing-int]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.setMode("sing-interval");
            state.setSingMatchLevel("sing-interval", btn.dataset.launchSingInt);
            state.exerciseReturnView = "category";
            switchView("exercise");
          });
        });
      };
      renderSingIntervalSubpage();
    } else if (selectedIntItem.id === "midi-interval") {
      state.activeCategorySectionTitle = selectedIntItem.title;
      const renderMidiIntervalSubpage = () => {
        const curDir = ["up", "down", "mixed"].includes(state.settings.midiIntervalDirection) ? state.settings.midiIntervalDirection : "up";
        const sec = { circle: "circle-lilac", dir: curDir === "mixed" ? null : curDir };
        const groups = getSectionCardGroups(sec);
        const renderMidiCards = (cards) => cards.map(card => `
          <button class="subpage-node-btn" data-launch-midi-int="${card.lvl}">
            ${card.circleHtml}
            <span class="node-title">${card.title}</span>
            <span class="node-sub">${card.sub}</span>
          </button>
        `).join("");
        container.innerHTML = `
          <div class="subpage-section">
            <h3 class="subpage-section-title">${escapeHtml(selectedIntItem.title)}</h3>
            <p class="subpage-section-desc">${selectedIntItem.desc}</p>
            <div class="notation-key-toolbar">
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("Richtung:", "Direction:")}</span>
                <div class="notation-key-quick-row">
                  ${["up", "down", "mixed"].map(dir => `
                    <button type="button" class="k-filter-pill${curDir === dir ? " active" : ""}" data-midi-int-dir="${dir}" aria-pressed="${curDir === dir}">
                      ${escapeHtml(getMidiIntervalDirectionLabel(dir))}
                    </button>
                  `).join("")}
                </div>
              </div>
            </div>
          </div>
          <div class="subpage-section">
            <h3 class="subpage-section-title">${tr("Dur-Intervalle", "Major Intervals")}</h3>
            <div class="subpage-nodes-grid">${renderMidiCards(groups.major)}</div>
          </div>
          <div class="subpage-section">
            <h3 class="subpage-section-title">${tr("Moll-Intervalle", "Minor Intervals")}</h3>
            <div class="subpage-nodes-grid">${renderMidiCards(groups.minor)}</div>
          </div>
          <div class="subpage-section">
            <h3 class="subpage-section-title">${tr("Chromatisch (Alle 15 Intervalle)", "Chromatic (All 15 Intervals)")}</h3>
            <div class="subpage-nodes-grid">${renderMidiCards(groups.chromatic)}</div>
          </div>
        `;
        container.querySelectorAll("[data-midi-int-dir]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.midiIntervalDirection = btn.dataset.midiIntDir;
            if (typeof rememberPracticeProgress === "function") rememberPracticeProgress();
            renderMidiIntervalSubpage();
          });
        });
        container.querySelectorAll("[data-launch-midi-int]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.setMode("midi-interval");
            state.setMidiPlayLevel("midi-interval", btn.dataset.launchMidiInt);
            state.exerciseReturnView = "category";
            switchView("exercise");
          });
        });
      };
      renderMidiIntervalSubpage();
    } else if (selectedIntItem.id === "interval-custom") {
      state.activeCategorySectionTitle = selectedIntItem.title;
      const renderCustomIntervalSubpage = () => {
        const curRoot = String(state.settings.intervalCustomRoot ?? "random");
        const curScale = String(state.settings.intervalCustomScale || "ionian");
        const curScope = String(state.settings.intervalCustomScope || "full");
        const activePool = getActiveIntervalCustomPool();
        const hasManualPool = Array.isArray(state.settings.intervalCustomPool) && state.settings.intervalCustomPool.length >= 2;
        const rootOptions = ["random", ...Array.from({ length: 12 }, (_, pc) => String(pc))];
        const scaleIds = Object.keys(INTERVAL_SCALE_PRESETS);
        const scopeIds = ["triad", "lower", "upper", "full"];
        const allIntervals = Object.keys(HARMONIC_DATA.intervals);
        const summaryBadge = getIntervalCustomBadgeLabel();

        container.innerHTML = `
          <div class="subpage-section">
            <div class="subpage-section-head-row">
              <h3 class="subpage-section-title">${tr("Freie Tonart & Modi (Eigenes Intervall-Training)", "Custom Key & Modes (Custom Interval Trainer)")}</h3>
              <span class="subpage-section-key-pill">${escapeHtml(summaryBadge)}</span>
            </div>
            <p class="subpage-section-desc">${tr(
              "Wähle deinen festen Grundton (oder Zufall), eine Tonleiter bzw. Kirchentonart und passe die abgefragten Intervalle beliebig an.",
              "Choose a fixed root key (or random), pick any scale or church mode, and customize which intervals are tested."
            )}</p>
            <div class="notation-key-toolbar">
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("1. Grundton / Tonart:", "1. Root / Key:")}</span>
                <div class="notation-key-quick-row">
                  ${rootOptions.map(opt => `
                    <button type="button" class="k-filter-pill${curRoot === opt ? " active" : ""}" data-int-custom-root="${opt}">
                      ${escapeHtml(getIntervalCustomRootLabel(opt))}
                    </button>
                  `).join("")}
                </div>
              </div>
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("2. Tonleiter / Modus:", "2. Scale / Mode:")}</span>
                <div class="notation-key-quick-row">
                  ${scaleIds.map(sid => `
                    <button type="button" class="k-filter-pill${curScale === sid ? " active" : ""}" data-int-custom-scale="${sid}">
                      ${escapeHtml(getLocalizedIntervalCustomScaleLabel(sid))}
                    </button>
                  `).join("")}
                </div>
              </div>
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("3. Umfang / Ausschnitt:", "3. Scale Range:")}</span>
                <div class="notation-key-quick-row">
                  ${scopeIds.map(sc => `
                    <button type="button" class="k-filter-pill${curScope === sc && !hasManualPool ? " active" : ""}" data-int-custom-scope="${sc}">
                      ${escapeHtml(getLocalizedIntervalCustomScopeLabel(sc))}
                    </button>
                  `).join("")}
                </div>
              </div>
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("4. Aktive Intervalle (antippen zum An-/Abwählen, mind. 2):", "4. Active Intervals (tap to toggle, min. 2):")}</span>
                <div class="notation-key-quick-row">
                  ${allIntervals.map(intKey => {
                    const def = getLocalizedIntervalDef(intKey);
                    const isOn = activePool.includes(intKey);
                    return `
                      <button type="button" class="k-filter-pill${isOn ? " active" : ""}" data-int-custom-toggle="${intKey}" aria-pressed="${isOn}">
                        ${escapeHtml(def.short)}
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>
            </div>

            <div class="subpage-nodes-grid" style="margin-top: 0.7rem;">
              <button class="subpage-node-btn" data-launch-int="interval-melodic" data-int-lvl="10">
                ${renderDirectionNodeCircle(tr("Frei", "Free"), "up")}
                <span class="node-title">${tr("Aufwärts (Eigene Auswahl)", "Ascending (Custom)")}</span>
                <span class="node-sub">${escapeHtml(summaryBadge)} • ${activePool.length} ${tr("Intervalle", "Intervals")}</span>
              </button>
              <button class="subpage-node-btn" data-launch-int="interval-melodic-down" data-int-lvl="10">
                ${renderDirectionNodeCircle(tr("Frei", "Free"), "down")}
                <span class="node-title">${tr("Abwärts (Eigene Auswahl)", "Descending (Custom)")}</span>
                <span class="node-sub">${escapeHtml(summaryBadge)} • ${activePool.length} ${tr("Intervalle", "Intervals")}</span>
              </button>
              <button class="subpage-node-btn" data-launch-int="interval-harmonic" data-int-lvl="10">
                <div class="node-circle circle-lilac node-circle-compact">${tr("Frei", "Free")}</div>
                <span class="node-title">${tr("Harmonisch (Eigene Auswahl)", "Harmonic (Custom)")}</span>
                <span class="node-sub">${escapeHtml(summaryBadge)} • ${activePool.length} ${tr("Intervalle", "Intervals")}</span>
              </button>
              <button class="subpage-node-btn" data-launch-int="interval-drone" data-int-lvl="10">
                <div class="node-circle circle-sage node-circle-compact">${tr("Frei", "Free")}</div>
                <span class="node-title">${tr("Grundton-Fläche (Eigene Auswahl)", "Root Pad (Custom)")}</span>
                <span class="node-sub">${escapeHtml(summaryBadge)} • ${activePool.length} ${tr("Intervalle", "Intervals")}</span>
              </button>
            </div>
          </div>
        `;

        container.querySelectorAll("[data-int-custom-root]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.intervalCustomRoot = btn.dataset.intCustomRoot;
            renderCustomIntervalSubpage();
          });
        });

        container.querySelectorAll("[data-int-custom-scale]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.intervalCustomScale = btn.dataset.intCustomScale;
            state.settings.intervalCustomPool = null;
            renderCustomIntervalSubpage();
          });
        });

        container.querySelectorAll("[data-int-custom-scope]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.intervalCustomScope = btn.dataset.intCustomScope;
            state.settings.intervalCustomPool = null;
            renderCustomIntervalSubpage();
          });
        });

        container.querySelectorAll("[data-int-custom-toggle]").forEach(btn => {
          btn.addEventListener("click", () => {
            const key = btn.dataset.intCustomToggle;
            const cur = getActiveIntervalCustomPool();
            let next;
            if (cur.includes(key)) {
              if (cur.length <= 2) return;
              next = cur.filter(k => k !== key);
            } else {
              next = Object.keys(HARMONIC_DATA.intervals).filter(k => cur.includes(k) || k === key);
            }
            state.settings.intervalCustomPool = next;
            renderCustomIntervalSubpage();
          });
        });

        container.querySelectorAll("[data-launch-int]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.setMode(btn.dataset.launchInt);
            state.setIntervalDifficulty(btn.dataset.intLvl);
            state.exerciseReturnView = "category";
            switchView("exercise");
          });
        });
      };
      renderCustomIntervalSubpage();
    } else {
      const sec = INTERVAL_PLAY_SECTIONS.find(s => s.mode === selectedIntItem.id);
      state.activeCategorySectionTitle = sec.title;
      const groups = getSectionCardGroups(sec);
      const renderIntCards = (cards) => cards.map(card => `
        <button class="subpage-node-btn" data-launch-int="${sec.mode}" data-int-lvl="${card.lvl}">
          ${card.circleHtml}
          <span class="node-title">${card.title}</span>
          <span class="node-sub">${card.sub}</span>
        </button>
      `).join("");

      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${tr("Dur-Intervalle", "Major Intervals")}</h3>
          <p class="subpage-section-desc">${sec.desc}</p>
          <div class="subpage-nodes-grid">${renderIntCards(groups.major)}</div>
        </div>
        <div class="subpage-section">
          <h3 class="subpage-section-title">${tr("Moll-Intervalle", "Minor Intervals")}</h3>
          <p class="subpage-section-desc">${tr("Derselbe Aufbau in Natürlich Moll (mit kl. Terz, kl. Sexte & kl. Septime)", "The same progression in Natural Minor (with min 3rd, min 6th & min 7th)")}</p>
          <div class="subpage-nodes-grid">${renderIntCards(groups.minor)}</div>
        </div>
        <div class="subpage-section">
          <h3 class="subpage-section-title">${tr("Chromatisch (Alle 15 Intervalle)", "Chromatic (All 15 Intervals)")}</h3>
          <p class="subpage-section-desc">${tr("Volles Spektrum inkl. kl. Sekunde, Tritonus, kl./gr. Intervalle & Nonen", "Full spectrum incl. min 2nd, tritone, minor/major intervals & ninths")}</p>
          <div class="subpage-nodes-grid">${renderIntCards(groups.chromatic)}</div>
        </div>
      `;

      container.querySelectorAll("[data-launch-int]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setMode(btn.dataset.launchInt);
          state.setIntervalDifficulty(btn.dataset.intLvl);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    }

  } else if (categoryKey === "chords") {
    const CHORD_QUALITY_SECTIONS = [
      {
        mode: "chord-arp-up",
        circleClass: "circle-sage",
        badgeHtml: renderDirectionNodeCircle("Δ", "up", "circle-sage"),
        isBeginner: true,
        title: tr("Akkord-Arpeggio (Aufwärts ↗)", "Chord Arpeggio (Ascending ↗)"),
        desc: tr("Akkordtöne erklingen nacheinander von unten nach oben – ideal zum Heraushören einzelner Terzen &amp; Septimen", "Chord tones roll upward note by note — ideal for hearing every 3rd, 5th &amp; 7th clearly")
      },
      {
        mode: "chord-arp-down",
        circleClass: "circle-lilac",
        badgeHtml: renderDirectionNodeCircle("Δ", "down", "circle-lilac"),
        isBeginner: true,
        title: tr("Akkord-Arpeggio (Abwärts ↘)", "Chord Arpeggio (Descending ↘)"),
        desc: tr("Akkordtöne erklingen nacheinander von oben nach unten", "Chord tones cascade downward from top to bottom")
      },
      {
        mode: "interval-chords",
        circleClass: "circle-peach",
        badgeHtml: `<div class="node-circle circle-peach node-circle-compact node-circle-nowrap">Δ/7</div>`,
        isBeginner: true,
        title: tr("Akkorde (Gleichzeitig)", "Chords (Simultaneous)"),
        desc: tr("Drei bis fünf Töne gleichzeitig als Vollklang – von einfachen Dreiklängen bis zu Jazz-Akkorden", "Three to five notes sounded together as one chord — from simple triads to jazz voicings")
      }
    ];
    const CHORD_QUALITY_LEVELS = [
      { lvl: 1, badge: "Δ",   title: tr("Stufe 1: Dreiklänge", "Level 1: Triads"),                            sub: tr("Dur, Moll, Vermindert &amp; Übermäßig", "Major, Minor, Diminished &amp; Augmented") },
      { lvl: 2, badge: "7",   title: tr("Stufe 2: Sept &amp; Sus", "Level 2: 7ths &amp; Sus"),                 sub: "+ sus4, Dom. 7, maj7 &amp; m7" },
      { lvl: 3, badge: "7♭5", title: tr("Stufe 3: Erweitert", "Level 3: Extended"),                            sub: tr("+ sus2, Halb- &amp; Vollverm., m(maj7)", "+ sus2, Half- &amp; Full-Dim, m(maj7)") },
      { lvl: 4, badge: "7♯9", title: tr("Stufe 4: Jazz &amp; Optionstöne", "Level 4: Jazz &amp; Tensions"),   sub: "+ maj9, 7♭9 &amp; 7♯9" }
    ];

    const CHORD_TYPE_ITEMS = [
      ...CHORD_QUALITY_SECTIONS.map(sec => ({
        id: sec.mode,
        title: sec.title,
        desc: sec.desc,
        badgeHtml: sec.badgeHtml,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: sec.isBeginner
      })),
      {
        id: "chord-inversions",
        title: tr("Akkordumkehrungen", "Chord Inversions"),
        desc: tr("Erkenne, welcher Akkordton ganz unten im Bass liegt (Grundstellung, 1., 2. oder 3. Umkehrung)", "Identify which chord tone sits lowest in the bass (Root Position, 1st, 2nd or 3rd Inversion)"),
        badgeHtml: `<div class="node-circle circle-sage node-circle-compact node-circle-nowrap">1/3/5</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 3 }),
        isBeginner: false
      },
      {
        id: "midi-chord",
        title: typeof getMidiPlayModeTitle === "function" ? getMidiPlayModeTitle("midi-chord") : tr("Akkorde greifen", "Play Chords"),
        desc: tr(
          "Greife den angezeigten Akkord (inkl. Umkehrungen & Vierklängen) auf deinem MIDI-Keyboard – ohne Gerät auf der Bildschirm-Klaviatur.",
          "Play the shown chord (including inversions & 7th chords) on your MIDI keyboard — or on the on-screen keyboard without a device."
        ),
        badgeHtml: `<div class="node-circle circle-lilac"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M7.5 5v8.5M12 5v8.5M16.5 5v8.5"/><rect x="6" y="5" width="3" height="7" rx="0.6" fill="currentColor"/><rect x="10.5" y="5" width="3" height="7" rx="0.6" fill="currentColor"/><rect x="15" y="5" width="3" height="7" rx="0.6" fill="currentColor"/></svg></div>`,
        meta: tr("4 Stufen • MIDI oder Bildschirm", "4 Levels • MIDI or screen"),
        isBeginner: false
      }
    ];

    const selectedChordType = activeSection ? CHORD_TYPE_ITEMS.find(t => t.id === activeSection) : null;
    if (!selectedChordType) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, CHORD_TYPE_ITEMS);
    } else if (selectedChordType.id === "midi-chord") {
      state.activeCategorySectionTitle = selectedChordType.title;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${escapeHtml(selectedChordType.title)}</h3>
          <p class="subpage-section-desc">${selectedChordType.desc}</p>
          <div class="subpage-nodes-grid">
            <button class="subpage-node-btn" data-launch-chord="midi-chord" data-chord-lvl="1">
              <div class="node-circle circle-lilac">Δ/m</div>
              <span class="node-title">${tr("Stufe 1: Dur &amp; Moll", "Level 1: Major &amp; Minor")}</span>
              <span class="node-sub">${tr("Dur- &amp; Moll-Dreiklänge in leichten Tonarten", "Major &amp; minor triads in easy keys")}</span>
            </button>
            <button class="subpage-node-btn" data-launch-chord="midi-chord" data-chord-lvl="2">
              <div class="node-circle circle-lilac">°/+</div>
              <span class="node-title">${tr("Stufe 2: Alle Dreiklänge", "Level 2: All Triads")}</span>
              <span class="node-sub">${tr("Dur, Moll, Vermindert &amp; Übermäßig in allen 12 Tonarten", "Major, minor, diminished &amp; augmented in all 12 keys")}</span>
            </button>
            <button class="subpage-node-btn" data-launch-chord="midi-chord" data-chord-lvl="3">
              <div class="node-circle circle-lilac node-circle-compact node-circle-nowrap">1/3/5</div>
              <span class="node-title">${tr("Stufe 3: Umkehrungen", "Level 3: Inversions")}</span>
              <span class="node-sub">${tr("Grundstellung, 1. &amp; 2. Umkehrung – Basston wird geprüft!", "Root pos., 1st &amp; 2nd inversion — bass note is checked!")}</span>
            </button>
            <button class="subpage-node-btn" data-launch-chord="midi-chord" data-chord-lvl="4">
              <div class="node-circle circle-lilac">7</div>
              <span class="node-title">${tr("Stufe 4: Vierklänge (Sept)", "Level 4: 7th Chords")}</span>
              <span class="node-sub">maj7, 7, m7 &amp; ø7</span>
            </button>
          </div>
        </div>
      `;
    } else if (selectedChordType.id === "chord-inversions") {
      state.activeCategorySectionTitle = selectedChordType.title;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${tr("Akkordumkehrungen", "Chord Inversions")}</h3>
          <p class="subpage-section-desc">${tr("Erkenne, welcher Akkordton ganz unten im Bass liegt (Grundstellung, 1., 2. oder 3. Umkehrung)", "Identify which chord tone sits lowest in the bass (Root Position, 1st, 2nd or 3rd Inversion)")}</p>
          <div class="subpage-nodes-grid">
            <button class="subpage-node-btn" data-launch-chord="chord-inversions" data-chord-lvl="1">
              <div class="node-circle circle-sage">1/3/5</div>
              <span class="node-title">${tr("Stufe 1: Dur-Dreiklang", "Level 1: Major Triad")}</span>
              <span class="node-sub">${tr("Grundstellung, 1. &amp; 2. Umkehrung", "Root Pos., 1st &amp; 2nd Inversion")}</span>
            </button>
            <button class="subpage-node-btn" data-launch-chord="chord-inversions" data-chord-lvl="2">
              <div class="node-circle circle-sage">${tr("D/m", "M/m")}</div>
              <span class="node-title">${tr("Stufe 2: Dur &amp; Moll", "Level 2: Major &amp; Minor")}</span>
              <span class="node-sub">${tr("Beide Dreiklangsfarben gemischt", "Major &amp; minor triads mixed")}</span>
            </button>
            <button class="subpage-node-btn" data-launch-chord="chord-inversions" data-chord-lvl="3">
              <div class="node-circle circle-sage">1–7</div>
              <span class="node-title">${tr("Stufe 3: Septakkorde (4)", "Level 3: 7th Chords (4)")}</span>
              <span class="node-sub">${tr("Vierstimmig inkl. 3. Umkehrung (Bass: 7)", "Four-note chords incl. 3rd Inv. (Bass: 7)")}</span>
            </button>
          </div>
        </div>
      `;
    } else {
      const sec = CHORD_QUALITY_SECTIONS.find(s => s.mode === selectedChordType.id);
      state.activeCategorySectionTitle = sec.title;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${sec.title}</h3>
          <p class="subpage-section-desc">${sec.desc}</p>
          <div class="subpage-nodes-grid">
            ${CHORD_QUALITY_LEVELS.map(lv => `
              <button class="subpage-node-btn" data-launch-chord="${sec.mode}" data-chord-lvl="${lv.lvl}">
                <div class="node-circle ${sec.circleClass}">${lv.badge}</div>
                <span class="node-title">${lv.title}</span>
                <span class="node-sub">${lv.sub}</span>
              </button>
            `).join("")}
          </div>
        </div>
      `;
    }

    if (selectedChordType) {
      container.querySelectorAll("[data-launch-chord]").forEach(btn => {
        btn.addEventListener("click", () => {
          const mode = btn.dataset.launchChord;
          state.setMode(mode);
          if (mode === "chord-inversions") {
            state.setChordInversionDifficulty(btn.dataset.chordLvl);
          } else if (mode === "midi-chord") {
            state.setMidiPlayLevel("midi-chord", btn.dataset.chordLvl);
          } else {
            state.setChordDifficulty(btn.dataset.chordLvl);
          }
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    }

  } else if (categoryKey === "melody") {
    const MELODY_TYPE_ITEMS = [
      {
        id: "steady",
        title: tr("Gleichmäßig (Basis)", "Steady (Basics)"),
        desc: tr("4 gleichlange halbe Noten – voller Fokus auf Tonhöhen & Solfège-Stufen", "4 steady half notes — full focus on pitch & Solfège degrees"),
        badgeHtml: `<div class="node-circle circle-sage node-circle-compact">${tr("Basis", "Basic")}</div>`,
        meta: tr("3 Tonräume • Do–Fa, Sol–Do & Ganze Tonart", "3 Ranges • Do–Fa, Sol–Do & Full Key"),
        isBeginner: true
      },
      {
        id: "rhythmic",
        title: tr("Rhythmische Melodie", "Rhythmic Melody"),
        desc: tr("4–6 Töne in echten Phrasen (4/4 & 3/4) – der Rhythmus ist sichtbar vorgegeben", "4–6 notes in musical phrases (4/4 & 3/4) — rhythm is shown as a guide"),
        badgeHtml: `<div class="node-circle circle-peach">4–6</div>`,
        meta: tr("3 Tonräume • Do–Fa, Sol–Do & Ganze Tonart", "3 Ranges • Do–Fa, Sol–Do & Full Key"),
        isBeginner: true
      },
      {
        id: "dictation",
        title: tr("Kombi-Diktat", "Full Dictation"),
        desc: tr("Tonhöhe UND Notenlänge (♪, ♩, ♩., 𝅗𝅥) gemeinsam nach Gehör heraushören", "Identify both pitch AND note duration (♪, ♩, ♩., 𝅗𝅥) together by ear")
          .replace("(♪, ♩, ♩., 𝅗𝅥)", '<span class="nowrap-group">(♪, ♩, ♩., 𝅗𝅥)</span>'),
        badgeHtml: `<div class="node-circle circle-lilac node-circle-icon">${getCategoryBadgeSVG("melody-dict")}</div>`,
        meta: tr("3 Tonräume • Do–Fa, Sol–Do & Ganze Tonart", "3 Ranges • Do–Fa, Sol–Do & Full Key"),
        isBeginner: false
      }
    ];

    const getMelodyRangeDesc = (range, style) => {
      if (style === "steady") {
        if (range === "do-fa") return tr("4 halbe Noten aus Do, Re, Mi und Fa – ideal für den Einstieg", "4 half notes from Do, Re, Mi, and Fa — ideal for getting started");
        if (range === "sol-do") return tr("4 halbe Noten im oberen Spannungsraum (Sol, La, Ti, Do)", "4 half notes in the upper tetrachord (Sol, La, Ti, Do)");
        return tr("4 halbe Noten über alle sieben Solfège-Stufen (Do bis Do)", "4 half notes across all seven Solfège degrees (Do to Do)");
      }
      if (style === "dictation") {
        if (range === "do-fa") return tr("4–5 Töne (Do–Fa): Erkenne Tonstufe UND Notenlänge (♪, ♩, ♩., 𝅗𝅥)", "4–5 notes (Do–Fa): identify pitch AND note duration (♪, ♩, ♩., 𝅗𝅥)")
          .replace("(♪, ♩, ♩., 𝅗𝅥)", '<span class="nowrap-group">(♪, ♩, ♩., 𝅗𝅥)</span>');
        if (range === "sol-do") return tr("4–6 Töne (Sol–Do): Rhythmus und Tonhöhe gemeinsam im Puls erfassen", "4–6 notes (Sol–Do): capture rhythm and pitch together in pulse");
        return tr("4–6 Töne über die ganze Tonart – vollständiges Melodiediktat", "4–6 notes across the full scale — complete melody dictation");
      }
      if (range === "do-fa") return tr("Musikalische 4–5-Ton-Phrasen aus Do, Re, Mi und Fa (4/4 & 3/4)", "Musical 4–5 note phrases from Do, Re, Mi, and Fa (4/4 & 3/4)");
      if (range === "sol-do") return tr("Rhythmische 4–6-Ton-Phrasen im oberen Raum (Sol, La, Ti, Do)", "Rhythmic 4–6 note phrases in the upper tetrachord (Sol, La, Ti, Do)");
      return tr("Ausdrucksstarke 4–6-Ton-Melodien über alle Stufen (Do bis Do)", "Expressive 4–6 note melodies across all scale degrees (Do to Do)");
    };

    const MELODY_SECTIONS = [
      { range: "do-fa",  title: tr("Stufe 1: Do – Fa", "Level 1: Do – Fa") },
      { range: "sol-do", title: tr("Stufe 2: Sol – Do", "Level 2: Sol – Do") },
      { range: "full",   title: tr("Stufe 3: Ganze Tonart", "Level 3: Full Key") }
    ];

    const MELODY_VARIANTS = [
      { keyMode: "fixed",  octave: "single", circle: "circle-sage",  badge: "C • 1", title: tr("C-Dur (1 Oktave)", "C Major (1 Octave)"),              sub: tr("Feste Tonart C-Dur, 1 Oktave", "Fixed key C Major, 1 octave") },
      { keyMode: "random", octave: "single", circle: "circle-sage",  badge: "? • 1", title: tr("Zufallstonarten (1 Oktave)", "Random Keys (1 Octave)"),  sub: tr("Wechselnde Tonarten, 1 Oktave", "Changing keys, 1 octave") },
      { keyMode: "fixed",  octave: "multi",  circle: "circle-peach", badge: "C • ∞", title: tr("C-Dur (Mehrere Oktaven)", "C Major (Multi-Octave)"),     sub: tr("Feste Tonart C-Dur, Oktavsprünge", "Fixed key C Major, octave leaps") },
      { keyMode: "random", octave: "multi",  circle: "circle-lilac", badge: "? • ∞", title: tr("Zufallstonarten (Mehrere Okt.)", "Random Keys (Multi-Octave)"), sub: tr("Wechselnde Tonarten & Oktaven", "Changing keys & octaves") }
    ];

    const selectedMelType = activeSection ? MELODY_TYPE_ITEMS.find(t => t.id === activeSection) : null;
    if (!selectedMelType) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, MELODY_TYPE_ITEMS);
    } else {
      state.settings.melodyStyle = selectedMelType.id;
      state.activeCategorySectionTitle = selectedMelType.title;
      container.innerHTML = MELODY_SECTIONS.map(sec => `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${sec.title}</h3>
          <p class="subpage-section-desc">${getMelodyRangeDesc(sec.range, selectedMelType.id)}</p>
          <div class="subpage-nodes-grid">
            ${MELODY_VARIANTS.map(v => `
              <button class="subpage-node-btn"
                data-launch-melody="${sec.range}"
                data-melody-key="${v.keyMode}"
                data-melody-octave="${v.octave}">
                <div class="node-circle ${v.circle}">${v.badge}</div>
                <span class="node-title">${v.title}</span>
                <span class="node-sub">${v.sub}</span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("");

      container.querySelectorAll("[data-launch-melody]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setMode("melody");
          state.setMelodyConfig(
            btn.dataset.launchMelody,
            btn.dataset.melodyKey,
            btn.dataset.melodyOctave,
            selectedMelType.id
          );
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    }

  } else if (categoryKey === "solfege") {
    const SOLFEGE_TYPE_ITEMS = [
      {
        id: "major",
        title: tr("Solfège • Dur", "Solfège • Major"),
        desc: tr("Höre die Dur-Kadenz (I–vi–IV–V) und erkenne die gespielte Tonstufe auf der Klaviatur", "Hear the major cadence (I–vi–IV–V) and identify the target scale degree on the keyboard"),
        badgeHtml: `<div class="node-circle circle-sage">${tr("Dur", "Maj")}</div>`,
        meta: tr("8 Stufen • Do–Fa, Sol–Do bis Tonartwechsel", "8 Levels • Do–Fa, Sol–Do to Key Changes"),
        isBeginner: true
      },
      {
        id: "minor",
        title: tr("Solfège • Moll", "Solfège • Minor"),
        desc: tr("Höre die Moll-Kadenz (i–VI–iv–V) und erkenne die gespielte Tonstufe in Natürlich Moll", "Hear the minor cadence (i–VI–iv–V) and identify the target degree in Natural Minor"),
        badgeHtml: `<div class="node-circle circle-lilac">${tr("Moll", "Min")}</div>`,
        meta: tr("8 Stufen • Do–Fa, Sol–Do bis Tonartwechsel", "8 Levels • Do–Fa, Sol–Do to Key Changes"),
        isBeginner: true
      },
      {
        id: "custom",
        title: tr("Eigene Tonart (Dur & Moll)", "Custom Key (Major & Minor)"),
        titleHtml: formatStackedParenTitle(tr("Eigene Tonart (Dur & Moll)", "Custom Key (Major & Minor)")),
        desc: tr("Wähle beliebige Dur- oder Moll-Tonart, Tonraum & Oktavlage frei – auch direkt in der Übung jederzeit anpassbar", "Choose any major or minor key, scale half & octave register freely — also adjustable anytime inside the exercise"),
        badgeHtml: `<div class="node-circle circle-peach node-circle-compact">${tr("Frei", "Free")}</div>`,
        meta: tr("Frei wählbar • Dur & Moll", "Custom • Major & Minor"),
        isBeginner: false
      },
      {
        id: "sing-degree",
        title: getSingMatchModeTitle("sing-degree"),
        desc: tr(
          "Eine Kadenz stellt die Tonart ein, dann singst du die angezeigte Stufe – Lauscher hört über das Mikrofon zu.",
          "A cadence sets the key, then you sing the degree shown — Lauscher listens through the microphone."
        ),
        badgeHtml: `<div class="node-circle circle-sage">${SING_MATCH_NODE_MIC_SVG}</div>`,
        meta: tr("5 Stufen • mit Mikrofon", "5 Levels • with microphone"),
        isBeginner: false
      }
    ];

    const bindSolfegeLaunchButtons = (root) => {
      root.querySelectorAll("[data-launch-solfege]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setMode("solfege");
          state.setSolfegeDifficulty(btn.dataset.launchSolfege);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    };

    const selectedSolfType = activeSection ? SOLFEGE_TYPE_ITEMS.find(t => t.id === activeSection) : null;
    if (!selectedSolfType) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, SOLFEGE_TYPE_ITEMS);
    } else if (selectedSolfType.id === "sing-degree") {
      state.activeCategorySectionTitle = selectedSolfType.title;
      const singDegreeCards = [
        { lvl: 1, circle: "circle-sage", badge: "Do Mi Sol", title: tr("Stufe 1: Dreiklang", "Level 1: Triad") },
        { lvl: 2, circle: "circle-sage", badge: "Do–Fa", title: tr("Stufe 2: Untere Hälfte", "Level 2: Lower Half") },
        { lvl: 3, circle: "circle-sage", badge: "Sol–Do", title: tr("Stufe 3: Obere Hälfte", "Level 3: Upper Half") },
        { lvl: 4, circle: "circle-peach", badge: tr("Dur", "Maj"), title: tr("Stufe 4: Dur-Tonleiter", "Level 4: Major Scale") },
        { lvl: 5, circle: "circle-lilac", badge: tr("Moll", "Min"), title: tr("Stufe 5: Moll-Tonleiter", "Level 5: Minor Scale") }
      ];
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${escapeHtml(selectedSolfType.title)}</h3>
          <p class="subpage-section-desc">${selectedSolfType.desc}</p>
          <div class="subpage-nodes-grid">
            ${singDegreeCards.map(card => `
              <button class="subpage-node-btn" data-launch-sing-degree="${card.lvl}">
                <div class="node-circle ${card.circle} node-circle-compact">${escapeHtml(card.badge)}</div>
                <span class="node-title">${card.title}</span>
                <span class="node-sub">${escapeHtml(getSingDegreeLevelLabel(card.lvl))}</span>
              </button>
            `).join("")}
          </div>
        </div>
      `;
      container.querySelectorAll("[data-launch-sing-degree]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setMode("sing-degree");
          state.setSingMatchLevel("sing-degree", btn.dataset.launchSingDegree);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    } else if (selectedSolfType.id === "major") {
      state.activeCategorySectionTitle = selectedSolfType.title;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title subpage-section-title-tones">
            <span class="subpage-section-title-main">${tr("Solfège • Dur", "Solfège • Major")}</span>
            <span class="subpage-section-tones" dir="ltr">Do · Re · Mi · Fa · Sol · La · Ti</span>
          </h3>
          <p class="subpage-section-desc">${tr("Höre die Dur-Kadenz (I–vi–IV–V) und erkenne die gespielte Tonstufe auf der Klaviatur", "Hear the major cadence (I–vi–IV–V) and identify the target scale degree on the keyboard")}</p>
          <div class="subpage-nodes-grid">
            <button class="subpage-node-btn" data-launch-solfege="1">
              <div class="node-circle circle-sage node-circle-compact">Do–Fa</div>
              <span class="node-title">${tr("Stufe 1: Do–Fa (C-Dur)", "Level 1: Do–Fa (C Major)")}</span>
              <span class="node-sub">${tr("Untere Hälfte (4 Töne), feste Tonart C-Dur", "Lower half (4 notes), fixed key C Major")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="2">
              <div class="node-circle circle-sage node-circle-compact">Sol–Do</div>
              <span class="node-title">${tr("Stufe 2: Sol–Do (C-Dur)", "Level 2: Sol–Do (C Major)")}</span>
              <span class="node-sub">${tr("Obere Hälfte (4 Töne), feste Tonart C-Dur", "Upper half (4 notes), fixed key C Major")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="3">
              <div class="node-circle circle-sage">C • 1</div>
              <span class="node-title">${tr("Stufe 3: C-Dur (1 Oktave)", "Level 3: C Major (1 Octave)")}</span>
              <span class="node-sub">${tr("Ganze Tonleiter, mittlere Höhe, feste Tonart C-Dur", "Full scale, middle register, fixed key C Major")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="4">
              <div class="node-circle circle-sage">? • 1</div>
              <span class="node-title">${tr("Stufe 4: Zufällige Tonart (1 Okt.)", "Level 4: Random Key (1 Oct.)")}</span>
              <span class="node-sub">${tr("Nicht C-Dur, fest für diese Sitzung", "Non-C key, fixed for this session")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="5">
              <div class="node-circle circle-peach">C • ∞</div>
              <span class="node-title">${tr("Stufe 5: C-Dur (Mehrere Oktaven)", "Level 5: C Major (Multi-Octave)")}</span>
              <span class="node-sub">${tr("Feste Tonart C-Dur, wechselnde Oktaven", "Fixed key C Major, shifting octaves")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="6">
              <div class="node-circle circle-peach">? • ∞</div>
              <span class="node-title">${tr("Stufe 6: Zufällige Tonart (Mehrere Okt.)", "Level 6: Random Key (Multi-Oct.)")}</span>
              <span class="node-sub">${tr("Nicht C-Dur (fest), wechselnde Oktaven", "Non-C key (fixed), shifting octaves")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="7">
              <div class="node-circle circle-lilac">${REFRESH_ICON_SVG} • 1</div>
              <span class="node-title">${tr("Stufe 7: Tonartwechsel (1 Oktave)", "Level 7: Key Changes (1 Octave)")}</span>
              <span class="node-sub">${tr("Neue Tonart nach jeder Antwort, 1 Okt.", "New key after every answer, 1 oct.")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="8">
              <div class="node-circle circle-lilac">${REFRESH_ICON_SVG} • ∞</div>
              <span class="node-title">${tr("Stufe 8: Tonartwechsel (Mehrere Okt.)", "Level 8: Key Changes (Multi-Oct.)")}</span>
              <span class="node-sub">${tr("Neue Tonart & Oktave nach jeder Antwort", "New key & octave after every answer")}</span>
            </button>
          </div>
        </div>
      `;
      bindSolfegeLaunchButtons(container);
    } else if (selectedSolfType.id === "minor") {
      state.activeCategorySectionTitle = selectedSolfType.title;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title subpage-section-title-tones">
            <span class="subpage-section-title-main">${tr("Solfège • Moll", "Solfège • Minor")}</span>
            <span class="subpage-section-tones" dir="ltr">Do · Re · Me · Fa · Sol · Le · Te</span>
          </h3>
          <p class="subpage-section-desc">${tr("Höre die Moll-Kadenz (i–VI–iv–V) und erkenne die gespielte Tonstufe in Natürlich Moll", "Hear the minor cadence (i–VI–iv–V) and identify the target degree in Natural Minor")}</p>
          <div class="subpage-nodes-grid">
            <button class="subpage-node-btn" data-launch-solfege="9">
              <div class="node-circle circle-lilac node-circle-compact">Do–Fa</div>
              <span class="node-title">${tr("Moll 1: Do–Fa (c-Moll)", "Minor 1: Do–Fa (C Minor)")}</span>
              <span class="node-sub">${tr("Untere Hälfte (Do, Re, Me, Fa), feste Tonart c-Moll", "Lower half (Do, Re, Me, Fa), fixed key C Minor")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="10">
              <div class="node-circle circle-lilac node-circle-compact">Sol–Do</div>
              <span class="node-title">${tr("Moll 2: Sol–Do (c-Moll)", "Minor 2: Sol–Do (C Minor)")}</span>
              <span class="node-sub">${tr("Obere Hälfte (Sol, Le, Te, Do), feste Tonart c-Moll", "Upper half (Sol, Le, Te, Do), fixed key C Minor")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="11">
              <div class="node-circle circle-lilac">c • 1</div>
              <span class="node-title">${tr("Moll 3: c-Moll (1 Oktave)", "Minor 3: C Minor (1 Octave)")}</span>
              <span class="node-sub">${tr("Ganze Moll-Tonleiter, mittlere Höhe, feste Tonart c-Moll", "Full minor scale, middle register, fixed key C Minor")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="12">
              <div class="node-circle circle-lilac">? • 1</div>
              <span class="node-title">${tr("Moll 4: Zufällige Tonart (1 Okt.)", "Minor 4: Random Key (1 Oct.)")}</span>
              <span class="node-sub">${tr("Nicht c-Moll, fest für diese Sitzung", "Non-C minor key, fixed for this session")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="13">
              <div class="node-circle circle-peach">c • ∞</div>
              <span class="node-title">${tr("Moll 5: c-Moll (Mehrere Oktaven)", "Minor 5: C Minor (Multi-Octave)")}</span>
              <span class="node-sub">${tr("Feste Tonart c-Moll, wechselnde Oktaven", "Fixed key C Minor, shifting octaves")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="14">
              <div class="node-circle circle-peach">? • ∞</div>
              <span class="node-title">${tr("Moll 6: Zufällige Tonart (Mehrere Okt.)", "Minor 6: Random Key (Multi-Oct.)")}</span>
              <span class="node-sub">${tr("Nicht c-Moll (fest), wechselnde Oktaven", "Non-C minor key (fixed), shifting octaves")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="15">
              <div class="node-circle circle-sage">${REFRESH_ICON_SVG} • 1</div>
              <span class="node-title">${tr("Moll 7: Tonartwechsel (1 Oktave)", "Minor 7: Key Changes (1 Octave)")}</span>
              <span class="node-sub">${tr("Neue Moll-Tonart nach jeder Antwort, 1 Okt.", "New minor key after every answer, 1 oct.")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="16">
              <div class="node-circle circle-sage">${REFRESH_ICON_SVG} • ∞</div>
              <span class="node-title">${tr("Moll 8: Tonartwechsel (Mehrere Okt.)", "Minor 8: Key Changes (Multi-Oct.)")}</span>
              <span class="node-sub">${tr("Neue Moll-Tonart & Oktave nach jeder Antwort", "New minor key & octave after every answer")}</span>
            </button>
          </div>
        </div>
      `;
      bindSolfegeLaunchButtons(container);
    } else {
      state.activeCategorySectionTitle = selectedSolfType.title;
      const renderSolfegeCustomSection = () => {
        const curTonality = state.settings.solfegeCustomTonality === "minor" ? "minor" : "major";
        const curKey = String(state.settings.solfegeCustomKey || "C");
        const curRange = ["do-fa", "sol-do", "full"].includes(state.settings.solfegeCustomRange)
          ? state.settings.solfegeCustomRange
          : "full";
        const curOct = state.settings.solfegeCustomOctave === "multi" ? "multi" : "single";
        const keyOrder = ["random", "C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"];
        const rangeDefs = [
          { id: "do-fa",  label: tr("Do–Fa (Untere Hälfte)", "Do–Fa (Lower Half)") },
          { id: "sol-do", label: tr("Sol–Do (Obere Hälfte)", "Sol–Do (Upper Half)") },
          { id: "full",   label: tr("Ganze Tonart (Do–Do)", "Full Scale (Do–Do)") }
        ];
        const summaryKey = curKey === "random"
          ? `${tr("Zufall", "Random")} (${curTonality === "minor" ? tr("Moll", "Minor") : tr("Dur", "Major")})`
          : getKeyDisplayName(curKey, curTonality);
        const summaryRange = curRange === "do-fa" ? "Do–Fa" : (curRange === "sol-do" ? "Sol–Do" : "Do–Do");
        const summaryOct = curOct === "multi" ? tr("Mehrere Okt.", "Multi-Oct.") : tr("1 Oktave", "1 Octave");
        const customToneStrip = curTonality === "minor"
          ? (curRange === "do-fa" ? "Do · Re · Me · Fa" : (curRange === "sol-do" ? "Sol · Le · Te · Do" : "Do · Re · Me · Fa · Sol · Le · Te"))
          : (curRange === "do-fa" ? "Do · Re · Mi · Fa" : (curRange === "sol-do" ? "Sol · La · Ti · Do" : "Do · Re · Mi · Fa · Sol · La · Ti"));

        container.innerHTML = `
          <div class="subpage-section">
            <h3 class="subpage-section-title subpage-section-title-tones">
              <span class="subpage-section-title-main">${tr("Eigene Tonart (Dur & Moll)", "Custom Key (Major & Minor)")}</span>
              <span class="subpage-section-tones" dir="ltr">${customToneStrip}</span>
            </h3>
            <p class="subpage-section-desc">${tr("Wähle beliebige Dur- oder Moll-Tonart, Tonraum & Oktavlage frei – auch direkt in der Übung jederzeit anpassbar", "Choose any major or minor key, scale half & octave register freely — also adjustable anytime inside the exercise")}</p>
            <div class="notation-key-toolbar">
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("1. Tongeschlecht:", "1. Tonality:")}</span>
                <div class="notation-key-quick-row">
                  <button type="button" class="k-filter-pill${curTonality === "major" ? " active" : ""}" data-solf-custom-tonality="major">${tr("Dur", "Major")}</button>
                  <button type="button" class="k-filter-pill${curTonality === "minor" ? " active" : ""}" data-solf-custom-tonality="minor">${tr("Moll", "Minor")}</button>
                </div>
              </div>
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("2. Tonart:", "2. Key:")}</span>
                <div class="notation-key-quick-row">
                  ${keyOrder.map(k => {
                    const lbl = k === "random" ? tr("Zufall", "Random") : getKeyDisplayName(k, curTonality);
                    return `<button type="button" class="k-filter-pill${k === curKey ? " active" : ""}" data-solf-custom-key="${k}">${escapeHtml(lbl)}</button>`;
                  }).join("")}
                </div>
              </div>
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("3. Tonraum:", "3. Scale Range:")}</span>
                <div class="notation-key-quick-row">
                  ${rangeDefs.map(r => `
                    <button type="button" class="k-filter-pill${r.id === curRange ? " active" : ""}" data-solf-custom-range="${r.id}">${escapeHtml(r.label)}</button>
                  `).join("")}
                </div>
              </div>
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("4. Oktavlage:", "4. Octave Register:")}</span>
                <div class="notation-key-quick-row">
                  <button type="button" class="k-filter-pill${curOct === "single" ? " active" : ""}" data-solf-custom-oct="single">${tr("1 Oktave", "1 Octave")}</button>
                  <button type="button" class="k-filter-pill${curOct === "multi" ? " active" : ""}" data-solf-custom-oct="multi">${tr("Mehrere Oktaven", "Multi-Octave")}</button>
                </div>
              </div>
            </div>
            <div class="subpage-nodes-grid" style="margin-top: 0.7rem;">
              <button class="subpage-node-btn" data-launch-solfege="17">
                <div class="node-circle circle-peach node-circle-compact">${tr("Frei", "Free")}</div>
                <span class="node-title">${tr("Solfège mit eigener Tonart starten", "Start Custom Key Solfège")}</span>
                <span class="node-sub">${escapeHtml(`${summaryKey} • ${summaryRange} • ${summaryOct}`)}</span>
              </button>
            </div>
          </div>
        `;

        container.querySelectorAll("[data-solf-custom-tonality]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.solfegeCustomTonality = btn.dataset.solfCustomTonality === "minor" ? "minor" : "major";
            renderSolfegeCustomSection();
          });
        });
        container.querySelectorAll("[data-solf-custom-key]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.solfegeCustomKey = btn.dataset.solfCustomKey;
            renderSolfegeCustomSection();
          });
        });
        container.querySelectorAll("[data-solf-custom-range]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.solfegeCustomRange = btn.dataset.solfCustomRange;
            renderSolfegeCustomSection();
          });
        });
        container.querySelectorAll("[data-solf-custom-oct]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.solfegeCustomOctave = btn.dataset.solfCustomOct === "multi" ? "multi" : "single";
            renderSolfegeCustomSection();
          });
        });
        bindSolfegeLaunchButtons(container);
      };
      renderSolfegeCustomSection();
    }

  } else if (categoryKey === "rhythm") {
    const RHYTHM_SECTIONS = [
      {
        id: "rhythm-meter",
        title: tr("Taktart &amp; Metrum erkennen", "Time Signature &amp; Meter"),
        plainTitle: tr("Taktart & Metrum erkennen", "Time Signature & Meter"),
        desc: tr("Höre zwei Takte Percussion und erkenne den Grundschlag sowie die Takt-Betonung", "Hear two bars of percussion and identify the pulse and barline accent"),
        badgeHtml: `<div class="node-circle circle-peach node-circle-icon">${getRhythmNodeIconSVG("meter-34-44")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 3 }),
        isBeginner: true,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-meter" data-rhythm-lvl="1">
            <div class="node-circle circle-peach node-circle-icon">${getRhythmNodeIconSVG("meter-34-44")}</div>
            <span class="node-title">${tr("Stufe 1: Basis", "Level 1: Basics")}</span>
            <span class="node-sub">${tr("4/4-Takt vs. 3/4-Walzer", "4/4 Common Time vs. 3/4 Waltz")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-meter" data-rhythm-lvl="2">
            <div class="node-circle circle-peach node-circle-icon">${getRhythmNodeIconSVG("meter-68")}</div>
            <span class="node-title">${tr("Stufe 2: Unterteilung", "Level 2: Subdivisions")}</span>
            <span class="node-sub">${tr("2/4, 3/4, 4/4 &amp; 6/8-Wiegetakt", "2/4, 3/4, 4/4 &amp; compound 6/8")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-meter" data-rhythm-lvl="3">
            <div class="node-circle circle-peach node-circle-icon">${getRhythmNodeIconSVG("meter-54-78")}</div>
            <span class="node-title">${tr("Stufe 3: Ungerade Takte", "Level 3: Odd Meters")}</span>
            <span class="node-sub">${tr("Inklusive 5/4 (3+2) &amp; 7/8", "Including 5/4 (3+2) &amp; 7/8")}</span>
          </button>
        `
      },
      {
        id: "rhythm-dictation",
        title: tr("Rhythmus-Diktat (4 Zählzeiten)", "Rhythm Dictation (4 Beats)"),
        plainTitle: tr("Rhythmus-Diktat (4 Zählzeiten)", "Rhythm Dictation (4 Beats)"),
        desc: tr("Wie bei den Melodien: Alle 4 Fragezeichen nach Gehör Baustein für Baustein lösen", "Just like melodies: solve all 4 question marks beat by beat by ear"),
        badgeHtml: `<div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("quarter-eighths")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: true,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-dictation" data-rhythm-lvl="1">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("quarter-eighths")}</div>
            <span class="node-title">${tr("Stufe 1: Puls &amp; Pausen", "Level 1: Pulse &amp; Rests")}</span>
            <span class="node-sub">${tr("Viertel, Achtelpaar &amp; Pause", "Quarters, eighth-note pairs &amp; rests")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-dictation" data-rhythm-lvl="2">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("triplet")}</div>
            <span class="node-title">${tr("Stufe 2: Offbeat &amp; Triolen", "Level 2: Offbeats &amp; Triplets")}</span>
            <span class="node-sub">${tr("+ „und“-Offbeat &amp; Achteltriole", "+ “and” offbeats &amp; eighth triplets")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-dictation" data-rhythm-lvl="3">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("sixteenths")}</div>
            <span class="node-title">${tr("Stufe 3: Sechzehntel", "Level 3: Sixteenth Notes")}</span>
            <span class="node-sub">${tr("Vierer-, Achtel- &amp; 16tel-Kombis", "Four-16ths, 8th &amp; 16th combinations")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-dictation" data-rhythm-lvl="4">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("syncopation")}</div>
            <span class="node-title">${tr("Stufe 4: Punkt. &amp; Synkopen", "Level 4: Dotted &amp; Syncopation")}</span>
            <span class="node-sub">${tr("Punktierte Achtel &amp; 16tel-Synkopen", "Dotted eighths &amp; 16th syncopations")}</span>
          </button>
        `
      },
      {
        id: "rhythm-tap",
        title: tr("Rhythmus nachklopfen (Tap-Pad)", "Rhythm Tap-Back (Tap Pad)"),
        plainTitle: tr("Rhythmus nachklopfen (Tap-Pad)", "Rhythm Tap-Back (Tap Pad)"),
        desc: tr("1 Takt Vorzähler, 1 Takt Vorgabe – dann klopfst du den Rhythmus direkt auf dem Pad nach", "1 bar count-in, 1 bar prompt — then tap the rhythm back directly on the pad"),
        badgeHtml: `<div class="node-circle circle-lilac node-circle-icon">${getRhythmNodeIconSVG("tap")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: true,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-lvl="1">
            <div class="node-circle circle-lilac node-circle-icon">${getRhythmNodeIconSVG("tap")}</div>
            <span class="node-title">${tr("Stufe 1: Puls-Anker", "Level 1: Pulse Anchor")}</span>
            <span class="node-sub">${tr("Viertel &amp; Pausen im 4/4-Takt", "Quarter notes &amp; rests in 4/4 time")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-lvl="2">
            <div class="node-circle circle-lilac node-circle-icon">${getRhythmNodeIconSVG("meter-eighths")}</div>
            <span class="node-title">${tr("Stufe 2: Achtel &amp; 3/4", "Level 2: Eighths &amp; 3/4")}</span>
            <span class="node-sub">${tr("Achtelpaare im 4/4 &amp; 3/4-Walzer", "Eighth pairs in 4/4 &amp; 3/4 waltz")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-lvl="3">
            <div class="node-circle circle-lilac node-circle-icon">${getRhythmNodeIconSVG("triplet")}</div>
            <span class="node-title">${tr("Stufe 3: Synkopen &amp; Triolen", "Level 3: Syncopation &amp; Triplets")}</span>
            <span class="node-sub">${tr("Präzises Timing mit Offbeats &amp; Triolen", "Tight timing with offbeats &amp; triplets")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-lvl="4">
            <div class="node-circle circle-lilac node-circle-icon">${getRhythmNodeIconSVG("blind")}</div>
            <span class="node-title">${tr("Stufe 4: Blindflug", "Level 4: Blind Mode")}</span>
            <span class="node-sub">${tr("Klick verstummt während deiner Runde", "Metronome drops out during your turn")}</span>
          </button>
        `
      },
      {
        id: "rhythm-tap-read",
        title: tr("Rhythmus vom Blatt tappen", "Tap Rhythms from Notation"),
        plainTitle: tr("Rhythmus vom Blatt tappen", "Tap Rhythms from Notation"),
        desc: tr("Der Rhythmus steht im Notensystem – ohne Vorspielen. Nach 1 Takt Vorzähler tippst du ihn zum Metronom auf das Pad.", "The rhythm is written on the staff — no demo. After a 1-bar count-in, tap it on the pad along with the metronome."),
        badgeHtml: `<div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("quarter-rest")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-read="1" data-rhythm-lvl="1">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("quarter-rest")}</div>
            <span class="node-title">${tr("Stufe 1: Viertel &amp; Pausen", "Level 1: Quarters &amp; Rests")}</span>
            <span class="node-sub">${tr("Vom Blatt im 4/4-Takt", "Sight-read in 4/4 time")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-read="1" data-rhythm-lvl="2">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("meter-eighths")}</div>
            <span class="node-title">${tr("Stufe 2: Achtel &amp; 3/4", "Level 2: Eighths &amp; 3/4")}</span>
            <span class="node-sub">${tr("Achtelpaare im 4/4 &amp; 3/4", "Eighth pairs in 4/4 &amp; 3/4")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-read="1" data-rhythm-lvl="3">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("triplet")}</div>
            <span class="node-title">${tr("Stufe 3: Synkopen &amp; Triolen", "Level 3: Syncopation &amp; Triplets")}</span>
            <span class="node-sub">${tr("Offbeats &amp; Triolen lesen und tappen", "Read and tap offbeats &amp; triplets")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-read="1" data-rhythm-lvl="4">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("blind")}</div>
            <span class="node-title">${tr("Stufe 4: Ohne Metronom", "Level 4: No Metronome")}</span>
            <span class="node-sub">${tr("Nach dem Vorzähler hältst du das Tempo allein", "After the count-in you keep the tempo yourself")}</span>
          </button>
        `
      },
      {
        id: "rhythm-groove",
        title: tr("Groove, Akzente &amp; Mikro-Timing", "Groove, Accents &amp; Micro-Timing"),
        plainTitle: tr("Groove, Akzente & Mikro-Timing", "Groove, Accents & Micro-Timing"),
        desc: tr("Spüre Groove-Stile, Offbeat-Akzente und feinste Verschiebungen im Band-Kontext", "Feel groove styles, offbeat accents, and subtle timing shifts in a band context"),
        badgeHtml: `<div class="node-circle circle-peach node-circle-compact node-circle-nowrap">Groove</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-groove" data-rhythm-lvl="1">
            <div class="node-circle circle-peach node-circle-compact">Groove</div>
            <span class="node-title">${tr("Stufe 1: Groove-Stile", "Level 1: Groove Styles")}</span>
            <span class="node-sub">${tr("Marsch, Backbeat, Swing &amp; 3 gegen 2", "March, Backbeat, Swing &amp; 3-against-2")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-groove" data-rhythm-lvl="2">
            <div class="node-circle circle-peach">1 + 2</div>
            <span class="node-title">${tr("Stufe 2: Offbeat-Spürsinn", "Level 2: Offbeat Radar")}</span>
            <span class="node-sub">${tr("Exakten Cowbell-Akzent lokalisieren", "Pinpoint the exact cowbell accent")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-groove" data-rhythm-lvl="3">
            <div class="node-circle circle-peach node-circle-stack"><span>±55</span><span class="node-stack-sub">ms</span></div>
            <span class="node-title">${tr("Stufe 3: Mikro-Timing", "Level 3: Micro-Timing")}</span>
            <span class="node-sub">${tr("Zu früh, exakt („Pocket“) oder zu spät?", "Ahead, in the pocket, or laid back?")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-groove" data-rhythm-lvl="4">
            <div class="node-circle circle-peach node-circle-stack"><span>±28</span><span class="node-stack-sub">ms</span></div>
            <span class="node-title">${tr("Stufe 4: Profi-Timing", "Level 4: Pro Timing")}</span>
            <span class="node-sub">${tr("Feinste Abweichungen sicher heraushören", "Hear the tiniest timing shifts cleanly")}</span>
          </button>
        `
      }
    ].map(item => ({ ...item, titleHtml: formatStackedParenTitle(item.title) }));

    const selectedRhythm = activeSection ? RHYTHM_SECTIONS.find(s => s.id === activeSection) : null;
    if (!selectedRhythm) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, RHYTHM_SECTIONS);
    } else {
      state.activeCategorySectionTitle = selectedRhythm.plainTitle;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${selectedRhythm.titleHtml || selectedRhythm.title}</h3>
          <p class="subpage-section-desc">${selectedRhythm.desc}</p>
          <div class="subpage-nodes-grid">${selectedRhythm.cardsHtml}</div>
        </div>
      `;

      container.querySelectorAll("[data-launch-rhythm]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setRhythmLevel(btn.dataset.launchRhythm, btn.dataset.rhythmLvl, btn.dataset.rhythmRead === "1");
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    }

  } else if (categoryKey === "production") {
    const safetyBannerHtml = `
      <div class="prod-safety-banner">
        <strong>${tr("Gehörschutz &amp; Rosa Rauschen:", "Hearing Protection &amp; Pink Noise:")}</strong> ${tr("Alle Signale laufen über einen integrierten -14 dBFS Schutz-Limiter mit Lautheits-Ausgleich (insbesondere bei 2–4 kHz) und weichen Ein- und Ausblenden. Übe dennoch bei moderater Abhörlautstärke.", "All signals pass through a built-in -14 dBFS safety limiter with equal-loudness compensation (especially around 2–4 kHz) and smooth fades. Always practice at a comfortable listening level.")}
      </div>
    `;
    const PROD_SECTIONS = [
      {
        id: "prod-tone",
        title: tr("Frequenzen erkennen (Reinton / Sinus)", "Frequency Recognition (Sine Wave)"),
        plainTitle: tr("Frequenzen erkennen (Sinus)", "Frequency Recognition (Sine)"),
        desc: tr("Trainiere dein absolutes Frequenz-Gefühl vom Subbass (63 Hz) bis in die Air-Höhen (12 kHz)", "Train absolute frequency recall from sub-bass (63 Hz) up to the air band (12 kHz)"),
        badgeHtml: `<div class="node-circle circle-sage">Hz</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 3 }),
        isBeginner: true,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-prod="prod-tone" data-prod-lvl="1">
            <div class="node-circle circle-sage node-circle-compact">5× Hz</div>
            <span class="node-title">${tr("Stufe 1: Basis", "Level 1: Basics")}</span>
            <span class="node-sub">125 Hz, 250 Hz, 1k, 2k, 4k</span>
          </button>
          <button class="subpage-node-btn" data-launch-prod="prod-tone" data-prod-lvl="2">
            <div class="node-circle circle-sage node-circle-compact">${tr("8× Okt", "8× Oct")}</div>
            <span class="node-title">${tr("Stufe 2: Oktavbänder", "Level 2: Octave Bands")}</span>
            <span class="node-sub">${tr("63 Hz bis 8 kHz (Standard-EQ)", "63 Hz to 8 kHz (standard EQ)")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-prod="prod-tone" data-prod-lvl="3">
            <div class="node-circle circle-sage node-circle-compact">12× Hz</div>
            <span class="node-title">${tr("Stufe 3: Profi-Raster", "Level 3: Pro Grid")}</span>
            <span class="node-sub">${tr("12 Bänder inkl. 800 Hz, 1,6k &amp; 12k", "12 bands incl. 800 Hz, 1.6k &amp; 12k")}</span>
          </button>
        `
      },
      {
        id: "prod-eq-noise",
        title: tr("EQ-Boost im Pink Noise (Fortgeschritten)", "EQ Boost in Pink Noise (Advanced)"),
        plainTitle: tr("EQ-Boost im Pink Noise", "EQ Boost in Pink Noise"),
        desc: tr("Erst erklingt neutrales Pink Noise („Flat“), dann hebt ein Peaking-EQ genau eine Frequenz gezielt an", "First you hear neutral pink noise (“Flat”), then a peaking EQ boosts one targeted frequency"),
        badgeHtml: `<div class="node-circle circle-lilac">EQ</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 3 }),
        isBeginner: false,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-prod="prod-eq-noise" data-prod-lvl="1">
            <div class="node-circle circle-lilac node-circle-compact">+10 dB</div>
            <span class="node-title">${tr("Stufe 1: Breiter EQ", "Level 1: Wide EQ")}</span>
            <span class="node-sub">${tr("Q 1,6 • 6 zentrale Mix-Bänder", "Q 1.6 • 6 core mix bands")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-prod="prod-eq-noise" data-prod-lvl="2">
            <div class="node-circle circle-lilac node-circle-compact">${tr("+8,5 dB", "+8.5 dB")}</div>
            <span class="node-title">${tr("Stufe 2: Oktav-EQ", "Level 2: Octave EQ")}</span>
            <span class="node-sub">${tr("Q 2,6 • 8 Bänder (63 Hz – 8 kHz)", "Q 2.6 • 8 bands (63 Hz – 8 kHz)")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-prod="prod-eq-noise" data-prod-lvl="3">
            <div class="node-circle circle-lilac node-circle-compact">+7 dB</div>
            <span class="node-title">${tr("Stufe 3: Chirurgisch", "Level 3: Surgical")}</span>
            <span class="node-sub">${tr("Q 4,2 • 10 schmale Resonanzen", "Q 4.2 • 10 narrow resonances")}</span>
          </button>
        `
      }
    ];

    const selectedProd = activeSection ? PROD_SECTIONS.find(s => s.id === activeSection) : null;
    if (!selectedProd) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, PROD_SECTIONS, { introHtml: safetyBannerHtml });
    } else {
      state.activeCategorySectionTitle = selectedProd.plainTitle;
      container.innerHTML = `
        ${safetyBannerHtml}
        <div class="subpage-section">
          <h3 class="subpage-section-title">${selectedProd.title}</h3>
          <p class="subpage-section-desc">${selectedProd.desc}</p>
          <div class="subpage-nodes-grid">${selectedProd.cardsHtml}</div>
        </div>
      `;

      container.querySelectorAll("[data-launch-prod]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setProdLevel(btn.dataset.launchProd, btn.dataset.prodLvl);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    }

  } else if (categoryKey === "modes") {
    const MODES_SECTIONS = [
      {
        id: "modes-scale",
        title: tr("1. Modus / Tonleiter erkennen", "1. Mode / Scale Recognition"),
        plainTitle: tr("Modus / Tonleiter erkennen", "Mode / Scale Recognition"),
        desc: tr("Erst hörst du die neutrale Anker-Quinte (ohne Terz), dann die 8-tönige Tonleiter aufwärts", "First you hear a neutral open-fifth anchor (no 3rd), then the 8-note ascending scale"),
        badgeHtml: `<div class="node-circle circle-peach node-circle-compact node-circle-nowrap">7× C</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 3 }),
        isBeginner: true,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-modes="modes-scale" data-modes-lvl="1">
            <div class="node-circle circle-peach">4× C</div>
            <span class="node-title">${tr("Stufe 1: Basis-Modi", "Level 1: Core Modes")}</span>
            <span class="node-sub">${tr("Ionisch, Äolisch, Dorisch &amp; Mixolydisch", "Ionian, Aeolian, Dorian &amp; Mixolydian")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-scale" data-modes-lvl="2">
            <div class="node-circle circle-peach">7× C</div>
            <span class="node-title">${tr("Stufe 2: Kirchentonarten", "Level 2: All 7 Modes")}</span>
            <span class="node-sub">${tr("Alle 7 Modi (+ Lydisch, Phrygisch, Lokrisch)", "All 7 modes (+ Lydian, Phrygian, Locrian)")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-scale" data-modes-lvl="3">
            <div class="node-circle circle-peach node-circle-stack"><span>7×</span><span class="node-stack-sub">Transp.</span></div>
            <span class="node-title">${tr("Stufe 3: Transponiert", "Level 3: Transposed")}</span>
            <span class="node-sub">${tr("Alle 7 Modi über wechselnde Grundtöne", "All 7 modes across changing roots")}</span>
          </button>
        `
      },
      {
        id: "modes-char",
        title: tr("2. Charakterton &amp; Klangfarbe", "2. Characteristic Note &amp; Color"),
        plainTitle: tr("Charakterton & Klangfarbe", "Characteristic Note & Color"),
        desc: tr("Erkenne den Modus direkt an seiner charakteristischen Reibung (#4, b7, ♮6, b2, b5 oder #7)", "Recognize each mode immediately by its color tone (#4, b7, ♮6, b2, b5, or #7)"),
        badgeHtml: `<div class="node-circle circle-sage node-circle-compact node-circle-nowrap">#4/b7</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 3 }),
        isBeginner: false,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-modes="modes-char" data-modes-lvl="1">
            <div class="node-circle circle-sage node-circle-compact node-circle-nowrap">#4/b7</div>
            <span class="node-title">${tr("Stufe 1: Dur-Modi", "Level 1: Major Modes")}</span>
            <span class="node-sub">${tr("Ionisch vs. Lydisch vs. Mixolydisch", "Ionian vs. Lydian vs. Mixolydian")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-char" data-modes-lvl="2">
            <div class="node-circle circle-sage node-circle-compact node-circle-nowrap">♮6/b2</div>
            <span class="node-title">${tr("Stufe 2: Moll-Modi", "Level 2: Minor Modes")}</span>
            <span class="node-sub">${tr("Äolisch, Dorisch, Phrygisch &amp; Lokrisch", "Aeolian, Dorian, Phrygian &amp; Locrian")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-char" data-modes-lvl="3">
            <div class="node-circle circle-sage node-circle-compact node-circle-nowrap">+Harm</div>
            <span class="node-title">${tr("Stufe 3: Gesamt-Spektrum", "Level 3: Full Spectrum")}</span>
            <span class="node-sub">${tr("Alle 7 Modi + Harmonisch Moll", "All 7 modes + Harmonic Minor")}</span>
          </button>
        `
      },
      {
        id: "modes-cadence",
        title: tr("3. Modale Kadenzen &amp; Akkordpendel", "3. Modal Cadences &amp; Chord Loops"),
        plainTitle: tr("Modale Kadenzen & Akkordpendel", "Modal Cadences & Chord Loops"),
        desc: tr("Akkordpendel: Zwei Akkorde wechseln sich immer wieder ab und machen so die Farbe eines Modus hörbar (z. B. i–IV, I–bVII, I–II oder i–bII).", "Chord loops: two chords alternate again and again, revealing the color of a mode (e.g. i–IV, I–bVII, I–II or i–bII)."),
        badgeHtml: `<div class="node-circle circle-lilac node-circle-stack"><span>6×</span><span class="node-stack-sub">${tr("Pendel", "Loop")}</span></div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 2 }),
        isBeginner: false,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-modes="modes-cadence" data-modes-lvl="1">
            <div class="node-circle circle-lilac node-circle-stack"><span>4×</span><span class="node-stack-sub">${tr("Pendel", "Loop")}</span></div>
            <span class="node-title">${tr("Stufe 1: Standard-Akkordpendel", "Level 1: Standard Chord Loops")}</span>
            <span class="node-sub">${tr("Ionisch, Dorisch, Mixolydisch &amp; Äolisch", "Ionian, Dorian, Mixolydian &amp; Aeolian")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-cadence" data-modes-lvl="2">
            <div class="node-circle circle-lilac node-circle-stack"><span>6×</span><span class="node-stack-sub">${tr("Pendel", "Loop")}</span></div>
            <span class="node-title">${tr("Stufe 2: Alle 6 modalen Akkordpendel", "Level 2: All 6 Modal Chord Loops")}</span>
            <span class="node-sub">${tr("Inkl. Lydisch (I–II) &amp; Phrygisch (i–bII)", "Incl. Lydian (I–II) &amp; Phrygian (i–bII)")}</span>
          </button>
        `
      },
      {
        id: "midi-scale",
        title: tr("4. Tonleitern &amp; Modi spielen", "4. Play Scales &amp; Modes"),
        plainTitle: typeof getMidiPlayModeTitle === "function" ? getMidiPlayModeTitle("midi-scale") : tr("Tonleitern & Modi spielen", "Play Scales & Modes"),
        desc: tr(
          "Spiele die angezeigte Tonleiter oder Kirchentonart Schritt für Schritt aufwärts – auf deinem MIDI-Keyboard oder der Bildschirm-Klaviatur.",
          "Play the shown scale or church mode step by step upward — on your MIDI keyboard or the on-screen keyboard."
        ),
        badgeHtml: `<div class="node-circle circle-lilac"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M7.5 5v8.5M12 5v8.5M16.5 5v8.5"/><rect x="6" y="5" width="3" height="7" rx="0.6" fill="currentColor"/><rect x="10.5" y="5" width="3" height="7" rx="0.6" fill="currentColor"/><rect x="15" y="5" width="3" height="7" rx="0.6" fill="currentColor"/></svg></div>`,
        meta: tr("3 Stufen • MIDI oder Bildschirm", "3 Levels • MIDI or screen"),
        isBeginner: false,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-modes="midi-scale" data-modes-lvl="1">
            <div class="node-circle circle-lilac">D/m</div>
            <span class="node-title">${tr("Stufe 1: Dur &amp; Moll", "Level 1: Major &amp; Minor")}</span>
            <span class="node-sub">${tr("Ionisch &amp; Äolisch über leichte Grundtöne", "Ionian &amp; Aeolian on easy roots")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="midi-scale" data-modes-lvl="2">
            <div class="node-circle circle-lilac">7×</div>
            <span class="node-title">${tr("Stufe 2: 7 Kirchentonarten", "Level 2: All 7 Modes")}</span>
            <span class="node-sub">${tr("Ionisch, Dorisch, Phrygisch, Lydisch, Mixolydisch, Äolisch, Lokrisch", "Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="midi-scale" data-modes-lvl="3">
            <div class="node-circle circle-lilac">+5</div>
            <span class="node-title">${tr("Stufe 3: Erweitert &amp; alle 12 Tonarten", "Level 3: Extended &amp; All 12 Keys")}</span>
            <span class="node-sub">${tr("+ Harmonisch/Melodisch Moll &amp; Pentatonik", "+ Harmonic/Melodic Minor &amp; Pentatonic")}</span>
          </button>
        `
      }
    ];

    const selectedModes = activeSection ? MODES_SECTIONS.find(s => s.id === activeSection) : null;
    if (!selectedModes) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, MODES_SECTIONS);
    } else {
      state.activeCategorySectionTitle = selectedModes.plainTitle;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${selectedModes.title}</h3>
          <p class="subpage-section-desc">${selectedModes.desc}</p>
          <div class="subpage-nodes-grid">${selectedModes.cardsHtml}</div>
        </div>
      `;

      container.querySelectorAll("[data-launch-modes]").forEach(btn => {
        btn.addEventListener("click", () => {
          const mode = btn.dataset.launchModes;
          if (mode === "midi-scale") {
            state.setMode("midi-scale");
            state.setMidiPlayLevel("midi-scale", btn.dataset.modesLvl);
          } else {
            state.setModesLevel(mode, btn.dataset.modesLvl);
          }
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    }

  } else if (categoryKey === "notation") {
    const NOTATION_SECTIONS = [
      {
        mode: "notation-treble",
        circleClass: "circle-peach",
        title: tr("Violinschlüssel (G-Schlüssel)", "Treble Clef (G Clef)"),
        desc: tr(
          "Der G-Schlüssel markiert g' (G4) auf der 2. Linie von unten – die Basis für Klavier (rechte Hand), Gesang, Violine, Flöte &amp; Gitarre.",
          "Marks G4 on the 2nd line from the bottom — essential for piano right hand, vocals, violin, flute &amp; guitar."
        )
      },
      {
        mode: "notation-bass",
        circleClass: "circle-sage",
        title: tr("Bassschlüssel (F-Schlüssel)", "Bass Clef (F Clef)"),
        desc: tr(
          "Der F-Schlüssel markiert f (F3) auf der 4. Linie zwischen den beiden Punkten – Standard für Bass, Cello, Posaune &amp; Klavier (linke Hand).",
          "Marks F3 on the 4th line between its two dots — standard for bass, cello, trombone &amp; piano left hand."
        )
      },
      {
        mode: "notation-alto",
        circleClass: "circle-lilac",
        title: tr("Altschlüssel (C-Schlüssel)", "Alto Clef (C Clef)"),
        desc: tr(
          "Der C-Schlüssel legt das mittlere c' (C4) exakt auf die 3. (mittlere) Notenlinie – Pflichtschlüssel für Bratsche &amp; Partiturlesen.",
          "Places middle C4 right on the 3rd (center) line — standard clef for viola and full-score reading."
        )
      },
      {
        mode: "notation-mixed",
        circleClass: "circle-peach",
        title: tr("Alle Schlüssel gemischt", "Mixed Clefs"),
        desc: tr(
          "Wechselt in der Notenzeile flexibel zwischen Violin-, Bass- und Altschlüssel – ideal für flüssiges Blattlesen und Partituren.",
          "Alternates across Treble, Bass &amp; Alto clefs — great practice for agile sight-reading across systems."
        )
      },
      {
        mode: "notation-grand",
        circleClass: "circle-sage",
        title: tr("Doppelsystem (Violin- &amp; Bassschlüssel)", "Grand Staff (Treble &amp; Bass)"),
        desc: tr(
          "Klaviersystem mit beiden Schlüsseln gleichzeitig: von Einzelnoten über zweihändige Zweiklänge bis zu Akkorden auf beide Hände verteilt.",
          "Piano grand staff with both clefs at once: from single notes to two-hand dyads and chords split across both hands."
        ),
        levels: [
          { lvl: 1, badge: "1",     title: tr("Stufe 1: Einzelnoten (Stammtöne)", "Level 1: Single Notes (Naturals)"), sub: tr("Violin- & Bassschlüssel abwechselnd im 5-Linien-System", "Treble & bass clefs alternating on the 5 staff lines") },
          { lvl: 2, badge: "♯/♭",   nodeClass: "node-circle-compact node-circle-nowrap", title: tr("Stufe 2: Einzelnoten erweitert", "Level 2: Extended Single Notes"), sub: tr("Beide Schlüssel mit ±2 Hilfslinien & Versetzungszeichen", "Both clefs with ±2 ledger lines & accidentals") },
          { lvl: 3, badge: "1+1",   nodeClass: "node-circle-compact node-circle-nowrap", title: tr("Stufe 3: Zweihändige Zweiklänge", "Level 3: Two-Hand Dyads"), sub: tr("Je 1 Note links (Bass) und rechts (Violin) gleichzeitig", "1 note in bass (LH) and 1 in treble (RH) together") },
          { lvl: 4, badge: "♫",     title: tr("Stufe 4: Akkorde im Doppelsystem", "Level 4: Grand Staff Chords"), sub: tr("3–4 Töne: Basston links + Dreiklang/Voicing über beide Hände", "3–4 notes: bass note left + triad/voicing across both hands") },
          { lvl: 5, badge: "★",     title: tr("Stufe 5: Meisterstufe Blattspiel", "Level 5: Sight-Reading Master"), sub: tr("Gemischte Zweiklänge, Dreiklänge & Septakkorde in beiden Systemen", "Mixed dyads, triads & 7th voicings across both staves") }
        ]
      },
      {
        mode: "notation-chords",
        circleClass: "circle-lilac",
        title: tr("Akkorde lesen", "Chord Reading"),
        desc: tr(
          "Mehrere Noten übereinander: Lies Grundton und Akkordaufbau im Notensystem und wähle das passende Akkordsymbol (z. B. E, Em, E7, Esus4).",
          "Stacked notes: read root and chord structure on the staff and pick the matching chord symbol (e.g. E, Em, E7, Esus4)."
        ),
        levels: [
          { lvl: 1, badge: "E/Em",   nodeClass: "node-circle-compact node-circle-nowrap", title: tr("Stufe 1: Dreiklänge (Violin)", "Level 1: Triads (Treble)"), sub: tr("Dur, Moll, Vermindert, Übermäßig & Sus", "Major, minor, dim, aug & sus (root pos.)") },
          { lvl: 2, badge: `<span>Em</span><span class="node-stack-sub">${tr("Bass", "Bass")}</span>`, nodeClass: "node-circle-stack", title: tr("Stufe 2: Dreiklänge (Bass)", "Level 2: Triads (Bass)"),     sub: tr("Alle Grundtypen im Bassschlüssel", "Basic chord types in bass clef") },
          { lvl: 3, badge: "6/64",   nodeClass: "node-circle-compact node-circle-nowrap", title: tr("Stufe 3: Umkehrungen", "Level 3: Inversions"),             sub: tr("Dreiklänge & Sus in allen Lagen, beide Schlüssel", "Triads & sus in all inversions, both clefs") },
          { lvl: 4, badge: "E7",     title: tr("Stufe 4: Alle Typen & Septakkorde", "Level 4: All Types & 7th Chords"), sub: tr("E, Em, E7, Emaj7, Esus4 u. v. m. inkl. Umkehrungen", "E, Em, E7, Emaj7, Esus4 & more + inversions") }
        ]
      },
      {
        mode: "notation-symbols",
        circleClass: "circle-lilac",
        title: tr("Symbole & Spielanweisungen", "Symbols & Markings"),
        desc: tr(
          "Mehr als nur Notenköpfe: Trainiere Dynamik, Tempo, Artikulation, Verzierungen, Spielweisen sowie Ablauf- & Sprungzeichen (Segno, Coda, Voltenklammern).",
          "More than noteheads: master dynamics, tempo, articulation, ornaments, performance terms and score roadmaps (Segno, Coda, volta brackets)."
        ),
        levels: [
          { lvl: 1, badge: "mf",     nodeClass: "node-circle-compact node-circle-nowrap", title: tr("Stufe 1: Dynamik & Lautstärke", "Level 1: Dynamics & Volume"), sub: tr("ppp bis fff, Crescendo/Decrescendo, sfz, fp & subito p", "ppp to fff, crescendo/decrescendo, sfz, fp & subito p") },
          { lvl: 2, badge: "rit.",   nodeClass: "node-circle-compact node-circle-nowrap", title: tr("Stufe 2: Tempo, Agogik & Ausdruck", "Level 2: Tempo, Agogics & Character"), sub: tr("Largo bis Presto, rit./accel., Fermate, dolce & maestoso", "Largo to Presto, rit./accel., fermata, dolce & maestoso") },
          { lvl: 3, badge: "tr",     nodeClass: "node-circle-compact node-circle-nowrap", title: tr("Stufe 3: Artikulation & Spielweisen", "Level 3: Articulation & Playing Styles"), sub: tr("Staccato, Legato, Haltebogen, Triller, 8va, Pedal & pizz.", "Staccato, legato, ties, trills, 8va, pedal & pizz.") },
          { lvl: 4, badge: "D.S.",   nodeClass: "node-circle-compact node-circle-nowrap", title: tr("Stufe 4: Ablauf, Form & Coda", "Level 4: Form, Repeats & Coda"), sub: tr("Wiederholung, 1./2. Klammer, D.C., Segno, Coda & Spielreihenfolge", "Repeats, 1st/2nd endings, D.C., Segno, Coda & play order") },
          { lvl: 5, badge: "★",      title: tr("Stufe 5: Alle Bereiche gemischt", "Level 5: All Areas Mixed"), sub: tr("Kompletter Profi-Mix aus Begriffen, Symbolen & Ablauf-Partituren", "Full pro mix of terms, symbols & score roadmap puzzles") }
        ]
      }
    ];

    const KEY_POOL_CHIPS = [
      { id: "none",   label: tr("Ohne (C-Dur)", "None (C Major)") },
      { id: "easy",   label: tr("Leicht (1–2 ♯/♭)", "Easy (1–2 ♯/♭)") },
      { id: "medium", label: tr("Mittel (3–4 ♯/♭)", "Medium (3–4 ♯/♭)") },
      { id: "hard",   label: tr("Schwer (5–6 ♯/♭)", "Hard (5–6 ♯/♭)") },
      { id: "all",    label: tr("Alle (1–6 ♯/♭)", "All (1–6 ♯/♭)") }
    ];

    const TRAINER_CLEFS = [
      { mode: "notation-treble", label: tr("Violinschlüssel", "Treble") },
      { mode: "notation-bass",   label: tr("Bassschlüssel", "Bass") },
      { mode: "notation-alto",   label: tr("Altschlüssel", "Alto") },
      { mode: "notation-mixed",  label: tr("Schlüssel-Mix", "Mixed") },
      { mode: "notation-grand",  label: tr("Doppelsystem", "Grand Staff") }
    ];

    const TRAINER_RANGES = [
      { lvl: 1, label: tr("5 Linien", "5 Lines") },
      { lvl: 2, label: tr("±2 Hilfslinien", "±2 Ledgers") },
      { lvl: 3, label: tr("±3 Hilfslinien", "±3 Ledgers") }
    ];

    const NOTATION_TYPE_ITEMS = [
      {
        id: "notation-treble",
        title: tr("Violinschlüssel (G-Schlüssel)", "Treble Clef (G Clef)"),
        desc: tr(
          "Der G-Schlüssel markiert g' (G4) auf der 2. Linie von unten – die Basis für Klavier (rechte Hand), Gesang, Violine, Flöte &amp; Gitarre.",
          "Marks G4 on the 2nd line from the bottom — essential for piano right hand, vocals, violin, flute &amp; guitar."
        ),
        badgeHtml: `<div class="node-circle circle-peach node-circle-icon">${getCategoryBadgeSVG("treble")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: true
      },
      {
        id: "notation-bass",
        title: tr("Bassschlüssel (F-Schlüssel)", "Bass Clef (F Clef)"),
        desc: tr(
          "Der F-Schlüssel markiert f (F3) auf der 4. Linie zwischen den beiden Punkten – Standard für Bass, Cello, Posaune &amp; Klavier (linke Hand).",
          "Marks F3 on the 4th line between its two dots — standard for bass, cello, trombone &amp; piano left hand."
        ),
        badgeHtml: `<div class="node-circle circle-sage node-circle-icon">${getCategoryBadgeSVG("bass")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false
      },
      {
        id: "notation-alto",
        title: tr("Altschlüssel (C-Schlüssel)", "Alto Clef (C Clef)"),
        desc: tr(
          "Der C-Schlüssel legt das mittlere c' (C4) exakt auf die 3. (mittlere) Notenlinie – Pflichtschlüssel für Bratsche &amp; Partiturlesen.",
          "Places middle C4 right on the 3rd (center) line — standard clef for viola and full-score reading."
        ),
        badgeHtml: `<div class="node-circle circle-lilac node-circle-icon">${getCategoryBadgeSVG("alto")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false
      },
      {
        id: "notation-mixed",
        title: tr("Alle Schlüssel gemischt", "Mixed Clefs"),
        desc: tr(
          "Wechselt in der Notenzeile flexibel zwischen Violin-, Bass- und Altschlüssel – ideal für flüssiges Blattlesen und Partituren.",
          "Alternates across Treble, Bass &amp; Alto clefs — great practice for agile sight-reading across systems."
        ),
        badgeHtml: `<div class="node-circle circle-peach node-circle-icon">${getCategoryBadgeSVG("mixed")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false
      },
      {
        id: "notation-grand",
        title: tr("Doppelsystem (Violin- &amp; Bassschlüssel)", "Grand Staff (Treble &amp; Bass)"),
        desc: tr(
          "Klaviersystem mit beiden Schlüsseln gleichzeitig: von Einzelnoten über zweihändige Zweiklänge bis zu Akkorden auf beide Hände verteilt.",
          "Piano grand staff with both clefs at once: from single notes to two-hand dyads and chords split across both hands."
        ),
        badgeHtml: `<div class="node-circle circle-sage node-circle-icon">${getCategoryBadgeSVG("grand")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 5 }),
        isBeginner: false
      },
      {
        id: "notation-chords",
        title: tr("Akkorde lesen", "Chord Reading"),
        desc: tr(
          "Mehrere Noten übereinander: Lies Grundton und Akkordaufbau im Notensystem und wähle das passende Akkordsymbol (z. B. E, Em, E7, Esus4).",
          "Stacked notes: read root and chord structure on the staff and pick the matching chord symbol (e.g. E, Em, E7, Esus4)."
        ),
        badgeHtml: `<div class="node-circle circle-lilac node-circle-compact node-circle-nowrap">E/Em</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false
      },
      {
        id: "notation-keys",
        title: tr("Tonarten-Blattspiel (Generalvorzeichen)", "Key-Signature Sight-Reading"),
        desc: tr(
          "Lies ganze 8-Noten-Phrasen mit vorgegebener Tonart im Notensystem und beachte die Vorzeichen vom Blatt!",
          "Read 8-note phrases with an active key signature on the staff and remember the sharps &amp; flats while playing!"
        ),
        badgeHtml: `<div class="node-circle circle-peach node-circle-icon">${getCategoryBadgeSVG("keysig")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false
      },
      {
        id: "notation-symbols",
        title: tr("Symbole & Spielanweisungen", "Symbols & Markings"),
        desc: tr(
          "Dynamik (pp–ff, sfz), Tempo & Ausdruck, Artikulation & Verzierungen sowie Ablauf- und Sprungzeichen (Wiederholung, Volten, Segno, Coda).",
          "Dynamics (pp–ff, sfz), tempo &amp; character, articulation &amp; ornaments, plus repeats, voltas, Segno &amp; Coda."
        ),
        badgeHtml: `<div class="node-circle circle-lilac node-circle-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 10.5C6.5 4.8 17.5 4.8 19 10.5"/><circle cx="12" cy="9.2" r="1.35" fill="currentColor" stroke="none"/><text x="12" y="20.5" text-anchor="middle" font-family="Andika, Georgia, serif" font-size="11.5" font-weight="700" font-style="italic" fill="currentColor" stroke="none">mf</text></svg></div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 5 }),
        isBeginner: true
      }
    ].map(item => ({ ...item, titleHtml: formatStackedParenTitle(item.title) }));

    const selectedNotType = activeSection ? NOTATION_TYPE_ITEMS.find(t => t.id === activeSection) : null;
    let notationKeyDrawerOpen = false;

    const renderNotationCategoryBody = () => {
      if (!selectedNotType) {
        state.activeCategorySection = null;
        renderCategoryTypeMenu(container, categoryKey, NOTATION_TYPE_ITEMS);
        return;
      }
      state.activeCategorySectionTitle = selectedNotType.title.replace(/&amp;/g, "&");
      const selectedKeyMode = normalizeNotationKeyMode(state.settings.notationKeyMode);
      const hasSelectedKey = selectedKeyMode !== "none";
      const trainerClefMode = isNotationMode(state.settings.notationKeyTrainerClef)
        ? state.settings.notationKeyTrainerClef
        : "notation-treble";
      const trainerRangeLvl = Math.max(1, Math.min(3, parseInt(state.settings.notationKeyTrainerLevel, 10) || 2));
      const effectiveClefForPreview = selectedNotType.id === "notation-keys" ? trainerClefMode : selectedNotType.id;
      const previewClefId = (effectiveClefForPreview === "notation-mixed" || effectiveClefForPreview === "notation-grand" || effectiveClefForPreview === "notation-chords")
        ? "treble"
        : getNotationClefFromMode(effectiveClefForPreview);

      const previewKeySigId = isNotationKeyPoolMode(selectedKeyMode)
        ? (selectedKeyMode === "easy" ? "D" : selectedKeyMode === "medium" ? "Eb" : selectedKeyMode === "hard" ? "B" : "A")
        : selectedKeyMode;
      // Breite passend zur Zahl der Vorzeichen, damit kein leerer Linienrest übrig bleibt
      const previewSigCount = getNotationKeySignatureSteps(previewClefId, normalizeNotationKeySigId(previewKeySigId)).length;
      const previewSvg = buildNotationStaffSVG([], {
        clefId: previewClefId,
        keySignatureId: previewKeySigId,
        width: Math.max(140, 118 + previewSigCount * 10),
        compact: true
      });
      // Bei Tonart-Gruppen: Schwierigkeitsgrad in der ersten Zeile, das Beispiel immer in einer eigenen Zeile darunter
      const previewExample = isNotationKeyPoolMode(selectedKeyMode)
        ? tf("Beispiel: {ex}", "Example: {ex}", {
            ex: `${getLocalizedNotationKeySigName(previewKeySigId)} (${getLocalizedNotationKeySigBadge(previewKeySigId, true)})`
          })
        : "";
      const previewTitle = isNotationKeyPoolMode(selectedKeyMode)
        ? getLocalizedNotationKeyModeLabel(selectedKeyMode, false)
        : (selectedKeyMode === "none"
            ? tr("Keine Generalvorzeichen (C-Dur)", "No key signature (C Major)")
            : `${getLocalizedNotationKeySigName(selectedKeyMode)} • ${getLocalizedNotationKeySigBadge(selectedKeyMode, true)}`);
      const previewDesc = selectedKeyMode === "none"
        ? tr(
            "Alle Noten gelten zunächst als Stammtöne (bei Stufe 4 mit ♯/♭ direkt vor einzelnen Noten).",
            "All notes read as naturals unless Level 4 places an accidental right before the note."
          )
        : tr(
            "Das Generalvorzeichen gilt für das ganze System: Achte bei betroffenen Stammlinien &amp; Räumen automatisch auf die schwarzen Tasten!",
            "This key signature applies across the whole staff: play sharps/flats automatically on altered letters!"
          );

      const renderSigChip = (sigId) => {
        const badge = getLocalizedNotationKeySigBadge(sigId, false);
        const shortName = getLocalizedNotationKeySigName(sigId, true).replace(/-Dur$| Major$| majeur$| мажор$/i, "");
        const activeCls = selectedKeyMode === sigId ? " active" : "";
        return `
          <button type="button" class="notation-key-sig-btn${activeCls}" data-notation-keymode="${sigId}">
            <span class="notation-key-sig-name">${escapeHtml(shortName)}</span>
            <span class="notation-key-sig-badge">${escapeHtml(badge)}</span>
          </button>
        `;
      };

      const NOTATION_DIFFICULTY_CARDS = [
        {
          lvl: 1,
          badge: "5 L",
          title: tr("Stufe 1: Im System", "Level 1: On Staff"),
          sub: hasSelectedKey
            ? tf("5 Linien • {key}", "5 lines • {key}", { key: getLocalizedNotationKeyModeLabel(selectedKeyMode, true) })
            : tr("5 Linien &amp; 4 Räume (Stammtöne)", "5 lines &amp; 4 spaces (naturals)")
        },
        {
          lvl: 2,
          badge: "±2",
          title: tr("Stufe 2: ±1–2 Hilfslinien", "Level 2: ±1–2 Ledgers"),
          sub: hasSelectedKey
            ? tf("±2 Hilfslinien • {key}", "±2 ledgers • {key}", { key: getLocalizedNotationKeyModeLabel(selectedKeyMode, true) })
            : tr("Erweiterter Umfang ohne Vorzeichen", "Extended range without accidentals")
        },
        {
          lvl: 3,
          badge: "±3",
          title: tr("Stufe 3: Bis 3 Hilfslinien", "Level 3: Up to 3 Ledgers"),
          sub: hasSelectedKey
            ? tf("±3 Hilfslinien • {key}", "±3 ledgers • {key}", { key: getLocalizedNotationKeyModeLabel(selectedKeyMode, true) })
            : tr("Voller Bereich nach oben &amp; unten", "Up to 3 ledger lines above &amp; below")
        },
        {
          lvl: 4,
          badge: hasSelectedKey ? getCategoryBadgeSVG("nat-sharp") : getCategoryBadgeSVG("keysig"),
          nodeClass: "node-circle-icon",
          title: hasSelectedKey
            ? tr("Stufe 4: + Auflösungszeichen (♮)", "Level 4: + Naturals (♮)")
            : tr("Stufe 4: 3 Hilfsl. + Vorzeichen", "Level 4: 3 Ledgers + ♯/♭"),
          sub: hasSelectedKey
            ? tr("Tonart inkl. ♮ &amp; extra Vorzeichen", "Key sig. plus ♮ &amp; accidentals")
            : tr("Voller Umfang mit ♯ und ♭", "Full 3-ledger range with sharps &amp; flats")
        }
      ];

      const KEY_SIGNATURE_CARDS = [
        {
          id: "key_easy",
          keyMode: "easy",
          lvl: trainerRangeLvl,
          circle: "circle-sage",
          badge: "1–2",
          title: tr("Leichte Tonarten (1–2 ♯/♭)", "Easy Keys (1–2 ♯/♭)"),
          sub: tr("G-, D-, F- &amp; B-Dur am Systemanfang", "G, D, F &amp; Bb Major key signatures")
        },
        {
          id: "key_medium",
          keyMode: "medium",
          lvl: trainerRangeLvl,
          circle: "circle-peach",
          badge: "3–4",
          title: tr("Mittlere Tonarten (3–4 ♯/♭)", "Medium Keys (3–4 ♯/♭)"),
          sub: tr("A-, E-, Es- &amp; As-Dur im Wechsel", "A, E, Eb &amp; Ab Major rotating")
        },
        {
          id: "key_all",
          keyMode: "all",
          lvl: trainerRangeLvl,
          circle: "circle-lilac",
          badge: "1–6",
          title: tr("Alle 12 Tonarten (1–6 ♯/♭)", "All 12 Keys (1–6 ♯/♭)"),
          sub: tr("Kompletter Quintenzirkel bis Fis/Ges", "Full circle of fifths up to F♯ / G♭")
        },
        {
          id: "key_nat",
          keyMode: "all",
          lvl: 4,
          circle: "circle-peach",
          nodeClass: "node-circle-icon",
          badge: getCategoryBadgeSVG("keysig-nat"),
          title: tr("Tonarten + Auflösungszeichen", "Key Signatures + Naturals (♮)"),
          sub: tr("Blattspiel-Profi mit ♮ &amp; Wechselvorzeichen", "Pro sight-reading with ♮ &amp; accidentals")
        }
      ];

      const keyToolbarHtml = `
        <div class="notation-key-toolbar">
          <div class="notation-key-pool-row">
            ${KEY_POOL_CHIPS.map(ch => `
              <button type="button" class="k-filter-pill${selectedKeyMode === ch.id ? " active" : ""}" data-notation-keymode="${ch.id}">
                ${escapeHtml(ch.label)}
              </button>
            `).join("")}
          </div>
          <div class="notation-key-groups">
            <div class="notation-key-group-row">
              ${NOTATION_SHARP_KEY_ORDER.map(renderSigChip).join("")}
            </div>
            <div class="notation-key-group-row">
              ${NOTATION_FLAT_KEY_ORDER.map(renderSigChip).join("")}
            </div>
          </div>
          <div class="notation-key-preview-box">
            <div class="notation-key-preview-svg">${previewSvg}</div>
            <div class="notation-key-preview-copy">
              <span class="notation-key-preview-title">${escapeHtml(previewTitle)}</span>
              ${previewExample ? `<span class="notation-key-preview-example">${escapeHtml(previewExample)}</span>` : ""}
              <span class="notation-key-preview-desc">${previewDesc}</span>
            </div>
          </div>
        </div>
      `;

      if (selectedNotType.id === "notation-keys") {
        container.innerHTML = `
          <div class="subpage-section">
            <h3 class="subpage-section-title">${formatStackedParenTitle(tr("Tonarten-Blattspiel (Generalvorzeichen)", "Key-Signature Sight-Reading"))}</h3>
            <p class="subpage-section-desc">${tr(
              "Lies ganze 8-Noten-Phrasen mit vorgegebener Tonart im Notensystem und beachte die Vorzeichen vom Blatt!",
              "Read 8-note phrases with an active key signature on the staff and remember the sharps &amp; flats while playing!"
            )}</p>
            <div class="notation-key-quick-group">
              <span class="notation-key-quick-label">${tr("Schlüssel &amp; Umfang für diesen Direktstart:", "Clef &amp; range for quick-start cards:")}</span>
              <div class="notation-key-quick-row">
                ${TRAINER_CLEFS.map(tc => `
                  <button type="button" class="k-filter-pill${trainerClefMode === tc.mode ? " active" : ""}" data-notation-trainer-clef="${tc.mode}">
                    ${escapeHtml(tc.label)}
                  </button>
                `).join("")}
              </div>
              <div class="notation-key-quick-row">
                ${TRAINER_RANGES.map(trng => `
                  <button type="button" class="k-filter-pill${trainerRangeLvl === trng.lvl ? " active" : ""}" data-notation-trainer-lvl="${trng.lvl}">
                    ${escapeHtml(trng.label)}
                  </button>
                `).join("")}
              </div>
            </div>
            <div class="subpage-nodes-grid">
              ${KEY_SIGNATURE_CARDS.map(kc => `
                <button class="subpage-node-btn" data-launch-notation-key="${kc.id}" data-notation-keymode-launch="${kc.keyMode}" data-notation-mode="${trainerClefMode}" data-notation-lvl="${kc.lvl}">
                  <div class="node-circle ${kc.circle}${kc.nodeClass ? ` ${kc.nodeClass}` : ""}">${kc.badge}</div>
                  <span class="node-title">${kc.title}</span>
                  <span class="node-sub">${kc.sub}</span>
                </button>
              `).join("")}
            </div>
          </div>

          <div class="subpage-section">
            <h3 class="subpage-section-title">${tr("Tonart / Generalvorzeichen wählen", "Choose Key Signature")}</h3>
            <p class="subpage-section-desc">${tr(
              "Lege fest, ob Tonarten mit Vorzeichen am Notenanfang stehen sollen – gilt auch für alle Schlüssel-Übungen.",
              "Set a key signature at the start of the staff — also applies to all clef exercises."
            )}</p>
            ${keyToolbarHtml}
          </div>
        `;
      } else {
        const sec = NOTATION_SECTIONS.find(s => s.mode === selectedNotType.id);
        const isSymbolsSec = sec.mode === "notation-symbols";
        container.innerHTML = `
          <div class="subpage-section">
            <div class="subpage-section-head-row">
              <h3 class="subpage-section-title">${formatStackedParenTitle(sec.title)}</h3>
              ${isSymbolsSec ? "" : `<span class="subpage-section-key-pill">${escapeHtml(getLocalizedNotationKeyModeLabel(selectedKeyMode, true))}</span>`}
            </div>
            <p class="subpage-section-desc">${sec.desc}</p>
            <div class="subpage-nodes-grid">
              ${(sec.levels || NOTATION_DIFFICULTY_CARDS).map(lv => `
                <button class="subpage-node-btn" data-launch-notation="${sec.mode}" data-notation-lvl="${lv.lvl}">
                  <div class="node-circle ${sec.circleClass}${lv.nodeClass ? ` ${lv.nodeClass}` : ""}">${lv.badge}</div>
                  <span class="node-title">${lv.title}</span>
                  <span class="node-sub">${lv.sub}</span>
                </button>
              `).join("")}
            </div>
            ${isSymbolsSec ? `
              <div class="nts-category-ref-row">
                <button type="button" class="btn-tool nts-category-ref-btn" data-open-nts-ref="1">
                  ${escapeHtml(tr("Im Wissens-Hub nachschlagen: Vortragszeichen & Symbole →", "Look up in Knowledge Hub: Expression Marks & Symbols →"))}
                </button>
              </div>
            ` : ""}
          </div>

          ${isSymbolsSec ? "" : `
            <details class="notation-key-collapse"${notationKeyDrawerOpen ? " open" : ""}>
              <summary class="notation-key-collapse-summary">
                <span>${escapeHtml(tr("Tonart / Generalvorzeichen anpassen", "Customize Key Signature"))}</span>
                <span class="subpage-section-key-pill">${escapeHtml(getLocalizedNotationKeyModeLabel(selectedKeyMode, true))}</span>
              </summary>
              <div class="notation-key-collapse-body">${keyToolbarHtml}</div>
            </details>
          `}
        `;

        const detailsEl = container.querySelector(".notation-key-collapse");
        detailsEl?.addEventListener("toggle", () => {
          notationKeyDrawerOpen = Boolean(detailsEl.open);
        });
        container.querySelectorAll("[data-open-nts-ref]").forEach(btn => {
          btn.addEventListener("click", () => openKnowledgeRef("notation-symbols", { returnView: "category" }));
        });
      }

      container.querySelectorAll("[data-notation-keymode]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setNotationKeyMode(btn.dataset.notationKeymode);
          renderNotationCategoryBody();
        });
      });

      container.querySelectorAll("[data-notation-trainer-clef]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.settings.notationKeyTrainerClef = isNotationMode(btn.dataset.notationTrainerClef)
            ? btn.dataset.notationTrainerClef
            : "notation-treble";
          renderNotationCategoryBody();
        });
      });

      container.querySelectorAll("[data-notation-trainer-lvl]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.settings.notationKeyTrainerLevel = Math.max(1, Math.min(3, parseInt(btn.dataset.notationTrainerLvl, 10) || 2));
          renderNotationCategoryBody();
        });
      });

      container.querySelectorAll("[data-launch-notation-key]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setNotationLevel(btn.dataset.notationMode, btn.dataset.notationLvl, btn.dataset.notationKeymodeLaunch);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });

      container.querySelectorAll("[data-launch-notation]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setNotationLevel(btn.dataset.launchNotation, btn.dataset.notationLvl);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });

      markBeginnerExerciseNodes(container);
    };

    renderNotationCategoryBody();

  } else if (categoryKey === "warmup") {
    const activeVoice = state.warmup?.voiceRange || "mixed";
    const voiceButtonsHtml = Object.values(WARMUP_VOICE_RANGES).map(vr => `
      <button class="warmup-range-btn ${vr.id === "mixed" ? "is-wide" : ""} ${vr.id === activeVoice ? "active" : ""}" type="button" data-select-warmup-voice="${vr.id}">
        <span class="warmup-range-name">${tr(vr.de, vr.en)}</span>
        <span class="warmup-range-notes">${tr(vr.subDe, vr.subEn)}</span>
      </button>
    `).join("");

    container.innerHTML = `
      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("1. Tonumfang wählen", "1. Choose Vocal Range")}</h3>
        <p class="subpage-section-desc">${tr("Passt Grundton und Modulationsbereich der Übungen an dich oder deinen Chor an", "Tailors starting pitch and modulation range to your voice or choir section")}</p>
        <div class="warmup-range-grid">${voiceButtonsHtml}</div>
      </div>

      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("2. Programm starten", "2. Start Routine")}</h3>
        <p class="subpage-section-desc">${tr("Geführtes Atem-, Sirenen- & Stimmtraining mit Live-Kurve, Klavier-/Chor-Begleitung und Halbton-Steuerung", "Guided breath, siren & vocal training with live curve, piano/choir accompaniment & semitone control")}</p>
        <div class="subpage-nodes-grid">
          ${WARMUP_PRESETS.map(p => `
            <button class="subpage-node-btn" type="button" data-launch-warmup="${p.id}">
              <div class="node-circle ${p.circle}">${p.badge}</div>
              <span class="node-title">${tr(p.titleDe, p.titleEn)}</span>
              <span class="node-sub">${tr(p.descDe, p.descEn)}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    container.querySelectorAll("[data-select-warmup-voice]").forEach(btn => {
      btn.addEventListener("click", () => {
        const voiceId = btn.dataset.selectWarmupVoice;
        if (WARMUP_VOICE_RANGES[voiceId]) {
          state.warmup.voiceRange = voiceId;
          container.querySelectorAll("[data-select-warmup-voice]").forEach(el => {
            el.classList.toggle("active", el.dataset.selectWarmupVoice === voiceId);
          });
        }
      });
    });

    container.querySelectorAll("[data-launch-warmup]").forEach(btn => {
      btn.addEventListener("click", () => {
        openWarmupView(btn.dataset.launchWarmup, { returnView: "category" });
      });
    });
  }

  if (typeof applyExplorerCategoryNodeFilter === "function") {
    applyExplorerCategoryNodeFilter(container, categoryKey);
  }

  const isCategoryMainPage = !state.activeCategorySection;

  // Prüfungs-Einstieg nur auf der Hauptseite der Übungskategorie (nicht beim Einsing-Helfer, nicht auf Aufgabentyp-Unterseiten)
  if (isCategoryMainPage && categoryKey !== "warmup" && EXAM_CATEGORY_LEVELS[categoryKey]) {
    const examCfg = EXAM_CATEGORY_LEVELS[categoryKey];
    const catBest = getCategoryBestExamPercent(categoryKey);
    const catBestHtml = catBest !== null
      ? `<span class="category-exam-best">${escapeHtml(tf("Dein Bestwert: {pct}%", "Personal Best: {pct}%", { pct: catBest }))}</span>`
      : "";
    container.insertAdjacentHTML("beforeend", `
      <button id="openCategoryExamBtn" class="category-exam-entry-card accent-${examCfg.accent || "sage"}" type="button">
        <span class="category-exam-entry-left">
          <span class="category-exam-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="4.5" width="14" height="16.5" rx="2.6"/>
              <path d="M9.2 4.5V3.6c0-.6.5-1.1 1.1-1.1h3.4c.6 0 1.1.5 1.1 1.1v.9"/>
              <path d="M9 12.6l2.2 2.2 4-4.3"/>
              <path d="M9 18h6"/>
            </svg>
          </span>
          <span class="category-exam-copy">
            <span class="category-exam-title">${escapeHtml(tr("Kategorie-Prüfung ablegen", "Take Category Exam"))}</span>
            <span class="category-exam-sub">${escapeHtml(tr("1 Versuch pro Frage • verschiedene Stufen & Hör-Auswertung", "1 try per question • selectable levels & audio review"))}</span>
            ${catBestHtml}
          </span>
        </span>
        <span class="category-exam-cta">${escapeHtml(tr("Prüfung →", "Exam →"))}</span>
      </button>
    `);
    document.getElementById("openCategoryExamBtn")?.addEventListener("click", () => {
      openExamSetupPage(categoryKey);
    });
  }

  markBeginnerExerciseNodes(container);

  // „So funktioniert’s“-Button bleibt auf der Hauptseite der jeweiligen Übungskategorie
  if (isCategoryMainPage) {
    container.insertAdjacentHTML("beforeend", `
      <div class="category-help-footer">
        <button id="openCategoryHelpBtn" class="category-help-btn" type="button">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span>${tr("So funktioniert’s", "How It Works")}</span>
        </button>
      </div>
    `);

    document.getElementById("openCategoryHelpBtn")?.addEventListener("click", () => {
      openCategoryHelpPage(categoryKey);
    });
  }

  if (!options.refreshOnly) {
    if (wasSameView) {
      state.updateHeaderSubtext();
      const nextSec = state.activeCategorySection || null;
      if (!options.skipHistoryPush && !appHistoryState.isApplying && (prevCat !== categoryKey || prevSec !== nextSec)) {
        pushAppHistory(null);
      }
      const viewEl = document.getElementById("viewCategory");
      if (viewEl) viewEl.scrollTop = 0;
      window.scrollTo?.(0, 0);
    } else {
      switchView("category", { skipHistoryPush: Boolean(options.skipHistoryPush) });
    }
  } else {
    state.updateHeaderSubtext();
  }
}

/**
 * Baut die dedizierte Erklärseite („So funktioniert’s“) für die aktive Übungskategorie auf
 */
function openCategoryHelpPage(categoryKey, options = {}) {
  const container = document.getElementById("categoryHelpContent");
  const guide = typeof getLocalizedCategoryHelpGuide === "function"
    ? getLocalizedCategoryHelpGuide(categoryKey)
    : (typeof CATEGORY_HELP_GUIDES !== "undefined" ? CATEGORY_HELP_GUIDES[categoryKey] : null);
  if (!container || !guide) return;

  state.activeCategory = categoryKey;
  container.innerHTML = `
    <div class="article-body">
      <span class="k-card-tag ${guide.tagClass}">${guide.tag}</span>
      <h2>${guide.title}</h2>
      <p class="article-lead">${guide.lead}</p>
      ${guide.sections}
    </div>
    <div class="category-help-footer">
      <button id="closeCategoryHelpBtn" class="category-help-btn" type="button">
        <span>${tr("← Zurück zur Übungsauswahl", "← Back to Exercises")}</span>
      </button>
    </div>
  `;

  document.getElementById("closeCategoryHelpBtn")?.addEventListener("click", () => {
    navigateBackFromUI();
  });

  if (!options.refreshOnly) {
    switchView("category-help");
    window.scrollTo?.({ top: 0, behavior: "auto" });
  }
}

