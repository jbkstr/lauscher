/**
 * Lauscher • Ko-lokalisierte Texte für Notationsbegriffe, Symbole & Ablaufzeichen (alle 9 Sprachen)
 * Speist sowohl den Übungsmodus „Symbole & Spielanweisungen“ als auch das Wissensmodul.
 */

const NOTATION_TERMS_I18N = {
  // ===== 1. DYNAMIK & LAUTSTÄRKE =====
  "ppp": {
    short: {
      de: "So leise wie möglich",
      en: "As soft as possible",
      fr: "Aussi doux que possible",
      es: "Lo más suave posible",
      it: "Il più piano possibile",
      pl: "Jak najciszej",
      uk: "Якомога тихіше",
      ur: "جتنا ممکن ہو مدھم",
      tr: "Mümkün olduğunca hafif"
    },
    desc: {
      de: "Pianississimo: die extremste Leise-Stufe – gerade noch hörbar, schwebend und zart.",
      en: "Pianississimo: the softest standard dynamic — barely audible, fragile and hushed.",
      fr: "Pianississimo : la nuance la plus faible, à la limite de l’audible.",
      es: "Pianississimo: el matiz más suave, apenas audible y sumamente delicado.",
      it: "Pianississimo: la dinamica più tenue, quasi un sussurro appena udibile.",
      pl: "Pianississimo: najcichsza z typowych dynamik — na granicy słyszalności.",
      uk: "Піанісисимо: найтихіший відтінок, на межі чутності, немов шепіт.",
      ur: "پیانی سی سیمو: سب سے ہلکی آواز، بمشکل سنائی دینے والی سرگوشی کی طرح۔",
      tr: "Pianississimo: en hafif gürlük derecesi — neredeyse fısıltı gibi, zarif ve güçlükle duyulacak kadar yumuşak."
    },
    tip: {
      de: "Drei p = dreifach leise (noch unter pp).",
      en: "Three p’s = triple soft (even quieter than pp).",
      fr: "Trois p = encore plus doux que pp.",
      es: "Tres p = aún más suave que pp.",
      it: "Tre p = ancora più lieve di pp.",
      pl: "Trzy p = jeszcze ciszej niż pp.",
      uk: "Три p = ще тихіше, ніж pp.",
      ur: "تین p یعنی pp سے بھی زیادہ مدھم۔",
      tr: "Üç p = üç kat hafif (pp'den bile daha kısık)."
    }
  },
  "pp": {
    short: {
      de: "Sehr leise",
      en: "Very soft",
      fr: "Très doux",
      es: "Muy suave",
      it: "Molto piano",
      pl: "Bardzo cicho",
      uk: "Дуже тихо",
      ur: "بہت مدھم",
      tr: "Çok hafif"
    },
    desc: {
      de: "Pianissimo: deutlich leiser als piano – ideal für zarte, intime oder geheimnisvolle Stellen.",
      en: "Pianissimo: clearly quieter than piano — used for intimate, delicate or hushed passages.",
      fr: "Pianissimo : nettement plus doux que piano, pour les passages intimes ou feutrés.",
      es: "Pianissimo: claramente más suave que piano, ideal para pasajes íntimos.",
      it: "Pianissimo: sensibilmente più debole del piano, per momenti intimi e delicati.",
      pl: "Pianissimo: wyraźnie ciszej niż piano — do delikatnych, kameralnych fragmentów.",
      uk: "Піанісимо: помітно тихіше за piano — для ніжних і камерних епізодів.",
      ur: "پیانی سیمو: پیانو سے نمایاں طور پر زیادہ مدھم، نازک حصوں کے لیے۔",
      tr: "Pianissimo: piano'dan belirgin biçimde daha hafif — narin, içten veya gizemli bölümler için idealdir."
    },
    tip: {
      de: "Italienische Steigerung auf -issimo = „sehr“.",
      en: "The Italian ending -issimo means “very”.",
      fr: "Le suffixe italien -issimo signifie « très ».",
      es: "El sufijo italiano -issimo significa «muy».",
      it: "Il suffisso -issimo indica il grado superlativo.",
      pl: "Włoska końcówka -issimo oznacza „bardzo”.",
      uk: "Італійський суфікс -issimo означає «дуже».",
      ur: "اطالوی لاحقہ -issimo کا مطلب ہے ’بہت‘۔",
      tr: "İtalyancadaki -issimo eki «çok» anlamına gelir."
    }
  },
  "p": {
    short: {
      de: "Leise",
      en: "Soft / quiet",
      fr: "Doux / faible",
      es: "Suave / bajo",
      it: "Piano / debole",
      pl: "Cicho",
      uk: "Тихо",
      ur: "مدھم",
      tr: "Hafif / kısık"
    },
    desc: {
      de: "Piano: ruhig und zurückhaltend, aber klar geformt – die wichtigste Leise-Grundstufe.",
      en: "Piano: gentle and restrained, yet still clear and focused — the core soft dynamic.",
      fr: "Piano : calme et retenu tout en restant clair — la nuance douce de référence.",
      es: "Piano: tranquilo y contenido pero claro — el matiz suave fundamental.",
      it: "Piano: contenuto e raccolto ma sempre definito — la base delle dinamiche leggere.",
      pl: "Piano: spokojnie i powściągliwie, lecz wyraźnie — podstawowa dynamika cicha.",
      uk: "Піано: спокійно й стримано, але чітко — базовий тихий рівень.",
      ur: "پیانو: پرسکون اور ہلکی مگر واضح آواز — بنیادی مدھم درجہ۔",
      tr: "Piano: sakin ve ölçülü ama yine de net ve belirgin — temel hafif gürlük derecesi."
    },
    tip: {
      de: "Daher stammt auch das Wort „Pianoforte“ (Klavier = leise und laut).",
      en: "This is where “pianoforte” (piano = soft and loud) gets its name.",
      fr: "C’est l’origine du mot « pianoforte » (doux et fort).",
      es: "De aquí viene «pianoforte» (suave y fuerte).",
      it: "Da qui nasce il nome «pianoforte» (piano e forte).",
      pl: "Stąd pochodzi nazwa „pianoforte” (cicho i głośno).",
      uk: "Звідси походить назва «фортепіано» (голосно й тихо).",
      ur: "لفظ ’پیانو فورٹے‘ (مدھم اور بلند) یہیں سے آیا ہے۔",
      tr: "«Pianoforte» (piyano = hem hafif hem güçlü) adı da buradan gelir."
    }
  },
  "mp": {
    short: {
      de: "Mäßig leise",
      en: "Moderately soft",
      fr: "Moyennement doux",
      es: "Medio suave",
      it: "Mezzo piano",
      pl: "Dość cicho",
      uk: "Помірно тихо",
      ur: "درمیانہ مدھم",
      tr: "Orta hafif"
    },
    desc: {
      de: "Mezzopiano: etwas lauter als piano, aber noch sanft – typisch für ruhige Begleitungen.",
      en: "Mezzo piano: slightly louder than piano, still gentle — common for calm accompaniments.",
      fr: "Mezzo piano : un peu plus présent que piano, tout en restant doux.",
      es: "Mezzo piano: algo más presente que piano, aún suave — común en acompañamientos.",
      it: "Mezzo piano: leggermente più pieno del piano, ma sempre morbido.",
      pl: "Mezzo piano: nieco głośniej niż piano, wciąż miękko — częste w akompaniamencie.",
      uk: "Мецо-піано: трохи голосніше за piano, але все ще м’яко — часто в акомпанементі.",
      ur: "میزو پیانو: پیانو سے ذرا بلند مگر پھر بھی نرم، پُرسکون ساتھ کے لیے۔",
      tr: "Mezzopiano: piano'dan biraz daha gür, yine de yumuşak — sakin eşlikler için sık kullanılır."
    },
    tip: {
      de: "Mezzo = halb / mittel; mp liegt direkt unter mf.",
      en: "Mezzo = half/medium; mp sits just below mf.",
      fr: "Mezzo = moyen ; mp se place juste sous mf.",
      es: "Mezzo = medio; mp está justo por debajo de mf.",
      it: "Mezzo = moderato; mp sta subito sotto mf.",
      pl: "Mezzo = średnio; mp leży tuż pod mf.",
      uk: "Mezzo = помірно; mp розташоване одразу під mf.",
      ur: "میزو کا مطلب درمیانہ ہے؛ mp بالکل mf سے نیچے ہوتا ہے۔",
      tr: "Mezzo = yarım / orta; mp, mf'nin hemen altındadır."
    }
  },
  "mf": {
    short: {
      de: "Mäßig laut",
      en: "Moderately loud",
      fr: "Moyennement fort",
      es: "Medio fuerte",
      it: "Mezzo forte",
      pl: "Dość głośno",
      uk: "Помірно голосно",
      ur: "درمیانہ بلند",
      tr: "Orta güçlü"
    },
    desc: {
      de: "Mezzoforte: natürliche, gut tragende Grundlautstärke – oft der neutrale Ausgangspunkt.",
      en: "Mezzo forte: natural, full speaking volume — often the balanced default level.",
      fr: "Mezzo forte : volume naturel et bien timbré, souvent le niveau d’équilibre.",
      es: "Mezzo forte: volumen natural y pleno, a menudo el punto de equilibrio.",
      it: "Mezzo forte: sonorità naturale e presente, spesso il livello di partenza.",
      pl: "Mezzo forte: naturalna, nośna głośność — częsty punkt wyjścia.",
      uk: "Мецо-форте: природна, виразна гучність — часто базова середина.",
      ur: "میزو فورٹے: قدرتی اور متوازن بلند آواز، اکثر عام درمیانی سطح۔",
      tr: "Mezzoforte: doğal, rahat duyulan temel ses düzeyi — genellikle dengeli başlangıç noktasıdır."
    },
    tip: {
      de: "Kräftiger als mp, aber mit Luft nach oben für echtes f.",
      en: "Fuller than mp, while still leaving headroom for true f.",
      fr: "Plus plein que mp, en gardant de la réserve pour le vrai f.",
      es: "Más lleno que mp, dejando margen para un verdadero f.",
      it: "Più pieno di mp, ma con margine verso il vero f.",
      pl: "Pełniej niż mp, ale z zapasem mocy na prawdziwe f.",
      uk: "Насиченіше за mp, але із запасом для справжнього f.",
      ur: "mp سے زیادہ بھرپور، مگر اصل f کے لیے گنجائش باقی رکھتا ہے۔",
      tr: "mp'den daha dolgun, ama gerçek bir f için hâlâ pay bırakır."
    }
  },
  "f": {
    short: {
      de: "Laut / kräftig",
      en: "Loud / strong",
      fr: "Fort",
      es: "Fuerte",
      it: "Forte",
      pl: "Głośno",
      uk: "Голосно",
      ur: "بلند / مضبوط",
      tr: "Güçlü / gür"
    },
    desc: {
      de: "Forte: voller, kraftvoller und tragender Ton ohne zu verkrampfen.",
      en: "Forte: full, energetic and projecting sound without forcing the tone.",
      fr: "Forte : son plein, puissant et projeté sans dureté.",
      es: "Fuerte: sonido lleno, enérgico y proyectado sin forzar.",
      it: "Forte: suono pieno, deciso e ricco senza irrigidirsi.",
      pl: "Forte: pełny, mocny i nośny dźwięk bez forsowania.",
      uk: "Форте: повний, потужний і насичений звук без напруги.",
      ur: "فورٹے: بھرپور، جاندار اور گونج دار آواز بغیر کھنچاؤ کے۔",
      tr: "Forte: zorlamadan, dolgun, enerjik ve güçlü bir tını."
    },
    tip: {
      de: "Forte heißt wörtlich „stark“, nicht „schrill“.",
      en: "Forte literally means “strong”, not harsh.",
      fr: "Forte signifie littéralement « fort / solide ».",
      es: "Forte significa literalmente «fuerte», no estridente.",
      it: "Forte significa letteralmente «energico, robusto».",
      pl: "Forte znaczy dosłownie „mocno”, nie ostro.",
      uk: "Forte буквально означає «сильно», а не різко.",
      ur: "فورٹے کا لفظی مطلب ’مضبوط‘ ہے، کرخت نہیں۔",
      tr: "Forte kelimesi «sert/tiz» değil, «güçlü» anlamına gelir."
    }
  },
  "ff": {
    short: {
      de: "Sehr laut",
      en: "Very loud",
      fr: "Très fort",
      es: "Muy fuerte",
      it: "Fortissimo",
      pl: "Bardzo głośno",
      uk: "Дуже голосно",
      ur: "بہت بلند",
      tr: "Çok güçlü"
    },
    desc: {
      de: "Fortissimo: sehr kraftvoller Höhepunkt mit maximaler Fülle und Präsenz.",
      en: "Fortissimo: a powerful climax with rich fullness and commanding presence.",
      fr: "Fortissimo : sommet sonore très puissant et ample.",
      es: "Fortissimo: clímax muy potente y lleno de presencia.",
      it: "Fortissimo: culmine sonoro molto intenso e maestoso.",
      pl: "Fortissimo: bardzo potężny punkt kulminacyjny o pełnym brzmieniu.",
      uk: "Фортисимо: дуже потужна кульмінація з повним звучанням.",
      ur: "فورٹی سیمو: بھرپور قوت اور عروج کے لیے بہت بلند آواز۔",
      tr: "Fortissimo: maksimum dolgunluk ve görkemle çok güçlü bir doruk noktası."
    },
    tip: {
      de: "Zwei f = große Steigerung über f.",
      en: "Two f’s = a major step above f.",
      fr: "Deux f = nettement au-dessus de f.",
      es: "Dos f = un salto claro sobre f.",
      it: "Due f = un netto passo sopra f.",
      pl: "Dwa f = wyraźnie głośniej niż f.",
      uk: "Два f = відчутно сильніше за f.",
      ur: "دو f یعنی f سے نمایاں طور پر زیادہ بلند۔",
      tr: "İki f = f'nin üzerinde büyük bir artış."
    }
  },
  "fff": {
    short: {
      de: "So laut wie möglich",
      en: "As loud as possible",
      fr: "Aussi fort que possible",
      es: "Lo más fuerte posible",
      it: "Il più forte possibile",
      pl: "Jak najgłośniej",
      uk: "Якомога голосніше",
      ur: "جتنا ممکن ہو بلند",
      tr: "Mümkün olduğunca güçlü"
    },
    desc: {
      de: "Fortississimo: äußerste Klanggewalt für große dramatische Gipfelpunkte.",
      en: "Fortississimo: maximum sonic power reserved for extreme dramatic peaks.",
      fr: "Fortississimo : puissance maximale réservée aux grands sommets dramatiques.",
      es: "Fortississimo: máxima potencia sonora para grandes cumbres dramáticas.",
      it: "Fortississimo: massima potenza sonora per i grandi apici drammatici.",
      pl: "Fortississimo: skrajna siła dźwięku na największe kulminacje.",
      uk: "Фортисисимо: гранична міць звучання для найбільших кульмінацій.",
      ur: "فورٹی سی سیمو: شدید ڈرامائی عروج کے لیے انتہائی بلند آواز۔",
      tr: "Fortississimo: en dramatik doruk noktaları için ayrılan en yüksek ses gücü."
    },
    tip: {
      de: "Gegenpol zu ppp – wird sparsam für echte Höhepunkte eingesetzt.",
      en: "The opposite of ppp — saved for the biggest peaks.",
      fr: "L’opposé de ppp, réservé aux vrais sommets.",
      es: "Opuesto a ppp, reservado para los grandes clímax.",
      it: "L’opposto di ppp, usato solo nei grandi apici.",
      pl: "Przeciwieństwo ppp — zarezerwowane na największe szczyty.",
      uk: "Протилежність ppp — бережуть для головної кульмінації.",
      ur: "ppp کی ضد — صرف بڑے عروج کے لمحوں کے لیے۔",
      tr: "ppp'nin tam karşıtıdır — yalnızca en büyük doruklarda ölçülü kullanılır."
    }
  },
  "cresc": {
    short: {
      de: "Allmählich lauter werden",
      en: "Gradually getting louder",
      fr: "De plus en plus fort",
      es: "Cada vez más fuerte",
      it: "Sempre più forte",
      pl: "Stopniowo głośniej",
      uk: "Поступово голосніше",
      ur: "آہستہ آہستہ بلند ہونا",
      tr: "Giderek güçlenerek"
    },
    desc: {
      de: "Crescendo (cresc. oder öffnende Gabel <): Die Lautstärke schwillt gleichmäßig an, bis zum nächsten Dynamikzeichen.",
      en: "Crescendo (cresc. or opening hairpin <): volume grows steadily toward the next dynamic marking.",
      fr: "Crescendo (cresc. ou soufflet ouvrant <) : le volume augmente progressivement.",
      es: "Crescendo (cresc. o regulador que se abre <): el volumen crece gradualmente.",
      it: "Crescendo (cresc. o forcella che si apre <): il volume aumenta in modo graduale.",
      pl: "Crescendo (cresc. lub widełki otwierające się <): głośność narasta stopniowo.",
      uk: "Крещендо (cresc. або вилка, що розкривається <): гучність плавно наростає.",
      ur: "کریشینڈو (cresc. یا کھلتی ہوئی علامت <): آواز بتدریج بلند ہوتی جاتی ہے۔",
      tr: "Crescendo (cresc. veya açılan çatal <): Ses düzeyi bir sonraki gürlük işaretine kadar düzenli biçimde artar."
    },
    tip: {
      de: "Die Gabel öffnet sich nach rechts – genau wie der Klang breiter wird.",
      en: "The wedge opens to the right — just as the sound widens.",
      fr: "La fourche s’ouvre vers la droite, comme le son qui s’élargit.",
      es: "La horquilla se abre a la derecha, igual que el sonido se ensancha.",
      it: "La forcella si apre a destra, proprio come il suono si amplia.",
      pl: "Widełki rozszerzają się w prawo — tak jak narasta dźwięk.",
      uk: "Вилка розширюється праворуч — так само розширюється звук.",
      ur: "یہ نشان دائیں طرف کھلتا ہے، جیسے آواز پھیلتی ہے۔",
      tr: "Çatal sağa doğru açılır — tıpkı sesin genişlemesi gibi."
    }
  },
  "decresc": {
    short: {
      de: "Allmählich leiser werden",
      en: "Gradually getting softer",
      fr: "De plus en plus doux",
      es: "Cada vez más suave",
      it: "Sempre più piano",
      pl: "Stopniowo ciszej",
      uk: "Поступово тихіше",
      ur: "آہستہ آہستہ مدھم ہونا",
      tr: "Giderek hafifleyerek"
    },
    desc: {
      de: "Decrescendo / Diminuendo (decresc., dim. oder schließende Gabel >): Der Klang nimmt kontrolliert an Lautstärke ab.",
      en: "Decrescendo / Diminuendo (decresc., dim., or closing hairpin >): volume tapers smoothly down.",
      fr: "Decrescendo / Diminuendo (decresc., dim. ou soufflet fermant >) : le son décroît progressivement.",
      es: "Decrescendo / Diminuendo (decresc., dim. o regulador que se cierra >): el sonido baja gradualmente.",
      it: "Decrescendo / Diminuendo (decresc., dim. o forcella che si chiude >): il suono si attenua gradualmente.",
      pl: "Decrescendo / Diminuendo (decresc., dim. lub widełki zamykające się >): dźwięk stopniowo cichnie.",
      uk: "Декрещендо / Дімінуендо (decresc., dim. або вилка >): звук плавно стихає.",
      ur: "ڈیکریشینڈو / ڈیمینوینڈو (dim. یا بند ہوتی علامت >): آواز بتدریج مدھم ہوتی جاتی ہے۔",
      tr: "Decrescendo / Diminuendo (decresc., dim. veya kapanan çatal >): Ses düzeyi kontrollü biçimde azalır."
    },
    tip: {
      de: "Nicht verwechseln mit dem kleinen Akzent > über einer einzelnen Note!",
      en: "Don’t confuse a long hairpin with a short accent > on a single note!",
      fr: "Ne pas confondre un long soufflet avec un court accent > sur une seule note !",
      es: "¡No confundir el regulador largo con el acento corto > sobre una nota!",
      it: "Non confondere la forcella lunga con il piccolo accento > su una nota!",
      pl: "Nie myl długich widełek z krótkim akcentem > nad jedną nutą!",
      uk: "Не плутай довгу вилку з коротким акцентом > над однією нотою!",
      ur: "اسے ایک نوٹ کے اوپر چھوٹے ایکسنٹ > سے خلط ملط نہ کریں!",
      tr: "Tek bir notanın üzerindeki küçük vurgu işareti (>) ile karıştırma!"
    }
  },
  "sfz": {
    short: {
      de: "Plötzlich stark betont",
      en: "Sudden strong accent",
      fr: "Accent soudain et fort",
      es: "Acento súbito y fuerte",
      it: "Accento improvviso e forte",
      pl: "Nagły, mocny akcent",
      uk: "Раптовий сильний акцент",
      ur: "اچانک زوردار جھٹکا",
      tr: "Ani güçlü vurgu"
    },
    desc: {
      de: "Sforzando (sfz oder sf): Ein einzelner Ton oder Akkord bekommt einen plötzlichen, scharfen Kraftstoß.",
      en: "Sforzando (sfz or sf): a single note or chord receives a sudden, sharp burst of force.",
      fr: "Sforzando (sfz ou sf) : une note ou un accord isolé reçoit une impulsion soudaine et marquée.",
      es: "Sforzando (sfz o sf): una nota o acorde recibe un golpe repentino y enérgico.",
      it: "Sforzando (sfz o sf): una singola nota o un accordo viene colpito con forza improvvisa.",
      pl: "Sforzando (sfz lub sf): pojedynczy dźwięk lub akord dostaje nagłe, mocne uderzenie.",
      uk: "Сфорцандо (sfz або sf): одна нота чи акорд отримує раптовий сильний поштовх.",
      ur: "اسفورزانڈو (sfz): ایک خاص نوٹ یا کورڈ پر اچانک اور تیز زور دینا۔",
      tr: "Sforzando (sfz veya sf): Tek bir nota veya akor ani ve keskin bir güç darbesi alır."
    },
    tip: {
      de: "Wirkt nur auf den markierten Ton – danach gilt die bisherige Lautstärke weiter.",
      en: "Applies only to the marked note; the prior dynamic resumes right after.",
      fr: "Ne vaut que pour la note marquée, puis la nuance précédente reprend.",
      es: "Solo afecta a la nota marcada; después vuelve la dinámica previa.",
      it: "Vale solo sulla nota segnata, poi riprende la dinamica precedente.",
      pl: "Dotyczy tylko oznaczonego dźwięku — potem wraca poprzednia dynamika.",
      uk: "Діє лише на позначену ноту, а далі повертається попередня гучність.",
      ur: "صرف نشان زدہ نوٹ پر لاگو ہوتا ہے، پھر سابقہ آواز جاری رہتی ہے۔",
      tr: "Yalnızca işaretli notayı etkiler; sonrasında önceki gürlük devam eder."
    }
  },
  "fp": {
    short: {
      de: "Laut ansetzen, sofort leise",
      en: "Loud attack, instantly soft",
      fr: "Fort puis aussitôt doux",
      es: "Fuerte y al instante suave",
      it: "Forte e subito piano",
      pl: "Głośny początek, od razu cicho",
      uk: "Голосний початок, одразу тихо",
      ur: "بلند آغاز، فوراً مدھم",
      tr: "Güçlü başlayıp hemen hafif"
    },
    desc: {
      de: "Fortepiano: Der Ton startet kräftig (f) und fällt unmittelbar danach auf leise (p) zurück.",
      en: "Fortepiano: the note starts loud (f) and drops immediately down to soft (p).",
      fr: "Fortepiano : l’attaque est forte (f), puis le son retombe immédiatement à piano (p).",
      es: "Fortepiano: el ataque es fuerte (f) y cae inmediatamente a piano (p).",
      it: "Fortepiano: attacco forte (f) seguito da un calo immediato a piano (p).",
      pl: "Fortepiano: dźwięk zaczyna się głośno (f) i natychmiast opada do piano (p).",
      uk: "Фортепіано (fp): звук починається голосно (f) і миттєво спадає до piano (p).",
      ur: "فورٹے پیانو (fp): آواز بلند (f) شروع ہو کر فوراً مدھم (p) ہو جاتی ہے۔",
      tr: "Fortepiano: Nota güçlü (f) başlar ve hemen ardından hafif (p) düzeye düşer."
    },
    tip: {
      de: "Bei Streichern/Bläsern fällt derselbe gehaltene Ton direkt ab; am Klavier klingt der folgende Takt leise weiter.",
      en: "Strings/winds drop on the same held note; on piano the following notes continue softly.",
      fr: "Aux cordes/vents la note tenue retombe aussitôt ; au piano la suite continue doux.",
      es: "En cuerdas/vientos baja en la misma nota; en piano lo que sigue suena suave.",
      it: "Su archi/fiati cala sulla nota tenuta; al pianoforte le note successive sono piano.",
      pl: "Na smyczkach/dętych opada na tym samym dźwięku; na fortepianie kolejne nuty są ciche.",
      uk: "На струнних/духових спадає на тій самій ноті; на фортепіано тихо йде продовження.",
      ur: "تاروں اور پھونک والے سازوں میں اسی نوٹ پر آواز گر جاتی ہے؛ پیانو پر اگلے نوٹ مدھم بجتے ہیں۔",
      tr: "Yaylı/üflemelilerde aynı uzun nota doğrudan düşer; piyanoda sonraki notalar hafif devam eder."
    }
  },
  "rfz": {
    short: {
      de: "Kurze Phrase verstärken",
      en: "Reinforced surge over notes",
      fr: "Renforcer un court groupe",
      es: "Reforzar un grupo breve",
      it: "Rinforzare un breve gruppo",
      pl: "Wzmocnić krótką frazę",
      uk: "Посилити коротку фразу",
      ur: "مختصر حصے کو نمایاں مضبوط کرنا",
      tr: "Kısa cümleyi güçlendirerek"
    },
    desc: {
      de: "Rinforzando (rfz oder rf): Verstärkt nicht nur einen Einzelton, sondern eine kurze Gruppe von Noten kräftig.",
      en: "Rinforzando (rfz or rf): reinforces a short group of notes with sudden weight (broader than sfz).",
      fr: "Rinforzando (rfz ou rf) : renforce soudainement un petit groupe de notes (plus large que sfz).",
      es: "Rinforzando (rfz o rf): refuerza con empuje un breve grupo de notas (más amplio que sfz).",
      it: "Rinforzando (rfz o rf): rinforza con decisione un breve gruppo di note (più ampio di sfz).",
      pl: "Rinforzando (rfz lub rf): wzmacnia krótką grupę dźwięków (szerzej niż sfz).",
      uk: "Рінфорцандо (rfz або rf): посилює коротку групу нот (ширше, ніж sfz).",
      ur: "رنفورزانڈو (rfz): صرف ایک نوٹ نہیں بلکہ چند نوٹوں کے گروپ کو اچانک مضبوط بنانا۔",
      tr: "Rinforzando (rfz veya rf): Yalnızca tek bir notayı değil, kısa bir nota grubunu ani bir ağırlıkla güçlendirir."
    },
    tip: {
      de: "sfz = ein einzelner Akzent, rfz = kurzes Anschwellen mehrerer Töne.",
      en: "sfz = one accented note, rfz = a quick surge across several notes.",
      fr: "sfz = une note, rfz = un élan sur plusieurs notes.",
      es: "sfz = una sola nota, rfz = impulso sobre varias notas.",
      it: "sfz = una nota, rfz = slancio su più note.",
      pl: "sfz = jeden dźwięk, rfz = wzmocnienie kilku nut.",
      uk: "sfz = одна нота, rfz = посилення кількох нот.",
      ur: "sfz ایک نوٹ کے لیے اور rfz کئی نوٹوں کے فوری ابھار کے لیے۔",
      tr: "sfz = tek bir vurgulu nota, rfz = birkaç notada kısa bir kabarma."
    }
  },
  "subito-p": {
    short: {
      de: "Plötzlich leise",
      en: "Suddenly soft",
      fr: "Soudainement doux",
      es: "Súbitamente suave",
      it: "Improvvisamente piano",
      pl: "Nagle cicho",
      uk: "Раптово тихо",
      ur: "اچانک مدھم",
      tr: "Aniden hafif"
    },
    desc: {
      de: "Subito piano (sub. p): Ohne Übergang von einer lauten Stelle direkt ins Leise springen – ein beliebter Überraschungseffekt.",
      en: "Subito piano (sub. p): drop abruptly from loud to soft with no gradual fade — a classic dramatic surprise.",
      fr: "Subito piano (sub. p) : passer sans transition du fort au doux pour créer un effet de surprise.",
      es: "Subito piano (sub. p): pasar sin transición de fuerte a suave como efecto de sorpresa.",
      it: "Subito piano (sub. p): scendere di colpo nel piano senza diminuendo, per un effetto a sorpresa.",
      pl: "Subito piano (sub. p): gwałtowny skok z głośnego w ciche bez stopniowego ściszania.",
      uk: "Субіто піано (sub. p): різкий перехід у тихе звучання без поступового спаду.",
      ur: "سوبیتو پیانو (sub. p): بغیر تدریج کے اچانک بلند آواز سے مدھم ہو جانا۔",
      tr: "Subito piano (sub. p): Geçiş yapmadan güçlü bir yerden doğrudan hafif düzeye düşmek — klasik bir sürpriz etkisi."
    },
    tip: {
      de: "Subito = „plötzlich“ (gibt es auch als subito f).",
      en: "Subito = “suddenly” (also appears as subito f).",
      fr: "Subito = « soudain » (existe aussi en subito f).",
      es: "Subito = «de repente» (también existe subito f).",
      it: "Subito = «all’improvviso» (usato anche come subito f).",
      pl: "Subito = „nagle” (bywa też subito f).",
      uk: "Subito = «раптово» (буває також subito f).",
      ur: "سوبیتو کا مطلب ’اچانک‘ ہے (subito f بھی استعمال ہوتا ہے)۔",
      tr: "Subito = «aniden» (subito f olarak da karşımıza çıkar)."
    }
  },
  "morendo": {
    short: {
      de: "Ersterbend / verklingend",
      en: "Dying away",
      fr: "En mourant / s’éteignant",
      es: "Muriendo / apagándose",
      it: "Morendo / spegnendosi",
      pl: "Zamierając",
      uk: "Завмираючи / стихаючи",
      ur: "معدوم ہوتے ہوئے",
      tr: "Sönerek / yiterek"
    },
    desc: {
      de: "Morendo („sterbend“) bzw. al niente („ins Nichts“): Der Ton wird immer leiser und oft auch etwas ruhiger, bis er völlig verklingt.",
      en: "Morendo (“dying”) / al niente (“to nothing”): volume fades away, often slightly slowing, until silence.",
      fr: "Morendo (« en mourant ») / al niente (« vers le néant ») : le son s’éteint peu à peu jusqu’au silence.",
      es: "Morendo («muriendo») / al niente («a la nada»): el sonido se apaga y suele ceder hasta el silencio.",
      it: "Morendo / al niente: il suono si spegne gradualmente, spesso rallentando un poco, fino al silenzio.",
      pl: "Morendo („zamierając”) / al niente („do niczego”): dźwięk cichnie i lekko zwalnia aż do ciszy.",
      uk: "Морендо («завмираючи») / al niente («в ніщо»): звук тане й часто трохи сповільнюється до тиші.",
      ur: "مورینڈو / ال نینتے: آواز دھیمی اور سست ہوتے ہوتے بالکل خاموشی میں ڈوب جاتی ہے۔",
      tr: "Morendo («ölerek») veya al niente («hiçliğe doğru»): Ses tamamen sönene kadar giderek hafifler ve çoğu zaman biraz yavaşlar."
    },
    tip: {
      de: "Kommt besonders oft an ruhigen Satz- oder Stückenden vor.",
      en: "Often found at quiet endings of movements or pieces.",
      fr: "Très fréquent aux fins calmes d’un mouvement.",
      es: "Muy frecuente en finales tranquilos de una obra.",
      it: "Molto frequente nei finali raccolti di un brano.",
      pl: "Często pojawia się w wyciszonych zakończeniach utworów.",
      uk: "Часто трапляється у тихих фіналах творів.",
      ur: "زیادہ تر کسی دھن کے پُرسکون اختتام پر آتا ہے۔",
      tr: "Özellikle sakin bölüm veya eser sonlarında sık görülür."
    }
  },

  // ===== 2. TEMPO, AGOGIK & CHARAKTER =====
  "largo": {
    short: {
      de: "Sehr langsam & breit",
      en: "Very slow & broad",
      fr: "Très lent et large",
      es: "Muy lento y amplio",
      it: "Molto lento e ampio",
      pl: "Bardzo wolno i szeroko",
      uk: "Дуже повільно й широко",
      ur: "بہت سست اور کشادہ",
      tr: "Çok yavaş ve geniş"
    },
    desc: {
      de: "Largo (ca. 40–60 BPM): sehr langsames, würdevolles und breites Tempo – noch etwas getragener als Adagio.",
      en: "Largo (approx. 40–60 BPM): very slow, stately and broad — even more expansive than Adagio.",
      fr: "Largo (env. 40–60 BPM) : très lent, ample et solennel, plus large qu’Adagio.",
      es: "Largo (aprox. 40–60 BPM): muy lento, amplio y solemne, más pausado que Adagio.",
      it: "Largo (circa 40–60 BPM): molto lento, ampio e solenne, ancora più disteso dell’Adagio.",
      pl: "Largo (ok. 40–60 BPM): bardzo wolne, szerokie i uroczyste tempo.",
      uk: "Ларго (прибл. 40–60 BPM): дуже повільний, широкий і величний темп.",
      ur: "لارگو (تقریباً 40–60 BPM): بہت سست، باوقار اور کشادہ رفتار۔",
      tr: "Largo (yakl. 40–60 BPM): Çok yavaş, vakur ve geniş bir tempo — Adagio'dan bile daha ağırdır."
    },
    tip: {
      de: "Verwandt: Grave = sehr schwer und feierlich langsam.",
      en: "Related: Grave = very heavy, solemn and slow.",
      fr: "Voisin : Grave = très lourd et solennel.",
      es: "Afín: Grave = muy pesado y solemne.",
      it: "Affine: Grave = molto pesante e solenne.",
      pl: "Pokrewne: Grave = bardzo ciężko i poważnie.",
      uk: "Близьке: Grave = дуже важко й урочисто.",
      ur: "اسی سے ملتا جلتا: Grave یعنی نہایت بھاری اور سنجیدہ سست۔",
      tr: "Yakın terim: Grave = çok ağır, törensel ve yavaş."
    }
  },
  "adagio": {
    short: {
      de: "Langsam & ruhig",
      en: "Slow & leisurely",
      fr: "Lent et paisible",
      es: "Lento y reposado",
      it: "Lento e disteso",
      pl: "Wolno i spokojnie",
      uk: "Повільно й спокійно",
      ur: "سست اور پُرسکون",
      tr: "Yavaş ve sakin"
    },
    desc: {
      de: "Adagio (ca. 60–72 BPM): ruhevoll, gesanglich und ausdrucksstark – das klassische Tempo langsamer Sätze.",
      en: "Adagio (approx. 60–72 BPM): calm, singing and expressive — the classic pace of slow movements.",
      fr: "Adagio (env. 60–72 BPM) : calme, chantant et expressif — tempo typique des mouvements lents.",
      es: "Adagio (aprox. 60–72 BPM): sosegado, cantabile y expresivo — típico de movimientos lentos.",
      it: "Adagio (circa 60–72 BPM): calmo, disteso ed espressivo, tipico dei movimenti lenti.",
      pl: "Adagio (ok. 60–72 BPM): powolne, śpiewne i spokojne tempo wolnych części.",
      uk: "Адажіо (прибл. 60–72 BPM): повільно, спокійно й співучо — темп повільних частин.",
      ur: "اڈاجیو (تقریباً 60–72 BPM): سست، پُرسکون اور پُراثر رفتار۔",
      tr: "Adagio (yakl. 60–72 BPM): Huzurlu, şarkı gibi ve ifadeli — yavaş bölümlerin klasik temposudur."
    },
    tip: {
      de: "Wörtlich „mit Behagen“ (ad agio) – nicht gehetzt, aber im Fluss.",
      en: "Literally “at ease” — unhurried, yet flowing.",
      fr: "Littéralement « à l’aise » — sans hâte mais fluide.",
      es: "Literalmente «a gusto» — sin prisa pero fluido.",
      it: "Letteralmente «ad agio» — senza fretta ma scorrevole.",
      pl: "Dosłownie „swobodnie, z wygodą” — bez pośpiechu.",
      uk: "Буквально «спокійно, зручно» — без поспіху, але плавно.",
      ur: "لفظی مطلب ’آرام سے‘ — بغیر جلدی کے مگر رواں۔",
      tr: "Kelime anlamı «rahatça» (ad agio) — acele etmeden ama akışını koruyarak."
    }
  },
  "andante": {
    short: {
      de: "Gehend (ruhiger Schritt)",
      en: "Walking pace",
      fr: "Allure de marche",
      es: "Al paso / andando",
      it: "A passo tranquillo",
      pl: "W tempie kroku",
      uk: "Помірно, кроком",
      ur: "چلنے کی رفتار",
      tr: "Yürüyüş temposunda"
    },
    desc: {
      de: "Andante (ca. 76–96 BPM): entspanntes Schritttempo – flüssig voranschreitend, weder schwerfällig noch eilig.",
      en: "Andante (approx. 76–96 BPM): relaxed walking pace — moving steadily forward without rushing.",
      fr: "Andante (env. 76–96 BPM) : pas de marche détendu, fluide sans se presser.",
      es: "Andante (aprox. 76–96 BPM): paso tranquilo y fluido, sin arrastrarse ni correr.",
      it: "Andante (circa 76–96 BPM): passo naturale e scorrevole, né lento né affrettato.",
      pl: "Andante (ok. 76–96 BPM): spokojny krok — płynnie naprzód bez pośpiechu.",
      uk: "Анданте (прибл. 76–96 BPM): спокійна хода — рівномірний рух вперед.",
      ur: "انڈانتے (تقریباً 76–96 BPM): ٹہلنے کی متوازن رفتار، نہ زیادہ سست نہ تیز۔",
      tr: "Andante (yakl. 76–96 BPM): Rahat yürüyüş hızı — ne ağır ne aceleci, dengeli bir ilerleyiş."
    },
    tip: {
      de: "Von italienisch „andare“ = gehen.",
      en: "From Italian “andare” = to walk.",
      fr: "De l’italien « andare » = marcher.",
      es: "Del italiano «andare» = caminar.",
      it: "Dal verbo italiano «andare» (camminare).",
      pl: "Od włoskiego „andare” = iść.",
      uk: "Від італійського «andare» = іти.",
      ur: "اطالوی لفظ ’andare‘ سے ماخوذ یعنی ’چلنا‘۔",
      tr: "İtalyanca «andare» (yürümek) fiilinden gelir."
    }
  },
  "moderato": {
    short: {
      de: "Mäßig (mittleres Tempo)",
      en: "Moderate tempo",
      fr: "Modéré",
      es: "Moderado",
      it: "Moderato",
      pl: "Umiarkowanie",
      uk: "Помірно",
      ur: "معتدل رفتار",
      tr: "Orta hızda"
    },
    desc: {
      de: "Moderato (ca. 98–116 BPM): ausgewogene Mittelgeschwindigkeit zwischen Andante und Allegro.",
      en: "Moderato (approx. 98–116 BPM): balanced middle tempo sitting between Andante and Allegro.",
      fr: "Moderato (env. 98–116 BPM) : tempo intermédiaire équilibré entre Andante et Allegro.",
      es: "Moderato (aprox. 98–116 BPM): velocidad media equilibrada entre Andante y Allegro.",
      it: "Moderato (circa 98–116 BPM): velocità intermedia equilibrata fra Andante e Allegro.",
      pl: "Moderato (ok. 98–116 BPM): zrównoważone tempo średnie między Andante a Allegro.",
      uk: "Модерато (прибл. 98–116 BPM): збалансований середній темп між Andante та Allegro.",
      ur: "موڈیریٹو (تقریباً 98–116 BPM): انڈانتے اور الیگرو کے درمیان متوازن رفتار۔",
      tr: "Moderato (yakl. 98–116 BPM): Andante ile Allegro arasında dengeli bir orta tempo."
    },
    tip: {
      de: "Auch als Zusatz üblich: Allegro moderato = mäßig schnell.",
      en: "Often combined as a modifier: Allegro moderato = moderately fast.",
      fr: "Souvent associé : Allegro moderato = modérément rapide.",
      es: "Suele combinarse: Allegro moderato = moderadamente rápido.",
      it: "Spesso combinato: Allegro moderato = moderatamente veloce.",
      pl: "Często jako dodatek: Allegro moderato = umiarkowanie szybko.",
      uk: "Часто поєднується: Allegro moderato = помірно швидко.",
      ur: "اضافے کے طور پر بھی آتا ہے: Allegro moderato یعنی معتدل تیز۔",
      tr: "Sıkça ek olarak da kullanılır: Allegro moderato = orta hızlı."
    }
  },
  "allegretto": {
    short: {
      de: "Mäßig schnell & leicht",
      en: "Fairly lively & light",
      fr: "Assez animé et léger",
      es: "Algo rápido y ligero",
      it: "Moderatamente vivace",
      pl: "Dość żywo i lekko",
      uk: "Досить жваво й легко",
      ur: "ہلکا تیز اور چست",
      tr: "Orta hızlı ve hafif"
    },
    desc: {
      de: "Allegretto (ca. 112–124 BPM): etwas ruhiger als Allegro, mit leichtfüßigem, tänzerischem Charakter.",
      en: "Allegretto (approx. 112–124 BPM): slightly gentler than Allegro, light-footed and buoyant.",
      fr: "Allegretto (env. 112–124 BPM) : un peu plus calme qu’Allegro, léger et gracieux.",
      es: "Allegretto (aprox. 112–124 BPM): un poco menos rápido que Allegro, ágil y ligero.",
      it: "Allegretto (circa 112–124 BPM): leggermente meno veloce dell’Allegro, leggero e agile.",
      pl: "Allegretto (ok. 112–124 BPM): nieco spokojniej niż Allegro, z lekkim charakterem.",
      uk: "Алегрето (прибл. 112–124 BPM): трохи спокійніше за Allegro, легке й рухливе.",
      ur: "الیگریٹو (تقریباً 112–124 BPM): الیگرو سے ذرا کم تیز، ہلکا پھلکا اور رواں۔",
      tr: "Allegretto (yakl. 112–124 BPM): Allegro'dan biraz daha sakin, hafif adımlı ve dans eder gibi bir karakter."
    },
    tip: {
      de: "Die Endung -etto verniedlicht („kleines Allegro“).",
      en: "The ending -etto means “little” (“a little Allegro”).",
      fr: "La terminaison -etto diminue (« petit Allegro »).",
      es: "La terminación -etto es diminutiva («pequeño Allegro»).",
      it: "Il diminutivo -etto indica un Allegro più leggero.",
      pl: "Końcówka -etto zdrabnia („małe Allegro”).",
      uk: "Суфікс -etto пом’якшує («мале Allegro»).",
      ur: "لاحقہ -etto چھوٹے پن کو ظاہر کرتا ہے (ہلکا الیگرو)۔",
      tr: "-etto eki küçültme anlamı katar («küçük Allegro»)."
    }
  },
  "allegro": {
    short: {
      de: "Schnell, munter & lebhaft",
      en: "Fast, bright & lively",
      fr: "Rapide, vif et gai",
      es: "Rápido y alegre",
      it: "Veloce, vivo e gioioso",
      pl: "Szybko i wesoło",
      uk: "Швидко й жваво",
      ur: "تیز اور خوشگوار",
      tr: "Hızlı, neşeli ve canlı"
    },
    desc: {
      de: "Allegro (ca. 120–152 BPM): zügig, frisch und energiegeladen – eines der häufigsten Tempi überhaupt.",
      en: "Allegro (approx. 120–152 BPM): brisk, bright and energetic — one of the most common tempi.",
      fr: "Allegro (env. 120–152 BPM) : allant, brillant et énergique — un des tempos les plus courants.",
      es: "Allegro (aprox. 120–152 BPM): ágil, brillante y enérgico — uno de los tempos más frecuentes.",
      it: "Allegro (circa 120–152 BPM): scattante, luminoso ed energico — tra i tempi più diffusi.",
      pl: "Allegro (ok. 120–152 BPM): żywe, radosne i energiczne tempo.",
      uk: "Алегро (прибл. 120–152 BPM): швидкий, живий і бадьорий темп.",
      ur: "الیگرو (تقریباً 120–152 BPM): تیز، چست اور پُرجوش رفتار۔",
      tr: "Allegro (yakl. 120–152 BPM): Atak, taze ve enerjik — en yaygın tempolardan biridir."
    },
    tip: {
      de: "Ursprünglich bedeutet allegro „fröhlich, heiter“ – heute steht es vor allem für rasches Tempo.",
      en: "Originally meant “cheerful”; today it primarily signals a brisk tempo.",
      fr: "Signifie à l’origine « joyeux », aujourd’hui surtout un tempo vif.",
      es: "Originalmente «alegre», hoy indica sobre todo un tempo rápido.",
      it: "In origine «gioioso», oggi indica soprattutto un tempo vivace.",
      pl: "Pierwotnie „wesoło”, dziś przede wszystkim szybkie tempo.",
      uk: "Первісно «весело», нині передусім швидкий темп.",
      ur: "اصل معنی ’خوش‘ ہیں، مگر موسیقی میں تیز رفتار کے لیے آتا ہے۔",
      tr: "Aslen «neşeli, şen» demektir; bugün özellikle hızlı tempoyu belirtir."
    }
  },
  "vivace": {
    short: {
      de: "Lebhaft & feurig schnell",
      en: "Lively & briskly fast",
      fr: "Vif et animé",
      es: "Vivo y muy ágil",
      it: "Vivace e brillante",
      pl: "Żywo i rześko",
      uk: "Жваво й стрімко",
      ur: "نہایت چست اور پُرجوش",
      tr: "Canlı ve ateşli hızlı"
    },
    desc: {
      de: "Vivace (ca. 148–172 BPM): spritzig, energiegeladen und schneller als normales Allegro.",
      en: "Vivace (approx. 148–172 BPM): sparkling, spirited and faster than a standard Allegro.",
      fr: "Vivace (env. 148–172 BPM) : pétillant, plein d’élan et plus rapide qu’Allegro.",
      es: "Vivace (aprox. 148–172 BPM): chispeante, enérgico y más veloz que Allegro.",
      it: "Vivace (circa 148–172 BPM): brillante, scattante e più mosso dell’Allegro.",
      pl: "Vivace (ok. 148–172 BPM): tryskające energią i szybsze od zwykłego Allegro.",
      uk: "Віваче (прибл. 148–172 BPM): іскристе, стрімке й швидше за звичайне Allegro.",
      ur: "ویواچے (تقریباً 148–172 BPM): نہایت زندہ دل اور عام الیگرو سے زیادہ تیز۔",
      tr: "Vivace (yakl. 148–172 BPM): Kıvrak, enerjik ve standart Allegro'dan daha hızlı."
    },
    tip: {
      de: "Verbindet hohes Tempo mit funkelnder Lebendigkeit.",
      en: "Combines fast speed with sparkling vitality.",
      fr: "Unit vitesse élevée et élan pétillant.",
      es: "Une gran velocidad con chispa y vitalidad.",
      it: "Unisce grande velocità e spirito brillante.",
      pl: "Łączy szybkie tempo z iskrzącą żywiołowością.",
      uk: "Поєднує високу швидкість з іскристою жвавістю.",
      ur: "تیز رفتار کے ساتھ چمک اور جوش شامل ہوتا ہے۔",
      tr: "Yüksek hızı ışıltılı bir canlılıkla birleştirir."
    }
  },
  "presto": {
    short: {
      de: "Sehr schnell",
      en: "Very fast",
      fr: "Très rapide",
      es: "Muy rápido",
      it: "Molto veloce",
      pl: "Bardzo szybko",
      uk: "Дуже швидко",
      ur: "بہت تیز",
      tr: "Çok hızlı"
    },
    desc: {
      de: "Presto (ca. 168–200 BPM): rasant und virtuos – nur Prestissimo („so schnell wie möglich“) liegt noch darüber.",
      en: "Presto (approx. 168–200 BPM): racing and virtuosic — topped only by Prestissimo (“as fast as possible”).",
      fr: "Presto (env. 168–200 BPM) : très rapide et virtuose — seul Prestissimo va plus vite.",
      es: "Presto (aprox. 168–200 BPM): vertiginoso y virtuoso — solo Prestissimo es más rápido.",
      it: "Presto (circa 168–200 BPM): rapidissimo e brillante — superato solo dal Prestissimo.",
      pl: "Presto (ok. 168–200 BPM): zawrotne, wirtuozowskie tempo — szybciej jest tylko Prestissimo.",
      uk: "Престо (прибл. 168–200 BPM): стрімко й віртуозно — швидше лише Prestissimo.",
      ur: "پریسٹو (تقریباً 168–200 BPM): نہایت تیز، صرف پریسٹی سیمو اس سے تیز ہے۔",
      tr: "Presto (yakl. 168–200 BPM): Baş döndürücü ve virtüöz — bundan hızlısı yalnızca Prestissimo'dur («mümkün olduğunca hızlı»)."
    },
    tip: {
      de: "Bei schnellen Presto-Stücken denkt man oft in ganzen Takten statt einzelnen Schlägen.",
      en: "In fast Presto passages, musicians often feel whole bars rather than single beats.",
      fr: "En Presto, on ressent souvent la mesure entière plutôt que chaque temps.",
      es: "En Presto suele sentirse el compás entero más que cada pulso.",
      it: "Nel Presto si sente spesso l’intera battuta invece dei singoli battiti.",
      pl: "W Presto często liczy się całe takty zamiast pojedynczych miar.",
      uk: "У Presto часто відчувають цілий такт, а не кожну долю.",
      ur: "پریسٹو میں اکثر ہر دھڑکن کے بجائے پورا بار محسوس کیا جاتا ہے۔",
      tr: "Hızlı Presto bölümlerinde tek tek vuruşlar yerine çoğu zaman tüm ölçüler hissedilir."
    }
  },
  "ritardando": {
    short: {
      de: "Allmählich langsamer werden",
      en: "Gradually slowing down",
      fr: "Ralentir progressivement",
      es: "Más lento gradualmente",
      it: "Rallentare gradualmente",
      pl: "Stopniowo zwalniając",
      uk: "Поступово сповільнюючи",
      ur: "آہستہ آہستہ سست ہونا",
      tr: "Giderek yavaşlayarak"
    },
    desc: {
      de: "Ritardando (rit.) bzw. Rallentando (rall.): Das Tempo bremst fließend ab – besonders typisch vor Phrasenenden und Schlüssen.",
      en: "Ritardando (rit.) / Rallentando (rall.): the tempo slows smoothly — common before cadences and endings.",
      fr: "Ritardando (rit.) / Rallentando (rall.) : le tempo ralentit souplement, souvent avant une fin de phrase.",
      es: "Ritardando (rit.) / Rallentando (rall.): el tempo frena gradualmente, típico al final de frases.",
      it: "Ritardando (rit.) / Rallentando (rall.): il tempo rallenta con continuità, spesso a fine frase.",
      pl: "Ritardando (rit.) / Rallentando (rall.): tempo płynnie zwalnia, często przed zakończeniem frazy.",
      uk: "Рітардандо (rit.) / Ралентандо (rall.): темп плавно сповільнюється, особливо перед фіналом.",
      ur: "ریٹارڈینڈو (rit.) / ریلینٹینڈو (rall.): رفتار بتدریج کم ہوتی جاتی ہے، اکثر اختتام سے پہلے۔",
      tr: "Ritardando (rit.) veya Rallentando (rall.): Tempo akıcı biçimde yavaşlar — özellikle cümle ve eser sonlarından önce yaygındır."
    },
    tip: {
      de: "Wird durch „a tempo“ wieder aufgehoben.",
      en: "Cancelled when “a tempo” appears.",
      fr: "Annulé par l’indication « a tempo ».",
      es: "Se cancela cuando aparece «a tempo».",
      it: "Viene annullato dall’indicazione «a tempo».",
      pl: "Odwoływane oznaczeniem „a tempo”.",
      uk: "Скасовується позначкою «a tempo».",
      ur: "’a tempo‘ لکھنے پر اصل رفتار واپس آ جاتی ہے۔",
      tr: "«a tempo» işaretiyle yeniden eski hıza dönülür."
    }
  },
  "accelerando": {
    short: {
      de: "Allmählich schneller werden",
      en: "Gradually speeding up",
      fr: "Accélérer progressivement",
      es: "Acelerar gradualmente",
      it: "Accelerare gradualmente",
      pl: "Stopniowo przyspieszając",
      uk: "Поступово прискорюючи",
      ur: "آہستہ آہستہ تیز ہونا",
      tr: "Giderek hızlanarak"
    },
    desc: {
      de: "Accelerando (accel.): Das Tempo zieht kontinuierlich an und baut Vorwärtsdrang und Spannung auf.",
      en: "Accelerando (accel.): the tempo increases steadily, building momentum and excitement.",
      fr: "Accelerando (accel.) : le tempo s’accélère régulièrement, créant un élan croissant.",
      es: "Accelerando (accel.): el tempo aumenta de forma continua generando impulso.",
      it: "Accelerando (accel.): il tempo aumenta progressivamente creando slancio.",
      pl: "Accelerando (accel.): tempo stopniowo przyspiesza, budując napięcie.",
      uk: "Ачелерандо (accel.): темп плавно прискорюється, нарощуючи напругу.",
      ur: "ایکسیلرینڈو (accel.): رفتار بتدریج تیز ہوتی ہے جس سے جوش بڑھتا ہے۔",
      tr: "Accelerando (accel.): Tempo düzenli biçimde hızlanarak ileriye doğru ivme ve gerilim oluşturur."
    },
    tip: {
      de: "Verwandt: stringendo = drängend schneller werden.",
      en: "Related: stringendo = pressing forward urgently.",
      fr: "Voisin : stringendo = en pressant davantage.",
      es: "Afín: stringendo = apremiando con intensidad.",
      it: "Affine: stringendo = incalzando con tensione.",
      pl: "Pokrewne: stringendo = nagląco przyspieszając.",
      uk: "Близьке: stringendo = напружено прискорюючи.",
      ur: "ملتا جلتا: stringendo یعنی بے تابی سے تیز ہونا۔",
      tr: "Yakın terim: stringendo = sıkıştırarak, heyecanla hızlanmak."
    }
  },
  "a-tempo": {
    short: {
      de: "Zurück zum Grundtempo",
      en: "Return to original tempo",
      fr: "Retour au tempo initial",
      es: "Volver al tempo original",
      it: "Ritorno al tempo originale",
      pl: "Powrót do pierwotnego tempa",
      uk: "Повернення до основного темпу",
      ur: "اصل رفتار پر واپسی",
      tr: "Ana tempoya dönüş"
    },
    desc: {
      de: "A tempo: Hebt ein vorheriges ritardando, accelerando oder rubato auf und kehrt exakt ins Ausgangstempo zurück.",
      en: "A tempo: cancels a preceding ritardando, accelerando or rubato and returns to the previous speed.",
      fr: "A tempo : annule un ritardando, accelerando ou rubato précédent et reprend le tempo d’origine.",
      es: "A tempo: anula un ritardando, accelerando o rubato previo y recupera la velocidad original.",
      it: "A tempo: annulla il ritardando, accelerando o rubato precedente e riprende il tempo base.",
      pl: "A tempo: odwołuje wcześniejsze rit., accel. lub rubato i wraca do głównego tempa.",
      uk: "А темпо: скасовує попереднє rit., accel. чи rubato й повертає початковий темп.",
      ur: "آ تیمپو: پچھلی تبدیلی (rit./accel.) ختم کر کے اصل رفتار بحال کرتا ہے۔",
      tr: "A tempo: Önceki ritardando, accelerando veya rubato'yu sonlandırır ve tam olarak eski tempoya döner."
    },
    tip: {
      de: "Tempo I (Tempo primo) kehrt ganz zum ersten Anfangstempo des Stückes zurück.",
      en: "Tempo I (Tempo primo) returns all the way to the piece’s opening tempo.",
      fr: "Tempo I (Tempo primo) revient au tout premier tempo du morceau.",
      es: "Tempo I (Tempo primo) vuelve al tempo del comienzo de la obra.",
      it: "Tempo I (Tempo primo) richiama il tempo iniziale del brano.",
      pl: "Tempo I (Tempo primo) wraca do samego tempa początkowego utworu.",
      uk: "Tempo I (Tempo primo) повертає до найпершого темпу твору.",
      ur: "Tempo I دھن کی بالکل ابتدائی رفتار پر واپس لے جاتا ہے۔",
      tr: "Tempo I (Tempo primo) ise eserin en başındaki ilk tempoya döner."
    }
  },
  "rubato": {
    short: {
      de: "Frei im Tempo atmen",
      en: "Flexible, expressive timing",
      fr: "Tempo libre et expressif",
      es: "Tiempo flexible y expresivo",
      it: "Tempo elastico ed espressivo",
      pl: "Swobodne, elastyczne tempo",
      uk: "Вільний, гнучкий темп",
      ur: "لچکدار اور پُراثر رفتار",
      tr: "Tempoda özgür nefes alarak"
    },
    desc: {
      de: "Tempo rubato („geraubte Zeit“): Der Spieler dehnt und beschleunigt kleine Phrasen feinfühlig, während der Grundpuls im Inneren weiteratmet.",
      en: "Tempo rubato (“stolen time”): subtle pushing and pulling of timing for expression while keeping an underlying pulse.",
      fr: "Tempo rubato (« temps dérobé ») : flexibilité expressive du phrasé autour d’une pulsation intérieure.",
      es: "Tempo rubato («tiempo robado»): estiramiento y fluidez expresiva del fraseo manteniendo el pulso interno.",
      it: "Tempo rubato: elasticità espressiva del fraseggio senza perdere il respiro di fondo.",
      pl: "Tempo rubato („kradziony czas”): subtelne przyspieszanie i zwalnianie dla wyrazu przy zachowaniu pulsu.",
      uk: "Рубато («вкрадений час»): гнучке відхилення від строгого метра для виразності фрази.",
      ur: "روباٹو: احساس پیدا کرنے کے لیے رفتار کو ہلکا سا کھینچنا یا بڑھانا جبکہ اندرونی تال قائم رہے۔",
      tr: "Tempo rubato («çalınmış zaman»): İçteki temel nabız akmayı sürdürürken, kısa cümlelerin ifade uğruna incelikle esnetilip toparlanması."
    },
    tip: {
      de: "Besonders typisch für romantische Klaviermusik (z. B. Chopin).",
      en: "A hallmark of Romantic piano music (such as Chopin).",
      fr: "Emblématique du piano romantique (notamment Chopin).",
      es: "Muy característico del piano romántico (como Chopin).",
      it: "Tipico della musica romantica per pianoforte (es. Chopin).",
      pl: "Znak rozpoznawczy muzyki romantycznej (np. Chopina).",
      uk: "Особливо характерне для романтичної музики (наприклад, Шопена).",
      ur: "رومانوی پیانو موسیقی (جیسے شوپاں) کی خاص پہچان۔",
      tr: "Özellikle Romantik dönem piyano müziğinde (ör. Chopin) çok tipiktir."
    }
  },
  "piu-mosso": {
    short: {
      de: "Sofort etwas bewegter",
      en: "More motion (faster)",
      fr: "Plus animé",
      es: "Más movido / rápido",
      it: "Più mosso / animato",
      pl: "Bardziej ruchliwie",
      uk: "Жвавіше / рухливіше",
      ur: "زیادہ تیز / متحرک",
      tr: "Hemen biraz daha hareketli"
    },
    desc: {
      de: "Più mosso („mehr bewegt“): Ab dieser Stelle direkt ein spürbar flotteres Tempo einschlagen. Gegenstück: meno mosso (ruhiger).",
      en: "Più mosso (“more moved”): immediately shift to a noticeably livelier pace. Opposite: meno mosso (calmer).",
      fr: "Più mosso (« plus animé ») : adopter aussitôt un tempo plus vif. Opposé : meno mosso (moins vite).",
      es: "Più mosso («más movido»): pasar enseguida a un pulso más ágil. Opuesto: meno mosso.",
      it: "Più mosso: passare subito a un andamento più scorrevole. Opposto: meno mosso.",
      pl: "Più mosso („ruchliwiej”): od tego miejsca zauważalnie żywiej. Przeciwieństwo: meno mosso.",
      uk: "П’ю моссо («рухливіше»): одразу перейти на жвавіший темп. Протилежність: meno mosso.",
      ur: "پیو موسو: فوراً قدرے زیادہ تیز رفتار اختیار کرنا۔ ضد: meno mosso۔",
      tr: "Più mosso («daha hareketli»): Bu noktadan itibaren hemen belirgin biçimde daha canlı bir tempoya geçilir. Karşıtı: meno mosso (daha sakin)."
    },
    tip: {
      de: "Anders als accelerando wechselt più mosso sofort auf die neue Stufe.",
      en: "Unlike accelerando, più mosso shifts right away rather than gradually.",
      fr: "Contrairement à accelerando, le changement est immédiat.",
      es: "A diferencia de accelerando, el cambio es inmediato.",
      it: "A differenza di accelerando, il cambio è immediato.",
      pl: "W odróżnieniu od accelerando zmiana następuje od razu.",
      uk: "На відміну від accelerando, зміна відбувається одразу.",
      ur: "accelerando کے برعکس یہ تبدیلی فوراً ہوتی ہے۔",
      tr: "Accelerando'nun aksine più mosso yeni hıza kademeli değil, anında geçer."
    }
  },
  "meno-mosso": {
    short: {
      de: "Sofort etwas ruhiger",
      en: "Less motion (slower)",
      fr: "Moins animé / plus calme",
      es: "Menos movido / más calmo",
      it: "Meno mosso / più calmo",
      pl: "Spokojniej / mniej ruchliwie",
      uk: "Спокійніше / повільніше",
      ur: "کم تیز / پُرسکون",
      tr: "Hemen biraz daha sakin"
    },
    desc: {
      de: "Meno mosso („weniger bewegt“): Ab diesem Takt sofort in ein ruhigeres, breiteres Tempo wechseln.",
      en: "Meno mosso (“less moved”): immediately settle into a calmer, slower tempo from this bar.",
      fr: "Meno mosso (« moins animé ») : passer directement à un tempo plus calme.",
      es: "Meno mosso («menos movido»): pasar de inmediato a un pulso más sereno.",
      it: "Meno mosso: passare subito a un andamento più calmo e disteso.",
      pl: "Meno mosso („mniej ruchliwie”): od razu przejść w spokojniejsze tempo.",
      uk: "Мено моссо («менш рухливо»): одразу перейти до спокійнішого темпу.",
      ur: "مینو موسو: اس مقام سے فوراً زیادہ پُرسکون اور سست رفتار پر آنا۔",
      tr: "Meno mosso («daha az hareketli»): Bu ölçüden itibaren hemen daha sakin ve geniş bir tempoya geçilir."
    },
    tip: {
      de: "più = mehr, meno = weniger (gilt auch für più f / meno f).",
      en: "più = more, meno = less (also used in più f / meno f).",
      fr: "più = plus, meno = moins (vaut aussi pour più f / meno f).",
      es: "più = más, meno = menos (también en più f / meno f).",
      it: "più = di più, meno = di meno (anche in più f / meno f).",
      pl: "più = więcej, meno = mniej (także w più f / meno f).",
      uk: "più = більше, meno = менше (також у più f / meno f).",
      ur: "più = زیادہ، meno = کم۔",
      tr: "più = daha fazla, meno = daha az (più f / meno f için de geçerlidir)."
    }
  },
  "fermata": {
    short: {
      de: "Ton oder Pause frei dehnen",
      en: "Hold note or rest longer",
      fr: "Prolonger librement la durée",
      es: "Prolongar la nota o silencio",
      it: "Prolungare a piacere la durata",
      pl: "Swobodnie przedłużyć dźwięk",
      uk: "Вільно подовжити ноту чи паузу",
      ur: "نوٹ یا وقفے کو طویل کرنا",
      tr: "Notayı veya susu özgürce uzat"
    },
    desc: {
      de: "Fermate (Bogen mit Punkt): Hält den Puls an und dehnt die markierte Note oder Pause nach Geschmack (oft ca. 1,5–2× so lang).",
      en: "Fermata (arc with dot): suspends the beat and extends the marked note or rest freely (often ~1.5–2× longer).",
      fr: "Point d’orgue (fermata) : suspend la pulsation et allonge librement la note ou le silence.",
      es: "Calderón (fermata): detiene el pulso y prolonga libremente la nota o silencio.",
      it: "Corona (fermata): sospende la pulsazione e prolunga a piacere la nota o la pausa.",
      pl: "Fermata: wstrzymuje puls i swobodnie wydłuża oznaczoną nutę lub pauzę.",
      uk: "Фермата: зупиняє пульс і вільно подовжує позначену ноту або паузу.",
      ur: "فرماٹا (قوس اور نقطہ): تال کو روک کر نوٹ یا وقفے کو مرضی کے مطابق لمبا کرنا۔",
      tr: "Fermata / Puandorg (noktalı yay): Nabzı durdurur ve işaretli notayı ya da susu zevke göre uzatır (genellikle yakl. 1,5–2 katı)."
    },
    tip: {
      de: "Im Ensemble gibt der Dirigent oder Konzertmeister das gemeinsame Weitergehen an.",
      en: "In ensembles, the conductor or leader cues when everyone moves on.",
      fr: "En ensemble, le chef ou le meneur donne le signal de reprise.",
      es: "En conjunto, el director indica cuándo continuar.",
      it: "In ensemble è il direttore o il leader a dare l’attacco successivo.",
      pl: "W zespole dyrygent lub lider daje znak do ruszenia dalej.",
      uk: "В ансамблі диригент або лідер подає знак до продовження.",
      ur: "گروپ میں کنڈکٹر اشارہ دیتا ہے کہ کب آگے بڑھنا ہے۔",
      tr: "Toplulukta herkesin birlikte devam etmesini şef veya başkemancı işaret eder."
    }
  },
  "breath-mark": {
    short: {
      de: "Kurze Atempause / Einschnitt",
      en: "Brief breath / short break",
      fr: "Courte respiration / coupe",
      es: "Breve respiración / pausa",
      it: "Breve respiro / stacco",
      pl: "Krótki oddech / cezura",
      uk: "Короткий вдих / цезура",
      ur: "مختصر سانس / وقفہ",
      tr: "Kısa nefes arası / kesinti"
    },
    desc: {
      de: "Atemzeichen (Komma ,) trennt Phrasen durch eine winzige Atempause; die Zäsur (//) bewirkt einen deutlichen kurzen Komplett-Stopp („Eisenbahnschienen“).",
      en: "Breath mark (comma ,) inserts a tiny phrasing lift; a caesura (//) creates a clear, brief full stop (“railroad tracks”).",
      fr: "La virgule (,) marque une brève respiration ; la césure (//) crée une coupure nette et complète.",
      es: "La coma (,) indica una breve respiración; la cesura (//) marca una interrupción clara y completa.",
      it: "La virgola (,) indica un breve respiro; la cesura (//) crea una sospensione netta del flusso.",
      pl: "Przecinek (,) to krótki oddech między frazami; cezura (//) to wyraźne, pełne zatrzymanie.",
      uk: "Кома (,) — короткий подих між фразами; цезура (//) — чітка повна зупинка.",
      ur: "سانس کا نشان (،) ہلکا سا وقفہ دیتا ہے، جبکہ سیزورا (//) واضح مگر مختصر مکمل توقف۔",
      tr: "Nefes işareti (virgül ,) cümleleri minik bir nefesle ayırır; sezür (//) ise kısa ama belirgin bir tam duruş yaratır («tren rayları»)."
    },
    tip: {
      de: "Das Atemzeichen nimmt seine kurze Zeit vom Ende der vorherigen Note, nicht vom nächsten Schlag.",
      en: "A breath mark borrows its tiny gap from the end of the previous note.",
      fr: "La respiration se prend sur la fin de la note précédente.",
      es: "La respiración toma su tiempo del final de la nota anterior.",
      it: "Il respiro ruba un istante alla fine della nota precedente.",
      pl: "Oddech zabiera ułamek czasu z końca poprzedniej nuty.",
      uk: "Вдих забирає крихту часу в кінці попередньої ноти.",
      ur: "یہ مختصر وقفہ پچھلے نوٹ کے اختتام سے لیا جاتا ہے۔",
      tr: "Nefes işareti süresini sonraki vuruştan değil, önceki notanın sonundan ödünç alır."
    }
  },
  "dolce": {
    short: {
      de: "Zart, süß & lieblich",
      en: "Sweetly & gently",
      fr: "Doucement, avec tendresse",
      es: "Dulce y suavemente",
      it: "Dolce e morbido",
      pl: "Słodko i delikatnie",
      uk: "Ніжно й м’яко",
      ur: "میٹھا اور نرم انداز",
      tr: "Tatlı, zarif ve yumuşak"
    },
    desc: {
      de: "Dolce: weicher, warmer und liebevoller Anschlag – eher klangliche Farbe als bloße Lautstärke.",
      en: "Dolce: warm, tender and gentle tone quality — describes character and touch, not just volume.",
      fr: "Dolce : toucher tendre, chaleureux et velouté — une couleur autant qu’une nuance.",
      es: "Dolce: toque cálido, tierno y delicado — describe carácter más que solo volumen.",
      it: "Dolce: tocco morbido, caldo e affettuoso — indica il carattere del suono.",
      pl: "Dolce: miękkie, ciepłe i czułe brzmienie — dotyczy barwy, nie tylko głośności.",
      uk: "Дольче: тепле, ніжне, лагідне звучання — передусім тембр і характер.",
      ur: "ڈولچے: نرم، میٹھا اور محبت بھرا انداز — آواز کے معیار کی ہدایت۔",
      tr: "Dolce: sıcak, yumuşak ve sevecen bir tuşe — yalnızca ses düzeyini değil, tını rengini de tarif eder."
    },
    tip: {
      de: "Oft gekoppelt mit cantabile (= gesanglich spielen).",
      en: "Often paired with cantabile (= in a singing style).",
      fr: "Souvent associé à cantabile (= de manière chantante).",
      es: "A menudo junto a cantabile (= de forma cantada).",
      it: "Spesso abbinato a cantabile (= come una voce che canta).",
      pl: "Często łączone z cantabile (= śpiewnie).",
      uk: "Часто поєднується з cantabile (= співучо).",
      ur: "اکثر cantabile (گانے کے انداز میں) کے ساتھ آتا ہے۔",
      tr: "Sıkça cantabile (= şarkı söyler gibi) ile birlikte kullanılır."
    }
  },
  "cantabile": {
    short: {
      de: "Gesanglich & fließend",
      en: "In a singing style",
      fr: "Chantant et lié",
      es: "Cantable y fluido",
      it: "Cantabile e legato",
      pl: "Śpiewnie i płynnie",
      uk: "Співучо й плавно",
      ur: "گانے کے انداز میں",
      tr: "Şarkı söyler gibi ve akıcı"
    },
    desc: {
      de: "Cantabile: Die Melodie soll wie eine tragende Gesangsstimme klingen – verbunden, warm und mit klarem Bogen.",
      en: "Cantabile: shape the melody like a lyrical singing voice — smooth, connected and expressive.",
      fr: "Cantabile : faire chanter la mélodie comme une voix lyrique, liée et expressive.",
      es: "Cantabile: moldear la melodía como una voz que canta, ligada y expresiva.",
      it: "Cantabile: modellare la melodia come una voce che canta, legata e fraseggiata.",
      pl: "Cantabile: prowadzić melodię jak śpiewny głos — płynnie i wyraziście.",
      uk: "Кантабіле: вести мелодію мов співучий голос — плавно й виразно.",
      ur: "کانٹابیلے: دھن کو ایسے بجانا جیسے کوئی گلوکار روانی سے گا رہا ہو۔",
      tr: "Cantabile: Melodi, sıcak, bağlı ve belirgin bir yayla akan bir insan sesi gibi tınlamalıdır."
    },
    tip: {
      de: "Von italienisch „cantare“ = singen.",
      en: "From Italian “cantare” = to sing.",
      fr: "De l’italien « cantare » = chanter.",
      es: "Del italiano «cantare» = cantar.",
      it: "Dall’italiano «cantare».",
      pl: "Od włoskiego „cantare” = śpiewać.",
      uk: "Від італійського «cantare» = співати.",
      ur: "اطالوی لفظ cantare یعنی ’گانا‘ سے ماخوذ۔",
      tr: "İtalyanca «cantare» = şarkı söylemek."
    }
  },
  "maestoso": {
    short: {
      de: "Majestätisch & erhaben",
      en: "Majestic & stately",
      fr: "Majestueux et solennel",
      es: "Majestuoso y solemne",
      it: "Maestoso e solenne",
      pl: "Majestatycznie i dostojnie",
      uk: "Велично й урочисто",
      ur: "شاہانہ اور پُروقار",
      tr: "Görkemli ve yüce"
    },
    desc: {
      de: "Maestoso: groß, würdevoll und breit ausgespielt – oft bei feierlichen Eröffnungen oder großen Hymnen.",
      en: "Maestoso: grand, noble and broad — common in ceremonial openings and stately themes.",
      fr: "Maestoso : noble, ample et solennel — courant dans les ouvertures cérémonielles.",
      es: "Maestoso: grandioso, noble y amplio — habitual en aperturas solemnes.",
      it: "Maestoso: nobile, solenne e ampio — tipico di aperture imponenti.",
      pl: "Maestoso: dostojnie, szeroko i podniośle — częste w uroczystych wstępach.",
      uk: "Маестозо: велично, благородно й широко — типово для урочистих вступів.",
      ur: "مائیسٹوزو: شاندار، باوقار اور کشادہ انداز۔",
      tr: "Maestoso: büyük, vakur ve geniş bir çalım — genellikle törensel açılışlarda veya görkemli temalarda kullanılır."
    },
    tip: {
      de: "Verwandt mit „pesante“ (schwer, gewichtig), aber strahlender.",
      en: "Related to “pesante” (heavy), but grander and brighter.",
      fr: "Proche de « pesante » (lourd), mais plus radieux.",
      es: "Cercano a «pesante» (pesado), pero más brillante.",
      it: "Vicino a «pesante», ma più luminoso e nobile.",
      pl: "Bliskie „pesante” (ciężko), lecz bardziej promienne.",
      uk: "Близьке до «pesante» (важко), але світліше й урочистіше.",
      ur: "pesante سے ملتا جلتا مگر زیادہ روشن اور شاہانہ۔",
      tr: "«pesante» (ağır, oturaklı) ile akrabadır ama daha parlak ve ihtişamlıdır."
    }
  },
  "scherzando": {
    short: {
      de: "Scherzhaft & spielerisch",
      en: "Playful & joking",
      fr: "Enjoué et badin",
      es: "Juguetón y bromista",
      it: "Scherzoso e giocoso",
      pl: "Żartobliwie i figlarnie",
      uk: "Жартівливо й грайливо",
      ur: "شوخ اور کھلندڑا",
      tr: "Şakacı ve oyunbaz"
    },
    desc: {
      de: "Scherzando: leicht, witzig, federnd und mit einem Augenzwinkern vorgetragen.",
      en: "Scherzando: light, witty, bouncy and delivered with playful sparkle.",
      fr: "Scherzando : léger, spirituel et espiègle.",
      es: "Scherzando: ligero, ingenioso y con chispa juguetona.",
      it: "Scherzando: leggero, brillante e giocoso.",
      pl: "Scherzando: lekko, dowcipnie i ze sprężystym wdziękiem.",
      uk: "Скерцандо: легко, дотепно й грайливо.",
      ur: "سکرٹزانڈو: ہلکا، شریر اور کھلندڑے انداز میں۔",
      tr: "Scherzando: hafif, esprili, zıplayan ve muzip bir ifadeyle çalınır."
    },
    tip: {
      de: "Daher heißt auch der heitere Satztyp „Scherzo“.",
      en: "Also the root of the lively movement name “Scherzo”.",
      fr: "Même racine que le mouvement « Scherzo ».",
      es: "Misma raíz que el movimiento «Scherzo».",
      it: "Stessa radice del movimento «Scherzo».",
      pl: "Stąd pochodzi też nazwa części „Scherzo”.",
      uk: "Звідси походить і назва частини «Скерцо».",
      ur: "مشہور فارم ’سکرٹزو‘ (Scherzo) اسی لفظ سے ہے۔",
      tr: "Neşeli bölüm türü olan «Scherzo» adı da buradan gelir."
    }
  },
  "leggiero": {
    short: {
      de: "Leichtfüßig & luftig",
      en: "Light & nimble",
      fr: "Léger et aérien",
      es: "Ligero y ágil",
      it: "Leggero e agile",
      pl: "Lekko i zwiewnie",
      uk: "Легко й повітряно",
      ur: "ہلکا پھلکا اور رواں",
      tr: "Hafif adımlı ve uçucu"
    },
    desc: {
      de: "Leggiero (oder leggero): federnd, unbeschwert und ohne schweres Gewicht in den Tönen.",
      en: "Leggiero (or leggero): airy, agile and effortless without heavy weight on the notes.",
      fr: "Leggiero (ou leggero) : aérien, agile et sans lourdeur.",
      es: "Leggiero (o leggero): aéreo, ágil y sin peso excesivo.",
      it: "Leggiero (o leggero): scorrevole, aereo e privo di pesantezza.",
      pl: "Leggiero (lub leggero): zwiewnie, zwinnie i bez ciężaru.",
      uk: "Леджеро: повітряно, рухливо й невагомо.",
      ur: "لیجیرو: ہوا کی طرح ہلکا، تیز اور بغیر بوجھ کے۔",
      tr: "Leggiero (veya leggero): esnek, zahmetsiz ve notalara ağır yük bindirmeden hafifçe çalınır."
    },
    tip: {
      de: "Gegenteil von pesante (= schwer, gewichtig).",
      en: "Opposite of pesante (= heavy, weighty).",
      fr: "Opposé à pesante (= lourd, appuyé).",
      es: "Opuesto a pesante (= pesado, rotundo).",
      it: "Opposto a pesante (= carico di peso).",
      pl: "Przeciwieństwo pesante (= ciężko, ważko).",
      uk: "Протилежність pesante (= важко, вагомо).",
      ur: "pesante (بھاری) کی ضد۔",
      tr: "Pesante'nin (= ağır, oturaklı) tam karşıtıdır."
    }
  },
  "sotto-voce": {
    short: {
      de: "Halblaut / wie geflüstert",
      en: "Hushed / under the breath",
      fr: "À mi-voix / murmuré",
      es: "A media voz / susurrado",
      it: "Sotto voce / sussurrato",
      pl: "Półgłosem / szeptem",
      uk: "Упівголоса / приглушено",
      ur: "دھیمی سرگوشی کی طرح",
      tr: "Yarım sesle / fısıldar gibi"
    },
    desc: {
      de: "Sotto voce („unter der Stimme“): gedämpft, geheimnisvoll und zurückgenommen – als würde man vertraulich flüstern.",
      en: "Sotto voce (“under the voice”): muted, hushed and intimate — like speaking in a quiet aside.",
      fr: "Sotto voce (« sous la voix ») : feutré, retenu et confidentiel, comme un murmure.",
      es: "Sotto voce («bajo la voz»): apagado, íntimo y contenido, como un susurro.",
      it: "Sotto voce: velato, raccolto e confidenziale, quasi un sussurro.",
      pl: "Sotto voce („pod głosem”): przytłumione, tajemnicze i wyciszone brzmienie.",
      uk: "Сотто воче («під голосом»): приглушено, інтимно й таємниче, немов пошепки.",
      ur: "سوتو ووچے: دبی ہوئی پُراسرار آواز، جیسے کوئی راز کی بات سرگوشی میں کہے۔",
      tr: "Sotto voce («sesin altında»): boğuk, gizemli ve geri çekilmiş — sanki sır verir gibi fısıldayarak."
    },
    tip: {
      de: "Gilt nicht nur für Sänger, sondern auch für Streicher und Klavier!",
      en: "Used not only for singers, but also for strings and piano!",
      fr: "Vaut aussi bien pour le chant que pour les cordes ou le piano !",
      es: "No solo para voces: ¡también se usa en cuerdas y piano!",
      it: "Non solo per il canto, ma anche per archi e pianoforte!",
      pl: "Stosuje się nie tylko w śpiewie, lecz też na smyczkach i fortepianie!",
      uk: "Вживається не лише у вокалі, а й для струнних та фортепіано!",
      ur: "یہ صرف گلوکاروں کے لیے نہیں بلکہ پیانو اور تاروں کے لیے بھی آتا ہے۔",
      tr: "Yalnızca şarkıcılar için değil, yaylılar ve piyano için de kullanılır!"
    }
  },

  // ===== 3. ARTIKULATION, VERZIERUNGEN & SPIELWEISEN =====
  "staccato": {
    short: {
      de: "Kurz & abgesetzt spielen",
      en: "Short & detached",
      fr: "Court et détaché",
      es: "Corto y separado",
      it: "Breve e staccato",
      pl: "Krótko i oddzielnie",
      uk: "Коротко й уривчасто",
      ur: "مختصر اور الگ الگ",
      tr: "Kısa ve kesik çal"
    },
    desc: {
      de: "Staccato (Punkt über/unter dem Notenkopf): Der Ton wird kurz abgestoßen (oft etwa halbe klingende Dauer) – zwischen den Tönen entsteht Luft.",
      en: "Staccato (dot above/below the notehead): play each note crisp and detached (roughly half its sounding length), leaving clear space between notes.",
      fr: "Staccato (point au-dessus/dessous de la note) : chaque note est brève et détachée, avec de l’air entre les sons.",
      es: "Staccato (punto sobre/bajo la nota): cada nota suena corta y separada, dejando aire entre ellas.",
      it: "Staccato (punto sopra/sotto la nota): suono breve e separato, lasciando aria tra una nota e l’altra.",
      pl: "Staccato (kropka nad/pod główką): dźwięki krótkie i wyraźnie oddzielone od siebie.",
      uk: "Стакато (крапка над/під нотою): нота звучить коротко й уривчасто, з паузою до наступної.",
      ur: "اسٹاکاٹو (نوٹ کے اوپر/نیچے نقطہ): ہر نوٹ مختصر اور الگ کر کے بجانا۔",
      tr: "Staccato (nota başının üstünde/altında nokta): Nota kısa ve kesik çalınır (genellikle yazılı süresinin yakl. yarısı) — notalar arasında boşluk kalır."
    },
    tip: {
      de: "Achtung: Punkt ÜBER/UNTER dem Kopf = staccato; Punkt RECHTS daneben = punktierte Note (+50 % Länge)!",
      en: "Careful: dot ABOVE/BELOW = staccato; dot to the RIGHT = dotted rhythm (+50% length)!",
      fr: "Attention : point AU-DESSUS/DESSOUS = staccato ; point À DROITE = note pointée (+50 %) !",
      es: "Ojo: punto ARRIBA/ABAJO = staccato; punto A LA DERECHA = puntillo (+50 % de duración)!",
      it: "Attenzione: punto SOPRA/SOTTO = staccato; punto A DESTRA = punto di valore (+50%)!",
      pl: "Uwaga: kropka NAD/POD = staccato; kropka PO PRAWEJ = wydłużenie rytmu o połowę!",
      uk: "Увага: крапка НАД/ПІД = стакато; крапка ПРАВОРУЧ = подовження тривалості на половину!",
      ur: "یاد رکھیں: اوپر/نیچے نقطہ = اسٹاکاٹو؛ دائیں طرف نقطہ = لمبائی میں 50% اضافہ!",
      tr: "Dikkat: Nota başının ÜSTÜNDE/ALTINDA nokta = staccato; SAĞINDA nokta = noktalı nota (+%50 süre)!"
    }
  },
  "staccatissimo": {
    short: {
      de: "Extrem kurz & spitz",
      en: "Extremely short & sharp",
      fr: "Extrêmement bref et sec",
      es: "Extremadamente corto",
      it: "Estremamente breve",
      pl: "Wyjątkowo krótko i ostro",
      uk: "Надзвичайно коротко й гостро",
      ur: "انتہائی مختصر اور تیز",
      tr: "Aşırı kısa ve sivri"
    },
    desc: {
      de: "Staccatissimo (spitzer Keil über/unter der Note): Noch kürzer, trockener und spitzer als normales Staccato.",
      en: "Staccatissimo (sharp wedge above/below note): even shorter, crisper and more pointed than regular staccato.",
      fr: "Staccatissimo (coin pointu) : encore plus bref et piqué que le staccato ordinaire.",
      es: "Staccatissimo (cuña puntiaguda): aún más corto y punzante que el staccato normal.",
      it: "Staccatissimo (cuneo appuntito): ancora più breve e pungente del normale staccato.",
      pl: "Staccatissimo (ostry klin): jeszcze krócej i ostrzej niż zwykłe staccato.",
      uk: "Стакатисимо (гострий клин): ще коротше й гостріше, ніж звичайне стакато.",
      ur: "اسٹاکاٹی سیمو (نوک دار نشان): عام اسٹاکاٹو سے بھی زیادہ مختصر اور چست۔",
      tr: "Staccatissimo (notanın üstünde/altında sivri kama): Normal staccato'dan bile daha kısa, kuru ve keskin."
    },
    tip: {
      de: "Die Spitze des Keils zeigt immer zur Note.",
      en: "The tip of the wedge always points toward the note.",
      fr: "La pointe du coin est toujours tournée vers la note.",
      es: "La punta de la cuña siempre señala hacia la nota.",
      it: "La punta del cuneo è sempre rivolta verso la nota.",
      pl: "Czubek klina zawsze wskazuje w stronę nuty.",
      uk: "Вістря клина завжди спрямоване до ноти.",
      ur: "اس کی نوک ہمیشہ نوٹ کی طرف اشارہ کرتی ہے۔",
      tr: "Kamanın sivri ucu her zaman notayı gösterir."
    }
  },
  "tenuto": {
    short: {
      de: "Voll aushalten & betonen",
      en: "Hold full value / lean",
      fr: "Tenir toute la valeur",
      es: "Mantener todo su valor",
      it: "Tenere tutto il valore",
      pl: "Wytrzymać pełną wartość",
      uk: "Витримати повну тривалість",
      ur: "پوری لمبائی تک ٹھہرانا",
      tr: "Tam değerinde tut ve vurgula"
    },
    desc: {
      de: "Tenuto (waagerechter Strich über/unter der Note): Den Ton über seine volle Dauer tragen und sanft gewichtsvoll hervorheben.",
      en: "Tenuto (horizontal bar above/below note): hold the note for its full written length with gentle weight.",
      fr: "Tenuto (trait horizontal) : tenir la note dans toute sa valeur avec un léger appui.",
      es: "Tenuto (raya horizontal): sostener la nota en toda su duración con un leve peso.",
      it: "Tenuto (trattino orizzontale): sostenere la nota per l’intero valore con morbido peso.",
      pl: "Tenuto (pozioma kreska): utrzymać dźwięk przez całą jego wartość z miękkim ciężarem.",
      uk: "Тенуто (горизонтальна риска): витримати ноту повністю, з м’якою вагомістю.",
      ur: "ٹینوٹو (افقی لکیر): نوٹ کو اس کی پوری مقررہ مدت تک نرم وزن کے ساتھ بجانا۔",
      tr: "Tenuto (notanın üstünde/altında yatay çizgi): Notayı tam yazılı süresi boyunca tut ve yumuşak bir ağırlıkla öne çıkar."
    },
    tip: {
      de: "Das genaue Gegenteil von Staccato: breit und getragen statt kurz.",
      en: "The opposite of staccato: broad and full-length instead of short.",
      fr: "L’opposé du staccato : plein et tenu plutôt que court.",
      es: "Lo contrario al staccato: pleno y sostenido.",
      it: "L’opposto dello staccato: pieno e sostenuto.",
      pl: "Przeciwieństwo staccato: szeroko i w pełni.",
      uk: "Протилежність стакато: повно й витримано.",
      ur: "اسٹاکاٹو کی ضد: مختصر کے بجائے بھرپور اور کشادہ۔",
      tr: "Staccato'nun tam tersidir: kısa değil, geniş ve doygun."
    }
  },
  "portato": {
    short: {
      de: "Weich getrennt (Halb-Legato)",
      en: "Softly pulsed / semi-detached",
      fr: "Portato (lourdé / doux)",
      es: "Portato (suavemente separado)",
      it: "Portato (legato morbido)",
      pl: "Portato (miękko oddzielone)",
      uk: "Портато (м’яко розділено)",
      ur: "نرم انداز میں ہلکا سا الگ",
      tr: "Yumuşakça ayrılmış (yarı legato)"
    },
    desc: {
      de: "Portato / Non-legato (Punkte oder Striche unter einem Bogen): Die Töne bleiben weich verbunden, werden aber sanft voneinander abgesetzt.",
      en: "Portato (dots or lines under a slur): notes stay gently connected yet softly articulated apart.",
      fr: "Portato (points sous une liaison) : les notes restent liées dans un même geste mais doucement articulées.",
      es: "Portato (puntos bajo ligadura): las notas fluyen juntas pero con una suave separación.",
      it: "Portato (punti sotto legatura): suono morbido, a metà tra legato e staccato.",
      pl: "Portato (kropki pod łukiem): dźwięki lekko pulsują, między legato a staccato.",
      uk: "Портато (крапки під лігою): звуки м’яко відокремлені — щось середнє між legato і staccato.",
      ur: "پورٹاٹو (قوس کے نیچے نقطے): لیگاٹو اور اسٹاکاٹو کے درمیان نرم انداز۔",
      tr: "Portato / Non-legato (bir bağın altında noktalar veya çizgiler): Notalar yumuşakça bağlı kalır ama hafifçe birbirinden ayrılır."
    },
    tip: {
      de: "Klingt wie ein sanftes „da-da-da“ statt scharfem „t-t-t“.",
      en: "Sounds like a gentle “da-da-da” rather than a crisp “t-t-t”.",
      fr: "Sonne comme un doux « da-da-da » plutôt qu’un sec « ta-ta-ta ».",
      es: "Suena como un suave «da-da-da» en vez de un seco «ta-ta-ta».",
      it: "Suona come un morbido «da-da-da» invece di un secco «ta-ta-ta».",
      pl: "Brzmi jak miękkie „da-da-da” zamiast ostrego „ta-ta-ta”.",
      uk: "Звучить як м’яке «да-да-да» замість різкого «та-та-та».",
      ur: "تیز ’ت ت ت‘ کے بجائے نرم ’دا دا دا‘ جیسا سنائی دیتا ہے۔",
      tr: "Keskin «t-t-t» yerine yumuşak bir «da-da-da» gibi duyulur."
    }
  },
  "accent": {
    short: {
      de: "Note kräftig betonen",
      en: "Emphasize / stress note",
      fr: "Accentuer la note",
      es: "Acentuar la nota",
      it: "Accentuare la nota",
      pl: "Zaakcentować dźwięk",
      uk: "Виділити ноту акцентом",
      ur: "نوٹ پر زور دینا",
      tr: "Notayı güçlü vurgula"
    },
    desc: {
      de: "Akzent (> über/unter einer Note): Diese Note hebt sich durch klaren, kräftigen Anschlag deutlich von den Nachbarnoten ab.",
      en: "Accent (> above/below a note): gives the marked note a clear, stronger attack than surrounding notes.",
      fr: "Accent (> sur/sous une note) : donne une attaque nettement plus marquée que les notes voisines.",
      es: "Acento (> sobre/bajo una nota): destaca la nota con un ataque más enérgico.",
      it: "Accento (> sopra/sotto una nota): mette in rilievo la nota con un attacco più incisivo.",
      pl: "Akcent (> nad/pod nutą): wyraźne wyróżnienie pojedynczego dźwięku mocniejszym atakiem.",
      uk: "Акцент (> над/під нотою): чітко виділяє ноту сильнішою атакою.",
      ur: "ایکسنٹ (>): اس نوٹ کو ارد گرد کے نوٹوں سے زیادہ واضح اور مضبوط بجانا۔",
      tr: "Aksan / Vurgu (notanın üstünde/altında >): Bu nota net ve güçlü bir atakla komşu notalardan belirgin biçimde ayrılır."
    },
    tip: {
      de: "Klein über einer Note = Akzent; lang über mehrere Takte = Decrescendo-Gabel.",
      en: "Small on one note = accent; stretched across beats = decrescendo hairpin.",
      fr: "Petit sur une note = accent ; long sur plusieurs temps = decrescendo.",
      es: "Pequeño sobre una nota = acento; largo = decrescendo.",
      it: "Piccolo su una nota = accento; lungo = decrescendo.",
      pl: "Mały nad jedną nutą = akcent; długi = decrescendo.",
      uk: "Малий над нотою = акцент; довгий = декрещендо.",
      ur: "ایک نوٹ پر چھوٹا = ایکسنٹ؛ لمبا پھیلا ہوا = ڈیکریشینڈو۔",
      tr: "Tek notanın üstünde küçük = vurgu; birkaç vuruşa uzanan büyük = decrescendo çatalı."
    }
  },
  "marcato": {
    short: {
      de: "Sehr scharf & kräftig betont",
      en: "Strongly accented & sharp",
      fr: "Très accentué et marqué",
      es: "Muy acentuado y marcado",
      it: "Molto marcato e incisivo",
      pl: "Bardzo mocno i ostro",
      uk: "Дуже різко й підкреслено",
      ur: "نہایت تیز اور نمایاں زور",
      tr: "Çok keskin ve güçlü vurgulu"
    },
    desc: {
      de: "Marcato (Dach ^ über der Note): Kräftiger und bissiger als ein normaler Akzent (>), oft auch etwas kürzer abgestoßen.",
      en: "Marcato (housetop ^ above note): louder and punchier than a standard accent (>), often slightly detached.",
      fr: "Marcato (accent circonflexe ^) : plus percutant qu’un accent normal, souvent un peu sec.",
      es: "Marcato (tejado ^): más intenso y tajante que el acento normal (>).",
      it: "Marcato (tetto ^): più energico e incisivo del normale accento (>).",
      pl: "Marcato (daszek ^): mocniejsze i bardziej cięte niż zwykły akcent (>).",
      uk: "Маркато (дашок ^): сильніше й різкіше за звичайний акцент (>).",
      ur: "مارکاٹو (^): عام ایکسنٹ سے زیادہ سخت اور تیز جھٹکا۔",
      tr: "Marcato (notanın üstünde çatı ^): Normal vurgudan (>) daha güçlü ve serttir, çoğu zaman biraz daha kısa kesilir."
    },
    tip: {
      de: "Sieht aus wie ein steiles Dach – genauso „spitz“ klingt der Anschlag.",
      en: "Looks like a sharp rooftop — and sounds just as punchy.",
      fr: "Ressemble à un toit pointu, aussi incisif que son attaque.",
      es: "Parece un tejado picudo — y suena igual de incisivo.",
      it: "Sembra un tetto appuntito — e ha la stessa incisività.",
      pl: "Wygląda jak ostry daszek — tak samo ostro brzmi atak.",
      uk: "Схожий на гострий дашок — таким самим є й удар.",
      ur: "نوک دار چھت کی طرح دکھتا ہے اور آواز میں بھی اتنا ہی تیز ہے۔",
      tr: "Dik bir çatıya benzer — atağı da tıpkı öyle «sivri» duyulur."
    }
  },
  "legato-slur": {
    short: {
      de: "Weich gebunden (Legato)",
      en: "Smoothly connected (slur)",
      fr: "Lié / coulé (legato)",
      es: "Ligado suavemente (legato)",
      it: "Legato e scorrevole",
      pl: "Płynnie połączone (legato)",
      uk: "Плавно й зв’язно (легато)",
      ur: "نرمی سے ملا کر بجانا (لیگاٹو)",
      tr: "Yumuşakça bağlı (Legato)"
    },
    desc: {
      de: "Bindebogen / Phrasierungsbogen (Bogen über verschiedenen Tonhöhen): Die Töne gehen lückenlos und gesanglich ineinander über (legato).",
      en: "Slur (curved line over different pitches): play the notes smoothly connected with no audible gap (legato).",
      fr: "Liaison d’expression (courbe sur des hauteurs différentes) : jouer les notes liées sans coupure (legato).",
      es: "Ligadura de expresión (sobre notas distintas): unir los sonidos con fluidez sin cortes (legato).",
      it: "Legatura di frase (su altezze diverse): collegare le note senza stacchi (legato).",
      pl: "Łuk frazowy / legato (nad różnymi wysokościami): grać dźwięki płynnie i bez przerw.",
      uk: "Фразувальна ліга (над різними висотами): грати ноти плавно, без розривів (легато).",
      ur: "سلر (مختلف سُروں کے اوپر قوس): نوٹوں کو بغیر وقفے کے نرمی سے جوڑ کر بجانا۔",
      tr: "Legato bağı / Cümleleme bağı (farklı perdeler üzerindeki yay): Notalar arada boşluk olmadan, akıcı ve şarkı gibi birbirine bağlanır (legato)."
    },
    tip: {
      de: "Merke: Verschiedene Tonhöhen = Bindebogen (legato). Gleiche Tonhöhe = Haltebogen!",
      en: "Rule: Different pitches = slur (legato). Same pitch = tie!",
      fr: "Règle : Hauteurs différentes = liaison legato. Même hauteur = liaison de prolongation !",
      es: "Regla: Notas distintas = ligadura legato. Misma altura = ligadura de prolongación.",
      it: "Regola: Altezze diverse = legato. Stessa altezza = legatura di valore!",
      pl: "Zasada: Różne wysokości = legato. Ta sama wysokość = łuk przedłużający!",
      uk: "Правило: Різні висоти = ліга легато. Однакова висота = ліга подовження!",
      ur: "اصول: مختلف سُر = لیگاٹو؛ ایک ہی سُر = ٹائی (لمبائی کا جوڑ)!",
      tr: "Kural: Farklı sesler = legato bağı. Aynı ses = uzatma bağı!"
    }
  },
  "tie": {
    short: {
      de: "Notenwerte addieren (Haltebogen)",
      en: "Tie: combine note lengths",
      fr: "Liaison de prolongation",
      es: "Ligadura: sumar duraciones",
      it: "Legatura di valore (somma)",
      pl: "Łuk: złączyć czas trwania",
      uk: "Ліга подовження (один звук)",
      ur: "ٹائی: ایک ہی سُر کو لمبا کرنا",
      tr: "Nota sürelerini birleştir (uzatma bağı)"
    },
    desc: {
      de: "Haltebogen (Bogen zwischen zwei exakt gleichen Tonhöhen): Der zweite Ton wird NICHT neu angeschlagen – beide Notenwerte verschmelzen zu einem langen Ton.",
      en: "Tie (curved line joining two identical pitches): do NOT re-strike the second note — hold through the combined duration.",
      fr: "Liaison de prolongation (entre deux notes de même hauteur) : ne pas réattaquer la 2e note, additionner leurs durées.",
      es: "Ligadura de prolongación (misma altura): NO volver a atacar la segunda nota; sumar ambas duraciones.",
      it: "Legatura di valore (stessa altezza): NON ribattere la seconda nota, ma sommare le durate.",
      pl: "Łuk przedłużający (dwa identyczne dźwięki): NIE uderzaj drugiej nuty — połącz ich czas trwania.",
      uk: "Ліга подовження (дві однакові ноти): другу ноту НЕ грати заново — їхні тривалості додаються.",
      ur: "ٹائی (دو ایک جیسے سُروں کو ملانے والی قوس): دوسرا نوٹ دوبارہ نہیں بجاتے بلکہ پہلا ہی جاری رہتا ہے۔",
      tr: "Uzatma bağı (birebir aynı iki perdeyi birleştiren yay): İkinci nota yeniden ÇALINMAZ — iki süre birleşerek tek bir uzun ses olur."
    },
    tip: {
      de: "Oft über einen Taktstrich hinweg, um lange Töne oder Synkopen zu notieren.",
      en: "Often crosses a barline to write long sustained notes or syncopations.",
      fr: "Traverse souvent une barre de mesure pour prolonger un son ou écrire une syncope.",
      es: "Suele cruzar la barra de compás para notas largas o síncopas.",
      it: "Attraversa spesso la stanghetta di battuta per suoni lunghi o sincopi.",
      pl: "Często przechodzi przez kreskę taktową przy długich dźwiękach i synkopach.",
      uk: "Часто перетинає тактову риску для довгих звуків або синкоп.",
      ur: "اکثر بار لائن کے پار طویل سُر یا سنکوپیشن لکھنے کے کام آتا ہے۔",
      tr: "Uzun sesleri veya senkopları yazmak için sıkça ölçü çizgisinin üzerinden geçer."
    }
  },
  "trill": {
    short: {
      de: "Schneller Wechsel zum Oberton",
      en: "Rapid alternation with note above",
      fr: "Alternance rapide (trille)",
      es: "Alternancia rápida (trino)",
      it: "Alternanza rapida (trillo)",
      pl: "Szybka naprzemienność (tryl)",
      uk: "Швидке чергування (трель)",
      ur: "اوپر والے سُر کے ساتھ تیز ردوبدل",
      tr: "Üst komşu sesle hızlı değişim"
    },
    desc: {
      de: "Triller (tr oder tr~~~): Rascher, gleichmäßiger Wechsel zwischen der notierten Hauptnote und der nächsthöheren Tonleiterstufe.",
      en: "Trill (tr or tr~~~): rapid, even alternation between the written pitch and the scale step directly above it.",
      fr: "Trille (tr ou tr~~~) : battement rapide et régulier entre la note écrite et le degré supérieur de la gamme.",
      es: "Trino (tr o tr~~~): alternancia rápida entre la nota escrita y el grado inmediatamente superior.",
      it: "Trillo (tr o tr~~~): alternanza rapida tra la nota scritta e il grado superiore della scala.",
      pl: "Tryl (tr lub tr~~~): szybka, równa zmiana między zapisanym dźwiękiem a wyższym stopniem gamy.",
      uk: "Трель (tr або tr~~~): швидке рівномірне чергування основної ноти з сусідньою вищою.",
      ur: "ٹرل (tr): لکھے ہوئے نوٹ اور اس کے فوراً اوپر والے سُر کے درمیان تیز ردوبدل۔",
      tr: "Tril (tr veya tr~~~): Yazılı ana nota ile dizideki bir üst basamağı arasında hızlı ve düzenli gidip gelme."
    },
    tip: {
      de: "Eine Wellenlinie zeigt genau an, wie lange getrillert wird.",
      en: "A wavy line shows exactly how long the trill continues.",
      fr: "La ligne ondulée indique exactement la durée du trille.",
      es: "La línea ondulada indica cuánto dura exactamente el trino.",
      it: "La linea ondulata mostra con precisione la durata del trillo.",
      pl: "Falista linia precyzyjnie pokazuje czas trwania trylu.",
      uk: "Хвиляста лінія точно показує тривалість трелі.",
      ur: "لہراتی ہوئی لکیر بتاتی ہے کہ ٹرل کتنی دیر تک جاری رہے گا۔",
      tr: "Dalgalı çizgi trilin tam olarak ne kadar süreceğini gösterir."
    }
  },
  "mordent": {
    short: {
      de: "Kurzer Wechsel zur Nachbarnote",
      en: "Quick single-step ornament",
      fr: "Ornement bref (mordant)",
      es: "Adorno breve (mordente)",
      it: "Abbellimento breve (mordente)",
      pl: "Krótka ozdoba (mordent)",
      uk: "Коротка прикраса (мордент)",
      ur: "پڑوسی سُر کا تیز جھٹکا (مورڈنٹ)",
      tr: "Komşu sesle kısa süsleme"
    },
    desc: {
      de: "Pralltriller (ohne Strich: Hauptnote–oberer Nachbar–Hauptnote) und Mordent (mit senkrechtem Strich: Hauptnote–unterer Nachbar–Hauptnote).",
      en: "Upper mordent (no vertical line: main–upper–main) and lower mordent (vertical slash: main–lower–main).",
      fr: "Mordant supérieur (sans trait : note–supérieure–note) et inférieur (barré : note–inférieure–note).",
      es: "Mordente superior (sin barra: nota–superior–nota) e inferior (con barra: nota–inferior–nota).",
      it: "Mordente superiore (senza taglio: nota–superiore–nota) e inferiore (tagliato: nota–inferiore–nota).",
      pl: "Mordent górny (bez kreski: główna–górna–główna) i dolny (przekreślony: główna–dolna–główna).",
      uk: "Верхній мордент (без риски: головна–верхня–головна) і нижній (перекреслений: головна–нижня–головна).",
      ur: "مورڈنٹ: بغیر لکیر کے اوپر والے سُر کو چھو کر واپسی؛ عمودی لکیر کے ساتھ نیچے والے سُر کو چھو کر واپسی۔",
      tr: "Üst mordan (çizgisiz: ana ses–üst komşu–ana ses) ve alt mordan (dikey çizgili: ana ses–alt komşu–ana ses)."
    },
    tip: {
      de: "Eselsbrücke: Der Strich geht nach UNTEN durch → unterer Mordent!",
      en: "Memory trick: the slash cuts DOWN through it → lower mordent!",
      fr: "Astuce : la barre descend à travers le signe → mordant inférieur !",
      es: "Truco: la barra baja cruzando el signo → mordente inferior.",
      it: "Trucco: il taglio scende attraverso il segno → mordente inferiore!",
      pl: "Skojarzenie: kreska tnie w DÓŁ → mordent dolny!",
      uk: "Підказка: риска перетинає ВНИЗ → нижній мордент!",
      ur: "یاد رکھنے کا طریقہ: عمودی لکیر نیچے جاتی ہے ← نیچے والا مورڈنٹ!",
      tr: "İpucu: Dikey çizgi AŞAĞI doğru keser → alt mordan!"
    }
  },
  "turn": {
    short: {
      de: "Doppelschlag (um die Note)",
      en: "Turn (around main note)",
      fr: "Gruppetto (autour de la note)",
      es: "Grupeto (rodeando la nota)",
      it: "Gruppetto (intorno alla nota)",
      pl: "Obiegnik (wokół nuty)",
      uk: "Групето (навколо ноти)",
      ur: "ٹرن (سُر کے گرد گھماؤ)",
      tr: "Gruppetto (notanın etrafında dönüş)"
    },
    desc: {
      de: "Doppelschlag / Gruppetto (liegendes S): Umspielt den Hauptton fließend – oberer Nachbar → Hauptton → unterer Nachbar → Hauptton.",
      en: "Turn / Gruppetto (sideways S): winds smoothly around the pitch — upper neighbor → main → lower neighbor → main.",
      fr: "Gruppetto (S couché) : brode autour de la note — supérieure → principale → inférieure → principale.",
      es: "Grupeto (S tumbada): rodea la nota — superior → principal → inferior → principal.",
      it: "Gruppetto (S coricata): gira attorno alla nota — superiore → principale → inferiore → principale.",
      pl: "Obiegnik (leżące S): okrąża dźwięk — górny → główny → dolny → główny.",
      uk: "Групето (лежаче S): оплітає ноту — верхня → головна → нижня → головна.",
      ur: "ٹرن (لیٹا ہوا S): اوپر والا سُر ← اصل ← نیچے والا سُر ← اصل۔",
      tr: "Gruppetto / Çift çarpma (yatay S): Ana sesin etrafını akıcı biçimde dolaşır — üst komşu → ana ses → alt komşu → ana ses."
    },
    tip: {
      de: "Die Kurve des Zeichens malt exakt die Melodielinie: erst hoch, dann runter, zurück.",
      en: "The S-curve literally draws the melodic path: up, down, and back.",
      fr: "La courbe du signe dessine le mouvement : haut, bas, retour.",
      es: "La curva dibuja literalmente el giro: sube, baja y vuelve.",
      it: "La curva disegna il percorso: su, giù e ritorno.",
      pl: "Kształt litery S rysuje ruch melodii: w górę, w dół i powrót.",
      uk: "Крива символу буквально малює рух: угору, вниз і назад.",
      ur: "علامت کی شکل ہی دھن کا راستہ دکھاتی ہے: اوپر، نیچے، پھر واپس۔",
      tr: "İşaretin S kıvrımı ezginin yolunu birebir çizer: önce yukarı, sonra aşağı, sonra geri."
    }
  },
  "grace-note": {
    short: {
      de: "Kurzer Vorschlag vor Zielton",
      en: "Grace note before main note",
      fr: "Petite note d’ornement",
      es: "Nota de adorno (apoyatura)",
      it: "Acciaccatura / appoggiatura",
      pl: "Krótka przednutka",
      uk: "Короткий форшлаг",
      ur: "مختصر سجاوٹی نوٹ (گریس نوٹ)",
      tr: "Ana notadan önce kısa çarpma"
    },
    desc: {
      de: "Vorschlag: Klein gedruckte Verzierungsnote. Mit Querstrich (Acciaccatura) blitzschnell vor/auf dem Schlag; ohne Strich (Appoggiatura) melodiös betont.",
      en: "Grace note: small ornamental note. Slashed (acciaccatura) is played lightning-fast; unslashed (appoggiatura) leans expressively on the beat.",
      fr: "Petite note : barrée (acciaccatura), très vive ; non barrée (appoggiatura), plus appuyée sur le temps.",
      es: "Nota de adorno: tachada (acciaccatura), muy rápida; sin tachar (apoyatura), apoyada expresivamente.",
      it: "Acciaccatura (tagliata): rapidissima; appoggiatura (non tagliata): appoggiata espressivamente sul battito.",
      pl: "Przednutka: przekreślona (krótka) — błyskawiczna; nieprzekreślona (długa) — śpiewnie podkreślona.",
      uk: "Форшлаг: перекреслений — миттєвий короткий; неперекреслений — виразний довгий на долю.",
      ur: "گریس نوٹ: لکیر کے ساتھ انتہائی تیز جھٹکا؛ بغیر لکیر کے پُراثر اور ذرا طویل۔",
      tr: "Çarpma / Ön nota: Küçük yazılan süsleme notası. Üzerinde eğik çizgi varsa (Acciaccatura) şimşek gibi hızlı; çizgisizse (Appoggiatura) ezgisel ve vurgulu çalınır."
    },
    tip: {
      de: "Der kleine Vorschlag zählt nicht extra zur Taktlänge – er „leiht“ sich seine Zeit.",
      en: "Grace notes don’t add extra beats to the bar — they borrow time.",
      fr: "Elle ne compte pas dans la mesure : elle emprunte sa durée.",
      es: "No suma pulsos al compás: toma prestado su tiempo.",
      it: "Non aggiunge battiti alla misura: prende tempo in prestito.",
      pl: "Nie dodaje wartości do taktu — pożycza czas od sąsiedniej nuty.",
      uk: "Не додає зайвої тривалості до такту — позичає час.",
      ur: "یہ بار کی گنتی میں اضافی وقت نہیں لیتا بلکہ ساتھ والے نوٹ سے وقت ادھار لیتا ہے۔",
      tr: "Küçük çarpma notası ölçüye ekstra vuruş eklemez — süresini komşu notadan ödünç alır."
    }
  },
  "arpeggio": {
    short: {
      de: "Akkord gebrochen aufrollen",
      en: "Roll chord notes in sequence",
      fr: "Égrener l’accord (arpège)",
      es: "Desplegar el acorde (arpegio)",
      it: "Suonare l’accordo arpeggiato",
      pl: "Rozłożyć akord (arpeggio)",
      uk: "Розкласти акорд (арпеджіо)",
      ur: "کورڈ کے سُروں کو یکے بعد دیگرے بجانا",
      tr: "Akoru kırarak sırayla çal"
    },
    desc: {
      de: "Arpeggio (senkrechte Wellenlinie vor einem Akkord): Die Töne klingen rasch nacheinander (standardmäßig von unten nach oben) statt exakt gleichzeitig – wie auf einer Harfe.",
      en: "Arpeggio (vertical wavy line before a chord): roll the chord tones rapidly one after another (bottom to top by default), harp-style.",
      fr: "Arpège (ligne ondulée verticale) : jouer les notes de l’accord rapidement l’une après l’autre, comme à la harpe.",
      es: "Arpegio (onda vertical ante el acorde): tocar las notas rápidamente una tras otra (de abajo arriba), como en un arpa.",
      it: "Arpeggio (linea ondulata verticale): suonare le note in rapida successione dal basso verso l’alto, come sull’arpa.",
      pl: "Arpeggio (pionowa fala przed akordem): rozłożyć dźwięki akordu szybko od dołu do góry jak na harfie.",
      uk: "Арпеджіо (вертикальна хвиля перед акордом): швидко перебрати звуки акорду знизу вгору, мов на арфі.",
      ur: "آرپیجیو (کورڈ سے پہلے عمودی لہر): کورڈ کے نوٹ ایک ساتھ کے بجائے نیچے سے اوپر تیزی سے ہارپ کی طرح بجانا۔",
      tr: "Arpej (akorun önünde dikey dalgalı çizgi): Sesler aynı anda değil, arp çalar gibi hızla art arda (varsayılan olarak aşağıdan yukarıya) duyulur."
    },
    tip: {
      de: "Zeigt ein Pfeil nach unten, wird der Akkord von oben nach unten abgerollt.",
      en: "A downward arrow on the wave rolls the chord from top to bottom.",
      fr: "Une flèche vers le bas indique un arpège de haut en bas.",
      es: "Una flecha hacia abajo indica arpegiar de arriba abajo.",
      it: "Una freccia verso il basso indica di arpeggiare dall’alto in basso.",
      pl: "Strzałka w dół oznacza rozłożenie akordu od góry do dołu.",
      uk: "Стрілка вниз означає перебір акорду зверху донизу.",
      ur: "نیچے کی طرف تیر ہو تو اوپر سے نیچے کی طرف بجاتے ہیں۔",
      tr: "Dalgalı çizgide aşağı yönlü ok varsa akor yukarıdan aşağıya doğru kırılır."
    }
  },
  "glissando": {
    short: {
      de: "Nahtlos zum Zielton gleiten",
      en: "Slide smoothly to target pitch",
      fr: "Glisser jusqu’à la note cible",
      es: "Deslizar hacia la nota destino",
      it: "Scivolare verso la nota",
      pl: "Płynnie prześlizgnąć się",
      uk: "Плавно ковзнути до ноти",
      ur: "ایک سُر سے دوسرے تک پھسلنا",
      tr: "Hedef sese kesintisiz kay"
    },
    desc: {
      de: "Glissando (schräge Linie/Welle mit „gliss.“): Schnelles Gleiten über alle dazwischenliegenden Töne hinweg bis zur Zielnote.",
      en: "Glissando (slanted line/wave with “gliss.”): rapid slide sweeping across every pitch between start and target.",
      fr: "Glissando (ligne oblique avec « gliss. ») : glissement rapide sur toutes les hauteurs intermédiaires.",
      es: "Glissando (línea oblicua con «gliss.»): deslizamiento rápido por todas las notas intermedias.",
      it: "Glissando (linea obliqua con «gliss.»): scivolamento rapido su tutti i suoni intermedi.",
      pl: "Glissando (ukośna linia z „gliss.”): szybki prześlizg po wszystkich dźwiękach pośrednich.",
      uk: "Глісандо (похила лінія з «gliss.»): швидке ковзання по всіх проміжних звуках.",
      ur: "گلیسانڈو (ترچھی لکیر): درمیان کے تمام سُروں پر تیزی سے پھسلتے ہوئے اگلے نوٹ تک جانا۔",
      tr: "Glissando («gliss.» yazılı eğik çizgi/dalga): Başlangıçtan hedef notaya kadar aradaki tüm seslerin üzerinden hızla kayarak geçme."
    },
    tip: {
      de: "Auf Posaune/Geige stufenlos, auf Klavier/Harfe als rascher Tasten- oder Saitenlauf.",
      en: "Continuous on trombone/violin; a fast sweep across keys or strings on piano/harp.",
      fr: "Continu au trombone/violon ; balayage rapide au piano ou à la harpe.",
      es: "Continuo en trombón/violín; barrido veloz en piano o arpa.",
      it: "Continuo su trombone/violino; rapida corsa su pianoforte o arpa.",
      pl: "Płynne na puzonie/skrzypcach; szybki przebieg po klawiszach na fortepianie.",
      uk: "Плавне на тромбоні/скрипці; швидкий пробіг по клавішах на фортепіано.",
      ur: "وائلن/ٹرومبون پر مسلسل پھسلن، پیانو پر تیز دوڑ۔",
      tr: "Trombon/kemanda kesintisiz; piyano/arpta tuşlar veya teller üzerinde hızlı bir kaydırma olarak duyulur."
    }
  },
  "tremolo": {
    short: {
      de: "Sehr schnelle Tonwiederholung",
      en: "Rapid repetition / quiver",
      fr: "Répétition très rapide (trémolo)",
      es: "Repetición rapidísima (trémolo)",
      it: "Ripetizione rapidissima (tremolo)",
      pl: "Bardzo szybkie powtarzanie",
      uk: "Дуже швидке повторення (тремоло)",
      ur: "ایک ہی سُر کی تیز تکرار (ٹریمولو)",
      tr: "Çok hızlı ses tekrarı"
    },
    desc: {
      de: "Tremolo (schräge Balken am Notenhals oder zwischen 2 Tönen): Flirrend schnelle Wiederholung eines Tons oder Wechsels zwischen zwei Tönen.",
      en: "Tremolo (slanted beams on a stem or between two notes): shimmering, rapid repetition of a single pitch or alternation between two pitches.",
      fr: "Trémolo (barres obliques) : répétition frémissante d’une note ou alternance rapide entre deux notes.",
      es: "Trémolo (barras oblicuas): repetición vibrante y veloz de una nota o alternancia entre dos.",
      it: "Tremolo (tratti obliqui): ripetizione rapidissima e vibrante di una nota o alternanza fra due.",
      pl: "Tremolo (ukośne belki): migoczące, bardzo szybkie powtarzanie jednego dźwięku lub dwóch na przemian.",
      uk: "Тремоло (похилі ребра): мерехтливе швидке повторення однієї ноти або чергування двох.",
      ur: "ٹریمولو (ترچھی لکیریں): ایک نوٹ یا دو نوٹوں کی کپکپاتی ہوئی انتہائی تیز تکرار۔",
      tr: "Tremolo (nota sapında veya iki nota arasında eğik çizgiler): Tek bir sesin ya da iki ses arasındaki geçişin titreşimli, çok hızlı tekrarı."
    },
    tip: {
      de: "Drei Balken bedeuten meist „so schnell und flirrend wie möglich“ (unmeasured tremolo).",
      en: "Three slashes usually mean “as fast and shimmering as possible” (unmeasured).",
      fr: "Trois barres signifient généralement un trémolo non mesuré, aussi rapide que possible.",
      es: "Tres barras suelen indicar un trémolo libre lo más rápido posible.",
      it: "Tre tagli indicano di solito un tremolo libero il più rapido possibile.",
      pl: "Trzy kreski oznaczają zwykle niemierzone tremolo — jak najszybciej.",
      uk: "Три риски зазвичай означають вільне, максимально швидке тремоло.",
      ur: "تین لکیروں کا مطلب عموماً جتنا ممکن ہو اتنی تیز تکرار ہے۔",
      tr: "Üç eğik çizgi genellikle «mümkün olduğunca hızlı ve titreşimli» (ölçüsüz tremolo) anlamına gelir."
    }
  },
  "octave-8va": {
    short: {
      de: "Eine Oktave höher spielen",
      en: "Play one octave higher",
      fr: "Jouer une octave plus haut",
      es: "Tocar una octava más alta",
      it: "Suonare un’ottava sopra",
      pl: "Zagrać oktawę wyżej",
      uk: "Грати на октаву вище",
      ur: "ایک آکٹیو اونچا بجانا",
      tr: "Bir oktav tiz çal"
    },
    desc: {
      de: "Ottava alta (8va ---- über dem System): Alle Noten unter der gestrichelten Linie klingen eine volle Oktave höher als notiert – spart unlesbare Hilfslinien!",
      en: "Ottava alta (8va ---- above the staff): play every note under the dashed bracket one full octave higher — avoids clutter of ledger lines.",
      fr: "Ottava alta (8va ---- au-dessus) : jouer toutes les notes sous le pointillé une octave plus haut.",
      es: "Ottava alta (8va ---- arriba): tocar una octava más aguda todo lo abarcado por la línea discontinua.",
      it: "Ottava alta (8va ---- sopra): suonare un’ottava sopra finché dura la linea tratteggiata.",
      pl: "Ottava alta (8va ---- nad pięciolinią): grać oktawę wyżej aż do końca przerywanej linii.",
      uk: "Октавою вище (8va ---- над станом): грати на октаву вище до кінця пунктирної лінії.",
      ur: "آکٹیو بالا (8va): نقطہ دار لکیر کے نیچے تمام نوٹ ایک آکٹیو اونچے بجائے جاتے ہیں۔",
      tr: "Ottava alta (dizeğin üstünde 8va ----): Kesikli çizginin altındaki tüm notalar yazılandan bir oktav daha tiz çalınır — okunması zor ek çizgilerden kurtarır!"
    },
    tip: {
      de: "Am Ende der Klammer – oder beim Wort „loco“ – spielt man wieder normal wie notiert.",
      en: "When the bracket ends — or “loco” appears — return to written pitch.",
      fr: "À la fin du crochet (ou au mot « loco »), on revient à la hauteur écrite.",
      es: "Al terminar la línea (o con «loco»), se vuelve a la altura escrita.",
      it: "Alla fine della linea (o con «loco») si torna all’altezza scritta.",
      pl: "Na końcu klamry (lub przy „loco”) wracasz do zapisanej wysokości.",
      uk: "Наприкінці дужки (або за словом «loco») повертаєшся до записаної висоти.",
      ur: "لکیر ختم ہونے یا ’loco‘ لکھنے پر عام اونچائی پر واپس آ جاتے ہیں۔",
      tr: "Çizgi bittiğinde — veya «loco» yazısını gördüğünde — yeniden yazılı perdeden çalınır."
    }
  },
  "octave-8vb": {
    short: {
      de: "Eine Oktave tiefer spielen",
      en: "Play one octave lower",
      fr: "Jouer une octave plus bas",
      es: "Tocar una octava más baja",
      it: "Suonare un’ottava sotto",
      pl: "Zagrać oktawę niżej",
      uk: "Грати на октаву нижче",
      ur: "ایک آکٹیو نیچا بجانا",
      tr: "Bir oktav pes çal"
    },
    desc: {
      de: "Ottava bassa (8vb ---- unter dem System): Alle Noten über der gestrichelten Linie klingen eine volle Oktave tiefer. „loco“ hebt die Versetzung wieder auf.",
      en: "Ottava bassa (8vb ---- below the staff): play the bracketed notes one full octave lower. “loco” cancels the shift.",
      fr: "Ottava bassa (8vb ---- en dessous) : jouer une octave plus bas. « loco » annule la transposition.",
      es: "Ottava bassa (8vb ---- debajo): tocar una octava más grave. «loco» devuelve a la altura normal.",
      it: "Ottava bassa (8vb ---- sotto): suonare un’ottava sotto. «loco» riporta all’altezza scritta.",
      pl: "Ottava bassa (8vb ---- pod pięciolinią): grać oktawę niżej. „loco” przywraca zwykłą wysokość.",
      uk: "Октавою нижче (8vb ---- під станом): грати на октаву нижче. «loco» скасовує перенесення.",
      ur: "آکٹیو زیریں (8vb): تمام نشان زدہ نوٹ ایک آکٹیو نیچے بجائے جاتے ہیں۔ ’loco‘ اسے ختم کرتا ہے۔",
      tr: "Ottava bassa (dizeğin altında 8vb ----): Kesikli çizginin üstündeki tüm notalar bir oktav daha pes çalınır. «loco» bu kaydırmayı iptal eder."
    },
    tip: {
      de: "Merke: a = alta (oben), b = bassa (unten).",
      en: "Easy cue: a = alta (above), b = bassa (below).",
      fr: "Mémo : a = alta (haut), b = bassa (bas).",
      es: "Regla: a = alta (arriba), b = bassa (abajo).",
      it: "Facile: a = alta (sopra), b = bassa (sotto).",
      pl: "Łatwo zapamiętać: a = alta (góra), b = bassa (dół).",
      uk: "Легко запам’ятати: a = alta (угору), b = bassa (униз).",
      ur: "آسان نشانی: a = اوپر (alta)، b = نیچے (bassa)۔",
      tr: "Kolay ipucu: a = alta (yukarı), b = bassa (aşağı)."
    }
  },
  "pedal": {
    short: {
      de: "Klavier-Haltepedal treten / lösen",
      en: "Press & release sustain pedal",
      fr: "Enfoncer / relâcher la pédale",
      es: "Pisar y soltar el pedal",
      it: "Abbassare / rilasciare il pedale",
      pl: "Wcisnąć / puścić pedał",
      uk: "Натиснути / відпустити педаль",
      ur: "سسٹین پیڈل دبانا اور چھوڑنا",
      tr: "Piyano uzatma pedalına bas / bırak"
    },
    desc: {
      de: "Ped. (Haltepedal drücken) bis * (Pedal loslassen) – modern auch als eckige Linie mit Kerbe für den Pedalwechsel.",
      en: "Ped. (depress sustain pedal) until * (release pedal) — also written as a horizontal bracket with notches for pedal changes.",
      fr: "Ped. (enfoncer la pédale forte) jusqu’à * (relâcher) — aussi noté par un crochet avec encoches.",
      es: "Ped. (pisar pedal de resonancia) hasta * (soltar) — también como corchete con muescas.",
      it: "Ped. (abbassare il pedale di risonanza) fino a * (rilasciare) — anche a linea con tacche.",
      pl: "Ped. (nacisnąć prawy pedał) do znaku * (puścić) — lub jako klamra ze zmianami.",
      uk: "Ped. (натиснути праву педаль) до * (відпустити) — або ламана лінія змін педалі.",
      ur: "Ped. پر سسٹین پیڈل دبایا جاتا ہے اور * پر چھوڑا جاتا ہے۔",
      tr: "Ped. (uzatma pedalına bas) ve * (pedalı bırak) — modern notasyonda pedal değişimleri için çentikli köşeli çizgiyle de yazılır."
    },
    tip: {
      de: "Ohne Pedalwechsel verschwimmen verschiedene Harmonien ineinander.",
      en: "Changing the pedal on each new harmony keeps chords clear and clean.",
      fr: "Changer la pédale à chaque harmonie évite que les accords ne se brouillent.",
      es: "Cambiar el pedal en cada armonía evita que los acordes se emborronen.",
      it: "Cambiare pedale a ogni armonia mantiene gli accordi puliti.",
      pl: "Zmiana pedału przy nowej harmonii zapobiega zlewaniu się akordów.",
      uk: "Зміна педалі на новій гармонії зберігає чистоту звучання.",
      ur: "ہر نئے کورڈ پر پیڈل بدلنے سے آواز صاف رہتی ہے۔",
      tr: "Her yeni armonide pedalı yenilemezsen akorlar birbirine karışıp bulanıklaşır."
    }
  },
  "pizzicato": {
    short: {
      de: "Saiten zupfen (statt streichen)",
      en: "Pluck strings (instead of bow)",
      fr: "Pincer les cordes (pizz.)",
      es: "Pulsar cuerdas con dedos",
      it: "Pizzicare le corde",
      pl: "Szarpnąć struny palcami",
      uk: "Щипком (піцикато)",
      ur: "تاروں کو انگلی سے چھیڑنا (پزی کاٹو)",
      tr: "Telleri parmakla çek (yay yerine)"
    },
    desc: {
      de: "Pizzicato (pizz.): Streichinstrumente zupfen die Saiten mit den Fingern statt mit dem Bogen. Das Wort „arco“ bedeutet: wieder mit dem Bogen streichen!",
      en: "Pizzicato (pizz.): string players pluck the strings with their fingers. “arco” tells them to return to playing with the bow.",
      fr: "Pizzicato (pizz.) : les cordes pincent avec les doigts. « arco » indique de reprendre l’archet.",
      es: "Pizzicato (pizz.): las cuerdas pulsan con los dedos. «arco» indica volver a usar el arco.",
      it: "Pizzicato (pizz.): gli archi pizzicano le corde con le dita. «arco» richiama l’uso dell’archetto.",
      pl: "Pizzicato (pizz.): smyczkowcy szarpią struny palcami. „arco” oznacza powrót do smyczka.",
      uk: "Піцикато (pizz.): струнні грають щипком пальців. «arco» означає повернутися до смичка.",
      ur: "پزی کاٹو (pizz.): کمان کے بجائے انگلی سے تار چھیڑنا؛ ’arco‘ دوبارہ کمان سے بجانے کا اشارہ ہے۔",
      tr: "Pizzicato (pizz.): Yaylı çalgılar telleri yayla değil parmakla çekerek çalar. «arco» ise yeniden yayla çalmaya dön anlamına gelir!"
    },
    tip: {
      de: "Merkpaar: pizz. = zupfen ↔ arco = Bogen.",
      en: "Key pair: pizz. = pluck ↔ arco = bow.",
      fr: "Paire clé : pizz. = pincer ↔ arco = archet.",
      es: "Pareja clave: pizz. = pulsar ↔ arco = arco.",
      it: "Coppia chiave: pizz. = pizzicare ↔ arco = archetto.",
      pl: "Para: pizz. = szarpać ↔ arco = smyczek.",
      uk: "Пара: pizz. = щипком ↔ arco = смичком.",
      ur: "جوڑا یاد رکھیں: pizz. = انگلی سے چھیڑنا ↔ arco = کمان سے بجانا۔",
      tr: "İkili kural: pizz. = parmakla çek ↔ arco = yayla çal."
    }
  },
  "con-sordino": {
    short: {
      de: "Mit Dämpfer spielen",
      en: "Play with mute",
      fr: "Avec sourdine",
      es: "Con sordina (amortiguado)",
      it: "Con sordina",
      pl: "Z tłumikiem (con sordino)",
      uk: "З сурдиною (приглушено)",
      ur: "میوٹ (دھیمی رکاوٹ) کے ساتھ",
      tr: "Sürdinli (susturuculu) çal"
    },
    desc: {
      de: "Con sordino (con sord.): Mit Dämpfer auf Steg (Streicher) oder im Schalltrichter (Blechbläser) – weicher, samtiger Klang. Aufhebung: senza sordino.",
      en: "Con sordino (con sord.): attach a mute to soften and color the tone (strings or brass). Cancelled by “senza sordino”.",
      fr: "Con sordino : utiliser la sourdine pour adoucir et colorer le timbre. Annulé par « senza sordino ».",
      es: "Con sordino: colocar la sordina para suavizar y cambiar el timbre. Se quita con «senza sordino».",
      it: "Con sordino: applicare la sordina per velare il timbro. Si toglie con «senza sordino».",
      pl: "Con sordino: założyć tłumik dla miękkiej, przyciemnionej barwy. Zdjęcie: „senza sordino”.",
      uk: "Кон сурдіно: грати із сурдиною для м’якого приглушеного тембру. Скасування: «senza sordino».",
      ur: "کون سورڈینو: آواز کو نرم اور مخملی بنانے کے لیے میوٹ لگانا؛ ’senza sordino‘ پر ہٹا دیا جاتا ہے۔",
      tr: "Con sordino (con sord.): Köprüye (yaylılar) veya kalak içine (bakır üflemeliler) sürdin takarak daha yumuşak, kadifemsi bir tını elde edilir. İptali: senza sordino."
    },
    tip: {
      de: "con = mit, senza = ohne.",
      en: "con = with, senza = without.",
      fr: "con = avec, senza = sans.",
      es: "con = con, senza = sin.",
      it: "con = con, senza = senza.",
      pl: "con = z, senza = bez.",
      uk: "con = з, senza = без.",
      ur: "con = ساتھ، senza = بغیر۔",
      tr: "con = ile, senza = olmadan."
    }
  },
  "tutti-solo": {
    short: {
      de: "Alle zusammen vs. Einzelstimme",
      en: "All together vs. single player",
      fr: "Tous ensemble vs soliste",
      es: "Todos juntos vs. solista",
      it: "Tutti insieme vs. solista",
      pl: "Wszyscy razem vs. solo",
      uk: "Усі разом проти соло",
      ur: "سب مل کر بمقابلہ اکیلا فنکار",
      tr: "Herkes birlikte vs. tek çalgıcı"
    },
    desc: {
      de: "Solo = eine einzelne Stimme tritt hervor; Tutti = das ganze Ensemble/Orchester spielt wieder zusammen. Divisi (div.) teilt eine Gruppe auf mehrere Stimmen auf (Aufhebung: unis.).",
      en: "Solo = one player takes the lead; Tutti = the full ensemble plays together again. Divisi (div.) splits a section into multiple parts (cancelled by unis.).",
      fr: "Solo = un seul musicien ; Tutti = tout l’ensemble joue. Divisi (div.) divise un pupitre en plusieurs voix (annulé par unis.).",
      es: "Solo = un intérprete; Tutti = todo el conjunto. Divisi (div.) divide una sección en varias voces (vuelve con unis.).",
      it: "Solo = un singolo esecutore; Tutti = l’intero organico. Divisi (div.) separa una sezione in più parti (annullato da unis.).",
      pl: "Solo = jeden wykonawca; Tutti = cały zespół razem. Divisi (div.) dzieli sekcję na głosy (powrót: unis.).",
      uk: "Solo = один виконавець; Tutti = увесь склад разом. Divisi (div.) ділить групу на кілька партій (повернення: unis.).",
      ur: "Solo = اکیلا فنکار؛ Tutti = پورا آرکسٹرا مل کر؛ Divisi = گروپ کو الگ حصوں میں بانٹنا۔",
      tr: "Solo = tek bir ses öne çıkar; Tutti = tüm topluluk/orkestra yeniden birlikte çalar. Divisi (div.) bir grubu birden fazla partiye böler (iptali: unis.)."
    },
    tip: {
      de: "Tutti bedeutet wörtlich „alle“.",
      en: "Tutti literally means “all” in Italian.",
      fr: "Tutti signifie littéralement « tous ».",
      es: "Tutti significa literalmente «todos».",
      it: "Tutti significa letteralmente l’intero gruppo.",
      pl: "Tutti znaczy dosłownie „wszyscy”.",
      uk: "Tutti буквально означає «усі».",
      ur: "Tutti کا لفظی مطلب ’سب‘ ہے۔",
      tr: "Tutti İtalyancada tam olarak «hepsi» demektir."
    }
  },
  "attacca": {
    short: {
      de: "Ohne Pause direkt weiter",
      en: "Continue straight on (no break)",
      fr: "Enchaîner sans pause",
      es: "Enlazar sin pausa",
      it: "Attaccare subito senza pausa",
      pl: "Przejść dalej bez przerwy",
      uk: "Перейти далі без паузи",
      ur: "بغیر وقفے کے فوراً اگلا حصہ",
      tr: "Ara vermeden doğrudan geç"
    },
    desc: {
      de: "Attacca (am Ende eines Satzes oder Abschnitts): Der nächste Satz beginnt unmittelbar ohne Unterbrechung.",
      en: "Attacca (at the end of a movement or section): launch straight into the next movement without pausing.",
      fr: "Attacca (en fin de mouvement) : enchaîner immédiatement le mouvement suivant sans silence.",
      es: "Attacca (al final de un movimiento): pasar de inmediato al siguiente sin detenerse.",
      it: "Attacca (a fine movimento): iniziare subito il movimento successivo senza pausa.",
      pl: "Attacca (na końcu części): rozpocząć kolejną część natychmiast, bez przerwy.",
      uk: "Атака (наприкінці частини): почати наступну частину негайно, без паузи.",
      ur: "اٹاکا (حصے کے آخر میں): بغیر رکے فوراً اگلا حصہ شروع کرنا۔",
      tr: "Attacca (bir bölümün veya kısmın sonunda): Bir sonraki bölüm hiç duraklamadan hemen başlar."
    },
    tip: {
      de: "Verhindert Applaus- oder Atempausen zwischen eng verbundenen Sätzen.",
      en: "Keeps dramatic momentum unbroken between linked movements.",
      fr: "Préserve la tension dramatique entre deux mouvements liés.",
      es: "Mantiene intacta la tensión entre movimientos unidos.",
      it: "Mantiene intatta la tensione tra movimenti collegati.",
      pl: "Utrzymuje napięcie między bezpośrednio powiązanymi częściami.",
      uk: "Зберігає напругу між тісно пов’язаними частинами.",
      ur: "دو جڑے ہوئے حصوں کے درمیان تسلسل برقرار رکھتا ہے۔",
      tr: "Birbirine bağlı bölümler arasında alkış veya nefes boşluğu oluşmasını önler."
    }
  },
  "simile": {
    short: {
      de: "In gleicher Weise fortfahren",
      en: "Continue in the same manner",
      fr: "Continuer de la même façon",
      es: "Seguir de la misma manera",
      it: "Continuare nello stesso modo",
      pl: "Grać dalej w ten sam sposób",
      uk: "Продовжувати так само",
      ur: "اسی انداز میں جاری رکھنا",
      tr: "Aynı biçimde devam et"
    },
    desc: {
      de: "Simile (sim.): Behalte die gerade eingeführte Spielweise (z. B. Staccato, Pedalwechsel oder Bogenmuster) weiter bei, auch wenn sie nicht mehr über jeder Note steht.",
      en: "Simile (sim.): keep applying the articulation, pedaling or pattern just established even though the markings stop being printed.",
      fr: "Simile (sim.) : poursuivre la même articulation ou pédalisation sans qu’elle soit répétée sur chaque note.",
      es: "Simile (sim.): mantener la articulación o patrón recién indicado aunque deje de escribirse en cada nota.",
      it: "Simile (sim.): mantenere l’articolazione o il pedale appena indicati anche se non più ristampati.",
      pl: "Simile (sim.): utrzymywać ten sam sposób gry (np. staccato, pedał), mimo braku dalszych znaków.",
      uk: "Сіміле (sim.): продовжувати той самий штрих чи педаль, хоча значки вже не повторюються.",
      ur: "سیمیلی (sim.): پہلے سے جاری انداز (مثلاً اسٹاکاٹو یا پیڈل) کو جاری رکھنا چاہے نشان دوبارہ نہ لکھا ہو۔",
      tr: "Simile (sim.): Az önce başlayan çalım biçimini (ör. staccato, pedal değişimi veya yay kalıbı) artık her notada yazılı olmasa da sürdür."
    },
    tip: {
      de: "Hält das Notenbild sauber und übersichtlich!",
      en: "Keeps the printed score clean and uncluttered!",
      fr: "Allège la partition et la rend plus lisible !",
      es: "¡Mantiene la partitura limpia y fácil de leer!",
      it: "Mantiene lo spartito pulito e leggibile!",
      pl: "Dzięki temu zapis nutowy pozostaje przejrzysty!",
      uk: "Робить нотний текст чистим і зручним для читання!",
      ur: "اس سے نوٹیشن صاف اور پڑھنے میں آسان رہتی ہے۔",
      tr: "Nota sayfasını temiz ve okunaklı tutar!"
    }
  },

  // ===== 4. ABLAUF, FORM & SPRUNGZEICHEN =====
  "repeat-signs": {
    short: {
      de: "Abschnitt wiederholen",
      en: "Repeat the section",
      fr: "Répéter le passage",
      es: "Repetir la sección",
      it: "Ripetere la sezione",
      pl: "Powtórzyć fragment",
      uk: "Повторити розділ",
      ur: "اس حصے کو دہرانا",
      tr: "Bölümü tekrarla"
    },
    desc: {
      de: "Wiederholungszeichen (Doppelstrich mit 2 Punkten |: … :|): Beim Erreichen von :| springst du zurück zum öffnenden |: (oder ganz an den Anfang, wenn keins steht).",
      en: "Repeat signs (barline with two dots |: … :|): when you reach :|, jump back to the opening |: (or to the very start if none appears).",
      fr: "Barres de reprise (|: … :|) : en arrivant à :|, revenir à |: (ou au début du morceau s’il n’y en a pas).",
      es: "Barras de repetición (|: … :|): al llegar a :|, volver a |: (o al inicio de la obra si no hay apertura).",
      it: "Ritornello (|: … :|): arrivato a :|, si torna al segno |: (oppure all’inizio del brano).",
      pl: "Znaki repetycji (|: … :|): po dojściu do :| wracasz do |: (lub na sam początek utworu).",
      uk: "Знаки репризи (|: … :|): дійшовши до :|, повертайся до |: (або на початок твору).",
      ur: "دہرانے کی علامت (|: … :|): :| پر پہنچ کر |: (یا دھن کے آغاز) پر واپس جانا۔",
      tr: "Tekrar işareti / Röpriz (iki noktalı çift çizgi |: … :|): :| işaretine gelince açılan |: işaretine (yoksa en başa) geri dön."
    },
    tip: {
      de: "Die Punkte zeigen immer in Richtung des zu wiederholenden Abschnitts!",
      en: "The two dots always face inward toward the repeated section!",
      fr: "Les deux points sont toujours tournés vers le passage à répéter !",
      es: "¡Los dos puntos siempre miran hacia el interior de la sección repetida!",
      it: "I due punti guardano sempre verso la parte da ripetere!",
      pl: "Kropki zawsze patrzą w stronę powtarzanego odcinka!",
      uk: "Крапки завжди дивляться всередину розділу, що повторюється!",
      ur: "دونوں نقطے ہمیشہ دہرائے جانے والے حصے کے اندر کی طرف ہوتے ہیں!",
      tr: "İki nokta her zaman tekrar edilecek bölümün iç tarafına bakar!"
    }
  },
  "volta-brackets": {
    short: {
      de: "1. & 2. Durchgang (Klammern)",
      en: "1st & 2nd endings (voltas)",
      fr: "1re et 2e fins (boîtes)",
      es: "1.ª y 2.ª casillas (finales)",
      it: "Prima e seconda volta",
      pl: "1. i 2. volta (zakończenia)",
      uk: "1-ша та 2-га вольти",
      ur: "پہلا اور دوسرا اختتام (وولٹا)",
      tr: "1. ve 2. dolap (geçişler)"
    },
    desc: {
      de: "Voltenklammern (1. und 2. Haus): Im ersten Durchgang spielst du Klammer 1 und wiederholst; im zweiten Durchgang überspringst du Klammer 1 komplett und gehst direkt in Klammer 2.",
      en: "Volta brackets (1st & 2nd endings): on pass 1 play bracket 1 and repeat; on pass 2 skip bracket 1 completely and jump straight into bracket 2.",
      fr: "Boîtes de reprise (1. / 2.) : la 1re fois on joue la case 1 puis on reprend ; la 2e fois on saute la 1 pour aller directement en 2.",
      es: "Casillas de repetición (1. / 2.): la 1.ª vez se toca la 1 y se repite; la 2.ª vez se salta la 1 y se pasa directo a la 2.",
      it: "Caselle di prima e seconda volta: la prima volta si suona la 1 e si ripete; la seconda si salta la 1 e si entra nella 2.",
      pl: "Volty (1. i 2.): za pierwszym razem grasz 1. i wracasz; za drugim pomijasz 1. i skaczesz prosto do 2.",
      uk: "Вольти (1. і 2.): вперше граєш 1-шу й повторюєш; вдруге перестрибуєш 1-шу одразу у 2-гу.",
      ur: "وولٹا بریکٹ (1. اور 2.): پہلی بار 1. بجا کر دہرائیں؛ دوسری بار 1. چھوڑ کر سیدھا 2. بجائیں۔",
      tr: "Dolaplar (1. ve 2. volta): İlk geçişte 1. dolabı çalıp tekrar edersin; ikinci geçişte 1. dolabı tamamen atlayıp doğrudan 2. dolaba geçersin."
    },
    tip: {
      de: "Klassischer Ablauf: A → B (1.) → A → C (2.).",
      en: "Classic path: A → B (1st) → A → C (2nd).",
      fr: "Parcours type : A → B (1.) → A → C (2.).",
      es: "Recorrido típico: A → B (1.ª) → A → C (2.ª).",
      it: "Percorso classico: A → B (1.) → A → C (2.).",
      pl: "Klasyczny przebieg: A → B (1.) → A → C (2.).",
      uk: "Класичний хід: A → B (1.) → A → C (2.).",
      ur: "عام ترتیب: A ← B (1.) ← A ← C (2.)۔",
      tr: "Klasik akış: A → B (1.) → A → C (2.)."
    }
  },
  "double-barline": {
    short: {
      de: "Neuer Formabschnitt beginnt",
      en: "Marks a new section",
      fr: "Sépare deux sections",
      es: "Marca una nueva sección",
      it: "Segna una nuova sezione",
      pl: "Początek nowej sekcji",
      uk: "Межа нового розділу",
      ur: "نئے حصے کی ابتدا",
      tr: "Yeni form bölümü başlar"
    },
    desc: {
      de: "Doppelstrich (zwei gleich dünne Linien ||): Gliedert das Stück optisch in neue Formteile, Tonart- oder Taktwechsel – beendet das Stück aber NICHT.",
      en: "Double barline (two thin lines ||): visually separates musical sections, key changes or meter changes — does NOT end the piece.",
      fr: "Double barre (deux traits fins ||) : sépare deux sections ou annonce un changement d’armure/mesure, sans terminer le morceau.",
      es: "Doble barra (dos líneas finas ||): separa secciones o cambios de tonalidad/compás, pero NO termina la pieza.",
      it: "Doppia stanghetta (due linee sottili ||): separa sezioni o cambi di tonalità/tempo, ma NON chiude il brano.",
      pl: "Podwójna kreska (dwie cienkie linie ||): oddziela części lub zmianę tonacji/metrum, ale NIE kończy utworu.",
      uk: "Подвійна риска (дві тонкі лінії ||): відділяє розділи або зміну тональності, але НЕ завершує твір.",
      ur: "ڈبل بار لائن (دو پتلی لکیریں ||): نئے حصے یا تبدیلی کی علامت، دھن کا اختتام نہیں۔",
      tr: "Çift ölçü çizgisi (iki ince çizgi ||): Eseri görsel olarak yeni bölümlere, ton veya ölçü değişimlerine ayırır — ancak eseri BİTİRMEZ."
    },
    tip: {
      de: "Dünn + dünn = neuer Abschnitt; dünn + DICK = Schlussstrich!",
      en: "Thin + thin = new section; thin + THICK = final ending!",
      fr: "Fin + fin = nouvelle section ; fin + ÉPAIS = barre finale !",
      es: "Fina + fina = nueva sección; fina + GRUESA = final.",
      it: "Sottile + sottile = nuova sezione; sottile + SPESSA = fine!",
      pl: "Cienka + cienka = nowa sekcja; cienka + GRUBA = koniec!",
      uk: "Тонка + тонка = новий розділ; тонка + ТОВСТА = кінець!",
      ur: "پتلی + پتلی = نیا حصہ؛ پتلی + موٹی = اختتام!",
      tr: "İnce + ince = yeni bölüm; ince + KALIN = bitiş çizgisi!"
    }
  },
  "final-barline": {
    short: {
      de: "Endgültiges Stückende",
      en: "Final end of the piece",
      fr: "Fin définitive du morceau",
      es: "Final definitivo de la obra",
      it: "Fine definitiva del brano",
      pl: "Ostateczny koniec utworu",
      uk: "Остаточний кінець твору",
      ur: "دھن کا حتمی اختتام",
      tr: "Eserin kesin sonu"
    },
    desc: {
      de: "Schlussstrich (dünne Linie + dicke Linie): Zeigt eindeutig das vollständige Ende eines Stückes oder Satzes an.",
      en: "Final barline (one thin line + one thick line): unmistakably marks the complete end of a piece or movement.",
      fr: "Barre finale (un trait fin + un trait épais) : marque la fin complète d’un morceau ou d’un mouvement.",
      es: "Barra final (línea fina + línea gruesa): indica de forma definitiva el final de la pieza.",
      it: "Stanghetta finale (linea sottile + linea spessa): indica la conclusione definitiva del brano.",
      pl: "Kreska końcowa (cienka + gruba linia): jednoznacznie kończy utwór lub jego część.",
      uk: "Заключна риска (тонка + товста лінія): однозначно позначає кінець твору чи частини.",
      ur: "آخری بار لائن (پتلی + موٹی لکیر): دھن کے مکمل اختتام کی واضح نشانی۔",
      tr: "Bitiş çizgisi (bir ince + bir kalın çizgi): Bir eserin veya bölümün tamamen sona erdiğini kesin biçimde gösterir."
    },
    tip: {
      de: "Keine Punkte dran → einfach zu Ende (nicht wiederholen).",
      en: "No dots attached → simply finished (no repeat).",
      fr: "Sans points → le morceau s’arrête là (pas de reprise).",
      es: "Sin puntos → termina aquí sin repetir.",
      it: "Senza punti → finisce qui senza ritornello.",
      pl: "Bez kropek → utwór po prostu się kończy.",
      uk: "Без крапок → твір завершується без повтору.",
      ur: "بغیر نقطوں کے ← یہیں اختتام (دہرانا نہیں)۔",
      tr: "Yanında nokta yok → sadece biter (tekrar yok)."
    }
  },
  "sim-bar": {
    short: {
      de: "Vorherigen Takt wiederholen",
      en: "Repeat the previous bar",
      fr: "Répéter la mesure précédente",
      es: "Repetir el compás anterior",
      it: "Ripetere la battuta precedente",
      pl: "Powtórzyć poprzedni takt",
      uk: "Повторити попередній такт",
      ur: "پچھلا بار دوبارہ بجانا",
      tr: "Önceki ölçüyü tekrarla"
    },
    desc: {
      de: "Taktwiederholung / „Faulenzer“ (schräger Strich mit 2 Punkten im Takt): Spiele exakt denselben Inhalt wie im direkt vorhergehenden Takt noch einmal.",
      en: "One-bar repeat (slash with two dots centered in a bar): play the exact same notes/rhythm as the immediately preceding measure.",
      fr: "Signe de répétition de mesure (%) : rejouer exactement la mesure qui précède.",
      es: "Repetición de compás (%): tocar exactamente igual que el compás anterior.",
      it: "Ripetizione di battuta (%): rieseguire esattamente la battuta precedente.",
      pl: "Znak powtórzenia taktu (%): zagraj dokładnie to samo co w poprzednim takcie.",
      uk: "Знак повтору такту (%): зіграй точно те саме, що в попередньому такті.",
      ur: "ایک بار دہرانے کا نشان (%): بالکل پچھلے بار کو دوبارہ بجانا۔",
      tr: "Ölçü tekrarı (ölçü ortasında iki noktalı eğik çizgi): Bir önceki ölçünün birebir aynı nota ve ritmini tekrar çal."
    },
    tip: {
      de: "Besonders beliebt in Pop-, Jazz- und Schlagzeug-/Bass-Sheets!",
      en: "Very common in pop, jazz, drum and bass charts!",
      fr: "Très courant dans les grilles pop, jazz, batterie et basse !",
      es: "¡Muy común en partituras de pop, jazz, batería y bajo!",
      it: "Molto usato in partiture pop, jazz, batteria e basso!",
      pl: "Bardzo częste w nutach popowych, jazzowych i perkusyjnych!",
      uk: "Дуже популярне в поп-, джаз-, бас- і барабанних партіях!",
      ur: "پاپ، جاز، ڈرم اور باس چارٹس میں بکثرت استعمال ہوتا ہے۔",
      tr: "Pop, caz, davul ve bas notalarında çok sık kullanılır!"
    }
  },
  "multi-rest": {
    short: {
      de: "Mehrere Takte pausieren",
      en: "Rest for several bars",
      fr: "Compter plusieurs mesures de silence",
      es: "Pausa de varios compases",
      it: "Pausa di più battute",
      pl: "Pauza wielotaktowa",
      uk: "Пауза на кілька тактів",
      ur: "کئی بار کا مسلسل وقفہ",
      tr: "Birden fazla ölçü sus"
    },
    desc: {
      de: "Mehrtaktpause (dicker waagerechter Balken mit Zahl darüber, z. B. 8): Du pausierst exakt die angegebene Anzahl voller Takte.",
      en: "Multi-measure rest (thick horizontal bar with a number above, e.g. 8): rest for that exact number of full bars.",
      fr: "Mesures à compter (barre épaisse surmontée d’un chiffre, ex. 8) : garder le silence pendant ce nombre exact de mesures.",
      es: "Silencio de varios compases (barra gruesa con un número, p. ej. 8): esperar ese número exacto de compases.",
      it: "Pausa multipla (barra spessa con numero sopra, es. 8): tacere per quel numero esatto di battute.",
      pl: "Pauza wielotaktowa (gruba belka z liczbą, np. 8): pauzujesz dokładnie tyle pełnych taktów.",
      uk: "Багатотактова пауза (товста риска з числом, напр. 8): пауза рівно на вказану кількість тактів.",
      ur: "ملٹی بار ریسٹ (موٹی لکیر کے اوپر عدد، مثلاً 8): ٹھیک اتنے ہی پورے بار خاموش رہنا۔",
      tr: "Çoklu ölçü susu (üzerinde sayı bulunan kalın yatay çubuk, ör. 8): Belirtilen sayı kadar tam ölçü boyunca sus."
    },
    tip: {
      de: "Profi-Tipp: Zähle „1-2-3-4, 2-2-3-4, 3-2-3-4 …“, damit du den Einsatz nicht verpasst!",
      en: "Pro tip: count “1-2-3-4, 2-2-3-4, 3-2-3-4…” so you never miss your entrance!",
      fr: "Astuce : compte « 1-2-3-4, 2-2-3-4, 3-2-3-4… » pour ne jamais rater l’entrée !",
      es: "Truco: cuenta «1-2-3-4, 2-2-3-4, 3-2-3-4…» para no perder la entrada.",
      it: "Trucco: conta «1-2-3-4, 2-2-3-4, 3-2-3-4…» per non perdere l’attacco!",
      pl: "Wskazówka: licz „1-2-3-4, 2-2-3-4, 3-2-3-4…”, aby nie przegapić wejścia!",
      uk: "Порада: рахуй «1-2-3-4, 2-2-3-4, 3-2-3-4…», щоб точно вступити!",
      ur: "مشورہ: ’1-2-3-4، 2-2-3-4…‘ گنیں تاکہ اپنا وقت نہ چوکیں!",
      tr: "Usta ipucu: Girişini kaçırmamak için «1-2-3-4, 2-2-3-4, 3-2-3-4…» diye say!"
    }
  },
  "gp-tacet": {
    short: {
      de: "Alle schweigen / Stimme pausiert",
      en: "Full ensemble silence / tacet",
      fr: "Silence général / tacet",
      es: "Silencio general / tacet",
      it: "Pausa generale / tacet",
      pl: "Pauza generalna / tacet",
      uk: "Генеральна пауза / tacet",
      ur: "مکمل اجتماعی خاموشی / ٹاسیٹ",
      tr: "Herkes susar / parti susar"
    },
    desc: {
      de: "Generalpause (G.P.): Das gesamte Ensemble schweigt gleichzeitig. „tacet“ heißt, dass dein Instrument für einen ganzen Satz oder Abschnitt komplett pausiert.",
      en: "General pause (G.P.): the entire ensemble falls completely silent. “tacet” means your instrument does not play for an entire movement or section.",
      fr: "Pause générale (G.P.) : tout l’ensemble se tait. « tacet » signifie que votre instrument ne joue pas pendant toute une section.",
      es: "Pausa general (G.P.): todo el conjunto guarda silencio. «tacet» indica que tu instrumento no toca en todo un movimiento.",
      it: "Pausa generale (G.P.): tace tutto l’organico. «tacet» indica che il tuo strumento non suona per un’intera sezione.",
      pl: "Pauza generalna (G.P.): milknie cały zespół. „tacet” oznacza, że twój instrument milczy przez całą część.",
      uk: "Генеральна пауза (G.P.): мовчить увесь оркестр. «tacet» означає, що твій інструмент не грає всю частину.",
      ur: "جنرل پاز (G.P.): پورا آرکسٹرا خاموش ہو جاتا ہے؛ ’tacet‘ یعنی آپ کا ساز پورے حصے میں خاموش رہے گا۔",
      tr: "Genel sus (G.P.): Tüm topluluk aynı anda susar. «tacet» ise senin çalgının bütün bir bölüm boyunca hiç çalmayacağı anlamına gelir."
    },
    tip: {
      de: "Lateinisch „tacet“ = „er/sie schweigt“.",
      en: "Latin “tacet” = “is silent”.",
      fr: "Du latin « tacet » = « il se tait ».",
      es: "Del latín «tacet» = «calla».",
      it: "Dal latino «tacet» = «tace».",
      pl: "Po łacinie „tacet” = „milczy”.",
      uk: "З латини «tacet» = «мовчить».",
      ur: "لاطینی لفظ tacet کا مطلب ’خاموش ہے‘۔",
      tr: "Latince «tacet» = «susar» demektir."
    }
  },
  "da-capo": {
    short: {
      de: "Zurück zum Stückanfang",
      en: "Return to the very beginning",
      fr: "Revenir au tout début",
      es: "Volver al principio",
      it: "Tornare dall’inizio",
      pl: "Powrót na sam początek",
      uk: "Повернутися на самий початок",
      ur: "بالکل آغاز پر واپس جائیں",
      tr: "Eserin en başına dön"
    },
    desc: {
      de: "Da Capo (D.C., wörtlich „vom Kopf“): Springe ganz zurück an Takt 1 des Stückes und spiele ab dort noch einmal.",
      en: "Da Capo (D.C., literally “from the head”): jump all the way back to bar 1 of the piece and play again from there.",
      fr: "Da Capo (D.C., « de la tête ») : revenir tout au début (mesure 1) et rejouer.",
      es: "Da Capo (D.C., «desde la cabeza»): volver al compás 1 de la obra y tocar de nuevo.",
      it: "Da Capo (D.C.): ricominciare dalla primissima battuta del brano.",
      pl: "Da Capo (D.C., „od głowy”): wróć na sam początek utworu (takt 1).",
      uk: "Да капо (D.C., «від голови»): повернися до першого такту твору й грай спочатку.",
      ur: "دا کاپو (D.C.، لفظی مطلب ’سر سے‘): دھن کے پہلے بار پر واپس جا کر دوبارہ بجائیں۔",
      tr: "Da Capo (D.C., kelime anlamı «baştan»): Eserin 1. ölçüsüne kadar geri dön ve oradan yeniden çal."
    },
    tip: {
      de: "D.C. springt IMMER ganz nach vorne (Takt 1) – im Gegensatz zu D.S. (Segno)!",
      en: "D.C. ALWAYS jumps to bar 1 — unlike D.S., which jumps to the Segno sign!",
      fr: "D.C. renvoie TOUJOURS au début — contrairement à D.S. qui renvoie au Segno !",
      es: "D.C. SIEMPRE vuelve al principio, a diferencia de D.S. (al Segno).",
      it: "D.C. torna SEMPRE all’inizio, a differenza di D.S. (al Segno)!",
      pl: "D.C. ZAWSZE wraca na początek — w przeciwieństwie do D.S. (do znaku Segno)!",
      uk: "D.C. ЗАВЖДИ повертає на початок — на відміну від D.S. (до знака Segno)!",
      ur: "D.C. ہمیشہ بالکل شروع (بار 1) پر جاتا ہے، جبکہ D.S. سیگنو کی طرف!",
      tr: "D.C. HER ZAMAN en başa (1. ölçüye) döner — D.S. (Segno) ise işarete döner!"
    }
  },
  "dal-segno": {
    short: {
      de: "Zurück zum Segno-Zeichen",
      en: "Jump back to the Segno sign",
      fr: "Revenir au signe Segno",
      es: "Volver al signo Segno",
      it: "Tornare al segno Segno",
      pl: "Powrót do znaku Segno",
      uk: "Повернутися до знака Segno",
      ur: "سیگنو (Segno) کی علامت پر واپسی",
      tr: "Segno işaretine geri dön"
    },
    desc: {
      de: "Dal Segno (D.S., „vom Zeichen“): Springe nicht an Takt 1, sondern exakt dorthin zurück, wo das verzierte S-Zeichen (Segno) im Notenbild steht.",
      en: "Dal Segno (D.S., “from the sign”): do not return to bar 1 — jump back to the ornate S-like Segno mark in the score.",
      fr: "Dal Segno (D.S., « depuis le signe ») : ne pas revenir au début, mais au signe Segno dans la partition.",
      es: "Dal Segno (D.S., «desde el signo»): no volver al inicio, sino al signo Segno en la partitura.",
      it: "Dal Segno (D.S.): tornare esattamente al punto segnato dal simbolo Segno, non all’inizio.",
      pl: "Dal Segno (D.S., „od znaku”): nie wracaj na początek, tylko do znaku Segno w nutach.",
      uk: "Даль сеньйо (D.S., «від знака»): повертайся не на початок, а до знака Segno в нотах.",
      ur: "دال سیگنو (D.S.): آغاز پر نہیں بلکہ نوٹیشن میں بنے ہوئے خاص Segno نشان پر واپس جائیں۔",
      tr: "Dal Segno (D.S., «işaretten»): 1. ölçüye değil, nota sayfasında süslü S işaretinin (Segno) bulunduğu yere geri dön."
    },
    tip: {
      de: "Ideal, wenn ein Stück ein kurzes Intro hat, das nicht wiederholt werden soll!",
      en: "Perfect when a song has an intro that shouldn’t be repeated!",
      fr: "Idéal quand un morceau possède une intro qu’on ne rejoue pas !",
      es: "¡Ideal cuando la obra tiene una intro que no se debe repetir!",
      it: "Perfetto quando un brano ha un’introduzione da non ripetere!",
      pl: "Świetne, gdy utwór ma wstęp, którego nie trzeba powtarzać!",
      uk: "Ідеально, коли у твору є вступ, який не треба повторювати!",
      ur: "جب دھن کا انٹرو دوبارہ نہ بجانا ہو تو یہ بہترین طریقہ ہے!",
      tr: "Tekrar edilmemesi gereken kısa bir girişi (intro) olan parçalar için idealdir!"
    }
  },
  "segno": {
    short: {
      de: "Sprungziel für Dal Segno (D.S.)",
      en: "Landing mark for Dal Segno",
      fr: "Point de repère pour D.S.",
      es: "Marca de destino para D.S.",
      it: "Segno di rientro per D.S.",
      pl: "Cel skoku dla Dal Segno",
      uk: "Мітка повернення для D.S.",
      ur: "دال سیگنو (D.S.) کے لیے واپسی کا نشان",
      tr: "Dal Segno (D.S.) dönüş hedefi"
    },
    desc: {
      de: "Segno (durchgestrichenes S mit zwei Punkten): Beim ersten Durchgang spielst du einfach darüber hinweg; später springst du bei „D.S.“ genau hierher zurück.",
      en: "Segno (ornate slashed S with two dots): pass right over it the first time; later, when you see “D.S.”, jump straight back to this spot.",
      fr: "Segno (S barré avec deux points) : on le traverse la 1re fois, puis on y revient lorsqu’on lit « D.S. ».",
      es: "Segno (S tachada con dos puntos): la primera vez se sigue de largo; al leer «D.S.» se vuelve justo aquí.",
      it: "Segno (S tagliata con due punti): al primo passaggio si prosegue; quando si incontra «D.S.» si torna qui.",
      pl: "Segno (przekreślone S z kropkami): za pierwszym razem przechodzisz obok; później na „D.S.” wracasz dokładnie tutaj.",
      uk: "Сеньйо (перекреслене S з крапками): вперше проходиш повз; пізніше при «D.S.» повертаєшся саме сюди.",
      ur: "سیگنو (نقطوں اور لکیر والا S): پہلی بار سیدھے گزر جائیں؛ بعد میں D.S. دیکھ کر ٹھیک یہاں واپس آئیں۔",
      tr: "Segno (iki noktalı, üzeri çizili süslü S): İlk geçişte üzerinden normalce geçersin; ileride «D.S.» görünce tam buraya geri dönersin."
    },
    tip: {
      de: "„Segno“ heißt auf Italienisch schlicht „Zeichen“.",
      en: "“Segno” simply means “sign” in Italian.",
      fr: "« Segno » signifie simplement « signe » en italien.",
      es: "«Segno» significa simplemente «signo» en italiano.",
      it: "In italiano significa proprio «segno di riferimento».",
      pl: "„Segno” znaczy po włosku po prostu „znak”.",
      uk: "«Segno» італійською означає просто «знак».",
      ur: "اطالوی میں Segno کا مطلب محض ’نشان‘ ہے۔",
      tr: "«Segno» İtalyancada kısaca «işaret» demektir."
    }
  },
  "coda": {
    short: {
      de: "Sprung zum Schlussteil (Coda)",
      en: "Jump to the ending tag (Coda)",
      fr: "Saut vers la fin (Coda)",
      es: "Salto a la sección final (Coda)",
      it: "Salto alla sezione finale (Coda)",
      pl: "Skok do zakończenia (Coda)",
      uk: "Стрибок у фінальний розділ (Coda)",
      ur: "اختتامی حصے (کوڈا) کی طرف چھلانگ",
      tr: "Bitiş bölümüne (Koda) atla"
    },
    desc: {
      de: "Coda (Oval mit Fadenkreuz): Kennzeichnet den Ausstiegspunkt („al Coda“ / „to Coda“) UND den eigenen Schlussabschnitt am Ende des Notenblatts. Wird erst nach dem D.C.-/D.S.-Rücksprung ausgelöst!",
      en: "Coda (crosshair oval): marks both the jump-out point (“to Coda”) AND the standalone ending section at the bottom. Only triggered AFTER the D.C./D.S. jump back!",
      fr: "Coda (ovale en cible) : indique le point de sortie (« al Coda ») ET le bloc final. On ne saute vers la Coda qu’après le retour D.C./D.S. !",
      es: "Coda (óvalo con cruz): señala el punto de salto («al Coda») Y el bloque final. ¡Solo se salta tras volver por D.C./D.S.!",
      it: "Coda (ovale crociato): segna il punto d’uscita («al Coda») E la sezione finale. Scatta solo dopo il ritorno D.C./D.S.!",
      pl: "Coda (owal z krzyżykiem): oznacza punkt wyjścia („al Coda”) ORAZ finałowy odcinek. Działa dopiero po powrocie D.C./D.S.!",
      uk: "Кода (овал із перехрестям): позначає точку переходу («al Coda») І фінальний розділ. Спрацьовує лише після повернення D.C./D.S.!",
      ur: "کوڈا (کراس والا دائرہ): نکلنے کی جگہ اور آخری حصے دونوں کو ظاہر کرتا ہے — صرف D.C./D.S. واپسی کے بعد فعال ہوتا ہے!",
      tr: "Koda / Coda (artı işaretli oval): Hem çıkış noktasını («al Coda» / «to Coda») HEM DE sayfanın sonundaki bağımsız bitiş bölümünü gösterir. Yalnızca D.C./D.S. dönüşünden SONRA devreye girer!"
    },
    tip: {
      de: "Wichtigste Falle: Beim allerersten Durchgang das erste Coda-Zeichen ignorieren und normal weiterspielen!",
      en: "Key rule: on your very first pass, ignore the first Coda sign and keep going!",
      fr: "Piège classique : au premier passage, ignore le signe Coda et continue !",
      es: "Regla clave: ¡en la primera vuelta ignora el signo Coda y sigue adelante!",
      it: "Regola d’oro: al primo passaggio ignora il segno Coda e vai avanti!",
      pl: "Najważniejsza zasada: za pierwszym razem zignoruj znak Cody i graj dalej!",
      uk: "Головне правило: у першому проході ігноруй знак Коди й грай далі!",
      ur: "اہم اصول: پہلی بار گزرتے ہوئے پہلے کوڈا نشان کو نظر انداز کر کے آگے بڑھیں!",
      tr: "En önemli kural: İlk geçişte ilk Coda işaretini görmezden gel ve normal çalmaya devam et!"
    }
  },
  "fine": {
    short: {
      de: "Ende (nach Rücksprung)",
      en: "End (after jumping back)",
      fr: "Fin (après le retour)",
      es: "Fin (tras la repetición)",
      it: "Fine (dopo il ritorno)",
      pl: "Koniec (po powrocie)",
      uk: "Кінець (після повернення)",
      ur: "اختتام (واپسی کے بعد)",
      tr: "Son (geri dönüşten sonra)"
    },
    desc: {
      de: "Fine („Ende“): Markiert das tatsächliche Stückende mitten im Notenblatt – gilt aber erst, nachdem du per D.C. al Fine oder D.S. al Fine zurückgesprungen bist.",
      en: "Fine (“end”): marks the true finish in the middle of a score — only stops the piece after you have jumped back via D.C. or D.S. al Fine.",
      fr: "Fine (« fin ») : indique l’arrêt définitif au milieu de la partition, uniquement après un retour D.C. ou D.S. al Fine.",
      es: "Fine («fin»): señala el final real en medio de la partitura, solo tras volver con D.C. o D.S. al Fine.",
      it: "Fine: segna la conclusione effettiva all’interno dello spartito, valida solo dopo D.C. o D.S. al Fine.",
      pl: "Fine („koniec”): kończy utwór w środku zapisu — ale dopiero po powrocie przez D.C. lub D.S. al Fine.",
      uk: "Фіне («кінець»): зупиняє твір посеред нот, але лише після повернення за D.C. чи D.S. al Fine.",
      ur: "فینے (اختتام): نوٹیشن کے درمیان حقیقی اختتام، جو صرف D.C. یا D.S. واپسی کے بعد لاگو ہوتا ہے۔",
      tr: "Fine («son»): Nota sayfasının ortasındaki gerçek bitiş noktasını gösterir — ancak yalnızca D.C. al Fine veya D.S. al Fine ile geri döndükten sonra geçerlidir."
    },
    tip: {
      de: "Beim ersten Mal liest man einfach über „Fine“ hinweg!",
      en: "Play straight past “Fine” the first time you see it!",
      fr: "La première fois, on passe sans s’arrêter sur « Fine » !",
      es: "¡La primera vez se pasa de largo sobre «Fine»!",
      it: "Al primo passaggio si prosegue oltre «Fine»!",
      pl: "Za pierwszym razem grasz dalej mimo napisu „Fine”!",
      uk: "Першого разу просто грай далі повз слово «Fine»!",
      ur: "پہلی بار ’Fine‘ پر رکنا نہیں بلکہ آگے بڑھنا ہے!",
      tr: "İlk geçişte «Fine» yazısının üzerinden normalce geçilir!"
    }
  },
  "dc-al-fine": {
    short: {
      de: "Zum Anfang, dann bis „Fine“",
      en: "Back to start, stop at “Fine”",
      fr: "Au début, puis arrêt à « Fine »",
      es: "Al principio y parar en «Fine»",
      it: "Da capo fino a «Fine»",
      pl: "Na początek i koniec przy „Fine”",
      uk: "На початок і стоп на «Fine»",
      ur: "آغاز پر جائیں اور Fine پر رکیں",
      tr: "Başa dön, «Fine»da bitir"
    },
    desc: {
      de: "Da Capo al Fine: Springe ganz an den Anfang (Takt 1) zurück und spiele bis zur Markierung „Fine“ – dort ist Schluss.",
      en: "Da Capo al Fine: jump back to bar 1 and play until you reach the word “Fine”, where the piece ends.",
      fr: "Da Capo al Fine : revenir à la mesure 1 et jouer jusqu’au mot « Fine », où le morceau se termine.",
      es: "Da Capo al Fine: volver al compás 1 y tocar hasta «Fine», donde termina la pieza.",
      it: "Da Capo al Fine: tornare all’inizio e suonare fino alla scritta «Fine», dove il brano si chiude.",
      pl: "Da Capo al Fine: wróć do taktu 1 i graj aż do napisu „Fine”, gdzie utwór się kończy.",
      uk: "Да капо аль фіне: повернися до такту 1 і грай до позначки «Fine», де твір закінчується.",
      ur: "دا کاپو ال فینے: پہلے بار پر واپس جائیں اور Fine تک بجا کر ختم کریں۔",
      tr: "Da Capo al Fine: En başa (1. ölçüye) geri dön ve «Fine» işaretine kadar çalıp orada bitir."
    },
    tip: {
      de: "Typisch für dreiteilige A–B–A-Liedformen (Menuett, Trio, Pop-Formen).",
      en: "Classic shortcut for A–B–A ternary form without reprinting section A.",
      fr: "Raccourci classique pour la forme A–B–A sans réimprimer A.",
      es: "Atajo clásico para la forma A–B–A sin reimprimir la parte A.",
      it: "Classica scorciatoia per la forma A–B–A senza ristampare A.",
      pl: "Klasyczny skrót dla formy A–B–A bez ponownego drukowania części A.",
      uk: "Класичний запис форми A–B–A без повторного друку частини A.",
      ur: "A-B-A فارم لکھنے کا آسان طریقہ تاکہ حصہ A دوبارہ نہ چھاپنا پڑے۔",
      tr: "Üç bölmeli A–B–A formları için (Menuet, Trio, pop şarkıları) klasik kısayoldur."
    }
  },
  "ds-al-coda": {
    short: {
      de: "Zum Segno, dann in die Coda",
      en: "Back to Segno, jump to Coda",
      fr: "Au Segno, puis saut à la Coda",
      es: "Al Segno y saltar a la Coda",
      it: "Al Segno, poi salto alla Coda",
      pl: "Do Segno, potem skok do Cody",
      uk: "До Segno, потім стрибок у Коду",
      ur: "سیگنو پر واپسی، پھر کوڈا میں چھلانگ",
      tr: "Segno'ya dön, sonra Koda'ya atla"
    },
    desc: {
      de: "Dal Segno al Coda: Springe zurück zum Segno-Zeichen, spiele bis „al Coda / to Coda“ und springe von dort direkt in den Coda-Schlussteil!",
      en: "Dal Segno al Coda: jump back to the Segno mark, play until “to Coda”, then leap straight to the final Coda section!",
      fr: "Dal Segno al Coda : revenir au Segno, jouer jusqu’à « al Coda », puis sauter directement dans la Coda finale !",
      es: "Dal Segno al Coda: volver al Segno, tocar hasta «al Coda» y saltar directamente a la sección Coda final.",
      it: "Dal Segno al Coda: tornare al Segno, suonare fino a «al Coda» e saltare direttamente alla Coda finale!",
      pl: "Dal Segno al Coda: wróć do Segno, graj do „al Coda”, a stamtąd przeskocz prosto do finałowej Cody!",
      uk: "Даль сеньйо аль кода: повернися до Segno, грай до «al Coda», а звідти стрибай прямо у фінальну Коду!",
      ur: "دال سیگنو ال کوڈا: سیگنو پر واپس جائیں، ’to Coda‘ تک بجائیں اور وہاں سے سیدھا آخری کوڈا حصے میں چھلانگ لگائیں!",
      tr: "Dal Segno al Coda: Segno işaretine geri dön, «al Coda / to Coda» noktasına kadar çal ve oradan doğrudan Koda bitiş bölümüne atla!"
    },
    tip: {
      de: "Der häufigste Wegweiser in Pop-, Film- und Musical-Noten!",
      en: "The single most common roadmap in pop, film and musical scores!",
      fr: "L’itinéraire le plus courant dans les partitions pop, film et comédie musicale !",
      es: "¡La hoja de ruta más usada en partituras de pop, cine y musicales!",
      it: "Il percorso più diffuso negli spartiti pop, colonne sonore e musical!",
      pl: "Najczęstsza nawigacja w nutach popowych, filmowych i musicalowych!",
      uk: "Найчастіший маршрут у поп-, кіно- та мюзиклових партитурах!",
      ur: "پاپ، فلمی اور میوزیکل نوٹیشن میں سب سے زیادہ استعمال ہونے والا راستہ!",
      tr: "Pop, film ve müzikal notalarındaki en yaygın yol haritasıdır!"
    }
  },
  "dc-al-coda": {
    short: {
      de: "Zum Anfang, dann in die Coda",
      en: "Back to start, jump to Coda",
      fr: "Au début, puis saut à la Coda",
      es: "Al principio y saltar a la Coda",
      it: "Da capo, poi salto alla Coda",
      pl: "Na początek, potem skok do Cody",
      uk: "На початок, потім у Коду",
      ur: "آغاز پر واپسی، پھر کوڈا میں چھلانگ",
      tr: "Başa dön, sonra Koda'ya atla"
    },
    desc: {
      de: "Da Capo al Coda: Springe ganz an den Anfang (Takt 1), spiele bis zum Coda-Ausstieg und springe dann direkt in den Schlussblock (Coda).",
      en: "Da Capo al Coda: jump all the way back to bar 1, play until the Coda exit sign, then leap into the final Coda section.",
      fr: "Da Capo al Coda : revenir au début (mesure 1), jouer jusqu’au signe de sortie, puis sauter vers la Coda.",
      es: "Da Capo al Coda: volver al compás 1, tocar hasta la salida y saltar a la sección Coda final.",
      it: "Da Capo al Coda: tornare all’inizio, suonare fino al rimando e saltare direttamente alla Coda finale.",
      pl: "Da Capo al Coda: wróć do taktu 1, graj do wyjścia na Codę i przeskocz do zakończenia.",
      uk: "Да капо аль кода: повернися до такту 1, грай до виходу й стрибай у фінальну Коду.",
      ur: "دا کاپو ال کوڈا: پہلے بار پر واپس جائیں، کوڈا نشان تک بجائیں اور پھر آخری کوڈا حصے پر جائیں۔",
      tr: "Da Capo al Coda: En başa (1. ölçüye) geri dön, Koda çıkış işaretine kadar çal ve oradan doğrudan Koda bitiş bölümüne atla."
    },
    tip: {
      de: "Gleich wie D.S. al Coda – nur startest du den Rücksprung bei Takt 1 statt beim Segno.",
      en: "Just like D.S. al Coda — except you jump back to bar 1 instead of a Segno.",
      fr: "Comme D.S. al Coda, mais le retour se fait à la mesure 1 au lieu du Segno.",
      es: "Igual que D.S. al Coda, solo que vuelves al compás 1 en vez del Segno.",
      it: "Come D.S. al Coda, ma si rientra da battuta 1 anziché dal Segno.",
      pl: "Tak samo jak D.S. al Coda — tylko wracasz do taktu 1 zamiast do Segno.",
      uk: "Так само, як D.S. al Coda, але повертаєшся на такт 1 замість Segno.",
      ur: "بالکل D.S. al Coda جیسا، بس سیگنو کے بجائے بار 1 پر واپسی ہوتی ہے۔",
      tr: "D.S. al Coda ile aynıdır — tek farkı, Segno yerine 1. ölçüye dönmendir."
    }
  }
};

const NOTATION_FLOW_I18N = {
  "flow-repeat": {
    title: {
      de: "Wiederholungszeichen (|: … :|)",
      en: "Repeat Signs (|: … :|)",
      fr: "Barres de reprise (|: … :|)",
      es: "Barras de repetición (|: … :|)",
      it: "Ritornello (|: … :|)",
      pl: "Znaki repetycji (|: … :|)",
      uk: "Знаки репризи (|: … :|)",
      ur: "دہرانے کی علامات (|: … :|)",
      tr: "Tekrar İşaretleri (|: … :|)"
    },
    prompt: {
      de: "In welcher Reihenfolge werden die Abschnitte gespielt?",
      en: "In what order are the sections played?",
      fr: "Dans quel ordre joue-t-on les sections ?",
      es: "¿En qué orden se tocan las secciones?",
      it: "In quale ordine si suonano le sezioni?",
      pl: "W jakiej kolejności grane są odcinki?",
      uk: "У якому порядку виконуються розділи?",
      ur: "یہ حصے کس ترتیب سے بجائے جائیں گے؟",
      tr: "Bölümler hangi sırayla çalınır?"
    },
    desc: {
      de: "B und C stehen zwischen |: und :| – sie werden zweimal gespielt, bevor es weiter zu D geht.",
      en: "B and C sit between |: and :| — they repeat once before moving on to D.",
      fr: "B et C sont encadrés par |: et :| — ils se jouent deux fois avant de passer à D.",
      es: "B y C están entre |: y :| — se tocan dos veces antes de pasar a D.",
      it: "B e C sono racchiusi tra |: e :| — si suonano due volte prima di passare a D.",
      pl: "B i C leżą między |: a :| — grasz je dwukrotnie, a potem przechodzisz do D.",
      uk: "B і C стоять між |: та :| — вони граються двічі, а потім іде D.",
      ur: "B اور C دہرانے کی علامت کے درمیان ہیں — یہ دو بار بجتے ہیں اور پھر D آتا ہے۔",
      tr: "B ve C bölümleri |: ile :| arasında yer alır — D'ye geçmeden önce iki kez çalınırlar."
    }
  },
  "flow-volta": {
    title: {
      de: "Voltenklammern (1. & 2. Haus)",
      en: "1st & 2nd Endings (Voltas)",
      fr: "1re et 2e fins (Voltas)",
      es: "1.ª y 2.ª casillas (Voltas)",
      it: "Prima e seconda volta",
      pl: "1. i 2. volta",
      uk: "1-ша та 2-га вольти",
      ur: "پہلا اور دوسرا وولٹا",
      tr: "Dolaplar (1. ve 2. Dolap)"
    },
    prompt: {
      de: "Welche Spielreihenfolge ergibt sich mit Klammer 1. und 2.?",
      en: "What play order do the 1st and 2nd endings create?",
      fr: "Quel ordre obtiens-tu avec les cases 1. et 2. ?",
      es: "¿Qué orden resulta con las casillas 1.ª y 2.ª?",
      it: "Quale ordine risulta con le caselle 1. e 2.?",
      pl: "Jaka kolejność wynika z klamer 1. i 2.?",
      uk: "Який порядок дають 1-ша та 2-га вольти?",
      ur: "بریکٹ 1. اور 2. کے ساتھ بجانے کی ترتیب کیا ہوگی؟",
      tr: "1. ve 2. dolapla birlikte çalım sırası nasıl olur?"
    },
    desc: {
      de: "Erst A → B (1. Klammer), dann zurück zu A, Klammer 1 überspringen und direkt in C (2. Klammer).",
      en: "First A → B (1st ending), then back to A, skip bracket 1 and jump straight to C (2nd ending).",
      fr: "D’abord A → B (1.), retour à A, on saute la 1 pour aller directement en C (2.).",
      es: "Primero A → B (1.ª), luego vuelve a A, salta la 1.ª y entra directo en C (2.ª).",
      it: "Prima A → B (1.), poi ritorno ad A, salto della 1 e ingresso diretto in C (2.).",
      pl: "Najpierw A → B (1.), powrót do A, pominięcie 1. i skok prosto do C (2.).",
      uk: "Спершу A → B (1.), повернення до A, пропуск 1-ї і перехід у C (2.).",
      ur: "پہلے A ← B (1.)، پھر A پر واپسی، 1. کو چھوڑ کر سیدھا C (2.)۔",
      tr: "Önce A → B (1. dolap), sonra A'ya dönüş, 1. dolabı atlayıp doğrudan C'ye (2. dolap) geçiş."
    }
  },
  "flow-dc-fine": {
    title: {
      de: "Da Capo al Fine (D.C. al Fine)",
      en: "Da Capo al Fine (D.C. al Fine)",
      fr: "Da Capo al Fine (D.C. al Fine)",
      es: "Da Capo al Fine (D.C. al Fine)",
      it: "Da Capo al Fine (D.C. al Fine)",
      pl: "Da Capo al Fine (D.C. al Fine)",
      uk: "Da Capo al Fine (D.C. al Fine)",
      ur: "Da Capo al Fine (D.C. al Fine)",
      tr: "Da Capo al Fine (D.C. al Fine)"
    },
    prompt: {
      de: "Wie lautet der vollständige Ablauf mit D.C. al Fine?",
      en: "What is the complete play order with D.C. al Fine?",
      fr: "Quel est le parcours complet avec D.C. al Fine ?",
      es: "¿Cuál es el recorrido completo con D.C. al Fine?",
      it: "Qual è il percorso completo con D.C. al Fine?",
      pl: "Jaki jest pełny przebieg z D.C. al Fine?",
      uk: "Який повний порядок виконання з D.C. al Fine?",
      ur: "D.C. al Fine کے ساتھ مکمل ترتیب کیا ہوگی؟",
      tr: "D.C. al Fine ile tam çalım sırası nedir?"
    },
    desc: {
      de: "Erst A → B → C („Fine“ ignorieren!), bei D.C. ganz zurück zu A und bei „Fine“ nach B beenden.",
      en: "Play A → B → C (ignore “Fine” on pass 1), jump back to A at D.C., and stop at “Fine” after B.",
      fr: "D’abord A → B → C (ignorer « Fine »), retour au début A sur D.C., puis arrêt à « Fine » après B.",
      es: "Primero A → B → C (ignorar «Fine»), volver a A en D.C. y terminar en «Fine» tras B.",
      it: "Prima A → B → C (ignorare «Fine»), ritorno ad A su D.C. e conclusione a «Fine» dopo B.",
      pl: "Najpierw A → B → C (pomiń „Fine”), na D.C. wróć do A i zakończ na „Fine” po B.",
      uk: "Спершу A → B → C (ігноруй «Fine»), на D.C. повернись до A й зупинись на «Fine» після B.",
      ur: "پہلے A ← B ← C (پہلی بار Fine نظر انداز)، D.C. پر A میں واپسی اور B کے بعد Fine پر اختتام۔",
      tr: "Önce A → B → C (ilk geçişte «Fine»ı yok say!), D.C. ile en başa A'ya dön ve B'den sonra «Fine»da bitir."
    }
  },
  "flow-ds-fine": {
    title: {
      de: "Dal Segno al Fine (D.S. al Fine)",
      en: "Dal Segno al Fine (D.S. al Fine)",
      fr: "Dal Segno al Fine (D.S. al Fine)",
      es: "Dal Segno al Fine (D.S. al Fine)",
      it: "Dal Segno al Fine (D.S. al Fine)",
      pl: "Dal Segno al Fine (D.S. al Fine)",
      uk: "Dal Segno al Fine (D.S. al Fine)",
      ur: "Dal Segno al Fine (D.S. al Fine)",
      tr: "Dal Segno al Fine (D.S. al Fine)"
    },
    prompt: {
      de: "Wie lautet der Ablauf mit Segno und D.S. al Fine?",
      en: "What is the play order with Segno and D.S. al Fine?",
      fr: "Quel est l’ordre avec le Segno et D.S. al Fine ?",
      es: "¿Cuál es el orden con Segno y D.S. al Fine?",
      it: "Qual è l’ordine con Segno e D.S. al Fine?",
      pl: "Jaki jest przebieg z Segno i D.S. al Fine?",
      uk: "Який порядок із Segno та D.S. al Fine?",
      ur: "Segno اور D.S. al Fine کے ساتھ ترتیب کیا ہوگی؟",
      tr: "Segno ve D.S. al Fine ile çalım sırası nedir?"
    },
    desc: {
      de: "Erst A → B → C → D, bei D.S. zurück zum Segno bei B (Intro A entfällt!), und nach C bei „Fine“ Schluss.",
      en: "Play A → B → C → D, jump back to the Segno at B (skipping intro A), and end at “Fine” after C.",
      fr: "D’abord A → B → C → D, retour au Segno en B (sans rejouer A), puis arrêt à « Fine » après C.",
      es: "Primero A → B → C → D, volver al Segno en B (sin repetir A) y terminar en «Fine» tras C.",
      it: "Prima A → B → C → D, ritorno al Segno su B (saltando A) e stop a «Fine» dopo C.",
      pl: "Najpierw A → B → C → D, powrót do Segno w B (bez wstępu A) i koniec na „Fine” po C.",
      uk: "Спершу A → B → C → D, повернення до Segno на B (без вступу A) і фінал на «Fine» після C.",
      ur: "پہلے A ← B ← C ← D، پھر D.S. پر B (سیگنو) میں واپسی (A چھوڑ کر) اور C کے بعد Fine پر اختتام۔",
      tr: "Önce A → B → C → D, D.S. ile B'deki Segno'ya geri dön (A girişi tekrarlanmaz!) ve C'den sonra «Fine»da bitir."
    }
  },
  "flow-ds-coda": {
    title: {
      de: "Dal Segno al Coda (D.S. al Coda)",
      en: "Dal Segno al Coda (D.S. al Coda)",
      fr: "Dal Segno al Coda (D.S. al Coda)",
      es: "Dal Segno al Coda (D.S. al Coda)",
      it: "Dal Segno al Coda (D.S. al Coda)",
      pl: "Dal Segno al Coda (D.S. al Coda)",
      uk: "Dal Segno al Coda (D.S. al Coda)",
      ur: "Dal Segno al Coda (D.S. al Coda)",
      tr: "Dal Segno al Coda (D.S. al Coda)"
    },
    prompt: {
      de: "Welcher Ablauf entsteht durch Segno, D.S. al Coda & Coda?",
      en: "What order does Segno, D.S. al Coda & Coda produce?",
      fr: "Quel parcours créent Segno, D.S. al Coda et la Coda ?",
      es: "¿Qué recorrido generan Segno, D.S. al Coda y la Coda?",
      it: "Che percorso creano Segno, D.S. al Coda e Coda?",
      pl: "Jaki przebieg dają Segno, D.S. al Coda i Coda?",
      uk: "Який маршрут задають Segno, D.S. al Coda та Кода?",
      ur: "Segno، D.S. al Coda اور Coda سے کون سی ترتیب بنتی ہے؟",
      tr: "Segno, D.S. al Coda ve Koda nasıl bir sıra oluşturur?"
    },
    desc: {
      de: "Erst A → B → C (ersten Coda-Ausstieg ignorieren!), dann bei D.S. zurück zum Segno bei B, am Ende von B in die Coda D springen!",
      en: "First A → B → C (ignore “to Coda” on pass 1), jump back to Segno at B, then leap from the end of B straight into Coda D!",
      fr: "D’abord A → B → C (ignorer « al Coda »), retour au Segno en B, puis saut direct de la fin de B vers la Coda D !",
      es: "Primero A → B → C (ignorar «al Coda»), volver al Segno en B y saltar desde el final de B directo a la Coda D.",
      it: "Prima A → B → C (ignorare «al Coda»), ritorno al Segno su B e poi salto diretto nella Coda D!",
      pl: "Najpierw A → B → C (pomiń „al Coda”), powrót do Segno w B, a na końcu B skok prosto do Cody D!",
      uk: "Спершу A → B → C (ігноруй «al Coda»), повернення до Segno на B, а наприкінці B стрибок у Коду D!",
      ur: "پہلے A ← B ← C (پہلا کوڈا چھوڑ کر)، پھر سیگنو B پر واپسی اور B کے آخر سے سیدھا کوڈا D میں!",
      tr: "Önce A → B → C (ilk Koda çıkışını yok say!), sonra D.S. ile B'deki Segno'ya dön, B'nin sonunda doğrudan Koda D'ye atla!"
    }
  },
  "flow-dc-coda": {
    title: {
      de: "Da Capo al Coda (D.C. al Coda)",
      en: "Da Capo al Coda (D.C. al Coda)",
      fr: "Da Capo al Coda (D.C. al Coda)",
      es: "Da Capo al Coda (D.C. al Coda)",
      it: "Da Capo al Coda (D.C. al Coda)",
      pl: "Da Capo al Coda (D.C. al Coda)",
      uk: "Da Capo al Coda (D.C. al Coda)",
      ur: "Da Capo al Coda (D.C. al Coda)",
      tr: "Da Capo al Coda (D.C. al Coda)"
    },
    prompt: {
      de: "In welcher Reihenfolge spielst du bei D.C. al Coda?",
      en: "In what order do you play with D.C. al Coda?",
      fr: "Dans quel ordre joues-tu avec D.C. al Coda ?",
      es: "¿En qué orden tocas con D.C. al Coda?",
      it: "In che ordine suoni con D.C. al Coda?",
      pl: "W jakiej kolejności grasz przy D.C. al Coda?",
      uk: "У якому порядку грають при D.C. al Coda?",
      ur: "D.C. al Coda میں بجانے کی ترتیب کیا ہوگی؟",
      tr: "D.C. al Coda ile hangi sırayla çalarsın?"
    },
    desc: {
      de: "Erst A → B → C, bei D.C. ganz zurück an den Anfang A und am Ende von A direkt in die Coda D springen!",
      en: "First A → B → C, jump back to bar 1 (A) at D.C., and leap from the end of A straight into Coda D!",
      fr: "D’abord A → B → C, retour au début A sur D.C., puis saut direct de la fin de A vers la Coda D !",
      es: "Primero A → B → C, volver al inicio A en D.C. y saltar desde el final de A directo a la Coda D.",
      it: "Prima A → B → C, ritorno all’inizio A su D.C. e salto diretto dalla fine di A alla Coda D!",
      pl: "Najpierw A → B → C, na D.C. powrót na początek A i skok z końca A prosto do Cody D!",
      uk: "Спершу A → B → C, на D.C. повернення на початок A і стрибок із кінця A в Коду D!",
      ur: "پہلے A ← B ← C، پھر D.C. پر آغاز A میں واپسی اور A کے آخر سے سیدھا کوڈا D میں!",
      tr: "Önce A → B → C, D.C. ile en başa A'ya dön ve A'nın sonunda doğrudan Koda D'ye atla!"
    }
  }
};

const NOTATION_REF_UI_I18N = {
  filterAll: {
    de: "Alle", en: "All", fr: "Tout", es: "Todo", it: "Tutto", pl: "Wszystkie", uk: "Усі", ur: "سب", tr: "Tümü"
  },
  filterDynamics: {
    de: "Dynamik", en: "Dynamics", fr: "Nuances", es: "Dinámica", it: "Dinamica", pl: "Dynamika", uk: "Динаміка", ur: "آواز کی سطح", tr: "Gürlük"
  },
  filterTempo: {
    de: "Tempo & Charakter", en: "Tempo & Character", fr: "Tempo & caractère", es: "Tempo y carácter", it: "Tempo e carattere", pl: "Tempo i charakter", uk: "Темп і характер", ur: "رفتار اور انداز", tr: "Tempo ve Karakter"
  },
  filterArticulation: {
    de: "Artikulation & Spiel", en: "Articulation & Play", fr: "Articulation & jeu", es: "Articulación y toque", it: "Articolazione e stile", pl: "Artykulacja i gra", uk: "Артикуляція й гра", ur: "ادائیگی اور اسلوب", tr: "Artikülasyon ve Çalım"
  },
  filterNavigation: {
    de: "Ablauf & Form", en: "Form & Roadmaps", fr: "Structure & reprises", es: "Estructura y saltos", it: "Struttura e ritornelli", pl: "Przebieg i forma", uk: "Форма й повтори", ur: "ترتیب اور علامات", tr: "Akış ve Form"
  },
  searchPlaceholder: {
    de: "Begriff oder Symbol suchen (z. B. Coda, sfz, rit., legato)…",
    en: "Search term or symbol (e.g. Coda, sfz, rit., legato)…",
    fr: "Chercher un terme ou symbole (ex. Coda, sfz, rit., legato)…",
    es: "Buscar término o símbolo (ej. Coda, sfz, rit., legato)…",
    it: "Cerca termine o simbolo (es. Coda, sfz, rit., legato)…",
    pl: "Szukaj pojęcia lub symbolu (np. Coda, sfz, rit., legato)…",
    uk: "Пошук терміна або символу (напр. Coda, sfz, rit., legato)…",
    ur: "اصطلاح یا علامت تلاش کریں (مثلاً Coda, sfz, rit., legato)…",
    tr: "Terim veya sembol ara (ör. Coda, sfz, rit., legato)…"
  },
  searchClear: {
    de: "Zurücksetzen", en: "Clear", fr: "Effacer", es: "Limpiar", it: "Cancella", pl: "Wyczyść", uk: "Очистити", ur: "صاف کریں", tr: "Sıfırla"
  },
  noResults: {
    de: "Kein passender Begriff gefunden. Probier ein kürzeres Stichwort wie „coda“, „p“, „rit.“ oder „legato“.",
    en: "No matching term found. Try a shorter keyword like “coda”, “p”, “rit.” or “legato”.",
    fr: "Aucun terme trouvé. Essaie un mot plus court comme « coda », « p », « rit. » ou « legato ».",
    es: "No se encontró ningún término. Prueba con algo más corto como «coda», «p», «rit.» o «legato».",
    it: "Nessun termine trovato. Prova una parola più breve come «coda», «p», «rit.» o «legato».",
    pl: "Nie znaleziono pasującego pojęcia. Spróbuj krótszego hasła, np. „coda”, „p”, „rit.” lub „legato”.",
    uk: "Нічого не знайдено. Спробуй коротше слово, як-от «coda», «p», «rit.» або «legato».",
    ur: "کوئی نتیجہ نہیں ملا۔ مختصر لفظ آزمائیں جیسے coda، p، rit. یا legato۔",
    tr: "Eşleşen terim bulunamadı. «coda», «p», «rit.» veya «legato» gibi daha kısa bir kelime dene."
  },
  listenBtn: {
    de: "▶ Anhören", en: "▶ Listen", fr: "▶ Écouter", es: "▶ Escuchar", it: "▶ Ascolta", pl: "▶ Posłuchaj", uk: "▶ Послухати", ur: "▶ سنیں", tr: "▶ Dinle"
  },
  introTag: {
    de: "Nachschlagewerk", en: "Reference Guide", fr: "Guide de référence", es: "Guía de referencia", it: "Guida di riferimento", pl: "Kompendium", uk: "Довідник", ur: "حوالہ گائیڈ", tr: "Başvuru Rehberi"
  },
  introChip: {
    de: "Dynamik • Tempo • Artikulation • Ablauf",
    en: "Dynamics • Tempo • Articulation • Form",
    fr: "Nuances • Tempo • Articulation • Forme",
    es: "Dinámica • Tempo • Articulación • Forma",
    it: "Dinamica • Tempo • Articolazione • Forma",
    pl: "Dynamika • Tempo • Artykulacja • Forma",
    uk: "Динаміка • Темп • Артикуляція • Форма",
    ur: "آواز • رفتار • ادائیگی • ترتیب",
    tr: "Gürlük • Tempo • Artikülasyon • Akış"
  },
  introTitle: {
    de: "Mehr als nur Tonhöhen: So erwachen Noten zum Leben",
    en: "More than pitches: how written notes come alive",
    fr: "Bien plus que des hauteurs : comment la partition prend vie",
    es: "Más que alturas: cómo cobran vida las notas",
    it: "Oltre le altezze: come lo spartito prende vita",
    pl: "Więcej niż wysokość dźwięku: jak nuty ożywają",
    uk: "Більше ніж висота нот: як партитура оживає",
    ur: "صرف سُروں سے بڑھ کر: نوٹیشن میں جان کیسے آتی ہے",
    tr: "Sadece ses yüksekliğinden fazlası: Notalar nasıl canlanır"
  },
  introBody: {
    de: "Notenköpfe zeigen Tonhöhe und Rhythmus – erst Dynamik, Tempo, Artikulation und Ablaufzeichen verraten, wie laut, schnell, gebunden oder in welcher Reihenfolge Musik gespielt wird. Die meisten Begriffe stammen historisch aus dem Italienischen und gelten weltweit in jeder Partitur.",
    en: "Noteheads show pitch and rhythm — it is dynamics, tempo, articulation and roadmap signs that tell you how loud, fast, connected, or in what order the music unfolds. Most terms come from Italian and work as a universal language across scores worldwide.",
    fr: "Les notes indiquent la hauteur et le rythme — ce sont les nuances, le tempo, l’articulation et les signes de reprise qui disent comment interpréter la musique. La plupart viennent de l’italien et forment un langage universel.",
    es: "Las notas indican altura y ritmo; son la dinámica, el tempo, la articulación y los signos de estructura los que muestran cómo interpretar la música. Casi todos provienen del italiano y se entienden en todo el mundo.",
    it: "Le note mostrano altezza e ritmo; sono dinamica, tempo, articolazione e segni di struttura a guidare l’interpretazione. La maggior parte dei termini proviene dall’italiano ed è universale.",
    pl: "Nuty określają wysokość i rytm — dopiero dynamika, tempo, artykulacja i znaki nawigacyjne mówią, jak zagrać muzykę. Większość pojęć pochodzi z włoskiego i obowiązuje na całym świecie.",
    uk: "Ноти задають висоту й ритм — а динаміка, темп, артикуляція та знаки форми підказують, як саме грати музику. Більшість термінів походить з італійської та зрозуміла в усьому світі.",
    ur: "نوٹس صرف سُر اور تال بتاتے ہیں؛ آواز کی بلندی، رفتار، ادائیگی اور ترتیب کی علامات موسیقی میں اصل روح پھونکتی ہیں۔ زیادہ تر اصطلاحات اطالوی زبان سے ہیں اور دنیا بھر میں یکساں سمجھی جاتی ہیں۔",
    tr: "Nota başları yalnızca perdeyi ve ritmi gösterir — müziğin ne kadar güçlü, hızlı, bağlı veya hangi sırayla çalınacağını gürlük, tempo, artikülasyon ve akış işaretleri belirler. Çoğu terim tarihsel olarak İtalyancadan gelir ve dünyanın her yerindeki partisyonlarda ortak bir dil olarak kullanılır."
  },
  dynScaleTag: {
    de: "1. Dynamik-Leiter", en: "1. Dynamics Ladder", fr: "1. Échelle des nuances", es: "1. Escala dinámica", it: "1. Scala dinamica", pl: "1. Skala dynamiki", uk: "1. Шкала динаміки", ur: "1. آواز کی سیڑھی", tr: "1. Gürlük Merdiveni"
  },
  dynScaleTitle: {
    de: "Von flüsterleise (ppp) bis Klanggewalt (fff)",
    en: "From whisper-quiet (ppp) to full power (fff)",
    fr: "Du murmure (ppp) à la pleine puissance (fff)",
    es: "Del susurro (ppp) a la máxima potencia (fff)",
    it: "Dal sussurro (ppp) alla massima potenza (fff)",
    pl: "Od szeptu (ppp) po pełną moc (fff)",
    uk: "Від шепоту (ppp) до повної потужності (fff)",
    ur: "سرگوشی (ppp) سے انتہائی قوت (fff) تک",
    tr: "Fısıltıdan (ppp) tam ses gücüne (fff)"
  },
  dynScaleBtn: {
    de: "▶ Dynamik-Leiter (pp → ff) hören",
    en: "▶ Hear Dynamics Ladder (pp → ff)",
    fr: "▶ Écouter l’échelle (pp → ff)",
    es: "▶ Escuchar escala (pp → ff)",
    it: "▶ Ascolta la scala (pp → ff)",
    pl: "▶ Posłuchaj skali (pp → ff)",
    uk: "▶ Послухати шкалу (pp → ff)",
    ur: "▶ آواز کی سیڑھی (pp → ff) سنیں",
    tr: "▶ Gürlük merdivenini (pp → ff) dinle"
  },
  tempoScaleTag: {
    de: "2. Tempo-Spektrum", en: "2. Tempo Spectrum", fr: "2. Spectre des tempos", es: "2. Espectro de tempo", it: "2. Spettro dei tempi", pl: "2. Spektrum temp", uk: "2. Спектр темпів", ur: "2. رفتار کا پیمانہ", tr: "2. Tempo Yelpazesi"
  },
  tempoScaleTitle: {
    de: "Dieselbe Melodie in 6 klassischen Grundtempi",
    en: "The same melody across 6 classic base tempi",
    fr: "La même mélodie dans 6 tempos classiques",
    es: "La misma melodía en 6 tempos clásicos",
    it: "La stessa melodia in 6 tempi classici",
    pl: "Ta sama melodia w 6 klasycznych tempach",
    uk: "Одна мелодія у 6 класичних темпах",
    ur: "ایک ہی دھن 6 کلاسیکی رفتاروں میں",
    tr: "Aynı melodi 6 klasik temel tempoda"
  },
  flowGuideTag: {
    de: "4. Navigieren im Notenblatt", en: "4. Navigating a Score", fr: "4. Naviguer dans la partition", es: "4. Navegar por la partitura", it: "4. Orientarsi nello spartito", pl: "4. Nawigacja w nutach", uk: "4. Навігація в партитурі", ur: "4. نوٹیشن میں راستہ", tr: "4. Nota Sayfasında Yol Bulma"
  },
  flowGuideTitle: {
    de: "So funktionieren Wiederholungen, Volten, Segno & Coda",
    en: "How repeats, voltas, Segno & Coda work step by step",
    fr: "Comment fonctionnent reprises, voltas, Segno et Coda",
    es: "Cómo funcionan repeticiones, casillas, Segno y Coda",
    it: "Come funzionano ritornelli, volte, Segno e Coda",
    pl: "Jak działają repetycje, volty, Segno i Coda",
    uk: "Як працюють репризи, вольти, Segno та Кода",
    ur: "دہرائی، وولٹا، سیگنو اور کوڈا کیسے کام کرتے ہیں",
    tr: "Tekrarlar, dolaplar, Segno ve Koda adım adım nasıl çalışır"
  },
  flowOrderLabel: {
    de: "Spielreihenfolge:", en: "Play order:", fr: "Ordre de jeu :", es: "Orden de ejecución:", it: "Ordine di esecuzione:", pl: "Kolejność gry:", uk: "Порядок гри:", ur: "بجانے کی ترتیب:", tr: "Çalım sırası:"
  },
  practiceCta: {
    de: "Direkt üben: Symbole & Spielanweisungen →",
    en: "Practice now: Symbols & Markings →",
    fr: "S’entraîner : Symboles & indications →",
    es: "Practicar: Símbolos e indicaciones →",
    it: "Allenati: Simboli e indicazioni →",
    pl: "Ćwicz teraz: Symbole i oznaczenia →",
    uk: "Тренувати: Символи й позначення →",
    ur: "ابھی مشق کریں: علامات اور ہدایات ←",
    tr: "Hemen çalış: Semboller ve Çalım İşaretleri →"
  },
  backToClefsLink: {
    de: "Auch im Wissens-Hub: Notenschrift, Schlüssel & Vorzeichen →",
    en: "Also in Knowledge Hub: Staff, Clefs & Key Signatures →",
    fr: "Aussi dans le guide : Portée, clés et armures →",
    es: "También en la guía: Pentagrama, claves y armaduras →",
    it: "Anche nella guida: Pentagramma, chiavi e alterazioni →",
    pl: "Zobacz też: Pięciolinia, klucze i znaki przykluczowe →",
    uk: "Див. також: Нотний стан, ключі та знаки альтерації →",
    ur: "یہ بھی دیکھیں: نوٹیشن، کلیفس اور کلیدی علامات ←",
    tr: "Bilgi Merkezi'nde de var: Nota Yazısı, Anahtarlar ve Donanım →"
  },
  secDynamics: {
    de: "Dynamik & Lautstärke", en: "Dynamics & Volume", fr: "Nuances et volume", es: "Dinámica y volumen", it: "Dinamica e volume", pl: "Dynamika i głośność", uk: "Динаміка та гучність", ur: "آواز کی سطح (ڈائنامکس)", tr: "Gürlük ve Ses Düzeyi"
  },
  secTempo: {
    de: "Tempo, Agogik & Ausdruck", en: "Tempo, Agogics & Character", fr: "Tempo, agogique et caractère", es: "Tempo, agógica y carácter", it: "Tempo, agogica e carattere", pl: "Tempo, agogika i charakter", uk: "Темп, агогіка й характер", ur: "رفتار اور تاثرات", tr: "Tempo, Agogik ve İfade"
  },
  secArticulation: {
    de: "Artikulation, Verzierungen & Spielweisen", en: "Articulation, Ornaments & Playing Styles", fr: "Articulation, ornements et modes de jeu", es: "Articulación, adornos y modos de toque", it: "Articolazione, abbellimenti e tecniche", pl: "Artykulacja, ozdobniki i sposoby gry", uk: "Артикуляція, мелізми та прийоми гри", ur: "ادائیگی، سجاوٹ اور بجانے کے انداز", tr: "Artikülasyon, Süslemeler ve Çalım Teknikleri"
  },
  secNavigation: {
    de: "Ablauf, Taktstriche & Sprungzeichen", en: "Form, Barlines & Jump Signs", fr: "Structure, barres et renvois", es: "Estructura, barras y saltos", it: "Struttura, stanghette e rimandi", pl: "Forma, kreski taktowe i znaki skoku", uk: "Форма, тактові риски та знаки переходів", ur: "ترتیب، بار لائنز اور چھلانگ کی علامات", tr: "Akış, Ölçü Çizgileri ve Atlama İşaretleri"
  }
};
