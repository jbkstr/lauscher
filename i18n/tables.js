/**
 * Lauscher • Lokalisierte Musik- & App-Tabellen (ko-lokalisiert je Eintrag)
 * Enthält alle 23 Katalog-Tabellen (Intervalle, Akkorde, Modi, Rhythmus, Produktion, Profil usw.) in 10 Sprachen.
 */

registerColocatedTables({
  profileInstruments: {
    "Klavier": {
      en: "Piano",
      fr: "Piano",
      es: "Piano",
      it: "Pianoforte",
      pl: "Fortepian",
      uk: "Фортепіано",
      ur: "پیانو / ہارمونیم",
      tr: "Piyano",
      ar: "البيانو"
    },
    "Gitarre": {
      en: "Guitar",
      fr: "Guitare",
      es: "Guitarra",
      it: "Chitarra",
      pl: "Gitara",
      uk: "Гітара",
      ur: "گٹار",
      tr: "Gitar",
      ar: "الجيتار"
    },
    "Gesang": {
      en: "Vocals",
      fr: "Chant",
      es: "Canto",
      it: "Canto",
      pl: "Śpiew",
      uk: "Вокал",
      ur: "گلوکاری",
      tr: "Vokal / Şan",
      ar: "الغناء"
    },
    "Bass": {
      en: "Bass",
      fr: "Basse",
      es: "Bajo",
      it: "Basso",
      pl: "Bas",
      uk: "Бас",
      ur: "باس",
      tr: "Bas",
      ar: "الباص"
    },
    "Percussion": {
      en: "Percussion",
      fr: "Percussions",
      es: "Percusión",
      it: "Percussioni",
      pl: "Perkusja",
      uk: "Ударні та перкусія",
      ur: "پرکشن / طبلہ",
      tr: "Perküsyon / Davul",
      ar: "الإيقاع"
    },
    "Streicher": {
      en: "Strings",
      fr: "Cordes",
      es: "Cuerdas",
      it: "Archi",
      pl: "Smyczki",
      uk: "Струнні",
      ur: "اسٹرنگز",
      tr: "Yaylılar",
      ar: "الوتريات"
    },
    "Bläser": {
      en: "Horns & Winds",
      fr: "Vents & Cuivres",
      es: "Vientos y metales",
      it: "Fiati e ottoni",
      pl: "Dęte",
      uk: "Духові",
      ur: "بانسری اور پھونک ساز",
      tr: "Üflemeliler",
      ar: "الآلات النفخية"
    },
    "Produktion": {
      en: "Production",
      fr: "Production",
      es: "Producción",
      it: "Produzione",
      pl: "Produkcja",
      uk: "Продакшн",
      ur: "پروڈکشن",
      tr: "Prodüksiyon",
      ar: "الإنتاج الصوتي"
    }
  },
  profileFocus: {
    "allround": {
      en: { label: "All-Rounder", hint: "Balanced mix across all skills" },
      fr: { label: "Polyvalent", hint: "Mélange équilibré de tous les modules" },
      es: { label: "Polivalente", hint: "Mezcla equilibrada de todos los módulos" },
      it: { label: "Polivalente", hint: "Mix equilibrato di tutte le abilità" },
      pl: { label: "Wszystko po trochu", hint: "Zrównoważone ćwiczenie różnych obszarów" },
      uk: { label: "Усе потроху", hint: "Збалансоване поєднання всіх модулів" },
      ur: { label: "آل راؤنڈر", hint: "تمام صلاحیتوں کا متوازن امتزاج" },
      tr: { label: "Çok Yönlü", hint: "Tüm becerilerde dengeli karışım" },
      ar: { label: "شامل", hint: "مزيج متوازن لجميع المهارات" }
    },
    "harmony": {
      en: { label: "Chords & Harmony", hint: "Sharpen cadences & chord colors" },
      fr: { label: "Accords & Harmonie", hint: "Affiner cadences et couleurs d’accords" },
      es: { label: "Acordes y armonía", hint: "Afinar cadencias y colores de acordes" },
      it: { label: "Accordi e armonia", hint: "Affina cadenze e colori degli accordi" },
      pl: { label: "Akordy i harmonia", hint: "Pewniejsze rozpoznawanie kadencji i akordów" },
      uk: { label: "Акорди та гармонія", hint: "Впевненіше розпізнавати каданси й акорди" },
      ur: { label: "کارڈز اور ہارمونی", hint: "کیڈینسز اور کارڈز کے رنگ نکھاریں" },
      tr: { label: "Akor ve Armoni", hint: "Kadansları ve akor renklerini keskinleştir" },
      ar: { label: "التآلفات والهارموني", hint: "صقل القفلات الموسيقية وألوان التآلفات" }
    },
    "melody": {
      en: { label: "Melody & Solfège", hint: "Practice scale degrees & melodic lines" },
      fr: { label: "Mélodie & Solfège", hint: "Travailler les degrés et lignes mélodiques" },
      es: { label: "Melodía y solfeo", hint: "Trabajar los grados y las líneas melódicas" },
      it: { label: "Melodia e solfeggio", hint: "Allena gradi della scala e linee melodiche" },
      pl: { label: "Melodia i solfeż", hint: "Stopnie gamy i pamięć melodyczna" },
      uk: { label: "Мелодія й сольфеджіо", hint: "Тренувати ладові ступені та мелодичний слух" },
      ur: { label: "دھنیں اور سولفیج", hint: "اسکیل درجات اور دھنوں کی مشق" },
      tr: { label: "Melodi ve Solfej", hint: "Gam derecelerini ve ezgi hatlarını çalış" },
      ar: { label: "اللحن والصولفيج", hint: "التدرّب على درجات السلم والخطوط اللحنية" }
    },
    "rhythm": {
      en: { label: "Rhythm & Groove", hint: "Meter, tapping & micro-timing" },
      fr: { label: "Rythme & Groove", hint: "Mesures, frappe et micro-timing" },
      es: { label: "Ritmo y groove", hint: "Compases, toque y micro-timing" },
      it: { label: "Ritmo e groove", hint: "Tempi, tap ritmico e microtiming" },
      pl: { label: "Rytm i groove", hint: "Metrum, precyzja uderzeń i mikrotiming" },
      uk: { label: "Ритм і ґрув", hint: "Розміри, точність влучання й мікротаймінг" },
      ur: { label: "ردھم اور گروو", hint: "ٹائم سگنیچر، ٹیپنگ اور مائیکرو ٹائمنگ" },
      tr: { label: "Ritim ve Groove", hint: "Ölçü birimi, tempo tutma ve mikro zamanlama" },
      ar: { label: "الإيقاع والجروف", hint: "الوزن الإيقاعي، النقر والتوقيت الدقيق" }
    },
    "notation": {
      en: { label: "Notation & Reading", hint: "Treble, Bass, Alto clefs & ledger lines" },
      fr: { label: "Lecture de notes", hint: "Clés de Sol, Fa, Ut 3 & lignes supplémentaires" },
      es: { label: "Lectura de notas", hint: "Claves de sol, fa, do en 3.ª y líneas adicionales" },
      it: { label: "Lettura delle note", hint: "Chiavi di violino, basso, contralto e tagli addizionali" },
      pl: { label: "Czytanie nut", hint: "Klucze wiolinowy, basowy, altowy i linie dodane" },
      uk: { label: "Читання нот", hint: "Скрипковий, басовий, альтовий ключі й додаткові лінійки" },
      ur: { label: "نوٹیشن اور اسٹاف ریڈنگ", hint: "ٹریبل، باس، آلٹو کلیف اور لیجر لائنز" },
      tr: { label: "Nota ve Okuma", hint: "Sol, Fa, Alto anahtarları ve ek çizgiler" },
      ar: { label: "التدوين وقراءة النوتة", hint: "مفتاح صول وفا وألتو والخطوط الإضافية" }
    },
    "production": {
      en: { label: "Production & Mixing", hint: "Frequencies & EQ in pink noise" },
      fr: { label: "Production & Mix", hint: "Fréquences et égalisation dans le bruit rose" },
      es: { label: "Producción y mezcla", hint: "Frecuencias y ecualización en ruido rosa" },
      it: { label: "Produzione e mix", hint: "Frequenze ed EQ nel rumore rosa" },
      pl: { label: "Produkcja i miks", hint: "Częstotliwości i korekcja w szumie różowym" },
      uk: { label: "Продакшн і мікс", hint: "Частоти та корекція в рожевому шумі" },
      ur: { label: "پروڈکشن اور مکسنگ", hint: "پنک نوائز میں فریکوئنسیز اور EQ" },
      tr: { label: "Prodüksiyon ve Miks", hint: "Frekanslar ve pembe gürültüde EQ" },
      ar: { label: "الإنتاج والمكساج", hint: "الترددات وموازن الصوت EQ في الضوضاء الوردية" }
    },
    "modes": {
      en: { label: "Scales & Modes", hint: "Church modes & characteristic notes" },
      fr: { label: "Gammes & Modes", hint: "Modes ecclésiastiques et notes caractéristiques" },
      es: { label: "Escalas y modos", hint: "Modos eclesiásticos y notas características" },
      it: { label: "Scale e modi", hint: "Modi ecclesiastici e note caratteristiche" },
      pl: { label: "Skale i tryby", hint: "Skale kościelne i dźwięki charakterystyczne" },
      uk: { label: "Гами та лади", hint: "Натуральні лади й характерні тяжіння" },
      ur: { label: "اسکیلز اور موڈز", hint: "چرچ موڈز اور امتیازی سُر" },
      tr: { label: "Gamlar ve Modlar", hint: "Kilise modları ve karakteristik sesler" },
      ar: { label: "السلالم والأنماط", hint: "الأنماط الكنسية والنغمات المميّزة" }
    }
  },
  profileAccessories: {
    "headphones": {
      en: "Headphones",
      fr: "Casque audio",
      es: "Auriculares",
      it: "Cuffie",
      pl: "Słuchawki",
      uk: "Навушники",
      ur: "ہیڈفونز",
      tr: "Kulaklık",
      ar: "سماعات الرأس"
    },
    "sunglasses": {
      en: "Sunglasses",
      fr: "Lunettes de soleil",
      es: "Gafas de sol",
      it: "Occhiali da sole",
      pl: "Okulary przeciwsłoneczne",
      uk: "Сонцезахисні окуляри",
      ur: "دھوپ کا چشمہ",
      tr: "Güneş Gözlüğü",
      ar: "نظارة شمسية"
    },
    "beret": {
      en: "Jazz Beret",
      fr: "Béret jazz",
      es: "Boina de jazz",
      it: "Basco jazz",
      pl: "Beret jazzowy",
      uk: "Джазовий берет",
      ur: "جیز بیریٹ ٹوپی",
      tr: "Caz Beresi",
      ar: "قبعة الجاز"
    },
    "bowtie": {
      en: "Concert Bow Tie",
      fr: "Nœud papillon",
      es: "Pajarita",
      it: "Papillon da concerto",
      pl: "Muszka koncertowa",
      uk: "Концертний метелик",
      ur: "کنسرٹ بو ٹائی",
      tr: "Konser Papyonu",
      ar: "ربطة عنق للحفلات"
    },
    "mic": {
      en: "Studio Mic",
      fr: "Micro de studio",
      es: "Micrófono de estudio",
      it: "Microfono da studio",
      pl: "Mikrofon studyjny",
      uk: "Студійний мікрофон",
      ur: "اسٹوڈیو مائیک",
      tr: "Stüdyo Mikrofonu",
      ar: "ميكروفون الاستوديو"
    },
    "coffee": {
      en: "Coffee Break",
      fr: "Pause café",
      es: "Pausa para el café",
      it: "Pausa caffè",
      pl: "Przerwa na kawę",
      uk: "Кавова пауза",
      ur: "چائے / کافی وقفہ",
      tr: "Kahve Molası",
      ar: "استراحة القهوة"
    },
    "notes": {
      en: "Music Notes",
      fr: "Notes de musique",
      es: "Notas musicales",
      it: "Note musicali",
      pl: "Zeszyt nutowy",
      uk: "Ноти поруч",
      ur: "موسیقی کے نوٹس",
      tr: "Müzik Notaları",
      ar: "نوتات موسيقية"
    },
    "sparkles": {
      en: "Starlight",
      fr: "Éclat d’étoiles",
      es: "Brillo de estrellas",
      it: "Polvere di stelle",
      pl: "Gwiezdny blask",
      uk: "Зоряне сяйво",
      ur: "ستاروں کی چمک",
      tr: "Yıldız Işıltısı",
      ar: "بريق النجوم"
    },
    "none": {
      en: "Classic",
      fr: "Classique",
      es: "Clásico",
      it: "Classico",
      pl: "Klasyczny",
      uk: "Класичний",
      ur: "کلاسک",
      tr: "Klasik",
      ar: "كلاسيكي"
    }
  },
  mixModes: {
    "cadence": {
      en: "Cadences",
      fr: "Cadences",
      es: "Cadencias",
      it: "Cadenze",
      pl: "Kadencje",
      uk: "Каданси",
      ur: "کیڈینسز",
      tr: "Kadanslar",
      ar: "القفلات الموسيقية"
    },
    "cadence-minor": {
      en: "Cadences (Minor)",
      fr: "Cadences (mineur)",
      es: "Cadencias (menor)",
      it: "Cadenze (minore)",
      pl: "Kadencje (moll)",
      uk: "Каданси (мінор)",
      ur: "کیڈینسز (مائنر)",
      tr: "Kadanslar (Minör)",
      ar: "القفلات الموسيقية (الصغير)"
    },
    "interval-melodic": {
      en: "Intervals (Ascending)",
      fr: "Intervalles (Ascendants)",
      es: "Intervalos (ascendentes)",
      it: "Intervalli (ascendenti)",
      pl: "Interwały (W górę)",
      uk: "Інтервали (Висхідні)",
      ur: "انٹرولز (چڑھتے)",
      tr: "Aralıklar (Çıkıcı)",
      ar: "المسافات (صاعدة)"
    },
    "interval-melodic-down": {
      en: "Intervals (Descending)",
      fr: "Intervalles (Descendants)",
      es: "Intervalos (descendentes)",
      it: "Intervalli (discendenti)",
      pl: "Interwały (W dół)",
      uk: "Інтервали (Низхідні)",
      ur: "انٹرولز (اترتے)",
      tr: "Aralıklar (İnici)",
      ar: "المسافات (هابطة)"
    },
    "interval-harmonic": {
      en: "Intervals (Harmonic)",
      fr: "Intervalles (Harmoniques)",
      es: "Intervalos (armónicos)",
      it: "Intervalli (armonici)",
      pl: "Interwały (Harmoniczne)",
      uk: "Інтервали (Гармонічні)",
      ur: "انٹرولز (ہارمونک)",
      tr: "Aralıklar (Armonik)",
      ar: "المسافات (هارمونية)"
    },
    "interval-drone": {
      en: "Intervals (Root Pad)",
      fr: "Intervalles (Nappe tonique)",
      es: "Intervalos (colchón de tónica)",
      it: "Intervalli (bordone di tonica)",
      pl: "Interwały (Na tle burdonu)",
      uk: "Інтервали (На тлі педалі)",
      ur: "انٹرولز (اساس پیڈ پر)",
      tr: "Aralıklar (Kök Ses Pedi)",
      ar: "المسافات (فوق نغمة قرار)"
    },
    "chord-arp-up": {
      en: "Chords (Arpeggio ↗)",
      fr: "Accords (Arpège ↗)",
      es: "Acordes (arpegio ↗)",
      it: "Accordi (arpeggio ↗)",
      pl: "Akordy (Arpeggio ↗)",
      uk: "Акорди (Арпеджіо ↗)",
      ur: "کارڈز (آرپیجیو ↗)",
      tr: "Akorlar (Arpej ↗)",
      ar: "التآلفات (أربيجيو ↗)"
    },
    "chord-arp-down": {
      en: "Chords (Arpeggio ↘)",
      fr: "Accords (Arpège ↘)",
      es: "Acordes (arpegio ↘)",
      it: "Accordi (arpeggio ↘)",
      pl: "Akordy (Arpeggio ↘)",
      uk: "Акорди (Арпеджіо ↘)",
      ur: "کارڈز (آرپیجیو ↘)",
      tr: "Akorlar (Arpej ↘)",
      ar: "التآلفات (أربيجيو ↘)"
    },
    "interval-chords": {
      en: "Chords (Simultaneous)",
      fr: "Accords (Simultanés)",
      es: "Acordes (simultáneos)",
      it: "Accordi (simultanei)",
      pl: "Akordy (Jednoczesne)",
      uk: "Акорди (Одночасні)",
      ur: "کارڈز (بیک وقت)",
      tr: "Akorlar (Eş Zamanlı)",
      ar: "التآلفات (متزامنة)"
    },
    "chord-inversions": {
      en: "Chord Inversions",
      fr: "Renversements d’accords",
      es: "Inversiones de acordes",
      it: "Rivolti di accordi",
      pl: "Przewroty akordów",
      uk: "Обернення акордів",
      ur: "کارڈ انورژنز",
      tr: "Akor Çevrimleri",
      ar: "انقلابات التآلفات"
    },
    "solfege": {
      en: "Solfège",
      fr: "Solfège",
      es: "Solfeo",
      it: "Solfeggio",
      pl: "Solfeż",
      uk: "Сольфеджіо",
      ur: "سولفیج",
      tr: "Solfej",
      ar: "الصولفيج"
    },
    "melody": {
      en: "Melody Phrases",
      fr: "Phrases mélodiques",
      es: "Frases melódicas",
      it: "Frasi melodiche",
      pl: "Frazy melodyczne",
      uk: "Мелодичні фрази",
      ur: "دھنوں کی فریزز",
      tr: "Melodi Cümleleri",
      ar: "الجمل اللحنية"
    },
    "rhythm-meter": {
      en: "Rhythm • Time Signature",
      fr: "Rythme • Chiffrage de mesure",
      es: "Ritmo • Cifrado de compás",
      it: "Ritmo • Indicazione di tempo",
      pl: "Rytm • Metrum",
      uk: "Ритм • Розмір",
      ur: "ردھم • ٹائم سگنیچر",
      tr: "Ritim • Ölçü Birimi",
      ar: "الإيقاع • الوزن الإيقاعي"
    },
    "rhythm-dictation": {
      en: "Rhythm • Dictation",
      fr: "Rythme • Dictée",
      es: "Ritmo • Dictado",
      it: "Ritmo • Dettato",
      pl: "Rytm • Dyktando",
      uk: "Ритм • Диктант",
      ur: "ردھم • ڈکٹیشن",
      tr: "Ritim • Dikte",
      ar: "الإيقاع • الإملاء الإيقاعي"
    },
    "rhythm-tap": {
      en: "Rhythm • Rhythm Tap",
      fr: "Rythme • Reproduire au pad",
      es: "Ritmo • Reproducir en el pad",
      it: "Ritmo • Riproduci sul pad",
      pl: "Rytm • Stukanie na padzie",
      uk: "Ритм • Повтор на педі",
      ur: "ردھم • ردھم ٹیپ",
      tr: "Ritim • Ritim Tekrarı",
      ar: "الإيقاع • النقر الإيقاعي"
    },
    "rhythm-groove": {
      en: "Rhythm • Groove & Feel",
      fr: "Rythme • Groove & Feeling",
      es: "Ritmo • Groove y feeling",
      it: "Ritmo • Groove e feeling",
      pl: "Rytm • Groove i feel",
      uk: "Ритм • Ґрув і відчуття",
      ur: "ردھم • گروو اور احساس",
      tr: "Ritim • Groove ve His",
      ar: "الإيقاع • الجروف والإحساس"
    },
    "prod-tone": {
      en: "Production • Frequencies",
      fr: "Production • Fréquences",
      es: "Producción • Frecuencias",
      it: "Produzione • Frequenze",
      pl: "Produkcja • Częstotliwości",
      uk: "Продакшн • Частоти",
      ur: "پروڈکشن • فریکوئنسیز",
      tr: "Prodüksiyon • Frekanslar",
      ar: "الإنتاج • الترددات"
    },
    "prod-eq-noise": {
      en: "Production • Pink Noise EQ",
      fr: "Production • Égalisation bruit rose",
      es: "Producción • Ecualización en ruido rosa",
      it: "Produzione • EQ nel rumore rosa",
      pl: "Produkcja • EQ w szumie różowym",
      uk: "Продакшн • EQ у рожевому шумі",
      ur: "پروڈکشن • پنک نوائز EQ",
      tr: "Prodüksiyon • Pembe Gürültü EQ",
      ar: "الإنتاج • موازن الضوضاء الوردية EQ"
    },
    "modes-scale": {
      en: "Modes • Scale Recognition",
      fr: "Modes • Reconnaître la gamme",
      es: "Modos • Reconocer la escala",
      it: "Modi • Riconosci la scala",
      pl: "Tryby • Rozpoznaj skalę",
      uk: "Лади • Розпізнавання гами",
      ur: "موڈز • اسکیل کی پہچان",
      tr: "Modlar • Gam Tanıma",
      ar: "الأنماط • التعرّف على السلم"
    },
    "modes-char": {
      en: "Modes • Characteristic Note",
      fr: "Modes • Note caractéristique",
      es: "Modos • Nota característica",
      it: "Modi • Nota caratteristica",
      pl: "Tryby • Dźwięk charakterystyczny",
      uk: "Лади • Характерний ступінь",
      ur: "موڈز • امتیازی سُر",
      tr: "Modlar • Karakteristik Ses",
      ar: "الأنماط • النغمة المميّزة"
    },
    "modes-cadence": {
      en: "Modes • Modal Chord Loops",
      fr: "Modes • Boucles modales",
      es: "Modos • Bucles modales",
      it: "Modi • Giri modali",
      pl: "Tryby • Kadencje modalne",
      uk: "Лади • Модальні звороти",
      ur: "موڈز • موڈل کارڈ لوپس",
      tr: "Modlar • Modal Akor Döngüleri",
      ar: "الأنماط • دورات التآلفات النمطية"
    },
    "notation-treble": {
      en: "Notation • Treble Clef",
      fr: "Notation • Clé de Sol",
      es: "Notación • Clave de sol",
      it: "Notazione • Chiave di violino",
      pl: "Nuty • Klucz wiolinowy",
      uk: "Нотопис • Скрипковий ключ",
      ur: "نوٹیشن • ٹریبل کلیف",
      tr: "Nota • Sol Anahtarı",
      ar: "التدوين • مفتاح صول"
    },
    "notation-bass": {
      en: "Notation • Bass Clef",
      fr: "Notation • Clé de Fa",
      es: "Notación • Clave de fa",
      it: "Notazione • Chiave di basso",
      pl: "Nuty • Klucz basowy",
      uk: "Нотопис • Басовий ключ",
      ur: "نوٹیشن • باس کلیف",
      tr: "Nota • Fa Anahtarı",
      ar: "التدوين • مفتاح فا"
    },
    "notation-alto": {
      en: "Notation • Alto Clef",
      fr: "Notation • Clé d’Ut 3",
      es: "Notación • Clave de do en 3.ª",
      it: "Notazione • Chiave di contralto",
      pl: "Nuty • Klucz altowy",
      uk: "Нотопис • Альтовий ключ",
      ur: "نوٹیشن • آلٹو کلیف",
      tr: "Nota • Alto Anahtarı",
      ar: "التدوين • مفتاح ألتو"
    },
    "notation-mixed": {
      en: "Notation • Clef Mix",
      fr: "Notation • Mix de clés",
      es: "Notación • Mezcla de claves",
      it: "Notazione • Mix di chiavi",
      pl: "Nuty • Miks kluczy",
      uk: "Нотопис • Мікс ключів",
      ur: "نوٹیشن • کلیف مکس",
      tr: "Nota • Anahtar Karışımı",
      ar: "التدوين • مزيج المفاتيح"
    },
    "notation-grand": {
      en: "Notation • Grand Staff",
      fr: "Notation • Grand portée",
      es: "Notación • Sistema de piano",
      it: "Notazione • Doppio pentagramma",
      pl: "Nuty • System fortepianowy",
      uk: "Нотопис • Подвійний стан",
      ur: "نوٹیشن • گرینڈ اسٹاف",
      tr: "Nota • Piyano Portesi",
      ar: "التدوين • المدرج المزدوج"
    },
    "notation-chords": {
      en: "Notation • Chord Reading",
      fr: "Notation • Lire des accords",
      es: "Notación • Leer acordes",
      it: "Notazione • Lettura accordi",
      pl: "Nuty • Czytanie akordów",
      uk: "Нотопис • Читання акордів",
      ur: "نوٹیشن • کارڈز پڑھنا",
      tr: "Nota • Akor Okuma",
      ar: "التدوين • قراءة التآلفات"
    },
    "notation-symbols": {
      en: "Notation • Symbols & Markings",
      fr: "Notation • Symboles & indications",
      es: "Notación • Símbolos e indicaciones",
      it: "Notazione • Simboli e indicazioni",
      pl: "Nuty • Symbole i oznaczenia",
      uk: "Нотопис • Символи й позначення",
      ur: "نوٹیشن • علامات اور ہدایات",
      tr: "Nota • Semboller ve İşaretler",
      ar: "التدوين • الرموز والعلامات"
    }
  },
  defaultMixTitles: {
    "mix_warmup": {
      de: "Morgen-Warmup",
      en: "Morning Warmup",
      fr: "Éveil du matin",
      es: "Despertar matinal",
      it: "Risveglio mattutino",
      pl: "Poranna rozgrzewka",
      uk: "Ранковий старт",
      ur: "صبح کا وارم اپ",
      tr: "Sabah Isınması",
      ar: "إحماء الصباح"
    },
    "mix_intervals": {
      de: "Intervall-Fokus",
      en: "Interval Sprint",
      fr: "Sprint Intervalles",
      es: "Sprint de intervalos",
      it: "Sprint intervalli",
      pl: "Trening interwałów",
      uk: "Інтервальний спринт",
      ur: "انٹرول اسپرنٹ",
      tr: "Aralık Hız Turu",
      ar: "سباق المسافات"
    },
    "mix_groove": {
      de: "Timing & Blindflug",
      en: "Timing & Blind Tap",
      fr: "Timing & Mode aveugle",
      es: "Timing y modo a ciegas",
      it: "Timing e modalità al buio",
      pl: "Timing i tryb ślepy",
      uk: "Таймінг і сліпий режим",
      ur: "ٹائمنگ اور بلائنڈ ٹیپ",
      tr: "Zamanlama ve Kör Mod",
      ar: "التوقيت والنقر الأعمى"
    }
  },
  keyNames: {
    "C": {
      en: "C Major",
      fr: "Do majeur",
      es: "Do mayor",
      it: "Do maggiore",
      pl: "C-dur",
      uk: "До мажор",
      ur: "C میجر",
      tr: "Do Majör",
      ar: "C كبير"
    },
    "G": {
      en: "G Major",
      fr: "Sol majeur",
      es: "Sol mayor",
      it: "Sol maggiore",
      pl: "G-dur",
      uk: "Соль мажор",
      ur: "G میجر",
      tr: "Sol Majör",
      ar: "G كبير"
    },
    "D": {
      en: "D Major",
      fr: "Ré majeur",
      es: "Re mayor",
      it: "Re maggiore",
      pl: "D-dur",
      uk: "Ре мажор",
      ur: "D میجر",
      tr: "Re Majör",
      ar: "D كبير"
    },
    "F": {
      en: "F Major",
      fr: "Fa majeur",
      es: "Fa mayor",
      it: "Fa maggiore",
      pl: "F-dur",
      uk: "Фа мажор",
      ur: "F میجر",
      tr: "Fa Majör",
      ar: "F كبير"
    },
    "Bb": {
      en: "Bb Major",
      fr: "Si♭ majeur",
      es: "Si♭ mayor",
      it: "Si♭ maggiore",
      pl: "B-dur",
      uk: "Сі♭ мажор",
      ur: "B♭ میجر",
      tr: "Si♭ Majör",
      ar: "B♭ كبير"
    },
    "Eb": {
      en: "Eb Major",
      fr: "Mi♭ majeur",
      es: "Mi♭ mayor",
      it: "Mi♭ maggiore",
      pl: "Es-dur",
      uk: "Мі♭ мажор",
      ur: "E♭ میجر",
      tr: "Mi♭ Majör",
      ar: "E♭ كبير"
    },
    "Ab": {
      en: "Ab Major",
      fr: "La♭ majeur",
      es: "La♭ mayor",
      it: "La♭ maggiore",
      pl: "As-dur",
      uk: "Ля♭ мажор",
      ur: "A♭ میجر",
      tr: "La♭ Majör",
      ar: "A♭ كبير"
    },
    "A": {
      en: "A Major",
      fr: "La majeur",
      es: "La mayor",
      it: "La maggiore",
      pl: "A-dur",
      uk: "Ля мажор",
      ur: "A میجر",
      tr: "La Majör",
      ar: "A كبير"
    },
    "E": {
      en: "E Major",
      fr: "Mi majeur",
      es: "Mi mayor",
      it: "Mi maggiore",
      pl: "E-dur",
      uk: "Мі мажор",
      ur: "E میجر",
      tr: "Mi Majör",
      ar: "E كبير"
    },
    "B": {
      en: "B Major",
      fr: "Si majeur",
      es: "Si mayor",
      it: "Si maggiore",
      pl: "H-dur",
      uk: "Сі мажор",
      ur: "B میجر",
      tr: "Si Majör",
      ar: "B كبير"
    },
    "F#": {
      en: "F# Major",
      fr: "Fa♯ majeur",
      es: "Fa♯ mayor",
      it: "Fa♯ maggiore",
      pl: "Fis-dur",
      uk: "Фа♯ мажор",
      ur: "F♯ میجر",
      tr: "Fa♯ Majör",
      ar: "F♯ كبير"
    },
    "Db": {
      en: "Db Major",
      fr: "Ré♭ majeur",
      es: "Re♭ mayor",
      it: "Re♭ maggiore",
      pl: "Des-dur",
      uk: "Ре♭ мажор",
      ur: "D♭ میجر",
      tr: "Re♭ Majör",
      ar: "D♭ كبير"
    }
  },
  minorKeyNames: {
    "C": {
      en: "C minor",
      fr: "Do mineur",
      es: "Do menor",
      it: "Do minore",
      pl: "c-moll",
      uk: "До мінор",
      ur: "C مائنر",
      tr: "Do Minör",
      ar: "C صغير"
    },
    "G": {
      en: "G minor",
      fr: "Sol mineur",
      es: "Sol menor",
      it: "Sol minore",
      pl: "g-moll",
      uk: "Соль мінор",
      ur: "G مائنر",
      tr: "Sol Minör",
      ar: "G صغير"
    },
    "D": {
      en: "D minor",
      fr: "Ré mineur",
      es: "Re menor",
      it: "Re minore",
      pl: "d-moll",
      uk: "Ре мінор",
      ur: "D مائنر",
      tr: "Re Minör",
      ar: "D صغير"
    },
    "F": {
      en: "F minor",
      fr: "Fa mineur",
      es: "Fa menor",
      it: "Fa minore",
      pl: "f-moll",
      uk: "Фа мінор",
      ur: "F مائنر",
      tr: "Fa Minör",
      ar: "F صغير"
    },
    "Bb": {
      en: "Bb minor",
      fr: "Si♭ mineur",
      es: "Si♭ menor",
      it: "Si♭ minore",
      pl: "b-moll",
      uk: "Сі♭ мінор",
      ur: "B♭ مائنر",
      tr: "Si♭ Minör",
      ar: "B♭ صغير"
    },
    "Eb": {
      en: "Eb minor",
      fr: "Mi♭ mineur",
      es: "Mi♭ menor",
      it: "Mi♭ minore",
      pl: "es-moll",
      uk: "Мі♭ мінор",
      ur: "E♭ مائنر",
      tr: "Mi♭ Minör",
      ar: "E♭ صغير"
    },
    "Ab": {
      en: "G# minor",
      fr: "Sol♯ mineur",
      es: "Sol♯ menor",
      it: "Sol♯ minore",
      pl: "gis-moll",
      uk: "Соль♯ мінор",
      ur: "G♯ مائنر",
      tr: "Sol♯ Minör",
      ar: "G♯ صغير"
    },
    "A": {
      en: "A minor",
      fr: "La mineur",
      es: "La menor",
      it: "La minore",
      pl: "a-moll",
      uk: "Ля мінор",
      ur: "A مائنر",
      tr: "La Minör",
      ar: "A صغير"
    },
    "E": {
      en: "E minor",
      fr: "Mi mineur",
      es: "Mi menor",
      it: "Mi minore",
      pl: "e-moll",
      uk: "Мі мінор",
      ur: "E مائنر",
      tr: "Mi Minör",
      ar: "E صغير"
    },
    "B": {
      en: "B minor",
      fr: "Si mineur",
      es: "Si menor",
      it: "Si minore",
      pl: "h-moll",
      uk: "Сі мінор",
      ur: "B مائنر",
      tr: "Si Minör",
      ar: "B صغير"
    },
    "F#": {
      en: "F# minor",
      fr: "Fa♯ mineur",
      es: "Fa♯ menor",
      it: "Fa♯ minore",
      pl: "fis-moll",
      uk: "Фа♯ мінор",
      ur: "F♯ مائنر",
      tr: "Fa♯ Minör",
      ar: "F♯ صغير"
    },
    "Db": {
      en: "C# minor",
      fr: "Do♯ mineur",
      es: "Do♯ menor",
      it: "Do♯ minore",
      pl: "cis-moll",
      uk: "До♯ мінор",
      ur: "C♯ مائنر",
      tr: "Do♯ Minör",
      ar: "C♯ صغير"
    }
  },
  degrees: {
    "I": {
      en: { label: "Tonic", short: "Tonic" },
      fr: { label: "Tonique", short: "Tonique" },
      es: { label: "Tónica", short: "Tónica" },
      it: { label: "Tonica", short: "Tonica" },
      pl: { label: "Tonika", short: "Tonika" },
      uk: { label: "Тоніка", short: "Тоніка" },
      ur: { label: "ٹانک (I)", short: "ٹانک" },
      tr: { label: "Tonik", short: "Tonik" },
      ar: { label: "درجة القرار (التونيك)", short: "قرار" }
    },
    "I7": {
      en: { label: "Tonic Dom. 7th", short: "I7" },
      fr: { label: "Tonique 7e de dom.", short: "I7" },
      es: { label: "Tónica con 7.ª de dom.", short: "I7" },
      it: { label: "Tonica settima di dom.", short: "I7" },
      pl: { label: "Tonika z septyma m.", short: "I7" },
      uk: { label: "Тоніка з мал. 7", short: "I7" },
      ur: { label: "ٹانک ڈومیننٹ سیونتھ", short: "I7" },
      tr: { label: "Tonik Dominant 7'li", short: "I7" },
      ar: { label: "سباعي القرار المسيطر", short: "I7" }
    },
    "Imaj7": {
      en: { label: "Tonic Major 7th", short: "Imaj7" },
      fr: { label: "Tonique maj. 7", short: "Imaj7" },
      es: { label: "Tónica maj. 7", short: "Imaj7" },
      it: { label: "Tonica settima magg.", short: "Imaj7" },
      pl: { label: "Tonika maj7", short: "Imaj7" },
      uk: { label: "Тонічний майор-7", short: "Imaj7" },
      ur: { label: "ٹانک میجر سیونتھ", short: "Imaj7" },
      tr: { label: "Tonik Majör 7'li", short: "Imaj7" },
      ar: { label: "سباعي القرار الكبير", short: "Imaj7" }
    },
    "ii": {
      en: { label: "Supertonic (minor)", short: "ii (Min)" },
      fr: { label: "Sus-tonique (mineur)", short: "ii (Min)" },
      es: { label: "Supertónica (menor)", short: "ii (men.)" },
      it: { label: "Sopratonica (minore)", short: "ii (min.)" },
      pl: { label: "Supertonika (moll)", short: "ii (moll)" },
      uk: { label: "Супертоніка (мінор)", short: "ii (мін)" },
      ur: { label: "سپرٹانک (مائنر ii)", short: "ii (مائنر)" },
      tr: { label: "Üst Tonik (Minör)", short: "ii (Min)" },
      ar: { label: "الدرجة الثانية (صغير)", short: "ii (صغير)" }
    },
    "iii": {
      en: { label: "Mediant (minor)", short: "iii (Min)" },
      fr: { label: "Médiante (mineur)", short: "iii (Min)" },
      es: { label: "Mediante (menor)", short: "iii (men.)" },
      it: { label: "Mediante (minore)", short: "iii (min.)" },
      pl: { label: "Medianta (moll)", short: "iii (moll)" },
      uk: { label: "Медіанта (мінор)", short: "iii (мін)" },
      ur: { label: "میڈینٹ (مائنر iii)", short: "iii (مائنر)" },
      tr: { label: "Mediyant (Minör)", short: "iii (Min)" },
      ar: { label: "الدرجة الثالثة (صغير)", short: "iii (صغير)" }
    },
    "III7": {
      en: { label: "Secondary Dom. III7", short: "III7" },
      fr: { label: "Dom. secondaire III7", short: "III7" },
      es: { label: "Dom. secundaria III7", short: "III7" },
      it: { label: "Dom. secondaria III7", short: "III7" },
      pl: { label: "Dom. wtrącona III7", short: "III7" },
      uk: { label: "Побічна домін. III7", short: "III7" },
      ur: { label: "سیکنڈری ڈومیننٹ III7", short: "III7" },
      tr: { label: "İkincil Dominant III7", short: "III7" },
      ar: { label: "المسيطر الثانوي III7", short: "III7" }
    },
    "IV": {
      en: { label: "Subdominant", short: "Subdom." },
      fr: { label: "Sous-dominante", short: "Sous-dom." },
      es: { label: "Subdominante", short: "Subdom." },
      it: { label: "Sottodominante", short: "Sottodom." },
      pl: { label: "Subdominanta", short: "Subdom." },
      uk: { label: "Субдомінанта", short: "Субдом." },
      ur: { label: "سب ڈومیننٹ (IV)", short: "سب ڈوم۔" },
      tr: { label: "Subdominant", short: "Subdom." },
      ar: { label: "تحت المسيطر", short: "تحت المسيطر" }
    },
    "IV7": {
      en: { label: "Subdominant Dom. 7", short: "IV7" },
      fr: { label: "Sous-dominante 7", short: "IV7" },
      es: { label: "Subdominante 7", short: "IV7" },
      it: { label: "Sottodominante 7", short: "IV7" },
      pl: { label: "Subdominanta 7", short: "IV7" },
      uk: { label: "Субдомінанта 7", short: "IV7" },
      ur: { label: "سب ڈومیننٹ 7", short: "IV7" },
      tr: { label: "Subdominant Dom. 7'li", short: "IV7" },
      ar: { label: "سباعي تحت المسيطر", short: "IV7" }
    },
    "iv": {
      en: { label: "Minor Subdominant", short: "iv (Min)" },
      fr: { label: "Sous-dominante min.", short: "iv (Min)" },
      es: { label: "Subdominante menor", short: "iv (men.)" },
      it: { label: "Sottodominante minore", short: "iv (min.)" },
      pl: { label: "Subdominanta molowa", short: "iv (moll)" },
      uk: { label: "Мінорна субдом.", short: "iv (мін)" },
      ur: { label: "مائنر سب ڈومیننٹ (iv)", short: "iv (مائنر)" },
      tr: { label: "Minör Subdominant", short: "iv (Min)" },
      ar: { label: "تحت المسيطر الصغير", short: "iv (صغير)" }
    },
    "V": {
      en: { label: "Dominant", short: "Dominant" },
      fr: { label: "Dominante", short: "Dominante" },
      es: { label: "Dominante", short: "Dominante" },
      it: { label: "Dominante", short: "Dominante" },
      pl: { label: "Dominanta", short: "Dominanta" },
      uk: { label: "Домінанта", short: "Домінанта" },
      ur: { label: "ڈومیننٹ (V)", short: "ڈومیننٹ" },
      tr: { label: "Dominant", short: "Dominant" },
      ar: { label: "المسيطر (الدومينانت)", short: "المسيطر" }
    },
    "V7": {
      en: { label: "Dominant 7th", short: "Dom. 7" },
      fr: { label: "Septième de dom.", short: "Dom. 7" },
      es: { label: "Séptima de dominante", short: "Dom. 7" },
      it: { label: "Settima di dominante", short: "Dom. 7" },
      pl: { label: "Dominanta septymowa", short: "Dom. 7" },
      uk: { label: "Домінантсептакорд", short: "Домін. 7" },
      ur: { label: "ڈومیننٹ سیونتھ (V7)", short: "ڈوم۔ 7" },
      tr: { label: "Dominant 7'li", short: "Dom. 7" },
      ar: { label: "المسيطر السباعي", short: "V7" }
    },
    "Vsus4": {
      en: { label: "Dominant Sus4", short: "Vsus4" },
      fr: { label: "Dominante sus4", short: "Vsus4" },
      es: { label: "Dominante sus4", short: "Vsus4" },
      it: { label: "Dominante sus4", short: "Vsus4" },
      pl: { label: "Dominanta sus4", short: "Vsus4" },
      uk: { label: "Домінанта sus4", short: "Vsus4" },
      ur: { label: "ڈومیننٹ Sus4", short: "Vsus4" },
      tr: { label: "Dominant Sus4", short: "Vsus4" },
      ar: { label: "المسيطر المعلّق Vsus4", short: "Vsus4" }
    },
    "vi": {
      en: { label: "Relative Minor (vi)", short: "vi (Min)" },
      fr: { label: "Relatif mineur (vi)", short: "vi (Min)" },
      es: { label: "Relativo menor (vi)", short: "vi (men.)" },
      it: { label: "Relativa minore (vi)", short: "vi (min.)" },
      pl: { label: "Moll równoległy (vi)", short: "vi (moll)" },
      uk: { label: "Паралельний мінор (vi)", short: "vi (мін)" },
      ur: { label: "پیرالل مائنر (vi)", short: "vi (مائنر)" },
      tr: { label: "İlgili Minör (vi)", short: "vi (Min)" },
      ar: { label: "الصغير النسبي (vi)", short: "vi (صغير)" }
    },
    "bVI": {
      en: { label: "Modal Borrowed bVI", short: "bVI" },
      fr: { label: "Emprunt modal bVI", short: "bVI" },
      es: { label: "Préstamo modal bVI", short: "bVI" },
      it: { label: "Prestito modale bVI", short: "bVI" },
      pl: { label: "Modalny bVI", short: "bVI" },
      uk: { label: "Модальний bVI", short: "bVI" },
      ur: { label: "مائنر باروڈ bVI", short: "bVI" },
      tr: { label: "Modal Ödünç bVI", short: "bVI" },
      ar: { label: "مستعار نمطي bVI", short: "bVI" }
    },
    "bVII": {
      en: { label: "Subtonic bVII", short: "bVII" },
      fr: { label: "Sous-tonique bVII", short: "bVII" },
      es: { label: "Subtónica bVII", short: "bVII" },
      it: { label: "Sottotonica bVII", short: "bVII" },
      pl: { label: "Naturalny bVII", short: "bVII" },
      uk: { label: "Натуральний bVII", short: "bVII" },
      ur: { label: "سب ٹانک bVII", short: "bVII" },
      tr: { label: "Alt Tonik bVII", short: "bVII" },
      ar: { label: "تحت القرار bVII", short: "bVII" }
    },
    "V/V": {
      en: { label: "Secondary Dominant", short: "V/V" },
      fr: { label: "Dominante secondaire", short: "V/V" },
      es: { label: "Dominante secundaria", short: "V/V" },
      it: { label: "Dominante secondaria", short: "V/V" },
      pl: { label: "Dominanta wtrącona", short: "V/V" },
      uk: { label: "Побічна домінанта", short: "V/V" },
      ur: { label: "سیکنڈری ڈومیننٹ V/V", short: "V/V" },
      tr: { label: "İkincil Dominant", short: "V/V" },
      ar: { label: "المسيطر الثانوي", short: "V/V" }
    },
    "bII7": {
      en: { label: "Tritone Substitution", short: "bII7 (Sub)" },
      fr: { label: "Substitution tritonique", short: "bII7 (Sub)" },
      es: { label: "Sustitución tritonal", short: "bII7 (sust.)" },
      it: { label: "Sostituzione di tritono", short: "bII7 (sost.)" },
      pl: { label: "Substytut trytonowy", short: "bII7 (Sub.)" },
      uk: { label: "Тритонова заміна", short: "bII7 (Зам.)" },
      ur: { label: "ٹرائی ٹون متبادل bII7", short: "bII7 (سب)" },
      tr: { label: "Triton İkamesi", short: "bII7 (İkame)" },
      ar: { label: "استبدال الترايتون", short: "bII7 (بديل)" }
    },
    "i": {
      en: { label: "Minor Tonic", short: "Tonic" },
      fr: { label: "Tonique mineure", short: "Tonique" },
      es: { label: "Tónica menor", short: "Tónica" },
      it: { label: "Tonica minore", short: "Tonica" },
      pl: { label: "Tonika molowa", short: "Tonika" },
      uk: { label: "Мінорна тоніка", short: "Тоніка" },
      ur: { label: "مائنر ٹانک", short: "ٹانک" },
      tr: { label: "Minör Tonik", short: "Tonik" },
      ar: { label: "قرار صغير", short: "قرار" }
    },
    "iio": {
      en: { label: "Diminished ii", short: "ii° (dim)" },
      fr: { label: "ii diminué", short: "ii° (dim.)" },
      es: { label: "ii disminuido", short: "ii° (dism.)" },
      it: { label: "ii diminuito", short: "ii° (dim.)" },
      pl: { label: "Zmniejszony ii", short: "ii° (zmn.)" },
      uk: { label: "Зменшений ii", short: "ii° (зм.)" },
      ur: { label: "ڈمنشڈ ii", short: "ii° (ڈمنشڈ)" },
      tr: { label: "Eksik ii", short: "ii° (eksik)" },
      ar: { label: "الثانية الناقصة ii°", short: "ii° (ناقص)" }
    },
    "ii7b5": {
      en: { label: "Half-Diminished ii", short: "iiø7" },
      fr: { label: "ii demi-diminué", short: "iiø7" },
      es: { label: "ii semidisminuido", short: "iiø7" },
      it: { label: "ii semidiminuito", short: "iiø7" },
      pl: { label: "Półzmniejszony ii", short: "iiø7" },
      uk: { label: "Напівзменшений ii", short: "iiø7" },
      ur: { label: "ہاف ڈمنشڈ ii", short: "iiø7" },
      tr: { label: "Yarı Eksik ii", short: "iiø7" },
      ar: { label: "الثانية نصف الناقصة iiø7", short: "iiø7" }
    },
    "III": {
      en: { label: "Relative Major", short: "Rel. Major" },
      fr: { label: "Relatif majeur", short: "Rel. maj." },
      es: { label: "Relativo mayor", short: "Rel. may." },
      it: { label: "Relativa maggiore", short: "Rel. magg." },
      pl: { label: "Równoległa durowa", short: "Równol. dur" },
      uk: { label: "Паралельний мажор", short: "Пар. мажор" },
      ur: { label: "ریلیٹو میجر", short: "ریلیٹو میجر" },
      tr: { label: "İlgili Majör", short: "İlg. Majör" },
      ar: { label: "الكبير النسبي", short: "كبير نسبي" }
    },
    "v": {
      en: { label: "Minor Dominant", short: "v (Min)" },
      fr: { label: "Dominante mineure", short: "v (min.)" },
      es: { label: "Dominante menor", short: "v (men.)" },
      it: { label: "Dominante minore", short: "v (min.)" },
      pl: { label: "Dominanta molowa", short: "v (mol)" },
      uk: { label: "Мінорна домінанта", short: "v (мін.)" },
      ur: { label: "مائنر ڈومیننٹ", short: "v (مائنر)" },
      tr: { label: "Minör Dominant", short: "v (Min)" },
      ar: { label: "المسيطر الصغير", short: "v (صغير)" }
    },
    "VI": {
      en: { label: "Submediant VI (Major)", short: "VI" },
      fr: { label: "Degré VI (majeur)", short: "VI" },
      es: { label: "Grado VI (mayor)", short: "VI" },
      it: { label: "Grado VI (maggiore)", short: "VI" },
      pl: { label: "Stopień VI (dur)", short: "VI" },
      uk: { label: "VI ступінь (мажор)", short: "VI" },
      ur: { label: "درجہ VI (میجر)", short: "VI" },
      tr: { label: "Alt Mediyant VI (Majör)", short: "VI" },
      ar: { label: "الدرجة السادسة VI (كبير)", short: "VI" }
    },
    "VII": {
      en: { label: "Subtonic VII (Major)", short: "VII" },
      fr: { label: "Degré VII (majeur)", short: "VII" },
      es: { label: "Grado VII (mayor)", short: "VII" },
      it: { label: "Grado VII (maggiore)", short: "VII" },
      pl: { label: "Stopień VII (dur)", short: "VII" },
      uk: { label: "VII ступінь (мажор)", short: "VII" },
      ur: { label: "درجہ VII (میجر)", short: "VII" },
      tr: { label: "Alt Tonik VII (Majör)", short: "VII" },
      ar: { label: "تحت القرار VII (كبير)", short: "VII" }
    },
    "N6": {
      en: { label: "Neapolitan (♭II⁶)", short: "N6" },
      fr: { label: "Napolitaine (♭II⁶)", short: "N6" },
      es: { label: "Napolitana (♭II⁶)", short: "N6" },
      it: { label: "Sesta napoletana (♭II⁶)", short: "N6" },
      pl: { label: "Neapolitański (♭II⁶)", short: "N6" },
      uk: { label: "Неаполітанський (♭II⁶)", short: "N6" },
      ur: { label: "نیپولیٹن (♭II⁶)", short: "N6" },
      tr: { label: "Napoliten (♭II⁶)", short: "N6" },
      ar: { label: "التآلف النابولي (♭II⁶)", short: "N6" }
    }
  },
  intervals: {
    "P1": {
      en: { label: "Perfect Unison", short: "Unison" },
      fr: { label: "Unisson juste", short: "Unisson" },
      es: { label: "Unísono justo", short: "Unísono" },
      it: { label: "Unisono giusto", short: "Unisono" },
      pl: { label: "Pryma czysta", short: "Pryma" },
      uk: { label: "Чиста прима", short: "Прима" },
      ur: { label: "پرفیکٹ یونی سن (ہم سُر)", short: "یونی سن" },
      tr: { label: "Tam Birli (Ünison)", short: "Ünison" },
      ar: { label: "تطابق تام", short: "تطابق" }
    },
    "m2": {
      en: { label: "Minor 2nd", short: "min 2nd" },
      fr: { label: "Seconde mineure", short: "2de min." },
      es: { label: "Segunda menor", short: "2.ª men." },
      it: { label: "Seconda minore", short: "2ª min." },
      pl: { label: "Sekunda mała", short: "2m" },
      uk: { label: "Мала секунда", short: "м. 2" },
      ur: { label: "مائنر سیکنڈ (کومل رے)", short: "مائنر 2nd" },
      tr: { label: "Küçük İkili", short: "küç. 2'li" },
      ar: { label: "ثانية صغيرة", short: "ثانية ص" }
    },
    "M2": {
      en: { label: "Major 2nd", short: "Maj 2nd" },
      fr: { label: "Seconde majeure", short: "2de maj." },
      es: { label: "Segunda mayor", short: "2.ª may." },
      it: { label: "Seconda maggiore", short: "2ª magg." },
      pl: { label: "Sekunda wielka", short: "2w" },
      uk: { label: "Велика секунда", short: "в. 2" },
      ur: { label: "میجر سیکنڈ (شدھ رے)", short: "میجر 2nd" },
      tr: { label: "Büyük İkili", short: "Büy. 2'li" },
      ar: { label: "ثانية كبيرة", short: "ثانية ك" }
    },
    "m3": {
      en: { label: "Minor 3rd", short: "min 3rd" },
      fr: { label: "Tierce mineure", short: "3ce min." },
      es: { label: "Tercera menor", short: "3.ª men." },
      it: { label: "Terza minore", short: "3ª min." },
      pl: { label: "Tercja mała", short: "3m" },
      uk: { label: "Мала терція", short: "м. 3" },
      ur: { label: "مائنر تھرڈ (کومل گا)", short: "مائنر 3rd" },
      tr: { label: "Küçük Üçlü", short: "küç. 3'lü" },
      ar: { label: "ثالثة صغيرة", short: "ثالثة ص" }
    },
    "M3": {
      en: { label: "Major 3rd", short: "Maj 3rd" },
      fr: { label: "Tierce majeure", short: "3ce maj." },
      es: { label: "Tercera mayor", short: "3.ª may." },
      it: { label: "Terza maggiore", short: "3ª magg." },
      pl: { label: "Tercja wielka", short: "3w" },
      uk: { label: "Велика терція", short: "в. 3" },
      ur: { label: "میجر تھرڈ (شدھ گا)", short: "میجر 3rd" },
      tr: { label: "Büyük Üçlü", short: "Büy. 3'lü" },
      ar: { label: "ثالثة كبيرة", short: "ثالثة ك" }
    },
    "P4": {
      en: { label: "Perfect 4th", short: "Perf. 4th" },
      fr: { label: "Quarte juste", short: "Quarte j." },
      es: { label: "Cuarta justa", short: "4.ª j." },
      it: { label: "Quarta giusta", short: "4ª g." },
      pl: { label: "Kwarta czysta", short: "Kwarta" },
      uk: { label: "Чиста кварта", short: "Кварта" },
      ur: { label: "پرفیکٹ فورتھ (شدھ ما)", short: "پرف۔ 4th" },
      tr: { label: "Tam Dörtlü", short: "Tam 4'lü" },
      ar: { label: "رابعة تامة", short: "رابعة ت" }
    },
    "TT": {
      en: { label: "Tritone", short: "Tritone" },
      fr: { label: "Triton", short: "Triton" },
      es: { label: "Tritono", short: "Tritono" },
      it: { label: "Tritono", short: "Tritono" },
      pl: { label: "Tryton", short: "Tryton" },
      uk: { label: "Тритон", short: "Тритон" },
      ur: { label: "ٹرائی ٹون (تیور ما)", short: "ٹرائی ٹون" },
      tr: { label: "Triton", short: "Triton" },
      ar: { label: "ترايتون", short: "ترايتون" }
    },
    "P5": {
      en: { label: "Perfect 5th", short: "Perf. 5th" },
      fr: { label: "Quinte juste", short: "Quinte j." },
      es: { label: "Quinta justa", short: "5.ª j." },
      it: { label: "Quinta giusta", short: "5ª g." },
      pl: { label: "Kwinta czysta", short: "Kwinta" },
      uk: { label: "Чиста квінта", short: "Квінта" },
      ur: { label: "پرفیکٹ ففتھ (پا)", short: "پرف۔ 5th" },
      tr: { label: "Tam Beşli", short: "Tam 5'li" },
      ar: { label: "خامسة تامة", short: "خامسة ت" }
    },
    "m6": {
      en: { label: "Minor 6th", short: "min 6th" },
      fr: { label: "Sixte mineure", short: "6te min." },
      es: { label: "Sexta menor", short: "6.ª men." },
      it: { label: "Sesta minore", short: "6ª min." },
      pl: { label: "Seksta mała", short: "6m" },
      uk: { label: "Мала секста", short: "м. 6" },
      ur: { label: "مائنر سکستھ (کومل دھا)", short: "مائنر 6th" },
      tr: { label: "Küçük Altılı", short: "küç. 6'lı" },
      ar: { label: "سادسة صغيرة", short: "سادسة ص" }
    },
    "M6": {
      en: { label: "Major 6th", short: "Maj 6th" },
      fr: { label: "Sixte majeure", short: "6te maj." },
      es: { label: "Sexta mayor", short: "6.ª may." },
      it: { label: "Sesta maggiore", short: "6ª magg." },
      pl: { label: "Seksta wielka", short: "6w" },
      uk: { label: "Велика секста", short: "в. 6" },
      ur: { label: "میجر سکستھ (شدھ دھا)", short: "میجر 6th" },
      tr: { label: "Büyük Altılı", short: "Büy. 6'lı" },
      ar: { label: "سادسة كبيرة", short: "سادسة ك" }
    },
    "m7": {
      en: { label: "Minor 7th", short: "min 7th" },
      fr: { label: "Septième mineure", short: "7e min." },
      es: { label: "Séptima menor", short: "7.ª men." },
      it: { label: "Settima minore", short: "7ª min." },
      pl: { label: "Septyma mała", short: "7m" },
      uk: { label: "Мала септима", short: "м. 7" },
      ur: { label: "مائنر سیونتھ (کومل نی)", short: "مائنر 7th" },
      tr: { label: "Küçük Yedili", short: "küç. 7'li" },
      ar: { label: "سابعة صغيرة", short: "سابعة ص" }
    },
    "M7": {
      en: { label: "Major 7th", short: "Maj 7th" },
      fr: { label: "Septième majeure", short: "7e maj." },
      es: { label: "Séptima mayor", short: "7.ª may." },
      it: { label: "Settima maggiore", short: "7ª magg." },
      pl: { label: "Septyma wielka", short: "7w" },
      uk: { label: "Велика септима", short: "в. 7" },
      ur: { label: "میجر سیونتھ (شدھ نی)", short: "میجر 7th" },
      tr: { label: "Büyük Yedili", short: "Büy. 7'li" },
      ar: { label: "سابعة كبيرة", short: "سابعة ك" }
    },
    "P8": {
      en: { label: "Perfect Octave", short: "Octave" },
      fr: { label: "Octave juste", short: "Octave" },
      es: { label: "Octava justa", short: "Octava" },
      it: { label: "Ottava giusta", short: "Ottava" },
      pl: { label: "Oktawa czysta", short: "Oktawa" },
      uk: { label: "Чиста октава", short: "Октава" },
      ur: { label: "پرفیکٹ آکٹیو (تار سپتک)", short: "آکٹیو" },
      tr: { label: "Tam Oktav", short: "Oktav" },
      ar: { label: "أوكتاف تام", short: "أوكتاف" }
    },
    "m9": {
      en: { label: "Minor 9th", short: "min 9th" },
      fr: { label: "Neuvième mineure", short: "9e min." },
      es: { label: "Novena menor", short: "9.ª men." },
      it: { label: "Nona minore", short: "9ª min." },
      pl: { label: "Nona mała", short: "9m" },
      uk: { label: "Мала нона", short: "м. 9" },
      ur: { label: "مائنر نائنتھ", short: "مائنر 9th" },
      tr: { label: "Küçük Dokuzlu", short: "küç. 9'lu" },
      ar: { label: "تاسعة صغيرة", short: "تاسعة ص" }
    },
    "M9": {
      en: { label: "Major 9th", short: "Maj 9th" },
      fr: { label: "Neuvième majeure", short: "9e maj." },
      es: { label: "Novena mayor", short: "9.ª may." },
      it: { label: "Nona maggiore", short: "9ª magg." },
      pl: { label: "Nona wielka", short: "9w" },
      uk: { label: "Велика нона", short: "в. 9" },
      ur: { label: "میجر نائنتھ", short: "میجر 9th" },
      tr: { label: "Büyük Dokuzlu", short: "Büy. 9'lu" },
      ar: { label: "تاسعة كبيرة", short: "تاسعة ك" }
    }
  },
  chords: {
    "7": {
      en: { symbol: "7", label: "Dominant 7th (1–3–5–♭7)", short: "Dom. 7" },
      fr: { symbol: "7", label: "Septième de dominante (1–3–5–♭7)", short: "Dom. 7" },
      es: { symbol: "7", label: "Séptima de dominante (1–3–5–♭7)", short: "Dom. 7" },
      it: { symbol: "7", label: "Settima di dominante (1–3–5–♭7)", short: "Dom. 7" },
      pl: { symbol: "7", label: "Dominanta septymowa (1–3–5–♭7)", short: "Dom. 7" },
      uk: { symbol: "7", label: "Домінантсептакорд (1–3–5–♭7)", short: "Домін. 7" },
      ur: { symbol: "7", label: "ڈومیننٹ سیونتھ (1–3–5–♭7)", short: "ڈوم۔ 7" },
      tr: { symbol: "7", label: "Dominant 7'li (1–3–5–♭7)", short: "Dom. 7" },
      ar: { symbol: "7", label: "سباعي مسيطر (1–3–5–♭7)", short: "مسيطر 7" }
    },
    "maj": {
      en: { symbol: "maj", label: "Major Triad (1–3–5)", short: "Major" },
      fr: { symbol: "maj", label: "Triade majeure (1–3–5)", short: "Majeur" },
      es: { symbol: "maj", label: "Tríada mayor (1–3–5)", short: "Mayor" },
      it: { symbol: "maj", label: "Triade maggiore (1–3–5)", short: "Maggiore" },
      pl: { symbol: "maj", label: "Trójdźwięk durowy (1–3–5)", short: "Dur" },
      uk: { symbol: "maj", label: "Мажорний тризвук (1–3–5)", short: "Мажор" },
      ur: { symbol: "maj", label: "میجر ٹرائڈ (1–3–5)", short: "میجر" },
      tr: { symbol: "maj", label: "Majör Üçlü Akor (1–3–5)", short: "Majör" },
      ar: { symbol: "maj", label: "تآلف ثلاثي كبير (1–3–5)", short: "كبير" }
    },
    "min": {
      en: { symbol: "m", label: "Minor Triad (1–♭3–5)", short: "Minor" },
      fr: { symbol: "m", label: "Triade mineure (1–♭3–5)", short: "Mineur" },
      es: { symbol: "m", label: "Tríada menor (1–♭3–5)", short: "Menor" },
      it: { symbol: "m", label: "Triade minore (1–♭3–5)", short: "Minore" },
      pl: { symbol: "m", label: "Trójdźwięk molowy (1–♭3–5)", short: "Moll" },
      uk: { symbol: "m", label: "Мінорний тризвук (1–♭3–5)", short: "Мінор" },
      ur: { symbol: "m", label: "مائنر ٹرائڈ (1–♭3–5)", short: "مائنر" },
      tr: { symbol: "m", label: "Minör Üçlü Akor (1–♭3–5)", short: "Minör" },
      ar: { symbol: "m", label: "تآلف ثلاثي صغير (1–♭3–5)", short: "صغير" }
    },
    "dim": {
      en: { symbol: "dim", label: "Diminished Triad (1–♭3–♭5)", short: "Diminished" },
      fr: { symbol: "dim", label: "Triade diminuée (1–♭3–♭5)", short: "Diminué" },
      es: { symbol: "dim", label: "Tríada disminuida (1–♭3–♭5)", short: "Disminuido" },
      it: { symbol: "dim", label: "Triade diminuita (1–♭3–♭5)", short: "Diminuito" },
      pl: { symbol: "dim", label: "Trójdźwięk zmniejszony (1–♭3–♭5)", short: "Zmniejsz." },
      uk: { symbol: "dim", label: "Зменшений тризвук (1–♭3–♭5)", short: "Зменш." },
      ur: { symbol: "dim", label: "ڈِمنشڈ ٹرائڈ (1–♭3–♭5)", short: "ڈِمنشڈ" },
      tr: { symbol: "dim", label: "Eksik Üçlü Akor (1–♭3–♭5)", short: "Eksik" },
      ar: { symbol: "dim", label: "تآلف ثلاثي ناقص (1–♭3–♭5)", short: "ناقص" }
    },
    "aug": {
      en: { symbol: "aug", label: "Augmented Triad (1–3–♯5)", short: "Augmented" },
      fr: { symbol: "aug", label: "Triade augmentée (1–3–♯5)", short: "Augmenté" },
      es: { symbol: "aug", label: "Tríada aumentada (1–3–♯5)", short: "Aumentado" },
      it: { symbol: "aug", label: "Triade aumentata (1–3–♯5)", short: "Aumentato" },
      pl: { symbol: "aug", label: "Trójdźwięk zwiększony (1–3–♯5)", short: "Zwiększ." },
      uk: { symbol: "aug", label: "Збільшений тризвук (1–3–♯5)", short: "Збільш." },
      ur: { symbol: "aug", label: "آگمینٹڈ ٹرائڈ (1–3–♯5)", short: "آگمینٹڈ" },
      tr: { symbol: "aug", label: "Artık Üçlü Akor (1–3–♯5)", short: "Artık" },
      ar: { symbol: "aug", label: "تآلف ثلاثي زائد (1–3–♯5)", short: "زائد" }
    },
    "sus4": {
      en: { symbol: "sus4", label: "Suspended 4th (1–4–5)", short: "Sus 4" },
      fr: { symbol: "sus4", label: "Accord sus4 (1–4–5)", short: "Sus 4" },
      es: { symbol: "sus4", label: "Acorde sus4 (1–4–5)", short: "Sus 4" },
      it: { symbol: "sus4", label: "Accordo sus4 (1–4–5)", short: "Sus 4" },
      pl: { symbol: "sus4", label: "Akord zawieszony sus4 (1–4–5)", short: "sus4" },
      uk: { symbol: "sus4", label: "Затриманий акорд sus4 (1–4–5)", short: "sus4" },
      ur: { symbol: "sus4", label: "سسپینڈڈ فورتھ (1–4–5)", short: "Sus 4" },
      tr: { symbol: "sus4", label: "Askılı Dörtlü (1–4–5)", short: "Sus 4" },
      ar: { symbol: "sus4", label: "معلّق رابعة (1–4–5)", short: "Sus 4" }
    },
    "maj7": {
      en: { symbol: "maj7", label: "Major 7th (1–3–5–7)", short: "Major 7" },
      fr: { symbol: "maj7", label: "Septième majeure (1–3–5–7)", short: "Majeur 7" },
      es: { symbol: "maj7", label: "Séptima mayor (1–3–5–7)", short: "Mayor 7" },
      it: { symbol: "maj7", label: "Settima maggiore (1–3–5–7)", short: "Maggiore 7" },
      pl: { symbol: "maj7", label: "Wielki septymowy durowy (1–3–5–7)", short: "Maj7" },
      uk: { symbol: "maj7", label: "Великий мажорний септ. (1–3–5–7)", short: "Маж. 7" },
      ur: { symbol: "maj7", label: "میجر سیونتھ (1–3–5–7)", short: "میجر 7" },
      tr: { symbol: "maj7", label: "Majör 7'li (1–3–5–7)", short: "Majör 7" },
      ar: { symbol: "maj7", label: "سباعي كبير (1–3–5–7)", short: "كبير 7" }
    },
    "m7": {
      en: { symbol: "m7", label: "Minor 7th (1–♭3–5–♭7)", short: "Minor 7" },
      fr: { symbol: "m7", label: "Mineur septième (1–♭3–5–♭7)", short: "Mineur 7" },
      es: { symbol: "m7", label: "Menor séptima (1–♭3–5–♭7)", short: "Menor 7" },
      it: { symbol: "m7", label: "Minore settima (1–♭3–5–♭7)", short: "Minore 7" },
      pl: { symbol: "m7", label: "Mały septymowy molowy (1–♭3–5–♭7)", short: "Moll 7" },
      uk: { symbol: "m7", label: "Малий мінорний септ. (1–♭3–5–♭7)", short: "Мін. 7" },
      ur: { symbol: "m7", label: "مائنر سیونتھ (1–♭3–5–♭7)", short: "مائنر 7" },
      tr: { symbol: "m7", label: "Minör 7'li (1–♭3–5–♭7)", short: "Minör 7" },
      ar: { symbol: "m7", label: "سباعي صغير (1–♭3–5–♭7)", short: "صغير 7" }
    },
    "sus2": {
      en: { symbol: "sus2", label: "Suspended 2nd (1–2–5)", short: "Sus 2" },
      fr: { symbol: "sus2", label: "Accord sus2 (1–2–5)", short: "Sus 2" },
      es: { symbol: "sus2", label: "Acorde sus2 (1–2–5)", short: "Sus 2" },
      it: { symbol: "sus2", label: "Accordo sus2 (1–2–5)", short: "Sus 2" },
      pl: { symbol: "sus2", label: "Akord zawieszony sus2 (1–2–5)", short: "sus2" },
      uk: { symbol: "sus2", label: "Затриманий акорд sus2 (1–2–5)", short: "sus2" },
      ur: { symbol: "sus2", label: "سسپینڈڈ سیکنڈ (1–2–5)", short: "Sus 2" },
      tr: { symbol: "sus2", label: "Askılı İkili (1–2–5)", short: "Sus 2" },
      ar: { symbol: "sus2", label: "معلّق ثانية (1–2–5)", short: "Sus 2" }
    },
    "m7b5": {
      en: { symbol: "m7♭5", label: "Half-Diminished (1–♭3–♭5–♭7)", short: "Half-Dim" },
      fr: { symbol: "m7♭5", label: "Semi-diminué (1–♭3–♭5–♭7)", short: "Semi-dim." },
      es: { symbol: "m7♭5", label: "Semidisminuido (1–♭3–♭5–♭7)", short: "Semidism." },
      it: { symbol: "m7♭5", label: "Semidiminuito (1–♭3–♭5–♭7)", short: "Semidim." },
      pl: { symbol: "m7♭5", label: "Półzmniejszony (1–♭3–♭5–♭7)", short: "Półzmn." },
      uk: { symbol: "m7♭5", label: "Напівзменшений септ. (1–♭3–♭5–♭7)", short: "Напівзм." },
      ur: { symbol: "m7♭5", label: "ہاف ڈِمنشڈ (1–♭3–♭5–♭7)", short: "ہاف ڈِم" },
      tr: { symbol: "m7♭5", label: "Yarı Eksik 7'li (1–♭3–♭5–♭7)", short: "Yarı Eksik" },
      ar: { symbol: "m7♭5", label: "نصف ناقص (1–♭3–♭5–♭7)", short: "نصف ناقص" }
    },
    "dim7": {
      en: { symbol: "°7", label: "Diminished 7th (1–♭3–♭5–♭♭7)", short: "Dim 7" },
      fr: { symbol: "°7", label: "Septième diminuée (1–♭3–♭5–♭♭7)", short: "Dim. 7" },
      es: { symbol: "°7", label: "Séptima disminuida (1–♭3–♭5–♭♭7)", short: "Dism. 7" },
      it: { symbol: "°7", label: "Settima diminuita (1–♭3–♭5–♭♭7)", short: "Dim. 7" },
      pl: { symbol: "°7", label: "Zmniejszony septymowy (1–♭3–♭5–♭♭7)", short: "Zmn. 7" },
      uk: { symbol: "°7", label: "Зменшений септакорд (1–♭3–♭5–♭♭7)", short: "Зменш. 7" },
      ur: { symbol: "°7", label: "ڈِمنشڈ سیونتھ (1–♭3–♭5–♭♭7)", short: "ڈِم 7" },
      tr: { symbol: "°7", label: "Eksik 7'li (1–♭3–♭5–♭♭7)", short: "Eksik 7" },
      ar: { symbol: "°7", label: "سباعي ناقص (1–♭3–♭5–♭♭7)", short: "ناقص 7" }
    },
    "mMaj7": {
      en: { symbol: "m(maj7)", label: "Minor Major 7th (1–♭3–5–7)", short: "Min-Maj7" },
      fr: { symbol: "m(maj7)", label: "Mineur septième majeure (1–♭3–5–7)", short: "Min-Maj7" },
      es: { symbol: "m(maj7)", label: "Menor con séptima mayor (1–♭3–5–7)", short: "Men-Maj7" },
      it: { symbol: "m(maj7)", label: "Minore con settima maggiore (1–♭3–5–7)", short: "Min-Maj7" },
      pl: { symbol: "m(maj7)", label: "Molowo-wielki septymowy (1–♭3–5–7)", short: "Moll-maj7" },
      uk: { symbol: "m(maj7)", label: "Великий мінорний септ. (1–♭3–5–7)", short: "Мін-маж7" },
      ur: { symbol: "m(maj7)", label: "مائنر میجر سیونتھ (1–♭3–5–7)", short: "Min-Maj7" },
      tr: { symbol: "m(maj7)", label: "Minör-Majör 7'li (1–♭3–5–7)", short: "Min-Maj7" },
      ar: { symbol: "m(maj7)", label: "صغير سباعي كبير (1–♭3–5–7)", short: "صغير-كبير7" }
    },
    "maj9": {
      en: { symbol: "maj9", label: "Major 9th (1–3–5–7–9)", short: "Major 9" },
      fr: { symbol: "maj9", label: "Neuvième majeure (1–3–5–7–9)", short: "Majeur 9" },
      es: { symbol: "maj9", label: "Novena mayor (1–3–5–7–9)", short: "Mayor 9" },
      it: { symbol: "maj9", label: "Nona maggiore (1–3–5–7–9)", short: "Maggiore 9" },
      pl: { symbol: "maj9", label: "Wielki nonowy durowy (1–3–5–7–9)", short: "Maj9" },
      uk: { symbol: "maj9", label: "Великий мажорний нон. (1–3–5–7–9)", short: "Маж. 9" },
      ur: { symbol: "maj9", label: "میجر نائنتھ (1–3–5–7–9)", short: "میجر 9" },
      tr: { symbol: "maj9", label: "Majör 9'lu (1–3–5–7–9)", short: "Majör 9" },
      ar: { symbol: "maj9", label: "تاسعي كبير (1–3–5–7–9)", short: "كبير 9" }
    },
    "7b9": {
      en: { symbol: "7♭9", label: "Dominant 7♭9 (1–3–5–♭7–♭9)", short: "Dom. 7♭9" },
      fr: { symbol: "7♭9", label: "Dominante 7♭9 (1–3–5–♭7–♭9)", short: "Dom. 7♭9" },
      es: { symbol: "7♭9", label: "Dominante 7♭9 (1–3–5–♭7–♭9)", short: "Dom. 7♭9" },
      it: { symbol: "7♭9", label: "Dominante 7♭9 (1–3–5–♭7–♭9)", short: "Dom. 7♭9" },
      pl: { symbol: "7♭9", label: "Dominanta 7♭9 (1–3–5–♭7–♭9)", short: "Dom. 7♭9" },
      uk: { symbol: "7♭9", label: "Домінантсепт. 7♭9 (1–3–5–♭7–♭9)", short: "Домін. 7♭9" },
      ur: { symbol: "7♭9", label: "ڈومیننٹ 7♭9 (1–3–5–♭7–♭9)", short: "ڈوم۔ 7♭9" },
      tr: { symbol: "7♭9", label: "Dominant 7♭9 (1–3–5–♭7–♭9)", short: "Dom. 7♭9" },
      ar: { symbol: "7♭9", label: "مسيطر 7♭9 (1–3–5–♭7–♭9)", short: "مسيطر 7♭9" }
    },
    "7s9": {
      en: { symbol: "7♯9", label: "Dominant 7♯9 (1–3–5–♭7–♯9)", short: "Dom. 7♯9" },
      fr: { symbol: "7♯9", label: "Dominante 7♯9 (1–3–5–♭7–♯9)", short: "Dom. 7♯9" },
      es: { symbol: "7♯9", label: "Dominante 7♯9 (1–3–5–♭7–♯9)", short: "Dom. 7♯9" },
      it: { symbol: "7♯9", label: "Dominante 7♯9 (1–3–5–♭7–♯9)", short: "Dom. 7♯9" },
      pl: { symbol: "7♯9", label: "Dominanta 7♯9 (1–3–5–♭7–♯9)", short: "Dom. 7♯9" },
      uk: { symbol: "7♯9", label: "Домінантсепт. 7♯9 (1–3–5–♭7–♯9)", short: "Домін. 7♯9" },
      ur: { symbol: "7♯9", label: "ڈومیننٹ 7♯9 (1–3–5–♭7–♯9)", short: "ڈوم۔ 7♯9" },
      tr: { symbol: "7♯9", label: "Dominant 7♯9 (1–3–5–♭7–♯9)", short: "Dom. 7♯9" },
      ar: { symbol: "7♯9", label: "مسيطر 7♯9 (1–3–5–♭7–♯9)", short: "مسيطر 7♯9" }
    }
  },
  chordInversions: {
    "inv0": {
      en: { symbol: "Bass: 1", label: "Root Position (Bass: Root)", short: "Root Position" },
      fr: { symbol: "Basse : 1", label: "État fondamental (Basse : Fondamentale)", short: "État fond." },
      es: { symbol: "Bajo: 1", label: "Estado fundamental (bajo: fundamental)", short: "Estado fund." },
      it: { symbol: "Basso: 1", label: "Stato fondamentale (basso: fondamentale)", short: "Stato fond." },
      pl: { symbol: "Bas: 1", label: "Postać zasadnicza (Bas: pryma)", short: "Zasadnicza" },
      uk: { symbol: "Бас: 1", label: "Основний вид (Бас: прима)", short: "Основний" },
      ur: { symbol: "Bass: 1", label: "بنیادی حالت (باس: جڑ)", short: "بنیادی حالت" },
      tr: { symbol: "Bas: 1", label: "Kök Durum (Bas: Kök Ses)", short: "Kök Durum" },
      ar: { symbol: "Bass: 1", label: "الوضع الأساسي (الباص: النغمة الأساسية)", short: "الوضع الأساسي" }
    },
    "inv1": {
      en: { symbol: "Bass: 3", label: "1st Inversion (Bass: 3rd)", short: "1st Inversion" },
      fr: { symbol: "Basse : 3", label: "1er renversement (Basse : Tierce)", short: "1er renv." },
      es: { symbol: "Bajo: 3", label: "1.ª inversión (bajo: tercera)", short: "1.ª inv." },
      it: { symbol: "Basso: 3", label: "1° rivolto (basso: terza)", short: "1° rivolto" },
      pl: { symbol: "Bas: 3", label: "1. przewrót (Bas: tercja)", short: "1. przewrót" },
      uk: { symbol: "Бас: 3", label: "1-ше обернення (Бас: терція)", short: "1-ше оберн." },
      ur: { symbol: "Bass: 3", label: "پہلا اُلٹاؤ (باس: تیسرا)", short: "پہلا اُلٹاؤ" },
      tr: { symbol: "Bas: 3", label: "1. Çevrim (Bas: 3'lü)", short: "1. Çevrim" },
      ar: { symbol: "Bass: 3", label: "الانقلاب الأول (الباص: الثالثة)", short: "الانقلاب 1" }
    },
    "inv2": {
      en: { symbol: "Bass: 5", label: "2nd Inversion (Bass: 5th)", short: "2nd Inversion" },
      fr: { symbol: "Basse : 5", label: "2e renversement (Basse : Quinte)", short: "2e renv." },
      es: { symbol: "Bajo: 5", label: "2.ª inversión (bajo: quinta)", short: "2.ª inv." },
      it: { symbol: "Basso: 5", label: "2° rivolto (basso: quinta)", short: "2° rivolto" },
      pl: { symbol: "Bas: 5", label: "2. przewrót (Bas: kwinta)", short: "2. przewrót" },
      uk: { symbol: "Бас: 5", label: "2-ге обернення (Бас: квінта)", short: "2-ге оберн." },
      ur: { symbol: "Bass: 5", label: "دوسرا اُلٹاؤ (باس: پانچواں)", short: "دوسرا اُلٹاؤ" },
      tr: { symbol: "Bas: 5", label: "2. Çevrim (Bas: 5'li)", short: "2. Çevrim" },
      ar: { symbol: "Bass: 5", label: "الانقلاب الثاني (الباص: الخامسة)", short: "الانقلاب 2" }
    },
    "inv3": {
      en: { symbol: "Bass: 7", label: "3rd Inversion (Bass: 7th)", short: "3rd Inversion" },
      fr: { symbol: "Basse : 7", label: "3e renversement (Basse : Septième)", short: "3e renv." },
      es: { symbol: "Bajo: 7", label: "3.ª inversión (bajo: séptima)", short: "3.ª inv." },
      it: { symbol: "Basso: 7", label: "3° rivolto (basso: settima)", short: "3° rivolto" },
      pl: { symbol: "Bas: 7", label: "3. przewrót (Bas: septyma)", short: "3. przewrót" },
      uk: { symbol: "Бас: 7", label: "3-тє обернення (Бас: септима)", short: "3-тє оберн." },
      ur: { symbol: "Bass: 7", label: "تیسرا اُلٹاؤ (باس: ساتواں)", short: "تیسرا اُلٹاؤ" },
      tr: { symbol: "Bas: 7", label: "3. Çevrim (Bas: 7'li)", short: "3. Çevrim" },
      ar: { symbol: "Bass: 7", label: "الانقلاب الثالث (الباص: السابعة)", short: "الانقلاب 3" }
    }
  },
  solfegeStepsLabel: {
    "Do_low": {
      en: "Root (Do)",
      fr: "Fondamentale (Do)",
      es: "Fundamental (Do)",
      it: "Fondamentale (Do)",
      pl: "Pryma toniki (Do)",
      uk: "Основний тон (Do)",
      ur: "بنیادی سُر (Do / سا)",
      tr: "Kök Ses (Do)",
      ar: "النغمة الأساسية (Do)"
    },
    "Re": {
      en: "2nd Degree (Re → Do)",
      fr: "2e degré (Re → Do)",
      es: "2.º grado (Re → Do)",
      it: "2° grado (Re → Do)",
      pl: "II stopień (Re → Do)",
      uk: "II ступінь (Re → Do)",
      ur: "دوسرا درجہ (Re → Do)",
      tr: "2. Derece (Re → Do)",
      ar: "الدرجة الثانية (Re → Do)"
    },
    "Mi": {
      en: "3rd Degree (Mi → Do)",
      fr: "3e degré (Mi → Do)",
      es: "3.er grado (Mi → Do)",
      it: "3° grado (Mi → Do)",
      pl: "III stopień (Mi → Do)",
      uk: "III ступінь (Mi → Do)",
      ur: "تیسرا درجہ (Mi → Do)",
      tr: "3. Derece (Mi → Do)",
      ar: "الدرجة الثالثة (Mi → Do)"
    },
    "Me": {
      en: "Minor 3rd (Me → Do)",
      fr: "3e degré min. (Me → Do)",
      es: "3.er grado men. (Me → Do)",
      it: "3° grado min. (Me → Do)",
      pl: "III stopień moll (Me → Do)",
      uk: "III мінорний ступінь (Me → Do)",
      ur: "مائنر تیسرا درجہ (Me → Do)",
      tr: "Küçük Üçlü (Me → Do)",
      ar: "الثالثة الصغيرة (Me → Do)"
    },
    "Fa": {
      en: "4th Degree (Fa → Do)",
      fr: "4e degré (Fa → Do)",
      es: "4.º grado (Fa → Do)",
      it: "4° grado (Fa → Do)",
      pl: "IV stopień (Fa → Do)",
      uk: "IV ступінь (Fa → Do)",
      ur: "چوتھا درجہ (Fa → Do)",
      tr: "4. Derece (Fa → Do)",
      ar: "الدرجة الرابعة (Fa → Do)"
    },
    "Sol": {
      en: "5th Degree (Sol → Do)",
      fr: "5e degré (Sol → Do)",
      es: "5.º grado (Sol → Do)",
      it: "5° grado (Sol → Do)",
      pl: "V stopień (Sol → Do)",
      uk: "V ступінь (Sol → Do)",
      ur: "پانچواں درجہ (Sol → Do)",
      tr: "5. Derece (Sol → Do)",
      ar: "الدرجة الخامسة (Sol → Do)"
    },
    "La": {
      en: "6th Degree (La → Do)",
      fr: "6e degré (La → Do)",
      es: "6.º grado (La → Do)",
      it: "6° grado (La → Do)",
      pl: "VI stopień (La → Do)",
      uk: "VI ступінь (La → Do)",
      ur: "چھٹا درجہ (La → Do)",
      tr: "6. Derece (La → Do)",
      ar: "الدرجة السادسة (La → Do)"
    },
    "Le": {
      en: "Minor 6th (Le → Do)",
      fr: "6e degré min. (Le → Do)",
      es: "6.º grado men. (Le → Do)",
      it: "6° grado min. (Le → Do)",
      pl: "VI stopień moll (Le → Do)",
      uk: "VI мінорний ступінь (Le → Do)",
      ur: "مائنر چھٹا درجہ (Le → Do)",
      tr: "Küçük Altılı (Le → Do)",
      ar: "السادسة الصغيرة (Le → Do)"
    },
    "Ti": {
      en: "Leading Tone (Ti → Do)",
      fr: "Note sensible (Ti → Do)",
      es: "Sensible (Ti → Do)",
      it: "Sensibile (Ti → Do)",
      pl: "Dźwięk prowadzący (Ti → Do)",
      uk: "Ввідний тон (Ti → Do)",
      ur: "لیڈنگ ٹون (Ti → Do)",
      tr: "Yeden Ses (Ti → Do)",
      ar: "النغمة الحسّاسة (Ti → Do)"
    },
    "Te": {
      en: "Minor 7th (Te → Do)",
      fr: "7e degré min. (Te → Do)",
      es: "7.º grado men. (Te → Do)",
      it: "7° grado min. (Te → Do)",
      pl: "VII stopień moll (Te → Do)",
      uk: "VII мінорний ступінь (Te → Do)",
      ur: "مائنر ساتواں درجہ (Te → Do)",
      tr: "Küçük Yedili (Te → Do)",
      ar: "السابعة الصغيرة (Te → Do)"
    },
    "Do_high": {
      en: "Upper Tonic (Do)",
      fr: "Tonique à l’octave (Do)",
      es: "Tónica a la octava (Do)",
      it: "Tonica all’ottava (Do)",
      pl: "Górna tonika (Do)",
      uk: "Верхня тоніка (Do)",
      ur: "بالائی ٹانک (Do)",
      tr: "Üst Tonik (Do)",
      ar: "القرار العلوي (Do)"
    }
  },
  melodyRanges: {
    "do-fa": {
      en: { label: "Do–Fa", badge: "Do–Fa" },
      fr: { label: "Do–Fa", badge: "Do–Fa" },
      es: { label: "Do–Fa", badge: "Do–Fa" },
      it: { label: "Do–Fa", badge: "Do–Fa" },
      pl: { label: "Do–Fa", badge: "Do–Fa" },
      uk: { label: "Do–Fa", badge: "Do–Fa" },
      ur: { label: "Do–Fa", badge: "Do–Fa" },
      tr: { label: "Do–Fa", badge: "Do–Fa" },
      ar: { label: "Do–Fa", badge: "Do–Fa" }
    },
    "sol-do": {
      en: { label: "Sol–Do", badge: "Sol–Do" },
      fr: { label: "Sol–Do", badge: "Sol–Do" },
      es: { label: "Sol–Do", badge: "Sol–Do" },
      it: { label: "Sol–Do", badge: "Sol–Do" },
      pl: { label: "Sol–Do", badge: "Sol–Do" },
      uk: { label: "Sol–Do", badge: "Sol–Do" },
      ur: { label: "Sol–Do", badge: "Sol–Do" },
      tr: { label: "Sol–Do", badge: "Sol–Do" },
      ar: { label: "Sol–Do", badge: "Sol–Do" }
    },
    "full": {
      en: { label: "Full Key", badge: "Do–Do" },
      fr: { label: "Gamme entière", badge: "Do–Do" },
      es: { label: "Escala completa", badge: "Do–Do" },
      it: { label: "Scala completa", badge: "Do–Do" },
      pl: { label: "Cała gama", badge: "Do–Do" },
      uk: { label: "Уся гама", badge: "Do–Do" },
      ur: { label: "مکمل کلید", badge: "Do–Do" },
      tr: { label: "Tam Tonalite", badge: "Do–Do" },
      ar: { label: "السلم الكامل", badge: "Do–Do" }
    }
  },
  rhythmMeters: {
    "4/4": {
      en: { short: "Common 4/4", label: "4/4 Time (4 Quarters)" },
      fr: { short: "4/4 binaire", label: "Mesure 4/4 (4 noires)" },
      es: { short: "4/4 binario", label: "Compás de 4/4 (4 negras)" },
      it: { short: "4/4 binario", label: "Tempo in 4/4 (4 semiminime)" },
      pl: { short: "4/4 prosty", label: "Metrum 4/4 (Czterodzielne)" },
      uk: { short: "4/4 рівний", label: "Розмір 4/4 (Чотиридольний)" },
      ur: { short: "عام 4/4", label: "4/4 تال (4 کوارٹر بیٹس)" },
      tr: { short: "4/4 Standart", label: "4/4 Ölçü (4 Dörtlük)" },
      ar: { short: "4/4 شائع", label: "وزن 4/4 (4 نبضات سوداء)" }
    },
    "3/4": {
      en: { short: "3/4 Waltz", label: "3/4 Time (Waltz)" },
      fr: { short: "3/4 Valse", label: "Mesure 3/4 (Valse)" },
      es: { short: "3/4 vals", label: "Compás de 3/4 (vals)" },
      it: { short: "3/4 valzer", label: "Tempo in 3/4 (valzer)" },
      pl: { short: "3/4 Walc", label: "Metrum 3/4 (Walc)" },
      uk: { short: "3/4 Вальс", label: "Розмір 3/4 (Вальс)" },
      ur: { short: "3/4 والٹز", label: "3/4 تال (والٹز)" },
      tr: { short: "3/4 Vals", label: "3/4 Ölçü (Vals)" },
      ar: { short: "3/4 فالس", label: "وزن 3/4 (فالس)" }
    },
    "2/4": {
      en: { short: "2/4 March", label: "2/4 Time (March)" },
      fr: { short: "2/4 Marche", label: "Mesure 2/4 (Marche)" },
      es: { short: "2/4 marcha", label: "Compás de 2/4 (marcha)" },
      it: { short: "2/4 marcia", label: "Tempo in 2/4 (marcia)" },
      pl: { short: "2/4 Marsz", label: "Metrum 2/4 (Marsz)" },
      uk: { short: "2/4 Марш", label: "Розмір 2/4 (Марш)" },
      ur: { short: "2/4 مارچ", label: "2/4 تال (مارچ)" },
      tr: { short: "2/4 Marş", label: "2/4 Ölçü (Marş)" },
      ar: { short: "2/4 مارش", label: "وزن 2/4 (مارش)" }
    },
    "6/8": {
      en: { short: "6/8 Swinging", label: "6/8 Time (Compound 2×3)" },
      fr: { short: "6/8 balancé", label: "Mesure 6/8 (Ternaire à 2 temps)" },
      es: { short: "6/8 mecido", label: "Compás de 6/8 (ternario de 2 tiempos)" },
      it: { short: "6/8 composto", label: "Tempo in 6/8 (composto 2×3)" },
      pl: { short: "6/8 kołys.", label: "Metrum 6/8 (Złożone dwudzielne)" },
      uk: { short: "6/8 гойдалка", label: "Розмір 6/8 (Складний дводольний)" },
      ur: { short: "6/8 جھولتا", label: "6/8 تال (کمپاؤنڈ 2×3)" },
      tr: { short: "6/8 Sallantılı", label: "6/8 Ölçü (Bileşik 2×3)" },
      ar: { short: "6/8 متأرجح", label: "وزن 6/8 (مركّب 2×3)" }
    },
    "5/4": {
      en: { short: "Odd 3 + 2", label: "5/4 Time (Odd Meter 3+2)" },
      fr: { short: "5/4 (3 + 2)", label: "Mesure 5/4 (Asymétrique 3+2)" },
      es: { short: "5/4 (3 + 2)", label: "Compás de 5/4 (asimétrico 3+2)" },
      it: { short: "5/4 (3 + 2)", label: "Tempo in 5/4 (irregolare 3+2)" },
      pl: { short: "5/4 (3 + 2)", label: "Metrum 5/4 (Nieregularne 3+2)" },
      uk: { short: "5/4 (3 + 2)", label: "Розмір 5/4 (Несиметричний 3+2)" },
      ur: { short: "غیر روایتی 3+2", label: "5/4 تال (طاق تال 3+2)" },
      tr: { short: "Aksak 3 + 2", label: "5/4 Ölçü (Aksak 3+2)" },
      ar: { short: "فردي 3 + 2", label: "وزن 5/4 (وزن فردي 3+2)" }
    },
    "7/8": {
      en: { short: "Odd 2+2+3", label: "7/8 Time (Odd Meter 7/8)" },
      fr: { short: "7/8 (2+2+3)", label: "Mesure 7/8 (Asymétrique 7/8)" },
      es: { short: "7/8 (2+2+3)", label: "Compás de 7/8 (asimétrico 7/8)" },
      it: { short: "7/8 (2+2+3)", label: "Tempo in 7/8 (irregolare 7/8)" },
      pl: { short: "7/8 (2+2+3)", label: "Metrum 7/8 (Nieregularne 7/8)" },
      uk: { short: "7/8 (2+2+3)", label: "Розмір 7/8 (Несиметричний 7/8)" },
      ur: { short: "غیر روایتی 2+2+3", label: "7/8 تال (طاق تال 7/8)" },
      tr: { short: "Aksak 2+2+3", label: "7/8 Ölçü (Aksak 7/8)" },
      ar: { short: "فردي 2+2+3", label: "وزن 7/8 (وزن فردي 7/8)" }
    }
  },
  rhythmCells: {
    "quarter": {
      en: { symbol: "♩", short: "Quarter", label: "Quarter Note (1 beat)" },
      fr: { symbol: "♩", short: "Noire", label: "Noire (1 temps)" },
      es: { symbol: "♩", short: "Negra", label: "Negra (1 tiempo)" },
      it: { symbol: "♩", short: "Semiminima", label: "Semiminima (1 battito)" },
      pl: { symbol: "♩", short: "Ćwierćnuta", label: "Ćwierćnuta (1 miara)" },
      uk: { symbol: "♩", short: "Чвертка", label: "Чвертна нота (1 доля)" },
      ur: { symbol: "♩", short: "کوارٹر", label: "کوارٹر نوٹ (1 بیٹ)" },
      tr: { symbol: "♩", short: "Dörtlük", label: "Dörtlük Nota (1 vuruş)" },
      ar: { symbol: "♩", short: "سوداء", label: "نغمة سوداء (نبضة واحدة)" }
    },
    "eighth2": {
      en: { symbol: "♫", short: "2 Eighths", label: "Eighth-Note Pair (1-and)" },
      fr: { symbol: "♫", short: "2 Croches", label: "Deux croches (1-et)" },
      es: { symbol: "♫", short: "2 corcheas", label: "Dos corcheas (1-y)" },
      it: { symbol: "♫", short: "2 crome", label: "Due crome (1-e)" },
      pl: { symbol: "♫", short: "Dwie ósemki", label: "Para ósemek (1-i)" },
      uk: { symbol: "♫", short: "Дві восьмі", label: "Пара восьмих (1-і)" },
      ur: { symbol: "♫", short: "2 آٹھویں", label: "آٹھویں نوٹس کا جوڑا (1-اور)" },
      tr: { symbol: "♫", short: "2 Sekizlik", label: "İki Sekizlik Nota (1-ve)" },
      ar: { symbol: "♫", short: "ذاتا سن", label: "زوج ذات سن (1-و)" }
    },
    "rest": {
      en: { symbol: "Rest", short: "Rest", label: "Quarter Rest (Silence)" },
      fr: { symbol: "Pause", short: "Soupir", label: "Soupir (1 temps de silence)" },
      es: { symbol: "Silencio", short: "Silencio de negra", label: "Silencio de negra (1 tiempo de silencio)" },
      it: { symbol: "Pausa", short: "Pausa", label: "Pausa di semiminima (1 battito di silenzio)" },
      pl: { symbol: "Pauza", short: "Pauza", label: "Pauza ćwierćnutowa (1 miara ciszy)" },
      uk: { symbol: "Пауза", short: "Пауза", label: "Чвертна пауза (1 доля тиші)" },
      ur: { symbol: "وقفہ", short: "وقفہ", label: "کوارٹر وقفہ (خاموشی)" },
      tr: { symbol: "Es", short: "Es", label: "Dörtlük Es (Sessizlik)" },
      ar: { symbol: "سكتة", short: "سكتة", label: "سكتة سوداء (صمت)" }
    },
    "offbeat": {
      en: { symbol: "and", short: "Offbeat", label: "Eighth Rest + Eighth Note (“and”)" },
      fr: { symbol: "et", short: "Contretemps", label: "Demi-soupir + Croche (« et »)" },
      es: { symbol: "y", short: "Contratiempo", label: "Silencio de corchea + corchea («y»)" },
      it: { symbol: "e", short: "Levare", label: "Pausa di croma + croma («e»)" },
      pl: { symbol: "i", short: "Synkopa (i)", label: "Pauza ósemkowa + ósemka („i”)" },
      uk: { symbol: "і", short: "Синкопа (і)", label: "Восьма пауза + восьма («і»)" },
      ur: { symbol: "اور", short: "آف بیٹ", label: "آٹھواں وقفہ + آٹھواں نوٹ («اور»)" },
      tr: { symbol: "ve", short: "Offbeat", label: "Sekizlik Es + Sekizlik Nota («ve»)" },
      ar: { symbol: "و", short: "خارج النبضة", label: "سكتة ذات سن + ذات سن («و»)" }
    },
    "triplet": {
      en: { symbol: "3×♪", short: "Triplet", label: "Eighth-Note Triplet (3 equal)" },
      fr: { symbol: "3×♪", short: "Triolet", label: "Triolet de croches (3 égales)" },
      es: { symbol: "3×♪", short: "Tresillo", label: "Tresillo de corcheas (3 iguales)" },
      it: { symbol: "3×♪", short: "Terzina", label: "Terzina di crome (3 uguali)" },
      pl: { symbol: "3×♪", short: "Triola", label: "Triola ósemkowa (3 równe dźwięki)" },
      uk: { symbol: "3×♪", short: "Тріоль", label: "Восьма тріоль (3 рівні ноти)" },
      ur: { symbol: "3×♪", short: "ٹرپلیٹ", label: "آٹھویں کا ٹرپلیٹ (3 برابر)" },
      tr: { symbol: "3×♪", short: "Üçleme", label: "Sekizlik Üçleme (3 eşit)" },
      ar: { symbol: "3×♪", short: "ثلاثية", label: "ثلاثية ذات سن (3 متساوية)" }
    },
    "eighths16": {
      en: { symbol: "♪♬", short: "8th + two 16s", label: "Eighth + Two 16ths" },
      fr: { symbol: "♪♬", short: "Croche + 2 dbl", label: "Croche + 2 doubles croches" },
      es: { symbol: "♪♬", short: "Corchea + 2 semic.", label: "Corchea + 2 semicorcheas" },
      it: { symbol: "♪♬", short: "Croma + 2 semic.", label: "Croma + 2 semicrome" },
      pl: { symbol: "♪♬", short: "8-ka + 2×16-ka", label: "Ósemka + dwie szesnastki" },
      uk: { symbol: "♪♬", short: "8-ма + 2×16-ті", label: "Восьма + дві шістнадцяті" },
      ur: { symbol: "♪♬", short: "8واں + دو 16ویں", label: "ایک آٹھواں + دو سولہویں" },
      tr: { symbol: "♪♬", short: "8'lik + iki 16'lık", label: "Bir Sekizlik + İki Onaltılık" },
      ar: { symbol: "♪♬", short: "ذات سن + سِنَّين", label: "ذات سن + ذاتا سِنَّين" }
    },
    "sixteenths8": {
      en: { symbol: "♬♪", short: "Two 16s + 8th", label: "Two 16ths + Eighth" },
      fr: { symbol: "♬♪", short: "2 dbl + Croche", label: "2 doubles croches + Croche" },
      es: { symbol: "♬♪", short: "2 semic. + corchea", label: "2 semicorcheas + corchea" },
      it: { symbol: "♬♪", short: "2 semic. + croma", label: "2 semicrome + croma" },
      pl: { symbol: "♬♪", short: "2×16-ka + 8-ka", label: "Dwie szesnastki + ósemka" },
      uk: { symbol: "♬♪", short: "2×16-ті + 8-ма", label: "Дві шістнадцяті + восьма" },
      ur: { symbol: "♬♪", short: "دو 16ویں + 8واں", label: "دو سولہویں + ایک آٹھواں" },
      tr: { symbol: "♬♪", short: "İki 16'lık + 8'lik", label: "İki Onaltılık + Bir Sekizlik" },
      ar: { symbol: "♬♪", short: "سِنَّين + ذات سن", label: "ذاتا سِنَّين + ذات سن" }
    },
    "sixteenth4": {
      en: { symbol: "♬", short: "4× 16ths", label: "Four 16th Notes" },
      fr: { symbol: "♬", short: "4× doubles", label: "Quatre doubles croches" },
      es: { symbol: "♬", short: "4× semicorcheas", label: "Cuatro semicorcheas" },
      it: { symbol: "♬", short: "4× semicrome", label: "Quattro semicrome" },
      pl: { symbol: "♬", short: "4× 16-ki", label: "Cztery szesnastki" },
      uk: { symbol: "♬", short: "4× 16-ті", label: "Чотири шістнадцяті" },
      ur: { symbol: "♬", short: "4× 16ویں", label: "چار سولہویں نوٹس" },
      tr: { symbol: "♬", short: "4× 16'lık", label: "Dört Onaltılık Nota" },
      ar: { symbol: "♬", short: "4× ذات سِنَّين", label: "أربع نغمات ذات سِنَّين" }
    },
    "dotEighth16": {
      en: { symbol: "♩.♬", short: "Long–Short", label: "Dotted Eighth + 16th" },
      fr: { symbol: "♩.♬", short: "Long–Court", label: "Croche pointée + Double croche" },
      es: { symbol: "♩.♬", short: "Larga–corta", label: "Corchea con puntillo + semicorchea" },
      it: { symbol: "♩.♬", short: "Lunga–breve", label: "Croma puntata + semicroma" },
      pl: { symbol: "♩.♬", short: "Długa–krótka", label: "Ósemka z kropką + 16-tka" },
      uk: { symbol: "♩.♬", short: "Довга–коротка", label: "Восьма з крапкою + 16-та" },
      ur: { symbol: "♩.♬", short: "لمبا–مختصر", label: "ڈاٹڈ آٹھواں + سولہواں" },
      tr: { symbol: "♩.♬", short: "Uzun–Kısa", label: "Noktalı Sekizlik + Onaltılık" },
      ar: { symbol: "♩.♬", short: "طويل–قصير", label: "ذات سن منقوطة + ذات سِنَّين" }
    },
    "sixteenDotEighth": {
      en: { symbol: "♬♩.", short: "Short–Long", label: "16th + Dotted Eighth" },
      fr: { symbol: "♬♩.", short: "Court–Long", label: "Double croche + Croche pointée" },
      es: { symbol: "♬♩.", short: "Corta–larga", label: "Semicorchea + corchea con puntillo" },
      it: { symbol: "♬♩.", short: "Breve–lunga", label: "Semicroma + croma puntata" },
      pl: { symbol: "♬♩.", short: "Krótka–długa", label: "16-tka + ósemka z kropką" },
      uk: { symbol: "♬♩.", short: "Коротка–довга", label: "16-та + восьма з крапкою" },
      ur: { symbol: "♬♩.", short: "مختصر–لمبا", label: "سولہواں + ڈاٹڈ آٹھواں" },
      tr: { symbol: "♬♩.", short: "Kısa–Uzun", label: "Onaltılık + Noktalı Sekizlik" },
      ar: { symbol: "♬♩.", short: "قصير–طويل", label: "ذات سِنَّين + ذات سن منقوطة" }
    },
    "sync16": {
      en: { symbol: "Sync.", short: "16th Sync.", label: "16th Rest + 16th Syncopation" },
      fr: { symbol: "Sync.", short: "Syncope dbl", label: "Quart de soupir + Syncope double" },
      es: { symbol: "Sínc.", short: "Síncopa en semic.", label: "Silencio de semicorchea + síncopa en semicorcheas" },
      it: { symbol: "Sinc.", short: "Sincope in semic.", label: "Pausa di semicroma + sincope in semicrome" },
      pl: { symbol: "Synk.", short: "Synkopa 16-tk.", label: "Pauza 16-tkowa + figura synkopowana" },
      uk: { symbol: "Синк.", short: "16-та синкопа", label: "Пауза 16-та + синкопована фігура" },
      ur: { symbol: "سنکوپ", short: "16واں سنکوپ", label: "سولہواں وقفہ + سنکوپیشن" },
      tr: { symbol: "Senk.", short: "16'lık Senkop", label: "Onaltılık Es + Onaltılık Senkop" },
      ar: { symbol: "سنكوب", short: "سنكوب 16", label: "سكتة ذات سِنَّين + سنكوب" }
    }
  },
  rhythmTapLevels: {
    "1": {
      en: "Pulse Anchor",
      fr: "Ancrage de pulsation",
      es: "Anclaje del pulso",
      it: "Ancoraggio della pulsazione",
      pl: "Oparcie pulsu",
      uk: "Опора пульсу",
      ur: "نبض کا لنگر",
      tr: "Nabız Çapası",
      ar: "مرساة النبض"
    },
    "2": {
      en: "Eighths & 3/4",
      fr: "Croches & 3/4",
      es: "Corcheas y 3/4",
      it: "Crome e 3/4",
      pl: "Ósemki i 3/4",
      uk: "Восьмі та 3/4",
      ur: "آٹھویں اور 3/4",
      tr: "Sekizlikler ve 3/4",
      ar: "ذوات السن و3/4"
    },
    "3": {
      en: "Syncopation & Triplets",
      fr: "Syncopes & Triolets",
      es: "Síncopas y tresillos",
      it: "Sincopi e terzine",
      pl: "Synkopy i triole",
      uk: "Синкопи й тріолі",
      ur: "سنکوپیشن اور ٹرپلیٹس",
      tr: "Senkop ve Üçlemeler",
      ar: "السنكوب والثلاثيات"
    },
    "4": {
      en: "Blind Mode",
      fr: "Mode aveugle",
      es: "Modo a ciegas",
      it: "Modalità al buio",
      pl: "Tryb ślepy",
      uk: "Сліпий режим",
      ur: "بلائنڈ موڈ",
      tr: "Kör Mod",
      ar: "الوضع الأعمى"
    }
  },
  rhythmGrooves: {
    "march": {
      en: { roman: "March", short: "Accent 1 & 3", label: "March (Snare on 1 & 3)" },
      fr: { roman: "Marche", short: "Appui 1 & 3", label: "Marche (Caisse claire sur 1 & 3)" },
      es: { roman: "Marcha", short: "Apoyo en 1 y 3", label: "Marcha (caja en 1 y 3)" },
      it: { roman: "Marcia", short: "Accento su 1 e 3", label: "Marcia (rullante su 1 e 3)" },
      pl: { roman: "Marsz", short: "Akcent na 1 i 3", label: "Marsz (Werbel na 1 i 3)" },
      uk: { roman: "Марш", short: "Акцент 1 і 3", label: "Марш (Малий барабан на 1 і 3)" },
      ur: { roman: "مارچ", short: "زور 1 اور 3 پر", label: "مارچ (اسنیئر 1 اور 3 پر)" },
      tr: { roman: "Marş", short: "Vurgu 1 ve 3", label: "Marş (Trampet 1 ve 3'te)" },
      ar: { roman: "مارش", short: "نبر 1 و3", label: "مارش (السنير على 1 و3)" }
    },
    "backbeat": {
      en: { roman: "Backbeat", short: "Pop/Rock 2 & 4", label: "Backbeat (Snare on 2 & 4)" },
      fr: { roman: "Backbeat", short: "Pop/Rock 2 & 4", label: "Backbeat (Caisse claire sur 2 & 4)" },
      es: { roman: "Backbeat", short: "Pop/rock 2 y 4", label: "Backbeat (caja en 2 y 4)" },
      it: { roman: "Backbeat", short: "Pop/rock 2 e 4", label: "Backbeat (rullante su 2 e 4)" },
      pl: { roman: "Backbeat", short: "Pop/Rock na 2 i 4", label: "Backbeat (Werbel na 2 i 4)" },
      uk: { roman: "Бекбіт", short: "Поп/Рок 2 і 4", label: "Бекбіт (Малий барабан на 2 і 4)" },
      ur: { roman: "بیک بیٹ", short: "پاپ/راک 2 اور 4", label: "بیک بیٹ (اسنیئر 2 اور 4 پر)" },
      tr: { roman: "Backbeat", short: "Pop/Rock 2 ve 4", label: "Backbeat (Trampet 2 ve 4'te)" },
      ar: { roman: "باك بيت", short: "بوب/روك 2 و4", label: "باك بيت (السنير على 2 و4)" }
    },
    "syncopation": {
      en: { roman: "Syncop.", short: "Upbeat “and”", label: "Syncopated Groove (Offbeats)" },
      fr: { roman: "Syncopé", short: "Le « et » levé", label: "Groove syncopé (Contretemps)" },
      es: { roman: "Sincopado", short: "La «y» en alto", label: "Groove sincopado (contratiempo)" },
      it: { roman: "Sincopato", short: "La «e» in levare", label: "Groove sincopato (levare)" },
      pl: { roman: "Synkopa", short: "Przesunięcie na „i”", label: "Groove synkopowany (Na „i”)" },
      uk: { roman: "Синкопа", short: "Зміщення на «і»", label: "Синкопований ґрув (Слабка доля)" },
      ur: { roman: "سنکوپ", short: "اپ بیٹ «اور»", label: "سنکوپیٹڈ گروو (آف بیٹس)" },
      tr: { roman: "Senkop", short: "Ara vuruş «ve»", label: "Senkoplu Groove (Offbeat'ler)" },
      ar: { roman: "سنكوب", short: "نبضة «و»", label: "جروف مسنكوب (خارج النبضة)" }
    },
    "swing": {
      en: { roman: "Swing", short: "Triplet Bounce", label: "Swing / Shuffle (Triplet feel)" },
      fr: { roman: "Swing", short: "Rebond ternaire", label: "Swing / Shuffle (Ressenti ternaire)" },
      es: { roman: "Swing", short: "Rebote ternario", label: "Swing / shuffle (sensación ternaria)" },
      it: { roman: "Swing", short: "Rimbalzo ternario", label: "Swing / shuffle (feel ternario)" },
      pl: { roman: "Swing", short: "Triolowy buj", label: "Swing / Shuffle (Puls triolowy)" },
      uk: { roman: "Свінґ", short: "Тріольна гойдалка", label: "Свінґ / Шафл (Тріольна пульсація)" },
      ur: { roman: "سوئنگ", short: "ٹرپلیٹ جھول", label: "سوئنگ / شفل (ٹرپلیٹ احساس)" },
      tr: { roman: "Swing", short: "Üçleme Hissi", label: "Swing / Shuffle (Üçleme hissi)" },
      ar: { roman: "سوينج", short: "أرجحة ثلاثية", label: "سوينج / شفل (إحساس ثلاثي)" }
    },
    "poly32": {
      en: { roman: "3 vs 2", short: "Polyrhythm", label: "Polyrhythm (3 against 2)" },
      fr: { roman: "3 c. 2", short: "Polyrythmie", label: "Polyrythmie (3 pour 2)" },
      es: { roman: "3 c. 2", short: "Polirritmia", label: "Polirritmia (3 contra 2)" },
      it: { roman: "3 su 2", short: "Poliritmia", label: "Poliritmia (3 contro 2)" },
      pl: { roman: "3 na 2", short: "Polirytmia", label: "Polirytmia (3 przeciw 2)" },
      uk: { roman: "3 на 2", short: "Поліритмія", label: "Поліритмія (3 проти 2)" },
      ur: { roman: "3 بمقابلہ 2", short: "پولی ردھم", label: "پولی ردھم (2 کے خلاف 3)" },
      tr: { roman: "3'e 2", short: "Poliritim", label: "Poliritim (2'ye karşı 3)" },
      ar: { roman: "3 ضد 2", short: "تعدد إيقاعي", label: "تعدد إيقاعي (3 ضد 2)" }
    }
  },
  rhythmOffbeats: {
    "1": {
      en: { roman: "1", short: "Onbeat 1", label: "Beat 1 (Onbeat)" },
      fr: { roman: "1", short: "Temps 1", label: "Temps 1 (Appui)" },
      es: { roman: "1", short: "Tiempo 1", label: "Tiempo 1 (apoyo)" },
      it: { roman: "1", short: "Battere 1", label: "Battito 1 (battere)" },
      pl: { roman: "1", short: "Miara 1", label: "Miara 1 (Mocna)" },
      uk: { roman: "1", short: "Доля 1", label: "Доля 1 (Сильна)" },
      ur: { roman: "1", short: "آن بیٹ 1", label: "بیٹ 1 (آن بیٹ)" },
      tr: { roman: "1", short: "Vuruş 1", label: "1. Vuruş (Ana vuruş)" },
      ar: { roman: "1", short: "على النبضة 1", label: "النبضة 1 (على النبضة)" }
    },
    "2": {
      en: { roman: "2", short: "Onbeat 2", label: "Beat 2 (Onbeat)" },
      fr: { roman: "2", short: "Temps 2", label: "Temps 2 (Appui)" },
      es: { roman: "2", short: "Tiempo 2", label: "Tiempo 2 (apoyo)" },
      it: { roman: "2", short: "Battere 2", label: "Battito 2 (battere)" },
      pl: { roman: "2", short: "Miara 2", label: "Miara 2 (Mocna)" },
      uk: { roman: "2", short: "Доля 2", label: "Доля 2 (Сильна)" },
      ur: { roman: "2", short: "آن بیٹ 2", label: "بیٹ 2 (آن بیٹ)" },
      tr: { roman: "2", short: "Vuruş 2", label: "2. Vuruş (Ana vuruş)" },
      ar: { roman: "2", short: "على النبضة 2", label: "النبضة 2 (على النبضة)" }
    },
    "3": {
      en: { roman: "3", short: "Onbeat 3", label: "Beat 3 (Onbeat)" },
      fr: { roman: "3", short: "Temps 3", label: "Temps 3 (Appui)" },
      es: { roman: "3", short: "Tiempo 3", label: "Tiempo 3 (apoyo)" },
      it: { roman: "3", short: "Battere 3", label: "Battito 3 (battere)" },
      pl: { roman: "3", short: "Miara 3", label: "Miara 3 (Mocna)" },
      uk: { roman: "3", short: "Доля 3", label: "Доля 3 (Сильна)" },
      ur: { roman: "3", short: "آن بیٹ 3", label: "بیٹ 3 (آن بیٹ)" },
      tr: { roman: "3", short: "Vuruş 3", label: "3. Vuruş (Ana vuruş)" },
      ar: { roman: "3", short: "على النبضة 3", label: "النبضة 3 (على النبضة)" }
    },
    "4": {
      en: { roman: "4", short: "Onbeat 4", label: "Beat 4 (Onbeat)" },
      fr: { roman: "4", short: "Temps 4", label: "Temps 4 (Appui)" },
      es: { roman: "4", short: "Tiempo 4", label: "Tiempo 4 (apoyo)" },
      it: { roman: "4", short: "Battere 4", label: "Battito 4 (battere)" },
      pl: { roman: "4", short: "Miara 4", label: "Miara 4 (Mocna)" },
      uk: { roman: "4", short: "Доля 4", label: "Доля 4 (Сильна)" },
      ur: { roman: "4", short: "آن بیٹ 4", label: "بیٹ 4 (آن بیٹ)" },
      tr: { roman: "4", short: "Vuruş 4", label: "4. Vuruş (Ana vuruş)" },
      ar: { roman: "4", short: "على النبضة 4", label: "النبضة 4 (على النبضة)" }
    },
    "1+": {
      en: { roman: "1-and", short: "Offbeat", label: "1-and (Offbeat)" },
      fr: { roman: "1-et", short: "Contretemps", label: "1-et (Contretemps)" },
      es: { roman: "1-y", short: "Contratiempo", label: "1-y (contratiempo)" },
      it: { roman: "1-e", short: "Levare", label: "1-e (levare)" },
      pl: { roman: "1-i", short: "Między 1–2", label: "1-i (Offbeat)" },
      uk: { roman: "1-і", short: "Між 1 і 2", label: "1-і (Слабка доля)" },
      ur: { roman: "1-اور", short: "آف بیٹ", label: "1-اور (آف بیٹ)" },
      tr: { roman: "1-ve", short: "Offbeat", label: "1-ve (Ara vuruş)" },
      ar: { roman: "1-و", short: "خارج النبضة", label: "1-و (خارج النبضة)" }
    },
    "2+": {
      en: { roman: "2-and", short: "Offbeat", label: "2-and (Offbeat)" },
      fr: { roman: "2-et", short: "Contretemps", label: "2-et (Contretemps)" },
      es: { roman: "2-y", short: "Contratiempo", label: "2-y (contratiempo)" },
      it: { roman: "2-e", short: "Levare", label: "2-e (levare)" },
      pl: { roman: "2-i", short: "Między 2–3", label: "2-i (Offbeat)" },
      uk: { roman: "2-і", short: "Між 2 і 3", label: "2-і (Слабка доля)" },
      ur: { roman: "2-اور", short: "آف بیٹ", label: "2-اور (آف بیٹ)" },
      tr: { roman: "2-ve", short: "Offbeat", label: "2-ve (Ara vuruş)" },
      ar: { roman: "2-و", short: "خارج النبضة", label: "2-و (خارج النبضة)" }
    },
    "3+": {
      en: { roman: "3-and", short: "Offbeat", label: "3-and (Offbeat)" },
      fr: { roman: "3-et", short: "Contretemps", label: "3-et (Contretemps)" },
      es: { roman: "3-y", short: "Contratiempo", label: "3-y (contratiempo)" },
      it: { roman: "3-e", short: "Levare", label: "3-e (levare)" },
      pl: { roman: "3-i", short: "Między 3–4", label: "3-i (Offbeat)" },
      uk: { roman: "3-і", short: "Між 3 і 4", label: "3-і (Слабка доля)" },
      ur: { roman: "3-اور", short: "آف بیٹ", label: "3-اور (آف بیٹ)" },
      tr: { roman: "3-ve", short: "Offbeat", label: "3-ve (Ara vuruş)" },
      ar: { roman: "3-و", short: "خارج النبضة", label: "3-و (خارج النبضة)" }
    },
    "4+": {
      en: { roman: "4-and", short: "Offbeat", label: "4-and (Offbeat)" },
      fr: { roman: "4-et", short: "Contretemps", label: "4-et (Contretemps)" },
      es: { roman: "4-y", short: "Contratiempo", label: "4-y (contratiempo)" },
      it: { roman: "4-e", short: "Levare", label: "4-e (levare)" },
      pl: { roman: "4-i", short: "Między 4–1", label: "4-i (Offbeat)" },
      uk: { roman: "4-і", short: "Між 4 і 1", label: "4-і (Слабка доля)" },
      ur: { roman: "4-اور", short: "آف بیٹ", label: "4-اور (آف بیٹ)" },
      tr: { roman: "4-ve", short: "Offbeat", label: "4-ve (Ara vuruş)" },
      ar: { roman: "4-و", short: "خارج النبضة", label: "4-و (خارج النبضة)" }
    }
  },
  rhythmMicro: {
    "early": {
      en: { roman: "↖ Early", short: "Pushing", label: "Early (pushing ahead of the beat)" },
      fr: { roman: "↖ En avant", short: "Un peu devant", label: "En avant (légèrement pressé)" },
      es: { roman: "↖ Por delante", short: "Un poco adelantado", label: "Por delante (ligeramente apurado)" },
      it: { roman: "↖ In anticipo", short: "Spinge avanti", label: "In anticipo (leggermente incalzante)" },
      pl: { roman: "↖ Przed", short: "Nieco do przodu", label: "Za wcześnie (Napędza / pcha)" },
      uk: { roman: "↖ Попереду", short: "Трохи наперед", label: "Попереду (Трохи поспішає)" },
      ur: { roman: "↖ جلدی", short: "آگے دھکیلنا", label: "جلدی (بیٹ سے ذرا آگے)" },
      tr: { roman: "↖ Erken", short: "Önde (İtici)", label: "Erken (vuruşun önünde, aceleci)" },
      ar: { roman: "↖ مبكّر", short: "مندفع للأمام", label: "مبكّر (متقدّم قليلًا على النبضة)" }
    },
    "pocket": {
      en: { roman: "◎ Pocket", short: "In the Pocket", label: "Dead on the Beat (“In the Pocket”)" },
      fr: { roman: "◎ Pocket", short: "In the Pocket", label: "Pile sur le temps (« In the Pocket »)" },
      es: { roman: "◎ Pocket", short: "In the pocket", label: "Justo en el tiempo («in the pocket»)" },
      it: { roman: "◎ Pocket", short: "In the pocket", label: "Esattamente sul battito («in the pocket»)" },
      pl: { roman: "◎ W punkt", short: "W „pocket”", label: "Idealnie w „pocket” (Równo z klikiem)" },
      uk: { roman: "◎ В точку", short: "У «кишені»", label: "Рівно в «покет» (Точно в долю)" },
      ur: { roman: "◎ پاکٹ", short: "عین پاکٹ میں", label: "بالکل بیٹ پر («ان دی پاکٹ»)" },
      tr: { roman: "◎ Pocket", short: "Tam Üstünde", label: "Tam Vuruşta («In the Pocket»)" },
      ar: { roman: "◎ في الصميم", short: "على النبضة تمامًا", label: "على النبضة تمامًا («In the Pocket»)" }
    },
    "late": {
      en: { roman: "↘ Late", short: "Laid-back", label: "Late (laid-back behind the beat)" },
      fr: { roman: "↘ En arrière", short: "Laid-back", label: "En arrière (détendu, laid-back)" },
      es: { roman: "↘ Por detrás", short: "Laid-back", label: "Por detrás (relajado, laid-back)" },
      it: { roman: "↘ In ritardo", short: "Laid-back", label: "In ritardo (rilassato, laid-back)" },
      pl: { roman: "↘ Za", short: "Luźno z tyłu", label: "Za późno (Luźno / laid-back)" },
      uk: { roman: "↘ Позаду", short: "Розслаблено", label: "Позаду (Розслаблено, laid-back)" },
      ur: { roman: "↘ دیر سے", short: "پُرسکون پیچھے", label: "دیر سے (بیٹ کے پیچھے آرام سے)" },
      tr: { roman: "↘ Geç", short: "Geride (Rahat)", label: "Geç (vuruşun gerisinde, rahat)" },
      ar: { roman: "↘ متأخّر", short: "مسترخٍ خلف النبضة", label: "متأخّر (مسترخٍ خلف النبضة)" }
    }
  },
  prodFreqs: {
    "63": {
      en: { symbol: "63 Hz", roman: "63 Hz", short: "Sub-Bass", label: "63 Hz – Sub-Bass & Kick Thump" },
      fr: { symbol: "63 Hz", roman: "63 Hz", short: "Infra-basse", label: "63 Hz – Sub-Basse & Impact de grosse caisse" },
      es: { symbol: "63 Hz", roman: "63 Hz", short: "Subgrave", label: "63 Hz – subgraves e impacto del bombo" },
      it: { symbol: "63 Hz", roman: "63 Hz", short: "Sub-bassi", label: "63 Hz – sub-bassi e impatto della cassa" },
      pl: { symbol: "63 Hz", roman: "63 Hz", short: "Subbas", label: "63 Hz – Subbas i uderzenie stopy" },
      uk: { symbol: "63 Гц", roman: "63 Hz", short: "Саб-бас", label: "63 Гц – Саб-бас і удар бочки" },
      ur: { symbol: "63 Hz", roman: "63 Hz", short: "سب باس", label: "63 Hz – سب باس اور کِک تھپک" },
      tr: { symbol: "63 Hz", roman: "63 Hz", short: "Sub-Bas", label: "63 Hz – Sub-Bas ve Kick Dolgunluğu" },
      ar: { symbol: "63 Hz", roman: "63 Hz", short: "سب-باص", label: "63 Hz – سب-باص وعمق الكيك" }
    },
    "125": {
      en: { symbol: "125 Hz", roman: "125 Hz", short: "Bass", label: "125 Hz – Bass Punch & Warmth" },
      fr: { symbol: "125 Hz", roman: "125 Hz", short: "Basse", label: "125 Hz – Punch de la basse & Chaleur" },
      es: { symbol: "125 Hz", roman: "125 Hz", short: "Graves", label: "125 Hz – pegada del bajo y calidez" },
      it: { symbol: "125 Hz", roman: "125 Hz", short: "Bassi", label: "125 Hz – punch del basso e calore" },
      pl: { symbol: "125 Hz", roman: "125 Hz", short: "Bas", label: "125 Hz – Mięsistość basu i ciepło" },
      uk: { symbol: "125 Гц", roman: "125 Hz", short: "Бас", label: "125 Гц – Щільність баса й тепло" },
      ur: { symbol: "125 Hz", roman: "125 Hz", short: "باس", label: "125 Hz – باس پنچ اور گرمائش" },
      tr: { symbol: "125 Hz", roman: "125 Hz", short: "Bas", label: "125 Hz – Bas Gücü ve Sıcaklık" },
      ar: { symbol: "125 Hz", roman: "125 Hz", short: "باص", label: "125 Hz – قوة الباص والدفء" }
    },
    "250": {
      en: { symbol: "250 Hz", roman: "250 Hz", short: "Low-Mids", label: "250 Hz – Low-Mids (“Mud” Zone)" },
      fr: { symbol: "250 Hz", roman: "250 Hz", short: "Bas-médiums", label: "250 Hz – Bas-médiums (Zone « boueuse »)" },
      es: { symbol: "250 Hz", roman: "250 Hz", short: "Medios-graves", label: "250 Hz – medios-graves (zona «embarrada»)" },
      it: { symbol: "250 Hz", roman: "250 Hz", short: "Medio-bassi", label: "250 Hz – medio-bassi (zona «fangosa»)" },
      pl: { symbol: "250 Hz", roman: "250 Hz", short: "Niski środek", label: "250 Hz – Ciepło / strefa zamulenia" },
      uk: { symbol: "250 Гц", roman: "250 Hz", short: "Низька середина", label: "250 Гц – Тепло / «мутна» зона" },
      ur: { symbol: "250 Hz", roman: "250 Hz", short: "لو مِڈز", label: "250 Hz – لو مِڈز («گدلا پن» زون)" },
      tr: { symbol: "250 Hz", roman: "250 Hz", short: "Alt Orta", label: "250 Hz – Alt Ortalar (Bulanıklık Bölgesi)" },
      ar: { symbol: "250 Hz", roman: "250 Hz", short: "متوسط منخفض", label: "250 Hz – المتوسط المنخفض (منطقة «العكارة»)" }
    },
    "500": {
      en: { symbol: "500 Hz", roman: "500 Hz", short: "Boxiness", label: "500 Hz – Lower Mids (“Boxy”)" },
      fr: { symbol: "500 Hz", roman: "500 Hz", short: "Boîte", label: "500 Hz – Bas du médium (Son « carton »)" },
      es: {
        symbol: "500 Hz",
        roman: "500 Hz",
        short: "Caja",
        label: "500 Hz – parte baja de los medios (sonido «de cartón»)"
      },
      it: {
        symbol: "500 Hz",
        roman: "500 Hz",
        short: "Scatolato",
        label: "500 Hz – parte bassa dei medi (effetto «scatola»)"
      },
      pl: { symbol: "500 Hz", roman: "500 Hz", short: "Karton", label: "500 Hz – Kartonowy przydźwięk" },
      uk: { symbol: "500 Гц", roman: "500 Hz", short: "Коробка", label: "500 Гц – Коробковий призвук" },
      ur: { symbol: "500 Hz", roman: "500 Hz", short: "باکسی پن", label: "500 Hz – زیریں مِڈز («باکسی»)" },
      tr: { symbol: "500 Hz", roman: "500 Hz", short: "Kutu Tınısı", label: "500 Hz – Alt-Orta Frekanslar («Boxy»)" },
      ar: { symbol: "500 Hz", roman: "500 Hz", short: "صندوقي", label: "500 Hz – المتوسط السفلي («صندوقي»)" }
    },
    "800": {
      en: { symbol: "800 Hz", roman: "800 Hz", short: "Core Mids", label: "800 Hz – Nasal Mids & Wood" },
      fr: { symbol: "800 Hz", roman: "800 Hz", short: "Médium nasal", label: "800 Hz – Médiums nasaux & Bois" },
      es: { symbol: "800 Hz", roman: "800 Hz", short: "Medio nasal", label: "800 Hz – medios nasales y madera" },
      it: { symbol: "800 Hz", roman: "800 Hz", short: "Medi nasali", label: "800 Hz – medi nasali e legno" },
      pl: { symbol: "800 Hz", roman: "800 Hz", short: "Nosowość", label: "800 Hz – Nosowy środek i drewno" },
      uk: { symbol: "800 Гц", roman: "800 Hz", short: "Гнусавість", label: "800 Гц – Носовий тембр і дерево" },
      ur: { symbol: "800 Hz", roman: "800 Hz", short: "کور مِڈز", label: "800 Hz – ناک کی گونج اور لکڑی" },
      tr: { symbol: "800 Hz", roman: "800 Hz", short: "Orta Gövde", label: "800 Hz – Genizsi Ortalar ve Ahşap Tınısı" },
      ar: { symbol: "800 Hz", roman: "800 Hz", short: "قلب المتوسط", label: "800 Hz – متوسط أنفي وخشبي" }
    },
    "1000": {
      en: { symbol: "1 kHz", roman: "1 kHz", short: "Core", label: "1 kHz – Center Midrange" },
      fr: { symbol: "1 kHz", roman: "1 kHz", short: "Cœur médium", label: "1 kHz – Centre des médiums" },
      es: { symbol: "1 kHz", roman: "1 kHz", short: "Núcleo de medios", label: "1 kHz – centro de los medios" },
      it: { symbol: "1 kHz", roman: "1 kHz", short: "Centro medi", label: "1 kHz – centro della gamma media" },
      pl: { symbol: "1 kHz", roman: "1 kHz", short: "Centrum środka", label: "1 kHz – Rdzeń pasma średniego" },
      uk: { symbol: "1 кГц", roman: "1 kHz", short: "Центр середини", label: "1 кГц – Ядро середнього діапазону" },
      ur: { symbol: "1 kHz", roman: "1 kHz", short: "درمیانی", label: "1 kHz – مرکزی مِڈ رینج" },
      tr: { symbol: "1 kHz", roman: "1 kHz", short: "Merkez", label: "1 kHz – Merkez Orta Frekans" },
      ar: { symbol: "1 kHz", roman: "1 kHz", short: "المركز", label: "1 kHz – منتصف النطاق المتوسط" }
    },
    "1600": {
      en: { symbol: "1.6 kHz", roman: "1.6 kHz", short: "Attack", label: "1.6 kHz – Upper-Mid Attack" },
      fr: { symbol: "1,6 kHz", roman: "1,6 kHz", short: "Attaque", label: "1,6 kHz – Haut-médium & Attaque" },
      es: { symbol: "1,6 kHz", roman: "1,6 kHz", short: "Ataque", label: "1,6 kHz – medios-agudos y ataque" },
      it: { symbol: "1,6 kHz", roman: "1,6 kHz", short: "Attacco", label: "1,6 kHz – medio-alti e attacco" },
      pl: { symbol: "1,6 kHz", roman: "1.6 kHz", short: "Atak", label: "1,6 kHz – Wyższy środek i atak" },
      uk: { symbol: "1,6 кГц", roman: "1.6 kHz", short: "Атака", label: "1,6 кГц – Верхня середина й атака" },
      ur: { symbol: "1.6 kHz", roman: "1.6 kHz", short: "اٹیک", label: "1.6 kHz – بالائی مِڈ اٹیک" },
      tr: { symbol: "1,6 kHz", roman: "1,6 kHz", short: "Atak", label: "1,6 kHz – Üst-Orta Atak" },
      ar: { symbol: "1.6 kHz", roman: "1.6 kHz", short: "هجوم الصوت", label: "1.6 kHz – هجوم المتوسط العلوي" }
    },
    "2000": {
      en: { symbol: "2 kHz", roman: "2 kHz", short: "Presence", label: "2 kHz – Vocal Focus & Presence" },
      fr: { symbol: "2 kHz", roman: "2 kHz", short: "Présence", label: "2 kHz – Clarté vocale & Présence" },
      es: { symbol: "2 kHz", roman: "2 kHz", short: "Presencia", label: "2 kHz – claridad vocal y presencia" },
      it: { symbol: "2 kHz", roman: "2 kHz", short: "Presenza", label: "2 kHz – chiarezza vocale e presenza" },
      pl: { symbol: "2 kHz", roman: "2 kHz", short: "Prezencja", label: "2 kHz – Czytelność wokalu i prezencja" },
      uk: { symbol: "2 кГц", roman: "2 kHz", short: "Присутність", label: "2 кГц – Розбірливість вокалу й присутність" },
      ur: { symbol: "2 kHz", roman: "2 kHz", short: "موجودگی", label: "2 kHz – آواز کی صفائی اور موجودگی" },
      tr: { symbol: "2 kHz", roman: "2 kHz", short: "Varlık", label: "2 kHz – Vokal Odağı ve Varlık" },
      ar: { symbol: "2 kHz", roman: "2 kHz", short: "الحضور", label: "2 kHz – وضوح الغناء والحضور" }
    },
    "2500": {
      en: { symbol: "2.5 kHz", roman: "2.5 kHz", short: "Edge", label: "2.5 kHz – Bite & Cut-Through" },
      fr: { symbol: "2,5 kHz", roman: "2,5 kHz", short: "Mordant", label: "2,5 kHz – Mordant & Définition dans le mix" },
      es: { symbol: "2,5 kHz", roman: "2,5 kHz", short: "Mordiente", label: "2,5 kHz – mordiente y definición en la mezcla" },
      it: { symbol: "2,5 kHz", roman: "2,5 kHz", short: "Mordente", label: "2,5 kHz – mordente e definizione nel mix" },
      pl: { symbol: "2,5 kHz", roman: "2.5 kHz", short: "Ostrość", label: "2,5 kHz – Przebicie i klarowność w miksie" },
      uk: { symbol: "2,5 кГц", roman: "2.5 kHz", short: "Гострота", label: "2,5 кГц – Пробивність і читаність у міксі" },
      ur: { symbol: "2.5 kHz", roman: "2.5 kHz", short: "تیزی", label: "2.5 kHz – کاٹ اور نمایاں ہونا" },
      tr: { symbol: "2,5 kHz", roman: "2,5 kHz", short: "Keskinlik", label: "2,5 kHz – Isırıcılık ve Öne Çıkma" },
      ar: { symbol: "2.5 kHz", roman: "2.5 kHz", short: "الحدّة", label: "2.5 kHz – الحدّة والاختراق في المكس" }
    },
    "4000": {
      en: { symbol: "4 kHz", roman: "4 kHz", short: "Direct", label: "4 kHz – Definition & Consonants" },
      fr: { symbol: "4 kHz", roman: "4 kHz", short: "Précision", label: "4 kHz – Précision & Consonnes" },
      es: { symbol: "4 kHz", roman: "4 kHz", short: "Precisión", label: "4 kHz – precisión y consonantes" },
      it: { symbol: "4 kHz", roman: "4 kHz", short: "Precisione", label: "4 kHz – definizione e consonanti" },
      pl: { symbol: "4 kHz", roman: "4 kHz", short: "Kontur", label: "4 kHz – Wyrazistość i spółgłoski" },
      uk: { symbol: "4 кГц", roman: "4 kHz", short: "Чіткість", label: "4 кГц – Чіткість і приголосні звуки" },
      ur: { symbol: "4 kHz", roman: "4 kHz", short: "وضاحت", label: "4 kHz – وضاحت اور حروفِ صحیح" },
      tr: { symbol: "4 kHz", roman: "4 kHz", short: "Netlik", label: "4 kHz – Tanımlılık ve Ünsüzler" },
      ar: { symbol: "4 kHz", roman: "4 kHz", short: "التفاصيل", label: "4 kHz – الدقّة والحروف الساكنة" }
    },
    "6300": {
      en: { symbol: "6.3 kHz", roman: "6.3 kHz", short: "Sibilance", label: "6.3 kHz – Sibilance & Crispness" },
      fr: { symbol: "6,3 kHz", roman: "6,3 kHz", short: "Sibilance", label: "6,3 kHz – Sibilances & Croustillant" },
      es: { symbol: "6,3 kHz", roman: "6,3 kHz", short: "Sibilancia", label: "6,3 kHz – sibilantes y crujido" },
      it: { symbol: "6,3 kHz", roman: "6,3 kHz", short: "Sibilanti", label: "6,3 kHz – sibilanti e nitidezza" },
      pl: { symbol: "6,3 kHz", roman: "6.3 kHz", short: "Sybilanty", label: "6,3 kHz – Sybilanty (S/Sz) i chrupkość" },
      uk: { symbol: "6,3 кГц", roman: "6.3 kHz", short: "Сибілянти", label: "6,3 кГц – Сибілянти (С/Ш) і хрускіт" },
      ur: { symbol: "6.3 kHz", roman: "6.3 kHz", short: "سسکار", label: "6.3 kHz – سسکار (Sibilance) اور تازگی" },
      tr: { symbol: "6,3 kHz", roman: "6,3 kHz", short: "Islık (S)", label: "6,3 kHz – Islıklı S Sesleri ve Gevreklik" },
      ar: { symbol: "6.3 kHz", roman: "6.3 kHz", short: "الصفير", label: "6.3 kHz – الصفير (Sibilance) والنقاء" }
    },
    "8000": {
      en: { symbol: "8 kHz", roman: "8 kHz", short: "Sparkle", label: "8 kHz – High-End Sparkle & Sheen" },
      fr: { symbol: "8 kHz", roman: "8 kHz", short: "Brillance", label: "8 kHz – Brillance & Éclat des aigus" },
      es: { symbol: "8 kHz", roman: "8 kHz", short: "Brillo", label: "8 kHz – brillo y destello de los agudos" },
      it: { symbol: "8 kHz", roman: "8 kHz", short: "Brillantezza", label: "8 kHz – brillantezza e lucentezza degli alti" },
      pl: { symbol: "8 kHz", roman: "8 kHz", short: "Blask", label: "8 kHz – Dzwonkowość i jasność góry" },
      uk: { symbol: "8 кГц", roman: "8 kHz", short: "Блиск", label: "8 кГц – Дзвінкість і яскравість верху" },
      ur: { symbol: "8 kHz", roman: "8 kHz", short: "چمک", label: "8 kHz – ہائی اینڈ چمک اور نکھار" },
      tr: { symbol: "8 kHz", roman: "8 kHz", short: "Parıltı", label: "8 kHz – Tiz Parıltı ve Parlaklık" },
      ar: { symbol: "8 kHz", roman: "8 kHz", short: "البريق", label: "8 kHz – بريق الترددات العالية ولمعانها" }
    },
    "12000": {
      en: { symbol: "12 kHz", roman: "12 kHz", short: "Air", label: "12 kHz – Super-Highs & “Air” Band" },
      fr: { symbol: "12 kHz", roman: "12 kHz", short: "Air", label: "12 kHz – Extrêmes aigus & Bande « Air »" },
      es: { symbol: "12 kHz", roman: "12 kHz", short: "Aire", label: "12 kHz – agudos extremos y banda de «aire»" },
      it: { symbol: "12 kHz", roman: "12 kHz", short: "Aria", label: "12 kHz – altissimi e banda «aria»" },
      pl: { symbol: "12 kHz", roman: "12 kHz", short: "Powietrze", label: "12 kHz – Najwyższe pasmo „powietrza”" },
      uk: { symbol: "12 кГц", roman: "12 kHz", short: "Повітря", label: "12 кГц – Надвисокий діапазон «повітря»" },
      ur: { symbol: "12 kHz", roman: "12 kHz", short: "ہوا (Air)", label: "12 kHz – سپر ہائیز اور «Air» بینڈ" },
      tr: { symbol: "12 kHz", roman: "12 kHz", short: "Hava", label: "12 kHz – Üst Tizler ve «Hava» Bandı" },
      ar: { symbol: "12 kHz", roman: "12 kHz", short: "الهواء (Air)", label: "12 kHz – الترددات الفائقة ونطاق «Air»" }
    }
  },
  prodLevelLabels: {
    "tone": {
      en: { "1": "5 Bands (Basic)", "2": "8 Octave Bands", "3": "12 Bands" },
      fr: { "1": "5 bandes (Base)", "2": "8 bandes d’octave", "3": "12 bandes" },
      es: { "1": "5 bandas (básico)", "2": "8 bandas de octava", "3": "12 bandas" },
      it: { "1": "5 bande (base)", "2": "8 bande d’ottava", "3": "12 bande" },
      pl: { "1": "5 pasm (Baza)", "2": "8 pasm oktawowych", "3": "12 pasm" },
      uk: { "1": "5 смуг (База)", "2": "8 октавних смуг", "3": "12 смуг" },
      ur: { "1": "5 بینڈز (بنیادی)", "2": "8 آکٹیو بینڈز", "3": "12 بینڈز" },
      tr: { "1": "5 Bant (Temel)", "2": "8 Oktav Bandı", "3": "12 Bant" },
      ar: { "1": "5 نطاقات (أساسي)", "2": "8 نطاقات أوكتاف", "3": "12 نطاقًا" }
    },
    "eq": {
      en: { "1": "Wide EQ", "2": "Octave EQ", "3": "Surgical" },
      fr: { "1": "EQ large", "2": "EQ d’octave", "3": "Chirurgical" },
      es: { "1": "EQ amplio", "2": "EQ de octava", "3": "Quirúrgico" },
      it: { "1": "EQ ampio", "2": "EQ d’ottava", "3": "Chirurgico" },
      pl: { "1": "Szerokie EQ", "2": "EQ oktawowe", "3": "Chirurgiczne" },
      uk: { "1": "Широкий EQ", "2": "Октавний EQ", "3": "Хірургічний" },
      ur: { "1": "چوڑا EQ", "2": "آکٹیو EQ", "3": "باریک سرجیکل" },
      tr: { "1": "Geniş EQ", "2": "Oktav EQ", "3": "Cerrahi EQ" },
      ar: { "1": "EQ عريض", "2": "EQ أوكتاف", "3": "دقيق جدًا" }
    }
  },
  modes: {
    "ionian": {
      en: { roman: "Ionian", short: "Major (1 2 3 4 5 6 7)", label: "Ionian (Major Scale)" },
      fr: { roman: "Ionien", short: "Majeur (1 2 3 4 5 6 7)", label: "Ionien (Gamme majeure)" },
      es: { roman: "Jónico", short: "Mayor (1 2 3 4 5 6 7)", label: "Jónico (escala mayor)" },
      it: { roman: "Ionico", short: "Maggiore (1 2 3 4 5 6 7)", label: "Ionico (scala maggiore)" },
      pl: { roman: "Joński", short: "Dur (1 2 3 4 5 6 7)", label: "Joński (Skala durowa naturalna)" },
      uk: { roman: "Іонійський", short: "Мажор (1 2 3 4 5 6 7)", label: "Іонійський (Натуральний мажор)" },
      ur: { roman: "آئیونین", short: "میجر (1 2 3 4 5 6 7)", label: "آئیونین (میجر اسکیل / بلاول)" },
      tr: { roman: "İyonik", short: "Majör (1 2 3 4 5 6 7)", label: "İyonik (Majör Gam)" },
      ar: { roman: "أيوني", short: "كبير (1 2 3 4 5 6 7)", label: "أيوني (السلم الكبير)" }
    },
    "dorian": {
      en: { roman: "Dorian", short: "Minor w/ ♮6", label: "Dorian (1 2 b3 4 5 6 b7)" },
      fr: { roman: "Dorien", short: "Mineur av. ♮6", label: "Dorien (1 2 b3 4 5 6 b7)" },
      es: { roman: "Dórico", short: "Menor con ♮6", label: "Dórico (1 2 b3 4 5 6 b7)" },
      it: { roman: "Dorico", short: "Minore con ♮6", label: "Dorico (1 2 b3 4 5 6 b7)" },
      pl: { roman: "Dorycki", short: "Moll z ♮6", label: "Dorycki (1 2 b3 4 5 6 b7)" },
      uk: { roman: "Дорійський", short: "Мінор з ♮6", label: "Дорійський (1 2 b3 4 5 6 b7)" },
      ur: { roman: "ڈورین", short: "مائنر مع ♮6", label: "ڈورین (1 2 b3 4 5 6 b7 / کافی)" },
      tr: { roman: "Doryen", short: "♮6'lı Minör", label: "Doryen (1 2 b3 4 5 6 b7)" },
      ar: { roman: "دوري", short: "صغير مع ♮6", label: "دوري (1 2 b3 4 5 6 b7)" }
    },
    "phrygian": {
      en: { roman: "Phrygian", short: "Minor w/ b2", label: "Phrygian (1 b2 b3 4 5 b6 b7)" },
      fr: { roman: "Phrygien", short: "Mineur av. b2", label: "Phrygien (1 b2 b3 4 5 b6 b7)" },
      es: { roman: "Frigio", short: "Menor con b2", label: "Frigio (1 b2 b3 4 5 b6 b7)" },
      it: { roman: "Frigio", short: "Minore con b2", label: "Frigio (1 b2 b3 4 5 b6 b7)" },
      pl: { roman: "Frygijski", short: "Moll z b2", label: "Frygijski (1 b2 b3 4 5 b6 b7)" },
      uk: { roman: "Фригійський", short: "Мінор з b2", label: "Фригійський (1 b2 b3 4 5 b6 b7)" },
      ur: { roman: "فریجین", short: "مائنر مع b2", label: "فریجین (1 b2 b3 4 5 b6 b7 / بھیرویں)" },
      tr: { roman: "Frigyen", short: "b2'li Minör", label: "Frigyen (1 b2 b3 4 5 b6 b7)" },
      ar: { roman: "فريجي", short: "صغير مع b2", label: "فريجي (1 b2 b3 4 5 b6 b7)" }
    },
    "lydian": {
      en: { roman: "Lydian", short: "Major w/ #4", label: "Lydian (1 2 3 #4 5 6 7)" },
      fr: { roman: "Lydien", short: "Majeur av. #4", label: "Lydien (1 2 3 #4 5 6 7)" },
      es: { roman: "Lidio", short: "Mayor con #4", label: "Lidio (1 2 3 #4 5 6 7)" },
      it: { roman: "Lidio", short: "Maggiore con #4", label: "Lidio (1 2 3 #4 5 6 7)" },
      pl: { roman: "Lidyjski", short: "Dur z #4", label: "Lidyjski (1 2 3 #4 5 6 7)" },
      uk: { roman: "Лідійський", short: "Мажор з #4", label: "Лідійський (1 2 3 #4 5 6 7)" },
      ur: { roman: "لِڈین", short: "میجر مع #4", label: "لِڈین (1 2 3 #4 5 6 7 / کلیان)" },
      tr: { roman: "Lidyen", short: "#4'lü Majör", label: "Lidyen (1 2 3 #4 5 6 7)" },
      ar: { roman: "ليدي", short: "كبير مع #4", label: "ليدي (1 2 3 #4 5 6 7)" }
    },
    "mixolydian": {
      en: { roman: "Mixolydian", short: "Major w/ b7", label: "Mixolydian (1 2 3 4 5 6 b7)" },
      fr: { roman: "Mixolydien", short: "Majeur av. b7", label: "Mixolydien (1 2 3 4 5 6 b7)" },
      es: { roman: "Mixolidio", short: "Mayor con b7", label: "Mixolidio (1 2 3 4 5 6 b7)" },
      it: { roman: "Misolidio", short: "Maggiore con b7", label: "Misolidio (1 2 3 4 5 6 b7)" },
      pl: { roman: "Miksolid.", short: "Dur z b7", label: "Miksolidyjski (1 2 3 4 5 6 b7)" },
      uk: { roman: "Міксолід.", short: "Мажор з b7", label: "Міксолідійський (1 2 3 4 5 6 b7)" },
      ur: { roman: "مکسولیڈین", short: "میجر مع b7", label: "مکسولیڈین (1 2 3 4 5 6 b7 / کھماج)" },
      tr: { roman: "Miksolidyen", short: "b7'li Majör", label: "Miksolidyen (1 2 3 4 5 6 b7)" },
      ar: { roman: "ميكسوليدي", short: "كبير مع b7", label: "ميكسوليدي (1 2 3 4 5 6 b7)" }
    },
    "aeolian": {
      en: { roman: "Aeolian", short: "Natural Minor (b6, b7)", label: "Aeolian (1 2 b3 4 5 b6 b7)" },
      fr: { roman: "Éolien", short: "Mineur nat. (b6, b7)", label: "Éolien (1 2 b3 4 5 b6 b7)" },
      es: { roman: "Eólico", short: "Menor nat. (b6, b7)", label: "Eólico (1 2 b3 4 5 b6 b7)" },
      it: { roman: "Eolio", short: "Minore nat. (b6, b7)", label: "Eolio (1 2 b3 4 5 b6 b7)" },
      pl: { roman: "Eolski", short: "Moll nat. (b6, b7)", label: "Eolski (1 2 b3 4 5 b6 b7)" },
      uk: { roman: "Еолійський", short: "Нат. мінор (b6, b7)", label: "Еолійський (1 2 b3 4 5 b6 b7)" },
      ur: { roman: "ایولین", short: "نیچرل مائنر (b6, b7)", label: "ایولین (1 2 b3 4 5 b6 b7 / آساوری)" },
      tr: { roman: "Eolyen", short: "Doğal Minör (b6, b7)", label: "Eolyen (1 2 b3 4 5 b6 b7)" },
      ar: { roman: "إيولي", short: "صغير طبيعي (b6, b7)", label: "إيولي (1 2 b3 4 5 b6 b7)" }
    },
    "locrian": {
      en: { roman: "Locrian", short: "Minor w/ b2 & b5", label: "Locrian (1 b2 b3 4 b5 b6 b7)" },
      fr: { roman: "Locrien", short: "Mineur b2 & b5", label: "Locrien (1 b2 b3 4 b5 b6 b7)" },
      es: { roman: "Locrio", short: "Menor b2 y b5", label: "Locrio (1 b2 b3 4 b5 b6 b7)" },
      it: { roman: "Locrio", short: "Minore b2 e b5", label: "Locrio (1 b2 b3 4 b5 b6 b7)" },
      pl: { roman: "Lokrycki", short: "Moll b2 i b5", label: "Lokrycki (1 b2 b3 4 b5 b6 b7)" },
      uk: { roman: "Локрійський", short: "Мінор b2 і b5", label: "Локрійський (1 b2 b3 4 b5 b6 b7)" },
      ur: { roman: "لوکرین", short: "مائنر مع b2 اور b5", label: "لوکرین (1 b2 b3 4 b5 b6 b7)" },
      tr: { roman: "Lokriyen", short: "b2 ve b5'li Minör", label: "Lokriyen (1 b2 b3 4 b5 b6 b7)" },
      ar: { roman: "لوكري", short: "صغير مع b2 وb5", label: "لوكري (1 b2 b3 4 b5 b6 b7)" }
    },
    "harm_minor": {
      en: { roman: "Harm. Minor", short: "Minor w/ #7", label: "Harmonic Minor (b6 & leading 7)" },
      fr: { roman: "Min. harm.", short: "Mineur av. #7", label: "Mineur harmonique (b6 & sensible #7)" },
      es: { roman: "Men. arm.", short: "Menor con #7", label: "Menor armónica (b6 y sensible #7)" },
      it: { roman: "Min. arm.", short: "Minore con #7", label: "Minore armonica (b6 e sensibile #7)" },
      pl: { roman: "Moll harm.", short: "Moll z #7", label: "Moll harmoniczny (b6 i dźwięk prowadzący #7)" },
      uk: { roman: "Гарм. мінор", short: "Мінор з #7", label: "Гармонічний мінор (b6 і ввідний #7)" },
      ur: { roman: "ہارمونک مائنر", short: "مائنر مع #7", label: "ہارمونک مائنر (b6 اور لیڈنگ 7)" },
      tr: { roman: "Arm. Minör", short: "#7'li Minör", label: "Armonik Minör (b6 ve yeden 7)" },
      ar: { roman: "صغير هارموني", short: "صغير مع #7", label: "صغير هارموني (b6 و7 حسّاسة)" }
    }
  },
  modeLevelLabels: {
    "scale": {
      en: { "1": "4 Core Modes", "2": "All 7 Modes (C)", "3": "All 7 + Changing Root" },
      fr: { "1": "4 modes de base", "2": "Tous les 7 (Do)", "3": "7 modes + Transposition" },
      es: { "1": "4 modos básicos", "2": "Los 7 (Do)", "3": "7 modos + transposición" },
      it: { "1": "4 modi di base", "2": "Tutti e 7 (Do)", "3": "7 modi + trasposizione" },
      pl: { "1": "4 główne skale", "2": "Wszystkie 7 (w C)", "3": "Wszystkie 7 + transpozycja" },
      uk: { "1": "4 базові лади", "2": "Усі 7 (До)", "3": "Усі 7 + Транспозиція" },
      ur: { "1": "4 بنیادی موڈز", "2": "تمام 7 موڈز (C)", "3": "تمام 7 + بدلتی جڑ" },
      tr: { "1": "4 Temel Mod", "2": "7 Modun Tümü (Do)", "3": "Tümü + Değişen Kök Ses" },
      ar: { "1": "4 أنماط أساسية", "2": "جميع الأنماط الـ 7 (C)", "3": "الـ 7 كلها + تغيير الأساس" }
    },
    "char": {
      en: { "1": "Major Modes", "2": "Minor Modes", "3": "All + Harm. Minor" },
      fr: { "1": "Modes majeurs", "2": "Modes mineurs", "3": "Tous + Min. harm." },
      es: { "1": "Modos mayores", "2": "Modos menores", "3": "Todos + men. arm." },
      it: { "1": "Modi maggiori", "2": "Modi minori", "3": "Tutti + min. arm." },
      pl: { "1": "Tryby durowe", "2": "Tryby molowe", "3": "Wszystkie + moll harm." },
      uk: { "1": "Мажорні лади", "2": "Мінорні лади", "3": "Усі + Гарм. мінор" },
      ur: { "1": "میجر موڈز", "2": "مائنر موڈز", "3": "سب + ہارم۔ مائنر" },
      tr: { "1": "Majör Modlar", "2": "Minör Modlar", "3": "Tümü + Arm. Minör" },
      ar: { "1": "الأنماط الكبيرة", "2": "الأنماط الصغيرة", "3": "الكل + الصغير الهارموني" }
    },
    "cadence": {
      en: { "1": "4 Standard Chord Loops", "2": "All 6 Modal Chord Loops" },
      fr: { "1": "4 boucles standard", "2": "Les 6 boucles modales" },
      es: { "1": "4 bucles estándar", "2": "Los 6 bucles modales" },
      it: { "1": "4 giri standard", "2": "Tutti e 6 i giri modali" },
      pl: { "1": "4 główne zwroty", "2": "Wszystkie 6 zwrotów modalnych" },
      uk: { "1": "4 основні звороти", "2": "Усі 6 модальних зворотів" },
      ur: { "1": "4 معیاری کارڈ لوپس", "2": "تمام 6 موڈل کارڈ لوپس" },
      tr: { "1": "4 Standart Akor Döngüsü", "2": "6 Modal Akor Döngüsünün Tümü" },
      ar: { "1": "4 دورات تآلفات قياسية", "2": "جميع الدورات النمطية الـ 6" }
    }
  }
});
