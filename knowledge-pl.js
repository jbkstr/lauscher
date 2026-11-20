/**
 * Lauscher • Baza wiedzy, interaktywne przewodniki i artykuły (po polsku)
 */

const INTERVAL_ENCYCLOPEDIA_PL = [
  {
    key: "P1",
    symbol: "P1",
    name: "Pryma czysta",
    semitones: 0,
    ratio: "1 : 1",
    ratioExplain: "1 : 1 oznacza, że oba dźwięki drgają z dokładnie tą samą częstotliwością. Gdy pierwszy wykonuje jedno drganie, drugi robi dokładnie jedno — to ta sama wysokość tonu.",
    category: "pure",
    mood: "Pełne stopienie, punkt spokoju, tożsamość",
    physics: "Oba dźwięki mają identyczną częstotliwość (np. 261,6 Hz i 261,6 Hz). Fale dźwiękowe nakładają się idealnie w unisonie.",
    songsAsc: "„One Note Samba” (zwrotka na jednym dźwięku), początek „Thank You for the Music” (ABBA — pierwsze dwie sylaby)",
    songsDesc: "Każdy powtarzany dźwięk w rytmicznym riffie (np. wstęp „Poker Face” Lady Gagi)"
  },
  {
    key: "m2",
    symbol: "m2",
    name: "Sekunda mała",
    semitones: 1,
    ratio: "16 : 15",
    ratioExplain: "16 : 15 oznacza, że wyższy ton drga zaledwie odrobinę szybciej od niższego. Ich szczyty zbiegają się raz na 16 cykli — wywołując wyraźne, ostre tarcie akustyczne.",
    category: "tension",
    mood: "Napięta, groźna, tajemnicza, ostro ciążąca (dźwięk prowadzący!)",
    physics: "Fale potrzebują aż 16 cykli, by znów się zrównać. Ponieważ oba tony leżą bardzo blisko siebie w uchu wewnętrznym, powstaje ostra szorstkość.",
    songsAsc: "Motyw przewodni „Szczęk / Jaws” (du-dum…), początek „Różowej Pantery”, motyw e–dis–e z „Dla Elizy”",
    songsDesc: "„Dla Elizy” Beethovena (dwa pierwsze dźwięki e² → dis²), opadające zejścia półtonowe"
  },
  {
    key: "M2",
    symbol: "M2",
    name: "Sekunda wielka",
    semitones: 2,
    ratio: "9 : 8",
    ratioExplain: "9 : 8 oznacza, że na 8 drgań niższego dźwięku przypada 9 drgań wyższego. Wystarczająco blisko dla ciągłości, a już dość daleko na wyraźny krok melodyczny.",
    category: "major",
    mood: "Naturalny krok, narracja, otwartość, początek melodii",
    physics: "Proporcja 9:8 wynika z nałożenia dwóch kwint czystych sprowadzonych do oktawy. Brzmi jak pewny pierwszy krok z domu.",
    songsAsc: "„Sto lat / Happy Birthday” („Hap-py BIRTH-day”), „Cicha noc”, „Panie Janie / Frère Jacques” (C → D)",
    songsDesc: "„Yesterday” (The Beatles — „Yes-ter-day”), „Mary Had a Little Lamb”"
  },
  {
    key: "m3",
    symbol: "m3",
    name: "Tercja mała",
    semitones: 3,
    ratio: "6 : 5",
    ratioExplain: "6 : 5 oznacza, że gdy dolny ton drga 5 razy, górny wykonuje 6 drgań. Zwarta, stabilna proporcja o ciepłym, głębokim i emocjonalnym charakterze.",
    category: "minor",
    mood: "Zadumana, ciepła, liryczna, melancholijna i bliska",
    physics: "Proporcja 6:5 jest w pełni konsonansowa, lecz brzmi ciemniej niż tercja wielka — to emocjonalne serce każdego akordu molowego.",
    songsAsc: "„Seven Nation Army” (The White Stripes — pierwszy skok riffu), „Greensleeves”, „Smoke on the Water” (pierwszy krok)",
    songsDesc: "„Hey Jude” (The Beatles — „Hey Jude”), leśne wołanie kukułki"
  },
  {
    key: "M3",
    symbol: "M3",
    name: "Tercja wielka",
    semitones: 4,
    ratio: "5 : 4",
    ratioExplain: "5 : 4 oznacza, że 5 drgań górnego tonu mieści się idealnie w 4 drganiach podstawy. Ponieważ 5 i 4 to małe liczby całkowite, dźwięki zlewają się w jasny durowy blask.",
    category: "major",
    mood: "Jasna, pogodna, słoneczna, pewna (rdzeń trójdźwięku durowego)",
    physics: "Proporcja 5:4 pojawia się naturalnie u dołu szeregu alikwotowego (5. składowa) w każdym śpiewanym i strunowym dźwięku.",
    songsAsc: "„When the Saints Go Marching In”, „Morning Has Broken” (Cat Stevens), „Kumbaya”",
    songsDesc: "„Summertime” (G. Gershwin), początek V Symfonii Beethovena („Tak los puka do drzwi”)"
  },
  {
    key: "P4",
    symbol: "P4",
    name: "Kwarta czysta",
    semitones: 5,
    ratio: "4 : 3",
    ratioExplain: "4 : 3 oznacza, że gdy niższy dźwięk drga 3 razy, wyższy robi 4 drgania. Co trzeci cykl fale zrównują się co do punktu!",
    category: "pure",
    mood: "Wezwanie, fanfara, uroczysta otwartość, przestrzeń",
    physics: "Jako przewrót kwinty czystej w oktawie kwarta zachowuje zwartą proporcję 4:3. Sama brzmi mocno, choć nad basem często chce opaść o półton do tercji.",
    songsAsc: "„Mazurek Dąbrowskiego” / hymny fanfarowe, Marsz weselny Wagnera, temat z „Harry’ego Pottera”, „Amazing Grace”",
    songsDesc: "„Eine kleine Nachtmusik” Mozarta (drugi skok), „O Come, All Ye Faithful”"
  },
  {
    key: "TT",
    symbol: "TT",
    name: "Tryton (kwarta zw. / kwinta zmn.)",
    semitones: 6,
    ratio: "ok. 45 : 32",
    ratioExplain: "45 : 32 oznacza, że fale bardzo długo nie znajdują wspólnego punktu — spotykają się dopiero co 32 i 45 drgań. Ucho odbiera to skrzyżowanie jako naelektryzowane napięcie!",
    category: "tension",
    mood: "Zawieszony, tajemniczy, ostry, poszukujący rozwiązania",
    physics: "Dzieli oktawę dokładnie na pół (6 półtonów). Brak prostego wspólnego dzielnika daje silne napięcie — silnik dominanty septymowej (V7).",
    songsAsc: "Czołówka „Simpsonów” („The Simp-sons”), „Maria” z „West Side Story”",
    songsDesc: "Riff „Black Sabbath”, „YYZ” (Rush)"
  },
  {
    key: "P5",
    symbol: "P5",
    name: "Kwinta czysta",
    semitones: 7,
    ratio: "3 : 2",
    ratioExplain: "3 : 2 oznacza, że górny ton drga dokładnie półtora raza (1,5×) szybciej niż dolny. Dwie długie fale podstawy mieszczą idealnie trzy fale górnego dźwięku — absolutna stabilność!",
    category: "pure",
    mood: "Heroiczna, potężna, stabilna, krystalicznie czysta (podstawa power chordów)",
    physics: "Tuż po oktawie 3:2 to najprostsza relacja harmoniczna w muzyce. Dlatego nawet mocno przesterowane gitary rockowe brzmią w kwintach czysto i potężnie.",
    songsAsc: "„Gwiezdne wojny / Star Wars” (motyw główny), „Twinkle, Twinkle, Little Star”, „Tako rzecze Zaratustra” R. Straussa",
    songsDesc: "Motyw „Flintstonów”, temat główny „Gry o tron” (pierwszy skok w dół)"
  },
  {
    key: "m6",
    symbol: "m6",
    name: "Seksta mała",
    semitones: 8,
    ratio: "8 : 5",
    ratioExplain: "8 : 5 oznacza, że 5 drgań dźwięku bazowego zgrywa się z 8 drganiami górnego. Brzmienie jest szerokie, śpiewne i pełne subtelnej tęsknoty.",
    category: "minor",
    mood: "Tęskna, dramatyczna, słodko-gorzka, filmowo-romantyczna",
    physics: "Przewrót tercji wielkiej (8:5). Łączy rozległy skok melodyczny z miękkim molowym zabarwieniem.",
    songsAsc: "„The Entertainer” Scotta Joplina (po przedtakcie), „In My Life” (The Beatles — intro gitarowe), „We Are Young” (Fun.)",
    songsDesc: "Temat z „Love Story” (Where Do I Begin)"
  },
  {
    key: "M6",
    symbol: "M6",
    name: "Seksta wielka",
    semitones: 9,
    ratio: "5 : 3",
    ratioExplain: "5 : 3 oznacza, że gdy dolny ton wykonuje 3 drgania, górny robi 5. Małe liczby całkowite nadają temu szerokiemu skokowi ciepły, kantylenowy blask.",
    category: "major",
    mood: "Szlachetna, serdeczna, pastoralna, szeroko otwarta",
    physics: "Blisko spokrewniona z tercją małą (swym przewrotem); proporcja 5:3 brzmi naturalnie, śpiewnie i lekko dla głosu.",
    songsAsc: "„My Bonnie Lies Over the Ocean”, „Jingle Bells” („Dash-ing through the snow”), sygnał NBC",
    songsDesc: "„The Music of the Night” („Upiór w operze”), „Man in the Mirror” Michaela Jacksona („I’m gonna make a change”)"
  },
  {
    key: "m7",
    symbol: "m7",
    name: "Septyma mała",
    semitones: 10,
    ratio: "16 : 9",
    ratioExplain: "16 : 9 (lub 7 : 4 w szeregu naturalnym) zatrzymuje się tuż przed oktawową prędkością 2:1. Ten lekki niedosyt daje bluesowi, soulowi i funkowi swobodny pęd ku rozwiązaniu.",
    category: "tension",
    mood: "Bluesowa, swobodna, soulowa, z łagodnym ciążeniem w dół",
    physics: "Występuje naturalnie jako 7. alikwot (7:4). Zamiast ostrości zmiękcza harmonię i napędza groove akordów dominantowych.",
    songsAsc: "„The Winner Takes It All” (ABBA), „Somewhere” („West Side Story” — „There’s a place for us”), klasyczny motyw „Star Trek”",
    songsDesc: "„Watermelon Man” Herbiego Hancocka"
  },
  {
    key: "M7",
    symbol: "M7",
    name: "Septyma wielka",
    semitones: 11,
    ratio: "15 : 8",
    ratioExplain: "15 : 8 — zaledwie jeden mały półton przed 16 : 8 (oktawą 2:1!). Ponieważ fale niemal, ale nie do końca zbiegają się w oktawę, iskrzą ostrym napięciem.",
    category: "tension",
    mood: "Marzycielska i bogata (w akordzie Maj7) albo ostra i kłująca (solo)",
    physics: "O krok — jeden półton — od oktawy (15:8). W duecie trze ostro o podstawę, ale w pełnym akordzie durowym (Cmaj7) zamienia się w jazzowy aksamit.",
    songsAsc: "„Take On Me” (a-ha — wejście refrenu), „Don’t Know Why” Norah Jones",
    songsDesc: "„I Love You” Cole’a Portera"
  },
  {
    key: "P8",
    symbol: "P8",
    name: "Oktawa czysta",
    semitones: 12,
    ratio: "2 : 1",
    ratioExplain: "2 : 1 oznacza, że górny dźwięk drga dokładnie dwa razy szybciej od dolnego (połowa długości fali). Każda długa fala zamyka dokładnie dwie krótkie — brzmią niemal jak jeden dźwięk!",
    category: "pure",
    mood: "Przestrzeń, klarowność, dopełnienie — ta sama nuta piętro wyżej",
    physics: "Dokładne podwojenie częstotliwości (2:1). Gdy kobiety, mężczyźni i dzieci śpiewają razem „tę samą” melodię, intuicyjnie śpiewają w oktawach.",
    songsAsc: "„Somewhere Over the Rainbow” („Czarnoksiężnik z Krainy Oz”), „Singin’ in the Rain”",
    songsDesc: "„Willow Weep for Me”"
  },
  {
    key: "m9",
    symbol: "m9",
    name: "Nona mała",
    semitones: 13,
    ratio: "32 : 15",
    ratioExplain: "32 : 15 oznacza, że wyższy ton drga minimalnie szybciej niż podwojona podstawa (oktawa + sekunda mała). Złożona relacja wnosi żarliwą dramaturgię.",
    category: "tension",
    mood: "Egzotyczna, dramatyczna, o silnym napięciu (flamenco i alterowany jazz)",
    physics: "Oktawa plus półton. Szerszy rozstaw łagodzi bezpośrednie starcie z sekundy małej, zachowując jednak mroczny pazur.",
    songsAsc: "Alterowane voicingi dominantowe w jazzie (V7b9) oraz frazy hiszpańskiego flamenco",
    songsDesc: "Dramatyczne akcenty orkiestrowe w muzyce filmowej"
  },
  {
    key: "M9",
    symbol: "M9",
    name: "Nona wielka",
    semitones: 14,
    ratio: "9 : 4",
    ratioExplain: "9 : 4 oznacza, że na 4 drgania głębokiej podstawy przypadają 9 górnego dźwięku (ponad dwa razy szybciej). Szeroki skok brzmi lekko, świetliście i nowocześnie.",
    category: "major",
    mood: "Przestronna, nowoczesna, zwiewna i szeroka (barwa ballad pop i neo-soulu)",
    physics: "Oktawa plus sekunda wielka (lub dwie ułożone kwinty: C → G → D). Nadaje krystalicznej głębi akordom add9 i maj9.",
    songsAsc: "„Every Breath You Take” (The Police — słynny riff gitarowy sięga prosto do nony!)",
    songsDesc: "Współczesne fortepianowe voicingi pop i R&B"
  }
];

const CADENCE_ENCYCLOPEDIA_PL = [
  {
    id: "authentic",
    category: "classic",
    name: "Klasyczna kadencja doskonała",
    formula: "I – IV – V – I",
    tag: "Podstawa i dom",
    tagClass: "tag-sage",
    bars: ["I", "IV", "V", "I"],
    whyItWorks: "Opowiada pełną czterotaktową historię: **I (Tonika)** ustanawia dom. **IV (Subdominanta)** otwiera drzwi do podróży. **V (Dominanta)** buduje maksimum napięcia swoim dźwiękiem prowadzącym, a **I** pewnie wraca do spokoju.",
    songs: [
      "„Twist and Shout” — The Beatles (I – IV – V)",
      "„La Bamba” — Ritchie Valens",
      "„Three Little Birds” — Bob Marley",
      "Setki melodii ludowych i klasycznych"
    ]
  },
  {
    id: "plagal-amen",
    category: "classic",
    name: "Kadencja plagalna (Zakończenie „Amen”)",
    formula: "I – IV – I",
    tag: "Ciepła i uroczysta",
    tagClass: "tag-sage",
    bars: ["I", "IV", "I"],
    whyItWorks: "W przeciwieństwie do napiętej Dominanty (**V**), akord **IV** nie ma ostrego dźwięku prowadzącego do prymy. Dlatego przejście **IV → I** nie wpada dramatycznie do celu, lecz miękko opada w spokój — klasyczne chóralne „Amen”.",
    songs: [
      "„Hey Jude” — The Beatles (długie „Na-na-na” bVII–IV–I)",
      "„Let It Be” — The Beatles (łącznik F–C)",
      "Hymny kościelne i finały gospel („Amen”)"
    ]
  },
  {
    id: "half-cadence",
    category: "classic",
    name: "Półkadencja (Otwarte pytanie)",
    formula: "I – IV – ii – V",
    tag: "Zawieszone napięcie",
    tagClass: "tag-peach",
    bars: ["I", "IV", "ii", "V"],
    whyItWorks: "Zatrzymanie frazy na **Dominancie (V)** działa jak dwukropek w zdaniu: „…uwaga, zaraz zacznie się najważniejsze!”. Tuż przed refrenem takie zawieszenie czyni powrót **I** niezwykle wybuchowym.",
    songs: [
      "Klasyczne tematy sonatowe (Mozart, Haydn)",
      "Prawie każdy mostek (bridge) przed wejściem refrenu",
      "„Yesterday” — The Beatles (zatrzymanie na dominancie)"
    ]
  },
  {
    id: "pachelbel",
    category: "classic",
    name: "Sekwencja Pachelbela",
    formula: "I – V – vi – iii – IV – I – IV – V",
    tag: "Od baroku do popu",
    tagClass: "tag-lilac",
    bars: ["I", "V", "vi", "iii", "IV", "I", "IV", "V"],
    stepMs: 1500,
    chordDur: 1.38,
    whyItWorks: "Genialna linia basowa z 1680 roku: bas kroczy i przeskakuje symetrycznymi stopniami (**C → G → A → E → F → C → F → G**). Każdy akord płynnie podaje rękę następnemu w nieskończonym 8-taktowym kole.",
    songs: [
      "„Kanon D-dur” — Johann Pachelbel",
      "„Basket Case” — Green Day",
      "„Memories” — Maroon 5",
      "„Go West” — Village People / Pet Shop Boys"
    ]
  },
  {
    id: "pop4",
    category: "pop",
    name: "Popowa formuła 4 akordów",
    formula: "I – V – vi – IV",
    tag: "Klasyka muzyki pop",
    tagClass: "tag-peach",
    bars: ["I", "V", "vi", "IV"],
    whyItWorks: "Prawdopodobnie najpopularniejszy obieg akordów ostatnich 50 lat! Jego sekret to ukryta **kadencja zwodnicza (V → vi)**, wnosząca ciepłą nutę wzruszenia, a otwarta **IV** na końcu płynnie zapętla cały refren.",
    songs: [
      "„Let It Be” — The Beatles (zwrotka)",
      "„Someone Like You” — Adele (refren)",
      "„With or Without You” — U2",
      "„No Woman, No Cry” — Bob Marley",
      "„Don’t Stop Believin’” — Journey"
    ]
  },
  {
    id: "doowop",
    category: "pop",
    name: "Obieg lat 50. / Doo-Wop",
    formula: "I – vi – IV – V",
    tag: "Soul i retro",
    tagClass: "tag-lilac",
    bars: ["I", "vi", "IV", "V"],
    whyItWorks: "Z pogodnej Toniki (**I**) harmonia miękko osuwa się w **moll równoległy (vi)** — dzielą przecież aż dwa z trzech dźwięków! Stamtąd **IV** i **V** budują ciepłą nostalgiczną falę z powrotem do pierwszego taktu.",
    songs: [
      "„Stand By Me” — Ben E. King",
      "„Every Breath You Take” — The Police",
      "„Unchained Melody” — The Righteous Brothers",
      "„Happiness Is a Warm Gun” — The Beatles (finał)"
    ]
  },
  {
    id: "sad-pop",
    category: "pop",
    name: "Emocjonalna pętla od mola",
    formula: "vi – IV – I – V",
    tag: "Melancholia i siła",
    tagClass: "tag-lilac",
    bars: ["vi", "IV", "I", "V"],
    whyItWorks: "Sprytna sztuczka: to dokładnie te same cztery akordy co w „I – V – vi – IV”, tylko pętla startuje od **mola równoległego (vi)**! Molowy początek zamienia słoneczną pogodę w dramat, zachowując nośny refren przez **I** i **V**.",
    songs: [
      "„Zombie” — The Cranberries (Em – C – G – D)",
      "„Save Tonight” — Eagle-Eye Cherry",
      "„Numb” — Linkin Park",
      "„Hello” — Adele (zwrotka)"
    ]
  },
  {
    id: "minor-plagal",
    category: "pop",
    name: "Słodko-gorzka subdominanta molowa",
    formula: "I – IV – iv – I",
    tag: "Film i nostalgia",
    tagClass: "tag-peach",
    bars: ["I", "IV", "iv", "I"],
    whyItWorks: "Jeden z najbardziej poruszających zwrotów w harmonii: najpierw pewnie wchodzimy na **IV (F-dur)**, po czym akord roztapia się w **iv (f-moll)** — pożyczce z jednoimiennego mola. Środkowy głos spływa gładko: **A → As → G**.",
    songs: [
      "„In My Life” — The Beatles",
      "„Don’t Look Back in Anger” — Oasis (przejście F → Fm → C)",
      "„Wake Me Up When September Ends” — Green Day",
      "Klasyka ballad filmowych Disneya"
    ]
  },
  {
    id: "creep-chromatic",
    category: "pop",
    name: "Linia chromatyczna („Creep”)",
    formula: "I – III7 – IV – iv",
    tag: "Klasyk tęsknoty",
    tagClass: "tag-lilac",
    bars: ["I", "III7", "IV", "iv"],
    whyItWorks: "Wsłuchaj się w wewnętrzny głos prowadzący: **C (I)** trzyma **G**; niespodziewane durowe **E7 (III7)** podnosi go do **Gis**; **F (IV)** idzie wyżej do **A**; a **Fm (iv)** łamie serce opadnięciem na **As**. Ta nić (**G → Gis → A → As**) trzyma całą magię.",
    songs: [
      "„Creep” — Radiohead",
      "„The Air That I Breathe” — The Hollies",
      "„Get Free” — Lana Del Rey"
    ]
  },
  {
    id: "royal-road",
    category: "pop",
    name: "„Królewska droga” (Ōdō Shinkō)",
    formula: "IV – V – iii – vi",
    tag: "J-Pop i soundtrack anime",
    tagClass: "tag-sage",
    bars: ["IV", "V", "iii", "vi"],
    whyItWorks: "Ulubiony zwrot japońskiego popu: muzyka rusza już w biegu od **IV**, rozpędza się przez **V**, lecz omija **I**, ślizgając się przez **iii** do **vi**. Brak twardego lądowania daje poczucie ciągłego unoszenia się.",
    songs: [
      "„Stay With Me” — Miki Matsubara (City Pop)",
      "„Never Gonna Give You Up” — Rick Astley (refren)",
      "Setki ścieżek dźwiękowych anime i gier Nintendo"
    ]
  },
  {
    id: "sus4-resolve",
    category: "pop",
    name: "Opóźnienie na dominancie (sus4)",
    formula: "I – IV – Vsus4 – V – I",
    tag: "Szlachetne zawieszenie",
    tagClass: "tag-sage",
    bars: ["I", "IV", "Vsus4", "V", "I"],
    whyItWorks: "W akordzie **Vsus4** tercja wielka dominanty (**H** w G-dur) zostaje chwilowo zastąpiona czystą kwartą (**C**). To dźwięczne zawieszenie opada czysto o półton (**C → H**) do pełnej **V**, a potem ląduje w **I**.",
    songs: [
      "„Crazy Little Thing Called Love” — Queen",
      "„Pinball Wizard” — The Who",
      "„The Scientist” i fortepianowe hymny Coldplay"
    ]
  },
  {
    id: "deceptive",
    category: "epic",
    name: "Kadencja zwodnicza",
    formula: "I – IV – V – vi",
    tag: "Emocjonalny zwrot",
    tagClass: "tag-lilac",
    bars: ["I", "IV", "V", "vi"],
    whyItWorks: "Po **I – IV – V** mózg w 100% spodziewa się uroczystego **I**. Dźwięk prowadzący rzeczywiście zmierza do C — lecz bas podstawia **A** zamiast C (powstaje **a-moll**). Natychmiastowe zaskoczenie z dreszczem emocji!",
    songs: [
      "„Hallelujah” — Leonard Cohen (słowa „the minor fall, the major lift…”)",
      "„Livin’ on a Prayer” — Bon Jovi",
      "Kulminacje orkiestrowe muzyki filmowej (Hans Zimmer, John Williams)"
    ]
  },
  {
    id: "mario-cadence",
    category: "epic",
    name: "„Kadencja Mario” (Fanfara zwycięstwa)",
    formula: "I – bVI – bVII – I",
    tag: "Fanfara gier wideo",
    tagClass: "tag-peach",
    bars: ["I", "bVI", "bVII", "I"],
    whyItWorks: "Dwa mocne trójdźwięki durowe pożyczone z jednoimiennego mola — **bVI (As-dur)** i **bVII (B-dur)** — wspinają się pewnymi krokami całotonowymi w górę (**As → B → C**), wywołując czysty triumf ukończonego etapu!",
    songs: [
      "„Super Mario Bros.” — fanfara ukończenia poziomu (Nintendo)",
      "„With a Little Help from My Friends” — The Beatles / Joe Cocker (finał)",
      "„P.S. I Love You” — The Beatles i finały rockowe"
    ]
  },
  {
    id: "mixolydian-rock",
    category: "epic",
    name: "Miksolidyjska kadencja rockowa",
    formula: "I – bVII – IV – I",
    tag: "Rockowy pazur",
    tagClass: "tag-sage",
    bars: ["I", "bVII", "IV", "I"],
    whyItWorks: "Bez akademickiego dźwięku prowadzącego: zastąpienie V akordem **bVII (B w tonacji C)** nadaje tonice zuchwały, miksolidyjski bunt. Z **I** schodzi się lekko o cały ton do **bVII**, by z impetem wrócić przez **IV**.",
    songs: [
      "„Sweet Child o’ Mine” — Guns N’ Roses",
      "„Sympathy for the Devil” — The Rolling Stones",
      "„Hey Jude” — The Beatles (koda)",
      "„Royals” — Lorde"
    ]
  },
  {
    id: "andalusian",
    category: "epic",
    name: "Kadencja andaluzyjska",
    formula: "vi – V – IV – III7",
    tag: "Flamenco i dramat",
    tagClass: "tag-peach",
    bars: ["vi", "V", "IV", "III7"],
    whyItWorks: "Stulecia żaru w czterech akordach: bas nieubłaganie schodzi stopniami (**A → G → F → E**), po czym wybucha ognista dominanta **E7 (III7)**, trzymając słuchacza w napięciu przed powrotem.",
    songs: [
      "„Hit the Road Jack” — Ray Charles",
      "„Smooth Criminal” — Michael Jackson",
      "„Sultans of Swing” — Dire Straits (finał zwrotki)",
      "„Stairway to Heaven” — Led Zeppelin (solówka gitarowa)"
    ]
  },
  {
    id: "jazz251",
    category: "jazz",
    name: "Jazzowe ii–V–I",
    formula: "ii – V7 – I – I",
    tag: "Jazz i soul",
    tagClass: "tag-sage",
    bars: ["ii", "V7", "I", "I"],
    whyItWorks: "W jazzie i soulu miękki molowy II stopień (**ii**, Dm w C-dur) zastępuje IV. W ciągu **ii → V7 → I** bas za każdym razem opada o czystą kwintę (D → G → C) — najsilniejsze naturalne przyciąganie harmoniczne.",
    songs: [
      "„Sunday Morning” — Maroon 5 (niemal cały utwór to ii – V7 – I!)",
      "„Autumn Leaves” — standard jazzowy",
      "„Fly Me to the Moon” — Frank Sinatra"
    ]
  },
  {
    id: "jazz1625",
    category: "jazz",
    name: "Standard swingowy (I–vi–ii–V)",
    formula: "Imaj7 – vi – ii – V7 – Imaj7",
    tag: "Swing i standardy",
    tagClass: "tag-lilac",
    bars: ["Imaj7", "vi", "ii", "V7", "Imaj7"],
    whyItWorks: "Starszy jazzowy brat doo-wopu: dodanie septymy wielkiej do **Imaj7 (Cmaj7)** nadaje tonice aksamitny połysk, zanim **vi → ii → V7** gładko potoczy się po kole kwintowym.",
    songs: [
      "„I Got Rhythm” — George Gershwin (Rhythm Changes)",
      "„Blue Moon” — Richard Rodgers",
      "„Heart and Soul” — Hoagy Carmichael"
    ]
  },
  {
    id: "tritonesub",
    category: "jazz",
    name: "Substytut trytonowy",
    formula: "ii – bII7 – I – I",
    tag: "Tajna broń jazzu",
    tagClass: "tag-peach",
    bars: ["ii", "bII7", "I", "I"],
    whyItWorks: "Dlaczego **Des7 (bII7)** bez trudu zastępuje **G7 (V7)** w C-dur? Ponieważ oba czterodźwięki dzielą ten sam **tryton** dźwięków prowadzących (**F i H/Ces**)! Bas schodzi wtedy gładko chromatyką: **D → Des → C**.",
    songs: [
      "„The Girl from Ipanema” — Antônio Carlos Jobim",
      "Finały kadencji w lo-fi hip-hopie, neo-soulu i gospel"
    ]
  },
  {
    id: "blues12",
    category: "jazz",
    name: "Dominantowa kadencja bluesowa",
    formula: "I7 – IV7 – I7 – V7 – IV7 – I7",
    tag: "Blues i rock’n’roll",
    tagClass: "tag-peach",
    bars: ["I7", "IV7", "I7", "V7", "IV7", "I7"],
    whyItWorks: "Klasyczna teoria rezerwowała septymę małą wyłącznie dla V stopnia. Blues złamał tę regułę i doprawił każdy główny akord (**I7, IV7, V7**) zadziornym tarciem tercji wielkiej i septymy małej — czysty duch bluesa.",
    songs: [
      "„Johnny B. Goode” — Chuck Berry",
      "„Hound Dog” — Elvis Presley",
      "„Sweet Home Chicago” — Robert Johnson / The Blues Brothers"
    ]
  }
];

const SOLFEGE_STEPS_PL = [
  {
    syllable: "Do",
    degree: "I stopień (Pryma toniki)",
    semitones: 0,
    resolvePath: [0],
    resolveDesc: "Już w domu, w tonice (Do potwierdza pełny spokój)",
    color: "sage",
    character: "Kamień węgielny, równowaga, powrót do domu",
    desc: "Wszystkie pozostałe stopnie skali czerpią swoje napięcie wyłącznie z relacji wobec Do. Gdy melodia wraca do Do, ucho odczuwa ulgę."
  },
  {
    syllable: "Re",
    degree: "II stopień (Supertonika)",
    semitones: 2,
    resolvePath: [2, 0],
    resolveDesc: "Rozwiązuje się w dół do toniki: Re → Do",
    color: "peach",
    character: "Lekkie zawieszenie, pytanie, krok naprzód",
    desc: "Re zawisa łagodnie między Do a Mi. Zakończenie frazy na Re brzmi otwarcie i pytająco — dźwięk naturalnie chce zejść o stopień w dół na Do."
  },
  {
    syllable: "Mi",
    degree: "III stopień (Medianta / tercja wielka)",
    semitones: 4,
    resolvePath: [4, 2, 0],
    resolveDesc: "Spokojnie schodzi po gamie w dół: Mi → Re → Do",
    color: "sage",
    character: "Ciepła, pogodna, świetlista i łagodnie stabilna",
    desc: "Mi nadaje całej skali durową jasność. W drodze do domu schodzi spokojnie przez Re prosto do toniki Do."
  },
  {
    syllable: "Fa",
    degree: "IV stopień (Subdominanta)",
    semitones: 5,
    resolvePath: [5, 4, 2, 0],
    resolveDesc: "Ciąży w dół po półtonie do toniki: Fa → Mi → Re → Do",
    color: "peach",
    character: "Wyrazista, poważna, skierowana ku dołowi",
    desc: "Fa leży zaledwie półton nad Mi! Ta ciasna odległość tworzy wyraźne przyciąganie w dół: najpierw Fa opada w Mi, a potem przez Re schodzi do Do."
  },
  {
    syllable: "Sol",
    degree: "V stopień (Dominanta)",
    semitones: 7,
    resolvePath: [7, 9, 11, 12],
    resolveDesc: "Wspina się w górę do górnej toniki: Sol → La → Ti → Do",
    color: "sage",
    character: "Promienna, otwarta, silna, drugi filar skali",
    desc: "Począwszy od Sol, górna połowa oktawy dąży do góry w stronę wysokiego Do (Sol → La → Ti → Do)."
  },
  {
    syllable: "La",
    degree: "VI stopień (Submedianta / moll równoległy)",
    semitones: 9,
    resolvePath: [9, 11, 12],
    resolveDesc: "Prowadzi w górę do górnej toniki: La → Ti → Do",
    color: "lilac",
    character: "Liryczna, czuła, lekko nostalgiczna",
    desc: "La to jednocześnie tonika mola równoległego. W trybie durowym dąży przez dźwięk prowadzący Ti w górę do jasnego Do."
  },
  {
    syllable: "Ti",
    degree: "VII stopień (Dźwięk prowadzący)",
    semitones: 11,
    resolvePath: [11, 12],
    resolveDesc: "Bezpośrednie przyciąganie w górę: Ti → Do",
    color: "peach",
    character: "Magnetyczna, niepohamowana, ostro dąży wzwyż",
    desc: "Ti dzieli od górnego Do zaledwie jeden półton. Żaden inny stopień skali nie domaga się rozwiązania tak usilnie jak Ti → Do!"
  }
];

const KNOWLEDGE_ARTICLES_PL = [
  {
    id: "art-why-ear-training",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a6 6 0 1 1 11.4 2.5c-.6 1.3-1.4 1.9-1.9 3.1-.4 1-.5 2.4-1.7 3.2A2.5 2.5 0 0 1 10 15"/><path d="M10.5 8.5a2.2 2.2 0 0 1 4 1.2c0 .9-.6 1.4-1 2.2"/><path d="M19.5 6.5a8 8 0 0 1 0 7"/></svg>',
    badgeClass: "badge-sage",
    title: "Po co ćwiczyć słuch muzyczny?",
    subtitle: "Co otwiera wyćwiczone ucho, komu służy i jak zacząć mądrze",
    tag: "Podstawy i motywacja",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Po co trenować słuch?</span>
        <h2>Most między muzyką w głowie a instrumentem w dłoniach</h2>
        <p class="article-lead">
          Z pewnością znasz to uczucie: słyszysz w głowie melodię albo ulubiony utwór, lecz na instrumencie musisz po omacku szukać właściwych dźwięków. <strong>Kształcenie słuchu</strong> buduje most, dzięki któremu skoki, akordy i groove stają się natychmiast czytelne dla ucha.
        </p>

        <h3>Co dokładnie daje regularne ćwiczenie słuchu?</h3>
        <ul class="article-steps-list">
          <li><strong>Szybsze granie utworów i melodii ze słuchu:</strong> Zamiast szukać dźwięk po dźwięku, od razu rozpoznajesz skoki (<em>„O, to kwinta czysta w górę!”</em>) oraz znajome kadencje (<em>„To przecież I–V–vi–IV!”</em>).</li>
          <li><strong>Większa swoboda w improwizacji i komponowaniu:</strong> Gdy czujesz w uszach brzmienie subdominanty, dźwięku prowadzącego czy synkopy, dżemowanie, pisanie piosenek i praca w DAW idą prosto za Twoimi pomysłami.</li>
          <li><strong>Czystsza intonacja i lepsze zgranie w zespole:</strong> Natychmiast wychwytujesz czyste brzmienie w chórze lub zespole i dokładniej trzymasz wspólny puls.</li>
          <li><strong>Słyszenie nut oczami wyobraźni:</strong> Zapis nutowy i funkcje akordów przestają być suchymi znakami — słyszysz muzykę jeszcze zanim dotkniesz klawiszy.</li>
        </ul>

        <h3>Dla kogo jest taki trening?</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Początkujący i ciekawi świata (od 8 lat)</h5>
            <p>Nie musisz znać biegle nut ani teorii z akademii muzycznej. Uczysz się przez uważne słuchanie i bezpośrednie porównywanie, budując muzyczną intuicję od pierwszego dnia.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Instrumentaliści i wokaliści</h5>
            <p>Idealne dla gitarzystów, pianistów, dęciaków i chórzystów, którzy chcą uniezależnić się od tabulatur i pewnie trzymać swoją partię.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>Songwriterzy, beatmakerzy i producenci</h5>
            <p>Wyostrza słuch w DAW do błyskawicznego rozpoznawania progresji akordów, linii basu, mikrotajmingu i balansu pasm w miksie.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Zaawansowani i przygotowujący się do egzaminów</h5>
            <p>Rozwijaj słuch na substytutach trytonowych, wszystkich interwałach chromatycznych, metrach nieregularnych, wąskich pasmach EQ i modulacjach.</p>
          </div>
        </div>

        <h3>Największy mit: czy trzeba mieć „słuch absolutny”?</h3>
        <p>
          <strong>Absolutnie nie!</strong> Słuch absolutny (nazwanie przypadkowego dźwięku bez żadnego odniesienia) to rzadkość niemal zbędna w praktyce. Cała muzyka opiera się na <strong>słuchu relatywnym (funkcyjnym)</strong> — czyli na tym, jak dźwięki i akordy oddziałują <em>względem siebie nawzajem</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Natychmiastowy dowód: Twoje ucho już słyszy kontekst</h4>
          <p>Niezależnie od tego, czy utwór jest w C-dur czy w F-dur, gdy tylko pojawi się centrum tonalne, od razu wyczuwasz napięcie dominanty (<strong>V</strong>) i ukojenie powrotu na tonikę (<strong>I</strong>):</p>
          <button class="btn-tool" data-play-progression="I,IV,V7,I">▶ Posłuchaj kadencji doskonałej (I – IV – V7 – I)</button>
        </div>

        <h3>Jak robić stałe postępy (zasada 10 minut)</h3>
        <ul class="article-steps-list">
          <li><strong>Krótko i systematycznie:</strong> 5–10 skupionych minut cztery razy w tygodniu daje wielokrotnie więcej niż dwugodzinny maraton raz w niedzielę.</li>
          <li><strong>Włącz głos i ciało:</strong> Podśpiewuj po cichu szukany dźwięk, wystukuj puls stopą i po każdym błędzie koniecznie klikaj przycisk <strong>Porównaj A/B</strong>.</li>
          <li><strong>Ciekawość zamiast presji:</strong> Pomyłka uczy ucho równie mocno jak trafienie — to porównanie dwóch dźwięków obok siebie kalibruje percepcję.</li>
        </ul>
      </div>
    `
  },
  {
    id: "art-talking-about-music",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9.5 10v3"/><path d="M12.5 8.5v6"/><path d="M15.5 10.5v2"/></svg>',
    badgeClass: "badge-peach",
    title: "Jak rozmawiać o muzyce?",
    subtitle: "Jak prosto opisywać nastrój, obrazy i wrażenia ze słuchania — bez żargonu teoretycznego",
    tag: "Słuchanie i rozmowa",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Percepcja i język</span>
        <h2>Opowiadać o muzyce bez nut, akordów i trudnych terminów</h2>
        <p class="article-lead">
          Utwór głęboko Cię porusza, trzyma w napięciu albo maluje w głowie wyraźny film — lecz gdy ktoś pyta: <em>„I jak Ci się podoba?”</em>, z ust ucieka tylko krótkie <em>„Fajne”</em> lub <em>„Jakoś mi nie siadło”</em>. Dlaczego tak trudno ubrać wrażenia muzyczne w słowa i jak zrobić to lekko?
        </p>

        <p>
          Wiele osób milczy, sądząc, że do rozmowy trzeba znać tonacje, nazwy akordów albo skład orkiestry. To nieprawda. W rozmowie ze znajomymi, na próbie zespołu czy lekcji muzyki liczy się nie techniczne <strong>„dlaczego”</strong>, lecz żywe <strong>„co”</strong>: co dociera do Twojego ucha? Co dzieje się w ciele i nastroju? Jak brzmienie zmienia się z sekundy na sekundę?
        </p>

        <div class="k-song-ref">
          <strong>Warto pamiętać:</strong> Nawet zawodowi dyrygenci, kompozytorzy filmowi, realizatorzy dźwięku i chórmistrzowie na co dzień mówią <em>obrazami zmysłowymi i fizycznymi metaforami</em>. Zdanie <em>„Początek brzmi jak gęsta poranna mgła, a w środku jakby nagle otworzyło się okno”</em> mówi dziesięć razy więcej niż sucha tabela terminów.
        </div>

        <h3>1. Złote przejście: od oceny do obserwacji</h3>
        <p>
          Ogólnikowe etykiety typu <em>„nudne”</em>, <em>„dziwne”</em> albo <em>„genialne”</em> ucina rozmowę, bo rozmówca nadal nie wie, co konkretnie usłyszałeś. Natomiast opisanie <strong>własnego wrażenia</strong> od razu otwiera dialog. Pomaga prosty trzystopniowy mostek:
        </p>
        <ul class="article-steps-list">
          <li><strong>Gdzie dokładnie w utworze?</strong> Zakotwicz spostrzeżenie w czasie: <em>„Na samym początku”</em>, <em>„Gdy wszystko narasta w środku”</em>, <em>„Tuż przed finałem”</em> albo <em>„W momencie tego nagłego przejścia”</em>.</li>
          <li><strong>Co dzieje się ze mną?</strong> Mów w pierwszej osobie: <em>„Mam wrażenie…”</em>, <em>„Czuję, jakby…”</em>, <em>„W tym miejscu robi się we mnie…”</em></li>
          <li><strong>Jaki codzienny obraz pasuje?</strong> Pożyczaj słowa z przestrzeni, światła, dotyku albo ruchu: <em>„ciasno”</em>, <em>„ciepło”</em>, <em>„pędząco”</em>, <em>„jak głęboki oddech ulgi”</em>.</li>
        </ul>

        <h3>2. Sześć prostych wymiarów słuchania</h3>
        <p>
          Nie potrzebujesz słownika muzycznego. Prawie wszystko, co słyszysz, mieści się naturalnie w sześciu zwykłych, intuicyjnych kategoriach:
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>A. Nastrój i odcienie uczuć</h5>
            <p>Zajrzyj głębiej niż „wesołe / smutne”: czy brzmi to <em>przytulnie, tęsknie, dumnie, figlarnie, niepokojąco, krucho, uroczyście, ironicznie, kojąco</em> czy <em>słodko-gorzko</em>? Złożone połączenia trafiają w sedno: <em>„Na górze jest jasno, ale pod spodem słychać zmęczenie”</em>.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>B. Przestrzeń, bliskość i gęstość</h5>
            <p>Ile powietrza czuć wokół dźwięku? Pomogą przeciwieństwa: <em>ciasno, ciężko, gęsto, tłoczno</em> kontra <em>szeroko, zwiewnie, przejrzyście, pusto, krucho</em> — albo <em>szept tuż przy samym uchu</em> kontra <em>echo z drugiego końca wielkiej sali</em>.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>C. Barwa, temperatura i faktura</h5>
            <p>Wyobraź sobie dotyk dźwięku dłonią: jest <em>ciepły, złocisty, aksamitny, matowy, ziemisty, przydymiony, miękki</em> — czy <em>chłodny, szklany, srebrzysty, oślepiający, kłujący, ziarnisty, metaliczny</em>? Ciężar też pomaga: <em>ciężki jak ołów</em> albo <em>lekki jak piórko</em>.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>D. Ruch, energia i pęd</h5>
            <p>Wsłuchaj się w reakcję ciała: <em>pędzi naprzód, podskakuje, ciągnie się, potyka, kołysze, krąży w kółko, traci oddech, płynie, waha się</em>. Zapytaj siebie: <em>czy muzyka popycha naprzód, kołysze czy zatrzymuje czas?</em></p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>E. Dramaturgia, napięcie i oddech</h5>
            <p>Każdy utwór opowiada przebieg historii: <em>zbieranie sił, wyczekiwanie, punkt zwrotny, nagłe uwolnienie, wyciszenie, długie wybrzmienie, pytanie bez odpowiedzi, powrót do domu</em>. Zdania jak <em>„Tu aż wstrzymuje się oddech”</em> każdy rozumie od razu.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>F. Współpraca głosów i warstw</h5>
            <p>Nawet bez nazw instrumentów łatwo opisać role: <em>„Jeden głos wysuwa się do przodu i opowiada, a reszta kładzie pod spód miękki dywan”</em>, <em>„jakby podawali sobie piłkę”</em> albo <em>„maszerują jak jedna zwarta ściana”</em>.</p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Test dźwiękowy: usłysz kontrasty na żywo</h4>
          <p>Zapomnij o teorii na dziesięć sekund — po prostu zauważ, jakie <strong>codzienne odczucie</strong> pojawia się w każdej parze:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-dense">▶ Ciasno i gęsto</button>
            <button class="btn-tool" data-play-custom="talk-open">▶ Szeroko i zwiewnie</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-warm">▶ Ciepło i miękko</button>
            <button class="btn-tool" data-play-custom="talk-sharp">▶ Ostro i jasno</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-drive">▶ Sprężyście naprzód</button>
            <button class="btn-tool" data-play-custom="talk-float">▶ Nieważko i spokojnie</button>
          </div>
        </div>

        <h3>3. Co pomaga rozmowie — a co ją blokuje</h3>
        <p>
          Kilka nawyków potrafi niepostrzeżenie urwać muzyczną rozmowę albo wywołać nieporozumienie — zwłaszcza między osobami o różnym doświadczeniu.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Ślepe uliczki i etykiety</h5>
            <p><strong>Puste oceny:</strong> „Ładne / słabe / kiczowate / profesjonalne / niemuzykalne”. Przybijają pieczątkę, nie zdradzając, co właściwie usłyszałeś.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Konkret i otwartość</h5>
            <p><strong>Opisz zmianę:</strong> „Cichy wstęp od razu mnie wciągnął, ale w połowie zrobiło się dla mnie trochę zbyt nerwowo i ostro na górze”.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Rzucanie terminami na chybił trafił</h5>
            <p>Używanie słów „fałsz”, „atonalne”, „przesterowane” czy „za dużo dynamiki”, gdy masz na myśli „trze o siebie”, „zbyt kłujące” albo „brakuje ciepła” — zawodowcy rozumieją te słowa zupełnie technicznie.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Uczciwe porównanie z życia</h5>
            <p>Zostań naturalny: „Nie znam nazwy z teorii, ale tutaj mam wrażenie, jakby dwa chropowate brzegi ocierały się o siebie, a za chwilę znowu miękły”.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Ataki na gust i stereotypy</h5>
            <p>„To nie ma duszy” albo „Typowa muzyka do windy / komercja”. Umniejszanie gatunku od razu gasi ciekawość drugiej strony.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Nazwij fakturę i kontrast</h5>
            <p>„Dla mnie ten fragment płynie tak równo i gładko, aż zaczyna mi brakować jakiejś niespodzianki albo wyraźniejszej krawędzi”.</p>
          </div>
        </div>

        <h3>4. Tłumacz zdań: od „no jakoś tak” do sedna</h3>
        <p>
          Często wystarczy zamienić ogólnik na jeden obraz, aby każdy od razu złapał, o co Ci chodzi:
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Zamiast: „Brzmi jakoś krzywo / dziwnie”.</strong>
              <span>Spróbuj: „Coś tu niespokojnie zgrzyta — przez moment traci się równowagę pod stopami”.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Zamiast: „Strasznie nudne”.</strong>
              <span>Spróbuj: „Muzyka bardzo długo stoi w jednym nastroju — cały czas czekam na jakąś iskrę lub zmianę”.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Zamiast: „Ale petarda!”</strong>
              <span>Spróbuj: „Ten moment wejścia otwiera się tak szeroko, jakbyś nagle wyszedł na świeże powietrze”.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Zamiast: „To leci za szybko”.</strong>
              <span>Spróbuj: „Tutaj dźwięki jakby wpadają na siebie i gonią się — choć sam puls wcale nie przyspiesza”.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Zamiast: „Za głośno i męcząco!”</strong>
              <span>Spróbuj: „W kulminacji wszystko zbija się w jedną ciasną bryłę i kłuje uszy zbyt ostrą górą”.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Zamiast: „Po prostu smutna piosenka”.</strong>
              <span>Spróbuj: „Nie jest tragiczna — raczej cicha, zamyślona i domowo przytulna, jak późne popołudnie”.</span>
            </div>
          </div>
        </div>

        <h3>5. Wskazówki w różnych sytuacjach</h3>
        <ul class="article-steps-list">
          <li><strong>Po koncercie lub przy wspólnym słuchaniu ze znajomymi:</strong> Zamiast suchego <em>„Podobało się?”</em> zapytaj ciekawiej: <em>„Który moment najbardziej został Ci w głowie?”</em>, <em>„Jaka pogoda albo scena filmowa pasuje do tego numeru?”</em> albo <em>„Gdzie Cię złapało, a gdzie uwaga uciekła?”</em></li>
          <li><strong>W chórze, zespole albo na lekcji:</strong> Najpierw doceń to, co działa (<em>„Początek brzmi niezwykle intymnie i blisko — przy powtórce przydałoby się jeszcze więcej światła i uniesienia”</em>). A jako uczeń mów śmiało: <em>„Tutaj jest mi za ciasno / ciężko / nerwowo”</em> — dobry nauczyciel od razu przełoży to na konkretną wskazówkę techniczną.</li>
          <li><strong>Kiedy dwie osoby słyszą coś zupełnie innego:</strong> Tam, gdzie Ty czujesz <em>spokój</em>, ktoś inny może usłyszeć <em>samotność</em>. Nasze wspomnienia i nastrój zawsze słuchają razem z nami — to właśnie wymiana perspektyw czyni rozmowy o muzyce tak ciekawymi.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Ściągawka kieszonkowa (4 proste pytania w każdym momencie)</h4>
          <p>Gdy nagle zabraknie słów, wybierz tylko <strong>jeden</strong> z tych czterech kierunków:</p>
          <ul class="article-steps-list">
            <li><strong>Barwa i temperatura:</strong> Ciepło, miękko i ciemno — czy chłodno, jasno i wyraziście?</li>
            <li><strong>Przestrzeń:</strong> Ciasno i z bliska — czy szeroko, lekko i z oddechem?</li>
            <li><strong>Ruch:</strong> Pcha do przodu, kołysze, potyka się — czy unosi bez ciężaru?</li>
            <li><strong>Punkt zwrotny:</strong> Która jedna chwila zmienia odczucie całego utworu?</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "art-4chords",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>',
    badgeClass: "badge-peach",
    title: "Fenomen 4 akordów",
    subtitle: "Dlaczego setki światowych hitów opierają się na jednej sekwencji",
    tag: "Kadencje i pop",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Harmonia w popie</span>
        <h2>Dlaczego 4 akordy napędzają 1000 przebojów?</h2>
        <p class="article-lead">
          Od The Beatles (<em>Let It Be</em>) i Toto (<em>Africa</em>) po Adele (<em>Someone Like You</em>), Green Day i Taylor Swift — wciąż ta sama sekwencja wraca na szczyty list: <strong>I – V – vi – IV</strong>.
        </p>

        <div class="article-highlight-box">
          <h4>Posłuchaj formuły od razu (w C-dur: C – G – Am – F):</h4>
          <p>Wsłuchaj się, jak zmienia się emocja w każdym kolejnym takcie:</p>
          <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Posłuchaj popowego obiegu (I – V – vi – IV)</button>
        </div>

        <h3>Psychologia ukryta w czterech taktach</h3>
        <ul class="article-steps-list">
          <li>
            <strong>Takt 1 — Tonika (I):</strong> Wszystko startuje jasno, stabilnie i czytelnie. Ucho natychmiast wie, gdzie jest dom.
          </li>
          <li>
            <strong>Takt 2 — Dominanta (V):</strong> Otwiera horyzont i nadaje sprężysty ruch do przodu.
          </li>
          <li>
            <strong>Takt 3 — Moll równoległy (vi):</strong> To tutaj następuje emocjonalny zwrot! Zamiast wrócić wprost do domu, harmonia skręca w bok przez <em>kadencję zwodniczą</em>, wnosząc ciepłą zadumę.
          </li>
          <li>
            <strong>Takt 4 — Subdominanta (IV):</strong> Zamiast twardej kropki na końcu czwarty takt zostawia uchylone drzwi niczym głęboki wdech — idealnie, by bez szwu zacząć od początku!
          </li>
        </ul>

        <div class="article-highlight-box">
          <h4>Zmiana punktu startowego</h4>
          <p>
            Wielu producentów bierze te same cztery akordy, ale zaczyna pętlę od trzeciego taktu (od mola równoległego: <strong>vi – IV – I – V</strong>). Atmosfera od razu staje się mroczniejsza i bardziej dramatyczna (jak w <em>Numb</em> Linkin Park albo <em>Save Tonight</em> Eagle-Eye Cherry):
          </p>
          <button class="btn-tool" data-play-progression="vi,IV,I,V">▶ Porównaj start od mola (vi – IV – I – V)</button>
        </div>
      </div>
    `
  },
  {
    id: "art-gravity",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v7a6 6 0 0 0 12 0V4"/><line x1="4" y1="4" x2="8" y2="4"/><line x1="16" y1="4" x2="20" y2="4"/><line x1="6" y1="8" x2="8" y2="8"/><line x1="16" y1="8" x2="18" y2="8"/></svg>',
    badgeClass: "badge-sage",
    title: "Muzyczny magnetyzm: dźwięk prowadzący i tryton",
    subtitle: "Jak dwa kroki półtonowe zmuszają mózg do wyczekiwania rozwiązania",
    tag: "Napięcie i rozwiązanie",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Grawitacja harmoniczna</span>
        <h2>Dlaczego muzyka ciągnie nas do domu niczym magnes?</h2>
        <p class="article-lead">
          Słuchając muzyki tonalnej, nie odbieramy nut jako pojedynczych punktów, lecz czujemy siły przyciągania między nimi. Główną pracę wykonują dwa drobne mechanizmy półtonowe.
        </p>

        <h3>1. Dźwięk prowadzący (VII → I)</h3>
        <p>
          W gamie durowej między VII stopniem (<strong>H</strong> w C-dur) a górną toniką (<strong>C</strong>) jest tylko jeden półton. Zagraj gamę od C do H i zatrzymaj się — ucho niemal fizycznie domaga się ostatniego kroku:
        </p>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="scale-unresolved">▶ Skala zatrzymana na H (niedokończona!)</button>
          <button class="btn-tool" data-play-custom="leading-tone">▶ Posłuchaj rozwiązania H → C</button>
        </div>

        <h3>2. Rozwiązanie trytonu (V7 → I)</h3>
        <p>
          Dodaj septymę małą (<strong>F</strong>) do dominanty (G-dur) — powstaje <strong>G7</strong>, w którym dwa dźwięki tworzą pełen napięcia <strong>tryton</strong>:
        </p>
        <ul class="article-steps-list">
          <li><strong>H</strong> (VII stopień) ciśnie o półton w górę do <strong>C</strong>.</li>
          <li><strong>F</strong> (IV stopień) opada o półton w dół do <strong>E</strong>.</li>
        </ul>
        <div class="article-highlight-box">
          <h4>Usłysz, jak oba niestabilne dźwięki zamykają się do środka:</h4>
          <p>Najpierw F i H iskrzą razem w ostrym tarciu, po czym nieuchronnie schodzą się do E i C (czysty spokój):</p>
          <button class="btn-tool" data-play-custom="tritone-collapse">▶ Posłuchaj rozwiązania trytonu (F+H → E+C)</button>
        </div>
      </div>
    `
  },
  {
    id: "art-minor-plagal",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>',
    badgeClass: "badge-lilac",
    title: "Chwyt na gęsią skórkę: molowe iv → I",
    subtitle: "Od The Beatles po Radiohead i Disneya: jak dur nabiera słodkiej nostalgii",
    tag: "Sekret songwritingu",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Barwa harmonii</span>
        <h2>Najbardziej wzruszający zwrot akordowy muzyki pop?</h2>
        <p class="article-lead">
          Wyobraź sobie słoneczny letni dzień (durowa tonika <strong>I</strong>), lekką chmurkę na niebie (subdominanta <strong>IV</strong>) — i nagle na krótką chwilę światło staje się złociste i nostalgiczne, zanim znów zaświeci słońce.
        </p>

        <h3>Co dzieje się w progresji IV → iv → I?</h3>
        <p>
          W C-dur subdominanta to <strong>F-dur (F – A – C)</strong>. Obniż środkowe <strong>A</strong> zaledwie o półton do <strong>As</strong> — i dur zmienia się w <strong>f-moll (iv)</strong>. Ta pożyczona nuta <strong>As</strong> (z c-moll) spływa miękko na <strong>G</strong> w C-dur, rysując aksamitną linię chromatyczną: <strong>A → As → G</strong>.
        </p>

        <div class="article-highlight-box">
          <h4>Porównaj oba warianty bezpośrednio po sobie:</h4>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="plagal-major">▶ Klasycznie: C – F – C</button>
            <button class="btn-tool" data-play-custom="plagal-minor">▶ Molowy czar: C – F – Fm – C</button>
          </div>
        </div>

        <h3>Kultowe utwory z tym chwytem</h3>
        <ul class="article-steps-list">
          <li><strong>The Beatles — „In My Life”</strong> (na słowach „I’ll remember you”) oraz <strong>„Blackbird”</strong></li>
          <li><strong>Radiohead — „Creep”</strong> (cały fundament zwrotki i refrenu: G – H – C – Cm)</li>
          <li><strong>Oasis — „Don’t Look Back in Anger”</strong> (finał pre-chorusu)</li>
          <li><strong>Green Day — „Wake Me Up When September Ends”</strong></li>
          <li>Niezliczone finały filmów <strong>Disneya i Pixara</strong></li>
        </ul>
      </div>
    `
  },
  {
    id: "art-physics-waves",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2.5-6 5.5-6 8 0s5.5 6 8 0 3.5-3 4-2"/></svg>',
    badgeClass: "badge-sage",
    title: "Konsonans i dysonans: taniec fal dźwiękowych",
    subtitle: "Od prostych proporcji liczbowych do pasma krytycznego ucha i kontekstu",
    tag: "Fizyka i akustyka",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Fizyka i psychoakustyka</span>
        <h2>Dysonans to nie „błąd”, lecz energia ruchu!</h2>
        <p class="article-lead">
          Początkujący często utożsamiają <strong>konsonans</strong> z „ładnym”, a <strong>dysonans</strong> z „brzydkim”. W rzeczywistości to dwa bieguny opowieści: konsonans oznacza <em>spokój i dotarcie do celu</em>, a dysonans — <em>pęd do przodu, wyrazistość i potrzebę zmiany</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Szybki test słuchowy: napięcie dąży do ukojenia</h4>
          <p>Najpierw posłuchaj samej statyki — a potem poczuj, jak ostre opóźnienie czysto rozwiązuje się w tonice:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-progression="I,I,I">▶ Sam konsonans (statyka)</button>
            <button class="btn-tool" data-play-progression="I,IV,Vsus4,V7,I">▶ Napięcie → Rozwiązanie</button>
          </div>
        </div>

        <h3>1. Bez czarno-białych podziałów: 4 poziomy spektrum</h3>
        <p>
          Już Pitagoras wykazał na monochordzie: im mniejsze liczby całkowite opisują stosunek częstotliwości dwóch dźwięków, tym gładziej łączą się ich fale. Akustyka wyróżnia cztery odcienie:
        </p>

        <div class="spectrum-list">
          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>1. Konsonans doskonały (Pełne stopienie)</span>
              <span>1:1 · 2:1 · 3:2</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill sage" style="width:96%"></div></div>
            <div class="spectrum-sub">Oktawa (2:1), kwinta (3:2) i kwarta (4:3): tak przejrzyste i zwarte, że brzmią niemal jak jeden dźwięk — idealne do burdonów, power chordów i monumentalnych finałów.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="P8">▶ Oktawa (2:1)</button>
              <button class="btn-tool" data-play-interval-harm="P5">▶ Kwinta (3:2)</button>
              <button class="btn-tool" data-play-interval-harm="P4">▶ Kwarta (4:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>2. Konsonans niedoskonały (Ciepły i barwny)</span>
              <span>5:4 · 6:5 · 5:3</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill lilac" style="width:74%"></div></div>
            <div class="spectrum-sub">Tercje i seksty wielkie oraz małe: dość wyraziste, by nieść ciepły odcień dur lub moll. Ciekawostka: we wczesnym średniowieczu tercje uchodziły za dysonanse, aż renesans uczynił z nich fundament harmonii!</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M3">▶ Tercja w. (5:4)</button>
              <button class="btn-tool" data-play-interval-harm="m3">▶ Tercja m. (6:5)</button>
              <button class="btn-tool" data-play-interval-harm="M6">▶ Seksta w. (5:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>3. Łagodny dysonans (Płynność i soul)</span>
              <span>9:8 · 16:9</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill peach" style="width:45%"></div></div>
            <div class="spectrum-sub">Sekunda wielka i septyma mała wprowadzają miękki ruch i drżenie — nieodłączne w bluesie, soulu i ciepłych akordach jazzowych.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M2">▶ Sekunda w. (9:8)</button>
              <button class="btn-tool" data-play-interval-harm="m7">▶ Septyma m. (16:9)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>4. Ostry dysonans (Wysoka energia i szorstkość)</span>
              <span>16:15 · 15:8 · 45:32</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill red" style="width:20%"></div></div>
            <div class="spectrum-sub">Sekunda mała, septyma wielka i tryton zderzają się z szybkim dudnieniem fal — napięcie jak motyw ze „Szczęk” albo dźwięk prowadzący tuż przed toniką.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="TT">▶ Tryton (45:32)</button>
              <button class="btn-tool" data-play-interval-harm="M7">▶ Septyma w. (15:8)</button>
              <button class="btn-tool" data-play-interval-harm="m2">▶ Sekunda m. (16:15)</button>
            </div>
          </div>
        </div>

        <h3>2. Co dzieje się wewnątrz Twojego ucha?</h3>
        <ul class="article-steps-list">
          <li><strong>Pasmo krytyczne ślimaka:</strong> Wzdłuż błony podstawnej w uchu wewnętrznym receptory różnych herców leżą blisko siebie. Gdy dwa dźwięki zbliżą się na mniej niż 15–20% częstotliwości, pobudzają te same komórki rzęsate — mózg odbiera to jako „chropowatość”.</li>
          <li><strong>Pułapka niskiego basu (Lower Interval Limit):</strong> W głębokim basie herce leżą bardzo ciasno! Między <code>C2</code> (65 Hz) a <code>E2</code> (82 Hz) jest ledwie 17 Hz — więc nawet „słodka” tercja wielka brzmi w basie mętnie. Podnieś ją wyżej (<code>C4 + E4</code>, 67 Hz odstępu) — zabrzmi czysto i przejrzyście.</li>
          <li><strong>Starcie alikwotów (efekt Helmholtza):</strong> Każdy naturalny dźwięk kryje cichsze składowe wyższe. W parze <code>C4 + H4</code> (septyma wielka) pierwszy alikwot C4 to <code>C5</code>, który ociera się o jeden półton nad <code>H4</code>!</li>
        </ul>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Ciasno i mętnie (niski rejestr)</h5>
            <p>Dwa dźwięki tłoczą się w jednym paśmie krytycznym ucha:</p>
            <button class="btn-tool" data-play-freqs="65.41,82.41" data-osc="triangle" data-dur="1.8">▶ Tercja w. w basie (C2+E2)</button>
            <button class="btn-tool" data-play-freqs="65.41,69.30" data-osc="triangle" data-dur="1.8">▶ Sekunda m. w basie (C2+Des2)</button>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Przejrzyście i szeroko (środek / duży rozstaw)</h5>
            <p>Ten sam interwał otwiera się natychmiast po podniesieniu lub rozłożeniu:</p>
            <button class="btn-tool" data-play-freqs="261.63,329.63" data-osc="triangle" data-dur="1.8">▶ Tercja w. w środku (C4+E4)</button>
            <button class="btn-tool" data-play-freqs="130.81,554.37" data-osc="triangle" data-dur="1.8">▶ Szeroki rozstaw (C3+Des5)</button>
          </div>
        </div>

        <h3>3. Magia kontekstu: jak tarcie zamienia się w blask</h3>
        <p>
          To, czy współbrzmienie odbieramy jako ostre czy luksusowe, zależy również od otoczenia harmonicznego. Posłuchaj dwóch dźwięków solo, a potem wewnątrz pełnego akordu:
        </p>

        <div class="article-highlight-box">
          <h4>Eksperyment: septyma wielka C + H (15 : 8)</h4>
          <p>Sama para <strong>C4 + H4</strong> brzmi ostro i zaczepnie. Podłóż w środku E4 i G4 (tworząc <strong>Cmaj7</strong>) — ucho otrzymuje wsparcie wspólnych alikwotów i ostrość przemienia się w złoty jazzowy aksamit!</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="isol-maj7">▶ Solo: C4 + H4</button>
            <button class="btn-tool" data-play-custom="chord-maj7">▶ W akordzie: Cmaj7 (C–E–G–H)</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-song-tricks",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    badgeClass: "badge-peach",
    title: "Ściągawka melodii do interwałów",
    subtitle: "Znane początki utworów — skojarzenia w górę i w dół od pierwszej nuty",
    tag: "Skojarzenia",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Kotwice słuchowe</span>
        <h2>Rozpoznawaj interwały natychmiast dzięki znanym motywom</h2>
        <p class="article-lead">
          Najszybsza droga do zapamiętania każdego skoku to skojarzenie go z dwiema pierwszymi nutami niezapomnianej melodii. Oto Twoja ściągawka dla interwałów w górę:
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Sekunda mała (2m)</strong>
              <span>Motyw „Szczęk” (Jaws) / „Różowa Pantera”</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m2">▶ Odtwórz</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Sekunda wielka (2w)</strong>
              <span>Happy Birthday / Panie Janie</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M2">▶ Odtwórz</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tercja mała (3m)</strong>
              <span>Seven Nation Army / Greensleeves</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m3">▶ Odtwórz</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tercja wielka (3w)</strong>
              <span>When the Saints / Morning Has Broken</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M3">▶ Odtwórz</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Kwarta czysta (P4)</strong>
              <span>Harry Potter / Marsz weselny Wagnera</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P4">▶ Odtwórz</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tryton (TT)</strong>
              <span>Simpsonowie („The Simp-sons”) / Maria</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="TT">▶ Odtwórz</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Kwinta czysta (P5)</strong>
              <span>Gwiezdne wojny / Twinkle, Twinkle, Little Star</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P5">▶ Odtwórz</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Seksta wielka (6w)</strong>
              <span>My Bonnie Lies Over the Ocean</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M6">▶ Odtwórz</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Oktawa czysta (P8)</strong>
              <span>Somewhere Over the Rainbow</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P8">▶ Odtwórz</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-functional",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5"/></svg>',
    badgeClass: "badge-lilac",
    title: "Słuch relatywny kontra absolutny",
    subtitle: "Dlaczego wyczucie roli harmonicznej wygrywa w muzyce z suchym nazywaniem tonów",
    tag: "Metoda",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Filozofia słuchu</span>
        <h2>Dlaczego relacje znaczą więcej niż gołe herce</h2>
        <p class="article-lead">
          Często sądzi się, że „świetny słuch” polega na usłyszeniu brzęku filiżanki i zawołaniu: „Fis!” (tzw. <em>słuch absolutny</em>). Tymczasem w muzyce prawdziwe emocje rodzi funkcja dźwięku w tonacji.
        </p>

        <h3>Sam dźwięk nie ma emocji</h3>
        <p>
          Dokładnie ta sama nuta <strong>E</strong> brzmi ciepło, pogodnie i stabilnie w <strong>C-dur</strong> (ponieważ jest tam spokojną tercją wielką, <em>Mi</em>). Zagraj jednak to samo <strong>E</strong> w tonacji <strong>F-dur</strong> — i natychmiast zaczyna niespokojnie ciągnąć w górę (bo stało się ostrym dźwiękiem prowadzącym, <em>Ti</em>!).
        </p>

        <div class="article-highlight-box">
          <h4>Eksperyment „Eureka”: ta sama nuta E4 w dwóch rolach</h4>
          <p>Usłysz identyczny dźwięk docelowy <strong>E4</strong> dwukrotnie — najpierw po akordzie C-dur (spokój), a potem po akordzie F-dur (napięcie):</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="context-c">▶ E4 w C-dur (spokojne Mi)</button>
            <button class="btn-tool" data-play-custom="context-f">▶ E4 w F-dur (napięte Ti)</button>
          </div>
        </div>

        <p>
          Dlatego Lauscher rozwija <strong>słuch funkcyjny (relatywny)</strong>: gdy tylko Twoje ucho zacznie rozpoznawać <em>rolę</em> każdego stopnia lub akordu w skali, od razu przeniesiesz tę umiejętność na wszystkie 12 tonacji!
        </p>
      </div>
    `
  },
  {
    id: "art-world-music-cultures",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Systemy muzyczne świata: 12 dźwięków, mikrotonalność i kultura",
    subtitle: "Dlaczego zachodni fortepian to tylko jeden z wielu światów brzmienia",
    tag: "Muzyka świata i akustyka",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Kultury, strój &amp; mikrotonalność</span>
        <h2>12-stopniowa siatka półtonów to wynalazek — nie prawo natury</h2>
        <p class="article-lead">
          Dorastając przy fortepianie, gitarze czy zachodnim popie, łatwo uznać 12 równych półtonów w oktawie za naturalny fundament wszelkiej muzyki. Tymczasem spojrzenie w głąb kultur świata pokazuje coś zupełnie innego: inne tradycje dzielą oktawę na 22 lub 53 subtelne kroki, naginają wysokość między klawiszami, celowo stroją pary instrumentów z akustycznym dudnieniem albo budują wielogodzinne opowieści bez ani jednej zachodniej progresji akordów.
        </p>

        <h3>1. Zachodni kompromis: dlaczego lekko „rozstroiliśmy” fortepian</h3>
        <p>
          W czystej fizyce fale najbardziej konsonansowych interwałów tworzą proste stosunki liczbowe (<em>strój naturalny / czysty</em>): czysta kwinta drga w proporcji <code>3:2</code> (~701,96 centa), a czysta tercja wielka <code>5:4</code> (386,31 centa). Gdy jednak ułożymy kolejno dwanaście czystych kwint, nie trafimy idealnie siedem oktaw wyżej — pozostanie drobna nadwyżka około <strong>23,5 centa</strong> (tzw. <em>komat pitagorejski</em>). Na instrumencie o sztywnych klawiszach idealne nastrojenie jednej tonacji sprawia, że odległe tonacje brzmią rażąco fałszywie.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Zachodnie rozwiązanie (~1700 → dziś)</h5>
            <p>Po epoce <em>strojów dobrze temperowanych</em> (jak u Bacha, gdzie każda tonacja zachowywała własny charakter) upowszechnił się <strong>strój równomiernie temperowany (12-TET)</strong>: każdy półton ma dokładnie <code>100 centów</code>. Ucho płaci za to cichą cenę — każda tercja wielka jest za wysoka o ok. <strong>+14 centów</strong>, a kwinta o <strong>−2 centy</strong> węższa — w zamian jednak zyskujemy swobodną modulację we wszystkich 12 tonacjach i potężną harmonię wielogłosową (architektura <em>wertykalna</em>).</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Droga wielu tradycji poza Europą</h5>
            <p>Kultury skupione na mistrzowskiej linii melodycznej (architektura <em>horyzontalna</em>) nad stałym dźwiękiem bazowym (<em>burdonem / dronem</em>) nie muszą przenosić akordów przez całe koło kwintowe. Rezygnują więc z równych półtonów, zachowując krystalicznie czyste alikwoty oraz niezliczone mikroodcienie między klawiszami (<em>Makam</em>, <em>Raga</em>, <em>Dastgah</em>).</p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Porównanie na ucho: Czysty trójdźwięk naturalny vs. fortepian 12-TET</h4>
          <p>Posłuchaj najpierw fizycznie czystego trójdźwięku durowego (<code>4:5:6</code> — kwinta <code>3:2</code>, tercja <code>5:4</code>), a zaraz po nim tego samego akordu C-dur w stroju równomiernie temperowanym (12-TET). Zwróć uwagę na lekkie migotanie tercji 12-TET!</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Czysty trójdźwięk (4:5:6)</button>
            <button class="btn-tool" data-play-freqs="261.63,329.63,392.00" data-osc="triangle" data-dur="2.0">▶ Strój 12-TET (fortepian)</button>
          </div>
        </div>

        <h3>2. Czym właściwie jest „mikrotonalność”? (Centy i komaty)</h3>
        <p>
          Aby precyzyjnie mierzyć wysokości poza klawiaturą fortepianu, akustycy dzielą oktawę na równo <strong>1200 centów</strong>. Standardowy zachodni półton to <code>100 centów</code> — ale przestrzeń pomiędzy nimi kryje fascynujące niuanse:
        </p>

        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>Próg ludzkiego słuchu</strong>
            W średnim rejestrze wyćwiczone ucho odróżnia już różnice rzędu <strong>3–6 centów</strong> — zwłaszcza wobec stałego dronu przez delikatne dudnienie lub zmianę barwy.
          </div>
          <div class="physics-fact-item">
            <strong>Ćwierćtony i stopnie neutralne</strong>
            Prawdziwy <strong>ćwierćton</strong> to <code>50 centów</code>, a neutralny <strong>trzyczwarte-ton</strong> liczy <code>150 centów</code> — brzmiąc ani „wesoło-durowo”, ani „smutno-molowo”, lecz zupełnie swoiście.
          </div>
          <div class="physics-fact-item">
            <strong>Komat (ok. 22–24 centów)</strong>
            Turecka teoria Makam dzieli cały ton na <strong>9 komatów Holdera</strong> (po ~22,6 centa) — co daje aż <strong>53 stopnie podziału w oktawie</strong>!
          </div>
          <div class="physics-fact-item">
            <strong>Dźwięk jako ruch, nie punkt</strong>
            W wielu kulturach dźwięk nie jest sztywnym uderzeniem klawisza, lecz żywą krzywą złożoną z podciągnięć, wibrat i zawieszeń wokół centrum wysokości.
          </div>
        </div>

        <h3>3. Świat arabski, perski i turecki: Maqam, Makam &amp; Dastgāh</h3>
        <p>
          Od Maroka przez Kair, Bagdad i Teheran po Stambuł serce muzyki klasycznej bije nie w zmianach akordów, lecz w precyzyjnych drogach melodycznych: arabskich <strong>Maqamat</strong>, tureckich <strong>Makamlar</strong> czy perskich <strong>Dastgāh</strong> (z mikrotonowymi znakami <em>Koron</em> i <em>Sori</em>). Zamiast traktować 7-dźwiękową gamę jako statyczny zbiór, buduje się tu frazy z małych 3–5-dźwiękowych komórek zwanych <strong>Jins</strong> (l. mn. <em>Ajnas</em>). Każdy Maqam opisuje jednocześnie mikrotonowy strój, kierunek podróży melodycznej (<em>Sayr</em>) oraz nastrój emocjonalny.
        </p>
        <p>
          Najsłynniejszym znakiem rozpoznawczym tej tradycji są <strong>interwały neutralne</strong> — zwłaszcza <em>tercja neutralna</em> około <strong>350 centów</strong> (dokładnie w połowie między zachodnią tercją małą 300 ct a wielką 400 ct!). Na zwykłym fortepianie ten dźwięk nie istnieje, natomiast na bezprogowej lutni <em>Oud</em> lub flecie trzcinowym <em>Ney</em> stanowi świetliste centrum całych epok muzyki.
        </p>

        <div class="article-highlight-box">
          <h4>Laboratorium mikrotonowe: Trzy tercje obok siebie (Maqam Rast &amp; Bayati)</h4>
          <p>Porównaj nad tym samym dźwiękiem podstawowym zachodnią tercję wielką (<code>400 ct</code>), arabską tercję neutralną (<code>350 ct</code>) i tercję małą (<code>300 ct</code>), a następnie posłuchaj zwrotów w <strong>Maqam Rast</strong> i ćwierćtonowego wahadła w <strong>Maqam Bayati</strong>:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-maqam-contrast">▶ Wielka vs Neutralna vs Mała tercja</button>
            <button class="btn-tool" data-play-custom="culture-maqam-rast">▶ Maqam Rast (350 &amp; 1050 ct)</button>
            <button class="btn-tool" data-play-custom="culture-maqam-bayati">▶ Maqam Bayati (stopień 150 ct)</button>
          </div>
        </div>

        <h3>4. Azja Południowa (Pakistan i Indie): Raga, 22 Shruti, Tanpura i Tala</h3>
        <p>
          W klasycznej muzyce hindustańskiej — żywej zarówno w północnych Indiach, jak i w Pakistanie (od śpiewu <em>Khyal</em> i mistycznego <em>Qawwali</em> po sitar, sarangi i flet bansuri) — cała muzyka unosi się nad jednym, nieprzerwanie drgającym fundamentem: pełnym alikwotów burdonem <strong>Tanpury</strong> (zazwyczaj prymą <code>Sa</code> i kwintą <code>Pa</code>). Skoro centrum tonalne nie zmienia się co takt, nie ma potrzeby temperowania skali.
        </p>
        <ul class="article-steps-list">
          <li><strong>22 Shruti (mikrotonalne punkty odniesienia):</strong> Choć <em>Raga</em> używa zazwyczaj 5, 6 lub 7 stopni (<em>Svara</em>), ich dokładną wysokość wybiera spośród <strong>22 subtelnych pozycji (Shruti)</strong> w oktawie. Bardzo nisko opuszczone <code>Ati-Komal Re</code> w Radze Bhairav przyciąga się blisko do <code>Sa</code> znacznie mocniej niż fortepianowa sekunda mała — nadając jej podniosłą powagę poranka.</li>
          <li><strong>Życie między dźwiękami (Meend, Andolan &amp; Gamak):</strong> Na sitarze lub w głosie prosty, nieruchomy dźwięk wydaje się wręcz nagi. Prawdziwe piękno kryje się w <em>Meend</em> (płynnym ślizgu między tonami), <em>Andolan</em> (łagodnym kołysaniu wokół mikrotonu) i <em>Gamak</em> (energicznych ornamentach). To łuk między nutami opowiada historię.</li>
          <li><strong>Raga i pora dnia:</strong> Raga ma własną ścieżkę wznoszącą (<em>Aroha</em>) i opadającą (<em>Avaroha</em>), główny dźwięk spoczynku (<em>Vadi</em>) i przypisaną porę doby (poranny <em>Bhairav</em> kontra nocna <em>Darbari Kanada</em>).</li>
          <li><strong>Tala (czas cykliczny):</strong> Zamiast marszowych taktów, bębny <em>Tabla</em> krążą w zamkniętych cyklach — np. 16 uderzeń (<em>Teental</em>), 10 (<em>Jhaptal</em>) lub 7 (<em>Rupak</em>) — stale powracając do namagnetyzowanego pierwszego uderzenia: <strong>Sam</strong>.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Przykład odsłuchowy: Raga Bhairav nad burdonem Tanpury (Sa–Pa)</h4>
          <p>Wsłuchaj się w bardzo niski drugi stopień (<code>Ati-Komal Re</code>) oraz spokojne zejście sześciostopniowe wracające do kojącego <code>Sa</code>:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-raga-bhairav">▶ Raga Bhairav (Tanpura + intonacja 22-Shruti)</button>
          </div>
        </div>

        <h3>5. Indonezja (Jawa i Bali): Gamelan, Sléndro, Pélog i morska fala Ombak</h3>
        <p>
          Niewiele tradycji muzycznych tak śmiało przełamuje zachodnie nawyki jak brązowe orkiestry <strong>Gamelan</strong> z Jawy i Bali. Nie obowiązuje tu żaden wspólny kamerton typu <code>A = 440 Hz</code>: <strong>każdy większy zespół Gamelan posiada własny, unikatowy strój!</strong> Z tego powodu dwa odrębne zespoły na ogół nie mogą grać razem — każdy strzeże bowiem własnej tożsamości brzmieniowej.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Sléndro: 5 niemal równych kroków</h5>
            <p>Dzieli oktawę nie na 12 części, lecz w przybliżeniu na <strong>5 zbliżonych odstępów</strong> po ok. <code>240 centów</code>. W idealnym stroju Sléndro nie ma ani zachodniej tercji wielkiej, ani czystej kwinty czy kwarty — ucho uwalnia się od przyzwyczajeń do trójdźwięków!</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Pélog &amp; Ombak („Morska fala”)</h5>
            <p><strong>Pélog</strong> obejmuje 7 asymetrycznych stopni, z których dobiera się skale pięciodźwiękowe. Na Bali metalofony stroi się dodatkowo parami: jeden instrument (<em>Pengumbang</em>) lekko niżej, a jego bliźniak (<em>Pengisep</em>) o ok. <strong>5–8 Hz wyżej</strong>. Uderzone razem wytwarzają <strong>Ombak</strong> („falę”) — celowe, świetliste falowanie dźwięku będące duszą orkiestry.</p>
          </div>
        </div>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-gamelan-slendro">▶ Skala Sléndro (~240 ct równomiernie)</button>
          <button class="btn-tool" data-play-custom="culture-gamelan-ombak">▶ Balijskie migotanie Ombak (~7 Hz)</button>
        </div>

        <h3>6. Afryka Subsaharyjska i Azja Wschodnia: polirytmia, Blue Notes i sztuka ciszy</h3>
        <ul class="article-steps-list">
          <li><strong>Afryka Subsaharyjska — Splecione cykle i asymetria:</strong> Tam, gdzie muzyka europejska buduje złożone następstwa akordów, tradycje Afryki Zachodniej i Środkowej wznoszą zapierającą dech architekturę rytmu. Różne głosy łączą przeciwstawne pulsy naraz (<strong>3 przeciw 4</strong> albo <strong>3 przeciw 2</strong> — pełna <em>polirytmia</em>), spinane asymetrycznym wzorem dzwonka zwanym <strong>Bell Timeline</strong> (np. klasyczny schemat 12/8: <code>x . x . x x . x . x . x</code>). Żaden głos nie dominuje w pojedynkę — groove rodzi się ze splatania (<em>Interlocking</em>) i dialogu zawołania z odpowiedzią (<em>Call &amp; Response</em>).</li>
          <li><strong>Od Afryki Zachodniej do Bluesa, Jazzu i Soulu (Blue Notes!):</strong> Gdy zniewoleni muzycy z Afryki zetknęli się w Ameryce Północnej z gitarą, fortepianem i instrumentami dętymi, ich wokalnie obniżane tercje, kwinty i septymy nie mieściły się w sztywnych progach 12-TET. Z tego zderzenia narodziły się mikrotonalne <strong>Blue Notes</strong> — najbardziej poruszająca przestrzeń „pomiędzy” klawiszami w bluesie, gospel, jazzie i rocku.</li>
          <li><strong>Azja Wschodnia — Barwa, nacisk palca i estetyka „Ma”:</strong> Klasyczna muzyka chińska (cytra <em>Guqin</em> z ponad setką technik szarpania i podciągania) czy japońska (bambusowy flet <em>Shakuhachi</em>) często opiera się na pentatonice, ale przenosi kunszt w mikrotonalne przegięcia, szmer oddechu oraz poczucie czasu zwane <strong>Ma (間)</strong> — pełną napięcia ciszę między dźwiękami, ważącą tyle samo co sam ton.</li>
        </ul>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-westafrica-poly">▶ Dzwonek 12/8 Timeline + polirytmia 4-na-3</button>
        </div>

        <h3>7. Cztery osie porównania światowego — i zysk dla Twojego słuchu</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>1. Zasób dźwięków i strój</strong>
              <span>Zachód: 12 stałych kroków po 100 centów (12-TET). Świat: 5-dźwiękowe Sléndro (~240 ct), 22 Shruti, 53-komatowy Makam lub płynne centra wysokości.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>2. Wertykalnie vs. Horyzontalnie</strong>
              <span>Zachodnia muzyka opowiada zmianami akordów. Maqam i Raga budują głębię przez mikrotonową linię i ornamentykę nad jednym fundamentem.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>3. Ideał brzmienia</strong>
              <span>Czyste stapianie brzmień vs balijskie drżenie <em>Ombak</em>, brzęczący mostek sitaru (<em>Jawari</em>) czy powietrzne alikwoty bambusowych fletów.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>4. Poczucie czasu</strong>
              <span>Liniowe takty 3/4 i 4/4 vs koliste cykle (<em>Tala</em>), asymetryczne wzorce 12/8 albo oddychająca estetyka pauzy (<em>Ma</em>).</span>
            </div>
          </div>
        </div>

        <div class="k-song-ref">
          <strong>Co zyskuje na tym Twoje ucho?</strong> Każda tradycja muzyczna kształci inną supermoc: zachodni system rozwija słuchanie funkcji akordowych i modulacji; Maqam oraz Raga wyostrzają Twój <strong>mikrotonalny radar</strong> i czystość intonacji w śpiewie lub grze na smyczkach; Gamelan i afrykańska polirytmia uwalniają od sztywnego liczenia taktów i osadzają rytm w całym ciele. Ćwicząc interwały w Lauscher, uczysz się słyszeć <em>relacje zamiast sztywnych etykiet</em> — a to otwiera drzwi do muzyki z każdego zakątka Ziemi.
        </div>
      </div>
    `
  },
  {
    id: "art-mnemonics",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1.1 2h5.8c.1-.8.5-1.5 1.1-2A7 7 0 0 0 12 2z"/></svg>`,
    badgeClass: "badge-peach",
    title: "Muzyczne mnemotechniki i wierszyki",
    subtitle: "Najlepsze polskie wierszyki do koła kwintowego, kluczy, strun, interwałów i rytmu",
    tag: "Wierszyki & Praktyka",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Wierszyki &amp; Praktyka</span>
        <h2>Muzyczne mnemotechniki: wiedza, która od razu zostaje w głowie</h2>
        <p class="article-lead">
          Dlaczego zabawne zdanie o czarnym gawronie albo hrabinie zapamiętujemy w dziesięć sekund, a suchy ciąg liter ulatuje po pięciu minutach? Nasz mózg uwielbia <strong>obrazy, rymy, historie i rytm</strong>. Oto najpopularniejsze mnemotechniki używane w polskiej edukacji muzycznej.
        </p>

        <h3>1. Koło kwintowe oraz kolejność krzyżyków i bemoli</h3>
        <p>
          W polskich szkołach muzycznych tonacje w kole kwintowym oraz kolejność znaków przykluczowych zapamiętuje się za pomocą kultowych zdań:
        </p>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Tonacje krzyżykowe (C – G – D – A – E – H – Fis – Cis)</h5>
            <p>
              Wersja szkolna:<br>
              <strong>„<u>C</u>zarny <u>G</u>awron <u>D</u>ziobie <u>A</u>rbuza, <u>E</u>wka <u>H</u>oduje <u>Fis</u>tachy”</strong><br>
              Klasyczna wersja akademicka:<br>
              <em>„<strong>C</strong>elibat <strong>G</strong>wałci <strong>D</strong>ziś <strong>A</strong>mor, <strong>E</strong>kscelencjo <strong>H</strong>rabino (<strong>Fis</strong>, <strong>Cis</strong>)”</em>.<br>
              0 znaków = C-dur → 1♯ = G-dur, 2♯ = D-dur, 3♯ = A-dur, 4♯ = E-dur, 5♯ = H-dur, 6♯ = Fis-dur.
            </p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Tonacje bemolowe (F – B – Es – As – Des – Ges)</h5>
            <p>
              <strong>„<u>F</u>ranek <u>B</u>ył <u>Es</u>kimoskim <u>As</u>em <u>Des</u>korolki (<u>Ges</u>)”</strong><br>
              <em>Kolejność 7 krzyżyków przy kluczu:</em> <strong>Fis – Cis – Gis – Dis – Ais – Eis – His</strong>.<br>
              <em>Kolejność 7 bemoli (dokładnie odwrotnie!):</em> <strong>B – Es – As – Des – Ges – Ces – Fes</strong>.
            </p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Dwa błyskawiczne triki do odczytywania tonacji ze znaków przy kluczu</h4>
          <ul class="article-steps-list">
            <li><strong>Przy krzyżykach (♯):</strong> <em>Ostatni krzyżyk z prawej strony</em> to zawsze <strong>VII stopień (dźwięk prowadzący)</strong>. Przejdź o <strong>półton wyżej</strong> — i masz nazwę gamy durowej! (Przykład: ostatni krzyżyk to <em>Cis</em> → półton wyżej = <strong>D-dur</strong>).</li>
            <li><strong>Przy bemolach (♭):</strong> <em>Przedostatni bemol</em> wprost podaje nazwę gamy durowej! (Przykład: 3 bemole = B, <strong>Es</strong>, As → <strong>Es-dur</strong>. Tylko 1♭ = <strong>F-dur</strong> zapamiętujesz osobno).</li>
            <li><strong>Gama molowa równoległa:</strong> Zejdź o <strong>3 półtony (tercję małą) w dół</strong> od prymy durowej (C-dur → a-moll, G-dur → e-moll).</li>
          </ul>
          <button class="btn-tool" data-jump-ref="circle-of-fifths">→ Otwórz interaktywne koło kwintowe</button>
        </div>

        <h3>2. Linie i pola pięciolinii (klucz wiolinowy, basowy i altowy)</h3>
        <p>
          Zamiast liczyć linie po kolei, użyj prostych kotwic (zawsze czytanych <strong>od dołu do góry</strong>):
        </p>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Klucz wiolinowy • 4 pola: F – A – C – E</strong>
              <span>Tworzą od dołu do góry angielskie słowo <strong>„FACE”</strong> (twarz) albo zdanie: <em>„<strong>F</strong>ajny <strong>A</strong>lbatros <strong>C</strong>zeka <strong>E</strong>kspresem”</em>.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Klucz wiolinowy • 5 linii: E – G – H – D – F</strong>
              <span><em>„<strong>E</strong>wa <strong>G</strong>ra <strong>H</strong>ejnał <strong>D</strong>la <strong>F</strong>ranka”</em>.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Klucz basowy • 5 linii (G – H – D – F – A) i 4 pola (A – C – E – G)</strong>
              <span>• Linie: <em>„<strong>G</strong>dzie <strong>H</strong>rabia <strong>D</strong>ziś <strong>F</strong>rutti <strong>A</strong>bsorbuje”</em>.<br>• Pola: <em>„<strong>A</strong>le <strong>C</strong>icho <strong>E</strong>cho <strong>G</strong>ra”</em>.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Trzy punkty orientacyjne kluczy (G, F oraz C)</strong>
              <span>• <strong>Klucz wiolinowy = klucz G:</strong> Ślimak oplata 2. linię (<strong>g¹</strong>).<br>• <strong>Klucz basowy = klucz F:</strong> Dwie kropki obejmują 4. linię (<strong>f</strong>). <em>Trik:</em> każdą nutę w kluczu basowym czytasz o <strong>dwa stopnie (tercję) wyżej w nazwie</strong> niż w wiolinowym!<br>• <strong>Klucz altowy = klucz C:</strong> Środkowe wcięcie wskazuje dokładnie 3. linię = <strong>c¹ (C dziurki od klucza)</strong>!</span>
            </div>
          </div>
        </div>

        <h3>3. Puste struny: Gitara, Bas, Skrzypce, Altówka, Wiolonczela i Ukulele</h3>
        <p>
          Od najniższej (najgrubszej) do najwyższej (najcieńszej) struny:
        </p>
        <ul class="article-steps-list">
          <li><strong>Gitara (6 strun: E – A – D – G – H – E):</strong> <em>„<strong>E</strong>dek <strong>A</strong>lbo <strong>D</strong>arek <strong>G</strong>rają <strong>H</strong>ymn <strong>E</strong>uropy”</em>.</li>
          <li><strong>Gitara basowa i kontrabas (4 struny: E – A – D – G):</strong> Cztery dolne struny gitary (strojone w czystych kwartach).</li>
          <li><strong>Skrzypce (4 struny: G – D – A – E):</strong> <em>„<strong>G</strong>rają <strong>D</strong>zieci <strong>A</strong>rię <strong>E</strong>tiudy”</em> — cztery czyste kwinty w górę!</li>
          <li><strong>Altówka i wiolonczela (4 struny: C – G – D – A):</strong> <em>„<strong>C</strong>ałe <strong>G</strong>rono <strong>D</strong>aje <strong>A</strong>plauz”</em> — czyste kwinty w górę od C.</li>
          <li><strong>Ukulele (G – C – E – A):</strong> <em>„<strong>G</strong>ram <strong>C</strong>odziennie <strong>E</strong>tiudy <strong>A</strong>kustyczne”</em>.</li>
        </ul>

        <h3>4. Piosenki-kotwice do rozpoznawania interwałów ze słuchu</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Sekunda mała (1 półton) &amp; Sekunda wielka (2 półtony)</strong>
              <span>• <strong>Sekunda mała:</strong> <em>Szczęki (Jaws)</em> w górę / <em>Dla Elizy</em> w dół.<br>• <strong>Sekunda wielka:</strong> <em>Sto lat</em> (po pierwszym skoku) lub początek gamy durowej.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="1">▶ 2m</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tercja mała (3 półtony) &amp; Tercja wielka (4 półtony)</strong>
              <span>• <strong>Tercja mała:</strong> <em>Hej, sokoły!</em> lub <em>Greensleeves</em> w górę / głos kukułki lub <em>Hey Jude</em> w dół.<br>• <strong>Tercja wielka:</strong> <em>Panie Janie</em> (dwa pierwsze kroki: C–D–E) lub <em>Oh When the Saints</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="4">▶ 3w</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Kwarta czysta (5 półtonów) &amp; Tryton (6 półtonów)</strong>
              <span>• <strong>Kwarta czysta:</strong> <em>Marsz weselny</em> lub <em>Amazing Grace</em>.<br>• <strong>Tryton (4zw / 5zm):</strong> <em>Simpsonowie („The Simp-sons”)</em> lub <em>Maria (West Side Story)</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="6">▶ Tryton</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Kwinta czysta (7 półtonów), Seksta wielka (9) &amp; Oktawa (12)</strong>
              <span>• <strong>Kwinta czysta:</strong> <em>Gwiezdne wojny (Star Wars)</em> lub <em>Twinkle, Twinkle, Little Star</em>.<br>• <strong>Seksta wielka:</strong> <em>My Bonnie Lies Over the Ocean</em>.<br>• <strong>Oktawa:</strong> <em>Somewhere Over the Rainbow</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="7">▶ 5cz</button>
          </div>
        </div>

        <h3>5. Skale modalne, trójdźwięki i słowa rytmiczne</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-lilac">
            <h5>7 skal kościelnych (modalnych) w kolejności od C do H</h5>
            <p>
              <strong><u>J</u>ońska – <u>D</u>orycka – <u>F</u>rygijska – <u>L</u>idyjska – <u>M</u>iksolidyjska – <u>E</u>olska – <u>L</u>okrycka</strong><br>
              Zdanie: <em>„<strong>J</strong>ak <strong>D</strong>obrze <strong>F</strong>ilozofować <strong>L</strong>atem <strong>M</strong>iędzy <strong>E</strong>fektownymi <strong>L</strong>asami”</em>.<br>
              <strong>Szybki skrót słuchowy (dźwięk charakterystyczny):</strong><br>
              • Dur + wysoka <strong>#4</strong> = <strong>Lidyjska</strong><br>
              • Dur + niska <strong>b7</strong> = <strong>Miksolidyjska</strong><br>
              • Moll + jasna <strong>♮6</strong> = <strong>Dorycka</strong><br>
              • Moll + ciemna <strong>b2</strong> = <strong>Frygijska</strong>
            </p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Słowa rytmiczne &amp; wzór na trójdźwięki</h5>
            <p>
              <strong>Mów rytm sylabami zamiast liczyć:</strong><br>
              • Ćwierćnuta (♩): <em>„Krok”</em> / <em>„Bam”</em><br>
              • Dwie ósemki (♪♪): <em>„Ka-wa”</em> / <em>„Bie-gnij”</em><br>
              • Triola ósemkowa (3 na miarę): <em>„A-na-nas”</em><br>
              • Cztery szesnastki (4 na miarę): <em>„Cze-ko-la-da”</em><br>
              <strong>Budowa trójdźwięków (w półtonach):</strong><br>
              • <strong>Dur = 4 + 3</strong> • <strong>Moll = 3 + 4</strong><br>
              • <strong>Zmniejszony = 3 + 3</strong> • <strong>Zwiększony = 4 + 4</strong>
            </p>
          </div>
        </div>
      </div>
    `
  }
];

const PHYSICS_WAVE_EXPLANATIONS_PL = {
  "2,1": "<strong>Oktawa (2 : 1):</strong> Na 2 długie zielone fale dźwięku bazowego przypada dokładnie <strong>4 o połowę krótsze fale pomarańczowe</strong>. Na 3. ścieżce kształt fali powtarza się identycznie na każdej przerywanej linii — dlatego oba tony brzmią niemal jak jeden.",
  "3,2": "<strong>Kwinta czysta (3 : 2):</strong> Gdy dźwięk bazowy robi 2 długie zielone fale, górny zatacza dokładnie <strong>3 fale pomarańczowe</strong>. Co dwa cykle spotykają się idealnie — brzmienie jest stabilne, otwarte i pełne mocy.",
  "4,3": "<strong>Kwarta czysta (4 : 3):</strong> 3 zielone fale schodzą się dokładnie z 4 pomarańczowymi, po czym cały wzór startuje od nowa równo w rytmie.",
  "5,4": "<strong>Tercja wielka (5 : 4):</strong> 4 zielone cykle na 5 pomarańczowych. Na 3. ścieżce fala tworzy miękką, gładką linię — to ciepło akordów durowych.",
  "6,5": "<strong>Tercja mała (6 : 5):</strong> 5 zielonych fal wobec 6 pomarańczowych: nieco ciaśniejsze nakładanie niż w tercji wielkiej, co daje trybowi molowemu jego emocjonalny charakter.",
  "5,3": "<strong>Seksta wielka (5 : 3):</strong> Stosunek 1,67 : 1 — przewrót tercji małej. Szeroka, śpiewna i przyjemnie zrównoważona.",
  "45,32": "<strong>Tryton (45 : 32):</strong> Pomarańczowe szczyty prawie nigdzie nie pasują do zielonej siatki — spójrz na 3. ścieżkę: robi się poszarpana i pełna napięcia!",
  "16,15": "<strong>Sekunda mała (16 : 15):</strong> Obie fale mają niemal identyczne tempo, ale powoli rozjeżdżają się względem siebie — tworząc grube i chude „brzuchy” na 3. ścieżce (dudnienie)."
};

const PHYSICS_OVERTONES_PL = [
  { num: 1, note: "C", ratio: "1× · Podstawa", freq: 65.41, special: false },
  { num: 2, note: "c", ratio: "2× · Oktawa", freq: 130.82, special: false },
  { num: 3, note: "g", ratio: "3× · Kwinta", freq: 196.23, special: false },
  { num: 4, note: "c¹", ratio: "4× · 2. oktawa", freq: 261.64, special: false },
  { num: 5, note: "e¹", ratio: "5× · Tercja w.", freq: 327.05, special: false },
  { num: 6, note: "g¹", ratio: "6× · Kwinta", freq: 392.46, special: false },
  { num: 7, note: "~b¹*", ratio: "7× · Nat. 7", freq: 457.87, special: true },
  { num: 8, note: "c²", ratio: "8× · 3. oktawa", freq: 523.28, special: false },
  { num: 9, note: "d²", ratio: "9× · Sek. w.", freq: 588.69, special: false },
  { num: 10, note: "e²", ratio: "10× · Tercja w.", freq: 654.1, special: false },
  { num: 11, note: "~f²/fis²*", ratio: "11× · Alpej. F", freq: 719.51, special: true },
  { num: 12, note: "g²", ratio: "12× · Kwinta", freq: 784.92, special: false }
];

function renderPhysicsReferenceHTML_PL() {
  const waveBanner = typeof currentWaveExplainKey !== "undefined"
    ? (PHYSICS_WAVE_EXPLANATIONS_PL[currentWaveExplainKey] || PHYSICS_WAVE_EXPLANATIONS_PL["2,1"])
    : PHYSICS_WAVE_EXPLANATIONS_PL["2,1"];

  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Jak powstaje dźwięk i fala</span>
        <span class="k-ratio-chip">ok. 343 m/s</span>
      </div>
      <h4>Od drgającego powietrza do krzywej sinusoidalnej</h4>
      <p>
        Kiedy szarpniesz strunę gitary albo zaczniesz nucić, coś bardzo szybko drga tam i z powrotem. Te drgania popychają cząsteczki powietrza obok — i jak zmarszczki na wodzie wysyłają falę ciśnienia z prędkością ok. <strong>343 metrów na sekundę</strong> (ponad 1200 km/h!). Gdy dotrze do ucha, Twoja błona bębenkowa drga w tym samym rytmie, a mózg zamienia to w muzykę.
      </p>
      <p>
        Wyobraź sobie huśtawkę płynnie bujającą się bez żadnych szarpnięć: jeśli rozrysujesz ten ruch w czasie, wyjdzie <strong>krzywa sinusoidalna</strong>. To najprostsza cegiełka każdego brzmienia — ma dokładnie <strong>jedną częstotliwość</strong> i nic poza tym. Prawdziwe instrumenty rysują falę znacznie bardziej „pofalowaną”, bo mieszają mnóstwo dodatkowych drgań naraz.
      </p>

      <div class="wave-compare-visual">
        <div class="wave-compare-card">
          <strong>Czysta sinusoida (1 częstotliwość)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 29.0 L9.5 25.0 L12.9 21.3 L16.4 17.8 L19.9 14.9 L23.3 12.5 L26.8 10.9 L30.3 10.1 L33.7 10.1 L37.2 10.9 L40.7 12.5 L44.1 14.9 L47.6 17.8 L51.1 21.3 L54.5 25.0 L58.0 29.0 L61.5 33.0 L64.9 36.7 L68.4 40.2 L71.9 43.1 L75.3 45.5 L78.8 47.1 L82.3 47.9 L85.7 47.9 L89.2 47.1 L92.7 45.5 L96.1 43.1 L99.6 40.2 L103.1 36.7 L106.5 33.0 L110.0 29.0 L113.5 25.0 L116.9 21.3 L120.4 17.8 L123.9 14.9 L127.3 12.5 L130.8 10.9 L134.3 10.1 L137.7 10.1 L141.2 10.9 L144.7 12.5 L148.1 14.9 L151.6 17.8 L155.1 21.3 L158.5 25.0 L162.0 29.0 L165.5 33.0 L168.9 36.7 L172.4 40.2 L175.9 43.1 L179.3 45.5 L182.8 47.1 L186.3 47.9 L189.7 47.9 L193.2 47.1 L196.7 45.5 L200.1 43.1 L203.6 40.2 L207.1 36.7 L210.5 33.0 L214.0 29.0" fill="none" stroke="var(--sage-strong)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Gładka litera S bez ostrych zagięć — brzmi czysto i neutralnie, jak kamerton albo ciche gwizdanie.</span>
        </div>
        <div class="wave-compare-card">
          <strong>Prawdziwy dźwięk (Podstawa + Alikwoty)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 26.9 L9.5 17.6 L12.9 11.3 L16.4 9.3 L19.9 11.2 L23.3 15.4 L26.8 19.5 L30.3 22.3 L33.7 23.3 L37.2 23.3 L40.7 23.4 L44.1 23.9 L47.6 24.9 L51.1 25.9 L54.5 26.5 L58.0 26.9 L61.5 27.7 L64.9 29.3 L68.4 31.8 L71.9 34.5 L75.3 36.8 L78.8 38.1 L82.3 38.8 L85.7 39.9 L89.2 41.9 L92.7 44.7 L96.1 47.2 L99.6 47.4 L103.1 43.9 L106.5 36.5 L110.0 26.9 L113.5 17.6 L116.9 11.3 L120.4 9.3 L123.9 11.2 L127.3 15.4 L130.8 19.5 L134.3 22.3 L137.7 23.3 L141.2 23.3 L144.7 23.4 L148.1 23.9 L151.6 24.9 L155.1 25.9 L158.5 26.5 L162.0 26.9 L165.5 27.7 L168.9 29.3 L172.4 31.8 L175.9 34.5 L179.3 36.8 L182.8 38.1 L186.3 38.8 L189.7 39.9 L193.2 41.9 L196.7 44.7 L200.1 47.2 L203.6 47.4 L207.1 43.9 L210.5 36.5 L214.0 26.9" fill="none" stroke="var(--peach-strong)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Wiele sinusoid nakłada się na siebie. Te garby i ząbki nadają instrumentom własny głos.</span>
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Herce (Hz) = Tempo drgań</strong>
          <span><code>65 Hz</code> (niskie <code>C</code>) drga 65 razy na sekundę — to fala o długości <strong>5,24 metra</strong> w pokoju! <code>440 Hz</code> (<code>a¹</code>) ma już tylko <strong>78 cm</strong>.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Oktawa = Podwójne tempo</strong>
          <span>Ucho ocenia proporcje: skok <code>220 → 440 Hz</code> (+220 Hz) i <code>440 → 880 Hz</code> (+440 Hz) brzmi tak samo — oba to 2:1!</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Amplituda = Głośność</strong>
          <span>Siła wychylenia fali (decybele, dB) zmienia głośność, ale nigdy nie zmienia wysokości dźwięku.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Kształt fali = Barwa</strong>
          <span>Gładka fala = miękki dźwięk jak flet. Ostra i kanciasta = zadziorna jak trąbka czy przesterowana gitara.</span>
        </div>
      </div>

      <div class="k-meta-box">
        <strong>Posłuchaj na żywo — skoki oktaw i kształty fal na c¹ (261,6 Hz):</strong>
        <div class="k-btn-row" style="margin-top:0.35rem;">
          <button class="btn-tool" data-play-freqs="220,440,880" data-seq-step="650" data-osc="triangle" data-dur="0.75">▶ 220 → 440 → 880 Hz</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sine" data-dur="1.4">▶ Czysta sinusoida</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="triangle" data-dur="1.4">▶ Trójkąt (miększy)</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sawtooth" data-dur="1.4">▶ Piła (zadziorna)</button>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. Widmo częstotliwości</span>
        <span class="k-ratio-chip">20 Hz – 20 kHz</span>
      </div>
      <h4>Odcisk palca dźwięku: co kryje się w jednej nucie?</h4>
      <p>
        Jeśli fortepian i gitara zagrają dokładnie to samo <code>c¹</code>, od razu je odróżnisz — mimo że główna wysokość dźwięku jest identyczna! Sekret tkwi w <strong>widmie częstotliwości</strong>: każdy naturalny dźwięk to cała drużyna sinusoid grających naraz.
      </p>
      <p>
        Widmo (jak słupki w odtwarzaczu czy korektorze EQ) działa jak zdjęcie rentgenowskie brzmienia: z lewej stoi ton główny (<code>1×</code>), a dalej w prawo jego szybsze alikwoty (<code>2×</code> do <code>10×</code>). Wybierz brzmienie i sprawdź różnicę:
      </p>

      <div class="freq-spec-box">
        <div class="k-btn-row">
          <button class="k-filter-pill active" data-spec-preset="sine" data-play-freqs="261.63" data-osc="sine" data-dur="1.4" data-spec-desc="<strong>Czysty ton sinusoidalny:</strong> Tylko jeden słupek na 1× — zero alikwotów. Brzmi gładko i sterylnie, bo nie barwią go wyższe częstotliwości.">▶ Sinusoida (c¹)</button>
          <button class="k-filter-pill" data-spec-preset="piano" data-play-inst data-style="piano" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Fortepian (Sample):</strong> Mocny ton bazowy i pełne dolne alikwoty, które łagodnie cichną w górę — stąd ciepłe, okrągłe brzmienie.">▶ Fortepian Sample (c¹)</button>
          <button class="k-filter-pill" data-spec-preset="guitar" data-play-inst data-style="guitar" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Gitara (Sample):</strong> Szarpnięta struna wrzuca znacznie więcej energii w środkowe i górne słupki — to daje wyraźny atak i blask.">▶ Gitara Sample (c¹)</button>
          <button class="k-filter-pill" data-spec-preset="strings" data-play-inst data-style="strings" data-notes="C4" data-dur="1.6" data-spec-desc="<strong>Smyczki (Sample):</strong> Smyczek stale podtrzymuje nawet wysokie alikwoty (6×–10×). Dlatego smyczki lśnią jedwabiście i przebijają się w miksie.">▶ Smyczki Sample (c¹)</button>
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
          <strong>Czysty ton sinusoidalny:</strong> Tylko jeden słupek na 1× — zero alikwotów. Brzmi gładko i sterylnie, bo nie barwią go wyższe częstotliwości.
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Sub i Bas (20 – 250 Hz)</strong>
          <span>Stopa perkusyjna, bas, fundament. Długie fale, które często czujesz w klatce piersiowej szybciej niż analizujesz słuchem.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Środek i Ciało (250 Hz – 2 kHz)</strong>
          <span>Wokal, korpus fortepianu i akordy gitary. Za dużo w tym paśmie brzmi szybko „pudełkowato”.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Prezencja i Atak (2 – 6 kHz)</strong>
          <span>Spółgłoski („S”, „T”), klik kostki i wyrazistość. W tym zakresie ludzkie ucho jest wyjątkowo wyczulone.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Powietrze i Blask (6 – 20 kHz)</strong>
          <span>Szelest talerzy, oddech i drobny pył najwyższych alikwotów aż po granicę ludzkiego słuchu.</span>
        </div>
      </div>
    </article>

    <div class="wave-lab-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">3. Interaktywne laboratorium fal</span>
        <button id="toggleWavePauseBtn" class="k-ratio-btn">⏸ Wstrzymaj falę</button>
      </div>
      <h4>Zobacz, jak łączą się dwie fale na żywo</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-mid); line-height:1.4;">
        Przerywane linie wyznaczają <strong>1 pełny cykl dźwięku bazowego (zielony)</strong>. Pod spodem drga <strong>2. ton (pomarańczowy)</strong>, a najniżej 3. ścieżka pokazuje prawdziwą <strong>falę mieszaną</strong>, która trafia prosto do Twojego bębenka.
      </p>
      <div class="wave-canvas-wrap">
        <canvas id="waveCanvas" class="wave-canvas" width="540" height="195"></canvas>
        <div id="waveExplainBanner" class="wave-explain-banner">
          ${waveBanner}
        </div>
      </div>
      <div class="k-btn-row">
        <button class="k-filter-pill active" data-wave-ratio="2,1" data-wave-semi="12">Oktawa (2:1)</button>
        <button class="k-filter-pill" data-wave-ratio="3,2" data-wave-semi="7">Kwinta (3:2)</button>
        <button class="k-filter-pill" data-wave-ratio="4,3" data-wave-semi="5">Kwarta (4:3)</button>
        <button class="k-filter-pill" data-wave-ratio="5,4" data-wave-semi="4">Tercja w. (5:4)</button>
        <button class="k-filter-pill" data-wave-ratio="6,5" data-wave-semi="3">Tercja m. (6:5)</button>
        <button class="k-filter-pill" data-wave-ratio="5,3" data-wave-semi="9">Seksta w. (5:3)</button>
        <button class="k-filter-pill" data-wave-ratio="45,32" data-wave-semi="6">Tryton (45:32)</button>
        <button class="k-filter-pill" data-wave-ratio="16,15" data-wave-semi="1">Sekunda m. (16:15)</button>
      </div>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">4. Wbudowana skala natury</span>
        <span class="k-ratio-chip">1× do 12× Podstawa</span>
      </div>
      <h4>Fale stojące i naturalny szereg alikwotowy (1–12)</h4>
      <p>
        Złap strunę za oba końce i ją szarpnij: ponieważ końce nie mogą się ruszać, struna drga jako całość ORAZ jednocześnie dzieli się na połówki (2× szybciej), trzecie części (3×), ćwiartki (4×)… W jednej pojedynczej nucie kryje się cała drabina ukrytych dźwięków!
      </p>
      <p>
        Klikaj kafelki! Fioletowe tony <strong>7</strong> i <strong>11</strong> („alpejskie F”) wypadają dokładnie <em>między</em> klawiszami fortepianu — to czysta natura bez korekt stroju.
      </p>
      <div class="overtone-grid">
        ${PHYSICS_OVERTONES_PL.map(o => `
          <button class="overtone-btn ${o.special ? "is-blue" : ""}" data-play-freqs="${o.freq}" data-osc="triangle" data-dur="1.15">
            <span class="overtone-num">Ton #${o.num}</span>
            <span class="overtone-note">${o.note}</span>
            <span class="overtone-ratio">${o.ratio}</span>
          </button>
        `).join("")}
      </div>
      <div class="k-meta-box">
        <strong>Dlaczego dur brzmi tak naturalnie:</strong> Alikwoty <strong>4 : 5 : 6</strong> same z siebie tworzą pogodny akord durowy u podstawy. Czyste moll chowa się znacznie wyżej na <strong>10 : 12 : 15</strong>!
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="65.41,130.82,196.23,261.64,327.05,392.46,457.87,523.28,588.69,654.1,719.51,784.92" data-seq-step="380" data-osc="triangle" data-dur="0.65">▶ Cały szereg (1–12)</button>
        <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Rdzeń dur (4:5:6)</button>
        <button class="btn-tool" data-play-freqs="261.63,313.96,392.45" data-osc="triangle" data-dur="2.0">▶ Rdzeń moll (10:12:15)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">5. Dudnienia akustyczne</span>
        <span class="k-ratio-chip">Różnica Hz = Puls/s</span>
      </div>
      <h4>Gdy fale „pompują”: strojenie ze słuchu</h4>
      <p>
        Zagraj dwie struny niemal tak samo wysoko, a ich grzbiety na chwilę się dodadzą (dwa razy głośniej) i zaraz zniosą (krótki spadek). To słyszalne falowanie („łau-łau-łau”) to <strong>dudnienie</strong>. Liczba pulsów na sekundę równa się dokładnej <strong>różnicy w Hz</strong> — gdy struny są dobrze nastrojone, falowanie całkiem cichnie!
      </p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="440,440" data-osc="sine" data-dur="2.4">▶ 0 Hz (440+440 · idealnie równo)</button>
        <button class="btn-tool" data-play-freqs="440,442" data-osc="sine" data-dur="2.6">▶ 2 Hz (440+442 · 2 pulsy/s)</button>
        <button class="btn-tool" data-play-freqs="440,446" data-osc="sine" data-dur="2.4">▶ 6 Hz (440+446 · szybkie drżenie)</button>
        <button class="btn-tool" data-play-freqs="440,466" data-osc="sine" data-dur="2.2">▶ 26 Hz (440+466 · szorstkie tarcie)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">6. Strój a kompromis fortepianu</span>
        <span class="k-ratio-chip">Luka +23,5 centa</span>
      </div>
      <h4>Dlaczego żaden fortepian na świecie nie jest „absolutnie czysty”</h4>
      <p>
        Dziwny kaprys matematyki: ułóż 12 idealnych kwint (3:2) jedna na drugiej, a wylądujesz ciut za wysoko — o około <strong>23,5 centa</strong> powyżej 7 dokładnych oktaw! Gdyby stroiciel ustawił fortepian zupełnie czysto dla C-dur, odległe tonacje jak Fis-dur brzmiałyby okropnie fałszywie.
      </p>
      <p>
        Sprytny kompromis współczesnej muzyki to <strong>strój równomiernie temperowany</strong>: oktawę dzieli się na 12 idealnie równych kroczków. Teraz każdy utwór działa w dowolnej tonacji — ale w zamian tercja wielka (C–E) na fortepianie brzmi o <strong>14 centów wyżej</strong> niż czysta natura. Porównaj czyste proporcje i prawdziwe sample fortepianu:
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Strój czysty (5:4)</h5>
          <p>Zero dudnień — gładkie zlanie, ale nie działa we wszystkich tonacjach:</p>
          <button class="btn-tool" data-play-freqs="261.63,327.04" data-osc="triangle" data-dur="2.3">▶ Czysta tercja (5:4 · gładko)</button>
          <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.3">▶ Czysty trójdźwięk C</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Fortepian / Temperowany (+14 c.)</h5>
          <p>Prawdziwe studyjne sample fortepianu: lekkie migotanie — grasz w każdych 12 tonacjach:</p>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4" data-dur="2.3">▶ Tercja fortepianu (Sample C4 + E4)</button>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4,G4" data-dur="2.3">▶ C-dur fortepianu (Sample)</button>
        </div>
      </div>
    </article>
  `;
}

const CATEGORY_HELP_GUIDES_PL = {
  cadence: {
    tagClass: "tag-sage",
    tag: "Instrukcja • Kadencje",
    title: "Jak działają ćwiczenia z kadencji",
    lead: "Zamiast zgadywać pojedyncze akordy w próżni, słyszysz pełny czterotaktowy przebieg ustanawiający tonację — w <strong>dur</strong> i w <strong>moll</strong> — i rozpoznajesz funkcję pod znakiem zapytania.",
    sections: `
      <h3>Cztery grupy ćwiczeń (Dur i Moll)</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Dur • Cel: Takt 4</h5>
          <p>Takty 1–3 są odkryte i osadzają tonację durową. Posłuchaj czterech taktów i wskaż brakującą funkcję w <strong>4. takcie</strong>.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Dur • Losowy takt (1–4)</h5>
          <p>Znak zapytania ląduje w dowolnym takcie 1–4. Nawet gdy zakryty jest 1. takt, widoczna Tonika (<strong>I</strong>) utrzymuje punkt odniesienia.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Moll • Cel: Takt 4</h5>
          <p>Takie same zadania w tonacjach molowych (np. <code>i–iv–V</code>): wysłuchaj trzech taktów kontekstu i wskaż akord dla <strong>4. taktu</strong>.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Moll • Losowy takt (1–4)</h5>
          <p>Szukany takt zmienia położenie w obrębie 1–4; co najmniej jedna widoczna Tonika molowa (<strong>i</strong>) zawsze orientuje słuch.</p>
        </div>
      </div>

      <h3>4 poziomy trudności (Dur i Moll)</h3>
      <ul class="article-steps-list">
        <li><strong>Poziom 1 — Podstawy (I–V / i–V):</strong> Cztery filary: w dur <code>I, IV, V, vi</code>, w moll <code>i, iv, V, VI</code>.</li>
        <li><strong>Poziom 2 — Diatonika (ii–vi / ii°–VII):</strong> Wszystkie główne stopnie skali (w dur także <code>ii</code> i <code>iii</code>; w moll <code>ii°, III, v, V, VII</code>).</li>
        <li><strong>Poziom 3 — Rozszerzony (V/V / N6):</strong> Dochodzą <code>V7</code>, dominanta wtrącona <code>V/V</code> oraz w moll akord neapolitański <code>N6</code>.</li>
        <li><strong>Poziom 4 — Jazz i tryton (bII7 / iiø7):</strong> Pełny zakres aż po substytut trytonowy <code>bII7</code> oraz molowe <code>ii–V</code> (<code>iiø7</code>).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Sterowanie, Tryb słuchania i Egzamin</h4>
        <p>U góry zmienisz <strong>Tonację</strong> i <strong>Tempo (BPM)</strong>. Poniżej przyciski <strong>Tonika (I)</strong> / <strong>Tonika (i)</strong> oraz <strong>Powtórz akord</strong> dają bezpośrednie oparcie; <strong>Pętla</strong> zapętla odsłuch, a <strong>Tylko słuchaj</strong> prowadzi serię z automatycznym odkryciem odpowiedzi. Po błędzie <strong>Porównanie A/B</strong> i <strong>Bas / Pryma</strong> porównują Twój typ z rozwiązaniem — a <strong>Egzamin kategorii</strong> sprawdza dur i moll pod presją egzaminu.</p>
      </div>
    `
  },
  interval: {
    tagClass: "tag-peach",
    tag: "Instrukcja • Interwały",
    title: "Jak działają ćwiczenia z interwałów",
    lead: "Trenuj rozpoznawanie czystych dwudźwięków — melodycznych w górę, w dół, harmonicznych oraz nad utrzymywaną plamą smyczków. W zadaniach melodycznych i z plamą dźwięk startowy losuje się w wygodnym rejestrze średnim. (Akordy i przewroty mają osobny dział <strong>Akordy</strong>!)",
    sections: `
      <h3>4 rodzaje ćwiczeń</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Interwały melodyczne (w górę)</h5>
          <p>Dwa dźwięki grają kolejno w górę: w 1. takcie brzmi losowy dźwięk wyjściowy (<code>F3–E4</code>), w 2. rozpoznajesz skok do góry.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Interwały melodyczne (w dół)</h5>
          <p>Dwa dźwięki opadają kolejno w dół: start z losowej górnej nuty (<code>Fis4–F5</code>) — klasyczny test uważnego ucha!</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Interwały harmoniczne</h5>
          <p>Oba dźwięki brzmią jednocześnie. Słuchaj czystości stopienia lub tarcia — po odpowiedzi widzisz oba dźwięki (np. <code>C4 + G4</code>).</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Interwały nad plamą dźwięku podstawowego (Smyczki ➔ Fortepian)</h5>
          <p>Ciepła <strong>płaszczyzna smyczkowa</strong> podtrzymuje prymę jako tło. Po krótkiej pauzie <strong>fortepian</strong> gra szukany dźwięk nad nią — idealne do wyczucia barwy i napięcia interwału względem podstawy.</p>
        </div>
      </div>

      <h3>Trudność interwałów (3 poziomy)</h3>
      <ul class="article-steps-list">
        <li><strong>Poziom 1 — Początkujący:</strong> Cztery podstawowe punkty zaczepienia (w górę lub w dół): pryma czysta (<code>P1</code>), tercja wielka (<code>G3/M3</code>), kwinta czysta (<code>P5</code>) i oktawa (<code>P8</code>).</li>
        <li><strong>Poziom 2 — Gama durowa:</strong> Wszystkie 8 interwałów diatonicznych od prymy do oktawy.</li>
        <li><strong>Poziom 3 — Chromatyka:</strong> Wszystkie 15 interwałów aż po nonę wielką (<code>G9/M9</code>), wraz z interwałami małymi i trytonem.</li>
      </ul>

      <h3>Jak czytać skróty interwałów</h3>
      <ul class="article-steps-list">
        <li><strong>Litera = rodzaj (barwa), cyfra = stopień (<code>1</code>–<code>9</code>):</strong> Cyfra liczy stopnie skali od dolnej nuty (<code>1</code> = pryma, <code>2</code> = sekunda, <code>3</code> = tercja … aż do <code>9</code> = nona), a litera określa dokładną rozpiętość w półtonach.</li>
        <li><strong><code>P</code> = Czysty (<em>Perfect</em>):</strong> Dotyczy prymy (<code>P1</code>), kwarty (<code>P4</code>), kwinty (<code>P5</code>) i oktawy (<code>P8</code>). Nie dzielą się na wielkie i małe — brzmią krystalicznie i otwarcie.</li>
        <li><strong><code>G</code> i <code>k</code> (Niemieckie) lub <code>M</code> i <code>m</code> (Międzynarodowe):</strong> Dotyczyć mogą sekund (<code>2</code>), tercji (<code>3</code>), sekst (<code>6</code>), septym (<code>7</code>) i non (<code>9</code>):<br>
          – <strong>Wielka litera <code>G</code></strong> (<em>Groß</em>, międz. <strong><code>M</code></strong> = <em>Major</em>) oznacza wariant <strong>wielki</strong> (szerszy, jaśniejszy, np. <code>G3</code> / <code>M3</code> = tercja wielka, 4 półtony).<br>
          – <strong>Mała litera <code>k</code></strong> (<em>klein</em>, międz. <strong><code>m</code></strong> = <em>minor</em>) jest o <strong>1 półton węższa</strong>, cieplejsza lub ostrzejsza (np. <code>k3</code> / <code>m3</code> = tercja mała, 3 półtony). Zwracaj uwagę na wielkość liter <code>m</code> vs. <code>M</code>!</li>
        <li><strong><code>TT</code> = Tryton:</strong> Elektryczny środek oktawy o rozpiętości 6 półtonów między <code>P4</code> i <code>P5</code>.</li>
      </ul>
      <p><em>Zmiana symboli:</em> Możesz w dowolnej chwili przełączać między <strong>Niemieckimi (P / G / k)</strong> a <strong>Międzynarodowymi (P / M / m)</strong> w menu <strong>Ustawienia → Język i notacja → Zapis muzyczny → Symbole interwałów</strong>.</p>

      <div class="article-highlight-box">
        <h4>Śpiewanie, Porównanie A/B i Egzamin</h4>
        <p>Przycisk <strong>Śpiewaj</strong> u góry (z opcjonalną pauzą na nucenie) pomaga poczuć odległość głosem. Poniżej <strong>Dźwięk wyjściowy</strong> odtwarza nutę startową; po pomyłce <strong>Porównanie A/B</strong> gra Twój wybór od tej samej nuty i w tym samym kierunku tuż przed poprawną odpowiedzią. Przycisk <strong>Pętla</strong> zapętla odsłuch (<strong>Autonastępne</strong> znajdziesz w Ustawieniach), <strong>Tylko słuchaj</strong> prowadzi pasywny odsłuch, a 3-poziomowy <strong>Egzamin</strong> łączy wszystkie 4 typy interwałów.</p>
      </div>
    `
  },
  chords: {
    tagClass: "tag-sage",
    tag: "Instrukcja • Akordy",
    title: "Jak działają ćwiczenia z akordów",
    lead: "Naucz się błyskawicznie rozpoznawać budowę akordów zarówno rozłożonych (arpeggia w górę i w dół), jak i granych jednocześnie — a także wyławiać ze słuchu, który dźwięk leży najniżej w basie.",
    sections: `
      <h3>4 rodzaje ćwiczeń</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Arpeggia akordów (w górę ↗)</h5>
          <p>Dźwięki akordu grają po kolei od dołu w górę, aby wyraźnie usłyszeć każdą tercję, kwintę i septymę — po trafieniu akord wybrzmiewa jako całość.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Arpeggia akordów (w dół ↘)</h5>
          <p>Akord rozwija się od najwyższej nuty w dół. Świetnie przełamuje nawyk słuchania tylko od podstawy — po rozwiązaniu słyszysz pełne współbrzmienie.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Akordy (jednoczesne)</h5>
          <p>Od 3 do 5 dźwięków rozbrzmiewa jednym barwnym akordem. Poczuj całościowy nastrój — po odkryciu karta rozpisuje i gra arpeggio w górę (np. <code>C4 · E4 · G4 · H4</code>).</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Przewroty akordów</h5>
          <p>Wskaż składnik w basie: <code>Bas: 1</code> (postać zasadnicza), <code>Bas: 3</code> (1. przewrót), <code>Bas: 5</code> (2. przewrót) lub <code>Bas: 7</code> (3. przewrót). Nuta basowa pozostaje w środku rejestru, by ćwiczyć układ interwałów, nie wysokość absolutną.</p>
        </div>
      </div>

      <h3>Trudność typów akordów (4 poziomy)</h3>
      <ul class="article-steps-list">
        <li><strong>Poziom 1 — Podstawowe trójdźwięki:</strong> Cztery fundamenty: durowy (<code>maj</code>), molowy (<code>m</code>), zmniejszony (<code>dim</code>) i zwiększony (<code>aug</code>).</li>
        <li><strong>Poziom 2 — Septymowe i Sus:</strong> Dochodzą zawieszony <code>sus4</code>, dominanta septymowa (<code>7</code>), wielki durowy (<code>maj7</code>) i mały molowy (<code>m7</code>).</li>
        <li><strong>Poziom 3 — Rozszerzone czterodźwięki:</strong> Dochodzą <code>sus2</code>, półzmniejszony (<code>m7♭5</code>), zmniejszony (<code>°7</code>) oraz molowo-wielki (<code>m(maj7)</code>).</li>
        <li><strong>Poziom 4 — Jazz i napięcia:</strong> Wszystkie 15 barw akordowych wraz z bogatymi <code>maj9</code>, <code>7♭9</code> i <code>7♯9</code>.</li>
      </ul>

      <h3>Trudność przewrotów (3 poziomy)</h3>
      <ul class="article-steps-list">
        <li><strong>Poziom 1 — Trójdźwięki durowe (3):</strong> Postać zasadnicza (<code>Bas: 1</code>), 1. przewrót (<code>Bas: 3</code>) i 2. przewrót (<code>Bas: 5</code>).</li>
        <li><strong>Poziom 2 — Dur i Moll (3):</strong> Wszystkie trzy układy w trybie mieszanym dla jasnych akordów dur i ciepłych moll.</li>
        <li><strong>Poziom 3 — Czterodźwięki (4):</strong> Akordy septymowe (<code>7</code>, <code>maj7</code>, <code>m7</code>) dodające 3. przewrót z septymą w basie (<code>Bas: 7</code>).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Wskazówki praktyczne</h4>
        <p>Przycisk <strong>Dźwięk podstawowy</strong> zawsze podaje prymę akordu; po błędzie <strong>Porównanie A/B</strong> gra Twój wybór na tej samej podstawie tuż przed odpowiedzią, a w przewrotach <strong>Posłuchaj basu</strong> dodatkowo izoluje najniższy głos. Dostępne są też <strong>Pętla</strong>, <strong>Tylko słuchaj</strong> oraz 4-poziomowy <strong>Egzamin kategorii</strong>.</p>
      </div>
    `
  },
  melody: {
    tagClass: "tag-lilac",
    tag: "Instrukcja • Melodie",
    title: "Jak działa trening melodyczny",
    lead: "Połącz słyszenie stopni w tonacji z pulsem rytmicznym wprost na 5-liniowej pięciolinii: kadencja wprowadzająca przechodzi w 1-taktowe odliczanie i frazę 4–6 nut.",
    sections: `
      <h3>Przebieg rundy krok po kroku</h3>
      <ul class="article-steps-list">
        <li><strong>1. Kadencja, odliczanie i prawdziwa pięciolinia:</strong> Progresja <code>I – vi – IV – V</code> osadza tonację, po czym następuje 1 takt odliczania w <code>4/4</code> lub <code>3/4</code> i melodia 4–6 nut (ósemki, ćwierćnuty, ćwierćnuty z kropką, półnuty i pauzy) zapisana na pięciolinii.</li>
        <li><strong>2. Trzy style melodii:</strong> Na stronie kategorii wybierz <strong>Melodia rytmiczna</strong> (wartości nut są już widoczne na pięciolinii, skupiasz się na wysokości), <strong>Dyktando kombi</strong> (określasz wysokość na klawiaturze <em>i</em> długość <code>1/8</code>, <code>1/4</code>, <code>1/4.</code>, <code>1/2</code> poniżej w dowolnej kolejności) albo <strong>Równomiernie (Baza)</strong> (4 równe półnuty na lekki start).</li>
        <li><strong>3. Odkrywanie krok po kroku:</strong> Po odgadnięciu nuty jej nazwa (<code>Do–Ti</code> lub cyfra stopnia <code>1–7</code>) pojawia się pod pięciolinią, a uwaga przechodzi dalej.</li>
        <li><strong>4. Odsłuch i dotykanie nut na pięciolinii:</strong> Klikaj <strong>▶ Odtwórz</strong>, aby powtórzyć całą frazę bez utraty postępu. <strong>Powtórz dźwięk</strong> (lub dotknięcie odgadniętej albo aktywnej nuty bezpośrednio na pięciolinii) odtwarza ten jeden dźwięk z krótkim pulsem odniesienia.</li>
      </ul>

      <h3>Poziomy, tonacje i sterowanie</h3>
      <ul class="article-steps-list">
        <li><strong>Poziom 1 — Do–Fa:</strong> Frazy 4–5-nutowe w dolnym tetrachordzie (<code>Do, Re, Mi, Fa</code>).</li>
        <li><strong>Poziom 2 — Sol–Do:</strong> Frazy 4–6-nutowe w górnym rejestrze (<code>Sol, La, Ti, Do</code>).</li>
        <li><strong>Poziom 3 — Cała gama:</strong> Wszystkie siedem stopni (od <code>Do</code> do <code>Do</code>) w frazach 4–6-nutowych.</li>
        <li><strong>Tonacje, oktawy i pomoce:</strong> Ćwicz w stałym <code>C-dur</code> lub losowych tonacjach, w jednej lub wielu oktawach. U góry ustawisz <strong>Tonację</strong>, <strong>Puls: Wł./Wył.</strong> i <strong>Tempo (BPM)</strong>; u dołu czekają <strong>Tonika (Do)</strong>, przycisk <strong>Autonastępne</strong> (po lewej), <strong>Tylko słuchaj</strong> oraz 5-poziomowy <strong>Egzamin kategorii</strong>.</li>
      </ul>
    `
  },
  solfege: {
    tagClass: "tag-sage",
    tag: "Instrukcja • Solfeż",
    title: "Jak działa solfeż funkcyjny",
    lead: "Solfeż relatywny (ruchome Do) wyrabia prawdziwy słuch względny: uczysz się rozpoznawać każdy z 7 stopni gamy (Do–Ti lub 1–7) po jego niepowtarzalnym ciążeniu wewnątrz tonacji.",
    sections: `
      <h3>Każda runda ma 4 przejrzyste kroki</h3>
      <ul class="article-steps-list">
        <li><strong>1. Kadencja kontekstowa:</strong> Krótki przebieg (<code>I – vi – IV – V</code>) stabilnie zakotwicza tonację.</li>
        <li><strong>2. Szukany dźwięk:</strong> Po chwili ciszy wybrzmiewa jedna izolowana nuta tej tonacji.</li>
        <li><strong>3. Wybór na klawiaturze:</strong> Tylko aktywne klawisze gamy noszą oznaczenia (<em>Do–Re–Mi–Fa–Sol–La–Ti–Do</em> lub opcjonalne <em>cyfry stopni 1–7</em>) w czytelnej ramce; dźwięki spoza skali są wygaszone.</li>
        <li><strong>4. Ciche błędy i naturalne rozwiązanie:</strong> Błędny klawisz podświetla się na czerwono bez dźwięku, by nie zaburzać pamięci tonacji. Trafienie świeci na zielono i gra naturalne rozwiązanie do toniki (<code>Do–Fa</code> w dół, <code>Sol–Ti</code> w górę).</li>
      </ul>

      <h3>Wszystkie 6 poziomów trudności</h3>
      <ul class="article-steps-list">
        <li><strong>Poziomy 1 i 2 (1 oktawa):</strong> Poziom 1 trzyma <code>C-dur</code>; poziom 2 losuje jedną tonację na całą sesję.</li>
        <li><strong>Poziomy 3 i 4 (wiele oktaw):</strong> Szukane dźwięki przeskakują o oktawę wyżej lub niżej — w stałym <code>C-dur</code> (poziom 3) albo w jednej losowej tonacji (poziom 4).</li>
        <li><strong>Poziomy 5 i 6 (modulacje):</strong> Po każdej trafnej odpowiedzi ucho przechodzi do nowej tonacji — najpierw w 1 oktawie (poziom 5), potem w wielu oktawach (poziom 6).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Pomoce, Śpiewanie i Etykiety</h4>
        <p>U góry <strong>Śpiewaj</strong> (opcjonalnie z <em>Pauzą na nucenie</em>) zachęca do zaśpiewania powrotu do Do / 1, tuż obok regulacji <strong>Tempo (BPM)</strong>. Nad klawiaturą znajdziesz <strong>plakietkę tonacji</strong> (gra akord toniki), <strong>Tonika (Do)</strong> oraz <strong>Powtórz dźwięk</strong>. Fioletowa <strong>Pętla</strong> powtarza szukaną nutę co 3 sekundy, a <strong>Tylko słuchaj</strong> rozwiązuje automatycznie. Przełączaj <strong>Sylaby (Do–Ti)</strong> vs. <strong>Cyfry (1–7)</strong> i <strong>Autonastępne</strong> w <strong>Ustawieniach</strong>.</p>
      </div>
    `
  },
  rhythm: {
    tagClass: "tag-sage",
    tag: "Instrukcja • Rytm",
    title: "Jak działają ćwiczenia rytmiczne",
    lead: "Cztery wszechstronne działy rozwijają wyczucie metrum, dyktando rytmiczne, stukanie ze słuchu i czytanie rytmów z nut oraz pocket groovu — przejrzyście zapisane na jednoliniowej pięciolinii i sterowane tempem (BPM).",
    sections: `
      <h3>4 moduły rytmiczne</h3>
      <ul class="article-steps-list">
        <li><strong>1. Metrum i takt (3 poziomy):</strong> Posłuchaj dwóch taktów perkusji (akcent na <code>1</code>) i rozróżniaj <code>4/4</code> &amp; <code>3/4</code> (Poziom 1), <code>2/4</code> &amp; <code>6/8</code> (Poziom 2) oraz metra nieparzyste <code>5/4</code> &amp; <code>7/8</code> (Poziom 3). <strong>Puls ćwierćnutowy</strong> daje czysty punkt odniesienia.</li>
        <li><strong>2. Dyktando rytmiczne (4 miary, 4 poziomy):</strong> Na jednoliniowej pięciolinii po 1 takcie odliczania clave wybija wzór na 4 miary. Uzupełniaj kolejno pola (od ćwierćnut, ósemek i pauz przez offbeaty i triole po szesnastki i synkopy) używając <strong>Metronom (1–4)</strong>, <strong>Powtórz miarę</strong> (lub klikając karty) i <strong>Autonastępne</strong>.</li>
        <li><strong>3. Pad rytmiczny: Stukanie ze słuchu i z nut (po 4 poziomy):</strong> W trybie <strong>Stukanie rytmu</strong> słuchasz odliczania i wzoru, po czym grasz na dużym <strong>Padzie rytmicznym</strong> (lub <code>Spacją</code>) — z przełącznikiem <strong>Klik: Wł./Wył.</strong>, podglądem <strong>Tylko słuchaj</strong> i Poziomem 4 <em>Tryb ślepy</em>. W trybie <strong>Wystukaj rytmy z nut</strong> brak pokazu audio: czytasz zapis bezpośrednio z pięciolinii i stukasz z metronomem po takcie odliczania (Poziom 4: <em>bez metronomu</em>). Na koniec <strong>oś czasu</strong> pokazuje trafienia <code>dokładnie</code>, <code>blisko (±ms)</code>, <code>pominięto</code> i <code>za dużo</code>.</li>
        <li><strong>4. Groove, offbeaty i mikrotiming (4 poziomy):</strong> Poziom 1 to <em>Style groovu</em> (marsz, backbeat, synkopa, swing, 3 na 2), Poziom 2 szuka akcentu cowbella na słabych częściach (<code>1</code>–<code>4+</code>), Poziom 3 ćwiczy <em>Mikrotiming (±55 ms)</em>, a Poziom 4 <em>Pro (±28 ms)</em> (przed klikiem, w punkt lub za klikiem).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Wskazówka treningowa i Egzamin</h4>
        <p>Rozpocznij <strong>Stukanie rytmu</strong> z włączonym <strong>klikiem</strong> przy 80–95 BPM i w razie potrzeby włącz <strong>Autonastępne</strong> w lewym dolnym rogu. Gdy puls okrzepnie, zmierz się z <strong>Trybem ślepym</strong>, czytaniem <strong>z nut bez metronomu</strong>, trybem <strong>Tylko słuchaj</strong> lub 4-poziomowym <strong>Egzaminem kategorii</strong>.</p>
      </div>
    `
  },
  production: {
    tagClass: "tag-lilac",
    tag: "Instrukcja • Produkcja i miks",
    title: "Jak działają ćwiczenia z częstotliwości i EQ",
    lead: "Wykalibruj słuch realizatora dźwięku na pasmach studyjnych — od izolowanych fal sinusowych na 5 do 12 pasmach aż po aktywne podbicia parametryczne EQ w szumie różowym.",
    sections: `
      <h3>2 moduły produkcyjne</h3>
      <ul class="article-steps-list">
        <li><strong>1. Rozpoznawanie częstotliwości (Sinus, 3 poziomy):</strong> Słyszysz wyrównany ton sinusowy od subbasu (<code>63 Hz</code>) po pasmo powietrza (<code>12 kHz</code>) w układzie <strong>5 pasm</strong>, <strong>8 pasm oktawowych</strong> lub <strong>12 pasm</strong>. Przycisk <strong>„Ref: 1 kHz”</strong> przypomina ton odniesienia w każdej chwili.</li>
        <li><strong>2. Podbicie EQ w szumie różowym (3 poziomy):</strong> W <strong>swobodnym treningu</strong> szum różowy startuje od razu w trybie ciągłym <strong>z aktywnym podbiciem EQ</strong> (Poziom 1: Szeroki EQ <code>+10 dB / Q 1,6</code>, Poziom 2: Oktawowy <code>+8,5 dB / Q 2,6</code>, Poziom 3: Chirurgiczny <code>+7 dB / Q 4,2</code>). Płynnie przełączaj na czysty szum poprzez górną kartę <strong>Flat</strong> lub przycisk <strong>„Bypass Flat”</strong> (<code>Flat: WŁ.</code>). W trybie <strong>Tylko słuchaj</strong> najpierw gra krótko neutralny szum <em>Flat</em>, potem dłużej <em>podbicie EQ</em> i po pauzie pojawia się odpowiedź.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Ochrona słuchu, porównanie i Egzamin</h4>
        <p>Szum różowy opada o 3 dB na oktawę, równoważąc energię w całym paśmie. Limiter -14 dBFS, krzywa równej głośności w rejonie 2–4 kHz i miękkie wygładzanie chronią słuch. Po błędzie pomogą <strong>Porównanie A/B</strong> oraz <strong>Flat → Docelowe EQ</strong>, a wszystkie 3 poziomy czekają też w <strong>Egzaminie kategorii</strong>.</p>
      </div>
    `
  },
  modes: {
    tagClass: "tag-peach",
    tag: "Instrukcja • Skale i tryby",
    title: "Jak działa trening skal i trybów",
    lead: "Zapomnij o mechanicznym wkuwaniu schematów: usłysz każdą skalę modalną po jej żywej barwie — od jednego wspólnego dźwięku bazowego lub w transpozycjach, z opcją stałej smyczkowej plamy podstawy.",
    sections: `
      <h3>3 moduły trybów</h3>
      <ul class="article-steps-list">
        <li><strong>1. Rozpoznaj skalę / tryb (3 poziomy):</strong> Najpierw brzmi neutralna <strong>Kwinta oparcia</strong> (bez tercji), a po niej 8-nutowa skala w górę: Poziom 1 to 4 podstawowe barwy (<code>Joński, Eolski, Dorycki, Miksolidyjski</code>), Poziom 2 obejmuje wszystkie 7 w <code>C</code>, a Poziom 3 zmienia dźwięki bazowe.</li>
        <li><strong>2. Dźwięk charakterystyczny i barwa (3 poziomy):</strong> Po kwincie oparcia krótki motyw akcentuje stopień tworzący charakter trybu (<code>#4</code> lidyjski, <code>b7</code> miksolidyjski, <code>♮6</code> dorycki, <code>b2</code> frygijski lub dźwięk prowadzący <code>#7</code> w <strong>Mol harmoniczny</strong>) — w podziale na tryby durowe (Poziom 1), molowe (Poziom 2) oraz Wszystkie + Mol harmoniczny od różnych podstaw (Poziom 3).</li>
        <li><strong>3. Kadencje modalne i progresje (2 poziomy):</strong> Dwukordowe wahadła (<code>i – IV</code> dorycka, <code>I – bVII</code> miksolidyjska, <code>I – II</code> lidyjska, <code>i – bII</code> frygijska): najpierw 4 standardy w <code>C</code> (Poziom 1), potem wszystkie 6 transponowanych progresji (Poziom 2).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Plama podstawy, Kwinta oparcia i porównanie A/B</h4>
        <p>Porównuj tryby równolegle od <strong>tej samej podstawy</strong> (np. <strong>C joński</strong> vs <strong>C miksolidyjski</strong>). Przycisk <strong>„Plama podstawy: wł./wył.”</strong> podkłada ciągły smyczkowy burdon pod każde zadanie; kliknięcie <strong>„Kwinty oparcia”</strong> (lub lewej karty) przywołuje neutralną ramę, a po błędzie <strong>Porównanie A/B</strong> zestawia oba tryby na tym samym dźwięku. Dostępne są też <strong>Pętla</strong>, <strong>Tylko słuchaj</strong> i 3-poziomowy <strong>Egzamin kategorii</strong>.</p>
      </div>
    `
  },
  warmup: {
    tagClass: "tag-sage",
    tag: "Instrukcja • Rozgrzewka głosowa",
    title: "Jak przebiega prowadzona rozgrzewka głosowa",
    lead: "Stworzona z myślą o próbach chóralnych, lekcjach śpiewu i ćwiczeniu w domu: wybierz jedną z 5 skal głosu (SATB) i uruchom jeden z 4 programów — ze sferą oddechu, żywą klawiaturą i kontrolą półtonów.",
    sections: `
      <h3>4 programy do wyboru i 4 etapy</h3>
      <ul class="article-steps-list">
        <li><strong>4 programy rozgrzewki:</strong> Dobierz do potrzeb <strong>Pełną 5-minutową rozgrzewkę</strong> (4 etapy, 9 ćwiczeń), <strong>Krótką rozgrzewkę (ok. 3 min)</strong>, <strong>Arpeggia i wyrównanie rejestrów</strong> lub <strong>Oddech chóralny i intonację</strong>.</li>
        <li><strong>Etap 1 — Oddech i ciało:</strong> Animowana sfera oddechu na <code>ffff / ssss</code> oraz lekkie impulsy artykulacyjne (<code>P – T – K</code>) budzą podparcie bez ścisku w gardle.</li>
        <li><strong>Etap 2 — Rezonans i osadzenie:</strong> Miękkie mormorando / wibracja warg (<code>Mmm / Brrrr</code>) i opadające westchnienia kwintowe (<code>5–4–3–2–1</code>) łagodnie łączą rejestry.</li>
        <li><strong>Etapy 3 i 4 — Arpeggia, samogłoski i chór:</strong> Arpeggia trójdźwiękowe i oktawowe modulują co półton w rejestrze (<strong>Chór, Sopran, Alt, Tenor lub Bas</strong>), po czym następują przejścia samogłosek (<code>U → O → A → E → I</code>) i akord SATB.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Sterowanie na żywo i klawiatura</h4>
        <p>U góry zmieniasz <strong>Rejestr (SATB)</strong>, <strong>Barwę akompaniamentu</strong> (Fortepian, Fortepian + głos lub Głos) i <strong>Tempo</strong>, a przez <strong>pigułki etapów</strong> przeskakujesz dowolnie między fazami. U dołu działają przyciski <strong>„−1 / +1 półton”</strong> i <strong>„Powtórz”</strong> oraz <strong>interaktywna klawiatura</strong> do grania dźwięków oparcia.</p>
      </div>
    `
  },
  notation: {
    tagClass: "tag-sage",
    tag: "Instrukcja • Czytanie nut",
    title: "Jak działa trening czytania nut",
    lead: "Ćwicz płynne czytanie nut a vista w 6 trybach: w kluczu wiolinowym, basowym i altowym, w Miksie kluczy, na Systemie fortepianowym (dwupięcioliniowym) oraz w trybie Czytania akordów (w tym przewroty i septymowe).",
    sections: `
      <h3>Wszystkie 6 trybów i sposób odpowiedzi</h3>
      <ul class="article-steps-list">
        <li><strong>1. Pojedyncze nuty (potok 6 nut):</strong> W kluczu <strong>wiolinowym</strong>, <strong>basowym</strong>, <strong>altowym</strong>, w <strong>Miksie kluczy</strong> (zmiana co 3 nuty z podpowiedzią klucza) oraz na <strong>Systemie fortepianowym</strong> (klucz wiolinowy + basowy z klamrą) kolorowe wyróżnienie po lewej wskazuje nutę do zagrania na klawiaturze.</li>
        <li><strong>2. Czytanie akordów (5 akordów, wybór wielokrotny):</strong> Trójdźwięki i czterodźwięki zapisane pionowo na pięciolinii. Zamiast klawiszy wybierasz pasujące <strong>kafelki symboli</strong> (np. <code>E, Em, E7, Esus4</code>) na <strong>4 poziomach</strong>: Poziom 1 (trójdźwięki w wiolinowym), Poziom 2 (trójdźwięki w basowym), Poziom 3 (przewroty w obu kluczach) oraz Poziom 4 (wszystkie typy i septymowe).</li>
        <li><strong>3. Pomyłki i „Pomiń”:</strong> Błędny klawisz lub kafelek świeci na czerwono bez przesuwania kolejki, by spokojnie sprawdzić klucz, znaki lub przewrót. Kliknij <strong>Pomiń</strong>, aby odsłonić rozwiązanie i przejść dalej.</li>
      </ul>

      <h3>Poziomy trudności i znaki przykluczowe</h3>
      <ul class="article-steps-list">
        <li><strong>Pojedyncze nuty Poziomy 1–4:</strong> Poziom 1 (5 linii i 4 pola), Poziom 2 (<code>±2 linie dodane</code>), Poziom 3 (<code>±3 linie dodane</code>) oraz Poziom 4 z przygodnymi znakami (<code>♯</code>/<code>♭</code>) lub <strong>kasownikami (<code>♮</code>)</strong> przy aktywnej tonacji — w notacji tradycyjnej PL/DE (<code>H / B / Fis</code>) lub międzynarodowej (<code>B / B♭ / F♯</code>).</li>
        <li><strong>Czytanie z przykluczowymi (1–6 ♯/♭):</strong> Wybierz tonację albo rotacyjny zestaw (Łatwe, Średnie, Wszystkie 12) na stronie Czytania nut lub przyciskiem <strong>Tonacja</strong> w trakcie gry.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Audio, Tylko słuchaj i Egzamin</h4>
        <p>Nad klawiaturą przełącznik <strong>Dźwięk nuty: Wł./Wył.</strong> pozwala czytać nuty zupełnie bezgłośnie. Na dole <strong>▶ Posłuchaj nuty</strong> / <strong>▶ Posłuchaj akordu</strong> służy za opcjonalną podpowiedź w treningu — natomiast w 6-poziomowym <strong>Egzaminie kategorii</strong> zmienia się w <strong>▶ Dźwięk oparcia</strong> (<code>g¹</code> / <code>f</code> / <code>c¹</code>), by nie zdradzać odpowiedzi. Po prawej <strong>Tylko słuchaj</strong> uruchamia automatyczne czytanie w wybranym <strong>Tempie</strong> (<em>Bardzo wolno</em> do <em>Bardzo szybko</em>).</p>
      </div>
    `
  }
};

function renderRhythmReferenceHTML_PL() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Puls i metrum</span>
        <span class="k-ratio-chip">Takt</span>
      </div>
      <h4>Co spaja każdy utwór w czasie</h4>
      <p>
        Prawie cała muzyka oddycha równym biciem serca zwanym <strong>pulsem (miarą)</strong>. Jego prędkość mierzymy w <strong>BPM</strong> (<em>uderzeń na minutę</em>). <strong>Metrum</strong> porządkuje miary w powtarzające się takty — najwyraźniej czuć pierwszą, akcentowaną <strong>miarę („raz”)</strong>.
      </p>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>4/4 (Cztery ćwierćnuty)</strong>
          <span>Cztery miary ćwierćnutowe w takcie (<strong>1</strong>–2–3–4). Kręgosłup niemal całego popu, rocka, hip-hopu i funku.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>3/4 (Walc)</strong>
          <span>Trzy miary ćwierćnutowe w takcie (<strong>1</strong>–2–3). Wirujący ruch walca (<em>Nad pięknym modrym Dunajem</em>, <em>Piano Man</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>6/8 (Złożone dwudzielne)</strong>
          <span>Sześć ósemek zgrupowanych w dwa kołyszące impulsy triolowe (<strong>1</strong>-2-3-<strong>4</strong>-5-6): typowe dla wielkich ballad (<em>Nothing Else Matters</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>5/4 (Nieregularne / asymetryczne)</strong>
          <span>Podział 3 + 2 (lub 2 + 3), słynne dzięki jazzowemu klasykowi Dave’a Brubecka <em>Take Five</em> oraz motywowi <em>Mission: Impossible</em>.</span>
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="meter-4-4">▶ 4/4 Klasyczne</button>
        <button class="btn-tool" data-play-rhythm="meter-3-4">▶ 3/4 Walc</button>
        <button class="btn-tool" data-play-rhythm="meter-6-8">▶ 6/8 Kołyszące</button>
        <button class="btn-tool" data-play-rhythm="meter-5-4">▶ 5/4 Asymetryczne (3+2)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Wartości rytmiczne i podziały</span>
        <span class="k-ratio-chip">1 · 2 · 3 · 4</span>
      </div>
      <h4>Jak dzielimy jedno uderzenie pulsu</h4>
      <p>
        Gdy stopa utrzymuje równy puls, muzycy dzielą każdą miarę na drobniejsze cząstki (<strong>podziały / subdiwizje</strong>). <strong>Kropka</strong> przy nucie przedłuża ją dokładnie o połowę jej wartości — tworząc sprężyste skoki „długa–krótka”.
      </p>
      <ul class="k-physics-list">
        <li><strong>Cała nuta i półnuta:</strong> Długie brzmienie przez 4 lub 2 miary taktu.</li>
        <li><strong>Ćwierćnuty:</strong> Dokładnie w każde uderzenie pulsu (<em>1 – 2 – 3 – 4</em>).</li>
        <li><strong>Ósemki:</strong> Dwa równe uderzenia na miarę (<em>raz-i – dwa-i</em>).</li>
        <li><strong>Triole:</strong> Trzy równe dźwięki w czasie jednej miary (<em>raz-ta-ta – dwa-ta-ta</em>).</li>
        <li><strong>Szesnastki:</strong> Cztery ostre uderzenia na miarę (<em>1-e-i-a</em>) — napęd funkowego groovu i hi-hatów trapowych.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="sub-quarter">▶ Ćwierćnuty (1×)</button>
        <button class="btn-tool" data-play-rhythm="sub-eighth">▶ Ósemki (2×)</button>
        <button class="btn-tool" data-play-rhythm="sub-triplet">▶ Triole (3×)</button>
        <button class="btn-tool" data-play-rhythm="sub-sixteenth">▶ Szesnastki (4×)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Groove, backbeat i swing</span>
        <span class="k-ratio-chip">Onbeat vs. offbeat</span>
      </div>
      <h4>Dlaczego ten sam takt 4/4 może bujać zupełnie inaczej</h4>
      <p>
        To, czy rytm maszeruje sztywno czy kołysze ciałem, zależy niemal wyłącznie od tego, na które miejsca w takcie padają akcenty:
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Marsz kontra Backbeat (2 i 4)</h5>
          <p>Akcent na <strong>1 i 3</strong> brzmi jak orkiestra marszowa. Przełóż trzask werbla na <strong>2 i 4</strong> (<em>backbeat</em>) — i rodzi się pop, rock oraz soul!</p>
          <button class="btn-tool" data-play-rhythm="beat-march">▶ Marsz (1 i 3)</button>
          <button class="btn-tool" data-play-rhythm="beat-backbeat">▶ Backbeat (2 i 4)</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Synkopa i Swing / Shuffle</h5>
          <p><strong>Synkopa</strong> przenosi ciężar na słabe „i” między miarami. W <strong>swingu</strong> ósemki kołyszą się nierówno (ok. 2:1 o triolowym odbiciu zamiast sztywnego 1:1).</p>
          <button class="btn-tool" data-play-rhythm="beat-syncopation">▶ Groove synkopowany</button>
          <button class="btn-tool" data-play-rhythm="beat-swing">▶ Odczucie swingu</button>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Polirytmia i piosenki-klucze</span>
        <span class="k-ratio-chip">3 przeciw 2</span>
      </div>
      <h4>Dwa zegary naraz + niezapomniane utwory</h4>
      <p>
        <strong>Polirytmia</strong> nakłada na siebie dwie różne siatki podziału w tym samym czasie — najsłynniejsza para to <strong>3 przeciw 2</strong> (woodblock dzieli takt na 3, gdy stopa bije 2 równe kroki w tym samym oknie). Pamiętasz Fizykę i dźwięk? To dokładnie proporcja <code>3:2</code> kwinty czystej!
      </p>
      <div class="k-meta-box">
        <strong>Skojarz metra ze znanymi nagraniami:</strong>
        <ul class="k-physics-list" style="margin-top:0.25rem;">
          <li><strong>Metrum 4/4:</strong> „We Will Rock You” (Queen) • „Billie Jean” (Michael Jackson)</li>
          <li><strong>Metrum 3/4:</strong> „Piano Man” (Billy Joel) • klasyczny walc wiedeński</li>
          <li><strong>Metrum 6/8:</strong> „Nothing Else Matters” (Metallica) • „We Are the Champions” (Queen)</li>
          <li><strong>Metrum 5/4:</strong> „Take Five” (Dave Brubeck) • „Mission: Impossible”</li>
        </ul>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="poly-3-2">▶ Posłuchaj polirytmii „3 na 2”</button>
      </div>
    </article>
  `;
}

const RHYTHM_INSTRUMENTS_DATA_PL = [
  {
    category: "drumset",
    tag: "Zestaw perkusyjny • Fundament dołu",
    tagClass: "tag-peach",
    name: "Bęben basowy / Stopa (Kick / Bass Drum)",
    role: "Ciężar i uderzenie w klatkę (dół ~50–120 Hz)",
    desc: "Największy bęben zestawu obsługiwany pedałem nożnym. Trzyma główne oparcie taktu (zazwyczaj 1 i 3 albo równy „four-on-the-floor”) i spina się z gitarą basową.",
    rhythmKey: "inst-kick",
    btnLabel: "Posłuchaj pulsu stopy"
  },
  {
    category: "drumset",
    tag: "Zestaw perkusyjny • Trzask backbeatu",
    tagClass: "tag-peach",
    name: "Werbel (Snare Drum)",
    role: "Wyrazisty akcent na 2 i 4",
    desc: "Metalowe sprężyny pod dolnym naciągiem drżą przy uderzeniu, dając przenikliwy strzał popu i rocka, delikatne ghost notes oraz gęste werblowe przejścia.",
    rhythmKey: "inst-snare",
    btnLabel: "Posłuchaj werbla i przejścia"
  },
  {
    category: "drumset",
    tag: "Zestaw perkusyjny • Drobne podziały",
    tagClass: "tag-peach",
    name: "Hi-Hat i talerze (Ride / Crash)",
    role: "Precyzyjny puls i akcenty części",
    desc: "Para nożnych talerzy (hi-hat) równo odmierza ósemki lub szesnastki. Duży talerz ride niesie jazzowy swing, a wybuchowy crash zaznacza wejście refrenu.",
    rhythmKey: "inst-hat",
    btnLabel: "Posłuchaj hi-hata"
  },
  {
    category: "drumset",
    tag: "Zestaw perkusyjny • Melodyjne przejścia",
    tagClass: "tag-peach",
    name: "Tomy (wiszące i kocioł)",
    role: "Przejścia, brejki i zejścia",
    desc: "Stopniowane bębny bez sprężyn. Nastrojone od wysokiego do niskiego, efektownie prowadzą przejścia ze zwrotki do refrenu.",
    rhythmKey: "inst-toms",
    btnLabel: "Posłuchaj przejścia na tomach"
  },
  {
    category: "world",
    tag: "Perkusjonalia ręczne • Wszechstronny",
    tagClass: "tag-lilac",
    name: "Cajón",
    role: "Przenośny akustyczny mini-zestaw",
    desc: "Peruwiańska drewniana skrzynka, na której siada grający: uderzenie bliżej środka daje głęboki bas stopy, a klepnięcie w górną krawędź pobudza sprężyny werbla."
  },
  {
    category: "world",
    tag: "Perkusjonalia ręczne • Latin i pop",
    tagClass: "tag-lilac",
    name: "Kongi i bongosy",
    role: "Płynne groovy i jasne akcenty",
    desc: "Pary afrokubańskich bębnów ręcznych. Kongi toczą śpiewny wzór tumbao w niskim rejestrze, a małe bongosy wnoszą ostre akcenty nad zestawem."
  ,
    rhythmKey: "inst-conga",
    btnLabel: "Posłuchaj tumbao na kongach"
  },
  {
    category: "world",
    tag: "Etniczne i orkiestrowe",
    tagClass: "tag-lilac",
    name: "Djembe, darbuka i kotły",
    role: "Dynamika od szeptu do grzmotu",
    desc: "Bębny kielichowe jak zachodnioafrykańskie djembe łączą głęboki bas ze strzelistym slapem. W orkiestrze symfonicznej pedałowe kotły wnoszą grzmiące rytmy o określonej wysokości."
  },
  {
    category: "small",
    tag: "Kompas czasu • Drewno",
    tagClass: "tag-sage",
    name: "Claves i woodblock",
    role: "Laserowo dokładne odliczanie czasu",
    desc: "Dwie twarde drewniane pałeczki. Mieści się w dłoni, lecz ich ostry klik przebija cały big-band — tworząc rytm 3–2 son clave, serce salsy i muzyki latynoskiej.",
    rhythmKey: "inst-clave",
    btnLabel: "Posłuchaj 3–2 clave"
  },
  {
    category: "small",
    tag: "Przeszkadzajki • Pęd powietrza",
    tagClass: "tag-sage",
    name: "Shaker, marakasy i tamburyn",
    role: "Ruch naprzód i świetlisty szelest",
    desc: "Shakery wypełnione ziarnem lub śrutem tkają nieprzerwane fale szesnastkowe, sklejając stopę z werblem i napędzając nawet powolną balladę.",
    rhythmKey: "inst-shaker",
    btnLabel: "Posłuchaj ścieżki shakera"
  },
  {
    category: "small",
    tag: "Przeszkadzajki • Metal",
    tagClass: "tag-sage",
    name: "Cowbell, agogô i trójkąt",
    role: "Wyraziste offbeaty i dźwięczne iskry",
    desc: "Dzwoniące metalowe akcenty uwielbiane w funku, disco i sambie — w tym dwutonowy dialog dzwonków agogô.",
    rhythmKey: "inst-cowbell",
    btnLabel: "Posłuchaj riffu cowbella"
  },
  {
    category: "small",
    tag: "Nie zapominaj o nich!",
    tagClass: "tag-sage",
    name: "Gitara basowa, kontrabas i gitara rytmiczna",
    role: "Pomost między rytmem a harmonią",
    desc: "Groove nie powstaje na samych bębnach! Stopa i bas spinają się w jeden napęd sekcji rytmicznej, a krótkie tłumione uderzenia gitary czy clavinetu działają jak melodyjna perkusja."
  }
];

function renderRhythmInstrumentsHTML_PL(filterCat = "all") {
  const list = filterCat === "all"
    ? RHYTHM_INSTRUMENTS_DATA_PL
    : RHYTHM_INSTRUMENTS_DATA_PL.filter(i => i.category === filterCat);

  const ensembleCard = filterCat === "all" ? `
    <div class="article-highlight-box" style="margin-bottom:0.2rem;">
      <h4>Jak bębny i perkusjonalia dzielą wspólny groove (podział pasm):</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-dark); line-height:1.4;">
        Każdy instrument zajmuje własne piętro częstotliwości, by uniknąć zgiełku: <strong>Stopa</strong> trzyma dół, <strong>Werbel</strong> strzela w środku, a <strong>Hi-hat i Shaker</strong> skrzą się w górze.
      </p>
      <div class="k-btn-row" style="margin-top:0.35rem;">
        <button class="btn-tool" data-play-rhythm="band-groove">▶ Groove zespołu (Stopa + Werbel + Hat + Shaker)</button>
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
      <p><strong>Rola:</strong> ${item.role}</p>
      <p>${item.desc}</p>
      ${item.rhythmKey ? `
        <div class="k-btn-row">
          <button class="btn-tool" data-play-rhythm="${item.rhythmKey}">▶ ${item.btnLabel}</button>
        </div>
      ` : ""}
    </article>
  `).join("");
}

function renderVocalsReferenceHTML_PL() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Głos ludzki</span>
        <span class="k-ratio-chip">Pierwszy instrument</span>
      </div>
      <h4>Jak ludzki głos wytwarza dźwięk</h4>
      <p>Twój głos łączy trzy układy akustyczne w jednym żywym instrumencie. W przeciwieństwie do gitary czy fletu jego „pudło rezonansowe” zmienia kształt w milisekundach — błyskawicznie kształtując wysokość, głośność, blask i każdą samogłoskę lub spółgłoskę.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>1. Źródło energii (Oddech i podparcie)</strong>
          Podczas wdechu <em>przepona</em> obniża się miękko, napełniając płuca. Podczas śpiewu mięśnie brzucha i międzyżebrowe utrzymują równe <em>ciśnienie podgłośniowe</em> („podparcie”) bez zaciskania gardła.
        </div>
        <div class="physics-fact-item">
          <strong>2. Wibrator (Krtań i fałdy głosowe)</strong>
          W krtani napięte są dwie elastyczne <em>struny (fałdy) głosowe</em>. Strumień powietrza przywiera i otwiera je 100–1000 razy na sekundę (<em>efekt Bernoulliego</em>), rodząc surowy dźwięk bogaty w alikwoty.
        </div>
        <div class="physics-fact-item">
          <strong>3. Rezonator (Trakt głosowy i formanty)</strong>
          Gardło, jama ustna i nosowa działają jak zmienny filtr. Ruchy języka, żuchwy, warg i podniebienia miękkiego przesuwają szczyty rezonansu — <em>formanty</em>, zmieniając ciemne „U” w świetliste „I”.
        </div>
        <div class="physics-fact-item">
          <strong>4. Formant śpiewaczy (~3000 Hz)</strong>
          Poszerzając dolne gardło, śpiewacy operowi skupiają dodatkową energię w okolicy 2,8–3,2 kHz — dokładnie tam, gdzie orkiestra jest cichsza, więc jeden nienagłośniony głos przebija 80 instrumentów!
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C4,E4,G4,C5" data-dur="1.9" data-step="0">▶ Posłuchaj akordu chóralnego</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Rejestry i techniki</span>
        <span class="k-ratio-chip">Barwy głosu</span>
      </div>
      <h4>Rejestry wokalne i style śpiewu</h4>
      <p>Zależnie od tego, które mięśnie krtani pracują oraz czy drga cała masa fałdów głosowych, czy tylko ich cienka krawędź, głos radykalnie zmienia charakter:</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Głos piersiowy (Rejestr modalny, M1)</strong>
          Drga cała masa mięśniowa fałdów. Daje soczyste, ciepłe, bogate w alikwoty brzmienie — nasz naturalny głos mówiony i mocną podstawę dołu oraz środka.
        </div>
        <div class="physics-fact-item">
          <strong>Głos głowowy i falset (M2)</strong>
          Fałdy wydłużają się i stają cieńsze, więc drgają głównie ich brzegi. Barwa staje się lekka, lotna i fletowa (spięty klasyczny głos głowowy lub zwiewny <em>falset</em>).
        </div>
        <div class="physics-fact-item">
          <strong>Mix (Mixed Voice / Voix mixte)</strong>
          Płynny pomost przez dźwięki przejściowe (<em>passaggio</em>). Zrównoważona koordynacja mięśni łączy pełnię głosu piersiowego z lekkością góry bez załamania głosu.
        </div>
        <div class="physics-fact-item">
          <strong>Belting (Pop, musical, gospel)</strong>
          Prowadzi gęstą energię modalną wysoko w górę przy mocnym podparciu oddechowym i otwartych samogłoskach — śmiały, bezpośredni dźwięk aż do g²/c³.
        </div>
        <div class="physics-fact-item">
          <strong>Vibrato</strong>
          Naturalna, rozluźniona okresowa pulsacja wysokości i głośności ok. 5–7 Hz. Ociepla długie nuty i pozwala głosowi solowemu wybić się z zespołu.
        </div>
        <div class="physics-fact-item">
          <strong>Scat i śpiew alikwotowy</strong>
          Jazzowy <em>scat</em> imituje solówki dęte rytmicznymi sylabami. W <em>śpiewie alikwotowym</em> precyzyjny kształt języka wzmacnia pojedynczą składową ponad burdonem — jeden śpiewak wydobywa dwa dźwięki naraz!
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">Obsada chóralna (SATB)</span>
        <span class="k-ratio-chip">Głosy i skale</span>
      </div>
      <h4>Wewnątrz chóru: cztery głosy SATB i skale</h4>
      <p>Chóry mieszane na całym świecie opierają się na układzie <strong>SATB</strong> — od najwyższego do najniższego głosu. Wielkie chóry symfoniczne często dzielą każdy głos na pierwsze i drugie: <em>SSAATTBB</em>.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Sopran (S) • Skala c¹–c³</strong>
          Najwyższy głos żeński lub chłopięcy. Zazwyczaj prowadzi główną linię melodyczną, wysokie kontrapunkty i krystaliczny blask akordu.
        </div>
        <div class="physics-fact-item">
          <strong>Alt (A) • Skala f–e²</strong>
          Niższy głos żeński (lub partia kontratenora). Wypełnia ciepłe wnętrze harmonii — tercje, septymy i miękkie linie tuż pod melodią.
        </div>
        <div class="physics-fact-item">
          <strong>Tenor (T) • Skala c–a¹</strong>
          Wysoki głos męski (w nutach zapisywany często w kluczu wiolinowym o oktawę wyżej niż brzmi!). Łączy górę i dół śpiewnymi liniami.
        </div>
        <div class="physics-fact-item">
          <strong>Bas (B) • Skala E–e¹</strong>
          Najniższy głos męski i akustyczna kotwica chóru. Nuta basowa wyznacza fundament harmonii — gdy basy trzymają czysty strój, cały akord staje jak mur.
        </div>
        <div class="physics-fact-item">
          <strong>Mezzosopran, baryton i kontratenor</strong>
          Trzy ważne głosy pośrednie: <em>Mezzosopran</em> (a–a², ciepły łącznik sopranu i altu), <em>Baryton</em> (G–g¹, najczęstszy męski rejestr) oraz <em>Kontratenor</em> (męski alt w wykształconym rejestrze głowowym).
        </div>
        <div class="physics-fact-item">
          <strong>Inne składy wokalne</strong>
          <em>Chóry żeńskie/dziecięce (SSAA)</em> i <em>męskie (TTBB / barbershop)</em> tworzą gęste, lśniące współbrzmienia. Zespoły <em>a cappella</em> dodają perkusję wokalną (beatbox) zamiast bębnów.
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G4,B4,D5,G5" data-dur="0.95" data-step="320">▶ Skala sopranu</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G3,Bb3,D4,F4" data-dur="0.95" data-step="320">▶ Skala altu</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,E3,G3,B3" data-dur="0.95" data-step="320">▶ Skala tenoru</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="E2,G2,B2,E3" data-dur="1.05" data-step="340">▶ Fundament basu</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Intonacja i słuch</span>
        <span class="k-ratio-chip">Strój czysty</span>
      </div>
      <h4>Dlaczego chór a cappella potrafi zabrzmieć czyściej niż fortepian</h4>
      <p>Fortepian strojony jest w <strong>12-stopniowym stroju równomiernie temperowanym</strong>: jego tercja wielka jest o 14 centów za wysoka wobec ideału, by móc swobodnie grać w każdej tonacji. Wokaliści nie są skrępowani progami ani młoteczkami.</p>
      <p>Śpiewając bez akompaniamentu, dobry chór intuicyjnie stroi się w bezbłędne <strong>naturalne proporcje częstotliwości</strong> (2:1 oktawa, 3:2 kwinta, 5:4 tercja wielka). Gdy tercja wielka siada bez żadnych dudnień, wspólne alikwoty wzmacniają się — i akord nagle rozkwita dzwoniącym blaskiem („ring” w barbershopie).</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="1.4" data-step="460">▶ Zbuduj kolejno głosami (Bas → Sopran)</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="2.4" data-step="0">▶ Pełny akord chóru SATB</button>
        <button class="btn-tool" data-open-warmup="true">▶ Otwórz 5-min rozgrzewkę</button>
      </div>
    </article>
  `;
}

const INSTRUMENT_MODULES_PL = {
  strings: {
    title: "Smyczkowe",
    subtitle: "Fizyka smyczka, rodzina smyczkowa w orkiestrze i techniki gry",
    intro: {
      tag: "Fizyka i lutnictwo",
      tagClass: "tag-peach",
      chip: "Ruch Helmholtza",
      heading: "Jak smyczek sprawia, że struna śpiewa",
      body: "Końskie włosie natarte lepką <em>kalafonią</em> setki razy na sekundę chwyta i puszcza strunę w cyklu przyczepienia i poślizgu. Rzeźbiony klonowy <em>podstawek (mostek)</em> przenosi drgania na świerkową płytę wierzchnią, wspieraną wewnątrz przez duszę i belkę basową. Brak progów pozwala smyczkowcom korygować każdy dźwięk na bieżąco do czystego stroju."
    },
    items: [
      {
        name: "Skrzypce",
        tag: "Sopran wśród smyczków",
        tagClass: "tag-peach",
        range: "g – a⁴ (G3 – A7)",
        tuning: "Kwinty czyste: g – d¹ – a¹ – e²",
        role: "Główna melodia, blask i wirtuozeria",
        desc: "Najwyższy i najbardziej zwinny głos rodziny. W orkiestrze dzieli się na I skrzypce (często w wysokim rejestrze) oraz II skrzypce (wypełnienie harmoniczne i dialog). Krótkie, lekkie struny reagują błyskawicznie na szybkie pasaże.",
        demos: [
          { label: "Skrzypce smyczkiem (Arco)", style: "strings", notes: "G4,D5,A5,E6", dur: 1, step: 340 },
          { label: "Skrzypce szarpane (Pizzicato)", style: "pizzicato", notes: "G4,B4,D5,G5", dur: 0.75, step: 220 }
        ]
      },
      {
        name: "Altówka",
        tag: "Alt wśród smyczków",
        tagClass: "tag-sage",
        range: "c – e³ (C3 – E6)",
        tuning: "Kwinty czyste: c – g – d¹ – a¹",
        role: "Ciepło środka harmonii i aksamitne kontrapunkty",
        desc: "O kwintę niższa od skrzypiec i tradycyjnie zapisywana w <em>kluczu altowym</em>. Pudło jest odrobinę mniejsze niż wymagałaby idealna akustyka jej niskiej skali — właśnie stąd bierze się jej charakterystyczny ciemny, gęsty i śpiewny tembr.",
        demos: [
          { label: "Posłuchaj rejestru altówki", style: "strings", notes: "C3,G3,D4,A4", dur: 1.05, step: 360 }
        ]
      },
      {
        name: "Wiolonczela",
        tag: "Tenor i baryton",
        tagClass: "tag-lilac",
        range: "C – a² (C2 – A5)",
        tuning: "Kwinty czyste: C – G – d – a",
        role: "Aksamitny fundament i liryczne partie solowe",
        desc: "O całą oktawę niższa od altówki i zadziwiająco bliska skali ludzkiego głosu. Dolne struny niosą głębokie ciepło, a struna A śpiewa przejmujące solówki w rejestrze tenorowym i barytonowym.",
        demos: [
          { label: "Posłuchaj skali wiolonczeli (C–a)", style: "strings", notes: "C2,G2,D3,A3", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Kontrabas",
        tag: "Subfundament",
        tagClass: "tag-peach",
        range: "E₁ (lub C₁ z przedłużką) – g¹",
        tuning: "Kwarty czyste: E₁ – A₁ – D – G",
        role: "Bas orkiestrowy i jazzowy walking bass",
        desc: "Strojony <em>kwartami</em> zamiast kwint dla wygodniejszych zasięgów lewej ręki; brzmi o <strong>oktawę niżej</strong> niż w zapisie nutowym. Prowadzony smyczkiem daje orkiestrze potężną głębię, a szarpany pizzicato napędza jazz i swing.",
        demos: [
          { label: "Kontrabas smyczkiem (Orkiestra)", style: "strings", notes: "E1,A1,D2,G2", dur: 1.25, step: 420 },
          { label: "Jazzowy Walking Bass (Pizzicato)", style: "pizzicato", notes: "C2,E2,G2,A2,Bb2,A2,G2,E2", dur: 0.7, step: 280 }
        ]
      }
    ],
    extraBox: {
      heading: "Techniki artykulacyjne smyczkowców, które łatwo usłyszeć",
      facts: [
        { title: "Arco vs. Pizzicato", text: "<em>Arco</em> to gra smyczkiem dająca śpiewne, ciągnięte linie; <em>pizzicato</em> to szarpnięcie palcem o krótkim, ciepłym i perkusyjnym ataku." },
        { title: "Spiccato i Martelé", text: "<em>Spiccato</em> polega na sprężystym podskakiwaniu smyczka dla lekkiej, iskrzącej ruchliwości; <em>martelé</em> to ostre, „kute” uderzenia smyczkiem z wyraźnym akcentem." },
        { title: "Tremolo i Sul Ponticello", text: "Szybkie drżenie smyczka w miejscu buduje napięcie filmowe (<em>tremolo</em>). Gra tuż przy podstawku (<em>sul ponticello</em>) wydobywa szklane, niesamowite brzmienie." },
        { title: "Flageolety i Con Sordino", text: "Lekki dotyk w węzłach fali wyzwala kryształowe alikwoty. Tłumik na podstawku (<em>con sordino</em>) otula brzmienie jedwabistą mgiełką." }
      ]
    }
  },
  woodwinds: {
    title: "Dęte drewniane",
    subtitle: "Krawędź zadęcia, pojedynczy i podwójny stroik oraz dlaczego metalowy saksofon też tu należy",
    intro: {
      tag: "Akustyka słupa powietrza",
      tagClass: "tag-sage",
      chip: "3 sposoby wzbudzania",
      heading: "Dlaczego mosiężny saksofon należy do instrumentów dętych drewnianych",
      body: "O przynależności nie decyduje materiał korpusu (współczesne flety bywają srebrne lub złote, a saksofony mosiężne), lecz <strong>sposób wzbudzania fali dźwiękowej i system klap</strong>: powietrze rozcina się o ostrą krawędź wargową (flety) albo wprawia w drganie jeden lub dwa elastyczne stroiki trzcinowe."
    },
    items: [
      {
        name: "Flet poprzeczny i piccolo",
        tag: "Krawędź powietrzna (bez stroika)",
        tagClass: "tag-peach",
        range: "c¹ – d⁴ (Piccolo d² – c⁵)",
        tuning: "Strój w C (Piccolo +1 oktawa)",
        role: "Srebrzysta góra, tryle i ptasia lekkość",
        desc: "Strumień powietrza rozbija się o krawędź otworu główki fletu, oscylując szybko do środka i na zewnątrz. Niskie dźwięki brzmią aksamitnie i niemal sinusoidalnie, a trzecia oktawa świeci srebrem. Malutkie piccolo przebija nawet potężne tutti orkiestry.",
        demos: [
          { label: "Flet (śpiewna fraza)", style: "flute", notes: "G4,A4,B4,D5,E5,G5", dur: 0.9, step: 260 }
        ]
      },
      {
        name: "Obój i rożek angielski",
        tag: "Podwójny stroik (wąski stożek)",
        tagClass: "tag-lilac",
        range: "b – a³ (Rożek angielski w F)",
        tuning: "Obój w C • Wyznacza strój orkiestry a¹",
        role: "Kamerton orkiestry i przejmujące melodie",
        desc: "Dwie cienkie sklejone płytki trzciny drgają przeciwko sobie na szczycie wąskiego stożkowego korpusu, dając skupiony, bogaty w alikwoty ton. Ponieważ strój oboju jest stabilny, cała orkiestra stroi się do <strong>jego dźwięku a¹</strong>. Altowy rożek angielski z gruszkowatą czarą brzmi wyjątkowo nostalgicznie.",
        demos: [
          { label: "Barwa oboju (podwójny stroik)", style: "reed", notes: "A4,C5,E5,D5,C5,A4", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "Klarnet i klarnet basowy",
        tag: "Pojedynczy stroik (cylinder)",
        tagClass: "tag-sage",
        range: "d – b³ (Klarnet basowy do B₁)",
        tuning: "Najczęściej w B lub A (transponujący)",
        role: "Od ciepłego rejestru dolnego po jazz i klezmer",
        desc: "Pojedynczy stroik drga przy płaskim ustniku na cylindrycznej rurze. Ciekawostka fizyczna: cylinder zachowuje się jak piszczałka zamknięta z jednej strony! Dlatego ciemny rejestr <em>chalumeau</em> wzmacnia nieparzyste alikwoty, a przy przedęciu klarnet przeskakuje nie o oktawę, lecz o <strong>duodecymę (oktawa + kwinta)</strong>.",
        demos: [
          { label: "Klarnet (dolny → górny rejestr)", style: "reed", notes: "D3,F3,A3,C4,E4,A4", dur: 0.9, step: 280 }
        ]
      },
      {
        name: "Fagot i kontrafagot",
        tag: "Podwójny stroik (bas)",
        tagClass: "tag-peach",
        range: "B₁ – e² (Kontrafagot do B₂)",
        tuning: "Strój w C (rura złożona w literę U)",
        role: "Suche staccato w basie i śpiewny tenor",
        desc: "Ponad 2,6 metra stożkowej drewnianej rury złożonej w kształt litery U. W krótkim staccato brzmi dowcipnie i wyraziście, natomiast w górnym rejestrze kantylenowym śpiewa ciepło niczym baryton lub wiolonczela.",
        demos: [
          { label: "Niski rejestr fagotu", style: "reed", notes: "Bb1,F2,Bb2,D3,F3", dur: 1, step: 330 }
        ]
      },
      {
        name: "Rodzina saksofonów (sopranowy, altowy, tenorowy, barytonowy)",
        tag: "Nowoczesna hybryda",
        tagClass: "tag-lilac",
        range: "Des – f³ (realne brzmienie)",
        tuning: "Naprzemiennie Es (Alt/Baryton) i B (Sopran/Tenor)",
        role: "Jazz, big-band, funk, soul i popowe solówki",
        desc: "Skonstruowany około 1840 r. przez Adolpha Saxa jako pomost akustyczny: zwinny pojedynczy stroik klarnetu + szeroki stożkowy korpus z mosiądzu. Przedęwa klasycznie o oktawę, łącząc ruchliwość drewnianych z mocą blachy — od szeptanego subtone po rockowy pazur.",
        demos: [
          { label: "Brzmienie saksofonu (alt/tenor)", style: "reed", notes: "C4,Eb4,F4,F#4,G4,Bb4", dur: 0.9, step: 250 }
        ]
      }
    ],
    extraBox: {
      heading: "Krótki przewodnik po instrumentach transponujących",
      facts: [
        { title: "Dlaczego dęte piszą w B, Es lub F?", text: "Aby saksofonista przechodzący z altu na baryton — lub klarnecista na inny klarnet — zachował identyczne chwyty palców! Zagranie zapisanego <em>C</em> na trąbce B lub tenorze daje w rzeczywistości dźwięk <em>B</em> (o sekundę wielką niżej)." },
        { title: "Orkiestrowe mieszanie barw", text: "W przeciwieństwie do jednolitej sekcji smyczkowej, każdy instrument drewniany ma odrębną osobowość — kompozytorzy kochają mieszanki: Flet + Obój łączą srebro ze skupieniem; Klarnet + Waltornia dają płynny aksamit." }
      ]
    }
  },
  brass: {
    title: "Dęte blaszane",
    subtitle: "Alikwoty naturalne, wentyle, suwak oraz klasyczne tłumiki",
    intro: {
      tag: "Wibracja warg",
      tagClass: "tag-lilac",
      chip: "Alikwoty + długość rury",
      heading: "Nie drga metal — wibrują Twoje wargi!",
      body: "Na trąbce, waltorni, puzonie czy tubie napięte wargi grajka pełnią rolę żywego stroika w kociołkowatym ustniku. Bez użycia wentyli blacha gra wyłącznie naturalny <strong>szereg alikwotowy</strong> swojej rury (jak dawny róg myśliwski). <strong>Wentyle</strong> lub wysuwany <strong>suwak</strong> błyskawicznie wydłużają słup powietrza, dając pełną skalę chromatyczną."
    },
    items: [
      {
        name: "Trąbka i skrzydłówka (flugelhorn)",
        tag: "Wysoka blacha (cylinder vs. stożek)",
        tagClass: "tag-peach",
        range: "e – c³ (realnie)",
        tuning: "Najczęściej w B lub C",
        role: "Fanfary, lead w big-bandzie i lśniące melodie",
        desc: "Blisko dwie trzecie rury trąbki pozostają wąsko cylindryczne przed rozszerzeniem czary — dlatego w głośnej dynamice dźwięk błyszczy ostro i przeszywająco. Krewny <em>flugelhorn</em> rozszerza się stożkowo od samego ustnika, otulając tę samą skalę ciepłym jazzowym matem.",
        demos: [
          { label: "Fanfara trąbki (alikwoty naturalne)", style: "brass", notes: "C4,G4,C5,E5", dur: 0.95, step: 290 }
        ]
      },
      {
        name: "Waltornia / Róg (podwójny F / B)",
        tag: "Wąski stożek + ręka w czarze",
        tagClass: "tag-sage",
        range: "H₁ – f² (realnie)",
        tuning: "Podwójna waltornia F / B",
        role: "Epickie tematy filmowe i spoiwo orkiestry",
        desc: "Wywodzi się ze zwiniętego 3,7-metrowego rogu myśliwskiego. Granie wysoko w szeregu alikwotów nadaje waltorni szlachetną głębię łączącą drewno z ciężką blachą. Prawa dłoń w czarze ociepla barwę, a pełne zatkanie (<em>cuivré</em>) wyzwala metaliczny warczący efekt.",
        demos: [
          { label: "Zawołanie waltorni (kwinty i ciepło)", style: "brass", notes: "F3,C4,F4,A4", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Puzon (tenorowy i basowy)",
        tag: "Płynny suwak (7 pozycji)",
        tagClass: "tag-lilac",
        range: "E – f² (do H₁ z wentylem kwartowym)",
        tuning: "Zapis nietransponujący w C (podstawa B)",
        role: "Pełne pedały, płynne glissando i siła w jazzie",
        desc: "Zamiast wentyli suwak w kształcie litery U wydłuża rurę w 7 pozycjach co półton. Puzonista koryguje strój uchem z dokładnością co do ułamka centa i wykonuje niepowtarzalne płynne <strong>glissando</strong>.",
        demos: [
          { label: "Brzmienie puzonów (środek-dół blachy)", style: "brass", notes: "Bb2,F3,Bb3,D4", dur: 1.05, step: 320 }
        ]
      },
      {
        name: "Tuba i eufonium",
        tag: "Szeroki stożkowy bas",
        tagClass: "tag-peach",
        range: "D₁ – f¹ (tuba kontrabasowa do B₂)",
        tuning: "Stroje w F, Es, C lub B",
        role: "Dostojny subbas i miękkie wsparcie orkiestry",
        desc: "Ponad 5 metrów szeroko rozwartej rury mosiężnej daje zdumiewająco okrągły, miękki i pluszowy bas bez ostrego metalicznego brzęku. W orkiestrach dętych tuba wraz ze śpiewnym <em>eufonium</em> buduje głęboki dół.",
        demos: [
          { label: "Fundament tuby (oktawa + kwinta)", style: "brass", notes: "F1,C2,F2", dur: 1.25, step: 420 }
        ]
      }
    ],
    extraBox: {
      heading: "Jak klasyczne tłumiki zmieniają barwę blachy",
      facts: [
        { title: "Straight Mute (tłumik prosty)", text: "Stożek z aluminium lub fibry: wycina najniższy dół i nadaje trąbce lub puzonowi ostry, metaliczny pazur (jazz i muzyka filmowa)." },
        { title: "Harmon (Wah-Wah) Mute", text: "Słynny z nagrań Milesa Davisa: szczelnie zamyka czarę z małym otworem na wylocie — brzmienie jest kameralne, bzyczące, a przysłanianie dłonią daje efekt „łau-łau”." },
        { title: "Cup Mute i Plunger", text: "<em>Cup mute</em> łagodzi górę w aksamitne, zadymione ciepło; w big-bandach grajki potrafią „mówić” instrumentem, poruszając gumowym <em>plungerem</em> przed czarą." }
      ]
    }
  },
  keyboards: {
    title: "Klawiszowe",
    subtitle: "Młoteczki, skoczki szarpiące, piszczałki organowe i legendy elektromechaniczne",
    intro: {
      tag: "Polifoniczni giganci",
      tagClass: "tag-peach",
      chip: "Wspólna klawiatura",
      heading: "Ten sam układ klawiszy — cztery zupełnie inne światy mechaniki",
      body: "Fortepian, klawesyn, organy i Fender Rhodes dzielą tę samą intuicyjną klawiaturę 12 klawiszy na oktawę (7 białych, 5 czarnych), aby dwie ręce naraz mogły grać bas, harmonię i melodię. Jednak to, co kryje się za klawiszem, wytwarza dźwięk zupełnie inaczej."
    },
    items: [
      {
        name: "Pianino i fortepian koncertowy",
        tag: "Uderzenie w struny (mechanizm młoteczkowy)",
        tagClass: "tag-peach",
        range: "A₂ – c⁵ (88 klawiszy • 27,5 – 4186 Hz)",
        tuning: "12-TET z rozciągniętym strojem (~230 strun)",
        role: "Uniwersalny lider klasyki, jazzu, popu i kompozycji",
        desc: "Filcowe młoteczki <strong>uderzają</strong> w mocno napięte stalowe struny (nawet 3 na jedną nutę!) i natychmiast odskakują, pozwalając im swobodnie drgać. Prawy <em>pedał sustain</em> podnosi wszystkie tłumiki naraz, wzbudzając bogaty rezonans sąsiednich strun.",
        demos: [
          { label: "Fortepian (arpeggio z pedałem)", style: "piano", notes: "C3,G3,E4,G4,B4,D5", dur: 1.2, step: 220 }
        ]
      },
      {
        name: "Klawesyn",
        tag: "Szarpnięcie struny (piórko / plektron)",
        tagClass: "tag-sage",
        range: "F₁ – f³",
        tuning: "Często historyczne stroje (Werckmeister / Vallotti)",
        role: "Barokowe basso continuo i srebrzysty atak",
        desc: "Zamiast młoteczków malutkie piórko (dawniej krucze, dziś z delrynu) <strong>szarpie</strong> strunę podczas nacisku. Siła uderzenia niemal nie zmienia głośności — dynamikę buduje się rejestrami (4′, 8′, sprzęganiem manuałów) i gęstością faktury. Niezwykle bogaty w jasne alikwoty.",
        demos: [
          { label: "Szarpnięcie klawesynu", style: "cembalo", notes: "D4,F4,A4,D5,C#5,D5", dur: 0.9, step: 210 }
        ]
      },
      {
        name: "Organy piszczałkowe i fisharmonia",
        tag: "Aerofon (wiatrownica i głosy)",
        tagClass: "tag-lilac",
        range: "Subbasy 16′/32′ (< 16 Hz!) po mikstury 1′",
        tuning: "Piszczałki wargowe i języczkowe w stopażach",
        role: "Monumentalna polifonia z nieskończonym wybrzmieniem",
        desc: "Klawisze manuałów i klawiatury nożnej otwierają wentyle, kierując sprężone powietrze do setek lub tysięcy piszczałek. <em>Piszczałki wargowe</em> brzmią jak flety, a <em>języczkowe</em> jak trąbki czy oboje. Dźwięk trwa z pełną mocą tak długo, jak długo trzymasz klawisz!",
        demos: [
          { label: "Organy (pełna registracja)", style: "organ", notes: "C3,G3,C4,E4,G4", dur: 2, step: 0 }
        ]
      },
      {
        name: "Legendy estrady: Fender Rhodes, Hammond B3 i piano sceniczne",
        tag: "Klasyka elektromechaniczna",
        tagClass: "tag-sage",
        range: "73–88 klawiszy / Chóry drawbarowe",
        tuning: "Przetworniki, koła tonowe i modelowanie",
        role: "Jazz, funk, soul, gospel, rock i współczesny pop",
        desc: "<strong>Fender Rhodes</strong> uderza młoteczkami w metalowe kamertony umieszczone nad przetwornikami gitarowymi — dając dzwoniące, aksamitne brzmienie neo-soulu. <strong>Clavinet</strong> mechanicznie uderza w struny z zadziornym funkowym atakiem. A <strong>Hammond B3</strong> sumuje 9 suwaków (<em>drawbars</em>) z wirujących kół tonowych przez głośnik <em>Leslie</em>.",
        demos: [
          { label: "Organy Hammonda (voicing)", style: "organ", notes: "G3,B3,D4,F4", dur: 1.5, step: 0 },
          { label: "Ciepłe elektryczne piano Rhodes", style: "piano", notes: "F3,A3,C4,E4,G4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },
  plucked: {
    title: "Szarpane i gitary",
    subtitle: "Nylon, stal, przetworniki magnetyczne, gitara basowa i harfa koncertowa",
    intro: {
      tag: "Impuls szarpnięcia",
      tagClass: "tag-sage",
      chip: "Wyraźny atak i naturalne wygaszanie",
      heading: "Miejsce szarpnięcia całkowicie zmienia barwę",
      body: "Szarpnięcie struny opuszkiem, paznokciem lub kostką wywołuje sprężysty atak, po którym wyższe alikwoty gasną szybciej niż ton podstawowy. Szarpnij przy samym <strong>mostku</strong> (<em>sul ponticello</em>) — usłyszysz metaliczny, ostry „twang”; szarpnij nad <strong>gryfem</strong> (<em>sul tasto</em>) — uzyskasz ciepło podobne do harfy."
    },
    items: [
      {
        name: "Gitara klasyczna (nylon) i akustyczna (stal)",
        tag: "Pudła rezonansowe",
        tagClass: "tag-peach",
        range: "E – h² (realnie • w nutach o oktawę wyżej)",
        tuning: "Standard: E – A – d – g – h – e¹",
        role: "Akompaniament akordowy, fingerstyle, flamenco i poezja śpiewana",
        desc: "<em>Gitary klasyczne</em> ze strunami nylonowymi oczarowują miękkim ciepłem, przejrzystością głosów i wrażliwością na artykulację. <em>Akustyki stalowe</em> mają wyższy naciąg, błyszczącą górę i łatwo przebijają się w zespole.",
        demos: [
          { label: "Arpeggio gitary akustycznej", style: "guitar", notes: "E2,B2,E3,G#3,B3,E4", dur: 1.3, step: 170 }
        ]
      },
      {
        name: "Gitara elektryczna i tor sygnału",
        tag: "Przetworniki magnetyczne + wzmacniacz",
        tagClass: "tag-lilac",
        range: "E – e³ (plus podciągnięcia i flageolety)",
        tuning: "E – A – d – g – h – e¹ (oraz obniżone stroje)",
        role: "Funkowe riffy, krystaliczny clean, crunch i śpiewne solówki",
        desc: "Elektryczna deska bez podłączenia ledwo szepcze w pokoju: cewki z magnesami (<em>przetworniki</em>) zamieniają ruch stalowej struny w sygnał elektryczny. <strong>Single-coile</strong> (Strat/Tele) dźwięczą szklisto i klarownie; podwójne <strong>humbuckery</strong> (Les Paul) tłumią brum i dają kremowy środek — rozkwitając przez lampowy wzmacniacz, overdrive, delay i reverb.",
        demos: [
          { label: "Czysty akord gitary elektrycznej", style: "guitar", notes: "A2,D3,G3,C4,E4", dur: 1.4, step: 140 }
        ]
      },
      {
        name: "Gitara basowa (4-, 5-strunowa i bezprogowa)",
        tag: "Pomost między stopą a harmonią",
        tagClass: "tag-sage",
        range: "E₁ (lub H₂ w 5-strunowej) – g¹",
        tuning: "E₁ – A₁ – D – G",
        role: "Fundament groovu z perkusją, wsparcie basu w każdym gatunku",
        desc: "Strojona identycznie jak kontrabas i o oktawę niżej od gitary, lecz progi gwarantują precyzyjną intonację. Palcami brzmi tłusto i okrągło; kostką przebija rockowy miks; <strong>slap & pop</strong> (kciuk + szarpnięcie) rozpala funk, a bas <em>bezprogowy (fretless)</em> śpiewa płynnym wokalnym vibrato.",
        demos: [
          { label: "Groove basu elektrycznego (oktawa i kwinta)", style: "ebass", notes: "E1,E1,G1,A1,B1,E2", dur: 0.75, step: 260 }
        ]
      },
      {
        name: "Harfa koncertowa, mandolina, banjo i ukulele",
        tag: "Charakterystyczne barwy szarpane",
        tagClass: "tag-peach",
        range: "Harfa: Ces₁ – ges⁴ (47 strun)",
        tuning: "Harfa: diatoniczna z 7 pedałami dwufunkcyjnymi",
        role: "Lśniące glissanda, faktury folkowe i akustyczny blask",
        desc: "Każda z 47 strun harfy odpowiada stopniowi skali (czerwone oznaczają C, niebieskie lub czarne F); siedem pedałów przestawia jednocześnie wszystkie oktawy na bemol, kasownik lub krzyżyk. Z kolei podwójne struny <em>mandoliny</em>, bębnowa membrana <em>banjo</em> i słoneczne <em>ukulele</em> zdobią folk, country i indie pop.",
        demos: [
          { label: "Lśniące arpeggio w stylu harfy", style: "guitar", notes: "C3,D3,E3,G3,A3,C4,D4,E4,G4", dur: 0.9, step: 110 }
        ]
      }
    ]
  },
  electronic: {
    title: "Elektronika i studio",
    subtitle: "Architektura syntezatorów, samplery, automaty perkusyjne i miks w DAW",
    intro: {
      tag: "Sound design i produkcja",
      tagClass: "tag-sage",
      chip: "Elektrofonia i cyfra",
      heading: "Od fizycznego rezonansu do rzeźbienia fal dźwiękowych",
      body: "Instrumenty akustyczne zawdzięczają barwę drewnu, mosiądzowi lub skórze. Instrumenty elektroniczne zaczynają od czystego napięcia lub cyfrowej próbki — pozwalając precyzyjnie kształtować ilość alikwotów, szybkość ataku i ewolucję dźwięku w czasie."
    },
    items: [
      {
        name: "Syntezatory subtraktywne (analogowe i wirtualne)",
        tag: "Oscylator + Filtr + Obwiednia",
        tagClass: "tag-sage",
        range: "Całe słyszalne pasmo (od 20 Hz subbasu po ultragórę)",
        tuning: "Volt/Octave lub MIDI (aż po mikrotonalność)",
        role: "Potężne basy, melodyjne leady i ciepłe analogowe pady",
        desc: "Klasyczny schemat Minimooga: <strong>1. Oscylator (VCO)</strong> generuje surowe fale bogate w alikwoty — <em>piłę</em> (wszystkie składowe: tłusto i smyczkowo), <em>prostokąt/kwadrat</em> (nieparzyste: pusto i drewnianie) albo <em>trójkąt/sinus</em> (czysto). <strong>2. Filtr (VCF)</strong> rzeźbi jasność przez <em>Cutoff</em> i <em>Resonance</em>! <strong>3. Obwiednia (ADSR)</strong> steruje Attack, Decay, Sustain i Release.",
        demos: [
          { label: "Synth z fali piłokształtnej (lead)", style: "synth-saw", notes: "C3,E3,G3,B3,C4", dur: 0.85, step: 230 },
          { label: "Ciepły pad analogowy", style: "synth-pad", notes: "C3,G3,B3,D4,E4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "Synteza FM, wavetable i granularna",
        tag: "Cyfrowe pejzaże brzmień",
        tagClass: "tag-lilac",
        range: "Od szklanych dzwonków po żywe tekstury filmowe",
        tuning: "Precyzja próbkowa / mikrostrojenie",
        role: "Dzwoneczkowe piana lat 80., nowoczesny bas i ambient",
        desc: "<strong>Synteza FM</strong> (kultowa Yamaha DX7) moduluje częstotliwość jednej fali drugą w paśmie audio — tworząc krystaliczne dzwony, wyraziste e-piana lat 80. i sprężyste basy slap nawet bez filtra. <strong>Wavetable</strong> płynnie morfuje między klatkami fal, a <strong>Synteza granularna</strong> tnie nagranie na mikro-ziarna (10–50 ms), tkając gęste chmury dźwięku.",
        demos: [
          { label: "Przestronny pad ambientowy", style: "synth-pad", notes: "A2,E3,G3,B3,D4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "Samplery, Mellotron i automaty perkusyjne (808 / 909 / MPC)",
        tag: "Sampling i sekwencer krokowy",
        tagClass: "tag-peach",
        range: "Pełna skala poprzez zmianę prędkości/resampling",
        tuning: "Chromatyczna gra z klawiatury i padów",
        role: "Hip-hop, house, techno, bity popowe i makiety orkiestrowe",
        desc: "<strong>Sampler</strong> nagrywa dowolny dźwięk świata — chór, winylowy break, kroki — i mapuje na klawiaturę (pradziadkiem był taśmowy <em>Mellotron</em>!). Klasyczne maszyny jak Roland <em>TR-808</em> podarowały kultowe werble, klaski i cowbelle — a wydłużona sinusoidalna stopa 808 stała się basową melodią hip-hopu i trapu!",
        demos: [
          { label: "Posłuchaj linii subbasu 808", style: "ebass", notes: "C1,C1,Eb1,G1,C2,G1", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "DAW, instrumenty wirtualne i efekty miksu",
        tag: "Nowoczesne studio w komputerze",
        tagClass: "tag-sage",
        range: "Kompletne cyfrowe środowisko produkcji",
        tuning: "Korekcja wysokości i automatyka w czasie rzeczywistym",
        role: "Kompozycja, aranżacja, miks i mastering",
        desc: "Współczesne <em>Digital Audio Workstation (DAW)</em> mieści magnetofony wielośladowe, racki procesorów i całe wirtualne orkiestry na jednym ekranie. Przez <strong>MIDI</strong> sterujesz syntezatorami i bibliotekami orkiestrowymi, a w miksie oczyszczasz przestrzeń <strong>Korektorem (EQ)</strong>, wyrównujesz dynamikę <strong>Kompresorem</strong> i budujesz głębię za pomocą <strong>Reverbu i Delaya</strong>.",
        demos: [
          { label: "Warstwa synth + sub", style: "synth-saw", notes: "F2,C3,A3,E4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },
  ensembles: {
    title: "Orkiestry i zespoły",
    subtitle: "Dlaczego dziesiątki instrumentów naraz brzmią czytelnie zamiast zamienić się w ścianę hałasu",
    intro: {
      tag: "Aranżacja i przestrzeń pasm",
      tagClass: "tag-peach",
      chip: "Dźwiękowy podział pracy",
      heading: "Sekret udanej orkiestracji: częstotliwość + rola",
      body: "Gdy 80 muzyków orkiestry lub 5 członków zespołu rockowego gra jednocześnie, każdy instrument musi zająć swoje własne <strong>pasmo częstotliwości</strong> (dół, środek, góra) oraz czytelną <strong>rolę rytmiczną lub harmoniczną</strong>. Wszystkie klasyczne składy wykrystalizowały się jako genialne rozwiązanie tej właśnie zagadki."
    },
    items: [
      {
        name: "Orkiestra symfoniczna (~70–100 muzyków)",
        tag: "4 klasyczne sekcje",
        tagClass: "tag-peach",
        range: "Od subbasu kontrabasów po blask piccolo (16 Hz – >4 kHz)",
        tuning: "Strój koncertowy a¹ = 440–443 Hz",
        role: "Maksymalna rozpiętość dynamiki i bogactwo barw",
        desc: "Dlaczego naprzeciw 50+ smyczkowców siedzi zaledwie 2–4 trąbki? Bo jedna trąbka potrafi przekrzyczeć dziesięć skrzypiec! Liczne smyczki tkają ciepłą ciągłą <em>kanwę</em>, solowe dęte drewniane rysują giętkie melodie, blacha buduje monumentalne kulminacje, a kotły i perkusja napędzają dramaturgię.",
        demos: [
          { label: "Szeroki akord smyczkowy", style: "strings", notes: "C2,G2,E3,C4,G4", dur: 2, step: 0 },
          { label: "Warstwa fanfar blachy", style: "brass", notes: "C4,G4,C5,E5", dur: 1.1, step: 240 }
        ]
      },
      {
        name: "Muzyka kameralna (kwartet smyczkowy i kwintet dęty)",
        tag: "Przejrzystość solowa",
        tagClass: "tag-sage",
        range: "4–5 równoprawnych rozmówców",
        tuning: "Żywa adaptacyjna intonacja zespołowa",
        role: "Subtelny dialog głosów jak w chórze SATB",
        desc: "Klasyczny <strong>kwartet smyczkowy</strong> (2 skrzypiec, altówka, wiolonczela) idealnie odwzorowuje chór czterogłosowy: spójny jednorodny timbr, laserowa klarowność i żywy kontrapunkt. <strong>Kwintet dęty</strong> (flet, obój, klarnet, fagot + waltornia!) wybiera odwrotną drogę — pięć kontrastowych głosów, które miękko skleja ciepła waltornia.",
        demos: [
          { label: "Arpeggio kwartetu smyczkowego (wiolonczela → skrzypce)", style: "strings", notes: "C2,G3,D4,E4", dur: 1.5, step: 260 }
        ]
      },
      {
        name: "Big-band i combo jazzowe",
        tag: "Sekcja rytmiczna vs. sekcja dęta",
        tagClass: "tag-lilac",
        range: "Gęste układy jazzowe (block voicings)",
        tuning: "Frazowanie swingowe i zawołanie–odpowiedź",
        role: "Sprężysty walking bass i bębny pod sekcją dętą",
        desc: "Big-band dzieli się na dwie drużyny: <strong>sekcja rytmiczna</strong> (perkusja, kontrabas/bas, fortepian, gitara) stale utrzymuje swing i harmonię, a <strong>sekcje dęte</strong> (5 saksofonów, 4 puzony, 4 trąbki) przerzucają się gęstymi akordowymi blokami (np. <em>Drop-2 voicings</em>) w energetycznym dialogu.",
        demos: [
          { label: "Jazzowy akord sekcji dętej", style: "brass", notes: "Bb2,Ab3,C4,D4,G4", dur: 1.7, step: 0 }
        ]
      },
      {
        name: "Współczesny zespół pop, rock i funk",
        tag: "Skupione pasma brzmieniowe",
        tagClass: "tag-peach",
        range: "Od subbasowego fundamentu po powietrze wokalu",
        tuning: "Zazębiony „pocket” między stopą a basem",
        role: "Nośny groove, wyraziste riffy i miejsce na wokal",
        desc: "<strong>Stopa + gitara basowa (lub 808)</strong> zazębiają się w niskim „pocket” (40–250 Hz). <strong>Werbel i hi-hat</strong> definiują ramę rytmiczną. <strong>Gitary, klawisze i syntezatory</strong> wypełniają środek (300 Hz – 3 kHz), zostawiając w zwrotkach otwarte okno dla <strong>głównego wokalu</strong> (1–4 kHz).",
        demos: [
          { label: "Voicing zespołu (bas + klawisze)", style: "piano", notes: "A2,E3,G3,B3,C#4", dur: 1.6, step: 110 }
        ]
      }
    ]
  }
};

function renderInstrumentModuleHTML_PL(refKey) {
  const mod = INSTRUMENT_MODULES_PL[refKey];
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
        <span class="k-ratio-chip">${item.role.split(" •")[0].split(" (")[0]}</span>
      </div>
      <h4>${item.name}</h4>
      <div class="inst-meta-row">
        <span class="inst-meta-pill">Skala: ${item.range}</span>
        <span class="inst-meta-pill">${item.tuning}</span>
      </div>
      <p><strong>Rola:</strong> ${item.role}</p>
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
        <span class="k-card-tag tag-lilac">Praktyka i niuanse brzmienia</span>
        <span class="k-ratio-chip">Pogłębienie</span>
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

const MODES_ENCYCLOPEDIA_PL = [
  {
    id: "lydian",
    name: "Lidyjski",
    family: "major",
    familyLabel: "Rodzina dur",
    brightness: "1 / 7 • Świetlisty i zawieszony",
    badgeClass: "badge-peach",
    rootLabel: "C",
    stammton: "4. modus gamy durowej (jak C-dur grane od dźwięku F)",
    formula: "1 · 2 · 3 · #4 · 5 · 6 · 7",
    steps: "C – C – C – P – C – C – P",
    charNote: "Podwyższona (zwiększona) kwarta (#4, np. Fis w C)",
    vamp: "I – II (C – D)",
    desc: "Najjaśniejszy ze wszystkich siedmiu trybów diatonicznych. Podwyższenie 4. stopnia na #4 znosi klasyczne półtonowe tarcie z tercją wielką — dając lidyjskiemu brzmieniu unoszący się, marzycielski i filmowy charakter.",
    usage: "<strong>W muzyce:</strong> Ulubieniec kompozytorów filmowych dla scen zachwytu i fantastyki (John Williams <em>E.T.</em>, temat <em>Simpsonów</em>, Danny Elfman), wirtuozów gitary (Joe Satriani, Steve Vai) oraz jazzmanów nad akordami Maj7(#11).",
    notes: "C4,D4,E4,F#4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4", "B4"], ["D3", "F#4", "A4", "C5"]]
  },
  {
    id: "ionian",
    name: "Joński (Dur naturalny)",
    family: "major",
    familyLabel: "Rodzina dur",
    brightness: "2 / 7 • Równowaga i przejrzystość",
    badgeClass: "badge-sage",
    rootLabel: "C",
    stammton: "1. stopień — nasza codzienna gama durowa (C-dur)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · 7",
    steps: "C – C – P – C – C – C – P",
    charNote: "Czysta kwarta (4) + ostry dźwięk prowadzący (7 → 1)",
    vamp: "I – IV – V – I",
    desc: "Klasyczny dur. Tryton między IV a VII stopniem czysto ściąga się do prymy i tercji — dając niezawodną stabilność, jasność i poczucie zakończenia.",
    usage: "<strong>W muzyce:</strong> Fundament zachodniej harmonii funkcyjnej, symfonii klasycznych, pogodnych refrenów popowych i piosenek ludowych wszędzie tam, gdzie króluje radość i klarowność.",
    notes: "C4,D4,E4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4"], ["F3", "A4", "C5"], ["G3", "B4", "D5"], ["C3", "E4", "G4"]]
  },
  {
    id: "mixolydian",
    name: "Miksolidyjski",
    family: "major",
    familyLabel: "Rodzina dur",
    brightness: "3 / 7 • Ziemisty i zadziorny",
    badgeClass: "badge-peach",
    rootLabel: "C",
    stammton: "5. modus gamy durowej (jak C-dur grane od dźwięku G)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · b7",
    steps: "C – C – P – C – C – P – C",
    charNote: "Obniżona (mała) septyma (b7, np. B w skali od C)",
    vamp: "I – bVII (C – B)",
    desc: "Skala durowa, która zamieniła akademicki dźwięk prowadzący na swobodną b7 — od razu dodając bluesowego, zbuntowanego rockowego groovu.",
    usage: "<strong>W muzyce:</strong> Król klasycznego rocka, funku, muzyki celtyckiej i reggae (The Beatles <em>Norwegian Wood</em>, AC/DC, Deep Purple) oraz podstawowy tryb jazzowy dla akordów dominantowych (V7).",
    notes: "C4,D4,E4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "E4", "G4", "Bb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "dorian",
    name: "Dorycki",
    family: "minor",
    familyLabel: "Rodzina moll",
    brightness: "4 / 7 • Aksamitny i groovujący",
    badgeClass: "badge-lilac",
    rootLabel: "C",
    stammton: "2. modus gamy durowej (jak C-dur grane od dźwięku D)",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · b7",
    steps: "C – P – C – C – C – P – C",
    charNote: "Podwyższony wielki VI stopień w molu (♮6, np. A w C-doryckiej)",
    vamp: "i – IV (Cm – F)",
    desc: "Dokładnie pośrodku skali jasności: tercja mała i mała septyma rozjaśnione ciepłą wielką sekstą (♮6). Stylowy, elegancki, bez ciężkiego patosu — czysty ruch naprzód.",
    usage: "<strong>W muzyce:</strong> Niekwestionowany mistrz funku, soulu, jazzu modalnego, rocka progresywnego oraz melodii ludowych (Miles Davis <em>So What</em>, Santana <em>Oye Como Va</em>, Daft Punk <em>Get Lucky</em>, Pink Floyd).",
    notes: "C4,D4,Eb4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4", "Bb4"], ["F3", "A4", "C5"]]
  },
  {
    id: "aeolian",
    name: "Eolski (Moll naturalny)",
    family: "minor",
    familyLabel: "Rodzina moll",
    brightness: "5 / 7 • Głęboki i liryczny",
    badgeClass: "badge-sage",
    rootLabel: "C",
    stammton: "6. modus gamy durowej (jak C-dur grane od dźwięku A)",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · b7",
    steps: "C – P – C – C – P – C – C",
    charNote: "Seksta mała (b6, np. As) + septyma mała (b7)",
    vamp: "i – bVI – bVII (Cm – As – B)",
    desc: "Naturalna skala molowa. Obniżenie VI stopnia do b6 zaledwie o półton nad kwintą daje szlachetną głębię, dramatyzm i szczerą liryczną zadumę.",
    usage: "<strong>W muzyce:</strong> Wszechobecna w balladach rockowych, hitach pop (Adele, <em>All Along the Watchtower</em>), R&B i zwiastunach filmowych. W przeciwieństwie do jasnej doryckiej ♮6, eolska b6 miękko opada wzdychając do kwinty.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Ab3", "C4", "Eb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "phrygian",
    name: "Frygijski",
    family: "minor",
    familyLabel: "Rodzina moll",
    brightness: "6 / 7 • Mroczny i egzotyczny",
    badgeClass: "badge-lilac",
    rootLabel: "C",
    stammton: "3. modus gamy durowej (jak C-dur grane od dźwięku E)",
    formula: "1 · b2 · b3 · 4 · 5 · b6 · b7",
    steps: "P – C – C – C – P – C – C",
    charNote: "Sekunda mała zaraz nad toniką (b2, np. Des → C)",
    vamp: "i – bII (Cm – Des)",
    desc: "Ostry półton położony tuż nad dźwiękiem podstawowym błyskawicznie wprowadza klimat tajemnicy i hiszpańsko-bliskowschodniego żaru. Ta b2 przyciąga jak magnes z powrotem do toniki.",
    usage: "<strong>W muzyce:</strong> Dusza hiszpańskiego flamenco (z tercją wielką tworzy <em>skalę frygijską dominantową</em>), ciężki metal i djent (Metallica), mroczne bity trap oraz trzymające w napięciu thrillery.",
    notes: "C4,Db4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "locrian",
    name: "Lokrycki",
    family: "minor",
    familyLabel: "Rodzina moll",
    brightness: "7 / 7 • Zmniejszony i niestabilny",
    badgeClass: "badge-lilac",
    rootLabel: "C",
    stammton: "7. modus gamy durowej (jak C-dur grane od dźwięku H)",
    formula: "1 · b2 · b3 · 4 · b5 · b6 · b7",
    steps: "P – C – C – P – C – C – C",
    charNote: "Kwinta zmniejszona (b5, np. Ges) + b2",
    vamp: "i° – bII (Cm7b5 – Des)",
    desc: "Jedyna skala diatoniczna pozbawiona stabilnej kwinty czystej nad toniką. Sam akord toniki jest zmniejszony lub półzmniejszony (m7b5), dając wrażenie braku gruntu pod stopami.",
    usage: "<strong>W muzyce:</strong> Rzadko spotykana jako samodzielna tonacja całego utworu (jak klimat <em>Army of Me</em> Björk lub prog-metal), lecz niezastąpiona w jazzie nad akordami półzmniejszonymi (ii°7 w molowym ii–V–i) i w kinie grozy.",
    notes: "C4,Db4,Eb4,F4,Gb4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "Gb4", "Bb4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "harmonic-minor",
    name: "Moll harmoniczny (Wariant bonusowy)",
    family: "variant",
    familyLabel: "Odmiana mola",
    brightness: "Dramatyczny • Klasyka, neoklasyka i Orient",
    badgeClass: "badge-peach",
    rootLabel: "C",
    stammton: "Moll naturalny z podwyższonym VII stopniem prowadzącym (#7)",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · #7",
    steps: "C – P – C – C – P – 1½ – P",
    charNote: "Durowy dźwięk prowadzący (7) + sekunda zwiększona (b6 → 7, aż 3 półtony!)",
    vamp: "i – V7 (Cm – G7)",
    desc: "Łączy tęskną b6 mola naturalnego z ostrym dźwiękiem prowadzącym (7). Między nimi otwiera się dramatyczny skok półtoratonowy (b6 → 7), od razu budząc skojarzenia z barokiem, tangiem czy muzyką Bliskiego Wschodu.",
    usage: "<strong>W muzyce:</strong> Dał molowi prawdziwą durową dominantę V7 (Bach, Mozart, flamenco, metal neoklasyczny jak Yngwie Malmsteen). Jego 5. stopień tworzy słynną <em>skalę frygijską dominantową</em>.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,B4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["G3", "B4", "D5", "F5"]]
  },
  {
    id: "melodic-minor",
    name: "Moll melodyczny (Moll jazzowy)",
    family: "variant",
    familyLabel: "Odmiana mola",
    brightness: "Gładki • Film noir, modern jazz i fusion",
    badgeClass: "badge-sage",
    rootLabel: "C",
    stammton: "Prawie jak dur, tylko z obniżoną tercją (b3)",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · 7",
    steps: "C – P – C – C – C – C – P",
    charNote: "Mała tercja b3 zestawiona z wysokimi ♮6 i 7",
    vamp: "imMaj7 – IV7 (CmMaj7 – F7)",
    desc: "Powstał historycznie w ruchu w górę, aby wygładzić duży skok mola harmonicznego (w klasyce przy zejściu w dół często wracał do odmiany naturalnej). Współczesny jazz używa podwyższonej formy w obie strony jako niezależnej skali.",
    usage: "<strong>W muzyce:</strong> Tajemnicze brzmienie kina noir (mMaj7) oraz skala-matka dla takich gwiazd jazzu jak tryb lidyjsko-dominantowy (4. stopień) i skala alterowana (7. stopień).",
    notes: "C4,D4,Eb4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "Eb4", "G4", "B4"], ["F3", "A4", "C5", "Eb5"]]
  }
];

function renderModesReferenceHTML_PL(familyFilter = "all") {
  const list = familyFilter === "all"
    ? MODES_ENCYCLOPEDIA_PL
    : MODES_ENCYCLOPEDIA_PL.filter(m => m.family === familyFilter);

  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Główna zasada</span>
        <span class="k-ratio-chip">Relatywnie vs. równolegle</span>
      </div>
      <h4>Czym są tryby (skale kościelne / modalne)?</h4>
      <p>
        <strong>Modus (tryb)</strong> powstaje wtedy, gdy bierzesz dokładnie ten sam zestaw dźwięków, lecz przenosisz środek ciężkości (<strong>tonikę</strong>) na inną nutę. Na samych białych klawiszach (materiale C-dur) każdy inny punkt startu daje inny układ całych tonów i półtonów: zacznij od <code>D</code> — dostaniesz <em>dorycką</em>, od <code>E</code> — <em>frygijską</em>, od <code>F</code> — <em>lidyjską</em>, od <code>G</code> — <em>miksolidyjską</em>, od <code>A</code> — <em>eolską</em>, od <code>H</code> — <em>lokrycką</em>.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>1. Podejście relatywne (Te same klawisze)</h5>
          <p>Wygodne na klawiaturze: „D-dorycka używa tych samych białych klawiszy co C-dur”. Dla ucha bywa jednak zwodnicze, bo pamięć nadal ściąga do C jako domu.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>2. Podejście równoległe (Wspólna tonika!)</h5>
          <p><strong>Klucz do kształcenia słuchu:</strong> zagraj wszystkie 7 skal od dźwięku <code>C</code>! Wtedy jedna nuta charakterystyczna natychmiast zdradza nastrój (np. <code>C → Fis</code> = lidyjska, <code>C → B</code> = miksolidyjska).</p>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">Spektrum jasności skal</span>
        <span class="k-ratio-chip">Jasna → ciemna</span>
      </div>
      <h4>Uporządkowane według jasności (wzdłuż koła kwintowego)</h4>
      <p>
        Ułóż 7 trybów od najbardziej świetlistego do najciemniejszego zamiast kolejności stopni 1–7 — każdy kolejny krok obniża dokładnie <strong>jeden dźwięk o półton</strong>, krok po kroku jak koło kwintowe:
      </p>
      <div class="mode-spectrum-strip">
        <span class="mode-spec-chip is-bright">1. Lidyjski (#4)</span>
        <span class="mode-spec-chip">2. Joński</span>
        <span class="mode-spec-chip">3. Miksolidyjski (b7)</span>
        <span class="mode-spec-chip">4. Dorycki (b3, b7)</span>
        <span class="mode-spec-chip">5. Eolski (+b6)</span>
        <span class="mode-spec-chip">6. Frygijski (+b2)</span>
        <span class="mode-spec-chip is-dark">7. Lokrycki (+b5)</span>
      </div>
    </article>

    <div class="k-filter-row" aria-label="Filtruj tryby">
      <button class="k-filter-pill ${familyFilter === "all" ? "active" : ""}" data-mfilter="all">Wszystkie (9)</button>
      <button class="k-filter-pill ${familyFilter === "major" ? "active" : ""}" data-mfilter="major">Durowe (3)</button>
      <button class="k-filter-pill ${familyFilter === "minor" ? "active" : ""}" data-mfilter="minor">Molowe (4)</button>
      <button class="k-filter-pill ${familyFilter === "variant" ? "active" : ""}" data-mfilter="variant">Odmiany moll (2)</button>
    </div>

    <div class="knowledge-list">
      ${list.map(m => `
        <article class="knowledge-card">
          <div class="k-card-top-row">
            <span class="k-card-tag ${m.family === "major" ? "tag-peach" : m.family === "variant" ? "tag-sage" : "tag-lilac"}">${m.familyLabel} • ${m.brightness}</span>
            <span class="k-ratio-chip">${m.formula}</span>
          </div>
          <h4>${m.name} (przykład od ${m.rootLabel})</h4>
          <p class="k-char">${m.stammton}</p>
          <p><strong>Dźwięk charakterystyczny:</strong> ${m.charNote}<br><strong>Budowa kroków (C/P):</strong> <code>${m.steps}</code></p>
          <p>${m.desc}</p>
          <p>${m.usage}</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-mode-scale="${m.id}">▶ Skala (${m.rootLabel})</button>
            <button class="btn-tool" data-play-mode-vamp="${m.id}">▶ Zwrot akordowy: ${m.vamp}</button>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

const KEYS_CIRCLE_DATA_PL = [
  {
    id: "key-0",
    group: "neutral",
    sigBadge: "0 znaków",
    majorName: "C-dur",
    minorName: "a-moll",
    rootMidi: 60,
    minorMidi: 57,
    accidentalList: "Brak krzyżyków i bemoli (tylko białe klawisze)",
    chords: "I C · ii Dm · iii Em · IV F · V G · vi Am",
    instrumentTip: "Klasyczny punkt wyjścia na fortepianie, flecie prostym i w chórze"
  },
  {
    id: "key-1s",
    group: "sharp",
    sigBadge: "1 ♯",
    majorName: "G-dur",
    minorName: "e-moll",
    rootMidi: 55,
    minorMidi: 52,
    accidentalList: "1♯: Fis (dźwięk prowadzący do G)",
    chords: "I G · ii Am · iii Hm · IV C · V D · vi Em",
    instrumentTip: "Ulubiona tonacja smyczkowców (puste struny G/D/A/E) i gitary akustycznej"
  },
  {
    id: "key-2s",
    group: "sharp",
    sigBadge: "2 ♯",
    majorName: "D-dur",
    minorName: "h-moll",
    rootMidi: 62,
    minorMidi: 59,
    accidentalList: "2♯: Fis, Cis",
    chords: "I D · ii Em · iii F#m · IV G · V A · vi Hm",
    instrumentTip: "Lśniąca, uroczysta tonacja orkiestrowa (trąbki barokowe, skrzypce, wiolonczela)"
  },
  {
    id: "key-3s",
    group: "sharp",
    sigBadge: "3 ♯",
    majorName: "A-dur",
    minorName: "fis-moll",
    rootMidi: 57,
    minorMidi: 54,
    accidentalList: "3♯: Fis, Cis, Gis",
    chords: "I A · ii Hm · iii C#m · IV D · V E · vi F#m",
    instrumentTip: "Otwarta, nośna i wygodna na gitarze oraz smyczkach"
  },
  {
    id: "key-4s",
    group: "sharp",
    sigBadge: "4 ♯",
    majorName: "E-dur",
    minorName: "cis-moll",
    rootMidi: 64,
    minorMidi: 61,
    accidentalList: "4♯: Fis, Cis, Gis, Dis",
    chords: "I E · ii F#m · iii G#m · IV A · V H · vi C#m",
    instrumentTip: "Domowa tonacja gitary elektrycznej, bluesa i klasycznego rocka (pusta basowa struna E)"
  },
  {
    id: "key-5s",
    group: "sharp",
    sigBadge: "5 ♯ / 7 ♭",
    majorName: "H-dur (= Ces-dur)",
    minorName: "gis-moll (= as-moll)",
    rootMidi: 59,
    minorMidi: 56,
    accidentalList: "5♯: Fis, Cis, Gis, Dis, Ais (enharmonicznie Ces-dur z 7♭)",
    chords: "I H · ii C#m · iii D#m · IV E · V Fis · vi G#m",
    instrumentTip: "Zaskakująco wygodna pod palcami na fortepianie — angażuje wszystkie 5 czarnych klawiszy"
  },
  {
    id: "key-6",
    group: "sharp",
    sigBadge: "6 ♯ / 6 ♭",
    majorName: "Fis-dur / Ges-dur",
    minorName: "dis-moll / es-moll",
    rootMidi: 54,
    minorMidi: 51,
    accidentalList: "6♯ (Fis, Cis, Gis, Dis, Ais, Eis) albo 6♭ (B, Es, As, Des, Ges, Ces)",
    chords: "I Fis/Ges · ii G#m/Asm · IV H/Ces · V Cis/Des · vi D#m/Esm",
    instrumentTip: "Dokładnie naprzeciw C-dur na kole (biegun trytonu!). Skrzyżowanie enharmoniczne"
  },
  {
    id: "key-5f",
    group: "flat",
    sigBadge: "5 ♭ / 7 ♯",
    majorName: "Des-dur (= Cis-dur)",
    minorName: "b-moll (= ais-moll)",
    rootMidi: 61,
    minorMidi: 58,
    accidentalList: "5♭: B, Es, As, Des, Ges (enharmonicznie Cis-dur z 7♯)",
    chords: "I Des · ii Esm · iii Fm · IV Ges · V As · vi Bm",
    instrumentTip: "Ulubiona tonacja romantycznych pianistów, soulu i ballad jazzowych"
  },
  {
    id: "key-4f",
    group: "flat",
    sigBadge: "4 ♭",
    majorName: "As-dur",
    minorName: "f-moll",
    rootMidi: 56,
    minorMidi: 53,
    accidentalList: "4♭: B, Es, As, Des",
    chords: "I As · ii Bm · iii Cm · IV Des · V Es · vi Fm",
    instrumentTip: "Częsta w standardach jazzowych, orkiestrach dętych i R&B"
  },
  {
    id: "key-3f",
    group: "flat",
    sigBadge: "3 ♭",
    majorName: "Es-dur",
    minorName: "c-moll",
    rootMidi: 63,
    minorMidi: 60,
    accidentalList: "3♭: B, Es, As",
    chords: "I Es · ii Fm · iii Gm · IV As · V B · vi Cm",
    instrumentTip: "Heroiczna tonacja symfoniczna (Eroica Beethovena); ulubiona dla saksofonów altowych i dętych blaszanych"
  },
  {
    id: "key-2f",
    group: "flat",
    sigBadge: "2 ♭",
    majorName: "B-dur",
    minorName: "g-moll",
    rootMidi: 58,
    minorMidi: 55,
    accidentalList: "2♭: B, Es",
    chords: "I B · ii Cm · iii Dm · IV Es · V F · vi Gm",
    instrumentTip: "Podstawowa tonacja big-bandów, trąbek, klarnetów i modern jazzu w stroju B"
  },
  {
    id: "key-1f",
    group: "flat",
    sigBadge: "1 ♭",
    majorName: "F-dur",
    minorName: "d-moll",
    rootMidi: 53,
    minorMidi: 62,
    accidentalList: "1♭: B (czyste H obniżone o półton do B)",
    chords: "I F · ii Gm · iii Am · IV B · V C · vi Dm",
    instrumentTip: "Ciepła, pastoralna barwa; bardzo wygodna dla waltorni, fletów i chórów"
  }
];

function renderKeysReferenceHTML_PL(circleFilter = "all") {
  const list = circleFilter === "all"
    ? KEYS_CIRCLE_DATA_PL
    : KEYS_CIRCLE_DATA_PL.filter(k => k.group === circleFilter);

  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Główna idea</span>
        <span class="k-ratio-chip">Tonacja i znaki przykluczowe</span>
      </div>
      <h4>Gama vs. tonacja: co właściwie tworzy tonację?</h4>
      <p>
        <strong>Gama</strong> to po prostu dźwięki ułożone po kolei (np. C–D–E–F–G–A–H–C). <strong>Tonacja</strong> opisuje cały <em>układ sił przyciągania</em> wokół głównego tonu: wyznacza punkt spoczynku (<strong>Tonikę</strong>), tryb (jasny <strong>dur</strong> lub głęboki <strong>moll</strong>) oraz to, które dźwięki są stale podwyższone (♯) lub obniżone (♭) przez <strong>znaki przykluczowe</strong>.
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Dlaczego potrzebujemy znaków przykluczowych?</strong>
          Każdy dur wymaga tego samego wzoru kroków: <code>C – C – P – C – C – C – P</code> (półtony między III–IV i VII–VIII). Przenieś skalę z C do <code>G</code>, a VII stopień (<code>F</code>) okaże się za niski — trzeba podnieść go do <code>Fis</code>, by zachować ostry dźwięk prowadzący.
        </div>
        <div class="physics-fact-item">
          <strong>Znaki przykluczowe vs. przygodne</strong>
          <strong>Znaki przykluczowe</strong> stoją tuż za kluczem i obowiązują przez cały utwór (we wszystkich oktawach). <strong>Znak przygodny</strong> (przed konkretną nutą w takcie) działa tylko do najbliższej kreski taktowej dla chwilowego koloru.
        </div>
      </div>
    </article>

    <div class="k-sibling-bar">
      <span><strong>Odkrywaj oczami i uszami:</strong> Otwórz interaktywne Koło kwintowe z akordami i modulacjami na żywo.</span>
      <button type="button" class="btn-tool" data-jump-ref="circle-of-fifths">Otwórz Koło kwintowe →</button>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Logika koła kwintowego</span>
        <span class="k-ratio-chip">3:2 → 12 centrów</span>
      </div>
      <h4>Dlaczego wszystkie 12 tonacji układają się w zegarową tarczę</h4>
      <p>
        Tuż po oktawie (2:1) najbliższą relacją jest <strong>kwinta czysta (3:2)</strong>. Idź zgodnie z ruchem wskazówek zegara kwintami w górę (<code>C → G → D → A → E → H → Fis</code>) — każdy krok dodaje jeden <strong>krzyżyk (♯)</strong>. Idź przeciwnie do wskazówek kwartami w górę (<code>C → F → B → Es → As → Des → Ges</code>) — co krok dochodzi jeden <strong>bemol (♭)</strong>.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>W prawo: tonacje krzyżykowe (♯)</h5>
          <p><strong>Durowe:</strong> <em>G, D, A, E, H, Fis</em>.<br><strong>Kolejność krzyżyków:</strong> <code>Fis – Cis – Gis – Dis – Ais – Eis</code> (każdy nowy krzyżyk to dokładnie VII dźwięk prowadzący nowej tonacji!).</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>W lewo: tonacje bemolowe (♭)</h5>
          <p><strong>Durowe:</strong> <em>F, B, Es, As, Des, Ges</em>.<br><strong>Kolejność bemoli:</strong> <code>B – Es – As – Des – Ges – Ces</code> (lustrzanie wspak!). Trik: <strong>przedostatni bemol</strong> nazywa tonikę durową.</p>
        </div>
      </div>
      <p class="k-tip"><strong>Komat pitagorejski i enharmonia:</strong> 12 czystych kwint 3:2 przekracza 7 oktaw o ~23,5 centa (<em>komat pitagorejski</em>). Współczesny <strong>strój równomiernie temperowany</strong> rozdziela tę różnicę po równo między wszystkie kroki, dzięki czemu <code>Fis-dur</code> (6♯) i <code>Ges-dur</code> (6♭) lądują dokładnie na tych samych klawiszach.</p>
    </article>

    <div class="section-heading-row">
      <h2 class="section-heading">3. Pełny atlas 12 tonacji</h2>
    </div>

    <div class="k-filter-row" aria-label="Filtruj tonacje według znaków">
      <button class="k-filter-pill ${circleFilter === "all" ? "active" : ""}" data-kfilter="all">Wszystkie 12 tonacji</button>
      <button class="k-filter-pill ${circleFilter === "neutral" ? "active" : ""}" data-kfilter="neutral">C / a (0 znaków)</button>
      <button class="k-filter-pill ${circleFilter === "sharp" ? "active" : ""}" data-kfilter="sharp">Krzyżyki (♯)</button>
      <button class="k-filter-pill ${circleFilter === "flat" ? "active" : ""}" data-kfilter="flat">Bemole (♭)</button>
    </div>

    <div class="knowledge-list">
      ${list.map(k => `
        <article class="knowledge-card">
          <div class="k-card-top-row">
            <span class="k-card-tag ${k.group === "sharp" ? "tag-peach" : k.group === "flat" ? "tag-lilac" : "tag-sage"}">${k.sigBadge}</span>
            <span class="k-ratio-chip">${k.majorName} / ${k.minorName}</span>
          </div>
          <h4>${k.majorName} i równoległa ${k.minorName}</h4>
          <p><strong>Znaki przykluczowe:</strong> ${k.accidentalList}</p>
          <p><strong>Trójdźwięki diatoniczne:</strong> <code>${k.chords}</code></p>
          <p class="k-tip">${k.instrumentTip}</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-key-cadence="${k.rootMidi}" data-key-mode="major">▶ Kadencja ${k.majorName}</button>
            <button class="btn-tool" data-play-key-cadence="${k.minorMidi}" data-key-mode="minor">▶ ${k.minorName}</button>
          </div>
        </article>
      `).join("")}
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. Trzy odmiany skali molowej</span>
        <span class="k-ratio-chip">Dlaczego moll ma 3 gamy</span>
      </div>
      <h4>Moll naturalny, harmoniczny i melodyczny (na przykładzie a-moll)</h4>
      <p>
        Trybowi durowemu wystarcza jedna postać, a molowy ma trzy odmiany, ponieważ w molu naturalnym brakuje ostrego półtonowego dźwięku prowadzącego do toniki (<code>g → a</code> to cały ton, nie półton <code>gis → a</code>):
      </p>
      <ul class="k-physics-list">
        <li><strong>Moll naturalny (eolski):</strong> Dziedziczy znaki po równoległym dur (<code>A–H–C–D–E–F–G–A</code>). Spokojny, ludowy, przejrzysty.</li>
        <li><strong>Moll harmoniczny:</strong> Podwyższa VII stopień (<code>G → Gis</code>), aby akord V stał się mocną <strong>durową dominantą (E7)</strong>. Między <code>F</code> i <code>Gis</code> powstaje przy tym egzotyczny skok o 3 półtony.</li>
        <li><strong>Moll melodyczny:</strong> Wygładza ten skok dla śpiewnej kantyleny i linii basu, podnosząc w ruchu w górę również VI stopień (<code>F → Fis, G → Gis</code>); w klasyce przy zejściu w dół wraca do naturalnego, w jazzie brzmi tak samo w obie strony.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G4,A4" data-dur="0.45" data-step="320">▶ a-moll naturalny</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G#4,A4" data-dur="0.45" data-step="320">▶ a-moll harmoniczny</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F#4,G#4,A4" data-dur="0.45" data-step="320">▶ a-moll melodyczny</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Pokrewieństwo tonacji i modulacje</span>
        <span class="k-ratio-chip">Zmiana centrum</span>
      </div>
      <h4>Jak tonacje łączą się i płynnie przechodzą jedna w drugą</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Tonacje równoległe (odstęp tercji małej)</strong>
          Dzielą dokładnie ten sam zestaw dźwięków i znaków: <code>C-dur ↔ a-moll</code>, <code>G-dur ↔ e-moll</code>. Zmiana punktu odniesienia brzmi gładko i naturalnie.
        </div>
        <div class="physics-fact-item">
          <strong>Tonacje jednoimienne (wspólna tonika)</strong>
          Trzymają ten sam dźwięk główny, zmieniając tryb dur na moll lub odwrotnie: <code>C-dur ↔ c-moll</code> (różnica 3 bemoli!). Dają wyraziste kontrasty (jak jasna tercja pikardyjska).
        </div>
        <div class="physics-fact-item">
          <strong>Bliskie pokrewieństwo (sąsiedzi na kole)</strong>
          Sąsiedzi o jeden krok w lewo lub w prawo (<code>C ↔ G</code> lub <code>F</code>) różnią się zaledwie jedną nutą. Wspólne akordy (np. <code>Am</code>) stają się niewyczuwalnym mostem modulacji.
        </div>
        <div class="physics-fact-item">
          <strong>Mediantowy przeskok i podniesienie o półton/ton</strong>
          Skok o tercję (<code>C → As</code> lub <code>E</code>) od razu wnosi filmowy efekt — a bezpośrednie podniesienie o półton lub cały ton w finałowym refrenie dodaje potężnej energii.
        </div>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-custom="key-variant">▶ Jednoimienne C ↔ Cm</button>
        <button class="btn-tool" data-play-custom="key-mediant">▶ Zwrot mediantowy C → As → C</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">6. Instrumenty transponujące i charakter</span>
        <span class="k-ratio-chip">Praktyka orkiestrowa</span>
      </div>
      <h4>Dlaczego dęte w partyturze mają inne znaki przykluczowe niż fortepian</h4>
      <p>
        Podczas gdy fortepian, gitara, smyczki i flet czytają w <strong>stroju rzeczywistym (w C)</strong>, wiele instrumentów dętych transponuje zapis, aby chwyty palcowe pozostawały takie same niezależnie od wielkości instrumentu:
      </p>
      <ul class="k-physics-list">
        <li><strong>Instrumenty w B (trąbka, klarnet, saksofon tenorowy):</strong> Zapisane <code>C</code> brzmi w rzeczywistości jak <code>B</code> (sekundę wielką niżej). Gdy zespół gra w <code>B-dur (2♭)</code>, trąbka czyta czyste <code>C-dur (0 znaków)</code>!</li>
        <li><strong>Instrumenty w Es (saksofon altowy, saksofon barytonowy):</strong> Zapisane <code>C</code> brzmi jak <code>Es</code> (sekstę wielką niżej). Gdy zespół gra w <code>Es-dur (3♭)</code>, saksofon altowy czyta spokojnie białe <code>C-dur</code>.</li>
        <li><strong>Instrumenty w F (waltornia, rożek angielski):</strong> Zapisane <code>C</code> brzmi o kwintę czystą niżej, jako <code>F</code>.</li>
      </ul>
      <p class="k-tip"><strong>„Charakter” tonacji:</strong> Przed strojem równomiernie temperowanym nierówne odstępy nadawały każdej tonacji własny smak (łagodne <em>Des-dur</em>, świąteczne <em>D-dur</em>). Dziś matematyka wszystkich 12 jest identyczna — lecz prawdziwe instrumenty wciąż barwią każdą tonację pustymi strunami, rezonansem czary i rejestrem głosu.</p>
    </article>
  `;
}

function renderSingAndPlayReferenceHTML_PL() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">1. Dlaczego rozjeżdża się koordynacja</span>
        <span class="k-ratio-chip">Autopilot i skupienie</span>
      </div>
      <h4>Dlaczego granie i śpiewanie naraz bywa na początku tak trudne</h4>
      <p>
        Kiedy grasz i śpiewasz jednocześnie, dwa zupełnie różne układy dzielą ten sam czas: <strong>ręce</strong> (pamięć ruchowa, chwyty akordów, bicie) oraz <strong>głos</strong> (oddech, intonacja, tekst). Pamięć robocza mózgu nie potrafi świadomie kontrolować dwóch <em>nowych</em> czynności jednocześnie.
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Przełącz przynajmniej ręce na autopilota</strong>
          Jeśli głos i dłonie sobie przeszkadzają, mózg wciąż pilnuje obu naraz. Rozwiązanie: doprowadź akompaniament (lub linię wokalną) do nawyku równie swobodnego jak chodzenie po schodach.
        </div>
        <div class="physics-fact-item">
          <strong>Opanuj rytm przed dźwiękami</strong>
          90% zacięć wynika z rytmu, nie ze złych dźwięków! Gdy sylaba tekstu wypada pomiędzy uderzeniami ręki, dłoń zatrzymuje się odruchowo — dopóki oba rytmy nie zazębią się w czasie.
        </div>
        <div class="physics-fact-item">
          <strong>Nuć na „La” albo „Du” na start</strong>
          Przypominanie sobie słów pożera mnóstwo uwagi. Prześpiewanie melodii na jednej neutralnej sylabie uwalnia głowę dla stroju i groovu.
        </div>
        <div class="physics-fact-item">
          <strong>Jeden wspólny wewnętrzny metronom</strong>
          Niech równe przytupywanie stopą wyznacza prawo — ani głos nie goni rąk, ani ręce nie czekają na głos: <em>oboje</em> podążają za wspólnym pulsem.
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Skuteczny plan 5 kroków</span>
        <span class="k-ratio-chip">Metoda krok po kroku</span>
      </div>
      <h4>Sprawdzony schemat 5 kroków do każdego utworu</h4>
      <p>
        Zamiast zaczynać wciąż od początku i potykać się zawsze na tej samej zwrotce, rozbij koordynację na pięć konkretnych etapów:
      </p>
      <ul class="article-steps-list">
        <li>
          <strong>1. Test rozmowy (zautomatyzuj ręce):</strong> Zapętl akordy lub bicie na 1–2 minuty i spróbuj jednocześnie liczyć głośno do 20 albo rozmawiać. Jeśli dłonie się plączą — poświęć im jeszcze 5 minut solo.
        </li>
        <li>
          <strong>2. Mów tekst ściśle w rytmie:</strong> Graj akompaniament i <strong>wyraźnie wymawiaj słowa w rytmie</strong> piosenki bez melodii (na jednym wygodnym dźwięku). Bez melodii błyskawicznie poczujesz, które sylaby padają na miarę, a które między uderzeniami.
        </li>
        <li>
          <strong>3. Zaznacz fizyczne punkty styku:</strong> Wyznacz konkretne kotwice: <em>„Bas lewej ręki wchodzi równo na słowo noc”</em> albo <em>„słowo wiatr trafia na ruch kostką w górę między 2 a 3”</em>. Mózg momentalnie porządkuje się wokół takich punktów!
        </li>
        <li>
          <strong>4. Uprość akompaniament i zapętl 1–2 takty:</strong> Najpierw zagraj dokładnie <strong>jedno uderzenie na „raz”</strong> w takcie i śpiewaj swobodnie powyżej. Następnie dodaj trzecią miarę, a na końcu pełne bicie lub arpeggio — zawsze w krótkich pętlach 1–2 taktów!
        </li>
        <li>
          <strong>5. Zwolnienie (60%) i „śpiew w myślach”:</strong> Zmniejsz tempo niemal o połowę. Na trudnych wejściach przedtaktowych zaśpiewaj melodię bezgłośnie w głowie przy akompaniamencie, potem zanuć po cichu, a dopiero potem zaśpiewaj pełnym głosem.
        </li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">3. Codzienne ćwiczenia na niezależność</span>
        <span class="k-ratio-chip">Wypróbuj od razu</span>
      </div>
      <h4>6 celowanych ćwiczeń na zgranie głosu i rąk</h4>
      <p>
        Wystarczy 5–8 minut jednego z tych ćwiczeń przed nauką piosenek, by zdobyć swobodę wielokrotnie szybciej niż przez mechaniczne powtarzanie:
      </p>
      <ul class="k-physics-list">
        <li>
          <strong>Ćwiczenie 1 — Test rozmowy i liczenia:</strong> Graj równą progresję czterech akordów (<code>I – V – vi – IV</code>) biciem gitarowym lub na pianinie, równocześnie czytając na głos akapit lub licząc wstecz od 20 do 1. Zasada: groove nie może drgnąć ani na milimetr.
        </li>
        <li>
          <strong>Ćwiczenie 2 — Kotwica na pierwszą miarę:</strong> Uderzaj każdy akord tylko raz na „raz” (wybrzmiewając przez cały takt) i śpiewaj zwrotkę nad otwartym brzmieniem. Ćwiczy frazowanie, oddech i płynną zmianę akordów bez pośpiechu.
        </li>
        <li>
          <strong>Ćwiczenie 3 — Intonacja nad burdonem:</strong> Trzymaj na instrumencie pustą kwintę bazową (<code>C + G</code>) i śpiewaj ponad nią melodie lub interwały. Skutecznie oddziela kontrolę ucha i głosu od ruchów lewej dłoni.
        </li>
        <li>
          <strong>Ćwiczenie 4 — Synkopy i pułapka „4-i”:</strong> W śpiewie pop i soul fraza często wchodzi o pół miary <em>wcześniej</em> (na <code>4-i</code>), podczas gdy gitara lub piano zmienia akord dokładnie na 1. Wystukuj równe ćwierćnuty, zaczynając wokal na „i”.
        </li>
        <li>
          <strong>Ćwiczenie 5 — Ruchomy bas kontra stała nuta:</strong> Graj prostą linię basu (np. <code>C – F – G – C</code>), podczas gdy głos trzyma jedną wspólną nutę (<code>G</code>) — albo odwrotnie: trzymaj jeden statyczny akord i śpiewaj gamy w górę oraz w dół.
        </li>
        <li>
          <strong>Ćwiczenie 6 — 20-sekundowe nagranie telefonem:</strong> Nagraj krótki fragment na dyktafon i od razu odsłuchaj. Świeże ucho natychmiast wychwyci niezauważalne podczas grania przyspieszenia czy urwane miary.
        </li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Ćwiczenie 1: Groove do mówienia</button>
        <button class="btn-tool" data-play-custom="sp-drone">▶ Ćwiczenie 3: Burdon + melodia</button>
        <button class="btn-tool" data-play-custom="sp-syncopation">▶ Ćwiczenie 4: Puls kontra przedtakt</button>
        <button class="btn-tool" data-play-custom="sp-poly">▶ Ćwiczenie 5: Ruchomy bas, stały ton</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. Triki instrumentalne i najczęstsze pułapki</span>
        <span class="k-ratio-chip">Gitara, fortepian i głos</span>
      </div>
      <h4>Wskazówki oszczędzające tygodnie prób</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Gitara: nie zatrzymuj wahadła prawej ręki</strong>
          Prawa ręka to nieprzerwany metronom (<em>W dół – W górę – W dół – W górę</em>). Nawet na pauzach i synkopach wokalnych nie zatrzymuj jej — po prostu machnij nad strunami w powietrzu.
        </div>
        <div class="physics-fact-item">
          <strong>Fortepian: układaj rytmy warstwami</strong>
          Zacznij wyłącznie od <em>basu w lewej ręce na „raz” + śpiew</em>. Potem dodaj spokojne trójdźwięki w prawej na 1 i 3. Gęstsze ósemki i ozdobniki dokładaj na sam koniec.
        </div>
        <div class="physics-fact-item">
          <strong>Śmiało transponuj pod swój głos</strong>
          Walka z niewygodną górą natychmiast rozbija koordynację rąk. Bez wahania załóż <strong>kapodaster</strong> albo zmień tonację o ±2 półtony, by głos płynął swobodnie.
        </div>
        <div class="physics-fact-item">
          <strong>Planuj oddechy jak nuty w takcie</strong>
          Potknięcia zdarzają się najczęściej nie w środku frazy, lecz między zwrotką a refrenem! Zarezerwuj jedną pauzę ćwierćnutową na spokojny wdech przed refrenem, gdy instrument równo gra dalej.
        </div>
      </div>
      <p class="k-tip"><strong>Bonus od Lauscher:</strong> W modułach <strong>Solfeż</strong> i <strong>Melodie</strong> spróbuj najpierw cicho zaśpiewać szukaną nutę na głos <em>zanim</em> naciśniesz klawisz — połączysz słuch, krtań i palce w jeden odruch.</p>
    </article>
  `;
}

function renderCircleOfFifthsTheoryHTML_PL() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Główna idea</span>
        <span class="k-ratio-chip">Kwinta 3:2 • 12 tonacji</span>
      </div>
      <h4>Czym jest Koło kwintowe — i dlaczego się domyka?</h4>
      <p>
        Zaraz po oktawie (<code>2:1</code>) <strong>kwinta czysta (3:2)</strong> jest najsilniejszą relacją akustyczną w muzyce. Jeśli wspinasz się kwintami od <strong>C</strong> (<code>C → G → D → A → E → H → Fis…</code>), w każdym kroku podwyższa się dokładnie jeden dźwięk na nowy dźwięk prowadzący — zgodnie z ruchem zegara przybywa po <strong>jednym krzyżyku (♯)</strong>. Ruch w drugą stronę (kwinty w dół lub <strong>kwarty w górę</strong>: <code>C → F → B → Es → As → Des → Ges</code>) ociepla brzmienie i dodaje po <strong>jednym bemolu (♭)</strong>.
      </p>
      <p>
        Po 12 krokach strój równomiernie temperowany zamyka krąg dokładnie na <strong>godzinie 6 (Fis / Ges)</strong>, gdzie 6 krzyżyków i 6 bemoli trafia w dokładnie te same klawisze (<strong>enharmonia</strong>). Zamiast uczyć się 12 osobnych gam na pamięć, dostajesz jedną przejrzystą mapę!
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>W prawo (+1 ♯) • Kwintami w górę</h5>
          <p><code>C → G → D → A → E → H → Fis</code><br>Brzmienie stopniowo się rozjaśnia. Kolejność krzyżyków: <code>Fis – Cis – Gis – Dis – Ais – Eis</code>.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>W lewo (+1 ♭) • Kwartami w górę</h5>
          <p><code>C → F → B → Es → As → Des → Ges</code><br>Barwa staje się cieplejsza i miększa. Kolejność bemoli idzie dokładnie wspak: <code>B – Es – As – Des – Ges – Ces</code>.</p>
        </div>
      </div>
    </article>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-peach">2. Jak z niego korzystać</span>
            <span class="k-ratio-chip">Logika tarczy</span>
          </div>
          <h4>Jak odczytać Koło kwintowe w 20 sekund</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Pierścień zewnętrzny = Dur, Pierścień wewnętrzny = Moll równoległy:</strong> Każdy sektor łączy tonację durową z jej <strong>mollem równoległym</strong> dokładnie pod nią (<code>C / am</code>, <code>G / em</code>, <code>D / hm</code>…). Dzielą <em>dokładnie ten sam zestaw 7 dźwięków i znaków przykluczowych</em> — moll zaczyna się po prostu od VI stopnia (3 półtony niżej).</li>
          <li><strong>1-sekundowy trik dla krzyżyków:</strong> Spójrz na <em>ostatni krzyżyk</em> przy kluczu i podnieś go o <strong>półton w górę</strong> — otrzymasz tonikę durową! (np. 2 krzyżyki <code>Fis, Cis</code> → półton nad <code>Cis</code> = <strong>D-dur</strong>).</li>
          <li><strong>1-sekundowy trik dla bemoli:</strong> <em>Przedostatni bemol</em> przy kluczu wprost nazywa tonację durową! (np. 3 bemole <code>B, Es, As</code> → przedostatni = <strong>Es-dur</strong>; zapamiętać trzeba tylko jedno wyjątkowe <code>1♭ = F-dur</code>).</li>
          <li><strong>Czytaj Lewo – Środek – Prawo jak mapę drogową:</strong> Wybrany sektor to Twój dom <code>I</code>. Sąsiad po lewej to zawsze <strong>Subdominanta (IV)</strong>, a sąsiad po prawej — zawsze <strong>Dominanta (V)</strong>!</li>
        </ul>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-lilac">3. Dlaczego to supermoc</span>
            <span class="k-ratio-chip">Korzyść w praktyce</span>
          </div>
          <h4>Co poprawia się od razu, gdy zrozumiesz Koło?</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>1. Gotowa mapa akordów na dżemy i piosenki</strong>
            Spójrz na podświetlony 3-sektorowy klin na tarczy: Twoja tonika plus lewy i prawy sąsiad dają <strong>wszystkie 6 głównych akordów diatonicznych</strong> tonacji (<code>IV – I – V</code> na zewnątrz + <code>ii – vi – iii</code> wewnątrz)! Tysiące hitów mieszczą się w tym jednym wycinku.
          </div>
          <div class="physics-fact-item">
            <strong>2. Błyskawiczna transpozycja i kapodaster</strong>
            Za wysoko do śpiewania? Obróć cały 3-częściowy klin o jedno pole w lewo lub w prawo — wszystkie relacje zostają bez zmian (<code>I–V–vi–IV</code> w C przenosi się od razu na <code>G–D–Em–C</code> albo <code>F–C–Dm–B</code>).
          </div>
          <div class="physics-fact-item">
            <strong>3. Płynne i dramatyczne modulacje</strong>
            Sąsiednie sektory różnią się <strong>tylko jednym dźwiękiem</strong> (6 wspólnych z 7!), więc zmiana tonacji w mostku brzmi naturalnie. Przeskok na drugi koniec koła (6 kroków / biegun trytonu) wymienia niemal wszystkie dźwięki — efekt filmowego kontrastu.
          </div>
          <div class="physics-fact-item">
            <strong>4. Szybsze granie ze słuchu i czytanie</strong>
            Widzisz, jak klasyczna sekwencja jazzowa i popowa (<code>iii – vi – ii – V – I</code>) kroczy po kole <em>przeciwnie do wskazówek zegara</em> sektor po sektorze? Ucho zaczyna przewidywać ruch basu geometrycznie zamiast zgadywać.
          </div>
        </div>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">4. Praktyka</span>
            <span class="k-ratio-chip">Graj i słuchaj</span>
          </div>
          <h4>4 konkretne sposoby ćwiczenia z Kołem</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Wyjdź poza „tylko C i G”:</strong> Weź dowolny nowy riff, skalę czy kadencję i przesuwaj ją każdego dnia o jeden sektor w prawo (<code>C → G → D → A</code>) albo w lewo przez dęte bemole (<code>F → B → Es → As</code>). W 12 dni opanujesz cały gryf lub klawiaturę.</li>
          <li><strong>Słuchaj sekwencji po kole (<code>vi–ii–V–I</code>):</strong> Odliczaj wstecz do godziny 12: każdy akord staje się małą dominantą ciągnącą do kolejnego sektora! Kliknij poniżej, by poczuć tę grawitację w C-dur.</li>
          <li><strong>Pożyczaj sąsiednią barwę (dominanty wtrącone):</strong> Grając w C-dur przed <code>G (V)</code>, zajrzyj krok w prawo po <code>Fis</code> i zmień molowe <code>ii (Dm)</code> w jasne <strong>D7 (V/V)</strong> prowadzące prosto w G!</li>
          <li><strong>Kontrast ciepłych i jasnych kroków:</strong> Skok w lewo (<code>I → IV → bVII</code>) daje ciepły, soulowy, rozluźniony klimat; krok w prawo (<code>I → V → V/V</code>) wnosi blask i napęd.</li>
        </ul>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-progression="vi,ii,V7,I">▶ Opadanie kwintowe (Am–Dm–G7–C)</button>
          <button class="btn-tool" data-play-progression="I,V/V,V,I">▶ Wzlot w prawo (C–D (V/V)–G–C)</button>
        </div>
      </div>
    </details>
  `;
}

function getIntervalNamingGuideHTML_PL() {
  const isDeNotation = typeof state !== "undefined" ? state?.profile?.intervalNotation !== "intl" : true;
  const sym = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol : k => k;
  const activeLabel = isDeNotation ? "Niemieckie (P / G / k)" : "Międzynarodowe (P / M / m)";
  return `
    <details class="knowledge-card k-accordion" id="intervalNamingGuideAccordion" open>
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">Nazwy i skróty</span>
            <span class="k-ratio-chip">Aktywne: ${activeLabel}</span>
          </div>
          <h4>Jak działają symbole interwałów (Litera + Cyfra)</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <p>Każdy skrót koduje dwie informacje w dwóch znakach: <strong>cyfra</strong> liczy stopnie gamy od dolnej nuty, a <strong>litera przed nią</strong> określa dokładną szerokość w półtonach.</p>
        <ul class="k-physics-list">
          <li><strong>1. Cyfra (<code>1</code>–<code>9</code>) liczy stopnie skali:</strong> Od <code>1</code> = Pryma (ten sam ton), <code>2</code> = Sekunda, <code>3</code> = Tercja, <code>4</code> = Kwarta, <code>5</code> = Kwinta, <code>6</code> = Seksta, <code>7</code> = Septyma, <code>8</code> = Oktawa aż po <code>9</code> = Nona.</li>
          <li><strong>2. Interwały czyste (<code>P</code> = <em>Perfect</em>):</strong> <code>P1</code>, <code>P4</code>, <code>P5</code> i <code>P8</code> występują wyłącznie w czystej postaci — nie dzielą się na wielkie i małe.</li>
          <li><strong>3. Pary wielkie i małe (<code>2</code>, <code>3</code>, <code>6</code>, <code>7</code>, <code>9</code>):</strong> Każdy z tych pięciu interwałów ma dwie odmiany różniące się o <strong>1 półton</strong>:<br>
            – <strong>Niemieckie (<code>P / G / k</code>):</strong> wielka litera <strong><code>G</code></strong> (<em>Groß</em> = wielki) kontra mała <strong><code>k</code></strong> (<em>klein</em> = mały, np. <code>G3</code> kontra <code>k3</code>).<br>
            – <strong>Międzynarodowe (<code>P / M / m</code>):</strong> wielkie <strong><code>M</code></strong> (<em>Major</em>) oznacza wariant wielki, szerszy; małe <strong><code>m</code></strong> (<em>minor</em>) to wariant mały, o 1 półton węższy (np. <code>M3</code> kontra <code>m3</code>). Wielkość litery zmienia dźwięk!</li>
          <li><strong>4. Tryton (<code>TT</code>):</strong> Dzieli oktawę dokładnie na pół o <strong>6 półtonów</strong> między <code>P4</code> a <code>P5</code> (kwarta zwiększona / kwinta zmniejszona).</li>
        </ul>
        <div class="k-meta-box">
          <div><strong>Bieżące skróty:</strong> Sekundy: <code>${sym("m2")}</code> (1 pt) vs. <code>${sym("M2")}</code> (2 pt) · Tercje: <code>${sym("m3")}</code> (3 pt) vs. <code>${sym("M3")}</code> (4 pt)</div>
          <div><strong>Przełącznik:</strong> W menu <strong>Ustawienia → Język i notacja → Zapis muzyczny → Symbole interwałów</strong> zawsze możesz zmienić między <strong>Niemieckimi (P / G / k)</strong> a <strong>Międzynarodowymi (P / M / m)</strong>.</div>
        </div>
      </div>
    </details>
  `;
}

const CIRCLE_OF_FIFTHS_PL_DATA = {
  "C": {
    sig: "0 znaków",
    major: "C-dur",
    minor: "a-moll",
    enharmonic: "",
    acc: "Brak krzyżyków i bemoli (tylko białe klawisze fortepianu)",
    trick: "Punkt zerowy na godzinie 12 na tarczy: czyste dźwięki naturalne bez znaków służą za punkt odniesienia dla reszty koła.",
    vibe: "Otwarta, neutralna tonacja — idealna na start, do chóru i czytania a vista."
  },
  "G": {
    sig: "1 krzyżyk (♯)",
    major: "G-dur",
    minor: "e-moll",
    enharmonic: "",
    acc: "1♯: Fis (dźwięk prowadzący do G)",
    trick: "Ostatni krzyżyk (Fis) + półton w górę = G-dur.",
    vibe: "Jasna i dźwięczna na gitarze akustycznej, smyczkach oraz w folku i popie."
  },
  "D": {
    sig: "2 krzyżyki (♯)",
    major: "D-dur",
    minor: "h-moll",
    enharmonic: "",
    acc: "2♯: Fis, Cis",
    trick: "Ostatni krzyżyk = Cis → półton w górę = D-dur.",
    vibe: "Promienna, uroczysta tonacja smyczków orkiestrowych i rocka."
  },
  "A": {
    sig: "3 krzyżyki (♯)",
    major: "A-dur",
    minor: "fis-moll",
    enharmonic: "",
    acc: "3♯: Fis, Cis, Gis",
    trick: "Ostatni krzyżyk = Gis → półton w górę = A-dur.",
    vibe: "Otwarta, ciepła i świetlista na gitarze, skrzypcach i w wokalu."
  },
  "E": {
    sig: "4 krzyżyki (♯)",
    major: "E-dur",
    minor: "cis-moll",
    enharmonic: "",
    acc: "4♯: Fis, Cis, Gis, Dis",
    trick: "Ostatni krzyżyk = Dis → półton w górę = E-dur.",
    vibe: "Naturalne środowisko gitary elektrycznej, bluesa i klasycznego rocka."
  },
  "B": {
    sig: "5 krzyżyków (♯) / 7♭",
    major: "H-dur",
    minor: "gis-moll",
    enharmonic: "Enharmonicznie: Ces-dur (7♭) / as-moll",
    acc: "5♯: Fis, Cis, Gis, Dis, Ais",
    trick: "Ostatni krzyżyk = Ais → półton w górę = H-dur.",
    vibe: "Zadziwiająco wygodnie leży pod dłonią na fortepianie dzięki wykorzystaniu wszystkich 5 czarnych klawiszy."
  },
  "F#": {
    sig: "6 krzyżyków / 6 bemoli",
    major: "Fis-dur",
    minor: "dis / es-moll",
    enharmonic: "Most enharmoniczny na godzinie 6: Fis-dur (6♯) brzmi dokładnie tak samo jak Ges-dur (6♭: Ges–As–B–Ces–Des–Es–F).",
    acc: "6♯: Fis, Cis, Gis, Dis, Ais, Eis  (lub 6♭: B, Es, As, Des, Ges, Ces)",
    trick: "Naprzeciwko C-dur (biegun trytonu!): dalej wygodniej zazwyczaj czytać w zapisie bemolowym.",
    vibe: "Lśniąca, bogata barwa — uwielbiana w gospel, R&B i impresjonizmie."
  },
  "Db": {
    sig: "5 bemoli (♭) / 7♯",
    major: "Des-dur",
    minor: "b-moll",
    enharmonic: "Enharmonicznie: Cis-dur (7♯) / ais-moll",
    acc: "5♭: B, Es, As, Des, Ges",
    trick: "Przedostatni bemol to Des → a więc to Des-dur!",
    vibe: "Aksamitne, romantyczne brzmienie dla pianistów jazzowych i ballad soulowych."
  },
  "Ab": {
    sig: "4 bemole (♭)",
    major: "As-dur",
    minor: "f-moll",
    enharmonic: "",
    acc: "4♭: B, Es, As, Des",
    trick: "Przedostatni bemol = As → As-dur.",
    vibe: "Miękka i głęboka — klasyk standardów jazzowych, soulu i sekcji dętych."
  },
  "Eb": {
    sig: "3 bemole (♭)",
    major: "Es-dur",
    minor: "c-moll",
    enharmonic: "",
    acc: "3♭: B, Es, As",
    trick: "Przedostatni bemol = Es → Es-dur.",
    vibe: "Szlachetna i heroiczna tonacja dla blachy, saksofonu altowego i symfonii."
  },
  "Bb": {
    sig: "2 bemole (♭)",
    major: "B-dur",
    minor: "g-moll",
    enharmonic: "",
    acc: "2♭: B, Es",
    trick: "Przedostatni bemol = B → B-dur.",
    vibe: "Główna tonacja big-bandów, trąbek, klarnetów i modern jazzu."
  },
  "F": {
    sig: "1 bemol (♭)",
    major: "F-dur",
    minor: "d-moll",
    enharmonic: "",
    acc: "1♭: B (czyste H obniżone do B)",
    trick: "Jedyna tonacja bemolowa do zapamiętania osobno: jeden bemol przy kluczu to zawsze F-dur.",
    vibe: "Ciepła, pastoralna barwa kochana przez chóry, waltornie i ballady folkowe."
  }
};

const CIRCLE_ROLES_PL = {
  major: {
    I: "Tonika",
    ii: "Subd. mol.",
    iii: "Medianta",
    IV: "Subdominanta",
    V: "Dominanta",
    V7: "Dom. septym.",
    vi: "Moll równol.",
    "vii°": "Prowadzący zmn."
  },
  minor: {
    i: "Tonika moll",
    "ii°": "Zmniejszony",
    III: "Dur równol.",
    iv: "Subdom. moll",
    v: "Dom. natur.",
    V7: "Dom. harm. 7",
    VI: "Submedianta",
    VII: "Subtonika"
  }
};

function renderNotationReferenceHTML_PL() {
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
        <span class="k-card-tag tag-peach">1. Pięciolinia</span>
        <span class="k-ratio-chip">Linie i pola</span>
      </div>
      <h4>Jak muzyka zamienia się w współrzędne</h4>
      <p>
        Zapis nutowy działa jak dokładny wykres: <strong>oś pionowa</strong> wskazuje wysokość dźwięku (wyżej = wyższy ton, niżej = głębszy bas), a <strong>oś pozioma</strong> przesuwa czas od lewej do prawej.
      </p>
      <ul class="k-physics-list">
        <li><strong>Zawsze licz od dołu w górę:</strong> Pięciolinia ma <strong>5 linii</strong> (1. na dole, 5. na górze) oraz <strong>4 pola</strong> pomiędzy nimi.</li>
        <li><strong>Naprzemiennie „linia – pole”:</strong> Przejście z linii na sąsiednie pole (lub odwrotnie) odpowiada dokładnie <strong>jednemu krokowi diatonicznemu</strong> (<code>C → D → E → F → G → A → H</code>).</li>
        <li><strong>Po co jest klucz:</strong> Bez klucza linie są bezimienne — to klucz przybija <em>jedną pewną nutę odniesienia</em> na konkretnej linii.</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Trzy główne klucze (i klucze specjalne)</span>
        <span class="k-ratio-chip">Wiolinowy • Basowy • Altowy</span>
      </div>
      <h4>Trzy spojrzenia na tę samą klawiaturę</h4>
      <p>
        Pomarańczowa linia wyróżnia <strong>dźwięk orientacyjny</strong> każdego klucza. Zapamiętaj tę jedną latarnię, a sąsiednie stopnie odczytasz błyskawicznie.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${trebleAnchorSvg}
          <h5>Klucz wiolinowy (klucz G)</h5>
          <p>Środek ślimaka otacza <strong>2. linię od dołu = G razkreślne (g¹)</strong>. Standard dla śpiewu (sopran/alt), skrzypiec, fletu, trąbki, gitary i prawej ręki fortepianu.</p>
          <p><strong>Punkty odniesienia (dół → góra):</strong> linie <em>e¹ – g¹ – h¹ – d² – f²</em>; pola <em>f¹ – a¹ – c² – e²</em> (FACE).</p>
          <button type="button" class="btn-tool" data-play-solo-note="G4">▶ Posłuchaj nuty g¹</button>
        </div>
        <div class="notation-knowledge-card">
          ${bassAnchorSvg}
          <h5>Klucz basowy (klucz F)</h5>
          <p>Dwie kropki obejmują <strong>4. linię od dołu = F małe (f)</strong>. Podstawa dla lewej ręki fortepianu, wiolonczeli, kontrabasu, gitary basowej, puzonu, fagotu i głosów basowych.</p>
          <p><strong>Punkty odniesienia (dół → góra):</strong> linie <em>G – H – d – f – a</em>; pola <em>A – c – e – g</em>.</p>
          <button type="button" class="btn-tool" data-play-solo-note="F3">▶ Posłuchaj nuty f</button>
        </div>
        <div class="notation-knowledge-card">
          ${altoAnchorSvg}
          <h5>Klucz altowy (klucz C na 3. linii)</h5>
          <p>Środek znaku wskazuje dokładnie <strong>3. (środkową) linię = c razkreślne (c¹)</strong>. Główny klucz altówki w orkiestrze oraz dawnej polifonii.</p>
          <p><strong>Symetria klucza C:</strong> Ponieważ <code>c¹</code> leży idealnie pośrodku, w górę na 4. i 5. linii leżą <em>e¹</em> i <em>g¹</em>, a w dół na 2. i 1. linii <em>a</em> oraz <em>f</em>.</p>
          <button type="button" class="btn-tool" data-play-solo-note="C4">▶ Posłuchaj nuty c¹</button>
        </div>
      </div>

      <div class="k-meta-box">
        <div><strong>To samo środkowe c¹ (C4) łączy wszystkie trzy klucze:</strong> w <strong>wiolinowym</strong> siedzi na 1. linii dodanej <em>dolnej</em>, w <strong>altowym</strong> dokładnie w <em>środku (3. linia)</em>, a w <strong>basowym</strong> na 1. linii dodanej <em>górnej</em>!</div>
        <div><strong>Klucze specjalne (przegląd):</strong> <strong>Klucz tenorowy</strong> przesuwa ten sam klucz C na 4. linię (dla wysokich partii wiolonczeli, fagotu i puzonu), a klucze oktawowe (<code>8vb</code> / <code>8va</code>) transponują zapis gitary lub fletu piccolo bez nadmiaru linii dodanych.</div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Do 3 linii dodanych</span>
        <span class="k-ratio-chip">±3 linie dodane</span>
      </div>
      <h4>Czytaj wysoko i nisko bez powolnego liczenia po jednej linii</h4>
      <p>
        Gdy melodia wchodzi nad 5. lub pod 1. linię, tylko pod samą nutą dorysowuje się krótkie <strong>linie dodane</strong>. Trener obejmuje do <strong>3 linii dodanych w obie strony</strong> — dokładnie tyle, ile spotyka się na co dzień w utworach na fortepian i zespoły.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${ledgerSvg}
          <h5>Klucz wiolinowy: ±3 linie dodane</h5>
          <p>Po lewej: 3., 2. i 1. linia dolna (<code>F3 – A3 – C4</code>); środek: <code>H4</code>; po prawej: 1., 2. i 3. linia górna (<code>A5 – C6 – E6</code>).</p>
        </div>
        <div class="notation-knowledge-card">
          ${ledgerBassSvg}
          <h5>Klucz basowy: głęboki bas i wysoki rejestr</h5>
          <p>W dół 3 linie sięgają przez <code>E2 – C2</code> aż do kontrowego A (<code>A1</code>), a w górę przez środkowe <code>c¹</code> otwierają <code>e¹</code> i <code>g¹</code>.</p>
        </div>
      </div>
      <ul class="k-physics-list">
        <li><strong>Zapamiętaj po 2 kotwice poza pięciolinią:</strong> Utrwal 1. i 2. linię dodaną (np. <code>c¹</code> i <code>a</code> pod wiolinowym albo <code>a²</code> i <code>c³</code> nad nim), a nuty na sąsiednich polach odczytasz w ułamku sekundy.</li>
        <li><strong>Widź skoki co drugą linię:</strong> Przeskok z jednej linii dodanej na następną to zawsze <strong>tercja</strong> — dokładnie tak samo, jak buduje się trójdźwięki!</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Znaki chromatyczne i systemy nazw</span>
        <span class="k-ratio-chip">♯ • ♭ • H vs B</span>
      </div>
      <h4>Czarne klawisze, enharmonia i tradycyjna notacja H / B</h4>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${accSvg}
          <div class="k-btn-row" style="margin-top:0.25rem;">
            <button type="button" class="btn-tool" data-play-solo-note="F4">▶ f¹</button>
            <button type="button" class="btn-tool" data-play-solo-note="F#4">▶ fis¹ / ges¹</button>
            <button type="button" class="btn-tool" data-play-solo-note="Bb4">▶ b¹ (Bb4)</button>
          </div>
        </div>
        <div class="notation-knowledge-card">
          <ul class="k-physics-list">
            <li><strong>Krzyżyk (<code>♯</code>):</strong> Podwyższa dźwięk o dokładnie <strong>1 półton</strong> (na najbliższy klawisz po prawej). Z <code>F</code> robi <code>Fis</code>.</li>
            <li><strong>Bemol (<code>♭</code>):</strong> Obniża dźwięk o dokładnie <strong>1 półton</strong> (w lewo). Z <code>G</code> robi <code>Ges</code>.</li>
            <li><strong>Enharmonia:</strong> Na klawiaturze <code>Fis</code> i <code>Ges</code> to ten sam fizyczny klawisz, lecz zapis w nutach zdradza funkcję harmoniczną.</li>
            <li><strong>Tradycja PL/DE kontra międzynarodowa:</strong> W polskiej i niemieckiej szkole muzycznej biały dźwięk po A nazywa się <strong>H</strong>, a obniżony o półton <strong>B</strong> (w systemie anglosaskim odpowiednio <em>B</em> i <em>B♭</em>). W <em>Ustawieniach</em> możesz dowolnie przełączać oba systemy.</li>
          </ul>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Tonacje i znaki przykluczowe</span>
        <span class="k-ratio-chip">Czytanie a vista z ♮</span>
      </div>
      <h4>Gdy znaki przy kluczu obowiązują w całej pięciolinii</h4>
      <p>
        Zamiast pisać <code>♯</code> czy <code>♭</code> przed każdą pojedynczą nutą, <strong>znaki przykluczowe</strong> stoją <strong>tuż za kluczem</strong> i automatycznie zmieniają przypisane stopnie we <strong>wszystkich oktawach</strong>, dopóki nie zniesie ich kasownik (<code>♮</code>).
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${keySigSharpSvg}
          <h5>Tonacje krzyżykowe (Kolejność: Fis – Cis – Gis – Dis – Ais – Eis)</h5>
          <p>W tonacji <strong>D-dur (2♯)</strong> każde <code>F</code> brzmi jako <code>Fis</code>, a każde <code>C</code> jako <code>Cis</code> — dopiero kasownik (<code>♮</code>) przy trzeciej nucie przywraca czyste białe <code>F</code>.</p>
        </div>
        <div class="notation-knowledge-card">
          ${keySigFlatSvg}
          <h5>Tonacje bemolowe (Kolejność: B – Es – As – Des – Ges – Ces)</h5>
          <p>W tonacji <strong>Es-dur (3♭)</strong> znaki <code>B</code>, <code>Es</code> i <code>As</code> obowiązują od razu na całej wysokości pięciolinii, aż pojawi się kasownik <code>♮</code>.</p>
        </div>
      </div>
    </article>
  `;
}

function renderArrangingReferenceHTML_PL() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Czym jest aranżacja?</span>
        <span class="k-ratio-chip">Szkic → Pełne brzmienie</span>
      </div>
      <h4>Sztuka zmieniania pomysłu muzycznego w żywą opowieść</h4>
      <p>
        Jeśli <strong>kompozycja</strong> to fundament i plan utworu (melodia, podstawowe akordy i tekst), to <strong>aranżacja</strong> jest całą architekturą wnętrza, oświetleniem i doborem barw: <em>Kto gra co, w którym momencie, w jakiej oktawie, z jakim rytmem, dynamiką i barwą?</em>
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Obsada i instrumentacja</strong>
          Wybór instrumentów lub głosów prowadzących melodię, bas, tło harmoniczne i puls rytmiczny oraz łączenie ich barw.
        </div>
        <div class="physics-fact-item">
          <strong>Forma i dramaturgia</strong>
          Budowanie napięcia od kameralnego wstępu przez zwrotkę aż po punkt kulminacyjny w refrenie i finał.
        </div>
        <div class="physics-fact-item">
          <strong>Rejestry i voicing</strong>
          Rozmieszczenie dźwięków od głębokiego basu po jasne góry tak, by każdy instrument miał własną przestrzeń.
        </div>
        <div class="physics-fact-item">
          <strong>Dialog, faktura i pauzy</strong>
          Decydowanie, kiedy grają wszyscy (<em>tutti</em>), kiedy pojedynczy instrument odpowiada w przerwach wokalu i kiedy cisza buduje emocje.
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. Cel i zastosowanie</span>
        <span class="k-ratio-chip">Po co aranżujemy?</span>
      </div>
      <h4>Do czego służy aranżacja i kiedy się ją stosuje?</h4>
      <p>
        Ta sama piosenka oparta na czterech akordach może zabrzmieć jako <strong>intymna ballada fortepianowa</strong>, <strong>energetyczny funk</strong>, <strong>czterogłosowy chór a cappella</strong> albo <strong>epicka muzyka filmowa</strong>:
      </p>
      <ul class="article-steps-list">
        <li><strong>1. Kierowanie uwagi słuchacza:</strong> Ludzkie ucho potrafi świadomie śledzić maksymalnie <strong>2–3 jednoczesne plany muzyczne</strong>. Dobra aranżacja robi miejsce w środkowym paśmie dla głównej melodii.</li>
        <li><strong>2. Przekładanie emocji i stylu:</strong> Smyczki dają ciepło i przestrzeń, krótkie akcenty dęte (<em>brass stabs</em>) dodają energii, a gitara akustyczna tworzy bliskość.</li>
        <li><strong>3. Chronienie ucha przed znużeniem:</strong> Gdy wszystkie instrumenty grają bez przerwy od pierwszego taktu, słuchacz szybko się męczy. Stopniowe dokładanie i odejmowanie warstw utrzymuje świeżość.</li>
        <li><strong>4. Dopasowanie do konkretnego składu:</strong> Zespół szkolny, kwartet smyczkowy, chór SATB, big-band czy solo na gitarze — aranżacja dostosowuje utwór do dostępnych wykonawców.</li>
        <li><strong>5. Klej muzyczny i przejścia:</strong> Przedtakty, przejścia perkusyjne, pochody basu, crescenda i zatrzymania (<em>breaks</em>) spajają części utworu w jedną całość.</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Model 4 warstw</span>
        <span class="k-ratio-chip">Podział ról</span>
      </div>
      <h4>4 filary przejrzystej aranżacji</h4>
      <ul class="k-physics-list">
        <li><strong>1. Plan pierwszy (Lead / Melodia):</strong> Wokal lub instrument solowy niosący główny temat.</li>
        <li><strong>2. Fundament (Bas i Groove):</strong> Bas określa prymę harmonii, a perkusja buduje puls rytmiczny.</li>
        <li><strong>3. Poduszka harmoniczna (Pad i Comping):</strong> Długie nuty smyczków, chóru lub rytmiczny akompaniament gitary/pianina w średnicy.</li>
        <li><strong>4. Kontrapunkt i dopowiedzenia (Fills / Ear Candy):</strong> Krótkie motywy pojawiające się dokładnie tam, gdzie główna melodia bierze oddech.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-sketch">▶ 1. Surowy szkic (melodia i bas)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-full-layers">▶ 2. Pełna aranżacja 4-warstwowa</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Rejestry i voicing</span>
        <span class="k-ratio-chip">Przejrzystość zamiast mułu</span>
      </div>
      <h4>Dlaczego jedne aranżacje brzmią krystalicznie, a inne „muliście”?</h4>
      <ul class="k-physics-list">
        <li><strong>Zasada alikwotów (Na dole szeroko, u góry gęsto):</strong> Poniżej <code>C3</code> ciasne tercje brzmią ciężko i mętnie (<em>Low-Interval Limit</em>). W dole zostaw prymy, kwinty i oktawy, a tercje, septymy i rozszerzenia umieść wyżej.</li>
        <li><strong>Układ skupiony vs rozległy (Drop-2):</strong> Przeniesienie drugiego dźwięku od góry o oktawę w dół natychmiast otwiera przestrzeń akordu.</li>
        <li><strong>Podział rytmiczny:</strong> Instrumenty w podobnym rejestrze powinny grać różnymi wartościami rytmicznymi (np. długie tło smyczków + krótkie szesnastki gitary).</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-muddy">▶ Muliście: Ciasne tercje nisko w basie</button>
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-open">▶ Przejrzyście: Otwarty voicing studyjny</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Napięcie i dialog</span>
        <span class="k-ratio-chip">Call &amp; Response • Drop</span>
      </div>
      <h4>Jak utrzymać uwagę słuchacza przez cały utwór</h4>
      <ul class="article-steps-list">
        <li><strong>Call &amp; Response (Zawołanie i odpowiedź):</strong> Instrument odpowiada w pauzach na końcu frazy wokalnej.</li>
        <li><strong>Ruch przeciwny i kontramelodia:</strong> Drugi głos opada, gdy główna melodia wznosi się, albo porusza się podczas długiej nuty wokalu.</li>
        <li><strong>Siła odejmowania („The Drop”):</strong> Nagłe wyciszenie większości ścieżek na jeden takt często daje większe wrażenie niż dodanie kolejnych instrumentów.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-call-response">▶ Call &amp; Response (dialog w pauzie)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-counterpoint">▶ Kontrapunkt w ruchu przeciwnym</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">6. Reharmonizacja i lista kontrolna</span>
        <span class="k-ratio-chip">Te same nuty, nowy klimat</span>
      </div>
      <h4>Ta sama melodia w zupełnie nowej szacie harmonicznej</h4>
      <p>
        <strong>Reharmonizacja</strong> pozostawia melodię bez zmian, ale wymienia akordy pod spodem (np. <code>Fmaj7 – Fm6 – Am9</code> zamiast prostego <code>C – G – C</code>).
      </p>
      <div class="k-btn-row" style="margin-top:0.45rem;margin-bottom:0.65rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-plain">▶ Melodia na prostych trójdźwiękach (I–V–I)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-cinema">▶ Ta sama melodia z filmową reharmonizacją</button>
      </div>
      <div class="k-meta-box">
        <div><strong>5 pytań kontrolnych do własnej aranżacji:</strong></div>
        <div>1. <strong>Kto ma teraz głos?</strong> W każdej chwili tylko jeden element powinien być na pierwszym planie.</div>
        <div>2. <strong>Gdzie są oddechy?</strong> Umieszczaj dopowiedzenia w pauzach głównej melodii.</div>
        <div>3. <strong>Czy dół pasma jest czysty?</strong> Unikaj ciasnych tercji poniżej <code>C3</code>.</div>
        <div>4. <strong>Czy zwrotka i refren wyraźnie się różnią?</strong> Różnicuj szerokość rejestrów i gęstość rytmu.</div>
        <div>5. <strong>Test wyciszenia (Mute Test):</strong> Jeśli po wyciszeniu ścieżki niczego nie brakuje, nadaj jej wyraźną funkcję lub odważnie ją usuń!</div>
      </div>
      <div class="k-btn-row" style="margin-top:0.55rem;">
        <button type="button" class="btn-tool" data-jump-ref="ensembles">Do Orkiestr i Zespołów →</button>
        <button type="button" class="btn-tool" data-jump-ref="cadences">Do Kadencji i Harmonii →</button>
        <button type="button" class="btn-tool" data-jump-ref="physics">Do Fizyki i Alikwotów →</button>
      </div>
    </article>
  `;
}

if (typeof registerKnowledgeBundle === "function") {
  registerKnowledgeBundle("pl", {
    data: {
      intervalEncyclopedia: INTERVAL_ENCYCLOPEDIA_PL,
      cadenceEncyclopedia: CADENCE_ENCYCLOPEDIA_PL,
      solfegeSteps: SOLFEGE_STEPS_PL,
      knowledgeArticles: KNOWLEDGE_ARTICLES_PL,
      physicsWaveExplanations: PHYSICS_WAVE_EXPLANATIONS_PL,
      physicsOvertones: PHYSICS_OVERTONES_PL,
      categoryHelpGuides: CATEGORY_HELP_GUIDES_PL,
      rhythmInstruments: RHYTHM_INSTRUMENTS_DATA_PL,
      instrumentModules: INSTRUMENT_MODULES_PL,
      modesEncyclopedia: MODES_ENCYCLOPEDIA_PL,
      keysCircleData: KEYS_CIRCLE_DATA_PL
    },
    renderers: {
      physics: renderPhysicsReferenceHTML_PL,
      rhythm: renderRhythmReferenceHTML_PL,
      rhythmInstruments: renderRhythmInstrumentsHTML_PL,
      vocals: renderVocalsReferenceHTML_PL,
      instrumentModule: renderInstrumentModuleHTML_PL,
      modes: renderModesReferenceHTML_PL,
      keys: renderKeysReferenceHTML_PL,
      singAndPlay: renderSingAndPlayReferenceHTML_PL,
      notation: renderNotationReferenceHTML_PL,
      arranging: renderArrangingReferenceHTML_PL,
      intervalNamingGuide: getIntervalNamingGuideHTML_PL,
      circleOfFifthsTheory: renderCircleOfFifthsTheoryHTML_PL
    },
    circleData: CIRCLE_OF_FIFTHS_PL_DATA,
    circleRoles: CIRCLE_ROLES_PL
  });
}
