/**
 * Lauscher • Base de conocimientos, guías interactivas y artículos en español ("es")
 * Teoría musical, acústica y organología redactadas en español idiomático.
 */

const INTERVAL_ENCYCLOPEDIA_ES = [
  {
    key: "P1",
    symbol: "P1",
    name: "Unísono justo",
    semitones: 0,
    ratio: "1 : 1",
    ratioExplain: "1 : 1 significa que las dos notas vibran exactamente a la misma velocidad. Mientras la nota 1 completa un ciclo, la nota 2 completa otro: es exactamente la misma altura.",
    category: "pure",
    mood: "Fusión total, reposo, identidad",
    physics: "Los dos sonidos comparten exactamente la misma frecuencia (p. ej. 261,6 Hz y 261,6 Hz). Sus ondas sonoras se superponen en un unísono perfecto.",
    songsAsc: "«One Note Samba» (melodía de la estrofa sobre una sola nota), comienzo de «Thank You for the Music» (ABBA, dos primeras sílabas)",
    songsDesc: "Cualquier nota repetida en un motivo rítmico (p. ej. la intro de «Poker Face» de Lady Gaga)"
  },
  {
    key: "m2",
    symbol: "m2",
    name: "Segunda menor",
    semitones: 1,
    ratio: "16 : 15",
    ratioExplain: "16 : 15 significa que la nota aguda vibra apenas un poco más rápido que la grave. Sus crestas solo coinciden cada 16 ciclos (o 15 de la grave), creando claros batimientos entre ambas.",
    category: "tension",
    mood: "Furtiva, tensa, misteriosa, apremiante (¡nota sensible!)",
    physics: "Las ondas tardan 16 ciclos en volver a sincronizarse. Como las dos alturas están muy cerca en el oído interno, producen una fuerte aspereza acústica.",
    songsAsc: "Tema de «Tiburón» (Jaws), «La Pantera Rosa» (paso cromático), «Para Elisa» (Mi–Re#–Mi)",
    songsDesc: "«Para Elisa» (Beethoven, dos primeras notas Mi → Re#), «Joy to the World» (primer paso descendente)"
  },
  {
    key: "M2",
    symbol: "M2",
    name: "Segunda mayor",
    semitones: 2,
    ratio: "9 : 8",
    ratioExplain: "9 : 8 significa que 8 vibraciones de la nota grave coinciden con 9 de la aguda. Lo bastante cerca para seguir unidas, pero lo bastante separadas para dibujar un paso melódico claro.",
    category: "major",
    mood: "Paso natural, narrativo, abierto, comienzo de melodía",
    physics: "La proporción 9:8 surge de forma natural al apilar dos quintas justas y bajar una octava. Se oye como un primer paso fuera de casa.",
    songsAsc: "«Martinillo» (Do → Re), «Cumpleaños feliz» («Cum-ple-A-ños fe-liz»), «Noche de paz»",
    songsDesc: "«Yesterday» (The Beatles, «Yes-ter-day»), «María tenía un corderito»"
  },
  {
    key: "m3",
    symbol: "m3",
    name: "Tercera menor",
    semitones: 3,
    ratio: "6 : 5",
    ratioExplain: "6 : 5 significa que mientras la nota grave vibra 5 veces, la aguda vibra 6. Una proporción compacta y estable que suena cálida, suave y profundamente expresiva.",
    category: "minor",
    mood: "Íntima, cálida, melancólica, serena y expresiva",
    physics: "Con 6:5 la proporción sigue siendo muy suave (consonante), pero más estrecha que la tercera mayor: es el corazón emocional de todo acorde menor.",
    songsAsc: "«Seven Nation Army» (The White Stripes, primer salto del riff), «Greensleeves», «Smoke on the Water» (primer paso)",
    songsDesc: "«Hey Jude» (The Beatles, «Hey Jude»), el canto del cuco en el bosque, «So Long, Farewell»"
  },
  {
    key: "M3",
    symbol: "M3",
    name: "Tercera mayor",
    semitones: 4,
    ratio: "5 : 4",
    ratioExplain: "5 : 4 significa que 5 ciclos de la nota aguda caben limpiamente en 4 ciclos de la fundamental. Como 5 y 4 son enteros pequeños, los dos sonidos se funden en un color mayor radiante.",
    category: "major",
    mood: "Luminosa, amable, franca, segura (el corazón de la tríada mayor)",
    physics: "La proporción 5:4 aparece de forma natural muy pronto en la serie de armónicos (5.º armónico) de cualquier voz o cuerda pulsada.",
    songsAsc: "«When the Saints Go Marching In», «Morning Has Broken» (Cat Stevens), «Kumbaya»",
    songsDesc: "«Summertime» (Gershwin), «Swing Low, Sweet Chariot», el motivo inicial de la 5.ª sinfonía de Beethoven"
  },
  {
    key: "P4",
    symbol: "P4",
    name: "Cuarta justa",
    semitones: 5,
    ratio: "4 : 3",
    ratioExplain: "4 : 3 significa que mientras la nota grave vibra 3 veces, la aguda vibra 4. ¡Cada 3 ondas, las dos crestas vuelven a alinearse exactamente!",
    category: "pure",
    mood: "Llamada, solemne, fanfarria, gran espacio abierto",
    physics: "Inversión de la quinta justa dentro de la octava, la cuarta tiene una proporción nítida de 4:3. Sola es muy estable; sobre un bajo, a menudo pide bajar a la tercera.",
    songsAsc: "«La Marsellesa» (anacrusa «Al-lons»), «Marcha nupcial» (Wagner), tema de «Harry Potter» (Hedwig)",
    songsDesc: "«Pequeña serenata nocturna» (Mozart, segundo intervalo), «Adeste Fideles»"
  },
  {
    key: "TT",
    symbol: "TT",
    name: "Tritono (4.ª aum. / 5.ª dism.)",
    semitones: 6,
    ratio: "aprox. 45 : 32",
    ratioExplain: "45 : 32 significa que las dos ondas apenas encuentran un punto de acuerdo: solo se realinean tras 32 y 45 ciclos. ¡El oído percibe este cruce permanente como una tensión eléctrica!",
    category: "tension",
    mood: "Flotante, misterioso, electrizante, sin resolver",
    physics: "Divide la octava exactamente en dos (6 semitonos). Sin un múltiplo sencillo común, genera un roce armónico inconfundible: el motor interno del acorde de dominante (V7).",
    songsAsc: "Cabecera de «Los Simpson» («The Simp-sons»), «Maria» (West Side Story)",
    songsDesc: "«Black Sabbath» (riff inicial), «YYZ» (Rush)"
  },
  {
    key: "P5",
    symbol: "P5",
    name: "Quinta justa",
    semitones: 7,
    ratio: "3 : 2",
    ratioExplain: "3 : 2 significa que la nota aguda vibra exactamente una vez y media (1,5×) más rápido que la fundamental. Dos ondas graves contienen tres agudas sin ninguna oscilación: ¡estabilidad pura!",
    category: "pure",
    mood: "Heroica, potente, enraizada, límpida (esqueleto de los power chords)",
    physics: "Justo después de la octava, 3:2 es la proporción de frecuencias más sencilla de la música. Por eso incluso una guitarra eléctrica muy saturada tocando quintas mantiene un sonido nítido.",
    songsAsc: "Tema principal de «Star Wars», «Estrellita, ¿dónde estás?», «Así habló Zaratustra» (2001)",
    songsDesc: "Tema de «Los Picapiedra» (The Flintstones), cabecera de «Juego de tronos» (primer salto descendente)"
  },
  {
    key: "m6",
    symbol: "m6",
    name: "Sexta menor",
    semitones: 8,
    ratio: "8 : 5",
    ratioExplain: "8 : 5 significa que 5 ciclos de la fundamental corresponden a 8 ciclos de la nota aguda. El gesto resulta amplio, lírico y teñido de una dulce nostalgia.",
    category: "minor",
    mood: "Nostálgica, dramática, agridulce, cinematográfica",
    physics: "Inversión de la tercera mayor (8:5). Combina una gran amplitud melódica con la ternura del modo menor.",
    songsAsc: "«The Entertainer» (Scott Joplin, tras la anacrusa), «In My Life» (The Beatles, intro de guitarra), «Love Story» (Taylor Swift, estribillo)",
    songsDesc: "Tema de la película «Love Story» (Where Do I Begin)"
  },
  {
    key: "M6",
    symbol: "M6",
    name: "Sexta mayor",
    semitones: 9,
    ratio: "5 : 3",
    ratioExplain: "5 : 3 significa que mientras la fundamental vibra 3 veces, la nota aguda vibra 5. Estos números enteros pequeños dan a este gran salto una calidez cantable muy especial.",
    category: "major",
    mood: "Radiante, generosa, pastoral, acogedora",
    physics: "Muy ligada a la tercera menor (su inversión), la proporción 5:3 suena fluida, lírica y muy natural de cantar.",
    songsAsc: "«My Bonnie Lies Over the Ocean», «Navidad, Navidad» (estrofa), sintonía de la NBC",
    songsDesc: "«The Music of the Night» (El fantasma de la ópera), «Man in the Mirror» (Michael Jackson, «I’m gonna make a change»)"
  },
  {
    key: "m7",
    symbol: "m7",
    name: "Séptima menor",
    semitones: 10,
    ratio: "16 : 9",
    ratioExplain: "16 : 9 (o 7 : 4 en la serie natural de armónicos) se queda justo antes de doblar la octava (2:1). Esa ligera diferencia da al blues, al soul y al funk su atractivo relajado.",
    category: "tension",
    mood: "Bluesera, relajada, soul, con una suave atracción hacia abajo",
    physics: "Aparece de forma natural como 7.º armónico (7:4). En lugar de sonar dura, suaviza la rigidez e impulsa los acordes de séptima de dominante.",
    songsAsc: "«The Winner Takes It All» (ABBA), «Somewhere» (West Side Story, «There’s a place for us»), tema original de «Star Trek»",
    songsDesc: "«Watermelon Man» (Herbie Hancock)"
  },
  {
    key: "M7",
    symbol: "M7",
    name: "Séptima mayor",
    semitones: 11,
    ratio: "15 : 8",
    ratioExplain: "15 : 8 está a un solo semitono de 16 : 8 (¡la octava 2:1!). Como los dos sonidos se rozan sin fundirse en la octava, el intervalo centellea con una tensión refinada.",
    category: "tension",
    mood: "Soñadora y aterciopelada (en un acorde Maj7) o mordiente y tensa (aislada)",
    physics: "A un semitono por debajo de la octava (15:8). Tocada desnuda contra el bajo, roza con viveza; pero envuelta en una tríada mayor (DoMaj7) se vuelve pura dulzura jazzística.",
    songsAsc: "«Take On Me» (a-ha, comienzo del estribillo), «Don’t Know Why» (Norah Jones), tema de «Superman» (puente)",
    songsDesc: "«I Love You» (Cole Porter)"
  },
  {
    key: "P8",
    symbol: "P8",
    name: "Octava justa",
    semitones: 12,
    ratio: "2 : 1",
    ratioExplain: "2 : 1 significa que la nota aguda vibra exactamente el doble de rápido que la grave (media longitud de onda). Cada onda larga enmarca limpiamente dos ondas cortas: ¡se funden casi en un solo sonido!",
    category: "pure",
    mood: "Espacio, claridad, plenitud: la misma nota en el piso superior",
    physics: "Duplicación exacta de la frecuencia (2:1). Cuando hombres y mujeres, o adultos y niños, cantan la «misma» melodía, la cantan espontáneamente a la octava.",
    songsAsc: "«Somewhere Over the Rainbow» (El mago de Oz), «Singin’ in the Rain»",
    songsDesc: "«Willow Weep for Me»"
  },
  {
    key: "m9",
    symbol: "m9",
    name: "Novena menor",
    semitones: 13,
    ratio: "32 : 15",
    ratioExplain: "32 : 15 significa que la nota aguda vibra algo más del doble de rápido que la fundamental (octava + segunda menor). Esta proporción tensa crea un mordiente armónico intenso y ardiente.",
    category: "tension",
    mood: "Exótica, dramática, de alta tensión (flamenco y jazz alterado)",
    physics: "Una octava más un semitono. La distancia de octava suaviza un poco la dureza cercana de la segunda menor, pero conserva su carácter incisivo.",
    songsAsc: "Acordes de dominante alterados en jazz (V7b9) y pasajes de guitarra flamenca",
    songsDesc: "Acentos dramáticos de bandas sonoras"
  },
  {
    key: "M9",
    symbol: "M9",
    name: "Novena mayor",
    semitones: 14,
    ratio: "9 : 4",
    ratioExplain: "9 : 4 significa que mientras la fundamental vibra 4 veces, la nota aguda completa 9 ciclos (más del doble). Esta gran distancia aporta un color aéreo, luminoso y moderno.",
    category: "major",
    mood: "Aérea, moderna, flotante y sedosa (pop y neo-soul)",
    physics: "Una octava más una segunda mayor (o dos quintas apiladas: Do → Sol → Re). Da una amplitud centelleante a los acordes add9 y maj9.",
    songsAsc: "«Every Breath You Take» (The Police: ¡el famoso arpegio de guitarra sube directamente hasta la 9.ª!)",
    songsDesc: "Voicings de piano pop y R&B contemporáneos"
  }
];

const CADENCE_ENCYCLOPEDIA_ES = [
  {
    id: "authentic",
    category: "classic",
    name: "La cadencia perfecta clásica",
    formula: "I – IV – V – I",
    tag: "Base & hogar",
    tagClass: "tag-sage",
    bars: ["I", "IV", "V", "I"],
    whyItWorks: "Cuenta una historia completa en cuatro compases: **I (tónica)** sitúa la casa. **IV (subdominante)** abre la puerta y sale a explorar. **V (dominante)** crea la máxima tensión gracias a su nota sensible, y **I** lo devuelve todo al reposo.",
    songs: [
      "«Twist and Shout» – The Beatles (I – IV – V)",
      "«La Bamba» – Ritchie Valens",
      "«Three Little Birds» – Bob Marley",
      "Innumerables canciones populares y estándares atemporales"
    ]
  },
  {
    id: "plagal-amen",
    category: "classic",
    name: "La cadencia plagal («Amén»)",
    formula: "I – IV – I",
    tag: "Suave & solemne",
    tagClass: "tag-sage",
    bars: ["I", "IV", "I"],
    whyItWorks: "A diferencia de la dominante tensa (**V**), el acorde **IV** no contiene una nota sensible que reclame bruscamente la tónica. Así, **IV → I** no golpea: se posa con calidez y suavidad, como el célebre «Amén» de los himnos.",
    songs: [
      "«Hey Jude» – The Beatles (larga coda «Na-na-na» sobre bVII–IV–I)",
      "«Let It Be» – The Beatles (interludio Fa–Do)",
      "Finales de góspel y corales tradicionales («Amén»)"
    ]
  },
  {
    id: "half-cadence",
    category: "classic",
    name: "La semicadencia (pregunta abierta)",
    formula: "I – IV – ii – V",
    tag: "Tensión suspendida",
    tagClass: "tag-peach",
    bars: ["I", "IV", "ii", "V"],
    whyItWorks: "Detenerse en mitad de la frase sobre la **dominante (V)** actúa como dos puntos musicales: «¡atención, ahora viene lo siguiente!». En una estrofa o un preestribillo, esta suspensión hace que la entrada del estribillo en **I** sea aún más potente.",
    songs: [
      "Temas de sonatas clásicas (Mozart, Haydn)",
      "Casi todos los preestribillos pop justo antes de que estalle el estribillo",
      "«Yesterday» – The Beatles (final de frase suspendido sobre la dominante)"
    ]
  },
  {
    id: "pachelbel",
    category: "classic",
    name: "La progresión de Pachelbel",
    formula: "I – V – vi – iii – IV – I – IV – V",
    tag: "Del barroco al pop",
    tagClass: "tag-lilac",
    bars: ["I", "V", "vi", "iii", "IV", "I", "IV", "V"],
    stepMs: 1500,
    chordDur: 1.38,
    whyItWorks: "Un golpe de genio en el bajo de 1680: el bajo desciende y salta con toda naturalidad (**Do → Sol → La → Mi → Fa → Do → Fa → Sol**). Cada eslabón encaja sin tropiezos, creando un bucle de ocho compases sereno y a la vez impulsor.",
    songs: [
      "«Canon en Re» – Johann Pachelbel",
      "«Basket Case» – Green Day",
      "«Memories» – Maroon 5",
      "«Go West» – Village People / Pet Shop Boys"
    ]
  },
  {
    id: "pop4",
    category: "pop",
    name: "Los «4 acordes mágicos» del pop",
    formula: "I – V – vi – IV",
    tag: "Clásico del pop",
    tagClass: "tag-peach",
    bars: ["I", "V", "vi", "IV"],
    whyItWorks: "¡Probablemente la progresión más exitosa de los últimos 50 años! Su secreto: en pleno centro se esconde una **cadencia rota (V → vi)** que encoge el corazón al instante. Y terminar en **IV** deja el acorde abierto para repetir el estribillo hasta el infinito.",
    songs: [
      "«Let It Be» – The Beatles (estrofa)",
      "«Someone Like You» – Adele (estribillo)",
      "«With or Without You» – U2",
      "«No Woman, No Cry» – Bob Marley",
      "«Don’t Stop Believin’» – Journey"
    ]
  },
  {
    id: "doowop",
    category: "pop",
    name: "La progresión de los años 50 / doo-wop",
    formula: "I – vi – IV – V",
    tag: "Soul & retro",
    tagClass: "tag-lilac",
    bars: ["I", "vi", "IV", "V"],
    whyItWorks: "Desde la tónica luminosa (**I**), la armonía se desliza con ternura hacia su **relativo menor (vi)**, ¡que comparte dos notas comunes! Desde ahí, **IV** y **V** crean un impulso nostálgico irresistible hacia el primer compás.",
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
    name: "El bucle pop emotivo en menor",
    formula: "vi – IV – I – V",
    tag: "Melancolía & impulso",
    tagClass: "tag-lilac",
    bars: ["vi", "IV", "I", "V"],
    whyItWorks: "El truco genial: son exactamente los mismos cuatro acordes que «I – V – vi – IV», solo que desplazados para empezar en el **relativo menor (vi)**. Ese arranque en menor convierte el ánimo soleado en una intensidad conmovedora, conservando la fuerza de **I** y **V**.",
    songs: [
      "«Zombie» – The Cranberries (Mim – Do – Sol – Re)",
      "«Save Tonight» – Eagle-Eye Cherry",
      "«Numb» – Linkin Park",
      "«Hello» – Adele (estrofa)"
    ]
  },
  {
    id: "minor-plagal",
    category: "pop",
    name: "La subdominante menor (agridulce)",
    formula: "I – IV – iv – I",
    tag: "Cine & nostalgia",
    tagClass: "tag-peach",
    bars: ["I", "IV", "iv", "I"],
    whyItWorks: "Uno de los gestos más conmovedores de la armonía: vamos con entusiasmo hacia **IV (Fa mayor)**, antes de que ese mismo acorde se funda en **iv (Fa menor)**, un *préstamo modal* de Do menor. Por dentro, el **La** baja un semitono a **Lab** y luego se desliza a **Sol** sobre I.",
    songs: [
      "«In My Life» – The Beatles",
      "«Don’t Look Back in Anger» – Oasis (preestribillo Fa → Fam → Do)",
      "«Wake Me Up When September Ends» – Green Day",
      "Baladas clásicas de Disney y finales de películas de la edad de oro"
    ]
  },
  {
    id: "creep-chromatic",
    category: "pop",
    name: "La línea cromática ascendente («Creep»)",
    formula: "I – III7 – IV – iv",
    tag: "Clásico conmovedor",
    tagClass: "tag-lilac",
    bars: ["I", "III7", "IV", "iv"],
    whyItWorks: "Escucha la voz interior escondida: **Do (I)** sostiene **Sol**; el inesperado mayor **Mi7 (III7)** lo eleva a **Sol#**; **Fa (IV)** sube a **La**; y **Fam (iv)** vuelve a bajar con nostalgia a **Lab**. Este hilo cromático (**Sol → Sol# → La → Lab**) une toda la progresión.",
    songs: [
      "«Creep» – Radiohead",
      "«The Air That I Breathe» – The Hollies",
      "«Get Free» – Lana Del Rey"
    ]
  },
  {
    id: "royal-road",
    category: "pop",
    name: "La «Vía Real» (Ōdō Shinkō)",
    formula: "IV – V – iii – vi",
    tag: "Himno J-pop & anime",
    tagClass: "tag-sage",
    bars: ["IV", "V", "iii", "vi"],
    whyItWorks: "Famosa en Japón como la progresión real: arranca ya lanzada en **IV**, atraviesa **V** a toda velocidad y luego esquiva **I** para deslizarse por **iii** hasta **vi**. Evitar la resolución completa crea ese impulso cinematográfico interminable.",
    songs: [
      "«Stay With Me» – Miki Matsubara (City Pop)",
      "«Never Gonna Give You Up» – Rick Astley (estribillo)",
      "Innumerables openings de anime y temas de Nintendo (Mario Kart / Zelda)"
    ]
  },
  {
    id: "sus4-resolve",
    category: "pop",
    name: "La resolución de dominante suspendida (sus4)",
    formula: "I – IV – Vsus4 – V – I",
    tag: "Suspensión elegante",
    tagClass: "tag-sage",
    bars: ["I", "IV", "Vsus4", "V", "I"],
    whyItWorks: "En **Vsus4**, la tercera mayor de la dominante (**Si** en el acorde de Sol) se retiene y se sustituye por la cuarta (**Do**). Esta suspensión luminosa se desliza después un semitono (**Do → Si**) hacia el **V** puro antes de aterrizar en **I**.",
    songs: [
      "«Crazy Little Thing Called Love» – Queen",
      "«Pinball Wizard» – The Who",
      "«The Scientist» / himnos al piano de Coldplay"
    ]
  },
  {
    id: "deceptive",
    category: "epic",
    name: "La cadencia rota (evitada)",
    formula: "I – IV – V – vi",
    tag: "Giro inesperado",
    tagClass: "tag-lilac",
    bars: ["I", "IV", "V", "vi"],
    whyItWorks: "Tras **I – IV – V**, tu cerebro espera con certeza un **I** mayor triunfal. La sensible sí sube a Do, pero debajo el bajo cae en **La** en lugar de Do (dando **La menor**). ¡Escalofrío de sorpresa garantizado!",
    songs: [
      "«Hallelujah» – Leonard Cohen (en «the minor fall, the major lift…»)",
      "«Livin’ on a Prayer» – Bon Jovi",
      "Grandes clímax de bandas sonoras (Hans Zimmer, John Williams)"
    ]
  },
  {
    id: "mario-cadence",
    category: "epic",
    name: "La cadencia «Mario» (fanfarria de victoria)",
    formula: "I – bVI – bVII – I",
    tag: "Fanfarria de videojuego",
    tagClass: "tag-peach",
    bars: ["I", "bVI", "bVII", "I"],
    whyItWorks: "Dos acordes mayores tomados directamente del menor paralelo, **bVI (Lab mayor)** y **bVII (Sib mayor)**, suben dos tonos enteros (**Lab → Sib → Do**) y desatan al instante una sensación de aventura y de nivel superado.",
    songs: [
      "«Super Mario Bros.» – Fanfarria de fin de nivel (Nintendo)",
      "«With a Little Help from My Friends» – The Beatles / Joe Cocker (final)",
      "«P.S. I Love You» – The Beatles y grandiosos finales de rock"
    ]
  },
  {
    id: "mixolydian-rock",
    category: "epic",
    name: "La cadencia de rock de estadio (mixolidia)",
    formula: "I – bVII – IV – I",
    tag: "Rock & aplomo",
    tagClass: "tag-sage",
    bars: ["I", "bVII", "IV", "I"],
    whyItWorks: "Sin sensible académica: sustituir V por **bVII (Sib mayor en Do)** da a la tónica un andar rockero mixolidio, terrenal y rebelde. Se baja un tono entero de **I** a **bVII** y luego se rueda con fuerza por **IV** hasta **I**.",
    songs: [
      "«Sweet Child o’ Mine» – Guns N’ Roses",
      "«Sympathy for the Devil» – The Rolling Stones",
      "«Hey Jude» – The Beatles (vamp del estribillo)",
      "«Royals» – Lorde"
    ]
  },
  {
    id: "andalusian",
    category: "epic",
    name: "La cadencia andaluza",
    formula: "vi – V – IV – III7",
    tag: "Flamenco & drama",
    tagClass: "tag-peach",
    bars: ["vi", "V", "IV", "III7"],
    whyItWorks: "Siglos de pasión en cuatro acordes: el bajo desciende implacable grado a grado (**La → Sol → Fa → Mi**) antes de encenderse en la dominante mayor **Mi7 (III7)**, que relanza irresistiblemente el ciclo.",
    songs: [
      "«Hit the Road Jack» – Ray Charles",
      "«Smooth Criminal» – Michael Jackson",
      "«Sultans of Swing» – Dire Straits (final de estrofa)",
      "«Stairway to Heaven» – Led Zeppelin (final rockero)"
    ]
  },
  {
    id: "jazz251",
    category: "jazz",
    name: "El II–V–I (la cadencia reina del jazz)",
    formula: "ii – V7 – I – I",
    tag: "Jazz & soul",
    tagClass: "tag-sage",
    bars: ["ii", "V7", "I", "I"],
    whyItWorks: "En el jazz y el soul, la supertónica menor (**ii**, Rem en Do) sustituye a IV. El enlace **ii → V7 → I** hace bajar el bajo una quinta justa en cada acorde (Re → Sol → Do): el movimiento armónico más natural de Occidente.",
    songs: [
      "«Sunday Morning» – Maroon 5 (¡casi toda la canción se basa en ii – V7 – I!)",
      "«Las hojas muertas» (Autumn Leaves) – estándar de jazz",
      "«Fly Me to the Moon» – Frank Sinatra"
    ]
  },
  {
    id: "jazz1625",
    category: "jazz",
    name: "La progresión swing (I–vi–ii–V)",
    formula: "Imaj7 – vi – ii – V7 – Imaj7",
    tag: "Swing & estándares",
    tagClass: "tag-lilac",
    bars: ["Imaj7", "vi", "ii", "V7", "Imaj7"],
    whyItWorks: "El primo adulto y jazzístico del doo-wop: añadir la séptima mayor a **Imaj7 (DoMaj7)** envuelve el hogar en un brillo aterciopelado antes de que **vi → ii → V7** gire alrededor del círculo de quintas.",
    songs: [
      "«I Got Rhythm» – George Gershwin (Rhythm Changes)",
      "«Blue Moon» – Richard Rodgers",
      "«Heart and Soul» – Hoagy Carmichael"
    ]
  },
  {
    id: "tritonesub",
    category: "jazz",
    name: "La sustitución tritonal",
    formula: "ii – bII7 – I – I",
    tag: "Arma secreta del jazz",
    tagClass: "tag-peach",
    bars: ["ii", "bII7", "I", "I"],
    whyItWorks: "¿Cómo puede **Reb7 (bII7)** sustituir a **Sol7 (V7)** en Do mayor? ¡Porque ambos comparten exactamente el mismo **tritono** director (**Fa y Si/Dob**)! Mientras tanto, el bajo se desliza cromáticamente hacia casa: **Re → Reb → Do**.",
    songs: [
      "«The Girl from Ipanema» – Antônio Carlos Jobim",
      "Cadencias características del lo-fi hip-hop, el neo-soul y el góspel"
    ]
  },
  {
    id: "blues12",
    category: "jazz",
    name: "La progresión de blues con dominantes",
    formula: "I7 – IV7 – I7 – V7 – IV7 – I7",
    tag: "Blues & rock and roll",
    tagClass: "tag-peach",
    bars: ["I7", "IV7", "I7", "V7", "IV7", "I7"],
    whyItWorks: "La armonía clásica reserva el acorde de séptima de dominante solo al grado V. El blues tira esa regla por la ventana y viste cada grado principal (**I7, IV7, V7**) con el roce mordiente entre tercera mayor y séptima menor: blues en estado puro.",
    songs: [
      "«Johnny B. Goode» – Chuck Berry",
      "«Hound Dog» – Elvis Presley",
      "«Sweet Home Chicago» – Robert Johnson / The Blues Brothers"
    ]
  }
];

const SOLFEGE_STEPS_ES = [
  {
    syllable: "Do",
    degree: "1.er grado (tónica)",
    semitones: 0,
    resolvePath: [0],
    resolveDesc: "Ya en reposo en casa, sobre la tónica (repetir Do confirma la estabilidad)",
    color: "sage",
    character: "Inquebrantable, apacible, llegada a casa",
    desc: "Cada uno de los demás grados obtiene su tensión únicamente de su relación con Do. Cuando una melodía se posa en Do, tu oído por fin respira."
  },
  {
    syllable: "Re",
    degree: "2.º grado (supertónica)",
    semitones: 2,
    resolvePath: [2, 0],
    resolveDesc: "Se resuelve hacia abajo, sobre la tónica: Re → Do",
    color: "peach",
    character: "Flotante, curioso, en movimiento",
    desc: "Re se acomoda entre Do y Mi. Terminar una frase en Re suena abierto e interrogativo: tiende de forma natural hacia Do."
  },
  {
    syllable: "Mi",
    degree: "3.er grado (tercera mayor)",
    semitones: 4,
    resolvePath: [4, 2, 0],
    resolveDesc: "Baja tranquilamente por la escala: Mi → Re → Do",
    color: "sage",
    character: "Cálido, luminoso, tranquilizador, estable",
    desc: "Mi define el carácter mayor de la tonalidad. Para volver a casa, se desliza apaciblemente por Re hasta la tónica Do."
  },
  {
    syllable: "Fa",
    degree: "4.º grado (subdominante)",
    semitones: 5,
    resolvePath: [5, 4, 2, 0],
    resolveDesc: "Se resuelve hacia abajo, sobre la tónica: Fa → Mi → Re → Do",
    color: "peach",
    character: "Grave, apoyado, atraído hacia abajo",
    desc: "¡Fa está a un solo semitono por encima de Mi! Ese paso estrecho crea una fuerte gravedad descendente: Fa cae primero en Mi y luego baja por Re hasta Do."
  },
  {
    syllable: "Sol",
    degree: "5.º grado (dominante)",
    semitones: 7,
    resolvePath: [7, 9, 11, 12],
    resolveDesc: "Sube hacia la tónica superior: Sol → La → Ti → Do",
    color: "sage",
    character: "Radiante, abierto, sólido, segundo pilar",
    desc: "A partir de Sol, la mitad superior de la octava se lanza hacia el Do agudo (Sol → La → Ti → Do)."
  },
  {
    syllable: "La",
    degree: "6.º grado (relativo menor)",
    semitones: 9,
    resolvePath: [9, 11, 12],
    resolveDesc: "Sube hacia la tónica superior: La → Ti → Do",
    color: "lilac",
    character: "Lírico, tierno, ligeramente agridulce",
    desc: "La es también la fundamental de la escala relativa menor. En la escucha tonal mayor, La pasa por la sensible Ti para llegar al Do agudo."
  },
  {
    syllable: "Ti",
    degree: "7.º grado (nota sensible)",
    semitones: 11,
    resolvePath: [11, 12],
    resolveDesc: "Resolución magnética directa de la sensible: Ti → Do",
    color: "peach",
    character: "Magnético, urgente, tenso hacia arriba",
    desc: "Ti se inclina a un minúsculo semitono por debajo del Do agudo. ¡Ninguna otra nota de la escala reclama su resolución con tanto ardor como Ti → Do!"
  }
];

const KNOWLEDGE_ARTICLES_ES = [
  {
    id: "art-why-ear-training",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a6 6 0 1 1 11.4 2.5c-.6 1.3-1.4 1.9-1.9 3.1-.4 1-.5 2.4-1.7 3.2A2.5 2.5 0 0 1 10 15"/><path d="M10.5 8.5a2.2 2.2 0 0 1 4 1.2c0 .9-.6 1.4-1 2.2"/><path d="M19.5 6.5a8 8 0 0 1 0 7"/></svg>`,
    badgeClass: "badge-sage",
    title: "¿Por qué educar el oído?",
    subtitle: "Lo que desbloquea un oído entrenado, a quién le sirve y cómo empezar",
    tag: "Bases & motivación",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">¿Por qué trabajar el oído?</span>
        <h2>El puente entre tu imaginación y tu instrumento</h2>
        <p class="article-lead">
          Seguro que te ha pasado: oyes una melodía pegadiza en la cabeza o escuchas una canción favorita, pero ante tu instrumento vas a tientas buscando las notas correctas. La <strong>formación auditiva</strong> une esos dos mundos para que motivos, tensiones armónicas y groove se vuelvan claros al instante al escucharlos.
        </p>

        <h3>¿Qué habilidades concretas te aporta?</h3>
        <ul class="article-steps-list">
          <li><strong>Sacar melodías y canciones más rápido:</strong> En lugar de buscar cada nota al azar, reconoces enseguida los saltos (<em>«¡Es una quinta justa ascendente!»</em>) y las progresiones conocidas (<em>«¡Es un I–V–vi–IV!»</em>).</li>
          <li><strong>Tocar con más libertad, improvisar y componer:</strong> En cuanto sientes el efecto de una subdominante, una sensible o una síncopa, tocar en grupo, componer y arreglar en el DAW fluye solo.</li>
          <li><strong>Mejor afinación y empaste en conjunto:</strong> Notas antes si tu voz o tu cuerda está afinada, cómo se funden dos timbres y dónde está el «pocket» del grupo.</li>
          <li><strong>Oír por dentro partituras y progresiones:</strong> Una progresión de acordes deja de ser tinta sobre papel: la oyes antes incluso de poner los dedos.</li>
        </ul>

        <h3>¿A quién le sirve este entrenamiento?</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Principiantes &amp; curiosos (desde 8 años)</h5>
            <p>No hace falta solfeo académico ni largos estudios. Aprende escuchando con curiosidad y comparando directamente, desarrollando una verdadera intuición musical desde el primer día.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Instrumentistas &amp; cantantes</h5>
            <p>Ideal para ganar autonomía sin partitura en la guitarra, el piano o los vientos, y para afinar tu escucha armónica en el coro o en el grupo.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>Compositores, beatmakers &amp; productores</h5>
            <p>Acelera tu trabajo en el estudio para localizar bucles de acordes, líneas de bajo, grooves de batería y equilibrios de frecuencias en la mezcla.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Músicos avanzados &amp; exámenes</h5>
            <p>Progresa hasta las sustituciones tritonales, los 15 intervalos cromáticos, los compases asimétricos, la ecualización quirúrgica y las modulaciones en solfeo.</p>
          </div>
        </div>

        <h3>El gran mito: ¿hace falta «oído absoluto»?</h3>
        <p>
          <strong>¡Para nada!</strong> El oído absoluto (nombrar una nota aislada sin ninguna referencia) es raro y apenas imprescindible en el día a día. Casi toda la música viva se basa en el <strong>oído relativo (funcional)</strong>: la manera en que alturas y acordes dialogan <em>unos con otros</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Prueba inmediata: tu oído ya percibe el contexto</h4>
          <p>Tanto en Do mayor como en Fa mayor, en cuanto se establece una tonalidad, sientes de forma natural la llamada de la dominante (<strong>V</strong>) y el alivio de volver a la tónica (<strong>I</strong>):</p>
          <button class="btn-tool" data-play-progression="I,IV,V7,I">▶ Escuchar la cadencia perfecta (I – IV – V7 – I)</button>
        </div>

        <h3>Progresar con regularidad (la rutina de 10 minutos)</h3>
        <ul class="article-steps-list">
          <li><strong>Breve y frecuente siempre gana:</strong> De 5 a 10 minutos atentos cuatro veces por semana valen mucho más que un maratón de dos horas el domingo.</li>
          <li><strong>Implica a tu cuerpo:</strong> Tararea suavemente la nota objetivo, marca el pulso con el pie y usa siempre los botones de <strong>comparación A/B</strong> tras un error.</li>
          <li><strong>Curiosidad antes que presión:</strong> Cada error enseña tanto como un acierto: justamente la comparación lado a lado es la que esculpe el oído.</li>
        </ul>
      </div>
    `
  },
  {
    id: "art-talking-about-music",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9.5 10v3"/><path d="M12.5 8.5v6"/><path d="M15.5 10.5v2"/></svg>`,
    badgeClass: "badge-peach",
    title: "¿Cómo hablar de música?",
    subtitle: "Compartir emociones, imágenes e impresiones con sencillez, sin jerga teórica",
    tag: "Escucha & diálogo",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Percepción &amp; expresión</span>
        <h2>Hablar de música sin notas, sin acordes y sin jerga</h2>
        <p class="article-lead">
          Una pieza te emociona, te pone en alerta o dibuja todo un paisaje interior, pero en cuanto te preguntan <em>«Bueno, ¿y qué te parece?»</em>, solo sale un vago <em>«No está mal»</em> o <em>«No es lo mío»</em>. ¿Por qué cuesta tanto poner palabras a la escucha, y cómo lograrlo con naturalidad?
        </p>

        <p>
          Mucha gente se contiene por miedo a que le falte vocabulario técnico o solfeo. Sin embargo, ya sea entre amigos, en clase o en el ensayo, una buena conversación casi nunca necesita el <strong>porqué</strong> técnico. Lo que cuenta es el <strong>qué</strong>: ¿qué llega a tus oídos? ¿Qué se mueve dentro de ti? ¿Cómo evoluciona el sonido del principio al final?
        </p>

        <div class="k-song-ref">
          <strong>Bueno saberlo:</strong> Incluso grandes directores de orquesta, compositores de cine, técnicos de sonido y directores de coro usan a diario <em>imágenes sensoriales</em>. Decir <em>«El comienzo parece una niebla espesa y, de repente, en el medio se abre una ventana»</em> comunica a menudo mucho más que unos términos técnicos secos.
        </div>

        <h3>1. El clic de oro: pasar del juicio a la percepción</h3>
        <p>
          Veredictos secos como <em>«aburrido»</em>, <em>«raro»</em> o <em>«genial»</em> cortan la conversación porque no explican nada de lo que has percibido. Compartir una <strong>percepción</strong>, en cambio, abre la charla con 3 referencias sencillas:
        </p>
        <ul class="article-steps-list">
          <li><strong>¿Dónde, en la pieza?</strong> Sitúa el momento: <em>«Justo al principio»</em>, <em>«Cuando sube en el medio»</em>, <em>«Justo antes del final»</em> o <em>«En ese corte repentino.»</em></li>
          <li><strong>¿Qué siento ahí?</strong> Habla desde tu vivencia: <em>«Para mí es…»</em>, <em>«Tengo la impresión de que…»</em>, <em>«Ahí siento como una llamada…»</em></li>
          <li><strong>¿Qué imagen cotidiana encaja?</strong> Toma prestadas palabras del espacio, la luz, el tacto o el movimiento: <em>«apretado»</em>, <em>«cálido»</em>, <em>«atropellado»</em>, <em>«como soltar por fin el aire.»</em></li>
        </ul>

        <h3>2. Seis dimensiones cotidianas para describir la escucha</h3>
        <p>
          No hace falta un diccionario erudito: casi todo lo que se siente al escuchar cabe en estos seis campos sensoriales que todo el mundo entiende:
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>A. Clima &amp; matices emocionales</h5>
            <p>Ve un paso más allá de «alegre / triste»: ¿es <em>sosegado, nostálgico, orgulloso, juguetón, agitado, frágil, solemne, irónico, enraizado</em> o <em>agridulce</em>? Los contrastes funcionan de maravilla: <em>«Luminoso por fuera, pero cansado por dentro.»</em></p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>B. Espacio, cercanía &amp; densidad</h5>
            <p>¿El momento parece estrecho o amplio? Oposiciones útiles: <em>apretado, pesado, cargado, denso</em> frente a <em>amplio, aéreo, transparente, despejado</em>, o también <em>susurrado muy cerca del oído</em> frente a <em>lejano, resonando en una inmensa catedral</em>.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>C. Color, temperatura &amp; textura</h5>
            <p>Imagina tocar o ver el sonido: ¿es <em>cálido, dorado, aterciopelado, mate, terroso, ahumado, suave</em>, o <em>fresco, cristalino, plateado, deslumbrante, cortante, granuloso, quebradizo, metálico</em>? Piensa también en el peso: <em>pesado como una piedra</em> frente a <em>ligero como una pluma</em>.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>D. Movimiento, impulso &amp; apoyo</h5>
            <p>Observa cómo reacciona tu cuerpo: <em>impulsado, saltarín, arrastrado, vacilante, mecido, circular, sin aliento, asentado</em>. Pregúntate: <em>¿Empuja hacia delante, mece con suavidad o congela el tiempo?</em></p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>E. Curva, tensión &amp; respiración</h5>
            <p>La música cuenta una microhistoria: <em>toma de impulso, espera, punto de inflexión, liberación repentina, repliegue, eco que se apaga, pregunta que queda en el aire, vuelta a la calma</em>. Decir <em>«Aquí contengo la respiración»</em> lo entiende todo el mundo.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>F. Juego entre las voces</h5>
            <p>Aunque no nombres los instrumentos, describe sus papeles: <em>«Una voz se adelanta para hablar mientras el resto teje una alfombra suave»</em>, <em>«como una pelota que se lanzan»</em>, <em>«un bloque compacto»</em> o <em>«cada uno habla por su lado.»</em></p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Prueba sonora: escucha contrastes sin teoría</h4>
          <p>Olvida la teoría diez segundos y anota qué <strong>sensación concreta</strong> surge en cada pareja:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-dense">▶ Apretado &amp; compacto</button>
            <button class="btn-tool" data-play-custom="talk-open">▶ Amplio &amp; aéreo</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-warm">▶ Cálido &amp; aterciopelado</button>
            <button class="btn-tool" data-play-custom="talk-sharp">▶ Claro &amp; cortante</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-drive">▶ Que empuja hacia delante</button>
            <button class="btn-tool" data-play-custom="talk-float">▶ Flotante &amp; suspendido</button>
          </div>
        </div>

        <h3>3. Lo que facilita el diálogo y lo que lo bloquea</h3>
        <p>
          Algunos hábitos cortan sin querer el diálogo musical o crean malentendidos, sobre todo entre oyentes con referencias distintas.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Bloqueante &amp; vago</h5>
            <p><strong>Etiquetas vacías:</strong> «Bien / malo / de baja calidad / profesional / antimusical.» Son sentencias que obligan al otro a adivinar lo que de verdad has oído.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Claro &amp; abierto</h5>
            <p><strong>Describir la evolución:</strong> «El comienzo suave me atrapó enseguida, pero en el medio sentí que se apresuraba un poco y se volvía agresivo para mis oídos.»</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Falsos amigos técnicos</h5>
            <p>Soltar palabras como «desafinado», «atonal», «satura» o «demasiada dinámica» cuando se quiere decir «roza mucho» o «le falta suavidad»: los profesionales dan a esas palabras un sentido estricto.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Imágenes cotidianas sinceras</h5>
            <p>Hazlo sencillo: «No tengo la palabra técnica, pero en este punto tengo la impresión de que dos bordes rozan antes de suavizarse.»</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Juicios sobre personas o estilos</h5>
            <p>«Cero emoción» o «pura música de ascensor / comercial». Etiquetar a personas o a un género apaga la curiosidad al instante.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Nombrar textura &amp; contraste</h5>
            <p>«Para mí, el pasaje fluye de forma tan lisa y uniforme que acabo deseando una pequeña sorpresa o un relieve que enganche.»</p>
          </div>
        </div>

        <h3>4. Traductor de ideas: de lo difuso a la claridad viva</h3>
        <p>
          A menudo basta una sola imagen concreta para transformar una sensación difusa en algo clarísimo para todos:
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>En lugar de: «Suena un poco raro.»</strong>
              <span>Di: «Aquí algo roza de forma inestable para mí, casi como una pérdida de equilibrio pasajera.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>En lugar de: «Es superaburrido.»</strong>
              <span>Di: «Se queda mucho tiempo exactamente en la misma habitación emocional; espero una chispa o un giro.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>En lugar de: «¡Genial!»</strong>
              <span>Di: «Esta transición se abre tan de golpe que parece que por fin sales al aire libre.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>En lugar de: «Es demasiado rápido.»</strong>
              <span>Di: «Para mí, aquí los elementos se amontonan unos sobre otros: parece apresurado aunque el tempo no cambie.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>En lugar de: «¡Demasiado fuerte / molesto!»</strong>
              <span>Di: «En el pasaje potente todo se atropella y se vuelve muy penetrante para mis oídos.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>En lugar de: «Simplemente triste.»</strong>
              <span>Di: «No es trágico: más bien tranquilo, recogido y suavemente consolador, como el atardecer.»</span>
            </div>
          </div>
        </div>

        <h3>5. Consejos prácticos según la situación</h3>
        <ul class="article-steps-list">
          <li><strong>Después de un concierto o escuchando entre amigos:</strong> Cambia <em>«¿Te ha gustado?»</em> por preguntas cálidas: <em>«¿Qué momento se te ha quedado?»</em>, <em>«¿Qué tiempo atmosférico o escena de película iría con esta pieza?»</em> o <em>«¿Adónde te ha llevado, y dónde te has desconectado?»</em></li>
          <li><strong>En el coro, en el grupo o en clase:</strong> Destaca primero lo que ya funciona (<em>«El comienzo tiene una intimidad preciosa; en la repetición me gustaría aún más impulso luminoso»</em>). Y como alumno, atrévete a decir <em>«Aquí me parece pesado / tenso / precipitado»</em>: un buen profesor traducirá enseguida esa pista sensorial en una herramienta concreta.</li>
          <li><strong>Cuando dos personas oyen justo lo contrario:</strong> Donde tú sientes <em>paz</em>, otra persona quizá oiga <em>soledad</em>. Nuestros recuerdos y nuestro ánimo siempre escuchan con nosotros: contrastar esas sensaciones sinceras es lo que hace apasionantes las conversaciones musicales.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Chuleta de bolsillo (4 preguntas sencillas para cualquier lugar)</h4>
          <p>Cuando falten las palabras, elige simplemente <strong>una</strong> de estas cuatro pistas:</p>
          <ul class="article-steps-list">
            <li><strong>Color &amp; clima:</strong> ¿Cálido, suave y oscuro, o claro, fresco y cortante?</li>
            <li><strong>Espacio:</strong> ¿Estrecho y muy cerca, o amplio, abierto y aéreo?</li>
            <li><strong>Movimiento:</strong> ¿Avanza, se balancea, tropieza, o flota inmóvil?</li>
            <li><strong>Momento clave:</strong> ¿Qué instante preciso hace cambiar la atmósfera?</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "art-4chords",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
    badgeClass: "badge-peach",
    title: "El fenómeno de los 4 acordes",
    subtitle: "Por qué cientos de éxitos mundiales se basan en la misma progresión",
    tag: "Cadencias & pop",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Armonía en el pop</span>
        <h2>¿Por qué 4 acordes sostienen 1000 éxitos mundiales?</h2>
        <p class="article-lead">
          De los Beatles (<em>Let It Be</em>) a Toto (<em>Africa</em>), de Adele (<em>Someone Like You</em>) a Green Day o Taylor Swift, una fórmula aparece por todas partes: <strong>I – V – vi – IV</strong>.
        </p>

        <div class="article-highlight-box">
          <h4>Escucha la fórmula ahora mismo (en Do mayor: Do – Sol – Lam – Fa):</h4>
          <p>Observa cómo cambia el color emocional de compás en compás:</p>
          <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Escuchar los 4 acordes del pop (I – V – vi – IV)</button>
        </div>

        <h3>La psicología escondida en estos cuatro compases</h3>
        <ul class="article-steps-list">
          <li>
            <strong>Compás 1 – Tónica (I):</strong> Todo empieza nítido, enraizado y evidente. Sabemos de inmediato dónde está el hogar.
          </li>
          <li>
            <strong>Compás 2 – Dominante (V):</strong> Abre el horizonte y lanza un bonito impulso hacia delante.
          </li>
          <li>
            <strong>Compás 3 – Relativo menor (vi):</strong> ¡Aquí está el giro emocional! En lugar de volver obedientemente a casa, la armonía se desvía con una <em>cadencia rota</em> e inyecta un toque agridulce en pleno estribillo.
          </li>
          <li>
            <strong>Compás 4 – Subdominante (IV):</strong> En lugar de cerrar la puerta, el compás 4 queda abierto como una gran inspiración, ¡listo para relanzar el compás 1 hasta el infinito!
          </li>
        </ul>

        <div class="article-highlight-box">
          <h4>Desplazar el punto de partida</h4>
          <p>
            Muchos productores mantienen exactamente estos cuatro acordes pero empiezan el bucle en el 3.er acorde (el relativo menor: <strong>vi – IV – I – V</strong>). Al instante el bucle se vuelve más oscuro, melancólico e intenso (como <em>Numb</em> de Linkin Park o <em>Save Tonight</em>):
          </p>
          <button class="btn-tool" data-play-progression="vi,IV,I,V">▶ Comparar el comienzo en menor (vi – IV – I – V)</button>
        </div>
      </div>
    `
  },
  {
    id: "art-gravity",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v7a6 6 0 0 0 12 0V4"/><line x1="4" y1="4" x2="8" y2="4"/><line x1="16" y1="4" x2="20" y2="4"/><line x1="6" y1="8" x2="8" y2="8"/><line x1="16" y1="8" x2="18" y2="8"/></svg>`,
    badgeClass: "badge-sage",
    title: "Magnetismo musical: nota sensible y tritono",
    subtitle: "Cómo dos semitonos hacen que tu cerebro quiera resolver",
    tag: "Tensión & distensión",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Gravedad armónica</span>
        <h2>¿Por qué la música nos atrae hacia la tónica como un imán?</h2>
        <p class="article-lead">
          Al escuchar música tonal no oímos puntos aislados: sentimos auténticas fuerzas de atracción. Dos minúsculos mecanismos de un semitono lo explican casi todo.
        </p>

        <h3>1. La nota sensible (7 → 1)</h3>
        <p>
          En una escala mayor, un solo semitono separa el 7.º grado (<strong>Si</strong> en Do mayor) de la tónica aguda (<strong>Do</strong>). Toca la escala de Do hasta el Si y detente ahí: tu oído reclama literalmente la nota final:
        </p>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="scale-unresolved">▶ Escala detenida en Si (¡sin resolver!)</button>
          <button class="btn-tool" data-play-custom="leading-tone">▶ Escuchar la resolución Si → Do</button>
        </div>

        <h3>2. El pellizco del tritono (V7 → I)</h3>
        <p>
          Añade la séptima menor (<strong>Fa</strong>) al acorde de dominante (Sol mayor) para obtener <strong>Sol7</strong>: de repente dos notas se enfrentan a distancia de <strong>tritono</strong>:
        </p>
        <ul class="article-steps-list">
          <li><strong>Si</strong> (7.º grado) quiere subir un semitono hacia <strong>Do</strong>.</li>
          <li><strong>Fa</strong> (4.º grado) quiere bajar un semitono hacia <strong>Mi</strong>.</li>
        </ul>
        <div class="article-highlight-box">
          <h4>Escuchar cómo las dos notas guía convergen hacia dentro:</h4>
          <p>Primero Fa y Si vibran juntas en una tensión viva, y luego se cierran sobre Mi y Do (relajación pura):</p>
          <button class="btn-tool" data-play-custom="tritone-collapse">▶ Resolución del tritono (Fa+Si → Mi+Do)</button>
        </div>
      </div>
    `
  },
  {
    id: "art-minor-plagal",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "El efecto escalofrío: subdominante menor iv → I",
    subtitle: "De los Beatles a Radiohead y Disney: cuando el mayor se vuelve agridulce",
    tag: "Secreto de composición",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Color armónico</span>
        <h2>¿El cambio de acorde más conmovedor del pop?</h2>
        <p class="article-lead">
          Imagina una tarde soleada de verano (tónica mayor <strong>I</strong>), una nube clara que pasa (subdominante <strong>IV</strong>) y, un instante después, una luz dorada y nostálgica justo antes de que vuelva el sol.
        </p>

        <h3>¿Qué ocurre en IV → iv → I?</h3>
        <p>
          En Do mayor, la subdominante es un <strong>Fa mayor (Fa – La – Do)</strong>. Baja su tercera <strong>La</strong> un semitono hasta <strong>Lab</strong> y el acorde se convierte en <strong>Fa menor (iv)</strong>. Ese <strong>Lab</strong>, tomado del modo de Do menor, se desliza luego con toda naturalidad hacia <strong>Sol</strong> sobre la tónica (dibujando una sedosa línea cromática: <strong>La → Lab → Sol</strong>).
        </p>

        <div class="article-highlight-box">
          <h4>Escucha la comparación directa:</h4>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="plagal-major">▶ Clásico: Do – Fa – Do</button>
            <button class="btn-tool" data-play-custom="plagal-minor">▶ Toque menor: Do – Fa – Fam – Do</button>
          </div>
        </div>

        <h3>Canciones de culto construidas sobre este giro armónico</h3>
        <ul class="article-steps-list">
          <li><strong>The Beatles – «In My Life»</strong> (en «I’ll remember you») y <strong>«Blackbird»</strong></li>
          <li><strong>Radiohead – «Creep»</strong> (todo el bucle de la canción: Sol – Si – Do – Dom)</li>
          <li><strong>Oasis – «Don’t Look Back in Anger»</strong> (al final del preestribillo)</li>
          <li><strong>Green Day – «Wake Me Up When September Ends»</strong></li>
          <li>Innumerables finales de la edad de oro de <strong>Disney &amp; Pixar</strong></li>
        </ul>
      </div>
    `
  },
  {
    id: "art-physics-waves",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2.5-6 5.5-6 8 0s5.5 6 8 0 3.5-3 4-2"/></svg>`,
    badgeClass: "badge-sage",
    title: "Consonancia y disonancia: la danza de las ondas",
    subtitle: "De las proporciones numéricas sencillas a las bandas críticas del oído interno",
    tag: "Física & acústica",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Física &amp; psicoacústica</span>
        <h2>La disonancia no es «incorrecta»: ¡es el movimiento hacia delante!</h2>
        <p class="article-lead">
          Muchos principiantes creen que <strong>consonancia</strong> significa «bonito» y <strong>disonancia</strong>, «roto». En realidad son el yin y el yang del relato musical: la consonancia encarna el <em>reposo y la llegada</em>; la disonancia es <em>el impulso, la especia y el deseo</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Prueba exprés: la tensión necesita una resolución</h4>
          <p>Escucha primero una consonancia estática y luego una fricción suspendida que se libera hacia el hogar:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-progression="I,I,I">▶ Solo consonancia pura (estática)</button>
            <button class="btn-tool" data-play-progression="I,IV,Vsus4,V7,I">▶ Fricción → resolución</button>
          </div>
        </div>

        <h3>1. No todo es blanco o negro: el espectro de 4 grados</h3>
        <p>
          Pitágoras ya lo midió en una cuerda tensada: cuanto más pequeños son los enteros de una proporción de frecuencias, con más suavidad se funden los dos sonidos. La teoría clasifica los intervalos según cuatro matices:
        </p>

        <div class="spectrum-list">
          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>1. Consonancia perfecta (fusión total)</span>
              <span>1:1 · 2:1 · 3:2</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill sage" style="width:96%"></div></div>
            <div class="spectrum-sub">Octava (2:1), quinta justa (3:2) &amp; cuarta justa (4:3): tan puras y encajadas que parece oírse un solo sonido; hechas a medida para power chords, bordones y cadencias finales.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="P8">▶ Octava (2:1)</button>
              <button class="btn-tool" data-play-interval-harm="P5">▶ Quinta (3:2)</button>
              <button class="btn-tool" data-play-interval-harm="P4">▶ Cuarta (4:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>2. Consonancia imperfecta (cálida &amp; colorida)</span>
              <span>5:4 · 6:5 · 5:3</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill lilac" style="width:74%"></div></div>
            <div class="spectrum-sub">Terceras y sextas mayores o menores: lo bastante distintas para irradiar una emoción mayor o menor. Anécdota: en la Edad Media las terceras aún se clasificaban como disonancias, ¡hasta que el Renacimiento las convirtió en el corazón de la armonía!</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M3">▶ 3.ª may (5:4)</button>
              <button class="btn-tool" data-play-interval-harm="m3">▶ 3.ª men (6:5)</button>
              <button class="btn-tool" data-play-interval-harm="M6">▶ 6.ª may (5:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>3. Disonancia suave (flexibilidad &amp; soul)</span>
              <span>9:8 · 16:9</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill peach" style="width:45%"></div></div>
            <div class="spectrum-sub">La segunda mayor y la séptima menor aportan un roce flexible y móvil: imprescindible en el blues, el R&amp;B soul y los acordes de séptima del jazz.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M2">▶ 2.ª may (9:8)</button>
              <button class="btn-tool" data-play-interval-harm="m7">▶ 7.ª men (16:9)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>4. Disonancia marcada (alta tensión &amp; aspereza)</span>
              <span>16:15 · 15:8 · 45:32</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill red" style="width:20%"></div></div>
            <div class="spectrum-sub">La segunda menor, la séptima mayor y el tritono chocan en batimientos rápidos: como el tiburón de «Tiburón» o una sensible tensa hacia la tónica.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="TT">▶ Tritono (45:32)</button>
              <button class="btn-tool" data-play-interval-harm="M7">▶ 7.ª may (15:8)</button>
              <button class="btn-tool" data-play-interval-harm="m2">▶ 2.ª men (16:15)</button>
            </div>
          </div>
        </div>

        <h3>2. Lo que ocurre biológicamente en tu oído</h3>
        <ul class="article-steps-list">
          <li><strong>Banda crítica (cóclea):</strong> En la membrana basilar del oído interno, los sensores de frecuencia están alineados. Cuando dos sonidos se acercan a menos de un 15–20 % de diferencia en Hz, excitan a la vez las mismas células ciliadas y producen una sensación de «aspereza».</li>
          <li><strong>La trampa del grave (Lower Interval Limit):</strong> ¡En las frecuencias bajas los valores en hercios están muy juntos! Entre <code>Do2</code> (65 Hz) y <code>Mi2</code> (82 Hz) solo hay 17 Hz: una tercera mayor normalmente «suave» enturbia la misma banda crítica y suena embarrada. Súbela al registro medio (<code>Do4 + Mi4</code>, 67 Hz de diferencia) ¡y florece al instante!</li>
          <li><strong>Armónicos que rozan (efecto Helmholtz):</strong> Cada nota natural lleva armónicos más agudos. En <code>Do4 + Si4</code> (7.ª mayor), el 2.º armónico de Do4 es <code>Do5</code>: ¡solo un semitono por encima de <code>Si4</code>!</li>
        </ul>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Apretado &amp; turbio (registro grave)</h5>
            <p>Dos alturas se comprimen en la misma banda crítica del oído:</p>
            <button class="btn-tool" data-play-freqs="65.41,82.41" data-osc="triangle" data-dur="1.8">▶ 3.ª mayor grave (Do2+Mi2)</button>
            <button class="btn-tool" data-play-freqs="65.41,69.30" data-osc="triangle" data-dur="1.8">▶ 2.ª menor grave (Do2+Reb2)</button>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Abierto &amp; nítido (registro medio / separado)</h5>
            <p>El mismo intervalo se vuelve cristalino en cuanto se sube o se abre:</p>
            <button class="btn-tool" data-play-freqs="261.63,329.63" data-osc="triangle" data-dur="1.8">▶ 3.ª mayor media (Do4+Mi4)</button>
            <button class="btn-tool" data-play-freqs="130.81,554.37" data-osc="triangle" data-dur="1.8">▶ Compuesto y separado (Do3+Reb5)</button>
          </div>
        </div>

        <h3>3. La magia del contexto: convertir la fricción en brillo</h3>
        <p>
          Que una altura parezca ácida o suntuosa depende tanto de su entorno armónico como de la física pura. Escucha dos notas desnudas y luego exactamente el mismo intervalo vestido con un acorde:
        </p>

        <div class="article-highlight-box">
          <h4>Experimento: la séptima mayor Do + Si (15 : 8)</h4>
          <p>Desnudo, <strong>Do4 + Si4</strong> roza con fuerza. Desliza Mi4 y Sol4 en medio (formando <strong>DoMaj7</strong>) y tu oído oye un apoyo de armónicos que convierte el roce en una dorada suavidad jazzística.</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="isol-maj7">▶ Aislado: Do4 + Si4</button>
            <button class="btn-tool" data-play-custom="chord-maj7">▶ En contexto: DoMaj7 (Do–Mi–Sol–Si)</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-song-tricks",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    badgeClass: "badge-peach",
    title: "Las mejores canciones de referencia para los intervalos",
    subtitle: "De «Tiburón» a Star Wars, «Martinillo» y Los Simpson",
    tag: "Método práctico",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Anclajes melódicos</span>
        <h2>Reconocer intervalos gracias a comienzos famosos</h2>
        <p class="article-lead">
          El truco mental más rápido para identificar un salto es asociarlo a las dos primeras notas de un tema inolvidable. Aquí tienes tu chuleta ascendente:
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Segunda menor (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m2") : "m2"})</strong>
              <span>Tiburón (Jaws) / La Pantera Rosa</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m2">▶ Escuchar</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Segunda mayor (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M2") : "M2"})</strong>
              <span>Martinillo / Cumpleaños feliz</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M2">▶ Escuchar</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tercera menor (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m3") : "m3"})</strong>
              <span>Seven Nation Army / Greensleeves</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m3">▶ Escuchar</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tercera mayor (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M3") : "M3"})</strong>
              <span>When the Saints / Morning Has Broken</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M3">▶ Escuchar</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Cuarta justa (P4)</strong>
              <span>La Marsellesa / Harry Potter / Marcha nupcial</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P4">▶ Escuchar</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tritono (TT)</strong>
              <span>Los Simpson («The Simp-sons») / Maria</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="TT">▶ Escuchar</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Quinta justa (P5)</strong>
              <span>Star Wars / Estrellita, ¿dónde estás?</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P5">▶ Escuchar</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Sexta mayor (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M6") : "M6"})</strong>
              <span>My Bonnie Lies Over the Ocean</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M6">▶ Escuchar</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Octava justa (P8)</strong>
              <span>Somewhere Over the Rainbow</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P8">▶ Escuchar</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-functional",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Oído relativo vs. oído absoluto",
    subtitle: "Por qué oír las funciones armónicas supera a nombrar simplemente las notas",
    tag: "Método",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Filosofía de escucha</span>
        <h2>Por qué las relaciones cuentan más que las frecuencias en bruto</h2>
        <p class="article-lead">
          A menudo se cree que tener «oído musical» consiste en oír una taza tintinear y gritar «¡Fa#!» (<em>el oído absoluto</em>). En la música viva, en cambio, la emoción nace de la función armónica.
        </p>

        <h3>Una nota sola no tiene emoción</h3>
        <p>
          La misma nota <strong>Mi</strong> suena luminosa, cálida y tranquila en <strong>Do mayor</strong> (porque allí hace de tercera mayor relajada, <em>Mi</em>). Toca exactamente ese mismo <strong>Mi</strong> en la tonalidad de <strong>Fa mayor</strong>: de repente arde con una tensión ascendente (¡porque se ha convertido en la sensible, <em>Ti</em>!).
        </p>

        <div class="article-highlight-box">
          <h4>Experimento clave: el mismo Mi4 en dos papeles</h4>
          <p>Escucha exactamente la misma nota objetivo <strong>Mi4</strong> dos veces: primero tras un acorde de Do mayor (reposo tranquilo) y luego tras un acorde de Fa mayor (atracción urgente):</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="context-c">▶ Mi4 en Do mayor (Mi relajado)</button>
            <button class="btn-tool" data-play-custom="context-f">▶ Mi4 en Fa mayor (sensible Ti)</button>
          </div>
        </div>

        <p>
          Por eso Lauscher desarrolla <strong>la escucha funcional (relativa)</strong>: en cuanto tu oído identifica el <em>papel</em> de una nota o de un acorde dentro de una tonalidad, ¡puedes trasladar esa soltura a las 12 tonalidades al instante!
        </p>
      </div>
    `
  },
  {
    id: "art-world-music-cultures",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Sistemas musicales del mundo: 12 notas, microtonalidad y cultura",
    subtitle: "Por qué el piano occidental es solo un universo sonoro entre muchos",
    tag: "Músicas del mundo & acústica",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Culturas, afinación &amp; microtonalidad</span>
        <h2>La cuadrícula de 12 semitonos es un invento, no una ley natural</h2>
        <p class="article-lead">
          Si creces con un piano, una guitarra o el pop occidental, nuestros 12 semitonos fijos por octava parecen algo obvio. Sin embargo, una vuelta al mundo sonora revela algo muy distinto: algunas culturas dividen la octava en 22 o 53 matices, doblan la altura entre las teclas del piano, afinan orquestas enteras con un batimiento deliberado o despliegan dramas completos sin la menor progresión de acordes occidental.
        </p>

        <h3>1. El compromiso occidental: por qué el piano está «ligeramente desafinado»</h3>
        <p>
          En acústica, los intervalos más puros vibran según proporciones de números enteros sencillos (<em>afinación justa</em>): una quinta pura vale <code>3:2</code> (~701,96 cents) y una tercera mayor pura <code>5:4</code> (386,31 cents). Pero si se apilan doce quintas puras no se llega exactamente siete octavas más arriba: sobra un ligero excedente de unos <strong>23,5 cents</strong> (la <em>coma pitagórica</em>). En un teclado fijo, afinar perfectamente una tonalidad hace que las tonalidades lejanas suenen dolorosamente desafinadas.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>La solución occidental (~1700 → hoy)</h5>
            <p>Tras los <em>temperamentos buenos</em> (como en Bach, donde cada tonalidad conservaba su propio color), Occidente generalizó el <strong>temperamento igual de 12 notas (12-TET)</strong>: cada semitono mide exactamente <code>100 cents</code>. El oído paga un peaje discreto (cada tercera mayor queda unos <strong>+14 cents</strong> alta y cada quinta un poco estrechada, <strong>−2 cents</strong>), pero a cambio se puede modular libremente por las 12 tonalidades y superponer una polifonía orquestal compleja (arquitectura <em>vertical</em>).</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>El camino de muchas culturas</h5>
            <p>Las tradiciones centradas en una línea melódica magistral (arquitectura <em>horizontal</em>) sostenida por una nota fija (<em>bordón / drone</em>) no necesitan cambiar de acordes por todo el círculo de quintas. Por eso conservan armónicos puros y cristalinos, despliegan matices sutiles entre nuestras teclas de piano y construyen inmensos universos modales (<em>Maqâmât</em>, <em>Râgas</em>, <em>Dastgâh</em>).</p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Comparación sonora: acorde perfecto puro vs. piano temperado (12-TET)</h4>
          <p>Escucha primero el acorde mayor acústicamente puro (<code>4:5:6</code>: quinta <code>3:2</code>, tercera <code>5:4</code>) e inmediatamente después el mismo acorde de Do mayor en temperamento igual (12-TET). ¡Percibe el ligero temblor de la tercera temperada!</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Acorde puro (4:5:6)</button>
            <button class="btn-tool" data-play-freqs="261.63,329.63,392.00" data-osc="triangle" data-dur="2.0">▶ Temperamento igual 12-TET</button>
          </div>
        </div>

        <h3>2. ¿Qué significa de verdad «microtonalidad»? (cents &amp; comas)</h3>
        <p>
          Para medir alturas más allá del teclado occidental, la acústica divide cada octava en exactamente <strong>1200 cents</strong>. Cada semitono del piano equivale a <code>100 cents</code>, pero el espacio intermedio rebosa de sutileza:
        </p>

        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>Lo que el oído aún distingue</strong>
            En el registro medio, un oído entrenado detecta diferencias de solo <strong>3 a 6 cents</strong>, sobre todo en notas tenidas, gracias a los batimientos o a los cambios de color.
          </div>
          <div class="physics-fact-item">
            <strong>Cuarto de tono &amp; tres cuartos de tono</strong>
            Un verdadero <strong>cuarto de tono</strong> vale <code>50 cents</code>, mientras que un intervalo neutro de <strong>tres cuartos de tono</strong> mide <code>150 cents</code>: ni mayor alegre ni menor triste, sino suspendido en su propia luz.
          </div>
          <div class="physics-fact-item">
            <strong>La coma (~22–24 cents)</strong>
            La teoría turca del makam divide el tono entero en <strong>9 comas de Holder</strong> (~22,6 cents cada una), ¡formando una escala ultrafina de <strong>53 grados por octava</strong>!
          </div>
          <div class="physics-fact-item">
            <strong>La nota como movimiento, no como punto</strong>
            En muchas culturas, un sonido no es un golpe fijo sobre una tecla, sino una curva viva hecha de apoyaturas, glisandos y oscilaciones alrededor de un polo tonal.
          </div>
        </div>

        <h3>3. Mundos árabe, persa y turco: maqâm, makam &amp; dastgâh</h3>
        <p>
          Del Magreb a El Cairo, de Bagdad y Teherán hasta Estambul, la música culta no avanza por encadenamientos de acordes, sino por recorridos melódicos refinados: los <strong>Maqâmât</strong> (árabes), <strong>Makamlar</strong> (turcos) o <strong>Dastgâh-hâ</strong> (persas, con sus alteraciones <em>Koron</em> y <em>Sori</em>). En lugar de una simple escala de 7 notas fijas, el músico ensambla pequeñas células de 3 a 5 notas llamadas <strong>Jins</strong> (pl. <em>Ajnâs</em>). Cada maqâm dicta a la vez la afinación fina, el itinerario melódico (<em>Sayr</em>: de dónde parte la frase, dónde respira, dónde se resuelve) y un clima interior.
        </p>
        <p>
          Su emblema sonoro más famoso es el <strong>intervalo neutro</strong>, sobre todo la <em>tercera neutra</em> hacia los <strong>350 cents</strong> (¡justo a medio camino entre nuestra tercera menor de 300 cents y nuestra tercera mayor de 400 cents!). Ausente del piano occidental, este color cálido y luminoso es el corazón de todo el repertorio del <em>oud</em> y de la flauta <em>ney</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Taller microtonal: tres terceras comparadas (maqâm Rast &amp; Bayâtî)</h4>
          <p>Compara sobre la misma fundamental una tercera mayor occidental (<code>400 ct</code>), una tercera neutra árabe (<code>350 ct</code>) y una tercera menor (<code>300 ct</code>); luego escucha un giro en <strong>maqâm Rast</strong> y la inflexión típica del <strong>maqâm Bayâtî</strong>:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-maqam-contrast">▶ Mayor vs. neutra vs. menor</button>
            <button class="btn-tool" data-play-custom="culture-maqam-rast">▶ Maqâm Rast (350 &amp; 1050 ct)</button>
            <button class="btn-tool" data-play-custom="culture-maqam-bayati">▶ Maqâm Bayâtî (grado a 150 ct)</button>
          </div>
        </div>

        <h3>4. Asia del Sur (Pakistán &amp; India): râga, 22 shrutis, tanpura &amp; tâla</h3>
        <p>
          En la música clásica indostaní, compartida entre el norte de la India y Pakistán (del canto <em>khyal</em> y el <em>qawwali</em> místico al sitar, el sarangi y la bansuri), todo el edificio descansa sobre una alfombra sonora continua y rica en armónicos: el bordón de la <strong>tanpura</strong> (a menudo tónica <code>Sa</code> y quinta <code>Pa</code>). Como la armonía nunca cambia de centro, no hace falta ningún temperamento de compromiso.
        </p>
        <ul class="article-steps-list">
          <li><strong>22 shrutis (referencias microtonales):</strong> Aunque un <em>râga</em> retiene 5, 6 o 7 grados principales (<em>svara</em>), su afinación se elige entre <strong>22 posiciones microtonales (shrutis)</strong>. El bajísimo <code>Ati-Komal Re</code> del râga Bhairav se acerca a la tónica mucho más que una segunda menor temperada, creando esa gravedad solemne del amanecer.</li>
          <li><strong>El arte entre las notas (meend, andolan &amp; gamak):</strong> En el sitar como en el canto, una nota recta y sin adorno parece desnuda. La belleza nace del <em>meend</em> (glisando flexible que une dos alturas), del <em>andolan</em> (ondulación lenta alrededor de un microtono) y del <em>gamak</em> (impulsos ornamentales vigorosos). El arco entre las notas cuenta tanto como las notas mismas.</li>
          <li><strong>Râga y hora del día:</strong> Un râga tiene una personalidad completa: perfil ascendente (<em>aroha</em>) y descendente (<em>avaroha</em>), nota pivote (<em>vadi</em>) y momento preferido (el amanecer para <em>Bhairav</em> frente a la noche profunda para <em>Darbari Kanada</em>).</li>
          <li><strong>Tâla (tiempo cíclico):</strong> En lugar de compases lineales, las <em>tablas</em> giran en ciclos cerrados de 16 tiempos (<em>teental</em>), 10 tiempos (<em>jhaptal</em>) o 7 tiempos (<em>rupak</em>), que convergen una y otra vez hacia el primer tiempo imantado, el <strong>sam</strong>.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Ejemplo de escucha: râga Bhairav sobre bordón de tanpura (Sa–Pa)</h4>
          <p>Presta atención a la segunda muy baja (<code>Ati-Komal Re</code>) y a la distensión progresiva hacia el reposo final en <code>Sa</code>:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-raga-bhairav">▶ Râga Bhairav (tanpura + afinación de 22 shrutis)</button>
          </div>
        </div>

        <h3>5. Indonesia (Java &amp; Bali): gamelán, sléndro, pélog &amp; el oleaje ombak</h3>
        <p>
          Pocas tradiciones sacuden tanto nuestras referencias occidentales como las grandes orquestas de bronce del <strong>gamelán</strong> javanés y balinés. Aquí no existe un diapasón universal <code>La = 440 Hz</code>: <strong>cada conjunto de gamelán tiene su propia afinación única</strong>, celosamente conservada, por lo que dos conjuntos distintos normalmente no pueden tocar juntos.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Sléndro: 5 pasos casi equidistantes</h5>
            <p>Divide la octava no en 12 semitonos, sino en <strong>5 intervalos anchos parecidos</strong> de unos <code>240 cents</code>. En un sléndro puro no existe ni tercera mayor occidental ni quinta o cuarta exacta, lo que obliga al oído a soltar sus automatismos de tríadas.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Pélog &amp; ombak (la «ola marina»)</h5>
            <p>El <strong>pélog</strong> ofrece 7 grados asimétricos de los que se extraen modos pentatónicos contrastados. En Bali, los metalófonos van por parejas: uno algo más grave (<em>pengumbang</em>) y su gemelo unos <strong>5 a 8 Hz más agudo</strong> (<em>pengisep</em>). Golpeados juntos, generan el <strong>ombak</strong> («ola»): un batimiento tornasolado y que respira, buscado como alma acústica de la orquesta.</p>
          </div>
        </div>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-gamelan-slendro">▶ Escala sléndro (~240 ct equidistantes)</button>
          <button class="btn-tool" data-play-custom="culture-gamelan-ombak">▶ Brillo ombak balinés (~7 Hz)</button>
        </div>

        <h3>6. África subsahariana &amp; Asia oriental: polirritmia, blue notes y silencio</h3>
        <ul class="article-steps-list">
          <li><strong>África subsahariana: ciclos entrelazados &amp; asimetría:</strong> Mientras Europa explora la armonía vertical, África occidental y central despliega arquitecturas rítmicas vertiginosas. Varias voces superponen pulsaciones contrarias (<strong>3 contra 4</strong> o <strong>3 contra 2</strong>: verdadera <em>polirritmia</em>), unificadas por una campana guía asimétrica llamada <strong>bell timeline</strong> (como el patrón estándar de 12/8 <code>x . x . x x . x . x . x</code>). Nadie brilla por separado: todo nace del entrelazado colectivo y del diálogo de <em>llamada y respuesta</em>.</li>
          <li><strong>De África occidental al blues, el jazz &amp; el soul (¡blue notes!):</strong> Cuando los músicos africanos deportados a Norteamérica se cruzaron con guitarras, pianos y metales occidentales, sus terceras, quintas y séptimas vocales inclinadas hacia abajo no cabían en las casillas fijas del 12-TET. Ese choque creativo dio lugar a las célebres <strong>blue notes</strong> microtonales: el corazón expresivo del blues, el gospel, el jazz y el rock modernos.</li>
          <li><strong>Asia oriental: timbre, presión del dedo &amp; el arte del «Ma»:</strong> Las músicas cultas china (la cítara <em>guqin</em>, con sus cien técnicas de ataque y glisando) o japonesa (la flauta <em>shakuhachi</em>) se apoyan a menudo en esqueletos pentatónicos, mientras invierten lo infinito en las inflexiones microtonales, el grano del soplo y el concepto temporal de <strong>Ma (間)</strong>: el silencio vibrante entre dos sonidos, tan elocuente como la propia nota.</li>
        </ul>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-westafrica-poly">▶ Timeline de campana 12/8 + polirritmia 4 contra 3</button>
        </div>

        <h3>7. Cuatro ejes de comparación mundial, y lo que gana tu oído</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>1. Escala &amp; afinación</strong>
              <span>Occidente: 12 pasos fijos de 100 cents (12-TET). Mundo: sléndro de 5 notas (~240 ct), 22 shrutis, makam de 53 comas o polos cantados fluidos.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>2. Vertical vs. horizontal</strong>
              <span>Occidente narra mediante progresiones de acordes. El maqâm y el râga esculpen líneas microtonales sutiles sobre un centro estable.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>3. Ideal sonoro</strong>
              <span>Fusión lisa frente a batimientos oceánicos (<em>ombak</em>), riqueza zumbante del puente del sitar (<em>jawari</em>) o timbre soplado del bambú.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>4. Percepción del tiempo</strong>
              <span>Compases lineales de 3/4 o 4/4 frente a ciclos cerrados (<em>tâla</em>), timelines asimétricos en 12/8 o la respiración del silencio (<em>Ma</em>).</span>
            </div>
          </div>
        </div>

        <div class="k-song-ref">
          <strong>Lo que gana tu escucha:</strong> Cada cultura cultiva un superpoder auditivo distinto. La armonía occidental afina la escucha de las funciones de los acordes; el maqâm y el râga afinan tu <strong>radar microtonal</strong> y tu afinación al cantar o en instrumentos sin trastes; el gamelán y la polirritmia africana liberan del conteo rígido y anclan el ritmo en todo el cuerpo. En Lauscher, entrenar intervalos significa escuchar <em>relaciones vivas en lugar de simples etiquetas</em>: la clave universal de todas las músicas del mundo.
        </div>
      </div>
    `
  },
  {
    id: "art-mnemonics",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1.1 2h5.8c.1-.8.5-1.5 1.1-2A7 7 0 0 0 12 2z"/></svg>`,
    badgeClass: "badge-peach",
    title: "Reglas mnemotécnicas en música",
    subtitle: "Las fórmulas clásicas del solfeo para la armadura, las claves, las cuerdas, los intervalos y el ritmo",
    tag: "Trucos & memoria",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Trucos &amp; memoria</span>
        <h2>Reglas mnemotécnicas: recordar el solfeo sin esfuerzo</h2>
        <p class="article-lead">
          ¿Por qué recordamos una canción infantil o una imagen divertida en diez segundos, mientras que una lista abstracta se borra en cinco minutos? A nuestra memoria le encantan <strong>el ritmo de las palabras, las historias y las referencias visuales</strong>. Aquí tienes las fórmulas mnemotécnicas imprescindibles del solfeo en español.
        </p>

        <h3>1. Orden de sostenidos y bemoles, y lectura instantánea de la armadura</h3>
        <p>
          En el solfeo en español, el orden de los siete sostenidos y el de los siete bemoles se aprenden como dos versos rítmicos exactamente inversos el uno del otro:
        </p>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Orden de los 7 sostenidos (♯): Fa – Do – Sol – Re – La – Mi – Si</h5>
            <p>
              Se recita en dos grupos rítmicos:<br>
              <strong>«Fa – Do – Sol / Re – La – Mi – Si»</strong><br>
              Tonalidades mayores en el sentido de las agujas del reloj a partir de Do (0): <strong>Sol</strong> (1♯), <strong>Re</strong> (2♯), <strong>La</strong> (3♯), <strong>Mi</strong> (4♯), <strong>Si</strong> (5♯), <strong>Fa♯</strong> (6♯).
            </p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Orden de los 7 bemoles (♭): Si – Mi – La – Re – Sol – Do – Fa</h5>
            <p>
              Es el orden de los sostenidos leído <strong>al revés</strong>:<br>
              <strong>«Si – Mi – La – Re / Sol – Do – Fa»</strong><br>
              (Truco: piensa en <em>«<strong>Fa</strong>, <strong>Do</strong>, <strong>Sol</strong>, <strong>Re</strong>…»</em> y simplemente dale la vuelta a la cinta).<br>
              Tonalidades mayores: <strong>Fa</strong> (1♭), <strong>Si♭</strong> (2♭), <strong>Mi♭</strong> (3♭), <strong>La♭</strong> (4♭), <strong>Re♭</strong> (5♭), <strong>Sol♭</strong> (6♭).
            </p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Dos trucos infalibles para encontrar la tonalidad mayor de la armadura</h4>
          <ul class="article-steps-list">
            <li><strong>Con sostenidos (♯):</strong> El <em>último sostenido</em> es siempre la <strong>sensible (7.º grado)</strong>. ¡Sube simplemente <strong>un semitono</strong> y tendrás la tonalidad mayor! (Ejemplo: último sostenido = <em>Do♯</em> → un semitono más arriba = <strong>Re mayor</strong>).</li>
            <li><strong>Con bemoles (♭):</strong> ¡El <em>penúltimo bemol</em> lleva directamente el nombre de la tonalidad mayor! (Ejemplo: 3 bemoles = Si♭, <strong>Mi♭</strong>, La♭ → <strong>Mi♭ mayor</strong>. Solo 1♭ = <strong>Fa mayor</strong> hay que recordarlo aparte).</li>
            <li><strong>Encontrar el relativo menor:</strong> Baja <strong>una tercera menor (3 semitonos)</strong> desde la tónica mayor (Do mayor → La menor, Sol mayor → Mi menor).</li>
          </ul>
          <button class="btn-tool" data-jump-ref="circle-of-fifths">→ Abrir el círculo de quintas interactivo</button>
        </div>

        <h3>2. Referencias en el pentagrama: clave de Sol, clave de Fa y clave de Do</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Clave de Sol (2.ª línea) • Espacios y líneas</strong>
              <span>• El rizo central rodea la 2.ª línea: <strong>Sol4</strong>.<br>• Los 4 espacios de abajo arriba: <strong>Fa – La – Do – Mi</strong> (la palabra <strong>«FACE»</strong> en notación internacional F–A–C–E).<br>• Las 5 líneas en terceras ascendentes: <strong>Mi – Sol – Si – Re – Fa</strong>.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Clave de Fa (4.ª línea) • El truco del desplazamiento de una tercera</strong>
              <span>• Los dos puntos rodean la 4.ª línea: <strong>Fa3</strong>.<br>• <strong>Atajo de lectura:</strong> Toda nota escrita en clave de Fa se lee <strong>dos nombres de nota (una tercera) más arriba</strong> que si estuviera en clave de Sol (p. ej., la posición de un <em>Do</em> en clave de Sol se convierte en un <em>Mi</em> en clave de Fa).</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Clave de Do en 3.ª (clave de contralto) • El Do central en el medio</strong>
              <span>La punta central de la clave señala exactamente la 3.ª línea (la del medio) = el <strong>Do4 (Do central)</strong>.</span>
            </div>
          </div>
        </div>

        <h3>3. Cuerdas al aire: guitarra, bajo, violín, viola, violonchelo &amp; ukelele</h3>
        <p>
          De la cuerda más grave (la más gruesa) a la más aguda (la más fina):
        </p>
        <ul class="article-steps-list">
          <li><strong>Guitarra (6 cuerdas: Mi – La – Re – Sol – Si – Mi / E – A – D – G – B – E):</strong> <em>«<strong>M</strong>ientras <strong>L</strong>as <strong>R</strong>anas <strong>S</strong>altan <strong>S</strong>in <strong>M</strong>iedo»</em> (o con letras internacionales: <em>«<strong>E</strong>ddie <strong>A</strong>te <strong>D</strong>ynamite, <strong>G</strong>ood <strong>B</strong>ye <strong>E</strong>ddie»</em>).</li>
          <li><strong>Bajo &amp; contrabajo (4 cuerdas: Mi – La – Re – Sol):</strong> Las cuatro cuerdas graves de la guitarra, afinadas en cuartas justas.</li>
          <li><strong>Violín (4 cuerdas: Sol – Re – La – Mi):</strong> Cuatro quintas justas ascendentes (¡como el comienzo del orden de los sostenidos tras Fa y Do!).</li>
          <li><strong>Viola &amp; violonchelo (4 cuerdas: Do – Sol – Re – La):</strong> Cuatro quintas justas ascendentes a partir de Do.</li>
          <li><strong>Ukelele (Sol – Do – Mi – La / G – C – E – A):</strong> Afinación estándar en Do con la 4.ª cuerda (Sol) aguda.</li>
        </ul>

        <h3>4. Canciones de referencia para reconocer intervalos de oído</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Segunda menor (1 st) &amp; segunda mayor (2 st)</strong>
              <span>• <strong>2.ª menor:</strong> <em>Tiburón (Jaws)</em> ascendente / <em>Para Elisa</em> descendente.<br>• <strong>2.ª mayor:</strong> <em>Martinillo</em> (las dos primeras notas: Do–Re) o <em>Cumpleaños feliz</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="1">▶ 2.ª men.</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tercera menor (3 st) &amp; tercera mayor (4 st)</strong>
              <span>• <strong>3.ª menor:</strong> <em>Greensleeves</em> o la <em>Canción de cuna de Brahms</em> ascendente / <em>El cucú</em> o <em>Hey Jude</em> descendente.<br>• <strong>3.ª mayor:</strong> <em>Oh When the Saints</em> ascendente / <em>Summertime</em> descendente.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="4">▶ 3.ª may.</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Cuarta justa (5 st) &amp; tritono (6 st)</strong>
              <span>• <strong>Cuarta justa:</strong> <em>La Marsellesa («Allons en-fants»)</em> o la <em>Marcha nupcial</em>.<br>• <strong>Tritono (4.ª aum. / 5.ª dism.):</strong> <em>Los Simpson</em> o <em>Maria (West Side Story)</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="6">▶ Tritono</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Quinta justa (7 st), sexta mayor (9 st) &amp; octava (12 st)</strong>
              <span>• <strong>Quinta justa:</strong> <em>Star Wars</em> o <em>Estrellita, ¿dónde estás? (Do → Sol)</em>.<br>• <strong>Sexta mayor:</strong> <em>My Bonnie Lies Over the Ocean</em>.<br>• <strong>Octava:</strong> <em>Somewhere Over the Rainbow</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="7">▶ Quinta</button>
          </div>
        </div>

        <h3>5. Modos, tríadas &amp; sílabas rítmicas</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-lilac">
            <h5>Los 7 modos y su nota característica</h5>
            <p>
              Sobre las teclas blancas de <strong>Do a Si</strong>:<br>
              <strong>Jónico (Do) – Dórico (Re) – Frigio (Mi) – Lidio (Fa) – Mixolidio (Sol) – Eólico (La) – Locrio (Si)</strong>.<br>
              <strong>Referencias auditivas inmediatas:</strong><br>
              • Mayor + <strong>#4</strong> luminosa = <strong>Lidio</strong><br>
              • Mayor + <strong>b7</strong> blues/rock = <strong>Mixolidio</strong><br>
              • Menor + <strong>♮6</strong> clara = <strong>Dórico</strong><br>
              • Menor + <strong>b2</strong> flamenca = <strong>Frigio</strong>
            </p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Palabras rítmicas &amp; fórmulas de los acordes</h5>
            <p>
              <strong>Decir el ritmo antes de contarlo:</strong><br>
              • Negra (♩): <em>«Pan»</em> / <em>«Ta»</em><br>
              • Dos corcheas (♪♪): <em>«Ca-sa»</em> / <em>«Ti-ti»</em><br>
              • Tresillo (3 por tiempo): <em>«Plá-ta-no»</em> / <em>«Tre-si-llo»</em><br>
              • Cuatro semicorcheas (4 por tiempo): <em>«Cho-co-la-te»</em><br>
              <strong>Receta de las tríadas (semitonos):</strong><br>
              • <strong>Mayor = 4 + 3</strong> • <strong>Menor = 3 + 4</strong><br>
              • <strong>Disminuida = 3 + 3</strong> • <strong>Aumentada = 4 + 4</strong>
            </p>
          </div>
        </div>
      </div>
    `
  }
];

const PHYSICS_WAVE_EXPLANATIONS_ES = {
  "2,1": "<strong>Octava (2 : 1):</strong> En 2 ondas verdes largas caben exactamente <strong>4 ondas naranjas el doble de cortas</strong>. En la pista 3, el dibujo global se repite idéntico en cada línea de puntos: por eso la octava casi se funde en un solo sonido.",
  "3,2": "<strong>Quinta justa (3 : 2):</strong> Mientras la fundamental traza 2 ondas verdes largas, la aguda dibuja exactamente <strong>3 ondas naranjas</strong>. Vuelven a coincidir limpiamente cada 2 ondas: estable, abierta y potente.",
  "4,3": "<strong>Cuarta justa (4 : 3):</strong> 3 ondas verdes se encuentran justo con 4 ondas naranjas, y luego todo el patrón vuelve a empezar sincronizado desde cero.",
  "5,4": "<strong>Tercera mayor (5 : 4):</strong> 4 ciclos verdes se cruzan con 5 ciclos naranjas. En la pista 3 se forma una curva suave y redonda: la calidez de los acordes mayores.",
  "6,5": "<strong>Tercera menor (6 : 5):</strong> 5 ondas verdes contra 6 naranjas: un poco más apretado que la tercera mayor; ese ligero movimiento de onda da al menor su color emotivo.",
  "5,3": "<strong>Sexta mayor (5 : 3):</strong> Proporción 1,67 : 1, la inversión de la tercera menor. Amplia, cantable y agradablemente asentada.",
  "45,32": "<strong>Tritono (45 : 32):</strong> Las crestas naranjas se niegan a alinearse con la cuadrícula verde. Observa la pista 3: ¡una curva en dientes de sierra llena de tensión!",
  "16,15": "<strong>Segunda menor (16 : 15):</strong> Las dos ondas tienen casi la misma velocidad, pero se van desfasando poco a poco, creando esos «vientres» gruesos y luego finos en la pista 3 (batimiento)."
};

const PHYSICS_OVERTONES_ES = [
  { num: 1,  note: "Do2",      ratio: "1× · Fundam.",    freq: 65.41,  special: false },
  { num: 2,  note: "Do3",      ratio: "2× · Octava",     freq: 130.82, special: false },
  { num: 3,  note: "Sol3",     ratio: "3× · Quinta j.",  freq: 196.23, special: false },
  { num: 4,  note: "Do4",      ratio: "4× · 2.ª octava", freq: 261.64, special: false },
  { num: 5,  note: "Mi4",      ratio: "5× · 3.ª may.",   freq: 327.05, special: false },
  { num: 6,  note: "Sol4",     ratio: "6× · Quinta j.",  freq: 392.46, special: false },
  { num: 7,  note: "~Sib4*",   ratio: "7× · 7.ª nat.",   freq: 457.87, special: true },
  { num: 8,  note: "Do5",      ratio: "8× · 3.ª octava", freq: 523.28, special: false },
  { num: 9,  note: "Re5",      ratio: "9× · 2.ª may.",   freq: 588.69, special: false },
  { num: 10, note: "Mi5",      ratio: "10× · 3.ª may.",  freq: 654.10, special: false },
  { num: 11, note: "~Fa5/Fa#*",ratio: "11× · Fa alpino", freq: 719.51, special: true },
  { num: 12, note: "Sol5",     ratio: "12× · Quinta j.", freq: 784.92, special: false }
];

function renderPhysicsReferenceHTML_ES() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Cómo nace el sonido</span>
        <span class="k-ratio-chip">aprox. 343 m/s</span>
      </div>
      <h4>Del aire que vibra a la curva sinusoidal</h4>
      <p>
        Pulsa una cuerda de guitarra o tararea una nota: algo vibra muy deprisa hacia delante y hacia atrás. Ese temblor empuja las moléculas de aire vecinas y envía una onda de presión a unos <strong>343 metros por segundo</strong> (¡más de 1200 km/h!). Cuando llega a tu oído, el tímpano vibra al mismo ritmo y el cerebro lo traduce en música.
      </p>
      <p>
        Imagina un columpio que va y viene sin la menor sacudida: si se dibuja ese movimiento regular en el tiempo, se obtiene una <strong>sinusoide</strong> (<em>curva seno</em>). Es el ladrillo elemental del sonido: <strong>una sola frecuencia pura</strong>, sin nada alrededor. Los instrumentos reales dibujan ondas mucho más abolladas, porque mezclan varias vibraciones a la vez.
      </p>

      <div class="wave-compare-visual">
        <div class="wave-compare-card">
          <strong>Sinusoide pura (1 frecuencia)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 29.0 L9.5 25.0 L12.9 21.3 L16.4 17.8 L19.9 14.9 L23.3 12.5 L26.8 10.9 L30.3 10.1 L33.7 10.1 L37.2 10.9 L40.7 12.5 L44.1 14.9 L47.6 17.8 L51.1 21.3 L54.5 25.0 L58.0 29.0 L61.5 33.0 L64.9 36.7 L68.4 40.2 L71.9 43.1 L75.3 45.5 L78.8 47.1 L82.3 47.9 L85.7 47.9 L89.2 47.1 L92.7 45.5 L96.1 43.1 L99.6 40.2 L103.1 36.7 L106.5 33.0 L110.0 29.0 L113.5 25.0 L116.9 21.3 L120.4 17.8 L123.9 14.9 L127.3 12.5 L130.8 10.9 L134.3 10.1 L137.7 10.1 L141.2 10.9 L144.7 12.5 L148.1 14.9 L151.6 17.8 L155.1 21.3 L158.5 25.0 L162.0 29.0 L165.5 33.0 L168.9 36.7 L172.4 40.2 L175.9 43.1 L179.3 45.5 L182.8 47.1 L186.3 47.9 L189.7 47.9 L193.2 47.1 L196.7 45.5 L200.1 43.1 L203.6 40.2 L207.1 36.7 L210.5 33.0 L214.0 29.0" fill="none" stroke="var(--sage-strong)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Curva en S bien redonda y sin picos: suena lisa y neutra, como un diapasón o un silbido suave.</span>
        </div>
        <div class="wave-compare-card">
          <strong>Sonido real (fundamental + armónicos)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 26.9 L9.5 17.6 L12.9 11.3 L16.4 9.3 L19.9 11.2 L23.3 15.4 L26.8 19.5 L30.3 22.3 L33.7 23.3 L37.2 23.3 L40.7 23.4 L44.1 23.9 L47.6 24.9 L51.1 25.9 L54.5 26.5 L58.0 26.9 L61.5 27.7 L64.9 29.3 L68.4 31.8 L71.9 34.5 L75.3 36.8 L78.8 38.1 L82.3 38.8 L85.7 39.9 L89.2 41.9 L92.7 44.7 L96.1 47.2 L99.6 47.4 L103.1 43.9 L106.5 36.5 L110.0 26.9 L113.5 17.6 L116.9 11.3 L120.4 9.3 L123.9 11.2 L127.3 15.4 L130.8 19.5 L134.3 22.3 L137.7 23.3 L141.2 23.3 L144.7 23.4 L148.1 23.9 L151.6 24.9 L155.1 25.9 L158.5 26.5 L162.0 26.9 L165.5 27.7 L168.9 29.3 L172.4 31.8 L175.9 34.5 L179.3 36.8 L182.8 38.1 L186.3 38.8 L189.7 39.9 L193.2 41.9 L196.7 44.7 L200.1 47.2 L203.6 47.4 L207.1 43.9 L210.5 36.5 L214.0 26.9" fill="none" stroke="var(--peach-strong)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Varias sinusoides se apilan. Esos picos y valles dan a cada instrumento su personalidad.</span>
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Hercios (Hz) = velocidad</strong>
          <span><code>65 Hz</code> (<code>Do2</code> grave) vibra 65 veces por segundo: ¡una onda de <strong>5,24 metros</strong> en la habitación! <code>440 Hz</code> (<code>La4</code>) mide solo <strong>78 cm</strong>.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Octava = velocidad doblada</strong>
          <span>Tu oído razona en proporciones: saltar <code>220 → 440 Hz</code> (+220 Hz) y <code>440 → 880 Hz</code> (+440 Hz) da exactamente la misma impresión: ¡2:1!</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Amplitud = volumen</strong>
          <span>La amplitud del movimiento (en decibelios, dB) hace el sonido más fuerte o más débil, sin cambiar nunca la altura de la nota.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Forma de onda = timbre</strong>
          <span>Onda lisa = sonido suave tipo flauta. Onda dentada = sonido mordiente tipo trompeta o guitarra saturada.</span>
        </div>
      </div>

      <div class="k-meta-box">
        <strong>Para probar: saltos de octava &amp; formas de onda en Do4 (261,6 Hz):</strong>
        <div class="k-btn-row" style="margin-top:0.35rem;">
          <button class="btn-tool" data-play-freqs="220,440,880" data-seq-step="650" data-osc="triangle" data-dur="0.75">▶ 220 → 440 → 880 Hz</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sine" data-dur="1.4">▶ Sinusoide pura</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="triangle" data-dur="1.4">▶ Triangular (más suave)</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sawtooth" data-dur="1.4">▶ Diente de sierra (mordiente)</button>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. El espectro de frecuencias</span>
        <span class="k-ratio-chip">20 Hz – 20 kHz</span>
      </div>
      <h4>La huella dactilar del sonido: ¿qué esconde una nota?</h4>
      <p>
        Si un piano y una guitarra tocan exactamente el mismo <code>Do4</code>, los reconoces al instante, ¡aunque la nota base tenga la misma frecuencia! El secreto es el <strong>espectro de frecuencias</strong>: cada sonido real es en realidad un equipo de sinusoides que resuenan juntas.
      </p>
      <p>
        Un espectro (como un analizador de ecualizador) muestra, igual que una radiografía, qué frecuencias suenan y con qué volumen: a la izquierda del todo está la fundamental (<code>1×</code>) y a la derecha sus armónicos más rápidos (<code>2×</code> a <code>10×</code>). Elige un sonido para ver y oír su receta:
      </p>

      <div class="freq-spec-box">
        <div class="k-btn-row">
          <button class="k-filter-pill active" data-spec-preset="sine" data-play-freqs="261.63" data-osc="sine" data-dur="1.4" data-spec-desc="<strong>Sinusoide pura:</strong> Una sola barra en 1×, cero armónicos. Un sonido muy liso, casi neutro, sin frecuencias agudas que lo coloreen.">▶ Sinusoide (Do4)</button>
          <button class="k-filter-pill" data-spec-preset="piano" data-play-inst data-style="piano" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Piano (sample):</strong> Fundamental sólida y primeros armónicos redondos que se apagan con suavidad hacia arriba: de ahí esa redondez cálida.">▶ Piano (sample Do4)</button>
          <button class="k-filter-pill" data-spec-preset="guitar" data-play-inst data-style="guitar" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Guitarra (sample):</strong> La cuerda pulsada inyecta claramente más energía en la parte media y alta del espectro: eso da el mordiente y el chasquido del ataque.">▶ Guitarra (sample Do4)</button>
          <button class="k-filter-pill" data-spec-preset="strings" data-play-inst data-style="strings" data-notes="C4" data-dur="1.6" data-spec-desc="<strong>Cuerdas (sample):</strong> El arco mantiene incluso los armónicos agudos (6×–10×) de forma continua, ofreciendo ese grano sedoso que atraviesa fácilmente una mezcla.">▶ Cuerdas (sample Do4)</button>
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
          <strong>Sinusoide pura:</strong> Una sola barra en 1×, cero armónicos. Un sonido muy liso, casi neutro, sin frecuencias agudas que lo coloreen.
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Subgraves &amp; graves (20 – 250 Hz)</strong>
          <span>Bombo, bajo, base. Ondas tan amplias que a menudo se sienten en el pecho antes de distinguirlas.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Medios &amp; cuerpo (250 Hz – 2 kHz)</strong>
          <span>Voz, cuerpo del piano, acordes de guitarra. Demasiada energía aquí vuelve el sonido «apagado» enseguida.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Presencia &amp; ataque (2 – 6 kHz)</strong>
          <span>Consonantes («S», «T»), chasquido de la púa y claridad. Zona en la que el oído es ultrasensible.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Aire &amp; brillo (6 – 20 kHz)</strong>
          <span>Destello de los platillos, soplo sutil y detalles sedosos hasta los límites de la audición humana.</span>
        </div>
      </div>
    </article>

    <div class="wave-lab-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">3. Laboratorio de ondas interactivo</span>
        <button id="toggleWavePauseBtn" class="k-ratio-btn">⏸ Pausar</button>
      </div>
      <h4>Observar en directo cómo se funden dos ondas</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-mid); line-height:1.4;">
        Las líneas de puntos marcan <strong>1 ciclo completo de la fundamental (verde)</strong>. Debajo vibra la <strong>2.ª nota (naranja)</strong>, y la pista 3, abajo del todo, muestra su verdadera <strong>onda combinada</strong> tal como llega a tu tímpano.
      </p>
      <div class="wave-canvas-wrap">
        <canvas id="waveCanvas" class="wave-canvas" width="540" height="195"></canvas>
        <div id="waveExplainBanner" class="wave-explain-banner">
          ${PHYSICS_WAVE_EXPLANATIONS_ES["2,1"]}
        </div>
      </div>
      <div class="k-btn-row">
        <button class="k-filter-pill active" data-wave-ratio="2,1" data-wave-semi="12">Octava (2:1)</button>
        <button class="k-filter-pill" data-wave-ratio="3,2" data-wave-semi="7">Quinta (3:2)</button>
        <button class="k-filter-pill" data-wave-ratio="4,3" data-wave-semi="5">Cuarta (4:3)</button>
        <button class="k-filter-pill" data-wave-ratio="5,4" data-wave-semi="4">3.ª may (5:4)</button>
        <button class="k-filter-pill" data-wave-ratio="6,5" data-wave-semi="3">3.ª men (6:5)</button>
        <button class="k-filter-pill" data-wave-ratio="5,3" data-wave-semi="9">6.ª may (5:3)</button>
        <button class="k-filter-pill" data-wave-ratio="45,32" data-wave-semi="6">Tritono (45:32)</button>
        <button class="k-filter-pill" data-wave-ratio="16,15" data-wave-semi="1">2.ª men (16:15)</button>
      </div>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">4. La escala oculta de la naturaleza</span>
        <span class="k-ratio-chip">1× a 12× la fundamental</span>
      </div>
      <h4>Ondas estacionarias &amp; serie armónica (1.º–12.º)</h4>
      <p>
        Fija una cuerda por sus dos extremos y púlsala: como los bordes no se mueven, vibra entera Y a la vez se divide en mitades (2× más rápido), en tercios (3×), en cuartos (4×)… ¡Una sola nota contiene de forma natural toda una escala de armónicos ocultos!
      </p>
      <p>
        ¡Toca las fichas! Los sonidos marcados en violeta <strong>7</strong> y <strong>11</strong> («Fa de la trompa alpina») caen justo <em>entre</em> dos teclas del piano: armónicos naturales puros.
      </p>
      <div class="overtone-grid">
        ${PHYSICS_OVERTONES_ES.map(ot => `
          <button class="overtone-btn ${ot.special ? "is-blue" : ""}" data-play-freqs="${ot.freq}" data-osc="triangle" data-dur="1.15">
            <span class="overtone-num">Arm. #${ot.num}</span>
            <span class="overtone-note">${ot.note}</span>
            <span class="overtone-ratio">${ot.ratio}</span>
          </button>
        `).join("")}
      </div>
      <div class="k-meta-box">
        <strong>Por qué el mayor parece tan natural:</strong> Los armónicos <strong>4 : 5 : 6</strong> forman enseguida un acorde mayor luminoso cerca de la base. ¡El acorde menor puro se esconde mucho más arriba, hacia <strong>10 : 12 : 15</strong>!
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="${PHYSICS_OVERTONES_ES.map(o => o.freq).join(",")}" data-seq-step="380" data-osc="triangle" data-dur="0.65">▶ Serie completa (1–12)</button>
        <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Acorde mayor (4:5:6)</button>
        <button class="btn-tool" data-play-freqs="261.63,313.96,392.45" data-osc="triangle" data-dur="2.0">▶ Acorde menor (10:12:15)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">5. Batimientos acústicos</span>
        <span class="k-ratio-chip">Diferencia en Hz = puls./s</span>
      </div>
      <h4>Cuando las ondas «bombean»: afinar de oído</h4>
      <p>
        Toca dos cuerdas casi al unísono: sus crestas se suman un instante (el doble de fuerte) y luego se oponen (un breve hueco). Ese vaivén («ua-ua-ua») se llama <strong>batimiento</strong>. El número de pulsaciones por segundo da exactamente la <strong>diferencia en hercios</strong>: cuando las cuerdas están perfectamente afinadas, ¡el temblor desaparece!
      </p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="440,440" data-osc="sine" data-dur="2.4">▶ 0 Hz (440+440 · estable)</button>
        <button class="btn-tool" data-play-freqs="440,442" data-osc="sine" data-dur="2.6">▶ 2 Hz (440+442 · 2 puls./s)</button>
        <button class="btn-tool" data-play-freqs="440,446" data-osc="sine" data-dur="2.4">▶ 6 Hz (440+446 · centelleo)</button>
        <button class="btn-tool" data-play-freqs="440,466" data-osc="sine" data-dur="2.2">▶ 26 Hz (440+466 · roce)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">6. Afinación &amp; el compromiso del piano</span>
        <span class="k-ratio-chip">Diferencia +23,5 cents</span>
      </div>
      <h4>Por qué ningún piano del mundo está afinado «100 % puro»</h4>
      <p>
        Un extraño capricho de las matemáticas: apila 12 quintas puras (3:2) seguidas y superas ligeramente 7 octavas justas, ¡en unos <strong>23,5 cents</strong>! Si un afinador ajustara el piano perfectamente puro en Do mayor, las tonalidades lejanas como Fa♯ mayor sonarían terriblemente desafinadas.
      </p>
      <p>
        El truco de la música moderna se llama <strong>temperamento igual</strong>: la octava se divide en 12 minipasos estrictamente iguales. Cada pieza funciona en las 12 tonalidades, a cambio de una tercera mayor (Do–Mi) unos <strong>14 cents</strong> más alta en el piano. Compara la afinación justa con samples reales de piano:
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Afinación justa (pura 5:4)</h5>
          <p>Cero batimientos: fusión lisa, pero inutilizable en todas las tonalidades:</p>
          <button class="btn-tool" data-play-freqs="261.63,327.04" data-osc="triangle" data-dur="2.3">▶ Tercera pura (5:4 · lisa)</button>
          <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.3">▶ Tríada de Do mayor pura</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Piano / temperamento igual (+14 ct)</h5>
          <p>Samples reales de piano de estudio: ligero brillo ondulante, tocable en las 12 tonalidades:</p>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4" data-dur="2.3">▶ Tercera de piano (sample Do4 + Mi4)</button>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4,G4" data-dur="2.3">▶ Do mayor de piano (sample)</button>
        </div>
      </div>
    </article>
  `;
}


const CATEGORY_HELP_GUIDES_ES = {
  cadence: {
    tagClass: "tag-sage",
    tag: "Instrucciones • Cadencias",
    title: "Cómo funciona el entrenamiento de cadencias",
    lead: "En lugar de adivinar acordes fuera de contexto, escuchas una progresión completa de cuatro compases, en <strong>mayor</strong> y en <strong>menor</strong>, e identificas la función que falta en el signo de interrogación.",
    sections: `
      <h3>Los cuatro grupos de ejercicios (mayor &amp; menor)</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Mayor • Objetivo: compás 4</h5>
          <p>Los compases 1 a 3 establecen la tonalidad mayor. Escucha los cuatro acordes y elige la armonía que falta en el <strong>compás 4</strong>.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Mayor • Compás aleatorio (1–4)</h5>
          <p>El signo de interrogación se desplaza por los compases 1 a 4. Aunque el compás 1 esté oculto, sigue visible una referencia de tónica (<strong>I</strong>).</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Menor • Objetivo: compás 4</h5>
          <p>Los mismos ejercicios en tonalidades menores reales (p. ej., <code>i–iv–V</code>): escucha tres compases de contexto e identifica la 4.ª función.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Menor • Compás aleatorio (1–4)</h5>
          <p>El compás oculto varía del 1 al 4; al menos una tónica menor (<strong>i</strong>) sigue visible en pantalla para orientar al oído.</p>
        </div>
      </div>

      <h3>Los 4 niveles de dificultad (mayor &amp; menor)</h3>
      <ul class="article-steps-list">
        <li><strong>Nivel 1 – Bases (I–V / i–V):</strong> Los cuatro pilares esenciales: <code>I, IV, V, vi</code> en mayor o <code>i, iv, V, VI</code> en menor.</li>
        <li><strong>Nivel 2 – Diatónico (ii–vi / ii°–VII):</strong> Todos los grados diatónicos principales (mayor con <code>ii</code> &amp; <code>iii</code>; menor con <code>ii°, III, v, V, VII</code>).</li>
        <li><strong>Nivel 3 – Ampliado (V/V / N6):</strong> Introduce <code>V7</code>, la dominante secundaria <code>V/V</code> y el acorde napolitano <code>N6</code> en menor.</li>
        <li><strong>Nivel 4 – Jazz &amp; tritono (bII7 / iiø7):</strong> Vocabulario completo hasta la sustitución tritonal <code>bII7</code> y el <code>ii–V</code> menor (<code>iiø7</code>).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Controles, solo escucha &amp; examen</h4>
        <p>En la parte superior de la escena, ajusta <strong>Tonalidad</strong> y <strong>Tempo (BPM)</strong>. Debajo, <strong>Tónica (I)</strong> / <strong>Tónica (i)</strong> y <strong>Volver a escuchar el acorde</strong> anclan tu oído; el botón <strong>Bucle</strong> repite de forma continua y <strong>Solo escucha</strong> pasa los ejercicios con revelación automática. Tras un error, <strong>Comparación A/B</strong> y <strong>Bajo / fundamental</strong> comparan tu elección con la solución, y el <strong>Examen de categoría</strong> pone a prueba mayor y menor juntos.</p>
      </div>
    `
  },
  interval: {
    tagClass: "tag-peach",
    tag: "Instrucciones • Intervalos",
    title: "Cómo funciona el entrenamiento de intervalos",
    lead: "Afina tu oído con distancias puras de dos notas: melódicas ascendentes, melódicas descendentes, armónicas simultáneas y sobre un colchón de cuerdas. En los modos melódicos y sobre colchón, la nota de partida cambia en cada pregunta dentro de un registro medio claro. (Para acordes &amp; inversiones, ¡ve al módulo <strong>Acordes</strong>!)",
    sections: `
      <h3>Los 4 tipos de ejercicio</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Intervalos melódicos (ascendentes)</h5>
          <p>Dos alturas se suceden hacia el agudo: el compás 1 da la nota de partida aleatoria (<code>Fa3–Mi4</code>) y el compás 2 te invita a nombrar el salto ascendente.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Intervalos melódicos (descendentes)</h5>
          <p>Dos alturas bajan una tras otra: el compás 1 parte de una nota aguda aleatoria (<code>Fa♯4–Fa5</code>) y el compás 2 pide la caída descendente: ¡un gran clásico de la formación auditiva!</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Intervalos armónicos</h5>
          <p>Las dos notas suenan juntas. Escucha la fusión o los batimientos; una vez resueltas, las tarjetas muestran las dos alturas (p. ej., <code>Do4 + Sol4</code> / <code>C4 + G4</code>).</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Intervalos sobre colchón de fundamental (cuerdas ➔ piano)</h5>
          <p>Un cálido <strong>colchón de cuerdas</strong> mantiene la fundamental de forma continua. Tras una breve pausa, el <strong>piano</strong> toca la nota objetivo por encima: ideal para sentir la tensión y el color de cada grado.</p>
        </div>
      </div>

      <h3>Dificultad de los intervalos (3 niveles)</h3>
      <ul class="article-steps-list">
        <li><strong>Nivel 1 – Principiante:</strong> Cuatro referencias imprescindibles (ascendentes o descendentes): unísono (<code>P1</code>), tercera mayor (<code>M3</code>), quinta justa (<code>P5</code>) y octava (<code>P8</code>).</li>
        <li><strong>Nivel 2 – Escala mayor:</strong> Los 8 intervalos diatónicos del unísono a la octava.</li>
        <li><strong>Nivel 3 – Cromático:</strong> Los 15 intervalos del unísono a la novena mayor (<code>M9</code>), incluidos todos los intervalos menores y el tritono.</li>
      </ul>

      <h3>Entender la notación abreviada de los intervalos</h3>
      <ul class="article-steps-list">
        <li><strong>Letra = especie (color), número = grado (<code>1</code>–<code>9</code>):</strong> El número cuenta los nombres de nota desde el punto de partida (<code>1</code> = unísono, <code>2</code> = segunda, <code>3</code> = tercera … hasta <code>9</code> = novena), mientras que la letra precisa el número exacto de semitonos.</li>
        <li><strong><code>P</code> = justo (<em>Perfect</em>):</strong> Se aplica al unísono (<code>P1</code>), la cuarta (<code>P4</code>), la quinta (<code>P5</code>) y la octava (<code>P8</code>). Estos intervalos no tienen variante mayor/menor: solo su forma «justa».</li>
        <li><strong><code>M</code> &amp; <code>m</code> (internacional) o <code>G</code> &amp; <code>k</code> (alemán):</strong> Se usan para las 2.as (<code>2</code>), 3.as (<code>3</code>), 6.as (<code>6</code>), 7.as (<code>7</code>) y 9.as (<code>9</code>):<br>
          – <strong><code>M</code> mayúscula</strong> (<em>Major</em>, en alemán <strong><code>G</code></strong> = <em>Groß</em>) designa el intervalo mayor, más amplio y luminoso (p. ej., <code>M3</code> / <code>G3</code> = tercera mayor, 4 semitonos).<br>
          – <strong><code>m</code> minúscula</strong> (<em>minor</em>, en alemán <strong><code>k</code></strong> = <em>klein</em>) es siempre <strong>un semitono más estrecho</strong>, más íntimo o tenso (p. ej., <code>m3</code> / <code>k3</code> = tercera menor, 3 semitonos). ¡Fíjate bien en la mayúscula o minúscula entre <code>m</code> y <code>M</code>: suenan muy distinto!</li>
        <li><strong><code>TT</code> = tritono:</strong> El punto medio eléctrico de 6 semitonos, justo entre <code>P4</code> y <code>P5</code>.</li>
      </ul>
      <p><em>Cambiar las abreviaturas:</em> Puedes alternar en cualquier momento entre <strong>Internacional (P / M / m)</strong> y <strong>Alemán (P / G / k)</strong> en <strong>Ajustes → Notación musical → Nombres de los intervalos</strong>.</p>

      <div class="article-highlight-box">
        <h4>Cantar, comparación A/B &amp; examen</h4>
        <p>Arriba, el botón <strong>Cantar</strong> (con <em>pausa para tararear</em> opcional) ayuda a tu voz a sentir la distancia. Abajo, <strong>Nota de partida</strong> repite la nota inicial; tras un error, la <strong>comparación A/B</strong> repite tu elección desde esa misma nota y en la misma dirección justo antes de la solución. Usa <strong>Bucle</strong> para repetir sin fin (o activa <strong>Siguiente automático</strong> en los Ajustes), <strong>Solo escucha</strong> para repasar de forma pasiva, y haz el <strong>Examen de categoría</strong> con los 4 tipos de intervalos.</p>
      </div>
    `
  },
  chords: {
    tagClass: "tag-sage",
    tag: "Instrucciones • Acordes",
    title: "Cómo funciona el entrenamiento de acordes",
    lead: "Desarrolla un reconocimiento instantáneo de los colores de los acordes, desgranados nota a nota (arpegios ascendentes o descendentes) o tocados en bloque, y localiza qué nota del acorde está en el bajo en las inversiones.",
    sections: `
      <h3>Los 4 tipos de ejercicio</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Arpegio de acorde (ascendente ↗)</h5>
          <p>Las notas del acorde suenan del grave al agudo para seguir con claridad cada tercera, quinta y séptima; una vez acertado, la app reúne las notas en un acorde plaqué completo.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Arpegio de acorde (descendente ↘)</h5>
          <p>El acorde se despliega de la nota más aguda hacia el bajo. Ideal para no depender del sentido de escucha habitual; tras tu respuesta, el acorde simultáneo revela la armonía completa.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Acordes (simultáneos)</h5>
          <p>De tres a cinco notas suenan de golpe. Escucha la claridad o la tensión global; una tarjeta resuelta se despliega en arpegio ascendente mostrando todas sus notas (p. ej., <code>Do4 · Mi4 · Sol4 · Si4</code>).</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Inversiones de acordes</h5>
          <p>Identifica qué nota lleva la voz del bajo abajo del todo: <code>Bajo: 1</code> (estado fundamental), <code>Bajo: 3</code> (1.ª inversión), <code>Bajo: 5</code> (2.ª inversión) o <code>Bajo: 7</code> (3.ª inversión). El bajo se mantiene centrado en un registro medio estable para que juzgues el color de la superposición y no la altura absoluta.</p>
        </div>
      </div>

      <h3>Dificultad – tipos de acorde (4 niveles)</h3>
      <ul class="article-steps-list">
        <li><strong>Nivel 1 – Tríadas básicas:</strong> Las cuatro tríadas esenciales: mayor (<code>maj</code>), menor (<code>m</code>), disminuida (<code>dim</code>) y aumentada (<code>aug</code>).</li>
        <li><strong>Nivel 2 – 7.as &amp; sus:</strong> Añade cuarta suspendida (<code>sus4</code>), séptima de dominante (<code>7</code>), séptima mayor (<code>maj7</code>) y menor 7 (<code>m7</code>).</li>
        <li><strong>Nivel 3 – 7.as ampliadas:</strong> Añade <code>sus2</code>, semidisminuido (<code>m7♭5</code>), disminuido 7 (<code>°7</code>) y menor-mayor 7 (<code>m(maj7)</code>).</li>
        <li><strong>Nivel 4 – Jazz &amp; tensiones:</strong> Los 15 colores de acorde, incluidas extensiones de jazz como <code>maj9</code>, <code>7♭9</code> y <code>7♯9</code>.</li>
      </ul>

      <h3>Dificultad – inversiones (3 niveles)</h3>
      <ul class="article-steps-list">
        <li><strong>Nivel 1 – Tríada mayor (3):</strong> Estado fundamental (<code>Bajo: 1</code>), 1.ª inversión (<code>Bajo: 3</code>) y 2.ª inversión (<code>Bajo: 5</code>).</li>
        <li><strong>Nivel 2 – Mayor &amp; menor (3):</strong> Las tres posiciones de tríada mezcladas entre acordes mayores luminosos y menores profundos.</li>
        <li><strong>Nivel 3 – Acordes de 7.ª (4):</strong> Acordes de cuatro notas (<code>7</code>, <code>maj7</code>, <code>m7</code>) que introducen la 3.ª inversión con la séptima en el bajo (<code>Bajo: 7</code>).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Consejos de entrenamiento</h4>
        <p><strong>Fundamental</strong> repite la fundamental del acorde en cualquier momento; tras un error, la <strong>comparación A/B</strong> repite tu propuesta sobre la misma fundamental justo antes de la respuesta correcta, y en las inversiones <strong>Escuchar el bajo</strong> aísla la nota más grave. Activa también <strong>Bucle</strong>, <strong>Solo escucha</strong> y el <strong>Examen</strong> de 4 niveles.</p>
      </div>
    `
  },
  melody: {
    tagClass: "tag-lilac",
    tag: "Instrucciones • Melodías",
    title: "Cómo funciona el entrenamiento melódico",
    lead: "Une tu oído de solfeo al sentido del ritmo directamente sobre un auténtico pentagrama de 5 líneas: una cadencia de 4 acordes da paso a 1 compás de cuenta previa y a una frase de 4 a 6 notas.",
    sections: `
      <h3>Desarrollo de una ronda</h3>
      <ul class="article-steps-list">
        <li><strong>1. Cadencia, cuenta previa &amp; pentagrama real:</strong> Una progresión de anclaje (<code>I – vi – IV – V</code>) fija la tonalidad, seguida de un compás de cuenta previa en <code>4/4</code> o <code>3/4</code> antes de 4 a 6 notas (corcheas, negras, negras con puntillo, blancas y silencios) que se muestran directamente en el pentagrama.</li>
        <li><strong>2. Tres estilos a elegir:</strong> En la página de selección, elige <strong>Melodía rítmica</strong> (las duraciones ya se muestran en el pentagrama para concentrarte en la altura), <strong>Dictado combinado</strong> (encuentra la altura en el teclado <em>y</em> la figura rítmica <code>1/8</code>, <code>1/4</code>, <code>1/4.</code>, <code>1/2</code> debajo, en cualquier orden) o <strong>Regular (bases)</strong> (4 blancas regulares para empezar).</li>
        <li><strong>3. Resolución paso a paso en el pentagrama:</strong> En cuanto se valida una nota, su nombre (<code>Do–Ti</code> o número de grado <code>1–7</code>) aparece bajo el pentagrama y el cursor pasa al siguiente signo de interrogación.</li>
        <li><strong>4. Volver a escuchar &amp; tocar las notas directamente:</strong> Toca <strong>▶ Escuchar</strong> para oír de nuevo toda la frase sin perder tu progreso. <strong>Repetir</strong> (o tocar directamente una nota ya resuelta o activa en el pentagrama) aísla esa nota con una breve referencia rítmica.</li>
      </ul>

      <h3>Niveles, tonalidades &amp; controles</h3>
      <ul class="article-steps-list">
        <li><strong>Nivel 1 – Do–Fa:</strong> Frases de 4 a 5 notas del tetracordo inferior (<code>Do, Re, Mi, Fa</code>).</li>
        <li><strong>Nivel 2 – Sol–Do:</strong> Frases de 4 a 6 notas sobre la mitad superior (<code>Sol, La, Ti, Do</code>).</li>
        <li><strong>Nivel 3 – Tonalidad completa:</strong> Los siete grados (<code>Do</code> a <code>Do</code>) en 4 a 6 notas.</li>
        <li><strong>Tonalidades, octavas &amp; ayudas:</strong> Practica en <code>Do mayor</code> o en tonalidades aleatorias, en 1 o varias octavas. Arriba, ajusta <strong>Tonalidad</strong>, <strong>Pulso: sí/no</strong> y <strong>Tempo (BPM)</strong>; abajo están <strong>Tónica (Do)</strong>, <strong>Siguiente automático</strong> (a la izquierda), <strong>Solo escucha</strong> y el <strong>Examen</strong> de 5 niveles.</li>
      </ul>
    `
  },
  solfege: {
    tagClass: "tag-sage",
    tag: "Instrucciones • Solfeo",
    title: "Cómo funciona el solfeo relativo (Do móvil)",
    lead: "El solfeo relativo (Do móvil) forja el oído relativo: aprendes a reconocer cada uno de los 7 grados (Do–Ti o 1–7) por su tensión característica y su atracción dentro de la tonalidad.",
    sections: `
      <h3>Cada ronda sigue 4 pasos claros</h3>
      <ul class="article-steps-list">
        <li><strong>1. Cadencia de contexto:</strong> Una breve progresión (<code>I – vi – IV – V</code>) afina tu oído con claridad sobre el centro tonal.</li>
        <li><strong>2. Nota objetivo:</strong> Tras un instante, oyes un único grado aislado de esa tonalidad.</li>
        <li><strong>3. Responder en el teclado:</strong> Solo las teclas de la escala muestran su referencia (<em>Do–Re–Mi–Fa–Sol–La–Ti–Do</em> o, como opción, los <em>números 1–7</em>), rodeadas de una tecla de margen a cada lado; las demás teclas quedan atenuadas.</li>
        <li><strong>4. Errores silenciosos &amp; resolución natural:</strong> Una tecla equivocada parpadea discretamente en rojo sin sonido para preservar tu memoria tonal. La tecla correcta se ilumina en verde y toca su resolución hacia la tónica (<code>Do–Fa</code> hacia abajo, <code>Sol–Ti</code> hacia arriba).</li>
      </ul>

      <h3>Los 6 niveles de dificultad</h3>
      <ul class="article-steps-list">
        <li><strong>Niveles 1 &amp; 2 (1 octava):</strong> El nivel 1 se queda fijo en <code>Do mayor</code>; el nivel 2 elige una tonalidad aleatoria para toda la sesión.</li>
        <li><strong>Niveles 3 &amp; 4 (varias octavas):</strong> Los grados objetivo saltan a octavas graves o agudas, ya sea en <code>Do mayor</code> fijo (nivel 3) o en una tonalidad aleatoria fija (nivel 4).</li>
        <li><strong>Niveles 5 &amp; 6 (modulaciones):</strong> Cada respuesta correcta modula a una tonalidad completamente nueva: primero en 1 octava (nivel 5) y luego en varias octavas (nivel 6).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Ayudas, cantar &amp; etiquetas</h4>
        <p>Arriba, <strong>Cantar</strong> (con <em>pausa para tararear</em> opcional) te invita a cantar hasta el Do / 1, junto al ajuste de <strong>Tempo (BPM)</strong>. Encima del teclado están la <strong>insignia de tonalidad</strong> (toca el acorde de tónica), <strong>Tónica (Do)</strong> y <strong>Repetir</strong>. Abajo, el botón violeta <strong>Bucle</strong> repite la nota cada 3 segundos y <strong>Solo escucha</strong> resuelve automáticamente. Alterna entre <strong>Sílabas (Do–Ti)</strong> y <strong>Números (1–7)</strong> o activa <strong>Siguiente automático</strong> en los <strong>Ajustes</strong>.</p>
      </div>
    `
  },
  rhythm: {
    tagClass: "tag-sage",
    tag: "Instrucciones • Ritmo",
    title: "Cómo funciona el entrenamiento rítmico",
    lead: "Cuatro módulos complementarios trabajan compases, dictado rítmico, toque de oído &amp; lectura rítmica a primera vista, y microtiming de groove, mostrados en un pentagrama de una línea y ajustables por tempo (BPM).",
    sections: `
      <h3>Los 4 módulos de ritmo</h3>
      <ul class="article-steps-list">
        <li><strong>1. Compás &amp; cifrado (3 niveles):</strong> Escucha dos compases de percusión (tiempo <code>1</code> acentuado) y distingue <code>4/4</code> &amp; <code>3/4</code> (nivel 1), <code>2/4</code> &amp; <code>6/8</code> (nivel 2) y los compases irregulares <code>5/4</code> &amp; <code>7/8</code> (nivel 3). <strong>Pulso de negra</strong> da la referencia neutra en cualquier momento.</li>
        <li><strong>2. Dictado rítmico (4 tiempos, 4 niveles):</strong> En el pentagrama de una línea suena un patrón de 4 tiempos en las claves tras 1 compás de cuenta previa. Rellena cada tiempo paso a paso (negras, corcheas, silencios, contratiempos, tresillos, semicorcheas y síncopas) con <strong>Metrónomo (1–4)</strong>, <strong>Repetir el tiempo</strong> (o tocando una tarjeta) y <strong>Siguiente automático</strong>.</li>
        <li><strong>3. Pad: reproducir &amp; tocar a primera vista (4 niveles cada uno):</strong> En el modo <strong>Reproducir en el pad</strong>, escucha la cuenta previa + la demo y luego toca sobre el gran <strong>pad de toque</strong> (o <code>Espacio</code>), con <strong>Clic: sí/no</strong>, <strong>Solo escucha</strong> y, en el nivel 4, el <em>modo a ciegas</em>. En el modo <strong>Tocar ritmos a primera vista</strong> no hay demo previa: lee el patrón directamente en el pentagrama y toca con el metrónomo en cuanto termine la cuenta previa (nivel 4: <em>sin metrónomo</em>). Después, una <strong>línea de tiempo</strong> evalúa cada toque (<code>exacto</code>, <code>justo ±ms</code>, <code>fallado</code>, <code>de más</code>).</li>
        <li><strong>4. Groove, contratiempo &amp; microtiming (4 niveles):</strong> Nivel 1: <em>estilos de groove</em> (marcha, backbeat, síncopa, swing, 3 contra 2); nivel 2: <em>acento de cencerro</em> a contratiempo (<code>1</code>–<code>4+</code>); nivel 3: <em>microtiming (±55 ms)</em> y nivel 4: <em>microtiming pro (±28 ms)</em> (por delante, in the pocket o laid-back).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Consejos &amp; examen de categoría</h4>
        <p>Empieza <strong>Reproducir en el pad</strong> con el <strong>clic activado</strong> hacia 80–95 BPM y activa <strong>Siguiente automático</strong> abajo a la izquierda si quieres. Cuando tu pulso sea sólido, acepta el reto del <strong>modo a ciegas</strong>, de la <strong>lectura rítmica sin metrónomo</strong>, de <strong>Solo escucha</strong> o del <strong>Examen</strong> de 4 niveles.</p>
      </div>
    `
  },
  production: {
    tagClass: "tag-lilac",
    tag: "Instrucciones • Producción & mezcla",
    title: "Cómo funciona el entrenamiento de frecuencias & ecualización",
    lead: "Calibra tus oídos de mezcla con las bandas de estudio estándar: empezando por sinusoides puras en 5 a 12 bandas hasta un realce paramétrico en directo sobre ruido rosa.",
    sections: `
      <h3>Los 2 módulos de producción</h3>
      <ul class="article-steps-list">
        <li><strong>1. Reconocer frecuencias puras (seno, 3 niveles):</strong> Escucha un tono puro calibrado de los subgraves (<code>63 Hz</code>) a los agudos de aire (<code>12 kHz</code>) en <strong>5 bandas</strong>, <strong>8 bandas de octava</strong> o <strong>12 bandas</strong>. Toca <strong>«Ref.: 1 kHz»</strong> para recalibrar tu oído en cualquier momento.</li>
        <li><strong>2. Realce de EQ sobre ruido rosa (3 niveles):</strong> En la <strong>práctica libre</strong>, el ruido rosa arranca directamente de forma continua <strong>con el realce de EQ activo</strong> (nivel 1: EQ amplio <code>+10 dB / Q 1,6</code>, nivel 2: EQ de octava <code>+8,5 dB / Q 2,6</code>, nivel 3: quirúrgico <code>+7 dB / Q 4,2</code>). Cambia libremente al ruido neutro sin procesar con la tarjeta <strong>Flat</strong> o el botón <strong>«Bypass Flat»</strong> (<code>Flat: SÍ</code>). En el modo <strong>Solo escucha</strong>, oyes primero ruido <em>Flat</em> y luego, durante más tiempo, el <em>realce de EQ</em> antes de que se muestre la banda correcta.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Protección auditiva, comparación &amp; examen</h4>
        <p>El ruido rosa decrece 3 dB por octava para equilibrar la energía percibida. Un limitador a -14 dBFS, una ponderación hacia 2–4 kHz y fundidos suaves protegen tus oídos. Tras un error, la <strong>comparación A/B</strong> y <strong>Flat → EQ objetivo</strong> comparan ambas señales, y los 3 niveles forman parte del <strong>Examen de categoría</strong>.</p>
      </div>
    `
  },
  modes: {
    tagClass: "tag-peach",
    tag: "Instrucciones • Escalas & modos",
    title: "Cómo funciona el entrenamiento de escalas & modos",
    lead: "Olvida la memorización abstracta: escucha cada modo con todo su color musical, sobre una misma fundamental o transpuesto a otras tonalidades, con un colchón de cuerdas en la fundamental que puedes activar.",
    sections: `
      <h3>Los 3 módulos modales</h3>
      <ul class="article-steps-list">
        <li><strong>1. Reconocer la escala / el modo (3 niveles):</strong> Primero suena una <strong>quinta de anclaje</strong> neutra (sin tercera), seguida de la escala ascendente de 8 notas: 4 modos básicos en el nivel 1 (<code>jónico, eólico, dórico, mixolidio</code>), los 7 en <code>Do</code> en el nivel 2 y los 7 transpuestos en el nivel 3.</li>
        <li><strong>2. Nota característica &amp; color (3 niveles):</strong> Tras la quinta de anclaje, un breve giro aísla el grado distintivo (<code>#4</code> lidio, <code>b7</code> mixolidio, <code>♮6</code> dórico, <code>b2</code> frigio o la sensible <code>#7</code> de la <strong>menor armónica</strong>), separado en modos mayores (nivel 1), menores (nivel 2) y todos + menor armónica sobre fundamentales variadas (nivel 3).</li>
        <li><strong>3. Cadencias &amp; bucles de acordes modales (2 niveles):</strong> Encadenamientos característicos de dos acordes (<code>i – IV</code> dórico, <code>I – bVII</code> mixolidio, <code>I – II</code> lidio, <code>i – bII</code> frigio): 4 bucles estándar en <code>Do</code> (nivel 1) y luego los 6 bucles modales transpuestos (nivel 2). Un bucle de acordes son dos acordes que se alternan una y otra vez y hacen audible el color del modo.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Colchón de fundamental, quinta de anclaje &amp; A/B</h4>
        <p>Piensa en paralelo y no en relativo: compara cada modo sobre la <strong>misma fundamental</strong>. El botón <strong>«Colchón de fundamental: sí/no»</strong> añade un colchón de cuerdas continuo bajo el modo; toca <strong>«Quinta de anclaje»</strong> (o la tarjeta de la izquierda) en cualquier momento y compara directamente dos colores tras un error con la <strong>comparación A/B</strong>. <strong>Bucle</strong>, <strong>Solo escucha</strong> y el <strong>Examen</strong> de 3 niveles están incluidos.</p>
      </div>
    `
  },
  warmup: {
    tagClass: "tag-sage",
    tag: "Instrucciones • Calentamiento vocal",
    title: "Cómo funciona el calentamiento vocal guiado",
    lead: "Pensado para ensayos de coro, clases de canto y rutinas diarias: elige entre 5 tesituras (SATB) y lanza uno de los 4 programas guiados, con esfera de respiración, teclado interactivo y transposición instantánea.",
    sections: `
      <h3>4 programas a elegir &amp; 4 fases</h3>
      <ul class="article-steps-list">
        <li><strong>4 programas adaptados:</strong> Según tu tiempo, lanza el <strong>Calentamiento completo (5 min)</strong> (4 fases, 9 ejercicios), el <strong>Calentamiento exprés (~3 min)</strong>, <strong>Arpegios &amp; paso de registros</strong> o <strong>Respiración coral &amp; afinación</strong>.</li>
        <li><strong>Fase 1 – Respiración &amp; cuerpo:</strong> Una esfera de respiración sobre <code>ffff / ssss</code> y suaves impulsos (<code>P – T – K</code>) despiertan el apoyo abdominal sin tensión en la laringe.</li>
        <li><strong>Fase 2 – Resonancia &amp; colocación:</strong> Boca cerrada / vibración de labios (<code>Mmm / Brrr</code>) y suspiros descendentes de quinta (<code>5–4–3–2–1</code>) unen suavemente los registros.</li>
        <li><strong>Fases 3 &amp; 4 – Arpegios, vocales &amp; coro:</strong> Arpegios que modulan por semitonos adaptados a <strong>coro medio, soprano, contralto, tenor o bajo</strong>, seguidos del deslizamiento vocálico (<code>U → O → A → E → I</code>) y de un acorde SATB apilado.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Controles en directo &amp; teclado</h4>
        <p>Arriba, cambia en cualquier momento <strong>Tesitura (SATB)</strong>, <strong>Sonido de acompañamiento</strong> (piano, piano + voz o voz) y <strong>Tempo</strong>, o navega entre pasos con las <strong>pastillas de fase</strong>. Abajo, ajusta con <strong>«−1 / +1 semitono»</strong> y <strong>«Repetir»</strong>, o toca directamente notas de referencia en el <strong>teclado interactivo</strong>.</p>
      </div>
    `
  },
  notation: {
    tagClass: "tag-sage",
    tag: "Instrucciones • Notación & lectura de notas",
    title: "Cómo funciona el entrenamiento de lectura de notas",
    lead: "Desarrolla una lectura a primera vista fluida en 6 modos: claves de Sol, Fa y Do en 3.ª (contralto), mezcla de claves, gran pentagrama de piano a dos pentagramas y lectura de acordes (con inversiones &amp; séptimas).",
    sections: `
      <h3>Los 6 modos &amp; la entrada</h3>
      <ul class="article-steps-list">
        <li><strong>1. Lectura de notas sueltas (flujo de 6 notas):</strong> En clave de <strong>Sol</strong>, <strong>Fa</strong>, <strong>Do en 3.ª</strong>, en <strong>mezcla de claves</strong> (alterna cada 3 notas con aviso) o en el <strong>gran pentagrama</strong> (Sol + Fa unidos por una llave), la franja de color de la izquierda indica la nota que hay que tocar en el teclado para que avance la fila.</li>
        <li><strong>2. Leer acordes (5 acordes, opción múltiple):</strong> Se muestran en el pentagrama tríadas y acordes de séptima apilados. Elige la <strong>ficha de símbolo</strong> correcta (p. ej., <code>E, Em, E7, Esus4</code>) en <strong>4 niveles</strong>: nivel 1 (tríadas en Sol), nivel 2 (tríadas en Fa), nivel 3 (inversiones en ambas claves) y nivel 4 (todos los tipos &amp; séptimas).</li>
        <li><strong>3. Errores &amp; botón Saltar:</strong> Una tecla o ficha equivocada se ilumina en rojo y pausa la fila para comprobar con calma la clave, la alteración o la inversión. Toca <strong>Saltar</strong> para ver la respuesta y continuar.</li>
      </ul>

      <h3>Niveles &amp; armaduras</h3>
      <ul class="article-steps-list">
        <li><strong>Notas sueltas, niveles 1–4:</strong> Nivel 1 (5 líneas &amp; 4 espacios), nivel 2 (<code>±2 líneas adicionales</code>), nivel 3 (<code>±3 líneas adicionales</code>) y nivel 4 con sostenidos/bemoles (<code>♯</code>/<code>♭</code>) o <strong>becuadros (<code>♮</code>)</strong> cuando hay una armadura activa, en notación internacional o alemana.</li>
        <li><strong>Lectura con armaduras (1–6 ♯/♭):</strong> Selecciona una tonalidad concreta o un grupo rotativo (fácil, intermedio, todas) en la página de notación o mediante <strong>Tonalidad</strong> durante el ejercicio.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Controles de audio, solo escucha &amp; examen</h4>
        <p>Encima de las respuestas, <strong>Sonido de nota: sí/no</strong> silencia por completo el audio para leer a primera vista en silencio. Abajo, <strong>▶ Escuchar la nota</strong> / <strong>▶ Escuchar el acorde</strong> da una referencia opcional en la práctica libre, mientras que en el <strong>Examen de categoría</strong> (6 niveles) el botón pasa a ser <strong>▶ Referencia</strong> (<code>Sol4</code> / <code>Fa3</code> / <code>Do4</code>) para no revelar la solución. A la derecha, <strong>Solo escucha</strong> avanza con lectura automática según el <strong>Tempo</strong> elegido (de <em>muy lento</em> a <em>muy rápido</em>).</p>
      </div>
    `
  }
};

function renderRhythmReferenceHTML_ES() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Pulso &amp; compases</span>
        <span class="k-ratio-chip">Cifrado de compás</span>
      </div>
      <h4>Lo que estructura cada pieza en el tiempo</h4>
      <p>
        Casi toda la música respira gracias a un latido regular llamado <strong>pulso (o tiempo)</strong>. Su velocidad se mide en <strong>BPM</strong> (<em>pulsaciones por minuto</em>). El <strong>compás</strong> agrupa esos tiempos en ciclos regulares, especialmente perceptibles en el <strong>primer tiempo (tiempo fuerte)</strong>.
      </p>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Compás de 4/4 (cuatro tiempos)</strong>
          <span>Cuatro negras por compás (<strong>1</strong>–2–3–4). El pilar de casi todo el pop, el rock, el hip-hop y el funk.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Compás de 3/4 (vals)</strong>
          <span>Tres negras por compás (<strong>1</strong>–2–3). Un balanceo giratorio (<em>El Danubio azul</em>, <em>Cumpleaños feliz</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Compás de 6/8 (binario compuesto)</strong>
          <span>Seis corcheas agrupadas en dos grandes tiempos ternarios (<strong>1</strong>-2-3-<strong>4</strong>-5-6): el impulso ondulante de las baladas (<em>Nothing Else Matters</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Compás de 5/4 (compás asimétrico)</strong>
          <span>Agrupación asimétrica 3 + 2 (o 2 + 3), famosa gracias a <em>Take Five</em> de Dave Brubeck o al tema de <em>Misión: Imposible</em>.</span>
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="meter-4-4">▶ 4/4 estándar</button>
        <button class="btn-tool" data-play-rhythm="meter-3-4">▶ 3/4 vals</button>
        <button class="btn-tool" data-play-rhythm="meter-6-8">▶ 6/8 ternario</button>
        <button class="btn-tool" data-play-rhythm="meter-5-4">▶ 5/4 asimétrico (3+2)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Figuras &amp; subdivisiones</span>
        <span class="k-ratio-chip">1 · 2 · 3 · 4</span>
      </div>
      <h4>Cómo se divide cada pulsación</h4>
      <p>
        Mientras el bombo ancla el pulso principal, los músicos dividen cada tiempo en fragmentos más finos (<strong>subdivisiones</strong>). Añadir un <strong>puntillo</strong> tras una nota prolonga su duración la mitad, creando ese salto característico «larga-corta».
      </p>
      <ul class="k-physics-list">
        <li><strong>Redondas &amp; blancas:</strong> Notas largas que cubren 4 tiempos o 2 tiempos, respectivamente.</li>
        <li><strong>Negras:</strong> Un golpe exactamente en cada tiempo principal (<em>1 – 2 – 3 – 4</em>).</li>
        <li><strong>Corcheas:</strong> Dos golpes iguales por tiempo (<em>1-y – 2-y</em>).</li>
        <li><strong>Tresillos:</strong> Tres notas regulares dentro de un solo tiempo (<em>1-tre-si-llo</em> / <em>1-2-3 – 2-2-3</em>).</li>
        <li><strong>Semicorcheas:</strong> Cuatro golpes nerviosos por tiempo (<em>1-i-y-a</em>): el motor de los grooves de funk y de los charles del trap.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="sub-quarter">▶ Negras (1×)</button>
        <button class="btn-tool" data-play-rhythm="sub-eighth">▶ Corcheas (2×)</button>
        <button class="btn-tool" data-play-rhythm="sub-triplet">▶ Tresillos (3×)</button>
        <button class="btn-tool" data-play-rhythm="sub-sixteenth">▶ Semicorcheas (4×)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Groove, backbeat &amp; swing</span>
        <span class="k-ratio-chip">Tiempo vs. contratiempo</span>
      </div>
      <h4>Por qué un mismo compás de 4/4 cambia totalmente de alma</h4>
      <p>
        Que un ritmo marche al paso o haga mover la cabeza sin remedio depende por completo de dónde caen los acentos:
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Marcha vs. backbeat (2 &amp; 4)</h5>
          <p>Acentuar los tiempos <strong>1 &amp; 3</strong> suena a banda de música. Pasa el golpe de caja a <strong>2 &amp; 4</strong> (el <em>backbeat</em>) ¡y al instante nacen el pop, el rock y el soul!</p>
          <button class="btn-tool" data-play-rhythm="beat-march">▶ Marcha (1 &amp; 3)</button>
          <button class="btn-tool" data-play-rhythm="beat-backbeat">▶ Backbeat (2 &amp; 4)</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Síncopa &amp; swing / shuffle</h5>
          <p>La <strong>síncopa</strong> desplaza el acento a los contratiempos débiles («y»). En el <strong>swing</strong>, las corcheas rebotan de forma desigual (aproximadamente 2:1 en tresillo en lugar de un 1:1 binario recto).</p>
          <button class="btn-tool" data-play-rhythm="beat-syncopation">▶ Groove sincopado</button>
          <button class="btn-tool" data-play-rhythm="beat-swing">▶ Sensación de swing</button>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Polirritmia &amp; referencias famosas</span>
        <span class="k-ratio-chip">3 contra 2</span>
      </div>
      <h4>Dos relojes simultáneos + canciones de referencia inolvidables</h4>
      <p>
        La <strong>polirritmia</strong> superpone a la vez dos rejillas de pulso contrastadas; la más famosa es el <strong>3 contra 2</strong> (el woodblock divide el compás en 3 mientras el bombo da 2 golpes regulares en el mismo intervalo). Recuerda Física &amp; sonido: en altura, esa misma proporción <code>3:2</code> da la quinta justa.
      </p>
      <div class="k-meta-box">
        <strong>Asociar los compases a éxitos inolvidables:</strong>
        <ul class="k-physics-list" style="margin-top:0.25rem;">
          <li><strong>4/4:</strong> «We Will Rock You» (Queen) • «Billie Jean» (Michael Jackson)</li>
          <li><strong>3/4:</strong> «Piano Man» (Billy Joel) • vals vienés clásico</li>
          <li><strong>6/8:</strong> «Nothing Else Matters» (Metallica) • «We Are the Champions» (Queen)</li>
          <li><strong>5/4:</strong> «Take Five» (Dave Brubeck) • «Misión: Imposible»</li>
        </ul>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="poly-3-2">▶ Escuchar la polirritmia «3 contra 2»</button>
      </div>
    </article>
  `;
}

const RHYTHM_INSTRUMENTS_DATA_ES = [
  {
    category: "drumset",
    tag: "Batería • Base grave",
    tagClass: "tag-peach",
    name: "Bombo / kick",
    role: "Peso e impacto en el grave (~50–120 Hz)",
    desc: "El tambor más grande de la batería, accionado con el pie mediante un pedal. Ancla los tiempos pesados (a menudo 1 y 3, o las cuatro negras regulares en la música electrónica) y se engancha con el bajo.",
    rhythmKey: "inst-kick",
    btnLabel: "Escuchar el bombo"
  },
  {
    category: "drumset",
    tag: "Batería • Chasquido del backbeat",
    tagClass: "tag-peach",
    name: "Caja (snare)",
    role: "Acento seco en los tiempos 2 y 4",
    desc: "Una bordonera metálica tensada bajo el parche resonante vibra con cada golpe, produciendo el chasquido incisivo del pop/rock, las sutiles ghost notes y los redobles cerrados.",
    rhythmKey: "inst-snare",
    btnLabel: "Escuchar caja y redoble"
  },
  {
    category: "drumset",
    tag: "Batería • Subdivisiones",
    tagClass: "tag-peach",
    name: "Charles (hi-hat) & platos (ride / crash)",
    role: "Precisión del flujo y puntuación de la estructura",
    desc: "Dos platos accionados con el pie (charles) dividen corcheas o semicorcheas con soltura. El gran plato ride lleva el swing del jazz, mientras que los platos crash marcan la entrada del estribillo.",
    rhythmKey: "inst-hat",
    btnLabel: "Escuchar la subdivisión del charles"
  },
  {
    category: "drumset",
    tag: "Batería • Breaks melódicos",
    tagClass: "tag-peach",
    name: "Toms (toms agudos & tom de base)",
    role: "Transiciones, breaks y bajadas en cascada",
    desc: "Tambores afinados sin bordonera inferior. Ordenados del agudo al grave, recorren la batería para anunciar la llegada del estribillo.",
    rhythmKey: "inst-toms",
    btnLabel: "Escuchar un break de toms"
  },
  {
    category: "world",
    tag: "Percusión de mano • Versátil",
    tagClass: "tag-lilac",
    name: "Cajón (cajón peruano)",
    role: "Minibatería acústica portátil",
    desc: "Originaria del Perú, esta caja de madera sobre la que uno se sienta produce un bajo profundo en el centro y un chasquido de caja gracias a las cuerdas internas situadas bajo el borde superior."
  },
  {
    category: "world",
    tag: "Percusión de mano • Latina & pop",
    tagClass: "tag-lilac",
    name: "Congas & bongós",
    role: "Grooves cantables y adornos chispeantes",
    desc: "Grandes tambores afrocubanos que se tocan por parejas. Las congas despliegan tumbaos cálidos y cantables mientras los pequeños bongós brillan por encima con sus ataques restallantes.",
    rhythmKey: "inst-conga",
    btnLabel: "Escuchar un tumbao de congas"
  },
  {
    category: "world",
    tag: "Manos & orquesta sinfónica",
    tagClass: "tag-lilac",
    name: "Djembé, darbuka & timbales de orquesta",
    role: "Dinámica del susurro al trueno",
    desc: "Los tambores de copa como el djembé de África occidental unen bajos redondos y palmadas cortantes. En la orquesta sinfónica, los timbales afinados con pedal aportan una altura precisa a los golpes de trueno."
  },
  {
    category: "small",
    tag: "Referencia temporal • Madera",
    tagClass: "tag-sage",
    name: "Claves & woodblock",
    role: "Brújula rítmica de precisión quirúrgica",
    desc: "Dos palitos de madera dura que se golpean entre sí. Aunque caben en una mano, su ataque seco atraviesa toda una big band, formando el armazón de la clave de son 3–2 en la salsa y las músicas latinas.",
    rhythmKey: "inst-clave",
    btnLabel: "Escuchar la clave de son 3–2"
  },
  {
    category: "small",
    tag: "Pequeña percusión • Movimiento",
    tagClass: "tag-sage",
    name: "Shaker, maracas & pandereta",
    role: "Impulso hacia delante y textura aérea",
    desc: "Los shakers llenos de bolitas tejen un flujo continuo de semicorcheas que une bombo y caja, inyectando un impulso inmediato incluso en tempos lentos.",
    rhythmKey: "inst-shaker",
    btnLabel: "Escuchar la alfombra de shaker"
  },
  {
    category: "small",
    tag: "Pequeña percusión • Metal",
    tagClass: "tag-sage",
    name: "Cencerro (cowbell), agogó & triángulo",
    role: "Contratiempos penetrantes y acentos brillantes",
    desc: "Voces metálicas incisivas, adoradas en el funk, la música disco y las músicas afrolatinas, como el diálogo a dos alturas de las campanas agogó.",
    rhythmKey: "inst-cowbell",
    btnLabel: "Escuchar el riff de cencerro"
  },
  {
    category: "small",
    tag: "¡Nunca hay que subestimarlo!",
    tagClass: "tag-sage",
    name: "Bajo eléctrico, contrabajo & guitarra rítmica",
    role: "El puente entre ritmo y armonía",
    desc: "¡El groove no depende solo del batería! Bombo y bajo forman el motor de la sección rítmica, mientras que los rasgueos apagados de guitarra o de clavinet funcionan como una verdadera percusión melódica."
  }
];

function renderRhythmInstrumentsHTML_ES(filterCat = "all") {
  const ensembleCard = `
    <div class="article-highlight-box" style="margin-bottom:0.2rem;">
      <h4>Cómo se reparten las percusiones un mismo groove (reparto de frecuencias):</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-dark); line-height:1.4;">
        Cada instrumento ocupa su propia banda sonora para mantener un groove nítido: el <strong>bombo</strong> abajo del todo, la <strong>caja</strong> que restalla en los medios, el <strong>charles &amp; shaker</strong> que brillan arriba.
      </p>
      <div class="k-btn-row" style="margin-top:0.35rem;">
        <button class="btn-tool" data-play-rhythm="band-groove">▶ Groove de conjunto (kick + snare + charles + shaker)</button>
      </div>
    </div>
  `;

  const items = RHYTHM_INSTRUMENTS_DATA_ES.filter(item => filterCat === "all" || item.category === filterCat);
  return (filterCat === "all" ? ensembleCard : "") + items.map(item => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${item.tagClass}">${item.tag}</span>
        <span class="k-ratio-chip">${item.role.split("(")[0].trim()}</span>
      </div>
      <h4>${item.name}</h4>
      <p><strong>Función:</strong> ${item.role}</p>
      <p>${item.desc}</p>
      ${item.rhythmKey ? `
        <div class="k-btn-row">
          <button class="btn-tool" data-play-rhythm="${item.rhythmKey}">▶ ${item.btnLabel}</button>
        </div>
      ` : ""}
    </article>
  `).join("");
}

function renderVocalsReferenceHTML_ES() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">La voz humana</span>
        <span class="k-ratio-chip">El primer instrumento</span>
      </div>
      <h4>Cómo produce el sonido la voz humana</h4>
      <p>Tu voz reúne tres sistemas acústicos completos en un solo instrumento vivo. A diferencia de una guitarra o una flauta, su «caja de resonancia» se transforma en pocos milisegundos, esculpiendo a la vez altura, potencia, armónicos, vocales y consonantes.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>1. La fuente de energía (respiración &amp; apoyo)</strong>
          Al inspirar, el <em>diafragma</em> desciende para abrir los pulmones. Al cantar, los abdominales y los intercostales regulan una <em>presión subglótica</em> constante («apoyo de la respiración») sin apretar nunca la garganta.
        </div>
        <div class="physics-fact-item">
          <strong>2. El vibrador (laringe &amp; cuerdas vocales)</strong>
          En la laringe se extienden dos <em>pliegues vocales</em> elásticos. El flujo de aire los atrae uno contra otro y luego los separa a un ritmo constante (de 100 a 1000 veces por segundo mediante el <em>efecto Bernoulli</em>), produciendo un timbre bruto rico en armónicos.
        </div>
        <div class="physics-fact-item">
          <strong>3. El resonador (tracto vocal &amp; formantes)</strong>
          La garganta, la boca y las fosas nasales filtran ese sonido bruto. Mover la lengua, la mandíbula, los labios y el velo del paladar desplaza unos picos de resonancia llamados <em>formantes</em>, que transforman una «U» redonda en una «I» brillante.
        </div>
        <div class="physics-fact-item">
          <strong>4. El formante del cantante (~3000 Hz)</strong>
          Al ensanchar la faringe inferior, los cantantes líricos concentran la energía hacia los 2,8–3,2 kHz, justo donde el espectro de la orquesta se ahueca. ¡Así una voz sin micrófono puede sobresalir por encima de 80 instrumentos!
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C4,E4,G4,C5" data-dur="1.9" data-step="0">▶ Escuchar un acorde coral</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Registros &amp; técnicas</span>
        <span class="k-ratio-chip">Colores vocales</span>
      </div>
      <h4>Registros vocales &amp; técnicas de canto</h4>
      <p>Según los músculos laríngeos que intervienen, y según vibren las cuerdas vocales en todo su grosor o solo en sus bordes finos, la voz cambia radicalmente de carácter:</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Voz de pecho (registro modal, M1)</strong>
          Toda la masa muscular de las cuerdas vocales vibra junta. Da un timbre cálido, enraizado y carnoso: nuestro registro natural al hablar y la base de potencia en el grave y el medio.
        </div>
        <div class="physics-fact-item">
          <strong>Voz de cabeza &amp; falsete (M2)</strong>
          Las cuerdas vocales se estiran y se afinan para vibrar solo en su borde externo. Ofrece un color ligero, aflautado y aéreo (voz de cabeza lírica homogénea o <em>falsete</em> velado).
        </div>
        <div class="physics-fact-item">
          <strong>Voz mixta</strong>
          Tiende un puente fluido a través del <em>passaggio</em> (paso entre registros). Un equilibrio muscular preciso mantiene un timbre unificado del grave al agudo sin cortes repentinos.
        </div>
        <div class="physics-fact-item">
          <strong>Belting (pop, musical, gospel)</strong>
          Lleva la base de la voz de pecho hasta el agudo gracias a un apoyo firme y vocales abiertas: presencia directa y potente hacia Sol5/Do6.
        </div>
        <div class="physics-fact-item">
          <strong>Vibrato</strong>
          Una oscilación natural, flexible y periódica de altura e intensidad hacia los 5–7 Hz. Aporta calidez a las notas tenidas y ayuda a una voz solista a destacar sobre el coro.
        </div>
        <div class="physics-fact-item">
          <strong>Scat &amp; canto difónico (armónico)</strong>
          El <em>scat</em> del jazz imita los solos de los instrumentos de viento con sílabas rítmicas («shoo-be-doo»). En el <em>canto difónico</em>, la forma precisa de la lengua amplifica un armónico estrecho sobre un bordón, ¡hasta hacer oír dos notas simultáneas!
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">Escritura coral (SATB)</span>
        <span class="k-ratio-chip">Cuerdas &amp; tesituras</span>
      </div>
      <h4>En el corazón del coro: cuerdas SATB &amp; tesituras</h4>
      <p>Los coros mixtos de todo el mundo siguen el orden <strong>SATB</strong>, nombrado del agudo al grave según las cuatro grandes cuerdas. Los grandes coros sinfónicos suelen dividir cada cuerda en divisi I y II, formando ocho voces: <em>SSAATTBB</em>.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Soprano (S) • Tesitura típica Do4–Do6 (C4–C6)</strong>
          La voz femenina o infantil más aguda. Suele llevar la melodía principal, las armonías superiores y el brillo cristalino.
        </div>
        <div class="physics-fact-item">
          <strong>Contralto (A) • Tesitura típica Fa3–Mi5 (F3–E5)</strong>
          La voz femenina grave (o contratenor). Alimenta la calidez interior de la armonía (terceras, séptimas, retardos expresivos) justo bajo la melodía.
        </div>
        <div class="physics-fact-item">
          <strong>Tenor (T) • Tesitura típica Do3–La4 (C3–A4)</strong>
          La voz masculina aguda (¡a menudo escrita en clave de sol octavada, que suena una octava más grave!). Une las mitades alta y baja con contracantos líricos o agudos radiantes.
        </div>
        <div class="physics-fact-item">
          <strong>Bajo (B) • Tesitura típica Mi2–Mi4 (E2–E4)</strong>
          La cuerda masculina más grave y la base acústica del coro. Los bajos fijan la fundamental: cuando están perfectamente afinados, todo el acorde se alinea de golpe.
        </div>
        <div class="physics-fact-item">
          <strong>Mezzosoprano, barítono &amp; contratenor</strong>
          Tres voces intermedias esenciales: <em>mezzo</em> (La3–La5, rico puente entre soprano y contralto), <em>barítono</em> (Sol2–Sol4, la tesitura masculina más frecuente) y <em>contratenor</em> (tesitura de contralto masculina con voz de cabeza trabajada).
        </div>
        <div class="physics-fact-item">
          <strong>Otras formaciones vocales</strong>
          Los <em>coros de voces iguales (SSAA)</em> y los <em>coros de hombres (TTBB / barbershop)</em> cierran los acordes para realzar los armónicos. Los grupos <em>a cappella</em> modernos añaden beatbox a modo de batería.
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G4,B4,D5,G5" data-dur="0.95" data-step="320">▶ Registro de soprano</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G3,Bb3,D4,F4" data-dur="0.95" data-step="320">▶ Registro de contralto</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,E3,G3,B3" data-dur="0.95" data-step="320">▶ Registro de tenor</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="E2,G2,B2,E3" data-dur="1.05" data-step="340">▶ Base del bajo</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Afinación &amp; escucha</span>
        <span class="k-ratio-chip">Afinación justa</span>
      </div>
      <h4>Por qué un coro a cappella suena a veces más puro que un piano</h4>
      <p>Los pianos están afinados en <strong>temperamento igual de 12 semitonos</strong>: sus terceras mayores quedan unos 14 cents altas para que las doce tonalidades sigan siendo tocables. Los cantantes, en cambio, no están atados a trastes ni a martillos fijos.</p>
      <p>Al cantar sin acompañamiento, los buenos coristas ajustan instintivamente sus intervalos hacia <strong>proporciones puras de afinación justa</strong> (2:1 octava, 3:2 quinta, 5:4 tercera mayor). En el instante en que la tercera mayor encaja sin ningún batimiento, los armónicos comunes se refuerzan mutuamente y todo el acorde florece de repente con un brillo sorprendente (el famoso «barbershop ring»).</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="1.4" data-step="460">▶ Apilar voz a voz (bajo → sop.)</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="2.4" data-step="0">▶ Acorde coral SATB completo</button>
        <button class="btn-tool" data-open-warmup="true">▶ Abrir el calentamiento vocal de 5 min</button>
      </div>
    </article>
  `;
}


const INSTRUMENT_MODULES_DATA_ES = {
  strings: {
    title: "Cuerda frotada",
    subtitle: "Física del arco, familia de las cuerdas de orquesta y articulaciones",
    intro: {
      tag: "Física & lutería",
      tagClass: "tag-peach",
      chip: "Movimiento «stick-slip» de Helmholtz",
      heading: "Cómo hace cantar el arco a las cuerdas",
      body: "La crin de caballo frotada con <em>colofonia</em> pegajosa engancha y suelta la cuerda cientos de veces por segundo en un ciclo nítido de adherencia y deslizamiento. Un <em>puente</em> de arce tallado transmite esas vibraciones a la tapa armónica hueca de abeto, sostenida por dentro por el alma y la barra armónica. Sin trastes, las cuerdas ajustan cada nota libremente en afinación pura."
    },
    items: [
      {
        name: "Violín",
        tag: "Soprano de la cuerda",
        tagClass: "tag-peach",
        range: "Sol3 – La7 (G3 – A7)",
        tuning: "Afinado por quintas: Sol3 – Re4 – La4 – Mi5",
        role: "Melodía principal, brillo y virtuosismo ágil",
        desc: "El miembro más agudo y ágil de la familia. En la orquesta, los violines se dividen en violines I (a menudo planeando en el agudo) y violines II (voces interiores y armonía). Sus cuerdas cortas y ligeras responden al instante a los pasajes más rápidos.",
        demos: [
          { label: "Violín con arco (arco)", style: "strings", notes: "G4,D5,A5,E6", dur: 1.0, step: 340 },
          { label: "Violín pulsado (pizzicato)", style: "pizzicato", notes: "G4,B4,D5,G5", dur: 0.75, step: 220 }
        ]
      },
      {
        name: "Viola",
        tag: "Contralto de la cuerda",
        tagClass: "tag-sage",
        range: "Do3 – Mi6 (C3 – E6)",
        tuning: "Afinada por quintas: Do3 – Sol3 – Re4 – La4",
        role: "Calidez armónica interior y contracantos velados",
        desc: "Afinada una quinta por debajo del violín y escrita tradicionalmente en <em>clave de do en 3.ª</em>. Su caja es algo más pequeña de lo que exigiría la física para su registro grave, lo que da a la viola su timbre oscuro, aterciopelado y profundamente expresivo.",
        demos: [
          { label: "Escuchar el registro de la viola", style: "strings", notes: "C3,G3,D4,A4", dur: 1.05, step: 360 }
        ]
      },
      {
        name: "Violonchelo",
        tag: "Tenor & barítono",
        tagClass: "tag-lilac",
        range: "Do2 – La5 (C2 – A5)",
        tuning: "Afinado por quintas: Do2 – Sol2 – Re3 – La3",
        role: "Base profunda y grandes melodías líricas",
        desc: "Una octava entera por debajo de la viola y notablemente cercano a la voz humana. Sus cuerdas graves ofrecen una base cálida, mientras que su cuerda La canta emotivos solos de barítono a tenor.",
        demos: [
          { label: "Escuchar el violonchelo (Do2–La3)", style: "strings", notes: "C2,G2,D3,A3", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Contrabajo",
        tag: "Base subgrave",
        tagClass: "tag-peach",
        range: "Mi1 (o Do1 con extensión) – Sol4",
        tuning: "Afinado por cuartas: Mi1 – La1 – Re2 – Sol2",
        role: "Bajo de orquesta y walking bass de jazz",
        desc: "Afinado <em>en cuartas</em> en lugar de en quintas para mantener distancias tocables con la mano izquierda, suena <strong>una octava más grave</strong> de lo escrito. Con arco ofrece una profundidad majestuosa; en pizzicato impulsa el jazz y el swing.",
        demos: [
          { label: "Contrabajo con arco (orquestal)", style: "strings", notes: "E1,A1,D2,G2", dur: 1.25, step: 420 },
          { label: "Walking bass de jazz (pizzicato)", style: "pizzicato", notes: "C2,E2,G2,A2,Bb2,A2,G2,E2", dur: 0.7, step: 280 }
        ]
      }
    ],
    extraBox: {
      heading: "Principales articulaciones de cuerda para reconocer de oído",
      facts: [
        { title: "Arco vs. pizzicato", text: "<em>Arco</em> significa tocado con el arco, para líneas tenidas y cantables; <em>pizzicato</em> significa pulsado con el dedo, para notas cortas, cálidas y percusivas." },
        { title: "Spiccato & martelé", text: "El <em>spiccato</em> hace rebotar ligeramente el arco sobre la cuerda para una agilidad chispeante; el <em>martelé</em> ataca con un mordiente seco y preciso." },
        { title: "Trémolo & sul ponticello", text: "Rápidos movimientos de ida y vuelta del arco crean un temblor de suspense (un clásico del cine). Tocar muy cerca del puente (<em>sul ponticello</em>) vuelve el timbre vidrioso y fantasmal." },
        { title: "Armónicos & con sordino", text: "Rozar la cuerda en sus nodos de vibración aísla sonidos aflautados y cristalinos. Poner una sordina (<em>con sordino</em>) sobre el puente vela el timbre con un reflejo sedoso." }
      ]
    }
  },
  woodwinds: {
    title: "Viento madera",
    subtitle: "Bisel libre, lengüeta simple, lengüeta doble y familia de los saxofones",
    intro: {
      tag: "Tubos & lengüetas",
      tagClass: "tag-sage",
      chip: "3 modos de excitación",
      heading: "Del soplo puro a las lengüetas vibrantes",
      body: "A diferencia de las cuerdas, homogéneas, la madera reúne tres mecanismos sonoros muy contrastados: la flauta corta un chorro de aire contra un bisel afilado, el clarinete y el saxofón hacen batir una lámina de caña (<em>lengüeta simple</em>) sobre una boquilla, y el oboe y el fagot aprietan dos finas láminas una contra otra (<em>lengüeta doble</em>), lo que da a cada instrumento su color insustituible."
    },
    items: [
      {
        name: "Flauta travesera & flautín",
        tag: "Chorro de aire sobre bisel (sin lengüeta)",
        tagClass: "tag-peach",
        range: "Do4 – Re7 (flautín Re5 – Do8)",
        tuning: "En Do (flautín +1 octava)",
        role: "Líneas aéreas plateadas, trinos y cantos de pájaro",
        desc: "El soplo se rompe contra el borde de la embocadura y oscila rápidamente hacia dentro y hacia fuera. El grave es suave y cercano a una onda sinusoidal, mientras que la tercera octava atraviesa toda la orquesta con un brillo plateado. El diminuto flautín corona a menudo los tuttis.",
        demos: [
          { label: "Flauta travesera (frase lírica)", style: "flute", notes: "G4,A4,B4,D5,E5,G5", dur: 0.9, step: 260 }
        ]
      },
      {
        name: "Oboe & corno inglés",
        tag: "Lengüeta doble (tubo cónico estrecho)",
        tagClass: "tag-lilac",
        range: "Si♭3 – La6 (corno inglés en Fa)",
        tuning: "Oboe en Do • da el La4 de afinación",
        role: "Referencia de afinación de la orquesta y solos conmovedores",
        desc: "Dos finísimas láminas de caña unidas vibran una contra otra en un tubo cónico estrecho, produciendo un canto penetrante, rico en armónicos y lleno de nostalgia. Como su afinación es muy estable, toda la orquesta afina con el <strong>La4 del oboe</strong>. Su hermano mayor, el corno inglés, tiene una campana en forma de pera hecha para los solos melancólicos.",
        demos: [
          { label: "Timbre de oboe (lengüeta doble)", style: "reed", notes: "A4,C5,E5,D5,C5,A4", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "Clarinete & clarinete bajo",
        tag: "Lengüeta simple (tubo cilíndrico)",
        tagClass: "tag-sage",
        range: "Re3 – Si♭6 (clarinete bajo hasta Si♭1)",
        tuning: "Normalmente en Si♭ o en La (transpositor)",
        role: "Calidez aterciopelada, del grave a los vuelos de jazz y klezmer",
        desc: "Una lengüeta de caña bate contra una boquilla rígida sobre un tubo cilíndrico. Particularidad acústica: ¡reacciona como un tubo cerrado por un extremo! Su registro grave, el <em>chalumeau</em>, favorece los armónicos impares, y al cambiar de registro no salta a la octava sino a la <strong>duodécima (octava + quinta)</strong>.",
        demos: [
          { label: "Registro del clarinete (grave → agudo)", style: "reed", notes: "D3,F3,A3,C4,E4,A4", dur: 0.9, step: 280 }
        ]
      },
      {
        name: "Fagot & contrafagot",
        tag: "Lengüeta doble (bajo)",
        tagClass: "tag-peach",
        range: "Si♭1 – Mi5 (contrafagot hasta Si♭0)",
        tuning: "En Do (tubo de madera doblado en U)",
        role: "Bajos staccato incisivos y tenor cantable",
        desc: "Más de 2,60 metros de tubo cónico de madera doblado en U. En staccato seco en el grave tiene un mordiente lleno de ingenio; ligado en el registro medio canta con una calidez cercana al barítono humano.",
        demos: [
          { label: "Registro grave del fagot", style: "reed", notes: "Bb1,F2,Bb2,D3,F3", dur: 1.0, step: 330 }
        ]
      },
      {
        name: "Familia de los saxofones (soprano, alto, tenor, barítono)",
        tag: "Puente moderno de la madera",
        tagClass: "tag-lilac",
        range: "Re♭2 a Fa6 en sonido real (según el tamaño)",
        tuning: "Alternancia Mi♭ (alto/barítono) & Si♭ (soprano/tenor)",
        role: "Jazz, big band, funk, soul y solos de pop",
        desc: "Inventado hacia 1840 por Adolphe Sax como un híbrido genial: la lengüeta simple y flexible del clarinete unida a un amplio tubo cónico de latón. Salta a la octava con normalidad y proyecta casi como un metal, conservando la agilidad de la madera, del susurro subtone al growl rasposo.",
        demos: [
          { label: "Color de saxo tenor / alto", style: "reed", notes: "C4,Eb4,F4,F#4,G4,Bb4", dur: 0.9, step: 250 }
        ]
      }
    ],
    extraBox: {
      heading: "Guía rápida de los vientos transpositores",
      facts: [
        { title: "¿Por qué algunos vientos leen en Si♭, Mi♭ o Fa?", text: "¡Para que un saxofonista que pasa del alto al barítono, o un clarinetista que cambia de instrumento, conserve exactamente las mismas digitaciones! Tocar un <em>Do</em> escrito en una trompeta o un saxo tenor en Si♭ hace sonar un <em>Si♭</em> real (un tono más grave)." },
        { title: "El arte orquestal de mezclar timbres", text: "A diferencia de las cuerdas, homogéneas, cada instrumento de madera tiene un perfil espectral marcado, y a los orquestadores les encanta combinarlos: flauta + oboe une brillo y núcleo; clarinete + trompa crea un terciopelo sedoso." }
      ]
    }
  },
  brass: {
    title: "Viento metal",
    subtitle: "Serie armónica, pistones, vara y sordinas clásicas",
    intro: {
      tag: "Vibración de los labios",
      tagClass: "tag-lilac",
      chip: "Armónicos + longitud de tubo",
      heading: "No vibra el metal: ¡vibran tus labios!",
      body: "En la trompeta, la trompa, el trombón o la tuba, los labios del músico actúan como una membrana viva contra la boquilla. Sin accionar ningún pistón, un metal solo toca los <strong>armónicos naturales</strong> de su tubo (como una corneta). Los <strong>pistones, cilindros</strong> o la <strong>vara</strong> añaden al instante longitudes de tubo calibradas para obtener las 12 notas cromáticas."
    },
    items: [
      {
        name: "Trompeta & fliscorno (flugelhorn)",
        tag: "Metales agudos (cilíndrico vs. cónico)",
        tagClass: "tag-peach",
        range: "Mi3 – Do6 (en sonido real)",
        tuning: "Casi siempre en Si♭ o en Do",
        role: "Brillo de fanfarria, lead de big band y temas heroicos",
        desc: "Unos dos tercios del tubo de la trompeta son estrechamente cilíndricos antes de la campana, lo que hace los fuertes brillantes, cortantes y eléctricos. Su primo el <em>fliscorno</em> se ensancha cónicamente de punta a punta y envuelve las mismas notas en un terciopelo oscuro, ideal para baladas de jazz.",
        demos: [
          { label: "Fanfarria de trompeta (tríada armónica)", style: "brass", notes: "C4,G4,C5,E5", dur: 0.95, step: 290 }
        ]
      },
      {
        name: "Trompa (trompa doble Fa / Si♭)",
        tag: "Cónico estrecho + mano en la campana",
        tagClass: "tag-sage",
        range: "Si1 – Fa5 (en sonido real)",
        tuning: "Trompa doble Fa / Si♭",
        role: "Temas épicos de cine y nexo natural de la orquesta",
        desc: "Procede de las largas trompas de caza enrolladas (~3,7 m de tubo). Moverse en lo alto de sus armónicos le da una redondez noble que une la madera y los metales pesados. Meter la mano derecha en la campana oscurece el sonido o provoca el mordiente metálico de los <em>sonidos tapados</em>.",
        demos: [
          { label: "Llamada de trompa (quintas & calidez)", style: "brass", notes: "F3,C4,F4,A4", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Trombón (tenor & bajo)",
        tag: "Vara continua (7 posiciones)",
        tagClass: "tag-lilac",
        range: "Mi2 – Fa5 (hasta Si1 con transpositor en Fa)",
        tuning: "No transpositor, en Do (fundamental Si♭)",
        role: "Colchones de acordes carnosos, glisandos fluidos y pegada de jazz",
        desc: "En lugar de pistones, una vara telescópica alarga el tubo cilíndrico en 7 posiciones cromáticas. El músico ajusta cada afinación con precisión de oído y realiza incomparables <strong>glisandos</strong> continuos.",
        demos: [
          { label: "Voicing de trombón (metal medio-grave)", style: "brass", notes: "Bb2,F3,Bb3,D4", dur: 1.05, step: 320 }
        ]
      },
      {
        name: "Tuba & bombardino",
        tag: "Graves cónicos anchos",
        tagClass: "tag-peach",
        range: "Re1 – Fa4 (tuba contrabajo hasta Si♭0)",
        tuning: "En Fa, Mi♭, Do o Si♭",
        role: "Profundidad majestuosa y bajos armónicos sedosos",
        desc: "Casi 5,5 metros de latón ampliamente cónico producen una base sorprendentemente suave, redonda y generosa, sin dureza metálica. En la banda de música, la tuba y el cantable <em>bombardino</em> forman una base aterciopelada.",
        demos: [
          { label: "Base de tuba (octava + quinta)", style: "brass", notes: "F1,C2,F2", dur: 1.25, step: 420 }
        ]
      }
    ],
    extraBox: {
      heading: "Transformar los metales con las sordinas clásicas",
      facts: [
        { title: "Sordina seca (straight mute)", text: "Cono de aluminio o fibra: recorta el grave y vuelve la trompeta o el trombón penetrante, metálico y afilado (jazz y música de cine)." },
        { title: "Sordina Harmon (wah-wah)", text: "Mítica gracias a Miles Davis: tapa la campana dejando abierto solo un tubo central, con un sonido íntimo y nasal; abrir y cerrar la mano delante del tubo crea el famoso grito «wah-wah»." },
        { title: "Sordina cup & plunger", text: "La sordina cup suaviza el brillo en un terciopelo amortiguado; en la big band se hace literalmente «hablar» a los metales con una ventosa de goma (<em>plunger</em>) delante de la campana." }
      ]
    }
  },
  keyboards: {
    title: "Instrumentos de teclado",
    subtitle: "Martillos, púas, tubos de órgano y leyendas electromecánicas",
    intro: {
      tag: "Gigantes polifónicos",
      tagClass: "tag-peach",
      chip: "La misma interfaz de 12 teclas",
      heading: "Un solo teclado, cuatro motores acústicos radicalmente distintos",
      body: "El piano, el clave, el órgano de tubos y el Fender Rhodes comparten la misma geometría intuitiva de 12 teclas por octava (7 blancas, 5 negras), que permite a dos manos tocar a la vez bajo, acordes y melodía. Pero lo que ocurre detrás de la tecla responde a mecanismos físicos opuestos."
    },
    items: [
      {
        name: "Piano vertical & piano de cola de concierto",
        tag: "Cuerdas percutidas (mecánica de martillos)",
        tagClass: "tag-peach",
        range: "La0 – Do8 (88 teclas • 27,5 – 4186 Hz)",
        tuning: "Temperamento igual estirado (~230 cuerdas)",
        role: "Pilar universal de la música clásica, el jazz, el pop y la composición",
        desc: "Unos martillos forrados de fieltro <strong>golpean</strong> cuerdas de acero muy tensas (¡hasta 3 cuerdas al unísono por nota!) y rebotan enseguida para dejarlas vibrar libremente. El <em>pedal de resonancia</em> levanta todos los apagadores a la vez y hace brillar por simpatía las cuerdas que no se tocan.",
        demos: [
          { label: "Piano de cola (arpegio con pedal)", style: "piano", notes: "C3,G3,E4,G4,B4,D5", dur: 1.2, step: 220 }
        ]
      },
      {
        name: "Clave (clavecín)",
        tag: "Cuerdas pulsadas (púas / plumas)",
        tagClass: "tag-sage",
        range: "Fa1 – Fa6",
        tuning: "A menudo temperamentos históricos (Werckmeister / Vallotti)",
        role: "Bajo continuo barroco y ataque claro y plateado",
        desc: "En lugar de un martillo, una diminuta púa (antes de pluma de cuervo, hoy de Delrin) <strong>pulsa</strong> la cuerda al bajar la tecla. La fuerza del dedo apenas cambia el volumen: los contrastes vienen de los registros (4', 8', acoplamiento) y de la densidad de la escritura. Muy rico en armónicos agudos.",
        demos: [
          { label: "Pulsación de clave", style: "cembalo", notes: "D4,F4,A4,D5,C#5,D5", dur: 0.9, step: 210 }
        ]
      },
      {
        name: "Órgano de tubos & armonio",
        tag: "Aerófono (secreto de viento & registros)",
        tagClass: "tag-lilac",
        range: "Subbajo de 16'/32' (¡< 16 Hz!) hasta las mixturas de 1'",
        tuning: "Tubos labiales y de lengüeta por altura en pies",
        role: "Polifonía monumental de duración infinita",
        desc: "Teclas y pedalero abren válvulas que envían aire a presión a cientos o miles de tubos de estaño y madera. Los <em>registros labiales</em> silban como inmensas flautas; los <em>registros de lengüeta</em> estallan como trompetas. ¡Cada nota se mantiene a plena intensidad mientras el dedo siga apoyado!",
        demos: [
          { label: "Órgano de tubos (lleno)", style: "organ", notes: "C3,G3,C4,E4,G4", dur: 2.0, step: 0 }
        ]
      },
      {
        name: "Iconos del escenario: Fender Rhodes, Hammond B3 & clavinet",
        tag: "Leyendas electromecánicas",
        tagClass: "tag-sage",
        range: "73–88 teclas / barras de armónicos",
        tuning: "Pastillas magnéticas, ruedas fónicas y modelado",
        role: "Jazz, funk, soul, gospel, rock y pop moderno",
        desc: "El <strong>Fender Rhodes</strong> golpea varillas metálicas resonantes delante de bobinas magnéticas: suave, cristalino y mágico en el neo-soul. El <strong>clavinet</strong> golpea cuerdas para morder en el funk. El <strong>órgano Hammond B3</strong> suma 9 <em>barras de armónicos</em> procedentes de ruedas fónicas que giran delante de un <em>altavoz Leslie</em> giratorio.",
        demos: [
          { label: "Voicing de órgano de barras", style: "organ", notes: "G3,B3,D4,F4", dur: 1.5, step: 0 },
          { label: "Voicing de piano eléctrico cálido", style: "piano", notes: "F3,A3,C4,E4,G4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },
  plucked: {
    title: "Cuerda pulsada & guitarras",
    subtitle: "Nailon, acero, pastillas magnéticas, bajo eléctrico y arpa de concierto",
    intro: {
      tag: "Impulso pulsado",
      tagClass: "tag-sage",
      chip: "Ataque franco y decaimiento natural",
      heading: "El punto donde pulsas esculpe el timbre al instante",
      body: "Pulsar una cuerda con la yema, la uña o la púa crea un ataque franco cuyos armónicos agudos se apagan antes que la fundamental. Pulsa cerca del <strong>puente</strong> (<em>sul ponticello</em>) para un chasquido metálico y cortante; toca sobre el <strong>diapasón</strong> (<em>sul tasto</em>) para una calidez redonda cercana al arpa."
    },
    items: [
      {
        name: "Guitarra clásica (nailon) & guitarra acústica (acero)",
        tag: "Cajas de resonancia acústicas",
        tagClass: "tag-peach",
        range: "Mi2 – Si5 (en sonido real • escrita +1 octava)",
        tuning: "Afinación estándar: Mi2 – La2 – Re3 – Sol3 – Si3 – Mi4",
        role: "Acompañamiento rítmico, fingerpicking, flamenco y canción",
        desc: "Las <em>guitarras clásicas con cuerdas de nailon</em> seducen por su suavidad cálida y la nitidez polifónica del toque con los dedos. Las <em>guitarras acústicas con cuerdas de acero</em> están más tensas y atraviesan una mezcla gracias a sus acordes brillantes y ricos en agudos.",
        demos: [
          { label: "Arpegio de guitarra acústica", style: "guitar", notes: "E2,B2,E3,G#3,B3,E4", dur: 1.3, step: 170 }
        ]
      },
      {
        name: "Guitarra eléctrica & cadena de señal",
        tag: "Pastillas magnéticas + amplificador",
        tagClass: "tag-lilac",
        range: "Mi2 – Mi6 (con bends y armónicos)",
        tuning: "Mi – La – Re – Sol – Si – Mi (y afinaciones bajadas)",
        role: "Riffs de funk, arpegios limpios y cristalinos, crunch y solos cantables",
        desc: "Una guitarra eléctrica de cuerpo macizo produce muy poco sonido acústico por sí sola: unas bobinas (<em>pastillas</em>) captan la vibración de las cuerdas de acero como señal eléctrica. Las <strong>pastillas de bobina simple</strong> (Strat/Tele) suenan restallantes y cristalinas; los <strong>humbuckers</strong> de doble bobina eliminan el zumbido y entregan medios cremosos, esculpidos luego por el amplificador de válvulas, la saturación, el delay y la reverb.",
        demos: [
          { label: "Acorde eléctrico limpio", style: "guitar", notes: "A2,D3,G3,C4,E4", dur: 1.4, step: 140 }
        ]
      },
      {
        name: "Bajo eléctrico (4, 5 cuerdas & fretless)",
        tag: "El vínculo entre bombo & armonía",
        tagClass: "tag-sage",
        range: "Mi1 (o Si0 con 5 cuerdas) – Sol4",
        tuning: "Mi1 – La1 – Re2 – Sol2",
        role: "Base del groove junto a la batería, fundamento armónico universal",
        desc: "Afinado una octava por debajo de la guitarra, como un contrabajo, pero con trastes para una afinación inmediata. Tocado con los dedos es redondo y profundo; con púa atraviesa las mezclas de rock; en <strong>slap &amp; pop</strong> (pulgar que golpea + cuerda que se tira) electriza el funk; y sin trastes (<em>fretless</em>) se desliza con un vibrato vocal líquido.",
        demos: [
          { label: "Groove de bajo eléctrico (octava & quinta)", style: "ebass", notes: "E1,E1,G1,A1,B1,E2", dur: 0.75, step: 260 }
        ]
      },
      {
        name: "Arpa de concierto, mandolina, banjo & ukelele",
        tag: "Colores pulsados característicos",
        tagClass: "tag-peach",
        range: "Arpa: Do♭1 – Sol♭7 (47 cuerdas)",
        tuning: "Arpa: diatónica con 7 pedales de doble movimiento",
        role: "Glisandos luminosos, texturas folk y destellos acústicos",
        desc: "Cada una de las 47 cuerdas de un arpa de concierto lleva su nota diatónica (rojo para Do, azul/negro para Fa); siete pedales bajan o suben todas las octavas a bemol, becuadro o sostenido. A su lado, la <em>mandolina</em> de cuerdas dobles, el <em>banjo</em> con parche tenso y el ligero <em>ukelele</em> firman músicas tradicionales, bluegrass e indie pop.",
        demos: [
          { label: "Arpegio en cascada al estilo del arpa", style: "guitar", notes: "C3,D3,E3,G3,A3,C4,D4,E4,G4", dur: 0.9, step: 110 }
        ]
      }
    ]
  },
  electronic: {
    title: "Electrónica & estudio",
    subtitle: "Sintetizadores, samplers, cajas de ritmos y mezcla en el DAW",
    intro: {
      tag: "Diseño de sonido & producción",
      tagClass: "tag-sage",
      chip: "Electrófonos & digital",
      heading: "De la resonancia física a esculpir directamente las formas de onda",
      body: "Los instrumentos acústicos heredan su timbre de la madera, el latón o un parche tenso. Los instrumentos electrónicos parten de ondas brutas eléctricas o digitales, lo que te permite esculpir exactamente la riqueza armónica, la velocidad de ataque y la evolución del timbre en el tiempo."
    },
    items: [
      {
        name: "Sintetizadores sustractivos (analógicos & virtuales)",
        tag: "Oscilador + filtro + envolvente",
        tagClass: "tag-sage",
        range: "Todo el espectro audible (del subgrave a 20 Hz a los agudos)",
        tuning: "Voltio/octava o MIDI (incluidos microintervalos)",
        role: "Bajos masivos, leads incisivos, colchones analógicos aterciopelados",
        desc: "La arquitectura clásica popularizada por el Minimoog: <strong>1. El oscilador (VCO)</strong> produce formas de onda ricas como el <em>diente de sierra</em> (todos los armónicos: amplio y cercano a las cuerdas), el <em>cuadrado/pulso</em> (armónicos impares: amaderado y hueco) o el <em>triángulo/seno</em> (puro/sub). ¡<strong>2. El filtro (VCF)</strong> esculpe el brillo con <em>cutoff</em> y <em>resonancia</em>! <strong>3. La envolvente (ADSR)</strong> modela ataque, decaimiento, sostenimiento y relajación.",
        demos: [
          { label: "Sinte diente de sierra (lead armónico)", style: "synth-saw", notes: "C3,E3,G3,B3,C4", dur: 0.85, step: 230 },
          { label: "Colchón analógico cálido", style: "synth-pad", notes: "C3,G3,B3,D4,E4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "Síntesis FM, tablas de ondas (wavetable) & granular",
        tag: "Universos sonoros digitales",
        tagClass: "tag-lilac",
        range: "De sonidos cristalinos a texturas cinematográficas en movimiento",
        tuning: "Precisión de muestra / microtonal",
        role: "Campanas vidriosas y pianos eléctricos de los ’80, bajos modernos y colchones",
        desc: "La <strong>síntesis FM</strong> (legendaria en el Yamaha DX7) modula la frecuencia de una onda a velocidad de audio con otra, produciendo sin filtro campanas metálicas heladas, pianos eléctricos de los ’80 y bajos restallantes. Los sintes de <strong>tablas de ondas</strong> se deslizan entre formas de onda cambiantes, mientras que la <strong>síntesis granular</strong> trocea grabaciones en granos de 10–50 ms para tejer nubes sonoras.",
        demos: [
          { label: "Colchón flotante rico en armónicos", style: "synth-pad", notes: "A2,E3,G3,B3,D4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "Samplers, mellotron & cajas de ritmos (808 / 909 / MPC)",
        tag: "Muestreo & secuenciadores por pasos",
        tagClass: "tag-peach",
        range: "Tesitura cromática completa por remuestreo",
        tuning: "Tocables cromáticamente en teclado y pads",
        role: "Hip-hop, house, techno, beats de pop y maquetas orquestales",
        desc: "Un <strong>sampler (muestreador)</strong> captura cualquier sonido real (coros, bucles de vinilo, ruidos cotidianos) y lo despliega por todo un teclado (¡anticipado por el <em>mellotron</em> de cintas magnéticas!). Cajas de ritmos de culto como la Roland <em>TR-808</em> aportaron cajas sintéticas, palmas y cencerros, y alargar su bombo sinusoidal crea las famosas líneas de subbajo del hip-hop y el trap.",
        demos: [
          { label: "Escuchar una línea de subbajo 808", style: "ebass", notes: "C1,C1,Eb1,G1,C2,G1", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "DAW, instrumentos virtuales & efectos de mezcla",
        tag: "El taller del estudio moderno",
        tagClass: "tag-sage",
        range: "Entorno musical informático completo",
        tuning: "Altura y automatización en tiempo real",
        role: "Composición, arreglo, mezcla y masterización",
        desc: "Una <em>estación de trabajo de audio digital (DAW)</em> reúne grabadoras, racks de periféricos y orquestas virtuales en una pantalla. Con <strong>MIDI</strong> controlas sintes de software y bancos de muestras, y luego esculpes el espacio con los <strong>ecualizadores (EQ)</strong>, dominas el impacto con los <strong>compresores</strong> y creas salas de concierto con <strong>reverb &amp; delay</strong>.",
        demos: [
          { label: "Capa de sinte + sub", style: "synth-saw", notes: "F2,C3,A3,E4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },
  ensembles: {
    title: "Orquestas, grupos & conjuntos",
    subtitle: "Por qué decenas de instrumentos suenan claros juntos en lugar de emborronarse",
    intro: {
      tag: "Arreglo & espacio de frecuencias",
      tagClass: "tag-peach",
      chip: "Reparto acústico de tareas",
      heading: "El secreto de una gran orquestación: frecuencia + función",
      body: "Cuando 80 músicos sinfónicos o 5 miembros de un grupo de rock tocan a la vez, cada instrumento debe ocupar su propia <strong>banda de frecuencias</strong> (graves, medios, agudos) y una <strong>función rítmica o armónica clara</strong>. Cada formación clásica nació para resolver esta ecuación."
    },
    items: [
      {
        name: "La orquesta sinfónica (~70–100 músicos)",
        tag: "Las 4 grandes familias",
        tagClass: "tag-peach",
        range: "Del subgrave del contrabajo al brillo del flautín (16 Hz – >4 kHz)",
        tuning: "La4 de concierto = 440–443 Hz",
        role: "Inmenso rango dinámico y paleta orquestal completa",
        desc: "¿Por qué más de 50 cuerdas frente a solo 2 a 4 maderas o metales? ¡Porque una sola trompeta atraviesa diez violines! La gran sección de cuerda teje la <em>alfombra</em> continua, las maderas solistas dibujan las líneas ágiles, los metales levantan las cumbres heroicas y los timbales &amp; la percusión insuflan el aliento dramático.",
        demos: [
          { label: "Gran acorde cálido de cuerdas", style: "strings", notes: "C2,G2,E3,C4,G4", dur: 2.0, step: 0 },
          { label: "Capa de fanfarria de metales", style: "brass", notes: "C4,G4,C5,E5", dur: 1.1, step: 240 }
        ]
      },
      {
        name: "Música de cámara (cuarteto de cuerda & quinteto de viento)",
        tag: "Transparencia solista",
        tagClass: "tag-sage",
        range: "4 a 5 voces iguales en diálogo",
        tuning: "Afinación pura adaptativa en conjunto",
        role: "Juego de conjunto íntimo, comparable al cuarteto vocal SATB",
        desc: "El <strong>cuarteto de cuerda</strong> clásico (2 violines, viola, violonchelo) refleja idealmente un coro a cuatro voces: timbre unificado, legibilidad quirúrgica y contrapunto flexible. El <strong>quinteto de viento</strong> (flauta, oboe, clarinete, fagot + ¡trompa!) afronta el reto inverso: cinco colores opuestos fundidos gracias a la calidez de la trompa.",
        demos: [
          { label: "Arpegio de cuarteto de cuerda (violonchelo → violín)", style: "strings", notes: "C2,G3,D4,E4", dur: 1.5, step: 260 }
        ]
      },
      {
        name: "Big band & formación de jazz",
        tag: "Sección rítmica vs. secciones de viento",
        tagClass: "tag-lilac",
        range: "Escritura cerrada en bloques de acordes (block voicings)",
        tuning: "Fraseo swing y pregunta-respuesta",
        role: "Walking bass y batería propulsoras bajo metales superpuestos",
        desc: "La big band se equilibra en dos polos: la <strong>sección rítmica</strong> (batería, contrabajo/bajo, piano, guitarra) aporta sin descanso swing y armonía, mientras los <strong>vientos</strong> (5 saxofones, 4 trombones, 4 trompetas) se intercambian inversiones cerradas (como los <em>drop-2</em>) en un vivo juego de pregunta y respuesta.",
        demos: [
          { label: "Voicing de jazz de la sección de metales", style: "brass", notes: "Bb2,Ab3,C4,D4,G4", dur: 1.7, step: 0 }
        ]
      },
      {
        name: "Grupo moderno de pop, rock & funk",
        tag: "Pistas de frecuencia definidas",
        tagClass: "tag-peach",
        range: "De la base de subbajo al aire de la presencia vocal",
        tuning: "Pocket bloqueado entre bombo y bajo",
        role: "Groove sólido, estribillos memorables y realce de la voz",
        desc: "<strong>Bombo + bajo eléctrico (o 808)</strong> cierran la base grave (40–250 Hz). <strong>Caja &amp; charles</strong> recortan el marco rítmico. <strong>Guitarras, teclados o sintes</strong> visten los medios (300 Hz – 3 kHz) mientras se retiran un poco en las estrofas para dejar respirar a la <strong>voz principal</strong> (1–4 kHz).",
        demos: [
          { label: "Voicing de grupo (bajo + teclado)", style: "piano", notes: "A2,E3,G3,B3,C#4", dur: 1.6, step: 110 }
        ]
      }
    ]
  }
};

function renderInstrumentModuleHTML_ES(refKey) {
  const mod = INSTRUMENT_MODULES_DATA_ES[refKey];
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
        <span class="inst-meta-pill">Extensión: ${item.range}</span>
        <span class="inst-meta-pill">${item.tuning}</span>
      </div>
      <p><strong>Función:</strong> ${item.role}</p>
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
        <span class="k-card-tag tag-lilac">Técnica &amp; consejos de escucha</span>
        <span class="k-ratio-chip">Para profundizar</span>
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


const MODES_ENCYCLOPEDIA_ES = [
  {
    id: "lydian",
    name: "Lidio",
    family: "major",
    familyLabel: "Familia mayor",
    brightness: "1 / 7 • Radiante & aéreo",
    badgeClass: "badge-peach",
    rootLabel: "Do",
    stammton: "4.º modo de la escala mayor (como Do mayor empezando en Fa)",
    formula: "1 · 2 · 3 · #4 · 5 · 6 · 7",
    steps: "T – T – T – ½T – T – T – ½T",
    charNote: "Cuarta aumentada (#4, p. ej., Fa♯ sobre Do)",
    vamp: "I – II (Do – Re)",
    desc: "El más luminoso de los siete modos diatónicos. Subir la 4.ª nota a #4 elimina el roce de semitono contra la tercera mayor, lo que da al lidio su flotación onírica, suspendida y cinematográfica.",
    usage: "<strong>Uso musical:</strong> Muy apreciado en el cine para el asombro y la ciencia ficción (John Williams <em>E.T.</em>, tema de <em>Los Simpson</em>, Danny Elfman), en el rock instrumental (Joe Satriani, Steve Vai) y en los acordes flotantes Maj7(#11) del jazz.",
    notes: "C4,D4,E4,F#4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4", "B4"], ["D3", "F#4", "A4", "C5"]]
  },
  {
    id: "ionian",
    name: "Jónico (mayor)",
    family: "major",
    familyLabel: "Familia mayor",
    brightness: "2 / 7 • Equilibrado & nítido",
    badgeClass: "badge-sage",
    rootLabel: "Do",
    stammton: "1.er modo: nuestra escala mayor natural (Do mayor)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · 7",
    steps: "T – T – ½T – T – T – T – ½T",
    charNote: "Cuarta justa (4) + sensible franca (7 → 1)",
    vamp: "I – IV – V – I",
    desc: "El modo mayor clásico. El tritono entre los grados 4 y 7 se resuelve con claridad hacia la tónica y la tercera, creando una estabilidad, una claridad y una resolución universales.",
    usage: "<strong>Uso musical:</strong> El pilar de la armonía tonal occidental, de las sinfonías clásicas, de los estribillos pop luminosos y de las canciones folk donde reinan la alegría y la evidencia.",
    notes: "C4,D4,E4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4"], ["F3", "A4", "C5"], ["G3", "B4", "D5"], ["C3", "E4", "G4"]]
  },
  {
    id: "mixolydian",
    name: "Mixolidio",
    family: "major",
    familyLabel: "Familia mayor",
    brightness: "3 / 7 • Terrenal & animado",
    badgeClass: "badge-peach",
    rootLabel: "Do",
    stammton: "5.º modo de la escala mayor (como Do mayor empezando en Sol)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · b7",
    steps: "T – T – ½T – T – T – ½T – T",
    charNote: "Séptima menor (b7, p. ej., Si♭ sobre Do)",
    vamp: "I – bVII (Do – Si♭)",
    desc: "Un modo mayor que cambia la sensible clásica por una b7 relajada, lo que le da al instante un color bluesero, rockero y seguro de sí.",
    usage: "<strong>Uso musical:</strong> Rey del rock clásico, el funk, el folk celta y el reggae (The Beatles <em>Norwegian Wood</em>, AC/DC, Deep Purple), y escala refleja en el jazz sobre los acordes de séptima de dominante (V7).",
    notes: "C4,D4,E4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "E4", "G4", "Bb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "dorian",
    name: "Dórico",
    family: "minor",
    familyLabel: "Familia menor",
    brightness: "4 / 7 • Aterciopelado & groovy",
    badgeClass: "badge-lilac",
    rootLabel: "Do",
    stammton: "2.º modo de la escala mayor (como Do mayor empezando en Re)",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · b7",
    steps: "T – ½T – T – T – T – ½T – T",
    charNote: "Sexta mayor natural en menor (♮6, p. ej., La sobre Do)",
    vamp: "i – IV (Dom – Fa)",
    desc: "Justo en el centro del espectro de luminosidad: una tercera menor y una 7.ª menor iluminadas por una 6.ª mayor llena de alma (♮6). Con clase, fluido, nunca lacrimógeno: puro movimiento.",
    usage: "<strong>Uso musical:</strong> Campeón indiscutible del funk, el soul, el jazz modal y el rock (Miles Davis <em>So What</em>, Santana <em>Oye cómo va</em>, Daft Punk <em>Get Lucky</em>, Pink Floyd) y de las melodías celtas.",
    notes: "C4,D4,Eb4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4", "Bb4"], ["F3", "A4", "C5"]]
  },
  {
    id: "aeolian",
    name: "Eólico (menor natural)",
    family: "minor",
    familyLabel: "Familia menor",
    brightness: "5 / 7 • Profundo & melancólico",
    badgeClass: "badge-sage",
    rootLabel: "Do",
    stammton: "6.º modo de la escala mayor (como Do mayor empezando en La)",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · b7",
    steps: "T – ½T – T – T – ½T – T – T",
    charNote: "Sexta menor (b6, p. ej., La♭) + séptima menor (b7)",
    vamp: "i – bVI – bVII (Dom – La♭ – Si♭)",
    desc: "El menor natural. Bajar la 6.ª a un semitono por encima de la quinta (b6) libera patetismo, amplitud dramática y nostalgia tierna.",
    usage: "<strong>Uso musical:</strong> Omnipresente en las baladas de rock, el pop en menor (Adele, <em>All Along the Watchtower</em>), el R&amp;B y los tráileres épicos. A diferencia de la ♮6 dórica, la b6 suspira suavemente hacia la quinta.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Ab3", "C4", "Eb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "phrygian",
    name: "Frigio",
    family: "minor",
    familyLabel: "Familia menor",
    brightness: "6 / 7 • Oscuro & hechizante",
    badgeClass: "badge-lilac",
    rootLabel: "Do",
    stammton: "3.er modo de la escala mayor (como Do mayor empezando en Mi)",
    formula: "1 · b2 · b3 · 4 · 5 · b6 · b7",
    steps: "½T – T – T – T – ½T – T – T",
    charNote: "Segunda menor justo por encima de la tónica (b2, p. ej., Re♭ → Do)",
    vamp: "i – bII (Dom – Re♭)",
    desc: "Colocar un roce de un solo semitono por encima de la tónica genera al instante misterio y un color hispano-oriental. Esa b2 se inclina de forma irresistible hacia la fundamental.",
    usage: "<strong>Uso musical:</strong> El alma del flamenco (a menudo con tercera mayor en el <em>frigio dominante</em>), del metal y el djent (Metallica), del trap oscuro y de los thrillers tensos.",
    notes: "C4,Db4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "locrian",
    name: "Locrio",
    family: "minor",
    familyLabel: "Familia menor",
    brightness: "7 / 7 • Disminuido & inestable",
    badgeClass: "badge-lilac",
    rootLabel: "Do",
    stammton: "7.º modo de la escala mayor (como Do mayor empezando en Si)",
    formula: "1 · b2 · b3 · 4 · b5 · b6 · b7",
    steps: "½T – T – T – ½T – T – T – T",
    charNote: "Quinta disminuida (b5, p. ej., Sol♭) + b2",
    vamp: "i° – bII (Dom7b5 – Re♭)",
    desc: "El único modo diatónico sin una quinta justa estable sobre su fundamental. En su lugar, la propia tríada de tónica es disminuida / semidisminuida (m7b5), cargada de inquietud.",
    usage: "<strong>Uso musical:</strong> Raro como tonalidad completa (p. ej., Björk <em>Army of Me</em>, metal progresivo), pero indispensable en el jazz sobre los acordes semidisminuidos (ii°7 de los ii–V–i menores) y en las escenas de tensión.",
    notes: "C4,Db4,Eb4,F4,Gb4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "Gb4", "Bb4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "harmonic-minor",
    name: "Menor armónica (variante extra)",
    family: "variant",
    familyLabel: "Variante menor",
    brightness: "Dramática • clásica, neoclásica & oriental",
    badgeClass: "badge-peach",
    rootLabel: "Do",
    stammton: "Menor natural con el 7.º grado elevado a sensible (#7)",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · #7",
    steps: "T – ½T – T – T – ½T – 1½ – ½T",
    charNote: "Sensible mayor (7) + salto de segunda aumentada (b6 → 7, ¡3 semitonos!)",
    vamp: "i – V7 (Dom – Sol7)",
    desc: "Une la oscura b6 del eólico a una brillante sensible mayor (7). Entre ambas se abre un salto expresivo de 3 semitonos que evoca al instante el drama barroco, el tango o el adorno oriental.",
    usage: "<strong>Uso musical:</strong> Da a las tonalidades menores una verdadera dominante mayor V7 (Bach, Mozart, flamenco, metal neoclásico al estilo de Yngwie Malmsteen). Su 5.º modo da el <em>frigio dominante</em>.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,B4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["G3", "B4", "D5", "F5"]]
  },
  {
    id: "melodic-minor",
    name: "Menor melódica (menor de jazz)",
    family: "variant",
    familyLabel: "Variante menor",
    brightness: "Depurada • cine negro, jazz moderno & fusión",
    badgeClass: "badge-sage",
    rootLabel: "Do",
    stammton: "Idéntica a la mayor, con solo la tercera bemolizada (b3)",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · 7",
    steps: "T – ½T – T – T – T – T – ½T",
    charNote: "b3 unida a la 6.ª mayor (♮6) y a la sensible (7)",
    vamp: "imMaj7 – IV7 (DomMaj7 – Fa7)",
    desc: "En su origen se usaba al subir para suavizar el gran salto de la menor armónica (antes de bajar de nuevo en menor natural). El jazz moderno conserva esta forma elevada en ambos sentidos como un universo armónico propio.",
    usage: "<strong>Uso musical:</strong> Ese tinte misterioso de cine negro (mMaj7) y escala madre de colores clave del jazz como el lidio dominante (4.º modo) o la escala alterada (7.º modo).",
    notes: "C4,D4,Eb4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "Eb4", "G4", "B4"], ["F3", "A4", "C5", "Eb5"]]
  }
];

function renderModesReferenceHTML_ES(familyFilter = "all") {
  const list = MODES_ENCYCLOPEDIA_ES.filter(m => familyFilter === "all" || m.family === familyFilter);

  const introHeader = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Principio fundamental</span>
        <span class="k-ratio-chip">Relativo vs. paralelo</span>
      </div>
      <h4>¿Qué es exactamente un modo?</h4>
      <p>
        Un <strong>modo</strong> nace cuando se usan exactamente las mismas notas pero se elige otra nota como <strong>centro de reposo (tónica)</strong>. Quédate solo en las teclas blancas del piano (notas de Do mayor) y cada punto de partida dibuja una nueva secuencia de tonos y semitonos: empieza en <code>Re</code> para el <em>dórico</em>, <code>Mi</code> para el <em>frigio</em>, <code>Fa</code> para el <em>lidio</em>, <code>Sol</code> para el <em>mixolidio</em>, <code>La</code> para el <em>eólico</em> o <code>Si</code> para el <em>locrio</em>.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>1. Enfoque relativo (mismas teclas)</h5>
          <p>Práctico en el teclado: «Re dórico usa las mismas teclas que Do mayor». Al principio engaña más al oído, porque Do sigue atrayéndolo.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>2. Enfoque paralelo (¡misma fundamental!)</h5>
          <p><strong>La clave de la escucha:</strong> ¡toca los 7 modos partiendo de <code>Do</code>! Una sola nota distintiva revela entonces el color al instante (p. ej., <code>Do → Fa♯</code> = lidio, <code>Do → Si♭</code> = mixolidio).</p>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">El espectro de luminosidad modal</span>
        <span class="k-ratio-chip">Claro → oscuro</span>
      </div>
      <h4>Ordenados del más luminoso al más oscuro (según el círculo de quintas)</h4>
      <p>
        Ordena los 7 modos eclesiásticos del más radiante al más tenebroso en lugar de por grados 1–7: en cada paso, <strong>una sola nota baja un semitono</strong>, exactamente en el orden del círculo de quintas:
      </p>
      <div class="mode-spectrum-strip">
        <span class="mode-spec-chip is-bright">1. Lidio (#4)</span>
        <span class="mode-spec-chip">2. Jónico</span>
        <span class="mode-spec-chip">3. Mixolidio (b7)</span>
        <span class="mode-spec-chip">4. Dórico (b3, b7)</span>
        <span class="mode-spec-chip">5. Eólico (+b6)</span>
        <span class="mode-spec-chip">6. Frigio (+b2)</span>
        <span class="mode-spec-chip is-dark">7. Locrio (+b5)</span>
      </div>
    </article>

    <div class="k-filter-row" aria-label="Filtrar los modos">
      <button class="k-filter-pill ${familyFilter === "all" ? "active" : ""}" data-mfilter="all">Todos (9)</button>
      <button class="k-filter-pill ${familyFilter === "major" ? "active" : ""}" data-mfilter="major">Familia mayor (3)</button>
      <button class="k-filter-pill ${familyFilter === "minor" ? "active" : ""}" data-mfilter="minor">Familia menor (4)</button>
      <button class="k-filter-pill ${familyFilter === "variant" ? "active" : ""}" data-mfilter="variant">Variantes menores (2)</button>
    </div>
  `;

  const cards = list.map(m => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${m.family === "major" ? "tag-peach" : m.family === "minor" ? "tag-lilac" : "tag-sage"}">${m.familyLabel} • ${m.brightness}</span>
        <span class="k-ratio-chip">${m.formula}</span>
      </div>
      <h4>${m.name} (ejemplo sobre ${m.rootLabel})</h4>
      <p class="k-char">${m.stammton}</p>
      <p><strong>Nota de color:</strong> ${m.charNote}<br><strong>Estructura:</strong> <code>${m.steps}</code></p>
      <p>${m.desc}</p>
      <p>${m.usage}</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-mode-scale="${m.id}">▶ Escala (${m.rootLabel})</button>
        <button class="btn-tool" data-play-mode-vamp="${m.id}">▶ Bucle: ${m.vamp}</button>
      </div>
    </article>
  `).join("");

  const tipsCard = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Composición &amp; armonía modal</span>
        <span class="k-ratio-chip">Mantener el centro modal</span>
      </div>
      <h4>Escribir modal sin recaer sin querer en mayor</h4>
      <ul class="k-physics-list">
        <li><strong>Evita el tritono de la escala madre:</strong> En las notas de Do mayor, <code>Fa</code> y <code>Si</code> forman el tritono de Sol7, que arrastra el oído directamente hacia Do. ¿Compones en Re dórico o Sol mixolidio? Evita insistir en Sol7 → Do para proteger el hogar del modo.</li>
        <li><strong>Apóyate en bucles de dos acordes:</strong> En lugar de largas cadencias funcionales, haz respirar tu pieza entre la tónica y el acorde vecino que contiene la <strong>nota característica</strong> (p. ej., <code>Dom – Fa</code> en Do dórico realza el <code>La</code> luminoso).</li>
        <li><strong>Ancla con un bordón (pedal):</strong> Mantener una quinta vacía en el bajo fija al instante el centro modal: cada intervalo característico brilla enseguida por encima.</li>
      </ul>
    </article>
  `;

  return introHeader + `<div class="knowledge-list">${cards}</div>` + tipsCard;
}

const KEYS_CIRCLE_DATA_ES = [
  {
    id: "key-0",
    group: "neutral",
    sigBadge: "0 alteraciones",
    majorName: "Do mayor",
    minorName: "La menor",
    rootMidi: 60,
    minorMidi: 57,
    accidentalList: "Sin sostenidos ni bemoles (solo teclas blancas)",
    chords: "I Do · ii Rem · iii Mim · IV Fa · V Sol · vi Lam",
    instrumentTip: "Punto de partida clásico en el piano, la flauta dulce y el calentamiento vocal"
  },
  {
    id: "key-1s",
    group: "sharp",
    sigBadge: "1 ♯",
    majorName: "Sol mayor",
    minorName: "Mi menor",
    rootMidi: 55,
    minorMidi: 52,
    accidentalList: "1♯: Fa♯ (sensible hacia Sol)",
    chords: "I Sol · ii Lam · iii Sim · IV Do · V Re · vi Mim",
    instrumentTip: "Adorada por la cuerda frotada (cuerdas al aire Sol/Re/La/Mi) y la guitarra acústica"
  },
  {
    id: "key-2s",
    group: "sharp",
    sigBadge: "2 ♯",
    majorName: "Re mayor",
    minorName: "Si menor",
    rootMidi: 62,
    minorMidi: 59,
    accidentalList: "2♯: Fa♯, Do♯",
    chords: "I Re · ii Mim · iii Fa♯m · IV Sol · V La · vi Sim",
    instrumentTip: "Tonalidad orquestal brillante y festiva (trompetas barrocas, violín, violonchelo)"
  },
  {
    id: "key-3s",
    group: "sharp",
    sigBadge: "3 ♯",
    majorName: "La mayor",
    minorName: "Fa♯ menor",
    rootMidi: 57,
    minorMidi: 54,
    accidentalList: "3♯: Fa♯, Do♯, Sol♯",
    chords: "I La · ii Sim · iii Do♯m · IV Re · V Mi · vi Fa♯m",
    instrumentTip: "Abierta, radiante y fluida tanto en la guitarra como en las cuerdas"
  },
  {
    id: "key-4s",
    group: "sharp",
    sigBadge: "4 ♯",
    majorName: "Mi mayor",
    minorName: "Do♯ menor",
    rootMidi: 64,
    minorMidi: 61,
    accidentalList: "4♯: Fa♯, Do♯, Sol♯, Re♯",
    chords: "I Mi · ii Fa♯m · iii Sol♯m · IV La · V Si · vi Do♯m",
    instrumentTip: "Firma de la guitarra eléctrica, el blues y el rock (cuerda grave de Mi al aire)"
  },
  {
    id: "key-5s",
    group: "sharp",
    sigBadge: "5 ♯ / 7 ♭",
    majorName: "Si mayor (= Do♭ mayor)",
    minorName: "Sol♯ menor (= La♭ menor)",
    rootMidi: 59,
    minorMidi: 56,
    accidentalList: "5♯: Fa♯, Do♯, Sol♯, Re♯, La♯ (enarmónica de Do♭ mayor con 7♭)",
    chords: "I Si · ii Do♯m · iii Re♯m · IV Mi · V Fa♯ · vi Sol♯m",
    instrumentTip: "Sorprendentemente cómoda en el piano, porque las 5 teclas negras siguen la mano"
  },
  {
    id: "key-6",
    group: "sharp",
    sigBadge: "6 ♯ / 6 ♭",
    majorName: "Fa♯ mayor / Sol♭ mayor",
    minorName: "Re♯ menor / Mi♭ menor",
    rootMidi: 54,
    minorMidi: 51,
    accidentalList: "6♯ (Fa♯, Do♯, Sol♯, Re♯, La♯, Mi♯) o 6♭ (Si♭, Mi♭, La♭, Re♭, Sol♭, Do♭)",
    chords: "I Fa♯/Sol♭ · ii Sol♯m/La♭m · IV Si/Do♭ · V Do♯/Re♭ · vi Re♯m/Mi♭m",
    instrumentTip: "Justo en el lado opuesto de Do mayor en el círculo (¡polo del tritono!). Encrucijada enarmónica"
  },
  {
    id: "key-5f",
    group: "flat",
    sigBadge: "5 ♭ / 7 ♯",
    majorName: "Re♭ mayor (= Do♯ mayor)",
    minorName: "Si♭ menor (= La♯ menor)",
    rootMidi: 61,
    minorMidi: 58,
    accidentalList: "5♭: Si♭, Mi♭, La♭, Re♭, Sol♭ (enarmónica de Do♯ mayor con 7♯)",
    chords: "I Re♭ · ii Mi♭m · iii Fam · IV Sol♭ · V La♭ · vi Si♭m",
    instrumentTip: "Muy querida en el piano romántico, el soul y las baladas de jazz (aterciopelada bajo las teclas negras)"
  },
  {
    id: "key-4f",
    group: "flat",
    sigBadge: "4 ♭",
    majorName: "La♭ mayor",
    minorName: "Fa menor",
    rootMidi: 56,
    minorMidi: 53,
    accidentalList: "4♭: Si♭, Mi♭, La♭, Re♭",
    chords: "I La♭ · ii Si♭m · iii Dom · IV Re♭ · V Mi♭ · vi Fam",
    instrumentTip: "Gran favorita de los estándares de jazz, las armonías de viento y las baladas de R&B/pop"
  },
  {
    id: "key-3f",
    group: "flat",
    sigBadge: "3 ♭",
    majorName: "Mi♭ mayor",
    minorName: "Do menor",
    rootMidi: 63,
    minorMidi: 60,
    accidentalList: "3♭: Si♭, Mi♭, La♭",
    chords: "I Mi♭ · ii Fam · iii Solm · IV La♭ · V Si♭ · vi Dom",
    instrumentTip: "Tonalidad sinfónica heroica (la Heroica de Beethoven); ideal para saxo alto y metales"
  },
  {
    id: "key-2f",
    group: "flat",
    sigBadge: "2 ♭",
    majorName: "Si♭ mayor",
    minorName: "Sol menor",
    rootMidi: 58,
    minorMidi: 55,
    accidentalList: "2♭: Si♭, Mi♭",
    chords: "I Si♭ · ii Dom · iii Rem · IV Mi♭ · V Fa · vi Solm",
    instrumentTip: "Tonalidad estrella del jazz, las big bands, las bandas de música y las trompetas/clarinetes en Si♭"
  },
  {
    id: "key-1f",
    group: "flat",
    sigBadge: "1 ♭",
    majorName: "Fa mayor",
    minorName: "Re menor",
    rootMidi: 53,
    minorMidi: 62,
    accidentalList: "1♭: Si♭ (el Si♮ baja a Si♭)",
    chords: "I Fa · ii Solm · iii Lam · IV Si♭ · V Do · vi Rem",
    instrumentTip: "Resonancia suave y pastoral; registro natural y cómodo para trompas, flautas y coros"
  }
];

function renderKeysReferenceHTML_ES(circleFilter = "all") {
  const list = KEYS_CIRCLE_DATA_ES.filter(k => circleFilter === "all" || k.group === circleFilter);

  const theoryIntro = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Concepto básico</span>
        <span class="k-ratio-chip">Tonalidad &amp; armaduras</span>
      </div>
      <h4>Escala vs. tonalidad: ¿qué hace realmente una tonalidad?</h4>
      <p>
        Una <strong>escala</strong> no es más que una lista ordenada de alturas (p. ej., Do–Re–Mi–Fa–Sol–La–Si–Do). Una <strong>tonalidad</strong> describe todo el <em>sistema de gravedad magnética</em> alrededor de un centro: fija el punto de reposo (<strong>tónica / fundamental</strong>), el color (<strong>mayor</strong> luminoso vs. <strong>menor</strong> profundo) y las alteraciones permanentes mediante la <strong>armadura</strong> (♯ o ♭).
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>¿Por qué existen las armaduras?</strong>
          Toda escala mayor exige exactamente el mismo esquema de distancias: <code>T – T – ½T – T – T – T – ½T</code> (semitonos entre 3–4 y 7–8). Si se parte de <code>Sol</code> en lugar de Do, el 7.º grado (<code>Fa</code>) queda demasiado bajo: ¡hay que subirlo a <code>Fa♯</code> para recuperar la sensible!
        </div>
        <div class="physics-fact-item">
          <strong>Armadura vs. alteración accidental</strong>
          La <strong>armadura</strong>, colocada justo al lado de la clave, se aplica a toda la pieza. Una <strong>alteración accidental</strong> en medio de un compás solo vale hasta la siguiente barra de compás, para un matiz pasajero.
        </div>
      </div>
    </article>

    <div class="k-sibling-bar">
      <span><strong>Explorar con la vista &amp; el oído:</strong> Abre la rueda interactiva del círculo de quintas con acordes y modulaciones en directo.</span>
      <button type="button" class="btn-tool" data-jump-ref="circle-of-fifths">Abrir el círculo de quintas →</button>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Lógica del círculo de quintas</span>
        <span class="k-ratio-chip">3:2 → 12 tonalidades</span>
      </div>
      <h4>Por qué las 12 tonalidades forman un reloj perfecto</h4>
      <p>
        Justo después de la octava (2:1), la <strong>quinta justa (3:2)</strong> es el vínculo armónico más fuerte de la música. Avanza en el sentido de las agujas del reloj por quintas ascendentes (<code>Do → Sol → Re → La → Mi → Si → Fa♯</code>): cada paso añade un nuevo <strong>sostenido (♯)</strong>. Retrocede en sentido contrario por cuartas ascendentes (<code>Do → Fa → Si♭ → Mi♭ → La♭ → Re♭ → Sol♭</code>): cada paso añade un nuevo <strong>bemol (♭)</strong>.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Sentido horario: tonalidades con sostenidos (♯)</h5>
          <p><strong>Orden de las tonalidades:</strong> <em>Sol, Re, La, Mi, Si, Fa♯</em>.<br><strong>Orden de los sostenidos:</strong> <code>Fa♯ – Do♯ – Sol♯ – Re♯ – La♯ – Mi♯</code> (<em>Fa Do Sol Re La Mi Si</em>: ¡el último sostenido es siempre la sensible, un semitono por debajo de la tónica!).</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Sentido antihorario: tonalidades con bemoles (♭)</h5>
          <p><strong>Orden de las tonalidades:</strong> <em>Fa, Si♭, Mi♭, La♭, Re♭, Sol♭</em>.<br><strong>Orden de los bemoles:</strong> <code>Si♭ – Mi♭ – La♭ – Re♭ – Sol♭ – Do♭</code> (<em>Si Mi La Re Sol Do Fa</em>). Truco: ¡el <strong>penúltimo bemol</strong> da nombre a la tonalidad mayor!</p>
        </div>
      </div>
      <p class="k-tip"><strong>Coma pitagórica &amp; enarmonía:</strong> Apilar 12 quintas puras 3:2 supera 7 octavas en unos 23,5 cents (la <em>coma pitagórica</em>). El <strong>temperamento igual moderno</strong> reparte esa microdiferencia entre los 12 semitonos, de modo que <code>Fa♯ mayor</code> (6♯) y <code>Sol♭ mayor</code> (6♭) coinciden exactamente en las mismas teclas del piano.</p>
    </article>

    <div class="section-heading-row">
      <h2 class="section-heading">3. Atlas completo de las 12 tonalidades</h2>
    </div>

    <div class="k-filter-row" aria-label="Filtrar las tonalidades por armadura">
      <button class="k-filter-pill ${circleFilter === "all" ? "active" : ""}" data-kfilter="all">Las 12 tonalidades</button>
      <button class="k-filter-pill ${circleFilter === "neutral" ? "active" : ""}" data-kfilter="neutral">Do / Lam (0 alt.)</button>
      <button class="k-filter-pill ${circleFilter === "sharp" ? "active" : ""}" data-kfilter="sharp">Sostenidos (♯)</button>
      <button class="k-filter-pill ${circleFilter === "flat" ? "active" : ""}" data-kfilter="flat">Bemoles (♭)</button>
    </div>
  `;

  const keyCards = list.map(k => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${k.group === "neutral" ? "tag-sage" : k.group === "sharp" ? "tag-peach" : "tag-lilac"}">${k.sigBadge}</span>
        <span class="k-ratio-chip">${k.majorName} / ${k.minorName}</span>
      </div>
      <h4>${k.majorName} &amp; relativo ${k.minorName}</h4>
      <p><strong>Armadura:</strong> ${k.accidentalList}</p>
      <p><strong>Acordes diatónicos:</strong> <code>${k.chords}</code></p>
      <p class="k-tip">${k.instrumentTip}</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-key-cadence="${k.rootMidi}" data-key-mode="major">▶ Cadencia ${k.majorName.split(" ")[0]} may.</button>
        <button class="btn-tool" data-play-key-cadence="${k.minorMidi}" data-key-mode="minor">▶ ${k.minorName}</button>
      </div>
    </article>
  `).join("");

  const extraSections = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. Las 3 caras del menor</span>
        <span class="k-ratio-chip">Por qué hay 3 escalas menores</span>
      </div>
      <h4>Menor natural, armónica &amp; melódica (en La menor)</h4>
      <p>
        Mientras el mayor mantiene una forma única, la música en menor usa tres variantes complementarias porque al menor natural le falta una sensible a un semitono de la tónica (<code>Sol → La</code> es un tono entero, menos incisivo que <code>Sol♯ → La</code>):
      </p>
      <ul class="k-physics-list">
        <li><strong>Menor natural (eólica):</strong> Toma exactamente la armadura de su relativo mayor (<code>La–Si–Do–Re–Mi–Fa–Sol–La</code>). Folk, auténtica y fluida.</li>
        <li><strong>Menor armónica:</strong> Eleva el 7.º grado (<code>Sol → Sol♯</code>) para que el grado V se convierta en una verdadera <strong>dominante mayor (Mi7)</strong>. Deja un intervalo expresivo de 3 semitonos entre <code>Fa</code> y <code>Sol♯</code>.</li>
        <li><strong>Menor melódica:</strong> Suaviza ese salto para los cantantes elevando también el 6.º grado al subir (<code>Fa → Fa♯, Sol → Sol♯</code>); la música clásica suele bajar de nuevo en menor natural, mientras que el jazz mantiene la forma elevada en ambos sentidos.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G4,A4" data-dur="0.45" data-step="320">▶ La menor natural</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G#4,A4" data-dur="0.45" data-step="320">▶ La menor armónica</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F#4,G#4,A4" data-dur="0.45" data-step="320">▶ La menor melódica</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Relaciones entre tonalidades &amp; modulaciones</span>
        <span class="k-ratio-chip">Cambiar de tonalidad</span>
      </div>
      <h4>Cómo dialogan las tonalidades &amp; modulan con suavidad</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Relativo menor / mayor (3 semitonos de distancia)</strong>
          Comparten exactamente las mismas notas y la misma armadura: <code>Do mayor ↔ La menor</code>, <code>Sol mayor ↔ Mi menor</code>. Pasar de un centro al otro resulta natural y evidente.
        </div>
        <div class="physics-fact-item">
          <strong>Homónimo mayor / menor (misma tónica)</strong>
          Mantienen la misma tónica pero intercambian mayor y menor: <code>Do mayor ↔ Do menor</code> (¡3 bemoles de diferencia!). Ofrece giros teatrales como la famosa «tercera de picardía».
        </div>
        <div class="physics-fact-item">
          <strong>Tonalidades vecinas (vecinas en el círculo)</strong>
          Las vecinas a un paso en sentido horario o antihorario (<code>Do mayor ↔ Sol</code> o <code>Fa</code>) solo difieren en una nota. Los acordes pivote (como <code>Lam</code>) aseguran transiciones imperceptibles.
        </div>
        <div class="physics-fact-item">
          <strong>Mediantes cromáticas &amp; modulación de un tono</strong>
          Deslizarse una tercera (<code>Do → La♭</code> o <code>Mi</code>) cambia varias alteraciones de golpe para un efecto de pantalla grande inmediato, mientras que una subida directa de un semitono o un tono en el último estribillo multiplica la energía.
        </div>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-custom="key-variant">▶ Homónimos Do ↔ Dom</button>
        <button class="btn-tool" data-play-custom="key-mediant">▶ Mediante Do → La♭ → Do</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">6. Instrumentos transpositores &amp; color de las tonalidades</span>
        <span class="k-ratio-chip">Práctica de conjunto</span>
      </div>
      <h4>Por qué los vientos no leen la misma armadura que el piano</h4>
      <p>
        Mientras que el piano, la guitarra, las cuerdas y la flauta leen en <strong>Do (sonido real)</strong>, muchos instrumentos de viento transportan para que las mismas digitaciones sirvan de un modelo a otro:
      </p>
      <ul class="k-physics-list">
        <li><strong>Instrumentos en Si♭ (trompeta, clarinete, saxofón tenor):</strong> Un <code>Do</code> escrito suena como un <code>Si♭</code> real (una segunda mayor más grave). Cuando el grupo toca en <code>Si♭ mayor (2♭)</code>, ¡la trompeta lee tranquilamente en <code>Do mayor (0 alteraciones)</code>!</li>
        <li><strong>Instrumentos en Mi♭ (saxofón alto, saxo barítono):</strong> Un <code>Do</code> escrito suena como un <code>Mi♭</code> real (una sexta mayor por debajo). Cuando el conjunto toca en <code>Mi♭ mayor (3♭)</code>, el saxo alto lee en <code>Do mayor</code>.</li>
        <li><strong>Instrumentos en Fa (trompa, corno inglés):</strong> Un <code>Do</code> escrito suena una quinta justa más grave, como un <code>Fa</code> real.</li>
      </ul>
      <p class="k-tip"><strong>«Carácter» de las tonalidades:</strong> Antes del temperamento igual, las desigualdades de afinación daban a cada tonalidad un aroma propio (<em>Re♭</em> aterciopelado, <em>Re</em> brillante). Hoy las 12 tonalidades comparten las mismas proporciones matemáticas, pero los instrumentos reales siguen coloreando cada tonalidad con sus cuerdas al aire, su tubo acústico y la tesitura vocal.</p>
    </article>
  `;

  return theoryIntro + `<div class="knowledge-list">${keyCards}</div>` + extraSections;
}

function renderSingAndPlayReferenceHTML_ES() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">1. Por qué la coordinación se atasca al principio</span>
        <span class="k-ratio-chip">Piloto automático &amp; foco</span>
      </div>
      <h4>Por qué cantar acompañándose parece tan difícil al principio</h4>
      <p>
        En el momento en que tocas y cantas a la vez, dos sistemas totalmente independientes comparten exactamente el mismo tempo: tus <strong>manos</strong> (memoria motora, posiciones de acordes, rasgueo) y tu <strong>voz</strong> (respiración, afinación, letra). La memoria de trabajo simplemente no puede controlar con lupa dos novedades a la vez.
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Pon al menos una parte en piloto automático</strong>
          Mientras voz y manos choquen, tu cerebro sigue dirigiendo activamente ambas. Solución: repite el acompañamiento (o la línea vocal) hasta que fluya solo, como subir una escalera.
        </div>
        <div class="physics-fact-item">
          <strong>Asegura el ritmo antes que las notas</strong>
          ¡El 90 % de los bloqueos son rítmicos, no melódicos! Cuando una sílaba cae entre dos golpes, las manos se congelan, mientras ambos ritmos no se hayan alineado con claridad.
        </div>
        <div class="physics-fact-item">
          <strong>Tararea primero con «La» o «Du»</strong>
          Memorizar una letra consume una energía mental enorme. Tararear la melodía con una sola sílaba neutra libera al instante atención para la afinación y el groove.
        </div>
        <div class="physics-fact-item">
          <strong>Un solo pulso interno compartido</strong>
          Deja que un ligero golpe de pie o un metrónomo mande: tu voz no corre detrás de tus manos y tus manos no esperan a la voz; <em>ambas</em> responden al mismo tiempo.
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Practicar con eficacia en 5 pasos</span>
        <span class="k-ratio-chip">Método paso a paso</span>
      </div>
      <h4>La rutina probada en 5 pasos para cualquier canción</h4>
      <p>
        En lugar de empezar siempre desde el compás 1 y tropezar en el mismo pasaje, descompón brevemente la coordinación en cinco pasos concretos:
      </p>
      <ul class="article-steps-list">
        <li>
          <strong>1. La prueba de la conversación (automatizar las manos):</strong> Repite en bucle tu acompañamiento 1–2 minutos hasta poder contar en voz alta hasta 20 o charlar tranquilamente por encima. Si tus manos se traban al hablar, regálate 5 minutos más de instrumento solo.
        </li>
        <li>
          <strong>2. Decir la letra a ritmo:</strong> Toca tus acordes mientras <strong>recitas la letra estrictamente a compás</strong> en una altura hablada cómoda. Quitar la melodía revela al instante qué sílabas caen en los tiempos y cuáles entre los golpes.
        </li>
        <li>
          <strong>3. Localizar los puntos de encuentro físicos:</strong> Anota referencias exactas: <em>«El pulgar toca el bajo en la palabra “noche”»</em> o <em>«“libre” cae en el rasgueo hacia arriba entre 2 y 3»</em>. ¡El cerebro se sincroniza sin esfuerzo con referencias concretas!
        </li>
        <li>
          <strong>4. Aligerar los acordes &amp; repetir 1–2 compases en bucle:</strong> Empieza literalmente con <strong>un solo acorde plaqué en el tiempo 1</strong> mientras cantas libremente por encima. Cuando sea sólido, añade el tiempo 3 y luego vuelve a introducir el ritmo completo, ¡siempre en pequeños bucles de 1–2 compases!
        </li>
        <li>
          <strong>5. Cámara lenta (60 %) &amp; «canto fantasma»:</strong> Reduce el tempo casi a la mitad. En las entradas difíciles, articula en silencio o piensa la melodía durante una vuelta de acompañamiento, tararéala en la siguiente y luego cántala con decisión.
        </li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">3. Ejercicios diarios de independencia</span>
        <span class="k-ratio-chip">Para probar ahora</span>
      </div>
      <h4>6 ejercicios concretos de coordinación &amp; independencia</h4>
      <p>
        De cinco a ocho minutos con uno o dos de estos ejercicios antes de tu repertorio desbloquean la independencia mucho más rápido que repetir a la fuerza:
      </p>
      <ul class="k-physics-list">
        <li>
          <strong>Ejercicio 1 – Prueba de hablar &amp; contar:</strong> Toca una progresión fluida de cuatro acordes (<code>I – V – vi – IV</code>) con un groove regular mientras lees en voz alta un texto breve o cuentas hacia atrás de 20 a 1. Regla: el groove no debe moverse ni un milímetro.
        </li>
        <li>
          <strong>Ejercicio 2 – Acordes redondos en el tiempo 1:</strong> Toca cada acorde una sola vez en el tiempo 1 (tenido como redonda) y canta toda la estrofa en esa resonancia abierta. Desarrolla el fraseo, la gestión de la respiración y los cambios de acorde sin prisas.
        </li>
        <li>
          <strong>Ejercicio 3 – Bordón fijo de quinta:</strong> Mantén en el instrumento un bordón sencillo de fundamental + quinta (<code>Do3 + Sol3</code>) mientras cantas melodías o intervalos por encima. Trabaja el oído sin cargar la mano izquierda.
        </li>
        <li>
          <strong>Ejercicio 4 – Anticipaciones &amp; la trampa del «4-y»:</strong> En el pop y el soul, el canto suele empezar medio tiempo <em>antes</em> (en el <code>4-y</code>) mientras la guitarra o el piano cambian limpiamente en el tiempo 1. Marca negras regulares mientras la voz entra justo en la «y».
        </li>
        <li>
          <strong>Ejercicio 5 – Bajo en movimiento vs. nota cantada tenida:</strong> Haz caminar una línea de bajo sencilla (p. ej., <code>Do – Fa – Sol – Do</code>) mientras la voz mantiene una nota común estable (<code>Sol</code>), o al revés: mantén un acorde fijo mientras cantas la escala.
        </li>
        <li>
          <strong>Ejercicio 6 – El control de 20 segundos con el móvil:</strong> Graba un bucle corto con el móvil y escúchalo enseguida. Escuchar desde fuera revela al instante los tiempos perdidos o las aceleraciones.
        </li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Ej. 1: groove para hablar por encima</button>
        <button class="btn-tool" data-play-custom="sp-drone">▶ Ej. 3: bordón + melodía</button>
        <button class="btn-tool" data-play-custom="sp-syncopation">▶ Ej. 4: tiempo vs. anticipación</button>
        <button class="btn-tool" data-play-custom="sp-poly">▶ Ej. 5: bajo en movimiento, nota tenida</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. Trucos por instrumento &amp; errores frecuentes</span>
        <span class="k-ratio-chip">Guitarra, piano &amp; voz</span>
      </div>
      <h4>Consejos concretos para ahorrarte semanas de esfuerzo</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Guitarra: mantén el péndulo en movimiento</strong>
          Tu antebrazo derecho es un metrónomo ininterrumpido (<em>abajo – arriba – abajo – arriba</em>). Incluso durante los silencios o las síncopas vocales, no detengas nunca el brazo: pasa simplemente por encima de las cuerdas sin tocarlas.
        </div>
        <div class="physics-fact-item">
          <strong>Piano: superpón un ritmo cada vez</strong>
          Empieza solo con <em>fundamentales en la mano izquierda en el tiempo 1 + canto</em>. Después añade acordes tranquilos con la derecha en 1 y 3. Los arpegios cerrados o los contracantos llegan solo al final.
        </div>
        <div class="physics-fact-item">
          <strong>Transporta a tu tesitura cómoda</strong>
          Forzar agudos incómodos destruye al instante la coordinación de las manos. No dudes nunca en poner una <strong>cejilla</strong> o transportar ±2 semitonos para que la voz fluya con soltura.
        </div>
        <div class="physics-fact-item">
          <strong>Programa tus respiraciones como si fueran notas</strong>
          ¡Los tropiezos suelen ocurrir entre dos frases y no en medio del compás! Reserva conscientemente una respiración de un cuarto de tiempo antes del estribillo mientras el instrumento sigue tranquilamente.
        </div>
      </div>
      <p class="k-tip"><strong>Truco extra de Lauscher:</strong> En los módulos <strong>Solfeo</strong> y <strong>Melodías</strong> de Lauscher, intenta cantar en voz alta la nota buscada <em>antes</em> de pulsar la tecla: así unes oído, voz y dedos en un solo reflejo.</p>
    </article>
  `;
}

function renderCircleOfFifthsTheoryHTML_ES() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. La idea clave</span>
        <span class="k-ratio-chip">3:2 • 12 tonalidades</span>
      </div>
      <h4>¿Qué es el círculo de quintas y por qué un círculo?</h4>
      <p>
        Justo después de la octava (<code>2:1</code>), la <strong>quinta justa (3:2)</strong> es el vínculo acústico más potente de la música. Al subir de quinta en quinta desde <strong>Do</strong> (<code>Do → Sol → Re → La → Mi → Si → Fa♯…</code>), cada paso eleva una sola nota para formar la siguiente sensible, añadiendo <strong>un sostenido (♯)</strong> en el sentido de las agujas del reloj. Al bajar por quintas (es decir, subiendo por <strong>cuartas</strong>: <code>Do → Fa → Si♭ → Mi♭ → La♭ → Re♭ → Sol♭</code>), el color se suaviza a cada paso y se añade <strong>un bemol (♭)</strong> en sentido contrario.
      </p>
      <p>
        Al cabo de 12 pasos, el temperamento igual cierra la espiral sobre sí misma a <strong>las 6 en punto (Fa♯ / Sol♭)</strong>, donde 6 sostenidos y 6 bemoles caen exactamente en las mismas teclas del piano (<strong>enarmonía</strong>). En lugar de memorizar 12 escalas aisladas, ¡tienes una sola brújula musical!
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Sentido horario (+1 ♯) • quintas ascendentes</h5>
          <p><code>Do → Sol → Re → La → Mi → Si → Fa♯</code><br>El brillo sube paso a paso. Orden de los sostenidos: <code>Fa♯ – Do♯ – Sol♯ – Re♯ – La♯ – Mi♯</code> (<em>Fa – Do – Sol – Re – La – Mi – Si</em>).</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Sentido antihorario (+1 ♭) • cuartas ascendentes</h5>
          <p><code>Do → Fa → Si♭ → Mi♭ → La♭ → Re♭ → Sol♭</code><br>El color se calienta y se calma. Orden inverso de los bemoles: <code>Si♭ – Mi♭ – La♭ – Re♭ – Sol♭ – Do♭</code> (<em>Si – Mi – La – Re – Sol – Do – Fa</em>).</p>
        </div>
      </div>
    </article>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-peach">2. Instrucciones de uso</span>
            <span class="k-ratio-chip">Lógica del reloj</span>
          </div>
          <h4>Leer y usar la rueda en 20 segundos</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Círculo exterior = mayor, círculo interior = relativo menor:</strong> Cada porción asocia una tonalidad mayor con su <strong>relativo menor</strong> justo debajo (<code>Do / Lam</code>, <code>Sol / Mim</code>, <code>Re / Sim</code>…). Ambas comparten exactamente <em>las mismas 7 notas y la misma armadura</em>: el menor solo desplaza el centro 3 semitonos más abajo (6.º grado / <em>La</em>).</li>
          <li><strong>El truco instantáneo para los sostenidos:</strong> Mira el <em>último sostenido</em> de la armadura y sube <strong>un semitono</strong>: ¡esa es tu tónica mayor! (p. ej., 2 sostenidos <code>Fa♯, Do♯</code> → un semitono por encima de <code>Do♯</code> = <strong>Re mayor</strong>).</li>
          <li><strong>El truco instantáneo para los bemoles:</strong> ¡El <em>penúltimo bemol</em> de la armadura da directamente nombre a la tonalidad mayor! (p. ej., 3 bemoles <code>Si♭, Mi♭, La♭</code> → el penúltimo es <strong>Mi♭ mayor</strong>; solo <code>1♭ = Fa mayor</code> se recuerda tal cual).</li>
          <li><strong>Leer izquierda, centro y derecha como una brújula:</strong> Toda casilla elegida vale <code>I</code> (tónica). ¡Su vecina de la izquierda es siempre la <strong>subdominante (IV)</strong> y su vecina de la derecha es siempre la <strong>dominante (V)</strong>!</li>
        </ul>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-lilac">3. Un superpoder musical</span>
            <span class="k-ratio-chip">Aplicaciones concretas</span>
          </div>
          <h4>¿Qué cambia en cuanto dominas el círculo?</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>1. Mapa instantáneo de los acordes de una tonalidad</strong>
            Observa las 3 porciones iluminadas arriba: ¡la tónica y sus dos vecinas inmediatas reúnen los <strong>6 acordes diatónicos principales</strong> de la tonalidad (<code>IV – I – V</code> por fuera + <code>ii – vi – iii</code> por dentro)! Miles de éxitos de pop, rock y folk caben en esta sola porción de tarta.
          </div>
          <div class="physics-fact-item">
            <strong>2. Transportar sin cálculo mental</strong>
            ¿Demasiado agudo para cantar? Gira ese bloque de 3 porciones alrededor del reloj: todas las relaciones se mantienen intactas (<code>I–V–vi–IV</code> en Do pasa un paso a <code>Sol–Re–Mim–Do</code> o, a la izquierda, a <code>Fa–Do–Rem–Si♭</code>).
          </div>
          <div class="physics-fact-item">
            <strong>3. Modulaciones suaves &amp; sorpresas</strong>
            Dos casillas vecinas solo difieren en <strong>una nota</strong> (¡6 notas comunes de 7!), lo que ofrece modulaciones fluidas entre estrofa y estribillo. Cruzar el círculo hasta el lado opuesto (6 pasos / tritono) renueva casi todas las notas para un efecto dramático máximo.
          </div>
          <div class="physics-fact-item">
            <strong>4. Oído armónico &amp; lectura más rápidos</strong>
            ¡Fíjate en cómo las famosas progresiones de jazz/pop (<code>iii – vi – ii – V – I</code>) avanzan <em>en sentido antihorario</em> paso a paso por la rueda! Tu oído anticipa geométricamente la siguiente fundamental.
          </div>
        </div>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">4. Ejercicios prácticos</span>
            <span class="k-ratio-chip">Tocar &amp; escuchar</span>
          </div>
          <h4>4 formas concretas de practicar con el círculo</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Salir del dúo «Do &amp; Sol»:</strong> Toma cualquier frase, escala o progresión y desplázala un paso en sentido horario cada día (<code>Do → Sol → Re → La</code>) o por las tonalidades de viento (<code>Fa → Si♭ → Mi♭ → La♭</code>). En 12 días habrás recorrido todo el mástil o todo el teclado.</li>
          <li><strong>Escuchar las progresiones por quintas (<code>vi–ii–V–I</code>):</strong> Cuenta retrocediendo hacia las 12: ¡cada acorde actúa como una minidominante atraída por la porción siguiente! Pulsa el botón de abajo para sentir esa gravedad magnética en Do mayor.</li>
          <li><strong>Tomar prestado un color vecino (dominantes secundarias):</strong> En Do mayor, ¿quieres más impulso antes de <code>Sol (V)</code>? Toma prestado el <code>Fa♯</code> de la vecina de la derecha para convertir el menor <code>ii (Rem)</code> en un luminoso <strong>Re7 (V/V)</strong> que apunta directo a Sol.</li>
          <li><strong>Contraponer llamada cálida y vuelo luminoso:</strong> Girar a la izquierda en la rueda (<code>I → IV → bVII</code>) da una base soul y asentada; subir a la derecha (<code>I → V → V/V</code>) insufla impulso y luminosidad.</li>
        </ul>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-progression="vi,ii,V7,I">▶ Escuchar la gravedad del círculo (Lam–Rem–Sol7–Do)</button>
          <button class="btn-tool" data-play-progression="I,V/V,V,I">▶ Escuchar el impulso horario (Do–Re (V/V)–Sol–Do)</button>
        </div>
      </div>
    </details>
  `;
}

function getIntervalNamingGuideHTML_ES() {
  const useGerman = typeof state !== "undefined" ? state?.profile?.intervalNotation !== "intl" : true;
  const schemeBadge = useGerman ? "Activo: P / G / k" : "Activo: P / M / m";
  const m2 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m2") : "m2";
  const M2 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M2") : "M2";
  const m3 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m3") : "m3";
  const M3 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M3") : "M3";
  return `
    <details class="knowledge-card k-accordion" id="intervalNamingGuideAccordion" open>
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">Abreviaturas &amp; nombres</span>
            <span class="k-ratio-chip">${schemeBadge}</span>
          </div>
          <h4>Cómo leer la notación abreviada (letra + número)</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <p>Cada código de intervalo concentra dos informaciones en dos caracteres: el <strong>número</strong> indica la cantidad de grados de la escala y la <strong>letra</strong> precisa la anchura exacta en semitonos.</p>
        <ul class="k-physics-list">
          <li><strong>1. El número (<code>1</code>–<code>9</code>) cuenta los nombres de nota:</strong> Desde <code>1</code> = unísono (la misma nota), <code>2</code> = segunda, <code>3</code> = tercera, <code>4</code> = cuarta, <code>5</code> = quinta, <code>6</code> = sexta, <code>7</code> = séptima, <code>8</code> = octava, hasta <code>9</code> = novena.</li>
          <li><strong>2. Intervalos justos (<code>P</code>):</strong> <code>P1</code>, <code>P4</code>, <code>P5</code> y <code>P8</code> solo existen en una forma pura (<em>Perfect</em> / justa): sin variante mayor ni menor.</li>
          <li><strong>3. Parejas mayor &amp; menor (<code>2</code>, <code>3</code>, <code>6</code>, <code>7</code>, <code>9</code>):</strong> Estos cinco intervalos existen en dos matices separados por <strong>1 semitono</strong>:<br>
            – <strong>Internacional (<code>P / M / m</code>):</strong> la <strong><code>M</code></strong> mayúscula (<em>Major</em> / mayor) designa el intervalo grande y luminoso; la <strong><code>m</code></strong> minúscula (<em>minor</em> / menor) mide 1 semitono menos (p. ej., <code>M3</code> vs. <code>m3</code>). ¡La minúscula lo cambia todo!<br>
            – <strong>Alemán (<code>P / G / k</code>):</strong> <strong><code>G</code></strong> mayúscula (<em>Groß</em> = mayor) vs. <strong><code>k</code></strong> minúscula (<em>klein</em> = menor, p. ej., <code>G3</code> vs. <code>k3</code>).</li>
          <li><strong>4. Tritono (<code>TT</code>):</strong> Divide la octava exactamente en dos a <strong>6 semitonos</strong>, justo entre <code>P4</code> y <code>P5</code> (cuarta aumentada / quinta disminuida).</li>
        </ul>
        <div class="k-meta-box">
          <div><strong>Símbolos activos:</strong> 2.as: <code>${m2}</code> (1 st) vs. <code>${M2}</code> (2 st) · 3.as: <code>${m3}</code> (3 st) vs. <code>${M3}</code> (4 st)</div>
          <div><strong>Personalizar:</strong> Alterna libremente entre <strong>Internacional (P / M / m)</strong> y <strong>Alemán (P / G / k)</strong> en <strong>Ajustes → Notación musical → Nombres de los intervalos</strong>.</div>
        </div>
      </div>
    </details>
  `;
}

function renderNotationReferenceHTML_ES() {
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
        <span class="k-card-tag tag-peach">1. El pentagrama de 5 líneas</span>
        <span class="k-ratio-chip">Líneas &amp; espacios</span>
      </div>
      <h4>Cómo la música se vuelve legible sobre el papel</h4>
      <p>
        La partitura funciona como un sistema de coordenadas: el <strong>eje vertical</strong> representa la altura (más arriba = más agudo, más abajo = más grave) y el <strong>eje horizontal</strong> hace avanzar el tiempo de izquierda a derecha.
      </p>
      <ul class="k-physics-list">
        <li><strong>Contar siempre de abajo arriba:</strong> Un pentagrama tiene <strong>5 líneas</strong> (la 1.ª abajo hasta la 5.ª arriba) y <strong>4 espacios</strong> entre ellas.</li>
        <li><strong>Alternancia línea – espacio:</strong> Pasar de una línea al espacio vecino equivale siempre a avanzar <strong>un solo escalón diatónico</strong> (<code>C → D → E → F → G → A → B</code> / Do a Si).</li>
        <li><strong>Por qué la clave es imprescindible:</strong> Sin clave, las líneas están mudas: es la clave la que fija una <em>nota de referencia precisa</em> en una de las líneas.</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Las 3 claves principales (y claves especiales)</span>
        <span class="k-ratio-chip">Sol • Fa • Ut 3</span>
      </div>
      <h4>Tres miradas sobre el mismo teclado</h4>
      <p>
        La línea resaltada en naranja indica el <strong>punto de anclaje</strong> exacto de cada clave. Recuerda esa única referencia para deducir todas las notas vecinas en un instante.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${trebleAnchorSvg}
          <h5>Clave de Sol (G)</h5>
          <p>Su rizo central rodea la <strong>2.ª línea = Sol4 (G4)</strong>. Estándar para el canto (soprano/contralto), el violín, la flauta, la trompeta, la guitarra y la mano derecha del piano.</p>
          <p><strong>Referencias (abajo → arriba):</strong> líneas <em>Mi – Sol – Si – Re – Fa</em>; espacios <em>Fa – La – Do – Mi</em>.</p>
          <button type="button" class="btn-tool" data-play-solo-note="G4">▶ Escuchar el anclaje G4</button>
        </div>
        <div class="notation-knowledge-card">
          ${bassAnchorSvg}
          <h5>Clave de Fa (F)</h5>
          <p>Los dos puntos rodean la <strong>4.ª línea = Fa3 (F3)</strong>. Imprescindible para la mano izquierda del piano, el violonchelo, el contrabajo, el bajo, el trombón y las voces graves.</p>
          <p><strong>Referencias (abajo → arriba):</strong> líneas <em>Sol – Si – Re – Fa – La</em>; espacios <em>La – Do – Mi – Sol</em>.</p>
          <button type="button" class="btn-tool" data-play-solo-note="F3">▶ Escuchar el anclaje F3</button>
        </div>
        <div class="notation-knowledge-card">
          ${altoAnchorSvg}
          <h5>Clave de Do en 3.ª línea (contralto)</h5>
          <p>Su centro apunta directamente a la <strong>3.ª línea (central) = Do central (C4)</strong>. Clave natural de la viola (orquesta) y de muchas partituras polifónicas.</p>
          <p><strong>Truco de simetría:</strong> <code>C4</code> en el centro coloca <em>Mi</em> (4.ª) y <em>Sol</em> (5.ª) por encima, y <em>La</em> (2.ª) y luego <em>Fa</em> (1.ª) justo por debajo.</p>
          <button type="button" class="btn-tool" data-play-solo-note="C4">▶ Escuchar el anclaje C4</button>
        </div>
      </div>

      <div class="k-meta-box">
        <div><strong>El mismo Do central (C4) une las tres claves:</strong> En <strong>clave de Sol</strong> está en la 1.ª línea adicional <em>por debajo</em>; en <strong>clave de Do en 3.ª</strong>, justo en el <em>centro (3.ª línea)</em>; en <strong>clave de Fa</strong>, en la 1.ª línea adicional <em>por encima</em>.</div>
        <div><strong>Claves especiales (vista previa):</strong> La <strong>clave de Do en 4.ª (tenor)</strong> coloca el mismo Do central en la 4.ª línea para los pasajes agudos del violonchelo, el fagot o el trombón, mientras que las claves octavadas (<code>8vb</code> / <code>8va</code>) evitan amontonar líneas para la guitarra o el flautín.</div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Hasta 3 líneas adicionales</span>
        <span class="k-ratio-chip">±3 líneas adic.</span>
      </div>
      <h4>Leer arriba y abajo sin contar línea a línea</h4>
      <p>
        Cuando la melodía sale de las 5 líneas, unos trazos cortos llamados <strong>líneas adicionales</strong> prolongan localmente el pentagrama. Aquí practicas con hasta <strong>3 líneas adicionales arriba y abajo</strong>: la tesitura real de las partituras de orquesta y de piano.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${ledgerSvg}
          <h5>Clave de Sol: ±3 líneas adicionales</h5>
          <p>A la izquierda: 3.ª, 2.ª y 1.ª líneas por debajo (<code>F3 – A3 – C4</code>); en el centro: <code>B4</code>; a la derecha: 1.ª, 2.ª y 3.ª líneas por encima (<code>A5 – C6 – E6</code>).</p>
        </div>
        <div class="notation-knowledge-card">
          ${ledgerBassSvg}
          <h5>Clave de Fa: graves profundos &amp; agudo melódico</h5>
          <p>Hacia abajo: 3 líneas descienden hasta <code>A1</code>; hacia arriba: el Do central (<code>C4</code>) se abre hasta <code>E4</code> y <code>G4</code>.</p>
        </div>
      </div>
      <ul class="k-physics-list">
        <li><strong>Memoriza 2 balizas fuera del pentagrama:</strong> Fija la 1.ª y la 2.ª línea adicional (p. ej., <code>C4</code> y <code>A3</code> bajo la clave de Sol, <code>A5</code> y <code>C6</code> por encima) para identificar al instante cada grado vecino.</li>
        <li><strong>Localiza los saltos de tercera:</strong> Pasar directamente de una línea adicional a la siguiente salta siempre una <strong>tercera</strong> (principio de los acordes apilados).</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Alteraciones &amp; sistemas de nombres</span>
        <span class="k-ratio-chip">♯ • ♭ • B vs H</span>
      </div>
      <h4>Teclas negras, enarmonía &amp; la particularidad alemana</h4>
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
            <li><strong>Sostenido (<code>♯</code>):</strong> Sube la nota <strong>1 semitono</strong> (una tecla a la derecha). <code>F</code> se convierte en <code>F♯</code>.</li>
            <li><strong>Bemol (<code>♭</code>):</strong> Baja la nota <strong>1 semitono</strong> (una tecla a la izquierda). <code>G</code> se convierte en <code>G♭</code>.</li>
            <li><strong>Enarmonía:</strong> En un teclado, <code>F♯</code> y <code>G♭</code> tocan exactamente la misma tecla negra: solo su función armónica cambia la escritura.</li>
            <li><strong>Atención a la notación alemana:</strong> En la notación alemana, la nota blanca <em>Si (B)</em> se escribe <strong>H</strong>, ¡y el <em>Si♭ (B♭)</em> se escribe <strong>B</strong>! Cambia fácilmente entre ambos sistemas en los <em>Ajustes de la app</em>.</li>
          </ul>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Armaduras &amp; lectura a primera vista</span>
        <span class="k-ratio-chip">Armadura ♯/♭ + ♮</span>
      </div>
      <h4>Cuando las alteraciones se aplican a todo el pentagrama</h4>
      <p>
        En lugar de volver a escribir un <code>♯</code> o un <code>♭</code> delante de cada nota, la armadura colocada <strong>justo después de la clave</strong> modifica automáticamente esos grados en <strong>todas las octavas</strong> hasta que aparece un becuadro (<code>♮</code>).
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${keySigSharpSvg}
          <h5>Tonalidades con sostenidos (orden: Fa – Do – Sol – Re – La – Mi)</h5>
          <p>En <strong>Re mayor (2♯)</strong>, cada <code>Fa</code> se convierte en <code>Fa♯</code> y cada <code>Do</code> en <code>Do♯</code>; solo el becuadro (<code>♮</code>) delante de la 3.ª nota devuelve el Fa natural.</p>
        </div>
        <div class="notation-knowledge-card">
          ${keySigFlatSvg}
          <h5>Tonalidades con bemoles (orden: Si – Mi – La – Re – Sol – Do)</h5>
          <p>En <strong>Mi♭ mayor (3♭)</strong>, <code>Si♭</code>, <code>Mi♭</code> y <code>La♭</code> rigen todo el pentagrama desde el principio hasta que aparezca, si acaso, un becuadro (<code>♮</code>).</p>
        </div>
      </div>
    </article>
  `;
}

function renderArrangingReferenceHTML_ES() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. ¿Qué es el arreglo?</span>
        <span class="k-ratio-chip">Boceto → obra completa</span>
      </div>
      <h4>El arte de transformar una idea musical en un universo sonoro vivo</h4>
      <p>
        Si la <strong>composición</strong> es el plano de una canción (melodía, acordes básicos y letra), el <strong>arreglo</strong> es toda su arquitectura, su iluminación y su paleta de colores: <em>¿Quién toca qué, en qué momento, en qué octava, con qué ritmo, qué dinámica y qué timbre?</em>
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Instrumentación &amp; timbres</strong>
          Elegir qué instrumentos o voces llevan la melodía, el bajo, la alfombra armónica y el ritmo, y cómo se combinan sus timbres.
        </div>
        <div class="physics-fact-item">
          <strong>Forma &amp; dramaturgia</strong>
          Construir el arco emocional desde una intro íntima hasta el estribillo, el puente y el final.
        </div>
        <div class="physics-fact-item">
          <strong>Registros &amp; voicings</strong>
          Repartir las notas desde el grave profundo hasta los agudos cristalinos para que cada instrumento respire sin emborronar el conjunto.
        </div>
        <div class="physics-fact-item">
          <strong>Diálogo, textura &amp; silencios</strong>
          Decidir cuándo toca todo el mundo (<em>tutti</em>), cuándo un instrumento responde en los silencios del canto y cuándo el vacío crea el escalofrío.
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. Función &amp; usos</span>
        <span class="k-ratio-chip">¿Por qué arreglar?</span>
      </div>
      <h4>¿Para qué sirve un arreglo y cuándo se utiliza?</h4>
      <p>
        Una misma canción con los mismos cuatro acordes puede convertirse en una <strong>balada íntima de piano</strong>, un <strong>tema funk contagioso</strong>, un <strong>coro a cappella a cuatro voces</strong> o un <strong>fresco orquestal de cine</strong>:
      </p>
      <ul class="article-steps-list">
        <li><strong>1. Guiar la atención del oído:</strong> El oído humano solo sigue de forma consciente <strong>2 o 3 planos sonoros simultáneos</strong>. Un buen arreglo despeja el registro medio para la voz o la melodía principal.</li>
        <li><strong>2. Traducir la emoción y el estilo:</strong> Los colchones de cuerda aportan calidez y amplitud, los metales breves dan impacto y una guitarra acústica crea cercanía.</li>
        <li><strong>3. Evitar la fatiga auditiva:</strong> Si todos los instrumentos tocan desde el primer compás, el oído se satura enseguida. Añadir y quitar capas mantiene cada estrofa y cada estribillo cautivadores.</li>
        <li><strong>4. Adaptar la música a un conjunto real:</strong> Grupo, cuarteto de cuerda, coro SATB, big band o piano solo: el arreglo ajusta la escritura a las tesituras y a los músicos presentes.</li>
        <li><strong>5. Cuidar las transiciones:</strong> Redobles de batería, bajadas de bajo, crescendos y pausas claras (<em>breaks</em>) enlazan las partes con fluidez.</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Los 4 planos sonoros</span>
        <span class="k-ratio-chip">Reparto de funciones</span>
      </div>
      <h4>Las 4 capas fundamentales de un arreglo nítido</h4>
      <ul class="k-physics-list">
        <li><strong>1. Primer plano (lead / melodía):</strong> Voz o instrumento solista que cuenta la historia principal.</li>
        <li><strong>2. Base (bajo &amp; groove):</strong> El bajo pone la fundamental armónica mientras la batería y la percusión anclan el pulso.</li>
        <li><strong>3. Alfombra armónica (pad &amp; comping):</strong> Cuerdas tenidas, coros, órgano o acordes rítmicos de guitarra/piano en el centro del espectro.</li>
        <li><strong>4. Contracanto &amp; adornos (fills):</strong> Pequeñas respuestas melódicas colocadas justo cuando la melodía principal toma aire.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-sketch">▶ 1. Boceto desnudo (melodía &amp; bajo)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-full-layers">▶ 2. Arreglo completo de 4 capas</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Registros &amp; voicings</span>
        <span class="k-ratio-chip">Claridad vs. barro sonoro</span>
      </div>
      <h4>Por qué algunos arreglos suenan nítidos y otros confusos</h4>
      <ul class="k-physics-list">
        <li><strong>La ley de los armónicos (amplio abajo, cerrado arriba):</strong> Por debajo de <code>Do3 (C3)</code>, las terceras cerradas enturbian el grave (<em>Low-Interval Limit</em>). Reserva el grave para fundamentales, quintas y octavas, y coloca terceras, séptimas y extensiones en el registro medio y agudo.</li>
        <li><strong>Posición cerrada vs. posición abierta (drop-2):</strong> Bajar una octava la segunda nota desde arriba de un acorde cerrado abre al instante el espacio sonoro.</li>
        <li><strong>Complementariedad rítmica:</strong> Combina valores largos (colchones) con motivos cortos y precisos para evitar el enmascaramiento.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-muddy">▶ Confuso: terceras cerradas en el grave</button>
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-open">▶ Nítido: voicing abierto bien escalonado</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Dinámica &amp; diálogo</span>
        <span class="k-ratio-chip">Call &amp; response • drop</span>
      </div>
      <h4>Mantener el interés de principio a fin</h4>
      <ul class="article-steps-list">
        <li><strong>Call &amp; response (pregunta / respuesta):</strong> El acompañamiento responde en los silencios de la voz principal.</li>
        <li><strong>Movimiento contrario &amp; contracanto:</strong> Una segunda línea melódica baja cuando la melodía sube, o se mueve durante una nota tenida.</li>
        <li><strong>La fuerza de retirarse (el «drop»):</strong> Quitar de repente casi todos los instrumentos durante un compás suele crear más impacto que añadir.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-call-response">▶ Call &amp; response (pregunta / respuesta)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-counterpoint">▶ Contrapunto en movimiento contrario</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">6. Rearmonización &amp; lista de control</span>
        <span class="k-ratio-chip">Mismas notas, otro color</span>
      </div>
      <h4>Cambiar toda la emoción sin modificar ni una nota de la melodía</h4>
      <p>
        La <strong>rearmonización</strong> mantiene intacta la melodía mientras sustituye los acordes de debajo (p. ej., <code>Fmaj7 – Fm6 – Am9</code> en lugar de un simple <code>Do – Sol – Do</code>).
      </p>
      <div class="k-btn-row" style="margin-top:0.45rem;margin-bottom:0.65rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-plain">▶ Melodía sobre acordes sencillos (I–V–I)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-cinema">▶ La misma melodía rearmonizada al estilo cine</button>
      </div>
      <div class="k-meta-box">
        <div><strong>5 preguntas clave para tus arreglos:</strong></div>
        <div>1. <strong>¿Quién tiene la palabra?</strong> Un solo elemento principal en primer plano cada vez.</div>
        <div>2. <strong>¿Dónde están las respiraciones?</strong> Coloca las respuestas en las pausas del canto.</div>
        <div>3. <strong>¿Está despejado el grave?</strong> Nada de terceras cerradas por debajo de <code>Do3 (C3)</code>.</div>
        <div>4. <strong>¿Contrastan de verdad estrofa y estribillo?</strong> Juega con la extensión de las octavas y la densidad.</div>
        <div>5. <strong>La prueba del botón de silencio:</strong> Si silenciar una pista no le quita nada a la canción, ¡dale un papel real o elimínala!</div>
      </div>
      <div class="k-btn-row" style="margin-top:0.55rem;">
        <button type="button" class="btn-tool" data-jump-ref="ensembles">A Orquestas &amp; grupos →</button>
        <button type="button" class="btn-tool" data-jump-ref="cadences">A Cadencias &amp; armonía →</button>
        <button type="button" class="btn-tool" data-jump-ref="physics">A Física &amp; armónicos →</button>
      </div>
    </article>
  `;
}

const CIRCLE_OF_FIFTHS_ES_DATA = {
  "C": {
    sig: "0 alteraciones",
    major: "Do mayor",
    minor: "La menor",
    enharmonic: "",
    acc: "Ningún sostenido ni bemol (solo las teclas blancas del piano)",
    trick: "Punto cero a las 12 del círculo: todas las notas naturales sirven de referencia.",
    vibe: "Abierta y neutra: ideal para empezar, para el coro y para la lectura."
  },
  "G": {
    sig: "1 sostenido (♯)",
    major: "Sol mayor",
    minor: "Mi menor",
    enharmonic: "",
    acc: "1♯: Fa♯ (sensible hacia Sol)",
    trick: "Último sostenido (Fa♯) + 1 semitono por encima = Sol mayor.",
    vibe: "Abierta y resonante en la guitarra acústica, las cuerdas y el folk/pop."
  },
  "D": {
    sig: "2 sostenidos (♯)",
    major: "Re mayor",
    minor: "Si menor",
    enharmonic: "",
    acc: "2♯: Fa♯, Do♯",
    trick: "Último sostenido = Do♯ → un semitono por encima = Re mayor.",
    vibe: "Tonalidad brillante para las cuerdas, el rock y la orquesta."
  },
  "A": {
    sig: "3 sostenidos (♯)",
    major: "La mayor",
    minor: "Fa♯ menor",
    enharmonic: "",
    acc: "3♯: Fa♯, Do♯, Sol♯",
    trick: "Último sostenido = Sol♯ → un semitono por encima = La mayor.",
    vibe: "Cálida y brillante en la guitarra, el violín y el canto."
  },
  "E": {
    sig: "4 sostenidos (♯)",
    major: "Mi mayor",
    minor: "Do♯ menor",
    enharmonic: "",
    acc: "4♯: Fa♯, Do♯, Sol♯, Re♯",
    trick: "Último sostenido = Re♯ → un semitono por encima = Mi mayor.",
    vibe: "El reino de la guitarra eléctrica, el blues y el rock clásico."
  },
  "B": {
    sig: "5 sostenidos (♯) / 7♭",
    major: "Si mayor",
    minor: "Sol♯ menor",
    enharmonic: "Enarmónica: Do♭ mayor (7♭) / La♭ menor",
    acc: "5♯: Fa♯, Do♯, Sol♯, Re♯, La♯",
    trick: "Último sostenido = La♯ → un semitono por encima = Si mayor.",
    vibe: "Cae con mucha naturalidad bajo los dedos en el piano (usa las 5 teclas negras)."
  },
  "F#": {
    sig: "6 sostenidos / 6 bemoles",
    major: "Fa♯ mayor",
    minor: "Re♯ / Mi♭ menor",
    enharmonic: "Puente enarmónico de las 6: Fa♯ mayor (6♯) suena exactamente como Sol♭ mayor (6♭: Sol♭–La♭–Si♭–Do♭–Re♭–Mi♭–Fa).",
    acc: "6♯: Fa♯, Do♯, Sol♯, Re♯, La♯, Mi♯  (o 6♭: Si♭, Mi♭, La♭, Re♭, Sol♭, Do♭)",
    trick: "Justo enfrente de Do mayor (¡polo del tritono!): a partir de aquí, los bemoles suelen leerse más fácilmente.",
    vibe: "Color rico y tornasolado, muy apreciado en el gospel, el R&B y el impresionismo."
  },
  "Db": {
    sig: "5 bemoles (♭) / 7♯",
    major: "Re♭ mayor",
    minor: "Si♭ menor",
    enharmonic: "Enarmónica: Do♯ mayor (7♯) / La♯ menor",
    acc: "5♭: Si♭, Mi♭, La♭, Re♭, Sol♭",
    trick: "El penúltimo bemol es Re♭ → ¡Re♭ mayor!",
    vibe: "Timbre aterciopelado y romántico, adorado por los pianistas de jazz y en las baladas."
  },
  "Ab": {
    sig: "4 bemoles (♭)",
    major: "La♭ mayor",
    minor: "Fa menor",
    enharmonic: "",
    acc: "4♭: Si♭, Mi♭, La♭, Re♭",
    trick: "Penúltimo bemol = La♭ → La♭ mayor.",
    vibe: "Suave y amplia: un gran clásico de los estándares de jazz, el soul y las armonías de viento."
  },
  "Eb": {
    sig: "3 bemoles (♭)",
    major: "Mi♭ mayor",
    minor: "Do menor",
    enharmonic: "",
    acc: "3♭: Si♭, Mi♭, La♭",
    trick: "Penúltimo bemol = Mi♭ → Mi♭ mayor.",
    vibe: "Tonalidad noble y heroica para los metales, el saxofón alto y la sinfonía."
  },
  "Bb": {
    sig: "2 bemoles (♭)",
    major: "Si♭ mayor",
    minor: "Sol menor",
    enharmonic: "",
    acc: "2♭: Si♭, Mi♭",
    trick: "Penúltimo bemol = Si♭ → Si♭ mayor.",
    vibe: "La tonalidad reina de la big band, la trompeta, el clarinete y el jazz moderno."
  },
  "F": {
    sig: "1 bemol (♭)",
    major: "Fa mayor",
    minor: "Re menor",
    enharmonic: "",
    acc: "1♭: Si♭ (el Si natural baja a Si♭)",
    trick: "La única que se recuerda directamente: un solo bemol en la armadura es siempre Fa mayor.",
    vibe: "Tonalidad cálida y pastoral, querida por los coros, las trompas y las baladas folk."
  }
};

const CIRCLE_ROLES_ES = {
  major: {
    I: "Tónica",
    ii: "Supertónica",
    iii: "Mediante",
    IV: "Subdom.",
    V: "Dominante",
    V7: "Dom. 7.ª",
    vi: "Relativo men.",
    "vii°": "Sensible dism."
  },
  minor: {
    i: "Tónica men.",
    "ii°": "Disminuido",
    III: "Relativo may.",
    iv: "Subdom. men.",
    v: "Dom. natural",
    V7: "Dom. arm. 7",
    VI: "Submediante",
    VII: "Subtónica"
  }
};

if (typeof registerKnowledgeBundle === "function") {
  registerKnowledgeBundle("es", {
    data: {
      intervalEncyclopedia: INTERVAL_ENCYCLOPEDIA_ES,
      cadenceEncyclopedia: CADENCE_ENCYCLOPEDIA_ES,
      solfegeSteps: SOLFEGE_STEPS_ES,
      knowledgeArticles: KNOWLEDGE_ARTICLES_ES,
      physicsWaveExplanations: PHYSICS_WAVE_EXPLANATIONS_ES,
      physicsOvertones: PHYSICS_OVERTONES_ES,
      categoryHelpGuides: CATEGORY_HELP_GUIDES_ES,
      rhythmInstruments: RHYTHM_INSTRUMENTS_DATA_ES,
      instrumentModules: INSTRUMENT_MODULES_DATA_ES,
      modesEncyclopedia: MODES_ENCYCLOPEDIA_ES,
      keysCircleData: KEYS_CIRCLE_DATA_ES
    },
    renderers: {
      physics: renderPhysicsReferenceHTML_ES,
      rhythm: renderRhythmReferenceHTML_ES,
      rhythmInstruments: renderRhythmInstrumentsHTML_ES,
      vocals: renderVocalsReferenceHTML_ES,
      instrumentModule: renderInstrumentModuleHTML_ES,
      modes: renderModesReferenceHTML_ES,
      keys: renderKeysReferenceHTML_ES,
      singAndPlay: renderSingAndPlayReferenceHTML_ES,
      notation: renderNotationReferenceHTML_ES,
      arranging: renderArrangingReferenceHTML_ES,
      intervalNamingGuide: getIntervalNamingGuideHTML_ES,
      circleOfFifthsTheory: renderCircleOfFifthsTheoryHTML_ES
    },
    circleData: CIRCLE_OF_FIFTHS_ES_DATA,
    circleRoles: CIRCLE_ROLES_ES
  });
}
