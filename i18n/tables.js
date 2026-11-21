/**
 * Lauscher • Lokalisierte Musik- & App-Tabellen (ko-lokalisiert je Eintrag)
 * Enthält alle 23 Katalog-Tabellen (Intervalle, Akkorde, Modi, Rhythmus, Produktion, Profil usw.).
 */

registerColocatedTables({
  profileInstruments: {
    "Klavier": {
      en: "Piano",
      fr: "Piano",
      es: "Piano",
      pl: "Fortepian",
      uk: "Фортепіано",
      ur: "پیانو / ہارمونیم"
    },
    "Gitarre": {
      en: "Guitar",
      fr: "Guitare",
      es: "Guitarra",
      pl: "Gitara",
      uk: "Гітара",
      ur: "گٹار"
    },
    "Gesang": {
      en: "Vocals",
      fr: "Chant",
      es: "Canto",
      pl: "Śpiew",
      uk: "Вокал",
      ur: "گلوکاری"
    },
    "Bass": {
      en: "Bass",
      fr: "Basse",
      es: "Bajo",
      pl: "Bas",
      uk: "Бас",
      ur: "باس"
    },
    "Schlagzeug": {
      en: "Drums",
      fr: "Batterie",
      es: "Batería",
      pl: "Perkusja",
      uk: "Ударні",
      ur: "ڈرمز / طبلہ"
    },
    "Bläser": {
      en: "Horns & Winds",
      fr: "Vents & Cuivres",
      es: "Vientos y metales",
      pl: "Dęte",
      uk: "Духові",
      ur: "بانسری اور پھونک ساز"
    },
    "Produktion": {
      en: "Production",
      fr: "Production",
      es: "Producción",
      pl: "Produkcja",
      uk: "Продакшн",
      ur: "پروڈکشن"
    }
  },
  profileFocus: {
    "allround": {
      en: { label: "All-Rounder", hint: "Balanced mix across all skills" },
      fr: { label: "Polyvalent", hint: "Mélange équilibré de tous les modules" },
      es: { label: "Polivalente", hint: "Mezcla equilibrada de todos los módulos" },
      pl: { label: "Wszystko po trochu", hint: "Zrównoważone ćwiczenie różnych obszarów" },
      uk: { label: "Усе потроху", hint: "Збалансоване поєднання всіх модулів" },
      ur: { label: "آل راؤنڈر", hint: "تمام صلاحیتوں کا متوازن امتزاج" }
    },
    "harmony": {
      en: { label: "Chords & Harmony", hint: "Sharpen cadences & chord colors" },
      fr: { label: "Accords & Harmonie", hint: "Affiner cadences et couleurs d’accords" },
      es: { label: "Acordes y armonía", hint: "Afinar cadencias y colores de acordes" },
      pl: { label: "Akordy i harmonia", hint: "Pewniejsze rozpoznawanie kadencji i akordów" },
      uk: { label: "Акорди та гармонія", hint: "Впевненіше розпізнавати каданси й акорди" },
      ur: { label: "کارڈز اور ہارمونی", hint: "کیڈینسز اور کارڈز کے رنگ نکھاریں" }
    },
    "melody": {
      en: { label: "Melody & Solfège", hint: "Practice scale degrees & melodic lines" },
      fr: { label: "Mélodie & Solfège", hint: "Travailler les degrés et lignes mélodiques" },
      es: { label: "Melodía y solfeo", hint: "Trabajar los grados y las líneas melódicas" },
      pl: { label: "Melodia i solfeż", hint: "Stopnie gamy i pamięć melodyczna" },
      uk: { label: "Мелодія й сольфеджіо", hint: "Тренувати ладові ступені та мелодичний слух" },
      ur: { label: "دھنیں اور سولفیج", hint: "اسکیل درجات اور دھنوں کی مشق" }
    },
    "rhythm": {
      en: { label: "Rhythm & Groove", hint: "Meter, tapping & micro-timing" },
      fr: { label: "Rythme & Groove", hint: "Mesures, frappe et micro-timing" },
      es: { label: "Ritmo y groove", hint: "Compases, toque y micro-timing" },
      pl: { label: "Rytm i groove", hint: "Metrum, precyzja uderzeń i mikrotiming" },
      uk: { label: "Ритм і ґрув", hint: "Розміри, точність влучання й мікротаймінг" },
      ur: { label: "ردھم اور گروو", hint: "ٹائم سگنیچر، ٹیپنگ اور مائیکرو ٹائمنگ" }
    },
    "notation": {
      en: { label: "Notation & Reading", hint: "Treble, Bass, Alto clefs & ledger lines" },
      fr: { label: "Lecture de notes", hint: "Clés de Sol, Fa, Ut 3 & lignes supplémentaires" },
      es: { label: "Lectura de notas", hint: "Claves de sol, fa, do en 3.ª y líneas adicionales" },
      pl: { label: "Czytanie nut", hint: "Klucze wiolinowy, basowy, altowy i linie dodane" },
      uk: { label: "Читання нот", hint: "Скрипковий, басовий, альтовий ключі й додаткові лінійки" },
      ur: { label: "نوٹیشن اور اسٹاف ریڈنگ", hint: "ٹریبل، باس، آلٹو کلیف اور لیجر لائنز" }
    },
    "production": {
      en: { label: "Production & Mixing", hint: "Frequencies & EQ in pink noise" },
      fr: { label: "Production & Mix", hint: "Fréquences et égalisation dans le bruit rose" },
      es: { label: "Producción y mezcla", hint: "Frecuencias y ecualización en ruido rosa" },
      pl: { label: "Produkcja i miks", hint: "Częstotliwości i korekcja w szumie różowym" },
      uk: { label: "Продакшн і мікс", hint: "Частоти та корекція в рожевому шумі" },
      ur: { label: "پروڈکشن اور مکسنگ", hint: "پنک نوائز میں فریکوئنسیز اور EQ" }
    },
    "modes": {
      en: { label: "Scales & Modes", hint: "Church modes & characteristic notes" },
      fr: { label: "Gammes & Modes", hint: "Modes ecclésiastiques et notes caractéristiques" },
      es: { label: "Escalas y modos", hint: "Modos eclesiásticos y notas características" },
      pl: { label: "Skale i tryby", hint: "Skale kościelne i dźwięki charakterystyczne" },
      uk: { label: "Гами та лади", hint: "Натуральні лади й характерні тяжіння" },
      ur: { label: "اسکیلز اور موڈز", hint: "چرچ موڈز اور امتیازی سُر" }
    }
  },
  profileAccessories: {
    "headphones": {
      en: "Headphones",
      fr: "Casque audio",
      es: "Auriculares",
      pl: "Słuchawki",
      uk: "Навушники",
      ur: "ہیڈفونز"
    },
    "sunglasses": {
      en: "Sunglasses",
      fr: "Lunettes de soleil",
      es: "Gafas de sol",
      pl: "Okulary przeciwsłoneczne",
      uk: "Сонцезахисні окуляри",
      ur: "دھوپ کا چشمہ"
    },
    "beret": {
      en: "Jazz Beret",
      fr: "Béret jazz",
      es: "Boina de jazz",
      pl: "Beret jazzowy",
      uk: "Джазовий берет",
      ur: "جیز بیریٹ ٹوپی"
    },
    "bowtie": {
      en: "Concert Bow Tie",
      fr: "Nœud papillon",
      es: "Pajarita",
      pl: "Muszka koncertowa",
      uk: "Концертний метелик",
      ur: "کنسرٹ بو ٹائی"
    },
    "mic": {
      en: "Studio Mic",
      fr: "Micro de studio",
      es: "Micrófono de estudio",
      pl: "Mikrofon studyjny",
      uk: "Студійний мікрофон",
      ur: "اسٹوڈیو مائیک"
    },
    "coffee": {
      en: "Coffee Break",
      fr: "Pause café",
      es: "Pausa para el café",
      pl: "Przerwa na kawę",
      uk: "Кавова пауза",
      ur: "چائے / کافی وقفہ"
    },
    "notes": {
      en: "Music Notes",
      fr: "Notes de musique",
      es: "Notas musicales",
      pl: "Zeszyt nutowy",
      uk: "Ноти поруч",
      ur: "موسیقی کے نوٹس"
    },
    "sparkles": {
      en: "Starlight",
      fr: "Éclat d’étoiles",
      es: "Brillo de estrellas",
      pl: "Gwiezdny blask",
      uk: "Зоряне сяйво",
      ur: "ستاروں کی چمک"
    },
    "none": {
      en: "Classic",
      fr: "Classique",
      es: "Clásico",
      pl: "Klasyczny",
      uk: "Класичний",
      ur: "کلاسک"
    }
  },
  mixModes: {
    "cadence": {
      en: "Cadences",
      fr: "Cadences",
      es: "Cadencias",
      pl: "Kadencje",
      uk: "Каданси",
      ur: "کیڈینسز"
    },
    "cadence-minor": {
      en: "Cadences (Minor)",
      fr: "Cadences (mineur)",
      es: "Cadencias (menor)",
      pl: "Kadencje (moll)",
      uk: "Каданси (мінор)",
      ur: "کیڈینسز (مائنر)"
    },
    "interval-melodic": {
      en: "Intervals (Ascending)",
      fr: "Intervalles (Ascendants)",
      es: "Intervalos (ascendentes)",
      pl: "Interwały (W górę)",
      uk: "Інтервали (Висхідні)",
      ur: "انٹرولز (چڑھتے)"
    },
    "interval-melodic-down": {
      en: "Intervals (Descending)",
      fr: "Intervalles (Descendants)",
      es: "Intervalos (descendentes)",
      pl: "Interwały (W dół)",
      uk: "Інтервали (Низхідні)",
      ur: "انٹرولز (اترتے)"
    },
    "interval-harmonic": {
      en: "Intervals (Harmonic)",
      fr: "Intervalles (Harmoniques)",
      es: "Intervalos (armónicos)",
      pl: "Interwały (Harmoniczne)",
      uk: "Інтервали (Гармонічні)",
      ur: "انٹرولز (ہارمونک)"
    },
    "interval-drone": {
      en: "Intervals (Root Pad)",
      fr: "Intervalles (Nappe tonique)",
      es: "Intervalos (colchón de tónica)",
      pl: "Interwały (Na tle burdonu)",
      uk: "Інтервали (На тлі педалі)",
      ur: "انٹرولز (اساس پیڈ پر)"
    },
    "chord-arp-up": {
      en: "Chords (Arpeggio ↗)",
      fr: "Accords (Arpège ↗)",
      es: "Acordes (arpegio ↗)",
      pl: "Akordy (Arpeggio ↗)",
      uk: "Акорди (Арпеджіо ↗)",
      ur: "کارڈز (آرپیجیو ↗)"
    },
    "chord-arp-down": {
      en: "Chords (Arpeggio ↘)",
      fr: "Accords (Arpège ↘)",
      es: "Acordes (arpegio ↘)",
      pl: "Akordy (Arpeggio ↘)",
      uk: "Акорди (Арпеджіо ↘)",
      ur: "کارڈز (آرپیجیو ↘)"
    },
    "interval-chords": {
      en: "Chords (Simultaneous)",
      fr: "Accords (Simultanés)",
      es: "Acordes (simultáneos)",
      pl: "Akordy (Jednoczesne)",
      uk: "Акорди (Одночасні)",
      ur: "کارڈز (بیک وقت)"
    },
    "chord-inversions": {
      en: "Chord Inversions",
      fr: "Renversements d’accords",
      es: "Inversiones de acordes",
      pl: "Przewroty akordów",
      uk: "Обернення акордів",
      ur: "کارڈ انورژنز"
    },
    "solfege": {
      en: "Solfège",
      fr: "Solfège",
      es: "Solfeo",
      pl: "Solfeż",
      uk: "Сольфеджіо",
      ur: "سولفیج"
    },
    "melody": {
      en: "Melody Phrases",
      fr: "Phrases mélodiques",
      es: "Frases melódicas",
      pl: "Frazy melodyczne",
      uk: "Мелодичні фрази",
      ur: "دھنوں کی فریزز"
    },
    "rhythm-meter": {
      en: "Rhythm • Time Signature",
      fr: "Rythme • Chiffrage de mesure",
      es: "Ritmo • Cifrado de compás",
      pl: "Rytm • Metrum",
      uk: "Ритм • Розмір",
      ur: "ردھم • ٹائم سگنیچر"
    },
    "rhythm-dictation": {
      en: "Rhythm • Dictation",
      fr: "Rythme • Dictée",
      es: "Ritmo • Dictado",
      pl: "Rytm • Dyktando",
      uk: "Ритм • Диктант",
      ur: "ردھم • ڈکٹیشن"
    },
    "rhythm-tap": {
      en: "Rhythm • Rhythm Tap",
      fr: "Rythme • Reproduire au pad",
      es: "Ritmo • Reproducir en el pad",
      pl: "Rytm • Stukanie na padzie",
      uk: "Ритм • Повтор на педі",
      ur: "ردھم • ردھم ٹیپ"
    },
    "rhythm-groove": {
      en: "Rhythm • Groove & Feel",
      fr: "Rythme • Groove & Feeling",
      es: "Ritmo • Groove y feeling",
      pl: "Rytm • Groove i feel",
      uk: "Ритм • Ґрув і відчуття",
      ur: "ردھم • گروو اور احساس"
    },
    "prod-tone": {
      en: "Production • Frequencies",
      fr: "Production • Fréquences",
      es: "Producción • Frecuencias",
      pl: "Produkcja • Częstotliwości",
      uk: "Продакшн • Частоти",
      ur: "پروڈکشن • فریکوئنسیز"
    },
    "prod-eq-noise": {
      en: "Production • Pink Noise EQ",
      fr: "Production • Égalisation bruit rose",
      es: "Producción • Ecualización en ruido rosa",
      pl: "Produkcja • EQ w szumie różowym",
      uk: "Продакшн • EQ у рожевому шумі",
      ur: "پروڈکشن • پنک نوائز EQ"
    },
    "modes-scale": {
      en: "Modes • Scale Recognition",
      fr: "Modes • Reconnaître la gamme",
      es: "Modos • Reconocer la escala",
      pl: "Tryby • Rozpoznaj skalę",
      uk: "Лади • Розпізнавання гами",
      ur: "موڈز • اسکیل کی پہچان"
    },
    "modes-char": {
      en: "Modes • Characteristic Note",
      fr: "Modes • Note caractéristique",
      es: "Modos • Nota característica",
      pl: "Tryby • Dźwięk charakterystyczny",
      uk: "Лади • Характерний ступінь",
      ur: "موڈز • امتیازی سُر"
    },
    "modes-cadence": {
      en: "Modes • Modal Chord Loops",
      fr: "Modes • Boucles modales",
      es: "Modos • Bucles modales",
      pl: "Tryby • Kadencje modalne",
      uk: "Лади • Модальні звороти",
      ur: "موڈز • موڈل کارڈ لوپس"
    },
    "notation-treble": {
      en: "Notation • Treble Clef",
      fr: "Notation • Clé de Sol",
      es: "Notación • Clave de sol",
      pl: "Nuty • Klucz wiolinowy",
      uk: "Нотопис • Скрипковий ключ",
      ur: "نوٹیشن • ٹریبل کلیف"
    },
    "notation-bass": {
      en: "Notation • Bass Clef",
      fr: "Notation • Clé de Fa",
      es: "Notación • Clave de fa",
      pl: "Nuty • Klucz basowy",
      uk: "Нотопис • Басовий ключ",
      ur: "نوٹیشن • باس کلیف"
    },
    "notation-alto": {
      en: "Notation • Alto Clef",
      fr: "Notation • Clé d’Ut 3",
      es: "Notación • Clave de do en 3.ª",
      pl: "Nuty • Klucz altowy",
      uk: "Нотопис • Альтовий ключ",
      ur: "نوٹیشن • آلٹو کلیف"
    },
    "notation-mixed": {
      en: "Notation • Clef Mix",
      fr: "Notation • Mix de clés",
      es: "Notación • Mezcla de claves",
      pl: "Nuty • Miks kluczy",
      uk: "Нотопис • Мікс ключів",
      ur: "نوٹیشن • کلیف مکس"
    },
    "notation-grand": {
      en: "Notation • Grand Staff",
      fr: "Notation • Grand portée",
      es: "Notación • Sistema de piano",
      pl: "Nuty • System fortepianowy",
      uk: "Нотопис • Подвійний стан",
      ur: "نوٹیشن • گرینڈ اسٹاف"
    },
    "notation-chords": {
      en: "Notation • Chord Reading",
      fr: "Notation • Lire des accords",
      es: "Notación • Leer acordes",
      pl: "Nuty • Czytanie akordów",
      uk: "Нотопис • Читання акордів",
      ur: "نوٹیشن • کارڈز پڑھنا"
    }
  },
  defaultMixTitles: {
    "mix_warmup": {
      de: "Morgen-Warmup",
      en: "Morning Warmup",
      fr: "Éveil du matin",
      es: "Despertar matinal",
      pl: "Poranna rozgrzewka",
      uk: "Ранковий старт",
      ur: "صبح کا وارم اپ"
    },
    "mix_intervals": {
      de: "Intervall-Fokus",
      en: "Interval Sprint",
      fr: "Sprint Intervalles",
      es: "Sprint de intervalos",
      pl: "Trening interwałów",
      uk: "Інтервальний спринт",
      ur: "انٹرول اسپرنٹ"
    },
    "mix_groove": {
      de: "Timing & Blindflug",
      en: "Timing & Blind Tap",
      fr: "Timing & Mode aveugle",
      es: "Timing y modo a ciegas",
      pl: "Timing i tryb ślepy",
      uk: "Таймінг і сліпий режим",
      ur: "ٹائمنگ اور بلائنڈ ٹیپ"
    }
  },
  keyNames: {
    "C": {
      en: "C Major",
      fr: "Do majeur",
      es: "Do mayor",
      pl: "C-dur",
      uk: "До мажор",
      ur: "C میجر"
    },
    "G": {
      en: "G Major",
      fr: "Sol majeur",
      es: "Sol mayor",
      pl: "G-dur",
      uk: "Соль мажор",
      ur: "G میجر"
    },
    "D": {
      en: "D Major",
      fr: "Ré majeur",
      es: "Re mayor",
      pl: "D-dur",
      uk: "Ре мажор",
      ur: "D میجر"
    },
    "F": {
      en: "F Major",
      fr: "Fa majeur",
      es: "Fa mayor",
      pl: "F-dur",
      uk: "Фа мажор",
      ur: "F میجر"
    },
    "Bb": {
      en: "Bb Major",
      fr: "Si♭ majeur",
      es: "Si♭ mayor",
      pl: "B-dur",
      uk: "Сі♭ мажор",
      ur: "B♭ میجر"
    },
    "Eb": {
      en: "Eb Major",
      fr: "Mi♭ majeur",
      es: "Mi♭ mayor",
      pl: "Es-dur",
      uk: "Мі♭ мажор",
      ur: "E♭ میجر"
    },
    "Ab": {
      en: "Ab Major",
      fr: "La♭ majeur",
      es: "La♭ mayor",
      pl: "As-dur",
      uk: "Ля♭ мажор",
      ur: "A♭ میجر"
    },
    "A": {
      en: "A Major",
      fr: "La majeur",
      es: "La mayor",
      pl: "A-dur",
      uk: "Ля мажор",
      ur: "A میجر"
    },
    "E": {
      en: "E Major",
      fr: "Mi majeur",
      es: "Mi mayor",
      pl: "E-dur",
      uk: "Мі мажор",
      ur: "E میجر"
    },
    "B": {
      en: "B Major",
      fr: "Si majeur",
      es: "Si mayor",
      pl: "H-dur",
      uk: "Сі мажор",
      ur: "B میجر"
    },
    "F#": {
      en: "F# Major",
      fr: "Fa♯ majeur",
      es: "Fa♯ mayor",
      pl: "Fis-dur",
      uk: "Фа♯ мажор",
      ur: "F♯ میجر"
    },
    "Db": {
      en: "Db Major",
      fr: "Ré♭ majeur",
      es: "Re♭ mayor",
      pl: "Des-dur",
      uk: "Ре♭ мажор",
      ur: "D♭ میجر"
    }
  },
  minorKeyNames: {
    "C": {
      en: "C minor",
      fr: "Do mineur",
      es: "Do menor",
      pl: "c-moll",
      uk: "До мінор",
      ur: "C مائنر"
    },
    "G": {
      en: "G minor",
      fr: "Sol mineur",
      es: "Sol menor",
      pl: "g-moll",
      uk: "Соль мінор",
      ur: "G مائنر"
    },
    "D": {
      en: "D minor",
      fr: "Ré mineur",
      es: "Re menor",
      pl: "d-moll",
      uk: "Ре мінор",
      ur: "D مائنر"
    },
    "F": {
      en: "F minor",
      fr: "Fa mineur",
      es: "Fa menor",
      pl: "f-moll",
      uk: "Фа мінор",
      ur: "F مائنر"
    },
    "Bb": {
      en: "Bb minor",
      fr: "Si♭ mineur",
      es: "Si♭ menor",
      pl: "b-moll",
      uk: "Сі♭ мінор",
      ur: "B♭ مائنر"
    },
    "Eb": {
      en: "Eb minor",
      fr: "Mi♭ mineur",
      es: "Mi♭ menor",
      pl: "es-moll",
      uk: "Мі♭ мінор",
      ur: "E♭ مائنر"
    },
    "Ab": {
      en: "G# minor",
      fr: "Sol♯ mineur",
      es: "Sol♯ menor",
      pl: "gis-moll",
      uk: "Соль♯ мінор",
      ur: "G♯ مائنر"
    },
    "A": {
      en: "A minor",
      fr: "La mineur",
      es: "La menor",
      pl: "a-moll",
      uk: "Ля мінор",
      ur: "A مائنر"
    },
    "E": {
      en: "E minor",
      fr: "Mi mineur",
      es: "Mi menor",
      pl: "e-moll",
      uk: "Мі мінор",
      ur: "E مائنر"
    },
    "B": {
      en: "B minor",
      fr: "Si mineur",
      es: "Si menor",
      pl: "h-moll",
      uk: "Сі мінор",
      ur: "B مائنر"
    },
    "F#": {
      en: "F# minor",
      fr: "Fa♯ mineur",
      es: "Fa♯ menor",
      pl: "fis-moll",
      uk: "Фа♯ мінор",
      ur: "F♯ مائنر"
    },
    "Db": {
      en: "C# minor",
      fr: "Do♯ mineur",
      es: "Do♯ menor",
      pl: "cis-moll",
      uk: "До♯ мінор",
      ur: "C♯ مائنر"
    }
  },
  degrees: {
    "I": {
      en: { label: "Tonic", short: "Tonic" },
      fr: { label: "Tonique", short: "Tonique" },
      es: { label: "Tónica", short: "Tónica" },
      pl: { label: "Tonika", short: "Tonika" },
      uk: { label: "Тоніка", short: "Тоніка" },
      ur: { label: "ٹانک (I)", short: "ٹانک" }
    },
    "I7": {
      en: { label: "Tonic Dom. 7th", short: "I7" },
      fr: { label: "Tonique 7e de dom.", short: "I7" },
      es: { label: "Tónica con 7.ª de dom.", short: "I7" },
      pl: { label: "Tonika z septyma m.", short: "I7" },
      uk: { label: "Тоніка з мал. 7", short: "I7" },
      ur: { label: "ٹانک ڈومیننٹ سیونتھ", short: "I7" }
    },
    "Imaj7": {
      en: { label: "Tonic Major 7th", short: "Imaj7" },
      fr: { label: "Tonique maj. 7", short: "Imaj7" },
      es: { label: "Tónica maj. 7", short: "Imaj7" },
      pl: { label: "Tonika maj7", short: "Imaj7" },
      uk: { label: "Тонічний майор-7", short: "Imaj7" },
      ur: { label: "ٹانک میجر سیونتھ", short: "Imaj7" }
    },
    "ii": {
      en: { label: "Supertonic (minor)", short: "ii (Min)" },
      fr: { label: "Sus-tonique (mineur)", short: "ii (Min)" },
      es: { label: "Supertónica (menor)", short: "ii (men.)" },
      pl: { label: "Supertonika (moll)", short: "ii (moll)" },
      uk: { label: "Супертоніка (мінор)", short: "ii (мін)" },
      ur: { label: "سپرٹانک (مائنر ii)", short: "ii (مائنر)" }
    },
    "iii": {
      en: { label: "Mediant (minor)", short: "iii (Min)" },
      fr: { label: "Médiante (mineur)", short: "iii (Min)" },
      es: { label: "Mediante (menor)", short: "iii (men.)" },
      pl: { label: "Medianta (moll)", short: "iii (moll)" },
      uk: { label: "Медіанта (мінор)", short: "iii (мін)" },
      ur: { label: "میڈینٹ (مائنر iii)", short: "iii (مائنر)" }
    },
    "III7": {
      en: { label: "Secondary Dom. III7", short: "III7" },
      fr: { label: "Dom. secondaire III7", short: "III7" },
      es: { label: "Dom. secundaria III7", short: "III7" },
      pl: { label: "Dom. wtrącona III7", short: "III7" },
      uk: { label: "Побічна домін. III7", short: "III7" },
      ur: { label: "سیکنڈری ڈومیننٹ III7", short: "III7" }
    },
    "IV": {
      en: { label: "Subdominant", short: "Subdom." },
      fr: { label: "Sous-dominante", short: "Sous-dom." },
      es: { label: "Subdominante", short: "Subdom." },
      pl: { label: "Subdominanta", short: "Subdom." },
      uk: { label: "Субдомінанта", short: "Субдом." },
      ur: { label: "سب ڈومیننٹ (IV)", short: "سب ڈوم۔" }
    },
    "IV7": {
      en: { label: "Subdominant Dom. 7", short: "IV7" },
      fr: { label: "Sous-dominante 7", short: "IV7" },
      es: { label: "Subdominante 7", short: "IV7" },
      pl: { label: "Subdominanta 7", short: "IV7" },
      uk: { label: "Субдомінанта 7", short: "IV7" },
      ur: { label: "سب ڈومیننٹ 7", short: "IV7" }
    },
    "iv": {
      en: { label: "Minor Subdominant", short: "iv (Min)" },
      fr: { label: "Sous-dominante min.", short: "iv (Min)" },
      es: { label: "Subdominante menor", short: "iv (men.)" },
      pl: { label: "Subdominanta molowa", short: "iv (moll)" },
      uk: { label: "Мінорна субдом.", short: "iv (мін)" },
      ur: { label: "مائنر سب ڈومیننٹ (iv)", short: "iv (مائنر)" }
    },
    "V": {
      en: { label: "Dominant", short: "Dominant" },
      fr: { label: "Dominante", short: "Dominante" },
      es: { label: "Dominante", short: "Dominante" },
      pl: { label: "Dominanta", short: "Dominanta" },
      uk: { label: "Домінанта", short: "Домінанта" },
      ur: { label: "ڈومیننٹ (V)", short: "ڈومیننٹ" }
    },
    "V7": {
      en: { label: "Dominant 7th", short: "Dom. 7" },
      fr: { label: "Septième de dom.", short: "Dom. 7" },
      es: { label: "Séptima de dominante", short: "Dom. 7" },
      pl: { label: "Dominanta septymowa", short: "Dom. 7" },
      uk: { label: "Домінантсептакорд", short: "Домін. 7" },
      ur: { label: "ڈومیننٹ سیونتھ (V7)", short: "ڈوم۔ 7" }
    },
    "Vsus4": {
      en: { label: "Dominant Sus4", short: "Vsus4" },
      fr: { label: "Dominante sus4", short: "Vsus4" },
      es: { label: "Dominante sus4", short: "Vsus4" },
      pl: { label: "Dominanta sus4", short: "Vsus4" },
      uk: { label: "Домінанта sus4", short: "Vsus4" },
      ur: { label: "ڈومیننٹ Sus4", short: "Vsus4" }
    },
    "vi": {
      en: { label: "Relative Minor (vi)", short: "vi (Min)" },
      fr: { label: "Relatif mineur (vi)", short: "vi (Min)" },
      es: { label: "Relativo menor (vi)", short: "vi (men.)" },
      pl: { label: "Moll równoległy (vi)", short: "vi (moll)" },
      uk: { label: "Паралельний мінор (vi)", short: "vi (мін)" },
      ur: { label: "پیرالل مائنر (vi)", short: "vi (مائنر)" }
    },
    "bVI": {
      en: { label: "Modal Borrowed bVI", short: "bVI" },
      fr: { label: "Emprunt modal bVI", short: "bVI" },
      es: { label: "Préstamo modal bVI", short: "bVI" },
      pl: { label: "Modalny bVI", short: "bVI" },
      uk: { label: "Модальний bVI", short: "bVI" },
      ur: { label: "مائنر باروڈ bVI", short: "bVI" }
    },
    "bVII": {
      en: { label: "Subtonic bVII", short: "bVII" },
      fr: { label: "Sous-tonique bVII", short: "bVII" },
      es: { label: "Subtónica bVII", short: "bVII" },
      pl: { label: "Naturalny bVII", short: "bVII" },
      uk: { label: "Натуральний bVII", short: "bVII" },
      ur: { label: "سب ٹانک bVII", short: "bVII" }
    },
    "V/V": {
      en: { label: "Secondary Dominant", short: "V/V" },
      fr: { label: "Dominante secondaire", short: "V/V" },
      es: { label: "Dominante secundaria", short: "V/V" },
      pl: { label: "Dominanta wtrącona", short: "V/V" },
      uk: { label: "Побічна домінанта", short: "V/V" },
      ur: { label: "سیکنڈری ڈومیننٹ V/V", short: "V/V" }
    },
    "bII7": {
      en: { label: "Tritone Substitution", short: "bII7 (Sub)" },
      fr: { label: "Substitution tritonique", short: "bII7 (Sub)" },
      es: { label: "Sustitución tritonal", short: "bII7 (sust.)" },
      pl: { label: "Substytut trytonowy", short: "bII7 (Sub.)" },
      uk: { label: "Тритонова заміна", short: "bII7 (Зам.)" },
      ur: { label: "ٹرائی ٹون متبادل bII7", short: "bII7 (سب)" }
    },
    "i": {
      en: { label: "Minor Tonic", short: "Tonic" },
      fr: { label: "Tonique mineure", short: "Tonique" },
      es: { label: "Tónica menor", short: "Tónica" },
      pl: { label: "Tonika molowa", short: "Tonika" },
      uk: { label: "Мінорна тоніка", short: "Тоніка" },
      ur: { label: "مائنر ٹانک", short: "ٹانک" }
    },
    "iio": {
      en: { label: "Diminished ii", short: "ii° (dim)" },
      fr: { label: "ii diminué", short: "ii° (dim.)" },
      es: { label: "ii disminuido", short: "ii° (dism.)" },
      pl: { label: "Zmniejszony ii", short: "ii° (zmn.)" },
      uk: { label: "Зменшений ii", short: "ii° (зм.)" },
      ur: { label: "ڈمنشڈ ii", short: "ii° (ڈمنشڈ)" }
    },
    "ii7b5": {
      en: { label: "Half-Diminished ii", short: "iiø7" },
      fr: { label: "ii demi-diminué", short: "iiø7" },
      es: { label: "ii semidisminuido", short: "iiø7" },
      pl: { label: "Półzmniejszony ii", short: "iiø7" },
      uk: { label: "Напівзменшений ii", short: "iiø7" },
      ur: { label: "ہاف ڈمنشڈ ii", short: "iiø7" }
    },
    "III": {
      en: { label: "Relative Major", short: "Rel. Major" },
      fr: { label: "Relatif majeur", short: "Rel. maj." },
      es: { label: "Relativo mayor", short: "Rel. may." },
      pl: { label: "Równoległa durowa", short: "Równol. dur" },
      uk: { label: "Паралельний мажор", short: "Пар. мажор" },
      ur: { label: "ریلیٹو میجر", short: "ریلیٹو میجر" }
    },
    "v": {
      en: { label: "Minor Dominant", short: "v (Min)" },
      fr: { label: "Dominante mineure", short: "v (min.)" },
      es: { label: "Dominante menor", short: "v (men.)" },
      pl: { label: "Dominanta molowa", short: "v (mol)" },
      uk: { label: "Мінорна домінанта", short: "v (мін.)" },
      ur: { label: "مائنر ڈومیننٹ", short: "v (مائنر)" }
    },
    "VI": {
      en: { label: "Submediant VI (Major)", short: "VI" },
      fr: { label: "Degré VI (majeur)", short: "VI" },
      es: { label: "Grado VI (mayor)", short: "VI" },
      pl: { label: "Stopień VI (dur)", short: "VI" },
      uk: { label: "VI ступінь (мажор)", short: "VI" },
      ur: { label: "درجہ VI (میجر)", short: "VI" }
    },
    "VII": {
      en: { label: "Subtonic VII (Major)", short: "VII" },
      fr: { label: "Degré VII (majeur)", short: "VII" },
      es: { label: "Grado VII (mayor)", short: "VII" },
      pl: { label: "Stopień VII (dur)", short: "VII" },
      uk: { label: "VII ступінь (мажор)", short: "VII" },
      ur: { label: "درجہ VII (میجر)", short: "VII" }
    },
    "N6": {
      en: { label: "Neapolitan (♭II⁶)", short: "N6" },
      fr: { label: "Napolitaine (♭II⁶)", short: "N6" },
      es: { label: "Napolitana (♭II⁶)", short: "N6" },
      pl: { label: "Neapolitański (♭II⁶)", short: "N6" },
      uk: { label: "Неаполітанський (♭II⁶)", short: "N6" },
      ur: { label: "نیپولیٹن (♭II⁶)", short: "N6" }
    }
  },
  intervals: {
    "P1": {
      en: { label: "Perfect Unison", short: "Unison" },
      fr: { label: "Unisson juste", short: "Unisson" },
      es: { label: "Unísono justo", short: "Unísono" },
      pl: { label: "Pryma czysta", short: "Pryma" },
      uk: { label: "Чиста прима", short: "Прима" },
      ur: { label: "پرفیکٹ یونی سن (ہم سُر)", short: "یونی سن" }
    },
    "m2": {
      en: { label: "Minor 2nd", short: "min 2nd" },
      fr: { label: "Seconde mineure", short: "2de min." },
      es: { label: "Segunda menor", short: "2.ª men." },
      pl: { label: "Sekunda mała", short: "2m" },
      uk: { label: "Мала секунда", short: "м. 2" },
      ur: { label: "مائنر سیکنڈ (کومل رے)", short: "مائنر 2nd" }
    },
    "M2": {
      en: { label: "Major 2nd", short: "Maj 2nd" },
      fr: { label: "Seconde majeure", short: "2de maj." },
      es: { label: "Segunda mayor", short: "2.ª may." },
      pl: { label: "Sekunda wielka", short: "2w" },
      uk: { label: "Велика секунда", short: "в. 2" },
      ur: { label: "میجر سیکنڈ (شدھ رے)", short: "میجر 2nd" }
    },
    "m3": {
      en: { label: "Minor 3rd", short: "min 3rd" },
      fr: { label: "Tierce mineure", short: "3ce min." },
      es: { label: "Tercera menor", short: "3.ª men." },
      pl: { label: "Tercja mała", short: "3m" },
      uk: { label: "Мала терція", short: "м. 3" },
      ur: { label: "مائنر تھرڈ (کومل گا)", short: "مائنر 3rd" }
    },
    "M3": {
      en: { label: "Major 3rd", short: "Maj 3rd" },
      fr: { label: "Tierce majeure", short: "3ce maj." },
      es: { label: "Tercera mayor", short: "3.ª may." },
      pl: { label: "Tercja wielka", short: "3w" },
      uk: { label: "Велика терція", short: "в. 3" },
      ur: { label: "میجر تھرڈ (شدھ گا)", short: "میجر 3rd" }
    },
    "P4": {
      en: { label: "Perfect 4th", short: "Perf. 4th" },
      fr: { label: "Quarte juste", short: "Quarte j." },
      es: { label: "Cuarta justa", short: "4.ª j." },
      pl: { label: "Kwarta czysta", short: "Kwarta" },
      uk: { label: "Чиста кварта", short: "Кварта" },
      ur: { label: "پرفیکٹ فورتھ (شدھ ما)", short: "پرف۔ 4th" }
    },
    "TT": {
      en: { label: "Tritone", short: "Tritone" },
      fr: { label: "Triton", short: "Triton" },
      es: { label: "Tritono", short: "Tritono" },
      pl: { label: "Tryton", short: "Tryton" },
      uk: { label: "Тритон", short: "Тритон" },
      ur: { label: "ٹرائی ٹون (تیور ما)", short: "ٹرائی ٹون" }
    },
    "P5": {
      en: { label: "Perfect 5th", short: "Perf. 5th" },
      fr: { label: "Quinte juste", short: "Quinte j." },
      es: { label: "Quinta justa", short: "5.ª j." },
      pl: { label: "Kwinta czysta", short: "Kwinta" },
      uk: { label: "Чиста квінта", short: "Квінта" },
      ur: { label: "پرفیکٹ ففتھ (پا)", short: "پرف۔ 5th" }
    },
    "m6": {
      en: { label: "Minor 6th", short: "min 6th" },
      fr: { label: "Sixte mineure", short: "6te min." },
      es: { label: "Sexta menor", short: "6.ª men." },
      pl: { label: "Seksta mała", short: "6m" },
      uk: { label: "Мала секста", short: "м. 6" },
      ur: { label: "مائنر سکستھ (کومل دھا)", short: "مائنر 6th" }
    },
    "M6": {
      en: { label: "Major 6th", short: "Maj 6th" },
      fr: { label: "Sixte majeure", short: "6te maj." },
      es: { label: "Sexta mayor", short: "6.ª may." },
      pl: { label: "Seksta wielka", short: "6w" },
      uk: { label: "Велика секста", short: "в. 6" },
      ur: { label: "میجر سکستھ (شدھ دھا)", short: "میجر 6th" }
    },
    "m7": {
      en: { label: "Minor 7th", short: "min 7th" },
      fr: { label: "Septième mineure", short: "7e min." },
      es: { label: "Séptima menor", short: "7.ª men." },
      pl: { label: "Septyma mała", short: "7m" },
      uk: { label: "Мала септима", short: "м. 7" },
      ur: { label: "مائنر سیونتھ (کومل نی)", short: "مائنر 7th" }
    },
    "M7": {
      en: { label: "Major 7th", short: "Maj 7th" },
      fr: { label: "Septième majeure", short: "7e maj." },
      es: { label: "Séptima mayor", short: "7.ª may." },
      pl: { label: "Septyma wielka", short: "7w" },
      uk: { label: "Велика септима", short: "в. 7" },
      ur: { label: "میجر سیونتھ (شدھ نی)", short: "میجر 7th" }
    },
    "P8": {
      en: { label: "Perfect Octave", short: "Octave" },
      fr: { label: "Octave juste", short: "Octave" },
      es: { label: "Octava justa", short: "Octava" },
      pl: { label: "Oktawa czysta", short: "Oktawa" },
      uk: { label: "Чиста октава", short: "Октава" },
      ur: { label: "پرفیکٹ آکٹیو (تار سپتک)", short: "آکٹیو" }
    },
    "m9": {
      en: { label: "Minor 9th", short: "min 9th" },
      fr: { label: "Neuvième mineure", short: "9e min." },
      es: { label: "Novena menor", short: "9.ª men." },
      pl: { label: "Nona mała", short: "9m" },
      uk: { label: "Мала нона", short: "м. 9" },
      ur: { label: "مائنر نائنتھ", short: "مائنر 9th" }
    },
    "M9": {
      en: { label: "Major 9th", short: "Maj 9th" },
      fr: { label: "Neuvième majeure", short: "9e maj." },
      es: { label: "Novena mayor", short: "9.ª may." },
      pl: { label: "Nona wielka", short: "9w" },
      uk: { label: "Велика нона", short: "в. 9" },
      ur: { label: "میجر نائنتھ", short: "میجر 9th" }
    }
  },
  chords: {
    "7": {
      en: { symbol: "7", label: "Dominant 7th (1–3–5–♭7)", short: "Dom. 7" },
      fr: { symbol: "7", label: "Septième de dominante (1–3–5–♭7)", short: "Dom. 7" },
      es: { symbol: "7", label: "Séptima de dominante (1–3–5–♭7)", short: "Dom. 7" },
      pl: { symbol: "7", label: "Dominanta septymowa (1–3–5–♭7)", short: "Dom. 7" },
      uk: { symbol: "7", label: "Домінантсептакорд (1–3–5–♭7)", short: "Домін. 7" },
      ur: { symbol: "7", label: "ڈومیننٹ سیونتھ (1–3–5–♭7)", short: "ڈوم۔ 7" }
    },
    "maj": {
      en: { symbol: "maj", label: "Major Triad (1–3–5)", short: "Major" },
      fr: { symbol: "maj", label: "Triade majeure (1–3–5)", short: "Majeur" },
      es: { symbol: "maj", label: "Tríada mayor (1–3–5)", short: "Mayor" },
      pl: { symbol: "maj", label: "Trójdźwięk durowy (1–3–5)", short: "Dur" },
      uk: { symbol: "maj", label: "Мажорний тризвук (1–3–5)", short: "Мажор" },
      ur: { symbol: "maj", label: "میجر ٹرائڈ (1–3–5)", short: "میجر" }
    },
    "min": {
      en: { symbol: "m", label: "Minor Triad (1–♭3–5)", short: "Minor" },
      fr: { symbol: "m", label: "Triade mineure (1–♭3–5)", short: "Mineur" },
      es: { symbol: "m", label: "Tríada menor (1–♭3–5)", short: "Menor" },
      pl: { symbol: "m", label: "Trójdźwięk molowy (1–♭3–5)", short: "Moll" },
      uk: { symbol: "m", label: "Мінорний тризвук (1–♭3–5)", short: "Мінор" },
      ur: { symbol: "m", label: "مائنر ٹرائڈ (1–♭3–5)", short: "مائنر" }
    },
    "dim": {
      en: { symbol: "dim", label: "Diminished Triad (1–♭3–♭5)", short: "Diminished" },
      fr: { symbol: "dim", label: "Triade diminuée (1–♭3–♭5)", short: "Diminué" },
      es: { symbol: "dim", label: "Tríada disminuida (1–♭3–♭5)", short: "Disminuido" },
      pl: { symbol: "dim", label: "Trójdźwięk zmniejszony (1–♭3–♭5)", short: "Zmniejsz." },
      uk: { symbol: "dim", label: "Зменшений тризвук (1–♭3–♭5)", short: "Зменш." },
      ur: { symbol: "dim", label: "ڈِمنشڈ ٹرائڈ (1–♭3–♭5)", short: "ڈِمنشڈ" }
    },
    "aug": {
      en: { symbol: "aug", label: "Augmented Triad (1–3–♯5)", short: "Augmented" },
      fr: { symbol: "aug", label: "Triade augmentée (1–3–♯5)", short: "Augmenté" },
      es: { symbol: "aug", label: "Tríada aumentada (1–3–♯5)", short: "Aumentado" },
      pl: { symbol: "aug", label: "Trójdźwięk zwiększony (1–3–♯5)", short: "Zwiększ." },
      uk: { symbol: "aug", label: "Збільшений тризвук (1–3–♯5)", short: "Збільш." },
      ur: { symbol: "aug", label: "آگمینٹڈ ٹرائڈ (1–3–♯5)", short: "آگمینٹڈ" }
    },
    "sus4": {
      en: { symbol: "sus4", label: "Suspended 4th (1–4–5)", short: "Sus 4" },
      fr: { symbol: "sus4", label: "Accord sus4 (1–4–5)", short: "Sus 4" },
      es: { symbol: "sus4", label: "Acorde sus4 (1–4–5)", short: "Sus 4" },
      pl: { symbol: "sus4", label: "Akord zawieszony sus4 (1–4–5)", short: "sus4" },
      uk: { symbol: "sus4", label: "Затриманий акорд sus4 (1–4–5)", short: "sus4" },
      ur: { symbol: "sus4", label: "سسپینڈڈ فورتھ (1–4–5)", short: "Sus 4" }
    },
    "maj7": {
      en: { symbol: "maj7", label: "Major 7th (1–3–5–7)", short: "Major 7" },
      fr: { symbol: "maj7", label: "Septième majeure (1–3–5–7)", short: "Majeur 7" },
      es: { symbol: "maj7", label: "Séptima mayor (1–3–5–7)", short: "Mayor 7" },
      pl: { symbol: "maj7", label: "Wielki septymowy durowy (1–3–5–7)", short: "Maj7" },
      uk: { symbol: "maj7", label: "Великий мажорний септ. (1–3–5–7)", short: "Маж. 7" },
      ur: { symbol: "maj7", label: "میجر سیونتھ (1–3–5–7)", short: "میجر 7" }
    },
    "m7": {
      en: { symbol: "m7", label: "Minor 7th (1–♭3–5–♭7)", short: "Minor 7" },
      fr: { symbol: "m7", label: "Mineur septième (1–♭3–5–♭7)", short: "Mineur 7" },
      es: { symbol: "m7", label: "Menor séptima (1–♭3–5–♭7)", short: "Menor 7" },
      pl: { symbol: "m7", label: "Mały septymowy molowy (1–♭3–5–♭7)", short: "Moll 7" },
      uk: { symbol: "m7", label: "Малий мінорний септ. (1–♭3–5–♭7)", short: "Мін. 7" },
      ur: { symbol: "m7", label: "مائنر سیونتھ (1–♭3–5–♭7)", short: "مائنر 7" }
    },
    "sus2": {
      en: { symbol: "sus2", label: "Suspended 2nd (1–2–5)", short: "Sus 2" },
      fr: { symbol: "sus2", label: "Accord sus2 (1–2–5)", short: "Sus 2" },
      es: { symbol: "sus2", label: "Acorde sus2 (1–2–5)", short: "Sus 2" },
      pl: { symbol: "sus2", label: "Akord zawieszony sus2 (1–2–5)", short: "sus2" },
      uk: { symbol: "sus2", label: "Затриманий акорд sus2 (1–2–5)", short: "sus2" },
      ur: { symbol: "sus2", label: "سسپینڈڈ سیکنڈ (1–2–5)", short: "Sus 2" }
    },
    "m7b5": {
      en: { symbol: "m7♭5", label: "Half-Diminished (1–♭3–♭5–♭7)", short: "Half-Dim" },
      fr: { symbol: "m7♭5", label: "Semi-diminué (1–♭3–♭5–♭7)", short: "Semi-dim." },
      es: { symbol: "m7♭5", label: "Semidisminuido (1–♭3–♭5–♭7)", short: "Semidism." },
      pl: { symbol: "m7♭5", label: "Półzmniejszony (1–♭3–♭5–♭7)", short: "Półzmn." },
      uk: { symbol: "m7♭5", label: "Напівзменшений септ. (1–♭3–♭5–♭7)", short: "Напівзм." },
      ur: { symbol: "m7♭5", label: "ہاف ڈِمنشڈ (1–♭3–♭5–♭7)", short: "ہاف ڈِم" }
    },
    "dim7": {
      en: { symbol: "°7", label: "Diminished 7th (1–♭3–♭5–♭♭7)", short: "Dim 7" },
      fr: { symbol: "°7", label: "Septième diminuée (1–♭3–♭5–♭♭7)", short: "Dim. 7" },
      es: { symbol: "°7", label: "Séptima disminuida (1–♭3–♭5–♭♭7)", short: "Dism. 7" },
      pl: { symbol: "°7", label: "Zmniejszony septymowy (1–♭3–♭5–♭♭7)", short: "Zmn. 7" },
      uk: { symbol: "°7", label: "Зменшений септакорд (1–♭3–♭5–♭♭7)", short: "Зменш. 7" },
      ur: { symbol: "°7", label: "ڈِمنشڈ سیونتھ (1–♭3–♭5–♭♭7)", short: "ڈِم 7" }
    },
    "mMaj7": {
      en: { symbol: "m(maj7)", label: "Minor Major 7th (1–♭3–5–7)", short: "Min-Maj7" },
      fr: { symbol: "m(maj7)", label: "Mineur septième majeure (1–♭3–5–7)", short: "Min-Maj7" },
      es: { symbol: "m(maj7)", label: "Menor con séptima mayor (1–♭3–5–7)", short: "Men-Maj7" },
      pl: { symbol: "m(maj7)", label: "Molowo-wielki septymowy (1–♭3–5–7)", short: "Moll-maj7" },
      uk: { symbol: "m(maj7)", label: "Великий мінорний септ. (1–♭3–5–7)", short: "Мін-маж7" },
      ur: { symbol: "m(maj7)", label: "مائنر میجر سیونتھ (1–♭3–5–7)", short: "Min-Maj7" }
    },
    "maj9": {
      en: { symbol: "maj9", label: "Major 9th (1–3–5–7–9)", short: "Major 9" },
      fr: { symbol: "maj9", label: "Neuvième majeure (1–3–5–7–9)", short: "Majeur 9" },
      es: { symbol: "maj9", label: "Novena mayor (1–3–5–7–9)", short: "Mayor 9" },
      pl: { symbol: "maj9", label: "Wielki nonowy durowy (1–3–5–7–9)", short: "Maj9" },
      uk: { symbol: "maj9", label: "Великий мажорний нон. (1–3–5–7–9)", short: "Маж. 9" },
      ur: { symbol: "maj9", label: "میجر نائنتھ (1–3–5–7–9)", short: "میجر 9" }
    },
    "7b9": {
      en: { symbol: "7♭9", label: "Dominant 7♭9 (1–3–5–♭7–♭9)", short: "Dom. 7♭9" },
      fr: { symbol: "7♭9", label: "Dominante 7♭9 (1–3–5–♭7–♭9)", short: "Dom. 7♭9" },
      es: { symbol: "7♭9", label: "Dominante 7♭9 (1–3–5–♭7–♭9)", short: "Dom. 7♭9" },
      pl: { symbol: "7♭9", label: "Dominanta 7♭9 (1–3–5–♭7–♭9)", short: "Dom. 7♭9" },
      uk: { symbol: "7♭9", label: "Домінантсепт. 7♭9 (1–3–5–♭7–♭9)", short: "Домін. 7♭9" },
      ur: { symbol: "7♭9", label: "ڈومیننٹ 7♭9 (1–3–5–♭7–♭9)", short: "ڈوم۔ 7♭9" }
    },
    "7s9": {
      en: { symbol: "7♯9", label: "Dominant 7♯9 (1–3–5–♭7–♯9)", short: "Dom. 7♯9" },
      fr: { symbol: "7♯9", label: "Dominante 7♯9 (1–3–5–♭7–♯9)", short: "Dom. 7♯9" },
      es: { symbol: "7♯9", label: "Dominante 7♯9 (1–3–5–♭7–♯9)", short: "Dom. 7♯9" },
      pl: { symbol: "7♯9", label: "Dominanta 7♯9 (1–3–5–♭7–♯9)", short: "Dom. 7♯9" },
      uk: { symbol: "7♯9", label: "Домінантсепт. 7♯9 (1–3–5–♭7–♯9)", short: "Домін. 7♯9" },
      ur: { symbol: "7♯9", label: "ڈومیننٹ 7♯9 (1–3–5–♭7–♯9)", short: "ڈوم۔ 7♯9" }
    }
  },
  chordInversions: {
    "inv0": {
      en: { symbol: "Bass: 1", label: "Root Position (Bass: Root)", short: "Root Position" },
      fr: { symbol: "Basse : 1", label: "État fondamental (Basse : Fondamentale)", short: "État fond." },
      es: { symbol: "Bajo: 1", label: "Estado fundamental (bajo: fundamental)", short: "Estado fund." },
      pl: { symbol: "Bas: 1", label: "Postać zasadnicza (Bas: pryma)", short: "Zasadnicza" },
      uk: { symbol: "Бас: 1", label: "Основний вид (Бас: прима)", short: "Основний" },
      ur: { symbol: "Bass: 1", label: "بنیادی حالت (باس: جڑ)", short: "بنیادی حالت" }
    },
    "inv1": {
      en: { symbol: "Bass: 3", label: "1st Inversion (Bass: 3rd)", short: "1st Inversion" },
      fr: { symbol: "Basse : 3", label: "1er renversement (Basse : Tierce)", short: "1er renv." },
      es: { symbol: "Bajo: 3", label: "1.ª inversión (bajo: tercera)", short: "1.ª inv." },
      pl: { symbol: "Bas: 3", label: "1. przewrót (Bas: tercja)", short: "1. przewrót" },
      uk: { symbol: "Бас: 3", label: "1-ше обернення (Бас: терція)", short: "1-ше оберн." },
      ur: { symbol: "Bass: 3", label: "پہلا اُلٹاؤ (باس: تیسرا)", short: "پہلا اُلٹاؤ" }
    },
    "inv2": {
      en: { symbol: "Bass: 5", label: "2nd Inversion (Bass: 5th)", short: "2nd Inversion" },
      fr: { symbol: "Basse : 5", label: "2e renversement (Basse : Quinte)", short: "2e renv." },
      es: { symbol: "Bajo: 5", label: "2.ª inversión (bajo: quinta)", short: "2.ª inv." },
      pl: { symbol: "Bas: 5", label: "2. przewrót (Bas: kwinta)", short: "2. przewrót" },
      uk: { symbol: "Бас: 5", label: "2-ге обернення (Бас: квінта)", short: "2-ге оберн." },
      ur: { symbol: "Bass: 5", label: "دوسرا اُلٹاؤ (باس: پانچواں)", short: "دوسرا اُلٹاؤ" }
    },
    "inv3": {
      en: { symbol: "Bass: 7", label: "3rd Inversion (Bass: 7th)", short: "3rd Inversion" },
      fr: { symbol: "Basse : 7", label: "3e renversement (Basse : Septième)", short: "3e renv." },
      es: { symbol: "Bajo: 7", label: "3.ª inversión (bajo: séptima)", short: "3.ª inv." },
      pl: { symbol: "Bas: 7", label: "3. przewrót (Bas: septyma)", short: "3. przewrót" },
      uk: { symbol: "Бас: 7", label: "3-тє обернення (Бас: септима)", short: "3-тє оберн." },
      ur: { symbol: "Bass: 7", label: "تیسرا اُلٹاؤ (باس: ساتواں)", short: "تیسرا اُلٹاؤ" }
    }
  },
  solfegeStepsLabel: {
    "Do_low": {
      en: "Root (Do)",
      fr: "Fondamentale (Do)",
      es: "Fundamental (Do)",
      pl: "Pryma toniki (Do)",
      uk: "Основний тон (Do)",
      ur: "بنیادی سُر (Do / سا)"
    },
    "Re": {
      en: "2nd Degree (Re → Do)",
      fr: "2e degré (Re → Do)",
      es: "2.º grado (Re → Do)",
      pl: "II stopień (Re → Do)",
      uk: "II ступінь (Re → Do)",
      ur: "دوسرا درجہ (Re → Do)"
    },
    "Mi": {
      en: "3rd Degree (Mi → Do)",
      fr: "3e degré (Mi → Do)",
      es: "3.er grado (Mi → Do)",
      pl: "III stopień (Mi → Do)",
      uk: "III ступінь (Mi → Do)",
      ur: "تیسرا درجہ (Mi → Do)"
    },
    "Me": {
      en: "Minor 3rd (Me → Do)",
      fr: "3e degré min. (Me → Do)",
      es: "3.er grado men. (Me → Do)",
      pl: "III stopień moll (Me → Do)",
      uk: "III мінорний ступінь (Me → Do)",
      ur: "مائنر تیسرا درجہ (Me → Do)"
    },
    "Fa": {
      en: "4th Degree (Fa → Do)",
      fr: "4e degré (Fa → Do)",
      es: "4.º grado (Fa → Do)",
      pl: "IV stopień (Fa → Do)",
      uk: "IV ступінь (Fa → Do)",
      ur: "چوتھا درجہ (Fa → Do)"
    },
    "Sol": {
      en: "5th Degree (Sol → Do)",
      fr: "5e degré (Sol → Do)",
      es: "5.º grado (Sol → Do)",
      pl: "V stopień (Sol → Do)",
      uk: "V ступінь (Sol → Do)",
      ur: "پانچواں درجہ (Sol → Do)"
    },
    "La": {
      en: "6th Degree (La → Do)",
      fr: "6e degré (La → Do)",
      es: "6.º grado (La → Do)",
      pl: "VI stopień (La → Do)",
      uk: "VI ступінь (La → Do)",
      ur: "چھٹا درجہ (La → Do)"
    },
    "Le": {
      en: "Minor 6th (Le → Do)",
      fr: "6e degré min. (Le → Do)",
      es: "6.º grado men. (Le → Do)",
      pl: "VI stopień moll (Le → Do)",
      uk: "VI мінорний ступінь (Le → Do)",
      ur: "مائنر چھٹا درجہ (Le → Do)"
    },
    "Ti": {
      en: "Leading Tone (Ti → Do)",
      fr: "Note sensible (Ti → Do)",
      es: "Sensible (Ti → Do)",
      pl: "Dźwięk prowadzący (Ti → Do)",
      uk: "Ввідний тон (Ti → Do)",
      ur: "لیڈنگ ٹون (Ti → Do)"
    },
    "Te": {
      en: "Minor 7th (Te → Do)",
      fr: "7e degré min. (Te → Do)",
      es: "7.º grado men. (Te → Do)",
      pl: "VII stopień moll (Te → Do)",
      uk: "VII мінорний ступінь (Te → Do)",
      ur: "مائنر ساتواں درجہ (Te → Do)"
    },
    "Do_high": {
      en: "Upper Tonic (Do)",
      fr: "Tonique à l’octave (Do)",
      es: "Tónica a la octava (Do)",
      pl: "Górna tonika (Do)",
      uk: "Верхня тоніка (Do)",
      ur: "بالائی ٹانک (Do)"
    }
  },
  melodyRanges: {
    "do-fa": {
      en: { label: "Do–Fa", badge: "Do–Fa" },
      fr: { label: "Do–Fa", badge: "Do–Fa" },
      es: { label: "Do–Fa", badge: "Do–Fa" },
      pl: { label: "Do–Fa", badge: "Do–Fa" },
      uk: { label: "Do–Fa", badge: "Do–Fa" },
      ur: { label: "Do–Fa", badge: "Do–Fa" }
    },
    "sol-do": {
      en: { label: "Sol–Do", badge: "Sol–Do" },
      fr: { label: "Sol–Do", badge: "Sol–Do" },
      es: { label: "Sol–Do", badge: "Sol–Do" },
      pl: { label: "Sol–Do", badge: "Sol–Do" },
      uk: { label: "Sol–Do", badge: "Sol–Do" },
      ur: { label: "Sol–Do", badge: "Sol–Do" }
    },
    "full": {
      en: { label: "Full Key", badge: "Do–Do" },
      fr: { label: "Gamme entière", badge: "Do–Do" },
      es: { label: "Escala completa", badge: "Do–Do" },
      pl: { label: "Cała gama", badge: "Do–Do" },
      uk: { label: "Уся гама", badge: "Do–Do" },
      ur: { label: "مکمل کلید", badge: "Do–Do" }
    }
  },
  rhythmMeters: {
    "4/4": {
      en: { short: "Common 4/4", label: "4/4 Time (4 Quarters)" },
      fr: { short: "4/4 binaire", label: "Mesure 4/4 (4 noires)" },
      es: { short: "4/4 binario", label: "Compás de 4/4 (4 negras)" },
      pl: { short: "4/4 prosty", label: "Metrum 4/4 (Czterodzielne)" },
      uk: { short: "4/4 рівний", label: "Розмір 4/4 (Чотиридольний)" },
      ur: { short: "عام 4/4", label: "4/4 تال (4 کوارٹر بیٹس)" }
    },
    "3/4": {
      en: { short: "3/4 Waltz", label: "3/4 Time (Waltz)" },
      fr: { short: "3/4 Valse", label: "Mesure 3/4 (Valse)" },
      es: { short: "3/4 vals", label: "Compás de 3/4 (vals)" },
      pl: { short: "3/4 Walc", label: "Metrum 3/4 (Walc)" },
      uk: { short: "3/4 Вальс", label: "Розмір 3/4 (Вальс)" },
      ur: { short: "3/4 والٹز", label: "3/4 تال (والٹز)" }
    },
    "2/4": {
      en: { short: "2/4 March", label: "2/4 Time (March)" },
      fr: { short: "2/4 Marche", label: "Mesure 2/4 (Marche)" },
      es: { short: "2/4 marcha", label: "Compás de 2/4 (marcha)" },
      pl: { short: "2/4 Marsz", label: "Metrum 2/4 (Marsz)" },
      uk: { short: "2/4 Марш", label: "Розмір 2/4 (Марш)" },
      ur: { short: "2/4 مارچ", label: "2/4 تال (مارچ)" }
    },
    "6/8": {
      en: { short: "6/8 Swinging", label: "6/8 Time (Compound 2×3)" },
      fr: { short: "6/8 balancé", label: "Mesure 6/8 (Ternaire à 2 temps)" },
      es: { short: "6/8 mecido", label: "Compás de 6/8 (ternario de 2 tiempos)" },
      pl: { short: "6/8 kołys.", label: "Metrum 6/8 (Złożone dwudzielne)" },
      uk: { short: "6/8 гойдалка", label: "Розмір 6/8 (Складний дводольний)" },
      ur: { short: "6/8 جھولتا", label: "6/8 تال (کمپاؤنڈ 2×3)" }
    },
    "5/4": {
      en: { short: "Odd 3 + 2", label: "5/4 Time (Odd Meter 3+2)" },
      fr: { short: "5/4 (3 + 2)", label: "Mesure 5/4 (Asymétrique 3+2)" },
      es: { short: "5/4 (3 + 2)", label: "Compás de 5/4 (asimétrico 3+2)" },
      pl: { short: "5/4 (3 + 2)", label: "Metrum 5/4 (Nieregularne 3+2)" },
      uk: { short: "5/4 (3 + 2)", label: "Розмір 5/4 (Несиметричний 3+2)" },
      ur: { short: "غیر روایتی 3+2", label: "5/4 تال (طاق تال 3+2)" }
    },
    "7/8": {
      en: { short: "Odd 2+2+3", label: "7/8 Time (Odd Meter 7/8)" },
      fr: { short: "7/8 (2+2+3)", label: "Mesure 7/8 (Asymétrique 7/8)" },
      es: { short: "7/8 (2+2+3)", label: "Compás de 7/8 (asimétrico 7/8)" },
      pl: { short: "7/8 (2+2+3)", label: "Metrum 7/8 (Nieregularne 7/8)" },
      uk: { short: "7/8 (2+2+3)", label: "Розмір 7/8 (Несиметричний 7/8)" },
      ur: { short: "غیر روایتی 2+2+3", label: "7/8 تال (طاق تال 7/8)" }
    }
  },
  rhythmCells: {
    "quarter": {
      en: { symbol: "♩", short: "Quarter", label: "Quarter Note (1 beat)" },
      fr: { symbol: "♩", short: "Noire", label: "Noire (1 temps)" },
      es: { symbol: "♩", short: "Negra", label: "Negra (1 tiempo)" },
      pl: { symbol: "♩", short: "Ćwierćnuta", label: "Ćwierćnuta (1 miara)" },
      uk: { symbol: "♩", short: "Чвертка", label: "Чвертна нота (1 доля)" },
      ur: { symbol: "♩", short: "کوارٹر", label: "کوارٹر نوٹ (1 بیٹ)" }
    },
    "eighth2": {
      en: { symbol: "♫", short: "2 Eighths", label: "Eighth-Note Pair (1-and)" },
      fr: { symbol: "♫", short: "2 Croches", label: "Deux croches (1-et)" },
      es: { symbol: "♫", short: "2 corcheas", label: "Dos corcheas (1-y)" },
      pl: { symbol: "♫", short: "Dwie ósemki", label: "Para ósemek (1-i)" },
      uk: { symbol: "♫", short: "Дві восьмі", label: "Пара восьмих (1-і)" },
      ur: { symbol: "♫", short: "2 آٹھویں", label: "آٹھویں نوٹس کا جوڑا (1-اور)" }
    },
    "rest": {
      en: { symbol: "Rest", short: "Rest", label: "Quarter Rest (Silence)" },
      fr: { symbol: "Pause", short: "Soupir", label: "Soupir (1 temps de silence)" },
      es: { symbol: "Silencio", short: "Silencio de negra", label: "Silencio de negra (1 tiempo de silencio)" },
      pl: { symbol: "Pauza", short: "Pauza", label: "Pauza ćwierćnutowa (1 miara ciszy)" },
      uk: { symbol: "Пауза", short: "Пауза", label: "Чвертна пауза (1 доля тиші)" },
      ur: { symbol: "وقفہ", short: "وقفہ", label: "کوارٹر وقفہ (خاموشی)" }
    },
    "offbeat": {
      en: { symbol: "and", short: "Offbeat", label: "Eighth Rest + Eighth Note (“and”)" },
      fr: { symbol: "et", short: "Contretemps", label: "Demi-soupir + Croche (« et »)" },
      es: { symbol: "y", short: "Contratiempo", label: "Silencio de corchea + corchea («y»)" },
      pl: { symbol: "i", short: "Synkopa (i)", label: "Pauza ósemkowa + ósemka („i”)" },
      uk: { symbol: "і", short: "Синкопа (і)", label: "Восьма пауза + восьма («і»)" },
      ur: { symbol: "اور", short: "آف بیٹ", label: "آٹھواں وقفہ + آٹھواں نوٹ («اور»)" }
    },
    "triplet": {
      en: { symbol: "3×♪", short: "Triplet", label: "Eighth-Note Triplet (3 equal)" },
      fr: { symbol: "3×♪", short: "Triolet", label: "Triolet de croches (3 égales)" },
      es: { symbol: "3×♪", short: "Tresillo", label: "Tresillo de corcheas (3 iguales)" },
      pl: { symbol: "3×♪", short: "Triola", label: "Triola ósemkowa (3 równe dźwięki)" },
      uk: { symbol: "3×♪", short: "Тріоль", label: "Восьма тріоль (3 рівні ноти)" },
      ur: { symbol: "3×♪", short: "ٹرپلیٹ", label: "آٹھویں کا ٹرپلیٹ (3 برابر)" }
    },
    "eighths16": {
      en: { symbol: "♪♬", short: "8th + two 16s", label: "Eighth + Two 16ths" },
      fr: { symbol: "♪♬", short: "Croche + 2 dbl", label: "Croche + 2 doubles croches" },
      es: { symbol: "♪♬", short: "Corchea + 2 semic.", label: "Corchea + 2 semicorcheas" },
      pl: { symbol: "♪♬", short: "8-ka + 2×16-ka", label: "Ósemka + dwie szesnastki" },
      uk: { symbol: "♪♬", short: "8-ма + 2×16-ті", label: "Восьма + дві шістнадцяті" },
      ur: { symbol: "♪♬", short: "8واں + دو 16ویں", label: "ایک آٹھواں + دو سولہویں" }
    },
    "sixteenths8": {
      en: { symbol: "♬♪", short: "Two 16s + 8th", label: "Two 16ths + Eighth" },
      fr: { symbol: "♬♪", short: "2 dbl + Croche", label: "2 doubles croches + Croche" },
      es: { symbol: "♬♪", short: "2 semic. + corchea", label: "2 semicorcheas + corchea" },
      pl: { symbol: "♬♪", short: "2×16-ka + 8-ka", label: "Dwie szesnastki + ósemka" },
      uk: { symbol: "♬♪", short: "2×16-ті + 8-ма", label: "Дві шістнадцяті + восьма" },
      ur: { symbol: "♬♪", short: "دو 16ویں + 8واں", label: "دو سولہویں + ایک آٹھواں" }
    },
    "sixteenth4": {
      en: { symbol: "♬", short: "4× 16ths", label: "Four 16th Notes" },
      fr: { symbol: "♬", short: "4× doubles", label: "Quatre doubles croches" },
      es: { symbol: "♬", short: "4× semicorcheas", label: "Cuatro semicorcheas" },
      pl: { symbol: "♬", short: "4× 16-ki", label: "Cztery szesnastki" },
      uk: { symbol: "♬", short: "4× 16-ті", label: "Чотири шістнадцяті" },
      ur: { symbol: "♬", short: "4× 16ویں", label: "چار سولہویں نوٹس" }
    },
    "dotEighth16": {
      en: { symbol: "♩.♬", short: "Long–Short", label: "Dotted Eighth + 16th" },
      fr: { symbol: "♩.♬", short: "Long–Court", label: "Croche pointée + Double croche" },
      es: { symbol: "♩.♬", short: "Larga–corta", label: "Corchea con puntillo + semicorchea" },
      pl: { symbol: "♩.♬", short: "Długa–krótka", label: "Ósemka z kropką + 16-tka" },
      uk: { symbol: "♩.♬", short: "Довга–коротка", label: "Восьма з крапкою + 16-та" },
      ur: { symbol: "♩.♬", short: "لمبا–مختصر", label: "ڈاٹڈ آٹھواں + سولہواں" }
    },
    "sixteenDotEighth": {
      en: { symbol: "♬♩.", short: "Short–Long", label: "16th + Dotted Eighth" },
      fr: { symbol: "♬♩.", short: "Court–Long", label: "Double croche + Croche pointée" },
      es: { symbol: "♬♩.", short: "Corta–larga", label: "Semicorchea + corchea con puntillo" },
      pl: { symbol: "♬♩.", short: "Krótka–długa", label: "16-tka + ósemka z kropką" },
      uk: { symbol: "♬♩.", short: "Коротка–довга", label: "16-та + восьма з крапкою" },
      ur: { symbol: "♬♩.", short: "مختصر–لمبا", label: "سولہواں + ڈاٹڈ آٹھواں" }
    },
    "sync16": {
      en: { symbol: "Sync.", short: "16th Sync.", label: "16th Rest + 16th Syncopation" },
      fr: { symbol: "Sync.", short: "Syncope dbl", label: "Quart de soupir + Syncope double" },
      es: { symbol: "Sínc.", short: "Síncopa en semic.", label: "Silencio de semicorchea + síncopa en semicorcheas" },
      pl: { symbol: "Synk.", short: "Synkopa 16-tk.", label: "Pauza 16-tkowa + figura synkopowana" },
      uk: { symbol: "Синк.", short: "16-та синкопа", label: "Пауза 16-та + синкопована фігура" },
      ur: { symbol: "سنکوپ", short: "16واں سنکوپ", label: "سولہواں وقفہ + سنکوپیشن" }
    }
  },
  rhythmTapLevels: {
    "1": {
      en: "Pulse Anchor",
      fr: "Ancrage de pulsation",
      es: "Anclaje del pulso",
      pl: "Oparcie pulsu",
      uk: "Опора пульсу",
      ur: "نبض کا لنگر"
    },
    "2": {
      en: "Eighths & 3/4",
      fr: "Croches & 3/4",
      es: "Corcheas y 3/4",
      pl: "Ósemki i 3/4",
      uk: "Восьмі та 3/4",
      ur: "آٹھویں اور 3/4"
    },
    "3": {
      en: "Syncopation & Triplets",
      fr: "Syncopes & Triolets",
      es: "Síncopas y tresillos",
      pl: "Synkopy i triole",
      uk: "Синкопи й тріолі",
      ur: "سنکوپیشن اور ٹرپلیٹس"
    },
    "4": {
      en: "Blind Mode",
      fr: "Mode aveugle",
      es: "Modo a ciegas",
      pl: "Tryb ślepy",
      uk: "Сліпий режим",
      ur: "بلائنڈ موڈ"
    }
  },
  rhythmGrooves: {
    "march": {
      en: { roman: "March", short: "Accent 1 & 3", label: "March (Snare on 1 & 3)" },
      fr: { roman: "Marche", short: "Appui 1 & 3", label: "Marche (Caisse claire sur 1 & 3)" },
      es: { roman: "Marcha", short: "Apoyo en 1 y 3", label: "Marcha (caja en 1 y 3)" },
      pl: { roman: "Marsz", short: "Akcent na 1 i 3", label: "Marsz (Werbel na 1 i 3)" },
      uk: { roman: "Марш", short: "Акцент 1 і 3", label: "Марш (Малий барабан на 1 і 3)" },
      ur: { roman: "مارچ", short: "زور 1 اور 3 پر", label: "مارچ (اسنیئر 1 اور 3 پر)" }
    },
    "backbeat": {
      en: { roman: "Backbeat", short: "Pop/Rock 2 & 4", label: "Backbeat (Snare on 2 & 4)" },
      fr: { roman: "Backbeat", short: "Pop/Rock 2 & 4", label: "Backbeat (Caisse claire sur 2 & 4)" },
      es: { roman: "Backbeat", short: "Pop/rock 2 y 4", label: "Backbeat (caja en 2 y 4)" },
      pl: { roman: "Backbeat", short: "Pop/Rock na 2 i 4", label: "Backbeat (Werbel na 2 i 4)" },
      uk: { roman: "Бекбіт", short: "Поп/Рок 2 і 4", label: "Бекбіт (Малий барабан на 2 і 4)" },
      ur: { roman: "بیک بیٹ", short: "پاپ/راک 2 اور 4", label: "بیک بیٹ (اسنیئر 2 اور 4 پر)" }
    },
    "syncopation": {
      en: { roman: "Syncop.", short: "Upbeat “and”", label: "Syncopated Groove (Offbeats)" },
      fr: { roman: "Syncopé", short: "Le « et » levé", label: "Groove syncopé (Contretemps)" },
      es: { roman: "Sincopado", short: "La «y» en alto", label: "Groove sincopado (contratiempo)" },
      pl: { roman: "Synkopa", short: "Przesunięcie na „i”", label: "Groove synkopowany (Na „i”)" },
      uk: { roman: "Синкопа", short: "Зміщення на «і»", label: "Синкопований ґрув (Слабка доля)" },
      ur: { roman: "سنکوپ", short: "اپ بیٹ «اور»", label: "سنکوپیٹڈ گروو (آف بیٹس)" }
    },
    "swing": {
      en: { roman: "Swing", short: "Triplet Bounce", label: "Swing / Shuffle (Triplet feel)" },
      fr: { roman: "Swing", short: "Rebond ternaire", label: "Swing / Shuffle (Ressenti ternaire)" },
      es: { roman: "Swing", short: "Rebote ternario", label: "Swing / shuffle (sensación ternaria)" },
      pl: { roman: "Swing", short: "Triolowy buj", label: "Swing / Shuffle (Puls triolowy)" },
      uk: { roman: "Свінґ", short: "Тріольна гойдалка", label: "Свінґ / Шафл (Тріольна пульсація)" },
      ur: { roman: "سوئنگ", short: "ٹرپلیٹ جھول", label: "سوئنگ / شفل (ٹرپلیٹ احساس)" }
    },
    "poly32": {
      en: { roman: "3 vs 2", short: "Polyrhythm", label: "Polyrhythm (3 against 2)" },
      fr: { roman: "3 c. 2", short: "Polyrythmie", label: "Polyrythmie (3 pour 2)" },
      es: { roman: "3 c. 2", short: "Polirritmia", label: "Polirritmia (3 contra 2)" },
      pl: { roman: "3 na 2", short: "Polirytmia", label: "Polirytmia (3 przeciw 2)" },
      uk: { roman: "3 на 2", short: "Поліритмія", label: "Поліритмія (3 проти 2)" },
      ur: { roman: "3 بمقابلہ 2", short: "پولی ردھم", label: "پولی ردھم (2 کے خلاف 3)" }
    }
  },
  rhythmOffbeats: {
    "1": {
      en: { roman: "1", short: "Onbeat 1", label: "Beat 1 (Onbeat)" },
      fr: { roman: "1", short: "Temps 1", label: "Temps 1 (Appui)" },
      es: { roman: "1", short: "Tiempo 1", label: "Tiempo 1 (apoyo)" },
      pl: { roman: "1", short: "Miara 1", label: "Miara 1 (Mocna)" },
      uk: { roman: "1", short: "Доля 1", label: "Доля 1 (Сильна)" },
      ur: { roman: "1", short: "آن بیٹ 1", label: "بیٹ 1 (آن بیٹ)" }
    },
    "2": {
      en: { roman: "2", short: "Onbeat 2", label: "Beat 2 (Onbeat)" },
      fr: { roman: "2", short: "Temps 2", label: "Temps 2 (Appui)" },
      es: { roman: "2", short: "Tiempo 2", label: "Tiempo 2 (apoyo)" },
      pl: { roman: "2", short: "Miara 2", label: "Miara 2 (Mocna)" },
      uk: { roman: "2", short: "Доля 2", label: "Доля 2 (Сильна)" },
      ur: { roman: "2", short: "آن بیٹ 2", label: "بیٹ 2 (آن بیٹ)" }
    },
    "3": {
      en: { roman: "3", short: "Onbeat 3", label: "Beat 3 (Onbeat)" },
      fr: { roman: "3", short: "Temps 3", label: "Temps 3 (Appui)" },
      es: { roman: "3", short: "Tiempo 3", label: "Tiempo 3 (apoyo)" },
      pl: { roman: "3", short: "Miara 3", label: "Miara 3 (Mocna)" },
      uk: { roman: "3", short: "Доля 3", label: "Доля 3 (Сильна)" },
      ur: { roman: "3", short: "آن بیٹ 3", label: "بیٹ 3 (آن بیٹ)" }
    },
    "4": {
      en: { roman: "4", short: "Onbeat 4", label: "Beat 4 (Onbeat)" },
      fr: { roman: "4", short: "Temps 4", label: "Temps 4 (Appui)" },
      es: { roman: "4", short: "Tiempo 4", label: "Tiempo 4 (apoyo)" },
      pl: { roman: "4", short: "Miara 4", label: "Miara 4 (Mocna)" },
      uk: { roman: "4", short: "Доля 4", label: "Доля 4 (Сильна)" },
      ur: { roman: "4", short: "آن بیٹ 4", label: "بیٹ 4 (آن بیٹ)" }
    },
    "1+": {
      en: { roman: "1-and", short: "Offbeat", label: "1-and (Offbeat)" },
      fr: { roman: "1-et", short: "Contretemps", label: "1-et (Contretemps)" },
      es: { roman: "1-y", short: "Contratiempo", label: "1-y (contratiempo)" },
      pl: { roman: "1-i", short: "Między 1–2", label: "1-i (Offbeat)" },
      uk: { roman: "1-і", short: "Між 1 і 2", label: "1-і (Слабка доля)" },
      ur: { roman: "1-اور", short: "آف بیٹ", label: "1-اور (آف بیٹ)" }
    },
    "2+": {
      en: { roman: "2-and", short: "Offbeat", label: "2-and (Offbeat)" },
      fr: { roman: "2-et", short: "Contretemps", label: "2-et (Contretemps)" },
      es: { roman: "2-y", short: "Contratiempo", label: "2-y (contratiempo)" },
      pl: { roman: "2-i", short: "Między 2–3", label: "2-i (Offbeat)" },
      uk: { roman: "2-і", short: "Між 2 і 3", label: "2-і (Слабка доля)" },
      ur: { roman: "2-اور", short: "آف بیٹ", label: "2-اور (آف بیٹ)" }
    },
    "3+": {
      en: { roman: "3-and", short: "Offbeat", label: "3-and (Offbeat)" },
      fr: { roman: "3-et", short: "Contretemps", label: "3-et (Contretemps)" },
      es: { roman: "3-y", short: "Contratiempo", label: "3-y (contratiempo)" },
      pl: { roman: "3-i", short: "Między 3–4", label: "3-i (Offbeat)" },
      uk: { roman: "3-і", short: "Між 3 і 4", label: "3-і (Слабка доля)" },
      ur: { roman: "3-اور", short: "آف بیٹ", label: "3-اور (آف بیٹ)" }
    },
    "4+": {
      en: { roman: "4-and", short: "Offbeat", label: "4-and (Offbeat)" },
      fr: { roman: "4-et", short: "Contretemps", label: "4-et (Contretemps)" },
      es: { roman: "4-y", short: "Contratiempo", label: "4-y (contratiempo)" },
      pl: { roman: "4-i", short: "Między 4–1", label: "4-i (Offbeat)" },
      uk: { roman: "4-і", short: "Між 4 і 1", label: "4-і (Слабка доля)" },
      ur: { roman: "4-اور", short: "آف بیٹ", label: "4-اور (آف بیٹ)" }
    }
  },
  rhythmMicro: {
    "early": {
      en: { roman: "↖ Early", short: "Pushing", label: "Early (pushing ahead of the beat)" },
      fr: { roman: "↖ En avant", short: "Un peu devant", label: "En avant (légèrement pressé)" },
      es: { roman: "↖ Por delante", short: "Un poco adelantado", label: "Por delante (ligeramente apurado)" },
      pl: { roman: "↖ Przed", short: "Nieco do przodu", label: "Za wcześnie (Napędza / pcha)" },
      uk: { roman: "↖ Попереду", short: "Трохи наперед", label: "Попереду (Трохи поспішає)" },
      ur: { roman: "↖ جلدی", short: "آگے دھکیلنا", label: "جلدی (بیٹ سے ذرا آگے)" }
    },
    "pocket": {
      en: { roman: "◎ Pocket", short: "In the Pocket", label: "Dead on the Beat (“In the Pocket”)" },
      fr: { roman: "◎ Pocket", short: "In the Pocket", label: "Pile sur le temps (« In the Pocket »)" },
      es: { roman: "◎ Pocket", short: "In the pocket", label: "Justo en el tiempo («in the pocket»)" },
      pl: { roman: "◎ W punkt", short: "W „pocket”", label: "Idealnie w „pocket” (Równo z klikiem)" },
      uk: { roman: "◎ В точку", short: "У «кишені»", label: "Рівно в «покет» (Точно в долю)" },
      ur: { roman: "◎ پاکٹ", short: "عین پاکٹ میں", label: "بالکل بیٹ پر («ان دی پاکٹ»)" }
    },
    "late": {
      en: { roman: "↘ Late", short: "Laid-back", label: "Late (laid-back behind the beat)" },
      fr: { roman: "↘ En arrière", short: "Laid-back", label: "En arrière (détendu, laid-back)" },
      es: { roman: "↘ Por detrás", short: "Laid-back", label: "Por detrás (relajado, laid-back)" },
      pl: { roman: "↘ Za", short: "Luźno z tyłu", label: "Za późno (Luźno / laid-back)" },
      uk: { roman: "↘ Позаду", short: "Розслаблено", label: "Позаду (Розслаблено, laid-back)" },
      ur: { roman: "↘ دیر سے", short: "پُرسکون پیچھے", label: "دیر سے (بیٹ کے پیچھے آرام سے)" }
    }
  },
  prodFreqs: {
    "63": {
      en: { symbol: "63 Hz", roman: "63 Hz", short: "Sub-Bass", label: "63 Hz – Sub-Bass & Kick Thump" },
      fr: { symbol: "63 Hz", roman: "63 Hz", short: "Infra-basse", label: "63 Hz – Sub-Basse & Impact de grosse caisse" },
      es: { symbol: "63 Hz", roman: "63 Hz", short: "Subgrave", label: "63 Hz – subgraves e impacto del bombo" },
      pl: { symbol: "63 Hz", roman: "63 Hz", short: "Subbas", label: "63 Hz – Subbas i uderzenie stopy" },
      uk: { symbol: "63 Гц", roman: "63 Hz", short: "Саб-бас", label: "63 Гц – Саб-бас і удар бочки" },
      ur: { symbol: "63 Hz", roman: "63 Hz", short: "سب باس", label: "63 Hz – سب باس اور کِک تھپک" }
    },
    "125": {
      en: { symbol: "125 Hz", roman: "125 Hz", short: "Bass", label: "125 Hz – Bass Punch & Warmth" },
      fr: { symbol: "125 Hz", roman: "125 Hz", short: "Basse", label: "125 Hz – Punch de la basse & Chaleur" },
      es: { symbol: "125 Hz", roman: "125 Hz", short: "Graves", label: "125 Hz – pegada del bajo y calidez" },
      pl: { symbol: "125 Hz", roman: "125 Hz", short: "Bas", label: "125 Hz – Mięsistość basu i ciepło" },
      uk: { symbol: "125 Гц", roman: "125 Hz", short: "Бас", label: "125 Гц – Щільність баса й тепло" },
      ur: { symbol: "125 Hz", roman: "125 Hz", short: "باس", label: "125 Hz – باس پنچ اور گرمائش" }
    },
    "250": {
      en: { symbol: "250 Hz", roman: "250 Hz", short: "Low-Mids", label: "250 Hz – Low-Mids (“Mud” Zone)" },
      fr: { symbol: "250 Hz", roman: "250 Hz", short: "Bas-médiums", label: "250 Hz – Bas-médiums (Zone « boueuse »)" },
      es: { symbol: "250 Hz", roman: "250 Hz", short: "Medios-graves", label: "250 Hz – medios-graves (zona «embarrada»)" },
      pl: { symbol: "250 Hz", roman: "250 Hz", short: "Niski środek", label: "250 Hz – Ciepło / strefa zamulenia" },
      uk: { symbol: "250 Гц", roman: "250 Hz", short: "Низька середина", label: "250 Гц – Тепло / «мутна» зона" },
      ur: { symbol: "250 Hz", roman: "250 Hz", short: "لو مِڈز", label: "250 Hz – لو مِڈز («گدلا پن» زون)" }
    },
    "500": {
      en: { symbol: "500 Hz", roman: "500 Hz", short: "Boxiness", label: "500 Hz – Lower Mids (“Boxy”)" },
      fr: { symbol: "500 Hz", roman: "500 Hz", short: "Boîte", label: "500 Hz – Bas du médium (Son « carton »)" },
      es: { symbol: "500 Hz", roman: "500 Hz", short: "Caja", label: "500 Hz – parte baja de los medios (sonido «de cartón»)" },
      pl: { symbol: "500 Hz", roman: "500 Hz", short: "Karton", label: "500 Hz – Kartonowy przydźwięk" },
      uk: { symbol: "500 Гц", roman: "500 Hz", short: "Коробка", label: "500 Гц – Коробковий призвук" },
      ur: { symbol: "500 Hz", roman: "500 Hz", short: "باکسی پن", label: "500 Hz – زیریں مِڈز («باکسی»)" }
    },
    "800": {
      en: { symbol: "800 Hz", roman: "800 Hz", short: "Core Mids", label: "800 Hz – Nasal Mids & Wood" },
      fr: { symbol: "800 Hz", roman: "800 Hz", short: "Médium nasal", label: "800 Hz – Médiums nasaux & Bois" },
      es: { symbol: "800 Hz", roman: "800 Hz", short: "Medio nasal", label: "800 Hz – medios nasales y madera" },
      pl: { symbol: "800 Hz", roman: "800 Hz", short: "Nosowość", label: "800 Hz – Nosowy środek i drewno" },
      uk: { symbol: "800 Гц", roman: "800 Hz", short: "Гнусавість", label: "800 Гц – Носовий тембр і дерево" },
      ur: { symbol: "800 Hz", roman: "800 Hz", short: "کور مِڈز", label: "800 Hz – ناک کی گونج اور لکڑی" }
    },
    "1000": {
      en: { symbol: "1 kHz", roman: "1 kHz", short: "Core", label: "1 kHz – Center Midrange" },
      fr: { symbol: "1 kHz", roman: "1 kHz", short: "Cœur médium", label: "1 kHz – Centre des médiums" },
      es: { symbol: "1 kHz", roman: "1 kHz", short: "Núcleo de medios", label: "1 kHz – centro de los medios" },
      pl: { symbol: "1 kHz", roman: "1 kHz", short: "Centrum środka", label: "1 kHz – Rdzeń pasma średniego" },
      uk: { symbol: "1 кГц", roman: "1 kHz", short: "Центр середини", label: "1 кГц – Ядро середнього діапазону" },
      ur: { symbol: "1 kHz", roman: "1 kHz", short: "درمیانی", label: "1 kHz – مرکزی مِڈ رینج" }
    },
    "1600": {
      en: { symbol: "1.6 kHz", roman: "1.6 kHz", short: "Attack", label: "1.6 kHz – Upper-Mid Attack" },
      fr: { symbol: "1,6 kHz", roman: "1,6 kHz", short: "Attaque", label: "1,6 kHz – Haut-médium & Attaque" },
      es: { symbol: "1,6 kHz", roman: "1,6 kHz", short: "Ataque", label: "1,6 kHz – medios-agudos y ataque" },
      pl: { symbol: "1,6 kHz", roman: "1.6 kHz", short: "Atak", label: "1,6 kHz – Wyższy środek i atak" },
      uk: { symbol: "1,6 кГц", roman: "1.6 kHz", short: "Атака", label: "1,6 кГц – Верхня середина й атака" },
      ur: { symbol: "1.6 kHz", roman: "1.6 kHz", short: "اٹیک", label: "1.6 kHz – بالائی مِڈ اٹیک" }
    },
    "2000": {
      en: { symbol: "2 kHz", roman: "2 kHz", short: "Presence", label: "2 kHz – Vocal Focus & Presence" },
      fr: { symbol: "2 kHz", roman: "2 kHz", short: "Présence", label: "2 kHz – Clarté vocale & Présence" },
      es: { symbol: "2 kHz", roman: "2 kHz", short: "Presencia", label: "2 kHz – claridad vocal y presencia" },
      pl: { symbol: "2 kHz", roman: "2 kHz", short: "Prezencja", label: "2 kHz – Czytelność wokalu i prezencja" },
      uk: { symbol: "2 кГц", roman: "2 kHz", short: "Присутність", label: "2 кГц – Розбірливість вокалу й присутність" },
      ur: { symbol: "2 kHz", roman: "2 kHz", short: "موجودگی", label: "2 kHz – آواز کی صفائی اور موجودگی" }
    },
    "2500": {
      en: { symbol: "2.5 kHz", roman: "2.5 kHz", short: "Edge", label: "2.5 kHz – Bite & Cut-Through" },
      fr: { symbol: "2,5 kHz", roman: "2,5 kHz", short: "Mordant", label: "2,5 kHz – Mordant & Définition dans le mix" },
      es: { symbol: "2,5 kHz", roman: "2,5 kHz", short: "Mordiente", label: "2,5 kHz – mordiente y definición en la mezcla" },
      pl: { symbol: "2,5 kHz", roman: "2.5 kHz", short: "Ostrość", label: "2,5 kHz – Przebicie i klarowność w miksie" },
      uk: { symbol: "2,5 кГц", roman: "2.5 kHz", short: "Гострота", label: "2,5 кГц – Пробивність і читаність у міксі" },
      ur: { symbol: "2.5 kHz", roman: "2.5 kHz", short: "تیزی", label: "2.5 kHz – کاٹ اور نمایاں ہونا" }
    },
    "4000": {
      en: { symbol: "4 kHz", roman: "4 kHz", short: "Direct", label: "4 kHz – Definition & Consonants" },
      fr: { symbol: "4 kHz", roman: "4 kHz", short: "Précision", label: "4 kHz – Précision & Consonnes" },
      es: { symbol: "4 kHz", roman: "4 kHz", short: "Precisión", label: "4 kHz – precisión y consonantes" },
      pl: { symbol: "4 kHz", roman: "4 kHz", short: "Kontur", label: "4 kHz – Wyrazistość i spółgłoski" },
      uk: { symbol: "4 кГц", roman: "4 kHz", short: "Чіткість", label: "4 кГц – Чіткість і приголосні звуки" },
      ur: { symbol: "4 kHz", roman: "4 kHz", short: "وضاحت", label: "4 kHz – وضاحت اور حروفِ صحیح" }
    },
    "6300": {
      en: { symbol: "6.3 kHz", roman: "6.3 kHz", short: "Sibilance", label: "6.3 kHz – Sibilance & Crispness" },
      fr: { symbol: "6,3 kHz", roman: "6,3 kHz", short: "Sibilance", label: "6,3 kHz – Sibilances & Croustillant" },
      es: { symbol: "6,3 kHz", roman: "6,3 kHz", short: "Sibilancia", label: "6,3 kHz – sibilantes y crujido" },
      pl: { symbol: "6,3 kHz", roman: "6.3 kHz", short: "Sybilanty", label: "6,3 kHz – Sybilanty (S/Sz) i chrupkość" },
      uk: { symbol: "6,3 кГц", roman: "6.3 kHz", short: "Сибілянти", label: "6,3 кГц – Сибілянти (С/Ш) і хрускіт" },
      ur: { symbol: "6.3 kHz", roman: "6.3 kHz", short: "سسکار", label: "6.3 kHz – سسکار (Sibilance) اور تازگی" }
    },
    "8000": {
      en: { symbol: "8 kHz", roman: "8 kHz", short: "Sparkle", label: "8 kHz – High-End Sparkle & Sheen" },
      fr: { symbol: "8 kHz", roman: "8 kHz", short: "Brillance", label: "8 kHz – Brillance & Éclat des aigus" },
      es: { symbol: "8 kHz", roman: "8 kHz", short: "Brillo", label: "8 kHz – brillo y destello de los agudos" },
      pl: { symbol: "8 kHz", roman: "8 kHz", short: "Blask", label: "8 kHz – Dzwonkowość i jasność góry" },
      uk: { symbol: "8 кГц", roman: "8 kHz", short: "Блиск", label: "8 кГц – Дзвінкість і яскравість верху" },
      ur: { symbol: "8 kHz", roman: "8 kHz", short: "چمک", label: "8 kHz – ہائی اینڈ چمک اور نکھار" }
    },
    "12000": {
      en: { symbol: "12 kHz", roman: "12 kHz", short: "Air", label: "12 kHz – Super-Highs & “Air” Band" },
      fr: { symbol: "12 kHz", roman: "12 kHz", short: "Air", label: "12 kHz – Extrêmes aigus & Bande « Air »" },
      es: { symbol: "12 kHz", roman: "12 kHz", short: "Aire", label: "12 kHz – agudos extremos y banda de «aire»" },
      pl: { symbol: "12 kHz", roman: "12 kHz", short: "Powietrze", label: "12 kHz – Najwyższe pasmo „powietrza”" },
      uk: { symbol: "12 кГц", roman: "12 kHz", short: "Повітря", label: "12 кГц – Надвисокий діапазон «повітря»" },
      ur: { symbol: "12 kHz", roman: "12 kHz", short: "ہوا (Air)", label: "12 kHz – سپر ہائیز اور «Air» بینڈ" }
    }
  },
  prodLevelLabels: {
    "tone": {
      en: { "1": "5 Bands (Basic)", "2": "8 Octave Bands", "3": "12 Bands" },
      fr: { "1": "5 bandes (Base)", "2": "8 bandes d’octave", "3": "12 bandes" },
      es: { "1": "5 bandas (básico)", "2": "8 bandas de octava", "3": "12 bandas" },
      pl: { "1": "5 pasm (Baza)", "2": "8 pasm oktawowych", "3": "12 pasm" },
      uk: { "1": "5 смуг (База)", "2": "8 октавних смуг", "3": "12 смуг" },
      ur: { "1": "5 بینڈز (بنیادی)", "2": "8 آکٹیو بینڈز", "3": "12 بینڈز" }
    },
    "eq": {
      en: { "1": "Wide EQ", "2": "Octave EQ", "3": "Surgical" },
      fr: { "1": "EQ large", "2": "EQ d’octave", "3": "Chirurgical" },
      es: { "1": "EQ amplio", "2": "EQ de octava", "3": "Quirúrgico" },
      pl: { "1": "Szerokie EQ", "2": "EQ oktawowe", "3": "Chirurgiczne" },
      uk: { "1": "Широкий EQ", "2": "Октавний EQ", "3": "Хірургічний" },
      ur: { "1": "چوڑا EQ", "2": "آکٹیو EQ", "3": "باریک سرجیکل" }
    }
  },
  modes: {
    "ionian": {
      en: { roman: "Ionian", short: "Major (1 2 3 4 5 6 7)", label: "Ionian (Major Scale)" },
      fr: { roman: "Ionien", short: "Majeur (1 2 3 4 5 6 7)", label: "Ionien (Gamme majeure)" },
      es: { roman: "Jónico", short: "Mayor (1 2 3 4 5 6 7)", label: "Jónico (escala mayor)" },
      pl: { roman: "Joński", short: "Dur (1 2 3 4 5 6 7)", label: "Joński (Skala durowa naturalna)" },
      uk: { roman: "Іонійський", short: "Мажор (1 2 3 4 5 6 7)", label: "Іонійський (Натуральний мажор)" },
      ur: { roman: "آئیونین", short: "میجر (1 2 3 4 5 6 7)", label: "آئیونین (میجر اسکیل / بلاول)" }
    },
    "dorian": {
      en: { roman: "Dorian", short: "Minor w/ ♮6", label: "Dorian (1 2 b3 4 5 6 b7)" },
      fr: { roman: "Dorien", short: "Mineur av. ♮6", label: "Dorien (1 2 b3 4 5 6 b7)" },
      es: { roman: "Dórico", short: "Menor con ♮6", label: "Dórico (1 2 b3 4 5 6 b7)" },
      pl: { roman: "Dorycki", short: "Moll z ♮6", label: "Dorycki (1 2 b3 4 5 6 b7)" },
      uk: { roman: "Дорійський", short: "Мінор з ♮6", label: "Дорійський (1 2 b3 4 5 6 b7)" },
      ur: { roman: "ڈورین", short: "مائنر مع ♮6", label: "ڈورین (1 2 b3 4 5 6 b7 / کافی)" }
    },
    "phrygian": {
      en: { roman: "Phrygian", short: "Minor w/ b2", label: "Phrygian (1 b2 b3 4 5 b6 b7)" },
      fr: { roman: "Phrygien", short: "Mineur av. b2", label: "Phrygien (1 b2 b3 4 5 b6 b7)" },
      es: { roman: "Frigio", short: "Menor con b2", label: "Frigio (1 b2 b3 4 5 b6 b7)" },
      pl: { roman: "Frygijski", short: "Moll z b2", label: "Frygijski (1 b2 b3 4 5 b6 b7)" },
      uk: { roman: "Фригійський", short: "Мінор з b2", label: "Фригійський (1 b2 b3 4 5 b6 b7)" },
      ur: { roman: "فریجین", short: "مائنر مع b2", label: "فریجین (1 b2 b3 4 5 b6 b7 / بھیرویں)" }
    },
    "lydian": {
      en: { roman: "Lydian", short: "Major w/ #4", label: "Lydian (1 2 3 #4 5 6 7)" },
      fr: { roman: "Lydien", short: "Majeur av. #4", label: "Lydien (1 2 3 #4 5 6 7)" },
      es: { roman: "Lidio", short: "Mayor con #4", label: "Lidio (1 2 3 #4 5 6 7)" },
      pl: { roman: "Lidyjski", short: "Dur z #4", label: "Lidyjski (1 2 3 #4 5 6 7)" },
      uk: { roman: "Лідійський", short: "Мажор з #4", label: "Лідійський (1 2 3 #4 5 6 7)" },
      ur: { roman: "لِڈین", short: "میجر مع #4", label: "لِڈین (1 2 3 #4 5 6 7 / کلیان)" }
    },
    "mixolydian": {
      en: { roman: "Mixolydian", short: "Major w/ b7", label: "Mixolydian (1 2 3 4 5 6 b7)" },
      fr: { roman: "Mixolydien", short: "Majeur av. b7", label: "Mixolydien (1 2 3 4 5 6 b7)" },
      es: { roman: "Mixolidio", short: "Mayor con b7", label: "Mixolidio (1 2 3 4 5 6 b7)" },
      pl: { roman: "Miksolid.", short: "Dur z b7", label: "Miksolidyjski (1 2 3 4 5 6 b7)" },
      uk: { roman: "Міксолід.", short: "Мажор з b7", label: "Міксолідійський (1 2 3 4 5 6 b7)" },
      ur: { roman: "مکسولیڈین", short: "میجر مع b7", label: "مکسولیڈین (1 2 3 4 5 6 b7 / کھماج)" }
    },
    "aeolian": {
      en: { roman: "Aeolian", short: "Natural Minor (b6, b7)", label: "Aeolian (1 2 b3 4 5 b6 b7)" },
      fr: { roman: "Éolien", short: "Mineur nat. (b6, b7)", label: "Éolien (1 2 b3 4 5 b6 b7)" },
      es: { roman: "Eólico", short: "Menor nat. (b6, b7)", label: "Eólico (1 2 b3 4 5 b6 b7)" },
      pl: { roman: "Eolski", short: "Moll nat. (b6, b7)", label: "Eolski (1 2 b3 4 5 b6 b7)" },
      uk: { roman: "Еолійський", short: "Нат. мінор (b6, b7)", label: "Еолійський (1 2 b3 4 5 b6 b7)" },
      ur: { roman: "ایولین", short: "نیچرل مائنر (b6, b7)", label: "ایولین (1 2 b3 4 5 b6 b7 / آساوری)" }
    },
    "locrian": {
      en: { roman: "Locrian", short: "Minor w/ b2 & b5", label: "Locrian (1 b2 b3 4 b5 b6 b7)" },
      fr: { roman: "Locrien", short: "Mineur b2 & b5", label: "Locrien (1 b2 b3 4 b5 b6 b7)" },
      es: { roman: "Locrio", short: "Menor b2 y b5", label: "Locrio (1 b2 b3 4 b5 b6 b7)" },
      pl: { roman: "Lokrycki", short: "Moll b2 i b5", label: "Lokrycki (1 b2 b3 4 b5 b6 b7)" },
      uk: { roman: "Локрійський", short: "Мінор b2 і b5", label: "Локрійський (1 b2 b3 4 b5 b6 b7)" },
      ur: { roman: "لوکرین", short: "مائنر مع b2 اور b5", label: "لوکرین (1 b2 b3 4 b5 b6 b7)" }
    },
    "harm_minor": {
      en: { roman: "Harm. Minor", short: "Minor w/ #7", label: "Harmonic Minor (b6 & leading 7)" },
      fr: { roman: "Min. harm.", short: "Mineur av. #7", label: "Mineur harmonique (b6 & sensible #7)" },
      es: { roman: "Men. arm.", short: "Menor con #7", label: "Menor armónica (b6 y sensible #7)" },
      pl: { roman: "Moll harm.", short: "Moll z #7", label: "Moll harmoniczny (b6 i dźwięk prowadzący #7)" },
      uk: { roman: "Гарм. мінор", short: "Мінор з #7", label: "Гармонічний мінор (b6 і ввідний #7)" },
      ur: { roman: "ہارمونک مائنر", short: "مائنر مع #7", label: "ہارمونک مائنر (b6 اور لیڈنگ 7)" }
    }
  },
  modeLevelLabels: {
    "scale": {
      en: { "1": "4 Core Modes", "2": "All 7 Modes (C)", "3": "All 7 + Changing Root" },
      fr: { "1": "4 modes de base", "2": "Tous les 7 (Do)", "3": "7 modes + Transposition" },
      es: { "1": "4 modos básicos", "2": "Los 7 (Do)", "3": "7 modos + transposición" },
      pl: { "1": "4 główne skale", "2": "Wszystkie 7 (w C)", "3": "Wszystkie 7 + transpozycja" },
      uk: { "1": "4 базові лади", "2": "Усі 7 (До)", "3": "Усі 7 + Транспозиція" },
      ur: { "1": "4 بنیادی موڈز", "2": "تمام 7 موڈز (C)", "3": "تمام 7 + بدلتی جڑ" }
    },
    "char": {
      en: { "1": "Major Modes", "2": "Minor Modes", "3": "All + Harm. Minor" },
      fr: { "1": "Modes majeurs", "2": "Modes mineurs", "3": "Tous + Min. harm." },
      es: { "1": "Modos mayores", "2": "Modos menores", "3": "Todos + men. arm." },
      pl: { "1": "Tryby durowe", "2": "Tryby molowe", "3": "Wszystkie + moll harm." },
      uk: { "1": "Мажорні лади", "2": "Мінорні лади", "3": "Усі + Гарм. мінор" },
      ur: { "1": "میجر موڈز", "2": "مائنر موڈز", "3": "سب + ہارم۔ مائنر" }
    },
    "cadence": {
      en: { "1": "4 Standard Chord Loops", "2": "All 6 Modal Chord Loops" },
      fr: { "1": "4 boucles standard", "2": "Les 6 boucles modales" },
      es: { "1": "4 bucles estándar", "2": "Los 6 bucles modales" },
      pl: { "1": "4 główne zwroty", "2": "Wszystkie 6 zwrotów modalnych" },
      uk: { "1": "4 основні звороти", "2": "Усі 6 модальних зворотів" },
      ur: { "1": "4 معیاری کارڈ لوپس", "2": "تمام 6 موڈل کارڈ لوپس" }
    }
  }
});
