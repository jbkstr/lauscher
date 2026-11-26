/**
 * Lauscher • Themes, Custom-Theme-Persistenz, Profil-Defaults & Musik-Kataloge
 * (Startseiten-Zitate `LAUSCHEBAER_QUOTES` liegen ko-lokalisiert in i18n/quotes.js.)
 */

const _mascotRotationState = {
  bags: {},
  lastIdx: {},
  slots: {},
  lastMetalMode: null,
  ambientTimerId: null
};

function isMetalMascotThemeActive() {
  if (typeof document !== "undefined" && document.documentElement) {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr) return attr === "metal";
  }
  if (typeof state !== "undefined" && state?.settings?.theme) {
    return state.settings.theme === "metal";
  }
  return false;
}

function normalizeMascotMoodKey(mood = "idle") {
  if (mood === "logo") return "logo";
  if (mood === "happy" || mood === "listening" || mood === "awaiting" || mood === "question" || mood === "thinking" || mood === "break") {
    return mood;
  }
  return "idle";
}

function getMascotVariantsForMood(mood = "idle") {
  const key = normalizeMascotMoodKey(mood);
  if (isMetalMascotThemeActive()) {
    const metalMap = (typeof LAUSCHER_MASCOT_METAL_VARIANTS !== "undefined" && LAUSCHER_MASCOT_METAL_VARIANTS)
      ? LAUSCHER_MASCOT_METAL_VARIANTS
      : null;
    if (metalMap) {
      const lookupKey = key === "logo" ? "listening" : key;
      const metalList = Array.isArray(metalMap[lookupKey]) ? metalMap[lookupKey].filter(Boolean) : [];
      if (metalList.length > 0) return metalList;
      const metalFallback = Array.isArray(metalMap.idle) ? metalMap.idle.filter(Boolean) : [];
      if (metalFallback.length > 0) return metalFallback;
    }
  }
  const map = (typeof LAUSCHER_MASCOT_DATA_URIS !== "undefined" && LAUSCHER_MASCOT_DATA_URIS) ? LAUSCHER_MASCOT_DATA_URIS : null;
  const variantsMap = (typeof LAUSCHER_MASCOT_VARIANTS !== "undefined" && LAUSCHER_MASCOT_VARIANTS) ? LAUSCHER_MASCOT_VARIANTS : null;
  if (key === "logo") {
    const logoUri = map?.logo || map?.listening || map?.idle || "";
    return logoUri ? [logoUri] : [];
  }
  const list = variantsMap && Array.isArray(variantsMap[key]) ? variantsMap[key].filter(Boolean) : [];
  if (list.length > 0) return list;
  if (!map) return [];
  const fallback = map[key]
    || (key === "awaiting" ? map.thinking : "")
    || (key === "thinking" ? map.awaiting : "")
    || (key === "listening" ? map.logo : "")
    || map.idle
    || map.question
    || "";
  return fallback ? [fallback] : [];
}

function pickNextMascotVariantIndex(bagKey, count) {
  if (count <= 1) return 0;
  let bag = _mascotRotationState.bags[bagKey];
  if (!Array.isArray(bag) || bag.length === 0) {
    bag = [];
    for (let i = 0; i < count; i++) bag.push(i);
    // Fisher-Yates-Shuffle für gleichmäßige Abwechslung ohne Wiederholungs-Cluster
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = bag[i];
      bag[i] = bag[j];
      bag[j] = tmp;
    }
    const prev = _mascotRotationState.lastIdx[bagKey];
    if (Number.isInteger(prev) && bag[bag.length - 1] === prev && bag.length > 1) {
      const swapIdx = Math.floor(Math.random() * (bag.length - 1));
      const tmp = bag[bag.length - 1];
      bag[bag.length - 1] = bag[swapIdx];
      bag[swapIdx] = tmp;
    }
    _mascotRotationState.bags[bagKey] = bag;
  }
  const picked = bag.pop();
  _mascotRotationState.lastIdx[bagKey] = picked;
  return picked;
}

function resetMascotSlot(slotName) {
  if (slotName && _mascotRotationState.slots[slotName]) {
    delete _mascotRotationState.slots[slotName];
  }
}

function getMascotAssetUri(mood = "idle", options = null) {
  const key = normalizeMascotMoodKey(mood);
  const useMetal = isMetalMascotThemeActive();
  const variants = getMascotVariantsForMood(key);
  if (variants.length === 0) return "";
  if (variants.length === 1) {
    if (options?.slot) {
      _mascotRotationState.slots[options.slot] = { mood: key, uri: variants[0], idx: 0, isMetal: useMetal };
    }
    return variants[0];
  }

  const slotName = options?.slot || null;
  const keepIfSameMood = Boolean(options?.keepIfSameMood);
  const forceRotate = Boolean(options?.forceRotate);

  if (slotName && keepIfSameMood && !forceRotate) {
    const existing = _mascotRotationState.slots[slotName];
    if (existing && existing.mood === key && existing.isMetal === useMetal && existing.uri) {
      return existing.uri;
    }
  }

  const bagKey = (useMetal ? "metal:" : "std:") + key;
  const idx = pickNextMascotVariantIndex(bagKey, variants.length);
  const uri = variants[idx] || variants[0];
  if (slotName) {
    _mascotRotationState.slots[slotName] = { mood: key, uri, idx, isMetal: useMetal };
  }
  return uri;
}

function refreshAllVisibleMascotsForTheme(force = false) {
  const nextMetal = isMetalMascotThemeActive();
  if (!force && _mascotRotationState.lastMetalMode === nextMetal) return;
  _mascotRotationState.lastMetalMode = nextMetal;
  _mascotRotationState.slots = {};
  if (typeof document === "undefined") return;

  const slotSpecs = [
    { id: "heroMascotSvg", slot: "hero", defaultMood: "idle", showAccessory: true },
    { id: "spaceMascotSvg", slot: "space", defaultMood: "idle", showAccessory: true },
    { id: "stageMascotWrap", slot: "stage", defaultMood: "idle", showAccessory: false },
    { id: "warmupMascotWrap", slot: "warmup", defaultMood: "idle", showAccessory: false },
    { id: "breakReminderMascot", slot: "break", defaultMood: "break", showAccessory: true },
    { id: "welcomeLangMascot", slot: "welcomeLang", defaultMood: "idle", showAccessory: false },
    { id: "welcomeGreetMascot", slot: "welcomeGreet", defaultMood: "happy", showAccessory: false }
  ];

  slotSpecs.forEach(({ id, slot, defaultMood, showAccessory }) => {
    const el = document.getElementById(id);
    if (!el || !el.innerHTML.trim()) return;
    const curSvg = typeof el.querySelector === "function" ? el.querySelector("svg[data-mascot-mood]") : null;
    const mood = curSvg?.getAttribute("data-mascot-mood") || defaultMood;
    rotateMascotSlot(el, mood, showAccessory, { slot, forceRotate: true, animate: true });
  });
}

function rotateMascotSlot(elOrId, mood = "idle", showAccessory = false, options = null) {
  const el = typeof elOrId === "string" ? document.getElementById(elOrId) : elOrId;
  if (!el) return false;
  const slotName = options?.slot || (typeof elOrId === "string" ? elOrId : null);
  const prevUri = slotName ? _mascotRotationState.slots[slotName]?.uri : null;
  const html = getMascotSVG(mood, showAccessory, { ...(options || {}), slot: slotName });
  const nextUri = slotName ? _mascotRotationState.slots[slotName]?.uri : null;
  const changed = !prevUri || prevUri !== nextUri || !el.innerHTML;
  if (changed) {
    el.innerHTML = html;
    if (options?.animate !== false) {
      el.classList?.remove("mascot-pose-swap");
      void el.offsetWidth;
      el.classList?.add("mascot-pose-swap");
    }
  }
  return changed;
}

function startMascotAmbientRotation() {
  if (_mascotRotationState.ambientTimerId !== null) return;
  _mascotRotationState.ambientTimerId = setInterval(() => {
    if (typeof document === "undefined" || document.hidden) return;
    if (typeof state === "undefined") return;

    const breakModal = document.getElementById("breakReminderModal");
    if (breakModal && !breakModal.classList.contains("hidden")) {
      rotateMascotSlot("breakReminderMascot", "break", true, { slot: "break", forceRotate: true });
      return;
    }

    const welcomeEl = document.getElementById("welcomeOnboarding");
    if (welcomeEl && !welcomeEl.classList.contains("hidden")) return;

    if (state.currentView === "home") {
      const homeMood = Math.random() < 0.22 ? (Math.random() < 0.5 ? "listening" : "happy") : "idle";
      rotateMascotSlot("heroMascotSvg", homeMood, true, { slot: "hero", forceRotate: true });
    } else if (state.currentView === "space") {
      rotateMascotSlot("spaceMascotSvg", "idle", true, { slot: "space", forceRotate: true });
    }
  }, 15000);
}

// Lauscher-Looks (Accessoires) sind vorerst ausgeblendet. Code, Optionen und die im Profil
// gespeicherte Auswahl (companionAccessories) bleiben erhalten – Pläne siehe docs/ideas.md.
const MASCOT_LOOKS_ENABLED = false;

function getMascotAccessorySVG(activeAccessories = []) {
  const hasAcc = (key) => activeAccessories.includes(key);
  let accessoryMarkup = "";
  if (hasAcc("headphones")) {
    accessoryMarkup += `
      <g data-acc="headphones">
        <path d="M15.2 13.8 C20.2 1.4, 45.8 5.2, 48.2 20.6" stroke="var(--sage-strong)" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M21.8 7.6 C26.8 4.8, 38.2 6.8, 43.2 11.0" stroke="var(--sage-soft)" stroke-width="1.3" stroke-linecap="round" fill="none"/>
        <g transform="translate(15.4 14.0) rotate(-26)">
          <rect x="-4.2" y="-5.8" width="7.4" height="11.6" rx="3.7" fill="var(--sage-strong)"/>
          <rect x="-3.2" y="-4.5" width="5.0" height="9.0" rx="2.5" fill="#41495E"/>
        </g>
        <g transform="translate(48.2 20.6) rotate(24)">
          <rect x="-3.2" y="-5.8" width="7.4" height="11.6" rx="3.7" fill="var(--sage-strong)"/>
          <rect x="-1.8" y="-4.5" width="5.0" height="9.0" rx="2.5" fill="#41495E"/>
        </g>
      </g>
    `;
  }
  if (hasAcc("beret")) {
    accessoryMarkup += `
      <g transform="translate(31.8 12.8) rotate(9.5)">
        <path d="M-0.4 -5.0 Q0.3 -7.2 1.6 -7.2" stroke="#41495E" stroke-width="1.45" stroke-linecap="round" fill="none"/>
        <path d="M-11.4 2.2 C-11.6 -3.6, -5.5 -5.4, 0.6 -5.0 C7.0 -4.6, 12.0 -2.0, 11.4 1.9 Q0 0.6 -11.4 2.2 Z" fill="var(--lilac-strong)" stroke="#41495E" stroke-width="1.05" stroke-linejoin="round"/>
        <path d="M-10.0 2.0 Q0 0.5 10.0 1.8" stroke="var(--lilac)" stroke-width="1.45" stroke-linecap="round" fill="none"/>
      </g>
    `;
  }
  if (hasAcc("sunglasses")) {
    accessoryMarkup += `
      <g transform="translate(26.45 28.5) rotate(7.8)">
        <path d="M-16.8 -0.4 L-13.0 -0.8 M13.0 -0.8 L16.8 -0.2" stroke="#1E2536" stroke-width="1.35" stroke-linecap="round"/>
        <rect x="-13.1" y="-4.2" width="11.5" height="8.2" rx="4.1" fill="#23263A" stroke="#EC985C" stroke-width="1.3"/>
        <rect x="1.6" y="-4.2" width="11.5" height="8.2" rx="4.1" fill="#23263A" stroke="#EC985C" stroke-width="1.3"/>
        <path d="M-1.6 -1.2 Q0 -2.6 1.6 -1.2" stroke="#EC985C" stroke-width="1.45" stroke-linecap="round" fill="none"/>
        <path d="M-10.8 -2.0 L-8.0 1.6 M3.9 -2.0 L6.7 1.6" stroke="#FFFFFF" stroke-width="1.05" stroke-linecap="round" opacity="0.55"/>
      </g>
    `;
  }
  if (hasAcc("bowtie")) {
    accessoryMarkup += `
      <g transform="translate(29.2 47.6) rotate(5)">
        <path d="M-7.2 -3.2 L-0.6 0 L-7.2 3.2 Q-8.8 0 -7.2 -3.2 Z" fill="var(--peach-strong)" stroke="#1E2536" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M7.2 -3.2 L0.6 0 L7.2 3.2 Q8.8 0 7.2 -3.2 Z" fill="var(--peach-strong)" stroke="#1E2536" stroke-width="1.1" stroke-linejoin="round"/>
        <rect x="-1.8" y="-2.1" width="3.6" height="4.2" rx="1.4" fill="var(--peach)" stroke="#1E2536" stroke-width="1.1"/>
      </g>
    `;
  }
  if (hasAcc("mic")) {
    accessoryMarkup += `
      <g>
        <rect x="4.3" y="40.5" width="6.6" height="9.6" rx="3.3" fill="#D8DCE6" stroke="#1E2536" stroke-width="1.25"/>
        <path d="M5.2 44.0 H10.0 M5.2 46.8 H10.0" stroke="#41495E" stroke-width="1.05" stroke-linecap="round"/>
        <path d="M2.8 47.0 C2.8 52.0, 12.4 52.0, 12.4 47.0" stroke="#1E2536" stroke-width="1.3" stroke-linecap="round" fill="none"/>
        <path d="M7.6 51.0 V58.0 M4.6 58.0 H10.6" stroke="#1E2536" stroke-width="1.45" stroke-linecap="round"/>
      </g>
    `;
  }
  if (hasAcc("coffee")) {
    accessoryMarkup += `
      <g>
        <path d="M47.5 47.0 H56.5 V53.5 C56.5 56.2 54.6 57.5 52.0 57.5 C49.4 57.5 47.5 56.2 47.5 53.5 Z" fill="var(--peach)" stroke="var(--peach-strong)" stroke-width="1.4" stroke-linejoin="round"/>
        <path d="M56.5 49.0 C59.5 49.0 59.5 53.8 56.5 53.8" stroke="var(--peach-strong)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
        <path d="M50.0 44.2 Q49.0 41.8 51.0 39.8 M53.8 44.2 Q52.8 41.8 54.8 39.8" stroke="#41495E" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      </g>
    `;
  }
  if (hasAcc("notes")) {
    accessoryMarkup += `
      <g>
        <ellipse cx="53.7" cy="11.7" rx="2.1" ry="1.7" fill="var(--lilac-strong)"/>
        <ellipse cx="59.7" cy="9.9" rx="2.1" ry="1.7" fill="var(--lilac-strong)"/>
        <path d="M55.4 11.4 V3.8 L61.4 2.2 V9.6" stroke="var(--lilac-strong)" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </g>
    `;
  }
  if (hasAcc("sparkles")) {
    accessoryMarkup += `
      <g>
        <path d="M7.2 6.4 Q8.1 9.3 11.0 10.2 Q8.1 11.1 7.2 14.0 Q6.3 11.1 3.4 10.2 Q6.3 9.3 7.2 6.4 Z" fill="#F2B705"/>
        <path d="M13.8 2.5 Q14.4 4.2 16.1 4.8 Q14.4 5.4 13.8 7.1 Q13.2 5.4 11.5 4.8 Q13.2 4.2 13.8 2.5 Z" fill="var(--peach-strong)"/>
        <path d="M56.5 18.1 Q57.3 20.7 59.9 21.5 Q57.3 22.3 56.5 24.9 Q55.7 22.3 53.1 21.5 Q55.7 20.7 56.5 18.1 Z" fill="#F2B705"/>
        <path d="M53.5 8.8 Q54.0 10.5 55.7 11.0 Q54.0 11.5 53.5 13.2 Q53.0 11.5 51.3 11.0 Q53.0 10.5 53.5 8.8 Z" fill="var(--peach-strong)"/>
      </g>
    `;
  }
  return accessoryMarkup;
}

function hydrateMascotStaticSlots() {
  const splashBadge = document.querySelector("#startupSplash .splash-badge");
  const listenUri = getMascotAssetUri("listening");
  // index.html setzt das Bild meist schon direkt nach dem Laden des Maskottchen-Bundles
  if (splashBadge && listenUri && !splashBadge.querySelector("image")) {
    splashBadge.innerHTML = `
      <svg class="splash-mascot-svg" width="84" height="84" viewBox="-1 0 68 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="${listenUri}" x="0" y="2" width="60" height="60" preserveAspectRatio="xMidYMid meet"/>
        <path class="splash-wave splash-wave-1" d="M56.5 14 C60.2 17.5 60.2 24 56.5 27.5" stroke="var(--sage-strong, #2E6F4E)" stroke-width="2.3" stroke-linecap="round"/>
        <path class="splash-wave splash-wave-2" d="M60.2 11.2 C64.8 16.2 64.8 25.2 60.2 30.2" stroke="var(--sage-strong, #2E6F4E)" stroke-width="1.9" stroke-linecap="round"/>
      </svg>
    `;
  }
}

function getMascotSVG(mood = "idle", showAccessory = false, options = null) {
  const activeAccessories = MASCOT_LOOKS_ENABLED && showAccessory && typeof state !== "undefined" && state?.profile
    ? getResolvedProfileAccessories(state.profile)
    : [];
  const hasAcc = (key) => activeAccessories.includes(key);
  const highStreak = !showAccessory && typeof state !== "undefined" && (state?.streakState?.count || 0) >= 5;
  const accessoryMarkup = getMascotAccessorySVG(activeAccessories);
  const artUri = getMascotAssetUri(mood, options);

  let extraBadge = "";
  if (mood === "listening") {
    extraBadge = `
      <path d="M56.5 14 C60.2 17.5 60.2 24 56.5 27.5" stroke="var(--sage-strong)" stroke-width="2.4" stroke-linecap="round" fill="none"/>
      <path d="M60.2 11.2 C64.8 16.2 64.8 25.2 60.2 30.2" stroke="var(--sage-strong)" stroke-width="1.9" stroke-linecap="round" fill="none" opacity="0.6"/>
    `;
  } else if (mood === "question") {
    extraBadge = `
      <text x="53.5" y="18" fill="var(--peach-strong)" font-size="16" font-weight="900" font-family="Andika, sans-serif">?</text>
    `;
  } else if (mood === "awaiting") {
    extraBadge = `
      <rect x="44.5" y="2.5" width="18" height="11.5" rx="5.75" fill="var(--peach)" stroke="var(--peach-strong)" stroke-width="1.6"/>
      <circle cx="45.8" cy="16.2" r="1.6" fill="var(--peach)" stroke="var(--peach-strong)" stroke-width="1.15"/>
      <circle cx="43.3" cy="19.3" r="1.05" fill="var(--peach)" stroke="var(--peach-strong)" stroke-width="1"/>
      <circle cx="49.5" cy="8.25" r="1.3" fill="var(--peach-strong)"/>
      <circle cx="53.5" cy="8.25" r="1.3" fill="var(--peach-strong)"/>
      <circle cx="57.5" cy="8.25" r="1.3" fill="var(--peach-strong)"/>
    `;
  } else if (mood === "happy" && !hasAcc("notes") && !hasAcc("sparkles") && highStreak) {
    extraBadge = `
      <text x="8.5" y="16" fill="var(--lilac-strong)" font-size="11" font-weight="900">✦</text>
      <text x="51.5" y="15.5" fill="var(--sage-strong)" font-size="13.5" font-weight="900">♪</text>
    `;
  }

  if (artUri) {
    return `
      <svg width="58" height="58" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" data-mascot-mood="${escapeHtml(mood)}">
        <image href="${artUri}" x="2" y="2" width="60" height="60" preserveAspectRatio="xMidYMid meet"/>
        ${accessoryMarkup}
        ${extraBadge}
      </svg>
    `;
  }

  // Fallback-Vektorgrafik falls mascot-bundle.js im isolierten Test nicht geladen wurde
  const earLeftRotate = mood === "question"
    ? "rotate(-10 16.5 16)"
    : (mood === "listening" || mood === "happy" ? "rotate(-5 16.5 16)" : (mood === "awaiting" ? "rotate(-8 16.5 16)" : ""));
  const earRightRotate = mood === "listening"
    ? "rotate(9 47.5 16)"
    : (mood === "awaiting" || mood === "happy" ? "rotate(5 47.5 16)" : "");

  return `
    <svg width="58" height="58" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" data-mascot-mood="${escapeHtml(mood)}">
      <g transform="${earLeftRotate}">
        <path d="M10.5 20.5 C7.5 14.5, 11.2 8.2, 17.5 8.8 C21.5 9.2, 24.5 12.2, 24.2 16.5 Z" fill="#41495E"/>
        <circle cx="16.4" cy="15.6" r="4.1" fill="#FFAA84"/>
      </g>
      <g transform="${earRightRotate}">
        <path d="M39.8 16.5 C39.5 12.2, 42.5 9.2, 46.5 8.8 C52.8 8.2, 56.5 14.5, 53.5 20.5 Z" fill="#41495E"/>
        <circle cx="47.6" cy="15.6" r="4.1" fill="#FFAA84"/>
      </g>
      <ellipse cx="32" cy="31" rx="20" ry="16" fill="#BAC6BE"/>
      <ellipse cx="22.4" cy="30.6" rx="7.2" ry="5.5" transform="rotate(-10 22.4 30.6)" fill="#41495E"/>
      <ellipse cx="41.6" cy="30.6" rx="7.2" ry="5.5" transform="rotate(10 41.6 30.6)" fill="#41495E"/>
      <ellipse cx="32" cy="37.4" rx="6.4" ry="5.0" fill="#F6F4EE"/>
      <ellipse cx="32" cy="34.6" rx="2.7" ry="1.95" fill="#1E2536"/>
      ${accessoryMarkup}
      ${extraBadge}
    </svg>
  `;
}

const VISUAL_PREFS_STORAGE_KEY = "lauschebaer_visual_prefs_v1";
const CUSTOM_THEMES_STORAGE_KEY = "lauschebaer_custom_themes_v1";
const VALID_APPEARANCES = ["light", "dark", "system"];
const VALID_THEMES = ["waldlichtung", "morgentau", "abenddaemmerung", "metal", "konzertsaal", "mitternacht"];
const CUSTOM_THEME_SLOT_IDS = ["custom_1", "custom_2", "custom_3"];
const ALL_VALID_THEMES = [...VALID_THEMES, ...CUSTOM_THEME_SLOT_IDS];

const CUSTOM_THEME_COLOR_FIELDS = [
  { key: "bgBase",       de: "Hintergrund",       en: "Background",       def: "#FAF7F2" },
  { key: "surfaceWhite", de: "Karten & Felder",   en: "Cards & Panels",   def: "#FFFFFF" },
  { key: "surfaceWarm",  de: "Nebenfläche",       en: "Secondary Fill",   def: "#F3EFE6" },
  { key: "surfaceHover", de: "Hover-Fläche",      en: "Hover Surface",    def: "#EAE4D7" },
  { key: "raccoonDark",  de: "Haupttext & Icons", en: "Main Text & Icons", def: "#3D405B" },
  { key: "raccoonMid",   de: "Nebentext",         en: "Secondary Text",   def: "#5E6278" },
  { key: "sage",         de: "Salbei (Fläche)",   en: "Sage (Fill)",      def: "#B8E0C8" },
  { key: "sageStrong",   de: "Salbei (Schrift)",  en: "Sage (Text)",      def: "#2E6F4E" },
  { key: "peach",        de: "Pfirsich (Fläche)", en: "Peach (Fill)",     def: "#FFD6BA" },
  { key: "peachStrong",  de: "Pfirsich (Schrift)", en: "Peach (Text)",    def: "#9C4A1A" },
  { key: "lilac",        de: "Flieder (Fläche)",  en: "Lilac (Fill)",     def: "#DCD3FF" },
  { key: "lilacStrong",  de: "Flieder (Schrift)", en: "Lilac (Text)",     def: "#4A3B8C" },
  { key: "statusOk",     de: "Status Richtig",    en: "Status Correct",   def: "#48A878" },
  { key: "statusWarn",   de: "Status Warnung",    en: "Status Warning",   def: "#E58C3A" },
  { key: "statusErr",    de: "Status Fehler",     en: "Status Error",     def: "#D96B6B" },
  { key: "borderStrong", de: "Rahmen & Linien",   en: "Borders & Lines",  def: "rgba(61, 64, 91, 0.22)" }
];

const CUSTOM_THEME_MANAGED_CSS_VARS = [
  "--bg-base", "--surface-white", "--surface-card", "--surface-warm", "--surface-soft", "--surface-hover",
  "--sage", "--sage-soft", "--sage-strong",
  "--peach", "--peach-soft", "--peach-strong",
  "--lilac", "--lilac-soft", "--lilac-strong",
  "--icon-ink", "--raccoon-dark", "--raccoon-mid", "--raccoon-muted", "--text-muted",
  "--border-soft", "--border-strong", "--tint-subtle", "--tint-subtle-soft",
  "--btn-primary-bg", "--btn-primary-fg", "--on-strong-accent",
  "--mute-bg", "--mute-border", "--dot-idle-bg",
  "--piano-key-inactive-bg", "--piano-key-inactive-border", "--piano-key-inactive-text",
  "--piano-white-active-bg", "--piano-white-active-ink",
  "--piano-black-bg-top", "--piano-black-bg-bottom", "--piano-black-border",
  "--piano-black-out-bg", "--piano-black-out-border", "--piano-black-solfege-bg", "--piano-black-solfege-ink",
  "--key-wrong-bg", "--key-wrong-ink", "--backdrop-scrim",
  "--status-ok", "--status-warn", "--status-err",
  "--shadow-card", "--shadow-float"
];

const CUSTOM_THEME_TEMPLATES = {
  "waldlichtung-light": {
    bgBase: "#FAF7F2", surfaceWhite: "#FFFFFF", surfaceWarm: "#F3EFE6", surfaceHover: "#EAE4D7",
    raccoonDark: "#3D405B", raccoonMid: "#5E6278",
    sage: "#B8E0C8", sageStrong: "#2E6F4E",
    peach: "#FFD6BA", peachStrong: "#9C4A1A",
    lilac: "#DCD3FF", lilacStrong: "#4A3B8C",
    statusOk: "#48A878", statusWarn: "#E58C3A", statusErr: "#D96B6B",
    borderStrong: "rgba(61, 64, 91, 0.22)"
  },
  "waldlichtung-dark": {
    bgBase: "#212329", surfaceWhite: "#2B2E36", surfaceWarm: "#343842", surfaceHover: "#3F4451",
    raccoonDark: "#ECEDF3", raccoonMid: "#B8BDCB",
    sage: "#385E4C", sageStrong: "#8FD7B0",
    peach: "#6B4737", peachStrong: "#FFC099",
    lilac: "#4B4173", lilacStrong: "#CABEFF",
    statusOk: "#5EC290", statusWarn: "#F09C52", statusErr: "#E67E7E",
    borderStrong: "rgba(236, 237, 243, 0.22)"
  },
  "morgentau-light": {
    bgBase: "#F3F8FA", surfaceWhite: "#FFFFFF", surfaceWarm: "#E7F0F4", surfaceHover: "#DCE8EE",
    raccoonDark: "#2E3B4E", raccoonMid: "#536378",
    sage: "#B5DCE8", sageStrong: "#1F6074",
    peach: "#F9DFC6", peachStrong: "#944F1E",
    lilac: "#C8D3F5", lilacStrong: "#39488E",
    statusOk: "#3B98AE", statusWarn: "#DC8541", statusErr: "#D6666D",
    borderStrong: "rgba(46, 59, 78, 0.22)"
  },
  "morgentau-dark": {
    bgBase: "#1E232A", surfaceWhite: "#272E37", surfaceWarm: "#303844", surfaceHover: "#3B4452",
    raccoonDark: "#E8EEF4", raccoonMid: "#B4C0CE",
    sage: "#315663", sageStrong: "#87D4E6",
    peach: "#684B39", peachStrong: "#F7C79E",
    lilac: "#424B74", lilacStrong: "#B8C6FF",
    statusOk: "#59B9CE", statusWarn: "#EC9854", statusErr: "#E47B82",
    borderStrong: "rgba(232, 238, 244, 0.22)"
  },
  "abenddaemmerung-light": {
    bgBase: "#F7F4F8", surfaceWhite: "#FFFFFF", surfaceWarm: "#EFEAF2", surfaceHover: "#E5DDE9",
    raccoonDark: "#3E354F", raccoonMid: "#635875",
    sage: "#BFE0D4", sageStrong: "#276852",
    peach: "#F5CDC4", peachStrong: "#933E30",
    lilac: "#D8C7F5", lilacStrong: "#533688",
    statusOk: "#3F9E78", statusWarn: "#DF7B57", statusErr: "#D5636E",
    borderStrong: "rgba(62, 53, 79, 0.22)"
  },
  "abenddaemmerung-dark": {
    bgBase: "#22202A", surfaceWhite: "#2C2936", surfaceWarm: "#353141", surfaceHover: "#403C4E",
    raccoonDark: "#ECE9F4", raccoonMid: "#BCB6CB",
    sage: "#355B4E", sageStrong: "#8ED4BA",
    peach: "#6B423B", peachStrong: "#F9B8AC",
    lilac: "#4E3E73", lilacStrong: "#CDB8FF",
    statusOk: "#5EC09B", statusWarn: "#ED8D69", statusErr: "#E67984",
    borderStrong: "rgba(236, 233, 244, 0.22)"
  },
  "metal-dark": {
    bgBase: "#090A0D", surfaceWhite: "#121419", surfaceWarm: "#191C22", surfaceHover: "#232730",
    raccoonDark: "#ECEFF4", raccoonMid: "#A3ABB8",
    sage: "#1D3B54", sageStrong: "#6BB4EA",
    peach: "#4D1922", peachStrong: "#EB6A78",
    lilac: "#232733", lilacStrong: "#A6B0C2",
    statusOk: "#46B884", statusWarn: "#E58C45", statusErr: "#E65A68",
    borderStrong: "rgba(255, 255, 255, 0.24)"
  }
};

function clampByte(n) {
  return Math.max(0, Math.min(255, Math.round(Number(n) || 0)));
}

function clampAlpha(a) {
  const num = Number(a);
  if (!Number.isFinite(num)) return 1;
  return Math.max(0, Math.min(1, Math.round(num * 100) / 100));
}

function parseCssColorToRgba(input, fallback = "#FAF7F2") {
  const raw = String(input || "").trim();
  const shortHex = raw.match(/^#([0-9a-f]{3})$/i);
  if (shortHex) {
    const h = shortHex[1];
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16),
      a: 1
    };
  }
  const hex6 = raw.match(/^#([0-9a-f]{6})$/i);
  if (hex6) {
    const h = hex6[1];
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: 1
    };
  }
  const hex8 = raw.match(/^#([0-9a-f]{8})$/i);
  if (hex8) {
    const h = hex8[1];
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: clampAlpha(parseInt(h.slice(6, 8), 16) / 255)
    };
  }
  const rgbMatch = raw.match(/^rgba?\(\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)(?:\s*,\s*([+-]?\d*(?:\.\d+)?%?))?\s*\)$/i);
  if (rgbMatch) {
    let a = 1;
    if (rgbMatch[4] !== undefined) {
      a = rgbMatch[4].endsWith("%") ? parseFloat(rgbMatch[4]) / 100 : parseFloat(rgbMatch[4]);
    }
    return {
      r: clampByte(rgbMatch[1]),
      g: clampByte(rgbMatch[2]),
      b: clampByte(rgbMatch[3]),
      a: clampAlpha(a)
    };
  }
  if (raw !== fallback && fallback) {
    return parseCssColorToRgba(fallback, "#FAF7F2");
  }
  return { r: 250, g: 247, b: 242, a: 1 };
}

function rgbaToExplicitString(rgba) {
  const r = clampByte(rgba?.r);
  const g = clampByte(rgba?.g);
  const b = clampByte(rgba?.b);
  const a = clampAlpha(rgba?.a);
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
}

function rgbaToCssString(rgba) {
  const r = clampByte(rgba?.r);
  const g = clampByte(rgba?.g);
  const b = clampByte(rgba?.b);
  const a = clampAlpha(rgba?.a);
  if (a >= 0.995) {
    return rgbaToHex({ r, g, b, a: 1 }, false);
  }
  return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(2))})`;
}

function rgbaToHex(rgba, includeAlpha = false) {
  const toHex = (v) => clampByte(v).toString(16).toUpperCase().padStart(2, "0");
  const base = `#${toHex(rgba?.r)}${toHex(rgba?.g)}${toHex(rgba?.b)}`;
  if (!includeAlpha) return base;
  return base + toHex(Math.round(clampAlpha(rgba?.a) * 255));
}

function rgbToHsv(rgba) {
  const r = clampByte(rgba?.r) / 255;
  const g = clampByte(rgba?.g) / 255;
  const b = clampByte(rgba?.b) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d > 0.00001) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return {
    h: Math.round(h * 360) % 360,
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}

function hsvToRgb(hsv) {
  const h = (((Number(hsv?.h) || 0) % 360) + 360) % 360;
  const s = Math.max(0, Math.min(100, Number(hsv?.s) || 0)) / 100;
  const v = Math.max(0, Math.min(100, Number(hsv?.v) || 0)) / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let rp = 0, gp = 0, bp = 0;
  if (h < 60) { rp = c; gp = x; }
  else if (h < 120) { rp = x; gp = c; }
  else if (h < 180) { gp = c; bp = x; }
  else if (h < 240) { gp = x; bp = c; }
  else if (h < 300) { rp = x; bp = c; }
  else { rp = c; bp = x; }
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255)
  };
}

function mixRgba(fg, bg, weight = 0.5) {
  const w = Math.max(0, Math.min(1, Number(weight)));
  const a = clampAlpha((fg.a * w) + (bg.a * (1 - w)));
  return {
    r: Math.round(fg.r * w + bg.r * (1 - w)),
    g: Math.round(fg.g * w + bg.g * (1 - w)),
    b: Math.round(fg.b * w + bg.b * (1 - w)),
    a: a
  };
}

function relativeLuminance(rgb) {
  const lin = (c) => {
    const s = clampByte(c) / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(rgb.r) + 0.7152 * lin(rgb.g) + 0.0722 * lin(rgb.b);
}

function sanitizeCustomThemeColors(rawColors) {
  const base = CUSTOM_THEME_TEMPLATES["waldlichtung-light"];
  const out = {};
  CUSTOM_THEME_COLOR_FIELDS.forEach(f => {
    const val = rawColors && typeof rawColors === "object" ? rawColors[f.key] : undefined;
    out[f.key] = rgbaToCssString(parseCssColorToRgba(val || base[f.key], base[f.key]));
  });
  return out;
}

function buildDerivedCustomThemeVars(rawColors) {
  const colors = sanitizeCustomThemeColors(rawColors);
  const c = {};
  CUSTOM_THEME_COLOR_FIELDS.forEach(f => {
    c[f.key] = parseCssColorToRgba(colors[f.key], f.def);
  });

  // Alpha über neutraler Fläche mischen, damit Hell/Dunkel-Erkennung stabil bleibt
  const bgComposited = mixRgba(c.bgBase, { r: 255, g: 255, b: 255, a: 1 }, c.bgBase.a);
  const isDark = relativeLuminance(bgComposited) < 0.44;
  const mutedRgba = mixRgba(c.raccoonMid, c.bgBase, 0.72);
  const sageSoftRgba = mixRgba(c.sage, c.surfaceWhite, 0.34);
  const peachSoftRgba = mixRgba(c.peach, c.surfaceWhite, 0.34);
  const lilacSoftRgba = mixRgba(c.lilac, c.surfaceWhite, 0.34);
  const wrongBgRgba = mixRgba(c.statusErr, c.surfaceWhite, isDark ? 0.32 : 0.25);
  const dotIdleRgba = mixRgba(c.raccoonMid, c.surfaceWarm, 0.36);

  const primaryLum = relativeLuminance(c.raccoonDark);
  const iconInkRgba = isDark
    ? mixRgba({ r: 255, g: 255, b: 255, a: 1 }, c.raccoonDark, 0.22)
    : mixRgba({ r: 0, g: 0, b: 0, a: 1 }, c.raccoonDark, 0.28);

  const cssVars = {
    "--bg-base": colors.bgBase,
    "--surface-white": colors.surfaceWhite,
    "--surface-card": colors.surfaceWhite,
    "--surface-warm": colors.surfaceWarm,
    "--surface-soft": colors.surfaceWarm,
    "--surface-hover": colors.surfaceHover,
    "--sage": colors.sage,
    "--sage-soft": rgbaToCssString(sageSoftRgba),
    "--sage-strong": colors.sageStrong,
    "--peach": colors.peach,
    "--peach-soft": rgbaToCssString(peachSoftRgba),
    "--peach-strong": colors.peachStrong,
    "--lilac": colors.lilac,
    "--lilac-soft": rgbaToCssString(lilacSoftRgba),
    "--lilac-strong": colors.lilacStrong,
    "--icon-ink": rgbaToCssString(iconInkRgba),
    "--raccoon-dark": colors.raccoonDark,
    "--raccoon-mid": colors.raccoonMid,
    "--raccoon-muted": rgbaToCssString(mutedRgba),
    "--text-muted": rgbaToCssString(mutedRgba),
    "--border-soft": `rgba(${c.borderStrong.r}, ${c.borderStrong.g}, ${c.borderStrong.b}, ${clampAlpha(c.borderStrong.a * 0.52)})`,
    "--border-strong": colors.borderStrong,
    "--tint-subtle": `rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.08)`,
    "--tint-subtle-soft": `rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.06)`,
    "--btn-primary-bg": colors.raccoonDark,
    "--btn-primary-fg": primaryLum > 0.52 ? "#1C1E26" : "#FFFFFF",
    "--on-strong-accent": relativeLuminance(c.sageStrong) > 0.45 ? "#1B1E24" : "#FFFFFF",
    "--mute-bg": `rgba(${c.statusErr.r}, ${c.statusErr.g}, ${c.statusErr.b}, 0.16)`,
    "--mute-border": `rgba(${c.statusErr.r}, ${c.statusErr.g}, ${c.statusErr.b}, 0.36)`,
    "--dot-idle-bg": rgbaToCssString(dotIdleRgba),
    "--piano-key-inactive-bg": isDark ? "#454956" : colors.surfaceWarm,
    "--piano-key-inactive-border": isDark ? "#595E6D" : rgba(inkRgb, 0.22),
    "--piano-key-inactive-text": isDark ? "#A4A9B8" : mutedHex,
    "--piano-white-active-bg": isDark ? "#DCE0E8" : colors.surfaceWhite,
    "--piano-white-active-ink": isDark ? "#22252F" : colors.raccoonDark,
    "--piano-black-bg-top": isDark ? "#1E212B" : "#3D405B",
    "--piano-black-bg-bottom": isDark ? "#15171E" : "#242639",
    "--piano-black-border": isDark ? "#0F1117" : "#1C1E2E",
    "--piano-black-out-bg": isDark ? "#5E6376" : "#8E91A2",
    "--piano-black-out-border": isDark ? "#323644" : "#66697A",
    "--piano-black-solfege-bg": colors.bgBase,
    "--piano-black-solfege-ink": colors.raccoonDark,
    "--key-wrong-bg": rgbaToCssString(wrongBgRgba),
    "--key-wrong-ink": isDark ? "#FFE2E2" : colors.raccoonDark,
    "--backdrop-scrim": isDark
      ? "rgba(16, 18, 24, 0.68)"
      : `rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.45)`,
    "--status-ok": colors.statusOk,
    "--status-warn": colors.statusWarn,
    "--status-err": colors.statusErr,
    "--shadow-card": isDark
      ? "0 4px 16px rgba(10, 12, 16, 0.28)"
      : `0 4px 16px rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.06)`,
    "--shadow-float": isDark
      ? "0 12px 30px rgba(8, 10, 14, 0.42)"
      : `0 10px 28px rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.14)`
  };

  const metaBg = rgbaToHex(bgComposited, false);
  const paletteMeta = {
    bg: metaBg,
    swatches: [colors.bgBase, colors.sage, colors.peach, colors.lilac],
    grid: `rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.22)`,
    zeroLine: `rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.12)`,
    track1Label: colors.sageStrong,
    track2Label: colors.peachStrong,
    track3Label: colors.raccoonDark,
    wave1: colors.statusOk,
    wave2: colors.statusWarn,
    wave3: colors.raccoonDark
  };

  return { colors, cssVars, isDark, metaBg, paletteMeta };
}

function sanitizeCustomThemeEntry(raw, slotIndex) {
  if (!raw || typeof raw !== "object") return null;
  const idx = Math.max(0, Math.min(2, Number(slotIndex) || 0));
  const id = CUSTOM_THEME_SLOT_IDS[idx];
  const fallbackName = `Eigenes Theme ${idx + 1}`;
  const name = String(raw.name || "").trim().slice(0, 28) || fallbackName;
  const built = buildDerivedCustomThemeVars(raw.colors || raw);
  return {
    id,
    slotIndex: idx,
    name,
    colors: built.colors,
    cssVars: built.cssVars,
    isDark: built.isDark,
    metaBg: built.metaBg,
    paletteMeta: built.paletteMeta,
    updatedAt: Number(raw.updatedAt) || Date.now()
  };
}

function sanitizeCustomThemesArray(rawList) {
  const result = [null, null, null];
  if (!Array.isArray(rawList)) return result;
  for (let i = 0; i < 3; i++) {
    const candidate = rawList[i] || rawList.find(item => item && item.id === CUSTOM_THEME_SLOT_IDS[i]);
    result[i] = sanitizeCustomThemeEntry(candidate, i);
  }
  return result;
}

function isCustomThemeStorageWritable() {
  try {
    if (typeof localStorage === "undefined") return false;
    const probeKey = "__lb_theme_probe__";
    localStorage.setItem(probeKey, "1");
    localStorage.removeItem(probeKey);
    return true;
  } catch (_err) {
    return false;
  }
}

function loadCustomThemesFromStorage() {
  try {
    if (typeof localStorage === "undefined") return [null, null, null];
    const raw = localStorage.getItem(CUSTOM_THEMES_STORAGE_KEY);
    if (!raw) return [null, null, null];
    return sanitizeCustomThemesArray(JSON.parse(raw));
  } catch (_err) {
    return [null, null, null];
  }
}

// Speichern fehlgeschlagen (Speicher voll, privater Modus, blockierte WebView):
// einmal pro Sitzung sichtbar warnen, statt Einstellungen still zu verlieren.
let _storageSaveWarningShown = false;
function notifyStorageSaveFailed() {
  if (_storageSaveWarningShown) return;
  if (typeof document === "undefined" || !document.getElementById("appToast") || typeof showAppToast !== "function") return;
  _storageSaveWarningShown = true;
  showAppToast(tr(
    "Einstellungen konnten nicht gespeichert werden – der Speicher ist voll oder blockiert. Sichere dein Profil über „Profil sichern“.",
    "Settings could not be saved – storage is full or blocked. Back up your profile via “Back Up Profile”.",
    {
      fr: "Impossible d’enregistrer les réglages – le stockage est plein ou bloqué. Sauvegarde ton profil via « Sauvegarder le profil ».",
      es: "No se pudieron guardar los ajustes: el almacenamiento está lleno o bloqueado. Haz una copia de tu perfil con «Guardar perfil».",
      it: "Impossibile salvare le impostazioni: lo spazio di archiviazione è pieno o bloccato. Salva il tuo profilo tramite «Salva profilo».",
      pl: "Nie udało się zapisać ustawień – pamięć jest pełna lub zablokowana. Zapisz profil przez „Zapisz profil”.",
      tr: "Ayarlar kaydedilemedi – depolama alanı dolu veya engelli. Profilini “Profili yedekle” ile yedekle.",
      uk: "Не вдалося зберегти налаштування – сховище заповнене або заблоковане. Збережи профіль через «Зберегти профіль».",
      ur: "سیٹنگز محفوظ نہیں ہو سکیں – اسٹوریج بھرا ہوا یا بند ہے۔ „پروفائل محفوظ کریں“ سے اپنا پروفائل محفوظ کریں۔",
      ar: "تعذّر حفظ الإعدادات – مساحة التخزين ممتلئة أو محظورة. احفظ ملفك الشخصي عبر «حفظ الملف الشخصي»."
    }
  ), "error", 6500);
}

function saveCustomThemesToStorage(slots) {
  const clean = sanitizeCustomThemesArray(slots);
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(CUSTOM_THEMES_STORAGE_KEY, JSON.stringify(clean));
    }
  } catch (_err) {
    notifyStorageSaveFailed();
  }
  syncNativeStorageMirror();
  return clean;
}

function applyCustomThemeCssVars(themeEntry) {
  if (typeof document === "undefined" || !document.documentElement || !themeEntry?.cssVars) return;
  const rootStyle = document.documentElement.style;
  if (!rootStyle || typeof rootStyle.setProperty !== "function") return;
  Object.entries(themeEntry.cssVars).forEach(([prop, val]) => {
    rootStyle.setProperty(prop, val);
  });
  rootStyle.colorScheme = themeEntry.isDark ? "dark" : "light";
}

function clearCustomThemeCssVars() {
  if (typeof document === "undefined" || !document.documentElement) return;
  const rootStyle = document.documentElement.style;
  if (!rootStyle || typeof rootStyle.removeProperty !== "function") return;
  CUSTOM_THEME_MANAGED_CSS_VARS.forEach(prop => {
    rootStyle.removeProperty(prop);
  });
  rootStyle.colorScheme = "";
}

const THEME_PALETTE_META = {
  waldlichtung: {
    light: {
      bg: "#FAF7F2",
      swatches: ["#FAF7F2", "#B8E0C8", "#FFD6BA", "#DCD3FF"],
      grid: "rgba(61, 64, 91, 0.25)",
      zeroLine: "rgba(61, 64, 91, 0.12)",
      track1Label: "#2E6F4E",
      track2Label: "#9C4A1A",
      track3Label: "#3D405B",
      wave1: "#48A878",
      wave2: "#E58C3A",
      wave3: "#3D405B"
    },
    dark: {
      bg: "#212329",
      swatches: ["#212329", "#385E4C", "#6B4737", "#4B4173"],
      grid: "rgba(236, 237, 243, 0.22)",
      zeroLine: "rgba(236, 237, 243, 0.12)",
      track1Label: "#8FD7B0",
      track2Label: "#FFC099",
      track3Label: "#ECEDF3",
      wave1: "#5EC290",
      wave2: "#F09C52",
      wave3: "#CABEFF"
    }
  },
  morgentau: {
    light: {
      bg: "#F3F8FA",
      swatches: ["#F3F8FA", "#B5DCE8", "#F9DFC6", "#C8D3F5"],
      grid: "rgba(46, 59, 78, 0.25)",
      zeroLine: "rgba(46, 59, 78, 0.12)",
      track1Label: "#1F6074",
      track2Label: "#944F1E",
      track3Label: "#2E3B4E",
      wave1: "#3B98AE",
      wave2: "#DC8541",
      wave3: "#2E3B4E"
    },
    dark: {
      bg: "#1E232A",
      swatches: ["#1E232A", "#315663", "#684B39", "#424B74"],
      grid: "rgba(232, 238, 244, 0.22)",
      zeroLine: "rgba(232, 238, 244, 0.12)",
      track1Label: "#87D4E6",
      track2Label: "#F7C79E",
      track3Label: "#E8EEF4",
      wave1: "#59B9CE",
      wave2: "#EC9854",
      wave3: "#B8C6FF"
    }
  },
  abenddaemmerung: {
    light: {
      bg: "#F7F4F8",
      swatches: ["#F7F4F8", "#BFE0D4", "#F5CDC4", "#D8C7F5"],
      grid: "rgba(62, 53, 79, 0.25)",
      zeroLine: "rgba(62, 53, 79, 0.12)",
      track1Label: "#276852",
      track2Label: "#933E30",
      track3Label: "#3E354F",
      wave1: "#3F9E78",
      wave2: "#DF7B57",
      wave3: "#3E354F"
    },
    dark: {
      bg: "#22202A",
      swatches: ["#22202A", "#355B4E", "#6B423B", "#4E3E73"],
      grid: "rgba(236, 233, 244, 0.22)",
      zeroLine: "rgba(236, 233, 244, 0.12)",
      track1Label: "#8ED4BA",
      track2Label: "#F9B8AC",
      track3Label: "#ECE9F4",
      wave1: "#5EC09B",
      wave2: "#ED8D69",
      wave3: "#CDB8FF"
    }
  },
  metal: {
    light: {
      bg: "#090A0D",
      swatches: ["#090A0D", "#2D6394", "#B52B3B", "#9EA6B4"],
      grid: "rgba(236, 239, 244, 0.22)",
      zeroLine: "rgba(236, 239, 244, 0.12)",
      track1Label: "#6BB4EA",
      track2Label: "#EB6A78",
      track3Label: "#ECEFF4",
      wave1: "#58A6E6",
      wave2: "#EB6A78",
      wave3: "#9EA6B4"
    },
    dark: {
      bg: "#090A0D",
      swatches: ["#090A0D", "#2D6394", "#B52B3B", "#9EA6B4"],
      grid: "rgba(236, 239, 244, 0.22)",
      zeroLine: "rgba(236, 239, 244, 0.12)",
      track1Label: "#6BB4EA",
      track2Label: "#EB6A78",
      track3Label: "#ECEFF4",
      wave1: "#58A6E6",
      wave2: "#EB6A78",
      wave3: "#9EA6B4"
    }
  },
  konzertsaal: {
    light: {
      bg: "#F5EDE0",
      swatches: ["#F5EDE0", "#D9B45A", "#872A31", "#2C5139"],
      grid: "rgba(45, 32, 22, 0.24)",
      zeroLine: "rgba(45, 32, 22, 0.12)",
      track1Label: "#7A5912",
      track2Label: "#872A31",
      track3Label: "#2D2016",
      wave1: "#B88A28",
      wave2: "#A8353B",
      wave3: "#2C5139"
    },
    dark: {
      bg: "#17120D",
      swatches: ["#17120D", "#E5C26B", "#872A31", "#A6CCA6"],
      grid: "rgba(245, 236, 220, 0.22)",
      zeroLine: "rgba(245, 236, 220, 0.12)",
      track1Label: "#EAC974",
      track2Label: "#ED9D96",
      track3Label: "#F5ECDC",
      wave1: "#E5C26B",
      wave2: "#D96B70",
      wave3: "#A6CCA6"
    }
  },
  mitternacht: {
    light: {
      bg: "#0A0F1F",
      swatches: ["#0A0F1F", "#F4BE5E", "#74B5FF", "#58DCD0"],
      grid: "rgba(236, 242, 255, 0.22)",
      zeroLine: "rgba(236, 242, 255, 0.12)",
      track1Label: "#74B5FF",
      track2Label: "#F4BE5E",
      track3Label: "#ECF2FF",
      wave1: "#74B5FF",
      wave2: "#F4BE5E",
      wave3: "#58DCD0"
    },
    dark: {
      bg: "#0A0F1F",
      swatches: ["#0A0F1F", "#F4BE5E", "#74B5FF", "#58DCD0"],
      grid: "rgba(236, 242, 255, 0.22)",
      zeroLine: "rgba(236, 242, 255, 0.12)",
      track1Label: "#74B5FF",
      track2Label: "#F4BE5E",
      track3Label: "#ECF2FF",
      wave1: "#74B5FF",
      wave2: "#F4BE5E",
      wave3: "#58DCD0"
    }
  }
};

function isFirstRunOnboardingNeeded() {
  try {
    if (typeof localStorage === "undefined") return false;
    const rawVisual = localStorage.getItem(VISUAL_PREFS_STORAGE_KEY);
    const rawProfile = localStorage.getItem(PERSONAL_PROFILE_STORAGE_KEY);
    if (!rawVisual && !rawProfile) return true;
    if (rawVisual) {
      const parsed = JSON.parse(rawVisual);
      if (parsed && parsed.onboardingDone === false) return true;
    }
    return false;
  } catch (_err) {
    return false;
  }
}

function loadVisualPrefs() {
  try {
    if (typeof localStorage === "undefined") {
      return { appearance: "light", theme: "waldlichtung", language: "de", autoNextAfterCorrect: true, playCorrectAnswerAudio: true, onboardingDone: true };
    }
    const raw = localStorage.getItem(VISUAL_PREFS_STORAGE_KEY);
    if (!raw) {
      const hasProfile = Boolean(localStorage.getItem(PERSONAL_PROFILE_STORAGE_KEY));
      return { appearance: "light", theme: "waldlichtung", language: "de", autoNextAfterCorrect: true, playCorrectAnswerAudio: true, onboardingDone: hasProfile };
    }
    const parsed = JSON.parse(raw);
    return {
      appearance: VALID_APPEARANCES.includes(parsed?.appearance) ? parsed.appearance : "light",
      theme: ALL_VALID_THEMES.includes(parsed?.theme) ? parsed.theme : "waldlichtung",
      language: typeof normalizeAppLanguage === "function" ? normalizeAppLanguage(parsed?.language) : (parsed?.language === "en" ? "en" : "de"),
      autoNextAfterCorrect: parsed?.autoNextAfterCorrect !== false,
      playCorrectAnswerAudio: parsed?.playCorrectAnswerAudio !== false,
      onboardingDone: parsed?.onboardingDone !== false
    };
  } catch (_err) {
    return { appearance: "light", theme: "waldlichtung", language: "de", autoNextAfterCorrect: true, playCorrectAnswerAudio: true, onboardingDone: true };
  }
}

const NATIVE_STORAGE_MIRROR_PATH = "lauscher-local-mirror-v1.json";
let _nativeMirrorTimerId = null;

function getNativeMirrorFilesystem() {
  if (typeof window === "undefined") return null;
  const cap = window.Capacitor;
  if (!cap) return null;
  const isNative = typeof cap.isNativePlatform === "function" ? cap.isNativePlatform() : Boolean(cap.isNative);
  if (!isNative) return null;
  const fs = cap.Plugins?.Filesystem || null;
  return (fs && typeof fs.writeFile === "function" && typeof fs.readFile === "function") ? fs : null;
}

function writeNativeStorageMirrorNow() {
  const fs = getNativeMirrorFilesystem();
  if (!fs || typeof localStorage === "undefined") return;
  try {
    const visual = localStorage.getItem(VISUAL_PREFS_STORAGE_KEY);
    const profile = localStorage.getItem(PERSONAL_PROFILE_STORAGE_KEY);
    const customThemes = localStorage.getItem(CUSTOM_THEMES_STORAGE_KEY);
    if (!visual && !profile && !customThemes) return;
    const payload = JSON.stringify({ v: 1, visual, profile, customThemes });
    Promise.resolve(fs.writeFile({
      path: NATIVE_STORAGE_MIRROR_PATH,
      data: payload,
      directory: "DATA",
      encoding: "utf8"
    })).catch(() => {});
  } catch (_err) {}
}

function syncNativeStorageMirror(immediate = false) {
  if (!getNativeMirrorFilesystem()) return;
  if (_nativeMirrorTimerId !== null) {
    clearTimeout(_nativeMirrorTimerId);
    _nativeMirrorTimerId = null;
  }
  if (immediate) {
    writeNativeStorageMirrorNow();
  } else {
    _nativeMirrorTimerId = setTimeout(() => {
      _nativeMirrorTimerId = null;
      writeNativeStorageMirrorNow();
    }, 120);
  }
}

function clearNativeStorageMirror() {
  if (_nativeMirrorTimerId !== null) {
    clearTimeout(_nativeMirrorTimerId);
    _nativeMirrorTimerId = null;
  }
  const fs = getNativeMirrorFilesystem();
  if (!fs || typeof fs.deleteFile !== "function") return;
  Promise.resolve(fs.deleteFile({
    path: NATIVE_STORAGE_MIRROR_PATH,
    directory: "DATA"
  })).catch(() => {});
}

async function restoreNativeStorageMirrorIfNeeded() {
  const fs = getNativeMirrorFilesystem();
  if (!fs || typeof localStorage === "undefined") return false;
  try {
    const hasVisual = Boolean(localStorage.getItem(VISUAL_PREFS_STORAGE_KEY));
    const hasProfile = Boolean(localStorage.getItem(PERSONAL_PROFILE_STORAGE_KEY));
    if (hasVisual || hasProfile) return false;
    const res = await fs.readFile({
      path: NATIVE_STORAGE_MIRROR_PATH,
      directory: "DATA",
      encoding: "utf8"
    });
    const raw = typeof res?.data === "string" ? res.data : "";
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return false;
    let restoredAny = false;
    if (typeof parsed.visual === "string" && parsed.visual) {
      localStorage.setItem(VISUAL_PREFS_STORAGE_KEY, parsed.visual);
      restoredAny = true;
    }
    if (typeof parsed.profile === "string" && parsed.profile) {
      localStorage.setItem(PERSONAL_PROFILE_STORAGE_KEY, parsed.profile);
      restoredAny = true;
    }
    if (typeof parsed.customThemes === "string" && parsed.customThemes) {
      localStorage.setItem(CUSTOM_THEMES_STORAGE_KEY, parsed.customThemes);
      restoredAny = true;
    }
    return restoredAny;
  } catch (_err) {
    return false;
  }
}

function saveVisualPrefs(
  appearance,
  theme,
  language = (typeof state !== "undefined" ? state?.settings?.language : null),
  autoNextAfterCorrect = (typeof state !== "undefined" ? state?.settings?.autoNextAfterCorrect : true),
  playCorrectAnswerAudio = (typeof state !== "undefined" ? state?.settings?.playCorrectAnswerAudio : true),
  onboardingDone = (typeof state !== "undefined" ? state?.settings?.onboardingDone : true)
) {
  try {
    if (typeof localStorage === "undefined") return;
    const validLang = typeof normalizeAppLanguage === "function" ? normalizeAppLanguage(language) : (language === "en" ? "en" : "de");
    const validAutoNext = autoNextAfterCorrect !== false;
    const validAnswerAudio = playCorrectAnswerAudio !== false;
    const validOnboardingDone = onboardingDone !== false;
    localStorage.setItem(
      VISUAL_PREFS_STORAGE_KEY,
      JSON.stringify({
        appearance,
        theme,
        language: validLang,
        autoNextAfterCorrect: validAutoNext,
        playCorrectAnswerAudio: validAnswerAudio,
        onboardingDone: validOnboardingDone
      })
    );
    syncNativeStorageMirror();
  } catch (_err) {
    notifyStorageSaveFailed();
  }
}

const PERSONAL_PROFILE_STORAGE_KEY = "lauschebaer_profile_v1";
const PROFILE_INSTRUMENT_OPTIONS = ["Klavier", "Gitarre", "Gesang", "Bass", "Percussion", "Streicher", "Bläser", "Produktion"];
const PROFILE_FOCUS_OPTIONS = {
  allround:   { key: "allround",   label: "Allrounder",           hint: "Quer durch alle Übungen",          mode: "cadence" },
  harmony:    { key: "harmony",    label: "Akkorde & Harmonie",   hint: "Kadenzen & Mehrklänge schärfen",   mode: "cadence" },
  melody:     { key: "melody",     label: "Melodie & Gehör",      hint: "Solfège & Melodie-Linien üben",    mode: "melody" },
  rhythm:     { key: "rhythm",     label: "Rhythmus & Groove",    hint: "Metrum, Klopfen & Mikro-Timing",   mode: "rhythm-tap" },
  notation:   { key: "notation",   label: "Notation & Lesen",     hint: "Violin-, Bass-, Altschlüssel & Hilfslinien", mode: "notation-treble" },
  production: { key: "production", label: "Produktion & Mixing",  hint: "Frequenzen & EQ im Noise üben",    mode: "prod-eq-noise" },
  modes:      { key: "modes",      label: "Tonleitern & Modi",    hint: "Kirchentonarten & Charaktertöne",  mode: "modes-scale" }
};
const PROFILE_FOCUS_CATEGORY_MAP = {
  allround:   [],
  harmony:    ["chords", "cadence"],
  melody:     ["interval", "solfege", "melody"],
  rhythm:     ["rhythm"],
  notation:   ["notation"],
  production: ["production"],
  modes:      ["modes"]
};

function getFocusedHomeCategories(profile = state?.profile) {
  const focusKeys = getResolvedProfileFocuses(profile);
  const cats = new Set();
  focusKeys.forEach(fk => {
    if (fk === "allround") return;
    (PROFILE_FOCUS_CATEGORY_MAP[fk] || []).forEach(cat => cats.add(cat));
  });
  return cats;
}
const PROFILE_ACCESSORY_OPTIONS = [
  { key: "headphones", label: "Kopfhörer" },
  { key: "sunglasses", label: "Sonnenbrille" },
  { key: "beret",      label: "Jazz-Barett" },
  { key: "bowtie",     label: "Konzert-Fliege" },
  { key: "mic",        label: "Studio-Mikro" },
  { key: "coffee",     label: "Kaffeepause" },
  { key: "notes",      label: "Noten-Flair" },
  { key: "sparkles",   label: "Sternen-Glanz" }
];
const PROFILE_ACCESSORY_NONE_KEY = "none";

function normalizeProfileFocuses(rawFocuses, fallbackFocus) {
  const validKeys = Object.keys(PROFILE_FOCUS_OPTIONS);
  const src = Array.isArray(rawFocuses)
    ? rawFocuses
    : (typeof rawFocuses === "string" ? [rawFocuses] : []);
  const set = new Set(src.filter(k => Object.prototype.hasOwnProperty.call(PROFILE_FOCUS_OPTIONS, k)));
  if (set.size === 0 && Object.prototype.hasOwnProperty.call(PROFILE_FOCUS_OPTIONS, fallbackFocus)) {
    set.add(fallbackFocus);
  }
  const specific = validKeys.filter(k => k !== "allround" && set.has(k));
  return specific.length > 0 ? specific : ["allround"];
}

function getResolvedProfileFocuses(profile = state?.profile) {
  if (!profile) return ["allround"];
  const arr = Array.isArray(profile.focuses) ? normalizeProfileFocuses(profile.focuses) : null;
  if (!arr) return normalizeProfileFocuses(null, profile.focus);
  const singlePrimary = arr[0] || "allround";
  if (arr.length <= 1 && typeof profile.focus === "string" && Object.prototype.hasOwnProperty.call(PROFILE_FOCUS_OPTIONS, profile.focus) && profile.focus !== singlePrimary) {
    return [profile.focus];
  }
  return arr;
}

function toggleProfileFocusValue(currentList, nextKey) {
  const validKeys = Object.keys(PROFILE_FOCUS_OPTIONS);
  if (nextKey === "allround" || !Object.prototype.hasOwnProperty.call(PROFILE_FOCUS_OPTIONS, nextKey)) {
    return ["allround"];
  }
  const set = new Set((currentList || []).filter(k => k !== "allround" && Object.prototype.hasOwnProperty.call(PROFILE_FOCUS_OPTIONS, k)));
  if (set.has(nextKey)) set.delete(nextKey);
  else set.add(nextKey);
  const next = validKeys.filter(k => k !== "allround" && set.has(k));
  return next.length > 0 ? next : ["allround"];
}

function normalizeProfileAccessories(rawAccessories, fallbackAccessory) {
  const validOrder = PROFILE_ACCESSORY_OPTIONS.map(a => a.key);
  if (Array.isArray(rawAccessories)) {
    const set = new Set(rawAccessories.filter(k => validOrder.includes(k)));
    return validOrder.filter(k => set.has(k));
  }
  if (fallbackAccessory === PROFILE_ACCESSORY_NONE_KEY) {
    return [];
  }
  if (typeof fallbackAccessory === "string" && validOrder.includes(fallbackAccessory)) {
    return [fallbackAccessory];
  }
  return [];
}

function getResolvedProfileAccessories(profile = state?.profile) {
  if (!profile) return [];
  const validOrder = PROFILE_ACCESSORY_OPTIONS.map(a => a.key);
  const arr = Array.isArray(profile.companionAccessories)
    ? validOrder.filter(k => profile.companionAccessories.includes(k))
    : null;
  if (!arr) {
    return normalizeProfileAccessories(null, profile.companionAccessory);
  }
  const singlePrimary = arr[0] || PROFILE_ACCESSORY_NONE_KEY;
  if (arr.length <= 1 && typeof profile.companionAccessory === "string" && profile.companionAccessory !== singlePrimary) {
    if (profile.companionAccessory === PROFILE_ACCESSORY_NONE_KEY) return [];
    if (validOrder.includes(profile.companionAccessory)) return [profile.companionAccessory];
  }
  return arr;
}

function toggleProfileAccessoryValue(currentList, nextKey) {
  const validOrder = PROFILE_ACCESSORY_OPTIONS.map(a => a.key);
  if (nextKey === PROFILE_ACCESSORY_NONE_KEY || !validOrder.includes(nextKey)) {
    return nextKey === PROFILE_ACCESSORY_NONE_KEY ? [] : validOrder.filter(k => (currentList || []).includes(k));
  }
  const set = new Set((currentList || []).filter(k => validOrder.includes(k)));
  if (set.has(nextKey)) set.delete(nextKey);
  else set.add(nextKey);
  return validOrder.filter(k => set.has(k));
}
const MIX_MODE_CATALOG = {
  "cadence":               { label: "Kadenzen",                     levels: [1, 2, 3, 4] },
  "cadence-minor":         { label: "Kadenzen (Moll)",              levels: [1, 2, 3, 4] },
  "interval-melodic":      { label: "Intervalle (Aufwärts)",          levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  "interval-melodic-down": { label: "Intervalle (Abwärts)",           levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  "interval-harmonic":     { label: "Intervalle (Gleichz.)",          levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  "interval-drone":        { label: "Intervalle (Grundton-Fläche)",   levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  "chord-arp-up":          { label: "Akkorde (Arpeggio ↗)",         levels: [1, 2, 3, 4] },
  "chord-arp-down":        { label: "Akkorde (Arpeggio ↘)",         levels: [1, 2, 3, 4] },
  "interval-chords":       { label: "Akkorde (Gleichz.)",           levels: [1, 2, 3, 4] },
  "chord-inversions":      { label: "Akkordumkehrungen",            levels: [1, 2, 3] },
  "solfege":               { label: "Solfège",                      levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
  "melody":                { label: "Melodie-Phrasen",              levels: ["do-fa", "sol-do", "full"] },
  "rhythm-meter":          { label: "Rhythmus • Taktart",           levels: [1, 2, 3] },
  "rhythm-dictation":      { label: "Rhythmus • Diktat",            levels: [1, 2, 3, 4] },
  "rhythm-tap":            { label: "Rhythmus • Nachklopfen",       levels: [1, 2, 3, 4] },
  "rhythm-groove":         { label: "Rhythmus • Groove",            levels: [1, 2, 3, 4] },
  "prod-tone":             { label: "Produktion • Frequenzen",      levels: [1, 2, 3] },
  "prod-eq-noise":         { label: "Produktion • EQ im Noise",     levels: [1, 2, 3] },
  "modes-scale":           { label: "Modi • Tonleitern erkennen",   levels: [1, 2, 3] },
  "modes-char":            { label: "Modi • Charakterton",          levels: [1, 2, 3] },
  "modes-cadence":         { label: "Modi • Kadenzen & Akkordpendel",      levels: [1, 2] },
  "notation-treble":       { label: "Notation • Violinschlüssel",   levels: [1, 2, 3, 4] },
  "notation-bass":         { label: "Notation • Bassschlüssel",     levels: [1, 2, 3, 4] },
  "notation-alto":         { label: "Notation • Altschlüssel",      levels: [1, 2, 3, 4] },
  "notation-mixed":        { label: "Notation • Schlüssel-Mix",     levels: [1, 2, 3, 4] },
  "notation-grand":        { label: "Notation • Doppelsystem",      levels: [1, 2, 3, 4, 5] },
  "notation-chords":       { label: "Notation • Akkorde lesen",     levels: [1, 2, 3, 4] },
  "notation-symbols":      { label: "Notation • Symbole & Begriffe", levels: [1, 2, 3, 4, 5] }
};

// Unterübungen „… treffen“: Lauscher hört per Mikrofon zu, ob du den gesuchten Ton singst
// (js/sing-match.js). Bewusst nicht in MIX_MODE_CATALOG (keine Übe-Mixe mit Mikrofon).
const SING_MATCH_MODE_CATALOG = {
  "sing-interval": { label: "Intervalle treffen", levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  "sing-degree":   { label: "Stufen treffen",     levels: [1, 2, 3, 4, 5] }
};

function isSingMatchMode(mode) {
  return Object.prototype.hasOwnProperty.call(SING_MATCH_MODE_CATALOG, String(mode || ""));
}

// Aktive MIDI-Spielübungen (js/midi-play.js): Intervalle spielen, Akkorde greifen,
// Tonleitern & Modi spielen. Bewusst nicht in MIX_MODE_CATALOG (erwarten ein MIDI-Instrument).
const MIDI_PLAY_MODE_CATALOG = {
  "midi-interval": { label: "Intervalle spielen",         levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  "midi-chord":    { label: "Akkorde greifen",            levels: [1, 2, 3, 4] },
  "midi-scale":    { label: "Tonleitern & Modi spielen",  levels: [1, 2, 3] }
};

function isMidiPlayMode(mode) {
  return Object.prototype.hasOwnProperty.call(MIDI_PLAY_MODE_CATALOG, String(mode || ""));
}

function createDefaultMixes() {
  return [
    { id: "mix_warmup",    title: "Morgen-Warmup",      mode: "solfege",          level: 3,       melodyRange: "do-fa", melodyKeyMode: "fixed", melodyOctaveMode: "single", bpm: 0 },
    { id: "mix_intervals", title: "Intervall-Fokus",    mode: "interval-melodic", level: 2,       melodyRange: "do-fa", melodyKeyMode: "fixed", melodyOctaveMode: "single", bpm: 0 },
    { id: "mix_groove",    title: "Timing & Blindflug", mode: "rhythm-tap",       level: 4,       melodyRange: "do-fa", melodyKeyMode: "fixed", melodyOctaveMode: "single", bpm: 85 }
  ];
}

const EXAM_CATEGORY_LEVELS = {
  interval: {
    accent: "peach",
    presets: [
      {
        id: "interval_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Dur Grundlagen", en: "Level 1 • Major Foundations" },
        desc: {
          de: "Prime, gr. Terz, Quinte & Oktave (Aufwärts, Abwärts, Harmonisch & Grundton-Fläche)",
          en: "Unison, Maj 3rd, 5th & Octave (Ascending, Descending, Harmonic & Root Pad)"
        },
        modes: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone"],
        apply: { intervalDifficulty: 1, keyMode: "fixed" }
      },
      {
        id: "interval_dur_halves",
        levelNumber: 2,
        title: { de: "Stufe 2 • Dur Tonleiter-Hälften (1–4 & 5–8)", en: "Level 2 • Major Scale Halves (1–4 & 5–8)" },
        desc: {
          de: "Unteres (1–4) & oberes (5–8) Dur-Tetrachord im Wechsel über leichte Tonarten",
          en: "Lower (1–4) & upper (5–8) major tetrachords alternating across easy keys"
        },
        modes: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone"],
        difficultyCycle: [2, 3],
        apply: { intervalDifficulty: 2, keyMode: "easy" }
      },
      {
        id: "interval_l2",
        levelNumber: 3,
        title: { de: "Stufe 3 • Dur-Tonleiter (1–8)", en: "Level 3 • Major Scale (1–8)" },
        desc: {
          de: "Alle 8 diatonischen Dur-Intervalle gemischt über leichte Tonarten (inkl. Grundton-Fläche)",
          en: "All 8 diatonic major intervals mixed across easy keys (incl. root pad)"
        },
        modes: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone"],
        apply: { intervalDifficulty: 4, keyMode: "easy" }
      },
      {
        id: "interval_minor_l1",
        levelNumber: 1,
        badge: { de: "Moll • Stufe 1", en: "Minor • Level 1" },
        title: { de: "Moll • Grundlagen", en: "Minor • Foundations" },
        desc: {
          de: "Prime, kl. Terz, Quinte & Oktave (Aufwärts, Abwärts, Harmonisch & Grundton-Fläche)",
          en: "Unison, Min 3rd, 5th & Octave (Ascending, Descending, Harmonic & Root Pad)"
        },
        modes: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone"],
        apply: { intervalDifficulty: 6, keyMode: "fixed" }
      },
      {
        id: "interval_minor_halves",
        levelNumber: 2,
        badge: { de: "Moll • Stufe 2", en: "Minor • Level 2" },
        title: { de: "Moll • Tonleiter-Hälften (1–4 & 5–8)", en: "Minor • Scale Halves (1–4 & 5–8)" },
        desc: {
          de: "Unteres (1–4) & oberes (5–8) Moll-Tetrachord im Wechsel über leichte Tonarten",
          en: "Lower (1–4) & upper (5–8) minor tetrachords alternating across easy keys"
        },
        modes: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone"],
        difficultyCycle: [7, 8],
        apply: { intervalDifficulty: 7, keyMode: "easy" }
      },
      {
        id: "interval_minor_l2",
        levelNumber: 3,
        badge: { de: "Moll • Stufe 3", en: "Minor • Level 3" },
        title: { de: "Moll • Ganze Tonleiter (1–8)", en: "Minor • Full Scale (1–8)" },
        desc: {
          de: "Alle 8 Intervalle in Natürlich Moll inkl. kl. Terz, kl. Sexte & kl. Septime",
          en: "All 8 natural minor intervals incl. min 3rd, min 6th & min 7th"
        },
        modes: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone"],
        apply: { intervalDifficulty: 9, keyMode: "easy" }
      },
      {
        id: "interval_major_minor",
        levelNumber: 4,
        title: { de: "Stufe 4 • Dur & Moll gemischt", en: "Level 4 • Major & Minor Mixed" },
        desc: {
          de: "Alle 11 Dur- & Moll-Intervalle direkt gemischt (kl./gr. Terz, Sexte & Septime) in allen 12 Tonarten",
          en: "All 11 major & minor intervals mixed head-to-head (min/maj 3rd, 6th & 7th) across all 12 keys"
        },
        modes: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone"],
        fixedIntervalPool: ["P1", "M2", "m3", "M3", "P4", "P5", "m6", "M6", "m7", "M7", "P8"],
        apply: { intervalDifficulty: 5, keyMode: "all" }
      },
      {
        id: "interval_l3",
        levelNumber: 5,
        title: { de: "Stufe 5 • Chromatisch (Alle 15 Intervalle)", en: "Level 5 • Chromatic (All 15 Intervals)" },
        desc: {
          de: "Gesamtes chromatisches Spektrum inkl. kl. Sekunde, Tritonus, kl./gr. Intervalle & Nonen",
          en: "Full chromatic spectrum incl. min 2nd, tritone, minor/major intervals & ninths"
        },
        modes: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone"],
        apply: { intervalDifficulty: 5, keyMode: "all" }
      },
      {
        id: "interval_custom",
        levelNumber: 6,
        badge: { de: "Freie Wahl", en: "Custom" },
        isCustomIntervalExam: true,
        title: { de: "Freie Tonart & Modi", en: "Custom Key & Modes" },
        desc: {
          de: "Prüfe deine selbst gewählte Tonart, Skala/Kirchentonart & Tonleiter-Ausschnitt unter Prüfungsbedingungen",
          en: "Test your chosen root key, scale/mode & scale range under full exam conditions"
        },
        modes: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone"],
        apply: { intervalDifficulty: 10 }
      },
      {
        id: "midi_interval_l1",
        levelNumber: 1,
        examGroup: "play",
        badge: { de: "Spielen • Stufe 1", en: "Play • Level 1" },
        title: { de: "Intervalle spielen • Grundlagen", en: "Play Intervals • Foundations" },
        desc: {
          de: "Prime, Terzen, Quarte, Quinte & Oktave aufwärts am MIDI-Keyboard oder auf der Klaviatur",
          en: "Unison, 3rds, 4th, 5th & octave ascending on MIDI or on-screen keyboard"
        },
        modes: ["midi-interval"],
        apply: { midiIntervalDifficulty: 2, midiIntervalDirection: "up" }
      },
      {
        id: "midi_interval_l2",
        levelNumber: 2,
        examGroup: "play",
        badge: { de: "Spielen • Stufe 2", en: "Play • Level 2" },
        title: { de: "Intervalle spielen • Alle Oktav-Intervalle", en: "Play Intervals • Full Octave" },
        desc: {
          de: "Alle 12 Intervalle bis zur Oktave aufwärts & abwärts gemischt spielen",
          en: "Play all 12 intervals up to the octave in mixed ascending & descending directions"
        },
        modes: ["midi-interval"],
        apply: { midiIntervalDifficulty: 6, midiIntervalDirection: "mixed" }
      },
      {
        id: "midi_interval_l3",
        levelNumber: 3,
        examGroup: "play",
        badge: { de: "Spielen • Stufe 3", en: "Play • Level 3" },
        title: { de: "Intervalle spielen • Profi (inkl. Nonen)", en: "Play Intervals • Pro (incl. Ninths)" },
        desc: {
          de: "Alle Intervalle inkl. Tritonus, kl. & gr. None in gemischten Richtungen",
          en: "All intervals incl. tritone, minor & major ninth in mixed directions"
        },
        modes: ["midi-interval"],
        apply: { midiIntervalDifficulty: 9, midiIntervalDirection: "mixed" }
      }
    ]
  },
  chords: {
    accent: "sage",
    presets: [
      {
        id: "chords_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Basis-Dreiklänge & Lagen", en: "Level 1 • Basic Triads & Inversions" },
        desc: {
          de: "Dur, Moll, Vermindert, Übermäßig & Dreiklang-Umkehrungen (Arp ↗/↘, Akkord & Bass)",
          en: "Major, Minor, Diminished, Augmented & Triad Inversions (Arp ↗/↘, Block & Bass)"
        },
        modes: ["chord-arp-up", "chord-arp-down", "interval-chords", "chord-inversions"],
        apply: { chordDifficulty: 1, chordInversionDifficulty: 1, keyMode: "fixed" }
      },
      {
        id: "chords_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Septakkorde & Lagen", en: "Level 2 • Seventh Chords & Inversions" },
        desc: {
          de: "Dreiklänge + Maj7 & Dom7 sowie 1./2. Umkehrung in leichten Tonarten",
          en: "Triads + Maj7 & Dom7 plus 1st/2nd inversions in easy keys"
        },
        modes: ["chord-arp-up", "chord-arp-down", "interval-chords", "chord-inversions"],
        apply: { chordDifficulty: 2, chordInversionDifficulty: 2, keyMode: "easy" }
      },
      {
        id: "chords_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • Alle Vierklänge", en: "Level 3 • All Seventh Chords" },
        desc: {
          de: "Vollständiges Akkord- & Umkehrungsspektrum (inkl. m7, m7b5 & 3. Umkehrung)",
          en: "Full chord quality & inversion spectrum (incl. m7, m7b5 & 3rd inversion)"
        },
        modes: ["chord-arp-up", "chord-arp-down", "interval-chords", "chord-inversions"],
        apply: { chordDifficulty: 3, chordInversionDifficulty: 3, keyMode: "easy" }
      },
      {
        id: "chords_l4",
        levelNumber: 4,
        title: { de: "Stufe 4 • Profi-Harmonik", en: "Level 4 • Pro Harmony" },
        desc: {
          de: "Alle Akkordtypen & Umkehrungen in allen 12 Tonarten",
          en: "All chord types & inversions modulated across all 12 keys"
        },
        modes: ["chord-arp-up", "chord-arp-down", "interval-chords", "chord-inversions"],
        apply: { chordDifficulty: 3, chordInversionDifficulty: 3, keyMode: "all" }
      },
      {
        id: "midi_chord_l1",
        levelNumber: 1,
        examGroup: "play",
        badge: { de: "Spielen • Stufe 1", en: "Play • Level 1" },
        title: { de: "Akkorde greifen • Dur & Moll", en: "Play Chords • Major & Minor" },
        desc: {
          de: "Dur- und Moll-Dreiklänge direkt auf dem MIDI-Keyboard oder der Klaviatur greifen",
          en: "Play major and minor triads directly on MIDI or on-screen keyboard"
        },
        modes: ["midi-chord"],
        apply: { midiChordDifficulty: 1 }
      },
      {
        id: "midi_chord_l2",
        levelNumber: 2,
        examGroup: "play",
        badge: { de: "Spielen • Stufe 2", en: "Play • Level 2" },
        title: { de: "Akkorde greifen • Alle Dreiklänge", en: "Play Chords • All Triads" },
        desc: {
          de: "Dur, Moll, vermindert & übermäßig in allen Tonarten greifen",
          en: "Play major, minor, diminished & augmented triads across all keys"
        },
        modes: ["midi-chord"],
        apply: { midiChordDifficulty: 2 }
      },
      {
        id: "midi_chord_l3",
        levelNumber: 3,
        examGroup: "play",
        badge: { de: "Spielen • Stufe 3", en: "Play • Level 3" },
        title: { de: "Akkorde greifen • Umkehrungen", en: "Play Chords • Inversions" },
        desc: {
          de: "Dreiklänge in Grundstellung, 1. und 2. Umkehrung mit Basston-Prüfung",
          en: "Triads in root position, 1st and 2nd inversion with bass-note check"
        },
        modes: ["midi-chord"],
        apply: { midiChordDifficulty: 3 }
      },
      {
        id: "midi_chord_l4",
        levelNumber: 4,
        examGroup: "play",
        badge: { de: "Spielen • Stufe 4", en: "Play • Level 4" },
        title: { de: "Akkorde greifen • Vierklänge (Sept)", en: "Play Chords • 7th Chords" },
        desc: {
          de: "Maj7, Dominant-Sept, Moll-7 & Halbvermindert-7 sicher greifen",
          en: "Play Maj7, Dom7, Min7 & Half-diminished 7th chords"
        },
        modes: ["midi-chord"],
        apply: { midiChordDifficulty: 4 }
      }
    ]
  },
  cadence: {
    accent: "lilac",
    presets: [
      {
        id: "cadence_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Grundfunktionen", en: "Level 1 • Primary Functions" },
        desc: {
          de: "I, IV, V & vi an fester Zielposition (Takt 4) in C-Dur",
          en: "I, IV, V & vi on fixed target bar 4 in C Major"
        },
        modes: ["cadence"],
        apply: { difficulty: 1, cadencePos: "last", keyMode: "fixed" }
      },
      {
        id: "cadence_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Erweiterte Diatonik", en: "Level 2 • Extended Diatonic" },
        desc: {
          de: "I, ii, iii, IV, V & vi in leichten Tonarten",
          en: "I, ii, iii, IV, V & vi across easy keys"
        },
        modes: ["cadence"],
        apply: { difficulty: 2, cadencePos: "last", keyMode: "easy" }
      },
      {
        id: "cadence_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • V7 & Zwischendominante", en: "Level 3 • V7 & Secondary Dominant" },
        desc: {
          de: "7 Stufen inkl. V7 & V/V mit wechselndem Ziel-Takt (1–4)",
          en: "7 degrees incl. V7 & V/V with randomized target bar (1–4)"
        },
        modes: ["cadence"],
        apply: { difficulty: 3, cadencePos: "random", keyMode: "easy" }
      },
      {
        id: "cadence_l4",
        levelNumber: 4,
        title: { de: "Stufe 4 • Meister-Harmonik", en: "Level 4 • Master Harmony" },
        desc: {
          de: "Alle Stufen inkl. bII7 (Neapolitaner), zufälliger Takt & alle 12 Tonarten",
          en: "All degrees incl. bII7 (Neapolitan), random bar & all 12 keys"
        },
        modes: ["cadence"],
        apply: { difficulty: 4, cadencePos: "random", keyMode: "all" }
      },
      {
        id: "cadence_minor_l1",
        levelNumber: 1,
        title: { de: "Moll • Grundfunktionen", en: "Minor • Primary Functions" },
        desc: {
          de: "i, iv, V & VI an fester Zielposition (Takt 4) in c-Moll",
          en: "i, iv, V & VI on fixed target bar 4 in C minor"
        },
        modes: ["cadence-minor"],
        apply: { difficulty: 1, cadencePos: "last", keyMode: "fixed" }
      },
      {
        id: "cadence_minor_l2",
        levelNumber: 2,
        title: { de: "Moll • Erweiterte Diatonik", en: "Minor • Extended Diatonic" },
        desc: {
          de: "Alle leitereigenen Moll-Stufen inkl. v & V in leichten Tonarten",
          en: "All diatonic minor degrees incl. v & V across easy keys"
        },
        modes: ["cadence-minor"],
        apply: { difficulty: 2, cadencePos: "last", keyMode: "easy" }
      },
      {
        id: "cadence_minor_l3",
        levelNumber: 3,
        title: { de: "Moll • V7, V/V & Neapolitaner", en: "Minor • V7, V/V & Neapolitan" },
        desc: {
          de: "8 Stufen inkl. V7, V/V & N6 mit wechselndem Ziel-Takt (1–4)",
          en: "8 degrees incl. V7, V/V & N6 with randomized target bar (1–4)"
        },
        modes: ["cadence-minor"],
        apply: { difficulty: 3, cadencePos: "random", keyMode: "easy" }
      },
      {
        id: "cadence_minor_l4",
        levelNumber: 4,
        title: { de: "Moll • Meister-Harmonik", en: "Minor • Master Harmony" },
        desc: {
          de: "Moll-ii–V (iiø7), bII7, zufälliger Takt & alle 12 Tonarten",
          en: "Minor ii–V (iiø7), bII7, random bar & all 12 keys"
        },
        modes: ["cadence-minor"],
        apply: { difficulty: 4, cadencePos: "random", keyMode: "all" }
      }
    ]
  },
  solfege: {
    accent: "peach",
    presets: [
      {
        id: "solfege_dur_halves",
        levelNumber: 1,
        title: { de: "Stufe 1 • Dur Hälften (Do–Fa & Sol–Do)", en: "Level 1 • Major Halves (Do–Fa & Sol–Do)" },
        desc: {
          de: "Untere (Do–Fa) & obere (Sol–Do) Tonleiter-Hälfte im Wechsel in C-Dur (1 Oktave)",
          en: "Lower (Do–Fa) & upper (Sol–Do) scale halves alternating in C Major (1 octave)"
        },
        modes: ["solfege"],
        difficultyCycle: [1, 2],
        apply: { solfegeDifficulty: 1 }
      },
      {
        id: "solfege_l1",
        levelNumber: 2,
        title: { de: "Stufe 2 • Dur-Tonleiter (C-Dur, 1 Okt.)", en: "Level 2 • Major Scale (C Major, 1 Oct.)" },
        desc: {
          de: "Alle 7 Dur-Stufen (Do–Ti) mit fester C-Dur-Kadenz in einer Oktave",
          en: "All 7 major degrees (Do–Ti) anchored in C Major within 1 octave"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 3 }
      },
      {
        id: "solfege_l4",
        levelNumber: 3,
        title: { de: "Stufe 3 • Dur Feste Tonart (Mehrere Okt.)", en: "Level 3 • Major Fixed Key (Multi-Oct.)" },
        desc: {
          de: "Alle 7 Dur-Stufen in einer konstanten Nicht-C-Tonart über mehrere Oktaven",
          en: "All 7 major degrees in a steady non-C key across multiple octaves"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 6 }
      },
      {
        id: "solfege_l6",
        levelNumber: 4,
        title: { de: "Stufe 4 • Dur Tonartwechsel (Mehrere Okt.)", en: "Level 4 • Major Key Changes (Multi-Oct.)" },
        desc: {
          de: "Jede Frage wechselt in eine neue Dur-Tonart & Oktavlage",
          en: "Every question shifts to a new major key & octave register"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 8 }
      },
      {
        id: "solfege_minor_halves",
        levelNumber: 1,
        badge: { de: "Moll • Stufe 1", en: "Minor • Level 1" },
        title: { de: "Moll • Hälften (Do–Fa & Sol–Do)", en: "Minor • Halves (Do–Fa & Sol–Do)" },
        desc: {
          de: "Untere (Do–Fa) & obere (Sol–Do) Moll-Hälfte im Wechsel in c-Moll (1 Oktave)",
          en: "Lower (Do–Fa) & upper (Sol–Do) minor halves alternating in C Minor (1 octave)"
        },
        modes: ["solfege"],
        difficultyCycle: [9, 10],
        apply: { solfegeDifficulty: 9 }
      },
      {
        id: "solfege_minor_l1",
        levelNumber: 2,
        badge: { de: "Moll • Stufe 2", en: "Minor • Level 2" },
        title: { de: "Moll • Ganze Tonleiter (c-Moll, 1 Okt.)", en: "Minor • Full Scale (C Minor, 1 Oct.)" },
        desc: {
          de: "Alle 7 Stufen in Natürlich Moll (Do–Re–Me–Fa–Sol–Le–Te) in c-Moll",
          en: "All 7 Natural Minor degrees (Do–Re–Me–Fa–Sol–Le–Te) anchored in C Minor"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 11 }
      },
      {
        id: "solfege_minor_l3",
        levelNumber: 3,
        badge: { de: "Moll • Stufe 3", en: "Minor • Level 3" },
        title: { de: "Moll • Feste Tonart (Mehrere Okt.)", en: "Minor • Fixed Key (Multi-Oct.)" },
        desc: {
          de: "Alle 7 Moll-Stufen in einer konstanten Nicht-c-Tonart über mehrere Oktaven",
          en: "All 7 minor degrees in a steady non-C minor key across multiple octaves"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 14 }
      },
      {
        id: "solfege_minor_l4",
        levelNumber: 4,
        badge: { de: "Moll • Stufe 4", en: "Minor • Level 4" },
        title: { de: "Moll • Tonartwechsel (Mehrere Okt.)", en: "Minor • Key Changes (Multi-Oct.)" },
        desc: {
          de: "Jede Frage wechselt in eine neue Moll-Tonart & Oktavlage",
          en: "Every question shifts to a new minor key & octave register"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 16 }
      },
      {
        id: "solfege_major_minor",
        levelNumber: 5,
        badge: { de: "Meister", en: "Master" },
        title: { de: "Dur & Moll im Wechsel", en: "Major & Minor Mixed" },
        desc: {
          de: "Jede Frage wechselt zwischen Dur- (I–vi–IV–V) & Moll-Tonarten (i–VI–iv–V)",
          en: "Every question alternates between rotating Major (I–vi–IV–V) & Minor (i–VI–iv–V) keys"
        },
        modes: ["solfege"],
        difficultyCycle: [7, 15],
        apply: { solfegeDifficulty: 7 }
      },
      {
        id: "solfege_custom",
        levelNumber: 6,
        badge: { de: "Freie Wahl", en: "Custom" },
        isCustomSolfegeExam: true,
        title: { de: "Eigene Tonart (Dur & Moll)", en: "Custom Key (Major & Minor)" },
        desc: {
          de: "Prüfe deine selbst gewählte Dur- oder Moll-Tonart, Tonraum & Oktave unter Prüfungsbedingungen",
          en: "Test your chosen major or minor key, scale range & octave under full exam conditions"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 17 }
      }
    ]
  },
  modes: {
    accent: "sage",
    presets: [
      {
        id: "modes_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Basis-Modi", en: "Level 1 • Core Modes" },
        desc: {
          de: "Ionisch, Äolisch, Dorisch & Mixolydisch (Tonleiter, Charakterton & Akkordpendel)",
          en: "Ionian, Aeolian, Dorian & Mixolydian (Scale, Color Tone & Chord Loop)"
        },
        modes: ["modes-scale", "modes-char", "modes-cadence"],
        apply: { modesScaleDifficulty: 1, modesCharDifficulty: 1, modesCadenceDifficulty: 1 }
      },
      {
        id: "modes_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Erweiterte Modi", en: "Level 2 • Extended Modes" },
        desc: {
          de: "Zusätzlich Lydisch & Phrygisch in leichten Tonarten",
          en: "Adds Lydian & Phrygian across easy root pitches"
        },
        modes: ["modes-scale", "modes-char", "modes-cadence"],
        apply: { modesScaleDifficulty: 2, modesCharDifficulty: 2, modesCadenceDifficulty: 2 }
      },
      {
        id: "modes_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • Alle 8 Kirchentonarten", en: "Level 3 • All 8 Modes" },
        desc: {
          de: "Inkl. Lokrisch & Harmonisch Moll mit freien Grundtönen",
          en: "Includes Locrian & Harmonic Minor over rotating root notes"
        },
        modes: ["modes-scale", "modes-char", "modes-cadence"],
        apply: { modesScaleDifficulty: 3, modesCharDifficulty: 3, modesCadenceDifficulty: 2, keyMode: "random" }
      },
      {
        id: "midi_scale_l1",
        levelNumber: 1,
        examGroup: "play",
        badge: { de: "Spielen • Stufe 1", en: "Play • Level 1" },
        title: { de: "Tonleitern spielen • Dur & Moll", en: "Play Scales • Major & Minor" },
        desc: {
          de: "Dur- und natürliche Moll-Tonleitern komplett aufwärts durchspielen (anteilige Wertung)",
          en: "Play major and natural minor scales ascending in full (partial credit per step)"
        },
        modes: ["midi-scale"],
        apply: { midiScaleDifficulty: 1 }
      },
      {
        id: "midi_scale_l2",
        levelNumber: 2,
        examGroup: "play",
        badge: { de: "Spielen • Stufe 2", en: "Play • Level 2" },
        title: { de: "Modi spielen • Alle 7 Kirchentonarten", en: "Play Modes • All 7 Church Modes" },
        desc: {
          de: "Ionisch bis Lokrisch aufwärts durchspielen mit stufengenauer Fehler-Rückschau",
          en: "Play Ionian through Locrian ascending with step-by-step error review"
        },
        modes: ["midi-scale"],
        apply: { midiScaleDifficulty: 2 }
      },
      {
        id: "midi_scale_l3",
        levelNumber: 3,
        examGroup: "play",
        badge: { de: "Spielen • Stufe 3", en: "Play • Level 3" },
        title: { de: "Skalen spielen • Erweitert (+ Pent./Harm.)", en: "Play Scales • Extended (+ Pent./Harm.)" },
        desc: {
          de: "Alle Kirchentonarten plus Pentatonik, Harmonisch & Melodisch Moll durchspielen",
          en: "Play all church modes plus pentatonic, harmonic & melodic minor"
        },
        modes: ["midi-scale"],
        apply: { midiScaleDifficulty: 3 }
      }
    ]
  },
  melody: {
    accent: "lilac",
    presets: [
      {
        id: "melody_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Do–Fa (C-Dur)", en: "Level 1 • Do–Fa (C Major)" },
        desc: {
          de: "Rhythmische 4–5-Ton-Melodien im unteren Tetrachord (1 Oktave, C-Dur)",
          en: "Rhythmic 4–5 note melodies in the lower tetrachord (single octave, C Major)"
        },
        modes: ["melody"],
        apply: { melodyRange: "do-fa", melodyKeyMode: "fixed", melodyOctaveMode: "single", melodyStyle: "rhythmic", melodyPulse: true }
      },
      {
        id: "melody_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Sol–Do (C-Dur)", en: "Level 2 • Sol–Do (C Major)" },
        desc: {
          de: "Rhythmische 4–6-Ton-Melodien im oberen Tetrachord inkl. Leitton Ti",
          en: "Rhythmic 4–6 note melodies in the upper tetrachord incl. leading tone Ti"
        },
        modes: ["melody"],
        apply: { melodyRange: "sol-do", melodyKeyMode: "fixed", melodyOctaveMode: "single", melodyStyle: "rhythmic", melodyPulse: true }
      },
      {
        id: "melody_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • Ganze Tonart (Zufallstonarten)", en: "Level 3 • Full Scale (Random Keys)" },
        desc: {
          de: "Rhythmische 4–6-Ton-Phrasen Do–Do mit wechselnden Tonarten (1 Oktave)",
          en: "Rhythmic 4–6 note phrases Do–Do across randomized keys (single octave)"
        },
        modes: ["melody"],
        apply: { melodyRange: "full", melodyKeyMode: "random", melodyOctaveMode: "single", melodyStyle: "rhythmic", melodyPulse: true }
      },
      {
        id: "melody_l4",
        levelNumber: 4,
        title: { de: "Stufe 4 • Meister (Mehrere Oktaven)", en: "Level 4 • Master (Multi-Octave)" },
        desc: {
          de: "Alle Töne, wechselnde Tonarten, Oktavlagen & echte Phrasen-Rhythmik",
          en: "Full scale, random keys, octave registers & expressive phrase rhythms"
        },
        modes: ["melody"],
        apply: { melodyRange: "full", melodyKeyMode: "random", melodyOctaveMode: "multi", melodyStyle: "rhythmic", melodyPulse: true }
      },
      {
        id: "melody_l5",
        levelNumber: 5,
        title: { de: "Stufe 5 • Kombi-Melodiediktat", en: "Level 5 • Full Melody Dictation" },
        desc: {
          de: "Tonhöhe & Rhythmus gemeinsam heraushören (4–6 Töne, Do–Do)",
          en: "Identify both pitch & note values together (4–6 notes, Do–Do)"
        },
        modes: ["melody"],
        apply: { melodyRange: "full", melodyKeyMode: "random", melodyOctaveMode: "single", melodyStyle: "dictation", melodyPulse: true }
      }
    ]
  },
  rhythm: {
    accent: "peach",
    presets: [
      {
        id: "rhythm_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Puls & Grundbausteine", en: "Level 1 • Pulse & Basics" },
        desc: {
          de: "Basis-Taktarten, Viertel/Achtel-Diktat, Nachklopfen & Groove-Stile",
          en: "Core meters, quarter/eighth dictation, tap-back & groove styles"
        },
        modes: ["rhythm-meter", "rhythm-dictation", "rhythm-tap", "rhythm-groove"],
        apply: { rhythmMeterDifficulty: 1, rhythmDictationDifficulty: 1, rhythmTapDifficulty: 1, rhythmGrooveDifficulty: 1 }
      },
      {
        id: "rhythm_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Synkopen & Offbeats", en: "Level 2 • Syncopation & Offbeats" },
        desc: {
          de: "Pausen, punktierte Werte, 6/8 & 2/4 sowie Offbeat-Akzente",
          en: "Rests, dotted rhythms, 6/8 & 2/4 meters plus offbeat accents"
        },
        modes: ["rhythm-meter", "rhythm-dictation", "rhythm-tap", "rhythm-groove"],
        apply: { rhythmMeterDifficulty: 2, rhythmDictationDifficulty: 2, rhythmTapDifficulty: 2, rhythmGrooveDifficulty: 2 }
      },
      {
        id: "rhythm_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • Triolen, 16tel & Pocket", en: "Level 3 • Triplets, 16ths & Pocket" },
        desc: {
          de: "Komplexe Diktate, Präzisions-Tap (±28 ms) & Mikro-Timing",
          en: "Complex dictation, precision tap (±28 ms) & micro-timing"
        },
        modes: ["rhythm-meter", "rhythm-dictation", "rhythm-tap", "rhythm-groove"],
        apply: { rhythmMeterDifficulty: 3, rhythmDictationDifficulty: 3, rhythmTapDifficulty: 3, rhythmGrooveDifficulty: 3 }
      },
      {
        id: "rhythm_l4",
        levelNumber: 4,
        title: { de: "Stufe 4 • Profi & Blindflug", en: "Level 4 • Pro & Blind Mode" },
        desc: {
          de: "Ungerade Takte (5/4, 7/8), feinstes Mikro-Timing & Blindflug-Klopfen",
          en: "Odd meters (5/4, 7/8), fine micro-timing & blind-mode tapping"
        },
        modes: ["rhythm-meter", "rhythm-dictation", "rhythm-tap", "rhythm-groove"],
        apply: { rhythmMeterDifficulty: 3, rhythmDictationDifficulty: 3, rhythmTapDifficulty: 4, rhythmGrooveDifficulty: 4 }
      }
    ]
  },
  production: {
    accent: "sage",
    presets: [
      {
        id: "prod_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • 5 Hauptbänder", en: "Level 1 • 5 Main Bands" },
        desc: {
          de: "Bass bis Brillanz (+6 dB EQ im Pink Noise & Sinustöne)",
          en: "Bass to brilliance (+6 dB EQ in pink noise & sine tones)"
        },
        modes: ["prod-tone", "prod-eq-noise"],
        apply: { prodToneDifficulty: 1, prodEqNoiseDifficulty: 1 }
      },
      {
        id: "prod_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • 8 Oktavbänder", en: "Level 2 • 8 Octave Bands" },
        desc: {
          de: "Klassische 8 Studio-Bänder mit mittlerem EQ-Boost (+4 dB • Q 2,8)",
          en: "Classic 8 studio octave bands with moderate boost (+4 dB • Q 2.8)"
        },
        modes: ["prod-tone", "prod-eq-noise"],
        apply: { prodToneDifficulty: 2, prodEqNoiseDifficulty: 2 }
      },
      {
        id: "prod_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • 13 ISO-Terzbänder", en: "Level 3 • 13 ISO Third-Octaves" },
        desc: {
          de: "Chirurgisches Mixing: 13 Frequenzen mit schmalem Q 4,5 (+3 dB)",
          en: "Surgical mixing: 13 ISO frequencies with narrow Q 4.5 (+3 dB)"
        },
        modes: ["prod-tone", "prod-eq-noise"],
        apply: { prodToneDifficulty: 3, prodEqNoiseDifficulty: 3 }
      }
    ]
  },
  notation: {
    accent: "sage",
    presets: [
      {
        id: "notation_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Violin & Bass (Im System)", en: "Level 1 • Treble & Bass (On Staff)" },
        desc: {
          de: "5 Linien & 4 Zwischenräume ohne Hilfslinien (Stammtöne)",
          en: "5 lines & 4 spaces with no ledger lines (natural notes)"
        },
        modes: ["notation-treble", "notation-bass"],
        apply: { notationDifficulty: 1, notationKeyMode: "none" }
      },
      {
        id: "notation_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Alle Schlüssel (±2 Hilfslinien)", en: "Level 2 • All Clefs (±2 Ledgers)" },
        desc: {
          de: "Violinschlüssel, Bassschlüssel & Altschlüssel bis zu 2 Hilfslinien",
          en: "Treble, Bass & Alto clefs with up to 2 ledger lines"
        },
        modes: ["notation-treble", "notation-bass", "notation-alto"],
        apply: { notationDifficulty: 2, notationKeyMode: "none" }
      },
      {
        id: "notation_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • Bis 3 Hilfslinien (Alle Schlüssel)", en: "Level 3 • Up to 3 Ledger Lines (All Clefs)" },
        desc: {
          de: "Voller Umfang mit bis zu 3 Hilfslinien nach oben und unten",
          en: "Full range with up to 3 ledger lines above and below the staff"
        },
        modes: ["notation-treble", "notation-bass", "notation-alto"],
        apply: { notationDifficulty: 3, notationKeyMode: "none" }
      },
      {
        id: "notation_l4",
        levelNumber: 4,
        title: { de: "Stufe 4 • Meisterprüfung (3 Hilfslinien + ♯/♭)", en: "Level 4 • Mastery (3 Ledgers + ♯/♭)" },
        desc: {
          de: "Alle 3 Schlüssel, bis 3 Hilfslinien beidseitig & Vorzeichen (♯/♭)",
          en: "All 3 clefs, up to 3 ledger lines both ways & accidentals (♯/♭)"
        },
        modes: ["notation-treble", "notation-bass", "notation-alto"],
        apply: { notationDifficulty: 4, notationKeyMode: "none" }
      },
      {
        id: "notation_l5",
        levelNumber: 5,
        title: { de: "Stufe 5 • Blattspiel Tonarten (1–2 ♯/♭)", en: "Level 5 • Key Signatures (1–2 ♯/♭)" },
        desc: {
          de: "G-, D-, F- & B-Dur im Notensystem (±2 Hilfslinien) mit vorgegebenen Vorzeichen",
          en: "G, D, F & Bb Major key signatures on the staff (±2 ledgers)"
        },
        modes: ["notation-treble", "notation-bass", "notation-alto"],
        apply: { notationDifficulty: 2, notationKeyMode: "easy" }
      },
      {
        id: "notation_l6",
        levelNumber: 6,
        title: { de: "Stufe 6 • Alle Tonarten + ♮ (1–6 ♯/♭)", en: "Level 6 • All Key Signatures + ♮ (1–6 ♯/♭)" },
        desc: {
          de: "Alle 12 Vorzeichen-Tonarten (±3 Hilfslinien) inklusive Auflösungszeichen (♮)",
          en: "All 12 key signatures (±3 ledgers) including natural signs (♮)"
        },
        modes: ["notation-treble", "notation-bass", "notation-alto"],
        apply: { notationDifficulty: 4, notationKeyMode: "all" }
      },
      {
        id: "notation_l7",
        levelNumber: 7,
        title: { de: "Stufe 7 • Symbole, Begriffe & Ablauf", en: "Level 7 • Symbols, Terms & Roadmaps" },
        desc: {
          de: "Dynamik, Tempo, Artikulation, Verzierungen, Coda, Segno & Spielreihenfolgen",
          en: "Dynamics, tempo, articulation, ornaments, Coda, Segno & score roadmaps"
        },
        modes: ["notation-symbols"],
        apply: { notationDifficulty: 5, notationKeyMode: "none" }
      }
    ]
  }
};

function sanitizeExamReviewItem(raw, idx = 0) {
  if (!raw || typeof raw !== "object") return null;
  const mode = String(raw.mode || "cadence").slice(0, 36);
  const status = ["correct", "partial", "wrong", "skipped"].includes(raw.status) ? raw.status : "wrong";
  const scoreNum = Number(raw.score);
  const score = Number.isFinite(scoreNum) ? Math.max(0, Math.min(1, Math.round(scoreNum * 100) / 100)) : 0;
  let audioSnapshot = null;
  if (raw.audioSnapshot && typeof raw.audioSnapshot === "object") {
    try {
      audioSnapshot = JSON.parse(JSON.stringify(raw.audioSnapshot));
    } catch (e) {
      audioSnapshot = null;
    }
  }
  return {
    qIndex: Math.max(1, parseInt(raw.qIndex, 10) || (idx + 1)),
    mode: mode,
    status: status,
    score: score,
    chosenKey: raw.chosenKey !== undefined && raw.chosenKey !== null ? String(raw.chosenKey).slice(0, 40) : null,
    targetKey: raw.targetKey !== undefined && raw.targetKey !== null ? String(raw.targetKey).slice(0, 40) : null,
    chosenLabel: String(raw.chosenLabel || "").slice(0, 140),
    targetLabel: String(raw.targetLabel || "").slice(0, 140),
    detailNote: String(raw.detailNote || "").slice(0, 120),
    audioSnapshot: audioSnapshot
  };
}

function sanitizeExamHistoryEntry(raw, idx = 0) {
  if (!raw || typeof raw !== "object") return null;
  const categoryKey = Object.prototype.hasOwnProperty.call(EXAM_CATEGORY_LEVELS, raw.categoryKey)
    ? raw.categoryKey
    : null;
  if (!categoryKey) return null;
  const presets = EXAM_CATEGORY_LEVELS[categoryKey].presets;
  const preset = presets.find(p => p.id === raw.levelId) || presets[0];
  const totalQuestions = Math.max(1, Math.min(50, parseInt(raw.totalQuestions, 10) || 10));
  const earnedNum = Number(raw.earnedScore);
  const earnedScore = Number.isFinite(earnedNum)
    ? Math.max(0, Math.min(totalQuestions, Math.round(earnedNum * 100) / 100))
    : 0;
  const percent = Math.max(0, Math.min(100, Math.round(Number.isFinite(Number(raw.percent)) ? Number(raw.percent) : (earnedScore / totalQuestions) * 100)));
  const breakdown = Array.isArray(raw.moduleBreakdown)
    ? raw.moduleBreakdown.map(b => {
        if (!b || typeof b !== "object" || !b.mode) return null;
        const tot = Math.max(1, parseInt(b.total, 10) || 1);
        const er = Math.max(0, Math.min(tot, Math.round((Number(b.earned) || 0) * 100) / 100));
        return {
          mode: String(b.mode).slice(0, 36),
          total: tot,
          earned: er,
          correct: Math.max(0, Math.min(tot, parseInt(b.correct, 10) || 0))
        };
      }).filter(Boolean).slice(0, 10)
    : [];
  const reviewItems = Array.isArray(raw.reviewItems)
    ? raw.reviewItems.map((it, i) => sanitizeExamReviewItem(it, i)).filter(Boolean).slice(0, 50)
    : [];
  const completedAtNum = Number(raw.completedAt);
  const completedAt = Number.isFinite(completedAtNum) && completedAtNum > 0
    ? Math.round(completedAtNum)
    : (Date.parse(raw.completedAt) || Date.now());
  return {
    id: String(raw.id || `exam_${completedAt}_${idx}`).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48),
    categoryKey: categoryKey,
    levelId: preset.id,
    levelNumber: preset.levelNumber,
    totalQuestions: totalQuestions,
    earnedScore: earnedScore,
    correctCount: Math.max(0, Math.min(totalQuestions, parseInt(raw.correctCount, 10) || 0)),
    partialCount: Math.max(0, Math.min(totalQuestions, parseInt(raw.partialCount, 10) || 0)),
    wrongCount: Math.max(0, Math.min(totalQuestions, parseInt(raw.wrongCount, 10) || 0)),
    percent: percent,
    durationSec: Math.max(0, Math.min(7200, Math.round(Number(raw.durationSec) || 0))),
    feedbackMode: raw.feedbackMode === "instant" ? "instant" : "blind",
    maxReplays: raw.maxReplays === 0 ? 0 : 2,
    completedAt: completedAt,
    moduleBreakdown: breakdown,
    reviewItems: reviewItems
  };
}

function sanitizeExamHistoryArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map((e, i) => sanitizeExamHistoryEntry(e, i)).filter(Boolean).slice(0, 25);
}

const METRONOME_MIN_BPM = 30;
const METRONOME_MAX_BPM = 240;
const METRONOME_DEFAULT_BPM = 120;
const METRONOME_MIN_BEATS = 1;
const METRONOME_MAX_BEATS = 16;
const METRONOME_BEAT_STATES = ["normal", "accent", "muted"];
const METRONOME_SHUFFLE = "shuffle";
const METRONOME_VALID_SUBDIVISIONS = [1, 2, 3, 4, METRONOME_SHUFFLE];

// Unterteilung aus Profil/Knopf lesen: 1–4 Klicks pro Schlag oder „shuffle“
function normalizeMetronomeSubdivision(raw) {
  if (raw === METRONOME_SHUFFLE) return METRONOME_SHUFFLE;
  const num = parseInt(raw, 10);
  return METRONOME_VALID_SUBDIVISIONS.includes(num) ? num : 1;
}

// Klick-Zeitpunkte innerhalb eines Schlags (Anteil 0–1).
// Shuffle = geswingte Achtel im Triolen-Feeling: lang–kurz (1. und 3. Triolen-Achtel)
function getMetronomeSubOffsets(sub) {
  if (sub === METRONOME_SHUFFLE) return [0, 2 / 3];
  const n = normalizeMetronomeSubdivision(sub);
  return Array.from({ length: n }, (_, i) => i / n);
}

function getMetronomeShortestStepSec(sub, bpm) {
  const offsets = getMetronomeSubOffsets(sub).concat([1]);
  let minGap = 1;
  for (let i = 1; i < offsets.length; i++) minGap = Math.min(minGap, offsets[i] - offsets[i - 1]);
  return (60 / clampMetronomeBpm(bpm)) * minGap;
}

function clampMetronomeBpm(bpm) {
  const num = Math.round(Number(bpm) || METRONOME_DEFAULT_BPM);
  return Math.max(METRONOME_MIN_BPM, Math.min(METRONOME_MAX_BPM, num));
}

function getDefaultMeterBeats(beatCount) {
  const n = Math.max(METRONOME_MIN_BEATS, Math.min(METRONOME_MAX_BEATS, parseInt(beatCount, 10) || 4));
  const out = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) out.push("accent");
    else if (n === 5 && i === 3) out.push("accent");
    else if (n === 6 && i === 3) out.push("accent");
    else if (n === 7 && (i === 2 || i === 4)) out.push("accent");
    else out.push("normal");
  }
  return out;
}

function sanitizeMetronomeBeatsArray(rawBeats) {
  if (!Array.isArray(rawBeats) || rawBeats.length === 0) {
    return getDefaultMeterBeats(4);
  }
  return rawBeats
    .slice(0, METRONOME_MAX_BEATS)
    .map(v => (METRONOME_BEAT_STATES.includes(v) ? v : "normal"));
}

function createDefaultMetronomeProfiles() {
  const t = typeof tr === "function" ? tr : ((de) => de);
  return [
    {
      id: "metro_default_4_4",
      name: t("4/4 Standard", "4/4 Standard"),
      bpm: 120,
      beats: ["accent", "normal", "normal", "normal"],
      subdivision: 1
    },
    {
      id: "metro_default_3_4",
      name: t("3/4 Walzer", "3/4 Waltz"),
      bpm: 104,
      beats: ["accent", "normal", "normal"],
      subdivision: 1
    },
    {
      id: "metro_default_gap_4_4",
      name: t("4/4 Gap (3 stumm)", "4/4 Gap (Beat 3 mute)"),
      bpm: 96,
      beats: ["accent", "normal", "muted", "normal"],
      subdivision: 1
    }
  ];
}

const METRONOME_SOUND_PROFILES = Object.freeze(["standard", "woodblock", "cowbell", "rimshot"]);
const DEFAULT_METRONOME_SOUND = "standard";

const METRONOME_SOUND_PERCUSSION_MAP = Object.freeze({
  standard:  Object.freeze({ accent: "accent",         normal: "tick",         sub: "tick" }),
  woodblock: Object.freeze({ accent: "wood_accent",    normal: "wood_tick",    sub: "wood_sub" }),
  cowbell:   Object.freeze({ accent: "cowbell_accent", normal: "cowbell_tick", sub: "cowbell_sub" }),
  rimshot:   Object.freeze({ accent: "rimshot_accent", normal: "rimshot_tick", sub: "rimshot_sub" })
});

const METRONOME_SOUND_I18N_KEYS = Object.freeze({
  standard:  "metro.soundStandard",
  woodblock: "metro.soundWoodblock",
  cowbell:   "metro.soundCowbell",
  rimshot:   "metro.soundRimshot"
});

const METRONOME_SOUND_FALLBACK_LABELS = Object.freeze({
  standard:  { de: "Standard-Klick", en: "Standard Click" },
  woodblock: { de: "Woodblock",      en: "Woodblock" },
  cowbell:   { de: "Cowbell",        en: "Cowbell" },
  rimshot:   { de: "Rimshot",        en: "Rimshot" }
});

function normalizeMetronomeSoundProfile(raw) {
  return METRONOME_SOUND_PROFILES.includes(raw) ? raw : DEFAULT_METRONOME_SOUND;
}

function getMetronomeSoundLabel(soundKey) {
  const key = normalizeMetronomeSoundProfile(soundKey);
  const i18nKey = METRONOME_SOUND_I18N_KEYS[key];
  if (typeof getStaticI18nText === "function" && i18nKey) {
    const localized = getStaticI18nText(i18nKey);
    if (localized) return localized;
  }
  const fb = METRONOME_SOUND_FALLBACK_LABELS[key] || METRONOME_SOUND_FALLBACK_LABELS.standard;
  return typeof tr === "function" ? tr(fb.de, fb.en) : fb.de;
}

function resolveMetronomePercussionKind(soundProfile, beatState, subIdx = 0) {
  const key = normalizeMetronomeSoundProfile(soundProfile);
  const map = METRONOME_SOUND_PERCUSSION_MAP[key] || METRONOME_SOUND_PERCUSSION_MAP.standard;
  if (subIdx > 0) return map.sub;
  return beatState === "accent" ? map.accent : map.normal;
}

function sanitizeMetronomeProfileEntry(raw, fallbackIdx = 0) {
  if (!raw || typeof raw !== "object") return null;
  const beats = sanitizeMetronomeBeatsArray(raw.beats);
  const bpm = clampMetronomeBpm(raw.bpm);
  const subdivision = normalizeMetronomeSubdivision(raw.subdivision);
  const sound = METRONOME_SOUND_PROFILES.includes(raw.sound) ? raw.sound : null;
  const fallbackName = `${beats.length}/4 · ${bpm} BPM`;
  const name = String(raw.name || "").trim().slice(0, 32) || fallbackName;
  return {
    id: String(raw.id || `metro_${Date.now()}_${fallbackIdx}`).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48) || `metro_${fallbackIdx}`,
    name,
    bpm,
    beats,
    subdivision,
    sound
  };
}

const DEFAULT_METRONOME_MIX = Object.freeze({
  master: 1.0,
  accent: 1.0,
  normal: 0.8
});

function sanitizeMetronomeMixValue(val, fallback) {
  const num = Number(val);
  if (!Number.isFinite(num)) return fallback;
  return Math.round(Math.max(0, Math.min(1, num)) * 100) / 100;
}

function sanitizeMetronomeMix(raw) {
  const src = (raw && typeof raw === "object") ? raw : {};
  return {
    master: sanitizeMetronomeMixValue(src.master, DEFAULT_METRONOME_MIX.master),
    accent: sanitizeMetronomeMixValue(src.accent, DEFAULT_METRONOME_MIX.accent),
    normal: sanitizeMetronomeMixValue(src.normal, DEFAULT_METRONOME_MIX.normal)
  };
}

const REVERB_INSTRUMENT_KEYS = ["piano", "guitar", "strings", "brass", "voice", "bass"];
const STEM_REVERB_PRESETS = Object.freeze({
  dry:     Object.freeze({ piano: 0.00, guitar: 0.00, strings: 0.00, brass: 0.00, voice: 0.00, bass: 0.00 }),
  natural: Object.freeze({ piano: 0.24, guitar: 0.22, strings: 0.34, brass: 0.26, voice: 0.30, bass: 0.06 }),
  concert: Object.freeze({ piano: 0.48, guitar: 0.42, strings: 0.56, brass: 0.46, voice: 0.52, bass: 0.16 })
});
const DEFAULT_PIANO_SOUND = Object.freeze({
  character: "natural",
  reverb: 0.24,
  instruments: { ...STEM_REVERB_PRESETS.natural }
});
const PIANO_REVERB_BY_CHAR = Object.freeze({
  dry: 0.0,
  natural: 0.24,
  concert: 0.48
});
const DEFAULT_DRONE_MIX = Object.freeze({
  pad: 0.50,
  tone: 1.00
});
const DEFAULT_BREAK_REMINDER_ENABLED = true;
const DEFAULT_BREAK_REMINDER_MINUTES = 15;
const BREAK_REMINDER_MIN_MINUTES = 5;
const BREAK_REMINDER_MAX_MINUTES = 30;

// Achtsamer Session-Timer: Wunschdauer frei wählbar (1–180 Min), Auto-Stopp 1–60 Min oder 0 = „Nie“.
// Ältere Profile (nur 5/10/15/20 bzw. 2/3/5) bleiben damit gültig.
const SESSION_TIMER_PRESETS = [5, 10, 15, 20];
const SESSION_TIMER_MIN_MINUTES = 1;
const SESSION_TIMER_MAX_MINUTES = 180;
const SESSION_IDLE_PRESETS = [2, 3, 5];
const SESSION_IDLE_MIN_MINUTES = 1;
const SESSION_IDLE_MAX_MINUTES = 60;
const SESSION_IDLE_NEVER = 0;

function sanitizeSessionTimerMinutes(val) {
  const num = parseInt(val, 10);
  if (!Number.isFinite(num) || num < SESSION_TIMER_MIN_MINUTES || num > SESSION_TIMER_MAX_MINUTES) return 10;
  return num;
}

function sanitizeSessionIdleMinutes(val) {
  const num = parseInt(val, 10);
  if (num === SESSION_IDLE_NEVER) return SESSION_IDLE_NEVER;
  if (!Number.isFinite(num) || num < SESSION_IDLE_MIN_MINUTES || num > SESSION_IDLE_MAX_MINUTES) return 3;
  return num;
}

/** Auto-Stopp-Minuten des Timers; 0 bedeutet „Nie“ (kein automatisches Beenden). */
function getSessionIdleMinutes() {
  return sanitizeSessionIdleMinutes(state?.profile?.inactivityMinutes ?? 3);
}

function sanitizeBreakReminderMinutes(val) {
  const num = parseInt(val, 10);
  if (!Number.isFinite(num)) return DEFAULT_BREAK_REMINDER_MINUTES;
  return Math.max(BREAK_REMINDER_MIN_MINUTES, Math.min(BREAK_REMINDER_MAX_MINUTES, num));
}

function sanitizePianoSound(raw) {
  const src = (raw && typeof raw === "object") ? raw : {};
  const charKey = Object.prototype.hasOwnProperty.call(PIANO_REVERB_BY_CHAR, src.character)
    ? src.character
    : DEFAULT_PIANO_SOUND.character;
  const presetMap = STEM_REVERB_PRESETS[charKey] || STEM_REVERB_PRESETS.natural;
  const rawInstMap = (src.instruments && typeof src.instruments === "object") ? src.instruments : {};
  const instruments = {};
  REVERB_INSTRUMENT_KEYS.forEach(stemKey => {
    const rawVal = Object.prototype.hasOwnProperty.call(rawInstMap, stemKey)
      ? rawInstMap[stemKey]
      : (stemKey === "piano" ? src.reverb : undefined);
    instruments[stemKey] = sanitizeMetronomeMixValue(rawVal, presetMap[stemKey] ?? DEFAULT_PIANO_SOUND.reverb);
  });
  return {
    character: charKey,
    reverb: instruments.piano,
    instruments: instruments
  };
}

// Ältere Flächen-Standards (70 % bzw. 60 %) wandern einmalig auf den neuen Standard 50 % (Merker: droneMixDefaultV3).
const LEGACY_DRONE_PAD_DEFAULTS = [0.70, 0.60];
function migrateDroneMixDefault(raw) {
  const mix = raw?.droneMix;
  if (raw?.droneMixDefaultV3 || !mix || typeof mix !== "object") return mix;
  const padNum = Number(mix.pad);
  if (LEGACY_DRONE_PAD_DEFAULTS.some(def => Math.abs(padNum - def) < 0.001)) {
    return { ...mix, pad: DEFAULT_DRONE_MIX.pad };
  }
  return mix;
}

function sanitizeDroneMix(raw) {
  const src = (raw && typeof raw === "object") ? raw : {};
  return {
    pad: sanitizeMetronomeMixValue(src.pad, DEFAULT_DRONE_MIX.pad),
    tone: sanitizeMetronomeMixValue(src.tone, DEFAULT_DRONE_MIX.tone)
  };
}

function createDefaultProfile() {
  return {
    name: "",
    instruments: ["Klavier"],
    focus: "allround",
    focuses: ["allround"],
    companionAccessory: PROFILE_ACCESSORY_NONE_KEY,
    companionAccessories: [],
    notation: "de",
    notationManual: false,
    intervalNotation: "de",
    intervalNotationManual: false,
    solfegeLabels: "syllables",
    sessionMinutes: 10,
    inactivityMinutes: 3,
    breakReminderEnabled: DEFAULT_BREAK_REMINDER_ENABLED,
    breakReminderMinutes: DEFAULT_BREAK_REMINDER_MINUTES,
    mixes: createDefaultMixes(),
    metronomeProfiles: createDefaultMetronomeProfiles(),
    metronomeMix: sanitizeMetronomeMix(DEFAULT_METRONOME_MIX),
    metronomeSound: DEFAULT_METRONOME_SOUND,
    pianoSound: sanitizePianoSound(DEFAULT_PIANO_SOUND),
    droneMix: sanitizeDroneMix(DEFAULT_DRONE_MIX),
    droneMixDefaultV2: true,
    droneMixDefaultV3: true,
    customThemes: [null, null, null],
    examHistory: [],
    hasPracticed: false,
    showHomeQuickMixes: false,
    singAlongTips: true,
    singAlongPause: false,
    singAlongIntroCounts: {},
    singAlongIntroDone: false,
    singVoiceRange: "",
    exerciseTutorials: true,
    seenTutorials: [],
    modesRootHintSeen: false,
    cadenceKeyHintSeen: false,
    tuner: {},
    showAchievements: true,
    selectedTitleId: "",
    achievements: typeof createDefaultAchievementsData === "function"
      ? createDefaultAchievementsData()
      : { unlocked: {}, stats: {} },
    practice: {}
  };
}

// ---------- ÜBUNGSSTAND ----------
// Zuletzt gewählte Übung sowie Stufe & Optionen je Übung. Liegt im Profil (profile.practice),
// überdauert Neustarts („Weiterüben“ macht dort weiter) und wandert mit in die Profil-Sicherung.
// Hier nur die strukturelle Prüfung (läuft schon beim Laden des Profils, bevor notation.js/
// generators.js geladen sind); die Feinprüfung gegen die Musik-Kataloge macht
// applyPracticeProgressToSettings() in js/state.js.

// Stufen-Schlüssel in state.settings → Übung in MIX_MODE_CATALOG, deren Stufenliste die Obergrenze liefert
const PRACTICE_LEVEL_KEYS = {
  difficulty: "cadence",
  intervalDifficulty: "interval-melodic",
  chordDifficulty: "interval-chords",
  chordInversionDifficulty: "chord-inversions",
  solfegeDifficulty: "solfege",
  rhythmMeterDifficulty: "rhythm-meter",
  rhythmDictationDifficulty: "rhythm-dictation",
  rhythmTapDifficulty: "rhythm-tap",
  rhythmGrooveDifficulty: "rhythm-groove",
  prodToneDifficulty: "prod-tone",
  prodEqNoiseDifficulty: "prod-eq-noise",
  modesScaleDifficulty: "modes-scale",
  modesCharDifficulty: "modes-char",
  modesCadenceDifficulty: "modes-cadence",
  notationDifficulty: "notation-symbols",
  singIntervalDifficulty: "sing-interval",
  singDegreeDifficulty: "sing-degree",
  midiIntervalDifficulty: "midi-interval",
  midiChordDifficulty: "midi-chord",
  midiScaleDifficulty: "midi-scale"
};

const PRACTICE_PITCH_CLASS_VALUES = Array.from({ length: 12 }, (_, pc) => String(pc));

// Optionen: Liste = erlaubte Werte, "bool" = Wahrheitswert, RegExp = Format (Feinprüfung später)
const PRACTICE_OPTION_RULES = {
  cadencePos: ["last", "random"],
  intervalCustomRoot: ["random", ...PRACTICE_PITCH_CLASS_VALUES],
  intervalCustomScale: ["ionian", "aeolian", "harm_minor", "mel_minor", "dorian", "phrygian", "lydian", "mixolydian", "locrian", "chromatic"],
  intervalCustomScope: ["triad", "lower", "upper", "full"],
  solfegeCustomKey: ["random", "C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"],
  solfegeCustomTonality: ["major", "minor"],
  solfegeCustomRange: ["do-fa", "sol-do", "full"],
  solfegeCustomOctave: ["single", "multi"],
  melodyRange: ["do-fa", "sol-do", "full"],
  melodyKeyMode: ["fixed", "random"],
  melodyOctaveMode: ["single", "multi"],
  melodyStyle: ["steady", "rhythmic", "dictation"],
  melodyPulse: "bool",
  modesRootPad: "bool",
  modesRoot: ["auto", "random", ...PRACTICE_PITCH_CLASS_VALUES],
  rhythmTapReadMode: "bool",
  rhythmTapClick: "bool",
  notationKeyMode: /^[A-Za-z0-9#_-]{1,24}$/,
  notationKeyTrainerClef: /^notation-[a-z]{3,10}$/,
  singIntervalDirection: ["up", "down", "mixed"],
  midiIntervalDirection: ["up", "down", "mixed"]
};

function getPracticeValidModes() {
  return [
    ...Object.keys(MIX_MODE_CATALOG),
    ...Object.keys(SING_MATCH_MODE_CATALOG),
    ...Object.keys(MIDI_PLAY_MODE_CATALOG),
    "interval-custom"
  ];
}

function sanitizePracticeProgress(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out = {};
  if (typeof raw.mode === "string" && getPracticeValidModes().includes(raw.mode)) {
    out.mode = raw.mode;
  }
  Object.entries(PRACTICE_LEVEL_KEYS).forEach(([key, catalogMode]) => {
    const levels = (MIX_MODE_CATALOG[catalogMode] || SING_MATCH_MODE_CATALOG[catalogMode] || MIDI_PLAY_MODE_CATALOG[catalogMode])?.levels || [];
    const lvl = parseInt(raw[key], 10);
    if (levels.includes(lvl)) out[key] = lvl;
  });
  const trainerLvl = parseInt(raw.notationKeyTrainerLevel, 10);
  if (trainerLvl >= 1 && trainerLvl <= 3) out.notationKeyTrainerLevel = trainerLvl;
  Object.entries(PRACTICE_OPTION_RULES).forEach(([key, rule]) => {
    const val = raw[key];
    if (rule === "bool") {
      if (typeof val === "boolean") out[key] = val;
    } else if (Array.isArray(rule)) {
      if (typeof val === "string" && rule.includes(val)) out[key] = val;
    } else if (rule instanceof RegExp) {
      if (typeof val === "string" && rule.test(val)) out[key] = val;
    }
  });
  // Eigene Intervall-Auswahl: null (= aus der Tonleiter) oder 2–16 Intervall-Kürzel
  if (Array.isArray(raw.intervalCustomPool)) {
    const pool = Array.from(new Set(raw.intervalCustomPool
      .filter(k => typeof k === "string" && /^[A-Za-z0-9]{2,4}$/.test(k)))).slice(0, 16);
    if (pool.length >= 2) out.intervalCustomPool = pool;
  }
  return out;
}

function sanitizeMixEntry(raw, fallbackIdx = 0) {
  if (!raw || typeof raw !== "object") return null;
  const mode = Object.prototype.hasOwnProperty.call(MIX_MODE_CATALOG, raw.mode) ? raw.mode : "cadence";
  const validLevels = MIX_MODE_CATALOG[mode].levels;
  let level = raw.level;
  if (mode === "melody") {
    level = ["do-fa", "sol-do", "full"].includes(raw.melodyRange || raw.level) ? (raw.melodyRange || raw.level) : "do-fa";
  } else {
    const parsed = parseInt(level, 10);
    level = validLevels.includes(parsed) ? parsed : validLevels[0];
  }
  const titleStr = String(raw.title || "").trim().slice(0, 32) || MIX_MODE_CATALOG[mode].label;
  const bpmNum = parseInt(raw.bpm, 10);
  return {
    id: String(raw.id || `mix_${Date.now()}_${fallbackIdx}`).replace(/[^a-zA-Z0-9_-]/g, ""),
    title: titleStr,
    mode: mode,
    level: level,
    melodyRange: mode === "melody" ? level : "do-fa",
    melodyKeyMode: raw.melodyKeyMode === "random" ? "random" : "fixed",
    melodyOctaveMode: raw.melodyOctaveMode === "multi" ? "multi" : "single",
    melodyStyle: ["steady", "rhythmic", "dictation"].includes(raw.melodyStyle) ? raw.melodyStyle : "rhythmic",
    melodyPulse: raw.melodyPulse === false ? false : true,
    notationKeyMode: typeof normalizeNotationKeyMode === "function"
      ? normalizeNotationKeyMode(raw.notationKeyMode)
      : (raw.notationKeyMode ? String(raw.notationKeyMode).slice(0, 12) : "none"),
    bpm: (bpmNum >= 55 && bpmNum <= 160) ? bpmNum : 0
  };
}

function sanitizeUserProfile(raw) {
  const def = createDefaultProfile();
  if (!raw || typeof raw !== "object") return def;

  const validInstruments = Array.isArray(raw.instruments)
    ? Array.from(new Set(
        raw.instruments
          .map(i => (i === "Schlagzeug" ? "Percussion" : i))
          .filter(i => PROFILE_INSTRUMENT_OPTIONS.includes(i))
      )).slice(0, PROFILE_INSTRUMENT_OPTIONS.length)
    : def.instruments;
  const focuses = normalizeProfileFocuses(raw.focuses, raw.focus);
  const companionAccessories = normalizeProfileAccessories(raw.companionAccessories, raw.companionAccessory);
  const sessMins = sanitizeSessionTimerMinutes(raw.sessionMinutes);
  const idleMins = sanitizeSessionIdleMinutes(raw.inactivityMinutes);
  const breakEnabled = raw.breakReminderEnabled === undefined ? DEFAULT_BREAK_REMINDER_ENABLED : Boolean(raw.breakReminderEnabled);
  const breakMinutes = sanitizeBreakReminderMinutes(raw.breakReminderMinutes);

  let mixes = def.mixes;
  if (Array.isArray(raw.mixes)) {
    mixes = raw.mixes.map((m, idx) => sanitizeMixEntry(m, idx)).filter(Boolean).slice(0, 16);
  }

  let metronomeProfiles = def.metronomeProfiles;
  if (Array.isArray(raw.metronomeProfiles)) {
    metronomeProfiles = raw.metronomeProfiles
      .map((mp, idx) => sanitizeMetronomeProfileEntry(mp, idx))
      .filter(Boolean)
      .slice(0, 16);
  }

  const customThemes = Array.isArray(raw.customThemes)
    ? sanitizeCustomThemesArray(raw.customThemes)
    : def.customThemes;

  const examHistory = Array.isArray(raw.examHistory)
    ? sanitizeExamHistoryArray(raw.examHistory)
    : [];

  return {
    name: String(raw.name || "").trim().slice(0, 24),
    instruments: validInstruments,
    focus: focuses[0] || "allround",
    focuses: focuses,
    companionAccessory: companionAccessories[0] || PROFILE_ACCESSORY_NONE_KEY,
    companionAccessories: companionAccessories,
    notation: raw.notation === "intl" ? "intl" : "de",
    notationManual: Boolean(raw.notationManual),
    intervalNotation: raw.intervalNotation === "intl" ? "intl" : "de",
    intervalNotationManual: Boolean(raw.intervalNotationManual),
    solfegeLabels: raw.solfegeLabels === "numbers" ? "numbers" : "syllables",
    sessionMinutes: sessMins,
    inactivityMinutes: idleMins,
    breakReminderEnabled: breakEnabled,
    breakReminderMinutes: breakMinutes,
    mixes: mixes,
    metronomeProfiles: metronomeProfiles,
    metronomeMix: sanitizeMetronomeMix(raw.metronomeMix),
    metronomeSound: normalizeMetronomeSoundProfile(raw.metronomeSound),
    pianoSound: sanitizePianoSound(raw.pianoSound),
    droneMix: sanitizeDroneMix(migrateDroneMixDefault(raw)),
    droneMixDefaultV2: true,
    droneMixDefaultV3: true,
    customThemes: customThemes,
    examHistory: examHistory,
    // Ältere Profile (vor Einführung des Felds) gelten als „schon geübt“
    hasPracticed: raw.hasPracticed === undefined ? true : Boolean(raw.hasPracticed),
    showHomeQuickMixes: Boolean(raw.showHomeQuickMixes),
    singAlongTips: raw.singAlongTips !== false,
    singAlongPause: Boolean(raw.singAlongPause),
    singAlongIntroCounts: (raw.singAlongIntroCounts && typeof raw.singAlongIntroCounts === "object")
      ? Object.fromEntries(Object.entries(raw.singAlongIntroCounts)
          .filter(([k, v]) => /^[a-z-]{3,32}$/.test(k) && Number.isFinite(Number(v)))
          .map(([k, v]) => [k, Math.max(0, Math.min(99, Math.round(Number(v))))]))
      : {},
    singAlongIntroDone: Boolean(raw.singAlongIntroDone),
    // Stimmlage für „… treffen“ ("" = noch nicht gewählt)
    singVoiceRange: ["mixed", "soprano", "alto", "tenor", "bass"].includes(raw.singVoiceRange) ? raw.singVoiceRange : "",
    exerciseTutorials: raw.exerciseTutorials !== false,
    seenTutorials: Array.isArray(raw.seenTutorials)
      ? Array.from(new Set(raw.seenTutorials.filter(k => typeof k === "string" && /^[a-z0-9-]{2,32}$/.test(k)))).slice(0, 32)
      : [],
    modesRootHintSeen: Boolean(raw.modesRootHintSeen),
    cadenceKeyHintSeen: Boolean(raw.cadenceKeyHintSeen),
    tuner: sanitizeTunerPrefs(raw.tuner),
    showAchievements: raw.showAchievements !== false,
    selectedTitleId: typeof raw.selectedTitleId === "string" && /^[a-z0-9-]{2,32}$/.test(raw.selectedTitleId)
      ? raw.selectedTitleId
      : "",
    achievements: typeof sanitizeAchievementsData === "function"
      ? sanitizeAchievementsData(raw.achievements)
      : (raw.achievements && typeof raw.achievements === "object" ? raw.achievements : { unlocked: {}, stats: {} }),
    practice: sanitizePracticeProgress(raw.practice)
  };
}

function loadUserProfile() {
  const storageThemes = loadCustomThemesFromStorage();
  try {
    if (typeof localStorage === "undefined") {
      const def = createDefaultProfile();
      def.customThemes = storageThemes;
      return def;
    }
    const raw = localStorage.getItem(PERSONAL_PROFILE_STORAGE_KEY);
    if (!raw) {
      const def = createDefaultProfile();
      def.customThemes = storageThemes;
      return def;
    }
    const prof = sanitizeUserProfile(JSON.parse(raw));
    for (let i = 0; i < 3; i++) {
      if (!prof.customThemes[i] && storageThemes[i]) {
        prof.customThemes[i] = storageThemes[i];
      }
    }
    return prof;
  } catch (_err) {
    const def = createDefaultProfile();
    def.customThemes = storageThemes;
    return def;
  }
}

function saveUserProfile(profile) {
  const sanitized = sanitizeUserProfile(profile);
  try {
    if (typeof localStorage === "undefined") return;
    const compactThemes = sanitized.customThemes.map(t => t ? {
      id: t.id,
      slotIndex: t.slotIndex,
      name: t.name,
      colors: t.colors,
      updatedAt: t.updatedAt
    } : null);
    localStorage.setItem(PERSONAL_PROFILE_STORAGE_KEY, JSON.stringify({ ...sanitized, customThemes: compactThemes }));
    saveCustomThemesToStorage(sanitized.customThemes);
    syncNativeStorageMirror();
  } catch (_err) {
    notifyStorageSaveFailed();
  }
}

function formatSessionMMSS(totalSec) {
  const safe = Math.max(0, Math.floor(Number(totalSec) || 0));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function escapeHtml(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resolveEffectiveAppearance(pref) {
  if (pref === "light" || pref === "dark") return pref;
  const prefersDark =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

const CADENCE_DEFAULT_BPM = 120;
const SOLFEGE_DEFAULT_BPM = 120;
const CHORD_ARPEGGIO_DEFAULT_BPM = 80;
const EXERCISE_DEFAULT_BPM = 90;
const WARMUP_DEFAULT_BPM = 80;
const SOLFEGE_LOOP_INTERVAL_MS = 3000;

const MODE_CATEGORY_MAP = {
  "cadence":               "cadence",
  "cadence-minor":         "cadence",
  "interval-melodic":      "interval",
  "interval-melodic-down": "interval",
  "interval-harmonic":     "interval",
  "interval-drone":        "interval",
  "chord-arp-up":          "chords",
  "chord-arp-down":        "chords",
  "interval-chords":       "chords",
  "chord-inversions":      "chords",
  "melody":                "melody",
  "solfege":               "solfege",
  "rhythm-meter":          "rhythm",
  "rhythm-dictation":      "rhythm",
  "rhythm-tap":            "rhythm",
  "rhythm-groove":         "rhythm",
  "prod-tone":             "production",
  "prod-eq-noise":         "production",
  "modes-scale":           "modes",
  "modes-char":            "modes",
  "modes-cadence":         "modes",
  "notation-treble":       "notation",
  "notation-bass":         "notation",
  "notation-alto":         "notation",
  "notation-mixed":        "notation",
  "notation-grand":        "notation",
  "notation-chords":       "notation",
  "notation-symbols":      "notation",
  "sing-interval":         "interval",
  "sing-degree":           "solfege",
  "midi-interval":         "interval",
  "midi-chord":            "chords",
  "midi-scale":            "modes"
};

/**
 * Liefert den Kategorie-Schlüssel (z. B. "interval", "chords") für einen Übungsmodus.
 */
// Stufen-Symbole im Rhythmus-Modul: einheitlich gezeichnete Noten & Taktangaben statt Schriftzeichen
// (♩ ♫ ♬ 𝄽 sehen je nach Gerät/Schrift unterschiedlich aus und füllen den Kreis kaum)
function getRhythmNodeIconSVG(kind) {
  const head = (x, y = 36) => `<ellipse cx="${x}" cy="${y}" rx="4.7" ry="3.5" transform="rotate(-20 ${x} ${y})" fill="currentColor"/>`;
  const stem = (x, top = 13, y = 36) => `<line x1="${x + 4.2}" y1="${y - 1}" x2="${x + 4.2}" y2="${top}" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
  const beam = (x1, x2, y = 13) => `<line x1="${x1 + 4.2}" y1="${y}" x2="${x2 + 4.2}" y2="${y}" stroke="currentColor" stroke-width="3.8" stroke-linecap="butt"/>`;
  const flag = (x, top = 13) => `<path d="M${x + 4.2} ${top} C${x + 5} ${top + 6}, ${x + 12} ${top + 7}, ${x + 9.5} ${top + 15}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`;
  const note = (x, top = 13) => head(x) + stem(x, top);
  const rest = (x) => `<path d="M${x - 2.5} 13 L${x + 3.5} 20.5 L${x - 2} 27 L${x + 3.5} 34 C${x - 2.5} 32.5, ${x - 4} 37.5, ${x + 0.5} 41.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  const sig = (x, top, bottom, size = 17, y1 = 22, y2 = 40) =>
    `<text x="${x}" y="${y1}" text-anchor="middle" font-family="Andika, sans-serif" font-weight="700" font-size="${size}" fill="currentColor">${top}</text>` +
    `<text x="${x}" y="${y2}" text-anchor="middle" font-family="Andika, sans-serif" font-weight="700" font-size="${size}" fill="currentColor">${bottom}</text>`;
  const divider = `<line x1="24" y1="9" x2="24" y2="40" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity="0.4"/>`;
  const triplet = () => note(10) + note(20) + note(30) + beam(10, 30) +
    `<text x="24.2" y="8.5" text-anchor="middle" font-family="Andika, sans-serif" font-weight="700" font-size="10" fill="currentColor">3</text>`;

  let body = "";
  switch (kind) {
    case "meter-34-44": body = sig(12.5, "3", "4", 20, 22, 42) + divider + sig(35.5, "4", "4", 20, 22, 42); break;
    case "meter-68": body = sig(24, "6", "8", 22, 23, 44); break;
    case "meter-54-78": body = sig(12.5, "5", "4", 20, 22, 42) + divider + sig(35.5, "7", "8", 20, 22, 42); break;
    case "quarter-eighths": body = note(6) + note(22) + note(34) + beam(22, 34); break;
    case "triplet": body = triplet(); break;
    case "sixteenths": body = note(5) + note(15) + note(25) + note(35) + beam(5, 35, 13) + beam(5, 35, 18.5); break;
    case "syncopation": body = note(8) + `<circle cx="18" cy="35" r="2" fill="currentColor"/>` + note(30) + flag(30); break;
    case "quarter-rest": body = note(10) + rest(32); break;
    case "meter-eighths": body = sig(10, "3", "4", 15, 23, 40) + note(22) + note(34) + beam(22, 34); break;
    case "tap":
      body = `<circle cx="24" cy="28" r="6.5" fill="currentColor"/>
        <path d="M14.5 21.5 A12 12 0 0 1 33.5 21.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity="0.75"/>
        <path d="M9 15.5 A19 19 0 0 1 39 15.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity="0.45"/>`;
      break;
    case "blind":
      body = `<path d="M5 25 C11 15, 18 11.5, 24 11.5 C30 11.5, 37 15, 43 25 C37 35, 30 38.5, 24 38.5 C18 38.5, 11 35, 5 25 Z" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/>
        <circle cx="24" cy="25" r="5.5" fill="currentColor"/>
        <line x1="9" y1="40" x2="39" y2="10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`;
      break;
    default: return "";
  }
  return `<svg class="node-rhythm-icon" width="46" height="46" viewBox="0 0 48 48" aria-hidden="true">${body}</svg>`;
}

// Stufen-Symbol mit Richtungspfeil: aufwärts steht der Pfeil über dem Wort, abwärts darunter (reines SVG gegen Android-Emoji-Fallback)
function renderDirectionNodeCircle(word, direction = "up", colorClass = "circle-peach") {
  const isUp = direction !== "down";
  const arrowSvg = isUp
    ? `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12L12 4"/><polyline points="6 4 12 4 12 10"/></svg>`
    : `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4L12 12"/><polyline points="12 6 12 12 6 12"/></svg>`;
  const arrow = `<span class="node-dir-arrow" aria-hidden="true">${arrowSvg}</span>`;
  const label = `<span class="node-dir-word${String(word).length > 5 ? " is-long" : ""}">${escapeHtml(word)}</span>`;
  return `<div class="node-circle ${colorClass} node-circle-dir ${isUp ? "is-up" : "is-down"}">${isUp ? arrow + label : label + arrow}</div>`;
}

function getCategoryForMode(mode) {
  return MODE_CATEGORY_MAP[mode] || "cadence";
}

/**
 * Liefert den lokalisierten Überbegriff einer Kategorie für Top-Bar und Navigation.
 */
function getCategoryTitle(categoryKey) {
  const catNames = {
    cadence: tr("Kadenzen", "Cadences"),
    interval: tr("Intervalle", "Intervals"),
    chords: tr("Akkorde", "Chords"),
    melody: tr("Melodien", "Melodies"),
    solfege: "Solfège",
    rhythm: tr("Rhythmus", "Rhythm"),
    notation: tr("Notation", "Notation"),
    production: tr("Produktion", "Production"),
    modes: tr("Tonleitern & Modi", "Scales & Modes"),
    warmup: tr("Singen", "Singing")
  };
  return catNames[categoryKey] || tr("Übungen", "Exercises");
}
