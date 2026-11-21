/**
 * Lauscher • Mehrsprachigkeit (i18n) – Runtime-Engine & ko-lokalisierte Registrierung
 * Standardsprache ist Deutsch ("de"); alle 7 aktiven Sprachen (de, en, fr, es, pl, uk, ur)
 * werden in den ko-lokalisierten Dateien unter i18n/*.js gepflegt.
 */

const APP_LANGUAGES = {
  de: {
    code: "de",
    nativeName: "Deutsch",
    defaultNotation: "de",
    defaultIntervalNotation: "de",
    htmlLang: "de",
    available: true,
    placeholder: false
  },
  en: {
    code: "en",
    nativeName: "English",
    defaultNotation: "intl",
    defaultIntervalNotation: "intl",
    htmlLang: "en",
    available: true,
    placeholder: false
  },
  fr: {
    code: "fr",
    nativeName: "Français",
    defaultNotation: "intl",
    defaultIntervalNotation: "intl",
    htmlLang: "fr",
    available: true,
    placeholder: false
  },
  es: {
    code: "es",
    nativeName: "Español",
    defaultNotation: "intl",
    defaultIntervalNotation: "intl",
    htmlLang: "es",
    available: true,
    placeholder: false
  },
  it: { code: "it", nativeName: "Italiano",   defaultNotation: "intl", defaultIntervalNotation: "intl", htmlLang: "it", available: false, placeholder: true },
  nl: { code: "nl", nativeName: "Nederlands", defaultNotation: "intl", defaultIntervalNotation: "intl", htmlLang: "nl", available: false, placeholder: true },
  no: { code: "no", nativeName: "Norsk",      defaultNotation: "de",   defaultIntervalNotation: "de",   htmlLang: "nb", available: false, placeholder: true },
  pl: {
    code: "pl",
    nativeName: "Polski",
    defaultNotation: "de",
    defaultIntervalNotation: "de",
    htmlLang: "pl",
    available: true,
    placeholder: false
  },
  sv: { code: "sv", nativeName: "Svenska",    defaultNotation: "de",   defaultIntervalNotation: "de",   htmlLang: "sv", available: false, placeholder: true },
  tr: { code: "tr", nativeName: "Türkçe",     defaultNotation: "intl", defaultIntervalNotation: "intl", htmlLang: "tr", available: false, placeholder: true },
  el: { code: "el", nativeName: "Ελληνικά",   defaultNotation: "intl", defaultIntervalNotation: "intl", htmlLang: "el", available: false, placeholder: true },
  uk: {
    code: "uk",
    nativeName: "Українська",
    defaultNotation: "intl",
    defaultIntervalNotation: "intl",
    htmlLang: "uk",
    available: true,
    placeholder: false
  },
  ur: {
    code: "ur",
    nativeName: "اردو",
    defaultNotation: "intl",
    defaultIntervalNotation: "intl",
    htmlLang: "ur",
    dir: "rtl",
    available: true,
    placeholder: false
  }
};

function getAvailableLanguages() {
  return Object.keys(APP_LANGUAGES).filter(code => APP_LANGUAGES[code] && APP_LANGUAGES[code].available !== false);
}

const VALID_LANGUAGES = [];
function refreshValidLanguages() {
  VALID_LANGUAGES.length = 0;
  getAvailableLanguages().forEach(code => VALID_LANGUAGES.push(code));
  return VALID_LANGUAGES;
}
refreshValidLanguages();

const I18N_STATIC = {};
const TRANSLATIONS_BY_LANG = Object.create(null);
const I18N_STATIC_BY_LANG = Object.create(null);
const LOCALIZED_TABLES_BY_LANG = Object.create(null);
const LAUSCHEBAER_QUOTES = [];

function isLanguageAvailable(lang) {
  const clean = typeof lang === "string" ? lang.trim().toLowerCase() : "";
  return Boolean(clean && APP_LANGUAGES[clean] && APP_LANGUAGES[clean].available !== false);
}

function normalizeAppLanguage(lang) {
  const clean = typeof lang === "string" ? lang.trim().toLowerCase() : "";
  return isLanguageAvailable(clean) ? clean : "de";
}

function getLanguageConfig(lang = getAppLanguage()) {
  const code = normalizeAppLanguage(lang);
  return APP_LANGUAGES[code] || APP_LANGUAGES.de;
}

/**
 * Registriert ein komplettes Sprachpaket (weiterhin unterstützt für optionale externe Bundles).
 */
function registerLanguageBundle(langCode, bundle = {}) {
  const clean = typeof langCode === "string" ? langCode.trim().toLowerCase() : "";
  const code = APP_LANGUAGES[clean] ? clean : normalizeAppLanguage(langCode);
  const prev = APP_LANGUAGES[code] || {};
  const meta = bundle.meta && typeof bundle.meta === "object" ? bundle.meta : {};
  APP_LANGUAGES[code] = {
    ...prev,
    ...meta,
    code,
    available: bundle.available !== false,
    placeholder: false
  };
  refreshValidLanguages();
  if (bundle.staticStrings && typeof bundle.staticStrings === "object") {
    I18N_STATIC_BY_LANG[code] = {
      ...(I18N_STATIC_BY_LANG[code] || {}),
      ...bundle.staticStrings
    };
  }
  if (bundle.phrases && typeof bundle.phrases === "object") {
    TRANSLATIONS_BY_LANG[code] = {
      ...(TRANSLATIONS_BY_LANG[code] || {}),
      ...bundle.phrases
    };
  }
  if (bundle.tables && typeof bundle.tables === "object") {
    LOCALIZED_TABLES_BY_LANG[code] = {
      ...(LOCALIZED_TABLES_BY_LANG[code] || {}),
      ...bundle.tables
    };
  }
}

/**
 * Registriert ko-lokalisierte statische UI-Strings (data-i18n):
 * { "key": { de: "...", en: "...", fr: "...", es: "...", pl: "...", uk: "...", ur: "..." } }
 */
function registerColocatedStatic(entries) {
  if (!entries || typeof entries !== "object") return;
  for (const [key, byLang] of Object.entries(entries)) {
    if (!byLang || typeof byLang !== "object") continue;
    if (!I18N_STATIC[key]) I18N_STATIC[key] = {};
    if (Object.prototype.hasOwnProperty.call(byLang, "de")) I18N_STATIC[key].de = byLang.de;
    if (Object.prototype.hasOwnProperty.call(byLang, "en")) I18N_STATIC[key].en = byLang.en;
    for (const [lang, text] of Object.entries(byLang)) {
      if (lang === "de" || lang === "en") continue;
      if (!I18N_STATIC_BY_LANG[lang]) I18N_STATIC_BY_LANG[lang] = {};
      I18N_STATIC_BY_LANG[lang][key] = text;
    }
  }
}

/**
 * Registriert ko-lokalisierte Startseiten-Zitate:
 * [ { de: { cat, text }, en: { cat, text }, fr: ..., es: ..., pl: ..., uk: ..., ur: ... }, ... ]
 */
function registerColocatedQuotes(list) {
  if (!Array.isArray(list)) return;
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    if (item.de) LAUSCHEBAER_QUOTES.push(item.de);
    for (const [lang, q] of Object.entries(item)) {
      if (lang === "de") continue;
      if (!LOCALIZED_TABLES_BY_LANG[lang]) LOCALIZED_TABLES_BY_LANG[lang] = {};
      if (!Array.isArray(LOCALIZED_TABLES_BY_LANG[lang].quotes)) {
        LOCALIZED_TABLES_BY_LANG[lang].quotes = [];
      }
      LOCALIZED_TABLES_BY_LANG[lang].quotes.push(q);
    }
  }
}

/**
 * Registriert ko-lokalisierte Katalog-Tabellen:
 * { tableName: { entryKey: { en: ..., fr: ..., es: ..., pl: ..., uk: ..., ur: ... } } }
 */
function registerColocatedTables(tablesByName) {
  if (!tablesByName || typeof tablesByName !== "object") return;
  for (const [tableName, entries] of Object.entries(tablesByName)) {
    if (!entries || typeof entries !== "object") continue;
    for (const [entryKey, byLang] of Object.entries(entries)) {
      if (!byLang || typeof byLang !== "object") continue;
      for (const [lang, val] of Object.entries(byLang)) {
        if (!LOCALIZED_TABLES_BY_LANG[lang]) LOCALIZED_TABLES_BY_LANG[lang] = {};
        if (!LOCALIZED_TABLES_BY_LANG[lang][tableName]) {
          LOCALIZED_TABLES_BY_LANG[lang][tableName] = {};
        }
        LOCALIZED_TABLES_BY_LANG[lang][tableName][entryKey] = val;
      }
    }
  }
}

/**
 * Registriert ko-lokalisierte dynamische tr()/tf()-Phrasen:
 * { "Deutscher Schlüssel": { fr: "...", es: "...", pl: "...", uk: "...", ur: "..." } }
 */
function registerColocatedPhrases(entries) {
  if (!entries || typeof entries !== "object") return;
  for (const [deKey, byLang] of Object.entries(entries)) {
    if (!byLang || typeof byLang !== "object") continue;
    for (const [lang, text] of Object.entries(byLang)) {
      if (!TRANSLATIONS_BY_LANG[lang]) TRANSLATIONS_BY_LANG[lang] = {};
      TRANSLATIONS_BY_LANG[lang][deKey] = text;
    }
  }
}

function readStoredAppLanguage() {
  try {
    if (typeof localStorage === "undefined") return "de";
    const raw = localStorage.getItem("lauschebaer_visual_prefs_v1");
    if (!raw) return "de";
    const parsed = JSON.parse(raw);
    return parsed && parsed.language ? normalizeAppLanguage(parsed.language) : "de";
  } catch (_e) {
    return "de";
  }
}

function getAppLanguage() {
  try {
    if (typeof state !== "undefined" && state?.settings?.language && VALID_LANGUAGES.includes(state.settings.language)) {
      return state.settings.language;
    }
  } catch (_tdz) {
    // Ignore TDZ ReferenceError while `const state = new AppState()` is still initializing.
  }
  if (typeof document !== "undefined" && document.documentElement) {
    const attr = document.documentElement.getAttribute("data-lang") || document.documentElement.lang;
    if (attr && VALID_LANGUAGES.includes(attr)) return attr;
  }
  return readStoredAppLanguage();
}

function isEnglishLang() {
  return getAppLanguage() === "en";
}

function tr(deText, enText, extraMap = null) {
  const lang = getAppLanguage();
  if (lang === "de") return deText;
  if (lang === "en") return enText;
  if (extraMap && typeof extraMap === "object" && Object.prototype.hasOwnProperty.call(extraMap, lang)) {
    return extraMap[lang];
  }
  const dict = TRANSLATIONS_BY_LANG[lang];
  if (dict) {
    if (Object.prototype.hasOwnProperty.call(dict, deText)) return dict[deText];
    if (Object.prototype.hasOwnProperty.call(dict, enText)) return dict[enText];
  }
  return enText;
}

function tf(deTemplate, enTemplate, vars = {}, extraMap = null) {
  const tpl = tr(deTemplate, enTemplate, extraMap);
  return String(tpl).replace(/\{([a-zA-Z0-9_]+)\}/g, (_m, k) => (
    Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : ""
  ));
}

function setElementLocalizedText(el, text) {
  if (!el || typeof text !== "string") return;
  // Automatisch formatierte Markennamen (<span class="brand-word">, siehe app.js) vorher
  // wieder zu reinem Text machen, damit der Text unten sauber ersetzt wird.
  if (typeof el.querySelectorAll === "function") {
    const brandSpans = el.querySelectorAll(".brand-word");
    if (brandSpans.length > 0) {
      brandSpans.forEach(span => span.replaceWith(document.createTextNode(span.textContent)));
      el.normalize?.();
    }
  }
  if (!el.children || el.children.length === 0) {
    el.textContent = text;
    return;
  }
  const nodes = Array.from(el.childNodes || []);
  let updated = false;
  for (const n of nodes) {
    if (n.nodeType === 3 && n.textContent && n.textContent.trim().length > 0) {
      n.textContent = text;
      updated = true;
      break;
    }
  }
  if (!updated) el.textContent = text;
}

function getStaticI18nText(key, lang = getAppLanguage()) {
  const activeLang = normalizeAppLanguage(lang);
  const ext = I18N_STATIC_BY_LANG[activeLang];
  if (ext && Object.prototype.hasOwnProperty.call(ext, key)) {
    return ext[key];
  }
  const entry = I18N_STATIC[key];
  if (!entry) return null;
  if (Object.prototype.hasOwnProperty.call(entry, activeLang)) {
    return entry[activeLang];
  }
  return entry.en ?? entry.de ?? null;
}

function getLanguageSoonLabel(activeLang = getAppLanguage()) {
  const active = normalizeAppLanguage(activeLang);
  const extText = I18N_STATIC_BY_LANG[active]?.["settings.langSoon"];
  if (typeof extText === "string" && extText.length > 0) return extText;
  const entry = I18N_STATIC["settings.langSoon"];
  return (entry && (entry[active] || entry.en || entry.de)) || "demnächst";
}

function getOrderedDropdownLanguages(activeLang = getAppLanguage()) {
  const active = normalizeAppLanguage(activeLang);
  const soonTag = getLanguageSoonLabel(active);
  const restCodes = Object.keys(APP_LANGUAGES)
    .filter(code => code !== active)
    .sort((a, b) => {
      const nameA = APP_LANGUAGES[a]?.nativeName || a;
      const nameB = APP_LANGUAGES[b]?.nativeName || b;
      return nameA.localeCompare(nameB, active, { sensitivity: "base" });
    });

  return [active, ...restCodes].map(code => {
    const cfg = APP_LANGUAGES[code] || { code, nativeName: code, available: false };
    const isPlaceholder = cfg.available === false;
    return {
      code,
      nativeName: cfg.nativeName || code,
      label: isPlaceholder ? `${cfg.nativeName} (${soonTag})` : (cfg.nativeName || code),
      disabled: isPlaceholder,
      selected: code === active
    };
  });
}

function syncLanguageSelectOptions(activeLang = getAppLanguage()) {
  if (typeof document === "undefined") return;
  const langSelect = document.getElementById?.("languageSelect");
  if (!langSelect) return;
  const active = normalizeAppLanguage(activeLang);
  const ordered = getOrderedDropdownLanguages(active);

  if (typeof document.createElement === "function" && typeof langSelect.appendChild === "function") {
    langSelect.innerHTML = "";
    ordered.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item.code;
      opt.textContent = item.label;
      opt.disabled = item.disabled;
      if (item.disabled) opt.setAttribute?.("disabled", "disabled");
      else opt.removeAttribute?.("disabled");
      opt.selected = item.selected;
      langSelect.appendChild(opt);
    });
  }
  langSelect.value = active;
}

function applyStaticDomLanguage(lang = getAppLanguage()) {
  const activeLang = normalizeAppLanguage(lang);
  const langCfg = getLanguageConfig(activeLang);
  const htmlLang = langCfg.htmlLang || activeLang;
  const textDir = langCfg.dir === "rtl" ? "rtl" : "ltr";
  if (typeof document === "undefined") return;

  if (document.documentElement) {
    document.documentElement.lang = htmlLang;
    document.documentElement.dir = textDir;
    document.documentElement.setAttribute("data-lang", activeLang);
  }
  const titleText = getStaticI18nText("app.title", activeLang);
  if (titleText) {
    document.title = titleText;
  }

  document.querySelectorAll?.("[data-i18n]").forEach(el => {
    const key = (el.dataset && el.dataset.i18n) || el.getAttribute?.("data-i18n");
    const text = getStaticI18nText(key, activeLang);
    if (text != null) setElementLocalizedText(el, text);
  });
  document.querySelectorAll?.("[data-i18n-title]").forEach(el => {
    const key = (el.dataset && el.dataset.i18nTitle) || el.getAttribute?.("data-i18n-title");
    const text = getStaticI18nText(key, activeLang);
    if (text != null) el.title = text;
  });
  document.querySelectorAll?.("[data-i18n-aria]").forEach(el => {
    const key = (el.dataset && el.dataset.i18nAria) || el.getAttribute?.("data-i18n-aria");
    const text = getStaticI18nText(key, activeLang);
    if (text != null) el.setAttribute?.("aria-label", text);
  });
  document.querySelectorAll?.("[data-i18n-placeholder]").forEach(el => {
    const key = (el.dataset && el.dataset.i18nPlaceholder) || el.getAttribute?.("data-i18n-placeholder");
    const text = getStaticI18nText(key, activeLang);
    if (text != null) el.placeholder = text;
  });

  syncLanguageSelectOptions(activeLang);
}

function getLocalizedTable(tableName, lang = getAppLanguage()) {
  const code = normalizeAppLanguage(lang);
  if (code === "de") return null;
  return LOCALIZED_TABLES_BY_LANG[code]?.[tableName] || null;
}

function getLocalizedTableEntry(tableName, key, lang = getAppLanguage()) {
  const code = normalizeAppLanguage(lang);
  if (code === "de") return null;
  const tbl = LOCALIZED_TABLES_BY_LANG[code]?.[tableName];
  if (tbl && Object.prototype.hasOwnProperty.call(tbl, key)) return tbl[key];
  const enTbl = LOCALIZED_TABLES_BY_LANG.en?.[tableName];
  return (enTbl && Object.prototype.hasOwnProperty.call(enTbl, key)) ? enTbl[key] : null;
}

function localizeEntry(base, patch) {
  if (!base || getAppLanguage() === "de" || !patch) return base;
  return { ...base, ...patch };
}

function localizeEntryByTable(base, tableName, key) {
  const lang = getAppLanguage();
  if (!base || lang === "de") return base;
  const patch = getLocalizedTableEntry(tableName, key, lang);
  return patch ? { ...base, ...patch } : base;
}

function getLocalizedQuotes() {
  if (getAppLanguage() === "de") return LAUSCHEBAER_QUOTES;
  return getLocalizedTable("quotes") || LOCALIZED_TABLES_BY_LANG.en?.quotes || LAUSCHEBAER_QUOTES;
}

function getLocalizedProfileInstrumentLabel(key) {
  if (getAppLanguage() === "de") return key;
  return getLocalizedTableEntry("profileInstruments", key) || key;
}

function getLocalizedProfileFocus(key) {
  const base = PROFILE_FOCUS_OPTIONS[key] || PROFILE_FOCUS_OPTIONS.allround;
  if (getAppLanguage() === "de") return base;
  const patch = getLocalizedTableEntry("profileFocus", base.key);
  return patch ? { ...base, ...patch } : base;
}

function getLocalizedProfileAccessoryLabel(opt) {
  if (!opt) return "";
  if (getAppLanguage() === "de") return opt.label;
  return getLocalizedTableEntry("profileAccessories", opt.key) || opt.label;
}

function getLocalizedMixModeLabel(mode) {
  const de = MIX_MODE_CATALOG[mode]?.label || mode;
  if (getAppLanguage() === "de") return de;
  return getLocalizedTableEntry("mixModes", mode) || de;
}

function getLocalizedMixTitle(mix) {
  if (!mix) return tr("Mein Mix", "My Mix");
  const lang = getAppLanguage();
  const deTitle = LOCALIZED_TABLES_BY_LANG.de?.defaultMixTitles?.[mix.id];
  const enTitle = LOCALIZED_TABLES_BY_LANG.en?.defaultMixTitles?.[mix.id];
  if (deTitle || enTitle) {
    const knownTitles = new Set([deTitle, enTitle].filter(Boolean));
    VALID_LANGUAGES.forEach(code => {
      const t = LOCALIZED_TABLES_BY_LANG[code]?.defaultMixTitles?.[mix.id];
      if (typeof t === "string" && t) knownTitles.add(t);
    });
    if (knownTitles.has(mix.title)) {
      if (lang === "de") return deTitle || mix.title;
      const localized = LOCALIZED_TABLES_BY_LANG[lang]?.defaultMixTitles?.[mix.id];
      return (typeof localized === "string" && localized) ? localized : (enTitle || mix.title);
    }
  }
  return mix.title;
}

function getLocalizedKeyName(keyCode) {
  if (getAppLanguage() === "de") return null;
  return getLocalizedTableEntry("keyNames", keyCode);
}

function getLocalizedDegreeDef(degKey) {
  return localizeEntryByTable(HARMONIC_DATA.degrees[degKey], "degrees", degKey);
}

const INTERVAL_GERMAN_SYMBOLS = {
  "m2": "k2",
  "M2": "G2",
  "m3": "k3",
  "M3": "G3",
  "m6": "k6",
  "M6": "G6",
  "m7": "k7",
  "M7": "G7",
  "m9": "k9",
  "M9": "G9"
};

/**
 * Formats an interval symbol according to the user's interval notation preference
 * ('de' -> P / G / k, 'intl' -> P / M / m).
 */
function formatIntervalSymbol(keyOrSym) {
  const sym = String(keyOrSym || "");
  const useGerman = typeof state !== "undefined" ? state?.profile?.intervalNotation !== "intl" : true;
  return useGerman ? (INTERVAL_GERMAN_SYMBOLS[sym] || sym) : sym;
}

function getLocalizedIntervalDef(key) {
  const base = localizeEntryByTable(HARMONIC_DATA.intervals[key], "intervals", key);
  return base ? { ...base, key: base.key || key, symbol: formatIntervalSymbol(base.symbol || key) } : base;
}

function getLocalizedChordDef(key) {
  return localizeEntryByTable(HARMONIC_DATA.chords[key], "chords", key);
}

function getLocalizedChordInversionDef(key) {
  return localizeEntryByTable(HARMONIC_DATA.chordInversions[key], "chordInversions", key);
}

function getLocalizedSolfegeStepLabel(stepKey, deFallback) {
  if (getAppLanguage() === "de") return deFallback;
  return getLocalizedTableEntry("solfegeStepsLabel", stepKey) || deFallback;
}

function getLocalizedMelodyRange(rangeKey) {
  return localizeEntryByTable(MELODY_RANGE_CONFIG[rangeKey], "melodyRanges", rangeKey);
}

function getLocalizedRhythmMeter(meterKey) {
  return localizeEntryByTable(RHYTHM_METERS[meterKey], "rhythmMeters", meterKey);
}

function getLocalizedRhythmCell(cellKey) {
  return localizeEntryByTable(RHYTHM_DICTATION_CELLS[cellKey], "rhythmCells", cellKey);
}

function getLocalizedRhythmTapLevel(lvl) {
  const base = RHYTHM_TAP_LEVELS[lvl];
  if (!base || getAppLanguage() === "de") return base;
  const label = getLocalizedTableEntry("rhythmTapLevels", lvl);
  return label ? { ...base, label } : base;
}

function getLocalizedRhythmGroove(key) {
  return localizeEntryByTable(RHYTHM_GROOVE_STYLES[key], "rhythmGrooves", key);
}

function getLocalizedRhythmOffbeat(key) {
  return localizeEntryByTable(RHYTHM_OFFBEAT_POSITIONS[key], "rhythmOffbeats", key);
}

function getLocalizedRhythmMicroTiming(key) {
  return localizeEntryByTable(RHYTHM_MICRO_TIMING_OPTIONS[key], "rhythmMicro", key);
}

function getLocalizedProdFreq(key) {
  return localizeEntryByTable(PROD_FREQUENCIES[key], "prodFreqs", key);
}

function getLocalizedProdLevelLabel(kind, lvl) {
  if (getAppLanguage() === "de") {
    return kind === "tone"
      ? (PROD_TONE_LEVELS[lvl]?.label || "")
      : (PROD_EQ_NOISE_LEVELS[lvl]?.label || "");
  }
  return getLocalizedTableEntry("prodLevelLabels", kind)?.[lvl] || "";
}

function getLocalizedModeDef(key) {
  const entry = localizeEntryByTable(MODES_TRAINING_DATA[key], "modes", key);
  // Kirchentonarten tragen ihre Stufe der Dur-Tonleiter im Namen, z. B. „Dorisch (2)“
  const degree = MODES_TRAINING_DATA[key]?.degree;
  if (!entry || !degree) return entry;
  // baseRoman/degreeTag: Antwort-Kacheln zeigen die Stufe als eigene Zeile unter dem Namen
  return {
    ...entry,
    baseRoman: entry.roman,
    degreeTag: tf("{n}. Stufe", "Degree {n}", { n: degree }),
    roman: `${entry.roman} (${degree})`
  };
}

function getLocalizedModeLevelLabel(kind, lvl) {
  if (getAppLanguage() === "de") {
    const map = kind === "scale" ? MODE_SCALE_LEVELS : (kind === "char" ? MODE_CHAR_LEVELS : MODE_CADENCE_LEVELS);
    return map[lvl]?.label || "";
  }
  return getLocalizedTableEntry("modeLevelLabels", kind)?.[lvl] || "";
}
