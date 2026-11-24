/**
 * Lauscher • English Knowledge Base, Interactive Reference Pages & Articles
 * Context-appropriate, idiomatic English music theory, acoustics & instrument guides.
 */

const INTERVAL_ENCYCLOPEDIA_EN = [
  {
    key: "P1",
    symbol: "P1",
    name: "Perfect Unison",
    semitones: 0,
    ratio: "1 : 1",
    ratioExplain: "1 : 1 means both notes vibrate at the exact same speed. While note 1 completes one cycle, note 2 completes one cycle — they are the very same pitch.",
    category: "pure",
    mood: "Total fusion, resting point, identity",
    physics: "Both tones share the exact same frequency (e.g., 261.6 Hz and 261.6 Hz). Their sound waves overlap in complete alignment.",
    songsAsc: "“One Note Samba” (verse melody on a single pitch), opening of “Thank You for the Music” (ABBA – first two syllables)",
    songsDesc: "Any repeated note in rhythmic hooks (e.g., Lady Gaga’s “Poker Face” intro)"
  },
  {
    key: "m2",
    symbol: "m2",
    name: "Minor 2nd",
    semitones: 1,
    ratio: "16 : 15",
    ratioExplain: "16 : 15 means the higher note vibrates just barely faster than the lower one. Their peaks only align once every 16 cycles (or 15 of the lower tone) — creating sharp acoustic beating in between.",
    category: "tension",
    mood: "Tightly wound, prowling, mysterious, urgent (Leading tone!)",
    physics: "The waves take 16 cycles to resync. Because both pitches sit so close together on the inner ear’s basilar membrane, they produce strong audible roughness.",
    songsAsc: "“Jaws” theme (du-dum…), “Pink Panther” (opening chromatic step), “Für Elise” (motive E–D#–E)",
    songsDesc: "“Für Elise” (Beethoven – first two notes E → D#), “Joy to the World” (first downward step)"
  },
  {
    key: "M2",
    symbol: "M2",
    name: "Major 2nd",
    semitones: 2,
    ratio: "9 : 8",
    ratioExplain: "9 : 8 means 8 vibrations of the lower note line up with 9 vibrations of the upper note. Close enough to feel connected, yet open enough to sound like a clear melodic step.",
    category: "major",
    mood: "Natural walking step, storytelling, open, beginning of a melody",
    physics: "The 9:8 ratio arises naturally by stacking two pure 5ths and dropping an octave. It sounds like a gentle step away from home.",
    songsAsc: "“Happy Birthday” (“Hap-py BIRTH-day”), “Silent Night”, “Frère Jacques” (first two notes C → D)",
    songsDesc: "“Yesterday” (The Beatles – “Yes-ter-day”), “Mary Had a Little Lamb”"
  },
  {
    key: "m3",
    symbol: "m3",
    name: "Minor 3rd",
    semitones: 3,
    ratio: "6 : 5",
    ratioExplain: "6 : 5 means while the lower note vibrates 5 times, the higher note vibrates 6 times. A compact, steady ratio that sounds warm, smooth, and deeply expressive.",
    category: "minor",
    mood: "Reflective, warm, melancholic, earthy and intimate",
    physics: "At 6:5 the ratio is still very smooth (consonant), yet sits lower than the major 3rd — the emotional core of every minor chord.",
    songsAsc: "“Seven Nation Army” (The White Stripes – first leap in the riff), “Greensleeves”, “Smoke on the Water” (first step)",
    songsDesc: "“Hey Jude” (The Beatles – “Hey Jude”), a classic cuckoo call in the woods, “This Old Man”"
  },
  {
    key: "M3",
    symbol: "M3",
    name: "Major 3rd",
    semitones: 4,
    ratio: "5 : 4",
    ratioExplain: "5 : 4 means 5 cycles of the upper note fit cleanly into 4 cycles of the root. Because 5 and 4 are small whole numbers, both pitches blend into a bright, radiant major sound.",
    category: "major",
    mood: "Bright, friendly, warm, confident (the heart of every major triad)",
    physics: "The 5:4 ratio appears naturally right near the bottom of the harmonic overtone series (5th partial) in every sung or plucked tone.",
    songsAsc: "“When the Saints Go Marching In”, “Morning Has Broken” (Cat Stevens), “Kumbaya”",
    songsDesc: "“Summertime” (Gershwin), “Swing Low, Sweet Chariot”, Beethoven’s 5th Symphony opening"
  },
  {
    key: "P4",
    symbol: "P4",
    name: "Perfect 4th",
    semitones: 5,
    ratio: "4 : 3",
    ratioExplain: "4 : 3 means while the lower note vibrates 3 times, the upper note vibrates 4 times. On every 3rd wave peak, both tones lock right back together!",
    category: "pure",
    mood: "Calling, ceremonial, fanfare-like, wide open",
    physics: "As the inversion of the Perfect 5th inside an octave, the 4th holds a clean 4:3 ratio. Alone it sounds rock solid, though above a bass it often wants to settle down a step to the 3rd.",
    songsAsc: "“Here Comes the Bride” (Wedding March), “Harry Potter” (Hedwig’s Theme first leap), “Amazing Grace”",
    songsDesc: "“Eine kleine Nachtmusik” (Mozart – second interval), “O Come, All Ye Faithful”"
  },
  {
    key: "TT",
    symbol: "TT",
    name: "Tritone (Aug. 4th / Dim. 5th)",
    semitones: 6,
    ratio: "approx. 45 : 32",
    ratioExplain: "45 : 32 means the two waves struggle to find common ground — they only realign after 32 and 45 cycles. Our ear hears that constant cross-current as crackling tension!",
    category: "tension",
    mood: "Floating, mysterious, electrifying, unresolved",
    physics: "Splits the octave dead in half (6 semitones). Because the waveforms lack a simple common multiple, it produces unmistakable harmonic friction — the engine inside Dominant 7th (V7) chords.",
    songsAsc: "“The Simpsons” theme (“The Simp-sons”), “Maria” (West Side Story)",
    songsDesc: "“Black Sabbath” (opening riff), “YYZ” (Rush)"
  },
  {
    key: "P5",
    symbol: "P5",
    name: "Perfect 5th",
    semitones: 7,
    ratio: "3 : 2",
    ratioExplain: "3 : 2 means the upper pitch vibrates exactly one-and-a-half times (1.5×) faster than the root. Two long lower waves hold three upper waves with zero wobble — pure stability!",
    category: "pure",
    mood: "Heroic, powerful, grounded, crystal clear (the backbone of power chords)",
    physics: "Next to the octave, 3:2 is the simplest frequency ratio in music. That extreme clarity is why even heavily distorted electric guitars playing fifths (power chords) still sound tight.",
    songsAsc: "“Star Wars” (Main Theme), “Twinkle, Twinkle, Little Star”, “Also sprach Zarathustra” (2001)",
    songsDesc: "“The Flintstones” theme, “Game of Thrones” (Main Title – first downward leap)"
  },
  {
    key: "m6",
    symbol: "m6",
    name: "Minor 6th",
    semitones: 8,
    ratio: "8 : 5",
    ratioExplain: "8 : 5 means 5 cycles of the root match 8 cycles of the upper pitch. The shape feels expansive, sweeping, and tinged with gentle longing.",
    category: "minor",
    mood: "Yearning, dramatic, bittersweet, cinematic-romantic",
    physics: "The inversion of the Major 3rd (8:5). It combines wide melodic reach with soft minor coloring.",
    songsAsc: "“The Entertainer” (Scott Joplin – after the pickup), “In My Life” (The Beatles – guitar intro), “We Are Young” (Fun.)",
    songsDesc: "“Love Story” theme (Where Do I Begin)"
  },
  {
    key: "M6",
    symbol: "M6",
    name: "Major 6th",
    semitones: 9,
    ratio: "5 : 3",
    ratioExplain: "5 : 3 means while the root vibrates 3 times, the upper note vibrates 5 times. Small whole numbers give this wide leap a particularly warm, vocal glow.",
    category: "major",
    mood: "Buoyant, warmhearted, pastoral, inviting",
    physics: "Closely related to the Minor 3rd (its inversion), the 5:3 ratio feels smooth, lyrical, and natural to sing.",
    songsAsc: "“My Bonnie Lies Over the Ocean”, “Dashing Through the Snow” (Jingle Bells), NBC chimes",
    songsDesc: "“The Music of the Night” (Phantom of the Opera), “Man in the Mirror” (Michael Jackson – “I’m gonna make a change”)"
  },
  {
    key: "m7",
    symbol: "m7",
    name: "Minor 7th",
    semitones: 10,
    ratio: "16 : 9",
    ratioExplain: "16 : 9 (or 7 : 4 in the natural harmonic series) stops just shy of the octave’s 2:1 speed. That slight shortfall gives blues, soul, and funk their relaxed gravitational pull.",
    category: "tension",
    mood: "Bluesy, laid-back, soulful, with a gentle pull downward",
    physics: "Appears naturally as the 7th harmonic (7:4). Rather than sounding harsh, it softens harmonic stiffness and fuels Dominant 7th grooves.",
    songsAsc: "“The Winner Takes It All” (ABBA), “Somewhere” (West Side Story – “There’s a place for us”), original “Star Trek” theme",
    songsDesc: "“Watermelon Man” (Herbie Hancock)"
  },
  {
    key: "M7",
    symbol: "M7",
    name: "Major 7th",
    semitones: 11,
    ratio: "15 : 8",
    ratioExplain: "15 : 8 is just one tiny semitone short of 16 : 8 (the 2:1 octave!). Because the tones almost — but don’t quite — lock into octave unison, they shimmer with crisp tension.",
    category: "tension",
    mood: "Dreamy and lush (inside a Maj7 chord) or biting and tense (isolated)",
    physics: "Only one half step below the octave (15:8). Naked on its own it rubs sharply against the root, yet wrapped in a major triad (Cmaj7) it turns into effortless jazz warmth.",
    songsAsc: "“Take On Me” (a-ha – chorus opening), “Don’t Know Why” (Norah Jones), “Superman” (bridge)",
    songsDesc: "“I Love You” (Cole Porter)"
  },
  {
    key: "P8",
    symbol: "P8",
    name: "Perfect Octave",
    semitones: 12,
    ratio: "2 : 1",
    ratioExplain: "2 : 1 means the upper tone vibrates exactly twice as fast as the lower tone (half the wavelength). Every long wave frames two short waves cleanly — they fuse almost as one pitch!",
    category: "pure",
    mood: "Spaciousness, clarity, completion — the same note on a higher plane",
    physics: "Exact frequency doubling (2:1). Whenever mixed voices or adults and children sing the “same” melody together, they naturally sing an octave apart.",
    songsAsc: "“Somewhere Over the Rainbow” (The Wizard of Oz), “Singin’ in the Rain”",
    songsDesc: "“Willow Weep for Me”"
  },
  {
    key: "m9",
    symbol: "m9",
    name: "Minor 9th",
    semitones: 13,
    ratio: "32 : 15",
    ratioExplain: "32 : 15 means the upper note vibrates slightly over twice as fast as the root (octave + minor 2nd). The awkward ratio produces intense, fiery harmonic bite.",
    category: "tension",
    mood: "Exotic, dramatic, high-tension (flamenco & altered jazz voicings)",
    physics: "An octave plus one semitone. Wider spacing softens the close-range crunch slightly compared to a minor 2nd, yet preserves its dark edge.",
    songsAsc: "Altered jazz dominant voicings (V7b9) and Spanish flamenco guitar runs",
    songsDesc: "Dramatic film-score sting accents"
  },
  {
    key: "M9",
    symbol: "M9",
    name: "Major 9th",
    semitones: 14,
    ratio: "9 : 4",
    ratioExplain: "9 : 4 means while the deep root vibrates 4 times, the upper note completes 9 cycles (more than double speed). Wide spacing creates an airy, luminous, modern color.",
    category: "major",
    mood: "Airy, modern, floating and lush (pop & neo-soul color)",
    physics: "An octave plus a major 2nd (or two stacked fifths: C → G → D). Adds shimmering breadth to add9 and maj9 chords.",
    songsAsc: "“Every Breath You Take” (The Police – the signature guitar arpeggio stretches straight up to the 9th!)",
    songsDesc: "Modern pop and R&B piano voicings"
  }
];

const CADENCE_ENCYCLOPEDIA_EN = [
  {
    id: "authentic",
    category: "classic",
    name: "The Classical Authentic Cadence",
    formula: "I – IV – V – I",
    tag: "Foundation & Home",
    tagClass: "tag-sage",
    bars: ["I", "IV", "V", "I"],
    whyItWorks: "Tells a complete four-bar story: **I (Tonic)** introduces home. **IV (Subdominant)** opens the door and steps outside. **V (Dominant)** builds peak harmonic pull with its leading tone, and **I** brings everything cleanly to rest.",
    songs: [
      "“Twist and Shout” – The Beatles (I – IV – V)",
      "“La Bamba” – Ritchie Valens",
      "“Three Little Birds” – Bob Marley",
      "Countless folk songs and timeless standards"
    ]
  },
  {
    id: "plagal-amen",
    category: "classic",
    name: "The Plagal Cadence (“Amen” Ending)",
    formula: "I – IV – I",
    tag: "Warm & Solemn",
    tagClass: "tag-sage",
    bars: ["I", "IV", "I"],
    whyItWorks: "Unlike the tense Dominant (**V**), the **IV** chord lacks a sharp leading tone pulling back to the root. So moving **IV → I** doesn’t snap home dramatically — it settles warmly and gently, famously sung as “Amen” at the end of hymns.",
    songs: [
      "“Hey Jude” – The Beatles (long “Na-na-na” outro with bVII–IV–I)",
      "“Let It Be” – The Beatles (interlude F–C)",
      "Traditional gospel and church hymn endings (“Amen”)"
    ]
  },
  {
    id: "half-cadence",
    category: "classic",
    name: "The Half Cadence (Open Question)",
    formula: "I – IV – ii – V",
    tag: "Suspended Tension",
    tagClass: "tag-peach",
    bars: ["I", "IV", "ii", "V"],
    whyItWorks: "Stopping mid-phrase right on the **Dominant (V)** acts like a musical colon: “…hold on, here it comes!” In a verse or pre-chorus, a half cadence makes the chorus drop on **I** feel exhilarating.",
    songs: [
      "Classical sonata themes (Mozart, Haydn)",
      "Almost every pop pre-chorus right before the chorus drops",
      "“Yesterday” – The Beatles (phrase ending suspended on the Dominant)"
    ]
  },
  {
    id: "pachelbel",
    category: "classic",
    name: "The Pachelbel Progression",
    formula: "I – V – vi – iii – IV – I – IV – V",
    tag: "Baroque to Pop",
    tagClass: "tag-lilac",
    bars: ["I", "V", "vi", "iii", "IV", "I", "IV", "V"],
    stepMs: 1500,
    chordDur: 1.38,
    whyItWorks: "A stroke of bassline genius from 1680: the bass steps down and leaps cleanly (**C → G → A → E → F → C → F → G**). Every link interlocks seamlessly, creating an eight-bar loop that sounds both serene and endlessly forward-moving.",
    songs: [
      "“Canon in D” – Johann Pachelbel",
      "“Basket Case” – Green Day",
      "“Memories” – Maroon 5",
      "“Go West” – Village People / Pet Shop Boys"
    ]
  },
  {
    id: "pop4",
    category: "pop",
    name: "The “4-Chord” Pop Anthem",
    formula: "I – V – vi – IV",
    tag: "Pop Classic",
    tagClass: "tag-peach",
    bars: ["I", "V", "vi", "IV"],
    whyItWorks: "Arguably the most successful progression of the last 50 years! Its secret: hidden right in the middle is a **deceptive cadence (V → vi)** that delivers instant emotional ache. And ending on the open **IV** leaves it unresolved so the chorus loops effortlessly forever.",
    songs: [
      "“Let It Be” – The Beatles (verse)",
      "“Someone Like You” – Adele (chorus)",
      "“With or Without You” – U2",
      "“No Woman, No Cry” – Bob Marley",
      "“Don’t Stop Believin’” – Journey"
    ]
  },
  {
    id: "doowop",
    category: "pop",
    name: "The ’50s / Doo-Wop Progression",
    formula: "I – vi – IV – V",
    tag: "Soul & Retro",
    tagClass: "tag-lilac",
    bars: ["I", "vi", "IV", "V"],
    whyItWorks: "From bright Tonic (**I**), the harmony slips tenderly into its **relative minor (vi)** — sharing two of the exact same notes! From there, **IV** and **V** build an irresistible nostalgic pull back to bar one.",
    songs: [
      "“Stand By Me” – Ben E. King",
      "“Every Breath You Take” – The Police",
      "“Unchained Melody” – The Righteous Brothers",
      "“Happiness Is a Warm Gun” – The Beatles (outro)"
    ]
  },
  {
    id: "sad-pop",
    category: "pop",
    name: "The Emotional Minor-Start Loop",
    formula: "vi – IV – I – V",
    tag: "Melancholy & Drive",
    tagClass: "tag-lilac",
    bars: ["vi", "IV", "I", "V"],
    whyItWorks: "Here’s the twist: these are the exact same four chords as “I – V – vi – IV” — simply rotated to begin on the **relative minor (vi)**! Starting in minor shifts the entire mood from sunlit optimism to brooding intensity while still surging powerfully through **I** and **V**.",
    songs: [
      "“Zombie” – The Cranberries (Em – C – G – D)",
      "“Save Tonight” – Eagle-Eye Cherry",
      "“Numb” – Linkin Park",
      "“Hello” – Adele (verse)"
    ]
  },
  {
    id: "minor-plagal",
    category: "pop",
    name: "The Bittersweet Minor Subdominant",
    formula: "I – IV – iv – I",
    tag: "Cinema & Nostalgia",
    tagClass: "tag-peach",
    bars: ["I", "IV", "iv", "I"],
    whyItWorks: "One of harmony’s most heart-tugging moves: first we head optimistically to **IV (F Major)**, only for that exact chord to melt into **iv (F Minor)** — a move called *modal interchange* (borrowed from C minor). Inside the chord, **A** slips down a half step to **Ab** and melts into **G** on the Tonic.",
    songs: [
      "“In My Life” – The Beatles",
      "“Don’t Look Back in Anger” – Oasis (pre-chorus F → Fm → C)",
      "“Wake Me Up When September Ends” – Green Day",
      "Classic Disney ballads & golden-age film endings"
    ]
  },
  {
    id: "creep-chromatic",
    category: "pop",
    name: "The Chromatic Line Climb (“Creep”)",
    formula: "I – III7 – IV – iv",
    tag: "Heartache Classic",
    tagClass: "tag-lilac",
    bars: ["I", "III7", "IV", "iv"],
    whyItWorks: "Listen for the hidden inner voice: **C (I)** holds **G**; the unexpected major **E7 (III7)** lifts it to **G#**; **F (IV)** climbs up to **A**; and **Fm (iv)** drops poignantly to **Ab**. That subtle chromatic thread (**G → G# → A → Ab**) glues the entire progression together.",
    songs: [
      "“Creep” – Radiohead",
      "“The Air That I Breathe” – The Hollies",
      "“Get Free” – Lana Del Rey"
    ]
  },
  {
    id: "royal-road",
    category: "pop",
    name: "The “Royal Road” (Ōdō Shinkō)",
    formula: "IV – V – iii – vi",
    tag: "J-Pop & Anime Anthem",
    tagClass: "tag-sage",
    bars: ["IV", "V", "iii", "vi"],
    whyItWorks: "Revered in Japanese pop as the royal road of chord progressions: it launches right into motion on **IV**, charges past **V**, then sidesteps **I** completely to glide through **iii** and **vi**. Avoiding full resolution creates that breathless, soaring soundtrack momentum.",
    songs: [
      "“Stay With Me” – Miki Matsubara (City Pop)",
      "“Never Gonna Give You Up” – Rick Astley (chorus)",
      "Countless anime openings & Nintendo themes (e.g., Mario Kart / Zelda)"
    ]
  },
  {
    id: "sus4-resolve",
    category: "pop",
    name: "The Suspended Dominant Resolution (sus4)",
    formula: "I – IV – Vsus4 – V – I",
    tag: "Elegant Suspension",
    tagClass: "tag-sage",
    bars: ["I", "IV", "Vsus4", "V", "I"],
    whyItWorks: "On **Vsus4**, the Dominant’s major 3rd (**B** in a G chord) is held back and replaced by the 4th (**C**). That shimmering, metallic suspension melts cleanly down one half step (**C → B**) into pure **V** before releasing to **I**.",
    songs: [
      "“Crazy Little Thing Called Love” – Queen",
      "“Pinball Wizard” – The Who",
      "“The Scientist” / Coldplay piano anthems"
    ]
  },
  {
    id: "deceptive",
    category: "epic",
    name: "The Deceptive Cadence",
    formula: "I – IV – V – vi",
    tag: "Emotional Twist",
    tagClass: "tag-lilac",
    bars: ["I", "IV", "V", "vi"],
    whyItWorks: "After **I – IV – V**, your brain is 100% wired to expect a triumphant **I** major arrival. The leading tone still resolves to C — yet underneath, the bass drops an **A** instead of C (giving **A Minor**). Instant spine-tingling surprise!",
    songs: [
      "“Hallelujah” – Leonard Cohen (right on “the minor fall, the major lift…”)",
      "“Livin’ on a Prayer” – Bon Jovi",
      "Major film-score climaxes (Hans Zimmer, John Williams)"
    ]
  },
  {
    id: "mario-cadence",
    category: "epic",
    name: "The “Mario Cadence” (Victory Fanfare)",
    formula: "I – bVI – bVII – I",
    tag: "Video Game Fanfare",
    tagClass: "tag-peach",
    bars: ["I", "bVI", "bVII", "I"],
    whyItWorks: "Two bold major chords borrowed straight from parallel minor — **bVI (Ab Major)** and **bVII (Bb Major)** — stride upward in whole steps (**Ab → Bb → C**), delivering an immediate rush of victory, adventure, and level-cleared triumph!",
    songs: [
      "“Super Mario Bros.” – Level Clear Fanfare (Nintendo)",
      "“With a Little Help from My Friends” – The Beatles / Joe Cocker (ending)",
      "“P.S. I Love You” – The Beatles & classic arena-rock outros"
    ]
  },
  {
    id: "mixolydian-rock",
    category: "epic",
    name: "The Stadium-Rock Cadence (Mixolydian)",
    formula: "I – bVII – IV – I",
    tag: "Rock & Swagger",
    tagClass: "tag-sage",
    bars: ["I", "bVII", "IV", "I"],
    whyItWorks: "No classical leading tone, no textbook stiffness: swapping V for **bVII (Bb Major in C)** gives the tonic an earthy, rebellious Mixolydian rock strut. You drop effortlessly a whole step from **I** to **bVII** and roll powerfully home through **IV**.",
    songs: [
      "“Sweet Child o’ Mine” – Guns N’ Roses",
      "“Sympathy for the Devil” – The Rolling Stones",
      "“Hey Jude” – The Beatles (chorus vamp)",
      "“Royals” – Lorde"
    ]
  },
  {
    id: "andalusian",
    category: "epic",
    name: "The Andalusian Cadence",
    formula: "vi – V – IV – III7",
    tag: "Flamenco & Drama",
    tagClass: "tag-peach",
    bars: ["vi", "V", "IV", "III7"],
    whyItWorks: "Centuries of passion in four chords: the bass walks relentlessly down step by step (**A → G → F → E**) before lighting up on the fiery major dominant **E7 (III7)**, snapping attention sharply back to repeat the cycle.",
    songs: [
      "“Hit the Road Jack” – Ray Charles",
      "“Smooth Criminal” – Michael Jackson",
      "“Sultans of Swing” – Dire Straits (verse ending)",
      "“Stairway to Heaven” – Led Zeppelin (rock finale)"
    ]
  },
  {
    id: "jazz251",
    category: "jazz",
    name: "The Jazz ii–V–I Turnaround",
    formula: "ii – V7 – I – I",
    tag: "Jazz & Soul",
    tagClass: "tag-sage",
    bars: ["ii", "V7", "I", "I"],
    whyItWorks: "In jazz and soul, the warm minor supertonic (**ii**, Dm in C) steps in for IV. Moving **ii → V7 → I** drops the bass by a pure 5th at every chord change (D → G → C) — the strongest natural root motion in Western harmony.",
    songs: [
      "“Sunday Morning” – Maroon 5 (almost the entire song is ii – V7 – I!)",
      "“Autumn Leaves” – Jazz Standard",
      "“Fly Me to the Moon” – Frank Sinatra"
    ]
  },
  {
    id: "jazz1625",
    category: "jazz",
    name: "The Swing Standard (I–vi–ii–V)",
    formula: "Imaj7 – vi – ii – V7 – Imaj7",
    tag: "Swing & Standards",
    tagClass: "tag-lilac",
    bars: ["Imaj7", "vi", "ii", "V7", "Imaj7"],
    whyItWorks: "The grown-up jazz cousin of ’50s doo-wop: adding the major 7th to **Imaj7 (Cmaj7)** gives home a velvety shimmer before **vi → ii → V7** glides smoothly around the circle of fifths.",
    songs: [
      "“I Got Rhythm” – George Gershwin (Rhythm Changes)",
      "“Blue Moon” – Richard Rodgers",
      "“Heart and Soul” – Hoagy Carmichael"
    ]
  },
  {
    id: "tritonesub",
    category: "jazz",
    name: "The Tritone Substitution",
    formula: "ii – bII7 – I – I",
    tag: "Jazz Secret Weapon",
    tagClass: "tag-peach",
    bars: ["ii", "bII7", "I", "I"],
    whyItWorks: "How can **Db7 (bII7)** replace **G7 (V7)** in C Major? Because both chords share the exact same **tritone** guide tones (**F and B/Cb**)! Meanwhile, the bass slides chromatically straight down to home: **D → Db → C**.",
    songs: [
      "“The Girl from Ipanema” – Antônio Carlos Jobim",
      "Signature closing turns in lo-fi hip-hop, neo-soul, and gospel"
    ]
  },
  {
    id: "blues12",
    category: "jazz",
    name: "The Dominant Blues Cadence",
    formula: "I7 – IV7 – I7 – V7 – IV7 – I7",
    tag: "Blues & Rock’n’Roll",
    tagClass: "tag-peach",
    bars: ["I7", "IV7", "I7", "V7", "IV7", "I7"],
    whyItWorks: "Classical harmony reserves Dominant 7th chords solely for V. The blues throws that rule out the window and spices every main chord (**I7, IV7, V7**) with the gritty clash between major 3rd and flat 7th — pure blues attitude.",
    songs: [
      "“Johnny B. Goode” – Chuck Berry",
      "“Hound Dog” – Elvis Presley",
      "“Sweet Home Chicago” – Robert Johnson / The Blues Brothers"
    ]
  }
];

const SOLFEGE_STEPS_EN = [
  {
    syllable: "Do",
    degree: "1st Degree (Tonic Root)",
    semitones: 0,
    resolvePath: [0],
    resolveDesc: "Already resting at home on Tonic (Do repeats to confirm stability)",
    color: "sage",
    character: "Rock solid, peaceful, arrival home",
    desc: "Every other scale degree borrows its tension solely from its relationship to Do. When a melody settles onto Do, your ear exhales."
  },
  {
    syllable: "Re",
    degree: "2nd Degree (Supertonic)",
    semitones: 2,
    resolvePath: [2, 0],
    resolveDesc: "Resolves downward to Tonic: Re → Do",
    color: "peach",
    character: "Floating, inquisitive, in motion",
    desc: "Re sits comfortably between Do and Mi. Stopping a phrase on Re sounds open and questioning — it naturally leans one step down into Do."
  },
  {
    syllable: "Mi",
    degree: "3rd Degree (Major 3rd)",
    semitones: 4,
    resolvePath: [4, 2, 0],
    resolveDesc: "Steps gently down the scale: Mi → Re → Do",
    color: "sage",
    character: "Warm, luminous, comforting, stable",
    desc: "Mi defines the major quality of the key. Heading back home, it glides peacefully through Re down to the tonic Do."
  },
  {
    syllable: "Fa",
    degree: "4th Degree (Subdominant)",
    semitones: 5,
    resolvePath: [5, 4, 2, 0],
    resolveDesc: "Resolves downward to Tonic: Fa → Mi → Re → Do",
    color: "peach",
    character: "Weighty, serious, pulled downward",
    desc: "Fa sits just a single half step above Mi! That tight semitone creates strong downward gravity: Fa drops into Mi first and walks home through Re to Do."
  },
  {
    syllable: "Sol",
    degree: "5th Degree (Dominant)",
    semitones: 7,
    resolvePath: [7, 9, 11, 12],
    resolveDesc: "Climbs upward to upper Tonic: Sol → La → Ti → Do",
    color: "sage",
    character: "Radiant, open, strong, second anchor",
    desc: "From Sol upward, the upper half of the octave climbs toward high Do (Sol → La → Ti → Do)."
  },
  {
    syllable: "La",
    degree: "6th Degree (Relative Minor Root)",
    semitones: 9,
    resolvePath: [9, 11, 12],
    resolveDesc: "Climbs upward to upper Tonic: La → Ti → Do",
    color: "lilac",
    character: "Lyrical, tender, a touch bittersweet",
    desc: "La is also the root of the relative minor key. In functional major listening, La rises through the leading tone Ti into bright upper Do."
  },
  {
    syllable: "Ti",
    degree: "7th Degree (Leading Tone)",
    semitones: 11,
    resolvePath: [11, 12],
    resolveDesc: "Direct leading-tone resolution up: Ti → Do",
    color: "peach",
    character: "Magnetic, urgent, yearning upward",
    desc: "Ti leans just one semitone beneath upper Do. No other note in the scale craves resolution as intensely as Ti → Do!"
  }
];

const KNOWLEDGE_ARTICLES_EN = [
  {
    id: "art-why-ear-training",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a6 6 0 1 1 11.4 2.5c-.6 1.3-1.4 1.9-1.9 3.1-.4 1-.5 2.4-1.7 3.2A2.5 2.5 0 0 1 10 15"/><path d="M10.5 8.5a2.2 2.2 0 0 1 4 1.2c0 .9-.6 1.4-1 2.2"/><path d="M19.5 6.5a8 8 0 0 1 0 7"/></svg>`,
    badgeClass: "badge-sage",
    title: "Why Train Your Ear?",
    subtitle: "What trained ears unlock, who it helps most, and how to begin",
    tag: "Foundations & Motivation",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Why Ear Training?</span>
        <h2>The Bridge Between Your Imagination and Your Music</h2>
        <p class="article-lead">
          You’ve probably felt this before: you hear a catchy melody in your head or play a favorite track, yet at your instrument you fumble around searching for the right notes. <strong>Ear training</strong> wires those two worlds together so patterns, harmonic tension, and groove make instant sense by sound.
        </p>

        <h3>What Concrete Skills Does Ear Training Give You?</h3>
        <ul class="article-steps-list">
          <li><strong>Pick up melodies &amp; songs by ear faster:</strong> Instead of trial-and-error guessing every single note, you recognize leaps (<em>“That’s a Perfect 5th up!”</em>) and familiar progressions (<em>“That’s I–V–vi–IV!”</em>).</li>
          <li><strong>Play freer, improvise &amp; write songs:</strong> Once you recognize how a Subdominant, leading tone, or syncopation feels, jamming, songwriting, and DAW arranging flow straight from your ideas.</li>
          <li><strong>Better pitch &amp; tighter ensemble locking:</strong> You notice sooner whether you’re truly in tune, how two voices blend, and where the pocket sits inside a band.</li>
          <li><strong>Hear sheet music &amp; chord charts silently in your mind:</strong> Lead sheets stop being ink on paper — you hear what comes next before you ever play a key.</li>
        </ul>

        <h3>Who Benefits From This Training?</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Beginners &amp; Curious Listeners (Ages 8+)</h5>
            <p>You don’t need years of formal lessons or fluent sight-reading. Learn through curious listening and direct comparison, building real musical intuition from day one.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Instrumentalists &amp; Singers</h5>
            <p>Great if you play guitar, piano, winds, or sing and want to rely less on sheet music while tuning deeper into band and choir harmony.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>Songwriters, Beatmakers &amp; Producers</h5>
            <p>Sharpens DAW workflow for spotting chord loops, bass movement, drum grooves, and frequency balance across kick, snare, and percussion.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Advanced Musicians &amp; Exam Prep</h5>
            <p>Work up to tritone substitutions, all chromatic intervals, odd meters, surgical pink-noise EQ bands, and key changes in Solfège.</p>
          </div>
        </div>

        <h3>The Biggest Myth: Do You Need “Perfect Pitch”?</h3>
        <p>
          <strong>Not at all!</strong> Absolute/perfect pitch (naming an isolated note with zero context) is rare — and barely needed in everyday music-making. Almost all real music thrives on <strong>relative (functional) pitch</strong>: how pitches and chords behave <em>in relation to each other</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Instant Proof: Your Ear Already Hears Context</h4>
          <p>Whether in C Major or F Major, as soon as a key is set, your ear naturally feels the Dominant’s urge (<strong>V</strong>) and the relief of coming home to Tonic (<strong>I</strong>):</p>
          <button class="btn-tool" data-play-progression="I,IV,V7,I">▶ Hear Authentic Cadence (I – IV – V7 – I)</button>
        </div>

        <h3>How to Improve Steadily (The 10-Minute Habit)</h3>
        <ul class="article-steps-list">
          <li><strong>Short and frequent wins:</strong> 5 to 10 focused minutes four times a week beats one two-hour Sunday marathon every time.</li>
          <li><strong>Engage your body:</strong> Hum the target pitch softly, tap the pulse with your foot, and always use the <strong>A/B Compare</strong> buttons after a miss.</li>
          <li><strong>Curiosity over pressure:</strong> Every wrong guess teaches just as much as a bullseye — side-by-side comparison is what rewires your ear.</li>
        </ul>
      </div>
    `
  },
  {
    id: "art-talking-about-music",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9.5 10v3"/><path d="M12.5 8.5v6"/><path d="M15.5 10.5v2"/></svg>`,
    badgeClass: "badge-peach",
    title: "How Do We Talk About Music?",
    subtitle: "Sharing feelings, imagery & impressions simply — zero music theory needed",
    tag: "Listening & Dialogue",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Perception &amp; Expression</span>
        <h2>Talking About Music Without Notes, Chords, or Jargon</h2>
        <p class="article-lead">
          A piece of music moves you, puts you on edge, or paints a vivid scene in your mind — yet the second someone asks, <em>“So what did you think?”</em>, all that comes out is a helpless <em>“Kind of nice”</em> or <em>“Not really my thing.”</em> Why is putting musical experience into words so tricky — and how do we make it effortless?
        </p>

        <p>
          Many people hold back because they assume you need note names, theory labels, or instrument trivia just to join the conversation. You don’t. Whether you’re chatting with friends, sitting in a lesson, or singing in a rehearsal, good dialogue rarely needs the technical <strong>why</strong>. What matters is the <strong>what</strong>: What lands in your ears? What shifts inside your body? How does the sound evolve from start to finish?
        </p>

        <div class="k-song-ref">
          <strong>Worth remembering:</strong> Even seasoned conductors, film composers, studio engineers, and choir directors rely heavily on <em>sensory imagery and physical metaphors</em> every day. Saying <em>“The opening feels like thick fog, then halfway through a window suddenly opens”</em> communicates far more than dry technical labels.
        </div>

        <h3>1. The Golden Shift: From Judgment to Perception</h3>
        <p>
          Blanket verdicts like <em>“boring”</em>, <em>“weird”</em>, or <em>“amazing”</em> shut conversations down because they tell the other person nothing about what actually reached you. Sharing a <strong>perception</strong> opens the door instead. This simple 3-step bridge works anywhere:
        </p>
        <ul class="article-steps-list">
          <li><strong>Where in the piece?</strong> Anchor the moment in time: <em>“Right at the start”</em>, <em>“When it swells in the middle”</em>, <em>“Just before the ending”</em>, or <em>“At that sudden drop.”</em></li>
          <li><strong>What hits me there?</strong> Speak gently from your own experience: <em>“To me it feels…”</em>, <em>“My ears notice…”</em>, <em>“Right there I feel a pull…”</em></li>
          <li><strong>What everyday image matches?</strong> Borrow ordinary words from space, light, touch, or motion: <em>“tight”</em>, <em>“warm”</em>, <em>“rushed”</em>, <em>“like finally exhaling.”</em></li>
        </ul>

        <h3>2. Six Everyday Dimensions of Listening</h3>
        <p>
          You don’t need a thick glossary. Almost anything you experience while listening fits cleanly into six sensory areas everyone instinctively understands:
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>A. Mood &amp; Emotional Shade</h5>
            <p>Look just past plain “happy vs. sad”: Does it feel <em>comforting, wistful, yearning, proud, playful, restless, fragile, solemn, wry, grounded, reconciling</em>, or <em>bittersweet</em>? Naming mixed feelings works wonders: <em>“Bright on the surface, yet tired underneath.”</em></p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>B. Space, Closeness &amp; Density</h5>
            <p>How crowded or intimate does the moment feel? Helpful contrasts: <em>tight, packed, heavy, crowded, dense</em> vs. <em>wide, airy, transparent, sparse, delicate</em> — or <em>whisper-close at your ear</em> vs. <em>distant, echoing across a vast hall</em>.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>C. Color, Temperature &amp; Texture</h5>
            <p>Imagine touching or seeing the sound: Is it <em>warm, golden, velvety, matte, earthy, smoky, soft</em> — or <em>cool, glassy, silvery, bright, glaring, sharp, grainy, brittle, metallic</em>? Weight helps too: <em>anchored like stone</em> vs. <em>feather-light</em>.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>D. Motion, Energy &amp; Pull</h5>
            <p>Notice how your body wants to respond: <em>driving forward, bouncing, dragging, stumbling, swaying, circling, breathless, laid-back, hesitant</em>. Ask: <em>Does it push me ahead, rock gently, or stop time altogether?</em></p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>E. Arc, Tension &amp; Breath</h5>
            <p>Music tells a tiny unfolding story: <em>gathering momentum, waiting, tipping point, sudden release, retreat, lingering echo, an unanswered question, coming home</em>. Phrases like <em>“I hold my breath there”</em> or <em>“the weight drops away”</em> always land clearly.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>F. How Voices Interact</h5>
            <p>Even without naming instruments, you can describe roles: <em>“One line steps forward to speak while the rest forms a soft cushion”</em>, <em>“like tossing a ball back and forth”</em>, <em>“moving as one solid block”</em>, or <em>“talking past each other.”</em></p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Sound Check: Hear Contrasting Words Directly</h4>
          <p>Ignore theory for ten seconds — just notice which <strong>everyday sensation</strong> pops into your mind on each pair:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-dense">▶ Tight &amp; crowded</button>
            <button class="btn-tool" data-play-custom="talk-open">▶ Wide &amp; airy</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-warm">▶ Warm &amp; cushioned</button>
            <button class="btn-tool" data-play-custom="talk-sharp">▶ Bright &amp; pointed</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-drive">▶ Driving ahead</button>
            <button class="btn-tool" data-play-custom="talk-float">▶ Floating &amp; still</button>
          </div>
        </div>

        <h3>3. What Helps Conversations Flow — and What Blocks Them</h3>
        <p>
          Certain habits quietly stall musical dialogue or trigger misunderstandings — especially between listeners with different backgrounds.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Unhelpful &amp; Blocking</h5>
            <p><strong>Empty pass/fail labels:</strong> “Good / bad / cheap / professional / unmusical.” They pass a verdict while leaving others guessing what you actually heard.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Clear &amp; Inviting</h5>
            <p><strong>Describe the shift:</strong> “The gentle start drew me right in, though halfway through it started feeling a bit rushed and glaring to me.”</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Guesswork Buzzwords</h5>
            <p>Dropping words like “wrong”, “atonal”, “clipping”, or “too dynamic” when you really mean “it rubs harshly”, “feels too harsh”, or “misses warmth” — pros often attach strict technical meanings to those terms.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Honest Everyday Imagery</h5>
            <p>Stay natural: “I don’t know the fancy term, yet right there it feels like two edges rubbing together before softening out again.”</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Personal Attacks &amp; Stereotypes</h5>
            <p>“No feeling at all” or “Sounds like elevator music / pure commercial fluff.” Putting labels on people or genres shuts curiosity down immediately.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Name the Texture &amp; Contrast</h5>
            <p>“For me the passage flows so smoothly and evenly that I find myself wishing for one small surprise or rough edge to grab onto.”</p>
          </div>
        </div>

        <h3>4. Phrase Translator: From “Sort Of…” to Vivid Clarity</h3>
        <p>
          Often you’re just one concrete image away from turning a vague hunch into something everyone gets right away:
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Instead of: “Sounds kinda weird / off.”</strong>
              <span>Try: “Something rubs uncomfortably for me there — restless, almost like briefly losing balance.”</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Instead of: “Super boring.”</strong>
              <span>Try: “It stays in the exact same emotional room for a long stretch; I keep waiting for a spark or shift.”</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Instead of: “Just awesome!”</strong>
              <span>Try: “That transition opens out so wide it feels like finally stepping into fresh air.”</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Instead of: “It’s somehow too fast.”</strong>
              <span>Try: “To me things pile on top of each other there — it feels hurried even if the beat stays steady.”</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Instead of: “Too loud / annoying!”</strong>
              <span>Try: “In the louder passage everything crowds together and feels bright and piercing on my ears.”</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Instead of: “Just sad music.”</strong>
              <span>Try: “Not tragic — more quiet, reflective, and softly comforting, like dusk settling in.”</span>
            </div>
          </div>
        </div>

        <h3>5. Everyday Tips by Situation</h3>
        <ul class="article-steps-list">
          <li><strong>After a concert or listening with friends:</strong> Swap <em>“Did you like it?”</em> for warmer prompts like <em>“Which moment stayed with you?”</em>, <em>“What weather or movie scene fits that piece?”</em>, or <em>“Where did it grab you — and where did you drift away?”</em></li>
          <li><strong>In choir, band, or lessons:</strong> Reflect what is already working before asking for change (<em>“The opening sounds wonderfully hush and intimate — on the return I’d love even more glow and lift”</em>). And as a learner, never hesitate to say <em>“It feels tight / heavy / rushed to me there”</em> — great teachers can translate that sensory clue straight into helpful action.</li>
          <li><strong>When two listeners hear completely different things:</strong> Where you feel <em>peace</em>, someone else may hear <em>loneliness</em>. Personal memories, mood, and background always listen alongside our ears — comparing those honest impressions is what makes talking about music rich.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Pocket Cheat Sheet (4 Easy Questions Anywhere)</h4>
          <p>Whenever words run dry, pick just <strong>one</strong> of these four lenses:</p>
          <ul class="article-steps-list">
            <li><strong>Color &amp; Mood:</strong> Warm, soft, and dark — or bright, cool, and crisp?</li>
            <li><strong>Space:</strong> Tight and close-up — or wide, open, and airy?</li>
            <li><strong>Motion:</strong> Pushing forward, swaying, stumbling — or floating still?</li>
            <li><strong>Turning Point:</strong> Which single moment flips the feeling of the piece?</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "art-4chords",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
    badgeClass: "badge-peach",
    title: "The 4-Chord Phenomenon",
    subtitle: "Why hundreds of chart hits lean on the exact same four chords",
    tag: "Cadences & Pop",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Harmony in Pop Music</span>
        <h2>Why Do 4 Chords Fuel 1,000 World Hits?</h2>
        <p class="article-lead">
          From The Beatles (<em>Let It Be</em>) to Toto (<em>Africa</em>), Adele (<em>Someone Like You</em>), Green Day, and Taylor Swift — one formula turns up everywhere: <strong>I – V – vi – IV</strong>.
        </p>

        <div class="article-highlight-box">
          <h4>Hear the formula straight away (in C Major: C – G – Am – F):</h4>
          <p>Listen to how the emotional color shifts from bar to bar:</p>
          <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Play Pop Progression (I – V – vi – IV)</button>
        </div>

        <h3>The Psychology Inside Those Four Bars</h3>
        <ul class="article-steps-list">
          <li>
            <strong>Bar 1 – Tonic (I):</strong> Everything starts clear, grounded, and unmistakable. We immediately know where home is.
          </li>
          <li>
            <strong>Bar 2 – Dominant (V):</strong> Opens the horizon and adds crisp forward motion.
          </li>
          <li>
            <strong>Bar 3 – Relative Minor (vi):</strong> Here’s the emotional turn! Instead of heading straight back home, the harmony detours via a <em>deceptive cadence</em>, blending warm nostalgia into the chorus.
          </li>
          <li>
            <strong>Bar 4 – Subdominant (IV):</strong> Rather than closing the door, bar 4 stays open like a deep breath — launching seamlessly straight back into bar 1!
          </li>
        </ul>

        <div class="article-highlight-box">
          <h4>Rotating the Starting Point</h4>
          <p>
            Many producers keep those exact four chords yet start the loop on chord #3 (the relative minor: <strong>vi – IV – I – V</strong>). Instantly the loop turns darker, moodier, and more dramatic (just like Linkin Park’s <em>Numb</em> or Eagle-Eye Cherry’s <em>Save Tonight</em>):
          </p>
          <button class="btn-tool" data-play-progression="vi,IV,I,V">▶ Compare Minor-Start Loop (vi – IV – I – V)</button>
        </div>
      </div>
    `
  },
  {
    id: "art-gravity",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v7a6 6 0 0 0 12 0V4"/><line x1="4" y1="4" x2="8" y2="4"/><line x1="16" y1="4" x2="20" y2="4"/><line x1="6" y1="8" x2="8" y2="8"/><line x1="16" y1="8" x2="18" y2="8"/></svg>`,
    badgeClass: "badge-sage",
    title: "Musical Magnetism: Leading Tone & Tritone",
    subtitle: "How two half steps make your brain crave resolution",
    tag: "Tension & Release",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Harmonic Gravity</span>
        <h2>Why Does Music Pull Us Home Like Gravity?</h2>
        <p class="article-lead">
          When we listen to tonal music, we don’t hear pitches as isolated dots — we feel magnetic forces between them. Two tiny half-step mechanisms do most of the heavy lifting.
        </p>

        <h3>1. The Leading Tone (7 → 1)</h3>
        <p>
          In a major scale, just one single semitone separates the 7th degree (<strong>B</strong> in C Major) from the upper Tonic (<strong>C</strong>). Play a scale from C up to B and stop right there, and your ear practically demands the final note:
        </p>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="scale-unresolved">▶ Scale Stopping on B (Unresolved!)</button>
          <button class="btn-tool" data-play-custom="leading-tone">▶ Hear Resolution B → C</button>
        </div>

        <h3>2. The Tritone Collapse (V7 → I)</h3>
        <p>
          Add the minor 7th (<strong>F</strong>) to the Dominant chord (G Major) to form <strong>G7</strong>, and suddenly two notes clash across a <strong>tritone</strong>:
        </p>
        <ul class="article-steps-list">
          <li><strong>B</strong> (7th degree) wants to pull up a half step to <strong>C</strong>.</li>
          <li><strong>F</strong> (4th degree) wants to melt down a half step to <strong>E</strong>.</li>
        </ul>
        <div class="article-highlight-box">
          <h4>Hear both guide tones collapse inward:</h4>
          <p>First F and B ring together in sharp tension, then they squeeze inward onto E and C (pure release):</p>
          <button class="btn-tool" data-play-custom="tritone-collapse">▶ Hear Tritone Collapse (F+B → E+C)</button>
        </div>
      </div>
    `
  },
  {
    id: "art-minor-plagal",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "The Goosebump Move: Minor iv → I",
    subtitle: "From The Beatles to Radiohead & Disney: major harmony turns bittersweet",
    tag: "Songwriting Secret",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Harmonic Color</span>
        <h2>Pop Music’s Most Heartfelt Chord Change?</h2>
        <p class="article-lead">
          Picture a sunny summer afternoon (major Tonic <strong>I</strong>), a bright cloud drifting across (Subdominant <strong>IV</strong>) — and for one poignant moment the light turns golden and nostalgic before sunshine returns.
        </p>

        <h3>What Happens in IV → iv → I?</h3>
        <p>
          In C Major, the Subdominant is an <strong>F Major triad (F – A – C)</strong>. Lower its middle note <strong>A</strong> down a half step to <strong>Ab</strong> and it turns into <strong>F Minor (iv)</strong>. That borrowed <strong>Ab</strong> comes from C parallel minor and glides seamlessly downward onto <strong>G</strong> in C Major (creating a velvety chromatic line: <strong>A → Ab → G</strong>).
        </p>

        <div class="article-highlight-box">
          <h4>Hear the side-by-side comparison:</h4>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="plagal-major">▶ Standard: C – F – C</button>
            <button class="btn-tool" data-play-custom="plagal-minor">▶ Minor Trick: C – F – Fm – C</button>
          </div>
        </div>

        <h3>Iconic Songs Built Around This Move</h3>
        <ul class="article-steps-list">
          <li><strong>The Beatles – “In My Life”</strong> (on “I’ll remember you”) and <strong>“Blackbird”</strong></li>
          <li><strong>Radiohead – “Creep”</strong> (the entire verse and chorus loop: G – B – C – Cm)</li>
          <li><strong>Oasis – “Don’t Look Back in Anger”</strong> (right at the tail of the pre-chorus)</li>
          <li><strong>Green Day – “Wake Me Up When September Ends”</strong></li>
          <li>Countless golden-age <strong>Disney &amp; Pixar finales</strong></li>
        </ul>
      </div>
    `
  },
  {
    id: "art-physics-waves",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2.5-6 5.5-6 8 0s5.5 6 8 0 3.5-3 4-2"/></svg>`,
    badgeClass: "badge-sage",
    title: "Consonance & Dissonance: Dancing Sound Waves",
    subtitle: "From ratio simplicity to critical bandwidth and musical context",
    tag: "Physics & Acoustics",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Physics &amp; Psychoacoustics</span>
        <h2>Dissonance Isn’t “Wrong” — It’s Forward Motion!</h2>
        <p class="article-lead">
          Many beginners treat <strong>consonance</strong> as “pretty” and <strong>dissonance</strong> as “broken.” In truth, they are the yin and yang of storytelling in sound: consonance means <em>resting and arrival</em>, while dissonance is <em>propulsion, spice, and desire</em>.
        </p>

        <div class="article-highlight-box">
          <h4>Quick Listening Test: Tension Needs Release</h4>
          <p>First hear pure static consonance — then hear suspended friction unlocking cleanly into home:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-progression="I,I,I">▶ Pure Consonance Only (Static)</button>
            <button class="btn-tool" data-play-progression="I,IV,Vsus4,V7,I">▶ Friction → Resolution</button>
          </div>
        </div>

        <h3>1. Not Black &amp; White: The 4-Level Spectrum</h3>
        <p>
          Pythagoras discovered on a divided string: the smaller the whole numbers in a frequency ratio, the more seamlessly two pitches fuse together. Theory groups intervals into four vivid shades:
        </p>

        <div class="spectrum-list">
          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>1. Perfect Consonance (Complete Fusion)</span>
              <span>1:1 · 2:1 · 3:2</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill sage" style="width:96%"></div></div>
            <div class="spectrum-sub">Octave (2:1), Perfect 5th (3:2) &amp; Perfect 4th (4:3): So pure and locked together that you almost hear one compound sound — built for power chords, drones, and resonant endings.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="P8">▶ Octave (2:1)</button>
              <button class="btn-tool" data-play-interval-harm="P5">▶ 5th (3:2)</button>
              <button class="btn-tool" data-play-interval-harm="P4">▶ 4th (4:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>2. Imperfect Consonance (Warm &amp; Colorful)</span>
              <span>5:4 · 6:5 · 5:3</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill lilac" style="width:74%"></div></div>
            <div class="spectrum-sub">Major &amp; minor 3rds and 6ths: enough independence to shine with warm major or minor emotion. Fun fact: early medieval theorists actually treated 3rds as dissonances before the Renaissance made them harmony’s heart!</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M3">▶ Maj 3rd (5:4)</button>
              <button class="btn-tool" data-play-interval-harm="m3">▶ Min 3rd (6:5)</button>
              <button class="btn-tool" data-play-interval-harm="M6">▶ Maj 6th (5:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>3. Soft Dissonance (Smooth Motion &amp; Soul)</span>
              <span>9:8 · 16:9</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill peach" style="width:45%"></div></div>
            <div class="spectrum-sub">Major 2nd and minor 7th add gentle, mobile rubbing — essential to blues, soulful R&amp;B, and rich jazz 7th chords.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M2">▶ Maj 2nd (9:8)</button>
              <button class="btn-tool" data-play-interval-harm="m7">▶ Min 7th (16:9)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>4. Sharp Dissonance (High Energy &amp; Roughness)</span>
              <span>16:15 · 15:8 · 45:32</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill red" style="width:20%"></div></div>
            <div class="spectrum-sub">Minor 2nd, major 7th, and tritone collide with fast acoustic beating — like the Jaws shark circling or a leading tone leaning urgently into home.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="TT">▶ Tritone (45:32)</button>
              <button class="btn-tool" data-play-interval-harm="M7">▶ Maj 7th (15:8)</button>
              <button class="btn-tool" data-play-interval-harm="m2">▶ Min 2nd (16:15)</button>
            </div>
          </div>
        </div>

        <h3>2. What Happens Biologically Inside Your Ear?</h3>
        <ul class="article-steps-list">
          <li><strong>Critical Bandwidth (Cochlea):</strong> Along your inner ear’s basilar membrane, frequency sensors lie side by side. When two notes crowd within roughly 15–20% of each other in Hz, they excite the same hair cells simultaneously — creating perceived “roughness.”</li>
          <li><strong>The Low-End Mud Trap (Lower Interval Limit):</strong> In the deep bass, frequencies sit much closer in raw Hertz! Between <code>C2</code> (65 Hz) and <code>E2</code> (82 Hz) there’s only 17 Hz — so a normally “sweet” Major 3rd blurs into the same critical band and sounds muddy. Move up to the middle register (<code>C4 + E4</code>, 67 Hz apart) and it blooms cleanly.</li>
          <li><strong>Clashing Overtones (Helmholtz Effect):</strong> Every natural tone carries softer overtones. In <code>C4 + B4</code> (Major 7th), the 1st harmonic of C4 is <code>C5</code> — grinding just one semitone above <code>B4</code>!</li>
        </ul>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Tight &amp; Gritty (Low Register)</h5>
            <p>Two pitches squeeze into the same critical band in the inner ear:</p>
            <button class="btn-tool" data-play-freqs="65.41,82.41" data-osc="triangle" data-dur="1.8">▶ Maj 3rd in Bass (C2+E2)</button>
            <button class="btn-tool" data-play-freqs="65.41,69.30" data-osc="triangle" data-dur="1.8">▶ Min 2nd in Bass (C2+Db2)</button>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Open &amp; Clear (Mid / Wide Voicing)</h5>
            <p>The very same interval separates crisply when lifted or spread apart:</p>
            <button class="btn-tool" data-play-freqs="261.63,329.63" data-osc="triangle" data-dur="1.8">▶ Maj 3rd in Midrange (C4+E4)</button>
            <button class="btn-tool" data-play-freqs="130.81,554.37" data-osc="triangle" data-dur="1.8">▶ Wide Compound (C3+Db5)</button>
          </div>
        </div>

        <h3>3. Context Magic: Turning Friction Into Luster</h3>
        <p>
          Whether a pitch sounds biting or gorgeous depends just as much on harmonic context as on raw physics. Play two notes bare, then hear that exact interval framed inside a full chord:
        </p>

        <div class="article-highlight-box">
          <h4>Experiment: The Major 7th C + B (15 : 8)</h4>
          <p>Exposed by itself, <strong>C4 + B4</strong> bites sharply. Tuck E4 and G4 inside (forming <strong>Cmaj7</strong>), and your ear hears rich overtone support — transforming edge into golden jazz warmth!</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="isol-maj7">▶ Isolated: C4 + B4</button>
            <button class="btn-tool" data-play-custom="chord-maj7">▶ In Context: Cmaj7 (C–E–G–B)</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-song-tricks",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    badgeClass: "badge-peach",
    title: "Best Song Cues for Recognizing Intervals",
    subtitle: "From the Jaws motif to Star Wars and The Simpsons",
    tag: "Practice Guide",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Memory Anchors</span>
        <h2>Spot Intervals Instantly With Famous Openings</h2>
        <p class="article-lead">
          The fastest mental shortcut for identifying any leap is anchoring it to the first two notes of an unforgettable melody. Here is your ascending cheat sheet:
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Minor 2nd (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m2") : "m2"})</strong>
              <span>Jaws Theme / Pink Panther</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m2">▶ Listen</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Major 2nd (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M2") : "M2"})</strong>
              <span>Happy Birthday / Frère Jacques</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M2">▶ Listen</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Minor 3rd (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m3") : "m3"})</strong>
              <span>Seven Nation Army / Greensleeves</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m3">▶ Listen</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Major 3rd (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M3") : "M3"})</strong>
              <span>When the Saints / Morning Has Broken</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M3">▶ Listen</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Perfect 4th (P4)</strong>
              <span>Harry Potter / Here Comes the Bride</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P4">▶ Listen</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tritone (TT)</strong>
              <span>The Simpsons (“The Simp-sons”) / Maria</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="TT">▶ Listen</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Perfect 5th (P5)</strong>
              <span>Star Wars / Twinkle, Twinkle, Little Star</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P5">▶ Listen</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Major 6th (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M6") : "M6"})</strong>
              <span>My Bonnie Lies Over the Ocean</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M6">▶ Listen</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Perfect Octave (P8)</strong>
              <span>Somewhere Over the Rainbow</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P8">▶ Listen</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-functional",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Relative vs. Perfect Pitch",
    subtitle: "Why hearing harmonic roles beats raw note-naming every day",
    tag: "Method",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Listening Philosophy</span>
        <h2>Why Relationships Matter More Than Raw Frequencies</h2>
        <p class="article-lead">
          People often assume a “good ear” means hearing a clinking coffee mug and shouting “F#!” (so-called <em>perfect/absolute pitch</em>). In real musical life, emotion comes from harmonic function instead.
        </p>

        <h3>A Pitch Has No Emotion in Isolation</h3>
        <p>
          The very same note <strong>E</strong> sounds warm, bright, and serene inside <strong>C Major</strong> (because there it plays the relaxed Major 3rd, <em>Mi</em>). Play that exact same <strong>E</strong> inside <strong>F Major</strong>, however, and suddenly it aches with upward urgency (because now it’s the Leading Tone, <em>Ti</em>!).
        </p>

        <div class="article-highlight-box">
          <h4>Aha Experiment: The Exact Same E4 in Two Roles</h4>
          <p>Hear the exact same target pitch <strong>E4</strong> twice — once after a C Major chord (calm arrival) and once after an F Major chord (restless lean):</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="context-c">▶ E4 in C Major (Relaxed Mi)</button>
            <button class="btn-tool" data-play-custom="context-f">▶ E4 in F Major (Urgent Ti)</button>
          </div>
        </div>

        <p>
          That’s why Lauscher builds <strong>functional (relative) listening</strong>: once your ear recognizes what <em>role</em> a pitch or chord plays inside a key, you can transpose that fluency instantly into all 12 keys!
        </p>
      </div>
    `
  },
  {
    id: "art-world-music-cultures",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Musical Systems of the World: 12 Tones, Microtonality & Culture",
    subtitle: "Why the Western piano is only one of humanity’s sonic universes",
    tag: "World Music & Acoustics",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Cultures, Tuning &amp; Microtonality</span>
        <h2>The 12-Tone Grid Is an Invention — Not a Law of Nature</h2>
        <p class="article-lead">
          If you grow up around pianos, guitars, or Western pop, 12 fixed semitones per octave can feel like the natural architecture of all music. Look across the globe, however, and you discover a radically richer picture: traditions that divide the octave into 22 or 53 subtle steps, bend pitches right through the cracks between piano keys, tune paired orchestra instruments with deliberate acoustic beating, or unfold hour-long dramas without a single Western chord progression.
        </p>

        <h3>1. The Western Compromise: Why We Slightly “Detuned” the Piano</h3>
        <p>
          In raw physics, the purest intervals vibrate in simple whole-number ratios (<em>Just Intonation</em>): a pure fifth beats at <code>3:2</code> (~701.96 cents) and a pure major third at <code>5:4</code> (386.31 cents). Stack twelve pure fifths on top of each other, though, and you do not land neatly seven octaves higher — you overshoot by about <strong>23.5 cents</strong> (the <em>Pythagorean comma</em>). On a fixed-key instrument, tuning one key in crystal-clear pure ratios makes distant keys sound painfully out of tune.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>The Western Choice (~1700 → Today)</h5>
            <p>After centuries of unequal <em>well-tempered</em> tunings (as in Bach, where every key kept its own personality), the West standardized <strong>12-Tone Equal Temperament (12-TET)</strong>: every semitone is mathematically locked to <code>100 cents</code>. The ear pays a subtle acoustic price — every major third is about <strong>+14 cents</strong> sharp and every fifth <strong>−2 cents</strong> narrow — in exchange for unlimited modulation across all 12 keys and towering multi-voice harmony (<em>vertical</em> architecture).</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>The Path of Many Global Traditions</h5>
            <p>Musics centered on masterful melodic storytelling (<em>horizontal</em> architecture) over a sustained reference pitch (<em>drone / bordun</em>) never need to modulate chords through all 12 keys. By avoiding equal-sized semitones, they keep ringingly pure overtones, unlock expressive micro-shades between Western notes, and build vast tonal worlds (<em>Maqamat</em>, <em>Ragas</em>, <em>Dastgāh</em>).</p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Listening Lab: Pure Natural Triad vs. Western 12-TET Piano</h4>
          <p>First listen to the acoustically pure major triad (<code>4:5:6</code> — fifth <code>3:2</code>, major third <code>5:4</code>), then immediately hear the same C major chord in equal temperament (12-TET). Notice the subtle shimmer inside the 12-TET major third!</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Pure Just Triad (4:5:6)</button>
            <button class="btn-tool" data-play-freqs="261.63,329.63,392.00" data-osc="triangle" data-dur="2.0">▶ Equal-Tempered 12-TET</button>
          </div>
        </div>

        <h3>2. What Does “Microtonality” Actually Mean? (Cents &amp; Commas)</h3>
        <p>
          To measure pitch outside the Western keyboard grid, acousticians split every octave into exactly <strong>1,200 cents</strong>. Each standard piano semitone equals <code>100 cents</code> — yet between those marks lies a vast expressive cosmos:
        </p>

        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>What Human Ears Can Detect</strong>
            In the mid-register, trained listeners reliably perceive pitch shifts as tiny as <strong>3 to 6 cents</strong> — especially against sustained drones through subtle beating or color changes.
          </div>
          <div class="physics-fact-item">
            <strong>Quarter-Tones &amp; Neutral Steps</strong>
            A true <strong>quarter-tone</strong> measures <code>50 cents</code>, while a neutral <strong>three-quarter-tone</strong> sits at <code>150 cents</code> — creating melodies that sound neither major-bright nor minor-sad, but deeply poised.
          </div>
          <div class="physics-fact-item">
            <strong>The Comma (~22–24 Cents)</strong>
            Turkish Makam theory divides a whole tone into <strong>9 Holdrian commas</strong> (~22.6 cents each) — forming an ultra-fine <strong>53-tone grid per octave</strong>!
          </div>
          <div class="physics-fact-item">
            <strong>Pitch as Motion, Not a Dot</strong>
            Across much of the world, a note is not a static key-press but a living gesture of slides, vibratos, and gravitational pulls around a focal pitch center.
          </div>
        </div>

        <h3>3. Arabic, Persian &amp; Turkish Traditions: Maqam, Makam &amp; Dastgāh</h3>
        <p>
          From Morocco through Cairo, Baghdad, and Tehran to Istanbul, classical art music lives not in chord progressions, but in deeply expressive melodic pathways: <strong>Maqamat</strong> (Arabic), <strong>Makamlar</strong> (Turkish), and <strong>Dastgāh-hā</strong> (Persian, featuring microtonal signs like <em>Koron</em> and <em>Sori</em>). Rather than treating a seven-note scale as static raw material, musicians compose with intimate 3- to 5-note building blocks called <strong>Jins</strong> (pl. <em>Ajnas</em>). A Maqam defines the tuning nuances, preferred melodic journey (<em>Sayr</em> — where the phrase begins, pivots, and resolves), and emotional ethos all at once.
        </p>
        <p>
          Its most iconic sonic signature is the <strong>neutral interval</strong> — especially the <em>neutral third</em> around <strong>350 cents</strong> (midway between a 300-cent minor third and a 400-cent major third!). On a Western piano, that pitch simply does not exist; on fretless instruments like the <em>Oud</em> or end-blown <em>Ney</em> flute, it radiates a luminous, bittersweet warmth that sits at the heart of centuries of repertoire.
        </p>

        <div class="article-highlight-box">
          <h4>Microtonal Lab: Three Thirds Side-by-Side (Maqam Rast &amp; Bayati)</h4>
          <p>Compare the same root with a Western major third (<code>400 ct</code>), an Arabic neutral third (<code>350 ct</code>), and a Western minor third (<code>300 ct</code>) — then explore <strong>Maqam Rast</strong> (using neutral 3rd &amp; 7th degrees) and the signature quarter-tone inflection of <strong>Maqam Bayati</strong>:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-maqam-contrast">▶ Major vs. Neutral vs. Minor 3rd</button>
            <button class="btn-tool" data-play-custom="culture-maqam-rast">▶ Maqam Rast (350 &amp; 1050 ct)</button>
            <button class="btn-tool" data-play-custom="culture-maqam-bayati">▶ Maqam Bayati (150-ct Turn)</button>
          </div>
        </div>

        <h3>4. South Asia (Pakistan &amp; India): Raga, 22 Shrutis, Tanpura &amp; Tala</h3>
        <p>
          In North Indian and Pakistani classical traditions — spanning <em>Khyal</em> vocal artistry, devotional <em>Qawwali</em>, Sitar, Sarangi, and Bansuri — the entire musical canvas rests atop one unbroken, overtone-saturated reference: the shimmering drone of the <strong>Tanpura</strong> (typically tonic <code>Sa</code> and fifth <code>Pa</code>). Because harmony never jumps from root to root, performers never need tempered compromises.
        </p>
        <ul class="article-steps-list">
          <li><strong>22 Shrutis (Microtonal Anchors):</strong> While a <em>Raga</em> uses 5, 6, or 7 main scale steps (<em>Svara</em>), intonation draws from <strong>22 delicate microtonal positions (Shrutis)</strong> across the octave. For example, the deeply lowered <code>Ati-Komal Re</code> in Raga Bhairav leans noticeably closer to the tonic <code>Sa</code> than a piano’s minor second — unlocking its solemn, dawn-lit gravity.</li>
          <li><strong>The Living Space Between Notes (Meend, Andolan &amp; Gamak):</strong> On a Sitar or voice, a rigid, unornamented note often feels bare. True artistry dwells in <em>Meend</em> (seamless gliding curves between notes), <em>Andolan</em> (slow, meditative oscillation around a microtone), and <em>Gamak</em> (vigorous ornamental arcs). Music lives in the curving bridges between pitches as much as in the destinations.</li>
          <li><strong>Raga &amp; Time of Day:</strong> A Raga is an entire melodic personality defined by ascending (<em>Aroha</em>) and descending (<em>Avaroha</em>) rules, a primary resting note (<em>Vadi</em>), and even its ideal hour (morning Ragas like <em>Bhairav</em> vs. midnight Ragas like <em>Darbari Kanada</em>).</li>
          <li><strong>Tala (Cyclical Time):</strong> Rather than marching straight down barlines, rhythm on the <em>Tabla</em> revolves in closed cycles — such as 16 beats (<em>Teental</em>), 10 beats (<em>Jhaptal</em>), or 7 beats (<em>Rupak</em>) — continuously returning home to beat one, the magnetic <strong>Sam</strong>.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Listening Lab: Raga Bhairav over Resonant Tanpura Drone (Sa–Pa)</h4>
          <p>Focus closely on the extra-low second degree (<code>Ati-Komal Re</code>) and the calm, six-step descent settling back into <code>Sa</code>:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-raga-bhairav">▶ Raga Bhairav (Tanpura + 22-Shruti Intonation)</button>
          </div>
        </div>

        <h3>5. Indonesia (Java &amp; Bali): Gamelan, Sléndro, Pélog &amp; Ocean Waves</h3>
        <p>
          Few traditions challenge Western assumptions more boldly than the bronze <strong>Gamelan</strong> ensembles of Java and Bali. There is no universal concert pitch like <code>A = 440 Hz</code>: <strong>every prominent Gamelan orchestra possesses its own bespoke, closely guarded tuning!</strong> Two different orchestras generally cannot even perform side-by-side — much as each ensemble safeguards a living vocal identity of its own.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Sléndro: Five Nearly Equidistant Steps</h5>
            <p>Divides the octave not into 12 slices, but roughly into <strong>5 broad steps</strong> averaging around <code>240 cents</code> each. Crucially, an ideal Sléndro scale contains neither a standard Western major third nor a pure fifth or fourth — training the ear to let go of Western triadic habits altogether.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Pélog &amp; Ombak (The Shimmering “Wave”)</h5>
            <p><strong>Pélog</strong> spans 7 asymmetric pitches (mixing tight steps with wide leaps), from which 5-tone modes are drawn. In Balinese Gamelan, bronze metallophones are tuned in pairs: one <em>Pengumbang</em> (slightly lower) and its twin <em>Pengisep</em> (~<strong>5–8 Hz higher</strong>). Struck together, they produce <strong>Ombak</strong> (“ocean wave”) — an intentional acoustic pulsation where slight detuning is prized as the soul of ensemble resonance.</p>
          </div>
        </div>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-gamelan-slendro">▶ Sléndro Scale (~240 ct Equidistant)</button>
          <button class="btn-tool" data-play-custom="culture-gamelan-ombak">▶ Balinese Ombak Beating (~7 Hz)</button>
        </div>

        <h3>6. Sub-Saharan Africa &amp; East Asia: Polyrhythm, Blue Notes &amp; the Art of Silence</h3>
        <ul class="article-steps-list">
          <li><strong>Sub-Saharan Africa — Interlocking Cycles &amp; Timeline Patterns:</strong> Where European symphonies weave vertical chord harmonies, traditional West and Central African ensembles build breathtaking architectural rhythm webs. Musicians lock contrasting pulses together simultaneously (<strong>3 against 4</strong> or <strong>3 against 2</strong> — true <em>polyrhythm</em>), anchored by an asymmetric iron bell guide known as a <strong>Bell Timeline</strong> (like the classic 12/8 pattern <code>x . x . x x . x . x . x</code>). No single voice dominates; collective interlocking and <em>Call &amp; Response</em> forge the living groove.</li>
          <li><strong>How West Africa Transformed Blues, Jazz &amp; Pop (Blue Notes!):</strong> When enslaved African musicians encountered Western guitars, pianos, and brass in North America, their vocal, fluidly lowered 3rds, 5ths, and 7ths refused to fit neatly onto rigid equal-tempered frets and keys. That cultural collision birthed microtonal <strong>Blue Notes</strong> — the expressive heartbeat behind Blues, Gospel, Jazz, Soul, and Rock today.</li>
          <li><strong>East Asia — Timbre, Finger Inflection &amp; “Ma”:</strong> Classical Chinese music (<em>Guqin</em> zither with over 100 touch and slide techniques) and Japanese music (<em>Shakuhachi</em> bamboo flute) often build around pentatonic anchors, pouring immense nuance into pitch bends, breath textures, and the aesthetic of <strong>Ma (間)</strong> — the charged silence <em>between</em> notes carrying just as much expressive gravity as sound itself.</li>
        </ul>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-westafrica-poly">▶ 12/8 Bell Timeline + 4-vs-3 Polyrhythm</button>
        </div>

        <h3>7. Four Axes Across Cultures — &amp; What It Gives Your Ears</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>1. Pitch Material &amp; Tuning</strong>
              <span>West: 12 fixed 100-cent steps (12-TET). Global: 5-tone Sléndro (~240 ct), 22 Shrutis, 53-comma Makam, or fluid vocal pitch centers.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>2. Vertical vs. Horizontal Architecture</strong>
              <span>Western harmony moves through stacked chords. Maqam and Raga weave intricate microtonal lines over an unbroken tonal anchor.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>3. Sound Ideal</strong>
              <span>Clean harmonic blend vs. Balinese <em>Ombak</em> shimmering beats, Sitar buzz-bridge (<em>Jawari</em>) overtones, or breathy bamboo resonance.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>4. Sense of Musical Time</strong>
              <span>Linear 3/4 and 4/4 bars vs. circular <em>Tala</em> cycles, asymmetric 12/8 timelines, or spacious contemplative silence (<em>Ma</em>).</span>
            </div>
          </div>
        </div>

        <div class="k-song-ref">
          <strong>What does your ear gain from this?</strong> Each tradition trains a distinct musical superpower: Western harmony sharpens chord-function &amp; modulation listening; Maqam and Raga tune your <strong>microtonal radar</strong> and vocal/string intonation; Gamelan and African polyrhythm break rigid barline counting and anchor groove in your whole body. Whenever you train intervals in Lauscher, you are listening for <em>relationships rather than rigid labels</em> — and that curiosity unlocks every musical culture on earth.
        </div>
      </div>
    `
  },
  {
    id: "art-mnemonics",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1.1 2h5.8c.1-.8.5-1.5 1.1-2A7 7 0 0 0 12 2z"/></svg>`,
    badgeClass: "badge-peach",
    title: "Musical Mnemonics & Memory Tricks",
    subtitle: "Classic memory phrases for the Circle of Fifths, staff reading, open strings, intervals & rhythm",
    tag: "Memory Aids & Practice",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Memory Aids &amp; Practice</span>
        <h2>Musical Mnemonics &amp; Memory Tricks That Stick for Life</h2>
        <p class="article-lead">
          Why can we recall a quirky sentence about cows eating grass or Father Charles in ten seconds — while raw lists of note letters fade in five minutes? The human brain is wired for <strong>vivid images, stories, rhyme, and rhythm</strong>. Here are the most popular English music-education mnemonics in one complete guide.
        </p>

        <h3>1. Circle of Fifths &amp; Order of Sharps and Flats</h3>
        <p>
          Sharps (<strong>♯</strong>) and flats (<strong>♭</strong>) always appear in the exact same order on the staff — and the two orders are simple mirror images of each other:
        </p>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Order of Sharps (♯): F – C – G – D – A – E – B</h5>
            <p>
              <strong>“<u>F</u>ather <u>C</u>harles <u>G</u>oes <u>D</u>own <u>A</u>nd <u>E</u>nds <u>B</u>attle”</strong><br>
              <em>Alternative:</em> “<strong>F</strong>at <strong>C</strong>ats <strong>G</strong>o <strong>D</strong>own <strong>A</strong>lleys <strong>E</strong>ating <strong>B</strong>irds”.<br>
              Clockwise major keys from C (0): <strong>G</strong> (1♯), <strong>D</strong> (2♯), <strong>A</strong> (3♯), <strong>E</strong> (4♯), <strong>B</strong> (5♯), <strong>F♯</strong> (6♯).
            </p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Order of Flats (♭): B – E – A – D – G – C – F</h5>
            <p>
              <strong>“<u>B</u>attle <u>E</u>nds <u>A</u>nd <u>D</u>own <u>G</u>oes <u>C</u>harles’ <u>F</u>ather”</strong><br>
              <em>Math shortcut:</em> The word <strong><u>BEAD</u></strong> + <strong><u>G</u></strong>reatest <strong><u>C</u></strong>ommon <strong><u>F</u></strong>actor!<br>
              Counter-clockwise major keys: <strong>F</strong> (1♭), <strong>B♭</strong> (2♭), <strong>E♭</strong> (3♭), <strong>A♭</strong> (4♭), <strong>D♭</strong> (5♭), <strong>G♭</strong> (6♭).
            </p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Two Instant Key-Signature Reading Shortcuts</h4>
          <ul class="article-steps-list">
            <li><strong>For Sharps (♯):</strong> The <em>last sharp on the right</em> is always the <strong>leading tone (Ti / 7th degree)</strong>. Go up <strong>one half step</strong> to name the Major key! (Example: Last sharp is <em>C♯</em> → one half step up = <strong>D Major</strong>).</li>
            <li><strong>For Flats (♭):</strong> The <em>second-to-last flat</em> directly names the Major key! (Example: 3 flats = B♭, <strong>E♭</strong>, A♭ → <strong>E♭ Major</strong>. Only 1♭ = <strong>F Major</strong> stands alone).</li>
            <li><strong>Relative Minor Key:</strong> Drop <strong>3 semitones (a minor 3rd) down</strong> from the Major root (C Major → A minor, G Major → E minor).</li>
          </ul>
          <button class="btn-tool" data-jump-ref="circle-of-fifths">→ Open the Interactive Circle of Fifths</button>
        </div>

        <h3>2. Staff Lines &amp; Spaces (Treble, Bass &amp; Alto Clefs)</h3>
        <p>
          Always read staff mnemonics <strong>from the bottom line/space to the top</strong>:
        </p>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Treble Clef • 4 Spaces: F – A – C – E</strong>
              <span>Spells the word <strong>“FACE”</strong> right in the spaces (“Face in the space!”).</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Treble Clef • 5 Lines: E – G – B – D – F</strong>
              <span><em>“<strong>E</strong>very <strong>G</strong>ood <strong>B</strong>oy <strong>D</strong>oes <strong>F</strong>ine”</em> (or <em>“<strong>E</strong>very <strong>G</strong>ood <strong>B</strong>ird <strong>D</strong>eserves <strong>F</strong>udge”</em>).</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Bass Clef • 5 Lines: G – B – D – F – A</strong>
              <span><em>“<strong>G</strong>ood <strong>B</strong>oys <strong>D</strong>o <strong>F</strong>ine <strong>A</strong>lways”</em> (or <em>“<strong>G</strong>reat <strong>B</strong>ig <strong>D</strong>ogs <strong>F</strong>ight <strong>A</strong>nimals”</em>).</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Bass Clef • 4 Spaces: A – C – E – G</strong>
              <span><em>“<strong>A</strong>ll <strong>C</strong>ows <strong>E</strong>at <strong>G</strong>rass”</em> (or <em>“<strong>A</strong>ll <strong>C</strong>ars <strong>E</strong>at <strong>G</strong>as”</em>).</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>The 3 Clef Landmarks (G, F &amp; C Clefs)</strong>
              <span>• <strong>Treble = G Clef:</strong> The inner spiral curls around Line 2 (<strong>G4</strong>).<br>• <strong>Bass = F Clef:</strong> The two dots straddle Line 4 (<strong>F3</strong>).<br>• <strong>Alto = C Clef:</strong> The center notch points straight at Line 3 = <strong>Middle C (C4)</strong>!</span>
            </div>
          </div>
        </div>

        <h3>3. Open Strings on Guitar, Bass, Strings &amp; Ukulele</h3>
        <p>
          All string mnemonics are read <strong>from lowest-pitched (thickest) to highest-pitched (thinnest) string</strong>:
        </p>
        <ul class="article-steps-list">
          <li><strong>Guitar (6 strings: E – A – D – G – B – E):</strong> <em>“<strong>E</strong>ddy <strong>A</strong>te <strong>D</strong>ynamite, <strong>G</strong>ood <strong>B</strong>ye <strong>E</strong>ddy”</em> (or <em>“<strong>E</strong>lephants <strong>A</strong>nd <strong>D</strong>onkeys <strong>G</strong>row <strong>B</strong>ig <strong>E</strong>ars”</em>).</li>
          <li><strong>Bass Guitar &amp; Double Bass (4 strings: E – A – D – G):</strong> <em>“<strong>E</strong>at <strong>A</strong>ll <strong>D</strong>ay <strong>G</strong>et (Big)”</em> — identical to the lowest four guitar strings, tuned in Perfect 4ths.</li>
          <li><strong>Violin (4 strings: G – D – A – E):</strong> <em>“<strong>G</strong>ood <strong>D</strong>ogs <strong>A</strong>lways <strong>E</strong>at”</em> — tuned in ascending Perfect 5ths!</li>
          <li><strong>Viola &amp; Cello (4 strings: C – G – D – A):</strong> <em>“<strong>C</strong>ats <strong>G</strong>o <strong>D</strong>own <strong>A</strong>lleys”</em> — ascending Perfect 5ths starting from C.</li>
          <li><strong>Ukulele (G – C – E – A):</strong> <em>“<strong>G</strong>ood <strong>C</strong>ooks <strong>E</strong>at <strong>A</strong> Lot”</em> — traditionally checked by ear with the tune <em>“My Dog Has Fleas”</em>!</li>
        </ul>

        <h3>4. Interval Song Anchors (With Live Audio)</h3>
        <p>
          Link every interval leap to the opening two notes of a song you already know by heart:
        </p>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Minor 2nd (1 ST) &amp; Major 2nd (2 ST)</strong>
              <span>• <strong>Minor 2nd:</strong> <em>Jaws (Theme)</em> ascending / <em>Für Elise</em> descending.<br>• <strong>Major 2nd:</strong> <em>Happy Birthday</em> (notes 2→3) or <em>Frère Jacques</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="1">▶ m2</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Minor 3rd (3 ST) &amp; Major 3rd (4 ST)</strong>
              <span>• <strong>Minor 3rd:</strong> <em>Greensleeves</em> ascending / <em>Hey Jude</em> descending.<br>• <strong>Major 3rd:</strong> <em>Oh When the Saints</em> ascending / <em>Summertime</em> descending.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="4">▶ M3</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Perfect 4th (5 ST) &amp; Tritone (6 ST)</strong>
              <span>• <strong>Perfect 4th:</strong> <em>Here Comes the Bride</em> or <em>Amazing Grace</em>.<br>• <strong>Tritone (Aug 4 / Dim 5):</strong> <em>The Simpsons (“The Simp-sons”)</em> or <em>Maria (West Side Story)</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="6">▶ Tritone</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Perfect 5th (7 ST), Major 6th (9 ST) &amp; Octave (12 ST)</strong>
              <span>• <strong>Perfect 5th:</strong> <em>Star Wars (Main Title)</em> or <em>Twinkle, Twinkle, Little Star</em>.<br>• <strong>Major 6th:</strong> <em>My Bonnie Lies Over the Ocean</em>.<br>• <strong>Octave:</strong> <em>Somewhere Over the Rainbow</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="7">▶ P5</button>
          </div>
        </div>

        <h3>5. Modes, Triads &amp; Rhythm Word Syllables</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-lilac">
            <h5>The 7 Modes in Order (White Keys C to B)</h5>
            <p>
              <strong><u>I</u>onian – <u>D</u>orian – <u>P</u>hrygian – <u>L</u>ydian – <u>M</u>ixolydian – <u>A</u>eolian – <u>L</u>ocrian</strong><br>
              Phrase: <em>“<strong>I</strong> <strong>D</strong>on’t <strong>P</strong>articularly <strong>L</strong>ike <strong>M</strong>odes <strong>A</strong> <strong>L</strong>ot”</em>.<br>
              <strong>Color-Note Ear Shortcuts:</strong><br>
              • Major + bright <strong>#4</strong> = <strong>Lydian</strong><br>
              • Major + bluesy <strong>b7</strong> = <strong>Mixolydian</strong><br>
              • Minor + bright <strong>♮6</strong> = <strong>Dorian</strong><br>
              • Minor + exotic <strong>b2</strong> = <strong>Phrygian</strong>
            </p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Rhythm Food Words &amp; Triad Formulas</h5>
            <p>
              <strong>Speak subdivisions out loud:</strong><br>
              • Quarter note (♩): <em>“Pie”</em> / <em>“Walk”</em><br>
              • Eighth pair (♪♪): <em>“Ap-ple”</em> / <em>“Run-ning”</em><br>
              • Eighth triplet (3 per beat): <em>“Pi-ne-ap-ple”</em> / <em>“Tri-po-let”</em><br>
              • Four sixteenths (4 per beat): <em>“Wa-ter-me-lon”</em> / <em>“A-vo-ca-do”</em><br>
              <strong>Triad Semitone Recipe:</strong><br>
              • <strong>Major = 4 + 3</strong> • <strong>Minor = 3 + 4</strong><br>
              • <strong>Diminished = 3 + 3</strong> • <strong>Augmented = 4 + 4</strong>
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
    title: "The Nashville Number System",
    subtitle: "How scale-degree numbers let an entire studio band transpose in seconds",
    tag: "Studio & Practice",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Studio Practice &amp; Harmony</span>
        <h2>The Nashville Number System (NNS)</h2>
        <p class="article-lead">
          Picture a recording session: five musicians hear a song for the very first time, jot down a single page of numbers like <strong>1 – 5 – 6- – 4</strong> in three minutes — and when the singer says <em>“Let’s drop it down a whole step!”</em>, nobody changes a single digit. That is the magic of the <strong>Nashville Number System</strong>.
        </p>

        <h3>1. How Did It Start?</h3>
        <p>
          The system was born in <strong>late-1950s Nashville</strong> along the famous <em>Music Row</em>:
        </p>
        <ul class="article-steps-list">
          <li>
            <strong>Neal Matthews Jr. &amp; The Jordanaires (late 1950s):</strong> Backing Elvis Presley and countless country stars meant adapting vocal harmonies to different singers and last-minute key changes every single day. Neal Matthews began writing chord degrees as simple scale numbers instead of fixed letter names.
          </li>
          <li>
            <strong>Charlie McCoy &amp; the Studio Rhythm Section (1960s):</strong> Harmonica virtuoso and multi-instrumentalist <strong>Charlie McCoy</strong> picked up the idea and refined it into a full chart language for rhythm sections (guitar, bass, piano, pedal steel, drums). In tight 3-hour union sessions, Nashville’s legendary studio players (the <em>Nashville A-Team</em>) often tracked three or four songs per session with zero printed sheet music.
          </li>
          <li>
            <strong>From Studio Shorthand to Global Standard:</strong> Because one chart works in all 12 keys instantly, the system spread far beyond country into pop, rock, gospel, worship, and touring bands worldwide.
          </li>
        </ul>

        <h3>2. How Does It Work?</h3>
        <p>
          Instead of writing fixed chord letters (like <em>G, C, D, Em</em>), you number the <strong>7 degrees of the major scale</strong> from <strong>1 to 7</strong>. The key is written just once at the top of the page (e.g. <strong>Key: G</strong>):
        </p>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>1 · 4 · 5 — The Three Major Chords (Tonic, Subdominant, Dominant)</strong>
              <span>Written as plain numbers: in C Major that means <strong>C (1)</strong>, <strong>F (4)</strong>, and <strong>G (5)</strong>.</span>
            </div>
            <button class="btn-tool" data-play-progression="I,IV,I,V">▶ 1 – 4 – 1 – 5</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>2- · 3- · 6- — The Three Minor Chords</strong>
              <span>A minus sign (<strong>-</strong>) or <strong>m</strong> marks minor: in C Major, <strong>Dm (2-)</strong>, <strong>Em (3-)</strong>, and <strong>Am (6-)</strong>.</span>
            </div>
            <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ 1 – 5 – 6- – 4</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>7° — The Diminished Degree (or 5/7)</strong>
              <span>Degree 7 is naturally diminished (in C Major: <strong>B°</strong>). In pop and country, studios often use the first-inversion slash chord <strong>5/7</strong> (G/B) instead.</span>
            </div>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Numbers vs. Roman Numerals (I – V – vi – IV)</h4>
          <p>
            Harmonic meaning is identical: <strong>I – V – vi – IV</strong> and <strong>1 – 5 – 6- – 4</strong> describe the exact same chords. Arabic numerals simply win in fast studio life — they are quicker to scribble by hand and unmistakable from across a dimly lit music stand (nobody confuses <code>4</code> and <code>6-</code>, whereas handwritten <code>iv</code> and <code>vi</code> look dangerously alike).
          </p>
        </div>

        <h3>3. Essential Chart Symbols (Studio Shorthand)</h3>
        <div class="nns-legend-grid">
          <div class="nns-legend-item">
            <span class="nns-legend-sym">2- / 6-</span>
            <span class="nns-legend-desc">Minus (or m) = minor chord</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym">1/3</span>
            <span class="nns-legend-desc">Slash = chord over alternate bass note</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym nns-legend-underline">4 &nbsp; 5</span>
            <span class="nns-legend-desc">Underlined = 2 chords sharing one bar (split bar)</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym">1◇</span>
            <span class="nns-legend-desc">Diamond = strum once &amp; let ring</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym">7°</span>
            <span class="nns-legend-desc">Circle = diminished triad</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym">^ / &lt;</span>
            <span class="nns-legend-desc">Push = anticipated beat (syncopation)</span>
          </div>
        </div>
        <ul class="article-steps-list">
          <li>
            <strong>One Number = One Full Bar:</strong> Writing <code>1  4  5  1</code> gives each chord one full measure (typically 4 beats).
          </li>
          <li>
            <strong>Underline = Split Bar:</strong> Two numbers underlined together (<u>4 &nbsp; 5</u>) share a single bar (2 beats each).
          </li>
          <li>
            <strong>Minor Songs in NNS:</strong> Many Nashville players still chart minor-key songs relative to the <em>parallel major</em>. A song in A Minor is often written under “Key: C” as <strong>6- – 4 – 1 – 5</strong> so familiar visual patterns stay intact.
          </li>
        </ul>

        <h3>4. Common Studio Colours &amp; Slash Chords</h3>
        <p>
          Beyond the 7 diatonic chords, these six studio staples appear on modern country, pop, and gospel charts every day (shown in <strong>C Major</strong>):
        </p>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>1/3 (C/E) — First Inversion Bass Walk</strong>
              <span>Smoothly connects <strong>1 → 1/3 → 4</strong> (C → C/E → F) with a melodic bass walk up (C → E → F).</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>4/5 (F/G) — Gospel &amp; Pop Suspension (9sus4)</strong>
              <span>Warm, floating tension right before resolving home — a hallmark of classic pop and soul ballads.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>5/7 (G/B) — Leading-Tone Bass to 1</strong>
              <span>Frequently replaces diminished 7° in bands, driving classic walk-downs like <strong>1 → 5/7 → 6-</strong>.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>♭7 (B♭) — Rock &amp; Southern Country Borrowed Chord</strong>
              <span>Borrowed from Mixolydian (<strong>1 – ♭7 – 4 – 1</strong>), giving instant swagger and lift.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>4- (Fm) — Minor Subdominant</strong>
              <span>Moving <strong>4 → 4- → 1</strong> (F → Fm → C) delivers bittersweet, cinematic warmth.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>2 (D Major instead of Dm) — Secondary Dominant → 5</strong>
              <span>Written without a minus sign, major <strong>2</strong> leans eagerly into the <strong>5</strong> chord (D → G → C).</span>
            </div>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Explore It Live in the Interactive Diagram</h4>
          <p>
            In the <strong>Nashville Number System tool</strong>, tap any of the 12 keys and play every degree — and use the standalone <strong>Capo Translator</strong> to convert sounding key, capo fret, and chord shapes directly:
          </p>
          <button class="btn-tool" type="button" data-open-nashville-tool="1">▶ Open Nashville Diagram Tool</button>
          <button class="btn-tool" type="button" data-open-capo-tool="1">▶ Open Capo Translator</button>
        </div>
      </div>
    `
  }
];

const PHYSICS_WAVE_EXPLANATIONS_EN = {
  "2,1": "<strong>Octave (2 : 1):</strong> Two long green root waves fit exactly <strong>4 half-length orange waves</strong>. In Track 3, the combined shape repeats identically at every dashed vertical mark — that’s why octaves almost fuse into one note.",
  "3,2": "<strong>Perfect 5th (3 : 2):</strong> While the root completes 2 long green waves, the upper tone draws exactly <strong>3 orange waves</strong>. They lock cleanly together again every 2 cycles — steady, open, and full of power.",
  "4,3": "<strong>Perfect 4th (4 : 3):</strong> 3 green cycles line up neatly with 4 orange cycles, then the whole pattern restarts in sync.",
  "5,4": "<strong>Major 3rd (5 : 4):</strong> 4 green cycles meet 5 orange cycles. Track 3 draws a smooth, rolling wave — the warm sound behind major chords.",
  "6,5": "<strong>Minor 3rd (6 : 5):</strong> 5 green cycles against 6 orange cycles — slightly tighter overlap than the Major 3rd, giving minor harmony its soulful color.",
  "5,3": "<strong>Major 6th (5 : 3):</strong> Ratio 1.67 : 1 — the inversion of the Minor 3rd. Wide, singing, and nicely settled.",
  "45,32": "<strong>Tritone (45 : 32):</strong> The orange wave crests refuse to line up cleanly with the green grid — watch Track 3 turn spiky and restless with tension!",
  "16,15": "<strong>Minor 2nd (16 : 15):</strong> Both waves move at nearly the same speed, drifting slowly in and out of sync — creating those pulsing thick-and-thin swells in Track 3 (beating)."
};

const PHYSICS_OVERTONES_EN = [
  { num: 1,  note: "C2",       ratio: "1× · Root",        freq: 65.41,  special: false },
  { num: 2,  note: "C3",       ratio: "2× · Octave",      freq: 130.82, special: false },
  { num: 3,  note: "G3",       ratio: "3× · Perf. 5th",   freq: 196.23, special: false },
  { num: 4,  note: "C4",       ratio: "4× · 2nd Oct.",    freq: 261.64, special: false },
  { num: 5,  note: "E4",       ratio: "5× · Maj 3rd",     freq: 327.05, special: false },
  { num: 6,  note: "G4",       ratio: "6× · Perf. 5th",   freq: 392.46, special: false },
  { num: 7,  note: "~Bb4*",    ratio: "7× · Nat. 7th",    freq: 457.87, special: true },
  { num: 8,  note: "C5",       ratio: "8× · 3rd Oct.",    freq: 523.28, special: false },
  { num: 9,  note: "D5",       ratio: "9× · Maj 2nd",     freq: 588.69, special: false },
  { num: 10, note: "E5",       ratio: "10× · Maj 3rd",    freq: 654.10, special: false },
  { num: 11, note: "~F5/F#*",  ratio: "11× · Alphorn Fa", freq: 719.51, special: true },
  { num: 12, note: "G5",       ratio: "12× · Perf. 5th",  freq: 784.92, special: false }
];

function renderPhysicsReferenceHTML_EN() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. How Sound &amp; Tones Happen</span>
        <span class="k-ratio-chip">approx. 343 m/s</span>
      </div>
      <h4>From Vibrating Air to a Sine Curve</h4>
      <p>
        Pluck a guitar string or start humming, and something wiggles back and forth fast. Those tiny vibrations bump nearby air molecules — sending a pressure ripple across the room at roughly <strong>343 meters per second</strong> (1,125 ft/s). When that ripple hits your ear, your eardrum wiggles in the exact same rhythm and your brain turns it into music.
      </p>
      <p>
        Picture a playground swing gliding smoothly back and forth with zero jerks: if you plot that gentle up-and-down motion over time, you get a <strong>sine wave</strong> (<em>sine curve</em>). It is nature’s purest building block — just <strong>one single frequency</strong> with zero extras. Real instruments, though, wobble in bumpier shapes because they blend lots of extra waves together at once.
      </p>

      <div class="wave-compare-visual">
        <div class="wave-compare-card">
          <strong>Pure Sine Wave (1 frequency)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 29.0 L9.5 25.0 L12.9 21.3 L16.4 17.8 L19.9 14.9 L23.3 12.5 L26.8 10.9 L30.3 10.1 L33.7 10.1 L37.2 10.9 L40.7 12.5 L44.1 14.9 L47.6 17.8 L51.1 21.3 L54.5 25.0 L58.0 29.0 L61.5 33.0 L64.9 36.7 L68.4 40.2 L71.9 43.1 L75.3 45.5 L78.8 47.1 L82.3 47.9 L85.7 47.9 L89.2 47.1 L92.7 45.5 L96.1 43.1 L99.6 40.2 L103.1 36.7 L106.5 33.0 L110.0 29.0 L113.5 25.0 L116.9 21.3 L120.4 17.8 L123.9 14.9 L127.3 12.5 L130.8 10.9 L134.3 10.1 L137.7 10.1 L141.2 10.9 L144.7 12.5 L148.1 14.9 L151.6 17.8 L155.1 21.3 L158.5 25.0 L162.0 29.0 L165.5 33.0 L168.9 36.7 L172.4 40.2 L175.9 43.1 L179.3 45.5 L182.8 47.1 L186.3 47.9 L189.7 47.9 L193.2 47.1 L196.7 45.5 L200.1 43.1 L203.6 40.2 L207.1 36.7 L210.5 33.0 L214.0 29.0" fill="none" stroke="var(--sage-strong)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Smooth S-curve with zero sharp corners — sounds clean and neutral, like a tuning fork or a soft whistle.</span>
        </div>
        <div class="wave-compare-card">
          <strong>Real Tone (Root + Overtones)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 26.9 L9.5 17.6 L12.9 11.3 L16.4 9.3 L19.9 11.2 L23.3 15.4 L26.8 19.5 L30.3 22.3 L33.7 23.3 L37.2 23.3 L40.7 23.4 L44.1 23.9 L47.6 24.9 L51.1 25.9 L54.5 26.5 L58.0 26.9 L61.5 27.7 L64.9 29.3 L68.4 31.8 L71.9 34.5 L75.3 36.8 L78.8 38.1 L82.3 38.8 L85.7 39.9 L89.2 41.9 L92.7 44.7 L96.1 47.2 L99.6 47.4 L103.1 43.9 L106.5 36.5 L110.0 26.9 L113.5 17.6 L116.9 11.3 L120.4 9.3 L123.9 11.2 L127.3 15.4 L130.8 19.5 L134.3 22.3 L137.7 23.3 L141.2 23.3 L144.7 23.4 L148.1 23.9 L151.6 24.9 L155.1 25.9 L158.5 26.5 L162.0 26.9 L165.5 27.7 L168.9 29.3 L172.4 31.8 L175.9 34.5 L179.3 36.8 L182.8 38.1 L186.3 38.8 L189.7 39.9 L193.2 41.9 L196.7 44.7 L200.1 47.2 L203.6 47.4 L207.1 43.9 L210.5 36.5 L214.0 26.9" fill="none" stroke="var(--peach-strong)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Multiple sine waves stack together. Those peaks and dips are what give each instrument its signature voice.</span>
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Hertz (Hz) = Speed</strong>
          <span><code>65 Hz</code> (low <code>C2</code>) shakes 65 times per second — a physical <strong>5.24 meter (17 ft)</strong> air wave! <code>440 Hz</code> (<code>A4</code>) shrinks to just <strong>78 cm (2.5 ft)</strong>.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Octave = Double Speed</strong>
          <span>Your ear tracks ratios, not raw Hz: jumping <code>220 → 440 Hz</code> (+220 Hz) and <code>440 → 880 Hz</code> (+440 Hz) feels like the exact same step — 2:1!</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Amplitude = Volume</strong>
          <span>How hard the wave pushes back and forth (decibels, dB) controls loudness without changing pitch at all.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Wave Shape = Tone Color</strong>
          <span>Smooth wave = soft and flute-like. Jagged wave = edgy and bright like a trumpet or distorted guitar.</span>
        </div>
      </div>

      <div class="k-meta-box">
        <strong>Listen in – Octave Jumps &amp; Wave Shapes on C4 (261.6 Hz):</strong>
        <div class="k-btn-row" style="margin-top:0.35rem;">
          <button class="btn-tool" data-play-freqs="220,440,880" data-seq-step="650" data-osc="triangle" data-dur="0.75">▶ 220 → 440 → 880 Hz</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sine" data-dur="1.4">▶ Pure Sine Wave</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="triangle" data-dur="1.4">▶ Triangle (Softer)</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sawtooth" data-dur="1.4">▶ Sawtooth (Edgy)</button>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. The Frequency Spectrum</span>
        <span class="k-ratio-chip">20 Hz – 20 kHz</span>
      </div>
      <h4>Sonic Fingerprint: What’s Actually Inside a Note?</h4>
      <p>
        If a piano and a guitar both play the exact same <code>C4</code>, you can tell them apart in a split second — even though the main pitch is identical! The secret is their <strong>frequency spectrum</strong>: every real-world tone is a whole crew of sine waves sounding together at once.
      </p>
      <p>
        Think of a spectrum (like an EQ visualizer in your music app) as an X-ray of sound: on the far left sits the fundamental note (<code>1×</code>), and stretching to the right are its faster overtones (<code>2×</code> to <code>10×</code>). Pick a sound below to see and hear its recipe:
      </p>

      <div class="freq-spec-box">
        <div class="k-btn-row">
          <button class="k-filter-pill active" data-spec-preset="sine" data-play-freqs="261.63" data-osc="sine" data-dur="1.4" data-spec-desc="<strong>Pure Sine Tone:</strong> Just one lonely bar at 1× — zero overtones. Sounds ultra-clean, almost sterile, with no higher frequencies coloring the tone.">▶ Sine Wave (C4)</button>
          <button class="k-filter-pill" data-spec-preset="piano" data-play-inst data-style="piano" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Piano (Sample):</strong> Strong fundamental backed by round lower overtones that taper off gently higher up — giving piano its full, warm body.">▶ Piano Sample (C4)</button>
          <button class="k-filter-pill" data-spec-preset="guitar" data-play-inst data-style="guitar" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Guitar (Sample):</strong> Plucked strings pack noticeably more energy into the mid and upper bars — that’s where the bright snap and pluck attack live.">▶ Guitar Sample (C4)</button>
          <button class="k-filter-pill" data-spec-preset="strings" data-play-inst data-style="strings" data-notes="C4" data-dur="1.6" data-spec-desc="<strong>Strings (Sample):</strong> The bow keeps even high overtones (6×–10×) energized continuously — creating silky shimmer that cuts effortlessly through a mix.">▶ Strings Sample (C4)</button>
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
          <strong>Pure Sine Tone:</strong> Just one lonely bar at 1× — zero overtones. Sounds ultra-clean, almost sterile, with no higher frequencies coloring the tone.
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Sub &amp; Bass (20 – 250 Hz)</strong>
          <span>Kick drums, basslines, low foundation. Long waves you often feel in your chest before you even analyze them.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Mids &amp; Warmth (250 Hz – 2 kHz)</strong>
          <span>Vocals, piano body, guitar chords. This zone builds fullness — push too much and things turn boxy.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Presence &amp; Bite (2 – 6 kHz)</strong>
          <span>Consonants (“S”, “T”), pick clicks, snare snap. Human ears are extra sensitive right here.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Air &amp; Shimmer (6 – 20 kHz)</strong>
          <span>Cymbal sizzle, vocal breath, fine upper sparkle stretching to the top limit of human hearing.</span>
        </div>
      </div>
    </article>

    <div class="wave-lab-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">3. Interactive Wave Lab</span>
        <button id="toggleWavePauseBtn" class="k-ratio-btn">⏸ Pause Wave</button>
      </div>
      <h4>Watch Two Waves Combine Live</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-mid); line-height:1.4;">
        Dashed lines mark <strong>1 full cycle of the root note (green)</strong>. Underneath is the <strong>2nd note (orange)</strong> — and Track 3 at bottom draws their real-time <strong>combined wave</strong> right as it reaches your eardrum.
      </p>
      <div class="wave-canvas-wrap">
        <canvas id="waveCanvas" class="wave-canvas" width="540" height="195"></canvas>
        <div id="waveExplainBanner" class="wave-explain-banner">
          ${PHYSICS_WAVE_EXPLANATIONS_EN["2,1"]}
        </div>
      </div>
      <div class="k-btn-row">
        <button class="k-filter-pill active" data-wave-ratio="2,1" data-wave-semi="12">Octave (2:1)</button>
        <button class="k-filter-pill" data-wave-ratio="3,2" data-wave-semi="7">5th (3:2)</button>
        <button class="k-filter-pill" data-wave-ratio="4,3" data-wave-semi="5">4th (4:3)</button>
        <button class="k-filter-pill" data-wave-ratio="5,4" data-wave-semi="4">Maj 3rd (5:4)</button>
        <button class="k-filter-pill" data-wave-ratio="6,5" data-wave-semi="3">Min 3rd (6:5)</button>
        <button class="k-filter-pill" data-wave-ratio="5,3" data-wave-semi="9">Maj 6th (5:3)</button>
        <button class="k-filter-pill" data-wave-ratio="45,32" data-wave-semi="6">Tritone (45:32)</button>
        <button class="k-filter-pill" data-wave-ratio="16,15" data-wave-semi="1">Min 2nd (16:15)</button>
      </div>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">4. Nature’s Built-In Scale</span>
        <span class="k-ratio-chip">1× to 12× Root</span>
      </div>
      <h4>Standing Waves &amp; the Harmonic Overtone Series (1st–12th)</h4>
      <p>
        Hold down a guitar string at both ends and pluck it: the ends have to stay still, so the string naturally vibrates as one whole arch AND splits into halves (2× faster), thirds (3× faster), quarters (4×)… That means one single note secretly contains an entire ladder of overtones!
      </p>
      <p>
        Tap the tiles below! Notice the purple-highlighted tones <strong>7</strong> and <strong>11</strong> (the classic “Alphorn Fa”): they sit right <em>in the cracks between</em> piano keys — raw, natural harmonics.
      </p>
      <div class="overtone-grid">
        ${PHYSICS_OVERTONES_EN.map(ot => `
          <button class="overtone-btn ${ot.special ? "is-blue" : ""}" data-play-freqs="${ot.freq}" data-osc="triangle" data-dur="1.15">
            <span class="overtone-num">Partial #${ot.num}</span>
            <span class="overtone-note">${ot.note}</span>
            <span class="overtone-ratio">${ot.ratio}</span>
          </button>
        `).join("")}
      </div>
      <div class="k-meta-box">
        <strong>Why Major Feels So Grounded:</strong> Harmonics <strong>4 : 5 : 6</strong> automatically spell out a bright major chord near the bottom. A pure minor chord hides way higher up at <strong>10 : 12 : 15</strong>!
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="${PHYSICS_OVERTONES_EN.map(o => o.freq).join(",")}" data-seq-step="380" data-osc="triangle" data-dur="0.65">▶ Full Series (1–12)</button>
        <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Major Core (4:5:6)</button>
        <button class="btn-tool" data-play-freqs="261.63,313.96,392.45" data-osc="triangle" data-dur="2.0">▶ Minor Core (10:12:15)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">5. Acoustic Beating</span>
        <span class="k-ratio-chip">Gap in Hz = Pulses/s</span>
      </div>
      <h4>Wobbling Waves: Tuning Strings by Ear</h4>
      <p>
        Play two strings tuned almost the same, and their wave peaks briefly line up (twice as loud), then collide upside-down (momentarily quieter). That slow “wah-wah-wah” pulse is called <strong>beating</strong>. How many pulses you hear per second equals the exact <strong>Hz difference</strong> between the notes — once they lock into tune, the wobble vanishes!
      </p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="440,440" data-osc="sine" data-dur="2.4">▶ 0 Hz (440+440 · Rock Steady)</button>
        <button class="btn-tool" data-play-freqs="440,442" data-osc="sine" data-dur="2.6">▶ 2 Hz (440+442 · 2 pulses/s)</button>
        <button class="btn-tool" data-play-freqs="440,446" data-osc="sine" data-dur="2.4">▶ 6 Hz (440+446 · Fast Flutter)</button>
        <button class="btn-tool" data-play-freqs="440,466" data-osc="sine" data-dur="2.2">▶ 26 Hz (440+466 · Gritty Friction)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">6. Tuning &amp; The Piano Compromise</span>
        <span class="k-ratio-chip">+23.5 Cent Gap</span>
      </div>
      <h4>Why No Piano on Earth Is “Completely Pure”</h4>
      <p>
        A weird quirk of math: stack 12 mathematically pure 5ths (3:2) in a row and you overshoot 7 pure octaves by about <strong>23.5 cents</strong>! Tune a piano strictly pure for C Major, and distant keys like F# Major sound painfully out of tune.
      </p>
      <p>
        The clever fix behind modern music is <strong>Equal Temperament</strong>: the octave is split into 12 completely equal mini-steps. Every song now works in any key — though a piano’s Major 3rd (C–E) sits <strong>14 cents sharper</strong> than pure nature. Compare theoretical Just Intonation against real studio piano samples:
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Pure Just Intonation (5:4)</h5>
          <p>Zero beating — melts smoothly together, but doesn’t work cleanly across all keys:</p>
          <button class="btn-tool" data-play-freqs="261.63,327.04" data-osc="triangle" data-dur="2.3">▶ Pure 3rd (5:4 · Steady)</button>
          <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.3">▶ Pure C Major Triad</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Piano / Equal Temperament (+14 ct)</h5>
          <p>Real studio piano samples: gentle shimmer — playable cleanly in all 12 keys:</p>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4" data-dur="2.3">▶ Piano 3rd (Sample C4 + E4)</button>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4,G4" data-dur="2.3">▶ Piano C Major (Sample)</button>
        </div>
      </div>
    </article>
  `;
}

const CATEGORY_HELP_GUIDES_EN = {
  cadence: {
    tagClass: "tag-sage",
    tag: "How It Works • Cadences",
    title: "How Cadence Training Works",
    lead: "Instead of guessing chords in isolation, you hear a complete four-bar progression in context — in both <strong>Major</strong> and <strong>Minor</strong> — and identify the missing harmonic function at the question mark.",
    sections: `
      <h3>The Four Exercise Groups (Major &amp; Minor)</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Major • Target: Bar 4</h5>
          <p>Bars 1–3 are shown to establish the Major key. Listen to all four bars and pick the missing chord for <strong>Bar 4</strong>.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Major • Random Bar (1–4)</h5>
          <p>The question mark moves unpredictably across Bars 1–4. Even when Bar 1 is hidden, a visible Tonic (<strong>I</strong>) remains to ground your ear.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Minor • Target: Bar 4</h5>
          <p>The same contextual drills in true Minor keys (e.g. <code>i–iv–V</code>): hear three bars of setup and choose the missing Minor chord in <strong>Bar 4</strong>.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Minor • Random Bar (1–4)</h5>
          <p>The hidden bar shifts anywhere across Bars 1–4; at least one visible Minor Tonic (<strong>i</strong>) stays on screen for clear orientation.</p>
        </div>
      </div>

      <h3>The 4 Difficulty Levels (Major &amp; Minor)</h3>
      <ul class="article-steps-list">
        <li><strong>Level 1 – Basics (I–V / i–V):</strong> The four core pillars: <code>I, IV, V, vi</code> in Major, or <code>i, iv, V, VI</code> in Minor.</li>
        <li><strong>Level 2 – Diatonic (ii–vi / ii°–VII):</strong> All diatonic scale degrees (Major adds <code>ii</code> &amp; <code>iii</code>; Minor includes <code>ii°, III, v, V, VII</code>).</li>
        <li><strong>Level 3 – Extended (V/V / N6):</strong> Adds Dominant 7th (<code>V7</code>) and secondary dominant <code>V/V</code>, plus the Neapolitan chord <code>N6</code> in Minor.</li>
        <li><strong>Level 4 – Jazz &amp; Tritone (bII7 / iiø7):</strong> Full harmonic palette up to tritone substitution <code>bII7</code> and Minor <code>ii–V</code> (<code>iiø7</code>).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Controls, Listen Only &amp; Exam</h4>
        <p>Above the stage, adjust <strong>Key</strong> and <strong>Tempo (BPM)</strong> anytime. Below, <strong>Tonic (I)</strong> / <strong>Tonic (i)</strong> and <strong>Replay Chord</strong> anchor your ear; at the bottom, <strong>Loop</strong> repeats continuously and <strong>Listen Only</strong> plays and reveals solutions automatically. After a miss, <strong>A/B Compare</strong> and <strong>Bass / Root</strong> contrast your choice with the answer — and the <strong>Category Exam</strong> tests Major and Minor under exam conditions.</p>
      </div>
    `
  },
  interval: {
    tagClass: "tag-peach",
    tag: "How It Works • Intervals",
    title: "How Interval Training Works",
    lead: "Train your ear on pure two-note distances — melodic ascending, melodic descending, simultaneous dyads, and tones above a sustained strings pad. For melodic and root-pad drills, the starting pitch shifts every round within a clear mid-piano register. (Looking for full chords &amp; inversions? They have their own dedicated <strong>Chords</strong> module!)",
    sections: `
      <h3>The 4 Exercise Types</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Melodic Intervals (Ascending)</h5>
          <p>Two pitches sound one after another climbing upward: Bar 1 gives the random starting note (<code>F3–E4</code>), Bar 2 asks you to name the upward leap.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Melodic Intervals (Descending)</h5>
          <p>Two pitches drop one after another downward: Bar 1 starts on a random upper note (<code>F#4–F5</code>), Bar 2 asks for the downward drop — a classic ear challenge!</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Harmonic Intervals</h5>
          <p>Both pitches sound together as a dyad. Listen for fusion vs. beating — solved cards display both pitches (e.g., <code>C4 + G4</code>).</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Intervals Over Root Pad (Strings ➔ Piano)</h5>
          <p>A warm <strong>strings pad</strong> sustains the root note as a harmonic bed. After a short delay, <strong>piano</strong> plays the target tone above it — with dedicated sliders for <strong>Root Drone Pad</strong> (default 50%) and <strong>Interval</strong> to balance the mix anytime.</p>
        </div>
      </div>

      <h3>Levels: Major, Minor, Chromatic &amp; Custom Mode</h3>
      <ul class="article-steps-list">
        <li><strong>Beginner (Level 1 in Major / Minor 1):</strong> Four cornerstone triad intervals: Unison (<code>P1</code>), Major 3rd (<code>M3</code> in Major) or Minor 3rd (<code>m3</code> in Minor), Perfect 5th (<code>P5</code>), and Octave (<code>P8</code>).</li>
        <li><strong>Lower Half 1–4 (Level 2 in Major / Minor 2):</strong> The lower tetrachord (4 intervals): Unison (<code>P1</code>), Major 2nd (<code>M2</code>), Major or Minor 3rd (<code>M3</code> / <code>m3</code>), and Perfect 4th (<code>P4</code>).</li>
        <li><strong>Upper Half 5–8 (Level 3 in Major / Minor 3):</strong> The upper tetrachord (4 intervals): Perfect 5th (<code>P5</code>), Major or Minor 6th (<code>M6</code> / <code>m6</code>), Major or Minor 7th (<code>M7</code> / <code>m7</code>), and Octave (<code>P8</code>).</li>
        <li><strong>Full Scale (Level 4 Major Scale / Minor 4 Minor Scale):</strong> All 8 diatonic intervals from Unison up to Octave in Major or Natural Minor.</li>
        <li><strong>Level 5 – Chromatic:</strong> All 15 intervals from Unison up to Major 9th (<code>M9</code>), including all minor/major intervals and the Tritone (<code>TT</code>).</li>
        <li><strong>Custom Key &amp; Modes (Custom Interval Trainer):</strong> Pick a fixed <strong>Root Key</strong> (<code>C</code> through <code>B</code>) or <strong>Random</strong>, choose any <strong>Scale or Church Mode</strong> (<em>Major/Ionian</em>, <em>Natural/Harmonic/Melodic Minor</em>, <em>Dorian</em>, <em>Phrygian</em>, <em>Lydian</em>, <em>Mixolydian</em>, <em>Locrian</em>, <em>Chromatic</em>), select a <strong>Range</strong> (<em>Beginner</em>, <em>1–4</em>, <em>5–8</em>, <em>1–8</em>), or toggle individual intervals on and off — both on the category screen and live inside the exercise via the top-right badge.</li>
      </ul>

      <h3>How Interval Symbols Work</h3>
      <ul class="article-steps-list">
        <li><strong>Letter = Quality (Color), Number = Scale Distance (<code>1</code>–<code>9</code>):</strong> The number counts letter-name steps from the starting note (<code>1</code> = Unison, <code>2</code> = 2nd, <code>3</code> = 3rd … up to <code>9</code> = 9th), while the prefix clarifies the exact semitone width.</li>
        <li><strong><code>P</code> = Perfect:</strong> Applies to Unison (<code>P1</code>), 4th (<code>P4</code>), 5th (<code>P5</code>), and Octave (<code>P8</code>). Perfect intervals don’t split into major/minor — they lock together with open acoustic clarity.</li>
        <li><strong><code>M</code> &amp; <code>m</code> (International) or <code>G</code> &amp; <code>k</code> (German):</strong> Used for 2nds (<code>2</code>), 3rds (<code>3</code>), 6ths (<code>6</code>), 7ths (<code>7</code>), and 9ths (<code>9</code>):<br>
          – <strong>Uppercase <code>M</code></strong> (<em>Major</em>, German <strong><code>G</code></strong> = <em>Groß</em>) marks the wider, brighter version (e.g., <code>M3</code> / <code>G3</code> = Major 3rd, 4 semitones).<br>
          – <strong>Lowercase <code>m</code></strong> (<em>Minor</em>, German <strong><code>k</code></strong> = <em>klein</em>) is always <strong>1 semitone narrower</strong>, warmer or more tense (e.g., <code>m3</code> / <code>k3</code> = Minor 3rd, 3 semitones). Watch the case difference in <code>m</code> vs. <code>M</code> — they represent completely distinct sounds!</li>
        <li><strong><code>TT</code> = Tritone:</strong> The electric 6-semitone midpoint splitting the octave cleanly between <code>P4</code> and <code>P5</code>.</li>
      </ul>
      <p><em>Switch Notation:</em> You can toggle between <strong>International (P / M / m)</strong> and <strong>German (P / G / k)</strong> anytime under <strong>App Settings → Musical Notation → Interval Naming</strong>.</p>

      <div class="article-highlight-box">
        <h4>Sing Along, A/B Compare &amp; Exam</h4>
        <p>The top <strong>Sing along</strong> chip (with optional hum pause) invites your voice to feel the distance. Below, <strong>Root Note</strong> replays the starting pitch anytime; after a miss, <strong>A/B Compare</strong> plays your guess from the exact same starting pitch and direction right against the solution. Use <strong>Loop</strong> to repeat continuously (enable <strong>Auto-Next</strong> in Settings to jump straight to the next question on a hit), try <strong>Listen Only</strong> for passive review, or take the <strong>Category Exam</strong> across all 4 interval types (Major, Minor, Scale Halves, Major &amp; Minor mixed, Chromatic, and Custom Key &amp; Modes).</p>
      </div>
    `
  },
  chords: {
    tagClass: "tag-sage",
    tag: "How It Works • Chords",
    title: "How Chord Training Works",
    lead: "Build instant recognition for chord qualities whether rolled note by note (upward or downward arpeggios) or struck simultaneously — plus learn to spot which chord tone is anchoring the bass.",
    sections: `
      <h3>The 4 Exercise Types</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Chord Arpeggio (Ascending ↗)</h5>
          <p>Chord tones sound one after another from bottom to top so you can trace every 3rd, 5th, and 7th clearly — once solved, the app locks them together into a full block chord.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Chord Arpeggio (Descending ↘)</h5>
          <p>The chord unwinds downward from top to bottom. Great for breaking reading-direction habits — after answering, the full simultaneous chord reveals the unified harmony.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Chords (Simultaneous)</h5>
          <p>Three to five notes chime together as one color. Listen for overall brightness or tension — solved cards cascade through an ascending arpeggio showing every note (e.g., <code>C4 · E4 · G4 · B4</code>).</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Chord Inversions</h5>
          <p>Spot which chord tone holds the bottom bass voice: <code>Bass: 1</code> (Root Position), <code>Bass: 3</code> (1st Inversion), <code>Bass: 5</code> (2nd Inversion), or <code>Bass: 7</code> (3rd Inversion). The bass pitch stays centered in mid-register so you judge voicing tension rather than pitch height.</p>
        </div>
      </div>

      <h3>Chord Quality Difficulty (4 Levels)</h3>
      <ul class="article-steps-list">
        <li><strong>Level 1 – Basic Triads:</strong> The four core triads: Major (<code>maj</code>), Minor (<code>m</code>), Diminished (<code>dim</code>), and Augmented (<code>aug</code>).</li>
        <li><strong>Level 2 – 7ths &amp; Sus:</strong> Adds Suspended 4th (<code>sus4</code>), Dominant 7th (<code>7</code>), Major 7th (<code>maj7</code>), and Minor 7th (<code>m7</code>).</li>
        <li><strong>Level 3 – Extended 7ths:</strong> Adds <code>sus2</code>, Half-Diminished (<code>m7♭5</code>), Fully Diminished (<code>°7</code>), and Minor-Major 7th (<code>m(maj7)</code>).</li>
        <li><strong>Level 4 – Jazz &amp; Tensions:</strong> All 15 chord colors including lush jazz extensions like <code>maj9</code>, <code>7♭9</code>, and <code>7♯9</code>.</li>
      </ul>

      <h3>Inversion Difficulty (3 Levels)</h3>
      <ul class="article-steps-list">
        <li><strong>Level 1 – Major Triad (3):</strong> Root position (<code>Bass: 1</code>), 1st inversion (<code>Bass: 3</code>), and 2nd inversion (<code>Bass: 5</code>).</li>
        <li><strong>Level 2 – Major &amp; Minor (3):</strong> All three triad positions mixed across bright Major and warm Minor chords.</li>
        <li><strong>Level 3 – 7th Chords (4):</strong> Four-note seventh chords (<code>7</code>, <code>maj7</code>, <code>m7</code>) introducing 3rd inversion with the 7th in the bass (<code>Bass: 7</code>).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Practice Tips</h4>
        <p><strong>Chord Root</strong> replays the chord root pitch anytime; after a miss, <strong>A/B Compare</strong> plays your pick on the exact same root right before the true answer, and in inversions <strong>Hear Bass Note</strong> isolates the lowest voice cleanly. You can also toggle <strong>Loop</strong>, <strong>Listen Only</strong>, and the 4-level <strong>Category Exam</strong>.</p>
      </div>
    `
  },
  melody: {
    tagClass: "tag-lilac",
    tag: "How It Works • Melodies",
    title: "How Melody Training Works",
    lead: "Combine your Solfège ear with real musical phrasing directly on a 5-line musical staff: a 4-chord context cadence leads through a 1-bar count-in straight into a 4–6 note phrase.",
    sections: `
      <h3>Step-by-Step Round Flow</h3>
      <ul class="article-steps-list">
        <li><strong>1. Cadence, Count-In &amp; Musical Staff:</strong> A fixed 4-chord progression (<code>I – vi – IV – V</code>) grounds your ear in the key, followed by a 1-bar count-in in <code>4/4</code> or <code>3/4</code> before 4–6 musical notes play with eighths, quarters, dotted quarters, half notes, and rests shown right on the staff.</li>
        <li><strong>2. Three Selectable Styles:</strong> On the category screen, pick <strong>Rhythmic Melody</strong> (note durations appear directly on the staff while you solve pitch), <strong>Full Dictation</strong> (solve both pitch on the keyboard <em>and</em> note value — <code>1/8</code>, <code>1/4</code>, <code>1/4.</code>, <code>1/2</code> — below in either order), or <strong>Steady (Basics)</strong> (4 even half notes for gentle onboarding).</li>
        <li><strong>3. Step-by-Step Staff Discovery:</strong> Once a note is fully solved, its <strong>Solfège name</strong> (or degree number <code>1–7</code>) appears below the staff and focus moves cleanly to the next question mark.</li>
        <li><strong>4. Replay &amp; Tap Notes Directly:</strong> Tap <strong>▶ Play</strong> anytime to re-hear the full phrase while solved notes stay visible. <strong>Replay Tone</strong> (or tapping a solved/current note right on the staff) isolates just that note with a short pulse reference.</li>
      </ul>

      <h3>Levels, Keys &amp; Controls</h3>
      <ul class="article-steps-list">
        <li><strong>Level 1 – Do–Fa:</strong> 4–5 note phrases drawn from the lower tetrachord (<code>Do, Re, Mi, Fa</code>).</li>
        <li><strong>Level 2 – Sol–Do:</strong> 4–6 note phrases focused on the upper tension space (<code>Sol, La, Ti, Do</code>).</li>
        <li><strong>Level 3 – Full Key:</strong> All seven Solfège degrees (<code>Do</code> through <code>Do</code>) across 4–6 notes.</li>
        <li><strong>Key Modes, Octaves &amp; Helpers:</strong> Train in fixed <code>C Major</code> or random keys, and within 1 octave or across multiple registers. Above the staff, control <strong>Key</strong>, <strong>Pulse: On/Off</strong>, and <strong>Tempo (BPM)</strong>; below sit <strong>Tonic (Do)</strong>, <strong>Auto-Next</strong> (bottom left), <strong>Listen Only</strong>, plus a 5-level <strong>Category Exam</strong>.</li>
      </ul>
    `
  },
  solfege: {
    tagClass: "tag-sage",
    tag: "How It Works • Solfège",
    title: "How Functional Solfège Works",
    lead: "Movable-Do Solfège builds relative pitch in both Major and Minor: you learn to recognize each scale degree (Do–Ti, Do–Re–Me–Fa–Sol–Le–Te, or scale numbers) by its signature tension and pull inside a key.",
    sections: `
      <h3>Every Round Follows 4 Clear Steps</h3>
      <ul class="article-steps-list">
        <li><strong>1. Context Cadence:</strong> A short reference progression tunes your ear cleanly into the key — <code>I – vi – IV – V</code> in Major or <code>i – VI – iv – V</code> in Minor.</li>
        <li><strong>2. Target Degree:</strong> After a brief pause, you hear one isolated degree from the active scale range.</li>
        <li><strong>3. Play It on the Keyboard:</strong> Only active notes carry labels (Major: <em>Do–Re–Mi–Fa–Sol–La–Ti–Do</em>, Minor: <em>Do–Re–Me–Fa–Sol–Le–Te–Do</em>, or optional <em>Scale Numbers</em>), framed neatly with one border key on each side; inactive keys stay dimmed.</li>
        <li><strong>4. Silent Misses &amp; Natural Resolution:</strong> Wrong keys flash soft red silently so your tonal memory stays clean. Landing the right key highlights green and plays its functional resolution back home (<code>Do–Fa</code> downward, <code>Sol–Ti/Te</code> upward).</li>
      </ul>

      <h3>Major, Minor &amp; Custom Key (Level Progression)</h3>
      <ul class="article-steps-list">
        <li><strong>Levels 1 &amp; 2 – Scale Halves (4 Notes Each):</strong> Gentle starter stages with just 4 active keys — first the lower half <code>Do–Fa</code>, then the upper half <code>Sol–Do</code> in fixed <code>C Major</code> or <code>C Minor</code>.</li>
        <li><strong>Levels 3 &amp; 4 – Full Scale (1 Octave):</strong> All 7 degrees in fixed <code>C Major</code> / <code>C Minor</code> (Level 3) or a steady random key for the whole session (Level 4).</li>
        <li><strong>Levels 5 &amp; 6 – Multi-Octave:</strong> Target degrees jump into lower or higher octaves — in fixed <code>C Major</code> / <code>C Minor</code> (Level 5) or a fixed random key (Level 6).</li>
        <li><strong>Levels 7 &amp; 8 – Key Modulations:</strong> Every solved question modulates into a brand-new key — first within 1 octave (Level 7), then across multiple octaves (Level 8).</li>
        <li><strong>Full Major &amp; Minor Parity:</strong> All 8 levels are available symmetrically for both Major and Natural Minor.</li>
        <li><strong>Custom Key (Major &amp; Minor):</strong> Freely choose Major or Minor, any of the 12 keys (or Random), scale range (<code>Do–Fa</code>, <code>Sol–Do</code>, <code>Full Scale</code>), and octave register — either before starting or anytime via the clickable badge in the top right of the exercise.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Helpers, Sing Along, Labels &amp; Exam</h4>
        <p>At the top, the <strong>Sing along</strong> chip (with optional hum pause) invites you to sing back to Do / 1, while <strong>BPM</strong> sits right beside it. Above the keyboard sit the <strong>Key Badge</strong> (tap for the Major or Minor tonic triad), <strong>Tonic (Do)</strong>, and <strong>Replay Tone</strong>. Below, the purple <strong>Loop button</strong> repeats the target note every 3 seconds, and <strong>Listen Only</strong> reveals and resolves automatically. Switch between <strong>Syllables</strong> and <strong>Numbers</strong> (<code>1–7</code> / <code>b3, b6, b7</code>) or <strong>Auto-Next</strong> anytime in <strong>App Settings</strong> — and take the <strong>Category Exam</strong> across Major, Minor, Halves, Major &amp; Minor mixed, or your Custom Key.</p>
      </div>
    `
  },
  rhythm: {
    tagClass: "tag-sage",
    tag: "How It Works • Rhythm",
    title: "How Rhythm Training Works",
    lead: "Four varied modules sharpen meter sensing, rhythmic dictation, ear tap-back &amp; sight-tapping, and pocket groove feel — cleanly drawn on a single-line percussion staff and adjustable in real time by tempo (BPM).",
    sections: `
      <h3>The 4 Rhythm Modules</h3>
      <ul class="article-steps-list">
        <li><strong>1. Time Signature &amp; Meter (3 Levels):</strong> Listen to two bars of percussion (with an accented Beat <code>1</code>) and distinguish <code>4/4</code> &amp; <code>3/4</code> (Level 1), <code>2/4</code> &amp; <code>6/8</code> (Level 2), and odd meters <code>5/4</code> &amp; <code>7/8</code> (Level 3). Use <strong>Quarter Pulse</strong> anytime as a neutral reference.</li>
        <li><strong>2. Rhythm Dictation (4 Beats, 4 Levels):</strong> After one count-in bar, a four-beat pattern plays on clave over the single-line staff. Fill in all four beats step by step (from quarters &amp; rests through offbeats &amp; triplets to 16th notes and dotted syncopations) using <strong>Metronome (1–4)</strong>, <strong>Replay Beat</strong> (or tapping a beat), and <strong>Auto-Next</strong>.</li>
        <li><strong>3. Rhythm Tap: Tap-Back &amp; Tap from Notation (4 Levels each):</strong> In <strong>Tap-Back</strong>, Lauscher counts in, demonstrates one bar, and hands it straight to you on the <strong>Tap Pad</strong> (or <code>Spacebar</code>) — including <strong>Click: On/Off</strong>, <strong>Listen Only</strong> preview, and Level 4 <em>Blind Mode</em>. In <strong>Tap from Notation</strong>, there is no audio demo: read the pattern straight off the staff and tap to the metronome after 1 bar of count-in (Level 4: <em>No Metronome</em>). Afterward, a visual <strong>timeline</strong> scores every hit as <code>exact</code>, <code>close (±ms)</code>, <code>missed</code>, or <code>extra</code>.</li>
        <li><strong>4. Groove, Offbeats &amp; Micro-Timing (4 Levels):</strong> Level 1 spots <em>Groove Styles</em> (march, backbeat, syncopation, swing, 3-against-2), Level 2 finds the <em>Offbeat Cowbell Accent</em> (<code>1</code>–<code>4+</code>), Level 3 trains <em>Micro-Timing (±55 ms)</em> and Level 4 <em>Pro Timing (±28 ms)</em> (rushing / early, in the pocket, or laid-back).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Practice Tips &amp; Category Exam</h4>
        <p>Start <strong>Rhythm Tap</strong> with the <strong>Click helper ON</strong> around 80–95 BPM and toggle <strong>Auto-Next</strong> bottom-left if desired. Once your clock feels solid, tackle <strong>Blind Mode</strong>, <strong>Tap from Notation without Metronome</strong>, <strong>Listen Only</strong>, or the 4-level <strong>Category Exam</strong>.</p>
      </div>
    `
  },
  production: {
    tagClass: "tag-lilac",
    tag: "How It Works • Production & Mixing",
    title: "How Frequency & EQ Training Works",
    lead: "Calibrate your mixing ears across standard studio frequency bands — starting with isolated sine waves across 5 to 12 bands and advancing to live parametric EQ boosts inside pink noise.",
    sections: `
      <h3>The 2 Production Modules</h3>
      <ul class="article-steps-list">
        <li><strong>1. Frequency Recognition (Sine Wave, 3 Levels):</strong> Hear a level-matched sine tone from Sub-Bass (<code>63 Hz</code>) to Air highs (<code>12 kHz</code>) across <strong>5 Main Bands</strong>, <strong>8 Octave Bands</strong>, or <strong>12 Bands</strong>. Tap <strong>“Ref: 1 kHz”</strong> anytime to recalibrate your ear.</li>
        <li><strong>2. Pink Noise EQ Boost (3 Levels):</strong> In <strong>free practice</strong>, continuous pink noise starts straightaway <strong>with the active EQ boost</strong> (Level 1: Wide EQ <code>+10 dB / Q 1.6</code>, Level 2: Octave EQ <code>+8.5 dB / Q 2.6</code>, Level 3: Surgical <code>+7 dB / Q 4.2</code>). Toggle between boosted and raw sound smoothly anytime via the upper <strong>Flat card</strong> or the <strong>“Flat Bypass”</strong> button (<code>Flat: ON</code>). In <strong>Listen Only</strong> mode, the app plays neutral <em>Flat</em> noise first, then switches to the longer <em>EQ boost</em> before automatically revealing the band.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Hearing Safety, Comparison &amp; Exam</h4>
        <p>Pink noise drops 3 dB per octave so energy feels balanced from bass to treble. A built-in -14 dBFS safety limiter, equal-loudness compensation around 2–4 kHz, and smooth fades protect your ears. After a miss, <strong>A/B Compare</strong> and <strong>Flat → Target EQ</strong> isolate the difference cleanly — and all 3 levels are available in the <strong>Category Exam</strong>.</p>
      </div>
    `
  },
  modes: {
    tagClass: "tag-peach",
    tag: "How It Works • Scales & Modes",
    title: "How Scales & Modes Training Works",
    lead: "Skip dry fingerboard memorization: hear every church mode in live musical color — anchored over one root or transposed across keys, with an optional sustained strings root pad underneath.",
    sections: `
      <h3>The 3 Mode Modules</h3>
      <ul class="article-steps-list">
        <li><strong>1. Identify Scale / Mode (3 Levels):</strong> A neutral <strong>Anchor Fifth</strong> rings out first (root + 5th, intentionally without a 3rd), followed by the ascending 8-note scale: Level 1 teaches 4 core modes (<code>Ionian, Aeolian, Dorian, Mixolydian</code>), Level 2 covers all 7 in <code>C</code>, and Level 3 rotates root pitches.</li>
        <li><strong>2. Characteristic Note &amp; Color (3 Levels):</strong> After the anchor fifth, a melodic turn highlights each mode’s signature tone (<code>#4</code> Lydian, <code>b7</code> Mixolydian, <code>♮6</code> Dorian, <code>b2</code> Phrygian, or leading <code>#7</code> in <strong>Harmonic Minor</strong>) across Major modes (Level 1), Minor modes (Level 2), and All 7 + Harmonic Minor on random roots (Level 3).</li>
        <li><strong>3. Modal Cadences &amp; Chord Loops (2 Levels):</strong> Hear signature two-chord modal loops (<code>i – IV</code> Dorian, <code>I – bVII</code> Mixolydian, <code>I – II</code> Lydian, <code>i – bII</code> Phrygian) — starting with 4 standard chord loops in <code>C</code> (Level 1) up to all 6 transposed modal chord loops (Level 2). A chord loop is two chords alternating again and again, revealing the color of the mode.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Root Pad, Anchor Fifth &amp; A/B Compare</h4>
        <p>Think parallel, not relative: compare modes starting on the <strong>same root</strong> (e.g., <strong>C Ionian</strong> vs. <strong>C Mixolydian</strong>). Toggle <strong>“Root Pad: On/Off”</strong> at the top of the stage to sustain a warm strings drone under any task; tap <strong>“Anchor Fifth”</strong> (or the left card) anytime, and after a miss use <strong>A/B Compare</strong> over that exact root. <strong>Loop</strong>, <strong>Listen Only</strong>, and a 3-level <strong>Category Exam</strong> are ready too.</p>
      </div>
    `
  },
  warmup: {
    tagClass: "tag-sage",
    tag: "How It Works • Vocal Warmup",
    title: "How the Guided Vocal Warmup Works",
    lead: "Built for choir rehearsals, voice lessons, and home practice: choose one of 5 vocal ranges (SATB) and launch any of 7 structured routines — complete with pacing breath orb, live keyboard, and instant key control.",
    sections: `
      <h3>7 Selectable Routines &amp; 4 Warmup Phases</h3>
      <ul class="article-steps-list">
        <li><strong>7 Programs to Choose From:</strong> Pick <strong>Arpeggio &amp; Register Drill</strong> for agility, <strong>Scales (Major &amp; Minor)</strong>, <strong>Breath &amp; Support</strong> (4–7–8 relaxation, Farinelli ladder 4–10 s, long hiss sustain up to 20 s &amp; core pulse-to-sustain), <strong>Vocal Sirens &amp; Register Flow</strong> (smooth gliding with live pitch curve), <strong>Compact Warmup (~3 Min.)</strong> for a fast lesson opener, the <strong>5-Min Complete Vocal Warmup</strong> (all 4 phases incl. major &amp; minor scales), or <strong>Choir Breath &amp; Intonation</strong>.</li>
        <li><strong>Phase 1 – Breath &amp; Body:</strong> A pacing breath orb on <code>ffff / ssss</code> and gentle rhythmic articulation pulses (<code>P – T – K</code>) wake up breath support without pressing the throat.</li>
        <li><strong>Phase 2 – Resonance &amp; Placement:</strong> Easy humming / lip trills (<code>Mmm / Brrr</code>) and descending 5th sighs (<code>5–4–3–2–1</code>) blend chest and head resonance gently.</li>
        <li><strong>Phase 3 &amp; 4 – Scales, Arpeggios &amp; Choral Blend:</strong> Full octave scales in <strong>major as well as natural, harmonic &amp; melodic minor</strong> plus triad and octave arpeggios automatically modulate by semitone in your chosen <strong>Choir Mid, Soprano, Alto, Tenor, or Bass</strong> range, followed by vowel morphing (<code>Oo → Oh → Ah → Eh → Ee</code>) and a layered SATB closing chord.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Live Teaching Controls &amp; Keyboard</h4>
        <p>Use the top chips anytime to switch <strong>Vocal Range (SATB)</strong>, <strong>Sound</strong> (Piano, Piano + Voice, or Voice), and <strong>Tempo</strong>, or jump straight between sections using the <strong>phase pills</strong>. Tap <strong>“−1 / +1 Semitone”</strong> and <strong>“Replay”</strong> mid-exercise, or play single reference tones directly on the <strong>live keyboard</strong> below.</p>
      </div>
    `
  },
  notation: {
    tagClass: "tag-sage",
    tag: "How It Works • Notation & Sight-Reading",
    title: "How Sight-Reading Training Works",
    lead: "Build effortless sight-reading across 6 modes: Treble, Bass, and Alto clefs, Clef Mix, two-staff piano Grand Staff, and Chord Reading (including inversions &amp; 7th chords).",
    sections: `
      <h3>All 6 Exercise Modes &amp; Input</h3>
      <ul class="article-steps-list">
        <li><strong>1. Single-Note Clefs (6-Note Flow):</strong> In <strong>Treble</strong>, <strong>Bass</strong>, <strong>Alto</strong>, <strong>Mixed Clefs</strong> (switches every 3 notes with a small clef preview), and two-line <strong>Grand Staff</strong> (Treble + Bass joined by a piano brace), the leftmost band marks the target note. Play it on the keyboard below to hear its true octave and advance the flow.</li>
        <li><strong>2. Chord Reading (5 Chords, Multiple Choice):</strong> Stacked triads and seventh chords appear on the staff. Instead of individual keys, pick matching <strong>chord symbol tiles</strong> (e.g., <code>E, Em, E7, Esus4</code>) across <strong>4 levels</strong>: Level 1 (Triads in Treble), Level 2 (Triads in Bass), Level 3 (Inversions in both clefs), and Level 4 (All Types &amp; 7th Chords).</li>
        <li><strong>3. Wrong Picks &amp; Skip:</strong> Wrong keys or chord tiles highlight red and pause the row so you can inspect the staff position, clef, or inversion calmly. Tap <strong>Skip</strong> anytime to reveal the answer on stage and continue.</li>
      </ul>

      <h3>Difficulty Levels &amp; Key Signatures</h3>
      <ul class="article-steps-list">
        <li><strong>Single-Note Levels 1–4:</strong> Level 1 (5 staff lines &amp; 4 spaces), Level 2 (<code>±2 Ledger Lines</code>), Level 3 (<code>±3 Ledger Lines</code>), and Level 4 with local sharps/flats (<code>♯</code>/<code>♭</code>) or <strong>natural cancellations (<code>♮</code>)</strong> when a key signature is active — in International (<code>B / B♭ / F♯</code>) or German spelling (<code>H / B / Fis</code>).</li>
        <li><strong>Key Signature Sight-Reading (1–6 ♯/♭):</strong> Pick any individual key or rotating pool (Easy, Medium, All 12) on the Notation page or via the live <strong>Key</strong> chip in the header. Sharps and flats appear only at the clef like real sheet music.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Audio Controls, Listen Only &amp; Exam</h4>
        <p>Above the input area, <strong>Note Audio: On/Off</strong> lets you mute playback completely for silent sheet-reading practice. Below, <strong>▶ Hear Note</strong> / <strong>▶ Hear Chord</strong> gives an optional audio hint in free practice — while inside the 6-level <strong>Category Exam</strong> it switches to <strong>▶ Anchor Pitch</strong> (<code>G4</code> / <code>F3</code> / <code>C4</code>) so answers aren’t given away. On the right, <strong>Listen Only</strong> drives automatic sight-reading at your chosen <strong>Pace</strong> (<em>Very slow</em> to <em>Very fast</em>).</p>
      </div>
    `
  }
};

function renderRhythmReferenceHTML_EN() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Beat &amp; Time Signatures</span>
        <span class="k-ratio-chip">Meter</span>
      </div>
      <h4>What Holds Every Piece Together in Time</h4>
      <p>
        Almost all music breathes with a steady heartbeat called the <strong>pulse (or beat)</strong>. How fast that pulse moves is measured in <strong>BPM</strong> (<em>Beats per Minute</em>). A <strong>time signature</strong> groups those beats into repeating bars — most clearly felt on the accented <strong>downbeat (Beat 1)</strong>.
      </p>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>4/4 Time (Common Time)</strong>
          <span>Four quarter-note beats per bar (<strong>1</strong>–2–3–4). The backbone of almost all pop, rock, hip-hop, and funk.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>3/4 Time (Waltz Meter)</strong>
          <span>Three quarter-note beats per bar (<strong>1</strong>–2–3). Swirling and circular (<em>Blue Danube</em>, <em>Piano Man</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>6/8 Time (Compound Duple)</strong>
          <span>Six eighth notes grouped in two rolling triplets (<strong>1</strong>-2-3-<strong>4</strong>-5-6): signature feel for sweeping ballads (<em>Nothing Else Matters</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>5/4 Time (Odd Meter)</strong>
          <span>Unsymmetrical 3 + 2 (or 2 + 3) grouping, famous from Dave Brubeck’s jazz classic <em>Take Five</em> and the <em>Mission: Impossible</em> theme.</span>
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="meter-4-4">▶ 4/4 Common</button>
        <button class="btn-tool" data-play-rhythm="meter-3-4">▶ 3/4 Waltz</button>
        <button class="btn-tool" data-play-rhythm="meter-6-8">▶ 6/8 Rolling</button>
        <button class="btn-tool" data-play-rhythm="meter-5-4">▶ 5/4 Odd (3+2)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Note Values &amp; Subdivisions</span>
        <span class="k-ratio-chip">1 · 2 · 3 · 4</span>
      </div>
      <h4>How a Single Heartbeat Gets Divided</h4>
      <p>
        While the kick drum anchors the steady main pulse, players slice each beat into smaller ripples (<strong>subdivision</strong>). Adding a <strong>dot</strong> right after a note extends its length by half again — creating signature “long-short” skips.
      </p>
      <ul class="k-physics-list">
        <li><strong>Whole &amp; Half Notes:</strong> Broad sustains spanning 4 beats or 2 beats respectively.</li>
        <li><strong>Quarter Notes:</strong> Right on every main pulse (<em>1 – 2 – 3 – 4</em>).</li>
        <li><strong>Eighth Notes:</strong> Two equal hits per beat (<em>1-and – 2-and</em>).</li>
        <li><strong>Triplets:</strong> Three equal notes squeezed evenly into one beat (<em>1-trip-let – 2-trip-let</em>).</li>
        <li><strong>Sixteenth Notes:</strong> Four crisp hits per beat (<em>1-e-and-a</em>) — the engine behind funk grooves and trap hi-hats.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="sub-quarter">▶ Quarters (1×)</button>
        <button class="btn-tool" data-play-rhythm="sub-eighth">▶ Eighths (2×)</button>
        <button class="btn-tool" data-play-rhythm="sub-triplet">▶ Triplets (3×)</button>
        <button class="btn-tool" data-play-rhythm="sub-sixteenth">▶ Sixteenths (4×)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Groove, Backbeat &amp; Swing</span>
        <span class="k-ratio-chip">Onbeat vs. Offbeat</span>
      </div>
      <h4>Why the Same 4/4 Bar Can Groove Night and Day</h4>
      <p>
        Whether a rhythm marches stiffly or makes your head nod immediately comes down to where the accents fall:
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>March vs. Backbeat (2 &amp; 4)</h5>
          <p>Accenting beats <strong>1 &amp; 3</strong> sounds like a brass march. Flip that snare snap onto <strong>2 &amp; 4</strong> (the <em>backbeat</em>) and modern pop, rock, and soul are born!</p>
          <button class="btn-tool" data-play-rhythm="beat-march">▶ March (1 &amp; 3)</button>
          <button class="btn-tool" data-play-rhythm="beat-backbeat">▶ Backbeat (2 &amp; 4)</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Syncopation &amp; Swing / Shuffle</h5>
          <p><strong>Syncopation</strong> shifts emphasis onto weak upbeats (“and”). In <strong>swing</strong>, eighth notes roll unevenly (roughly 2:1 triplet bounce instead of straight 1:1).</p>
          <button class="btn-tool" data-play-rhythm="beat-syncopation">▶ Syncopated Groove</button>
          <button class="btn-tool" data-play-rhythm="beat-swing">▶ Swing Feel</button>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Polyrhythm &amp; Song Anchors</span>
        <span class="k-ratio-chip">3 against 2</span>
      </div>
      <h4>Two Clocks at Once + Iconic Song Cues</h4>
      <p>
        <strong>Polyrhythm</strong> layers two contrasting pulse grids simultaneously — most famously <strong>3 against 2</strong> (the woodblock divides the bar into 3 while the bass drum hits 2 even strokes across the very same span). Remember Physics &amp; Sound? That exact <code>3:2</code> ratio in pitch is a Perfect 5th!
      </p>
      <div class="k-meta-box">
        <strong>Lock Meters to Unforgettable Songs:</strong>
        <ul class="k-physics-list" style="margin-top:0.25rem;">
          <li><strong>4/4 Time:</strong> “We Will Rock You” (Queen) • “Billie Jean” (Michael Jackson)</li>
          <li><strong>3/4 Time:</strong> “Piano Man” (Billy Joel) • Classic Viennese Waltz</li>
          <li><strong>6/8 Time:</strong> “Nothing Else Matters” (Metallica) • “We Are the Champions” (Queen)</li>
          <li><strong>5/4 Time:</strong> “Take Five” (Dave Brubeck) • “Mission: Impossible”</li>
        </ul>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="poly-3-2">▶ Hear “3 Against 2” Polyrhythm</button>
      </div>
    </article>
  `;
}

const RHYTHM_INSTRUMENTS_DATA_EN = [
  {
    category: "drumset",
    tag: "Drum Kit • Low End Anchor",
    tagClass: "tag-peach",
    name: "Bass Drum / Kick",
    role: "Weight & chest punch (Low band ~50–120 Hz)",
    desc: "The largest drum in the kit, played with a foot pedal. Anchors heavy beats (usually 1 & 3, or a steady four-on-the-floor pulse in dance music) and locks tightly with the bass guitar.",
    rhythmKey: "inst-kick",
    btnLabel: "Hear Kick Pulse"
  },
  {
    category: "drumset",
    tag: "Drum Kit • Backbeat Snap",
    tagClass: "tag-peach",
    name: "Snare Drum",
    role: "Crisp accent on Beats 2 & 4",
    desc: "Stranded metal snare wires stretched across the bottom head buzz against the shell on impact, creating that sharp pop/rock crack, subtle ghost notes, and tight rolls.",
    rhythmKey: "inst-snare",
    btnLabel: "Hear Snare & Roll"
  },
  {
    category: "drumset",
    tag: "Drum Kit • Subdivisions",
    tagClass: "tag-peach",
    name: "Hi-Hat & Cymbals (Ride / Crash)",
    role: "Fine timekeeping & section cues",
    desc: "Two foot-controlled cymbals (hi-hat) tick flowing eighth or sixteenth subdivisions. A large ride cymbal carries shimmering jazz swing, while crash cymbals ignite chorus downbeats.",
    rhythmKey: "inst-hat",
    btnLabel: "Hear Hi-Hat Subdivision"
  },
  {
    category: "drumset",
    tag: "Drum Kit • Melodic Fills",
    tagClass: "tag-peach",
    name: "Toms (Rack & Floor Toms)",
    role: "Transitions, fills & tumbling rolls",
    desc: "Graded drums without snare wires beneath them. Tuned from high to low, they cascade down in pitch to link verses into choruses.",
    rhythmKey: "inst-toms",
    btnLabel: "Hear Tom Fill"
  },
  {
    category: "world",
    tag: "Hand Percussion • All-Rounder",
    tagClass: "tag-lilac",
    name: "Cajón (Box Drum)",
    role: "Portable acoustic mini-kit",
    desc: "A wooden box drum from Peru you sit on: striking near the center produces deep kick-like thump, while tapping the top edge snaps internal snare wires."
  },
  {
    category: "world",
    tag: "Hand Percussion • Latin & Pop",
    tagClass: "tag-lilac",
    name: "Congas & Bongos",
    role: "Rolling grooves & crisp embellishments",
    desc: "Tall paired Afro-Cuban hand drums. Congas carry singing, rolling tumbao grooves while smaller bongos sparkle above with sharp high accents.",
    rhythmKey: "inst-conga",
    btnLabel: "Hear Conga Tumbao"
  },
  {
    category: "world",
    tag: "Hand & Orchestral",
    tagClass: "tag-lilac",
    name: "Djembe, Darbuka & Timpani",
    role: "Whisper to thunder dynamics",
    desc: "Goblet drums like the West African djembe combine subby bass tones with cracking slaps. In symphony orchestras, pedal-tuned timpani add unmistakable definite pitch to thunderous rhythms."
  },
  {
    category: "small",
    tag: "Timekeeper • Wood",
    tagClass: "tag-sage",
    name: "Claves & Woodblock",
    role: "Laser-sharp timing compass",
    desc: "Two resonant hardwood sticks clicked together. Despite fitting in one hand, their bright crack cuts through an entire big band — forming the 3–2 Son Clave backbone of salsa and Latin groove.",
    rhythmKey: "inst-clave",
    btnLabel: "Hear 3–2 Son Clave"
  },
  {
    category: "small",
    tag: "Small Percussion • Motion",
    tagClass: "tag-sage",
    name: "Shaker, Maracas & Tambourine",
    role: "Forward momentum & airy texture",
    desc: "Bead-filled shakers weave continuous sixteenth-note ripples that bridge kick and snare hits, injecting instant drive even into slow tracks.",
    rhythmKey: "inst-shaker",
    btnLabel: "Hear Shaker Layer"
  },
  {
    category: "small",
    tag: "Small Percussion • Metal",
    tagClass: "tag-sage",
    name: "Cowbell, Agogô & Triangle",
    role: "Piercing offbeats & bright accents",
    desc: "High-cut metallic voices loved across funk, disco, and Latin hooks — including the two-toned call-and-response of agogô bells.",
    rhythmKey: "inst-cowbell",
    btnLabel: "Hear Cowbell Riff"
  },
  {
    category: "small",
    tag: "Don’t Overlook These!",
    tagClass: "tag-sage",
    name: "Bass Guitar, Upright Bass & Rhythm Guitar",
    role: "The bridge between rhythm & harmony",
    desc: "Groove isn’t only for drummers! Kick drum and bass lock together as the Rhythm Section’s engine, while crisp muted strums on guitar or clavinet act just like pitched percussion."
  }
];

function renderRhythmInstrumentsHTML_EN(filterCat = "all") {
  const list = filterCat === "all"
    ? RHYTHM_INSTRUMENTS_DATA_EN
    : RHYTHM_INSTRUMENTS_DATA_EN.filter(i => i.category === filterCat);

  const ensembleCard = filterCat === "all" ? `
    <div class="article-highlight-box" style="margin-bottom:0.2rem;">
      <h4>How Percussion Shares One Groove (Frequency Division):</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-dark); line-height:1.4;">
        Every instrument claims its own sonic lane so the groove stays crisp: <strong>Kick</strong> at the bottom, <strong>Snare</strong> punching the midrange, <strong>Hi-Hat &amp; Shaker</strong> sparkling at the top.
      </p>
      <div class="k-btn-row" style="margin-top:0.35rem;">
        <button class="btn-tool" data-play-rhythm="band-groove">▶ Band Groove (Kick + Snare + Hat + Shaker)</button>
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
      <p><strong>Role:</strong> ${item.role}</p>
      <p>${item.desc}</p>
      ${item.rhythmKey ? `
        <div class="k-btn-row">
          <button class="btn-tool" data-play-rhythm="${item.rhythmKey}">▶ ${item.btnLabel}</button>
        </div>
      ` : ""}
    </article>
  `).join("");
}

function renderVocalsReferenceHTML_EN() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">The Human Voice</span>
        <span class="k-ratio-chip">The First Instrument</span>
      </div>
      <h4>How the Human Voice Produces Sound</h4>
      <p>Your voice packs three mechanical-acoustic systems inside one living instrument. Unlike a guitar or flute, its “body” reshapes in milliseconds — sculpting pitch, loudness, harmonic sheen, and vowels and consonants all at once.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>1. The Power Source (Breath &amp; Support)</strong>
          On inhale, the <em>diaphragm</em> drops smoothly to open lung capacity. While singing, abdominal and intercostal muscles regulate steady <em>subglottal air pressure</em> (“breath support”) rather than squeezing the throat.
        </div>
        <div class="physics-fact-item">
          <strong>2. The Vibrator (Larynx &amp; Vocal Folds)</strong>
          Inside the voice box stretch two elastic <em>vocal folds</em>. Passing air pulls them gently shut and pulses them open (100–1,000 times per second via the <em>Bernoulli effect</em>), generating a raw buzz rich in harmonics.
        </div>
        <div class="physics-fact-item">
          <strong>3. The Resonator (Vocal Tract &amp; Formants)</strong>
          Your throat, mouth, and nasal cavity filter that buzz. Shifting tongue, jaw, lips, and soft palate moves acoustic resonance peaks called <em>formants</em> — turning a warm “Ooh” into a bright “Eee.”
        </div>
        <div class="physics-fact-item">
          <strong>4. The Singer’s Formant (~3,000 Hz)</strong>
          By widening the lower pharynx, trained classical singers focus extra acoustic energy around 2.8–3.2 kHz — right where an orchestra’s spectrum dips — letting one unamplified opera voice carry cleanly over 80 instruments!
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C4,E4,G4,C5" data-dur="1.9" data-step="0">▶ Hear Choir Vowel Chord</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Registers &amp; Techniques</span>
        <span class="k-ratio-chip">Vocal Colors</span>
      </div>
      <h4>Vocal Registers &amp; Singing Techniques</h4>
      <p>Depending on which laryngeal muscles engage and whether the full vocal fold body vibrates or only its thin outer edges, your voice transforms completely:</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Chest Voice (Modal Register, M1)</strong>
          The full muscle mass of the vocal folds vibrates together. Produces warm, grounded, overtone-rich tone — our natural speaking register and low/midrange power base.
        </div>
        <div class="physics-fact-item">
          <strong>Head Voice &amp; Falsetto (M2)</strong>
          The vocal folds lengthen and thin out so mainly their delicate outer margins vibrate. Yields a lighter, flute-like, floating tone (seamless lyrical head voice or distinct airy <em>falsetto</em>).
        </div>
        <div class="physics-fact-item">
          <strong>Mixed Voice (Mix / Voix mixte)</strong>
          Bridges smoothly across the vocal <em>passaggio</em> (register break). Balanced muscle engagement keeps timbre connected from low to high without a sudden flip.
        </div>
        <div class="physics-fact-item">
          <strong>Belting (Pop, Musical Theater, Gospel)</strong>
          Carries chest-dominant richness upward into high territory using vigorous breath support and bright vowel shaping — bold, direct presence up around G5/C6.
        </div>
        <div class="physics-fact-item">
          <strong>Vibrato</strong>
          A relaxed, natural periodic shimmer in pitch and amplitude around 5–7 Hz. Adds warmth to sustained notes and helps a solo voice stand out clearly in an ensemble.
        </div>
        <div class="physics-fact-item">
          <strong>Scat &amp; Overtone Singing</strong>
          Jazz <em>scat</em> mimics horn solos using rhythmic syllables (“shoo-be-doo”). In <em>overtone (throat) singing</em>, precise tongue shaping amplifies a narrow harmonic over a drone until two pitches sound at once!
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">Choral Writing (SATB)</span>
        <span class="k-ratio-chip">Voice Parts &amp; Ranges</span>
      </div>
      <h4>Inside a Choir: SATB Sections &amp; Vocal Ranges</h4>
      <p>Mixed choirs worldwide follow the <strong>SATB</strong> layout — named top to bottom after the four main sections. Large symphonic choirs often divide each part further into Divisi I (higher) and II (lower), forming eight parts: <em>SSAATTBB</em>.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Soprano (S) • Typical Range C4–C6</strong>
          The highest female or treble voice. Usually carries the lead melody, top harmonies, and crystalline radiance across chords.
        </div>
        <div class="physics-fact-item">
          <strong>Alto (A) • Typical Range F3–E5</strong>
          The lower treble voice (or countertenor part). Supplies inner chord warmth (3rds, 7ths, rich suspensions) hugging closely beneath the melody.
        </div>
        <div class="physics-fact-item">
          <strong>Tenor (T) • Typical Range C3–A4</strong>
          The high male voice (often notated on treble clef sounding one octave lower!). Links upper and lower halves with lyrical counterlines or ringing high notes.
        </div>
        <div class="physics-fact-item">
          <strong>Bass (B) • Typical Range E2–E4</strong>
          The deepest male section and acoustic anchor of the choir. Bass pitches set the harmonic root — when basses lock their tuning, the rest of the chord snaps right into place.
        </div>
        <div class="physics-fact-item">
          <strong>Mezzo-Soprano, Baritone &amp; Countertenor</strong>
          Three vital intermediate voices: <em>Mezzo</em> (A3–A5, rich bridge between Soprano and Alto), <em>Baritone</em> (G2–G4, the most common male tessitura), and <em>Countertenor</em> (male alto range via cultivated falsetto/head resonance).
        </div>
        <div class="physics-fact-item">
          <strong>Other Ensemble Formats</strong>
          <em>Treble choirs (SSAA)</em> and <em>men’s choruses (TTBB / Barbershop)</em> pack voices into close harmonies rich in ring. Modern <em>a cappella</em> groups add vocal percussion (beatboxing) in place of a drum kit.
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G4,B4,D5,G5" data-dur="0.95" data-step="320">▶ Soprano Range</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G3,Bb3,D4,F4" data-dur="0.95" data-step="320">▶ Alto Range</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,E3,G3,B3" data-dur="0.95" data-step="320">▶ Tenor Range</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="E2,G2,B2,E3" data-dur="1.05" data-step="340">▶ Bass Foundation</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Intonation &amp; Listening</span>
        <span class="k-ratio-chip">Just Intonation</span>
      </div>
      <h4>Why an A Cappella Choir Can Sound Purer Than a Piano</h4>
      <p>Pianos are tuned in <strong>12-tone equal temperament</strong>: their Major 3rds sit about 14 cents sharp (nearly one-seventh of a half step) so all twelve keys remain usable. Singers aren’t locked to fixed frets or hammers.</p>
      <p>Singing unaccompanied, good choral voices instinctively adjust into pure <strong>just-intonation frequency ratios</strong> (2:1 octave, 3:2 fifth, 5:4 major third). The moment a Major 3rd locks in with zero beating, shared overtones reinforce — and the whole chord suddenly blossoms louder and brighter (“barbershop ring”).</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="1.4" data-step="460">▶ Build Voice by Voice (Bass → Sop)</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="2.4" data-step="0">▶ Full SATB Choir Chord</button>
        <button class="btn-tool" data-open-warmup="true">▶ Open 5-Min Vocal Warmup</button>
      </div>
    </article>
  `;
}

const INSTRUMENT_MODULES_DATA_EN = {
  strings: {
    title: "Bowed Strings",
    subtitle: "Physics of the bow, the orchestral string family & articulations",
    intro: {
      tag: "Physics & Craft",
      tagClass: "tag-peach",
      chip: "Helmholtz Slip-Stick Motion",
      heading: "How a Bow Makes Strings Sing",
      body: "Horsehair rubbed with sticky <em>rosin</em> catches and releases the string hundreds of times per second in a crisp stick-slip cycle. A carved maple <em>bridge</em> channels those vibrations into the hollow spruce top, shaped inside by the soundpost and bass bar. With no frets, string players adjust every pitch freely into pure intonation."
    },
    items: [
      {
        name: "Violin",
        tag: "Soprano of the Strings",
        tagClass: "tag-peach",
        range: "G3 – A7",
        tuning: "Tuned in 5ths: G3 – D4 – A4 – E5",
        role: "Lead melody, sparkle & agile virtuosity",
        desc: "The highest, fastest member of the family. Orchestras divide violins into Violin I (often soaring on high melodies) and Violin II (inner voices and harmony). Short, light strings respond cleanly to lightning-fast passages.",
        demos: [
          { label: "Violin Bowed (Arco)", style: "strings", notes: "G4,D5,A5,E6", dur: 1.0, step: 340 },
          { label: "Violin Plucked (Pizzicato)", style: "pizzicato", notes: "G4,B4,D5,G5", dur: 0.75, step: 220 }
        ]
      },
      {
        name: "Viola",
        tag: "Alto of the Strings",
        tagClass: "tag-sage",
        range: "C3 – E6",
        tuning: "Tuned in 5ths: C3 – G3 – D4 – A4",
        role: "Inner harmonic warmth & smoky counterlines",
        desc: "Pitched a 5th lower than the violin and traditionally written in <em>alto clef</em>. Its body is slightly smaller than ideal physics would call for its low range — giving the viola its signature dusky, velvety, expressive tone.",
        demos: [
          { label: "Hear Viola Register", style: "strings", notes: "C3,G3,D4,A4", dur: 1.05, step: 360 }
        ]
      },
      {
        name: "Violoncello (Cello)",
        tag: "Tenor & Baritone",
        tagClass: "tag-lilac",
        range: "C2 – A5",
        tuning: "Tuned in 5ths: C2 – G2 – D3 – A3",
        role: "Rich foundation & lyrical solo melodies",
        desc: "One full octave below the viola and remarkably close to the human vocal range. Its low strings supply deep warmth while its top A string sings aching, baritone-to-tenor solos.",
        demos: [
          { label: "Hear Cello Range (C2–A3)", style: "strings", notes: "C2,G2,D3,A3", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Double Bass (Upright Bass)",
        tag: "Sub Foundation",
        tagClass: "tag-peach",
        range: "E1 (or C1 w/ extension) – G4",
        tuning: "Tuned in 4ths: E1 – A1 – D2 – G2",
        role: "Orchestral bass & jazz walking bass",
        desc: "Tuned <em>in 4ths</em> rather than 5ths to keep finger stretches playable, sounding <strong>one octave lower</strong> than written. Bowed slowly it gives orchestras vast depth; plucked pizzicato it drives jazz and acoustic swing.",
        demos: [
          { label: "Double Bass Arco (Orchestral)", style: "strings", notes: "E1,A1,D2,G2", dur: 1.25, step: 420 },
          { label: "Jazz Walking Bass (Pizzicato)", style: "pizzicato", notes: "C2,E2,G2,A2,Bb2,A2,G2,E2", dur: 0.7, step: 280 }
        ]
      }
    ],
    extraBox: {
      heading: "Key String Articulations to Recognize by Ear",
      facts: [
        { title: "Arco vs. Pizzicato", text: "<em>Arco</em> means bowed smoothly for sustained lines; <em>pizzicato</em> means plucked with a finger for short, warm percussive notes." },
        { title: "Spiccato & Martelé", text: "<em>Spiccato</em> bounces the bow lightly off the string for sparkling agility; <em>martelé</em> attacks sharply with crisp bite." },
        { title: "Tremolo & Sul Ponticello", text: "Rapid back-and-forth bow strokes create shivering suspense (classic film tension). Bowing right by the bridge (<em>sul ponticello</em>) turns glassy and ghostly." },
        { title: "Harmonics & Con Sordino", text: "Touching the string lightly at node points isolates eerie, bell-like overtones. Clipping a mute (<em>con sordino</em>) onto the bridge veils the tone into silk." }
      ]
    }
  },

  woodwinds: {
    title: "Woodwinds",
    subtitle: "Air reeds, single & double reeds, and why the brassy sax belongs here",
    intro: {
      tag: "Air-Column Acoustics",
      tagClass: "tag-sage",
      chip: "3 Excitation Principles",
      heading: "Why a Metal Saxophone Counts as a Woodwind",
      body: "Membership isn’t decided by material (modern flutes are silver or gold, saxophones brass), but by <strong>sound production and tone holes</strong>: either a jet of air splits against a sharp edge (flutes), or one or two springy cane reeds buzz inside the mouthpiece to excite the air column."
    },
    items: [
      {
        name: "Flute & Piccolo",
        tag: "Edge-Blown Air Jet (Reedless)",
        tagClass: "tag-peach",
        range: "C4 – D7 (Piccolo D5 – C8)",
        tuning: "Concert Pitch in C (Piccolo +1 octave)",
        role: "Silvery top lines, trills & birdsong color",
        desc: "Your breath splits against the embouchure hole edge, oscillating rapidly in and out. Low notes sound breathy and sine-pure, while the third octave cuts cleanly with silvery brilliance. Tiny piccolos regularly top the entire orchestra.",
        demos: [
          { label: "Flute (Lyrical Phrase)", style: "flute", notes: "G4,A4,B4,D5,E5,G5", dur: 0.9, step: 260 }
        ]
      },
      {
        name: "Oboe & English Horn",
        tag: "Double Reed (Narrow Conical)",
        tagClass: "tag-lilac",
        range: "Bb3 – A6 (English Horn in F)",
        tuning: "Oboe in C • Gives Tuning A4",
        role: "Orchestral pitch anchor & poignant solos",
        desc: "Two wafer-thin bound cane blades vibrate against each other inside a slim conical bore, producing an intense, overtone-rich, plaintive singing tone. Because its pitch barely drifts with breath changes, the whole symphony tunes to the <strong>oboe’s A4</strong>. Its larger alto cousin, the English horn, has a pear-shaped bell built for melancholic solos.",
        demos: [
          { label: "Oboe Timbre (Double Reed)", style: "reed", notes: "A4,C5,E5,D5,C5,A4", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "Clarinet & Bass Clarinet",
        tag: "Single Reed (Cylindrical)",
        tagClass: "tag-sage",
        range: "D3 – Bb6 (Bass Clarinet down to Bb1)",
        tuning: "Usually in Bb or A (transposing)",
        role: "Velvety low warmth to fiery jazz & klezmer",
        desc: "One cane reed beats against a rigid mouthpiece on a cylindrical bore. Acoustic quirk: it behaves like a closed-end pipe! So its dark <em>chalumeau</em> register favors odd harmonics only — and when overblowing, it leaps a <strong>12th (octave + 5th)</strong> instead of a standard octave.",
        demos: [
          { label: "Clarinet Register (Low → High)", style: "reed", notes: "D3,F3,A3,C4,E4,A4", dur: 0.9, step: 280 }
        ]
      },
      {
        name: "Bassoon & Contrabassoon",
        tag: "Double Reed (Bass)",
        tagClass: "tag-peach",
        range: "Bb1 – E5 (Contra down to Bb0)",
        tuning: "Concert Pitch in C (folded U-tube)",
        role: "Dry staccato bass & singing baritone tenor",
        desc: "Over 8 feet (2.6 m) of conical wooden tubing folded into a U-bend. Tongued short in the basement it sounds crisp and witty; played legato in mid-register it sings warmly like a human baritone.",
        demos: [
          { label: "Bassoon Low Register", style: "reed", notes: "Bb1,F2,Bb2,D3,F3", dur: 1.0, step: 330 }
        ]
      },
      {
        name: "Saxophone Family (Soprano, Alto, Tenor, Baritone)",
        tag: "Modern Woodwind Bridge",
        tagClass: "tag-lilac",
        range: "Db2 to F6 sounding (across sizes)",
        tuning: "Alternating Eb (Alto/Bari) & Bb (Sop/Tenor)",
        role: "Jazz, big band, funk, soul & pop leads",
        desc: "Invented around 1840 by Adolphe Sax as an acoustic hybrid: pairing the clarinet’s easy single reed with an oboe-like wide conical flare cast in brass. It overblows normally at the octave, cuts like brass with woodwind agility, and bends fluidly from whisper subtone to gritty growl.",
        demos: [
          { label: "Tenor/Alto Sax Character", style: "reed", notes: "C4,Eb4,F4,F#4,G4,Bb4", dur: 0.9, step: 250 }
        ]
      }
    ],
    extraBox: {
      heading: "Quick Guide to Transposing Winds",
      facts: [
        { title: "Why Are Winds Written in Bb, Eb, or F?", text: "So a saxophonist switching between Alto and Baritone — or clarinetist switching horns — keeps identical fingerings! Play a written <em>C</em> on a Bb trumpet or tenor sax, and concert pitch <em>Bb</em> sounds (one whole step lower)." },
        { title: "Orchestral Color Blending", text: "Unlike the unified string family, every woodwind has a bold harmonic fingerprint — orchestrators love blending them: Flute + Oboe merges shimmer with core; Clarinet + Horn creates molten velvet." }
      ]
    }
  },

  brass: {
    title: "Brass",
    subtitle: "Harmonic series, valves, slides & classic brass mutes",
    intro: {
      tag: "Lip Vibration",
      tagClass: "tag-lilac",
      chip: "Overtones + Tubing",
      heading: "Not the Metal Vibrates — Your Lips Do!",
      body: "On trumpet, horn, trombone, or tuba, the player’s buzzed lips act as a living membrane pressed into a cup or funnel mouthpiece. With zero valves pressed, a brass horn plays only the natural <strong>harmonic overtone series</strong> of its tube length (like a bugle). <strong>Valves</strong> or a telescoping <strong>slide</strong> add calibrated loops of tubing on the fly to unlock all 12 chromatic pitches."
    },
    items: [
      {
        name: "Trumpet & Flugelhorn",
        tag: "High Brass (Cylindrical vs. Conical)",
        tagClass: "tag-peach",
        range: "E3 – C6 (sounding)",
        tuning: "Most commonly in Bb or C",
        role: "Fanfare shine, big-band lead & radiant melodies",
        desc: "About two-thirds of a trumpet’s tubing stays tightly cylindrical before flaring out — making loud notes bright, biting, and electric. The twin-sister <em>flugelhorn</em> tapers wider from end to end, wrapping the exact same notes in dark, warm jazz ballad velvet.",
        demos: [
          { label: "Trumpet Fanfare (Harmonic Triad)", style: "brass", notes: "C4,G4,C5,E5", dur: 0.95, step: 290 }
        ]
      },
      {
        name: "French Horn (F / Bb Double Horn)",
        tag: "Narrow Conical + Hand in Bell",
        tagClass: "tag-sage",
        range: "B1 – F5 (sounding)",
        tuning: "F / Bb Double Horn",
        role: "Epic film themes & seamless orchestral glue",
        desc: "Evolved from coiled ~12-foot hunting horns. Playing high up inside its harmonic series gives the French horn a noble, glowing roundness that glues woodwinds and heavy brass together. Placing the right hand inside the bell shades the tone dark or unleashes brassy <em>stopped/cuivré</em> snarl.",
        demos: [
          { label: "Horn Call (5ths & Warmth)", style: "brass", notes: "F3,C4,F4,A4", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Trombone (Tenor & Bass)",
        tag: "Stepless Slide (7 Positions)",
        tagClass: "tag-lilac",
        range: "E2 – F5 (to B1 with F-trigger)",
        tuning: "Non-transposing concert pitch (Bb fundamental)",
        role: "Rich chord pads, smooth glissando & jazz punch",
        desc: "Instead of valves, a smooth U-slide lengthens the cylindrical tube across 7 half-step positions. Players can micro-adjust intonation purely by ear and execute unmistakable stepless <strong>glissandi</strong>.",
        demos: [
          { label: "Trombone Voicing (Low-Mid Brass)", style: "brass", notes: "Bb2,F3,Bb3,D4", dur: 1.05, step: 320 }
        ]
      },
      {
        name: "Tuba & Euphonium",
        tag: "Wide Conical Bass",
        tagClass: "tag-peach",
        range: "D1 – F4 (Contrabass Tuba down to Bb0)",
        tuning: "Built in F, Eb, C, or Bb",
        role: "Majestic sub weight & buttery low harmonies",
        desc: "Nearly 18 feet of gently flaring wide conical brass yields an astonishingly warm, round, plush foundation without harsh metallic rasp. In concert bands, tuba and singing <em>euphonium</em> form the velvety bottom end.",
        demos: [
          { label: "Tuba Foundation (Octave + 5th)", style: "brass", notes: "F1,C2,F2", dur: 1.25, step: 420 }
        ]
      }
    ],
    extraBox: {
      heading: "Transforming Brass With Classic Mutes",
      facts: [
        { title: "Straight Mute", text: "Cone-shaped aluminum or fiber mute: trims lows and turns trumpet/trombone bright, metallic, and razor-edged (jazz & film scores)." },
        { title: "Harmon (Wah-Wah) Mute", text: "Made iconic by Miles Davis: seals the bell tightly with only a small center stem open — intimate, buzzy, and waving a hand over the stem creates the classic “wah-wah” vocal cry." },
        { title: "Cup Mute & Plunger", text: "A cup mute rounds off glare into smoky softness; big-band players literally make horns “talk” by opening and closing a rubber <em>plunger</em> over the bell." }
      ]
    }
  },

  keyboards: {
    title: "Keyboard Instruments",
    subtitle: "Hammers, plucked quills, organ pipes & electromechanical legends",
    intro: {
      tag: "Polyphonic Powerhouses",
      tagClass: "tag-peach",
      chip: "Shared Key Interface",
      heading: "One Layout — Four Completely Different Sound Engines",
      body: "Piano, harpsichord, pipe organ, and Fender Rhodes all share the same intuitive 12-key octave layout (7 white, 5 black), letting two hands cover bass, rich harmony, and melody at once. Yet what happens behind the key couldn’t be more distinct physically."
    },
    items: [
      {
        name: "Acoustic Upright & Concert Grand Piano",
        tag: "Struck Strings (Hammer Action)",
        tagClass: "tag-peach",
        range: "A0 – C8 (88 Keys • 27.5 – 4,186 Hz)",
        tuning: "12-TET with stretch tuning (~230 strings)",
        role: "Universal workhorse of classical, jazz, pop & songwriting",
        desc: "Felt-tipped hammers <strong>strike</strong> high-tension steel strings (up to 3 unison strings per note!) and rebound instantly so strings ring freely. Pressing the right <em>sustain pedal</em> lifts every damper simultaneously, letting unplayed strings shimmer in sympathetic resonance.",
        demos: [
          { label: "Grand Piano (Pedal Arpeggio)", style: "piano", notes: "C3,G3,E4,G4,B4,D5", dur: 1.2, step: 220 }
        ]
      },
      {
        name: "Harpsichord",
        tag: "Plucked Strings (Plectra / Quills)",
        tagClass: "tag-sage",
        range: "F1 – F6",
        tuning: "Often historical temperaments (Werckmeister / Vallotti)",
        role: "Baroque basso continuo & crisp silvery attack",
        desc: "Rather than hammers, a tiny plectrum (traditionally crow quill, now Delrin) <strong>plucks</strong> the string at key press. Finger force barely changes loudness — contrast comes from pulling register stops (4', 8', couplers) and thinning or thickening chords. Rich in bright upper harmonics.",
        demos: [
          { label: "Harpsichord Pluck", style: "cembalo", notes: "D4,F4,A4,D5,C#5,D5", dur: 0.9, step: 210 }
        ]
      },
      {
        name: "Pipe Organ & Harmonium",
        tag: "Aerophone (Windchest & Stops)",
        tagClass: "tag-lilac",
        range: "Sub-bass 16'/32' (< 16 Hz!) up to 1' mixtures",
        tuning: "Flue & Reed Pipes by Footage",
        role: "Monumental polyphony with endless sustain",
        desc: "Pressing keys and pedals opens valves feeding pressurized air into hundreds or thousands of metal and wood pipes. <em>Flue pipes</em> whistle like giant recorders; <em>reed pipes</em> snarl like brass horns. A note holds at steady full volume until the instant your finger lifts!",
        demos: [
          { label: "Pipe Organ (Full Registration)", style: "organ", notes: "C3,G3,C4,E4,G4", dur: 2.0, step: 0 }
        ]
      },
      {
        name: "Stage Icons: Fender Rhodes, Hammond B3 & Stage Piano",
        tag: "Electromechanical Legends",
        tagClass: "tag-sage",
        range: "73–88 Keys / Drawbar Control",
        tuning: "Pickups, Tonewheels & Modeling",
        role: "Jazz, funk, soul, gospel, rock & modern pop",
        desc: "The <strong>Fender Rhodes</strong> strikes resonant metal tines with hammers right over magnetic guitar-style pickups — bell-like, warm, and neo-soul magic. The <strong>Clavinet</strong> taps strings mechanically for razor-sharp funk bite. The <strong>Hammond B3</strong> sums 9 <em>drawbars</em> of spinning electromagnetic tonewheels through a swirling <em>Leslie speaker</em>.",
        demos: [
          { label: "Drawbar Organ Voicing", style: "organ", notes: "G3,B3,D4,F4", dur: 1.5, step: 0 },
          { label: "Warm Electric Piano Voicing", style: "piano", notes: "F3,A3,C4,E4,G4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },

  plucked: {
    title: "Plucked Strings & Guitars",
    subtitle: "Nylon, steel, magnetic pickups, electric bass & concert harp",
    intro: {
      tag: "Plucked Impulse",
      tagClass: "tag-sage",
      chip: "Crisp Attack & Natural Decay",
      heading: "Where You Pluck Reshapes the Tone",
      body: "Plucking a string with flesh, nail, or pick creates a punchy transient (attack), followed by high overtones fading faster than the root. Pluck tight by the <strong>bridge</strong> (<em>sul ponticello</em>) for bright metallic twang; pluck softly over the <strong>fingerboard</strong> (<em>sul tasto</em>) for round, harp-like warmth."
    },
    items: [
      {
        name: "Classical Guitar (Nylon) & Steel-String Acoustic",
        tag: "Acoustic Resonant Bodies",
        tagClass: "tag-peach",
        range: "E2 – B5 (sounding • written +1 octave)",
        tuning: "Standard: E2 – A2 – D3 – G3 – B3 – E4",
        role: "Strumming, fingerpicking, flamenco & songwriting",
        desc: "Nylon-strung <em>classical guitars</em> charm with mellow warmth, clear polyphonic separation, and soft touch. <em>Steel-string acoustics</em> carry higher tension, slicing cleanly through dense mixes with sparkling, shimmering chord strums.",
        demos: [
          { label: "Acoustic Guitar Arpeggio", style: "guitar", notes: "E2,B2,E3,G#3,B3,E4", dur: 1.3, step: 170 }
        ]
      },
      {
        name: "Electric Guitar & Signal Chain",
        tag: "Magnetic Pickups + Amp",
        tagClass: "tag-lilac",
        range: "E2 – E6 (plus bends & harmonics)",
        tuning: "E – A – D – G – B – E (plus drop tunings)",
        role: "Funk riffs, chimey cleans, crunch & singing leads",
        desc: "A solid-body electric guitar makes almost no acoustic room sound on its own: wire coils (<em>pickups</em>) translate vibrating steel strings into electric current. <strong>Single coils</strong> (Strat/Tele) sound snappy and glassy; twin-coil <strong>humbuckers</strong> (Les Paul) kill hum and pump thick creamy mids — brought to life by tube amps, overdrive saturation, delay, and reverb.",
        demos: [
          { label: "Clean Electric Chord Voicing", style: "guitar", notes: "A2,D3,G3,C4,E4", dur: 1.4, step: 140 }
        ]
      },
      {
        name: "Electric Bass (4-, 5-String & Fretless)",
        tag: "Bridge Between Kick & Harmony",
        tagClass: "tag-sage",
        range: "E1 (or B0 on 5-string) – G4",
        tuning: "E1 – A1 – D2 – G2",
        role: "Groove anchor with drums, harmonic bottom across styles",
        desc: "Pitched an octave beneath guitar and tuned like an upright bass — yet fitted with frets for dead-on intonation. Finger-plucked it glows round and fat; picked it bites cleanly through rock mixes; <strong>slap &amp; pop</strong> (thumb thump + plucked snap) ignites funk; and <em>fretless bass</em> glides with liquid vocal vibrato.",
        demos: [
          { label: "Electric Bass Groove (Octave & 5th)", style: "ebass", notes: "E1,E1,G1,A1,B1,E2", dur: 0.75, step: 260 }
        ]
      },
      {
        name: "Concert Harp, Mandolin, Banjo & Ukulele",
        tag: "Distinctive Plucked Voices",
        tagClass: "tag-peach",
        range: "Harp: Cb1 – Gb7 (47 Strings)",
        tuning: "Harp: Diatonic w/ 7 double-action pedals",
        role: "Luminous glissandos, folk textures & acoustic sparkle",
        desc: "Each of a concert harp’s 47 strings corresponds to one scale note (red for C, blue/black for F); seven foot pedals shift all octaves flat, natural, or sharp in an instant. Elsewhere, double-strung <em>mandolin</em>, drum-head <em>banjo</em>, and breezy <em>ukulele</em> color roots, bluegrass, and indie pop.",
        demos: [
          { label: "Harp-Like Cascading Arpeggio", style: "guitar", notes: "C3,D3,E3,G3,A3,C4,D4,E4,G4", dur: 0.9, step: 110 }
        ]
      }
    ]
  },

  electronic: {
    title: "Electronic & Studio Instruments",
    subtitle: "Synthesizer building blocks, samplers, drum machines & DAW mixing",
    intro: {
      tag: "Sound Design & Production",
      tagClass: "tag-sage",
      chip: "Electrophonic & Digital",
      heading: "From Physical Resonance to Sculpting Waveforms Directly",
      body: "Acoustic instruments inherit their timbre from wood, brass, or skin. Electronic instruments start from raw electric voltages or digital waveforms — letting you sculpt exactly how many overtones exist, how fast a note hits, and how it evolves over time."
    },
    items: [
      {
        name: "Subtractive Synthesizers (Analog & Virtual Analog)",
        tag: "Oscillator + Filter + Envelope",
        tagClass: "tag-sage",
        range: "Full audible range (20 Hz sub-bass to ultra highs)",
        tuning: "Volt/Octave or MIDI (including microtonal)",
        role: "Massive basses, saw leads, lush lush analog pads",
        desc: "The classic Minimoog architecture: <strong>1. Oscillator (VCO)</strong> generates harmonically rich raw waveforms like <em>Sawtooth</em> (all harmonics — fat & string-like), <em>Square/Pulse</em> (odd harmonics — hollow/woody), or <em>Triangle/Sine</em> (pure/sub). <strong>2. Filter (VCF)</strong> sculpts brightness via <em>Cutoff</em> and <em>Resonance</em> sweeps! <strong>3. Envelope (ADSR)</strong> shapes Attack, Decay, Sustain, and Release.",
        demos: [
          { label: "Sawtooth Synth (Harmonic Lead)", style: "synth-saw", notes: "C3,E3,G3,B3,C4", dur: 0.85, step: 230 },
          { label: "Warm Analog Pad", style: "synth-pad", notes: "C3,G3,B3,D4,E4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "FM, Wavetable & Granular Synthesis",
        tag: "Digital Sound Worlds",
        tagClass: "tag-lilac",
        range: "Clean tones to evolving cinematic textures",
        tuning: "Sample-accurate / microtunable",
        role: "’80s glass bells & electric pianos, modern bass & soundscapes",
        desc: "<strong>FM Synthesis</strong> (legendary in the Yamaha DX7) modulates one waveform’s speed at audio rate with another — creating icy metallic bells, crisp ’80s electric pianos, and rubbery slap basses with no filter. <strong>Wavetable synths</strong> glide smoothly across morphed wave frames, while <strong>Granular synths</strong> slice recordings into tiny 10–50 ms grains and re-weave shimmering clouds.",
        demos: [
          { label: "Lush Floating Pad Voicing", style: "synth-pad", notes: "A2,E3,G3,B3,D4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "Samplers, Mellotron & Drum Machines (808 / 909 / MPC)",
        tag: "Sampling & Step Sequencing",
        tagClass: "tag-peach",
        range: "Full pitched range via resampling",
        tuning: "Playable chromatically via keys & pads",
        role: "Hip-hop, house, techno, pop beats & orchestral mockups",
        desc: "A <strong>sampler</strong> captures any real-world sound — choirs, vinyl breaks, footsteps — and maps it across a keyboard (prefigured by the tape-based <em>Mellotron</em>!). Classic drum machines like the Roland <em>TR-808</em> gave us iconic synthetic snares, claps, and cowbells — and sustaining its decaying sine kick turns right into modern hip-hop and trap sub-bass melodies!",
        demos: [
          { label: "Hear 808 Sub-Bass Line", style: "ebass", notes: "C1,C1,Eb1,G1,C2,G1", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "DAW, Virtual Instruments & Mixing Effects",
        tag: "The Modern Studio Workbench",
        tagClass: "tag-sage",
        range: "Computer-based music environment",
        tuning: "Real-time pitch & automation",
        role: "Composing, arranging, mixing & mastering",
        desc: "A modern <em>Digital Audio Workstation (DAW)</em> packs tape decks, racks of outboard gear, and full virtual orchestras into one screen. Over <strong>MIDI</strong> you drive software synths or multi-gigabyte sample libraries, then sculpt clarity in the mix with <strong>Equalizers (EQ)</strong>, tame punch with <strong>Compressors</strong>, and build concert halls using <strong>Reverb &amp; Delay</strong>.",
        demos: [
          { label: "Synth + Sub Layer", style: "synth-saw", notes: "F2,C3,A3,E4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },

  ensembles: {
    title: "Orchestras, Bands & Ensembles",
    subtitle: "Why dozens of instruments together stay clear instead of turning to mud",
    intro: {
      tag: "Arrangement & Frequency Space",
      tagClass: "tag-peach",
      chip: "Sonic Division of Labor",
      heading: "The Secret of Great Instrumentation: Frequency + Role",
      body: "When 80 symphony players or 5 rock bandmates perform simultaneously, each instrument must claim its own <strong>frequency lane</strong> (lows, mids, highs) and clear <strong>rhythmic or harmonic job</strong>. Every classic ensemble evolved to solve that exact puzzle."
    },
    items: [
      {
        name: "The Symphony Orchestra (~70–100 Musicians)",
        tag: "4 Classic Families",
        tagClass: "tag-peach",
        range: "Contrabass sub-lows to piccolo shine (16 Hz – >4 kHz)",
        tuning: "Concert A4 = 440–443 Hz",
        role: "Vast dynamic sweep & orchestral color palette",
        desc: "Why sit over 50 string players across from just 2–4 winds or brass? Because a single trumpet cuts straight through ten violins! Large string sections weave the warm sustaining <em>fabric</em>, individually voiced woodwinds sketch agile melodies, brass raises towering climaxes, and timpani &amp; percussion drive drama.",
        demos: [
          { label: "Lush String Bed Chord", style: "strings", notes: "C2,G2,E3,C4,G4", dur: 2.0, step: 0 },
          { label: "Brass Fanfare Layer", style: "brass", notes: "C4,G4,C5,E5", dur: 1.1, step: 240 }
        ]
      },
      {
        name: "Chamber Music (String Quartet & Woodwind Quintet)",
        tag: "Soloistic Transparency",
        tagClass: "tag-sage",
        range: "4–5 equal conversational voices",
        tuning: "Pure adaptive ensemble intonation",
        role: "Intimate interplay just like four-part SATB singing",
        desc: "A classic <strong>string quartet</strong> (2 violins, viola, cello) mirrors a four-part choir cleanly: unified timbre, razor clarity, and agile counterpoint. The <strong>woodwind quintet</strong> (flute, oboe, clarinet, bassoon + French horn!) embraces the exact opposite — five contrasting voices blended smoothly together by the warm horn.",
        demos: [
          { label: "String Quartet Arpeggio (Cello → Violin)", style: "strings", notes: "C2,G3,D4,E4", dur: 1.5, step: 260 }
        ]
      },
      {
        name: "Big Band & Jazz Combo",
        tag: "Rhythm Section vs. Horn Section",
        tagClass: "tag-lilac",
        range: "Tight jazz section writing (block voicings)",
        tuning: "Swing phrasing & call-and-response",
        role: "Driving walking bass & drums beneath stacked horns",
        desc: "Big bands split cleanly in two: the <strong>rhythm section</strong> (drums, upright/electric bass, piano, guitar) supplies nonstop groove, swing, and changes, while the <strong>horn section</strong> (5 saxophones, 4 trombones, 4 trumpets) tosses punchy jazz voicings (like <em>Drop-2 chords</em>) back and forth in thrilling call-and-response.",
        demos: [
          { label: "Horn Section Jazz Voicing", style: "brass", notes: "Bb2,Ab3,C4,D4,G4", dur: 1.7, step: 0 }
        ]
      },
      {
        name: "Modern Pop, Rock & Funk Band",
        tag: "Focused Sonic Lanes",
        tagClass: "tag-peach",
        range: "Sub-bass floor to vocal presence air",
        tuning: "Locked pocket between kick & bass",
        role: "Tight groove, memorable hooks & clear vocal spotlight",
        desc: "<strong>Kick + bass guitar (or 808)</strong> lock into the sub/low pocket (40–250 Hz). <strong>Snare &amp; hi-hat</strong> snap the rhythmic frame. <strong>Guitars, keys, or synths</strong> fill warm mids (300 Hz – 3 kHz) while ducking politely back in verses to leave open breathing room for the <strong>lead vocal</strong> (1–4 kHz).",
        demos: [
          { label: "Band Voicing (Bass + Keys)", style: "piano", notes: "A2,E3,G3,B3,C#4", dur: 1.6, step: 110 }
        ]
      }
    ]
  }
};

function renderInstrumentModuleHTML_EN(refKey) {
  const mod = INSTRUMENT_MODULES_DATA_EN[refKey];
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
        <span class="inst-meta-pill">Range: ${item.range}</span>
        <span class="inst-meta-pill">${item.tuning}</span>
      </div>
      <p><strong>Role:</strong> ${item.role}</p>
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
        <span class="k-card-tag tag-lilac">Technique &amp; Listening Tips</span>
        <span class="k-ratio-chip">Deep Dive</span>
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

const MODES_ENCYCLOPEDIA_EN = [
  {
    id: "lydian",
    name: "Lydian",
    family: "major",
    familyLabel: "Major Family",
    brightness: "1 / 7 • Radiant & Floating",
    badgeClass: "badge-peach",
    rootLabel: "C",
    stammton: "4th mode of the Major scale (like C Major starting on F)",
    formula: "1 · 2 · 3 · #4 · 5 · 6 · 7",
    steps: "W – W – W – H – W – W – H",
    charNote: "Augmented 4th (#4, e.g. F# over C)",
    vamp: "I – II (C – D)",
    desc: "Brightest of all seven diatonic modes. Lifting the 4th to #4 removes the classic half-step clash against the major 3rd — giving Lydian its weightless, dreamy, cinematic hover.",
    usage: "<strong>Musical Use:</strong> Huge favorite for wonder, sci-fi &amp; film scores (John Williams <em>E.T.</em>, <em>The Simpsons</em> theme, Danny Elfman), expressive shred guitar (Joe Satriani, Steve Vai), and hovering Maj7(#11) chords in jazz.",
    notes: "C4,D4,E4,F#4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4", "B4"], ["D3", "F#4", "A4", "C5"]]
  },
  {
    id: "ionian",
    name: "Ionian (Major)",
    family: "major",
    familyLabel: "Major Family",
    brightness: "2 / 7 • Balanced & Clear",
    badgeClass: "badge-sage",
    rootLabel: "C",
    stammton: "1st mode — our everyday Major scale (C Major)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · 7",
    steps: "W – W – H – W – W – W – H",
    charNote: "Natural 4th (4) + sharp Leading Tone (7 → 1)",
    vamp: "I – IV – V – I",
    desc: "Classic Major. The tritone between degrees 4 and 7 squeezes cleanly into root and 3rd — establishing unmistakable stability, clarity, and resolution.",
    usage: "<strong>Musical Use:</strong> The pillar of Western functional harmony, classical symphonies, uplifting pop choruses, and folk melodies whenever clarity and joy come first.",
    notes: "C4,D4,E4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4"], ["F3", "A4", "C5"], ["G3", "B4", "D5"], ["C3", "E4", "G4"]]
  },
  {
    id: "mixolydian",
    name: "Mixolydian",
    family: "major",
    familyLabel: "Major Family",
    brightness: "3 / 7 • Earthy & Driving",
    badgeClass: "badge-peach",
    rootLabel: "C",
    stammton: "5th mode of the Major scale (like C Major starting on G)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · b7",
    steps: "W – W – H – W – W – H – W",
    charNote: "Flat 7th (b7, e.g. Bb over C)",
    vamp: "I – bVII (C – Bb)",
    desc: "A major mode that trades away the stiff classical leading tone for a relaxed b7 — bringing an immediate bluesy, swaggering rock groove.",
    usage: "<strong>Musical Use:</strong> Ruling mode of classic rock, funk, Celtic folk, and reggae (The Beatles <em>Norwegian Wood</em>, AC/DC, Deep Purple), and the go-to jazz scale over Dominant 7th (V7) chords.",
    notes: "C4,D4,E4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "E4", "G4", "Bb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "dorian",
    name: "Dorian",
    family: "minor",
    familyLabel: "Minor Family",
    brightness: "4 / 7 • Velvet & Groovy",
    badgeClass: "badge-lilac",
    rootLabel: "C",
    stammton: "2nd mode of the Major scale (like C Major starting on D)",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · b7",
    steps: "W – H – W – W – W – H – W",
    charNote: "Raised Major 6th inside minor (♮6, e.g. A over C)",
    vamp: "i – IV (Cm – F)",
    desc: "Dead center of the brightness spectrum: a minor 3rd and flat 7th brightened by a soulful natural 6th (♮6). Cool, stylish, never overly tragic — pure forward motion.",
    usage: "<strong>Musical Use:</strong> Undisputed champion of funk, soul, modal jazz, and prog rock (Miles Davis <em>So What</em>, Santana <em>Oye Como Va</em>, Daft Punk <em>Get Lucky</em>, Pink Floyd) plus Celtic folk tunes.",
    notes: "C4,D4,Eb4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4", "Bb4"], ["F3", "A4", "C5"]]
  },
  {
    id: "aeolian",
    name: "Aeolian (Natural Minor)",
    family: "minor",
    familyLabel: "Minor Family",
    brightness: "5 / 7 • Earnest & Melancholic",
    badgeClass: "badge-sage",
    rootLabel: "C",
    stammton: "6th mode of the Major scale (like C Major starting on A)",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · b7",
    steps: "W – H – W – W – H – W – W",
    charNote: "Minor 6th (b6, e.g. Ab) + minor 7th (b7)",
    vamp: "i – bVI – bVII (Cm – Ab – Bb)",
    desc: "Natural minor. Darkening the 6th to b6 just a half step above the 5th creates sweeping pathos, drama, and deeply tender longing.",
    usage: "<strong>Musical Use:</strong> Everywhere in rock ballads, pop minor anthems (Adele, <em>All Along the Watchtower</em>), R&amp;B, and epic movie trailers. Unlike Dorian’s bright ♮6, b6 sighs gently down into the 5th.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Ab3", "C4", "Eb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "phrygian",
    name: "Phrygian",
    family: "minor",
    familyLabel: "Minor Family",
    brightness: "6 / 7 • Dark & Exotic",
    badgeClass: "badge-lilac",
    rootLabel: "C",
    stammton: "3rd mode of the Major scale (like C Major starting on E)",
    formula: "1 · b2 · b3 · 4 · 5 · b6 · b7",
    steps: "H – W – W – W – H – W – W",
    charNote: "Minor 2nd right above the root (b2, e.g. Db → C)",
    vamp: "i – bII (Cm – Db)",
    desc: "Placing a sharp half-step crunch right above the tonic produces immediate mystery and Spanish-Middle Eastern flair. That b2 leans straight back down onto the root.",
    usage: "<strong>Musical Use:</strong> Soul of Spanish flamenco (often paired with a major 3rd as <em>Phrygian Dominant</em>), heavy metal &amp; djent (Metallica), dark trap beats, and tense thriller scores.",
    notes: "C4,Db4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "locrian",
    name: "Locrian",
    family: "minor",
    familyLabel: "Minor Family",
    brightness: "7 / 7 • Diminished & Unstable",
    badgeClass: "badge-lilac",
    rootLabel: "C",
    stammton: "7th mode of the Major scale (like C Major starting on B)",
    formula: "1 · b2 · b3 · 4 · b5 · b6 · b7",
    steps: "H – W – W – H – W – W – W",
    charNote: "Diminished 5th (b5, e.g. Gb) + b2",
    vamp: "i° – bII (Cm7b5 – Db)",
    desc: "The sole diatonic mode lacking a stable Perfect 5th above its root. Instead, the tonic triad itself is diminished / half-diminished (m7b5), brimming with restlessness.",
    usage: "<strong>Musical Use:</strong> Rare as an entire home key (e.g., Björk’s <em>Army of Me</em> feel, prog metal), yet indispensable in jazz over half-diminished chords (ii°7 in minor ii–V–i turnarounds) and suspense scoring.",
    notes: "C4,Db4,Eb4,F4,Gb4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "Gb4", "Bb4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "harmonic-minor",
    name: "Harmonic Minor (Bonus Variant)",
    family: "variant",
    familyLabel: "Minor Variant",
    brightness: "Dramatic • Classical, Neoclassical & Middle Eastern",
    badgeClass: "badge-peach",
    rootLabel: "C",
    stammton: "Natural minor with a raised 7th leading tone (#7)",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · #7",
    steps: "W – H – W – W – H – 1½ – H",
    charNote: "Major Leading Tone (7) + Augmented 2nd gap (b6 → 7, 3 half steps!)",
    vamp: "i – V7 (Cm – G7)",
    desc: "Pairs the moody b6 of Aeolian with a bright major leading tone (7). Between them opens an expressive 3-semitone leap (b6 to 7) that instantly evokes Baroque drama, tango, or Middle Eastern ornament.",
    usage: "<strong>Musical Use:</strong> Supplies minor keys with a true Major V7 dominant (Bach, Mozart, flamenco, neoclassical shred like Yngwie Malmsteen). Its 5th mode yields <em>Phrygian Dominant</em>.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,B4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["G3", "B4", "D5", "F5"]]
  },
  {
    id: "melodic-minor",
    name: "Melodic Minor (Jazz Minor)",
    family: "variant",
    familyLabel: "Minor Variant",
    brightness: "Sleek • Film Noir, Modern Jazz & Fusion",
    badgeClass: "badge-sage",
    rootLabel: "C",
    stammton: "Just like Major, only with a flat 3rd (b3)",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · 7",
    steps: "W – H – W – W – W – W – H",
    charNote: "b3 paired with lifted ♮6 and leading tone 7",
    vamp: "imMaj7 – IV7 (CmMaj7 – F7)",
    desc: "Originally used ascending to smooth out Harmonic Minor’s wide leap (before reverting to natural minor descending). Modern jazz keeps this crisp raised form in both directions as an independent harmonic universe.",
    usage: "<strong>Musical Use:</strong> That brooding, detective film-noir sound (mMaj7) and parent scale of jazz powerhouses like Lydian Dominant (4th mode) and the Altered Scale (7th mode).",
    notes: "C4,D4,Eb4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "Eb4", "G4", "B4"], ["F3", "A4", "C5", "Eb5"]]
  }
];

function renderModesReferenceHTML_EN(familyFilter = "all") {
  const list = familyFilter === "all"
    ? MODES_ENCYCLOPEDIA_EN
    : MODES_ENCYCLOPEDIA_EN.filter(m => m.family === familyFilter);

  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Core Principle</span>
        <span class="k-ratio-chip">Relative vs. Parallel</span>
      </div>
      <h4>What Exactly Are Modes?</h4>
      <p>
        A <strong>mode</strong> happens when you use the exact same collection of pitches, yet elevate a different note as your resting <strong>home center (tonic)</strong>. Stick strictly to the white piano keys (C Major notes) and each starting note creates a distinct pattern of whole and half steps: start on <code>D</code> for <em>Dorian</em>, <code>E</code> for <em>Phrygian</em>, <code>F</code> for <em>Lydian</em>, <code>G</code> for <em>Mixolydian</em>, <code>A</code> for <em>Aeolian</em>, or <code>B</code> for <em>Locrian</em>.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>1. Relative (Same Keys)</h5>
          <p>Handy for keyboard geography: “D Dorian uses the exact same keys as C Major.” Tricky for your ear at first, though, because C still tries to sound like home.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>2. Parallel (Same Root!)</h5>
          <p><strong>The Ear-Training Key:</strong> Play all 7 modes starting on <code>C</code>! Now one signature note reveals the mood immediately (e.g., <code>C → F#</code> = Lydian, <code>C → Bb</code> = Mixolydian).</p>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">The Modal Brightness Spectrum</span>
        <span class="k-ratio-chip">Bright → Dark</span>
      </div>
      <h4>Sorted by Brightness (Along the Circle of Fifths)</h4>
      <p>
        Arrange the 7 church modes from brightest to darkest rather than steps 1–7, and each step swaps literally <strong>one single pitch down a half step</strong> — matching the Circle of Fifths:
      </p>
      <div class="mode-spectrum-strip">
        <span class="mode-spec-chip is-bright">1. Lydian (#4)</span>
        <span class="mode-spec-chip">2. Ionian</span>
        <span class="mode-spec-chip">3. Mixolydian (b7)</span>
        <span class="mode-spec-chip">4. Dorian (b3, b7)</span>
        <span class="mode-spec-chip">5. Aeolian (+b6)</span>
        <span class="mode-spec-chip">6. Phrygian (+b2)</span>
        <span class="mode-spec-chip is-dark">7. Locrian (+b5)</span>
      </div>
    </article>

    <div class="k-filter-row" aria-label="Filter modes">
      <button class="k-filter-pill ${familyFilter === "all" ? "active" : ""}" data-mfilter="all">All (${MODES_ENCYCLOPEDIA_EN.length})</button>
      <button class="k-filter-pill ${familyFilter === "major" ? "active" : ""}" data-mfilter="major">Major Family (3)</button>
      <button class="k-filter-pill ${familyFilter === "minor" ? "active" : ""}" data-mfilter="minor">Minor Family (4)</button>
      <button class="k-filter-pill ${familyFilter === "variant" ? "active" : ""}" data-mfilter="variant">Minor Variants (2)</button>
    </div>

    <div class="knowledge-list">
      ${list.map(m => `
        <article class="knowledge-card">
          <div class="k-card-top-row">
            <span class="k-card-tag ${m.family === "major" ? "tag-peach" : m.family === "minor" ? "tag-lilac" : "tag-sage"}">${m.familyLabel} • ${m.brightness}</span>
            <span class="k-ratio-chip">${m.formula}</span>
          </div>
          <h4>${m.name} (Example on ${m.rootLabel})</h4>
          <p class="k-char">${m.stammton}</p>
          <p><strong>Color Note:</strong> ${m.charNote}<br><strong>Step Formula:</strong> <code>${m.steps}</code></p>
          <p>${m.desc}</p>
          <p>${m.usage}</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-mode-scale="${m.id}">▶ Scale (${m.rootLabel})</button>
            <button class="btn-tool" data-play-mode-vamp="${m.id}">▶ Chord loop: ${m.vamp}</button>
          </div>
        </article>
      `).join("")}
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Songwriting &amp; Modal Harmony</span>
        <span class="k-ratio-chip">Holding the Modal Center</span>
      </div>
      <h4>How to Write Modally Without Slipping Back Into Major</h4>
      <ul class="k-physics-list">
        <li><strong>Dodge the Parent-Key Tritone:</strong> Inside C Major’s notes, <code>F</code> and <code>B</code> form G7’s tritone that yanks ears straight back to C. Writing in D Dorian or G Mixolydian? Avoid dwelling on G7 → C so your chosen mode keeps center stage.</li>
        <li><strong>Lean on Two-Chord Modal Loops:</strong> Rather than long four-chord chains, modal grooves shuttle gently between the tonic chord and whichever neighbor showcases the <strong>color note</strong> (e.g., <code>Cm – F</code> in C Dorian spotlights bright <code>A</code>).</li>
        <li><strong>Anchor With a Pedal Drone:</strong> Holding an open root + 5th drone in the bass pins your modal home down immediately — making every melodic color pop cleanly above it.</li>
      </ul>
    </article>
  `;
}

const KEYS_CIRCLE_DATA_EN = [
  {
    id: "key-0",
    group: "neutral",
    sigBadge: "0 Accidentals",
    majorName: "C Major",
    minorName: "A Minor",
    rootMidi: 60,
    minorMidi: 57,
    accidentalList: "No sharps or flats (white keys only)",
    chords: "I C · ii Dm · iii Em · IV F · V G · vi Am",
    instrumentTip: "Classic starting point on piano, recorder & vocal warmups"
  },
  {
    id: "key-1s",
    group: "sharp",
    sigBadge: "1 ♯",
    majorName: "G Major",
    minorName: "E Minor",
    rootMidi: 55,
    minorMidi: 52,
    accidentalList: "1♯: F# (leading tone to G)",
    chords: "I G · ii Am · iii Bm · IV C · V D · vi Em",
    instrumentTip: "Adored by bowed strings (open G/D/A/E strings) & acoustic guitar"
  },
  {
    id: "key-2s",
    group: "sharp",
    sigBadge: "2 ♯",
    majorName: "D Major",
    minorName: "B Minor",
    rootMidi: 62,
    minorMidi: 59,
    accidentalList: "2♯: F#, C#",
    chords: "I D · ii Em · iii F#m · IV G · V A · vi Bm",
    instrumentTip: "Brilliant festive orchestral key (baroque trumpets, violin, cello)"
  },
  {
    id: "key-3s",
    group: "sharp",
    sigBadge: "3 ♯",
    majorName: "A Major",
    minorName: "F# Minor",
    rootMidi: 57,
    minorMidi: 54,
    accidentalList: "3♯: F#, C#, G#",
    chords: "I A · ii Bm · iii C#m · IV D · V E · vi F#m",
    instrumentTip: "Open, glowing and effortless on guitar and strings"
  },
  {
    id: "key-4s",
    group: "sharp",
    sigBadge: "4 ♯",
    majorName: "E Major",
    minorName: "C# Minor",
    rootMidi: 64,
    minorMidi: 61,
    accidentalList: "4♯: F#, C#, G#, D#",
    chords: "I E · ii F#m · iii G#m · IV A · V B · vi C#m",
    instrumentTip: "Signature electric guitar, blues & classic rock key (low open E string)"
  },
  {
    id: "key-5s",
    group: "sharp",
    sigBadge: "5 ♯ / 7 ♭",
    majorName: "B Major (= Cb Major)",
    minorName: "G# Minor (= Ab Minor)",
    rootMidi: 59,
    minorMidi: 56,
    accidentalList: "5♯: F#, C#, G#, D#, A# (enharmonically Cb Major with 7♭)",
    chords: "I B · ii C#m · iii D#m · IV E · V F# · vi G#m",
    instrumentTip: "Surprisingly ergonomic under piano fingers because all 5 black keys align naturally"
  },
  {
    id: "key-6",
    group: "sharp",
    sigBadge: "6 ♯ / 6 ♭",
    majorName: "F# Major / Gb Major",
    minorName: "D# Minor / Eb Minor",
    rootMidi: 54,
    minorMidi: 51,
    accidentalList: "6♯ (F#, C#, G#, D#, A#, E#) or 6♭ (Bb, Eb, Ab, Db, Gb, Cb)",
    chords: "I F#/Gb · ii G#m/Abm · IV B/Cb · V C#/Db · vi D#m/Ebm",
    instrumentTip: "Sitting dead opposite C Major on the wheel (tritone pole!). Enharmonic crossroads"
  },
  {
    id: "key-5f",
    group: "flat",
    sigBadge: "5 ♭ / 7 ♯",
    majorName: "Db Major (= C# Major)",
    minorName: "Bb Minor (= A# Minor)",
    rootMidi: 61,
    minorMidi: 58,
    accidentalList: "5♭: Bb, Eb, Ab, Db, Gb (enharmonically C# Major with 7♯)",
    chords: "I Db · ii Ebm · iii Fm · IV Gb · V Ab · vi Bbm",
    instrumentTip: "Beloved romantic piano, soul & jazz ballad key (velvety under black keys)"
  },
  {
    id: "key-4f",
    group: "flat",
    sigBadge: "4 ♭",
    majorName: "Ab Major",
    minorName: "F Minor",
    rootMidi: 56,
    minorMidi: 53,
    accidentalList: "4♭: Bb, Eb, Ab, Db",
    chords: "I Ab · ii Bbm · iii Cm · IV Db · V Eb · vi Fm",
    instrumentTip: "Huge favorite for jazz standards, wind bands & R&B/pop ballads"
  },
  {
    id: "key-3f",
    group: "flat",
    sigBadge: "3 ♭",
    majorName: "Eb Major",
    minorName: "C Minor",
    rootMidi: 63,
    minorMidi: 60,
    accidentalList: "3♭: Bb, Eb, Ab",
    chords: "I Eb · ii Fm · iii Gm · IV Ab · V Bb · vi Cm",
    instrumentTip: "Heroic symphony key (Beethoven Eroica); sweet spot for alto sax & brass"
  },
  {
    id: "key-2f",
    group: "flat",
    sigBadge: "2 ♭",
    majorName: "Bb Major",
    minorName: "G Minor",
    rootMidi: 58,
    minorMidi: 55,
    accidentalList: "2♭: Bb, Eb",
    chords: "I Bb · ii Cm · iii Dm · IV Eb · V F · vi Gm",
    instrumentTip: "Bread-and-butter key for jazz, big band, brass bands & Bb trumpets/clarinets"
  },
  {
    id: "key-1f",
    group: "flat",
    sigBadge: "1 ♭",
    majorName: "F Major",
    minorName: "D Minor",
    rootMidi: 53,
    minorMidi: 62,
    accidentalList: "1♭: Bb (B♮ lowered to Bb)",
    chords: "I F · ii Gm · iii Am · IV Bb · V C · vi Dm",
    instrumentTip: "Warm, pastoral resonance; feel-good range for horns, flutes & choirs"
  }
];

function renderKeysReferenceHTML_EN(circleFilter = "all") {
  const keys = circleFilter === "all"
    ? KEYS_CIRCLE_DATA_EN
    : circleFilter === "sharps-flats"
      ? KEYS_CIRCLE_DATA_EN.filter(k => k.group === "sharp" || k.group === "flat")
      : KEYS_CIRCLE_DATA_EN.filter(k => k.group === circleFilter);

  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Core Concept</span>
        <span class="k-ratio-chip">Tonality &amp; Key Signatures</span>
      </div>
      <h4>Scale vs. Key: What Actually Makes a Key?</h4>
      <p>
        A <strong>scale</strong> is just notes lined up in pitch order (e.g., C–D–E–F–G–A–B–C). A <strong>key</strong> describes the whole <em>magnetic gravity system</em> centered around a home note: it defines your resting point (<strong>Tonic / Root</strong>), your quality (bright <strong>Major</strong> vs. deep <strong>Minor</strong>), and which pitches stay raised (♯) or lowered (♭) via the <strong>key signature</strong>.
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Why Do Key Signatures Exist?</strong>
          Every Major scale demands the exact same step formula: <code>W – W – H – W – W – W – H</code> (half steps between 3–4 and 7–8). Shift from C up to <code>G</code> and degree 7 (<code>F</code>) sits too low — raising it to <code>F#</code> restores the true leading tone.
        </div>
        <div class="physics-fact-item">
          <strong>Key Signatures vs. Accidentals</strong>
          <strong>Key signatures</strong> sit right next to the clef and apply throughout the entire piece. A local <strong>accidental</strong> inside a bar applies only until the barline for temporary harmonic color.
        </div>
      </div>
    </article>

    <div class="k-sibling-bar">
      <span><strong>Explore Visually &amp; By Ear:</strong> Open the interactive Circle of Fifths wheel with live chords &amp; modulations.</span>
      <button type="button" class="btn-tool" data-jump-ref="circle-of-fifths">Open Circle of Fifths →</button>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Logic of the Circle of Fifths</span>
        <span class="k-ratio-chip">3:2 → 12 Key Centers</span>
      </div>
      <h4>Why All 12 Keys Arrange Cleanly Into a Clock</h4>
      <p>
        Right after the octave (2:1), the <strong>Perfect 5th (3:2)</strong> is the tightest harmonic bond in music. Step clockwise up by fifths (<code>C → G → D → A → E → B → F#</code>) and each key adds one new <strong>sharp (♯)</strong>. Step counter-clockwise by fourths (<code>C → F → Bb → Eb → Ab → Db → Gb</code>) and each step adds one new <strong>flat (♭)</strong>.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Clockwise: Sharp Keys (♯)</h5>
          <p><strong>Sharp Key Order:</strong> <em>G, D, A, E, B, F#</em>.<br><strong>Sharp Order:</strong> <code>F# – C# – G# – D# – A# – E#</code> (“<em>Father Charles Goes Down And Ends Battle</em>” — the newest sharp is always the 7th degree / leading tone!).</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Counter-Clockwise: Flat Keys (♭)</h5>
          <p><strong>Flat Key Order:</strong> <em>F, Bb, Eb, Ab, Db, Gb</em>.<br><strong>Flat Order:</strong> <code>Bb – Eb – Ab – Db – Gb – Cb</code> (“<em>Battle Ends And Down Goes Charles’s Father</em>”). Shortcut: the <strong>second-to-last flat</strong> names the Major tonic!</p>
        </div>
      </div>
      <p class="k-tip"><strong>Pythagorean Comma &amp; Enharmonics:</strong> Stacking 12 pure 3:2 fifths overshoots 7 octaves by ~23.5 cents (the <em>Pythagorean Comma</em>). Modern <strong>12-tone equal temperament</strong> distributes that sliver evenly across all 12 steps so <code>F# Major</code> (6♯) and <code>Gb Major</code> (6♭) meet seamlessly on the exact same piano keys.</p>
    </article>

    <div class="section-heading-row">
      <h2 class="section-heading">3. Complete 12-Key Atlas</h2>
    </div>

    <div class="k-filter-row" aria-label="Filter keys by signature">
      <button class="k-filter-pill ${circleFilter === "all" ? "active" : ""}" data-kfilter="all">All 12 Keys</button>
      <button class="k-filter-pill ${circleFilter === "neutral" ? "active" : ""}" data-kfilter="neutral">C / Am (0 Sig.)</button>
      <button class="k-filter-pill ${circleFilter === "sharp" ? "active" : ""}" data-kfilter="sharp">Sharps (♯)</button>
      <button class="k-filter-pill ${circleFilter === "flat" ? "active" : ""}" data-kfilter="flat">Flats (♭)</button>
    </div>

    <div class="knowledge-list">
      ${keys.map(k => `
        <article class="knowledge-card">
          <div class="k-card-top-row">
            <span class="k-card-tag ${k.group === "sharp" ? "tag-peach" : k.group === "flat" ? "tag-lilac" : "tag-sage"}">${k.sigBadge}</span>
            <span class="k-ratio-chip">${k.majorName} / ${k.minorName}</span>
          </div>
          <h4>${k.majorName} &amp; Relative ${k.minorName}</h4>
          <p><strong>Key Signature:</strong> ${k.accidentalList}</p>
          <p><strong>Diatonic Triads:</strong> <code>${k.chords}</code></p>
          <p class="k-tip">${k.instrumentTip}</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-key-cadence="${k.rootMidi}" data-key-mode="major">▶ ${k.majorName} Cadence</button>
            <button class="btn-tool" data-play-key-cadence="${k.minorMidi}" data-key-mode="minor">▶ ${k.minorName}</button>
          </div>
        </article>
      `).join("")}
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. The 3 Flavors of Minor</span>
        <span class="k-ratio-chip">Why Minor Has 3 Scales</span>
      </div>
      <h4>Natural, Harmonic &amp; Melodic Minor (Shown in A Minor)</h4>
      <p>
        While Major keeps one crisp shape, minor music taps into three complementary forms because natural minor lacks a tight half-step leading tone up to tonic (<code>G → A</code> is a whole step, pulling gently rather than snapping like <code>G# → A</code>):
      </p>
      <ul class="k-physics-list">
        <li><strong>Natural Minor (Aeolian):</strong> Uses the exact key signature of its relative major (<code>A–B–C–D–E–F–G–A</code>). Folky, natural, earthy.</li>
        <li><strong>Harmonic Minor:</strong> Raises the 7th degree (<code>G → G#</code>) so the V chord turns into a driving <strong>Major Dominant (E7)</strong>. Leaves an exotic 3-semitone jump between <code>F</code> and <code>G#</code>.</li>
        <li><strong>Melodic Minor:</strong> Smooths out that leap for fluid vocals and bass lines by raising the 6th too while ascending (<code>F → F#, G → G#</code>); classical lines often revert to natural minor coming back down, whereas jazz plays the raised scale both ways.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G4,A4" data-dur="0.45" data-step="320">▶ Natural A Minor</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G#4,A4" data-dur="0.45" data-step="320">▶ Harmonic A Minor</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F#4,G#4,A4" data-dur="0.45" data-step="320">▶ Melodic A Minor</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Key Relationships &amp; Modulation</span>
        <span class="k-ratio-chip">Changing Keys</span>
      </div>
      <h4>How Keys Relate &amp; Pivot Smoothly Together</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Relative Minor / Major (3 Semitones Apart)</strong>
          Share the exact same notes and key signature: <code>C Major ↔ A Minor</code>, <code>G Major ↔ E Minor</code>. Shifting emphasis feels effortless and natural.
        </div>
        <div class="physics-fact-item">
          <strong>Parallel Major / Minor (Same Root)</strong>
          Keep the identical root note while flipping Major and Minor color: <code>C Major ↔ C Minor</code> (3 flats apart!). Delivers dramatic mood shifts like the bright “Picardy Third.”
        </div>
        <div class="physics-fact-item">
          <strong>Closely Related (Circle Neighbors)</strong>
          Neighbors one step clockwise or counter-clockwise (<code>C Major ↔ G</code> or <code>F</code>) differ by just one pitch. Pivot chords (like <code>Am</code>) bridge them invisibly.
        </div>
        <div class="physics-fact-item">
          <strong>Chromatic Mediants &amp; Truck-Driver Shift</strong>
          Moving a 3rd apart (<code>C → Ab</code> or <code>E</code>) swaps many accidentals at once for instant movie magic — while a direct half- or whole-step key lift late in a chorus surges energy.
        </div>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-custom="key-variant">▶ Parallel C ↔ Cm</button>
        <button class="btn-tool" data-play-custom="key-mediant">▶ Mediant Shift C → Ab → C</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">6. Transposing Instruments &amp; Key Color</span>
        <span class="k-ratio-chip">Ensemble Practice</span>
      </div>
      <h4>Why Horns Read Different Key Signatures Than Piano</h4>
      <p>
        While piano, guitar, strings, and flute read <strong>concert pitch (in C)</strong>, many winds transpose so identical written fingerings stay consistent across big and small horn sizes:
      </p>
      <ul class="k-physics-list">
        <li><strong>Bb Instruments (Trumpet, Clarinet, Tenor Sax):</strong> A written <code>C</code> sounds as concert <code>Bb</code> (a Major 2nd lower). When the band plays in <code>Bb Major (2♭)</code>, trumpet reads clean <code>C Major (0 sig.)</code>!</li>
        <li><strong>Eb Instruments (Alto Sax, Bari Sax):</strong> A written <code>C</code> sounds as concert <code>Eb</code> (a Major 6th below). When the ensemble grooves in <code>Eb Major (3♭)</code>, alto sax breezes along in <code>C Major</code>.</li>
        <li><strong>F Instruments (French Horn, English Horn):</strong> A written <code>C</code> sounds a Perfect 5th lower on concert <code>F</code>.</li>
      </ul>
      <p class="k-tip"><strong>Key “Personality”:</strong> Before modern equal temperament, unequal interval tuning gave every key its own distinct flavor (warm <em>Db</em>, dazzling <em>D</em>). Today all 12 keys share exact math — yet real instruments still color each key uniquely through open strings, horn acoustics, and comfortable vocal ranges.</p>
    </article>
  `;
}

function renderSingAndPlayReferenceHTML_EN() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">1. Why Coordination Trips Us Up</span>
        <span class="k-ratio-chip">Autopilot &amp; Focus</span>
      </div>
      <h4>Why Singing While Playing Feels So Hard at First</h4>
      <p>
        The second you play and sing simultaneously, two completely separate systems share the exact same beat: your <strong>hands</strong> (motor memory, chord shapes, strumming) and your <strong>voice</strong> (breath, pitch, lyrics). Working memory simply cannot micromanage two <em>brand-new</em> patterns at once.
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Put At Least One Hand on Autopilot</strong>
          Whenever voice and hands collide, your brain is still actively steering both. Solution: drill the accompaniment (or vocal line) until it runs automatically like climbing stairs.
        </div>
        <div class="physics-fact-item">
          <strong>Lock Rhythm Before Pitch</strong>
          90% of freeze-ups are rhythmic, not wrong notes! When a syllable lands between strums or keystrokes, hands stall — unless both rhythms were mapped out cleanly first.
        </div>
        <div class="physics-fact-item">
          <strong>Hum on “La” or “Doo” First</strong>
          Memorizing lyrics burns enormous brain bandwidth. Humming the tune on one neutral syllable first frees focus for true pitch and groove.
        </div>
        <div class="physics-fact-item">
          <strong>One Shared Internal Pulse</strong>
          Let a gentle foot tap or metronome be the boss — your voice doesn’t chase your hand and your hand doesn’t wait on your voice; <em>both</em> lock to the beat.
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Practice Effectively in 5 Steps</span>
        <span class="k-ratio-chip">Step-by-Step Method</span>
      </div>
      <h4>The Proven 5-Step Routine for Any Song</h4>
      <p>
        Instead of restarting from bar 1 and stumbling at the same bridge every run, split coordination briefly into five focused steps:
      </p>
      <ul class="article-steps-list">
        <li>
          <strong>1. The Conversation Test (Automate Hands):</strong> Loop just your groove or chord pattern for 1–2 minutes until you can count out loud to 20 or hold small talk smoothly over it. If your hands falter while talking, give the instrument 5 more solo minutes first.
        </li>
        <li>
          <strong>2. Speak the Lyrics in Rhythm:</strong> Strum or comp your chords while <strong>speaking the lyrics strictly in time</strong> on one comfortable pitch. Removing vocal melody lets you feel immediately which syllables hit on beats vs. between strokes.
        </li>
        <li>
          <strong>3. Map Physical Anchor Points:</strong> Mark exact meeting spots: <em>“Bass thumb hits on the word ‘night’”</em> or <em>“‘free’ lands on the upstroke right between 2 and 3.”</em> Brains coordinate seamlessly around concrete anchors!
        </li>
        <li>
          <strong>4. Strip Chords Down &amp; Loop 1–2 Bars:</strong> Start with literally <strong>one chord strum on Beat 1</strong> and sing freely on top. Once solid, add Beat 3, then bring back the full strum or arpeggio — always in tight 1–2 bar loops!
        </li>
        <li>
          <strong>5. Slow Motion (60%) &amp; “Ghost Singing”:</strong> Cut tempo nearly in half. On tricky pickups, mouth or think the melody silently across one pass while playing, hum softly next pass, then sing full voice.
        </li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">3. Daily Independence Drills</span>
        <span class="k-ratio-chip">Try Right Now</span>
      </div>
      <h4>6 Targeted Coordination &amp; Independence Exercises</h4>
      <p>
        Just 5–8 minutes with one or two of these drills before diving into your repertoire unlocks independence dramatically faster than brute-force repetition:
      </p>
      <ul class="k-physics-list">
        <li>
          <strong>Drill 1 – Talk &amp; Count Check:</strong> Play a smooth four-chord progression (<code>I – V – vi – IV</code>) with a steady strum or piano groove while reading a paragraph aloud or counting backward from 20 to 1. Rule: your groove cannot wobble a millimeter.
        </li>
        <li>
          <strong>Drill 2 – Beat-1 Diamond Anchor:</strong> Play each chord once on Beat 1 (held whole note) and sing the entire verse across the open ring. Builds phrasing, vocal breath control, and smooth chord shifts free of rush.
        </li>
        <li>
          <strong>Drill 3 – Pedal Drone Tuning:</strong> Sustain an open root + 5th drone (<code>C3 + G3</code>) on your instrument while singing melodies or intervals above it. Trains pitch independence with zero left-hand distraction.
        </li>
        <li>
          <strong>Drill 4 – Anticipations &amp; the “4-and” Trap:</strong> Pop and soul vocals frequently enter a half beat <em>early</em> (on <code>4-and</code>) while guitar or piano changes cleanly on Beat 1. Tap steady quarter beats while singing phrases starting squarely on “and.”
        </li>
        <li>
          <strong>Drill 5 – Moving Bass vs. Held Vocal Note:</strong> Walk a simple bass progression (e.g., <code>C – F – G – C</code>) while your voice holds one steady common tone (<code>G</code>) — or flip it: hold one static chord while singing scales smoothly up and down.
        </li>
        <li>
          <strong>Drill 6 – The 20-Second Phone Check:</strong> Record one short loop on your phone and play it straight back. Listening outside the hot seat reveals hidden dropped beats or rushing immediately.
        </li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Drill 1: Groove to Speak Over</button>
        <button class="btn-tool" data-play-custom="sp-drone">▶ Drill 3: Drone + Melody</button>
        <button class="btn-tool" data-play-custom="sp-syncopation">▶ Drill 4: Pulse vs. Anticipation</button>
        <button class="btn-tool" data-play-custom="sp-poly">▶ Drill 5: Moving Bass, Held Note</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. Instrument Tips &amp; Common Traps</span>
        <span class="k-ratio-chip">Guitar, Piano &amp; Voice</span>
      </div>
      <h4>Instrument-Specific Advice to Save Weeks of Frustration</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Guitar: Keep the Pendulum Swinging</strong>
          Your strumming forearm is an unbroken metronome pendulum (<em>Down – Up – Down – Up</em>). Even across rests or syncopated vocal pickups, never stop the arm — simply float past the strings on air strums.
        </div>
        <div class="physics-fact-item">
          <strong>Piano: Layer One Rhythm at a Time</strong>
          Start purely with <em>left-hand roots on Beat 1 + singing</em>. Add calm right-hand triads on 1 and 3 next. Busy eighth-note comping or counterlines join only at the very end.
        </div>
        <div class="physics-fact-item">
          <strong>Transpose for Effortless Range</strong>
          Straining on awkward high vocal notes wrecks hand coordination instantly. Never hesitate to slap on a <strong>capo</strong> or transpose ±2 half steps so your voice carries effortlessly.
        </div>
        <div class="physics-fact-item">
          <strong>Schedule Your Breaths Like Notes</strong>
          Stumbles often strike right between lines rather than mid-bar! Reserve one intentional quarter-beat inhale before launching the chorus while your instrument coasts steadily underneath.
        </div>
      </div>
      <p class="k-tip"><strong>Lauscher Bonus Tip:</strong> Inside Lauscher’s <strong>Solfège</strong> and <strong>Melodies</strong> drills, try singing the target note out loud <em>before</em> tapping the key — wiring your ear, voice, and hands into one connected reflex.</p>
    </article>
  `;
}

function renderCircleOfFifthsTheoryHTML_EN() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. The Big Idea</span>
        <span class="k-ratio-chip">3:2 • 12 Keys</span>
      </div>
      <h4>What Is the Circle of Fifths — and Why a Circle?</h4>
      <p>
        Right after the octave (<code>2:1</code>), the <strong>perfect fifth (3:2)</strong> is the strongest acoustic bond in music. If you keep climbing up by fifths starting from <strong>C</strong> (<code>C → G → D → A → E → B → F♯…</code>), each step raises just one scale note to create the next key’s new leading tone — adding <strong>one sharp (♯)</strong> clockwise. Going counter-clockwise in fifths down (which is the same as up in <strong>fourths</strong>: <code>C → F → B♭ → E♭ → A♭ → D♭ → G♭</code>) softens tension step by step and adds <strong>one flat (♭)</strong> each move.
      </p>
      <p>
        After 12 steps, equal temperament closes the spiral back onto itself at <strong>6 o’clock (F♯ / G♭)</strong>, where 6 sharps and 6 flats sound on the exact same piano keys (<strong>enharmonic equivalence</strong>). Instead of memorizing 12 isolated scales, you get one single musical compass!
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Clockwise (+1 ♯) • Fifths Up</h5>
          <p><code>C → G → D → A → E → B → F♯</code><br>Energy brightens step by step. Order of sharps: <code>F♯ – C♯ – G♯ – D♯ – A♯ – E♯</code> (mnemonic: <em>Father Charles Goes Down And Ends Battle</em>).</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Counter-Clockwise (+1 ♭) • Fourths Up</h5>
          <p><code>C → F → B♭ → E♭ → A♭ → D♭ → G♭</code><br>Color warms and relaxes. Order of flats reverses it: <code>B♭ – E♭ – A♭ – D♭ – G♭ – C♭</code> (<em>Battle Ends And Down Goes Charles’ Father</em>).</p>
        </div>
      </div>
    </article>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-peach">2. How to Read It</span>
            <span class="k-ratio-chip">Clock Logic</span>
          </div>
          <h4>How to Read &amp; Use the Wheel in 20 Seconds</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Outer Ring = Major Keys, Inner Ring = Relative Minors:</strong> Every wedge pairs a major key with its <strong>relative minor</strong> directly underneath (<code>C / Am</code>, <code>G / Em</code>, <code>D / Bm</code>…). Both share the <em>exact same 7 notes and key signature</em> — minor simply centers 3 semitones lower (scale degree 6 / <em>La</em>).</li>
          <li><strong>The 1-Second Sharp Key Trick:</strong> Look at the <em>last sharp</em> in a key signature and move up <strong>one half step</strong> — that’s your Major tonic! (e.g., 2 sharps <code>F♯, C♯</code> → one half step above <code>C♯</code> = <strong>D Major</strong>).</li>
          <li><strong>The 1-Second Flat Key Trick:</strong> The <em>second-to-last flat</em> in a key signature names the Major key directly! (e.g., 3 flats <code>B♭, E♭, A♭</code> → second-to-last is <strong>E♭ Major</strong>; only <code>1♭ = F Major</code> is memorized solo).</li>
          <li><strong>Read Left, Center &amp; Right Like a Traffic Map:</strong> Any wedge you pick sits at <code>I</code> (Home). Its left neighbor is always the <strong>Subdominant (IV)</strong> and its right neighbor is always the <strong>Dominant (V)</strong>!</li>
        </ul>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-lilac">3. Why It’s a Superpower</span>
            <span class="k-ratio-chip">Real Musical Payoff</span>
          </div>
          <h4>What Actually Improves Once You Understand the Circle?</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>1. Instant Songwriting &amp; Jam Chord Map</strong>
            Look at the highlighted 3-wedge slice on the wheel above: your tonic plus its left and right neighbors give you <strong>all 6 main diatonic chords</strong> of the key (<code>IV – I – V</code> outside + <code>ii – vi – iii</code> inside)! Thousands of pop, rock, folk, and worship hits use nothing outside that compact pie slice.
          </div>
          <div class="physics-fact-item">
            <strong>2. Effortless Transposing &amp; Capo Math</strong>
            Too high to sing? Slide your 3-wedge chord block clockwise or counter-clockwise around the circle — relationships stay identical (<code>I–V–vi–IV</code> in C moves straight across as <code>G–D–Em–C</code>, or <code>F–C–Dm–B♭</code>).
          </div>
          <div class="physics-fact-item">
            <strong>3. Natural Key Changes (Modulations)</strong>
            Adjacent wedges differ by <strong>only one single note</strong> (6 shared notes out of 7!), making verse-to-bridge modulations feel seamless. Jumping straight across the circle (6 steps / tritone pole) changes almost every pitch for maximum cinematic shock.
          </div>
          <div class="physics-fact-item">
            <strong>4. Faster Ear Training &amp; Reading</strong>
            Notice how famous Jazz/Pop circle progressions (<code>iii – vi – ii – V – I</code>) walk <em>counter-clockwise</em> around the outer/inner rings one wedge at a time! Your ear starts anticipating chord roots geometrically instead of guessing blindly.
          </div>
        </div>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">4. Practice Moves</span>
            <span class="k-ratio-chip">Play &amp; Listen</span>
          </div>
          <h4>4 High-Impact Ways to Practice with the Circle</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Break the “Only C &amp; G” Habit:</strong> Take any new lick, scale, or chord turnaround and move clockwise one step per day (<code>C → G → D → A</code>) or counter-clockwise through the horn-friendly flat keys (<code>F → B♭ → E♭ → A♭</code>). Within 12 days you’ve touched the entire keyboard or fretboard.</li>
          <li><strong>Listen to Circle-of-Fifths Sequences (<code>vi–ii–V–I</code>):</strong> Count backward toward 12 o’clock: each chord acts like a miniature dominant pulling into the next wedge! Hit play below to hear this magnetic gravity in C Major.</li>
          <li><strong>Borrow One Neighbor Color (Secondary Dominants):</strong> Playing in C Major and want extra lift before <code>G (V)</code>? Step one notch clockwise to pick up <code>F♯</code>, turning minor <code>ii (Dm)</code> into a bright <strong>D7 (V/V)</strong> pointing straight at G!</li>
          <li><strong>Contrast Warm vs. Bright Pulls in Songs:</strong> Moving left around the wheel (<code>I → IV → bVII</code>) sounds grounded, soulful, and laid-back; climbing right (<code>I → V → V/V</code>) drives excitement and brightness forward.</li>
        </ul>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-progression="vi,ii,V7,I">▶ Hear Circle Gravity (Am–Dm–G7–C)</button>
          <button class="btn-tool" data-play-progression="I,V/V,V,I">▶ Hear Clockwise Lift (C–D (V/V)–G–C)</button>
        </div>
      </div>
    </details>
  `;
}

function getIntervalNamingGuideHTML_EN() {
  const sym = k => (typeof formatIntervalSymbol === "function" ? formatIntervalSymbol(k) : k);
  const useGerman = typeof state !== "undefined" ? state?.profile?.intervalNotation !== "intl" : true;
  const activeSchemeLabel = useGerman ? "Active: P / G / k" : "Active: P / M / m";
  return `
    <details class="knowledge-card k-accordion" id="intervalNamingGuideAccordion" open>
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">Naming &amp; Symbols</span>
            <span class="k-ratio-chip">${activeSchemeLabel}</span>
          </div>
          <h4>How Interval Symbols Work (Letter + Number)</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <p>Every interval shorthand packs two facts into two characters: the <strong>number</strong> counts scale-letter steps, while the <strong>prefix letter</strong> defines its exact semitone size.</p>
        <ul class="k-physics-list">
          <li><strong>1. The Number (<code>1</code>–<code>9</code>) Counts Scale Steps:</strong> From <code>1</code> = Unison (same note), <code>2</code> = 2nd, <code>3</code> = 3rd, <code>4</code> = 4th, <code>5</code> = 5th, <code>6</code> = 6th, <code>7</code> = 7th, <code>8</code> = Octave up to <code>9</code> = 9th.</li>
          <li><strong>2. Perfect Intervals (<code>P</code>):</strong> <code>P1</code>, <code>P4</code>, <code>P5</code>, and <code>P8</code> occur in only one pure form — open, stable frequency ratios with no major/minor split.</li>
          <li><strong>3. Major &amp; Minor Pairs (<code>2</code>, <code>3</code>, <code>6</code>, <code>7</code>, <code>9</code>):</strong> These five sizes come in two shades separated by <strong>1 semitone</strong>:<br>
            – <strong>International (<code>P / M / m</code>):</strong> uppercase <strong><code>M</code></strong> (<em>Major</em>) marks the wider, brighter interval; lowercase <strong><code>m</code></strong> (<em>minor</em>) sits 1 semitone closer (e.g., <code>M3</code> vs. <code>m3</code>). Case matters completely here!<br>
            – <strong>German (<code>P / G / k</code>):</strong> uppercase <strong><code>G</code></strong> (<em>Groß</em> = major) vs. lowercase <strong><code>k</code></strong> (<em>klein</em> = minor, e.g., <code>G3</code> vs. <code>k3</code>).</li>
          <li><strong>4. Tritone (<code>TT</code>):</strong> Splits the octave cleanly in half at <strong>6 semitones</strong> right between <code>P4</code> and <code>P5</code> (augmented 4th / diminished 5th).</li>
        </ul>
        <div class="k-meta-box">
          <div><strong>Active Symbols:</strong> 2nds: <code>${sym("m2")}</code> (1 ST) vs. <code>${sym("M2")}</code> (2 ST) · 3rds: <code>${sym("m3")}</code> (3 ST) vs. <code>${sym("M3")}</code> (4 ST)</div>
          <div><strong>Customize:</strong> Switch anytime between <strong>International (P / M / m)</strong> and <strong>German (P / G / k)</strong> in <strong>App Settings → Musical Notation → Interval Naming</strong>.</div>
        </div>
      </div>
    </details>
  `;
}

function renderNotationReferenceHTML_EN() {
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
        <span class="k-card-tag tag-peach">1. The 5-Line Staff</span>
        <span class="k-ratio-chip">Lines &amp; Spaces</span>
      </div>
      <h4>How Pitch &amp; Time Are Mapped on Paper</h4>
      <p>
        Standard notation works like a musical graph: the <strong>vertical axis</strong> encodes pitch (higher on the page = higher frequency, lower = deeper pitch), while the <strong>horizontal axis</strong> moves forward through time from left to right.
      </p>
      <ul class="k-physics-list">
        <li><strong>Always Count Bottom-to-Top:</strong> Every grand staff unit uses <strong>5 lines</strong> (Line 1 at the bottom up to Line 5 at the top) framing <strong>4 spaces</strong> between them.</li>
        <li><strong>Alternating Line – Space – Line:</strong> Moving from any line to the very next space steps exactly <strong>one natural letter name</strong> up or down (<code>C → D → E → F → G → A → B</code>).</li>
        <li><strong>Why Clefs Exist:</strong> On their own, five lines carry no pitch name — the <strong>clef</strong> pins one unmistakable anchor pitch onto a specific line so every neighbor falls into place.</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. The 3 Main Clefs (Plus Special Clefs)</span>
        <span class="k-ratio-chip">Treble • Bass • Alto</span>
      </div>
      <h4>Three Windows onto the Same Keyboard</h4>
      <p>
        The glowing orange line highlights each clef’s <strong>anchor reference pitch</strong>. Memorize that single landmark and you can read every other line or space fast.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${trebleAnchorSvg}
          <h5>Treble Clef (G Clef)</h5>
          <p>The center spiral wraps directly around <strong>Line 2 from the bottom = G4</strong>. Standard for vocals (soprano/alto), violin, flute, trumpet, guitar, and piano right hand.</p>
          <p><strong>Memory Cues (bottom → top):</strong> Lines <em>E4 – G4 – B4 – D5 – F5</em> (“Every Good Bird Does Fly”); Spaces spell <em>F4 – A4 – C5 – E5</em> (“FACE”).</p>
          <button type="button" class="btn-tool" data-play-solo-note="G4">▶ Hear Anchor G4</button>
        </div>
        <div class="notation-knowledge-card">
          ${bassAnchorSvg}
          <h5>Bass Clef (F Clef)</h5>
          <p>The two dots bracket <strong>Line 4 from the bottom = F3</strong>. Essential for piano left hand, cello, double bass, bass guitar, trombone, bassoon, and low voices.</p>
          <p><strong>Memory Cues (bottom → top):</strong> Lines <em>G2 – B2 – D3 – F3 – A3</em> (“Good Bikes Don’t Fall Apart”); Spaces <em>A2 – C3 – E3 – G3</em> (“All Cows Eat Grass”).</p>
          <button type="button" class="btn-tool" data-play-solo-note="F3">▶ Hear Anchor F3</button>
        </div>
        <div class="notation-knowledge-card">
          ${altoAnchorSvg}
          <h5>Alto Clef (C Clef)</h5>
          <p>The central dip points straight at <strong>Line 3 (dead center) = Middle C (C4)</strong>. The everyday clef of the viola and classic vocal/ensemble scores.</p>
          <p><strong>Symmetry Shortcut:</strong> With <code>C4</code> sitting smack in the middle, stepping up gives <em>E4</em> (Line 4) &amp; <em>G4</em> (Line 5), while stepping down gives <em>A3</em> (Line 2) &amp; <em>F3</em> (Line 1).</p>
          <button type="button" class="btn-tool" data-play-solo-note="C4">▶ Hear Anchor C4</button>
        </div>
      </div>

      <div class="k-meta-box">
        <div><strong>Same Middle C (C4) Bridges All Three Clefs:</strong> In <strong>Treble</strong>, C4 rests on the 1st ledger line <em>below</em>; in <strong>Alto</strong>, it sits dead <em>center (Line 3)</em>; and in <strong>Bass</strong>, it floats on the 1st ledger line <em>above</em>!</div>
        <div><strong>Special Clefs (Outlook):</strong> The <strong>Tenor Clef</strong> slides the same C-clef up to Line 4 for high cello, bassoon, and trombone passages, while octave clefs (<code>8vb</code> / <code>8va</code>) transpose guitar or piccolo cleanly by an octave without ledger-line clutter.</div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Reading Up to 3 Ledger Lines</span>
        <span class="k-ratio-chip">±3 Ledger Lines</span>
      </div>
      <h4>Going Above &amp; Below Without Slowly Counting</h4>
      <p>
        When notes climb above Line 5 or dip below Line 1, short horizontal dashes called <strong>ledger lines</strong> extend the staff strictly behind those notes. This trainer covers up to <strong>3 ledger lines in both directions</strong> — the core span needed for real orchestral, band, and piano scores.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${ledgerSvg}
          <h5>Treble Clef: ±3 Ledger Lines</h5>
          <p>Left: 3rd, 2nd &amp; 1st ledger lines below (<code>F3 – A3 – C4</code>); center: Line 3 <code>B4</code>; right: 1st, 2nd &amp; 3rd ledger lines above (<code>A5 – C6 – E6</code>).</p>
        </div>
        <div class="notation-knowledge-card">
          ${ledgerBassSvg}
          <h5>Bass Clef: Low Extension &amp; High Passages</h5>
          <p>Below the staff: 3 ledger lines reach through <code>E2 – C2</code> down to low <code>A1</code>; above the staff: upward past Middle C (<code>C4</code>) to <code>E4</code> and <code>G4</code>.</p>
        </div>
      </div>
      <ul class="k-physics-list">
        <li><strong>Learn 2 Anchor “Buoys” Outside the Staff:</strong> Rather than counting every single dash from scratch, lock in the 1st &amp; 2nd ledger lines (e.g., <code>C4</code> &amp; <code>A3</code> below treble; <code>A5</code> &amp; <code>C6</code> above treble) and read immediate steps above or below them.</li>
        <li><strong>Notice Line-to-Line &amp; Space-to-Space Skips:</strong> Skipping straight from one ledger line to the next always spans a <strong>3rd</strong> (just like stacking triads!).</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Accidentals &amp; Notation Systems</span>
        <span class="k-ratio-chip">♯ • ♭ • B vs. H</span>
      </div>
      <h4>Black Keys, Enharmonics &amp; International vs. German Spelling</h4>
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
            <li><strong>Sharp (<code>♯</code>):</strong> Raises the pitch by <strong>1 semitone</strong> (one key right). <code>F</code> becomes <code>F♯</code>.</li>
            <li><strong>Flat (<code>♭</code>):</strong> Lowers the pitch by <strong>1 semitone</strong> (one key left). <code>G</code> becomes <code>G♭</code>.</li>
            <li><strong>Enharmonic Equivalents:</strong> On the piano, <code>F♯</code> and <code>G♭</code> trigger the exact same physical key — their spelling on paper tells you which direction the harmony resolves.</li>
            <li><strong>German vs. International Tip:</strong> In German scores, natural B is called <strong>H</strong> while flat B♭ is called <strong>B</strong>! You can toggle both conventions anytime in <em>App Settings</em>.</li>
          </ul>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Key Signatures &amp; Sight-Reading</span>
        <span class="k-ratio-chip">Global ♯/♭ + ♮</span>
      </div>
      <h4>When Accidentals Rule the Whole Staff</h4>
      <p>
        Instead of printing a <code>♯</code> or <code>♭</code> in front of every bar, key signatures sit right <strong>next to the clef</strong> and automatically reshape those note letters across <strong>every octave</strong> unless cancelled by a natural sign (<code>♮</code>).
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${keySigSharpSvg}
          <h5>Sharp Keys (Order: F♯ – C♯ – G♯ – D♯ – A♯ – E♯)</h5>
          <p>In <strong>D Major (2♯)</strong> every written <code>F</code> plays as <code>F♯</code> and every <code>C</code> as <code>C♯</code> — only the <code>♮</code> before the third note brings back white <code>F</code>.</p>
        </div>
        <div class="notation-knowledge-card">
          ${keySigFlatSvg}
          <h5>Flat Keys (Order: B♭ – E♭ – A♭ – D♭ – G♭ – C♭)</h5>
          <p>In <strong>E♭ Major (3♭)</strong> <code>B♭</code>, <code>E♭</code> and <code>A♭</code> govern the staff from the start, shifting every matching line or space until a natural (<code>♮</code>) cancels it.</p>
        </div>
      </div>
    </article>
  `;
}

function renderArrangingReferenceHTML_EN() {
  return `
    <!-- 1. What Is Arranging? -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. What Is Arranging?</span>
        <span class="k-ratio-chip">Sketch → Full Score</span>
      </div>
      <h4>The Art of Turning a Musical Idea into a Living Soundscape</h4>
      <p>
        If <strong>composition</strong> is the blueprint of a song (its core melody, basic chords, and lyrics), <strong>arranging</strong> is the entire architecture, lighting, color palette, and staging: <em>Who plays what, when, in which octave, with what rhythm, dynamics, and tone color?</em>
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Instrumentation &amp; Timbre</strong>
          Choosing which instruments or voices carry the lead melody, bassline, harmonic pad, and rhythmic pulse — and how their tone colors blend.
        </div>
        <div class="physics-fact-item">
          <strong>Form &amp; Dramatic Arc</strong>
          Shaping the emotional journey from an intimate intro through verses and pre-choruses up to the climax, bridge, and outro.
        </div>
        <div class="physics-fact-item">
          <strong>Register &amp; Voicing</strong>
          Spreading notes across low bass, warm midrange, and shimmering highs so every instrument has room to breathe without muddiness.
        </div>
        <div class="physics-fact-item">
          <strong>Texture, Dialogue &amp; Space</strong>
          Deciding when everyone plays together (<em>tutti</em>), when a single instrument answers in vocal pauses, and when silence creates goosebumps.
        </div>
      </div>
    </article>

    <!-- 2. Purpose & Applications -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. Purpose &amp; Real-World Uses</span>
        <span class="k-ratio-chip">Why We Arrange</span>
      </div>
      <h4>What Is Arranging Used For — and Why Does It Matter So Much?</h4>
      <p>
        The exact same song with the same four chords can sound like an <strong>intimate piano ballad</strong>, a <strong>driving funk groove</strong>, a <strong>four-part a cappella choir piece</strong>, or an <strong>epic orchestral film cue</strong>. The arrangement defines the genre, emotional weight, and clarity:
      </p>
      <ul class="article-steps-list">
        <li>
          <strong>1. Guiding Listener Focus:</strong> The human ear can consciously track at most <strong>2 to 3 simultaneous musical elements</strong>. Great arranging clears space in the midrange for the lead vocal or solo melody instead of burying it under competing tracks.
        </li>
        <li>
          <strong>2. Translating Emotion &amp; Style:</strong> Sustained string pads create warmth and vastness, tight brass stabs inject energy, and a lone fingerpicked guitar creates closeness and vulnerability.
        </li>
        <li>
          <strong>3. Preventing Ear Fatigue (The Layering Principle):</strong> If every instrument plays nonstop from bar 1, the listener’s ear tunes out after 30 seconds. By adding and stripping back layers section by section, each chorus and verse feels fresh.
        </li>
        <li>
          <strong>4. Adapting Music to Real Ensembles:</strong> Whether you are writing for a school band, string quartet, SATB choir, jazz big band, or solo piano, arranging tailors a piece to the exact instruments, ranges, and players available.
        </li>
        <li>
          <strong>5. Building Transitions &amp; “Musical Glue”:</strong> Pickup notes, drum fills, bass walks, crescendos, and sudden stops (<em>breaks</em>) connect sections so every transition feels inevitable.
        </li>
      </ul>
    </article>

    <!-- 3. The 4 Musical Layers -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. The 4-Layer Framework</span>
        <span class="k-ratio-chip">Musical Roles</span>
      </div>
      <h4>The 4 Essential Roles Inside Almost Every Arrangement</h4>
      <p>
        Whether in pop production, jazz ensembles, or orchestral scores, clear arrangements divide instruments into <strong>four distinct functional roles</strong>:
      </p>
      <ul class="k-physics-list">
        <li><strong>1. Lead / Focus (Foreground):</strong> The lead vocal or solo instrument carrying the primary melody and story. Everything else supports this line.</li>
        <li><strong>2. Foundation (Bass &amp; Groove):</strong> Bass (electric bass, upright bass, tuba, left-hand piano) and drums/percussion lock together to anchor the harmonic root and rhythmic pocket.</li>
        <li><strong>3. Harmonic Pad &amp; Comping (Middle Ground):</strong> Strings, choir pads, organ/synth beds, or rhythmic guitar/piano chords supply harmonic color and warmth.</li>
        <li><strong>4. Countermelody, Fills &amp; “Ear Candy”:</strong> Short melodic answers, counter-lines, or high sparkles placed specifically in the gaps where the lead melody takes a breath.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-sketch">▶ 1. Bare Sketch (melody &amp; root only)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-full-layers">▶ 2. Full 4-Layer Arrangement (groove + pad + fill)</button>
      </div>
    </article>

    <!-- 4. Register, Voicings & Frequency Separation -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Register &amp; Voicings</span>
        <span class="k-ratio-chip">Clarity vs. Mud</span>
      </div>
      <h4>Why Some Arrangements Sound Crystal Clear — and Others Sound Muddy</h4>
      <p>
        The most common arranging pitfall is having piano, guitar, and strings all play dense chords in the exact same middle octave (<code>C3–C4</code>), masking one another and crowding the lead vocal.
      </p>
      <ul class="k-physics-list">
        <li><strong>The Overtone Rule (Wide Down Low, Close Up High):</strong> Below <code>C3</code>, natural overtones crowd closely together. Tight thirds or seconds in the bass sound muddy and rumble (<em>Low-Interval Limit</em>). Keep the low register anchored with <strong>roots, octaves, and fifths</strong>, and place thirds, sevenths, and color extensions (<code>9, 11, 13</code>) in the middle and upper registers!</li>
        <li><strong>Close Voicing vs. Open / Drop-2 Voicing:</strong> Taking the second-highest note of a close four-note chord and dropping it down an octave (<em>Drop-2</em>) instantly opens up a lush, wide, cinematic sound for strings, horns, or choir.</li>
        <li><strong>Rhythmic Complementarity:</strong> If two instruments share a similar register, give them contrasting rhythms — e.g., sustained whole-note string pads paired with crisp sixteenth-note acoustic guitar strums.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-muddy">▶ Muddy: Tight thirds clustered in the bass</button>
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-open">▶ Clear: Open studio voicing (wide low, colorful high)</button>
      </div>
    </article>

    <!-- 5. Tension Over Time: Call & Response, Counterpoint & Drops -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Dynamics &amp; Dialogue</span>
        <span class="k-ratio-chip">Call &amp; Response • The Drop</span>
      </div>
      <h4>Keeping a 4-Minute Piece Engaging from Start to Finish</h4>
      <ul class="article-steps-list">
        <li>
          <strong>Call &amp; Response:</strong> When the lead vocal finishes a phrase and rests for two beats, a horn lick, guitar motif, or piano fill answers right inside that open space — turning accompaniment into a conversation.
        </li>
        <li>
          <strong>Contrary Motion &amp; Countermelody:</strong> A strong countermelody moves in the <em>opposite direction</em> of the main melody (rising when the lead falls) or moves when the lead holds a long note.
        </li>
        <li>
          <strong>Power Through Subtraction (“The Drop”):</strong> Often the biggest emotional impact comes not from adding five more tracks, but from <strong>suddenly stripping away</strong> almost everything (leaving just vocal and bass or kick drum for a bar) before bringing the full ensemble back in.
        </li>
        <li>
          <strong>Octave Expansion in the Chorus:</strong> Doubling the melody an octave higher while letting the bass drop an octave lower opens the frequency curtain both upward and downward.
        </li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-call-response">▶ Call &amp; Response (melody calls, accompaniment answers)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-counterpoint">▶ Contrary Counterpoint (voices opening outward)</button>
      </div>
    </article>

    <!-- 6. Reharmonization & 5-Point Checklist -->
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">6. Reharmonization &amp; Checklist</span>
        <span class="k-ratio-chip">New Light on Same Notes</span>
      </div>
      <h4>Changing the Emotional Meaning Without Changing a Single Melody Note</h4>
      <p>
        One of the most expressive arranging tools is <strong>reharmonization</strong>: keeping the melody 100% identical while swapping the chords underneath — for example, replacing a plain <code>C Major (I)</code> with a warm <code>Fmaj7 (IVmaj7)</code>, a bittersweet <code>Fm6 (iv6)</code>, or a lush <code>Am9 (vi9)</code>.
      </p>
      <div class="k-btn-row" style="margin-top:0.45rem;margin-bottom:0.65rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-plain">▶ Melody (E–D–C) over plain triads (I–V–I)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-cinema">▶ Exact same melody cinematically reharmonized</button>
      </div>
      <div class="k-meta-box">
        <div><strong>The 5-Question Checklist for Your Own Arrangements:</strong></div>
        <div>1. <strong>Who has the spotlight right now?</strong> Only one element should demand primary focus at any given moment.</div>
        <div>2. <strong>Where are the breathing spaces?</strong> Place fills and counter-lines inside the rests of the main melody.</div>
        <div>3. <strong>Is the low end clean?</strong> Avoid tight thirds below <code>C3</code> — anchor the bass with roots, fifths, and octaves.</div>
        <div>4. <strong>Can you immediately hear the difference between verse and chorus?</strong> Contrast register width, rhythmic density, and instrument count.</div>
        <div>5. <strong>The Mute Test:</strong> Mute a track for a moment. If the song doesn’t miss it, either give that part a distinct role or boldly leave it out!</div>
      </div>
      <div class="k-btn-row" style="margin-top:0.55rem;">
        <button type="button" class="btn-tool" data-jump-ref="ensembles">To Ensembles &amp; Orchestras →</button>
        <button type="button" class="btn-tool" data-jump-ref="cadences">To Cadences &amp; Harmony →</button>
        <button type="button" class="btn-tool" data-jump-ref="physics">To Physics &amp; Overtones →</button>
      </div>
    </article>
  `;
}
