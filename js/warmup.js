// =====================================================
// EINSING-HELFER / VOCAL WARMUP ENGINE (#viewWarmup)
// =====================================================

const WARMUP_KEY_CODES_BY_PC = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const WARMUP_FLAT_PITCH_CLASSES = new Set([1, 3, 5, 8, 10]);
// Enharmonische Zuordnung passend zu MINOR_KEY_NAMES_DE/_INTL (cis/fis/gis mit #, es/b mit b)
const WARMUP_MINOR_FLAT_PITCH_CLASSES = new Set([0, 2, 3, 5, 7, 10]);

const WARMUP_VOICE_RANGES = {
  mixed:   { id: "mixed",   baseMidi: 60, de: "Chor-Mitte", en: "Choir Mid", subDe: "c¹–e²", subEn: "C4–E5" },
  soprano: { id: "soprano", baseMidi: 62, de: "Sopran",     en: "Soprano",   subDe: "d¹–a²", subEn: "D4–A5" },
  alto:    { id: "alto",    baseMidi: 57, de: "Alt",        en: "Alto",      subDe: "a–d²",  subEn: "A3–D5" },
  tenor:   { id: "tenor",   baseMidi: 48, de: "Tenor",      en: "Tenor",     subDe: "c–g¹",  subEn: "C3–G4" },
  bass:    { id: "bass",    baseMidi: 43, de: "Bass",       en: "Bass",      subDe: "G–d¹",  subEn: "G2–D4" }
};

const WARMUP_SOUND_MODES = {
  piano:         { id: "piano",       de: "Klavier",         en: "Piano" },
  "piano-voice": { id: "piano-voice", de: "Klavier + Stimme",en: "Piano + Voice" },
  voice:         { id: "voice",       de: "Stimme",          en: "Voice" }
};

const WARMUP_PHASES = [
  { id: "breath",    num: 1, cls: "phase-breath",    shortDe: "1 Atem",     shortEn: "1 Breath",    labelDe: "PHASE 1 • ATEM & KÖRPER",       labelEn: "PHASE 1 • BREATH & BODY" },
  { id: "resonance", num: 2, cls: "phase-resonance", shortDe: "2 Summen",   shortEn: "2 Humming",   labelDe: "PHASE 2 • RESONANZ & STIMMSITZ", labelEn: "PHASE 2 • RESONANCE & TONE" },
  { id: "arpeggio",  num: 3, cls: "phase-arpeggio",  shortDe: "3 Arpeggio", shortEn: "3 Arpeggios", labelDe: "PHASE 3 • ARPEGGIOS & UMFANG",  labelEn: "PHASE 3 • ARPEGGIOS & RANGE" },
  { id: "choir",     num: 4, cls: "phase-choir",     shortDe: "4 Chorklang",shortEn: "4 Choir",     labelDe: "PHASE 4 • VOKALE & CHORKLANG",  labelEn: "PHASE 4 • VOWELS & BLEND" }
];

const WARMUP_STEP_CATALOG = {
  "breath-circle": {
    id: "breath-circle",
    phaseId: "breath",
    kind: "breath-orb",
    titleDe: "Ruhige Bauchatmung",
    titleEn: "Calm Diaphragmatic Breathing",
    syllableDe: "ffff · ssss",
    syllableEn: "ffff · ssss",
    hintDe: "Schultern entspannt lassen – sanft in den Bauch einatmen und gleichmäßig auf ffff/ssss ausströmen.",
    hintEn: "Keep shoulders relaxed — breathe low into the belly and exhale steadily on ffff/ssss.",
    cycles: 4,
    cyclePhases: [
      { cue: "inhale", sec: 4.0, cueNoteOffset: 7,    de: "Einatmen", en: "Inhale",  detailDe: "Tief in den Bauch einatmen…",         detailEn: "Inhale deeply into the belly…" },
      { cue: "hold",   sec: 1.5, cueNoteOffset: null, de: "Halten",   en: "Hold",    detailDe: "Kurz weich und offen halten",         detailEn: "Hold gently without tension" },
      { cue: "exhale", sec: 5.5, cueNoteOffset: 0,    de: "Ausatmen", en: "Exhale",  detailDe: "Gleichmäßig ausströmen: ffff / ssss", detailEn: "Exhale steadily: ffff / ssss" },
      { cue: "rest",   sec: 1.5, cueNoteOffset: null, de: "Lösen",    en: "Release", detailDe: "Bauchdecke lösen & nachspüren",       detailEn: "Release & soften between cycles" }
    ]
  },
  "diaphragm-pulse": {
    id: "diaphragm-pulse",
    phaseId: "breath",
    kind: "breath-pulse",
    titleDe: "Zwerchfell-Impulse",
    titleEn: "Diaphragm Pulses",
    syllableDe: "P – T – K – Sch!",
    syllableEn: "P – T – K – Sh!",
    hintDe: "Kurze, federnde Bauchimpulse im Puls setzen – zwischen den Takten locker einatmen.",
    hintEn: "Articulate crisp rhythmic pulses from the core — let breath drop back in between bars.",
    rounds: 5,
    pulseCount: 4,
    restBeats: 2.5
  },
  "breath-478": {
    id: "breath-478",
    phaseId: "breath",
    kind: "breath-orb",
    titleDe: "4–7–8 Entspannungsatmung",
    titleEn: "4–7–8 Relaxing Breath",
    syllableDe: "4 Ein · 7 Halten · 8 Aus",
    syllableEn: "4 In · 7 Hold · 8 Out",
    hintDe: "Beruhigt Puls und Hochatmung vor dem Singen: 4 s ruhig einatmen, 7 s locker halten, 8 s weich ausströmen.",
    hintEn: "Calms nerves and upper-chest tension: inhale 4 s, hold gently 7 s, exhale softly for 8 s.",
    cycles: 4,
    cyclePhases: [
      { cue: "inhale", sec: 4.0, cueNoteOffset: 7,    de: "Einatmen", en: "Inhale",  detailDe: "4 s ruhig durch die Nase in den Bauch",     detailEn: "4 s calm inhale into the belly" },
      { cue: "hold",   sec: 7.0, cueNoteOffset: null, de: "Halten",   en: "Hold",    detailDe: "7 s weit und entspannt halten – kein Druck", detailEn: "7 s gentle hold — no throat tension" },
      { cue: "exhale", sec: 8.0, cueNoteOffset: 0,    de: "Ausatmen", en: "Exhale",  detailDe: "8 s sanft und gleichmäßig auf ffff / ssss",  detailEn: "8 s soft, steady exhale on ffff / ssss" },
      { cue: "rest",   sec: 1.5, cueNoteOffset: null, de: "Lösen",    en: "Release", detailDe: "Schultern & Bauchdecke komplett lösen",      detailEn: "Release shoulders & belly completely" }
    ]
  },
  "breath-farinelli": {
    id: "breath-farinelli",
    phaseId: "breath",
    kind: "breath-orb",
    titleDe: "Farinelli-Atemleiter",
    titleEn: "Farinelli Breath Ladder",
    syllableDe: "4 → 6 → 8 → 10 Sek.",
    syllableEn: "4 → 6 → 8 → 10 sec",
    hintDe: "Klassische Sänger-Steigerung: Einatmen, Rippen offen halten und Ausströmen werden jede Runde 2 Sekunden länger.",
    hintEn: "Classic singer’s drill: inhale, open-rib hold, and steady exhale grow by 2 seconds each round.",
    cycleRounds: [
      {
        labelDe: "Stufe 4–4–4", labelEn: "Step 4–4–4",
        phases: [
          { cue: "inhale", sec: 4.0, cueNoteOffset: 7,    de: "Einatmen", en: "Inhale",  detailDe: "4 s gleichmäßig bis in die Flanken einatmen", detailEn: "4 s steady inhale into lower ribs" },
          { cue: "hold",   sec: 4.0, cueNoteOffset: null, de: "Weiten",   en: "Suspend", detailDe: "4 s Rippen weit & Kehlkopf offen halten",     detailEn: "4 s suspend ribs wide, throat open" },
          { cue: "exhale", sec: 4.0, cueNoteOffset: 0,    de: "Ausatmen", en: "Exhale",  detailDe: "4 s ruhiger Luftstrom auf ssss",              detailEn: "4 s steady airflow on ssss" },
          { cue: "rest",   sec: 2.0, cueNoteOffset: null, de: "Lösen",    en: "Release", detailDe: "Kurz entspannen vor der nächsten Stufe",      detailEn: "Relax briefly before the next step" }
        ]
      },
      {
        labelDe: "Stufe 6–6–6", labelEn: "Step 6–6–6",
        phases: [
          { cue: "inhale", sec: 6.0, cueNoteOffset: 7,    de: "Einatmen", en: "Inhale",  detailDe: "6 s langsam und dosiert einfüllen",           detailEn: "6 s slow, measured inhale" },
          { cue: "hold",   sec: 6.0, cueNoteOffset: null, de: "Weiten",   en: "Suspend", detailDe: "6 s ruhig aufgespannt bleiben",               detailEn: "6 s stay gently expanded" },
          { cue: "exhale", sec: 6.0, cueNoteOffset: 0,    de: "Ausatmen", en: "Exhale",  detailDe: "6 s fein dosiert auf ssss ausströmen",        detailEn: "6 s steady controlled ssss exhale" },
          { cue: "rest",   sec: 2.0, cueNoteOffset: null, de: "Lösen",    en: "Release", detailDe: "Bauchdecke weich fallen lassen",              detailEn: "Let the belly soften" }
        ]
      },
      {
        labelDe: "Stufe 8–8–8", labelEn: "Step 8–8–8",
        phases: [
          { cue: "inhale", sec: 8.0, cueNoteOffset: 7,    de: "Einatmen", en: "Inhale",  detailDe: "8 s fein einteilen – nicht zu früh voll sein", detailEn: "8 s pace the inhale — don’t rush" },
          { cue: "hold",   sec: 8.0, cueNoteOffset: null, de: "Weiten",   en: "Suspend", detailDe: "8 s offen halten ohne den Hals zu schließen",  detailEn: "8 s keep open without locking the throat" },
          { cue: "exhale", sec: 8.0, cueNoteOffset: 0,    de: "Ausatmen", en: "Exhale",  detailDe: "8 s konstanter Stützstrom auf ssss",           detailEn: "8 s constant supported ssss stream" },
          { cue: "rest",   sec: 2.0, cueNoteOffset: null, de: "Lösen",    en: "Release", detailDe: "Kurz nachatmen für die Finalrunde",           detailEn: "Reset for the final round" }
        ]
      },
      {
        labelDe: "Stufe 10–10–10", labelEn: "Step 10–10–10",
        phases: [
          { cue: "inhale", sec: 10.0, cueNoteOffset: 7,    de: "Einatmen", en: "Inhale",  detailDe: "10 s ultraruhig bis in Rücken & Flanken",     detailEn: "10 s ultra-calm fill into ribs & back" },
          { cue: "hold",   sec: 10.0, cueNoteOffset: null, de: "Weiten",   en: "Suspend", detailDe: "10 s Weite halten – Gesicht bleibt weich",    detailEn: "10 s hold width — keep face soft" },
          { cue: "exhale", sec: 10.0, cueNoteOffset: 0,    de: "Ausatmen", en: "Exhale",  detailDe: "10 s gleichmäßig bis zum letzten Moment",     detailEn: "10 s steady all the way to the finish" },
          { cue: "rest",   sec: 2.0,  cueNoteOffset: null, de: "Lösen",    en: "Release", detailDe: "Stark! Tief durchatmen und lösen",            detailEn: "Great! Breathe naturally and release" }
        ]
      }
    ]
  },
  "breath-sustain": {
    id: "breath-sustain",
    phaseId: "breath",
    kind: "breath-orb",
    titleDe: "Langer Zisch-Ausatem (Stütze)",
    titleEn: "Long Hiss Exhale (Support)",
    syllableDe: "8 → 12 → 16 → 20 Sek.",
    syllableEn: "8 → 12 → 16 → 20 sec",
    hintDe: "Kurz und reflexartig einatmen (2 s), dann auf „ssss“ möglichst lange und gleichmäßig ohne Druckverlust ausströmen.",
    hintEn: "Take a quick, relaxed 2 s drop-in breath, then sustain a steady, even “ssss” stream without collapsing.",
    cycleRounds: [
      {
        labelDe: "Ausdauer 8 s", labelEn: "Sustain 8 s",
        phases: [
          { cue: "inhale", sec: 2.0, cueNoteOffset: 7,    de: "Einfallen", en: "Drop in", detailDe: "2 s entspannt tief einfallen lassen",           detailEn: "2 s relaxed low drop-in breath" },
          { cue: "exhale", sec: 8.0, cueNoteOffset: 0,    de: "ssss…",     en: "ssss…",   detailDe: "8 s völlig gleichmäßiger Luftstrom auf ssss",   detailEn: "8 s completely even airflow on ssss", tickEverySec: 4 },
          { cue: "rest",   sec: 2.0, cueNoteOffset: null, de: "Lösen",     en: "Release", detailDe: "Bauchdecke lösen – Luft strömt von selbst nach", detailEn: "Release belly — let air drop back in" }
        ]
      },
      {
        labelDe: "Ausdauer 12 s", labelEn: "Sustain 12 s",
        phases: [
          { cue: "inhale", sec: 2.0,  cueNoteOffset: 7,    de: "Einfallen", en: "Drop in", detailDe: "2 s locker in die Flanken einatmen",           detailEn: "2 s easy breath into the ribs" },
          { cue: "exhale", sec: 12.0, cueNoteOffset: 0,    de: "ssss…",     en: "ssss…",   detailDe: "12 s schmal & sparsam dosieren – Rippen weit", detailEn: "12 s narrow, steady stream — keep ribs wide", tickEverySec: 4 },
          { cue: "rest",   sec: 2.0,  cueNoteOffset: null, de: "Lösen",     en: "Release", detailDe: "Kurz entspannen vor 16 Sekunden",              detailEn: "Relax briefly before 16 seconds" }
        ]
      },
      {
        labelDe: "Ausdauer 16 s", labelEn: "Sustain 16 s",
        phases: [
          { cue: "inhale", sec: 2.0,  cueNoteOffset: 7,    de: "Einfallen", en: "Drop in", detailDe: "2 s tief und geräuschlos einatmen",            detailEn: "2 s deep, silent inhale" },
          { cue: "exhale", sec: 16.0, cueNoteOffset: 0,    de: "ssss…",     en: "ssss…",   detailDe: "16 s halten: feiner Strahl, nicht verschenken", detailEn: "16 s hold: thin steady stream, no waste", tickEverySec: 4 },
          { cue: "rest",   sec: 2.5,  cueNoteOffset: null, de: "Lösen",     en: "Release", detailDe: "Schultern lockern für die 20-s-Runde",         detailEn: "Loosen shoulders for the 20 s round" }
        ]
      },
      {
        labelDe: "Ausdauer 20 s", labelEn: "Sustain 20 s",
        phases: [
          { cue: "inhale", sec: 2.5,  cueNoteOffset: 7,    de: "Einfallen", en: "Drop in", detailDe: "2,5 s tief & weit einatmen",                   detailEn: "2.5 s deep, wide inhale" },
          { cue: "exhale", sec: 20.0, cueNoteOffset: 0,    de: "ssss…",     en: "ssss…",   detailDe: "20 s Königsklasse: ruhig & gleichmäßig halten", detailEn: "20 s endurance: steady & calm to the end", tickEverySec: 4 },
          { cue: "rest",   sec: 2.0,  cueNoteOffset: null, de: "Lösen",     en: "Release", detailDe: "Hervorragend! Frei weiteratmen",               detailEn: "Excellent! Breathe freely again" }
        ]
      }
    ]
  },
  "breath-staccato-sustain": {
    id: "breath-staccato-sustain",
    phaseId: "breath",
    kind: "breath-pulse",
    titleDe: "Staccato- & Stützstrom-Wechsel",
    titleEn: "Staccato-to-Sustain Core Drill",
    syllableDe: "F – F – F – F – FFFFF!",
    syllableEn: "F – F – F – F – FFFFF!",
    hintDe: "4 knackige Zwerchfell-Stöße direkt in einen stabil gehaltenen Ausatem überführen – ohne zwischendurch abzusetzen.",
    hintEn: "Fire 4 crisp core impulses straight into one steady sustained exhale without breaking airflow.",
    rounds: 4,
    pulseCount: 4,
    sustainBeats: 4.5,
    restBeats: 2.5
  },
  "siren-fifth": {
    id: "siren-fifth",
    phaseId: "resonance",
    kind: "vocal-siren",
    titleDe: "Sanfte Quinte-Sirene",
    titleEn: "Gentle 5th Vocal Siren",
    syllableDe: "Ng / Brrrr / Wuu",
    syllableEn: "Ng / Brrrr / Woo",
    degreesText: "1 ↗ 5 ↘ 1 (Glide)",
    hintDe: "Stufenlos und weich wie eine Sirene nach oben und wieder zurück gleiten – keine Stufen, kein Druck!",
    hintEn: "Glide smoothly up and back down like a siren — continuous pitch, zero strain!",
    sirenWaypoints: [
      { tFrac: 0.0, semi: 0 },
      { tFrac: 0.5, semi: 7 },
      { tFrac: 1.0, semi: 0 }
    ],
    glideBeats: 5.5,
    keyOffsets: [0, 1, 2, 3, 4, 5],
    cueChordBeats: 1.2,
    breathGapBeats: 0.75,
    postRestBeats: 0.9
  },
  "siren-octave": {
    id: "siren-octave",
    phaseId: "resonance",
    kind: "vocal-siren",
    titleDe: "Oktav-Sirene (Passaggio)",
    titleEn: "Octave Siren (Passaggio)",
    syllableDe: "Ng / Wuu / Mmm",
    syllableEn: "Ng / Woo / Mmm",
    degreesText: "1 ↗ 8 ↘ 1 (Glide)",
    hintDe: "Lass die Stimme stufenlos durch den Registerübergang (Brust → Kopf → Brust) gleiten – oben schlank und leicht bleiben.",
    hintEn: "Slide smoothly through your vocal bridge (chest → head → chest) — stay light and narrow at the top.",
    sirenWaypoints: [
      { tFrac: 0.0, semi: 0 },
      { tFrac: 0.5, semi: 12 },
      { tFrac: 1.0, semi: 0 }
    ],
    glideBeats: 7.0,
    keyOffsets: [0, 1, 2, 3, 4],
    cueChordBeats: 1.2,
    breathGapBeats: 0.8,
    postRestBeats: 1.0
  },
  "siren-wave": {
    id: "siren-wave",
    phaseId: "resonance",
    kind: "vocal-siren",
    titleDe: "Sirenen-Welle (Achterbahn)",
    titleEn: "Rollercoaster Siren Wave",
    syllableDe: "Wuu ↗ ↘ ↗ ↘",
    syllableEn: "Woo ↗ ↘ ↗ ↘",
    degreesText: "1 ↗ 5 ↘ 3 ↗ 8 ↘ 1",
    hintDe: "Folge dem Leuchtpunkt geschmeidig über beide Gipfel – ideal für flexible Stimmführung durch alle Register.",
    hintEn: "Follow the glowing dot smoothly across both peaks — builds effortless flexibility through the registers.",
    sirenWaypoints: [
      { tFrac: 0.00, semi: 0 },
      { tFrac: 0.27, semi: 7 },
      { tFrac: 0.48, semi: 4 },
      { tFrac: 0.75, semi: 12 },
      { tFrac: 1.00, semi: 0 }
    ],
    glideBeats: 8.5,
    keyOffsets: [0, 1, 2, 3],
    cueChordBeats: 1.2,
    breathGapBeats: 0.8,
    postRestBeats: 1.0
  },
  "humming-wave": {
    id: "humming-wave",
    phaseId: "resonance",
    kind: "vocal-pattern",
    titleDe: "Summen & Lippenflattern",
    titleEn: "Humming & Lip Trills",
    syllableDe: "Mmm / Brrrr",
    syllableEn: "Mmm / Brrrr",
    degreesText: "1 – 2 – 3 – 2 – 1",
    hintDe: "Weich nach vorne an die Lippen summen oder locker blubbern lassen (SOVT).",
    hintEn: "Hum gently forward to the lips or flutter with a relaxed lip trill (SOVT).",
    semitones: [0, 2, 4, 2, 0],
    noteBeats: [0.9, 0.9, 0.9, 0.9, 1.75],
    keyOffsets: [0, 1, 2, 3, 4, 5, 6],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.85,
    staccato: false
  },
  "fifth-sigh": {
    id: "fifth-sigh",
    phaseId: "resonance",
    kind: "vocal-pattern",
    titleDe: "Seufzer-Abgang (Quinte)",
    titleEn: "Descending 5th Sigh",
    syllableDe: "Mjaa – Nuu",
    syllableEn: "Myaa – Noo",
    degreesText: "5 – 4 – 3 – 2 – 1",
    hintDe: "Mit einem sanften Seufzer von oben weich durch das Register gleiten – Kiefer bleibt locker.",
    hintEn: "Glide gently downward like a relaxed sigh — keep the jaw soft and effortless.",
    semitones: [7, 5, 4, 2, 0],
    noteBeats: [1.0, 0.9, 0.9, 0.9, 1.85],
    keyOffsets: [5, 4, 3, 2, 1, 0],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.85,
    staccato: false
  },
  "major-scale": {
    id: "major-scale",
    phaseId: "arpeggio",
    isScale: true,
    tonality: "major",
    kind: "vocal-pattern",
    titleDe: "Dur-Tonleiter (auf & ab)",
    titleEn: "Major Scale (Up & Down)",
    syllableDe: "La – la / Do – Re – Mi",
    syllableEn: "La – la / Do – Re – Mi",
    degreesText: "1 – 2 – 3 – 4 – 5 – 6 – 7 – 8 ↘ 1",
    hintDe: "Gleichmäßig legato über die ganze Oktave singen – die Halbtonschritte 3–4 und 7–8 bewusst hoch denken.",
    hintEn: "Sing smoothly legato across the full octave — keep half-steps 3–4 and 7–8 bright and lifted.",
    semitones: [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0],
    noteBeats: [0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 1.44],
    keyOffsets: [0, 1, 2, 3, 4],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.9,
    staccato: false
  },
  "minor-natural-scale": {
    id: "minor-natural-scale",
    phaseId: "arpeggio",
    isScale: true,
    tonality: "minor",
    kind: "vocal-pattern",
    titleDe: "Natürliches Moll (auf & ab)",
    titleEn: "Natural Minor Scale (Up & Down)",
    syllableDe: "Na – na – na",
    syllableEn: "Na – na – na",
    degreesText: "1 – 2 – ♭3 – 4 – 5 – ♭6 – ♭7 – 8 ↘ 1",
    hintDe: "Weiche Moll-Farbe halten – auf die kleine Terz (♭3) und die entspannten Stufen ♭6 und ♭7 achten.",
    hintEn: "Keep a warm minor color — listen closely to the minor 3rd (♭3) and relaxed ♭6 and ♭7.",
    semitones: [0, 2, 3, 5, 7, 8, 10, 12, 10, 8, 7, 5, 3, 2, 0],
    noteBeats: [0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 1.44],
    keyOffsets: [0, 1, 2, 3, 4],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.9,
    staccato: false
  },
  "minor-harmonic-scale": {
    id: "minor-harmonic-scale",
    phaseId: "arpeggio",
    isScale: true,
    tonality: "minor",
    kind: "vocal-pattern",
    titleDe: "Harmonisches Moll (auf & ab)",
    titleEn: "Harmonic Minor Scale (Up & Down)",
    syllableDe: "Ma – ma – ma",
    syllableEn: "Ma – ma – ma",
    degreesText: "1 – 2 – ♭3 – 4 – 5 – ♭6 – 7 – 8 ↘ 1",
    hintDe: "Zwischen ♭6 und erhöhter 7. Stufe sauber spannen – der Leitton (7) zieht eng zur Oktave.",
    hintEn: "Span the wider step between ♭6 and raised 7 cleanly — let the leading tone (7) pull into the octave.",
    semitones: [0, 2, 3, 5, 7, 8, 11, 12, 11, 8, 7, 5, 3, 2, 0],
    noteBeats: [0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 1.44],
    keyOffsets: [0, 1, 2, 3, 4],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.9,
    staccato: false
  },
  "minor-melodic-scale": {
    id: "minor-melodic-scale",
    phaseId: "arpeggio",
    isScale: true,
    tonality: "minor",
    kind: "vocal-pattern",
    titleDe: "Melodisches Moll (auf & ab)",
    titleEn: "Melodic Minor Scale (Up & Down)",
    syllableDe: "La – le – li – lo",
    syllableEn: "La – le – li – lo",
    degreesText: "↗ 1…♭3…6–7–8  •  ↘ ♭7–♭6…1",
    hintDe: "Aufwärts mit hoher 6. und 7. Stufe fließend öffnen, abwärts weich über ♭7 und ♭6 natürlich zurückkehren.",
    hintEn: "Ascend smoothly with raised 6th and 7th, then descend naturally through ♭7 and ♭6.",
    semitones: [0, 2, 3, 5, 7, 9, 11, 12, 10, 8, 7, 5, 3, 2, 0],
    noteBeats: [0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 0.72, 1.44],
    keyOffsets: [0, 1, 2, 3, 4],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.9,
    staccato: false
  },
  "triad-syllables": {
    id: "triad-syllables",
    phaseId: "arpeggio",
    kind: "vocal-pattern",
    titleDe: "Dreiklangs-Arpeggio",
    titleEn: "Triad Syllable Arpeggio",
    syllableDe: "Ma – Me – Mi – Mo – Mu",
    syllableEn: "Mah – Meh – Mee – Moh – Moo",
    degreesText: "1 – 3 – 5 – 3 – 1",
    hintDe: "Vokale auf demselben Stimmstrom verbinden, bei jedem Halbton frisch nach oben denken.",
    hintEn: "Link vowels on one steady airflow; think gently upward as each half-step rises.",
    semitones: [0, 4, 7, 4, 0],
    noteBeats: [0.85, 0.85, 0.9, 0.85, 1.7],
    keyOffsets: [0, 1, 2, 3, 4, 5, 6, 7],
    cueChordBeats: 1.25,
    breathGapBeats: 0.7,
    postRestBeats: 0.8,
    staccato: false
  },
  "octave-staccato": {
    id: "octave-staccato",
    phaseId: "arpeggio",
    kind: "vocal-pattern",
    titleDe: "Oktav-Arpeggio (federnd)",
    titleEn: "Bouncy Octave Arpeggio",
    syllableDe: "Ha – ha – ha – ha!",
    syllableEn: "Ha – ha – ha – ha!",
    degreesText: "1 – 3 – 5 – 8 – 5 – 3 – 1",
    hintDe: "Leicht und präzise aus dem Zwerchfell abfedern – oben offen und ohne Druck klingen.",
    hintEn: "Bounce lightly from the core — let the top octave ring open without pushing.",
    semitones: [0, 4, 7, 12, 7, 4, 0],
    noteBeats: [0.65, 0.65, 0.65, 0.95, 0.65, 0.65, 1.55],
    keyOffsets: [2, 3, 4, 5, 6, 7],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.85,
    staccato: true
  },
  "cool-down-arp": {
    id: "cool-down-arp",
    phaseId: "arpeggio",
    kind: "vocal-pattern",
    titleDe: "Lagen-Ausgleich (Abwärts)",
    titleEn: "Register Cool-Down (Descending)",
    syllableDe: "Joo – oo – ooh",
    syllableEn: "Yoh – oh – ooh",
    degreesText: "8 – 5 – 3 – 1",
    hintDe: "Kopfklang behutsam in die entspannte Mittellage mitnehmen und weich abrunden.",
    hintEn: "Carry head resonance smoothly back down into a relaxed middle voice.",
    semitones: [12, 7, 4, 0],
    noteBeats: [1.0, 0.9, 0.9, 1.85],
    keyOffsets: [6, 5, 4, 3, 2],
    cueChordBeats: 1.2,
    breathGapBeats: 0.7,
    postRestBeats: 0.85,
    staccato: false
  },
  "vowel-blend": {
    id: "vowel-blend",
    phaseId: "choir",
    kind: "vowel-blend",
    titleDe: "Vokal-Wandern (Chor-Blend)",
    titleEn: "Vowel Morph & Blend",
    syllableDe: "U → O → A → E → I",
    syllableEn: "Oo → Oh → Ah → Eh → Ee",
    degreesText: "1 • Vokalausgleich",
    hintDe: "Auf einem liegenden Ton weich von dunklem U bis hellem I übergehen, ohne dass der Klang abreißt.",
    hintEn: "Morph smoothly across all five vowels on one steady pitch without breaking the line.",
    vowelsDe: ["Uuuu…", "Oooo…", "Aaaa…", "Eeee…", "Iiii…"],
    vowelsEn: ["Oooo…", "Ohhh…", "Ahhh…", "Ehhh…", "Eeee…"],
    vowelsFr: ["Ouuu…", "Oooo…", "Aaaa…", "Éééé…", "Iiii…"],
    vowelsEs: ["Uuuu…", "Oooo…", "Aaaa…", "Eeee…", "Iiii…"],
    vowelsIt: ["Uuuu…", "Oooo…", "Aaaa…", "Eeee…", "Iiii…"],
    vowelsPl: ["Uuuu…", "Oooo…", "Aaaa…", "Eeee…", "Iiii…"],
    vowelsTr: ["Uuuu…", "Oooo…", "Aaaa…", "Eeee…", "İiii…"],
    vowelsUk: ["Уууу…", "Оооо…", "Аааа…", "Ееее…", "Іііі…"],
    vowelsUr: ["اُووو…", "اووو…", "آااا…", "اےےے…", "اِییی…"],
    vowelsAr: ["أُووو…", "أووو…", "آااا…", "إيهه…", "إييي…"],
    keyOffsets: [0, 2, 4, 5],
    cueChordBeats: 1.35,
    breathGapBeats: 0.8,
    vowelStepBeats: 1.9,
    postRestBeats: 1.0
  },
  "choir-cadence": {
    id: "choir-cadence",
    phaseId: "choir",
    kind: "choir-cadence",
    titleDe: "SATB Chor-Blend & Schlusskadenz",
    titleEn: "SATB Choir Blend & Cadence",
    syllableDe: "Nuu / Ahh (SATB)",
    syllableEn: "Noo / Ahh (SATB)",
    degreesText: "Bass → Tenor → Alt → Sopran",
    hintDe: "Jede Stimme rastet nacheinander in den reinen Schlussakkord ein – ruhig lauschen und einschwingen.",
    hintEn: "Hear each voice lock in from root up to 3rd and 8ve — blend smoothly into just intonation.",
    keyOffsets: [0, 2, 4],
    cadenceBeat: 1.35,
    stackStepBeats: 1.15,
    holdBeats: 4.5,
    postRestBeats: 1.4
  }
};

const WARMUP_PRESETS = [
  {
    id: "full-5min",
    badge: "5:00",
    circle: "circle-sage",
    titleDe: "5-Minuten Komplett-Einsingen",
    titleEn: "5-Min Complete Vocal Warmup",
    descDe: "Alle 4 Phasen: Atem, Summen, Tonleitern (Dur/Moll), Arpeggios & SATB-Chorklang",
    descEn: "All 4 phases: breathing, humming, major & minor scales, arpeggios & SATB blend",
    steps: [
      { id: "breath-circle", cycles: 3 },
      { id: "diaphragm-pulse", rounds: 4 },
      { id: "humming-wave", keyOffsets: [0, 1, 2, 3, 4] },
      { id: "siren-fifth", keyOffsets: [0, 2, 4] },
      { id: "fifth-sigh", keyOffsets: [4, 3, 2, 1] },
      { id: "major-scale", keyOffsets: [0, 1, 2] },
      { id: "minor-natural-scale", keyOffsets: [0, 1, 2] },
      { id: "triad-syllables", keyOffsets: [0, 1, 2, 3, 4] },
      { id: "octave-staccato", keyOffsets: [2, 3, 4, 5] },
      { id: "cool-down-arp", keyOffsets: [5, 4, 3, 2] },
      { id: "vowel-blend", keyOffsets: [0, 2, 4] },
      { id: "choir-cadence", keyOffsets: [0, 2] }
    ]
  },
  {
    id: "quick-3min",
    badge: "3:00",
    circle: "circle-lilac",
    titleDe: "Kompakt-Warmup (ca. 3 Min.)",
    titleEn: "Compact Warmup (~3 Min.)",
    descDe: "Kurzer Start für die Unterrichtsstunde: Atem, Summen, Dreiklang & Chorklang",
    descEn: "Fast lesson opener: breathing, humming, triad syllables & closing choir blend",
    steps: [
      { id: "breath-circle", cycles: 3 },
      { id: "humming-wave", keyOffsets: [0, 1, 2, 3, 4, 5, 6] },
      { id: "fifth-sigh", keyOffsets: [5, 4, 3, 2, 1] },
      { id: "triad-syllables" },
      { id: "vowel-blend", keyOffsets: [0, 2] },
      { id: "choir-cadence", keyOffsets: [0, 2] }
    ]
  },
  {
    id: "breath-intensive",
    badge: "4·7·8",
    circle: "circle-sage",
    titleDe: "Atem & Stütze intensiv",
    titleEn: "Intensive Breath & Support",
    descDe: "4–7–8 Entspannung, Farinelli-Atemleiter (4–10 s), langer Zisch-Ausatem (bis 20 s) & Stützstrom-Drill",
    descEn: "4–7–8 relaxation, Farinelli ladder (4–10 s), long hiss sustain (up to 20 s) & core pulse-to-sustain",
    steps: [
      { id: "breath-478" },
      { id: "breath-farinelli" },
      { id: "breath-sustain" },
      { id: "breath-staccato-sustain" }
    ]
  },
  {
    id: "siren-flow",
    badge: "∿",
    circle: "circle-lilac",
    titleDe: "Sirenen & Register-Flow",
    titleEn: "Vocal Sirens & Register Flow",
    descDe: "Stufenloses Gleiten durch das Passaggio: Quinte-Sirene, Oktav-Sirene & Achterbahn-Welle mit Live-Kurve",
    descEn: "Smooth gliding through your vocal bridge: 5th siren, octave siren & rollercoaster wave with live pitch curve",
    steps: [
      { id: "breath-circle", cycles: 2 },
      { id: "siren-fifth" },
      { id: "siren-octave" },
      { id: "siren-wave" },
      { id: "cool-down-arp", keyOffsets: [4, 3, 2] }
    ]
  },
  {
    id: "scales-focus",
    badge: "1↗8",
    circle: "circle-peach",
    titleDe: "Tonleitern (Dur & Moll)",
    titleEn: "Scales (Major & Minor)",
    descDe: "Ganze Oktav-Tonleitern singen: Dur sowie natürliches, harmonisches & melodisches Moll",
    descEn: "Sing full octave scales: major plus natural, harmonic & melodic minor",
    steps: [
      { id: "humming-wave", keyOffsets: [0, 2, 4] },
      { id: "major-scale" },
      { id: "minor-natural-scale" },
      { id: "minor-harmonic-scale" },
      { id: "minor-melodic-scale" },
      { id: "choir-cadence", keyOffsets: [0] }
    ]
  },
  {
    id: "arpeggio-focus",
    badge: "1·3·5·8",
    circle: "circle-peach node-circle-dense",
    titleDe: "Arpeggio & Register-Training",
    titleEn: "Arpeggio & Register Drill",
    descDe: "Fokus auf Beweglichkeit, Staccato-Oktaven und sanften Lagen-Ausgleich",
    descEn: "Focused agility work: humming, triad vows, staccato octaves & cool-down",
    steps: [
      { id: "humming-wave", keyOffsets: [0, 2, 4] },
      { id: "triad-syllables" },
      { id: "octave-staccato" },
      { id: "cool-down-arp" },
      { id: "choir-cadence", keyOffsets: [0] }
    ]
  },
  {
    id: "breath-choir",
    badge: "SATB",
    circle: "circle-sage",
    titleDe: "Chor-Atem & Intonation",
    titleEn: "Choir Breath & Intonation",
    descDe: "Atemstütze, Zwerchfell-Impulse, Vokalausgleich und reiner Chorklang",
    descEn: "Breath support, core pulses, vowel morphing & pure choral chord tuning",
    steps: [
      { id: "breath-circle" },
      { id: "diaphragm-pulse" },
      { id: "humming-wave", keyOffsets: [0, 1, 2, 3] },
      { id: "vowel-blend" },
      { id: "choir-cadence" }
    ]
  }
];

function getLocalizedWarmupPreset(presetId = state?.warmup?.presetId) {
  const raw = WARMUP_PRESETS.find(p => p.id === presetId) || WARMUP_PRESETS[0];
  return {
    ...raw,
    title: tr(raw.titleDe, raw.titleEn),
    desc: tr(raw.descDe, raw.descEn)
  };
}

function getLocalizedWarmupVoiceRange(voiceId = state?.warmup?.voiceRange) {
  const raw = WARMUP_VOICE_RANGES[voiceId] || WARMUP_VOICE_RANGES.mixed;
  return {
    ...raw,
    label: tr(raw.de, raw.en),
    sub: tr(raw.subDe, raw.subEn)
  };
}

function getLocalizedWarmupSoundMode(soundId = state?.warmup?.soundMode) {
  const raw = WARMUP_SOUND_MODES[soundId] || WARMUP_SOUND_MODES["piano-voice"];
  return { ...raw, label: tr(raw.de, raw.en) };
}

function getWarmupStepsForPreset(presetId = state?.warmup?.presetId) {
  const preset = WARMUP_PRESETS.find(p => p.id === presetId) || WARMUP_PRESETS[0];
  return preset.steps.map(entry => {
    const base = WARMUP_STEP_CATALOG[entry.id];
    return { ...base, ...entry };
  });
}

function getWarmupPhaseInfo(phaseId) {
  const raw = WARMUP_PHASES.find(p => p.id === phaseId) || WARMUP_PHASES[0];
  return {
    ...raw,
    short: tr(raw.shortDe, raw.shortEn),
    label: tr(raw.labelDe, raw.labelEn)
  };
}

function getWarmupPhasePillLabel(phase, steps) {
  if (phase.id === "resonance" && Array.isArray(steps)) {
    const p2Steps = steps.filter(s => s.phaseId === "resonance");
    const hasSirens = p2Steps.some(s => s.kind === "vocal-siren");
    const hasNonSirens = p2Steps.some(s => s.kind !== "vocal-siren");
    if (hasSirens && !hasNonSirens) return tr("2 Sirenen", "2 Sirens");
  }
  if (phase.id === "arpeggio" && Array.isArray(steps)) {
    const p3Steps = steps.filter(s => s.phaseId === "arpeggio");
    const hasScales = p3Steps.some(s => s.isScale);
    const hasNonScales = p3Steps.some(s => !s.isScale);
    if (hasScales && !hasNonScales) return tr("3 Tonleitern", "3 Scales");
    if (hasScales && hasNonScales) return tr("3 Umfang", "3 Range");
  }
  return tr(phase.shortDe, phase.shortEn);
}

function getWarmupStagePhaseLabel(step, phaseInfo) {
  if (step?.kind === "vocal-siren") {
    return tr("PHASE 2 • SIRENEN & REGISTER-FLOW", "PHASE 2 • VOCAL SIRENS & FLOW");
  }
  if (step?.phaseId === "arpeggio" && step?.isScale) {
    return tr("PHASE 3 • TONLEITERN (DUR & MOLL)", "PHASE 3 • SCALES (MAJOR & MINOR)");
  }
  return phaseInfo.label;
}

function getWarmupKeyNameFromMidi(midi, tonality = "major") {
  const pc = ((midi % 12) + 12) % 12;
  const keyCode = WARMUP_KEY_CODES_BY_PC[pc] || "C";
  const isMinor = tonality === "minor";
  return {
    keyCode,
    keyName: getKeyDisplayName(keyCode, isMinor ? "minor" : "major"),
    preferFlat: isMinor ? WARMUP_MINOR_FLAT_PITCH_CLASSES.has(pc) : WARMUP_FLAT_PITCH_CLASSES.has(pc)
  };
}

function getWarmupStepRoundCount(step) {
  if (!step) return 1;
  if (step.kind === "breath-orb") return 1;
  if (step.kind === "breath-pulse") return step.rounds || 4;
  return Array.isArray(step.keyOffsets) && step.keyOffsets.length ? step.keyOffsets.length : 1;
}

function getWarmupRoundDurationSec(step, bpm = WARMUP_DEFAULT_BPM) {
  const beatSec = 60 / Math.max(60, Math.min(140, Number(bpm) || WARMUP_DEFAULT_BPM));
  if (step.kind === "breath-orb") {
    if (Array.isArray(step.cycleRounds) && step.cycleRounds.length > 0) {
      return step.cycleRounds.reduce(
        (sum, r) => sum + (r.phases || []).reduce((ps, p) => ps + p.sec, 0),
        0
      );
    }
    const oneCycle = (step.cyclePhases || []).reduce((sum, p) => sum + p.sec, 0);
    return (step.cycles || 3) * oneCycle;
  }
  if (step.kind === "breath-pulse") {
    return ((step.pulseCount || 4) + (step.sustainBeats || 0) + (step.restBeats || 2.5)) * beatSec;
  }
  if (step.kind === "vocal-siren") {
    return ((step.cueChordBeats || 1.2) + (step.breathGapBeats || 0.75) + (step.glideBeats || 6.0) + (step.postRestBeats || 0.9)) * beatSec;
  }
  if (step.kind === "vowel-blend") {
    const vowelsLen = (step.vowelsDe || []).length || 5;
    return ((step.cueChordBeats || 1.35) + (step.breathGapBeats || 0.8) + vowelsLen * (step.vowelStepBeats || 1.9) + (step.postRestBeats || 1.0)) * beatSec;
  }
  if (step.kind === "choir-cadence") {
    return (4 * (step.cadenceBeat || 1.35) + 4 * (step.stackStepBeats || 1.15) + (step.holdBeats || 4.5) + (step.postRestBeats || 1.4)) * beatSec;
  }
  const notesBeats = (step.noteBeats || []).reduce((sum, b) => sum + b, 0);
  return ((step.cueChordBeats || 1.25) + (step.breathGapBeats || 0.75) + notesBeats + (step.postRestBeats || 0.85)) * beatSec;
}

function getWarmupRemainingSec(w = state.warmup) {
  const steps = getWarmupStepsForPreset(w?.presetId);
  const bpm = w?.bpm || WARMUP_DEFAULT_BPM;
  const sIdx = Math.max(0, Math.min(steps.length, w?.stepIndex || 0));
  if (w?.status === "completed") return 0;

  let totalSec = 0;
  for (let i = sIdx; i < steps.length; i++) {
    const step = steps[i];
    const roundCount = getWarmupStepRoundCount(step);
    const roundSec = getWarmupRoundDurationSec(step, bpm);
    const startRound = i === sIdx ? Math.max(0, Math.min(roundCount - 1, w?.keyOffsetIndex || 0)) : 0;
    totalSec += (roundCount - startRound) * roundSec;
  }
  return Math.max(0, Math.round(totalSec));
}

function getWarmupTonicMidi(step, roundIdx = 0, w = state.warmup) {
  const voiceDef = getLocalizedWarmupVoiceRange(w?.voiceRange);
  const offset = Array.isArray(step?.keyOffsets) && step.keyOffsets.length > 0
    ? step.keyOffsets[Math.max(0, Math.min(step.keyOffsets.length - 1, roundIdx))]
    : 0;
  const rawMidi = voiceDef.baseMidi + offset + (w?.transposeShift || 0);
  return Math.max(36, Math.min(82, rawMidi));
}

let _warmupBreathPhaseTimerId = null;
let _warmupSirenRafId = null;

function stopWarmupBreathPhaseTimer() {
  if (_warmupBreathPhaseTimerId !== null) {
    clearInterval(_warmupBreathPhaseTimerId);
    _warmupBreathPhaseTimerId = null;
  }
}

function startWarmupBreathPhaseTimer(durationSec, token) {
  stopWarmupBreathPhaseTimer();
  const timerEl = document.getElementById("warmupBreathTimer");
  if (!timerEl) return;
  const totalSec = Math.max(1, Number(durationSec) || 1);
  const startWall = Date.now();
  const update = () => {
    if (!state.warmup || state.warmup.token !== token || state.warmup.status !== "running") {
      stopWarmupBreathPhaseTimer();
      return;
    }
    const left = Math.max(0, totalSec - (Date.now() - startWall) / 1000);
    const shown = Math.ceil(left);
    timerEl.classList.remove("hidden");
    timerEl.textContent = shown > 0 ? `${shown} s` : "";
  };
  update();
  _warmupBreathPhaseTimerId = setInterval(update, 160);
}

function stopWarmupSirenAnimation() {
  if (_warmupSirenRafId !== null) {
    cancelAnimationFrame(_warmupSirenRafId);
    _warmupSirenRafId = null;
  }
}

function evalWarmupSirenSemi(waypoints, frac) {
  if (!Array.isArray(waypoints) || waypoints.length === 0) return 0;
  const f = Math.max(0, Math.min(1, frac));
  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    if (f <= b.tFrac || i === waypoints.length - 2) {
      const span = Math.max(0.0001, b.tFrac - a.tFrac);
      const u = Math.max(0, Math.min(1, (f - a.tFrac) / span));
      const ease = 0.5 - 0.5 * Math.cos(Math.PI * u);
      return a.semi + (b.semi - a.semi) * ease;
    }
  }
  return waypoints[waypoints.length - 1].semi || 0;
}

function renderWarmupSirenStage(step, tonicMidi, progressFrac = -1) {
  const wrap = document.getElementById("warmupSirenWrap");
  if (!wrap || !step || step.kind !== "vocal-siren") return;
  const wps = Array.isArray(step.sirenWaypoints) && step.sirenWaypoints.length >= 2
    ? step.sirenWaypoints
    : [{ tFrac: 0, semi: 0 }, { tFrac: 0.5, semi: 7 }, { tFrac: 1, semi: 0 }];

  const maxSemi = Math.max(5, ...wps.map(p => p.semi || 0));
  const keyInfo = getWarmupKeyNameFromMidi(tonicMidi, "major");
  const lowNoteLabel = midiToGermanNote(tonicMidi, keyInfo.preferFlat);
  const highNoteLabel = midiToGermanNote(tonicMidi + maxSemi, keyInfo.preferFlat);

  const x0 = 34;
  const x1 = 248;
  const yBot = 74;
  const yTop = 20;
  const toX = (f) => x0 + f * (x1 - x0);
  const toY = (semi) => yBot - (semi / maxSemi) * (yBot - yTop);

  const samples = 48;
  const pts = [];
  for (let i = 0; i <= samples; i++) {
    const f = i / samples;
    pts.push(`${toX(f).toFixed(1)},${toY(evalWarmupSirenSemi(wps, f)).toFixed(1)}`);
  }
  const fullPath = `M ${pts[0]} L ${pts.slice(1).join(" L ")}`;

  const activeFrac = progressFrac >= 0 ? Math.max(0, Math.min(1, progressFrac)) : 0;
  const curSemi = evalWarmupSirenSemi(wps, activeFrac);
  const dotX = toX(activeFrac);
  const dotY = toY(curSemi);

  let activePath = "";
  if (progressFrac >= 0) {
    const activePts = [];
    const activeSteps = Math.max(2, Math.round(samples * activeFrac));
    for (let i = 0; i <= activeSteps; i++) {
      const f = (i / activeSteps) * activeFrac;
      activePts.push(`${toX(f).toFixed(1)},${toY(evalWarmupSirenSemi(wps, f)).toFixed(1)}`);
    }
    activePath = `M ${activePts[0]} L ${activePts.slice(1).join(" L ")}`;
  }

  wrap.innerHTML = `
    <svg class="warmup-siren-svg" viewBox="0 0 280 94" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="${x0}" y1="${yTop}" x2="${x1}" y2="${yTop}" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" opacity="0.22"/>
      <line x1="${x0}" y1="${yBot}" x2="${x1}" y2="${yBot}" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" opacity="0.22"/>
      <text x="${x0 - 6}" y="${yTop + 4}" text-anchor="end" font-family="Andika, sans-serif" font-size="10.5" font-weight="700" fill="var(--lilac-strong, #8b7ec8)">${escapeHtml(highNoteLabel)}</text>
      <text x="${x0 - 6}" y="${yBot + 4}" text-anchor="end" font-family="Andika, sans-serif" font-size="10.5" font-weight="700" fill="currentColor" opacity="0.72">${escapeHtml(lowNoteLabel)}</text>
      <path class="warmup-siren-track" d="${fullPath}" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.22"/>
      <path id="warmupSirenActivePath" class="warmup-siren-active" d="${activePath}" fill="none" stroke="var(--lilac-strong, #8b7ec8)" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/>
      <circle id="warmupSirenGlow" cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="${progressFrac >= 0 ? 11 : 7}" fill="var(--peach-strong, #e07a5f)" opacity="${progressFrac >= 0 ? 0.28 : 0.16}"/>
      <circle id="warmupSirenDot" cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="5.6" fill="var(--peach-strong, #e07a5f)" stroke="var(--surface-white, #fff)" stroke-width="2"/>
    </svg>
  `;
}

function startWarmupSirenAnimation(step, tonicMidi, glideDurMs, token) {
  stopWarmupSirenAnimation();
  const wps = step.sirenWaypoints || [{ tFrac: 0, semi: 0 }, { tFrac: 0.5, semi: 7 }, { tFrac: 1, semi: 0 }];
  const maxSemi = Math.max(5, ...wps.map(p => p.semi || 0));
  const x0 = 34;
  const x1 = 248;
  const yBot = 74;
  const yTop = 20;
  const toX = (f) => x0 + f * (x1 - x0);
  const toY = (semi) => yBot - (semi / maxSemi) * (yBot - yTop);

  renderWarmupSirenStage(step, tonicMidi, 0);
  const startMs = (typeof performance !== "undefined" && typeof performance.now === "function") ? performance.now() : Date.now();
  const reducedMotion = Boolean(typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const tick = (nowMs) => {
    _warmupSirenRafId = null;
    if (!state.warmup || state.warmup.token !== token || state.warmup.status !== "running" || state.currentView !== "warmup") {
      return;
    }
    const frac = Math.max(0, Math.min(1, (nowMs - startMs) / Math.max(200, glideDurMs)));
    const curSemi = evalWarmupSirenSemi(wps, frac);
    const dot = document.getElementById("warmupSirenDot");
    const glow = document.getElementById("warmupSirenGlow");
    const activePath = document.getElementById("warmupSirenActivePath");

    if (dot && glow) {
      const cx = toX(frac).toFixed(1);
      const cy = toY(curSemi).toFixed(1);
      dot.setAttribute("cx", cx);
      dot.setAttribute("cy", cy);
      glow.setAttribute("cx", cx);
      glow.setAttribute("cy", cy);
      glow.setAttribute("r", reducedMotion ? "8" : String((10 + Math.sin(frac * Math.PI * 6) * 2).toFixed(1)));
    }
    if (activePath) {
      const stepsCount = Math.max(2, Math.round(44 * frac));
      const pts = [];
      for (let i = 0; i <= stepsCount; i++) {
        const f = (i / stepsCount) * frac;
        pts.push(`${toX(f).toFixed(1)},${toY(evalWarmupSirenSemi(wps, f)).toFixed(1)}`);
      }
      activePath.setAttribute("d", `M ${pts[0]} L ${pts.slice(1).join(" L ")}`);
    }

    const nearestMidi = Math.round(tonicMidi + curSemi);
    if (!state.warmup.activeMidis || state.warmup.activeMidis[0] !== nearestMidi) {
      state.warmup.activeMidis = [nearestMidi];
      updateWarmupKeyboardHighlights(tonicMidi, [nearestMidi]);
    }

    if (frac < 1) {
      _warmupSirenRafId = requestAnimationFrame(tick);
    }
  };

  _warmupSirenRafId = requestAnimationFrame(tick);
}

function clearWarmupTimers() {
  const w = state.warmup;
  if (!w) return;
  w.token += 1;
  stopWarmupBreathPhaseTimer();
  stopWarmupSirenAnimation();
  if (w.timerId !== null) {
    clearTimeout(w.timerId);
    w.timerId = null;
  }
  if (w.tickIntervalId !== null) {
    clearInterval(w.tickIntervalId);
    w.tickIntervalId = null;
  }
}

function scheduleWarmupCallback(fn, delayMs, expectedToken) {
  const w = state.warmup;
  if (!w) return;
  if (w.timerId !== null) {
    clearTimeout(w.timerId);
    w.timerId = null;
  }
  w.timerId = setTimeout(() => {
    w.timerId = null;
    if (!state.warmup || state.warmup.token !== expectedToken || state.warmup.status !== "running" || state.currentView !== "warmup") {
      return;
    }
    fn(expectedToken);
  }, Math.max(0, Math.round(delayMs)));
}

function toggleWarmupPopover(popoverId, btnId) {
  const target = document.getElementById(popoverId);
  if (!target) return;
  const wasHidden = target.classList.contains("hidden");
  closeTransientPopovers();
  if (wasHidden) {
    target.classList.remove("hidden");
    document.getElementById(btnId)?.classList.add("chip-open");
  }
}

function renderWarmupKeyboard(tonicMidi, activeMidis = []) {
  const wrap = document.getElementById("warmupKeyboardWrap");
  if (!wrap) return;

  const activeSet = new Set(Array.isArray(activeMidis) ? activeMidis : []);
  const startBase = Math.max(36, Math.min(72, (Number.isFinite(tonicMidi) ? tonicMidi : 60) - 2));
  const firstWhite = prevWhiteMidi(startBase);

  const whiteKeys = [];
  const blackKeys = [];
  let m = firstWhite;
  while (whiteKeys.length < 15 && m <= 96) {
    if (isWhiteMidi(m)) {
      whiteKeys.push({ midi: m, label: getWhiteNoteLabel(m % 12) });
    } else {
      blackKeys.push({ midi: m, afterWhiteIdx: whiteKeys.length - 1 });
    }
    m += 1;
  }

  const kb = document.createElement("div");
  kb.className = "warmup-kb";

  whiteKeys.forEach(wk => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "warmup-kb-white";
    btn.id = `warmupKey_${wk.midi}`;
    btn.dataset.midi = wk.midi;
    if (wk.midi === tonicMidi) btn.classList.add("is-tonic");
    if (activeSet.has(wk.midi)) btn.classList.add("is-active");

    const pc = ((wk.midi % 12) + 12) % 12;
    if (pc === 0) btn.classList.add("is-c-key");
    if (pc === 0 || wk.midi === tonicMidi) {
      const oct = Math.floor(wk.midi / 12) - 1;
      const lbl = document.createElement("span");
      lbl.className = "warmup-kb-note";
      lbl.textContent = pc === 0 ? `${wk.label}${oct}` : wk.label;
      btn.appendChild(lbl);
    }

    btn.addEventListener("click", () => auditionWarmupKeyboardNote(wk.midi));
    kb.appendChild(btn);
  });

  const whiteCount = whiteKeys.length || 15;
  const blackWidthPct = (100 / whiteCount) * 0.62;

  blackKeys.forEach(bk => {
    if (bk.afterWhiteIdx < 0 || bk.afterWhiteIdx >= whiteCount - 1) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "warmup-kb-black";
    btn.id = `warmupKey_${bk.midi}`;
    btn.dataset.midi = bk.midi;
    btn.style.left = `${((bk.afterWhiteIdx + 1) / whiteCount) * 100}%`;
    btn.style.width = `${blackWidthPct}%`;
    if (bk.midi === tonicMidi) btn.classList.add("is-tonic");
    if (activeSet.has(bk.midi)) btn.classList.add("is-active");

    btn.addEventListener("click", () => auditionWarmupKeyboardNote(bk.midi));
    kb.appendChild(btn);
  });

  wrap.innerHTML = "";
  wrap.appendChild(kb);
}

function updateWarmupKeyboardHighlights(tonicMidi, activeMidis = []) {
  const wrap = document.getElementById("warmupKeyboardWrap");
  if (!wrap) return;
  const hasTonicEl = document.getElementById(`warmupKey_${tonicMidi}`);
  const activeArr = Array.isArray(activeMidis) ? activeMidis : [];
  const missingActive = activeArr.some(m => !document.getElementById(`warmupKey_${m}`));
  if (!hasTonicEl || missingActive) {
    renderWarmupKeyboard(tonicMidi, activeArr);
    return;
  }
  const activeSet = new Set(activeArr);
  wrap.querySelectorAll("[data-midi]").forEach(el => {
    const midi = parseInt(el.dataset.midi, 10);
    el.classList.toggle("is-tonic", midi === tonicMidi);
    el.classList.toggle("is-active", activeSet.has(midi));
  });
}

async function auditionWarmupKeyboardNote(midi) {
  await ensureAudioReady();
  const w = state.warmup;
  audioEngine.playWarmupNotes(w.soundMode, [midiToNote(midi)], 0.85, false);
  w.activeMidis = [midi];
  updateWarmupKeyboardHighlights(w.currentTonicMidi, [midi]);
  const checkToken = w.token;
  setTimeout(() => {
    if (state.warmup.token === checkToken && state.warmup.status !== "running") {
      state.warmup.activeMidis = [];
      updateWarmupKeyboardHighlights(state.warmup.currentTonicMidi, []);
    }
  }, 550);
}

function syncWarmupCountdownDisplay(liveDecrementSec = 0) {
  const badge = document.getElementById("warmupRemainingBadge");
  if (!badge) return;
  const baseRem = getWarmupRemainingSec(state.warmup);
  const shown = Math.max(0, baseRem - Math.max(0, Math.floor(liveDecrementSec)));
  badge.textContent = `${formatSessionMMSS(shown)}`;
}

function renderWarmupView() {
  const w = state.warmup;
  if (!w) return;
  const preset = getLocalizedWarmupPreset(w.presetId);
  const steps = getWarmupStepsForPreset(w.presetId);
  const safeIdx = Math.max(0, Math.min(steps.length - 1, w.stepIndex));
  const step = steps[safeIdx];
  const phaseInfo = getWarmupPhaseInfo(step.phaseId);
  const voiceRange = getLocalizedWarmupVoiceRange(w.voiceRange);
  const soundMode = getLocalizedWarmupSoundMode(w.soundMode);
  const tonicMidi = getWarmupTonicMidi(step, w.keyOffsetIndex, w);
  w.currentTonicMidi = tonicMidi;

  const titleEl = document.getElementById("warmupTitleText");
  if (titleEl) titleEl.textContent = preset.title;

  const voiceBtn = document.getElementById("warmupVoiceBtn");
  if (voiceBtn) voiceBtn.textContent = voiceRange.label;
  document.querySelectorAll("[data-warmup-voice]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.warmupVoice === w.voiceRange);
  });

  const soundBtn = document.getElementById("warmupSoundBtn");
  if (soundBtn) soundBtn.textContent = soundMode.label;
  document.querySelectorAll("[data-warmup-sound]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.warmupSound === w.soundMode);
  });

  const bpmBtn = document.getElementById("warmupBpmBtn");
  const bpmSlider = document.getElementById("warmupBpmSlider");
  const bpmVal = document.getElementById("warmupBpmVal");
  if (bpmBtn) bpmBtn.textContent = `${w.bpm} BPM`;
  if (bpmSlider) bpmSlider.value = w.bpm;
  if (bpmVal) bpmVal.textContent = `${w.bpm} BPM`;

  syncWarmupCountdownDisplay(0);

  const pillsWrap = document.getElementById("warmupPhasePills");
  if (pillsWrap) {
    const activePhaseNum = phaseInfo.num;
    pillsWrap.innerHTML = WARMUP_PHASES.map(p => {
      const hasPhaseSteps = steps.some(s => s.phaseId === p.id);
      if (!hasPhaseSteps) return "";
      const cls = p.num < activePhaseNum ? "is-done" : (p.num === activePhaseNum ? "is-active" : "");
      return `<button type="button" class="warmup-phase-pill ${cls}" data-warmup-phase="${p.id}">${getWarmupPhasePillLabel(p, steps)}</button>`;
    }).join("");
    pillsWrap.querySelectorAll("[data-warmup-phase]").forEach(pill => {
      pill.addEventListener("click", () => {
        jumpToWarmupPhase(pill.dataset.warmupPhase);
      });
    });
  }

  const pct = w.status === "completed"
    ? 100
    : Math.round(((safeIdx + (w.keyOffsetIndex / Math.max(1, getWarmupStepRoundCount(step)))) / Math.max(1, steps.length)) * 100);
  const progressEl = document.getElementById("warmupProgressFill");
  if (progressEl) progressEl.style.width = `${Math.max(0, Math.min(100, pct))}%`;

  const counterEl = document.getElementById("warmupStepCounter");
  if (counterEl) {
    counterEl.textContent = w.status === "completed"
      ? tr("Fertig ✓", "Done ✓")
      : `${safeIdx + 1} / ${steps.length}`;
  }

  const isBreath = step.kind === "breath-orb" || step.kind === "breath-pulse";
  const isSiren = step.kind === "vocal-siren";
  const stageCard = document.getElementById("warmupStageCard");
  if (stageCard) {
    stageCard.className = `central-stage warmup-stage-card ${phaseInfo.cls}${isBreath && w.status !== "completed" ? " is-breath-step" : ""}${isSiren && w.status !== "completed" ? " is-siren-step" : ""}`;
  }

  const mascotEl = document.getElementById("warmupMascotWrap");
  if (mascotEl) {
    const mood = w.status === "completed" ? "happy" : (isBreath ? "break" : (w.status === "running" ? "listening" : "idle"));
    rotateMascotSlot(mascotEl, mood, false, { slot: "warmup", keepIfSameMood: true });
  }

  const phaseBadgeEl = document.getElementById("warmupPhaseBadge");
  if (phaseBadgeEl) {
    phaseBadgeEl.textContent = w.status === "completed"
      ? tr("TRAINING ABGESCHLOSSEN", "SESSION COMPLETE")
      : getWarmupStagePhaseLabel(step, phaseInfo);
  }

  const orbWrap = document.getElementById("warmupBreathOrbWrap");
  const orb = document.getElementById("warmupBreathOrb");
  const orbCue = document.getElementById("warmupBreathCue");
  const orbTimer = document.getElementById("warmupBreathTimer");
  if (orbWrap && orb && orbCue) {
    orbWrap.classList.toggle("hidden", !isBreath || w.status === "completed");
    orb.className = "warmup-breath-orb";
    if (w.breathCueKey === "inhale") orb.classList.add("is-inhale");
    else if (w.breathCueKey === "hold") orb.classList.add("is-hold");
    else if (w.breathCueKey === "exhale") orb.classList.add("is-exhale");
    else if (w.breathCueKey === "rest") orb.classList.add("is-rest");
    else if (w.breathCueKey === "pulse") orb.classList.add("is-pulse");
    orbCue.textContent = w.breathCueText || tr("Bereit", "Ready");
    if (orbTimer && (!isBreath || w.status !== "running")) {
      orbTimer.classList.add("hidden");
      orbTimer.textContent = "";
    }
  }

  const sirenWrap = document.getElementById("warmupSirenWrap");
  if (sirenWrap) {
    const showSiren = isSiren && w.status !== "completed";
    sirenWrap.classList.toggle("hidden", !showSiren);
    if (showSiren) {
      renderWarmupSirenStage(step, tonicMidi, -1);
    }
  }

  const titleStepEl = document.getElementById("warmupStepTitle");
  if (titleStepEl) {
    titleStepEl.textContent = w.status === "completed"
      ? tr("Stimme ist warm & bereit!", "Voice is warm & ready!")
      : tr(step.titleDe, step.titleEn);
  }

  const sylEl = document.getElementById("warmupSyllableMain");
  if (sylEl) {
    sylEl.textContent = w.status === "completed"
      ? tr("Bravo!", "Great job!")
      : (w.vowelLabel || tr(step.syllableDe, step.syllableEn));
  }

  const degEl = document.getElementById("warmupPatternDegrees");
  const showDeg = !isBreath && w.status !== "completed" && Boolean(step.degreesText);
  if (degEl) {
    degEl.classList.toggle("hidden", !showDeg);
    if (showDeg) degEl.textContent = step.degreesText;
  }

  const stepTonality = step.tonality === "minor" ? "minor" : "major";
  const keyInfo = getWarmupKeyNameFromMidi(tonicMidi, stepTonality);
  const noteText = midiToGermanNote(tonicMidi, keyInfo.preferFlat);
  const keyBadgeEl = document.getElementById("warmupKeyNoteBadge");
  const roundTotal = getWarmupStepRoundCount(step);
  const showKeyBadge = !isBreath && w.status !== "completed";
  if (keyBadgeEl) {
    keyBadgeEl.classList.toggle("hidden", !showKeyBadge);
    if (showKeyBadge) {
      keyBadgeEl.textContent = `${keyInfo.keyName} (${noteText}) • ${w.keyOffsetIndex + 1}/${roundTotal}`;
    }
  }
  const metaRow = document.getElementById("warmupMetaRow");
  if (metaRow) {
    metaRow.classList.toggle("hidden", !showDeg && !showKeyBadge);
  }

  const hintEl = document.getElementById("warmupStageHint");
  if (hintEl) {
    if (w.status === "completed") {
      hintEl.textContent = tr(
        "Viel Freude beim Singen und Musizieren! Tippe unten auf Starten für eine neue Runde.",
        "Have a great rehearsal or practice session! Tap below to restart anytime."
      );
    } else if (w.hintText) {
      hintEl.textContent = w.hintText;
    } else {
      hintEl.textContent = tr(step.hintDe, step.hintEn);
    }
  }

  const manualBar = document.getElementById("warmupManualBar");
  const kbWrap = document.getElementById("warmupKeyboardWrap");
  const hideTonalTools = isBreath;
  if (manualBar) manualBar.classList.toggle("hidden", isBreath || w.status === "completed");
  if (kbWrap) {
    kbWrap.classList.toggle("hidden", hideTonalTools || w.status === "completed");
    if (!hideTonalTools && w.status !== "completed") {
      renderWarmupKeyboard(tonicMidi, w.activeMidis);
    }
  }

  const playBtn = document.getElementById("warmupPlayBtn");
  if (playBtn) {
    if (w.status === "running") {
      playBtn.textContent = tr("⏸ Pause", "⏸ Pause");
      playBtn.classList.add("btn-stop");
    } else if (w.status === "paused") {
      playBtn.textContent = tr("▶ Weiter", "▶ Resume");
      playBtn.classList.remove("btn-stop");
    } else if (w.status === "completed") {
      playBtn.innerHTML = `${REFRESH_ICON_SVG}${escapeHtml(tr("Nochmal singen", "Sing Again"))}`;
      playBtn.classList.remove("btn-stop");
    } else {
      playBtn.textContent = tr("▶ Singen starten", "▶ Start Singing");
      playBtn.classList.remove("btn-stop");
    }
  }

  const prevBtn = document.getElementById("warmupPrevBtn");
  const nextBtn = document.getElementById("warmupNextBtn");
  if (prevBtn) prevBtn.disabled = safeIdx <= 0 && w.keyOffsetIndex <= 0;
  if (nextBtn) nextBtn.disabled = safeIdx >= steps.length - 1 && w.status === "completed";

  state.updateHeaderSubtext();
}

function getWarmupCueTriadMidis(tonicMidi, tonality = "major") {
  const third = tonality === "minor" ? 3 : 4;
  return [tonicMidi, tonicMidi + third, tonicMidi + 7];
}

function playWarmupTriadCue(tonicMidi, durSec, soundMode, tonality = "major") {
  const notes = getWarmupCueTriadMidis(tonicMidi, tonality).map(m => midiToNote(m));
  audioEngine.playWarmupNotes(soundMode, notes, durSec, true);
}

function playWarmupMajorTriadCue(tonicMidi, durSec, soundMode) {
  playWarmupTriadCue(tonicMidi, durSec, soundMode, "major");
}

function runCurrentWarmupRound() {
  const w = state.warmup;
  if (!w || w.status !== "running" || state.currentView !== "warmup") return;

  const steps = getWarmupStepsForPreset(w.presetId);
  if (w.stepIndex >= steps.length) {
    finishWarmupSession();
    return;
  }

  const step = steps[w.stepIndex];
  const roundCount = getWarmupStepRoundCount(step);
  if (w.keyOffsetIndex >= roundCount) {
    w.stepIndex += 1;
    w.keyOffsetIndex = 0;
    w.transposeShift = 0;
    runCurrentWarmupRound();
    return;
  }

  const token = w.token;
  const beatSec = 60 / Math.max(60, Math.min(140, w.bpm || WARMUP_DEFAULT_BPM));
  const beatMs = beatSec * 1000;
  const tonicMidi = getWarmupTonicMidi(step, w.keyOffsetIndex, w);
  const stepTonality = step.tonality === "minor" ? "minor" : "major";
  const keyInfo = getWarmupKeyNameFromMidi(tonicMidi, stepTonality);
  w.currentTonicMidi = tonicMidi;
  w.activeMidis = [];
  w.vowelLabel = "";
  w.breathCueKey = "idle";
  w.breathCueText = "";
  w.hintText = tr(step.hintDe, step.hintEn);
  w.roundStartedWallMs = Date.now();

  if (w.tickIntervalId !== null) clearInterval(w.tickIntervalId);
  w.tickIntervalId = setInterval(() => {
    if (!state.warmup || state.warmup.status !== "running" || state.warmup.token !== token) return;
    const elapsedSec = (Date.now() - state.warmup.roundStartedWallMs) / 1000;
    syncWarmupCountdownDisplay(elapsedSec);
  }, 500);

  renderWarmupView();

  const advanceRoundOrStep = () => {
    if (!state.warmup || state.warmup.token !== token || state.warmup.status !== "running") return;
    w.keyOffsetIndex += 1;
    resetMascotSlot("warmup");
    if (w.keyOffsetIndex >= roundCount) {
      w.stepIndex += 1;
      w.keyOffsetIndex = 0;
      w.transposeShift = 0;
    }
    runCurrentWarmupRound();
  };

  if (step.kind === "breath-orb") {
    const roundsList = Array.isArray(step.cycleRounds) && step.cycleRounds.length > 0
      ? step.cycleRounds
      : Array.from({ length: step.cycles || 3 }, () => ({
          labelDe: null,
          labelEn: null,
          phases: step.cyclePhases || []
        }));
    // Tiefes, erdendes Bass-Register (C2–H2 als Grundton) für ruhige Atemführung
    let breathBaseMidi = tonicMidi;
    while (breathBaseMidi > 47) breathBaseMidi -= 12;
    while (breathBaseMidi < 36) breathBaseMidi += 12;
    let cursorMs = 0;
    roundsList.forEach((rnd, rIdx) => {
      const roundLabel = rnd.labelDe
        ? `${tr(rnd.labelDe, rnd.labelEn)} (${rIdx + 1}/${roundsList.length})`
        : `${tr("Zyklus", "Cycle")} ${rIdx + 1}/${roundsList.length}`;
      (rnd.phases || []).forEach(p => {
        const atMs = cursorMs;
        const phaseMs = p.sec * 1000;
        cursorMs += phaseMs;
        audioEngine.registerTimer(() => {
          if (state.warmup.token !== token || state.warmup.status !== "running") return;
          w.breathCueKey = p.cue;
          w.breathCueText = tr(p.de, p.en);
          w.hintText = `${roundLabel} • ${tr(p.detailDe || step.hintDe, p.detailEn || step.hintEn)}`;
          const orb = document.getElementById("warmupBreathOrb");
          const cueEl = document.getElementById("warmupBreathCue");
          const hintEl = document.getElementById("warmupStageHint");
          if (orb) {
            orb.style.setProperty("--breath-dur", `${Math.max(0.4, p.sec * 0.94).toFixed(2)}s`);
            orb.className = "warmup-breath-orb";
            orb.classList.add(`is-${p.cue}`);
          }
          if (cueEl) cueEl.textContent = w.breathCueText;
          if (hintEl) hintEl.textContent = w.hintText;
          startWarmupBreathPhaseTimer(p.sec, token);
          if (p.cueNoteOffset !== null && p.cueNoteOffset !== undefined) {
            audioEngine.playWarmupBreathTone(breathBaseMidi + p.cueNoteOffset, p.sec, { phase: p.cue });
          }
        }, atMs);

        // Sanfte Orientierungs-Ticks alle N Sekunden bei sehr langen Ausatem-Phasen (z. B. 8–20 s)
        if (p.tickEverySec && p.sec >= p.tickEverySec * 2) {
          for (let secMark = p.tickEverySec; secMark < p.sec - 0.5; secMark += p.tickEverySec) {
            audioEngine.registerTimer(() => {
              if (state.warmup.token !== token || state.warmup.status !== "running") return;
              audioEngine.triggerPercussion("clave", null, 0.34);
            }, atMs + secMark * 1000);
          }
        }
      });
    });
    scheduleWarmupCallback(advanceRoundOrStep, cursorMs + 220, token);
    return;
  }

  if (step.kind === "breath-pulse") {
    const pulses = step.pulseCount || 4;
    const sustainBeats = step.sustainBeats || 0;
    let breathBaseMidi = tonicMidi;
    while (breathBaseMidi > 47) breathBaseMidi -= 12;
    while (breathBaseMidi < 36) breathBaseMidi += 12;

    for (let i = 0; i < pulses; i++) {
      audioEngine.registerTimer(() => {
        if (state.warmup.token !== token || state.warmup.status !== "running") return;
        stopWarmupBreathPhaseTimer();
        audioEngine.triggerPercussion(i === 0 ? "accent" : "clave", null, i === 0 ? 0.92 : 0.78);
        w.breathCueKey = "pulse";
        w.breathCueText = `${tr("Impuls", "Pulse")} ${i + 1}/${pulses}`;
        const orb = document.getElementById("warmupBreathOrb");
        const cueEl = document.getElementById("warmupBreathCue");
        const timerEl = document.getElementById("warmupBreathTimer");
        if (orb) {
          orb.className = "warmup-breath-orb is-pulse";
          setTimeout(() => orb.classList.remove("is-pulse"), Math.min(200, Math.round(beatMs * 0.4)));
        }
        if (cueEl) cueEl.textContent = w.breathCueText;
        if (timerEl) { timerEl.classList.add("hidden"); timerEl.textContent = ""; }
      }, i * beatMs);
    }

    if (sustainBeats > 0) {
      const sustainSec = (sustainBeats * beatMs) / 1000;
      audioEngine.registerTimer(() => {
        if (state.warmup.token !== token || state.warmup.status !== "running") return;
        w.breathCueKey = "exhale";
        w.breathCueText = tr("Halten: FFF!", "Sustain: FFF!");
        const orb = document.getElementById("warmupBreathOrb");
        const cueEl = document.getElementById("warmupBreathCue");
        if (orb) {
          orb.style.setProperty("--breath-dur", `${Math.max(0.5, sustainSec * 0.94).toFixed(2)}s`);
          orb.className = "warmup-breath-orb is-exhale";
        }
        if (cueEl) cueEl.textContent = w.breathCueText;
        startWarmupBreathPhaseTimer(sustainSec, token);
        audioEngine.playWarmupBreathTone(breathBaseMidi, sustainSec, { phase: "exhale" });
      }, pulses * beatMs);
    }

    audioEngine.registerTimer(() => {
      if (state.warmup.token !== token || state.warmup.status !== "running") return;
      stopWarmupBreathPhaseTimer();
      w.breathCueKey = "inhale";
      w.breathCueText = tr("Einatmen", "Breathe in");
      const cueEl = document.getElementById("warmupBreathCue");
      const orb = document.getElementById("warmupBreathOrb");
      const timerEl = document.getElementById("warmupBreathTimer");
      if (orb) {
        orb.style.setProperty("--breath-dur", `${Math.max(0.6, ((step.restBeats || 2.5) * beatMs) / 1000 * 0.85).toFixed(2)}s`);
        orb.className = "warmup-breath-orb is-inhale";
      }
      if (cueEl) cueEl.textContent = w.breathCueText;
      if (timerEl) { timerEl.classList.add("hidden"); timerEl.textContent = ""; }
    }, (pulses + sustainBeats) * beatMs);
    scheduleWarmupCallback(advanceRoundOrStep, (pulses + sustainBeats + (step.restBeats || 2.5)) * beatMs, token);
    return;
  }

  // Cue-Akkord + kurze Einatem-Lücke vor allen gesungenen Übungen
  const cueMs = (step.cueChordBeats || 1.25) * beatMs;
  const startVocalMs = cueMs + (step.breathGapBeats || 0.75) * beatMs;
  playWarmupTriadCue(tonicMidi, Math.max(0.55, cueMs / 1000 * 0.92), w.soundMode, stepTonality);
  w.activeMidis = getWarmupCueTriadMidis(tonicMidi, stepTonality);
  updateWarmupKeyboardHighlights(tonicMidi, w.activeMidis);

  if (step.kind === "vocal-siren") {
    const glideMs = (step.glideBeats || 6.0) * beatMs;
    const glideSec = glideMs / 1000;
    const waypoints = (step.sirenWaypoints || [{ tFrac: 0, semi: 0 }, { tFrac: 0.5, semi: 7 }, { tFrac: 1, semi: 0 }])
      .map(wp => ({ tFrac: wp.tFrac, midi: tonicMidi + (wp.semi || 0) }));

    audioEngine.registerTimer(() => {
      if (state.warmup.token !== token || state.warmup.status !== "running") return;
      audioEngine.playWarmupSirenGlide(waypoints, glideSec);
      startWarmupSirenAnimation(step, tonicMidi, glideMs, token);
    }, startVocalMs);

    const endMs = startVocalMs + glideMs + (step.postRestBeats || 0.9) * beatMs;
    scheduleWarmupCallback(advanceRoundOrStep, endMs, token);
    return;
  }

  if (step.kind === "vowel-blend") {
    const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
    const vowels = lang === "ar"
      ? (step.vowelsAr || step.vowelsEn)
      : lang === "ur"
        ? (step.vowelsUr || step.vowelsEn)
      : lang === "uk"
        ? (step.vowelsUk || step.vowelsEn)
        : lang === "tr"
          ? (step.vowelsTr || step.vowelsDe)
          : lang === "pl"
            ? (step.vowelsPl || step.vowelsEn)
          : lang === "it"
            ? (step.vowelsIt || step.vowelsDe)
            : lang === "es"
              ? (step.vowelsEs || step.vowelsDe)
              : lang === "fr"
                ? (step.vowelsFr || step.vowelsEn)
                : (lang === "en" ? step.vowelsEn : step.vowelsDe);
    const stepMs = (step.vowelStepBeats || 1.9) * beatMs;
    const tonicNote = midiToNote(tonicMidi);
    const subDomNotes = [midiToNote(tonicMidi), midiToNote(tonicMidi + 5), midiToNote(tonicMidi + 9)];
    const homeChordNotes = [midiToNote(tonicMidi), midiToNote(tonicMidi + 4), midiToNote(tonicMidi + 7)];

    audioEngine.registerTimer(() => {
      if (state.warmup.token !== token || state.warmup.status !== "running") return;
      audioEngine.playWarmupNotes(w.soundMode, [tonicNote], (vowels.length * stepMs) / 1000 * 0.96, false);
      w.activeMidis = [tonicMidi];
      updateWarmupKeyboardHighlights(tonicMidi, [tonicMidi]);
    }, startVocalMs);

    vowels.forEach((vLabel, vIdx) => {
      audioEngine.registerTimer(() => {
        if (state.warmup.token !== token || state.warmup.status !== "running") return;
        w.vowelLabel = vLabel;
        const sylEl = document.getElementById("warmupSyllableMain");
        if (sylEl) sylEl.textContent = vLabel;
        if (vIdx === 2) {
          audioEngine.playWarmupNotes("piano", subDomNotes, (stepMs * 2.08) / 1000, true, false, { legato: "chord" });
        } else if (vIdx === 4) {
          audioEngine.playWarmupNotes("piano", homeChordNotes, (stepMs * 1.45) / 1000, true, false, { legato: "chord" });
        }
      }, startVocalMs + vIdx * stepMs);
    });

    const endMs = startVocalMs + vowels.length * stepMs + (step.postRestBeats || 1.0) * beatMs;
    scheduleWarmupCallback(advanceRoundOrStep, endMs, token);
    return;
  }

  if (step.kind === "choir-cadence") {
    const cBeatMs = (step.cadenceBeat || 1.35) * beatMs;
    const sBeatMs = (step.stackStepBeats || 1.15) * beatMs;
    const holdMs = (step.holdBeats || 4.5) * beatMs;
    const bassMidi = Math.max(40, tonicMidi >= 48 ? tonicMidi - 12 : tonicMidi);
    const tenorMidi = bassMidi + 7;
    const altMidi = bassMidi + 12;
    const sopMidi = bassMidi + 16;

    const layers = [
      { midi: bassMidi, labelDe: "1. Bass: Grundton einstimmen",   labelEn: "1. Bass: Lock the root" },
      { midi: tenorMidi,labelDe: "2. Tenor: Reine Quinte darüber", labelEn: "2. Tenor: Pure 5th above" },
      { midi: altMidi,  labelDe: "3. Alt: Oktave einschwingen",    labelEn: "3. Alto: Blend the octave" },
      { midi: sopMidi,  labelDe: "4. Sopran: Strahlende Terz!",    labelEn: "4. Soprano: Shining major 3rd!" }
    ];

    const stackStartMs = cueMs + beatMs * 0.8;
    const accumulated = [];
    layers.forEach((layer, idx) => {
      audioEngine.registerTimer(() => {
        if (state.warmup.token !== token || state.warmup.status !== "running") return;
        accumulated.push(layer.midi);
        const isLast = idx === layers.length - 1;
        const holdNoteSec = ((layers.length - idx) * sBeatMs + holdMs) / 1000 * 0.94;
        audioEngine.playWarmupNotes(
          w.soundMode === "piano" ? "piano" : "voice",
          [midiToNote(layer.midi)],
          holdNoteSec,
          false
        );
        if (isLast && w.soundMode !== "voice") {
          audioEngine.playWarmupNotes(
            "piano-voice",
            accumulated.map(m => midiToNote(m)),
            holdMs / 1000 * 0.96,
            false,
            true
          );
        }
        w.activeMidis = accumulated.slice();
        w.hintText = `${tr(layer.labelDe, layer.labelEn)} (${keyInfo.keyName})`;
        const hintEl = document.getElementById("warmupStageHint");
        if (hintEl) hintEl.textContent = w.hintText;
        updateWarmupKeyboardHighlights(tonicMidi, w.activeMidis);
      }, stackStartMs + idx * sBeatMs);
    });

    const totalEndMs = stackStartMs + layers.length * sBeatMs + holdMs + (step.postRestBeats || 1.2) * beatMs;
    scheduleWarmupCallback(advanceRoundOrStep, totalEndMs, token);
    return;
  }

  // Standard vocal-pattern (Summen, Seufzer, Dreiklangs-Arpeggio, Oktav-Staccato, Cool-Down)
  const warmupBaseAudioTime = (audioEngine.getAudioTime?.() || 0) + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
  const warmupLookaheadMs = 85;
  let elapsedNoteMs = 0;
  const semiList = step.semitones || [];
  semiList.forEach((semi, nIdx) => {
    const isLastNote = nIdx === semiList.length - 1;
    const noteBeatDur = (step.noteBeats?.[nIdx] || 0.9) * beatMs;
    const isStaccato = Boolean(step.staccato && !isLastNote);
    const noteDurSec = isStaccato
      ? Math.max(0.20, (noteBeatDur / 1000) * 0.56)
      : Math.max(0.28, (noteBeatDur / 1000) * (isLastNote ? 1.02 : 1.07));
    const playMidi = tonicMidi + semi;
    const playAtMs = startVocalMs + elapsedNoteMs;
    const audioTimerDelayMs = Math.max(0, playAtMs - warmupLookaheadMs);
    const targetAudioTime = warmupBaseAudioTime + playAtMs / 1000;
    elapsedNoteMs += noteBeatDur;

    audioEngine.registerTimer(() => {
      if (state.warmup.token !== token || state.warmup.status !== "running") return;
      audioEngine.playWarmupNotes(w.soundMode, [midiToNote(playMidi)], noteDurSec, false, false, {
        atTime: targetAudioTime,
        legato: isStaccato ? false : "melody"
      });
    }, audioTimerDelayMs);

    audioEngine.registerTimer(() => {
      if (state.warmup.token !== token || state.warmup.status !== "running") return;
      w.activeMidis = [playMidi];
      updateWarmupKeyboardHighlights(tonicMidi, [playMidi]);
    }, playAtMs);
  });

  const roundEndMs = startVocalMs + elapsedNoteMs + (step.postRestBeats || 0.85) * beatMs;
  scheduleWarmupCallback(advanceRoundOrStep, roundEndMs, token);
}

async function startOrResumeWarmup() {
  const w = state.warmup;
  if (!w) return;
  if (w.status === "completed") {
    w.stepIndex = 0;
    w.keyOffsetIndex = 0;
    w.transposeShift = 0;
  }
  clearWarmupTimers();
  const entryToken = w.token;
  w.status = "running";
  renderWarmupView();

  await ensureAudioReady();
  if (!state.warmup || state.warmup.token !== entryToken || state.warmup.status !== "running" || state.currentView !== "warmup") {
    return;
  }
  runCurrentWarmupRound();
}

function pauseWarmupSession(options = {}) {
  const w = state.warmup;
  if (!w) return;
  clearWarmupTimers();
  if (!options.keepPlayback) {
    stopPlayback();
  }
  if (w.status === "running") {
    w.status = "paused";
  }
  w.activeMidis = [];
  if (state.currentView === "warmup") {
    renderWarmupView();
  }
}

function finishWarmupSession() {
  clearWarmupTimers();
  stopPlayback();
  const w = state.warmup;
  w.status = "completed";
  w.activeMidis = [];
  w.breathCueKey = "idle";
  w.vowelLabel = "";
  renderWarmupView();
  if (typeof recordAchievementEvent === "function") {
    recordAchievementEvent({ type: "warmup-finished", presetId: w.presetId });
  }
}

function toggleWarmupPlayPause() {
  if (state.warmup?.status === "running") {
    pauseWarmupSession();
  } else {
    startOrResumeWarmup();
  }
}

function jumpToWarmupPhase(phaseId) {
  const steps = getWarmupStepsForPreset(state.warmup.presetId);
  const idx = steps.findIndex(s => s.phaseId === phaseId);
  if (idx < 0) return;
  const wasRunning = state.warmup.status === "running";
  clearWarmupTimers();
  stopPlayback();
  state.warmup.stepIndex = idx;
  state.warmup.keyOffsetIndex = 0;
  state.warmup.transposeShift = 0;
  state.warmup.activeMidis = [];
  state.warmup.vowelLabel = "";
  state.warmup.breathCueKey = "idle";
  if (wasRunning) {
    startOrResumeWarmup();
  } else {
    if (state.warmup.status === "completed") state.warmup.status = "idle";
    renderWarmupView();
  }
}

function stepWarmupIndex(delta) {
  const steps = getWarmupStepsForPreset(state.warmup.presetId);
  const nextIdx = Math.max(0, Math.min(steps.length - 1, state.warmup.stepIndex + delta));
  const wasRunning = state.warmup.status === "running";
  clearWarmupTimers();
  stopPlayback();
  state.warmup.stepIndex = nextIdx;
  state.warmup.keyOffsetIndex = 0;
  state.warmup.transposeShift = 0;
  state.warmup.activeMidis = [];
  state.warmup.vowelLabel = "";
  state.warmup.breathCueKey = "idle";
  if (wasRunning) {
    startOrResumeWarmup();
  } else {
    if (state.warmup.status === "completed") state.warmup.status = "idle";
    renderWarmupView();
  }
}

async function replayWarmupRound() {
  const w = state.warmup;
  if (!w) return;
  if (w.status === "running") {
    clearWarmupTimers();
    stopPlayback();
    runCurrentWarmupRound();
    return;
  }
  await ensureAudioReady();
  const steps = getWarmupStepsForPreset(w.presetId);
  const step = steps[Math.max(0, Math.min(steps.length - 1, w.stepIndex))];
  const tonicMidi = getWarmupTonicMidi(step, w.keyOffsetIndex, w);
  const stepTonality = step?.tonality === "minor" ? "minor" : "major";
  playWarmupTriadCue(tonicMidi, 0.85, w.soundMode, stepTonality);
  w.activeMidis = getWarmupCueTriadMidis(tonicMidi, stepTonality);
  renderWarmupView();
}

async function shiftWarmupTranspose(deltaSemitones) {
  const w = state.warmup;
  if (!w) return;
  const steps = getWarmupStepsForPreset(w.presetId);
  const step = steps[Math.max(0, Math.min(steps.length - 1, w.stepIndex))];
  const nextShift = Math.max(-12, Math.min(12, (w.transposeShift || 0) + deltaSemitones));
  const previewTonic = getWarmupTonicMidi(step, w.keyOffsetIndex, { ...w, transposeShift: nextShift });
  if (previewTonic < 36 || previewTonic > 82) return;

  w.transposeShift = nextShift;
  if (w.status === "running") {
    clearWarmupTimers();
    stopPlayback();
    runCurrentWarmupRound();
  } else {
    renderWarmupView();
    await ensureAudioReady();
    const stepTonality = step?.tonality === "minor" ? "minor" : "major";
    playWarmupTriadCue(previewTonic, 0.75, w.soundMode, stepTonality);
  }
}

function setWarmupVoiceRange(voiceId) {
  if (!WARMUP_VOICE_RANGES[voiceId]) return;
  state.warmup.voiceRange = voiceId;
  state.warmup.transposeShift = 0;
  closeTransientPopovers();
  if (state.warmup.status === "running") {
    clearWarmupTimers();
    stopPlayback();
    runCurrentWarmupRound();
  } else {
    renderWarmupView();
  }
}

function setWarmupSoundMode(soundId) {
  if (!WARMUP_SOUND_MODES[soundId]) return;
  state.warmup.soundMode = soundId;
  closeTransientPopovers();
  renderWarmupView();
}

function setWarmupBpm(bpm) {
  const clamped = Math.max(65, Math.min(135, parseInt(bpm, 10) || WARMUP_DEFAULT_BPM));
  state.warmup.bpm = clamped;
  renderWarmupView();
}

function openWarmupView(presetId = "full-5min", options = {}) {
  clearWarmupTimers();
  stopPlayback();
  const validPreset = WARMUP_PRESETS.some(p => p.id === presetId) ? presetId : "full-5min";
  state.warmupReturnView = options.returnView || "category";
  state.warmup.presetId = validPreset;
  state.warmup.status = "idle";
  state.warmup.stepIndex = 0;
  state.warmup.keyOffsetIndex = 0;
  state.warmup.transposeShift = 0;
  state.warmup.activeMidis = [];
  state.warmup.breathCueKey = "idle";
  state.warmup.breathCueText = "";
  state.warmup.vowelLabel = "";
  state.warmup.hintText = "";
  switchView("warmup");
}

