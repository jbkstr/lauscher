/**
 * Lauscher • Notationsbegriffe, Symbole, Ablauf-Funktionsweisen, SVGs & Wissensmodul
 * Zentrale Datenquelle für den Übungstyp „notation-symbols“ und das Nachschlagewerk im Wissens-Hub.
 */

const NOTATION_TERMS_GROUPS = [
  { id: "dynamics",     level: 1, tagClass: "tag-peach",  uiKey: "secDynamics",     filterKey: "filterDynamics" },
  { id: "tempo",        level: 2, tagClass: "tag-sage",   uiKey: "secTempo",        filterKey: "filterTempo" },
  { id: "articulation", level: 3, tagClass: "tag-lilac",  uiKey: "secArticulation", filterKey: "filterArticulation" },
  { id: "navigation",   level: 4, tagClass: "tag-peach",  uiKey: "secNavigation",   filterKey: "filterNavigation" }
];

const NOTATION_TERMS_CATALOG = [
  // ===== STUFE 1: DYNAMIK & LAUTSTÄRKE =====
  { id: "ppp",      group: "dynamics", level: 1, term: "Pianississimo", abbr: "ppp",    svgKey: "ppp",      canBeSymbolChoice: true,  audioDemo: "dyn-ppp",      confusables: ["pp", "p", "fff", "morendo"] },
  { id: "pp",       group: "dynamics", level: 1, term: "Pianissimo",    abbr: "pp",     svgKey: "pp",       canBeSymbolChoice: true,  audioDemo: "dyn-pp",       confusables: ["ppp", "p", "mp", "ff"] },
  { id: "p",        group: "dynamics", level: 1, term: "Piano",         abbr: "p",      svgKey: "p",        canBeSymbolChoice: true,  audioDemo: "dyn-p",        confusables: ["pp", "mp", "mf", "f"] },
  { id: "mp",       group: "dynamics", level: 1, term: "Mezzopiano",    abbr: "mp",     svgKey: "mp",       canBeSymbolChoice: true,  audioDemo: "dyn-mp",       confusables: ["p", "mf", "pp", "f"] },
  { id: "mf",       group: "dynamics", level: 1, term: "Mezzoforte",    abbr: "mf",     svgKey: "mf",       canBeSymbolChoice: true,  audioDemo: "dyn-mf",       confusables: ["mp", "f", "p", "ff"] },
  { id: "f",        group: "dynamics", level: 1, term: "Forte",         abbr: "f",      svgKey: "f",        canBeSymbolChoice: true,  audioDemo: "dyn-f",        confusables: ["mf", "ff", "sfz", "fp"] },
  { id: "ff",       group: "dynamics", level: 1, term: "Fortissimo",    abbr: "ff",     svgKey: "ff",       canBeSymbolChoice: true,  audioDemo: "dyn-ff",       confusables: ["f", "fff", "pp", "sfz"] },
  { id: "fff",      group: "dynamics", level: 1, term: "Fortississimo", abbr: "fff",    svgKey: "fff",      canBeSymbolChoice: true,  audioDemo: "dyn-fff",      confusables: ["ff", "f", "ppp", "sfz"] },
  { id: "cresc",    group: "dynamics", level: 1, term: "Crescendo",     abbr: "cresc.", svgKey: "cresc",    canBeSymbolChoice: true,  audioDemo: "dyn-cresc",    confusables: ["decresc", "sfz", "rfz", "fp"] },
  { id: "decresc",  group: "dynamics", level: 1, term: "Decrescendo / Diminuendo", abbr: "dim.", svgKey: "decresc", canBeSymbolChoice: true, audioDemo: "dyn-decresc", confusables: ["cresc", "morendo", "subito-p", "fp"] },
  { id: "sfz",      group: "dynamics", level: 1, term: "Sforzando",     abbr: "sfz",    svgKey: "sfz",      canBeSymbolChoice: true,  audioDemo: "dyn-sfz",      confusables: ["fp", "rfz", "ff", "subito-p"] },
  { id: "fp",       group: "dynamics", level: 1, term: "Fortepiano",    abbr: "fp",     svgKey: "fp",       canBeSymbolChoice: true,  audioDemo: "dyn-fp",       confusables: ["sfz", "subito-p", "rfz", "mf"] },
  { id: "rfz",      group: "dynamics", level: 1, term: "Rinforzando",   abbr: "rfz",    svgKey: "rfz",      canBeSymbolChoice: true,  audioDemo: null,           confusables: ["sfz", "fp", "cresc", "f"] },
  { id: "subito-p", group: "dynamics", level: 1, term: "Subito piano",  abbr: "sub. p", svgKey: "subito-p", canBeSymbolChoice: true,  audioDemo: "dyn-subito-p", confusables: ["fp", "decresc", "pp", "morendo"] },
  { id: "morendo",  group: "dynamics", level: 1, term: "Morendo / al niente", abbr: "morendo", svgKey: "morendo", canBeSymbolChoice: false, audioDemo: "dyn-morendo", confusables: ["decresc", "ppp", "subito-p", "pp"] },

  // ===== STUFE 2: TEMPO, AGOGIK & CHARAKTER =====
  { id: "largo",       group: "tempo", level: 2, term: "Largo / Grave", abbr: "Largo",   svgKey: "largo",       canBeSymbolChoice: false, audioDemo: "tempo-largo",    bpmHint: "40–60 BPM",   confusables: ["adagio", "andante", "moderato", "presto"] },
  { id: "adagio",      group: "tempo", level: 2, term: "Adagio",        abbr: "Adagio",  svgKey: "adagio",      canBeSymbolChoice: false, audioDemo: "tempo-adagio",   bpmHint: "60–72 BPM",   confusables: ["largo", "andante", "moderato", "ritardando"] },
  { id: "andante",     group: "tempo", level: 2, term: "Andante",       abbr: "Andante", svgKey: "andante",     canBeSymbolChoice: false, audioDemo: "tempo-andante",  bpmHint: "76–96 BPM",   confusables: ["adagio", "moderato", "allegretto", "largo"] },
  { id: "moderato",    group: "tempo", level: 2, term: "Moderato",      abbr: "Moderato",svgKey: "moderato",    canBeSymbolChoice: false, audioDemo: "tempo-moderato", bpmHint: "98–116 BPM",  confusables: ["andante", "allegretto", "allegro", "adagio"] },
  { id: "allegretto",  group: "tempo", level: 2, term: "Allegretto",    abbr: "Allegretto", svgKey: "allegretto", canBeSymbolChoice: false, audioDemo: null,           bpmHint: "112–124 BPM", confusables: ["allegro", "moderato", "andante", "vivace"] },
  { id: "allegro",     group: "tempo", level: 2, term: "Allegro",       abbr: "Allegro", svgKey: "allegro",     canBeSymbolChoice: false, audioDemo: "tempo-allegro",  bpmHint: "120–152 BPM", confusables: ["allegretto", "vivace", "presto", "moderato"] },
  { id: "vivace",      group: "tempo", level: 2, term: "Vivace",        abbr: "Vivace",  svgKey: "vivace",      canBeSymbolChoice: false, audioDemo: null,             bpmHint: "148–172 BPM", confusables: ["allegro", "presto", "allegretto", "scherzando"] },
  { id: "presto",      group: "tempo", level: 2, term: "Presto",        abbr: "Presto",  svgKey: "presto",      canBeSymbolChoice: false, audioDemo: "tempo-presto",   bpmHint: "168–200 BPM", confusables: ["vivace", "allegro", "largo", "accelerando"] },
  { id: "ritardando",  group: "tempo", level: 2, term: "Ritardando / Rallentando", abbr: "rit. / rall.", svgKey: "ritardando", canBeSymbolChoice: true, audioDemo: "tempo-rit", confusables: ["accelerando", "a-tempo", "meno-mosso", "fermata"] },
  { id: "accelerando", group: "tempo", level: 2, term: "Accelerando",   abbr: "accel.",  svgKey: "accelerando", canBeSymbolChoice: true,  audioDemo: "tempo-accel",    confusables: ["ritardando", "piu-mosso", "a-tempo", "rubato"] },
  { id: "a-tempo",     group: "tempo", level: 2, term: "A tempo",       abbr: "a tempo", svgKey: "a-tempo",     canBeSymbolChoice: true,  audioDemo: null,             confusables: ["ritardando", "accelerando", "rubato", "piu-mosso"] },
  { id: "rubato",      group: "tempo", level: 2, term: "Tempo rubato",  abbr: "rubato",  svgKey: "rubato",      canBeSymbolChoice: false, audioDemo: null,             confusables: ["a-tempo", "ritardando", "accelerando", "fermata"] },
  { id: "piu-mosso",   group: "tempo", level: 2, term: "Più mosso",     abbr: "più mosso",  svgKey: "piu-mosso",  canBeSymbolChoice: true, audioDemo: null,            confusables: ["meno-mosso", "accelerando", "a-tempo", "vivace"] },
  { id: "meno-mosso",  group: "tempo", level: 2, term: "Meno mosso",    abbr: "meno mosso", svgKey: "meno-mosso", canBeSymbolChoice: true, audioDemo: null,            confusables: ["piu-mosso", "ritardando", "adagio", "a-tempo"] },
  { id: "fermata",     group: "tempo", level: 2, term: "Fermate",       abbr: "Fermata", svgKey: "fermata",     canBeSymbolChoice: true,  audioDemo: "tempo-fermata",  confusables: ["breath-mark", "ritardando", "rubato", "tenuto"] },
  { id: "breath-mark", group: "tempo", level: 2, term: "Atemzeichen / Zäsur", abbr: ", / //", svgKey: "breath-mark", canBeSymbolChoice: true, audioDemo: null,           confusables: ["fermata", "ritardando", "a-tempo", "rubato"] },
  { id: "dolce",       group: "tempo", level: 2, term: "Dolce",         abbr: "dolce",   svgKey: "dolce",       canBeSymbolChoice: false, audioDemo: null,             confusables: ["cantabile", "leggiero", "sotto-voce", "maestoso"] },
  { id: "cantabile",   group: "tempo", level: 2, term: "Cantabile",     abbr: "cantabile", svgKey: "cantabile", canBeSymbolChoice: false, audioDemo: null,             confusables: ["dolce", "scherzando", "maestoso", "leggiero"] },
  { id: "maestoso",    group: "tempo", level: 2, term: "Maestoso",      abbr: "maestoso", svgKey: "maestoso",   canBeSymbolChoice: false, audioDemo: null,             confusables: ["scherzando", "dolce", "leggiero", "largo"] },
  { id: "scherzando",  group: "tempo", level: 2, term: "Scherzando",    abbr: "scherzando", svgKey: "scherzando", canBeSymbolChoice: false, audioDemo: null,           confusables: ["maestoso", "dolce", "leggiero", "vivace"] },
  { id: "leggiero",    group: "tempo", level: 2, term: "Leggiero",      abbr: "leggiero", svgKey: "leggiero",   canBeSymbolChoice: false, audioDemo: null,             confusables: ["maestoso", "dolce", "scherzando", "sotto-voce"] },
  { id: "sotto-voce",  group: "tempo", level: 2, term: "Sotto voce",    abbr: "sotto voce", svgKey: "sotto-voce", canBeSymbolChoice: false, audioDemo: null,           confusables: ["dolce", "cantabile", "leggiero", "maestoso"] },

  // ===== STUFE 3: ARTIKULATION, VERZIERUNGEN & SPIELWEISEN =====
  { id: "staccato",      group: "articulation", level: 3, term: "Staccato",      abbr: "stacc.", svgKey: "staccato",      canBeSymbolChoice: true,  audioDemo: "art-staccato",    confusables: ["staccatissimo", "tenuto", "portato", "accent"] },
  { id: "staccatissimo", group: "articulation", level: 3, term: "Staccatissimo", abbr: "staccatiss.", svgKey: "staccatissimo", canBeSymbolChoice: true, audioDemo: "art-staccatissimo", confusables: ["staccato", "marcato", "accent", "tenuto"] },
  { id: "tenuto",        group: "articulation", level: 3, term: "Tenuto",        abbr: "ten.",   svgKey: "tenuto",        canBeSymbolChoice: true,  audioDemo: "art-tenuto",      confusables: ["staccato", "accent", "portato", "legato-slur"] },
  { id: "portato",       group: "articulation", level: 3, term: "Portato",       abbr: "portato",svgKey: "portato",       canBeSymbolChoice: true,  audioDemo: null,              confusables: ["staccato", "legato-slur", "tenuto", "tie"] },
  { id: "accent",        group: "articulation", level: 3, term: "Akzent",        abbr: ">",      svgKey: "accent",        canBeSymbolChoice: true,  audioDemo: "art-accent",      confusables: ["marcato", "tenuto", "staccato", "staccatissimo"] },
  { id: "marcato",       group: "articulation", level: 3, term: "Marcato",       abbr: "^",      svgKey: "marcato",       canBeSymbolChoice: true,  audioDemo: "art-marcato",     confusables: ["accent", "staccatissimo", "tenuto", "staccato"] },
  { id: "legato-slur",   group: "articulation", level: 3, term: "Bindebogen (Legato)", abbr: "Legato", svgKey: "legato-slur", canBeSymbolChoice: true, audioDemo: "art-legato",     confusables: ["tie", "portato", "tenuto", "staccato"] },
  { id: "tie",           group: "articulation", level: 3, term: "Haltebogen",    abbr: "Tie",    svgKey: "tie",           canBeSymbolChoice: true,  audioDemo: "art-tie",         confusables: ["legato-slur", "portato", "tenuto", "fermata"] },
  { id: "trill",         group: "articulation", level: 3, term: "Triller",       abbr: "tr",     svgKey: "trill",         canBeSymbolChoice: true,  audioDemo: "orn-trill",       confusables: ["mordent", "turn", "tremolo", "grace-note"] },
  { id: "mordent",       group: "articulation", level: 3, term: "Mordent / Pralltriller", abbr: "Mordent", svgKey: "mordent", canBeSymbolChoice: true, audioDemo: "orn-mordent",  confusables: ["trill", "turn", "grace-note", "tremolo"] },
  { id: "turn",          group: "articulation", level: 3, term: "Doppelschlag (Turn)", abbr: "Turn", svgKey: "turn",      canBeSymbolChoice: true,  audioDemo: "orn-turn",        confusables: ["trill", "mordent", "grace-note", "arpeggio"] },
  { id: "grace-note",    group: "articulation", level: 3, term: "Vorschlag",     abbr: "Grace",  svgKey: "grace-note",    canBeSymbolChoice: true,  audioDemo: "orn-grace",       confusables: ["mordent", "trill", "turn", "glissando"] },
  { id: "arpeggio",      group: "articulation", level: 3, term: "Arpeggio",      abbr: "arpegg.",svgKey: "arpeggio",      canBeSymbolChoice: true,  audioDemo: "orn-arpeggio",    confusables: ["glissando", "tremolo", "trill", "turn"] },
  { id: "glissando",     group: "articulation", level: 3, term: "Glissando",     abbr: "gliss.", svgKey: "glissando",     canBeSymbolChoice: true,  audioDemo: "orn-glissando",   confusables: ["arpeggio", "tremolo", "legato-slur", "trill"] },
  { id: "tremolo",       group: "articulation", level: 3, term: "Tremolo",       abbr: "trem.",  svgKey: "tremolo",       canBeSymbolChoice: true,  audioDemo: "orn-tremolo",     confusables: ["trill", "arpeggio", "glissando", "mordent"] },
  { id: "octave-8va",    group: "articulation", level: 3, term: "Ottava alta (8va)", abbr: "8va", svgKey: "octave-8va",   canBeSymbolChoice: true,  audioDemo: "play-8va",        confusables: ["octave-8vb", "pedal", "trill", "glissando"] },
  { id: "octave-8vb",    group: "articulation", level: 3, term: "Ottava bassa (8vb)", abbr: "8vb", svgKey: "octave-8vb",  canBeSymbolChoice: true,  audioDemo: "play-8vb",        confusables: ["octave-8va", "pedal", "tremolo", "arpeggio"] },
  { id: "pedal",         group: "articulation", level: 3, term: "Pedalzeichen",  abbr: "Ped. *", svgKey: "pedal",         canBeSymbolChoice: true,  audioDemo: null,              confusables: ["octave-8va", "octave-8vb", "pizzicato", "con-sordino"] },
  { id: "pizzicato",     group: "articulation", level: 3, term: "Pizzicato / Arco", abbr: "pizz. / arco", svgKey: "pizzicato", canBeSymbolChoice: false, audioDemo: null,          confusables: ["con-sordino", "tutti-solo", "simile", "attacca"] },
  { id: "con-sordino",   group: "articulation", level: 3, term: "Con sordino",   abbr: "con sord.", svgKey: "con-sordino", canBeSymbolChoice: false, audioDemo: null,             confusables: ["pizzicato", "tutti-solo", "simile", "attacca"] },
  { id: "tutti-solo",    group: "articulation", level: 3, term: "Tutti / Solo / Divisi", abbr: "tutti / solo", svgKey: "tutti-solo", canBeSymbolChoice: false, audioDemo: null,   confusables: ["pizzicato", "con-sordino", "simile", "attacca"] },
  { id: "attacca",       group: "articulation", level: 3, term: "Attacca",       abbr: "attacca", svgKey: "attacca",      canBeSymbolChoice: false, audioDemo: null,              confusables: ["simile", "pizzicato", "con-sordino", "tutti-solo"] },
  { id: "simile",        group: "articulation", level: 3, term: "Simile",        abbr: "sim.",   svgKey: "simile",        canBeSymbolChoice: false, audioDemo: null,              confusables: ["attacca", "pizzicato", "con-sordino", "tutti-solo"] },

  // ===== STUFE 4: ABLAUF, FORM & SPRUNGZEICHEN =====
  { id: "repeat-signs",   group: "navigation", level: 4, term: "Wiederholungszeichen", abbr: "|: :|",      svgKey: "repeat-signs",   canBeSymbolChoice: true, audioDemo: null, confusables: ["volta-brackets", "double-barline", "final-barline", "sim-bar"] },
  { id: "volta-brackets", group: "navigation", level: 4, term: "Voltenklammern",       abbr: "1. / 2.",    svgKey: "volta-brackets", canBeSymbolChoice: true, audioDemo: null, confusables: ["repeat-signs", "dc-al-coda", "ds-al-coda", "double-barline"] },
  { id: "double-barline", group: "navigation", level: 4, term: "Doppelstrich",         abbr: "||",         svgKey: "double-barline", canBeSymbolChoice: true, audioDemo: null, confusables: ["final-barline", "repeat-signs", "multi-rest", "sim-bar"] },
  { id: "final-barline",  group: "navigation", level: 4, term: "Schlussstrich",        abbr: "||",         svgKey: "final-barline",  canBeSymbolChoice: true, audioDemo: null, confusables: ["double-barline", "repeat-signs", "fine", "multi-rest"] },
  { id: "sim-bar",        group: "navigation", level: 4, term: "Taktwiederholung",     abbr: "%",          svgKey: "sim-bar",        canBeSymbolChoice: true, audioDemo: null, confusables: ["multi-rest", "repeat-signs", "segno", "coda"] },
  { id: "multi-rest",     group: "navigation", level: 4, term: "Mehrtaktpause",        abbr: "8",          svgKey: "multi-rest",     canBeSymbolChoice: true, audioDemo: null, confusables: ["sim-bar", "gp-tacet", "double-barline", "final-barline"] },
  { id: "gp-tacet",       group: "navigation", level: 4, term: "Generalpause / Tacet", abbr: "G.P. / tacet", svgKey: "gp-tacet",     canBeSymbolChoice: true, audioDemo: null, confusables: ["multi-rest", "fine", "final-barline", "double-barline"] },
  { id: "da-capo",        group: "navigation", level: 4, term: "Da Capo",              abbr: "D.C.",       svgKey: "da-capo",        canBeSymbolChoice: true, audioDemo: null, confusables: ["dal-segno", "dc-al-fine", "dc-al-coda", "segno"] },
  { id: "dal-segno",      group: "navigation", level: 4, term: "Dal Segno",            abbr: "D.S.",       svgKey: "dal-segno",      canBeSymbolChoice: true, audioDemo: null, confusables: ["da-capo", "segno", "ds-al-coda", "coda"] },
  { id: "segno",          group: "navigation", level: 4, term: "Segno",                abbr: "Segno",      svgKey: "segno",          canBeSymbolChoice: true, audioDemo: null, confusables: ["coda", "dal-segno", "sim-bar", "repeat-signs"] },
  { id: "coda",           group: "navigation", level: 4, term: "Coda",                 abbr: "Coda",       svgKey: "coda",           canBeSymbolChoice: true, audioDemo: null, confusables: ["segno", "fine", "ds-al-coda", "dc-al-coda"] },
  { id: "fine",           group: "navigation", level: 4, term: "Fine",                 abbr: "Fine",       svgKey: "fine",           canBeSymbolChoice: true, audioDemo: null, confusables: ["coda", "dc-al-fine", "final-barline", "gp-tacet"] },
  { id: "dc-al-fine",     group: "navigation", level: 4, term: "Da Capo al Fine",      abbr: "D.C. al Fine", svgKey: "dc-al-fine",   canBeSymbolChoice: true, audioDemo: null, confusables: ["ds-al-coda", "dc-al-coda", "da-capo", "fine"] },
  { id: "ds-al-coda",     group: "navigation", level: 4, term: "Dal Segno al Coda",    abbr: "D.S. al Coda", svgKey: "ds-al-coda",   canBeSymbolChoice: true, audioDemo: null, confusables: ["dc-al-coda", "dc-al-fine", "dal-segno", "coda"] },
  { id: "dc-al-coda",     group: "navigation", level: 4, term: "Da Capo al Coda",      abbr: "D.C. al Coda", svgKey: "dc-al-coda",   canBeSymbolChoice: true, audioDemo: null, confusables: ["ds-al-coda", "dc-al-fine", "da-capo", "coda"] }
];

const NOTATION_FLOW_SCENARIOS = [
  {
    id: "flow-repeat",
    correctOrder: "A → B → C → B → C → D",
    wrongOrders: [
      "A → B → C → A → B → C → D",
      "A → B → C → D → B → C",
      "A → B → B → C → D"
    ]
  },
  {
    id: "flow-volta",
    correctOrder: "A → B → A → C",
    wrongOrders: [
      "A → B → C → A → C",
      "A → B → A → B → C",
      "A → C → A → B"
    ]
  },
  {
    id: "flow-dc-fine",
    correctOrder: "A → B → C → A → B",
    wrongOrders: [
      "A → B → A → B → C",
      "A → B → C → B → C",
      "A → B → C → A → B → C"
    ]
  },
  {
    id: "flow-ds-fine",
    correctOrder: "A → B → C → D → B → C",
    wrongOrders: [
      "A → B → C → D → A → B → C",
      "A → B → C → B → C → D",
      "A → B → C → D → C"
    ]
  },
  {
    id: "flow-ds-coda",
    correctOrder: "A → B → C → B → D",
    wrongOrders: [
      "A → B → D → B → C",
      "A → B → C → A → B → D",
      "A → B → C → D → B"
    ]
  },
  {
    id: "flow-dc-coda",
    correctOrder: "A → B → C → A → D",
    wrongOrders: [
      "A → D → B → C → A",
      "A → B → C → B → D",
      "A → B → C → A → B → D"
    ]
  }
];

function getNotationTermActiveLang() {
  if (typeof getAppLanguage === "function") return getAppLanguage();
  return state?.lang || "de";
}

function pickNotationTermLang(map) {
  if (!map || typeof map !== "object") return "";
  const lang = getNotationTermActiveLang();
  return map[lang] || map.en || map.de || "";
}

function getNotationTermEntry(id) {
  return NOTATION_TERMS_CATALOG.find(item => item.id === id) || null;
}

function getNotationTermText(id) {
  const rec = (typeof NOTATION_TERMS_I18N !== "undefined" && NOTATION_TERMS_I18N[id]) ? NOTATION_TERMS_I18N[id] : null;
  if (!rec) return { short: id, desc: "", tip: "" };
  return {
    short: pickNotationTermLang(rec.short),
    desc: pickNotationTermLang(rec.desc),
    tip: pickNotationTermLang(rec.tip)
  };
}

function getNotationFlowText(id) {
  const rec = (typeof NOTATION_FLOW_I18N !== "undefined" && NOTATION_FLOW_I18N[id]) ? NOTATION_FLOW_I18N[id] : null;
  if (!rec) return { title: id, prompt: "", desc: "" };
  return {
    title: pickNotationTermLang(rec.title),
    prompt: pickNotationTermLang(rec.prompt),
    desc: pickNotationTermLang(rec.desc)
  };
}

function getNotationRefUIText(key) {
  const rec = (typeof NOTATION_REF_UI_I18N !== "undefined" && NOTATION_REF_UI_I18N[key]) ? NOTATION_REF_UI_I18N[key] : null;
  return rec ? pickNotationTermLang(rec) : key;
}

function getNotationSymbolsLevelLabel(level) {
  const lvl = Math.max(1, Math.min(5, parseInt(level, 10) || 1));
  if (lvl === 1) return getNotationRefUIText("filterDynamics");
  if (lvl === 2) return getNotationRefUIText("filterTempo");
  if (lvl === 3) return getNotationRefUIText("filterArticulation");
  if (lvl === 4) return getNotationRefUIText("filterNavigation");
  return getNotationRefUIText("filterAll");
}

// =========================================================================
// INLINE-SVG-ZEICHNER FÜR NOTATIONSSYMBOLE (Theme-kompatibel, ohne externe Fonts)
// =========================================================================

function buildNotationMiniStaffLinesSVG(yTop = 20, step = 8, x1 = 10, x2 = 110, opacity = 0.34) {
  let out = "";
  for (let i = 0; i < 5; i++) {
    const y = yTop + i * step;
    out += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="currentColor" stroke-width="1.05" opacity="${opacity}"/>`;
  }
  return out;
}

function buildSegnoGlyphInner(cx, cy, scale = 1, color = "currentColor") {
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <path d="M 7 -11 C 7 -15, 0 -17, -4 -13 C -8 -9, -5 -4, 0 -1 C 5 2, 8 7, 4 12 C 0 16, -7 15, -7 11"
            fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="7" cy="-11" r="2.2" fill="${color}"/>
      <circle cx="-7" cy="11" r="2.2" fill="${color}"/>
      <line x1="-10" y1="12" x2="10" y2="-12" stroke="${color}" stroke-width="2.1" stroke-linecap="round"/>
      <circle cx="-9" cy="-3.5" r="2.1" fill="${color}"/>
      <circle cx="9" cy="3.5" r="2.1" fill="${color}"/>
    </g>
  `;
}

function buildCodaGlyphInner(cx, cy, scale = 1, color = "currentColor") {
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <ellipse cx="0" cy="0" rx="9" ry="11.5" fill="none" stroke="${color}" stroke-width="2.5"/>
      <line x1="0" y1="-16" x2="0" y2="16" stroke="${color}" stroke-width="2.1" stroke-linecap="round"/>
      <line x1="-13.5" y1="0" x2="13.5" y2="0" stroke="${color}" stroke-width="2.1" stroke-linecap="round"/>
    </g>
  `;
}

function buildNotationSymbolSVG(svgKey, opts = {}) {
  const cls = opts.className ? ` ${opts.className}` : "";
  const compact = Boolean(opts.compact);
  const accent = "var(--peach-strong, #e07a5f)";
  const sage = "var(--sage-strong, #5a8f7b)";
  const lilac = "var(--lilac-strong, #8b7ec8)";

  const wrap = (inner, vb = "0 0 120 72") =>
    `<svg class="nts-symbol-svg${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;

  const dynText = (txt, size = 34, sub = "") => wrap(`
    <text x="60" y="${sub ? 39 : 47}" text-anchor="middle" font-family="Andika, Georgia, serif" font-size="${size}" font-weight="700" font-style="italic" fill="${accent}" letter-spacing="-0.8">${txt}</text>
    ${sub ? `<text x="60" y="60" text-anchor="middle" font-family="Andika, sans-serif" font-size="11" font-weight="700" fill="currentColor" opacity="0.68">${sub}</text>` : ""}
  `);

  const wordCard = (main, sub = "", color = "currentColor", size = 21) => wrap(`
    <rect x="10" y="13" width="100" height="46" rx="11" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.16" stroke-width="1.2"/>
    <text x="60" y="${sub ? 39 : 43}" text-anchor="middle" font-family="Andika, sans-serif" font-size="${size}" font-weight="700" font-style="italic" fill="${color}">${main}</text>
    ${sub ? `<text x="60" y="53" text-anchor="middle" font-family="Andika, sans-serif" font-size="10.2" font-weight="700" fill="currentColor" opacity="0.62">${sub}</text>` : ""}
  `);

  switch (svgKey) {
    // --- 1. DYNAMIK ---
    case "ppp":      return dynText("ppp", 32);
    case "pp":       return dynText("pp", 36);
    case "p":        return dynText("p", 40);
    case "mp":       return dynText("mp", 36);
    case "mf":       return dynText("mf", 36);
    case "f":        return dynText("f", 40);
    case "ff":       return dynText("ff", 36);
    case "fff":      return dynText("fff", 32);
    case "sfz":      return dynText("sfz", 33);
    case "fp":       return dynText("fp", 36);
    case "rfz":      return dynText("rfz", 33);
    case "subito-p": return dynText("sub. p", 24);
    case "morendo":  return wordCard("morendo", "al niente", accent, 18);
    case "cresc":
      return wrap(`
        <path d="M 18 33 L 102 20 M 18 33 L 102 46" fill="none" stroke="${accent}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        ${compact ? "" : `<text x="60" y="63" text-anchor="middle" font-family="Andika, sans-serif" font-size="12" font-weight="700" font-style="italic" fill="currentColor" opacity="0.72">cresc.</text>`}
      `);
    case "decresc":
      return wrap(`
        <path d="M 18 20 L 102 33 M 18 46 L 102 33" fill="none" stroke="${accent}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        ${compact ? "" : `<text x="60" y="63" text-anchor="middle" font-family="Andika, sans-serif" font-size="12" font-weight="700" font-style="italic" fill="currentColor" opacity="0.72">dim. / decresc.</text>`}
      `);

    // --- 2. TEMPO & CHARAKTER ---
    case "largo":       return wordCard("Largo", "40–60 BPM", sage, 21);
    case "adagio":      return wordCard("Adagio", "60–72 BPM", sage, 20);
    case "andante":     return wordCard("Andante", "76–96 BPM", sage, 19);
    case "moderato":    return wordCard("Moderato", "98–116 BPM", sage, 18);
    case "allegretto":  return wordCard("Allegretto", "112–124 BPM", sage, 17);
    case "allegro":     return wordCard("Allegro", "120–152 BPM", sage, 20);
    case "vivace":      return wordCard("Vivace", "148–172 BPM", sage, 20);
    case "presto":      return wordCard("Presto", "168–200 BPM", sage, 21);
    case "ritardando":
      return wrap(`
        <text x="60" y="34" text-anchor="middle" font-family="Andika, sans-serif" font-size="21" font-weight="700" font-style="italic" fill="${sage}">rit. / rall.</text>
        <line x1="16" y1="50" x2="104" y2="50" stroke="${sage}" stroke-width="2" stroke-dasharray="2 3 4 4 6 5" stroke-linecap="round" opacity="0.8"/>
        <circle cx="22" cy="50" r="2.2" fill="${sage}"/>
        <circle cx="38" cy="50" r="2.2" fill="${sage}"/>
        <circle cx="62" cy="50" r="2.2" fill="${sage}"/>
        <circle cx="96" cy="50" r="2.2" fill="${sage}"/>
      `);
    case "accelerando":
      return wrap(`
        <text x="60" y="34" text-anchor="middle" font-family="Andika, sans-serif" font-size="21" font-weight="700" font-style="italic" fill="${sage}">accel.</text>
        <line x1="16" y1="50" x2="104" y2="50" stroke="${sage}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <circle cx="20" cy="50" r="2.2" fill="${sage}"/>
        <circle cx="52" cy="50" r="2.2" fill="${sage}"/>
        <circle cx="76" cy="50" r="2.2" fill="${sage}"/>
        <circle cx="92" cy="50" r="2.2" fill="${sage}"/>
        <circle cx="102" cy="50" r="2.2" fill="${sage}"/>
      `);
    case "a-tempo":     return wordCard("a tempo", "♩ = ♩", sage, 20);
    case "rubato":      return wordCard("rubato", "∿ ∿", sage, 20);
    case "piu-mosso":   return wordCard("più mosso", "»", sage, 17);
    case "meno-mosso":  return wordCard("meno mosso", "«", sage, 16);
    case "fermata":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(26, 8, 16, 104, 0.28)}
        <path d="M 38 22 C 42 5, 78 5, 82 22" fill="none" stroke="${accent}" stroke-width="3.2" stroke-linecap="round"/>
        <circle cx="60" cy="18.5" r="3.1" fill="${accent}"/>
        <ellipse cx="60" cy="42" rx="6.8" ry="4.9" transform="rotate(-18 60 42)" fill="none" stroke="currentColor" stroke-width="2.1"/>
      `);
    case "breath-mark":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(24, 8, 12, 108, 0.30)}
        <path d="M 41 13 C 43 17, 42 22, 37 25" fill="none" stroke="${accent}" stroke-width="3.2" stroke-linecap="round"/>
        <circle cx="41" cy="13" r="2.4" fill="${accent}"/>
        <line x1="74" y1="29" x2="83" y2="11" stroke="${accent}" stroke-width="3.1" stroke-linecap="round"/>
        <line x1="82" y1="29" x2="91" y2="11" stroke="${accent}" stroke-width="3.1" stroke-linecap="round"/>
      `);
    case "dolce":      return wordCard("dolce", "", lilac, 22);
    case "cantabile":  return wordCard("cantabile", "", lilac, 19);
    case "maestoso":   return wordCard("maestoso", "", lilac, 19);
    case "scherzando": return wordCard("scherzando", "", lilac, 16);
    case "leggiero":   return wordCard("leggiero", "", lilac, 19);
    case "sotto-voce": return wordCard("sotto voce", "", lilac, 17);

    // --- 3. ARTIKULATION, VERZIERUNGEN & SPIELWEISEN ---
    case "staccato":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(20, 8, 12, 108, 0.30)}
        ${[36, 60, 84].map(x => `
          <ellipse cx="${x}" cy="44" rx="5.6" ry="4" transform="rotate(-18 ${x} 44)" fill="currentColor"/>
          <line x1="${x + 5.1}" y1="43" x2="${x + 5.1}" y2="17" stroke="currentColor" stroke-width="1.8"/>
          <circle cx="${x}" cy="56" r="2.8" fill="${accent}"/>
        `).join("")}
      `);
    case "staccatissimo":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(20, 8, 12, 108, 0.30)}
        ${[42, 78].map(x => `
          <ellipse cx="${x}" cy="40" rx="5.8" ry="4.2" transform="rotate(-18 ${x} 40)" fill="currentColor"/>
          <line x1="${x + 5.2}" y1="39" x2="${x + 5.2}" y2="15" stroke="currentColor" stroke-width="1.8"/>
          <polygon points="${x},50 ${x - 3.6},62 ${x + 3.6},62" fill="${accent}"/>
        `).join("")}
      `);
    case "tenuto":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(20, 8, 12, 108, 0.30)}
        ${[42, 78].map(x => `
          <ellipse cx="${x}" cy="40" rx="5.8" ry="4.2" transform="rotate(-18 ${x} 40)" fill="currentColor"/>
          <line x1="${x + 5.2}" y1="39" x2="${x + 5.2}" y2="16" stroke="currentColor" stroke-width="1.8"/>
          <line x1="${x - 7.5}" y1="54" x2="${x + 7.5}" y2="54" stroke="${accent}" stroke-width="3.1" stroke-linecap="round"/>
        `).join("")}
      `);
    case "portato":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(20, 8, 12, 108, 0.30)}
        ${[36, 60, 84].map(x => `
          <ellipse cx="${x}" cy="40" rx="5.4" ry="3.8" transform="rotate(-18 ${x} 40)" fill="currentColor"/>
          <line x1="${x + 4.9}" y1="39" x2="${x + 4.9}" y2="16" stroke="currentColor" stroke-width="1.7"/>
          <circle cx="${x}" cy="51" r="2.5" fill="${accent}"/>
        `).join("")}
        <path d="M 33 56 C 46 65, 74 65, 87 56" fill="none" stroke="${accent}" stroke-width="2.4" stroke-linecap="round"/>
      `);
    case "accent":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(20, 8, 12, 108, 0.30)}
        <ellipse cx="60" cy="40" rx="6.2" ry="4.4" transform="rotate(-18 60 40)" fill="currentColor"/>
        <line x1="65.6" y1="39" x2="65.6" y2="15" stroke="currentColor" stroke-width="1.9"/>
        <path d="M 48 51 L 72 56.5 L 48 62" fill="none" stroke="${accent}" stroke-width="3.0" stroke-linecap="round" stroke-linejoin="round"/>
      `);
    case "marcato":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(24, 8, 12, 108, 0.30)}
        <path d="M 52 18 L 60 6 L 68 18" fill="none" stroke="${accent}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        <ellipse cx="60" cy="44" rx="6.2" ry="4.4" transform="rotate(-18 60 44)" fill="currentColor"/>
        <line x1="65.6" y1="43" x2="65.6" y2="21" stroke="currentColor" stroke-width="1.9"/>
      `);
    case "legato-slur":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(22, 8, 10, 110, 0.30)}
        <ellipse cx="30" cy="46" rx="5.5" ry="3.9" transform="rotate(-18 30 46)" fill="currentColor"/>
        <line x1="35" y1="45" x2="35" y2="22" stroke="currentColor" stroke-width="1.7"/>
        <ellipse cx="60" cy="38" rx="5.5" ry="3.9" transform="rotate(-18 60 38)" fill="currentColor"/>
        <line x1="65" y1="37" x2="65" y2="16" stroke="currentColor" stroke-width="1.7"/>
        <ellipse cx="90" cy="30" rx="5.5" ry="3.9" transform="rotate(-18 90 30)" fill="currentColor"/>
        <line x1="95" y1="29" x2="95" y2="11" stroke="currentColor" stroke-width="1.7"/>
        <path d="M 28 53 C 46 66, 76 58, 92 39" fill="none" stroke="${lilac}" stroke-width="2.9" stroke-linecap="round"/>
      `);
    case "tie":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(20, 8, 10, 110, 0.30)}
        <ellipse cx="38" cy="36" rx="5.9" ry="4.2" transform="rotate(-18 38 36)" fill="none" stroke="currentColor" stroke-width="2.0"/>
        <line x1="43.5" y1="35" x2="43.5" y2="13" stroke="currentColor" stroke-width="1.8"/>
        <ellipse cx="82" cy="36" rx="5.9" ry="4.2" transform="rotate(-18 82 36)" fill="currentColor"/>
        <line x1="87.5" y1="35" x2="87.5" y2="13" stroke="currentColor" stroke-width="1.8"/>
        <path d="M 41 44 C 52 56, 68 56, 79 44" fill="none" stroke="${accent}" stroke-width="3.0" stroke-linecap="round"/>
      `);
    case "trill":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(28, 8, 12, 108, 0.28)}
        <text x="33" y="21" text-anchor="middle" font-family="Andika, Georgia, serif" font-size="19" font-weight="700" font-style="italic" fill="${lilac}">tr</text>
        <path d="M 48 16 Q 53 10, 58 16 T 68 16 T 78 16 T 88 16 T 98 16" fill="none" stroke="${lilac}" stroke-width="2.4" stroke-linecap="round"/>
        <ellipse cx="42" cy="44" rx="6.2" ry="4.4" transform="rotate(-18 42 44)" fill="none" stroke="currentColor" stroke-width="2.0"/>
        <line x1="47.8" y1="43" x2="47.8" y2="23" stroke="currentColor" stroke-width="1.8"/>
      `);
    case "mordent":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(28, 8, 12, 108, 0.28)}
        <path d="M 38 17 L 45 10 L 52 17 L 59 10 L 66 17 L 73 10 L 80 17" fill="none" stroke="${lilac}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="59" y1="5" x2="59" y2="23" stroke="${accent}" stroke-width="2.4" stroke-linecap="round"/>
        <ellipse cx="59" cy="44" rx="6.0" ry="4.3" transform="rotate(-18 59 44)" fill="currentColor"/>
        <line x1="64.6" y1="43" x2="64.6" y2="24" stroke="currentColor" stroke-width="1.8"/>
      `);
    case "turn":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(28, 8, 12, 108, 0.28)}
        <path d="M 39 17 C 39 8, 52 8, 59 14 C 66 20, 79 20, 79 11" fill="none" stroke="${lilac}" stroke-width="2.9" stroke-linecap="round"/>
        <circle cx="40.5" cy="16.5" r="2.0" fill="${lilac}"/>
        <circle cx="77.5" cy="11.5" r="2.0" fill="${lilac}"/>
        <ellipse cx="59" cy="44" rx="6.0" ry="4.3" transform="rotate(-18 59 44)" fill="currentColor"/>
        <line x1="64.6" y1="43" x2="64.6" y2="24" stroke="currentColor" stroke-width="1.8"/>
      `);
    case "grace-note":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(22, 8, 12, 108, 0.30)}
        <ellipse cx="42" cy="42" rx="4.0" ry="2.9" transform="rotate(-18 42 42)" fill="${accent}"/>
        <line x1="45.6" y1="41" x2="45.6" y2="22" stroke="${accent}" stroke-width="1.6"/>
        <path d="M 45.6 22 C 51 24, 52 29, 49 32" fill="none" stroke="${accent}" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="40" y1="29" x2="53" y2="22" stroke="${accent}" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M 44 47 C 50 53, 57 53, 63 45" fill="none" stroke="${accent}" stroke-width="1.8" stroke-linecap="round"/>
        <ellipse cx="68" cy="38" rx="6.2" ry="4.4" transform="rotate(-18 68 38)" fill="currentColor"/>
        <line x1="73.8" y1="37" x2="73.8" y2="14" stroke="currentColor" stroke-width="1.9"/>
      `);
    case "arpeggio":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(20, 8, 12, 108, 0.30)}
        <path d="M 46 53 Q 41 49, 46 45 T 46 37 T 46 29 T 46 21" fill="none" stroke="${lilac}" stroke-width="2.7" stroke-linecap="round"/>
        <ellipse cx="66" cy="52" rx="5.8" ry="4.0" transform="rotate(-18 66 52)" fill="currentColor"/>
        <ellipse cx="66" cy="44" rx="5.8" ry="4.0" transform="rotate(-18 66 44)" fill="currentColor"/>
        <ellipse cx="66" cy="36" rx="5.8" ry="4.0" transform="rotate(-18 66 36)" fill="currentColor"/>
        <line x1="71.4" y1="51" x2="71.4" y2="15" stroke="currentColor" stroke-width="1.9"/>
      `);
    case "glissando":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(20, 8, 10, 110, 0.30)}
        <ellipse cx="28" cy="52" rx="5.5" ry="3.9" transform="rotate(-18 28 52)" fill="currentColor"/>
        <ellipse cx="92" cy="24" rx="5.5" ry="3.9" transform="rotate(-18 92 24)" fill="currentColor"/>
        <path d="M 38 48 Q 43 42, 49 43 T 60 38 T 71 33 T 82 28" fill="none" stroke="${lilac}" stroke-width="2.5" stroke-linecap="round"/>
        <text x="59" y="25" text-anchor="middle" font-family="Andika, sans-serif" font-size="10.5" font-weight="700" font-style="italic" fill="${lilac}" transform="rotate(-23 59 25)">gliss.</text>
      `);
    case "tremolo":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(20, 8, 12, 108, 0.30)}
        <ellipse cx="58" cy="50" rx="6.2" ry="4.4" transform="rotate(-18 58 50)" fill="none" stroke="currentColor" stroke-width="2.0"/>
        <line x1="63.8" y1="49" x2="63.8" y2="14" stroke="currentColor" stroke-width="1.9"/>
        <line x1="55" y1="24" x2="73" y2="18" stroke="${accent}" stroke-width="2.8" stroke-linecap="round"/>
        <line x1="55" y1="30" x2="73" y2="24" stroke="${accent}" stroke-width="2.8" stroke-linecap="round"/>
        <line x1="55" y1="36" x2="73" y2="30" stroke="${accent}" stroke-width="2.8" stroke-linecap="round"/>
      `);
    case "octave-8va":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(28, 8, 12, 108, 0.28)}
        <text x="27" y="19" text-anchor="middle" font-family="Andika, sans-serif" font-size="14" font-weight="700" font-style="italic" fill="${lilac}">8va</text>
        <path d="M 43 14 H 102 V 22" fill="none" stroke="${lilac}" stroke-width="2.2" stroke-dasharray="4 3" stroke-linecap="round"/>
        <ellipse cx="56" cy="40" rx="5.5" ry="3.9" transform="rotate(-18 56 40)" fill="currentColor"/>
        <ellipse cx="84" cy="36" rx="5.5" ry="3.9" transform="rotate(-18 84 36)" fill="currentColor"/>
      `);
    case "octave-8vb":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(14, 8, 12, 108, 0.28)}
        <ellipse cx="56" cy="34" rx="5.5" ry="3.9" transform="rotate(-18 56 34)" fill="currentColor"/>
        <ellipse cx="84" cy="38" rx="5.5" ry="3.9" transform="rotate(-18 84 38)" fill="currentColor"/>
        <text x="27" y="62" text-anchor="middle" font-family="Andika, sans-serif" font-size="14" font-weight="700" font-style="italic" fill="${lilac}">8vb</text>
        <path d="M 43 58 H 102 V 50" fill="none" stroke="${lilac}" stroke-width="2.2" stroke-dasharray="4 3" stroke-linecap="round"/>
      `);
    case "pedal":
      return wrap(`
        <text x="34" y="45" text-anchor="middle" font-family="Andika, Georgia, serif" font-size="22" font-weight="700" font-style="italic" fill="${lilac}">Ped.</text>
        <line x1="58" y1="40" x2="77" y2="40" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 3" opacity="0.5"/>
        <g transform="translate(92 38)" stroke="${accent}" stroke-width="2.4" stroke-linecap="round">
          <line x1="0" y1="-8" x2="0" y2="8"/>
          <line x1="-8" y1="0" x2="8" y2="0"/>
          <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5"/>
          <line x1="5.5" y1="-5.5" x2="-5.5" y2="5.5"/>
        </g>
      `);
    case "pizzicato":   return wordCard("pizz. / arco", "", lilac, 17);
    case "con-sordino": return wordCard("con sord.", "senza sord.", lilac, 17);
    case "tutti-solo":  return wordCard("tutti / solo", "div. / unis.", lilac, 17);
    case "attacca":     return wordCard("attacca", "→", lilac, 20);
    case "simile":      return wordCard("simile", "sim.", lilac, 20);

    // --- 4. ABLAUF, FORM & SPRUNGZEICHEN ---
    case "repeat-signs":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(18, 9, 10, 110, 0.34)}
        <rect x="20" y="18" width="4.5" height="36" fill="${accent}"/>
        <line x1="28.5" y1="18" x2="28.5" y2="54" stroke="${accent}" stroke-width="1.8"/>
        <circle cx="35" cy="31.5" r="2.6" fill="${accent}"/>
        <circle cx="35" cy="40.5" r="2.6" fill="${accent}"/>
        <circle cx="85" cy="31.5" r="2.6" fill="${accent}"/>
        <circle cx="85" cy="40.5" r="2.6" fill="${accent}"/>
        <line x1="91.5" y1="18" x2="91.5" y2="54" stroke="${accent}" stroke-width="1.8"/>
        <rect x="95.5" y="18" width="4.5" height="36" fill="${accent}"/>
      `);
    case "volta-brackets":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(30, 8, 8, 112, 0.30)}
        <path d="M 14 24 V 11 H 58 V 24" fill="none" stroke="${accent}" stroke-width="2.2"/>
        <text x="23" y="22" font-family="Andika, sans-serif" font-size="11.5" font-weight="700" fill="${accent}">1.</text>
        <path d="M 63 24 V 11 H 108" fill="none" stroke="${sage}" stroke-width="2.2"/>
        <text x="72" y="22" font-family="Andika, sans-serif" font-size="11.5" font-weight="700" fill="${sage}">2.</text>
        <line x1="56" y1="30" x2="56" y2="62" stroke="${accent}" stroke-width="1.6"/>
        <rect x="58.8" y="30" width="3.4" height="32" fill="${accent}"/>
        <circle cx="51" cy="42" r="2.0" fill="${accent}"/>
        <circle cx="51" cy="50" r="2.0" fill="${accent}"/>
      `);
    case "double-barline":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(18, 9, 12, 108, 0.34)}
        <line x1="56" y1="18" x2="56" y2="54" stroke="${accent}" stroke-width="2.2"/>
        <line x1="63" y1="18" x2="63" y2="54" stroke="${accent}" stroke-width="2.2"/>
      `);
    case "final-barline":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(18, 9, 12, 104, 0.34)}
        <line x1="94" y1="18" x2="94" y2="54" stroke="${accent}" stroke-width="2.0"/>
        <rect x="99" y="18" width="5.5" height="36" fill="${accent}"/>
      `);
    case "sim-bar":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(18, 9, 12, 108, 0.34)}
        <line x1="20" y1="18" x2="20" y2="54" stroke="currentColor" stroke-width="1.4" opacity="0.5"/>
        <line x1="100" y1="18" x2="100" y2="54" stroke="currentColor" stroke-width="1.4" opacity="0.5"/>
        <line x1="48" y1="49" x2="72" y2="23" stroke="${accent}" stroke-width="4.2" stroke-linecap="round"/>
        <circle cx="50" cy="29" r="3.4" fill="${accent}"/>
        <circle cx="70" cy="43" r="3.4" fill="${accent}"/>
      `);
    case "multi-rest":
      return wrap(`
        ${buildNotationMiniStaffLinesSVG(22, 8, 12, 108, 0.32)}
        <text x="60" y="16" text-anchor="middle" font-family="Andika, sans-serif" font-size="14" font-weight="700" fill="${accent}">8</text>
        <line x1="28" y1="28" x2="28" y2="48" stroke="${accent}" stroke-width="2.4"/>
        <rect x="28" y="34" width="64" height="8" fill="${accent}"/>
        <line x1="92" y1="28" x2="92" y2="48" stroke="${accent}" stroke-width="2.4"/>
      `);
    case "gp-tacet":    return wordCard("G.P.", "tacet", accent, 22);
    case "da-capo":     return wordCard("D.C.", "Da Capo", accent, 24);
    case "dal-segno":   return wordCard("D.S.", "Dal Segno", accent, 24);
    case "segno":       return wrap(buildSegnoGlyphInner(60, 36, 1.48, accent));
    case "coda":        return wrap(buildCodaGlyphInner(60, 36, 1.45, accent));
    case "fine":        return wordCard("Fine", "", accent, 23);
    case "dc-al-fine":  return wordCard("D.C. al Fine", "", accent, 16);
    case "ds-al-coda":
      return wrap(`
        <rect x="8" y="13" width="104" height="46" rx="11" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.16" stroke-width="1.2"/>
        ${buildSegnoGlyphInner(24, 36, 0.68, accent)}
        <text x="62" y="41" text-anchor="middle" font-family="Andika, sans-serif" font-size="13.5" font-weight="700" font-style="italic" fill="currentColor">D.S. al</text>
        ${buildCodaGlyphInner(97, 36, 0.65, accent)}
      `);
    case "dc-al-coda":
      return wrap(`
        <rect x="8" y="13" width="104" height="46" rx="11" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.16" stroke-width="1.2"/>
        <text x="48" y="41" text-anchor="middle" font-family="Andika, sans-serif" font-size="14.5" font-weight="700" font-style="italic" fill="${accent}">D.C. al</text>
        ${buildCodaGlyphInner(92, 36, 0.68, accent)}
      `);
    default:
      return wordCard(svgKey || "?", "", accent, 18);
  }
}

// =========================================================================
// SCHEMATISCHE 4-TAKT-PARTITUR FÜR ABLAUF- & SPRUNGZEICHEN
// =========================================================================

function buildNotationFlowDiagramSVG(scenarioId, opts = {}) {
  const accent = "var(--peach-strong, #e07a5f)";
  const sage = "var(--sage-strong, #5a8f7b)";
  const lilac = "var(--lilac-strong, #8b7ec8)";

  const drawStaff = (x1, x2) => {
    let s = "";
    for (let i = 0; i < 5; i++) {
      const y = 40 + i * 7.5;
      s += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="currentColor" stroke-width="1" opacity="0.26"/>`;
    }
    return s;
  };

  const drawBox = (x, w, label, tint = "currentColor", tintOpacity = 0.08) => `
    <rect x="${x + 6}" y="42" width="${w - 12}" height="26" rx="7" fill="${tint}" fill-opacity="${tintOpacity}" stroke="${tint}" stroke-opacity="0.34" stroke-width="1.2"/>
    <text x="${x + w / 2}" y="60" text-anchor="middle" font-family="Andika, sans-serif" font-size="15.5" font-weight="700" fill="currentColor">${label}</text>
  `;

  const barline = (x) => `<line x1="${x}" y1="40" x2="${x}" y2="70" stroke="currentColor" stroke-width="1.35" opacity="0.55"/>`;
  const finalBar = (x) => `
    <line x1="${x - 4}" y1="40" x2="${x - 4}" y2="70" stroke="currentColor" stroke-width="1.5" opacity="0.78"/>
    <rect x="${x - 1}" y="40" width="4" height="30" fill="currentColor" opacity="0.82"/>
  `;
  const repeatOpen = (x) => `
    <rect x="${x}" y="40" width="3.5" height="30" fill="${accent}"/>
    <line x1="${x + 6.5}" y1="40" x2="${x + 6.5}" y2="70" stroke="${accent}" stroke-width="1.5"/>
    <circle cx="${x + 11}" cy="51" r="2.1" fill="${accent}"/>
    <circle cx="${x + 11}" cy="59" r="2.1" fill="${accent}"/>
  `;
  const repeatClose = (x) => `
    <circle cx="${x - 11}" cy="51" r="2.1" fill="${accent}"/>
    <circle cx="${x - 11}" cy="59" r="2.1" fill="${accent}"/>
    <line x1="${x - 6.5}" y1="40" x2="${x - 6.5}" y2="70" stroke="${accent}" stroke-width="1.5"/>
    <rect x="${x - 3.5}" y="40" width="3.5" height="30" fill="${accent}"/>
  `;

  let body = "";

  if (scenarioId === "flow-repeat") {
    body = `
      ${drawStaff(14, 346)}
      ${barline(14)}
      ${drawBox(14, 78, "A")}
      ${repeatOpen(94)}
      ${drawBox(104, 74, "B", accent, 0.12)}
      ${barline(180)}
      ${drawBox(180, 74, "C", accent, 0.12)}
      ${repeatClose(262)}
      ${drawBox(264, 78, "D")}
      ${finalBar(344)}
    `;
  } else if (scenarioId === "flow-volta") {
    body = `
      ${drawStaff(14, 346)}
      ${repeatOpen(14)}
      ${drawBox(24, 102, "A", sage, 0.12)}
      ${barline(128)}
      <path d="M 131 32 V 16 H 232 V 32" fill="none" stroke="${accent}" stroke-width="2.1"/>
      <text x="140" y="29" font-family="Andika, sans-serif" font-size="11.5" font-weight="700" fill="${accent}">1.</text>
      ${drawBox(130, 94, "B", accent, 0.12)}
      ${repeatClose(234)}
      <path d="M 239 32 V 16 H 344" fill="none" stroke="${lilac}" stroke-width="2.1"/>
      <text x="248" y="29" font-family="Andika, sans-serif" font-size="11.5" font-weight="700" fill="${lilac}">2.</text>
      ${drawBox(238, 102, "C", lilac, 0.12)}
      ${finalBar(344)}
    `;
  } else if (scenarioId === "flow-dc-fine") {
    body = `
      ${drawStaff(14, 346)}
      ${barline(14)}
      ${drawBox(14, 108, "A", sage, 0.10)}
      ${barline(124)}
      ${drawBox(124, 108, "B", sage, 0.10)}
      <text x="226" y="29" text-anchor="end" font-family="Andika, sans-serif" font-size="12.5" font-weight="700" font-style="italic" fill="${sage}">Fine</text>
      ${barline(232)}
      ${drawBox(234, 108, "C", accent, 0.10)}
      <text x="342" y="29" text-anchor="end" font-family="Andika, sans-serif" font-size="12" font-weight="700" font-style="italic" fill="${accent}">D.C. al Fine</text>
      ${finalBar(344)}
    `;
  } else if (scenarioId === "flow-ds-fine") {
    body = `
      ${drawStaff(12, 348)}
      ${barline(12)}
      ${drawBox(12, 78, "A")}
      ${barline(92)}
      ${buildSegnoGlyphInner(102, 22, 0.65, accent)}
      ${drawBox(94, 80, "B", sage, 0.11)}
      ${barline(176)}
      ${drawBox(176, 80, "C", sage, 0.11)}
      <text x="252" y="28" text-anchor="end" font-family="Andika, sans-serif" font-size="12" font-weight="700" font-style="italic" fill="${sage}">Fine</text>
      ${barline(258)}
      ${drawBox(260, 84, "D", accent, 0.10)}
      <text x="346" y="28" text-anchor="end" font-family="Andika, sans-serif" font-size="11.5" font-weight="700" font-style="italic" fill="${accent}">D.S. al Fine</text>
      ${finalBar(346)}
    `;
  } else if (scenarioId === "flow-ds-coda") {
    body = `
      ${drawStaff(10, 250)}
      ${drawStaff(268, 350)}
      ${barline(10)}
      ${drawBox(10, 68, "A")}
      ${barline(80)}
      ${buildSegnoGlyphInner(90, 22, 0.62, accent)}
      ${drawBox(82, 82, "B", sage, 0.11)}
      <text x="148" y="27" text-anchor="end" font-family="Andika, sans-serif" font-size="10.2" font-weight="700" font-style="italic" fill="${lilac}">al</text>
      ${buildCodaGlyphInner(158, 22, 0.56, lilac)}
      ${barline(166)}
      ${drawBox(166, 82, "C", accent, 0.10)}
      <text x="248" y="27" text-anchor="end" font-family="Andika, sans-serif" font-size="10.8" font-weight="700" font-style="italic" fill="${accent}">D.S. al Coda</text>
      ${barline(250)}
      ${buildCodaGlyphInner(282, 22, 0.64, lilac)}
      <text x="296" y="26" font-family="Andika, sans-serif" font-size="11" font-weight="700" fill="${lilac}">Coda</text>
      ${barline(268)}
      ${drawBox(270, 76, "D", lilac, 0.14)}
      ${finalBar(348)}
    `;
  } else {
    // flow-dc-coda
    body = `
      ${drawStaff(10, 250)}
      ${drawStaff(268, 350)}
      ${barline(10)}
      ${drawBox(10, 82, "A", sage, 0.11)}
      <text x="74" y="27" text-anchor="end" font-family="Andika, sans-serif" font-size="10.2" font-weight="700" font-style="italic" fill="${lilac}">al</text>
      ${buildCodaGlyphInner(84, 22, 0.56, lilac)}
      ${barline(94)}
      ${drawBox(94, 76, "B")}
      ${barline(172)}
      ${drawBox(172, 76, "C", accent, 0.10)}
      <text x="248" y="27" text-anchor="end" font-family="Andika, sans-serif" font-size="10.8" font-weight="700" font-style="italic" fill="${accent}">D.C. al Coda</text>
      ${barline(250)}
      ${buildCodaGlyphInner(282, 22, 0.64, lilac)}
      <text x="296" y="26" font-family="Andika, sans-serif" font-size="11" font-weight="700" fill="${lilac}">Coda</text>
      ${barline(268)}
      ${drawBox(270, 76, "D", lilac, 0.14)}
      ${finalBar(348)}
    `;
  }

  const cls = opts.className ? ` ${opts.className}` : "";
  return `<svg class="notation-flow-svg${cls}" viewBox="0 0 360 82" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
}

// =========================================================================
// HÖRBEISPIELE NUR FÜR DAS WISSENSMODUL (WebAudio, iOS-sicher)
// =========================================================================

function playNotationTermDemo(demoId) {
  if (!demoId || typeof audioEngine === "undefined") return;
  if (typeof prepareAudioNonBlocking === "function") {
    prepareAudioNonBlocking();
  }
  const runDemo = () => {
    if (!audioEngine?.isInitialized || !audioEngine?.rawCtx) return;
    audioEngine.stopPlayback();
    const base = (audioEngine.rawCtx.currentTime || 0) + 0.05;
    const playSeq = (events) => {
      events.forEach(ev => {
        audioEngine.playStep(
          Array.isArray(ev.notes) ? ev.notes : [ev.notes],
          ev.dur || 0.45,
          ev.bass || null,
          ev.mode || "interval",
          {
            atTime: base + (ev.t || 0),
            velocity: ev.vel !== undefined ? ev.vel : 0.72,
            legato: ev.legato !== undefined ? ev.legato : false
          }
        );
      });
    };

    const playTempoPhrase = (bpm) => {
      const step = 60 / bpm;
      const melody = ["C4", "D4", "E4", "G4", "C5"];
      playSeq(melody.map((n, i) => ({
        notes: n,
        t: i * step,
        dur: i === melody.length - 1 ? step * 1.45 : step * 0.92,
        vel: i === 0 || i === melody.length - 1 ? 0.78 : 0.66,
        legato: "melody"
      })));
    };

    switch (demoId) {
      // --- Dynamik ---
      case "dyn-scale": {
        const vels = [0.14, 0.28, 0.44, 0.62, 0.82, 1.0];
        playSeq(vels.map((v, i) => ({
          notes: ["C4", "E4", "G4"],
          t: i * 0.52,
          dur: 0.46,
          vel: v
        })));
        break;
      }
      case "dyn-ppp": playSeq([{ notes: ["C4", "E4", "G4"], t: 0, dur: 1.2, vel: 0.11 }]); break;
      case "dyn-pp":  playSeq([{ notes: ["C4", "E4", "G4"], t: 0, dur: 1.15, vel: 0.18 }]); break;
      case "dyn-p":   playSeq([{ notes: ["C4", "E4", "G4"], t: 0, dur: 1.1, vel: 0.30 }]); break;
      case "dyn-mp":  playSeq([{ notes: ["C4", "E4", "G4"], t: 0, dur: 1.1, vel: 0.46 }]); break;
      case "dyn-mf":  playSeq([{ notes: ["C4", "E4", "G4"], t: 0, dur: 1.1, vel: 0.64 }]); break;
      case "dyn-f":   playSeq([{ notes: ["C4", "E4", "G4"], t: 0, dur: 1.1, vel: 0.84 }]); break;
      case "dyn-ff":  playSeq([{ notes: ["C4", "E4", "G4", "C5"], t: 0, dur: 1.2, vel: 0.96 }]); break;
      case "dyn-fff": playSeq([{ notes: ["C3", "C4", "E4", "G4", "C5"], t: 0, dur: 1.3, vel: 1.0 }]); break;
      case "dyn-cresc": {
        const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
        playSeq(notes.map((n, i) => ({
          notes: n, t: i * 0.28, dur: 0.32, vel: 0.16 + (i / (notes.length - 1)) * 0.84, legato: "melody"
        })));
        break;
      }
      case "dyn-decresc": {
        const notes = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];
        playSeq(notes.map((n, i) => ({
          notes: n, t: i * 0.28, dur: 0.32, vel: 1.0 - (i / (notes.length - 1)) * 0.84, legato: "melody"
        })));
        break;
      }
      case "dyn-sfz":
        playSeq([
          { notes: "C4", t: 0.0, dur: 0.34, vel: 0.34 },
          { notes: "D4", t: 0.38, dur: 0.34, vel: 0.34 },
          { notes: ["E4", "G4", "C5"], t: 0.76, dur: 0.55, vel: 1.0 },
          { notes: "D4", t: 1.36, dur: 0.34, vel: 0.34 },
          { notes: "C4", t: 1.74, dur: 0.55, vel: 0.34 }
        ]);
        break;
      case "dyn-fp":
        playSeq([
          { notes: ["C4", "E4", "G4"], t: 0.0, dur: 0.36, vel: 0.98 },
          { notes: "E4", t: 0.42, dur: 0.35, vel: 0.24, legato: "melody" },
          { notes: "F4", t: 0.78, dur: 0.35, vel: 0.24, legato: "melody" },
          { notes: "G4", t: 1.14, dur: 0.65, vel: 0.24, legato: "melody" }
        ]);
        break;
      case "dyn-subito-p":
        playSeq([
          { notes: ["C4", "E4", "G4"], t: 0.0, dur: 0.34, vel: 0.92 },
          { notes: ["D4", "F4", "A4"], t: 0.38, dur: 0.34, vel: 0.95 },
          { notes: ["E4", "G4", "C5"], t: 0.76, dur: 0.42, vel: 0.98 },
          { notes: "G4", t: 1.28, dur: 0.42, vel: 0.18, legato: "melody" },
          { notes: "E4", t: 1.72, dur: 0.42, vel: 0.17, legato: "melody" },
          { notes: "C4", t: 2.16, dur: 0.72, vel: 0.16, legato: "melody" }
        ]);
        break;
      case "dyn-morendo": {
        const seq = [
          { notes: "G4", t: 0.0,  dur: 0.46, vel: 0.52 },
          { notes: "F4", t: 0.48, dur: 0.52, vel: 0.38 },
          { notes: "E4", t: 1.04, dur: 0.62, vel: 0.26 },
          { notes: "D4", t: 1.72, dur: 0.74, vel: 0.17 },
          { notes: "C4", t: 2.52, dur: 1.05, vel: 0.11 }
        ];
        playSeq(seq.map(s => ({ ...s, legato: "melody" })));
        break;
      }

      // --- Tempo & Agogik ---
      case "tempo-largo":    playTempoPhrase(52); break;
      case "tempo-adagio":   playTempoPhrase(66); break;
      case "tempo-andante":  playTempoPhrase(86); break;
      case "tempo-moderato": playTempoPhrase(108); break;
      case "tempo-allegro":  playTempoPhrase(138); break;
      case "tempo-presto":   playTempoPhrase(182); break;
      case "tempo-rit":
        playSeq([
          { notes: "C4", t: 0.00, dur: 0.30, vel: 0.72, legato: "melody" },
          { notes: "D4", t: 0.30, dur: 0.34, vel: 0.70, legato: "melody" },
          { notes: "E4", t: 0.64, dur: 0.42, vel: 0.68, legato: "melody" },
          { notes: "F4", t: 1.06, dur: 0.54, vel: 0.64, legato: "melody" },
          { notes: "G4", t: 1.60, dur: 0.70, vel: 0.60, legato: "melody" },
          { notes: "C5", t: 2.30, dur: 1.10, vel: 0.62, legato: "melody" }
        ]);
        break;
      case "tempo-accel":
        playSeq([
          { notes: "C4", t: 0.00, dur: 0.62, vel: 0.62, legato: "melody" },
          { notes: "D4", t: 0.62, dur: 0.50, vel: 0.66, legato: "melody" },
          { notes: "E4", t: 1.12, dur: 0.40, vel: 0.72, legato: "melody" },
          { notes: "F4", t: 1.52, dur: 0.32, vel: 0.76, legato: "melody" },
          { notes: "G4", t: 1.84, dur: 0.25, vel: 0.82, legato: "melody" },
          { notes: "A4", t: 2.09, dur: 0.20, vel: 0.86, legato: "melody" },
          { notes: "C5", t: 2.29, dur: 0.65, vel: 0.92, legato: "melody" }
        ]);
        break;
      case "tempo-fermata":
        playSeq([
          { notes: "C4", t: 0.00, dur: 0.38, vel: 0.70, legato: "melody" },
          { notes: "E4", t: 0.40, dur: 0.38, vel: 0.72, legato: "melody" },
          { notes: "G4", t: 0.80, dur: 1.65, vel: 0.82, legato: "melody" },
          { notes: "C5", t: 2.55, dur: 0.85, vel: 0.76, legato: "melody" }
        ]);
        break;

      // --- Artikulation & Verzierungen ---
      case "art-staccato":
        playSeq(["C4", "D4", "E4", "F4", "G4"].map((n, i) => ({
          notes: n, t: i * 0.38, dur: 0.14, vel: 0.74, legato: false
        })));
        break;
      case "art-staccatissimo":
        playSeq(["C4", "E4", "G4", "C5"].map((n, i) => ({
          notes: n, t: i * 0.34, dur: 0.14, vel: 0.86, legato: false
        })));
        break;
      case "art-tenuto":
        playSeq(["C4", "D4", "E4", "G4"].map((n, i) => ({
          notes: n, t: i * 0.56, dur: 0.54, vel: 0.78, legato: "melody"
        })));
        break;
      case "art-accent":
        playSeq([
          { notes: "C4", t: 0.00, dur: 0.36, vel: 1.00 },
          { notes: "D4", t: 0.40, dur: 0.36, vel: 0.38 },
          { notes: "E4", t: 0.80, dur: 0.36, vel: 0.38 },
          { notes: "G4", t: 1.20, dur: 0.42, vel: 1.00 },
          { notes: "F4", t: 1.66, dur: 0.36, vel: 0.38 },
          { notes: "E4", t: 2.06, dur: 0.52, vel: 0.42 }
        ]);
        break;
      case "art-marcato":
        playSeq([
          { notes: "C4", t: 0.00, dur: 0.24, vel: 1.00 },
          { notes: "E4", t: 0.36, dur: 0.24, vel: 1.00 },
          { notes: "G4", t: 0.72, dur: 0.24, vel: 1.00 },
          { notes: "C5", t: 1.08, dur: 0.55, vel: 1.00 }
        ]);
        break;
      case "art-legato":
        playSeq(["C4", "D4", "E4", "F4", "G4"].map((n, i) => ({
          notes: n, t: i * 0.42, dur: 0.52, vel: 0.68, legato: "melody"
        })));
        break;
      case "art-tie":
        // Ein langer gebundener Ton (2+2 Schläge = 1 durchklingender Ton)
        playSeq([
          { notes: "C4", t: 0.00, dur: 0.42, vel: 0.66, legato: "melody" },
          { notes: "E4", t: 0.44, dur: 1.65, vel: 0.76, legato: "melody" },
          { notes: "G4", t: 2.15, dur: 0.65, vel: 0.68, legato: "melody" }
        ]);
        break;
      case "orn-trill": {
        const trillNotes = ["E4", "F4", "E4", "F4", "E4", "F4", "E4", "F4", "E4", "D4", "E4"];
        playSeq(trillNotes.map((n, i) => ({
          notes: n,
          t: i * 0.11,
          dur: i === trillNotes.length - 1 ? 0.75 : 0.14,
          vel: i === trillNotes.length - 1 ? 0.78 : 0.68,
          legato: "melody"
        })));
        break;
      }
      case "orn-mordent":
        playSeq([
          { notes: "G4",  t: 0.00, dur: 0.14, vel: 0.76, legato: "melody" },
          { notes: "F#4", t: 0.11, dur: 0.14, vel: 0.66, legato: "melody" },
          { notes: "G4",  t: 0.22, dur: 0.95, vel: 0.78, legato: "melody" }
        ]);
        break;
      case "orn-turn":
        playSeq([
          { notes: "A4",  t: 0.00, dur: 0.16, vel: 0.72, legato: "melody" },
          { notes: "G4",  t: 0.14, dur: 0.16, vel: 0.72, legato: "melody" },
          { notes: "F#4", t: 0.28, dur: 0.16, vel: 0.70, legato: "melody" },
          { notes: "G4",  t: 0.42, dur: 0.95, vel: 0.80, legato: "melody" }
        ]);
        break;
      case "orn-grace":
        playSeq([
          { notes: "F#4", t: 0.00, dur: 0.14, vel: 0.62, legato: "melody" },
          { notes: "G4",  t: 0.09, dur: 0.95, vel: 0.84, legato: "melody" }
        ]);
        break;
      case "orn-arpeggio":
        playSeq([
          { notes: "C4", t: 0.00, dur: 1.25, vel: 0.72 },
          { notes: "E4", t: 0.09, dur: 1.16, vel: 0.74 },
          { notes: "G4", t: 0.18, dur: 1.07, vel: 0.76 },
          { notes: "C5", t: 0.27, dur: 0.98, vel: 0.82 }
        ]);
        break;
      case "orn-glissando": {
        const run = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
        playSeq(run.map((n, i) => ({
          notes: n, t: i * 0.075, dur: i === run.length - 1 ? 0.85 : 0.18, vel: 0.64 + i * 0.03, legato: "melody"
        })));
        break;
      }
      case "orn-tremolo": {
        const notes = Array.from({ length: 12 }, (_, i) => (i % 2 === 0 ? "E4" : "G4"));
        playSeq(notes.map((n, i) => ({
          notes: n, t: i * 0.095, dur: 0.14, vel: 0.66
        })));
        break;
      }
      case "play-8va":
        playSeq([
          { notes: "C4", t: 0.00, dur: 0.30, vel: 0.68, legato: "melody" },
          { notes: "E4", t: 0.30, dur: 0.30, vel: 0.68, legato: "melody" },
          { notes: "G4", t: 0.60, dur: 0.42, vel: 0.72, legato: "melody" },
          { notes: "C5", t: 1.22, dur: 0.30, vel: 0.76, legato: "melody" },
          { notes: "E5", t: 1.52, dur: 0.30, vel: 0.76, legato: "melody" },
          { notes: "G5", t: 1.82, dur: 0.60, vel: 0.80, legato: "melody" }
        ]);
        break;
      case "play-8vb":
        playSeq([
          { notes: "C4", t: 0.00, dur: 0.30, vel: 0.72, legato: "melody" },
          { notes: "E4", t: 0.30, dur: 0.30, vel: 0.72, legato: "melody" },
          { notes: "G4", t: 0.60, dur: 0.42, vel: 0.74, legato: "melody" },
          { notes: "C3", t: 1.22, dur: 0.30, vel: 0.76, legato: "melody" },
          { notes: "E3", t: 1.52, dur: 0.30, vel: 0.76, legato: "melody" },
          { notes: "G3", t: 1.82, dur: 0.60, vel: 0.80, legato: "melody" }
        ]);
        break;
      default:
        break;
    }
  };

  if (audioEngine.isInitialized) {
    runDemo();
  } else if (typeof ensureAudioReady === "function") {
    ensureAudioReady().then(runDemo).catch(() => {});
  }
}

// =========================================================================
// AUSFÜHRLICHES WISSENSMODUL: VORTRAGSZEICHEN, BEGRIFFE & SYMBOLE
// =========================================================================

let _ntsKnowledgeFilter = "all";
let _ntsKnowledgeSearch = "";

function renderNotationSymbolsReferenceHTML(filterGroup = _ntsKnowledgeFilter, searchQuery = _ntsKnowledgeSearch) {
  const activeFilter = ["all", "dynamics", "tempo", "articulation", "navigation"].includes(filterGroup) ? filterGroup : "all";
  const query = String(searchQuery || "").trim().toLowerCase();
  const hasSearch = query.length > 0;

  const esc = typeof escapeHtml === "function" ? escapeHtml : (s => String(s || ""));
  const listenLabel = getNotationRefUIText("listenBtn");

  const matchesItem = (entry) => {
    if (activeFilter !== "all" && entry.group !== activeFilter) return false;
    if (!hasSearch) return true;
    const t = getNotationTermText(entry.id);
    const haystack = `${entry.term} ${entry.abbr} ${entry.id} ${t.short} ${t.desc} ${t.tip}`.toLowerCase();
    return haystack.includes(query);
  };

  const renderTermCard = (entry) => {
    const t = getNotationTermText(entry.id);
    return `
      <div class="nts-card">
        <div class="nts-card-top">
          <div class="nts-svg-box" dir="ltr">${buildNotationSymbolSVG(entry.svgKey)}</div>
          <div class="nts-card-head">
            <h5 class="nts-card-term">${esc(entry.term)}</h5>
            <div class="nts-card-meta-row">
              <span class="nts-abbr-chip" dir="ltr">${esc(entry.abbr)}</span>
              ${entry.bpmHint ? `<span class="nts-bpm-chip" dir="ltr">${esc(entry.bpmHint)}</span>` : ""}
            </div>
            <p class="nts-card-short">${esc(t.short)}</p>
          </div>
        </div>
        <p class="nts-card-desc">${esc(t.desc)}</p>
        ${t.tip ? `<p class="nts-card-tip">${esc(t.tip)}</p>` : ""}
        ${entry.audioDemo ? `
          <div class="nts-card-actions">
            <button type="button" class="btn-tool nts-demo-btn" data-nts-demo="${esc(entry.audioDemo)}">${esc(listenLabel)}</button>
          </div>
        ` : ""}
      </div>
    `;
  };

  const showDynamicsLadder = !hasSearch && (activeFilter === "all" || activeFilter === "dynamics");
  const showTempoSpectrum = !hasSearch && (activeFilter === "all" || activeFilter === "tempo");
  const showFlowGuide = !hasSearch && (activeFilter === "all" || activeFilter === "navigation");

  const dynLadderSteps = [
    { id: "ppp", h: 18, demo: "dyn-ppp" },
    { id: "pp",  h: 26, demo: "dyn-pp" },
    { id: "p",   h: 36, demo: "dyn-p" },
    { id: "mp",  h: 48, demo: "dyn-mp" },
    { id: "mf",  h: 62, demo: "dyn-mf" },
    { id: "f",   h: 76, demo: "dyn-f" },
    { id: "ff",  h: 88, demo: "dyn-ff" },
    { id: "fff", h: 100, demo: "dyn-fff" }
  ];

  const tempoSpectrumSteps = [
    { id: "largo",    label: "Largo",    bpm: "40–60",   demo: "tempo-largo" },
    { id: "adagio",   label: "Adagio",   bpm: "60–72",   demo: "tempo-adagio" },
    { id: "andante",  label: "Andante",  bpm: "76–96",   demo: "tempo-andante" },
    { id: "moderato", label: "Moderato", bpm: "98–116",  demo: "tempo-moderato" },
    { id: "allegro",  label: "Allegro",  bpm: "120–152", demo: "tempo-allegro" },
    { id: "presto",   label: "Presto",   bpm: "168–200", demo: "tempo-presto" }
  ];

  const groupedSectionsHtml = NOTATION_TERMS_GROUPS.map(grp => {
    const items = NOTATION_TERMS_CATALOG.filter(e => e.group === grp.id && matchesItem(e));
    if (items.length === 0) return "";
    return `
      <article class="knowledge-card nts-group-article">
        <div class="k-card-top-row">
          <span class="k-card-tag ${grp.tagClass}">${esc(getNotationRefUIText(grp.uiKey))}</span>
          <span class="k-ratio-chip">${items.length}</span>
        </div>
        <div class="nts-grid">
          ${items.map(renderTermCard).join("")}
        </div>
      </article>
    `;
  }).join("");

  const hasAnyMatches = groupedSectionsHtml.trim().length > 0;

  return `
    <article class="knowledge-card nts-intro-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">${esc(getNotationRefUIText("introTag"))}</span>
        <span class="k-ratio-chip">${esc(getNotationRefUIText("introChip"))}</span>
      </div>
      <h4>${esc(getNotationRefUIText("introTitle"))}</h4>
      <p>${esc(getNotationRefUIText("introBody"))}</p>
      <div class="nts-intro-cta-row">
        <button type="button" class="btn-primary-action nts-cta-btn" data-nts-open-practice="1">${esc(getNotationRefUIText("practiceCta"))}</button>
        <button type="button" class="btn-tool nts-crosslink-btn" data-nts-open-ref="notation">${esc(getNotationRefUIText("backToClefsLink"))}</button>
      </div>
    </article>

    <div class="nts-toolbar">
      <div class="nts-filter-row" role="tablist">
        <button type="button" class="k-filter-pill${activeFilter === "all" ? " active" : ""}" data-nts-filter="all">${esc(getNotationRefUIText("filterAll"))}</button>
        ${NOTATION_TERMS_GROUPS.map(grp => `
          <button type="button" class="k-filter-pill${activeFilter === grp.id ? " active" : ""}" data-nts-filter="${grp.id}">${esc(getNotationRefUIText(grp.filterKey))}</button>
        `).join("")}
      </div>
      <div class="nts-search-wrap">
        <input type="search" id="ntsKnowledgeSearchInput" class="nts-search-input" aria-label="${esc(getNotationRefUIText("searchPlaceholder"))}" value="${esc(searchQuery || "")}" placeholder="${esc(getNotationRefUIText("searchPlaceholder"))}" autocomplete="off" spellcheck="false">
        ${hasSearch ? `<button type="button" class="btn-tool nts-search-clear" data-nts-clear-search="1">${esc(getNotationRefUIText("searchClear"))}</button>` : ""}
      </div>
    </div>

    <div id="ntsKnowledgeResultsWrap">
      ${showDynamicsLadder ? `
        <article class="knowledge-card">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-peach">${esc(getNotationRefUIText("dynScaleTag"))}</span>
            <span class="k-ratio-chip" dir="ltr">ppp → fff</span>
          </div>
          <h4>${esc(getNotationRefUIText("dynScaleTitle"))}</h4>
          <div class="nts-dynamics-ladder" dir="ltr">
            ${dynLadderSteps.map(st => `
              <button type="button" class="nts-ladder-step" data-nts-demo="${st.demo}" title="${esc(getNotationTermText(st.id).short)}">
                <span class="nts-ladder-bar-wrap"><span class="nts-ladder-bar" style="height:${st.h}%"></span></span>
                <span class="nts-ladder-sym">${st.id}</span>
              </button>
            `).join("")}
          </div>
          <div class="k-btn-row" style="margin-top:0.55rem;">
            <button type="button" class="btn-tool" data-nts-demo="dyn-scale">${esc(getNotationRefUIText("dynScaleBtn"))}</button>
          </div>
        </article>
      ` : ""}

      ${showTempoSpectrum ? `
        <article class="knowledge-card">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">${esc(getNotationRefUIText("tempoScaleTag"))}</span>
            <span class="k-ratio-chip" dir="ltr">40 – 200 BPM</span>
          </div>
          <h4>${esc(getNotationRefUIText("tempoScaleTitle"))}</h4>
          <div class="nts-tempo-strip">
            ${tempoSpectrumSteps.map(st => `
              <button type="button" class="nts-tempo-chip-btn" data-nts-demo="${st.demo}">
                <span class="nts-tempo-name">${st.label}</span>
                <span class="nts-tempo-bpm" dir="ltr">${st.bpm} BPM</span>
                <span class="nts-tempo-play">▶</span>
              </button>
            `).join("")}
          </div>
        </article>
      ` : ""}

      ${showFlowGuide ? `
        <article class="knowledge-card">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-peach">${esc(getNotationRefUIText("flowGuideTag"))}</span>
            <span class="k-ratio-chip" dir="ltr">|: :| • D.C. • D.S. • Coda</span>
          </div>
          <h4>${esc(getNotationRefUIText("flowGuideTitle"))}</h4>
          <div class="nts-flow-list">
            ${NOTATION_FLOW_SCENARIOS.map(sc => {
              const txt = getNotationFlowText(sc.id);
              return `
                <div class="nts-flow-card">
                  <h5>${esc(txt.title)}</h5>
                  <div class="nts-flow-svg-box" dir="ltr">${buildNotationFlowDiagramSVG(sc.id)}</div>
                  <div class="nts-flow-order-row">
                    <span class="nts-flow-order-lbl">${esc(getNotationRefUIText("flowOrderLabel"))}</span>
                    <span class="nts-flow-order-val" dir="ltr">${esc(sc.correctOrder)}</span>
                  </div>
                  <p class="nts-flow-desc">${esc(txt.desc)}</p>
                </div>
              `;
            }).join("")}
          </div>
        </article>
      ` : ""}

      ${hasAnyMatches ? groupedSectionsHtml : `
        <article class="knowledge-card nts-empty-card">
          <p>${esc(getNotationRefUIText("noResults"))}</p>
        </article>
      `}
    </div>
  `;
}

function bindNotationSymbolsDemoButtons(root) {
  root?.querySelectorAll("[data-nts-demo]").forEach(btn => {
    btn.addEventListener("click", () => {
      playNotationTermDemo(btn.dataset.ntsDemo);
    });
  });
}

// Suche: nur die Trefferliste neu zeichnen – Suchfeld, Fokus, Cursor und Bildschirmtastatur bleiben erhalten
function refreshNotationSymbolsSearchResults(container) {
  const resultsWrap = container?.querySelector("#ntsKnowledgeResultsWrap");
  if (!resultsWrap) return false;
  const tpl = document.createElement("template");
  tpl.innerHTML = renderNotationSymbolsReferenceHTML(_ntsKnowledgeFilter, _ntsKnowledgeSearch);
  const nextResults = tpl.content.querySelector("#ntsKnowledgeResultsWrap");
  if (!nextResults) return false;
  resultsWrap.innerHTML = nextResults.innerHTML;
  bindNotationSymbolsDemoButtons(resultsWrap);

  const searchWrap = container.querySelector(".nts-search-wrap");
  const hasSearch = String(_ntsKnowledgeSearch || "").trim().length > 0;
  const clearBtn = searchWrap?.querySelector("[data-nts-clear-search]");
  if (hasSearch && !clearBtn && searchWrap) {
    const nextClear = tpl.content.querySelector("[data-nts-clear-search]");
    if (nextClear) {
      searchWrap.appendChild(nextClear);
      bindNotationSymbolsClearSearchButton(container, nextClear);
    }
  } else if (!hasSearch && clearBtn) {
    clearBtn.remove();
  }
  return true;
}

function bindNotationSymbolsClearSearchButton(container, btn) {
  btn?.addEventListener("click", () => {
    _ntsKnowledgeSearch = "";
    const input = container.querySelector("#ntsKnowledgeSearchInput");
    if (input) input.value = "";
    if (!refreshNotationSymbolsSearchResults(container)) {
      container.innerHTML = `<div class="knowledge-list">${renderNotationSymbolsReferenceHTML(_ntsKnowledgeFilter, _ntsKnowledgeSearch)}</div>`;
      bindNotationSymbolsKnowledgeHandlers(container);
    }
    container.querySelector("#ntsKnowledgeSearchInput")?.focus();
  });
}

function bindNotationSymbolsKnowledgeHandlers(container) {
  if (!container) return;

  bindNotationSymbolsDemoButtons(container);

  container.querySelectorAll("[data-nts-open-practice]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (typeof openCategoryPage === "function") {
        openCategoryPage("notation", { sectionId: "notation-symbols" });
      }
    });
  });

  container.querySelectorAll("[data-nts-open-ref]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetRef = btn.dataset.ntsOpenRef;
      if (targetRef && typeof openKnowledgeRef === "function") {
        openKnowledgeRef(targetRef);
      }
    });
  });

  container.querySelectorAll("[data-nts-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      _ntsKnowledgeFilter = btn.dataset.ntsFilter || "all";
      container.innerHTML = `<div class="knowledge-list">${renderNotationSymbolsReferenceHTML(_ntsKnowledgeFilter, _ntsKnowledgeSearch)}</div>`;
      bindNotationSymbolsKnowledgeHandlers(container);
    });
  });

  container.querySelectorAll("[data-nts-clear-search]").forEach(btn => {
    bindNotationSymbolsClearSearchButton(container, btn);
  });

  const searchInput = container.querySelector("#ntsKnowledgeSearchInput");
  if (searchInput) {
    searchInput.setAttribute("aria-controls", "ntsKnowledgeResultsWrap");
    searchInput.addEventListener("input", () => {
      _ntsKnowledgeSearch = searchInput.value || "";
      refreshNotationSymbolsSearchResults(container);
    });
  }
}

/**
 * Kompakte Review-Darstellung für Prüfungs-Rückblick (js/exam.js)
 */
function buildNotationSymbolReviewHTML(snap) {
  if (!snap) return "";
  const esc = typeof escapeHtml === "function" ? escapeHtml : (s => String(s || ""));
  if (snap.promptKind === "flow-order" && snap.flowScenarioId) {
    return `
      <div class="exam-notation-review-staff exam-nts-review-box" dir="ltr">
        ${buildNotationFlowDiagramSVG(snap.flowScenarioId)}
      </div>
    `;
  }
  if (snap.svgKey) {
    return `
      <div class="exam-notation-review-staff exam-nts-review-box">
        <div class="exam-nts-review-svg" dir="ltr">${buildNotationSymbolSVG(snap.svgKey, { compact: true })}</div>
        ${snap.promptText ? `<span class="exam-nts-review-prompt">${esc(snap.promptText)}</span>` : ""}
      </div>
    `;
  }
  return "";
}
