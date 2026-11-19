/**
 * Lauscher • Mehrsprachigkeit (i18n) – Sprachsteuerung & erweiterbare Sprach-Bundles
 * Standardsprache bleibt Deutsch ("de"); weitere Sprachen (z. B. "en", "fr") werden über
 * `APP_LANGUAGES` und `registerLanguageBundle(...)` angebunden.
 */

const APP_LANGUAGES = {
  de: {
    code: "de",
    nativeName: "Deutsch",
    defaultNotation: "de",
    defaultIntervalNotation: "de",
    htmlLang: "de",
    available: true
  },
  en: {
    code: "en",
    nativeName: "English",
    defaultNotation: "intl",
    defaultIntervalNotation: "intl",
    htmlLang: "en",
    available: true
  },
  fr: {
    code: "fr",
    nativeName: "Français",
    defaultNotation: "intl",
    defaultIntervalNotation: "intl",
    htmlLang: "fr",
    available: true
  },
  es: { code: "es", nativeName: "Español",    defaultNotation: "intl", defaultIntervalNotation: "intl", htmlLang: "es", available: true },
  it: { code: "it", nativeName: "Italiano",   defaultNotation: "intl", defaultIntervalNotation: "intl", htmlLang: "it", available: false, placeholder: true },
  nl: { code: "nl", nativeName: "Nederlands", defaultNotation: "intl", defaultIntervalNotation: "intl", htmlLang: "nl", available: false, placeholder: true },
  no: { code: "no", nativeName: "Norsk",      defaultNotation: "de",   defaultIntervalNotation: "de",   htmlLang: "nb", available: false, placeholder: true },
  pl: { code: "pl", nativeName: "Polski",     defaultNotation: "de",   defaultIntervalNotation: "de",   htmlLang: "pl", available: false, placeholder: true },
  sv: { code: "sv", nativeName: "Svenska",    defaultNotation: "de",   defaultIntervalNotation: "de",   htmlLang: "sv", available: false, placeholder: true },
  tr: { code: "tr", nativeName: "Türkçe",     defaultNotation: "intl", defaultIntervalNotation: "intl", htmlLang: "tr", available: false, placeholder: true },
  el: { code: "el", nativeName: "Ελληνικά",   defaultNotation: "intl", defaultIntervalNotation: "intl", htmlLang: "el", available: false, placeholder: true },
  uk: { code: "uk", nativeName: "Українська", defaultNotation: "intl", defaultIntervalNotation: "intl", htmlLang: "uk", available: false, placeholder: true },
  ur: { code: "ur", nativeName: "اردو",       defaultNotation: "intl", defaultIntervalNotation: "intl", htmlLang: "ur", dir: "rtl", available: false, placeholder: true }
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

const TRANSLATIONS_BY_LANG = Object.create(null);
const I18N_STATIC_BY_LANG = Object.create(null);
const LOCALIZED_TABLES_BY_LANG = Object.create(null);

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
 * Registriert ein externes Sprachpaket (statische DOM-Texte, Phrasen, Zitate und Tabellen).
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

const I18N_STATIC = {
  "app.title": { de: "Lauscher • Hören · Verstehen · Musizieren", en: "Lauscher • Listen · Understand · Play" },
  "app.tagline": { de: "Hören · Verstehen · Musizieren", en: "Listen · Understand · Play" },
  "app.portraitOnlyTitle": { de: "Bitte im Hochformat nutzen", en: "Please Use Portrait Mode" },
  "app.portraitOnlySub": {
    de: "Drehe dein Smartphone ins Hochformat (Portrait-Modus), um weiterzuüben.",
    en: "Rotate your phone to portrait orientation to continue practicing."
  },
  "welcome.stepProgress": {
    de: "Schritt {n} von {total}",
    en: "Step {n} of {total}"
  },
  "welcome.backBtn": { de: "← Zurück", en: "← Back" },
  "welcome.nextBtn": { de: "Weiter →", en: "Next →" },
  "welcome.lookTitle": { de: "Wähle deinen Look", en: "Choose Your Look" },
  "welcome.lookSub": {
    de: "Erscheinungsbild und Farbschema für entspanntes Üben.",
    en: "Pick the appearance and color palette that feels best for your eyes."
  },
  "welcome.lookCustomHint": {
    de: "Tipp: Später kannst du unter ‚Mein Konto → Themes & Farbdesigner‘ jederzeit bis zu 3 ganz eigene Themes gestalten!",
    en: "Tip: Later you can create up to 3 completely custom color themes anytime in ‘My Account → Themes & Color Studio’!"
  },
  "welcome.autoNextTitle": { de: "Nach richtiger Lösung weiter?", en: "Auto-Play Next Prompt?" },
  "welcome.autoNextSub": {
    de: "Bestimme, ob automatisch die nächste Aufgabe abgespielt wird.",
    en: "Choose whether the next exercise plays automatically right after a correct answer."
  },
  "welcome.autoNextOnTitle": {
    de: "Automatisch weiterspielen (Empfohlen)",
    en: "Auto-Play Next (Recommended)"
  },
  "welcome.autoNextOnDesc": {
    de: "Startet nach einer richtigen Antwort sofort die nächste Aufgabe für flüssigen Spielfluss.",
    en: "Starts the next prompt right away after solving for smooth, uninterrupted practice."
  },
  "welcome.autoNextOffTitle": { de: "Manuell abspielen", en: "Manual Playback" },
  "welcome.autoNextOffDesc": {
    de: "Wartet nach jeder Lösung, bis du bewusst selbst den nächsten Ton abspielst.",
    en: "Waits after each solution until you explicitly press Play for the next exercise."
  },
  "welcome.profileTitle": { de: "Dein Musiker-Profil", en: "Your Musician Profile" },
  "welcome.profileSub": {
    de: "Wie darf dich Lauscher begrüßen und welche Instrumente spielst du?",
    en: "How may Lauscher greet you, and which instruments do you play?"
  },
  "welcome.focusTitle": { de: "Dein Lernschwerpunkt", en: "Your Learning Focus" },
  "welcome.focusSub": {
    de: "Worauf möchtest du dich zuerst konzentrieren?",
    en: "What would you like to prioritize first?"
  },
  "welcome.beginnerOptInBadge": {
    de: "🌱 Einsteiger-Tour (Opt-In)",
    en: "🌱 Beginner Tour (Opt-In)"
  },
  "welcome.beginnerOptInTitle": {
    de: "Komplett neu in der Musikwelt?",
    en: "Brand new to the world of music?"
  },
  "welcome.beginnerOptInDesc": {
    de: "Möchtest du vor dem Start in 3 kurzen Schritten erfahren, was Intervalle, Akkorde & Kadenzen sind und womit du am besten anfängst?",
    en: "Would you like a short 3-step introduction before starting that explains intervals, chords & cadences and what to practice first?"
  },
  "welcome.beginnerOptInNo": { de: "Direkt starten", en: "Start directly" },
  "welcome.beginnerOptInYes": { de: "🌱 Ja, Einführung starten", en: "🌱 Yes, start intro" },
  "welcome.begStep1Tag": { de: "Einsteiger-Einführung • 1 / 3", en: "Beginner Intro • 1 / 3" },
  "welcome.begStep1Title": {
    de: "Die Bausteine der Musik – leicht erklärt",
    en: "The Building Blocks of Music — Made Simple"
  },
  "welcome.begStep1Sub": {
    de: "Was für Musiker selbstverständlich klingt, besteht aus vier einfachen Grundideen:",
    en: "Terms that musicians take for granted come down to four simple ideas:"
  },
  "welcome.begTermIntervalsTitle": {
    de: "🎵 Intervalle (Ton-Abstände)",
    en: "🎵 Intervals (Distances Between Notes)"
  },
  "welcome.begTermIntervalsDesc": {
    de: "Ein Intervall ist einfach der Abstand zwischen zwei Tönen – wie zwei Treppenstufen. Liegen sie nah beieinander, klingt es nach einem kleinen Schritt; liegen sie weit auseinander, nach einem großen Sprung. Aus solchen Sprüngen entsteht jede Melodie.",
    en: "An interval is simply the distance between two notes — like steps on a staircase. Close notes sound like a small step; distant notes sound like a wide leap. Every melody is built from these steps and leaps."
  },
  "welcome.begTermChordsTitle": {
    de: "🎹 Akkorde (Zusammenklänge)",
    en: "🎹 Chords (Notes Sounding Together)"
  },
  "welcome.begTermChordsDesc": {
    de: "Wenn drei oder mehr Töne gleichzeitig erklingen, nennt man das einen Akkord. Die beiden wichtigsten Klangfarben sind Dur (wirkt oft hell, offen, strahlend) und Moll (wirkt oft weich, nachdenklich, warm).",
    en: "When three or more notes ring out at the same time, they form a chord. The two most important colors are Major (often bright, open, sunny) and Minor (often soft, reflective, warm)."
  },
  "welcome.begTermCadencesTitle": {
    de: "🧭 Kadenzen (Harmonische Wegweiser)",
    en: "🧭 Cadences (Harmonic Signposts)"
  },
  "welcome.begTermCadencesDesc": {
    de: "Eine Kadenz ist eine kurze Folge von Akkorden – wie Satzzeichen in einer Geschichte. Manche Akkorde bauen Spannung auf (wie ein Fragezeichen), andere führen wieder entspannt nach Hause zum Grundton (wie ein Punkt am Satzende).",
    en: "A cadence is a short sequence of chords — like punctuation in a story. Some chords build tension (like a question mark), while others resolve calmly back home to the tonic (like a period at the end of a sentence)."
  },
  "welcome.begTermScalesTitle": {
    de: "🪜 Tonleitern, Solfège & Rhythmus",
    en: "🪜 Scales, Solfège & Rhythm"
  },
  "welcome.begTermScalesDesc": {
    de: "Eine Tonleiter ist der Ton-Vorrat eines Liedes. Mit Solfège (Do–Re–Mi) bekommt jede Stufe einen festen Rufnamen im Ohr, und der Rhythmus gibt der Musik ihren Puls, zu dem man automatisch mitwippt.",
    en: "A scale is the pool of notes a song uses. Solfège (Do–Re–Mi) gives each scale step a familiar name in your ear, while rhythm provides the steady pulse you tap your foot to."
  },
  "welcome.begStep2Tag": { de: "Einsteiger-Einführung • 2 / 3", en: "Beginner Intro • 2 / 3" },
  "welcome.begStep2Title": {
    de: "Was ist am Anfang sinnvoll zu üben?",
    en: "What Makes Sense to Practice First?"
  },
  "welcome.begStep2Sub": {
    de: "Du musst nicht alles auf einmal ausprobieren. Mit diesen 3 Schritten gelingt der Einstieg ganz entspannt:",
    en: "You don’t need to try everything at once. These 3 gentle steps are the ideal way to start:"
  },
  "welcome.begTip1Title": {
    de: "🥇 1. Intervalle (Stufe 1) & der „Nur hören“-Modus",
    en: "🥇 1. Intervals (Level 1) & Listen-Only Mode"
  },
  "welcome.begTip1Desc": {
    de: "Starte mit „Intervalle • Stufe 1 (Grundlagen)“. Dort gibt es nur wenige, gut unterscheidbare Tonabstände. Tipp: Schalte oben im Modul ruhig zuerst den „Nur hören“-Modus ein, um den Klängen ohne Abfrage-Druck zu lauschen.",
    en: "Start with ‘Intervals • Level 1 (Foundations)’, which uses only a few distinct note distances. Tip: Turn on ‘Listen-Only’ mode at the top of the module first so you can simply absorb the sounds without quiz pressure."
  },
  "welcome.begTip2Title": {
    de: "🥈 2. Akkorde (Dur vs. Moll) & Rhythmus-Puls",
    en: "🥈 2. Chords (Major vs. Minor) & Rhythm Pulse"
  },
  "welcome.begTip2Desc": {
    de: "Achte bei „Akkorde • Stufe 1“ nur auf dein Bauchgefühl: Klingt der Akkord eher hell (Dur) oder weich und nachdenklich (Moll)? Im Modul „Rhythmus“ kannst du außerdem einfache Takte auf dem Tap-Pad nachklopfen.",
    en: "In ‘Chords • Level 1’, just trust your gut feeling: does the chord sound bright (Major) or soft and reflective (Minor)? In the ‘Rhythm’ module, you can also tap simple bars back on the live pad."
  },
  "welcome.begTip3Title": {
    de: "🥉 3. Kurze Melodien (Do – Fa) & der Wissens-Hub",
    en: "🥉 3. Short Melodies (Do – Fa) & the Knowledge Hub"
  },
  "welcome.begTip3Desc": {
    de: "In „Melodien • Stufe 1“ baust du kleine Tonfolgen aus nur 4 Tönen nach. Und wann immer dir ein Begriff neu ist, tippe unten in der Leiste auf das Buch-Symbol (Wissen) – dort ist alles mit Klangbeispielen zum Antippen erklärt.",
    en: "In ‘Melodies • Level 1’, you rebuild short phrases using just 4 notes. Whenever a term feels unfamiliar, tap the book icon (Knowledge) in the bottom bar to explore interactive audio explanations."
  },
  "welcome.begApplyPresetBtn": {
    de: "✨ Empfohlenen Startpunkt (Intervalle • Stufe 1) auswählen",
    en: "✨ Select recommended starting point (Intervals • Level 1)"
  },
  "welcome.begApplyPresetDone": {
    de: "✓ Empfohlener Startpunkt (Intervalle • Stufe 1) ausgewählt",
    en: "✓ Recommended starting point (Intervals • Level 1) selected"
  },
  "welcome.begStep3Tag": { de: "Einsteiger-Einführung • 3 / 3", en: "Beginner Intro • 3 / 3" },
  "welcome.begStep3Title": {
    de: "Lass dich am Anfang nicht erschlagen!",
    en: "Don’t Feel Overwhelmed at the Start!"
  },
  "welcome.begStep3Sub": {
    de: "Ein ehrlicher Hinweis, bevor du deinen ersten Ton abspielst:",
    en: "An honest note of encouragement before you play your first note:"
  },
  "welcome.begEncourage1Title": {
    de: "💛 Es ist völlig normal, sich anfangs überwältigt zu fühlen",
    en: "💛 It’s completely normal to feel overwhelmed at first"
  },
  "welcome.begEncourage1Desc": {
    de: "Begriffe wie „Quinte“, „Kadenz“, „Solfège“ oder „Notenschlüssel“ wirken am Anfang oft wie eine riesige Flut an Informationen. Wenn du dich davon erst einmal erschlagen fühlst oder oft danebenliegst, ist das vollkommen normal – und bedeutet niemals, dass du „unmusikalisch“ bist!",
    en: "Terms like ‘fifth’, ‘cadence’, ‘solfège’, or ‘clef’ can feel like a huge wave of information on day one. If it feels like a lot at first or you miss many answers early on, that is completely normal — and never means you’re ‘unmusical’!"
  },
  "welcome.begEncourage2Title": {
    de: "🌱 Das Geheimnis ist einfach, entspannt am Ball zu bleiben",
    en: "🌱 The secret is simply staying with it at your own pace"
  },
  "welcome.begEncourage2Desc": {
    de: "Musikalisches Gehör wächst wie eine Sprache durch kleine, regelmäßige Gewohnheiten. Schon 5 ruhige Minuten alle paar Tage reichen aus. In Lauscher gibt es keinen Punktedruck: Jeder falsche Tipp ist einfach ein kostenloser Hör-Vergleich für dein Ohr.",
    en: "Your musical ear grows just like learning a language — through small, steady habits. Even 5 calm minutes every few days is enough. There is zero score pressure in Lauscher: every wrong guess is simply a free listening comparison for your ear."
  },
  "welcome.begEncourage3Title": {
    de: "🎧 Nimm dir Zeit & nutze alle Hörhilfen",
    en: "🎧 Take your time & use the listening aids"
  },
  "welcome.begEncourage3Desc": {
    de: "Nutze jederzeit „Grundton hören“, „Ton nochmal“ oder die A/B-Vergleiche. Mach eine Pause, sobald dein Kopf voll ist, und bleib einfach neugierig dran – schon nach kurzer Zeit wirst du staunen, was dein Ohr plötzlich wie von selbst erkennt!",
    en: "Use ‘Hear Root’, ‘Replay Note’, or the A/B comparisons anytime. Take a break whenever your head feels full, and just keep going with curiosity — before long, you’ll be amazed by what your ear suddenly recognizes naturally!"
  },
  "welcome.greetBeginnerBtn": {
    de: "🌱 Komplett neu in der Musik? Kurze Einführung starten",
    en: "🌱 Brand new to music? Start short beginner intro"
  },
  "welcome.greetTitle": {
    de: "Hallo! Schön, dass du da bist.",
    en: "Hello! Welcome to Lauscher."
  },
  "welcome.greetNamedTitle": {
    de: "Hallo, {name}! Schön, dass du da bist.",
    en: "Hi, {name}! Welcome to Lauscher."
  },
  "welcome.greetBody": {
    de: "Ich bin Lauscher und freue mich darauf, mit dir zu hören, Noten zu entdecken und Musik zu verstehen. Viel Freude und Erfolg beim Lernen!",
    en: "I’m Lauscher, excited to explore ear training, sight-reading, and music theory together with you. Take your time and have lots of fun learning!"
  },
  "welcome.continueBtn": {
    de: "Los geht’s →",
    en: "Let’s get started →"
  },
  "welcome.redirectHint": {
    de: "Du wirst gleich zum Homescreen weitergeleitet …",
    en: "Taking you to the home screen…"
  },
  "nav.backTitle": { de: "Zurück", en: "Back" },
  "header.masterVolTitle": { de: "Master-Lautstärke", en: "Master Volume" },
  "header.muteTitle": { de: "Stummschalten", en: "Mute Audio" },
  "header.unmuteTitle": { de: "Ton einschalten", en: "Unmute Audio" },
  "header.mixerTitle": { de: "Mixer", en: "Mixer" },
  "header.settingsTitle": { de: "Tonart, Tempo & Taktart", en: "Settings, Language & Theme" },
  "header.settingsAria": { de: "Einstellungen", en: "Settings" },
  "master.on": { de: "An", en: "On" },
  "master.muted": { de: "Stumm", en: "Muted" },

  "home.refreshQuoteTitle": { de: "Tippe für einen neuen Gedanken", en: "Tap for a new tip" },
  "home.newQuote": { de: "Neu ↻", en: "New ↻" },
  "home.continue": { de: "▶ Weiterüben", en: "▶ Continue" },
  "home.startHere": { de: "▶ Beginne hier", en: "▶ Start Here" },
  "space.mixesHomeToggleLabel": { de: "Schnellstart auf der Startseite anzeigen", en: "Show quick start on home screen" },
  "home.surpriseTitle": { de: "Zufällige Übung starten", en: "Start a random exercise" },
  "home.surprise": { de: "Zufall", en: "Surprise" },
  "home.exercisesHeading": { de: "Gehörtraining & Musik", en: "Ear Training & Music" },
  "home.studioHeading": { de: "Studio & Mixing", en: "Studio & Mixing" },
  "home.catIntervals": { de: "Intervalle", en: "Intervals" },
  "home.catIntervalsDesc": { de: "Aufwärts, abwärts & harmonisch gleichzeitig", en: "Ascending, descending & harmonic simultaneously" },
  "home.catChords": { de: "Akkorde", en: "Chords" },
  "home.catChordsDesc": { de: "Arpeggios auf-/abwärts, Vollklänge & Umkehrungen", en: "Ascending/descending arpeggios, block chords & inversions" },
  "home.catCadences": { de: "Kadenzen", en: "Cadences" },
  "home.catCadencesDesc": { de: "Harmonien & Akkordfolgen im Kontext erkennen", en: "Hear chords & progressions in harmonic context" },
  "home.catSolfege": { de: "Solfège", en: "Solfège" },
  "home.catSolfegeDesc": { de: "Tonstufen mit Do, Re, Mi in einer Tonart erleben", en: "Feel scale degrees (Do–Re–Mi) inside a key" },
  "home.catModes": { de: "Tonleitern & Modi", en: "Scales & Modes" },
  "home.catModesDesc": { de: "Kirchentonarten, Charaktertöne & modale Kadenzen", en: "Church modes, characteristic notes & modal vamps" },
  "home.catMelodies": { de: "Melodien", en: "Melodies" },
  "home.catMelodiesDesc": { de: "Kurze Tonfolgen nach Gehör Schritt für Schritt nachbauen", en: "Transcribe short melodies step by step by ear" },
  "home.catRhythm": { de: "Rhythmus", en: "Rhythm" },
  "home.catRhythmDesc": { de: "Taktarten, Puls und Notenwerte sicher erfassen", en: "Master time signatures, beat pulse & subdivisions" },
  "home.catNotation": { de: "Notation", en: "Notation" },
  "home.catNotationDesc": { de: "Noten lesen im Violin-, Bass- & Altschlüssel mit Hilfslinien", en: "Read notes across Treble, Bass & Alto clefs with ledger lines" },
  "home.catProduction": { de: "Produktion", en: "Production" },
  "home.catProductionDesc": { de: "Frequenzen & EQ-Anhebungen im Noise heraushören", en: "Identify frequencies & EQ boosts in pink noise" },
  "home.voiceHeading": { de: "Stimme & Chor", en: "Voice & Choir" },
  "home.catWarmup": { de: "Einsing-Helfer", en: "Vocal Warmup" },
  "home.catWarmupDesc": { de: "5-Minuten-Warmup: Atem, Summen, Arpeggios & Chorklang", en: "5-min routine: breath, humming, arpeggios & choir blend" },

  "tools.metronomeTitle": { de: "Metronom", en: "Metronome" },
  "tools.metronomeSub": { de: "Tap-Tempo, Zählzeiten, Unterteilungen & Profile", en: "Tap tempo, custom beats, subdivisions & profiles" },
  "tools.tunerTitle": { de: "Tuner", en: "Tuner" },
  "tools.tunerSub": { de: "Stimmgerät & präzise Tonhöhen-Anzeige per Mikrofon", en: "Chromatic tuner & live pitch detection via microphone" },
  "tools.freeplayTitle": { de: "Freies Spiel", en: "Free Play" },
  "tools.freeplaySub": { de: "Freie Klaviatur & Akkord-Flächen mit allen Mixer-Klängen", en: "Free keyboard & chord pads with all mixer instruments" },
  "tools.fretboardTitle": { de: "Griffbrett", en: "Fretboard" },
  "tools.fretboardSub": { de: "Gitarren-Akkorde in allen Lagen, Umkehrsuche & Tonleitern", en: "Guitar chords in all positions, reverse chord finder & scales" },
  "tools.soonBadge": { de: "Bald", en: "Soon" },
  "tools.previewBadge": { de: "Bald verfügbar", en: "Coming soon" },
  "tools.tunerPageTitle": { de: "Chromatischer Tuner", en: "Chromatic Tuner" },
  "tools.tunerPageDesc": { de: "Live-Tonhöhenerkennung und Kammerton-Referenz direkt über das Mikrofon deines Geräts.", en: "Live pitch detection and tuning reference directly via your device microphone." },
  "tuner.modeAuto": { de: "Automatisch", en: "Automatic" },
  "tuner.modeSingle": { de: "Einzelton", en: "Single note" },
  "tuner.modeAria": { de: "Erkennung", en: "Detection" },
  "tuner.referenceBtn": { de: "Referenzton", en: "Reference tone" },
  "tuner.a4Label": { de: "Kammerton", en: "Concert pitch" },
  "tuner.a4DownAria": { de: "Kammerton tiefer", en: "Lower concert pitch" },
  "tuner.a4UpAria": { de: "Kammerton höher", en: "Raise concert pitch" },
  "tuner.noteDownAria": { de: "Halbton tiefer", en: "Semitone down" },
  "tuner.noteUpAria": { de: "Halbton höher", en: "Semitone up" },
  "tuner.spectrumAria": { de: "Live-Frequenzspektrum", en: "Live frequency spectrum" },
  "tools.freeplayPageTitle": { de: "Freies Spiel", en: "Free Play" },
  "tools.freeplayPageDesc": { de: "Freie Klaviatur und Akkord-Flächen zum Ausprobieren, Improvisieren und Nachspielen mit deinen Mixer-Instrumenten.", en: "Free keyboard and chord pads for improvising, exploring sounds, and playing along with your mixer instruments." },
  "tools.backBtn": { de: "← Zurück zu Werkzeuge", en: "← Back to Tools" },
  "freeplay.playChord": { de: "▶ Akkord", en: "▶ Chord" },
  "freeplay.playArp": { de: "↗ Arpeggio", en: "↗ Arpeggio" },
  "freeplay.clear": { de: "✕ Leeren", en: "✕ Clear" },
  "freeplay.modeAria": { de: "Spielmodus", en: "Play mode" },
  "freeplay.modeLive": { de: "Frei", en: "Live" },
  "freeplay.modeHold": { de: "Akkord bauen", en: "Build Chord" },
  "freeplay.octDownAria": { de: "Oktave tiefer", en: "Octave down" },
  "freeplay.octUpAria": { de: "Oktave höher", en: "Octave up" },
  "freeplay.labelsBtn": { de: "Noten", en: "Notes" },
  "freeplay.instrumentsTitle": { de: "6 Mixer-Instrumente", en: "6 Mixer Instruments" },
  "freeplay.instrumentsSub": { de: "Tippe zum Zuschalten oder Mischen – dein Klang gilt live", en: "Tap to layer or switch — heard immediately" },
  "freeplay.openMixerBtn": { de: "Regler & Hall", en: "Faders & Reverb" },
  "freeplay.presetSolo": { de: "Solo Klavier", en: "Solo Piano" },
  "freeplay.presetDuo": { de: "Duo", en: "Duo" },
  "freeplay.presetEnsemble": { de: "Ensemble", en: "Ensemble" },
  "freeplay.presetOrchestra": { de: "Orchester", en: "Orchestra" },
  "freeplay.padsTitle": { de: "Akkord-Flächen & Impulse", en: "Chord Pads & Sparks" },
  "freeplay.padsSub": { de: "Tippe einen Akkord an und verändere einzelne Tasten oben", en: "Tap a chord, then tweak individual keys above" },
  "freeplay.bridgeLabel": { de: "Direkt weiterüben:", en: "Jump into practice:" },
  "freeplay.jumpChords": { de: "Akkorde →", en: "Chords →" },
  "freeplay.jumpIntervals": { de: "Intervalle →", en: "Intervals →" },
  "freeplay.jumpCadences": { de: "Kadenzen →", en: "Cadences →" },
  "fb.tabsAria": { de: "Griffbrett-Bereiche", en: "Fretboard sections" },
  "fb.tabChords": { de: "Akkorde", en: "Chords" },
  "fb.tabReverse": { de: "Akkord finden", en: "Find Chord" },
  "fb.tabScales": { de: "Tonleitern", en: "Scales" },
  "fb.modifiedBadge": { de: "Bearbeitet", en: "Modified" },
  "fb.strumBtn": { de: "▶ Anschlagen", en: "▶ Strum" },
  "fb.pluckBtn": { de: "↗ Zupfen", en: "↗ Pluck" },
  "fb.prevPosAria": { de: "Vorherige Lage", en: "Previous position" },
  "fb.nextPosAria": { de: "Nächste Lage", en: "Next position" },
  "fb.openAllBtn": { de: "◯ Alle offen", en: "◯ All Open" },
  "fb.clearAllBtn": { de: "✕ Leeren", en: "✕ Clear" },
  "fb.showPositionsBtn": { de: "→ Alle Lagen", en: "→ All Positions" },
  "fb.labelModeAria": { de: "Beschriftung", en: "Note labels" },
  "fb.lblNotes": { de: "Noten", en: "Notes" },
  "fb.lblIntervals": { de: "Stufen", en: "Degrees" },
  "fb.lblFingers": { de: "Finger", en: "Fingers" },
  "fb.rootLabel": { de: "Grundton", en: "Root Note" },
  "fb.tuningLabel": { de: "Stimmung", en: "Tuning" },
  "fb.qualityLabel": { de: "Akkordtyp / Qualität", en: "Chord Type / Quality" },
  "fb.bassLabel": { de: "Basston (Umkehrung / Slash-Akkord)", en: "Bass Note (Inversion / Slash Chord)" },
  "fb.reverseCardTitle": { de: "Eigene Griffe entschlüsseln", en: "Decode Any Fingering" },
  "fb.reverseCardSub": { de: "Tippe Bünde auf dem Griffbrett an – links am Sattel wechselst du zwischen Leersaite (◯) und gedämpft (✕).", en: "Tap frets on the neck — at the nut on the left, toggle open (◯) or muted (✕) strings." },
  "fb.legendRoot": { de: "Grundton (1)", en: "Root (1)" },
  "fb.legendTone": { de: "Akkordton", en: "Chord Tone" },
  "fb.legendOpen": { de: "Leersaite (0)", en: "Open String (0)" },
  "fb.legendChar": { de: "Charakterton / Blue Note", en: "Characteristic / Blue Note" },
  "fb.legendScaleTone": { de: "Leiterton", en: "Scale Tone" },
  "fb.scaleRootLabel": { de: "Grundton der Tonleiter", en: "Scale Root" },
  "fb.scaleTypeLabel": { de: "Tonleiter / Modus", en: "Scale / Mode" },
  "fb.scalePositionLabel": { de: "Griffbrett-Lage (CAGED-Boxen)", en: "Fretboard Position (CAGED Boxes)" },
  "fb.jumpModes": { de: "Tonleitern & Modi →", en: "Scales & Modes →" },

  "knowledge.tabsAria": { de: "Wissensbereiche", en: "Knowledge sections" },
  "knowledge.tabTheory": { de: "Theorie", en: "Theory" },
  "knowledge.tabArticles": { de: "Artikel", en: "Articles" },
  "knowledge.tabInstruments": { de: "Instrumente", en: "Instruments" },
  "knowledge.refHeading": { de: "Referenzmaterialien", en: "Reference Guides" },
  "knowledge.refIntervals": { de: "Intervalle", en: "Intervals" },
  "knowledge.refIntervalsSub": { de: "Stimmungen, Lieder & Frequenzen", en: "Character, song cues & frequency ratios" },
  "knowledge.refCadences": { de: "Kadenzen", en: "Cadences" },
  "knowledge.refCadencesSub": { de: "Harmonien & Pop-Formeln", en: "Harmonic progressions & hit formulas" },
  "knowledge.refPhysics": { de: "Physik & Klang", en: "Physics & Sound" },
  "knowledge.refPhysicsSub": { de: "Wellen-Labor & Obertöne", en: "Wave lab, overtones & tuning" },
  "knowledge.refSolfege": { de: "Solfège & Stufen", en: "Solfège & Scale Degrees" },
  "knowledge.refSolfegeSub": { de: "Charakter der 7 Tonstufen", en: "Tension & resolution of all 7 degrees" },
  "knowledge.refRhythm": { de: "Rhythmus & Takte", en: "Rhythm & Meter" },
  "knowledge.refRhythmSub": { de: "Puls, Notenwerte & Grooves", en: "Beat, subdivisions & grooves" },
  "knowledge.refVocals": { de: "Gesang & Stimme", en: "Voice & Singing" },
  "knowledge.refVocalsSub": { de: "Anatomie, Register & Chorsatz", en: "Anatomy, registers & SATB choir" },
  "knowledge.refModes": { de: "Modi & Tonleitern", en: "Modes & Scales" },
  "knowledge.refModesSub": { de: "Kirchentonarten, Klangfarbe & Funktion", en: "Church modes, color notes & function" },
  "knowledge.refKeys": { de: "Tonarten & Vorzeichen", en: "Keys & Signatures" },
  "knowledge.refKeysSub": { de: "12 Tonarten, Vorzeichen & Moll-Varianten", en: "12 keys, signatures & minor forms" },
  "knowledge.refCircle": { de: "Quintenzirkel", en: "Circle of Fifths" },
  "knowledge.refCircleSub": { de: "Interaktives Rad, Akkorde & Praxis", en: "Interactive wheel, chords & tips" },
  "knowledge.refSingPlay": { de: "Singen & Spielen", en: "Sing & Play" },
  "knowledge.refSingPlaySub": { de: "Koordination, Groove & Praxis-Übungen", en: "Coordination, flow & practical drills" },
  "knowledge.refNotation": { de: "Notenschrift & Schlüssel", en: "Notation & Clefs" },
  "knowledge.refNotationSub": { de: "Violin-, Bass- & Altschlüssel, Hilfslinien & Vorzeichen", en: "Treble, Bass & Alto clefs, ledger lines & accidentals" },
  "knowledge.refArranging": { de: "Arrangieren", en: "Arranging" },
  "knowledge.refArrangingSub": { de: "Stimmenverteilung, Spannungsbogen & Klangfarben", en: "Voicings, form arc, layers & instrumentation" },
  "knowledge.articlesHeading": { de: "Artikel & Entdeckungen", en: "Articles & Insights" },
  "knowledge.articlesIntro": {
    de: "Vertiefende Hintergründe zu Geschichte, Psychologie, Gehirn und Improvisation – mit direkten Hörbeispielen.",
    en: "Deep-dive essays on history, music psychology, neuroscience, and improvisation — with built-in audio examples."
  },
  "knowledge.instHeading": { de: "Instrumentenfamilien & Moderne Klänge", en: "Instrument Families & Modern Sound" },
  "knowledge.instIntro": {
    de: "Entdecke, wie Instrumente physikalisch klingen, welche Tonumfänge und Spielweisen sie prägen – von der Violine bis zum Synthesizer.",
    en: "Explore how instruments create sound, their ranges, playing styles and timbres — from violin to synthesizer."
  },
  "knowledge.instStrings": { de: "Streichinstrumente", en: "Bowed Strings" },
  "knowledge.instStringsSub": { de: "Violine, Viola, Cello & Kontrabass", en: "Violin, viola, cello & double bass" },
  "knowledge.instWoodwinds": { de: "Holzblasinstrumente", en: "Woodwinds" },
  "knowledge.instWoodwindsSub": { de: "Flöte, Oboe, Klarinette, Fagott & Saxophon", en: "Flute, oboe, clarinet, bassoon & saxophone" },
  "knowledge.instBrass": { de: "Blechblasinstrumente", en: "Brass" },
  "knowledge.instBrassSub": { de: "Trompete, Horn, Posaune & Tuba", en: "Trumpet, French horn, trombone & tuba" },
  "knowledge.instKeyboards": { de: "Tasteninstrumente", en: "Keyboard Instruments" },
  "knowledge.instKeyboardsSub": { de: "Klavier, Cembalo, Orgel & E-Piano", en: "Piano, harpsichord, organ & electric piano" },
  "knowledge.instPlucked": { de: "Zupf- & Gitarren", en: "Plucked & Guitars" },
  "knowledge.instPluckedSub": { de: "Akustik-, E-Gitarre, E-Bass & Harfe", en: "Acoustic, electric guitar, bass guitar & harp" },
  "knowledge.instRhythm": { de: "Rhythmus-Instrumente", en: "Percussion & Drums" },
  "knowledge.instRhythmSub": { de: "Drumset, Percussion & Rollen", en: "Drum kit, hand percussion & groove roles" },
  "knowledge.instElectronic": { de: "Moderne & Elektronik", en: "Electronic & Studio" },
  "knowledge.instElectronicSub": { de: "Synthesizer, Sampler, Drumcomputer & DAW", en: "Synths, samplers, drum machines & DAW" },
  "knowledge.instEnsembles": { de: "Orchester & Bands", en: "Orchestras & Bands" },
  "knowledge.instEnsemblesSub": { de: "Besetzungen, Klangrollen & Frequenzräume", en: "Instrumentation, roles & frequency space" },

  "space.localTag": { de: "Kein Punktestand", en: "No Scores" },
  "space.profileTitleDefault": { de: "Dein Musiker-Profil", en: "Your Musician Profile" },
  "space.profileSubDefault": {
    de: "Persönliche Vorlieben & entspannte Routinen – ganz ohne Fortschrittsdruck.",
    en: "Personal preferences & calm practice routines — with zero performance pressure."
  },
  "space.nameLabel": { de: "Rufname für die Begrüßung", en: "Display name for greeting" },
  "space.namePlaceholder": { de: "z. B. Dein Name (optional)", en: "e.g. Your name (optional)" },
  "space.instrumentsLabel": { de: "Deine Instrumente / Rollen", en: "Your instruments / roles" },
  "space.focusLabel": { de: "Trainings-Schwerpunkte", en: "Practice focus areas" },
  "space.accessoryLabel": { de: "Lauscher-Look", en: "Lauscher style" },
  "space.timerTitle": { de: "Achtsamer Session-Timer", en: "Mindful Session Timer" },
  "space.timerSub": {
    de: "Schaltet sich bei Nicht-Nutzung automatisch wieder aus – zählt keine Lernhistorie.",
    en: "Automatically pauses when idle — keeps zero tracking history."
  },
  "space.timerDuration": { de: "Wunschdauer", en: "Session length" },
  "space.timerMin5": { de: "5 Min", en: "5 min" },
  "space.timerMin10": { de: "10 Min", en: "10 min" },
  "space.timerMin15": { de: "15 Min", en: "15 min" },
  "space.timerMin20": { de: "20 Min", en: "20 min" },
  "space.timerIdleLabel": { de: "Auto-Stopp bei Pause / Inaktivität", en: "Auto-stop after inactivity" },
  "space.timerIdle2": { de: "nach 2 Min", en: "after 2 min" },
  "space.timerIdle3": { de: "nach 3 Min", en: "after 3 min" },
  "space.timerIdle5": { de: "nach 5 Min", en: "after 5 min" },
  "space.timerReset": { de: "Zurücksetzen", en: "Reset" },
  "space.timerCustomize": { de: "Dauer & Auto-Stopp anpassen", en: "Customize Length & Auto-Stop" },
  "space.mixesTitle": { de: "Meine Übe-Mixe", en: "My Practice Mixes" },
  "space.mixesSub": {
    de: "Persönliche Favoriten-Konfigurationen – direkt startbar, ganz ohne Bewertung.",
    en: "Personal favorite setups — launch anytime with one tap."
  },
  "space.mixCreateBtn": { de: "+ Neuen Mix erstellen", en: "+ Create New Mix" },
  "space.mixSaveCurrentBtn": { de: "Aktuelle Übung merken", en: "Save Current Exercise" },
  "space.mixNameLabel": { de: "Name des Mixes", en: "Mix name" },
  "space.mixNamePlaceholder": { de: "z. B. Abend-Diktat", en: "e.g. Evening Dictation" },
  "space.mixModuleLabel": { de: "Übungsmodul", en: "Exercise module" },
  "space.mixLevelLabel": { de: "Stufe / Umfang", en: "Level / Range" },
  "space.mixBpmLabel": { de: "Tempo", en: "Tempo" },
  "space.mixBpmDefault": { de: "Standardtempo", en: "Default tempo" },
  "space.mixBpm70": { de: "70 BPM (Ruhig)", en: "70 BPM (Calm)" },
  "space.mixBpm85": { de: "85 BPM (Entspannt)", en: "85 BPM (Relaxed)" },
  "space.mixBpm95": { de: "95 BPM (Mittel)", en: "95 BPM (Moderate)" },
  "space.mixBpm110": { de: "110 BPM (Flott)", en: "110 BPM (Upbeat)" },
  "space.mixBpm125": { de: "125 BPM (Sportlich)", en: "125 BPM (Brisk)" },
  "space.mixSaveBtn": { de: "Mix speichern", en: "Save Mix" },
  "space.mixCancelBtn": { de: "Abbrechen", en: "Cancel" },
  "space.notationTitle": { de: "Musikalische Schreibweise", en: "Musical Notation" },
  "space.notationSub": {
    de: "Steuert Tonnamen, Intervall-Kürzel & Tasten-Beschriftung in deinen Übungen.",
    en: "Controls note naming, interval symbols & keyboard labels across exercises."
  },
  "space.notationSystem": { de: "Notensystem", en: "Pitch Naming" },
  "space.notationDe": { de: "Deutsch (H / B / Cis)", en: "German (H / B / Cis)" },
  "space.notationIntl": { de: "International (B / Bb / C#)", en: "International (B / Bb / C#)" },
  "space.intervalNotationSystem": { de: "Intervall-Namensgebung", en: "Interval Naming" },
  "space.intervalNotationDe": { de: "Deutsch (P / G / k)", en: "German (P / G / k)" },
  "space.intervalNotationIntl": { de: "International (P / M / m)", en: "International (P / M / m)" },
  "space.solfegeLabelSystem": { de: "Klaviatur-Beschriftung (Solfège & Melodie)", en: "Keyboard Labels (Solfège & Melodies)" },
  "space.solfegeSyllables": { de: "Silben (Do – Ti)", en: "Syllables (Do – Ti)" },
  "space.solfegeNumbers": { de: "Stufenzahlen (1 – 7)", en: "Scale Degrees (1 – 7)" },
  "space.backupTitle": { de: "Lokal & Privat", en: "Local & Private" },
  "space.backupDisclosureSummary": { de: "Datensicherung & Konto zurücksetzen", en: "Backup & Reset Account" },
  "space.backupSub": {
    de: "Kein Server, kein Tracking – deine Vorlieben & Prüfungen bleiben lokal und lassen sich als Datei sichern.",
    en: "No server, no tracking — your preferences & exam history stay local and can be backed up as a file."
  },
  "space.exportBtn": { de: "Profil sichern", en: "Back Up Profile" },
  "space.exportChooseHint": { de: "Wie möchtest du dein Profil sichern?", en: "How would you like to back up your profile?" },
  "space.exportSaveLocalBtn": { de: "Auf Gerät speichern", en: "Save to Device" },
  "space.exportShareBtn": { de: "Teilen …", en: "Share …" },
  "space.importBtn": { de: "Profil laden", en: "Import Profile" },
  "space.resetBtn": { de: "Konto zurücksetzen", en: "Reset Account" },
  "space.appResetBtn": { de: "App-Reset", en: "App Reset" },
  "space.examHistoryTitle": { de: "Prüfungsverlauf", en: "Exam History" },
  "space.examHistorySub": {
    de: "Deine abgeschlossenen Kategorie-Prüfungen & Bestwerte (lokal auf deinem Gerät).",
    en: "Your completed category exams & personal bests (stored locally on your device)."
  },
  "space.examHistoryClear": { de: "Verlauf löschen", en: "Clear History" },
  "space.examHistoryConfirmTitle": { de: "Prüfungsverlauf wirklich löschen?", en: "Delete exam history?" },
  "space.examHistoryConfirmSub": { de: "Alle gespeicherten Prüfungsergebnisse und Bestwerte werden dauerhaft entfernt.", en: "All saved exam results and personal bests will be permanently removed." },
  "space.examHistoryConfirmBtn": { de: "Endgültig löschen", en: "Delete Permanently" },
  "space.examHistoryCancelBtn": { de: "Abbrechen", en: "Cancel" },

  "ex.keyBtnTitle": { de: "Tonart-Modus wählen", en: "Choose key mode" },
  "ex.notationKeyBtnTitle": { de: "Tonart & Generalvorzeichen fürs Notenlesen wählen", en: "Choose key signature for sight-reading" },
  "ex.notationPaceBtnTitle": { de: "Tempo für den Nur-Hören-Modus wählen", en: "Choose pace for Listen-Only mode" },
  "ex.paceSlowEdge": { de: "Langsam", en: "Slow" },
  "ex.paceFastEdge": { de: "Schnell", en: "Fast" },
  "ex.notationPaceSliderAria": { de: "Tempo von langsam bis schnell", en: "Pace from slow to fast" },
  "ex.timeSigBtnTitle": { de: "Taktart wählen", en: "Choose time signature" },
  "ex.melodyPulseTitle": { de: "Metrum-Puls während der Melodie ein-/ausschalten", en: "Toggle beat pulse during the melody" },
  "ex.bpmBtnTitle": { de: "Tempo-Schieberegler öffnen", en: "Open tempo slider" },
  "ex.tempoLabel": { de: "Tempo:", en: "Tempo:" },
  "ex.random": { de: "Zufall", en: "Random" },
  "ex.keyLabel": { de: "Tonart:", en: "Key:" },
  "ex.keyFixed": { de: "Fest auf C", en: "Fixed in C" },
  "ex.keyEasy": { de: "Leichte (G, F, D, B)", en: "Easy Keys (G, F, D, Bb)" },
  "ex.keyAll": { de: "Alle 12 (Zufall)", en: "All 12 (Random)" },
  "ex.timeSigLabel": { de: "Taktart:", en: "Time Sig:" },
  "ex.waltz34": { de: "3/4 Walzer", en: "3/4 Waltz" },
  "ex.diagCompare": { de: "A/B Vergleich", en: "A/B Compare" },
  "ex.diagBass": { de: "Bass / Grundton", en: "Bass / Root" },
  "ex.solfegeKeyTitle": { de: "Aktuelle Tonart (Tippen für Tonika-Akkord)", en: "Current key (tap for tonic chord)" },
  "ex.tonicBtnTitle": { de: "Tonika / Grundton anspielen", en: "Play tonic / root" },
  "ex.tonicRefDefault": { de: "Tonika (I)", en: "Tonic (I)" },
  "ex.repeatToneTitle": { de: "Gerade abgefragten Ton nochmal abspielen", en: "Replay target note" },
  "ex.repeatTone": { de: "Ton nochmal", en: "Replay Tone" },
  "ex.dronePadVol": { de: "Fläche", en: "Strings Pad" },
  "ex.dronePadVolAria": { de: "Lautstärke der Streicher-Fläche", en: "Strings pad volume" },
  "ex.droneToneVol": { de: "Intervallton", en: "Interval Tone" },
  "ex.droneToneVolAria": { de: "Lautstärke des Intervalltons", en: "Interval tone volume" },
  "ex.answerSoundOn": { de: "Notenton: An", en: "Note Audio: On" },
  "ex.answerSoundTitle": { de: "Abspielen der richtigen Note ein-/ausschalten (Aus = stumm zur nächsten Note)", en: "Toggle playing the correct note sound (Off = move silently to next note)" },
  "ex.answerSoundAria": { de: "Notenton bei richtiger Antwort ein-/ausschalten", en: "Toggle correct note sound" },
  "ex.listenOnly": { de: "Nur Hören", en: "Listen Only" },
  "ex.listenOnlyTitle": { de: "Nur-Hören-Modus ein-/ausschalten", en: "Toggle Listen-Only Mode" },
  "ex.listenOnlyAria": { de: "Nur-Hören-Modus", en: "Listen-Only Mode" },
  "ex.loopTitle": { de: "Endlosschleife umschalten", en: "Toggle loop" },
  "ex.loopAria": { de: "Endlosschleife", en: "Loop" },
  "ex.playBtn": { de: "▶ Abspielen", en: "▶ Play" },
  "ex.skipTitle": { de: "Nächste Abfrage", en: "Next exercise" },
  "ex.skipLabel": { de: "Überspringen", en: "Skip" },
  "ex.examAbortBtn": { de: "Abbrechen", en: "Cancel" },
  "ex.examAbortTitle": { de: "Prüfung wirklich abbrechen?", en: "Abort exam?" },
  "ex.examAbortSub": { de: "Der aktuelle Prüfdurchlauf wird nicht im Verlauf gespeichert.", en: "Your current exam progress won’t be saved in history." },
  "ex.examContinueBtn": { de: "Weiterprüfen", en: "Keep Going" },
  "ex.examConfirmAbortBtn": { de: "Prüfung beenden", en: "End Exam" },

  "warmup.defaultTitle": { de: "5-Minuten Einsingen", en: "5-Min Vocal Warmup" },
  "warmup.voiceBtnTitle": { de: "Tonumfang wählen", en: "Choose vocal range" },
  "warmup.soundBtnTitle": { de: "Begleitklang wählen", en: "Choose accompaniment sound" },
  "warmup.voiceLabel": { de: "Tonumfang:", en: "Range:" },
  "warmup.voiceMixed": { de: "Chor-Mitte", en: "Choir Mid" },
  "warmup.voiceSoprano": { de: "Sopran", en: "Soprano" },
  "warmup.voiceAlto": { de: "Alt", en: "Alto" },
  "warmup.voiceTenor": { de: "Tenor", en: "Tenor" },
  "warmup.voiceBass": { de: "Bass", en: "Bass" },
  "warmup.soundLabel": { de: "Klang:", en: "Sound:" },
  "warmup.soundPiano": { de: "Klavier", en: "Piano" },
  "warmup.soundBoth": { de: "Klavier + Stimme", en: "Piano + Voice" },
  "warmup.soundVoice": { de: "Stimme", en: "Voice" },
  "warmup.semiDownTitle": { de: "Einen Halbton tiefer modulieren", en: "Transpose one semitone down" },
  "warmup.semiDown": { de: "−1 Halbton", en: "−1 Semitone" },
  "warmup.replayTitle": { de: "Aktuelles Muster wiederholen", en: "Replay current pattern" },
  "warmup.replayStep": { de: "↻ Nochmal", en: "↻ Replay" },
  "warmup.semiUpTitle": { de: "Einen Halbton höher modulieren", en: "Transpose one semitone up" },
  "warmup.semiUp": { de: "+1 Halbton", en: "+1 Semitone" },
  "warmup.prevTitle": { de: "Vorherige Übung", en: "Previous exercise" },
  "warmup.startBtn": { de: "▶ Einsingen starten", en: "▶ Start Warmup" },
  "warmup.nextTitle": { de: "Nächste Übung", en: "Next exercise" },

  "nav.mainAria": { de: "Hauptnavigation", en: "Main navigation" },
  "nav.home": { de: "Startseite", en: "Home" },
  "nav.tools": { de: "Werkzeuge", en: "Tools" },
  "nav.knowledge": { de: "Wissen", en: "Knowledge" },
  "nav.space": { de: "Mein Konto", en: "My Account" },

  "mixer.title": { de: "Mixer", en: "Mixer" },
  "mixer.tabsAria": { de: "Mixer-Bereich wählen", en: "Choose mixer section" },
  "mixer.tabLevels": { de: "Lautstärken", en: "Volumes" },
  "mixer.tabReverb": { de: "Raumhall", en: "Reverb" },
  "mixer.levelsHeading": { de: "Instrumente", en: "Instruments" },
  "mixer.piano": { de: "Klavier", en: "Piano" },
  "mixer.guitar": { de: "Gitarre", en: "Guitar" },
  "mixer.strings": { de: "Streicher", en: "Strings" },
  "mixer.brass": { de: "Bläser", en: "Brass & Winds" },
  "mixer.voice": { de: "Stimme", en: "Voice" },
  "mixer.bass": { de: "Bass", en: "Bass" },
  "mixer.presetsHeading": { de: "Mix-Presets", en: "Mix Presets" },
  "mixer.presetDuo": { de: "Duo (Klavier & Gitarre)", en: "Duo (Piano & Guitar)" },
  "mixer.presetEnsemble": { de: "Ensemble", en: "Ensemble" },
  "mixer.presetOrchestra": { de: "Orchester (Streicher & Bläser)", en: "Orchestra (Strings & Brass)" },
  "mixer.presetPiano": { de: "Solo Klavier (Standard)", en: "Solo Piano (Default)" },
  "mixer.presetCustom": { de: "Benutzerdefiniert", en: "Custom" },
  "mixer.presetHint": {
    de: "Jede manuelle Änderung an den Reglern aktiviert automatisch „Benutzerdefiniert“.",
    en: "Adjusting any slider manually switches the preset to “Custom”."
  },

  "settings.title": { de: "App-Einstellungen", en: "App Settings" },
  "settings.groupAudio": { de: "Audio & Tempo", en: "Audio & Tempo" },
  "settings.groupLanguageNotation": { de: "Sprache & Schreibweise", en: "Language & Notation" },
  "settings.groupAppearance": { de: "Optik & Farbschema", en: "Appearance & Themes" },
  "settings.defaultTempoHeading": { de: "Standardtempo", en: "Default Tempo" },
  "settings.defaultTempoHint": {
    de: "Wird beim Start einer Übung übernommen, bis du das Tempo im Modul manuell anpasst.",
    en: "Applied when opening an exercise until you change the tempo inside the module."
  },
  "settings.pianoSoundHeading": { de: "Raumklang & Hall", en: "Room Sound & Reverb" },
  "settings.pianoSoundHint": {
    de: "Wähle einen Raumcharakter für den gesamten Mix und passe den Hall-Anteil pro Instrument an.",
    en: "Choose a room character for the mix and fine-tune reverb for each instrument individually."
  },
  "settings.pianoCharAria": { de: "Raumcharakter", en: "Room character" },
  "settings.pianoCharDry": { de: "Trocken", en: "Studio / Dry" },
  "settings.pianoCharNatural": { de: "Natürlich", en: "Natural" },
  "settings.pianoCharConcert": { de: "Konzertsaal", en: "Concert Hall" },
  "settings.reverbPerInstHeading": { de: "Hall pro Instrument", en: "Reverb per Instrument" },
  "settings.reverbInstAria": { de: "Instrument für Hall-Einstellung", en: "Instrument for reverb adjustment" },
  "settings.pianoReverbLabel": { de: "Raumhall", en: "Reverb" },
  "settings.pianoReverbAria": { de: "Instrumenten-Raumhall", en: "Instrument room reverb" },
  "settings.pianoTestBtn": { de: "▶ Klang testen", en: "▶ Preview Sound" },
  "settings.autoNextHeading": {
    de: "Nächste Abfragung automatisch abspielen",
    en: "Auto-Play Next Prompt"
  },
  "settings.autoNextHint": {
    de: "Spielt nach einer richtigen Lösung automatisch die nächste Aufgabe ab.",
    en: "Automatically plays the next prompt after a correct answer."
  },
  "settings.autoNextAria": {
    de: "Nächste Abfragung automatisch abspielen",
    en: "Auto-play next prompt"
  },
  "settings.singHeading": { de: "Mitsingen", en: "Sing Along" },
  "settings.singHint": { de: "Einladungen zum Mitsingen und Mitsummen bei Intervall- und Solfège-Übungen.", en: "Invitations to sing and hum along in interval and solfège exercises." },
  "settings.singTipsLabel": { de: "Mitsing-Tipps", en: "Sing-along tips" },
  "settings.singPauseLabel": { de: "Summ-Pause nach dem Abspielen (3 Sek.)", en: "Hum pause after playback (3 sec.)" },
  "settings.autoNextOn": { de: "Ein", en: "On" },
  "settings.autoNextOff": { de: "Aus", en: "Off" },
  "settings.breakReminderHeading": {
    de: "Pausen-Erinnerung bei Übungen",
    en: "Exercise Break Reminder"
  },
  "settings.breakReminderHint": {
    de: "Läuft leise und unsichtbar im Hintergrund, während du übst, und erinnert dich nach der gewählten Zeit freundlich an eine Pause.",
    en: "Runs quietly and invisibly in the background while you practice and gently reminds you to take a break."
  },
  "settings.breakReminderAria": {
    de: "Pausen-Erinnerung bei Übungen",
    en: "Exercise break reminder"
  },
  "settings.breakReminderIntervalLabel": {
    de: "Erinnerung nach",
    en: "Remind after"
  },
  "settings.breakReminderSliderAria": {
    de: "Pausen-Erinnerung nach Minuten",
    en: "Break reminder interval in minutes"
  },
  "break.tag": { de: "Kurze Übe-Pause", en: "Short Practice Break" },
  "break.title": { de: "Zeit für eine kurze Pause", en: "Time for a Short Break" },
  "break.takePauseBtn": { de: "Pause einlegen", en: "Take a Break" },
  "break.continueBtn": { de: "Weiterüben", en: "Keep Practicing" },
  "break.disableBtn": { de: "Erinnerung ausschalten", en: "Turn Off Reminder" },
  "settings.quickMixHeading": { de: "Quick-Mixe (Startseite)", en: "Quick Mixes (Home)" },
  "settings.quickMixHint": {
    de: "Passe deine Schnellstart-Mixe jederzeit in ‚Mein Konto‘ an oder lege neue Favoriten an.",
    en: "Customize your home quick-launch mixes anytime in ‘My Account’ or add new favorites."
  },
  "settings.manageMixesBtn": { de: "Quick-Mixe anpassen →", en: "Customize Quick Mixes →" },
  "settings.languageHeading": { de: "Anwendungssprache", en: "App Language" },
  "settings.languageHint": {
    de: "Wähle die Sprache der App. Alle Menüs, Übungen und Musikbegriffe passen sich sofort an.",
    en: "Choose the app language. All menus, exercises, and musical terms adapt immediately."
  },
  "settings.languageSelectAria": { de: "Anwendungssprache wählen", en: "Choose app language" },
  "settings.langDe": { de: "Deutsch", en: "Deutsch" },
  "settings.langEn": { de: "English", en: "English" },
  "settings.langFr": { de: "Français", en: "Français" },
  "settings.langSoon": { de: "demnächst", en: "coming soon" },
  "settings.appearanceHeading": { de: "Erscheinungsbild", en: "Appearance" },
  "settings.appearanceAria": { de: "Erscheinungsbild", en: "Appearance" },
  "settings.appearanceHint": {
    de: "Wähle Hell, Dunkel oder passe dich automatisch an dein Gerät an.",
    en: "Choose Light, Dark, or follow your device system appearance."
  },
  "settings.appearanceLight": { de: "Hell", en: "Light" },
  "settings.appearanceDark": { de: "Dunkel", en: "Dark" },
  "settings.appearanceSystem": { de: "System", en: "System" },
  "settings.themeHeading": { de: "Farbschema / Themes", en: "Color Scheme / Themes" },
  "settings.themeHint": {
    de: "Alle Farbpaletten funktionieren sowohl im hellen als auch im dunklen Modus.",
    en: "Every color palette supports both Light and Dark modes."
  },
  "settings.themeForest": { de: "Waldlichtung & Salbei", en: "Forest Glade & Sage" },
  "settings.themeCoast": { de: "Morgentau & Küste", en: "Morning Dew & Coast" },
  "settings.themeDusk": { de: "Abenddämmerung", en: "Evening Dusk" },
  "settings.themeMetal": { de: "Metal", en: "Metal" },
  "settings.themeActive": { de: "Aktiv", en: "Active" },
  "settings.themeSelect": { de: "Auswählen", en: "Select" },
  "settings.customizeThemesBtn": { de: "Eigenes Theme im Konto gestalten →", en: "Design Custom Theme in Account →" },

  "space.themesTitle": { de: "Themes & Farbdesigner", en: "Themes & Color Studio" },
  "space.themesSub": {
    de: "Wähle ein bestehendes Theme oder gestalte bis zu 3 eigene Farbschemas mit R/G/B/A-Farbwähler.",
    en: "Pick a built-in palette or craft up to 3 custom themes with the R/G/B/A color picker."
  },
  "space.customSlotsLabel": { de: "Deine 3 eigenen Theme-Plätze", en: "Your 3 Custom Theme Slots" },
  "space.createCustomThemeBtn": { de: "Eigenes Theme kreieren", en: "Create Custom Theme" },
  "space.editorSlotLabel": { de: "Speicherplatz (1–3)", en: "Save Slot (1–3)" },
  "space.customThemeNameLabel": { de: "Name des Themes", en: "Theme Name" },
  "space.customThemeNamePlaceholder": { de: "z. B. Studio Warm", en: "e.g. Studio Warm" },
  "space.templateLabel": { de: "Basis-Vorlage", en: "Base Template" },
  "space.loadTemplateBtn": { de: "Laden", en: "Load" },
  "space.pickRoleLabel": {
    de: "Farben anpassen (Antippen öffnet / schließt Color-Picker)",
    en: "Customize colors (tap to open / close picker)"
  },
  "space.rgbaPickerLabel": {
    de: "Farbe per Color-Picker (R, G, B, A) anpassen",
    en: "Adjust color with RGBA color picker"
  },
  "space.nativePickerTitle": { de: "System-Farbwähler öffnen", en: "Open system color picker" },
  "space.hueLabel": { de: "Farbton", en: "Hue" },
  "space.livePreviewLabel": { de: "Live in der App ansehen", en: "Preview live across app" },
  "space.saveCustomThemeBtn": { de: "Theme speichern & aktivieren", en: "Save & Activate Theme" },
  "space.cancelCustomThemeBtn": { de: "Schließen", en: "Close" },
  "space.tplForestLight": { de: "Waldlichtung • Hell", en: "Forest Glade • Light" },
  "space.tplForestDark": { de: "Waldlichtung • Dunkel", en: "Forest Glade • Dark" },
  "space.tplCoastLight": { de: "Morgentau • Hell", en: "Morning Dew • Light" },
  "space.tplCoastDark": { de: "Morgentau • Dunkel", en: "Morning Dew • Dark" },
  "space.tplDuskLight": { de: "Abenddämmerung • Hell", en: "Evening Dusk • Light" },
  "space.tplDuskDark": { de: "Abenddämmerung • Dunkel", en: "Evening Dusk • Dark" },
  "space.tplMetal": { de: "Metal • Schwarz", en: "Metal • Black" },

  "metro.bpmEditTitle": { de: "Tippen, um BPM genau einzugeben", en: "Tap to enter exact BPM" },
  "metro.bpmEditAria": { de: "BPM genau eingeben", en: "Enter exact BPM" },
  "metro.bpmInputAria": { de: "Genaue BPM eingeben (30–240)", en: "Enter exact BPM (30–240)" },
  "metro.tapTitle": { de: "Tippen für Live-Tempo (Tap-Tempo)", en: "Tap for live tempo (Tap Tempo)" },
  "metro.tapAria": { de: "Tap-Tempo", en: "Tap Tempo" },
  "metro.tapLabel": { de: "TAP", en: "TAP" },
  "metro.tapHint": { de: "Tempo tippen", en: "Tap tempo" },
  "metro.sliderAria": { de: "Tempo in BPM", en: "Tempo in BPM" },
  "metro.startBtn": { de: "▶ Metronom starten", en: "▶ Start Metronome" },
  "metro.beatsHeading": { de: "Zählzeiten & Betonung", en: "Beats & Accents" },
  "metro.beatRemoveTitle": { de: "Zählzeit entfernen", en: "Remove beat" },
  "metro.beatAddTitle": { de: "Zählzeit hinzufügen", en: "Add beat" },
  "metro.presetsAria": { de: "Takt-Vorlagen", en: "Meter presets" },
  "metro.beatsAria": { de: "Zählzeiten", en: "Beats" },
  "metro.stateAccent": { de: "Akzent", en: "Accent" },
  "metro.stateNormal": { de: "Normal", en: "Normal" },
  "metro.stateMuted": { de: "Stumm", en: "Mute" },
  "metro.subdivLabel": { de: "Unterteilung:", en: "Subdivision:" },
  "metro.sub1": { de: "1×", en: "1×" },
  "metro.sub2": { de: "2×", en: "2×" },
  "metro.sub3": { de: "3×", en: "3×" },
  "metro.sub4": { de: "4×", en: "4×" },
  "metro.subShuffle": { de: "Shuffle", en: "Shuffle" },
  "metro.subShuffleTitle": { de: "Shuffle: Achtel im Triolen-Feeling (lang – kurz)", en: "Shuffle: eighth notes with a triplet feel (long – short)" },
  "metro.profilesHeading": { de: "Metronom-Profile", en: "Metronome Profiles" },
  "metro.profileNamePlaceholder": { de: "Profilname (z. B. 7/8 Funk · 116 BPM)", en: "Profile name (e.g. 7/8 Funk · 116 BPM)" },
  "metro.profileNameAria": { de: "Metronom-Profilname", en: "Metronome profile name" },
  "metro.saveProfileBtn": { de: "Speichern", en: "Save" },
  "metro.soundHeading": { de: "Klick-Sounds", en: "Click Sounds" },
  "metro.soundDesc": {
    de: "Wähle aus verschiedenen Klick- und Percussion-Stimmen für dein Metronom.",
    en: "Choose from different click and percussion voices for your metronome."
  },
  "metro.soundStandard": { de: "Standard-Klick", en: "Standard Click" },
  "metro.soundWoodblock": { de: "Woodblock", en: "Woodblock" },
  "metro.soundCowbell": { de: "Cowbell", en: "Cowbell" },
  "metro.soundRimshot": { de: "Rimshot", en: "Rimshot" },
  "metro.mixHeading": { de: "Lautstärke", en: "Volume" },
  "metro.volMaster": { de: "Gesamtlautstärke", en: "Master volume" },
  "metro.volMasterAria": { de: "Gesamtlautstärke des Metronoms anpassen", en: "Adjust metronome master volume" },
  "metro.volAccent": { de: "Akzente", en: "Accents" },
  "metro.volAccentAria": { de: "Lautstärke der akzentuierten Zählzeiten anpassen", en: "Adjust accented beat volume" },
  "metro.volNormal": { de: "Normale Zählzeiten", en: "Normal beats" },
  "metro.volNormalAria": { de: "Lautstärke der normalen Zählzeiten anpassen", en: "Adjust normal beat volume" },
  "settings.appResetHeading": { de: "App zurücksetzen", en: "Reset App" },
  "settings.appResetHint": {
    de: "Setzt alle lokalen Einstellungen, Themes und Profildaten zurück und startet die Einrichtung neu.",
    en: "Resets all local settings, themes, and profile data and restarts the setup intro."
  },
  "settings.aboutHeading": { de: "Über die App", en: "About the App" },
  "settings.openAboutBtn": { de: "Über Lauscher →", en: "About Lauscher →" },
  "about.title": { de: "Über Lauscher", en: "About Lauscher" },
  "about.version": { de: "Version 0.9.0-beta", en: "Version 0.9.0-beta" },
  "about.description": {
    de: "Lauscher ist dein ruhiger, werbe- und trackingfreier Begleiter für musikalisches Gehörtraining, Notenlesen, Musiktheorie, Einsingen und Studio-Hören – komplett lokal auf deinem Gerät und ohne Punktedruck.",
    en: "Lauscher is your calm, ad-free, and tracker-free companion for musical ear training, sight-reading, music theory, vocal warmup, and studio listening — running 100% locally on your device without score pressure."
  },
  "about.linksHeading": { de: "Kontakt, Unterstützung & Rechtliches", en: "Contact, Support & Legal" },
  "about.linkContact": { de: "Nachricht an den Entwickler / Kontakt", en: "Message the Developer / Contact" },
  "about.linkRate": { de: "App bewerten", en: "Rate the App" },
  "about.linkShare": { de: "Lauscher teilen", en: "Share Lauscher" },
  "about.linkDonate": { de: "Spenden", en: "Donate" },
  "about.linkPrivacy": { de: "Datenschutz", en: "Privacy Policy" },
  "about.linkTerms": { de: "Nutzungsbedingungen", en: "Terms of Use" },
  "about.linkLicenses": { de: "Lizenzen", en: "Licenses" },
  "about.placeholderHint": {
    de: "Dieser Bereich wird in einer späteren Version verknüpft.",
    en: "This section will be connected in a future version."
  }
};

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

const LAUSCHEBAER_QUOTES_EN = [
  // Category 1: Welcome & Playfulness
  { cat: "Welcome", text: "“Glad you’re here! Forget sight-reading stress and scores — today is all about listening.”" },
  { cat: "Welcome", text: "“No math test, no clock ticking: just hit Play and notice what the sounds feel like.”" },
  { cat: "Welcome", text: "“Two quick minutes on a break or half an hour at the piano — every session moves your ears forward.”" },
  { cat: "Welcome", text: "“Get comfy and pick whatever topic sparks your curiosity below!”" },
  { cat: "Welcome", text: "“Music is a language. Ready to explore a few fresh sounds together today?”" },
  { cat: "Welcome", text: "“Need a grin today? Play a tritone — nothing tickles the ear quite like it!”" },
  { cat: "Welcome", text: "“Even seasoned pros miss a guess! Comparing two sounds side by side is how your ear learns fastest.”" },
  { cat: "Welcome", text: "“My raccoon ears are wide awake — grab a handful of notes and let’s listen!”" },
  { cat: "Welcome", text: "“No rush today: sometimes a new sound takes two or three listens before it suddenly clicks.”" },
  { cat: "Welcome", text: "“Not sure where to start? Tap Surprise right below and I’ll pick an exercise for you.”" },
  { cat: "Welcome", text: "“Every great musician started right here: learning to tell just two notes apart with confidence.”" },
  { cat: "Welcome", text: "“Softly on headphones or out loud in your living room — five minutes of focused listening works wonders.”" },
  { cat: "Welcome", text: "“Ready to warm up your voice? Vocal Warmup guides your range in five minutes from gentle humming right up to choir blend!”" },
  { cat: "Welcome", text: "“Hands busy? Flip on ‘Listen Only’ and let exercises play seamlessly while you train your ear mentally!”" },
  { cat: "Welcome", text: "“Curious how music terms sound abroad? Open Settings to switch live anytime between Deutsch, English, Español, Français, Polski, Українська, and اردو!”" },
  { cat: "Welcome", text: "“Up for a friendly check-in? Every exercise category offers its own Exam — no countdown clock, with your personal best saved in Account!”" },

  // Category 2: Encouragement & Practice Tips
  { cat: "Encouragement", text: "“Trust your gut! Before you even analyze it, you can usually feel whether a chord has arrived home.”" },
  { cat: "Encouragement", text: "“Quick trick: hum the root note softly — your own voice is your finest musical compass.”" },
  { cat: "Encouragement", text: "“When two chords sound almost identical, listen right down to the lowest bass note!”" },
  { cat: "Encouragement", text: "“Feeling lost in a progression? Tap the green Tonic button anytime to ground your ear.”" },
  { cat: "Encouragement", text: "“Try closing your eyes on the next playback — without visual clutter, tiny details jump right out.”" },
  { cat: "Encouragement", text: "“Descending intervals feel tricky at first — picture stepping down a staircase one note at a time.”" },
  { cat: "Encouragement", text: "“In Melodies, try singing silently inside your head: catch the first and last note of the four first.”" },
  { cat: "Encouragement", text: "“Notice how Ti magnetically wants to pull up into Do — feel that tension!”" },
  { cat: "Encouragement", text: "“Picked the wrong answer? Great! That A/B comparison right afterward is ear-training gold.”" },
  { cat: "Encouragement", text: "“Ten calm minutes a day beats cramming for hours — your brain sorts out pitch patterns even while you sleep.”" },
  { cat: "Encouragement", text: "“Up to three ledger lines look intimidating at first — lock in two anchor notes per clef and every step clicks into place!”" },
  { cat: "Encouragement", text: "“Does a 6-note melody fly by too fast? Lock onto the rhythmic pulse first — the pitches fall into place right behind it!”" },
  { cat: "Encouragement", text: "“In Blind Mode the click drops out — breathe steadily and let your foot or shoulders keep the pulse alive inside!”" },
  { cat: "Encouragement", text: "“Every missed exam question is pure learning: tap Audio Review afterward to compare your pick and the answer side by side!”" },

  // Category 3: Ideas to Explore
  { cat: "Tip", text: "“Open the Mixer in the top right: how does the same cadence sound with only Strings and Bass?”" },
  { cat: "Tip", text: "“Switch things up: can you still spot the Tonic just as easily in a 3/4 waltz?”" },
  { cat: "Tip", text: "“Pay special attention to the vi chord today: that gentle, bittersweet turn is everywhere in pop.”" },
  { cat: "Tip", text: "“Try switching the Mixer to ‘Ensemble’ — guitar, strings, and bass join right in like a cozy acoustic band!”" },
  { cat: "Tip", text: "“How does the Subdominant (IV) feel to you? Many players hear it as opening a wide window.”" },
  { cat: "Tip", text: "“In Solfège and Melodies, ‘Replay Tone’ replays only the single note you’re hunting — ideal for locking it in.”" },
  { cat: "Tip", text: "“During Melodies you can replay the whole phrase anytime — any notes you already solved stay right in place.”" },
  { cat: "Tip", text: "“Check out the Instruments guide under Knowledge — audition strings, brass, woodwinds, and synths up close!”" },
  { cat: "Tip", text: "“Give the ‘Orchestra’ mixer preset a spin whenever you want cadences to swell like a concert hall.”" },
  { cat: "Tip", text: "“Practicing late at night? Tap the gear icon at top right for Dark mode and four built-in themes including Metal.”" },
  { cat: "Tip", text: "“You manage your home-screen Quick Mixes anytime inside ‘My Account’ — and add your own favorites right there!”" },
  { cat: "Tip", text: "“Sight-reading secret: while your finger plays the left note, let your eyes peek ahead to the next note sliding in from the right!”" },
  { cat: "Tip", text: "“Want pure silent sight-reading flow? Toggle ‘Note Audio: Off’ inside Notation and jump straight to the next note instantly!”" },
  { cat: "Tip", text: "“In Melodies, switch freely anytime between ‘Rhythmic Melody’, ‘Full Dictation’ (pitch + note length), and steady half notes!”" },
  { cat: "Tip", text: "“In ‘Production • Pink Noise EQ’, use a mixing engineer’s habit: toggle ‘Flat Bypass’ back and forth until the boosted band pops right out by contrast!”" },
  { cat: "Tip", text: "“Spin the interactive Circle of Fifths inside Knowledge: neighboring keys share six of seven notes, making key changes glide smoothly!”" },
  { cat: "Tip", text: "“In ‘Scales & Modes’, you don’t need to inspect all seven notes — hunt for the single signature color tone, like the bright #4 in Lydian!”" },
  { cat: "Tip", text: "“Want Lauscher in your signature palette? Open Color Studio under Account to blend up to three custom color themes down to RGBA!”" },

  // Category 4: Did You Know? (Music & Physics)
  { cat: "Did You Know?", text: "“Roughly half of modern pop hits rely on the same four chords: I – V – vi – IV.”" },
  { cat: "Did You Know?", text: "“In a pure octave, the upper note vibrates exactly twice as fast as the lower one (a 2:1 ratio).”" },
  { cat: "Did You Know?", text: "“A cuckoo’s call in the woods is almost always a descending Minor or Major 3rd!”" },
  { cat: "Did You Know?", text: "“The opening leap of the Star Wars theme is a Perfect 5th — that’s why the interval sounds so heroic.”" },
  { cat: "Did You Know?", text: "“When a Dominant chord (V) swerves to minor (vi) instead of resolving home, it’s called a Deceptive Cadence.”" },
  { cat: "Did You Know?", text: "“Two notes a Perfect 5th apart vibrate in a clean 3:2 ratio — that’s why even distorted guitar power chords ring clearly.”" },
  { cat: "Did You Know?", text: "“The iconic Jaws motif gets all its suspense from music’s smallest step: a tense Minor 2nd.”" },
  { cat: "Did You Know?", text: "“The syllables ‘Do, Re, Mi’ go back nearly 1,000 years to Guido of Arezzo, who pulled them from a medieval hymn.”" },
  { cat: "Did You Know?", text: "“Why do a piano and guitar sound distinct on the exact same pitch? Every instrument layers its own overtone blend!”" },
  { cat: "Did You Know?", text: "“In the Physics & Sound lab, you can watch live wave interference showing why consonances stay calm while dissonances shimmer.”" },
  { cat: "Did You Know?", text: "“The Treble clef is actually a stylized letter G: its inner curl loops right around the second line from the bottom — G4 above Middle C!”" },
  { cat: "Did You Know?", text: "“Why does the Alto clef lock Middle C onto the exact center line? It keeps viola melodies neatly inside the five-line staff without endless ledgers!”" },
  { cat: "Did You Know?", text: "“Pink noise drops gently by 3 dB per octave toward the treble — matching human hearing so every octave packs equal perceived energy!”" },
  { cat: "Did You Know?", text: "“Just ten milliseconds transforms a groove’s feel: nudging ahead of the beat sounds urgent and driving, while sitting behind feels laid-back!”" },
  { cat: "Did You Know?", text: "“Why does Dorian sound mysterious yet hopeful at the same time? Right inside a minor scale, it sneaks in a luminous Major 6th!”" },
  { cat: "Tip", text: "“Switching devices or backing up? In ‘My Account → Data Backup’, save your full profile — including mixes, custom themes, and metronome profiles — as a JSON file and reload it anytime!”" },
  { cat: "Welcome", text: "“Everything stays right on your device: zero ads, no account sign-in, and every instrument sound works completely offline — even on the go!”" },
  { cat: "Encouragement", text: "“Any tricky notes or chords gently circle back while you practice — and after 15 active minutes, Lauscher quietly reminds you to give your ears a short breather.”" },
  { cat: "Tip", text: "“Need a steady groove companion? Open the ‘Tools’ tab for the practice metronome with subdivisions, shuffle, gap clicks, saved profiles, and four click voices (Standard, Woodblock, Cowbell & Rimshot)!”" },
  { cat: "Tip", text: "“In ‘Chord Reading’ under Notation, compare stacked chords right on multiple-choice tiles — from major and minor triads all the way to E7, Esus4, and inversions!”" },
  { cat: "Did You Know?", text: "“What sets a smooth sine wave apart from a warm piano note? Inside ‘Physics & Sound’, hear and watch the frequency spectrum show how overtones sculpt every timbre!”" },
  { cat: "Tip", text: "“Whenever certain notes, intervals, or chords trip you up, Lauscher quietly remembers your weak spots and automatically weaves them back in until they feel rock-solid!”" },
  { cat: "Encouragement", text: "“Do you already feel a difference when listening to your favorite music — noticing bass lines, chord colors, or small intervals with completely new clarity?”" }
];

const PROFILE_INSTRUMENTS_EN = {
  "Klavier": "Piano",
  "Gitarre": "Guitar",
  "Gesang": "Vocals",
  "Bass": "Bass",
  "Schlagzeug": "Drums",
  "Bläser": "Horns & Winds",
  "Produktion": "Production"
};

const PROFILE_FOCUS_EN = {
  allround:   { label: "All-Rounder",         hint: "Balanced mix across all skills" },
  harmony:    { label: "Chords & Harmony",    hint: "Sharpen cadences & chord colors" },
  melody:     { label: "Melody & Solfège",    hint: "Practice scale degrees & melodic lines" },
  rhythm:     { label: "Rhythm & Groove",     hint: "Meter, tapping & micro-timing" },
  notation:   { label: "Notation & Reading",  hint: "Treble, Bass, Alto clefs & ledger lines" },
  production: { label: "Production & Mixing", hint: "Frequencies & EQ in pink noise" },
  modes:      { label: "Scales & Modes",      hint: "Church modes & characteristic notes" }
};

const PROFILE_ACCESSORIES_EN = {
  headphones: "Headphones",
  sunglasses: "Sunglasses",
  beret:      "Jazz Beret",
  bowtie:     "Concert Bow Tie",
  mic:        "Studio Mic",
  coffee:     "Coffee Break",
  notes:      "Music Notes",
  sparkles:   "Starlight",
  none:       "Classic"
};

const MIX_MODES_EN = {
  "cadence":               "Cadences",
  "cadence-minor":         "Cadences (Minor)",
  "interval-melodic":      "Intervals (Ascending)",
  "interval-melodic-down": "Intervals (Descending)",
  "interval-harmonic":     "Intervals (Harmonic)",
  "interval-drone":        "Intervals (Root Pad)",
  "chord-arp-up":          "Chords (Arpeggio ↗)",
  "chord-arp-down":        "Chords (Arpeggio ↘)",
  "interval-chords":       "Chords (Simultaneous)",
  "chord-inversions":      "Chord Inversions",
  "solfege":               "Solfège",
  "melody":                "Melody Phrases",
  "rhythm-meter":          "Rhythm • Time Signature",
  "rhythm-dictation":      "Rhythm • Dictation",
  "rhythm-tap":            "Rhythm • Rhythm Tap",
  "rhythm-groove":         "Rhythm • Groove & Feel",
  "prod-tone":             "Production • Frequencies",
  "prod-eq-noise":         "Production • Pink Noise EQ",
  "modes-scale":           "Modes • Scale Recognition",
  "modes-char":            "Modes • Characteristic Note",
  "modes-cadence":         "Modes • Modal Vamps",
  "notation-treble":       "Notation • Treble Clef",
  "notation-bass":         "Notation • Bass Clef",
  "notation-alto":         "Notation • Alto Clef",
  "notation-mixed":        "Notation • Clef Mix",
  "notation-grand": "Notation • Grand Staff",
  "notation-chords": "Notation • Chord Reading"
};

const DEFAULT_MIX_TITLES_EN = {
  mix_warmup:    { de: "Morgen-Warmup",      en: "Morning Warmup" },
  mix_intervals: { de: "Intervall-Fokus",    en: "Interval Sprint" },
  mix_groove:    { de: "Timing & Blindflug", en: "Timing & Blind Tap" }
};

const KEY_NAMES_EN = {
  "C": "C Major", "G": "G Major", "D": "D Major", "F": "F Major",
  "Bb": "Bb Major", "Eb": "Eb Major", "Ab": "Ab Major", "A": "A Major",
  "E": "E Major", "B": "B Major", "F#": "F# Major", "Db": "Db Major"
};

const DEGREES_EN = {
  "I":     { label: "Tonic",                  short: "Tonic" },
  "I7":    { label: "Tonic Dom. 7th",         short: "I7" },
  "Imaj7": { label: "Tonic Major 7th",        short: "Imaj7" },
  "ii":    { label: "Supertonic (minor)",     short: "ii (Min)" },
  "iii":   { label: "Mediant (minor)",        short: "iii (Min)" },
  "III7":  { label: "Secondary Dom. III7",    short: "III7" },
  "IV":    { label: "Subdominant",            short: "Subdom." },
  "IV7":   { label: "Subdominant Dom. 7",     short: "IV7" },
  "iv":    { label: "Minor Subdominant",      short: "iv (Min)" },
  "V":     { label: "Dominant",               short: "Dominant" },
  "V7":    { label: "Dominant 7th",           short: "Dom. 7" },
  "Vsus4": { label: "Dominant Sus4",          short: "Vsus4" },
  "vi":    { label: "Relative Minor (vi)",    short: "vi (Min)" },
  "bVI":   { label: "Modal Borrowed bVI",     short: "bVI" },
  "bVII":  { label: "Subtonic bVII",          short: "bVII" },
  "V/V":   { label: "Secondary Dominant",     short: "V/V" },
  "bII7":  { label: "Tritone Substitution",   short: "bII7 (Sub)" },
  "i": { label: "Minor Tonic", short: "Tonic" },
  "iio": { label: "Diminished ii", short: "ii° (dim)" },
  "ii7b5": { label: "Half-Diminished ii", short: "iiø7" },
  "III": { label: "Relative Major", short: "Rel. Major" },
  "v": { label: "Minor Dominant", short: "v (Min)" },
  "VI": { label: "Submediant VI (Major)", short: "VI" },
  "VII": { label: "Subtonic VII (Major)", short: "VII" },
  "N6": { label: "Neapolitan (♭II⁶)", short: "N6" }
};

const KEY_NAMES_MINOR_EN = {
  "C": "C minor",
  "G": "G minor",
  "D": "D minor",
  "F": "F minor",
  "Bb": "Bb minor",
  "Eb": "Eb minor",
  "Ab": "G# minor",
  "A": "A minor",
  "E": "E minor",
  "B": "B minor",
  "F#": "F# minor",
  "Db": "C# minor"
};

const INTERVALS_EN = {
  "P1": { label: "Perfect Unison", short: "Unison" },
  "m2": { label: "Minor 2nd",      short: "min 2nd" },
  "M2": { label: "Major 2nd",      short: "Maj 2nd" },
  "m3": { label: "Minor 3rd",      short: "min 3rd" },
  "M3": { label: "Major 3rd",      short: "Maj 3rd" },
  "P4": { label: "Perfect 4th",    short: "Perf. 4th" },
  "TT": { label: "Tritone",        short: "Tritone" },
  "P5": { label: "Perfect 5th",    short: "Perf. 5th" },
  "m6": { label: "Minor 6th",      short: "min 6th" },
  "M6": { label: "Major 6th",      short: "Maj 6th" },
  "m7": { label: "Minor 7th",      short: "min 7th" },
  "M7": { label: "Major 7th",      short: "Maj 7th" },
  "P8": { label: "Perfect Octave", short: "Octave" },
  "m9": { label: "Minor 9th",      short: "min 9th" },
  "M9": { label: "Major 9th",      short: "Maj 9th" }
};

const CHORDS_EN = {
  "maj":   { symbol: "maj",     label: "Major Triad (1–3–5)",            short: "Major" },
  "min":   { symbol: "m",       label: "Minor Triad (1–♭3–5)",           short: "Minor" },
  "dim":   { symbol: "dim",     label: "Diminished Triad (1–♭3–♭5)",     short: "Diminished" },
  "aug":   { symbol: "aug",     label: "Augmented Triad (1–3–♯5)",       short: "Augmented" },
  "sus4":  { symbol: "sus4",    label: "Suspended 4th (1–4–5)",          short: "Sus 4" },
  "7":     { symbol: "7",       label: "Dominant 7th (1–3–5–♭7)",        short: "Dom. 7" },
  "maj7":  { symbol: "maj7",    label: "Major 7th (1–3–5–7)",            short: "Major 7" },
  "m7":    { symbol: "m7",      label: "Minor 7th (1–♭3–5–♭7)",          short: "Minor 7" },
  "sus2":  { symbol: "sus2",    label: "Suspended 2nd (1–2–5)",          short: "Sus 2" },
  "m7b5":  { symbol: "m7♭5",    label: "Half-Diminished (1–♭3–♭5–♭7)",   short: "Half-Dim" },
  "dim7":  { symbol: "°7",      label: "Diminished 7th (1–♭3–♭5–♭♭7)",   short: "Dim 7" },
  "mMaj7": { symbol: "m(maj7)", label: "Minor Major 7th (1–♭3–5–7)",     short: "Min-Maj7" },
  "maj9":  { symbol: "maj9",    label: "Major 9th (1–3–5–7–9)",          short: "Major 9" },
  "7b9":   { symbol: "7♭9",     label: "Dominant 7♭9 (1–3–5–♭7–♭9)",     short: "Dom. 7♭9" },
  "7s9":   { symbol: "7♯9",     label: "Dominant 7♯9 (1–3–5–♭7–♯9)",     short: "Dom. 7♯9" }
};

const CHORD_INVERSIONS_EN = {
  "inv0": { symbol: "Bass: 1", label: "Root Position (Bass: Root)", short: "Root Position" },
  "inv1": { symbol: "Bass: 3", label: "1st Inversion (Bass: 3rd)",  short: "1st Inversion" },
  "inv2": { symbol: "Bass: 5", label: "2nd Inversion (Bass: 5th)",  short: "2nd Inversion" },
  "inv3": { symbol: "Bass: 7", label: "3rd Inversion (Bass: 7th)",  short: "3rd Inversion" }
};

const SOLFEGE_STEPS_LABEL_EN = {
  "Do_low":  "Root (Do)",
  "Re":      "2nd Degree (Re → Do)",
  "Mi":      "3rd Degree (Mi → Do)",
  "Fa":      "4th Degree (Fa → Do)",
  "Sol":     "5th Degree (Sol → Do)",
  "La":      "6th Degree (La → Do)",
  "Ti":      "Leading Tone (Ti → Do)",
  "Do_high": "Upper Tonic (Do)"
};

const MELODY_RANGES_EN = {
  "do-fa":  { label: "Do–Fa",    badge: "Do–Fa" },
  "sol-do": { label: "Sol–Do",   badge: "Sol–Do" },
  "full":   { label: "Full Key", badge: "Do–Do" }
};

const RHYTHM_METERS_EN = {
  "4/4": { short: "Common 4/4",  label: "4/4 Time (4 Quarters)" },
  "3/4": { short: "3/4 Waltz",   label: "3/4 Time (Waltz)" },
  "2/4": { short: "2/4 March",   label: "2/4 Time (March)" },
  "6/8": { short: "6/8 Swinging",label: "6/8 Time (Compound 2×3)" },
  "5/4": { short: "Odd 3 + 2",   label: "5/4 Time (Odd Meter 3+2)" },
  "7/8": { short: "Odd 2+2+3",   label: "7/8 Time (Odd Meter 7/8)" }
};

const RHYTHM_CELLS_EN = {
  quarter:          { symbol: "♩",     short: "Quarter",     label: "Quarter Note (1 beat)" },
  eighth2:          { symbol: "♫",     short: "2 Eighths",   label: "Eighth-Note Pair (1-and)" },
  rest:             { symbol: "Rest",  short: "Rest",        label: "Quarter Rest (Silence)" },
  offbeat:          { symbol: "and",   short: "Offbeat",     label: "Eighth Rest + Eighth Note (“and”)" },
  triplet:          { symbol: "3×♪",   short: "Triplet",     label: "Eighth-Note Triplet (3 equal)" },
  eighths16:        { symbol: "♪♬",   short: "8th + two 16s", label: "Eighth + Two 16ths" },
  sixteenths8:      { symbol: "♬♪",   short: "Two 16s + 8th", label: "Two 16ths + Eighth" },
  sixteenth4:       { symbol: "♬",     short: "4× 16ths",    label: "Four 16th Notes" },
  dotEighth16:      { symbol: "♩.♬",  short: "Long–Short",  label: "Dotted Eighth + 16th" },
  sixteenDotEighth: { symbol: "♬♩.",  short: "Short–Long",  label: "16th + Dotted Eighth" },
  sync16:           { symbol: "Sync.", short: "16th Sync.",  label: "16th Rest + 16th Syncopation" }
};

const RHYTHM_TAP_LEVELS_EN = {
  1: "Pulse Anchor",
  2: "Eighths & 3/4",
  3: "Syncopation & Triplets",
  4: "Blind Mode"
};

const RHYTHM_GROOVES_EN = {
  march:       { roman: "March",    short: "Accent 1 & 3",    label: "March (Snare on 1 & 3)" },
  backbeat:    { roman: "Backbeat", short: "Pop/Rock 2 & 4",  label: "Backbeat (Snare on 2 & 4)" },
  syncopation: { roman: "Syncop.",  short: "Upbeat “and”",    label: "Syncopated Groove (Offbeats)" },
  swing:       { roman: "Swing",    short: "Triplet Bounce",  label: "Swing / Shuffle (Triplet feel)" },
  poly32:      { roman: "3 vs 2",   short: "Polyrhythm",      label: "Polyrhythm (3 against 2)" }
};

const RHYTHM_OFFBEATS_EN = {
  "1":  { roman: "1",     short: "Onbeat 1", label: "Beat 1 (Onbeat)" },
  "1+": { roman: "1-and", short: "Offbeat",  label: "1-and (Offbeat)" },
  "2":  { roman: "2",     short: "Onbeat 2", label: "Beat 2 (Onbeat)" },
  "2+": { roman: "2-and", short: "Offbeat",  label: "2-and (Offbeat)" },
  "3":  { roman: "3",     short: "Onbeat 3", label: "Beat 3 (Onbeat)" },
  "3+": { roman: "3-and", short: "Offbeat",  label: "3-and (Offbeat)" },
  "4":  { roman: "4",     short: "Onbeat 4", label: "Beat 4 (Onbeat)" },
  "4+": { roman: "4-and", short: "Offbeat",  label: "4-and (Offbeat)" }
};

const RHYTHM_MICRO_EN = {
  early:  { roman: "↖ Early",  short: "Pushing",       label: "Early (pushing ahead of the beat)" },
  pocket: { roman: "◎ Pocket", short: "In the Pocket", label: "Dead on the Beat (“In the Pocket”)" },
  late:   { roman: "↘ Late",   short: "Laid-back",     label: "Late (laid-back behind the beat)" }
};

const PROD_FREQS_EN = {
  "63":    { symbol: "63 Hz",   roman: "63 Hz",   short: "Sub-Bass",  label: "63 Hz – Sub-Bass & Kick Thump" },
  "125":   { symbol: "125 Hz",  roman: "125 Hz",  short: "Bass",      label: "125 Hz – Bass Punch & Warmth" },
  "250":   { symbol: "250 Hz",  roman: "250 Hz",  short: "Low-Mids",  label: "250 Hz – Low-Mids (“Mud” Zone)" },
  "500":   { symbol: "500 Hz",  roman: "500 Hz",  short: "Boxiness",  label: "500 Hz – Lower Mids (“Boxy”)" },
  "800":   { symbol: "800 Hz",  roman: "800 Hz",  short: "Core Mids", label: "800 Hz – Nasal Mids & Wood" },
  "1000":  { symbol: "1 kHz",   roman: "1 kHz",   short: "Core",      label: "1 kHz – Center Midrange" },
  "1600":  { symbol: "1.6 kHz", roman: "1.6 kHz", short: "Attack",    label: "1.6 kHz – Upper-Mid Attack" },
  "2000":  { symbol: "2 kHz",   roman: "2 kHz",   short: "Presence",  label: "2 kHz – Vocal Focus & Presence" },
  "2500":  { symbol: "2.5 kHz", roman: "2.5 kHz", short: "Edge",      label: "2.5 kHz – Bite & Cut-Through" },
  "4000":  { symbol: "4 kHz",   roman: "4 kHz",   short: "Direct",    label: "4 kHz – Definition & Consonants" },
  "6300":  { symbol: "6.3 kHz", roman: "6.3 kHz", short: "Sibilance", label: "6.3 kHz – Sibilance & Crispness" },
  "8000":  { symbol: "8 kHz",   roman: "8 kHz",   short: "Sparkle",   label: "8 kHz – High-End Sparkle & Sheen" },
  "12000": { symbol: "12 kHz",  roman: "12 kHz",  short: "Air",       label: "12 kHz – Super-Highs & “Air” Band" }
};

const PROD_LEVEL_LABELS_EN = {
  tone: { 1: "5 Bands (Basic)", 2: "8 Octave Bands", 3: "12 Bands" },
  eq:   { 1: "Wide EQ",         2: "Octave EQ",      3: "Surgical" }
};

const MODES_EN = {
  "ionian":     { roman: "Ionian",       short: "Major (1 2 3 4 5 6 7)",     label: "Ionian (Major Scale)" },
  "dorian":     { roman: "Dorian",       short: "Minor w/ ♮6",               label: "Dorian (1 2 b3 4 5 6 b7)" },
  "phrygian":   { roman: "Phrygian",     short: "Minor w/ b2",               label: "Phrygian (1 b2 b3 4 5 b6 b7)" },
  "lydian":     { roman: "Lydian",       short: "Major w/ #4",               label: "Lydian (1 2 3 #4 5 6 7)" },
  "mixolydian": { roman: "Mixolydian",   short: "Major w/ b7",               label: "Mixolydian (1 2 3 4 5 6 b7)" },
  "aeolian":    { roman: "Aeolian",      short: "Natural Minor (b6, b7)",    label: "Aeolian (1 2 b3 4 5 b6 b7)" },
  "locrian":    { roman: "Locrian",      short: "Minor w/ b2 & b5",          label: "Locrian (1 b2 b3 4 b5 b6 b7)" },
  "harm_minor": { roman: "Harm. Minor",  short: "Minor w/ #7",               label: "Harmonic Minor (b6 & leading 7)" }
};

const MODE_LEVEL_LABELS_EN = {
  scale:   { 1: "4 Core Modes",        2: "All 7 Modes (C)",       3: "All 7 + Changing Root" },
  char:    { 1: "Major Modes",         2: "Minor Modes",           3: "All + Harm. Minor" },
  cadence: { 1: "4 Standard Vamps",    2: "All 6 Modal Vamps" }
};

registerLanguageBundle("en", {
  tables: {
    quotes: LAUSCHEBAER_QUOTES_EN,
    profileInstruments: PROFILE_INSTRUMENTS_EN,
    profileFocus: PROFILE_FOCUS_EN,
    profileAccessories: PROFILE_ACCESSORIES_EN,
    mixModes: MIX_MODES_EN,
    defaultMixTitles: Object.fromEntries(
      Object.entries(DEFAULT_MIX_TITLES_EN).map(([k, v]) => [k, v.en])
    ),
    keyNames: KEY_NAMES_EN,
    minorKeyNames: KEY_NAMES_MINOR_EN,
    degrees: DEGREES_EN,
    intervals: INTERVALS_EN,
    chords: CHORDS_EN,
    chordInversions: CHORD_INVERSIONS_EN,
    solfegeStepsLabel: SOLFEGE_STEPS_LABEL_EN,
    melodyRanges: MELODY_RANGES_EN,
    rhythmMeters: RHYTHM_METERS_EN,
    rhythmCells: RHYTHM_CELLS_EN,
    rhythmTapLevels: RHYTHM_TAP_LEVELS_EN,
    rhythmGrooves: RHYTHM_GROOVES_EN,
    rhythmOffbeats: RHYTHM_OFFBEATS_EN,
    rhythmMicro: RHYTHM_MICRO_EN,
    prodFreqs: PROD_FREQS_EN,
    prodLevelLabels: PROD_LEVEL_LABELS_EN,
    modes: MODES_EN,
    modeLevelLabels: MODE_LEVEL_LABELS_EN
  }
});

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
  return getLocalizedTable("quotes") || LAUSCHEBAER_QUOTES_EN;
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
  const enKnown = DEFAULT_MIX_TITLES_EN[mix.id];
  if (enKnown) {
    const knownTitles = new Set([enKnown.de, enKnown.en]);
    VALID_LANGUAGES.forEach(code => {
      const t = LOCALIZED_TABLES_BY_LANG[code]?.defaultMixTitles?.[mix.id];
      if (typeof t === "string" && t) knownTitles.add(t);
    });
    if (knownTitles.has(mix.title)) {
      if (lang === "de") return enKnown.de;
      if (lang === "en") return enKnown.en;
      const localized = LOCALIZED_TABLES_BY_LANG[lang]?.defaultMixTitles?.[mix.id];
      return (typeof localized === "string" && localized) ? localized : enKnown.en;
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
