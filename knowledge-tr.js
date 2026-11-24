/**
 * Lauscher • Türkçe Bilgi Merkezi, etkileşimli rehberler ve makaleler ("tr")
 * Doğal ve anlaşılır Türkçeyle müzik teorisi, akustik ve çalgı bilgisi.
 */

const INTERVAL_ENCYCLOPEDIA_TR = [
  {
    key: "P1",
    symbol: "P1",
    name: "Tam birli (Ünison)",
    semitones: 0,
    ratio: "1 : 1",
    ratioExplain: "1 : 1 oranı, iki sesin tam olarak aynı hızda titreştiği anlamına gelir. 1. ses bir döngüyü tamamlarken 2. ses de tam bir döngüyü tamamlar: ikisi birebir aynı perdedir.",
    category: "pure",
    mood: "Tam kaynaşma, dinginlik, özdeşlik",
    physics: "İki ses tam olarak aynı frekansı paylaşır (ör. 261,6 Hz ve 261,6 Hz). Ses dalgaları kusursuz bir ünison içinde üst üste biner.",
    songsAsc: "«One Note Samba» (tek nota üzerinde giden kıta melodisi), «Thank You for the Music» (ABBA, ilk iki hece)",
    songsDesc: "Ritmik bir motifte tekrarlanan herhangi bir nota (ör. Lady Gaga – «Poker Face» girişi)"
  },
  {
    key: "m2",
    symbol: "m2",
    name: "Küçük ikili",
    semitones: 1,
    ratio: "16 : 15",
    ratioExplain: "16 : 15 oranı, tiz sesin pes sesten çok az daha hızlı titreştiğini gösterir. İki dalganın tepeleri ancak her 16 döngüde bir (pes seste 15) çakışır; bu da iki ses arasında belirgin bir vuru (dalgalanma) oluşturur.",
    category: "tension",
    mood: "Sinsi, gergin, gizemli, itici güç (yeden ses!)",
    physics: "Dalgaların yeniden hizalanması 16 döngü sürer. İki perde iç kulakta birbirine çok yakın düştüğünden belirgin bir akustik sertlik hissedilir.",
    songsAsc: "«Jaws» film müziği teması, «Pembe Panter» (kromatik adım), «Für Elise» (Mi–Re♯–Mi)",
    songsDesc: "«Für Elise» (Beethoven, ilk iki nota Mi → Re♯), «Joy to the World» (ilk inici adım)"
  },
  {
    key: "M2",
    symbol: "M2",
    name: "Büyük ikili",
    semitones: 2,
    ratio: "9 : 8",
    ratioExplain: "9 : 8 oranı, pes sesin 8 titreşiminin tiz sesin 9 titreşimine denk gelmesi demektir. Birbirine bağlı kalacak kadar yakın, ama net bir melodik adım oluşturacak kadar da ayrıktır.",
    category: "major",
    mood: "Doğal adım, anlatıcı, açık, melodi başlangıcı",
    physics: "9:8 oranı, iki tam beşliyi üst üste koyup bir oktav inerek doğal olarak elde edilir. Evden dışarı atılan ilk adım gibi tınlar.",
    songsAsc: "«Frère Jacques» / «Ali Baba'nın Çiftliği» başı (Do → Re), «İyi ki Doğdun» (Happy Birthday), «Silent Night»",
    songsDesc: "«Yesterday» (The Beatles, «Yes-ter-day»), «Mary Had a Little Lamb»"
  },
  {
    key: "m3",
    symbol: "m3",
    name: "Küçük üçlü",
    semitones: 3,
    ratio: "6 : 5",
    ratioExplain: "6 : 5 oranı, pes ses 5 kez titreşirken tiz sesin 6 kez titreştiğini gösterir. Sıcak, yumuşak ve derin bir ifade taşıyan dengeli, kararlı bir orandır.",
    category: "minor",
    mood: "Samimi, sıcak, melankolik, içe dönük ve duygusal",
    physics: "6:5 oranı oldukça yumuşak (uyumlu) kalır ama büyük üçlüye göre daha dardır: her minör akorun duygusal kalbidir.",
    songsAsc: "«Seven Nation Army» (The White Stripes, riff'in ilk atlayışı), «Greensleeves», «Smoke on the Water» (ilk adım)",
    songsDesc: "«Hey Jude» (The Beatles, «Hey Jude»), guguk kuşu ötüşü, «So Long, Farewell»"
  },
  {
    key: "M3",
    symbol: "M3",
    name: "Büyük üçlü",
    semitones: 4,
    ratio: "5 : 4",
    ratioExplain: "5 : 4 oranı, tiz sesin 5 döngüsünün kök sesin 4 döngüsüne tam olarak sığması demektir. 5 ve 4 küçük tam sayılar olduğu için iki ses parlak bir majör renkte kaynaşır.",
    category: "major",
    mood: "Parlak, içten, açık, özgüvenli (majör üçlü akorun kalbi)",
    physics: "5:4 oranı, herhangi bir insan sesinin veya çekilen telin doğuşkanlar (armonikler) serisinde çok erken (5. doğuşkan olarak) kendiliğinden ortaya çıkar.",
    songsAsc: "«When the Saints Go Marching In», «Morning Has Broken» (Cat Stevens), «Kumbaya»",
    songsDesc: "«Summertime» (Gershwin), «Swing Low, Sweet Chariot», Beethoven'ın 5. Senfonisinin açılış motifi"
  },
  {
    key: "P4",
    symbol: "P4",
    name: "Tam dörtlü",
    semitones: 5,
    ratio: "4 : 3",
    ratioExplain: "4 : 3 oranı, pes ses 3 kez titreşirken tiz sesin 4 kez titreştiğini gösterir. Her 3 dalgada bir iki tepe yeniden kusursuz biçimde hizalanır!",
    category: "pure",
    mood: "Çağrı, görkemli, fanfar, geniş açık alan",
    physics: "Oktav içinde tam beşlinin çevrimi olan dörtlünün net bir 4:3 oranı vardır. Tek başına çok kararlıdır; bir bas sesinin üzerinde çoğu zaman üçlüye inmeyi ister.",
    songsAsc: "«La Marseillaise» (çıkışlı başlangıç), «Düğün Marşı» (Wagner), «Harry Potter» teması (Hedwig)",
    songsDesc: "«Eine kleine Nachtmusik» (Mozart, ikinci aralık), «Adeste Fideles»"
  },
  {
    key: "TT",
    symbol: "TT",
    name: "Triton (Artık 4'lü / Eksik 5'li)",
    semitones: 6,
    ratio: "yaklaşık 45 : 32",
    ratioExplain: "45 : 32 oranı, iki dalganın ortak bir nokta bulmakta zorlandığını gösterir: ancak 32 ve 45 döngü sonra yeniden hizalanırlar. Kulak bu sürekli kesişmeyi elektrikli bir gerilim olarak algılar!",
    category: "tension",
    mood: "Askıda, gizemli, elektrikli, çözülmemiş",
    physics: "Oktavı tam ortadan ikiye böler (6 yarım ton). Basit bir ortak katı olmadığı için kendine özgü bir armonik sürtünme yaratır: dominant (V7) akorunun iç motorudur.",
    songsAsc: "«The Simpsons» jeneriği («The Simp-sons»), «Maria» (West Side Story)",
    songsDesc: "«Black Sabbath» (açılış riff'i), «YYZ» (Rush)"
  },
  {
    key: "P5",
    symbol: "P5",
    name: "Tam beşli",
    semitones: 7,
    ratio: "3 : 2",
    ratioExplain: "3 : 2 oranı, tiz sesin kök sesten tam bir buçuk kat (1,5×) daha hızlı titreştiğini gösterir. İki uzun dalga, üç kısa dalgayı hiç dalgalanma olmadan sarar: saf kararlılık!",
    category: "pure",
    mood: "Kahramanca, güçlü, sağlam, berrak (power chord'ların iskeleti)",
    physics: "Oktavdan hemen sonra 3:2, müzikteki en basit frekans oranıdır. Bu yüzden yoğun distorsiyonlu bir elektro gitarda bile beşliler tertemiz ve net duyulur.",
    songsAsc: "«Star Wars» ana teması, «Daha Dün Annemizin» / «Twinkle, Twinkle, Little Star», «Also sprach Zarathustra» (2001)",
    songsDesc: "«Taş Devri» (The Flintstones) jeneriği, «Game of Thrones» jeneriği (ilk inici atlayış)"
  },
  {
    key: "m6",
    symbol: "m6",
    name: "Küçük altılı",
    semitones: 8,
    ratio: "8 : 5",
    ratioExplain: "8 : 5 oranı, kök sesin 5 döngüsünün tiz sesin 8 döngüsüne karşılık geldiğini gösterir. Hareket geniş, lirik ve tatlı bir nostaljiyle örtülü duyulur.",
    category: "minor",
    mood: "Nostaljik, dramatik, tatlı-acı, sinematik",
    physics: "Büyük üçlünün çevrimidir (8:5). Geniş bir melodik açılımı minörün yumuşaklığıyla birleştirir.",
    songsAsc: "«The Entertainer» (Scott Joplin, çıkış notasından sonra), «In My Life» (The Beatles, gitar girişi), «Love Story» (Taylor Swift, nakarat)",
    songsDesc: "«Love Story» film müziği (Where Do I Begin)"
  },
  {
    key: "M6",
    symbol: "M6",
    name: "Büyük altılı",
    semitones: 9,
    ratio: "5 : 3",
    ratioExplain: "5 : 3 oranı, kök ses 3 kez titreşirken tiz sesin 5 kez titreştiğini gösterir. Bu küçük tam sayılar, bu geniş atlayışa sıcak ve çok şarkısal bir karakter kazandırır.",
    category: "major",
    mood: "Işıltılı, cömert, pastoral, kucaklayıcı",
    physics: "Küçük üçlüyle (çevrimi) yakından akraba olan 5:3 oranı akıcı, lirik ve söylemesi son derece doğaldır.",
    songsAsc: "«My Bonnie Lies Over the Ocean», «Jingle Bells» (kıta), NBC jenerik sesi",
    songsDesc: "«The Music of the Night» (Operadaki Hayalet), «Man in the Mirror» (Michael Jackson, «I'm gonna make a change»)"
  },
  {
    key: "m7",
    symbol: "m7",
    name: "Küçük yedili",
    semitones: 10,
    ratio: "16 : 9",
    ratioExplain: "16 : 9 (veya doğal doğuşkanlar serisinde 7 : 4) oktavın iki katına (2:1) bir adım kala durur. Bu küçük fark blues, soul ve funk'a o rahat, çekici havasını verir.",
    category: "tension",
    mood: "Blues'vari, rahat, soul, yumuşakça aşağı çekilen",
    physics: "7. doğuşkan (7:4) olarak doğal biçimde ortaya çıkar. Sert duyulmak yerine katılığı yumuşatır ve dominant yedili akorları ileriye doğru iter.",
    songsAsc: "«The Winner Takes It All» (ABBA), «Somewhere» (West Side Story, «There's a place for us»), orijinal «Star Trek» teması",
    songsDesc: "«Watermelon Man» (Herbie Hancock)"
  },
  {
    key: "M7",
    symbol: "M7",
    name: "Büyük yedili",
    semitones: 11,
    ratio: "15 : 8",
    ratioExplain: "15 : 8, 16 : 8'e (yani 2:1 oktava!) yalnızca bir yarım ton uzaklıktadır. İki ses oktavda tam birleşmeden birbirine sürtündüğü için aralık ince ve zarif bir gerilimle parıldar.",
    category: "tension",
    mood: "Düşsel ve kadifemsi (Maj7 akorunda) ya da keskin ve gergin (tek başına)",
    physics: "Oktavın bir yarım ton altındadır (15:8). Basa karşı çıplak çalındığında canlı bir sürtünme yaratır; ama majör üçlü akorla sarıldığında (Cmaj7) saf bir caz zarafetine dönüşür.",
    songsAsc: "«Take On Me» (a-ha, nakarat başı), «Don't Know Why» (Norah Jones), «Superman» teması (köprü)",
    songsDesc: "«I Love You» (Cole Porter)"
  },
  {
    key: "P8",
    symbol: "P8",
    name: "Tam sekizli (Oktav)",
    semitones: 12,
    ratio: "2 : 1",
    ratioExplain: "2 : 1 oranı, tiz sesin pes sesten tam iki kat daha hızlı titreştiği (dalga boyunun yarıya indiği) anlamına gelir. Her uzun dalga iki kısa dalgayı tertemiz içine alır: neredeyse tek bir ses gibi kaynaşırlar!",
    category: "pure",
    mood: "Genişlik, berraklık, dolgunluk: aynı notanın bir üst katı",
    physics: "Frekansın tam iki katına çıkmasıdır (2:1). Kadınlar ve erkekler ya da yetişkinler ve çocuklar «aynı» melodiyi söylediğinde bunu kendiliğinden bir oktav arayla söylerler.",
    songsAsc: "«Somewhere Over the Rainbow» (Oz Büyücüsü), «Singin' in the Rain»",
    songsDesc: "«Willow Weep for Me»"
  },
  {
    key: "m9",
    symbol: "m9",
    name: "Küçük dokuzlu",
    semitones: 13,
    ratio: "32 : 15",
    ratioExplain: "32 : 15 oranı, tiz sesin kök sesin iki katından biraz daha hızlı titreştiğini gösterir (oktav + küçük ikili). Bu gergin oran yoğun ve yakıcı bir armonik keskinlik yaratır.",
    category: "tension",
    mood: "Egzotik, dramatik, yüksek gerilimli (flamenko ve altere caz)",
    physics: "Bir oktav artı bir yarım ton. Oktav mesafesi küçük ikilinin yakın sertliğini bir miktar yumuşatır ama o keskin karakterini aynen korur.",
    songsAsc: "Cazda altere dominant akorları (V7♭9) ve flamenko gitar pasajları",
    songsDesc: "Film müziklerindeki dramatik vurgular"
  },
  {
    key: "M9",
    symbol: "M9",
    name: "Büyük dokuzlu",
    semitones: 14,
    ratio: "9 : 4",
    ratioExplain: "9 : 4 oranı, kök ses 4 kez titreşirken tiz sesin 9 döngü tamamlaması (iki kattan fazla) demektir. Bu geniş açıklık ferah, parlak ve modern bir renk kazandırır.",
    category: "major",
    mood: "Ferah, modern, havada süzülen ve ipeksi (pop ve neo-soul)",
    physics: "Bir oktav artı bir büyük ikili (veya üst üste iki beşli: Do → Sol → Re). add9 ve maj9 akorlarına ışıltılı bir genişlik verir.",
    songsAsc: "«Every Breath You Take» (The Police: o ünlü gitar arpeji doğrudan 9'luya tırmanır!)",
    songsDesc: "Çağdaş pop ve R&B piyano akor dizilimleri (voicing)"
  }
];

const CADENCE_ENCYCLOPEDIA_TR = [
  {
    id: "authentic",
    category: "classic",
    name: "Klasik tam (otantik) kadans",
    formula: "I – IV – V – I",
    tag: "Temel & ev",
    tagClass: "tag-sage",
    bars: ["I", "IV", "V", "I"],
    whyItWorks: "Dört ölçüde eksiksiz bir hikâye anlatır: **I (tonik)** evi kurar. **IV (subdominant)** kapıyı açıp keşfe çıkar. **V (dominant)** yeden sesi sayesinde en yüksek gerilimi oluşturur ve **I** her şeyi yeniden huzura kavuşturur.",
    songs: [
      "«Twist and Shout» – The Beatles (I – IV – V)",
      "«La Bamba» – Ritchie Valens",
      "«Three Little Birds» – Bob Marley",
      "Sayısız halk şarkısı ve zamansız klasik"
    ]
  },
  {
    id: "plagal-amen",
    category: "classic",
    name: "Plagal («Amin») kadansı",
    formula: "I – IV – I",
    tag: "Yumuşak & vakur",
    tagClass: "tag-sage",
    bars: ["I", "IV", "I"],
    whyItWorks: "Gergin dominantın (**V**) aksine **IV** akorunda toniği sertçe talep eden bir yeden ses bulunmaz. Bu yüzden **IV → I** vurmaz; ilahilerdeki ünlü «Amin» kapanışı gibi sıcak ve yumuşak bir biçimde yerine oturur.",
    songs: [
      "«Hey Jude» – The Beatles (♭VII–IV–I üzerine uzun «Na-na-na» bitişi)",
      "«Let It Be» – The Beatles (F–C ara geçişi)",
      "Geleneksel gospel ve koro kapanışları («Amin»)"
    ]
  },
  {
    id: "half-cadence",
    category: "classic",
    name: "Yarım kadans (açık soru)",
    formula: "I – IV – ii – V",
    tag: "Askıda gerilim",
    tagClass: "tag-peach",
    bars: ["I", "IV", "ii", "V"],
    whyItWorks: "Cümlenin ortasında **dominant (V)** üzerinde durmak müzikteki iki nokta üst üste gibidir: «dikkat, şimdi asıl kısım geliyor!». Kıta veya nakarat öncesi köprüde bu bekleyiş, **I** üzerinde patlayan nakaratı çok daha güçlü kılar.",
    songs: [
      "Klasik sonat temaları (Mozart, Haydn)",
      "Nakarat patlamadan hemen önceki neredeyse tüm pop köprüleri",
      "«Yesterday» – The Beatles (dominant üzerinde askıda kalan cümle sonu)"
    ]
  },
  {
    id: "pachelbel",
    category: "classic",
    name: "Pachelbel yürüyüşü",
    formula: "I – V – vi – iii – IV – I – IV – V",
    tag: "Baroktan popa",
    tagClass: "tag-lilac",
    bars: ["I", "V", "vi", "iii", "IV", "I", "IV", "V"],
    stepMs: 1500,
    chordDur: 1.38,
    whyItWorks: "1680'den kalma dahiyane bir bas yürüyüşü: bas çizgisi son derece doğal bir akışla iner ve atlar (**Do → Sol → La → Mi → Fa → Do → Fa → Sol**). Her halka zahmetsizce birbirine geçerek hem dingin hem sürükleyici sekiz ölçülük bir döngü kurar.",
    songs: [
      "«Re Majör Kanon» – Johann Pachelbel",
      "«Basket Case» – Green Day",
      "«Memories» – Maroon 5",
      "«Go West» – Village People / Pet Shop Boys"
    ]
  },
  {
    id: "pop4",
    category: "pop",
    name: "Popun «4 sihirli akoru»",
    formula: "I – V – vi – IV",
    tag: "Pop klasiği",
    tagClass: "tag-peach",
    bars: ["I", "V", "vi", "IV"],
    whyItWorks: "Muhtemelen son 50 yılın en başarılı akor yürüyüşü! Sırrı şu: tam ortasında kalbe dokunan bir **kırık kadans (V → vi)** gizlidir. **IV** ile bitmek ise nakaratı sonsuz döngüde tekrar etmeye açık kapı bırakır.",
    songs: [
      "«Let It Be» – The Beatles (kıta)",
      "«Someone Like You» – Adele (nakarat)",
      "«With or Without You» – U2",
      "«No Woman, No Cry» – Bob Marley",
      "«Don't Stop Believin'» – Journey"
    ]
  },
  {
    id: "doowop",
    category: "pop",
    name: "50'ler / Doo-wop yürüyüşü",
    formula: "I – vi – IV – V",
    tag: "Soul & retro",
    tagClass: "tag-lilac",
    bars: ["I", "vi", "IV", "V"],
    whyItWorks: "Parlak tonikten (**I**) armoni yumuşakça kendi **ilgili minörüne (vi)** kayar; ikisinin iki ortak sesi vardır! Oradan **IV** ve **V**, ilk ölçüye doğru karşı konulmaz nostaljik bir ivme yaratır.",
    songs: [
      "«Stand By Me» – Ben E. King",
      "«Every Breath You Take» – The Police",
      "«Unchained Melody» – The Righteous Brothers",
      "«Happiness Is a Warm Gun» – The Beatles (bitiş)"
    ]
  },
  {
    id: "sad-pop",
    category: "pop",
    name: "Duygusal minör pop döngüsü",
    formula: "vi – IV – I – V",
    tag: "Melankoli & ivme",
    tagClass: "tag-lilac",
    bars: ["vi", "IV", "I", "V"],
    whyItWorks: "Dahiyane numara: «I – V – vi – IV» ile birebir aynı dört akor, sadece **ilgili minörden (vi)** başlayacak şekilde kaydırılmış! Minörle başlamak güneşli havayı dokunaklı bir yoğunluğa dönüştürürken **I** ve **V**'in tüm enerjisini korur.",
    songs: [
      "«Zombie» – The Cranberries (Em – C – G – D)",
      "«Save Tonight» – Eagle-Eye Cherry",
      "«Numb» – Linkin Park",
      "«Hello» – Adele (kıta)"
    ]
  },
  {
    id: "minor-plagal",
    category: "pop",
    name: "Minör subdominant (tatlı-acı)",
    formula: "I – IV – iv – I",
    tag: "Sinema & nostalji",
    tagClass: "tag-peach",
    bars: ["I", "IV", "iv", "I"],
    whyItWorks: "Armoninin en dokunaklı hareketlerinden biri: coşkuyla **IV (Fa majör)** akoruna açılırız, ardından aynı akor Do minörden *modal ödünçleme* yoluyla **iv (Fa minör)** içinde erir. İç seste **La** yarım ton inerek **La♭** olur ve I üzerinde **Sol**'e kayar.",
    songs: [
      "«In My Life» – The Beatles",
      "«Don't Look Back in Anger» – Oasis (nakarat öncesi F → Fm → C)",
      "«Wake Me Up When September Ends» – Green Day",
      "Klasik Disney baladları ve altın çağ film finalleri"
    ]
  },
  {
    id: "creep-chromatic",
    category: "pop",
    name: "Çıkıcı kromatik çizgi («Creep»)",
    formula: "I – III7 – IV – iv",
    tag: "İç burkan klasik",
    tagClass: "tag-lilac",
    bars: ["I", "III7", "IV", "iv"],
    whyItWorks: "Gizli iç sese kulak ver: **C (I)** **Sol** sesini tutar; beklenmedik majör **E7 (III7)** akoru onu **Sol♯**'e yükseltir; **F (IV)** **La**'ya çıkar; **Fm (iv)** ise hüzünle **La♭**'e geri iner. Bu kromatik iplik (**Sol → Sol♯ → La → La♭**) tüm yürüyüşü bir arada tutar.",
    songs: [
      "«Creep» – Radiohead",
      "«The Air That I Breathe» – The Hollies",
      "«Get Free» – Lana Del Rey"
    ]
  },
  {
    id: "royal-road",
    category: "pop",
    name: "«Kral Yolu» (Ōdō Shinkō)",
    formula: "IV – V – iii – vi",
    tag: "J-pop & anime marşı",
    tagClass: "tag-sage",
    bars: ["IV", "V", "iii", "vi"],
    whyItWorks: "Japonya'da kraliyet yürüyüşü olarak ünlüdür: doğrudan **IV** üzerinde hızla başlar, **V**'ten son sürat geçer, sonra **I**'i teğet geçerek **iii** üzerinden **vi**'ya kayar. Tam çözümden kaçınmak o bitmeyen sinematik akışı yaratır.",
    songs: [
      "«Stay With Me» – Miki Matsubara (City Pop)",
      "«Never Gonna Give You Up» – Rick Astley (nakarat)",
      "Sayısız anime açılışı ve Nintendo teması (Mario Kart / Zelda)"
    ]
  },
  {
    id: "sus4-resolve",
    category: "pop",
    name: "Askılı dominant çözümü (sus4)",
    formula: "I – IV – Vsus4 – V – I",
    tag: "Zarif askı",
    tagClass: "tag-sage",
    bars: ["I", "IV", "Vsus4", "V", "I"],
    whyItWorks: "**Vsus4** içinde dominantın büyük üçlüsü (Sol akorundaki **Si**) bekletilir ve yerine dörtlü (**Do**) gelir. Bu parlak askı sonra bir yarım ton kayarak (**Do → Si**) saf **V** akoruna çözülür ve **I**'e iner.",
    songs: [
      "«Crazy Little Thing Called Love» – Queen",
      "«Pinball Wizard» – The Who",
      "«The Scientist» / Coldplay piyano marşları"
    ]
  },
  {
    id: "deceptive",
    category: "epic",
    name: "Kırık (aldatıcı) kadans",
    formula: "I – IV – V – vi",
    tag: "Sürpriz dönüş",
    tagClass: "tag-lilac",
    bars: ["I", "IV", "V", "vi"],
    whyItWorks: "**I – IV – V**'ten sonra beynin kesinlikle zafer dolu bir majör **I** bekler. Yeden ses gerçekten Do'ya çıkar ama alttaki bas Do yerine **La**'ya düşer (**La minör** oluşur). Tüyleri diken diken eden sürpriz garantili!",
    songs: [
      "«Hallelujah» – Leonard Cohen («the minor fall, the major lift…» kısmında)",
      "«Livin' on a Prayer» – Bon Jovi",
      "Büyük film müziği dorukları (Hans Zimmer, John Williams)"
    ]
  },
  {
    id: "mario-cadence",
    category: "epic",
    name: "«Mario» kadansı (zafer fanfarı)",
    formula: "I – bVI – bVII – I",
    tag: "Oyun fanfarı",
    tagClass: "tag-peach",
    bars: ["I", "bVI", "bVII", "I"],
    whyItWorks: "Paralel minörden ödünç alınan iki majör akor, **♭VI (La♭ majör)** ve **♭VII (Si♭ majör)**, iki tam ton basamakla tırmanarak (**La♭ → Si♭ → Do**) anında macera ve bölüm geçme hissi uyandırır.",
    songs: [
      "«Super Mario Bros.» – Bölüm sonu fanfarı (Nintendo)",
      "«With a Little Help from My Friends» – The Beatles / Joe Cocker (final)",
      "«P.S. I Love You» – The Beatles ve görkemli rock finalleri"
    ]
  },
  {
    id: "mixolydian-rock",
    category: "epic",
    name: "Stadyum rock kadansı (miksolidyen)",
    formula: "I – bVII – IV – I",
    tag: "Rock & enerji",
    tagClass: "tag-sage",
    bars: ["I", "bVII", "IV", "I"],
    whyItWorks: "Akademik yeden ses yok: V yerine **♭VII (Do tonunda Si♭ majör)** kullanmak toniğe ayakları yere basan, asi bir miksolidyen rock yürüyüşü verir. **I**'den **♭VII**'ye bir tam ton inilir ve **IV** üzerinden güçlüce **I**'e yuvarlanılır.",
    songs: [
      "«Sweet Child o' Mine» – Guns N' Roses",
      "«Sympathy for the Devil» – The Rolling Stones",
      "«Hey Jude» – The Beatles (nakarat vamp'i)",
      "«Royals» – Lorde"
    ]
  },
  {
    id: "andalusian",
    category: "epic",
    name: "Endülüs kadansı",
    formula: "vi – V – IV – III7",
    tag: "Flamenko & drama",
    tagClass: "tag-peach",
    bars: ["vi", "V", "IV", "III7"],
    whyItWorks: "Dört akorda yüzyıllık tutku: bas çizgisi adım adım kararlıca iner (**La → Sol → Fa → Mi**) ve ardından majör dominant **E7 (III7)** ile alevlenerek döngüyü karşı konulmaz biçimde yeniden başlatır.",
    songs: [
      "«Hit the Road Jack» – Ray Charles",
      "«Smooth Criminal» – Michael Jackson",
      "«Sultans of Swing» – Dire Straits (kıta sonu)",
      "«Stairway to Heaven» – Led Zeppelin (rock finali)"
    ]
  },
  {
    id: "jazz251",
    category: "jazz",
    name: "II–V–I (cazın kraliçe kadansı)",
    formula: "ii – V7 – I – I",
    tag: "Caz & soul",
    tagClass: "tag-sage",
    bars: ["ii", "V7", "I", "I"],
    whyItWorks: "Caz ve soul'da minör üst-tonik (**ii**, Do tonunda Dm) IV'ün yerini alır. **ii → V7 → I** bağlantısı her akorda bası tam beşli aşağı indirir (Re → Sol → Do): Batı müziğindeki en doğal armonik harekettir.",
    songs: [
      "«Sunday Morning» – Maroon 5 (neredeyse tüm parça ii – V7 – I üzerine kurulu!)",
      "«Autumn Leaves» (Les Feuilles mortes) – caz standardı",
      "«Fly Me to the Moon» – Frank Sinatra"
    ]
  },
  {
    id: "jazz1625",
    category: "jazz",
    name: "Swing yürüyüşü (I–vi–ii–V)",
    formula: "Imaj7 – vi – ii – V7 – Imaj7",
    tag: "Swing & standartlar",
    tagClass: "tag-lilac",
    bars: ["Imaj7", "vi", "ii", "V7", "Imaj7"],
    whyItWorks: "Doo-wop yürüyüşünün yetişkin ve cazlı kuzeni: **Imaj7 (Cmaj7)** akoruna büyük yedili eklemek evi kadifemsi bir parıltıyla sarar; ardından **vi → ii → V7** beşliler çemberi boyunca akıcıca döner.",
    songs: [
      "«I Got Rhythm» – George Gershwin (Rhythm Changes)",
      "«Blue Moon» – Richard Rodgers",
      "«Heart and Soul» – Hoagy Carmichael"
    ]
  },
  {
    id: "tritonesub",
    category: "jazz",
    name: "Triton ikamesi",
    formula: "ii – bII7 – I – I",
    tag: "Cazın gizli silahı",
    tagClass: "tag-peach",
    bars: ["ii", "bII7", "I", "I"],
    whyItWorks: "Do majörde **D♭7 (♭II7)** nasıl olur da **G7 (V7)** yerine geçebilir? Çünkü ikisi de birebir aynı yönlendirici **tritonu** (**Fa ve Si/Do♭**) paylaşır! Bu sırada bas eve kromatik olarak kayar: **Re → Re♭ → Do**.",
    songs: [
      "«The Girl from Ipanema» – Antônio Carlos Jobim",
      "Lo-fi hip-hop, neo-soul ve gospel'in karakteristik kadansları"
    ]
  },
  {
    id: "blues12",
    category: "jazz",
    name: "Dominantlı blues yürüyüşü",
    formula: "I7 – IV7 – I7 – V7 – IV7 – I7",
    tag: "Blues & rock and roll",
    tagClass: "tag-peach",
    bars: ["I7", "IV7", "I7", "V7", "IV7", "I7"],
    whyItWorks: "Klasik armoni dominant yedili akorunu yalnızca V. dereceye saklar. Blues bu kuralı pencereden atar ve her ana dereceyi (**I7, IV7, V7**) büyük üçlü ile küçük yedili arasındaki o pürüzlü sürtünmeyle giydirir: katıksız blues.",
    songs: [
      "«Johnny B. Goode» – Chuck Berry",
      "«Hound Dog» – Elvis Presley",
      "«Sweet Home Chicago» – Robert Johnson / The Blues Brothers"
    ]
  }
];

const SOLFEGE_STEPS_TR = [
  {
    syllable: "Do",
    degree: "1. derece (tonik)",
    semitones: 0,
    resolvePath: [0],
    resolveDesc: "Zaten evde, tonik üzerinde dinleniyor (Do'yu tekrarlamak kararlılığı pekiştirir)",
    color: "sage",
    character: "Sağlam, huzurlu, eve varış",
    desc: "Diğer her derece gerilimini yalnızca Do ile olan ilişkisinden alır. Bir melodi Do'ya konduğunda kulağın sonunda derin bir nefes alır."
  },
  {
    syllable: "Re",
    degree: "2. derece (üst-tonik)",
    semitones: 2,
    resolvePath: [2, 0],
    resolveDesc: "Aşağıya, toniğe çözülür: Re → Do",
    color: "peach",
    character: "Havada, meraklı, yola çıkmış",
    desc: "Re, Do ile Mi arasına yerleşir. Bir cümleyi Re'de bitirmek açık ve soru sorar gibi duyulur: doğal olarak Do'ya doğru eğilir."
  },
  {
    syllable: "Mi",
    degree: "3. derece (büyük üçlü)",
    semitones: 4,
    resolvePath: [4, 2, 0],
    resolveDesc: "Dizi boyunca sakince aşağı iner: Mi → Re → Do",
    color: "sage",
    character: "Sıcak, parlak, güven verici, dengeli",
    desc: "Mi, tonun majör karakterini belirler. Eve dönmek için Re üzerinden sakince süzülerek tonik Do'ya ulaşır."
  },
  {
    syllable: "Fa",
    degree: "4. derece (subdominant)",
    semitones: 5,
    resolvePath: [5, 4, 2, 0],
    resolveDesc: "Aşağıya, toniğe çözülür: Fa → Mi → Re → Do",
    color: "peach",
    character: "Ağırbaşlı, yaslanan, aşağı çekilen",
    desc: "Fa, Mi'nin yalnızca bir yarım ton üzerindedir! Bu dar adım güçlü bir aşağı çekim yaratır: Fa önce Mi'ye düşer, sonra Re üzerinden Do'ya iner."
  },
  {
    syllable: "Sol",
    degree: "5. derece (dominant)",
    semitones: 7,
    resolvePath: [7, 9, 11, 12],
    resolveDesc: "Üst toniğe doğru tırmanır: Sol → La → Ti → Do",
    color: "sage",
    character: "Işıltılı, açık, sağlam, ikinci dayanak",
    desc: "Sol'den itibaren oktavın üst yarısı tiz Do'ya doğru ivmelenir (Sol → La → Ti → Do)."
  },
  {
    syllable: "La",
    degree: "6. derece (ilgili minör)",
    semitones: 9,
    resolvePath: [9, 11, 12],
    resolveDesc: "Üst toniğe doğru tırmanır: La → Ti → Do",
    color: "lilac",
    character: "Lirik, yumuşak, hafifçe tatlı-acı",
    desc: "La aynı zamanda ilgili minör dizinin kök sesidir. Majör tonal işitmede La, tiz Do'ya ulaşmak için yeden ses Ti (Si) üzerinden geçer."
  },
  {
    syllable: "Ti",
    degree: "7. derece (yeden ses)",
    semitones: 11,
    resolvePath: [11, 12],
    resolveDesc: "Yeden sesin doğrudan mıknatıslı çözümü: Ti → Do",
    color: "peach",
    character: "Mıknatıslı, acil, yukarıya gerilmiş",
    desc: "Ti (Si), tiz Do'nun yalnızca bir yarım ton altında durur. Dizideki hiçbir nota, Ti → Do kadar şiddetle çözülmeyi istemez!"
  }
];

const KNOWLEDGE_ARTICLES_TR = [
  {
    id: "art-why-ear-training",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a6 6 0 1 1 11.4 2.5c-.6 1.3-1.4 1.9-1.9 3.1-.4 1-.5 2.4-1.7 3.2A2.5 2.5 0 0 1 10 15"/><path d="M10.5 8.5a2.2 2.2 0 0 1 4 1.2c0 .9-.6 1.4-1 2.2"/><path d="M19.5 6.5a8 8 0 0 1 0 7"/></svg>`,
    badgeClass: "badge-sage",
    title: "Neden kulak eğitimi?",
    subtitle: "Eğitilmiş bir kulak neleri mümkün kılar, kimin işine yarar ve nasıl başlanır?",
    tag: "Temeller & motivasyon",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Neden kulak eğitimi?</span>
        <h2>Hayal gücünle çalgın arasındaki köprü</h2>
        <p class="article-lead">
          Başına mutlaka gelmiştir: zihninde harika bir melodi dönüyor ya da sevdiğin bir şarkıyı dinliyorsun, ama çalgının başına geçince doğru notaları deneme yanılmayla arıyorsun. <strong>Kulak eğitimi (işitme eğitimi)</strong> bu iki dünyayı birleştirir; motifleri, armonik gerilimleri ve ritmik yapıları duyduğun anda berraklaştırır.
        </p>

        <h3>Sana hangi somut becerileri kazandırır?</h3>
        <ul class="article-steps-list">
          <li><strong>Melodileri ve şarkıları daha hızlı çıkarmak:</strong> Her notayı rastgele aramak yerine atlayışları anında tanırsın (<em>«Bu çıkıcı bir tam beşli!»</em>) ve tanıdık yürüyüşleri hemen yakalarsın (<em>«Bu I–V–vi–IV!»</em>).</li>
          <li><strong>Daha özgür çalmak, doğaçlama yapmak ve bestelemek:</strong> Bir subdominantın, yeden sesin ya da senkopun etkisini duyduğun anda grupla çalmak, şarkı yazmak ve DAW'da düzenleme yapmak kendiliğinden akar.</li>
          <li><strong>Daha iyi entonasyon ve birlikte çalma uyumu:</strong> Sesinin ya da telinin tam tınıda olup olmadığını, iki tınının nasıl kaynaştığını ve grubun «groove» merkezini çok daha erken fark edersin.</li>
          <li><strong>Notaları ve akor yürüyüşlerini içinden duymak:</strong> Bir akor dizisi artık kâğıttaki mürekkepten ibaret kalmaz; parmaklarını koymadan önce onu zihninde duyarsın.</li>
        </ul>

        <h3>Bu çalışma kimler için faydalıdır?</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Yeni başlayanlar &amp; meraklılar (8 yaşından itibaren)</h5>
            <p>Akademik solfej ya da uzun yıllar eğitim gerekmez. Merakla dinleyip doğrudan karşılaştırarak öğrenir, ilk günden gerçek bir müzik sezgisi geliştirirsin.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Çalgıcılar &amp; şarkıcılar</h5>
            <p>Gitar, piyano ya da üflemeli çalgılarda notaya bağımlı kalmadan özgürleşmek, koroda veya grupta armonik duyuşu keskinleştirmek için idealdir.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>Besteciler, beatmaker'lar &amp; prodüktörler</h5>
            <p>Stüdyoda akor yürüyüşlerini, bas çizgilerini, davul groove'larını ve miksteki frekans dengelerini yakalamayı ciddi biçimde hızlandırır.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>İleri düzey müzisyenler &amp; sınavlar</h5>
            <p>Triton ikameleri, 15 kromatik aralık, aksak ölçüler, hassas EQ farkları ve solfejde modülasyonlara kadar ilerleyebilirsin.</p>
          </div>
        </div>

        <h3>Büyük efsane: «Mutlak kulak» şart mı?</h3>
        <p>
          <strong>Kesinlikle hayır!</strong> Mutlak kulak (hiçbir referans olmadan tek bir notanın adını söylemek) nadirdir ve günlük müzik pratiğinde nadiren gerekir. Canlı müziğin neredeyse tamamı <strong>göreceli (işlevsel) kulağa</strong> dayanır: seslerin ve akorların <em>birbirleriyle</em> nasıl ilişki kurduğuna.
        </p>

        <div class="article-highlight-box">
          <h4>Hemen dene: Kulağın bağlamı zaten hissediyor</h4>
          <p>İster Do majör ister Fa majör olsun, bir tonalite kurulduğu anda dominantın (<strong>V</strong>) çekimini ve toniğe (<strong>I</strong>) dönmenin verdiği rahatlamayı doğal olarak hissedersin:</p>
          <button class="btn-tool" data-play-progression="I,IV,V7,I">▶ Tam kadansı dinle (I – IV – V7 – I)</button>
        </div>

        <h3>Düzenli ilerlemek (10 dakikalık rutin)</h3>
        <ul class="article-steps-list">
          <li><strong>Kısa ve sık çalışma her zaman kazanır:</strong> Haftada dört kez odaklanarak yapılan 5–10 dakika, pazar günü yapılan iki saatlik maratondan çok daha etkilidir.</li>
          <li><strong>Bedenini dahil et:</strong> Hedef notayı hafifçe mırıldan, ayağınla vuruşu tut ve bir hatadan sonra mutlaka <strong>A/B karşılaştırma</strong> düğmelerini kullan.</li>
          <li><strong>Baskı yerine merak:</strong> Her hata en az doğru cevap kadar öğreticidir; kulağı şekillendiren şey iki sesi yan yana doğrudan karşılaştırmaktır.</li>
        </ul>
      </div>
    `
  },
  {
    id: "art-talking-about-music",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9.5 10v3"/><path d="M12.5 8.5v6"/><path d="M15.5 10.5v2"/></svg>`,
    badgeClass: "badge-peach",
    title: "Müzik hakkında nasıl konuşulur?",
    subtitle: "Teori jargonu olmadan duyguları, imgeleri ve izlenimleri rahatça paylaşmak",
    tag: "Dinleme & sohbet",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Algı &amp; ifade</span>
        <h2>Notalar, akorlar ve teknik terimler olmadan müzikten konuşmak</h2>
        <p class="article-lead">
          Bir parça seni derinden etkiliyor, diken üstünde tutuyor ya da zihninde koca bir manzara çiziyor; ama biri <em>«Eee, nasıl buldun?»</em> diye sorduğunda ağzından sadece <em>«Fena değil»</em> ya da <em>«Bana göre değil»</em> çıkıveriyor. Dinlediğimizi kelimelere dökmek neden bu kadar zor ve bunu nasıl doğal biçimde başarabiliriz?
        </p>

        <p>
          Pek çok kişi teknik terimleri ya da solfeji bilmediği için geri durur. Oysa arkadaşlar arasında, derste veya provada güzel bir müzik sohbetinin teknik <strong>neden</strong>'e neredeyse hiç ihtiyacı yoktur. Önemli olan <strong>ne</strong> olduğudur: Kulağına ne ulaşıyor? İçinde ne kıpırdıyor? Ses baştan sona nasıl dönüşüyor?
        </p>

        <div class="k-song-ref">
          <strong>Bilmekte fayda var:</strong> Büyük orkestra şefleri, film müziği bestecileri, ses mühendisleri ve koro şefleri bile her gün <em>duyusal imgeler</em> kullanır. <em>«Başlangıç yoğun bir sis gibi, sonra ortada birden bir pencere açılıyor»</em> demek, kuru birkaç teknik terimden çoğu zaman çok daha fazlasını anlatır.
        </div>

        <h3>1. Altın kural: Yargıdan algıya geçmek</h3>
        <p>
          <em>«Sıkıcı»</em>, <em>«tuhaf»</em> ya da <em>«harika»</em> gibi kestirme yargılar sohbeti kapatır çünkü gerçekte ne duyduğunu anlatmaz. Oysa bir <strong>algıyı</strong> paylaşmak, 3 basit dayanakla sohbeti hemen açar:
        </p>
        <ul class="article-steps-list">
          <li><strong>Parçanın neresinde?</strong> Anı işaret et: <em>«En başta»</em>, <em>«Ortada yükselirken»</em>, <em>«Finalden hemen önce»</em> ya da <em>«O ani duraksamada.»</em></li>
          <li><strong>Orada ne hissediyorum?</strong> Kendi deneyiminle konuş: <em>«Bana … gibi geliyor»</em>, <em>«Sanki … hissi uyandırıyor»</em>, <em>«Orada bir çekim duyuyorum…»</em></li>
          <li><strong>Hangi günlük imge tam oturuyor?</strong> Mekân, ışık, dokunma veya hareketten kelimeler ödünç al: <em>«dar»</em>, <em>«sıcak»</em>, <em>«soluksuz»</em>, <em>«sonunda derin bir nefes vermek gibi.»</em></li>
        </ul>

        <h3>2. Dinlediklerini tarif etmek için altı günlük boyut</h3>
        <p>
          Akademik bir sözlüğe gerek yok: dinlerken hissettiğin neredeyse her şey herkesin anladığı bu altı duyusal alana girer:
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>A. Atmosfer &amp; duygu nüansları</h5>
            <p>«Neşeli / hüzünlü» kalıbının bir adım ötesine geç: <em>dingin, nostaljik, mağrur, oyuncu, tedirgin, kırılgan, vakur, ironik, ayakları yere basan</em> ya da <em>tatlı-acı</em> mı? Zıtlıklar harika işler: <em>«Dışı parlak ama içi yorgun.»</em></p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>B. Mekân, yakınlık &amp; yoğunluk</h5>
            <p>Pasaj dar mı yoksa geniş mi hissettiriyor? Faydalı çiftler: <em>sıkışık, ağır, yüklü, yoğun</em> karşısında <em>geniş, ferah, şeffaf, açık</em>; ya da <em>kulağın dibinde fısıldanan</em> karşısında <em>büyük bir salonda uzaklardan yankılanan</em>.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>C. Renk, sıcaklık &amp; doku</h5>
            <p>Sese dokunduğunu ya da onu gördüğünü hayal et: <em>sıcak, altın rengi, kadifemsi, mat, topraksı, dumanlı, yumuşak</em> mı; yoksa <em>serin, kristal, gümüşi, göz alıcı, keskin, pürüzlü, gevrek, metalik</em> mi? Ağırlığı da düşün: <em>taş gibi ağır</em> vs. <em>tüy gibi hafif</em>.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>D. Hareket, ivme &amp; denge</h5>
            <p>Bedeninin nasıl tepki verdiğini izle: <em>ileri iten, sıçrayan, sürüklenen, tereddütlü, sallanan, döngüsel, nefes nefese, sağlam basan</em>. Kendine sor: <em>İleri mi itiyor, yumuşakça sallıyor mu yoksa zamanı mı donduruyor?</em></p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>E. Akış eğrisi, gerilim &amp; nefes</h5>
            <p>Müzik küçük bir hikâye anlatır: <em>hızlanma, bekleyiş, dönüm noktası, ani rahatlama, geri çekilme, sönen yankı, havada kalan soru, dinginliğe dönüş</em>. <em>«Burada nefesimi tutuyorum»</em> dediğinde herkes anlar.</p>
          </div>
          <div class="k-compare-box is-lilac">
            <h5>F. Sesler arası diyalog</h5>
            <p>Çalgıların adını bilmeden de rollerini anlatabilirsin: <em>«Bir ses öne çıkıp konuşurken diğerleri yumuşak bir halı dokuyor»</em>, <em>«birbirlerine top atar gibi»</em>, <em>«tek bir blok halinde»</em> ya da <em>«herkes kendi telinden çalıyor.»</em></p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Ses deneyi: Teori olmadan zıtlıkları dinle</h4>
          <p>On saniyeliğine teoriyi unut ve her çiftte hangi <strong>somut hissin</strong> ortaya çıktığına dikkat et:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-dense">▶ Sıkı &amp; yoğun</button>
            <button class="btn-tool" data-play-custom="talk-open">▶ Geniş &amp; ferah</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-warm">▶ Sıcak &amp; kadifemsi</button>
            <button class="btn-tool" data-play-custom="talk-sharp">▶ Parlak &amp; keskin</button>
          </div>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="talk-drive">▶ İleri iten</button>
            <button class="btn-tool" data-play-custom="talk-float">▶ Süzülen &amp; askıda</button>
          </div>
        </div>

        <h3>3. Sohbeti kolaylaştıranlar ve tıkayanlar</h3>
        <p>
          Bazı alışkanlıklar, özellikle farklı müzik geçmişine sahip dinleyiciler arasında, sohbeti farkında olmadan tıkar ya da yanlış anlaşılmalara yol açar.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Tıkayıcı &amp; belirsiz</h5>
            <p><strong>Boş etiketler:</strong> «Güzel / kötü / ucuz / profesyonel / müzik dışı.» Bunlar karşındakini gerçekte ne duyduğunu tahmin etmeye zorlayan yargılardır.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Açık &amp; net</h5>
            <p><strong>Gelişimi tarif etmek:</strong> «Yumuşak başlangıç beni hemen içine çekti ama ortada biraz fazla acele ediyor gibi geldi ve kulağıma sertleşti.»</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Yanıltıcı teknik terimler</h5>
            <p>«Sürtünüyor» ya da «yumuşaklık eksik» demek isterken «detone», «atonal», «patlıyor» veya «fazla dinamik» gibi kelimeler kullanmak: profesyoneller bu terimlere çok kesin anlamlar yükler.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Samimi günlük imgeler</h5>
            <p>Yalın kal: «Teknik adını bilmiyorum ama bu noktada iki keskin kenar yumuşamadan önce birbirine sürtünüyor gibi hissediyorum.»</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Kişilere veya türlere yargı</h5>
            <p>«Sıfır duygu» ya da «tam asansör müziği / ticari». Kişileri veya türleri yaftalamak merakı anında söndürür.</p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Dokuyu &amp; zıtlığı adlandırmak</h5>
            <p>«Bu bölüm bana o kadar pürüzsüz ve tekdüze akıyor ki dikkatimi yakalayacak küçük bir sürpriz ya da çıkıntı arıyorum.»</p>
          </div>
        </div>

        <h3>4. Fikir çevirmeni: Belirsizden canlı berraklığa</h3>
        <p>
          Çoğu zaman tek bir somut imge, bulanık bir hissi herkes için kristal netliğine kavuşturmaya yeter:
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Bunun yerine: «Biraz tuhaf tınlıyor.»</strong>
              <span>Şöyle de: «Burada bir şey dengesizce sürtünüyor, sanki bir anlığına denge kayboluyor gibi.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Bunun yerine: «Çok sıkıcı.»</strong>
              <span>Şöyle de: «Uzun süre aynı duygusal odada kalıyor; bir kıvılcım ya da dönüm noktası bekliyorum.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Bunun yerine: «Müthiş!»</strong>
              <span>Şöyle de: «Bu geçiş o kadar aniden açılıyor ki sonunda açık havaya çıkmış gibi hissettiriyor.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Bunun yerine: «Çok hızlı.»</strong>
              <span>Şöyle de: «Burada öğeler üst üste biniyor gibi; tempo değişmese bile acele ediyormuş hissi veriyor.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Bunun yerine: «Çok yüksek / rahatsız edici!»</strong>
              <span>Şöyle de: «Güçlü bölümde her şey üst üste yığılıyor ve kulağıma çok delici geliyor.»</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Bunun yerine: «Sadece üzgün.»</strong>
              <span>Şöyle de: «Trajik değil; daha çok sakin, içe dönük ve gün batımı gibi tatlı bir teselli veriyor.»</span>
            </div>
          </div>
        </div>

        <h3>5. Duruma göre pratik ipuçları</h3>
        <ul class="article-steps-list">
          <li><strong>Konser sonrası veya arkadaşlarla dinlerken:</strong> <em>«Beğendin mi?»</em> yerine sıcak sorular sor: <em>«Hangi an aklında kaldı?»</em>, <em>«Bu parçayı hangi atmosfere ya da film sahnesine yakıştırırdın?»</em> veya <em>«Seni nerede içine çekti, nerede koptun?»</em></li>
          <li><strong>Koroda, grupta veya derste:</strong> Önce zaten iyi işleyen şeyi vurgula (<em>«Girişin harika bir samimiyeti var; dönüşte biraz daha parlak bir açılım isterim»</em>). Öğrenciysen <em>«Burayı ağır / gergin / aceleci hissediyorum»</em> demekten çekinme: iyi bir öğretmen o duyusal ipucunu hemen somut bir araca çevirir.</li>
          <li><strong>İki kişi tam tersini hissettiğinde:</strong> Senin <em>huzur</em> duyduğun yerde bir başkası <em>yalnızlık</em> hissedebilir. Anılarımız ve ruh halimiz her zaman bizimle birlikte dinler: bu içten hisleri karşılaştırmak müzik sohbetlerini büyüleyici kılar.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Cep rehberi (her ortam için 4 basit soru)</h4>
          <p>Kelimeler yetmediğinde bu dört ipucundan sadece <strong>birini</strong> seç:</p>
          <ul class="article-steps-list">
            <li><strong>Renk &amp; hava:</strong> Sıcak, yumuşak ve koyu mu; yoksa parlak, serin ve keskin mi?</li>
            <li><strong>Mekân:</strong> Dar ve dip dibe mi; yoksa geniş, açık ve ferah mı?</li>
            <li><strong>Hareket:</strong> İlerliyor mu, sallanıyor mu, tökezliyor mu yoksa hareketsiz askıda mı kalıyor?</li>
            <li><strong>Kilit an:</strong> Atmosfer tam olarak hangi anda değişiyor?</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "art-4chords",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
    badgeClass: "badge-peach",
    title: "4 akor fenomeni",
    subtitle: "Yüzlerce dünya hitinin neden aynı akor yürüyüşüne dayandığı",
    tag: "Kadanslar & pop",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Popta armoni</span>
        <h2>Neden 4 akor 1000 dünya hitini sırtlıyor?</h2>
        <p class="article-lead">
          The Beatles'tan (<em>Let It Be</em>) Toto'ya (<em>Africa</em>), Adele'den (<em>Someone Like You</em>) Green Day'e ve Taylor Swift'e kadar tek bir formül her yerde karşımıza çıkar: <strong>I – V – vi – IV</strong>.
        </p>

        <div class="article-highlight-box">
          <h4>Formülü hemen dinle (Do majörde: C – G – Am – F):</h4>
          <p>Duygu renginin ölçü ölçü nasıl değiştiğine dikkat et:</p>
          <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Popun 4 akorunu dinle (I – V – vi – IV)</button>
        </div>

        <h3>Bu dört ölçüde gizlenen psikoloji</h3>
        <ul class="article-steps-list">
          <li>
            <strong>1. Ölçü – Tonik (I):</strong> Her şey berrak, sağlam ve net başlar. Evin neresi olduğunu anında biliriz.
          </li>
          <li>
            <strong>2. Ölçü – Dominant (V):</strong> Ufku açar ve güçlü bir ileri ivme başlatır.
          </li>
          <li>
            <strong>3. Ölçü – İlgili minör (vi):</strong> İşte duygusal dönüm noktası! Armoni uslu uslu eve dönmek yerine bir <em>kırık kadansla</em> yön değiştirir ve nakaratın tam kalbine tatlı-acı bir dokunuş katar.
          </li>
          <li>
            <strong>4. Ölçü – Subdominant (IV):</strong> Kapıyı kapatmak yerine 4. ölçü derin bir nefes gibi açık kalır ve 1. ölçüyü sonsuz kez yeniden başlatmaya hazır bekler!
          </li>
        </ul>

        <div class="article-highlight-box">
          <h4>Başlangıç noktasını kaydırmak</h4>
          <p>
            Pek çok prodüktör birebir aynı dört akoru korur ama döngüyü 3. akordan (ilgili minörden: <strong>vi – IV – I – V</strong>) başlatır. Yürüyüş bir anda daha koyu, melankolik ve yoğun bir hale bürünür (Linkin Park – <em>Numb</em> veya <em>Save Tonight</em> gibi):
          </p>
          <button class="btn-tool" data-play-progression="vi,IV,I,V">▶ Minör başlangıçla karşılaştır (vi – IV – I – V)</button>
        </div>
      </div>
    `
  },
  {
    id: "art-gravity",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v7a6 6 0 0 0 12 0V4"/><line x1="4" y1="4" x2="8" y2="4"/><line x1="16" y1="4" x2="20" y2="4"/><line x1="6" y1="8" x2="8" y2="8"/><line x1="16" y1="8" x2="18" y2="8"/></svg>`,
    badgeClass: "badge-sage",
    title: "Müzikal mıknatıs: yeden ses ve triton",
    subtitle: "İki yarım tonun beynimizde nasıl güçlü bir çözülme isteği yarattığı",
    tag: "Gerilim & çözülme",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Armonik yerçekimi</span>
        <h2>Müzik bizi neden bir mıknatıs gibi toniğe çeker?</h2>
        <p class="article-lead">
          Tonal müzik dinlerken tek tek noktalar değil, gerçek çekim kuvvetleri duyarız. İki minik yarım ton mekanizması neredeyse her şeyi açıklar.
        </p>

        <h3>1. Yeden ses (7 → 1)</h3>
        <p>
          Majör dizide 7. dereceyi (Do majörde <strong>Si</strong>) üst tonikten (<strong>Do</strong>) yalnızca tek bir yarım ton ayırır. Do dizisini Si'ye kadar çal ve orada dur: kulağın son notayı resmen talep eder:
        </p>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="scale-unresolved">▶ Si'de duran dizi (çözülmemiş!)</button>
          <button class="btn-tool" data-play-custom="leading-tone">▶ Si → Do çözümünü dinle</button>
        </div>

        <h3>2. Triton kıskacı (V7 → I)</h3>
        <p>
          Dominant akoruna (Sol majör) küçük yediliyi (<strong>Fa</strong>) ekleyip <strong>G7</strong> elde ettiğinde birdenbire iki nota aralarında <strong>triton</strong> mesafesiyle karşı karşıya gelir:
        </p>
        <ul class="article-steps-list">
          <li><strong>Si</strong> (7. derece) bir yarım ton yükselerek <strong>Do</strong>'ya çıkmak ister.</li>
          <li><strong>Fa</strong> (4. derece) bir yarım ton inerek <strong>Mi</strong>'ye düşmek ister.</li>
        </ul>
        <div class="article-highlight-box">
          <h4>İki yönlendirici sesin içe doğru nasıl kapandığını dinle:</h4>
          <p>Önce Fa ve Si canlı bir gerilimle birlikte titreşir, ardından Mi ve Do üzerinde kapanır (saf rahatlama):</p>
          <button class="btn-tool" data-play-custom="tritone-collapse">▶ Triton çözümü (Fa+Si → Mi+Do)</button>
        </div>
      </div>
    `
  },
  {
    id: "art-minor-plagal",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Tüyleri diken diken eden etki: minör subdominant iv → I",
    subtitle: "Beatles'tan Radiohead'e ve Disney'e: majör tatlı-acıya dönüştüğünde",
    tag: "Beste sırrı",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Armonik renk</span>
        <h2>Pop müziğin en dokunaklı akor değişimi mi?</h2>
        <p class="article-lead">
          Güneşli bir yaz öğleden sonrasını (majör tonik <strong>I</strong>), geçip giden açık bir bulutu (subdominant <strong>IV</strong>) ve hemen ardından gökyüzü yeniden açılmadan önceki o altın, nostaljik ışığı hayal et.
        </p>

        <h3>IV → iv → I içinde ne olur?</h3>
        <p>
          Do majörde subdominant akoru <strong>Fa majördür (Fa – La – Do)</strong>. Üçlüsü olan <strong>La</strong>'yı bir yarım ton indirip <strong>La♭</strong> yaptığında akor <strong>Fa minör (iv)</strong> olur. Do minör modundan ödünç alınan bu <strong>La♭</strong>, ardından tonik üzerindeki <strong>Sol</strong>'e doğalca kayar ve ipeksi bir kromatik çizgi oluşturur: <strong>La → La♭ → Sol</strong>.
        </p>

        <div class="article-highlight-box">
          <h4>Doğrudan karşılaştırmayı dinle:</h4>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="plagal-major">▶ Klasik: C – F – C</button>
            <button class="btn-tool" data-play-custom="plagal-minor">▶ Minör dokunuş: C – F – Fm – C</button>
          </div>
        </div>

        <h3>Bu armonik dönüş üzerine kurulu kült parçalar</h3>
        <ul class="article-steps-list">
          <li><strong>The Beatles – «In My Life»</strong> («I'll remember you» kısmında) ve <strong>«Blackbird»</strong></li>
          <li><strong>Radiohead – «Creep»</strong> (tüm parçanın döngüsü: G – B – C – Cm)</li>
          <li><strong>Oasis – «Don't Look Back in Anger»</strong> (nakarat öncesi köprünün sonunda)</li>
          <li><strong>Green Day – «Wake Me Up When September Ends»</strong></li>
          <li><strong>Disney &amp; Pixar</strong> altın çağının sayısız film finali</li>
        </ul>
      </div>
    `
  },
  {
    id: "art-physics-waves",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2.5-6 5.5-6 8 0s5.5 6 8 0 3.5-3 4-2"/></svg>`,
    badgeClass: "badge-sage",
    title: "Konsonans ve disonans: dalgaların dansı",
    subtitle: "Basit sayı oranlarından iç kulaktaki kritik bantlara",
    tag: "Fizik & akustik",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-sage">Fizik &amp; psikoakustik</span>
        <h2>Disonans «yanlış» değildir: ileriye doğru harekettir!</h2>
        <p class="article-lead">
          Yeni başlayanların çoğu <strong>konsonansın</strong> «güzel», <strong>disonansın</strong> ise «bozuk» demek olduğunu sanır. Gerçekte bunlar müzikal anlatının yin ve yang'ıdır: konsonans <em>dinginlik ve varış</em>; disonans ise <em>itici güç, baharat ve özlem</em> demektir.
        </p>

        <div class="article-highlight-box">
          <h4>Hızlı test: Gerilim çözüm ister</h4>
          <p>Önce durağan bir konsonansı, ardından eve çözülen askılı bir sürtünmeyi dinle:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-progression="I,I,I">▶ Yalnızca saf konsonans (durağan)</button>
            <button class="btn-tool" data-play-progression="I,IV,Vsus4,V7,I">▶ Sürtünme → çözülme</button>
          </div>
        </div>

        <h3>1. Her şey siyah-beyaz değil: 4 basamaklı spektrum</h3>
        <p>
          Pisagor bunu gergin bir tel üzerinde çoktan ölçmüştü: frekans oranındaki tam sayılar ne kadar küçükse iki ses o kadar yumuşak kaynaşır. Teori, aralıkları dört basamakta sınıflandırır:
        </p>

        <div class="spectrum-list">
          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>1. Tam konsonans (tam kaynaşma)</span>
              <span>1:1 · 2:1 · 3:2</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill sage" style="width:96%"></div></div>
            <div class="spectrum-sub">Oktav (2:1), tam beşli (3:2) ve tam dörtlü (4:3): tek bir ses gibi duyulacak kadar saf ve kenetli; power chord'lar, dem sesleri ve final kadansları için biçilmiş kaftan.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="P8">▶ Oktav (2:1)</button>
              <button class="btn-tool" data-play-interval-harm="P5">▶ Beşli (3:2)</button>
              <button class="btn-tool" data-play-interval-harm="P4">▶ Dörtlü (4:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>2. Eksik (renkli) konsonans (sıcak &amp; duygusal)</span>
              <span>5:4 · 6:5 · 5:3</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill lilac" style="width:74%"></div></div>
            <div class="spectrum-sub">Büyük ve küçük üçlüler ile altılılar: majör veya minör bir duygu yayacak kadar ayrık. İlginç bilgi: Orta Çağ'da üçlüler hâlâ disonans sayılıyordu; Rönesans onları armoninin kalbine yerleştirdi!</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M3">▶ Büyük 3'lü (5:4)</button>
              <button class="btn-tool" data-play-interval-harm="m3">▶ Küçük 3'lü (6:5)</button>
              <button class="btn-tool" data-play-interval-harm="M6">▶ Büyük 6'lı (5:3)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>3. Yumuşak disonans (esneklik &amp; soul)</span>
              <span>9:8 · 16:9</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill peach" style="width:45%"></div></div>
            <div class="spectrum-sub">Büyük ikili ve küçük yedili esnek, hareketli bir sürtünme sunar: blues, soul R&amp;B ve cazın yedili akorlarında vazgeçilmezdir.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="M2">▶ Büyük 2'li (9:8)</button>
              <button class="btn-tool" data-play-interval-harm="m7">▶ Küçük 7'li (16:9)</button>
            </div>
          </div>

          <div class="spectrum-row">
            <div class="spectrum-head">
              <span>4. Keskin disonans (yüksek gerilim &amp; sertlik)</span>
              <span>16:15 · 15:8 · 45:32</span>
            </div>
            <div class="spectrum-bar-track"><div class="spectrum-bar-fill red" style="width:20%"></div></div>
            <div class="spectrum-sub">Küçük ikili, büyük yedili ve triton hızlı vurularla çarpışır: «Jaws» filmindeki köpekbalığı ya da toniğe doğru gerilmiş bir yeden ses gibi.</div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-interval-harm="TT">▶ Triton (45:32)</button>
              <button class="btn-tool" data-play-interval-harm="M7">▶ Büyük 7'li (15:8)</button>
              <button class="btn-tool" data-play-interval-harm="m2">▶ Küçük 2'li (16:15)</button>
            </div>
          </div>
        </div>

        <h3>2. Kulağının içinde biyolojik olarak neler oluyor?</h3>
        <ul class="article-steps-list">
          <li><strong>Kritik bant (koklea):</strong> İç kulaktaki baziler zar üzerinde frekans algılayıcıları sırayla dizilidir. İki ses Hz cinsinden yaklaşık %15–20'den daha fazla yaklaştığında aynı tüy hücrelerini eşzamanlı uyarır ve bir «pürüzlülük / sertlik» hissi doğar.</li>
          <li><strong>Pes bölge tuzağı (Lower Interval Limit):</strong> Düşük frekanslarda hertz değerleri birbirine çok yakındır! <code>Do2</code> (65 Hz) ile <code>Mi2</code> (82 Hz) arasında sadece 17 Hz vardır: normalde «yumuşak» olan büyük üçlü aynı kritik bandı doldurur ve çamurlu duyulur. Onu orta bölgeye taşı (<code>Do4 + Mi4</code>, 67 Hz fark) — anında açılır!</li>
          <li><strong>Sürtünen doğuşkanlar (Helmholtz etkisi):</strong> Her doğal nota kendinden daha tiz doğuşkanlar taşır. <code>Do4 + Si4</code> (büyük 7'li) içinde Do4'ün 2. doğuşkanı <code>Do5</code>'tir: yani <code>Si4</code>'ün yalnızca bir yarım ton üstünde!</li>
        </ul>

        <div class="k-compare-grid">
          <div class="k-compare-box is-peach">
            <h5>Dar &amp; bulanık (pes bölge)</h5>
            <p>İki perde kulağın aynı kritik bandına sıkışır:</p>
            <button class="btn-tool" data-play-freqs="65.41,82.41" data-osc="triangle" data-dur="1.8">▶ Pes büyük 3'lü (Do2+Mi2)</button>
            <button class="btn-tool" data-play-freqs="65.41,69.30" data-osc="triangle" data-dur="1.8">▶ Pes küçük 2'li (Do2+Re♭2)</button>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Açık &amp; berrak (orta bölge / geniş)</h5>
            <p>Aynı aralık yukarı taşındığında ya da açıldığında kristal gibi netleşir:</p>
            <button class="btn-tool" data-play-freqs="261.63,329.63" data-osc="triangle" data-dur="1.8">▶ Orta büyük 3'lü (Do4+Mi4)</button>
            <button class="btn-tool" data-play-freqs="130.81,554.37" data-osc="triangle" data-dur="1.8">▶ Geniş bileşik aralık (Do3+Re♭5)</button>
          </div>
        </div>

        <h3>3. Bağlamın büyüsü: sürtünmeyi ihtişama dönüştürmek</h3>
        <p>
          Bir sesin sert mi yoksa görkemli mi duyulacağı saf fizik kadar armonik çevresine de bağlıdır. Önce çıplak iki notayı, sonra aynı aralığı bir akorun içinde dinle:
        </p>

        <div class="article-highlight-box">
          <h4>Deney: Büyük yedili Do + Si (15 : 8)</h4>
          <p>Çıplak halde <strong>Do4 + Si4</strong> sertçe sürtünür. Araya Mi4 ve Sol4 eklediğinde (<strong>Cmaj7</strong>) kulağın doğuşkan desteğini algılar ve sürtünme altın gibi bir caz yumuşaklığına dönüşür.</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="isol-maj7">▶ Tek başına: Do4 + Si4</button>
            <button class="btn-tool" data-play-custom="chord-maj7">▶ Bağlamda: Cmaj7 (Do–Mi–Sol–Si)</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-song-tricks",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    badgeClass: "badge-peach",
    title: "Aralıklar için en iyi referans şarkılar",
    subtitle: "«Jaws»tan Star Wars'a, «Ali Baba'nın Çiftliği» ve The Simpsons'a",
    tag: "Pratik yöntem",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Melodik çapalar</span>
        <h2>Ünlü başlangıçlarla aralıkları tanımak</h2>
        <p class="article-lead">
          Bir atlayışı tanımanın en hızlı zihinsel yolu, onu unutulmaz bir temanın ilk iki notasıyla eşleştirmektir. İşte çıkıcı aralıklar için cep rehberin:
        </p>

        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Küçük ikili (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m2") : "m2"})</strong>
              <span>Jaws / Pembe Panter</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m2">▶ Dinle</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Büyük ikili (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M2") : "M2"})</strong>
              <span>Frère Jacques / İyi ki Doğdun (Happy Birthday)</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M2">▶ Dinle</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Küçük üçlü (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m3") : "m3"})</strong>
              <span>Seven Nation Army / Greensleeves</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="m3">▶ Dinle</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Büyük üçlü (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M3") : "M3"})</strong>
              <span>When the Saints / Morning Has Broken</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M3">▶ Dinle</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tam dörtlü (P4)</strong>
              <span>La Marseillaise / Harry Potter / Düğün Marşı</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P4">▶ Dinle</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Triton (TT)</strong>
              <span>The Simpsons («The Simp-sons») / Maria</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="TT">▶ Dinle</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tam beşli (P5)</strong>
              <span>Star Wars / Daha Dün Annemizin (Twinkle, Twinkle)</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P5">▶ Dinle</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Büyük altılı (${typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M6") : "M6"})</strong>
              <span>My Bonnie Lies Over the Ocean</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="M6">▶ Dinle</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tam sekizli / Oktav (P8)</strong>
              <span>Somewhere Over the Rainbow</span>
            </div>
            <button class="btn-tool" data-play-interval-mel="P8">▶ Dinle</button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "art-functional",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Göreceli kulak vs. mutlak kulak",
    subtitle: "Armonik işlevleri duymak neden tek tek nota adı bilmekten daha değerlidir?",
    tag: "Yöntem",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Dinleme felsefesi</span>
        <h2>İlişkiler neden mutlak frekanslardan daha önemlidir?</h2>
        <p class="article-lead">
          Çoğu zaman «müzik kulağı» denince bir fincanın çınlamasını duyup «Fa♯!» demek (<em>mutlak kulak</em>) akla gelir. Oysa canlı müzikte duyguyu doğuran şey armonik işlevdir.
        </p>

        <h3>Tek başına bir notanın duygusu yoktur</h3>
        <p>
          Aynı <strong>Mi</strong> notası <strong>Do majörde</strong> parlak, sıcak ve dingin tınlar (çünkü orada rahat bir büyük üçlü, yani <em>Mi</em> rolündedir). Birebir aynı <strong>Mi</strong> notasını <strong>Fa majör</strong> tonunda çal: bir anda yukarıya doğru yakıcı bir gerilim kazanır (çünkü artık yeden ses, yani <em>Ti</em> olmuştur!).
        </p>

        <div class="article-highlight-box">
          <h4>Anahtar deney: İki farklı rolde aynı Mi4</h4>
          <p>Aynı hedef <strong>Mi4</strong> notasını iki kez dinle: önce Do majör akorunun ardından (sakin dinginlik), sonra Fa majör akorunun ardından (acil çekim):</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="context-c">▶ Do majörde Mi4 (rahat Mi)</button>
            <button class="btn-tool" data-play-custom="context-f">▶ Fa majörde Mi4 (yeden ses Ti)</button>
          </div>
        </div>

        <p>
          İşte bu yüzden Lauscher <strong>işlevsel (göreceli) işitmeyi</strong> geliştirir: kulağın bir notanın ya da akorun ton içindeki <em>rolünü</em> tanıdığı anda bu güveni 12 tonun tamamına anında aktarabilirsin!
        </p>
      </div>
    `
  },
  {
    id: "art-world-music-cultures",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    badgeClass: "badge-lilac",
    title: "Dünyanın müzik sistemleri: 12 nota, mikrotonalite ve kültür",
    subtitle: "Batı piyanosu neden sayısız ses evreninden yalnızca biridir?",
    tag: "Dünya müzikleri & akustik",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-lilac">Kültürler, akort &amp; mikrotonalite</span>
        <h2>12 yarım tonluk ızgara bir doğa yasası değil, bir buluştur</h2>
        <p class="article-lead">
          Piyano, gitar ya da Batı popuyla büyüdüysen oktav başına 12 sabit yarım ton sana çok doğal gelir. Oysa sesli bir dünya turu bambaşka bir tablo gösterir: kimi kültürler oktavı 22 veya 53 ince basamağa böler, piyano tuşlarının arasına basar, koca orkestraları bilinçli bir dalgalanmayla akort eder ya da tek bir Batı akor yürüyüşü olmadan koskoca dramalar kurar.
        </p>

        <h3>1. Batı uzlaşması: Piyano neden «hafifçe akortsuz»dur?</h3>
        <p>
          Akustikte en saf aralıklar basit tam sayı oranlarıyla titreşir (<em>doğal / saf entonasyon</em>): saf beşli <code>3:2</code> (~701,96 sent), saf büyük üçlü ise <code>5:4</code> (386,31 sent) değerindedir. Ancak on iki saf beşliyi üst üste koyduğunda tam yedi oktav yukarıya ulaşmazsın: yaklaşık <strong>23,5 sentlik</strong> küçük bir fazlalık kalır (<em>Pisagor koması</em>). Sabit perdeli bir klavyede tek bir tonu kusursuz akort edersen uzak tonlar acı verici derecede bozuk tınlar.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Batı çözümü (~1700 → günümüz)</h5>
            <p><em>İyi tampere</em> sistemlerden sonra (Bach'ta olduğu gibi her tonun kendi rengini koruduğu dönem) Batı, <strong>12 eşit tampere sistemi (12-TET)</strong> benimsedi: her yarım ton tam <code>100 sent</code>'tir. Kulak küçük bir bedel öder (her büyük üçlü yaklaşık <strong>+14 sent</strong> tiz, her beşli <strong>−2 sent</strong> dardır), ama karşılığında 12 tonun hepsine özgürce geçilebilir ve karmaşık orkestral çokseslilik (<em>dikey</em> mimari) kurulabilir.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Pek çok başka kültürün yolu</h5>
            <p>Sabit bir dem sesi (<em>drone</em>) üzerinde ustaca örülmüş ezgi çizgisine (<em>yatay</em> mimari) odaklanan geleneklerin akorları beşliler çemberinde gezdirmeye ihtiyacı yoktur. Bu yüzden kristal gibi saf doğuşkanları korur, piyano tuşlarının arasındaki ince nüansları keşfeder ve devasa modal evrenler (<em>Makam</em>, <em>Raga</em>, <em>Destgâh</em>) kurarlar.</p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Ses karşılaştırması: Saf akor vs. tampere piyano (12-TET)</h4>
          <p>Önce akustik olarak saf majör üçlü akoru (<code>4:5:6</code>: beşli <code>3:2</code>, üçlü <code>5:4</code>), hemen ardından eşit tampere sistemdeki (12-TET) aynı Do majör akorunu dinle. Tampere üçlüdeki hafif titreşimi fark et!</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Saf akor (4:5:6)</button>
            <button class="btn-tool" data-play-freqs="261.63,329.63,392.00" data-osc="triangle" data-dur="2.0">▶ Eşit tampere 12-TET</button>
          </div>
        </div>

        <h3>2. «Mikrotonalite» gerçekte ne demektir? (sent &amp; koma)</h3>
        <p>
          Batı klavyesinin ötesindeki perdeleri ölçmek için akustik her oktavı tam <strong>1200 sent</strong>'e böler. Piyanodaki her yarım ton <code>100 sent</code>'tir, ama aradaki alan nüanslarla doludur:
        </p>

        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>Kulağın hâlâ ayırt edebildiği fark</strong>
            Orta bölgede eğitilmiş bir kulak, özellikle uzun tutulan seslerde vurular veya tını değişimleri sayesinde <strong>3–6 sent</strong> kadar küçük farkları bile algılayabilir.
          </div>
          <div class="physics-fact-item">
            <strong>Çeyrek ses &amp; üç çeyrek ses</strong>
            Gerçek bir <strong>çeyrek ses</strong> <code>50 sent</code>, nötr bir <strong>üç çeyrek ses</strong> aralığı ise <code>150 sent</code>'tir: ne neşeli majör ne hüzünlü minör, kendine özgü ışığında askıdadır.
          </div>
          <div class="physics-fact-item">
            <strong>Koma (~22–24 sent)</strong>
            Türk makam teorisi bir tam sesi <strong>9 Holder komasına</strong> (her biri ~22,6 sent) böler ve oktav başına <strong>53 komalık</strong> son derece hassas bir perde sistemi kurar!
          </div>
          <div class="physics-fact-item">
            <strong>Bir nokta değil, hareket olarak nota</strong>
            Pek çok kültürde bir ses sabit bir tuşa basmak değil; bir perde merkezi etrafında çarpmalar, kaydırmalar ve salınımlarla yaşayan bir eğridir.
          </div>
        </div>

        <h3>3. Türk, Arap ve İran dünyaları: makam, maqâm &amp; destgâh</h3>
        <p>
          Mağrip'ten Kahire'ye, Bağdat ve Tahran'dan İstanbul'a uzanan klasik gelenek akor zincirleriyle değil, incelikli ezgi yollarıyla ilerler: <strong>Makamlar</strong> (Türk), <strong>Maqâmât</strong> (Arap) veya <strong>Destgâhlar</strong> (İran, <em>Koron</em> ve <em>Sori</em> değiştiricileriyle). Sabit 7 notalı bir dizi yerine müzisyen 3–5 seslik küçük çekirdekleri — <strong>dörtlü/beşli (cins)</strong> — bir araya getirir. Her makam hem ince perde entonasyonunu, hem ezgi akışını (<em>seyir</em>: nereden başlar, nerede soluklanır, nerede karar verir) hem de içsel bir ruh halini belirler.
        </p>
        <p>
          En ünlü ses imzası <strong>nötr aralıktır</strong>; özellikle yaklaşık <strong>350 sentlik</strong> <em>nötr üçlü</em> (300 sentlik küçük üçlü ile 400 sentlik büyük üçlünün tam ortası!). Batı piyanosunda bulunmayan bu sıcak ve ışıltılı renk, <em>ud</em> ve <em>ney</em> repertuvarının kalbidir.
        </p>

        <div class="article-highlight-box">
          <h4>Mikrotonal laboratuvar: üç üçlü karşılaştırması (Rast &amp; Bayatî)</h4>
          <p>Aynı karar sesi üzerinde Batı büyük üçlüsünü (<code>400 ct</code>), nötr üçlüyü (<code>350 ct</code>) ve küçük üçlüyü (<code>300 ct</code>) karşılaştır; ardından <strong>Rast</strong> seyri ve <strong>Bayatî</strong> çeşnisini dinle:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-maqam-contrast">▶ Majör vs. nötr vs. minör</button>
            <button class="btn-tool" data-play-custom="culture-maqam-rast">▶ Rast (350 &amp; 1050 ct)</button>
            <button class="btn-tool" data-play-custom="culture-maqam-bayati">▶ Bayatî (150 ct perdesi)</button>
          </div>
        </div>

        <h3>4. Güney Asya (Hindistan &amp; Pakistan): raga, 22 şruti, tanpura &amp; tala</h3>
        <p>
          Kuzey Hindistan ve Pakistan'da paylaşılan Hindustani klasik müziğinde (<em>khyal</em> vokalinden mistik <em>kavvali</em>'ye, sitar, sarangi ve bansuri'ye kadar) tüm yapı doğuşkanlarca zengin kesintisiz bir dem halısına yaslanır: <strong>tanpura</strong> demi (genellikle karar <code>Sa</code> ve beşli <code>Pa</code>). Armoni hiç ton değiştirmediği için tampere uzlaşmasına da gerek kalmaz.
        </p>
        <ul class="article-steps-list">
          <li><strong>22 şruti (mikrotonal referans):</strong> Bir <em>raga</em> 5, 6 veya 7 ana perde (<em>svara</em>) seçse de bunların ince ayarı <strong>22 mikrotonal konumdan (şruti)</strong> alınır. Bhairav ragasındaki çok pes <code>Ati-Komal Re</code>, tampere küçük ikiliden çok daha fazla karara yaklaşır ve şafak vaktinin ağırbaşlı derinliğini yaratır.</li>
          <li><strong>Notalar arasındaki sanat (meend, andolan &amp; gamak):</strong> Sitar ve şanda süslemesiz düz bir nota çıplak kalır. Güzellik <em>meend</em> (iki perdeyi bağlayan esnek kaydırma), <em>andolan</em> (bir mikroton çevresinde yavaş salınım) ve <em>gamak</em> (güçlü süsleme vurguları) ile doğar. Notalar arasındaki yay, notaların kendisi kadar önemlidir.</li>
          <li><strong>Raga ve günün saati:</strong> Her raganın eksiksiz bir kişiliği vardır: çıkıcı (<em>aroha</em>) ve inici (<em>avaroha</em>) yürüyüşü, eksen sesi (<em>vadi</em>) ve tercih edilen vakti (<em>Bhairav</em> için şafak, <em>Darbari Kanada</em> için gece yarısı).</li>
          <li><strong>Tala (döngüsel zaman):</strong> Çizgisel ölçüler yerine <em>tabla</em> 16 vuruşluk (<em>teental</em>), 10 vuruşluk (<em>jhaptal</em>) veya 7 vuruşluk (<em>rupak</em>) kapalı döngülerde döner ve her seferinde mıknatıs gibi çeken ilk vuruşta, <strong>sam</strong>'da buluşur.</li>
        </ul>

        <div class="article-highlight-box">
          <h4>Dinleme örneği: Tanpura demi (Sa–Pa) üzerinde Raga Bhairav</h4>
          <p>Çok pes ikinci dereceye (<code>Ati-Komal Re</code>) ve sonunda <code>Sa</code> üzerindeki dinginliğe doğru gevşemeye dikkat et:</p>
          <div class="k-btn-row">
            <button class="btn-tool" data-play-custom="culture-raga-bhairav">▶ Raga Bhairav (tanpura + 22 şruti entonasyonu)</button>
          </div>
        </div>

        <h3>5. Endonezya (Cava &amp; Bali): gamelan, sléndro, pélog &amp; ombak dalgası</h3>
        <p>
          Çok az gelenek Batı alışkanlıklarımızı Cava ve Bali'nin büyük bronz <strong>gamelan</strong> orkestraları kadar sarsar. Burada evrensel bir <code>La = 440 Hz</code> standardı yoktur: <strong>her gamelan topluluğunun kendine özgü, özenle korunan bir akordu vardır</strong>; bu yüzden iki farklı topluluk genellikle birlikte çalamaz.
        </p>

        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>Sléndro: neredeyse eşit aralıklı 5 basamak</h5>
            <p>Oktavı 12 yarım tona değil, yaklaşık <code>240 sent</code> genişliğinde <strong>5 benzer aralığa</strong> böler. Saf bir sléndro'da ne Batı büyük üçlüsü ne de tam beşli/dörtlü bulunur; kulak üçlü akor reflekslerini bırakmaya zorlanır.</p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>Pélog &amp; ombak («deniz dalgası»)</h5>
            <p><strong>Pélog</strong>, zengin zıtlıklı pentatonik modların türetildiği 7 asimetrik basamak sunar. Bali'de metalofonlar çiftler halinde çalışır: biri hafifçe pes (<em>pengumbang</em>), ikizi ise yaklaşık <strong>5–8 Hz</strong> daha tiz (<em>pengisep</em>). Birlikte vurulduğunda <strong>ombak</strong> («dalga») doğar: orkestranın akustik ruhu olarak özellikle aranan, nefes alan parıltılı bir vuru.</p>
          </div>
        </div>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-gamelan-slendro">▶ Sléndro dizisi (~240 ct eşit aralıklı)</button>
          <button class="btn-tool" data-play-custom="culture-gamelan-ombak">▶ Bali ombak parıltısı (~7 Hz)</button>
        </div>

        <h3>6. Sahra Altı Afrika &amp; Doğu Asya: poliritim, blue notes ve sessizlik</h3>
        <ul class="article-steps-list">
          <li><strong>Sahra Altı Afrika: iç içe döngüler &amp; asimetri:</strong> Avrupa dikey armoniyi keşfederken Batı ve Orta Afrika baş döndürücü ritmik mimariler örer. Birden çok ses karşıt vuruşları üst üste bindirir (<strong>3'e karşı 4</strong> veya <strong>3'e karşı 2</strong>: gerçek <em>poliritim</em>) ve bunları <strong>bell timeline</strong> denen asimetrik bir kılavuz çan bir arada tutar (12/8'lik standart kalıp <code>x . x . x x . x . x . x</code> gibi). Kimse tek başına parlamaz; her şey kolektif kenetlenmeden ve <em>çağrı-yanıt (call and response)</em> diyaloğundan doğar.</li>
          <li><strong>Batı Afrika'dan blues, caz &amp; soul'a (blue notes!):</strong> Kuzey Amerika'ya zorla götürülen Afrikalı müzisyenler Batı gitarları, piyanoları ve üflemelileriyle karşılaştığında, aşağı doğru bükülen üçlü, beşli ve yedili vokal perdeleri 12-TET'in sabit kutularına sığmadı. Bu yaratıcı karşılaşma ünlü mikrotonal <strong>blue notes</strong>'u doğurdu: modern blues, gospel, caz ve rock'ın ifade kalbi.</li>
          <li><strong>Doğu Asya: tını, parmak basıncı &amp; «Ma» sanatı:</strong> Çin (yüzlerce çekiş ve kaydırma tekniğiyle <em>guqin</em> zither'i) ve Japon (<em>shakuhachi</em> flütü) klasik müzikleri çoğu zaman pentatonik yapılara yaslanır; ancak asıl sonsuz evreni mikrotonal bükülmelerde, nefesin dokusunda ve <strong>Ma (間)</strong> zaman kavramında kurar: iki ses arasındaki, notanın kendisi kadar anlamlı, titreşen sessizlik.</li>
        </ul>

        <div class="k-btn-row">
          <button class="btn-tool" data-play-custom="culture-westafrica-poly">▶ 12/8 çan kalıbı + 4'e karşı 3 poliritim</button>
        </div>

        <h3>7. Dört küresel karşılaştırma ekseni — ve kulağının kazancı</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>1. Dizi &amp; akort</strong>
              <span>Batı: 100 sentlik 12 sabit adım (12-TET). Dünya: 5 sesli sléndro (~240 ct), 22 şruti, 53 komalı makam veya akışkan vokal merkezleri.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>2. Dikey vs. yatay</strong>
              <span>Batı, akor yürüyüşleriyle hikâye anlatır. Makam ve raga ise sabit bir merkez üzerinde ince mikrotonal çizgiler yontar.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>3. Ses ideali</strong>
              <span>Pürüzsüz kaynaşma karşısında okyanus dalgalanması (<em>ombak</em>), sitar köprüsünün vızıltılı zenginliği (<em>jawari</em>) veya bambunun nefesli tınısı.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>4. Zaman algısı</strong>
              <span>3/4 veya 4/4'lük çizgisel ölçüler karşısında kapalı döngüler (<em>tala</em>), asimetrik 12/8 çan kalıpları veya sessizliğin nefesi (<em>Ma</em>).</span>
            </div>
          </div>
        </div>

        <div class="k-song-ref">
          <strong>Dinleyişinin kazancı:</strong> Her kültür farklı bir işitsel süper güç geliştirir. Batı armonisi akor işlevlerini keskinleştirir; makam ve raga <strong>mikrotonal radarını</strong> ve şanda ya da perdesiz çalgılarda entonasyonunu inceltir; gamelan ve Afrika poliritmi seni katı saymadan kurtarıp ritmi tüm bedenine yerleştirir. Lauscher'da aralık çalışmak, <em>etiket ezberlemek yerine yaşayan ilişkileri duymak</em> demektir: tüm dünya müziklerinin evrensel anahtarı.
        </div>
      </div>
    `
  },
  {
    id: "art-mnemonics",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1.1 2h5.8c.1-.8.5-1.5 1.1-2A7 7 0 0 0 12 2z"/></svg>`,
    badgeClass: "badge-peach",
    title: "Müzikte hafıza ipuçları",
    subtitle: "Donanım, anahtarlar, boş teller, aralıklar ve ritim için klasik kolaylaştırıcılar",
    tag: "İpuçları & hafıza",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">İpuçları &amp; hafıza</span>
        <h2>Hafıza ipuçları: müzik teorisini zorlanmadan akılda tutmak</h2>
        <p class="article-lead">
          Neden bir tekerlemeyi ya da komik bir imgeyi on saniyede hatırlarız da soyut bir liste beş dakikada uçup gider? Hafızamız <strong>kelime ritmini, hikâyeleri ve görsel dayanakları</strong> sever. İşte Türkçede solfej ve müzik teorisinin temel hafıza ipuçları.
        </p>

        <h3>1. Diyez ve bemol sırası ile donanımı anında okumak</h3>
        <p>
          Solfejde yedi diyezin ve yedi bemolün sırası birbirinin tam ayna görüntüsü olan iki ritmik kalıp gibi öğrenilir:
        </p>
        <div class="k-compare-grid">
          <div class="k-compare-box is-sage">
            <h5>7 diyezin (♯) sırası: Fa – Do – Sol – Re – La – Mi – Si</h5>
            <p>
              İki ritmik grup halinde ezberlenir:<br>
              <strong>«Fa – Do – Sol / Re – La – Mi – Si»</strong><br>
              Do'dan (0) başlayarak saat yönünde majör tonlar: <strong>Sol</strong> (1♯), <strong>Re</strong> (2♯), <strong>La</strong> (3♯), <strong>Mi</strong> (4♯), <strong>Si</strong> (5♯), <strong>Fa♯</strong> (6♯).
            </p>
          </div>
          <div class="k-compare-box is-peach">
            <h5>7 bemolün (♭) sırası: Si – Mi – La – Re – Sol – Do – Fa</h5>
            <p>
              Diyez sırasının <strong>tam tersidir</strong>:<br>
              <strong>«Si – Mi – La – Re / Sol – Do – Fa»</strong><br>
              (İpucu: <em>«<strong>Fa</strong>, <strong>Do</strong>, <strong>Sol</strong>, <strong>Re</strong>…»</em> sırasını tersten oku).<br>
              Majör tonlar: <strong>Fa</strong> (1♭), <strong>Si♭</strong> (2♭), <strong>Mi♭</strong> (3♭), <strong>La♭</strong> (4♭), <strong>Re♭</strong> (5♭), <strong>Sol♭</strong> (6♭).
            </p>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Donanımdan majör tonu bulmanın iki şaşmaz yolu</h4>
          <ul class="article-steps-list">
            <li><strong>Diyezlerde (♯):</strong> <em>Son diyez</em> her zaman <strong>yeden sestir (7. derece)</strong>. Sadece <strong>bir yarım ton</strong> yukarı çık, majör tonu buldun! (Örnek: son diyez = <em>Do♯</em> → bir yarım ton üstü = <strong>Re majör</strong>).</li>
            <li><strong>Bemollerde (♭):</strong> <em>Sondan bir önceki bemol</em> doğrudan majör tonun adını verir! (Örnek: 3 bemol = Si♭, <strong>Mi♭</strong>, La♭ → <strong>Mi♭ majör</strong>. Sadece 1♭ = <strong>Fa majör</strong> ayrıca akılda tutulur).</li>
            <li><strong>İlgili minörü bulmak:</strong> Majör tonikten <strong>bir küçük üçlü (3 yarım ton)</strong> aşağı in (Do majör → La minör, Sol majör → Mi minör).</li>
          </ul>
          <button class="btn-tool" data-jump-ref="circle-of-fifths">→ Etkileşimli Beşliler Çemberini aç</button>
        </div>

        <h3>2. Dizek üzerindeki dayanak noktaları: Sol, Fa ve Do anahtarları</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Sol anahtarı (2. çizgi) • Aralıklar ve çizgiler</strong>
              <span>• Anahtarın ortasındaki kıvrım 2. çizgiyi sarar: <strong>Sol4</strong>.<br>• Alttan üste 4 aralık: <strong>Fa – La – Do – Mi</strong> (uluslararası harflerle <strong>«FACE»</strong>: F–A–C–E).<br>• Alttan üste 5 çizgi (üçlüler halinde): <strong>Mi – Sol – Si – Re – Fa</strong>.</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Fa anahtarı (4. çizgi) • Üçlü kaydırma kısayolu</strong>
              <span>• İki nokta 4. çizgiyi çerçeveler: <strong>Fa3</strong>.<br>• <strong>Okuma kısayolu:</strong> Fa anahtarındaki her nota, Sol anahtarındaki aynı konumdan <strong>iki nota adı (bir üçlü) yukarıda</strong> okunur (ör. Sol anahtarında <em>Do</em> duran yer, Fa anahtarında <em>Mi</em> olur).</span>
            </div>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Alto / Do anahtarı (3. çizgi) • Ortadaki Do</strong>
              <span>Anahtarın tam orta ucu 3. (en orta) çizgiyi işaret eder = <strong>Do4 (orta Do)</strong>.</span>
            </div>
          </div>
        </div>

        <h3>3. Boş teller: gitar, bas, keman, viyola, çello &amp; ukulele</h3>
        <p>
          En pes (kalın) telden en tiz (ince) tele doğru:
        </p>
        <ul class="article-steps-list">
          <li><strong>Gitar (6 tel: Mi – La – Re – Sol – Si – Mi / E – A – D – G – B – E):</strong> <em>«<strong>M</strong>avi <strong>L</strong>aleler <strong>R</strong>üzgârda <strong>S</strong>allanır <strong>S</strong>essiz <strong>M</strong>evsimde»</em> (ya da uluslararası harflerle: <em>«<strong>E</strong>ddie <strong>A</strong>te <strong>D</strong>ynamite, <strong>G</strong>ood <strong>B</strong>ye <strong>E</strong>ddie»</em>).</li>
          <li><strong>Bas gitar &amp; kontrbas (4 tel: Mi – La – Re – Sol):</strong> Gitarın en pes dört teli, tam dörtlü aralıklarla akortlu.</li>
          <li><strong>Keman (4 tel: Sol – Re – La – Mi):</strong> Çıkıcı dört tam beşli (Fa ve Do'dan sonraki diyez sırası gibi!).</li>
          <li><strong>Viyola &amp; çello (4 tel: Do – Sol – Re – La):</strong> Do'dan başlayarak çıkıcı dört tam beşli.</li>
          <li><strong>Ukulele (Sol – Do – Mi – La / G – C – E – A):</strong> 4. teli (Sol) tiz olan standart Do akordu.</li>
        </ul>

        <h3>4. Aralıkları kulaktan tanımak için referans şarkılar</h3>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>Küçük ikili (1 yt) &amp; büyük ikili (2 yt)</strong>
              <span>• <strong>Küçük 2'li:</strong> Çıkıcı <em>Jaws</em> / inici <em>Für Elise</em>.<br>• <strong>Büyük 2'li:</strong> <em>Frère Jacques</em> (ilk iki nota: Do–Re) veya <em>İyi ki Doğdun</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="1">▶ Küçük 2'li</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Küçük üçlü (3 yt) &amp; büyük üçlü (4 yt)</strong>
              <span>• <strong>Küçük 3'lü:</strong> Çıkıcı <em>Greensleeves</em> veya <em>Brahms Ninnisi</em> / inici <em>Guguk kuşu</em> veya <em>Hey Jude</em>.<br>• <strong>Büyük 3'lü:</strong> Çıkıcı <em>Oh When the Saints</em> / inici <em>Summertime</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="4">▶ Büyük 3'lü</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tam dörtlü (5 yt) &amp; triton (6 yt)</strong>
              <span>• <strong>Tam 4'lü:</strong> <em>La Marseillaise</em> veya <em>Düğün Marşı</em>.<br>• <strong>Triton (Artık 4'lü / Eksik 5'li):</strong> <em>The Simpsons</em> veya <em>Maria (West Side Story)</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="6">▶ Triton</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>Tam beşli (7 yt), büyük altılı (9 yt) &amp; oktav (12 yt)</strong>
              <span>• <strong>Tam 5'li:</strong> <em>Star Wars</em> veya <em>Daha Dün Annemizin (Do → Sol)</em>.<br>• <strong>Büyük 6'lı:</strong> <em>My Bonnie Lies Over the Ocean</em>.<br>• <strong>Oktav:</strong> <em>Somewhere Over the Rainbow</em>.</span>
            </div>
            <button class="btn-tool" data-play-int-asc="7">▶ Beşli</button>
          </div>
        </div>

        <h3>5. Modlar, üçlü akorlar &amp; ritim heceleri</h3>
        <div class="k-compare-grid">
          <div class="k-compare-box is-lilac">
            <h5>7 mod ve karakteristik notaları</h5>
            <p>
              <strong>Do'dan Si'ye</strong> beyaz tuşlar üzerinde:<br>
              <strong>İyonik (Do) – Doryen (Re) – Frigyen (Mi) – Lidyen (Fa) – Miksolidyen (Sol) – Eolyen (La) – Lokriyen (Si)</strong>.<br>
              <strong>Anında işitsel ipuçları:</strong><br>
              • Majör + parlak <strong>#4</strong> = <strong>Lidyen</strong><br>
              • Majör + blues/rock <strong>b7</strong> = <strong>Miksolidyen</strong><br>
              • Minör + açık <strong>♮6</strong> = <strong>Doryen</strong><br>
              • Minör + flamenko <strong>b2</strong> = <strong>Frigyen</strong>
            </p>
          </div>
          <div class="k-compare-box is-sage">
            <h5>Ritim kelimeleri &amp; akor formülleri</h5>
            <p>
              <strong>Saymadan önce ritmi söyle:</strong><br>
              • Dörtlük (♩): <em>«Van»</em> / <em>«Ta»</em><br>
              • İki sekizlik (♪♪): <em>«İz-mir»</em> / <em>«Ti-ti»</em><br>
              • Üçleme (vuruşta 3): <em>«An-ka-ra»</em> / <em>«Tri-o-la»</em><br>
              • Dört onaltılık (vuruşta 4): <em>«Ge-li-bo-lu»</em><br>
              <strong>Üçlü akor tarifi (yarım ton):</strong><br>
              • <strong>Majör = 4 + 3</strong> • <strong>Minör = 3 + 4</strong><br>
              • <strong>Eksik = 3 + 3</strong> • <strong>Artık = 4 + 4</strong>
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
    title: "Nashville Sayı Sistemi",
    subtitle: "Akor adları yerine rakamlar kullanarak saniyeler içinde transpoze etmek",
    tag: "Stüdyo & pratik",
    render: () => `
      <div class="article-body">
        <span class="k-card-tag tag-peach">Stüdyo pratiği ve armoni</span>
        <h2>Nashville Sayı Sistemi (NNS)</h2>
        <p class="article-lead">
          Bir kayıt seansı hayal et: beş müzisyen bir şarkıyı ilk kez dinliyor, üç dakikada kâğıda <strong>1 – 5 – 6- – 4</strong> gibi rakamlar karalıyor ve solist <em>«Bir tam ton aşağı alalım!»</em> dediğinde kimse tek bir rakamı bile değiştirmiyor. İşte <strong>Nashville Sayı Sistemi</strong> tam bunun için doğdu.
        </p>

        <h3>1. Bu sistem nasıl doğdu?</h3>
        <p>
          Kökleri <strong>1950'lerin sonundaki Nashville'e</strong>, efsanevi <em>Music Row</em> stüdyolarına uzanır:
        </p>
        <ul class="article-steps-list">
          <li>
            <strong>Neal Matthews Jr. ve The Jordanaires (50'lerin sonu):</strong> Elvis Presley ve country yıldızlarının vokal grubu olarak her gün vokal düzenlemelerini farklı şarkıcılara ve tonlara uyarlıyorlardı. Neal Matthews sabit harfler yerine akorları dizi derecelerinin rakamlarıyla not etmeye başladı.
          </li>
          <li>
            <strong>Charlie McCoy ve stüdyolar (60'lar):</strong> Çok enstrümanlı müzisyen <strong>Charlie McCoy</strong> bu fikri alıp tüm ritim bölümüne (gitar, bas, piyano, davul) uyarladı. Efsanevi <em>Nashville A-Team</em> 3 saatlik seanslarda önceden yazılmış nota olmadan art arda üç dört parça kaydediyordu.
          </li>
          <li>
            <strong>Stüdyo şifresinden dünya standardına:</strong> 12 tonun hepsinde anında çalıştığı için bugün tüm dünyada pop, rock, gospel ve canlı sahne gruplarında kullanılıyor.
          </li>
        </ul>

        <h3>2. Nasıl çalışır?</h3>
        <p>
          Sabit akor adları yerine <strong>majör dizinin 7 derecesini</strong> <strong>1'den 7'ye</strong> kadar numaralandırır ve tonu sayfanın tepesine tek bir kez yazarsın (örneğin <strong>Key: G</strong>):
        </p>
        <div class="song-cheat-grid">
          <div class="song-cheat-row">
            <div>
              <strong>1 · 4 · 5 — Üç majör akor (Tonik, Subdominant, Dominant)</strong>
              <span>Ek sembol gerekmez: Do majörde bunlar <strong>C (1)</strong>, <strong>F (4)</strong> ve <strong>G (5)</strong>'tir.</span>
            </div>
            <button class="btn-tool" data-play-progression="I,IV,I,V">▶ 1 – 4 – 1 – 5</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>2- · 3- · 6- — Üç minör akor</strong>
              <span>Bir tire (<strong>-</strong>) veya <strong>m</strong> minör gösterir: Do majörde <strong>Dm (2-)</strong>, <strong>Em (3-)</strong> ve <strong>Am (6-)</strong>.</span>
            </div>
            <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ 1 – 5 – 6- – 4</button>
          </div>
          <div class="song-cheat-row">
            <div>
              <strong>7° — Eksik derece (veya 5/7)</strong>
              <span>7. derece eksiktir (Do tonunda <strong>B°</strong>), ama pop ve country'de çoğu zaman <strong>5/7</strong> (G/B) çevrimiyle değiştirilir.</span>
            </div>
          </div>
        </div>

        <div class="article-highlight-box">
          <h4>Roma rakamlarından farkı (I – V – vi – IV)</h4>
          <p>
            Armonik olarak birebir aynı anlama gelirler. Arap rakamlarını elle yazmak daha hızlıdır ve loş sahne ışığında nota sehpasından hatasız okunur (kimse <code>4</code> ile <code>6-</code>'yı karıştırmaz, oysa <code>iv</code> ile <code>vi</code> birbirine çok benzer).
          </p>
        </div>

        <h3>3. Bir chart'ın temel sembolleri (stüdyo kısaltmaları)</h3>
        <div class="nns-legend-grid">
          <div class="nns-legend-item">
            <span class="nns-legend-sym">2- / 6-</span>
            <span class="nns-legend-desc">Tire (veya m) = minör akor</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym">1/3</span>
            <span class="nns-legend-desc">Eğik çizgi = başka bas üzerinde akor</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym nns-legend-underline">4 &nbsp; 5</span>
            <span class="nns-legend-desc">Altı çizili = tek ölçüde 2 akor (Split Bar)</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym">1◇</span>
            <span class="nns-legend-desc">Baklava = tek kez vur ve tınlamaya bırak</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym">7°</span>
            <span class="nns-legend-desc">Küçük daire = eksik üçlü akor</span>
          </div>
          <div class="nns-legend-item">
            <span class="nns-legend-sym">^ / &lt;</span>
            <span class="nns-legend-desc">Push = erken giriş (senkop)</span>
          </div>
        </div>
        <ul class="article-steps-list">
          <li><strong>1 rakam = 1 tam ölçü:</strong> Her rakam genellikle 4 vuruş sürer.</li>
          <li><strong>Minör parçalar:</strong> Pek çok stüdyo müzisyeni aynı kalıpları korumak için bunları ilgili majörden (<strong>6-</strong> ile başlayarak) yazar.</li>
        </ul>

        <h3>4. Stüdyo renkleri ve eğik çizgili (Slash) akorlar</h3>
        <p>
          7 diyatonik derecenin ötesinde bu altı çözüm stüdyoda her gün karşımıza çıkar (<strong>Do majör</strong> örnekleri):
        </p>
        <div class="song-cheat-grid">
          <div class="song-cheat-row"><div><strong>1/3 (C/E) — Birinci çevrim</strong><span>Yükselen bir bas çizgisiyle <strong>1 → 1/3 → 4</strong> (C → C/E → F) akışını pürüzsüzce bağlar.</span></div></div>
          <div class="song-cheat-row"><div><strong>4/5 (F/G) — Gospel / pop askısı</strong><span><strong>1</strong>'e çözülmeden önce sıcak, askıda bir gerilim yaratır.</span></div></div>
          <div class="song-cheat-row"><div><strong>5/7 (G/B) — 1'e giden yeden bas</strong><span><strong>1 → 5/7 → 6-</strong> gibi klasik inişlerde çoğu zaman 7° yerine kullanılır.</span></div></div>
          <div class="song-cheat-row"><div><strong>♭7 (B♭) — Rock ve country rengi</strong><span>Klasik miksolidyen ödünçleme (<strong>1 – ♭7 – 4 – 1</strong>).</span></div></div>
          <div class="song-cheat-row"><div><strong>4- (Fm) — Minör subdominant</strong><span><strong>4 → 4- → 1</strong> geçişi anında melankolik bir nüans katar.</span></div></div>
          <div class="song-cheat-row"><div><strong>2 (D majör) — İkincil dominant → 5</strong><span>Tiresiz majör 2, doğrudan <strong>5</strong>'e doğru iter (D → G → C).</span></div></div>
        </div>

        <div class="article-highlight-box">
          <h4>Etkileşimli şemada canlı dene</h4>
          <p>
            12 tonun hepsini keşfetmek ve her dereceyi dinlemek için <strong>Nashville Sayı Sistemi aracını</strong> aç; ya da gerçek ton, perde ve akor şekillerini dönüştürmek için özel <strong>Kapo Çeviriciyi</strong> kullan:
          </p>
          <button class="btn-tool" type="button" data-open-nashville-tool="1">▶ Nashville aracını aç</button>
          <button class="btn-tool" type="button" data-open-capo-tool="1">▶ Kapo çeviriciyi aç</button>
        </div>
      </div>
    `
  }
];

const PHYSICS_WAVE_EXPLANATIONS_TR = {
  "2,1": "<strong>Oktav (2 : 1):</strong> 2 uzun yeşil dalganın içine tam olarak <strong>yarı uzunlukta 4 turuncu dalga</strong> sığar. 3. izde bileşik desen her kesikli çizgide birebir tekrarlanır: oktavın neredeyse tek bir ses gibi kaynaşmasının sebebi budur.",
  "3,2": "<strong>Tam beşli (3 : 2):</strong> Kök ses 2 uzun yeşil dalga çizerken tiz ses tam olarak <strong>3 turuncu dalga</strong> çizer. Her 2 dalgada bir tertemiz çakışırlar: kararlı, açık ve güçlü.",
  "4,3": "<strong>Tam dörtlü (4 : 3):</strong> 3 yeşil dalga tam olarak 4 turuncu dalgayla buluşur, ardından tüm desen sıfırdan eşzamanlı olarak yeniden başlar.",
  "5,4": "<strong>Büyük üçlü (5 : 4):</strong> 4 yeşil döngü 5 turuncu döngüyle kesişir. 3. izde yumuşak ve yuvarlak bir eğri oluşur: majör akorların sıcaklığı buradan gelir.",
  "6,5": "<strong>Küçük üçlü (6 : 5):</strong> 5 yeşil dalgaya karşılık 6 turuncu dalga: büyük üçlüden biraz daha sıkıdır; bu hafif dalga hareketi minöre duygusal rengini verir.",
  "5,3": "<strong>Büyük altılı (5 : 3):</strong> 1,67 : 1 oranı, küçük üçlünün çevrimi. Geniş, şarkısal ve hoşça dingin.",
  "45,32": "<strong>Triton (45 : 32):</strong> Turuncu tepeler yeşil ızgarayla hizalanmayı reddeder. 3. ize bak: gerilim yüklü testere dişi gibi bir eğri!",
  "16,15": "<strong>Küçük ikili (16 : 15):</strong> İki dalga neredeyse aynı hızdadır ama yavaşça fazdan çıkarak 3. izde bir şişip bir incelen o kabarmaları (vuruyu) oluşturur."
};

const PHYSICS_OVERTONES_TR = [
  { num: 1,  note: "Do2",       ratio: "1× · Kök ses",     freq: 65.41,  special: false },
  { num: 2,  note: "Do3",       ratio: "2× · Oktav",       freq: 130.82, special: false },
  { num: 3,  note: "Sol3",      ratio: "3× · Tam beşli",   freq: 196.23, special: false },
  { num: 4,  note: "Do4",       ratio: "4× · 2. oktav",    freq: 261.64, special: false },
  { num: 5,  note: "Mi4",       ratio: "5× · Büyük 3'lü",  freq: 327.05, special: false },
  { num: 6,  note: "Sol4",      ratio: "6× · Tam beşli",   freq: 392.46, special: false },
  { num: 7,  note: "~Si♭4*",    ratio: "7× · Doğal 7'li",  freq: 457.87, special: true },
  { num: 8,  note: "Do5",       ratio: "8× · 3. oktav",    freq: 523.28, special: false },
  { num: 9,  note: "Re5",       ratio: "9× · Büyük 2'li",  freq: 588.69, special: false },
  { num: 10, note: "Mi5",       ratio: "10× · Büyük 3'lü", freq: 654.10, special: false },
  { num: 11, note: "~Fa5/Fa♯*", ratio: "11× · Alp Fa'sı",  freq: 719.51, special: true },
  { num: 12, note: "Sol5",      ratio: "12× · Tam beşli",  freq: 784.92, special: false }
];

function renderPhysicsReferenceHTML_TR() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Ses nasıl doğar?</span>
        <span class="k-ratio-chip">yaklaşık 343 m/s</span>
      </div>
      <h4>Titreşen havadan sinüs eğrisine</h4>
      <p>
        Bir gitar teline dokun ya da bir nota mırıldan: bir şey çok hızlı biçimde ileri geri titreşir. Bu titreme yakındaki hava moleküllerini iter ve saniyede yaklaşık <strong>343 metre</strong> (saatte 1200 km'nin üzerinde!) hızla bir basınç dalgası gönderir. Kulağına ulaştığında kulak zarın aynı ritimde titreşir ve beynin bunu müziğe çevirir.
      </p>
      <p>
        Hiç sarsılmadan ileri geri sallanan bir salıncak hayal et: bu düzenli hareketi zaman içinde çizersen bir <strong>sinüs dalgası</strong> elde edersin. Sesin en temel yapı taşıdır: <strong>çevresinde başka hiçbir şey olmayan saf bir tek frekans</strong>. Gerçek çalgılar ise aynı anda birden fazla titreşimi karıştırdığı için çok daha girintili çıkıntılı dalgalar çizer.
      </p>

      <div class="wave-compare-visual">
        <div class="wave-compare-card">
          <strong>Saf sinüs dalgası (1 frekans)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 29.0 L9.5 25.0 L12.9 21.3 L16.4 17.8 L19.9 14.9 L23.3 12.5 L26.8 10.9 L30.3 10.1 L33.7 10.1 L37.2 10.9 L40.7 12.5 L44.1 14.9 L47.6 17.8 L51.1 21.3 L54.5 25.0 L58.0 29.0 L61.5 33.0 L64.9 36.7 L68.4 40.2 L71.9 43.1 L75.3 45.5 L78.8 47.1 L82.3 47.9 L85.7 47.9 L89.2 47.1 L92.7 45.5 L96.1 43.1 L99.6 40.2 L103.1 36.7 L106.5 33.0 L110.0 29.0 L113.5 25.0 L116.9 21.3 L120.4 17.8 L123.9 14.9 L127.3 12.5 L130.8 10.9 L134.3 10.1 L137.7 10.1 L141.2 10.9 L144.7 12.5 L148.1 14.9 L151.6 17.8 L155.1 21.3 L158.5 25.0 L162.0 29.0 L165.5 33.0 L168.9 36.7 L172.4 40.2 L175.9 43.1 L179.3 45.5 L182.8 47.1 L186.3 47.9 L189.7 47.9 L193.2 47.1 L196.7 45.5 L200.1 43.1 L203.6 40.2 L207.1 36.7 L210.5 33.0 L214.0 29.0" fill="none" stroke="var(--sage-strong)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Keskin köşesiz, yuvarlak S eğrisi: bir diyapazon ya da yumuşak bir ıslık gibi pürüzsüz ve nötr duyulur.</span>
        </div>
        <div class="wave-compare-card">
          <strong>Gerçek ses (kök ses + doğuşkanlar)</strong>
          <svg class="wave-compare-svg" viewBox="0 0 220 58" aria-hidden="true">
            <line x1="6" y1="29" x2="214" y2="29" stroke="var(--border-soft)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M6.0 26.9 L9.5 17.6 L12.9 11.3 L16.4 9.3 L19.9 11.2 L23.3 15.4 L26.8 19.5 L30.3 22.3 L33.7 23.3 L37.2 23.3 L40.7 23.4 L44.1 23.9 L47.6 24.9 L51.1 25.9 L54.5 26.5 L58.0 26.9 L61.5 27.7 L64.9 29.3 L68.4 31.8 L71.9 34.5 L75.3 36.8 L78.8 38.1 L82.3 38.8 L85.7 39.9 L89.2 41.9 L92.7 44.7 L96.1 47.2 L99.6 47.4 L103.1 43.9 L106.5 36.5 L110.0 26.9 L113.5 17.6 L116.9 11.3 L120.4 9.3 L123.9 11.2 L127.3 15.4 L130.8 19.5 L134.3 22.3 L137.7 23.3 L141.2 23.3 L144.7 23.4 L148.1 23.9 L151.6 24.9 L155.1 25.9 L158.5 26.5 L162.0 26.9 L165.5 27.7 L168.9 29.3 L172.4 31.8 L175.9 34.5 L179.3 36.8 L182.8 38.1 L186.3 38.8 L189.7 39.9 L193.2 41.9 L196.7 44.7 L200.1 47.2 L203.6 47.4 L207.1 43.9 L210.5 36.5 L214.0 26.9" fill="none" stroke="var(--peach-strong)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Birden çok sinüs dalgası üst üste eklenir. O tepeler ve çukurlar her çalgıya kendi kişiliğini verir.</span>
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Hertz (Hz) = hız</strong>
          <span><code>65 Hz</code> (pes <code>Do2</code>) saniyede 65 kez titreşir: odada <strong>5,24 metre</strong> uzunluğunda bir dalga! <code>440 Hz</code> (<code>La4</code>) ise yalnızca <strong>78 cm</strong>'dir.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Oktav = iki kat hız</strong>
          <span>Kulağın oranlarla düşünür: <code>220 → 440 Hz</code> (+220 Hz) ve <code>440 → 880 Hz</code> (+440 Hz) atlayışları birebir aynı hissi verir: 2:1!</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Genlik = ses şiddeti</strong>
          <span>Hareketin genişliği (desibel, dB cinsinden) sesi daha yüksek ya da daha alçak yapar, ama notanın perdesini asla değiştirmez.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Dalga biçimi = tını</strong>
          <span>Pürüzsüz dalga = flüt gibi yumuşak ses. Testere dişli dalga = trompet ya da distorsiyonlu gitar gibi keskin ses.</span>
        </div>
      </div>

      <div class="k-meta-box">
        <strong>Dene: Do4 (261,6 Hz) üzerinde oktav atlayışları &amp; dalga biçimleri:</strong>
        <div class="k-btn-row" style="margin-top:0.35rem;">
          <button class="btn-tool" data-play-freqs="220,440,880" data-seq-step="650" data-osc="triangle" data-dur="0.75">▶ 220 → 440 → 880 Hz</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sine" data-dur="1.4">▶ Saf sinüs</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="triangle" data-dur="1.4">▶ Üçgen (daha yumuşak)</button>
          <button class="btn-tool" data-play-freqs="261.63" data-osc="sawtooth" data-dur="1.4">▶ Testere dişi (keskin)</button>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. Frekans spektrumu</span>
        <span class="k-ratio-chip">20 Hz – 20 kHz</span>
      </div>
      <h4>Sesin parmak izi: Bir notanın içinde neler saklı?</h4>
      <p>
        Bir piyano ile bir gitar birebir aynı <code>Do4</code> notasını çaldığında, temel frekansları aynı olmasına rağmen ikisini anında ayırt edersin! Sır <strong>frekans spektrumunda</strong> yatar: her gerçek ses aslında birlikte tınlayan bir sinüs dalgaları ekibidir.
      </p>
      <p>
        Bir spektrum (EQ analizörü gibi), röntgen misali hangi frekansların ne kadar yüksek çaldığını gösterir: en solda kök ses (<code>1×</code>), sağa doğru ise daha hızlı doğuşkanları (<code>2×</code>'ten <code>10×</code>'a kadar) yer alır. Tarifini görmek ve duymak için bir ses seç:
      </p>

      <div class="freq-spec-box">
        <div class="k-btn-row">
          <button class="k-filter-pill active" data-spec-preset="sine" data-play-freqs="261.63" data-osc="sine" data-dur="1.4" data-spec-desc="<strong>Saf sinüs:</strong> 1× üzerinde tek bir çubuk, sıfır doğuşkan. Rengini değiştiren tiz frekanslar olmadan çok pürüzsüz, neredeyse nötr bir ses.">▶ Sinüs (Do4)</button>
          <button class="k-filter-pill" data-spec-preset="piano" data-play-inst data-style="piano" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Piyano (örnek):</strong> Güçlü kök ses ve yukarı doğru yumuşakça sönen dolgun ilk doğuşkanlar: o sıcak yuvarlaklık buradan gelir.">▶ Piyano (Do4 örneği)</button>
          <button class="k-filter-pill" data-spec-preset="guitar" data-play-inst data-style="guitar" data-notes="C4" data-dur="1.5" data-spec-desc="<strong>Gitar (örnek):</strong> Çekilen tel spektrumun orta ve üst-orta bölgesine çok daha fazla enerji yükler: atağa keskinlik ve parlaklık veren budur.">▶ Gitar (Do4 örneği)</button>
          <button class="k-filter-pill" data-spec-preset="strings" data-play-inst data-style="strings" data-notes="C4" data-dur="1.6" data-spec-desc="<strong>Yaylılar (örnek):</strong> Yay tiz doğuşkanları da (6×–10×) kesintisiz besler ve mikste kolayca öne çıkan o ipeksi dokuyu kazandırır.">▶ Yaylılar (Do4 örneği)</button>
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
          <strong>Saf sinüs:</strong> 1× üzerinde tek bir çubuk, sıfır doğuşkan. Rengini değiştiren tiz frekanslar olmadan çok pürüzsüz, neredeyse nötr bir ses.
        </div>
      </div>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>Sub-bas &amp; bas (20 – 250 Hz)</strong>
          <span>Kick, bas gitar, temel yapı. Çoğu zaman ayırt etmeden önce göğsünde hissettiğin kadar uzun dalgalar.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Orta &amp; gövde (250 Hz – 2 kHz)</strong>
          <span>Vokal, piyano gövdesi, gitar akorları. Burada fazla enerji birikirse ses hemen «boğuk» duyulur.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Varlık &amp; atak (2 – 6 kHz)</strong>
          <span>Ünsüzler («S», «T»), pena vuruşu ve netlik. Kulağın en hassas olduğu bölge.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>Hava &amp; parlaklık (6 – 20 kHz)</strong>
          <span>Zillerin ışıltısı, ince nefes dokusu ve insan işitme sınırına kadar uzanan ipeksi ayrıntılar.</span>
        </div>
      </div>
    </article>

    <div class="wave-lab-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">3. Etkileşimli dalga laboratuvarı</span>
        <button id="toggleWavePauseBtn" class="k-ratio-btn">⏸ Duraklat</button>
      </div>
      <h4>İki dalganın nasıl kaynaştığını canlı izle</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-mid); line-height:1.4;">
        Kesikli çizgiler <strong>kök sesin (yeşil) 1 tam döngüsünü</strong> işaretler. Altında <strong>2. nota (turuncu)</strong> titreşir; en alttaki 3. iz ise kulak zarına gerçekten ulaşan <strong>bileşik dalgayı</strong> gösterir.
      </p>
      <div class="wave-canvas-wrap">
        <canvas id="waveCanvas" class="wave-canvas" width="540" height="195"></canvas>
        <div id="waveExplainBanner" class="wave-explain-banner">
          ${PHYSICS_WAVE_EXPLANATIONS_TR["2,1"]}
        </div>
      </div>
      <div class="k-btn-row">
        <button class="k-filter-pill active" data-wave-ratio="2,1" data-wave-semi="12">Oktav (2:1)</button>
        <button class="k-filter-pill" data-wave-ratio="3,2" data-wave-semi="7">Beşli (3:2)</button>
        <button class="k-filter-pill" data-wave-ratio="4,3" data-wave-semi="5">Dörtlü (4:3)</button>
        <button class="k-filter-pill" data-wave-ratio="5,4" data-wave-semi="4">Büyük 3'lü (5:4)</button>
        <button class="k-filter-pill" data-wave-ratio="6,5" data-wave-semi="3">Küçük 3'lü (6:5)</button>
        <button class="k-filter-pill" data-wave-ratio="5,3" data-wave-semi="9">Büyük 6'lı (5:3)</button>
        <button class="k-filter-pill" data-wave-ratio="45,32" data-wave-semi="6">Triton (45:32)</button>
        <button class="k-filter-pill" data-wave-ratio="16,15" data-wave-semi="1">Küçük 2'li (16:15)</button>
      </div>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">4. Doğanın gizli dizisi</span>
        <span class="k-ratio-chip">Kök sesin 1× – 12× katı</span>
      </div>
      <h4>Duran dalgalar &amp; doğuşkanlar serisi (1.–12.)</h4>
      <p>
        İki ucundan sabitlenmiş bir teli çek: uçlar sabit kaldığı için tel hem bir bütün olarak titreşir HEM DE aynı anda yarıya (2× hızlı), üçte bire (3×), dörtte bire (4×) bölünür… Tek bir nota doğası gereği gizli bir doğuşkanlar dizisini içinde taşır!
      </p>
      <p>
        Kutucuklara dokun! Morla işaretli <strong>7</strong> ve <strong>11</strong> («Alp kornosu Fa'sı») tam olarak iki piyano tuşunun <em>arasına</em> düşer: saf doğal doğuşkanlar.
      </p>
      <div class="overtone-grid">
        ${PHYSICS_OVERTONES_TR.map(ot => `
          <button class="overtone-btn ${ot.special ? "is-blue" : ""}" data-play-freqs="${ot.freq}" data-osc="triangle" data-dur="1.15">
            <span class="overtone-num">Doğ. #${ot.num}</span>
            <span class="overtone-note">${ot.note}</span>
            <span class="overtone-ratio">${ot.ratio}</span>
          </button>
        `).join("")}
      </div>
      <div class="k-meta-box">
        <strong>Majörün neden bu kadar doğal duyulduğu:</strong> <strong>4 : 5 : 6</strong> doğuşkanları tabana çok yakın bir yerde hemen parlak bir majör üçlü akor oluşturur. Saf minör akor ise çok daha yukarıda, <strong>10 : 12 : 15</strong> civarında gizlenir!
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="${PHYSICS_OVERTONES_TR.map(o => o.freq).join(",")}" data-seq-step="380" data-osc="triangle" data-dur="0.65">▶ Tüm seri (1–12)</button>
        <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.0">▶ Majör akor (4:5:6)</button>
        <button class="btn-tool" data-play-freqs="261.63,313.96,392.45" data-osc="triangle" data-dur="2.0">▶ Minör akor (10:12:15)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">5. Akustik vurular</span>
        <span class="k-ratio-chip">Hz farkı = vuru/sn</span>
      </div>
      <h4>Dalgalar «attığında»: kulaktan akort etmek</h4>
      <p>
        Neredeyse ünison iki teli birlikte çal: tepeleri bir anlığına toplanır (iki kat güçlü), sonra birbirini söndürür (kısa bir çöküş). Bu gidip gelmeye («va-va-va») <strong>vuru (beat)</strong> denir. Saniyedeki atım sayısı tam olarak <strong>hertz farkını</strong> verir: teller kusursuz akortlandığında o titreme tamamen kaybolur!
      </p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-freqs="440,440" data-osc="sine" data-dur="2.4">▶ 0 Hz (440+440 · sabit)</button>
        <button class="btn-tool" data-play-freqs="440,442" data-osc="sine" data-dur="2.6">▶ 2 Hz (440+442 · 2 vuru/sn)</button>
        <button class="btn-tool" data-play-freqs="440,446" data-osc="sine" data-dur="2.4">▶ 6 Hz (440+446 · parıltı)</button>
        <button class="btn-tool" data-play-freqs="440,466" data-osc="sine" data-dur="2.2">▶ 26 Hz (440+466 · sürtünme)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">6. Akort &amp; piyano uzlaşması</span>
        <span class="k-ratio-chip">+23,5 sent fark</span>
      </div>
      <h4>Dünyadaki hiçbir piyano neden «%100 saf» akortlu değildir?</h4>
      <p>
        Matematiğin ilginç bir şakası: 12 saf beşliyi (3:2) art arda üst üste koyduğunda 7 tam oktavı yaklaşık <strong>23,5 sent</strong> aşarsın! Bir akortçu piyanoyu Do majörde kusursuz saf akortlasaydı, Fa♯ majör gibi uzak tonlar korkunç derecede bozuk tınlardı.
      </p>
      <p>
        Modern müziğin çözümü <strong>eşit tampere sistemdir</strong>: oktav birbirine kesinlikle eşit 12 küçük adıma bölünür. Her parça 12 tonun tamamında çalışır; bunun bedeli ise piyanoda büyük üçlünün (Do–Mi) yaklaşık <strong>14 sent</strong> daha tiz olmasıdır. Saf entonasyonu gerçek piyano örnekleriyle karşılaştır:
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Saf entonasyon (5:4)</h5>
          <p>Sıfır vuru: pürüzsüz kaynaşma, ama tüm tonlarda kullanılamaz:</p>
          <button class="btn-tool" data-play-freqs="261.63,327.04" data-osc="triangle" data-dur="2.3">▶ Saf üçlü (5:4 · pürüzsüz)</button>
          <button class="btn-tool" data-play-freqs="261.63,327.04,392.45" data-osc="triangle" data-dur="2.3">▶ Saf Do majör üçlü akor</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Piyano / eşit tampere (+14 ct)</h5>
          <p>Gerçek stüdyo piyano örnekleri: hafif dalgalı parıltı, 12 tonun hepsinde çalınabilir:</p>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4" data-dur="2.3">▶ Piyano üçlüsü (Do4 + Mi4 örneği)</button>
          <button class="btn-tool" data-play-inst data-style="piano" data-notes="C4,E4,G4" data-dur="2.3">▶ Piyano Do majör (örnek)</button>
        </div>
      </div>
    </article>
  `;
}


const CATEGORY_HELP_GUIDES_TR = {
  cadence: {
    tagClass: "tag-sage",
    tag: "Rehber • Kadanslar",
    title: "Kadans çalışması nasıl işler?",
    lead: "Akorları bağlamından kopuk tahmin etmek yerine, hem <strong>majör</strong> hem <strong>minör</strong> tonlarda dört ölçülük tam bir yürüyüş dinler ve soru işareti olan yerdeki eksik işlevi tanırsın.",
    sections: `
      <h3>Dört alıştırma grubu (majör &amp; minör)</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Majör • Hedef: 4. ölçü</h5>
          <p>1'den 3'e kadar olan ölçüler majör tonu kurar. Dört akoru dinle ve <strong>4. ölçüdeki</strong> eksik armoniyi seç.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Majör • Rastgele ölçü (1–4)</h5>
          <p>Soru işareti 1. ile 4. ölçü arasında gezer. 1. ölçü gizlense bile ekranda bir tonik (<strong>I</strong>) referansı görünür kalır.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Minör • Hedef: 4. ölçü</h5>
          <p>Aynı çalışma gerçek minör tonlarda (ör. <code>i–iv–V</code>): üç ölçülük bağlamı dinle ve 4. işlevi belirle.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Minör • Rastgele ölçü (1–4)</h5>
          <p>Gizli ölçü 1'den 4'e kadar değişir; kulağına yön vermesi için en az bir minör tonik (<strong>i</strong>) ekranda görünür kalır.</p>
        </div>
      </div>

      <h3>4 zorluk seviyesi (majör &amp; minör)</h3>
      <ul class="article-steps-list">
        <li><strong>Seviye 1 – Temeller (I–V / i–V):</strong> Dört temel dayanak: majörde <code>I, IV, V, vi</code> veya minörde <code>i, iv, V, VI</code>.</li>
        <li><strong>Seviye 2 – Diyatonik (ii–vi / ii°–VII):</strong> Tüm ana diyatonik dereceler (majörde <code>ii</code> &amp; <code>iii</code>; minörde <code>ii°, III, v, V, VII</code>).</li>
        <li><strong>Seviye 3 – Genişletilmiş (V/V / N6):</strong> <code>V7</code>, ikincil dominant <code>V/V</code> ve minörde Napoliten akor <code>N6</code> eklenir.</li>
        <li><strong>Seviye 4 – Caz &amp; triton (bII7 / iiø7):</strong> Triton ikamesi <code>bII7</code> ve minör <code>ii–V</code> (<code>iiø7</code>) dahil tam sözlük.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Kontroller, yalnızca dinleme &amp; sınav</h4>
        <p>Ekranın üstünde <strong>Ton</strong> ve <strong>Tempo (BPM)</strong> ayarlarını yapabilirsin. Altta <strong>Tonik (I)</strong> / <strong>Tonik (i)</strong> ve <strong>Akoru tekrar çal</strong> kulağını sabitler; <strong>Döngü</strong> kesintisiz tekrarlar, <strong>Yalnızca Dinle</strong> ise çözümleri otomatik göstererek ilerler. Bir hatadan sonra <strong>A/B Karşılaştırma</strong> ve <strong>Bas / kök ses</strong> seçimini doğru cevapla kıyaslar; <strong>Kategori Sınavı</strong> ise majör ve minörü birlikte sınar.</p>
      </div>
    `
  },
  interval: {
    tagClass: "tag-peach",
    tag: "Rehber • Aralıklar",
    title: "Aralık çalışması nasıl işler?",
    lead: "Kulağını saf iki sesli uzaklıklar üzerinde keskinleştir: çıkıcı melodik, inici melodik, eşzamanlı armonik ve yaylı dem sesi üzerinde. Melodik ve dem modlarında başlangıç notası her soruda berrak bir orta bölgede değişir. (Akorlar ve çevrimler için <strong>Akorlar</strong> modülüne geç!)",
    sections: `
      <h3>4 alıştırma türü</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Melodik aralıklar (çıkıcı)</h5>
          <p>İki ses tize doğru art arda gelir: 1. ölçü rastgele başlangıç notasını (<code>Fa3–Mi4</code>) verir, 2. ölçü çıkıcı atlayışı adlandırmanı ister.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Melodik aralıklar (inici)</h5>
          <p>İki ses art arda aşağı iner: 1. ölçü rastgele tiz bir notadan (<code>Fa♯4–Fa5</code>) başlar, 2. ölçü inici atlayışı sorar — kulak eğitiminin vazgeçilmez klasiği!</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Armonik aralıklar</h5>
          <p>İki nota aynı anda tınlar. Kaynaşmayı ya da vuruları dinle; çözüldüğünde kartlar her iki perdeyi de gösterir (ör. <code>Do4 + Sol4</code> / <code>C4 + G4</code>).</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Kök ses demi üzerinde aralıklar (yaylılar ➔ piyano)</h5>
          <p>Sıcak bir <strong>yaylı demi</strong> kök sesi kesintisiz tutar. Kısa bir aradan sonra <strong>piyano</strong> hedef notayı bunun üzerinde çalar; <strong>Kök ses demi</strong> (varsayılan %50) ve <strong>Aralık</strong> için ayrı kontroller bulunur.</p>
        </div>
      </div>

      <h3>Seviyeler: Majör, Minör, Kromatik &amp; Serbest Mod</h3>
      <ul class="article-steps-list">
        <li><strong>Başlangıç (Majör Seviye 1 / Minör 1):</strong> Üçlü akorun dört dayanak noktası: ünison (<code>P1</code>), büyük üçlü (<code>M3</code>) veya küçük üçlü (<code>m3</code>), tam beşli (<code>P5</code>) ve oktav (<code>P8</code>).</li>
        <li><strong>Alt yarı 1–4 (Majör Seviye 2 / Minör 2):</strong> Alt dörtlü (4 aralık): ünison (<code>P1</code>), büyük ikili (<code>M2</code>), büyük veya küçük üçlü (<code>M3</code> / <code>m3</code>) ve tam dörtlü (<code>P4</code>).</li>
        <li><strong>Üst yarı 5–8 (Majör Seviye 3 / Minör 3):</strong> Üst dörtlü (4 aralık): tam beşli (<code>P5</code>), büyük veya küçük altılı (<code>M6</code> / <code>m6</code>), büyük veya küçük yedili (<code>M7</code> / <code>m7</code>) ve oktav (<code>P8</code>).</li>
        <li><strong>Tam dizi (Majör Seviye 4 / Minör 4):</strong> Majör veya doğal minörde ünisondan oktava kadar tüm 8 diyatonik aralık.</li>
        <li><strong>Seviye 5 – Kromatik:</strong> Tüm küçük aralıklar ve triton (<code>TT</code>) dahil ünisondan büyük dokuzluya (<code>M9</code>) kadar 15 aralığın tamamı.</li>
        <li><strong>Serbest ton &amp; modlar (Özel çalışma):</strong> Sabit bir <strong>Tonik</strong> (<code>Do</code>'dan <code>Si</code>'ye) veya <strong>Rastgele</strong>, bir <strong>Dizi veya mod</strong> (<em>Majör/İyonik</em>, <em>Doğal/Armonik/Melodik minör</em>, <em>Doryen</em>, <em>Frigyen</em>, <em>Lidyen</em>, <em>Miksolidyen</em>, <em>Lokriyen</em>, <em>Kromatik</em>), <strong>Aralık kapsamı</strong> (<em>Başlangıç</em>, <em>1–4</em>, <em>5–8</em>, <em>1–8</em>) seç ya da her aralığı tek tek açıp kapat — hem kategori sayfasında hem alıştırma sırasında sağ üst rozetten.</li>
      </ul>

      <h3>Kısaltılmış aralık gösterimini anlamak</h3>
      <ul class="article-steps-list">
        <li><strong>Harf = nitelik (renk), rakam = derece (<code>1</code>–<code>9</code>):</strong> Rakam başlangıçtan itibaren nota adlarını sayar (<code>1</code> = birli, <code>2</code> = ikili, <code>3</code> = üçlü … <code>9</code> = dokuzlu), harf ise tam yarım ton sayısını belirler.</li>
        <li><strong><code>P</code> = tam (<em>Perfect</em>):</strong> Birli (<code>P1</code>), dörtlü (<code>P4</code>), beşli (<code>P5</code>) ve sekizli (<code>P8</code>) için geçerlidir. Bunların büyük/küçük biçimi yoktur; yalnızca «tam» biçimleri vardır.</li>
        <li><strong><code>M</code> &amp; <code>m</code> (uluslararası) veya <code>G</code> &amp; <code>k</code> (Almanca):</strong> 2'li (<code>2</code>), 3'lü (<code>3</code>), 6'lı (<code>6</code>), 7'li (<code>7</code>) ve 9'lu (<code>9</code>) için kullanılır:<br>
          – <strong>Büyük <code>M</code></strong> (<em>Major</em>, Almanca <strong><code>G</code></strong> = <em>Groß</em>) daha geniş ve parlak büyük aralığı gösterir (ör. <code>M3</code> / <code>G3</code> = büyük üçlü, 4 yarım ton).<br>
          – <strong>Küçük <code>m</code></strong> (<em>minor</em>, Almanca <strong><code>k</code></strong> = <em>klein</em>) her zaman <strong>bir yarım ton daha dardır</strong>, daha samimi ya da gergindir (ör. <code>m3</code> / <code>k3</code> = küçük üçlü, 3 yarım ton). <code>m</code> ile <code>M</code> arasındaki büyük/küçük harf farkına dikkat: çok farklı tınlarlar!</li>
        <li><strong><code>TT</code> = triton:</strong> Tam olarak <code>P4</code> ile <code>P5</code> arasında duran 6 yarım tonluk elektrikli orta nokta.</li>
      </ul>
      <p><em>Kısaltmaları değiştirme:</em> <strong>Ayarlar → Müzik Notasyonu → Aralık Adları</strong> altından istediğin zaman <strong>Uluslararası (P / M / m)</strong> ile <strong>Almanca (P / G / k)</strong> arasında geçiş yapabilirsin.</p>

      <div class="article-highlight-box">
        <h4>Söyleme, A/B karşılaştırma &amp; sınav</h4>
        <p>Üstteki <strong>Söyle</strong> düğmesi (isteğe bağlı <em>mırıldanma arasıyla</em>) sesinin mesafeyi hissetmesine yardımcı olur. Altta <strong>Başlangıç notası</strong> ilk sesi tekrarlar; bir hatadan sonra <strong>A/B karşılaştırma</strong> senin seçimini aynı başlangıç notasından ve aynı yönde hemen çözümden önce çalar. Kesintisiz tekrar için <strong>Döngü</strong>'yü (veya Ayarlar'dan <strong>Otomatik İleri</strong>'yi), pasif tekrar için <strong>Yalnızca Dinle</strong>'yi kullan ve 4 aralık türünün tamamıyla <strong>Kategori Sınavı</strong>'na gir.</p>
      </div>
    `
  },
  chords: {
    tagClass: "tag-sage",
    tag: "Rehber • Akorlar",
    title: "Akor çalışması nasıl işler?",
    lead: "İster nota nota açılsın (çıkıcı veya inici arpejler) ister blok halinde çalınsın, akor renklerini anında tanıma becerisi kazan — ve çevrimlerde bas sesinde hangi akor notasının durduğunu yakala.",
    sections: `
      <h3>4 alıştırma türü</h3>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>Akor arpeji (çıkıcı ↗)</h5>
          <p>Akor sesleri pesten tize doğru çalar; böylece her üçlüyü, beşliyi ve yediliyi netçe izlersin. Doğru bildiğinde uygulama sesleri tam eşzamanlı bir akorda birleştirir.</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Akor arpeji (inici ↘)</h5>
          <p>Akor en tiz sesten aşağı doğru açılır. Alışılmış dinleme yönüne bağımlı kalmamak için idealdir; cevaptan sonra eşzamanlı akor tam armoniyi ortaya çıkarır.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>Akorlar (eşzamanlı)</h5>
          <p>Üç ila beş nota aynı anda tınlar. Genel berraklığı veya gerilimi dinle; çözülen kart çıkıcı arpejle açılır ve tüm notalarını gösterir (ör. <code>Do4 · Mi4 · Sol4 · Si4</code>).</p>
        </div>
        <div class="k-compare-box is-sage">
          <h5>Akor çevrimleri</h5>
          <p>En alttaki bas sesinde hangi derecenin yer aldığını belirle: <code>Bas: 1</code> (kök durum), <code>Bas: 3</code> (1. çevrim), <code>Bas: 5</code> (2. çevrim) veya <code>Bas: 7</code> (3. çevrim). Bas kararlı bir orta bölgede tutulur; böylece mutlak perdeyi değil dizilim rengini duyarsın.</p>
        </div>
      </div>

      <h3>Zorluk – akor türleri (4 seviye)</h3>
      <ul class="article-steps-list">
        <li><strong>Seviye 1 – Temel üçlüler:</strong> Dört temel üçlü akor: majör (<code>maj</code>), minör (<code>m</code>), eksik (<code>dim</code>) ve artık (<code>aug</code>).</li>
        <li><strong>Seviye 2 – Yedililer &amp; sus:</strong> Askılı dörtlü (<code>sus4</code>), dominant yedili (<code>7</code>), majör yedili (<code>maj7</code>) ve minör yedili (<code>m7</code>) eklenir.</li>
        <li><strong>Seviye 3 – Genişletilmiş yedililer:</strong> <code>sus2</code>, yarı eksik (<code>m7♭5</code>), tam eksik yedili (<code>°7</code>) ve minör-majör yedili (<code>m(maj7)</code>) eklenir.</li>
        <li><strong>Seviye 4 – Caz &amp; gerilimler:</strong> <code>maj9</code>, <code>7♭9</code> ve <code>7♯9</code> gibi caz uzantıları dahil 15 akor renginin tamamı.</li>
      </ul>

      <h3>Zorluk – çevrimler (3 seviye)</h3>
      <ul class="article-steps-list">
        <li><strong>Seviye 1 – Majör üçlü akor (3):</strong> Kök durum (<code>Bas: 1</code>), 1. çevrim (<code>Bas: 3</code>) ve 2. çevrim (<code>Bas: 5</code>).</li>
        <li><strong>Seviye 2 – Majör &amp; minör (3):</strong> Parlak majör ve derin minör üçlü akorlarda üç konum karışık.</li>
        <li><strong>Seviye 3 – Yedili akorlar (4):</strong> Dört sesli akorlar (<code>7</code>, <code>maj7</code>, <code>m7</code>) ile yedilinin basta olduğu 3. çevrim (<code>Bas: 7</code>) devreye girer.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Çalışma ipuçları</h4>
        <p><strong>Kök ses</strong> istediğin an akorun kökünü tekrarlar; bir hatadan sonra <strong>A/B karşılaştırma</strong> senin seçimini aynı kök üzerinde doğrudan doğru cevaptan önce çalar; çevrimlerde ise <strong>Bası dinle</strong> en pes notayı yalıtır. <strong>Döngü</strong>, <strong>Yalnızca Dinle</strong> ve 4 seviyeli <strong>Sınav</strong> modlarını da deneyebilirsin.</p>
      </div>
    `
  },
  melody: {
    tagClass: "tag-lilac",
    tag: "Rehber • Melodiler",
    title: "Melodi çalışması nasıl işler?",
    lead: "Solfej kulağını ritim duygunla doğrudan gerçek 5 çizgili bir dizek üzerinde birleştir: 4 akorluk bir kadansın ardından 1 ölçülük ön sayım ve 4–6 notalık bir cümle gelir.",
    sections: `
      <h3>Bir turun akışı</h3>
      <ul class="article-steps-list">
        <li><strong>1. Kadans, ön sayım &amp; gerçek dizek:</strong> Bir sabitleme yürüyüşü (<code>I – vi – IV – V</code>) tonu kurar; ardından <code>4/4</code> veya <code>3/4</code>'te bir ölçülük ön sayım ve doğrudan dizekte görünen 4–6 nota (sekizlik, dörtlük, noktalı dörtlük, ikilik ve suslar) gelir.</li>
        <li><strong>2. Üç stil seçeneği:</strong> Seçim sayfasında <strong>Ritmik melodi</strong> (perdelere odaklanman için süreler dizekte hazırdır), <strong>Birleşik dikte</strong> (klavyeden perdeyi <em>ve</em> alttan ritim değerini <code>1/8</code>, <code>1/4</code>, <code>1/4.</code>, <code>1/2</code> istediğin sırayla bul) veya <strong>Düzenli (temel)</strong> (başlangıç için 4 eşit ikilik nota) arasında seçim yap.</li>
        <li><strong>3. Dizekte adım adım çözüm:</strong> Bir nota doğrulandığı anda adı (<code>Do–Ti</code> veya derece numarası <code>1–7</code>) dizeğin altında belirir ve imleç bir sonraki soru işaretine geçer.</li>
        <li><strong>4. Tekrar dinleme &amp; notalara doğrudan dokunma:</strong> İlerlemeni kaybetmeden tüm cümleyi yeniden dinlemek için <strong>▶ Dinle</strong>'ye dokun. <strong>Tekrarla</strong> (veya dizekte çözülmüş ya da aktif bir notaya doğrudan dokunmak) o tek notayı kısa bir ritmik referansla yalıtır.</li>
      </ul>

      <h3>Seviyeler, tonlar &amp; kontroller</h3>
      <ul class="article-steps-list">
        <li><strong>Seviye 1 – Do–Fa:</strong> Alt dörtlüden (<code>Do, Re, Mi, Fa</code>) 4–5 notalık cümleler.</li>
        <li><strong>Seviye 2 – Sol–Do:</strong> Üst yarıdan (<code>Sol, La, Ti, Do</code>) 4–6 notalık cümleler.</li>
        <li><strong>Seviye 3 – Tam ton:</strong> 4–6 notada yedi derecenin tamamı (<code>Do</code>'dan <code>Do</code>'ya).</li>
        <li><strong>Tonlar, oktavlar &amp; yardımcılar:</strong> <code>Do majör</code> veya rastgele tonlarda, 1 ya da birden fazla oktavda çalış. Üstte <strong>Ton</strong>, <strong>Vuruş: açık/kapalı</strong> ve <strong>Tempo (BPM)</strong> ayarlanır; altta <strong>Tonik (Do)</strong>, <strong>Otomatik İleri</strong> (solda), <strong>Yalnızca Dinle</strong> ve 5 seviyeli <strong>Sınav</strong> yer alır.</li>
      </ul>
    `
  },
  solfege: {
    tagClass: "tag-sage",
    tag: "Rehber • Solfej",
    title: "Göreceli solfej (Hareketli Do) nasıl işler?",
    lead: "Göreceli solfej (Hareketli Do), majör ve minörde göreceli kulağı inşa eder: her dereceyi (Do–Ti, Do–Re–Me–Fa–Sol–Le–Te veya rakamlar) ton içindeki karakteristik geriliminden tanımayı öğrenirsin.",
    sections: `
      <h3>Her tur 4 net adımda ilerler</h3>
      <ul class="article-steps-list">
        <li><strong>1. Bağlam kadansı:</strong> Kısa bir yürüyüş kulağını ton merkezine ayarlar: majörde <code>I – vi – IV – V</code> veya minörde <code>i – VI – iv – V</code>.</li>
        <li><strong>2. Hedef nota:</strong> Kısa bir an sonra aktif aralıktan tek bir derece yalıtılmış olarak çalar.</li>
        <li><strong>3. Klavyede yanıtlama:</strong> Yalnızca aktif tuşlar etiketini gösterir (majör: <em>Do–Re–Mi–Fa–Sol–La–Ti–Do</em>, minör: <em>Do–Re–Me–Fa–Sol–Le–Te–Do</em> veya isteğe bağlı <em>rakamlar</em>), kenarlarda birer pay tuşu bırakılır; geri kalanı soluk kalır.</li>
        <li><strong>4. Sessiz hatalar &amp; doğal çözüm:</strong> Yanlış tuş tonal hafızanı bozmamak için sessizce kırmızı yanıp söner. Doğru tuş yeşil yanar ve toniğe doğal çözümünü çalar (<code>Do–Fa</code> aşağı, <code>Sol–Ti/Te</code> yukarı).</li>
      </ul>

      <h3>Majör, Minör &amp; Serbest Ton (ilerleme)</h3>
      <ul class="article-steps-list">
        <li><strong>Seviye 1 &amp; 2 – Dizi yarıları (4 nota):</strong> Yalnızca 4 aktif tuşla yumuşak başlangıç: sabit <code>Do majör</code> veya <code>Do minör</code> içinde önce alt yarı <code>Do–Fa</code>, sonra üst yarı <code>Sol–Do</code>.</li>
        <li><strong>Seviye 3 &amp; 4 – Tam dizi (1 oktav):</strong> Sabit <code>Do majör</code> / <code>Do minör</code> (seviye 3) veya oturum boyunca sabit rastgele bir tonda (seviye 4) 7 derecenin tamamı.</li>
        <li><strong>Seviye 5 &amp; 6 – Çoklu oktav:</strong> Dereceler sabit <code>Do majör</code> / <code>Do minör</code> (seviye 5) veya sabit rastgele bir tonda (seviye 6) pes ya da tiz oktavlara atlar.</li>
        <li><strong>Seviye 7 &amp; 8 – Modülasyonlar:</strong> Her doğru cevapta ton değişir: önce 1 oktavda (seviye 7), ardından çoklu oktavda (seviye 8).</li>
        <li><strong>Tam Majör ve Minör:</strong> 8 seviyenin tamamı hem majör hem doğal minör için simetrik olarak mevcuttur.</li>
        <li><strong>Serbest Ton (Majör &amp; Minör):</strong> Başlamadan önce veya alıştırma sırasında sağ üst rozetten modu (majör/minör), 12 tondan herhangi birini (veya rastgele), kapsamı (<code>Do–Fa</code>, <code>Sol–Do</code>, <code>Tam dizi</code>) ve oktavı seç.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Yardımcılar, söyleme, etiketler &amp; sınav</h4>
        <p>Üstte <strong>Tempo (BPM)</strong> ayarının yanında <strong>Söyle</strong> (isteğe bağlı <em>mırıldanma arasıyla</em>) seni Do / 1'e kadar söylemeye davet eder. Klavyenin üstünde <strong>ton rozeti</strong> (majör veya minör tonik akorunu çalar), <strong>Tonik (Do)</strong> ve <strong>Tekrarla</strong> bulunur. Altta mor <strong>Döngü</strong> düğmesi notayı her 3 saniyede bir tekrarlar ve <strong>Yalnızca Dinle</strong> otomatik çözer. <strong>Ayarlar</strong>'dan <strong>Heceler</strong> ile <strong>Rakamlar</strong> (<code>1–7</code> / <code>b3, b6, b7</code>) veya <strong>Otomatik İleri</strong> arasında geçiş yap ve <strong>Kategori Sınavı</strong>'na gir.</p>
      </div>
    `
  },
  rhythm: {
    tagClass: "tag-sage",
    tag: "Rehber • Ritim",
    title: "Ritim çalışması nasıl işler?",
    lead: "Dört tamamlayıcı modül ölçü birimlerini, ritim diktesini, kulaktan çalma &amp; deşifre ritim okumayı ve groove mikrozamanlamasını çalıştırır — tek çizgili ritim dizeğinde gösterilir ve tempo (BPM) ayarlanabilir.",
    sections: `
      <h3>4 ritim modülü</h3>
      <ul class="article-steps-list">
        <li><strong>1. Ölçü &amp; ölçü birimi (3 seviye):</strong> İki ölçülük vurmalı kalıp dinle (<code>1.</code> vuruş vurgulu) ve <code>4/4</code> &amp; <code>3/4</code> (seviye 1), <code>2/4</code> &amp; <code>6/8</code> (seviye 2) ile aksak <code>5/4</code> &amp; <code>7/8</code> (seviye 3) ölçülerini ayırt et. <strong>Dörtlük vuruş</strong> istediğin an nötr referans sunar.</li>
        <li><strong>2. Ritim diktesi (4 vuruş, 4 seviye):</strong> Tek çizgili dizekte 1 ölçülük ön sayımdan sonra klavesle 4 vuruşluk bir kalıp çalar. Her vuruşu adım adım doldur (dörtlük, sekizlik, sus, aksak vuruş, üçleme, onaltılık ve senkop) — <strong>Metronom (1–4)</strong>, <strong>Vuruşu tekrarla</strong> (veya karta dokunarak) ve <strong>Otomatik İleri</strong> ile.</li>
        <li><strong>3. Pad: kulaktan çalma &amp; deşifre (her biri 4 seviye):</strong> <strong>Pad'de çal</strong> modunda ön sayım + demoyu dinle, sonra büyük <strong>vuruş pad'ine</strong> (veya <code>Boşluk</code> tuşuna) vur — <strong>Tık: açık/kapalı</strong>, <strong>Yalnızca Dinle</strong> ve 4. seviyede <em>kör mod</em> ile. <strong>Ritimleri deşifre çal</strong> modunda önceden demo yoktur: kalıbı doğrudan dizekten oku ve ön sayım biter bitmez metronomla vur (seviye 4: <em>metronomsuz</em>). Hemen ardından <strong>zaman çizelgesi</strong> her vuruşunu değerlendirir (<code>tam isabet</code>, <code>sınırda ±ms</code>, <code>kaçırıldı</code>, <code>fazla</code>).</li>
        <li><strong>4. Groove, aksak vuruş &amp; mikrozamanlama (4 seviye):</strong> Seviye 1: <em>groove stilleri</em> (marş, backbeat, senkop, swing, 3'e karşı 2); seviye 2: aksak vuruşta <em>çan vurgusu</em> (<code>1</code>–<code>4+</code>); seviye 3: <em>mikrozamanlama (±55 ms)</em> ve seviye 4: <em>pro mikrozamanlama (±28 ms)</em> (erken, tam vuruşta veya geriden / laid-back).</li>
      </ul>

      <div class="article-highlight-box">
        <h4>İpuçları &amp; kategori sınavı</h4>
        <p><strong>Pad'de çal</strong> moduna 80–95 BPM civarında <strong>tık açık</strong> başla ve istersen sol alttan <strong>Otomatik İleri</strong>'yi aç. Nabzın oturduğunda <strong>kör mod</strong>, <strong>metronomsuz ritim deşifresi</strong>, <strong>Yalnızca Dinle</strong> veya 4 seviyeli <strong>Sınav</strong> meydan okumasını dene.</p>
      </div>
    `
  },
  production: {
    tagClass: "tag-lilac",
    tag: "Rehber • Prodüksiyon & Miks",
    title: "Frekans & EQ çalışması nasıl işler?",
    lead: "Miks kulaklarını stüdyo standart bantlarına kalibre et: 5–12 bantta saf sinüs tonlarından pembe gürültü üzerinde canlı parametrik EQ yükseltmesine kadar.",
    sections: `
      <h3>2 prodüksiyon modülü</h3>
      <ul class="article-steps-list">
        <li><strong>1. Saf frekansları tanıma (sinüs, 3 seviye):</strong> Sub-bastan (<code>63 Hz</code>) hava tizlerine (<code>12 kHz</code>) kadar kalibre edilmiş saf bir tonu <strong>5 bant</strong>, <strong>8 oktav bandı</strong> veya <strong>12 bant</strong> üzerinde dinle. Kulağını istediğin an yeniden ayarlamak için <strong>«Ref.: 1 kHz»</strong> düğmesine dokun.</li>
        <li><strong>2. Pembe gürültüde EQ yükseltmesi (3 seviye):</strong> <strong>Serbest çalışmada</strong> pembe gürültü hemen <strong>EQ yükseltmesi açık</strong> olarak sürekli başlar (seviye 1: geniş EQ <code>+10 dB / Q 1,6</code>, seviye 2: oktav EQ <code>+8,5 dB / Q 2,6</code>, seviye 3: cerrahi <code>+7 dB / Q 4,2</code>). <strong>Flat</strong> kartıyla veya <strong>«Flat Bypass»</strong> (<code>Flat: AÇIK</code>) düğmesiyle işlenmemiş nötr gürültüye özgürce geç. <strong>Yalnızca Dinle</strong> modunda önce <em>Flat</em> gürültüyü, ardından daha uzun süre <em>EQ yükseltmesini</em> duyarsın ve doğru bant gösterilir.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>İşitme koruması, karşılaştırma &amp; sınav</h4>
        <p>Pembe gürültü algılanan enerjiyi dengelemek için oktav başına 3 dB düşer. -14 dBFS limiter, 2–4 kHz civarında ağırlıklandırma ve yumuşak geçişler kulağını korur. Bir hatadan sonra <strong>A/B karşılaştırma</strong> ve <strong>Flat → Hedef EQ</strong> iki sinyali kıyaslar; 3 seviyenin tamamı <strong>Kategori Sınavı</strong>'nda yer alır.</p>
      </div>
    `
  },
  modes: {
    tagClass: "tag-peach",
    tag: "Rehber • Diziler & Modlar",
    title: "Dizi & mod çalışması nasıl işler?",
    lead: "Soyut ezberi unut: her modu tüm müzikal rengiyle — aynı kök ses üzerinde ya da başka tonlara transpoze edilmiş olarak — isteğe bağlı yaylı kök ses demi eşliğinde dinle.",
    sections: `
      <h3>3 modal modül</h3>
      <ul class="article-steps-list">
        <li><strong>1. Diziyi / modu tanıma (3 seviye):</strong> Önce üçlüsüz nötr bir <strong>dayanak beşlisi</strong> çalar, ardından 8 notalık çıkıcı dizi gelir: seviye 1'de 4 temel mod (<code>iyonik, eolyen, doryen, miksolidyen</code>), seviye 2'de <code>Do</code> üzerinde 7 modun tamamı ve seviye 3'te transpoze edilmiş 7 modun tamamı.</li>
        <li><strong>2. Karakteristik nota &amp; renk (3 seviye):</strong> Dayanak beşlisinin ardından kısa bir dönüş ayırt edici dereceyi öne çıkarır (lidyen <code>#4</code>, miksolidyen <code>b7</code>, doryen <code>♮6</code>, frigyen <code>b2</code> veya <strong>armonik minörün</strong> yeden sesi <code>#7</code>): seviye 1 majör modlar, seviye 2 minör modlar, seviye 3 çeşitli kök seslerde tümü + armonik minör.</li>
        <li><strong>3. Modal kadanslar &amp; akor döngüleri (2 seviye):</strong> Karakteristik iki akorlu yürüyüşler (doryen <code>i – IV</code>, miksolidyen <code>I – bVII</code>, lidyen <code>I – II</code>, frigyen <code>i – bII</code>): seviye 1'de <code>Do</code> üzerinde 4 standart döngü, seviye 2'de transpoze edilmiş 6 modal döngünün tamamı. Akor döngüsü, modun rengini anında duyulur kılan iki akorun sürekli değişiminden oluşur.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Kök ses demi, dayanak beşlisi &amp; A/B</h4>
        <p>İlgili değil paralel düşün: her modu <strong>aynı kök ses</strong> üzerinde karşılaştır. <strong>«Kök ses demi: açık/kapalı»</strong> düğmesi modun altına kesintisiz bir yaylı demi ekler; istediğin an <strong>«Dayanak beşlisi»</strong>'ne (veya soldaki karta) dokun ve bir hatadan sonra <strong>A/B karşılaştırma</strong> ile iki rengi doğrudan kıyasla. <strong>Döngü</strong>, <strong>Yalnızca Dinle</strong> ve 3 seviyeli <strong>Sınav</strong> dahildir.</p>
      </div>
    `
  },
  warmup: {
    tagClass: "tag-sage",
    tag: "Rehber • Ses Isıtma",
    title: "Rehberli ses ısıtma nasıl işler?",
    lead: "Koro provaları, şan dersleri ve günlük rutinler için tasarlandı: 5 ses grubundan (SATB) birini seç ve nefes küresi, etkileşimli klavye ve anında transpozisyon ile 5 rehberli programdan birini başlat.",
    sections: `
      <h3>5 program seçeneği &amp; 4 aşama</h3>
      <ul class="article-steps-list">
        <li><strong>5 hedefli program:</strong> Vaktine göre <strong>Tam Isınma (5 dk)</strong> (majör ve minör dizilerle 4 aşama, 11 egzersiz), <strong>Hızlı Isınma (~3 dk)</strong>, <strong>Diziler (Majör &amp; Minör)</strong>, <strong>Arpejler &amp; register geçişi</strong> veya <strong>Koro nefesi &amp; entonasyon</strong> programını başlat.</li>
        <li><strong>Aşama 1 – Nefes &amp; beden:</strong> <code>ffff / ssss</code> üzerinde nefes küresi ve yumuşak itişler (<code>P – T – K</code>) gırtlağı sıkmadan diyafram desteğini uyandırır.</li>
        <li><strong>Aşama 2 – Rezonans &amp; tını yerleşimi:</strong> Kapalı ağız mırıldanma / dudak trili (<code>Mmm / Brrr</code>) ve inici beşli iç çekişleri (<code>5–4–3–2–1</code>) ses bölgelerini yumuşakça bağlar.</li>
        <li><strong>Aşama 3 &amp; 4 – Diziler, arpejler &amp; koro:</strong> <strong>Orta koro, soprano, alto, tenor veya bas</strong> aralığına uyarlanmış, yarım tonlarla yükselen <strong>majör ile doğal, armonik ve melodik minör</strong> tam oktav dizileri ve arpejler; ardından ünlü akışı (<code>U → O → A → E → İ</code>) ve üst üste kurulan bir SATB akoru.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Canlı kontroller &amp; klavye</h4>
        <p>Üstten istediğin an <strong>Ses grubu (SATB)</strong>, <strong>Eşlik sesi</strong> (piyano, piyano + vokal veya vokal) ve <strong>Tempo</strong> ayarını değiştir ya da <strong>aşama haplarıyla</strong> adımlar arasında geç. Alttan <strong>«−1 / +1 yarım ton»</strong> ve <strong>«Tekrarla»</strong> ile ince ayar yap veya <strong>etkileşimli klavyede</strong> doğrudan referans sesler çal.</p>
      </div>
    `
  },
  notation: {
    tagClass: "tag-sage",
    tag: "Rehber • Notasyon & Nota Okuma",
    title: "Nota okuma çalışması nasıl işler?",
    lead: "6 modda akıcı deşifre becerisi geliştir: Sol, Fa ve Alto (3. çizgi Do) anahtarları, karışık anahtarlar, çift piyano dizeği ve akor okuma (çevrimler &amp; yedililerle).",
    sections: `
      <h3>6 mod &amp; yanıt girişi</h3>
      <ul class="article-steps-list">
        <li><strong>1. Tek nota okuma (6 notalık akış):</strong> <strong>Sol</strong>, <strong>Fa</strong>, <strong>Alto</strong> anahtarında, <strong>karışık anahtarda</strong> (uyarıyla her 3 notada bir değişir) veya <strong>çift dizekte</strong> (akoladla birleşik Sol + Fa), soldaki renkli şerit diziyi ilerletmek için klavyede basman gereken notayı işaretler.</li>
        <li><strong>2. Akor okuma (5 akor, çoktan seçmeli):</strong> Dizekte üst üste dizilmiş üçlü ve yedili akorlar görünür. <strong>4 seviyede</strong> doğru <strong>sembol kartını</strong> (ör. <code>E, Em, E7, Esus4</code>) seç: seviye 1 (Sol anahtarında üçlüler), seviye 2 (Fa anahtarında üçlüler), seviye 3 (her iki anahtarda çevrimler) ve seviye 4 (tüm türler &amp; yedililer).</li>
        <li><strong>3. Hatalar &amp; Atla düğmesi:</strong> Yanlış tuş veya kart kırmızı yanar ve anahtarı, değiştirici işareti ya da çevrimi sakince kontrol edebilmen için akışı duraklatır. Cevabı görüp devam etmek için <strong>Atla</strong>'ya dokun.</li>
      </ul>

      <h3>Seviyeler &amp; donanımlar</h3>
      <ul class="article-steps-list">
        <li><strong>Tek notalar, seviye 1–4:</strong> Seviye 1 (5 çizgi &amp; 4 aralık), seviye 2 (<code>±2 ek çizgi</code>), seviye 3 (<code>±3 ek çizgi</code>) ve seviye 4 diyez/bemollerle (<code>♯</code>/<code>♭</code>) ya da donanım aktifken <strong>natürel (<code>♮</code>)</strong> işaretleriyle, uluslararası veya Almanca gösterimde.</li>
        <li><strong>Donanımlı okuma (1–6 ♯/♭):</strong> Notasyon sayfasından veya alıştırma sırasında <strong>Ton</strong> seçeneğinden belirli bir tonu ya da dönüşümlü bir grubu (kolay, orta, tümü) seç.</li>
      </ul>

      <div class="article-highlight-box">
        <h4>Ses kontrolleri, yalnızca dinleme &amp; sınav</h4>
        <p>Yanıtların üstündeki <strong>Nota sesi: açık/kapalı</strong> sessiz deşifre için sesi tamamen kapatır. Altta <strong>▶ Notayı dinle</strong> / <strong>▶ Akoru dinle</strong> serbest çalışmada isteğe bağlı referans sunar; <strong>Kategori Sınavı</strong>'nda (6 seviye) ise çözümü ele vermemek için düğme <strong>▶ Referans</strong>'a (<code>Sol4</code> / <code>Fa3</code> / <code>Do4</code>) dönüşür. Sağda <strong>Yalnızca Dinle</strong> seçilen <strong>Tempo</strong>'ya göre (<em>çok yavaş</em>tan <em>çok hızlı</em>ya) otomatik ilerler.</p>
      </div>
    `
  }
};

function renderRhythmReferenceHTML_TR() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Nabız &amp; ölçüler</span>
        <span class="k-ratio-chip">Ölçü birimi</span>
      </div>
      <h4>Her parçayı zamanda yapılandıran şey</h4>
      <p>
        Neredeyse tüm müzik, <strong>nabız (veya vuruş)</strong> adı verilen düzenli bir atım sayesinde nefes alır. Hızı <strong>BPM</strong> (<em>dakikadaki vuruş sayısı</em>) ile ölçülür. <strong>Ölçü</strong>, bu vuruşları düzenli döngüler halinde gruplar ve özellikle <strong>birinci vuruşta (güçlü zaman)</strong> belirgin biçimde hissedilir.
      </p>

      <div class="physics-fact-grid">
        <div class="physics-fact-chip">
          <strong>4/4 ölçü (dört dörtlük)</strong>
          <span>Her ölçüde dört dörtlük nota (<strong>1</strong>–2–3–4). Pop, rock, hip-hop ve funk müziğin neredeyse tamamının omurgası.</span>
        </div>
        <div class="physics-fact-chip">
          <strong>3/4 ölçü (vals)</strong>
          <span>Her ölçüde üç dörtlük nota (<strong>1</strong>–2–3). Dairesel bir salınım (<em>Mavi Tuna</em>, <em>İyi ki Doğdun</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>6/8 ölçü (bileşik ikili)</strong>
          <span>İki büyük üçlü vuruş halinde gruplanmış altı sekizlik (<strong>1</strong>-2-3-<strong>4</strong>-5-6): baladların o dalgalı akışı (<em>Nothing Else Matters</em>).</span>
        </div>
        <div class="physics-fact-chip">
          <strong>5/4 ölçü (aksak ölçü)</strong>
          <span>Dave Brubeck'in <em>Take Five</em>'ı veya <em>Mission: Impossible</em> temasıyla ünlenen asimetrik 3 + 2 (veya 2 + 3) gruplaması.</span>
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="meter-4-4">▶ 4/4 standart</button>
        <button class="btn-tool" data-play-rhythm="meter-3-4">▶ 3/4 vals</button>
        <button class="btn-tool" data-play-rhythm="meter-6-8">▶ 6/8 bileşik</button>
        <button class="btn-tool" data-play-rhythm="meter-5-4">▶ 5/4 aksak (3+2)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Nota değerleri &amp; alt bölümler</span>
        <span class="k-ratio-chip">1 · 2 · 3 · 4</span>
      </div>
      <h4>Her vuruş nasıl bölünür?</h4>
      <p>
        Bas davul ana nabzı sabitlerken müzisyenler her vuruşu daha ince parçalara (<strong>alt bölümlere</strong>) böler. Bir notanın yanına <strong>uzatma noktası</strong> koymak süresini yarısı kadar uzatır ve o tipik «uzun-kısa» ivmesini doğurur.
      </p>
      <ul class="k-physics-list">
        <li><strong>Birlik &amp; ikilik notalar:</strong> Sırasıyla 4 vuruş veya 2 vuruş süren uzun notalar.</li>
        <li><strong>Dörtlük notalar:</strong> Tam olarak her ana vuruşta bir darbe (<em>1 – 2 – 3 – 4</em>).</li>
        <li><strong>Sekizlik notalar:</strong> Vuruş başına iki eşit darbe (<em>1-ve – 2-ve</em>).</li>
        <li><strong>Üçlemeler (triole):</strong> Tek bir vuruş içine sığan üç düzenli nota (<em>An-ka-ra</em> / <em>1-2-3 – 2-2-3</em>).</li>
        <li><strong>Onaltılık notalar:</strong> Vuruş başına dört sıkı darbe (<em>Ge-li-bo-lu</em>): funk groove'larının ve trap hi-hat'lerinin motoru.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="sub-quarter">▶ Dörtlük (1×)</button>
        <button class="btn-tool" data-play-rhythm="sub-eighth">▶ Sekizlik (2×)</button>
        <button class="btn-tool" data-play-rhythm="sub-triplet">▶ Üçleme (3×)</button>
        <button class="btn-tool" data-play-rhythm="sub-sixteenth">▶ Onaltılık (4×)</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. Groove, backbeat &amp; swing</span>
        <span class="k-ratio-chip">Güçlü vs. zayıf zaman</span>
      </div>
      <h4>Aynı 4/4 ölçü neden bambaşka bir ruha bürünür?</h4>
      <p>
        Bir ritmin yürüyüş marşı gibi mi yoksa farkında olmadan başını sallatacak gibi mi hissettireceği tamamen vurguların nereye düştüğüne bağlıdır:
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Marş vs. backbeat (2 &amp; 4)</h5>
          <p><strong>1 &amp; 3</strong>. vuruşları vurgulamak bando yürüyüşü gibi duyulur. Trampeti <strong>2 &amp; 4</strong>. vuruşlara (<em>backbeat</em>) kaydır — anında pop, rock ve soul doğar!</p>
          <button class="btn-tool" data-play-rhythm="beat-march">▶ Marş (1 &amp; 3)</button>
          <button class="btn-tool" data-play-rhythm="beat-backbeat">▶ Backbeat (2 &amp; 4)</button>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Senkop &amp; swing / shuffle</h5>
          <p><strong>Senkop</strong>, vurguyu zayıf ara vuruşlara («ve») kaydırır. <strong>Swing</strong>'de ise sekizlikler düz 1:1 yerine üçleme hissiyle eşitsiz (yaklaşık 2:1) sıçrar.</p>
          <button class="btn-tool" data-play-rhythm="beat-syncopation">▶ Senkoplu groove</button>
          <button class="btn-tool" data-play-rhythm="beat-swing">▶ Swing hissi</button>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Poliritim &amp; referans şarkılar</span>
        <span class="k-ratio-chip">3'e karşı 2</span>
      </div>
      <h4>Aynı anda çalışan iki saat + unutulmaz referans parçalar</h4>
      <p>
        <strong>Poliritim</strong>, iki zıt ritmik ızgarayı aynı anda üst üste bindirir; en ünlüsü <strong>3'e karşı 2</strong>'dir (woodblock ölçüyü 3'e bölerken bas davul aynı sürede 2 düzenli vuruş yapar). Fizik &amp; Ses bölümünü hatırla: perdede bu aynı <code>3:2</code> oranı tam beşliyi üretir.
      </p>
      <div class="k-meta-box">
        <strong>Ölçüleri unutulmaz parçalarla eşleştir:</strong>
        <ul class="k-physics-list" style="margin-top:0.25rem;">
          <li><strong>4/4:</strong> «We Will Rock You» (Queen) • «Billie Jean» (Michael Jackson)</li>
          <li><strong>3/4:</strong> «Piano Man» (Billy Joel) • klasik Viyana valsi</li>
          <li><strong>6/8:</strong> «Nothing Else Matters» (Metallica) • «We Are the Champions» (Queen)</li>
          <li><strong>5/4:</strong> «Take Five» (Dave Brubeck) • «Mission: Impossible»</li>
        </ul>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-rhythm="poly-3-2">▶ «3'e karşı 2» poliritmini dinle</button>
      </div>
    </article>
  `;
}

const RHYTHM_INSTRUMENTS_DATA_TR = [
  {
    category: "drumset",
    tag: "Bateri • Pes temel",
    tagClass: "tag-peach",
    name: "Bas davul / kick",
    role: "Peslerde ağırlık ve darbe (~50–120 Hz)",
    desc: "Baterinin pedalla ayakla çalınan en büyük davulu. Ağır vuruşları (çoğunlukla 1 ve 3, ya da elektronik müzikte dört vuruşun hepsini) sabitler ve bas gitarla kenetlenir.",
    rhythmKey: "inst-kick",
    btnLabel: "Bas davulu dinle"
  },
  {
    category: "drumset",
    tag: "Bateri • Backbeat vuruşu",
    tagClass: "tag-peach",
    name: "Trampet (snare)",
    role: "2 ve 4. vuruşlarda keskin vurgu",
    desc: "Alt derinin altına gerili metal teller her vuruşta titreşerek pop/rock'ın keskin tokadını, ince hayalet notaları (ghost notes) ve sıkı trilleri üretir.",
    rhythmKey: "inst-snare",
    btnLabel: "Trampet ve trili dinle"
  },
  {
    category: "drumset",
    tag: "Bateri • Alt bölümler",
    tagClass: "tag-peach",
    name: "Hi-hat & ziller (ride / crash)",
    role: "Akış hassasiyeti ve form vurguları",
    desc: "Pedalla kontrol edilen iki zil (hi-hat) sekizlikleri veya onaltılıkları akıcıca böler. Büyük ride zili caz swing'ini taşır; crash zilleri ise nakarat girişlerini vurgular.",
    rhythmKey: "inst-hat",
    btnLabel: "Hi-hat alt bölümünü dinle"
  },
  {
    category: "drumset",
    tag: "Bateri • Melodik geçişler",
    tagClass: "tag-peach",
    name: "Tomlar (üst tomlar & floor tom)",
    role: "Geçişler, fill'ler ve inişler",
    desc: "Altında metal tel bulunmayan akortlu davullar. Tizden pese sıralanarak nakaratın gelişini haber veren geçişleri oluştururlar.",
    rhythmKey: "inst-toms",
    btnLabel: "Tom geçişini dinle"
  },
  {
    category: "world",
    tag: "El perküsyonu • Çok yönlü",
    tagClass: "tag-lilac",
    name: "Cajón (Peru kahonu)",
    role: "Taşınabilir akustik mini bateri",
    desc: "Peru kökenli, üzerine oturularak çalınan bu ahşap kutu ortasında derin bir bas, üst kenarının içindeki gergin teller sayesinde ise trampet tınısı verir."
  },
  {
    category: "world",
    tag: "El perküsyonu • Latin & pop",
    tagClass: "tag-lilac",
    name: "Konga & bongo",
    role: "Şarkısal groove'lar ve kıvrak süslemeler",
    desc: "Çiftler halinde çalınan Afro-Küba davulları. Kongalar sıcak ve şarkısal tumbao kalıpları örerken, küçük bongolar keskin vuruşlarıyla üstte parlar.",
    rhythmKey: "inst-conga",
    btnLabel: "Konga tumbao'sunu dinle"
  },
  {
    category: "world",
    tag: "Eller & senfoni orkestrası",
    tagClass: "tag-lilac",
    name: "Djembe, darbuka & orkestra timpanisi",
    role: "Fısıltıdan gök gürültüsüne dinamik",
    desc: "Batı Afrika djembe'si ve darbuka gibi kadeh davullar dolgun basları keskin slap vuruşlarıyla birleştirir. Senfoni orkestrasında pedalla akortlanan timpaniler gök gürültüsüne kesin bir perde kazandırır."
  },
  {
    category: "small",
    tag: "Zaman referansı • Ahşap",
    tagClass: "tag-sage",
    name: "Klaves & woodblock",
    role: "Cerrahi hassasiyette ritmik pusula",
    desc: "Birbirine vurulan iki sert ağaç çubuk. Bir avuca sığsalar da keskin atakları koca bir big band'i yarar ve salsa ile Latin müziğindeki 3–2 son clave'inin omurgasını kurar.",
    rhythmKey: "inst-clave",
    btnLabel: "3–2 son clave'ini dinle"
  },
  {
    category: "small",
    tag: "Küçük perküsyon • Hareket",
    tagClass: "tag-sage",
    name: "Shaker, marakas & tef",
    role: "İleri itiş ve ferah doku",
    desc: "İçi tanecik dolu shaker'lar bas davulla trampeti birbirine bağlayan kesintisiz bir onaltılık akışı örer ve yavaş tempolara bile anında hareket katar.",
    rhythmKey: "inst-shaker",
    btnLabel: "Shaker dokusunu dinle"
  },
  {
    category: "small",
    tag: "Küçük perküsyon • Metal",
    tagClass: "tag-sage",
    name: "Cowbell (çan), agogô & üçgen",
    role: "Keskin ara vuruşlar ve parlak vurgular",
    desc: "Funk, disko ve Afro-Latin müziğinde çok sevilen delici metalik sesler — örneğin iki perdeli agogô çanlarının karşılıklı konuşması.",
    rhythmKey: "inst-cowbell",
    btnLabel: "Cowbell riff'ini dinle"
  },
  {
    category: "small",
    tag: "Asla hafife alma!",
    tagClass: "tag-sage",
    name: "Bas gitar, kontrbas & ritim gitar",
    role: "Ritim ile armoni arasındaki köprü",
    desc: "Groove yalnızca davulcuya bağlı değildir! Bas davul ve bas gitar ritim bölümünün motorunu oluştururken, susturmalı gitar veya Clavinet vuruşları gerçek bir melodik perküsyon gibi çalışır."
  }
];

function renderRhythmInstrumentsHTML_TR(filterCat = "all") {
  const ensembleCard = `
    <div class="article-highlight-box" style="margin-bottom:0.2rem;">
      <h4>Vurmalılar aynı groove'u nasıl paylaşır (frekans dağılımı):</h4>
      <p style="font-size:0.78rem; color:var(--raccoon-dark); line-height:1.4;">
        Groove'u berrak tutmak için her çalgı kendi ses bandında yer alır: en altta <strong>bas davul</strong>, ortada patlayan <strong>trampet</strong>, en üstte parlayan <strong>hi-hat &amp; shaker</strong>.
      </p>
      <div class="k-btn-row" style="margin-top:0.35rem;">
        <button class="btn-tool" data-play-rhythm="band-groove">▶ Toplu groove (kick + snare + hi-hat + shaker)</button>
      </div>
    </div>
  `;

  const items = RHYTHM_INSTRUMENTS_DATA_TR.filter(item => filterCat === "all" || item.category === filterCat);
  return (filterCat === "all" ? ensembleCard : "") + items.map(item => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${item.tagClass}">${item.tag}</span>
        <span class="k-ratio-chip">${item.role.split("(")[0].trim()}</span>
      </div>
      <h4>${item.name}</h4>
      <p><strong>İşlev:</strong> ${item.role}</p>
      <p>${item.desc}</p>
      ${item.rhythmKey ? `
        <div class="k-btn-row">
          <button class="btn-tool" data-play-rhythm="${item.rhythmKey}">▶ ${item.btnLabel}</button>
        </div>
      ` : ""}
    </article>
  `).join("");
}

function renderVocalsReferenceHTML_TR() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">İnsan sesi</span>
        <span class="k-ratio-chip">İlk çalgı</span>
      </div>
      <h4>İnsan sesi nasıl ses üretir?</h4>
      <p>Sesin, üç eksiksiz akustik sistemi tek bir yaşayan çalgıda birleştirir. Bir gitar ya da flütten farklı olarak «rezonans kutusu» birkaç milisaniye içinde şekil değiştirerek perdeyi, gücü, doğuşkanları, ünlüleri ve ünsüzleri aynı anda yontar.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>1. Enerji kaynağı (nefes &amp; diyafram desteği)</strong>
          Nefes alırken <em>diyafram</em> aşağı inerek akciğerleri genişletir. Şarkı söylerken karın ve kaburga kasları gırtlağı hiç sıkmadan sabit bir <em>subglottik basınç</em> («nefes desteği») sağlar.
        </div>
        <div class="physics-fact-item">
          <strong>2. Titreştirici (gırtlak &amp; ses telleri)</strong>
          Gırtlakta iki esnek <em>ses kıvrımı (ses teli)</em> gerilidir. Hava akımı onları <em>Bernoulli etkisiyle</em> düzenli biçimde birbirine çekip ayırır (saniyede 100 ile 1000 kez) ve doğuşkanlarca zengin ham bir ses üretir.
        </div>
        <div class="physics-fact-item">
          <strong>3. Rezonatör (ses yolu &amp; formantlar)</strong>
          Boğaz, ağız ve burun boşlukları bu ham sesi süzer. Dil, çene, dudaklar ve yumuşak damağın hareketi <em>formant</em> denen rezonans tepelerini kaydırır ve yuvarlak bir «U»yu parlak bir «İ»ye dönüştürür.
        </div>
        <div class="physics-fact-item">
          <strong>4. Şarkıcı formantı (~3000 Hz)</strong>
          Alt yutağı genişleten opera sanatçıları enerjiyi 2,8–3,2 kHz civarında — tam da orkestra spektrumunun boşluk bıraktığı yerde — yoğunlaştırır. Böylece mikrofonsuz tek bir ses 80 çalgının üstüne çıkabilir!
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C4,E4,G4,C5" data-dur="1.9" data-step="0">▶ Koro akorunu dinle</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Register'lar &amp; teknikler</span>
        <span class="k-ratio-chip">Ses renkleri</span>
      </div>
      <h4>Ses bölgeleri (register) &amp; şan teknikleri</h4>
      <p>Hangi gırtlak kaslarının devreye girdiğine ve ses tellerinin tüm kalınlığıyla mı yoksa yalnızca ince kenarlarıyla mı titreştiğine bağlı olarak sesin karakteri kökten değişir:</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Göğüs sesi (modal register, M1)</strong>
          Ses tellerinin tüm kas kütlesi birlikte titreşir. Sıcak, sağlam ve dolgun bir tını sunar: doğal konuşma sesimiz ile pes ve orta bölgedeki güç temelidir.
        </div>
        <div class="physics-fact-item">
          <strong>Kafa sesi &amp; falsetto (M2)</strong>
          Ses telleri uzayıp incelir ve yalnızca dış kenarından titreşir. Hafif, flütümsü ve ferah bir renk verir (homojen lirik kafa sesi veya buğulu <em>falsetto</em>).
        </div>
        <div class="physics-fact-item">
          <strong>Karışık ses (Mix voice)</strong>
          Register geçişi (<em>passaggio</em>) boyunca akıcı bir köprü kurar. Hassas kas dengesi, ani kırılmalar olmadan pesten tize kesintisiz bir tını sağlar.
        </div>
        <div class="physics-fact-item">
          <strong>Belting (pop, müzikal, gospel)</strong>
          Sağlam nefes desteği ve açık ünlülerle göğüs sesinin dolgunluğunu tizlere taşır: Sol5/Do6 civarında doğrudan ve güçlü bir sahne varlığı.
        </div>
        <div class="physics-fact-item">
          <strong>Vibrato</strong>
          5–7 Hz civarında doğal, esnek ve düzenli bir perde-şiddet salınımı. Uzun notalara sıcaklık katar ve solo sesin koro üzerinde parlamasına yardımcı olur.
        </div>
        <div class="physics-fact-item">
          <strong>Scat &amp; doğuşkan (höömey) şarkıcılığı</strong>
          Cazda <em>scat</em>, ritmik hecelerle («shoo-be-doo») üflemeli sololarını taklit eder. <em>Doğuşkan şarkıcılığında</em> ise dilin hassas konumu bir dem sesi üzerinde dar bir doğuşkanı öne çıkarır — aynı anda iki nota duyulur!
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">Koro yazımı (SATB)</span>
        <span class="k-ratio-chip">Partiler &amp; ses aralıkları</span>
      </div>
      <h4>Koronun kalbinde: SATB partileri &amp; ses aralıkları</h4>
      <p>Dünyadaki karma korolar, tizden pese dört büyük ses grubuna göre adlandırılan <strong>SATB</strong> düzenini izler. Büyük senfonik korolar çoğu zaman her partiyi I ve II olarak ikiye bölüp sekiz sesli <em>SSAATTBB</em> yapısını kurar.</p>

      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Soprano (S) • Tipik aralık Do4–Do6 (C4–C6)</strong>
          En tiz kadın veya çocuk sesi. Genellikle ana melodiyi, üst armonileri ve kristal parlaklığı taşır.
        </div>
        <div class="physics-fact-item">
          <strong>Alto / Kontralto (A) • Tipik aralık Fa3–Mi5 (F3–E5)</strong>
          Pes kadın sesi (veya kontrtenor). Melodinin hemen altında armoninin iç sıcaklığını (üçlüler, yedililer, ifadeli gecikmeler) besler.
        </div>
        <div class="physics-fact-item">
          <strong>Tenor (T) • Tipik aralık Do3–La4 (C3–A4)</strong>
          Tiz erkek sesi (çoğunlukla bir oktav pes duyulan oktavlı Sol anahtarında yazılır!). Lirik karşı ezgiler veya parlak tizlerle üst ve alt yarıyı bağlar.
        </div>
        <div class="physics-fact-item">
          <strong>Bas (B) • Tipik aralık Mi2–Mi4 (E2–E4)</strong>
          En pes erkek partisi ve koronun akustik temeli. Baslar kök sesi sabitler: onlar kusursuz entonasyonda olduğunda tüm akor bir anda yerine oturur.
        </div>
        <div class="physics-fact-item">
          <strong>Mezzosoprano, bariton &amp; kontrtenor</strong>
          Üç temel ara ses: <em>mezzosoprano</em> (La3–La5, soprano ile alto arasında zengin köprü), <em>bariton</em> (Sol2–Sol4, en yaygın erkek ses aralığı) ve <em>kontrtenor</em> (eğitimli kafa sesiyle alto aralığında söyleyen erkek sesi).
        </div>
        <div class="physics-fact-item">
          <strong>Diğer vokal toplulukları</strong>
          <em>Kadın koroları (SSAA)</em> ve <em>erkek koroları (TTBB / barbershop)</em> doğuşkanları parlatmak için akorları sıkı tutar. Modern <em>a cappella</em> grupları ise bateri yerine beatbox ekler.
        </div>
      </div>

      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G4,B4,D5,G5" data-dur="0.95" data-step="320">▶ Soprano aralığı</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="G3,Bb3,D4,F4" data-dur="0.95" data-step="320">▶ Alto aralığı</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,E3,G3,B3" data-dur="0.95" data-step="320">▶ Tenor aralığı</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="E2,G2,B2,E3" data-dur="1.05" data-step="340">▶ Bas temeli</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Entonasyon &amp; dinleme</span>
        <span class="k-ratio-chip">Saf entonasyon</span>
      </div>
      <h4>Bir a cappella koro neden bazen piyanodan daha saf tınlar?</h4>
      <p>Piyanolar <strong>12 eşit tampere</strong> sistemle akortlanır: 12 tonun hepsi çalınabilsin diye büyük üçlüleri yaklaşık 14 sent daha tizdir. Şarkıcılar ise sabit tuşlara ya da çekiçlere bağlı değildir.</p>
      <p>Eşliksiz söylediklerinde iyi koristler aralıklarını içgüdüsel olarak <strong>saf entonasyonun temiz oranlarına</strong> (2:1 oktav, 3:2 beşli, 5:4 büyük üçlü) göre ayarlar. Büyük üçlü hiç vuru olmadan yerine oturduğu anda ortak doğuşkanlar birbirini güçlendirir ve tüm akor şaşırtıcı bir ışıltıyla açılır (ünlü «barbershop ring» etkisi).</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="1.4" data-step="460">▶ Ses ses üst üste ekle (bas → sop.)</button>
        <button class="btn-tool" data-play-inst="true" data-style="choir" data-notes="C3,G3,E4,C5" data-dur="2.4" data-step="0">▶ Tam SATB koro akoru</button>
        <button class="btn-tool" data-open-warmup="true">▶ 5 dakikalık ses ısıtmayı aç</button>
      </div>
    </article>
  `;
}

const INSTRUMENT_MODULES_DATA_TR = {
  strings: {
    title: "Yaylılar",
    subtitle: "Yay fiziği, orkestra yaylıları ailesi ve çalma teknikleri",
    intro: {
      tag: "Fizik & lutiyelik",
      tagClass: "tag-peach",
      chip: "Helmholtz «tut-bırak» hareketi",
      heading: "Yay telleri nasıl şarkı söyler hale getirir?",
      body: "<em>Reçine</em> sürülmüş at kılları, saniyede yüzlerce kez keskin bir tutunma ve kayma döngüsüyle teli yakalayıp bırakır. Akçaağaçtan yontulmuş bir <em>köprü</em> bu titreşimleri içi boş ladin ses tahtasına iletir; içeride can direği ve bas balkonu bu yapıyı destekler. Perdesiz oldukları için yaylılar her notayı özgürce ve saf entonasyonla çalabilir."
    },
    items: [
      {
        name: "Keman",
        tag: "Yaylıların sopranosu",
        tagClass: "tag-peach",
        range: "Sol3 – La7 (G3 – A7)",
        tuning: "Beşlilerle akortlu: Sol3 – Re4 – La4 – Mi5",
        role: "Ana melodi, parlaklık ve kıvrak virtüözite",
        desc: "Ailenin en tiz ve en çevik üyesi. Orkestrada kemanlar I. kemanlar (çoğunlukla tiz bölgede uçan) ve II. kemanlar (iç sesler ve armoni) olarak ikiye ayrılır. Kısa ve hafif telleri en hızlı pasajlara anında yanıt verir.",
        demos: [
          { label: "Yaylı keman (arco)", style: "strings", notes: "G4,D5,A5,E6", dur: 1.0, step: 340 },
          { label: "Parmakla çekilen keman (pizzicato)", style: "pizzicato", notes: "G4,B4,D5,G5", dur: 0.75, step: 220 }
        ]
      },
      {
        name: "Viyola",
        tag: "Yaylıların altosu",
        tagClass: "tag-sage",
        range: "Do3 – Mi6 (C3 – E6)",
        tuning: "Beşlilerle akortlu: Do3 – Sol3 – Re4 – La4",
        role: "İç armonik sıcaklık ve buğulu karşı ezgiler",
        desc: "Kemandan bir beşli pesten akortlanır ve geleneksel olarak <em>alto anahtarında (3. çizgi Do)</em> yazılır. Gövdesi pes ses aralığı için fiziğin gerektirdiğinden biraz daha küçüktür: viyolaya koyu, kadifemsi ve derinden duygusal tınısını veren de tam budur.",
        demos: [
          { label: "Viyola aralığını dinle", style: "strings", notes: "C3,G3,D4,A4", dur: 1.05, step: 360 }
        ]
      },
      {
        name: "Viyolonsel (Çello)",
        tag: "Tenor & bariton",
        tagClass: "tag-lilac",
        range: "Do2 – La5 (C2 – A5)",
        tuning: "Beşlilerle akortlu: Do2 – Sol2 – Re3 – La3",
        role: "Derin temel ve büyük lirik melodiler",
        desc: "Viyoladan tam bir oktav pes ve insan sesine olağanüstü yakındır. Pes telleri sıcak bir temel sunarken, La teli baritondan tenora uzanan yoğun sololar söyler.",
        demos: [
          { label: "Çelloyu dinle (Do2–La3)", style: "strings", notes: "C2,G2,D3,A3", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Kontrbas",
        tag: "Sub-pes temel",
        tagClass: "tag-peach",
        range: "Mi1 (uzatmayla Do1) – Sol4",
        tuning: "Dörtlülerle akortlu: Mi1 – La1 – Re2 – Sol2",
        role: "Orkestra bası ve caz yürüyen bas (walking bass)",
        desc: "Sol el mesafelerini rahat tutmak için beşli yerine <em>dörtlü</em> aralıklarla akortlanır ve yazıldığından <strong>bir oktav pes</strong> tınlar. Yayla görkemli bir derinlik sunar; pizzicato ile caz ve swing'i ileri iter.",
        demos: [
          { label: "Yaylı kontrbas (orkestral)", style: "strings", notes: "E1,A1,D2,G2", dur: 1.25, step: 420 },
          { label: "Caz walking bass (pizzicato)", style: "pizzicato", notes: "C2,E2,G2,A2,Bb2,A2,G2,E2", dur: 0.7, step: 280 }
        ]
      }
    ],
    extraBox: {
      heading: "Kulaktan tanınacak başlıca yaylı teknikleri",
      facts: [
        { title: "Arco vs. pizzicato", text: "<em>Arco</em> uzun ve şarkısal çizgiler için yayla çalmayı; <em>pizzicato</em> kısa, sıcak ve vurmalı sesler için teli parmakla çekmeyi ifade eder." },
        { title: "Spiccato & martelé", text: "<em>Spiccato</em> parıltılı bir çeviklik için yayı tel üzerinde hafifçe sektirir; <em>martelé</em> ise keskin ve net bir atakla vurur." },
        { title: "Tremolo & sul ponticello", text: "Yayın hızla ileri geri hareketi gerilim ürpertisi yaratır (sinema klasiği). Köprüye çok yakın çalmak (<em>sul ponticello</em>) tınıyı camsı ve hayaletimsi yapar." },
        { title: "Doğuşkanlar (flajole) & sordino", text: "Tele titreşim düğüm noktalarında hafifçe dokunmak flütümsü, kristal sesler çıkarır. Köprüye susturucu (<em>con sordino</em>) takmak tınıyı ipeksi bir tülle örter." }
      ]
    }
  },
  woodwinds: {
    title: "Tahta üflemeliler",
    subtitle: "Serbest ağızlık, tek kamış, çift kamış ve saksafon ailesi",
    intro: {
      tag: "Borular & kamışlar",
      tagClass: "tag-sage",
      chip: "3 ses üretim yöntemi",
      heading: "Saf nefesten titreşen kamışlara",
      body: "Homojen olan yaylıların aksine tahta üflemeliler üç çok farklı ses mekanizmasını bir araya getirir: flüt hava akımını keskin bir kenarda kırar, klarnet ve saksafon bir ağızlık üzerinde ince bir kamışı (<em>tek kamış</em>) titreştirir, obua ve fagot ise iki ince kamışı birbirine bastırır (<em>çift kamış</em>) — böylece her çalgı yeri doldurulamaz kendi rengini kazanır."
    },
    items: [
      {
        name: "Yan flüt & pikolo",
        tag: "Kenar üflemeli (kamışsız)",
        tagClass: "tag-peach",
        range: "Do4 – Re7 (pikolo Re5 – Do8)",
        tuning: "Do tonunda (pikolo +1 oktav)",
        role: "Gümüşi, ferah çizgiler, triller ve kuş sesleri",
        desc: "Nefes, ağızlık kenarında kırılarak hızla içe ve dışa salınır. Pes bölgesi yumuşak ve sinüs dalgasına yakındır; üçüncü oktav ise gümüşi bir parlaklıkla tüm orkestrayı yarar. Küçük pikolo çoğu zaman tüm orkestranın zirvesini taçlandırır.",
        demos: [
          { label: "Yan flüt (lirik cümle)", style: "flute", notes: "G4,A4,B4,D5,E5,G5", dur: 0.9, step: 260 }
        ]
      },
      {
        name: "Obua & korangle (İngiliz kornosu)",
        tag: "Çift kamış (dar konik boru)",
        tagClass: "tag-lilac",
        range: "Si♭3 – La6 (korangle Fa tonunda)",
        tuning: "Do tonunda obua • akort La4'ünü verir",
        role: "Orkestranın akort referansı ve dokunaklı sololar",
        desc: "Birbirine bağlı iki çok ince kamış dar konik bir boruda titreşerek delici, doğuşkanlarca zengin ve nostaljik bir tını üretir. Entonasyonu çok kararlı olduğundan tüm orkestra <strong>obuanın La4 sesine</strong> göre akortlanır. Büyük kardeşi korangle, armut biçimli kalak yapısıyla melankolik sololar için biçilmiş kaftandır.",
        demos: [
          { label: "Obua tınısı (çift kamış)", style: "reed", notes: "A4,C5,E5,D5,C5,A4", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "Klarnet & bas klarnet",
        tag: "Tek kamış (silindirik boru)",
        tagClass: "tag-sage",
        range: "Re3 – Si♭6 (bas klarnet Si♭1'e kadar)",
        tuning: "Genellikle Si♭ veya La (transpoze çalgı)",
        role: "Kadifemsi sıcaklık, pesten caz ve klezmer uçuşlarına",
        desc: "Tek bir kamış silindirik bir boru üzerindeki sert ağızlığa çarpar. Akustik özelliği: bir ucu kapalı boru gibi davranır! Pes bölgesi olan <em>chalumeau</em> tek sayılı doğuşkanları öne çıkarır ve register değiştirirken oktava değil <strong>onikiliye (oktav + beşli)</strong> atlar.",
        demos: [
          { label: "Klarnet aralığı (pes → tiz)", style: "reed", notes: "D3,F3,A3,C4,E4,A4", dur: 0.9, step: 280 }
        ]
      },
      {
        name: "Fagot & kontrfagot",
        tag: "Çift kamış (bas)",
        tagClass: "tag-peach",
        range: "Si♭1 – Mi5 (kontrfagot Si♭0'a kadar)",
        tuning: "Do tonunda (U biçiminde katlı ahşap boru)",
        role: "Keskin staccato baslar ve şarkısal tenor bölgesi",
        desc: "U biçiminde katlanmış 2,60 metreyi aşan konik ahşap boru. Peste kuru staccato'da nüktedan ve çevik; orta bölgede legato çalındığında insan baritonuna yakın bir sıcaklıkla şarkı söyler.",
        demos: [
          { label: "Fagotun pes bölgesi", style: "reed", notes: "Bb1,F2,Bb2,D3,F3", dur: 1.0, step: 330 }
        ]
      },
      {
        name: "Saksafon ailesi (soprano, alto, tenor, bariton)",
        tag: "Modern tahta üflemeli köprüsü",
        tagClass: "tag-lilac",
        range: "Gerçek seste Re♭2 – Fa6 (boyuta göre)",
        tuning: "Dönüşümlü Mi♭ (alto/bariton) & Si♭ (soprano/tenor)",
        role: "Caz, big band, funk, soul ve pop soloları",
        desc: "1840 civarında Adolphe Sax tarafından dahiyane bir melez olarak icat edildi: klarnetin esnek tek kamışı, geniş konik pirinç bir boruyla birleşir. Düzenli olarak oktava atlar, neredeyse bir bakır üflemeli kadar güçlü ses verir ama fısıltılı subtone'dan pürüzlü growl'a kadar tahta üflemeli çevikliğini korur.",
        demos: [
          { label: "Tenor / alto saksafon rengi", style: "reed", notes: "C4,Eb4,F4,F#4,G4,Bb4", dur: 0.9, step: 250 }
        ]
      }
    ],
    extraBox: {
      heading: "Transpoze üflemeliler için hızlı rehber",
      facts: [
        { title: "Bazı üflemeliler neden Si♭, Mi♭ veya Fa okur?", text: "Böylece altodan baritona geçen bir saksafoncu ya da boyut değiştiren bir klarnetçi birebir aynı parmak düzenini kullanır! Si♭ trompet veya tenor saksafonda yazılı bir <em>Do</em> çalmak gerçekte <em>Si♭</em> (bir tam ton pes) üretir." },
        { title: "Orkestrada tını karıştırma sanatı", text: "Homojen yaylıların aksine her tahta üflemelinin keskin bir spektral profili vardır ve orkestratörler bunları harmanlamayı sever: flüt + obua parlaklık ile çekirdeği; klarnet + korno ise ipeksi bir kadifeyi birleştirir." }
      ]
    }
  },
  brass: {
    title: "Bakır üflemeliler",
    subtitle: "Doğuşkanlar serisi, pistonlar, kulis ve klasik susturucular",
    intro: {
      tag: "Dudak titreşimi",
      tagClass: "tag-lilac",
      chip: "Doğuşkanlar + boru uzunluğu",
      heading: "Titreşen metal değil, dudaklarındır!",
      body: "Trompet, korno, trombon veya tubada çalıcının dudakları ağızlığa karşı canlı bir zar gibi çalışır. Hiçbir pistona basmadan bir bakır üflemeli yalnızca borusunun <strong>doğal doğuşkanlarını</strong> (borazan gibi) çalar. <strong>Pistonlar, valfler</strong> veya <strong>kulis</strong>, 12 kromatik notanın tamamını elde etmek için anında hassas boru parçaları ekler."
    },
    items: [
      {
        name: "Trompet & flügelhorn",
        tag: "Tiz bakırlar (silindirik vs. konik)",
        tagClass: "tag-peach",
        range: "Mi3 – Do6 (gerçek ses)",
        tuning: "Çoğunlukla Si♭ veya Do",
        role: "Fanfar ihtişamı, big band liderliği ve kahramanlık temaları",
        desc: "Trompet borusunun yaklaşık üçte ikisi kalaktan önce dar ve silindiriktir; bu da forte sesleri parlak, keskin ve elektrikli kılar. Kuzeni <em>flügelhorn</em> baştan sona konik olarak genişler ve aynı notaları caz baladları için ideal koyu bir kadifeye sarar.",
        demos: [
          { label: "Trompet fanfarı (armonik üçlü)", style: "brass", notes: "C4,G4,C5,E5", dur: 0.95, step: 290 }
        ]
      },
      {
        name: "Korno (Fa / Si♭ çift korno)",
        tag: "Dar konik + kalakta el",
        tagClass: "tag-sage",
        range: "Si1 – Fa5 (gerçek ses)",
        tuning: "Çift korno Fa / Si♭",
        role: "Epik film temaları ve orkestranın doğal tutkalı",
        desc: "Sarmal sarılmış uzun av kornolarından (~3,7 m boru) türemiştir. Doğuşkan serisinin üst bölgesinde gezinmesi ona tahta üflemelilerle pes bakırları kaynaştıran asil bir yuvarlaklık verir. Sağ eli kalağa sokmak tınıyı koyulaştırır veya <em>kapalı (bouché)</em> seslerin metalik keskinliğini doğurur.",
        demos: [
          { label: "Korno çağrısı (beşliler & sıcaklık)", style: "brass", notes: "F3,C4,F4,A4", dur: 1.15, step: 380 }
        ]
      },
      {
        name: "Trombon (tenor & bas)",
        tag: "Sürekli kulis (7 pozisyon)",
        tagClass: "tag-lilac",
        range: "Mi2 – Fa5 (Fa valfiyle Si1'e kadar)",
        tuning: "Transpoze değil, Do (kök ses Si♭)",
        role: "Dolgun akor halıları, akıcı glissandolar ve caz enerjisi",
        desc: "Pistonlar yerine teleskopik bir kulis silindirik boruyu 7 kromatik pozisyonda uzatır. Çalıcı her entonasyonu kulaktan incelikle ayarlar ve benzersiz kesintisiz <strong>glissandolar</strong> yapar.",
        demos: [
          { label: "Trombon dizilimi (orta-pes bakır)", style: "brass", notes: "Bb2,F3,Bb3,D4", dur: 1.05, step: 320 }
        ]
      },
      {
        name: "Tuba & öfonyum",
        tag: "Geniş konik pesler",
        tagClass: "tag-peach",
        range: "Re1 – Fa4 (kontrbas tuba Si♭0'a kadar)",
        tuning: "Fa, Mi♭, Do veya Si♭",
        role: "Görkemli derinlik ve ipeksi armonik baslar",
        desc: "Yaklaşık 5,5 metrelik geniş konik pirinç boru, hiçbir metalik sertlik olmadan şaşırtıcı derecede yumuşak, yuvarlak ve cömert bir temel üretir. Bandoda tuba ve şarkısal <em>öfonyum</em> kadifemsi bir taban kurar.",
        demos: [
          { label: "Tuba temeli (oktav + beşli)", style: "brass", notes: "F1,C2,F2", dur: 1.25, step: 420 }
        ]
      }
    ],
    extraBox: {
      heading: "Klasik susturucularla (sordino) bakırları dönüştürmek",
      facts: [
        { title: "Düz susturucu (straight mute)", text: "Alüminyum veya fiber koni: pesleri kurutur; trompet veya trombonu delici, metalik ve keskin hale getirir (caz ve film müziği)." },
        { title: "Harmon susturucu (wah-wah)", text: "Miles Davis ile efsaneleşti: kalağı kapatıp ortada yalnızca ince bir boru bırakarak samimi ve genizden bir ses verir; borunun önünde eli açıp kapatmak ünlü «wah-wah» efektini yaratır." },
        { title: "Cup & plunger susturucu", text: "Cup susturucu parlaklığı boğuk bir kadifeye yumuşatır; big band'de ise kalağın önünde lastik bir pompa (<em>plunger</em>) sallayarak bakırlar adeta «konuşturulur»." }
      ]
    }
  },
  keyboards: {
    title: "Tuşlu çalgılar",
    subtitle: "Çekiçler, mızraplar, org boruları ve elektromekanik efsaneler",
    intro: {
      tag: "Çoksesli devler",
      tagClass: "tag-peach",
      chip: "Aynı 12 tuşlu arayüz",
      heading: "Tek klavye, dört tamamen farklı akustik motor",
      body: "Piyano, klavsen, borulu org ve Fender Rhodes aynı sezgisel 12 tuşlu (7 beyaz, 5 siyah) geometriyi paylaşır; bu sayede iki el aynı anda bas, akor ve melodi çalabilir. Ancak tuşun arkasında olup bitenler birbirine zıt fiziksel mekanizmalara dayanır."
    },
    items: [
      {
        name: "Duvar piyanosu & konser kuyruklu piyano",
        tag: "Vurmalı teller (çekiç mekanizması)",
        tagClass: "tag-peach",
        range: "La0 – Do8 (88 tuş • 27,5 – 4186 Hz)",
        tuning: "Esnetilmiş eşit tampere (~230 tel)",
        role: "Klasik, caz, pop ve besteciliğin evrensel dayanağı",
        desc: "Keçe kaplı çekiçler yüksek gerilimli çelik tellere (nota başına 3 ünison tele kadar!) <strong>vurur</strong> ve serbestçe titreşmeleri için hemen geri seker. <em>Sustain (uzatma) pedalı</em> tüm susturucuları aynı anda kaldırarak vurulmayan tellerin de sempatik titreşimle tınlamasını sağlar.",
        demos: [
          { label: "Kuyruklu piyano (pedallı arpej)", style: "piano", notes: "C3,G3,E4,G4,B4,D5", dur: 1.2, step: 220 }
        ]
      },
      {
        name: "Klavsen",
        tag: "Çekmeli teller (mızrap / tüy)",
        tagClass: "tag-sage",
        range: "Fa1 – Fa6",
        tuning: "Çoğunlukla tarihsel akortlar (Werckmeister / Vallotti)",
        role: "Barok sürekli bas ve gümüşi, keskin atak",
        desc: "Çekiç yerine minik bir mızrap (eskiden kuzgun tüyü, bugün Delrin) tuşa bastığında teli <strong>çeker</strong>. Parmak gücü ses şiddetini neredeyse hiç değiştirmez: zıtlıklar register'lardan (4', 8', birleştirme) ve yazım yoğunluğundan doğar. Tiz doğuşkanlarca çok zengindir.",
        demos: [
          { label: "Klavsen çekişi", style: "cembalo", notes: "D4,F4,A4,D5,C#5,D5", dur: 0.9, step: 210 }
        ]
      },
      {
        name: "Borulu org & armonyum",
        tag: "Aerofon (rüzgâr sandığı & register'lar)",
        tagClass: "tag-lilac",
        range: "16'/32' sub-bastan (< 16 Hz!) 1' mikstürlere",
        tuning: "Ayak boyuna göre dudaklı ve dilli borular",
        role: "Sonsuz uzayan anıtsal çokseslilik",
        desc: "El klavyeleri ve ayak pedalları, basınçlı havayı yüzlerce veya binlerce kalay ve ahşap boruya gönderen valfleri açar. <em>Dudaklı register'lar</em> dev flütler gibi, <em>dilli register'lar</em> trompetler gibi tınlar. Parmak basılı kaldığı sürece her nota tam güçle sürer!",
        demos: [
          { label: "Borulu org (dolgun plenum)", style: "organ", notes: "C3,G3,C4,E4,G4", dur: 2.0, step: 0 }
        ]
      },
      {
        name: "Sahne ikonları: Fender Rhodes, Hammond B3 & Clavinet",
        tag: "Elektromekanik efsaneler",
        tagClass: "tag-sage",
        range: "73–88 tuş / armonik drawbar'lar",
        tuning: "Manyetik alıcılar, ton tekerlekleri ve modelleme",
        role: "Caz, funk, soul, gospel, rock ve modern pop",
        desc: "<strong>Fender Rhodes</strong> manyetik bobinlerin önünde rezonanslı metal çubuklara vurur: yumuşak, kristal ve neo-soul'da büyülü. <strong>Clavinet</strong> funk'ta keskinleşmek için tellere vurur. <strong>Hammond B3 orgu</strong> ise dönen bir <em>Leslie hoparlörü</em> önünde dönen ton tekerleklerinden üretilen 9 <em>drawbar</em>'ı toplar.",
        demos: [
          { label: "Drawbar'lı org dizilimi", style: "organ", notes: "G3,B3,D4,F4", dur: 1.5, step: 0 },
          { label: "Sıcak elektrik piyano dizilimi", style: "piano", notes: "F3,A3,C4,E4,G4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },
  plucked: {
    title: "Mızraplılar & gitarlar",
    subtitle: "Naylon, çelik, manyetik alıcılar, bas gitar ve konser arpı",
    intro: {
      tag: "Çekilen tel darbesi",
      tagClass: "tag-sage",
      chip: "Net atak ve doğal sönüm",
      heading: "Teli nereden çektiğin tınıyı anında şekillendirir",
      body: "Bir teli parmak ucu, tırnak veya penayla çekmek, tiz doğuşkanların kök sesten önce söndüğü net bir atak yaratır. Metalik ve keskin bir tını için <strong>köprüye yakın</strong> (<em>sul ponticello</em>) çal; arpa yakın yuvarlak bir sıcaklık için <strong>klavye üzerinden</strong> (<em>sul tasto</em>) çek."
    },
    items: [
      {
        name: "Klasik gitar (naylon) & akustik gitar (çelik)",
        tag: "Akustik rezonans gövdeleri",
        tagClass: "tag-peach",
        range: "Mi2 – Si5 (gerçek ses • +1 oktav yazılır)",
        tuning: "Standart akort: Mi2 – La2 – Re3 – Sol3 – Si3 – Mi4",
        role: "Ritim eşliği, fingerpicking, flamenko ve şarkı eşliği",
        desc: "<em>Naylon telli klasik gitarlar</em> parmak dokunuşunun sıcak yumuşaklığı ve çoksesli berraklığıyla büyüler. <em>Çelik telli akustik gitarlar</em> daha yüksek gerilime sahiptir ve parlak, tizce zengin akorlarla miksin içinden kolayca sıyrılır.",
        demos: [
          { label: "Akustik gitar arpeji", style: "guitar", notes: "E2,B2,E3,G#3,B3,E4", dur: 1.3, step: 170 }
        ]
      },
      {
        name: "Elektro gitar & sinyal zinciri",
        tag: "Manyetik alıcılar + amfi",
        tagClass: "tag-lilac",
        range: "Mi2 – Mi6 (bending ve doğuşkanlarla)",
        tuning: "Mi – La – Re – Sol – Si – Mi (ve düşürülmüş akortlar)",
        role: "Funk riff'leri, kristal temiz arpejler, crunch ve şarkısal sololar",
        desc: "Masif gövdeli bir elektro gitar tek başına çok az akustik ses çıkarır: bobinler (<em>manyetikler / pickup</em>) çelik tellerin titreşimini elektrik sinyaline dönüştürür. <strong>Single-coil</strong> manyetikler (Strat/Tele) parlak ve keskindir; çift bobinli <strong>humbucker</strong>'lar dip gürültüsünü kesip kremsi orta frekanslar verir — ardından lambalı amfi, overdrive, delay ve reverb ile şekillenir.",
        demos: [
          { label: "Temiz elektro gitar akoru", style: "guitar", notes: "A2,D3,G3,C4,E4", dur: 1.4, step: 140 }
        ]
      },
      {
        name: "Bas gitar (4, 5 telli & perdesiz)",
        tag: "Bas davul ile armoni arasındaki bağ",
        tagClass: "tag-sage",
        range: "Mi1 (5 tellide Si0) – Sol4",
        tuning: "Mi1 – La1 – Re2 – Sol2",
        role: "Bateriyle groove temeli, evrensel armonik dayanak",
        desc: "Kontrbas gibi gitarın bir oktav pesinden akortlanır ama anında temiz entonasyon için perdelidir. Parmakla çalındığında yuvarlak ve derin; penayla rock mikslerini yarar; <strong>slap &amp; pop</strong> (başparmak vuruşu + tel çekişi) ile funk'ı ateşler; perdesiz (<em>fretless</em>) halde akışkan, vokal benzeri bir vibratoyla kayar.",
        demos: [
          { label: "Bas gitar groove'u (oktav & beşli)", style: "ebass", notes: "E1,E1,G1,A1,B1,E2", dur: 0.75, step: 260 }
        ]
      },
      {
        name: "Konser arpı, mandolin, banjo & ukulele",
        tag: "Karakteristik mızraplı renkler",
        tagClass: "tag-peach",
        range: "Arp: Do♭1 – Sol♭7 (47 tel)",
        tuning: "Arp: 7 çift hareketli pedallı diyatonik düzen",
        role: "Parıltılı glissandolar, folk dokuları ve akustik ışıltılar",
        desc: "Konser arpının 47 telinden her biri kendi diyatonik notasını taşır (Do için kırmızı, Fa için mavi/siyah); yedi pedal tüm oktavları bemol, natürel veya diyeze alır. Yanı başında çift telli <em>mandolin</em>, gergin derili <em>banjo</em> ve hafif <em>ukulele</em> geleneksel müziklere, bluegrass'a ve indie pop'a imzasını atar.",
        demos: [
          { label: "Arp tarzı dökülen arpej", style: "guitar", notes: "C3,D3,E3,G3,A3,C4,D4,E4,G4", dur: 0.9, step: 110 }
        ]
      }
    ]
  },
  electronic: {
    title: "Elektronik & stüdyo",
    subtitle: "Synthesizer'lar, sampler'lar, drum machine'ler ve DAW'da miks",
    intro: {
      tag: "Ses tasarımı & prodüksiyon",
      tagClass: "tag-sage",
      chip: "Elektrofonlar & dijital",
      heading: "Fiziksel rezonanstan dalga biçimlerini doğrudan yontmaya",
      body: "Akustik çalgılar tınılarını ahşaptan, pirinçten ya da gergin deriden alır. Elektronik çalgılar ise ham elektrik veya dijital dalgalarla başlar; böylece doğuşkan zenginliğini, atak hızını ve tınının zaman içindeki evrimini hassasça şekillendirebilirsin."
    },
    items: [
      {
        name: "Çıkarımsal synthesizer'lar (analog & sanal)",
        tag: "Osilatör + filtre + zarf (ADSR)",
        tagClass: "tag-sage",
        range: "Tüm işitilebilir spektrum (20 Hz sub-bastan tizlere)",
        tuning: "Volt/oktav veya MIDI (mikroaralıklar dahil)",
        role: "Güçlü baslar, keskin lead'ler, kadifemsi analog pad'ler",
        desc: "Minimoog ile ünlenen klasik mimari: <strong>1. Osilatör (VCO)</strong> <em>testere dişi</em> (tüm doğuşkanlar: geniş ve yaylıya yakın), <em>kare/darbe dalgası</em> (tek doğuşkanlar: ahşap ve oyuk) veya <em>üçgen/sinüs</em> (saf/sub) gibi zengin dalgalar üretir. <strong>2. Filtre (VCF)</strong> <em>cutoff</em> ve <em>rezonans</em> ile parlaklığı yontar! <strong>3. Zarf (ADSR)</strong> atak, düşüş, sürdürme ve bırakmayı şekillendirir.",
        demos: [
          { label: "Testere dişi synth (armonik lead)", style: "synth-saw", notes: "C3,E3,G3,B3,C4", dur: 0.85, step: 230 },
          { label: "Sıcak analog pad", style: "synth-pad", notes: "C3,G3,B3,D4,E4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "FM, wavetable & granüler sentez",
        tag: "Dijital ses evrenleri",
        tagClass: "tag-lilac",
        range: "Kristal seslerden hareketli sinematik dokulara",
        tuning: "Örnek düzeyinde hassas / mikrotonal",
        role: "Camsı çanlar ve 80'ler elektrik piyanoları, modern baslar ve pad'ler",
        desc: "<strong>FM sentezi</strong> (Yamaha DX7'de efsaneleşen) bir dalganın frekansını ses hızında başka bir dalgayla modüle ederek filtresiz buz gibi metalik çanlar, 80'ler elektrik piyanoları ve sert baslar üretir. <strong>Wavetable</strong> synth'ler değişen dalga biçimleri arasında kayar; <strong>granüler sentez</strong> ise kayıtları 10–50 ms'lik taneciklere bölüp ses bulutları örer.",
        demos: [
          { label: "Doğuşkanlarca zengin süzülen pad", style: "synth-pad", notes: "A2,E3,G3,B3,D4", dur: 2.3, step: 0 }
        ]
      },
      {
        name: "Sampler, Mellotron & drum machine (808 / 909 / MPC)",
        tag: "Örnekleme & adım sıralayıcı",
        tagClass: "tag-peach",
        range: "Yeniden örneklemeyle tam kromatik aralık",
        tuning: "Klavye ve pad'lerde kromatik çalınabilir",
        role: "Hip-hop, house, tekno, pop beat'leri ve orkestral taslaklar",
        desc: "Bir <strong>sampler</strong> her türlü gerçek sesi (korolar, plak döngüleri, günlük sesler) yakalayıp tüm klavyeye yayar (manyetik bantlı <em>Mellotron</em> bunun öncüsüdür!). Roland <em>TR-808</em> gibi kült drum machine'ler sentetik trampetler, el çırpmaları ve cowbell'ler kazandırdı; sinüs bas davulunu uzatmak ise hip-hop ve trap'in ünlü sub-bas çizgilerini doğurdu.",
        demos: [
          { label: "808 sub-bas çizgisini dinle", style: "ebass", notes: "C1,C1,Eb1,G1,C2,G1", dur: 0.95, step: 310 }
        ]
      },
      {
        name: "DAW, sanal çalgılar & miks efektleri",
        tag: "Modern stüdyonun atölyesi",
        tagClass: "tag-sage",
        range: "Eksiksiz bilgisayar tabanlı müzik ortamı",
        tuning: "Gerçek zamanlı perde ve otomasyon",
        role: "Besteleme, düzenleme, miks ve mastering",
        desc: "Bir <em>Digital Audio Workstation (DAW)</em> kayıt cihazlarını, işlemci raflarını ve sanal orkestraları tek ekranda toplar. <strong>MIDI</strong> ile yazılım synth'lerini ve örnek kütüphanelerini yönetir, <strong>ekolayzerlerle (EQ)</strong> alanı oyar, <strong>kompresörlerle</strong> vuruculuğu dengeler ve <strong>reverb &amp; delay</strong> ile konser salonları yaratırsın.",
        demos: [
          { label: "Synth + sub katmanı", style: "synth-saw", notes: "F2,C3,A3,E4", dur: 1.6, step: 140 }
        ]
      }
    ]
  },
  ensembles: {
    title: "Orkestralar, gruplar & topluluklar",
    subtitle: "Onlarca çalgı neden birbirine karışmak yerine berrak tınlar?",
    intro: {
      tag: "Düzenleme & frekans alanı",
      tagClass: "tag-peach",
      chip: "Akustik görev paylaşımı",
      heading: "İyi bir orkestrasyonun sırrı: frekans + işlev",
      body: "80 senfoni müzisyeni ya da 5 kişilik bir rock grubu birlikte çaldığında her çalgının kendi <strong>frekans bandını</strong> (bas, orta, tiz) doldurması ve net bir <strong>ritmik veya armonik işlev</strong> üstlenmesi gerekir. Her klasik topluluk düzeni tam da bu denklemi çözmek için doğmuştur."
    },
    items: [
      {
        name: "Senfoni orkestrası (~70–100 müzisyen)",
        tag: "4 büyük aile",
        tagClass: "tag-peach",
        range: "Kontrbasın sub-pesinden pikolonun parıltısına (16 Hz – >4 kHz)",
        tuning: "Konser La4 = 440–443 Hz",
        role: "Devasa dinamik aralık ve eksiksiz orkestral palet",
        desc: "Neden 2–4 tahta veya bakır üflemeliye karşılık 50'den fazla yaylı vardır? Çünkü tek bir trompet on kemanı bastırır! Büyük yaylı grubu kesintisiz <em>halıyı</em> dokur, solo tahta üflemeliler çevik çizgiler çizer, bakırlar kahramanca zirveler kurar, timpani ve vurmalılar ise dramatik nefesi üfler.",
        demos: [
          { label: "Geniş sıcak yaylı akoru", style: "strings", notes: "C2,G2,E3,C4,G4", dur: 2.0, step: 0 },
          { label: "Bakır fanfar katmanı", style: "brass", notes: "C4,G4,C5,E5", dur: 1.1, step: 240 }
        ]
      },
      {
        name: "Oda müziği (yaylı dörtlüsü & üflemeli beşlisi)",
        tag: "Solo şeffaflığı",
        tagClass: "tag-sage",
        range: "Diyalog halindeki 4 veya 5 eşit ses",
        tuning: "Topluluk içi uyumlu saf entonasyon",
        role: "SATB vokal dörtlüsüne benzer samimi birlikte çalma",
        desc: "Klasik <strong>yaylı dörtlüsü</strong> (2 keman, viyola, çello) dört sesli bir koroyu mükemmel biçimde yansıtır: bütünlüklü tını, cerrahi netlik ve esnek kontrpuan. <strong>Üflemeli beşlisi</strong> (flüt, obua, klarnet, fagot + korno!) ise tam tersi meydan okumayı üstlenir: kornonun sıcaklığı sayesinde kaynaşan beş zıt renk.",
        demos: [
          { label: "Yaylı dörtlüsü arpeji (çello → keman)", style: "strings", notes: "C2,G3,D4,E4", dur: 1.5, step: 260 }
        ]
      },
      {
        name: "Big band & caz topluluğu",
        tag: "Ritim bölümü vs. üflemeli grupları",
        tagClass: "tag-lilac",
        range: "Sıkı blok akor yazımı (block voicings)",
        tuning: "Swing cümleleme ve soru-cevap",
        role: "Üst üste bakırların altında itici walking bass ve bateri",
        desc: "Big band iki kutup üzerinde yükselir: <strong>ritim bölümü</strong> (bateri, kontrbas/bas, piyano, gitar) kesintisiz swing ve armoni sağlar; <strong>üflemeliler</strong> (5 saksafon, 4 trombon, 4 trompet) ise canlı bir çağrı-yanıt içinde sıkı çevrimler (<em>drop-2</em> gibi) paslaşır.",
        demos: [
          { label: "Üflemeli grubu caz dizilimi", style: "brass", notes: "Bb2,Ab3,C4,D4,G4", dur: 1.7, step: 0 }
        ]
      },
      {
        name: "Modern pop, rock & funk grubu",
        tag: "Net ayrılmış frekans şeritleri",
        tagClass: "tag-peach",
        range: "Sub-bas temelinden vokal varlığının havasına",
        tuning: "Bas davul ile bas gitar arasında sıkı pocket",
        role: "Sağlam groove, akılda kalıcı nakaratlar ve öne çıkan vokal",
        desc: "<strong>Bas davul + bas gitar (veya 808)</strong> pes temeli (40–250 Hz) mühürler. <strong>Trampet &amp; hi-hat</strong> ritmik çerçeveyi yontar. <strong>Gitarlar, tuşlular veya synth'ler</strong> orta bölgeyi (300 Hz – 3 kHz) doldurur ve <strong>ana vokalin</strong> (1–4 kHz) nefes alması için kıtalarda hafifçe geri çekilir.",
        demos: [
          { label: "Grup dizilimi (bas + klavye)", style: "piano", notes: "A2,E3,G3,B3,C#4", dur: 1.6, step: 110 }
        ]
      }
    ]
  }
};

function renderInstrumentModuleHTML_TR(refKey) {
  const mod = INSTRUMENT_MODULES_DATA_TR[refKey];
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
        <span class="inst-meta-pill">Ses aralığı: ${item.range}</span>
        <span class="inst-meta-pill">${item.tuning}</span>
      </div>
      <p><strong>İşlev:</strong> ${item.role}</p>
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
        <span class="k-card-tag tag-lilac">Teknik &amp; dinleme ipuçları</span>
        <span class="k-ratio-chip">Derinleşmek için</span>
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

const MODES_ENCYCLOPEDIA_TR = [
  {
    id: "lydian",
    name: "Lidyen",
    family: "major",
    familyLabel: "Majör ailesi",
    brightness: "1 / 7 • Işıltılı & ferah",
    badgeClass: "badge-peach",
    rootLabel: "Do",
    stammton: "Majör dizinin 4. modu (Fa'dan başlayan Do majör gibi)",
    formula: "1 · 2 · 3 · #4 · 5 · 6 · 7",
    steps: "T – T – T – ½T – T – T – ½T",
    charNote: "Artık dörtlü (#4, ör. Do üzerinde Fa♯)",
    vamp: "I – II (Do – Re)",
    desc: "Yedi diyatonik modun en parlağı. 4. dereceyi #4'e yükseltmek büyük üçlüyle yarım tonluk sürtünmeyi ortadan kaldırır; lidyene o düşsel, süzülen ve sinematik hafifliğini verir.",
    usage: "<strong>Müzikal kullanım:</strong> Sinemada hayranlık ve bilimkurgu için çok sevilir (John Williams <em>E.T.</em>, <em>The Simpsons</em> jeneriği, Danny Elfman), enstrümantal rock'ta (Joe Satriani, Steve Vai) ve cazdaki askılı Maj7(#11) akorlarında.",
    notes: "C4,D4,E4,F#4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4", "B4"], ["D3", "F#4", "A4", "C5"]]
  },
  {
    id: "ionian",
    name: "İyonik (majör)",
    family: "major",
    familyLabel: "Majör ailesi",
    brightness: "2 / 7 • Dengeli & berrak",
    badgeClass: "badge-sage",
    rootLabel: "Do",
    stammton: "1. mod: doğal majör dizimiz (Do majör)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · 7",
    steps: "T – T – ½T – T – T – T – ½T",
    charNote: "Tam dörtlü (4) + keskin yeden ses (7 → 1)",
    vamp: "I – IV – V – I",
    desc: "Klasik majör mod. 4. ve 7. dereceler arasındaki triton, tonik ve üçlüye netçe çözülerek kararlılık, berraklık ve evrensel bir dinginlik hissi yaratır.",
    usage: "<strong>Müzikal kullanım:</strong> Batı tonal armonisinin, klasik senfonilerin, parlak pop nakaratlarının ve neşe ile açıklığın egemen olduğu halk şarkılarının temel direği.",
    notes: "C4,D4,E4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "E4", "G4"], ["F3", "A4", "C5"], ["G3", "B4", "D5"], ["C3", "E4", "G4"]]
  },
  {
    id: "mixolydian",
    name: "Miksolidyen",
    family: "major",
    familyLabel: "Majör ailesi",
    brightness: "3 / 7 • Topraksı & rahat",
    badgeClass: "badge-peach",
    rootLabel: "Do",
    stammton: "Majör dizinin 5. modu (Sol'den başlayan Do majör gibi)",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · b7",
    steps: "T – T – ½T – T – T – ½T – T",
    charNote: "Küçük yedili (b7, ör. Do üzerinde Si♭)",
    vamp: "I – bVII (Do – Si♭)",
    desc: "Klasik yeden sesi rahat bir b7 ile değiştiren majör mod; bu dokunuş ona anında blues, rock ve özgüvenli bir hava kazandırır.",
    usage: "<strong>Müzikal kullanım:</strong> Klasik rock, funk, Kelt folk'u ve reggae'nin kralı (The Beatles <em>Norwegian Wood</em>, AC/DC, Deep Purple) ve cazda dominant yedili (V7) akorlarının gözde dizisi.",
    notes: "C4,D4,E4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "E4", "G4", "Bb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "dorian",
    name: "Doryen",
    family: "minor",
    familyLabel: "Minör ailesi",
    brightness: "4 / 7 • Kadifemsi & groovy",
    badgeClass: "badge-lilac",
    rootLabel: "Do",
    stammton: "Majör dizinin 2. modu (Re'den başlayan Do majör gibi)",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · b7",
    steps: "T – ½T – T – T – T – ½T – T",
    charNote: "Minörde doğal büyük altılı (♮6, ör. Do üzerinde La)",
    vamp: "i – IV (Dom – Fa)",
    desc: "Parlaklık spektrumunun tam ortasında: ruh dolu bir büyük altılıyla (♮6) aydınlanan küçük üçlü ve küçük yedili. Zarif, akıcı, asla ağlak değil: saf hareket.",
    usage: "<strong>Müzikal kullanım:</strong> Funk, soul, modal caz ve rock'ın tartışmasız şampiyonu (Miles Davis <em>So What</em>, Santana <em>Oye Cómo Va</em>, Daft Punk <em>Get Lucky</em>, Pink Floyd) ve Kelt ezgileri.",
    notes: "C4,D4,Eb4,F4,G4,A4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4", "Bb4"], ["F3", "A4", "C5"]]
  },
  {
    id: "aeolian",
    name: "Eolyen (doğal minör)",
    family: "minor",
    familyLabel: "Minör ailesi",
    brightness: "5 / 7 • Derin & melankolik",
    badgeClass: "badge-sage",
    rootLabel: "Do",
    stammton: "Majör dizinin 6. modu (La'dan başlayan Do majör gibi)",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · b7",
    steps: "T – ½T – T – T – ½T – T – T",
    charNote: "Küçük altılı (b6, ör. La♭) + küçük yedili (b7)",
    vamp: "i – bVI – bVII (Dom – La♭ – Si♭)",
    desc: "Doğal minör. 6. dereceyi beşlinin bir yarım ton üstüne indirmek (b6) duygu yoğunluğu, dramatik nefes ve yumuşak bir nostalji uyandırır.",
    usage: "<strong>Müzikal kullanım:</strong> Rock baladlarında, minör popta (Adele, <em>All Along the Watchtower</em>), R&amp;B'de ve epik fragmanlarda her yerde. Doryen ♮6'nın aksine b6 yumuşakça beşliye doğru iç çeker.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Ab3", "C4", "Eb4"], ["Bb3", "D4", "F4"]]
  },
  {
    id: "phrygian",
    name: "Frigyen",
    family: "minor",
    familyLabel: "Minör ailesi",
    brightness: "6 / 7 • Koyu & hipnotik",
    badgeClass: "badge-lilac",
    rootLabel: "Do",
    stammton: "Majör dizinin 3. modu (Mi'den başlayan Do majör gibi)",
    formula: "1 · b2 · b3 · 4 · 5 · b6 · b7",
    steps: "½T – T – T – T – ½T – T – T",
    charNote: "Toniğin hemen üstündeki küçük ikili (b2, ör. Re♭ → Do)",
    vamp: "i – bII (Dom – Re♭)",
    desc: "Toniğin hemen bir yarım ton üstüne sürtünme koymak anında gizem ve İspanyol-Doğu esintisi yaratır. O b2 karşı konulmaz biçimde kök sese doğru eğilir.",
    usage: "<strong>Müzikal kullanım:</strong> Flamenkonun ruhu (çoğunlukla büyük üçlüyle <em>frigyen dominant</em> halinde), metal ve djent'in (Metallica), karanlık trap'in ve yüksek gerilimli filmlerin vazgeçilmezi.",
    notes: "C4,Db4,Eb4,F4,G4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "locrian",
    name: "Lokriyen",
    family: "minor",
    familyLabel: "Minör ailesi",
    brightness: "7 / 7 • Eksik & dengesiz",
    badgeClass: "badge-lilac",
    rootLabel: "Do",
    stammton: "Majör dizinin 7. modu (Si'den başlayan Do majör gibi)",
    formula: "1 · b2 · b3 · 4 · b5 · b6 · b7",
    steps: "½T – T – T – ½T – T – T – T",
    charNote: "Eksik beşli (b5, ör. Sol♭) + b2",
    vamp: "i° – bII (Dom7b5 – Re♭)",
    desc: "Kendi kök sesi üzerinde kararlı bir tam beşlisi bulunmayan tek diyatonik mod. Bunun yerine tonik akorunun kendisi eksik / yarı eksiktir (m7b5) ve tedirginlikle yüklüdür.",
    usage: "<strong>Müzikal kullanım:</strong> Tüm bir parçanın tonu olarak nadirdir (ör. Björk <em>Army of Me</em>, progresif metal), ama cazda yarı eksik akorlar (minör ii–V–i'deki ii°7) ve gerilim sahnelerinde vazgeçilmezdir.",
    notes: "C4,Db4,Eb4,F4,Gb4,Ab4,Bb4,C5",
    vampChords: [["C3", "Eb4", "Gb4", "Bb4"], ["Db3", "F4", "Ab4"]]
  },
  {
    id: "harmonic-minor",
    name: "Armonik minör (ek varyant)",
    family: "variant",
    familyLabel: "Minör varyantı",
    brightness: "Dramatik • klasik, neoklasik & doğu ezgisi",
    badgeClass: "badge-peach",
    rootLabel: "Do",
    stammton: "7. derecesi yeden sese yükseltilmiş (#7) doğal minör",
    formula: "1 · 2 · b3 · 4 · 5 · b6 · #7",
    steps: "T – ½T – T – T – ½T – 1½ – ½T",
    charNote: "Büyük yeden ses (7) + artık ikili atlayışı (b6 → 7, 3 yarım ton!)",
    vamp: "i – V7 (Dom – Sol7)",
    desc: "Eolyenin karanlık b6'sını parlak bir büyük yeden sesle (7) birleştirir. İkisi arasında açılan 3 yarım tonluk ifadeli atlayış anında barok dramı, tangoyu veya Doğu süslemelerini çağrıştırır.",
    usage: "<strong>Müzikal kullanım:</strong> Minör tonlara gerçek bir majör dominant V7 verir (Bach, Mozart, flamenko, Yngwie Malmsteen tarzı neoklasik metal). 5. modu <em>frigyen dominant</em>'ı (Hicaz rengi) üretir.",
    notes: "C4,D4,Eb4,F4,G4,Ab4,B4,C5",
    vampChords: [["C3", "Eb4", "G4"], ["G3", "B4", "D5", "F5"]]
  },
  {
    id: "melodic-minor",
    name: "Melodik minör (caz minörü)",
    family: "variant",
    familyLabel: "Minör varyantı",
    brightness: "Zarif • kara film, modern caz & fusion",
    badgeClass: "badge-sage",
    rootLabel: "Do",
    stammton: "Yalnızca üçlüsü indirilmiş (b3) majör diziyle aynı",
    formula: "1 · 2 · b3 · 4 · 5 · 6 · 7",
    steps: "T – ½T – T – T – T – T – ½T",
    charNote: "Büyük altılı (♮6) ve yeden sesle (7) birleşen b3",
    vamp: "imMaj7 – IV7 (DomMaj7 – Fa7)",
    desc: "Kökeninde armonik minörün geniş atlayışını yumuşatmak için çıkışta kullanılır (inişte doğal minöre dönülürdü). Modern caz ise bu yükseltilmiş biçimi bağımsız bir armoni evreni olarak her iki yönde de korur.",
    usage: "<strong>Müzikal kullanım:</strong> O gizemli kara film rengi (mMaj7) ile lidyen dominant (4. mod) ve altere dizi (7. mod) gibi temel caz renklerinin ana dizisi.",
    notes: "C4,D4,Eb4,F4,G4,A4,B4,C5",
    vampChords: [["C3", "Eb4", "G4", "B4"], ["F3", "A4", "C5", "Eb5"]]
  }
];
function renderModesReferenceHTML_TR(familyFilter = "all") {
  const list = MODES_ENCYCLOPEDIA_TR.filter(m => familyFilter === "all" || m.family === familyFilter);

  const introHeader = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">Temel ilke</span>
        <span class="k-ratio-chip">İlgili vs. paralel</span>
      </div>
      <h4>Mod tam olarak nedir?</h4>
      <p>
        Bir <strong>mod</strong>, birebir aynı notaları kullanıp başka bir notayı <strong>dinginlik merkezi (tonik)</strong> seçtiğinde doğar. Sadece piyanonun beyaz tuşlarında kal (Do majör notaları); her başlangıç noktası yeni bir tam-yarım ton dizilimi çizer: <code>Re</code>'den başla <em>doryen</em>, <code>Mi</code>'den <em>frigyen</em>, <code>Fa</code>'dan <em>lidyen</em>, <code>Sol</code>'dan <em>miksolidyen</em>, <code>La</code>'dan <em>eolyen</em> veya <code>Si</code>'den <em>lokriyen</em> elde edersin.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-sage">
          <h5>1. İlgili yaklaşım (aynı tuşlar)</h5>
          <p>Klavyede pratiktir: «Re doryen, Do majörle aynı tuşları kullanır.» Başlangıçta kulağı biraz yanıltabilir çünkü Do hâlâ çekim uygular.</p>
        </div>
        <div class="k-compare-box is-peach">
          <h5>2. Paralel yaklaşım (aynı kök ses!)</h5>
          <p><strong>Dinlemenin anahtarı:</strong> 7 modun tamamını <code>Do</code>'dan başlayarak çal! Tek bir ayırt edici nota modun rengini anında ele verir (ör. <code>Do → Fa♯</code> = lidyen, <code>Do → Si♭</code> = miksolidyen).</p>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">Modal parlaklık spektrumu</span>
        <span class="k-ratio-chip">Açık → koyu</span>
      </div>
      <h4>En parlaktan en koyuya sıralama (beşliler çemberine göre)</h4>
      <p>
        7 kilise modunu 1–7 derecelerine göre değil en ışıltılıdan en karanlığa doğru sırala: her adımda <strong>yalnızca tek bir nota bir yarım ton iner</strong>, tam olarak beşliler çemberi sırasıyla:
      </p>
      <div class="mode-spectrum-strip">
        <span class="mode-spec-chip is-bright">1. Lidyen (#4)</span>
        <span class="mode-spec-chip">2. İyonik</span>
        <span class="mode-spec-chip">3. Miksolidyen (b7)</span>
        <span class="mode-spec-chip">4. Doryen (b3, b7)</span>
        <span class="mode-spec-chip">5. Eolyen (+b6)</span>
        <span class="mode-spec-chip">6. Frigyen (+b2)</span>
        <span class="mode-spec-chip is-dark">7. Lokriyen (+b5)</span>
      </div>
    </article>

    <div class="k-filter-row" aria-label="Modları filtrele">
      <button class="k-filter-pill ${familyFilter === "all" ? "active" : ""}" data-mfilter="all">Tümü (9)</button>
      <button class="k-filter-pill ${familyFilter === "major" ? "active" : ""}" data-mfilter="major">Majör ailesi (3)</button>
      <button class="k-filter-pill ${familyFilter === "minor" ? "active" : ""}" data-mfilter="minor">Minör ailesi (4)</button>
      <button class="k-filter-pill ${familyFilter === "variant" ? "active" : ""}" data-mfilter="variant">Minör varyantları (2)</button>
    </div>
  `;

  const cards = list.map(m => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${m.family === "major" ? "tag-peach" : m.family === "minor" ? "tag-lilac" : "tag-sage"}">${m.familyLabel} • ${m.brightness}</span>
        <span class="k-ratio-chip">${m.formula}</span>
      </div>
      <h4>${m.name} (${m.rootLabel} örneği)</h4>
      <p class="k-char">${m.stammton}</p>
      <p><strong>Karakteristik nota:</strong> ${m.charNote}<br><strong>Yapı:</strong> <code>${m.steps}</code></p>
      <p>${m.desc}</p>
      <p>${m.usage}</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-mode-scale="${m.id}">▶ Dizi (${m.rootLabel})</button>
        <button class="btn-tool" data-play-mode-vamp="${m.id}">▶ Döngü: ${m.vamp}</button>
      </div>
    </article>
  `).join("");

  const tipsCard = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">Bestecilik &amp; modal armoni</span>
        <span class="k-ratio-chip">Modal merkezi korumak</span>
      </div>
      <h4>İstemeden majöre kaymadan modal yazmak</h4>
      <ul class="k-physics-list">
        <li><strong>Ana dizinin tritonundan kaçın:</strong> Do majör notalarında <code>Fa</code> ve <code>Si</code>, kulağı hemen Do'ya çeken Sol7 tritonunu kurar. Re doryen veya Sol miksolidyen mi besteliyorsun? Modun merkezini korumak için Sol7 → Do üzerinde ısrar etmekten kaçın.</li>
        <li><strong>İki akorlu döngülere yaslan:</strong> Uzun işlevsel kadanslar yerine parçayı tonik ile <strong>karakteristik notayı</strong> içeren komşu akor arasında nefes aldır (ör. Do doryende <code>Dom – Fa</code>, parlak <code>La</code>'yı parlatır).</li>
        <li><strong>Parçayı bir dem sesiyle (pedal) sabitle:</strong> Basta boş bir beşli tutmak modal merkezi anında kilitler: her karakteristik aralık bunun üzerinde hemen öne çıkar.</li>
      </ul>
    </article>
  `;

  return introHeader + `<div class="knowledge-list">${cards}</div>` + tipsCard;
}

const KEYS_CIRCLE_DATA_TR = [
  {
    id: "key-0",
    group: "neutral",
    sigBadge: "0 değiştirici",
    majorName: "Do majör",
    minorName: "La minör",
    rootMidi: 60,
    minorMidi: 57,
    accidentalList: "Diyez veya bemol yok (yalnızca beyaz tuşlar)",
    chords: "I Do · ii Rem · iii Mim · IV Fa · V Sol · vi Lam",
    instrumentTip: "Piyanoda, blok flütte ve ses ısıtmada klasik başlangıç noktası"
  },
  {
    id: "key-1s",
    group: "sharp",
    sigBadge: "1 ♯",
    majorName: "Sol majör",
    minorName: "Mi minör",
    rootMidi: 55,
    minorMidi: 52,
    accidentalList: "1♯: Fa♯ (Sol'e giden yeden ses)",
    chords: "I Sol · ii Lam · iii Sim · IV Do · V Re · vi Mim",
    instrumentTip: "Yaylılar (boş teller Sol/Re/La/Mi) ve akustik gitar tarafından çok sevilir"
  },
  {
    id: "key-2s",
    group: "sharp",
    sigBadge: "2 ♯",
    majorName: "Re majör",
    minorName: "Si minör",
    rootMidi: 62,
    minorMidi: 59,
    accidentalList: "2♯: Fa♯, Do♯",
    chords: "I Re · ii Mim · iii Fa♯m · IV Sol · V La · vi Sim",
    instrumentTip: "Parlak ve şenlikli orkestra tonu (barok trompetler, keman, çello)"
  },
  {
    id: "key-3s",
    group: "sharp",
    sigBadge: "3 ♯",
    majorName: "La majör",
    minorName: "Fa♯ minör",
    rootMidi: 57,
    minorMidi: 54,
    accidentalList: "3♯: Fa♯, Do♯, Sol♯",
    chords: "I La · ii Sim · iii Do♯m · IV Re · V Mi · vi Fa♯m",
    instrumentTip: "Hem gitarda hem yaylılarda açık, ışıltılı ve akıcı"
  },
  {
    id: "key-4s",
    group: "sharp",
    sigBadge: "4 ♯",
    majorName: "Mi majör",
    minorName: "Do♯ minör",
    rootMidi: 64,
    minorMidi: 61,
    accidentalList: "4♯: Fa♯, Do♯, Sol♯, Re♯",
    chords: "I Mi · ii Fa♯m · iii Sol♯m · IV La · V Si · vi Do♯m",
    instrumentTip: "Elektro gitar, blues ve rock'ın şaşmaz imzası (boş kalın Mi teli)"
  },
  {
    id: "key-5s",
    group: "sharp",
    sigBadge: "5 ♯ / 7 ♭",
    majorName: "Si majör (= Do♭ majör)",
    minorName: "Sol♯ minör (= La♭ minör)",
    rootMidi: 59,
    minorMidi: 56,
    accidentalList: "5♯: Fa♯, Do♯, Sol♯, Re♯, La♯ (7♭'li Do♭ majörün anarmoniği)",
    chords: "I Si · ii Do♯m · iii Re♯m · IV Mi · V Fa♯ · vi Sol♯m",
    instrumentTip: "5 siyah tuşun hepsi elin doğal şekline uyduğu için piyanoda şaşırtıcı biçimde rahattır"
  },
  {
    id: "key-6",
    group: "sharp",
    sigBadge: "6 ♯ / 6 ♭",
    majorName: "Fa♯ majör / Sol♭ majör",
    minorName: "Re♯ minör / Mi♭ minör",
    rootMidi: 54,
    minorMidi: 51,
    accidentalList: "6♯ (Fa♯, Do♯, Sol♯, Re♯, La♯, Mi♯) veya 6♭ (Si♭, Mi♭, La♭, Re♭, Sol♭, Do♭)",
    chords: "I Fa♯/Sol♭ · ii Sol♯m/La♭m · IV Si/Do♭ · V Do♯/Re♭ · vi Re♯m/Mi♭m",
    instrumentTip: "Çemberde Do majörün tam karşısında (triton kutbu!). Anarmonik kavşak"
  },
  {
    id: "key-5f",
    group: "flat",
    sigBadge: "5 ♭ / 7 ♯",
    majorName: "Re♭ majör (= Do♯ majör)",
    minorName: "Si♭ minör (= La♯ minör)",
    rootMidi: 61,
    minorMidi: 58,
    accidentalList: "5♭: Si♭, Mi♭, La♭, Re♭, Sol♭ (7♯'li Do♯ majörün anarmoniği)",
    chords: "I Re♭ · ii Mi♭m · iii Fam · IV Sol♭ · V La♭ · vi Si♭m",
    instrumentTip: "Romantik piyanoda, soul ve caz baladlarında çok sevilir (siyah tuşlar altında kadifemsi)"
  },
  {
    id: "key-4f",
    group: "flat",
    sigBadge: "4 ♭",
    majorName: "La♭ majör",
    minorName: "Fa minör",
    rootMidi: 56,
    minorMidi: 53,
    accidentalList: "4♭: Si♭, Mi♭, La♭, Re♭",
    chords: "I La♭ · ii Si♭m · iii Dom · IV Re♭ · V Mi♭ · vi Fam",
    instrumentTip: "Caz standartlarının, üflemeli armonilerinin ve R&B/pop baladlarının büyük yıldızı"
  },
  {
    id: "key-3f",
    group: "flat",
    sigBadge: "3 ♭",
    majorName: "Mi♭ majör",
    minorName: "Do minör",
    rootMidi: 63,
    minorMidi: 60,
    accidentalList: "3♭: Si♭, Mi♭, La♭",
    chords: "I Mi♭ · ii Fam · iii Solm · IV La♭ · V Si♭ · vi Dom",
    instrumentTip: "Kahramanca senfonik ton (Beethoven'ın Eroica'sı); alto saksafon ve bakırlar için ideal"
  },
  {
    id: "key-2f",
    group: "flat",
    sigBadge: "2 ♭",
    majorName: "Si♭ majör",
    minorName: "Sol minör",
    rootMidi: 58,
    minorMidi: 55,
    accidentalList: "2♭: Si♭, Mi♭",
    chords: "I Si♭ · ii Dom · iii Rem · IV Mi♭ · V Fa · vi Solm",
    instrumentTip: "Cazın, big band'lerin, bandoların ve Si♭ trompet ile klarnetlerin kraliçe tonu"
  },
  {
    id: "key-1f",
    group: "flat",
    sigBadge: "1 ♭",
    majorName: "Fa majör",
    minorName: "Re minör",
    rootMidi: 53,
    minorMidi: 62,
    accidentalList: "1♭: Si♭ (natürel Si, Si♭'e iner)",
    chords: "I Fa · ii Solm · iii Lam · IV Si♭ · V Do · vi Rem",
    instrumentTip: "Yumuşak ve pastoral tını; kornolar, flütler ve korolar için doğal ve rahat ses aralığı"
  }
];

function renderKeysReferenceHTML_TR(circleFilter = "all") {
  const list = KEYS_CIRCLE_DATA_TR.filter(k => circleFilter === "all" || k.group === circleFilter);

  const theoryIntro = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">1. Temel kavram</span>
        <span class="k-ratio-chip">Tonaliteler &amp; donanımlar</span>
      </div>
      <h4>Dizi vs. tonalite: Bir tonalite gerçekte ne yapar?</h4>
      <p>
        Bir <strong>dizi (gam)</strong> yalnızca sıralı bir nota listesidir (ör. Do–Re–Mi–Fa–Sol–La–Si–Do). Bir <strong>tonalite (ton)</strong> ise bir merkez etrafındaki tüm <em>manyetik çekim sistemini</em> tanımlar: dinginlik noktasını (<strong>tonik / kök ses</strong>), rengi (parlak <strong>majör</strong> vs. derin <strong>minör</strong>) ve <strong>donanım</strong> (♯ veya ♭) aracılığıyla kalıcı değiştiricileri belirler.
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Donanımlar neden vardır?</strong>
          Her majör dizi birebir aynı aralık kalıbını gerektirir: <code>T – T – Y – T – T – T – Y</code> (yarım tonlar 3–4 ve 7–8 arasında). Do yerine <code>Sol</code>'den başlarsan 7. derece (<code>Fa</code>) fazla pes kalır: yeden sesi geri kazanmak için onu <code>Fa♯</code>'e yükseltmek gerekir!
        </div>
        <div class="physics-fact-item">
          <strong>Donanım vs. geçici değiştirici</strong>
          Anahtarın hemen yanına konan <strong>donanım</strong> tüm parça boyunca geçerlidir. Ölçü ortasındaki bir <strong>geçici değiştirici</strong> ise yalnızca o ölçü çizgisine kadar geçici bir renk katar.
        </div>
      </div>
    </article>

    <div class="k-sibling-bar">
      <span><strong>Gözünle &amp; kulağınla keşfet:</strong> Canlı akorlar ve modülasyonlarla etkileşimli Beşliler Çemberi çarkını aç.</span>
      <button type="button" class="btn-tool" data-jump-ref="circle-of-fifths">Beşliler Çemberini aç →</button>
    </div>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. Beşliler Çemberinin mantığı</span>
        <span class="k-ratio-chip">3:2 → 12 tonalite</span>
      </div>
      <h4>12 tonalite neden kusursuz bir saat kadranı oluşturur?</h4>
      <p>
        Oktavdan (2:1) hemen sonra <strong>tam beşli (3:2)</strong> müzikteki en güçlü armonik bağdır. Saat yönünde çıkıcı beşlilerle ilerle (<code>Do → Sol → Re → La → Mi → Si → Fa♯</code>): her adım yeni bir <strong>diyez (♯)</strong> ekler. Saat yönünün tersinde çıkıcı dörtlülerle ilerle (<code>Do → Fa → Si♭ → Mi♭ → La♭ → Re♭ → Sol♭</code>): her adım yeni bir <strong>bemol (♭)</strong> ekler.
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Saat yönü: Diyezli tonaliteler (♯)</h5>
          <p><strong>Ton sırası:</strong> <em>Sol, Re, La, Mi, Si, Fa♯</em>.<br><strong>Diyez sırası:</strong> <code>Fa♯ – Do♯ – Sol♯ – Re♯ – La♯ – Mi♯</code> (<em>Fa Do Sol Re La Mi Si</em>: son diyez her zaman toniğin bir yarım ton altındaki yeden sestir!).</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Saat yönünün tersi: Bemollü tonaliteler (♭)</h5>
          <p><strong>Ton sırası:</strong> <em>Fa, Si♭, Mi♭, La♭, Re♭, Sol♭</em>.<br><strong>Bemol sırası:</strong> <code>Si♭ – Mi♭ – La♭ – Re♭ – Sol♭ – Do♭</code> (<em>Si Mi La Re Sol Do Fa</em>). İpucu: <strong>sondan bir önceki bemol</strong> majör tonun adını verir!</p>
        </div>
      </div>
      <p class="k-tip"><strong>Pisagor koması &amp; anarmoni:</strong> 12 saf 3:2 beşliyi üst üste koymak 7 oktavı yaklaşık 23,5 sent aşar (<em>Pisagor koması</em>). Modern <strong>eşit tampere sistem</strong> bu minik farkı 12 yarım tona dağıtır; böylece <code>Fa♯ majör</code> (6♯) ve <code>Sol♭ majör</code> (6♭) piyanoda birebir aynı tuşlara düşer.</p>
    </article>

    <div class="section-heading-row">
      <h2 class="section-heading">3. 12 tonalitenin tam atlası</h2>
    </div>

    <div class="k-filter-row" aria-label="Tonaliteleri donanıma göre filtrele">
      <button class="k-filter-pill ${circleFilter === "all" ? "active" : ""}" data-kfilter="all">12 tonalitenin tümü</button>
      <button class="k-filter-pill ${circleFilter === "neutral" ? "active" : ""}" data-kfilter="neutral">Do / Lam (0 değ.)</button>
      <button class="k-filter-pill ${circleFilter === "sharp" ? "active" : ""}" data-kfilter="sharp">Diyezler (♯)</button>
      <button class="k-filter-pill ${circleFilter === "flat" ? "active" : ""}" data-kfilter="flat">Bemoller (♭)</button>
    </div>
  `;

  const keyCards = list.map(k => `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag ${k.group === "neutral" ? "tag-sage" : k.group === "sharp" ? "tag-peach" : "tag-lilac"}">${k.sigBadge}</span>
        <span class="k-ratio-chip">${k.majorName} / ${k.minorName}</span>
      </div>
      <h4>${k.majorName} &amp; ilgili ${k.minorName}</h4>
      <p><strong>Donanım:</strong> ${k.accidentalList}</p>
      <p><strong>Diyatonik akorlar:</strong> <code>${k.chords}</code></p>
      <p class="k-tip">${k.instrumentTip}</p>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-key-cadence="${k.rootMidi}" data-key-mode="major">▶ ${k.majorName.split(" ")[0]} majör kadansı</button>
        <button class="btn-tool" data-play-key-cadence="${k.minorMidi}" data-key-mode="minor">▶ ${k.minorName}</button>
      </div>
    </article>
  `).join("");

  const extraSections = `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. Minörün 3 yüzü</span>
        <span class="k-ratio-chip">Neden 3 minör dizi var?</span>
      </div>
      <h4>Doğal, armonik &amp; melodik minör (La minörde)</h4>
      <p>
        Majör tek bir biçimde kalırken, minör müzik üç tamamlayıcı varyant kullanır; çünkü doğal minörde toniğin bir yarım ton altında bir yeden ses yoktur (<code>Sol → La</code> bir tam tondur, <code>Sol♯ → La</code> kadar keskin değildir):
      </p>
      <ul class="k-physics-list">
        <li><strong>Doğal minör (eolyen):</strong> İlgili majörünün donanımını birebir alır (<code>La–Si–Do–Re–Mi–Fa–Sol–La</code>). Folk, yalın ve akıcı.</li>
        <li><strong>Armonik minör:</strong> V. derece gerçek bir <strong>majör dominant (Mi7)</strong> olsun diye 7. dereceyi yükseltir (<code>Sol → Sol♯</code>). <code>Fa</code> ile <code>Sol♯</code> arasında ifadeli 3 yarım tonluk bir aralık doğurur.</li>
        <li><strong>Melodik minör:</strong> Şarkıcılar için o atlayışı yumuşatmak adına çıkışta 6. dereceyi de yükseltir (<code>Fa → Fa♯, Sol → Sol♯</code>); klasik müzik inişte genellikle doğal minöre dönerken caz her iki yönde de yükseltilmiş biçimi korur.</li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G4,A4" data-dur="0.45" data-step="320">▶ Doğal La minör</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F4,G#4,A4" data-dur="0.45" data-step="320">▶ Armonik La minör</button>
        <button class="btn-tool" data-play-inst="true" data-style="piano" data-notes="A3,B3,C4,D4,E4,F#4,G#4,A4" data-dur="0.45" data-step="320">▶ Melodik La minör</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Tonalite ilişkileri &amp; modülasyonlar</span>
        <span class="k-ratio-chip">Ton değiştirmek</span>
      </div>
      <h4>Tonaliteler nasıl iletişim kurar &amp; nasıl doğalca modüle olur?</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>İlgili minör / majör (3 yarım ton aralık)</strong>
          Birebir aynı notaları ve donanımı paylaşırlar: <code>Do majör ↔ La minör</code>, <code>Sol majör ↔ Mi minör</code>. Bir merkezden diğerine geçmek doğal ve pürüzsüz duyulur.
        </div>
        <div class="physics-fact-item">
          <strong>Paralel / adaş majör / minör (aynı tonik)</strong>
          Aynı toniği korur ama majör ve minörü değiştirirler: <code>Do majör ↔ Do minör</code> (3 bemol fark!). Ünlü «Pikardi üçlüsü» gibi teatral dönüşler sunar.
        </div>
        <div class="physics-fact-item">
          <strong>Yakın tonaliteler (çemberde komşu)</strong>
          Saat yönünde veya tersinde bir adım uzaktaki komşular (<code>Do majör ↔ Sol</code> veya <code>Fa</code>) yalnızca tek bir notada farklılaşır. Ortak (pivot) akorlar (<code>Lam</code> gibi) fark edilmeyen geçişler sağlar.
        </div>
        <div class="physics-fact-item">
          <strong>Kromatik mediyantlar &amp; tam ton modülasyonu</strong>
          Bir üçlü kaymak (<code>Do → La♭</code> veya <code>Mi</code>) birden fazla değiştiriciyi anında değiştirerek sinematik bir etki yaratır; son nakaratta yarım veya tam ton yukarı çıkmak ise enerjiyi katlar.
        </div>
      </div>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-custom="key-variant">▶ Adaş Do ↔ Dom</button>
        <button class="btn-tool" data-play-custom="key-mediant">▶ Mediyant Do → La♭ → Do</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">6. Transpoze çalgılar &amp; tonalite rengi</span>
        <span class="k-ratio-chip">Topluluk pratiği</span>
      </div>
      <h4>Üflemeliler neden piyanoyla aynı donanımı okumaz?</h4>
      <p>
        Piyano, gitar, yaylılar ve flüt <strong>Do (gerçek ses)</strong> okurken, pek çok transpoze üflemeli çalgı boyutlar arası aynı parmak düzenini korumak için şöyle tasarlanmıştır:
      </p>
      <ul class="k-physics-list">
        <li><strong>Si♭ çalgıları (trompet, klarnet, tenor saksafon):</strong> Yazılı bir <code>Do</code> gerçekte <code>Si♭</code> (bir büyük ikili pes) tınlar. Grup <code>Si♭ majör (2♭)</code> çalarken trompet rahatça <code>Do majör (0 değiştirici)</code> okur!</li>
        <li><strong>Mi♭ çalgıları (alto saksafon, bariton saksafon):</strong> Yazılı bir <code>Do</code> gerçekte <code>Mi♭</code> (bir büyük altılı pes) tınlar. Topluluk <code>Mi♭ majör (3♭)</code> çalarken alto saksafon <code>Do majör</code> okur.</li>
        <li><strong>Fa çalgıları (korno, korangle):</strong> Yazılı bir <code>Do</code> bir tam beşli pes, yani gerçek <code>Fa</code> tınlar.</li>
      </ul>
      <p class="k-tip"><strong>Tonalite «karakteri»:</strong> Eşit tampere sistemden önce akort eşitsizlikleri her tona ayrı bir tat veriyordu (kadifemsi <em>Re♭</em>, parlak <em>Re</em>). Bugün 12 ton aynı matematiksel oranları paylaşsa da gerçek çalgılar boş telleri, boru rezonansları ve ses aralıklarıyla her tonu hâlâ farklı renklendirir.</p>
    </article>
  `;

  return theoryIntro + `<div class="knowledge-list">${keyCards}</div>` + extraSections;
}

function renderSingAndPlayReferenceHTML_TR() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">1. Koordinasyon başta neden takılır?</span>
        <span class="k-ratio-chip">Otopilot &amp; odak</span>
      </div>
      <h4>Çalarken söylemek başlangıçta neden bu kadar zor gelir?</h4>
      <p>
        Aynı anda hem çalıp hem söylediğinde tamamen bağımsız iki sistem aynı zamanı paylaşır: <strong>ellerin</strong> (kas hafızası, akor basışları, ritim vuruşu) ve <strong>sesin</strong> (nefes, entonasyon, şarkı sözleri). Çalışma belleği aynı saniyede iki yeni şeyi birden büyüteç altında yönetemez.
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>En az bir tarafı otopilota al</strong>
          Ses ve eller birbirine dolandığı sürece beynin hâlâ ikisini de aktif olarak yönetiyordur. Çözüm: eşliği (veya vokal çizgisini) merdiven çıkmak gibi kendiliğinden akana kadar tekrarla.
        </div>
        <div class="physics-fact-item">
          <strong>Notalardan önce ritmi güvenceye al</strong>
          Takılmaların %90'ı melodik değil, ritmiktir! Bir hece iki vuruş arasına düştüğünde, iki ritim netçe hizalanana kadar eller donup kalır.
        </div>
        <div class="physics-fact-item">
          <strong>Önce «La» veya «Du» ile mırıldan</strong>
          Sözleri hatırlamak devasa bir zihinsel enerji harcar. Melodiyi tek bir nötr heceyle mırıldanmak entonasyon ve groove için anında yer açar.
        </div>
        <div class="physics-fact-item">
          <strong>Tek bir ortak iç nabız</strong>
          Hafif bir ayak vuruşu veya metronom komuta etsin: ses elleri kovalamaz, eller de sesi beklemez; <em>ikisi birden</em> aynı vuruşa yanıt verir.
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. 5 adımda yöntemli çalışma</span>
        <span class="k-ratio-chip">Adım adım yöntem</span>
      </div>
      <h4>Herhangi bir şarkı için kanıtlanmış 5 adımlık rutin</h4>
      <p>
        Sürekli 1. ölçüden başlayıp aynı yerde tökezlemek yerine, koordinasyonu kısaca beş somut adıma ayır:
      </p>
      <ul class="article-steps-list">
        <li>
          <strong>1. Sohbet testi (elleri otomatikleştirmek):</strong> 20'ye kadar yüksek sesle sayarken ya da rahatça sohbet ederken çalabilene kadar eşliği 1–2 dakika döngüye al. Konuşurken eller duruyorsa kendine yalnızca çalgıyla 5 dakika daha ver.
        </li>
        <li>
          <strong>2. Sözleri ritimde okumak:</strong> Akorlarını çalarken <strong>sözleri normal konuşma sesinde kesinlikle tempoda oku</strong>. Melodiyi çıkarmak hangi hecelerin vuruşlara, hangilerinin vuruş aralarına düştüğünü anında gösterir.
        </li>
        <li>
          <strong>3. Fiziksel buluşma noktalarını işaretlemek:</strong> Net dayanaklar belirle: <em>«Başparmak “gece” kelimesinde bası vuruyor»</em> veya <em>«“özgür” kelimesi 2 ile 3 arasındaki yukarı vuruşa düşüyor»</em>. Beyin somut çapalara zahmetsizce kenetlenir!
        </li>
        <li>
          <strong>4. Akorları sadeleştir &amp; 1–2 ölçüyü döngüye al:</strong> Üzerinde özgürce söylerken kelimenin tam anlamıyla <strong>yalnızca 1. vuruşta tutulan tek bir akorla</strong> başla. Oturduğunda 3. vuruşu ekle, sonra tam ritmi geri getir — her zaman 1–2 ölçülük küçük döngülerle!
        </li>
        <li>
          <strong>5. Ağır çekim (%60) &amp; «hayalet şan»:</strong> Tempoyu neredeyse yarıya düşür. Zor girişlerde bir eşlik turu boyunca melodiyi sessizce dudaklarınla söyle ya da içinden duy, sonraki turda mırıldan, ardından güvenle söyle.
        </li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">3. Günlük bağımsızlık egzersizleri</span>
        <span class="k-ratio-chip">Hemen dene</span>
      </div>
      <h4>6 somut koordinasyon &amp; bağımsızlık alıştırması</h4>
      <p>
        Repertuvarından önce bunlardan bir ya da ikisiyle yapılan beş-sekiz dakika, zorla tekrar yapmaktan çok daha hızlı bağımsızlık kazandırır:
      </p>
      <ul class="k-physics-list">
        <li>
          <strong>Alıştırma 1 – Konuşma &amp; sayma testi:</strong> Kısa bir metni yüksek sesle okurken veya 20'den 1'e geri sayarken düzenli bir groove ile akıcı dört akorlu bir yürüyüş (<code>I – V – vi – IV</code>) çal. Kural: groove milim şaşmamalı.
        </li>
        <li>
          <strong>Alıştırma 2 – 1. vuruşta birlik akorlar:</strong> Her akoru 1. vuruşta yalnızca bir kez (birlik nota gibi tutarak) çal ve o açık tını üzerinde tüm kıtayı söyle. Cümlelemeyi, nefes yönetimini ve telaşsız akor geçişlerini geliştirir.
        </li>
        <li>
          <strong>Alıştırma 3 – Sabit beşli demi:</strong> Çalgında basit bir kök + beşli demi (<code>Do3 + Sol3</code>) tutarken üzerinde melodiler veya aralıklar söyle. Sol eli yormadan kulağı eğitir.
        </li>
        <li>
          <strong>Alıştırma 4 – Erken girişler &amp; «4-ve» tuzağı:</strong> Pop ve soul'da vokal çoğu zaman yarım vuruş <em>erken</em> (<code>4-ve</code> ara vuruşunda) girerken gitar veya piyano temizce 1. vuruşta değişir. Vokal tam «ve»de girerken düzenli dörtlükler vur.
        </li>
        <li>
          <strong>Alıştırma 5 – Hareketli bas vs. sabit tutulan vokal notası:</strong> Sesin ortak bir notayı (<code>Sol</code>) sabit tutarken basit bir bas çizgisi yürüt (ör. <code>Do – Fa – Sol – Do</code>), ya da tam tersi: sabit bir akor tutarken dizi söyle.
        </li>
        <li>
          <strong>Alıştırma 6 – Telefonla 20 saniyelik kontrol:</strong> Telefonla kısa bir döngü kaydet ve hemen dinle. Kendini dışarıdan duymak kaçırılan vuruşları ya da hızlanmaları anında ortaya çıkarır.
        </li>
      </ul>
      <div class="k-btn-row">
        <button class="btn-tool" data-play-progression="I,V,vi,IV">▶ Al. 1: Üzerinde konuşmalık groove</button>
        <button class="btn-tool" data-play-custom="sp-drone">▶ Al. 3: Dem sesi + melodi</button>
        <button class="btn-tool" data-play-custom="sp-syncopation">▶ Al. 4: Güçlü zaman vs. erken giriş</button>
        <button class="btn-tool" data-play-custom="sp-poly">▶ Al. 5: Hareketli bas, sabit nota</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">4. Çalgıya özel ipuçları &amp; sık hatalar</span>
        <span class="k-ratio-chip">Gitar, piyano &amp; vokal</span>
      </div>
      <h4>Sana haftalar kazandıracak pratik öneriler</h4>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Gitar: sarkacı hiç durdurma</strong>
          Sağ ön kolun kesintisiz bir metronomdur (<em>aşağı – yukarı – aşağı – yukarı</em>). Vokal suslarında veya senkoplarda bile kolunu asla durdurma: tellere dokunmadan üzerinden boş geç.
        </div>
        <div class="physics-fact-item">
          <strong>Piyano: ritimleri tek tek ekle</strong>
          Yalnızca <em>1. vuruşta sol elde kök sesler + şan</em> ile başla. Sonra 1 ve 3'te sağ ele sakin akorlar ekle. Yoğun arpejler veya karşı ezgiler en sona kalır.
        </div>
        <div class="physics-fact-item">
          <strong>Rahat ses aralığına transpoze et</strong>
          Zorlayıcı tizlerde sıkışmak el koordinasyonunu anında bozar. Sesinin doğalca akması için bir <strong>kapo</strong> kullanmaktan veya ±2 yarım ton transpoze etmekten asla çekinme.
        </div>
        <div class="physics-fact-item">
          <strong>Nefesleri nota gibi planla</strong>
          Tökezlemeler neredeyse her zaman ölçü ortasında değil, iki cümle arasında olur! Çalgı sakince akarken nakarattan önce bilinçli olarak bir dörtlük nefes payı ayır.
        </div>
      </div>
      <p class="k-tip"><strong>Lauscher'dan ekstra ipucu:</strong> Lauscher'ın <strong>Solfej</strong> ve <strong>Melodiler</strong> modüllerinde aranan notayı tuşa basmadan <em>önce</em> yüksek sesle söylemeyi dene: böylece kulak, ses ve parmakları tek bir reflekste birleştirirsin.</p>
    </article>
  `;
}

function renderCircleOfFifthsTheoryHTML_TR() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Ana fikir</span>
        <span class="k-ratio-chip">3:2 • 12 tonalite</span>
      </div>
      <h4>Beşliler Çemberi nedir ve neden bir dairedir?</h4>
      <p>
        Oktavdan (<code>2:1</code>) hemen sonra <strong>tam beşli (3:2)</strong> müzikteki en güçlü akustik bağdır. <strong>Do</strong>'dan başlayarak beşli beşli yukarı çık (<code>Do → Sol → Re → La → Mi → Si → Fa♯…</code>): her adım bir sonraki yeden sesi oluşturmak için tek bir notayı yükseltir ve saat yönünde <strong>bir diyez (♯)</strong> ekler. Beşli beşli aşağı in (yani <strong>dörtlü</strong> çık: <code>Do → Fa → Si♭ → Mi♭ → La♭ → Re♭ → Sol♭</code>): her adımda renk yumuşar ve saat yönünün tersinde <strong>bir bemol (♭)</strong> eklenir.
      </p>
      <p>
        12 adımdan sonra eşit tampere sistem spirali <strong>saat 6 konumunda (Fa♯ / Sol♭)</strong> kendi üzerine kapatır; burada 6 diyez ve 6 bemol piyanoda birebir aynı tuşlara düşer (<strong>anarmoni</strong>). 12 ayrı diziyi ezberlemek yerine tek bir müzikal pusulan olur!
      </p>
      <div class="k-compare-grid">
        <div class="k-compare-box is-peach">
          <h5>Saat yönü (+1 ♯) • çıkıcı beşliler</h5>
          <p><code>Do → Sol → Re → La → Mi → Si → Fa♯</code><br>Parlaklık adım adım artar. Diyez sırası: <code>Fa♯ – Do♯ – Sol♯ – Re♯ – La♯ – Mi♯</code> (<em>Fa – Do – Sol – Re – La – Mi – Si</em>).</p>
        </div>
        <div class="k-compare-box is-lilac">
          <h5>Saat yönünün tersi (+1 ♭) • çıkıcı dörtlüler</h5>
          <p><code>Do → Fa → Si♭ → Mi♭ → La♭ → Re♭ → Sol♭</code><br>Renk ısınır ve yumuşar. Bemollerin ters sırası: <code>Si♭ – Mi♭ – La♭ – Re♭ – Sol♭ – Do♭</code> (<em>Si – Mi – La – Re – Sol – Do – Fa</em>).</p>
        </div>
      </div>
    </article>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-peach">2. Kullanım rehberi</span>
            <span class="k-ratio-chip">Saat mantığı</span>
          </div>
          <h4>Çarkı 20 saniyede okumak ve kullanmak</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>Dış halka = majör, iç halka = ilgili minör:</strong> Her dilim bir majör tonu hemen altındaki <strong>ilgili minörüyle</strong> eşleştirir (<code>Do / Lam</code>, <code>Sol / Mim</code>, <code>Re / Sim</code>…). İkisi birebir <em>aynı 7 notayı ve aynı donanımı</em> paylaşır: minör yalnızca merkezi 3 yarım ton aşağı (6. derece / <em>La</em>) taşır.</li>
          <li><strong>Diyezler için hızlı ipucu:</strong> Donanımdaki <em>son diyeze</em> bak ve <strong>bir yarım ton</strong> yukarı çık: işte majör toniğin! (ör. 2 diyez <code>Fa♯, Do♯</code> → <code>Do♯</code>'in bir yarım ton üstü = <strong>Re majör</strong>).</li>
          <li><strong>Bemoller için hızlı ipucu:</strong> Donanımdaki <em>sondan bir önceki bemol</em> doğrudan majör tonun adını verir! (ör. 3 bemol <code>Si♭, Mi♭, La♭</code> → sondan bir önceki <strong>Mi♭ majör</strong>; sadece <code>1♭ = Fa majör</code> doğrudan akılda tutulur).</li>
          <li><strong>Sol, orta ve sağı pusula gibi oku:</strong> Seçilen her dilim <code>I</code> (tonik) olur. Sol komşusu her zaman <strong>subdominant (IV)</strong>, sağ komşusu ise her zaman <strong>dominant (V)</strong>'tir!</li>
        </ul>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-lilac">3. Müzikal bir süper güç</span>
            <span class="k-ratio-chip">Somut uygulamalar</span>
          </div>
          <h4>Çembere hâkim olduğunda neler değişir?</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <div class="physics-fact-grid">
          <div class="physics-fact-item">
            <strong>1. Bir tonun anlık akor haritası</strong>
            Yukarıdaki 3 aydınlatılmış dilime bak: tonik ve iki yakın komşusu tonun <strong>6 ana diyatonik akorunu</strong> bir araya getirir (dışta <code>IV – I – V</code> + içte <code>ii – vi – iii</code>)! Binlerce pop, rock ve folk şarkısı yalnızca bu pasta diliminin içinde yaşar.
          </div>
          <div class="physics-fact-item">
            <strong>2. Zihinden hesap yapmadan transpoze etmek</strong>
            Söylemek için fazla mı tiz? Bu 3 dilimlik bloğu kadran boyunca çevir: tüm ilişkiler aynı kalır (Do'daki <code>I–V–vi–IV</code> bir adımda <code>Sol–Re–Mim–Do</code> veya sola dönünce <code>Fa–Do–Rem–Si♭</code> olur).
          </div>
          <div class="physics-fact-item">
            <strong>3. Yumuşak modülasyonlar &amp; sürpriz dönüşler</strong>
            İki komşu dilim yalnızca <strong>tek bir notada</strong> farklıdır (7 notanın 6'sı ortak!), bu da kıta ile nakarat arasında ipeksi geçişler sağlar. Çemberin tam karşı yakasına geçmek (6 adım / triton) ise en yüksek dramatik etki için neredeyse tüm notaları yeniler.
          </div>
          <div class="physics-fact-item">
            <strong>4. Daha hızlı armonik kulak &amp; okuma</strong>
            Ünlü caz ve pop yürüyüşlerinin (<code>iii – vi – ii – V – I</code>) çark üzerinde adım adım <em>saat yönünün tersinde</em> ilerlediğine dikkat et! Kulağın bir sonraki kök sesi geometrik olarak önceden sezer.
          </div>
        </div>
      </div>
    </details>

    <details class="knowledge-card k-accordion">
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">4. Pratik alıştırmalar</span>
            <span class="k-ratio-chip">Çalmak &amp; dinlemek</span>
          </div>
          <h4>Çemberle çalışmanın 4 somut yolu</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <ul class="k-physics-list">
          <li><strong>«Do &amp; Sol» ikilisinden kurtul:</strong> Herhangi bir cümleyi, diziyi veya yürüyüşü al ve her gün saat yönünde bir adım (<code>Do → Sol → Re → La</code>) ya da üflemeli tonları boyunca (<code>Fa → Si♭ → Mi♭ → La♭</code>) kaydır. 12 günde tüm klavyeyi veya gitar sapını keşfetmiş olursun.</li>
          <li><strong>Beşli yürüyüşlerini dinle (<code>vi–ii–V–I</code>):</strong> Saat 12'ye doğru adım adım geri gel: her akor bir sonraki dilime çekilen küçük bir dominant gibi davranır! Do majördeki bu manyetik çekimi duymak için aşağıdaki düğmeye bas.</li>
          <li><strong>Komşu bir renk ödünç al (ikincil dominantlar):</strong> Do majörde <code>Sol (V)</code> öncesinde daha fazla itiş mi istiyorsun? Sağ komşudan <code>Fa♯</code> ödünç alarak minör <code>ii (Rem)</code> akorunu doğrudan Sol'e bakan parlak bir <strong>Re7 (V/V)</strong> akoruna dönüştür.</li>
          <li><strong>Sıcaklık ile parlak ivmeyi karşılaştır:</strong> Çarkta sola dönmek (<code>I → IV → bVII</code>) ayakları yere basan soul bir temel verir; sağa tırmanmak (<code>I → V → V/V</code>) ise enerji ve parlaklık katar.</li>
        </ul>
        <div class="k-btn-row">
          <button class="btn-tool" data-play-progression="vi,ii,V7,I">▶ Çember çekimini dinle (Lam–Rem–Sol7–Do)</button>
          <button class="btn-tool" data-play-progression="I,V/V,V,I">▶ Saat yönü ivmesini dinle (Do–Re (V/V)–Sol–Do)</button>
        </div>
      </div>
    </details>
  `;
}

function getIntervalNamingGuideHTML_TR() {
  const useGerman = typeof state !== "undefined" ? state?.profile?.intervalNotation !== "intl" : true;
  const schemeBadge = useGerman ? "Aktif: P / G / k" : "Aktif: P / M / m";
  const m2 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m2") : "m2";
  const M2 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M2") : "M2";
  const m3 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("m3") : "m3";
  const M3 = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol("M3") : "M3";
  return `
    <details class="knowledge-card k-accordion" id="intervalNamingGuideAccordion" open>
      <summary class="k-accordion-summary">
        <div class="k-accordion-head">
          <div class="k-card-top-row">
            <span class="k-card-tag tag-sage">Kısaltmalar &amp; adlar</span>
            <span class="k-ratio-chip">${schemeBadge}</span>
          </div>
          <h4>Kısaltılmış gösterim nasıl okunur (harf + rakam)?</h4>
        </div>
        <span class="k-accordion-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="k-accordion-body">
        <p>Her aralık kodu iki karakterde iki bilgiyi toplar: <strong>rakam</strong> kaç dizi derecesi kapladığını, <strong>harf</strong> ise yarım ton cinsinden tam genişliği belirtir.</p>
        <ul class="k-physics-list">
          <li><strong>1. Rakam (<code>1</code>–<code>9</code>) nota adlarını sayar:</strong> <code>1</code> = birli/ünison (aynı nota), <code>2</code> = ikili, <code>3</code> = üçlü, <code>4</code> = dörtlü, <code>5</code> = beşli, <code>6</code> = altılı, <code>7</code> = yedili, <code>8</code> = sekizli/oktav ve <code>9</code> = dokuzlu.</li>
          <li><strong>2. Tam aralıklar (<code>P</code>):</strong> <code>P1</code>, <code>P4</code>, <code>P5</code> ve <code>P8</code> yalnızca tek bir saf biçimde bulunur (<em>Perfect</em> / tam): büyük veya küçük varyantları yoktur.</li>
          <li><strong>3. Büyük &amp; küçük çiftler (<code>2</code>, <code>3</code>, <code>6</code>, <code>7</code>, <code>9</code>):</strong> Bu beş aralık birbirinden <strong>1 yarım ton</strong> farklı iki renkte bulunur:<br>
            – <strong>Uluslararası (<code>P / M / m</code>):</strong> büyük <strong><code>M</code></strong> (<em>Major</em> / büyük) geniş ve parlak aralığı; küçük <strong><code>m</code></strong> (<em>minor</em> / küçük) ise 1 yarım ton daha dar aralığı gösterir (ör. <code>M3</code> vs. <code>m3</code>). Büyük/küçük harf her şeyi değiştirir!<br>
            – <strong>Almanca (<code>P / G / k</code>):</strong> büyük <strong><code>G</code></strong> (<em>Groß</em> = büyük) vs. küçük <strong><code>k</code></strong> (<em>klein</em> = küçük, ör. <code>G3</code> vs. <code>k3</code>).</li>
          <li><strong>4. Triton (<code>TT</code>):</strong> Oktavı <strong>6 yarım tonda</strong> tam ortadan ikiye böler, <code>P4</code> ile <code>P5</code>'in tam ortasındadır (artık dörtlü / eksik beşli).</li>
        </ul>
        <div class="k-meta-box">
          <div><strong>Aktif semboller:</strong> İkililer: <code>${m2}</code> (1 yt) vs. <code>${M2}</code> (2 yt) · Üçlüler: <code>${m3}</code> (3 yt) vs. <code>${M3}</code> (4 yt)</div>
          <div><strong>Özelleştir:</strong> <strong>Ayarlar → Müzik Notasyonu → Aralık Adları</strong> altından <strong>Uluslararası (P / M / m)</strong> ile <strong>Almanca (P / G / k)</strong> arasında özgürce geçiş yap.</div>
        </div>
      </div>
    </details>
  `;
}

function renderNotationReferenceHTML_TR() {
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
        <span class="k-card-tag tag-peach">1. 5 çizgili dizek (porte)</span>
        <span class="k-ratio-chip">Çizgiler &amp; aralıklar</span>
      </div>
      <h4>Müzik kâğıt üzerinde nasıl okunur hale gelir?</h4>
      <p>
        Nota yazısı bir koordinat sistemi gibi çalışır: <strong>dikey eksen</strong> perdeyi (daha yukarı = daha tiz, daha aşağı = daha pes), <strong>yatay eksen</strong> ise soldan sağa akan zamanı temsil eder.
      </p>
      <ul class="k-physics-list">
        <li><strong>Her zaman alttan üste say:</strong> Bir dizekte <strong>5 çizgi</strong> (en alttaki 1.'den en üstteki 5.'ye) ve aralarında <strong>4 aralık</strong> bulunur.</li>
        <li><strong>Çizgi – aralık dönüşümü:</strong> Bir çizgiden bitişiğindeki aralığa geçmek her zaman <strong>tek bir diyatonik basamak</strong> çıkmak ya da inmektir (<code>C → D → E → F → G → A → B</code> / Do'dan Si'ye).</li>
        <li><strong>Anahtar neden şarttır:</strong> Anahtar olmadan çizgiler sessizdir: çizgilerden birine <em>kesin bir referans notası</em> sabitleyen şey anahtardır.</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">2. 3 ana anahtar (ve özel anahtarlar)</span>
        <span class="k-ratio-chip">Sol • Fa • Do (3. çizgi)</span>
      </div>
      <h4>Aynı klavyeye üç farklı bakış</h4>
      <p>
        Turuncuyla vurgulanan çizgi her anahtarın tam <strong>dayanak noktasını</strong> gösterir. Komşu tüm notaları bir anda çıkarmak için o tek referansı aklında tut.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${trebleAnchorSvg}
          <h5>Sol anahtarı (G)</h5>
          <p>Ortadaki kıvrımı <strong>2. çizgiyi = Sol4 (G4)</strong> sarar. Şan (soprano/alto), keman, flüt, trompet, gitar ve piyanonun sağ eli için standarttır.</p>
          <p><strong>Referanslar (alttan üste):</strong> çizgiler <em>Mi – Sol – Si – Re – Fa</em>; aralıklar <em>Fa – La – Do – Mi</em>.</p>
          <button type="button" class="btn-tool" data-play-solo-note="G4">▶ Sol4 (G4) dayanağını dinle</button>
        </div>
        <div class="notation-knowledge-card">
          ${bassAnchorSvg}
          <h5>Fa anahtarı (F)</h5>
          <p>İki noktası <strong>4. çizgiyi = Fa3 (F3)</strong> çerçeveler. Piyanonun sol eli, çello, kontrbas, bas gitar, trombon ve pes sesler için vazgeçilmezdir.</p>
          <p><strong>Referanslar (alttan üste):</strong> çizgiler <em>Sol – Si – Re – Fa – La</em>; aralıklar <em>La – Do – Mi – Sol</em>.</p>
          <button type="button" class="btn-tool" data-play-solo-note="F3">▶ Fa3 (F3) dayanağını dinle</button>
        </div>
        <div class="notation-knowledge-card">
          ${altoAnchorSvg}
          <h5>Alto / Do anahtarı (3. çizgi)</h5>
          <p>Tam merkezi <strong>3. (orta) çizgiyi = orta Do (C4)</strong> işaret eder. Orkestrada viyolanın ve pek çok çoksesli partisyonun doğal anahtarıdır.</p>
          <p><strong>Simetri ipucu:</strong> Ortadaki <code>C4</code>'ün üstüne <em>Mi</em> (4.) ve <em>Sol</em> (5.), hemen altına ise <em>La</em> (2.) ve <em>Fa</em> (1.) yerleşir.</p>
          <button type="button" class="btn-tool" data-play-solo-note="C4">▶ Do4 (C4) dayanağını dinle</button>
        </div>
      </div>

      <div class="k-meta-box">
        <div><strong>Aynı orta Do (C4) üç anahtarı birbirine bağlar:</strong> <strong>Sol anahtarında</strong> <em>alttaki</em> 1. ek çizgide; <strong>Alto anahtarında</strong> tam <em>ortada (3. çizgi)</em>; <strong>Fa anahtarında</strong> ise <em>üstteki</em> 1. ek çizgide durur.</div>
        <div><strong>Özel anahtarlar (önizleme):</strong> <strong>Tenor anahtarı (4. çizgi Do)</strong> çello, fagot veya trombonun tiz pasajları için orta Do'yu 4. çizgiye koyar; oktavlı anahtarlar (<code>8vb</code> / <code>8va</code>) ise gitar veya pikoloda ek çizgi kalabalığını önler.</div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. 3 ek çizgiye kadar</span>
        <span class="k-ratio-chip">±3 ek çizgi</span>
      </div>
      <h4>Çizgi çizgi saymadan üstte ve altta okumak</h4>
      <p>
        Melodi 5 çizginin dışına taştığında <strong>ek çizgi</strong> denen kısa çizgiler dizeği yerel olarak uzatır. Burada <strong>altta ve üstte 3 ek çizgiye kadar</strong> — orkestra ve piyano partisyonlarının gerçek aralığında — çalışırsın.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${ledgerSvg}
          <h5>Sol anahtarı: ±3 ek çizgi</h5>
          <p>Solda: altta 3., 2. ve 1. ek çizgi (<code>F3 – A3 – C4</code>); ortada: <code>B4</code>; sağda: üstte 1., 2. ve 3. ek çizgi (<code>A5 – C6 – E6</code>).</p>
        </div>
        <div class="notation-knowledge-card">
          ${ledgerBassSvg}
          <h5>Fa anahtarı: derin pesler &amp; melodik tiz bölge</h5>
          <p>Aşağıda: 3 ek çizgi <code>A1</code>'e kadar iner; yukarıda: orta Do (<code>C4</code>), <code>E4</code> ve <code>G4</code>'e doğru açılır.</p>
        </div>
      </div>
      <ul class="k-physics-list">
        <li><strong>Dizek dışında 2 dayanak noktası ezberle:</strong> 1. ve 2. ek çizgiyi sabitle (ör. Sol anahtarının altında <code>C4</code> ve <code>A3</code>, üstünde <code>A5</code> ve <code>C6</code>); böylece komşu her dereceyi anında tanırsın.</li>
        <li><strong>Üçlü atlayışlarını fark et:</strong> Bir ek çizgiden doğrudan bir sonrakine geçmek her zaman bir <strong>üçlü</strong> atlar (üst üste dizili akorlarla aynı ilke).</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Değiştiriciler &amp; adlandırma sistemleri</span>
        <span class="k-ratio-chip">♯ • ♭ • B vs H</span>
      </div>
      <h4>Siyah tuşlar, anarmoni &amp; Almanca farkı</h4>
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
            <li><strong>Diyez (<code>♯</code>):</strong> Notayı <strong>1 yarım ton</strong> yükseltir (sağdaki tuş). <code>F</code> → <code>F♯</code> olur.</li>
            <li><strong>Bemol (<code>♭</code>):</strong> Notayı <strong>1 yarım ton</strong> alçaltır (soldaki tuş). <code>G</code> → <code>G♭</code> olur.</li>
            <li><strong>Anarmoni:</strong> Klavyede <code>F♯</code> ve <code>G♭</code> birebir aynı siyah tuştur: yalnızca armonik işleve göre yazılış değişir.</li>
            <li><strong>Almanca gösterime dikkat:</strong> Almanca notasyonda beyaz <em>Si (B)</em> tuşu <strong>H</strong>, <em>Si♭ (B♭)</em> ise <strong>B</strong> olarak yazılır! <em>Uygulama Ayarları</em>'ndan sistemler arasında rahatça geçiş yapabilirsin.</li>
          </ul>
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Donanımlar &amp; deşifre okuma</span>
        <span class="k-ratio-chip">Donanım ♯/♭ + ♮</span>
      </div>
      <h4>Değiştiriciler tüm dizek boyunca geçerli olduğunda</h4>
      <p>
        Her notanın önüne tekrar tekrar <code>♯</code> veya <code>♭</code> yazmak yerine, <strong>anahtarın hemen yanına</strong> konan donanım bir natürel (<code>♮</code>) işareti çıkana kadar o dereceleri <strong>tüm oktavlarda</strong> otomatik olarak değiştirir.
      </p>
      <div class="notation-knowledge-grid">
        <div class="notation-knowledge-card">
          ${keySigSharpSvg}
          <h5>Diyezli tonlar (sıra: Fa – Do – Sol – Re – La – Mi)</h5>
          <p><strong>Re majörde (2♯)</strong> her <code>Fa</code> → <code>Fa♯</code> ve her <code>Do</code> → <code>Do♯</code> olur; yalnızca 3. notanın önündeki natürel (<code>♮</code>) doğal Fa'yı geri getirir.</p>
        </div>
        <div class="notation-knowledge-card">
          ${keySigFlatSvg}
          <h5>Bemollü tonlar (sıra: Si – Mi – La – Re – Sol – Do)</h5>
          <p><strong>Mi♭ majörde (3♭)</strong> <code>Si♭</code>, <code>Mi♭</code> ve <code>La♭</code> olası bir natürele (<code>♮</code>) kadar baştan itibaren tüm dizeği yönetir.</p>
        </div>
      </div>
    </article>
  `;
}

function renderArrangingReferenceHTML_TR() {
  return `
    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">1. Düzenleme (aranjman) nedir?</span>
        <span class="k-ratio-chip">Taslak → tam parça</span>
      </div>
      <h4>Bir müzik fikrini yaşayan bir ses evrenine dönüştürme sanatı</h4>
      <p>
        <strong>Besteleme</strong> bir şarkının taslağıysa (melodi, temel akorlar ve sözler), <strong>düzenleme (aranjman)</strong> onun tüm mimarisi, ışıklandırması ve renk paletidir: <em>Kim, neyi, ne zaman, hangi oktavda, hangi ritimle, hangi dinamikle ve hangi tınıyla çalacak?</em>
      </p>
      <div class="physics-fact-grid">
        <div class="physics-fact-item">
          <strong>Çalgılama &amp; tınılar</strong>
          Melodiyi, bası, armonik halıyı ve ritmi hangi çalgıların veya seslerin taşıyacağını ve tınılarının nasıl kaynaşacağını seçmek.
        </div>
        <div class="physics-fact-item">
          <strong>Form &amp; dramatik akış</strong>
          Samimi bir girişten nakarata, köprüye ve finale kadar duygusal yayı kurmak.
        </div>
        <div class="physics-fact-item">
          <strong>Ses bölgeleri &amp; voicing</strong>
          Her çalgının birbirini boğmadan nefes alabilmesi için notaları derin pesten kristal tizlere dağıtmak.
        </div>
        <div class="physics-fact-item">
          <strong>Diyalog, doku &amp; suslar</strong>
          Herkesin ne zaman birlikte çalacağına (<em>tutti</em>), vokal boşluklarında hangi çalgının yanıt vereceğine ve sessizliğin nerede tüyleri ürperteceğine karar vermek.
        </div>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">2. İşlev &amp; kullanım alanları</span>
        <span class="k-ratio-chip">Neden aranjman yapılır?</span>
      </div>
      <h4>Bir düzenleme ne işe yarar ve nerede kullanılır?</h4>
      <p>
        Aynı dört akorlu aynı şarkı, <strong>samimi bir piyano baladı</strong>, <strong>coşkulu bir funk parçası</strong>, <strong>dört sesli a cappella koro</strong> ya da <strong>sinematik bir orkestra tablosu</strong> haline gelebilir:
      </p>
      <ul class="article-steps-list">
        <li><strong>1. Kulağın dikkatini yönlendirmek:</strong> İnsan kulağı aynı anda bilinçli olarak yalnızca <strong>2 veya 3 ses katmanını</strong> takip edebilir. İyi bir düzenleme orta bölgeyi vokal veya ana melodi için açık bırakır.</li>
        <li><strong>2. Duyguyu ve stili yansıtmak:</strong> Yaylı halıları sıcaklık ve genişlik katar, kısa bakır vuruşları vuruculuk verir, akustik gitar ise samimiyet yaratır.</li>
        <li><strong>3. Dinleme yorgunluğunu önlemek:</strong> Tüm çalgılar ilk ölçüden itibaren çalarsa kulak çabucak doyar. Katman ekleyip çıkarmak her kıtayı ve nakaratı canlı tutar.</li>
        <li><strong>4. Müziği gerçek bir kadroya uyarlamak:</strong> Grup, yaylı dörtlüsü, SATB koro, big band veya solo piyano: düzenleme yazıyı eldeki çalgıların ve müzisyenlerin aralığına göre şekillendirir.</li>
        <li><strong>5. Geçişleri özenle işlemek:</strong> Davul geçişleri, bas inişleri, kreşendolar ve keskin duruşlar (<em>break</em>) bölümleri akıcıca birbirine bağlar.</li>
      </ul>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">3. 4 ses katmanı</span>
        <span class="k-ratio-chip">Rol paylaşımı</span>
      </div>
      <h4>Berrak bir düzenlemenin 4 temel katmanı</h4>
      <ul class="k-physics-list">
        <li><strong>1. Ön plan (lead / melodi):</strong> Ana hikâyeyi anlatan vokal veya solo çalgı.</li>
        <li><strong>2. Temel (bas &amp; groove):</strong> Bas gitar/kontrbas armonik kökü kurarken bateri ve vurmalılar nabzı sabitler.</li>
        <li><strong>3. Armonik halı (pad &amp; eşlik):</strong> Spektrumun ortasında uzayan yaylılar, korolar, org veya ritmik gitar/piyano akorları.</li>
        <li><strong>4. Karşı ezgi &amp; süslemeler (fill):</strong> Tam ana melodi nefes aldığında araya giren küçük melodik yanıtlar.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-sketch">▶ 1. Yalın taslak (melodi &amp; bas)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-full-layers">▶ 2. 4 katmanlı tam düzenleme</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-sage">4. Ses bölgeleri &amp; voicing</span>
        <span class="k-ratio-chip">Berraklık vs. bulanık yığılma</span>
      </div>
      <h4>Bazı düzenlemeler neden berrak, bazıları çamurlu duyulur?</h4>
      <ul class="k-physics-list">
        <li><strong>Doğuşkanlar yasası (altta geniş, üstte sıkı):</strong> <code>Do3 (C3)</code> altında dar üçlüler pes bölgeyi bulandırır (<em>Low-Interval Limit</em>). Pesleri kök seslere, beşlilere ve oktavlara ayır; üçlüleri, yedilileri ve uzantıları orta ve tiz bölgeye yerleştir.</li>
        <li><strong>Kapalı konum vs. açık konum (drop-2):</strong> Sıkı bir akorun üstten ikinci notasını bir oktav aşağı indirmek ses alanını anında ferahlatır.</li>
        <li><strong>Ritmik tamamlayıcılık:</strong> Maskelemeyi önlemek için uzun değerleri (pad) kısa, net motiflerle eşleştir.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-muddy">▶ Bulanık: peste dar üçlüler</button>
        <button type="button" class="btn-tool" data-play-custom="arr-voicing-open">▶ Berrak: dengeli açık voicing</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-peach">5. Dinamik &amp; diyalog</span>
        <span class="k-ratio-chip">Çağrı-yanıt • drop</span>
      </div>
      <h4>İlgiyi baştan sona canlı tutmak</h4>
      <ul class="article-steps-list">
        <li><strong>Çağrı &amp; yanıt (Call &amp; response):</strong> Eşlik, ana sesin boşluklarında yanıt verir.</li>
        <li><strong>Ters hareket &amp; karşı ezgi:</strong> İkinci bir melodik çizgi ana melodi yükselirken iner ya da uzun tutulan bir nota sırasında hareket eder.</li>
        <li><strong>Eksiltmenin gücü («drop»):</strong> Bir ölçülüğüne neredeyse tüm çalgıları aniden çekmek çoğu zaman yeni bir şey eklemekten daha büyük etki yaratır.</li>
      </ul>
      <div class="k-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-call-response">▶ Çağrı &amp; yanıt (soru / cevap)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-counterpoint">▶ Ters hareketli kontrpuan</button>
      </div>
    </article>

    <article class="knowledge-card">
      <div class="k-card-top-row">
        <span class="k-card-tag tag-lilac">6. Yeniden armonize etme &amp; kontrol listesi</span>
        <span class="k-ratio-chip">Aynı notalar, başka renk</span>
      </div>
      <h4>Melodinin tek notasına dokunmadan tüm duyguyu değiştirmek</h4>
      <p>
        <strong>Yeniden armonize etme (reharmonizasyon)</strong>, alttaki akorları değiştirirken melodiyi aynen korur (ör. basit bir <code>Do – Sol – Do</code> yerine <code>Fmaj7 – Fm6 – Am9</code>).
      </p>
      <div class="k-btn-row" style="margin-top:0.45rem;margin-bottom:0.65rem;">
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-plain">▶ Basit akorlar üzerinde melodi (I–V–I)</button>
        <button type="button" class="btn-tool" data-play-custom="arr-reharm-cinema">▶ Sinematik yeniden armonize edilmiş aynı melodi</button>
      </div>
      <div class="k-meta-box">
        <div><strong>Düzenlemelerin için 5 kilit soru:</strong></div>
        <div>1. <strong>Söz kimde?</strong> Aynı anda ön planda yalnızca tek bir ana öğe olsun.</div>
        <div>2. <strong>Nefes boşlukları nerede?</strong> Yanıtları vokalin durduğu anlara yerleştir.</div>
        <div>3. <strong>Pes bölge temiz mi?</strong> <code>Do3 (C3)</code> altında dar üçlü olmasın.</div>
        <div>4. <strong>Kıta ile nakarat gerçekten ayrışıyor mu?</strong> Oktav genişliği ve yoğunlukla oyna.</div>
        <div>5. <strong>Mute (susturma) tuşu testi:</strong> Bir kanalı susturduğunda parça hiçbir şey kaybetmiyorsa ona gerçek bir rol ver ya da çıkar!</div>
      </div>
      <div class="k-btn-row" style="margin-top:0.55rem;">
        <button type="button" class="btn-tool" data-jump-ref="ensembles">Orkestralar &amp; Topluluklara git →</button>
        <button type="button" class="btn-tool" data-jump-ref="cadences">Kadanslar &amp; Armoniye git →</button>
        <button type="button" class="btn-tool" data-jump-ref="physics">Fizik &amp; Doğuşkanlara git →</button>
      </div>
    </article>
  `;
}

const CIRCLE_OF_FIFTHS_TR_DATA = {
  "C": {
    sig: "0 değiştirici",
    major: "Do majör",
    minor: "La minör",
    enharmonic: "",
    acc: "Diyez veya bemol yok (yalnızca piyanonun beyaz tuşları)",
    trick: "Çemberin saat 12 sıfır noktası: tüm doğal notalar referans oluşturur.",
    vibe: "Açık ve nötr: başlangıç, koro ve nota okuma için ideal."
  },
  "G": {
    sig: "1 diyez (♯)",
    major: "Sol majör",
    minor: "Mi minör",
    enharmonic: "",
    acc: "1♯: Fa♯ (Sol'e giden yeden ses)",
    trick: "Son diyez (Fa♯) + 1 yarım ton yukarı = Sol majör.",
    vibe: "Akustik gitar, yaylılar ve folk/pop'ta açık ve tınlayıcı."
  },
  "D": {
    sig: "2 diyez (♯)",
    major: "Re majör",
    minor: "Si minör",
    enharmonic: "",
    acc: "2♯: Fa♯, Do♯",
    trick: "Son diyez = Do♯ → bir yarım ton üstü = Re majör.",
    vibe: "Yaylılar, rock ve orkestra için parlak bir tonalite."
  },
  "A": {
    sig: "3 diyez (♯)",
    major: "La majör",
    minor: "Fa♯ minör",
    enharmonic: "",
    acc: "3♯: Fa♯, Do♯, Sol♯",
    trick: "Son diyez = Sol♯ → bir yarım ton üstü = La majör.",
    vibe: "Gitar, keman ve vokalde sıcak ve ışıltılı."
  },
  "E": {
    sig: "4 diyez (♯)",
    major: "Mi majör",
    minor: "Do♯ minör",
    enharmonic: "",
    acc: "4♯: Fa♯, Do♯, Sol♯, Re♯",
    trick: "Son diyez = Re♯ → bir yarım ton üstü = Mi majör.",
    vibe: "Elektro gitar, blues ve klasik rock'ın krallığı."
  },
  "B": {
    sig: "5 diyez (♯) / 7♭",
    major: "Si majör",
    minor: "Sol♯ minör",
    enharmonic: "Anarmonik: Do♭ majör (7♭) / La♭ minör",
    acc: "5♯: Fa♯, Do♯, Sol♯, Re♯, La♯",
    trick: "Son diyez = La♯ → bir yarım ton üstü = Si majör.",
    vibe: "Piyanoda parmakların altına son derece doğal oturur (5 siyah tuşun tümünü kullanır)."
  },
  "F#": {
    sig: "6 diyez / 6 bemol",
    major: "Fa♯ majör",
    minor: "Re♯ / Mi♭ minör",
    enharmonic: "Saat 6 anarmonik köprüsü: Fa♯ majör (6♯) birebir Sol♭ majör (6♭: Sol♭–La♭–Si♭–Do♭–Re♭–Mi♭–Fa) ile aynı tınlar.",
    acc: "6♯: Fa♯, Do♯, Sol♯, Re♯, La♯, Mi♯  (veya 6♭: Si♭, Mi♭, La♭, Re♭, Sol♭, Do♭)",
    trick: "Do majörün tam karşısında (triton kutbu!): buradan sonra bemolleri okumak çoğu zaman daha rahattır.",
    vibe: "Gospel, R&B ve izlenimci müzikte çok sevilen zengin ve parıltılı renk."
  },
  "Db": {
    sig: "5 bemol (♭) / 7♯",
    major: "Re♭ majör",
    minor: "Si♭ minör",
    enharmonic: "Anarmonik: Do♯ majör (7♯) / La♯ minör",
    acc: "5♭: Si♭, Mi♭, La♭, Re♭, Sol♭",
    trick: "Sondan bir önceki bemol Re♭ → Re♭ majör!",
    vibe: "Caz piyanistlerinin ve baladların bayıldığı kadifemsi, romantik tını."
  },
  "Ab": {
    sig: "4 bemol (♭)",
    major: "La♭ majör",
    minor: "Fa minör",
    enharmonic: "",
    acc: "4♭: Si♭, Mi♭, La♭, Re♭",
    trick: "Sondan bir önceki bemol = La♭ → La♭ majör.",
    vibe: "Yumuşak ve geniş: caz standartlarının, soul'un ve üflemeli armonilerinin klasiği."
  },
  "Eb": {
    sig: "3 bemol (♭)",
    major: "Mi♭ majör",
    minor: "Do minör",
    enharmonic: "",
    acc: "3♭: Si♭, Mi♭, La♭",
    trick: "Sondan bir önceki bemol = Mi♭ → Mi♭ majör.",
    vibe: "Bakır üflemeliler, alto saksafon ve senfoni için asil, kahramanca ton."
  },
  "Bb": {
    sig: "2 bemol (♭)",
    major: "Si♭ majör",
    minor: "Sol minör",
    enharmonic: "",
    acc: "2♭: Si♭, Mi♭",
    trick: "Sondan bir önceki bemol = Si♭ → Si♭ majör.",
    vibe: "Big band, trompet, klarnet ve modern cazın kraliçe tonu."
  },
  "F": {
    sig: "1 bemol (♭)",
    major: "Fa majör",
    minor: "Re minör",
    enharmonic: "",
    acc: "1♭: Si♭ (natürel Si, Si♭'e iner)",
    trick: "Doğrudan akılda tutulacak tek ton: donanımda tek bemol her zaman Fa majördür.",
    vibe: "Korolar, kornolar ve folk baladlarınca sevilen sıcak, pastoral tonalite."
  }
};

const CIRCLE_ROLES_TR = {
  major: {
    I: "Tonik",
    ii: "Üst-tonik",
    iii: "Mediyant",
    IV: "Subdom.",
    V: "Dominant",
    V7: "Dom. 7'li",
    vi: "İlgili min.",
    "vii°": "Eksik yeden"
  },
  minor: {
    i: "Min. tonik",
    "ii°": "Eksik",
    III: "İlgili maj.",
    iv: "Min. subdom.",
    v: "Doğal dom.",
    V7: "Arm. dom. 7",
    VI: "Üst-dom.",
    VII: "Alt-tonik"
  }
};

if (typeof registerKnowledgeBundle === "function") {
  registerKnowledgeBundle("tr", {
    data: {
      intervalEncyclopedia: INTERVAL_ENCYCLOPEDIA_TR,
      cadenceEncyclopedia: CADENCE_ENCYCLOPEDIA_TR,
      solfegeSteps: SOLFEGE_STEPS_TR,
      knowledgeArticles: KNOWLEDGE_ARTICLES_TR,
      physicsWaveExplanations: PHYSICS_WAVE_EXPLANATIONS_TR,
      physicsOvertones: PHYSICS_OVERTONES_TR,
      categoryHelpGuides: CATEGORY_HELP_GUIDES_TR,
      rhythmInstruments: RHYTHM_INSTRUMENTS_DATA_TR,
      instrumentModules: INSTRUMENT_MODULES_DATA_TR,
      modesEncyclopedia: MODES_ENCYCLOPEDIA_TR,
      keysCircleData: KEYS_CIRCLE_DATA_TR
    },
    renderers: {
      physics: renderPhysicsReferenceHTML_TR,
      rhythm: renderRhythmReferenceHTML_TR,
      rhythmInstruments: renderRhythmInstrumentsHTML_TR,
      vocals: renderVocalsReferenceHTML_TR,
      instrumentModule: renderInstrumentModuleHTML_TR,
      modes: renderModesReferenceHTML_TR,
      keys: renderKeysReferenceHTML_TR,
      singAndPlay: renderSingAndPlayReferenceHTML_TR,
      notation: renderNotationReferenceHTML_TR,
      arranging: renderArrangingReferenceHTML_TR,
      intervalNamingGuide: getIntervalNamingGuideHTML_TR,
      circleOfFifthsTheory: renderCircleOfFifthsTheoryHTML_TR
    },
    circleData: CIRCLE_OF_FIFTHS_TR_DATA,
    circleRoles: CIRCLE_ROLES_TR
  });
}
