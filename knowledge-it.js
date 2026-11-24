/**
 * Lauscher • Base di conoscenze, guide interattive e articoli in italiano ("it")
 * Teoria musicale, acustica e organologia redatte in italiano idiomatico.
 */

const INTERVAL_ENCYCLOPEDIA_IT = [
  {
    key: "P1",
    symbol: "P1",
    name: "Unisono giusto",
    semitones: 0,
    ratio: "1 : 1",
    ratioExplain: "1 : 1 significa che le due note vibrano esattamente alla stessa velocità. Mentre la nota 1 completa un ciclo, la nota 2 ne completa un altro: è esattamente la stessa altezza.",
    category: "pure",
    mood: "Fusione totale, riposo, identità",
    physics: "I due suoni condividono esattamente la stessa frequenza (ad es. 261,6 Hz e 261,6 Hz). Le loro onde sonore si sovrappongono in un unisono perfetto.",
    songsAsc: "«One Note Samba» (melodia della strofa su una sola nota), inizio di «Thank You for the Music» (ABBA, prime due sillabe)",
    songsDesc: "Qualsiasi nota ripetuta in un motivo ritmico (ad es. l’intro di «Poker Face» di Lady Gaga)"
  },
  {
    key: "m2",
    symbol: "m2",
    name: "Seconda minore",
    semitones: 1,
    ratio: "16 : 15",
    ratioExplain: "16 : 15 significa che la nota acuta vibra appena un po’ più veloce di quella grave. Le creste delle due onde coincidono solo ogni 16 cicli (o 15 di quella grave), generando evidenti battimenti tra le due.",
    category: "tension",
    mood: "Furtiva, tesa, misteriosa, incalzante (sensibile!)",
    physics: "Le onde impiegano 16 cicli per risincronizzarsi. Poiché le due altezze sono molto vicine nell’orecchio interno, producono una marcata asprezza acustica.",
    songsAsc: "Tema di «Lo squalo» (Jaws), «La Pantera Rosa» (passo cromatico), «Per Elisa» (Mi–Re♯–Mi)",
    songsDesc: "«Per Elisa» (Beethoven, prime due note Mi → Re♯), «Joy to the World» (primo passo discendente)"
  },
  {
    key: "M2",
    symbol: "M2",
    name: "Seconda maggiore",
    semitones: 2,
    ratio: "9 : 8",
    ratioExplain: "9 : 8 significa che 8 vibrazioni della nota grave coincidono con 9 della nota acuta. Abbastanza vicine da restare legate, ma abbastanza distanti da tracciare un chiaro passo melodico.",
    category: "major",
    mood: "Passo naturale, narrativo, aperto, inizio di melodia",
    physics: "Il rapporto 9:8 nasce naturalmente sovrapponendo due quinte giuste e scendendo di un’ottava. Suona come un primo passo fuori di casa.",
    songsAsc: "«Fra Martino» (Do → Re), «Tanti auguri a te» (Happy Birthday), «Astro del ciel» (Silent Night)",
    songsDesc: "«Yesterday» (The Beatles, «Yes-ter-day»), «Mary Had a Little Lamb»"
  },
  {
    key: "m3",
    symbol: "m3",
    name: "Terza minore",
    semitones: 3,
    ratio: "6 : 5",
    ratioExplain: "6 : 5 significa che mentre la nota grave vibra 5 volte, quella acuta vibra 6 volte. Un rapporto compatto e stabile che suona caldo, morbido e profondamente espressivo.",
    category: "minor",
    mood: "Intima, calda, malinconica, raccolta ed espressiva",
    physics: "Con 6:5 il rapporto resta molto morbido (consonante), ma più stretto rispetto alla terza maggiore: è il cuore emotivo di ogni accordo minore.",
    songsAsc: "«Seven Nation Army» (The White Stripes, primo salto del riff), «Greensleeves», «Smoke on the Water» (primo passo)",
    songsDesc: "«Hey Jude» (The Beatles, «Hey Jude»), il canto del cuculo nel bosco, «So Long, Farewell»"
  },
  {
    key: "M3",
    symbol: "M3",
    name: "Terza maggiore",
    semitones: 4,
    ratio: "5 : 4",
    ratioExplain: "5 : 4 significa che 5 cicli della nota acuta rientrano perfettamente in 4 cicli della fondamentale. Poiché 5 e 4 sono numeri interi piccoli, i due suoni si fondono in un colore maggiore radioso.",
    category: "major",
    mood: "Luminosa, cordiale, schietta, sicura (il cuore della triade maggiore)",
    physics: "Il rapporto 5:4 compare naturalmente molto presto nella serie degli armonici (5° armonico) di qualsiasi voce o corda pizzicata.",
    songsAsc: "«When the Saints Go Marching In», «Morning Has Broken» (Cat Stevens), «Kumbaya»",
    songsDesc: "«Summertime» (Gershwin), «Swing Low, Sweet Chariot», il motivo iniziale della 5ª sinfonia di Beethoven"
  },
  {
    key: "P4",
    symbol: "P4",
    name: "Quarta giusta",
    semitones: 5,
    ratio: "4 : 3",
    ratioExplain: "4 : 3 significa che mentre la nota grave vibra 3 volte, quella acuta vibra 4 volte. Ogni 3 onde le due creste tornano ad allinearsi perfettamente!",
    category: "pure",
    mood: "Richiamo, solenne, fanfara, grande spazio aperto",
    physics: "Rivolto della quinta giusta dentro l’ottava, la quarta ha un rapporto nitido di 4:3. Da sola è molto stabile; sopra un basso, spesso chiede di scendere alla terza.",
    songsAsc: "«La Marsigliese» (anacrusi «Al-lons»), «Marcia nuziale» (Wagner), tema di «Harry Potter» (Hedwig)",
    songsDesc: "«Eine kleine Nachtmusik» (Mozart, secondo intervallo), «Adeste Fideles»"
  },
  {
    key: "TT",
    symbol: "TT",
    name: "Tritono (4ª aum. / 5ª dim.)",
    semitones: 6,
    ratio: "circa 45 : 32",
    ratioExplain: "45 : 32 significa che le due onde faticano a trovare un punto d’accordo: si riallineano solo dopo 32 e 45 cicli. L’orecchio percepisce questo incrocio continuo come una tensione elettrica!",
    category: "tension",
    mood: "Sospeso, misterioso, elettrizzante, irrisolto",
    physics: "Divide l’ottava esattamente a metà (6 semitoni). Senza un semplice multiplo comune, genera un attrito armonico inconfondibile: il motore interno dell’accordo di dominante (V7).",
    songsAsc: "Sigla de «I Simpson» («The Simp-sons»), «Maria» (West Side Story)",
    songsDesc: "«Black Sabbath» (riff iniziale), «YYZ» (Rush)"
  },
  {
    key: "P5",
    symbol: "P5",
    name: "Quinta giusta",
    semitones: 7,
    ratio: "3 : 2",
    ratioExplain: "3 : 2 significa che la nota acuta vibra esattamente una volta e mezza (1,5×) più veloce della fondamentale. Due onde gravi racchiudono tre onde acute senza oscillazioni: stabilità pura!",
    category: "pure",
    mood: "Eroica, potente, radicata, limpida (lo scheletro dei power chord)",
    physics: "Subito dopo l’ottava, 3:2 è il rapporto di frequenze più semplice della musica. Ecco perché persino una chitarra elettrica molto distorta che suona quinte resta perfettamente definita.",
    songsAsc: "Tema principale di «Star Wars», «Twinkle, Twinkle, Little Star» (Brilla, brilla, stellina), «Così parlò Zarathustra» (2001)",
    songsDesc: "Sigla de «I Flintstones» (The Flintstones), sigla de «Il Trono di Spade» (Game of Thrones, primo salto discendente)"
  },
  {
    key: "m6",
    symbol: "m6",
    name: "Sesta minore",
    semitones: 8,
    ratio: "8 : 5",
    ratioExplain: "8 : 5 significa che 5 cicli della fondamentale corrispondono a 8 cicli della nota acuta. Il gesto appare ampio, lirico e velato di una dolce nostalgia.",
    category: "minor",
    mood: "Nostalgica, drammatica, agrodolce, cinematografica",
    physics: "Rivolto della terza maggiore (8:5). Unisce una grande ampiezza melodica alla tenerezza del modo minore.",
    songsAsc: "«The Entertainer» (Scott Joplin, dopo l’anacrusi), «In My Life» (The Beatles, intro di chitarra), «Love Story» (Taylor Swift, ritornello)",
    songsDesc: "Tema del film «Love Story» (Where Do I Begin)"
  },
  {
    key: "M6",
    symbol: "M6",
    name: "Sesta maggiore",
    semitones: 9,
    ratio: "5 : 3",
    ratioExplain: "5 : 3 significa che mentre la fondamentale vibra 3 volte, la nota acuta vibra 5 volte. Questi piccoli numeri interi donano a questo ampio salto una cantabilità calorosa del tutto speciale.",
    category: "major",
    mood: "Radiosa, generosa, pastorale, accogliente",
    physics: "Strettamente legata alla terza minore (il suo rivolto), la proporzione 5:3 suona fluida, lirica e molto naturale da cantare.",
    songsAsc: "«My Bonnie Lies Over the Ocean», «Jingle Bells» (strofa), jingle della NBC",
    songsDesc: "«The Music of the Night» (Il fantasma dell’Opera), «Man in the Mirror» (Michael Jackson, «I’m gonna make a change»)"
  },
  {
    key: "m7",
    symbol: "m7",
    name: "Settima minore",
    semitones: 10,
    ratio: "16 : 9",
    ratioExplain: "16 : 9 (o 7 : 4 nella serie naturale degli armonici) si ferma un passo prima del raddoppio dell’ottava (2:1). Quella lieve differenza regala al blues, al soul e al funk il loro fascino rilassato.",
    category: "tension",
    mood: "Blues, rilassata, soul, con una morbida attrazione verso il basso",
    physics: "Compare naturalmente come 7° armonico (7:4). Anziché suonare aspra, ammorbidisce la rigidità e spinge in avanti gli accordi di settima di dominante.",
    songsAsc: "«The Winner Takes It All» (ABBA), «Somewhere» (West Side Story, «There’s a place for us»), tema originale di «Star Trek»",
    songsDesc: "«Watermelon Man» (Herbie Hancock)"
  },
  {
    key: "M7",
    symbol: "M7",
    name: "Settima maggiore",
    semitones: 11,
    ratio: "15 : 8",
    ratioExplain: "15 : 8 è a un solo semitono da 16 : 8 (l’ottava 2:1!). Poiché i due suoni si sfiorano senza fondersi nell’ottava, l’intervallo scintilla di una tensione raffinata.",
    category: "tension",
    mood: "Sognante e vellutata (in un accordo Maj7) oppure pungente e tesa (isolata)",
    physics: "Un semitono sotto l’ottava (15:8). Suonata nuda contro il basso, sfrega con vivacità; ma avvolta in una triade maggiore (Cmaj7) diventa pura dolcezza jazzistica.",
    songsAsc: "«Take On Me» (a-ha, inizio del ritornello), «Don’t Know Why» (Norah Jones), tema di «Superman» (bridge)",
    songsDesc: "«I Love You» (Cole Porter)"
  },
  {
    key: "P8",
    symbol: "P8",
    name: "Ottava giusta",
    semitones: 12,
    ratio: "2 : 1",
    ratioExplain: "2 : 1 significa che la nota acuta vibra esattamente il doppio più veloce della grave (metà lunghezza d’onda). Ogni onda lunga racchiude nettamente due onde corte: si fondono quasi in un unico suono!",
    category: "pure",
    mood: "Spazio, chiarezza, pienezza: la stessa nota al piano superiore",
    physics: "Raddoppio esatto della frequenza (2:1). Quando uomini e donne, oppure adulti e bambini, cantano la «stessa» melodia, la cantano spontaneamente all’ottava.",
    songsAsc: "«Somewhere Over the Rainbow» (Il mago di Oz), «Singin’ in the Rain»",
    songsDesc: "«Willow Weep for Me»"
  },
  {
    key: "m9",
    symbol: "m9",
    name: "Nona minore",
    semitones: 13,
    ratio: "32 : 15",
    ratioExplain: "32 : 15 significa che la nota acuta vibra poco più del doppio rispetto alla fondamentale (ottava + seconda minore). Questo rapporto teso crea un morso armonico intenso e ardente.",
    category: "tension",
    mood: "Esotica, drammatica, ad alta tensione (flamenco e jazz alterato)",
    physics: "Un’ottava più un semitono. La distanza di ottava addolcisce leggermente l’asprezza ravvicinata della seconda minore, ma ne conserva intatto il carattere incisivo.",
    songsAsc: "Accordi di dominante alterati nel jazz (V7♭9) e passaggi di chitarra flamenca",
    songsDesc: "Accenti drammatici nelle colonne sonore"
  },
  {
    key: "M9",
    symbol: "M9",
    name: "Nona maggiore",
    semitones: 14,
    ratio: "9 : 4",
    ratioExplain: "9 : 4 significa che mentre la fondamentale vibra 4 volte, la nota acuta compie 9 cicli (più del doppio). Questa grande distanza dona un colore arioso, luminoso e moderno.",
    category: "major",
    mood: "Ariosa, moderna, fluttuante e setosa (pop e neo-soul)",
    physics: "Un’ottava più una seconda maggiore (oppure due quinte sovrapposte: Do → Sol → Re). Conferisce un’ampiezza scintillante agli accordi add9 e maj9.",
    songsAsc: "«Every Breath You Take» (The Police: il celebre arpeggio di chitarra sale dritto fino alla 9ª!)",
    songsDesc: "Voicing pianistici pop e R&B contemporanei"
  }
];

const CADENCE_ENCYCLOPEDIA_IT = [
  {
    id: "authentic",
    category: "classic",
    name: "La cadenza autentica classica",
    formula: "I – IV – V – I",
    tag: "Base & casa",
    tagClass: "tag-sage",
    bars: ["I", "IV", "V", "I"],
    whyItWorks: "Racconta una storia completa in quattro battute: **I (tonica)** stabilisce casa. **IV (sottodominante)** apre la porta ed esce a esplorare. **V (dominante)** crea la massima tensione grazie alla sua sensibile, e **I** riporta tutto alla quiete.",
    songs: [
      "«Twist and Shout» – The Beatles (I – IV – V)",
      "«La Bamba» – Ritchie Valens",
      "«Three Little Birds» – Bob Marley",
      "Innumerevoli canti popolari e standard intramontabili"
    ]
  },
  {
    id: "plagal-amen",
    category: "classic",
    name: "La cadenza plagale («Amen»)",
    formula: "I – IV – I",
    tag: "Dolce & solenne",
    tagClass: "tag-sage",
    bars: ["I", "IV", "I"],
    whyItWorks: "A differenza della dominante tesa (**V**), l’accordo **IV** non contiene una sensibile che reclami bruscamente la tonica. Così **IV → I** non colpisce: si posa con calore e morbidezza, proprio come il celebre «Amen» degli inni.",
    songs: [
      "«Hey Jude» – The Beatles (lunga coda «Na-na-na» su ♭VII–IV–I)",
      "«Let It Be» – The Beatles (interludio F–C)",
      "Finali gospel e corali tradizionali («Amen»)"
    ]
  },
  {
    id: "half-cadence",
    category: "classic",
    name: "La semicadenza (domanda aperta)",
    formula: "I – IV – ii – V",
    tag: "Tensione sospesa",
    tagClass: "tag-peach",
    bars: ["I", "IV", "ii", "V"],
    whyItWorks: "Fermarsi a metà frase sulla **dominante (V)** funziona come i due punti nella musica: «attenzione, ecco cosa arriva adesso!». In una strofa o in un pre-ritornello, questa sospensione rende l’ingresso del ritornello su **I** ancora più potente.",
    songs: [
      "Temi di sonate classiche (Mozart, Haydn)",
      "Quasi tutti i pre-ritornelli pop subito prima che esploda il ritornello",
      "«Yesterday» – The Beatles (finale di frase sospeso sulla dominante)"
    ]
  },
  {
    id: "pachelbel",
    category: "classic",
    name: "La progressione di Pachelbel",
    formula: "I – V – vi – iii – IV – I – IV – V",
    tag: "Dal barocco al pop",
    tagClass: "tag-lilac",
    bars: ["I", "V", "vi", "iii", "IV", "I", "IV", "V"],
    stepMs: 1500,
    chordDur: 1.38,
    whyItWorks: "Un colpo di genio al basso del 1680: il basso scende e salta con totale naturalezza (**Do → Sol → La → Mi → Fa → Do → Fa → Sol**). Ogni anello s’incastra senza sforzo, creando un ciclo di otto battute calmo e al tempo stesso trascinante.",
    songs: [
      "«Canone in Re» – Johann Pachelbel",
      "«Basket Case» – Green Day",
      "«Memories» – Maroon 5",
      "«Go West» – Village People / Pet Shop Boys"
    ]
  },
  {
    id: "pop4",
    category: "pop",
    name: "I «4 accordi magici» del pop",
    formula: "I – V – vi – IV",
    tag: "Classico del pop",
    tagClass: "tag-peach",
    bars: ["I", "V", "vi", "IV"],
    whyItWorks: "Probabilmente la progressione di maggior successo degli ultimi 50 anni! Il suo segreto: proprio al centro nasconde una **cadenza d’inganno (V → vi)** che stringe il cuore all’istante. E chiudere su **IV** lascia l’accordo aperto per ripetere il ritornello all’infinito.",
    songs: [
      "«Let It Be» – The Beatles (strofa)",
      "«Someone Like You» – Adele (ritornello)",
      "«With or Without You» – U2",
      "«No Woman, No Cry» – Bob Marley",
      "«Don’t Stop Believin’» – Journey"
    ]
  },
  {
    id: "doowop",
    category: "pop",
    name: "La progressione anni ’50 / doo-wop",
    formula: "I – vi – IV – V",
    tag: "Soul & rétro",
    tagClass: "tag-lilac",
    bars: ["I", "vi", "IV", "V"],
    whyItWorks: "Dalla tonica luminosa (**I**), l’armonia scivola con tenerezza verso la sua **relativa minore (vi)**, con cui condivide ben due note in comune! Da lì, **IV** e **V** creano uno slancio nostalgico irresistibile verso la prima battuta.",
    songs: [
      "«Stand By Me» – Ben E. King",
      "«Every Breath You Take» – The Police",
      "«Unchained Melody» – The Righteous Brothers",
      "«Happiness Is a Warm Gun» – The Beatles (coda)"
    ]
  },
  {
    id: "sad-pop",
    category: "pop",
    name: "Il loop pop emotivo in minore",
    formula: "vi – IV – I – V",
    tag: "Malinconia & slancio",
    tagClass: "tag-lilac",
    bars: ["vi", "IV", "I", "V"],
    whyItWorks: "Il trucco geniale: sono esattamente gli stessi quattro accordi di «I – V – vi – IV», solo spostati per iniziare dalla **relativa minore (vi)**. Partire in minore trasforma l’atmosfera solare in un’intensità toccante, conservando tutta la spinta di **I** e **V**.",
    songs: [
      "«Zombie» – The Cranberries (Em – C – G – D)",
      "«Save Tonight» – Eagle-Eye Cherry",
      "«Numb» – Linkin Park",
      "«Hello» – Adele (strofa)"
    ]
  },
  {
    id: "minor-plagal",
    category: "pop",
    name: "La sottodominante minore (agrodolce)",
    formula: "I – IV – iv – I",
    tag: "Cinema & nostalgia",
    tagClass: "tag-peach",
    bars: ["I", "IV", "iv", "I"],
    whyItWorks: "Uno dei gesti più toccanti dell’armonia: avanziamo con slancio verso **IV (Fa maggiore)**, prima che quello stesso accordo si sciolga in **iv (Fa minore)**, un *prestito modale* da Do minore. All’interno, il **La** scende di un semitono a **La♭** e poi scivola verso **Sol** su I.",
    songs: [
      "«In My Life» – The Beatles",
      "«Don’t Look Back in Anger» – Oasis (pre-ritornello F → Fm → C)",
      "«Wake Me Up When September Ends» – Green Day",
      "Ballate classiche Disney e finali dei film dell’età d’oro"
    ]
  },
  {
    id: "creep-chromatic",
    category: "pop",
    name: "La linea cromatica ascendente («Creep»)",
    formula: "I – III7 – IV – iv",
    tag: "Classico struggente",
    tagClass: "tag-lilac",
    bars: ["I", "III7", "IV", "iv"],
    whyItWorks: "Ascolta la voce interna nascosta: **C (I)** tiene il **Sol**; l’inaspettato accordo maggiore **E7 (III7)** lo solleva a **Sol♯**; **F (IV)** sale a **La**; e **Fm (iv)** ridiscende con nostalgia a **La♭**. Questo filo cromatico (**Sol → Sol♯ → La → La♭**) tiene insieme l’intera progressione.",
    songs: [
      "«Creep» – Radiohead",
      "«The Air That I Breathe» – The Hollies",
      "«Get Free» – Lana Del Rey"
    ]
  },
  {
    id: "royal-road",
    category: "pop",
    name: "La «Via Regia» (Ōdō Shinkō)",
    formula: "IV – V – iii – vi",
    tag: "Inno J-pop & anime",
    tagClass: "tag-sage",
    bars: ["IV", "V", "iii", "vi"],
    whyItWorks: "Celebre in Giappone come la progressione regale: parte già lanciata su **IV**, attraversa **V** a tutta velocità e poi schiva **I** per scivolare lungo **iii** fino a **vi**. Evitare la risoluzione completa crea quello slancio cinematografico senza fine.",
    songs: [
      "«Stay With Me» – Miki Matsubara (City Pop)",
      "«Never Gonna Give You Up» – Rick Astley (ritornello)",
      "Innumerevoli sigle anime e temi Nintendo (Mario Kart / Zelda)"
    ]
  },
  {
    id: "sus4-resolve",
    category: "pop",
    name: "La risoluzione di dominante sospesa (sus4)",
    formula: "I – IV – Vsus4 – V – I",
    tag: "Sospensione elegante",
    tagClass: "tag-sage",
    bars: ["I", "IV", "Vsus4", "V", "I"],
    whyItWorks: "In **Vsus4**, la terza maggiore della dominante (il **Si** nell’accordo di Sol) viene trattenuta e sostituita dalla quarta (**Do**). Questa sospensione luminosa scivola poi di un semitono (**Do → Si**) nel **V** puro prima di atterrare su **I**.",
    songs: [
      "«Crazy Little Thing Called Love» – Queen",
      "«Pinball Wizard» – The Who",
      "«The Scientist» / inni al pianoforte dei Coldplay"
    ]
  },
  {
    id: "deceptive",
    category: "epic",
    name: "La cadenza d’inganno (evitata)",
    formula: "I – IV – V – vi",
    tag: "Colpo di scena",
    tagClass: "tag-lilac",
    bars: ["I", "IV", "V", "vi"],
    whyItWorks: "Dopo **I – IV – V**, il tuo cervello si aspetta con certezza un **I** maggiore trionfale. La sensibile sale davvero al Do, ma sotto il basso cade sul **La** invece che sul Do (formando **La minore**). Brivido di sorpresa garantito!",
    songs: [
      "«Hallelujah» – Leonard Cohen (su «the minor fall, the major lift…»)",
      "«Livin’ on a Prayer» – Bon Jovi",
      "Grandi climax di colonne sonore (Hans Zimmer, John Williams)"
    ]
  },
  {
    id: "mario-cadence",
    category: "epic",
    name: "La cadenza «Mario» (fanfara di vittoria)",
    formula: "I – bVI – bVII – I",
    tag: "Fanfara da videogioco",
    tagClass: "tag-peach",
    bars: ["I", "bVI", "bVII", "I"],
    whyItWorks: "Due accordi maggiori presi direttamente dal minore parallelo, **♭VI (La♭ maggiore)** e **♭VII (Si♭ maggiore)**, salgono di due toni interi (**La♭ → Si♭ → Do**) scatenando subito una sensazione di avventura e di livello completato.",
    songs: [
      "«Super Mario Bros.» – Fanfara di fine livello (Nintendo)",
      "«With a Little Help from My Friends» – The Beatles / Joe Cocker (finale)",
      "«P.S. I Love You» – The Beatles e grandiosi finali rock"
    ]
  },
  {
    id: "mixolydian-rock",
    category: "epic",
    name: "La cadenza rock da stadio (misolidia)",
    formula: "I – bVII – IV – I",
    tag: "Rock & grinta",
    tagClass: "tag-sage",
    bars: ["I", "bVII", "IV", "I"],
    whyItWorks: "Niente sensibile accademica: sostituire V con **♭VII (Si♭ maggiore in Do)** dona alla tonica un incedere rock misolidio, terreno e ribelle. Si scende di un tono intero da **I** a **♭VII** per poi rotolare con forza attraverso **IV** fino a **I**.",
    songs: [
      "«Sweet Child o’ Mine» – Guns N’ Roses",
      "«Sympathy for the Devil» – The Rolling Stones",
      "«Hey Jude» – The Beatles (vamp del ritornello)",
      "«Royals» – Lorde"
    ]
  },
  {
    id: "andalusian",
    category: "epic",
    name: "La cadenza andalusa",
    formula: "vi – V – IV – III7",
    tag: "Flamenco & dramma",
    tagClass: "tag-peach",
    bars: ["vi", "V", "IV", "III7"],
    whyItWorks: "Secoli di passione in quattro accordi: il basso scende implacabile grado dopo grado (**La → Sol → Fa → Mi**) prima di accendersi nella dominante maggiore **E7 (III7)**, che rilancia irresistibilmente il ciclo.",
    songs: [
      "«Hit the Road Jack» – Ray Charles",
      "«Smooth Criminal» – Michael Jackson",
      "«Sultans of Swing» – Dire Straits (fine strofa)",
      "«Stairway to Heaven» – Led Zeppelin (finale rock)"
    ]
  },
  {
    id: "jazz251",
    category: "jazz",
    name: "Il II–V–I (la cadenza regina del jazz)",
    formula: "ii – V7 – I – I",
    tag: "Jazz & soul",
    tagClass: "tag-sage",
    bars: ["ii", "V7", "I", "I"],
    whyItWorks: "Nel jazz e nel soul, la sopratonica minore (**ii**, Dm in Do) sostituisce IV. Il collegamento **ii → V7 → I** fa scendere il basso di una quinta giusta a ogni accordo (Re → Sol → Do): il movimento armonico più naturale della musica occidentale.",
    songs: [
      "«Sunday Morning» – Maroon 5 (quasi l’intero brano si basa su ii – V7 – I!)",
      "«Autumn Leaves» (Les Feuilles mortes) – standard jazz",
      "«Fly Me to the Moon» – Frank Sinatra"
    ]
  },
  {
    id: "jazz1625",
    category: "jazz",
    name: "La progressione swing (I–vi–ii–V)",
    formula: "Imaj7 – vi – ii – V7 – Imaj7",
    tag: "Swing & standard",
    tagClass: "tag-lilac",
    bars: ["Imaj7", "vi", "ii", "V7", "Imaj7"],
    whyItWorks: "La cugina adulta e jazzistica del doo-wop: aggiungere la settima maggiore a **Imaj7 (Cmaj7)** avvolge casa in un bagliore vellutato prima che **vi → ii → V7** ruoti con fluidità lungo il circolo delle quinte.",
    songs: [
      "«I Got Rhythm» – George Gershwin (Rhythm Changes)",
      "«Blue Moon» – Richard Rodgers",
      "«Heart and Soul» – Hoagy Carmichael"
    ]
  },
  {
    id: "tritonesub",
    category: "jazz",
    name: "La sostituzione di tritono",
    formula: "ii – bII7 – I – I",
    tag: "Arma segreta del jazz",
    tagClass: "tag-peach",
    bars: ["ii", "bII7", "I", "I"],
    whyItWorks: "Come può **D♭7 (♭II7)** sostituire **G7 (V7)** in Do maggiore? Perché entrambi condividono esattamente lo stesso **tritono** guida (**Fa e Si/Do♭**)! Intanto il basso scivola cromaticamente verso casa: **Re → Re♭ → Do**.",
    songs: [
      "«The Girl from Ipanema» – Antônio Carlos Jobim",
      "Cadenze caratteristiche del lo-fi hip-hop, del neo-soul e del gospel"
    ]
  },
  {
    id: "blues12",
    category: "jazz",
    name: "La progressione blues con dominanti",
    formula: "I7 – IV7 – I7 – V7 – IV7 – I7",
    tag: "Blues & rock and roll",
    tagClass: "tag-peach",
    bars: ["I7", "IV7", "I7", "V7", "IV7", "I7"],
    whyItWorks: "L’armonia classica riserva l’accordo di settima di dominante solo al V grado. Il blues getta quella regola dalla finestra e veste ogni grado principale (**I7, IV7, V7**) con l’attrito graffiante fra terza maggiore e settima minore: blues allo stato puro.",
    songs: [
      "«Johnny B. Goode» – Chuck Berry",
      "«Hound Dog» – Elvis Presley",
      "«Sweet Home Chicago» – Robert Johnson / The Blues Brothers"
    ]
  }
];

const SOLFEGE_STEPS_IT = [
  {
    syllable: "Do",
    degree: "1° grado (tonica)",
    semitones: 0,
    resolvePath: [0],
    resolveDesc: "Già a riposo a casa, sulla tonica (ripetere Do conferma la stabilità)",
    color: "sage",
    character: "Saldo, pacifico, arrivo a casa",
    desc: "Ogni altro grado trae la propria tensione unicamente dal suo rapporto con Do. Quando una melodia si posa sul Do, il tuo orecchio finalmente respira."
  },
  {
    syllable: "Re",
    degree: "2° grado (sopratonica)",
    semitones: 2,
    resolvePath: [2, 0],
    resolveDesc: "Risolve verso il basso, sulla tonica: Re → Do",
    color: "peach",
    character: "Fluttuante, curioso, in cammino",
    desc: "Re si accomoda tra Do e Mi. Terminare una frase su Re suona aperto e interrogativo: tende naturalmente verso Do."
  },
  {
    syllable: "Mi",
    degree: "3° grado (terza maggiore)",
    semitones: 4,
    resolvePath: [4, 2, 0],
    resolveDesc: "Scende con calma lungo la scala: Mi → Re → Do",
    color: "sage",
    character: "Caldo, luminoso, rassicurante, stabile",
    desc: "Mi definisce il carattere maggiore della tonalità. Per tornare a casa, scivola placidamente attraverso Re fino alla tonica Do."
  },
  {
    syllable: "Fa",
    degree: "4° grado (sottodominante)",
    semitones: 5,
    resolvePath: [5, 4, 2, 0],
    resolveDesc: "Risolve verso il basso, sulla tonica: Fa → Mi → Re → Do",
    color: "peach",
    character: "Grave, appoggiato, attratto verso il basso",
    desc: "Fa si trova a un solo semitono sopra Mi! Quel passo stretto crea una forte gravità discendente: Fa cade prima su Mi e poi scende per Re fino a Do."
  },
  {
    syllable: "Sol",
    degree: "5° grado (dominante)",
    semitones: 7,
    resolvePath: [7, 9, 11, 12],
    resolveDesc: "Sale verso la tonica superiore: Sol → La → Ti → Do",
    color: "sage",
    character: "Radioso, aperto, solido, secondo pilastro",
    desc: "A partire da Sol, la metà superiore dell’ottava si slancia verso il Do acuto (Sol → La → Ti → Do)."
  },
  {
    syllable: "La",
    degree: "6° grado (relativa minore)",
    semitones: 9,
    resolvePath: [9, 11, 12],
    resolveDesc: "Sale verso la tonica superiore: La → Ti → Do",
    color: "lilac",
    character: "Lirico, tenero, leggermente agrodolce",
    desc: "La è anche la fondamentale della scala relativa minore. Nell’ascolto tonale maggiore, La passa attraverso la sensibile Ti per raggiungere il Do acuto."
  },
  {
    syllable: "Ti",
    degree: "7° grado (sensibile)",
    semitones: 11,
    resolvePath: [11, 12],
    resolveDesc: "Risoluzione magnetica diretta della sensibile: Ti → Do",
    color: "peach",
    character: "Magnetico, urgente, teso verso l’alto",
    desc: "Ti si sporge a un minuscolo semitono sotto il Do acuto. Nessun’altra nota della scala invoca la propria risoluzione con tanto ardore quanto Ti → Do!"
  }
];

const KNOWLEDGE_ARTICLES_IT = [
  {
    id: "art-why-ear-training",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a6 6 0 1 1 11.4 2.5c-.6 1.3-1.4 1.9-1.9 3.1-.4 1-.5 2.4-1.7 3.2A2.5 2.5 0 0 1 10 15"/><path d="M10.5 8.5a2.2 2.2 0 0 1 4 1.2c0 .9-.6 1.4-1 2.2"/><path d="M19.5 6.5a8 8 0 0 1 0 7"/></svg>`,
    badgeClass: "badge-sage",
    title: "Perché allenare l’orecchio?",
    subtitle: "Cosa sblocca un orecchio allenato, a chi serve e come iniziare",
    tag: "Basi & motivazione",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Perché allenare l’orecchio?</span>
        <h2>Il ponte tra la tua immaginazione e il tuo strumento</h2>
        <p class="article-lead">
          Ti sarà sicuramente capitato: senti in testa una melodia orecchiabile o ascolti una canzone che ami, ma davanti al tuo strumento vai a tentoni cercando le note giuste. L’<strong>allenamento dell’orecchio (ear training)</strong> unisce questi due mondi, rendendo motivi, tensioni armoniche e groove subito chiari all’ascolto.
        </p>

        <h3>Quali abilità concrete ti regala?</h3>
        <ul class="article-steps-list">
          <li><strong>Ricavare melodie e brani più velocemente:</strong> Anziché cercare ogni nota a caso, riconosci subito i salti (<em>«È una quinta giusta ascendente!»</em>) e le progressioni familiari (<em>«È un I–V–vi–IV!»</em>).</li>
          <li><strong>Suonare con più libertà, improvvisare e comporre:</strong> Appena senti l’effetto di una sottodominante, di una sensibile o di una sincope, suonare in gruppo, scrivere brani e arrangiare nella DAW scorre con naturalezza.</li>
          <li><strong>Intonazione migliore e intesa d’insieme:</strong> Ti accorgi prima se la tua voce o la tua corda è intonata, come si fondono due timbri e dov’è il «pocket» della band.</li>
          <li><strong>Sentire interiormente spartiti e progressioni:</strong> Una sequenza di accordi smette di essere inchiostro su carta: la ascolti dentro di te ancora prima di posare le dita.</li>
        </ul>

        <h3>A chi è utile questo allenamento?</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Principianti &amp; curiosi (dagli 8 anni)</h5>
            <p>Non servono solfeggio accademico né lunghi studi. Impari ascoltando con curiosità e confrontando direttamente, sviluppando una vera intuizione musicale fin dal primo giorno.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Strumentisti &amp; cantanti</h5>
            <p>Ideale per conquistare autonomia senza spartito alla chitarra, al pianoforte o agli strumenti a fiato, e per affinare l’ascolto armonico nel coro o nella band.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>Compositori, beatmaker &amp; producer</h5>
            <p>Velocizza il lavoro in studio per individuare giri di accordi, linee di basso, groove di batteria ed equilibri di frequenza nel mix.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Musicisti avanzati &amp; esami</h5>
            <p>Avanza fino alle sostituzioni di tritono, ai 15 intervalli cromatici, ai metri asimmetrici, all’equalizzazione chirurgica e alle modulazioni nel solfeggio.</p>
          </div>
        </div>

        <h3>Il grande mito: serve l’«orecchio assoluto»?</h3>
        <p>
          <strong>Assolutamente no!</strong> L’orecchio assoluto (nominare una nota isolata senza alcun riferimento) è raro e raramente indispensabile nella pratica quotidiana. Quasi tutta la musica viva si fonda sull’<strong>orecchio relativo (funzionale)</strong>: il modo in cui altezze e accordi dialogano <em>tra loro</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Prova immediata: il tuo orecchio percepisce già il contesto</h4>
          <p>Che sia in Do maggiore o in Fa maggiore, appena si stabilisce una tonalità, avverti in modo naturale il richiamo della dominante (<strong>V</strong>) e il sollievo del ritorno alla tonica (<strong>I</strong>):</p>
          <button class="btn-tool" data-play-progression="I,IV,V7,I">▶ Ascolta la cadenza autentica (I – IV – V7 – I)</button>
        </div>

        <h3>Migliorare con costanza (la routine da 10 minuti)</h3>
        <ul class="article-steps-list">
          <li><strong>Breve e frequente vince sempre:</strong> Dai 5 ai 10 minuti concentrati quattro volte a settimana valgono molto più di una maratona di due ore la domenica.</li>
          <li><strong>Coinvolgi il corpo:</strong> Canticchia piano la nota obiettivo, batti il tempo col piede e usa sempre i pulsanti di <strong>confronto A/B</strong> dopo un errore.</li>
          <li><strong>Curiosità prima della pressione:</strong> Ogni errore insegna quanto una risposta esatta: è proprio il confronto diretto fianco a fianco a scolpire l’orecchio.</li>
        </ul>
      </div>
    `
  },
  {
    id: "art-talking-about-music",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9.5 10v3"/><path d="M12.5 8.5v6"/><path d="M15.5 10.5v2"/></svg>`,
    badgeClass: "badge-peach",
    title: "Come parlare di musica?",
    subtitle: "Condividere emozioni, immagini e impressioni con semplicità, senza gergo teorico",
    tag: "Ascolto & dialogo",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Percezione &amp; espressione</span>
        <h2>Parlare di musica senza note, senza accordi e senza gergo</h2>
        <p class="article-lead">
          Un brano ti commuove, ti mette all’erta o disegna un intero paesaggio interiore, ma appena ti chiedono <em>«Allora, che ne pensi?»</em>, esce solo un vago <em>«Non male»</em> o <em>«Non fa per me»</em>. Perché è così difficile mettere a parole l’ascolto, e come riuscirci con naturalezza?
        </p>

        <p>
          Molte persone si trattengono per paura di non conoscere termini tecnici o solfeggio. Eppure, tra amici, a lezione o alle prove, una bella conversazione non ha quasi mai bisogno del <strong>perché</strong> tecnico. Ciò che conta è il <strong>cosa</strong>: che cosa arriva alle tue orecchie? Che cosa si muove dentro di te? Come cambia il suono dall’inizio alla fine?
        </p>

        <div class="k-song-ref">
          <strong>Buono a sapersi:</strong> Anche grandi direttori d’orchestra, compositori di colonne sonore, fonici e direttori di coro usano ogni giorno <em>immagini sensoriali</em>. Dire <em>«L’inizio sembra una nebbia fitta e poi, all’improvviso, a metà si apre una finestra»</em> comunica spesso molto più di qualche termine tecnico asciutto.
        </div>

        <h3>1. La svolta d’oro: passare dal giudizio alla percezione</h3>
        <p>
          Verdetti secchi come <em>«noioso»</em>, <em>«strano»</em> o <em>«fantastico»</em> chiudono il discorso perché non spiegano nulla di ciò che hai sentito. Condividere una <strong>percezione</strong>, invece, apre il dialogo con 3 punti di riferimento semplici:
        </p>
        <ul class="article-steps-list">
          <li><strong>Dove, nel brano?</strong> Colloca il momento: <em>«Proprio all’inizio»</em>, <em>«Quando cresce a metà»</em>, <em>«Poco prima del finale»</em> o <em>«In quello stacco improvviso.»</em></li>
          <li><strong>Che cosa provo lì?</strong> Parla dal tuo vissuto: <em>«Per me è…»</em>, <em>«Ho l’impressione che…»</em>, <em>«Lì sento come un richiamo…»</em></li>
          <li><strong>Quale immagine quotidiana calza a pennello?</strong> Prendi in prestito parole dallo spazio, dalla luce, dal tatto o dal movimento: <em>«stretto»</em>, <em>«caldo»</em>, <em>«affannato»</em>, <em>«come lasciare finalmente uscire il respiro.»</em></li>
        </ul>

        <h3>2. Sei dimensioni quotidiane per descrivere l’ascolto</h3>
        <p>
          Non serve un dizionario accademico: quasi tutto ciò che provi ascoltando rientra in questi sei campi sensoriali che chiunque comprende:
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>A. Clima &amp; sfumature emotive</h5>
            <p>Fai un passo oltre «allegro / triste»: è <em>placido, nostalgico, fiero, giocoso, inquieto, fragile, solenne, ironico, radicato</em> o <em>agrodolce</em>? I contrasti funzionano a meraviglia: <em>«Luminoso fuori, ma stanco dentro.»</em></p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>B. Spazio, vicinanza &amp; densità</h5>
            <p>Il passaggio sembra stretto o ampio? Coppie utili: <em>fitto, pesante, carico, denso</em> contro <em>ampio, arioso, trasparente, sgombro</em>, oppure <em>sussurrato vicinissimo all’orecchio</em> contro <em>lontano, risonante in una grande cattedrale</em>.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>C. Colore, temperatura &amp; trama</h5>
            <p>Immagina di toccare o vedere il suono: è <em>caldo, dorato, vellutato, opaco, terroso, fumoso, morbido</em>, oppure <em>fresco, cristallino, argenteo, abbagliante, tagliente, granuloso, friabile, metallico</em>? Pensa anche al peso: <em>pesante come un sasso</em> contro <em>leggero come una piuma</em>.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>D. Movimento, slancio &amp; appoggio</h5>
            <p>Osserva come reagisce il tuo corpo: <em>spinto in avanti, saltellante, strascicato, esitante, cullato, circolare, senza fiato, ben piantato</em>. Chiediti: <em>Spinge avanti, culla dolcemente o congela il tempo?</em></p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>E. Curva, tensione &amp; respiro</h5>
            <p>La musica racconta una microstoria: <em>rincorsa, attesa, punto di svolta, liberazione improvvisa, ritirata, eco che si spegne, domanda lasciata nell’aria, ritorno alla calma</em>. Dire <em>«Qui trattengo il respiro»</em> lo capiscono tutti.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>F. Dialogo tra le voci</h5>
            <p>Anche senza nominare gli strumenti, descrivi i loro ruoli: <em>«Una voce si fa avanti per parlare mentre il resto tesse un tappeto morbido»</em>, <em>«come una palla che si passano»</em>, <em>«un blocco compatto»</em> oppure <em>«ognuno parla per conto suo.»</em></p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Prova sonora: ascolta contrasti senza teoria</h4>
          <p>Dimentica la teoria per dieci secondi e nota quale <strong>sensazione concreta</strong> emerge in ogni coppia:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-dense">▶ Fitto &amp; compatto</button>
            <button class="btn-tool" data-play-custom="talk-open">▶ Ampio &amp; arioso</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-warm">▶ Caldo &amp; vellutato</button>
            <button class="btn-tool" data-play-custom="talk-sharp">▶ Chiaro &amp; tagliente</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-drive">▶ Che spinge in avanti</button>
            <button class="btn-tool" data-play-custom="talk-float">▶ Fluttuante &amp; sospeso</button>
          </div>
        </div>

        <h3>3. Ciò che facilita il dialogo e ciò che lo blocca</h3>
        <p>
          Alcune abitudini frenano involontariamente il dialogo musicale o creano malintesi, soprattutto tra ascoltatori con riferimenti diversi.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Bloccante &amp; vago</h5>
            <p><strong>Etichette vuote:</strong> «Bello / brutto / scadente / professionale / antimusicale.» Sono sentenze che costringono l’altro a indovinare che cosa hai davvero sentito.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Chiaro &amp; aperto</h5>
            <p><strong>Descrivere l’evoluzione:</strong> «L’inizio morbido mi ha subito conquistato, ma a metà ho avuto l’impressione che corresse un po’ troppo e diventasse aggressivo per le mie orecchie.»</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Falsi amici tecnici</h5>
            <p>Lanciare parole come «stonato», «atonale», «satura» o «troppa dinamica» quando si intende «sfrega molto» o «manca dolcezza»: i professionisti danno a quei termini un significato preciso.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Immagini quotidiane sincere</h5>
            <p>Resta semplice: «Non conosco il termine tecnico, ma in questo punto ho la sensazione che due spigoli si sfreghino prima di ammorbidirsi.»</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Giudizi su persone o generi</h5>
            <p>«Zero emozione» o «pura musica da ascensore / commerciale». Etichettare persone o generi spegne subito la curiosità.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Nominare trama &amp; contrasto</h5>
            <p>«Per me questo passaggio scorre così liscio e uniforme che finisco per desiderare una piccola sorpresa o un rilievo che catturi l’attenzione.»</p>
          </div>
        </div>

        <h3>4. Traduttore di idee: dal vago alla chiarezza viva</h3>
        <p>
          Spesso basta una sola immagine concreta per trasformare una sensazione sfumata in qualcosa di limpidissimo per tutti:
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Invece di: «Suona un po’ strano.»</strong>
              <span>Di’: «Qui per me qualcosa sfrega in modo instabile, quasi come una momentanea perdita di equilibrio.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Invece di: «È noiosissimo.»</strong>
              <span>Di’: «Resta a lungo esattamente nella stessa stanza emotiva; aspetto una scintilla o una svolta.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Invece di: «Fantastico!»</strong>
              <span>Di’: «Questa transizione si apre così all’improvviso che sembra di uscire finalmente all’aria aperta.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Invece di: «È troppo veloce.»</strong>
              <span>Di’: «Per me qui gli elementi si accalcano uno sull’altro: sembra affrettato anche se il tempo non cambia.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Invece di: «Troppo forte / fastidioso!»</strong>
              <span>Di’: «Nel passaggio potente tutto si accavalla e diventa molto penetrante per le mie orecchie.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Invece di: «Semplicemente triste.»</strong>
              <span>Di’: «Non è tragico: piuttosto calmo, raccolto e dolcemente consolatorio, come il tramonto.»</span>
            </div>
          </div>
        </div>

        <h3>5. Consigli pratici in base alla situazione</h3>
        <ul class="article-steps-list">
          <li><strong>Dopo un concerto o ascoltando tra amici:</strong> Sostituisci <em>«Ti è piaciuto?»</em> con domande calorose: <em>«Quale momento ti è rimasto impresso?»</em>, <em>«Che clima o scena di film abbineresti a questo brano?»</em> oppure <em>«Dove ti ha portato, e dove hai staccato?»</em></li>
          <li><strong>Nel coro, nella band o a lezione:</strong> Sottolinea prima ciò che funziona già (<em>«L’inizio ha un’intimità bellissima; nella ripresa vorrei ancora più slancio luminoso»</em>). E da allievo, osa dire <em>«Qui lo sento pesante / teso / affrettato»</em>: un bravo insegnante tradurrà subito quell’indizio sensoriale in uno strumento concreto.</li>
          <li><strong>Quando due persone sentono l’esatto opposto:</strong> Dove tu provi <em>pace</em>, un altro potrebbe percepire <em>solitudine</em>. I nostri ricordi e il nostro stato d’animo ascoltano sempre con noi: confrontare queste sensazioni sincere è ciò che rende appassionanti le conversazioni sulla musica.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Promemoria tascabile (4 domande semplici per ogni occasione)</h4>
          <p>Quando mancano le parole, scegli semplicemente <strong>uno</strong> di questi quattro spunti:</p>
          <ul class="article-steps-list">
            <li><strong>Colore &amp; clima:</strong> Caldo, morbido e scuro, oppure chiaro, fresco e tagliente?</li>
            <li><strong>Spazio:</strong> Stretto e vicinissimo, oppure ampio, aperto e arioso?</li>
            <li><strong>Movimento:</strong> Avanza, dondola, inciampa oppure resta sospeso immobile?</li>
            <li><strong>Momento chiave:</strong> Quale istante preciso fa cambiare atmosfera?</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "art-4chords",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
    badgeClass: "badge-peach",
    title: "Il fenomeno dei 4 accordi",
    subtitle: "Perché centinaia di successi mondiali poggiano sulla stessa progressione",
    tag: "Cadenze & pop",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Armonia nel pop</span>
        <h2>Perché 4 accordi sorreggono 1000 successi mondiali?</h2>
        <p class="article-lead">
          Dai Beatles (<em>Let It Be</em>) ai Toto (<em>Africa</em>), da Adele (<em>Someone Like You</em>) ai Green Day fino a Taylor Swift, una formula ricorre ovunque: <strong>I – V – vi – IV</strong>.
        </p>

        <div class="article-highlight-box">
          <h4>Ascolta subito la formula (in Do maggiore: C – G – Am – F):</h4>
          <p>Nota come cambia il colore emotivo battuta dopo battuta:</p>
          <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Ascolta i 4 accordi del pop (I – V – vi – IV)</button>
        </div>

        <h3>La psicologia nascosta in queste quattro battute</h3>
        <ul class="article-steps-list">
          <li>
            <strong>Battuta 1 – Tonica (I):</strong> Tutto inizia nitido, radicato ed evidente. Sappiamo all’istante dov’è casa.
          </li>
          <li>
            <strong>Battuta 2 – Dominante (V):</strong> Apre l’orizzonte e lancia un bello slancio in avanti.
          </li>
          <li>
            <strong>Battuta 3 – Relativa minore (vi):</strong> Ecco la svolta emotiva! Invece di rientrare docilmente a casa, l’armonia devia con una <em>cadenza d’inganno</em> e inietta un tocco agrodolce nel cuore del ritornello.
          </li>
          <li>
            <strong>Battuta 4 – Sottodominante (IV):</strong> Anziché chiudere la porta, la battuta 4 rimane aperta come un grande respiro, pronta a rilanciare la battuta 1 all’infinito!
          </li>
        </ul>

        <div class="article-highlight-box">
          <h4>Spostare il punto di partenza</h4>
          <p>
            Molti producer conservano esattamente questi quattro accordi ma fanno partire il loop dal 3° accordo (la relativa minore: <strong>vi – IV – I – V</strong>). All’istante il giro diventa più scuro, malinconico e intenso (come <em>Numb</em> dei Linkin Park o <em>Save Tonight</em>):
          </p>
          <button class="btn-tool" data-play-progression="vi,IV,I,V">▶ Confronta la partenza in minore (vi – IV – I – V)</button>
        </div>
      </div>
    `
  },
  {
    id: "art-gravity",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v7a6 6 0 0 0 12 0V4"/><line x1="4" y1="4" x2="8" y2="4"/><line x1="16" y1="4" x2="20" y2="4"/><line x1="6" y1="8" x2="8" y2="8"/><line x1="16" y1="8" x2="18" y2="8"/></svg>`,
    badgeClass: "badge-sage",
    title: "Magnetismo musicale: sensibile e tritono",
    subtitle: "Come due semitoni fanno venire al cervello la voglia di risolvere",
    tag: "Tensione & distensione",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Gravità armonica</span>
        <h2>Perché la musica ci attira verso la tonica come una calamita?</h2>
        <p class="article-lead">
          Quando ascoltiamo musica tonale non udiamo punti isolati: avvertiamo vere e proprie forze di attrazione. Due minuscoli meccanismi di un semitono spiegano quasi tutto.
        </p>

        <h3>1. La sensibile (7 → 1)</h3>
        <p>
          In una scala maggiore, un solo semitono separa il 7° grado (<strong>Si</strong> in Do maggiore) dalla tonica acuta (<strong>Do</strong>). Suona la scala di Do fino al Si e fermati lì: il tuo orecchio reclama letteralmente la nota finale:
        </p>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="scale-unresolved">▶ Scala ferma sul Si (irrisolta!)</button>
          <button class="btn-tool" data-play-custom="leading-tone">▶ Ascolta la risoluzione Si → Do</button>
        </div>

        <h3>2. La morsa del tritono (V7 → I)</h3>
        <p>
          Aggiungi la settima minore (<strong>Fa</strong>) all’accordo di dominante (Sol maggiore) per ottenere <strong>G7</strong>: all’improvviso due note si fronteggiano a distanza di <strong>tritono</strong>:
        </p>
        <ul class="article-steps-list">
          <li><strong>Si</strong> (7° grado) vuole salire di un semitono verso <strong>Do</strong>.</li>
          <li><strong>Fa</strong> (4° grado) vuole scendere di un semitono verso <strong>Mi</strong>.</li>
        </ul>
        <div class="article-highlight-box">
          <h4>Ascolta come le due note guida convergono verso l’interno:</h4>
          <p>Prima Fa e Si vibrano insieme in una tensione viva, poi si richiudono su Mi e Do (distensione pura):</p>
          <button class="btn-tool" data-play-custom="tritone-collapse">▶ Risoluzione del tritono (Fa+Si → Mi+Do)</button>
        </div>
      </div>
    `
  },
  {
    id: "art-minor-plagal",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "L’effetto brivido: sottodominante minore iv → I",
    subtitle: "Dai Beatles ai Radiohead e a Disney: quando il maggiore si fa agrodolce",
    tag: "Segreto di composizione",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Colore armonico</span>
        <h2>Il cambio d’accordo più commovente del pop?</h2>
        <p class="article-lead">
          Immagina un pomeriggio estivo di sole (tonica maggiore <strong>I</strong>), una nuvola chiara di passaggio (sottodominante <strong>IV</strong>) e, un attimo dopo, una luce dorata e nostalgica proprio prima che torni il sereno.
        </p>

        <h3>Che cosa succede in IV → iv → I?</h3>
        <p>
          In Do maggiore, la sottodominante è un <strong>Fa maggiore (Fa – La – Do)</strong>. Abbassa la sua terza <strong>La</strong> di un semitono fino a <strong>La♭</strong> e l’accordo diventa <strong>Fa minore (iv)</strong>. Quel <strong>La♭</strong>, preso in prestito dal modo di Do minore, scivola poi con totale naturalezza verso <strong>Sol</strong> sulla tonica (disegnando una setosa linea cromatica: <strong>La → La♭ → Sol</strong>).
        </p>

        <div class="article-highlight-box">
          <h4>Ascolta il confronto diretto:</h4>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="plagal-major">▶ Classico: C – F – C</button>
            <button class="btn-tool" data-play-custom="plagal-minor">▶ Tocco minore: C – F – Fm – C</button>
          </div>
        </div>

        <h3>Brani cult costruiti su questa svolta armonica</h3>
        <ul class="article-steps-list">
          <li><strong>The Beatles – «In My Life»</strong> (su «I’ll remember you») e <strong>«Blackbird»</strong></li>
          <li><strong>Radiohead – «Creep»</strong> (l’intero giro del brano: G – B – C – Cm)</li>
          <li><strong>Oasis – «Don’t Look Back in Anger»</strong> (alla fine del pre-ritornello)</li>
          <li><strong>Green Day – «Wake Me Up When September Ends»</strong></li>
          <li>Innumerevoli finali dell’età d’oro di <strong>Disney &amp; Pixar</strong></li>
        </ul>
      </div>
    `
  },
  {
    id: "art-physics-waves",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2.5-6 5.5-6 8 0s5.5 6 8 0 3.5-3 4-2"/></svg>`,
    badgeClass: "badge-sage",
    title: "Consonanza e dissonanza: la danza delle onde",
    subtitle: "Dai rapporti numerici semplici alle bande critiche dell’orecchio interno",
    tag: "Fisica & acustica",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Fisica &amp; psicoacustica</span>
        <h2>La dissonanza non è «sbagliata»: è il movimento in avanti!</h2>
        <p class="article-lead">
          Molti principianti credono che <strong>consonanza</strong> significhi «bello» e <strong>dissonanza</strong> «rotto». In realtà sono lo yin e lo yang del racconto musicale: la consonanza incarna il <em>riposo e l’approdo</em>; la dissonanza è <em>la spinta, la spezia e il desiderio</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Test lampo: la tensione ha bisogno di una risoluzione</h4>
          <p>Ascolta prima una consonanza statica e poi un attrito sospeso che si scioglie verso casa:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-progression="I,I,I">▶ Solo consonanza pura (statica)</button>
            <button class="btn-tool" data-play-progression="I,IV,Vsus4,V7,I">▶ Attrito → risoluzione</button>
          </div>
        </div>

        <h3>1. Non è tutto bianco o nero: lo spettro a 4 gradi</h3>
        <p>
          Pitagora lo misurò già su una corda tesa: più piccoli sono i numeri interi di un rapporto di frequenze, più morbidamente si fondono i due suoni. La teoria classifica gli intervalli in quattro sfumature:
        </p>

        <div class="spectrum-list">
          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>1. Consonanza perfetta (fusione totale)</span>
              <span>1:1 · 2:1 · 3:2</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill sage" style="width:96%"></div></div>
            <div class="spectrum-sub">Ottava (2:1), quinta giusta (3:2) &amp; quarta giusta (4:3): così pure e incastrate da sembrare un solo suono; fatte apposta per power chord, bordoni e cadenze finali.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="P8">▶ Ottava (2:1)</button>
              <button class="btn-tool" data-play-interval-harm="P5">▶ Quinta (3:2)</button>
              <button class="btn-tool" data-play-interval-harm="P4">▶ Quarta (4:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>2. Consonanza imperfetta (calda &amp; colorata)</span>
              <span>5:4 · 6:5 · 5:3</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill lilac" style="width:74%"></div></div>
            <div class="spectrum-sub">Terze e seste maggiori o minori: abbastanza distinte da irradiare un’emozione maggiore o minore. Curiosità: nel Medioevo le terze erano ancora classificate come dissonanze, finché il Rinascimento le trasformò nel cuore dell’armonia!</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M3">▶ 3ª magg. (5:4)</button>
              <button class="btn-tool" data-play-interval-harm="m3">▶ 3ª min. (6:5)</button>
              <button class="btn-tool" data-play-interval-harm="M6">▶ 6ª magg. (5:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>3. Dissonanza morbida (elasticità &amp; soul)</span>
              <span>9:8 · 16:9</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill peach" style="width:45%"></div></div>
            <div class="spectrum-sub">La seconda maggiore e la settima minore offrono uno sfregamento elastico e mobile: indispensabile nel blues, nel soul R&amp;B e negli accordi di settima del jazz.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M2">▶ 2ª magg. (9:8)</button>
              <button class="btn-tool" data-play-interval-harm="m7">▶ 7ª min. (16:9)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>4. Dissonanza marcata (alta tensione &amp; asprezza)</span>
              <span>16:15 · 15:8 · 45:32</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill red" style="width:20%"></div></div>
            <div class="spectrum-sub">La seconda minore, la settima maggiore e il tritono si scontrano in battimenti rapidi: come lo squalo di «Lo squalo» o una sensibile tesa verso la tonica.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="TT">▶ Tritono (45:32)</button>
              <button class="btn-tool" data-play-interval-harm="M7">▶ 7ª magg. (15:8)</button>
              <button class="btn-tool" data-play-interval-harm="m2">▶ 2ª min. (16:15)</button>
            </div>
          </div>
        </div>

        <h3>2. Che cosa succede biologicamente nel tuo orecchio</h3>
        <ul class="article-steps-list">
          <li><strong>Banda critica (coclea):</strong> Sulla membrana basilare dell’orecchio interno, i sensori di frequenza sono disposti in fila. Quando due suoni si avvicinano a meno di circa il 15–20% di differenza in Hz, stimolano contemporaneamente le stesse cellule ciliate generando una sensazione di «asprezza».</li>
          <li><strong>La trappola del registro grave (Lower Interval Limit):</strong> Nelle frequenze basse i valori in hertz sono vicinissimi! Tra <code>Do2</code> (65 Hz) e <code>Mi2</code> (82 Hz) ci sono solo 17 Hz: una terza maggiore di solito «morbida» affolla la stessa banda critica e suona fangosa. Portala nel registro medio (<code>Do4 + Mi4</code>, 67 Hz di scarto) e sboccia all’istante!</li>
          <li><strong>Armonici che sfregano (effetto Helmholtz):</strong> Ogni nota naturale porta con sé armonici più acuti. In <code>Do4 + Si4</code> (7ª maggiore), il 2° armonico di Do4 è <code>Do5</code>: appena un semitono sopra <code>Si4</code>!</li>
        </ul>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Stretto &amp; torbido (registro grave)</h5>
            <p>Due altezze si comprimono nella stessa banda critica dell’orecchio:</p>
            <button class="btn-tool" data-play-freqs="65.41,82.41" data-osc="triangle" data-dur="1.8">▶ 3ª maggiore grave (Do2+Mi2)</button>
            <button class="btn-tool" data-play-freqs="65.41,69.30" data-osc="triangle" data-dur="1.8">▶ 2ª minore grave (Do2+Re♭2)</button>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Aperto &amp; nitido (registro medio / distanziato)</h5>
            <p>Lo stesso intervallo diventa cristallino appena si sale o lo si apre:</p>
            <button class="btn-tool" data-play-freqs="261.63,329.63" data-osc="triangle" data-dur="1.8">▶ 3ª maggiore media (Do4+Mi4)</button>
            <button class="btn-tool" data-play-freqs="130.81,554.37" data-osc="triangle" data-dur="1.8">▶ Composto e distanziato (Do3+Re♭5)</button>
          </div>
        </div>

        <h3>3. La magia del contesto: trasformare l’attrito in splendore</h3>
        <p>
          Il fatto che un’altezza risulti aspra o sontuosa dipende tanto dal suo ambiente armonico quanto dalla fisica pura. Ascolta due note nude e poi esattamente lo stesso intervallo vestito con un accordo:
        </p>

        <div class="article-highlight-box">
          <h4>Esperimento: la settima maggiore Do + Si (15 : 8)</h4>
          <p>Nudo, <strong>Do4 + Si4</strong> sfrega con forza. Infila Mi4 e Sol4 in mezzo (formando <strong>Cmaj7</strong>) e il tuo orecchio percepisce un sostegno di armonici che trasforma l’attrito in una dorata morbidezza jazzistica.</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="isol-maj7">▶ Isolato: Do4 + Si4</button>
            <button class="btn-tool" data-play-custom="chord-maj7">▶ Nel contesto: Cmaj7 (Do–Mi–Sol–Si)</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-song-tricks",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    badgeClass: "badge-peach",
    title: "Le migliori canzoni di riferimento per gli intervalli",
    subtitle: "Da «Lo squalo» a Star Wars, «Fra Martino» e I Simpson",
    tag: "Metodo pratico",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Ancoraggi melodici</span>
        <h2>Riconoscere gli intervalli grazie a incipit famosi</h2>
        <p class="article-lead">
          Il trucco mentale più rapido per identificare un salto è associarlo alle prime due note di un tema indimenticabile. Ecco il tuo promemoria ascendente:
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Seconda minore (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m2") : "m2"})</strong>
              <span>Jaws (Lo squalo) / La Pantera Rosa</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m2">▶ Ascolta</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Seconda maggiore (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M2") : "M2"})</strong>
              <span>Fra Martino / Tanti auguri a te (Happy Birthday)</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M2">▶ Ascolta</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Terza minore (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m3") : "m3"})</strong>
              <span>Seven Nation Army / Greensleeves</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m3">▶ Ascolta</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Terza maggiore (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M3") : "M3"})</strong>
              <span>When the Saints / Morning Has Broken</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M3">▶ Ascolta</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Quarta giusta (P4)</strong>
              <span>La Marsigliese / Harry Potter / Marcia nuziale</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P4">▶ Ascolta</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tritono (TT)</strong>
              <span>I Simpson («The Simp-sons») / Maria</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="TT">▶ Ascolta</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Quinta giusta (P5)</strong>
              <span>Star Wars / Twinkle, Twinkle, Little Star</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P5">▶ Ascolta</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Sesta maggiore (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M6") : "M6"})</strong>
              <span>My Bonnie Lies Over the Ocean</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M6">▶ Ascolta</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Ottava giusta (P8)</strong>
              <span>Somewhere Over the Rainbow</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P8">▶ Ascolta</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-functional",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Orecchio relativo vs. orecchio assoluto",
    subtitle: "Perché sentire le funzioni armoniche vale più che dare un nome alle singole note",
    tag: "Metodo",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Filosofia d’ascolto</span>
        <h2>Perché le relazioni contano più delle frequenze assolute</h2>
        <p class="article-lead">
          Si pensa spesso che avere «orecchio musicale» significhi sentire una tazzina tintinnare ed esclamare «Fa#!» (<em>l’orecchio assoluto</em>). Nella musica viva, invece, l’emozione nasce dalla funzione armonica.
        </p>

        <h3>Una nota isolata non ha emozione</h3>
        <p>
          La stessa nota <strong>Mi</strong> suona luminosa, calda e distesa in <strong>Do maggiore</strong> (perché lì svolge il ruolo di terza maggiore rilassata, <em>Mi</em>). Suona esattamente lo stesso <strong>Mi</strong> nella tonalità di <strong>Fa maggiore</strong>: all’improvviso arde di una tensione verso l’alto (perché è diventato la sensibile, <em>Ti</em>!).
        </p>

        <div class="article-highlight-box">
          <h4>Esperimento chiave: lo stesso Mi4 in due ruoli</h4>
          <p>Ascolta esattamente la stessa nota target <strong>Mi4</strong> due volte: prima dopo un accordo di Do maggiore (riposo tranquillo) e poi dopo un accordo di Fa maggiore (attrazione urgente):</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="context-c">▶ Mi4 in Do maggiore (Mi rilassato)</button>
            <button class="btn-tool" data-play-custom="context-f">▶ Mi4 in Fa maggiore (sensibile Ti)</button>
          </div>
        </div>

        <p>
          Ecco perché Lauscher sviluppa <strong>l’ascolto funzionale (relativo)</strong>: non appena il tuo orecchio riconosce il <em>ruolo</em> di una nota o di un accordo dentro una tonalità, puoi trasferire subito quella sicurezza in tutte e 12 le tonalità!
        </p>
      </div>
    `
  },
  {
    id: "art-world-music-cultures",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Sistemi musicali del mondo: 12 note, microtonalità e cultura",
    subtitle: "Perché il pianoforte occidentale è solo un universo sonoro tra tanti",
    tag: "Musiche del mondo & acustica",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Culture, accordatura &amp; microtonalità</span>
        <h2>La griglia di 12 semitoni è un’invenzione, non una legge di natura</h2>
        <p class="article-lead">
          Se cresci con un pianoforte, una chitarra o il pop occidentale, i nostri 12 semitoni fissi per ottava sembrano ovvi. Eppure un giro del mondo sonoro rivela tutt’altro: alcune culture dividono l’ottava in 22 o 53 sfumature, piegano l’intonazione tra un tasto e l’altro del pianoforte, accordano intere orchestre con un battimento cercato apposta o costruiscono drammi interi senza la minima progressione d’accordi occidentale.
        </p>

        <h3>1. Il compromesso occidentale: perché il pianoforte è «leggermente scordato»</h3>
        <p>
          In acustica, gli intervalli più puri vibrano secondo rapporti di numeri interi semplici (<em>intonazione giusta</em>): una quinta pura vale <code>3:2</code> (~701,96 cent) e una terza maggiore pura <code>5:4</code> (386,31 cent). Ma se impili dodici quinte pure non arrivi esattamente sette ottave più in alto: resta una piccola eccedenza di circa <strong>23,5 cent</strong> (il <em>comma pitagorico</em>). Su una tastiera fissa, accordare alla perfezione una tonalità fa suonare dolorosamente stonate le tonalità lontane.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>La soluzione occidentale (~1700 → oggi)</h5>
            <p>Dopo i <em>buoni temperamenti</em> (come in Bach, dove ogni tonalità conservava il proprio colore), l’Occidente ha adottato il <strong>temperamento equabile a 12 note (12-TET)</strong>: ogni semitono misura esattamente <code>100 cent</code>. L’orecchio paga un piccolo pegno (ogni terza maggiore è circa <strong>+14 cent</strong> più alta e ogni quinta leggermente stretta di <strong>−2 cent</strong>), ma in cambio si può modulare liberamente in tutte e 12 le tonalità e sovrapporre una polifonia orchestrale complessa (architettura <em>verticale</em>).</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>La via di molte altre culture</h5>
            <p>Le tradizioni incentrate su una linea melodica magistrale (architettura <em>orizzontale</em>) sostenuta da una nota fissa (<em>bordone / drone</em>) non hanno bisogno di spostare accordi lungo tutto il circolo delle quinte. Per questo conservano armonici puri e cristallini, esplorano sfumature sottili tra i tasti del nostro pianoforte e costruiscono immensi universi modali (<em>Maqâmât</em>, <em>Râga</em>, <em>Dastgâh</em>).</p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Confronto sonoro: accordo puro vs. pianoforte temperato (12-TET)</h4>
          <p>Ascolta prima la triade maggiore acusticamente pura (<code>4:5:6</code>: quinta <code>3:2</code>, terza <code>5:4</code>) e subito dopo lo stesso accordo di Do maggiore nel temperamento equabile (12-TET). Nota il leggero tremolio della terza temperata!</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Accordo puro (4:5:6)</button>
            <button class="btn-tool" data-play-freqs="261.63,329.63,392.00" data-osc="triangle" data-dur="2.0">▶ Temperamento equabile 12-TET</button>
          </div>
        </div>

        <h3>2. Che cosa significa davvero «microtonalità»? (cent &amp; comma)</h3>
        <p>
          Per misurare le altezze oltre la tastiera occidentale, l’acustica divide ogni ottava in esattamente <strong>1200 cent</strong>. Ogni semitono del pianoforte equivale a <code>100 cent</code>, ma lo spazio intermedio è ricchissimo di sfumature:
        </p>

        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>Ciò che l’orecchio riesce ancora a distinguere</strong>
            Nel registro medio, un orecchio allenato percepisce differenze di appena <strong>3–6 cent</strong>, soprattutto su note tenute, grazie ai battimenti o ai cambi di colore.
          </div>
          <div class="physics-fact-item">
            <strong>Quarto di tono &amp; tre quarti di tono</strong>
            Un vero <strong>quarto di tono</strong> vale <code>50 cent</code>, mentre un intervallo neutro di <strong>tre quarti di tono</strong> misura <code>150 cent</code>: né maggiore gioioso né minore malinconico, ma sospeso nella propria luce.
          </div>
          <div class="physics-fact-item">
            <strong>Il comma (~22–24 cent)</strong>
            La teoria turca del makam divide il tono intero in <strong>9 comma di Holder</strong> (~22,6 cent ciascuno), formando una scala finissima di <strong>53 gradi per ottava</strong>!
          </div>
          <div class="physics-fact-item">
            <strong>La nota come movimento, non come punto</strong>
            In molte culture, un suono non è un tocco fisso su un tasto, ma una curva viva fatta di appoggiature, glissandi e oscillazioni attorno a un polo tonale.
          </div>
        </div>

        <h3>3. Mondi arabo, persiano e turco: maqâm, makam &amp; dastgâh</h3>
        <p>
          Dal Maghreb al Cairo, da Baghdad e Teheran fino a Istanbul, la musica colta non avanza per concatenazioni d’accordi, ma per percorsi melodici raffinati: i <strong>Maqâmât</strong> (arabi), i <strong>Makamlar</strong> (turchi) o i <strong>Dastgâh-hâ</strong> (persiani, con le loro alterazioni <em>Koron</em> e <em>Sori</em>). Invece di una semplice scala fissa di 7 note, il musicista combina piccole cellule di 3–5 note chiamate <strong>Jins</strong> (pl. <em>Ajnâs</em>). Ogni maqâm stabilisce al tempo stesso l’intonazione fine, l’itinerario melodico (<em>Sayr</em>: da dove parte la frase, dove respira, dove risolve) e un clima interiore.
        </p>
        <p>
          Il suo emblema sonoro più celebre è l’<strong>intervallo neutro</strong>, soprattutto la <em>terza neutra</em> intorno ai <strong>350 cent</strong> (proprio a metà strada tra la nostra terza minore di 300 cent e la nostra terza maggiore di 400 cent!). Assente dal pianoforte occidentale, questo colore caldo e luminoso è il cuore dell’intero repertorio dell’<em>oud</em> e del flauto <em>ney</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Laboratorio microtonale: tre terze a confronto (maqâm Rast &amp; Bayâtî)</h4>
          <p>Confronta sulla stessa fondamentale una terza maggiore occidentale (<code>400 ct</code>), una terza neutra araba (<code>350 ct</code>) e una terza minore (<code>300 ct</code>); poi ascolta un giro in <strong>maqâm Rast</strong> e l’inflessione tipica del <strong>maqâm Bayâtî</strong>:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-maqam-contrast">▶ Maggiore vs. neutra vs. minore</button>
            <button class="btn-tool" data-play-custom="culture-maqam-rast">▶ Maqâm Rast (350 &amp; 1050 ct)</button>
            <button class="btn-tool" data-play-custom="culture-maqam-bayati">▶ Maqâm Bayâtî (grado a 150 ct)</button>
          </div>
        </div>

        <h3>4. Asia meridionale (Pakistan &amp; India): râga, 22 shruti, tanpura &amp; tâla</h3>
        <p>
          Nella musica classica indostana, condivisa tra l’India settentrionale e il Pakistan (dal canto <em>khyal</em> e il <em>qawwali</em> mistico al sitar, al sarangi e al bansuri), l’intero edificio poggia su un tappeto sonoro continuo e ricco di armonici: il bordone della <strong>tanpura</strong> (spesso tonica <code>Sa</code> e quinta <code>Pa</code>). Poiché l’armonia non cambia mai centro tonale, non serve alcun temperamento di compromesso.
        </p>
        <ul class="article-steps-list">
          <li><strong>22 shruti (riferimenti microtonali):</strong> Anche se un <em>râga</em> seleziona 5, 6 o 7 gradi principali (<em>svara</em>), la loro intonazione viene scelta tra <strong>22 posizioni microtonali (shruti)</strong>. Il bassissimo <code>Ati-Komal Re</code> del râga Bhairav si avvicina alla tonica molto più di una seconda minore temperata, creando quella gravità solenne dell’alba.</li>
          <li><strong>L’arte tra le note (meend, andolan &amp; gamak):</strong> Nel sitar come nel canto, una nota dritta e priva di ornamento sembra nuda. La bellezza nasce dal <em>meend</em> (glissando elastico che collega due altezze), dall’<em>andolan</em> (ondulazione lenta attorno a un microtono) e dal <em>gamak</em> (impulsi ornamentali vigorosi). L’arco tra le note conta quanto le note stesse.</li>
          <li><strong>Râga e momento della giornata:</strong> Un râga possiede una personalità completa: profilo ascendente (<em>aroha</em>) e discendente (<em>avaroha</em>), nota perno (<em>vadi</em>) e ora preferita (l’alba per <em>Bhairav</em> contro la notte fonda per <em>Darbari Kanada</em>).</li>
          <li><strong>Tâla (tempo ciclico):</strong> Invece di battute lineari, le <em>tabla</em> ruotano in cicli chiusi di 16 battiti (<em>teental</em>), 10 battiti (<em>jhaptal</em>) o 7 battiti (<em>rupak</em>), che convergono ogni volta verso il primo battito magnetico, il <strong>sam</strong>.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Esempio d’ascolto: râga Bhairav su bordone di tanpura (Sa–Pa)</h4>
          <p>Fai attenzione alla seconda molto bassa (<code>Ati-Komal Re</code>) e alla distensione progressiva verso il riposo finale su <code>Sa</code>:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-raga-bhairav">▶ Râga Bhairav (tanpura + intonazione a 22 shruti)</button>
          </div>
        </div>

        <h3>5. Indonesia (Giava &amp; Bali): gamelan, sléndro, pélog &amp; l’onda ombak</h3>
        <p>
          Poche tradizioni scardinano i nostri riferimenti occidentali quanto le grandi orchestre di bronzo del <strong>gamelan</strong> giavanese e balinese. Qui non esiste un diapason universale <code>La = 440 Hz</code>: <strong>ogni ensemble gamelan ha la propria accordatura unica</strong>, custodita gelosamente, tanto che due ensemble diversi di solito non possono suonare insieme.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Sléndro: 5 passi quasi equidistanti</h5>
            <p>Divide l’ottava non in 12 semitoni, ma in <strong>5 intervalli ampi e simili</strong> di circa <code>240 cent</code>. In uno sléndro puro non esiste né la terza maggiore occidentale né la quinta o la quarta esatta, costringendo l’orecchio a lasciare andare i propri automatismi legati alle triadi.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Pélog &amp; ombak (l’«onda marina»)</h5>
            <p>Il <strong>pélog</strong> offre 7 gradi asimmetrici da cui si ricavano modi pentatonici ricchi di contrasto. A Bali, i metallofoni lavorano in coppia: uno leggermente più grave (<em>pengumbang</em>) e il suo gemello più acuto di circa <strong>5–8 Hz</strong> (<em>pengisep</em>). Percossi insieme, generano l’<strong>ombak</strong> («onda»): un battimento cangiante che respira, cercato come l’anima acustica dell’orchestra.</p>
          </div>
        </div>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-gamelan-slendro">▶ Scala sléndro (~240 ct equidistanti)</button>
          <button class="btn-tool" data-play-custom="culture-gamelan-ombak">▶ Scintillio ombak balinese (~7 Hz)</button>
        </div>

        <h3>6. Africa subsahariana &amp; Asia orientale: poliritmia, blue notes e silenzio</h3>
        <ul class="article-steps-list">
          <li><strong>Africa subsahariana: cicli intrecciati &amp; asimmetria:</strong> Mentre l’Europa esplora l’armonia verticale, l’Africa occidentale e centrale dispiega architetture ritmiche vertiginose. Più voci sovrappongono pulsazioni contrapposte (<strong>3 contro 4</strong> o <strong>3 contro 2</strong>: vera <em>poliritmia</em>), tenute insieme da una campana guida asimmetrica chiamata <strong>bell timeline</strong> (come il pattern standard in 12/8 <code>x . x . x x . x . x . x</code>). Nessuno brilla da solo: tutto nasce dall’incastro collettivo e dal dialogo di <em>botta e risposta (call and response)</em>.</li>
          <li><strong>Dall’Africa occidentale al blues, al jazz &amp; al soul (blue notes!):</strong> Quando i musicisti africani deportati in Nordamerica incontrarono chitarre, pianoforti e fiati occidentali, le loro terze, quinte e settime vocali piegate verso il basso non entravano nelle caselle fisse del 12-TET. Quell’incontro creativo ha dato vita alle celebri <strong>blue notes</strong> microtonali: il cuore espressivo del blues, del gospel, del jazz e del rock moderni.</li>
          <li><strong>Asia orientale: timbro, pressione delle dita &amp; l’arte del «Ma»:</strong> Le musiche colte cinese (la cetra <em>guqin</em>, con le sue cento tecniche di attacco e glissando) o giapponese (il flauto <em>shakuhachi</em>) si appoggiano spesso a strutture pentatoniche, investendo però un universo infinito nelle inflessioni microtonali, nella grana del soffio e nel concetto temporale di <strong>Ma (間)</strong>: il silenzio vibrante tra due suoni, eloquente quanto la nota stessa.</li>
        </ul>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-westafrica-poly">▶ Timeline di campana 12/8 + poliritmia 4 contro 3</button>
        </div>

        <h3>7. Quattro assi di confronto mondiale — e che cosa guadagna il tuo orecchio</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>1. Scala &amp; accordatura</strong>
              <span>Occidente: 12 passi fissi da 100 cent (12-TET). Mondo: sléndro a 5 note (~240 ct), 22 shruti, makam a 53 comma o poli cantati fluidi.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>2. Verticale vs. orizzontale</strong>
              <span>L’Occidente racconta tramite progressioni d’accordi. Il maqâm e il râga scolpiscono linee microtonali sottili sopra un centro stabile.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>3. Ideale sonoro</strong>
              <span>Fusione liscia contro battimenti oceanici (<em>ombak</em>), ricchezza ronzante del ponticello del sitar (<em>jawari</em>) o timbro soffiato del bambù.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>4. Percezione del tempo</strong>
              <span>Battute lineari in 3/4 o 4/4 contro cicli chiusi (<em>tâla</em>), timeline asimmetriche in 12/8 o il respiro del silenzio (<em>Ma</em>).</span>
            </div>
          </div>
        </div>

        <div class="k-song-ref">
          <strong>Che cosa guadagna il tuo ascolto:</strong> Ogni cultura coltiva un superpotere uditivo diverso. L’armonia occidentale affina l’ascolto delle funzioni degli accordi; il maqâm e il râga affinano il tuo <strong>radar microtonale</strong> e la tua intonazione nel canto o sugli strumenti senza tasti; il gamelan e la poliritmia africana ti liberano dal conteggio rigido e radicano il ritmo in tutto il corpo. In Lauscher, allenare gli intervalli significa ascoltare <em>relazioni vive invece di semplici etichette</em>: la chiave universale di tutte le musiche del mondo.
        </div>
      </div>
    `
  },
  {
    id: "art-mnemonics",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1.1 2h5.8c.1-.8.5-1.5 1.1-2A7 7 0 0 0 12 2z"/></svg>`,
    badgeClass: "badge-peach",
    title: "Regole mnemoniche in musica",
    subtitle: "Le formule classiche della teoria musicale per armature di chiave, chiavi, corde, intervalli e ritmo",
    tag: "Trucchi & memoria",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Trucchi &amp; memoria</span>
        <h2>Regole mnemoniche: ricordare la teoria musicale senza sforzo</h2>
        <p class="article-lead">
          Perché ricordiamo una filastrocca o un’immagine buffa in dieci secondi, mentre una lista astratta svanisce in cinque minuti? La nostra memoria adora <strong>il ritmo delle parole, le storie e gli appigli visivi</strong>. Ecco le formule mnemoniche essenziali del solfeggio in italiano.
        </p>

        <h3>1. Ordine dei diesis e dei bemolli e lettura immediata dell’armatura di chiave</h3>
        <p>
          Nel solfeggio italiano, l’ordine dei sette diesis e quello dei sette bemolli si imparano come due filastrocche ritmiche esattamente speculari l’una all’altra:
        </p>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Ordine dei 7 diesis (♯): Fa – Do – Sol – Re – La – Mi – Si</h5>
            <p>
              Si recita in due gruppi ritmici:<br>
              <strong>«Fa – Do – Sol / Re – La – Mi – Si»</strong><br>
              Tonalità maggiori in senso orario a partire dal Do (0): <strong>Sol</strong> (1♯), <strong>Re</strong> (2♯), <strong>La</strong> (3♯), <strong>Mi</strong> (4♯), <strong>Si</strong> (5♯), <strong>Fa♯</strong> (6♯).
            </p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Ordine dei 7 bemolli (♭): Si – Mi – La – Re – Sol – Do – Fa</h5>
            <p>
              È l’ordine dei diesis letto <strong>al contrario</strong>:<br>
              <strong>«Si – Mi – La – Re / Sol – Do – Fa»</strong><br>
              (Trucco: pensa a <em>«<strong>Fa</strong>, <strong>Do</strong>, <strong>Sol</strong>, <strong>Re</strong>…»</em> e riavvolgi semplicemente il nastro).<br>
              Tonalità maggiori: <strong>Fa</strong> (1♭), <strong>Si♭</strong> (2♭), <strong>Mi♭</strong> (3♭), <strong>La♭</strong> (4♭), <strong>Re♭</strong> (5♭), <strong>Sol♭</strong> (6♭).
            </p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Due trucchi infallibili per trovare la tonalità maggiore dall’armatura</h4>
          <ul class="article-steps-list">
            <li><strong>Con i diesis (♯):</strong> L’<em>ultimo diesis</em> è sempre la <strong>sensibile (7° grado)</strong>. Sali semplicemente di <strong>un semitono</strong> e ottieni la tonalità maggiore! (Esempio: ultimo diesis = <em>Do♯</em> → un semitono sopra = <strong>Re maggiore</strong>).</li>
            <li><strong>Con i bemolli (♭):</strong> Il <em>penultimo bemolle</em> dà direttamente il nome della tonalità maggiore! (Esempio: 3 bemolli = Si♭, <strong>Mi♭</strong>, La♭ → <strong>Mi♭ maggiore</strong>. Solo 1♭ = <strong>Fa maggiore</strong> va ricordato a parte).</li>
            <li><strong>Trovare la relativa minore:</strong> Scendi di <strong>una terza minore (3 semitoni)</strong> dalla tonica maggiore (Do maggiore → La minore, Sol maggiore → Mi minore).</li>
          </ul>
          <button class="btn-tool" data-jump-ref="circle-of-fifths">→ Apri il circolo delle quinte interattivo</button>
        </div>

        <h3>2. Punti di riferimento sul pentagramma: chiave di violino, chiave di basso e chiave di contralto</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Chiave di violino / Sol (2ª riga) • Spazi e righe</strong>
              <span>• Il ricciolo centrale circonda la 2ª riga: <strong>Sol4</strong>.<br>• I 4 spazi dal basso verso l’alto: <strong>Fa – La – Do – Mi</strong> (la parola inglese <strong>«FACE»</strong> in notazione internazionale F–A–C–E).<br>• Le 5 righe per terze ascendenti: <strong>Mi – Sol – Si – Re – Fa</strong>.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Chiave di basso / Fa (4ª riga) • Il trucco dello spostamento di terza</strong>
              <span>• I due punti circondano la 4ª riga: <strong>Fa3</strong>.<br>• <strong>Scorciatoia di lettura:</strong> Ogni nota scritta in chiave di basso si legge <strong>due nomi di nota (una terza) più in alto</strong> rispetto alla chiave di violino (es. la posizione di un <em>Do</em> in chiave di violino diventa un <em>Mi</em> in chiave di basso).</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Chiave di contralto / Do sulla 3ª riga • Il Do centrale nel mezzo</strong>
              <span>La punta centrale della chiave indica esattamente la 3ª riga (quella di mezzo) = il <strong>Do4 (Do centrale)</strong>.</span>
            </div>
          </div>
        </div>

        <h3>3. Corde a vuoto: chitarra, basso, violino, viola, violoncello &amp; ukulele</h3>
        <p>
          Dalla corda più grave (la più spessa) alla più acuta (la più sottile):
        </p>
        <ul class="article-steps-list">
          <li><strong>Chitarra (6 corde: Mi – La – Re – Sol – Si – Mi / E – A – D – G – B – E):</strong> <em>«<strong>M</strong>olti <strong>L</strong>eoni <strong>R</strong>uggiscono <strong>S</strong>empre <strong>S</strong>ulla <strong>M</strong>ontagna»</em> (o con le lettere internazionali: <em>«<strong>E</strong>ddie <strong>A</strong>te <strong>D</strong>ynamite, <strong>G</strong>ood <strong>B</strong>ye <strong>E</strong>ddie»</em>).</li>
          <li><strong>Basso &amp; contrabbasso (4 corde: Mi – La – Re – Sol):</strong> Le quattro corde gravi della chitarra, accordate per quarte giuste.</li>
          <li><strong>Violino (4 corde: Sol – Re – La – Mi):</strong> Quattro quinte giuste ascendenti (come l’inizio dell’ordine dei diesis dopo Fa e Do!).</li>
          <li><strong>Viola &amp; violoncello (4 corde: Do – Sol – Re – La):</strong> Quattro quinte giuste ascendenti a partire dal Do.</li>
          <li><strong>Ukulele (Sol – Do – Mi – La / G – C – E – A):</strong> Accordatura standard in Do con la 4ª corda (Sol) acuta.</li>
        </ul>

        <h3>4. Canzoni di riferimento per riconoscere gli intervalli a orecchio</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Seconda minore (1 st) &amp; seconda maggiore (2 st)</strong>
              <span>• <strong>2ª minore:</strong> <em>Jaws (Lo squalo)</em> ascendente / <em>Per Elisa (Für Elise)</em> discendente.<br>• <strong>2ª maggiore:</strong> <em>Fra Martino</em> (le prime due note: Do–Re) o <em>Tanti auguri a te</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="1">▶ 2ª min.</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Terza minore (3 st) &amp; terza maggiore (4 st)</strong>
              <span>• <strong>3ª minore:</strong> <em>Greensleeves</em> o la <em>Ninna nanna di Brahms</em> ascendente / <em>Il cuculo</em> o <em>Hey Jude</em> discendente.<br>• <strong>3ª maggiore:</strong> <em>Oh When the Saints</em> ascendente / <em>Summertime</em> discendente.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="4">▶ 3ª magg.</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Quarta giusta (5 st) &amp; tritono (6 st)</strong>
              <span>• <strong>Quarta giusta:</strong> <em>La Marsigliese («Allons en-fants»)</em> o la <em>Marcia nuziale</em>.<br>• <strong>Tritono (4ª aum. / 5ª dim.):</strong> <em>I Simpson</em> o <em>Maria (West Side Story)</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="6">▶ Tritono</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Quinta giusta (7 st), sesta maggiore (9 st) &amp; ottava (12 st)</strong>
              <span>• <strong>Quinta giusta:</strong> <em>Star Wars</em> o <em>Twinkle, Twinkle, Little Star (Do → Sol)</em>.<br>• <strong>Sesta maggiore:</strong> <em>My Bonnie Lies Over the Ocean</em>.<br>• <strong>Ottava:</strong> <em>Somewhere Over the Rainbow</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="7">▶ Quinta</button>
          </div>
        </div>

        <h3>5. Modi, triadi &amp; sillabe ritmiche</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-lilac">
            <h5>I 7 modi e la loro nota caratteristica</h5>
            <p>
              Sui tasti bianchi da <strong>Do a Si</strong>:<br>
              <strong>Ionico (Do) – Dorico (Re) – Frigio (Mi) – Lidio (Fa) – Misolidio (Sol) – Eolio (La) – Locrio (Si)</strong>.<br>
              <strong>Riferimenti uditivi immediati:</strong><br>
              • Maggiore + <strong>#4</strong> luminosa = <strong>Lidio</strong><br>
              • Maggiore + <strong>b7</strong> blues/rock = <strong>Misolidio</strong><br>
              • Minore + <strong>♮6</strong> chiara = <strong>Dorico</strong><br>
              • Minore + <strong>b2</strong> flamenca = <strong>Frigio</strong>
            </p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Parole ritmiche &amp; formule degli accordi</h5>
            <p>
              <strong>Dire il ritmo prima di contarlo:</strong><br>
              • Semiminima (♩): <em>«Pan»</em> / <em>«Ta»</em><br>
              • Due crome (♪♪): <em>«Ca-sa»</em> / <em>«Ti-ti»</em><br>
              • Terzina (3 per battito): <em>«Mu-si-ca»</em> / <em>«Ter-zi-na»</em><br>
              • Quattro semicrome (4 per battito): <em>«Cioc-co-la-to»</em><br>
              <strong>Ricetta delle triadi (semitoni):</strong><br>
              • <strong>Maggiore = 4 + 3</strong> • <strong>Minore = 3 + 4</strong><br>
              • <strong>Diminuita = 3 + 3</strong> • <strong>Aumentata = 4 + 4</strong>
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-nashville-number-system",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3.5" width="18" height="17" rx="2.5"/><line x1="3" y1="12" x2="21" y2="12" opacity="0.55"/><line x1="12" y1="3.5" x2="12" y2="20.5" opacity="0.55"/><text x="7.5" y="10" text-anchor="middle" font-family="Andika, sans-serif" font-size="6.4" font-weight="700" fill="currentColor" stroke="none">1</text><text x="16.5" y="10" text-anchor="middle" font-family="Andika, sans-serif" font-size="6.4" font-weight="700" fill="currentColor" stroke="none">4</text><text x="7.5" y="18.2" text-anchor="middle" font-family="Andika, sans-serif" font-size="6.4" font-weight="700" fill="currentColor" stroke="none">5</text><text x="16.5" y="18.2" text-anchor="middle" font-family="Andika, sans-serif" font-size="5.8" font-weight="700" fill="currentColor" stroke="none">6-</text></svg>`,
    badgeClass: "badge-peach",
    title: "Il sistema numerico di Nashville",
    subtitle: "Come i numeri al posto dei nomi degli accordi permettono di trasporre in pochi secondi",
    tag: "Studio e pratica",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Pratica in studio e armonia</span>
        <h2>Il sistema numerico di Nashville (NNS)</h2>
        <p class="article-lead">
          Immagina una sessione di registrazione: cinque musicisti ascoltano una canzone per la prima volta, buttano giù in tre minuti un foglio con numeri come <strong>1 – 5 – 6- – 4</strong> e, quando il cantante dice <em>«Abbassiamola di un tono!»</em>, nessuno cambia un solo numero. Ecco perché è nato il <strong>Nashville Number System</strong>.
        </p>

        <h3>1. Come è nato questo sistema?</h3>
        <p>
          Le sue radici affondano nella <strong>Nashville di fine anni ’50</strong>, lungo la leggendaria <em>Music Row</em>:
        </p>
        <ul class="article-steps-list">
          <li>
            <strong>Neal Matthews Jr. e The Jordanaires (fine anni ’50):</strong> Come coristi di Elvis Presley e delle stelle del country, adattavano ogni giorno arrangiamenti vocali a cantanti e tonalità sempre diversi. Neal Matthews iniziò ad annotare gli accordi con i numeri della scala invece di lettere fisse.
          </li>
          <li>
            <strong>Charlie McCoy e gli studi (anni ’60):</strong> Il polistrumentista <strong>Charlie McCoy</strong> riprese l’idea e la perfezionò per l’intera sezione ritmica (chitarra, basso, pianoforte, batteria). In sessioni di 3 ore con il mitico <em>Nashville A-Team</em> si incidevano tre o quattro brani di fila senza spartiti scritti in anticipo.
          </li>
          <li>
            <strong>Da codice di studio a standard mondiale:</strong> Poiché funziona all’istante in tutte e 12 le tonalità, oggi si usa nel pop, nel rock, nel gospel e nelle band live di tutto il mondo.
          </li>
        </ul>

        <h3>2. Come funziona?</h3>
        <p>
          Al posto dei nomi fissi degli accordi, numeri i <strong>7 gradi della scala maggiore</strong> da <strong>1 a 7</strong> e annoti la tonalità una sola volta in cima (ad esempio <strong>Key: G</strong>):
        </p>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>1 · 4 · 5 — I tre accordi maggiori (Tonica, Sottodominante, Dominante)</strong>
              <span>Senza simboli aggiuntivi: in Do maggiore sono <strong>C (1)</strong>, <strong>F (4)</strong> e <strong>G (5)</strong>.</span>
            </div>
            <button class="btn-tool" data-play-progression="I,IV,I,V">▶ 1 – 4 – 1 – 5</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>2- · 3- · 6- — I tre accordi minori</strong>
              <span>Un trattino (<strong>-</strong>) o <strong>m</strong> indica minore: in Do maggiore sono <strong>Dm (2-)</strong>, <strong>Em (3-)</strong> e <strong>Am (6-)</strong>.</span>
            </div>
            <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ 1 – 5 – 6- – 4</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>7° — Il grado diminuito (o 5/7)</strong>
              <span>Il 7° grado è diminuito (in Do: <strong>B°</strong>), ma nel pop e nel country viene spesso sostituito dal rivolto <strong>5/7</strong> (G/B).</span>
            </div>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Differenza rispetto ai numeri romani (I – V – vi – IV)</h4>
          <p>
            Armonicamente significano esattamente la stessa cosa. Le cifre arabe sono semplicemente più veloci da scrivere a mano e si leggono senza errori da un leggio poco illuminato (nessuno confonde <code>4</code> con <code>6-</code>, mentre <code>iv</code> e <code>vi</code> si assomigliano molto).
          </p>
        </div>

        <h3>3. Simboli chiave di una chart (stenografia da studio)</h3>
        <div class="nns-legend-grid">
          <div class="nns-legend-item">
            <span class="nns-legend-sym">2- / 6-</span>
            <span class="nns-legend-desc">Trattino (o m) = accordo minore</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym">1/3</span>
            <span class="nns-legend-desc">Barra = accordo su un altro basso</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym nns-legend-underline">4 &nbsp; 5</span>
            <span class="nns-legend-desc">Sottolineato = 2 accordi in una battuta (Split Bar)</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym">1◇</span>
            <span class="nns-legend-desc">Rombo = suona una volta e lascia risuonare</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym">7°</span>
            <span class="nns-legend-desc">Cerchietto = triade diminuita</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym">^ / &lt;</span>
            <span class="nns-legend-desc">Push = ingresso anticipato (sincope)</span>
          </div>
        </div>
        <ul class="article-steps-list">
          <li><strong>1 numero = 1 battuta intera:</strong> Ogni cifra occupa in genere 4 battiti.</li>
          <li><strong>Brani minori:</strong> Molti turnisti li annotano nella relativa maggiore (partendo da <strong>6-</strong>) per mantenere gli stessi schemi.</li>
        </ul>

        <h3>4. Colori da studio e accordi con barra (Slash)</h3>
        <p>
          Oltre ai 7 gradi diatonici, queste sei soluzioni compaiono ogni giorno in studio (esempi in <strong>Do maggiore</strong>):
        </p>
        <div class="song-cheat-grid">
          <div class="song-cheat-row"><div><strong>1/3 (C/E) — Primo rivolto</strong><span>Collega in modo fluido <strong>1 → 1/3 → 4</strong> (C → C/E → F) con una linea di basso ascendente.</span></div></div>
          <div class="song-cheat-row"><div><strong>4/5 (F/G) — Sospensione gospel / pop</strong><span>Tensione calda e sospesa prima di risolvere su <strong>1</strong>.</span></div></div>
          <div class="song-cheat-row"><div><strong>5/7 (G/B) — Basso sensibile verso 1</strong><span>Sostituisce spesso il 7° nelle discese classiche come <strong>1 → 5/7 → 6-</strong>.</span></div></div>
          <div class="song-cheat-row"><div><strong>♭7 (B♭) — Colore rock e country</strong><span>Prestito misolidio classico (<strong>1 – ♭7 – 4 – 1</strong>).</span></div></div>
          <div class="song-cheat-row"><div><strong>4- (Fm) — Sottodominante minore</strong><span>Il passaggio <strong>4 → 4- → 1</strong> aggiunge subito una sfumatura malinconica.</span></div></div>
          <div class="song-cheat-row"><div><strong>2 (D maggiore) — Dominante secondaria → 5</strong><span>Senza trattino, il 2 maggiore spinge direttamente verso il <strong>5</strong> (D → G → C).</span></div></div>
        </div>

        <div class="article-highlight-box">
          <h4>Provalo dal vivo nel diagramma interattivo</h4>
          <p>
            Apri lo <strong>strumento Sistema numerico di Nashville</strong> per esplorare tutte e 12 le tonalità e ascoltare ogni grado, oppure apri il <strong>Traduttore di capotasto</strong> dedicato per convertire tonalità reale, tasto e posizioni:
          </p>
          <button class="btn-tool" type="button" data-open-nashville-tool="1">▶ Apri strumento Nashville</button>
          <button class="btn-tool" type="button" data-open-capo-tool="1">▶ Apri traduttore di capotasto</button>
        </div>
      </div>
    `
  }
];

const PHYSICS_WAVE_EXPLANATIONS_IT = {
  "2,1": "<strong>Ottava (2 : 1):</strong> In 2 onde verdi lunghe entrano esattamente <strong>4 onde arancioni lunghe la metà</strong>. Nella traccia 3, il disegno complessivo si ripete identico a ogni linea tratteggiata: per questo l’ottava si fonde quasi in un unico suono.",
  "3,2": "<strong>Quinta giusta (3 : 2):</strong> Mentre la fondamentale traccia 2 onde verdi lunghe, la nota acuta disegna esattamente <strong>3 onde arancioni</strong>. Tornano a coincidere in modo pulito ogni 2 onde: stabile, aperta e potente.",
  "4,3": "<strong>Quarta giusta (4 : 3):</strong> 3 onde verdi si incontrano esattamente con 4 onde arancioni, e poi l’intero schema ricomincia sincronizzato da zero.",
  "5,4": "<strong>Terza maggiore (5 : 4):</strong> 4 cicli verdi si incrociano con 5 cicli arancioni. Nella traccia 3 si forma una curva morbida e arrotondata: il calore degli accordi maggiori.",
  "6,5": "<strong>Terza minore (6 : 5):</strong> 5 onde verdi contro 6 arancioni: un po’ più serrato della terza maggiore; quel leggero movimento d’onda dona al minore il suo colore emotivo.",
  "5,3": "<strong>Sesta maggiore (5 : 3):</strong> Rapporto 1,67 : 1, il rivolto della terza minore. Ampia, cantabile e piacevolmente distesa.",
  "45,32": "<strong>Tritono (45 : 32):</strong> Le creste arancioni si rifiutano di allinearsi alla griglia verde. Osserva la traccia 3: una curva a denti di sega carica di tensione!",
  "16,15": "<strong>Seconda minore (16 : 15):</strong> Le due onde hanno quasi la stessa velocità, ma si sfasano pian piano creando quei rigonfiamenti prima larghi e poi sottili nella traccia 3 (battimento)."
};

const PHYSICS_OVERTONES_IT = [
  { num: 1,  note: "Do2",      ratio: "1× · Fondam.",    freq: 65.41,  special: false },
  { num: 2,  note: "Do3",      ratio: "2× · Ottava",     freq: 130.82, special: false },
  { num: 3,  note: "Sol3",     ratio: "3× · Quinta g.",  freq: 196.23, special: false },
  { num: 4,  note: "Do4",      ratio: "4× · 2ª ottava",  freq: 261.64, special: false },
  { num: 5,  note: "Mi4",      ratio: "5× · 3ª magg.",   freq: 327.05, special: false },
  { num: 6,  note: "Sol4",     ratio: "6× · Quinta g.",  freq: 392.46, special: false },
  { num: 7,  note: "~Sib4*",   ratio: "7× · 7ª nat.",    freq: 457.87, special: true },
  { num: 8,  note: "Do5",      ratio: "8× · 3ª ottava",  freq: 523.28, special: false },
  { num: 9,  note: "Re5",      ratio: "9× · 2ª magg.",   freq: 588.69, special: false },
  { num: 10, note: "Mi5",      ratio: "10× · 3ª magg.",  freq: 654.10, special: false },
  { num: 11, note: "~Fa5/Fa#*",ratio: "11× · Fa alpino", freq: 719.51, special: true },
  { num: 12, note: "Sol5",     ratio: "12× · Quinta g.", freq: 784.92, special: false }
];

function renderPhysicsReferenceHTML_IT() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Come nasce il suono</span>
        <span class="k-ratio-chip">circa 343 m/s</span>
      </div>
      <h4>Dall’aria che vibra alla curva sinusoidale</h4>
      <p>
        Pizzica una corda di chitarra o canticchia una nota: qualcosa vibra molto rapidamente avanti e indietro. Questo tremito spinge le molecole d’aria vicine e invia un’onda di pressione a circa <strong>343 metri al secondo</strong> (oltre 1200 km/h!). Quando raggiunge il tuo orecchio, il timpano vibra allo stesso ritmo e il cervello lo traduce in musica.
      </p>
      <p>
        Immagina un’altalena che va avanti e indietro senza il minimo strappo: se tracci quel movimento regolare nel tempo, ottieni una <strong>sinusoide</strong> (<em>curva seno</em>). È il mattoncino elementare del suono: <strong>una sola frequenza pura</strong>, senz’altro attorno. Gli strumenti reali disegnano onde molto più frastagliate, perché mescolano più vibrazioni contemporaneamente.
      </p>

      <div class="wave-compare-visual">
        <div class="wave-compare-card">
          <strong>Sinusoide pura (1 frequenza)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 29.0 L9.5 25.0 L12.9 21.3 L16.4 17.8 L19.9 14.9 L23.3 12.5 L26.8 10.9 L30.3 10.1 L33.7 10.1 L37.2 10.9 L40.7 12.5 L44.1 14.9 L47.6 17.8 L51.1 21.3 L54.5 25.0 L58.0 29.0 L61.5 33.0 L64.9 36.7 L68.4 40.2 L71.9 43.1 L75.3 45.5 L78.8 47.1 L82.3 47.9 L85.7 47.9 L89.2 47.1 L92.7 45.5 L96.1 43.1 L99.6 40.2 L103.1 36.7 L106.5 33.0 L110.0 29.0 L113.5 25.0 L116.9 21.3 L120.4 17.8 L123.9 14.9 L127.3 12.5 L130.8 10.9 L134.3 10.1 L137.7 10.1 L141.2 10.9 L144.7 12.5 L148.1 14.9 L151.6 17.8 L155.1 21.3 L158.5 25.0 L162.0 29.0 L165.5 33.0 L168.9 36.7 L172.4 40.2 L175.9 43.1 L179.3 45.5 L182.8 47.1 L186.3 47.9 L189.7 47.9 L193.2 47.1 L196.7 45.5 L200.1 43.1 L203.6 40.2 L207.1 36.7 L210.5 33.0 L214.0 29.0" fill="none" stroke="var(--sage-strong)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Curva a S ben arrotondata e senza spigoli: suona liscia e neutra, come un diapason o un fischio dolce.</span>
        </div>
        <div class="wave-compare-card">
          <strong>Suono reale (fondamentale + armonici)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 26.9 L9.5 17.6 L12.9 11.3 L16.4 9.3 L19.9 11.2 L23.3 15.4 L26.8 19.5 L30.3 22.3 L33.7 23.3 L37.2 23.3 L40.7 23.4 L44.1 23.9 L47.6 24.9 L51.1 25.9 L54.5 26.5 L58.0 26.9 L61.5 27.7 L64.9 29.3 L68.4 31.8 L71.9 34.5 L75.3 36.8 L78.8 38.1 L82.3 38.8 L85.7 39.9 L89.2 41.9 L92.7 44.7 L96.1 47.2 L99.6 47.4 L103.1 43.9 L106.5 36.5 L110.0 26.9 L113.5 17.6 L116.9 11.3 L120.4 9.3 L123.9 11.2 L127.3 15.4 L130.8 19.5 L134.3 22.3 L137.7 23.3 L141.2 23.3 L144.7 23.4 L148.1 23.9 L151.6 24.9 L155.1 25.9 L158.5 26.5 L162.0 26.9 L165.5 27.7 L168.9 29.3 L172.4 31.8 L175.9 34.5 L179.3 36.8 L182.8 38.1 L186.3 38.8 L189.7 39.9 L193.2 41.9 L196.7 44.7 L200.1 47.2 L203.6 47.4 L207.1 43.9 L210.5 36.5 L214.0 26.9" fill="none" stroke="var(--peach-strong)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Più sinusoidi si sommano tra loro. Quei picchi e avvallamenti danno a ogni strumento la sua personalità.</span>
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Hertz (Hz) = velocità</strong>
          <span><code>65 Hz</code> (<code>Do2</code> grave) vibra 65 volte al secondo: un’onda lunga <strong>5,24 metri</strong> nella stanza! <code>440 Hz</code> (<code>La4</code>) misura solo <strong>78 cm</strong>.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Ottava = velocità raddoppiata</strong>
          <span>Il tuo orecchio ragiona per rapporti: saltare <code>220 → 440 Hz</code> (+220 Hz) e <code>440 → 880 Hz</code> (+440 Hz) dà esattamente la stessa sensazione: 2:1!</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Ampiezza = volume</strong>
          <span>L’ampiezza del movimento (in decibel, dB) rende il suono più forte o più debole, senza mai cambiare l’altezza della nota.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Forma d’onda = timbro</strong>
          <span>Onda liscia = suono morbido tipo flauto. Onda seghettata = suono incisivo tipo tromba o chitarra distorta.</span>
        </div>
      </div>

      <div class="k-meta-box">
        <strong>Da provare: salti d’ottava &amp; forme d’onda sul Do4 (261,6 Hz):</strong>
        <div class="k-btn-row" style="margin-top:0.35rem;">
          <button class="btn-tool" data-play-freqs="220,440,880" data-seq-step="650" data-osc="triangle" data-dur="0.75">▶ 220 → 440 → 880 Hz</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sine" data-dur="1.4">▶ Sinusoide pura</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="triangle" data-dur="1.4">▶ Triangolare (più morbida)</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sawtooth" data-dur="1.4">▶ Dente di sega (incisiva)</button>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. Lo spettro di frequenze</span>
        <span class="k-ratio-chip">20 Hz – 20 kHz</span>
      </div>
      <h4>L’impronta digitale del suono: che cosa nasconde una nota?</h4>
      <p>
        Se un pianoforte e una chitarra suonano esattamente lo stesso <code>Do4</code>, li riconosci all’istante, anche se la nota di base ha la stessa identica frequenza! Il segreto è lo <strong>spettro di frequenze</strong>: ogni suono reale è in realtà una squadra di sinusoidi che risuonano insieme.
      </p>
      <p>
        Uno spettro (come un analizzatore EQ) mostra, come una radiografia, quali frequenze stanno suonando e a quale volume: all’estrema sinistra c’è la fondamentale (<code>1×</code>) e verso destra i suoi armonici più veloci (da <code>2×</code> a <code>10×</code>). Scegli un suono per vedere e ascoltare la sua ricetta:
      </p>

      <div class="freq-spec-box">
        <div class="k-btn-row">
          <button class="k-filter-pill active" data-spec-preset="sine" data-play-freqs="261.63" data-osc="sine" data-dur="1.4" data-spec-desc="<strong>Sinusoide pura:</strong> Una sola barra su 1×, zero armonici. Un suono molto liscio, quasi neutro, senza frequenze acute che lo colorino.">▶ Sinusoide (Do4)</button>
          <button class="k-filter-pill" data-spec-preset="piano" data-play-inst data-style="piano" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Pianoforte (sample):</strong> Fondamentale solida e primi armonici rotondi che si attenuano dolcemente verso l’alto: ecco da dove nasce quella rotondità calda.">▶ Pianoforte (sample Do4)</button>
          <button class="k-filter-pill" data-spec-preset="guitar" data-play-inst data-style="guitar" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Chitarra (sample):</strong> La corda pizzicata immette molta più energia nella parte media e medio-alta dello spettro: è ciò che conferisce mordente e schiocco all’attacco.">▶ Chitarra (sample Do4)</button>
          <button class="k-filter-pill" data-spec-preset="strings" data-play-inst data-style="strings" data-notes="C4" data-dur="1.6" data-spec-desc="<strong>Archi (sample):</strong> L’archetto sostiene con continuità anche gli armonici acuti (6×–10×), regalando quella grana setosa che emerge con facilità in un mix.">▶ Archi (sample Do4)</button>
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
          <strong>Sinusoide pura:</strong> Una sola barra su 1×, zero armonici. Un suono molto liscio, quasi neutro, senza frequenze acute che lo colorino.
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Sub-bassi &amp; bassi (20 – 250 Hz)</strong>
          <span>Cassa, basso, fondamenta. Onde così ampie che spesso si avvertono nel petto prima ancora di distinguerle.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Medi &amp; corpo (250 Hz – 2 kHz)</strong>
          <span>Voce, corpo del pianoforte, accordi di chitarra. Troppa energia qui rende subito il suono «ovattato».</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Presenza &amp; attacco (2 – 6 kHz)</strong>
          <span>Consonanti («S», «T»), schiocco del plettro e definizione. Zona in cui l’orecchio è ultrasensibile.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Aria &amp; brillantezza (6 – 20 kHz)</strong>
          <span>Scintillio dei piatti, soffio sottile e dettagli setosi fino ai limiti dell’udito umano.</span>
        </div>
      </div>
    </article>

    <div class="wave-lab-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">3. Laboratorio d’onde interattivo</span>
        <button id="toggleWavePauseBtn" class="k-ratio-btn">⏸ Pausa</button>
      </div>
      <h4>Osservare dal vivo come si fondono due onde</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-mid); line-height:1.4;">
        Le linee tratteggiate segnano <strong>1 ciclo completo della fondamentale (verde)</strong>. Sotto vibra la <strong>2ª nota (arancione)</strong>, e la traccia 3, in fondo, mostra la loro vera <strong>onda combinata</strong> proprio come raggiunge il tuo timpano.
      </p>
      <div class="wave-canvas-wrap">
        <canvas id="waveCanvas" class="wave-canvas" width="540" height="195"></canvas>
        <div id="waveExplainBanner" class="wave-explain-banner">
          ${PHYSICS_WAVE_EXPLANATIONS_IT["2,1"]}
        </div>
      </div>
      <div class="k-btn-row">
        <button class="k-filter-pill active" data-wave-ratio="2,1" data-wave-semi="12">Ottava (2:1)</button>
        <button class="k-filter-pill" data-wave-ratio="3,2" data-wave-semi="7">Quinta (3:2)</button>
        <button class="k-filter-pill" data-wave-ratio="4,3" data-wave-semi="5">Quarta (4:3)</button>
        <button class="k-filter-pill" data-wave-ratio="5,4" data-wave-semi="4">3ª magg (5:4)</button>
        <button class="k-filter-pill" data-wave-ratio="6,5" data-wave-semi="3">3ª min (6:5)</button>
        <button class="k-filter-pill" data-wave-ratio="5,3" data-wave-semi="9">6ª magg (5:3)</button>
        <button class="k-filter-pill" data-wave-ratio="45,32" data-wave-semi="6">Tritono (45:32)</button>
        <button class="k-filter-pill" data-wave-ratio="16,15" data-wave-semi="1">2ª min (16:15)</button>
      </div>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">4. La scala nascosta della natura</span>
        <span class="k-ratio-chip">da 1× a 12× la fondamentale</span>
      </div>
      <h4>Onde stazionarie &amp; serie degli armonici (1°–12°)</h4>
      <p>
        Fissa una corda ai due estremi e pizzicala: poiché i bordi restano fermi, vibra per intero E allo stesso tempo si divide a metà (2× più veloce), in terzi (3×), in quarti (4×)… Una sola nota contiene per natura un’intera scala di armonici nascosti!
      </p>
      <p>
        Tocca i riquadri! I suoni segnati in viola <strong>7</strong> e <strong>11</strong> («Fa del corno alpino») cadono esattamente <em>tra</em> due tasti del pianoforte: armonici naturali puri.
      </p>
      <div class="overtone-grid">
        ${PHYSICS_OVERTONES_IT.map(ot => `
          <button class="overtone-btn ${ot.special ? "is-blue" : ""}" data-play-freqs="${ot.freq}" data-osc="triangle" data-dur="1.15">
            <span class="overtone-num">Arm. #${ot.num}</span>
            <span class="overtone-note">${ot.note}</span>
            <span class="overtone-ratio">${ot.ratio}</span>
          </button>
        `).join("")}
      </div>
      <div class="k-meta-box">
        <strong>Perché il maggiore suona così naturale:</strong> Gli armonici <strong>4 : 5 : 6</strong> formano subito una triade maggiore luminosa vicino alla base. L’accordo minore puro si nasconde molto più in alto, verso <strong>10 : 12 : 15</strong>!
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="${PHYSICS_OVERTONES_IT.map(o => o.freq).join(",")}" data-seq-step="380" data-osc="triangle" data-dur="0.65">▶ Serie completa (1–12)</button>
        <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Accordo maggiore (4:5:6)</button>
        <button class="btn-tool" data-play-freqs="261.63,313.96,392.45" data-osc="triangle" data-dur="2.0">▶ Accordo minore (10:12:15)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">5. Battimenti acustici</span>
        <span class="k-ratio-chip">Differenza in Hz = puls./s</span>
      </div>
      <h4>Quando le onde «pulsano»: accordare a orecchio</h4>
      <p>
        Suona due corde quasi all’unisono: le loro creste si sommano per un istante (il doppio più forti) e poi si oppongono (un breve vuoto). Quel va e vieni («ua-ua-ua») si chiama <strong>battimento</strong>. Il numero di pulsazioni al secondo indica esattamente la <strong>differenza in hertz</strong>: quando le corde sono perfettamente accordate, il tremolio sparisce!
      </p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="440,440" data-osc="sine" data-dur="2.4">▶ 0 Hz (440+440 · stabile)</button>
        <button class="btn-tool" data-play-freqs="440,442" data-osc="sine" data-dur="2.6">▶ 2 Hz (440+442 · 2 puls./s)</button>
        <button class="btn-tool" data-play-freqs="440,446" data-osc="sine" data-dur="2.4">▶ 6 Hz (440+446 · scintillio)</button>
        <button class="btn-tool" data-play-freqs="440,466" data-osc="sine" data-dur="2.2">▶ 26 Hz (440+466 · attrito)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">6. Accordatura &amp; il compromesso del pianoforte</span>
        <span class="k-ratio-chip">Scarto +23,5 cent</span>
      </div>
      <h4>Perché nessun pianoforte al mondo è accordato «100% puro»</h4>
      <p>
        Uno strano scherzo della matematica: impila 12 quinte pure (3:2) di fila e superi leggermente 7 ottave giuste, di circa <strong>23,5 cent</strong>! Se un accordatore regolasse il pianoforte perfettamente puro in Do maggiore, le tonalità lontane come Fa♯ maggiore suonerebbero terribilmente stonate.
      </p>
      <p>
        Il trucco della musica moderna si chiama <strong>temperamento equabile</strong>: l’ottava viene divisa in 12 micro-passi rigorosamente uguali. Ogni brano funziona in tutte e 12 le tonalità, al prezzo di una terza maggiore (Do–Mi) più alta di circa <strong>14 cent</strong> sul pianoforte. Confronta l’intonazione giusta con veri sample di pianoforte:
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Intonazione giusta (pura 5:4)</h5>
          <p>Zero battimenti: fusione liscia, ma inutilizzabile in tutte le tonalità:</p>
          <button class="btn-tool" data-play-freqs="261.63,327.04" data-osc="triangle" data-dur="2.3">▶ Terza pura (5:4 · liscia)</button>
          <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.3">▶ Triade di Do maggiore pura</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Pianoforte / temperamento equabile (+14 ct)</h5>
          <p>Veri sample di pianoforte da studio: leggero luccichio ondeggiante, suonabile in tutte e 12 le tonalità:</p>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4" data-dur="2.3">▶ Terza di pianoforte (sample Do4 + Mi4)</button>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4,G4" data-dur="2.3">▶ Do maggiore di pianoforte (sample)</button>
        </div>
      </div>
    </article>
  `;
}


const CATEGORY_HELP_GUIDES_IT = {
  cadence: {
    tagClass: "tag-sage",
    tag: "Istruzioni • Cadenze",
    title: "Come funziona l’allenamento sulle cadenze",
    lead: "Invece di indovinare accordi fuori contesto, ascolti un’intera progressione di quattro battute — in <strong>maggiore</strong> e in <strong>minore</strong> — e riconosci la funzione mancante sul punto interrogativo.",
    sections: `
      <h3>I quattro gruppi di esercizi (maggiore &amp; minore)</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Maggiore • Obiettivo: battuta 4</h5>
          <p>Le battute da 1 a 3 stabiliscono la tonalità maggiore. Ascolta i quattro accordi e scegli l’armonia mancante nella <strong>battuta 4</strong>.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Maggiore • Battuta casuale (1–4)</h5>
          <p>Il punto interrogativo si sposta tra le battute 1 e 4. Anche quando la battuta 1 è nascosta, resta visibile un riferimento di tonica (<strong>I</strong>).</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Minore • Obiettivo: battuta 4</h5>
          <p>Gli stessi esercizi in vere tonalità minori (es. <code>i–iv–V</code>): ascolta tre battute di contesto e identifica la 4ª funzione.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Minore • Battuta casuale (1–4)</h5>
          <p>La battuta nascosta varia da 1 a 4; almeno una tonica minore (<strong>i</strong>) rimane visibile sullo schermo per orientare il tuo orecchio.</p>
        </div>
      </div>

      <h3>I 4 livelli di difficoltà (maggiore &amp; minore)</h3>
      <ul class="article-steps-list">
        <li><strong>Livello 1 – Basi (I–V / i–V):</strong> I quattro pilastri essenziali: <code>I, IV, V, vi</code> in maggiore oppure <code>i, iv, V, VI</code> in minore.</li>
        <li><strong>Livello 2 – Diatonico (ii–vi / ii°–VII):</strong> Tutti i gradi diatonici principali (maggiore con <code>ii</code> &amp; <code>iii</code>; minore con <code>ii°, III, v, V, VII</code>).</li>
        <li><strong>Livello 3 – Esteso (V/V / N6):</strong> Introduce <code>V7</code>, la dominante secondaria <code>V/V</code> e l’accordo napoletano <code>N6</code> in minore.</li>
        <li><strong>Livello 4 – Jazz &amp; tritono (bII7 / iiø7):</strong> Vocabolario completo fino alla sostituzione di tritono <code>bII7</code> e al <code>ii–V</code> minore (<code>iiø7</code>).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Comandi, solo ascolto &amp; esame</h4>
        <p>In alto nella schermata puoi regolare <strong>Tonalità</strong> e <strong>Tempo (BPM)</strong>. Sotto, <strong>Tonica (I)</strong> / <strong>Tonica (i)</strong> e <strong>Riascolta l’accordo</strong> ancorano il tuo orecchio; il pulsante <strong>Loop</strong> ripete in modo continuo e <strong>Solo ascolto</strong> fa scorrere gli esercizi con rivelazione automatica. Dopo un errore, <strong>Confronto A/B</strong> e <strong>Basso / fondamentale</strong> mettono a confronto la tua scelta con la soluzione, mentre l’<strong>Esame di categoria</strong> mette alla prova maggiore e minore insieme.</p>
      </div>
    `
  },
  interval: {
    tagClass: "tag-peach",
    tag: "Istruzioni • Intervalli",
    title: "Come funziona l’allenamento sugli intervalli",
    lead: "Affina l’orecchio su distanze pure di due note: melodiche ascendenti, melodiche discendenti, armoniche simultanee e su un tappeto d’archi. Nelle modalità melodiche e su tappeto, la nota di partenza cambia a ogni domanda entro un registro medio chiaro. (Per accordi &amp; rivolti, vai al modulo <strong>Accordi</strong>!)",
    sections: `
      <h3>I 4 tipi di esercizio</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Intervalli melodici (ascendenti)</h5>
          <p>Due altezze si susseguono verso l’acuto: la battuta 1 dà la nota di partenza casuale (<code>Fa3–Mi4</code>) e la battuta 2 ti invita a nominare il salto ascendente.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Intervalli melodici (discendenti)</h5>
          <p>Due altezze scendono una dopo l’altra: la battuta 1 parte da una nota acuta casuale (<code>Fa♯4–Fa5</code>) e la battuta 2 chiede il salto discendente: un grande classico dell’ear training!</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Intervalli armonici</h5>
          <p>Le due note suonano insieme. Ascolta la fusione o i battimenti; una volta risolto, le schede mostrano entrambe le altezze (es. <code>Do4 + Sol4</code> / <code>C4 + G4</code>).</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Intervalli su tappeto di fondamentale (archi ➔ pianoforte)</h5>
          <p>Un caldo <strong>tappeto d’archi</strong> sostiene la fondamentale in modo continuo. Dopo una breve pausa, il <strong>pianoforte</strong> suona la nota target al di sopra, con controlli dedicati per <strong>Pedale di tonica</strong> (50% predefinito) e <strong>Intervallo</strong>.</p>
        </div>
      </div>

      <h3>Livelli: Maggiore, Minore, Cromatico &amp; Modalità libera</h3>
      <ul class="article-steps-list">
        <li><strong>Principiante (Livello 1 in maggiore / Minore 1):</strong> Quattro punti di riferimento della triade: unisono (<code>P1</code>), terza maggiore (<code>M3</code>) o terza minore (<code>m3</code>), quinta giusta (<code>P5</code>) e ottava (<code>P8</code>).</li>
        <li><strong>Metà inferiore 1–4 (Livello 2 in maggiore / Minore 2):</strong> Il tetracordo inferiore (4 intervalli): unisono (<code>P1</code>), seconda maggiore (<code>M2</code>), terza maggiore o minore (<code>M3</code> / <code>m3</code>) e quarta giusta (<code>P4</code>).</li>
        <li><strong>Metà superiore 5–8 (Livello 3 in maggiore / Minore 3):</strong> Il tetracordo superiore (4 intervalli): quinta giusta (<code>P5</code>), sesta maggiore o minore (<code>M6</code> / <code>m6</code>), settima maggiore o minore (<code>M7</code> / <code>m7</code>) e ottava (<code>P8</code>).</li>
        <li><strong>Scala completa (Livello 4 Scala maggiore / Minore 4 Scala minore):</strong> Tutti gli 8 intervalli diatonici dall’unisono all’ottava in maggiore o minore naturale.</li>
        <li><strong>Livello 5 – Cromatico:</strong> Tutti i 15 intervalli dall’unisono alla nona maggiore (<code>M9</code>), inclusi tutti gli intervalli minori e il tritono (<code>TT</code>).</li>
        <li><strong>Tonalità &amp; modi liberi (Allenamento su misura):</strong> Scegli una <strong>Tonica fissa</strong> (da <code>Do</code> a <code>Si</code>) o <strong>Casuale</strong>, una <strong>Scala o modo</strong> (<em>Maggiore/Ionico</em>, <em>Minore naturale/armonica/melodica</em>, <em>Dorico</em>, <em>Frigio</em>, <em>Lidio</em>, <em>Misolidio</em>, <em>Locrio</em>, <em>Cromatica</em>), l’<strong>Ambito</strong> (<em>Principiante</em>, <em>1–4</em>, <em>5–8</em>, <em>1–8</em>) oppure attiva ogni singolo intervallo, sia nella pagina di categoria sia dal vivo dal badge in alto a destra.</li>
      </ul>

      <h3>Capire la notazione abbreviata degli intervalli</h3>
      <ul class="article-steps-list">
        <li><strong>Lettera = specie (colore), numero = grado (<code>1</code>–<code>9</code>):</strong> Il numero conta i nomi di nota dal punto di partenza (<code>1</code> = unisono, <code>2</code> = seconda, <code>3</code> = terza … fino a <code>9</code> = nona), mentre la lettera precisa il numero esatto di semitoni.</li>
        <li><strong><code>P</code> = giusto (<em>Perfect</em>):</strong> Si applica a unisono (<code>P1</code>), quarta (<code>P4</code>), quinta (<code>P5</code>) e ottava (<code>P8</code>). Questi intervalli non hanno variante maggiore/minore: solo la forma «giusta».</li>
        <li><strong><code>M</code> &amp; <code>m</code> (internazionale) oppure <code>G</code> &amp; <code>k</code> (tedesco):</strong> Si usano per 2ª (<code>2</code>), 3ª (<code>3</code>), 6ª (<code>6</code>), 7ª (<code>7</code>) e 9ª (<code>9</code>):<br>
          – <strong><code>M</code> maiuscola</strong> (<em>Major</em>, in tedesco <strong><code>G</code></strong> = <em>Groß</em>) indica l’intervallo maggiore, più ampio e luminoso (es. <code>M3</code> / <code>G3</code> = terza maggiore, 4 semitoni).<br>
          – <strong><code>m</code> minuscola</strong> (<em>minor</em>, in tedesco <strong><code>k</code></strong> = <em>klein</em>) è sempre <strong>un semitono più stretto</strong>, più intimo o teso (es. <code>m3</code> / <code>k3</code> = terza minore, 3 semitoni). Fai attenzione a maiuscola e minuscola tra <code>m</code> e <code>M</code>: suonano molto diversi!</li>
        <li><strong><code>TT</code> = tritono:</strong> Il punto mediano elettrico di 6 semitoni, esattamente tra <code>P4</code> e <code>P5</code>.</li>
      </ul>
      <p><em>Cambiare le abbreviazioni:</em> Puoi passare in qualsiasi momento da <strong>Internazionale (P / M / m)</strong> a <strong>Tedesco (P / G / k)</strong> in <strong>Impostazioni → Notazione musicale → Nomi degli intervalli</strong>.</p>

      <div class="article-highlight-box">
        <h4>Cantare, confronto A/B &amp; esame</h4>
        <p>In alto, il pulsante <strong>Canta</strong> (con <em>pausa per canticchiare</em> opzionale) aiuta la tua voce a sentire la distanza. Sotto, <strong>Nota di partenza</strong> ripete la nota iniziale; dopo un errore, il <strong>confronto A/B</strong> ripete la tua scelta da quella stessa nota e nella stessa direzione subito prima della soluzione. Usa <strong>Loop</strong> per ripetere senza sosta (oppure attiva <strong>Avanti automatico</strong> nelle Impostazioni), <strong>Solo ascolto</strong> per il ripasso passivo e affronta l’<strong>Esame di categoria</strong> con tutti e 4 i tipi di intervalli (Maggiore, Minore, Metà, Maggiore e Minore combinati, Cromatico e Tonalità e modi liberi).</p>
      </div>
    `
  },
  chords: {
    tagClass: "tag-sage",
    tag: "Istruzioni • Accordi",
    title: "Come funziona l’allenamento sugli accordi",
    lead: "Sviluppa un riconoscimento immediato dei colori degli accordi — sgranati nota per nota (arpeggi ascendenti o discendenti) o suonati in blocco — e individua quale nota dell’accordo si trova al basso nei rivolti.",
    sections: `
      <h3>I 4 tipi di esercizio</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Arpeggio d’accordo (ascendente ↗)</h5>
          <p>Le note dell’accordo suonano dal grave all’acuto per seguire con chiarezza ogni terza, quinta e settima; una volta indovinato, l’app riunisce le note in un accordo completo simultaneo.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Arpeggio d’accordo (discendente ↘)</h5>
          <p>L’accordo si apre dalla nota più acuta verso il basso. Ideale per non dipendere dal solito senso d’ascolto; dopo la risposta, l’accordo simultaneo rivela l’armonia completa.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Accordi (simultanei)</h5>
          <p>Da tre a cinque note suonano insieme. Ascolta la limpidezza o la tensione globale; una scheda risolta si apre in arpeggio ascendente mostrando tutte le sue note (es. <code>Do4 · Mi4 · Sol4 · Si4</code>).</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Rivolti degli accordi</h5>
          <p>Identifica quale nota occupa la voce del basso in fondo: <code>Basso: 1</code> (stato fondamentale), <code>Basso: 3</code> (1° rivolto), <code>Basso: 5</code> (2° rivolto) o <code>Basso: 7</code> (3° rivolto). Il basso resta centrato in un registro medio stabile così giudichi il colore della sovrapposizione e non l’altezza assoluta.</p>
        </div>
      </div>

      <h3>Difficoltà – tipi di accordo (4 livelli)</h3>
      <ul class="article-steps-list">
        <li><strong>Livello 1 – Triadi di base:</strong> Le quattro triadi essenziali: maggiore (<code>maj</code>), minore (<code>m</code>), diminuita (<code>dim</code>) e aumentata (<code>aug</code>).</li>
        <li><strong>Livello 2 – Settime &amp; sus:</strong> Aggiunge quarta sospesa (<code>sus4</code>), settima di dominante (<code>7</code>), settima maggiore (<code>maj7</code>) e minore settima (<code>m7</code>).</li>
        <li><strong>Livello 3 – Settime estese:</strong> Aggiunge <code>sus2</code>, semidiminuito (<code>m7♭5</code>), settima diminuita (<code>°7</code>) e minore-maggiore settima (<code>m(maj7)</code>).</li>
        <li><strong>Livello 4 – Jazz &amp; tensioni:</strong> Tutti e 15 i colori d’accordo, comprese estensioni jazz come <code>maj9</code>, <code>7♭9</code> e <code>7♯9</code>.</li>
      </ul>

      <h3>Difficoltà – rivolti (3 livelli)</h3>
      <ul class="article-steps-list">
        <li><strong>Livello 1 – Triade maggiore (3):</strong> Stato fondamentale (<code>Basso: 1</code>), 1° rivolto (<code>Basso: 3</code>) e 2° rivolto (<code>Basso: 5</code>).</li>
        <li><strong>Livello 2 – Maggiore &amp; minore (3):</strong> Le tre posizioni della triade mescolate tra accordi maggiori luminosi e minori profondi.</li>
        <li><strong>Livello 3 – Accordi di settima (4):</strong> Accordi di quattro note (<code>7</code>, <code>maj7</code>, <code>m7</code>) che introducono il 3° rivolto con la settima al basso (<code>Basso: 7</code>).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Consigli per l’allenamento</h4>
        <p><strong>Fondamentale</strong> ripete la fondamentale dell’accordo in qualsiasi momento; dopo un errore, il <strong>confronto A/B</strong> ripete la tua proposta sulla stessa fondamentale subito prima della risposta corretta, e nei rivolti <strong>Ascolta il basso</strong> isola la nota più grave. Attiva anche <strong>Loop</strong>, <strong>Solo ascolto</strong> e l’<strong>Esame</strong> su 4 livelli.</p>
      </div>
    `
  },
  melody: {
    tagClass: "tag-lilac",
    tag: "Istruzioni • Melodie",
    title: "Come funziona l’allenamento melodico",
    lead: "Unisci l’orecchio del solfeggio al senso del ritmo direttamente su un vero pentagramma a 5 righe: una cadenza di 4 accordi lascia spazio a 1 battuta di conteggio iniziale e a una frase di 4–6 note.",
    sections: `
      <h3>Svolgimento di un round</h3>
      <ul class="article-steps-list">
        <li><strong>1. Cadenza, conteggio iniziale &amp; vero pentagramma:</strong> Una progressione di ancoraggio (<code>I – vi – IV – V</code>) fissa la tonalità, seguita da una battuta di conteggio iniziale in <code>4/4</code> o <code>3/4</code> prima di 4–6 note (crome, semiminime, semiminime col punto, minime e pause) visualizzate direttamente sul pentagramma.</li>
        <li><strong>2. Tre stili a scelta:</strong> Nella pagina di selezione scegli <strong>Melodia ritmica</strong> (le durate sono già visibili sul pentagramma per concentrarti sulle altezze), <strong>Dettato combinato</strong> (trova l’altezza sulla tastiera <em>e</em> la figura ritmica <code>1/8</code>, <code>1/4</code>, <code>1/4.</code>, <code>1/2</code> sotto, in qualsiasi ordine) oppure <strong>Regolare (basi)</strong> (4 minime regolari per iniziare).</li>
        <li><strong>3. Risoluzione passo dopo passo sul pentagramma:</strong> Non appena una nota è confermata, il suo nome (<code>Do–Ti</code> o numero di grado <code>1–7</code>) compare sotto il pentagramma e il cursore passa al punto interrogativo successivo.</li>
        <li><strong>4. Riascoltare &amp; toccare direttamente le note:</strong> Tocca <strong>▶ Ascolta</strong> per risentire tutta la frase senza perdere i tuoi progressi. <strong>Ripeti</strong> (oppure toccare direttamente una nota già risolta o attiva sul pentagramma) isola quella singola nota con un breve riferimento ritmico.</li>
      </ul>

      <h3>Livelli, tonalità &amp; comandi</h3>
      <ul class="article-steps-list">
        <li><strong>Livello 1 – Do–Fa:</strong> Frasi di 4–5 note del tetracordo inferiore (<code>Do, Re, Mi, Fa</code>).</li>
        <li><strong>Livello 2 – Sol–Do:</strong> Frasi di 4–6 note sulla metà superiore (<code>Sol, La, Ti, Do</code>).</li>
        <li><strong>Livello 3 – Tonalità completa:</strong> Tutti e sette i gradi (da <code>Do</code> a <code>Do</code>) in 4–6 note.</li>
        <li><strong>Tonalità, ottave &amp; aiuti:</strong> Allenati in <code>Do maggiore</code> o in tonalità casuali, su 1 o più ottave. In alto regoli <strong>Tonalità</strong>, <strong>Battito: sì/no</strong> e <strong>Tempo (BPM)</strong>; sotto trovi <strong>Tonica (Do)</strong>, <strong>Avanti automatico</strong> (a sinistra), <strong>Solo ascolto</strong> e l’<strong>Esame</strong> su 5 livelli.</li>
      </ul>
    `
  },
  solfege: {
    tagClass: "tag-sage",
    tag: "Istruzioni • Solfeggio",
    title: "Come funziona il solfeggio relativo (Do mobile)",
    lead: "Il solfeggio relativo (Do mobile) costruisce l’orecchio relativo in maggiore e in minore: impari a riconoscere ogni grado (Do–Ti, Do–Re–Me–Fa–Sol–Le–Te o numeri) dalla sua tensione caratteristica dentro la tonalità.",
    sections: `
      <h3>Ogni round segue 4 passaggi chiari</h3>
      <ul class="article-steps-list">
        <li><strong>1. Cadenza di contesto:</strong> Una breve progressione sintonizza l’orecchio sul centro tonale: <code>I – vi – IV – V</code> in maggiore o <code>i – VI – iv – V</code> in minore.</li>
        <li><strong>2. Nota target:</strong> Dopo un istante, ascolti un singolo grado isolato dall’ambito attivo.</li>
        <li><strong>3. Rispondere sulla tastiera:</strong> Solo i tasti attivi mostrano il proprio riferimento (maggiore: <em>Do–Re–Mi–Fa–Sol–La–Ti–Do</em>, minore: <em>Do–Re–Me–Fa–Sol–Le–Te–Do</em> oppure <em>numeri</em> in opzione), circondati da un tasto di margine; il resto rimane attenuato.</li>
        <li><strong>4. Errori silenziosi &amp; risoluzione naturale:</strong> Un tasto sbagliato lampeggia in rosso senza suono per preservare la tua memoria tonale. Il tasto corretto si illumina di verde e suona la sua risoluzione verso la tonica (<code>Do–Fa</code> verso il basso, <code>Sol–Ti/Te</code> verso l’alto).</li>
      </ul>

      <h3>Maggiore, Minore &amp; Tonalità libera (progressione)</h3>
      <ul class="article-steps-list">
        <li><strong>Livelli 1 &amp; 2 – Metà di scala (4 note):</strong> Ingresso graduale con soli 4 tasti attivi: prima la metà inferiore <code>Do–Fa</code> e poi la superiore <code>Sol–Do</code> in <code>Do maggiore</code> o <code>Do minore</code> fisso.</li>
        <li><strong>Livelli 3 &amp; 4 – Scala completa (1 ottava):</strong> Tutti e 7 i gradi in <code>Do maggiore</code> / <code>Do minore</code> (livello 3) o in una tonalità casuale fissa per tutta la sessione (livello 4).</li>
        <li><strong>Livelli 5 &amp; 6 – Più ottave:</strong> I gradi saltano in ottave gravi o acute in <code>Do maggiore</code> / <code>Do minore</code> fisso (livello 5) o in una tonalità casuale fissa (livello 6).</li>
        <li><strong>Livelli 7 &amp; 8 – Modulazioni:</strong> Ogni risposta corretta cambia tonalità: prima in 1 ottava (livello 7) e poi su più ottave (livello 8).</li>
        <li><strong>Maggiore e Minore completi:</strong> Tutti gli 8 livelli esistono in modo simmetrico per maggiore e minore naturale.</li>
        <li><strong>Tonalità libera (Maggiore e Minore):</strong> Scegli modo (maggiore/minore), una qualsiasi delle 12 tonalità (o casuale), ambito (<code>Do–Fa</code>, <code>Sol–Do</code>, <code>Scala completa</code>) e ottava prima di iniziare o in qualsiasi momento dal badge in alto a destra dell’esercizio.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Aiuti, cantare, etichette &amp; esame</h4>
        <p>In alto, <strong>Canta</strong> (con <em>pausa per canticchiare</em> opzionale) ti invita a cantare fino al Do / 1, accanto alla regolazione del <strong>Tempo (BPM)</strong>. Sopra la tastiera trovi il <strong>badge della tonalità</strong> (suona l’accordo di tonica maggiore o minore), <strong>Tonica (Do)</strong> e <strong>Ripeti</strong>. Sotto, il pulsante viola <strong>Loop</strong> ripete la nota ogni 3 secondi e <strong>Solo ascolto</strong> risolve automaticamente. Alterna tra <strong>Sillabe</strong> e <strong>Numeri</strong> (<code>1–7</code> / <code>b3, b6, b7</code>) o <strong>Avanti automatico</strong> nelle <strong>Impostazioni</strong>, e affronta l’<strong>Esame di categoria</strong> (Maggiore, Minore, Metà, Maggiore e Minore alternati o Tonalità libera).</p>
      </div>
    `
  },
  rhythm: {
    tagClass: "tag-sage",
    tag: "Istruzioni • Ritmo",
    title: "Come funziona l’allenamento ritmico",
    lead: "Quattro moduli complementari allenano indicazioni di tempo, dettato ritmico, riproduzione a orecchio &amp; lettura ritmica a prima vista e microtiming di groove — mostrati su un rigo ritmico a una linea e regolabili per tempo (BPM).",
    sections: `
      <h3>I 4 moduli di ritmo</h3>
      <ul class="article-steps-list">
        <li><strong>1. Metro &amp; indicazione di tempo (3 livelli):</strong> Ascolta due battute di percussione (battito <code>1</code> accentato) e distingui <code>4/4</code> &amp; <code>3/4</code> (livello 1), <code>2/4</code> &amp; <code>6/8</code> (livello 2) e i tempi irregolari <code>5/4</code> &amp; <code>7/8</code> (livello 3). <strong>Pulsazione di semiminima</strong> offre in qualsiasi momento il riferimento neutro.</li>
        <li><strong>2. Dettato ritmico (4 battiti, 4 livelli):</strong> Sul rigo a una linea suona un pattern di 4 battiti alle claves dopo 1 battuta di conteggio iniziale. Riempi ogni battito passo dopo passo (semiminime, crome, pause, levare, terzine, semicrome e sincopi) con <strong>Metronomo (1–4)</strong>, <strong>Ripeti il battito</strong> (o toccando una scheda) e <strong>Avanti automatico</strong>.</li>
        <li><strong>3. Pad: riproduzione &amp; lettura a prima vista (4 livelli ciascuno):</strong> Nella modalità <strong>Riproduci sul pad</strong>, ascolta il conteggio iniziale + la demo e poi batti sul grande <strong>tap pad</strong> (o <code>Spazio</code>), con <strong>Click: sì/no</strong>, <strong>Solo ascolto</strong> e, al livello 4, la <em>modalità alla cieca</em>. Nella modalità <strong>Suona i ritmi a prima vista</strong> non c’è alcuna demo preliminare: leggi il pattern direttamente sul rigo e batti col metronomo appena finisce il conteggio iniziale (livello 4: <em>senza metronomo</em>). Subito dopo, una <strong>linea temporale</strong> valuta ogni tocco (<code>preciso</code>, <code>al limite ±ms</code>, <code>mancato</code>, <code>di troppo</code>).</li>
        <li><strong>4. Groove, levare &amp; microtiming (4 livelli):</strong> Livello 1: <em>stili di groove</em> (marcia, backbeat, sincope, swing, 3 contro 2); livello 2: <em>accento di campanaccio</em> in levare (<code>1</code>–<code>4+</code>); livello 3: <em>microtiming (±55 ms)</em> e livello 4: <em>microtiming pro (±28 ms)</em> (in anticipo, in the pocket o laid-back).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Consigli &amp; esame di categoria</h4>
        <p>Inizia <strong>Riproduci sul pad</strong> con il <strong>click attivo</strong> intorno a 80–95 BPM e attiva <strong>Avanti automatico</strong> in basso a sinistra se preferisci. Quando la tua pulsazione è salda, accetta la sfida della <strong>modalità alla cieca</strong>, della <strong>lettura ritmica senza metronomo</strong>, di <strong>Solo ascolto</strong> o dell’<strong>Esame</strong> su 4 livelli.</p>
      </div>
    `
  },
  production: {
    tagClass: "tag-lilac",
    tag: "Istruzioni • Produzione & mix",
    title: "Come funziona l’allenamento su frequenze & equalizzazione",
    lead: "Calibra le tue orecchie da mix sulle bande standard da studio: si parte da sinusoidi pure su 5–12 bande fino al boost parametrico dal vivo su rumore rosa.",
    sections: `
      <h3>I 2 moduli di produzione</h3>
      <ul class="article-steps-list">
        <li><strong>1. Riconoscere frequenze pure (sinusoide, 3 livelli):</strong> Ascolta un tono puro calibrato dai sub-bassi (<code>63 Hz</code>) agli alti d’aria (<code>12 kHz</code>) su <strong>5 bande</strong>, <strong>8 bande d’ottava</strong> o <strong>12 bande</strong>. Tocca <strong>«Rif.: 1 kHz»</strong> per ricalibrare l’orecchio in qualsiasi momento.</li>
        <li><strong>2. Boost EQ su rumore rosa (3 livelli):</strong> Nella <strong>pratica libera</strong>, il rumore rosa parte subito in modo continuo <strong>con il boost EQ attivo</strong> (livello 1: EQ largo <code>+10 dB / Q 1,6</code>, livello 2: EQ d’ottava <code>+8,5 dB / Q 2,6</code>, livello 3: chirurgico <code>+7 dB / Q 4,2</code>). Passa liberamente al rumore neutro non processato con la scheda <strong>Flat</strong> o il pulsante <strong>«Bypass Flat»</strong> (<code>Flat: SÌ</code>). Nella modalità <strong>Solo ascolto</strong>, senti prima il rumore <em>Flat</em> e poi, più a lungo, il <em>boost EQ</em> prima che venga mostrata la banda corretta.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Protezione uditiva, confronto &amp; esame</h4>
        <p>Il rumore rosa cala di 3 dB per ottava per bilanciare l’energia percepita. Un limiter a -14 dBFS, una ponderazione attorno a 2–4 kHz e dissolvenze morbide proteggono il tuo udito. Dopo un errore, il <strong>confronto A/B</strong> e <strong>Flat → EQ target</strong> confrontano i due segnali, e tutti e 3 i livelli fanno parte dell’<strong>Esame di categoria</strong>.</p>
      </div>
    `
  },
  modes: {
    tagClass: "tag-peach",
    tag: "Istruzioni • Scale & modi",
    title: "Come funziona l’allenamento su scale & modi",
    lead: "Dimentica la memorizzazione astratta: ascolta ogni modo in tutto il suo colore musicale — sulla stessa fondamentale o trasposto in altre tonalità — con un tappeto d’archi sulla fondamentale attivabile a piacere.",
    sections: `
      <h3>I 3 moduli modali</h3>
      <ul class="article-steps-list">
        <li><strong>1. Riconoscere la scala / il modo (3 livelli):</strong> Prima suona una <strong>quinta di ancoraggio</strong> neutra (senza terza), seguita dalla scala ascendente di 8 note: 4 modi di base al livello 1 (<code>ionico, eolio, dorico, misolidio</code>), tutti e 7 su <code>Do</code> al livello 2 e tutti e 7 trasposti al livello 3.</li>
        <li><strong>2. Nota caratteristica &amp; colore (3 livelli):</strong> Dopo la quinta di ancoraggio, un breve giro isola il grado distintivo (<code>#4</code> lidio, <code>b7</code> misolidio, <code>♮6</code> dorico, <code>b2</code> frigio oppure la sensibile <code>#7</code> della <strong>minore armonica</strong>), suddiviso in modi maggiori (livello 1), minori (livello 2) e tutti + minore armonica su fondamentali variate (livello 3).</li>
        <li><strong>3. Cadenze &amp; loop di accordi modali (2 livelli):</strong> Concatenazioni caratteristiche di due accordi (<code>i – IV</code> dorico, <code>I – bVII</code> misolidio, <code>I – II</code> lidio, <code>i – bII</code> frigio): 4 loop standard in <code>Do</code> (livello 1) e poi tutti e 6 i loop modali trasposti (livello 2). Un loop di accordi è formato da due accordi che si alternano continuamente rendendo subito udibile il colore del modo.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Tappeto di fondamentale, quinta di ancoraggio &amp; A/B</h4>
        <p>Ragiona in parallelo e non in relativo: confronta ogni modo sulla <strong>stessa fondamentale</strong>. Il pulsante <strong>«Tappeto di fondamentale: sì/no»</strong> aggiunge un tappeto d’archi continuo sotto il modo; tocca <strong>«Quinta di ancoraggio»</strong> (o la scheda a sinistra) in qualsiasi momento e confronta direttamente due colori dopo un errore con il <strong>confronto A/B</strong>. <strong>Loop</strong>, <strong>Solo ascolto</strong> e l’<strong>Esame</strong> su 3 livelli sono inclusi.</p>
      </div>
    `
  },
  warmup: {
    tagClass: "tag-sage",
    tag: "Istruzioni • Riscaldamento vocale",
    title: "Come funziona il riscaldamento vocale guidato",
    lead: "Pensato per prove di coro, lezioni di canto e routine quotidiane: scegli tra 5 registri vocali (SATB) e avvia uno dei 5 programmi guidati, con sfera di respirazione, tastiera interattiva e trasposizione istantanea.",
    sections: `
      <h3>5 programmi a scelta &amp; 4 fasi</h3>
      <ul class="article-steps-list">
        <li><strong>5 programmi mirati:</strong> In base al tempo che hai, avvia il <strong>Riscaldamento completo (5 min)</strong> (4 fasi, 11 esercizi con scale maggiori e minori), il <strong>Riscaldamento rapido (~3 min)</strong>, <strong>Scale (Maggiore e Minore)</strong>, <strong>Arpeggi &amp; passaggio di registro</strong> oppure <strong>Respirazione corale &amp; intonazione</strong>.</li>
        <li><strong>Fase 1 – Respiro &amp; corpo:</strong> Una sfera di respirazione su <code>ffff / ssss</code> e morbidi impulsi (<code>P – T – K</code>) risvegliano il sostegno addominale senza tensioni alla laringe.</li>
        <li><strong>Fase 2 – Risonanza &amp; impostazione:</strong> Bocca chiusa / vibrazione labiale (<code>Mmm / Brrr</code>) e sospiri discendenti di quinta (<code>5–4–3–2–1</code>) collegano dolcemente i registri.</li>
        <li><strong>Fasi 3 &amp; 4 – Scale, arpeggi &amp; coro:</strong> Scale complete d’ottava in <strong>maggiore e minore naturale, armonica e melodica</strong> insieme ad arpeggi che modulano per semitoni adattati a <strong>coro medio, soprano, contralto, tenore o basso</strong>, seguiti dallo scorrimento vocalico (<code>U → O → A → E → I</code>) e da un accordo SATB sovrapposto.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Comandi dal vivo &amp; tastiera</h4>
        <p>In alto cambi in qualsiasi momento <strong>Registro vocale (SATB)</strong>, <strong>Suono di accompagnamento</strong> (pianoforte, pianoforte + voce o voce) e <strong>Tempo</strong>, oppure navighi tra i passaggi con le <strong>pillole di fase</strong>. Sotto regoli con <strong>«−1 / +1 semitono»</strong> e <strong>«Ripeti»</strong>, oppure suoni direttamente note di riferimento sulla <strong>tastiera interattiva</strong>.</p>
      </div>
    `
  },
  notation: {
    tagClass: "tag-sage",
    tag: "Istruzioni • Notazione & lettura delle note",
    title: "Come funziona l’allenamento di lettura delle note",
    lead: "Sviluppa una lettura a prima vista fluida in 6 modalità: chiavi di violino (Sol), basso (Fa) e contralto (Do sulla 3ª riga), mix di chiavi, doppio pentagramma pianistico e lettura di accordi (con rivolti &amp; settime).",
    sections: `
      <h3>Le 6 modalità &amp; l’inserimento</h3>
      <ul class="article-steps-list">
        <li><strong>1. Lettura di note singole (flusso di 6 note):</strong> In chiave di <strong>violino</strong>, <strong>basso</strong>, <strong>contralto</strong>, in <strong>mix di chiavi</strong> (alterna ogni 3 note con avviso) o sul <strong>doppio pentagramma</strong> (Sol + Fa uniti da una graffa), la fascia colorata a sinistra indica la nota da suonare sulla tastiera per far avanzare la fila.</li>
        <li><strong>2. Leggere gli accordi (5 accordi, scelta multipla):</strong> Sul pentagramma compaiono triadi e accordi di settima sovrapposti. Scegli la <strong>scheda simbolo</strong> corretta (es. <code>E, Em, E7, Esus4</code>) su <strong>4 livelli</strong>: livello 1 (triadi in Sol), livello 2 (triadi in Fa), livello 3 (rivolti in entrambe le chiavi) e livello 4 (tutti i tipi &amp; settime).</li>
        <li><strong>3. Errori &amp; pulsante Salta:</strong> Un tasto o una scheda sbagliati si illuminano di rosso e mettono in pausa la fila per verificare con calma chiave, alterazione o rivolto. Tocca <strong>Salta</strong> per vedere la risposta e proseguire.</li>
      </ul>

      <h3>Livelli &amp; armature di chiave</h3>
      <ul class="article-steps-list">
        <li><strong>Note singole, livelli 1–4:</strong> Livello 1 (5 righe &amp; 4 spazi), livello 2 (<code>±2 tagli addizionali</code>), livello 3 (<code>±3 tagli addizionali</code>) e livello 4 con diesis/bemolli (<code>♯</code>/<code>♭</code>) o <strong>bequadri (<code>♮</code>)</strong> quando è attiva un’armatura di chiave, in notazione internazionale o tedesca.</li>
        <li><strong>Lettura con armature di chiave (1–6 ♯/♭):</strong> Seleziona una tonalità precisa o un gruppo a rotazione (facile, intermedio, tutte) nella pagina di notazione oppure tramite <strong>Tonalità</strong> durante l’esercizio.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Comandi audio, solo ascolto &amp; esame</h4>
        <p>Sopra le risposte, <strong>Suono della nota: sì/no</strong> silenzia del tutto l’audio per leggere a prima vista in silenzio. Sotto, <strong>▶ Ascolta la nota</strong> / <strong>▶ Ascolta l’accordo</strong> offre un riferimento opzionale nella pratica libera, mentre nell’<strong>Esame di categoria</strong> (6 livelli) il pulsante diventa <strong>▶ Riferimento</strong> (<code>Sol4</code> / <code>Fa3</code> / <code>Do4</code>) per non svelare la soluzione. A destra, <strong>Solo ascolto</strong> avanza con lettura automatica secondo il <strong>Tempo</strong> scelto (da <em>molto lento</em> a <em>molto veloce</em>).</p>
      </div>
    `
  }
};
function renderRhythmReferenceHTML_IT() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Pulsazione &amp; metri</span>
        <span class="k-ratio-chip">Indicazione di tempo</span>
      </div>
      <h4>Ciò che struttura ogni brano nel tempo</h4>
      <p>
        Quasi tutta la musica respira grazie a un battito regolare chiamato <strong>pulsazione (o battito)</strong>. La sua velocità si misura in <strong>BPM</strong> (<em>battiti al minuto</em>). La <strong>battuta</strong> raggruppa queste pulsazioni in cicli regolari, particolarmente percepibili sul <strong>primo movimento (tempo forte / battere)</strong>.
      </p>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Tempo di 4/4 (quattro quarti)</strong>
          <span>Quattro semiminime per battuta (<strong>1</strong>–2–3–4). Il pilastro di quasi tutto il pop, il rock, l’hip-hop e il funk.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Tempo di 3/4 (valzer)</strong>
          <span>Tre semiminime per battuta (<strong>1</strong>–2–3). Un dondolio circolare (<em>Il bel Danubio blu</em>, <em>Tanti auguri a te</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Tempo di 6/8 (binario composto)</strong>
          <span>Sei crome raggruppate in due grandi movimenti ternari (<strong>1</strong>-2-3-<strong>4</strong>-5-6): la spinta ondeggiante delle ballate (<em>Nothing Else Matters</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Tempo di 5/4 (tempo irregolare)</strong>
          <span>Raggruppamento asimmetrico 3 + 2 (o 2 + 3), reso celebre da <em>Take Five</em> di Dave Brubeck o dal tema di <em>Mission: Impossible</em>.</span>
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="meter-4-4">▶ 4/4 standard</button>
        <button class="btn-tool" data-play-rhythm="meter-3-4">▶ 3/4 valzer</button>
        <button class="btn-tool" data-play-rhythm="meter-6-8">▶ 6/8 ternario</button>
        <button class="btn-tool" data-play-rhythm="meter-5-4">▶ 5/4 asimmetrico (3+2)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Figure &amp; suddivisioni</span>
        <span class="k-ratio-chip">1 · 2 · 3 · 4</span>
      </div>
      <h4>Come si divide ogni pulsazione</h4>
      <p>
        Mentre la grancassa ancora la pulsazione principale, i musicisti dividono ogni movimento in frazioni più sottili (<strong>suddivisioni</strong>). Aggiungere un <strong>punto di valore</strong> dopo una nota ne prolunga la durata della metà, creando quel tipico slancio «lunga-breve».
      </p>
      <ul class="k-physics-list">
        <li><strong>Semibrevi &amp; minime:</strong> Note lunghe che coprono rispettivamente 4 movimenti o 2 movimenti.</li>
        <li><strong>Semiminime:</strong> Un colpo esattamente su ogni movimento principale (<em>1 – 2 – 3 – 4</em>).</li>
        <li><strong>Crome:</strong> Due colpi uguali per movimento (<em>1-e – 2-e</em>).</li>
        <li><strong>Terzine:</strong> Tre note regolari dentro un solo movimento (<em>ter-zi-na</em> / <em>1-2-3 – 2-2-3</em>).</li>
        <li><strong>Semicrome:</strong> Quattro colpi serrati per movimento (<em>1-ta-te-ta</em>): il motore dei groove funk e degli hi-hat trap.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="sub-quarter">▶ Semiminime (1×)</button>
        <button class="btn-tool" data-play-rhythm="sub-eighth">▶ Crome (2×)</button>
        <button class="btn-tool" data-play-rhythm="sub-triplet">▶ Terzine (3×)</button>
        <button class="btn-tool" data-play-rhythm="sub-sixteenth">▶ Semicrome (4×)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Groove, backbeat &amp; swing</span>
        <span class="k-ratio-chip">Battere vs. levare</span>
      </div>
      <h4>Perché lo stesso tempo di 4/4 cambia completamente anima</h4>
      <p>
        Che un ritmo faccia marciare a passo di parata o muovere la testa senza accorgersene dipende interamente da dove cadono gli accenti:
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Marcia vs. backbeat (2 &amp; 4)</h5>
          <p>Accentuare i movimenti <strong>1 &amp; 3</strong> suona come una banda di paese. Sposta il colpo di rullante su <strong>2 &amp; 4</strong> (il <em>backbeat</em>) e all’istante nascono il pop, il rock e il soul!</p>
          <button class="btn-tool" data-play-rhythm="beat-march">▶ Marcia (1 &amp; 3)</button>
          <button class="btn-tool" data-play-rhythm="beat-backbeat">▶ Backbeat (2 &amp; 4)</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Sincope &amp; swing / shuffle</h5>
          <p>La <strong>sincope</strong> sposta l’accento sui tempi deboli in levare («e»). Nello <strong>swing</strong>, le crome rimbalzano in modo disuguale (circa 2:1 in terzina invece di un 1:1 binario dritto).</p>
          <button class="btn-tool" data-play-rhythm="beat-syncopation">▶ Groove sincopato</button>
          <button class="btn-tool" data-play-rhythm="beat-swing">▶ Feeling swing</button>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Poliritmia &amp; brani di riferimento</span>
        <span class="k-ratio-chip">3 contro 2</span>
      </div>
      <h4>Due orologi simultanei + brani di riferimento indimenticabili</h4>
      <p>
        La <strong>poliritmia</strong> sovrappone allo stesso tempo due griglie ritmiche contrastanti; la più celebre è il <strong>3 contro 2</strong> (il woodblock divide la battuta in 3 mentre la grancassa scandisce 2 colpi regolari nello stesso intervallo). Ricorda Fisica &amp; suono: in altezza, questo stesso rapporto <code>3:2</code> genera la quinta giusta.
      </p>
      <div class="k-meta-box">
        <strong>Associare i metri a brani indimenticabili:</strong>
        <ul class="k-physics-list" style="margin-top:0.25rem;">
          <li><strong>4/4:</strong> «We Will Rock You» (Queen) • «Billie Jean» (Michael Jackson)</li>
          <li><strong>3/4:</strong> «Piano Man» (Billy Joel) • valzer viennese classico</li>
          <li><strong>6/8:</strong> «Nothing Else Matters» (Metallica) • «We Are the Champions» (Queen)</li>
          <li><strong>5/4:</strong> «Take Five» (Dave Brubeck) • «Mission: Impossible»</li>
        </ul>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="poly-3-2">▶ Ascolta la poliritmia «3 contro 2»</button>
      </div>
    </article>
  `;
}

const RHYTHM_INSTRUMENTS_DATA_IT = [
  {
    category: "drumset",
    tag: "Batteria • Base grave",
    tagClass: "tag-peach",
    name: "Grancassa / kick",
    role: "Peso e impatto sulle basse (~50–120 Hz)",
    desc: "Il tamburo più grande della batteria, suonato con il piede tramite un pedale. Ancora i tempi pesanti (spesso 1 e 3, oppure tutte e quattro le semiminime nella musica elettronica) e si aggancia al basso.",
    rhythmKey: "inst-kick",
    btnLabel: "Ascolta la grancassa"
  },
  {
    category: "drumset",
    tag: "Batteria • Schiocco del backbeat",
    tagClass: "tag-peach",
    name: "Rullante (snare)",
    role: "Accento secco sui movimenti 2 e 4",
    desc: "Una cordiera metallica tesa sotto la pelle risonante vibra a ogni colpo, producendo lo schiocco incisivo del pop/rock, le sottili ghost note e i rulli serrati.",
    rhythmKey: "inst-snare",
    btnLabel: "Ascolta rullante e rullo"
  },
  {
    category: "drumset",
    tag: "Batteria • Suddivisioni",
    tagClass: "tag-peach",
    name: "Hi-hat (charleston) & piatti (ride / crash)",
    role: "Precisione del flusso e punteggiatura della struttura",
    desc: "Due piatti azionati a pedale (hi-hat) suddividono crome o semicrome con scioltezza. Il grande piatto ride sostiene lo swing del jazz, mentre i piatti crash sottolineano l’ingresso del ritornello.",
    rhythmKey: "inst-hat",
    btnLabel: "Ascolta la suddivisione dell’hi-hat"
  },
  {
    category: "drumset",
    tag: "Batteria • Fill melodici",
    tagClass: "tag-peach",
    name: "Tom (tom acuti & timpano)",
    role: "Transizioni, fill e discese a cascata",
    desc: "Tamburi intonati privi di cordiera inferiore. Disposti dall’acuto al grave, percorrono la batteria per annunciare l’arrivo del ritornello.",
    rhythmKey: "inst-toms",
    btnLabel: "Ascolta un fill di tom"
  },
  {
    category: "world",
    tag: "Percussione a mano • Versatile",
    tagClass: "tag-lilac",
    name: "Cajón (cajón peruviano)",
    role: "Minibatteria acustica portatile",
    desc: "Originario del Perù, questa cassa di legno su cui ci si siede produce un basso profondo al centro e uno schiocco da rullante grazie alle corde interne tese sotto il bordo superiore."
  },
  {
    category: "world",
    tag: "Percussione a mano • Latina & pop",
    tagClass: "tag-lilac",
    name: "Conga & bongo",
    role: "Groove cantabili e fioriture frizzanti",
    desc: "Grandi tamburi afrocubani suonati in coppia. Le conga dispiegano tumbao caldi e cantabili, mentre i piccoli bongo brillano sopra con i loro attacchi schioccanti.",
    rhythmKey: "inst-conga",
    btnLabel: "Ascolta un tumbao di conga"
  },
  {
    category: "world",
    tag: "Mani & orchestra sinfonica",
    tagClass: "tag-lilac",
    name: "Djembé, darbuka & timpani d’orchestra",
    role: "Dinamica dal sussurro al tuono",
    desc: "I tamburi a calice come il djembé dell’Africa occidentale uniscono bassi rotondi e slap taglienti. Nell’orchestra sinfonica, i timpani intonati a pedale danno un’altezza precisa ai colpi di tuono."
  },
  {
    category: "small",
    tag: "Riferimento temporale • Legno",
    tagClass: "tag-sage",
    name: "Claves & woodblock",
    role: "Bussola ritmica di precisione chirurgica",
    desc: "Due legnetti di legno duro percossi l’uno contro l’altro. Anche se stanno in una mano, il loro attacco secco buca un’intera big band, formando l’ossatura della clave di son 3–2 nella salsa e nelle musiche latine.",
    rhythmKey: "inst-clave",
    btnLabel: "Ascolta la clave di son 3–2"
  },
  {
    category: "small",
    tag: "Piccola percussione • Movimento",
    tagClass: "tag-sage",
    name: "Shaker, maracas & tamburello",
    role: "Spinta in avanti e trama ariosa",
    desc: "Gli shaker riempiti di pallini tessono un flusso continuo di semicrome che lega grancassa e rullante, iniettando una spinta immediata anche nei tempi lenti.",
    rhythmKey: "inst-shaker",
    btnLabel: "Ascolta il tappeto di shaker"
  },
  {
    category: "small",
    tag: "Piccola percussione • Metallo",
    tagClass: "tag-sage",
    name: "Campanaccio (cowbell), agogò & triangolo",
    role: "Levari penetranti e accenti brillanti",
    desc: "Voci metalliche incisive, amatissime nel funk, nella disco e nelle musiche afrolatine, come il dialogo su due altezze delle campane agogò.",
    rhythmKey: "inst-cowbell",
    btnLabel: "Ascolta il riff di campanaccio"
  },
  {
    category: "small",
    tag: "Mai sottovalutarli!",
    tagClass: "tag-sage",
    name: "Basso elettrico, contrabbasso & chitarra ritmica",
    role: "Il ponte tra ritmo e armonia",
    desc: "Il groove non dipende solo dal batterista! Grancassa e basso formano il motore della sezione ritmica, mentre le pennate stoppate di chitarra o di Clavinet funzionano come una vera percussione melodica."
  }
];

function renderRhythmInstrumentsHTML_IT(filterCat = "all") {
  const ensembleCard = `
    <div class="article-highlight-box" style="margin-bottom:0.2rem;">
      <h4>Come le percussioni si spartiscono lo stesso groove (distribuzione delle frequenze):</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-dark); line-height:1.4;">
        Ogni strumento occupa la propria fascia sonora per mantenere un groove nitido: la <strong>grancassa</strong> in fondo, il <strong>rullante</strong> che schiocca sui medi, <strong>hi-hat &amp; shaker</strong> che brillano in alto.
      </p>
      <div class="k-btn-row" style="margin-top:0.35rem;">
        <button class="btn-tool" data-play-rhythm="band-groove">▶ Groove d’insieme (kick + snare + hi-hat + shaker)</button>
      </div>
    </div>
  `;

  const items = RHYTHM_INSTRUMENTS_DATA_IT.filter(item => filterCat === "all" || item.category === filterCat);
  return (filterCat === "all" ? ensembleCard : "") + items.map(item => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${item.tagClass}">${item.tag}</span>
        <span class="k-ratio-chip">${item.role.split("(")[0].trim()}</span>
      </div>
      <h4>${item.name}</h4>
      <p><strong>Funzione:</strong> ${item.role}</p>
      <p>${item.desc}</p>
      ${item.rhythmKey ? `
        <div class="k-btn-row">
          <button class="btn-tool" data-play-rhythm="${item.rhythmKey}">▶ ${item.btnLabel}</button>
        </div>
      ` : ""}
    </article>
  `).join("");
}

function renderVocalsReferenceHTML_IT() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">La voce umana</span>
        <span class="k-ratio-chip">Il primo strumento</span>
      </div>
      <h4>Come produce il suono la voce umana</h4>
      <p>La tua voce riunisce tre sistemi acustici completi in un solo strumento vivo. A differenza di una chitarra o di un flauto, la sua «cassa di risonanza» cambia forma in pochi millisecondi, scolpendo insieme altezza, potenza, armonici, vocali e consonanti.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>1. La fonte di energia (respiro &amp; appoggio)</strong>
          Inspirando, il <em>diaframma</em> scende per espandere i polmoni. Nel canto, addominali e intercostali regolano una <em>pressione sottoglottica</em> costante («appoggio del fiato») senza mai stringere la gola.
        </div>
        <div class="physics-fact-item">
          <strong>2. Il vibratore (laringe &amp; corde vocali)</strong>
          Nella laringe sono tese due <em>pliche vocali</em> elastiche. Il flusso d’aria le attira l’una contro l’altra e poi le separa a ritmo regolare (da 100 a 1000 volte al secondo grazie all’<em>effetto Bernoulli</em>), generando un suono grezzo ricco di armonici.
        </div>
        <div class="physics-fact-item">
          <strong>3. Il risonatore (tratto vocale &amp; formanti)</strong>
          Gola, bocca e cavità nasali filtrano quel suono grezzo. Muovere lingua, mandibola, labbra e palato molle sposta dei picchi di risonanza chiamati <em>formanti</em>, che trasformano una «U» rotonda in una «I» brillante.
        </div>
        <div class="physics-fact-item">
          <strong>4. La formante del cantante (~3000 Hz)</strong>
          Ampliando la faringe inferiore, i cantanti lirici concentrano l’energia attorno a 2,8–3,2 kHz, proprio dove lo spettro dell’orchestra lascia spazio. Così una voce senza microfono può svettare sopra 80 strumenti!
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C4,E4,G4,C5" data-dur="1.9" data-step="0">▶ Ascolta un accordo corale</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Registri &amp; tecniche</span>
        <span class="k-ratio-chip">Colori vocali</span>
      </div>
      <h4>Registri vocali &amp; tecniche di canto</h4>
      <p>A seconda dei muscoli laringei coinvolti, e a seconda che le corde vocali vibrino in tutto il loro spessore o solo sui bordi sottili, la voce cambia radicalmente carattere:</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Voce di petto (registro modale, M1)</strong>
          L’intera massa muscolare delle corde vocali vibra insieme. Offre un timbro caldo, radicato e corposo: è il nostro registro naturale nel parlato e la base di potenza nel registro grave e medio.
        </div>
        <div class="physics-fact-item">
          <strong>Voce di testa &amp; falsetto (M2)</strong>
          Le corde vocali si allungano e si assottigliano per vibrare solo lungo il bordo esterno. Regala un colore leggero, flautato e arioso (voce di testa lirica omogenea o <em>falsetto</em> velato).
        </div>
        <div class="physics-fact-item">
          <strong>Voce mista</strong>
          Costruisce un ponte fluido attraverso il <em>passaggio</em> (la transizione tra i registri). Un equilibrio muscolare preciso mantiene un timbro uniforme dal grave all’acuto senza scalini improvvisi.
        </div>
        <div class="physics-fact-item">
          <strong>Belting (pop, musical, gospel)</strong>
          Porta la solidità della voce di petto fino agli acuti grazie a un appoggio fermo e a vocali aperte: presenza diretta e potente verso Sol5/Do6.
        </div>
        <div class="physics-fact-item">
          <strong>Vibrato</strong>
          Un’oscillazione naturale, elastica e periodica di altezza e intensità attorno ai 5–7 Hz. Dona calore alle note tenute e aiuta una voce solista a emergere sul coro.
        </div>
        <div class="physics-fact-item">
          <strong>Scat &amp; canto difonico (armonico)</strong>
          Lo <em>scat</em> jazzistico imita gli assoli degli strumenti a fiato con sillabe ritmiche («shoo-be-doo»). Nel <em>canto difonico</em>, la posizione precisa della lingua amplifica uno stretto armonico sopra un bordone, fino a far sentire due note simultanee!
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">Scrittura corale (SATB)</span>
        <span class="k-ratio-chip">Sezioni &amp; tessiture</span>
      </div>
      <h4>Nel cuore del coro: sezioni SATB &amp; tessiture</h4>
      <p>I cori misti di tutto il mondo seguono l’ordine <strong>SATB</strong>, nominato dall’acuto al grave secondo le quattro grandi sezioni vocali. I grandi cori sinfonici dividono spesso ogni sezione in divisi I e II, formando otto voci: <em>SSAATTBB</em>.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Soprano (S) • Estensione tipica Do4–Do6 (C4–C6)</strong>
          La voce femminile o bianca più acuta. Porta di solito la melodia principale, le armonie superiori e la brillantezza cristallina.
        </div>
        <div class="physics-fact-item">
          <strong>Contralto (A) • Estensione tipica Fa3–Mi5 (F3–E5)</strong>
          La voce femminile grave (o controtenore). Alimenta il calore interno dell’armonia (terze, settime, ritardi espressivi) subito sotto la melodia.
        </div>
        <div class="physics-fact-item">
          <strong>Tenore (T) • Estensione tipica Do3–La4 (C3–A4)</strong>
          La voce maschile acuta (spesso scritta in chiave di violino ottavata, che suona un’ottava sotto!). Collega la metà alta e quella bassa con controcanti lirici o acuti luminosi.
        </div>
        <div class="physics-fact-item">
          <strong>Basso (B) • Estensione tipica Mi2–Mi4 (E2–E4)</strong>
          La sezione maschile più grave e la base acustica del coro. I bassi fissano la fondamentale: quando sono perfettamente intonati, l’intero accordo si allinea di colpo.
        </div>
        <div class="physics-fact-item">
          <strong>Mezzosoprano, baritono &amp; controtenore</strong>
          Tre voci intermedie fondamentali: <em>mezzosoprano</em> (La3–La5, ricco ponte tra soprano e contralto), <em>baritono</em> (Sol2–Sol4, la tessitura maschile più diffusa) e <em>controtenore</em> (tessitura maschile di contralto con voce di testa educata).
        </div>
        <div class="physics-fact-item">
          <strong>Altre formazioni vocali</strong>
          I <em>cori a voci pari femminili (SSAA)</em> e i <em>cori maschili (TTBB / barbershop)</em> stringono gli accordi per esaltare gli armonici. I gruppi <em>a cappella</em> moderni aggiungono il beatbox come batteria.
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G4,B4,D5,G5" data-dur="0.95" data-step="320">▶ Registro di soprano</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G3,Bb3,D4,F4" data-dur="0.95" data-step="320">▶ Registro di contralto</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,E3,G3,B3" data-dur="0.95" data-step="320">▶ Registro di tenore</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="E2,G2,B2,E3" data-dur="1.05" data-step="340">▶ Base del basso</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Intonazione &amp; ascolto</span>
        <span class="k-ratio-chip">Intonazione giusta</span>
      </div>
      <h4>Perché un coro a cappella suona a volte più puro di un pianoforte</h4>
      <p>I pianoforti sono accordati secondo il <strong>temperamento equabile a 12 semitoni</strong>: le loro terze maggiori risultano circa 14 cent più alte affinché tutte le dodici tonalità restino praticabili. I cantanti, invece, non sono vincolati a tasti o martelletti fissi.</p>
      <p>Quando cantano senza accompagnamento, i buoni coristi regolano istintivamente i propri intervalli verso i <strong>rapporti puri dell’intonazione giusta</strong> (2:1 ottava, 3:2 quinta, 5:4 terza maggiore). Nell’istante in cui la terza maggiore si incastra senza alcun battimento, gli armonici comuni si rinforzano a vicenda e l’intero accordo sboccia all’improvviso con una brillantezza sorprendente (il celebre «barbershop ring»).</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="1.4" data-step="460">▶ Impila voce per voce (basso → sop.)</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="2.4" data-step="0">▶ Accordo corale SATB completo</button>
        <button class="btn-tool" data-open-warmup="true">▶ Apri il riscaldamento vocale di 5 min</button>
      </div>
    </article>
  `;
}


const INSTRUMENT_MODULES_DATA_IT = {
  strings: {
    title: "Archi",
    subtitle: "Fisica dell’arco, famiglia degli archi d’orchestra e articolazioni",
    intro: {
      tag: "Fisica & liuteria",
      tagClass: "tag-peach",
      chip: "Moto «stick-slip» di Helmholtz",
      heading: "Come l’arco fa cantare le corde",
      body: "I crini di cavallo strofinati con la <em>pece greca (colofonia)</em> agganciano e rilasciano la corda centinaia di volte al secondo in un ciclo netto di aderenza e scorrimento. Un <em>ponticello</em> intagliato in acero trasmette queste vibrazioni alla tavola armonica cava in abete rosso, sostenuta all’interno dall’anima e dalla catena. Senza tasti, gli archi intonano ogni nota liberamente con purezza."
    },
    items: [
      {
        name: "Violino",
        tag: "Soprano degli archi",
        tagClass: "tag-peach",
        range: "Sol3 – La7 (G3 – A7)",
        tuning: "Accordato per quinte: Sol3 – Re4 – La4 – Mi5",
        role: "Melodia principale, brillantezza e virtuosismo agile",
        desc: "Il membro più acuto e agile della famiglia. In orchestra, i violini si dividono in violini I (spesso librati nel registro acuto) e violini II (voci interne e armonia). Le corde corte e leggere rispondono all’istante ai passaggi più veloci.",
        demos: [
          { label: "Violino con arco (arco)", style: "strings", notes: "G4,D5,A5,E6", dur: 1.0, step: 340 },
          { label: "Violino pizzicato (pizzicato)", style: "pizzicato", notes: "G4,B4,D5,G5", dur: 0.75, step: 220 }
        ]
      },
      {
        name: "Viola",
        tag: "Contralto degli archi",
        tagClass: "tag-sage",
        range: "Do3 – Mi6 (C3 – E6)",
        tuning: "Accordata per quinte: Do3 – Sol3 – Re4 – La4",
        role: "Calore armonico interno e controcanti velati",
        desc: "Accordata una quinta sotto il violino e scritta tradizionalmente in <em>chiave di contralto (Do sul 3° rigo)</em>. La sua cassa è leggermente più piccola di quanto richiederebbe la fisica per il suo registro grave: proprio questo dona alla viola il suo timbro scuro, vellutato e profondamente espressivo.",
        demos: [
          { label: "Ascolta il registro della viola", style: "strings", notes: "C3,G3,D4,A4", dur: 1.05, step: 360 }
        ]
      },
      {
        name: "Violoncello",
        tag: "Tenore & baritono",
        tagClass: "tag-lilac",
        range: "Do2 – La5 (C2 – A5)",
        tuning: "Accordato per quinte: Do2 – Sol2 – Re3 – La3",
        role: "Base profonda e grandi melodie liriche",
        desc: "Un’ottava intera sotto la viola e straordinariamente vicino alla voce umana. Le corde gravi offrono una base calda, mentre la corda di La canta intensi assoli da baritono a tenore.",
        demos: [
          { label: "Ascolta il violoncello (Do2–La3)", style: "strings", notes: "C2,G2,D3,A3", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Contrabbasso",
        tag: "Base sub-grave",
        tagClass: "tag-peach",
        range: "Mi1 (o Do1 con estensione) – Sol4",
        tuning: "Accordato per quarte: Mi1 – La1 – Re2 – Sol2",
        role: "Basso d’orchestra e walking bass jazz",
        desc: "Accordato <em>per quarte</em> anziché per quinte per mantenere distanze comode per la mano sinistra, suona <strong>un’ottava più grave</strong> di quanto scritto. Con l’arco offre una profondità maestosa; in pizzicato spinge il jazz e lo swing.",
        demos: [
          { label: "Contrabbasso con arco (orchestrale)", style: "strings", notes: "E1,A1,D2,G2", dur: 1.25, step: 420 },
          { label: "Walking bass jazz (pizzicato)", style: "pizzicato", notes: "C2,E2,G2,A2,Bb2,A2,G2,E2", dur: 0.7, step: 280 }
        ]
      }
    ],
    extraBox: {
      heading: "Principali articolazioni degli archi da riconoscere a orecchio",
      facts: [
        { title: "Arco vs. pizzicato", text: "<em>Arco</em> indica l’esecuzione con l’archetto, per linee tenute e cantabili; <em>pizzicato</em> indica la corda pizzicata col dito, per note brevi, calde e percussive." },
        { title: "Spiccato & martellato", text: "Lo <em>spiccato</em> fa rimbalzare leggermente l’arco sulla corda per un’agilità scintillante; il <em>martellato (martelé)</em> attacca con un morso secco e preciso." },
        { title: "Tremolo & sul ponticello", text: "Rapidi movimenti avanti e indietro dell’arco creano un brivido di suspense (un classico del cinema). Suonare vicinissimo al ponticello (<em>sul ponticello</em>) rende il timbro vitreo e spettrale." },
        { title: "Armonici & con sordina", text: "Sfiorare la corda nei suoi nodi di vibrazione isola suoni flautati e cristallini. Applicare una sordina (<em>con sordina</em>) sul ponticello vela il timbro di un riflesso setoso." }
      ]
    }
  },
  woodwinds: {
    title: "Legni",
    subtitle: "Imboccatura libera, ancia semplice, ancia doppia e famiglia dei sassofoni",
    intro: {
      tag: "Tubi & ance",
      tagClass: "tag-sage",
      chip: "3 modi di eccitazione",
      heading: "Dal soffio puro alle ance vibranti",
      body: "A differenza degli archi, omogenei, i legni riuniscono tre meccanismi sonori molto contrastanti: il flauto taglia un getto d’aria contro uno spigolo affilato, il clarinetto e il sassofono fanno battere una lamella di canna (<em>ancia semplice</em>) su un bocchino, mentre oboe e fagotto stringono due sottili lamelle l’una contro l’altra (<em>ancia doppia</em>), regalando a ogni strumento il suo colore insostituibile."
    },
    items: [
      {
        name: "Flauto traverso & ottavino",
        tag: "Getto d’aria su spigolo (senza ancia)",
        tagClass: "tag-peach",
        range: "Do4 – Re7 (ottavino Re5 – Do8)",
        tuning: "In Do (ottavino +1 ottava)",
        role: "Linee aeree argentee, trilli e canti d’uccello",
        desc: "Il soffio si spezza contro il bordo della boccola oscillando rapidamente verso l’interno e l’esterno. Il grave è morbido e vicino a un’onda sinusoidale, mentre la terza ottava attraversa l’intera orchestra con uno splendore argenteo. Il piccolo ottavino corona spesso i tutti.",
        demos: [
          { label: "Flauto traverso (frase lirica)", style: "flute", notes: "G4,A4,B4,D5,E5,G5", dur: 0.9, step: 260 }
        ]
      },
      {
        name: "Oboe & corno inglese",
        tag: "Ancia doppia (canneggio conico stretto)",
        tagClass: "tag-lilac",
        range: "Si♭3 – La6 (corno inglese in Fa)",
        tuning: "Oboe in Do • dà il La4 d’accordatura",
        role: "Riferimento d’accordatura dell’orchestra e assoli commoventi",
        desc: "Due sottilissime lamelle di canna legate vibrano l’una contro l’altra in un tubo conico stretto, producendo un canto penetrante, ricco di armonici e carico di nostalgia. Poiché la sua intonazione è molto stabile, tutta l’orchestra si accorda sul <strong>La4 dell’oboe</strong>. Il fratello maggiore, il corno inglese, ha una campana a forma di pera perfetta per gli assoli malinconici.",
        demos: [
          { label: "Timbro di oboe (ancia doppia)", style: "reed", notes: "A4,C5,E5,D5,C5,A4", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "Clarinetto & clarinetto basso",
        tag: "Ancia semplice (canneggio cilindrico)",
        tagClass: "tag-sage",
        range: "Re3 – Si♭6 (clarinetto basso fino a Si♭1)",
        tuning: "Di solito in Si♭ o in La (traspositore)",
        role: "Calore vellutato, dal grave ai voli jazz e klezmer",
        desc: "Un’ancia di canna batte contro un bocchino rigido su un tubo cilindrico. Particolarità acustica: si comporta come una canna chiusa a un’estremità! Il registro grave, lo <em>chalumeau</em>, privilegia gli armonici dispari e, cambiando registro, lo strumento non salta all’ottava ma alla <strong>duodecima (ottava + quinta)</strong>.",
        demos: [
          { label: "Registro del clarinetto (grave → acuto)", style: "reed", notes: "D3,F3,A3,C4,E4,A4", dur: 0.9, step: 280 }
        ]
      },
      {
        name: "Fagotto & controfagotto",
        tag: "Ancia doppia (basso)",
        tagClass: "tag-peach",
        range: "Si♭1 – Mi5 (controfagotto fino a Si♭0)",
        tuning: "In Do (tubo di legno ripiegato a U)",
        role: "Bassi staccati incisivi e registro tenorile cantabile",
        desc: "Oltre 2,60 metri di tubo conico di legno ripiegato a U. Nello staccato secco sul grave ha uno spirito arguto e incisivo; legato nel registro medio canta con un calore vicino al baritono umano.",
        demos: [
          { label: "Registro grave del fagotto", style: "reed", notes: "Bb1,F2,Bb2,D3,F3", dur: 1.0, step: 330 }
        ]
      },
      {
        name: "Famiglia dei sassofoni (soprano, contralto, tenore, baritono)",
        tag: "Ponte moderno dei legni",
        tagClass: "tag-lilac",
        range: "Re♭2 a Fa6 in suono reale (secondo la taglia)",
        tuning: "Alternanza Mi♭ (contralto/baritono) & Si♭ (soprano/tenore)",
        role: "Jazz, big band, funk, soul e assoli pop",
        desc: "Inventato intorno al 1840 da Adolphe Sax come geniale ibrido: l’ancia semplice e flessibile del clarinetto unita a un ampio tubo conico in ottone. Salta regolarmente all’ottava e proietta quasi come un ottone, conservando l’agilità dei legni, dal sussurro subtone al growl graffiante.",
        demos: [
          { label: "Colore di sax tenore / contralto", style: "reed", notes: "C4,Eb4,F4,F#4,G4,Bb4", dur: 0.9, step: 250 }
        ]
      }
    ],
    extraBox: {
      heading: "Guida rapida agli strumenti a fiato traspositori",
      facts: [
        { title: "Perché alcuni fiati leggono in Si♭, Mi♭ o Fa?", text: "Così un sassofonista che passa dal contralto al baritono, o un clarinettista che cambia taglia, mantiene esattamente le stesse diteggiature! Suonare un <em>Do</em> scritto su una tromba o un sax tenore in Si♭ produce un <em>Si♭</em> reale (un tono più grave)." },
        { title: "L’arte orchestrale di mescolare i timbri", text: "A differenza degli archi, omogenei, ogni legno ha un profilo spettrale marcato e gli orchestratori adorano combinarli: flauto + oboe unisce brillantezza e nucleo; clarinetto + corno crea un velluto setoso." }
      ]
    }
  },
  brass: {
    title: "Ottoni",
    subtitle: "Serie degli armonici, pistoni, coulisse e sordine classiche",
    intro: {
      tag: "Vibrazione delle labbra",
      tagClass: "tag-lilac",
      chip: "Armonici + lunghezza del tubo",
      heading: "Non vibra il metallo: vibrano le tue labbra!",
      body: "Nella tromba, nel corno, nel trombone o nella tuba, le labbra del musicista agiscono come una membrana viva contro il bocchino. Senza azionare alcun pistone, un ottone suona solo gli <strong>armonici naturali</strong> del suo tubo (come una tromba militare). I <strong>pistoni, i cilindri</strong> o la <strong>coulisse</strong> aggiungono all’istante porzioni calibrate di tubo per ottenere tutte le 12 note cromatiche."
    },
    items: [
      {
        name: "Tromba & flicorno soprano (flugelhorn)",
        tag: "Ottoni acuti (cilindrico vs. conico)",
        tagClass: "tag-peach",
        range: "Mi3 – Do6 (in suono reale)",
        tuning: "Quasi sempre in Si♭ o in Do",
        role: "Splendore di fanfara, lead di big band e temi eroici",
        desc: "Circa due terzi del tubo della tromba sono strettamente cilindrici prima della campana, rendendo i forte brillanti, taglienti ed elettrici. Suo cugino, il <em>flicorno soprano</em>, si allarga conicamente da un capo all’altro e avvolge le stesse note in un velluto scuro, ideale per le ballate jazz.",
        demos: [
          { label: "Fanfara di tromba (triade armonica)", style: "brass", notes: "C4,G4,C5,E5", dur: 0.95, step: 290 }
        ]
      },
      {
        name: "Corno (corno doppio Fa / Si♭)",
        tag: "Conico stretto + mano nella campana",
        tagClass: "tag-sage",
        range: "Si1 – Fa5 (in suono reale)",
        tuning: "Corno doppio Fa / Si♭",
        role: "Temi epici da cinema e collante naturale dell’orchestra",
        desc: "Deriva dai lunghi corni da caccia avvolti a spirale (~3,7 m di tubo). Muoversi nella parte alta dei suoi armonici gli conferisce una rotondità nobile che lega i legni agli ottoni gravi. Infilare la mano destra nella campana scurisce il timbro o genera il morso metallico dei <em>suoni chiusi (bouché)</em>.",
        demos: [
          { label: "Richiamo di corno (quinte & calore)", style: "brass", notes: "F3,C4,F4,A4", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Trombone (tenore & basso)",
        tag: "Coulisse continua (7 posizioni)",
        tagClass: "tag-lilac",
        range: "Mi2 – Fa5 (fino a Si1 con ritorta in Fa)",
        tuning: "Non traspositore, in Do (fondamentale Si♭)",
        role: "Tappeti d’accordi corposi, glissandi fluidi e spinta jazz",
        desc: "Al posto dei pistoni, una coulisse telescopica allunga il tubo cilindrico in 7 posizioni cromatiche. Il musicista rifinisce ogni intonazione a orecchio ed esegue incomparabili <strong>glissandi</strong> continui.",
        demos: [
          { label: "Voicing di trombone (ottone medio-grave)", style: "brass", notes: "Bb2,F3,Bb3,D4", dur: 1.05, step: 320 }
        ]
      },
      {
        name: "Tuba & eufonio",
        tag: "Gravi conici larghi",
        tagClass: "tag-peach",
        range: "Re1 – Fa4 (tuba contrabbassa fino a Si♭0)",
        tuning: "In Fa, Mi♭, Do o Si♭",
        role: "Profondità maestosa e bassi armonici setosi",
        desc: "Quasi 5,5 metri di ottone ampiamente conico producono una base sorprendentemente morbida, rotonda e generosa, senza alcuna durezza metallica. Nella banda, la tuba e il cantabile <em>eufonio</em> costruiscono un fondamento vellutato.",
        demos: [
          { label: "Base di tuba (ottava + quinta)", style: "brass", notes: "F1,C2,F2", dur: 1.25, step: 420 }
        ]
      }
    ],
    extraBox: {
      heading: "Trasformare gli ottoni con le sordine classiche",
      facts: [
        { title: "Sordina dritta (straight mute)", text: "Cono in alluminio o fibra: asciuga le basse e rende tromba o trombone penetranti, metallici e affilati (jazz e musica da film)." },
        { title: "Sordina Harmon (wah-wah)", text: "Resa leggendaria da Miles Davis: chiude la campana lasciando aperto solo un tubicino centrale, dal suono intimo e nasale; aprire e chiudere la mano davanti al tubo crea il celebre effetto «wah-wah»." },
        { title: "Sordina cup & plunger", text: "La sordina cup ammorbidisce la brillantezza in un velluto smorzato; nella big band si fanno letteralmente «parlare» gli ottoni agitando una ventosa di gomma (<em>plunger</em>) davanti alla campana." }
      ]
    }
  },
  keyboards: {
    title: "Strumenti a tastiera",
    subtitle: "Martelletti, plettri, canne d’organo e leggende elettromeccaniche",
    intro: {
      tag: "Giganti polifonici",
      tagClass: "tag-peach",
      chip: "La stessa interfaccia a 12 tasti",
      heading: "Una sola tastiera, quattro motori acustici radicalmente diversi",
      body: "Pianoforte, clavicembalo, organo a canne e Fender Rhodes condividono la stessa geometria intuitiva di 12 tasti per ottava (7 bianchi, 5 neri), che permette a due mani di suonare insieme basso, accordi e melodia. Ma ciò che accade dietro al tasto risponde a meccanismi fisici opposti."
    },
    items: [
      {
        name: "Pianoforte verticale & pianoforte a coda da concerto",
        tag: "Corde percosse (meccanica a martelletti)",
        tagClass: "tag-peach",
        range: "La0 – Do8 (88 tasti • 27,5 – 4186 Hz)",
        tuning: "Temperamento equabile stirato (~230 corde)",
        role: "Pilastro universale di classica, jazz, pop e composizione",
        desc: "Martelletti rivestiti di feltro <strong>percuotono</strong> corde d’acciaio ad alta tensione (fino a 3 corde all’unisono per nota!) e rimbalzano subito per lasciarle vibrare liberamente. Il <em>pedale di risonanza</em> solleva tutti gli smorzatori insieme facendo vibrare per simpatia anche le corde non percosse.",
        demos: [
          { label: "Pianoforte a coda (arpeggio con pedale)", style: "piano", notes: "C3,G3,E4,G4,B4,D5", dur: 1.2, step: 220 }
        ]
      },
      {
        name: "Clavicembalo",
        tag: "Corde pizzicate (plettri / penne)",
        tagClass: "tag-sage",
        range: "Fa1 – Fa6",
        tuning: "Spesso temperamenti storici (Werckmeister / Vallotti)",
        role: "Basso continuo barocco e attacco nitido e argenteo",
        desc: "Invece di un martelletto, un minuscolo plettro (un tempo di penna di corvo, oggi in Delrin) <strong>pizzica</strong> la corda quando abbassi il tasto. La forza del dito cambia pochissimo il volume: i contrasti nascono dai registri (4', 8', unione) e dalla densità della scrittura. Ricchissimo di armonici acuti.",
        demos: [
          { label: "Pizzico di clavicembalo", style: "cembalo", notes: "D4,F4,A4,D5,C#5,D5", dur: 0.9, step: 210 }
        ]
      },
      {
        name: "Organo a canne & armonium",
        tag: "Aerofono (somiere & registri)",
        tagClass: "tag-lilac",
        range: "Sub-basso da 16'/32' (< 16 Hz!) fino alle misture da 1'",
        tuning: "Canne ad anima e ad ancia per altezza in piedi",
        role: "Polifonia monumentale a tenuta infinita",
        desc: "Tastiere e pedaliera aprono valvole che inviano aria in pressione a centinaia o migliaia di canne di stagno e legno. I <em>registri ad anima</em> cantano come immensi flauti; i <em>registri ad ancia</em> squillano come trombe. Ogni nota resta a piena intensità finché il dito rimane abbassato!",
        demos: [
          { label: "Organo a canne (ripieno)", style: "organ", notes: "C3,G3,C4,E4,G4", dur: 2.0, step: 0 }
        ]
      },
      {
        name: "Icone da palco: Fender Rhodes, Hammond B3 & Clavinet",
        tag: "Leggende elettromeccaniche",
        tagClass: "tag-sage",
        range: "73–88 tasti / drawbar armonici",
        tuning: "Pickup magnetici, ruote foniche e modellazione",
        role: "Jazz, funk, soul, gospel, rock e pop moderno",
        desc: "Il <strong>Fender Rhodes</strong> percuote astine metalliche risonanti davanti a bobine magnetiche: morbido, cristallino e magico nel neo-soul. Il <strong>Clavinet</strong> percuote corde per graffiare nel funk. L’<strong>organo Hammond B3</strong> somma 9 <em>drawbar</em> generati da ruote foniche che ruotano davanti a una <em>cassa Leslie</em> rotante.",
        demos: [
          { label: "Voicing d’organo con drawbar", style: "organ", notes: "G3,B3,D4,F4", dur: 1.5, step: 0 },
          { label: "Voicing di piano elettrico caldo", style: "piano", notes: "F3,A3,C4,E4,G4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },
  plucked: {
    title: "Strumenti a pizzico & chitarre",
    subtitle: "Nylon, acciaio, pickup magnetici, basso elettrico e arpa da concerto",
    intro: {
      tag: "Impulso pizzicato",
      tagClass: "tag-sage",
      chip: "Attacco franco e decadimento naturale",
      heading: "Il punto in cui pizzichi scolpisce subito il timbro",
      body: "Pizzicare una corda con il polpastrello, l’unghia o il plettro crea un attacco netto i cui armonici acuti si spengono prima della fondamentale. Pizzica vicino al <strong>ponticello</strong> (<em>sul ponticello</em>) per uno schiocco metallico e tagliente; suona sopra la <strong>tastiera</strong> (<em>sul tasto</em>) per un calore rotondo vicino all’arpa."
    },
    items: [
      {
        name: "Chitarra classica (nylon) & chitarra acustica (acciaio)",
        tag: "Casse di risonanza acustiche",
        tagClass: "tag-peach",
        range: "Mi2 – Si5 (in suono reale • scritta +1 ottava)",
        tuning: "Accordatura standard: Mi2 – La2 – Re3 – Sol3 – Si3 – Mi4",
        role: "Accompagnamento ritmico, fingerpicking, flamenco e canzone",
        desc: "Le <em>chitarre classiche con corde in nylon</em> conquistano per la morbidezza calda e la nitidezza polifonica del tocco con le dita. Le <em>chitarre acustiche con corde in acciaio</em> hanno una tensione maggiore e bucano un mix grazie ad accordi brillanti e ricchi di acuti.",
        demos: [
          { label: "Arpeggio di chitarra acustica", style: "guitar", notes: "E2,B2,E3,G#3,B3,E4", dur: 1.3, step: 170 }
        ]
      },
      {
        name: "Chitarra elettrica & catena del segnale",
        tag: "Pickup magnetici + amplificatore",
        tagClass: "tag-lilac",
        range: "Mi2 – Mi6 (con bending e armonici)",
        tuning: "Mi – La – Re – Sol – Si – Mi (e accordature ribassate)",
        role: "Riff funk, arpeggi puliti e cristallini, crunch e assoli cantabili",
        desc: "Una chitarra elettrica solid-body produce pochissimo volume acustico da sola: delle bobine (<em>pickup</em>) captano la vibrazione delle corde d’acciaio trasformandola in segnale elettrico. I <strong>pickup single-coil</strong> (Strat/Tele) suonano schioccanti e cristallini; gli <strong>humbucker</strong> a doppia bobina eliminano il ronzio e offrono medi cremosi, plasmati poi da amplificatore valvolare, saturazione, delay e riverbero.",
        demos: [
          { label: "Accordo elettrico pulito", style: "guitar", notes: "A2,D3,G3,C4,E4", dur: 1.4, step: 140 }
        ]
      },
      {
        name: "Basso elettrico (4, 5 corde & fretless)",
        tag: "Il legame tra grancassa & armonia",
        tagClass: "tag-sage",
        range: "Mi1 (o Si0 sul 5 corde) – Sol4",
        tuning: "Mi1 – La1 – Re2 – Sol2",
        role: "Base del groove insieme alla batteria, fondamento armonico universale",
        desc: "Accordato un’ottava sotto la chitarra, come un contrabbasso, ma dotato di tasti per un’intonazione immediata. Suonato con le dita è rotondo e profondo; col plettro attraversa i mix rock; in <strong>slap &amp; pop</strong> (pollice che percuote + corda strappata) elettrizza il funk; senza tasti (<em>fretless</em>) scivola con un vibrato vocale liquido.",
        demos: [
          { label: "Groove di basso elettrico (ottava & quinta)", style: "ebass", notes: "E1,E1,G1,A1,B1,E2", dur: 0.75, step: 260 }
        ]
      },
      {
        name: "Arpa da concerto, mandolino, banjo & ukulele",
        tag: "Colori a pizzico caratteristici",
        tagClass: "tag-peach",
        range: "Arpa: Do♭1 – Sol♭7 (47 corde)",
        tuning: "Arpa: diatonica con 7 pedali a doppio movimento",
        role: "Glissandi luminosi, trame folk e bagliori acustici",
        desc: "Ciascuna delle 47 corde di un’arpa da concerto porta la propria nota diatonica (rosso per il Do, blu/nero per il Fa); sette pedali abbassano o alzano tutte le ottave a bemolle, bequadro o diesis. Accanto a lei, il <em>mandolino</em> a corde doppie, il <em>banjo</em> con pelle tesa e il leggero <em>ukulele</em> firmano musiche tradizionali, bluegrass e indie pop.",
        demos: [
          { label: "Arpeggio a cascata in stile arpa", style: "guitar", notes: "C3,D3,E3,G3,A3,C4,D4,E4,G4", dur: 0.9, step: 110 }
        ]
      }
    ]
  },
  electronic: {
    title: "Elettronica & studio",
    subtitle: "Sintetizzatori, sampler, drum machine e missaggio nella DAW",
    intro: {
      tag: "Sound design & produzione",
      tagClass: "tag-sage",
      chip: "Elettrofoni & digitale",
      heading: "Dalla risonanza fisica alla scultura diretta delle forme d’onda",
      body: "Gli strumenti acustici ereditano il loro timbro dal legno, dall’ottone o da una pelle tesa. Gli strumenti elettronici partono da onde grezze elettriche o digitali, permettendoti di scolpire con precisione la ricchezza armonica, la velocità d’attacco e l’evoluzione del timbro nel tempo."
    },
    items: [
      {
        name: "Sintetizzatori sottrattivi (analogici & virtuali)",
        tag: "Oscillatore + filtro + inviluppo",
        tagClass: "tag-sage",
        range: "Tutto lo spettro udibile (dal sub-basso a 20 Hz agli acuti)",
        tuning: "Volt/ottava o MIDI (inclusi microintervalli)",
        role: "Bassi massicci, lead incisivi, pad analogici vellutati",
        desc: "L’architettura classica resa celebre dal Minimoog: <strong>1. L’oscillatore (VCO)</strong> genera forme d’onda ricche come il <em>dente di sega</em> (tutti gli armonici: ampio e vicino agli archi), l’<em>onda quadra/impulso</em> (armonici dispari: legnosa e cava) o il <em>triangolo/sinusoide</em> (puro/sub). <strong>2. Il filtro (VCF)</strong> scolpisce la brillantezza con <em>cutoff</em> e <em>risonanza</em>! <strong>3. L’inviluppo (ADSR)</strong> modella attacco, decadimento, sostegno e rilascio.",
        demos: [
          { label: "Synth a dente di sega (lead armonico)", style: "synth-saw", notes: "C3,E3,G3,B3,C4", dur: 0.85, step: 230 },
          { label: "Pad analogico caldo", style: "synth-pad", notes: "C3,G3,B3,D4,E4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "Sintesi FM, wavetable & granulare",
        tag: "Universi sonori digitali",
        tagClass: "tag-lilac",
        range: "Dai suoni cristallini alle trame cinematografiche in movimento",
        tuning: "Precisione al singolo campione / microtonale",
        role: "Campane vitree e piani elettrici anni ’80, bassi moderni e pad",
        desc: "La <strong>sintesi FM</strong> (leggendaria sullo Yamaha DX7) modula la frequenza di un’onda a velocità audio con un’altra, creando senza filtri campane metalliche gelide, piani elettrici anni ’80 e bassi schioccanti. I synth <strong>wavetable</strong> scorrono tra forme d’onda mutevoli, mentre la <strong>sintesi granulare</strong> frammenta registrazioni in grani da 10–50 ms per tessere nuvole sonore.",
        demos: [
          { label: "Pad fluttuante ricco di armonici", style: "synth-pad", notes: "A2,E3,G3,B3,D4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "Sampler, Mellotron & drum machine (808 / 909 / MPC)",
        tag: "Campionamento & step sequencer",
        tagClass: "tag-peach",
        range: "Estensione cromatica completa tramite ricampionamento",
        tuning: "Suonabili cromaticamente su tastiera e pad",
        role: "Hip-hop, house, techno, beat pop e mockup orchestrali",
        desc: "Un <strong>sampler (campionatore)</strong> cattura qualsiasi suono reale (cori, loop in vinile, rumori quotidiani) e lo distribuisce lungo tutta una tastiera (anticipato dal <em>Mellotron</em> a nastri magnetici!). Drum machine di culto come la Roland <em>TR-808</em> hanno regalato rullanti sintetici, clap e campanacci, e allungare la sua cassa sinusoidale crea le celebri linee di sub-basso dell’hip-hop e della trap.",
        demos: [
          { label: "Ascolta una linea di sub-basso 808", style: "ebass", notes: "C1,C1,Eb1,G1,C2,G1", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "DAW, strumenti virtuali & effetti di missaggio",
        tag: "L’officina dello studio moderno",
        tagClass: "tag-sage",
        range: "Ambiente musicale informatico completo",
        tuning: "Altezza e automazione in tempo reale",
        role: "Composizione, arrangiamento, missaggio e mastering",
        desc: "Una <em>Digital Audio Workstation (DAW)</em> riunisce registratori, rack di processori e orchestre virtuali su un solo schermo. Con il <strong>MIDI</strong> controlli synth software e librerie campionate, poi scolpisci lo spazio con gli <strong>equalizzatori (EQ)</strong>, domini l’impatto con i <strong>compressori</strong> e ricrei sale da concerto con <strong>riverbero &amp; delay</strong>.",
        demos: [
          { label: "Strato synth + sub", style: "synth-saw", notes: "F2,C3,A3,E4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },
  ensembles: {
    title: "Orchestre, band & ensemble",
    subtitle: "Perché decine di strumenti suonano nitidi insieme invece di impastarsi",
    intro: {
      tag: "Arrangiamento & spazio di frequenze",
      tagClass: "tag-peach",
      chip: "Suddivisione acustica dei compiti",
      heading: "Il segreto di una grande orchestrazione: frequenza + funzione",
      body: "Quando 80 musicisti sinfonici o 5 componenti di una band rock suonano insieme, ogni strumento deve occupare la propria <strong>banda di frequenza</strong> (bassi, medi, alti) e svolgere una <strong>funzione ritmica o armonica chiara</strong>. Ogni formazione classica è nata proprio per risolvere questa equazione."
    },
    items: [
      {
        name: "L’orchestra sinfonica (~70–100 musicisti)",
        tag: "Le 4 grandi famiglie",
        tagClass: "tag-peach",
        range: "Dal sub-grave del contrabbasso allo splendore dell’ottavino (16 Hz – >4 kHz)",
        tuning: "La4 da concerto = 440–443 Hz",
        role: "Immense escursioni dinamiche e tavolozza orchestrale completa",
        desc: "Perché oltre 50 archi contro appena 2–4 legni o ottoni? Perché una sola tromba supera dieci violini! La grande sezione d’archi tesse il <em>tappeto</em> continuo, i legni solisti disegnano linee agili, gli ottoni innalzano le vette eroiche e timpani &amp; percussioni infondono il respiro drammatico.",
        demos: [
          { label: "Grande accordo caldo di archi", style: "strings", notes: "C2,G2,E3,C4,G4", dur: 2.0, step: 0 },
          { label: "Strato di fanfara d’ottoni", style: "brass", notes: "C4,G4,C5,E5", dur: 1.1, step: 240 }
        ]
      },
      {
        name: "Musica da camera (quartetto d’archi & quintetto di fiati)",
        tag: "Trasparenza solistica",
        tagClass: "tag-sage",
        range: "4 o 5 voci paritarie in dialogo",
        tuning: "Intonazione giusta adattiva d’insieme",
        role: "Gioco d’insieme intimo, paragonabile al quartetto vocale SATB",
        desc: "Il <strong>quartetto d’archi</strong> classico (2 violini, viola, violoncello) rispecchia idealmente un coro a quattro voci: timbro unificato, leggibilità chirurgica e contrappunto flessibile. Il <strong>quintetto di fiati</strong> (flauto, oboe, clarinetto, fagotto + corno!) affronta la sfida opposta: cinque colori contrastanti fusi grazie al calore del corno.",
        demos: [
          { label: "Arpeggio di quartetto d’archi (violoncello → violino)", style: "strings", notes: "C2,G3,D4,E4", dur: 1.5, step: 260 }
        ]
      },
      {
        name: "Big band & formazione jazz",
        tag: "Sezione ritmica vs. sezioni di fiati",
        tagClass: "tag-lilac",
        range: "Scrittura stretta a blocchi d’accordi (block voicings)",
        tuning: "Fraseggio swing e domanda-risposta",
        role: "Walking bass e batteria propulsivi sotto gli ottoni sovrapposti",
        desc: "La big band si regge su due poli: la <strong>sezione ritmica</strong> (batteria, contrabbasso/basso, pianoforte, chitarra) fornisce senza sosta swing e armonia, mentre i <strong>fiati</strong> (5 sassofoni, 4 tromboni, 4 trombe) si scambiano rivolti serrati (come i <em>drop-2</em>) in un vivace botta e risposta.",
        demos: [
          { label: "Voicing jazz della sezione fiati", style: "brass", notes: "Bb2,Ab3,C4,D4,G4", dur: 1.7, step: 0 }
        ]
      },
      {
        name: "Band moderna di pop, rock & funk",
        tag: "Corsie di frequenza ben definite",
        tagClass: "tag-peach",
        range: "Dalla base di sub-basso all’aria della presenza vocale",
        tuning: "Pocket serrato tra grancassa e basso",
        role: "Groove solido, ritornelli memorabili e risalto della voce",
        desc: "<strong>Grancassa + basso elettrico (o 808)</strong> sigillano le fondamenta gravi (40–250 Hz). <strong>Rullante &amp; hi-hat</strong> scolpiscono la cornice ritmica. <strong>Chitarre, tastiere o synth</strong> vestono i medi (300 Hz – 3 kHz) ritraendosi leggermente nelle strofe per lasciare respirare la <strong>voce principale</strong> (1–4 kHz).",
        demos: [
          { label: "Voicing di band (basso + tastiera)", style: "piano", notes: "A2,E3,G3,B3,C#4", dur: 1.6, step: 110 }
        ]
      }
    ]
  }
};

function renderInstrumentModuleHTML_IT(refKey) {
  const mod = INSTRUMENT_MODULES_DATA_IT[refKey];
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
        <span class="inst-meta-pill">Estensione: ${item.range}</span>
        <span class="inst-meta-pill">${item.tuning}</span>
      </div>
      <p><strong>Funzione:</strong> ${item.role}</p>
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
        <span class="k-card-tag tag-lilac">Tecnica &amp; consigli d’ascolto</span>
        <span class="k-ratio-chip">Per approfondire</span>
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


const MODES_ENCYCLOPEDIA_IT = [
  {
    id: "lydian",
    name: "Lidio",
    family: "major",
    familyLabel: "Famiglia maggiore",
    brightness: "1 / 7 • Radioso & aereo",
    badgeClass: "badge-peach",
    rootLabel: "Do",
    stammton: "4° modo della scala maggiore (come Do maggiore partendo da Fa)",
    formula: "1 · 2 · 3 · #4 · 5 · 6 · 7",
    steps: "T – T – T – ½T – T – T – ½T",
    charNote: "Quarta aumentata (#4, es. Fa♯ su Do)",
    vamp: "I – II (Do – Re)",
    desc: "Il più luminoso dei sette modi diatonici. Alzare il 4° grado a #4 elimina lo sfregamento di semitono con la terza maggiore, donando al lidio la sua leggerezza onirica, sospesa e cinematografica.",
    usage: "<strong>Uso musicale:</strong> Amatissimo al cinema per stupore e fantascienza (John Williams <em>E.T.</em>, sigla de <em>I Simpson</em>, Danny Elfman), nel rock strumentale (Joe Satriani, Steve Vai) e sugli accordi sospesi Maj7(#11) del jazz.",
    notes: "C4,D4,E4,F#4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4", "B4"], ["D3", "F#4", "A4", "C5"]]
  },
  {
    id: "ionian",
    name: "Ionico (maggiore)",
    family: "major",
    familyLabel: "Famiglia maggiore",
    brightness: "2 / 7 • Equilibrato & nitido",
    badgeClass: "badge-sage",
    rootLabel: "Do",
    stammton: "1° modo: la nostra scala maggiore naturale (Do maggiore)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · 7",
    steps: "T – T – ½T – T – T – T – ½T",
    charNote: "Quarta giusta (4) + sensibile netta (7 → 1)",
    vamp: "I – IV – V – I",
    desc: "Il modo maggiore classico. Il tritono tra il 4° e il 7° grado risolve con chiarezza verso tonica e terza, creando stabilità, nitidezza e un senso di risoluzione universale.",
    usage: "<strong>Uso musicale:</strong> Il pilastro dell’armonia tonale occidentale, delle sinfonie classiche, dei ritornelli pop luminosi e delle canzoni folk in cui regnano gioia e immediatezza.",
    notes: "C4,D4,E4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4"], ["F3", "A4", "C5"], ["G3", "B4", "D5"], ["C3", "E4", "G4"]]
  },
  {
    id: "mixolydian",
    name: "Misolidio",
    family: "major",
    familyLabel: "Famiglia maggiore",
    brightness: "3 / 7 • Terreno & spigliato",
    badgeClass: "badge-peach",
    rootLabel: "Do",
    stammton: "5° modo della scala maggiore (come Do maggiore partendo da Sol)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · b7",
    steps: "T – T – ½T – T – T – ½T – T",
    charNote: "Settima minore (b7, es. Si♭ su Do)",
    vamp: "I – bVII (Do – Si♭)",
    desc: "Un modo maggiore che scambia la sensibile classica con una b7 rilassata, regalandogli all’istante una tinta blues, rock e sicura di sé.",
    usage: "<strong>Uso musicale:</strong> Re del classic rock, del funk, del folk celtico e del reggae (The Beatles <em>Norwegian Wood</em>, AC/DC, Deep Purple), e scala d’elezione nel jazz sugli accordi di settima di dominante (V7).",
    notes: "C4,D4,E4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "E4", "G4", "Bb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "dorian",
    name: "Dorico",
    family: "minor",
    familyLabel: "Famiglia minore",
    brightness: "4 / 7 • Vellutato & groovy",
    badgeClass: "badge-lilac",
    rootLabel: "Do",
    stammton: "2° modo della scala maggiore (come Do maggiore partendo da Re)",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · b7",
    steps: "T – ½T – T – T – T – ½T – T",
    charNote: "Sesta maggiore naturale in minore (♮6, es. La su Do)",
    vamp: "i – IV (Do m – Fa)",
    desc: "Proprio al centro dello spettro di luminosità: una terza minore e una 7ª minore illuminate da una 6ª maggiore piena d’anima (♮6). Elegante, fluido, mai lacrimoso: puro movimento.",
    usage: "<strong>Uso musicale:</strong> Campione indiscusso del funk, del soul, del jazz modale e del rock (Miles Davis <em>So What</em>, Santana <em>Oye Cómo Va</em>, Daft Punk <em>Get Lucky</em>, Pink Floyd) e delle melodie celtiche.",
    notes: "C4,D4,Eb4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4", "Bb4"], ["F3", "A4", "C5"]]
  },
  {
    id: "aeolian",
    name: "Eolio (minore naturale)",
    family: "minor",
    familyLabel: "Famiglia minore",
    brightness: "5 / 7 • Profondo & malinconico",
    badgeClass: "badge-sage",
    rootLabel: "Do",
    stammton: "6° modo della scala maggiore (come Do maggiore partendo da La)",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · b7",
    steps: "T – ½T – T – T – ½T – T – T",
    charNote: "Sesta minore (b6, es. La♭) + settima minore (b7)",
    vamp: "i – bVI – bVII (Do m – La♭ – Si♭)",
    desc: "Il minore naturale. Abbassare la 6ª a un semitono sopra la quinta (b6) sprigiona pathos, respiro drammatico e tenera nostalgia.",
    usage: "<strong>Uso musicale:</strong> Onnipresente nelle ballate rock, nel pop in minore (Adele, <em>All Along the Watchtower</em>), nell’R&amp;B e nei trailer epici. A differenza della ♮6 dorica, la b6 sospira dolcemente verso la quinta.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Ab3", "C4", "Eb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "phrygian",
    name: "Frigio",
    family: "minor",
    familyLabel: "Famiglia minore",
    brightness: "6 / 7 • Scuro & ipnotico",
    badgeClass: "badge-lilac",
    rootLabel: "Do",
    stammton: "3° modo della scala maggiore (come Do maggiore partendo da Mi)",
    formula: "1 · b2 · b3 · 4 · 5 · b6 · b7",
    steps: "½T – T – T – T – ½T – T – T",
    charNote: "Seconda minore subito sopra la tonica (b2, es. Re♭ → Do)",
    vamp: "i – bII (Do m – Re♭)",
    desc: "Collocare una frizione di un solo semitono sopra la tonica crea all’istante mistero e una sfumatura ispano-orientale. Quella b2 si inclina in modo irresistibile verso la fondamentale.",
    usage: "<strong>Uso musicale:</strong> L’anima del flamenco (spesso con terza maggiore nel <em>frigio dominante</em>), del metal e del djent (Metallica), della trap cupa e dei thriller ad alta tensione.",
    notes: "C4,Db4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "locrian",
    name: "Locrio",
    family: "minor",
    familyLabel: "Famiglia minore",
    brightness: "7 / 7 • Diminuito & instabile",
    badgeClass: "badge-lilac",
    rootLabel: "Do",
    stammton: "7° modo della scala maggiore (come Do maggiore partendo da Si)",
    formula: "1 · b2 · b3 · 4 · b5 · b6 · b7",
    steps: "½T – T – T – ½T – T – T – T",
    charNote: "Quinta diminuita (b5, es. Sol♭) + b2",
    vamp: "i° – bII (Do m7b5 – Re♭)",
    desc: "L’unico modo diatonico privo di una quinta giusta stabile sulla propria fondamentale. Al suo posto, la stessa triade di tonica è diminuita / semidiminuita (m7b5), carica di inquietudine.",
    usage: "<strong>Uso musicale:</strong> Raro come tonalità di un intero brano (es. Björk <em>Army of Me</em>, progressive metal), ma indispensabile nel jazz sugli accordi semidiminuiti (ii°7 nei ii–V–i minori) e nelle scene di tensione.",
    notes: "C4,Db4,Eb4,F4,Gb4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "Gb4", "Bb4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "harmonic-minor",
    name: "Minore armonica (variante extra)",
    family: "variant",
    familyLabel: "Variante minore",
    brightness: "Drammatica • classica, neoclassica & orientale",
    badgeClass: "badge-peach",
    rootLabel: "Do",
    stammton: "Minore naturale con il 7° grado alterato a sensibile (#7)",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · #7",
    steps: "T – ½T – T – T – ½T – 1½ – ½T",
    charNote: "Sensibile maggiore (7) + salto di seconda aumentata (b6 → 7, 3 semitoni!)",
    vamp: "i – V7 (Do m – Sol7)",
    desc: "Unisce la cupa b6 dell’eolio a una brillante sensibile maggiore (7). Tra le due si apre un salto espressivo di 3 semitoni che evoca subito il dramma barocco, il tango o la fioritura orientale.",
    usage: "<strong>Uso musicale:</strong> Offre alle tonalità minori una vera dominante maggiore V7 (Bach, Mozart, flamenco, metal neoclassico alla Yngwie Malmsteen). Il suo 5° modo genera il <em>frigio dominante</em>.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,B4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["G3", "B4", "D5", "F5"]]
  },
  {
    id: "melodic-minor",
    name: "Minore melodica (minore jazz)",
    family: "variant",
    familyLabel: "Variante minore",
    brightness: "Raffinata • cinema noir, jazz moderno & fusion",
    badgeClass: "badge-sage",
    rootLabel: "Do",
    stammton: "Identica alla maggiore, con la sola terza abbassata (b3)",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · 7",
    steps: "T – ½T – T – T – T – T – ½T",
    charNote: "b3 unita alla 6ª maggiore (♮6) e alla sensibile (7)",
    vamp: "imMaj7 – IV7 (Do mMaj7 – Fa7)",
    desc: "In origine veniva usata in senso ascendente per addolcire l’ampio salto della minore armonica (per poi scendere in minore naturale). Il jazz moderno mantiene questa forma innalzata in entrambe le direzioni come universo armonico autonomo.",
    usage: "<strong>Uso musicale:</strong> Quella tinta misteriosa da cinema noir (mMaj7) e scala madre di colori chiave del jazz come il lidio dominante (4° modo) o la scala alterata (7° modo).",
    notes: "C4,D4,Eb4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "Eb4", "G4", "B4"], ["F3", "A4", "C5", "Eb5"]]
  }
];
function renderModesReferenceHTML_IT(familyFilter = "all") {
  const list = MODES_ENCYCLOPEDIA_IT.filter(m => familyFilter === "all" || m.family === familyFilter);

  const introHeader = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Principio fondamentale</span>
        <span class="k-ratio-chip">Relativo vs. parallelo</span>
      </div>
      <h4>Che cos’è esattamente un modo?</h4>
      <p>
        Un <strong>modo</strong> nasce quando si usano esattamente le stesse note ma si sceglie un’altra nota come <strong>centro di riposo (tonica)</strong>. Resta solo sui tasti bianchi del pianoforte (le note di Do maggiore) e ogni punto di partenza disegna una nuova sequenza di toni e semitoni: parti da <code>Re</code> per il <em>dorico</em>, <code>Mi</code> per il <em>frigio</em>, <code>Fa</code> per il <em>lidio</em>, <code>Sol</code> per il <em>misolidio</em>, <code>La</code> per l’<em>eolio</em> o <code>Si</code> per il <em>locrio</em>.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>1. Approccio relativo (stessi tasti)</h5>
          <p>Pratico sulla tastiera: «Re dorico usa gli stessi tasti di Do maggiore». All’inizio inganna di più l’orecchio, perché Do continua ad attirarlo.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>2. Approccio parallelo (stessa fondamentale!)</h5>
          <p><strong>La chiave dell’ascolto:</strong> suona tutti i 7 modi partendo da <code>Do</code>! Una sola nota distintiva rivela subito il colore del modo (ad es. <code>Do → Fa♯</code> = lidio, <code>Do → Si♭</code> = misolidio).</p>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">Lo spettro di luminosità modale</span>
        <span class="k-ratio-chip">Chiaro → scuro</span>
      </div>
      <h4>Ordinati dal più luminoso al più scuro (secondo il circolo delle quinte)</h4>
      <p>
        Ordina i 7 modi ecclesiastici dal più radioso al più cupo anziché per gradi 1–7: a ogni passo, <strong>una sola nota scende di un semitono</strong>, esattamente nell’ordine del circolo delle quinte:
      </p>
      <div class="mode-spectrum-strip">
        <span class="mode-spec-chip is-bright">1. Lidio (#4)</span>
        <span class="mode-spec-chip">2. Ionico</span>
        <span class="mode-spec-chip">3. Misolidio (b7)</span>
        <span class="mode-spec-chip">4. Dorico (b3, b7)</span>
        <span class="mode-spec-chip">5. Eolio (+b6)</span>
        <span class="mode-spec-chip">6. Frigio (+b2)</span>
        <span class="mode-spec-chip is-dark">7. Locrio (+b5)</span>
      </div>
    </article>

    <div class="k-filter-row" aria-label="Filtra i modi">
      <button class="k-filter-pill ${familyFilter === "all" ? "active" : ""}" data-mfilter="all">Tutti (9)</button>
      <button class="k-filter-pill ${familyFilter === "major" ? "active" : ""}" data-mfilter="major">Famiglia maggiore (3)</button>
      <button class="k-filter-pill ${familyFilter === "minor" ? "active" : ""}" data-mfilter="minor">Famiglia minore (4)</button>
      <button class="k-filter-pill ${familyFilter === "variant" ? "active" : ""}" data-mfilter="variant">Varianti minori (2)</button>
    </div>
  `;

  const cards = list.map(m => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${m.family === "major" ? "tag-peach" : m.family === "minor" ? "tag-lilac" : "tag-sage"}">${m.familyLabel} • ${m.brightness}</span>
        <span class="k-ratio-chip">${m.formula}</span>
      </div>
      <h4>${m.name} (esempio su ${m.rootLabel})</h4>
      <p class="k-char">${m.stammton}</p>
      <p><strong>Nota caratteristica:</strong> ${m.charNote}<br><strong>Struttura:</strong> <code>${m.steps}</code></p>
      <p>${m.desc}</p>
      <p>${m.usage}</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-mode-scale="${m.id}">▶ Scala (${m.rootLabel})</button>
        <button class="btn-tool" data-play-mode-vamp="${m.id}">▶ Loop: ${m.vamp}</button>
      </div>
    </article>
  `).join("");

  const tipsCard = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Composizione &amp; armonia modale</span>
        <span class="k-ratio-chip">Mantenere il centro modale</span>
      </div>
      <h4>Scrivere in modo modale senza ricadere involontariamente nel maggiore</h4>
      <ul class="k-physics-list">
        <li><strong>Evita il tritono della scala madre:</strong> Nelle note di Do maggiore, <code>Fa</code> e <code>Si</code> formano il tritono di Sol7, che trascina subito l’orecchio verso Do. Stai componendo in Re dorico o Sol misolidio? Evita di insistere su Sol7 → Do per proteggere il centro del modo.</li>
        <li><strong>Appoggiati su loop di due accordi:</strong> Al posto di lunghe cadenze funzionali, fai respirare il brano tra la tonica e l’accordo vicino che contiene la <strong>nota caratteristica</strong> (ad es. <code>Dom – Fa</code> in Do dorico fa brillare il <code>La</code> luminoso).</li>
        <li><strong>Ancora il brano con un bordone (pedale):</strong> Tenere una quinta vuota al basso fissa all’istante il centro modale: ogni intervallo caratteristico risalta subito al di sopra.</li>
      </ul>
    </article>
  `;

  return introHeader + `<div class="knowledge-list">${cards}</div>` + tipsCard;
}

const KEYS_CIRCLE_DATA_IT = [
  {
    id: "key-0",
    group: "neutral",
    sigBadge: "0 alterazioni",
    majorName: "Do maggiore",
    minorName: "La minore",
    rootMidi: 60,
    minorMidi: 57,
    accidentalList: "Nessun diesis né bemolle (solo tasti bianchi)",
    chords: "I Do · ii Rem · iii Mim · IV Fa · V Sol · vi Lam",
    instrumentTip: "Punto di partenza classico al pianoforte, al flauto dolce e nel riscaldamento vocale"
  },
  {
    id: "key-1s",
    group: "sharp",
    sigBadge: "1 ♯",
    majorName: "Sol maggiore",
    minorName: "Mi minore",
    rootMidi: 55,
    minorMidi: 52,
    accidentalList: "1♯: Fa♯ (sensibile verso Sol)",
    chords: "I Sol · ii Lam · iii Sim · IV Do · V Re · vi Mim",
    instrumentTip: "Amatissima dagli archi (corde a vuoto Sol/Re/La/Mi) e dalla chitarra acustica"
  },
  {
    id: "key-2s",
    group: "sharp",
    sigBadge: "2 ♯",
    majorName: "Re maggiore",
    minorName: "Si minore",
    rootMidi: 62,
    minorMidi: 59,
    accidentalList: "2♯: Fa♯, Do♯",
    chords: "I Re · ii Mim · iii Fa♯m · IV Sol · V La · vi Sim",
    instrumentTip: "Tonalità orchestrale brillante e festosa (trombe barocche, violino, violoncello)"
  },
  {
    id: "key-3s",
    group: "sharp",
    sigBadge: "3 ♯",
    majorName: "La maggiore",
    minorName: "Fa♯ minore",
    rootMidi: 57,
    minorMidi: 54,
    accidentalList: "3♯: Fa♯, Do♯, Sol♯",
    chords: "I La · ii Sim · iii Do♯m · IV Re · V Mi · vi Fa♯m",
    instrumentTip: "Aperta, radiosa e scorrevole sia sulla chitarra sia sugli archi"
  },
  {
    id: "key-4s",
    group: "sharp",
    sigBadge: "4 ♯",
    majorName: "Mi maggiore",
    minorName: "Do♯ minore",
    rootMidi: 64,
    minorMidi: 61,
    accidentalList: "4♯: Fa♯, Do♯, Sol♯, Re♯",
    chords: "I Mi · ii Fa♯m · iii Sol♯m · IV La · V Si · vi Do♯m",
    instrumentTip: "Firma inconfondibile della chitarra elettrica, del blues e del rock (corda grave di Mi a vuoto)"
  },
  {
    id: "key-5s",
    group: "sharp",
    sigBadge: "5 ♯ / 7 ♭",
    majorName: "Si maggiore (= Do♭ maggiore)",
    minorName: "Sol♯ minore (= La♭ minore)",
    rootMidi: 59,
    minorMidi: 56,
    accidentalList: "5♯: Fa♯, Do♯, Sol♯, Re♯, La♯ (enarmonica di Do♭ maggiore con 7♭)",
    chords: "I Si · ii Do♯m · iii Re♯m · IV Mi · V Fa♯ · vi Sol♯m",
    instrumentTip: "Sorprendentemente comoda al pianoforte, perché tutti i 5 tasti neri seguono la forma della mano"
  },
  {
    id: "key-6",
    group: "sharp",
    sigBadge: "6 ♯ / 6 ♭",
    majorName: "Fa♯ maggiore / Sol♭ maggiore",
    minorName: "Re♯ minore / Mi♭ minore",
    rootMidi: 54,
    minorMidi: 51,
    accidentalList: "6♯ (Fa♯, Do♯, Sol♯, Re♯, La♯, Mi♯) o 6♭ (Si♭, Mi♭, La♭, Re♭, Sol♭, Do♭)",
    chords: "I Fa♯/Sol♭ · ii Sol♯m/La♭m · IV Si/Do♭ · V Do♯/Re♭ · vi Re♯m/Mi♭m",
    instrumentTip: "Esattamente sul lato opposto di Do maggiore nel circolo (polo del tritono!). Crocevia enarmonico"
  },
  {
    id: "key-5f",
    group: "flat",
    sigBadge: "5 ♭ / 7 ♯",
    majorName: "Re♭ maggiore (= Do♯ maggiore)",
    minorName: "Si♭ minore (= La♯ minore)",
    rootMidi: 61,
    minorMidi: 58,
    accidentalList: "5♭: Si♭, Mi♭, La♭, Re♭, Sol♭ (enarmonica di Do♯ maggiore con 7♯)",
    chords: "I Re♭ · ii Mi♭m · iii Fam · IV Sol♭ · V La♭ · vi Si♭m",
    instrumentTip: "Molto amata nel pianoforte romantico, nel soul e nelle ballad jazz (vellutata sotto i tasti neri)"
  },
  {
    id: "key-4f",
    group: "flat",
    sigBadge: "4 ♭",
    majorName: "La♭ maggiore",
    minorName: "Fa minore",
    rootMidi: 56,
    minorMidi: 53,
    accidentalList: "4♭: Si♭, Mi♭, La♭, Re♭",
    chords: "I La♭ · ii Si♭m · iii Dom · IV Re♭ · V Mi♭ · vi Fam",
    instrumentTip: "Grande protagonista degli standard jazz, delle armonie per fiati e delle ballad R&B/pop"
  },
  {
    id: "key-3f",
    group: "flat",
    sigBadge: "3 ♭",
    majorName: "Mi♭ maggiore",
    minorName: "Do minore",
    rootMidi: 63,
    minorMidi: 60,
    accidentalList: "3♭: Si♭, Mi♭, La♭",
    chords: "I Mi♭ · ii Fam · iii Solm · IV La♭ · V Si♭ · vi Dom",
    instrumentTip: "Tonalità sinfonica eroica (l’Eroica di Beethoven); ideale per sax contralto e ottoni"
  },
  {
    id: "key-2f",
    group: "flat",
    sigBadge: "2 ♭",
    majorName: "Si♭ maggiore",
    minorName: "Sol minore",
    rootMidi: 58,
    minorMidi: 55,
    accidentalList: "2♭: Si♭, Mi♭",
    chords: "I Si♭ · ii Dom · iii Rem · IV Mi♭ · V Fa · vi Solm",
    instrumentTip: "Tonalità regina del jazz, delle big band, delle bande musicali e di trombe e clarinetti in Si♭"
  },
  {
    id: "key-1f",
    group: "flat",
    sigBadge: "1 ♭",
    majorName: "Fa maggiore",
    minorName: "Re minore",
    rootMidi: 53,
    minorMidi: 62,
    accidentalList: "1♭: Si♭ (il Si♮ scende a Si♭)",
    chords: "I Fa · ii Solm · iii Lam · IV Si♭ · V Do · vi Rem",
    instrumentTip: "Risonanza morbida e pastorale; registro naturale e comodo per corni, flauti e cori"
  }
];

function renderKeysReferenceHTML_IT(circleFilter = "all") {
  const list = KEYS_CIRCLE_DATA_IT.filter(k => circleFilter === "all" || k.group === circleFilter);

  const theoryIntro = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Concetto base</span>
        <span class="k-ratio-chip">Tonalità &amp; armature di chiave</span>
      </div>
      <h4>Scala vs. tonalità: che cosa fa davvero una tonalità?</h4>
      <p>
        Una <strong>scala</strong> non è altro che una lista ordinata di altezze (ad es. Do–Re–Mi–Fa–Sol–La–Si–Do). Una <strong>tonalità</strong> descrive l’intero <em>sistema di gravità magnetica</em> attorno a un centro: stabilisce il punto di riposo (<strong>tonica / fondamentale</strong>), il colore (<strong>maggiore</strong> luminoso vs. <strong>minore</strong> profondo) e le alterazioni permanenti tramite l’<strong>armatura di chiave</strong> (♯ o ♭).
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Perché esistono le armature di chiave?</strong>
          Ogni scala maggiore richiede esattamente lo stesso schema di distanze: <code>T – T – S – T – T – T – S</code> (semitoni tra 3–4 e 7–8). Se si parte da <code>Sol</code> invece che da Do, il 7° grado (<code>Fa</code>) risulta troppo basso: bisogna alzarlo a <code>Fa♯</code> per ritrovare la sensibile!
        </div>
        <div class="physics-fact-item">
          <strong>Armatura di chiave vs. alterazione transitoria</strong>
          L’<strong>armatura di chiave</strong>, posta subito accanto alla chiave, vale per tutto il brano. Un’<strong>alterazione transitoria</strong> (accidentale) nel mezzo di una battuta vale solo fino alla stanghetta successiva, per una sfumatura passeggera.
        </div>
      </div>
    </article>

    <div class="k-sibling-bar">
      <span><strong>Esplora con gli occhi &amp; l’orecchio:</strong> Apri la ruota interattiva del circolo delle quinte con accordi e modulazioni dal vivo.</span>
      <button type="button" class="btn-tool" data-jump-ref="circle-of-fifths">Apri il circolo delle quinte →</button>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Logica del circolo delle quinte</span>
        <span class="k-ratio-chip">3:2 → 12 tonalità</span>
      </div>
      <h4>Perché le 12 tonalità formano un orologio perfetto</h4>
      <p>
        Subito dopo l’ottava (2:1), la <strong>quinta giusta (3:2)</strong> è il legame armonico più forte della musica. Procedi in senso orario per quinte ascendenti (<code>Do → Sol → Re → La → Mi → Si → Fa♯</code>): ogni passo aggiunge un nuovo <strong>diesis (♯)</strong>. Procedi in senso antiorario per quarte ascendenti (<code>Do → Fa → Si♭ → Mi♭ → La♭ → Re♭ → Sol♭</code>): ogni passo aggiunge un nuovo <strong>bemolle (♭)</strong>.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Senso orario: tonalità con i diesis (♯)</h5>
          <p><strong>Ordine delle tonalità:</strong> <em>Sol, Re, La, Mi, Si, Fa♯</em>.<br><strong>Ordine dei diesis:</strong> <code>Fa♯ – Do♯ – Sol♯ – Re♯ – La♯ – Mi♯</code> (<em>Fa Do Sol Re La Mi Si</em>: l’ultimo diesis è sempre la sensibile, un semitono sotto la tonica!).</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Senso antiorario: tonalità con i bemolli (♭)</h5>
          <p><strong>Ordine delle tonalità:</strong> <em>Fa, Si♭, Mi♭, La♭, Re♭, Sol♭</em>.<br><strong>Ordine dei bemolli:</strong> <code>Si♭ – Mi♭ – La♭ – Re♭ – Sol♭ – Do♭</code> (<em>Si Mi La Re Sol Do Fa</em>). Trucco: il <strong>penultimo bemolle</strong> dà il nome alla tonalità maggiore!</p>
        </div>
      </div>
      <p class="k-tip"><strong>Comma pitagorico &amp; enarmonia:</strong> Impilare 12 quinte pure 3:2 supera 7 ottave di circa 23,5 cent (il <em>comma pitagorico</em>). Il <strong>temperamento equabile moderno</strong> distribuisce questa microdifferenza sui 12 semitoni, così <code>Fa♯ maggiore</code> (6♯) e <code>Sol♭ maggiore</code> (6♭) cadono esattamente sugli stessi tasti del pianoforte.</p>
    </article>

    <div class="section-heading-row">
      <h2 class="section-heading">3. Atlante completo delle 12 tonalità</h2>
    </div>

    <div class="k-filter-row" aria-label="Filtra le tonalità per armatura di chiave">
      <button class="k-filter-pill ${circleFilter === "all" ? "active" : ""}" data-kfilter="all">Tutte le 12 tonalità</button>
      <button class="k-filter-pill ${circleFilter === "neutral" ? "active" : ""}" data-kfilter="neutral">Do / Lam (0 alt.)</button>
      <button class="k-filter-pill ${circleFilter === "sharp" ? "active" : ""}" data-kfilter="sharp">Diesis (♯)</button>
      <button class="k-filter-pill ${circleFilter === "flat" ? "active" : ""}" data-kfilter="flat">Bemolli (♭)</button>
    </div>
  `;

  const keyCards = list.map(k => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${k.group === "neutral" ? "tag-sage" : k.group === "sharp" ? "tag-peach" : "tag-lilac"}">${k.sigBadge}</span>
        <span class="k-ratio-chip">${k.majorName} / ${k.minorName}</span>
      </div>
      <h4>${k.majorName} &amp; relativa ${k.minorName}</h4>
      <p><strong>Armatura di chiave:</strong> ${k.accidentalList}</p>
      <p><strong>Accordi diatonici:</strong> <code>${k.chords}</code></p>
      <p class="k-tip">${k.instrumentTip}</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-key-cadence="${k.rootMidi}" data-key-mode="major">▶ Cadenza ${k.majorName.split(" ")[0]} magg.</button>
        <button class="btn-tool" data-play-key-cadence="${k.minorMidi}" data-key-mode="minor">▶ ${k.minorName}</button>
      </div>
    </article>
  `).join("");

  const extraSections = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. I 3 volti del minore</span>
        <span class="k-ratio-chip">Perché esistono 3 scale minori</span>
      </div>
      <h4>Minore naturale, armonica &amp; melodica (in La minore)</h4>
      <p>
        Mentre il maggiore mantiene un’unica forma, la musica in minore usa tre varianti complementari perché al minore naturale manca una sensibile a un semitono dalla tonica (<code>Sol → La</code> è un tono intero, meno incisivo di <code>Sol♯ → La</code>):
      </p>
      <ul class="k-physics-list">
        <li><strong>Minore naturale (eolia):</strong> Riprende esattamente l’armatura della sua relativa maggiore (<code>La–Si–Do–Re–Mi–Fa–Sol–La</code>). Folk, autentica e scorrevole.</li>
        <li><strong>Minore armonica:</strong> Alza il 7° grado (<code>Sol → Sol♯</code>) così che il V grado diventi una vera <strong>dominante maggiore (Mi7)</strong>. Crea un intervallo espressivo di 3 semitoni tra <code>Fa</code> e <code>Sol♯</code>.</li>
        <li><strong>Minore melodica:</strong> Addolcisce quel salto per chi canta alzando anche il 6° grado in salita (<code>Fa → Fa♯, Sol → Sol♯</code>); la musica classica di solito scende di nuovo in minore naturale, mentre il jazz mantiene la forma alterata in entrambi i sensi.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G4,A4" data-dur="0.45" data-step="320">▶ La minore naturale</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G#4,A4" data-dur="0.45" data-step="320">▶ La minore armonica</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F#4,G#4,A4" data-dur="0.45" data-step="320">▶ La minore melodica</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Relazioni tra tonalità &amp; modulazioni</span>
        <span class="k-ratio-chip">Cambiare tonalità</span>
      </div>
      <h4>Come dialogano le tonalità &amp; come modulano con naturalezza</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Relativa minore / maggiore (3 semitoni di distanza)</strong>
          Condividono esattamente le stesse note e la stessa armatura di chiave: <code>Do maggiore ↔ La minore</code>, <code>Sol maggiore ↔ Mi minore</code>. Passare da un centro all’altro suona naturale e immediato.
        </div>
        <div class="physics-fact-item">
          <strong>Omonima maggiore / minore (stessa tonica)</strong>
          Mantengono la stessa tonica ma scambiano maggiore e minore: <code>Do maggiore ↔ Do minore</code> (3 bemolli di differenza!). Regala svolte teatrali come la celebre «terza piccarda».
        </div>
        <div class="physics-fact-item">
          <strong>Tonalità vicine (adiacenti sul circolo)</strong>
          Le vicine a un passo in senso orario o antiorario (<code>Do maggiore ↔ Sol</code> o <code>Fa</code>) differiscono per una sola nota. Gli accordi perno (come <code>Lam</code>) assicurano passaggi impercettibili.
        </div>
        <div class="physics-fact-item">
          <strong>Medianti cromatiche &amp; modulazione di un tono</strong>
          Scivolare di una terza (<code>Do → La♭</code> o <code>Mi</code>) cambia più alterazioni di colpo per un effetto cinematografico immediato, mentre una salita diretta di un semitono o di un tono nell’ultimo ritornello moltiplica l’energia.
        </div>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-custom="key-variant">▶ Omonime Do ↔ Dom</button>
        <button class="btn-tool" data-play-custom="key-mediant">▶ Mediante Do → La♭ → Do</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">6. Strumenti traspositori &amp; colore delle tonalità</span>
        <span class="k-ratio-chip">Pratica d’insieme</span>
      </div>
      <h4>Perché i fiati non leggono la stessa armatura del pianoforte</h4>
      <p>
        Mentre pianoforte, chitarra, archi e flauto leggono in <strong>Do (suono reale)</strong>, molti strumenti a fiato traspositori sono costruiti così per permettere le stesse diteggiature da un taglio all’altro:
      </p>
      <ul class="k-physics-list">
        <li><strong>Strumenti in Si♭ (tromba, clarinetto, sax tenore):</strong> Un <code>Do</code> scritto suona come un <code>Si♭</code> reale (una seconda maggiore più grave). Quando il gruppo suona in <code>Si♭ maggiore (2♭)</code>, la tromba legge tranquillamente in <code>Do maggiore (0 alterazioni)</code>!</li>
        <li><strong>Strumenti in Mi♭ (sax contralto, sax baritono):</strong> Un <code>Do</code> scritto suona come un <code>Mi♭</code> reale (una sesta maggiore sotto). Quando l’ensemble suona in <code>Mi♭ maggiore (3♭)</code>, il sax contralto legge in <code>Do maggiore</code>.</li>
        <li><strong>Strumenti in Fa (corno francese, corno inglese):</strong> Un <code>Do</code> scritto suona una quinta giusta più grave, come un <code>Fa</code> reale.</li>
      </ul>
      <p class="k-tip"><strong>«Carattere» delle tonalità:</strong> Prima del temperamento equabile, le disuguaglianze d’accordatura davano a ogni tonalità un sapore proprio (<em>Re♭</em> vellutato, <em>Re</em> brillante). Oggi le 12 tonalità condividono le stesse proporzioni matematiche, ma gli strumenti reali continuano a colorare ogni tonalità con le corde a vuoto, la risonanza del canneggio e la tessitura vocale.</p>
    </article>
  `;

  return theoryIntro + `<div class="knowledge-list">${keyCards}</div>` + extraSections;
}

function renderSingAndPlayReferenceHTML_IT() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">1. Perché all’inizio la coordinazione si inceppa</span>
        <span class="k-ratio-chip">Pilota automatico &amp; focus</span>
      </div>
      <h4>Perché cantare accompagnandosi sembra così difficile all’inizio</h4>
      <p>
        Nel momento in cui suoni e canti insieme, due sistemi del tutto indipendenti condividono esattamente lo stesso tempo: le tue <strong>mani</strong> (memoria motoria, posizioni degli accordi, strumming) e la tua <strong>voce</strong> (respiro, intonazione, testo). La memoria di lavoro semplicemente non riesce a controllare con la lente d’ingrandimento due novità nello stesso istante.
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Metti almeno una parte con il pilota automatico</strong>
          Finché voce e mani si intralciano, il tuo cervello sta ancora dirigendo attivamente entrambe. Soluzione: ripeti l’accompagnamento (o la linea vocale) finché scorre da solo, come salire le scale.
        </div>
        <div class="physics-fact-item">
          <strong>Metti al sicuro il ritmo prima delle note</strong>
          Il 90% dei blocchi è ritmico, non melodico! Quando una sillaba cade tra due battiti, le mani si congelano finché i due ritmi non vengono allineati con chiarezza.
        </div>
        <div class="physics-fact-item">
          <strong>Canticchia prima con «La» o «Du»</strong>
          Ricordare un testo assorbe un’energia mentale enorme. Canticchiare la melodia su una sola sillaba neutra libera subito attenzione per l’intonazione e il groove.
        </div>
        <div class="physics-fact-item">
          <strong>Una sola pulsazione interna condivisa</strong>
          Lascia che comandi un leggero battito di piede o un metronomo: la voce non rincorre le mani e le mani non aspettano la voce; <em>entrambe</em> rispondono allo stesso battito.
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Esercitarsi con metodo in 5 passi</span>
        <span class="k-ratio-chip">Metodo passo passo</span>
      </div>
      <h4>La routine collaudata in 5 passi per qualsiasi canzone</h4>
      <p>
        Invece di ripartire sempre dalla battuta 1 e inciampare nello stesso punto, scomponi brevemente la coordinazione in cinque passaggi concreti:
      </p>
      <ul class="article-steps-list">
        <li>
          <strong>1. La prova della conversazione (automatizzare le mani):</strong> Ripeti in loop l’accompagnamento per 1–2 minuti finché riesci a contare a voce alta fino a 20 o a chiacchierare tranquillamente sopra. Se le mani si bloccano mentre parli, regalati altri 5 minuti di solo strumento.
        </li>
        <li>
          <strong>2. Recitare il testo a ritmo:</strong> Suona i tuoi accordi mentre <strong>reciti il testo rigorosamente a tempo</strong> su una normale altezza parlata. Togliere la melodia rivela subito quali sillabe cadono sui battiti e quali tra un colpo e l’altro.
        </li>
        <li>
          <strong>3. Individuare i punti d’incontro fisici:</strong> Segna riferimenti precisi: <em>«Il pollice suona il basso sulla parola “notte”»</em> oppure <em>«“libero” cade sulla pennata in su tra 2 e 3»</em>. Il cervello si sincronizza senza fatica su appigli concreti!
        </li>
        <li>
          <strong>4. Alleggerire gli accordi &amp; mandare in loop 1–2 battute:</strong> Inizia letteralmente con <strong>un solo accordo tenuto sul battere del 1</strong> mentre canti liberamente sopra. Quando è solido, aggiungi il battito 3 e poi reinserisci il ritmo completo, sempre su piccoli loop di 1–2 battute!
        </li>
        <li>
          <strong>5. Rallentatore (60%) &amp; «canto fantasma»:</strong> Riduci il tempo quasi a metà. Sugli attacchi difficili, articola in silenzio o pensa la melodia per un giro di accompagnamento, canticchiala al giro seguente e poi cantala con decisione.
        </li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">3. Esercizi quotidiani di indipendenza</span>
        <span class="k-ratio-chip">Da provare subito</span>
      </div>
      <h4>6 esercizi concreti di coordinazione &amp; indipendenza</h4>
      <p>
        Cinque o otto minuti con uno o due di questi esercizi prima del tuo repertorio sbloccano l’indipendenza molto più in fretta del ripetere a forza:
      </p>
      <ul class="k-physics-list">
        <li>
          <strong>Esercizio 1 – Prova del parlare &amp; contare:</strong> Suona una progressione scorrevole di quattro accordi (<code>I – V – vi – IV</code>) con un groove regolare mentre leggi a voce alta un breve testo o conti alla rovescia da 20 a 1. Regola: il groove non deve spostarsi di un millimetro.
        </li>
        <li>
          <strong>Esercizio 2 – Accordi in semibrevi sul battere del 1:</strong> Suona ogni accordo una sola volta sul battito 1 (tenuto come semibreve) e canta l’intera strofa su quella risonanza aperta. Sviluppa il fraseggio, la gestione del fiato e i cambi d’accordo senza fretta.
        </li>
        <li>
          <strong>Esercizio 3 – Bordone fisso di quinta:</strong> Mantieni sullo strumento un semplice bordone di fondamentale + quinta (<code>Do3 + Sol3</code>) mentre canti melodie o intervalli sopra. Allena l’orecchio senza affaticare la mano sinistra.
        </li>
        <li>
          <strong>Esercizio 4 – Anticipi &amp; la trappola del «4-e»:</strong> Nel pop e nel soul, la voce inizia spesso mezzo battito <em>prima</em> (sul levare del <code>4-e</code>) mentre chitarra o pianoforte cambiano puliti sul battere del 1. Batti semiminime regolari mentre la voce entra esattamente sulla «e».
        </li>
        <li>
          <strong>Esercizio 5 – Basso in movimento vs. nota cantata tenuta:</strong> Fai camminare una semplice linea di basso (ad es. <code>Do – Fa – Sol – Do</code>) mentre la voce tiene ferma una nota comune (<code>Sol</code>), oppure viceversa: tieni un accordo fisso mentre canti la scala.
        </li>
        <li>
          <strong>Esercizio 6 – Il controllo di 20 secondi con lo smartphone:</strong> Registra un breve loop con il telefono e riascoltalo subito. Ascoltarti dall’esterno rivela all’istante i battiti persi o le accelerazioni.
        </li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Es. 1: groove su cui parlare sopra</button>
        <button class="btn-tool" data-play-custom="sp-drone">▶ Es. 3: bordone + melodia</button>
        <button class="btn-tool" data-play-custom="sp-syncopation">▶ Es. 4: battere vs. anticipo</button>
        <button class="btn-tool" data-play-custom="sp-poly">▶ Es. 5: basso in movimento, nota tenuta</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. Trucchi per strumento &amp; errori frequenti</span>
        <span class="k-ratio-chip">Chitarra, pianoforte &amp; voce</span>
      </div>
      <h4>Consigli pratici per risparmiarti settimane di fatica</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Chitarra: tieni il pendolo in movimento</strong>
          Il tuo avambraccio destro è un metronomo ininterrotto (<em>giù – su – giù – su</em>). Anche durante le pause o le sincopi vocali, non fermare mai il braccio: passa semplicemente sopra le corde senza toccarle.
        </div>
        <div class="physics-fact-item">
          <strong>Pianoforte: aggiungi un ritmo alla volta</strong>
          Inizia solo con <em>fondamentali alla mano sinistra sul battito 1 + canto</em>. Poi aggiungi accordi tranquilli alla mano destra su 1 e 3. Arpeggi fitti o controcanti arrivano solo alla fine.
        </div>
        <div class="physics-fact-item">
          <strong>Trasporta nella tua tessitura comoda</strong>
          Sforzare acuti scomodi distrugge all’istante la coordinazione delle mani. Non esitare mai a usare un <strong>capotasto</strong> o a trasportare di ±2 semitoni perché la voce scorra con naturalezza.
        </div>
        <div class="physics-fact-item">
          <strong>Programma i respiri come se fossero note</strong>
          Gli inciampi accadono quasi sempre tra due frasi e non a metà battuta! Riserva consapevolmente un respiro di un quarto prima del ritornello mentre lo strumento prosegue tranquillo.
        </div>
      </div>
      <p class="k-tip"><strong>Trucco extra di Lauscher:</strong> Nei moduli <strong>Solfeggio</strong> e <strong>Melodie</strong> di Lauscher, prova a cantare a voce alta la nota cercata <em>prima</em> di premere il tasto: così unisci orecchio, voce e dita in un unico riflesso.</p>
    </article>
  `;
}

function renderCircleOfFifthsTheoryHTML_IT() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. L’idea chiave</span>
        <span class="k-ratio-chip">3:2 • 12 tonalità</span>
      </div>
      <h4>Che cos’è il circolo delle quinte e perché è un cerchio?</h4>
      <p>
        Subito dopo l’ottava (<code>2:1</code>), la <strong>quinta giusta (3:2)</strong> è il legame acustico più potente della musica. Salendo di quinta in quinta da <strong>Do</strong> (<code>Do → Sol → Re → La → Mi → Si → Fa♯…</code>), ogni passo alza una sola nota per creare la sensibile successiva, aggiungendo <strong>un diesis (♯)</strong> in senso orario. Scendendo per quinte (cioè salendo per <strong>quarte</strong>: <code>Do → Fa → Si♭ → Mi♭ → La♭ → Re♭ → Sol♭</code>), il colore si ammorbidisce a ogni passo e si aggiunge <strong>un bemolle (♭)</strong> in senso antiorario.
      </p>
      <p>
        Dopo 12 passi, il temperamento equabile richiude la spirale su sé stessa a <strong>ore 6 (Fa♯ / Sol♭)</strong>, dove 6 diesis e 6 bemolli cadono esattamente sugli stessi tasti del pianoforte (<strong>enarmonia</strong>). Invece di memorizzare 12 scale isolate, hai una sola bussola musicale!
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Senso orario (+1 ♯) • quinte ascendenti</h5>
          <p><code>Do → Sol → Re → La → Mi → Si → Fa♯</code><br>La brillantezza sale passo dopo passo. Ordine dei diesis: <code>Fa♯ – Do♯ – Sol♯ – Re♯ – La♯ – Mi♯</code> (<em>Fa – Do – Sol – Re – La – Mi – Si</em>).</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Senso antiorario (+1 ♭) • quarte ascendenti</h5>
          <p><code>Do → Fa → Si♭ → Mi♭ → La♭ → Re♭ → Sol♭</code><br>Il colore si scalda e si distende. Ordine inverso dei bemolli: <code>Si♭ – Mi♭ – La♭ – Re♭ – Sol♭ – Do♭</code> (<em>Si – Mi – La – Re – Sol – Do – Fa</em>).</p>
        </div>
      </div>
    </article>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-peach">2. Istruzioni per l’uso</span>
            <span class="k-ratio-chip">Logica dell’orologio</span>
          </div>
          <h4>Leggere e usare la ruota in 20 secondi</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Anello esterno = maggiore, anello interno = relativa minore:</strong> Ogni spicchio abbina una tonalità maggiore alla sua <strong>relativa minore</strong> proprio sotto (<code>Do / Lam</code>, <code>Sol / Mim</code>, <code>Re / Sim</code>…). Entrambe condividono esattamente <em>le stesse 7 note e la stessa armatura di chiave</em>: il minore sposta semplicemente il centro 3 semitoni più in basso (6° grado / <em>La</em>).</li>
          <li><strong>Il trucco lampo per i diesis:</strong> Guarda l’<em>ultimo diesis</em> in chiave e sali di <strong>un semitono</strong>: ecco la tua tonica maggiore! (ad es. 2 diesis <code>Fa♯, Do♯</code> → un semitono sopra <code>Do♯</code> = <strong>Re maggiore</strong>).</li>
          <li><strong>Il trucco lampo per i bemolli:</strong> Il <em>penultimo bemolle</em> in chiave dà direttamente il nome alla tonalità maggiore! (ad es. 3 bemolli <code>Si♭, Mi♭, La♭</code> → il penultimo è <strong>Mi♭ maggiore</strong>; solo <code>1♭ = Fa maggiore</code> si ricorda così com’è).</li>
          <li><strong>Leggere sinistra, centro e destra come una bussola:</strong> Ogni casella scelta vale <code>I</code> (tonica). La vicina di sinistra è sempre la <strong>sottodominante (IV)</strong> e la vicina di destra è sempre la <strong>dominante (V)</strong>!</li>
        </ul>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-lilac">3. Un superpotere musicale</span>
            <span class="k-ratio-chip">Applicazioni concrete</span>
          </div>
          <h4>Cosa cambia appena padroneggi il circolo?</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>1. Mappa istantanea degli accordi di una tonalità</strong>
            Osserva i 3 spicchi illuminati sopra: la tonica e le sue due vicine immediate riuniscono i <strong>6 accordi diatonici principali</strong> della tonalità (<code>IV – I – V</code> all’esterno + <code>ii – vi – iii</code> all’interno)! Migliaia di successi pop, rock e folk stanno tutti in questa sola fetta di torta.
          </div>
          <div class="physics-fact-item">
            <strong>2. Trasportare senza calcoli mentali</strong>
            Troppo acuto per cantare? Ruota questo blocco di 3 spicchi lungo l’orologio: tutti i rapporti restano identici (<code>I–V–vi–IV</code> in Do diventa di un passo <code>Sol–Re–Mim–Do</code> oppure, a sinistra, <code>Fa–Do–Rem–Si♭</code>).
          </div>
          <div class="physics-fact-item">
            <strong>3. Modulazioni morbide &amp; colpi di scena</strong>
            Due caselle vicine differiscono per <strong>una sola nota</strong> (6 note in comune su 7!), offrendo modulazioni fluide tra strofa e ritornello. Attraversare il circolo fino al lato opposto (6 passi / tritono) rinnova quasi tutte le note per il massimo effetto drammatico.
          </div>
          <div class="physics-fact-item">
            <strong>4. Orecchio armonico &amp; lettura più rapidi</strong>
            Nota come le celebri progressioni jazz e pop (<code>iii – vi – ii – V – I</code>) avanzino <em>in senso antiorario</em> passo dopo passo sulla ruota! Il tuo orecchio anticipa geometricamente la fondamentale successiva.
          </div>
        </div>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">4. Esercizi pratici</span>
            <span class="k-ratio-chip">Suonare &amp; ascoltare</span>
          </div>
          <h4>4 modi concreti per esercitarti con il circolo</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Uscire dal duo «Do &amp; Sol»:</strong> Prendi qualsiasi frase, scala o progressione e spostala di un passo in senso orario ogni giorno (<code>Do → Sol → Re → La</code>) oppure lungo le tonalità dei fiati (<code>Fa → Si♭ → Mi♭ → La♭</code>). In 12 giorni avrai esplorato l’intero manico o tutta la tastiera.</li>
          <li><strong>Ascoltare le progressioni per quinte (<code>vi–ii–V–I</code>):</strong> Torna indietro passo passo verso ore 12: ogni accordo agisce come una mini-dominante attratta dallo spicchio successivo! Premi il pulsante qui sotto per sentire questa gravità magnetica in Do maggiore.</li>
          <li><strong>Prendere in prestito un colore vicino (dominanti secondarie):</strong> In Do maggiore vuoi più slancio prima di <code>Sol (V)</code>? Prendi in prestito il <code>Fa♯</code> dalla vicina di destra per trasformare il minore <code>ii (Rem)</code> in un luminoso <strong>Re7 (V/V)</strong> che punta dritto a Sol.</li>
          <li><strong>Mettere a confronto calore e slancio luminoso:</strong> Girare a sinistra sulla ruota (<code>I → IV → bVII</code>) dona una base soul e ben piantata; salire a destra (<code>I → V → V/V</code>) infonde slancio e luminosità.</li>
        </ul>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-progression="vi,ii,V7,I">▶ Ascolta la gravità del circolo (Lam–Rem–Sol7–Do)</button>
          <button class="btn-tool" data-play-progression="I,V/V,V,I">▶ Ascolta lo slancio orario (Do–Re (V/V)–Sol–Do)</button>
        </div>
      </div>
    </details>
  `;
}

function getIntervalNamingGuideHTML_IT() {
  const useGerman = typeof state !== "undefined" ? state?.profile?.intervalNotation !== "intl" : true;
  const schemeBadge = useGerman ? "Attivo: P / G / k" : "Attivo: P / M / m";
  const m2 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m2") : "m2";
  const M2 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M2") : "M2";
  const m3 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m3") : "m3";
  const M3 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M3") : "M3";
  return `
    <details class="knowledge-card k-accordion" id="intervalNamingGuideAccordion" open>
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">Abbreviazioni &amp; nomi</span>
            <span class="k-ratio-chip">${schemeBadge}</span>
          </div>
          <h4>Come leggere la notazione abbreviata (lettera + numero)</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <p>Ogni codice di intervallo concentra due informazioni in due caratteri: il <strong>numero</strong> indica quanti gradi della scala copre e la <strong>lettera</strong> precisa l’ampiezza esatta in semitoni.</p>
        <ul class="k-physics-list">
          <li><strong>1. Il numero (<code>1</code>–<code>9</code>) conta i nomi delle note:</strong> Da <code>1</code> = unisono (la stessa nota), <code>2</code> = seconda, <code>3</code> = terza, <code>4</code> = quarta, <code>5</code> = quinta, <code>6</code> = sesta, <code>7</code> = settima, <code>8</code> = ottava, fino a <code>9</code> = nona.</li>
          <li><strong>2. Intervalli giusti (<code>P</code>):</strong> <code>P1</code>, <code>P4</code>, <code>P5</code> e <code>P8</code> esistono in una sola forma pura (<em>Perfect</em> / giusto): nessuna variante maggiore o minore.</li>
          <li><strong>3. Coppie maggiore &amp; minore (<code>2</code>, <code>3</code>, <code>6</code>, <code>7</code>, <code>9</code>):</strong> Questi cinque intervalli esistono in due sfumature distanti <strong>1 semitono</strong>:<br>
            – <strong>Internazionale (<code>P / M / m</code>):</strong> la <strong><code>M</code></strong> maiuscola (<em>Major</em> / maggiore) indica l’intervallo grande e luminoso; la <strong><code>m</code></strong> minuscola (<em>minor</em> / minore) misura 1 semitono in meno (ad es. <code>M3</code> vs. <code>m3</code>). La minuscola cambia tutto!<br>
            – <strong>Tedesco (<code>P / G / k</code>):</strong> <strong><code>G</code></strong> maiuscola (<em>Groß</em> = maggiore) vs. <strong><code>k</code></strong> minuscola (<em>klein</em> = minore, ad es. <code>G3</code> vs. <code>k3</code>).</li>
          <li><strong>4. Tritono (<code>TT</code>):</strong> Divide l’ottava esattamente a metà a <strong>6 semitoni</strong>, proprio tra <code>P4</code> e <code>P5</code> (quarta aumentata / quinta diminuita).</li>
        </ul>
        <div class="k-meta-box">
          <div><strong>Simboli attivi:</strong> Seconde: <code>${m2}</code> (1 st) vs. <code>${M2}</code> (2 st) · Terze: <code>${m3}</code> (3 st) vs. <code>${M3}</code> (4 st)</div>
          <div><strong>Personalizza:</strong> Passa liberamente tra <strong>Internazionale (P / M / m)</strong> e <strong>Tedesco (P / G / k)</strong> in <strong>Impostazioni → Notazione musicale → Nomi degli intervalli</strong>.</div>
        </div>
      </div>
    </details>
  `;
}

function renderNotationReferenceHTML_IT() {
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
        <span class="k-card-tag tag-peach">1. Il pentagramma a 5 linee</span>
        <span class="k-ratio-chip">Linee &amp; spazi</span>
      </div>
      <h4>Come la musica diventa leggibile sulla carta</h4>
      <p>
        Lo spartito funziona come un sistema di coordinate: l’<strong>asse verticale</strong> rappresenta l’altezza (più in alto = più acuto, più in basso = più grave) e l’<strong>asse orizzontale</strong> fa scorrere il tempo da sinistra a destra.
      </p>
      <ul class="k-physics-list">
        <li><strong>Conta sempre dal basso verso l’alto:</strong> Un pentagramma ha <strong>5 linee</strong> (dalla 1ª in basso alla 5ª in alto) e <strong>4 spazi</strong> tra di esse.</li>
        <li><strong>Alternanza linea – spazio:</strong> Passare da una linea allo spazio vicino equivale sempre a salire o scendere di <strong>un solo gradino diatonico</strong> (<code>C → D → E → F → G → A → B</code> / da Do a Si).</li>
        <li><strong>Perché la chiave è indispensabile:</strong> Senza chiave, le linee restano mute: è la chiave che fissa una <em>nota di riferimento precisa</em> su una delle linee.</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Le 3 chiavi principali (e chiavi speciali)</span>
        <span class="k-ratio-chip">Sol • Fa • Do (3° rigo)</span>
      </div>
      <h4>Tre sguardi sulla stessa tastiera</h4>
      <p>
        La linea evidenziata in arancione indica il <strong>punto di ancoraggio</strong> esatto di ogni chiave. Memorizza quell’unico riferimento per ricavare tutte le note vicine in un attimo.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${trebleAnchorSvg}
          <h5>Chiave di violino / Sol (G)</h5>
          <p>Il suo ricciolo centrale abbraccia la <strong>2ª linea = Sol4 (G4)</strong>. Standard per canto (soprano/contralto), violino, flauto, tromba, chitarra e mano destra del pianoforte.</p>
          <p><strong>Riferimenti (basso → alto):</strong> linee <em>Mi – Sol – Si – Re – Fa</em>; spazi <em>Fa – La – Do – Mi</em>.</p>
          <button type="button" class="btn-tool" data-play-solo-note="G4">▶ Ascolta l’ancoraggio Sol4 (G4)</button>
        </div>
        <div class="notation-knowledge-card">
          ${bassAnchorSvg}
          <h5>Chiave di basso / Fa (F)</h5>
          <p>I due puntini racchiudono la <strong>4ª linea = Fa3 (F3)</strong>. Indispensabile per la mano sinistra del pianoforte, violoncello, contrabbasso, basso, trombone e voci gravi.</p>
          <p><strong>Riferimenti (basso → alto):</strong> linee <em>Sol – Si – Re – Fa – La</em>; spazi <em>La – Do – Mi – Sol</em>.</p>
          <button type="button" class="btn-tool" data-play-solo-note="F3">▶ Ascolta l’ancoraggio Fa3 (F3)</button>
        </div>
        <div class="notation-knowledge-card">
          ${altoAnchorSvg}
          <h5>Chiave di contralto / Do sul 3° rigo</h5>
          <p>Il suo centro punta dritto sulla <strong>3ª linea (centrale) = Do centrale (C4)</strong>. Chiave naturale della viola in orchestra e di molte partiture polifoniche.</p>
          <p><strong>Trucco di simmetria:</strong> <code>C4</code> al centro colloca <em>Mi</em> (4ª) e <em>Sol</em> (5ª) sopra, e <em>La</em> (2ª) poi <em>Fa</em> (1ª) subito sotto.</p>
          <button type="button" class="btn-tool" data-play-solo-note="C4">▶ Ascolta l’ancoraggio Do4 (C4)</button>
        </div>
      </div>

      <div class="k-meta-box">
        <div><strong>Lo stesso Do centrale (C4) collega le tre chiavi:</strong> In <strong>chiave di violino</strong> sta sul 1° taglio addizionale <em>sotto</em>; in <strong>chiave di contralto</strong> proprio al <em>centro (3ª linea)</em>; in <strong>chiave di basso</strong> sul 1° taglio addizionale <em>sopra</em>.</div>
        <div><strong>Chiavi speciali (anteprima):</strong> La <strong>chiave di tenore (Do sul 4° rigo)</strong> posiziona lo stesso Do centrale sulla 4ª linea per i passaggi acuti di violoncello, fagotto o trombone, mentre le chiavi ottavate (<code>8vb</code> / <code>8va</code>) evitano l’affollamento di tagli addizionali per chitarra o ottavino.</div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Fino a 3 tagli addizionali</span>
        <span class="k-ratio-chip">±3 tagli addiz.</span>
      </div>
      <h4>Leggere sopra e sotto senza contare riga per riga</h4>
      <p>
        Quando la melodia esce dalle 5 linee, piccoli trattini chiamati <strong>tagli addizionali</strong> prolungano localmente il pentagramma. Qui ti alleni fino a <strong>3 tagli addizionali sopra e sotto</strong>: la tessitura reale delle partiture orchestrali e pianistiche.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${ledgerSvg}
          <h5>Chiave di violino: ±3 tagli addizionali</h5>
          <p>A sinistra: 3°, 2° e 1° taglio sotto (<code>F3 – A3 – C4</code>); al centro: <code>B4</code>; a destra: 1°, 2° e 3° taglio sopra (<code>A5 – C6 – E6</code>).</p>
        </div>
        <div class="notation-knowledge-card">
          ${ledgerBassSvg}
          <h5>Chiave di basso: gravi profondi &amp; registro acuto melodico</h5>
          <p>Verso il basso: 3 tagli scendono fino a <code>A1</code>; verso l’alto: il Do centrale (<code>C4</code>) si apre fino a <code>E4</code> e <code>G4</code>.</p>
        </div>
      </div>
      <ul class="k-physics-list">
        <li><strong>Memorizza 2 punti di riferimento fuori dal pentagramma:</strong> Fissa il 1° e il 2° taglio addizionale (ad es. <code>C4</code> e <code>A3</code> sotto la chiave di violino, <code>A5</code> e <code>C6</code> sopra) per riconoscere all’istante ogni grado vicino.</li>
        <li><strong>Individua i salti di terza:</strong> Passare direttamente da un taglio addizionale al successivo salta sempre una <strong>terza</strong> (lo stesso principio degli accordi sovrapposti).</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Alterazioni &amp; sistemi di denominazione</span>
        <span class="k-ratio-chip">♯ • ♭ • B vs H</span>
      </div>
      <h4>Tasti neri, enarmonia &amp; la particolarità tedesca</h4>
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
            <li><strong>Diesis (<code>♯</code>):</strong> Alza la nota di <strong>1 semitono</strong> (un tasto a destra). <code>F</code> diventa <code>F♯</code>.</li>
            <li><strong>Bemolle (<code>♭</code>):</strong> Abbassa la nota di <strong>1 semitono</strong> (un tasto a sinistra). <code>G</code> diventa <code>G♭</code>.</li>
            <li><strong>Enarmonia:</strong> Su una tastiera, <code>F♯</code> e <code>G♭</code> corrispondono esattamente allo stesso tasto nero: cambia solo la scrittura in base alla funzione armonica.</li>
            <li><strong>Attenzione alla notazione tedesca:</strong> Nella notazione tedesca la nota bianca <em>Si (B)</em> si scrive <strong>H</strong>, mentre il <em>Si♭ (B♭)</em> si scrive <strong>B</strong>! Passa comodamente da un sistema all’altro nelle <em>Impostazioni dell’app</em>.</li>
          </ul>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Armature di chiave &amp; lettura a prima vista</span>
        <span class="k-ratio-chip">Armatura ♯/♭ + ♮</span>
      </div>
      <h4>Quando le alterazioni valgono per l’intero pentagramma</h4>
      <p>
        Invece di riscrivere un <code>♯</code> o un <code>♭</code> davanti a ogni nota, l’armatura posta <strong>subito dopo la chiave</strong> modifica automaticamente quei gradi in <strong>tutte le ottave</strong> finché non compare un bequadro (<code>♮</code>).
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${keySigSharpSvg}
          <h5>Tonalità con i diesis (ordine: Fa – Do – Sol – Re – La – Mi)</h5>
          <p>In <strong>Re maggiore (2♯)</strong>, ogni <code>Fa</code> diventa <code>Fa♯</code> e ogni <code>Do</code> diventa <code>Do♯</code>; solo il bequadro (<code>♮</code>) davanti alla 3ª nota riporta il Fa naturale.</p>
        </div>
        <div class="notation-knowledge-card">
          ${keySigFlatSvg}
          <h5>Tonalità con i bemolli (ordine: Si – Mi – La – Re – Sol – Do)</h5>
          <p>In <strong>Mi♭ maggiore (3♭)</strong>, <code>Si♭</code>, <code>Mi♭</code> e <code>La♭</code> governano l’intero pentagramma fin dall’inizio, fino a un eventuale bequadro (<code>♮</code>).</p>
        </div>
      </div>
    </article>
  `;
}

function renderArrangingReferenceHTML_IT() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Che cos’è l’arrangiamento?</span>
        <span class="k-ratio-chip">Bozza → brano completo</span>
      </div>
      <h4>L’arte di trasformare un’idea musicale in un universo sonoro vivo</h4>
      <p>
        Se la <strong>composizione</strong> è il progetto di una canzone (melodia, accordi base e testo), l’<strong>arrangiamento</strong> è tutta la sua architettura, l’illuminazione e la tavolozza dei colori: <em>Chi suona cosa, in quale momento, in quale ottava, con quale ritmo, quale dinamica e quale timbro?</em>
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Strumentazione &amp; timbri</strong>
          Scegliere quali strumenti o voci portano la melodia, il basso, il tappeto armonico e il ritmo, e come si fondono i loro timbri.
        </div>
        <div class="physics-fact-item">
          <strong>Forma &amp; drammaturgia</strong>
          Costruire l’arco emotivo da un’intro intima fino al ritornello, al bridge e al finale.
        </div>
        <div class="physics-fact-item">
          <strong>Registri &amp; voicing</strong>
          Distribuire le note dal grave profondo agli acuti cristallini così che ogni strumento respiri senza impastare l’insieme.
        </div>
        <div class="physics-fact-item">
          <strong>Dialogo, tessitura &amp; pause</strong>
          Decidere quando suonano tutti (<em>tutti</em>), quando uno strumento risponde nelle pause del canto e quando il vuoto crea il brivido.
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. Funzione &amp; impieghi</span>
        <span class="k-ratio-chip">Perché arrangiare?</span>
      </div>
      <h4>A cosa serve un arrangiamento e quando si usa?</h4>
      <p>
        La stessa canzone con gli stessi quattro accordi può diventare una <strong>ballad intima per pianoforte</strong>, un <strong>brano funk travolgente</strong>, un <strong>coro a cappella a quattro voci</strong> oppure un <strong>affresco orchestrale da cinema</strong>:
      </p>
      <ul class="article-steps-list">
        <li><strong>1. Guidare l’attenzione dell’orecchio:</strong> L’orecchio umano segue in modo cosciente solo <strong>2 o 3 piani sonori simultanei</strong>. Un buon arrangiamento lascia libero il registro medio per la voce o la melodia principale.</li>
        <li><strong>2. Tradurre l’emozione e lo stile:</strong> I tappeti d’archi portano calore e ampiezza, gli ottoni brevi danno impatto e una chitarra acustica crea intimità.</li>
        <li><strong>3. Evitare la fatica d’ascolto:</strong> Se tutti gli strumenti suonano fin dalla prima battuta, l’orecchio si satura subito. Aggiungere e togliere strati mantiene coinvolgenti ogni strofa e ogni ritornello.</li>
        <li><strong>4. Adattare la musica a un organico reale:</strong> Band, quartetto d’archi, coro SATB, big band o pianoforte solo: l’arrangiamento modella la scrittura sulle tessiture e sui musicisti presenti.</li>
        <li><strong>5. Curare le transizioni:</strong> Fill di batteria, discese di basso, crescendo e pause nette (<em>break</em>) collegano le sezioni con fluidità.</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. I 4 piani sonori</span>
        <span class="k-ratio-chip">Ripartizione dei ruoli</span>
      </div>
      <h4>I 4 strati fondamentali di un arrangiamento nitido</h4>
      <ul class="k-physics-list">
        <li><strong>1. Primo piano (lead / melodia):</strong> Voce o strumento solista che racconta la storia principale.</li>
        <li><strong>2. Fondamenta (basso &amp; groove):</strong> Il basso posa la fondamentale armonica mentre batteria e percussioni ancorano la pulsazione.</li>
        <li><strong>3. Tappeto armonico (pad &amp; comping):</strong> Archi tenuti, cori, organo o accordi ritmici di chitarra/pianoforte al centro dello spettro.</li>
        <li><strong>4. Controcanto &amp; abbellimenti (fill):</strong> Piccole risposte melodiche inserite esattamente quando la melodia principale prende fiato.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-sketch">▶ 1. Bozza nuda (melodia &amp; basso)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-full-layers">▶ 2. Arrangiamento completo a 4 strati</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Registri &amp; voicing</span>
        <span class="k-ratio-chip">Chiarezza vs. impasto confuso</span>
      </div>
      <h4>Perché alcuni arrangiamenti suonano nitidi e altri fangosi</h4>
      <ul class="k-physics-list">
        <li><strong>La legge degli armonici (ampio in basso, stretto in alto):</strong> Sotto il <code>Do3 (C3)</code>, le terze strette sporcano il registro grave (<em>Low-Interval Limit</em>). Riserva i bassi a fondamentali, quinte e ottave, e colloca terze, settime ed estensioni nel registro medio e acuto.</li>
        <li><strong>Posizione stretta vs. posizione lata (drop-2):</strong> Abbassare di un’ottava la seconda nota dall’alto di un accordo stretto apre all’istante lo spazio sonoro.</li>
        <li><strong>Complementarità ritmica:</strong> Abbina valori lunghi (tappeti) a motivi brevi e precisi per evitare il mascheramento.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-muddy">▶ Confuso: terze strette nel grave</button>
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-open">▶ Nitido: voicing aperto ben distribuito</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Dinamica &amp; dialogo</span>
        <span class="k-ratio-chip">Call &amp; response • drop</span>
      </div>
      <h4>Mantenere vivo l’interesse dall’inizio alla fine</h4>
      <ul class="article-steps-list">
        <li><strong>Call &amp; response (domanda / risposta):</strong> L’accompagnamento risponde nelle pause della voce principale.</li>
        <li><strong>Moto contrario &amp; controcanto:</strong> Una seconda linea melodica scende quando la melodia sale, oppure si muove durante una nota tenuta.</li>
        <li><strong>La forza del togliere (il «drop»):</strong> Togliere all’improvviso quasi tutti gli strumenti per una battuta crea spesso più impatto che aggiungere.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-call-response">▶ Call &amp; response (domanda / risposta)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-counterpoint">▶ Contrappunto per moto contrario</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">6. Riarmonizzazione &amp; checklist</span>
        <span class="k-ratio-chip">Stesse note, altro colore</span>
      </div>
      <h4>Cambiare tutta l’emozione senza toccare una sola nota della melodia</h4>
      <p>
        La <strong>riarmonizzazione</strong> lascia intatta la melodia sostituendo gli accordi sottostanti (ad es. <code>Fmaj7 – Fm6 – Am9</code> al posto di un semplice <code>Do – Sol – Do</code>).
      </p>
      <div class="k-btn-row" style="margin-top:0.45rem;margin-bottom:0.65rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-plain">▶ Melodia su accordi semplici (I–V–I)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-cinema">▶ La stessa melodia riarmonizzata in stile cinema</button>
      </div>
      <div class="k-meta-box">
        <div><strong>5 domande chiave per i tuoi arrangiamenti:</strong></div>
        <div>1. <strong>Chi ha la parola?</strong> Un solo elemento principale in primo piano alla volta.</div>
        <div>2. <strong>Dove sono i respiri?</strong> Colloca le risposte nelle pause del canto.</div>
        <div>3. <strong>Il grave è pulito?</strong> Niente terze strette sotto il <code>Do3 (C3)</code>.</div>
        <div>4. <strong>Strofa e ritornello contrastano davvero?</strong> Gioca con l’estensione delle ottave e la densità.</div>
        <div>5. <strong>La prova del tasto Mute:</strong> Se silenziare una traccia non toglie nulla al brano, dalle un ruolo vero oppure eliminala!</div>
      </div>
      <div class="k-btn-row" style="margin-top:0.55rem;">
        <button type="button" class="btn-tool" data-jump-ref="ensembles">Vai a Orchestre &amp; ensemble →</button>
        <button type="button" class="btn-tool" data-jump-ref="cadences">Vai a Cadenze &amp; armonia →</button>
        <button type="button" class="btn-tool" data-jump-ref="physics">Vai a Fisica &amp; armonici →</button>
      </div>
    </article>
  `;
}

const CIRCLE_OF_FIFTHS_IT_DATA = {
  "C": {
    sig: "0 alterazioni",
    major: "Do maggiore",
    minor: "La minore",
    enharmonic: "",
    acc: "Nessun diesis né bemolle (solo i tasti bianchi del pianoforte)",
    trick: "Punto zero a ore 12 del circolo: tutte le note naturali fanno da riferimento.",
    vibe: "Aperta e neutra: ideale per iniziare, per il coro e per la lettura."
  },
  "G": {
    sig: "1 diesis (♯)",
    major: "Sol maggiore",
    minor: "Mi minore",
    enharmonic: "",
    acc: "1♯: Fa♯ (sensibile verso Sol)",
    trick: "Ultimo diesis (Fa♯) + 1 semitono sopra = Sol maggiore.",
    vibe: "Aperta e risonante sulla chitarra acustica, sugli archi e nel folk/pop."
  },
  "D": {
    sig: "2 diesis (♯)",
    major: "Re maggiore",
    minor: "Si minore",
    enharmonic: "",
    acc: "2♯: Fa♯, Do♯",
    trick: "Ultimo diesis = Do♯ → un semitono sopra = Re maggiore.",
    vibe: "Tonalità brillante per archi, rock e orchestra."
  },
  "A": {
    sig: "3 diesis (♯)",
    major: "La maggiore",
    minor: "Fa♯ minore",
    enharmonic: "",
    acc: "3♯: Fa♯, Do♯, Sol♯",
    trick: "Ultimo diesis = Sol♯ → un semitono sopra = La maggiore.",
    vibe: "Calda e luminosa su chitarra, violino e voce."
  },
  "E": {
    sig: "4 diesis (♯)",
    major: "Mi maggiore",
    minor: "Do♯ minore",
    enharmonic: "",
    acc: "4♯: Fa♯, Do♯, Sol♯, Re♯",
    trick: "Ultimo diesis = Re♯ → un semitono sopra = Mi maggiore.",
    vibe: "Il regno della chitarra elettrica, del blues e del rock classico."
  },
  "B": {
    sig: "5 diesis (♯) / 7♭",
    major: "Si maggiore",
    minor: "Sol♯ minore",
    enharmonic: "Enarmonica: Do♭ maggiore (7♭) / La♭ minore",
    acc: "5♯: Fa♯, Do♯, Sol♯, Re♯, La♯",
    trick: "Ultimo diesis = La♯ → un semitono sopra = Si maggiore.",
    vibe: "Cade con grande naturalezza sotto le dita al pianoforte (usa tutti i 5 tasti neri)."
  },
  "F#": {
    sig: "6 diesis / 6 bemolli",
    major: "Fa♯ maggiore",
    minor: "Re♯ / Mi♭ minore",
    enharmonic: "Ponte enarmonico a ore 6: Fa♯ maggiore (6♯) suona esattamente come Sol♭ maggiore (6♭: Sol♭–La♭–Si♭–Do♭–Re♭–Mi♭–Fa).",
    acc: "6♯: Fa♯, Do♯, Sol♯, Re♯, La♯, Mi♯  (o 6♭: Si♭, Mi♭, La♭, Re♭, Sol♭, Do♭)",
    trick: "Esattamente di fronte a Do maggiore (polo del tritono!): da qui in poi i bemolli sono spesso più comodi da leggere.",
    vibe: "Colore ricco e cangiante, molto apprezzato nel gospel, nell’R&B e nell’impressionismo."
  },
  "Db": {
    sig: "5 bemolli (♭) / 7♯",
    major: "Re♭ maggiore",
    minor: "Si♭ minore",
    enharmonic: "Enarmonica: Do♯ maggiore (7♯) / La♯ minore",
    acc: "5♭: Si♭, Mi♭, La♭, Re♭, Sol♭",
    trick: "Il penultimo bemolle è Re♭ → Re♭ maggiore!",
    vibe: "Timbro vellutato e romantico, adorato dai pianisti jazz e nelle ballad."
  },
  "Ab": {
    sig: "4 bemolli (♭)",
    major: "La♭ maggiore",
    minor: "Fa minore",
    enharmonic: "",
    acc: "4♭: Si♭, Mi♭, La♭, Re♭",
    trick: "Penultimo bemolle = La♭ → La♭ maggiore.",
    vibe: "Morbida e ampia: un grande classico degli standard jazz, del soul e delle armonie per fiati."
  },
  "Eb": {
    sig: "3 bemolli (♭)",
    major: "Mi♭ maggiore",
    minor: "Do minore",
    enharmonic: "",
    acc: "3♭: Si♭, Mi♭, La♭",
    trick: "Penultimo bemolle = Mi♭ → Mi♭ maggiore.",
    vibe: "Tonalità nobile ed eroica per gli ottoni, il sax contralto e la sinfonia."
  },
  "Bb": {
    sig: "2 bemolli (♭)",
    major: "Si♭ maggiore",
    minor: "Sol minore",
    enharmonic: "",
    acc: "2♭: Si♭, Mi♭",
    trick: "Penultimo bemolle = Si♭ → Si♭ maggiore.",
    vibe: "La tonalità regina di big band, tromba, clarinetto e jazz moderno."
  },
  "F": {
    sig: "1 bemolle (♭)",
    major: "Fa maggiore",
    minor: "Re minore",
    enharmonic: "",
    acc: "1♭: Si♭ (il Si naturale scende a Si♭)",
    trick: "L’unica da ricordare direttamente: un solo bemolle in chiave è sempre Fa maggiore.",
    vibe: "Tonalità calda e pastorale, amata da cori, corni e ballate folk."
  }
};

const CIRCLE_ROLES_IT = {
  major: {
    I: "Tonica",
    ii: "Sopratonica",
    iii: "Mediante",
    IV: "Sottodom.",
    V: "Dominante",
    V7: "Dom. 7ª",
    vi: "Relativa min.",
    "vii°": "Sensibile dim."
  },
  minor: {
    i: "Tonica min.",
    "ii°": "Diminuito",
    III: "Relativa magg.",
    iv: "Sottodom. min.",
    v: "Dom. naturale",
    V7: "Dom. arm. 7",
    VI: "Sopradominante",
    VII: "Sottotonica"
  }
};

if (typeof registerKnowledgeBundle === "function") {
  registerKnowledgeBundle("it", {
    data: {
      intervalEncyclopedia: INTERVAL_ENCYCLOPEDIA_IT,
      cadenceEncyclopedia: CADENCE_ENCYCLOPEDIA_IT,
      solfegeSteps: SOLFEGE_STEPS_IT,
      knowledgeArticles: KNOWLEDGE_ARTICLES_IT,
      physicsWaveExplanations: PHYSICS_WAVE_EXPLANATIONS_IT,
      physicsOvertones: PHYSICS_OVERTONES_IT,
      categoryHelpGuides: CATEGORY_HELP_GUIDES_IT,
      rhythmInstruments: RHYTHM_INSTRUMENTS_DATA_IT,
      instrumentModules: INSTRUMENT_MODULES_DATA_IT,
      modesEncyclopedia: MODES_ENCYCLOPEDIA_IT,
      keysCircleData: KEYS_CIRCLE_DATA_IT
    },
    renderers: {
      physics: renderPhysicsReferenceHTML_IT,
      rhythm: renderRhythmReferenceHTML_IT,
      rhythmInstruments: renderRhythmInstrumentsHTML_IT,
      vocals: renderVocalsReferenceHTML_IT,
      instrumentModule: renderInstrumentModuleHTML_IT,
      modes: renderModesReferenceHTML_IT,
      keys: renderKeysReferenceHTML_IT,
      singAndPlay: renderSingAndPlayReferenceHTML_IT,
      notation: renderNotationReferenceHTML_IT,
      arranging: renderArrangingReferenceHTML_IT,
      intervalNamingGuide: getIntervalNamingGuideHTML_IT,
      circleOfFifthsTheory: renderCircleOfFifthsTheoryHTML_IT
    },
    circleData: CIRCLE_OF_FIFTHS_IT_DATA,
    circleRoles: CIRCLE_ROLES_IT
  });
}
