/**
 * Lauscher • Ko-lokalisierte Texte für Meilensteine, Musiker-Titel & Bonus-Themes (alle 10 Sprachen inkl. ar)
 * 100 % lokal, ohne Punktedruck – speist js/achievements.js und das Konto (#viewSpace).
 */

const ACHIEVEMENTS_I18N = {
  // ===== 1. ENTDECKER =====
  "first-sound": {
    title: {
      de: "Erster Klang", en: "First Sound", fr: "Premier son", es: "Primer sonido",
      it: "Primo suono", pl: "Pierwszy dźwięk", uk: "Перший звук", ur: "پہلا سُر", tr: "İlk Ses", ar: "الصوت الأول"
    },
    desc: {
      de: "Deine erste Übungsaufgabe in Lauscher gelöst.",
      en: "Solved your very first exercise in Lauscher.",
      fr: "Tu as résolu ton tout premier exercice dans Lauscher.",
      es: "Has resuelto tu primer ejercicio en Lauscher.",
      it: "Hai risolto il tuo primo esercizio in Lauscher.",
      pl: "Rozwiązano pierwsze ćwiczenie w Lauscher.",
      uk: "Виконано першу вправу в Lauscher.",
      ur: "آپ نے Lauscher میں اپنی پہلی مشق حل کر لی۔",
      tr: "Lauscher'daki ilk alıştırma görevini çözdün.",
      ar: "أتممت أول تمرين لك في Lauscher."
    }
  },
  "category-explorer": {
    title: {
      de: "Weltenbummler", en: "Sound Explorer", fr: "Explorateur sonore", es: "Explorador sonoro",
      it: "Esploratore sonoro", pl: "Odkrywca brzmień", uk: "Дослідник звуків", ur: "آواز کا کھوجی", tr: "Ses Kaşifi", ar: "مستكشف الأصوات"
    },
    desc: {
      de: "In 5 verschiedene Übungskategorien hineingeschnuppert.",
      en: "Tried out 5 different exercise categories.",
      fr: "Tu as découvert 5 catégories d’exercices différentes.",
      es: "Has probado 5 categorías de ejercicios distintas.",
      it: "Hai provato 5 diverse categorie di esercizi.",
      pl: "Wypróbowano 5 różnych kategorii ćwiczeń.",
      uk: "Випробувано 5 різних категорій вправ.",
      ur: "5 مختلف مشقی زمروں کو آزمایا۔",
      tr: "5 farklı alıştırma kategorisine göz attın.",
      ar: "جرّبت 5 فئات مختلفة من التمارين."
    }
  },
  "knowledge-reader": {
    title: {
      de: "Wissensdurst", en: "Curious Mind", fr: "Esprit curieux", es: "Mente curiosa",
      it: "Mente curiosa", pl: "Głód wiedzy", uk: "Допитливий розум", ur: "متجسس ذہن", tr: "Meraklı Zihin", ar: "عقل شغوف"
    },
    desc: {
      de: "4 verschiedene Module oder Artikel im Wissens-Hub erkundet.",
      en: "Explored 4 different modules or articles in the Knowledge Hub.",
      fr: "Tu as exploré 4 modules ou articles dans l’espace Savoir.",
      es: "Has explorado 4 módulos o artículos en el centro de Saber.",
      it: "Hai esplorato 4 moduli o articoli nella sezione Teoria.",
      pl: "Przejrzano 4 różne moduły lub artykuły w bazie wiedzy.",
      uk: "Переглянуто 4 різні розділи чи статті в базі знань.",
      ur: "معلومات کے مرکز میں 4 مختلف ابواب یا مضامین پڑھے۔",
      tr: "Bilgi merkezinde 4 farklı modül veya makale keşfettin.",
      ar: "استكشفت 4 وحدات أو مقالات مختلفة في مركز المعرفة."
    }
  },
  "tool-explorer": {
    title: {
      de: "Werkzeugkasten", en: "Toolbox Pro", fr: "Boîte à outils", es: "Caja de herramientas",
      it: "Cassetta degli attrezzi", pl: "Zestaw narzędzi", uk: "Набір інструментів", ur: "ٹول باکس ماہر", tr: "Araç Kutusu Ustası", ar: "ماهر الأدوات"
    },
    desc: {
      de: "3 verschiedene Musik-Werkzeuge geöffnet (z. B. Metronom, Tuner, Griffbrett).",
      en: "Opened 3 different music tools (e.g. Metronome, Tuner, Fretboard).",
      fr: "Tu as ouvert 3 outils musicaux différents (ex. Métronome, Accordeur, Manche).",
      es: "Has abierto 3 herramientas musicales distintas (ej. Metrónomo, Afinador, Mástil).",
      it: "Hai aperto 3 strumenti diversi (es. Metronomo, Accordatore, Tastiera).",
      pl: "Otwarto 3 różne narzędzia muzyczne (np. Metronom, Stroik, Gryf).",
      uk: "Відкрито 3 різні музичні інструменти (напр. Метроном, Тюнер, Гриф).",
      ur: "3 مختلف میوزک ٹولز استعمال کیے (مثلاً میٹرونوم، ٹیونر، گٹار بورڈ)۔",
      tr: "3 farklı müzik aracını açtın (ör. Metronom, Akort Aleti, Gitar Klavyesi).",
      ar: "فتحت 3 أدوات موسيقية مختلفة (مثل المترونوم والموالِف ورقبة الجيتار)."
    }
  },
  "listen-only": {
    title: {
      de: "Entspanntes Lauschen", en: "Relaxed Listening", fr: "Écoute sereine", es: "Escucha tranquila",
      it: "Ascolto sereno", pl: "Spokojne słuchanie", uk: "Спокійне слухання", ur: "پُرسکون سماعت", tr: "Rahat Dinleme", ar: "استماع هادئ"
    },
    desc: {
      de: "Einmal den „Nur Hören“-Modus zum entspannten Mitlauschen genutzt.",
      en: "Used Listen-Only mode for relaxed, pressure-free listening.",
      fr: "Tu as utilisé le mode « Écoute seule » pour écouter sans pression.",
      es: "Has usado el modo «Solo escuchar» para entrenar sin presión.",
      it: "Hai usato la modalità «Solo ascolto» per allenarti senza fretta.",
      pl: "Użyto trybu „Tylko słuchanie” do spokojnego osłuchiwania się.",
      uk: "Використано режим «Лише слухання» для спокійного сприйняття.",
      ur: "بغیر دباؤ کے سننے کے لیے ’صرف سنیں‘ موڈ استعمال کیا۔",
      tr: "Baskısız ve rahat dinlemek için «Sadece Dinle» modunu kullandın.",
      ar: "استخدمت وضع «الاستماع فقط» للتدرّب بهدوء وبلا ضغط."
    }
  },

  // ===== 2. HÖR- & SPIELPRAXIS =====
  "streak-5": {
    title: {
      de: "Im Flow", en: "In the Flow", fr: "Dans le flow", es: "En sintonía",
      it: "Nel flusso", pl: "W rytmie", uk: "У потоці", ur: "روانی میں", tr: "Akışta", ar: "في الانسجام"
    },
    desc: {
      de: "5 richtige Antworten hintereinander in einer Sitzung.",
      en: "5 correct answers in a row during a single session.",
      fr: "5 bonnes réponses d’affilée au cours d’une séance.",
      es: "5 respuestas correctas seguidas en una sesión.",
      it: "5 risposte corrette consecutive in una sessione.",
      pl: "5 poprawnych odpowiedzi z rzędu podczas jednej sesji.",
      uk: "5 правильних відповідей поспіль за одне заняття.",
      ur: "ایک نشست میں لگاتار 5 درست جوابات۔",
      tr: "Tek bir oturumda art arda 5 doğru yanıt.",
      ar: "5 إجابات صحيحة متتالية في جلسة واحدة."
    }
  },
  "streak-10": {
    title: {
      de: "Ganz Ohr", en: "All Ears", fr: "Tout ouïe", es: "Todo oídos",
      it: "Tutto orecchi", pl: "Czujne ucho", uk: "Увесь в увазі", ur: "مکمل توجہ", tr: "Can Kulağı", ar: "كلي آذان صاغية"
    },
    desc: {
      de: "10 richtige Antworten hintereinander in einer Sitzung.",
      en: "10 correct answers in a row during a single session.",
      fr: "10 bonnes réponses d’affilée au cours d’une séance.",
      es: "10 respuestas correctas seguidas en una sesión.",
      it: "10 risposte corrette consecutive in una sessione.",
      pl: "10 poprawnych odpowiedzi z rzędu podczas jednej sesji.",
      uk: "10 правильних відповідей поспіль за одне заняття.",
      ur: "ایک نشست میں لگاتار 10 درست جوابات۔",
      tr: "Tek bir oturumda art arda 10 doğru yanıt.",
      ar: "10 إجابات صحيحة متتالية في جلسة واحدة."
    }
  },
  "three-clefs": {
    title: {
      de: "Schlüssel-Kenner", en: "Clef Navigator", fr: "Maître des clés", es: "Dominio de claves",
      it: "Esperto di chiavi", pl: "Znawca kluczy", uk: "Знавець ключів", ur: "کلیف ماہر", tr: "Anahtar Ustası", ar: "خبير المفاتيح"
    },
    desc: {
      de: "Noten im Violin-, Bass- und Altschlüssel erfolgreich gelesen.",
      en: "Successfully read notes in Treble, Bass, and Alto clefs.",
      fr: "Tu as lu des notes en clés de Sol, Fa et Ut 3.",
      es: "Has leído notas en claves de sol, fa y do en 3.ª.",
      it: "Hai letto note in chiave di violino, basso e contralto.",
      pl: "Odczytano nuty w kluczu wiolinowym, basowym i altowym.",
      uk: "Прочитано ноти у скрипковому, басовому та альтовому ключах.",
      ur: "ٹریبل، باس اور آلٹو تینوں کلیفس میں نوٹس پڑھے۔",
      tr: "Sol, Fa ve Do (Alto) anahtarlarında notaları başarıyla okudun.",
      ar: "قرأت النغمات بنجاح في مفاتيح صول وفا وألتو."
    }
  },
  "score-pilot": {
    title: {
      de: "Partitur-Lotse", en: "Score Navigator", fr: "Pilote de partition", es: "Guía de partitura",
      it: "Pilota di spartito", pl: "Nawigator partytury", uk: "Штурман партитури", ur: "اسکور گائیڈ", tr: "Partisyon Rehberi", ar: "مرشد المدونة"
    },
    desc: {
      de: "Eine Ablauf-Aufgabe mit Wiederholung, Segno oder Coda richtig gelöst.",
      en: "Solved a score roadmap puzzle with repeats, Segno, or Coda.",
      fr: "Tu as résolu un parcours de partition avec reprise, Segno ou Coda.",
      es: "Has resuelto un recorrido de partitura con repetición, Segno o Coda.",
      it: "Hai risolto un percorso di spartito con ritornello, Segno o Coda.",
      pl: "Rozwiązano zadanie z przebiegiem partytury (repetycja, Segno lub Coda).",
      uk: "Розв’язано задачу з маршрутом партитури (реприза, Segno або Кода).",
      ur: "دہرائی، سیگنو یا کوڈا والی ترتیب کا سوال درست حل کیا۔",
      tr: "Tekrar, Segno veya Coda içeren bir partisyon akışı görevini doğru çözdün.",
      ar: "أتممت تمرين مسار المدونة الموسيقية مع علامات التكرار أو Segno أو Coda."
    }
  },
  "sing-session": {
    title: {
      de: "Warme Stimme", en: "Warm Voice", fr: "Voix échauffée", es: "Voz en forma",
      it: "Voce calda", pl: "Rozgrzany głos", uk: "Теплий голос", ur: "تیار آواز", tr: "Sıcak Ses", ar: "صوت دافئ"
    },
    desc: {
      de: "Ein komplettes Programm im Bereich „Singen“ abgeschlossen.",
      en: "Completed a full routine in the Singing module.",
      fr: "Tu as terminé un programme complet dans le module Chant.",
      es: "Has completado un programa entero en el módulo de Canto.",
      it: "Hai completato un programma intero nella sezione Canto.",
      pl: "Ukończono pełny program w module Śpiew.",
      uk: "Завершено повну програму в розділі «Спів».",
      ur: "’گانا‘ ماڈیول میں ایک مکمل پروگرام پورا کیا۔",
      tr: "«Şan» bölümünde tam bir programı tamamladın.",
      ar: "أكملت برنامجاً كاملاً في وحدة «الغناء والإحماء»."
    }
  },
  "blind-groove": {
    title: {
      de: "Innerer Puls", en: "Inner Pulse", fr: "Pulsation intérieure", es: "Pulso interior",
      it: "Polso interiore", pl: "Wewnętrzny puls", uk: "Внутрішній пульс", ur: "اندرونی تال", tr: "İçsel Nabız", ar: "النبض الداخلي"
    },
    desc: {
      de: "Eine Blindflug-Runde beim Rhythmus-Nachklopfen gemeistert.",
      en: "Passed a blind-mode round in Rhythm Tap-Back.",
      fr: "Tu as réussi une manche à l’aveugle en rythme frappé.",
      es: "Has superado una ronda a ciegas en marcar el ritmo.",
      it: "Hai superato un giro alla cieca nel ritmo battuto.",
      pl: "Zaliczono rundę na ślepo w wystukiwaniu rytmu.",
      uk: "Пройдено раунд «наосліп» у відстукуванні ритму.",
      ur: "بلائنڈ موڈ میں تال تھپکنے کا مرحلہ کامیابی سے مکمل کیا۔",
      tr: "Ritim Tekrarı alıştırmasında kör mod turunu başarıyla geçtin.",
      ar: "اجتزت جولة الوضع الأعمى في تمرين إعادة نقر الإيقاع."
    }
  },
  "tritone-tamer": {
    title: {
      de: "Tritonus-Zähmer", en: "Tritone Tamer", fr: "Dompteur de triton", es: "Domador del tritono",
      it: "Domatore di tritono", pl: "Pogromca trytonu", uk: "Приборкувач тритону", ur: "ٹرائی ٹون ماہر", tr: "Triton Avcısı", ar: "مروّض الترايتون"
    },
    desc: {
      de: "Den spannungsgeladenen Tritonus 5× sicher erkannt.",
      en: "Recognized the tense tritone interval 5 times.",
      fr: "Tu as reconnu le triton 5 fois avec assurance.",
      es: "Has reconocido el tritono 5 veces con seguridad.",
      it: "Hai riconosciuto il tritono 5 volte con sicurezza.",
      pl: "Rozpoznano tryton 5 razy bez wahania.",
      uk: "Упевнено розпізнано тритон 5 разів.",
      ur: "ٹرائی ٹون کو 5 بار درست پہچانا۔",
      tr: "Gerilimli triton aralığını 5 kez güvenle tanıdın.",
      ar: "تعرّفت بثقة على مسافة الترايتون المشحونة بالتوتر 5 مرات."
    }
  },

  // ===== 3. PRÜFUNGEN =====
  "exam-first": {
    title: {
      de: "Feuertaufe", en: "First Exam", fr: "Premier examen", es: "Primer examen",
      it: "Primo esame", pl: "Pierwszy egzamin", uk: "Перший іспит", ur: "پہلا امتحان", tr: "İlk Sınav", ar: "الاختبار الأول"
    },
    desc: {
      de: "Deine erste Kategorie-Prüfung mit mindestens 80 % bestanden.",
      en: "Passed your first category exam with at least 80%.",
      fr: "Tu as réussi ton premier examen de catégorie avec au moins 80 %.",
      es: "Has aprobado tu primer examen de categoría con al menos 80 %.",
      it: "Hai superato il tuo primo esame di categoria con almeno l’80%.",
      pl: "Zdano pierwszy egzamin kategorii z wynikiem co najmniej 80%.",
      uk: "Складено перший іспит категорії щонайменше на 80%.",
      ur: "کم از کم 80% کے ساتھ اپنا پہلا امتحان پاس کیا۔",
      tr: "İlk kategori sınavını en az %80 başarıyla geçtin.",
      ar: "نجحت في أول اختبار فئة بنسبة لا تقل عن 80%."
    }
  },
  "exam-allrounder": {
    title: {
      de: "Allrounder", en: "All-Rounder", fr: "Polyvalent", es: "Todoterreno",
      it: "Polivalente", pl: "Wszechstronny", uk: "Універсал", ur: "آل راؤنڈر", tr: "Çok Yönlü", ar: "متعدد المواهب"
    },
    desc: {
      de: "Prüfungen in 3 verschiedenen Kategorien bestanden (≥ 80 %).",
      en: "Passed exams in 3 different categories (≥ 80%).",
      fr: "Tu as réussi des examens dans 3 catégories différentes (≥ 80 %).",
      es: "Has aprobado exámenes en 3 categorías distintas (≥ 80 %).",
      it: "Hai superato esami in 3 categorie diverse (≥ 80%).",
      pl: "Zdano egzaminy w 3 różnych kategoriach (≥ 80%).",
      uk: "Складено іспити в 3 різних категоріях (≥ 80%).",
      ur: "3 مختلف زمروں میں امتحانات پاس کیے (≥ 80%)۔",
      tr: "3 farklı kategoride sınavları geçtin (≥ %80).",
      ar: "نجحت في اختبارات 3 فئات مختلفة (≥ 80%)."
    }
  },
  "exam-perfect": {
    title: {
      de: "Goldenes Ohr", en: "Golden Ear", fr: "Oreille d’or", es: "Oído de oro",
      it: "Orecchio d’oro", pl: "Złote ucho", uk: "Золотий слух", ur: "سنہری کان", tr: "Altın Kulak", ar: "الأذن الذهبية"
    },
    desc: {
      de: "Eine Kategorie-Prüfung mit vollen 100 % abgeschlossen.",
      en: "Finished a category exam with a spotless 100%.",
      fr: "Tu as terminé un examen de catégorie avec 100 %.",
      es: "Has completado un examen de categoría con un 100 %.",
      it: "Hai completato un esame di categoria con il 100%.",
      pl: "Ukończono egzamin kategorii z pełnym wynikiem 100%.",
      uk: "Завершено іспит категорії з результатом 100%.",
      ur: "کسی زمرے کے امتحان میں مکمل 100% حاصل کیے۔",
      tr: "Bir kategori sınavını tam %100 ile tamamladın.",
      ar: "أتممت اختبار فئة بنتيجة كاملة 100%."
    }
  },
  "exam-notation-pro": {
    title: {
      de: "Notations-Kenner", en: "Notation Scholar", fr: "As de la notation", es: "Maestro de notación",
      it: "Maestro di notazione", pl: "Znawca notacji", uk: "Майстер нотопису", ur: "نوٹیشن عالم", tr: "Nota Bilgini", ar: "عالم التدوين"
    },
    desc: {
      de: "Die Prüfungsstufe „Symbole, Begriffe & Ablauf“ bestanden (≥ 80 %).",
      en: "Passed the “Symbols, Terms & Roadmaps” notation exam (≥ 80%).",
      fr: "Tu as réussi l’examen « Symboles, termes & structure » (≥ 80 %).",
      es: "Has aprobado el examen «Símbolos, términos y forma» (≥ 80 %).",
      it: "Hai superato l’esame «Simboli, termini e forma» (≥ 80%).",
      pl: "Zdano egzamin „Symbole, pojęcia i przebieg” (≥ 80%).",
      uk: "Складено іспит «Символи, терміни та форма» (≥ 80%).",
      ur: "’علامات، اصطلاحات اور ترتیب‘ کا امتحان پاس کیا (≥ 80%)۔",
      tr: "«Semboller, Terimler ve Akış» nota sınavını geçtin (≥ %80).",
      ar: "نجحت في اختبار «الرموز والمصطلحات ومسار المدونة» (≥ 80%)."
    }
  },

  // ===== 4. GEWOHNHEIT & STIL =====
  "days-3": {
    title: {
      de: "Dranbleiber", en: "Staying Curious", fr: "Régulier", es: "Constante",
      it: "Costante", pl: "Konsekwentny", uk: "Наполегливий", ur: "مستقل مزاج", tr: "İstikrarlı", ar: "مثابر"
    },
    desc: {
      de: "An 3 verschiedenen Tagen geübt – ganz ohne Serien-Zwang.",
      en: "Practiced on 3 different days — with zero streak pressure.",
      fr: "Tu t’es entraîné sur 3 jours différents — sans pression de série.",
      es: "Has practicado en 3 días distintos — sin presión de rachas.",
      it: "Ti sei allenato in 3 giorni diversi — senza alcuna pressione.",
      pl: "Ćwiczono w 3 różne dni — bez presji codziennych serii.",
      uk: "Заняття в 3 різні дні — без жодного тиску серій.",
      ur: "بغیر کسی دباؤ کے 3 مختلف دنوں میں مشق کی۔",
      tr: "Seri baskısı olmadan 3 farklı günde çalıştın.",
      ar: "تدرّبت في 3 أيام مختلفة — بلا أي ضغط للسلاسل اليومية."
    }
  },
  "days-7": {
    title: {
      de: "Wochen-Rhythmus", en: "Weekly Rhythm", fr: "Rythme hebdo", es: "Ritmo semanal",
      it: "Ritmo settimanale", pl: "Tygodniowy rytm", uk: "Тижневий ритм", ur: "ہفتہ وار روانی", tr: "Haftalık Ritim", ar: "إيقاع أسبوعي"
    },
    desc: {
      de: "An 7 verschiedenen Tagen insgesamt geübt – Pausen unterbrechen nichts.",
      en: "Practiced on 7 different days total — breaks never reset your progress.",
      fr: "Tu t’es entraîné sur 7 jours différents — les pauses ne font rien perdre.",
      es: "Has practicado en 7 días en total — las pausas no borran nada.",
      it: "Ti sei allenato in 7 giorni in totale — le pause non azzerano nulla.",
      pl: "Ćwiczono łącznie w 7 różnych dni — przerwy niczego nie resetują.",
      uk: "Заняття в 7 різних днів загалом — паузи нічого не обнуляють.",
      ur: "کل 7 مختلف دنوں میں مشق کی — وقفے سے کچھ ضائع نہیں ہوتا۔",
      tr: "Toplamda 7 farklı günde çalıştın — molalar hiçbir şeyi sıfırlamaz.",
      ar: "تدرّبت في 7 أيام مختلفة إجمالاً — الاستراحات لا تصفّر تقدمك أبداً."
    }
  },
  "days-21": {
    title: {
      de: "Musik im Alltag", en: "Everyday Music", fr: "Musique au quotidien", es: "Música diaria",
      it: "Musica quotidiana", pl: "Muzyka na co dzień", uk: "Музика щодня", ur: "روزمرہ موسیقی", tr: "Günlük Müzik", ar: "موسيقى يومية"
    },
    desc: {
      de: "An 21 verschiedenen Tagen insgesamt mit Lauscher geübt.",
      en: "Practiced with Lauscher on 21 different days total.",
      fr: "Tu t’es entraîné avec Lauscher sur 21 jours différents.",
      es: "Has practicado con Lauscher en 21 días distintos.",
      it: "Ti sei allenato con Lauscher in 21 giorni diversi.",
      pl: "Ćwiczono z Lauscher w 21 różnych dni.",
      uk: "Заняття з Lauscher у 21 різний день.",
      ur: "Lauscher کے ساتھ کل 21 مختلف دنوں میں مشق کی۔",
      tr: "Toplamda 21 farklı günde Lauscher ile çalıştın.",
      ar: "تدرّبت مع Lauscher في 21 يوماً مختلفاً إجمالاً."
    }
  },
  "personal-style": {
    title: {
      de: "Eigener Stil", en: "Personal Touch", fr: "Touche personnelle", es: "Estilo propio",
      it: "Stile personale", pl: "Własny styl", uk: "Власний стиль", ur: "ذاتی انداز", tr: "Kendi Tarzın", ar: "لمسة شخصية"
    },
    desc: {
      de: "Ein eigenes Farbtheme gestaltet oder einen persönlichen Übe-Mix angelegt.",
      en: "Created a custom color theme or saved your own practice mix.",
      fr: "Tu as créé ton propre thème de couleurs ou un mix personnalisé.",
      es: "Has creado tu propio tema de colores o un mix personal.",
      it: "Hai creato un tema colori personale o un mix su misura.",
      pl: "Stworzono własny motyw kolorystyczny lub osobisty miks ćwiczeń.",
      uk: "Створено власну кольорову тему або персональний мікс вправ.",
      ur: "اپنی رنگین تھیم بنائی یا ذاتی مشقی مکس محفوظ کیا۔",
      tr: "Kendi renk temanı tasarladın veya kişisel bir çalışma karışımı kaydettin.",
      ar: "صممت سمة ألوان خاصة بك أو حفظت مزيج تدريب شخصياً."
    }
  }
};

const ACHIEVEMENT_TITLES_I18N = {
  "none": {
    de: "Kein Titel", en: "No title", fr: "Aucun titre", es: "Sin título",
    it: "Nessun titolo", pl: "Bez tytułu", uk: "Без звання", ur: "کوئی لقب نہیں", tr: "Unvan yok", ar: "بلا لقب"
  },
  "title-explorer": {
    de: "Klangforscher", en: "Sound Explorer", fr: "Explorateur sonore", es: "Explorador sonoro",
    it: "Esploratore sonoro", pl: "Odkrywca brzmień", uk: "Дослідник звуку", ur: "آواز کا کھوجی", tr: "Ses Kaşifi", ar: "مستكشف الأصوات"
  },
  "title-ear": {
    de: "Feinohr", en: "Fine Ear", fr: "Oreille fine", es: "Oído fino",
    it: "Orecchio fine", pl: "Wrażliwe ucho", uk: "Тонкий слух", ur: "باریک بین سماعت", tr: "İnce Kulak", ar: "أذن مرهفة"
  },
  "title-reader": {
    de: "Blattleser", en: "Sight-Reader", fr: "Lecteur à vue", es: "Lector a vista",
    it: "Lettore a prima vista", pl: "Czytacz a vista", uk: "Читець із листа", ur: "نوٹیشن قاری", tr: "Deşifre Ustası", ar: "قارئ النوتة"
  },
  "title-groove": {
    de: "Groove-Anker", en: "Groove Anchor", fr: "Ancre du groove", es: "Ancla del groove",
    it: "Ancora del groove", pl: "Kotwica groove’u", uk: "Опора груву", ur: "گروو اینکر", tr: "Groove Çapası", ar: "مرساة الإيقاع"
  },
  "title-voice": {
    de: "Stimmkünstler", en: "Vocalist", fr: "Artiste vocal", es: "Artista vocal",
    it: "Artista vocale", pl: "Wokalista", uk: "Майстер голосу", ur: "آواز کا فنکار", tr: "Ses Sanatçısı", ar: "فنان صوتي"
  },
  "title-gold": {
    de: "Goldenes Ohr", en: "Golden Ear", fr: "Oreille d’or", es: "Oído de oro",
    it: "Orecchio d’oro", pl: "Złote ucho", uk: "Золотий слух", ur: "سنہری کان", tr: "Altın Kulak", ar: "الأذن الذهبية"
  },
  "title-allrounder": {
    de: "Allrounder", en: "All-Rounder", fr: "Polyvalent", es: "Todoterreno",
    it: "Polivalente", pl: "Wszechstronny", uk: "Універсал", ur: "آل راؤنڈر", tr: "Çok Yönlü", ar: "متعدد المواهب"
  },
  "title-steady": {
    de: "Dranbleiber", en: "Steady Learner", fr: "Persévérant", es: "Constante",
    it: "Costante", pl: "Wytrwały", uk: "Наполегливий", ur: "مستقل مزاج", tr: "İstikrarlı", ar: "متعلم مثابر"
  }
};

const ACHIEVEMENTS_UI_I18N = {
  groupAll:      { de: "Alle", en: "All", fr: "Tout", es: "Todo", it: "Tutti", pl: "Wszystkie", uk: "Усі", ur: "سب", tr: "Tümü", ar: "الكل" },
  groupExplore:  { de: "Entdecker", en: "Explorer", fr: "Découverte", es: "Exploración", it: "Scoperta", pl: "Odkrywca", uk: "Відкриття", ur: "تلاش", tr: "Keşif", ar: "الاستكشاف" },
  groupMusic:    { de: "Praxis", en: "Practice", fr: "Pratique", es: "Práctica", it: "Pratica", pl: "Praktyka", uk: "Практика", ur: "مشق", tr: "Pratik", ar: "الممارسة" },
  groupExams:    { de: "Prüfungen", en: "Exams", fr: "Examens", es: "Exámenes", it: "Esami", pl: "Egzaminy", uk: "Іспити", ur: "امتحانات", tr: "Sınavlar", ar: "الاختبارات" },
  groupHabit:    { de: "Gewohnheit", en: "Habit", fr: "Habitude", es: "Hábito", it: "Abitudine", pl: "Nawyk", uk: "Звичка", ur: "عادت", tr: "Alışkanlık", ar: "العادة" },
  toastPrefix:   { de: "Meilenstein:", en: "Milestone:", fr: "Jalon :", es: "Logro:", it: "Traguardo:", pl: "Kamień milowy:", uk: "Досягнення:", ur: "سنگِ میل:", tr: "Dönüm noktası:", ar: "إنجاز:" },
  bonusToast:    { de: "Bonus-Theme freigeschaltet:", en: "Bonus theme unlocked:", fr: "Thème bonus débloqué :", es: "Tema extra desbloqueado:", it: "Tema bonus sbloccato:", pl: "Odblokowano motyw bonusowy:", uk: "Відкрито бонусну тему:", ur: "بونس تھیم کھل گئی:", tr: "Bonus tema açıldı:", ar: "تم فتح سمة إضافية:" },
  bonusHeading:  { de: "Freischaltbare Bonus-Themes", en: "Unlockable Bonus Themes", fr: "Thèmes bonus à débloquer", es: "Temas extra desbloqueables", it: "Temi bonus sbloccabili", pl: "Bonusowe motywy do odblokowania", uk: "Бонусні теми за досягнення", ur: "کھولنے کے قابل بونس تھیمز", tr: "Açılabilir Bonus Temalar", ar: "سمات إضافية قابلة للفتح" },
  lockAt:        { de: "Ab {n} Meilensteinen", en: "At {n} milestones", fr: "Dès {n} jalons", es: "Con {n} logros", it: "Con {n} traguardi", pl: "Od {n} osiągnięć", uk: "Від {n} досягнень", ur: "{n} سنگِ میل پر", tr: "{n} dönüm noktasından itibaren", ar: "عند {n} إنجازات" },
  lockNeedMore:  { de: "Noch {n} Meilensteine bis zu diesem Bonus-Theme.", en: "{n} more milestones to unlock this bonus theme.", fr: "Encore {n} jalons pour débloquer ce thème bonus.", es: "Faltan {n} logros para desbloquear este tema.", it: "Mancano {n} traguardi per sbloccare questo tema.", pl: "Jeszcze {n} osiągnięć do odblokowania tego motywu.", uk: "Ще {n} досягнень до відкриття цієї теми.", ur: "اس بونس تھیم کے لیے مزید {n} سنگِ میل درکار ہیں۔", tr: "Bu bonus tema için {n} dönüm noktası daha gerekli.", ar: "يتبقى {n} إنجازات لفتح هذه السمة الإضافية." },
  unlockedWord:  { de: "Freigeschaltet", en: "Unlocked", fr: "Débloqué", es: "Desbloqueado", it: "Sbloccato", pl: "Odblokowano", uk: "Відкрито", ur: "کھل گیا", tr: "Açıldı", ar: "مفتوحة" },
  titleLabel:    { de: "Freigeschalteter Profil-Titel", en: "Unlocked Profile Title", fr: "Titre de profil débloqué", es: "Título de perfil desbloqueado", it: "Titolo profilo sbloccato", pl: "Odblokowany tytuł profilu", uk: "Відкрите звання профілю", ur: "کھلا ہوا پروفائل لقب", tr: "Açılan Profil Unvanı", ar: "لقب الملف الشخصي المفتوح" },
  hiddenNote:    { de: "Meilensteine & Benachrichtigungen sind ausgeblendet. Du kannst sie jederzeit wieder einschalten.", en: "Milestones & notifications are hidden. You can turn them back on anytime.", fr: "Les jalons et notifications sont masqués. Tu peux les réactiver à tout moment.", es: "Los logros y avisos están ocultos. Puedes volver a activarlos cuando quieras.", it: "Traguardi e avvisi sono nascosti. Puoi riattivarli in qualsiasi momento.", pl: "Osiągnięcia i powiadomienia są ukryte. Możesz je włączyć ponownie w każdej chwili.", uk: "Досягнення та сповіщення приховано. Їх можна ввімкнути знову будь-коли.", ur: "سنگِ میل اور اطلاعات چھپائی گئی ہیں۔ آپ انہیں کسی بھی وقت دوبارہ آن کر سکتے ہیں۔", tr: "Dönüm noktaları ve bildirimler gizlendi. İstediğin zaman tekrar açabilirsin.", ar: "تم إخفاء الإنجازات والإشعارات. يمكنك إعادة تفعيلها في أي وقت." },
  expandSummary: { de: "Sammlung anzeigen ({unlocked} / {total})", en: "Show collection ({unlocked} / {total})", fr: "Afficher la collection ({unlocked} / {total})", es: "Mostrar colección ({unlocked} / {total})", it: "Mostra raccolta ({unlocked} / {total})", pl: "Pokaż kolekcję ({unlocked} / {total})", uk: "Показати колекцію ({unlocked} / {total})", ur: "مجموعہ دیکھیں ({unlocked} / {total})", tr: "Koleksiyonu göster ({unlocked} / {total})", ar: "عرض المجموعة ({unlocked} / {total})" },
  themeConcert:  { de: "Konzertsaal", en: "Concert Hall", fr: "Salle de concert", es: "Sala de conciertos", it: "Sala da concerto", pl: "Sala koncertowa", uk: "Концертний зал", ur: "کنسرٹ ہال", tr: "Konser Salonu", ar: "قاعة الحفلات" },
  themeMidnight: { de: "Mitternachts-Jazz", en: "Midnight Jazz", fr: "Jazz de minuit", es: "Jazz de medianoche", it: "Jazz di mezzanotte", pl: "Północny jazz", uk: "Опівнічний джаз", ur: "آدھی رات جاز", tr: "Gece Yarısı Cazı", ar: "جاز منتصف الليل" },
  unlockTitle:   { de: "Neues Bonus-Theme!", en: "New bonus theme!", fr: "Nouveau thème bonus !", es: "¡Nuevo tema extra!", it: "Nuovo tema bonus!", pl: "Nowy motyw bonusowy!", uk: "Нова бонусна тема!", ur: "نئی بونس تھیم!", tr: "Yeni bonus tema!", ar: "سمة إضافية جديدة!" },
  unlockEarned:  { de: "Verdient mit {n} Meilensteinen", en: "Earned with {n} milestones", fr: "Obtenu avec {n} jalons", es: "Conseguido con {n} logros", it: "Ottenuto con {n} traguardi", pl: "Zdobyte za {n} osiągnięć", uk: "Отримано за {n} досягнень", ur: "{n} سنگِ میل سے حاصل کی", tr: "{n} dönüm noktasıyla kazanıldı", ar: "حصلت عليها بـ {n} إنجازات" },
  unlockApply:   { de: "Jetzt aktivieren", en: "Use it now", fr: "L’activer maintenant", es: "Activarlo ahora", it: "Attivalo ora", pl: "Włącz teraz", uk: "Увімкнути зараз", ur: "ابھی لگائیں", tr: "Şimdi kullan", ar: "استخدمها الآن" },
  unlockLater:   { de: "Später", en: "Later", fr: "Plus tard", es: "Más tarde", it: "Più tardi", pl: "Później", uk: "Пізніше", ur: "بعد میں", tr: "Sonra", ar: "لاحقًا" },
  taglineConcert: { de: "Der Vorhang hebt sich: samtrote Bühne, goldenes Licht und ein Saal, der nur für dich spielt.", en: "The curtain rises: a velvet stage, golden light and a hall that plays just for you.", fr: "Le rideau se lève : scène de velours, lumière dorée et une salle qui joue rien que pour toi.", es: "Se levanta el telón: escenario de terciopelo, luz dorada y una sala que suena solo para ti.", it: "Si alza il sipario: palco di velluto, luce dorata e una sala che suona solo per te.", pl: "Kurtyna w górę: aksamitna scena, złote światło i sala, która gra tylko dla ciebie.", uk: "Завіса піднімається: оксамитова сцена, золоте світло й зал, що грає лише для тебе.", ur: "پردہ اٹھتا ہے: مخملی اسٹیج، سنہری روشنی اور ایک ہال جو صرف تمہارے لیے بجتا ہے۔", tr: "Perde açılıyor: kadife sahne, altın ışık ve yalnızca senin için çalan bir salon.", ar: "يرتفع الستار: مسرح مخملي وضوء ذهبي وقاعة تعزف لك وحدك." },
  taglineMidnight: { de: "Neonlicht, Ziegelwand und Bernstein-Spots: Willkommen im Club nach Mitternacht.", en: "Neon lights, brick walls and amber spotlights: welcome to the club after midnight.", fr: "Néons, mur de briques et projecteurs ambrés : bienvenue au club après minuit.", es: "Neón, pared de ladrillo y focos ámbar: bienvenido al club después de medianoche.", it: "Neon, muro di mattoni e luci ambrate: benvenuto nel club dopo mezzanotte.", pl: "Neony, ceglana ściana i bursztynowe reflektory: witaj w klubie po północy.", uk: "Неон, цегляна стіна й бурштинові прожектори: ласкаво просимо до клубу після опівночі.", ur: "نیون روشنیاں، اینٹوں کی دیوار اور کہربائی اسپاٹ لائٹس: آدھی رات کے بعد کلب میں خوش آمدید۔", tr: "Neon ışıklar, tuğla duvar ve kehribar spotlar: gece yarısından sonra kulübe hoş geldin.", ar: "أضواء نيون وجدار من الطوب وأضواء كهرمانية: مرحبًا بك في النادي بعد منتصف الليل." }
};
