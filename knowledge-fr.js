/**
 * Lauscher • Base de connaissances, guides interactifs & articles en français ("fr")
 * Théorie musicale, acoustique et organologie rédigées en français idiomatique.
 */

const INTERVAL_ENCYCLOPEDIA_FR = [
  {
    key: "P1",
    symbol: "P1",
    name: "Unisson juste",
    semitones: 0,
    ratio: "1 : 1",
    ratioExplain: "1 : 1 signifie que les deux notes vibrent exactement à la même vitesse. Pendant que la note 1 accomplit un cycle, la note 2 en accomplit un : c’est rigoureusement la même hauteur.",
    category: "pure",
    mood: "Fusion totale, repos, identité",
    physics: "Les deux sons partagent exactement la même fréquence (ex. 261,6 Hz et 261,6 Hz). Leurs ondes sonores se superposent à l’unisson parfait.",
    songsAsc: "« One Note Samba » (mélodie du couplet sur une seule note), début de « Thank You for the Music » (ABBA – deux premières syllabes)",
    songsDesc: "Toute note répétée en motif rythmique (ex. l’intro de « Poker Face » de Lady Gaga)"
  },
  {
    key: "m2",
    symbol: "m2",
    name: "Seconde mineure",
    semitones: 1,
    ratio: "16 : 15",
    ratioExplain: "16 : 15 signifie que la note aiguë vibre à peine plus vite que la note grave. Leurs crêtes ne coïncident que tous les 16 cycles (ou 15 de la note grave), créant de nets battements entre les deux.",
    category: "tension",
    mood: "Furtive, tendue, mystérieuse, pressante (Note sensible !)",
    physics: "Les ondes mettent 16 cycles à se resynchroniser. Comme les deux hauteurs sont très proches dans l’oreille interne, elles produisent une forte rugosité acoustique.",
    songsAsc: "Thème des « Dents de la mer » (Jaws), « La Panthère rose » (pas chromatique), « La Lettre à Élise » (Mi–Ré#–Mi)",
    songsDesc: "« La Lettre à Élise » (Beethoven – deux premières notes Mi → Ré#), « Joy to the World » (premier pas descendant)"
  },
  {
    key: "M2",
    symbol: "M2",
    name: "Seconde majeure",
    semitones: 2,
    ratio: "9 : 8",
    ratioExplain: "9 : 8 signifie que 8 vibrations de la note grave coïncident avec 9 vibrations de la note aiguë. Assez proches pour rester liées, mais assez espacées pour dessiner un pas mélodique clair.",
    category: "major",
    mood: "Pas naturel, narratif, ouvert, début de mélodie",
    physics: "Le rapport 9:8 naît naturellement en empilant deux quintes justes avant de redescendre d’une octave. On l’entend comme un premier pas hors de chez soi.",
    songsAsc: "« Frère Jacques » (Do → Ré), « Joyeux Anniversaire » (« Jo-yeux anni-VER-saire »), « Douce nuit »",
    songsDesc: "« Yesterday » (The Beatles – « Yes-ter-day »), « Marie avait un petit agneau »"
  },
  {
    key: "m3",
    symbol: "m3",
    name: "Tierce mineure",
    semitones: 3,
    ratio: "6 : 5",
    ratioExplain: "6 : 5 signifie que pendant que la note grave vibre 5 fois, la note aiguë vibre 6 fois. Un rapport compact et stable qui sonne chaleureux, doux et profondément expressif.",
    category: "minor",
    mood: "Intime, chaleureuse, mélancolique, posée et expressive",
    physics: "À 6:5, le rapport reste très doux (consonant), mais plus resserré que la tierce majeure — c’est le cœur émotionnel de tout accord mineur.",
    songsAsc: "« Seven Nation Army » (The White Stripes – premier saut du riff), « Greensleeves », « Smoke on the Water » (premier pas)",
    songsDesc: "« Hey Jude » (The Beatles – « Hey Jude »), le chant du coucou dans les bois, « So Long, Farewell »"
  },
  {
    key: "M3",
    symbol: "M3",
    name: "Tierce majeure",
    semitones: 4,
    ratio: "5 : 4",
    ratioExplain: "5 : 4 signifie que 5 cycles de la note aiguë tiennent proprement dans 4 cycles de la fondamentale. Comme 5 et 4 sont de petits entiers, les deux sons fusionnent en une couleur majeure rayonnante.",
    category: "major",
    mood: "Lumineuse, amicale, franche, confiante (le cœur de la triade majeure)",
    physics: "Le rapport 5:4 apparaît naturellement très tôt dans la série des harmoniques (5e harmonique) de toute voix ou corde pincée.",
    songsAsc: "« When the Saints Go Marching In », « Morning Has Broken » (Cat Stevens), « Kumbaya »",
    songsDesc: "« Summertime » (Gershwin), « Swing Low, Sweet Chariot », le motif initial de la 5e Symphonie de Beethoven"
  },
  {
    key: "P4",
    symbol: "P4",
    name: "Quarte juste",
    semitones: 5,
    ratio: "4 : 3",
    ratioExplain: "4 : 3 signifie que pendant que la note grave vibre 3 fois, la note aiguë vibre 4 fois. Toutes les 3 vagues, les deux crêtes se retrouvent exactement alignées !",
    category: "pure",
    mood: "Appel, solennelle, fanfare, grand espace ouvert",
    physics: "Renversement de la quinte juste dans l’octave, la quarte possède un rapport net de 4:3. Seule, elle est très stable ; au-dessus d’une basse, elle appelle souvent une descente vers la tierce.",
    songsAsc: "« La Marseillaise » (levée « Al-lons »), « Marche nuptiale » (Wagner), thème d’« Harry Potter » (Hedwig)",
    songsDesc: "« Une petite musique de nuit » (Mozart – deuxième intervalle), « Adeste Fideles »"
  },
  {
    key: "TT",
    symbol: "TT",
    name: "Triton (4te aug. / 5te dim.)",
    semitones: 6,
    ratio: "env. 45 : 32",
    ratioExplain: "45 : 32 signifie que les deux ondes peinent à trouver un point d’entente : elles ne se réalignent qu’après 32 et 45 cycles. L’oreille perçoit ce croisement permanent comme une tension électrique !",
    category: "tension",
    mood: "Flottant, mystérieux, électrisant, irrésolu",
    physics: "Coupe l’octave exactement en deux (6 demi-tons). Faute de multiple simple commun, il engendre un frottement harmonique indubitable — le moteur interne de l’accord de dominante (V7).",
    songsAsc: "Générique des « Simpson » (« The Simp-sons »), « Maria » (West Side Story)",
    songsDesc: "« Black Sabbath » (riff d’ouverture), « YYZ » (Rush)"
  },
  {
    key: "P5",
    symbol: "P5",
    name: "Quinte juste",
    semitones: 7,
    ratio: "3 : 2",
    ratioExplain: "3 : 2 signifie que la note aiguë vibre exactement une fois et demie (1,5×) plus vite que la fondamentale. Deux vagues graves contiennent trois vagues aiguës sans aucune oscillation : stabilité pure !",
    category: "pure",
    mood: "Héroïque, puissante, enracinée, limpide (ossature des power chords)",
    physics: "Juste après l’octave, 3:2 est le rapport de fréquences le plus simple de la musique. C’est pourquoi même une guitare électrique très saturée jouant des quintes garde un son net.",
    songsAsc: "Thème principal de « Star Wars », « Ah ! vous dirai-je, maman », « Ainsi parlait Zarathoustra » (2001)",
    songsDesc: "Thème des « Pierrafeu » (The Flintstones), générique de « Game of Thrones » (premier saut descendant)"
  },
  {
    key: "m6",
    symbol: "m6",
    name: "Sixte mineure",
    semitones: 8,
    ratio: "8 : 5",
    ratioExplain: "8 : 5 signifie que 5 cycles de la fondamentale correspondent à 8 cycles de la note aiguë. Le geste paraît ample, lyrique et teinté d’une douce nostalgie.",
    category: "minor",
    mood: "Nostalgique, dramatique, douce-amère, cinématographique",
    physics: "Renversement de la tierce majeure (8:5). Elle associe une grande amplitude mélodique à la tendresse du mode mineur.",
    songsAsc: "« The Entertainer » (Scott Joplin – après l’anacrouse), « In My Life » (The Beatles – intro guitare), « Love Story » (Taylor Swift – refrain)",
    songsDesc: "Thème du film « Love Story » (Where Do I Begin)"
  },
  {
    key: "M6",
    symbol: "M6",
    name: "Sixte majeure",
    semitones: 9,
    ratio: "5 : 3",
    ratioExplain: "5 : 3 signifie que pendant que la fondamentale vibre 3 fois, la note aiguë vibre 5 fois. Ces petits nombres entiers donnent à ce grand saut une chaleur chantante toute particulière.",
    category: "major",
    mood: "Rayonnante, généreuse, pastorale, accueillante",
    physics: "Étroitement liée à la tierce mineure (son renversement), le rapport 5:3 sonne fluide, lyrique et très naturel à chanter.",
    songsAsc: "« My Bonnie Lies Over the Ocean », « Vive le vent » (couplet), jingle NBC",
    songsDesc: "« The Music of the Night » (Le Fantôme de l’Opéra), « Man in the Mirror » (Michael Jackson – « I’m gonna make a change »)"
  },
  {
    key: "m7",
    symbol: "m7",
    name: "Septième mineure",
    semitones: 10,
    ratio: "16 : 9",
    ratioExplain: "16 : 9 (ou 7 : 4 dans la série naturelle des harmoniques) s’arrête juste avant le doublement de l’octave (2:1). Ce léger écart confère au blues, à la soul et au funk leur attrait détendu.",
    category: "tension",
    mood: "Bluesy, décontractée, soul, avec une attraction douce vers le bas",
    physics: "Apparaît naturellement comme le 7e harmonique (7:4). Plutôt que de sonner dure, elle assouplit la rigidité et propulse les accords de 7e de dominante.",
    songsAsc: "« The Winner Takes It All » (ABBA), « Somewhere » (West Side Story – « There’s a place for us »), thème original de « Star Trek »",
    songsDesc: "« Watermelon Man » (Herbie Hancock)"
  },
  {
    key: "M7",
    symbol: "M7",
    name: "Septième majeure",
    semitones: 11,
    ratio: "15 : 8",
    ratioExplain: "15 : 8 se trouve à un seul petit demi-ton de 16 : 8 (l’octave 2:1 !). Comme les deux sons se frôlent sans fusionner à l’octave, l’intervalle scintille d’une tension raffinée.",
    category: "tension",
    mood: "Rêveuse et veloutée (dans un accord Maj7) ou mordante et tendue (isolée)",
    physics: "À un demi-ton sous l’octave (15:8). Jouée nue contre la basse, elle frotte vivement ; mais enveloppée dans une triade majeure (DoMaj7), elle devient toute douceur jazz.",
    songsAsc: "« Take On Me » (a-ha – début du refrain), « Don’t Know Why » (Norah Jones), thème de « Superman » (pont)",
    songsDesc: "« I Love You » (Cole Porter)"
  },
  {
    key: "P8",
    symbol: "P8",
    name: "Octave juste",
    semitones: 12,
    ratio: "2 : 1",
    ratioExplain: "2 : 1 signifie que la note aiguë vibre exactement deux fois plus vite que la note grave (demi-longueur d’onde). Chaque vague longue encadre proprement deux vagues courtes : elles fusionnent presque en un seul son !",
    category: "pure",
    mood: "Espace, clarté, accomplissement — la même note à l’étage supérieur",
    physics: "Doublement exact de la fréquence (2:1). Quand des hommes et des femmes ou des adultes et des enfants chantent la « même » mélodie, ils chantent spontanément à l’octave.",
    songsAsc: "« Somewhere Over the Rainbow » (Le Magicien d’Oz), « Singin’ in the Rain »",
    songsDesc: "« Willow Weep for Me »"
  },
  {
    key: "m9",
    symbol: "m9",
    name: "Neuvième mineure",
    semitones: 13,
    ratio: "32 : 15",
    ratioExplain: "32 : 15 signifie que la note aiguë vibre un peu plus de deux fois plus vite que la fondamentale (octave + seconde mineure). Ce rapport tendu crée un mordant harmonique intense et ardent.",
    category: "tension",
    mood: "Exotique, dramatique, haute tension (flamenco & jazz altéré)",
    physics: "Une octave plus un demi-ton. L’écart d’octave adoucit un peu la dureté rapprochée de la seconde mineure, tout en conservant son caractère incisif.",
    songsAsc: "Accords de dominante altérés en jazz (V7b9) et traits de guitare flamenco",
    songsDesc: "Accents dramatiques de musiques de film"
  },
  {
    key: "M9",
    symbol: "M9",
    name: "Neuvième majeure",
    semitones: 14,
    ratio: "9 : 4",
    ratioExplain: "9 : 4 signifie que pendant que la fondamentale vibre 4 fois, la note aiguë accomplit 9 cycles (plus du double). Ce grand écart donne une couleur aérienne, lumineuse et moderne.",
    category: "major",
    mood: "Aérienne, moderne, flottante et soyeuse (pop & néo-soul)",
    physics: "Une octave plus une seconde majeure (ou deux quintes empilées : Do → Sol → Ré). Donne une largeur scintillante aux accords add9 et maj9.",
    songsAsc: "« Every Breath You Take » (The Police – le célèbre arpège de guitare monte tout droit jusqu’à la 9e !)",
    songsDesc: "Voicings de piano pop et R&B contemporains"
  }
];

const CADENCE_ENCYCLOPEDIA_FR = [
  {
    id: "authentic",
    category: "classic",
    name: "La cadence parfaite classique",
    formula: "I – IV – V – I",
    tag: "Fondation & Maison",
    tagClass: "tag-sage",
    bars: ["I", "IV", "V", "I"],
    whyItWorks: "Raconte une histoire complète en quatre mesures : **I (Tonique)** pose le décor de la maison. **IV (Sous-dominante)** ouvre la porte et part explorer. **V (Dominante)** crée la tension maximale grâce à sa note sensible, puis **I** ramène tout au repos.",
    songs: [
      "« Twist and Shout » – The Beatles (I – IV – V)",
      "« La Bamba » – Ritchie Valens",
      "« Three Little Birds » – Bob Marley",
      "D’innombrables chansons populaires et standards intemporels"
    ]
  },
  {
    id: "plagal-amen",
    category: "classic",
    name: "La cadence plagale (« Amen »)",
    formula: "I – IV – I",
    tag: "Douce & Solennelle",
    tagClass: "tag-sage",
    bars: ["I", "IV", "I"],
    whyItWorks: "Contrairement à la Dominante tendue (**V**), l’accord **IV** ne comporte pas de note sensible appelant brutalement la tonique. Ainsi **IV → I** ne claque pas : il se pose avec chaleur et douceur, comme le célèbre « Amen » des cantiques.",
    songs: [
      "« Hey Jude » – The Beatles (longue coda « Na-na-na » sur bVII–IV–I)",
      "« Let It Be » – The Beatles (interlude Fa–Do)",
      "Fins de gospels et chorals traditionnels (« Amen »)"
    ]
  },
  {
    id: "half-cadence",
    category: "classic",
    name: "La demi-cadence (Question ouverte)",
    formula: "I – IV – ii – V",
    tag: "Tension suspendue",
    tagClass: "tag-peach",
    bars: ["I", "IV", "ii", "V"],
    whyItWorks: "S’arrêter en pleine phrase sur la **Dominante (V)** agit comme deux points musicaux : « attention, la suite arrive ! » Dans un couplet ou pré-refrain, cette suspension rend l’entrée du refrain sur **I** d’autant plus forte.",
    songs: [
      "Thèmes de sonates classiques (Mozart, Haydn)",
      "Presque tous les pré-refrains pop juste avant l’explosion du refrain",
      "« Yesterday » – The Beatles (fin de phrase suspendue sur la Dominante)"
    ]
  },
  {
    id: "pachelbel",
    category: "classic",
    name: "La marche de Pachelbel",
    formula: "I – V – vi – iii – IV – I – IV – V",
    tag: "Du Baroque à la Pop",
    tagClass: "tag-lilac",
    bars: ["I", "V", "vi", "iii", "IV", "I", "IV", "V"],
    stepMs: 1500,
    chordDur: 1.38,
    whyItWorks: "Un coup de génie à la basse datant de 1680 : la basse descend et bondit avec évidence (**Do → Sol → La → Mi → Fa → Do → Fa → Sol**). Chaque maillon s’emboîte sans accroc, créant une boucle de huit mesures à la fois sereine et propulsive.",
    songs: [
      "« Canon en Ré » – Johann Pachelbel",
      "« Basket Case » – Green Day",
      "« Memories » – Maroon 5",
      "« Go West » – Village People / Pet Shop Boys"
    ]
  },
  {
    id: "pop4",
    category: "pop",
    name: "Les « 4 accords magiques » de la pop",
    formula: "I – V – vi – IV",
    tag: "Classique Pop",
    tagClass: "tag-peach",
    bars: ["I", "V", "vi", "IV"],
    whyItWorks: "Sans doute la suite la plus fructueuse des 50 dernières années ! Son secret : au beau milieu se cache une **cadence rompue (V → vi)** qui pince instantanément le cœur. Et terminer sur **IV** laisse l’accord ouvert pour boucler le refrain à l’infini.",
    songs: [
      "« Let It Be » – The Beatles (couplet)",
      "« Someone Like You » – Adele (refrain)",
      "« With or Without You » – U2",
      "« No Woman, No Cry » – Bob Marley",
      "« Don’t Stop Believin’ » – Journey"
    ]
  },
  {
    id: "doowop",
    category: "pop",
    name: "L’anatole des années 50 / Doo-Wop",
    formula: "I – vi – IV – V",
    tag: "Soul & Rétro",
    tagClass: "tag-lilac",
    bars: ["I", "vi", "IV", "V"],
    whyItWorks: "Depuis la Tonique lumineuse (**I**), l’harmonie glisse tendrement vers son **relatif mineur (vi)** — qui partage deux notes communes ! De là, **IV** et **V** créent un élan nostalgique irrésistible vers la première mesure.",
    songs: [
      "« Stand By Me » – Ben E. King",
      "« Every Breath You Take » – The Police",
      "« Unchained Melody » – The Righteous Brothers",
      "« Happiness Is a Warm Gun » – The Beatles (coda)"
    ]
  },
  {
    id: "sad-pop",
    category: "pop",
    name: "La boucle pop émotionnelle en mineur",
    formula: "vi – IV – I – V",
    tag: "Mélancolie & Élan",
    tagClass: "tag-lilac",
    bars: ["vi", "IV", "I", "V"],
    whyItWorks: "L’astuce géniale : ce sont exactement les quatre mêmes accords que « I – V – vi – IV », simplement décalés pour démarrer sur le **relatif mineur (vi)** ! Ce départ mineur transforme l’humeur solaire en intensité poignante tout en gardant la puissance de **I** et **V**.",
    songs: [
      "« Zombie » – The Cranberries (Mim – Do – Sol – Ré)",
      "« Save Tonight » – Eagle-Eye Cherry",
      "« Numb » – Linkin Park",
      "« Hello » – Adele (couplet)"
    ]
  },
  {
    id: "minor-plagal",
    category: "pop",
    name: "La sous-dominante mineure (douce-amère)",
    formula: "I – IV – iv – I",
    tag: "Cinéma & Nostalgie",
    tagClass: "tag-peach",
    bars: ["I", "IV", "iv", "I"],
    whyItWorks: "L’un des gestes les plus émouvants de l’harmonie : on se dirige avec entrain vers **IV (Fa majeur)**, avant que ce même accord ne fonde en **iv (Fa mineur)** — un *emprunt modal* au Do mineur. À l’intérieur, le **La** descend d’un demi-ton vers **Lab**, puis glisse vers **Sol** sur I.",
    songs: [
      "« In My Life » – The Beatles",
      "« Don’t Look Back in Anger » – Oasis (pré-refrain Fa → Fam → Do)",
      "« Wake Me Up When September Ends » – Green Day",
      "Ballades Disney classiques & fins de films de l’âge d’or"
    ]
  },
  {
    id: "creep-chromatic",
    category: "pop",
    name: "La ligne chromatique ascendante (« Creep »)",
    formula: "I – III7 – IV – iv",
    tag: "Classique poignant",
    tagClass: "tag-lilac",
    bars: ["I", "III7", "IV", "iv"],
    whyItWorks: "Écoutez la voix intérieure cachée : **Do (I)** tient **Sol** ; le majeur inattendu **Mi7 (III7)** le hisse vers **Sol#** ; **Fa (IV)** monte à **La** ; et **Fam (iv)** redescend avec nostalgie vers **Lab**. Ce fil chromatique (**Sol → Sol# → La → Lab**) soude toute la grille.",
    songs: [
      "« Creep » – Radiohead",
      "« The Air That I Breathe » – The Hollies",
      "« Get Free » – Lana Del Rey"
    ]
  },
  {
    id: "royal-road",
    category: "pop",
    name: "La « Voie Royale » (Ōdō Shinkō)",
    formula: "IV – V – iii – vi",
    tag: "Hymne J-Pop & Anime",
    tagClass: "tag-sage",
    bars: ["IV", "V", "iii", "vi"],
    whyItWorks: "Célèbre au Japon comme la progression royale : elle démarre déjà lancée sur **IV**, traverse **V** à toute allure, puis esquive **I** pour glisser par **iii** vers **vi**. Éviter la résolution complète crée cet élan cinématographique sans fin.",
    songs: [
      "« Stay With Me » – Miki Matsubara (City Pop)",
      "« Never Gonna Give You Up » – Rick Astley (refrain)",
      "Innombrables génériques d’anime & thèmes Nintendo (Mario Kart / Zelda)"
    ]
  },
  {
    id: "sus4-resolve",
    category: "pop",
    name: "La résolution de dominante suspendue (sus4)",
    formula: "I – IV – Vsus4 – V – I",
    tag: "Suspension élégante",
    tagClass: "tag-sage",
    bars: ["I", "IV", "Vsus4", "V", "I"],
    whyItWorks: "Sur **Vsus4**, la tierce majeure de la dominante (**Si** dans l’accord de Sol) est retenue et remplacée par la quarte (**Do**). Cette suspension lumineuse glisse ensuite d’un demi-ton (**Do → Si**) vers le **V** pur avant d’atterrir sur **I**.",
    songs: [
      "« Crazy Little Thing Called Love » – Queen",
      "« Pinball Wizard » – The Who",
      "« The Scientist » / hymnes au piano de Coldplay"
    ]
  },
  {
    id: "deceptive",
    category: "epic",
    name: "La cadence rompue (Évitée)",
    formula: "I – IV – V – vi",
    tag: "Rebondissement",
    tagClass: "tag-lilac",
    bars: ["I", "IV", "V", "vi"],
    whyItWorks: "Après **I – IV – V**, votre cerveau attend avec certitude un **I** majeur triomphant. La sensible monte bien vers Do — mais dessous, la basse tombe sur **La** au lieu de Do (donnant **La mineur**). Frisson de surprise garanti !",
    songs: [
      "« Hallelujah » – Leonard Cohen (sur « the minor fall, the major lift… »)",
      "« Livin’ on a Prayer » – Bon Jovi",
      "Grands climax de musiques de film (Hans Zimmer, John Williams)"
    ]
  },
  {
    id: "mario-cadence",
    category: "epic",
    name: "La cadence « Mario » (Fanfare de victoire)",
    formula: "I – bVI – bVII – I",
    tag: "Fanfare Jeu Vidéo",
    tagClass: "tag-peach",
    bars: ["I", "bVI", "bVII", "I"],
    whyItWorks: "Deux accords majeurs empruntés directement au mineur parallèle — **bVI (Lab majeur)** et **bVII (Sib majeur)** — gravissent deux tons entiers (**Lab → Sib → Do**), déclenchant aussitôt une sensation d’aventure et de niveau gagné !",
    songs: [
      "« Super Mario Bros. » – Fanfare de fin de niveau (Nintendo)",
      "« With a Little Help from My Friends » – The Beatles / Joe Cocker (final)",
      "« P.S. I Love You » – The Beatles & finales rock grandioses"
    ]
  },
  {
    id: "mixolydian-rock",
    category: "epic",
    name: "La cadence Rock de stade (Mixolydienne)",
    formula: "I – bVII – IV – I",
    tag: "Rock & Assurance",
    tagClass: "tag-sage",
    bars: ["I", "bVII", "IV", "I"],
    whyItWorks: "Sans sensible académique : remplacer V par **bVII (Sib majeur en Do)** confère à la tonique une démarche rock mixolydienne terrienne et rebelle. On descend d’un ton entier de **I** à **bVII**, puis on roule avec puissance sur **IV** vers **I**.",
    songs: [
      "« Sweet Child o’ Mine » – Guns N’ Roses",
      "« Sympathy for the Devil » – The Rolling Stones",
      "« Hey Jude » – The Beatles (vamp du refrain)",
      "« Royals » – Lorde"
    ]
  },
  {
    id: "andalusian",
    category: "epic",
    name: "La cadence andalouse",
    formula: "vi – V – IV – III7",
    tag: "Flamenco & Drame",
    tagClass: "tag-peach",
    bars: ["vi", "V", "IV", "III7"],
    whyItWorks: "Des siècles de fougue en quatre accords : la basse descend implacablement degré par degré (**La → Sol → Fa → Mi**) avant de s’embraser sur la dominante majeure **Mi7 (III7)**, qui relance irrésistiblement le cycle.",
    songs: [
      "« Hit the Road Jack » – Ray Charles",
      "« Smooth Criminal » – Michael Jackson",
      "« Sultans of Swing » – Dire Straits (fin de couplet)",
      "« Stairway to Heaven » – Led Zeppelin (final rock)"
    ]
  },
  {
    id: "jazz251",
    category: "jazz",
    name: "Le II–V–I (Cadence reine du Jazz)",
    formula: "ii – V7 – I – I",
    tag: "Jazz & Soul",
    tagClass: "tag-sage",
    bars: ["ii", "V7", "I", "I"],
    whyItWorks: "En jazz et en soul, la sus-tonique mineure (**ii**, Rém en Do) remplace IV. L’enchaînement **ii → V7 → I** fait descendre la basse d’une quinte juste à chaque accord (Ré → Sol → Do) : le mouvement harmonique le plus naturel d’Occident.",
    songs: [
      "« Sunday Morning » – Maroon 5 (quasi tout le morceau repose sur ii – V7 – I !)",
      "« Les Feuilles mortes » (Autumn Leaves) – Standard jazz",
      "« Fly Me to the Moon » – Frank Sinatra"
    ]
  },
  {
    id: "jazz1625",
    category: "jazz",
    name: "L’anatole Swing (I–vi–ii–V)",
    formula: "Imaj7 – vi – ii – V7 – Imaj7",
    tag: "Swing & Standards",
    tagClass: "tag-lilac",
    bars: ["Imaj7", "vi", "ii", "V7", "Imaj7"],
    whyItWorks: "Le cousin adulte et jazzy du doo-wop : ajouter la septième majeure à **Imaj7 (DoMaj7)** drape le foyer d’un éclat velouté avant que **vi → ii → V7** ne glisse autour du cycle des quintes.",
    songs: [
      "« I Got Rhythm » – George Gershwin (Anatole / Rhythm Changes)",
      "« Blue Moon » – Richard Rodgers",
      "« Heart and Soul » – Hoagy Carmichael"
    ]
  },
  {
    id: "tritonesub",
    category: "jazz",
    name: "La substitution tritonique",
    formula: "ii – bII7 – I – I",
    tag: "Arme secrète Jazz",
    tagClass: "tag-peach",
    bars: ["ii", "bII7", "I", "I"],
    whyItWorks: "Comment **Réb7 (bII7)** peut-il remplacer **Sol7 (V7)** en Do majeur ? Parce que les deux partagent exactement le même **triton** directeur (**Fa et Si/Dob**) ! Pendant ce temps, la basse glisse chromatiquement vers la maison : **Ré → Réb → Do**.",
    songs: [
      "« The Girl from Ipanema » – Antônio Carlos Jobim",
      "Cadences signatures du lo-fi hip-hop, néo-soul et gospel"
    ]
  },
  {
    id: "blues12",
    category: "jazz",
    name: "La grille de Blues dominante",
    formula: "I7 – IV7 – I7 – V7 – IV7 – I7",
    tag: "Blues & Rock’n’Roll",
    tagClass: "tag-peach",
    bars: ["I7", "IV7", "I7", "V7", "IV7", "I7"],
    whyItWorks: "L’harmonie classique réserve l’accord 7e de dominante au seul degré V. Le blues jette cette règle par la fenêtre et pare chaque degré principal (**I7, IV7, V7**) du frottement mordant entre tierce majeure et septième mineure — pur jus blues.",
    songs: [
      "« Johnny B. Goode » – Chuck Berry",
      "« Hound Dog » – Elvis Presley",
      "« Sweet Home Chicago » – Robert Johnson / The Blues Brothers"
    ]
  }
];

const SOLFEGE_STEPS_FR = [
  {
    syllable: "Do",
    degree: "1er degré (Tonique)",
    semitones: 0,
    resolvePath: [0],
    resolveDesc: "Déjà au repos à la maison sur la Tonique (Do répété confirme la stabilité)",
    color: "sage",
    character: "Inébranlable, paisible, arrivée à la maison",
    desc: "Chaque autre degré tire sa tension uniquement de son lien avec Do. Lorsqu’une mélodie se pose sur Do, votre oreille souffle enfin."
  },
  {
    syllable: "Re",
    degree: "2e degré (Sus-tonique)",
    semitones: 2,
    resolvePath: [2, 0],
    resolveDesc: "Se résout vers le bas sur la Tonique : Re → Do",
    color: "peach",
    character: "Flottant, curieux, en mouvement",
    desc: "Re s’installe confortablement entre Do et Mi. Finir une phrase sur Re sonne ouvert et interrogatif — il penche naturellement vers Do."
  },
  {
    syllable: "Mi",
    degree: "3e degré (Tierce majeure)",
    semitones: 4,
    resolvePath: [4, 2, 0],
    resolveDesc: "Descend calmement la gamme : Mi → Re → Do",
    color: "sage",
    character: "Chaleureux, lumineux, rassurant, stable",
    desc: "Mi définit le caractère majeur de la tonalité. Pour rentrer à la maison, il glisse paisiblement par Re jusqu’à la tonique Do."
  },
  {
    syllable: "Fa",
    degree: "4e degré (Sous-dominante)",
    semitones: 5,
    resolvePath: [5, 4, 2, 0],
    resolveDesc: "Se résout vers le bas sur la Tonique : Fa → Mi → Re → Do",
    color: "peach",
    character: "Grave, appuyé, attiré vers le bas",
    desc: "Fa n’est qu’à un seul demi-ton au-dessus de Mi ! Ce pas serré crée une forte gravité descendante : Fa tombe d’abord sur Mi puis descend par Re jusqu’à Do."
  },
  {
    syllable: "Sol",
    degree: "5e degré (Dominante)",
    semitones: 7,
    resolvePath: [7, 9, 11, 12],
    resolveDesc: "Grimpe vers la Tonique supérieure : Sol → La → Ti → Do",
    color: "sage",
    character: "Rayonnant, ouvert, solide, deuxième pilier",
    desc: "À partir de Sol, la moitié supérieure de l’octave s’élance vers le Do aigu (Sol → La → Ti → Do)."
  },
  {
    syllable: "La",
    degree: "6e degré (Relatif mineur)",
    semitones: 9,
    resolvePath: [9, 11, 12],
    resolveDesc: "Grimpe vers la Tonique supérieure : La → Ti → Do",
    color: "lilac",
    character: "Lyrique, tendre, légèrement doux-amer",
    desc: "La est aussi la fondamentale de la gamme relative mineure. Dans l’écoute tonale majeure, La passe par la sensible Ti pour rejoindre le Do aigu."
  },
  {
    syllable: "Ti",
    degree: "7e degré (Note sensible)",
    semitones: 11,
    resolvePath: [11, 12],
    resolveDesc: "Résolution magnétique directe de la sensible : Ti → Do",
    color: "peach",
    character: "Magnétique, urgent, tendu vers le haut",
    desc: "Ti se penche à un minuscule demi-ton sous le Do aigu. Aucune autre note de la gamme n’appelle sa résolution aussi ardemment que Ti → Do !"
  }
];

const KNOWLEDGE_ARTICLES_FR = [
  {
    id: "art-why-ear-training",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a6 6 0 1 1 11.4 2.5c-.6 1.3-1.4 1.9-1.9 3.1-.4 1-.5 2.4-1.7 3.2A2.5 2.5 0 0 1 10 15"/><path d="M10.5 8.5a2.2 2.2 0 0 1 4 1.2c0 .9-.6 1.4-1 2.2"/><path d="M19.5 6.5a8 8 0 0 1 0 7"/></svg>`,
    badgeClass: "badge-sage",
    title: "Pourquoi éduquer son oreille ?",
    subtitle: "Ce qu’une oreille entraînée débloque, à qui cela sert et comment commencer",
    tag: "Bases & Motivation",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Pourquoi travailler l’oreille ?</span>
        <h2>Le pont entre votre imagination et votre instrument</h2>
        <p class="article-lead">
          Vous avez sûrement déjà vécu cela : vous entendez une mélodie entraînante dans votre tête ou écoutez un morceau préféré, mais devant votre instrument vous tâtonnez pour trouver les bonnes notes. La <strong>formation de l’oreille</strong> relie ces deux mondes pour que motifs, tensions harmoniques et groove deviennent immédiatement limpides à l’écoute.
        </p>

        <h3>Quelles compétences concrètes cela vous apporte-t-il ?</h3>
        <ul class="article-steps-list">
          <li><strong>Relever mélodies et morceaux plus vite :</strong> Au lieu de chercher chaque note au hasard, vous reconnaissez d’emblée les sauts (<em>« C’est une quinte juste montante ! »</em>) et les grilles familières (<em>« C’est un I–V–vi–IV ! »</em>).</li>
          <li><strong>Jouer plus librement, improviser et composer :</strong> Dès que vous sentez l’effet d’une sous-dominante, d’une sensible ou d’une syncope, le jeu en groupe, la composition et l’arrangement en STAN coulent de source.</li>
          <li><strong>Meilleure justesse et mise en place collective :</strong> Vous sentez plus tôt si votre voix ou votre corde est juste, comment deux timbres fusionnent et où se niche le « pocket » du groupe.</li>
          <li><strong>Entendre les partitions et grilles intérieurement :</strong> Une grille d’accords cesse d’être de l’encre sur papier — vous l’entendez avant même de poser les doigts.</li>
        </ul>

        <h3>À qui profite cet entraînement ?</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Débutants &amp; Curieux (dès 8 ans)</h5>
            <p>Pas besoin de solfège académique ni de longues études. Apprenez par l’écoute curieuse et la comparaison directe en développant une vraie intuition musicale dès le premier jour.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Instrumentistes &amp; Chanteurs</h5>
            <p>Idéal pour gagner en autonomie sans partition à la guitare, au piano ou dans les vents, et affiner votre écoute harmonique en chœur ou en groupe.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>Auteurs-compositeurs, Beatmakers &amp; Producteurs</h5>
            <p>Accélère votre travail en studio pour repérer boucles d’accords, lignes de basse, grooves de batterie et équilibres de fréquences dans le mix.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Musiciens avancés &amp; Examens</h5>
            <p>Progressez jusqu’aux substitutions tritoniques, aux 15 intervalles chromatiques, aux mesures asymétriques, à l’égalisation chirurgicale et aux modulations en solfège.</p>
          </div>
        </div>

        <h3>Le plus grand mythe : faut-il « l’oreille absolue » ?</h3>
        <p>
          <strong>Pas du tout !</strong> L’oreille absolue (nommer une note isolée sans aucun repère) est rare et guère indispensable au quotidien. Presque toute la musique vivante repose sur <strong>l’oreille relative (fonctionnelle)</strong> : la façon dont hauteurs et accords dialoguent <em>les uns par rapport aux autres</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Preuve immédiate : votre oreille entend déjà le contexte</h4>
          <p>En Do majeur comme en Fa majeur, dès qu’une tonalité est posée, vous ressentez naturellement l’appel de la Dominante (<strong>V</strong>) et le soulagement du retour à la Tonique (<strong>I</strong>) :</p>
          <button class="btn-tool" data-play-progression="I,IV,V7,I">▶ Écouter la cadence parfaite (I – IV – V7 – I)</button>
        </div>

        <h3>Progresser régulièrement (la routine des 10 minutes)</h3>
        <ul class="article-steps-list">
          <li><strong>Court et fréquent gagne toujours :</strong> 5 à 10 minutes attentives quatre fois par semaine valent bien mieux qu’un marathon de deux heures le dimanche.</li>
          <li><strong>Impliquez votre corps :</strong> Fredonnez doucement la note cible, marquez le temps au pied et utilisez toujours les boutons de <strong>comparaison A/B</strong> après une erreur.</li>
          <li><strong>La curiosité avant la pression :</strong> Chaque erreur enseigne autant qu’une réussite — c’est précisément la comparaison côte à côte qui sculpte l’oreille.</li>
        </ul>
      </div>
    `
  },
  {
    id: "art-talking-about-music",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9.5 10v3"/><path d="M12.5 8.5v6"/><path d="M15.5 10.5v2"/></svg>`,
    badgeClass: "badge-peach",
    title: "Comment parler de musique ?",
    subtitle: "Partager émotions, images & impressions simplement — sans jargon théorique",
    tag: "Écoute & Dialogue",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Perception &amp; Expression</span>
        <h2>Parler de musique sans notes, sans accords ni jargon</h2>
        <p class="article-lead">
          Un morceau vous touche, vous met en alerte ou dessine tout un paysage intérieur — mais dès qu’on vous demande <em>« Alors, qu’est-ce que tu en penses ? »</em>, il ne sort qu’un vague <em>« C’est pas mal »</em> ou <em>« Pas trop mon truc »</em>. Pourquoi est-ce si difficile de mettre des mots sur l’écoute, et comment y arriver naturellement ?
        </p>

        <p>
          Beaucoup se retiennent par peur de manquer de vocabulaire technique ou de solfège. Pourtant, que ce soit entre amis, en cours ou en répétition, un bon échange n’a presque jamais besoin du <strong>pourquoi</strong> technique. Ce qui compte, c’est le <strong>quoi</strong> : qu’est-ce qui arrive à vos oreilles ? Qu’est-ce qui bouge en vous ? Comment le son évolue-t-il du début à la fin ?
        </p>

        <div class="k-song-ref">
          <strong>Bon à savoir :</strong> Même les grands chefs d’orchestre, compositeurs de film, ingénieurs du son et chefs de chœur utilisent au quotidien des <em>images sensorielles</em>. Dire <em>« Le début ressemble à un brouillard épais, puis au milieu une fenêtre s’ouvre soudain »</em> communique souvent bien plus que des termes techniques secs.
        </div>

        <h3>1. Le déclic d’or : passer du jugement à la perception</h3>
        <p>
          Des verdicts secs comme <em>« ennuyeux »</em>, <em>« bizarre »</em> ou <em>« génial »</em> coupent court à l’échange car ils n’expliquent rien de ce que vous avez perçu. Partager une <strong>perception</strong> ouvre au contraire la discussion en 3 repères simples :
        </p>
        <ul class="article-steps-list">
          <li><strong>Où dans le morceau ?</strong> Situez le moment : <em>« Tout au début »</em>, <em>« Quand ça monte au milieu »</em>, <em>« Juste avant la fin »</em> ou <em>« Sur cette cassure soudaine. »</em></li>
          <li><strong>Qu’est-ce que je ressens là ?</strong> Parlez depuis votre vécu : <em>« Pour moi c’est… »</em>, <em>« J’ai l’impression que… »</em>, <em>« Là je sens comme un appel… »</em></li>
          <li><strong>Quelle image du quotidien correspond ?</strong> Empruntez aux mots de l’espace, de la lumière, du toucher ou du mouvement : <em>« serré »</em>, <em>« chaleureux »</em>, <em>« bousculé »</em>, <em>« comme expirer enfin. »</em></li>
        </ul>

        <h3>2. Six dimensions du quotidien pour décrire l’écoute</h3>
        <p>
          Pas besoin de dictionnaire savant : presque tout ce que l’on ressent en écoutant tient dans ces six champs sensoriels compréhensibles par tous :
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>A. Climat &amp; Nuances émotionnelles</h5>
            <p>Allez un cran plus loin que « joyeux / triste » : est-ce <em>apaisant, nostalgique, fier, espiègle, agité, fragile, solennel, ironique, enraciné</em> ou <em>doux-amer</em> ? Les contrastes fonctionnent à merveille : <em>« Lumineux en surface, mais fatigué dessous. »</em></p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>B. Espace, Proximité &amp; Densité</h5>
            <p>L’instant paraît-il étroit ou vaste ? Oppositions utiles : <em>serré, lourd, chargé, dense</em> vs <em>large, aérien, transparent, épuré</em> — ou encore <em>chuchoté tout près de l’oreille</em> vs <em>lointain, résonnant dans une immense cathédrale</em>.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>C. Couleur, Température &amp; Texture</h5>
            <p>Imaginez toucher ou voir le son : est-il <em>chaud, doré, velouté, mat, terreux, fumé, doux</em> — ou <em>frais, cristallin, argenté, éblouissant, tranchant, granuleux, cassant, métallique</em> ? Pensez aussi au poids : <em>lourd comme la pierre</em> vs <em>léger comme une plume</em>.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>D. Mouvement, Élan &amp; Appui</h5>
            <p>Observez comment votre corps réagit : <em>propulsé, rebondissant, traînant, hésitant, balancé, circulaire, à bout de souffle, posé</em>. Demandez-vous : <em>Est-ce que ça pousse en avant, berce doucement ou fige le temps ?</em></p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>E. Courbe, Tension &amp; Souffle</h5>
            <p>La musique raconte une micro-histoire : <em>prise d’élan, attente, point de bascule, délivrance soudaine, repli, écho qui s’efface, question restée en suspens, retour au calme</em>. Dire <em>« Ici je retiens mon souffle »</em> parle à tout le monde.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>F. Jeu entre les voix</h5>
            <p>Même sans nommer les instruments, décrivez leurs rôles : <em>« Une voix s’avance pour parler tandis que le reste tisse un tapis doux »</em>, <em>« comme une balle qu’on se lance »</em>, <em>« un bloc soudé »</em> ou <em>« chacun parle de son côté. »</em></p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Test sonore : écoutez des contrastes sans théorie</h4>
          <p>Oubliez la théorie dix secondes et notez quelle <strong>sensation concrète</strong> surgit sur chaque paire :</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-dense">▶ Serré &amp; compact</button>
            <button class="btn-tool" data-play-custom="talk-open">▶ Large &amp; aérien</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-warm">▶ Chaud &amp; feutré</button>
            <button class="btn-tool" data-play-custom="talk-sharp">▶ Clair &amp; tranchant</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-drive">▶ Qui pousse en avant</button>
            <button class="btn-tool" data-play-custom="talk-float">▶ Flottant &amp; suspendu</button>
          </div>
        </div>

        <h3>3. Ce qui facilite le dialogue — et ce qui le bloque</h3>
        <p>
          Certaines habitudes coupent involontairement le dialogue musical ou créent des malentendus, surtout entre auditeurs aux repères différents.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>❌ Bloquant &amp; Vague</h5>
            <p><strong>Étiquettes vides :</strong> « Bien / nul / bas de gamme / pro / antimusical. » Ce sont des sentences qui laissent l’autre deviner ce que vous avez vraiment entendu.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>✅ Clair &amp; Ouvert</h5>
            <p><strong>Décrire l’évolution :</strong> « Le début doux m’a tout de suite happé, mais au milieu j’ai senti que ça se pressait un peu et devenait agressif à mes oreilles. »</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>❌ Faux amis techniques</h5>
            <p>Lancer des mots comme « faux », « atonal », « ça sature » ou « trop de dynamique » quand on veut dire « ça frotte fort » ou « ça manque de douceur » : les pros donnent un sens strict à ces mots.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>✅ Images sincères du quotidien</h5>
            <p>Restez simple : « Je n’ai pas le mot savant, mais à cet endroit j’ai l’impression que deux bords se frottent avant de s’adoucir. »</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>❌ Jugements sur les personnes ou styles</h5>
            <p>« Zéro émotion » ou « pure musique d’ascenseur / commerciale ». Étiqueter des gens ou un genre étouffe la curiosité sur-le-champ.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>✅ Nommer texture &amp; contraste</h5>
            <p>« Pour moi le passage s’écoule de manière si lisse et égale que j’en viens à espérer une petite surprise ou un relief accrocheur. »</p>
          </div>
        </div>

        <h3>4. Traducteur d’idées : du flou à la clarté vivante</h3>
        <p>
          Il suffit souvent d’une seule image concrète pour transformer un ressenti flou en quelque chose de limpide pour tout le monde :
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Au lieu de : « Ça sonne un peu bizarre. »</strong>
              <span>Dites : « Quelque chose frotte de façon instable pour moi ici — presque comme une perte d’équilibre passagère. »</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Au lieu de : « C’est super ennuyeux. »</strong>
              <span>Dites : « Ça reste longtemps exactement dans la même pièce émotionnelle ; j’attends une étincelle ou un virage. »</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Au lieu de : « Trop bien ! »</strong>
              <span>Dites : « Cette transition s’ouvre tellement d’un coup qu’on a l’impression de sortir enfin au grand air. »</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Au lieu de : « C’est trop rapide. »</strong>
              <span>Dites : « Pour moi les éléments s’empilent les uns sur les autres ici — ça semble pressé même si le tempo ne bouge pas. »</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Au lieu de : « Trop fort / agaçant ! »</strong>
              <span>Dites : « Dans le passage puissant tout se bouscule et devient très perçant pour mes oreilles. »</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Au lieu de : « Juste triste. »</strong>
              <span>Dites : « Pas tragique — plutôt calme, recueilli et doucement consolant, comme la tombée du soir. »</span>
            </div>
          </div>
        </div>

        <h3>5. Conseils pratiques selon la situation</h3>
        <ul class="article-steps-list">
          <li><strong>Après un concert ou en écoutant entre amis :</strong> Remplacez <em>« T’as aimé ? »</em> par des questions chaleureuses : <em>« Quel moment t’est resté en tête ? »</em>, <em>« Quelle météo ou scène de film irait avec ce morceau ? »</em> ou <em>« Où est-ce que ça t’a embarqué — et où as-tu décroché ? »</em></li>
          <li><strong>En chœur, en groupe ou en cours :</strong> Soulignez d’abord ce qui fonctionne déjà (<em>« Le début a une intimité superbe — sur la reprise j’aimerais encore plus d’élan lumineux »</em>). Et comme élève, osez dire <em>« Ici ça me paraît lourd / tendu / précipité »</em> — un bon professeur traduira tout de suite cette piste sensorielle en outil concret.</li>
          <li><strong>Quand deux personnes entendent tout l’opposé :</strong> Là où vous ressentez de la <em>paix</em>, un autre entend peut-être de la <em>solitude</em>. Nos souvenirs et notre humeur écoutent toujours avec nous — confronter ces ressentis sincères est ce qui rend les échanges musicaux passionnants.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Mémo de poche (4 questions simples partout)</h4>
          <p>Quand les mots manquent, piochez simplement <strong>une</strong> de ces quatre pistes :</p>
          <ul class="article-steps-list">
            <li><strong>Couleur &amp; Climat :</strong> Chaud, doux et sombre — ou clair, frais et tranchant ?</li>
            <li><strong>Espace :</strong> Étroit et tout près — ou vaste, ouvert et aérien ?</li>
            <li><strong>Mouvement :</strong> Qui avance, se balance, trébuche — ou flotte immobile ?</li>
            <li><strong>Moment charnière :</strong> Quel instant précis fait basculer l’atmosphère ?</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "art-4chords",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
    badgeClass: "badge-peach",
    title: "Le phénomène des 4 accords",
    subtitle: "Pourquoi des centaines de tubes mondiaux reposent sur la même grille",
    tag: "Cadences & Pop",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Harmonie dans la Pop</span>
        <h2>Pourquoi 4 accords portent-ils 1 000 tubes mondiaux ?</h2>
        <p class="article-lead">
          Des Beatles (<em>Let It Be</em>) à Toto (<em>Africa</em>), d’Adele (<em>Someone Like You</em>) à Green Day ou Taylor Swift — une formule revient partout : <strong>I – V – vi – IV</strong>.
        </p>

        <div class="article-highlight-box">
          <h4>Écoutez la formule tout de suite (en Do majeur : Do – Sol – Lam – Fa) :</h4>
          <p>Observez comment la couleur émotionnelle bascule de mesure en mesure :</p>
          <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Écouter les 4 accords Pop (I – V – vi – IV)</button>
        </div>

        <h3>La psychologie cachée dans ces quatre mesures</h3>
        <ul class="article-steps-list">
          <li>
            <strong>Mesure 1 – Tonique (I) :</strong> Tout commence net, enraciné et évident. Nous savons immédiatement où se trouve le foyer.
          </li>
          <li>
            <strong>Mesure 2 – Dominante (V) :</strong> Ouvre l’horizon et lance un bel élan vers l’avant.
          </li>
          <li>
            <strong>Mesure 3 – Relatif mineur (vi) :</strong> Voici le virage émotionnel ! Au lieu de rentrer sagement à la maison, l’harmonie bifurque par une <em>cadence rompue</em>, injectant une touche douce-amère au cœur du refrain.
          </li>
          <li>
            <strong>Mesure 4 – Sous-dominante (IV) :</strong> Plutôt que de fermer la porte, la mesure 4 reste ouverte comme une grande inspiration — prête à relancer la mesure 1 à l’infini !
          </li>
        </ul>

        <div class="article-highlight-box">
          <h4>Décaler le point de départ</h4>
          <p>
            Beaucoup de producteurs gardent exactement ces quatre mêmes accords mais commencent la boucle sur le 3e degré (le relatif mineur : <strong>vi – IV – I – V</strong>). Aussitôt la boucle devient plus sombre, mélancolique et intense (comme <em>Numb</em> de Linkin Park ou <em>Save Tonight</em>) :
          </p>
          <button class="btn-tool" data-play-progression="vi,IV,I,V">▶ Comparer le départ mineur (vi – IV – I – V)</button>
        </div>
      </div>
    `
  },
  {
    id: "art-gravity",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v7a6 6 0 0 0 12 0V4"/><line x1="4" y1="4" x2="8" y2="4"/><line x1="16" y1="4" x2="20" y2="4"/><line x1="6" y1="8" x2="8" y2="8"/><line x1="16" y1="8" x2="18" y2="8"/></svg>`,
    badgeClass: "badge-sage",
    title: "Magnétisme musical : Note sensible & Triton",
    subtitle: "Comment deux demi-tons donnent à votre cerveau envie de se résoudre",
    tag: "Tension & Détente",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Gravité harmonique</span>
        <h2>Pourquoi la musique nous attire-t-elle vers la tonique comme un aimant ?</h2>
        <p class="article-lead">
          En écoutant de la musique tonale, nous n’entendons pas des points isolés — nous ressentons de véritables forces d’attraction. Deux minuscules mécanismes d’un demi-ton expliquent presque tout.
        </p>

        <h3>1. La note sensible (7 → 1)</h3>
        <p>
          Dans une gamme majeure, un seul demi-ton sépare le 7e degré (<strong>Si</strong> en Do majeur) de la Tonique aiguë (<strong>Do</strong>). Jouez la gamme de Do jusqu’au Si et arrêtez-vous là : votre oreille réclame littéralement la note finale :
        </p>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="scale-unresolved">▶ Gamme arrêtée sur Si (Irrésolu !)</button>
          <button class="btn-tool" data-play-custom="leading-tone">▶ Écouter la résolution Si → Do</button>
        </div>

        <h3>2. Le pincement du triton (V7 → I)</h3>
        <p>
          Ajoutez la septième mineure (<strong>Fa</strong>) à l’accord de Dominante (Sol majeur) pour obtenir <strong>Sol7</strong> : soudain deux notes s’affrontent à distance de <strong>triton</strong> :
        </p>
        <ul class="article-steps-list">
          <li><strong>Si</strong> (7e degré) veut monter d’un demi-ton vers <strong>Do</strong>.</li>
          <li><strong>Fa</strong> (4e degré) veut fondre d’un demi-ton vers <strong>Mi</strong>.</li>
        </ul>
        <div class="article-highlight-box">
          <h4>Écouter les deux notes guides converger vers l’intérieur :</h4>
          <p>D’abord Fa et Si vibrent ensemble dans une tension vive, puis ils se resserrent sur Mi et Do (détente pure) :</p>
          <button class="btn-tool" data-play-custom="tritone-collapse">▶ Résolution du triton (Fa+Si → Mi+Do)</button>
        </div>
      </div>
    `
  },
  {
    id: "art-minor-plagal",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "L’effet frisson : Sous-dominante mineure iv → I",
    subtitle: "Des Beatles à Radiohead & Disney : quand le majeur devient doux-amer",
    tag: "Secret de composition",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Couleur harmonique</span>
        <h2>Le changement d’accord le plus touchant de la pop ?</h2>
        <p class="article-lead">
          Imaginez un après-midi d’été ensoleillé (Tonique majeure <strong>I</strong>), un nuage clair qui passe (Sous-dominante <strong>IV</strong>) — puis l’instant d’après une lumière dorée et nostalgique juste avant que le soleil ne revienne.
        </p>

        <h3>Que se passe-t-il dans IV → iv → I ?</h3>
        <p>
          En Do majeur, la sous-dominante est un <strong>Fa majeur (Fa – La – Do)</strong>. Abaissez sa tierce <strong>La</strong> d’un demi-ton vers <strong>Lab</strong> et l’accord devient <strong>Fa mineur (iv)</strong>. Ce <strong>Lab</strong> emprunté au mode de Do mineur glisse ensuite tout naturellement vers <strong>Sol</strong> sur la tonique (dessinant une ligne chromatique soyeuse : <strong>La → Lab → Sol</strong>).
        </p>

        <div class="article-highlight-box">
          <h4>Écoutez la comparaison directe :</h4>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="plagal-major">▶ Classique : Do – Fa – Do</button>
            <button class="btn-tool" data-play-custom="plagal-minor">▶ Touche mineure : Do – Fa – Fam – Do</button>
          </div>
        </div>

        <h3>Morceaux cultes bâtis sur ce tour harmonique</h3>
        <ul class="article-steps-list">
          <li><strong>The Beatles – « In My Life »</strong> (sur « I’ll remember you ») et <strong>« Blackbird »</strong></li>
          <li><strong>Radiohead – « Creep »</strong> (toute la boucle du morceau : Sol – Si – Do – Dom)</li>
          <li><strong>Oasis – « Don’t Look Back in Anger »</strong> (à la fin du pré-refrain)</li>
          <li><strong>Green Day – « Wake Me Up When September Ends »</strong></li>
          <li>D’innombrables finales de l’âge d’or <strong>Disney &amp; Pixar</strong></li>
        </ul>
      </div>
    `
  },
  {
    id: "art-physics-waves",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2.5-6 5.5-6 8 0s5.5 6 8 0 3.5-3 4-2"/></svg>`,
    badgeClass: "badge-sage",
    title: "Consonance & Dissonance : la danse des ondes",
    subtitle: "Des rapports numériques simples aux bandes critiques de l’oreille interne",
    tag: "Physique & Acoustique",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Physique &amp; Psychoacoustique</span>
        <h2>La dissonance n’est pas « fausse » — c’est le mouvement vers l’avant !</h2>
        <p class="article-lead">
          Beaucoup de débutants pensent que <strong>consonance</strong> signifie « joli » et <strong>dissonance</strong> « cassé ». En réalité, ce sont le yin et le yang du récit musical : la consonance incarne le <em>repos et l’arrivée</em>, la dissonance est <em>l’élan, l’épice et le désir</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Test express : la tension a besoin d’une résolution</h4>
          <p>Écoutez d’abord une consonance statique, puis une friction suspendue qui se libère vers le foyer :</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-progression="I,I,I">▶ Consonance pure uniquement (Statique)</button>
            <button class="btn-tool" data-play-progression="I,IV,Vsus4,V7,I">▶ Friction → Résolution</button>
          </div>
        </div>

        <h3>1. Pas tout noir ou blanc : le spectre à 4 degrés</h3>
        <p>
          Pythagore l’avait déjà mesuré sur une corde tendue : plus les entiers d’un rapport de fréquences sont petits, plus les deux sons fusionnent doucement. La théorie classe les intervalles selon quatre nuances :
        </p>

        <div class="spectrum-list">
          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>1. Consonance parfaite (Fusion totale)</span>
              <span>1:1 · 2:1 · 3:2</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill sage" style="width:96%"></div></div>
            <div class="spectrum-sub">Octave (2:1), Quinte juste (3:2) &amp; Quarte juste (4:3) : si pures et verrouillées qu’on croit entendre un seul son — taillées pour les power chords, bourdons et cadences finales.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="P8">▶ Octave (2:1)</button>
              <button class="btn-tool" data-play-interval-harm="P5">▶ Quinte (3:2)</button>
              <button class="btn-tool" data-play-interval-harm="P4">▶ Quarte (4:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>2. Consonance imparfaite (Chaude &amp; colorée)</span>
              <span>5:4 · 6:5 · 5:3</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill lilac" style="width:74%"></div></div>
            <div class="spectrum-sub">Tierces et sixtes majeures ou mineures : assez distinctes pour rayonner d’une émotion majeure ou mineure. Anecdote : au Moyen Âge, on classait encore les tierces parmi les dissonances avant que la Renaissance en fasse le cœur de l’harmonie !</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M3">▶ 3ce maj (5:4)</button>
              <button class="btn-tool" data-play-interval-harm="m3">▶ 3ce min (6:5)</button>
              <button class="btn-tool" data-play-interval-harm="M6">▶ 6te maj (5:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>3. Dissonance douce (Souplesse &amp; Soul)</span>
              <span>9:8 · 16:9</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill peach" style="width:45%"></div></div>
            <div class="spectrum-sub">Seconde majeure et septième mineure apportent un frottement souple et mobile — indispensable au blues, au R&amp;B soul et aux accords de 7e jazz.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M2">▶ 2de maj (9:8)</button>
              <button class="btn-tool" data-play-interval-harm="m7">▶ 7e min (16:9)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>4. Dissonance marquée (Haute tension &amp; rugosité)</span>
              <span>16:15 · 15:8 · 45:32</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill red" style="width:20%"></div></div>
            <div class="spectrum-sub">Seconde mineure, septième majeure et triton s’entrechoquent en battements rapides — comme le requin des Dents de la mer ou une sensible tendue vers la tonique.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="TT">▶ Triton (45:32)</button>
              <button class="btn-tool" data-play-interval-harm="M7">▶ 7e maj (15:8)</button>
              <button class="btn-tool" data-play-interval-harm="m2">▶ 2de min (16:15)</button>
            </div>
          </div>
        </div>

        <h3>2. Ce qui se passe biologiquement dans votre oreille</h3>
        <ul class="article-steps-list">
          <li><strong>Bande critique (Cochlée) :</strong> Sur la membrane basilaire de l’oreille interne, les capteurs de fréquences sont alignés. Quand deux sons se rapprochent à moins de 15–20 % d’écart en Hz, ils excitent les mêmes cellules ciliées en même temps, produisant une sensation de « rugosité ».</li>
          <li><strong>Le piège du grave (Lower Interval Limit) :</strong> Dans les basses fréquences, les valeurs en Hertz sont très rapprochées ! Entre <code>Do2</code> (65 Hz) et <code>Mi2</code> (82 Hz), il n’y a que 17 Hz : une tierce majeure habituellement « douce » brouille la même bande critique et sonne boueuse. Montez au médium (<code>Do4 + Mi4</code>, 67 Hz d’écart) et elle s’épanouit aussitôt !</li>
          <li><strong>Harmoniques qui se frottent (effet Helmholtz) :</strong> Chaque note naturelle porte des harmoniques plus aigus. Dans <code>Do4 + Si4</code> (7e majeure), le 2e harmonique de Do4 est <code>Do5</code> — à un demi-ton seulement au-dessus de <code>Si4</code> !</li>
        </ul>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Serré &amp; trouble (Registre grave)</h5>
            <p>Deux hauteurs se compressent dans la même bande critique de l’oreille :</p>
            <button class="btn-tool" data-play-freqs="65.41,82.41" data-osc="triangle" data-dur="1.8">▶ 3ce majeure grave (Do2+Mi2)</button>
            <button class="btn-tool" data-play-freqs="65.41,69.30" data-osc="triangle" data-dur="1.8">▶ 2de mineure grave (Do2+Réb2)</button>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Ouvert &amp; limpide (Médium / Écarté)</h5>
            <p>Le même intervalle devient cristallin dès qu’on le monte ou l’aère :</p>
            <button class="btn-tool" data-play-freqs="261.63,329.63" data-osc="triangle" data-dur="1.8">▶ 3ce majeure médium (Do4+Mi4)</button>
            <button class="btn-tool" data-play-freqs="130.81,554.37" data-osc="triangle" data-dur="1.8">▶ Redoublé espacé (Do3+Réb5)</button>
          </div>
        </div>

        <h3>3. Magie du contexte : transformer la friction en éclat</h3>
        <p>
          Qu’une hauteur paraisse acide ou somptueuse dépend autant de son entourage harmonique que de la physique brute. Écoutez deux notes nues, puis ce exactement même intervalle habillé d’un accord :
        </p>

        <div class="article-highlight-box">
          <h4>Expérience : la Septième majeure Do + Si (15 : 8)</h4>
          <p>À nu, <strong>Do4 + Si4</strong> frotte vivement. Glissez Mi4 et Sol4 au milieu (formant <strong>DoMaj7</strong>), et votre oreille entend un soutien d’harmoniques qui change le frottement en douceur jazz dorée !</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="isol-maj7">▶ Isolé : Do4 + Si4</button>
            <button class="btn-tool" data-play-custom="chord-maj7">▶ En contexte : DoMaj7 (Do–Mi–Sol–Si)</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-song-tricks",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    badgeClass: "badge-peach",
    title: "Les meilleurs airs repères pour les intervalles",
    subtitle: "Des Dents de la mer à Star Wars, Frère Jacques et Les Simpson",
    tag: "Méthode pratique",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Ancrages mélodiques</span>
        <h2>Reconnaître les intervalles grâce aux débuts célèbres</h2>
        <p class="article-lead">
          L’astuce mentale la plus rapide pour identifier un saut est de le rattacher aux deux premières notes d’un thème inoubliable. Voici votre antisèche ascendante :
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Seconde mineure (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m2") : "m2"})</strong>
              <span>Les Dents de la mer (Jaws) / La Panthère rose</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m2">▶ Écouter</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Seconde majeure (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M2") : "M2"})</strong>
              <span>Frère Jacques / Joyeux Anniversaire</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M2">▶ Écouter</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tierce mineure (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m3") : "m3"})</strong>
              <span>Seven Nation Army / Greensleeves</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m3">▶ Écouter</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tierce majeure (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M3") : "M3"})</strong>
              <span>When the Saints / Morning Has Broken</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M3">▶ Écouter</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Quarte juste (P4)</strong>
              <span>La Marseillaise / Harry Potter / Marche nuptiale</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P4">▶ Écouter</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Triton (TT)</strong>
              <span>Les Simpson (« The Simp-sons ») / Maria</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="TT">▶ Écouter</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Quinte juste (P5)</strong>
              <span>Star Wars / Ah ! vous dirai-je, maman</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P5">▶ Écouter</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Sixte majeure (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M6") : "M6"})</strong>
              <span>My Bonnie Lies Over the Ocean</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M6">▶ Écouter</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Octave juste (P8)</strong>
              <span>Somewhere Over the Rainbow</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P8">▶ Écouter</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-functional",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Oreille relative vs Oreille absolue",
    subtitle: "Pourquoi entendre les fonctions harmoniques bat le simple nom des notes",
    tag: "Méthode",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Philosophie d’écoute</span>
        <h2>Pourquoi les relations comptent plus que les fréquences brutes</h2>
        <p class="article-lead">
          On croit souvent qu’avoir « l’oreille musicale » consiste à entendre une tasse tintinnabuler et crier « Fa# ! » (<em>l’oreille absolue</em>). En musique vivante, l’émotion naît au contraire de la fonction harmonique.
        </p>

        <h3>Une note seule n’a aucune émotion</h3>
        <p>
          La même note <strong>Mi</strong> sonne lumineuse, chaleureuse et paisible en <strong>Do majeur</strong> (car elle y joue la Tierce majeure détendue, <em>Mi</em>). Jouez exactement ce même <strong>Mi</strong> dans une tonalité de <strong>Fa majeur</strong> : soudain il brûle d’une tension montante (car le voilà devenu Note sensible, <em>Ti</em> !).
        </p>

        <div class="article-highlight-box">
          <h4>Expérience déclic : le même Mi4 dans deux rôles</h4>
          <p>Écoutez exactement la même note cible <strong>Mi4</strong> deux fois : d’abord après un accord de Do majeur (repos apaisé), puis après un accord de Fa majeur (attraction pressante) :</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="context-c">▶ Mi4 en Do majeur (Mi détendu)</button>
            <button class="btn-tool" data-play-custom="context-f">▶ Mi4 en Fa majeur (Sensible Ti)</button>
          </div>
        </div>

        <p>
          C’est pourquoi Lauscher développe <strong>l’écoute fonctionnelle (relative)</strong> : dès que votre oreille identifie le <em>rôle</em> d’une note ou d’un accord dans une tonalité, vous pouvez transposer cette aisance dans les 12 tonalités instantanément !
        </p>
      </div>
    `
  },
  {
    id: "art-world-music-cultures",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Systèmes musicaux du monde : 12 tons, microtonalité et culture",
    subtitle: "Pourquoi le piano occidental n’est qu’un univers sonore parmi d’autres",
    tag: "Musiques du monde & Acoustique",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Cultures, Accordage &amp; Microtonalité</span>
        <h2>La grille à 12 demi-tons est une invention — pas une loi naturelle</h2>
        <p class="article-lead">
          Lorsqu’on grandit avec un piano, une guitare ou la pop occidentale, nos 12 demi-tons fixes par octave semblent aller de soi. Pourtant, un tour du monde sonore révèle tout autre chose : certaines cultures subdivisent l’octave en 22 ou 53 nuances, infléchissent la hauteur entre les touches du clavier, accordent des orchestres entiers avec un battement délibéré, ou déploient des drames entiers sans la moindre progression d’accords occidentale.
        </p>

        <h3>1. Le compromis occidental : pourquoi le piano est « légèrement faux »</h3>
        <p>
          En physique acoustique, les intervalles les plus purs vibrent selon des rapports de nombres entiers simples (<em>intonation juste</em>) : une quinte pure vaut <code>3:2</code> (~701,96 cents) et une tierce majeure pure <code>5:4</code> (386,31 cents). Mais si l’on empile douze quintes pures, on ne retombe pas exactement sept octaves plus haut : il reste un léger surplus d’environ <strong>23,5 cents</strong> (le <em>comma pythagoricien</em>). Sur un clavier fixe, accorder parfaitement une tonalité rend les tonalités éloignées péniblement fausses.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>La solution occidentale (~1700 → aujourd’hui)</h5>
            <p>Après les <em>tempéraments bien tempérés</em> (comme chez Bach, où chaque tonalité gardait sa couleur propre), l’Occident a généralisé le <strong>tempérament égal à 12 tons (12-TET)</strong> : chaque demi-ton mesure exactement <code>100 cents</code>. L’oreille paie un tribut discret — chaque tierce majeure est trop haute d’environ <strong>+14 cents</strong> et chaque quinte légèrement rétrécie (<strong>−2 cents</strong>) — mais en échange, on peut moduler librement dans les 12 tonalités et superposer une polyphonie orchestrale complexe (architecture <em>verticale</em>).</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>La voie de nombreuses cultures</h5>
            <p>Les traditions centrées sur une ligne mélodique magistrale (architecture <em>horizontale</em>) soutenue par une note fixe (<em>bourdon / drone</em>) n’ont pas besoin de changer d’accords à travers tout le cycle des quintes. Elles conservent donc des harmoniques purs et cristallins, déploient des nuances subtiles entre nos touches de piano et bâtissent d’immenses univers modaux (<em>Maqâmât</em>, <em>Râgas</em>, <em>Dastgâh</em>).</p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Comparaison audio : Accord parfait pur vs. piano tempéré (12-TET)</h4>
          <p>Écoutez d’abord l’accord majeur acoustiquement pur (<code>4:5:6</code> — quinte <code>3:2</code>, tierce <code>5:4</code>), puis immédiatement le même accord de Do majeur au tempérament égal (12-TET). Percevez le léger frémissement dans la tierce tempérée !</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Accord pur (4:5:6)</button>
            <button class="btn-tool" data-play-freqs="261.63,329.63,392.00" data-osc="triangle" data-dur="2.0">▶ Tempérament égal 12-TET</button>
          </div>
        </div>

        <h3>2. Que veut vraiment dire « microtonalité » ? (Cents &amp; commas)</h3>
        <p>
          Pour mesurer les hauteurs au-delà du clavier occidental, l’acoustique découpe chaque octave en exactement <strong>1 200 cents</strong>. Chaque demi-ton pianistique équivaut à <code>100 cents</code> — mais l’espace intermédiaire regorge de finesse :
        </p>

        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>Ce que l’oreille distingue encore</strong>
            Dans le médium, une oreille entraînée détecte des écarts de seulement <strong>3 à 6 cents</strong> — surtout sur des tenues grâce aux battements ou changements de couleur.
          </div>
          <div class="physics-fact-item">
            <strong>Quart de ton &amp; trois-quarts de ton</strong>
            Un véritable <strong>quart de ton</strong> vaut <code>50 cents</code>, tandis qu’un intervalle neutre de <strong>trois-quarts de ton</strong> mesure <code>150 cents</code> — ni majeur gai, ni mineur triste, mais suspendu dans sa propre lumière.
          </div>
          <div class="physics-fact-item">
            <strong>Le comma (~22–24 cents)</strong>
            La théorie turque du Makam divise le ton entier en <strong>9 commas holdériens</strong> (~22,6 cents chacun) — formant une échelle ultra-fine de <strong>53 degrés par octave</strong> !
          </div>
          <div class="physics-fact-item">
            <strong>La note comme mouvement, pas comme point</strong>
            Dans bien des cultures, un son n’est pas un impact figé sur une touche mais une courbe vivante faite d’appogiatures, de glissés et d’oscillations autour d’un pôle tonal.
          </div>
        </div>

        <h3>3. Mondes arabe, persan et turc : Maqâm, Makam &amp; Dastgâh</h3>
        <p>
          Du Maghreb au Caire, de Bagdad et Téhéran jusqu’à Istanbul, la musique savante ne progresse pas par enchaînements d’accords mais par parcours mélodiques raffinés : les <strong>Maqâmât</strong> (arabes), <strong>Makamlar</strong> (turcs) ou <strong>Dastgâh-hâ</strong> (persans, avec leurs altérations <em>Koron</em> et <em>Sori</em>). Au lieu d’une simple gamme à 7 sons figés, le musicien assemble de petites cellules de 3 à 5 notes appelées <strong>Jins</strong> (pl. <em>Ajnâs</em>). Chaque Maqâm dicte à la fois la justesse fine, l’itinéraire mélodique (<em>Sayr</em> — d’où part la phrase, où elle respire, où elle se résout) et un climat intérieur.
        </p>
        <p>
          Son emblème sonore le plus célèbre est l’<strong>intervalle neutre</strong> — notamment la <em>tierce neutre</em> vers <strong>350 cents</strong> (à mi-chemin exact entre notre tierce mineure à 300 cents et notre tierce majeure à 400 cents !). Absente du piano occidental, cette couleur chaude et lumineuse forme le cœur de tout le répertoire de l’<em>Oud</em> et de la flûte <em>Ney</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Atelier microtonal : Trois tierces comparées (Maqâm Rast &amp; Bayâtî)</h4>
          <p>Comparez sur la même fondamentale une tierce majeure occidentale (<code>400 ct</code>), une tierce neutre arabe (<code>350 ct</code>) et une tierce mineure (<code>300 ct</code>) — puis écoutez une tournure en <strong>Maqâm Rast</strong> et l’inflexion typique du <strong>Maqâm Bayâtî</strong> :</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-maqam-contrast">▶ Majeure vs Neutre vs Mineure</button>
            <button class="btn-tool" data-play-custom="culture-maqam-rast">▶ Maqâm Rast (350 &amp; 1050 ct)</button>
            <button class="btn-tool" data-play-custom="culture-maqam-bayati">▶ Maqâm Bayâtî (degré à 150 ct)</button>
          </div>
        </div>

        <h3>4. Asie du Sud (Pakistan &amp; Inde) : Râga, 22 Shrutis, Tanpura &amp; Tâla</h3>
        <p>
          Dans la musique classique hindoustanie — partagée entre l’Inde du Nord et le Pakistan (du chant <em>Khyal</em> et du <em>Qawwali</em> mystique au Sitar, au Sarangi et à la Bansuri) — tout l’édifice repose sur un tapis sonore continu et riche en harmoniques : le bourdon de la <strong>Tanpura</strong> (souvent tonique <code>Sa</code> et quinte <code>Pa</code>). L’harmonie ne changeant jamais de centre, aucun tempérament compromis n’est nécessaire.
        </p>
        <ul class="article-steps-list">
          <li><strong>22 Shrutis (reères microtonaux) :</strong> Bien qu’un <em>Râga</em> retienne 5, 6 ou 7 degrés principaux (<em>Svara</em>), leur intonation puise parmi <strong>22 positions microtonales (Shrutis)</strong>. Le très bas <code>Ati-Komal Re</code> du Râga Bhairav s’approche bien davantage de la tonique qu’une seconde mineure tempérée — créant cette gravité solennelle de l’aube.</li>
          <li><strong>L’art entre les notes (Meend, Andolan &amp; Gamak) :</strong> Au Sitar comme au chant, une note droite sans ornement semble nue. La beauté naît du <em>Meend</em> (glissando souple liant deux hauteurs), de l’<em>Andolan</em> (ondulation lente autour d’un microton) et du <em>Gamak</em> (élans ornementaux vigoureux). L’arc entre les notes compte autant que les notes elles-mêmes.</li>
          <li><strong>Râga et heure du jour :</strong> Un Râga possède une personnalité complète : profil ascendant (<em>Aroha</em>) et descendant (<em>Avaroha</em>), note pivot (<em>Vadi</em>) et moment privilégié (aube pour <em>Bhairav</em> vs nuit profonde pour <em>Darbari Kanada</em>).</li>
          <li><strong>Tâla (temps cyclique) :</strong> Au lieu de mesures linéaires, les <em>Tablas</em> tournent en cycles fermés — 16 temps (<em>Teental</em>), 10 temps (<em>Jhaptal</em>) ou 7 temps (<em>Rupak</em>) — convergeant sans cesse vers le premier temps aimanté, le <strong>Sam</strong>.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Exemple d’écoute : Râga Bhairav sur bourdon de Tanpura (Sa–Pa)</h4>
          <p>Portez attention à la seconde très basse (<code>Ati-Komal Re</code>) et à la détente progressive vers le repos final sur <code>Sa</code> :</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-raga-bhairav">▶ Râga Bhairav (Tanpura + intonation 22-Shruti)</button>
          </div>
        </div>

        <h3>5. Indonésie (Java &amp; Bali) : Gamelan, Sléndro, Pélog &amp; houle Ombak</h3>
        <p>
          Peu de traditions bousculent autant nos repères occidentaux que les grands orchestres de bronze du <strong>Gamelan</strong> javanais et balinais. Ici, pas de diapason universel <code>La = 440 Hz</code> : <strong>chaque ensemble de Gamelan possède son propre accordage unique</strong>, jalousement préservé — deux ensembles différents ne peuvent donc généralement pas fusionner.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Sléndro : 5 pas presque équidistants</h5>
            <p>Découpe l’octave non pas en 12 demi-tons, mais en <strong>5 intervalles larges voisins</strong> d’environ <code>240 cents</code>. Dans un Sléndro pur, il n’existe ni tierce majeure occidentale ni quinte ou quarte exacte — obligeant l’oreille à lâcher ses automatismes triadiques.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Pélog &amp; Ombak (la « vague marine »)</h5>
            <p><strong>Pélog</strong> propose 7 degrés asymétriques d’où l’on extrait des modes pentatoniques contrastés. À Bali, les métallophones vont par paires : l’un légèrement plus grave (<em>Pengumbang</em>) et son jumeau environ <strong>5 à 8 Hz plus aigu</strong> (<em>Pengisep</em>). Frappés ensemble, ils génèrent l’<strong>Ombak</strong> (« vague ») : un battement chatoyant et respirant recherché comme âme acoustique de l’orchestre.</p>
          </div>
        </div>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-gamelan-slendro">▶ Échelle Sléndro (~240 ct équidistants)</button>
          <button class="btn-tool" data-play-custom="culture-gamelan-ombak">▶ Scintillement Ombak balinais (~7 Hz)</button>
        </div>

        <h3>6. Afrique subsaharienne &amp; Asie de l’Est : polyrythmie, Blue Notes et silence</h3>
        <ul class="article-steps-list">
          <li><strong>Afrique subsaharienne — Cycles imbriqués &amp; asymétrie :</strong> Tandis que l’Europe explore l’harmonie verticale, l’Afrique de l’Ouest et centrale déploie des architectures rythmiques vertigineuses. Plusieurs voix superposent des pulsations contraires (<strong>3 contre 4</strong> ou <strong>3 contre 2</strong> — vraie <em>polyrythmie</em>), unifiées par une cloche conductrice asymétrique appelée <strong>Bell Timeline</strong> (comme le motif 12/8 standard <code>x . x . x x . x . x . x</code>). Nul ne brille isolément : tout naît de l’imbrication collective et du dialogue <em>Appel-Réponse</em>.</li>
          <li><strong>De l’Afrique de l’Ouest au Blues, Jazz &amp; Soul (Blue Notes !) :</strong> Lorsque les musiciens africains déportés en Amérique du Nord croisèrent guitares, pianos et cuivres occidentaux, leurs tierces, quintes et septièmes vocales infléchies vers le bas ne rentraient pas dans les cases figées du 12-TET. Ce choc créatif engendra les célèbres <strong>Blue Notes</strong> microtonales — cœur expressif du Blues, du Gospel, du Jazz et du Rock modernes.</li>
          <li><strong>Asie de l’Est — Timbre, pression du doigt &amp; art du « Ma » :</strong> Les musiques savantes chinoise (cithare <em>Guqin</em> aux cent techniques d’attaque et de glissando) ou japonaise (flûte <em>Shakuhachi</em>) s’appuient souvent sur des ossatures pentatoniques tout en investissant l’infini dans les inflexions microtonales, le grain du souffle et le concept temporel de <strong>Ma (間)</strong> : le silence vibrant entre deux sons, aussi parlant que la note elle-même.</li>
        </ul>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-westafrica-poly">▶ Timeline cloche 12/8 + polyrythmie 4-vs-3</button>
        </div>

        <h3>7. Quatre axes de comparaison mondiale — et ce que gagne votre oreille</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>1. Échelle &amp; accordage</strong>
              <span>Occident : 12 pas fixes de 100 cents (12-TET). Monde : Sléndro à 5 tons (~240 ct), 22 Shrutis, Makam à 53 commas ou pôles chantés fluides.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>2. Vertical vs. Horizontal</strong>
              <span>L’Occident raconte par progressions d’accords. Maqâm et Râga sculptent des lignes microtonales subtiles sur un centre stable.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>3. Idéal sonore</strong>
              <span>Fusion lisse vs battements océaniques (<em>Ombak</em>), richesse bourdonnante du chevalet du sitar (<em>Jawari</em>) ou timbre soufflé du bambou.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>4. Perception du temps</strong>
              <span>Mesures linéaires 3/4 ou 4/4 vs cycles fermés (<em>Tâla</em>), timelines asymétriques en 12/8 ou respiration du silence (<em>Ma</em>).</span>
            </div>
          </div>
        </div>

        <div class="k-song-ref">
          <strong>Ce que votre écoute y gagne :</strong> Chaque culture cultive un super-pouvoir auditif distinct. L’harmonie occidentale aiguise l’écoute des fonctions d’accords ; Maqâm et Râga affinent votre <strong>radar microtonal</strong> et votre justesse au chant ou sur instrument non fretté ; Gamelan et polyrythmie africaine libèrent du comptage rigide et ancrent le rythme dans tout le corps. Dans Lauscher, entraîner les intervalles signifie écouter des <em>relations vivantes plutôt que de simples étiquettes</em> — la clé universelle de toutes les musiques du monde.
        </div>
      </div>
    `
  }
];

const PHYSICS_WAVE_EXPLANATIONS_FR = {
  "2,1": "<strong>Octave (2 : 1) :</strong> Sur 2 longues ondes vertes rentrent exactement <strong>4 ondes orange deux fois plus courtes</strong>. Sur la piste 3, le dessin global se répète à l’identique à chaque trait pointillé — c’est pourquoi l’octave fusionne presque en un seul son.",
  "3,2": "<strong>Quinte juste (3 : 2) :</strong> Pendant que la fondamentale trace 2 longues ondes vertes, l’aigu dessine exactement <strong>3 ondes orange</strong>. Elles retombent proprement ensemble toutes les 2 ondes — stable, ouvert et puissant.",
  "4,3": "<strong>Quarte juste (4 : 3) :</strong> 3 vagues vertes rencontrent pile 4 vagues orange, puis tout le motif redémarre synchronisé à zéro.",
  "5,4": "<strong>Tierce majeure (5 : 4) :</strong> 4 cycles verts croisent 5 cycles orange. Sur la piste 3 se forme une courbe douce et ronde — la chaleur des accords majeurs.",
  "6,5": "<strong>Tierce mineure (6 : 5) :</strong> 5 vagues vertes contre 6 orange : un peu plus serré que la tierce majeure, c’est ce léger mouvement d’onde qui donne au mineur sa couleur émouvante.",
  "5,3": "<strong>Sixte majeure (5 : 3) :</strong> Rapport 1,67 : 1 — le renversement de la tierce mineure. Large, chantant et agréablement posé.",
  "45,32": "<strong>Triton (45 : 32) :</strong> Les sommets orange refusent de s’aligner sur la grille verte — observez la piste 3 : une courbe en dents de scie pleine de tension !",
  "16,15": "<strong>Seconde mineure (16 : 15) :</strong> Les deux ondes ont presque la même vitesse, mais glissent peu à peu en décalage — créant ces « ventres » épais puis fins sur la piste 3 (battement)."
};

const PHYSICS_OVERTONES_FR = [
  { num: 1,  note: "Do2",      ratio: "1× · Fondam.",    freq: 65.41,  special: false },
  { num: 2,  note: "Do3",      ratio: "2× · Octave",     freq: 130.82, special: false },
  { num: 3,  note: "Sol3",     ratio: "3× · Quinte j.",  freq: 196.23, special: false },
  { num: 4,  note: "Do4",      ratio: "4× · 2e Octave",  freq: 261.64, special: false },
  { num: 5,  note: "Mi4",      ratio: "5× · 3ce maj.",   freq: 327.05, special: false },
  { num: 6,  note: "Sol4",     ratio: "6× · Quinte j.",  freq: 392.46, special: false },
  { num: 7,  note: "~Sib4*",   ratio: "7× · 7e nat.",    freq: 457.87, special: true },
  { num: 8,  note: "Do5",      ratio: "8× · 3e Octave",  freq: 523.28, special: false },
  { num: 9,  note: "Ré5",      ratio: "9× · 2de maj.",   freq: 588.69, special: false },
  { num: 10, note: "Mi5",      ratio: "10× · 3ce maj.",  freq: 654.10, special: false },
  { num: 11, note: "~Fa5/Fa#*",ratio: "11× · Fa cor",    freq: 719.51, special: true },
  { num: 12, note: "Sol5",     ratio: "12× · Quinte j.", freq: 784.92, special: false }
];

function renderPhysicsReferenceHTML_FR() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Comment naît le son</span>
        <span class="k-ratio-chip">env. 343 m/s</span>
      </div>
      <h4>De l’air qui vibre jusqu’à la courbe sinusoïdale</h4>
      <p>
        Pincez une corde de guitare ou fredonnez une note : quelque chose vibre très vite d’avant en arrière. Ce frémissement pousse les molécules d’air voisines, envoyant une vague de pression à environ <strong>343 mètres par seconde</strong> (plus de 1 200 km/h !). Lorsqu’elle atteint votre oreille, votre tympan vibre au même rythme et votre cerveau traduit cela en musique.
      </p>
      <p>
        Imaginez une balançoire qui va et vient sans le moindre à-coup : si l’on trace ce mouvement régulier dans le temps, on obtient une <strong>sinusoïde</strong> (<em>courbe sinus</em>). C’est la brique élémentaire du son : <strong>une seule fréquence pure</strong>, sans rien autour. Les vrais instruments dessinent des ondes bien plus bosselées, car ils mélangent plusieurs vibrations à la fois.
      </p>

      <div class="wave-compare-visual">
        <div class="wave-compare-card">
          <strong>Sinusoïde pure (1 fréquence)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 29.0 L9.5 25.0 L12.9 21.3 L16.4 17.8 L19.9 14.9 L23.3 12.5 L26.8 10.9 L30.3 10.1 L33.7 10.1 L37.2 10.9 L40.7 12.5 L44.1 14.9 L47.6 17.8 L51.1 21.3 L54.5 25.0 L58.0 29.0 L61.5 33.0 L64.9 36.7 L68.4 40.2 L71.9 43.1 L75.3 45.5 L78.8 47.1 L82.3 47.9 L85.7 47.9 L89.2 47.1 L92.7 45.5 L96.1 43.1 L99.6 40.2 L103.1 36.7 L106.5 33.0 L110.0 29.0 L113.5 25.0 L116.9 21.3 L120.4 17.8 L123.9 14.9 L127.3 12.5 L130.8 10.9 L134.3 10.1 L137.7 10.1 L141.2 10.9 L144.7 12.5 L148.1 14.9 L151.6 17.8 L155.1 21.3 L158.5 25.0 L162.0 29.0 L165.5 33.0 L168.9 36.7 L172.4 40.2 L175.9 43.1 L179.3 45.5 L182.8 47.1 L186.3 47.9 L189.7 47.9 L193.2 47.1 L196.7 45.5 L200.1 43.1 L203.6 40.2 L207.1 36.7 L210.5 33.0 L214.0 29.0" fill="none" stroke="var(--sage-strong)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Courbe en S bien ronde sans pointes — sonne lisse et neutre, comme un diapason ou un sifflement doux.</span>
        </div>
        <div class="wave-compare-card">
          <strong>Vrai son (Fondamentale + Harmoniques)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 26.9 L9.5 17.6 L12.9 11.3 L16.4 9.3 L19.9 11.2 L23.3 15.4 L26.8 19.5 L30.3 22.3 L33.7 23.3 L37.2 23.3 L40.7 23.4 L44.1 23.9 L47.6 24.9 L51.1 25.9 L54.5 26.5 L58.0 26.9 L61.5 27.7 L64.9 29.3 L68.4 31.8 L71.9 34.5 L75.3 36.8 L78.8 38.1 L82.3 38.8 L85.7 39.9 L89.2 41.9 L92.7 44.7 L96.1 47.2 L99.6 47.4 L103.1 43.9 L106.5 36.5 L110.0 26.9 L113.5 17.6 L116.9 11.3 L120.4 9.3 L123.9 11.2 L127.3 15.4 L130.8 19.5 L134.3 22.3 L137.7 23.3 L141.2 23.3 L144.7 23.4 L148.1 23.9 L151.6 24.9 L155.1 25.9 L158.5 26.5 L162.0 26.9 L165.5 27.7 L168.9 29.3 L172.4 31.8 L175.9 34.5 L179.3 36.8 L182.8 38.1 L186.3 38.8 L189.7 39.9 L193.2 41.9 L196.7 44.7 L200.1 47.2 L203.6 47.4 L207.1 43.9 L210.5 36.5 L214.0 26.9" fill="none" stroke="var(--peach-strong)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Plusieurs sinusoïdes s’empilent. Ces pics et creux donnent à chaque instrument sa personnalité.</span>
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Hertz (Hz) = Vitesse</strong>
          <span><code>65 Hz</code> (<code>Do2</code> grave) vibre 65 fois par seconde — une vague de <strong>5,24 mètres</strong> dans la pièce ! <code>440 Hz</code> (<code>La4</code>) ne fait plus que <strong>78 cm</strong>.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Octave = Vitesse doublée</strong>
          <span>Votre oreille raisonne en proportions : sauter <code>220 → 440 Hz</code> (+220 Hz) et <code>440 → 880 Hz</code> (+440 Hz) donne exactement la même impression — 2:1 !</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Amplitude = Volume</strong>
          <span>L’ampleur du mouvement (en décibels, dB) rend le son plus fort ou plus faible, sans jamais changer la hauteur de la note.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Forme d’onde = Timbre</strong>
          <span>Onde lisse = son doux façon flûte. Onde dentelée = son mordant façon trompette ou guitare saturée.</span>
        </div>
      </div>

      <div class="k-meta-box">
        <strong>À tester – Sauts d’octave &amp; Formes d’onde sur Do4 (261,6 Hz) :</strong>
        <div class="k-btn-row" style="margin-top:0.35rem;">
          <button class="btn-tool" data-play-freqs="220,440,880" data-seq-step="650" data-osc="triangle" data-dur="0.75">▶ 220 → 440 → 880 Hz</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sine" data-dur="1.4">▶ Sinusoïde pure</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="triangle" data-dur="1.4">▶ Triangle (plus doux)</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sawtooth" data-dur="1.4">▶ Dents de scie (mordant)</button>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. Le spectre fréquentiel</span>
        <span class="k-ratio-chip">20 Hz – 20 kHz</span>
      </div>
      <h4>L’empreinte digitale du son : que cache une note ?</h4>
      <p>
        Si un piano et une guitare jouent exactement le même <code>Do4</code>, vous les reconnaissez instantanément — même si la note de base a la même fréquence ! Le secret, c’est le <strong>spectre fréquentiel</strong> : chaque son réel est en fait une équipe de sinusoïdes qui résonnent ensemble.
      </p>
      <p>
        Un spectre (comme un analyseur d’égaliseur) montre telle une radio quelles fréquences jouent et à quel volume : tout à gauche se tient la fondamentale (<code>1×</code>), et à droite ses harmoniques plus rapides (<code>2×</code> à <code>10×</code>). Choisissez un son pour voir et entendre sa recette :
      </p>

      <div class="freq-spec-box">
        <div class="k-btn-row">
          <button class="k-filter-pill active" data-spec-preset="sine" data-play-freqs="261.63" data-osc="sine" data-dur="1.4" data-spec-desc="<strong>Sinusoïde pure :</strong> Une seule barre à 1× — zéro harmonique. Un son très lisse, presque neutre, sans fréquences aiguës pour le colorer.">▶ Sinusoïde (Do4)</button>
          <button class="k-filter-pill" data-spec-preset="piano" data-play-inst data-style="piano" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Piano (Sample) :</strong> Fondamentale solide et premiers harmoniques ronds qui s’éteignent en douceur vers le haut — d’où cette rondeur chaleureuse.">▶ Piano (Sample Do4)</button>
          <button class="k-filter-pill" data-spec-preset="guitar" data-play-inst data-style="guitar" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Guitare (Sample) :</strong> La corde pincée injecte nettement plus d’énergie dans le milieu et le haut du spectre — c’est ce qui donne le mordant et le claquement d’attaque.">▶ Guitare (Sample Do4)</button>
          <button class="k-filter-pill" data-spec-preset="strings" data-play-inst data-style="strings" data-notes="C4" data-dur="1.6" data-spec-desc="<strong>Cordes (Sample) :</strong> L’archet entretient même les harmoniques aigus (6×–10×) en continu — offrant ce grain soyeux qui perce facilement dans un mix.">▶ Cordes (Sample Do4)</button>
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
          <strong>Sinusoïde pure :</strong> Une seule barre à 1× — zéro harmonique. Un son très lisse, presque neutre, sans fréquences aiguës pour le colorer.
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Sub &amp; Basses (20 – 250 Hz)</strong>
          <span>Grosse caisse, basse, assise. Des ondes si amples qu’on les sent souvent dans la poitrine avant de les détailler.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Médiums &amp; Corps (250 Hz – 2 kHz)</strong>
          <span>Voix, corps du piano, accords de guitare. Trop d’énergie ici rend vite le son « étouffé ».</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Présence &amp; Attaque (2 – 6 kHz)</strong>
          <span>Consonnes (« S », « T »), claquement du médiator et clarté. Zone où l’oreille est ultra-sensible.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Air &amp; Brillance (6 – 20 kHz)</strong>
          <span>Scintillement des cymbales, souffle subtil et détails soyeux jusqu’aux limites de l’audition humaine.</span>
        </div>
      </div>
    </article>

    <div class="wave-lab-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">3. Labo d’ondes interactif</span>
        <button id="toggleWavePauseBtn" class="k-ratio-btn">⏸ Mettre en pause</button>
      </div>
      <h4>Observer deux ondes fusionner en direct</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-mid); line-height:1.4;">
        Les pointillés marquent <strong>1 cycle complet de la fondamentale (vert)</strong>. Dessous vibre la <strong>2e note (orange)</strong> — et la piste 3 tout en bas montre leur véritable <strong>onde combinée</strong> telle qu’elle arrive sur votre tympan.
      </p>
      <div class="wave-canvas-wrap">
        <canvas id="waveCanvas" class="wave-canvas" width="540" height="195"></canvas>
        <div id="waveExplainBanner" class="wave-explain-banner">
          ${PHYSICS_WAVE_EXPLANATIONS_FR["2,1"]}
        </div>
      </div>
      <div class="k-btn-row">
        <button class="k-filter-pill active" data-wave-ratio="2,1" data-wave-semi="12">Octave (2:1)</button>
        <button class="k-filter-pill" data-wave-ratio="3,2" data-wave-semi="7">Quinte (3:2)</button>
        <button class="k-filter-pill" data-wave-ratio="4,3" data-wave-semi="5">Quarte (4:3)</button>
        <button class="k-filter-pill" data-wave-ratio="5,4" data-wave-semi="4">3ce maj (5:4)</button>
        <button class="k-filter-pill" data-wave-ratio="6,5" data-wave-semi="3">3ce min (6:5)</button>
        <button class="k-filter-pill" data-wave-ratio="5,3" data-wave-semi="9">6te maj (5:3)</button>
        <button class="k-filter-pill" data-wave-ratio="45,32" data-wave-semi="6">Triton (45:32)</button>
        <button class="k-filter-pill" data-wave-ratio="16,15" data-wave-semi="1">2de min (16:15)</button>
      </div>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">4. La gamme cachée de la nature</span>
        <span class="k-ratio-chip">1× à 12× Fondamentale</span>
      </div>
      <h4>Ondes stationnaires &amp; Série des harmoniques (1er–12e)</h4>
      <p>
        Bloquez une corde à ses deux extrémités et pincez-la : comme les bords ne bougent pas, elle vibre d’un seul bloc ET se découpe en même temps par moitiés (2× plus vite), par tiers (3×), par quarts (4×)… Une seule note renferme donc naturellement toute une échelle d’harmoniques cachés !
      </p>
      <p>
        Touchez les tuiles ! Les sons marqués en violet <strong>7</strong> et <strong>11</strong> (« Fa du cor des Alpes ») tombent pile <em>entre</em> deux touches de piano : de purs harmoniques naturels.
      </p>
      <div class="overtone-grid">
        ${PHYSICS_OVERTONES_FR.map(ot => `
          <button class="overtone-btn ${ot.special ? "is-blue" : ""}" data-play-freqs="${ot.freq}" data-osc="triangle" data-dur="1.15">
            <span class="overtone-num">Harm. #${ot.num}</span>
            <span class="overtone-note">${ot.note}</span>
            <span class="overtone-ratio">${ot.ratio}</span>
          </button>
        `).join("")}
      </div>
      <div class="k-meta-box">
        <strong>Pourquoi le Majeur semble si naturel :</strong> Les harmoniques <strong>4 : 5 : 6</strong> forment tout de suite un accord majeur lumineux près de la base. L’accord mineur pur se cache bien plus haut vers <strong>10 : 12 : 15</strong> !
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="${PHYSICS_OVERTONES_FR.map(o => o.freq).join(",")}" data-seq-step="380" data-osc="triangle" data-dur="0.65">▶ Série complète (1–12)</button>
        <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Accord majeur (4:5:6)</button>
        <button class="btn-tool" data-play-freqs="261.63,313.96,392.45" data-osc="triangle" data-dur="2.0">▶ Accord mineur (10:12:15)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">5. Battements acoustiques</span>
        <span class="k-ratio-chip">Écart en Hz = Puls./s</span>
      </div>
      <h4>Quand les ondes « pompent » : accorder à l’oreille</h4>
      <p>
        Jouez deux cordes presque à l’unisson : leurs sommets s’additionnent un instant (deux fois plus fort) puis s’opposent (bref creux). Ce balancement (« oua-oua-oua ») s’appelle un <strong>battement</strong>. Le nombre de pulsations par seconde donne exactement l’<strong>écart en Hertz</strong> — quand les cordes sont parfaitement justes, le tremblement disparaît !
      </p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="440,440" data-osc="sine" data-dur="2.4">▶ 0 Hz (440+440 · Stable)</button>
        <button class="btn-tool" data-play-freqs="440,442" data-osc="sine" data-dur="2.6">▶ 2 Hz (440+442 · 2 puls./s)</button>
        <button class="btn-tool" data-play-freqs="440,446" data-osc="sine" data-dur="2.4">▶ 6 Hz (440+446 · Scintillement)</button>
        <button class="btn-tool" data-play-freqs="440,466" data-osc="sine" data-dur="2.2">▶ 26 Hz (440+466 · Frottement)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">6. Accordage &amp; Compromis du piano</span>
        <span class="k-ratio-chip">Écart +23,5 cents</span>
      </div>
      <h4>Pourquoi aucun piano au monde n’est accordé « à 100 % pur »</h4>
      <p>
        Un étrange caprice des maths : empilez 12 quintes pures (3:2) à la suite et vous dépassez légèrement 7 octaves justes — d’environ <strong>23,5 cents</strong> ! Si un accordeur réglait le piano parfaitement pur en Do majeur, les tonalités lointaines comme Fa♯ majeur sonneraient terriblement faux.
      </p>
      <p>
        L’astuce de la musique moderne s’appelle le <strong>tempérament égal</strong> : l’octave est découpée en 12 mini-pas strictement égaux. Chaque morceau fonctionne dans les 12 tons — au prix d’une tierce majeure (Do–Mi) un peu plus haute de <strong>14 cents</strong> sur le piano. Comparez l’intonation juste et de vrais samples de piano :
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Intonation juste (Pur 5:4)</h5>
          <p>Zéro battement — fusion lisse, mais inutilisable dans toutes les tonalités :</p>
          <button class="btn-tool" data-play-freqs="261.63,327.04" data-osc="triangle" data-dur="2.3">▶ Tierce pure (5:4 · lisse)</button>
          <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.3">▶ Triade Do majeur pure</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Piano / Tempérament égal (+14 ct)</h5>
          <p>Vrais samples studio de piano : léger miroitement — jouable dans les 12 tons :</p>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4" data-dur="2.3">▶ Tierce piano (Sample Do4 + Mi4)</button>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4,G4" data-dur="2.3">▶ Do majeur piano (Sample)</button>
        </div>
      </div>
    </article>
  `;
}


const CATEGORY_HELP_GUIDES_FR = {
  cadence: {
    tagClass: "tag-sage",
    tag: "Mode d’emploi • Cadences",
    title: "Comment fonctionne l’entraînement aux cadences",
    lead: "Au lieu de deviner des accords hors contexte, vous écoutez une progression complète sur quatre mesures qui ancre votre oreille — puis vous identifiez la fonction harmonique manquante au niveau du point d’interrogation.",
    sections: `
      <h3>Les deux groupes d’exercices</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Cible : Mesure 4 (Classique)</h5>
          <p>Les mesures 1 à 3 s’affichent pour installer la tonalité. Écoutez les quatre accords et choisissez l’harmonie manquante pour la <strong>mesure 4</strong>.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Mesure aléatoire (1–4)</h5>
          <p>Le point d’interrogation se déplace de façon imprévisible sur les mesures 1, 2, 3 ou 4. Même lorsque la mesure 1 est masquée, un repère visuel de Tonique (<strong>I</strong>) reste affiché pour orienter votre oreille.</p>
        </div>
      </div>

      <h3>Les 4 niveaux de difficulté</h3>
      <ul class="article-steps-list">
        <li><strong>Niveau 1 – Piliers fondamentaux (I–V) :</strong> Les quatre accords essentiels <code>I</code>, <code>IV</code>, <code>V</code> et <code>vi</code> — la base d’innombrables chansons pop et folk.</li>
        <li><strong>Niveau 2 – Diatonique (ii–vi) :</strong> Les six principaux accords diatoniques du mode majeur (ajout de <code>ii</code> et <code>iii</code>).</li>
        <li><strong>Niveau 3 – Enrichi (V/V) :</strong> Introduit la septième de dominante (<code>V7</code>) et la dominante secondaire <code>V/V</code>.</li>
        <li><strong>Niveau 4 – Jazz &amp; Substitution tritonique (bII7) :</strong> Vocabulaire chromatique complet jusqu’à la substitution tritonique <code>bII7</code>.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Commandes pendant l’exercice</h4>
        <p>Utilisez les pastilles au-dessus de la scène pour régler la <strong>Tonalité</strong>, la <strong>Mesure</strong> et le <strong>Tempo (BPM)</strong>. En dessous, <strong>Tonique (I)</strong> recale votre oreille à tout moment, <strong>Réécouter l’accord</strong> isole le degré recherché, le <strong>bouton Boucle</strong> répète la cadence sans interruption, et après une erreur, <strong>Comparaison A/B</strong> et <strong>Écouter la basse</strong> confrontent directement votre choix et la solution.</p>
      </div>
    `
  },
  interval: {
    tagClass: "tag-peach",
    tag: "Mode d’emploi • Intervalles",
    title: "Comment fonctionne l’entraînement aux intervalles",
    lead: "Affûtez votre oreille sur des écarts purs à deux notes — mélodiques ascendants, mélodiques descendants et harmoniques simultanés. Pour les intervalles mélodiques, la note de départ change aléatoirement à chaque question dans un registre clair. (Vous cherchez les accords &amp; renversements ? Ils ont désormais leur propre module <strong>Accords</strong> !)",
    sections: `
      <h3>Les 4 types d’exercices</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Intervalles mélodiques (Ascendants)</h5>
          <p>Deux hauteurs se succèdent vers l’aigu : la mesure 1 donne la note de départ aléatoire (<code>Fa3–Mi4</code>), la mesure 2 vous invite à nommer le saut ascendant.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Intervalles mélodiques (Descendants)</h5>
          <p>Deux hauteurs descendent l’une après l’autre : la mesure 1 part d’une note aiguë aléatoire (<code>Fa♯4–Fa5</code>), la mesure 2 demande la chute descendante — un grand classique de formation auditive !</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Intervalles harmoniques</h5>
          <p>Les deux notes résonnent ensemble. Écoutez la fusion ou les battements — une fois résolues, les cartes affichent les deux hauteurs (ex. <code>Do4 + Sol4</code> / <code>C4 + G4</code>).</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Intervalles sur nappe tonique (Cordes ➔ Piano)</h5>
          <p>Une chaleureuse <strong>nappe de cordes</strong> tient la fondamentale en continu. Après un bref délai, le <strong>piano</strong> joue la note cible par-dessus — idéal pour sentir la couleur de chaque degré sur une pédale.</p>
        </div>
      </div>

      <h3>Difficulté des intervalles (3 niveaux)</h3>
      <ul class="article-steps-list">
        <li><strong>Niveau 1 – Débutant :</strong> Quatre repères incontournables (ascendants ou descendants) : Unisson (<code>P1</code>), Tierce majeure (<code>M3</code>), Quinte juste (<code>P5</code>) et Octave (<code>P8</code>).</li>
        <li><strong>Niveau 2 – Gamme majeure :</strong> Les 8 intervalles diatoniques de l’Unisson à l’Octave.</li>
        <li><strong>Niveau 3 – Chromatique :</strong> Les 15 intervalles de l’Unisson à la Neuvième majeure (<code>M9</code>), dont tous les intervalles mineurs et le Triton.</li>
      </ul>

      <h3>Comprendre la notation abrégée des intervalles</h3>
      <ul class="article-steps-list">
        <li><strong>Lettre = Nature (Couleur), Chiffre = Degré (<code>1</code>–<code>9</code>) :</strong> Le chiffre compte les noms de notes depuis le point de départ (<code>1</code> = Unisson, <code>2</code> = Seconde, <code>3</code> = Tierce … jusqu’à <code>9</code> = Neuvième), tandis que la lettre précise le nombre exact de demi-tons.</li>
        <li><strong><code>P</code> = Juste (<em>Perfect</em>) :</strong> Concerne l’Unisson (<code>P1</code>), la Quarte (<code>P4</code>), la Quinte (<code>P5</code>) et l’Octave (<code>P8</code>). Ces intervalles n’ont pas de variante majeure/mineure — uniquement leur forme « juste ».</li>
        <li><strong><code>M</code> &amp; <code>m</code> (International) ou <code>G</code> &amp; <code>k</code> (Allemand) :</strong> Utilisés pour les 2des (<code>2</code>), 3ces (<code>3</code>), 6tes (<code>6</code>), 7es (<code>7</code>) et 9es (<code>9</code>) :<br>
          – <strong><code>M</code> majuscule</strong> (<em>Major</em>, en allemand <strong><code>G</code></strong> = <em>Groß</em>) désigne l’intervalle majeur, plus large et lumineux (ex. <code>M3</code> / <code>G3</code> = Tierce majeure, 4 demi-tons).<br>
          – <strong><code>m</code> minuscule</strong> (<em>minor</em>, en allemand <strong><code>k</code></strong> = <em>klein</em>) est toujours <strong>plus serré d’un demi-ton</strong>, plus intime ou tendu (ex. <code>m3</code> / <code>k3</code> = Tierce mineure, 3 demi-tons). Faites bien attention à la casse entre <code>m</code> et <code>M</code> — leurs sonorités sont très distinctes !</li>
        <li><strong><code>TT</code> = Triton :</strong> Le point médian électrique à 6 demi-tons, exactement entre <code>P4</code> et <code>P5</code>.</li>
      </ul>
      <p><em>Changer d’abréviations :</em> Vous pouvez basculer à tout moment entre <strong>International (P / M / m)</strong> et <strong>Allemand (P / G / k)</strong> dans <strong>Paramètres → Notation musicale → Noms des intervalles</strong>.</p>

      <div class="article-highlight-box">
        <h4>Conseils d’entraînement</h4>
        <p>Touchez <strong>Note de départ</strong> à tout moment pour réentendre la note initiale seule. Après une erreur, la <strong>Comparaison A/B</strong> rejoue votre réponse depuis la même note de départ et dans la même direction (montante ou descendante) juste avant la bonne solution ; activez <strong>Suivant auto</strong> pour enchaîner sans interruption.</p>
      </div>
    `
  },
  chords: {
    tagClass: "tag-sage",
    tag: "Mode d’emploi • Accords",
    title: "Comment fonctionne l’entraînement aux accords",
    lead: "Développez une reconnaissance instantanée des couleurs d’accords — égrenés note après note (arpèges ascendants ou descendants) ou plaqués d’un bloc — et repérez quelle note de l’accord tient la basse dans les renversements.",
    sections: `
      <h3>Les 4 types d’exercices</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Arpège d’accord (Ascendant ↗)</h5>
          <p>Les notes de l’accord résonnent du grave à l’aigu afin de suivre clairement chaque tierce, quinte et septième — une fois trouvé, l’application réunit les notes en un accord plaqué complet.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Arpège d’accord (Descendant ↘)</h5>
          <p>L’accord se déroule de la note la plus aiguë vers la basse. Idéal pour ne pas dépendre du sens d’écoute habituel — après votre réponse, l’accord simultané révèle l’harmonie d’ensemble.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Accords (Simultanés)</h5>
          <p>Trois à cinq notes sonnent d’un seul coup. Écoutez la clarté ou la tension globale — une carte résolue se déploie en arpège ascendant en affichant toutes ses notes (ex. <code>Do4 · Mi4 · Sol4 · Si4</code>).</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Renversements d’accords</h5>
          <p>Identifiez quelle note tient la voix de basse tout en bas : <code>Basse : 1</code> (État fondamental), <code>Basse : 3</code> (1er renversement), <code>Basse : 5</code> (2e renversement) ou <code>Basse : 7</code> (3e renversement). La basse reste centrée dans un médium stable pour que vous jugiez la couleur de l’empilement plutôt que la hauteur absolue.</p>
        </div>
      </div>

      <h3>Difficulté – Nature des accords (4 niveaux)</h3>
      <ul class="article-steps-list">
        <li><strong>Niveau 1 – Triades de base :</strong> Les quatre triades essentielles : Majeur (<code>maj</code>), Mineur (<code>m</code>), Diminué (<code>dim</code>) et Augmenté (<code>aug</code>).</li>
        <li><strong>Niveau 2 – 7es &amp; Sus :</strong> Ajoute Quarte suspendue (<code>sus4</code>), Septième de dominante (<code>7</code>), Septième majeure (<code>maj7</code>) et Mineure 7 (<code>m7</code>).</li>
        <li><strong>Niveau 3 – 7es enrichies :</strong> Ajoute <code>sus2</code>, Demi-diminué (<code>m7♭5</code>), Diminué 7 (<code>°7</code>) et Mineur-Majeur 7 (<code>m(maj7)</code>).</li>
        <li><strong>Niveau 4 – Jazz &amp; Tensions :</strong> Les 15 couleurs d’accords, y compris les extensions jazz comme <code>maj9</code>, <code>7♭9</code> et <code>7♯9</code>.</li>
      </ul>

      <h3>Difficulté – Renversements (3 niveaux)</h3>
      <ul class="article-steps-list">
        <li><strong>Niveau 1 – Triade majeure (3) :</strong> État fondamental (<code>Basse : 1</code>), 1er renversement (<code>Basse : 3</code>) et 2e renversement (<code>Basse : 5</code>).</li>
        <li><strong>Niveau 2 – Majeur &amp; Mineur (3) :</strong> Les trois positions de triades mélangées entre accords majeurs lumineux et mineurs profonds.</li>
        <li><strong>Niveau 3 – Accords de 7e (4) :</strong> Accords à quatre sons (<code>7</code>, <code>maj7</code>, <code>m7</code>) introduisant le 3e renversement avec la septième à la basse (<code>Basse : 7</code>).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Conseils d’entraînement</h4>
        <p>Dans les exercices de nature d’accord, <strong>Fondamentale</strong> rejoue la tonique de l’accord ; dans les renversements, l’indice basse isole la note la plus grave entendue. Après une erreur, la <strong>Comparaison A/B</strong> rejoue votre proposition sur la même fondamentale juste avant la bonne réponse !</p>
      </div>
    `
  },
  melody: {
    tagClass: "tag-lilac",
    tag: "Mode d’emploi • Mélodies",
    title: "Comment fonctionne l’entraînement mélodique",
    lead: "Associez votre oreille de solfège au sens du rythme : une cadence fixe de 4 accords enchaîne sur 1 mesure de décompte puis sur une phrase musicale de 4 à 6 notes.",
    sections: `
      <h3>Déroulement d’une manche</h3>
      <ul class="article-steps-list">
        <li><strong>1. Cadence à 4 accords, décompte &amp; pulsation :</strong> Une progression d’ancrage (<code>I – vi – IV – V</code>) fixe la tonalité, suivie d’une mesure de décompte en <code>4/4</code> ou <code>3/4</code> avant 4 à 6 notes mêlant croches, noires, noires pointées, blanches et silences. Le bouton <strong>Pulsation : Oui/Non</strong> contrôle le clic rythmique.</li>
        <li><strong>2. Trois styles au choix :</strong> Choisissez entre <strong>En mesure</strong> (les valeurs rythmiques restent affichées pour se concentrer sur la hauteur), <strong>Dictée combinée</strong> (trouver la hauteur <em>et</em> la durée — <code>1/8</code>, <code>1/4</code>, <code>1/4.</code>, <code>1/2</code> — dans l’ordre de votre choix) et <strong>Bases (blanches)</strong> (4 blanches régulières pour démarrer).</li>
        <li><strong>3. Résolution pas à pas :</strong> Dès qu’une carte est validée, son <strong>nom de solfège</strong> (<code>Do</code>, <code>Mi</code>, <code>Fa</code>…) et sa note apparaissent avant de passer à la note suivante.</li>
        <li><strong>4. Réécouter sans rien perdre :</strong> Touchez <strong>▶ Écouter</strong> à tout moment pour réentendre la phrase complète tout en conservant les notes trouvées. <strong>Répéter la note</strong> isole la note en cours avec un clic de tempo de référence.</li>
      </ul>

      <h3>Niveaux, tonalités &amp; amplitude d’octave</h3>
      <ul class="article-steps-list">
        <li><strong>Niveau 1 – Do–Fa :</strong> Phrases de 4 à 5 notes issues du tétracorde inférieur (<code>Do, Re, Mi, Fa</code>).</li>
        <li><strong>Niveau 2 – Sol–Do :</strong> Phrases de 4 à 6 notes sur la moitié supérieure (<code>Sol, La, Ti, Do</code>).</li>
        <li><strong>Niveau 3 – Tonalité complète :</strong> Les sept degrés du solfège (<code>Do</code> à <code>Do</code>) sur 4 à 6 notes.</li>
        <li><strong>Do majeur vs Tonalités changeantes &amp; Octaves :</strong> Entraînez-vous en <code>Do majeur</code> fixe ou dans des tonalités aléatoires, sur 1 octave ou avec des changements de registre musicaux.</li>
      </ul>
    `
  },
  solfege: {
    tagClass: "tag-sage",
    tag: "Mode d’emploi • Solfège",
    title: "Comment fonctionne le solfège relatif (Do mobile)",
    lead: "Le solfège relatif (Movable-Do) forge l’oreille relative : vous apprenez à reconnaître chacun des 7 degrés (Do–Ti) grâce à sa tension caractéristique et son attirance naturelle au sein de la tonalité.",
    sections: `
      <h3>Chaque manche suit 4 étapes claires</h3>
      <ul class="article-steps-list">
        <li><strong>1. Cadence de contexte :</strong> Une courte progression (<code>I – vi – IV – V</code>) accorde proprement votre oreille sur le centre tonal.</li>
        <li><strong>2. Note cible :</strong> Après un instant, vous entendez un seul degré isolé issu de cette tonalité.</li>
        <li><strong>3. Répondre au clavier :</strong> Seules les touches actives de la gamme affichent les syllabes (<em>Do–Re–Mi–Fa–Sol–La–Ti–Do</em>), encadrées d’une touche de marge de chaque côté ; les touches hors gamme restent atténuées.</li>
        <li><strong>4. Erreurs silencieuses &amp; Résolution naturelle :</strong> Une mauvaise touche clignote discrètement en rouge sans son afin de préserver votre mémoire tonale. La bonne touche s’illumine en vert et joue sa résolution fonctionnelle vers la tonique (<code>Do–Fa</code> vers le bas, <code>Sol–Ti</code> vers le haut).</li>
      </ul>

      <h3>Les 6 niveaux de difficulté</h3>
      <ul class="article-steps-list">
        <li><strong>Niveaux 1 &amp; 2 (1 octave) :</strong> Le niveau 1 reste fixe en <code>Do majeur</code> ; le niveau 2 choisit une tonalité aléatoire pour toute la session.</li>
        <li><strong>Niveaux 3 &amp; 4 (Multi-octaves) :</strong> Les degrés cibles sautent dans les octaves graves ou aiguës — soit en <code>Do majeur</code> fixe (Niveau 3), soit dans une tonalité aléatoire fixe (Niveau 4).</li>
        <li><strong>Niveaux 5 &amp; 6 (Modulations de tonalité) :</strong> Chaque bonne réponse module dans une toute nouvelle tonalité — d’abord sur 1 octave (Niveau 5), puis sur plusieurs octaves (Niveau 6).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Repères à l’écran</h4>
        <p>Au-dessus du clavier figurent le <strong>badge de tonalité</strong> (touchez-le pour entendre l’accord tonique), <strong>Tonique (Do)</strong> et <strong>Répéter la note</strong>. En bas, le bouton violet <strong>Boucle</strong> rejoue doucement la note cible toutes les 3 secondes ; le passage automatique à la manche suivante se règle dans les <strong>Paramètres</strong>.</p>
      </div>
    `
  },
  rhythm: {
    tagClass: "tag-sage",
    tag: "Mode d’emploi • Rythme",
    title: "Comment fonctionne l’entraînement rythmique",
    lead: "Quatre modules complémentaires aiguisent votre horloge interne, la lecture rythmique, la précision de frappe en direct et le sens du pocket en groupe — le tout réglable en temps réel par le tempo (BPM).",
    sections: `
      <h3>Les 4 modules de rythme</h3>
      <ul class="article-steps-list">
        <li><strong>1. Mesure &amp; Chiffrage :</strong> Écoutez deux mesures de percussion (avec un Temps <code>1</code> accentué) et distinguez <code>4/4</code>, <code>3/4</code>, <code>2/4</code>, <code>6/8</code> ainsi que les mesures asymétriques (<code>5/4</code> / <code>7/8</code>).</li>
        <li><strong>2. Dictée rythmique (4 temps) :</strong> Après une mesure de décompte, un motif sur quatre temps joue au clave. Complétez les quatre points d’interrogation avec les blocs rythmiques correspondants (des noires et soupirs jusqu’aux triolets, doubles croches et syncopes).</li>
        <li><strong>3. Reproduire au pad (Frappe en direct) :</strong> Lauscher fait le décompte, montre une mesure puis vous passe la main — frappez exactement le rythme sur le grand <strong>Pad de frappe</strong> (ou avec la barre <code>Espace</code>), jusqu’au <em>Mode aveugle</em> sans aucun clic !</li>
        <li><strong>4. Groove, Contretemps &amp; Micro-Timing :</strong> Reconnaissez les styles de groove (marche, backbeat, syncope, swing, 3 pour 2), repérez les accents de cloche sur le contretemps et affinez votre placement (<em>en avance / rushé</em>, <em>pile dans le pocket</em> ou <em>au fond du temps / laid-back</em>).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Conseils de pratique</h4>
        <p>Démarrez <strong>Reproduire au pad</strong> avec l’<strong>aide du clic ACTIVÉE</strong> autour de 80–95 BPM. Une fois à l’aise, coupez le clic ou passez au <strong>Mode aveugle</strong> pour bâtir un métronome intérieur inébranlable.</p>
      </div>
    `
  },
  production: {
    tagClass: "tag-lilac",
    tag: "Mode d’emploi • Production & Mixage",
    title: "Comment fonctionne l’entraînement Fréquences & Égalisation",
    lead: "Étalonnez vos oreilles d’ingénieur du son sur les bandes ISO normalisées au tiers d’octave — en commençant par des sinusoïdes pures avant d’identifier des boosts paramétriques dans du bruit rose.",
    sections: `
      <h3>Les 2 modules de production</h3>
      <ul class="article-steps-list">
        <li><strong>1. Reconnaissance de fréquences pures (Sinus) :</strong> Écoutez un son pur calibré des sub-graves (<code>63 Hz</code>) jusqu’à l’air brillant (<code>12 kHz</code>) et localisez sa bande. Touchez <strong>« Réf : 1 kHz »</strong> à tout moment pour recalibrer votre oreille.</li>
        <li><strong>2. Égalisation sur bruit rose (Pro) :</strong> Vous entendez d’abord du <em>Bruit rose</em> neutre non traité (« Plat »), puis un filtre en cloche paramétrique amplifie une seule bande cible. Basculez librement <strong>« Bypass Plat »</strong> pour comparer instantanément le signal brut et le signal égalisé.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Protection auditive &amp; Mixage</h4>
        <p>Le bruit rose décroît de 3 dB par octave afin que l’énergie paraisse équilibrée des graves aux aigus. Un limiteur de sécurité intégré à -14 dBFS, une pondération isosonique autour de 2–4 kHz et des enveloppes d’attaque douces protègent vos oreilles des pics agressifs. Écoutez néanmoins toujours à volume confortable, faible à modéré !</p>
      </div>
    `
  },
  modes: {
    tagClass: "tag-peach",
    tag: "Mode d’emploi • Gammes & Modes",
    title: "Comment fonctionne l’entraînement aux gammes & modes",
    lead: "Oubliez la mémorisation sèche de doigtés : écoutez chaque mode ecclésiastique en pleine couleur musicale — ancré sur une même fondamentale ou transposé dans différentes tonalités.",
    sections: `
      <h3>Les 3 modules modaux</h3>
      <ul class="article-steps-list">
        <li><strong>1. Reconnaître la gamme / le mode :</strong> Une <strong>Quinte d’ancrage</strong> neutre résonne d’abord (fondamentale + quinte, volontairement sans tierce), suivie de la gamme ascendante de 8 notes. Commencez au <em>Niveau 1</em> avec quatre modes contrastés (<code>Ionien</code>, <code>Éolien</code>, <code>Dorien</code>, <code>Mixolydien</code>), débloquez les 7 modes diatoniques au <em>Niveau 2</em> et transposez au <em>Niveau 3</em>.</li>
        <li><strong>2. Note caractéristique &amp; Couleur :</strong> Après la quinte neutre, une brève tournure mélodique met en lumière le degré signature du mode (<code>♯4</code> en Lydien, <code>♭7</code> en Mixolydien, <code>♮6</code> en Dorien, <code>♭2</code> en Phrygien, ou la sensible <code>♯7</code> en Mineur harmonique).</li>
        <li><strong>3. Cadences &amp; Vamps modaux :</strong> Écoutez des vamps classiques à deux accords (<code>i – IV</code> pour Dorien, <code>I – bVII</code> pour Mixolydien, <code>I – II</code> pour Lydien, <code>i – bII</code> pour Phrygien) et saisissez immédiatement l’atmosphère du mode.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Astuce d’écoute pro : pensez parallèle, pas relatif !</h4>
        <p>Au début, comparez tous les modes depuis la <strong>même fondamentale</strong> (ex. <strong>Do Ionien</strong> vs <strong>Do Mixolydien</strong> vs <strong>Do Dorien</strong>). Touchez <em>« Quinte d’ancrage »</em> ou la comparaison A/B après une erreur pour entendre basculer exactement la note de couleur.</p>
      </div>
    `
  },
  warmup: {
    tagClass: "tag-sage",
    tag: "Mode d’emploi • Échauffement vocal",
    title: "Comment fonctionne l’échauffement vocal de 5 minutes",
    lead: "Conçu pour les répétitions chorales, cours de chant et routines quotidiennes : un parcours guidé allant de la respiration diaphragmatique et du bourdonnement résonant jusqu’aux arpèges modulants et aux accords de chœur.",
    sections: `
      <h3>Les 4 phases d’échauffement</h3>
      <ul class="article-steps-list">
        <li><strong>Phase 1 – Souffle &amp; Corps :</strong> Un cercle respiratoire rythmé sur <code>ffff / ssss</code> et de douces impulsions d’articulation (<code>P – T – K</code>) réveillent le soutien abdominal sans crisper la gorge.</li>
        <li><strong>Phase 2 – Résonance &amp; Placement :</strong> Bouche fermée / trilles de lèvres faciles (<code>Mmm / Brrr</code>) et soupirs descendants de quinte (<code>5–4–3–2–1</code>) unissent en douceur voix de poitrine et voix de tête.</li>
        <li><strong>Phase 3 – Agilité &amp; Arpèges :</strong> Des arpèges ascendants de triade et d’octave (<code>1–3–5–3–1</code> et <code>1–3–5–8–5–3–1</code>) modulent automatiquement par demi-tons dans votre tessiture choisie (<strong>Chœur Médium, Soprano, Alto, Ténor ou Basse</strong>), puis redescendent calmement.</li>
        <li><strong>Phase 4 – Voyelles &amp; Fondu choral :</strong> Le glissement de voyelles (<code>Ou → Ô → A → É → I</code>) et un accord SATB empilé ancrent une justesse homogène.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Contrôles pédagogiques en direct</h4>
        <p>Utilisez les pastilles en haut à tout moment pour changer la <strong>Tessiture (SATB)</strong>, le <strong>Son d’accompagnement</strong> (Piano, Piano + Voix ou Voix) et le <strong>Tempo</strong>. Touchez <strong>« −1 / +1 demi-ton »</strong> ou <strong>« ↻ Répéter »</strong> en plein exercice pour adapter la tonalité à vos élèves ou à votre chœur.</p>
      </div>
    `
  },
  notation: {
    tagClass: "tag-sage",
    tag: "Mode d’emploi • Solfège & Lecture de notes",
    title: "Comment fonctionne l’entraînement à la lecture de notes",
    lead: "Développez une lecture fluide en clés de Sol, Fa et Ut 3 (Alto) — des 5 lignes centrales jusqu’à ±3 lignes supplémentaires dans les deux sens avec altérations (♯/♭).",
    sections: `
      <h3>Architecture de l’écran d’exercice</h3>
      <ul class="article-steps-list">
        <li><strong>1. Grande portée en haut (flux de 6 notes) :</strong> Le bandeau coloré tout à gauche met toujours en évidence la note active à lire. Juste derrière, les 5 notes suivantes anticipent le mouvement comme en vraie lecture à vue.</li>
        <li><strong>2. Clavier en bas pour répondre :</strong> Touchez la note demandée sur le clavier. Si la réponse est exacte, le son retentit à sa véritable octave, la scène centrale affiche clairement son nom et toute la file glisse d’un cran vers la gauche tandis qu’une nouvelle note apparaît à droite.</li>
        <li><strong>3. Erreurs &amp; bouton Passer :</strong> Une touche erronée devient rouge sans faire avancer la file afin de vérifier tranquillement l’emplacement. En cas d’hésitation, touchez <strong>Passer</strong> : la bonne note s’affiche aussitôt avant de passer à la suivante.</li>
      </ul>

      <h3>Les niveaux &amp; les armures</h3>
      <ul class="article-steps-list">
        <li><strong>Niveau 1 – 5 lignes de base :</strong> Notes naturelles situées sur les 5 lignes et 4 interlignes, sans lignes supplémentaires.</li>
        <li><strong>Niveau 2 – ±2 lignes supplémentaires :</strong> Tessiture élargie jusqu’à 2 lignes supplémentaires au-dessus et au-dessous.</li>
        <li><strong>Niveau 3 – ±3 lignes supplémentaires (Complet) :</strong> Tessiture complète s’étendant sur 3 lignes supplémentaires de chaque côté.</li>
        <li><strong>Niveau 4 – ±3 lignes + ♯/♭/♮ :</strong> Ajoute les dièses (<code>♯</code>) et bémols (<code>♭</code>) en Do majeur, ou les <strong>bécarres (<code>♮</code>)</strong> et altérations accidentelles lorsqu’une armure est active, en notation internationale ou allemande.</li>
        <li><strong>Lecture à vue avec armures (1–6 ♯/♭) :</strong> Choisissez une tonalité précise ou un ensemble rotatif depuis la page Notation ou via le bouton <strong>Tonalité</strong> en cours d’exercice. Comme sur une vraie partition, l’armure placée à la clé commande toutes les notes correspondantes sur le clavier.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Mix de clés &amp; Note de repère</h4>
        <p>Dans le <strong>Mix de clés</strong>, la portée alterne régulièrement entre clés de Sol, Fa et Ut 3 avec un petit repère de changement avant la note. En bas à gauche, le bouton <strong>Repère</strong> fait entendre à tout moment le son d’ancrage de la clé active (<code>Sol4</code>, <code>Fa3</code> ou <code>Do4</code>).</p>
      </div>
    `
  }
};

function renderRhythmReferenceHTML_FR() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Pulsation &amp; Mesures</span>
        <span class="k-ratio-chip">Chiffrage de mesure</span>
      </div>
      <h4>Ce qui structure chaque morceau dans le temps</h4>
      <p>
        Presque toute musique respire grâce à un battement régulier appelé la <strong>pulsation (ou temps)</strong>. Sa vitesse se mesure en <strong>BPM</strong> (<em>Battements par Minute</em>). La <strong>mesure</strong> regroupe ces temps en cycles réguliers — particulièrement sensibles sur le <strong>premier temps (temps fort)</strong>.
      </p>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Mesure à 4/4 (Quatre temps)</strong>
          <span>Quatre noires par mesure (<strong>1</strong>–2–3–4). Le pilier de presque toute la pop, du rock, du hip-hop et du funk.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Mesure à 3/4 (Valse)</strong>
          <span>Trois noires par mesure (<strong>1</strong>–2–3). Balancement tournoyant (<em>Le Beau Danube bleu</em>, <em>La Valse à mille temps</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Mesure à 6/8 (Binaire composé)</strong>
          <span>Six croches groupées en deux grands temps ternaires (<strong>1</strong>-2-3-<strong>4</strong>-5-6) : l’élan roulant des ballades (<em>Nothing Else Matters</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Mesure à 5/4 (Mesure asymétrique)</strong>
          <span>Regroupement asymétrique 3 + 2 (ou 2 + 3), célèbre grâce à <em>Take Five</em> de Dave Brubeck ou au thème de <em>Mission : Impossible</em>.</span>
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="meter-4-4">▶ 4/4 Standard</button>
        <button class="btn-tool" data-play-rhythm="meter-3-4">▶ 3/4 Valse</button>
        <button class="btn-tool" data-play-rhythm="meter-6-8">▶ 6/8 Ternaire</button>
        <button class="btn-tool" data-play-rhythm="meter-5-4">▶ 5/4 Asymétrique (3+2)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Valeurs &amp; Subdivisions</span>
        <span class="k-ratio-chip">1 · 2 · 3 · 4</span>
      </div>
      <h4>Comment se divise chaque battement</h4>
      <p>
        Pendant que la grosse caisse ancre la pulsation principale, les musiciens découpent chaque temps en éclats plus fins (<strong>subdivisions</strong>). Ajouter un <strong>point</strong> après une note prolonge sa durée de la moitié — créant ce saut caractéristique « long-court ».
      </p>
      <ul class="k-physics-list">
        <li><strong>Rondes &amp; Blanches :</strong> Tenues larges couvrant respectivement 4 temps ou 2 temps.</li>
        <li><strong>Noires :</strong> Un coup exactement sur chaque temps principal (<em>1 – 2 – 3 – 4</em>).</li>
        <li><strong>Croches :</strong> Deux frappes égales par temps (<em>1-et – 2-et</em>).</li>
        <li><strong>Triolets :</strong> Trois notes régulières logées dans un seul temps (<em>1-tri-o-let</em> / <em>1-2-3 – 2-2-3</em>).</li>
        <li><strong>Doubles croches :</strong> Quatre frappes nerveuses par temps (<em>1-e-et-a</em>) — le moteur des grooves funk et des charleys trap.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="sub-quarter">▶ Noires (1×)</button>
        <button class="btn-tool" data-play-rhythm="sub-eighth">▶ Croches (2×)</button>
        <button class="btn-tool" data-play-rhythm="sub-triplet">▶ Triolets (3×)</button>
        <button class="btn-tool" data-play-rhythm="sub-sixteenth">▶ Doubles croches (4×)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Groove, Backbeat &amp; Swing</span>
        <span class="k-ratio-chip">Temps vs Contretemps</span>
      </div>
      <h4>Pourquoi une même mesure à 4/4 change totalement d’âme</h4>
      <p>
        Qu’un rythme marche au pas ou fasse irrésistiblement hocher la tête tient tout entier à l’endroit où tombent les accents :
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Marche vs Backbeat (2 &amp; 4)</h5>
          <p>Accentuer les temps <strong>1 &amp; 3</strong> sonne comme une fanfare. Basculez le claquement de caisse claire sur <strong>2 &amp; 4</strong> (le <em>backbeat</em>) et la pop, le rock et la soul naissent aussitôt !</p>
          <button class="btn-tool" data-play-rhythm="beat-march">▶ Marche (1 &amp; 3)</button>
          <button class="btn-tool" data-play-rhythm="beat-backbeat">▶ Backbeat (2 &amp; 4)</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Syncope &amp; Swing / Shuffle</h5>
          <p>La <strong>syncope</strong> déplace l’accent sur les contretemps faibles (« et »). Dans le <strong>swing</strong>, les croches rebondissent de manière inégale (environ 2:1 en triolet au lieu d’un 1:1 binaire droit).</p>
          <button class="btn-tool" data-play-rhythm="beat-syncopation">▶ Groove syncopé</button>
          <button class="btn-tool" data-play-rhythm="beat-swing">▶ Ressenti Swing</button>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Polyrythmie &amp; Repères célèbres</span>
        <span class="k-ratio-chip">3 pour 2</span>
      </div>
      <h4>Deux horloges simultanées + Morceaux repères inoubliables</h4>
      <p>
        La <strong>polyrythmie</strong> superpose deux grilles de pulsation contrastées en même temps — la plus célèbre étant le <strong>3 pour 2</strong> (le woodblock divise la mesure en 3 pendant que la grosse caisse frappe 2 temps réguliers dans le même intervalle). Souvenez-vous de Physique &amp; Son : en hauteur, ce même rapport <code>3:2</code> donne la Quinte juste !
      </p>
      <div class="k-meta-box">
        <strong>Associer les mesures à des tubes inoubliables :</strong>
        <ul class="k-physics-list" style="margin-top:0.25rem;">
          <li><strong>4/4 :</strong> « We Will Rock You » (Queen) • « Billie Jean » (Michael Jackson)</li>
          <li><strong>3/4 :</strong> « Piano Man » (Billy Joel) • Valse viennoise classique</li>
          <li><strong>6/8 :</strong> « Nothing Else Matters » (Metallica) • « We Are the Champions » (Queen)</li>
          <li><strong>5/4 :</strong> « Take Five » (Dave Brubeck) • « Mission : Impossible »</li>
        </ul>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="poly-3-2">▶ Écouter la polyrythmie « 3 pour 2 »</button>
      </div>
    </article>
  `;
}

const RHYTHM_INSTRUMENTS_DATA_FR = [
  {
    category: "drumset",
    tag: "Batterie • Assise grave",
    tagClass: "tag-peach",
    name: "Grosse caisse / Kick",
    role: "Poids & impact dans le grave (~50–120 Hz)",
    desc: "Le plus grand fût de la batterie, actionné au pied par une pédale. Elle ancre les temps lourds (souvent 1 & 3, ou les quatre noires régulières en musique électronique) et se verrouille avec la basse.",
    rhythmKey: "inst-kick",
    btnLabel: "Écouter la grosse caisse"
  },
  {
    category: "drumset",
    tag: "Batterie • Claquement du backbeat",
    tagClass: "tag-peach",
    name: "Caisse claire (Snare)",
    role: "Accent sec sur les temps 2 & 4",
    desc: "Un timbre métallique tendu sous la peau de résonance vibre à chaque coup, produisant le claquement pop/rock incisif, les subtiles ghost notes et les roulements serrés.",
    rhythmKey: "inst-snare",
    btnLabel: "Écouter caisse claire & roulement"
  },
  {
    category: "drumset",
    tag: "Batterie • Subdivisions",
    tagClass: "tag-peach",
    name: "Charleston (Hi-Hat) & Cymbales (Ride / Crash)",
    role: "Précision du débit & ponctuations de structure",
    desc: "Deux cymbales actionnées au pied (charleston) découpent croches ou doubles croches avec souplesse. La grande cymbale ride porte le swing jazz, tandis que les cymbales crash marquent les départs de refrain.",
    rhythmKey: "inst-hat",
    btnLabel: "Écouter la subdivision du charleston"
  },
  {
    category: "drumset",
    tag: "Batterie • Breaks mélodiques",
    tagClass: "tag-peach",
    name: "Toms (Toms aigus & Tom basse)",
    role: "Transitions, breaks & descentes en cascade",
    desc: "Fûts accordés sans timbre inférieur. Réglés de l’aigu vers le grave, ils dévalent la batterie pour annoncer l’arrivée du refrain.",
    rhythmKey: "inst-toms",
    btnLabel: "Écouter un break de toms"
  },
  {
    category: "world",
    tag: "Percussion à main • Polyvalente",
    tagClass: "tag-lilac",
    name: "Cajón (Caisse péruvienne)",
    role: "Mini-batterie acoustique portable",
    desc: "Originaire du Pérou, cette caisse de bois sur laquelle on s’assoit produit une basse profonde vers le centre et un claquement de caisse claire grâce aux cordes internes placées sous le bord supérieur."
  },
  {
    category: "world",
    tag: "Percussion à main • Latine & Pop",
    tagClass: "tag-lilac",
    name: "Congas & Bongos",
    role: "Grooves chantants & ornements pétillants",
    desc: "Grands tambours afro-cubains joués par paires. Les congas déroulent des tumbaos chauds et chantants pendant que les petits bongos brillent au-dessus par leurs attaques claquantes.",
    rhythmKey: "inst-conga",
    btnLabel: "Écouter un tumbao de congas"
  },
  {
    category: "world",
    tag: "Mains & Orchestre symphonique",
    tagClass: "tag-lilac",
    name: "Djembé, Darbouka & Timbales d’orchestre",
    role: "Dynamique du murmure au tonnerre",
    desc: "Les tambours en gobelet comme le djembé ouest-africain unissent basses rondes et claques cinglantes. À l’orchestre symphonique, les timbales accordées au pied apportent une hauteur précise aux coups de tonnerre."
  },
  {
    category: "small",
    tag: "Repère temporel • Bois",
    tagClass: "tag-sage",
    name: "Claves & Woodblock",
    role: "Boussole rythmique d’une précision chirurgicale",
    desc: "Deux bâtonnets de bois dur frappés l’un contre l’autre. Bien qu’ils tiennent dans une main, leur attaque sèche traverse tout un big band — formant l’armature de la clave Son 3–2 dans la salsa et les musiques latines.",
    rhythmKey: "inst-clave",
    btnLabel: "Écouter la Clave Son 3–2"
  },
  {
    category: "small",
    tag: "Petites percussions • Mouvement",
    tagClass: "tag-sage",
    name: "Shaker, Maracas & Tambourin",
    role: "Élan vers l’avant & texture aérienne",
    desc: "Les shakers emplis de billes tissent un flux continu de doubles croches reliant grosse caisse et caisse claire, injectant un élan immédiat même sur les tempos lents.",
    rhythmKey: "inst-shaker",
    btnLabel: "Écouter le tapis de shaker"
  },
  {
    category: "small",
    tag: "Petites percussions • Métal",
    tagClass: "tag-sage",
    name: "Cloche (Cowbell), Agogô & Triangle",
    role: "Contretemps perçants & accents brillants",
    desc: "Voix métalliques incisives adorées en funk, disco et musiques afro-latines — dont le dialogue à deux hauteurs des cloches agogô.",
    rhythmKey: "inst-cowbell",
    btnLabel: "Écouter le riff de cowbell"
  },
  {
    category: "small",
    tag: "À ne jamais sous-estimer !",
    tagClass: "tag-sage",
    name: "Basse électrique, Contrebasse & Guitare rythmique",
    role: "Le pont entre rythme & harmonie",
    desc: "Le groove ne regarde pas que le batteur ! Grosse caisse et basse forment le moteur de la section rythmique, tandis que les cocottes étouffées de guitare ou de clavinet jouent comme une véritable percussion mélodique."
  }
];

function renderRhythmInstrumentsHTML_FR(filterCat = "all") {
  const ensembleCard = `
    <div class="article-highlight-box" style="margin-bottom:0.2rem;">
      <h4>Comment les percussions partagent un seul groove (Répartition fréquentielle) :</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-dark); line-height:1.4;">
        Chaque instrument occupe sa propre bande sonore pour garder un groove limpide : la <strong>Grosse caisse</strong> tout en bas, la <strong>Caisse claire</strong> qui claque dans le médium, le <strong>Charleston &amp; Shaker</strong> qui scintillent en haut.
      </p>
      <div class="k-btn-row" style="margin-top:0.35rem;">
        <button class="btn-tool" data-play-rhythm="band-groove">▶ Groove d’ensemble (Kick + Snare + Charly + Shaker)</button>
      </div>
    </div>
  `;

  const items = RHYTHM_INSTRUMENTS_DATA_FR.filter(item => filterCat === "all" || item.category === filterCat);
  return (filterCat === "all" ? ensembleCard : "") + items.map(item => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${item.tagClass}">${item.tag}</span>
        <span class="k-ratio-chip">${item.role.split("(")[0].trim()}</span>
      </div>
      <h4>${item.name}</h4>
      <p><strong>Rôle :</strong> ${item.role}</p>
      <p>${item.desc}</p>
      ${item.rhythmKey ? `
        <div class="k-btn-row">
          <button class="btn-tool" data-play-rhythm="${item.rhythmKey}">▶ ${item.btnLabel}</button>
        </div>
      ` : ""}
    </article>
  `).join("");
}

function renderVocalsReferenceHTML_FR() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">La voix humaine</span>
        <span class="k-ratio-chip">Le premier instrument</span>
      </div>
      <h4>Comment la voix humaine produit le son</h4>
      <p>Votre voix réunit trois systèmes acoustiques complets au sein d’un seul instrument vivant. Contrairement à une guitare ou à une flûte, sa « caisse de résonance » se métamorphose en quelques millisecondes — sculptant hauteur, puissance, harmoniques, voyelles et consonnes à la fois.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>1. La source d’énergie (Souffle &amp; Soutien)</strong>
          À l’inspiration, le <em>diaphragme</em> s’abaisse pour ouvrir les poumons. Au chant, abdominaux et intercostaux régulent une <em>pression sous-glottique</em> régulière (« appui du souffle ») sans jamais serrer la gorge.
        </div>
        <div class="physics-fact-item">
          <strong>2. Le vibrateur (Larynx &amp; Cordes vocales)</strong>
          Dans le larynx s’étirent deux <em>plis vocaux</em> élastiques. Le flux d’air les aspire l’un contre l’autre puis les écarte en cadence (100 à 1 000 fois par seconde via l’<em>effet Bernoulli</em>), produisant un timbre brut riche en harmoniques.
        </div>
        <div class="physics-fact-item">
          <strong>3. Le résonateur (Conduit vocal &amp; Formants)</strong>
          Gorge, bouche et fosses nasales filtrent ce son brut. Bouger langue, mâchoire, lèvres et voile du palais déplace des pics de résonance appelés <em>formants</em> — transformant un « Ou » rond en un « I » éclatant.
        </div>
        <div class="physics-fact-item">
          <strong>4. Le formant du chanteur (~3 000 Hz)</strong>
          En élargissant le pharynx inférieur, les chanteurs lyriques concentrent l’énergie autour de 2,8–3,2 kHz — là où le spectre de l’orchestre se creuse — permettant à une voix sans micro de porter au-dessus de 80 instruments !
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C4,E4,G4,C5" data-dur="1.9" data-step="0">▶ Écouter un accord choral</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Registres &amp; Techniques</span>
        <span class="k-ratio-chip">Couleurs vocales</span>
      </div>
      <h4>Registres vocaux &amp; Techniques de chant</h4>
      <p>Selon les muscles laryngés engagés — et selon que les cordes vocales vibrent dans toute leur épaisseur ou uniquement sur leurs bords fins — la voix change radicalement de caractère :</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Voix de poitrine (Registre modal, M1)</strong>
          Toute la masse musculaire des cordes vocales vibre ensemble. Donne un timbre chaud, ancré et charnu — notre registre naturel de parole et la base de puissance dans le grave et le médium.
        </div>
        <div class="physics-fact-item">
          <strong>Voix de tête &amp; Fausset (M2)</strong>
          Les cordes vocales s’étirent et s’affinent pour ne vibrer que sur leur bord externe. Offre une couleur légère, flûtée et aérienne (voix de tête lyrique homogène ou <em>falsetto / fausset</em> voilé).
        </div>
        <div class="physics-fact-item">
          <strong>Voix mixte</strong>
          Jette un pont fluide à travers le <em>passaggio</em> (passage entre registres). Un équilibre musculaire précis garde un timbre unifié du grave à l’aigu sans cassure soudaine.
        </div>
        <div class="physics-fact-item">
          <strong>Belting (Pop, Comédie musicale, Gospel)</strong>
          Projette l’assise de la voix de poitrine jusque dans l’aigu grâce à un soutien franc et des voyelles ouvertes — présence directe et puissante autour de Sol5/Do6.
        </div>
        <div class="physics-fact-item">
          <strong>Vibrato</strong>
          Une oscillation naturelle, souple et périodique de hauteur et d’intensité autour de 5–7 Hz. Apporte chaleur aux notes tenues et aide une voix soliste à se détacher du chœur.
        </div>
        <div class="physics-fact-item">
          <strong>Scat &amp; Chant diphonique (harmonique)</strong>
          Le <em>scat</em> jazz imite les chorus d’instruments à vent sur des syllabes rythmées (« shoo-be-doo »). Dans le <em>chant diphonique</em>, la forme précise de la langue amplifie une harmonique étroite sur un bourdon jusqu’à faire entendre deux notes simultanées !
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">Écriture chorale (SATB)</span>
        <span class="k-ratio-chip">Pupitres &amp; Tessitures</span>
      </div>
      <h4>Au cœur du chœur : pupitres SATB &amp; Tessitures</h4>
      <p>Les chœurs mixtes du monde entier suivent l’ordre <strong>SATB</strong> — nommé de l’aigu au grave d’après les quatre grands pupitres. Les grands chœurs symphoniques divisent souvent chaque pupitre en Divisi I et II, formant huit voix : <em>SSAATTBB</em>.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Soprano (S) • Tessiture typique Do4–Do6 (C4–C6)</strong>
          La voix féminine ou d’enfant la plus aiguë. Porte le plus souvent la mélodie principale, les harmonies supérieures et l’éclat cristallin.
        </div>
        <div class="physics-fact-item">
          <strong>Alto (A) • Tessiture typique Fa3–Mi5 (F3–E5)</strong>
          La voix féminine grave (ou contre-ténor). Nourrit la chaleur intérieure de l’harmonie (tierces, septièmes, retards expressifs) juste sous la mélodie.
        </div>
        <div class="physics-fact-item">
          <strong>Ténor (T) • Tessiture typique Do3–La4 (C3–A4)</strong>
          La voix masculine aiguë (souvent notée en clé de sol octaviée sonnant une octave plus bas !). Relie les moitiés haute et basse avec des contre-chants lyriques ou des aigus solaires.
        </div>
        <div class="physics-fact-item">
          <strong>Basse (B) • Tessiture typique Mi2–Mi4 (E2–E4)</strong>
          Le pupitre masculin le plus grave et la fondation acoustique du chœur. Les basses fixent la fondamentale — quand elles sont parfaitement justes, tout l’accord s’aligne d’un coup.
        </div>
        <div class="physics-fact-item">
          <strong>Mezzo-soprano, Baryton &amp; Contre-ténor</strong>
          Trois voix intermédiaires essentielles : <em>Mezzo</em> (La3–La5, pont riche entre Soprano et Alto), <em>Baryton</em> (Sol2–Sol4, la tessiture masculine la plus fréquente) et <em>Contre-ténor</em> (tessiture d’alto masculin par voix de tête travaillée).
        </div>
        <div class="physics-fact-item">
          <strong>Autres formations vocales</strong>
          Les <em>chœurs à voix égales (SSAA)</em> et <em>chœurs d’hommes (TTBB / Barbershop)</em> serrent les accords pour exalter les harmoniques. Les groupes <em>a cappella</em> modernes ajoutent du beatbox en guise de batterie.
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G4,B4,D5,G5" data-dur="0.95" data-step="320">▶ Registre Soprano</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G3,Bb3,D4,F4" data-dur="0.95" data-step="320">▶ Registre Alto</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,E3,G3,B3" data-dur="0.95" data-step="320">▶ Registre Ténor</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="E2,G2,B2,E3" data-dur="1.05" data-step="340">▶ Fondation Basse</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Justesse &amp; Écoute</span>
        <span class="k-ratio-chip">Intonation juste</span>
      </div>
      <h4>Pourquoi un chœur a cappella sonne parfois plus pur qu’un piano</h4>
      <p>Les pianos sont accordés en <strong>tempérament égal à 12 demi-tons</strong> : leurs tierces majeures sont environ 14 cents trop hautes afin que les douze tonalités restent jouables. Les chanteurs, eux, ne sont liés ni à des frettes ni à des marteaux fixes.</p>
      <p>En chantant sans accompagnement, de bons choristes ajustent instinctivement leurs intervalles vers des <strong>rapports purs d’intonation juste</strong> (2:1 octave, 3:2 quinte, 5:4 tierce majeure). À l’instant où la tierce majeure se cale sans aucun battement, les harmoniques communes se renforcent mutuellement — et tout l’accord s’épanouit soudainement avec un éclat saisissant (le fameux « barbershop ring »).</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="1.4" data-step="460">▶ Empiler voix par voix (Basse → Sop.)</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="2.4" data-step="0">▶ Accord choral SATB complet</button>
        <button class="btn-tool" data-open-warmup="true">▶ Ouvrir l’échauffement vocal 5 min</button>
      </div>
    </article>
  `;
}


const INSTRUMENT_MODULES_DATA_FR = {
  strings: {
    title: "Cordes frottées",
    subtitle: "Physique de l’archet, famille des cordes d’orchestre & articulations",
    intro: {
      tag: "Physique & Lutherie",
      tagClass: "tag-peach",
      chip: "Mouvement « Stick-Slip » de Helmholtz",
      heading: "Comment l’archet fait chanter les cordes",
      body: "Le crin de cheval frotté de <em>colophane</em> collante accroche puis relâche la corde des centaines de fois par seconde selon un cycle net d’adhérence-glissement. Un <em>chevalet</em> en érable sculpté transmet ces vibrations à la table d’harmonie creuse en épicéa, soutenue à l’intérieur par l’âme et la barre d’harmonie. Sans frettes, les cordes ajustent chaque note librement en intonation pure."
    },
    items: [
      {
        name: "Violon",
        tag: "Soprano des cordes",
        tagClass: "tag-peach",
        range: "Sol3 – La7 (G3 – A7)",
        tuning: "Accordé par quintes : Sol3 – Ré4 – La4 – Mi5",
        role: "Mélodie principale, éclat & virtuosité agile",
        desc: "Le membre le plus aigu et le plus agile de la famille. À l’orchestre, les violons se divisent en Violons I (souvent en vol plané dans l’aigu) et Violons II (voix intérieures et harmonie). Ses cordes courtes et légères répondent instantanément aux traits les plus rapides.",
        demos: [
          { label: "Violon à l’archet (Arco)", style: "strings", notes: "G4,D5,A5,E6", dur: 1.0, step: 340 },
          { label: "Violon pincé (Pizzicato)", style: "pizzicato", notes: "G4,B4,D5,G5", dur: 0.75, step: 220 }
        ]
      },
      {
        name: "Alto",
        tag: "Alto des cordes",
        tagClass: "tag-sage",
        range: "Do3 – Mi6 (C3 – E6)",
        tuning: "Accordé par quintes : Do3 – Sol3 – Ré4 – La4",
        role: "Chaleur harmonique intérieure & contre-chants feutrés",
        desc: "Accordé une quinte plus bas que le violon et noté traditionnellement en <em>clé d’ut 3e</em>. Sa caisse est légèrement plus petite que ne le voudrait la physique pour son grave — ce qui confère à l’alto son timbre sombre, velouté et profondément expressif.",
        demos: [
          { label: "Écouter le registre d’alto", style: "strings", notes: "C3,G3,D4,A4", dur: 1.05, step: 360 }
        ]
      },
      {
        name: "Violoncelle",
        tag: "Ténor & Baryton",
        tagClass: "tag-lilac",
        range: "Do2 – La5 (C2 – A5)",
        tuning: "Accordé par quintes : Do2 – Sol2 – Ré3 – La3",
        role: "Assise profonde & grandes mélodies lyriques",
        desc: "Une octave entière sous l’alto et remarquablement proche de la voix humaine. Ses cordes graves offrent un socle chaleureux tandis que sa corde de La chante d’émouvants solos de baryton à ténor.",
        demos: [
          { label: "Écouter le violoncelle (Do2–La3)", style: "strings", notes: "C2,G2,D3,A3", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Contrebasse",
        tag: "Fondation sub-grave",
        tagClass: "tag-peach",
        range: "Mi1 (ou Do1 avec rallonge) – Sol4",
        tuning: "Accordée par quartes : Mi1 – La1 – Ré2 – Sol2",
        role: "Basse d’orchestre & walking bass jazz",
        desc: "Accordée <em>en quartes</em> plutôt qu’en quintes pour garder des écarts jouables à la main gauche, elle sonne <strong>une octave plus bas</strong> qu’écrit. À l’archet elle offre une profondeur majestueuse ; en pizzicato elle propulse le jazz et le swing.",
        demos: [
          { label: "Contrebasse Arco (Orchestral)", style: "strings", notes: "E1,A1,D2,G2", dur: 1.25, step: 420 },
          { label: "Walking Bass Jazz (Pizzicato)", style: "pizzicato", notes: "C2,E2,G2,A2,Bb2,A2,G2,E2", dur: 0.7, step: 280 }
        ]
      }
    ],
    extraBox: {
      heading: "Principales articulations des cordes à reconnaître à l’oreille",
      facts: [
        { title: "Arco vs Pizzicato", text: "<em>Arco</em> signifie joué à l’archet pour des lignes tenues et chantantes ; <em>pizzicato</em> signifie pincé du doigt pour des notes courtes, chaudes et percussives." },
        { title: "Spiccato & Martelé", text: "Le <em>spiccato</em> fait rebondir légèrement l’archet sur la corde pour une agilité scintillante ; le <em>martelé</em> attaque avec un mordant sec et précis." },
        { title: "Tremolo & Sul Ponticello", text: "De rapides allers-retours d’archet créent un frémissement de suspense (classique au cinéma). Jouer tout près du chevalet (<em>sul ponticello</em>) rend le timbre vitreux et fantomatique." },
        { title: "Harmoniques & Con Sordino", text: "Effleurer la corde sur ses nœuds vibratoires isole des sons flûtés cristallins. Poser une sourdine (<em>con sordino</em>) sur le chevalet voile le timbre d’un reflet soyeux." }
      ]
    }
  },
  woodwinds: {
    title: "Bois",
    subtitle: "Embouchoir libre, anche simple, anche double & famille des saxophones",
    intro: {
      tag: "Tuyaux & Anches",
      tagClass: "tag-sage",
      chip: "3 Modes d’excitation",
      heading: "Du souffle pur aux anches vibrantes",
      body: "Contrairement aux cordes unifiées, les bois rassemblent trois mécanismes sonores très contrastés : la flûte fend un jet d’air sur une arête vive, la clarinette et le saxophone font battre une lame de roseau (<em>anche simple</em>) sur un bec, et le hautbois comme le basson serrent deux fines lamelles l’une contre l’autre (<em>anche double</em>) — donnant à chaque instrument sa couleur irremplaçable."
    },
    items: [
      {
        name: "Flûte traversière & Piccolo",
        tag: "Jet d’air sur biseau (sans anche)",
        tagClass: "tag-peach",
        range: "Do4 – Ré7 (Piccolo Ré5 – Do8)",
        tuning: "En Ut (Piccolo +1 octave)",
        role: "Lignes aériennes argentées, trilles & chants d’oiseaux",
        desc: "Le souffle vient se briser sur le bord de l’embouchure et oscille rapidement dedans-dehors. Le grave est doux et proche d’une onde sinusoïdale, tandis que la troisième octave perce tout l’orchestre avec un éclat argenté. Le minuscule piccolo couronne souvent les tuttis.",
        demos: [
          { label: "Flûte traversière (Phrase lyrique)", style: "flute", notes: "G4,A4,B4,D5,E5,G5", dur: 0.9, step: 260 }
        ]
      },
      {
        name: "Hautbois & Cor anglais",
        tag: "Anche double (Perce conique étroite)",
        tagClass: "tag-lilac",
        range: "Si♭3 – La6 (Cor anglais en Fa)",
        tuning: "Hautbois en Ut • Donne le La4 d’accord",
        role: "Référence d’accord de l’orchestre & solos poignants",
        desc: "Deux très fines lames de roseau liées vibrent l’une contre l’autre dans une perce conique étroite, produisant un chant pénétrant, riche en harmoniques et plein de nostalgie. Sa justesse étant très stable, tout l’orchestre s’accorde sur le <strong>La4 du hautbois</strong>. Son grand frère alto, le cor anglais, possède un pavillon piriforme fait pour les solos mélancoliques.",
        demos: [
          { label: "Timbre de hautbois (Anche double)", style: "reed", notes: "A4,C5,E5,D5,C5,A4", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "Clarinette & Clarinette basse",
        tag: "Anche simple (Perce cylindrique)",
        tagClass: "tag-sage",
        range: "Ré3 – Si♭6 (Clarinette basse jusqu’à Si♭1)",
        tuning: "Généralement en Si♭ ou en La (transpositrice)",
        role: "Chaleur veloutée du grave aux envolées jazz & klezmer",
        desc: "Une anche de roseau bat contre un bec rigide sur un tuyau cylindrique. Particularité acoustique : elle réagit comme un tuyau fermé à une extrémité ! Son registre grave <em>chalumeau</em> privilégie les harmoniques impaires — et au changement d’octave, elle octavie à la <strong>douzième (octave + quinte)</strong>.",
        demos: [
          { label: "Registre de clarinette (Grave → Aigu)", style: "reed", notes: "D3,F3,A3,C4,E4,A4", dur: 0.9, step: 280 }
        ]
      },
      {
        name: "Basson & Contrebasson",
        tag: "Anche double (Basse)",
        tagClass: "tag-peach",
        range: "Si♭1 – Mi5 (Contre jusqu’à Si♭0)",
        tuning: "En Ut (tuyau en bois replié en U)",
        role: "Basses staccato incisives & ténor chantant",
        desc: "Plus de 2,60 mètres de tube conique en bois replié en U. Piqué sec dans le grave, il a un mordant plein d’esprit ; lié dans le médium, il chante avec une chaleur proche du baryton humain.",
        demos: [
          { label: "Registre grave du basson", style: "reed", notes: "Bb1,F2,Bb2,D3,F3", dur: 1.0, step: 330 }
        ]
      },
      {
        name: "Famille des Saxophones (Soprano, Alto, Ténor, Baryton)",
        tag: "Pont moderne des bois",
        tagClass: "tag-lilac",
        range: "Ré♭2 à Fa6 en son réel (selon les tailles)",
        tuning: "Alternance Mi♭ (Alto/Baryton) & Si♭ (Sop./Ténor)",
        role: "Jazz, big band, funk, soul & chorus pop",
        desc: "Inventé vers 1840 par Adolphe Sax comme un hybride génial : l’anche simple souple de la clarinette associée à une large perce conique en laiton. Il octavie normalement à l’octave, projette presque comme un cuivre tout en gardant l’agilité des bois, du murmure subtone au growl râpeux.",
        demos: [
          { label: "Couleur Sax Ténor / Alto", style: "reed", notes: "C4,Eb4,F4,F#4,G4,Bb4", dur: 0.9, step: 250 }
        ]
      }
    ],
    extraBox: {
      heading: "Guide rapide des vents transpositeurs",
      facts: [
        { title: "Pourquoi certains vents lisent-ils en Si♭, Mi♭ ou Fa ?", text: "Pour qu’un saxophoniste passant de l’Alto au Baryton — ou un clarinettiste changeant d’instrument — conserve exactement les mêmes doigtés ! Jouer un <em>Do</em> écrit sur une trompette ou un sax ténor en Si♭ fait sonner un <em>Si♭</em> réel (un ton plus bas)." },
        { title: "L’art orchestral du mélange des timbres", text: "Contrairement aux cordes homogènes, chaque bois a un profil spectral marqué — les orchestrateurs adorent les marier : Flûte + Hautbois unit brillance et noyau ; Clarinette + Cor crée un velours soyeux." }
      ]
    }
  },
  brass: {
    title: "Cuivres",
    subtitle: "Série harmonique, pistons, coulisse & sourdines classiques",
    intro: {
      tag: "Vibration des lèvres",
      tagClass: "tag-lilac",
      chip: "Harmoniques + Longueur de tube",
      heading: "Ce n’est pas le métal qui vibre — ce sont vos lèvres !",
      body: "À la trompette, au cor, au trombone ou au tuba, les lèvres du musicien agissent comme une membrane vivante contre l’embouchure. Sans actionner aucun piston, un cuivre ne joue que les <strong>harmoniques naturelles</strong> de son tube (comme un clairon). <strong>Pistons, palettes</strong> ou <strong>coulisse</strong> ajoutent instantanément des longueurs de tube calibrées pour obtenir les 12 notes chromatiques."
    },
    items: [
      {
        name: "Trompette & Bugle (Flugelhorn)",
        tag: "Cuivres aigus (Cylindrique vs Conique)",
        tagClass: "tag-peach",
        range: "Mi3 – Do6 (en son réel)",
        tuning: "Le plus souvent en Si♭ ou en Ut",
        role: "Éclat des fanfares, lead de big band & thèmes héroïques",
        desc: "Environ deux tiers du tube de la trompette restent étroitement cylindriques avant le pavillon — rendant les nuances fortes brillantes, tranchantes et électriques. Son cousin le <em>bugle</em> s’évase coniquement de bout en bout, enveloppant les mêmes notes d’un velours sombre idéal en ballade jazz.",
        demos: [
          { label: "Fanfare de trompette (Triade harmonique)", style: "brass", notes: "C4,G4,C5,E5", dur: 0.95, step: 290 }
        ]
      },
      {
        name: "Cor d’harmonie (Cor double Fa / Si♭)",
        tag: "Conique étroit + Main dans le pavillon",
        tagClass: "tag-sage",
        range: "Si1 – Fa5 (en son réel)",
        tuning: "Cor double Fa / Si♭",
        role: "Thèmes de cinéma épiques & liant naturel de l’orchestre",
        desc: "Issu des longs cors de chasse enroulés (~3,7 m de tube). Évoluer haut dans ses harmoniques lui confère une rondeur noble qui soude bois et cuivres lourds. Glisser la main droite dans le pavillon assombrit le son ou déclenche le mordant cuivré des <em>sons bouchés</em>.",
        demos: [
          { label: "Appel de cor (Quintes & Chaleur)", style: "brass", notes: "F3,C4,F4,A4", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Trombone (Ténor & Basse)",
        tag: "Coulisse continue (7 positions)",
        tagClass: "tag-lilac",
        range: "Mi2 – Fa5 (jusqu’à Si1 avec noix de Fa)",
        tuning: "Non transpositeur en Ut (fondamentale Si♭)",
        role: "Nappes d’accords charnues, glissandi fluides & punch jazz",
        desc: "Au lieu de pistons, une coulisse télescopique allonge le tube cylindrique sur 7 positions chromatiques. Le musicien règle chaque justesse finement à l’oreille et réalise d’incomparables <strong>glissandi</strong> continus.",
        demos: [
          { label: "Voicing de trombone (Cuivre médium-grave)", style: "brass", notes: "Bb2,F3,Bb3,D4", dur: 1.05, step: 320 }
        ]
      },
      {
        name: "Tuba & Euphonium",
        tag: "Graves coniques larges",
        tagClass: "tag-peach",
        range: "Ré1 – Fa4 (Tuba contrebasse jusqu’à Si♭0)",
        tuning: "En Fa, Mi♭, Ut ou Si♭",
        role: "Profondeur majestueuse & basses harmoniques soyeuses",
        desc: "Près de 5,5 mètres de laiton largement conique produisent une fondation étonnamment douce, ronde et généreuse sans dureté métallique. En orchestre d’harmonie, tuba et <em>euphonium</em> chantant forment une assise veloutée.",
        demos: [
          { label: "Fondation de tuba (Octave + Quinte)", style: "brass", notes: "F1,C2,F2", dur: 1.25, step: 420 }
        ]
      }
    ],
    extraBox: {
      heading: "Transformer les cuivres avec les sourdines classiques",
      facts: [
        { title: "Sourdine sèche (Straight Mute)", text: "Cône en aluminium ou fibre : coupe le grave et rend la trompette ou le trombone perçant, métallique et acéré (jazz & musiques de film)." },
        { title: "Sourdine Harmon (Wah-Wah)", text: "Rendue mythique par Miles Davis : obstrue le pavillon en ne laissant qu’un tube central ouvert — son intime et nasillard ; ouvrir et fermer la main devant le tube crée le célèbre cri « wah-wah »." },
        { title: "Sourdine Cup & Plunger", text: "La sourdine Cup adoucit l’éclat en velours feutré ; en big band, on fait littéralement « parler » les cuivres avec une ventouse en caoutchouc (<em>plunger</em>) devant le pavillon." }
      ]
    }
  },
  keyboards: {
    title: "Instruments à clavier",
    subtitle: "Marteaux, becs plectres, tuyaux d’orgue & légendes électromécaniques",
    intro: {
      tag: "Géants polyphoniques",
      tagClass: "tag-peach",
      chip: "Même interface à 12 touches",
      heading: "Un seul clavier — quatre moteurs acoustiques radicalement différents",
      body: "Piano, clavecin, orgue à tuyaux et Fender Rhodes partagent la même géométrie intuitive de 12 touches par octave (7 blanches, 5 noires), permettant à deux mains de jouer basse, accords et mélodie ensemble. Mais ce qui se passe derrière la touche relève de mécanismes physiques opposés."
    },
    items: [
      {
        name: "Piano droit & Piano à queue de concert",
        tag: "Cordes frappées (Mécanique à marteaux)",
        tagClass: "tag-peach",
        range: "La0 – Do8 (88 touches • 27,5 – 4 186 Hz)",
        tuning: "Tempérament égal étiré (~230 cordes)",
        role: "Piliers universels du classique, du jazz, de la pop & de la composition",
        desc: "Des marteaux garnis de feutre <strong>frappent</strong> des cordes d’acier très tendues (jusqu’à 3 cordes à l’unisson par note !) et rebondissent aussitôt pour les laisser vibrer librement. La <em>pédale forte</em> lève tous les étouffoirs ensemble, faisant briller les cordes non jouées par résonance sympathique.",
        demos: [
          { label: "Piano à queue (Arpège avec pédale)", style: "piano", notes: "C3,G3,E4,G4,B4,D5", dur: 1.2, step: 220 }
        ]
      },
      {
        name: "Clavecin",
        tag: "Cordes pincées (Plectres / Plumes)",
        tagClass: "tag-sage",
        range: "Fa1 – Fa6",
        tuning: "Souvent tempéraments historiques (Werckmeister / Vallotti)",
        role: "Basse continue baroque & attaque claire argentée",
        desc: "Au lieu d’un marteau, un minuscule bec (jadis en plume de corbeau, aujourd’hui en Delrin) <strong>pince</strong> la corde au moment de l’enfoncement. La force du doigt change peu le volume — les contrastes viennent des jeux de registres (4', 8', accouplement) et de la densité d’écriture. Très riche en harmoniques aiguës.",
        demos: [
          { label: "Pincement de clavecin", style: "cembalo", notes: "D4,F4,A4,D5,C#5,D5", dur: 0.9, step: 210 }
        ]
      },
      {
        name: "Orgue à tuyaux & Harmonium",
        tag: "Aérophone (Sommier à vent & Jeux)",
        tagClass: "tag-lilac",
        range: "Soubasse 16'/32' (< 16 Hz !) jusqu’aux mixtures de 1'",
        tuning: "Tuyaux à bouche & à anche par hauteur de pied",
        role: "Polyphonie monumentale à tenue infinie",
        desc: "Touches et pédalier ouvrent des soupapes envoyant de l’air sous pression dans des centaines ou milliers de tuyaux d’étain et de bois. Les <em>jeux de fond</em> sifflent comme d’immenses flûtes ; les <em>jeux d’anches</em> éclatent comme des trompettes. Chaque note tient à pleine intensité tant que le doigt reste posé !",
        demos: [
          { label: "Orgue à tuyaux (Plein-jeu)", style: "organ", notes: "C3,G3,C4,E4,G4", dur: 2.0, step: 0 }
        ]
      },
      {
        name: "Icônes de scène : Fender Rhodes, Hammond B3 & Clavinet",
        tag: "Légendes électromécaniques",
        tagClass: "tag-sage",
        range: "73–88 touches / Tirettes harmoniques",
        tuning: "Micros magnétiques, roues phoniques & modélisation",
        role: "Jazz, funk, soul, gospel, rock & pop moderne",
        desc: "Le <strong>Fender Rhodes</strong> frappe des tiges métalliques résonantes devant des bobines magnétiques — doux, cristallin et magique en néo-soul. Le <strong>Clavinet</strong> frappe des cordes pour mordre en funk. L’<strong>orgue Hammond B3</strong> additionne 9 <em>tirettes harmoniques</em> issues de roues phoniques tournant devant une <em>cabine Leslie</em> tournoyante.",
        demos: [
          { label: "Voicing Orgue à tirettes", style: "organ", notes: "G3,B3,D4,F4", dur: 1.5, step: 0 },
          { label: "Voicing Piano électrique chaud", style: "piano", notes: "F3,A3,C4,E4,G4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },
  plucked: {
    title: "Cordes pincées & Guitares",
    subtitle: "Nylon, acier, micros magnétiques, basse électrique & harpe de concert",
    intro: {
      tag: "Impulsion pincée",
      tagClass: "tag-sage",
      chip: "Attaque franche & déclin naturel",
      heading: "L’endroit où vous pincez sculpte instantanément le timbre",
      body: "Pincer une corde à la pulpe, à l’ongle ou au médiator crée une attaque franche dont les harmoniques aiguës s’éteignent plus vite que la fondamentale. Pincez près du <strong>chevalet</strong> (<em>sul ponticello</em>) pour un claquant métallique tranchant ; jouez au-dessus de la <strong>touche</strong> (<em>sul tasto</em>) pour une chaleur ronde proche de la harpe."
    },
    items: [
      {
        name: "Guitare classique (Nylon) & Guitare folk (Acier)",
        tag: "Caisses de résonance acoustiques",
        tagClass: "tag-peach",
        range: "Mi2 – Si5 (en son réel • écrite +1 octave)",
        tuning: "Accordage standard : Mi2 – La2 – Ré3 – Sol3 – Si3 – Mi4",
        role: "Accompagnement rythmique, fingerpicking, flamenco & chanson",
        desc: "Les <em>guitares classiques à cordes nylon</em> charment par leur douceur chaleureuse et la netteté polyphonique du jeu aux doigts. Les <em>guitares folk à cordes acier</em> sont plus tendues et percent un mix grâce à leurs accords scintillants et riches en aigus.",
        demos: [
          { label: "Arpège de guitare acoustique", style: "guitar", notes: "E2,B2,E3,G#3,B3,E4", dur: 1.3, step: 170 }
        ]
      },
      {
        name: "Guitare électrique & Chaîne du signal",
        tag: "Micros magnétiques + Ampli",
        tagClass: "tag-lilac",
        range: "Mi2 – Mi6 (avec tirés / bends & harmoniques)",
        tuning: "Mi – La – Ré – Sol – Si – Mi (et accordages abaissés)",
        role: "Riffs funk, arpèges clairs cristallins, crunch & solos chantants",
        desc: "Une guitare électrique à corps plein produit très peu de son acoustique seule : des bobinages (<em>micros</em>) captent la vibration des cordes d’acier en signal électrique. Les <strong>simples bobinages</strong> (Strat/Tele) sonnent claquants et cristallins ; les <strong>humbuckers</strong> à double bobinage suppriment le souffle et délivrent des médiums crémeux — sculptés ensuite par l’ampli à lampes, la saturation, le delay et la réverbe.",
        demos: [
          { label: "Accord électrique clair", style: "guitar", notes: "A2,D3,G3,C4,E4", dur: 1.4, step: 140 }
        ]
      },
      {
        name: "Basse électrique (4, 5 cordes & Fretless)",
        tag: "Le lien entre grosse caisse & harmonie",
        tagClass: "tag-sage",
        range: "Mi1 (ou Si0 en 5 cordes) – Sol4",
        tuning: "Mi1 – La1 – Ré2 – Sol2",
        role: "Assise du groove avec la batterie, fondation harmonique universelle",
        desc: "Accordée une octave sous la guitare comme une contrebasse, mais frettée pour une justesse immédiate. Jouée aux doigts elle est ronde et profonde ; au médiator elle perce les mix rock ; en <strong>slap &amp; pop</strong> (pouce frappé + corde tirée) elle électrise le funk ; et sans frettes (<em>fretless</em>), elle glisse avec un vibrato vocal liquide.",
        demos: [
          { label: "Groove de basse électrique (Octave & Quinte)", style: "ebass", notes: "E1,E1,G1,A1,B1,E2", dur: 0.75, step: 260 }
        ]
      },
      {
        name: "Harpe de concert, Mandoline, Banjo & Ukulélé",
        tag: "Couleurs pincées caractéristiques",
        tagClass: "tag-peach",
        range: "Harpe : Do♭1 – Sol♭7 (47 cordes)",
        tuning: "Harpe : Diatonique à 7 pédales à double mouvement",
        role: "Glissandos lumineux, textures folk & éclats acoustiques",
        desc: "Chacune des 47 cordes d’une harpe de concert porte sa note diatonique (rouge pour Do, bleu/noir pour Fa) ; sept pédales abaissent ou haussent toutes les octaves en bémol, bécarre ou dièse. À côté, <em>mandoline</em> à cordes doubles, <em>banjo</em> à peau tendue et léger <em>ukulélé</em> signent musiques traditionnelles, bluegrass et indie pop.",
        demos: [
          { label: "Arpège en cascade façon harpe", style: "guitar", notes: "C3,D3,E3,G3,A3,C4,D4,E4,G4", dur: 0.9, step: 110 }
        ]
      }
    ]
  },
  electronic: {
    title: "Électronique & Studio",
    subtitle: "Synthétiseurs, sampleurs, boîtes à rythmes & mixage en STAN",
    intro: {
      tag: "Sound Design & Production",
      tagClass: "tag-sage",
      chip: "Électrophones & Numérique",
      heading: "De la résonance physique à la sculpture directe des formes d’ondes",
      body: "Les instruments acoustiques héritent leur timbre du bois, du laiton ou d’une peau tendue. Les instruments électroniques partent d’ondes brutes électriques ou numériques — vous permettant de sculpter exactement la richesse harmonique, la vitesse d’attaque et l’évolution du timbre dans le temps."
    },
    items: [
      {
        name: "Synthétiseurs soustractifs (Analogiques & Virtuels)",
        tag: "Oscillateur + Filtre + Enveloppe",
        tagClass: "tag-sage",
        range: "Tout le spectre audible (du sub-grave à 20 Hz aux aigus)",
        tuning: "Volt/Octave ou MIDI (dont micro-intervalles)",
        role: "Basses massives, leads incisifs, nappes analogiques veloutées",
        desc: "L’architecture classique popularisée par le Minimoog : <strong>1. L’Oscillateur (VCO)</strong> produit des formes d’ondes riches comme la <em>Dent de scie</em> (toutes harmoniques — large et proche des cordes), le <em>Carré/Impulsion</em> (harmoniques impaires — boisé et creux) ou le <em>Triangle/Sinus</em> (pur/sub). <strong>2. Le Filtre (VCF)</strong> sculpte la brillance avec <em>Cutoff</em> et <em>Résonance</em> ! <strong>3. L’Enveloppe (ADSR)</strong> modèle Attaque, Déclin, Maintien et Relâchement.",
        demos: [
          { label: "Synthé dent de scie (Lead harmonique)", style: "synth-saw", notes: "C3,E3,G3,B3,C4", dur: 0.85, step: 230 },
          { label: "Nappe analogique chaleureuse", style: "synth-pad", notes: "C3,G3,B3,D4,E4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "Synthèse FM, Tables d’ondes (Wavetable) & Granulaire",
        tag: "Univers sonores numériques",
        tagClass: "tag-lilac",
        range: "Des sons cristallins aux textures cinématiques mouvantes",
        tuning: "Précision à l’échantillon / microtonale",
        role: "Cloches vitreuses & pianos électriques ’80s, basses modernes & nappes",
        desc: "La <strong>synthèse FM</strong> (légendaire sur le Yamaha DX7) module la fréquence d’une onde à vitesse audio par une autre — produisant sans filtre des cloches métalliques glacées, des pianos électriques ’80s et des basses claquantes. Les synthés à <strong>tables d’ondes</strong> glissent entre des formes d’ondes évolutives, tandis que la <strong>synthèse granulaire</strong> découpe des enregistrements en grains de 10–50 ms pour tisser des nuages sonores.",
        demos: [
          { label: "Nappe flottante riche en harmoniques", style: "synth-pad", notes: "A2,E3,G3,B3,D4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "Sampleurs, Mellotron & Boîtes à rythmes (808 / 909 / MPC)",
        tag: "Échantillonnage & Séquenceurs à pas",
        tagClass: "tag-peach",
        range: "Tessiture chromatique complète par rééchantillonnage",
        tuning: "Jouables chromatiquement au clavier & aux pads",
        role: "Hip-hop, house, techno, beats pop & maquettes d’orchestre",
        desc: "Un <strong>sampleur (échantillonneur)</strong> capture n’importe quel son du réel — chœurs, boucles vinyles, bruits du quotidien — et le déploie sur tout un clavier (préfiguré par le <em>Mellotron</em> à bandes magnétiques !). Des boîtes à rythmes cultes comme la Roland <em>TR-808</em> ont offert caisses claires synthétiques, claps et cloches — et prolonger sa grosse caisse sinusoïdale crée les célèbres lignes de sub-basse du hip-hop et de la trap !",
        demos: [
          { label: "Écouter une ligne sub-basse 808", style: "ebass", notes: "C1,C1,Eb1,G1,C2,G1", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "STAN (DAW), Instruments virtuels & Effets de mixage",
        tag: "L’atelier du studio moderne",
        tagClass: "tag-sage",
        range: "Environnement musical informatique complet",
        tuning: "Hauteur & automation en temps réel",
        role: "Composition, arrangement, mixage & mastering",
        desc: "Une <em>Station de Travail Audio Numérique (STAN / DAW)</em> réunit magnétophones, racks périphériques et orchestres virtuels sur un écran. En <strong>MIDI</strong>, vous pilotez synthés logiciels et banques d’échantillons, puis vous sculptez l’espace avec les <strong>Égaliseurs (EQ)</strong>, maîtrisez l’impact avec les <strong>Compresseurs</strong> et créez des salles de concert avec <strong>Réverbe &amp; Delay</strong>.",
        demos: [
          { label: "Empilement Synthé + Sub", style: "synth-saw", notes: "F2,C3,A3,E4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },
  ensembles: {
    title: "Orchestres, Groupes & Ensembles",
    subtitle: "Pourquoi des dizaines d’instruments sonnent clair ensemble au lieu de se brouiller",
    intro: {
      tag: "Arrangement & Espace fréquentiel",
      tagClass: "tag-peach",
      chip: "Répartition acoustique des tâches",
      heading: "Le secret d’une grande orchestration : Fréquence + Rôle",
      body: "Quand 80 musiciens symphoniques ou 5 membres d’un groupe rock jouent simultanément, chaque instrument doit occuper sa propre <strong>bande de fréquences</strong> (graves, médiums, aigus) et un <strong>rôle rythmique ou harmonique clair</strong>. Chaque formation classique est née pour résoudre cette équation."
    },
    items: [
      {
        name: "L’Orchestre symphonique (~70–100 musiciens)",
        tag: "Les 4 grandes familles",
        tagClass: "tag-peach",
        range: "Du sub-grave de contrebasse au brillant du piccolo (16 Hz – >4 kHz)",
        tuning: "La4 de concert = 440–443 Hz",
        role: "Amplitude dynamique immense & palette orchestrale totale",
        desc: "Pourquoi plus de 50 cordes face à seulement 2 à 4 bois ou cuivres ? Parce qu’une seule trompette perce à travers dix violons ! Le grand pupitre des cordes tisse le <em>tapis</em> continu, les bois solistes dessinent les lignes agiles, les cuivres dressent les sommets héroïques et timbales &amp; percussions insufflent le souffle dramatique.",
        demos: [
          { label: "Grand accord chaleureux des cordes", style: "strings", notes: "C2,G2,E3,C4,G4", dur: 2.0, step: 0 },
          { label: "Couche de fanfare des cuivres", style: "brass", notes: "C4,G4,C5,E5", dur: 1.1, step: 240 }
        ]
      },
      {
        name: "Musique de chambre (Quatuor à cordes & Quintette à vent)",
        tag: "Transparence soliste",
        tagClass: "tag-sage",
        range: "4 à 5 voix égales en dialogue",
        tuning: "Intonation adaptative pure en ensemble",
        role: "Jeu d’ensemble intime comparable au quatuor vocal SATB",
        desc: "Le <strong>quatuor à cordes</strong> classique (2 violons, alto, violoncelle) reflète idéalement un chœur à quatre voix : timbre unifié, lisibilité chirurgicale et contrepoint souple. Le <strong>quintette à vent</strong> (flûte, hautbois, clarinette, basson + cor d’harmonie !) relève le défi inverse : cinq couleurs opposées fondues ensemble par la chaleur du cor.",
        demos: [
          { label: "Arpège de quatuor à cordes (Violoncelle → Violon)", style: "strings", notes: "C2,G3,D4,E4", dur: 1.5, step: 260 }
        ]
      },
      {
        name: "Big Band & Formation Jazz",
        tag: "Section rythmique vs Pupitres de soufflants",
        tagClass: "tag-lilac",
        range: "Écriture serrée en blocs d’accords (block voicings)",
        tuning: "Phrasé swing & questions-réponses",
        role: "Walking bass & batterie propulsives sous des cuivres superposés",
        desc: "Le big band s’équilibre en deux pôles : la <strong>section rythmique</strong> (batterie, contrebasse/basse, piano, guitare) fournit sans relâche swing et harmonie, pendant que les <strong>soufflants</strong> (5 saxophones, 4 trombones, 4 trompettes) s’échangent des renversements serrés (tels les <em>Drop-2</em>) dans un vif jeu de questions-réponses.",
        demos: [
          { label: "Voicing Jazz de section de cuivres", style: "brass", notes: "Bb2,Ab3,C4,D4,G4", dur: 1.7, step: 0 }
        ]
      },
      {
        name: "Groupe moderne Pop, Rock & Funk",
        tag: "Pistes fréquentielles ciblées",
        tagClass: "tag-peach",
        range: "De l’assise sub-basse à l’air de présence vocale",
        tuning: "Pocket verrouillé entre grosse caisse & basse",
        role: "Groove solide, refrains mémorables & mise en valeur de la voix",
        desc: "<strong>Grosse caisse + basse électrique (ou 808)</strong> verrouillent le socle grave (40–250 Hz). <strong>Caisse claire &amp; charleston</strong> découpent le cadre rythmique. <strong>Guitares, claviers ou synthés</strong> habillent le médium (300 Hz – 3 kHz) tout en s’effaçant légèrement dans les couplets pour laisser respirer le <strong>chant principal</strong> (1–4 kHz).",
        demos: [
          { label: "Voicing de groupe (Basse + Clavier)", style: "piano", notes: "A2,E3,G3,B3,C#4", dur: 1.6, step: 110 }
        ]
      }
    ]
  }
};

function renderInstrumentModuleHTML_FR(refKey) {
  const mod = INSTRUMENT_MODULES_DATA_FR[refKey];
  if (!mod) return "";

  const introCard = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${mod.intro.tagClass}">${mod.intro.tag}</span>
        <span class="k-ratio-chip">${mod.intro.chip}</span>
      </div>
      <h4>${mod.intro.heading}</h4>
      <p>${mod.intro.body}</p>
    </article>
  `;

  const itemCards = mod.items.map(item => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${item.tagClass}">${item.tag}</span>
        <span class="k-ratio-chip">${item.role.split("&")[0].trim()}</span>
      </div>
      <h4>${item.name}</h4>
      <div class="inst-meta-row">
        <span class="inst-meta-pill">Étendue : ${item.range}</span>
        <span class="inst-meta-pill">${item.tuning}</span>
      </div>
      <p><strong>Rôle :</strong> ${item.role}</p>
      <p>${item.desc}</p>
      ${item.demos && item.demos.length ? `
        <div class="k-btn-row">
          ${item.demos.map(d => `<button class="btn-tool" data-play-inst="true" data-style="${d.style}" data-notes="${d.notes}" data-dur="${d.dur}" data-step="${d.step}">▶ ${d.label}</button>`).join("")}
        </div>
      ` : ""}
    </article>
  `).join("");

  const extraCard = mod.extraBox ? `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Technique &amp; Conseils d’écoute</span>
        <span class="k-ratio-chip">Approfondissement</span>
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


const MODES_ENCYCLOPEDIA_FR = [
  {
    id: "lydian",
    name: "Lydien",
    family: "major",
    familyLabel: "Famille majeure",
    brightness: "1 / 7 • Rayonnant & Aérien",
    badgeClass: "badge-peach",
    rootLabel: "Do",
    stammton: "4e mode de la gamme majeure (comme Do majeur en partant de Fa)",
    formula: "1 · 2 · 3 · #4 · 5 · 6 · 7",
    steps: "T – T – T – ½T – T – T – ½T",
    charNote: "Quarte augmentée (#4, ex. Fa♯ sur Do)",
    vamp: "I – II (Do – Ré)",
    desc: "Le plus lumineux des sept modes diatoniques. Hausser la 4e note en #4 supprime le frottement de demi-ton contre la tierce majeure — donnant au Lydien son flottement onirique, suspendu et cinématographique.",
    usage: "<strong>Usage musical :</strong> Très prisé pour l’émerveillement et la science-fiction au cinéma (John Williams <em>E.T.</em>, thème des <em>Simpson</em>, Danny Elfman), le rock instrumental (Joe Satriani, Steve Vai) et les accords flottants Maj7(#11) en jazz.",
    notes: "C4,D4,E4,F#4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4", "B4"], ["D3", "F#4", "A4", "C5"]]
  },
  {
    id: "ionian",
    name: "Ionien (Majeur)",
    family: "major",
    familyLabel: "Famille majeure",
    brightness: "2 / 7 • Équilibré & Limpide",
    badgeClass: "badge-sage",
    rootLabel: "Do",
    stammton: "1er mode — notre gamme majeure naturelle (Do majeur)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · 7",
    steps: "T – T – ½T – T – T – T – ½T",
    charNote: "Quarte juste (4) + Note sensible franche (7 → 1)",
    vamp: "I – IV – V – I",
    desc: "Le mode majeur classique. Le triton entre les degrés 4 et 7 se résout nettement vers la tonique et la tierce — créant une stabilité, une clarté et une résolution universelles.",
    usage: "<strong>Usage musical :</strong> Le pilier de l’harmonie tonale occidentale, des symphonies classiques, des refrains pop lumineux et des airs folk où règnent joie et évidence.",
    notes: "C4,D4,E4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4"], ["F3", "A4", "C5"], ["G3", "B4", "D5"], ["C3", "E4", "G4"]]
  },
  {
    id: "mixolydian",
    name: "Mixolydien",
    family: "major",
    familyLabel: "Famille majeure",
    brightness: "3 / 7 • Terrien & Entraînant",
    badgeClass: "badge-peach",
    rootLabel: "Do",
    stammton: "5e mode de la gamme majeure (comme Do majeur en partant de Sol)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · b7",
    steps: "T – T – ½T – T – T – ½T – T",
    charNote: "Septième mineure (b7, ex. Si♭ sur Do)",
    vamp: "I – bVII (Do – Si♭)",
    desc: "Un mode majeur qui troque la sensible classique contre une b7 décontractée — insufflant aussitôt une couleur bluesy, rock et assurée.",
    usage: "<strong>Usage musical :</strong> Roi du rock classique, du funk, du folk celtique et du reggae (The Beatles <em>Norwegian Wood</em>, AC/DC, Deep Purple), et gamme réflexe en jazz sur les accords de 7e de dominante (V7).",
    notes: "C4,D4,E4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "E4", "G4", "Bb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "dorian",
    name: "Dorien",
    family: "minor",
    familyLabel: "Famille mineure",
    brightness: "4 / 7 • Velouté & Groovy",
    badgeClass: "badge-lilac",
    rootLabel: "Do",
    stammton: "2e mode de la gamme majeure (comme Do majeur en partant de Ré)",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · b7",
    steps: "T – ½T – T – T – T – ½T – T",
    charNote: "Sixte majeure naturelle en mineur (♮6, ex. La sur Do)",
    vamp: "i – IV (Dom – Fa)",
    desc: "Pile au centre du spectre de luminosité : une tierce mineure et une 7e mineure éclairées par une 6te majeure pleine d’âme (♮6). Racé, fluide, jamais larmoyant — pur mouvement.",
    usage: "<strong>Usage musical :</strong> Champion incontesté du funk, de la soul, du jazz modal et du rock (Miles Davis <em>So What</em>, Santana <em>Oye Como Va</em>, Daft Punk <em>Get Lucky</em>, Pink Floyd) et des airs celtiques.",
    notes: "C4,D4,Eb4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4", "Bb4"], ["F3", "A4", "C5"]]
  },
  {
    id: "aeolian",
    name: "Éolien (Mineur naturel)",
    family: "minor",
    familyLabel: "Famille mineure",
    brightness: "5 / 7 • Profond & Mélancolique",
    badgeClass: "badge-sage",
    rootLabel: "Do",
    stammton: "6e mode de la gamme majeure (comme Do majeur en partant de La)",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · b7",
    steps: "T – ½T – T – T – ½T – T – T",
    charNote: "Sixte mineure (b6, ex. La♭) + Septième mineure (b7)",
    vamp: "i – bVI – bVII (Dom – La♭ – Si♭)",
    desc: "Le mineur naturel. Abaisser la 6te à un demi-ton au-dessus de la quinte (b6) libère pathos, ampleur dramatique et nostalgie tendre.",
    usage: "<strong>Usage musical :</strong> Omniprésent dans les ballades rock, la pop en mineur (Adele, <em>All Along the Watchtower</em>), le R&amp;B et les bandes-annonces épiques. Contrairement à la ♮6 dorienne, la b6 soupire doucement vers la quinte.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Ab3", "C4", "Eb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "phrygian",
    name: "Phrygien",
    family: "minor",
    familyLabel: "Famille mineure",
    brightness: "6 / 7 • Sombre & Envoûtant",
    badgeClass: "badge-lilac",
    rootLabel: "Do",
    stammton: "3e mode de la gamme majeure (comme Do majeur en partant de Mi)",
    formula: "1 · b2 · b3 · 4 · 5 · b6 · b7",
    steps: "½T – T – T – T – ½T – T – T",
    charNote: "Seconde mineure juste au-dessus du tonique (b2, ex. Ré♭ → Do)",
    vamp: "i – bII (Dom – Ré♭)",
    desc: "Placer un frottement d’un seul demi-ton au-dessus de la tonique engendre aussitôt mystère et couleur hispano-orientale. Cette b2 penche irrésistiblement vers la fondamentale.",
    usage: "<strong>Usage musical :</strong> L’âme du flamenco espagnol (souvent doté d’une tierce majeure en <em>Phrygien dominant</em>), du metal et djent (Metallica), de la trap sombre et des thrillers tendus.",
    notes: "C4,Db4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "locrian",
    name: "Locrien",
    family: "minor",
    familyLabel: "Famille mineure",
    brightness: "7 / 7 • Diminué & Instable",
    badgeClass: "badge-lilac",
    rootLabel: "Do",
    stammton: "7e mode de la gamme majeure (comme Do majeur en partant de Si)",
    formula: "1 · b2 · b3 · 4 · b5 · b6 · b7",
    steps: "½T – T – T – ½T – T – T – T",
    charNote: "Quinte diminuée (b5, ex. Sol♭) + b2",
    vamp: "i° – bII (Dom7b5 – Ré♭)",
    desc: "Le seul mode diatonique privé d’une quinte juste stable sur sa fondamentale. À la place, la triade tonique elle-même est diminuée / demi-diminuée (m7b5), chargée de fébrilité.",
    usage: "<strong>Usage musical :</strong> Rare comme tonalité complète (ex. Björk <em>Army of Me</em>, metal progressif), mais indispensable en jazz sur les accords demi-diminués (ii°7 des ii–V–i mineurs) et les scènes de tension.",
    notes: "C4,Db4,Eb4,F4,Gb4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "Gb4", "Bb4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "harmonic-minor",
    name: "Mineur harmonique (Variante bonus)",
    family: "variant",
    familyLabel: "Variante mineure",
    brightness: "Dramatique • Classique, Néoclassique & Orient",
    badgeClass: "badge-peach",
    rootLabel: "Do",
    stammton: "Mineur naturel avec 7e degré rehaussé en sensible (#7)",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · #7",
    steps: "T – ½T – T – T – ½T – 1½ – ½T",
    charNote: "Sensible majeure (7) + Saut de seconde augmentée (b6 → 7, 3 demi-tons !)",
    vamp: "i – V7 (Dom – Sol7)",
    desc: "Associe la b6 sombre de l’Éolien à une sensible majeure brillante (7). Entre les deux s’ouvre un saut expressif de 3 demi-tons qui évoque aussitôt le drame baroque, le tango ou l’ornement oriental.",
    usage: "<strong>Usage musical :</strong> Donne aux tonalités mineures une vraie dominante majeure V7 (Bach, Mozart, flamenco, métal néoclassique type Yngwie Malmsteen). Son 5e mode donne le <em>Phrygien dominant</em>.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,B4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["G3", "B4", "D5", "F5"]]
  },
  {
    id: "melodic-minor",
    name: "Mineur mélodique (Mineur Jazz)",
    family: "variant",
    familyLabel: "Variante mineure",
    brightness: "Épuré • Film Noir, Jazz moderne & Fusion",
    badgeClass: "badge-sage",
    rootLabel: "Do",
    stammton: "Identique au Majeur, avec seulement la tierce bémolisée (b3)",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · 7",
    steps: "T – ½T – T – T – T – T – ½T",
    charNote: "b3 mariée à la 6te majeure (♮6) et à la sensible (7)",
    vamp: "imMaj7 – IV7 (DomMaj7 – Fa7)",
    desc: "À l’origine employé en montant pour adoucir le grand saut du mineur harmonique (avant de redescendre en mineur naturel). Le jazz moderne conserve cette forme relevée dans les deux sens comme un univers harmonique à part entière.",
    usage: "<strong>Usage musical :</strong> Cette teinte mystérieuse de film noir (mMaj7) et gamme mère de couleurs jazz phares comme Lydien dominant (4e mode) ou la gamme altérée (7e mode).",
    notes: "C4,D4,Eb4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "Eb4", "G4", "B4"], ["F3", "A4", "C5", "Eb5"]]
  }
];

function renderModesReferenceHTML_FR(familyFilter = "all") {
  const list = MODES_ENCYCLOPEDIA_FR.filter(m => familyFilter === "all" || m.family === familyFilter);

  const introHeader = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Principe fondamental</span>
        <span class="k-ratio-chip">Relatif vs Parallèle</span>
      </div>
      <h4>Qu’est-ce qu’un mode, exactement ?</h4>
      <p>
        Un <strong>mode</strong> naît lorsqu’on utilise exactement les mêmes notes mais que l’on élit une autre note comme <strong>centre de repos (tonique)</strong>. Restez sur les seules touches blanches du piano (notes de Do majeur) et chaque point de départ dessine un nouvel enchaînement de tons et demi-tons : partez de <code>Ré</code> pour le <em>Dorien</em>, <code>Mi</code> pour le <em>Phrygien</em>, <code>Fa</code> pour le <em>Lydien</em>, <code>Sol</code> pour le <em>Mixolydien</em>, <code>La</code> pour l’<em>Éolien</em> ou <code>Si</code> pour le <em>Locrien</em>.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>1. Approche relative (Mêmes touches)</h5>
          <p>Pratique sur le clavier : « Ré Dorien utilise les mêmes touches que Do majeur. » Plus trompeur pour l’oreille au début, car Do continue d’attirer vers lui.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>2. Approche parallèle (Même fondamentale !)</h5>
          <p><strong>La clé de l’écoute :</strong> jouez les 7 modes en partant de <code>Do</code> ! Une seule note signature révèle alors aussitôt la couleur (ex. <code>Do → Fa♯</code> = Lydien, <code>Do → Si♭</code> = Mixolydien).</p>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">Le spectre de luminosité modale</span>
        <span class="k-ratio-chip">Clair → Sombre</span>
      </div>
      <h4>Classés du plus lumineux au plus sombre (selon le cycle des quintes)</h4>
      <p>
        Alignez les 7 modes ecclésiastiques du plus radieux au plus ténébreux plutôt que par degrés 1–7 : à chaque étape, une <strong>seule note descend d’un demi-ton</strong> — exactement dans l’ordre du cycle des quintes :
      </p>
      <div class="mode-spectrum-strip">
        <span class="mode-spec-chip is-bright">1. Lydien (#4)</span>
        <span class="mode-spec-chip">2. Ionien</span>
        <span class="mode-spec-chip">3. Mixolydien (b7)</span>
        <span class="mode-spec-chip">4. Dorien (b3, b7)</span>
        <span class="mode-spec-chip">5. Éolien (+b6)</span>
        <span class="mode-spec-chip">6. Phrygien (+b2)</span>
        <span class="mode-spec-chip is-dark">7. Locrien (+b5)</span>
      </div>
    </article>

    <div class="k-filter-row" aria-label="Filtrer les modes">
      <button class="k-filter-pill ${familyFilter === "all" ? "active" : ""}" data-mfilter="all">Tous (9)</button>
      <button class="k-filter-pill ${familyFilter === "major" ? "active" : ""}" data-mfilter="major">Famille majeure (3)</button>
      <button class="k-filter-pill ${familyFilter === "minor" ? "active" : ""}" data-mfilter="minor">Famille mineure (4)</button>
      <button class="k-filter-pill ${familyFilter === "variant" ? "active" : ""}" data-mfilter="variant">Variantes mineures (2)</button>
    </div>
  `;

  const cards = list.map(m => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${m.family === "major" ? "tag-peach" : m.family === "minor" ? "tag-lilac" : "tag-sage"}">${m.familyLabel} • ${m.brightness}</span>
        <span class="k-ratio-chip">${m.formula}</span>
      </div>
      <h4>${m.name} (Exemple sur ${m.rootLabel})</h4>
      <p class="k-char">${m.stammton}</p>
      <p><strong>Note de couleur :</strong> ${m.charNote}<br><strong>Structure :</strong> <code>${m.steps}</code></p>
      <p>${m.desc}</p>
      <p>${m.usage}</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-mode-scale="${m.id}">▶ Gamme (${m.rootLabel})</button>
        <button class="btn-tool" data-play-mode-vamp="${m.id}">▶ Vamp : ${m.vamp}</button>
      </div>
    </article>
  `).join("");

  const tipsCard = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Composition &amp; Harmonie modale</span>
        <span class="k-ratio-chip">Tenir le centre modal</span>
      </div>
      <h4>Écrire modal sans retomber malgré soi en Majeur</h4>
      <ul class="k-physics-list">
        <li><strong>Évitez le triton de la gamme mère :</strong> Dans les notes de Do majeur, <code>Fa</code> et <code>Si</code> forment le triton de Sol7 qui tire l’oreille tout droit vers Do. Vous composez en Ré Dorien ou Sol Mixolydien ? Évitez d’appuyer sur Sol7 → Do pour protéger le foyer du mode.</li>
        <li><strong>Appuyez-vous sur des vamps à deux accords :</strong> Au lieu de longues cadences fonctionnelles, faites respirer votre morceau entre la tonique et l’accord voisin contenant la <strong>note caractéristique</strong> (ex. <code>Dom – Fa</code> en Do Dorien met en relief le <code>La</code> lumineux).</li>
        <li><strong>Ancrez avec un bourdon (pédale) :</strong> Tenir une quinte vide à vide à la basse fixe immédiatement le centre modal — chaque intervalle caractéristique rayonne aussitôt au-dessus.</li>
      </ul>
    </article>
  `;

  return introHeader + `<div class="knowledge-list">${cards}</div>` + tipsCard;
}

const KEYS_CIRCLE_DATA_FR = [
  {
    id: "key-0",
    group: "neutral",
    sigBadge: "0 altération",
    majorName: "Do majeur",
    minorName: "La mineur",
    rootMidi: 60,
    minorMidi: 57,
    accidentalList: "Aucun dièse ni bémol (uniquement les touches blanches)",
    chords: "I Do · ii Rém · iii Mim · IV Fa · V Sol · vi Lam",
    instrumentTip: "Point de départ classique au piano, à la flûte à bec & en échauffement vocal"
  },
  {
    id: "key-1s",
    group: "sharp",
    sigBadge: "1 ♯",
    majorName: "Sol majeur",
    minorName: "Mi mineur",
    rootMidi: 55,
    minorMidi: 52,
    accidentalList: "1♯ : Fa♯ (sensible vers Sol)",
    chords: "I Sol · ii Lam · iii Sim · IV Do · V Ré · vi Mim",
    instrumentTip: "Adorée des cordes frottées (cordes à vide Sol/Ré/La/Mi) & guitare acoustique"
  },
  {
    id: "key-2s",
    group: "sharp",
    sigBadge: "2 ♯",
    majorName: "Ré majeur",
    minorName: "Si mineur",
    rootMidi: 62,
    minorMidi: 59,
    accidentalList: "2♯ : Fa♯, Do♯",
    chords: "I Ré · ii Mim · iii Fa♯m · IV Sol · V La · vi Sim",
    instrumentTip: "Tonalité d’orchestre éclatante et festive (trompettes baroques, violon, violoncelle)"
  },
  {
    id: "key-3s",
    group: "sharp",
    sigBadge: "3 ♯",
    majorName: "La majeur",
    minorName: "Fa♯ mineur",
    rootMidi: 57,
    minorMidi: 54,
    accidentalList: "3♯ : Fa♯, Do♯, Sol♯",
    chords: "I La · ii Sim · iii Do♯m · IV Ré · V Mi · vi Fa♯m",
    instrumentTip: "Ouverte, rayonnante et fluide à la guitare comme aux cordes"
  },
  {
    id: "key-4s",
    group: "sharp",
    sigBadge: "4 ♯",
    majorName: "Mi majeur",
    minorName: "Do♯ mineur",
    rootMidi: 64,
    minorMidi: 61,
    accidentalList: "4♯ : Fa♯, Do♯, Sol♯, Ré♯",
    chords: "I Mi · ii Fa♯m · iii Sol♯m · IV La · V Si · vi Do♯m",
    instrumentTip: "Signature de la guitare électrique, du blues & du rock (corde grave de Mi à vide)"
  },
  {
    id: "key-5s",
    group: "sharp",
    sigBadge: "5 ♯ / 7 ♭",
    majorName: "Si majeur (= Do♭ majeur)",
    minorName: "Sol♯ mineur (= La♭ mineur)",
    rootMidi: 59,
    minorMidi: 56,
    accidentalList: "5♯ : Fa♯, Do♯, Sol♯, Ré♯, La♯ (enharmonique de Do♭ majeur à 7♭)",
    chords: "I Si · ii Do♯m · iii Ré♯m · IV Mi · V Fa♯ · vi Sol♯m",
    instrumentTip: "Étonnamment confortable sous les doigts au piano car les 5 touches noires suivent la main"
  },
  {
    id: "key-6",
    group: "sharp",
    sigBadge: "6 ♯ / 6 ♭",
    majorName: "Fa♯ majeur / Sol♭ majeur",
    minorName: "Ré♯ mineur / Mi♭ mineur",
    rootMidi: 54,
    minorMidi: 51,
    accidentalList: "6♯ (Fa♯, Do♯, Sol♯, Ré♯, La♯, Mi♯) ou 6♭ (Si♭, Mi♭, La♭, Ré♭, Sol♭, Do♭)",
    chords: "I Fa♯/Sol♭ · ii Sol♯m/La♭m · IV Si/Do♭ · V Do♯/Ré♭ · vi Ré♯m/Mi♭m",
    instrumentTip: "Pile à l’opposé de Do majeur sur le cycle (pôle triton !). Carrefour enharmonique"
  },
  {
    id: "key-5f",
    group: "flat",
    sigBadge: "5 ♭ / 7 ♯",
    majorName: "Ré♭ majeur (= Do♯ majeur)",
    minorName: "Si♭ mineur (= La♯ mineur)",
    rootMidi: 61,
    minorMidi: 58,
    accidentalList: "5♭ : Si♭, Mi♭, La♭, Ré♭, Sol♭ (enharmonique de Do♯ majeur à 7♯)",
    chords: "I Ré♭ · ii Mi♭m · iii Fam · IV Sol♭ · V La♭ · vi Si♭m",
    instrumentTip: "Très aimée au piano romantique, en soul & en ballades jazz (veloutée sous les touches noires)"
  },
  {
    id: "key-4f",
    group: "flat",
    sigBadge: "4 ♭",
    majorName: "La♭ majeur",
    minorName: "Fa mineur",
    rootMidi: 56,
    minorMidi: 53,
    accidentalList: "4♭ : Si♭, Mi♭, La♭, Ré♭",
    chords: "I La♭ · ii Si♭m · iii Dom · IV Ré♭ · V Mi♭ · vi Fam",
    instrumentTip: "Grande favorite des standards jazz, harmonies d’vents & ballades R&B/pop"
  },
  {
    id: "key-3f",
    group: "flat",
    sigBadge: "3 ♭",
    majorName: "Mi♭ majeur",
    minorName: "Do mineur",
    rootMidi: 63,
    minorMidi: 60,
    accidentalList: "3♭ : Si♭, Mi♭, La♭",
    chords: "I Mi♭ · ii Fam · iii Solm · IV La♭ · V Si♭ · vi Dom",
    instrumentTip: "Tonalité symphonique héroïque (Eroica de Beethoven) ; idéale pour sax alto & cuivres"
  },
  {
    id: "key-2f",
    group: "flat",
    sigBadge: "2 ♭",
    majorName: "Si♭ majeur",
    minorName: "Sol mineur",
    rootMidi: 58,
    minorMidi: 55,
    accidentalList: "2♭ : Si♭, Mi♭",
    chords: "I Si♭ · ii Dom · iii Rém · IV Mi♭ · V Fa · vi Solm",
    instrumentTip: "Tonalité phare du jazz, des big bands, fanfares & trompettes/clarinettes en Si♭"
  },
  {
    id: "key-1f",
    group: "flat",
    sigBadge: "1 ♭",
    majorName: "Fa majeur",
    minorName: "Ré mineur",
    rootMidi: 53,
    minorMidi: 62,
    accidentalList: "1♭ : Si♭ (le Si♮ est abaissé en Si♭)",
    chords: "I Fa · ii Solm · iii Lam · IV Si♭ · V Do · vi Rém",
    instrumentTip: "Résonance douce et pastorale ; registre naturel et confortable pour cors, flûtes & chœurs"
  }
];

function renderKeysReferenceHTML_FR(circleFilter = "all") {
  const list = KEYS_CIRCLE_DATA_FR.filter(k => circleFilter === "all" || k.group === circleFilter);

  const theoryIntro = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Notion de base</span>
        <span class="k-ratio-chip">Tonalité &amp; Armures</span>
      </div>
      <h4>Gamme vs Tonalité : qu’est-ce qui fait vraiment une tonalité ?</h4>
      <p>
        Une <strong>gamme</strong> n’est qu’une liste ordonnée de hauteurs (ex. Do–Ré–Mi–Fa–Sol–La–Si–Do). Une <strong>tonalité</strong> décrit tout le <em>système de gravité magnétique</em> autour d’un foyer : elle fixe le point de repos (<strong>Tonique / Fondamentale</strong>), la couleur (<strong>Majeur</strong> lumineux vs <strong>Mineur</strong> profond) et les altérations permanentes à la clé via l’<strong>armure</strong> (♯ ou ♭).
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Pourquoi existe-t-il des armures ?</strong>
          Chaque gamme majeure exige exactement le même schéma d’écarts : <code>T – T – ½T – T – T – T – ½T</code> (demi-tons entre 3–4 et 7–8). En partant de <code>Sol</code> au lieu de Do, le 7e degré (<code>Fa</code>) est trop bas — il faut l’élever en <code>Fa♯</code> pour retrouver la sensible !
        </div>
        <div class="physics-fact-item">
          <strong>Armure à la clé vs Altération accidentelle</strong>
          L’<strong>armure</strong> placée juste à côté de la clé s’applique à tout le morceau. Une <strong>altération accidentelle</strong> au milieu d’une mesure ne vaut que jusqu’à la barre de mesure suivante pour une nuance passagère.
        </div>
      </div>
    </article>

    <div class="k-sibling-bar">
      <span>🧭 <strong>Explorer à l’œil &amp; à l’oreille :</strong> Ouvrez la roue interactive du Cycle des quintes avec accords et modulations en direct.</span>
      <button type="button" class="btn-tool" data-jump-ref="circle-of-fifths">Ouvrir le Cycle des quintes →</button>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Logique du Cycle des quintes</span>
        <span class="k-ratio-chip">3:2 → 12 Tonalités</span>
      </div>
      <h4>Pourquoi les 12 tonalités forment une horloge parfaite</h4>
      <p>
        Juste après l’octave (2:1), la <strong>Quinte juste (3:2)</strong> est le lien harmonique le plus fort en musique. Avancez dans le sens horaire par quintes ascendantes (<code>Do → Sol → Ré → La → Mi → Si → Fa♯</code>) : chaque pas ajoute un nouveau <strong>dièse (♯)</strong>. Reculez dans le sens antihoraire par quartes ascendantes (<code>Do → Fa → Si♭ → Mi♭ → La♭ → Ré♭ → Sol♭</code>) : chaque pas ajoute un nouveau <strong>bémol (♭)</strong>.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Sens horaire : tonalités à dièses (♯)</h5>
          <p><strong>Ordre des tonalités :</strong> <em>Sol, Ré, La, Mi, Si, Fa♯</em>.<br><strong>Ordre des dièses :</strong> <code>Fa♯ – Do♯ – Sol♯ – Ré♯ – La♯ – Mi♯</code> (<em>Fa Do Sol Ré La Mi Si</em> — le dernier dièse est toujours la sensible, un demi-ton sous la tonique !).</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Sens antihoraire : tonalités à bémols (♭)</h5>
          <p><strong>Ordre des tonalités :</strong> <em>Fa, Si♭, Mi♭, La♭, Ré♭, Sol♭</em>.<br><strong>Ordre des bémols :</strong> <code>Si♭ – Mi♭ – La♭ – Ré♭ – Sol♭ – Do♭</code> (<em>Si Mi La Ré Sol Do Fa</em>). Astuce : l’<strong>avant-dernier bémol</strong> nomme la tonalité majeure !</p>
        </div>
      </div>
      <p class="k-tip"><strong>Comma pythagoricien &amp; Enharmonie :</strong> Empiler 12 quintes pures 3:2 dépasse 7 octaves d’environ 23,5 cents (le <em>comma pythagoricien</em>). Le <strong>tempérament égal moderne</strong> répartit ce micro-écart sur les 12 demi-tons si bien que <code>Fa♯ majeur</code> (6♯) et <code>Sol♭ majeur</code> (6♭) coïncident exactement sur les mêmes touches du piano.</p>
    </article>

    <div class="section-heading-row">
      <h2 class="section-heading">3. Atlas complet des 12 tonalités</h2>
    </div>

    <div class="k-filter-row" aria-label="Filtrer les tonalités par armure">
      <button class="k-filter-pill ${circleFilter === "all" ? "active" : ""}" data-kfilter="all">Les 12 tonalités</button>
      <button class="k-filter-pill ${circleFilter === "neutral" ? "active" : ""}" data-kfilter="neutral">Do / Lam (0 alt.)</button>
      <button class="k-filter-pill ${circleFilter === "sharp" ? "active" : ""}" data-kfilter="sharp">Dièses (♯)</button>
      <button class="k-filter-pill ${circleFilter === "flat" ? "active" : ""}" data-kfilter="flat">Bémols (♭)</button>
    </div>
  `;

  const keyCards = list.map(k => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${k.group === "neutral" ? "tag-sage" : k.group === "sharp" ? "tag-peach" : "tag-lilac"}">${k.sigBadge}</span>
        <span class="k-ratio-chip">${k.majorName} / ${k.minorName}</span>
      </div>
      <h4>${k.majorName} &amp; Relatif ${k.minorName}</h4>
      <p><strong>Armure :</strong> ${k.accidentalList}</p>
      <p><strong>Accords diatoniques :</strong> <code>${k.chords}</code></p>
      <p class="k-tip">${k.instrumentTip}</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-key-cadence="${k.rootMidi}" data-key-mode="major">▶ Cadence ${k.majorName.split(" ")[0]} maj.</button>
        <button class="btn-tool" data-play-key-cadence="${k.minorMidi}" data-key-mode="minor">▶ ${k.minorName}</button>
      </div>
    </article>
  `).join("");

  const extraSections = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. Les 3 visages du Mineur</span>
        <span class="k-ratio-chip">Pourquoi 3 gammes mineures</span>
      </div>
      <h4>Mineur naturel, harmonique &amp; mélodique (en La mineur)</h4>
      <p>
        Là où le majeur garde une forme unique, la musique en mineur utilise trois variantes complémentaires parce que le mineur naturel manque de sensible à un demi-ton sous la tonique (<code>Sol → La</code> fait un ton entier, moins incisif que <code>Sol♯ → La</code>) :
      </p>
      <ul class="k-physics-list">
        <li><strong>Mineur naturel (Éolien) :</strong> Reprend exactement l’armure de son relatif majeur (<code>La–Si–Do–Ré–Mi–Fa–Sol–La</code>). Folk, authentique et fluide.</li>
        <li><strong>Mineur harmonique :</strong> Rehausse le 7e degré (<code>Sol → Sol♯</code>) afin que le degré V devienne une vraie <strong>Dominante majeure (Mi7)</strong>. Laisse un intervalle expressif de 3 demi-tons entre <code>Fa</code> et <code>Sol♯</code>.</li>
        <li><strong>Mineur mélodique :</strong> Adoucit ce saut pour les chanteurs en haussant aussi le 6e degré à la montée (<code>Fa → Fa♯, Sol → Sol♯</code>) ; le classique redescend souvent en mineur naturel, tandis que le jazz conserve la forme relevée dans les deux sens.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G4,A4" data-dur="0.45" data-step="320">▶ La mineur naturel</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G#4,A4" data-dur="0.45" data-step="320">▶ La mineur harmonique</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F#4,G#4,A4" data-dur="0.45" data-step="320">▶ La mineur mélodique</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Liens entre tonalités &amp; Modulations</span>
        <span class="k-ratio-chip">Changer de tonalité</span>
      </div>
      <h4>Comment les tonalités dialoguent &amp; modulent en douceur</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Ton relatif mineur / majeur (3 demi-tons d’écart)</strong>
          Partagent exactement les mêmes notes et la même armure : <code>Do majeur ↔ La mineur</code>, <code>Sol majeur ↔ Mi mineur</code>. Basculer d’un centre à l’autre paraît naturel et évident.
        </div>
        <div class="physics-fact-item">
          <strong>Ton homonyme majeur / mineur (Même tonique)</strong>
          Gardent la même tonique tout en inversant majeur et mineur : <code>Do majeur ↔ Do mineur</code> (3 bémols d’écart !). Offre des bascules théâtrales comme la célèbre « tierce picarde ».
        </div>
        <div class="physics-fact-item">
          <strong>Tonalités voisines (voisines du cycle)</strong>
          Les voisines à un cran horaire ou antihoraire (<code>Do majeur ↔ Sol</code> ou <code>Fa</code>) ne diffèrent que d’une seule note. Des accords pivots (comme <code>Lam</code>) assurent des transitions imperceptibles.
        </div>
        <div class="physics-fact-item">
          <strong>Médiantes chromatiques &amp; Modulation d’un ton</strong>
          Glisser d’une tierce (<code>Do → La♭</code> ou <code>Mi</code>) change plusieurs altérations d’un coup pour un effet grand écran immédiat — tandis qu’une montée directe d’un demi-ton ou d’un ton au dernier refrain décuple l’énergie.
        </div>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-custom="key-variant">▶ Homonymes Do ↔ Dom</button>
        <button class="btn-tool" data-play-custom="key-mediant">▶ Médiante Do → La♭ → Do</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">6. Instruments transpositeurs &amp; Couleur des tons</span>
        <span class="k-ratio-chip">Pratique d’ensemble</span>
      </div>
      <h4>Pourquoi les vents ne lisent pas la même armure que le piano</h4>
      <p>
        Alors que piano, guitare, cordes et flûte lisent en <strong>ut (son réel)</strong>, de nombreux vents transposent afin que des doigtés identiques restent valables d’un modèle à l’autre :
      </p>
      <ul class="k-physics-list">
        <li><strong>Instruments en Si♭ (Trompette, Clarinette, Saxophone ténor) :</strong> Un <code>Do</code> écrit sonne comme un <code>Si♭</code> réel (une seconde majeure plus bas). Quand le groupe joue en <code>Si♭ majeur (2♭)</code>, la trompette lit tranquillement en <code>Do majeur (0 altération)</code> !</li>
        <li><strong>Instruments en Mi♭ (Saxophone alto, Sax baryton) :</strong> Un <code>Do</code> écrit sonne comme un <code>Mi♭</code> réel (une sixte majeure en dessous). Quand l’ensemble joue en <code>Mi♭ majeur (3♭)</code>, le sax alto lit en <code>Do majeur</code>.</li>
        <li><strong>Instruments en Fa (Cor d’harmonie, Cor anglais) :</strong> Un <code>Do</code> écrit sonne une quinte juste plus bas sur un <code>Fa</code> réel.</li>
      </ul>
      <p class="k-tip"><strong>« Caractère » des tonalités :</strong> Avant le tempérament égal, les inégalités d’accordage donnaient à chaque tonalité un parfum propre (<em>Ré♭</em> velouté, <em>Ré</em> éclatant). Aujourd’hui, les 12 tons partagent les mêmes rapports mathématiques — mais les vrais instruments continuent de colorer chaque tonalité par leurs cordes à vide, leur perce acoustique et la tessiture vocale.</p>
    </article>
  `;

  return theoryIntro + `<div class="knowledge-list">${keyCards}</div>` + extraSections;
}

function renderSingAndPlayReferenceHTML_FR() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">1. Pourquoi la coordination coince au début</span>
        <span class="k-ratio-chip">Pilote automatique &amp; Focus</span>
      </div>
      <h4>Pourquoi chanter en s’accompagnant semble si difficile au départ</h4>
      <p>
        À la seconde où vous jouez et chantez ensemble, deux systèmes totalement indépendants se partagent exactement le même tempo : vos <strong>mains</strong> (mémoire motrice, positions d’accords, battement) et votre <strong>voix</strong> (souffle, justesse, paroles). La mémoire de travail ne peut tout simplement pas piloter à la loupe deux nouveautés à la fois.
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Mettez au moins une partie en pilote automatique</strong>
          Dès que voix et mains s’entrechoquent, votre cerveau dirige encore activement les deux. Solution : répétez l’accompagnement (ou la ligne vocale) jusqu’à ce qu’il coule tout seul comme monter un escalier.
        </div>
        <div class="physics-fact-item">
          <strong>Verrouillez le rythme avant les notes</strong>
          90 % des blocages sont rythmiques, pas mélodiques ! Quand une syllabe tombe entre deux frappes, les mains figent — tant que les deux rythmes n’ont pas été alignés clairement.
        </div>
        <div class="physics-fact-item">
          <strong>Fredonnez d’abord sur « La » ou « Dou »</strong>
          Mémoriser un texte consomme une énergie mentale énorme. Fredonner l’air sur une seule syllabe neutre libère aussitôt de l’attention pour la justesse et le groove.
        </div>
        <div class="physics-fact-item">
          <strong>Une seule pulsation interne partagée</strong>
          Laissez un léger battement de pied ou un métronome commander — votre voix ne court pas après vos mains et vos mains n’attendent pas la voix ; <em>les deux</em> répondent au même temps.
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Travailler efficacement en 5 étapes</span>
        <span class="k-ratio-chip">Méthode pas à pas</span>
      </div>
      <h4>La routine éprouvée en 5 étapes pour n’importe quel morceau</h4>
      <p>
        Au lieu de tout reprendre de la mesure 1 et de trébucher toujours au même passage, décomposez brièvement la coordination en cinq étapes ciblées :
      </p>
      <ul class="article-steps-list">
        <li>
          <strong>1. Le test de la conversation (Automatiser les mains) :</strong> Tournez en boucle votre accompagnement 1–2 minutes jusqu’à pouvoir compter à voix haute jusqu’à 20 ou discuter calmement par-dessus. Si vos mains accrochent quand vous parlez, offrez 5 minutes d’instrument seul en plus.
        </li>
        <li>
          <strong>2. Parler le texte en rythme :</strong> Jouez vos accords tout en <strong>scandant les paroles strictement en mesure</strong> sur une hauteur parlée confortable. Enlever la mélodie révèle aussitôt quelles syllabes tombent sur les temps vs entre les coups.
        </li>
        <li>
          <strong>3. Repérer les points de rencontre physiques :</strong> Notez les repères exacts : <em>« Le pouce joue la basse sur le mot “nuit” »</em> ou <em>« “libre” tombe sur le retour entre 2 et 3 »</em>. Le cerveau se synchronise sans effort sur des repères concrets !
        </li>
        <li>
          <strong>4. Alléger les accords &amp; Boucler 1–2 mesures :</strong> Commencez par littéralement <strong>un seul accord plaqué sur le Temps 1</strong> en chantant librement par-dessus. Une fois solide, ajoutez le Temps 3, puis réintroduisez la rythmique complète — toujours en petites boucles de 1–2 mesures !
        </li>
        <li>
          <strong>5. Ralenti (60 %) &amp; « Chant fantôme » :</strong> Divisez presque le tempo par deux. Sur les départs pièges, articulez silencieusement ou pensez la mélodie durant un tour d’accompagnement, fredonnez au tour suivant, puis chantez franchement.
        </li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">3. Exercices quotidiens d’indépendance</span>
        <span class="k-ratio-chip">À essayer maintenant</span>
      </div>
      <h4>6 exercices ciblés de coordination &amp; d’indépendance</h4>
      <p>
        Cinq à huit minutes avec un ou deux de ces exercices avant votre répertoire débloquent l’indépendance bien plus vite que de répéter en force :
      </p>
      <ul class="k-physics-list">
        <li>
          <strong>Exercice 1 – Test Parler &amp; Compter :</strong> Jouez une suite fluide à quatre accords (<code>I – V – vi – IV</code>) sur un groove régulier tout en lisant un court texte à voix haute ou en comptant à rebours de 20 à 1. Règle : le groove ne doit pas bouger d’un millimètre.
        </li>
        <li>
          <strong>Exercice 2 – Accords ronds sur le Temps 1 :</strong> Jouez chaque accord une seule fois sur le Temps 1 (tenu en ronde) et chantez tout le couplet dans cette résonance ouverte. Développe phrasé, gestion du souffle et changements d’accords sans précipitation.
        </li>
        <li>
          <strong>Exercice 3 – Bourdon fixe à la quinte :</strong> Tenez un bourdon simple fondamentale + quinte (<code>Do3 + Sol3</code>) à l’instrument tout en chantant mélodies ou intervalles au-dessus. Travaille l’oreille sans charger la main gauche.
        </li>
        <li>
          <strong>Exercice 4 – Anticipations &amp; Piège du « 4-et » :</strong> En pop et soul, le chant démarre souvent un demi-temps en <em>avance</em> (sur le <code>4-et</code>) tandis que guitare ou piano change proprement sur le Temps 1. Marquez des noires égales pendant que la voix démarre pile sur « et ».
        </li>
        <li>
          <strong>Exercice 5 – Basse mobile vs Note chantée tenue :</strong> Faites marcher une ligne de basse simple (ex. <code>Do – Fa – Sol – Do</code>) pendant que la voix tient une note commune stable (<code>Sol</code>) — ou inversement : tenez un accord fixe tout en chantant la gamme.
        </li>
        <li>
          <strong>Exercice 6 – Le contrôle téléphone de 20 secondes :</strong> Enregistrez une courte boucle au smartphone et réécoutez tout de suite. Écouter de l’extérieur révèle immédiatement les temps manqués ou les accélérations.
        </li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Ex. 1 : Groove pour parler par-dessus</button>
        <button class="btn-tool" data-play-custom="sp-drone">▶ Ex. 3 : Bourdon + Mélodie</button>
        <button class="btn-tool" data-play-custom="sp-syncopation">▶ Ex. 4 : Temps vs Anticipation</button>
        <button class="btn-tool" data-play-custom="sp-poly">▶ Ex. 5 : Basse mobile, note tenue</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. Astuces d’instrument &amp; Pièges courants</span>
        <span class="k-ratio-chip">Guitare, Piano &amp; Voix</span>
      </div>
      <h4>Conseils ciblés pour gagner des semaines d’effort</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Guitare : gardez le pendule en mouvement</strong>
          Votre avant-bras droit est un métronome ininterrompu (<em>Bas – Haut – Bas – Haut</em>). Même pendant les silences ou syncopes vocales, n’arrêtez jamais le bras — effleurez simplement au-dessus des cordes à vide.
        </div>
        <div class="physics-fact-item">
          <strong>Piano : superposez un rythme à la fois</strong>
          Commencez uniquement avec <em>fondamentales main gauche sur le Temps 1 + chant</em>. Ajoutez ensuite des accords calmes à droite sur 1 et 3. Les arpèges serrés ou contre-chants n’arrivent qu’à la toute fin.
        </div>
        <div class="physics-fact-item">
          <strong>Transposez dans votre tessiture de confort</strong>
          Forcer sur des aigus inconfortables détruit aussitôt la coordination des mains. N’hésitez jamais à poser un <strong>capodastre</strong> ou transposer de ±2 demi-tons pour que la voix coule avec aisance.
        </div>
        <div class="physics-fact-item">
          <strong>Programmez vos respirations comme des notes</strong>
          Les accrocs surviennent souvent entre deux phrases plutôt qu’en milieu de mesure ! Réservez consciemment une respiration sur un quart de temps avant le refrain pendant que l’instrument déroule tranquillement.
        </div>
      </div>
      <p class="k-tip"><strong>Astuce bonus Lauscher :</strong> Dans les modules <strong>Solfège</strong> et <strong>Mélodies</strong> de Lauscher, essayez de chanter à voix haute la note cherchée <em>avant</em> d’appuyer sur la touche — vous reliez ainsi oreille, voix et doigts en un seul réflexe.</p>
    </article>
  `;
}

function renderCircleOfFifthsTheoryHTML_FR() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. L’idée clé</span>
        <span class="k-ratio-chip">3:2 • 12 Tonalités</span>
      </div>
      <h4>Qu’est-ce que le Cycle des quintes — et pourquoi un cercle ?</h4>
      <p>
        Juste après l’octave (<code>2:1</code>), la <strong>quinte juste (3:2)</strong> est le lien acoustique le plus puissant en musique. En montant de quinte en quinte depuis <strong>Do</strong> (<code>Do → Sol → Ré → La → Mi → Si → Fa♯…</code>), chaque pas élève une seule note pour former la sensible suivante — ajoutant <strong>un dièse (♯)</strong> dans le sens horaire. En descendant par quintes (soit en montant par <strong>quartes</strong> : <code>Do → Fa → Si♭ → Mi♭ → La♭ → Ré♭ → Sol♭</code>), la couleur s’adoucit à chaque pas et ajoute <strong>un bémol (♭)</strong> dans le sens antihoraire.
      </p>
      <p>
        Au bout de 12 pas, le tempérament égal referme la spirale sur elle-même à <strong>6 heures (Fa♯ / Sol♭)</strong>, où 6 dièses et 6 bémols tombent exactement sur les mêmes touches du piano (<strong>enharmonie</strong>). Au lieu de mémoriser 12 gammes isolées, vous tenez une seule boussole musicale !
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Sens horaire (+1 ♯) • Quintes montantes</h5>
          <p><code>Do → Sol → Ré → La → Mi → Si → Fa♯</code><br>L’éclat monte pas à pas. Ordre des dièses : <code>Fa♯ – Do♯ – Sol♯ – Ré♯ – La♯ – Mi♯</code> (<em>Fa – Do – Sol – Ré – La – Mi – Si</em>).</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Sens antihoraire (+1 ♭) • Quartes montantes</h5>
          <p><code>Do → Fa → Si♭ → Mi♭ → La♭ → Ré♭ → Sol♭</code><br>La couleur se réchauffe et s’apaise. Ordre inversé des bémols : <code>Si♭ – Mi♭ – La♭ – Ré♭ – Sol♭ – Do♭</code> (<em>Si – Mi – La – Ré – Sol – Do – Fa</em>).</p>
        </div>
      </div>
    </article>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-peach">2. Mode d’emploi</span>
            <span class="k-ratio-chip">Logique horaire</span>
          </div>
          <h4>Lire et utiliser la roue en 20 secondes</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Cercle extérieur = Majeur, Cercle intérieur = Relatif mineur :</strong> Chaque part associe une tonalité majeure à son <strong>relatif mineur</strong> juste en dessous (<code>Do / Lam</code>, <code>Sol / Mim</code>, <code>Ré / Sim</code>…). Les deux partagent exactement les <em>7 mêmes notes et la même armure</em> — le mineur déplace simplement le centre 3 demi-tons plus bas (6e degré / <em>La</em>).</li>
          <li><strong>L’astuce instantanée pour les dièses :</strong> Regardez le <em>dernier dièse</em> à la clé et montez d’<strong>un demi-ton</strong> — c’est votre tonique majeure ! (ex. 2 dièses <code>Fa♯, Do♯</code> → un demi-ton au-dessus de <code>Do♯</code> = <strong>Ré majeur</strong>).</li>
          <li><strong>L’astuce instantanée pour les bémols :</strong> L’<em>avant-dernier bémol</em> à la clé nomme directement la tonalité majeure ! (ex. 3 bémols <code>Si♭, Mi♭, La♭</code> → l’avant-dernier est <strong>Mi♭ majeur</strong> ; seul <code>1♭ = Fa majeur</code> se retient tel quel).</li>
          <li><strong>Lire gauche, centre et droite comme une boussole :</strong> Toute case choisie vaut <code>I</code> (Tonique). Son voisin de gauche est toujours la <strong>Sous-dominante (IV)</strong> et son voisin de droite est toujours la <strong>Dominante (V)</strong> !</li>
        </ul>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-lilac">3. Un super-pouvoir musical</span>
            <span class="k-ratio-chip">Applications concrètes</span>
          </div>
          <h4>Qu’est-ce qui change dès que vous maîtrisez le cycle ?</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>1. Carte instantanée des accords d’une tonalité</strong>
            Observez les 3 parts mises en lumière ci-dessus : la tonique et ses deux voisins immédiats regroupent les <strong>6 accords diatoniques principaux</strong> de la tonalité (<code>IV – I – V</code> à l’extérieur + <code>ii – vi – iii</code> à l’intérieur) ! Des milliers de tubes pop, rock et folk tiennent dans cette seule part de tarte.
          </div>
          <div class="physics-fact-item">
            <strong>2. Transposer sans calcul mental</strong>
            Trop aigu pour chanter ? Faites pivoter ce bloc de 3 parts autour de l’horloge : tous les rapports restent intacts (<code>I–V–vi–IV</code> en Do glisse d’un cran en <code>Sol–Ré–Mim–Do</code> ou à gauche en <code>Fa–Do–Rém–Si♭</code>).
          </div>
          <div class="physics-fact-item">
            <strong>3. Modulations douces &amp; Surprises</strong>
            Deux cases voisines ne diffèrent que d’<strong>une seule note</strong> (6 notes communes sur 7 !), offrant des modulations coulées entre couplet et refrain. Traverser le cercle en face (6 pas / triton) renouvelle presque toutes les notes pour un effet dramatique maximum.
          </div>
          <div class="physics-fact-item">
            <strong>4. Oreille harmonique &amp; Lecture accélérées</strong>
            Remarquez comment les célèbres marches jazz/pop (<code>iii – vi – ii – V – I</code>) avancent <em>dans le sens antihoraire</em> cran après cran sur la roue ! Votre oreille anticipe géométriquement la fondamentale suivante.
          </div>
        </div>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">4. Exercices pratiques</span>
            <span class="k-ratio-chip">Jouer &amp; Écouter</span>
          </div>
          <h4>4 façons concrètes de s’entraîner avec le Cycle</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Sortir du duo « Do &amp; Sol » :</strong> Prenez n’importe quelle phrase, gamme ou grille et décalez-la d’un cran horaire par jour (<code>Do → Sol → Ré → La</code>) ou dans les tonalités de vents (<code>Fa → Si♭ → Mi♭ → La♭</code>). En 12 jours, vous couvrez tout le manche ou tout le clavier.</li>
          <li><strong>Écouter les marches de quintes (<code>vi–ii–V–I</code>) :</strong> Comptez en reculant vers midi : chaque accord agit comme une mini-dominante attirée par la part suivante ! Lancez l’écoute ci-dessous pour ressentir cette gravité magnétique en Do majeur.</li>
          <li><strong>Emprunter une couleur voisine (Dominantes secondaires) :</strong> En Do majeur, vous voulez plus d’élan avant <code>Sol (V)</code> ? Empruntez le <code>Fa♯</code> du voisin de droite pour transformer le mineur <code>ii (Rém)</code> en un lumineux <strong>Ré7 (V/V)</strong> pointé droit vers Sol !</li>
          <li><strong>Opposer appel chaleureux et envol lumineux :</strong> Tourner à gauche sur la roue (<code>I → IV → bVII</code>) donne une assise soul et posée ; grimper à droite (<code>I → V → V/V</code>) insuffle élan et luminosité.</li>
        </ul>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-progression="vi,ii,V7,I">▶ Écouter la gravité du cycle (Lam–Rém–Sol7–Do)</button>
          <button class="btn-tool" data-play-progression="I,V/V,V,I">▶ Écouter l’élan horaire (Do–Ré (V/V)–Sol–Do)</button>
        </div>
      </div>
    </details>
  `;
}

function getIntervalNamingGuideHTML_FR() {
  const useGerman = typeof state !== "undefined" ? state?.profile?.intervalNotation !== "intl" : true;
  const schemeBadge = useGerman ? "Actif : P / G / k" : "Actif : P / M / m";
  const m2 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m2") : "m2";
  const M2 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M2") : "M2";
  const m3 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m3") : "m3";
  const M3 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M3") : "M3";
  return `
    <details class="knowledge-card k-accordion" id="intervalNamingGuideAccordion" open>
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">Abréviations &amp; Noms</span>
            <span class="k-ratio-chip">${schemeBadge}</span>
          </div>
          <h4>Comment lire la notation abrégée (Lettre + Chiffre)</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <p>Chaque code d’intervalle concentre deux informations en deux caractères : le <strong>chiffre</strong> indique le nombre de degrés de la gamme, et la <strong>lettre</strong> précise la largeur exacte en demi-tons.</p>
        <ul class="k-physics-list">
          <li><strong>1. Le chiffre (<code>1</code>–<code>9</code>) compte les noms de notes :</strong> De <code>1</code> = Unisson (même note), <code>2</code> = Seconde, <code>3</code> = Tierce, <code>4</code> = Quarte, <code>5</code> = Quinte, <code>6</code> = Sixte, <code>7</code> = Septième, <code>8</code> = Octave jusqu’à <code>9</code> = Neuvième.</li>
          <li><strong>2. Intervalles justes (<code>P</code>) :</strong> <code>P1</code>, <code>P4</code>, <code>P5</code> et <code>P8</code> n’existent que sous une seule forme pure (<em>Perfect</em> / Juste) — pas de variante majeure ou mineure.</li>
          <li><strong>3. Paires Majeur &amp; mineur (<code>2</code>, <code>3</code>, <code>6</code>, <code>7</code>, <code>9</code>) :</strong> Ces cinq intervalles existent en deux nuances écartées d’<strong>1 demi-ton</strong> :<br>
            – <strong>International (<code>P / M / m</code>) :</strong> <strong><code>M</code></strong> majuscule (<em>Major</em> / Majeur) désigne le grand intervalle lumineux ; <strong><code>m</code></strong> minuscule (<em>minor</em> / mineur) mesure 1 demi-ton de moins (ex. <code>M3</code> vs <code>m3</code>). La minuscule change donc tout !<br>
            – <strong>Allemand (<code>P / G / k</code>) :</strong> <strong><code>G</code></strong> majuscule (<em>Groß</em> = majeur) vs <strong><code>k</code></strong> minuscule (<em>klein</em> = mineur, ex. <code>G3</code> vs <code>k3</code>).</li>
          <li><strong>4. Triton (<code>TT</code>) :</strong> Coupe exactement l’octave en deux à <strong>6 demi-tons</strong>, pile entre <code>P4</code> et <code>P5</code> (quarte augmentée / quinte diminuée).</li>
        </ul>
        <div class="k-meta-box">
          <div>🔎 <strong>Symboles actifs :</strong> 2des : <code>${m2}</code> (1 DT) vs <code>${M2}</code> (2 DT) · 3ces : <code>${m3}</code> (3 DT) vs <code>${M3}</code> (4 DT)</div>
          <div>⚙️ <strong>Personnaliser :</strong> Basculez librement entre <strong>International (P / M / m)</strong> et <strong>Allemand (P / G / k)</strong> dans <strong>Paramètres → Notation musicale → Noms des intervalles</strong>.</div>
        </div>
      </div>
    </details>
  `;
}

function renderNotationReferenceHTML_FR() {
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
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. La portée à 5 lignes</span>
        <span class="k-ratio-chip">Lignes &amp; Interlignes</span>
      </div>
      <h4>Comment la musique devient lisible sur le papier</h4>
      <p>
        La partition fonctionne comme un repère géométrique : l’<strong>axe vertical</strong> représente la hauteur (plus haut = plus aigu, plus bas = plus grave) et l’<strong>axe horizontal</strong> fait défiler le temps de gauche à droite.
      </p>
      <ul class="k-physics-list">
        <li><strong>Toujours compter de bas en haut :</strong> Une portée comporte <strong>5 lignes</strong> (1re en bas jusqu’à la 5e en haut) et <strong>4 interlignes</strong> entre elles.</li>
        <li><strong>Alternance ligne – interligne :</strong> Passer d’une ligne à l’interligne voisin correspond toujours à avancer d’<strong>une seule marche diatonique</strong> (<code>C → D → E → F → G → A → B</code> / Do à Si).</li>
        <li><strong>Pourquoi la clé est indispensable :</strong> Sans clé, les lignes sont muettes : c’est elle qui fixe une <em>note de référence précise</em> sur l’une des lignes.</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Les 3 clés principales (et clés spéciales)</span>
        <span class="k-ratio-chip">Sol • Fa • Ut 3</span>
      </div>
      <h4>Trois regards sur le même clavier</h4>
      <p>
        La ligne surlignée en orange indique le <strong>point d’ancrage</strong> exact de chaque clé. Retenez ce repère unique pour déduire toutes les notes voisines en un instant.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${trebleAnchorSvg}
          <h5>Clé de Sol (G)</h5>
          <p>Sa boucle centrale encercle la <strong>2e ligne = Sol4 (G4)</strong>. Standard pour le chant (soprano/alto), le violon, la flûte, la trompette, la guitare et la main droite du piano.</p>
          <p><strong>Repères (bas → haut) :</strong> Lignes <em>Mi – Sol – Si – Ré – Fa</em> ; Interlignes <em>Fa – La – Do – Mi</em>.</p>
          <button type="button" class="btn-tool" data-play-solo-note="G4">▶ Écouter l’ancrage G4</button>
        </div>
        <div class="notation-knowledge-card">
          ${bassAnchorSvg}
          <h5>Clé de Fa (F)</h5>
          <p>Les deux points encadrent la <strong>4e ligne = Fa3 (F3)</strong>. Incontournable pour la main gauche du piano, le violoncelle, la contrebasse, la basse, le trombone et les voix graves.</p>
          <p><strong>Repères (bas → haut) :</strong> Lignes <em>Sol – Si – Ré – Fa – La</em> ; Interlignes <em>La – Do – Mi – Sol</em>.</p>
          <button type="button" class="btn-tool" data-play-solo-note="F3">▶ Écouter l’ancrage F3</button>
        </div>
        <div class="notation-knowledge-card">
          ${altoAnchorSvg}
          <h5>Clé d’Ut 3e ligne (Alto)</h5>
          <p>Son cœur pointe droit sur la <strong>3e ligne (centrale) = Do central (C4)</strong>. Clé naturelle de l’alto (orchestre) et de nombreuses partitions polyphoniques.</p>
          <p><strong>Astuce de symétrie :</strong> <code>C4</code> au centre place <em>Mi</em> (4e) et <em>Sol</em> (5e) au-dessus, et <em>La</em> (2e) puis <em>Fa</em> (1re) juste en dessous.</p>
          <button type="button" class="btn-tool" data-play-solo-note="C4">▶ Écouter l’ancrage C4</button>
        </div>
      </div>

      <div class="k-meta-box">
        <div>🔑 <strong>Le même Do central (C4) relie les trois clés :</strong> En <strong>clé de Sol</strong>, il est sur la 1re ligne supplémentaire <em>en bas</em> ; en <strong>clé d’Ut 3</strong>, pile au <em>centre (3e ligne)</em> ; en <strong>clé de Fa</strong>, sur la 1re ligne supplémentaire <em>en haut</em> !</div>
        <div>🎼 <strong>Clés spéciales (Aperçu) :</strong> La <strong>clé d’Ut 4 (Ténor)</strong> place le même Do central sur la 4e ligne pour les passages aigus du violoncelle, du basson ou du trombone, tandis que les clés octaviantes (<code>8vb</code> / <code>8va</code>) évitent l’empilement de lignes pour la guitare ou le piccolo.</div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Jusqu’à 3 lignes supplémentaires</span>
        <span class="k-ratio-chip">±3 lignes suppl.</span>
      </div>
      <h4>Lire haut et bas sans jamais compter une par une</h4>
      <p>
        Lorsque la mélodie sort des 5 lignes, de courts traits appelés <strong>lignes supplémentaires</strong> prolongent localement la portée. Vous travaillez ici jusqu’à <strong>3 lignes supplémentaires en haut et en bas</strong> — la tessiture réelle des partitions d’orchestre et de piano.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${ledgerSvg}
          <h5>Clé de Sol : ±3 lignes supplémentaires</h5>
          <p>À gauche : 3e, 2e et 1re lignes dessous (<code>F3 – A3 – C4</code>) ; au centre : <code>B4</code> ; à droite : 1re, 2e et 3e lignes dessus (<code>A5 – C6 – E6</code>).</p>
        </div>
        <div class="notation-knowledge-card">
          ${ledgerBassSvg}
          <h5>Clé de Fa : graves profonds &amp; aigu mélodique</h5>
          <p>Vers le bas : 3 lignes descendent jusqu’à <code>A1</code> ; vers le haut : le Do central (<code>C4</code>) ouvre jusqu’à <code>E4</code> et <code>G4</code>.</p>
        </div>
      </div>
      <ul class="k-physics-list">
        <li><strong>Mémorisez 2 balises hors portée :</strong> Fixez la 1re et la 2e ligne supplémentaire (ex. <code>C4</code> et <code>A3</code> sous la clé de Sol, <code>A5</code> et <code>C6</code> au-dessus) pour identifier instantanément chaque degré voisin.</li>
        <li><strong>Repérez les sauts de tierce :</strong> Passer directement d’une ligne supplémentaire à la suivante saute toujours une <strong>tierce</strong> (principe des accords empilés).</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Altérations &amp; Systèmes de noms</span>
        <span class="k-ratio-chip">♯ • ♭ • B vs H</span>
      </div>
      <h4>Touches noires, enharmonie &amp; particularité allemande</h4>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${accSvg}
          <div class="k-btn-row" style="margin-top:0.25rem;">
            <button type="button" class="btn-tool" data-play-solo-note="F4">▶ F4</button>
            <button type="button" class="btn-tool" data-play-solo-note="F#4">▶ F♯4 / G♭4</button>
            <button type="button" class="btn-tool" data-play-solo-note="Bb4">▶ B♭4</button>
          </div>
        </div>
        <div class="notation-knowledge-card">
          <ul class="k-physics-list">
            <li><strong>Dièse (<code>♯</code>) :</strong> Monte la note d’<strong>1 demi-ton</strong> (une touche à droite). <code>F</code> devient <code>F♯</code>.</li>
            <li><strong>Bémol (<code>♭</code>) :</strong> Abaisse la note d’<strong>1 demi-ton</strong> (une touche à gauche). <code>G</code> devient <code>G♭</code>.</li>
            <li><strong>Enharmonie :</strong> Sur un clavier, <code>F♯</code> et <code>G♭</code> frappent exactement la même touche noire — seule leur fonction harmonique change l’écriture.</li>
            <li><strong>Attention notation allemande :</strong> En notation allemande, la note blanche <em>Si (B)</em> s’écrit <strong>H</strong>, et le <em>Si♭ (B♭)</em> s’écrit <strong>B</strong> ! Basculez facilement entre les deux systèmes dans les <em>Réglages de l’application</em>.</li>
          </ul>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Armures &amp; Lecture à vue</span>
        <span class="k-ratio-chip">Armure ♯/♭ + ♮</span>
      </div>
      <h4>Quand les altérations s’appliquent à toute la portée</h4>
      <p>
        Plutôt que de réécrire un <code>♯</code> ou un <code>♭</code> devant chaque note, l’armure placée <strong>juste après la clé</strong> modifie automatiquement ces degrés dans <strong>toutes les octaves</strong> jusqu’à l’arrivée d’un bécarre (<code>♮</code>).
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${keySigSharpSvg}
          <h5>Tonalités à dièses (Ordre : Fa – Do – Sol – Ré – La – Mi)</h5>
          <p>En <strong>Ré majeur (2♯)</strong>, chaque <code>Fa</code> devient <code>Fa♯</code> et chaque <code>Do</code> devient <code>Do♯</code> — seul le bécarre (<code>♮</code>) devant la 3e note rétablit le Fa naturel.</p>
        </div>
        <div class="notation-knowledge-card">
          ${keySigFlatSvg}
          <h5>Tonalités à bémols (Ordre : Si – Mi – La – Ré – Sol – Do)</h5>
          <p>En <strong>Mi♭ majeur (3♭)</strong>, <code>Si♭</code>, <code>Mi♭</code> et <code>La♭</code> gouvernent toute la portée dès le début jusqu’à l’apparition éventuelle d’un bécarre (<code>♮</code>).</p>
        </div>
      </div>
    </article>
  `;
}

function renderArrangingReferenceHTML_FR() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Qu’est-ce que l’arrangement ?</span>
        <span class="k-ratio-chip">Esquisse → Œuvre complète</span>
      </div>
      <h4>L’art de transformer une idée musicale en univers sonore vivant</h4>
      <p>
        Si la <strong>composition</strong> est le plan d’une chanson (mélodie, accords de base et paroles), l’<strong>arrangement</strong> en est toute l’architecture, la mise en lumière et la palette de couleurs : <em>Qui joue quoi, à quel moment, dans quelle octave, avec quel rythme, quelle dynamique et quel timbre ?</em>
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Instrumentation &amp; Timbres</strong>
          Choisir quels instruments ou voix portent la mélodie, la basse, le tapis harmonique et le rythme — et comment leurs timbres se marient.
        </div>
        <div class="physics-fact-item">
          <strong>Forme &amp; Dramaturgie</strong>
          Construire l’arc émotionnel depuis une intro intime jusqu’au refrain, au pont et au final.
        </div>
        <div class="physics-fact-item">
          <strong>Registres &amp; Voicings</strong>
          Répartir les notes du grave profond aux aigus cristallins pour que chaque instrument respire sans brouiller l’ensemble.
        </div>
        <div class="physics-fact-item">
          <strong>Dialogue, Texture &amp; Silences</strong>
          Décider quand tout le monde joue (<em>tutti</em>), quand un instrument répond dans les silences du chant et quand le vide crée le frisson.
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. Rôle &amp; Utilisations</span>
        <span class="k-ratio-chip">Pourquoi arranger ?</span>
      </div>
      <h4>À quoi sert un arrangement — et quand l’utilise-t-on ?</h4>
      <p>
        Une même chanson aux quatre mêmes accords peut devenir une <strong>ballade piano intimiste</strong>, un <strong>morceau funk entraînant</strong>, un <strong>chœur a cappella à quatre voix</strong> ou une <strong>fresque orchestrale de film</strong> :
      </p>
      <ul class="article-steps-list">
        <li><strong>1. Guider l’attention de l’oreille :</strong> L’oreille humaine ne suit consciemment que <strong>2 à 3 plans sonores simultanés</strong>. Un bon arrangement dégage le registre médium pour la voix ou la mélodie principale.</li>
        <li><strong>2. Traduire l’émotion et le style :</strong> Des nappes de cordes apportent chaleur et ampleur, des cuivres brefs donnent de l’impact, une guitare acoustique crée la proximité.</li>
        <li><strong>3. Éviter la fatigue auditive :</strong> Si tous les instruments jouent dès la première mesure, l’oreille sature vite. Ajouter et retirer des couches garde chaque couplet et refrain captivant.</li>
        <li><strong>4. Adapter la musique à un ensemble réel :</strong> Groupe, quatuor à cordes, chœur SATB, big band ou piano solo — l’arrangement ajuste l’écriture aux tessitures et aux musiciens présents.</li>
        <li><strong>5. Soigner les transitions :</strong> Relances de batterie, marches de basse, crescendos et pauses franches (<em>breaks</em>) relient les parties avec fluidité.</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Les 4 plans sonores</span>
        <span class="k-ratio-chip">Répartition des rôles</span>
      </div>
      <h4>Les 4 couches fondamentales d’un arrangement limpide</h4>
      <ul class="k-physics-list">
        <li><strong>1. Premier plan (Lead / Mélodie) :</strong> Voix ou instrument soliste qui raconte l’histoire principale.</li>
        <li><strong>2. Fondation (Basse &amp; Groove) :</strong> La basse pose la fondamentale harmonique tandis que la batterie et les percussions ancrent la pulsation.</li>
        <li><strong>3. Tapis harmonique (Pad &amp; Comping) :</strong> Cordes tenues, chœurs, orgue ou accords rythmiques de guitare/piano au centre du spectre.</li>
        <li><strong>4. Contre-chant &amp; Ornements (Fills) :</strong> Petites réponses mélodiques placées précisément lorsque la mélodie principale reprend son souffle.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-sketch">▶ 1. Esquisse nue (mélodie &amp; basse)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-full-layers">▶ 2. Arrangement complet à 4 couches</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Registres &amp; Voicings</span>
        <span class="k-ratio-chip">Clarté vs Boue sonore</span>
      </div>
      <h4>Pourquoi certains arrangements sonnent limpides — et d’autres confus</h4>
      <ul class="k-physics-list">
        <li><strong>La loi des harmoniques (Large en bas, serré en haut) :</strong> Sous <code>Do3 (C3)</code>, les tierces serrées brouillent le grave (<em>Low-Interval Limit</em>). Réservez le grave aux fondamentales, quintes et octaves, et placez tierces, septièmes et extensions dans le médium et l’aigu.</li>
        <li><strong>Position serrée vs Position ouverte (Drop-2) :</strong> Baisser d’une octave la deuxième note depuis le haut d’un accord serré ouvre immédiatement l’espace sonore.</li>
        <li><strong>Complémentarité rythmique :</strong> Associez des valeurs longues (nappes) à des motifs courts et précis pour éviter le masquage.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-muddy">▶ Confus : Tierces serrées dans le grave</button>
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-open">▶ Limpide : Voicing ouvert bien étagé</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Dynamique &amp; Dialogue</span>
        <span class="k-ratio-chip">Call &amp; Response • Drop</span>
      </div>
      <h4>Maintenir l’intérêt d’un bout à l’autre du morceau</h4>
      <ul class="article-steps-list">
        <li><strong>Call &amp; Response (Question / Réponse) :</strong> L’accompagnement répond dans les silences de la voix principale.</li>
        <li><strong>Mouvement contraire &amp; Contre-chant :</strong> Une seconde ligne mélodique descend quand la mélodie monte, ou bouge pendant une note tenue.</li>
        <li><strong>La force du retrait (Le « Drop ») :</strong> Retirer soudainement presque tous les instruments pendant une mesure crée souvent plus d’impact que d’en ajouter.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-call-response">▶ Call &amp; Response (question / réponse)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-counterpoint">▶ Contrepoint en mouvement contraire</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">6. Réharmonisation &amp; Liste de contrôle</span>
        <span class="k-ratio-chip">Mêmes notes, autre couleur</span>
      </div>
      <h4>Changer toute l’émotion sans modifier une seule note de la mélodie</h4>
      <p>
        La <strong>réharmonisation</strong> conserve la mélodie intacte tout en remplaçant les accords sous-jacents (par ex. <code>Fmaj7 – Fm6 – Am9</code> au lieu d’un simple <code>Do – Sol – Do</code>).
      </p>
      <div class="k-btn-row" style="margin-top:0.45rem;margin-bottom:0.65rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-plain">▶ Mélodie sur accords simples (I–V–I)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-cinema">▶ Même mélodie réharmonisée façon cinéma</button>
      </div>
      <div class="k-meta-box">
        <div>✅ <strong>5 questions clés pour vos arrangements :</strong></div>
        <div>1. <strong>Qui a la parole ?</strong> Un seul élément principal à la fois au premier plan.</div>
        <div>2. <strong>Où sont les respirations ?</strong> Placez les réponses dans les pauses du chant.</div>
        <div>3. <strong>Le grave est-il aéré ?</strong> Pas de tierces serrées sous <code>Do3 (C3)</code>.</div>
        <div>4. <strong>Couplet et refrain contrastent-ils vraiment ?</strong> Jouez sur l’étendue des octaves et la densité.</div>
        <div>5. <strong>Le test du bouton Mute :</strong> Si couper une piste ne retire rien au morceau, donnez-lui un vrai rôle ou supprimez-la !</div>
      </div>
      <div class="k-btn-row" style="margin-top:0.55rem;">
        <button type="button" class="btn-tool" data-jump-ref="ensembles">🎻 Vers Orchestres &amp; Groupes →</button>
        <button type="button" class="btn-tool" data-jump-ref="cadences">🎹 Vers Cadences &amp; Harmonie →</button>
        <button type="button" class="btn-tool" data-jump-ref="physics">🌊 Vers Physique &amp; Harmoniques →</button>
      </div>
    </article>
  `;
}