/**
 * Lauscher • Wissens-Datenbank, Interaktive Referenzseiten & Artikel
 * Kombiniert Musiktheorie, Popmusik-Referenzen, Akustik/Physik und direkte Hörbeispiele.
 */

const LOCALIZED_KNOWLEDGE_BY_LANG = {};

function registerKnowledgeBundle(langCode, bundle) {
  if (!langCode || !bundle || typeof bundle !== "object") return;
  const prev = LOCALIZED_KNOWLEDGE_BY_LANG[langCode] || {};
  LOCALIZED_KNOWLEDGE_BY_LANG[langCode] = {
    data: { ...(prev.data || {}), ...(bundle.data || {}) },
    renderers: { ...(prev.renderers || {}), ...(bundle.renderers || {}) },
    circleData: bundle.circleData ? { ...(prev.circleData || {}), ...bundle.circleData } : prev.circleData,
    circleRoles: bundle.circleRoles ? { ...(prev.circleRoles || {}), ...bundle.circleRoles } : prev.circleRoles
  };
}

function pickLocalizedKnowledgeData(deValue, enValue, frValue, dataKey) {
  const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
  if (dataKey && LOCALIZED_KNOWLEDGE_BY_LANG[lang]?.data?.[dataKey] !== undefined) {
    return LOCALIZED_KNOWLEDGE_BY_LANG[lang].data[dataKey];
  }
  if (lang === "fr" && typeof frValue !== "undefined") return frValue;
  if (lang === "en" && typeof enValue !== "undefined") return enValue;
  if (lang !== "de" && typeof enValue !== "undefined") return enValue;
  return deValue;
}

function resolveLocalizedKnowledgeRender(enFn, frFn, ...args) {
  const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
  if (lang === "fr" && typeof frFn === "function") return frFn(...args);
  if (lang === "en" && typeof enFn === "function") return enFn(...args);
  if (lang !== "de" && typeof enFn === "function") return enFn(...args);
  return null;
}

function resolveRegisteredKnowledgeRender(renderKey, enFn, frFn, ...args) {
  const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
  const regFn = renderKey ? LOCALIZED_KNOWLEDGE_BY_LANG[lang]?.renderers?.[renderKey] : null;
  if (typeof regFn === "function") return regFn(...args);
  return resolveLocalizedKnowledgeRender(enFn, frFn, ...args);
}

const INTERVAL_ENCYCLOPEDIA = [
  {
    key: "P1",
    symbol: "P1",
    name: "Reine Prime",
    semitones: 0,
    ratio: "1 : 1",
    ratioExplain: "1 : 1 bedeutet: Beide Töne schwingen exakt gleich schnell. Während Ton 1 eine Schwingung macht, macht auch Ton 2 genau eine Schwingung – es ist derselbe Ton.",
    category: "pure",
    mood: "Vollkommene Verschmelzung, Ruhepunkt, Identität",
    physics: "Beide Töne haben exakt dieselbe Frequenz (z. B. 261,6 Hz und 261,6 Hz). Die Schallwellen liegen deckungsgleich übereinander.",
    songsAsc: "„One Note Samba“ (Strophenmelodie auf einem Ton), Anfang von „Thank You for the Music“ (ABBA – erste zwei Silben)",
    songsDesc: "Jeder wiederholte Ton in Rhythmus-Hooks (z. B. „Poker Face“ – Lady Gaga im Intro)"
  },
  {
    key: "m2",
    symbol: "m2",
    name: "Kleine Sekunde",
    semitones: 1,
    ratio: "16 : 15",
    ratioExplain: "16 : 15 bedeutet: Der höhere Ton schwingt nur minimal schneller als der tiefere. Erst nach 16 Schwingungen des höheren (bzw. 15 des tieferen) treffen sich ihre Wellenberge wieder – dazwischen reiben sie sich stark im Ohr.",
    category: "tension",
    mood: "Hochgradig gespannt, lauernd, geheimnisvoll oder drängend (Leitton!)",
    physics: "Erst nach 16 Schwingungen des oberen Tons treffen die Wellen wieder zusammen. Im Ohr liegen beide Töne so nah beieinander, dass eine deutliche akustische Reibung (Schwebung) entsteht.",
    songsAsc: "„Der weiße Hai“ (Jaws-Thema: Dü-düm…), „Pink Panther“ (Auftakt), „Für Elise“ (als Wechselnote E–Dis–E)",
    songsDesc: "„Für Elise“ (Beethoven – die ersten zwei Töne E → Dis), „Joy to the World“ (erster Schritt abwärts)"
  },
  {
    key: "M2",
    symbol: "M2",
    name: "Große Sekunde",
    semitones: 2,
    ratio: "9 : 8",
    ratioExplain: "9 : 8 bedeutet: Auf 8 Schwingungen des tieferen Tons kommen genau 9 Schwingungen des höheren Tons. Das ist noch nah beieinander, klingt aber schon wie ein klarer, offener Melodieschritt.",
    category: "major",
    mood: "Natürlicher Gehschritt, erzählerisch, offen, der Beginn einer Melodie",
    physics: "Das Verhältnis 9:8 entsteht, wenn man zwei reine Quinten übereinanderschichtet und eine Oktave abzieht. Es klingt wie eine sanfte Bewegung weg vom Grundton.",
    songsAsc: "„Happy Birthday“ (zweiter auf dritten Ton: „Hap-py BIRTH-day“), „Stille Nacht“, „Alle meine Entchen“ (C → D)",
    songsDesc: "„Yesterday“ (The Beatles – „Yes-ter-day“), „Mary Had a Little Lamb“"
  },
  {
    key: "m3",
    symbol: "m3",
    name: "Kleine Terz",
    semitones: 3,
    ratio: "6 : 5",
    ratioExplain: "6 : 5 bedeutet: Während der tiefere Ton 5-mal schwingt, schwingt der höhere Ton 6-mal. Ein einfaches, regelmäßiges Verhältnis, das unserem Ohr weich und harmonisch erscheint.",
    category: "minor",
    mood: "Nachdenklich, warm, melancholisch, aber auch erdig und intim",
    physics: "Mit 6:5 ist das Verhältnis noch sehr glatt (Konsonanz), liegt aber tiefer als die große Terz – das Grundrezept für jeden Moll-Akkord.",
    songsAsc: "„Seven Nation Army“ (The White Stripes – erster Sprung im Bass-Riff), „Greensleeves“, „Smoke on the Water“ (erster Schritt)",
    songsDesc: "„Kuckucksruf“ im Wald (und „Kuckuck, Kuckuck, ruft’s aus dem Wald“), „Hey Jude“ (The Beatles – „Hey Jude“)"
  },
  {
    key: "M3",
    symbol: "M3",
    name: "Große Terz",
    semitones: 4,
    ratio: "5 : 4",
    ratioExplain: "5 : 4 bedeutet: Auf 4 Wellen des tieferen Tons passen genau 5 Wellen des höheren Tons. Weil die Zahlen 5 und 4 so klein sind, verschmelzen beide Töne zu einem warmen, strahlenden Dur-Klang.",
    category: "major",
    mood: "Strahlend, freundlich, warm, zuversichtlich (das Herz jedes Dur-Akkords)",
    physics: "Das Verhältnis 5:4 taucht bereits als 5. Ton ganz von selbst in der natürlichen Obertonreihe jedes gesungenen oder gezupften Tons auf.",
    songsAsc: "„Oh When the Saints“, „Morning Has Broken“ (Cat Stevens), „Kumbaya“",
    songsDesc: "„Summertime“ (Gershwin), „Swing Low, Sweet Chariot“, Schicksalssinfonie (Beethoven – 5. Sinfonie)"
  },
  {
    key: "P4",
    symbol: "P4",
    name: "Reine Quarte",
    semitones: 5,
    ratio: "4 : 3",
    ratioExplain: "4 : 3 bedeutet: Während der tiefere Ton 3 Schwingungen macht, schafft der höhere Ton genau 4. Schon nach jedem 3. Wellenberg treffen sich beide Wellen wieder am selben Punkt!",
    category: "pure",
    mood: "Aufrufend, feierlich, fanfarenartig, offen",
    physics: "Als Umkehrung der Quinte in die Oktave hat die Quarte das sehr glatte Verhältnis 4:3. Allein gespielt wirkt sie extrem stabil, über einem Bass kann sie aber nach Auflösung in die Terz verlangen.",
    songsAsc: "„Here Comes the Bride“ (Hochzeitsmarsch), „Harry Potter“ (Hedwig’s Theme – erster Sprung), „Amazing Grace“",
    songsDesc: "„Eine kleine Nachtmusik“ (Mozart – 2. Intervall), „Oh Come, All Ye Faithful“"
  },
  {
    key: "TT",
    symbol: "TT",
    name: "Tritonus (Überm. Quarte)",
    semitones: 6,
    ratio: "ca. 45 : 32",
    ratioExplain: "45 : 32 bedeutet: Die beiden Wellen finden fast keinen gemeinsamen Rhythmus – erst nach 32 bzw. 45 Schwingungen treffen sie wieder aufeinander. Unser Ohr hört dieses ständige Gegeneinanderlaufen als knisternde Spannung!",
    category: "tension",
    mood: "Schwebend, mysteriös, elektrisierend, unaufgelöst",
    physics: "Teilt die Oktave exakt in der Mitte (6 Halbtöne). Da die Wellen kein einfaches gemeinsames Vielfaches haben, entsteht eine markante Reibung, die im Dominantseptakkord (V7) als Motor der Musik dient.",
    songsAsc: "„Die Simpsons“ (Titelmelodie: „The Simp-sons“), „Maria“ (West Side Story)",
    songsDesc: "„Black Sabbath“ (Intro-Riff), „YYZ“ (Rush)"
  },
  {
    key: "P5",
    symbol: "P5",
    name: "Reine Quinte",
    semitones: 7,
    ratio: "3 : 2",
    ratioExplain: "3 : 2 bedeutet: Der höhere Ton schwingt genau anderthalbmal (1,5x) so schnell wie der Grundton. Auf 2 lange Wellen unten passen exakt 3 kürzere Wellen oben – deshalb klingt die Quinte so felsenfest und rein!",
    category: "pure",
    mood: "Heroisch, kraftvoll, geerdet, kristallklar (die Basis für Powerchords)",
    physics: "Nach der Oktave das einfachste Zahlenverhältnis überhaupt (3:2). Der obere Ton schwingt genau 1,5-mal so schnell wie der Grundton – deshalb klingen selbst verzerrte E-Gitarren mit Quinten (Powerchords) sauber.",
    songsAsc: "„Star Wars“ (Main Theme), „Twinkle, Twinkle, Little Star“ (Morgen kommt der Weihnachtsmann), „Also sprach Zarathustra“",
    songsDesc: "„Familie Feuerstein“ (Flintstones), „Game of Thrones“ (Titelmelodie – erster Sprung abwärts)"
  },
  {
    key: "m6",
    symbol: "m6",
    name: "Kleine Sexte",
    semitones: 8,
    ratio: "8 : 5",
    ratioExplain: "8 : 5 bedeutet: Auf 5 Schwingungen des Grundtons kommen 8 Schwingungen des oberen Tons. Das Muster ist weich, weit gespannt und hat eine leicht sehnsüchtige Färbung.",
    category: "minor",
    mood: "Sehnsüchtig, dramatisch, bittersüß, filmisch-romantisch",
    physics: "Die Umkehrung der großen Terz (8:5). Sie verbindet weiten melodischen Raum mit einer weichen Moll-Färbung.",
    songsAsc: "„The Entertainer“ (Scott Joplin – nach dem Auftakt), „In My Life“ (The Beatles – Gitarren-Intro), „We Are Young“ (Fun.)",
    songsDesc: "„Love Story“ (Filmmelodie: Where Do I Begin)"
  },
  {
    key: "M6",
    symbol: "M6",
    name: "Große Sexte",
    semitones: 9,
    ratio: "5 : 3",
    ratioExplain: "5 : 3 bedeutet: Während der tiefere Ton 3-mal schwingt, schwingt der höhere Ton 5-mal. Durch die kleinen Zahlen 5 und 3 klingt dieses große Intervall besonders warm, rund und freundlich.",
    category: "major",
    mood: "Schwungvoll, warmherzig, pastoral, einladend",
    physics: "Das Verhältnis 5:3 ist eng mit der kleinen Terz verwandt und klingt sehr weich und gesanglich.",
    songsAsc: "„My Bonnie Lies Over the Ocean“, „Hallelujah“ (Leonard Cohen – Auftakt im Refrain), „Dashing Through the Snow“ (Jingle Bells)",
    songsDesc: "„Music of the Night“ (Phantom der Oper), „Man in the Mirror“ (Michael Jackson – „I’m gonna make a change“)"
  },
  {
    key: "m7",
    symbol: "m7",
    name: "Kleine Septime",
    semitones: 10,
    ratio: "16 : 9",
    ratioExplain: "16 : 9 (in der Naturtonreihe auch 7 : 4) bedeutet: Der obere Ton ist schon fast bei der doppelten Geschwindigkeit der Oktave (18:9 wäre 2:1), bleibt aber knapp darunter. Das sorgt für den typisch lässigen Blues- und Soul-Zug.",
    category: "tension",
    mood: "Bluesig, lässig, soulvoll, mit sanftem Zug nach unten",
    physics: "In der Naturtonreihe erscheint die Naturseptime sogar im Verhältnis 7:4. Sie nimmt der Musik die Strenge und gibt Blues, Funk und Jazz ihren entspannten Groove.",
    songsAsc: "„The Winner Takes It All“ (ABBA), „Somewhere“ (West Side Story – „There’s a place for us“), „Star Trek“ (Original-Thema)",
    songsDesc: "„Watermelon Man“ (Herbie Hancock)"
  },
  {
    key: "M7",
    symbol: "M7",
    name: "Große Septime",
    semitones: 11,
    ratio: "15 : 8",
    ratioExplain: "15 : 8 bedeutet: Es fehlt nur noch ein winziger Schritt bis zu 16 : 8 (also 2 : 1, der Oktave!). Weil beide Töne fast – aber eben noch nicht ganz – im Oktav-Gleichtakt schwingen, entsteht eine feine, schillernde Reibung.",
    category: "tension",
    mood: "Träumerisch-schwebend (im Maj7-Akkord) oder spitz-reibend (isoliert)",
    physics: "Nur einen Halbton unter der Oktave (15:8). Allein gespielt reibt sie stark, aber eingebettet in einen Dur-Dreiklang (Cmaj7) klingt sie wie schwerelose Lounge- oder Filmmusik.",
    songsAsc: "„Take On Me“ (a-ha – im Refrain), „Superman“ (Zwischenteil)",
    songsDesc: "„I Love You“ (Cole Porter)"
  },
  {
    key: "P8",
    symbol: "P8",
    name: "Reine Oktave",
    semitones: 12,
    ratio: "2 : 1",
    ratioExplain: "2 : 1 bedeutet: Der höhere Ton schwingt exakt doppelt so schnell wie der Grundton (seine Wellenlänge ist genau halb so lang). Auf jede lange Welle passen genau 2 kurze Wellen – sie verschmelzen fast wie ein einziger Ton!",
    category: "pure",
    mood: "Weite, Glanz, Abrundung – derselbe Ton auf einer höheren Ebene",
    physics: "Exakt doppelte Frequenz (2:1). Wenn Männer und Frauen oder Kinder und Erwachsene ein Lied „gemeinsam“ singen, singen sie meist automatisch im Oktavabstand.",
    songsAsc: "„Somewhere Over the Rainbow“ (Der Zauberer von Oz), „Singin’ in the Rain“",
    songsDesc: "„Willow Weep for Me“"
  },
  {
    key: "m9",
    symbol: "m9",
    name: "Kleine None",
    semitones: 13,
    ratio: "32 : 15",
    ratioExplain: "32 : 15 bedeutet: Der obere Ton schwingt etwas mehr als doppelt so schnell wie der Grundton (Oktave + kleine Sekunde). Die ungeraden Zahlen sorgen für eine dramatische, feurige Spannung.",
    category: "tension",
    mood: "Exotisch, dramatisch, hochgespannt (Flamenco- & Jazz-Spannung)",
    physics: "Eine Oktave plus eine kleine Sekunde. Durch den großen Abstand klingt sie etwas offener als die enge kleine Sekunde, behält aber ihre dunkle Schärfe.",
    songsAsc: "Verzierte Jazz-Dominanten (V7b9) und Flamenco-Gitarrenläufe",
    songsDesc: "Dramatische Filmmusik-Akzente"
  },
  {
    key: "M9",
    symbol: "M9",
    name: "Große None",
    semitones: 14,
    ratio: "9 : 4",
    ratioExplain: "9 : 4 bedeutet: Während der tiefe Grundton 4-mal schwingt, macht der hohe Ton 9 Schwingungen (mehr als doppelt so schnell). Das ergibt einen sehr offenen, edlen und schwebenden Klang.",
    category: "major",
    mood: "Luftig, modern, schwebend-edel (Pop- & Neo-Soul-Farbe)",
    physics: "Eine Oktave plus eine große Sekunde (oder zwei reine Quinten übereinander: C → G → D). Verleiht Akkorden (Add9 / Maj9) einen schimmernden, weiten Klang.",
    songsAsc: "„Every Breath You Take“ (The Police – das Gitarren-Arpeggio nutzt genau diese überstreckte None!)",
    songsDesc: "Moderne Pop- und R&B-Klavier-Voicings"
  }
];

const CADENCE_ENCYCLOPEDIA = [
  // Kategorie: Basis & Klassisch ('classic')
  {
    id: "authentic",
    category: "classic",
    name: "Die Klassische Vollkadenz",
    formula: "I – IV – V – I",
    tag: "Basis & Anker",
    tagClass: "tag-sage",
    bars: ["I", "IV", "V", "I"],
    whyItWorks: "Sie erzählt eine komplette Kurzgeschichte in vier Takten: **I (Tonika)** stellt das Zuhause vor. **IV (Subdominante)** öffnet die Tür und bricht auf. **V (Dominante)** erzeugt maximale Spannung durch den Leitton, und **I** löst diese Spannung befriedigend auf.",
    songs: [
      "„Twist and Shout“ – The Beatles (I – IV – V)",
      "„La Bamba“ – Ritchie Valens",
      "„Three Little Birds“ – Bob Marley",
      "Fast jedes klassische Kinder- und Volkslied"
    ]
  },
  {
    id: "plagal-amen",
    category: "classic",
    name: "Die Plagalkadenz („Amen-Schluss“)",
    formula: "I – IV – I",
    tag: "Warm & Erhaben",
    tagClass: "tag-sage",
    bars: ["I", "IV", "I"],
    whyItWorks: "Im Gegensatz zur spannungsreichen Dominante (**V**) fehlt der **IV** der scharfe Leitton zur Tonika. Deshalb wirkt der Übergang **IV → I** nicht dramatisch zugespitzt, sondern weich, tröstlich und fast feierlich – klassisch bekannt als das „Amen“ am Ende von Chorälen.",
    songs: [
      "„Hey Jude“ – The Beatles (langes „Na-na-na“-Outro mit bVII–IV–I)",
      "„Let It Be“ – The Beatles (Zwischenspiel F–C)",
      "Traditionelle Gospel- und Kirchenschlüsse („Amen“)"
    ]
  },
  {
    id: "half-cadence",
    category: "classic",
    name: "Der Halbschluss (Offene Frage)",
    formula: "I – IV – ii – V",
    tag: "Spannungsbogen",
    tagClass: "tag-peach",
    bars: ["I", "IV", "ii", "V"],
    whyItWorks: "Eine Phrase, die mitten auf der **Dominante (V)** stehen bleibt, wirkt wie ein Doppelpunkt in einem Satz: „…und gleich passiert es!“ Im Vers oder in der Pre-Chorus-Sektion sorgt der Halbschluss dafür, dass der Einstieg in den Refrain auf **I** wie eine Befreiung knallt.",
    songs: [
      "Klassische Sonaten-Hauptsätze (Mozart, Haydn)",
      "Fast jeder Pop-Pre-Chorus vor dem großen Refrain-Drop",
      "„Yesterday“ – The Beatles (Phrasenende auf der Dominante)"
    ]
  },
  {
    id: "pachelbel",
    category: "classic",
    name: "Die Pachelbel-Sequenz",
    formula: "I – V – vi – iii – IV – I – IV – V",
    tag: "Barock bis Pop",
    tagClass: "tag-lilac",
    bars: ["I", "V", "vi", "iii", "IV", "I", "IV", "V"],
    stepMs: 1500,
    chordDur: 1.38,
    whyItWorks: "Eine geniale Basslinie aus dem Jahr 1680: Der Bass schreitet abwechselnd abwärts und in Quarten voran (**C → G → A → E → F → C → F → G**). Jeder Schritt verzahnt sich nahtlos mit dem nächsten, sodass die ganze achttaktige Kette gleichzeitig beruhigend und endlos vorwärtstreibend klingt.",
    songs: [
      "„Kanon in D“ – Johann Pachelbel",
      "„Basket Case“ – Green Day",
      "„Memories“ – Maroon 5",
      "„Go West“ – Village People / Pet Shop Boys"
    ]
  },

  // Kategorie: Pop & Evergreen ('pop')
  {
    id: "pop4",
    category: "pop",
    name: "Die „4-Chords“ Pop-Hymne",
    formula: "I – V – vi – IV",
    tag: "Pop-Klassiker",
    tagClass: "tag-peach",
    bars: ["I", "V", "vi", "IV"],
    whyItWorks: "Die wohl erfolgreichste Akkordfolge der letzten 50 Jahre! Der Trick: In der Mitte steckt ein **Trugschluss (V → vi)**, der für Herzschmerz und Emotion sorgt. Und weil sie auf der offenen **IV** endet statt auf der **I**, kommt sie nie ganz zur Ruhe – man will den Refrain endlos im Loop hören.",
    songs: [
      "„Let It Be“ – The Beatles (Strophe)",
      "„Someone Like You“ – Adele (Refrain)",
      "„With or Without You“ – U2",
      "„No Woman, No Cry“ – Bob Marley",
      "„Don’t Stop Believin’“ – Journey"
    ]
  },
  {
    id: "doowop",
    category: "pop",
    name: "Die 50s / Soul-Progression",
    formula: "I – vi – IV – V",
    tag: "Soul & Retro",
    tagClass: "tag-lilac",
    bars: ["I", "vi", "IV", "V"],
    whyItWorks: "Von der strahlenden Tonika (**I**) gleitet man sanft in die verwandte Moll-Parallele (**vi**) – beide teilen sich zwei von drei Tönen! Danach baut sich über **IV** und **V** ein unwiderstehlicher Sog zurück zum Anfang auf.",
    songs: [
      "„Stand By Me“ – Ben E. King",
      "„Every Breath You Take“ – The Police",
      "„Unchained Melody“ – The Righteous Brothers",
      "„Happiness Is a Warm Gun“ – The Beatles (Outro)"
    ]
  },
  {
    id: "sad-pop",
    category: "pop",
    name: "Die emotionale Moll-Start-Folge",
    formula: "vi – IV – I – V",
    tag: "Melancholie & Power",
    tagClass: "tag-lilac",
    bars: ["vi", "IV", "I", "V"],
    whyItWorks: "Spannend: Es sind exakt dieselben vier Akkorde wie bei „I – V – vi – IV“ – aber die Schleife beginnt auf der **Moll-Parallele (vi)**. Dadurch wechselt die Grundstimmung sofort von strahlendem Optimismus zu nachdenklicher Sehnsucht, obwohl sich über die **I** und **V** wieder gewaltige Energie aufbaut.",
    songs: [
      "„Zombie“ – The Cranberries (Em – C – G – D)",
      "„Save Tonight“ – Eagle-Eye Cherry",
      "„Numb“ – Linkin Park",
      "„Hello“ – Adele (Strophe)"
    ]
  },
  {
    id: "minor-plagal",
    category: "pop",
    name: "Die nostalgische Moll-Subdominante",
    formula: "I – IV – iv – I",
    tag: "Bittersüß & Hollywood",
    tagClass: "tag-peach",
    bars: ["I", "IV", "iv", "I"],
    whyItWorks: "Einer der rührendsten Tricks der Harmonielehre: Erst geht es optimistisch zur **IV (F-Dur)**, doch dann färbt sich genau dieser Akkord überraschend zu **iv (F-Moll)** um – man spricht von *Modal Interchange* (Ausleihe aus C-Moll). Dabei sinkt der Ton **A** um einen Halbton auf **As** und zieht zärtlich zurück zum **G** der Tonika.",
    songs: [
      "„In My Life“ – The Beatles",
      "„Don’t Look Back in Anger“ – Oasis (Pre-Chorus F → Fm → C)",
      "„Wake Me Up When September Ends“ – Green Day",
      "Klassische Disney-Balladen & alte Filmabspänne"
    ]
  },
  {
    id: "creep-chromatic",
    category: "pop",
    name: "Die Chromatische Steigerung („Creep“)",
    formula: "I – III7 – IV – iv",
    tag: "Herzschmerz-Klassiker",
    tagClass: "tag-lilac",
    bars: ["I", "III7", "IV", "iv"],
    whyItWorks: "Höre auf die versteckte innere Stimme: Im C-Dur (**I**) liegt das **G**, der ungewohnte Dur-Akkord **E7 (III7)** hebt es zum **Gis**, **F-Dur (IV)** steigt weiter zum **A**, und **F-Moll (iv)** lässt es wehmütig zum **As** sinken. Eine unauffällige Melodielinie (**G → Gis → A → As**) hält den ganzen Song emotional zusammen.",
    songs: [
      "„Creep“ – Radiohead",
      "„The Air That I Breathe“ – The Hollies",
      "„Get Free“ – Lana Del Rey"
    ]
  },
  {
    id: "royal-road",
    category: "pop",
    name: "Die „Royal Road“ (Oudou Shinkou)",
    formula: "IV – V – iii – vi",
    tag: "J-Pop & Anime-Hymne",
    tagClass: "tag-sage",
    bars: ["IV", "V", "iii", "vi"],
    whyItWorks: "In Japan gilt sie als Königsweg unter den Akkordfolgen: Sie startet gleich energiegeladen auf der **IV**, stürmt über die **V**, landet aber nicht auf der sicheren **I**, sondern gleitet schwebend durch **iii** und **vi**. Das verhindert endgültige Ruhe und erzeugt dieses typisch euphorisch-sehnsüchtige Gefühl moderner Soundtracks.",
    songs: [
      "„Stay With Me“ – Miki Matsubara (City Pop)",
      "„Never Gonna Give You Up“ – Rick Astley (Refrain)",
      "Unzählige Anime-Openings & Nintendo-Soundtracks (z. B. Mario Kart / Zelda)"
    ]
  },
  {
    id: "sus4-resolve",
    category: "pop",
    name: "Die Vorhalt-Auflösung (sus4)",
    formula: "I – IV – Vsus4 – V – I",
    tag: "Elegante Spannung",
    tagClass: "tag-sage",
    bars: ["I", "IV", "Vsus4", "V", "I"],
    whyItWorks: "Bei **Vsus4** wird die große Terz des Dominantakkords (das **H** in G-Dur) kurz zurückgehalten und durch die Quarte (**C**) ersetzt. Dadurch entsteht eine schwebende, metallische Spannung, die sich im nächsten Schlag durch den winzigen Schritt **C → H** befreiend in die echte Dominante **V** und dann zur **I** entlädt.",
    songs: [
      "„Crazy Little Thing Called Love“ – Queen",
      "„Pinball Wizard“ – The Who",
      "„The Scientist“ / Piano-Hymnen von Coldplay"
    ]
  },

  // Kategorie: Film & Epik ('epic')
  {
    id: "deceptive",
    category: "epic",
    name: "Der Trugschluss",
    formula: "I – IV – V – vi",
    tag: "Emotionaler Twist",
    tagClass: "tag-lilac",
    bars: ["I", "IV", "V", "vi"],
    whyItWorks: "Nach **I – IV – V** ist unser Gehirn zu 100 % darauf programmiert, den erlösenden Dur-Akkord (**I**) zu hören. Der Leitton löst sich zwar tatsächlich in den Grundton C auf – aber darunter legt der Bass ein **A** statt eines **C** (A-Moll statt C-Dur). Das Ergebnis: Ein überraschender, nachdenklicher Gänsehaut-Moment.",
    songs: [
      "„Hallelujah“ – Leonard Cohen (an der Stelle „the minor fall, the major lift…“)",
      "„Livin’ on a Prayer“ – Bon Jovi",
      "Zahlreiche Filmmusik-Höhepunkte (Hans Zimmer, John Williams)"
    ]
  },
  {
    id: "mario-cadence",
    category: "epic",
    name: "Die „Mario-Kadenz“ (Siegesfanfare)",
    formula: "I – bVI – bVII – I",
    tag: "Videospiel & Fanfare",
    tagClass: "tag-peach",
    bars: ["I", "bVI", "bVII", "I"],
    whyItWorks: "Hier tauchen mit **bVI (As-Dur)** und **bVII (B-Dur)** plötzlich zwei kräftige Dur-Akkorde aus der Moll-Welt auf. Wenn der Bass heroisch in Ganztonschritten aufwärts marschiert (**As → B → C**), entsteht sofort dieses triumphale Gefühl von Sieg, Abenteuer und Level-geschafft!",
    songs: [
      "„Super Mario Bros.“ – Level-Clear-Fanfare (Nintendo)",
      "„With a Little Help from My Friends“ – The Beatles / Joe Cocker (Schluss)",
      "„P.S. I Love You“ – The Beatles & klassische Rock-Outros"
    ]
  },
  {
    id: "mixolydian-rock",
    category: "epic",
    name: "Die Stadion-Rock-Kadenz (Mixolydisch)",
    formula: "I – bVII – IV – I",
    tag: "Rock & Groove",
    tagClass: "tag-sage",
    bars: ["I", "bVII", "IV", "I"],
    whyItWorks: "Kein spitzer Leitton, kein steifer Schulbuch-Schluss: Durch die **bVII (B-Dur statt G-Dur)** bekommt C-Dur einen erdigen, rebellischen Rock-Charakter (mixolydische Skala). Von der **I** fällt man lässig einen Ganzton tiefer auf die **bVII** und rollt über die **IV** wuchtig nach Hause.",
    songs: [
      "„Sweet Child o’ Mine“ – Guns N’ Roses",
      "„Sympathy for the Devil“ – The Rolling Stones",
      "„Hey Jude“ – The Beatles (Refrain-Outro)",
      "„Royals“ – Lorde"
    ]
  },
  {
    id: "andalusian",
    category: "epic",
    name: "Die Andalusische Kadenz",
    formula: "vi – V – IV – III7",
    tag: "Flamenco & Drama",
    tagClass: "tag-peach",
    bars: ["vi", "V", "IV", "III7"],
    whyItWorks: "Seit Jahrhunderten der Inbegriff von Leidenschaft und Drama: Der Bass rutscht unaufhaltsam stufenweise bergab (**A → G → F → E**), bis der feurige Dur-Akkord **E7 (III7)** den Blick scharf nach oben reißt und den Kreislauf von vorn entfacht.",
    songs: [
      "„Hit the Road Jack“ – Ray Charles",
      "„Smooth Criminal“ – Michael Jackson",
      "„Sultans of Swing“ – Dire Straits (Ende des Verses)",
      "„Stairway to Heaven“ – Led Zeppelin (Rock-Finale)"
    ]
  },

  // Kategorie: Jazz & Blues ('jazz')
  {
    id: "jazz251",
    category: "jazz",
    name: "Der Jazz-Turnaround",
    formula: "ii – V7 – I – I",
    tag: "Jazz & Groove",
    tagClass: "tag-sage",
    bars: ["ii", "V7", "I", "I"],
    whyItWorks: "Im Jazz und Soul ersetzt die weiche Moll-Subdominante (**ii**, in C-Dur: Dm) oft die normale IV. Von **ii** nach **V7** nach **I** fällt der Bass jeweils um eine reine Quinte nach unten (D → G → C) – die natürlichste Schwerkraftbewegung der westlichen Musik.",
    songs: [
      "„Sunday Morning“ – Maroon 5 (das komplette Lied besteht fast nur aus ii – V7 – I!)",
      "„Autumn Leaves“ – Jazz-Standard",
      "„Fly Me to the Moon“ – Frank Sinatra"
    ]
  },
  {
    id: "jazz1625",
    category: "jazz",
    name: "Der Swing-Standard (I–vi–ii–V)",
    formula: "Imaj7 – vi – ii – V7 – Imaj7",
    tag: "Swing & Standards",
    tagClass: "tag-lilac",
    bars: ["Imaj7", "vi", "ii", "V7", "Imaj7"],
    whyItWorks: "Die erwachsene Jazz-Schwester der 50s-Progression: Die große Septime in **Imaj7 (Cmaj7)** veredelt das Zuhause mit einem schimmernden Glanz, bevor **vi → ii → V7** entlang des Quintenzirkels butterweich durch den Takt schwingt.",
    songs: [
      "„I Got Rhythm“ – George Gershwin (Rhythm Changes)",
      "„Blue Moon“ – Richard Rodgers",
      "„Heart and Soul“ – Hoagy Carmichael"
    ]
  },
  {
    id: "tritonesub",
    category: "jazz",
    name: "Die Tritonussubstitution",
    formula: "ii – bII7 – I – I",
    tag: "Jazz-Geheimwaffe",
    tagClass: "tag-peach",
    bars: ["ii", "bII7", "I", "I"],
    whyItWorks: "Warum darf man in C-Dur statt **G7 (V7)** einfach **Des7 (bII7)** spielen? Weil beide Akkorde exakt denselben **Tritonus (F und H / Ces)** im Bauch tragen! Gleichzeitig gleitet der Bass nun butterweich in Halbtonschritten abwärts: **D → Des → C**.",
    songs: [
      "„The Girl from Ipanema“ – Antônio Carlos Jobim",
      "Typische Schlusswendungen in Lo-Fi Hip-Hop, Neo-Soul und Gospel"
    ]
  },
  {
    id: "blues12",
    category: "jazz",
    name: "Die Blues-Kadenz (Dominant-Blues)",
    formula: "I7 – IV7 – I7 – V7 – IV7 – I7",
    tag: "Blues & Rock’n’Roll",
    tagClass: "tag-peach",
    bars: ["I7", "IV7", "I7", "V7", "IV7", "I7"],
    whyItWorks: "Das Regelbuch der Klassik sagt: Nur die V bekommt eine kleine Septime (**V7**). Der Blues wirft diese Regel über Bord und gibt allen drei Grundakkorden (**I7, IV7, V7**) diese raue, erdige Reibung zwischen großer Terz und kleiner Septime – daraus entsteht genau das unnachahmliche Blues-Gefühl.",
    songs: [
      "„Johnny B. Goode“ – Chuck Berry",
      "„Hound Dog“ – Elvis Presley",
      "„Sweet Home Chicago“ – Robert Johnson / Blues Brothers"
    ]
  }
];

/**
 * Solfège-Stufen mit funktionalem Auflösungsweg zur Tonika:
 * - Do bis Fa lösen stufenweise nach unten zum unteren Do (0) auf.
 * - Sol bis Ti lösen stufenweise nach oben zum oberen Do (12) auf.
 */
const SOLFEGE_STEPS = [
  {
    syllable: "Do",
    degree: "1. Stufe (Grundton)",
    semitones: 0,
    resolvePath: [0],
    resolveDesc: "Ruht bereits in der Tonika (Do wird zur Bestätigung nochmals angeschlagen)",
    color: "sage",
    character: "Fels in der Brandung, Ruhepol, Zuhause",
    desc: "Alle anderen Töne beziehen ihre Spannung nur aus ihrem Verhältnis zu Do. Wenn eine Melodie auf Do endet, atmet das Ohr aus."
  },
  {
    syllable: "Re",
    degree: "2. Stufe",
    semitones: 2,
    resolvePath: [2, 0],
    resolveDesc: "Auflösung abwärts zur Tonika: Re → Do",
    color: "peach",
    character: "Schwebend, fragend, auf dem Weg",
    desc: "Re steht zwischen Do und Mi. Bleibt eine Melodie auf Re stehen, klingt sie offen – sie zieht sanft einen Schritt zurück nach unten in die Tonika (Re → Do)."
  },
  {
    syllable: "Mi",
    degree: "3. Stufe (Dur-Terz)",
    semitones: 4,
    resolvePath: [4, 2, 0],
    resolveDesc: "Auflösung abwärts über die Tonleiter: Mi → Re → Do",
    color: "sage",
    character: "Warm, leuchtend, tröstend, stabil",
    desc: "Mi entscheidet über das Geschlecht der Tonart (Dur). Auf dem Weg nach Hause wandert er über Re sanft hinab zum Grundton Do."
  },
  {
    syllable: "Fa",
    degree: "4. Stufe (Quarte)",
    semitones: 5,
    resolvePath: [5, 4, 2, 0],
    resolveDesc: "Auflösung abwärts zur Tonika: Fa → Mi → Re → Do",
    color: "peach",
    character: "Gewichtig, ernst, mit Zug nach unten",
    desc: "Fa liegt nur einen Halbton über Mi! Dadurch wirkt auf Fa eine spürbare Schwerkraft nach unten: Er fällt zunächst nach Mi und wandert weiter über Re nach Do."
  },
  {
    syllable: "Sol",
    degree: "5. Stufe (Quinte)",
    semitones: 7,
    resolvePath: [7, 9, 11, 12],
    resolveDesc: "Auflösung aufwärts zur oberen Tonika: Sol → La → Ti → Do",
    color: "sage",
    character: "Strahlend, offen, kräftig, zweiter Anker",
    desc: "Ab Sol zieht die melodische Linie in der oberen Hälfte der Oktave nach oben zum hohen Do (Sol → La → Ti → Do)."
  },
  {
    syllable: "La",
    degree: "6. Stufe (Sexte / Moll-Parallele)",
    semitones: 9,
    resolvePath: [9, 11, 12],
    resolveDesc: "Auflösung aufwärts zur oberen Tonika: La → Ti → Do",
    color: "lilac",
    character: "Lyrisch, weich, ein Hauch Melancholie",
    desc: "La ist gleichzeitig der Grundton der parallelen Moll-Tonart. Im funktionalen Hören strebt La über den Leitton Ti nach oben in das helle Do."
  },
  {
    syllable: "Ti",
    degree: "7. Stufe (Leitton)",
    semitones: 11,
    resolvePath: [11, 12],
    resolveDesc: "Direkte Leitton-Auflösung aufwärts: Ti → Do",
    color: "peach",
    character: "Magnetisch, spitz, drängend nach oben",
    desc: "Ti liegt nur einen einzigen Halbton unter dem oberen Do. Kein anderer Ton hat einen so starken Drang nach Auflösung wie Ti → Do!"
  }
];

const KNOWLEDGE_ARTICLES = [
  {
    id: "art-why-ear-training",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a6 6 0 1 1 11.4 2.5c-.6 1.3-1.4 1.9-1.9 3.1-.4 1-.5 2.4-1.7 3.2A2.5 2.5 0 0 1 10 15"/><path d="M10.5 8.5a2.2 2.2 0 0 1 4 1.2c0 .9-.6 1.4-1 2.2"/><path d="M19.5 6.5a8 8 0 0 1 0 7"/></svg>`,
    badgeClass: "badge-sage",
    title: "Warum überhaupt Gehörbildung?",
    subtitle: "Was trainierte Ohren dir bringen, für wen sie geeignet sind und wie du startest",
    tag: "Grundlagen & Motivation",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Warum Gehörbildung?</span>
        <h2>Die Brücke zwischen deinem Kopf und der Musik</h2>
        <p class="article-lead">
          Vielleicht kennst du das: Du hast eine Melodie im Kopf oder hörst einen Lieblingssong – doch am Instrument musst du erst lange herumprobieren, bis du die richtigen Töne findest. <strong>Gehörbildung</strong> trainiert genau diese Verbindung: Was dein Ohr wahrnimmt, verstehst du sofort als Muster, Spannung und Rhythmus.
        </p>

        <h3>Was bringt dir Gehörbildung ganz konkret?</h3>
        <ul class="article-steps-list">
          <li><strong>Melodien &amp; Songs schneller heraushören:</strong> Statt jeden Ton einzeln zu raten, erkennst du sofort Sprünge (<em>„Das ist eine Quinte aufwärts!“</em>) und typische Akkordfolgen (<em>„Das ist I–V–vi–IV!“</em>).</li>
          <li><strong>Freier spielen, improvisieren &amp; komponieren:</strong> Wer weiß, wie sich eine Subdominante, ein Leitton oder eine Synkope anfühlt, findet beim Jammen, Songwriting oder in der DAW zielsicher den nächsten passenden Klang.</li>
          <li><strong>Sauberer singen &amp; sicherer zusammenspielen:</strong> Dein Ohr merkt früher, ob ein Ton wirklich stimmt, wie zwei Stimmen zusammen verschmelzen und wo in einer Band der gemeinsame Puls liegt.</li>
          <li><strong>Noten und Akkordsymbole innerlich hören:</strong> Ein Akkordblatt oder eine Melodie bleibt kein stummer Text mehr – du hörst beim Lesen innerlich mit, was gleich passieren wird.</li>
        </ul>

        <h3>Für wen ist dieses Training geeignet?</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Einsteiger &amp; Neugierige (ab ca. 8 Jahren)</h5>
            <p>Du brauchst weder jahrelangen Unterricht noch perfekte Notenkenntnisse. Du lernst spielerisch durch Hören, Vergleichen und Staunen – und baust von Anfang an echtes Klangverständnis auf.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Instrumentalist:innen &amp; Sänger:innen</h5>
            <p>Ideal, wenn du Gitarre, Klavier, Blasinstrumente oder Gesang spielst, unabhängiger von Noten werden willst und harmonische Zusammenhänge im Band- oder Choralltag direkt spüren möchtest.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>Songwriter, Beatmaker &amp; Produzent:innen</h5>
            <p>In der DAW hilft geschultes Hören beim Erkennen von Kadenzen, Basslines, Grooves und Frequenz-Rollen von Kick, Snare und Percussion.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Fortgeschrittene &amp; Prüfungsvorbereitung</h5>
            <p>Mit Stufen bis zur Tritonussubstitution, allen chromatischen Intervallen und freien Tonartwechseln im Solfège-Modul trainierst du gezielt auch anspruchsvolles Material.</p>
          </div>
        </div>

        <h3>Der größte Mythos: Braucht man ein „absolutes Gehör“?</h3>
        <p>
          <strong>Nein!</strong> Ein absolutes Gehör (einen einzelnen Ton völlig ohne Vergleich mit Namen zu nennen) haben nur sehr wenige Menschen – und im musikalischen Alltag braucht man es kaum. Fast die gesamte Musik lebt vom <strong>relativen (funktionalen) Hören</strong>: Wie verhalten sich Töne und Akkorde <em>zueinander</em>?
        </p>

        <div class="article-highlight-box">
          <h4>Sofort-Beweis: Dein Ohr erkennt Beziehungen automatisch</h4>
          <p>Egal ob in C-Dur oder in F-Dur: Sobald du einen Zusammenhang hörst, spürt dein Ohr die Spannung der Dominante (<strong>V</strong>) und das Heimkommen auf der Tonika (<strong>I</strong>):</p>
          <button class="btn-tool" data-play-progression="I,IV,V7,I">▶ Vollkadenz (I – IV – V7 – I) anhören</button>
        </div>

        <h3>So wirst du spürbar besser (Die 10-Minuten-Regel)</h3>
        <ul class="article-steps-list">
          <li><strong>Lieber oft kurz als selten lang:</strong> 5 bis 10 Minuten an vier Tagen pro Woche schlagen eine zweistündige Marathonsitzung am Sonntag deutlich.</li>
          <li><strong>Aktiv mitgehen:</strong> Summe den gesuchten Ton leise mit, klopfe den Puls mit dem Fuß oder nutze nach einem Irrtum gezielt die <strong>A/B-Vergleichsbuttons</strong>.</li>
          <li><strong>Neugier statt Druck:</strong> Jeder Fehler trainiert dein Gehirn genauso wie ein Treffer – erst durch den direkten Vergleich lernt das Ohr feine Unterschiede.</li>
        </ul>
      </div>
    `
  },
  {
    id: "art-talking-about-music",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9.5 10v3"/><path d="M12.5 8.5v6"/><path d="M15.5 10.5v2"/></svg>`,
    badgeClass: "badge-peach",
    title: "Wie redet man über Musik?",
    subtitle: "Empfindungen, Bilder & Wahrnehmung einfach teilen – ganz ohne Fachsprache",
    tag: "Kommunikation & Hören",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Wahrnehmung &amp; Sprache</span>
        <h2>Über Musik sprechen, ohne Noten oder Fachwörter zu brauchen</h2>
        <p class="article-lead">
          Ein Song berührt dich tief, macht dich unruhig oder zaubert ein bestimmtes Bild vor dein inneres Auge – doch sobald dich jemand fragt: <em>„Und, wie fandest du es?“</em>, bleibt oft nur ein hilfloses <em>„Irgendwie schön“</em> oder <em>„Hat mir nicht so gefallen“</em>. Warum ist es so schwer, über Gehörtes zu sprechen – und wie wird es ganz leicht?
        </p>

        <p>
          Viele Menschen schweigen über Musik, weil sie denken, man müsse erst Noten, Fachbegriffe oder Instrumentennamen kennen, um mitreden zu dürfen. Genau das stimmt nicht. Im Alltag – beim gemeinsamen Musikhören, nach einem Konzert, im Unterricht oder in der Probe – geht es selten um das technische <strong>Warum</strong>. Entscheidend ist das <strong>Was</strong>: Was spürst du? Was nimmst du wahr? Wie verändert sich der Klang für dich im Laufe des Stücks?
        </p>

        <div class="k-song-ref">
          <strong>Wichtiger Unterschied:</strong> Selbst Profis, Filmkomponist:innen, Orchester und Chorleitungen sprechen im Arbeitsalltag überwiegend in <em>Gefühlen, Bildern und Körperwahrnehmungen</em>. Ein Satz wie <em>„Am Anfang wirkt es wie dichter Nebel, und ab der Mitte reißt plötzlich der Himmel auf“</em> sagt musikalisch oft viel mehr aus als jedes trockene Etikett.
        </div>

        <h3>1. Die wichtigste Grundregel: Vom Urteil zur Wahrnehmung</h3>
        <p>
          Ein Urteil wie <em>„Das ist langweilig“</em>, <em>„Das ist schief“</em> oder <em>„Das ist super“</em> schließt ein Gespräch ab, weil niemand weiß, was genau in deinem Ohr passiert ist. Eine <strong>Wahrnehmung</strong> hingegen lädt andere ein, mitzuhören. Dabei hilft eine einfache Drei-Schritt-Brücke:
        </p>
        <ul class="article-steps-list">
          <li><strong>Wo im Stück?</strong> Verankere deinen Eindruck kurz zeitlich: <em>„Ganz am Anfang“</em>, <em>„Sobald es lauter wird“</em>, <em>„Kurz vor dem Ende“</em> oder <em>„Bei dem plötzlichen Bruch“</em>.</li>
          <li><strong>Was passiert dort für mich?</strong> Bleibe bewusst bei der Ich-Perspektive: <em>„Auf mich wirkt es…“</em>, <em>„Da spüre ich…“</em>, <em>„Für meine Ohren wird es da…“</em>.</li>
          <li><strong>Woran erinnert das Gefühl?</strong> Nutze ganz normale Wörter aus Raum, Temperatur, Bewegung oder Stimmungen: <em>„eng“</em>, <em>„warm“</em>, <em>„gehetzt“</em>, <em>„wie Durchatmen“</em>.</li>
        </ul>

        <h3>2. Sechs einfache Wahrnehmungs-Felder für den Alltag</h3>
        <p>
          Du brauchst kein riesiges Spezialvokabular. Fast alles, was Musik in uns auslöst, lässt sich über sechs ganz alltägliche Sinnebenen beschreiben, die wirklich jeder sofort versteht:
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>A. Stimmung &amp; Gefühlston</h5>
            <p>Gehe einen Schritt über „traurig“ und „fröhlich“ hinaus: Klingt es eher <em>tröstlich, wehmütig, sehnsüchtig, geborgen, versöhnlich, stolz, verspielt, spöttisch, rastlos, geheimnisvoll, verletzlich</em> oder <em>bittersüß</em>? Besonders genau wird es, wenn du Mischungen benennst: <em>„Auf den ersten Blick leicht, aber mit einem ernsten Unterton.“</em></p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>B. Raum, Nähe &amp; Dichte</h5>
            <p>Wie voll und wie nah fühlt sich der Moment an? Hilfreiche Wörter sind <em>eng, dicht, geballt, überladen, wuchtig</em> vs. <em>weit, luftig, durchsichtig, aufgeräumt, zerbrechlich</em> – sowie <em>ganz nah (als flüstere jemand ans Ohr)</em> vs. <em>weit entfernt / wie in einer großen Halle</em>.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>C. Farbe, Wärme &amp; Oberfläche</h5>
            <p>Stell dir vor, du könntest den Klang anfassen oder sehen: Ist er <em>warm, golden, samtig, matt, rauchig, erdig, weich</em> – oder eher <em>kühl, silbrig, gläsern, hell, grell, spitz, kantig, körnig, rau, blechern</em>? Auch Gewicht hilft: <em>schwer wie Blei</em> vs. <em>federleicht</em>.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>D. Bewegung &amp; Körpersog</h5>
            <p>Was macht dein Körper (oder würde er gern tun)? Wörter voller Leben: <em>vorwärtsdrängend, federnd, schleppend, marschierend, stolpernd, taumelnd, kreisend, atemlos, zurückgelehnt, zögerlich</em>. Und: <em>Zieht es dich mit – oder bremst es dich aus?</em></p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>E. Spannung, Atmung &amp; Verlauf</h5>
            <p>Jedes Stück erzählt eine kleine Reise: <em>Anlauf nehmen, Warten, Kipppunkt, Befreiung, plötzliches Innehalten, Rückzug, offene Frage, Ankommen, Nachhall</em>. Sätze wie <em>„Da halte ich innerlich die Luft an“</em> oder <em>„Dort fällt endlich Druck ab“</em> treffen ins Schwarze.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>F. Miteinander der Stimmen</h5>
            <p>Auch ohne Instrumentennamen kannst du das Zusammenspiel schildern: <em>„Eine Stimme tritt vor und erzählt, der Rest trägt wie ein Teppich“</em>, <em>„wie ein Frage-Antwort-Spiel“</em>, <em>„alle ziehen am selben Strang“</em> oder <em>„plötzlich reden alle gleichzeitig aufeinander ein“</em>.</p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Hör-Check: Spüre denselben Klangunterschied ohne jedes Fachwort</h4>
          <p>Achte bei diesen drei kurzen Paaren nicht auf „richtige Töne“, sondern nur darauf, welches <strong>Alltagswort</strong> spontan in deinem Körper entsteht:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-dense">▶ Eng &amp; geballt</button>
            <button class="btn-tool" data-play-custom="talk-open">▶ Weit &amp; luftig</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-warm">▶ Warm &amp; weich</button>
            <button class="btn-tool" data-play-custom="talk-sharp">▶ Hell &amp; spitz</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-drive">▶ Drängend nach vorn</button>
            <button class="btn-tool" data-play-custom="talk-float">▶ Schwebend &amp; ruhig</button>
          </div>
        </div>

        <h3>3. Was im Gespräch hilft – und was eher blockiert</h3>
        <p>
          Manche gut gemeinten Ausdrücke machen ein Gespräch leider sofort eng oder sorgen für Missverständnisse – vor allem, wenn Menschen mit unterschiedlichem Vorwissen zusammensitzen.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Eher hinderlich &amp; unklar</h5>
            <p><strong>Leere Gütesiegel:</strong> „Gut / schlecht / billig / professionell / unmusikalisch.“ Sie teilen nur ein Urteil mit, lassen das Gegenüber aber völlig im Dunkeln, was dich berührt oder gestört hat.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Hilfreich &amp; verbindend</h5>
            <p><strong>Konkrete Wirkung beschreiben:</strong> „Am Anfang nimmt mich die ruhige Art sofort mit – im Mittelteil wird mir die Stimmung dann zu gehetzt und grell.“</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Schein-Fachwörter auf Verdacht</h5>
            <p>Wörter wie „falsch“, „atonal“, „übersteuert“, „zu viel Dynamik“ oder „schräg“, wenn man eigentlich „es reibt sich“, „es wird zu spitz“ oder „mir fehlt Wärme“ meint – Profis verstehen darunter oft technisch etwas ganz anderes.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Ehrliche Bildsprache</h5>
            <p>Lieber unverstellt bleiben: „Ich kenne das Fachwort nicht, aber an der Stelle fühlt es sich an, als würden zwei Dinge kurz aneinander reiben, bevor es wieder weich wird.“</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Personen-Urteile &amp; Schubladen</h5>
            <p>„Er hat kein Gefühl“ oder „Typische Fahrstuhlmusik / reiner Kommerz.“ Das wertet ab und macht eine Gruppe oder ein Gespräch sofort defensiv.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Moment &amp; Kontrast benennen</h5>
            <p>„Für mich fließt die ganze Stelle so gleichmäßig dahin, dass mir ein kleiner Haken oder eine Kante zum Festhalten fehlt.“</p>
          </div>
        </div>

        <h3>4. Der Übersetzer: Von „irgendwie…“ zu klaren Sätzen</h3>
        <p>
          Oft fehlt nur ein kleiner Schubs, um aus einem vagen Bauchgefühl einen treffenden Satz zu machen. Diese sechs Alltagsbeispiele zeigen, wie einfach das geht:
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Statt: „Klingt irgendwie komisch / schräg.“</strong>
              <span>Besser: „An der Stelle reibt sich für mich kurz etwas – unruhig, fast als würde man kurz das Gleichgewicht suchen.“</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Statt: „Voll langweilig.“</strong>
              <span>Besser: „Es bleibt für mich lange in derselben Stimmung; ich warte irgendwann auf einen kleinen Bruch oder Aufbruch.“</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Statt: „Einfach mega schön.“</strong>
              <span>Besser: „Beim Übergang geht für mich richtig Weite auf – plötzlich kann ich tief durchatmen.“</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Statt: „Es ist irgendwie zu schnell.“</strong>
              <span>Besser: „Für mein Gefühl überschlagen sich die Ereignisse dort – es wirkt gehetzt, selbst wenn das Tempo gleich bleibt.“</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Statt: „Zu laut / nervig!“</strong>
              <span>Besser: „Im lauten Teil rückt alles sehr dicht zusammen und wird für meine Ohren hart und schneidend.“</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Statt: „Klingt halt traurig.“</strong>
              <span>Besser: „Es wirkt nicht verzweifelt, sondern eher leise, rückblickend und ein bisschen tröstlich wie ein später Abend.“</span>
            </div>
          </div>
        </div>

        <h3>5. Tipps für verschiedene Situationen</h3>
        <ul class="article-steps-list">
          <li><strong>Nach einem Konzert oder beim Musikhören mit Freund:innen:</strong> Frag nicht nur <em>„Wie fandest du es?“</em>, sondern: <em>„Welcher Augenblick ist dir geblieben?“</em>, <em>„Welche Tageszeit oder Filmszene passt für dich dazu?“</em> oder <em>„Wo hat dich die Musik verloren – und wo gepackt?“</em></li>
          <li><strong>Im Chor, in der Band oder im Unterricht:</strong> Wenn du selbst Feedback gibst, spiegle zuerst die vorhandene Wirkung, bevor du dir etwas anderes wünschst (<em>„Die Strophe klingt schon wunderbar zart und zurückgenommen – im letzten Teil wünsche ich mir noch mehr Aufleuchten und Mut“</em>). Und wenn du selbst lernst oder singst: Trau dich ruhig zu sagen <em>„Da fühlt es sich für mich eng/schwer/gehetzt an“</em> – genau mit solchen ehrlichen Eindrücken können Lehrkräfte sofort weiterarbeiten!</li>
          <li><strong>Wenn zwei Menschen völlig Verschiedenes hören:</strong> Was für dich <em>tröstlich</em> klingt, empfindet jemand anderes vielleicht als <em>melancholisch</em> oder <em>kühl</em>. In der Musik gibt es bei Empfindungen kein Richtig oder Falsch – eigene Erinnerungen, Kultur und Tagesform hören immer mit. Gerade die Unterschiede machen das Gespräch spannend.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Spickzettel für dein nächstes Musikgespräch (4 einfache Fragen)</h4>
          <p>Wenn dir mal die Worte fehlen, pick dir einfach <strong>eine</strong> dieser vier Fragen heraus:</p>
          <ul class="article-steps-list">
            <li><strong>Farbe &amp; Gefühl:</strong> Ist es eher warm, weich, dunkel – oder hell, kühl, spitz?</li>
            <li><strong>Raum:</strong> Wirkt es eng und nah – oder weit, offen und luftig?</li>
            <li><strong>Bewegung:</strong> Drängt es nach vorn, wiegt es sich, hakt es – oder steht es ruhig?</li>
            <li><strong>Verlauf:</strong> Welcher Moment verändert plötzlich das Gefühl im Stück?</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "art-4chords",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
    badgeClass: "badge-peach",
    title: "Das 4-Akkorde-Phänomen",
    subtitle: "Warum hunderte Welthits mit denselben vier Stufen auskommen",
    tag: "Kadenzen & Pop",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Kadenzen in der Popmusik</span>
        <h2>Warum reichen 4 Akkorde für 1.000 Welthits?</h2>
        <p class="article-lead">
          Von den Beatles (<em>Let It Be</em>) über Toto (<em>Africa</em>) und Adele (<em>Someone Like You</em>) bis hin zu Green Day und Taylor Swift: Immer wieder begegnet uns exakt dieselbe Formel: <strong>I – V – vi – IV</strong>.
        </p>

        <div class="article-highlight-box">
          <h4>Hör dir die Formel direkt an (in C-Dur: C – G – Am – F):</h4>
          <p>Achte darauf, wie sich die Stimmung von Takt zu Takt wandelt:</p>
          <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Pop-Kadenz (I – V – vi – IV) abspielen</button>
        </div>

        <h3>Die Psychologie hinter den 4 Takten</h3>
        <ul class="article-steps-list">
          <li>
            <strong>Takt 1 – Tonika (I):</strong> Alles beginnt stabil, klar und vertraut. Wir wissen sofort, wo wir zu Hause sind.
          </li>
          <li>
            <strong>Takt 2 – Dominante (V):</strong> Es entsteht Weite und ein erster Vorwärtsdrang.
          </li>
          <li>
            <strong>Takt 3 – Moll-Parallele (vi):</strong> Hier passiert die Magie! Statt zurück zur Tonika zu gehen, biegt die Musik in einen <em>Trugschluss</em> ab. Plötzlich mischt sich eine warme, leicht wehmütige Emotion in den Song.
          </li>
          <li>
            <strong>Takt 4 – Subdominante (IV):</strong> Der vierte Takt löst die Frage noch nicht endgültig auf, sondern wirkt wie ein offenes Einatmen – perfekt, um nahtlos wieder in Takt 1 zu springen!
          </li>
        </ul>

        <div class="article-highlight-box">
          <h4>Der Trick mit dem Startpunkt</h4>
          <p>
            Viele Produzenten nutzen exakt dieselben vier Akkorde, starten die Schleife aber einfach auf dem 3. Akkord (also auf der Moll-Parallele: <strong>vi – IV – I – V</strong>). Sofort klingt derselbe Loop dramatischer und ernster (wie in <em>Numb</em> von Linkin Park oder <em>Save Tonight</em> von Eagle-Eye Cherry):
          </p>
          <button class="btn-tool" data-play-progression="vi,IV,I,V">▶ Moll-Variante (vi – IV – I – V) vergleichen</button>
        </div>
      </div>
    `
  },
  {
    id: "art-gravity",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v7a6 6 0 0 0 12 0V4"/><line x1="4" y1="4" x2="8" y2="4"/><line x1="16" y1="4" x2="20" y2="4"/><line x1="6" y1="8" x2="8" y2="8"/><line x1="16" y1="8" x2="18" y2="8"/></svg>`,
    badgeClass: "badge-sage",
    title: "Magnetismus im Ohr: Leitton & Tritonus",
    subtitle: "Wie zwei Halbtöne unser Gehirn nach Auflösung verlangen lassen",
    tag: "Spannung & Auflösung",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Harmonische Schwerkraft</span>
        <h2>Warum zieht uns Musik magnetisch an?</h2>
        <p class="article-lead">
          Wenn wir Musik hören, nehmen wir Töne nicht isoliert wahr, sondern spüren Kräfte zwischen ihnen – fast wie Schwerkraft oder Magnetismus. Zwei Phänomene sind dafür hauptverantwortlich.
        </p>

        <h3>1. Der Leitton (7 → 1)</h3>
        <p>
          In einer Dur-Tonleiter liegt zwischen dem 7. Ton (in C-Dur das <strong>H</strong>) und dem oberen Grundton (<strong>C</strong>) nur ein einziger Halbtonschritt. Spielt man eine Tonleiter von C bis H und hält plötzlich an, rebelliert unser Ohr förmlich:
        </p>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="scale-unresolved">▶ Tonleiter bis H (unaufgelöst!)</button>
          <button class="btn-tool" data-play-custom="leading-tone">▶ Auflösung H → C hören</button>
        </div>

        <h3>2. Der Tritonus-Kollaps (V7 → I)</h3>
        <p>
          Noch stärker wird der Zug, wenn wir zur Dominante (G-Dur) die kleine Septime (das <strong>F</strong>) hinzufügen. Jetzt treffen im Akkord <strong>G7</strong> zwei Tasten aufeinander, die sich im Abstand eines <strong>Tritonus</strong> reiben:
        </p>
        <ul class="article-steps-list">
          <li>Das <strong>H</strong> (7. Stufe) will einen Halbton nach oben zum <strong>C</strong>.</li>
          <li>Das <strong>F</strong> (4. Stufe) will einen Halbton nach unten zum <strong>E</strong>.</li>
        </ul>
        <div class="article-highlight-box">
          <h4>Höre beide Töne isoliert im Kollaps nach innen:</h4>
          <p>Erst erklingen F und H gemeinsam (Spannung), dann fallen sie nach innen auf E und C (Erlösung):</p>
          <button class="btn-tool" data-play-custom="tritone-collapse">▶ Tritonus-Kollaps (F+H → E+C) anhören</button>
        </div>
      </div>
    `
  },
  {
    id: "art-minor-plagal",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Der Gänsehaut-Trick: Moll-Subdominante (iv → I)",
    subtitle: "Von den Beatles bis Radiohead & Disney: Wenn Dur kurz wehmütig wird",
    tag: "Songwriting-Geheimnis",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Harmonische Farben</span>
        <h2>Der schönste Akkordwechsel der Popgeschichte?</h2>
        <p class="article-lead">
          Stell dir einen warmen Sommertag vor (Dur-Tonika <strong>I</strong>), es zieht eine helle Wolke auf (Subdominante <strong>IV</strong>) – und plötzlich färbt sich der Himmel für einen Augenblick golden-melancholisch, bevor die Sonne wieder durchbricht.
        </p>

        <h3>Was passiert bei IV → iv → I?</h3>
        <p>
          In C-Dur ist die Subdominante ein <strong>F-Dur-Akkord (F – A – C)</strong>. Wenn wir nun den mittleren Ton <strong>A</strong> um einen halben Ton nach unten auf <strong>As</strong> absenken, wird daraus <strong>F-Moll (iv)</strong>. Dieser Ton <strong>As</strong> ist aus C-Moll „ausgeliehen“ und gleitet danach butterweich weiter hinab zum <strong>G</strong> des C-Dur-Akkords (<strong>A → As → G</strong>).
        </p>

        <div class="article-highlight-box">
          <h4>Höre den direkten Vergleich:</h4>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="plagal-major">▶ Normal: C – F – C</button>
            <button class="btn-tool" data-play-custom="plagal-minor">▶ Mit Moll-Trick: C – F – Fm – C</button>
          </div>
        </div>

        <h3>Berühmte Songs mit genau diesem Effekt</h3>
        <ul class="article-steps-list">
          <li><strong>The Beatles – „In My Life“</strong> (bei „I’ll remember you“) und <strong>„Blackbird“</strong></li>
          <li><strong>Radiohead – „Creep“</strong> (die kompletten Strophen und der Refrain: G – H – C – Cm)</li>
          <li><strong>Oasis – „Don’t Look Back in Anger“</strong> (vor dem Ende des Refrains)</li>
          <li><strong>Green Day – „Wake Me Up When September Ends“</strong></li>
          <li>Fast jedes große <strong>Disney- & Pixar-Finale</strong> (z. B. <em>Toy Story – You’ve Got a Friend in Me</em>)</li>
        </ul>
      </div>
    `
  },
  {
    id: "art-physics-waves",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2.5-6 5.5-6 8 0s5.5 6 8 0 3.5-3 4-2"/></svg>`,
    badgeClass: "badge-sage",
    title: "Konsonanz & Dissonanz: Wenn Luftwellen tanzen",
    subtitle: "Vom Spektrum über die kritische Bandbreite bis zur Magie des Kontexts",
    tag: "Physik & Akustik",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Physik &amp; Psychoakustik</span>
        <h2>Dissonanz heißt nicht „falsch“ – sondern Spannung!</h2>
        <p class="article-lead">
          Oft denkt man bei <strong>Konsonanz</strong> an „hübsch“ und bei <strong>Dissonanz</strong> an „falsch“. In Wahrheit sind beide die zwei Pole, die Musik überhaupt erst erzählerisch machen: Konsonanz ist das <em>Ankommen und Ausruhen</em>, Dissonanz ist der <em>Aufbruch, Reiz und Motor</em> hin zum nächsten Klang.
        </p>

        <div class="article-highlight-box">
          <h4>Kurztest: Spannung braucht Erlösung</h4>
          <p>Höre einmal eine Akkordfolge, die nur in reiner Ruhe verharrt – und direkt daneben eine Vorhalt-Reibung, die sich erlösend entlädt:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-progression="I,I,I">▶ Nur Konsonanz (statisch)</button>
            <button class="btn-tool" data-play-progression="I,IV,Vsus4,V7,I">▶ Mit Reibung → Auflösung</button>
          </div>
        </div>

        <h3>1. Kein Schwarz-Weiß: Das 4-Stufen-Spektrum</h3>
        <p>
          Schon Pythagoras entdeckte an der geteilten Saite: Je kleiner die ganzen Zahlen eines Frequenzverhältnisses sind, desto stärker verschmelzen zwei Töne zu einer Einheit. Die Musiktheorie unterscheidet dabei vier feine Abstufungen:
        </p>

        <div class="spectrum-list">
          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>1. Perfekte Konsonanz (Maximale Verschmelzung)</span>
              <span>1:1 · 2:1 · 3:2</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill sage" style="width:96%"></div></div>
            <div class="spectrum-sub">Oktave (2:1), Quinte (3:2) &amp; Quarte (4:3): So glatt und stabil, dass man kaum noch zwei getrennte Stimmen heraushört – ideal für Powerchords, offene Bordun-Klänge oder Schlussakkorde.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="P8">▶ Oktave (2:1)</button>
              <button class="btn-tool" data-play-interval-harm="P5">▶ Quinte (3:2)</button>
              <button class="btn-tool" data-play-interval-harm="P4">▶ Quarte (4:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>2. Unvollkommene Konsonanz (Warm &amp; Farbig)</span>
              <span>5:4 · 6:5 · 5:3</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill lilac" style="width:74%"></div></div>
            <div class="spectrum-sub">Große &amp; kleine Terz sowie Sexten: Genug Eigenständigkeit, um Dur- und Moll-Farben lebendig zu machen. Fun-Fact: Im frühen Mittelalter galten Terzen noch als Dissonanz – erst in der Renaissance wurden sie zur Herzstück-Konsonanz!</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M3">▶ Gr. Terz (5:4)</button>
              <button class="btn-tool" data-play-interval-harm="m3">▶ Kl. Terz (6:5)</button>
              <button class="btn-tool" data-play-interval-harm="M6">▶ Gr. Sexte (5:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>3. Milde Dissonanz (Weicher Reiz &amp; Fluss)</span>
              <span>9:8 · 16:9</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill peach" style="width:45%"></div></div>
            <div class="spectrum-sub">Große Sekunde und kleine Septime erzeugen einen angenehmen, beweglichen Reibungsdruck – unverzichtbar für Jazz-Septakkorde, Blues und moderne Balladen.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M2">▶ Gr. Sekunde (9:8)</button>
              <button class="btn-tool" data-play-interval-harm="m7">▶ Kl. Septime (16:9)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>4. Scharfe Dissonanz (Hohe Energie &amp; Rauigkeit)</span>
              <span>16:15 · 15:8 · 45:32</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill red" style="width:20%"></div></div>
            <div class="spectrum-sub">Kleine Sekunde, große Septime und Tritonus prallen mit schnellen Schwebungen aufeinander – wie der weiße Hai im Wasser oder der Leitton direkt vor seiner Erlösung.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="TT">▶ Tritonus (45:32)</button>
              <button class="btn-tool" data-play-interval-harm="M7">▶ Gr. Septime (15:8)</button>
              <button class="btn-tool" data-play-interval-harm="m2">▶ Kl. Sekunde (16:15)</button>
            </div>
          </div>
        </div>

        <h3>2. Was passiert dabei biologisch im Innenohr?</h3>
        <ul class="article-steps-list">
          <li><strong>Kritische Bandbreite (Cochlea):</strong> Auf unserer Hörschnecke (Basilarmembran) liegen die Rezeptoren für verschiedene Frequenzen nebeneinander. Liegen zwei Töne zu eng zusammen (unter ca. 15–20 % Frequenzabstand), geraten genau dieselben Haarzellen gleichzeitig in Stress – wir empfinden ein raues Flattern („Rauigkeit“).</li>
          <li><strong>Der Bass-Effekt (Lower Interval Limit):</strong> Im tiefen Bass rücken die Hertz-Abstände extrem nah zusammen! Zwischen <code>C2</code> (65 Hz) und <code>E2</code> (82 Hz) liegen nur 17 Hz – die eigentlich „freundliche“ Große Terz fällt dort ins selbe kritische Band und beginnt zu matschen. In der Mittellage (<code>C4 + E4</code>, über 67 Hz Abstand) klingt dasselbe Intervall strahlend klar.</li>
          <li><strong>Reibende Obertöne (Helmholtz-Effekt):</strong> Jeder natürliche Ton bringt leise Obertöne mit. Bei <code>C4 + H4</code> (Große Septime) ist der 1. Oberton von C4 das <code>C5</code> – und das reibt nur einen einzigen Halbton über dem <code>H4</code>!</li>
        </ul>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Eng &amp; rau (Tiefes Register)</h5>
            <p>Zwei Töne drängen sich ins selbe kritische Band im Innenohr:</p>
            <button class="btn-tool" data-play-freqs="65.41,82.41" data-osc="triangle" data-dur="1.8">▶ Gr. Terz im Bass (C2+E2)</button>
            <button class="btn-tool" data-play-freqs="65.41,69.30" data-osc="triangle" data-dur="1.8">▶ Kl. Sekunde im Bass (C2+Des2)</button>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Klar &amp; aufgelöst (Mitte / Weit)</h5>
            <p>Dasselbe Intervall in höherer oder weiter Lage trennt sich sauber auf:</p>
            <button class="btn-tool" data-play-freqs="261.63,329.63" data-osc="triangle" data-dur="1.8">▶ Gr. Terz in Mitte (C4+E4)</button>
            <button class="btn-tool" data-play-freqs="130.81,554.37" data-osc="triangle" data-dur="1.8">▶ Weit gespannt (C3+Des5)</button>
          </div>
        </div>

        <h3>3. Kontext-Magie: Wie ein Akkord Reibung in Glanz verwandelt</h3>
        <p>
          Ob ein Ton scharf oder zauberhaft wirkt, entscheidet nicht nur die Physik, sondern auch dein musikalisches Gedächtnis und die Begleittöne. Spiele zwei Töne isoliert – und höre dann exakt dasselbe Intervall eingebettet in einen vollen Akkord:
        </p>

        <div class="article-highlight-box">
          <h4>Experiment: Die Große Septime C + H (15 : 8)</h4>
          <p>Allein gespielt reibt <strong>C4 + H4</strong> spitz am Ohr. Legt man aber E4 und G4 dazwischen (<strong>Cmaj7</strong>), hört unser Gehirn die Obertonstruktur eines warmen Ruhe-Akkords – die Schärfe verwandelt sich in goldenen Jazz-Glanz!</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="isol-maj7">▶ Isoliert: C4 + H4</button>
            <button class="btn-tool" data-play-custom="chord-maj7">▶ Im Kontext: Cmaj7 (C–E–G–H)</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-song-tricks",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    badgeClass: "badge-peach",
    title: "Die besten Song-Eselsbrücken für Intervalle",
    subtitle: "Vom Kuckucksruf über Star Wars bis zu den Simpsons",
    tag: "Praxis-Guide",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Merkhilfen fürs Training</span>
        <h2>Intervalle erkennen mit Liedanfängen</h2>
        <p class="article-lead">
          Der schnellste Weg, ein Intervall im Alltag sofort zu erkennen, ist ein vertrautes Lied im Kopf, das genau mit diesem Tonsprung beginnt. Hier ist der Spickzettel für die wichtigsten Sprünge aufwärts:
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Kleine Sekunde (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m2") : "m2"})</strong>
              <span>Der weiße Hai (Jaws)</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m2">▶ Hören</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Große Sekunde (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M2") : "M2"})</strong>
              <span>Happy Birthday / Alle meine Entchen</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M2">▶ Hören</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Kleine Terz (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m3") : "m3"})</strong>
              <span>Seven Nation Army / Greensleeves</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m3">▶ Hören</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Große Terz (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M3") : "M3"})</strong>
              <span>Oh When the Saints / Morning Has Broken</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M3">▶ Hören</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Reine Quarte (P4)</strong>
              <span>Harry Potter / Hochzeitsmarsch</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P4">▶ Hören</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tritonus (TT)</strong>
              <span>Die Simpsons („The Simp-sons“)</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="TT">▶ Hören</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Reine Quinte (P5)</strong>
              <span>Star Wars / Morgen kommt der Weihnachtsmann</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P5">▶ Hören</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Große Sexte (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M6") : "M6"})</strong>
              <span>My Bonnie Lies Over the Ocean</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M6">▶ Hören</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Reine Oktave (P8)</strong>
              <span>Somewhere Over the Rainbow</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P8">▶ Hören</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-functional",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Relatives vs. Absolutes Gehör",
    subtitle: "Warum funktionales Hören viel musikalischer ist als reines Töne-Raten",
    tag: "Methode",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Hintergrund & Didaktik</span>
        <h2>Warum Beziehungen wichtiger sind als Frequenzen</h2>
        <p class="article-lead">
          Viele glauben, ein „gutes Gehör“ bedeute, dass man beim Klappern einer Kaffeetasse sofort sagen kann: „Das war ein Fis!“ (das sogenannte <em>absolute Gehör</em>). In Wahrheit funktioniert Musik aber ganz anders.
        </p>

        <h3>Ein Ton allein hat noch kein Gefühl</h3>
        <p>
          Derselbe Ton <strong>E</strong> klingt in <strong>C-Dur</strong> warm, strahlend und entspannt (weil er dort die große Terz <em>Mi</em> ist). Spielt man exakt dasselbe <strong>E</strong> aber in <strong>F-Dur</strong>, klingt es plötzlich hochgespannt und drängend (weil es dort der Leitton <em>Ti</em> ist!).
        </p>

        <div class="article-highlight-box">
          <h4>Das Aha-Experiment: Derselbe Ton E4 in zwei Rollen</h4>
          <p>Höre zweimal exakt denselben Zielton <strong>E4</strong> – einmal nach einem C-Dur-Akkord (Ruhe) und einmal nach einem F-Dur-Akkord (Spannung):</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="context-c">▶ E4 in C-Dur (entspanntes Mi)</button>
            <button class="btn-tool" data-play-custom="context-f">▶ E4 in F-Dur (gespanntes Ti)</button>
          </div>
        </div>

        <p>
          Genau deshalb trainieren wir hier das <strong>funktionale (relative) Gehör</strong>: Dein Ohr lernt, welche <em>Rolle</em> ein Ton oder Akkord im großen Ganzen spielt – und diese Fähigkeit funktioniert sofort in allen 12 Tonarten!
        </p>
      </div>
    `
  },
  {
    id: "art-world-music-cultures",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Musiksysteme der Welt: 12 Töne, Mikrotonalität & Kultur",
    subtitle: "Warum das westliche Klavier nur eine von vielen Klangwelten ist",
    tag: "Weltmusik & Akustik",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Kulturen, Stimmung &amp; Mikrotonalität</span>
        <h2>Das 12-Ton-Raster ist eine Erfindung – kein Naturgesetz</h2>
        <p class="article-lead">
          Wer mit Klavier, Gitarre oder westlicher Popmusik aufwächst, hält 12 feste Halbtöne pro Oktave oft für die natürliche Grundordnung jeder Musik. Doch ein Blick rund um den Globus zeigt das Gegenteil: Andere Kulturen verfeinern Tonleitern auf über 22 oder 53 Stufen, biegen Töne bewusst zwischen den Klavier­tasten hindurch, stimmen ganze Orchester mit gewollter Schwebung – oder erzählen stundenlange Dramen ganz ohne westliche Akkordfolgen.
        </p>

        <h3>1. Das westliche Dilemma: Warum wir das Klavier „leicht verstimmt“ haben</h3>
        <p>
          In der Naturphysik schwingen Intervalle in glatten Zahlenverhältnissen (<em>Reine Stimmung</em>): Eine reine Quinte schwingt exakt <code>3:2</code> (ca. 701,96 Cent), eine reine große Terz <code>5:4</code> (386,31 Cent). Baut man jedoch zwölf reine Quinten übereinander, landet man nicht genau sieben Oktaven höher – es bleibt ein kleiner Überschuss von etwa <strong>23,5 Cent</strong> (das <em>Pythagoräische Komma</em>). Auf einem starren Tasteninstrument bedeutet das: Stimmst du eine Tonart kristallklar rein, klingen entfernte Tonarten grausam verstimmt.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Westliche Lösung (Ab ~1700 → Heute)</h5>
            <p>Nach Jahrhunderten der <em>Wohltemperierten Stimmungen</em> (wie bei Bach, in denen jede Tonart noch eine eigene Färbung behielt) setzte sich die <strong>gleichstufige 12-Ton-Stimmung (12-TET)</strong> durch: Alle 12 Halbtöne sind mathematisch exakt <code>100 Cent</code> groß. Dafür zahlt das Ohr einen leisen Preis: Jede große Terz ist rund <strong>+14 Cent</strong> zu hoch und jede Quinte <strong>−2 Cent</strong> zu eng – doch als Belohnung lassen sich alle 12 Tonarten frei modulieren und ganze Orchester mehrstimmig (<em>vertikal</em>) schichten.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Der Weg vieler Weltkulturen</h5>
            <p>Traditionen, die sich auf eine meisterhafte Melodielinie (<em>horizontal</em>) oder einen liegenden Grundton (<em>Bordun / Drone</em>) konzentrieren, brauchen keine starren Akkord-Modulationen quer durch den Quintenzirkel. Sie verzichten bewusst auf gleichgroße Halbtöne – und gewinnen dafür akustisch glockenreine Obertöne, feinste emotionale Schattierungen zwischen den Tasten und unzählige Skalenfarben (<em>Maqamat</em>, <em>Ragas</em>, <em>Dastgāh</em>).</p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Hörvergleich: Reiner Natur-Dreiklang vs. westliches 12-TET-Klavier</h4>
          <p>Höre zuerst den physikalisch reinen Dur-Dreiklang (<code>4:5:6</code> – Quinte <code>3:2</code>, Terz <code>5:4</code>) – und direkt danach denselben C-Dur-Akkord in gleichstufiger 12-TET-Stimmung. Achte auf das leise Flimmern in der 12-TET-Terz!</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Reiner Dur-Dreiklang (4:5:6)</button>
            <button class="btn-tool" data-play-freqs="261.63,329.63,392.00" data-osc="triangle" data-dur="2.0">▶ Gleichstufig 12-TET (Klavier)</button>
          </div>
        </div>

        <h3>2. Was bedeutet eigentlich „Mikrotonalität“? (Cents &amp; Kommas)</h3>
        <p>
          Um Tonhöhen jenseits unseres Klavierrasters präzise zu messen, teilen Akustiker jede Oktave in exakt <strong>1.200 Cent</strong>. Jeder einzelne westliche Halbton entspricht genau <code>100 Cent</code> – dazwischen liegt jedoch ein riesiges Universum:
        </p>

        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>Was das Ohr noch auflöst</strong>
            In guter Hörlage erkennen trainierte Ohren schon Unterschiede ab <strong>3 bis 6 Cent</strong> – besonders bei stehenden Tönen durch feine Schwebungen oder Farbumschläge.
          </div>
          <div class="physics-fact-item">
            <strong>Viertelton &amp; Dreiviertelton</strong>
            Ein echter <strong>Viertelton</strong> misst <code>50 Cent</code>, ein neutraler <strong>Dreiviertelton</strong> <code>150 Cent</code> – Letzterer klingt weder nach Dur noch nach Moll, sondern wie eine völlig eigene Welt.
          </div>
          <div class="physics-fact-item">
            <strong>Das Komma (ca. 22–24 Cent)</strong>
            In der türkischen Makam-Theorie wird der Ganzton in <strong>9 Holdrian-Kommas</strong> (je ~22,6 Cent) geteilt – das ergibt ein Feinraster von <strong>53 Stufen pro Oktave</strong>!
          </div>
          <div class="physics-fact-item">
            <strong>Ton als Bewegung, nicht Punkt</strong>
            In vielen Kulturen ist ein Ton kein statischer Punkt auf einer Klaviertaste, sondern eine lebendige Kurve aus Anschleifen, Vibrato und Ausschwingen rund um ein Zielzentrum.
          </div>
        </div>

        <h3>3. Arabische, persische &amp; türkische Welt: Maqam, Makam &amp; Dastgāh</h3>
        <p>
          Vom Atlantik über Kairo, Bagdad und Teheran bis Istanbul schlägt das Herz der Kunstmusik nicht in Akkordfolgen, sondern in feinst abgestimmten melodischen Wegen: den <strong>Maqamat</strong> (arabisch), <strong>Makamlar</strong> (türkisch) oder <strong>Dastgāh-ha</strong> (persisch, dort auch als <em>Koron</em> / <em>Sori</em> notiert). Anstelle der kompletten Sieben-Ton-Leiter als bloßes Rohmaterial denkt man hier in kleinen 3- bis 5-tönigen Zellen namens <strong>Jins</strong> (Pl. <em>Ajnas</em>). Ein Maqam ist gleichzeitig Skala, bevorzugte Phrasierungsrichtung (<em>Sayr</em> – wo startet die Melodie, wo ruht sie, wohin löst sie sich?) und emotionaler Seelenzustand.
        </p>
        <p>
          Das berühmteste Markenzeichen dieser Welt sind die <strong>neutralen Intervalle</strong> – etwa die <em>neutrale Terz</em> bei rund <strong>350 Cent</strong> (genau in der Mitte zwischen westlicher kleiner Terz mit 300 Cent und großer Terz mit 400 Cent!). Auf einem westlichen Klavier existiert dieser Ton schlicht nicht; auf Bundlosen Saiteninstrumenten wie der <em>Oud</em> oder der Längsflöte <em>Ney</em> bildet er dagegen das strahlende, zugleich weiche Zentrum ganzer Epochen.
        </p>

        <div class="article-highlight-box">
          <h4>Mikroton-Experiment: Drei Terzen im direkten Vergleich (Maqam Rast &amp; Bayati)</h4>
          <p>Höre denselben Grundton mit westlicher großer Terz (<code>400 ct</code>), arabischer neutraler Terz (<code>350 ct</code>) und westlicher kleiner Terz (<code>300 ct</code>) – danach eine echte Wendung in <strong>Maqam Rast</strong> (mit neutraler 3. und 7. Stufe) sowie das charakteristische Viertelton-Pendel von <strong>Maqam Bayati</strong>:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-maqam-contrast">▶ Gr. vs. Neutrale vs. Kl. Terz</button>
            <button class="btn-tool" data-play-custom="culture-maqam-rast">▶ Maqam Rast (350 &amp; 1050 ct)</button>
            <button class="btn-tool" data-play-custom="culture-maqam-bayati">▶ Maqam Bayati (150-ct-Stufe)</button>
          </div>
        </div>

        <h3>4. Südasien (Pakistan &amp; Indien): Raga, 22 Shrutis, Tanpura &amp; Tala</h3>
        <p>
          In der klassischen hindustanischen Musik – tief verwurzelt in ganz Nordindien und Pakistan (etwa im Gesang des <em>Khyal</em>, des spirituellen <em>Qawwali</em> oder auf Sitar, Sarangi und Bansuri) – ruht alles über einem einzigen, ununterbrochen schwingenden Klangteppich: dem obertonreichen Bordun der <strong>Tanpura</strong> (meist Grundton <code>Sa</code> und Quinte <code>Pa</code>). Weil die Harmonie nicht ständig den Grundton wechselt, braucht niemand temperierte Kompromiss-Töne.
        </p>
        <ul class="article-steps-list">
          <li><strong>22 Shrutis (Mikro-Abstufungen):</strong> Obwohl ein <em>Raga</em> meist 5, 6 oder 7 Hauptstufen (<em>Svara</em>) nutzt, wählt das System aus <strong>22 feinen Mikroton-Positionen (Shrutis)</strong> je Oktave. Ein tief alteriertes <code>Ati-Komal Re</code> in Raga Bhairav schwingt deutlich näher am Grundton als eine westliche kleine Sekunde – und erzeugt genau dadurch diese feierliche Morgendämmerungs-Schwere.</li>
          <li><strong>Der Raum zwischen den Noten (Meend, Andolan &amp; Gamak):</strong> Auf einer Sitar oder in der Gesangsstimme gilt ein gerader, unbewegter Ton fast als nackt. Die wahre Schönheit liegt in <em>Meend</em> (glattes Ziehen von einem Ton zum anderen), <em>Andolan</em> (langsam-sanftes Umkreisen eines Mikrotons) und <em>Gamak</em> (kraftvolle Verzierungsbögen). Nicht der einzelne Punkt ist der Ton – die geschwungene Brücke dazwischen erzählt die Geschichte.</li>
          <li><strong>Raga &amp; Tageszeit:</strong> Ein Raga ist eine musikalische Persönlichkeit mit Aufstiegs- (<em>Aroha</em>) und Abstiegspfad (<em>Avaroha</em>), Hauptruheton (<em>Vadi</em>) und eigener Uhrzeit (Morgen-Ragas wie <em>Bhairav</em> vs. Nacht-Ragas wie <em>Darbari Kanada</em>).</li>
          <li><strong>Tala (Zyklische Zeit):</strong> Statt in geraden Balkentakten voranzumarschieren, kreist der Rhythmus auf der <em>Tabla</em> in geschlossenen Zyklen von z. B. 16 Schlägen (<em>Teental</em>), 10 Schlägen (<em>Jhaptal</em>) oder 7 Schlägen (<em>Rupak</em>) immer wieder zur goldenen „Eins“ zurück – dem <strong>Sam</strong>.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Hörbeispiel: Raga Bhairav über schwingendem Tanpura-Bordun (Sa–Pa)</h4>
          <p>Achte bewusst auf die sehr tief angesetzte zweite Stufe (<code>Ati-Komal Re</code>) und die sechsstufige Spannung, die sich langsam wieder zum ruhenden <code>Sa</code> senkt:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-raga-bhairav">▶ Raga Bhairav (Tanpura + 22-Shruti-Intonation)</button>
          </div>
        </div>

        <h3>5. Indonesien (Java &amp; Bali): Gamelan, Sléndro, Pélog &amp; Meereswellen</h3>
        <p>
          Kaum eine Tradition bricht radikalere Tabus unserer westlichen Schulmusik als das <strong>Gamelan</strong>-Orchester aus Java und Bali. Hier geht es nicht um ein allgemeingültiges Kammerton-<code>A = 440 Hz</code>: <strong>Jedes bedeutende Gamelan-Ensemble besitzt seine ganz eigene, unverwechselbare Gesamtstimmung!</strong> Zwei Ensembles lassen sich deshalb nicht einfach zusammenspielen – ähnlich wie jedes Orchester seinen eigenen Charakterklang hütet.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Sléndro: 5 fast gleichgroße Schritte</h5>
            <p>Teilt die Oktave nicht in 12 Hälften, sondern grob in <strong>5 ähnlich große Abstände</strong> von rund <code>240 Cent</code>. Das Faszinierende: In einer idealen Sléndro-Stimmung gibt es weder eine exakte westliche große Terz noch eine klassische reine Quinte oder Quarte – das Ohr lässt westliche Akkord-Erwartungen einfach los!</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Pélog &amp; Ombak (Die „Meereswelle“)</h5>
            <p><strong>Pélog</strong> spannt 7 asymmetrische Töne auf (teils enge Halbtöne, teils riesige Sprünge), aus denen 5er-Modi gewählt werden. Auf Bali werden Metallophone zudem paarweise gespielt: ein Instrument heißt <em>Pengumbang</em> (leicht tiefer), das Partner-Instrument <em>Pengisep</em> (etwa <strong>5–8 Hz höher</strong>). Zusammengeschlagen entsteht kein Fehler, sondern das schimmernde, atmende Pulsieren namens <strong>Ombak</strong> („Welle“).</p>
          </div>
        </div>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-gamelan-slendro">▶ Sléndro-Reihe (~240 ct gleichstufig)</button>
          <button class="btn-tool" data-play-custom="culture-gamelan-ombak">▶ Balinesisches Ombak-Schimmern (~7 Hz)</button>
        </div>

        <h3>6. Subsahara-Afrika &amp; Ostasien: Polyrhythmik, Blue Notes &amp; die Kunst der Stille</h3>
        <ul class="article-steps-list">
          <li><strong>Subsahara-Afrika – Verzahnte Zyklen &amp; Asymmetrie:</strong> Wo westliche Musik oft über komplexe Akkordwechsel spannt, baut traditionelle west- und zentralafrikanische Ensemble-Musik atemberaubende architektonische Rhythmusnetze. Mehrere Musiker spielen gleichzeitig in entgegengesetzten Grundpulsen (<strong>3 gegen 4</strong> oder <strong>3 gegen 2</strong>, also echte <em>Polyrhythmik</em>), zusammengehalten durch eine asymmetrische metallene Leitfigur namens <strong>Bell Timeline</strong> (z. B. das 12/8-Standardmuster <code>x . x . x x . x . x . x</code>). Höre genau hin – kein Part dominiert allein; erst das Zusammenspiel (<em>Interlocking</em>) und der Ruf-Antwort-Wechsel (<em>Call &amp; Response</em>) ergeben die Gesamtmelodie.</li>
          <li><strong>Von Westafrika in Blues, Jazz &amp; Pop (Blue Notes!):</strong> Als versklavte afrikanische Musiker in Nordamerika mit der westlichen Gitarre, dem Klavier und Blechblasinstrumenten zusammenstießen, passten ihre vokalen, leicht tiefer gebogenen Terzen, Quinten und Septimen nicht auf feste Klaviertasten. Dieses Aufeinandertreffen schuf die berühmten mikrotonalen <strong>Blue Notes</strong> – den emotionalsten „Zwischenraum“ von Blues, Gospel, Jazz, Soul und Rock bis heute!</li>
          <li><strong>Ostasien – Klangfarbe, Fingerdruck &amp; das Prinzip „Ma“:</strong> Traditionelle chinesische (<em>Guqin</em>, Pentatonik mit über 100 Anschlag- und Ziehtechniken) oder japanische Musik (<em>Shakuhachi</em>-Bambusflöte) verwendet oft fünf Grundtöne (Pentatonik), verlagert die Kunst aber tief in Mikroton-Biegungen, Atemgeräusche und das bewusste Zeitempfinden <strong>Ma (間)</strong> – die spannungsvolle Stille <em>zwischen</em> zwei Klängen, die genauso viel Gewicht trägt wie der gespielte Ton selbst.</li>
        </ul>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-westafrica-poly">▶ 12/8 Bell-Timeline + 4-vs-3 Polyrhythmik</button>
        </div>

        <h3>7. Vier Achsen im Weltvergleich – &amp; was das für dein Gehör bedeutet</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>1. Tonvorrat &amp; Stimmung</strong>
              <span>Westen: 12 feste 100-Cent-Stufen (12-TET). Weltweit: 5-Ton Sléndro (~240 ct), 22 Shrutis, 53-Komma-Makam oder gleitende Tonzentren.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>2. Vertikal vs. Horizontal</strong>
              <span>Westliche Klassik &amp; Pop erzählen über mehrstimmige Akkordfolgen. Maqam &amp; Raga erzählen über mikrotonale Linienführung und Verzierung über einem Grundton.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>3. Klangideal</strong>
              <span>Westliches Streben nach „sauber-ruhiger“ Verschmelzung vs. balinesisches <em>Ombak</em>-Schimmern, Sitar-Schnarrsteg (<em>Jawari</em>) oder luftige Flöten-Obertöne.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>4. Zeitgefühl</strong>
              <span>Lineare 3/4- und 4/4-Takte vs. geschlossene Zyklen (<em>Tala</em>), verzahnte Polyrhythmik (12/8 Timelines) oder atmende Pausenästhetik (<em>Ma</em>).</span>
            </div>
          </div>
        </div>

        <div class="k-song-ref">
          <strong>Was nimmt dein Gehör daraus mit?</strong> Jede Musiktradition schärft eine bestimmte Wahrnehmungs-Superkraft: Das westliche System trainiert Akkordfunktionen und Modulation; Maqam und Raga schulen deinen <strong>Mikroton-Radar</strong> und feinste Tonhöhen-Intonation beim Singen oder auf Streichinstrumenten; Gamelan und afrikanische Polyrhythmik lösen starres Zählen auf und verankern dein Rhythmusgefühl tief im Körper. Wenn du in Lauscher Intervalle hörst, bist du immer auf der Suche nach <em>Beziehungen statt bloßen Etiketten</em> – und genau diese Neugier öffnet dir jede Klangkultur dieser Welt.
        </div>
      </div>
    `
  },
  {
    id: "art-mnemonics",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1.1 2h5.8c.1-.8.5-1.5 1.1-2A7 7 0 0 0 12 2z"/></svg>`,
    badgeClass: "badge-peach",
    title: "Eselsbrücken beim Lernen",
    subtitle: "Die besten Merksprüche für Quintenzirkel, Notenschlüssel, Saiten, Intervalle & Rhythmus",
    tag: "Merkhilfen & Praxis",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Merkhilfen &amp; Praxis</span>
        <h2>Eselsbrücken beim Lernen: Musikwissen, das sofort hängenbleibt</h2>
        <p class="article-lead">
          Warum merken wir uns einen lustigen Satz über alte Esel oder frische Brötchen in zehn Sekunden – während trockene Buchstabenreihen nach fünf Minuten wieder verschwinden? Unser Gehirn liebt <strong>Bilder, Geschichten, Reime und Rhythmus</strong>. Hier findest du die bekanntesten und nützlichsten Eselsbrücken der deutschen Musikausbildung auf einen Blick.
        </p>

        <h3>1. Quintenzirkel &amp; Vorzeichen der Tonarten</h3>
        <p>
          Im Quintenzirkel wandern die Tonarten im Uhrzeigersinn in reinen Quinten nach oben (jeder Schritt bekommt ein <strong>♯</strong> dazu) und gegen den Uhrzeigersinn in Quinten nach unten (jeder Schritt bekommt ein <strong>♭</strong> dazu):
        </p>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Kreuz-Tonarten (1♯ bis 6♯): G – D – A – E – H – Fis</h5>
            <p>
              <strong>„<u>G</u>eh <u>D</u>u <u>A</u>lter <u>E</u>sel <u>H</u>ole <u>Fis</u>che“</strong><br>
              <em>Alternative:</em> „<strong>G</strong>ib <strong>D</strong>em <strong>A</strong>lten <strong>E</strong>sel <strong>H</strong>eute <strong>Fis</strong>ch“.<br>
              Start bei C-Dur (0 Vorzeichen) → 1♯ = G-Dur, 2♯ = D-Dur, 3♯ = A-Dur, 4♯ = E-Dur, 5♯ = H-Dur, 6♯ = Fis-Dur.
            </p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>B-Tonarten (1♭ bis 6♭): F – B – Es – As – Des – Ges</h5>
            <p>
              <strong>„<u>F</u>rische <u>B</u>rötchen <u>Es</u>sen <u>As</u>se <u>Des</u> <u>Ges</u>angs“</strong><br>
              <em>Alternative:</em> „<strong>F</strong>rische <strong>B</strong>rezeln <strong>Es</strong>sen <strong>As</strong>se <strong>Des</strong> <strong>Ges</strong>angs“.<br>
              1♭ = F-Dur, 2♭ = B-Dur, 3♭ = Es-Dur, 4♭ = As-Dur, 5♭ = Des-Dur, 6♭ = Ges-Dur.
            </p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Zwei Profi-Kurztricks zum Ablesen der Tonart am Notenanfang</h4>
          <ul class="article-steps-list">
            <li><strong>Bei Kreuzen (♯):</strong> Das <em>allerletzte Kreuz</em> rechts in der Vorzeichnung ist immer der <strong>Leitton (7. Stufe)</strong>. Geh von dort einfach <strong>einen Halbton höher</strong> – schon hast du die Dur-Tonart! (Beispiel: Letztes Kreuz auf <em>Cis</em> → ein Halbton höher = <strong>D-Dur</strong>).</li>
            <li><strong>Bei Bs (♭):</strong> Das <em>vorletzte ♭</em> verrät direkt den Namen der Dur-Tonart! (Beispiel: 3 Bs = B, <strong>Es</strong>, As → <strong>Es-Dur</strong>. Nur 1♭ = <strong>F-Dur</strong> merkst du dir separat).</li>
            <li><strong>Parallele Moll-Tonart finden:</strong> Rechne vom Dur-Grundton einfach <strong>3 Halbtöne (eine kleine Terz) abwärts</strong> (oder lies auf der 6. Stufe ab: C-Dur → a-Moll, G-Dur → e-Moll).</li>
          </ul>
          <button class="btn-tool" data-jump-ref="circle-of-fifths">→ Direkt zum interaktiven Quintenzirkel</button>
        </div>

        <h3>2. Notenlinien &amp; Zwischenräume im Violin-, Bass- und Altschlüssel</h3>
        <p>
          Beim Notenlesen brauchst du nicht jede Linie einzeln abzuzählen – mit diesen Sprüchen (immer <strong>von unten nach oben</strong> gelesen) hast du sofort ein festes Raster:
        </p>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Violinschlüssel • 4 Zwischenräume: F – A – C – E</strong>
              <span>Ergibt von unten nach oben gelesen das englische Wort <strong>„FACE“</strong> (Gesicht) – oder den Spruch: <em>„<strong>F</strong>ritz <strong>A</strong>ß <strong>C</strong>itronen-<strong>E</strong>is“</em>.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Violinschlüssel • 5 Linien: E – G – H – D – F</strong>
              <span><em>„<strong>E</strong>s <strong>G</strong>eht <strong>H</strong>urtig <strong>D</strong>urch <strong>F</strong>leiß“</em> oder kindgerecht: <em>„<strong>E</strong>ine <strong>G</strong>ans <strong>H</strong>at <strong>D</strong>icke <strong>F</strong>üße“</em>.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Bassschlüssel • 5 Linien: G – H – D – F – A</strong>
              <span><em>„<strong>G</strong>ustav <strong>H</strong>at <strong>D</strong>rei <strong>F</strong>linke <strong>A</strong>ffen“</em> oder <em>„<strong>G</strong>ute <strong>H</strong>unde <strong>D</strong>ürfen <strong>F</strong>rei <strong>A</strong>uslaufen“</em>.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Bassschlüssel • 4 Zwischenräume: A – C – E – G</strong>
              <span><em>„<strong>A</strong>lle <strong>C</strong>lowns <strong>E</strong>ssen <strong>G</strong>emüse“</em> (oder <em>„<strong>A</strong>lle <strong>C</strong>ellos <strong>E</strong>rklingen <strong>G</strong>ut“</em>).</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Die 3 Schlüssel-Ankerpunkte (G-, F- und C-Schlüssel)</strong>
              <span>• <strong>Violinschlüssel = G-Schlüssel:</strong> Die Schnecke kreist um die 2. Linie (<strong>g'</strong>).<br>• <strong>Bassschlüssel = F-Schlüssel:</strong> Die zwei Punkte rahmen die 4. Linie (<strong>f</strong>) ein. <em>Umrechen-Trick:</em> Jede Note im Bassschlüssel liegt genau <strong>zwei Töne (eine Terz) tiefer im Namen / zwei Stufen verschoben</strong> als im Violinschlüssel!<br>• <strong>Altschlüssel = C-Schlüssel:</strong> Die Einbuchtung in der Mitte zeigt exakt auf die 3. Linie = das <strong>Schlüsselloch-C (c')</strong>!</span>
            </div>
          </div>
        </div>

        <h3>3. Leere Saiten auf Gitarre, Bass, Streichern &amp; Ukulele</h3>
        <p>
          Alle Saitensprüche werden standardmäßig <strong>von der tiefsten (dicksten) zur höchsten (dünnsten) Saite</strong> gesprochen:
        </p>
        <ul class="article-steps-list">
          <li><strong>Gitarre (6 Saiten: E – A – D – G – H – E):</strong> <em>„<strong>E</strong>ine <strong>A</strong>lte <strong>D</strong>ame <strong>G</strong>eht <strong>H</strong>eute <strong>E</strong>inkaufen“</em> (oder <em>„<strong>E</strong>in <strong>A</strong>nfänger <strong>D</strong>er <strong>G</strong>itarre <strong>H</strong>at <strong>E</strong>ifer“</em>).</li>
          <li><strong>E-Bass &amp; Kontrabass (4 Saiten: E – A – D – G):</strong> <em>„<strong>E</strong>in <strong>A</strong>nfänger <strong>D</strong>er <strong>G</strong>itarre“</em> – identisch mit den vier tiefen Gitarrensaiten (alles reine Quarten aufwärts).</li>
          <li><strong>Violine / Geige (4 Saiten: G – D – A – E):</strong> <em>„<strong>G</strong>eh <strong>D</strong>u <strong>A</strong>lter <strong>E</strong>sel“</em> – exakt die ersten vier Schritte des Quintenzirkels in reinen Quinten aufwärts!</li>
          <li><strong>Viola (Bratsche) &amp; Violoncello (4 Saiten: C – G – D – A):</strong> <em>„<strong>C</strong>äsar <strong>G</strong>ing <strong>D</strong>urch <strong>A</strong>frika“</em> (oder <em>„<strong>C</strong>lowns <strong>G</strong>ehen <strong>D</strong>urch <strong>A</strong>frika“</em> – ebenfalls reine Quinten aufwärts ab C).</li>
          <li><strong>Ukulele (4 Saiten in C-Stimmung: G – C – E – A):</strong> <em>„<strong>G</strong>ute <strong>C</strong>lowns <strong>E</strong>ssen <strong>A</strong>pfelmus“</em> – und klanglich passen die vier leeren Saiten exakt auf die Melodie <em>„Meine Oma fährt im Hühnerstall Motorrad“</em>!</li>
        </ul>

        <h3>4. Intervalle sofort an Liedanfängen erkennen</h3>
        <p>
          Die stärkste Eselsbrücke für dein Gehör sind bekannte Melodien, deren erste zwei Töne genau das gesuchte Intervall bilden. Tippe auf ein Intervall, um die Brücke direkt zu hören:
        </p>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Kleine Sekunde (1 HT) &amp; Große Sekunde (2 HT)</strong>
              <span>• <strong>Kl. Sekunde:</strong> <em>Der weiße Hai (Jaws)</em> aufwärts / <em>Für Elise</em> abwärts.<br>• <strong>Gr. Sekunde:</strong> <em>Alle meine Entchen</em> (Ton 1→2) oder <em>Happy Birthday</em> (nach der Tonwiederholung).</span>
            </div>
            <button class="btn-tool" data-play-int-asc="1">▶ kl. 2</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Kleine Terz (3 HT) &amp; Große Terz (4 HT)</strong>
              <span>• <strong>Kl. Terz:</strong> <em>Greensleeves</em> aufwärts / <em>Kuckucksruf</em> oder <em>Hey Jude</em> abwärts.<br>• <strong>Gr. Terz:</strong> <em>Oh When the Saints</em> oder <em>Morning Has Broken</em> (aufwärts), <em>Summertime</em> (abwärts).</span>
            </div>
            <button class="btn-tool" data-play-int-asc="4">▶ gr. 3</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Reine Quarte (5 HT) &amp; Tritonus (6 HT)</strong>
              <span>• <strong>Quarte:</strong> <em>Hochzeitsmarsch („Here Comes the Bride“)</em> oder <em>Amazing Grace</em>.<br>• <strong>Tritonus (überm. 4 / verm. 5):</strong> <em>The Simpsons („The Simp-sons“)</em> oder <em>Maria (West Side Story)</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="6">▶ Tritonus</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Reine Quinte (7 HT) &amp; Oktave (12 HT)</strong>
              <span>• <strong>Quinte:</strong> <em>Star Wars (Hauptthema)</em> oder <em>Morgen kommt der Weihnachtsmann (Twinkle, Twinkle)</em>.<br>• <strong>Große Sexte (9 HT):</strong> <em>My Bonnie Lies Over the Ocean</em>.<br>• <strong>Oktave (12 HT):</strong> <em>Somewhere Over the Rainbow</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="7">▶ Quinte</button>
          </div>
        </div>

        <h3>5. Kirchentonarten, Dreiklänge &amp; Rhythmus-Sprechsilben</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-lilac">
            <h5>Die 7 Kirchentonarten (Modi) in der richtigen Reihenfolge</h5>
            <p>
              Von den weißen Klaviertasten <strong>C – D – E – F – G – A – H</strong> abgeleitet:<br>
              <strong><u>I</u>onisch – <u>D</u>orisch – <u>P</u>hrygisch – <u>L</u>ydisch – <u>M</u>ixolydisch – <u>Ä</u>olisch – <u>L</u>okrisch</strong><br>
              Merkspruch: <em>„<strong>I</strong>n <strong>D</strong>eutschland <strong>P</strong>assieren <strong>L</strong>eider <strong>M</strong>anchmal <strong>Ä</strong>rgerliche <strong>L</strong>ügen“</em>.<br>
              <strong>Hör-Abkürzung über den Charakterton:</strong><br>
              • Dur + hohe <strong>#4</strong> (schwebend) = <strong>Lydisch</strong><br>
              • Dur + tiefe <strong>b7</strong> (bluesig-rockig) = <strong>Mixolydisch</strong><br>
              • Moll + helle <strong>♮6</strong> = <strong>Dorisch</strong><br>
              • Moll + dunkle <strong>b2</strong> (Flamenco) = <strong>Phrygisch</strong>
            </p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Rhythmus-Wortanker &amp; Dreiklangs-Formel</h5>
            <p>
              <strong>Rhythmen sprechen statt rechnen:</strong><br>
              • Viertel (♩): <em>„Schritt“</em> / <em>„Tee“</em><br>
              • Achtelpaar (♪♪): <em>„Kaf-fee“</em> / <em>„Lau-fen“</em><br>
              • Achteltriole (3 auf 1 Schlag): <em>„A-na-nas“</em> / <em>„Erd-bee-re“</em><br>
              • Vier Sechzehntel (4 auf 1 Schlag): <em>„Scho-ko-la-de“</em> / <em>„A-pfel-ku-chen“</em><br>
              <strong>Dreiklangs-Abstände (Halbtöne):</strong><br>
              • <strong>Dur = 4 + 3</strong> (erst große Terz, dann kleine Terz)<br>
              • <strong>Moll = 3 + 4</strong> (erst kleine Terz, dann große Terz)<br>
              • <strong>Vermindert = 3 + 3</strong> • <strong>Übermäßig = 4 + 4</strong>
            </p>
          </div>
        </div>
      </div>
    `
  }
];

/**
 * Erklärtexte und Teilton-Daten für das vertiefte Modul „Physik & Klang“
 */
const PHYSICS_WAVE_EXPLANATIONS = {
  "2,1": "<strong>Oktave (2 : 1):</strong> Auf 2 lange grüne Wellen passen exakt <strong>4 halb so lange orange Wellen</strong>. In Spur 3 wiederholt sich das Gesamtbild an jeder gestrichelten Linie deckungsgleich – deshalb verschmelzen beide Töne fast zu einem.",
  "3,2": "<strong>Reine Quinte (3 : 2):</strong> Während der Grundton 2 lange grüne Wellen macht, schafft der höhere Ton exakt <strong>3 orange Wellen</strong>. Am Start und nach jedem 2er-Block treffen sie sauber zusammen – stabil, offen und voller Power.",
  "4,3": "<strong>Reine Quarte (4 : 3):</strong> 3 grüne Wellen treffen genau auf 4 orange Wellen. Danach läuft das ganze Muster komplett synchron wieder von vorn.",
  "5,4": "<strong>Große Terz (5 : 4):</strong> 4 grüne auf 5 orange Wellen. In Spur 3 entsteht eine weiche, runde Mischwelle – genau das ist der warme Sound unserer Dur-Akkorde.",
  "6,5": "<strong>Kleine Terz (6 : 5):</strong> 5 grüne auf 6 orange Wellen: etwas dichter gepackt als die große Terz – genau diese feine Wellenbewegung gibt Moll seine gefühlvolle Farbe.",
  "5,3": "<strong>Große Sexte (5 : 3):</strong> Verhältnis 1,67 : 1 – die Umkehrung der kleinen Terz. Klingt weit, gesanglich und angenehm aufgeräumt.",
  "45,32": "<strong>Tritonus (45 : 32):</strong> Die orangen Wellenberge passen fast nirgends ins Raster der grünen Welle – schau auf Spur 3: eine zackige, unruhig kippende Welle voller Spannung.",
  "16,15": "<strong>Kleine Sekunde (16 : 15):</strong> Beide Wellen sind fast gleich schnell, driften aber Stück für Stück auseinander – das erzeugt die dicken und dünnen „Bäuche“ in Spur 3 (Schwebung)."
};

const PHYSICS_OVERTONES = [
  { num: 1,  note: "C2",      ratio: "1x · Grundton",   freq: 65.41,  special: false },
  { num: 2,  note: "C3",      ratio: "2x · Oktave",     freq: 130.82, special: false },
  { num: 3,  note: "G3",      ratio: "3x · Quinte",     freq: 196.23, special: false },
  { num: 4,  note: "C4",      ratio: "4x · 2. Okt.",    freq: 261.64, special: false },
  { num: 5,  note: "E4",      ratio: "5x · Gr. Terz",   freq: 327.05, special: false },
  { num: 6,  note: "G4",      ratio: "6x · Quinte",     freq: 392.46, special: false },
  { num: 7,  note: "~B4*",    ratio: "7x · Natur-7",    freq: 457.87, special: true },
  { num: 8,  note: "C5",      ratio: "8x · 3. Okt.",    freq: 523.28, special: false },
  { num: 9,  note: "D5",      ratio: "9x · Sekunde",    freq: 588.69, special: false },
  { num: 10, note: "E5",      ratio: "10x · Gr. Terz",  freq: 654.10, special: false },
  { num: 11, note: "~F5/Fis*",ratio: "11x · Alphorn-Fa",freq: 719.51, special: true },
  { num: 12, note: "G5",      ratio: "12x · Quinte",    freq: 784.92, special: false }
];

function renderPhysicsReferenceHTML() {
  const localized = resolveRegisteredKnowledgeRender(
    "physics",
    typeof renderPhysicsReferenceHTML_EN === "function" ? renderPhysicsReferenceHTML_EN : null,
    typeof renderPhysicsReferenceHTML_FR === "function" ? renderPhysicsReferenceHTML_FR : null
  );
  if (localized !== null) return localized;
  return `
    <!-- 1. Wie Schall entsteht & was Sinuskurven sind -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Wie Schall &amp; Klänge entstehen</span>
        <span class="k-ratio-chip">ca. 343 m/s</span>
      </div>
      <h4>Vom Luftwackeln bis zur Sinuskurve</h4>
      <p>
        Zupfst du eine Gitarrensaite an oder summst los, wackelt etwas ganz schnell hin und her. Dieses Zittern schubst winzige Luftteilchen an – genau wie Wellen auf dem Wasser breitet sich eine Druckwelle mit rund <strong>343 Metern pro Sekunde</strong> aus. Kommt sie bei dir an, wackelt dein Trommelfell exakt im gleichen Takt mit, und dein Gehirn macht daraus Musik.
      </p>
      <p>
        Stell dir eine Schaukel vor, die völlig ruckfrei und gleichmäßig vor- und zurückschwingt: Zeichnest du diese sanfte Bewegung über die Zeit auf, entsteht eine <strong>Sinuskurve</strong>. Sie ist der Ur-Baustein jedes Klangs und hat genau <strong>eine einzige Frequenz</strong> ohne Extras. Echte Instrumente schwingen dagegen viel „knubbeliger“, weil sie viele Zusatzwellen gleichzeitig mischen.
      </p>

      <div class="wave-compare-visual">
        <div class="wave-compare-card">
          <strong>Reine Sinuskurve (1 Frequenz)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 29.0 L9.5 25.0 L12.9 21.3 L16.4 17.8 L19.9 14.9 L23.3 12.5 L26.8 10.9 L30.3 10.1 L33.7 10.1 L37.2 10.9 L40.7 12.5 L44.1 14.9 L47.6 17.8 L51.1 21.3 L54.5 25.0 L58.0 29.0 L61.5 33.0 L64.9 36.7 L68.4 40.2 L71.9 43.1 L75.3 45.5 L78.8 47.1 L82.3 47.9 L85.7 47.9 L89.2 47.1 L92.7 45.5 L96.1 43.1 L99.6 40.2 L103.1 36.7 L106.5 33.0 L110.0 29.0 L113.5 25.0 L116.9 21.3 L120.4 17.8 L123.9 14.9 L127.3 12.5 L130.8 10.9 L134.3 10.1 L137.7 10.1 L141.2 10.9 L144.7 12.5 L148.1 14.9 L151.6 17.8 L155.1 21.3 L158.5 25.0 L162.0 29.0 L165.5 33.0 L168.9 36.7 L172.4 40.2 L175.9 43.1 L179.3 45.5 L182.8 47.1 L186.3 47.9 L189.7 47.9 L193.2 47.1 L196.7 45.5 L200.1 43.1 L203.6 40.2 L207.1 36.7 L210.5 33.0 L214.0 29.0" fill="none" stroke="var(--sage-strong)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Super runde S-Kurve ohne Zacken – klingt glatt und neutral, wie eine Stimmgabel oder leises Pfeifen.</span>
        </div>
        <div class="wave-compare-card">
          <strong>Echter Klang (Grundton + Obertöne)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 26.9 L9.5 17.6 L12.9 11.3 L16.4 9.3 L19.9 11.2 L23.3 15.4 L26.8 19.5 L30.3 22.3 L33.7 23.3 L37.2 23.3 L40.7 23.4 L44.1 23.9 L47.6 24.9 L51.1 25.9 L54.5 26.5 L58.0 26.9 L61.5 27.7 L64.9 29.3 L68.4 31.8 L71.9 34.5 L75.3 36.8 L78.8 38.1 L82.3 38.8 L85.7 39.9 L89.2 41.9 L92.7 44.7 L96.1 47.2 L99.6 47.4 L103.1 43.9 L106.5 36.5 L110.0 26.9 L113.5 17.6 L116.9 11.3 L120.4 9.3 L123.9 11.2 L127.3 15.4 L130.8 19.5 L134.3 22.3 L137.7 23.3 L141.2 23.3 L144.7 23.4 L148.1 23.9 L151.6 24.9 L155.1 25.9 L158.5 26.5 L162.0 26.9 L165.5 27.7 L168.9 29.3 L172.4 31.8 L175.9 34.5 L179.3 36.8 L182.8 38.1 L186.3 38.8 L189.7 39.9 L193.2 41.9 L196.7 44.7 L200.1 47.2 L203.6 47.4 L207.1 43.9 L210.5 36.5 L214.0 26.9" fill="none" stroke="var(--peach-strong)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Viele Sinuskurven legen sich übereinander. Diese Zacken und Dellen verleihen jedem Instrument seinen Charakter.</span>
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Hertz (Hz) = Schwing-Tempo</strong>
          <span><code>65 Hz</code> (tiefes <code>C2</code>) schwingt 65-mal pro Sekunde – eine echte <strong>5,24 Meter</strong> lange Welle im Raum! <code>440 Hz</code> (<code>A4</code>) misst nur noch <strong>78 cm</strong>.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Oktave = Doppeltes Tempo</strong>
          <span>Unser Ohr denkt in Verhältnissen: Von <code>220 → 440 Hz</code> (+220 Hz) und <code>440 → 880 Hz</code> (+440 Hz) klingt der Sprung exakt gleich – beides ist 2:1!</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Amplitude = Lautstärke</strong>
          <span>Wie stark die Welle ausschlägt (gemessen in Dezibel, dB), macht den Ton lauter oder leiser. Das Tempo (die Tonhöhe) bleibt davon unberührt.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Wellenform = Klangfarbe</strong>
          <span>Glatte Welle = weich wie eine Flöte. Zackige Welle = bissig und obertonreich wie eine verzerrte E-Gitarre oder Trompete.</span>
        </div>
      </div>

      <div class="k-meta-box">
        <strong>Direkt reinhören – Oktavsprung &amp; verschiedene Wellenformen auf C4 (261,6 Hz):</strong>
        <div class="k-btn-row" style="margin-top:0.35rem;">
          <button class="btn-tool" data-play-freqs="220,440,880" data-seq-step="650" data-osc="triangle" data-dur="0.75">▶ 220 → 440 → 880 Hz</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sine" data-dur="1.4">▶ Reine Sinuskurve</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="triangle" data-dur="1.4">▶ Dreieck (weicher)</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sawtooth" data-dur="1.4">▶ Sägezahn (bissig)</button>
        </div>
      </div>
    </article>

    <!-- 2. Das Frequenzspektrum -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. Das Frequenzspektrum</span>
        <span class="k-ratio-chip">20 Hz – 20 kHz</span>
      </div>
      <h4>Der Klang-Fingerabdruck: Was steckt in einem Ton?</h4>
      <p>
        Spielen ein Klavier und eine Gitarre genau denselben Ton <code>C4</code>, erkennst du sofort den Unterschied – obwohl die Hauptfrequenz identisch ist! Das Geheimnis liegt im <strong>Frequenzspektrum</strong>: Jeder natürliche Ton ist eigentlich ein ganzes Team aus vielen Sinuskurven gleichzeitig.
      </p>
      <p>
        Ein Spektrum (oder ein Visualizer im Musik-Player) zeigt wie ein Röntgenbild an, welche Frequenzen wie laut mitmischen: Ganz links steht der Grundton (<code>1×</code>), rechts daneben leuchten seine schnelleren Geschwister (Obertöne <code>2×</code> bis <code>10×</code>). Wähle einen Klang und hör sofort den Unterschied:
      </p>

      <div class="freq-spec-box">
        <div class="k-btn-row">
          <button class="k-filter-pill active" data-spec-preset="sine" data-play-freqs="261.63" data-osc="sine" data-dur="1.4" data-spec-desc="<strong>Reiner Sinuston:</strong> Nur ein einziger Balken bei 1× – null Obertöne. Klingt sehr glatt, fast steril, weil keine höheren Frequenzen mitfärben.">▶ Sinuston (C4)</button>
          <button class="k-filter-pill" data-spec-preset="piano" data-play-inst data-style="piano" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Klavier (Sample):</strong> Kräftiger Grundton, dazu runde untere Obertöne, die nach oben sanft ausfaden – deshalb klingt das Piano voll und warm.">▶ Klavier-Sample (C4)</button>
          <button class="k-filter-pill" data-spec-preset="guitar" data-play-inst data-style="guitar" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Gitarre (Sample):</strong> Die gezupfte Saite packt deutlich mehr Energie in die mittleren und oberen Balken – daher kommen Brillanz und Anschlags-„Pluck“.">▶ Gitarre-Sample (C4)</button>
          <button class="k-filter-pill" data-spec-preset="strings" data-play-inst data-style="strings" data-notes="C4" data-dur="1.6" data-spec-desc="<strong>Streicher (Sample):</strong> Der Bogen regt selbst hohe Obertöne (6×–10×) dauerhaft an. Darum schimmern Streicher seidig und setzen sich im Mix gut durch.">▶ Streicher-Sample (C4)</button>
        </div>

        <div class="freq-spec-bars">
          <div class="freq-spec-col"><div class="freq-spec-track"><div class="freq-spec-fill" data-spec-bar style="height:100%"></div></div><span class="freq-spec-label">1×</span></div>
          <div class="freq-spec-col"><div class="freq-spec-track"><div class="freq-spec-fill is-zero" data-spec-bar style="height:3%"></div></div><span class="freq-spec-label">2×</span></div>
          <div class="freq-spec-col"><div class="freq-spec-track"><div class="freq-spec-fill is-zero" data-spec-bar style="height:3%"></div></div><span class="freq-spec-label">3×</span></div>
          <div class="freq-spec-col"><div class="freq-spec-track"><div class="freq-spec-fill is-zero" data-spec-bar style="height:3%"></div></div><span class="freq-spec-label">4×</span></div>
          <div class="freq-spec-col"><div class="freq-spec-track"><div class="freq-spec-fill is-zero" data-spec-bar style="height:3%"></div></div><span class="freq-spec-label">5×</span></div>
          <div class="freq-spec-col"><div class="freq-spec-track"><div class="freq-spec-fill is-zero" data-spec-bar style="height:3%"></div></div><span class="freq-spec-label">6×</span></div>
          <div class="freq-spec-col"><div class="freq-spec-track"><div class="freq-spec-fill is-zero" data-spec-bar style="height:3%"></div></div><span class="freq-spec-label">7×</span></div>
          <div class="freq-spec-col"><div class="freq-spec-track"><div class="freq-spec-fill is-zero" data-spec-bar style="height:3%"></div></div><span class="freq-spec-label">8×</span></div>
          <div class="freq-spec-col"><div class="freq-spec-track"><div class="freq-spec-fill is-zero" data-spec-bar style="height:3%"></div></div><span class="freq-spec-label">9×</span></div>
          <div class="freq-spec-col"><div class="freq-spec-track"><div class="freq-spec-fill is-zero" data-spec-bar style="height:3%"></div></div><span class="freq-spec-label">10×</span></div>
        </div>

        <div id="freqSpecCaption" class="freq-spec-caption">
          <strong>Reiner Sinuston:</strong> Nur ein einziger Balken bei 1× – null Obertöne. Klingt sehr glatt, fast steril, weil keine höheren Frequenzen mitfärben.
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Sub &amp; Bass (20 – 250 Hz)</strong>
          <span>Kickdrum, E-Bass und Fundament. Diese langen Wellen spürst du oft zuerst in der Magengrube.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Mitten &amp; Wärme (250 Hz – 2 kHz)</strong>
          <span>Hier leben Gesang, Klavierkörper und Gitarrenakkorde. Zu viel davon klingt schnell „topfig“.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Präsenz &amp; Biss (2 – 6 kHz)</strong>
          <span>Konsonanten („S“, „T“), Plektrum-Klick und Klarheit. Unser Ohr ist hier besonders sensibel.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Luft &amp; Glanz (6 – 20 kHz)</strong>
          <span>Becken-Schimmer, feines Atmen und seidiger Raumklang bis hoch zur menschlichen Hörgrenze.</span>
        </div>
      </div>
    </article>

    <!-- 3. Interaktives 3-Spur-Wellenlabor -->
    <div class="wave-lab-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">3. Interaktives Wellen-Labor</span>
        <button id="toggleWavePauseBtn" class="k-ratio-btn">⏸ Welle anhalten</button>
      </div>
      <h4>Wellenlängen &amp; Mischwellen live beobachten</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-mid); line-height:1.4;">
        Die gestrichelten Linien markieren je <strong>1 volle Welle des Grundtons (grün)</strong>. Darunter schwingt der <strong>2. Ton (orange)</strong> – und ganz unten in Spur 3 siehst du die echte <strong>Summe beider Wellen</strong>, genau so wie sie an dein Trommelfell drückt.
      </p>
      <div class="wave-canvas-wrap">
        <canvas id="waveCanvas" class="wave-canvas" width="540" height="195"></canvas>
        <div id="waveExplainBanner" class="wave-explain-banner">
          ${PHYSICS_WAVE_EXPLANATIONS["2,1"]}
        </div>
      </div>
      <div class="k-btn-row">
        <button class="k-filter-pill active" data-wave-ratio="2,1" data-wave-semi="12">Oktave (2:1)</button>
        <button class="k-filter-pill" data-wave-ratio="3,2" data-wave-semi="7">Quinte (3:2)</button>
        <button class="k-filter-pill" data-wave-ratio="4,3" data-wave-semi="5">Quarte (4:3)</button>
        <button class="k-filter-pill" data-wave-ratio="5,4" data-wave-semi="4">Gr. Terz (5:4)</button>
        <button class="k-filter-pill" data-wave-ratio="6,5" data-wave-semi="3">Kl. Terz (6:5)</button>
        <button class="k-filter-pill" data-wave-ratio="5,3" data-wave-semi="9">Gr. Sexte (5:3)</button>
        <button class="k-filter-pill" data-wave-ratio="45,32" data-wave-semi="6">Tritonus (45:32)</button>
        <button class="k-filter-pill" data-wave-ratio="16,15" data-wave-semi="1">Kl. Sekunde (16:15)</button>
      </div>
    </div>

    <!-- 4. Stehende Wellen & erweiterte Obertonreihe (1-12) -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">4. Das Naturgesetz der Musik</span>
        <span class="k-ratio-chip">1× bis 12× Grundton</span>
      </div>
      <h4>Stehende Wellen &amp; die Obertonreihe (1. bis 12. Teilton)</h4>
      <p>
        Zupfst du eine Saite an, die links und rechts festgespannt ist, bleibt sie an den Enden still stehen. Deshalb schwingt sie gleichzeitig als Ganzes, in Hälften (doppelt so schnell), in Dritteln (dreimal so schnell), Vierteln… So entsteht in jedem einzigen Ton von Natur aus eine ganze Leiter an versteckten Obertönen!
      </p>
      <p>
        Tipp auf die Kacheln! Besonders spannend sind die lila markierten Töne <strong>7</strong> und <strong>11</strong> (das „Alphorn-Fa“): Sie liegen genau <em>zwischen</em> zwei Klaviertasten – unverfälschte Natur pur.
      </p>
      <div class="overtone-grid">
        ${PHYSICS_OVERTONES.map(ot => `
          <button class="overtone-btn ${ot.special ? "is-blue" : ""}" data-play-freqs="${ot.freq}" data-osc="triangle" data-dur="1.15">
            <span class="overtone-num">${ot.num}. Teilton</span>
            <span class="overtone-note">${ot.note}</span>
            <span class="overtone-ratio">${ot.ratio}</span>
          </button>
        `).join("")}
      </div>
      <div class="k-meta-box">
        <strong>Warum Dur so selbstverständlich klingt:</strong> Die Teiltöne <strong>4 : 5 : 6</strong> ergeben automatisch einen strahlenden Dur-Dreiklang. Ein reiner Moll-Dreiklang taucht viel weiter oben erst bei <strong>10 : 12 : 15</strong> auf!
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="${PHYSICS_OVERTONES.map(o => o.freq).join(",")}" data-seq-step="380" data-osc="triangle" data-dur="0.65">▶ Ganze Reihe (1–12)</button>
        <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Dur-Kern (4:5:6)</button>
        <button class="btn-tool" data-play-freqs="261.63,313.96,392.45" data-osc="triangle" data-dur="2.0">▶ Moll-Kern (10:12:15)</button>
      </div>
    </article>

    <!-- 5. Schwebung (Beats) -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">5. Akustische Schwebung</span>
        <span class="k-ratio-chip">Abstand in Hz = Puls/Sek.</span>
      </div>
      <h4>Wenn Wellen „pumpen“: Stimmen nach Gehör</h4>
      <p>
        Klingen zwei Saiten fast gleich hoch, laufen ihre Wellenberge mal zusammen (doppelt laut) und kurz darauf genau gegeneinander (kurz leise). Dieses hörbare Wabern („wau-wau-wau“) heißt <strong>Schwebung</strong>. Wie oft es pro Sekunde pulsiert, verrät exakt die <strong>Hertz-Differenz</strong>! Sind beide Saiten perfekt gestimmt, wird das Wabern komplett ruhig.
      </p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="440,440" data-osc="sine" data-dur="2.4">▶ 0 Hz (440+440 · perfekt ruhig)</button>
        <button class="btn-tool" data-play-freqs="440,442" data-osc="sine" data-dur="2.6">▶ 2 Hz (440+442 · 2x/Sek.)</button>
        <button class="btn-tool" data-play-freqs="440,446" data-osc="sine" data-dur="2.4">▶ 6 Hz (440+446 · schnelles Flirren)</button>
        <button class="btn-tool" data-play-freqs="440,466" data-osc="sine" data-dur="2.2">▶ 26 Hz (440+466 · rauer Reibungsklang)</button>
      </div>
    </article>

    <!-- 6. Reine Stimmung vs. Gleichstufige Klavier-Stimmung -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">6. Stimmung &amp; Klavier-Kompromiss</span>
        <span class="k-ratio-chip">+23,5 Cent Lücke</span>
      </div>
      <h4>Warum kein Klavier der Welt „komplett rein“ gestimmt ist</h4>
      <p>
        Eine schräge Laune der Physik: Stapelt man 12 perfekte Quinten (3:2) übereinander, landet man ganz knapp zu hoch – um rund <strong>23,5 Cent</strong> höher als 7 exakte Oktaven! Würde ein Klavierbauer C-Dur absolut rein stimmen, klängen entfernte Tonarten wie Fis-Dur grauenhaft schief.
      </p>
      <p>
        Der clevere Kompromiss unserer modernen Musik heißt <strong>gleichstufige Stimmung</strong>: Die Oktave wird schlicht in 12 exakt gleich große Mini-Schritte geteilt. Jetzt funktioniert zwar jeder Song in jeder Tonart – aber dafür schwingt unsere große Terz (C–E) auf jedem Klavier um <strong>14 Cent höher</strong> als die reine Natur-Terz. Hör den Unterschied zwischen theoretischer Naturstimmung und einem echten Klavier-Sample:
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Reine Naturstimmung (5:4)</h5>
          <p>Null Schwebung – schmilzt glatt zusammen, funktioniert aber nicht in allen Tonarten:</p>
          <button class="btn-tool" data-play-freqs="261.63,327.04" data-osc="triangle" data-dur="2.3">▶ Reine Terz (5:4 · glatt)</button>
          <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.3">▶ Reiner C-Dur-Dreiklang</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Klavier / Gleichstufig (+14 ct)</h5>
          <p>Echte Studio-Klaviersamples: leichtes Schimmern – dafür in allen 12 Tonarten spielbar:</p>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4" data-dur="2.3">▶ Klavier-Terz (Sample C4 + E4)</button>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4,G4" data-dur="2.3">▶ Klavier C-Dur (Sample)</button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Erklärseiten („So funktioniert’s“) für jede Übungs-Auswahlseite
 */
const CATEGORY_HELP_GUIDES = {
  cadence: {
    tagClass: "tag-sage",
    tag: "Anleitung • Kadenzen",
    title: "So funktioniert das Kadenz-Training",
    lead: "Statt einzelne Akkorde isoliert zu raten, hörst du hier komplette viertaktige Akkordfolgen im Zusammenhang – in <strong>Dur</strong> und in <strong>Moll</strong> – und bestimmst die gesuchte Akkordstufe am Fragezeichen.",
    sections: `
      <h3>Die vier Übungsgruppen (Dur &amp; Moll)</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Dur • Ziel: Takt 4</h5>
          <p>Die Takte 1–3 sind sichtbar und gründen die Dur-Tonart. Du hörst alle vier Takte und bestimmst den fehlenden Akkord für <strong>Takt 4</strong>.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Dur • Zufälliger Takt (1–4)</h5>
          <p>Das Fragezeichen wandert zufällig auf Takt 1, 2, 3 oder 4. Auch wenn Takt 1 gesucht ist, bleibt immer eine sichtbare Tonika (<strong>I</strong>) erhalten.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Moll • Ziel: Takt 4</h5>
          <p>Dieselben Hör-Aufgaben in echten Moll-Tonarten (z. B. <code>i–iv–V</code>): Höre drei Takte Kontext und wähle die fehlende Moll-Funktion in <strong>Takt 4</strong>.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Moll • Zufälliger Takt (1–4)</h5>
          <p>Das Fragezeichen steht irgendwo in Takt 1–4; zur sicheren Orientierung bleibt stets mindestens eine sichtbare Moll-Tonika (<strong>i</strong>) im System.</p>
        </div>
      </div>

      <h3>Die 4 Schwierigkeitsstufen (Dur &amp; Moll)</h3>
      <ul class="article-steps-list">
        <li><strong>Stufe 1 – Basis (I–V / i–V):</strong> Die vier Grundpfeiler: in Dur <code>I, IV, V, vi</code>, in Moll <code>i, iv, V, VI</code>.</li>
        <li><strong>Stufe 2 – Diatonisch (ii–vi / ii°–VII):</strong> Alle leitereigenen Hauptstufen (in Dur inkl. <code>ii</code> &amp; <code>iii</code>; in Moll inkl. <code>ii°, III, v, V, VII</code>).</li>
        <li><strong>Stufe 3 – Erweitert (V/V / N6):</strong> Neben <code>V7</code> und Zwischendominante <code>V/V</code> taucht in Moll der Neapolitaner <code>N6</code> auf.</li>
        <li><strong>Stufe 4 – Jazz &amp; Tritone (bII7 / iiø7):</strong> Voller Umfang bis hin zu Tritonussubstitution <code>bII7</code> sowie Moll-<code>ii–V</code> (<code>iiø7</code>).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Steuerung, Nur Hören &amp; Prüfung</h4>
        <p>Oben im Aufgabenfeld wählst du <strong>Tonart</strong> und <strong>Tempo (BPM)</strong>. Unten geben dir <strong>Tonika (I)</strong> / <strong>Tonika (i)</strong> und <strong>Stufe nochmal</strong> direkten Halt; links aktiviert der <strong>Loop-Button</strong> die Endlosschleife, rechts <strong>Nur Hören</strong> den automatischen Durchlauf. Nach einem Irrtum vergleichen <strong>A/B Vergleich</strong> und <strong>Bass / Grundton</strong> deinen Tipp mit der Lösung – und über die <strong>Kategorie-Prüfung</strong> testest du Dur und Moll unter Prüfungsbedingungen.</p>
      </div>
    `
  },
  interval: {
    tagClass: "tag-peach",
    tag: "Anleitung • Intervalle",
    title: "So funktioniert das Intervalltraining",
    lead: "Hier schärfst du dein Gehör für einzelne Tonabstände zwischen zwei Tönen – aufwärts, abwärts, gleichzeitig und über eine gehaltene Streicher-Fläche. Bei melodischen Intervallen und der Fläche wechselt der Ausgangston bei jeder Aufgabe in einer gut hörbaren mittleren Lage. (Für ganze Akkorde und Umkehrungen gibt es das eigene Modul <strong>Akkorde</strong>!)",
    sections: `
      <h3>Die 4 Übungstypen</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Melodische Intervalle (Aufwärts)</h5>
          <p>Zwei Töne erklingen nacheinander nach oben: Takt 1 zeigt den zufälligen Ausgangston (Lage <code>F3–E4</code>), Takt 2 fragt nach dem Sprung hinauf zum höheren Zielton.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Melodische Intervalle (Abwärts)</h5>
          <p>Zwei Töne erklingen nacheinander nach unten: Takt 1 startet auf einem zufälligen höheren Ausgangston (Lage <code>Fis4–F5</code>), Takt 2 fragt nach dem Abstand abwärts – eine klassische Hör-Challenge!</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Harmonische Intervalle</h5>
          <p>Beide Töne klingen gleichzeitig als Zweiklang. Du achtest auf Verschmelzung oder Reibung – nach richtiger Antwort stehen oben beide Töne (z. B. <code>C4 + G4</code>).</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Intervalle über Grundton-Fläche (Streicher ➔ Klavier)</h5>
          <p>Eine warme <strong>Streicher-Fläche</strong> legt den Grundton als Klangteppich aus. Nach einer kurzen Verzögerung spielt das <strong>Klavier</strong> den gesuchten Ton darüber – über die beiden Regler <strong>Grundton-Fläche</strong> (Standard 50 %) und <strong>Intervall</strong> passt du das Lautstärkeverhältnis jederzeit an.</p>
        </div>
      </div>

      <h3>Stufenaufbau: Dur, Moll, Chromatisch &amp; Freie Auswahl</h3>
      <ul class="article-steps-list">
        <li><strong>Einsteiger (Stufe 1 in Dur / Moll 1):</strong> Vier markante Dreiklangs-Anker (aufwärts, abwärts, gleichzeitig oder über Fläche): Prime (<code>P1</code>), große Terz (<code>M3</code> in Dur) bzw. kleine Terz (<code>m3</code> in Moll), reine Quinte (<code>P5</code>) und Oktave (<code>P8</code>).</li>
        <li><strong>Untere Hälfte 1–4 (Stufe 2 in Dur / Moll 2):</strong> Der untere Tetrachord mit 4 Intervallen: Prime (<code>P1</code>), große Sekunde (<code>M2</code>), große bzw. kleine Terz (<code>M3</code> / <code>m3</code>) und reine Quarte (<code>P4</code>).</li>
        <li><strong>Obere Hälfte 5–8 (Stufe 3 in Dur / Moll 3):</strong> Der obere Tetrachord mit 4 Intervallen: reine Quinte (<code>P5</code>), große bzw. kleine Sexte (<code>M6</code> / <code>m6</code>), große bzw. kleine Septime (<code>M7</code> / <code>m7</code>) und Oktave (<code>P8</code>).</li>
        <li><strong>Ganze Tonleiter (Stufe 4 Dur-Tonleiter / Moll 4 Moll-Tonleiter):</strong> Alle 8 diatonischen Intervalle vom Ausgangston bis zur Oktave in Dur bzw. natürlichem Moll.</li>
        <li><strong>Stufe 5 – Chromatisch:</strong> Alle 15 Intervalle von der Prime bis zur großen None (<code>M9</code>) inklusive sämtlicher kleiner/großer Intervalle und Tritonus (<code>TT</code>).</li>
        <li><strong>Freie Tonart &amp; Modi (Eigenes Intervall-Training):</strong> Wähle einen festen <strong>Grundton</strong> (<code>C</code> bis <code>H</code>) oder <strong>Zufall</strong>, eine <strong>Tonleiter bzw. Kirchentonart</strong> (<em>Dur/Ionisch</em>, <em>Natürlich/Harmonisch/Melodisch Moll</em>, <em>Dorisch</em>, <em>Phrygisch</em>, <em>Lydisch</em>, <em>Mixolydisch</em>, <em>Lokrisch</em>, <em>Chromatisch</em>), den <strong>Umfang</strong> (<em>Einsteiger</em>, <em>1–4</em>, <em>5–8</em>, <em>1–8</em>) oder schalte einzelne Intervalle frei an und aus – auf der Auswahlseite sowie live in der Übung über das Badge oben rechts.</li>
      </ul>

      <h3>Wie die Intervall-Kürzel funktionieren</h3>
      <ul class="article-steps-list">
        <li><strong>Buchstabe = Klangfarbe (Qualität), Zahl = Tonschritt (<code>1</code>–<code>9</code>):</strong> Die Zahl zählt die Stammtöne vom Start- bis zum Zielton (z. B. <code>1</code> = Prime, <code>2</code> = Sekunde, <code>3</code> = Terz, … bis <code>9</code> = None). Der Buchstabe verrät die genaue Größe in Halbtönen.</li>
        <li><strong><code>P</code> = Rein (engl. <em>Perfect</em>):</strong> Gilt für Prime (<code>P1</code>), Quarte (<code>P4</code>), Quinte (<code>P5</code>) und Oktave (<code>P8</code>). Diese Abstände gibt es nicht in „groß“ oder „klein“ – sie verschmelzen akustisch besonders stabil und klar.</li>
        <li><strong><code>G</code> &amp; <code>k</code> (Deutsch) oder <code>M</code> &amp; <code>m</code> (International):</strong> Steht bei Sekunde (<code>2</code>), Terz (<code>3</code>), Sexte (<code>6</code>), Septime (<code>7</code>) und None (<code>9</code>):<br>
          – <strong>Großbuchstabe <code>G</code></strong> (<em>Groß</em>) bzw. <strong><code>M</code></strong> (<em>Major</em>) markiert die größere, hellere Variante (z. B. <code>G3</code> / <code>M3</code> = große Terz, 4 Halbtöne).<br>
          – <strong>Kleinbuchstabe <code>k</code></strong> (<em>klein</em>) bzw. <strong><code>m</code></strong> (<em>minor</em>) liegt genau <strong>1 Halbton enger</strong> und klingt weicher oder gespannter (z. B. <code>k3</code> / <code>m3</code> = kleine Terz, 3 Halbtöne). Achte in der internationalen Schreibweise besonders auf klein <code>m</code> vs. groß <code>M</code>!</li>
        <li><strong><code>TT</code> = Tritonus:</strong> Der charakteristische 6-Halbton-Sprung genau zwischen Quarte (<code>P4</code>) und Quinte (<code>P5</code>).</li>
      </ul>
      <p><em>Schreibweise wechseln:</em> In den <strong>App-Einstellungen → Musikalische Schreibweise → Intervall-Namensgebung</strong> kannst du jederzeit zwischen <strong>Deutsch (P / G / k)</strong> und <strong>International (P / M / m)</strong> wählen.</p>

      <div class="article-highlight-box">
        <h4>Mitsingen, A/B Vergleich &amp; Prüfung</h4>
        <p>Der Chip <strong>Mitsingen</strong> oben (mit optionaler Summ-Pause) hilft deiner Stimme, den Abstand zu erspüren. Unten spielt <strong>Ausgangston</strong> jederzeit den Startton; nach einem Irrtum vergleicht <strong>A/B Vergleich</strong> deinen Tipp ab genau diesem Ausgangston und in derselben Richtung mit der Lösung. Mit <strong>Loop</strong> wiederholst du die Aufgabe endlos (<strong>Auto-Weiter</strong> in den Einstellungen wechselt nach Treffer direkt zur nächsten), mit <strong>Nur Hören</strong> läuft der Durchgang passiv mit Auflösung – und die <strong>Kategorie-Prüfung</strong> prüft alle 4 Intervalltypen gemischt (Dur, Moll, Hälften, Dur &amp; Moll gemischt, Chromatisch sowie Freie Tonart &amp; Modi).</p>
      </div>
    `
  },
  chords: {
    tagClass: "tag-sage",
    tag: "Anleitung • Akkorde",
    title: "So funktioniert das Akkordtraining",
    lead: "Trainiere Akkordfarben sowohl zerlegt als Arpeggio (aufwärts und abwärts) als auch als vollen Zusammenklang – und lerne gezielt zu hören, welcher Akkordton ganz unten im Bass liegt.",
    sections: `
      <h3>Die 4 Übungstypen</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Akkord-Arpeggio (Aufwärts ↗)</h5>
          <p>Die Akkordtöne erklingen nacheinander von unten nach oben. So hörst du Terzen, Quinten und Septimen kristallklar heraus – nach Treffer fasst die App den Akkord als kurzen Vollklang zusammen.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Akkord-Arpeggio (Abwärts ↘)</h5>
          <p>Der Akkord rollt von oben nach unten ab. Ideal, um Akkordstrukturen auch gegen die gewohnte Leserichtung sicher zu erkennen – nach der Lösung erklingt der komplette Akkord gleichzeitig.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Akkorde (Gleichzeitig)</h5>
          <p>Drei bis fünf Töne klingen gleichzeitig als Vollklang. Du achtest auf den Gesamtcharakter – nach richtiger Antwort fächert ein Arpeggio alle Einzeltöne (z. B. <code>C4 · E4 · G4 · H4</code>) sauber auf.</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Akkordumkehrungen</h5>
          <p>Erkenne, welcher Akkordton ganz unten im Bass liegt: <code>Bass: 1</code> (Grundstellung), <code>Bass: 3</code> (1. Umkehrung), <code>Bass: 5</code> (2. Umkehrung) oder <code>Bass: 7</code> (3. Umkehrung). Der Basston bleibt dabei stets in einer mittleren Lage, damit du nach Farbe statt absoluter Tonhöhe entscheidest.</p>
        </div>
      </div>

      <h3>Schwierigkeitsstufen: Akkordtypen (4 Stufen)</h3>
      <ul class="article-steps-list">
        <li><strong>Stufe 1 – Einfache Dreiklänge:</strong> Die vier Grundfarben Dur (<code>maj</code>), Moll (<code>m</code>), Vermindert (<code>dim</code>) und Übermäßig (<code>aug</code>).</li>
        <li><strong>Stufe 2 – Sept &amp; Sus:</strong> Zusätzlich Quartvorhalt (<code>sus4</code>), Dominantseptakkord (<code>7</code>), Großer Septakkord (<code>maj7</code>) und Moll-Septakkord (<code>m7</code>).</li>
        <li><strong>Stufe 3 – Erweiterte Vierklänge:</strong> Mit <code>sus2</code>, Halbvermindert (<code>m7♭5</code>), Vollvermindert (<code>°7</code>) und Moll-Major-7 (<code>m(maj7)</code>).</li>
        <li><strong>Stufe 4 – Jazz &amp; Optionstöne:</strong> Alle 15 Akkordtypen bis hin zu farbigen Jazz-Spannungen wie <code>maj9</code>, <code>7♭9</code> und <code>7♯9</code>.</li>
      </ul>

      <h3>Schwierigkeitsstufen: Akkordumkehrungen (3 Stufen)</h3>
      <ul class="article-steps-list">
        <li><strong>Stufe 1 – Dur-Dreiklang (3):</strong> Grundstellung (<code>Bass: 1</code>), Sextakkord / 1. Umkehrung (<code>Bass: 3</code>) und Quartsextakkord / 2. Umkehrung (<code>Bass: 5</code>).</li>
        <li><strong>Stufe 2 – Dur &amp; Moll (3):</strong> Alle drei Lagen sowohl mit hellen Dur- als auch mit weichen Moll-Dreiklängen.</li>
        <li><strong>Stufe 3 – Septakkorde (4):</strong> Vierstimmige Septakkorde (<code>7</code>, <code>maj7</code>, <code>m7</code>) inklusive 3. Umkehrung mit der Septime im Bass (<code>Bass: 7</code>).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Tipps für deine Übungsrunde</h4>
        <p>Der Button <strong>Grundton</strong> spielt jederzeit den Grundton der aktuellen Aufgabe; nach einem Fehlversuch vergleicht <strong>A/B Vergleich</strong> deine Wahl auf derselben Basis direkt mit der Lösung, und bei Umkehrungen isoliert <strong>Basston hören</strong> zusätzlich die tiefste Stimme. Nutze außerdem <strong>Loop</strong>, <strong>Nur Hören</strong> und die 4-stufige <strong>Kategorie-Prüfung</strong>.</p>
      </div>
    `
  },
  melody: {
    tagClass: "tag-lilac",
    tag: "Anleitung • Melodien",
    title: "So funktioniert das Melodie-Training",
    lead: "Hier verbindest du dein Solfège-Gehör mit echtem Taktgefühl direkt im Notensystem: Auf eine 4-Akkord-Kadenz folgt ein 1-taktiger Einzähler und eine Phrase aus 4–6 Noten.",
    sections: `
      <h3>Ablauf jeder Aufgabe</h3>
      <ul class="article-steps-list">
        <li><strong>1. Kadenz, Einzähler &amp; echtes Notensystem:</strong> Eine Referenzkadenz (<code>I – vi – IV – V</code>) richtet dein Ohr auf die Tonart ein. Nach 1 Takt Einzähler im <code>4/4</code>- oder <code>3/4</code>-Takt erklingen 4–6 Noten (mit Achteln, Vierteln, punktierten Vierteln, Halben &amp; Pausen), sichtbar als Notenbild im 5-Linien-System.</li>
        <li><strong>2. Drei wählbare Melodie-Stile:</strong> Auf der Auswahlseite wählst du zwischen <strong>Rhythmische Melodie</strong> (Notenwerte stehen bereits im System, Fokus auf Tonhöhe), <strong>Kombi-Diktat</strong> (Tonhöhe auf der Klaviatur <em>und</em> Notenwert <code>1/8</code>, <code>1/4</code>, <code>1/4.</code>, <code>1/2</code> darunter in beliebiger Reihenfolge lösen) und <strong>Gleichmäßig (Basis)</strong> (4 ruhige halbe Noten zum Einstieg).</li>
        <li><strong>3. Schritt für Schritt im Notenbild lösen:</strong> Sobald ein Ton gelöst ist, erscheint seine Solfège-Silbe (oder Stufenzahl <code>1–7</code>) direkt unter der Note, und der Fokus wandert zum nächsten Fragezeichen weiter.</li>
        <li><strong>4. Wiederholen &amp; einzelne Töne antippen:</strong> Mit <strong>▶ Abspielen</strong> hörst du die ganze Phrase ohne Fortschrittsverlust neu. <strong>Ton nochmal</strong> (oder das Antippen einer bereits gelösten/aktiven Note im System) spielt gezielt nur diesen Ton mit kurzem Vorpuls.</li>
      </ul>

      <h3>Stufen, Tonarten &amp; Steuerung</h3>
      <ul class="article-steps-list">
        <li><strong>Stufe 1 – Do–Fa:</strong> 4–5-tönige Phrasen aus dem unteren Tetrachord (<code>Do, Re, Mi, Fa</code>).</li>
        <li><strong>Stufe 2 – Sol–Do:</strong> 4–6-tönige Phrasen aus dem oberen Raum bis zur Oktave (<code>Sol, La, Ti, Do</code>).</li>
        <li><strong>Stufe 3 – Ganze Tonart:</strong> Alle sieben Solfège-Stufen (<code>Do</code> bis <code>Do</code>) über 4–6 Töne.</li>
        <li><strong>Tonarten, Oktaven &amp; Helfer:</strong> Trainiere fest in <code>C-Dur</code> oder in wechselnden Zufallstonarten, innerhalb 1 Oktave oder über mehrere Oktaven. Oben steuerst du <strong>Tonart</strong>, <strong>Puls: An/Aus</strong> und <strong>Tempo (BPM)</strong>; unten liegen <strong>Tonika (Do)</strong>, <strong>Auto-Weiter</strong> (links), <strong>Nur Hören</strong> sowie die 5-stufige <strong>Kategorie-Prüfung</strong>.</li>
      </ul>
    `
  },
  solfege: {
    tagClass: "tag-sage",
    tag: "Anleitung • Solfège",
    title: "So funktioniert das Solfège-Training",
    lead: "Solfège schult das relative Gehör in Dur und Moll: Du lernst, jede Tonstufe (Do–Ti bzw. Do–Re–Me–Fa–Sol–Le–Te oder Stufenzahlen) an ihrer typischen Spannung und ihrem Auflösungsdrang innerhalb einer Tonart zu erkennen.",
    sections: `
      <h3>Ablauf jeder einzelnen Aufgabe</h3>
      <ul class="article-steps-list">
        <li><strong>1. Kontext-Kadenz:</strong> Zu Beginn erklingt im gewählten Tempo eine Referenzkadenz – in Dur <code>I – vi – IV – V</code>, in Moll <code>i – VI – iv – V</code> –, damit sich dein Gehör sicher in der Tonart einrichtet.</li>
        <li><strong>2. Gesuchter Einzelton:</strong> Nach einer deutlichen Pause hörst du genau eine Stufe aus dem aktiven Tonraum.</li>
        <li><strong>3. Antwort auf der Klaviatur:</strong> Nur die aktiven Töne der jeweiligen Übung tragen ihre Beschriftung (Dur: <em>Do–Re–Mi–Fa–Sol–La–Ti–Do</em>, Moll: <em>Do–Re–Me–Fa–Sol–Le–Te–Do</em> oder wahlweise <em>Stufenzahlen</em>), eingerahmt von je einer Randtaste; inaktive Tasten sind abgedunkelt.</li>
        <li><strong>4. Rückmeldung &amp; Auflösung:</strong> Eine falsche Taste wird stumm rot markiert, damit deine Tonvorstellung stabil bleibt. Bei der richtigen Taste leuchtet sie grün und spielt automatisch die Auflösung zurück zur Tonika (<code>Do–Fa</code> abwärts, <code>Sol–Ti/Te</code> aufwärts).</li>
      </ul>

      <h3>Dur, Moll &amp; Eigene Tonart (Stufen-Aufbau)</h3>
      <ul class="article-steps-list">
        <li><strong>Stufe 1 &amp; 2 – Tonleiter-Hälften (je 4 Töne):</strong> Sanfter Einstieg mit nur 4 aktiven Tasten: zuerst die untere Hälfte <code>Do–Fa</code>, dann die obere Hälfte <code>Sol–Do</code> in fester Grundtonart (<code>C-Dur</code> bzw. <code>c-Moll</code>).</li>
        <li><strong>Stufe 3 &amp; 4 – Ganze Tonleiter (1 Oktave):</strong> Alle 7 Stufen in <code>C-Dur</code> / <code>c-Moll</code> (Stufe 3) bzw. in einer zufällig festgelegten anderen Tonart für die gesamte Sitzung (Stufe 4).</li>
        <li><strong>Stufe 5 &amp; 6 – Mehrere Oktaven:</strong> Der Zielton springt auch in tiefere oder höhere Oktaven – fest in <code>C-Dur</code> / <code>c-Moll</code> (Stufe 5) bzw. in einer festen Zufallstonart (Stufe 6).</li>
        <li><strong>Stufe 7 &amp; 8 – Tonartwechsel:</strong> Nach jeder richtigen Antwort wechselt die Tonart neu – erst innerhalb einer Oktave (Stufe 7), dann über mehrere Oktaven (Stufe 8).</li>
        <li><strong>Komplett in Dur &amp; Moll:</strong> Alle 8 Stufen stehen spiegelbildlich für Dur und Natürlich Moll bereit.</li>
        <li><strong>Eigene Tonart (Dur &amp; Moll):</strong> Wähle Tongeschlecht (Dur/Moll), beliebige Tonart (alle 12 oder Zufall), Tonraum (<code>Do–Fa</code>, <code>Sol–Do</code>, <code>Ganze Tonart</code>) und Oktavlage frei – vor dem Start oder jederzeit direkt über das klickbare Badge oben rechts in der Übung.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Hilfen, Mitsingen, Schreibweise &amp; Prüfung</h4>
        <p>Oben lädt <strong>Mitsingen</strong> (optional mit Summ-Pause) zum Nachsingen zurück zum Do ein; rechts daneben passt du das <strong>Tempo (BPM)</strong> an. Über der Klaviatur stehen der <strong>Tonarten-Button</strong> (spielt den Dur- oder Moll-Tonika-Akkord an), <strong>Tonika (Do)</strong> und <strong>Ton nochmal</strong> bereit. Unten wiederholt der lila <strong>Loop-Button</strong> den Zielton alle 3 Sekunden, <strong>Nur Hören</strong> löst automatisch mit Auflösung auf. Zwischen <strong>Silben</strong> und <strong>Stufenzahlen</strong> (<code>1–7</code> bzw. <code>b3, b6, b7</code>) sowie <strong>Auto-Weiter</strong> wechselst du in den <strong>App-Einstellungen</strong> – und die <strong>Kategorie-Prüfung</strong> testet Dur, Moll, Hälften, Dur &amp; Moll im Wechsel sowie deine Eigene Tonart.</p>
      </div>
    `
  },
  rhythm: {
    tagClass: "tag-sage",
    tag: "Anleitung • Rhythmus",
    title: "So funktioniert das Rhythmus-Training",
    lead: "Vier vielseitige Bereiche schulen Taktgefühl, Rhythmus-Diktat, Nachklopfen &amp; Vom-Blatt-Tappen sowie Groove-Timing – übersichtlich notiert im Einlinien-Notensystem und per Tempo (BPM) steuerbar.",
    sections: `
      <h3>Die 4 Rhythmus-Module im Überblick</h3>
      <ul class="article-steps-list">
        <li><strong>1. Taktart &amp; Metrum erkennen (3 Stufen):</strong> Höre zwei Takte Percussion (mit betonter <code>1</code>) und unterscheide <code>4/4</code> &amp; <code>3/4</code> (Stufe 1), <code>2/4</code> &amp; <code>6/8</code> (Stufe 2) sowie ungerade Takte <code>5/4</code> &amp; <code>7/8</code> (Stufe 3). Unten gibt <strong>Viertel-Puls</strong> jederzeit das Grundmetrum.</li>
        <li><strong>2. Rhythmus-Diktat (4 Zählzeiten, 4 Stufen):</strong> Auf dem Einlinien-Notensystem erklingt nach 1 Takt Vorzähler ein 4-Schlag-Muster auf der Clave. Enthülle Schritt für Schritt alle vier Fragezeichen (von Vierteln, Achteln &amp; Pausen über Offbeats &amp; Triolen bis zu Sechzehnteln und 16tel-Synkopen) – mit <strong>Metronom (1–4)</strong>, <strong>Schlag nochmal</strong> (oder Antippen der Schläge) und <strong>Auto-Weiter</strong>.</li>
        <li><strong>3. Tap-Pad: Nachklopfen &amp; Vom Blatt tappen (je 4 Stufen):</strong> Im Modus <strong>Nachklopfen</strong> hörst du Vorzähler + Demo und klopfst auf dem <strong>Tap-Pad</strong> (oder der <code>Leertaste</code>) nach – inklusive <strong>Klick: An/Aus</strong>, <strong>Nur anhören</strong> und Stufe 4 <em>Blindflug</em>. Im Modus <strong>Vom Blatt tappen</strong> entfällt das Vorspielen: Du liest den Rhythmus direkt vom Notensystem ab und tappst nach 1 Takt Vorzähler zum Metronom (Stufe 4: <em>Ohne Metronom</em>). Ein <strong>Zeitstrahl</strong> zeigt anschließend <code>exakt</code>, <code>knapp (±ms)</code>, <code>verpasst</code> und <code>zu viel</code>.</li>
        <li><strong>4. Groove, Akzente &amp; Mikro-Timing (4 Stufen):</strong> Stufe 1 unterscheidet <em>Groove-Stile</em> (Marsch, Backbeat, Synkope, Swing, 3 vs. 2), Stufe 2 sucht den Cowbell-<em>Offbeat-Akzent</em> (<code>1</code>–<code>4+</code>), Stufe 3 trainiert <em>Mikro-Timing (±55 ms)</em> und Stufe 4 <em>Profi-Timing (±28 ms)</em> (zu früh, exakt „In the Pocket“ oder laid-back).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Tipps zum Üben &amp; Kategorie-Prüfung</h4>
        <p>Starte beim <strong>Tap-Pad</strong> mit eingeschaltetem <strong>Klick</strong> bei 80–95 BPM und schalte links unten bei Bedarf <strong>Auto-Weiter</strong> zu. Wenn dein innerer Puls sitzt, prüfe dich im <strong>Blindflug</strong>, beim <strong>Vom-Blatt-Tappen ohne Metronom</strong>, im <strong>Nur-Hören-Modus</strong> oder in der 4-stufigen <strong>Kategorie-Prüfung</strong>.</p>
      </div>
    `
  },
  production: {
    tagClass: "tag-lilac",
    tag: "Anleitung • Produktion & Mixing",
    title: "So funktioniert das Frequenz- & EQ-Training",
    lead: "Schule dein Gehör auf klassische Studio-Frequenzbänder – zuerst mit isolierten Sinustönen über 5 bis 12 Bänder und danach wie am Mischpult als parametrischer EQ-Boost im Rosa Rauschen.",
    sections: `
      <h3>Die 2 Produktions-Module</h3>
      <ul class="article-steps-list">
        <li><strong>1. Frequenzen erkennen (Sinuston, 3 Stufen):</strong> Höre einen ausgeglichenen Sinuston zwischen Subbass (<code>63 Hz</code>) und Air-Höhen (<code>12 kHz</code>) über <strong>5 Bänder</strong>, <strong>8 Oktavbänder</strong> oder <strong>12 Bänder</strong> und ordne ihn zu. Über <strong>„Ref: 1 kHz“</strong> kalibrierst du dein Ohr jederzeit neu.</li>
        <li><strong>2. EQ-Boost im Pink Noise (3 Stufen):</strong> Im <strong>freien Training</strong> startet das Rosa Rauschen sofort dauerhaft mit dem angehobenen Ziel-EQ (Stufe 1: Breiter EQ <code>+10 dB / Q 1,6</code>, Stufe 2: Oktav-EQ <code>+8,5 dB / Q 2,6</code>, Stufe 3: Chirurgisch <code>+7 dB / Q 4,2</code>). Über die obere <strong>Flat-Karte</strong> oder den Button <strong>„Flat-Bypass“</strong> schaltest du jederzeit fließend auf neutrales Rauschen um. Im Modus <strong>Nur Hören</strong> spielt die App erst kurz <em>Flat</em>, dann länger den <em>EQ-Boost</em> und zeigt nach kurzer Denkpause automatisch das Band.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Gehörschutz, Vergleich &amp; Prüfung</h4>
        <p>Rosa Rauschen (-3 dB pro Oktave) verteilt die Energie gleichmäßig über alle Oktaven. Ein -14 dBFS Schutz-Limiter, Lautheits-Ausgleich rund um 2–4 kHz und weiche Blenden verhindern ermüdende Spitzen. Nach einem Fehlversuch helfen <strong>A/B Vergleich</strong> sowie <strong>Flat → Ziel-EQ</strong>, und alle 3 Stufen lassen sich auch in der <strong>Kategorie-Prüfung</strong> absolvieren.</p>
      </div>
    `
  },
  modes: {
    tagClass: "tag-peach",
    tag: "Anleitung • Tonleitern & Modi",
    title: "So funktioniert das Training für Tonleitern & Modi",
    lead: "Statt trockener Intervall-Tabellen hörst du jede Kirchentonart in ihrer echten Klangfarbe – über denselben Grundton oder transponiert, auf Wunsch mit zuschaltbarer Grundton-Streicherfläche.",
    sections: `
      <h3>Die 3 Modi-Module im Überblick</h3>
      <ul class="article-steps-list">
        <li><strong>1. Modus / Tonleiter erkennen (3 Stufen):</strong> Nach der neutralen <strong>Anker-Quinte</strong> (Grundton + Quinte ohne Terz) erklingt die 8-tönige Tonleiter aufwärts: Stufe 1 prüft die 4 Grund-Modi (<code>Ionisch, Äolisch, Dorisch, Mixolydisch</code>), Stufe 2 alle 7 Kirchentonarten in <code>C</code> und Stufe 3 alle 7 mit wechselndem Grundton.</li>
        <li><strong>2. Charakterton &amp; Klangfarbe (3 Stufen):</strong> Nach der Anker-Quinte fokussiert eine kurze Wendung den charakteristischen Leitton (<code>#4</code> Lydisch, <code>b7</code> Mixolydisch, <code>♮6</code> Dorisch, <code>b2</code> Phrygisch oder <code>#7</code> in <strong>Harmonisch Moll</strong>) – getrennt in Stufe 1 (Dur-Modi), Stufe 2 (Moll-Modi) und Stufe 3 (Alle 7 + Harmonisch Moll auf freien Grundtönen).</li>
        <li><strong>3. Modale Kadenzen &amp; Akkordpendel (2 Stufen):</strong> Zweitaktige Pendel-Akkorde (z. B. <code>i – IV</code> Dorisch, <code>I – bVII</code> Mixolydisch, <code>I – II</code> Lydisch, <code>i – bII</code> Phrygisch) erst über 4 Standard-Akkordpendel in <code>C</code> (Stufe 1) und dann als alle 6 modalen Akkordpendel transponiert (Stufe 2). Ein Akkordpendel sind zwei Akkorde, die sich immer wieder abwechseln, so wird die Farbe des Modus hörbar.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Grundton-Fläche, Anker-Quinte &amp; A/B Vergleich</h4>
        <p>Vergleiche Modi anfangs parallel vom <strong>selben Grundton</strong> (z. B. <strong>C-Ionisch</strong> vs. <strong>C-Mixolydisch</strong>). Über den Button <strong>„Grundton-Fläche: An/Aus“</strong> unterlegst du jede Aufgabe mit einer durchgehenden Streicher-Fläche; ein Tipp auf <strong>„Anker-Quinte“</strong> (oder die linke Karte) ruft den neutralen Quintrahmen auf, und nach einem Irrtum vergleicht <strong>A/B Vergleich</strong> beide Modi direkt über demselben Grundton. Auch <strong>Loop</strong>, <strong>Nur Hören</strong> und eine 3-stufige <strong>Kategorie-Prüfung</strong> stehen bereit.</p>
      </div>
    `
  },
  warmup: {
    tagClass: "tag-sage",
    tag: "Anleitung • Einsing-Helfer",
    title: "So funktioniert das geführte Einsingen",
    lead: "Ideal für Chorprobe, Einzelunterricht oder vor dem Üben: Wähle zunächst einen von 5 Stimmumfängen (SATB) und starte eines von 4 strukturierten Programmen – komplett mit Atem-Kugel, Live-Klaviatur und Halbton-Steuerung.",
    sections: `
      <h3>Die 4 Warmup-Programme &amp; 4 Phasen</h3>
      <ul class="article-steps-list">
        <li><strong>4 Programme zur Wahl:</strong> Starte je nach Zeit und Ziel das <strong>5-Minuten Komplett-Einsingen</strong> (alle 4 Phasen, 9 Übungen), das <strong>Kompakt-Warmup (ca. 3 Min.)</strong> für den schnellen Unterrichtsstart, das <strong>Arpeggio &amp; Register-Training</strong> oder <strong>Chor-Atem &amp; Intonation</strong>.</li>
        <li><strong>Phase 1 – Atem &amp; Körper:</strong> Die animierte Atemkugel auf <code>ffff / ssss</code> und leichte Zwerchfell-Impulse (<code>P – T – K</code>) wecken die Stütze ohne Druck auf den Stimmlippen.</li>
        <li><strong>Phase 2 – Stimmsitz &amp; Resonanz:</strong> Sanftes Summen / Lippenflattern (<code>Mmm / Brrr</code>) und Seufzer-Abgänge über die Quinte öffnen weich den Resonanzraum.</li>
        <li><strong>Phase 3 &amp; 4 – Arpeggios, Vokale &amp; Chorklang:</strong> Dreiklangs- und Oktav-Arpeggios modulieren in Halbtonschritten passend für <strong>Chor-Mitte, Sopran, Alt, Tenor oder Bass</strong>, gefolgt von Vokal-Wandern (<code>U → O → A → E → I</code>) und einem schichtweisen SATB-Schlussakkord.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Live-Steuerung &amp; Klaviatur</h4>
        <p>Über die Chips oben wechselst du jederzeit zwischen <strong>Tonumfang (SATB)</strong>, <strong>Klang</strong> (Klavier, Klavier + Stimme oder Stimme) und <strong>Tempo</strong>; über die <strong>Phasen-Pills</strong> springst du gezielt zu einzelnen Abschnitten. Unten lässt sich jede Übung per <strong>„−1 / +1 Halbton“</strong> und <strong>„Nochmal“</strong> direkt anpassen – oder du greifst auf der <strong>Live-Klaviatur</strong> einzelne Referenztöne direkt mit an.</p>
      </div>
    `
  },
  notation: {
    tagClass: "tag-sage",
    tag: "Anleitung • Notation & Notenlesen",
    title: "So funktioniert das Notenlesen-Training",
    lead: "Trainiere flüssiges Vom-Blatt-Lesen über 6 Modi: im Violin-, Bass- und Altschlüssel, im Schlüssel-Mix, im zweizeiligen Klavier-Doppelsystem sowie beim Erkennen ganzer Akkorde (inkl. Umkehrungen &amp; Septakkorde).",
    sections: `
      <h3>Alle 6 Übungsmodi &amp; Eingabe</h3>
      <ul class="article-steps-list">
        <li><strong>1. Einzelnoten-Schlüssel (6 Noten im Fluss):</strong> Im <strong>Violin-</strong>, <strong>Bass-</strong>, <strong>Altschlüssel</strong> und im <strong>Schlüssel-Mix</strong> (wechselt alle 3 Noten mit kleinem Schlüsselsignal) sowie im zweizeiligen <strong>Doppelsystem</strong> (Violin- &amp; Bassschlüssel gemeinsam) leuchtet links die aktuelle Zielnote. Du tippst sie unten auf der Klaviatur an – bei Treffer rückt die Reihe flüssig weiter.</li>
        <li><strong>2. Akkorde lesen (5 Akkorde, Multiple Choice):</strong> Gestapelte Dreiklänge &amp; Septakkorde erscheinen direkt im Notensystem. Statt Einzeltasten wählst du unten aus <strong>Akkordsymbol-Kacheln</strong> (z. B. <code>E, Em, E7, Esus4</code>): Stufe 1 im Violinschlüssel, Stufe 2 im Bassschlüssel, Stufe 3 mit Umkehrungen in beiden Schlüsseln und Stufe 4 mit allen Typen &amp; Septakkorden.</li>
        <li><strong>3. Irrtümer &amp; Überspringen:</strong> Falsche Tasten oder Kacheln färben sich rot und stoppen die Reihe, damit du Position, Schlüssel oder Umkehrung ruhig prüfen kannst. Mit <strong>Überspringen</strong> siehst du die Lösung auf der Bühne und rückst sofort weiter.</li>
      </ul>

      <h3>Schwierigkeitsstufen &amp; Generalvorzeichen</h3>
      <ul class="article-steps-list">
        <li><strong>Einzelnoten Stufen 1–4:</strong> Stufe 1 (5 Linien &amp; 4 Zwischenräume), Stufe 2 (<code>±2 Hilfslinien</code>), Stufe 3 (<code>±3 Hilfslinien</code>) und Stufe 4 mit Versetzungszeichen (<code>♯</code>/<code>♭</code> bzw. Auflösungszeichen <code>♮</code> bei aktiver Tonart) – in deutscher (<code>H / B / Fis</code>) oder internationaler Schreibweise (<code>B / B♭ / F♯</code>).</li>
        <li><strong>Tonarten-Blattspiel (Generalvorzeichen 1–6 ♯/♭):</strong> Wähle oben auf der Auswahlseite oder live über den Button <strong>Tonart</strong> im Aufgabenkopf einzelne Tonarten oder rotierende Pools (Leicht, Mittel, Alle 12). Die Vorzeichen stehen wie im echten Notenheft am Systemanfang.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Audio-Steuerung, Nur Hören &amp; Prüfung</h4>
        <p>Über der Eingabe schaltet <strong>Notenton: An/Aus</strong> die Klangwiedergabe stumm, wenn du ganz lautlos vom Blatt lesen willst. Unten spielt <strong>▶ Ton anhören</strong> bzw. <strong>▶ Akkord anhören</strong> die linke Zielvorgabe als optionale Hörhilfe vor – in der 6-stufigen <strong>Kategorie-Prüfung</strong> verwandelt sich der Button in <strong>▶ Ankerton</strong> (<code>g'</code> / <code>f</code> / <code>c'</code>), um die Lösung nicht zu verraten. Rechts startet <strong>Nur Hören</strong> mit dem wählbaren <strong>Tempo</strong> (<em>Sehr langsam</em> bis <em>Sehr schnell</em>) den automatischen Lesedurchlauf.</p>
      </div>
    `
  }
};

/**
 * Hörbeispiele (Sequenzen aus [delayMs, perkussionsTyp]) für die Rhythmus-Wissensmodule
 */
const RHYTHM_KNOWLEDGE_PATTERNS = {
  "meter-4-4": [
    [0, "accent"], [540, "tick"], [1080, "tick"], [1620, "tick"],
    [2160, "accent"], [2700, "tick"], [3240, "tick"], [3780, "tick"]
  ],
  "meter-3-4": [
    [0, "accent"], [540, "tick"], [1080, "tick"],
    [1620, "accent"], [2160, "tick"], [2700, "tick"],
    [3240, "accent"], [3780, "tick"], [4320, "tick"]
  ],
  "meter-6-8": [
    [0, "accent"], [260, "hat"], [520, "hat"], [780, "tick"], [1040, "hat"], [1300, "hat"],
    [1560, "accent"], [1820, "hat"], [2080, "hat"], [2340, "tick"], [2600, "hat"], [2860, "hat"]
  ],
  "meter-5-4": [
    [0, "accent"], [500, "tick"], [1000, "tick"], [1500, "snare"], [2000, "tick"],
    [2500, "accent"], [3000, "tick"], [3500, "tick"], [4000, "snare"], [4500, "tick"]
  ],

  "sub-quarter": [
    [0, "kick"], [0, "clave"], [600, "kick"], [600, "clave"], [1200, "kick"], [1200, "clave"], [1800, "kick"], [1800, "clave"]
  ],
  "sub-eighth": [
    [0, "kick"], [0, "clave"], [300, "clave"],
    [600, "kick"], [600, "clave"], [900, "clave"],
    [1200, "kick"], [1200, "clave"], [1500, "clave"],
    [1800, "kick"], [1800, "clave"], [2100, "clave"]
  ],
  "sub-triplet": [
    [0, "kick"], [0, "clave"], [200, "clave"], [400, "clave"],
    [600, "kick"], [600, "clave"], [800, "clave"], [1000, "clave"],
    [1200, "kick"], [1200, "clave"], [1400, "clave"], [1600, "clave"],
    [1800, "kick"], [1800, "clave"], [2000, "clave"], [2200, "clave"]
  ],
  "sub-sixteenth": [
    [0, "kick"], [0, "clave"], [150, "clave"], [300, "clave"], [450, "clave"],
    [600, "kick"], [600, "clave"], [750, "clave"], [900, "clave"], [1050, "clave"],
    [1200, "kick"], [1200, "clave"], [1350, "clave"], [1500, "clave"], [1650, "clave"],
    [1800, "kick"], [1800, "clave"], [1950, "clave"], [2100, "clave"], [2250, "clave"]
  ],

  "beat-march": [
    [0, "kick"], [0, "snare"], [0, "hat"], [550, "hat"],
    [1100, "kick"], [1100, "snare"], [1100, "hat"], [1650, "hat"],
    [2200, "kick"], [2200, "snare"], [2200, "hat"], [2750, "hat"],
    [3300, "kick"], [3300, "snare"], [3300, "hat"], [3850, "hat"]
  ],
  "beat-backbeat": [
    [0, "kick"], [0, "hat"], [275, "hat"],
    [550, "snare"], [550, "hat"], [825, "hat"],
    [1100, "kick"], [1100, "hat"], [1375, "hat"],
    [1650, "snare"], [1650, "hat"], [1925, "hat"],
    [2200, "kick"], [2200, "hat"], [2475, "hat"],
    [2750, "snare"], [2750, "hat"], [3025, "hat"],
    [3300, "kick"], [3300, "hat"], [3575, "hat"],
    [3850, "snare"], [3850, "hat"], [4125, "hat"]
  ],
  "beat-syncopation": [
    [0, "kick"], [0, "hat"], [275, "hat"], [550, "snare"], [825, "clave"], [825, "hat"],
    [1100, "hat"], [1375, "kick"], [1650, "snare"], [1925, "hat"],
    [2200, "kick"], [2200, "hat"], [2475, "hat"], [2750, "snare"], [3025, "clave"], [3025, "hat"],
    [3300, "hat"], [3575, "kick"], [3850, "snare"], [4125, "hat"]
  ],
  "beat-swing": [
    [0, "kick"], [0, "hat"], [560, "snare"], [560, "hat"], [930, "hat"],
    [1120, "kick"], [1120, "hat"], [1680, "snare"], [1680, "hat"], [2050, "hat"],
    [2240, "kick"], [2240, "hat"], [2800, "snare"], [2800, "hat"], [3170, "hat"],
    [3360, "kick"], [3360, "hat"], [3920, "snare"], [3920, "hat"], [4290, "hat"]
  ],
  "poly-3-2": [
    [0, "kick"], [0, "clave"], [600, "clave"], [900, "kick"], [1200, "clave"],
    [1800, "kick"], [1800, "clave"], [2400, "clave"], [2700, "kick"], [3000, "clave"]
  ],

  "inst-kick": [[0, "kick"], [500, "kick"], [1000, "kick"], [1250, "kick"], [1500, "kick"]],
  "inst-snare": [[0, "snare"], [520, "snare"], [1040, "snare"], [1300, "snare"], [1430, "snare"], [1560, "snare"]],
  "inst-hat": [
    [0, "hat"], [150, "hat"], [300, "hat"], [450, "hat"],
    [600, "hat"], [750, "hat"], [900, "hat"], [1050, "hat"],
    [1200, "hat"], [1350, "hat"], [1500, "hat"], [1650, "hat"]
  ],
  "inst-toms": [[0, "tom_high"], [260, "tom_high"], [520, "tom_mid"], [780, "tom_mid"], [1040, "tom_low"], [1380, "kick"]],
  "inst-conga": [
    [0, "conga_low"], [270, "conga_high"], [540, "conga_high"], [810, "conga_low"], [1080, "conga_high"],
    [1350, "conga_low"], [1620, "conga_high"], [1890, "conga_high"], [2160, "conga_low"], [2430, "conga_high"]
  ],
  "inst-clave": [
    [0, "clave"], [480, "clave"], [960, "clave"], [1600, "clave"], [1920, "clave"],
    [2560, "clave"], [3040, "clave"], [3520, "clave"], [4160, "clave"], [4480, "clave"]
  ],
  "inst-shaker": [
    [0, "shaker"], [160, "shaker"], [320, "shaker"], [480, "shaker"],
    [640, "shaker"], [800, "shaker"], [960, "shaker"], [1120, "shaker"],
    [1280, "shaker"], [1440, "shaker"], [1600, "shaker"], [1760, "shaker"]
  ],
  "inst-cowbell": [
    [0, "kick"], [0, "cowbell"], [520, "cowbell"], [780, "cowbell"], [1040, "kick"], [1040, "cowbell"], [1560, "cowbell"]
  ],
  "band-groove": [
    [0, "kick"], [0, "hat"], [0, "shaker"], [260, "hat"], [260, "shaker"],
    [520, "snare"], [520, "hat"], [520, "shaker"], [780, "hat"], [780, "shaker"],
    [1040, "kick"], [1040, "hat"], [1040, "shaker"], [1300, "kick"], [1300, "hat"], [1300, "shaker"],
    [1560, "snare"], [1560, "hat"], [1560, "shaker"], [1820, "hat"], [1820, "shaker"],
    [2080, "kick"], [2080, "hat"], [2080, "shaker"], [2340, "hat"], [2340, "shaker"],
    [2600, "snare"], [2600, "hat"], [2600, "shaker"], [2860, "hat"], [2860, "shaker"]
  ]
};

function renderRhythmReferenceHTML() {
  const localized = resolveRegisteredKnowledgeRender(
    "rhythm",
    typeof renderRhythmReferenceHTML_EN === "function" ? renderRhythmReferenceHTML_EN : null,
    typeof renderRhythmReferenceHTML_FR === "function" ? renderRhythmReferenceHTML_FR : null
  );
  if (localized !== null) return localized;
  return `
    <!-- 1. Puls & Taktarten -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Puls &amp; Taktarten</span>
        <span class="k-ratio-chip">Metrum</span>
      </div>
      <h4>Was ein Musikstück innerlich zusammenhält</h4>
      <p>
        Fast jede Musik besitzt einen gleichmäßigen Herzschlag, den <strong>Puls (Beat)</strong>. Wie schnell dieser Puls schlägt, gibt das <strong>Tempo in BPM</strong> (<em>Beats per Minute</em>, Schläge pro Minute) an. Eine <strong>Taktart</strong> fasst diese Schläge in wiederkehrende Gruppen zusammen – meistens hörbar an der betonten <strong>Eins</strong>.
      </p>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>4/4-Takt (Der Standard)</strong>
          <span>Vier Viertel pro Takt (<strong>1</strong>–2–3–4). Das Zuhause fast aller Pop-, Rock-, Hip-Hop- und Funk-Songs.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>3/4-Takt (Walzertakt)</strong>
          <span>Drei Viertel pro Takt (<strong>1</strong>–2–3). Schwungvoll-kreisend (<em>An der schönen blauen Donau</em>, <em>Piano Man</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>6/8-Takt (Wiegetakt)</strong>
          <span>Sechs Achtel in zwei schnellen Dreiergruppen (<strong>1</strong>-2-3-<strong>4</strong>-5-6): Ideal für epische Balladen (<em>Nothing Else Matters</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>5/4-Takt (Ungerades Metrum)</strong>
          <span>Kombination aus 3 + 2 (oder 2 + 3), berühmt aus dem Jazzklassiker <em>Take Five</em> oder dem <em>Mission-Impossible</em>-Thema.</span>
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="meter-4-4">▶ 4/4-Takt</button>
        <button class="btn-tool" data-play-rhythm="meter-3-4">▶ 3/4-Walzer</button>
        <button class="btn-tool" data-play-rhythm="meter-6-8">▶ 6/8-Wiegetakt</button>
        <button class="btn-tool" data-play-rhythm="meter-5-4">▶ 5/4-Takt (3+2)</button>
      </div>
    </article>

    <!-- 2. Notenwerte & Unterteilungen -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Notenwerte &amp; Subdivisions</span>
        <span class="k-ratio-chip">1 · 2 · 3 · 4</span>
      </div>
      <h4>Wie ein einzelner Herzschlag unterteilt wird</h4>
      <p>
        Während die tiefe Basstrommel exakt denselben Grundpuls hält, lassen sich Schläge dazwischen immer feiner aufteilen (<strong>Subdivision</strong>). Eine <strong>Punktierung</strong> (Punkt hinter der Note) verlängert außerdem ihren Wert um exakt die Hälfte – so entstehen typische „Lang-kurz“-Motive.
      </p>
      <ul class="k-physics-list">
        <li><strong>Ganze &amp; Halbe Noten:</strong> Klingende Flächen, die 4 bzw. 2 Schläge lang aushalten.</li>
        <li><strong>Viertelnoten:</strong> Genau 1 Ton pro Grundschlag (<em>1 – 2 – 3 – 4</em>).</li>
        <li><strong>Achtelnoten:</strong> 2 gleichmäßige Schläge pro Puls (<em>1-und – 2-und</em>).</li>
        <li><strong>Triolen:</strong> 3 gleichmäßige Schläge in derselben Zeit (<em>1-er-lei – 2-er-lei</em>).</li>
        <li><strong>Sechzehntelnoten:</strong> 4 schnelle Schläge pro Puls (<em>1-e-und-e</em>) – der Motor für Funk und Rap-Hi-Hats.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="sub-quarter">▶ Viertel (1x)</button>
        <button class="btn-tool" data-play-rhythm="sub-eighth">▶ Achtel (2x)</button>
        <button class="btn-tool" data-play-rhythm="sub-triplet">▶ Triolen (3x)</button>
        <button class="btn-tool" data-play-rhythm="sub-sixteenth">▶ Sechzehntel (4x)</button>
      </div>
    </article>

    <!-- 3. Backbeat, Synkope & Swing -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Groove &amp; Timing</span>
        <span class="k-ratio-chip">Onbeat vs. Offbeat</span>
      </div>
      <h4>Warum derselbe 4/4-Takt völlig anders grooven kann</h4>
      <p>
        Ob ein Stück steif marschiert oder sofort zum Kopfnicken einlädt, hängt davon ab, wo die Akzente sitzen:
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Marsch vs. Backbeat (2 &amp; 4)</h5>
          <p>Betont die Snare <strong>1 &amp; 3</strong>, entsteht ein schwerer Marsch. Sobald die Snare auf <strong>2 &amp; 4</strong> wandert (<em>Backbeat</em>), entsteht moderner Pop, Rock &amp; Soul!</p>
          <button class="btn-tool" data-play-rhythm="beat-march">▶ Marsch (1 &amp; 3)</button>
          <button class="btn-tool" data-play-rhythm="beat-backbeat">▶ Backbeat (2 &amp; 4)</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Synkope &amp; Swing / Shuffle</h5>
          <p>Eine <strong>Synkope</strong> verlagert Akzente auf das unbetonte „und“ (Offbeat). Beim <strong>Swing</strong> werden Achtel ungleichmäßig federnd gespielt (ca. 2:1 statt 1:1).</p>
          <button class="btn-tool" data-play-rhythm="beat-syncopation">▶ Synkopen-Groove</button>
          <button class="btn-tool" data-play-rhythm="beat-swing">▶ Swing-Feeling</button>
        </div>
      </div>
    </article>

    <!-- 4. Polyrhythmik & Song-Anker -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Polyrhythmik &amp; Song-Anker</span>
        <span class="k-ratio-chip">3 gegen 2</span>
      </div>
      <h4>Zwei Zeitebenen gleichzeitig + bekannte Song-Beispiele</h4>
      <p>
        Bei der <strong>Polyrhythmik</strong> überlagern sich zwei gegensätzliche Puls-Raster gleichzeitig – am häufigsten <strong>3 gegen 2</strong> (der Holzblock zählt bis 3, während die Bassdrum im selben Taktraum 2 gleichmäßige Schläge setzt). Erinnerst du dich an Klang-Physik? Exakt dasselbe Verhältnis <code>3:2</code> klingt als Tonabstand wie eine reine Quinte!
      </p>
      <div class="k-meta-box">
        <strong>Taktarten mit bekannten Songs im Kopf behalten:</strong>
        <ul class="k-physics-list" style="margin-top:0.25rem;">
          <li><strong>4/4-Takt:</strong> „We Will Rock You“ (Queen) • „Billie Jean“ (Michael Jackson)</li>
          <li><strong>3/4-Takt:</strong> „Piano Man“ (Billy Joel) • klassischer Wiener Walzer</li>
          <li><strong>6/8-Takt:</strong> „Nothing Else Matters“ (Metallica) • „We Are the Champions“ (Queen)</li>
          <li><strong>5/4-Takt:</strong> „Take Five“ (Dave Brubeck) • „Mission Impossible“</li>
        </ul>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="poly-3-2">▶ Polyrhythmus „3 gegen 2“ anhören</button>
      </div>
    </article>
  `;
}

const RHYTHM_INSTRUMENTS_DATA = [
  {
    category: "drumset",
    tag: "Schlagzeug • Tiefenfundament",
    tagClass: "tag-peach",
    name: "Bassdrum / Kick",
    role: "Schwerpunkt & Druck (Tieffrequenz ~50–120 Hz)",
    desc: "Die größte Trommel des Schlagzeugs wird mit dem Fußpedal gespielt. Sie verankert schwere Zählzeiten (oft 1 & 3 oder als durchgehender 4-on-the-Floor-Puls in Dance/House) und bildet gemeinsam mit dem Bass das Fundament.",
    rhythmKey: "inst-kick",
    btnLabel: "Kick-Fundament hören"
  },
  {
    category: "drumset",
    tag: "Schlagzeug • Backbeat",
    tagClass: "tag-peach",
    name: "Snare Drum",
    role: "Klarer Akzent auf Zählzeit 2 & 4",
    desc: "Unter dem Resonanzfell liegt ein gespannter Metall-Snareteppich. Er erzeugt beim Anschlag das scharfe, knackige Rauschen – ideal für den Pop/Rock-Backbeat, leise Ghost Notes und schnelle Wirbel.",
    rhythmKey: "inst-snare",
    btnLabel: "Snare-Schlag & Wirbel hören"
  },
  {
    category: "drumset",
    tag: "Schlagzeug • Zeitlupe",
    tagClass: "tag-peach",
    name: "Hi-Hat & Becken (Ride / Crash)",
    role: "Feinste Unterteilung & Formteile",
    desc: "Zwei mit dem Pedal aufeinanderliegende Becken (Hi-Hat) zählen durchlaufende Achtel oder Sechzehntel. Ein großes Ride-Becken trägt oft den federnden Jazz-Puls, während das Crash-Becken dramatisch den neuen Refrain einläutet.",
    rhythmKey: "inst-hat",
    btnLabel: "Hi-Hat-Puls hören"
  },
  {
    category: "drumset",
    tag: "Schlagzeug • Melodische Fills",
    tagClass: "tag-peach",
    name: "Toms (Hänge- & Standtom)",
    role: "Übergänge, Fills & Rollen",
    desc: "Mehrere unterschiedlich groß gestimmte Trommeln ohne Snareteppich. Sie erzeugen einen warmen, tonhaften Fall von hoch nach tief für Übergänge vor dem Refrain.",
    rhythmKey: "inst-toms",
    btnLabel: "Tom-Fill anhören"
  },
  {
    category: "world",
    tag: "Handpercussion • Allrounder",
    tagClass: "tag-lilac",
    name: "Cajón (Kistentrommel)",
    role: "Mobiles Mini-Schlagzeug für Akustik-Sets",
    desc: "Eine aus Peru stammende Holzkiste, auf der man sitzt: Schlägt man in die Mitte, entsteht ein tiefer Bassdruck wie bei der Kick; am oberen Rand rascheln eingebaute Saiten oder Teppiche wie eine Snare."
  },
  {
    category: "world",
    tag: "Handpercussion • Latin & Pop",
    tagClass: "tag-lilac",
    name: "Congas & Bongos",
    role: "Rollende Grooves & Verzierungen",
    desc: "Hohe, paarweise gespielte Handtrommeln aus der afro-kubanischen Musik. Congas liefern warme, singende Tumbao-Patterns; die kleineren Bongos setzen scharfe, hohe Akzente darüber.",
    rhythmKey: "inst-conga",
    btnLabel: "Conga-Tumbao hören"
  },
  {
    category: "world",
    tag: "Handpercussion & Orchester",
    tagClass: "tag-lilac",
    name: "Djembe, Darbuka & Pauken (Timpani)",
    role: "Dynamik von flüsterleise bis Orchesterdonner",
    desc: "Kelchtrommeln wie die westafrikanische Djembe verbinden extrem tiefe Bassschläge mit peitschenden Slaps. Im Sinfonieorchester geben stimmbare Kesselpauken rhythmischen Schlägen zusätzlich einen klaren musikalischen Ton."
  },
  {
    category: "small",
    tag: "Taktgeber • Holz",
    tagClass: "tag-sage",
    name: "Claves & Woodblock",
    role: "Durchdringender Kompass-Klick",
    desc: "Zwei trockene Hartholz-Stäbe, die aufeinandergeschlagen werden. Trotz winziger Größe schneidet ihr heller Klick durch jede volle Bigband – in Salsa und Latin bildet die berühmte 3–2 Son-Clave das Rückgrat des ganzen Songs.",
    rhythmKey: "inst-clave",
    btnLabel: "3–2 Son-Clave hören"
  },
  {
    category: "small",
    tag: "Kleinpercussion • Fluss",
    tagClass: "tag-sage",
    name: "Shaker, Maracas & Tamburin",
    role: "Bewegung, Tempo & Teppich-Gefühl",
    desc: "Mit Sand, Körnern oder Metallschellen gefüllte Shaker erzeugen fortlaufende Sechzehntel-Wellen. Sie füllen Lücken zwischen Bassdrum und Snare und verleihen selbst langsamen Stücken sofort Zug nach vorn.",
    rhythmKey: "inst-shaker",
    btnLabel: "Shaker-Teppich hören"
  },
  {
    category: "small",
    tag: "Kleinpercussion • Metall",
    tagClass: "tag-sage",
    name: "Cowbell, Agogô & Triangel",
    role: "Prägnante Offbeats & Glanzpunkte",
    desc: "Helle Metallinstrumente mit starker Durchsetzungskraft – berühmt für Funk-, Disco- und Latin-Riffs oder als zweitöniges Frage-Antwort-Spiel der Agogô-Glocken.",
    rhythmKey: "inst-cowbell",
    btnLabel: "Cowbell-Riff hören"
  },
  {
    category: "small",
    tag: "Achtung Verwechslungsgefahr!",
    tagClass: "tag-sage",
    name: "E-Bass, Kontrabass & Rhythmusgitarre",
    role: "Die Brücke zwischen Rhythmus & Harmonie",
    desc: "Rhythmus entsteht nicht nur auf Trommeln! Bass und Kickdrum bilden in fast jeder Band eine verschweißte Einheit (die ‚Rhythm Section‘), und knackig abgedämpfte Akkorde auf Gitarre oder Clavinet wirken oft wie ein tonales Schlaginstrument."
  }
];

function renderRhythmInstrumentsHTML(filterCat = "all") {
  const localized = resolveRegisteredKnowledgeRender(
    "rhythmInstruments",
    typeof renderRhythmInstrumentsHTML_EN === "function" ? renderRhythmInstrumentsHTML_EN : null,
    typeof renderRhythmInstrumentsHTML_FR === "function" ? renderRhythmInstrumentsHTML_FR : null,
    filterCat
  );
  if (localized !== null) return localized;
  const list = filterCat === "all"
    ? RHYTHM_INSTRUMENTS_DATA
    : RHYTHM_INSTRUMENTS_DATA.filter(i => i.category === filterCat);

  const ensembleCard = filterCat === "all" ? `
    <div class="article-highlight-box" style="margin-bottom:0.2rem;">
      <h4>So teilen sich Instrumente einen Groove (Frequenz-Arbeitsteilung):</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-dark); line-height:1.4;">
        Jedes Rhythmus-Instrument belegt seinen eigenen Klangraum, damit kein Matsch entsteht: <strong>Kick</strong> ganz unten, <strong>Snare</strong> in der knackigen Mitte, <strong>Hi-Hat &amp; Shaker</strong> ganz oben in den Höhen.
      </p>
      <div class="k-btn-row" style="margin-top:0.35rem;">
        <button class="btn-tool" data-play-rhythm="band-groove">▶ Band-Groove (Kick + Snare + Hi-Hat + Shaker)</button>
      </div>
    </div>
  ` : "";

  return ensembleCard + list.map(item => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${item.tagClass}">${item.tag}</span>
        <span class="k-ratio-chip">${item.role.split(" (")[0]}</span>
      </div>
      <h4>${item.name}</h4>
      <p><strong>Rolle:</strong> ${item.role}</p>
      <p>${item.desc}</p>
      ${item.rhythmKey ? `
        <div class="k-btn-row">
          <button class="btn-tool" data-play-rhythm="${item.rhythmKey}">▶ ${item.btnLabel}</button>
        </div>
      ` : ""}
    </article>
  `).join("");
}

/**
 * Ausführliches Wissensmodul: Gesang & menschliche Stimme
 */
function renderVocalsReferenceHTML() {
  const localized = resolveRegisteredKnowledgeRender(
    "vocals",
    typeof renderVocalsReferenceHTML_EN === "function" ? renderVocalsReferenceHTML_EN : null,
    typeof renderVocalsReferenceHTML_FR === "function" ? renderVocalsReferenceHTML_FR : null
  );
  if (localized !== null) return localized;
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Menschliche Stimme</span>
        <span class="k-ratio-chip">Das erste Instrument</span>
      </div>
      <h4>Wie funktioniert die menschliche Stimme?</h4>
      <p>Die Stimme vereint drei mechanisch-akustische Systeme in einem einzigen Körper. Anders als bei einer Gitarre oder Flöte ist das „Gehäuse“ flexibel: Wir können innerhalb von Millisekunden Tonhöhe, Lautstärke, Obertongehalt und Sprachlaute (Vokale und Konsonanten) gleichzeitig verändern.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>1. Der Motor (Atmung &amp; Stütze)</strong>
          Beim Einatmen senkt sich das <em>Zwerchfell</em> kuppelabwärts und schafft Raum in der Lunge. Beim Singen steuern Bauch- und Zwischenrippenmuskulatur dosiert den <em>subglottalen Luftdruck</em> („Atemstütze“), statt den Hals zuzuschnüren.
        </div>
        <div class="physics-fact-item">
          <strong>2. Der Tonerzeuger (Kehlkopf &amp; Glottis)</strong>
          Im Kehlkopf spannen sich die zwei <em>Stimmlippen</em>. Strömende Luft saugt sie durch den <em>Bernoulli-Effekt</em> rhythmisch zusammen und stößt sie wieder auf (100–1000× pro Sekunde). Dabei entsteht ein obertonreiches Rohsignal.
        </div>
        <div class="physics-fact-item">
          <strong>3. Der Resonator (Vokaltrakt &amp; Formanten)</strong>
          Rachen, Mund- und Nasenraum filtern dieses Rohsignal. Durch Zunge, Kiefer, Lippen und Gaumensegel verschieben wir <em>Formanten</em> (Resonanzgipfel): So unterscheiden wir ein dunkles „U“ von einem hellen „I“.
        </div>
        <div class="physics-fact-item">
          <strong>4. Der Sängerformant (~3.000 Hz)</strong>
          Durch Weitung des tiefen Rachens bündeln geschulte klassische Stimmen Energie um 2,8–3,2 kHz. Da ein Orchester in diesem Frequenzband leiser wird, durchdringt eine Solo-Opernstimme 80 Instrumente völlig unverstärkt!
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C4,E4,G4,C5" data-dur="1.9" data-step="0">▶ Vokalklang als Akkord hören</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Register &amp; Techniken</span>
        <span class="k-ratio-chip">Klangfarben</span>
      </div>
      <h4>Stimmregister &amp; Gesangstechniken</h4>
      <p>Je nachdem, welche Muskeln die Stimmlippen wie stark spannen und ob ihre ganze Muskelmasse oder nur die feinen Schleimhautränder schwingen, verändert sich der Stimmcharakter grundlegend:</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Bruststimme (Modalregister, M1)</strong>
          Die gesamte Stimmlippenmasse schwingt voll mit. Resultat: warmer, geerdeter, obertonreicher Klang – unsere normale Sprechstimme und die Kraftbasis in tiefen und mittleren Lagen.
        </div>
        <div class="physics-fact-item">
          <strong>Kopfstimme &amp; Falsett (M2)</strong>
          Die Stimmlippen werden langgezogen und dünner; vor allem die feinen Randkanten schwingen. Klingt leichter, schwebender und flötenähnlicher (bei Männern abgesetzt als <em>Falsett</em>, bei Frauen nahtlos als lyrische Kopfstimme).
        </div>
        <div class="physics-fact-item">
          <strong>Mischstimme (Mix / Voix mixte)</strong>
          Überbrückt das <em>Passaggio</em> (Bruchstelle zwischen Brust- und Kopfregister). Durch balancierte Muskelspannung klingt der Übergang durchgängig stabil ohne plötzliches Kippen.
        </div>
        <div class="physics-fact-item">
          <strong>Belting (Pop, Musical, Gospel)</strong>
          Verlängerte Bruststimm-Dominanz in die höhere Lage hinein mit starker Rumpfstütze und angepassten Vokalen – laut, direkt und voller Präsenz bis ins hohe g²/c³.
        </div>
        <div class="physics-fact-item">
          <strong>Vibrato</strong>
          Natürliche, periodische Frequenz- und Lautstärkeschwankung von etwa 5–7 Hz bei entspannter Kehle. Verleiht langen Tönen Wärme und lässt eine Stimme im Ensemble leichter heraushören.
        </div>
        <div class="physics-fact-item">
          <strong>Scat &amp; Obertongesang</strong>
          <em>Scat</em> (Jazz) imitiert Bläser-Soli über rhythmische Silben („Shoo-be-doo“). Beim <em>Obertongesang</em> formt der Mundraum so spitze Resonanzen über einem tiefen Grundton, dass Obertöne als zweite Pfeif-Melodie hörbar werden!
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">Chorsatz (SATB)</span>
        <span class="k-ratio-chip">Stimmfächer &amp; Aufbau</span>
      </div>
      <h4>Wie ein Chor aufgeteilt ist: SATB &amp; Stimmlagen</h4>
      <p>Der Standard für gemischte Chöre weltweit heißt <strong>SATB</strong> – benannt nach den vier Hauptstimmen von oben nach unten. In größeren Chören werden jede dieser vier Gruppen oft nochmals in I (höher/heller) und II (tiefer/dunkler) aufgeteilt (achtstimmig: <em>SSAATTBB</em>).</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Sopran (S) • Umfang ca. c¹–c³</strong>
          Die höchste Frauen- oder Knabenstimme. Trägt meist die Hauptmelodie, führt Oberstimmen und sorgt für Strahlkraft und Glanz im Akkord.
        </div>
        <div class="physics-fact-item">
          <strong>Alt (A) • Umfang ca. f–e²</strong>
          Die tiefe Frauenstimme (oder tiefe Knaben-/Countertenor-Lage). Liefert das harmonische Herz (Terzen, Septimen, reibungsvolle Vorhalte) und dichtet den Klang unter dem Sopran ab.
        </div>
        <div class="physics-fact-item">
          <strong>Tenor (T) • Umfang ca. c–a¹</strong>
          Die hohe Männerstimme (klingt eine Oktave tiefer als oft im Violinschlüssel notiert!). Verbindet Männer- und Frauenregister, singt lyrische Gegenmelodien oder strahlende Spitzentöne.
        </div>
        <div class="physics-fact-item">
          <strong>Bass (B) • Umfang ca. E–e¹</strong>
          Die tiefste Männerstimme und das akustische Fundament des Chores. Der Bass gibt den harmonischen Grundton vor – intoniert der Bass sauber, rasten alle anderen Stimmen darüber ein.
        </div>
        <div class="physics-fact-item">
          <strong>Mezzosopran, Bariton &amp; Countertenor</strong>
          Drei wichtige Zwischenfächer: <em>Mezzosopran</em> (a–a², warm zwischen Sopran und Alt), <em>Bariton</em> (G–g¹, häufigste Männerstimme zwischen Tenor und Bass) und <em>Countertenor</em> (männliche Alt-Lage per trainiertem Falsett).
        </div>
        <div class="physics-fact-item">
          <strong>Weitere Chorgattungen</strong>
          <em>Frauenchor (SSAA)</em> und <em>Männerchor (TTBB / Barbershop)</em> nutzen engere Lagen mit besonders dichten Oberton-Verschmelzungen. Im modernen <em>A-cappella-Pop</em> ersetzt eine Vocal-Percussion-Stimme (Beatbox) das Schlagzeug.
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G4,B4,D5,G5" data-dur="0.95" data-step="320">▶ Sopran-Lage</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G3,Bb3,D4,F4" data-dur="0.95" data-step="320">▶ Alt-Lage</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,E3,G3,B3" data-dur="0.95" data-step="320">▶ Tenor-Lage</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="E2,G2,B2,E3" data-dur="1.05" data-step="340">▶ Bass-Fundament</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Intonation &amp; Hören</span>
        <span class="k-ratio-chip">Reine Stimmung</span>
      </div>
      <h4>Warum ein A-cappella-Chor reiner klingt als ein Klavier</h4>
      <p>Ein Klavier ist <strong>gleichstufig temperiert</strong> gestimmt: Seine großen Terzen klingen etwa 14 Cent (fast ein Sechstel Halbton) zu hoch, damit man in allen zwölf Tonarten spielen kann. Sängerinnen und Sänger sind jedoch nicht an feste Tasten gebunden.</p>
      <p>Singt ein Chor ohne Instrumente, passen sich die Stimmen automatisch den physikalischen <strong>reinen Frequenzverhältnissen</strong> (Oktave 2:1, Quinte 3:2, große Terz 5:4) an. Sobald eine Terz wirklich schwebungsfrei rein gesungen wird, verstärken sich die gemeinsamen Obertöne – der Chor klingt plötzlich viel lauter, voller und strahlender.</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="1.4" data-step="460">▶ Stimmaufbau (Bass → Sopran)</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="2.4" data-step="0">▶ Voller SATB-Chorklang</button>
        <button class="btn-tool" data-open-warmup="true">▶ 5-Min.-Einsing-Helfer öffnen</button>
      </div>
    </article>
  `;
}

/**
 * Datenmodell für die 7 neuen Instrumentenkunde-Module
 * (Rhythmus-Instrumente nutzt weiterhin das spezialisierte RHYTHM_INSTRUMENTS_DATA Modul)
 */
const INSTRUMENT_MODULES_DATA = {
  strings: {
    title: "Streichinstrumente",
    subtitle: "Akustik des Bogens, Orchesterfamilie & Spieltechniken",
    intro: {
      tag: "Physik & Bauart",
      tagClass: "tag-peach",
      chip: "Helmholtz-Schwingung",
      heading: "Wie entsteht der Streicherklang?",
      body: "Ein Bogen aus Pferdehaaren wird mit <em>Kolophonium</em> (Baumharz) eingerieben. Dadurch entsteht beim Streichen ein winziger Haft-Gleit-Zyklus: Der Bogen zieht die Saite kurz mit, sie rutscht zurück, wird wieder gegriffen – Hunderte Male pro Sekunde. Der hölzerne <em>Steg</em> überträgt diese Schwingung auf die Fichtendecke des hohlen Resonanzkörpers, während im Inneren Stimmstock und Bassbalken für den charakteristischen Klang sorgen. Da Streichinstrumente keine Bünde haben, können sie absolut stufenlos und rein intonieren."
    },
    items: [
      {
        name: "Violine (Geige)",
        tag: "Sopran der Streicher",
        tagClass: "tag-peach",
        range: "g – a⁴",
        tuning: "Quinten: g – d¹ – a¹ – e²",
        role: "Hauptmelodie, Brillanz & Virtuosität",
        desc: "Das höchste und beweglichste Mitglied der Familie. Im Sinfonieorchester wird sie in Violine I (oft melodietragend in hoher Lage) und Violine II (zweite Stimme, harmonische Mitte) geteilt. Durch geringes Eigengewicht sprechen schnelle Läufe blitzschnell an.",
        demos: [
          { label: "Violine gestrichen (Arco)", style: "strings", notes: "G4,D5,A5,E6", dur: 1.0, step: 340 },
          { label: "Violine gezupft (Pizzicato)", style: "pizzicato", notes: "G4,B4,D5,G5", dur: 0.75, step: 220 }
        ]
      },
      {
        name: "Viola (Bratsche)",
        tag: "Alt der Streicher",
        tagClass: "tag-sage",
        range: "c – e³",
        tuning: "Quinten: c – g – d¹ – a¹",
        role: "Harmonisches Herz & dunkle Gegenmelodie",
        desc: "Eine Quinte tiefer gestimmt als die Violine und im traditionellen <em>Altschlüssel</em> notiert. Ihr Korpus ist eigentlich etwas kleiner als für ihre tiefen Töne akustisch ideal wäre – genau das erzeugt den leicht gedeckten, samtigen, melancholisch-warmen Bratschenklang.",
        demos: [
          { label: "Bratschen-Lage hören", style: "strings", notes: "C3,G3,D4,A4", dur: 1.05, step: 360 }
        ]
      },
      {
        name: "Violoncello (Cello)",
        tag: "Tenor & Bariton",
        tagClass: "tag-lilac",
        range: "C – a²",
        tuning: "Quinten: C – G – d – a",
        role: "Warmes Fundament & gesangliche Solokantilenen",
        desc: "Klingt exakt eine Oktave tiefer als die Bratsche und kommt dem menschlichen Stimmumfang enorm nahe. Im Bass liefert es sonore Fülle, auf der obersten A-Saite singt es leidenschaftliche, fast tenoral-baritonale Solomelodien.",
        demos: [
          { label: "Cello-Register (C–a)", style: "strings", notes: "C2,G2,D3,A3", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Kontrabass",
        tag: "Tiefen-Fundament",
        tagClass: "tag-peach",
        range: "E₁ (bzw. C₁) – g¹",
        tuning: "Quarten: E₁ – A₁ – D – G",
        role: "Orchester-Basis & Jazz Walking-Bass",
        desc: "Wird wegen der großen Abstände für die linke Hand meist <em>in Quarten</em> statt Quinten gestimmt und klingend <strong>eine Oktave tiefer</strong> notiert. Während er im Orchester meist mit dem Bogen tiefe Grundtöne trägt, dominiert im Jazz und Acoustic-Pop das gezupfte Pizzicato (Walking Bass).",
        demos: [
          { label: "Kontrabass Arco (Orchester)", style: "strings", notes: "E1,A1,D2,G2", dur: 1.25, step: 420 },
          { label: "Jazz Walking-Bass (Pizzicato)", style: "pizzicato", notes: "C2,E2,G2,A2,Bb2,A2,G2,E2", dur: 0.7, step: 280 }
        ]
      }
    ],
    extraBox: {
      heading: "Wichtige Spieltechniken der Streicher im Hörvergleich",
      facts: [
        { title: "Arco vs. Pizzicato", text: "<em>Arco</em> bedeutet normal mit dem Bogen gestrichen (langer, tragender Ton). <em>Pizzicato</em> heißt mit dem Finger gezupft (kurz, perkussiv, rund)." },
        { title: "Spiccato & Martelé", text: "Springender Bogen auf der Saite für leichte, perlend-schnelle Figuren vs. scharf akzentuierter Bogen-„Hammerschlag“." },
        { title: "Tremolo & Sul ponticello", text: "Rasendes Hin- und Herstreichen erzeugt flirrende Spannung (Filmmusik). Streichen direkt am Steg (<em>sul ponticello</em>) klingt glasig und gespenstisch obertonreich." },
        { title: "Flageolett & Con sordino", text: "Leichtes Aufsetzen des Fingers an Schwingungsknoten (Halbierung/Drittelung) isoliert reine, ätherische Obertöne. Ein Dämpfer (<em>Sordino</em>) auf dem Steg macht den Klang seidig-verhalten." }
      ]
    }
  },

  woodwinds: {
    title: "Holzblasinstrumente",
    subtitle: "Luftblatt, Einfach- & Doppelrohrblatt und das Saxophon",
    intro: {
      tag: "Akustik der Luftsäule",
      tagClass: "tag-sage",
      chip: "3 Anblasprinzipien",
      heading: "Warum das metallene Saxophon zu den Holzbläsern gehört",
      body: "Entscheidend für die Einordnung als Holzblasinstrument ist heute nicht das Material (Querflöten bestehen meist aus Silber/Gold, Saxophone aus Messing), sondern die <strong>Tonerzeugung und Überblastechnik über Tonlöcher</strong>: Entweder bricht sich ein Luftstrahl an einer scharfen Kante (Flöten), oder ein bzw. zwei elastische Rohrblätter aus Schilfrohr versetzen die Luftsäule im Inneren in Schwingung."
    },
    items: [
      {
        name: "Querflöte & Piccolo",
        tag: "Luftblatt (ohne Rohrblatt)",
        tagClass: "tag-peach",
        range: "c¹ – d⁴ (Piccolo d² – c⁵)",
        tuning: "Klingend in C (Piccolo +1 Oktave)",
        role: "Silbrige Oberstimmen, Triller & Vogelstimmen",
        desc: "Der Luftstrom trifft auf die Kante des Mundlochs und schwingt hin und her. In der tiefen Lage klingt die Querflöte hauchig-weich mit fast reinem Sinuston, in der dritten Oktave strahlend und scharf. Die winzige Piccoloflöte ist oft das höchste Instrument im ganzen Orchester.",
        demos: [
          { label: "Querflöte (lyrische Figur)", style: "flute", notes: "G4,A4,B4,D5,E5,G5", dur: 0.9, step: 260 }
        ]
      },
      {
        name: "Oboe & Englischhorn",
        tag: "Doppelrohrblatt (konisch)",
        tagClass: "tag-lilac",
        range: "b – a³ (Englischhorn in F)",
        tuning: "Oboe in C • Kammerton a¹",
        role: "Stimmton-Geberin & ausdrucksvolle Solokantilenen",
        desc: "Zwei winzige, aufeinander gebundene Schilfblättchen vibrieren gegeneinander in einem eng-konischen Holzrohr. Das liefert ein extrem obertonreiches, leicht näselnd-eindringliches Timbre. Weil ihre Tonhöhe kaum durch Hitze oder Ansatz schwankt, stimmt sich das gesamte Sinfonieorchester auf das <strong>a¹ der Oboe</strong> ein. Das Englischhorn ist ihre große Alt-Schwester mit birnenförmigem Becher für wehmütige Soli.",
        demos: [
          { label: "Oboen-Klang (Schilfblatt)", style: "reed", notes: "A4,C5,E5,D5,C5,A4", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "Klarinette & Bassklarinette",
        tag: "Einfachrohrblatt (zylindrisch)",
        tagClass: "tag-sage",
        range: "d – b³ (Bassklarinette bis B₁)",
        tuning: "Meist in B oder A (transponierend)",
        role: "Von samtiger Tiefe bis zu brillantem Jazz & Klezmer",
        desc: "Ein einzelnes Rohrblatt schwingt gegen ein festes Mundstück auf einem zylindrischen Rohr. Akustische Besonderheit: Sie verhält sich wie ein einseitig geschlossenes Rohr! Daher klingen in ihrem dunklen, warmen <em>Chalumeau-Register</em> fast nur ungeradzahlige Obertöne, und beim Überblasen springt sie nicht in die Oktave, sondern gleich um eine <strong>Duodezime</strong> (Oktave + Quinte) nach oben.",
        demos: [
          { label: "Klarinetten-Register (tief → hoch)", style: "reed", notes: "D3,F3,A3,C4,E4,A4", dur: 0.9, step: 280 }
        ]
      },
      {
        name: "Fagott & Kontrafagott",
        tag: "Doppelrohrblatt (Bass)",
        tagClass: "tag-peach",
        range: "B₁ – e² (Kontra ab B₂)",
        tuning: "Klingend in C (gefaltetes Rohr)",
        role: "Trockener Staccato-Bass & singender Tenor",
        desc: "Fast 2,60 m konische Röhre werden durch eine U-Krümmung handlich gefaltet. Tief angestoßen liefert das Fagott trockene, humorvoll-knackige Staccati; gebunden in der Mittellage singt es warm wie ein menschlicher Bariton. Das Kontrafagott reicht bis zum tiefsten Kontra-B hinab.",
        demos: [
          { label: "Fagott-Tiefe hören", style: "reed", notes: "Bb1,F2,Bb2,D3,F3", dur: 1.0, step: 330 }
        ]
      },
      {
        name: "Saxophon-Familie (Sopran, Alt, Tenor, Bariton)",
        tag: "Moderne Holzbläser-Brücke",
        tagClass: "tag-lilac",
        range: "Je nach Typ Des² bis f³ (klingend)",
        tuning: "Meist Es (Alt/Bariton) oder B (Sopran/Tenor)",
        role: "Jazz, Bigband, Funk, Soul & Pop-Solo",
        desc: "Um 1840 von Adolphe Sax erfunden als akustischer Hybrid: Es verbindet das Einfachrohrblatt der Klarinette mit dem weiten konischen Korpus der Oboe (aus Messing gefertigt). Dadurch überbläst es normal in die Oktave, vereint bläserische Durchschlagskraft mit Holzbläser-Beweglichkeit und lässt sich vom hauchenden Subtone bis zum schreienden Growl extrem verbiegen.",
        demos: [
          { label: "Tenor-/Alt-Saxophon-Farbe", style: "reed", notes: "C4,Eb4,F4,F#4,G4,Bb4", dur: 0.9, step: 250 }
        ]
      }
    ],
    extraBox: {
      heading: "Merksatz zu transponierenden Blasinstrumenten",
      facts: [
        { title: "Warum stehen B-, Es- oder F-Instrumente in den Noten?", text: "Damit Musiker zwischen verschiedenen Baugrößen (z. B. Alt- und Baritonsaxophon) exakt dieselben Fingersätze behalten! Steht ein geschriebenes <em>C</em> auf einem B-Instrument, klingt ein reales <em>B</em> (einen Ganzton tiefer)." },
        { title: "Klangmischung im Orchester", text: "Da jedes Holzblasinstrument eine eigenwillige Obertonfarbe besitzt (anders als die einheitliche Streicherfamilie), mischt man sie gern: Flöte + Oboe ergibt Silberschimmer mit Kern; Klarinette + Horn verschmilzt zu warmem Samt." }
      ]
    }
  },

  brass: {
    title: "Blechblasinstrumente",
    subtitle: "Naturtonreihe, Ventile, Züge & Dämpfer im Vergleich",
    intro: {
      tag: "Lippenschwingung",
      tagClass: "tag-lilac",
      chip: "Naturtöne + Mechanik",
      heading: "Nicht das Metall erzeugt den Ton – sondern die Lippen!",
      body: "Bei Trompete, Horn, Posaune oder Tuba schwingen die zusammengepressten Lippen des Spielers direkt im Kessel- oder Trichtermundstück als schwingende Membran. Ohne Ventile kann ein Blechblasinstrument nur die jeweilige <strong>Naturtonreihe</strong> seiner Rohrlänge spielen (wie eine alte Signaltrompete). <strong>Ventile</strong> (Dreh- oder Pumpventile) oder ein <strong>Zug</strong> schalten in Sekundenbruchteilen zusätzliche Rohrschleifen zu und machen so alle 12 Halbtöne spielbar."
    },
    items: [
      {
        name: "Trompete & Flügelhorn",
        tag: "Hoch-Blech (zylindrisch vs. konisch)",
        tagClass: "tag-peach",
        range: "e – c³ (klingend)",
        tuning: "Meist in B oder C",
        role: "Fanfaren, Bigband-Lead & glanzvolle Melodien",
        desc: "Die Trompete hat auf fast 2/3 ihrer Länge ein eng-zylindrisches Rohr: Das macht den Klang bei Lautstärke scharf, strahlend und trompetend durchsetzungsfähig. Das verwandte <em>Flügelhorn</em> (weit-konisch) hat bei gleichem Tonumfang einen deutlich weicheren, dunkleren Jazz-Balladen-Klang.",
        demos: [
          { label: "Trompeten-Fanfare (Naturtöne/Dreiklang)", style: "brass", notes: "C4,G4,C5,E5", dur: 0.95, step: 290 }
        ]
      },
      {
        name: "Waldhorn (Horn in F / Doppelhorn)",
        tag: "Eng-konisch + Hand im Trichter",
        tagClass: "tag-sage",
        range: "H₁ – f² (klingend)",
        tuning: "F / B Doppelhorn",
        role: "Epische Filmmusik-Melodien & warme Klangbrücke",
        desc: "Entwickelt aus dem rund 3,7 Meter langen Jagdhorn und gewunden aufgewickelt. Weil es überwiegend eng-konisch in den hohen Naturtönen spielt, klingt es edel, weit und rund – es bildet die perfekte klangliche Brücke zwischen Holzbläsern und tiefem Blech. Mit der rechten Hand tief im Schalltrichter lassen sich die Höhen abrunden oder schmetternd <em>stopfen</em> (Cuivré).",
        demos: [
          { label: "Horn-Quinte hören", style: "brass", notes: "F3,C4,F4,A4", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Posaune (Tenor- & Bassposaune)",
        tag: "Stufenloser Zug (7 Positionen)",
        tagClass: "tag-lilac",
        range: "E – f² (mit Quartventil bis H₁)",
        tuning: "Klingend in B notiert",
        role: "Satter Akkordsatz, Glissando & Jazz-Soli",
        desc: "Statt Ventilen verlängert ein leichtgängiger U-Zug das zylindrische Rohr in 7 Halbton-Positionen. Vorteil: Posaunisten können Mikrointervalle völlig rein nach Gehör korrigieren und echte stufenlose <strong>Glissandi</strong> (Stürze von Ton zu Ton) spielen.",
        demos: [
          { label: "Posaunensatz (Tiefe Mitten)", style: "brass", notes: "Bb2,F3,Bb3,D4", dur: 1.05, step: 320 }
        ]
      },
      {
        name: "Tuba & Euphonium",
        tag: "Weit-konischer Bass",
        tagClass: "tag-peach",
        range: "D₁ – f¹ (Kontrabasstuba ab B₂)",
        tuning: "In F, Es, C oder B",
        role: "Majestätisches Bassfundament & weicher Tiefenklang",
        desc: "Über 5 bis knapp 6 Meter weit-konisches Messingrohr sorgen für einen erstaunlich warmen, runden und fülligen Bass – völlig ohne das schneidende Scheppern engerer Blechinstrumente. Im Blasorchester liefert die Tuba (oft zusammen mit dem sanft-singenden <em>Euphonium</em>) das tragende Fundament.",
        demos: [
          { label: "Tuba-Fundament (Oktave + Quinte)", style: "brass", notes: "F1,C2,F2", dur: 1.25, step: 420 }
        ]
      }
    ],
    extraBox: {
      heading: "Klangverwandlung durch Dämpfer (Mutes) & Spielweisen",
      facts: [
        { title: "Straight Mute (Spitzdämpfer)", text: "Aus Metall oder Fiberglas: filtert die tiefen Anteile heraus und macht Trompete/Posaune metallisch-spitz und scharf (oft im Jazz & bei Schostakowitsch)." },
        { title: "Harmon / Wah-Wah Mute", text: "Berühmt durch Miles Davis: verschließt den Schallbecher komplett und lässt den Klang nur durch eine kleine Röhre austreten – intim, näselnd und durch Öffnen/Schließen mit der Hand entsteht der „Wah-Wah“-Effekt." },
        { title: "Cup Mute & Plunger", text: "Ein Becherdämpfer rundet schrille Höhen samtig ab; mit dem <em>Plunger</em> (einfache Gummisaugglocke!) „spricht“ ein Bigband-Bläser förmlich über das Instrument." }
      ]
    }
  },

  keyboards: {
    title: "Tasteninstrumente",
    subtitle: "Hammer, Federkiel, Pfeifenluft & elektromechanische Klassiker",
    intro: {
      tag: "Polyphone Alleskönner",
      tagClass: "tag-peach",
      chip: "Tasten-Steuerung",
      heading: "Eine Tastatur – vier völlig verschiedene Klangwelten",
      body: "Was Klavier, Cembalo, Kirchenorgel und Fender Rhodes eint, ist allein das Interface: 12 Tasten pro Oktave (7 weiße, 5 schwarze) erlauben einem einzelnen Menschen, gleichzeitig Bass, vollständige Akkorde und Melodie zu spielen. Was unter der Haube beim Tastendruck passiert, unterscheidet sich physikalisch wie Tag und Nacht."
    },
    items: [
      {
        name: "Klavier & Konzertflügel",
        tag: "Saiten angeschlagen (Hammermechanik)",
        tagClass: "tag-peach",
        range: "A₂ – c⁵ (88 Tasten • 27,5 – 4.186 Hz)",
        tuning: "Gleichstufig temperiert (ca. 230 Saiten)",
        role: "Universal-Instrument in Klassik, Jazz, Pop & Komposition",
        desc: "Filzbezogene Hämmer <strong>schlagen</strong> gegen gespannte Stahlsaiten (im Diskant je 3 Chor-Saiten pro Ton!) und fallen sofort zurück, damit die Saite frei schwingt. Das rechte <em>Haltepedal</em> hebt alle Dämpfer gleichzeitig: ungespielte Saiten schwingen durch Obertöne sympathisch mit und schaffen ein leuchtendes Klangbad.",
        demos: [
          { label: "Flügel-Klang (Pedal-Arpeggio)", style: "piano", notes: "C3,G3,E4,G4,B4,D5", dur: 1.2, step: 220 }
        ]
      },
      {
        name: "Cembalo (Harpsichord)",
        tag: "Saiten gezupft (Kiele / Plektren)",
        tagClass: "tag-sage",
        range: "F₁ – f³",
        tuning: "Oft historische Temperaturen (Werckmeister/Valotti)",
        role: "Barocke Basso-Continuo-Basis & silbriger Anschlag",
        desc: "Statt Hämmer zu werfen, zupft ein kleiner Federkiel (heute Delrin) beim Tastendruck die Saite an. Darum hat der Fingerdruck kaum Einfluss auf die Lautstärke: Dynamik entsteht beim Cembalo durch Registerzüge (4', 8', Koppeln) und durch dichte vs. lichte Akkorde und Verzierungen. Extrem obertonreich und rhythmisch prägnant.",
        demos: [
          { label: "Cembalo-Silberklang", style: "cembalo", notes: "D4,F4,A4,D5,C#5,D5", dur: 0.9, step: 210 }
        ]
      },
      {
        name: "Pfeifenorgel & Harmonium",
        tag: "Aerophon (Windladen & Register)",
        tagClass: "tag-lilac",
        range: "Sub-Bass bis 16'/32' (> 16 Hz!) bis 1'-Mixturen",
        tuning: "Labial- & Lingualpfeifen in Fußlagen",
        role: "Monumentale Mehrstimmigkeit mit endlosem Sustain",
        desc: "Der Organist steuert mit Händen (Manuale) und Füßen (Pedal) Ventile unter hunderten bis tausenden Metall- und Holzpfeifen. <em>Labialpfeifen</em> funktionieren wie Blockflöten, <em>Zungenpfeifen</em> schnarren wie Klarinetten/Trompeten. Ein Ton hält exakt so lange voll laut an, bis man den Finger hebt!",
        demos: [
          { label: "Orgel-Register (Vollklang)", style: "organ", notes: "C3,G3,C4,E4,G4", dur: 2.0, step: 0 }
        ]
      },
      {
        name: "Moderne Tasten: Fender Rhodes, Hammond & Stage Piano",
        tag: "Elektromechanik & Bühnen-Kult",
        tagClass: "tag-sage",
        range: "73 bis 88 Tasten / Zugriegel-Kontrolle",
        tuning: "Tonabnehmer, Tonräder & Physical Modeling",
        role: "Jazz, Funk, Soul, Gospel, Rock & aktuelle Pop-Hits",
        desc: "Das <strong>Fender Rhodes</strong> schlägt echte Metall-Stimmzinken (Tines) mit Hämmern an, die über Tonabnehmer wie bei einer E-Gitarre abgenommen werden – glockig-weich und perfekt für Neo-Soul. Das <strong>Clavinet</strong> zupft Saiten mechanisch für knalligen Funk. Die <strong>Hammond B3</strong> mischt per 9 <em>Zugriegeln (Drawbars)</em> elektromagnetisch erzeugte Obertöne (Fußlagen!) und schickt sie durch einen rotierenden <em>Leslie-Lautsprecher</em>.",
        demos: [
          { label: "Orgel-Groove (Drawbar-Charakter)", style: "organ", notes: "G3,B3,D4,F4", dur: 1.5, step: 0 },
          { label: "E-Piano/Warmes Voicing", style: "piano", notes: "F3,A3,C4,E4,G4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },

  plucked: {
    title: "Zupf- & Gitarreninstrumente",
    subtitle: "Nylon, Stahl, elektromagnetische Pickups, E-Bass & Konzertharfe",
    intro: {
      tag: "Anzupfen der Saite",
      tagClass: "tag-sage",
      chip: "Steiler Attack & Ausklang",
      heading: "Anschlagsort verändert das Obertonspektrum",
      body: "Wird eine Saite mit Finger, Nagel oder Plektrum gezupft, entsteht ein starker Einschwing-Impuls (Attack), und hohe Obertöne klingen danach schneller aus als die Grundschwingung. Zupft man dicht am <strong>Steg</strong> (<em>sul ponticello</em>), klingt das Instrument hart, metallisch und brillant; zupft man mittig über dem <strong>Griffbrett</strong> (<em>sul tasto</em>), klingt derselbe Ton rund, glockig und warm."
    },
    items: [
      {
        name: "Konzertgitarre (Nylon) & Westerngitarre (Stahl)",
        tag: "Akustische Resonanzkörper",
        tagClass: "tag-peach",
        range: "E – h² (klingend • notiert +1 Oktave)",
        tuning: "Standard: E – A – d – g – h – e¹",
        role: "Begleitung, Fingerpicking, Flamenco & Songwriting",
        desc: "Die klassische <em>Konzertgitarre</em> mit Nylonsaiten (und umwickelten Basssaiten) überzeugt durch runde Wärme, klare Stimmtrennung und weiches Vibrato. Die <em>Westerngitarre</em> mit Stahlsaiten steht unter deutlich höherem Zug und schneidet mit hellen, glitzernden Obertönen viel lauter durch ein Arrangement (Strumming/Akustik-Pop).",
        demos: [
          { label: "Gitarren-Akkord (Arpeggio)", style: "guitar", notes: "E2,B2,E3,G#3,B3,E4", dur: 1.3, step: 170 }
        ]
      },
      {
        name: "E-Gitarre & Effektkette",
        tag: "Magnetische Tonabnehmer + Amp",
        tagClass: "tag-lilac",
        range: "E – e³ (mit Bending & Harmonics)",
        tuning: "E – A – d – g – h – e¹ (oft auch Drop-Tunings)",
        role: "Funk-Riffs, Clean-Chords, Rock-Riffs & singende Leads",
        desc: "Eine Massivholz-E-Gitarre besitzt fast keinen akustischen Resonanzkörper: Magnetische Spulen (<em>Pickups</em>) wandeln die Saitenschwingung in Wechselstrom um. <strong>Single Coils</strong> (Strat/Tele) klingen klar, perlend und knackig; doppelspulige <strong>Humbucker</strong> (Les Paul) unterdrücken Brummen und liefern fette, cremige Mitten. Erst Verstärker, Overdrive/Verzerrung (fügt dichte Obertöne hinzu!) und Effekte wie Reverb oder Delay machen den Ton komplett.",
        demos: [
          { label: "Clean-Voicing (Quart-Akkord)", style: "guitar", notes: "A2,D3,G3,C4,E4", dur: 1.4, step: 140 }
        ]
      },
      {
        name: "E-Bass (4-, 5-Saiter & Fretless)",
        tag: "Verbindung von Kick & Harmonie",
        tagClass: "tag-sage",
        range: "E₁ (oder H₂ beim 5-Saiter) – g¹",
        tuning: "E₁ – A₁ – D – G",
        role: "Groove-Anker mit Schlagzeug, Fundament aller Bandstile",
        desc: "Akustisch eine Oktave tiefer als die Gitarre und identisch mit dem Kontrabass gestimmt – jedoch mit Bünden für exakte Intonation. Gespielt wird mit den Fingern (warm, rund), dem Plektrum (knackig mit starkem Attack im Rock/Punk) oder per <strong>Slap & Pop</strong> (Daumenschlag + Angerissenes für Funk). Der <em>Fretless-Bass</em> verzichtet auf Bünde und ermöglicht singendes Vibrato.",
        demos: [
          { label: "E-Bass-Groove (Oktave & Quinte)", style: "ebass", notes: "E1,E1,G1,A1,B1,E2", dur: 0.75, step: 260 }
        ]
      },
      {
        name: "Konzertharfe, Mandoline, Banjo & Ukulele",
        tag: "Weitere gezupfte Farben",
        tagClass: "tag-peach",
        range: "Harfe: Ces₁ – ges⁴ (47 Saiten)",
        tuning: "Harfe: Diatonisch mit 7 Doppelpedalen",
        role: "Schimmernde Glissandi, Folk & Akustik-Texturen",
        desc: "Jede der 47 Saiten einer Konzertharfe hat ihre eigene Tonstufe (rot für C, blau/schwarz für F); sieben Pedale mit je drei Einraststufen stimmen alle Oktaven einer Note blitzschnell auf ♭, ♮ oder ♯ um. Daneben prägen <em>Mandoline</em> (doppelchörige Geigenstimmung), <em>Banjo</em> (Fellresonator mit metallischem Attack) und <em>Ukulele</em> zahllose Stile.",
        demos: [
          { label: "Harfen-ähnliches Glissando/Arpeggio", style: "guitar", notes: "C3,D3,E3,G3,A3,C4,D4,E4,G4", dur: 0.9, step: 110 }
        ]
      }
    ]
  },

  electronic: {
    title: "Moderne & Elektronische Instrumente",
    subtitle: "Synthesizer-Bausteine, Sampler, Drumcomputer & Studio-Effekte",
    intro: {
      tag: "Klangdesign & Produktion",
      tagClass: "tag-sage",
      chip: "Elektrophon & Digital",
      heading: "Vom Naturinstrument zur freien Konstruktion der Klangwelle",
      body: "Bei akustischen Instrumenten gibt die Physik von Holz, Messing oder Fell die Klangfarbe weitgehend vor. Elektronische Klangerzeuger beginnen dagegen beim elektrischen Signal oder mathematischen Wellenformen: Du baust selbst, wie viele Obertöne vorhanden sind, wie schnell der Ton einschwingt und wie er sich im Raum bewegt."
    },
    items: [
      {
        name: "Subtraktive Synthesizer (Analog & Virtual-Analog)",
        tag: "Oszillator + Filter + Hüllkurve",
        tagClass: "tag-sage",
        range: "Beliebig (Sub-Bass 20 Hz bis Ultra-Höhen)",
        tuning: "Volt/Oktave oder MIDI (inkl. Mikrotonalität)",
        role: "Fette Bässe, Sägezahn-Leads, warme Flächenpads",
        desc: "Das berühmteste Prinzip seit dem Minimoog: <strong>1. Oszillator (VCO)</strong> erzeugt obertonreiche Grundwellen wie <em>Sägezahn</em> (alle Obertöne – fett & streicherartig), <em>Rechteck/Puls</em> (nur ungeradzahlige – hohl/kraftvoll) oder <em>Dreieck/Sinus</em> (weich/sub). <strong>2. Filter (VCF)</strong> schneidet per <em>Cutoff</em> und <em>Resonanz</em> Obertöne ab („Wow“-Filterfahrten!). <strong>3. Hüllkurve (ADSR)</strong> regelt Attack, Decay, Sustain und Release.",
        demos: [
          { label: "Sägezahn-Synth (Oberton-Lead)", style: "synth-saw", notes: "C3,E3,G3,B3,C4", dur: 0.85, step: 230 },
          { label: "Warmes Analog-Pad (Fläche)", style: "synth-pad", notes: "C3,G3,B3,D4,E4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "FM-, Wavetable- & Granular-Synthese",
        tag: "Digitale Klangwelten",
        tagClass: "tag-lilac",
        range: "Ultra-flexibel bis zu geräuschhaften Texturen",
        tuning: "Digital exakt / frei stimmbar",
        role: "80er-Glocken-E-Pianos, EDM-Bässe & Film-Sounddesign",
        desc: "<strong>FM-Synthese</strong> (berühmt durch den Yamaha DX7) moduliert die Frequenz einer Welle mit einer zweiten hörbaren Welle – so entstehen komplexe metallische Glocken, crispe E-Pianos und zupfige Slap-Bässe ohne Filter. <strong>Wavetable-Synths</strong> morphen nahtlos zwischen gespeicherten Einzelwellenformen, während <strong>Granular-Synthese</strong> Aufnahmen in winzige Klangkörnchen („Grains“, 10–50 ms) zerlegt und neu schichtet.",
        demos: [
          { label: "Schwebendes Pad-Voicing", style: "synth-pad", notes: "A2,E3,G3,B3,D4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "Sampler, Mellotron & Drumcomputer (808 / 909 / MPC)",
        tag: "Sampling & Step-Sequencing",
        tagClass: "tag-peach",
        range: "Volles Spektrum über Pitch-Shifting",
        tuning: "Chromatisch spielbar über Tastatur & Pads",
        role: "Hip-Hop, House, Techno, Pop-Beats & Orchester-Mockups",
        desc: "Ein <strong>Sampler</strong> nimmt beliebige reale Klänge (Chöre, Schallplatten, Alltagsgeräusche) auf und macht sie chromatisch spielbar (Vorläufer war das analoge Tonband-<em>Mellotron</em> der Beatles!). Legendäre <strong>Drumcomputer</strong> wie die Roland <em>TR-808</em> schufen ikonische elektronische Kicks, Claps und Cowbells – die abklingende 808-Kick-Sinuswelle dient im Hip-Hop und Trap heute direkt als spielbare Sub-Bass-Melodie!",
        demos: [
          { label: "808-Sub-Bass-Linie hören", style: "ebass", notes: "C1,C1,Eb1,G1,C2,G1", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "DAW, Virtuelle Instrumente & Effekte im Mix",
        tag: "Die moderne Studio-Werkbank",
        tagClass: "tag-sage",
        range: "Software-Umgebung (Studio am Rechner)",
        tuning: "Echtzeit-Pitch & Automation",
        role: "Komposition, Arrangement, Mixing & Mastering",
        desc: "Heute ersetzt eine <em>Digital Audio Workstation (DAW)</em> ganze Bandmaschinen und Tonstudios: Über <strong>MIDI</strong> steuert man präzise Notenwerte und Dynamik an Software-Synthesizer oder gigantische Orchester-Sample-Libraries. Im Mix formen <strong>Equalizer (EQ)</strong> die Frequenzräume, <strong>Kompressoren</strong> bändigen Lautstärkesprünge, und <strong>Reverb / Delay</strong> schaffen künstliche Konzertsäle.",
        demos: [
          { label: "Synth + Sub-Layer hören", style: "synth-saw", notes: "F2,C3,A3,E4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },

  ensembles: {
    title: "Orchester, Band & Ensembles",
    subtitle: "Warum verschiedene Instrumente zusammen nicht im Klangbrei versinken",
    intro: {
      tag: "Arrangement & Frequenzraum",
      tagClass: "tag-peach",
      chip: "Arbeitsteilung im Klang",
      heading: "Das Geheimnis guter Besetzungen: Frequenz + Rolle",
      body: "Wenn 80 Personen im Sinfonieorchester oder 5 Musiker einer Rockband gleichzeitig spielen, muss jedes Instrument seinen eigenen <strong>Frequenzbereich</strong> (Tiefen, Mitten, Höhen) und seine eigene <strong>rhythmische oder harmonische Aufgabe</strong> übernehmen. Genau danach sind historisch alle großen Besetzungen gewachsen."
    },
    items: [
      {
        name: "Das Sinfonieorchester (ca. 70–100 Musiker)",
        tag: "4 klassische Gruppen",
        tagClass: "tag-peach",
        range: "Kontra-Bass bis Piccolo-Höhe (16 Hz – > 4 kHz)",
        tuning: "Einheits-Kammerton a¹ = 440 bis 443 Hz",
        role: "Maximale Dynamik- & Klangfarbenpalette",
        desc: "Warum sitzen im Orchester über 50 Streicher neben nur je 2–4 Holz- und Blechbläsern? Weil eine einzige Trompete oder Posaune lauter schmettert als viele Violinen zusammen! Die großen Streichergruppen bilden das weiche, flächendeckende <em>Fundament</em>, während die individuell gefärbten Holzbläser Akzente setzen, das Blech glanzvolle Höhepunkte türmt und Pauke/Schlagwerk rhythmische Dramatik liefern.",
        demos: [
          { label: "Streicher-Teppich + Blech-Akzent", style: "strings", notes: "C2,G2,E3,C4,G4", dur: 2.0, step: 0 },
          { label: "Bläser-Fanfare darüber", style: "brass", notes: "C4,G4,C5,E5", dur: 1.1, step: 240 }
        ]
      },
      {
        name: "Kammermusik (Streichquartett & Bläserquintett)",
        tag: "Solistische Transparenz",
        tagClass: "tag-sage",
        range: "4 bis 5 gleichberechtigte Stimmen",
        tuning: "Reine Intonation im Zusammenspiel",
        role: "Feines Wechselgespräch wie im Chorsatz",
        desc: "Im klassischen <strong>Streichquartett</strong> (2 Violinen, Viola, Cello) bilden die vier Instrumente exakt das Gegenstück zum vierstimmigen SATB-Chor: homogen im Klang, maximal durchsichtig und beweglich. Im <strong>Bläserquintett</strong> (Flöte, Oboe, Klarinette, Fagott + Waldhorn!) reizt genau das Gegenteil: fünf völlig unterschiedliche Klangfarben verschmelzen durch das vermittelnde Horn.",
        demos: [
          { label: "Streichquartett-Akkord (Cello → Violine)", style: "strings", notes: "C2,G3,D4,E4", dur: 1.5, step: 260 }
        ]
      },
      {
        name: "Bigband & Jazz-Combo",
        tag: "Rhythmusgruppe vs. Horn-Section",
        tagClass: "tag-lilac",
        range: "Komplette Jazz-Satztechnik (Block-Voicings)",
        tuning: "Swing-Phrasierung & Call-and-Response",
        role: "Antrieb durch Walking Bass/Drums + Bläser-Riffs",
        desc: "Eine klassische Bigband teilt sich klar auf: Die <strong>Rhythmusgruppe</strong> (Schlagzeug, Kontra-/E-Bass, Piano, Gitarre) liefert durchgehend Puls, Harmoniegerüst und Swing. Gegenüber steht die <strong>Horn-Section</strong> aus bis zu 5 Saxophonen, 4 Posaunen und 4 Trompeten, die sich in kompakten, reibungsreichen Jazz-Akkorden (<em>Drop-2-Voicings</em>) musikalische Bälle zuwerfen.",
        demos: [
          { label: "Horn-Section-Voicing", style: "brass", notes: "Bb2,Ab3,C4,D4,G4", dur: 1.7, step: 0 }
        ]
      },
      {
        name: "Moderne Pop-, Rock- & Funkband",
        tag: "Kompakte Rollenverteilung",
        tagClass: "tag-peach",
        range: "Sub-Fundament bis Präsenz-Vokalbereich",
        tuning: "Tightes Timing zwischen Kick & Bass",
        role: "Groove, eingängige Hooks & Gesangsfokus",
        desc: "<strong>Bassdrum + E-Bass (oder 808)</strong> teilen sich den Sub-Bereich (40–250 Hz) als gemeinsamer Motor. <strong>Snare & Hi-Hat</strong> spannen das rhythmische Netz. <strong>Gitarren, Klavier oder Synths</strong> besetzen den warmen Mittelbereich (300 Hz – 3 kHz) – und halten sich bei der Strophe oft zurück, um dem <strong>Gesang</strong> in der Präsenz-Mitte (1–4 kHz) Luft zu lassen.",
        demos: [
          { label: "Band-Voicing (Bass + Piano)", style: "piano", notes: "A2,E3,G3,B3,C#4", dur: 1.6, step: 110 }
        ]
      }
    ]
  }
};

/**
 * Rendert ein Instrumentenkunde-Modul als Karten-Liste
 */
function renderInstrumentModuleHTML(refKey) {
  const localized = resolveRegisteredKnowledgeRender(
    "instrumentModule",
    typeof renderInstrumentModuleHTML_EN === "function" ? renderInstrumentModuleHTML_EN : null,
    typeof renderInstrumentModuleHTML_FR === "function" ? renderInstrumentModuleHTML_FR : null,
    refKey
  );
  if (localized !== null) return localized;
  const mod = INSTRUMENT_MODULES_DATA[refKey];
  if (!mod) return "";

  const introCard = mod.intro ? `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${mod.intro.tagClass}">${mod.intro.tag}</span>
        <span class="k-ratio-chip">${mod.intro.chip}</span>
      </div>
      <h4>${mod.intro.heading}</h4>
      <p>${mod.intro.body}</p>
    </article>
  ` : "";

  const itemCards = (mod.items || []).map(item => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${item.tagClass}">${item.tag}</span>
        <span class="k-ratio-chip">${item.role.split(" &")[0]}</span>
      </div>
      <h4>${item.name}</h4>
      <div class="inst-meta-row">
        <span class="inst-meta-pill">Umfang: ${item.range}</span>
        <span class="inst-meta-pill">${item.tuning}</span>
      </div>
      <p><strong>Rolle:</strong> ${item.role}</p>
      <p>${item.desc}</p>
      ${item.demos?.length ? `
        <div class="k-btn-row">
          ${item.demos.map(d => `
            <button class="btn-tool" data-play-inst="true" data-style="${d.style}" data-notes="${d.notes}" data-dur="${d.dur}" data-step="${d.step}">▶ ${d.label}</button>
          `).join("")}
        </div>
      ` : ""}
    </article>
  `).join("");

  const extraCard = mod.extraBox ? `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Praxis &amp; Klangtipps</span>
        <span class="k-ratio-chip">Vertiefung</span>
      </div>
      <h4>${mod.extraBox.heading}</h4>
      <div class="physics-fact-grid">
        ${mod.extraBox.facts.map(f => `
          <div class="physics-fact-item">
            <strong>${f.title}</strong>
            ${f.text}
          </div>
        `).join("")}
      </div>
    </article>
  ` : "";

  return introCard + itemCards + extraCard;
}

/**
 * Nachschlagewerk: Die 7 Kirchentonarten (Modi) sortiert nach Helligkeit + Moll-Varianten
 */
const MODES_ENCYCLOPEDIA = [
  {
    id: "lydian",
    name: "Lydisch",
    family: "major",
    familyLabel: "Dur-Familie",
    brightness: "1 / 7 • Strahlend-schwebend",
    badgeClass: "badge-peach",
    rootLabel: "C",
    stammton: "4. Stufe der Stammtonreihe (wie C-Dur ab F)",
    formula: "1 · 2 · 3 · #4 · 5 · 6 · 7",
    steps: "G – G – G – H – G – G – H",
    charNote: "Übermäßige Quarte (#4, z. B. fis über C)",
    vamp: "I – II (C – D)",
    desc: "Der hellste aller sieben diatonischen Modi. Weil die #4 den kritischen „Avoid-Note“-Halbton über der Dur-Terz vermeidet, klingt Lydisch schwebend, traumhaft und grenzenlos – ganz ohne Erdungsschwere.",
    usage: "<strong>Musikalische Funktion:</strong> Ideal für Filmmusik, Staunen und Sci-Fi (John Williams <em>E.T.</em>, <em>Die Simpsons</em>-Titelthema, Danny Elfman), virtuosen Rock (Joe Satriani, Steve Vai) sowie im Jazz über stehende Maj7(#11)-Akkorde.",
    notes: "C4,D4,E4,F#4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4", "B4"], ["D3", "F#4", "A4", "C5"]]
  },
  {
    id: "ionian",
    name: "Ionisch (Dur)",
    family: "major",
    familyLabel: "Dur-Familie",
    brightness: "2 / 7 • Ausgewogen-offen",
    badgeClass: "badge-sage",
    rootLabel: "C",
    stammton: "1. Stufe der Stammtonreihe (C-Dur)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · 7",
    steps: "G – G – H – G – G – G – H",
    charNote: "Reine Quarte (4) + großer Leitton (7 → 1)",
    vamp: "I – IV – V – I",
    desc: "Unser klassisches Dur. Der Tritonus zwischen 4. und 7. Stufe löst sich sauber in Grundton und Terz auf – dadurch entsteht klares „Zuhause“-Gefühl, Stabilität und Zielstrebigkeit.",
    usage: "<strong>Musikalische Funktion:</strong> Das Rückgrat der abendländischen Funktionsharmonik, klassischer Sinfonik, Pop-Hymnen und Kinderlieder. Immer wenn Musik ein eindeutiges tonales Zentrum und freudige Auflösung sucht.",
    notes: "C4,D4,E4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4"], ["F3", "A4", "C5"], ["G3", "B4", "D5"], ["C3", "E4", "G4"]]
  },
  {
    id: "mixolydian",
    name: "Mixolydisch",
    family: "major",
    familyLabel: "Dur-Familie",
    brightness: "3 / 7 • Erdig-treibend",
    badgeClass: "badge-peach",
    rootLabel: "C",
    stammton: "5. Stufe der Stammtonreihe (wie C-Dur ab G)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · b7",
    steps: "G – G – H – G – G – H – G",
    charNote: "Kleine Septime (b7, z. B. b über C)",
    vamp: "I – bVII (C – Bb)",
    desc: "Ein Dur-Modus, dem der klassische aufwärts ziehende Leitton fehlt. Stattdessen bringt die kleine Septime b7 entspannten Blues-, Rock- und Groove-Charakter mit Vorwärtsdrang.",
    usage: "<strong>Musikalische Funktion:</strong> Dominierender Modus in Classic Rock, Funk, Folk und Reggae (Beatles <em>Norwegian Wood</em>, AC/DC, Deep Purple) und Pflicht-Skala im Jazz über Dominantseptakkorde (V7).",
    notes: "C4,D4,E4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "E4", "G4", "Bb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "dorian",
    name: "Dorisch",
    family: "minor",
    familyLabel: "Moll-Familie",
    brightness: "4 / 7 • Samtig-groovy",
    badgeClass: "badge-lilac",
    rootLabel: "C",
    stammton: "2. Stufe der Stammtonreihe (wie C-Dur ab D)",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · b7",
    steps: "G – H – G – G – G – H – G",
    charNote: "Große Sexte im Moll-Gewand (♮6, z. B. a über C)",
    vamp: "i – IV (Cm – F)",
    desc: "Die Balance-Mitte aller Kirchentonarten: Moll-Terz und kleine Septime treffen auf die aufgehellte große Sexte (♮6). Weder traurig-schwer noch kitschig – kühl, stilvoll und tanzbar.",
    usage: "<strong>Musikalische Funktion:</strong> Der unangefochtene Favorit für Funk, Soul, Modal-Jazz und Progressive Rock (Miles Davis <em>So What</em>, Santana <em>Oye Como Va</em>, Daft Punk <em>Get Lucky</em>, Pink Floyd) sowie keltische Folk-Balladen.",
    notes: "C4,D4,Eb4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4", "Bb4"], ["F3", "A4", "C5"]]
  },
  {
    id: "aeolian",
    name: "Äolisch (Natürliches Moll)",
    family: "minor",
    familyLabel: "Moll-Familie",
    brightness: "5 / 7 • Ernst-melancholisch",
    badgeClass: "badge-sage",
    rootLabel: "C",
    stammton: "6. Stufe der Stammtonreihe (wie C-Dur ab A)",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · b7",
    steps: "G – H – G – G – H – G – G",
    charNote: "Kleine Sexte (b6, z. B. as) + kleine Septime (b7)",
    vamp: "i – bVI – bVII (Cm – Ab – Bb)",
    desc: "Unser natürliches Moll. Durch die abgedunkelte kleine Sexte (b6) über der Quinte entsteht sofort Weite, Pathos, Sehnsucht oder epische Nachdenklichkeit.",
    usage: "<strong>Musikalische Funktion:</strong> Allgegenwärtig in Rockballaden, Pop-Mollstücken (Adele, <em>All Along the Watchtower</em>), R&B und dramatischer Filmmusik. Im Gegensatz zu Dorisch zieht b6 gefühlvoll abwärts zur Quinte.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Ab3", "C4", "Eb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "phrygian",
    name: "Phrygisch",
    family: "minor",
    familyLabel: "Moll-Familie",
    brightness: "6 / 7 • Düster-exotisch",
    badgeClass: "badge-lilac",
    rootLabel: "C",
    stammton: "3. Stufe der Stammtonreihe (wie C-Dur ab E)",
    formula: "1 · b2 · b3 · 4 · 5 · b6 · b7",
    steps: "H – G – G – G – H – G – G",
    charNote: "Kleine Sekunde direkt am Anfang (b2, z. B. des → c)",
    vamp: "i – bII (Cm – Db)",
    desc: "Ein Halbtonschritt direkt über dem Grundton sorgt für sofortige Spannung, Geheimnis und spanisch-orientalisches Temperament. Die b2 fällt magnetisch in den Grundton zurück.",
    usage: "<strong>Musikalische Funktion:</strong> Herzstück von Flamenco (dort oft mit Dur-Terz als <em>Phrygisch-Dominant</em>), Heavy Metal / Djent (Metallica), Dark-Trap-Beats und spannungsreichen Film-Thrillern.",
    notes: "C4,Db4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "locrian",
    name: "Lokrisch",
    family: "minor",
    familyLabel: "Moll-Familie",
    brightness: "7 / 7 • Vermindert-instabil",
    badgeClass: "badge-lilac",
    rootLabel: "C",
    stammton: "7. Stufe der Stammtonreihe (wie C-Dur ab H)",
    formula: "1 · b2 · b3 · 4 · b5 · b6 · b7",
    steps: "H – G – G – H – G – G – G",
    charNote: "Verminderte Quinte (b5, z. B. ges) + b2",
    vamp: "i° – bII (Cm7b5 – Db)",
    desc: "Der einzige diatonische Modus ohne reine Quinte über dem Grundton. Statt Ruhe bildet der Grundakkord einen verminderten Dreiklang / halbverminderten m7b5-Klang voller Reibung.",
    usage: "<strong>Musikalische Funktion:</strong> Selten als komplettes Song-Fundament (z. B. Björk <em>Army of Me</em>-Anklänge, Prog-Metal), dafür im Jazz das unverzichtbare Werkzeug über Halbvermindert (ii°7 in Moll-II-V-I-Kadenzen) und in Horror-/Suspense-Scores.",
    notes: "C4,Db4,Eb4,F4,Gb4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "Gb4", "Bb4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "harmonic-minor",
    name: "Harmonisch Moll (Praxis-Ergänzung)",
    family: "variant",
    familyLabel: "Moll-Variante",
    brightness: "Spannung • Klassik, Neo-Klassik & Orient",
    badgeClass: "badge-peach",
    rootLabel: "C",
    stammton: "Abgeleitet von Äolisch mit erhöhter 7. Stufe",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · #7",
    steps: "G – H – G – G – H – 1½ – H",
    charNote: "Großer Leitton (7) + Übermäßige Sekunde (b6 → 7, 3 HS!)",
    vamp: "i – V7 (Cm – G7)",
    desc: "Verbindet die ernste b6 von Äolisch mit dem echten Dur-Leitton (7). Dazwischen klafft der berühmte anderthalb-Ton-Schritt (Hiatus b6–7), der sofort dramatisch oder barock-orientalisch klingt.",
    usage: "<strong>Musikalische Funktion:</strong> Schafft erst die echte Dur-Dominante V7 in Moll-Tonarten (Bach, Mozart, Tango, Neo-Classical Shredding wie Yngwie Malmsteen). Ihre 5. Stufe ergibt <em>Phrygisch-Dominant</em>.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,B4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["G3", "B4", "D5", "F5"]]
  },
  {
    id: "melodic-minor",
    name: "Melodisch Moll (Jazz Minor)",
    family: "variant",
    familyLabel: "Moll-Variante",
    brightness: "Modern • Film-Noir, Jazz & Fusion",
    badgeClass: "badge-sage",
    rootLabel: "C",
    stammton: "Wie Dur, nur mit kleiner Terz (b3) statt großer",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · 7",
    steps: "G – H – G – G – G – G – H",
    charNote: "b3 kombiniert mit aufgehellter ♮6 und Leitton 7",
    vamp: "imMaj7 – IV7 (CmMaj7 – F7)",
    desc: "Klassisch wurde beim Aufwärtssingen sowohl die 6. als auch die 7. Stufe erhöht, um den Hiatus zu glätten (abwärts dann wieder natürlich). Im Jazz nutzt man diese Skala in beide Richtungen als eigenständige Klangwelt.",
    usage: "<strong>Musikalische Funktion:</strong> Der edel-geheimnisvolle „Detektiv-/Film-Noir“-Klang (imMaj7) und Mutter vieler Modern-Jazz-Modi wie Lydisch-Dominant (4. Stufe) oder Alterierter Skala (7. Stufe).",
    notes: "C4,D4,Eb4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "Eb4", "G4", "B4"], ["F3", "A4", "C5", "Eb5"]]
  }
];

function renderModesReferenceHTML(familyFilter = "all") {
  const localized = resolveRegisteredKnowledgeRender(
    "modes",
    typeof renderModesReferenceHTML_EN === "function" ? renderModesReferenceHTML_EN : null,
    typeof renderModesReferenceHTML_FR === "function" ? renderModesReferenceHTML_FR : null,
    familyFilter
  );
  if (localized !== null) return localized;
  const list = familyFilter === "all"
    ? MODES_ENCYCLOPEDIA
    : MODES_ENCYCLOPEDIA.filter(m => m.family === familyFilter);

  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Grundprinzip</span>
        <span class="k-ratio-chip">Relativ vs. Parallel</span>
      </div>
      <h4>Was genau sind Modi (Kirchentonarten)?</h4>
      <p>
        Ein <strong>Modus</strong> entsteht, wenn wir denselben Tonvorrat verwenden, aber einen anderen Ton zum ruhenden <strong>Grundton (Tonzentrum)</strong> erklären. Auf den weißen Klaviertasten (C-Dur-Vorrat) ergibt sich so je nach Startton eine komplett andere Folge von Ganz- und Halbtonschritten: Ab <code>D</code> entsteht <em>Dorisch</em>, ab <code>E</code> <em>Phrygisch</em>, ab <code>F</code> <em>Lydisch</em>, ab <code>G</code> <em>Mixolydisch</em>, ab <code>A</code> <em>Äolisch</em> und ab <code>H</code> <em>Lokrisch</em>.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>1. Relativ (gleiche Tasten)</h5>
          <p>Gut für Theorie &amp; Griffbilder: „D-Dorisch benutzt exakt dieselben Töne wie C-Dur.“ Fürs Gehör aber tückisch, weil oft noch C im Ohr nachklingt.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>2. Parallel (gleicher Grundton!)</h5>
          <p><strong>Der Schlüssel fürs Gehör:</strong> Spiele alle 7 Modi von <code>C</code> aus! Dann zeigt ein einziger Charakterton sofort den Stimmungswechsel (z. B. <code>C → fis</code> = Lydisch, <code>C → b</code> = Mixolydisch).</p>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">Das Klang-Spektrum</span>
        <span class="k-ratio-chip">Hell → Dunkel</span>
      </div>
      <h4>Helligkeits-Reihenfolge (im Quintenzirkel)</h4>
      <p>
        Ordnet man die 7 Kirchentonarten nicht nach Stufen (1–7), sondern nach ihrer <strong>Helligkeit</strong>, ändert sich von Modus zu Modus jeweils exakt <strong>ein einziger Ton um einen Halbton nach unten</strong> – genau entlang des Quintenzirkels:
      </p>
      <div class="mode-spectrum-strip">
        <span class="mode-spec-chip is-bright">1. Lydisch (#4)</span>
        <span class="mode-spec-chip">2. Ionisch</span>
        <span class="mode-spec-chip">3. Mixolydisch (b7)</span>
        <span class="mode-spec-chip">4. Dorisch (b3, b7)</span>
        <span class="mode-spec-chip">5. Äolisch (+b6)</span>
        <span class="mode-spec-chip">6. Phrygisch (+b2)</span>
        <span class="mode-spec-chip is-dark">7. Lokrisch (+b5)</span>
      </div>
    </article>

    <div class="k-filter-row" aria-label="Modi filtern">
      <button class="k-filter-pill ${familyFilter === "all" ? "active" : ""}" data-mfilter="all">Alle (${MODES_ENCYCLOPEDIA.length})</button>
      <button class="k-filter-pill ${familyFilter === "major" ? "active" : ""}" data-mfilter="major">Dur-Familie (3)</button>
      <button class="k-filter-pill ${familyFilter === "minor" ? "active" : ""}" data-mfilter="minor">Moll-Familie (4)</button>
      <button class="k-filter-pill ${familyFilter === "variant" ? "active" : ""}" data-mfilter="variant">Moll-Varianten (2)</button>
    </div>

    <div class="knowledge-list">
      ${list.map(m => `
        <article class="knowledge-card">
          <div class="k-card-top-row">
            <span class="k-card-tag ${m.family === "major" ? "tag-peach" : m.family === "minor" ? "tag-lilac" : "tag-sage"}">${m.familyLabel} • ${m.brightness}</span>
            <span class="k-ratio-chip">${m.formula}</span>
          </div>
          <h4>${m.name} (Beispiel über ${m.rootLabel})</h4>
          <p class="k-char">${m.stammton}</p>
          <p><strong>Charakterton:</strong> ${m.charNote}<br><strong>Schrittfolge:</strong> <code>${m.steps}</code></p>
          <p>${m.desc}</p>
          <p>${m.usage}</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-mode-scale="${m.id}">▶ Tonleiter (${m.rootLabel})</button>
            <button class="btn-tool" data-play-mode-vamp="${m.id}">▶ Akkordpendel: ${m.vamp}</button>
          </div>
        </article>
      `).join("")}
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Kompositions-Praxis</span>
        <span class="k-ratio-chip">So bleiben Modi stabil</span>
      </div>
      <h4>Wie man modal komponiert, ohne ins normale Dur zu kippen</h4>
      <ul class="k-physics-list">
        <li><strong>Tritonus-Falle meiden:</strong> Im klassischen C-Dur bilden <code>F</code> und <code>H</code> zusammen den Tritonus des G7-Akkords, der hart nach C zieht. Vermeide in Dorisch (D) oder Mixolydisch (G) lange V7→I-Wendungen des Stamm-Dur-Akkords, sonst verliert dein Modus sein eigenes Zuhause.</li>
        <li><strong>Modale Akkordpendel nutzen:</strong> Statt komplexer 4-Akkord-Funktionsketten pendeln modale Stücke meist zwischen dem Grundakkord und genau dem Nachbarakkord, der den <strong>Charakterton</strong> trägt (z. B. <code>Cm – F</code> in C-Dorisch enthält das helle <code>A</code>).</li>
        <li><strong>Orgelpunkt (Drone):</strong> Ein liegender Grundton + Quinte im Bass verankert den Modus sofort – das Ohr hört jede Skalenstufe automatisch als Spannung relativ zu diesem Zentrum.</li>
      </ul>
    </article>
  `;
}

/**
 * Gründlicher Atlas aller 12 Tonzentren für das Modul „Tonarten & Quintenzirkel“
 */
const KEYS_CIRCLE_DATA = [
  {
    id: "key-0",
    group: "neutral",
    sigBadge: "0 Vorzeichen",
    majorName: "C-Dur",
    minorName: "a-Moll",
    rootMidi: 60,
    minorMidi: 57,
    accidentalList: "Keine Kreuz- oder Be-Vorzeichen (nur Stammtöne)",
    chords: "I C · ii Dm · iii Em · IV F · V G · vi Am",
    instrumentTip: "Standard-Einstieg auf Klavier, Blockflöte & für Gesangs-Übungen"
  },
  {
    id: "key-1s",
    group: "sharp",
    sigBadge: "1 ♯",
    majorName: "G-Dur",
    minorName: "e-Moll",
    rootMidi: 55,
    minorMidi: 52,
    accidentalList: "1♯: fis (Leitton zu G)",
    chords: "I G · ii Am · iii Hm · IV C · V D · vi Em",
    instrumentTip: "Sehr beliebt bei Streichern (leere G/D/A/E-Saiten) & Akustikgitarre"
  },
  {
    id: "key-2s",
    group: "sharp",
    sigBadge: "2 ♯",
    majorName: "D-Dur",
    minorName: "h-Moll",
    rootMidi: 62,
    minorMidi: 59,
    accidentalList: "2♯: fis, cis",
    chords: "I D · ii Em · iii F#m · IV G · V A · vi Hm",
    instrumentTip: "Brillante Orchester-Festtonart (Trompeten in D, Violine, Cello)"
  },
  {
    id: "key-3s",
    group: "sharp",
    sigBadge: "3 ♯",
    majorName: "A-Dur",
    minorName: "fis-Moll",
    rootMidi: 57,
    minorMidi: 54,
    accidentalList: "3♯: fis, cis, gis",
    chords: "I A · ii Hm · iii C#m · IV D · V E · vi F#m",
    instrumentTip: "Offen, warm & brillant auf Gitarre und Streichinstrumenten"
  },
  {
    id: "key-4s",
    group: "sharp",
    sigBadge: "4 ♯",
    majorName: "E-Dur",
    minorName: "cis-Moll",
    rootMidi: 64,
    minorMidi: 61,
    accidentalList: "4♯: fis, cis, gis, dis",
    chords: "I E · ii F#m · iii G#m · IV A · V H · vi C#m",
    instrumentTip: "Klassische E-Gitarren-, Blues- & Rock-Tonart (leere tiefe E-Saite)"
  },
  {
    id: "key-5s",
    group: "sharp",
    sigBadge: "5 ♯ / 7 ♭",
    majorName: "H-Dur (= Ces-Dur)",
    minorName: "gis-Moll (= as-Moll)",
    rootMidi: 59,
    minorMidi: 56,
    accidentalList: "5♯: fis, cis, gis, dis, ais (enharmonisch: Ces-Dur mit 7♭)",
    chords: "I H · ii C#m · iii D#m · IV E · V F# · vi G#m",
    instrumentTip: "Liegt durch alle 5 schwarzen Tasten erstaunlich bequem unter den Fingern am Klavier"
  },
  {
    id: "key-6",
    group: "sharp",
    sigBadge: "6 ♯ / 6 ♭",
    majorName: "Fis-Dur / Ges-Dur",
    minorName: "dis-Moll / es-Moll",
    rootMidi: 54,
    minorMidi: 51,
    accidentalList: "6♯ (fis, cis, gis, dis, ais, eis) oder 6♭ (b, es, as, des, ges, ces)",
    chords: "I F#/Gb · ii G#m/Abm · IV H/Cb · V C#/Db · vi D#m/Ebm",
    instrumentTip: "Die Gegenüberstellung zu C-Dur im Zirkel (Tritonus-Pol!). Enharmonischer Brückenpunkt"
  },
  {
    id: "key-5f",
    group: "flat",
    sigBadge: "5 ♭ / 7 ♯",
    majorName: "Des-Dur (= Cis-Dur)",
    minorName: "b-Moll (= ais-Moll)",
    rootMidi: 61,
    minorMidi: 58,
    accidentalList: "5♭: b, es, as, des, ges (enharmonisch: Cis-Dur mit 7♯)",
    chords: "I Db · ii Ebm · iii Fm · IV Gb · V Ab · vi Bbm",
    instrumentTip: "Beliebte romantische Klavier-, Soul- & Jazzballaden-Tonart (samtig durch schwarze Tasten)"
  },
  {
    id: "key-4f",
    group: "flat",
    sigBadge: "4 ♭",
    majorName: "As-Dur",
    minorName: "f-Moll",
    rootMidi: 56,
    minorMidi: 53,
    accidentalList: "4♭: b, es, as, des",
    chords: "I Ab · ii Bbm · iii Cm · IV Db · V Eb · vi Fm",
    instrumentTip: "Sehr häufig in Jazz-Standards, Blasorchestern & Pop-Balladen"
  },
  {
    id: "key-3f",
    group: "flat",
    sigBadge: "3 ♭",
    majorName: "Es-Dur",
    minorName: "c-Moll",
    rootMidi: 63,
    minorMidi: 60,
    accidentalList: "3♭: b, es, as",
    chords: "I Eb · ii Fm · iii Gm · IV Ab · V Bb · vi Cm",
    instrumentTip: "Helden-Tonart (Beethoven Eroica), Heimat für Altsaxophon & B-/Es-Bläser"
  },
  {
    id: "key-2f",
    group: "flat",
    sigBadge: "2 ♭",
    majorName: "B-Dur",
    minorName: "g-Moll",
    rootMidi: 58,
    minorMidi: 55,
    accidentalList: "2♭: b, es",
    chords: "I Bb · ii Cm · iii Dm · IV Eb · V F · vi Gm",
    instrumentTip: "Die Parade-Tonart für Jazz, Bigband, Blaskapelle & B-Trompete/Klarinette"
  },
  {
    id: "key-1f",
    group: "flat",
    sigBadge: "1 ♭",
    majorName: "F-Dur",
    minorName: "d-Moll",
    rootMidi: 53,
    minorMidi: 62,
    accidentalList: "1♭: b (Beethoven: H → B)",
    chords: "I F · ii Gm · iii Am · IV Bb · V C · vi Dm",
    instrumentTip: "Warm-pastoraler Klang; Wohlfühltonart für Hörner, Flöten & Chöre"
  }
];

function renderKeysReferenceHTML(circleFilter = "all") {
  const localized = resolveRegisteredKnowledgeRender(
    "keys",
    typeof renderKeysReferenceHTML_EN === "function" ? renderKeysReferenceHTML_EN : null,
    typeof renderKeysReferenceHTML_FR === "function" ? renderKeysReferenceHTML_FR : null,
    circleFilter
  );
  if (localized !== null) return localized;
  const keys = circleFilter === "all"
    ? KEYS_CIRCLE_DATA
    : circleFilter === "sharps-flats"
      ? KEYS_CIRCLE_DATA.filter(k => k.group === "sharp" || k.group === "flat")
      : KEYS_CIRCLE_DATA.filter(k => k.group === circleFilter);

  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Fundament</span>
        <span class="k-ratio-chip">Tonalität &amp; Vorzeichen</span>
      </div>
      <h4>Tonleiter vs. Tonart: Was macht eine Tonart aus?</h4>
      <p>
        Eine <strong>Tonleiter</strong> ist die reine Sortierung von Tönen nach ihrer Tonhöhe (z. B. C–D–E–F–G–A–H–C). Eine <strong>Tonart</strong> beschreibt dagegen das gesamte <em>musikalische Beziehungsgeflecht</em> rund um ein Zentrum: Sie legt fest, welcher Ton unser Ruhepol (<strong>Grundton / Tonika</strong>) ist, ob das Geschlecht <strong>Dur</strong> (große Terz, hell-offen) oder <strong>Moll</strong> (kleine Terz, ernst-tief) trägt und welche Töne durch <strong>Vorzeichen</strong> dauerhaft erhöht (♯) oder erniedrigt (♭) werden.
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Warum braucht es überhaupt Vorzeichen?</strong>
          Jede Dur-Tonleiter verlangt exakt dieselben Abstände: <code>G – G – H – G – G – G – H</code> (Halbtöne zwischen 3–4 und 7–8). Starten wir statt auf C auf <code>G</code>, sitzt der 7. Ton <code>F</code> einen Halbton zu tief – erst das Vorzeichen <code>Fis (♯)</code> stellt den echten Leitton her.
        </div>
        <div class="physics-fact-item">
          <strong>Generalvorzeichen vs. Versetzungszeichen</strong>
          <strong>Generalvorzeichen</strong> stehen direkt hinter dem Notenschlüssel und gelten fürs ganze Stück (bestimmen also die Tonart). Ein lokales <strong>Versetzungszeichen</strong> im Takt gilt nur bis zum nächsten Taktstrich und färbt nur vorübergehend ein.
        </div>
      </div>
    </article>

    <div class="k-sibling-bar">
      <span><strong>Visualisieren &amp; Anhören:</strong> Entdecke das interaktive Quintenzirkel-Rad mit Akkorden &amp; Modulationen.</span>
      <button type="button" class="btn-tool" data-jump-ref="circle-of-fifths">Zum Quintenzirkel →</button>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Die Logik des Quintenzirkels</span>
        <span class="k-ratio-chip">3:2 → 12 Zentren</span>
      </div>
      <h4>Warum sich alle 12 Tonarten im Kreis anordnen</h4>
      <p>
        Nach der Oktave (2:1) ist die <strong>reine Quinte (3:2)</strong> das stärkste akustische Verwandtschaftsverhältnis. Stapelt man immer neue Quinten übereinander (<code>C → G → D → A → E → H → Fis</code>), wandert man im <strong>Uhrzeigersinn</strong> des Quintenzirkels – bei jedem Schritt kommt ein einziges <strong>Kreuz (♯)</strong> hinzu. Wandert man rückwärts in Quarten (<code>C → F → B → Es → As → Des → Ges</code>), entsteht bei jedem Schritt ein neues <strong>Be (♭)</strong>.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Rechts herum: Kreuz-Tonarten (♯)</h5>
          <p><strong>Merkspruch Dur:</strong> <em>„Geh Du Alter Esel Hole Fisch“</em> (G, D, A, E, H, Fis).<br><strong>Reihenfolge der ♯:</strong> <code>fis – cis – gis – dis – ais – eis</code> (immer eine Quinte höher; das neueste ♯ ist stets der 7. Ton / Leitton!).</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Links herum: Be-Tonarten (♭)</h5>
          <p><strong>Merkspruch Dur:</strong> <em>„Frische Brötchen Essen Asse Des Gesangs“</em> (F, B, Es, As, Des, Ges).<br><strong>Reihenfolge der ♭:</strong> <code>b – es – as – des – ges – ces</code>. Trick: Das <strong>vorletzte ♭</strong> verrät direkt den Dur-Grundton!</p>
        </div>
      </div>
      <p class="k-tip"><strong>Pythagoreisches Komma &amp; Enharmonik:</strong> 12 reine Naturquinten (3:2) sind minimal höher als 7 Oktaven (ca. 23,46 Cent – das <em>Pythagoreische Komma</em>). Erst unsere heutige <strong>gleichstufige Stimmung</strong> verteilt diesen Winz-Fehler auf alle 12 Halbtöne, sodass <code>Fis-Dur</code> (6♯) und <code>Ges-Dur</code> (6♭) exakt denselben Tasten- und Klangort treffen.</p>
    </article>

    <div class="section-heading-row">
      <h2 class="section-heading">3. Der komplette Tonarten-Atlas</h2>
    </div>

    <div class="k-filter-row" aria-label="Tonarten nach Vorzeichen filtern">
      <button class="k-filter-pill ${circleFilter === "all" ? "active" : ""}" data-kfilter="all">Alle 12 Zentren</button>
      <button class="k-filter-pill ${circleFilter === "neutral" ? "active" : ""}" data-kfilter="neutral">C / a (0 Vz.)</button>
      <button class="k-filter-pill ${circleFilter === "sharp" ? "active" : ""}" data-kfilter="sharp">Kreuz (♯)</button>
      <button class="k-filter-pill ${circleFilter === "flat" ? "active" : ""}" data-kfilter="flat">Be (♭)</button>
    </div>

    <div class="knowledge-list">
      ${keys.map(k => `
        <article class="knowledge-card">
          <div class="k-card-top-row">
            <span class="k-card-tag ${k.group === "sharp" ? "tag-peach" : k.group === "flat" ? "tag-lilac" : "tag-sage"}">${k.sigBadge}</span>
            <span class="k-ratio-chip">${k.majorName} / ${k.minorName}</span>
          </div>
          <h4>${k.majorName} &amp; Parallele ${k.minorName}</h4>
          <p><strong>Vorzeichen:</strong> ${k.accidentalList}</p>
          <p><strong>Leitereigene Akkorde:</strong> <code>${k.chords}</code></p>
          <p class="k-tip">${k.instrumentTip}</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-key-cadence="${k.rootMidi}" data-key-mode="major">▶ Kadenz ${k.majorName.split(" ")[0]}</button>
            <button class="btn-tool" data-play-key-cadence="${k.minorMidi}" data-key-mode="minor">▶ ${k.minorName.split(" ")[0]} (Moll)</button>
          </div>
        </article>
      `).join("")}
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. Die 3 Moll-Varianten</span>
        <span class="k-ratio-chip">Warum Moll 3 Skalen hat</span>
      </div>
      <h4>Natürlich, Harmonisch &amp; Melodisch Moll (am Beispiel a-Moll)</h4>
      <p>
        Während Dur immer exakt eine Gestalt hat, arbeitet europäische Musik im Moll gleich mit drei Varianten. Der Grund ist der fehlende Halbton-Leitton von der 7. zur 8. Stufe im natürlichen Moll (<code>G → A</code> ist ein Ganzton und zieht schwächer als <code>Gis → A</code>):
      </p>
      <ul class="k-physics-list">
        <li><strong>Natürliches (Reines) Moll:</strong> Benutzt strikt die Vorzeichen der parallelen Dur-Tonart (<code>a-h-c-d-e-f-g-a</code>). Weich, archaisch, volksliedhaft.</li>
        <li><strong>Harmonisches Moll:</strong> Erhöht die 7. Stufe (<code>g → gis</code>), damit auf der V. Stufe eine echte <strong>Dur-Dominante (E7)</strong> entsteht. Zwischen <code>f</code> und <code>gis</code> entsteht ein typisch dramatischer Anderthalbtonschritt.</li>
        <li><strong>Melodisches Moll:</strong> Glättet diesen Sprung für geschmeidige Gesangs- und Basslinien, indem aufwärts auch die 6. Stufe erhöht wird (<code>f → fis, g → gis</code>); klassisch geht es abwärts meist natürlich zurück. Im Jazz bleibt die erhöhte Form fest stehen.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G4,A4" data-dur="0.45" data-step="320">▶ Natürlich a-Moll</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G#4,A4" data-dur="0.45" data-step="320">▶ Harmonisch a-Moll</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F#4,G#4,A4" data-dur="0.45" data-step="320">▶ Melodisch a-Moll</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Verwandtschaften &amp; Modulation</span>
        <span class="k-ratio-chip">Tonarten wechseln</span>
      </div>
      <h4>Wie Tonarten zusammenhängen und ineinander übergehen</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Paralleltonart (3 Halbtöne tiefer)</strong>
          Teilt exakt denselben Vorrat an Tönen und Vorzeichen: <code>C-Dur ↔ a-Moll</code>, <code>G-Dur ↔ e-Moll</code>. Der Übergang gelingt oft völlig unmerklich durch simple Schwerpunkt-Verlagerung.
        </div>
        <div class="physics-fact-item">
          <strong>Varianttonart (gleicher Grundton)</strong>
          Bleibt auf demselben Zentrum, wechselt aber Dur und Moll: <code>C-Dur ↔ c-Moll</code> (Unterschied: 3 Vorzeichen!). Starke emotionale Farbänderung (Aufhellung „Picardy Third“ oder Eintrübung).
        </div>
        <div class="physics-fact-item">
          <strong>Quintverwandtschaft (Nachbarn im Zirkel)</strong>
          Tonarten genau links oder rechts im Zirkel (<code>C-Dur ↔ G-Dur</code> oder <code>F-Dur</code>) unterscheiden sich in nur einem einzigen Ton. Über gemeinsame Akkorde (z. B. <code>Am</code>) gelingen fließende Umdeutungs-Modulationen.
        </div>
        <div class="physics-fact-item">
          <strong>Mediantik &amp; Direktrückung</strong>
          Sprünge um eine Terz (z. B. <code>C-Dur → As-Dur</code> oder <code>E-Dur</code>) tauschen viele Vorzeichen gleichzeitig aus und erzeugen Kinomagie. Eine <em>Rückung</em> (+1 oder +2 Halbtöne am Songende) steigert schlagartig Energie.
        </div>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-custom="key-variant">▶ Variant C ↔ c</button>
        <button class="btn-tool" data-play-custom="key-mediant">▶ Mediantik C → As → C</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">6. Transponierende Instrumente &amp; Klang</span>
        <span class="k-ratio-chip">Praxis im Ensemble</span>
      </div>
      <h4>Warum Bläser andere Tonarten lesen als das Klavier</h4>
      <p>
        Während Klavier, Gitarre, Geige oder Blockflöte <strong>in C (klingend)</strong> notieren, lesen viele Blasinstrumente transponiert, damit dieselbe Grifffolge auf unterschiedlich großen Bauformen denselben geschriebenen Ton bleibt:
      </p>
      <ul class="k-physics-list">
        <li><strong>B-Instrumente (Trompete, Klarinette, Tenorsaxophon):</strong> Ein geschriebenes <code>C</code> klingt wie ein klingendes <code>B (Bb)</code> – also eine große Sekunde tiefer. Klingt das Orchester in <code>B-Dur (2♭)</code>, liest der Trompeter bequem in <code>C-Dur (0 Vz.)</code>!</li>
        <li><strong>Es-Instrumente (Altsaxophon, Baritonsaxophon):</strong> Ein geschriebenes <code>C</code> klingt wie <code>Es (Eb)</code> (große Sexte tiefer). Für klingendes <code>Es-Dur (3♭)</code> liest das Altsaxophon entspanntes <code>C-Dur</code>.</li>
        <li><strong>F-Instrumente (Waldhorn, Englischhorn):</strong> Ein geschriebenes <code>C</code> klingt eine reine Quinte tiefer als <code>F</code>.</li>
      </ul>
      <p class="k-tip"><strong>Klangcharakter von Tonarten:</strong> Vor der modernen gleichstufigen Stimmung klang jede Tonart durch leicht ungleiche Terzen und Quinten merklich anders (<em>Des-Dur samtig-weich</em>, <em>D-Dur strahlend</em>). Heute sind alle 12 Tonarten rechnerisch exakt gleich – ihren speziellen Charakter prägen aber weiterhin <strong>Stimm- und Instrumentenlagen</strong> (leere Saiten, Resonanzen und gewohnte Voicings).</p>
    </article>
  `;
}

function renderSingAndPlayReferenceHTML() {
  const localized = resolveRegisteredKnowledgeRender(
    "singAndPlay",
    typeof renderSingAndPlayReferenceHTML_EN === "function" ? renderSingAndPlayReferenceHTML_EN : null,
    typeof renderSingAndPlayReferenceHTML_FR === "function" ? renderSingAndPlayReferenceHTML_FR : null
  );
  if (localized !== null) return localized;
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">1. Das Prinzip hinter der Koordination</span>
        <span class="k-ratio-chip">Autopilot &amp; Fokus</span>
      </div>
      <h4>Warum gleichzeitiges Singen &amp; Spielen anfangs stolpert</h4>
      <p>
        Sobald du spielst und singst, teilen sich zwei völlig verschiedene Systeme denselben Takt: deine <strong>Hände</strong> (Feinmotorik, Griffwechsel, Anschlag) und deine <strong>Stimme</strong> (Atmung, Tonhöhe, Text). Unser Arbeitsgedächtnis kann aber keine zwei <em>neuen</em> Abläufe gleichzeitig bewusst steuern.
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Mindestens ein System auf Autopilot</strong>
          Immer wenn sich beide Stimmen „beißen“, denkt das Gehirn noch aktiv über beide nach. Lösung: Erst die Begleitung (oder erst den Gesang) so weit verinnerlichen, bis sie automatisch läuft wie Treppensteigen.
        </div>
        <div class="physics-fact-item">
          <strong>Rhythmus vor Tonhöhe trennen</strong>
          90 % aller Aussetzer sind rhythmischer Natur, keine falschen Töne! Sobald eine Silbe zwischen zwei Anschlägen liegt, stockt die Hand – außer das Timing wurde getrennt verknüpft.
        </div>
        <div class="physics-fact-item">
          <strong>Erst summen auf „La“ oder „Du“</strong>
          Liedtext bindet enorm viel Sprach-Rechenleistung. Wenn du eine Passage erst auf eine einzelne Silbe summst, bleibt volle Aufmerksamkeit für Intonation und Groove übrig.
        </div>
        <div class="physics-fact-item">
          <strong>Gemeinsamer Puls im Körper</strong>
          Ein sanft wippender Fuß oder ein inneres Metronom dient als gemeinsamer Dirigent – nicht die Stimme orientiert sich an der Hand oder umgekehrt, sondern <em>beide</em> am Puls.
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Effektiv üben in 5 Schritten</span>
        <span class="k-ratio-chip">Praxis-Methode</span>
      </div>
      <h4>Die bewährte 5-Schritte-Methode für jeden Song</h4>
      <p>
        Statt einen ganzen Song immer wieder von vorn zu probieren und jedes Mal an derselben Stelle zu stolpern, zerlege das Zusammenspiel kurz in fünf klare Stufen:
      </p>
      <ul class="article-steps-list">
        <li>
          <strong>1. Der Gesprächs-Test (Hand automatisieren):</strong> Spiele nur das Begleitmuster 1–2 Minuten am Stück, bis du dabei locker bis 20 zählen oder ein kurzes Gespräch führen kannst. Hakt die Hand beim Sprechen, braucht zuerst das Instrument allein noch 5 Minuten Ruhe.
        </li>
        <li>
          <strong>2. Rhythmus sprechen statt singen:</strong> Spiele deine Akkorde durch und <strong>sprich den Text im exakten Rhythmus</strong> auf einer bequemen Sprechtonhöhe dazu. Ohne Melodie-Ballast spürst du sofort, welche Silben auf und zwischen den Schlägen sitzen.
        </li>
        <li>
          <strong>3. Ankerpunkte markieren („Silbe trifft Schlag“):</strong> Schreibe oder denke dir klare Kopplungspunkte: <em>„Auf ‚Nacht‘ greife ich den Bass-Ton“</em> oder <em>„Die Silbe ‚frei‘ kommt genau auf dem Upstroke zwischen 2 und 3“</em>. Gehirne lernen über präzise Treffpunkte!
        </li>
        <li>
          <strong>4. Begleitung radikal vereinfachen &amp; 1-Takt-Loops bauen:</strong> Spiele zuerst nur <strong>einen einzigen Akkord auf Zählzeit 1</strong> und singe die Phrase komplett darüber. Erst wenn das mühelos gelingt, kommt Zählzeit 3 dazu, später das volle Anschlag-/Zupfmuster – stets nur über 1–2 Takte im Loop!
        </li>
        <li>
          <strong>5. Zeitlupe (60 %) &amp; „Ghost-Singing“:</strong> Halbiere das Tempo. Bei kniffligen Gesangseinsätzen denke die Melodie einen Durchlauf lang nur stumm im Kopf mit, summe sie im nächsten leise und singe dann frei darüber.
        </li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">3. Konkrete Übungen für den Alltag</span>
        <span class="k-ratio-chip">Direkt nachmachen</span>
      </div>
      <h4>6 gezielte Koordinations- &amp; Unabhängigkeits-Übungen</h4>
      <p>
        Schon 5 bis 8 Minuten mit ein oder zwei dieser Übungen vor deinem eigentlichen Song wirken spürbar schneller als stumpfes Wiederholen:
      </p>
      <ul class="k-physics-list">
        <li>
          <strong>Übung 1 – Der Reden- &amp; Zähl-Check:</strong> Spiele eine einfache Kadenz (<code>I – V – vi – IV</code>) im gleichmäßigen Schlag- oder Klaviermuster und lies dabei laut ein paar Zeilen oder zähle rückwärts von 20 bis 1. Ziel: Der Groove darf keinen Millimeter wackeln.
        </li>
        <li>
          <strong>Übung 2 – Eins-Akkord-Anker:</strong> Schlag jeden Akkord genau ein einziges Mal auf Zählzeit 1 an (als ganze Note) und singe deine Strophe frei auf die liegende Resonanz. Das gibt dir Raum für Ausdruck, Atmung und exakte Akkordwechsel ohne Zeitdruck.
        </li>
        <li>
          <strong>Übung 3 – Stehender Grundton (Drone-Training):</strong> Halte auf deinem Instrument nur den offenen Grundton/die Quinte (<code>C3 + G3</code>) fest und singe eine kleine Melodie oder Intervalle darüber. Perfekt, um Stimmsicherheit ohne Griffwechsel-Ablenkung zu eichen.
        </li>
        <li>
          <strong>Übung 4 – Die Vorzieher- &amp; Offbeat-Übung („4-und“-Falle):</strong> Im Pop und Soul setzt die Stimme oft einen halben Schlag <em>vor</em> der 1 ein (auf <code>4-und</code>), während Gitarre oder Klavier exakt auf der 1 wechseln. Klopfe gerade Viertel und sprich oder singe gezielt nur Phrasen, die auf „und“ starten.
        </li>
        <li>
          <strong>Übung 5 – Wandernder Bass vs. gehaltener Sington:</strong> Spiele im Bass eine ruhige Folge (z. B. <code>C – F – G – C</code>), während deine Stimme die ganze Zeit denselben gemeinsamen Ankerton (<code>G</code>, die Quinte von C) stabil hält – oder umgekehrt einen einzigen Akkord halten und dazu Tonleitertöne hoch und runter singen.
        </li>
        <li>
          <strong>Übung 6 – Die 20-Sekunden-Handyaufnahme:</strong> Nimm genau einen kurzen Loop mit dem Smartphone auf. Beim Zurückhören entlarvst du sofort Stellen, an denen ein Schlag heimlich verschluckt wird oder ein Einsatz verrutscht.
        </li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Übung 1: Kadenz zum Mitsprechen</button>
        <button class="btn-tool" data-play-custom="sp-drone">▶ Übung 3: Drone + Melodie</button>
        <button class="btn-tool" data-play-custom="sp-syncopation">▶ Übung 4: Puls vs. Vorzieher</button>
        <button class="btn-tool" data-play-custom="sp-poly">▶ Übung 5: Bass wandert, Ton bleibt</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. Instrument-Tipps &amp; Stolperfallen</span>
        <span class="k-ratio-chip">Gitarre, Klavier &amp; Stimme</span>
      </div>
      <h4>Worauf es je nach Instrument besonders ankommt</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Gitarre: Das Pendel-Gesetz</strong>
          Deine Schlaghand ist ein mechanisches Pendel (<em>Ab – Auf – Ab – Auf</em>): Auch bei Gesangspausen oder Synkopen schwingt der Unterarm gleichmäßig im Raster durch – du lässt Saiten nur gezielt aus, statt anzuhalten.
        </div>
        <div class="physics-fact-item">
          <strong>Klavier: Schichtenweise aufbauen</strong>
          Beginne nur mit <em>linker Hand (Grundton auf 1) + Singen</em>. Nimm dann ruhige Dreiklänge der Rechten auf 1 und 3 hinzu. Komplexe Achtel-Grooves oder Gegenmelodien kommen ganz zum Schluss.
        </div>
        <div class="physics-fact-item">
          <strong>Die richtige Tonart wählen</strong>
          Musst du um hohe Töne kämpfen, bricht sofort die Handkoordination weg. Scheue dich nie vor einem <strong>Kapodaster</strong> oder Transponieren um ±2 Halbtöne, damit deine Stimme entspannt trägt.
        </div>
        <div class="physics-fact-item">
          <strong>Atempausen fest einkomponieren</strong>
          Oft stolpert man nicht am Takt <em>in</em> einer Zeile, sondern vor dem Einsatz der nächsten. Plane eine bewusste Viertel-Atmungs-Pause vor dem Refrain ein, während das Instrument sicher weiterträgt.
        </div>
      </div>
      <p class="k-tip"><strong>Lauscher-Tipp für zwischendurch:</strong> Kombiniere in Lauscher das Modul <strong>Solfège</strong> oder <strong>Melodien</strong> bewusst damit, den gesuchten Zielton zuerst laut zu singen, bevor du tippst – so verknüpfen Ohr, Stimme und Griff direkt im Alltag.</p>
    </article>
  `;
}

function getLocalizedIntervalEncyclopedia() {
  const list = pickLocalizedKnowledgeData(
    INTERVAL_ENCYCLOPEDIA,
    typeof INTERVAL_ENCYCLOPEDIA_EN !== "undefined" ? INTERVAL_ENCYCLOPEDIA_EN : undefined,
    typeof INTERVAL_ENCYCLOPEDIA_FR !== "undefined" ? INTERVAL_ENCYCLOPEDIA_FR : undefined,
    "intervalEncyclopedia"
  );
  if (typeof formatIntervalSymbol !== "function") return list;
  return list.map(item => ({ ...item, symbol: formatIntervalSymbol(item.symbol || item.key) }));
}

function getLocalizedIntervalNamingGuideHTML() {
  const localized = resolveRegisteredKnowledgeRender(
    "intervalNamingGuide",
    typeof getIntervalNamingGuideHTML_EN === "function" ? getIntervalNamingGuideHTML_EN : null,
    typeof getIntervalNamingGuideHTML_FR === "function" ? getIntervalNamingGuideHTML_FR : null
  );
  if (localized !== null) return localized;
  const sym = k => (typeof formatIntervalSymbol === "function" ? formatIntervalSymbol(k) : k);
  const useGerman = typeof state !== "undefined" ? state?.profile?.intervalNotation !== "intl" : true;
  const activeSchemeLabel = useGerman ? "Aktiv: P / G / k" : "Aktiv: P / M / m";
  return `
    <details class="knowledge-card k-accordion" id="intervalNamingGuideAccordion" open>
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">Systematik &amp; Kürzel</span>
            <span class="k-ratio-chip">${activeSchemeLabel}</span>
          </div>
          <h4>Wie Intervalle benannt werden (Buchstabe + Zahl)</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <p>Jedes Intervall-Kürzel verrät dir zwei Dinge auf einmal: Die <strong>Zahl</strong> benennt den Schritt in der Tonleiter, der <strong>Buchstabe</strong> davor gibt die exakte Größe in Halbtönen an.</p>
        <ul class="k-physics-list">
          <li><strong>1. Die Zahl (<code>1</code>–<code>9</code>) zählt die Stammton-Schritte:</strong> Von <code>1</code> = Prime (selber Ton), <code>2</code> = Sekunde, <code>3</code> = Terz, <code>4</code> = Quarte, <code>5</code> = Quinte, <code>6</code> = Sexte, <code>7</code> = Septime, <code>8</code> = Oktave bis <code>9</code> = None.</li>
          <li><strong>2. Reine Intervalle (<code>P</code> = <em>Perfect</em>):</strong> <code>P1</code>, <code>P4</code>, <code>P5</code> und <code>P8</code> gibt es nur einmal – sie schwingen in einfachen Zahlenverhältnissen ohne „groß“ oder „klein“.</li>
          <li><strong>3. Große &amp; kleine Intervalle (<code>2</code>, <code>3</code>, <code>6</code>, <code>7</code>, <code>9</code>):</strong> Diese fünf Intervalle existieren jeweils in zwei Varianten mit genau <strong>1 Halbton Unterschied</strong>:<br>
            – <strong>Deutsch (<code>P / G / k</code>):</strong> großes <strong><code>G</code></strong> (<em>Groß</em>) für die weitere/hellere Form, kleines <strong><code>k</code></strong> (<em>klein</em>) für die einen Halbton engere Form (z. B. <code>G2</code> vs. <code>k2</code>, <code>G3</code> vs. <code>k3</code>).<br>
            – <strong>International (<code>P / M / m</code>):</strong> großes <strong><code>M</code></strong> (<em>Major</em>) vs. kleines <strong><code>m</code></strong> (<em>minor</em>) – hier entscheidet allein Groß- vs. Kleinschreibung über 1 Halbton und einen völlig anderen Charakter!</li>
          <li><strong>4. Tritonus (<code>TT</code>):</strong> Teilt die Oktave exakt bei <strong>6 Halbtönen</strong> zwischen <code>P4</code> und <code>P5</code> (übermäßige Quarte / verminderte Quinte).</li>
        </ul>
        <div class="k-meta-box">
          <div><strong>Aktive Schreibweise:</strong> Sekunde: <code>${sym("m2")}</code> (1 HT) vs. <code>${sym("M2")}</code> (2 HT) · Terz: <code>${sym("m3")}</code> (3 HT) vs. <code>${sym("M3")}</code> (4 HT)</div>
          <div><strong>Umschalten:</strong> In den <strong>App-Einstellungen → Musikalische Schreibweise → Intervall-Namensgebung</strong> kannst du jederzeit zwischen <strong>Deutsch (P / G / k)</strong> und <strong>International (P / M / m)</strong> wechseln.</div>
        </div>
      </div>
    </details>
  `;
}

function getLocalizedCadenceEncyclopedia() {
  return pickLocalizedKnowledgeData(
    CADENCE_ENCYCLOPEDIA,
    typeof CADENCE_ENCYCLOPEDIA_EN !== "undefined" ? CADENCE_ENCYCLOPEDIA_EN : undefined,
    typeof CADENCE_ENCYCLOPEDIA_FR !== "undefined" ? CADENCE_ENCYCLOPEDIA_FR : undefined,
    "cadenceEncyclopedia"
  );
}

function getLocalizedSolfegeSteps() {
  return pickLocalizedKnowledgeData(
    SOLFEGE_STEPS,
    typeof SOLFEGE_STEPS_EN !== "undefined" ? SOLFEGE_STEPS_EN : undefined,
    typeof SOLFEGE_STEPS_FR !== "undefined" ? SOLFEGE_STEPS_FR : undefined,
    "solfegeSteps"
  );
}

function getLocalizedKnowledgeArticles() {
  return pickLocalizedKnowledgeData(
    KNOWLEDGE_ARTICLES,
    typeof KNOWLEDGE_ARTICLES_EN !== "undefined" ? KNOWLEDGE_ARTICLES_EN : undefined,
    typeof KNOWLEDGE_ARTICLES_FR !== "undefined" ? KNOWLEDGE_ARTICLES_FR : undefined,
    "knowledgeArticles"
  );
}

function getLocalizedPhysicsWaveExplanation(key) {
  const map = pickLocalizedKnowledgeData(
    PHYSICS_WAVE_EXPLANATIONS,
    typeof PHYSICS_WAVE_EXPLANATIONS_EN !== "undefined" ? PHYSICS_WAVE_EXPLANATIONS_EN : undefined,
    typeof PHYSICS_WAVE_EXPLANATIONS_FR !== "undefined" ? PHYSICS_WAVE_EXPLANATIONS_FR : undefined,
    "physicsWaveExplanations"
  );
  return (map && map[key]) || PHYSICS_WAVE_EXPLANATIONS[key] || "";
}

function getLocalizedPhysicsOvertones() {
  return pickLocalizedKnowledgeData(
    PHYSICS_OVERTONES,
    typeof PHYSICS_OVERTONES_EN !== "undefined" ? PHYSICS_OVERTONES_EN : undefined,
    typeof PHYSICS_OVERTONES_FR !== "undefined" ? PHYSICS_OVERTONES_FR : undefined,
    "physicsOvertones"
  );
}

function getLocalizedCategoryHelpGuide(categoryKey) {
  const map = pickLocalizedKnowledgeData(
    CATEGORY_HELP_GUIDES,
    typeof CATEGORY_HELP_GUIDES_EN !== "undefined" ? CATEGORY_HELP_GUIDES_EN : undefined,
    typeof CATEGORY_HELP_GUIDES_FR !== "undefined" ? CATEGORY_HELP_GUIDES_FR : undefined,
    "categoryHelpGuides"
  );
  const guide = (map && map[categoryKey]) || CATEGORY_HELP_GUIDES[categoryKey] || null;
  if (!guide || categoryKey !== "interval" || typeof formatIntervalSymbol !== "function") {
    return guide;
  }
  const m3 = formatIntervalSymbol("M3");
  const m9 = formatIntervalSymbol("M9");
  return {
    ...guide,
    sections: guide.sections
      .replace("große Terz (<code>M3</code>)", `große Terz (<code>${m3}</code>)`)
      .replace("großen None (<code>M9</code>)", `großen None (<code>${m9}</code>)`)
      .replace("Major 3rd (<code>M3</code>)", `Major 3rd (<code>${m3}</code>)`)
      .replace("Major 9th (<code>M9</code>)", `Major 9th (<code>${m9}</code>)`)
      .replace("Tierce majeure (<code>M3</code>)", `Tierce majeure (<code>${m3}</code>)`)
      .replace("Neuvième majeure (<code>M9</code>)", `Neuvième majeure (<code>${m9}</code>)`)
      .replace("Велика терція (<code>M3</code>)", `Велика терція (<code>${m3}</code>)`)
      .replace("Великої нони (<code>M9</code>)", `Великої нони (<code>${m9}</code>)`)
  };
}

function getLocalizedRhythmInstrumentsData() {
  return pickLocalizedKnowledgeData(
    RHYTHM_INSTRUMENTS_DATA,
    typeof RHYTHM_INSTRUMENTS_DATA_EN !== "undefined" ? RHYTHM_INSTRUMENTS_DATA_EN : undefined,
    typeof RHYTHM_INSTRUMENTS_DATA_FR !== "undefined" ? RHYTHM_INSTRUMENTS_DATA_FR : undefined,
    "rhythmInstruments"
  );
}

function getLocalizedInstrumentModule(refKey) {
  const map = pickLocalizedKnowledgeData(
    INSTRUMENT_MODULES_DATA,
    typeof INSTRUMENT_MODULES_DATA_EN !== "undefined" ? INSTRUMENT_MODULES_DATA_EN : undefined,
    typeof INSTRUMENT_MODULES_DATA_FR !== "undefined" ? INSTRUMENT_MODULES_DATA_FR : undefined,
    "instrumentModules"
  );
  return (map && map[refKey]) || INSTRUMENT_MODULES_DATA[refKey] || null;
}

function getLocalizedModesEncyclopedia() {
  return pickLocalizedKnowledgeData(
    MODES_ENCYCLOPEDIA,
    typeof MODES_ENCYCLOPEDIA_EN !== "undefined" ? MODES_ENCYCLOPEDIA_EN : undefined,
    typeof MODES_ENCYCLOPEDIA_FR !== "undefined" ? MODES_ENCYCLOPEDIA_FR : undefined,
    "modesEncyclopedia"
  );
}

function getLocalizedKeysCircleData() {
  return pickLocalizedKnowledgeData(
    KEYS_CIRCLE_DATA,
    typeof KEYS_CIRCLE_DATA_EN !== "undefined" ? KEYS_CIRCLE_DATA_EN : undefined,
    typeof KEYS_CIRCLE_DATA_FR !== "undefined" ? KEYS_CIRCLE_DATA_FR : undefined,
    "keysCircleData"
  );
}

/**
 * Interaktiver Quintenzirkel (12 Positionen im Uhrzeigersinn, startend bei C / a-Moll auf 12 Uhr)
 */
const CIRCLE_OF_FIFTHS_WHEEL = [
  {
    idx: 0, rootKey: "C", sigShort: "0", sigDe: "0 Vorzeichen", sigEn: "0 Sharps / Flats",
    wheelMajorDe: "C", wheelMajorIntl: "C", wheelMinorDe: "a", wheelMinorIntl: "Am",
    minorDe: "a-Moll", minorIntl: "a-Moll", minorEn: "A Minor",
    rootMidi: 60, minorMidi: 57,
    notesDe: ["C", "D", "E", "F", "G", "A", "H"],
    notesIntl: ["C", "D", "E", "F", "G", "A", "B"],
    enharmonicDe: "", enharmonicEn: "",
    accDe: "Keine Kreuz- oder Be-Vorzeichen (nur weiße Tasten am Klavier)",
    accEn: "No sharps or flats (white keys only)",
    trickDe: "12-Uhr-Nullpunkt des Zirkels: Alle Stammton-Intervalle bilden den Ausgangspunkt für jede andere Tonart.",
    trickEn: "12 o'clock anchor of the wheel: pure natural pitches with zero accidentals.",
    vibeDe: "Offen, neutral, ideal für Einstieg, Chor & klassische Etüden.",
    vibeEn: "Clear, neutral reference key for piano, vocals & sight-reading."
  },
  {
    idx: 1, rootKey: "G", sigShort: "1♯", sigDe: "1 Kreuz (♯)", sigEn: "1 Sharp (♯)",
    wheelMajorDe: "G", wheelMajorIntl: "G", wheelMinorDe: "e", wheelMinorIntl: "Em",
    minorDe: "e-Moll", minorIntl: "e-Moll", minorEn: "E Minor",
    rootMidi: 55, minorMidi: 64,
    notesDe: ["G", "A", "H", "C", "D", "E", "Fis"],
    notesIntl: ["G", "A", "B", "C", "D", "E", "F#"],
    enharmonicDe: "", enharmonicEn: "",
    accDe: "1♯: fis (Leitton zu G)",
    accEn: "1♯: F♯ (leading tone to G)",
    trickDe: "Letztes Kreuz (fis) + 1 Halbton nach oben = G-Dur.",
    trickEn: "Last sharp (F♯) + one half step up = G Major.",
    vibeDe: "Beliebt auf Akustikgitarre, Streichern & im Folk/Pop.",
    vibeEn: "Open & resonant for acoustic guitar, strings & folk/pop."
  },
  {
    idx: 2, rootKey: "D", sigShort: "2♯", sigDe: "2 Kreuze (♯)", sigEn: "2 Sharps (♯)",
    wheelMajorDe: "D", wheelMajorIntl: "D", wheelMinorDe: "h", wheelMinorIntl: "Bm",
    minorDe: "h-Moll", minorIntl: "b-Moll", minorEn: "B Minor",
    rootMidi: 62, minorMidi: 59,
    notesDe: ["D", "E", "Fis", "G", "A", "H", "Cis"],
    notesIntl: ["D", "E", "F#", "G", "A", "B", "C#"],
    enharmonicDe: "", enharmonicEn: "",
    accDe: "2♯: fis, cis",
    accEn: "2♯: F♯, C♯",
    trickDe: "Das letzte Kreuz ist cis → einen Halbton höher liegt D-Dur.",
    trickEn: "Last sharp is C♯ → one half step higher sits D Major.",
    vibeDe: "Strahlende Streicher-, Rock- & Festmusik-Tonart.",
    vibeEn: "Bright string, rock & celebratory orchestral key."
  },
  {
    idx: 3, rootKey: "A", sigShort: "3♯", sigDe: "3 Kreuze (♯)", sigEn: "3 Sharps (♯)",
    wheelMajorDe: "A", wheelMajorIntl: "A", wheelMinorDe: "fis", wheelMinorIntl: "F#m",
    minorDe: "fis-Moll", minorIntl: "f#-Moll", minorEn: "F♯ Minor",
    rootMidi: 57, minorMidi: 54,
    notesDe: ["A", "H", "Cis", "D", "E", "Fis", "Gis"],
    notesIntl: ["A", "B", "C#", "D", "E", "F#", "G#"],
    enharmonicDe: "", enharmonicEn: "",
    accDe: "3♯: fis, cis, gis",
    accEn: "3♯: F♯, C♯, G♯",
    trickDe: "Letztes Kreuz = gis → Halbton höher = A-Dur.",
    trickEn: "Last sharp = G♯ → half step up = A Major.",
    vibeDe: "Warm & brillant auf Gitarre, Violine und Gesangsstimmen.",
    vibeEn: "Warm, radiant key for guitar riffs & soaring vocals."
  },
  {
    idx: 4, rootKey: "E", sigShort: "4♯", sigDe: "4 Kreuze (♯)", sigEn: "4 Sharps (♯)",
    wheelMajorDe: "E", wheelMajorIntl: "E", wheelMinorDe: "cis", wheelMinorIntl: "C#m",
    minorDe: "cis-Moll", minorIntl: "c#-Moll", minorEn: "C♯ Minor",
    rootMidi: 64, minorMidi: 61,
    notesDe: ["E", "Fis", "Gis", "A", "H", "Cis", "Dis"],
    notesIntl: ["E", "F#", "G#", "A", "B", "C#", "D#"],
    enharmonicDe: "", enharmonicEn: "",
    accDe: "4♯: fis, cis, gis, dis",
    accEn: "4♯: F♯, C♯, G♯, D♯",
    trickDe: "Letztes Kreuz = dis → Halbton höher = E-Dur.",
    trickEn: "Last sharp = D♯ → half step up = E Major.",
    vibeDe: "Kräftige Gitarren- & Blues/Rock-Heimat (tiefe leere E-Saite).",
    vibeEn: "Classic electric guitar, blues & rock territory."
  },
  {
    idx: 5, rootKey: "B", sigShort: "5♯", sigDe: "5 Kreuze (♯) / 7♭", sigEn: "5 Sharps (♯) / 7♭",
    wheelMajorDe: "H", wheelMajorIntl: "B", wheelMinorDe: "gis", wheelMinorIntl: "G#m",
    minorDe: "gis-Moll", minorIntl: "g#-Moll", minorEn: "G♯ Minor",
    rootMidi: 59, minorMidi: 56,
    notesDe: ["H", "Cis", "Dis", "E", "Fis", "Gis", "Ais"],
    notesIntl: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
    enharmonicDe: "Enharmonisch: Ces-Dur (7♭) / as-Moll", enharmonicEn: "Enharmonic: C♭ Major (7♭) / A♭ Minor",
    accDe: "5♯: fis, cis, gis, dis, ais",
    accEn: "5♯: F♯, C♯, G♯, D♯, A♯",
    trickDe: "Letztes Kreuz = ais → Halbton höher = H-Dur (Intl: B Major).",
    trickEn: "Last sharp = A♯ → half step up = B Major.",
    vibeDe: "Nutzt am Klavier alle 5 schwarzen Tasten – überraschend griffig!",
    vibeEn: "Fits the hand naturally at the piano (uses all 5 black keys)."
  },
  {
    idx: 6, rootKey: "F#", sigShort: "6♯/♭", sigDe: "6 Kreuze / 6 Be", sigEn: "6 Sharps / 6 Flats",
    wheelMajorDe: "Fis/Ges", wheelMajorIntl: "F#/Gb", wheelMinorDe: "dis/es", wheelMinorIntl: "D#m/Ebm",
    minorDe: "dis- / es-Moll", minorIntl: "d#- / eb-Moll", minorEn: "D♯ / E♭ Minor",
    rootMidi: 54, minorMidi: 63,
    notesDe: ["Fis", "Gis", "Ais", "H", "Cis", "Dis", "Eis"],
    notesIntl: ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
    enharmonicDe: "6-Uhr-Brücke: Fis-Dur (6♯) klingt exakt wie Ges-Dur (6♭: Ges–As–B–Ces–Des–Es–F).",
    enharmonicEn: "6 o'clock enharmonic bridge: F♯ Major (6♯) sounds identical to G♭ Major (6♭: G♭–A♭–B♭–C♭–D♭–E♭–F).",
    accDe: "6♯: fis, cis, gis, dis, ais, eis  (bzw. 6♭: b, es, as, des, ges, ces)",
    accEn: "6♯: F♯, C♯, G♯, D♯, A♯, E♯  (or 6♭: B♭, E♭, A♭, D♭, G♭, C♭)",
    trickDe: "Direkt gegenüber von C-Dur (Tritonus-Gegenpol!): Ab hier sind Be-Vorzeichen im Alltag meist bequemer zu lesen.",
    trickEn: "Directly opposite C Major (Tritone Pole!): beyond this point flat spellings are usually easier to read.",
    vibeDe: "Schillernder, schwebender Klang (viele Soul-, Gospel- & Impressionismus-Stücke).",
    vibeEn: "Lush, shimmering color heard in gospel, R&B & impressionism."
  },
  {
    idx: 7, rootKey: "Db", sigShort: "5♭", sigDe: "5 Be (♭) / 7♯", sigEn: "5 Flats (♭) / 7♯",
    wheelMajorDe: "Des", wheelMajorIntl: "Db", wheelMinorDe: "b", wheelMinorIntl: "Bbm",
    minorDe: "b-Moll", minorIntl: "bb-Moll", minorEn: "B♭ Minor",
    rootMidi: 61, minorMidi: 58,
    notesDe: ["Des", "Es", "F", "Ges", "As", "B", "C"],
    notesIntl: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
    enharmonicDe: "Enharmonisch: Cis-Dur (7♯) / ais-Moll", enharmonicEn: "Enharmonic: C♯ Major (7♯) / A♯ Minor",
    accDe: "5♭: b, es, as, des, ges",
    accEn: "5♭: B♭, E♭, A♭, D♭, G♭",
    trickDe: "Das vorletzte Be heißt des → Des-Dur!",
    trickEn: "Second-to-last flat is D♭ → D♭ Major!",
    vibeDe: "Samtig-warme Klangfarbe; Favorit für Jazzballaden & romantisches Klavier.",
    vibeEn: "Velvety, romantic tone loved by jazz pianists & ballad singers."
  },
  {
    idx: 8, rootKey: "Ab", sigShort: "4♭", sigDe: "4 Be (♭)", sigEn: "4 Flats (♭)",
    wheelMajorDe: "As", wheelMajorIntl: "Ab", wheelMinorDe: "f", wheelMinorIntl: "Fm",
    minorDe: "f-Moll", minorIntl: "f-Moll", minorEn: "F Minor",
    rootMidi: 56, minorMidi: 53,
    notesDe: ["As", "B", "C", "Des", "Es", "F", "G"],
    notesIntl: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
    enharmonicDe: "", enharmonicEn: "",
    accDe: "4♭: b, es, as, des",
    accEn: "4♭: B♭, E♭, A♭, D♭",
    trickDe: "Vorletztes Be = as → As-Dur.",
    trickEn: "Second-to-last flat = A♭ → A♭ Major.",
    vibeDe: "Weich & kraftvoll zugleich – Standard für Jazz-Standards & Bläser.",
    vibeEn: "Smooth & rich — a staple of jazz standards, soul & wind bands."
  },
  {
    idx: 9, rootKey: "Eb", sigShort: "3♭", sigDe: "3 Be (♭)", sigEn: "3 Flats (♭)",
    wheelMajorDe: "Es", wheelMajorIntl: "Eb", wheelMinorDe: "c", wheelMinorIntl: "Cm",
    minorDe: "c-Moll", minorIntl: "c-Moll", minorEn: "C Minor",
    rootMidi: 63, minorMidi: 60,
    notesDe: ["Es", "F", "G", "As", "B", "C", "D"],
    notesIntl: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
    enharmonicDe: "", enharmonicEn: "",
    accDe: "3♭: b, es, as",
    accEn: "3♭: B♭, E♭, A♭",
    trickDe: "Vorletztes Be = es → Es-Dur.",
    trickEn: "Second-to-last flat = E♭ → E♭ Major.",
    vibeDe: "Heroisch-edel (Beethoven Eroica), Heimat für Altsaxophon & Horn.",
    vibeEn: "Noble, resonant key for brass, alto sax & orchestral drama."
  },
  {
    idx: 10, rootKey: "Bb", sigShort: "2♭", sigDe: "2 Be (♭)", sigEn: "2 Flats (♭)",
    wheelMajorDe: "B", wheelMajorIntl: "Bb", wheelMinorDe: "g", wheelMinorIntl: "Gm",
    minorDe: "g-Moll", minorIntl: "g-Moll", minorEn: "G Minor",
    rootMidi: 58, minorMidi: 55,
    notesDe: ["B", "C", "D", "Es", "F", "G", "A"],
    notesIntl: ["Bb", "C", "D", "Eb", "F", "G", "A"],
    enharmonicDe: "", enharmonicEn: "",
    accDe: "2♭: b, es",
    accEn: "2♭: B♭, E♭",
    trickDe: "Vorletztes Be = b (Intl: Bb) → B-Dur (Bb Major).",
    trickEn: "Second-to-last flat = B♭ → B♭ Major.",
    vibeDe: "Die Top-Tonart für Bigband, Trompete, Klarinette & Modern Jazz.",
    vibeEn: "First-call key for big band, trumpet, clarinet & modern jazz."
  },
  {
    idx: 11, rootKey: "F", sigShort: "1♭", sigDe: "1 Be (♭)", sigEn: "1 Flat (♭)",
    wheelMajorDe: "F", wheelMajorIntl: "F", wheelMinorDe: "d", wheelMinorIntl: "Dm",
    minorDe: "d-Moll", minorIntl: "d-Moll", minorEn: "D Minor",
    rootMidi: 53, minorMidi: 62,
    notesDe: ["F", "G", "A", "B", "C", "D", "E"],
    notesIntl: ["F", "G", "A", "Bb", "C", "D", "E"],
    enharmonicDe: "", enharmonicEn: "",
    accDe: "1♭: b (das H wird um einen Halbton zu B erniedrigt)",
    accEn: "1♭: B♭ (B natural lowered to B♭)",
    trickDe: "Merksatz für die einzige Tonart mit 1♭: Ein einzelnes Be ergibt stets F-Dur.",
    trickEn: "Only one flat to memorize solo: a single B♭ always means F Major.",
    vibeDe: "Warm-pastoral; sehr beliebt für Chöre, Hörner & Akustik-Balladen.",
    vibeEn: "Warm, pastoral key favored by choirs, horns & folk ballads."
  }
];

function polarToCartesianCircle(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function buildCircleWedgeArcPath(cx, cy, rInner, rOuter, startDeg, endDeg) {
  const p0 = polarToCartesianCircle(cx, cy, rOuter, startDeg);
  const p1 = polarToCartesianCircle(cx, cy, rOuter, endDeg);
  const p2 = polarToCartesianCircle(cx, cy, rInner, endDeg);
  const p3 = polarToCartesianCircle(cx, cy, rInner, startDeg);
  return `M${p0.x.toFixed(2)},${p0.y.toFixed(2)} A${rOuter},${rOuter} 0 0 1 ${p1.x.toFixed(2)},${p1.y.toFixed(2)} L${p2.x.toFixed(2)},${p2.y.toFixed(2)} A${rInner},${rInner} 0 0 0 ${p3.x.toFixed(2)},${p3.y.toFixed(2)} Z`;
}

const CIRCLE_OF_FIFTHS_FR_DATA = {
  "C": {
    sigFr: "0 altération",
    majorFr: "Do majeur",
    minorFr: "La mineur",
    enharmonicFr: "",
    accFr: "Aucun dièse ni bémol (uniquement les touches blanches au piano)",
    trickFr: "Point zéro à midi du cycle : toutes les notes naturelles servent de référence.",
    vibeFr: "Ouvert, neutre, idéal pour débuter, en chœur et en lecture."
  },
  "G": {
    sigFr: "1 dièse (♯)",
    majorFr: "Sol majeur",
    minorFr: "Mi mineur",
    enharmonicFr: "",
    accFr: "1♯ : Fa♯ (note sensible vers Sol)",
    trickFr: "Dernier dièse (Fa♯) + 1 demi-ton au-dessus = Sol majeur.",
    vibeFr: "Ouvert et résonant à la guitare acoustique, aux cordes et en folk/pop."
  },
  "D": {
    sigFr: "2 dièses (♯)",
    majorFr: "Ré majeur",
    minorFr: "Si mineur",
    enharmonicFr: "",
    accFr: "2♯ : Fa♯, Do♯",
    trickFr: "Dernier dièse = Do♯ → un demi-ton au-dessus = Ré majeur.",
    vibeFr: "Tonalité éclatante pour les cordes, le rock et l’orchestre."
  },
  "A": {
    sigFr: "3 dièses (♯)",
    majorFr: "La majeur",
    minorFr: "Fa♯ mineur",
    enharmonicFr: "",
    accFr: "3♯ : Fa♯, Do♯, Sol♯",
    trickFr: "Dernier dièse = Sol♯ → un demi-ton au-dessus = La majeur.",
    vibeFr: "Chaleureuse et brillante à la guitare, au violon et au chant."
  },
  "E": {
    sigFr: "4 dièses (♯)",
    majorFr: "Mi majeur",
    minorFr: "Do♯ mineur",
    enharmonicFr: "",
    accFr: "4♯ : Fa♯, Do♯, Sol♯, Ré♯",
    trickFr: "Dernier dièse = Ré♯ → un demi-ton au-dessus = Mi majeur.",
    vibeFr: "Royaume de la guitare électrique, du blues et du rock classique."
  },
  "B": {
    sigFr: "5 dièses (♯) / 7♭",
    majorFr: "Si majeur",
    minorFr: "Sol♯ mineur",
    enharmonicFr: "Enharmonique : Do♭ majeur (7♭) / La♭ mineur",
    accFr: "5♯ : Fa♯, Do♯, Sol♯, Ré♯, La♯",
    trickFr: "Dernier dièse = La♯ → un demi-ton au-dessus = Si majeur.",
    vibeFr: "Tombe très naturellement sous les doigts au piano (utilise les 5 touches noires)."
  },
  "F#": {
    sigFr: "6 dièses / 6 bémols",
    majorFr: "Fa♯ majeur",
    minorFr: "Ré♯ / Mi♭ mineur",
    enharmonicFr: "Pont enharmonique de 6 heures : Fa♯ majeur (6♯) sonne exactement comme Sol♭ majeur (6♭ : Sol♭–La♭–Si♭–Do♭–Ré♭–Mi♭–Fa).",
    accFr: "6♯ : Fa♯, Do♯, Sol♯, Ré♯, La♯, Mi♯  (ou 6♭ : Si♭, Mi♭, La♭, Ré♭, Sol♭, Do♭)",
    trickFr: "Juste en face de Do majeur (pôle triton !) : au-delà, les bémols sont souvent plus simples à lire.",
    vibeFr: "Couleur riche et miroitante très appréciée en gospel, R&B et impressionnisme."
  },
  "Db": {
    sigFr: "5 bémols (♭) / 7♯",
    majorFr: "Ré♭ majeur",
    minorFr: "Si♭ mineur",
    enharmonicFr: "Enharmonique : Do♯ majeur (7♯) / La♯ mineur",
    accFr: "5♭ : Si♭, Mi♭, La♭, Ré♭, Sol♭",
    trickFr: "L’avant-dernier bémol est Ré♭ → Ré♭ majeur !",
    vibeFr: "Timbre velouté et romantique adoré des pianistes de jazz et des ballades."
  },
  "Ab": {
    sigFr: "4 bémols (♭)",
    majorFr: "La♭ majeur",
    minorFr: "Fa mineur",
    enharmonicFr: "",
    accFr: "4♭ : Si♭, Mi♭, La♭, Ré♭",
    trickFr: "Avant-dernier bémol = La♭ → La♭ majeur.",
    vibeFr: "Doux et ample — un grand classique des standards de jazz, soul et harmonies à vent."
  },
  "Eb": {
    sigFr: "3 bémols (♭)",
    majorFr: "Mi♭ majeur",
    minorFr: "Do mineur",
    enharmonicFr: "",
    accFr: "3♭ : Si♭, Mi♭, La♭",
    trickFr: "Avant-dernier bémol = Mi♭ → Mi♭ majeur.",
    vibeFr: "Tonalité noble et héroïque pour les cuivres, le saxophone alto et la symphonie."
  },
  "Bb": {
    sigFr: "2 bémols (♭)",
    majorFr: "Si♭ majeur",
    minorFr: "Sol mineur",
    enharmonicFr: "",
    accFr: "2♭ : Si♭, Mi♭",
    trickFr: "Avant-dernier bémol = Si♭ → Si♭ majeur.",
    vibeFr: "Tonalité reine du big band, de la trompette, de la clarinette et du jazz moderne."
  },
  "F": {
    sigFr: "1 bémol (♭)",
    majorFr: "Fa majeur",
    minorFr: "Ré mineur",
    enharmonicFr: "",
    accFr: "1♭ : Si♭ (le Si naturel est abaissé en Si♭)",
    trickFr: "La seule à retenir directement : un seul bémol à la clé donne toujours Fa majeur.",
    vibeFr: "Tonalité chaleureuse et pastorale chérie des chœurs, cors et ballades folk."
  }
};

function getCircleEntryDisplay(entry) {
  const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
  const isEn = lang === "en";
  const regMeta = LOCALIZED_KNOWLEDGE_BY_LANG[lang]?.circleData?.[entry.rootKey] || null;
  const frMeta = lang === "fr" ? CIRCLE_OF_FIFTHS_FR_DATA[entry.rootKey] : null;
  const meta = regMeta || frMeta;
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  const majorFull = typeof getKeyDisplayName === "function"
    ? getKeyDisplayName(entry.rootKey)
    : (meta ? (meta.major || meta.majorFr) : (isEn ? `${entry.wheelMajorIntl} Major` : `${entry.wheelMajorDe}-Dur`));
  const minorFull = meta
    ? (meta.minor || meta.minorFr)
    : (isEn ? entry.minorEn : (useIntl ? entry.minorIntl : entry.minorDe));
  const chordRoots = useIntl
    ? entry.notesIntl
    : entry.notesIntl.map(n => (n === "B" ? "H" : n === "Bb" ? "B" : n));
  return {
    lang,
    isEn,
    useIntl,
    majorWheel: useIntl ? entry.wheelMajorIntl : entry.wheelMajorDe,
    minorWheel: useIntl ? entry.wheelMinorIntl : entry.wheelMinorDe,
    majorFull,
    minorFull,
    notes: useIntl ? entry.notesIntl : entry.notesDe,
    chordRoots,
    sigFull: meta ? (meta.sig || meta.sigFr) : (isEn ? entry.sigEn : entry.sigDe),
    accText: meta ? (meta.acc || meta.accFr) : (isEn ? entry.accEn : entry.accDe),
    trickText: meta ? (meta.trick || meta.trickFr) : (isEn ? entry.trickEn : entry.trickDe),
    vibeText: meta ? (meta.vibe || meta.vibeFr) : (isEn ? entry.vibeEn : entry.vibeDe),
    enharmonicText: meta ? (meta.enharmonic ?? meta.enharmonicFr ?? "") : (isEn ? entry.enharmonicEn : entry.enharmonicDe)
  };
}

function getCircleScaleAndChords(entry, ringMode = "major") {
  const disp = getCircleEntryDisplay(entry);
  const isMinor = ringMode === "minor";
  const baseMidi = isMinor ? entry.minorMidi : entry.rootMidi;
  const bassBase = baseMidi >= 58 ? baseMidi - 12 : baseMidi;

  if (!isMinor) {
    const scaleOffsets = [0, 2, 4, 5, 7, 9, 11, 12];
    const scaleMidis = scaleOffsets.map(o => baseMidi + o);
    const scaleLabels = [...disp.notes, disp.notes[0]];
    const specs = [
      { deg: "I",   degIdx: 0, off: 0,  triad: [0, 4, 7],      suffix: "",  roleDe: "Tonika",        roleEn: "Tonic",        roleFr: "Tonique",        primary: true },
      { deg: "ii",  degIdx: 1, off: 2,  triad: [2, 5, 9],      suffix: "m", roleDe: "Moll-Subd.",    roleEn: "Supertonic",   roleFr: "Sus-tonique",    primary: false },
      { deg: "iii", degIdx: 2, off: 4,  triad: [4, 7, 11],     suffix: "m", roleDe: "Mediante",      roleEn: "Mediant",      roleFr: "Médiante",       primary: false },
      { deg: "IV",  degIdx: 3, off: 5,  triad: [5, 9, 12],     suffix: "",  roleDe: "Subdominante",  roleEn: "Subdominant",  roleFr: "Sous-dom.",      primary: true },
      { deg: "V",   degIdx: 4, off: 7,  triad: [7, 11, 14],    suffix: "",  roleDe: "Dominante",     roleEn: "Dominant",     roleFr: "Dominante",      primary: true },
      { deg: "V7",  degIdx: 4, off: 7,  triad: [7, 11, 14, 17],suffix: "7", roleDe: "Dom.-7",        roleEn: "Dom. 7th",     roleFr: "Dom. 7e",        primary: false },
      { deg: "vi",  degIdx: 5, off: 9,  triad: [9, 12, 16],    suffix: "m", roleDe: "Parallele",     roleEn: "Relative min", roleFr: "Relatif min.",   primary: true },
      { deg: "vii°",degIdx: 6, off: 11, triad: [11, 14, 17],   suffix: "°", roleDe: "Leit-Dreikl.",  roleEn: "Leading dim",  roleFr: "Sensible dim.",  primary: false }
    ];
    const majorRoles = LOCALIZED_KNOWLEDGE_BY_LANG[disp.lang]?.circleRoles?.major;
    const chords = specs.map(sp => ({
      deg: sp.deg,
      symbol: `${disp.chordRoots[sp.degIdx]}${sp.suffix}`,
      role: majorRoles?.[sp.deg] || (disp.lang === "fr" ? sp.roleFr : disp.isEn ? sp.roleEn : sp.roleDe),
      midis: sp.triad.map(o => baseMidi + o),
      bassMidi: (baseMidi + sp.off >= 58 ? baseMidi + sp.off - 12 : baseMidi + sp.off),
      primary: sp.primary
    }));
    return { disp, baseMidi, bassBase, scaleMidis, scaleLabels, chords };
  }

  const rotNotes = [...disp.notes.slice(5), ...disp.notes.slice(0, 5)];
  const rotRoots = [...disp.chordRoots.slice(5), ...disp.chordRoots.slice(0, 5)];
  const scaleOffsets = [0, 2, 3, 5, 7, 8, 10, 12];
  const scaleMidis = scaleOffsets.map(o => baseMidi + o);
  const scaleLabels = [...rotNotes, rotNotes[0]];
  const specs = [
    { deg: "i",   degIdx: 0, off: 0,  triad: [0, 3, 7],      suffix: "m", roleDe: "Moll-Tonika",  roleEn: "Minor tonic",  roleFr: "Tonique min.",   primary: true },
    { deg: "ii°", degIdx: 1, off: 2,  triad: [2, 5, 8],      suffix: "°", roleDe: "Vermindert",   roleEn: "Half/dim",     roleFr: "Diminué",        primary: false },
    { deg: "III", degIdx: 2, off: 3,  triad: [3, 7, 10],     suffix: "",  roleDe: "Dur-Parallele",roleEn: "Relative maj", roleFr: "Relatif maj.",   primary: true },
    { deg: "iv",  degIdx: 3, off: 5,  triad: [5, 8, 12],     suffix: "m", roleDe: "Moll-Subd.",   roleEn: "Minor subdom", roleFr: "Sous-dom. min.", primary: true },
    { deg: "v",   degIdx: 4, off: 7,  triad: [7, 10, 14],    suffix: "m", roleDe: "Nat. Dom.",    roleEn: "Minor dom",    roleFr: "Dom. nat.",      primary: false },
    { deg: "V7",  degIdx: 4, off: 7,  triad: [7, 11, 14, 17],suffix: "7", roleDe: "Harm. Dom.7",  roleEn: "Harm. Dom.7",  roleFr: "Dom. harm. 7",   primary: true },
    { deg: "VI",  degIdx: 5, off: 8,  triad: [8, 12, 15],    suffix: "",  roleDe: "Submediante",  roleEn: "Submediant",   roleFr: "Sus-dom.",       primary: false },
    { deg: "VII", degIdx: 6, off: 10, triad: [10, 14, 17],   suffix: "",  roleDe: "Subtonika",    roleEn: "Subtonic",     roleFr: "Sous-tonique",   primary: false }
  ];
  const minorRoles = LOCALIZED_KNOWLEDGE_BY_LANG[disp.lang]?.circleRoles?.minor;
  const chords = specs.map(sp => ({
    deg: sp.deg,
    symbol: `${rotRoots[sp.degIdx]}${sp.suffix}`,
    role: minorRoles?.[sp.deg] || (disp.lang === "fr" ? sp.roleFr : disp.isEn ? sp.roleEn : sp.roleDe),
    midis: sp.triad.map(o => baseMidi + o),
    bassMidi: (baseMidi + sp.off >= 58 ? baseMidi + sp.off - 12 : baseMidi + sp.off),
    primary: sp.primary
  }));
  return { disp, baseMidi, bassBase, scaleMidis, scaleLabels, chords };
}

function renderCircleOfFifthsTheoryHTML() {
  const localized = resolveRegisteredKnowledgeRender(
    "circleOfFifthsTheory",
    typeof renderCircleOfFifthsTheoryHTML_EN === "function" ? renderCircleOfFifthsTheoryHTML_EN : null,
    typeof renderCircleOfFifthsTheoryHTML_FR === "function" ? renderCircleOfFifthsTheoryHTML_FR : null
  );
  if (localized !== null) return localized;
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Die Grundidee</span>
        <span class="k-ratio-chip">Quinte 3:2 • 12 Zentren</span>
      </div>
      <h4>Was ist der Quintenzirkel – und warum schließt er sich zum Kreis?</h4>
      <p>
        Nach der Oktave (<code>2:1</code>) ist die <strong>reine Quinte (3:2)</strong> das engste akustische Verwandtschaftsverhältnis der Musik. Geht man von <strong>C</strong> aus Schritt für Schritt eine Quinte nach oben (<code>C → G → D → A → E → H → Fis…</code>), wird jedes Mal genau ein Ton um einen Halbton erhöht, um den neuen Leitton herzustellen – es kommt im Uhrzeigersinn je ein <strong>Kreuz (♯)</strong> hinzu. Geht man rückwärts in Quinten nach unten (gleichbedeutend mit Quarten nach oben: <code>C → F → B → Es → As → Des → Ges</code>), wird bei jedem Schritt ein Ton erniedrigt – es entsteht je ein <strong>Be (♭)</strong>.
      </p>
      <p>
        Nach 12 Schritten schließt unsere gleichstufige Stimmung den Kreis bei <strong>6 Uhr (Fis / Ges)</strong> wieder perfekt zusammen, weil 6♯ und 6♭ exakt dieselben Tasten treffen (<strong>Enharmonische Verwechslung</strong>). Statt 12 isolierte Tonleitern auswendig zu lernen, erhältst du einen einzigen musikalischen Kompass!
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Rechts herum (+1 ♯) • Quintschritt aufwärts</h5>
          <p><code>C → G → D → A → E → H → Fis</code><br>Der Klang öffnet und hellt sich auf. Merksatz Dur: <em>„Geh Du Alter Esel Hole Fisch“</em>. Reihenfolge der ♯: <code>fis – cis – gis – dis – ais – eis</code>.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Links herum (+1 ♭) • Quartschritt aufwärts</h5>
          <p><code>C → F → B → Es → As → Des → Ges</code><br>Die Farbe wird weicher und entspannter. Merksatz Dur: <em>„Frische Brötchen Essen Asse Des Gesangs“</em>. Reihenfolge der ♭: <code>b – es – as – des – ges – ces</code>.</p>
        </div>
      </div>
    </article>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-peach">2. Bedienung &amp; Leselogik</span>
            <span class="k-ratio-chip">In 20 Sekunden lesen</span>
          </div>
          <h4>Wie liest und benutzt man den Quintenzirkel im Alltag?</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Außenring = Dur, Innenring = Mollparallele:</strong> Jedes Tortenstück paart eine Dur-Tonart außen mit ihrer <strong>Mollparallele</strong> innen (<code>C / a</code>, <code>G / e</code>, <code>D / h</code>…). Beide teilen sich <em>exakt dieselben 7 Töne und Vorzeichen</em> – Moll ruht lediglich 3 Halbtöne tiefer (6. Stufe / <em>La</em>).</li>
          <li><strong>Der 1-Sekunden-Kreuz-Trick (♯):</strong> Nimm das <em>letzte Kreuz</em> in den Noten und gehe <strong>einen Halbton höher</strong> → schon hast du den Dur-Grundton (z. B. 2♯: <code>fis, cis</code> → eins über <code>cis</code> liegt <strong>D-Dur</strong>).</li>
          <li><strong>Der 1-Sekunden-Be-Trick (♭):</strong> Das <em>vorletzte Be</em> verrät direkt die Dur-Tonart! (z. B. 3♭: <code>b, es, as</code> → vorletztes ♭ = <strong>Es-Dur</strong>; nur <code>1♭ = F-Dur</code> merkt man sich einzeln).</li>
          <li><strong>Links, Mitte, Rechts wie eine Straßenkarte lesen:</strong> Dein gewählter Ausgangspunkt ist <code>I</code> (Tonika). Sein linker Nachbar ist immer die <strong>Subdominante (IV)</strong> und sein rechter Nachbar immer die <strong>Dominante (V)</strong>!</li>
        </ul>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-lilac">3. Was es dir konkret bringt</span>
            <span class="k-ratio-chip">Der Praxis-Aha-Effekt</span>
          </div>
          <h4>Warum sich das Verständnis des Quintenzirkels sofort auszahlt</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>1. Alle 6 Song-Akkorde auf einen Blick</strong>
            Schau auf den markierten 3er-Nachbarblock oben im Rad: Deine Tonika plus linker und rechter Nachbar liefern sofort <strong>alle 6 Hauptakkorde der Tonart</strong> (außen <code>IV – I – V</code>, innen <code>ii – vi – iii</code>)! Unzählige Pop-, Rock-, Folk- und Filmstücke bewegen sich exakt in diesem Tortenblock.
          </div>
          <div class="physics-fact-item">
            <strong>2. Mühelos Transponieren &amp; Kapodaster nutzen</strong>
            Ist ein Song zu hoch zum Singen? Schiebe dein gesamtes 3er-Akkordpaket im Geist einfach ein oder zwei Felder weiter – die internen Beziehungen bleiben deckungsgleich (<code>C–G–Am–F</code> wird eins rechts zu <code>G–D–Em–C</code>, zwei links zu <code>B–F–Gm–Es</code>).
          </div>
          <div class="physics-fact-item">
            <strong>3. Natürliche Tonartwechsel (Modulation)</strong>
            Direkte Nachbarn im Zirkel teilen <strong>6 von 7 Tönen</strong> – ideal für unauffällige, fließende Übergänge in den Refrain oder die Bridge. Ein Sprung ans gegenüberliegende Zirkel-Ende (6 Schritte / Tritonus-Pol) sorgt dagegen für maximalen Kontrast-Effekt.
          </div>
          <div class="physics-fact-item">
            <strong>4. Gehörbildung &amp; Harmonie-Antizipation</strong>
            Berühmte Jazz- &amp; Pop-Ketten wie <code>iii – vi – ii – V – I</code> (<strong>Quintfallsequenz</strong>) wandern exakt ein Feld nach dem anderen <em>gegen den Uhrzeigersinn</em> zur Tonika! Dein Ohr lernt so die geometrische Schwerkraft von Akkordfolgen.
          </div>
        </div>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">4. Übungen &amp; Tricks</span>
            <span class="k-ratio-chip">Sofort ausprobieren</span>
          </div>
          <h4>4 effektive Praxis-Übungen mit dem Quintenzirkel</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Die „Nur C &amp; G“-Komfortzone sprengen:</strong> Übe ein neues Lick, eine Tonleiter oder Kadenz jeden Tag ein Zirkel-Feld weiter im Uhrzeigersinn (<code>C → G → D → A…</code>) oder durch die warmen Be-Tonarten (<code>F → B → Es → As</code>). Nach 12 Einheiten beherrschst du das gesamte Griffbrett oder alle Tasten.</li>
          <li><strong>Quintfall-Sog hören (<code>vi – ii – V7 – I</code>):</strong> Zähle gegen den Uhrzeigersinn zurück zur 12 Uhr: Jeder Akkord löst sich als Quinte abwärts in den nächsten auf – eines der stärksten Muster der Musikgeschichte.</li>
          <li><strong>Zwischendominante (V/V) verstehen:</strong> Willst du vor <code>G (V)</code> in C-Dur kurz strahlender nach rechts ziehen? Ein Abstecher ins rechte Nachbarfeld holt das <code>fis</code> herein und macht aus dem ruhigen <code>Dm (ii)</code> ein treibendes <code>D-Dur / D7</code> Richtung G!</li>
          <li><strong>Stimmungs-Kompass beim Songwriting:</strong> Schritte nach <strong>links (♭-Richtung)</strong> wirken weicher, ruhiger und erdender (Subdominante / IV), Schritte nach <strong>rechts (♯-Richtung)</strong> bringen Zug, Helligkeit und Vorwärtsdrang.</li>
        </ul>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-progression="vi,ii,V7,I">▶ Quintfall hören (Am–Dm–G7–C)</button>
          <button class="btn-tool" data-play-progression="I,V/V,V,I">▶ Rechts-Schub hören (C–D (V/V)–G–C)</button>
        </div>
      </div>
    </details>
  `;
}

function renderCircleOfFifthsToolHTML(selectedIdx = 0, ringMode = "major", activeTab = "chords") {
  const safeIdx = ((selectedIdx % 12) + 12) % 12;
  const safeRing = ringMode === "minor" ? "minor" : "major";
  const safeTab = ["chords", "signatures", "modulation"].includes(activeTab) ? activeTab : "chords";
  const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
  const lc = (deStr, enStr, frStr) => {
    if (lang === "fr") return frStr;
    if (lang === "en") return enStr;
    if (lang !== "de") {
      const dict = typeof TRANSLATIONS_BY_LANG !== "undefined" ? TRANSLATIONS_BY_LANG[lang] : null;
      if (dict && Object.prototype.hasOwnProperty.call(dict, deStr)) return dict[deStr];
      if (dict && Object.prototype.hasOwnProperty.call(dict, enStr)) return dict[enStr];
      return enStr;
    }
    return deStr;
  };

  const current = CIRCLE_OF_FIFTHS_WHEEL[safeIdx];
  const leftEntry = CIRCLE_OF_FIFTHS_WHEEL[(safeIdx + 11) % 12];
  const rightEntry = CIRCLE_OF_FIFTHS_WHEEL[(safeIdx + 1) % 12];
  const tritoneIdx = (safeIdx + 6) % 12;
  const tritoneEntry = CIRCLE_OF_FIFTHS_WHEEL[tritoneIdx];

  const curDisp = getCircleEntryDisplay(current);
  const leftDisp = getCircleEntryDisplay(leftEntry);
  const rightDisp = getCircleEntryDisplay(rightEntry);
  const triDisp = getCircleEntryDisplay(tritoneEntry);
  const harmonic = getCircleScaleAndChords(current, safeRing);

  const cx = 180;
  const cy = 180;
  const subIdx = (safeIdx + 11) % 12;
  const domIdx = (safeIdx + 1) % 12;

  const wedgesSvg = CIRCLE_OF_FIFTHS_WHEEL.map(item => {
    const d = getCircleEntryDisplay(item);
    const midDeg = -90 + item.idx * 30;
    const startDeg = midDeg - 15;
    const endDeg = midDeg + 15;

    const majPath = buildCircleWedgeArcPath(cx, cy, 108, 152, startDeg, endDeg);
    const minPath = buildCircleWedgeArcPath(cx, cy, 64, 108, startDeg, endDeg);
    const majLblPt = polarToCartesianCircle(cx, cy, 130, midDeg);
    const majRolePt = polarToCartesianCircle(cx, cy, 117, midDeg);
    const minLblPt = polarToCartesianCircle(cx, cy, 86, midDeg);
    const minRolePt = polarToCartesianCircle(cx, cy, 72, midDeg);
    const sigPt = polarToCartesianCircle(cx, cy, 166, midDeg);

    const isCenter = item.idx === safeIdx;
    const isSub = item.idx === subIdx;
    const isDom = item.idx === domIdx;
    const isTri = safeTab === "modulation" && item.idx === tritoneIdx;

    const majClasses = ["cof-wedge-group", "cof-ring-major"];
    const minClasses = ["cof-wedge-group", "cof-ring-minor"];
    if (isCenter) {
      if (safeRing === "major") {
        majClasses.push("is-selected");
        minClasses.push("is-parallel");
      } else {
        minClasses.push("is-selected");
        majClasses.push("is-parallel");
      }
    } else if (isSub || isDom) {
      majClasses.push("is-neighbor");
      minClasses.push("is-neighbor");
    } else if (isTri) {
      majClasses.push("is-tritone");
      minClasses.push("is-tritone");
    }

    let majRoleTag = "";
    let minRoleTag = "";
    if (safeRing === "major") {
      if (isCenter) { majRoleTag = "I"; minRoleTag = "vi"; }
      else if (isSub) { majRoleTag = "IV"; minRoleTag = "ii"; }
      else if (isDom) { majRoleTag = "V"; minRoleTag = "iii"; }
    } else {
      if (isCenter) { minRoleTag = "i"; majRoleTag = "III"; }
      else if (isSub) { minRoleTag = "iv"; majRoleTag = "VI"; }
      else if (isDom) { minRoleTag = "v"; majRoleTag = "VII"; }
    }
    if (isTri && !isCenter) {
      if (safeRing === "major") majRoleTag = "TT";
      else minRoleTag = "TT";
    }

    const majFontSize = d.majorWheel.length > 4 ? ' font-size="9.3"' : "";
    const minFontSize = d.minorWheel.length > 4 ? ' font-size="8.4"' : "";

    return `
      <text class="cof-sig-label ${isCenter ? "is-selected" : ""}" x="${sigPt.x.toFixed(1)}" y="${sigPt.y.toFixed(1)}">${item.sigShort}</text>
      <g class="${majClasses.join(" ")}" role="button" tabindex="0" data-cof-idx="${item.idx}" data-cof-target-ring="major" aria-label="${d.majorFull}">
        <path class="cof-wedge-path" d="${majPath}"/>
        <text class="cof-wedge-label" x="${majLblPt.x.toFixed(1)}" y="${(majRoleTag ? majLblPt.y - 3.5 : majLblPt.y).toFixed(1)}"${majFontSize}>${d.majorWheel}</text>
        ${majRoleTag ? `<text class="cof-wedge-role-tag" x="${majRolePt.x.toFixed(1)}" y="${majRolePt.y.toFixed(1)}">${majRoleTag}</text>` : ""}
      </g>
      <g class="${minClasses.join(" ")}" role="button" tabindex="0" data-cof-idx="${item.idx}" data-cof-target-ring="minor" aria-label="${d.minorFull}">
        <path class="cof-wedge-path" d="${minPath}"/>
        <text class="cof-wedge-label" x="${minLblPt.x.toFixed(1)}" y="${(minRoleTag ? minLblPt.y - 2.5 : minLblPt.y).toFixed(1)}"${minFontSize}>${d.minorWheel}</text>
        ${minRoleTag ? `<text class="cof-wedge-role-tag" x="${minRolePt.x.toFixed(1)}" y="${minRolePt.y.toFixed(1)}">${minRoleTag}</text>` : ""}
      </g>
    `;
  }).join("");

  const activeTitle = safeRing === "minor" ? curDisp.minorFull : curDisp.majorFull;
  const parallelTitle = safeRing === "minor" ? curDisp.majorFull : curDisp.minorFull;
  const centerTitleSize = activeTitle.length > 13 ? ' font-size="11.2"' : activeTitle.length > 10 ? ' font-size="12.5"' : activeTitle.length > 8 ? ' font-size="14.2"' : "";
  const activeCadenceMidi = safeRing === "minor" ? current.minorMidi : current.rootMidi;

  let tabBodyHTML = "";
  if (safeTab === "chords") {
    tabBodyHTML = `
      <div class="cof-scale-strip">
        <strong>${lc("Tonleiter:", "Scale:", "Gamme :")}</strong>
        <span>${harmonic.scaleLabels.join(" – ")}</span>
      </div>
      <div class="cof-chord-grid">
        ${harmonic.chords.map(ch => `
          <button class="cof-chord-btn ${ch.primary ? "is-primary" : ""}" data-play-cof-chord="${ch.midis.join(",")}" data-cof-bass="${ch.bassMidi}" title="${lc("Tippen zum Anhören", "Tap to hear chord", "Touchez pour écouter l’accord")}">
            <span class="cof-chord-deg">${ch.deg}</span>
            <span class="cof-chord-name">${ch.symbol}</span>
            <span class="cof-chord-role">${ch.role}</span>
          </button>
        `).join("")}
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-cof-scale="${harmonic.scaleMidis.join(",")}">▶ ${lc("Tonleiter hören", "Play Scale", "Écouter la gamme")}</button>
        <button class="btn-tool" data-play-key-cadence="${activeCadenceMidi}" data-key-mode="${safeRing}">▶ ${lc("Kadenz I–IV–V–I", "Cadence I–IV–V–I", "Cadence I–IV–V–I")}</button>
      </div>
    `;
  } else if (safeTab === "signatures") {
    tabBodyHTML = `
      <div class="cof-scale-strip">
        <strong>${curDisp.sigFull}:</strong>
        <span>${curDisp.accText}</span>
      </div>
      <p class="k-tip"><strong>${lc("Lese- & Merktrick:", "Quick Memory Trick:", "Astuce mémo :")}</strong> ${curDisp.trickText}</p>
      ${curDisp.enharmonicText ? `<p class="k-tip"><strong>${lc("Enharmonik:", "Enharmonic Twin:", "Enharmonie :")}</strong> ${curDisp.enharmonicText}</p>` : ""}
      <p class="k-tip"><strong>${lc("Klang & Instrumente:", "Sound & Instruments:", "Son & Instruments :")}</strong> ${curDisp.vibeText}</p>
    `;
  } else {
    const pivotLabel = safeRing === "minor"
      ? `${curDisp.minorWheel} (i) → ${leftDisp.minorWheel} (iv) → V7 → ${curDisp.majorFull} (III)`
      : `${curDisp.majorFull} (I) → ${curDisp.minorWheel} (vi = ii) → V7 → ${rightDisp.majorFull}`;
    tabBodyHTML = `
      <div class="cof-mod-grid">
        <div class="cof-mod-box">
          <strong>${lc("Nächste Nachbarn (±1 Schritt • 6/7 Töne gleich)", "Closest Neighbors (±1 step • 6/7 shared notes)", "Voisins les plus proches (±1 pas • 6/7 notes communes)")}</strong>
          ${lc("Links (−1♭):", "Left (−1♭):", "À gauche (−1♭) :")} <code>${safeRing === "minor" ? leftDisp.minorFull : leftDisp.majorFull}</code><br>
          ${lc("Rechts (+1♯):", "Right (+1♯):", "À droite (+1♯) :")} <code>${safeRing === "minor" ? rightDisp.minorFull : rightDisp.majorFull}</code>
        </div>
        <div class="cof-mod-box">
          <strong>${lc("Selbe Töne / Stärkster Kontrast", "Same Notes / Furthest Contrast", "Mêmes notes / Contraste maximal")}</strong>
          ${lc("Parallele:", "Parallel:", "Relatif :")} <code>${parallelTitle}</code><br>
          ${lc("Tritonus-Pol (6 Schritte):", "Tritone Pole (6 steps):", "Pôle triton (6 pas) :")} <code>${safeRing === "minor" ? triDisp.minorFull : triDisp.majorFull}</code>
        </div>
      </div>
      <p class="k-tip">
        <strong>${lc("Elegante Dreh-Modulation:", "Smooth Pivot Modulation:", "Modulation par accord pivot :")}</strong>
        <code>${pivotLabel}</code> — ${lc(
          "Ein gemeinsamer Mollakkord dient als Drehachse und leitet das Ohr unauffällig in die Nachbartonart.",
          "Notice how one shared minor chord smoothly pivots the ear into the neighboring key.",
          "Remarquez comment un accord mineur commun sert de pivot pour glisser en douceur vers la tonalité voisine."
        )}
      </p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-cof-mod="${activeCadenceMidi}" data-key-mode="${safeRing}">▶ ${lc("Modulation anhören", "Hear Smooth Modulation", "Écouter la modulation")}</button>
      </div>
    `;
  }

  return `
    <div class="knowledge-list">
      <section class="cof-lab-card" aria-label="${lc("Interaktiver Quintenzirkel", "Interactive Circle of Fifths", "Cycle des quintes interactif")}">
        <div class="cof-top-controls">
          <div class="k-filter-row" role="group" aria-label="${lc("Dur oder Moll Fokus", "Major or minor focus", "Choix majeur ou mineur")}">
            <button class="k-filter-pill ${safeRing === "major" ? "active" : ""}" data-cof-ring="major">${lc("Dur (Außen)", "Major (Outer)", "Majeur (Ext.)")}</button>
            <button class="k-filter-pill ${safeRing === "minor" ? "active" : ""}" data-cof-ring="minor">${lc("Moll (Innen)", "Minor (Inner)", "Mineur (Int.)")}</button>
          </div>
          <div class="cof-step-nav">
            <button class="cof-step-btn" data-cof-step="-1" title="${lc("Gegen Uhrzeigersinn (+1♭)", "Move counter-clockwise (+1♭)", "Sens antihoraire (+1♭)")}">◀ −1 ♯ / +1 ♭</button>
            <button class="cof-step-btn" data-cof-step="1" title="${lc("Im Uhrzeigersinn (+1♯)", "Move clockwise (+1♯)", "Sens horaire (+1♯)")}">+1 ♯ ▶</button>
          </div>
        </div>

        <div class="cof-wheel-wrap">
          <svg class="cof-wheel-svg" viewBox="5 5 350 350" role="img" aria-label="${lc("Interaktives Quintenzirkel-Rad", "Interactive Circle of Fifths wheel", "Roue interactive du Cycle des quintes")}">
            ${wedgesSvg}
            <circle class="cof-center-circle" cx="180" cy="180" r="59"/>
            <text class="cof-center-kicker" x="180" y="153">${safeRing === "minor" ? lc("MOLL", "MINOR", "MINEUR") : lc("DUR", "MAJOR", "MAJEUR")} • ${current.sigShort}</text>
            <text class="cof-center-title" x="180" y="177"${centerTitleSize}>${activeTitle}</text>
            <text class="cof-center-sub" x="180" y="196">${lc("Par:", "Rel:", "Rel. :")} ${parallelTitle}</text>
            <text class="cof-center-badge" x="180" y="213">${lc("Feld antippen", "Tap any wedge", "Touchez un secteur")}</text>
          </svg>

          <div class="cof-legend">
            <span class="cof-legend-item"><i class="cof-swatch is-sel"></i>${lc("Tonika", "Tonic", "Tonique")}</span>
            <span class="cof-legend-item"><i class="cof-swatch is-par"></i>${lc("Parallele", "Relative", "Relatif")}</span>
            <span class="cof-legend-item"><i class="cof-swatch is-nb"></i>${lc("Nachbarn (IV / V)", "Neighbors (IV / V)", "Voisins (IV / V)")}</span>
            ${safeTab === "modulation" ? `<span class="cof-legend-item"><i class="cof-swatch is-tri"></i>${lc("Gegenpol", "Tritone Pole", "Pôle triton")}</span>` : ""}
          </div>
        </div>

        <div class="k-filter-row" role="tablist" aria-label="${lc("Zirkel-Ansichten", "Circle views", "Vues du cycle")}">
          <button class="k-filter-pill ${safeTab === "chords" ? "active" : ""}" data-cof-tab="chords" role="tab" aria-selected="${safeTab === "chords"}">${lc("Akkorde & Skala", "Chords & Scale", "Accords & Gamme")}</button>
          <button class="k-filter-pill ${safeTab === "signatures" ? "active" : ""}" data-cof-tab="signatures" role="tab" aria-selected="${safeTab === "signatures"}">${lc("Vorzeichen & Trick", "Signatures & Trick", "Armures & Astuce")}</button>
          <button class="k-filter-pill ${safeTab === "modulation" ? "active" : ""}" data-cof-tab="modulation" role="tab" aria-selected="${safeTab === "modulation"}">${lc("Modulation & Züge", "Modulation & Bridges", "Modulation & Ponts")}</button>
        </div>

        <div class="cof-detail-panel">
          <div class="cof-detail-header">
            <h4>${activeTitle} <span style="font-weight:600;color:var(--raccoon-muted);font-size:0.82rem;">(${parallelTitle})</span></h4>
            <span class="k-ratio-chip">${curDisp.sigFull}</span>
          </div>
          ${tabBodyHTML}
        </div>
      </section>

      <div class="k-sibling-bar">
        <span><strong>${lc("Hintergrund & Praxis-Wissen:", "Background & Practice Guide:", "Principes & Guide pratique :")}</strong> ${lc("Erfahre, warum sich der Zirkel schließt, wie du ihn in Sekunden liest und zum Üben nutzt.", "Learn why the circle closes, how to read it in seconds, and how to use it in daily practice.", "Découvrez pourquoi le cycle se referme, comment le lire en quelques secondes et l’utiliser au quotidien.")}</span>
        <button type="button" class="btn-tool" data-jump-ref="circle-of-fifths">${lc("Quintenzirkel verstehen →", "Understand the Circle of Fifths →", "Comprendre le Cycle des quintes →")}</button>
      </div>
    </div>
  `;
}

function renderCircleOfFifthsReferenceHTML() {
  const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
  const lc = (deStr, enStr, frStr) => {
    if (lang === "fr") return frStr;
    if (lang === "en") return enStr;
    if (lang !== "de") {
      const dict = typeof TRANSLATIONS_BY_LANG !== "undefined" ? TRANSLATIONS_BY_LANG[lang] : null;
      if (dict && Object.prototype.hasOwnProperty.call(dict, deStr)) return dict[deStr];
      if (dict && Object.prototype.hasOwnProperty.call(dict, enStr)) return dict[enStr];
      return enStr;
    }
    return deStr;
  };
  return `
    <div class="knowledge-list">
      ${renderCircleOfFifthsTheoryHTML()}

      <div class="k-sibling-bar">
        <span><strong>${lc("Alle 12 Tonarten im Detail:", "Complete 12-Key Atlas:", "Atlas complet des 12 tonalités :")}</strong> ${lc("Alle Generalvorzeichen, Dreiklänge & Moll-Varianten auf einen Blick.", "Browse signatures, chord tables & natural/harmonic/melodic minor.", "Armures, accords diatoniques et les 3 gammes mineures d’un coup d’œil.")}</span>
        <button type="button" class="btn-tool" data-jump-ref="keys">${lc("Tonarten &amp; Vorzeichen →", "Keys &amp; Signatures →", "Tonalités &amp; Armures →")}</button>
      </div>
    </div>
  `;
}

function renderNotationReferenceHTML() {
  const localized = resolveRegisteredKnowledgeRender(
    "notation",
    typeof renderNotationReferenceHTML_EN === "function" ? renderNotationReferenceHTML_EN : null,
    typeof renderNotationReferenceHTML_FR === "function" ? renderNotationReferenceHTML_FR : null
  );
  if (localized !== null) return localized;

  const staffFn = typeof buildNotationKnowledgeStaffSVG === "function" ? buildNotationKnowledgeStaffSVG : null;
  const trebleAnchorSvg = staffFn ? staffFn("treble", [0, 2, 4, 6, 8], { width: 290, highlightAnchorLine: true, showLabels: true, labelShort: true }) : "";
  const bassAnchorSvg = staffFn ? staffFn("bass", [0, 2, 4, 6, 8], { width: 290, highlightAnchorLine: true, showLabels: true, labelShort: true }) : "";
  const altoAnchorSvg = staffFn ? staffFn("alto", [0, 2, 4, 6, 8], { width: 290, highlightAnchorLine: true, showLabels: true, labelShort: true }) : "";
  const ledgerSvg = staffFn ? staffFn("treble", [-6, -4, -2, 4, 10, 12, 14], { width: 340, showLabels: true, labelShort: true }) : "";
  const ledgerBassSvg = staffFn ? staffFn("bass", [-6, -4, -2, 4, 10, 12, 14], { width: 340, showLabels: true, labelShort: true }) : "";
  const accSvg = staffFn ? staffFn("treble", [
    { step: 1, accidental: 0 },
    { step: 1, accidental: 1 },
    { step: 2, accidental: -1 },
    { step: 6, accidental: 0 },
    { step: 6, accidental: -1 }
  ], { width: 320, showLabels: true, labelShort: true }) : "";
  const keySigSharpSvg = staffFn ? staffFn("treble", [
    { step: 1, accidental: 1 },
    { step: 5, accidental: 1 },
    { step: 1, accidental: 0 }
  ], { width: 300, keySignatureId: "D", showLabels: true, labelShort: true }) : "";
  const keySigFlatSvg = staffFn ? staffFn("treble", [
    { step: 4, accidental: -1 },
    { step: 7, accidental: -1 },
    { step: 2, accidental: 0 }
  ], { width: 300, keySignatureId: "Eb", showLabels: true, labelShort: true }) : "";

  return `
    <!-- 1. Aufbau des 5-Linien-Systems -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Das 5-Linien-System</span>
        <span class="k-ratio-chip">Linien &amp; Zwischenräume</span>
      </div>
      <h4>Wie Musik auf Papier sichtbar wird</h4>
      <p>
        Notenschrift funktioniert wie ein Koordinatensystem: Die <strong>senkrechte Achse</strong> bestimmt die Tonhöhe (weiter oben = höherer Ton, weiter unten = tieferer Ton), die <strong>waagerechte Achse</strong> liest man wie Text von links nach rechts durch die Zeit.
      </p>
      <ul class="k-physics-list">
        <li><strong>Immer von unten nach oben zählen:</strong> Das Standard-Notensystem besteht aus <strong>5 Notenlinien</strong> (1 = unterste Linie bis 5 = oberste Linie) und <strong>4 Zwischenräumen</strong> dazwischen.</li>
        <li><strong>Abwechselnd Linie – Raum – Linie:</strong> Jeder Schritt vom Zwischenraum auf die nächste Linie (oder umgekehrt) schreitet exakt <strong>einen Stammton</strong> im Alphabet weiter (<code>C → D → E → F → G → A → H/B</code>).</li>
        <li><strong>Warum man einen Schlüssel braucht:</strong> Ohne Notenschlüssel sind Linien und Räume namenlos – erst der Schlüssel verankert <em>einen festen Bezugspunkt</em> auf einer bestimmten Linie.</li>
      </ul>
    </article>

    <!-- 2. Die 3 wichtigsten Notenschlüssel (+ Spezialfälle) -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Notenschlüssel im Überblick</span>
        <span class="k-ratio-chip">Violin • Bass • Alt</span>
      </div>
      <h4>Drei Perspektiven auf dieselbe Klaviatur</h4>
      <p>
        Die orange markierte Linie zeigt jeweils den <strong>Referenz- oder Ankerton</strong> des Schlüssels. Von diesem einen bekannten Ton aus lässt sich jede andere Linie sekundenschnell ableiten.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${trebleAnchorSvg}
          <h5>Violinschlüssel (G-Schlüssel)</h5>
          <p>Die Spirale umschließt die <strong>2. Linie von unten = g' (G4)</strong>. Standard für Melodieinstrumente (Geige, Flöte, Trompete), Gesang (Sopran/Alt) und die rechte Hand am Klavier.</p>
          <p><strong>Merkspruch Linien (unten → oben):</strong> <em>e' – g' – h' – d'' – f''</em> („Eine Gans Hat Dicke Füße“); Zwischenräume: <em>f' – a' – c'' – e''</em> (FACE).</p>
          <button type="button" class="btn-tool" data-play-solo-note="G4">▶ Anker g' (G4) hören</button>
        </div>
        <div class="notation-knowledge-card">
          ${bassAnchorSvg}
          <h5>Bassschlüssel (F-Schlüssel)</h5>
          <p>Die beiden Punkte rahmen die <strong>4. Linie von unten = kleines f (F3)</strong> ein. Standard für linke Klavierhand, Cello, Kontrabass, E-Bass, Posaune, Fagott und tiefe Männerstimmen.</p>
          <p><strong>Merkspruch Linien (unten → oben):</strong> <em>G – H – d – f – a</em> („Gehört Hans Dieses Fahrrad Auch?“); Zwischenräume: <em>A – c – e – g</em> („Alle Clowns Essen Gemüse“).</p>
          <button type="button" class="btn-tool" data-play-solo-note="F3">▶ Anker f (F3) hören</button>
        </div>
        <div class="notation-knowledge-card">
          ${altoAnchorSvg}
          <h5>Altschlüssel (C-Schlüssel)</h5>
          <p>Die Mitte des Zeichens zeigt exakt auf die <strong>3. (mittlere) Linie = eingestrichenes c' (C4 / Schloss-C)</strong>. Der Hauptschlüssel der Bratsche (Viola) und früherer Chorsätze.</p>
          <p><strong>Symmetrie-Trick:</strong> Weil das mittlere <code>C4</code> exakt im Zentrum sitzt, liegen <em>c'</em> auf Linie 3, <em>e'</em> auf Linie 4, <em>g'</em> auf Linie 5 und nach unten <em>a</em> auf Linie 2 sowie <em>f</em> auf Linie 1.</p>
          <button type="button" class="btn-tool" data-play-solo-note="C4">▶ Anker c' (C4) hören</button>
        </div>
      </div>

      <div class="k-meta-box">
        <div><strong>Dasselbe Schloss-C (C4) verbindet alle drei Systeme:</strong> Im <strong>Violinschlüssel</strong> liegt c' auf der 1. Hilfslinie <em>unten</em>, im <strong>Altschlüssel</strong> genau in der <em>Mitte (Linie 3)</em> und im <strong>Bassschlüssel</strong> auf der 1. Hilfslinie <em>oben</em>!</div>
        <div><strong>Weitere Spezialschlüssel (Ausblick):</strong> Der <strong>Tenorschlüssel</strong> setzt denselben C-Schlüssel eine Stufe höher auf die 4. Linie (häufig für hohe Cello-, Fagott- oder Posaunenstellen). Oktavierende Schlüssel (<code>8vb</code> / <code>8va</code>) verschieben Gitarre oder Piccolo bequem um eine ganze Oktave, ohne Hilfslinien-Chaos zu erzeugen.</div>
      </div>
    </article>

    <!-- 3. Bis zu 3 Hilfslinien oben & unten -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Hilfslinien sicher lesen</span>
        <span class="k-ratio-chip">Bis ±3 Hilfslinien</span>
      </div>
      <h4>Raus aus dem 5-Linien-Käfig – ohne Zählen</h4>
      <p>
        Sobald Töne höher als die 5. Linie oder tiefer als die 1. Linie klingen, verlängert man das System nur für diese Note mit kurzen <strong>Hilfslinien</strong>. In dieser App trainierst du bis zu <strong>3 Hilfslinien in beide Richtungen</strong> – genau der Bereich, der in Band-, Orchester- und Klavierliteratur täglich vorkommt.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${ledgerSvg}
          <h5>Violinschlüssel: 3 Hilfslinien unten bis oben</h5>
          <p>Die Abbildung zeigt links die 3., 2. und 1. Hilfslinie unten (<code>f – a – c'</code>), in der Mitte die Ziellinie <code>h'</code> und rechts die 1., 2. und 3. Hilfslinie oben (<code>a'' – c''' – e'''</code>).</p>
        </div>
        <div class="notation-knowledge-card">
          ${ledgerBassSvg}
          <h5>Bassschlüssel: Tiefe Register &amp; hohe Lagen</h5>
          <p>Nach unten reichen 3 Hilfslinien über <code>E – C</code> bis zum Kontra-A (<code>A1</code>), nach oben über das Schloss-<code>c'</code> bis <code>e'</code> und <code>g'</code> für melodisches Cello- oder linke-Hand-Spiel.</p>
        </div>
      </div>
      <ul class="k-physics-list">
        <li><strong>Orientierungspunkt statt abzählen:</strong> Merke dir pro Richtung zwei feste „Bojen“ – im Violinschlüssel z. B. unten <code>c'</code> (1. Linie) &amp; <code>a</code> (2. Linie) und oben <code>a''</code> (1. Linie) &amp; <code>c'''</code> (2. Linie). Jeden Ton direkt darüber oder darunter liest du als direkten Nachbarschritt.</li>
        <li><strong>Linien- und Zwischenraum-Muster erkennen:</strong> Zwei benachbarte Notenköpfe springen entweder von <em>Linie auf Linie</em> (Terzabstand, wie ein Dreiklang!) oder von <em>Raum auf Raum</em>. Das spart mindestens die Hälfte der Rechenzeit.</li>
      </ul>
    </article>

    <!-- 4. Vorzeichen & Schreibweisen -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Vorzeichen &amp; Schreibweise</span>
        <span class="k-ratio-chip">♯ • ♭ • H vs. B</span>
      </div>
      <h4>Schwarze Tasten, Enharmonik &amp; die deutsche H/B-Falle</h4>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${accSvg}
          <div class="k-btn-row" style="margin-top:0.25rem;">
            <button type="button" class="btn-tool" data-play-solo-note="F4">▶ F4</button>
            <button type="button" class="btn-tool" data-play-solo-note="F#4">▶ F♯4 / Fis</button>
            <button type="button" class="btn-tool" data-play-solo-note="Bb4">▶ B♭4 / B</button>
          </div>
        </div>
        <div class="notation-knowledge-card">
          <ul class="k-physics-list">
            <li><strong>Kreuz (<code>♯</code>):</strong> Erhöht den Stammton um genau <strong>1 Halbton</strong> (eine Taste nach rechts). Aus <code>F</code> wird <code>Fis</code> / <code>F♯</code>.</li>
            <li><strong>Be (<code>♭</code>):</strong> Erniedrigt den Stammton um genau <strong>1 Halbton</strong> (eine Taste nach links). Aus <code>G</code> wird <code>Ges</code> / <code>G♭</code>.</li>
            <li><strong>Enharmonische Verwechslung:</strong> Auf der Klaviatur teilen sich z. B. <code>Fis (F♯)</code> und <code>Ges (G♭)</code> exakt dieselbe schwarze Taste – in den Noten sieht man aber je nach Tonart verschiedene Stufen!</li>
            <li><strong>Achtung Deutsch vs. International:</strong> Auf Deutsch heißt die weiße Taste unter C <strong>H</strong> und die erniedrigte schwarze Taste <strong>B</strong>. International (Englisch/Französisch) heißt die weiße Taste <strong>B</strong> und die schwarze Taste <strong>B♭</strong>! Du kannst das jederzeit in den <em>App-Einstellungen</em> umschalten.</li>
          </ul>
        </div>
      </div>
    </article>

    <!-- 5. Generalvorzeichen & Tonarten vom Blatt -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Tonarten &amp; Generalvorzeichen</span>
        <span class="k-ratio-chip">Blattspiel mit ♮</span>
      </div>
      <h4>Wenn Vorzeichen für das ganze Stück gelten</h4>
      <p>
        Statt vor jeder einzelnen Note ein <code>♯</code> oder <code>♭</code> zu drucken, stehen die festen Vorzeichen der Tonart direkt <strong>am Anfang neben dem Notenschlüssel</strong>. Sie verändern diesen Ton Buchstabe für Buchstabe in <strong>allen Oktaven</strong>, solange kein Auflösungszeichen (<code>♮</code>) eingreift.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${keySigSharpSvg}
          <h5>Kreuz-Tonarten (Reihenfolge: Fis – Cis – Gis – Dis – Ais – Eis)</h5>
          <p>In <strong>D-Dur (2♯)</strong> werden jedes <code>F</code> zu <code>Fis</code> und jedes <code>C</code> zu <code>Cis</code> – erst das <code>♮</code> vor der letzten Note macht das <code>F</code> wieder weiß!</p>
        </div>
        <div class="notation-knowledge-card">
          ${keySigFlatSvg}
          <h5>Be-Tonarten (Reihenfolge: B – Es – As – Des – Ges – Ces)</h5>
          <p>In <strong>Es-Dur (3♭)</strong> stehen <code>B</code>, <code>Es</code> und <code>As</code> am Systemanfang und verwandeln jede entsprechende Note automatisch – bis ein <code>♮</code> auflöst.</p>
        </div>
      </div>
    </article>
  `;
}

function renderArrangingReferenceHTML() {
  const localized = resolveRegisteredKnowledgeRender(
    "arranging",
    typeof renderArrangingReferenceHTML_EN === "function" ? renderArrangingReferenceHTML_EN : null,
    typeof renderArrangingReferenceHTML_FR === "function" ? renderArrangingReferenceHTML_FR : null
  );
  if (localized !== null) return localized;

  return `
    <!-- 1. Was ist Arrangieren? -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Was ist Arrangieren?</span>
        <span class="k-ratio-chip">Skizze → Gesamtwerk</span>
      </div>
      <h4>Die Kunst, aus einer Idee ein klangvolles Erlebnis zu bauen</h4>
      <p>
        Wenn die <strong>Komposition</strong> der Grundriss eines Songs ist (also Melodie, Grundakkorde und Text auf einem einfachen Blatt), dann ist das <strong>Arrangement</strong> die gesamte Architektur, Raumgestaltung, Beleuchtung und Farbgebung: <em>Wer spielt wann was, in welcher Oktave, mit welcher Rhythmik, Dynamik und Klangfarbe?</em>
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Besetzung &amp; Instrumentation</strong>
          Welche Instrumente oder Stimmen übernehmen Melodie, Bass, Harmonie-Polster und Rhythmus – und wie kombinieren sich ihre Klangfarben (Timbres)?
        </div>
        <div class="physics-fact-item">
          <strong>Form &amp; Spannungsbogen</strong>
          Wie wächst ein Stück vom intimen Intro über Strophe und Pre-Chorus bis zum großen Refrain, zur Bridge und zum Schluss?
        </div>
        <div class="physics-fact-item">
          <strong>Register &amp; Voicing</strong>
          Wie verteilt man Töne vom tiefen Bass bis in die glitzernden Höhen über das Frequenzspektrum, damit jedes Instrument Luft zum Atmen hat?
        </div>
        <div class="physics-fact-item">
          <strong>Dialog, Textur &amp; Pausen</strong>
          Wann spielen alle gemeinsam (<em>Tutti</em>), wann antwortet ein einzelnes Instrument in den Gesangspausen, und wann erzeugt Stille Gänsehaut?
        </div>
      </div>
    </article>

    <!-- 2. Wozu dient ein Arrangement – und wofür benutzt man es? -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. Zweck &amp; Einsatzgebiete</span>
        <span class="k-ratio-chip">Warum man arrangiert</span>
      </div>
      <h4>Wozu dient ein Arrangement – und wofür benutzt man es in der Musik?</h4>
      <p>
        Ein und dasselbe Lied mit exakt denselben vier Akkorden kann als <strong>zerbrechliche Klavier-Ballade</strong>, als <strong>treibender Funk-Track</strong>, als <strong>vierstimmiger A-cappella-Chorsatz</strong> oder als <strong>episches Filmmusik-Orchester</strong> erklingen. Erst das Arrangement entscheidet über Stil, Emotion und Wirkung:
      </p>
      <ul class="article-steps-list">
        <li>
          <strong>1. Fokus lenken &amp; Platz für die Hauptbotschaft schaffen:</strong> Das menschliche Gehör kann maximal <strong>2 bis 3 gleichzeitige musikalische Ebenen</strong> bewusst verfolgen. Ein gutes Arrangement räumt der Hauptmelodie (oder dem Gesang) den Platz in der Mitte frei, statt sie unter zehn konkurrierenden Spuren zu begraben.
        </li>
        <li>
          <strong>2. Emotionen &amp; Genre-Charakter übersetzen:</strong> Warme Streicher-Flächen schaffen Weite und Sehnsucht, kurze Bläser-Einwürfe (<em>Brass Stabs</em>) sorgen für Punch, gezupfte Akustikgitarre für intime Nähe.
        </li>
        <li>
          <strong>3. Hör-Ermüdung verhindern (Das „Zwiebel-Prinzip“):</strong> Würden alle Instrumente von Sekunde 1 bis zum Ende durchgehend spielen, wäre das Ohr nach 30 Sekunden satt. Arrangieren heißt: Schichten gezielt auf- und wieder abbauen, damit Strophe 2 oder der letzte Refrain noch überraschen können.
        </li>
        <li>
          <strong>4. Musik auf konkrete Besetzungen maßschneidern:</strong> Ob Schulband, Streichquartett, Chor (SATB), Big Band, Orchester oder Solo-Gitarre – beim Arrangieren überträgt man einen Song genau auf die vorhandenen Instrumente, ihre Tonumfänge und die Stärken der Mitspielenden.
        </li>
        <li>
          <strong>5. Übergänge &amp; musikalischen „Klebstoff“ gestalten:</strong> Auftakte, Drum-Fills, Bass-Aufgänge, Steigerungen (<em>Crescendo / Swells</em>) oder plötzliche Stopps (<em>Breaks</em>) verbinden Strophe und Refrain so organisch, dass jeder Wechsel zwingend wirkt.
        </li>
      </ul>
    </article>

    <!-- 3. Die 4 musikalischen Rollen (Schichten-Modell) -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Das 4-Schichten-Modell</span>
        <span class="k-ratio-chip">Rollenverteilung</span>
      </div>
      <h4>Die 4 Bausteine jedes durchsichtigen Arrangements</h4>
      <p>
        Egal ob Pop-Produktion, Jazz-Combo oder Sinfonieorchester – fast jedes gelungene Arrangement verteilt seine Instrumente auf <strong>vier klar getrennte Aufgabenbereiche</strong>:
      </p>
      <ul class="k-physics-list">
        <li><strong>1. Lead / Fokus (Vordergrund):</strong> Gesang oder Soloinstrument. Trägt die Melodie und die emotionale Führung. Alles andere dient dieser Linie.</li>
        <li><strong>2. Fundament (Bass &amp; Groove):</strong> Bass (E-Bass, Kontrabass, Tuba, linke Klavierhand) und Schlagzeug/Percussion verschmelzen zum rhythmischen und harmonischen Boden. Der Bass bestimmt dabei über den tiefsten Ton, wie wir den gesamten Akkord darüber wahrnehmen!</li>
        <li><strong>3. Harmonie-Polster (Pad &amp; Comping):</strong> Gehaltene Streicher, Chöre, Orgel/Synth-Pads oder rhythmisches Gitarren-/Klavier-Comping füllen die harmonische Wärme in der Mittellage.</li>
        <li><strong>4. Gegenmelodie, Schmuck &amp; „Ear Candy“ (Fills &amp; Counterpoint):</strong> Kleine Melodie-Antworten, hohe Glanzpunkte oder Einwürfe – fast immer genau dort platziert, wo die Hauptmelodie gerade Luft holt.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-sketch">▶ 1. Nackte Skizze (nur Melodie &amp; Grundton)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-full-layers">▶ 2. Ausarrangiert (Groove + Bass + Polster + Fill)</button>
      </div>
    </article>

    <!-- 4. Register, Voicing & Frequenz-Architektur -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Register &amp; Voicings</span>
        <span class="k-ratio-chip">Klarheit statt Matsch</span>
      </div>
      <h4>Warum manche Arrangements glasklar klingen – und andere „matschig“</h4>
      <p>
        Der häufigste Anfängerfehler beim Arrangieren: Klavier, Gitarre und Streicher spielen alle gleichzeitig volle Akkorde in exakt derselben mittleren Oktave (<code>C3–C4</code>). Die Obertöne überlagern sich und verdecken die Stimme.
      </p>
      <ul class="k-physics-list">
        <li><strong>Die Oberton-Regel (Unten weit, oben eng):</strong> Im tiefen Register unterhalb von <code>C3</code> liegen die natürlichen Obertöne extrem dicht beieinander. Enge Terzen oder Sekunden im Bass klingen sofort trüb und dröhnend (<em>Low-Interval-Limit</em>). Deshalb gehören in den Keller nur <strong>Grundtöne, Oktaven und Quinten</strong> – während Terzen, Septimen und Optionstöne (<code>9, 11, 13</code>) in der Mittellage und Höhe strahlen!</li>
        <li><strong>Enge Lage (Close Voicing) vs. Weite Lage (Open / Drop-2 Voicing):</strong> Setzt man bei einem engen Vierklang den zweithöchsten Ton eine Oktave tiefer (<em>Drop-2</em>), öffnet sich der Akkord sofort breit, warm und durchsichtig für Bläser-, Streicher- oder Chorsätze.</li>
        <li><strong>Rhythmische Arbeitsteilung:</strong> Spielen zwei Instrumente im ähnlichen Register, sollten sie sich rhythmisch ergänzen – z. B. hält das Streicher-Pad ruhige ganze Noten, während die Akustikgitarre kurze Sechzehntel-Akzente setzt.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-muddy">▶ Matschig: Enge Terzen tief im Bass</button>
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-open">▶ Glasklar: Offenes Studio-Voicing (unten weit, oben farbig)</button>
      </div>
    </article>

    <!-- 5. Dramaturgie, Dialog & Kontrapunkt -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Spannung &amp; Dialog</span>
        <span class="k-ratio-chip">Call &amp; Response • Drop</span>
      </div>
      <h4>Wie man einen Song über 3–4 Minuten lebendig hält</h4>
      <ul class="article-steps-list">
        <li>
          <strong>Call &amp; Response (Frage &amp; Antwort):</strong> Wenn der Gesang am Ende einer Zeile zwei Schläge Pause hat, antwortet genau in dieser Lücke ein kleines Bläser-, Gitarren- oder Klavier-Motiv. Statt gegeneinander anzuspielen, führen die Instrumente ein Gespräch.
        </li>
        <li>
          <strong>Gegenläufige Stimmführung (Kontrapunkt / Countermelody):</strong> Eine gute Nebenstimme läuft nicht stur parallel zur Hauptmelodie, sondern bewegt sich <em>entgegengesetzt</em> (steigt die Melodie, sinkt die Gegenstimme) oder hält ruhige Töne, während die Melodie springt.
        </li>
        <li>
          <strong>Kraft durch Weglassen (Das „Drop“-Prinzip):</strong> Der wirkungsvollste Moment eines Arrangements entsteht oft nicht durch <em>mehr</em> Instrumente, sondern durch plötzliches <strong>Ausdünnen</strong> – etwa wenn zu Beginn von Strophe 2 oder vor dem letzten Refrain plötzlich nur noch Bass und Gesang übrig bleiben, bevor die Band wieder voll einsteigt.
        </li>
        <li>
          <strong>Register-Öffnung im Refrain:</strong> Wenn im Refrain der Bass eine Oktave tiefer geht und gleichzeitig eine hohe Oktav-Stimme oder helle Becken hinzukommen, weitet sich das Klangbild wie ein Panorama.
        </li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-call-response">▶ Call &amp; Response (Melodie ruft, Begleitung antwortet)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-counterpoint">▶ Gegenläufiger Kontrapunkt (Stimmen öffnen sich)</button>
      </div>
    </article>

    <!-- 6. Reharmonisation & 5-Punkte-Praxischeck -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">6. Reharmonisation &amp; Praxis-Check</span>
        <span class="k-ratio-chip">Neues Licht auf gleiche Töne</span>
      </div>
      <h4>Dieselbe Melodie in völlig neuem harmonischem Kleid</h4>
      <p>
        Eines der mächtigsten Werkzeuge beim Arrangieren ist die <strong>Reharmonisation</strong>: Die Melodie bleibt Ton für Ton identisch, aber man tauscht die Akkorde darunter aus – z. B. ersetzt man ein schlichtes <code>C-Dur (I)</code> durch ein warmes <code>Fmaj7 (IVmaj7)</code>, ein wehmütiges <code>f-Moll6 (iv6)</code> oder <code>a-Moll9 (vi9)</code>. Sofort erzählt dieselbe Melodie eine andere emotionale Geschichte.
      </p>
      <div class="k-btn-row" style="margin-top:0.45rem;margin-bottom:0.65rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-plain">▶ Melodie (E–D–C) über schlichtem Dur (I–V–I)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-cinema">▶ Exakt gleiche Melodie cineastisch reharmonisiert</button>
      </div>
      <div class="k-meta-box">
        <div><strong>Die 5-Fragen-Checkliste für jedes eigene Arrangement:</strong></div>
        <div>1. <strong>Wer hat gerade das Wort?</strong> Zu jedem Zeitpunkt sollte maximal <em>ein</em> Element im vollen Rampenlicht stehen.</div>
        <div>2. <strong>Wo sind die Atemlöcher?</strong> Platziere Fills und Gegenmelodien gezielt in die Pausen der Hauptmelodie.</div>
        <div>3. <strong>Ist der Tieftonbereich sauber?</strong> Unter <code>C3</code> keine engen Terzen schichten – dort regieren Grundton, Quinte und Oktave.</div>
        <div>4. <strong>Hört man den Unterschied zwischen Strophe und Refrain sofort?</strong> Nutze Kontraste in Registerhöhe, Rhythmik und Instrumentenanzahl.</div>
        <div>5. <strong>Der Stummschalt-Test (Mute-Test):</strong> Schalte eine Spur probeweise stumm. Fehlt dem Song nichts, war sie nur Füllmaterial – gib ihr eine klare Aufgabe oder lass sie mutig weg!</div>
      </div>
      <div class="k-btn-row" style="margin-top:0.55rem;">
        <button type="button" class="btn-tool" data-jump-ref="ensembles">Zu Orchester &amp; Bands →</button>
        <button type="button" class="btn-tool" data-jump-ref="cadences">Zu Kadenzen &amp; Harmonien →</button>
        <button type="button" class="btn-tool" data-jump-ref="physics">Zu Physik &amp; Obertönen →</button>
      </div>
    </article>
  `;
}
