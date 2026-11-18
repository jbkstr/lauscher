/**
 * Lauscher • AppState, Spruch-Datenbank & Controller
 */

const LAUSCHEBAER_QUOTES = [
  // Kategorie 1: Willkommen & Spielfreude
  { cat: "Willkommen", text: "„Schön, dass du da bist! Vergiss Notenstress und Punkte – heute geht es einfach um den Klang.“" },
  { cat: "Willkommen", text: "„Kein Mathetest, kein Zeitdruck: Drück einfach auf Play und schau, was die Töne mit dir machen!“" },
  { cat: "Willkommen", text: "„Egal ob zwei Minuten zwischendurch oder eine halbe Stunde am Klavier – jede Runde bringt dich weiter.“" },
  { cat: "Willkommen", text: "„Mach’s dir gemütlich und such dir unten einfach das Thema aus, worauf du heute Lust hast!“" },
  { cat: "Willkommen", text: "„Musik ist wie eine Sprache. Wollen wir heute wieder ein paar neue Klänge entdecken?“" },
  { cat: "Willkommen", text: "„Heute schon geschmunzelt? Spiel mal einen Tritonus an – der kitzelt herrlich im Ohr!“" },
  { cat: "Willkommen", text: "„Auch Profis greifen mal daneben! Gerade beim Vergleichen von zwei Tönen lernt man am meisten.“" },
  { cat: "Willkommen", text: "„Meine Waschbär-Ohren sind schon hellwach – schnapp dir einfach ein paar Töne zum Mitlauschen!“" },
  { cat: "Willkommen", text: "„Keine Eile heute: Manchmal braucht ein neuer Klang zwei, drei Durchgänge, bis es plötzlich ‚Klick‘ macht.“" },
  { cat: "Willkommen", text: "„Unentschlossen? Der Zufall-Button gleich darunter sucht dir sofort eine passende Hör-Runde heraus.“" },
  { cat: "Willkommen", text: "„Jeder große Musiker hat einmal damit angefangen, erst mal nur zwei Töne sicher auseinanderzuhalten.“" },
  { cat: "Willkommen", text: "„Ob leise mit Kopfhörern oder laut im Wohnzimmer – fünf Minuten Lauschen tun deinen Ohren richtig gut.“" },
  { cat: "Willkommen", text: "„Stimme schon aufgewärmt? Im ‚Einsing-Helfer‘ begleitest du deine Stimmlage in fünf Minuten vom lockeren Brummen bis zum Chorklang!“" },
  { cat: "Willkommen", text: "„Keine Hand frei zum Tippen? Schalte einfach ‚Nur Hören‘ ein und lass dir die Übungen entspannt zum Mitdenken vorspielen!“" },
  { cat: "Willkommen", text: "„Neugierig auf Fachbegriffe in einer anderen Sprache? Unter den Einstellungen wechselst du live zwischen Deutsch, English, Français und Українська!“" },
  { cat: "Willkommen", text: "„Bereit für eine kleine Herausforderung? Jede Kategorie hat jetzt ihre eigene Prüfung – ganz ohne Zeitdruck und mit Bestwert im Konto!“" },

  // Kategorie 2: Mutmacher & Praxis-Tipps
  { cat: "Mutmacher", text: "„Vertrau deinem Bauchgefühl! Oft spürt man schon vor dem Nachdenken, ob ein Akkord ‚zu Hause‘ ist.“" },
  { cat: "Mutmacher", text: "„Kleiner Trick: Summ den Grundton leise mit – deine eigene Stimme ist der beste Kompass.“" },
  { cat: "Mutmacher", text: "„Wenn zwei Akkorde fast gleich klingen, achte mal nur auf den tiefen Bass-Ton ganz unten!“" },
  { cat: "Mutmacher", text: "„Noch unsicher? Nutz in der Übung jederzeit den grünen Tonika-Knopf als festen Anker.“" },
  { cat: "Mutmacher", text: "„Schließ beim nächsten Abspielen ruhig kurz die Augen – ohne Ablenkung nimmt man viel feinere Details wahr.“" },
  { cat: "Mutmacher", text: "„Abwärts-Intervalle wirken anfangs ungewohnt – stell dir beim Hören einfach eine Treppe nach unten vor!“" },
  { cat: "Mutmacher", text: "„Bei den Melodien hilft inneres Mitsingen: Merk dir zuerst nur den ersten und den letzten Ton der Vierer-Reihe.“" },
  { cat: "Mutmacher", text: "„Der Leitton Ti will fast immer nach oben zum Do – hör mal hin, wie stark diese Spannung zieht!“" },
  { cat: "Mutmacher", text: "„Daneben getippt? Prima! Genau durch diesen direkten Vergleich schärfst du dein Gehör am allerbesten.“" },
  { cat: "Mutmacher", text: "„Zehn ruhige Minuten jeden Tag schlagen langes Pauken am Stück – dein Ohr sortiert die Klänge sogar im Schlaf.“" },
  { cat: "Mutmacher", text: "„Bis zu drei Hilfslinien sehen wild aus – merk dir pro Schlüssel einfach zwei feste Anker-Noten, dann findest du jede Linie sofort!“" },
  { cat: "Mutmacher", text: "„Flitzt eine 6-Ton-Melodie zu schnell vorbei? Zähle zuerst nur den Puls leise mit – die Tonhöhen setzen sich dann fast von selbst!“" },
  { cat: "Mutmacher", text: "„Im Blindflug verstummt der Click – atme einmal ruhig ein und lass deinen Körper als Metronom sanft im Takt weiterwippen!“" },
  { cat: "Mutmacher", text: "„Ein Fehler in der Prüfung war Gold wert: Tipp in der Auswertung einfach auf Hör-Rückschau und vergleiche beide Klänge direkt nacheinander!“" },

  // Kategorie 3: Ideen zum Ausprobieren
  { cat: "Tipp", text: "„Probier oben rechts mal den Mixer aus: Wie klingt dieselbe Kadenz nur mit Streichern und Bass?“" },
  { cat: "Tipp", text: "„Kleine Abwechslung: Erkennst du die Tonika auch im 3/4-Walzertakt?“" },
  { cat: "Tipp", text: "„Achte heute mal auf die Moll-Parallele (vi): Sie klingt oft wie ein sanfter, nachdenklicher Rückblick.“" },
  { cat: "Tipp", text: "„Stell im Mixer mal auf ‚Ensemble‘ – dann begleiten dich Gitarre, Streicher und Bass als kleine Band!“" },
  { cat: "Tipp", text: "„Wie fühlt sich für dich die Subdominante (IV) an? Viele beschreiben sie wie ein weites Öffnen.“" },
  { cat: "Tipp", text: "„In Solfège und Melodien spielt ‚Ton nochmal‘ nur den einen gesuchten Ton – perfekt zum ruhigen Einprägen!“" },
  { cat: "Tipp", text: "„Bei den Melodien kannst du die gesamte Folge jederzeit wiederholen – deine erkannten Töne bleiben dabei stehen.“" },
  { cat: "Tipp", text: "„Entdecke unter ‚Wissen‘ die Instrumentenkunde – dort kannst du Streicher, Bläser oder Synthies einzeln anhören!“" },
  { cat: "Tipp", text: "„Im Mixer wartet auch das Preset ‚Orchester‘ auf dich – ideal, wenn Kadenzen mal nach großem Konzertsaal klingen sollen.“" },
  { cat: "Tipp", text: "„Zu hell am Abend? Über das Zahnrad oben rechts schaltest du jederzeit auf ‚Dunkel‘ und drei Farbpaletten um.“" },
  { cat: "Tipp", text: "„Deine Quick-Mixe auf der Startseite kannst du jederzeit in den Einstellungen (oder unter ‚Mein Konto‘) individuell anpassen und neue Favoriten anlegen!“" },
  { cat: "Tipp", text: "„Profi-Geheimnis beim Notenlesen: Während dein Finger links die aktuelle Taste sucht, wandert dein Blick schon zur nächsten Note rechts!“" },
  { cat: "Tipp", text: "„Möchtest du Noten ganz stumm wie vom Blatt lesen? Stell in der Notation ‚Notenton: Aus‘ ein – dann geht’s blitzschnell weiter!“" },
  { cat: "Tipp", text: "„Bei den Melodien kannst du zwischen ‚Rhythmische Melodie‘, ‚Kombi-Diktat‘ (Ton + Notenlänge) und gleichmäßigen Halben frei umschalten!“" },
  { cat: "Tipp", text: "„In ‚Produktion • EQ im Noise‘ hilft ein Trick aus dem Tonstudio: Schalte immer wieder auf ‚Flat-Bypass‘, bis das geboostete Band aufleuchtet!“" },
  { cat: "Tipp", text: "„Dreh im Bereich ‚Wissen‘ am interaktiven Quintenzirkel: Nachbar-Tonarten teilen sechs von sieben Tönen und klingen beim Modulieren samtweich!“" },
  { cat: "Tipp", text: "„Bei ‚Tonleitern & Modi‘ musst du nicht alle sieben Töne prüfen – such zuerst nur nach dem einen Charakterton wie der #4 bei Lydisch!“" },
  { cat: "Tipp", text: "„Lust auf deinen ganz persönlichen Look? Im Farbdesigner unter deinem Konto mischst du bis zu drei eigene Farbthemes inklusive Wunsch-Akzenten!“" },

  // Kategorie 4: Wusstest du? (Musik & Physik)
  { cat: "Wusstest du?", text: "„Fast jeder zweite Pop-Hit nutzt dieselben vier Akkorde: I – V – vi – IV.“" },
  { cat: "Wusstest du?", text: "„Bei einer Oktave schwingt der obere Ton exakt doppelt so schnell wie der untere (Verhältnis 2:1).“" },
  { cat: "Wusstest du?", text: "„Der Ruf des Kuckucks im Wald ist fast immer eine kleine oder große Terz!“" },
  { cat: "Wusstest du?", text: "„Der Anfang der Star-Wars-Melodie ist eine reine Quinte – darum klingt dieses Intervall so heldenhaft!“" },
  { cat: "Wusstest du?", text: "„Wenn eine Dominante (V) statt zur Tonika plötzlich nach Moll (vi) abbiegt, nennt man das ‚Trugschluss‘.“" },
  { cat: "Wusstest du?", text: "„Bei einer reinen Quinte schwingen die zwei Töne genau im Verhältnis 3:2 – darum klingt sie so offen und klar.“" },
  { cat: "Wusstest du?", text: "„Das berühmte ‚Der weiße Hai‘-Motiv lebt vom kleinsten Schritt unserer Musik: einer spannungsvollen kleinen Sekunde!“" },
  { cat: "Wusstest du?", text: "„Die Silben ‚Do, Re, Mi‘ stammen von Guido von Arezzo – er nutzte schon vor fast 1000 Jahren einen Hymnus als Merkhilfe.“" },
  { cat: "Wusstest du?", text: "„Warum klingen Klavier und Gitarre beim selben Ton verschieden? Jedes Instrument mischt eigene leise Obertöne dazu!“" },
  { cat: "Wusstest du?", text: "„In ‚Physik & Klang‘ siehst du live als Welle, warum reine Intervalle so ruhig und Reibungen so lebhaft flimmern.“" },
  { cat: "Wusstest du?", text: "„Der Violinschlüssel hieß früher schlicht G-Schlüssel: Seine runde Schnecke umschlingt exakt die 2. Linie von unten – das eingestrichene g'!“" },
  { cat: "Wusstest du?", text: "„Warum sitzt der Altschlüssel genau auf der Mittellinie? Damit Bratschen-Melodien weder oben noch unten in unzählige Hilfslinien abwandern!“" },
  { cat: "Wusstest du?", text: "„Rosa Rauschen (Pink Noise) fällt zu den Höhen sanft um 3 dB pro Oktave ab – dadurch besitzt jede Oktave für unser Ohr dieselbe Energie!“" },
  { cat: "Wusstest du?", text: "„Schon zehn Millisekunden formen einen Groove: Minimal vor dem Click klingt drängend und wach, knapp dahinter herrlich ‚laid-back‘!“" },
  { cat: "Wusstest du?", text: "„Warum klingt Dorisch oft gleichzeitig verträumt und hoffnungsvoll? Weil über einer Moll-Leiter plötzlich eine strahlende große Sexte aufleuchtet!“" }
];

function getMascotAssetUri(mood = "idle") {
  const map = (typeof LAUSCHER_MASCOT_DATA_URIS !== "undefined" && LAUSCHER_MASCOT_DATA_URIS) ? LAUSCHER_MASCOT_DATA_URIS : null;
  if (!map) return "";
  if (mood === "logo") return map.logo || map.listening || map.idle || "";
  if (mood === "happy") return map.happy || map.idle || "";
  if (mood === "listening") return map.listening || map.logo || map.idle || "";
  if (mood === "awaiting") return map.awaiting || map.thinking || map.idle || "";
  if (mood === "question") return map.question || map.idle || "";
  if (mood === "thinking") return map.thinking || map.awaiting || map.idle || "";
  if (mood === "break") return map.break || map.idle || "";
  return map.idle || map.question || "";
}

// Lauscher-Looks (Accessoires) sind vorerst ausgeblendet. Code, Optionen und die im Profil
// gespeicherte Auswahl (companionAccessories) bleiben erhalten – Pläne siehe docs/ideen.md.
const MASCOT_LOOKS_ENABLED = false;

function getMascotAccessorySVG(activeAccessories = []) {
  const hasAcc = (key) => activeAccessories.includes(key);
  let accessoryMarkup = "";
  if (hasAcc("headphones")) {
    accessoryMarkup += `
      <g data-acc="headphones">
        <path d="M15.2 13.8 C20.2 1.4, 45.8 5.2, 48.2 20.6" stroke="var(--sage-strong)" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M21.8 7.6 C26.8 4.8, 38.2 6.8, 43.2 11.0" stroke="var(--sage-soft)" stroke-width="1.3" stroke-linecap="round" fill="none"/>
        <g transform="translate(15.4 14.0) rotate(-26)">
          <rect x="-4.2" y="-5.8" width="7.4" height="11.6" rx="3.7" fill="var(--sage-strong)"/>
          <rect x="-3.2" y="-4.5" width="5.0" height="9.0" rx="2.5" fill="#41495E"/>
        </g>
        <g transform="translate(48.2 20.6) rotate(24)">
          <rect x="-3.2" y="-5.8" width="7.4" height="11.6" rx="3.7" fill="var(--sage-strong)"/>
          <rect x="-1.8" y="-4.5" width="5.0" height="9.0" rx="2.5" fill="#41495E"/>
        </g>
      </g>
    `;
  }
  if (hasAcc("beret")) {
    accessoryMarkup += `
      <g transform="translate(31.8 12.8) rotate(9.5)">
        <path d="M-0.4 -5.0 Q0.3 -7.2 1.6 -7.2" stroke="#41495E" stroke-width="1.45" stroke-linecap="round" fill="none"/>
        <path d="M-11.4 2.2 C-11.6 -3.6, -5.5 -5.4, 0.6 -5.0 C7.0 -4.6, 12.0 -2.0, 11.4 1.9 Q0 0.6 -11.4 2.2 Z" fill="var(--lilac-strong)" stroke="#41495E" stroke-width="1.05" stroke-linejoin="round"/>
        <path d="M-10.0 2.0 Q0 0.5 10.0 1.8" stroke="var(--lilac)" stroke-width="1.45" stroke-linecap="round" fill="none"/>
      </g>
    `;
  }
  if (hasAcc("sunglasses")) {
    accessoryMarkup += `
      <g transform="translate(26.45 28.5) rotate(7.8)">
        <path d="M-16.8 -0.4 L-13.0 -0.8 M13.0 -0.8 L16.8 -0.2" stroke="#1E2536" stroke-width="1.35" stroke-linecap="round"/>
        <rect x="-13.1" y="-4.2" width="11.5" height="8.2" rx="4.1" fill="#23263A" stroke="#EC985C" stroke-width="1.3"/>
        <rect x="1.6" y="-4.2" width="11.5" height="8.2" rx="4.1" fill="#23263A" stroke="#EC985C" stroke-width="1.3"/>
        <path d="M-1.6 -1.2 Q0 -2.6 1.6 -1.2" stroke="#EC985C" stroke-width="1.45" stroke-linecap="round" fill="none"/>
        <path d="M-10.8 -2.0 L-8.0 1.6 M3.9 -2.0 L6.7 1.6" stroke="#FFFFFF" stroke-width="1.05" stroke-linecap="round" opacity="0.55"/>
      </g>
    `;
  }
  if (hasAcc("bowtie")) {
    accessoryMarkup += `
      <g transform="translate(29.2 47.6) rotate(5)">
        <path d="M-7.2 -3.2 L-0.6 0 L-7.2 3.2 Q-8.8 0 -7.2 -3.2 Z" fill="var(--peach-strong)" stroke="#1E2536" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M7.2 -3.2 L0.6 0 L7.2 3.2 Q8.8 0 7.2 -3.2 Z" fill="var(--peach-strong)" stroke="#1E2536" stroke-width="1.1" stroke-linejoin="round"/>
        <rect x="-1.8" y="-2.1" width="3.6" height="4.2" rx="1.4" fill="var(--peach)" stroke="#1E2536" stroke-width="1.1"/>
      </g>
    `;
  }
  if (hasAcc("mic")) {
    accessoryMarkup += `
      <g>
        <rect x="4.3" y="40.5" width="6.6" height="9.6" rx="3.3" fill="#D8DCE6" stroke="#1E2536" stroke-width="1.25"/>
        <path d="M5.2 44.0 H10.0 M5.2 46.8 H10.0" stroke="#41495E" stroke-width="1.05" stroke-linecap="round"/>
        <path d="M2.8 47.0 C2.8 52.0, 12.4 52.0, 12.4 47.0" stroke="#1E2536" stroke-width="1.3" stroke-linecap="round" fill="none"/>
        <path d="M7.6 51.0 V58.0 M4.6 58.0 H10.6" stroke="#1E2536" stroke-width="1.45" stroke-linecap="round"/>
      </g>
    `;
  }
  if (hasAcc("coffee")) {
    accessoryMarkup += `
      <g>
        <path d="M47.5 47.0 H56.5 V53.5 C56.5 56.2 54.6 57.5 52.0 57.5 C49.4 57.5 47.5 56.2 47.5 53.5 Z" fill="var(--peach)" stroke="var(--peach-strong)" stroke-width="1.4" stroke-linejoin="round"/>
        <path d="M56.5 49.0 C59.5 49.0 59.5 53.8 56.5 53.8" stroke="var(--peach-strong)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
        <path d="M50.0 44.2 Q49.0 41.8 51.0 39.8 M53.8 44.2 Q52.8 41.8 54.8 39.8" stroke="#41495E" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      </g>
    `;
  }
  if (hasAcc("notes")) {
    accessoryMarkup += `
      <g>
        <ellipse cx="53.7" cy="11.7" rx="2.1" ry="1.7" fill="var(--lilac-strong)"/>
        <ellipse cx="59.7" cy="9.9" rx="2.1" ry="1.7" fill="var(--lilac-strong)"/>
        <path d="M55.4 11.4 V3.8 L61.4 2.2 V9.6" stroke="var(--lilac-strong)" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </g>
    `;
  }
  if (hasAcc("sparkles")) {
    accessoryMarkup += `
      <g>
        <path d="M7.2 6.4 Q8.1 9.3 11.0 10.2 Q8.1 11.1 7.2 14.0 Q6.3 11.1 3.4 10.2 Q6.3 9.3 7.2 6.4 Z" fill="#F2B705"/>
        <path d="M13.8 2.5 Q14.4 4.2 16.1 4.8 Q14.4 5.4 13.8 7.1 Q13.2 5.4 11.5 4.8 Q13.2 4.2 13.8 2.5 Z" fill="var(--peach-strong)"/>
        <path d="M56.5 18.1 Q57.3 20.7 59.9 21.5 Q57.3 22.3 56.5 24.9 Q55.7 22.3 53.1 21.5 Q55.7 20.7 56.5 18.1 Z" fill="#F2B705"/>
        <path d="M53.5 8.8 Q54.0 10.5 55.7 11.0 Q54.0 11.5 53.5 13.2 Q53.0 11.5 51.3 11.0 Q53.0 10.5 53.5 8.8 Z" fill="var(--peach-strong)"/>
      </g>
    `;
  }
  return accessoryMarkup;
}

function hydrateMascotStaticSlots() {
  const splashBadge = document.querySelector("#startupSplash .splash-badge");
  const listenUri = getMascotAssetUri("listening");
  if (splashBadge && listenUri) {
    splashBadge.innerHTML = `
      <svg class="splash-mascot-svg" width="84" height="84" viewBox="-1 0 68 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="${listenUri}" x="0" y="2" width="60" height="60" preserveAspectRatio="xMidYMid meet"/>
        <path class="splash-wave splash-wave-1" d="M56.5 14 C60.2 17.5 60.2 24 56.5 27.5" stroke="#2E6F4E" stroke-width="2.3" stroke-linecap="round"/>
        <path class="splash-wave splash-wave-2" d="M60.2 11.2 C64.8 16.2 64.8 25.2 60.2 30.2" stroke="#2E6F4E" stroke-width="1.9" stroke-linecap="round"/>
      </svg>
    `;
  }
}

function getMascotSVG(mood = "idle", showAccessory = false) {
  const activeAccessories = MASCOT_LOOKS_ENABLED && showAccessory && typeof state !== "undefined" && state?.profile
    ? getResolvedProfileAccessories(state.profile)
    : [];
  const hasAcc = (key) => activeAccessories.includes(key);
  const highStreak = !showAccessory && typeof state !== "undefined" && (state?.streakState?.count || 0) >= 5;
  const accessoryMarkup = getMascotAccessorySVG(activeAccessories);
  const artUri = getMascotAssetUri(mood);

  let extraBadge = "";
  if (mood === "listening") {
    extraBadge = `
      <path d="M56.5 14 C60.2 17.5 60.2 24 56.5 27.5" stroke="var(--sage-strong)" stroke-width="2.4" stroke-linecap="round" fill="none"/>
      <path d="M60.2 11.2 C64.8 16.2 64.8 25.2 60.2 30.2" stroke="var(--sage-strong)" stroke-width="1.9" stroke-linecap="round" fill="none" opacity="0.6"/>
    `;
  } else if (mood === "question") {
    extraBadge = `
      <text x="53.5" y="18" fill="var(--peach-strong)" font-size="16" font-weight="900" font-family="sans-serif">?</text>
    `;
  } else if (mood === "awaiting") {
    extraBadge = `
      <rect x="44.5" y="2.5" width="18" height="11.5" rx="5.75" fill="var(--peach)" stroke="var(--peach-strong)" stroke-width="1.6"/>
      <circle cx="45.8" cy="16.2" r="1.6" fill="var(--peach)" stroke="var(--peach-strong)" stroke-width="1.15"/>
      <circle cx="43.3" cy="19.3" r="1.05" fill="var(--peach)" stroke="var(--peach-strong)" stroke-width="1"/>
      <circle cx="49.5" cy="8.25" r="1.3" fill="var(--peach-strong)"/>
      <circle cx="53.5" cy="8.25" r="1.3" fill="var(--peach-strong)"/>
      <circle cx="57.5" cy="8.25" r="1.3" fill="var(--peach-strong)"/>
    `;
  } else if (mood === "happy" && !hasAcc("notes") && !hasAcc("sparkles") && highStreak) {
    extraBadge = `
      <text x="8.5" y="16" fill="var(--lilac-strong)" font-size="11" font-weight="900">✦</text>
      <text x="51.5" y="15.5" fill="var(--sage-strong)" font-size="13.5" font-weight="900">♪</text>
    `;
  }

  if (artUri) {
    return `
      <svg width="58" height="58" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" data-mascot-mood="${escapeHtml(mood)}">
        <image href="${artUri}" x="0" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>
        ${accessoryMarkup}
        ${extraBadge}
      </svg>
    `;
  }

  // Fallback-Vektorgrafik falls mascot-bundle.js im isolierten Test nicht geladen wurde
  const earLeftRotate = mood === "question"
    ? "rotate(-10 16.5 16)"
    : (mood === "listening" || mood === "happy" ? "rotate(-5 16.5 16)" : (mood === "awaiting" ? "rotate(-8 16.5 16)" : ""));
  const earRightRotate = mood === "listening"
    ? "rotate(9 47.5 16)"
    : (mood === "awaiting" || mood === "happy" ? "rotate(5 47.5 16)" : "");

  return `
    <svg width="58" height="58" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" data-mascot-mood="${escapeHtml(mood)}">
      <g transform="${earLeftRotate}">
        <path d="M10.5 20.5 C7.5 14.5, 11.2 8.2, 17.5 8.8 C21.5 9.2, 24.5 12.2, 24.2 16.5 Z" fill="#41495E"/>
        <circle cx="16.4" cy="15.6" r="4.1" fill="#FFAA84"/>
      </g>
      <g transform="${earRightRotate}">
        <path d="M39.8 16.5 C39.5 12.2, 42.5 9.2, 46.5 8.8 C52.8 8.2, 56.5 14.5, 53.5 20.5 Z" fill="#41495E"/>
        <circle cx="47.6" cy="15.6" r="4.1" fill="#FFAA84"/>
      </g>
      <ellipse cx="32" cy="31" rx="20" ry="16" fill="#BAC6BE"/>
      <ellipse cx="22.4" cy="30.6" rx="7.2" ry="5.5" transform="rotate(-10 22.4 30.6)" fill="#41495E"/>
      <ellipse cx="41.6" cy="30.6" rx="7.2" ry="5.5" transform="rotate(10 41.6 30.6)" fill="#41495E"/>
      <ellipse cx="32" cy="37.4" rx="6.4" ry="5.0" fill="#F6F4EE"/>
      <ellipse cx="32" cy="34.6" rx="2.7" ry="1.95" fill="#1E2536"/>
      ${accessoryMarkup}
      ${extraBadge}
    </svg>
  `;
}

const VISUAL_PREFS_STORAGE_KEY = "lauschebaer_visual_prefs_v1";
const CUSTOM_THEMES_STORAGE_KEY = "lauschebaer_custom_themes_v1";
const VALID_APPEARANCES = ["light", "dark", "system"];
const VALID_THEMES = ["waldlichtung", "morgentau", "abenddaemmerung", "metal"];
const CUSTOM_THEME_SLOT_IDS = ["custom_1", "custom_2", "custom_3"];
const ALL_VALID_THEMES = [...VALID_THEMES, ...CUSTOM_THEME_SLOT_IDS];

const CUSTOM_THEME_COLOR_FIELDS = [
  { key: "bgBase",       de: "Hintergrund",       en: "Background",       def: "#FAF7F2" },
  { key: "surfaceWhite", de: "Karten & Felder",   en: "Cards & Panels",   def: "#FFFFFF" },
  { key: "surfaceWarm",  de: "Nebenfläche",       en: "Secondary Fill",   def: "#F3EFE6" },
  { key: "surfaceHover", de: "Hover-Fläche",      en: "Hover Surface",    def: "#EAE4D7" },
  { key: "raccoonDark",  de: "Haupttext & Icons", en: "Main Text & Icons", def: "#3D405B" },
  { key: "raccoonMid",   de: "Nebentext",         en: "Secondary Text",   def: "#5E6278" },
  { key: "sage",         de: "Salbei (Fläche)",   en: "Sage (Fill)",      def: "#B8E0C8" },
  { key: "sageStrong",   de: "Salbei (Schrift)",  en: "Sage (Text)",      def: "#2E6F4E" },
  { key: "peach",        de: "Pfirsich (Fläche)", en: "Peach (Fill)",     def: "#FFD6BA" },
  { key: "peachStrong",  de: "Pfirsich (Schrift)", en: "Peach (Text)",    def: "#9C4A1A" },
  { key: "lilac",        de: "Flieder (Fläche)",  en: "Lilac (Fill)",     def: "#DCD3FF" },
  { key: "lilacStrong",  de: "Flieder (Schrift)", en: "Lilac (Text)",     def: "#4A3B8C" },
  { key: "statusOk",     de: "Status Richtig",    en: "Status Correct",   def: "#48A878" },
  { key: "statusWarn",   de: "Status Warnung",    en: "Status Warning",   def: "#E58C3A" },
  { key: "statusErr",    de: "Status Fehler",     en: "Status Error",     def: "#D96B6B" },
  { key: "borderStrong", de: "Rahmen & Linien",   en: "Borders & Lines",  def: "rgba(61, 64, 91, 0.22)" }
];

const CUSTOM_THEME_MANAGED_CSS_VARS = [
  "--bg-base", "--surface-white", "--surface-card", "--surface-warm", "--surface-soft", "--surface-hover",
  "--sage", "--sage-soft", "--sage-strong",
  "--peach", "--peach-soft", "--peach-strong",
  "--lilac", "--lilac-soft", "--lilac-strong",
  "--icon-ink", "--raccoon-dark", "--raccoon-mid", "--raccoon-muted", "--text-muted",
  "--border-soft", "--border-strong", "--tint-subtle", "--tint-subtle-soft",
  "--btn-primary-bg", "--btn-primary-fg", "--on-strong-accent",
  "--mute-bg", "--mute-border", "--dot-idle-bg",
  "--piano-key-inactive-bg", "--piano-key-inactive-border", "--piano-key-inactive-text",
  "--piano-white-active-bg", "--piano-white-active-ink",
  "--piano-black-bg-top", "--piano-black-bg-bottom", "--piano-black-border",
  "--piano-black-out-bg", "--piano-black-out-border", "--piano-black-solfege-bg", "--piano-black-solfege-ink",
  "--key-wrong-bg", "--key-wrong-ink", "--backdrop-scrim",
  "--status-ok", "--status-warn", "--status-err",
  "--shadow-card", "--shadow-float"
];

const CUSTOM_THEME_TEMPLATES = {
  "waldlichtung-light": {
    bgBase: "#FAF7F2", surfaceWhite: "#FFFFFF", surfaceWarm: "#F3EFE6", surfaceHover: "#EAE4D7",
    raccoonDark: "#3D405B", raccoonMid: "#5E6278",
    sage: "#B8E0C8", sageStrong: "#2E6F4E",
    peach: "#FFD6BA", peachStrong: "#9C4A1A",
    lilac: "#DCD3FF", lilacStrong: "#4A3B8C",
    statusOk: "#48A878", statusWarn: "#E58C3A", statusErr: "#D96B6B",
    borderStrong: "rgba(61, 64, 91, 0.22)"
  },
  "waldlichtung-dark": {
    bgBase: "#212329", surfaceWhite: "#2B2E36", surfaceWarm: "#343842", surfaceHover: "#3F4451",
    raccoonDark: "#ECEDF3", raccoonMid: "#B8BDCB",
    sage: "#385E4C", sageStrong: "#8FD7B0",
    peach: "#6B4737", peachStrong: "#FFC099",
    lilac: "#4B4173", lilacStrong: "#CABEFF",
    statusOk: "#5EC290", statusWarn: "#F09C52", statusErr: "#E67E7E",
    borderStrong: "rgba(236, 237, 243, 0.22)"
  },
  "morgentau-light": {
    bgBase: "#F3F8FA", surfaceWhite: "#FFFFFF", surfaceWarm: "#E7F0F4", surfaceHover: "#DCE8EE",
    raccoonDark: "#2E3B4E", raccoonMid: "#536378",
    sage: "#B5DCE8", sageStrong: "#1F6074",
    peach: "#F9DFC6", peachStrong: "#944F1E",
    lilac: "#C8D3F5", lilacStrong: "#39488E",
    statusOk: "#3B98AE", statusWarn: "#DC8541", statusErr: "#D6666D",
    borderStrong: "rgba(46, 59, 78, 0.22)"
  },
  "morgentau-dark": {
    bgBase: "#1E232A", surfaceWhite: "#272E37", surfaceWarm: "#303844", surfaceHover: "#3B4452",
    raccoonDark: "#E8EEF4", raccoonMid: "#B4C0CE",
    sage: "#315663", sageStrong: "#87D4E6",
    peach: "#684B39", peachStrong: "#F7C79E",
    lilac: "#424B74", lilacStrong: "#B8C6FF",
    statusOk: "#59B9CE", statusWarn: "#EC9854", statusErr: "#E47B82",
    borderStrong: "rgba(232, 238, 244, 0.22)"
  },
  "abenddaemmerung-light": {
    bgBase: "#F7F4F8", surfaceWhite: "#FFFFFF", surfaceWarm: "#EFEAF2", surfaceHover: "#E5DDE9",
    raccoonDark: "#3E354F", raccoonMid: "#635875",
    sage: "#BFE0D4", sageStrong: "#276852",
    peach: "#F5CDC4", peachStrong: "#933E30",
    lilac: "#D8C7F5", lilacStrong: "#533688",
    statusOk: "#3F9E78", statusWarn: "#DF7B57", statusErr: "#D5636E",
    borderStrong: "rgba(62, 53, 79, 0.22)"
  },
  "abenddaemmerung-dark": {
    bgBase: "#22202A", surfaceWhite: "#2C2936", surfaceWarm: "#353141", surfaceHover: "#403C4E",
    raccoonDark: "#ECE9F4", raccoonMid: "#BCB6CB",
    sage: "#355B4E", sageStrong: "#8ED4BA",
    peach: "#6B423B", peachStrong: "#F9B8AC",
    lilac: "#4E3E73", lilacStrong: "#CDB8FF",
    statusOk: "#5EC09B", statusWarn: "#ED8D69", statusErr: "#E67984",
    borderStrong: "rgba(236, 233, 244, 0.22)"
  },
  "metal-dark": {
    bgBase: "#090A0D", surfaceWhite: "#121419", surfaceWarm: "#191C22", surfaceHover: "#232730",
    raccoonDark: "#ECEFF4", raccoonMid: "#A3ABB8",
    sage: "#1D3B54", sageStrong: "#6BB4EA",
    peach: "#4D1922", peachStrong: "#EB6A78",
    lilac: "#232733", lilacStrong: "#A6B0C2",
    statusOk: "#46B884", statusWarn: "#E58C45", statusErr: "#E65A68",
    borderStrong: "rgba(255, 255, 255, 0.24)"
  }
};

function clampByte(n) {
  return Math.max(0, Math.min(255, Math.round(Number(n) || 0)));
}

function clampAlpha(a) {
  const num = Number(a);
  if (!Number.isFinite(num)) return 1;
  return Math.max(0, Math.min(1, Math.round(num * 100) / 100));
}

function parseCssColorToRgba(input, fallback = "#FAF7F2") {
  const raw = String(input || "").trim();
  const shortHex = raw.match(/^#([0-9a-f]{3})$/i);
  if (shortHex) {
    const h = shortHex[1];
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16),
      a: 1
    };
  }
  const hex6 = raw.match(/^#([0-9a-f]{6})$/i);
  if (hex6) {
    const h = hex6[1];
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: 1
    };
  }
  const hex8 = raw.match(/^#([0-9a-f]{8})$/i);
  if (hex8) {
    const h = hex8[1];
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: clampAlpha(parseInt(h.slice(6, 8), 16) / 255)
    };
  }
  const rgbMatch = raw.match(/^rgba?\(\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)(?:\s*,\s*([+-]?\d*(?:\.\d+)?%?))?\s*\)$/i);
  if (rgbMatch) {
    let a = 1;
    if (rgbMatch[4] !== undefined) {
      a = rgbMatch[4].endsWith("%") ? parseFloat(rgbMatch[4]) / 100 : parseFloat(rgbMatch[4]);
    }
    return {
      r: clampByte(rgbMatch[1]),
      g: clampByte(rgbMatch[2]),
      b: clampByte(rgbMatch[3]),
      a: clampAlpha(a)
    };
  }
  if (raw !== fallback && fallback) {
    return parseCssColorToRgba(fallback, "#FAF7F2");
  }
  return { r: 250, g: 247, b: 242, a: 1 };
}

function rgbaToExplicitString(rgba) {
  const r = clampByte(rgba?.r);
  const g = clampByte(rgba?.g);
  const b = clampByte(rgba?.b);
  const a = clampAlpha(rgba?.a);
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
}

function rgbaToCssString(rgba) {
  const r = clampByte(rgba?.r);
  const g = clampByte(rgba?.g);
  const b = clampByte(rgba?.b);
  const a = clampAlpha(rgba?.a);
  if (a >= 0.995) {
    return rgbaToHex({ r, g, b, a: 1 }, false);
  }
  return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(2))})`;
}

function rgbaToHex(rgba, includeAlpha = false) {
  const toHex = (v) => clampByte(v).toString(16).toUpperCase().padStart(2, "0");
  const base = `#${toHex(rgba?.r)}${toHex(rgba?.g)}${toHex(rgba?.b)}`;
  if (!includeAlpha) return base;
  return base + toHex(Math.round(clampAlpha(rgba?.a) * 255));
}

function rgbToHsv(rgba) {
  const r = clampByte(rgba?.r) / 255;
  const g = clampByte(rgba?.g) / 255;
  const b = clampByte(rgba?.b) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d > 0.00001) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return {
    h: Math.round(h * 360) % 360,
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}

function hsvToRgb(hsv) {
  const h = (((Number(hsv?.h) || 0) % 360) + 360) % 360;
  const s = Math.max(0, Math.min(100, Number(hsv?.s) || 0)) / 100;
  const v = Math.max(0, Math.min(100, Number(hsv?.v) || 0)) / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let rp = 0, gp = 0, bp = 0;
  if (h < 60) { rp = c; gp = x; }
  else if (h < 120) { rp = x; gp = c; }
  else if (h < 180) { gp = c; bp = x; }
  else if (h < 240) { gp = x; bp = c; }
  else if (h < 300) { rp = x; bp = c; }
  else { rp = c; bp = x; }
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255)
  };
}

function mixRgba(fg, bg, weight = 0.5) {
  const w = Math.max(0, Math.min(1, Number(weight)));
  const a = clampAlpha((fg.a * w) + (bg.a * (1 - w)));
  return {
    r: Math.round(fg.r * w + bg.r * (1 - w)),
    g: Math.round(fg.g * w + bg.g * (1 - w)),
    b: Math.round(fg.b * w + bg.b * (1 - w)),
    a: a
  };
}

function relativeLuminance(rgb) {
  const lin = (c) => {
    const s = clampByte(c) / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(rgb.r) + 0.7152 * lin(rgb.g) + 0.0722 * lin(rgb.b);
}

function sanitizeCustomThemeColors(rawColors) {
  const base = CUSTOM_THEME_TEMPLATES["waldlichtung-light"];
  const out = {};
  CUSTOM_THEME_COLOR_FIELDS.forEach(f => {
    const val = rawColors && typeof rawColors === "object" ? rawColors[f.key] : undefined;
    out[f.key] = rgbaToCssString(parseCssColorToRgba(val || base[f.key], base[f.key]));
  });
  return out;
}

function buildDerivedCustomThemeVars(rawColors) {
  const colors = sanitizeCustomThemeColors(rawColors);
  const c = {};
  CUSTOM_THEME_COLOR_FIELDS.forEach(f => {
    c[f.key] = parseCssColorToRgba(colors[f.key], f.def);
  });

  // Alpha über neutraler Fläche mischen, damit Hell/Dunkel-Erkennung stabil bleibt
  const bgComposited = mixRgba(c.bgBase, { r: 255, g: 255, b: 255, a: 1 }, c.bgBase.a);
  const isDark = relativeLuminance(bgComposited) < 0.44;
  const mutedRgba = mixRgba(c.raccoonMid, c.bgBase, 0.72);
  const sageSoftRgba = mixRgba(c.sage, c.surfaceWhite, 0.34);
  const peachSoftRgba = mixRgba(c.peach, c.surfaceWhite, 0.34);
  const lilacSoftRgba = mixRgba(c.lilac, c.surfaceWhite, 0.34);
  const wrongBgRgba = mixRgba(c.statusErr, c.surfaceWhite, isDark ? 0.32 : 0.25);
  const dotIdleRgba = mixRgba(c.raccoonMid, c.surfaceWarm, 0.36);

  const primaryLum = relativeLuminance(c.raccoonDark);
  const iconInkRgba = isDark
    ? mixRgba({ r: 255, g: 255, b: 255, a: 1 }, c.raccoonDark, 0.22)
    : mixRgba({ r: 0, g: 0, b: 0, a: 1 }, c.raccoonDark, 0.28);

  const cssVars = {
    "--bg-base": colors.bgBase,
    "--surface-white": colors.surfaceWhite,
    "--surface-card": colors.surfaceWhite,
    "--surface-warm": colors.surfaceWarm,
    "--surface-soft": colors.surfaceWarm,
    "--surface-hover": colors.surfaceHover,
    "--sage": colors.sage,
    "--sage-soft": rgbaToCssString(sageSoftRgba),
    "--sage-strong": colors.sageStrong,
    "--peach": colors.peach,
    "--peach-soft": rgbaToCssString(peachSoftRgba),
    "--peach-strong": colors.peachStrong,
    "--lilac": colors.lilac,
    "--lilac-soft": rgbaToCssString(lilacSoftRgba),
    "--lilac-strong": colors.lilacStrong,
    "--icon-ink": rgbaToCssString(iconInkRgba),
    "--raccoon-dark": colors.raccoonDark,
    "--raccoon-mid": colors.raccoonMid,
    "--raccoon-muted": rgbaToCssString(mutedRgba),
    "--text-muted": rgbaToCssString(mutedRgba),
    "--border-soft": `rgba(${c.borderStrong.r}, ${c.borderStrong.g}, ${c.borderStrong.b}, ${clampAlpha(c.borderStrong.a * 0.52)})`,
    "--border-strong": colors.borderStrong,
    "--tint-subtle": `rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.08)`,
    "--tint-subtle-soft": `rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.06)`,
    "--btn-primary-bg": colors.raccoonDark,
    "--btn-primary-fg": primaryLum > 0.52 ? "#1C1E26" : "#FFFFFF",
    "--on-strong-accent": isDark ? "#1B1E24" : "#FFFFFF",
    "--mute-bg": `rgba(${c.statusErr.r}, ${c.statusErr.g}, ${c.statusErr.b}, 0.16)`,
    "--mute-border": `rgba(${c.statusErr.r}, ${c.statusErr.g}, ${c.statusErr.b}, 0.36)`,
    "--dot-idle-bg": rgbaToCssString(dotIdleRgba),
    "--piano-key-inactive-bg": isDark ? "#454956" : "#C4C0B7",
    "--piano-key-inactive-border": isDark ? "#595E6D" : "#9C988F",
    "--piano-key-inactive-text": isDark ? "#A4A9B8" : "#6B6D7E",
    "--piano-white-active-bg": isDark ? "#DCE0E8" : colors.surfaceWhite,
    "--piano-white-active-ink": isDark ? "#22252F" : colors.raccoonDark,
    "--piano-black-bg-top": isDark ? "#1E212B" : "#3D405B",
    "--piano-black-bg-bottom": isDark ? "#15171E" : "#242639",
    "--piano-black-border": isDark ? "#0F1117" : "#1C1E2E",
    "--piano-black-out-bg": isDark ? "#5E6376" : "#8E91A2",
    "--piano-black-out-border": isDark ? "#323644" : "#66697A",
    "--piano-black-solfege-bg": colors.bgBase,
    "--piano-black-solfege-ink": colors.raccoonDark,
    "--key-wrong-bg": rgbaToCssString(wrongBgRgba),
    "--key-wrong-ink": isDark ? "#FFE2E2" : colors.raccoonDark,
    "--backdrop-scrim": isDark
      ? "rgba(16, 18, 24, 0.68)"
      : `rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.45)`,
    "--status-ok": colors.statusOk,
    "--status-warn": colors.statusWarn,
    "--status-err": colors.statusErr,
    "--shadow-card": isDark
      ? "0 4px 16px rgba(10, 12, 16, 0.28)"
      : `0 4px 16px rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.06)`,
    "--shadow-float": isDark
      ? "0 12px 30px rgba(8, 10, 14, 0.42)"
      : `0 10px 28px rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.14)`
  };

  const metaBg = rgbaToHex(bgComposited, false);
  const paletteMeta = {
    bg: metaBg,
    swatches: [colors.bgBase, colors.sage, colors.peach, colors.lilac],
    grid: `rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.22)`,
    zeroLine: `rgba(${c.raccoonDark.r}, ${c.raccoonDark.g}, ${c.raccoonDark.b}, 0.12)`,
    track1Label: colors.sageStrong,
    track2Label: colors.peachStrong,
    track3Label: colors.raccoonDark,
    wave1: colors.statusOk,
    wave2: colors.statusWarn,
    wave3: colors.raccoonDark
  };

  return { colors, cssVars, isDark, metaBg, paletteMeta };
}

function sanitizeCustomThemeEntry(raw, slotIndex) {
  if (!raw || typeof raw !== "object") return null;
  const idx = Math.max(0, Math.min(2, Number(slotIndex) || 0));
  const id = CUSTOM_THEME_SLOT_IDS[idx];
  const fallbackName = `Eigenes Theme ${idx + 1}`;
  const name = String(raw.name || "").trim().slice(0, 28) || fallbackName;
  const built = buildDerivedCustomThemeVars(raw.colors || raw);
  return {
    id,
    slotIndex: idx,
    name,
    colors: built.colors,
    cssVars: built.cssVars,
    isDark: built.isDark,
    metaBg: built.metaBg,
    paletteMeta: built.paletteMeta,
    updatedAt: Number(raw.updatedAt) || Date.now()
  };
}

function sanitizeCustomThemesArray(rawList) {
  const result = [null, null, null];
  if (!Array.isArray(rawList)) return result;
  for (let i = 0; i < 3; i++) {
    const candidate = rawList[i] || rawList.find(item => item && item.id === CUSTOM_THEME_SLOT_IDS[i]);
    result[i] = sanitizeCustomThemeEntry(candidate, i);
  }
  return result;
}

function isCustomThemeStorageWritable() {
  try {
    if (typeof localStorage === "undefined") return false;
    const probeKey = "__lb_theme_probe__";
    localStorage.setItem(probeKey, "1");
    localStorage.removeItem(probeKey);
    return true;
  } catch (_err) {
    return false;
  }
}

function loadCustomThemesFromStorage() {
  try {
    if (typeof localStorage === "undefined") return [null, null, null];
    const raw = localStorage.getItem(CUSTOM_THEMES_STORAGE_KEY);
    if (!raw) return [null, null, null];
    return sanitizeCustomThemesArray(JSON.parse(raw));
  } catch (_err) {
    return [null, null, null];
  }
}

function saveCustomThemesToStorage(slots) {
  const clean = sanitizeCustomThemesArray(slots);
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(CUSTOM_THEMES_STORAGE_KEY, JSON.stringify(clean));
    }
  } catch (_err) {
    // Auf eingeschränkten WebViews ignorieren
  }
  return clean;
}

function applyCustomThemeCssVars(themeEntry) {
  if (typeof document === "undefined" || !document.documentElement || !themeEntry?.cssVars) return;
  const rootStyle = document.documentElement.style;
  if (!rootStyle || typeof rootStyle.setProperty !== "function") return;
  Object.entries(themeEntry.cssVars).forEach(([prop, val]) => {
    rootStyle.setProperty(prop, val);
  });
  rootStyle.colorScheme = themeEntry.isDark ? "dark" : "light";
}

function clearCustomThemeCssVars() {
  if (typeof document === "undefined" || !document.documentElement) return;
  const rootStyle = document.documentElement.style;
  if (!rootStyle || typeof rootStyle.removeProperty !== "function") return;
  CUSTOM_THEME_MANAGED_CSS_VARS.forEach(prop => {
    rootStyle.removeProperty(prop);
  });
  rootStyle.colorScheme = "";
}

const THEME_PALETTE_META = {
  waldlichtung: {
    light: {
      bg: "#FAF7F2",
      swatches: ["#FAF7F2", "#B8E0C8", "#FFD6BA", "#DCD3FF"],
      grid: "rgba(61, 64, 91, 0.25)",
      zeroLine: "rgba(61, 64, 91, 0.12)",
      track1Label: "#2E6F4E",
      track2Label: "#9C4A1A",
      track3Label: "#3D405B",
      wave1: "#48A878",
      wave2: "#E58C3A",
      wave3: "#3D405B"
    },
    dark: {
      bg: "#212329",
      swatches: ["#212329", "#385E4C", "#6B4737", "#4B4173"],
      grid: "rgba(236, 237, 243, 0.22)",
      zeroLine: "rgba(236, 237, 243, 0.12)",
      track1Label: "#8FD7B0",
      track2Label: "#FFC099",
      track3Label: "#ECEDF3",
      wave1: "#5EC290",
      wave2: "#F09C52",
      wave3: "#CABEFF"
    }
  },
  morgentau: {
    light: {
      bg: "#F3F8FA",
      swatches: ["#F3F8FA", "#B5DCE8", "#F9DFC6", "#C8D3F5"],
      grid: "rgba(46, 59, 78, 0.25)",
      zeroLine: "rgba(46, 59, 78, 0.12)",
      track1Label: "#1F6074",
      track2Label: "#944F1E",
      track3Label: "#2E3B4E",
      wave1: "#3B98AE",
      wave2: "#DC8541",
      wave3: "#2E3B4E"
    },
    dark: {
      bg: "#1E232A",
      swatches: ["#1E232A", "#315663", "#684B39", "#424B74"],
      grid: "rgba(232, 238, 244, 0.22)",
      zeroLine: "rgba(232, 238, 244, 0.12)",
      track1Label: "#87D4E6",
      track2Label: "#F7C79E",
      track3Label: "#E8EEF4",
      wave1: "#59B9CE",
      wave2: "#EC9854",
      wave3: "#B8C6FF"
    }
  },
  abenddaemmerung: {
    light: {
      bg: "#F7F4F8",
      swatches: ["#F7F4F8", "#BFE0D4", "#F5CDC4", "#D8C7F5"],
      grid: "rgba(62, 53, 79, 0.25)",
      zeroLine: "rgba(62, 53, 79, 0.12)",
      track1Label: "#276852",
      track2Label: "#933E30",
      track3Label: "#3E354F",
      wave1: "#3F9E78",
      wave2: "#DF7B57",
      wave3: "#3E354F"
    },
    dark: {
      bg: "#22202A",
      swatches: ["#22202A", "#355B4E", "#6B423B", "#4E3E73"],
      grid: "rgba(236, 233, 244, 0.22)",
      zeroLine: "rgba(236, 233, 244, 0.12)",
      track1Label: "#8ED4BA",
      track2Label: "#F9B8AC",
      track3Label: "#ECE9F4",
      wave1: "#5EC09B",
      wave2: "#ED8D69",
      wave3: "#CDB8FF"
    }
  },
  metal: {
    light: {
      bg: "#090A0D",
      swatches: ["#090A0D", "#2D6394", "#B52B3B", "#9EA6B4"],
      grid: "rgba(236, 239, 244, 0.22)",
      zeroLine: "rgba(236, 239, 244, 0.12)",
      track1Label: "#6BB4EA",
      track2Label: "#EB6A78",
      track3Label: "#ECEFF4",
      wave1: "#58A6E6",
      wave2: "#EB6A78",
      wave3: "#9EA6B4"
    },
    dark: {
      bg: "#090A0D",
      swatches: ["#090A0D", "#2D6394", "#B52B3B", "#9EA6B4"],
      grid: "rgba(236, 239, 244, 0.22)",
      zeroLine: "rgba(236, 239, 244, 0.12)",
      track1Label: "#6BB4EA",
      track2Label: "#EB6A78",
      track3Label: "#ECEFF4",
      wave1: "#58A6E6",
      wave2: "#EB6A78",
      wave3: "#9EA6B4"
    }
  }
};

function isFirstRunOnboardingNeeded() {
  try {
    if (typeof localStorage === "undefined") return false;
    const rawVisual = localStorage.getItem(VISUAL_PREFS_STORAGE_KEY);
    const rawProfile = localStorage.getItem(PERSONAL_PROFILE_STORAGE_KEY);
    if (!rawVisual && !rawProfile) return true;
    if (rawVisual) {
      const parsed = JSON.parse(rawVisual);
      if (parsed && parsed.onboardingDone === false) return true;
    }
    return false;
  } catch (_err) {
    return false;
  }
}

function loadVisualPrefs() {
  try {
    if (typeof localStorage === "undefined") {
      return { appearance: "light", theme: "waldlichtung", language: "de", autoNextAfterCorrect: true, playCorrectAnswerAudio: true, onboardingDone: true };
    }
    const raw = localStorage.getItem(VISUAL_PREFS_STORAGE_KEY);
    if (!raw) {
      const hasProfile = Boolean(localStorage.getItem(PERSONAL_PROFILE_STORAGE_KEY));
      return { appearance: "light", theme: "waldlichtung", language: "de", autoNextAfterCorrect: true, playCorrectAnswerAudio: true, onboardingDone: hasProfile };
    }
    const parsed = JSON.parse(raw);
    return {
      appearance: VALID_APPEARANCES.includes(parsed?.appearance) ? parsed.appearance : "light",
      theme: ALL_VALID_THEMES.includes(parsed?.theme) ? parsed.theme : "waldlichtung",
      language: typeof normalizeAppLanguage === "function" ? normalizeAppLanguage(parsed?.language) : (parsed?.language === "en" ? "en" : "de"),
      autoNextAfterCorrect: parsed?.autoNextAfterCorrect !== false,
      playCorrectAnswerAudio: parsed?.playCorrectAnswerAudio !== false,
      onboardingDone: parsed?.onboardingDone !== false
    };
  } catch (_err) {
    return { appearance: "light", theme: "waldlichtung", language: "de", autoNextAfterCorrect: true, playCorrectAnswerAudio: true, onboardingDone: true };
  }
}

function saveVisualPrefs(
  appearance,
  theme,
  language = (typeof state !== "undefined" ? state?.settings?.language : null),
  autoNextAfterCorrect = (typeof state !== "undefined" ? state?.settings?.autoNextAfterCorrect : true),
  playCorrectAnswerAudio = (typeof state !== "undefined" ? state?.settings?.playCorrectAnswerAudio : true),
  onboardingDone = (typeof state !== "undefined" ? state?.settings?.onboardingDone : true)
) {
  try {
    if (typeof localStorage === "undefined") return;
    const validLang = typeof normalizeAppLanguage === "function" ? normalizeAppLanguage(language) : (language === "en" ? "en" : "de");
    const validAutoNext = autoNextAfterCorrect !== false;
    const validAnswerAudio = playCorrectAnswerAudio !== false;
    const validOnboardingDone = onboardingDone !== false;
    localStorage.setItem(
      VISUAL_PREFS_STORAGE_KEY,
      JSON.stringify({
        appearance,
        theme,
        language: validLang,
        autoNextAfterCorrect: validAutoNext,
        playCorrectAnswerAudio: validAnswerAudio,
        onboardingDone: validOnboardingDone
      })
    );
  } catch (_err) {
    // Auf eingeschränkten content:// oder privaten WebViews ignorieren
  }
}

const PERSONAL_PROFILE_STORAGE_KEY = "lauschebaer_profile_v1";
const PROFILE_INSTRUMENT_OPTIONS = ["Klavier", "Gitarre", "Gesang", "Bass", "Schlagzeug", "Bläser", "Produktion"];
const PROFILE_FOCUS_OPTIONS = {
  allround:   { key: "allround",   label: "Allrounder",           hint: "Quer durch alle Übungen",          mode: "cadence" },
  harmony:    { key: "harmony",    label: "Akkorde & Harmonie",   hint: "Kadenzen & Mehrklänge schärfen",   mode: "cadence" },
  melody:     { key: "melody",     label: "Melodie & Gehör",      hint: "Solfège & Melodie-Linien üben",    mode: "melody" },
  rhythm:     { key: "rhythm",     label: "Rhythmus & Groove",    hint: "Metrum, Klopfen & Mikro-Timing",   mode: "rhythm-tap" },
  notation:   { key: "notation",   label: "Notation & Lesen",     hint: "Violin-, Bass-, Altschlüssel & Hilfslinien", mode: "notation-treble" },
  production: { key: "production", label: "Produktion & Mixing",  hint: "Frequenzen & EQ im Noise üben",    mode: "prod-eq-noise" },
  modes:      { key: "modes",      label: "Tonleitern & Modi",    hint: "Kirchentonarten & Charaktertöne",  mode: "modes-scale" }
};
const PROFILE_ACCESSORY_OPTIONS = [
  { key: "headphones", label: "Kopfhörer" },
  { key: "sunglasses", label: "Sonnenbrille" },
  { key: "beret",      label: "Jazz-Barett" },
  { key: "bowtie",     label: "Konzert-Fliege" },
  { key: "mic",        label: "Studio-Mikro" },
  { key: "coffee",     label: "Kaffeepause" },
  { key: "notes",      label: "Noten-Flair" },
  { key: "sparkles",   label: "Sternen-Glanz" }
];
const PROFILE_ACCESSORY_NONE_KEY = "none";

function normalizeProfileFocuses(rawFocuses, fallbackFocus) {
  const validKeys = Object.keys(PROFILE_FOCUS_OPTIONS);
  const src = Array.isArray(rawFocuses)
    ? rawFocuses
    : (typeof rawFocuses === "string" ? [rawFocuses] : []);
  const set = new Set(src.filter(k => Object.prototype.hasOwnProperty.call(PROFILE_FOCUS_OPTIONS, k)));
  if (set.size === 0 && Object.prototype.hasOwnProperty.call(PROFILE_FOCUS_OPTIONS, fallbackFocus)) {
    set.add(fallbackFocus);
  }
  const specific = validKeys.filter(k => k !== "allround" && set.has(k));
  return specific.length > 0 ? specific : ["allround"];
}

function getResolvedProfileFocuses(profile = state?.profile) {
  if (!profile) return ["allround"];
  const arr = Array.isArray(profile.focuses) ? normalizeProfileFocuses(profile.focuses) : null;
  if (!arr) return normalizeProfileFocuses(null, profile.focus);
  const singlePrimary = arr[0] || "allround";
  if (arr.length <= 1 && typeof profile.focus === "string" && Object.prototype.hasOwnProperty.call(PROFILE_FOCUS_OPTIONS, profile.focus) && profile.focus !== singlePrimary) {
    return [profile.focus];
  }
  return arr;
}

function toggleProfileFocusValue(currentList, nextKey) {
  const validKeys = Object.keys(PROFILE_FOCUS_OPTIONS);
  if (nextKey === "allround" || !Object.prototype.hasOwnProperty.call(PROFILE_FOCUS_OPTIONS, nextKey)) {
    return ["allround"];
  }
  const set = new Set((currentList || []).filter(k => k !== "allround" && Object.prototype.hasOwnProperty.call(PROFILE_FOCUS_OPTIONS, k)));
  if (set.has(nextKey)) set.delete(nextKey);
  else set.add(nextKey);
  const next = validKeys.filter(k => k !== "allround" && set.has(k));
  return next.length > 0 ? next : ["allround"];
}

function normalizeProfileAccessories(rawAccessories, fallbackAccessory) {
  const validOrder = PROFILE_ACCESSORY_OPTIONS.map(a => a.key);
  if (Array.isArray(rawAccessories)) {
    const set = new Set(rawAccessories.filter(k => validOrder.includes(k)));
    return validOrder.filter(k => set.has(k));
  }
  if (fallbackAccessory === PROFILE_ACCESSORY_NONE_KEY) {
    return [];
  }
  if (typeof fallbackAccessory === "string" && validOrder.includes(fallbackAccessory)) {
    return [fallbackAccessory];
  }
  return [];
}

function getResolvedProfileAccessories(profile = state?.profile) {
  if (!profile) return [];
  const validOrder = PROFILE_ACCESSORY_OPTIONS.map(a => a.key);
  const arr = Array.isArray(profile.companionAccessories)
    ? validOrder.filter(k => profile.companionAccessories.includes(k))
    : null;
  if (!arr) {
    return normalizeProfileAccessories(null, profile.companionAccessory);
  }
  const singlePrimary = arr[0] || PROFILE_ACCESSORY_NONE_KEY;
  if (arr.length <= 1 && typeof profile.companionAccessory === "string" && profile.companionAccessory !== singlePrimary) {
    if (profile.companionAccessory === PROFILE_ACCESSORY_NONE_KEY) return [];
    if (validOrder.includes(profile.companionAccessory)) return [profile.companionAccessory];
  }
  return arr;
}

function toggleProfileAccessoryValue(currentList, nextKey) {
  const validOrder = PROFILE_ACCESSORY_OPTIONS.map(a => a.key);
  if (nextKey === PROFILE_ACCESSORY_NONE_KEY || !validOrder.includes(nextKey)) {
    return nextKey === PROFILE_ACCESSORY_NONE_KEY ? [] : validOrder.filter(k => (currentList || []).includes(k));
  }
  const set = new Set((currentList || []).filter(k => validOrder.includes(k)));
  if (set.has(nextKey)) set.delete(nextKey);
  else set.add(nextKey);
  return validOrder.filter(k => set.has(k));
}
const MIX_MODE_CATALOG = {
  "cadence":               { label: "Kadenzen",                     levels: [1, 2, 3, 4] },
  "interval-melodic":      { label: "Intervalle (Aufwärts)",          levels: [1, 2, 3] },
  "interval-melodic-down": { label: "Intervalle (Abwärts)",           levels: [1, 2, 3] },
  "interval-harmonic":     { label: "Intervalle (Gleichz.)",          levels: [1, 2, 3] },
  "interval-drone":        { label: "Intervalle (Grundton-Fläche)",   levels: [1, 2, 3] },
  "chord-arp-up":          { label: "Akkorde (Arpeggio ↗)",         levels: [1, 2, 3, 4] },
  "chord-arp-down":        { label: "Akkorde (Arpeggio ↘)",         levels: [1, 2, 3, 4] },
  "interval-chords":       { label: "Akkorde (Gleichz.)",           levels: [1, 2, 3, 4] },
  "chord-inversions":      { label: "Akkordumkehrungen",            levels: [1, 2, 3] },
  "solfege":               { label: "Solfège",                      levels: [1, 2, 3, 4, 5, 6] },
  "melody":                { label: "Melodie-Phrasen",              levels: ["do-fa", "sol-do", "full"] },
  "rhythm-meter":          { label: "Rhythmus • Taktart",           levels: [1, 2, 3] },
  "rhythm-dictation":      { label: "Rhythmus • Diktat",            levels: [1, 2, 3, 4] },
  "rhythm-tap":            { label: "Rhythmus • Nachklopfen",       levels: [1, 2, 3, 4] },
  "rhythm-groove":         { label: "Rhythmus • Groove",            levels: [1, 2, 3, 4] },
  "prod-tone":             { label: "Produktion • Frequenzen",      levels: [1, 2, 3] },
  "prod-eq-noise":         { label: "Produktion • EQ im Noise",     levels: [1, 2, 3] },
  "modes-scale":           { label: "Modi • Tonleitern erkennen",   levels: [1, 2, 3] },
  "modes-char":            { label: "Modi • Charakterton",          levels: [1, 2, 3] },
  "modes-cadence":         { label: "Modi • Kadenzen & Vamps",      levels: [1, 2] },
  "notation-treble":       { label: "Notation • Violinschlüssel",   levels: [1, 2, 3, 4] },
  "notation-bass":         { label: "Notation • Bassschlüssel",     levels: [1, 2, 3, 4] },
  "notation-alto":         { label: "Notation • Altschlüssel",      levels: [1, 2, 3, 4] },
  "notation-mixed":        { label: "Notation • Schlüssel-Mix",     levels: [1, 2, 3, 4] }
};

function createDefaultMixes() {
  return [
    { id: "mix_warmup",    title: "Morgen-Warmup",      mode: "solfege",          level: 1,       melodyRange: "do-fa", melodyKeyMode: "fixed", melodyOctaveMode: "single", bpm: 0 },
    { id: "mix_intervals", title: "Intervall-Fokus",    mode: "interval-melodic", level: 2,       melodyRange: "do-fa", melodyKeyMode: "fixed", melodyOctaveMode: "single", bpm: 0 },
    { id: "mix_groove",    title: "Timing & Blindflug", mode: "rhythm-tap",       level: 4,       melodyRange: "do-fa", melodyKeyMode: "fixed", melodyOctaveMode: "single", bpm: 85 }
  ];
}

const EXAM_CATEGORY_LEVELS = {
  interval: {
    accent: "peach",
    presets: [
      {
        id: "interval_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Grundlagen", en: "Level 1 • Foundations" },
        desc: {
          de: "Prime, gr. Terz, Quinte & Oktave (Aufwärts, Abwärts, Harmonisch & Grundton-Fläche)",
          en: "Unison, Maj 3rd, 5th & Octave (Ascending, Descending, Harmonic & Root Pad)"
        },
        modes: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone"],
        apply: { intervalDifficulty: 1, keyMode: "fixed" }
      },
      {
        id: "interval_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Diatonisch", en: "Level 2 • Diatonic" },
        desc: {
          de: "Alle diatonischen Dur-Intervalle gemischt über leichte Tonarten (inkl. Grundton-Fläche)",
          en: "All diatonic major intervals mixed across easy keys (incl. root pad)"
        },
        modes: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone"],
        apply: { intervalDifficulty: 2, keyMode: "easy" }
      },
      {
        id: "interval_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • Alle 13 Intervalle", en: "Level 3 • All 13 Intervals" },
        desc: {
          de: "Chromatisches Gesamt-Spektrum inkl. Tritonus & kl./gr. Intervalle (inkl. Grundton-Fläche)",
          en: "Full chromatic spectrum incl. tritone & minor/major intervals (incl. root pad)"
        },
        modes: ["interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone"],
        apply: { intervalDifficulty: 3, keyMode: "all" }
      }
    ]
  },
  chords: {
    accent: "sage",
    presets: [
      {
        id: "chords_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Basis-Dreiklänge & Lagen", en: "Level 1 • Basic Triads & Inversions" },
        desc: {
          de: "Dur, Moll, Vermindert, Übermäßig & Dreiklang-Umkehrungen (Arp ↗/↘, Akkord & Bass)",
          en: "Major, Minor, Diminished, Augmented & Triad Inversions (Arp ↗/↘, Block & Bass)"
        },
        modes: ["chord-arp-up", "chord-arp-down", "interval-chords", "chord-inversions"],
        apply: { chordDifficulty: 1, chordInversionDifficulty: 1, keyMode: "fixed" }
      },
      {
        id: "chords_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Septakkorde & Lagen", en: "Level 2 • Seventh Chords & Inversions" },
        desc: {
          de: "Dreiklänge + Maj7 & Dom7 sowie 1./2. Umkehrung in leichten Tonarten",
          en: "Triads + Maj7 & Dom7 plus 1st/2nd inversions in easy keys"
        },
        modes: ["chord-arp-up", "chord-arp-down", "interval-chords", "chord-inversions"],
        apply: { chordDifficulty: 2, chordInversionDifficulty: 2, keyMode: "easy" }
      },
      {
        id: "chords_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • Alle Vierklänge", en: "Level 3 • All Seventh Chords" },
        desc: {
          de: "Vollständiges Akkord- & Umkehrungsspektrum (inkl. m7, m7b5 & 3. Umkehrung)",
          en: "Full chord quality & inversion spectrum (incl. m7, m7b5 & 3rd inversion)"
        },
        modes: ["chord-arp-up", "chord-arp-down", "interval-chords", "chord-inversions"],
        apply: { chordDifficulty: 3, chordInversionDifficulty: 3, keyMode: "easy" }
      },
      {
        id: "chords_l4",
        levelNumber: 4,
        title: { de: "Stufe 4 • Profi-Harmonik", en: "Level 4 • Pro Harmony" },
        desc: {
          de: "Alle Akkordtypen & Umkehrungen in allen 12 Tonarten",
          en: "All chord types & inversions modulated across all 12 keys"
        },
        modes: ["chord-arp-up", "chord-arp-down", "interval-chords", "chord-inversions"],
        apply: { chordDifficulty: 3, chordInversionDifficulty: 3, keyMode: "all" }
      }
    ]
  },
  cadence: {
    accent: "lilac",
    presets: [
      {
        id: "cadence_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Grundfunktionen", en: "Level 1 • Primary Functions" },
        desc: {
          de: "I, IV, V & vi an fester Zielposition (Takt 4) in C-Dur",
          en: "I, IV, V & vi on fixed target bar 4 in C Major"
        },
        modes: ["cadence"],
        apply: { difficulty: 1, cadencePos: "last", keyMode: "fixed" }
      },
      {
        id: "cadence_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Erweiterte Diatonik", en: "Level 2 • Extended Diatonic" },
        desc: {
          de: "I, ii, iii, IV, V & vi in leichten Tonarten",
          en: "I, ii, iii, IV, V & vi across easy keys"
        },
        modes: ["cadence"],
        apply: { difficulty: 2, cadencePos: "last", keyMode: "easy" }
      },
      {
        id: "cadence_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • V7 & Zwischendominante", en: "Level 3 • V7 & Secondary Dominant" },
        desc: {
          de: "7 Stufen inkl. V7 & V/V mit wechselndem Ziel-Takt (1–4)",
          en: "7 degrees incl. V7 & V/V with randomized target bar (1–4)"
        },
        modes: ["cadence"],
        apply: { difficulty: 3, cadencePos: "random", keyMode: "easy" }
      },
      {
        id: "cadence_l4",
        levelNumber: 4,
        title: { de: "Stufe 4 • Meister-Harmonik", en: "Level 4 • Master Harmony" },
        desc: {
          de: "Alle Stufen inkl. bII7 (Neapolitaner), zufälliger Takt & alle 12 Tonarten",
          en: "All degrees incl. bII7 (Neapolitan), random bar & all 12 keys"
        },
        modes: ["cadence"],
        apply: { difficulty: 4, cadencePos: "random", keyMode: "all" }
      }
    ]
  },
  solfege: {
    accent: "peach",
    presets: [
      {
        id: "solfege_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Diatonisch (C-Dur)", en: "Level 1 • Diatonic (C Major)" },
        desc: {
          de: "Stammtöne Do bis Ti mit fester C-Dur-Kadenz",
          en: "Diatonic Do to Ti anchored in C Major"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 1 }
      },
      {
        id: "solfege_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Diatonisch (Feste Tonart)", en: "Level 2 • Diatonic (Session Key)" },
        desc: {
          de: "Stammtöne Do bis Ti in einer konstanten Nicht-C-Dur-Tonart",
          en: "Diatonic Do to Ti in a transposed key held steady"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 2 }
      },
      {
        id: "solfege_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • Chromatisch (C-Dur)", en: "Level 3 • Chromatic (C Major)" },
        desc: {
          de: "Alle 12 Halbtöne (Di, Ra, Fi, Si, Te …) in C-Dur",
          en: "All 12 chromatic syllables anchored in C Major"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 3 }
      },
      {
        id: "solfege_l4",
        levelNumber: 4,
        title: { de: "Stufe 4 • Chromatisch (Feste Tonart)", en: "Level 4 • Chromatic (Session Key)" },
        desc: {
          de: "Alle 12 Töne in einer transponierten Referenztonart",
          en: "All 12 tones in a steady transposed reference key"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 4 }
      },
      {
        id: "solfege_l5",
        levelNumber: 5,
        title: { de: "Stufe 5 • Wechselnde Tonarten", en: "Level 5 • Rotating Keys" },
        desc: {
          de: "Diatonisch – aber jede Frage wechselt die Tonart",
          en: "Diatonic degrees — every question shifts to a new key"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 5 }
      },
      {
        id: "solfege_l6",
        levelNumber: 6,
        title: { de: "Stufe 6 • Chromatisch Dynamisch", en: "Level 6 • Chromatic Dynamic" },
        desc: {
          de: "Königsklasse: Alle 12 Halbtöne + neue Tonart bei jeder Frage",
          en: "Top tier: all 12 chromatic tones + new key on every question"
        },
        modes: ["solfege"],
        apply: { solfegeDifficulty: 6 }
      }
    ]
  },
  modes: {
    accent: "sage",
    presets: [
      {
        id: "modes_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Basis-Modi", en: "Level 1 • Core Modes" },
        desc: {
          de: "Ionisch, Äolisch, Dorisch & Mixolydisch (Tonleiter, Charakterton & Vamp)",
          en: "Ionian, Aeolian, Dorian & Mixolydian (Scale, Color Tone & Vamp)"
        },
        modes: ["modes-scale", "modes-char", "modes-cadence"],
        apply: { modesScaleDifficulty: 1, modesCharDifficulty: 1, modesCadenceDifficulty: 1 }
      },
      {
        id: "modes_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Erweiterte Modi", en: "Level 2 • Extended Modes" },
        desc: {
          de: "Zusätzlich Lydisch & Phrygisch in leichten Tonarten",
          en: "Adds Lydian & Phrygian across easy root pitches"
        },
        modes: ["modes-scale", "modes-char", "modes-cadence"],
        apply: { modesScaleDifficulty: 2, modesCharDifficulty: 2, modesCadenceDifficulty: 2 }
      },
      {
        id: "modes_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • Alle 8 Kirchentonarten", en: "Level 3 • All 8 Modes" },
        desc: {
          de: "Inkl. Lokrisch & Harmonisch Moll mit freien Grundtönen",
          en: "Includes Locrian & Harmonic Minor over rotating root notes"
        },
        modes: ["modes-scale", "modes-char", "modes-cadence"],
        apply: { modesScaleDifficulty: 3, modesCharDifficulty: 3, modesCadenceDifficulty: 2, keyMode: "random" }
      }
    ]
  },
  melody: {
    accent: "lilac",
    presets: [
      {
        id: "melody_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Do–Fa (C-Dur)", en: "Level 1 • Do–Fa (C Major)" },
        desc: {
          de: "Rhythmische 4–5-Ton-Melodien im unteren Tetrachord (1 Oktave, C-Dur)",
          en: "Rhythmic 4–5 note melodies in the lower tetrachord (single octave, C Major)"
        },
        modes: ["melody"],
        apply: { melodyRange: "do-fa", melodyKeyMode: "fixed", melodyOctaveMode: "single", melodyStyle: "rhythmic", melodyPulse: true }
      },
      {
        id: "melody_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Sol–Do (C-Dur)", en: "Level 2 • Sol–Do (C Major)" },
        desc: {
          de: "Rhythmische 4–6-Ton-Melodien im oberen Tetrachord inkl. Leitton Ti",
          en: "Rhythmic 4–6 note melodies in the upper tetrachord incl. leading tone Ti"
        },
        modes: ["melody"],
        apply: { melodyRange: "sol-do", melodyKeyMode: "fixed", melodyOctaveMode: "single", melodyStyle: "rhythmic", melodyPulse: true }
      },
      {
        id: "melody_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • Ganze Tonart (Zufallstonarten)", en: "Level 3 • Full Scale (Random Keys)" },
        desc: {
          de: "Rhythmische 4–6-Ton-Phrasen Do–Do mit wechselnden Tonarten (1 Oktave)",
          en: "Rhythmic 4–6 note phrases Do–Do across randomized keys (single octave)"
        },
        modes: ["melody"],
        apply: { melodyRange: "full", melodyKeyMode: "random", melodyOctaveMode: "single", melodyStyle: "rhythmic", melodyPulse: true }
      },
      {
        id: "melody_l4",
        levelNumber: 4,
        title: { de: "Stufe 4 • Meister (Mehrere Oktaven)", en: "Level 4 • Master (Multi-Octave)" },
        desc: {
          de: "Alle Töne, wechselnde Tonarten, Oktavlagen & echte Phrasen-Rhythmik",
          en: "Full scale, random keys, octave registers & expressive phrase rhythms"
        },
        modes: ["melody"],
        apply: { melodyRange: "full", melodyKeyMode: "random", melodyOctaveMode: "multi", melodyStyle: "rhythmic", melodyPulse: true }
      },
      {
        id: "melody_l5",
        levelNumber: 5,
        title: { de: "Stufe 5 • Kombi-Melodiediktat", en: "Level 5 • Full Melody Dictation" },
        desc: {
          de: "Tonhöhe & Rhythmus gemeinsam heraushören (4–6 Töne, Do–Do)",
          en: "Identify both pitch & note values together (4–6 notes, Do–Do)"
        },
        modes: ["melody"],
        apply: { melodyRange: "full", melodyKeyMode: "random", melodyOctaveMode: "single", melodyStyle: "dictation", melodyPulse: true }
      }
    ]
  },
  rhythm: {
    accent: "peach",
    presets: [
      {
        id: "rhythm_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Puls & Grundbausteine", en: "Level 1 • Pulse & Basics" },
        desc: {
          de: "Basis-Taktarten, Viertel/Achtel-Diktat, Nachklopfen & Groove-Stile",
          en: "Core meters, quarter/eighth dictation, tap-back & groove styles"
        },
        modes: ["rhythm-meter", "rhythm-dictation", "rhythm-tap", "rhythm-groove"],
        apply: { rhythmMeterDifficulty: 1, rhythmDictationDifficulty: 1, rhythmTapDifficulty: 1, rhythmGrooveDifficulty: 1 }
      },
      {
        id: "rhythm_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Synkopen & Offbeats", en: "Level 2 • Syncopation & Offbeats" },
        desc: {
          de: "Pausen, punktierte Werte, 6/8 & 2/4 sowie Offbeat-Akzente",
          en: "Rests, dotted rhythms, 6/8 & 2/4 meters plus offbeat accents"
        },
        modes: ["rhythm-meter", "rhythm-dictation", "rhythm-tap", "rhythm-groove"],
        apply: { rhythmMeterDifficulty: 2, rhythmDictationDifficulty: 2, rhythmTapDifficulty: 2, rhythmGrooveDifficulty: 2 }
      },
      {
        id: "rhythm_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • Triolen, 16tel & Pocket", en: "Level 3 • Triplets, 16ths & Pocket" },
        desc: {
          de: "Komplexe Diktate, Präzisions-Tap (±28 ms) & Mikro-Timing",
          en: "Complex dictation, precision tap (±28 ms) & micro-timing"
        },
        modes: ["rhythm-meter", "rhythm-dictation", "rhythm-tap", "rhythm-groove"],
        apply: { rhythmMeterDifficulty: 3, rhythmDictationDifficulty: 3, rhythmTapDifficulty: 3, rhythmGrooveDifficulty: 3 }
      },
      {
        id: "rhythm_l4",
        levelNumber: 4,
        title: { de: "Stufe 4 • Profi & Blindflug", en: "Level 4 • Pro & Blind Mode" },
        desc: {
          de: "Ungerade Takte (5/4, 7/8), feinstes Mikro-Timing & Blindflug-Klopfen",
          en: "Odd meters (5/4, 7/8), fine micro-timing & blind-mode tapping"
        },
        modes: ["rhythm-meter", "rhythm-dictation", "rhythm-tap", "rhythm-groove"],
        apply: { rhythmMeterDifficulty: 3, rhythmDictationDifficulty: 3, rhythmTapDifficulty: 4, rhythmGrooveDifficulty: 4 }
      }
    ]
  },
  production: {
    accent: "sage",
    presets: [
      {
        id: "prod_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • 5 Hauptbänder", en: "Level 1 • 5 Main Bands" },
        desc: {
          de: "Bass bis Brillanz (+6 dB EQ im Pink Noise & Sinustöne)",
          en: "Bass to brilliance (+6 dB EQ in pink noise & sine tones)"
        },
        modes: ["prod-tone", "prod-eq-noise"],
        apply: { prodToneDifficulty: 1, prodEqNoiseDifficulty: 1 }
      },
      {
        id: "prod_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • 8 Oktavbänder", en: "Level 2 • 8 Octave Bands" },
        desc: {
          de: "Klassische 8 Studio-Bänder mit mittlerem EQ-Boost (+4 dB • Q 2,8)",
          en: "Classic 8 studio octave bands with moderate boost (+4 dB • Q 2.8)"
        },
        modes: ["prod-tone", "prod-eq-noise"],
        apply: { prodToneDifficulty: 2, prodEqNoiseDifficulty: 2 }
      },
      {
        id: "prod_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • 13 ISO-Terzbänder", en: "Level 3 • 13 ISO Third-Octaves" },
        desc: {
          de: "Chirurgisches Mixing: 13 Frequenzen mit schmalem Q 4,5 (+3 dB)",
          en: "Surgical mixing: 13 ISO frequencies with narrow Q 4.5 (+3 dB)"
        },
        modes: ["prod-tone", "prod-eq-noise"],
        apply: { prodToneDifficulty: 3, prodEqNoiseDifficulty: 3 }
      }
    ]
  },
  notation: {
    accent: "sage",
    presets: [
      {
        id: "notation_l1",
        levelNumber: 1,
        title: { de: "Stufe 1 • Violin & Bass (Im System)", en: "Level 1 • Treble & Bass (On Staff)" },
        desc: {
          de: "5 Linien & 4 Zwischenräume ohne Hilfslinien (Stammtöne)",
          en: "5 lines & 4 spaces with no ledger lines (natural notes)"
        },
        modes: ["notation-treble", "notation-bass"],
        apply: { notationDifficulty: 1, notationKeyMode: "none" }
      },
      {
        id: "notation_l2",
        levelNumber: 2,
        title: { de: "Stufe 2 • Alle Schlüssel (±2 Hilfslinien)", en: "Level 2 • All Clefs (±2 Ledgers)" },
        desc: {
          de: "Violinschlüssel, Bassschlüssel & Altschlüssel bis zu 2 Hilfslinien",
          en: "Treble, Bass & Alto clefs with up to 2 ledger lines"
        },
        modes: ["notation-treble", "notation-bass", "notation-alto"],
        apply: { notationDifficulty: 2, notationKeyMode: "none" }
      },
      {
        id: "notation_l3",
        levelNumber: 3,
        title: { de: "Stufe 3 • Bis 3 Hilfslinien (Alle Schlüssel)", en: "Level 3 • Up to 3 Ledger Lines (All Clefs)" },
        desc: {
          de: "Voller Umfang mit bis zu 3 Hilfslinien nach oben und unten",
          en: "Full range with up to 3 ledger lines above and below the staff"
        },
        modes: ["notation-treble", "notation-bass", "notation-alto"],
        apply: { notationDifficulty: 3, notationKeyMode: "none" }
      },
      {
        id: "notation_l4",
        levelNumber: 4,
        title: { de: "Stufe 4 • Meisterprüfung (3 Hilfslinien + ♯/♭)", en: "Level 4 • Mastery (3 Ledgers + ♯/♭)" },
        desc: {
          de: "Alle 3 Schlüssel, bis 3 Hilfslinien beidseitig & Vorzeichen (♯/♭)",
          en: "All 3 clefs, up to 3 ledger lines both ways & accidentals (♯/♭)"
        },
        modes: ["notation-treble", "notation-bass", "notation-alto"],
        apply: { notationDifficulty: 4, notationKeyMode: "none" }
      },
      {
        id: "notation_l5",
        levelNumber: 5,
        title: { de: "Stufe 5 • Blattspiel Tonarten (1–2 ♯/♭)", en: "Level 5 • Key Signatures (1–2 ♯/♭)" },
        desc: {
          de: "G-, D-, F- & B-Dur im Notensystem (±2 Hilfslinien) mit vorgegebenen Vorzeichen",
          en: "G, D, F & Bb Major key signatures on the staff (±2 ledgers)"
        },
        modes: ["notation-treble", "notation-bass", "notation-alto"],
        apply: { notationDifficulty: 2, notationKeyMode: "easy" }
      },
      {
        id: "notation_l6",
        levelNumber: 6,
        title: { de: "Stufe 6 • Alle Tonarten + ♮ (1–6 ♯/♭)", en: "Level 6 • All Key Signatures + ♮ (1–6 ♯/♭)" },
        desc: {
          de: "Alle 12 Vorzeichen-Tonarten (±3 Hilfslinien) inklusive Auflösungszeichen (♮)",
          en: "All 12 key signatures (±3 ledgers) including natural signs (♮)"
        },
        modes: ["notation-treble", "notation-bass", "notation-alto"],
        apply: { notationDifficulty: 4, notationKeyMode: "all" }
      }
    ]
  }
};

function sanitizeExamReviewItem(raw, idx = 0) {
  if (!raw || typeof raw !== "object") return null;
  const mode = String(raw.mode || "cadence").slice(0, 36);
  const status = ["correct", "partial", "wrong", "skipped"].includes(raw.status) ? raw.status : "wrong";
  const scoreNum = Number(raw.score);
  const score = Number.isFinite(scoreNum) ? Math.max(0, Math.min(1, Math.round(scoreNum * 100) / 100)) : 0;
  let audioSnapshot = null;
  if (raw.audioSnapshot && typeof raw.audioSnapshot === "object") {
    try {
      audioSnapshot = JSON.parse(JSON.stringify(raw.audioSnapshot));
    } catch (e) {
      audioSnapshot = null;
    }
  }
  return {
    qIndex: Math.max(1, parseInt(raw.qIndex, 10) || (idx + 1)),
    mode: mode,
    status: status,
    score: score,
    chosenKey: raw.chosenKey !== undefined && raw.chosenKey !== null ? String(raw.chosenKey).slice(0, 40) : null,
    targetKey: raw.targetKey !== undefined && raw.targetKey !== null ? String(raw.targetKey).slice(0, 40) : null,
    chosenLabel: String(raw.chosenLabel || "").slice(0, 140),
    targetLabel: String(raw.targetLabel || "").slice(0, 140),
    detailNote: String(raw.detailNote || "").slice(0, 120),
    audioSnapshot: audioSnapshot
  };
}

function sanitizeExamHistoryEntry(raw, idx = 0) {
  if (!raw || typeof raw !== "object") return null;
  const categoryKey = Object.prototype.hasOwnProperty.call(EXAM_CATEGORY_LEVELS, raw.categoryKey)
    ? raw.categoryKey
    : null;
  if (!categoryKey) return null;
  const presets = EXAM_CATEGORY_LEVELS[categoryKey].presets;
  const preset = presets.find(p => p.id === raw.levelId) || presets[0];
  const totalQuestions = Math.max(1, Math.min(50, parseInt(raw.totalQuestions, 10) || 10));
  const earnedNum = Number(raw.earnedScore);
  const earnedScore = Number.isFinite(earnedNum)
    ? Math.max(0, Math.min(totalQuestions, Math.round(earnedNum * 100) / 100))
    : 0;
  const percent = Math.max(0, Math.min(100, Math.round(Number.isFinite(Number(raw.percent)) ? Number(raw.percent) : (earnedScore / totalQuestions) * 100)));
  const breakdown = Array.isArray(raw.moduleBreakdown)
    ? raw.moduleBreakdown.map(b => {
        if (!b || typeof b !== "object" || !b.mode) return null;
        const tot = Math.max(1, parseInt(b.total, 10) || 1);
        const er = Math.max(0, Math.min(tot, Math.round((Number(b.earned) || 0) * 100) / 100));
        return {
          mode: String(b.mode).slice(0, 36),
          total: tot,
          earned: er,
          correct: Math.max(0, Math.min(tot, parseInt(b.correct, 10) || 0))
        };
      }).filter(Boolean).slice(0, 10)
    : [];
  const reviewItems = Array.isArray(raw.reviewItems)
    ? raw.reviewItems.map((it, i) => sanitizeExamReviewItem(it, i)).filter(Boolean).slice(0, 50)
    : [];
  const completedAtNum = Number(raw.completedAt);
  const completedAt = Number.isFinite(completedAtNum) && completedAtNum > 0
    ? Math.round(completedAtNum)
    : (Date.parse(raw.completedAt) || Date.now());
  return {
    id: String(raw.id || `exam_${completedAt}_${idx}`).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48),
    categoryKey: categoryKey,
    levelId: preset.id,
    levelNumber: preset.levelNumber,
    totalQuestions: totalQuestions,
    earnedScore: earnedScore,
    correctCount: Math.max(0, Math.min(totalQuestions, parseInt(raw.correctCount, 10) || 0)),
    partialCount: Math.max(0, Math.min(totalQuestions, parseInt(raw.partialCount, 10) || 0)),
    wrongCount: Math.max(0, Math.min(totalQuestions, parseInt(raw.wrongCount, 10) || 0)),
    percent: percent,
    durationSec: Math.max(0, Math.min(7200, Math.round(Number(raw.durationSec) || 0))),
    feedbackMode: raw.feedbackMode === "instant" ? "instant" : "blind",
    maxReplays: raw.maxReplays === 0 ? 0 : 2,
    completedAt: completedAt,
    moduleBreakdown: breakdown,
    reviewItems: reviewItems
  };
}

function sanitizeExamHistoryArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map((e, i) => sanitizeExamHistoryEntry(e, i)).filter(Boolean).slice(0, 25);
}

const METRONOME_MIN_BPM = 30;
const METRONOME_MAX_BPM = 240;
const METRONOME_DEFAULT_BPM = 120;
const METRONOME_MIN_BEATS = 1;
const METRONOME_MAX_BEATS = 16;
const METRONOME_BEAT_STATES = ["normal", "accent", "muted"];
const METRONOME_VALID_SUBDIVISIONS = [1, 2, 3, 4];

function clampMetronomeBpm(bpm) {
  const num = Math.round(Number(bpm) || METRONOME_DEFAULT_BPM);
  return Math.max(METRONOME_MIN_BPM, Math.min(METRONOME_MAX_BPM, num));
}

function getDefaultMeterBeats(beatCount) {
  const n = Math.max(METRONOME_MIN_BEATS, Math.min(METRONOME_MAX_BEATS, parseInt(beatCount, 10) || 4));
  const out = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) out.push("accent");
    else if (n === 5 && i === 3) out.push("accent");
    else if (n === 6 && i === 3) out.push("accent");
    else if (n === 7 && (i === 2 || i === 4)) out.push("accent");
    else out.push("normal");
  }
  return out;
}

function sanitizeMetronomeBeatsArray(rawBeats) {
  if (!Array.isArray(rawBeats) || rawBeats.length === 0) {
    return getDefaultMeterBeats(4);
  }
  return rawBeats
    .slice(0, METRONOME_MAX_BEATS)
    .map(v => (METRONOME_BEAT_STATES.includes(v) ? v : "normal"));
}

function createDefaultMetronomeProfiles() {
  const t = typeof tr === "function" ? tr : ((de) => de);
  return [
    {
      id: "metro_default_4_4",
      name: t("4/4 Standard", "4/4 Standard"),
      bpm: 120,
      beats: ["accent", "normal", "normal", "normal"],
      subdivision: 1
    },
    {
      id: "metro_default_3_4",
      name: t("3/4 Walzer", "3/4 Waltz"),
      bpm: 104,
      beats: ["accent", "normal", "normal"],
      subdivision: 1
    },
    {
      id: "metro_default_gap_4_4",
      name: t("4/4 Gap (3 stumm)", "4/4 Gap (Beat 3 mute)"),
      bpm: 96,
      beats: ["accent", "normal", "muted", "normal"],
      subdivision: 1
    }
  ];
}

function sanitizeMetronomeProfileEntry(raw, fallbackIdx = 0) {
  if (!raw || typeof raw !== "object") return null;
  const beats = sanitizeMetronomeBeatsArray(raw.beats);
  const bpm = clampMetronomeBpm(raw.bpm);
  const subRaw = parseInt(raw.subdivision, 10);
  const subdivision = METRONOME_VALID_SUBDIVISIONS.includes(subRaw) ? subRaw : 1;
  const fallbackName = `${beats.length}/4 · ${bpm} BPM`;
  const name = String(raw.name || "").trim().slice(0, 32) || fallbackName;
  return {
    id: String(raw.id || `metro_${Date.now()}_${fallbackIdx}`).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48) || `metro_${fallbackIdx}`,
    name,
    bpm,
    beats,
    subdivision
  };
}

const DEFAULT_METRONOME_MIX = Object.freeze({
  master: 1.0,
  accent: 1.0,
  normal: 0.8
});

function sanitizeMetronomeMixValue(val, fallback) {
  const num = Number(val);
  if (!Number.isFinite(num)) return fallback;
  return Math.round(Math.max(0, Math.min(1, num)) * 100) / 100;
}

function sanitizeMetronomeMix(raw) {
  const src = (raw && typeof raw === "object") ? raw : {};
  return {
    master: sanitizeMetronomeMixValue(src.master, DEFAULT_METRONOME_MIX.master),
    accent: sanitizeMetronomeMixValue(src.accent, DEFAULT_METRONOME_MIX.accent),
    normal: sanitizeMetronomeMixValue(src.normal, DEFAULT_METRONOME_MIX.normal)
  };
}

const REVERB_INSTRUMENT_KEYS = ["piano", "guitar", "strings", "brass", "voice", "bass"];
const STEM_REVERB_PRESETS = Object.freeze({
  dry:     Object.freeze({ piano: 0.00, guitar: 0.00, strings: 0.00, brass: 0.00, voice: 0.00, bass: 0.00 }),
  natural: Object.freeze({ piano: 0.24, guitar: 0.22, strings: 0.34, brass: 0.26, voice: 0.30, bass: 0.06 }),
  concert: Object.freeze({ piano: 0.48, guitar: 0.42, strings: 0.56, brass: 0.46, voice: 0.52, bass: 0.16 })
});
const DEFAULT_PIANO_SOUND = Object.freeze({
  character: "natural",
  reverb: 0.24,
  instruments: { ...STEM_REVERB_PRESETS.natural }
});
const PIANO_REVERB_BY_CHAR = Object.freeze({
  dry: 0.0,
  natural: 0.24,
  concert: 0.48
});
const DEFAULT_DRONE_MIX = Object.freeze({
  pad: 0.70,
  tone: 1.00
});
const DEFAULT_BREAK_REMINDER_ENABLED = true;
const DEFAULT_BREAK_REMINDER_MINUTES = 20;

function sanitizeBreakReminderMinutes(val) {
  const num = parseInt(val, 10);
  if (!Number.isFinite(num)) return DEFAULT_BREAK_REMINDER_MINUTES;
  return Math.max(1, Math.min(60, num));
}

function sanitizePianoSound(raw) {
  const src = (raw && typeof raw === "object") ? raw : {};
  const charKey = Object.prototype.hasOwnProperty.call(PIANO_REVERB_BY_CHAR, src.character)
    ? src.character
    : DEFAULT_PIANO_SOUND.character;
  const presetMap = STEM_REVERB_PRESETS[charKey] || STEM_REVERB_PRESETS.natural;
  const rawInstMap = (src.instruments && typeof src.instruments === "object") ? src.instruments : {};
  const instruments = {};
  REVERB_INSTRUMENT_KEYS.forEach(stemKey => {
    const rawVal = Object.prototype.hasOwnProperty.call(rawInstMap, stemKey)
      ? rawInstMap[stemKey]
      : (stemKey === "piano" ? src.reverb : undefined);
    instruments[stemKey] = sanitizeMetronomeMixValue(rawVal, presetMap[stemKey] ?? DEFAULT_PIANO_SOUND.reverb);
  });
  return {
    character: charKey,
    reverb: instruments.piano,
    instruments: instruments
  };
}

function sanitizeDroneMix(raw) {
  const src = (raw && typeof raw === "object") ? raw : {};
  return {
    pad: sanitizeMetronomeMixValue(src.pad, DEFAULT_DRONE_MIX.pad),
    tone: sanitizeMetronomeMixValue(src.tone, DEFAULT_DRONE_MIX.tone)
  };
}

function createDefaultProfile() {
  return {
    name: "",
    instruments: ["Klavier"],
    focus: "allround",
    focuses: ["allround"],
    companionAccessory: PROFILE_ACCESSORY_NONE_KEY,
    companionAccessories: [],
    notation: "de",
    notationManual: false,
    intervalNotation: "de",
    intervalNotationManual: false,
    solfegeLabels: "syllables",
    sessionMinutes: 10,
    inactivityMinutes: 3,
    breakReminderEnabled: DEFAULT_BREAK_REMINDER_ENABLED,
    breakReminderMinutes: DEFAULT_BREAK_REMINDER_MINUTES,
    mixes: createDefaultMixes(),
    metronomeProfiles: createDefaultMetronomeProfiles(),
    metronomeMix: sanitizeMetronomeMix(DEFAULT_METRONOME_MIX),
    pianoSound: sanitizePianoSound(DEFAULT_PIANO_SOUND),
    droneMix: sanitizeDroneMix(DEFAULT_DRONE_MIX),
    customThemes: [null, null, null],
    examHistory: [],
    hasPracticed: false,
    showHomeQuickMixes: false
  };
}

function sanitizeMixEntry(raw, fallbackIdx = 0) {
  if (!raw || typeof raw !== "object") return null;
  const mode = Object.prototype.hasOwnProperty.call(MIX_MODE_CATALOG, raw.mode) ? raw.mode : "cadence";
  const validLevels = MIX_MODE_CATALOG[mode].levels;
  let level = raw.level;
  if (mode === "melody") {
    level = ["do-fa", "sol-do", "full"].includes(raw.melodyRange || raw.level) ? (raw.melodyRange || raw.level) : "do-fa";
  } else {
    const parsed = parseInt(level, 10);
    level = validLevels.includes(parsed) ? parsed : validLevels[0];
  }
  const titleStr = String(raw.title || "").trim().slice(0, 32) || MIX_MODE_CATALOG[mode].label;
  const bpmNum = parseInt(raw.bpm, 10);
  return {
    id: String(raw.id || `mix_${Date.now()}_${fallbackIdx}`).replace(/[^a-zA-Z0-9_-]/g, ""),
    title: titleStr,
    mode: mode,
    level: level,
    melodyRange: mode === "melody" ? level : "do-fa",
    melodyKeyMode: raw.melodyKeyMode === "random" ? "random" : "fixed",
    melodyOctaveMode: raw.melodyOctaveMode === "multi" ? "multi" : "single",
    melodyStyle: ["steady", "rhythmic", "dictation"].includes(raw.melodyStyle) ? raw.melodyStyle : "rhythmic",
    melodyPulse: raw.melodyPulse === false ? false : true,
    notationKeyMode: typeof normalizeNotationKeyMode === "function"
      ? normalizeNotationKeyMode(raw.notationKeyMode)
      : (raw.notationKeyMode ? String(raw.notationKeyMode).slice(0, 12) : "none"),
    bpm: (bpmNum >= 55 && bpmNum <= 160) ? bpmNum : 0
  };
}

function sanitizeUserProfile(raw) {
  const def = createDefaultProfile();
  if (!raw || typeof raw !== "object") return def;

  const validInstruments = Array.isArray(raw.instruments)
    ? raw.instruments.filter(i => PROFILE_INSTRUMENT_OPTIONS.includes(i)).slice(0, 7)
    : def.instruments;
  const focuses = normalizeProfileFocuses(raw.focuses, raw.focus);
  const companionAccessories = normalizeProfileAccessories(raw.companionAccessories, raw.companionAccessory);
  const sessMins = [5, 10, 15, 20].includes(parseInt(raw.sessionMinutes, 10)) ? parseInt(raw.sessionMinutes, 10) : 10;
  const idleMins = [2, 3, 5].includes(parseInt(raw.inactivityMinutes, 10)) ? parseInt(raw.inactivityMinutes, 10) : 3;
  const breakEnabled = raw.breakReminderEnabled === undefined ? DEFAULT_BREAK_REMINDER_ENABLED : Boolean(raw.breakReminderEnabled);
  const breakMinutes = sanitizeBreakReminderMinutes(raw.breakReminderMinutes);

  let mixes = def.mixes;
  if (Array.isArray(raw.mixes)) {
    mixes = raw.mixes.map((m, idx) => sanitizeMixEntry(m, idx)).filter(Boolean).slice(0, 16);
  }

  let metronomeProfiles = def.metronomeProfiles;
  if (Array.isArray(raw.metronomeProfiles)) {
    metronomeProfiles = raw.metronomeProfiles
      .map((mp, idx) => sanitizeMetronomeProfileEntry(mp, idx))
      .filter(Boolean)
      .slice(0, 16);
  }

  const customThemes = Array.isArray(raw.customThemes)
    ? sanitizeCustomThemesArray(raw.customThemes)
    : def.customThemes;

  const examHistory = Array.isArray(raw.examHistory)
    ? sanitizeExamHistoryArray(raw.examHistory)
    : [];

  return {
    name: String(raw.name || "").trim().slice(0, 24),
    instruments: validInstruments,
    focus: focuses[0] || "allround",
    focuses: focuses,
    companionAccessory: companionAccessories[0] || PROFILE_ACCESSORY_NONE_KEY,
    companionAccessories: companionAccessories,
    notation: raw.notation === "intl" ? "intl" : "de",
    notationManual: Boolean(raw.notationManual),
    intervalNotation: raw.intervalNotation === "intl" ? "intl" : "de",
    intervalNotationManual: Boolean(raw.intervalNotationManual),
    solfegeLabels: raw.solfegeLabels === "numbers" ? "numbers" : "syllables",
    sessionMinutes: sessMins,
    inactivityMinutes: idleMins,
    breakReminderEnabled: breakEnabled,
    breakReminderMinutes: breakMinutes,
    mixes: mixes,
    metronomeProfiles: metronomeProfiles,
    metronomeMix: sanitizeMetronomeMix(raw.metronomeMix),
    pianoSound: sanitizePianoSound(raw.pianoSound),
    droneMix: sanitizeDroneMix(raw.droneMix),
    customThemes: customThemes,
    examHistory: examHistory,
    // Ältere Profile (vor Einführung des Felds) gelten als „schon geübt“
    hasPracticed: raw.hasPracticed === undefined ? true : Boolean(raw.hasPracticed),
    showHomeQuickMixes: Boolean(raw.showHomeQuickMixes)
  };
}

function loadUserProfile() {
  const storageThemes = loadCustomThemesFromStorage();
  try {
    if (typeof localStorage === "undefined") {
      const def = createDefaultProfile();
      def.customThemes = storageThemes;
      return def;
    }
    const raw = localStorage.getItem(PERSONAL_PROFILE_STORAGE_KEY);
    if (!raw) {
      const def = createDefaultProfile();
      def.customThemes = storageThemes;
      return def;
    }
    const prof = sanitizeUserProfile(JSON.parse(raw));
    for (let i = 0; i < 3; i++) {
      if (!prof.customThemes[i] && storageThemes[i]) {
        prof.customThemes[i] = storageThemes[i];
      }
    }
    return prof;
  } catch (_err) {
    const def = createDefaultProfile();
    def.customThemes = storageThemes;
    return def;
  }
}

function saveUserProfile(profile) {
  const sanitized = sanitizeUserProfile(profile);
  try {
    if (typeof localStorage === "undefined") return;
    const compactThemes = sanitized.customThemes.map(t => t ? {
      id: t.id,
      slotIndex: t.slotIndex,
      name: t.name,
      colors: t.colors,
      updatedAt: t.updatedAt
    } : null);
    localStorage.setItem(PERSONAL_PROFILE_STORAGE_KEY, JSON.stringify({ ...sanitized, customThemes: compactThemes }));
    saveCustomThemesToStorage(sanitized.customThemes);
  } catch (_err) {
    // Auf eingeschränkten WebViews ignorieren
  }
}

function formatSessionMMSS(totalSec) {
  const safe = Math.max(0, Math.floor(Number(totalSec) || 0));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function escapeHtml(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resolveEffectiveAppearance(pref) {
  if (pref === "light" || pref === "dark") return pref;
  const prefersDark =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

const CADENCE_DEFAULT_BPM = 120;
const SOLFEGE_DEFAULT_BPM = 120;
const WARMUP_DEFAULT_BPM = 80;
const SOLFEGE_LOOP_INTERVAL_MS = 3000;

const MODE_CATEGORY_MAP = {
  "cadence":               "cadence",
  "interval-melodic":      "interval",
  "interval-melodic-down": "interval",
  "interval-harmonic":     "interval",
  "interval-drone":        "interval",
  "chord-arp-up":          "chords",
  "chord-arp-down":        "chords",
  "interval-chords":       "chords",
  "chord-inversions":      "chords",
  "melody":                "melody",
  "solfege":               "solfege",
  "rhythm-meter":          "rhythm",
  "rhythm-dictation":      "rhythm",
  "rhythm-tap":            "rhythm",
  "rhythm-groove":         "rhythm",
  "prod-tone":             "production",
  "prod-eq-noise":         "production",
  "modes-scale":           "modes",
  "modes-char":            "modes",
  "modes-cadence":         "modes",
  "notation-treble":       "notation",
  "notation-bass":         "notation",
  "notation-alto":         "notation",
  "notation-mixed":        "notation"
};

/**
 * Liefert den Kategorie-Schlüssel (z. B. "interval", "chords") für einen Übungsmodus.
 */
function getCategoryForMode(mode) {
  return MODE_CATEGORY_MAP[mode] || "cadence";
}

/**
 * Liefert den lokalisierten Überbegriff einer Kategorie für Top-Bar und Navigation.
 */
function getCategoryTitle(categoryKey) {
  const catNames = {
    cadence: tr("Kadenzen", "Cadences"),
    interval: tr("Intervalle", "Intervals"),
    chords: tr("Akkorde", "Chords"),
    melody: tr("Melodien", "Melodies"),
    solfege: "Solfège",
    rhythm: tr("Rhythmus", "Rhythm"),
    notation: tr("Notation", "Notation"),
    production: tr("Produktion", "Production"),
    modes: tr("Tonleitern & Modi", "Scales & Modes"),
    warmup: tr("Stimme & Chor", "Voice & Choir")
  };
  return catNames[categoryKey] || tr("Übungen", "Exercises");
}

class AppState {
  constructor() {
    this.currentView = "home"; // 'home' | 'category' | 'knowledge' | 'knowledge-detail' | 'space' | 'exercise'
    this.activeCategory = "cadence";
    this.activeKnowledgeTab = "theory";
    this.activeKnowledgeDetail = null;
    this.knowledgeTitle = "Wissen";
    this.knowledgeSub = "Theorie & Hörbeispiele";
    this.exerciseReturnView = "home";

    const initialVisual = loadVisualPrefs();

    this.settings = {
      mode: "cadence", // 'cadence' | 'interval-*' | 'solfege' | 'melody' | 'rhythm-*' | 'prod-tone' | 'prod-eq-noise'
      difficulty: 1,
      cadencePos: "last", // 'last' (Takt 4) | 'random' (zufälliger Takt 1–4)
      intervalDifficulty: 1,
      chordDifficulty: 1,
      chordInversionDifficulty: 1,
      solfegeDifficulty: 1,
      melodyRange: "do-fa",      // 'do-fa' | 'sol-do' | 'full'
      melodyKeyMode: "fixed",    // 'fixed' (C-Dur) | 'random' (Zufallstonarten)
      melodyOctaveMode: "single",// 'single' (1 Oktave) | 'multi' (Mehrere Oktaven)
      melodyStyle: "rhythmic",   // 'steady' (4 gleichlang) | 'rhythmic' (4–6 Töne phrasiert) | 'dictation' (Ton + Rhythmus)
      melodyPulse: true,         // Dezenter Takt-Puls beim Melodie-Abspielen
      rhythmMeterDifficulty: 1,
      rhythmDictationDifficulty: 1,
      rhythmTapDifficulty: 1,
      rhythmTapClick: true,
      rhythmTapAutoNext: initialVisual.autoNextAfterCorrect,
      rhythmDictationAutoNext: initialVisual.autoNextAfterCorrect,
      rhythmGrooveDifficulty: 1,
      prodToneDifficulty: 1,
      prodEqNoiseDifficulty: 1,
      modesScaleDifficulty: 1,
      modesCharDifficulty: 1,
      modesCadenceDifficulty: 1,
      notationDifficulty: 1,
      notationKeyMode: "none",
      notationKeyTrainerClef: "notation-treble",
      notationKeyTrainerLevel: 2,
      notationListenOnlyPace: 50,
      keyMode: "fixed",
      timeSig: "4/4",
      defaultBpm: 90,
      bpm: CADENCE_DEFAULT_BPM,
      randomBpm: false,
      loop: false,
      autoNextAfterCorrect: initialVisual.autoNextAfterCorrect,
      playCorrectAnswerAudio: initialVisual.playCorrectAnswerAudio !== false,
      solfegeAutoNext: initialVisual.autoNextAfterCorrect,
      melodyAutoNext: initialVisual.autoNextAfterCorrect,
      appearance: initialVisual.appearance,
      theme: initialVisual.theme,
      language: initialVisual.language,
      onboardingDone: initialVisual.onboardingDone !== false
    };

    this.master = {
      volume: 0.85,
      muted: false
    };

    this.mixer = {
      piano: 1.00,
      guitar: 0.00,
      strings: 0.00,
      brass: 0.00,
      voice: 0.00,
      bass: 0.00
    };
    this.customMixer = { ...this.mixer };
    this.activePreset = "piano";

    this.currentKey = "C";
    this.solfegeSessionKey = "G";
    this.activeTimeSig = "4/4";
    this.activeBpm = CADENCE_DEFAULT_BPM;
    this.hasManualExerciseBpm = false;
    this.currentExercise = null;
    this.isPlaying = false;
    this.solfegeAnswered = false;
    this.melodyCompleted = false;
    this.rhythmDictationCompleted = false;
    this.rhythmTapSession = null;
    this.exerciseSolved = false;
    this.listenOnly = {
      active: false,
      token: 0,
      timerId: null,
      phase: "idle"
    };
    this.warmupReturnView = "category";
    this.warmup = {
      presetId: "full-5min",
      voiceRange: "mixed",
      soundMode: "piano-voice",
      bpm: WARMUP_DEFAULT_BPM,
      status: "idle", // 'idle' | 'running' | 'paused' | 'completed'
      stepIndex: 0,
      keyOffsetIndex: 0,
      transposeShift: 0,
      token: 0,
      timerId: null,
      tickIntervalId: null,
      tickAnchorSec: 0,
      roundStartedWallMs: 0,
      currentTonicMidi: 60,
      activeMidis: [],
      breathCueKey: "idle",
      breathCueText: "",
      vowelLabel: "",
      hintText: ""
    };
    this.metronomeReturnView = "home";
    this.metronome = {
      bpm: METRONOME_DEFAULT_BPM,
      beats: getDefaultMeterBeats(4),
      subdivision: 1,
      running: false,
      activeProfileId: "metro_default_4_4",
      mix: sanitizeMetronomeMix(DEFAULT_METRONOME_MIX)
    };
    this.lastAnswerWasWrong = false;
    this.wrongAnswerData = null;
    this.streakState = { count: 0, activeNoticeMilestone: 0 };
    this.currentQuoteIndex = -1;
    this.waveAnimFrame = null;
    this.circleOfFifthsState = { idx: 0, ringMode: "major", tab: "chords" };
    this.wavePaused = false;

    this.profile = loadUserProfile();
    this.metronome.mix = sanitizeMetronomeMix(this.profile.metronomeMix);
    const initLangCfg = typeof getLanguageConfig === "function" ? getLanguageConfig(this.settings.language) : null;
    if (!this.profile.notationManual) {
      this.profile.notation = initLangCfg ? initLangCfg.defaultNotation : (this.settings.language === "en" ? "intl" : "de");
    }
    if (!this.profile.intervalNotationManual) {
      this.profile.intervalNotation = initLangCfg ? initLangCfg.defaultIntervalNotation : (this.settings.language === "en" ? "intl" : "de");
    }
    this.customThemeEditor = {
      open: false,
      slotIndex: 0,
      name: "",
      colors: sanitizeCustomThemeColors(CUSTOM_THEME_TEMPLATES["waldlichtung-light"]),
      activeRole: null,
      pickerHsv: rgbToHsv(parseCssColorToRgba("#FAF7F2")),
      livePreview: true
    };
    const initSec = (this.profile.sessionMinutes || 10) * 60;
    this.sessionTimer = {
      status: "idle", // 'idle' | 'running' | 'paused' | 'completed' | 'auto-stopped'
      totalSec: initSec,
      remainingSec: initSec,
      lastActivityWallMs: Date.now(),
      hiddenSinceWallMs: null,
      intervalId: null,
      noteKind: "idle",
      statusNote: tr("Bereit für eine entspannte Session.", "Ready for a calm session.")
    };
    this.breakReminder = {
      elapsedSec: 0,
      intervalId: null,
      lastActivityWallMs: Date.now(),
      hiddenSinceWallMs: null,
      promptOpen: false,
      pausedOnBreak: false
    };
    this.resetConfirmArmed = false;
    this.appResetConfirmArmed = false;

    this.examSetupCategory = "interval";
    this.examResultReturnView = "exam-setup";
    this.activeExamResultId = null;
    this.activeExamResultObj = null;
    this.examResultReviewFilter = "all";
    this.examHistoryShowAll = false;
    this.examHistoryClearArmed = false;
    this.examConfig = { count: 10, feedbackMode: "blind", maxReplays: 2 };
    this.exam = null;
  }

  setMode(mode) {
    this.settings.mode = mode;
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setDifficulty(level) {
    this.settings.difficulty = parseInt(level, 10);
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setCadencePos(pos) {
    this.settings.cadencePos = pos === "random" ? "random" : "last";
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setIntervalDifficulty(level) {
    this.settings.intervalDifficulty = parseInt(level, 10);
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setChordDifficulty(level) {
    this.settings.chordDifficulty = parseInt(level, 10);
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setChordInversionDifficulty(level) {
    this.settings.chordInversionDifficulty = parseInt(level, 10);
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setSolfegeDifficulty(level) {
    this.settings.solfegeDifficulty = parseInt(level, 10);
    // Für Stufe 2 und 4: Zufällige Nicht-C-Dur Tonart einmal beim Start des Moduls würfeln und für die Sitzung festhalten
    if (this.settings.solfegeDifficulty === 2 || this.settings.solfegeDifficulty === 4) {
      this.solfegeSessionKey = pickRandomNonCKey(this.solfegeSessionKey);
    }
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setMelodyConfig(range, keyMode, octaveMode, style = null, pulse = null) {
    this.settings.melodyRange = MELODY_RANGE_CONFIG[range] ? range : "do-fa";
    this.settings.melodyKeyMode = keyMode === "random" ? "random" : "fixed";
    this.settings.melodyOctaveMode = octaveMode === "multi" ? "multi" : "single";
    if (["steady", "rhythmic", "dictation"].includes(style)) {
      this.settings.melodyStyle = style;
    }
    if (typeof pulse === "boolean") {
      this.settings.melodyPulse = pulse;
    }
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setRhythmLevel(subMode, level) {
    const lvl = parseInt(level, 10) || 1;
    this.settings.mode = subMode;
    if (subMode === "rhythm-meter") this.settings.rhythmMeterDifficulty = lvl;
    else if (subMode === "rhythm-dictation") this.settings.rhythmDictationDifficulty = lvl;
    else if (subMode === "rhythm-tap") this.settings.rhythmTapDifficulty = lvl;
    else if (subMode === "rhythm-groove") this.settings.rhythmGrooveDifficulty = lvl;
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setProdLevel(subMode, level) {
    const lvl = Math.max(1, Math.min(3, parseInt(level, 10) || 1));
    this.settings.mode = subMode;
    if (subMode === "prod-tone") this.settings.prodToneDifficulty = lvl;
    else if (subMode === "prod-eq-noise") this.settings.prodEqNoiseDifficulty = lvl;
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setModesLevel(subMode, level) {
    const maxLvl = subMode === "modes-cadence" ? 2 : 3;
    const lvl = Math.max(1, Math.min(maxLvl, parseInt(level, 10) || 1));
    this.settings.mode = subMode;
    if (subMode === "modes-scale") this.settings.modesScaleDifficulty = lvl;
    else if (subMode === "modes-char") this.settings.modesCharDifficulty = lvl;
    else if (subMode === "modes-cadence") this.settings.modesCadenceDifficulty = lvl;
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setNotationLevel(subModeOrLevel, maybeLevel, maybeKeyMode = undefined) {
    let validMode = isNotationMode(this.settings.mode) ? this.settings.mode : "notation-treble";
    let rawLevel = maybeLevel;
    let resolvedKeyMode = maybeKeyMode;
    if (isNotationMode(subModeOrLevel)) {
      validMode = subModeOrLevel;
    } else {
      rawLevel = subModeOrLevel;
      if (resolvedKeyMode === undefined && typeof maybeLevel === "string") {
        resolvedKeyMode = maybeLevel;
      }
    }
    const lvl = Math.max(1, Math.min(4, parseInt(rawLevel, 10) || 1));
    this.settings.mode = validMode;
    this.settings.notationDifficulty = lvl;
    if (resolvedKeyMode !== undefined) {
      this.settings.notationKeyMode = normalizeNotationKeyMode(resolvedKeyMode);
    }
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  setNotationKeyMode(nextKeyMode) {
    this.settings.notationKeyMode = normalizeNotationKeyMode(nextKeyMode);
    this.updateHeaderSubtext();
    this.updateQuickStartLabel();
  }

  getModeSummaryText(includeCategory = true) {
    const lvlWord = tr("Stufe", "Level");
    if (this.settings.mode === "cadence") {
      const diffNames = {
        1: tr("Basis", "Basics"),
        2: tr("Diatonisch", "Diatonic"),
        3: tr("Doppeldom.", "Sec. Dom."),
        4: tr("Jazz & Tritone", "Jazz & Tritone")
      };
      const posShort = this.settings.cadencePos === "random"
        ? tr("Zufallstakt", "Random Bar")
        : tr("Takt 4", "Bar 4");
      const diffText = `${lvlWord} ${this.settings.difficulty} (${diffNames[this.settings.difficulty] || tr("Basis", "Basics")})`;
      return includeCategory
        ? `${tr("Kadenzen", "Cadences")} • ${diffText} • ${posShort}`
        : `${posShort} • ${diffText}`;
    }
    if (this.settings.mode === "melody") {
      const rangeInfo = getLocalizedMelodyRange(this.settings.melodyRange || "do-fa");
      const keyLabel = this.settings.melodyKeyMode === "random" ? tr("Zufallstonart", "Random Keys") : getKeyDisplayName("C");
      const octLabel = this.settings.melodyOctaveMode === "multi" ? tr("Mehrere Okt.", "Multi-Octave") : tr("1 Oktave", "1 Octave");
      const mStyle = this.settings.melodyStyle || "rhythmic";
      const styleTag = mStyle === "dictation"
        ? tr("Kombi-Diktat", "Full Dictation")
        : (mStyle === "steady" ? tr("Gleichmäßig", "Steady") : tr("Rhythmisch", "Rhythmic"));
      return includeCategory
        ? `${tr("Melodien", "Melodies")} • ${styleTag} • ${rangeInfo.label} (${keyLabel}, ${octLabel})`
        : `${styleTag} • ${rangeInfo.label} • ${keyLabel}, ${octLabel}`;
    }
    if (this.settings.mode === "solfege") {
      const solfNames = {
        1: tr("C-Dur, 1 Oktave", "C Major, 1 Octave"),
        2: tr("Feste Zufallstonart, 1 Okt.", "Fixed Random Key, 1 Oct."),
        3: tr("C-Dur, mehrere Oktaven", "C Major, Multi-Octave"),
        4: tr("Feste Zufallstonart, mehrere Okt.", "Fixed Random Key, Multi-Oct."),
        5: tr("Tonartwechsel, 1 Oktave", "Changing Keys, 1 Octave"),
        6: tr("Tonartwechsel, mehrere Okt.", "Changing Keys, Multi-Oct.")
      };
      const lvl = this.settings.solfegeDifficulty || 1;
      const lvlText = `${lvlWord} ${lvl} (${solfNames[lvl] || getKeyDisplayName("C")})`;
      return includeCategory ? `Solfège • ${lvlText}` : lvlText;
    }
    if (this.settings.mode === "rhythm-meter") {
      const names = {
        1: tr("Basis (4/4 & 3/4)", "Basics (4/4 & 3/4)"),
        2: "2/4, 3/4, 4/4, 6/8",
        3: tr("Ungerade Takte", "Odd Meters")
      };
      const lvl = this.settings.rhythmMeterDifficulty || 1;
      const prefix = includeCategory ? tr("Rhythmus: Taktart", "Rhythm: Meter") : tr("Taktart", "Meter");
      return `${prefix} • ${lvlWord} ${lvl} (${names[lvl] || tr("Basis", "Basics")})`;
    }
    if (this.settings.mode === "rhythm-dictation") {
      const names = {
        1: tr("Puls & Pausen", "Pulse & Rests"),
        2: tr("Achtel & Triolen", "Eighths & Triplets"),
        3: tr("Sechzehntel", "16th Notes"),
        4: tr("Punkt. & Synkopen", "Dotted & Syncopation")
      };
      const lvl = this.settings.rhythmDictationDifficulty || 1;
      const prefix = includeCategory ? tr("Rhythmus: Diktat", "Rhythm: Dictation") : tr("Diktat", "Dictation");
      return `${prefix} • ${lvlWord} ${lvl} (${names[lvl] || tr("Basis", "Basics")})`;
    }
    if (this.settings.mode === "rhythm-tap") {
      const lvl = this.settings.rhythmTapDifficulty || 1;
      const lvlObj = getLocalizedRhythmTapLevel(lvl);
      const prefix = includeCategory ? tr("Rhythmus: Nachklopfen", "Rhythm: Rhythm Tap") : tr("Nachklopfen", "Rhythm Tap");
      return `${prefix} • ${lvlWord} ${lvl} (${lvlObj?.label || tr("Puls-Anker", "Pulse Anchor")})`;
    }
    if (this.settings.mode === "rhythm-groove") {
      const names = {
        1: tr("Groove-Stile", "Groove Styles"),
        2: tr("Offbeat-Akzent", "Offbeat Accent"),
        3: tr("Mikro-Timing (Mittel)", "Micro-Timing (Mid)"),
        4: tr("Mikro-Timing (Profi)", "Micro-Timing (Pro)")
      };
      const lvl = this.settings.rhythmGrooveDifficulty || 1;
      const prefix = includeCategory ? tr("Rhythmus: Groove & Timing", "Rhythm: Groove & Timing") : tr("Groove & Timing", "Groove & Timing");
      return `${prefix} • ${lvlWord} ${lvl} (${names[lvl] || tr("Basis", "Basics")})`;
    }
    if (this.settings.mode === "prod-tone") {
      const lvl = this.settings.prodToneDifficulty || 1;
      const prefix = includeCategory ? tr("Produktion: Frequenzen", "Production: Frequencies") : tr("Frequenzen", "Frequencies");
      return `${prefix} • ${lvlWord} ${lvl} (${getLocalizedProdLevelLabel("tone", lvl)})`;
    }
    if (this.settings.mode === "prod-eq-noise") {
      const names = {
        1: tr("Breiter EQ (+10 dB)", "Wide EQ (+10 dB)"),
        2: tr("Oktav-EQ (+8,5 dB)", "Octave EQ (+8.5 dB)"),
        3: tr("Chirurgisch (+7 dB)", "Surgical (+7 dB)")
      };
      const lvl = this.settings.prodEqNoiseDifficulty || 1;
      const prefix = includeCategory ? tr("Produktion: EQ im Noise", "Production: Pink Noise EQ") : tr("EQ im Noise", "Pink Noise EQ");
      return `${prefix} • ${lvlWord} ${lvl} (${names[lvl] || tr("Breiter EQ", "Wide EQ")})`;
    }
    if (this.settings.mode === "modes-scale") {
      const lvl = this.settings.modesScaleDifficulty || 1;
      const prefix = includeCategory ? tr("Modi: Tonleitern", "Modes: Scales") : tr("Tonleitern", "Scales");
      return `${prefix} • ${lvlWord} ${lvl} (${getLocalizedModeLevelLabel("scale", lvl)})`;
    }
    if (this.settings.mode === "modes-char") {
      const lvl = this.settings.modesCharDifficulty || 1;
      const prefix = includeCategory ? tr("Modi: Charakterton", "Modes: Color Note") : tr("Charakterton", "Color Note");
      return `${prefix} • ${lvlWord} ${lvl} (${getLocalizedModeLevelLabel("char", lvl)})`;
    }
    if (this.settings.mode === "modes-cadence") {
      const lvl = this.settings.modesCadenceDifficulty || 1;
      const prefix = includeCategory ? tr("Modi: Kadenzen", "Modes: Vamps") : tr("Kadenzen & Vamps", "Modal Vamps");
      return `${prefix} • ${lvlWord} ${lvl} (${getLocalizedModeLevelLabel("cadence", lvl)})`;
    }
    if (isNotationMode(this.settings.mode)) {
      const lvl = Math.max(1, Math.min(4, parseInt(this.settings.notationDifficulty, 10) || 1));
      const clefNames = {
        "notation-treble": tr("Violinschlüssel", "Treble Clef"),
        "notation-bass":   tr("Bassschlüssel", "Bass Clef"),
        "notation-alto":   tr("Altschlüssel", "Alto Clef"),
        "notation-mixed":  tr("Schlüssel-Mix", "Mixed Clefs")
      };
      const lvlNames = {
        1: tr("5 Linien", "On Staff"),
        2: tr("±2 Hilfslinien", "±2 Ledgers"),
        3: tr("±3 Hilfslinien", "±3 Ledgers"),
        4: tr("3 Hilfsl. + ♯/♭", "3 Ledgers + ♯/♭")
      };
      const clefText = clefNames[this.settings.mode] || tr("Violinschlüssel", "Treble Clef");
      const prefix = includeCategory ? `${tr("Notation", "Notation")}: ${clefText}` : clefText;
      const keyMode = normalizeNotationKeyMode(this.settings.notationKeyMode);
      const keyTag = keyMode !== "none" ? ` • ${getLocalizedNotationKeyModeLabel(keyMode, true)}` : "";
      return `${prefix} • ${lvlWord} ${lvl} (${lvlNames[lvl]})${keyTag}`;
    }
    if (isChordQualityMode(this.settings.mode)) {
      const chordDiffNames = {
        1: tr("Dreiklänge", "Triads"),
        2: tr("Sept & Sus", "7th & Sus"),
        3: tr("Erweitert", "Extended"),
        4: tr("Jazz & Optionstöne", "Jazz Tensions")
      };
      const chordTypeLabels = includeCategory
        ? {
            "chord-arp-up":   tr("Akkord-Arpeggio (Aufwärts ↗)", "Chords (Arpeggio ↗)"),
            "chord-arp-down": tr("Akkord-Arpeggio (Abwärts ↘)", "Chords (Arpeggio ↘)"),
            "interval-chords": tr("Akkorde (Gleichzeitig)", "Chords (Simultaneous)")
          }
        : {
            "chord-arp-up":   tr("Arpeggio (Aufwärts ↗)", "Arpeggio (Ascending ↗)"),
            "chord-arp-down": tr("Arpeggio (Abwärts ↘)", "Arpeggio (Descending ↘)"),
            "interval-chords": tr("Gleichzeitiger Klang", "Simultaneous")
          };
      const lvl = this.settings.chordDifficulty || 1;
      return `${chordTypeLabels[this.settings.mode] || tr("Akkorde", "Chords")} • ${lvlWord} ${lvl} (${chordDiffNames[lvl] || tr("Dreiklänge", "Triads")})`;
    }
    if (this.settings.mode === "chord-inversions") {
      const invDiffNames = {
        1: tr("Dur-Dreiklang", "Major Triad"),
        2: tr("Dur & Moll", "Major & Minor"),
        3: tr("Septakkorde (4)", "7th Chords (4)")
      };
      const lvl = this.settings.chordInversionDifficulty || 1;
      const prefix = includeCategory ? tr("Akkordumkehrungen", "Chord Inversions") : tr("Umkehrungen", "Inversions");
      return `${prefix} • ${lvlWord} ${lvl} (${invDiffNames[lvl] || tr("Dur-Dreiklang", "Major Triad")})`;
    }
    const intDiffNames = {
      1: tr("Einsteiger", "Beginner"),
      2: tr("Dur-Tonleiter", "Major Scale"),
      3: tr("Alle Intervalle", "All Intervals")
    };
    const typeLabels = includeCategory
      ? {
          "interval-melodic": tr("Intervalle Melodisch (Aufwärts)", "Melodic Intervals (Ascending)"),
          "interval-melodic-down": tr("Intervalle Melodisch (Abwärts)", "Melodic Intervals (Descending)"),
          "interval-harmonic": tr("Intervalle Harmonisch", "Harmonic Intervals"),
          "interval-drone": tr("Intervalle über Grundton-Fläche", "Intervals Over Root Pad")
        }
      : {
          "interval-melodic": tr("Melodisch (Aufwärts)", "Melodic (Ascending)"),
          "interval-melodic-down": tr("Melodisch (Abwärts)", "Melodic (Descending)"),
          "interval-harmonic": tr("Harmonisch", "Harmonic"),
          "interval-drone": tr("Grundton-Fläche", "Root Pad")
        };
    const typeLabel = typeLabels[this.settings.mode] || tr("Intervalle", "Intervals");
    return `${typeLabel} • ${lvlWord} ${this.settings.intervalDifficulty} (${intDiffNames[this.settings.intervalDifficulty]})`;
  }

  updateHeaderSubtext() {
    const el = document.getElementById("subHeaderInfo");
    const mainTitle = document.getElementById("headerMainTitle");
    if (!el || !mainTitle) return;

    if (this.currentView === "home") {
      mainTitle.textContent = tr("Übungen", "Home");
      el.textContent = typeof getStaticI18nText === "function"
        ? (getStaticI18nText("app.tagline") || tr("Hören · Verstehen · Musizieren", "Listen · Understand · Play"))
        : tr("Hören · Verstehen · Musizieren", "Listen · Understand · Play");
    } else if (this.currentView === "knowledge") {
      mainTitle.textContent = tr("Wissen", "Knowledge");
      if (this.activeKnowledgeTab === "instruments") {
        el.textContent = tr("Instrumentenkunde, Besetzungen & Klangfarben", "Instrument Families, Ensembles & Timbres");
      } else if (this.activeKnowledgeTab === "articles") {
        el.textContent = tr("Hintergründe, Musikpsychologie & Praxiswissen", "Insights, Music Psychology & Practical Essays");
      } else {
        el.textContent = tr("Referenzen, Quintenzirkel, Gesang & Klang-Physik", "References, Circle of Fifths, Voice & Acoustics");
      }
    } else if (this.currentView === "knowledge-detail") {
      mainTitle.textContent = this.knowledgeTitle;
      el.textContent = this.knowledgeSub;
    } else if (this.currentView === "space") {
      mainTitle.textContent = tr("Mein Konto", "My Account");
      el.textContent = tr("Profil, Timer & Vorlieben", "Profile, Timer & Preferences");
    } else if (this.currentView === "category" || this.currentView === "category-help") {
      mainTitle.textContent = getCategoryTitle(this.activeCategory);
      el.textContent = this.currentView === "category-help"
        ? tr("So funktioniert’s • Anleitung & Aufgaben", "How It Works • Guide & Levels")
        : (this.activeCategory === "warmup"
            ? tr("Wähle Programm & Tonumfang", "Choose routine & vocal range")
            : tr("Wähle Modus & Schwierigkeitsgrad", "Choose a mode & difficulty"));
    } else if (this.currentView === "exam-setup") {
      mainTitle.textContent = tf("{cat} • Prüfung", "{cat} • Exam", {
        cat: getCategoryTitle(this.examSetupCategory || this.activeCategory)
      });
      el.textContent = tr("Schwierigkeitsstufe & Optionen wählen", "Choose level & exam options");
    } else if (this.currentView === "exam-result") {
      const resCat = this.activeExamResultObj?.categoryKey || this.examSetupCategory || this.activeCategory;
      mainTitle.textContent = tr("Prüfungsauswertung", "Exam Results");
      el.textContent = getCategoryTitle(resCat);
    } else if (this.currentView === "warmup") {
      const preset = typeof getLocalizedWarmupPreset === "function"
        ? getLocalizedWarmupPreset(this.warmup?.presetId || "full-5min")
        : null;
      const range = typeof getLocalizedWarmupVoiceRange === "function"
        ? getLocalizedWarmupVoiceRange(this.warmup?.voiceRange || "mixed")
        : null;
      mainTitle.textContent = tr("Einsing-Helfer", "Vocal Warmup");
      el.textContent = `${preset ? preset.title : tr("5-Minuten Einsingen", "5-Min Warmup")} • ${range ? range.label : tr("Chor-Mitte", "Choir Mid")}`;
    } else if (this.currentView === "metronome") {
      const metro = this.metronome || {};
      const beatLen = Array.isArray(metro.beats) ? metro.beats.length : 4;
      mainTitle.textContent = tr("Metronom", "Metronome");
      el.textContent = tf("{bpm} BPM • {n} Zählzeiten", "{bpm} BPM • {n} Beats", {
        bpm: metro.bpm || METRONOME_DEFAULT_BPM,
        n: beatLen
      });
    } else if (this.currentView === "exercise" && this.exam?.active) {
      const curQ = Math.min((this.exam.currentIdx || 0) + 1, this.exam.totalQuestions || 1);
      const presetMeta = typeof getExamPresetById === "function" ? getExamPresetById(this.exam.categoryKey, this.exam.levelId) : null;
      const levelLbl = presetMeta ? (tr(presetMeta.title.de, presetMeta.title.en)) : "";
      mainTitle.textContent = tf("Prüfung: {cat}", "Exam: {cat}", { cat: getCategoryTitle(this.exam.categoryKey) });
      el.textContent = `${levelLbl ? `${levelLbl} • ` : ""}${tf("Frage {n} / {tot}", "Question {n} / {tot}", { n: curQ, tot: this.exam.totalQuestions })}`;
    } else {
      mainTitle.textContent = getCategoryTitle(getCategoryForMode(this.settings.mode));
      el.textContent = this.getModeSummaryText(false);
    }

    if (
      this.currentView !== "space" &&
      this.sessionTimer &&
      (this.sessionTimer.status === "running" || this.sessionTimer.status === "paused")
    ) {
      el.textContent = `${el.textContent}  •  ⏱ ${formatSessionMMSS(this.sessionTimer.remainingSec)}`;
    }
  }

  updateQuickStartLabel() {
    const sub = document.getElementById("quickStartSub");
    if (sub) sub.textContent = this.getModeSummaryText();
    const label = document.getElementById("quickStartLabel");
    if (label) {
      // Vor der ersten gestarteten Übung „Beginne hier“, danach „Weiterüben“
      const key = this.profile?.hasPracticed === false ? "home.startHere" : "home.continue";
      label.setAttribute("data-i18n", key);
      const text = typeof getStaticI18nText === "function" ? getStaticI18nText(key) : null;
      if (text) label.textContent = text;
    }
  }
}

const state = new AppState();

function getCustomThemeEntry(themeId) {
  if (!CUSTOM_THEME_SLOT_IDS.includes(themeId)) return null;
  const slots = typeof state !== "undefined" ? state?.profile?.customThemes : null;
  if (!Array.isArray(slots)) return null;
  return slots.find(item => item && item.id === themeId) || null;
}

function getActivePaletteMeta() {
  const theme = ALL_VALID_THEMES.includes(state.settings.theme) ? state.settings.theme : "waldlichtung";
  const customEntry = getCustomThemeEntry(theme);
  if (customEntry?.paletteMeta) {
    return customEntry.paletteMeta;
  }
  const effective = theme === "metal" ? "dark" : resolveEffectiveAppearance(state.settings.appearance);
  const entry = THEME_PALETTE_META[theme] || THEME_PALETTE_META.waldlichtung;
  return entry[effective] || entry.light;
}

function applyThemeAndAppearance() {
  const appearance = VALID_APPEARANCES.includes(state.settings.appearance) ? state.settings.appearance : "light";
  let theme = ALL_VALID_THEMES.includes(state.settings.theme) ? state.settings.theme : "waldlichtung";
  let customEntry = getCustomThemeEntry(theme);
  if (CUSTOM_THEME_SLOT_IDS.includes(theme) && !customEntry) {
    theme = "waldlichtung";
    saveVisualPrefs(appearance, theme, state.settings.language);
  }
  const effective = customEntry
    ? (customEntry.isDark ? "dark" : "light")
    : (theme === "metal" ? "dark" : resolveEffectiveAppearance(appearance));

  state.settings.appearance = appearance;
  state.settings.theme = theme;

  if (customEntry) {
    applyCustomThemeCssVars(customEntry);
  } else {
    clearCustomThemeCssVars();
  }

  if (typeof document !== "undefined" && document.documentElement) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-appearance", effective);
  }

  const activeMeta = customEntry?.paletteMeta || (THEME_PALETTE_META[theme] || THEME_PALETTE_META.waldlichtung)[effective];
  const metaEl = typeof document !== "undefined" ? document.getElementById("metaThemeColor") : null;
  if (metaEl && activeMeta) {
    metaEl.setAttribute("content", activeMeta.bg);
  }

  if (typeof document !== "undefined" && typeof document.querySelectorAll === "function") {
    document.querySelectorAll("[data-appearance], [data-welcome-appearance]").forEach(btn => {
      const btnVal = btn.dataset?.appearance
        || btn.dataset?.welcomeAppearance
        || btn.getAttribute?.("data-appearance")
        || btn.getAttribute?.("data-welcome-appearance");
      const isSelected = btnVal === appearance || (appearance === "system" && btnVal === effective);
      btn.classList?.toggle("active", isSelected);
      btn.setAttribute?.("aria-pressed", String(isSelected));
    });

    const builtInEffective = resolveEffectiveAppearance(appearance);
    document.querySelectorAll("[data-theme-choice], [data-welcome-theme]").forEach(card => {
      const cardTheme = card.dataset?.themeChoice || card.dataset?.welcomeTheme;
      const isSelected = cardTheme === theme;
      card.classList?.toggle("active", isSelected);
      card.setAttribute?.("aria-pressed", String(isSelected));

      const statusEl = typeof card.querySelector === "function" ? card.querySelector(".theme-status") : null;
      if (statusEl) {
        statusEl.textContent = isSelected ? tr("Aktiv", "Active") : tr("Auswählen", "Select");
      }

      const customCard = getCustomThemeEntry(cardTheme);
      const cardPalette = customCard?.paletteMeta || (THEME_PALETTE_META[cardTheme] || THEME_PALETTE_META.waldlichtung)[cardTheme === "metal" ? "dark" : builtInEffective];
      if (cardPalette && typeof card.querySelectorAll === "function") {
        card.querySelectorAll("[data-swatch]").forEach(dot => {
          const idx = parseInt(dot.dataset?.swatch, 10);
          if (!Number.isNaN(idx) && cardPalette.swatches[idx] && dot.style) {
            dot.style.backgroundColor = cardPalette.swatches[idx];
          }
        });
      }
    });
  }

  if (typeof renderCustomThemeSlots === "function") {
    renderCustomThemeSlots();
  }
  if (typeof renderSettingsCustomThemes === "function") {
    renderSettingsCustomThemes();
  }
}

function setAppearancePreference(nextAppearance) {
  state.settings.appearance = VALID_APPEARANCES.includes(nextAppearance) ? nextAppearance : "light";
  if (CUSTOM_THEME_SLOT_IDS.includes(state.settings.theme)) {
    state.settings.theme = "waldlichtung";
  }
  saveVisualPrefs(state.settings.appearance, state.settings.theme, state.settings.language);
  applyThemeAndAppearance();
}

function setThemePreference(nextTheme) {
  const valid = ALL_VALID_THEMES.includes(nextTheme)
    && (!CUSTOM_THEME_SLOT_IDS.includes(nextTheme) || Boolean(getCustomThemeEntry(nextTheme)));
  state.settings.theme = valid ? nextTheme : "waldlichtung";
  saveVisualPrefs(state.settings.appearance, state.settings.theme, state.settings.language);
  applyThemeAndAppearance();
}

function syncLanguageControls(lang = state?.settings?.language || "de") {
  const active = typeof normalizeAppLanguage === "function" ? normalizeAppLanguage(lang) : "de";
  if (typeof syncLanguageSelectOptions === "function") {
    syncLanguageSelectOptions(active);
    return;
  }
  const selectEl = document.getElementById("languageSelect");
  if (selectEl && selectEl.value !== active) {
    selectEl.value = active;
  }
}

function setLanguagePreference(nextLang) {
  const lang = typeof normalizeAppLanguage === "function" ? normalizeAppLanguage(nextLang) : (nextLang === "en" ? "en" : "de");
  const langCfg = typeof getLanguageConfig === "function" ? getLanguageConfig(lang) : null;
  state.settings.language = lang;
  saveVisualPrefs(state.settings.appearance, state.settings.theme, lang);

  if (state.profile) {
    let profileUpdated = false;
    if (!state.profile.notationManual) {
      state.profile.notation = langCfg ? langCfg.defaultNotation : (lang === "en" ? "intl" : "de");
      profileUpdated = true;
    }
    if (!state.profile.intervalNotationManual) {
      state.profile.intervalNotation = langCfg ? langCfg.defaultIntervalNotation : (lang === "en" ? "intl" : "de");
      profileUpdated = true;
    }
    if (profileUpdated) {
      saveUserProfile(state.profile);
      if (state.currentExercise) {
        applyProfileDisplayChanges();
      }
    }
  }

  if (typeof applyStaticDomLanguage === "function") {
    applyStaticDomLanguage(lang);
  }
  syncLanguageControls(lang);
  syncAnswerSoundToggleUI();
  syncBreakReminderControls();
  syncPianoSoundControls();
  applyThemeAndAppearance();

  const muteBtn = document.getElementById("masterMuteToggle");
  if (muteBtn) {
    muteBtn.textContent = state.master.muted ? tr("Stumm", "Muted") : tr("An", "On");
    muteBtn.title = state.master.muted ? tr("Ton einschalten", "Unmute Audio") : tr("Stummschalten", "Mute Audio");
  }

  if (state.settings.randomBpm) {
    const inlineBpmVal = document.getElementById("inlineBpmVal");
    if (inlineBpmVal) inlineBpmVal.textContent = tr("Zufall", "Random");
  }

  refreshCurrentQuoteLocalization();
  renderHomeProfileGreeting();
  renderHomeQuickMixBar();
  state.updateQuickStartLabel();
  renderKnowledgeHub();
  renderProfileAccountView();
  populateMixCreatorControls({ forceRepopulate: true });

  if (state.currentView === "category") {
    openCategoryPage(state.activeCategory, { refreshOnly: true });
  } else if (state.currentView === "category-help") {
    openCategoryHelpPage(state.activeCategory, { refreshOnly: true });
  } else if (state.currentView === "exam-setup") {
    openExamSetupPage(state.examSetupCategory, { refreshOnly: true });
  } else if (state.currentView === "exam-result") {
    renderExamResultView();
  } else if (state.currentView === "knowledge-detail" && state.activeKnowledgeDetail) {
    if (state.activeKnowledgeDetail.kind === "article") {
      openKnowledgeArticle(state.activeKnowledgeDetail.id, { refreshOnly: true });
    } else {
      openKnowledgeRef(state.activeKnowledgeDetail.key, { refreshOnly: true });
    }
  }

  if (state.currentExercise) {
    refreshExerciseLocalization(state.currentExercise);
    if (state.currentView === "exercise") {
      renderUI();
    }
  } else {
    updatePlayButtonUI(state.isPlaying);
    if (typeof renderStageStreakUI === "function") renderStageStreakUI();
  }

  if (state.exam?.active && state.currentView === "exercise") {
    renderExamStatusBar();
  }

  if (typeof renderWarmupView === "function" && state.currentView === "warmup") {
    renderWarmupView();
  }
  if (typeof renderMetronomeView === "function" && state.currentView === "metronome") {
    renderMetronomeView();
  }

  state.updateHeaderSubtext();
}

function syncAutoNextControls() {
  const enabled = state.settings.autoNextAfterCorrect !== false;
  document.querySelectorAll("[data-auto-next], [data-welcome-autonext]").forEach(btn => {
    const rawVal = btn.dataset?.autoNext !== undefined ? btn.dataset.autoNext : btn.dataset?.welcomeAutonext;
    const isMatch = (rawVal !== "off") === enabled;
    btn.classList?.toggle("active", isMatch);
    btn.setAttribute?.("aria-pressed", String(isMatch));
  });
  const loopBtn = document.getElementById("loopToggleBtn");
  if (loopBtn) {
    const modeAutoNextMap = {
      melody: state.settings.melodyAutoNext,
      "rhythm-dictation": state.settings.rhythmDictationAutoNext,
      "rhythm-tap": state.settings.rhythmTapAutoNext
    };
    if (Object.prototype.hasOwnProperty.call(modeAutoNextMap, state.settings.mode)) {
      loopBtn.classList.toggle("btn-active", Boolean(modeAutoNextMap[state.settings.mode]));
    } else {
      loopBtn.classList.toggle("btn-active", Boolean(state.settings.loop));
    }
  }
}

function shouldPlayCorrectAnswerAudio() {
  return state?.settings?.playCorrectAnswerAudio !== false;
}

function syncAnswerSoundToggleUI() {
  const btn = document.getElementById("answerSoundToggleBtn");
  const lbl = document.getElementById("answerSoundBtnLabel");
  const enabled = shouldPlayCorrectAnswerAudio();
  const isNotationPractice = isNotationMode(state?.currentExercise?.type) && !state?.exam?.active;
  if (btn) {
    btn.classList.toggle("hidden", !isNotationPractice);
    btn.classList.toggle("is-muted", !enabled);
    btn.setAttribute("aria-pressed", enabled ? "true" : "false");
    btn.title = tr(
      "Abspielen der richtigen Note ein-/ausschalten (Aus = stumm zur nächsten Note)",
      "Toggle playing the correct note sound (Off = move silently to next note)"
    );
  }
  if (lbl) {
    lbl.textContent = enabled
      ? tr("Notenton: An", "Note Audio: On")
      : tr("Notenton: Aus", "Note Audio: Off");
  }
}

function setPlayCorrectAnswerAudioPreference(nextEnabled) {
  const enabled = nextEnabled !== false && nextEnabled !== "off";
  state.settings.playCorrectAnswerAudio = enabled;
  saveVisualPrefs(
    state.settings.appearance,
    state.settings.theme,
    state.settings.language,
    state.settings.autoNextAfterCorrect,
    enabled
  );
  syncAnswerSoundToggleUI();
}

function setAutoNextPreference(nextEnabled) {
  const enabled = nextEnabled !== false && nextEnabled !== "off";
  state.settings.autoNextAfterCorrect = enabled;
  state.settings.solfegeAutoNext = enabled;
  state.settings.melodyAutoNext = enabled;
  state.settings.rhythmDictationAutoNext = enabled;
  state.settings.rhythmTapAutoNext = enabled;
  saveVisualPrefs(
    state.settings.appearance,
    state.settings.theme,
    state.settings.language,
    enabled
  );
  syncAutoNextControls();
  if (state.currentExercise && state.currentView === "exercise") {
    renderUI();
  }
}

let _activeMixerTab = "levels";

const REVERB_DOM_MAP = Object.freeze({
  piano:   ["pianoReverbSlider", "pianoReverbDisplay"],
  guitar:  ["reverbGuitarSlider", "reverbGuitarDisplay"],
  strings: ["reverbStringsSlider", "reverbStringsDisplay"],
  brass:   ["reverbBrassSlider", "reverbBrassDisplay"],
  voice:   ["reverbVoiceSlider", "reverbVoiceDisplay"],
  bass:    ["reverbBassSlider", "reverbBassDisplay"]
});

const REVERB_PREVIEW_PROBES = Object.freeze({
  piano:   { style: "piano",   notes: ["C3", "G3", "D4", "E4", "B4"], dur: 1.55, gain: 0.95 },
  guitar:  { style: "guitar",  notes: ["C3", "G3", "D4", "E4"],       dur: 1.45, gain: 0.92 },
  strings: { style: "strings", notes: ["C3", "G3", "D4", "B4"],       dur: 1.85, gain: 0.90 },
  brass:   { style: "brass",   notes: ["C3", "G3", "C4", "E4"],       dur: 1.45, gain: 0.90 },
  voice:   { style: "choir",   notes: ["C4", "E4", "G4"],             dur: 1.65, gain: 0.90 },
  bass:    { style: "ebass",   notes: ["C2", "G2", "C3"],             dur: 1.15, gain: 0.95 }
});

function switchMixerTab(tabKey = "levels") {
  const nextTab = tabKey === "reverb" ? "reverb" : "levels";
  _activeMixerTab = nextTab;
  const levelsBtn = document.getElementById("mixerTabLevelsBtn");
  const reverbBtn = document.getElementById("mixerTabReverbBtn");
  const levelsPanel = document.getElementById("mixerTabLevels");
  const reverbPanel = document.getElementById("mixerTabReverb");
  levelsBtn?.classList.toggle("active", nextTab === "levels");
  reverbBtn?.classList.toggle("active", nextTab === "reverb");
  levelsBtn?.setAttribute("aria-selected", String(nextTab === "levels"));
  reverbBtn?.setAttribute("aria-selected", String(nextTab === "reverb"));
  levelsPanel?.classList.toggle("hidden", nextTab !== "levels");
  reverbPanel?.classList.toggle("hidden", nextTab !== "reverb");
}

async function previewInstrumentReverbSound(instKey = "piano") {
  await ensureAudioReady();
  audioEngine.stopPlayback();
  const probe = REVERB_PREVIEW_PROBES[instKey] || REVERB_PREVIEW_PROBES.piano;
  audioEngine.playInstrumentSample(probe.style, probe.notes, probe.dur, 0, probe.gain);
}

function getActivePianoSoundSettings() {
  return sanitizePianoSound(state?.profile?.pianoSound);
}

function syncPianoSoundControls() {
  const { character, reverb, instruments } = getActivePianoSoundSettings();

  document.querySelectorAll("[data-piano-char]").forEach(btn => {
    const isMatch = btn.dataset.pianoChar === character;
    btn.classList.toggle("active", isMatch);
    btn.setAttribute("aria-pressed", String(isMatch));
  });

  REVERB_INSTRUMENT_KEYS.forEach(instKey => {
    const [sliderId, displayId] = REVERB_DOM_MAP[instKey] || [];
    const pct = Math.round((instruments?.[instKey] ?? reverb) * 100);
    const slider = sliderId ? document.getElementById(sliderId) : null;
    const display = displayId ? document.getElementById(displayId) : null;
    if (slider) slider.value = String(pct);
    if (display) display.textContent = `${pct}%`;
  });

  audioEngine?.setPianoSoundProfile?.(character, instruments);
}

function setPianoCharacterPreference(character) {
  const validChar = Object.prototype.hasOwnProperty.call(PIANO_REVERB_BY_CHAR, character)
    ? character
    : DEFAULT_PIANO_SOUND.character;
  const presetMap = STEM_REVERB_PRESETS[validChar] || STEM_REVERB_PRESETS.natural;
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile.pianoSound = {
    character: validChar,
    reverb: presetMap.piano,
    instruments: { ...presetMap }
  };
  saveUserProfile(state.profile);
  syncPianoSoundControls();
}

function setInstrumentReverbPreference(instrumentKey, mixNormalized) {
  const key = REVERB_INSTRUMENT_KEYS.includes(instrumentKey) ? instrumentKey : "piano";
  const cur = getActivePianoSoundSettings();
  const nextInstruments = {
    ...cur.instruments,
    [key]: sanitizeMetronomeMixValue(mixNormalized, cur.instruments[key] ?? cur.reverb)
  };
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile.pianoSound = {
    character: cur.character,
    reverb: nextInstruments.piano,
    instruments: nextInstruments
  };
  saveUserProfile(state.profile);
  syncPianoSoundControls();
}

function setPianoReverbPreference(mixNormalized) {
  setInstrumentReverbPreference("piano", mixNormalized);
}

function getActiveDroneMixSettings() {
  return sanitizeDroneMix(state?.profile?.droneMix);
}

function syncDroneMixControls() {
  const { pad, tone } = getActiveDroneMixSettings();
  const padPct = Math.round(pad * 100);
  const tonePct = Math.round(tone * 100);
  const padSlider = document.getElementById("dronePadVolSlider");
  const padVal = document.getElementById("dronePadVolVal");
  const toneSlider = document.getElementById("droneToneVolSlider");
  const toneVal = document.getElementById("droneToneVolVal");
  if (padSlider) padSlider.value = String(padPct);
  if (padVal) padVal.textContent = `${padPct}%`;
  if (toneSlider) toneSlider.value = String(tonePct);
  if (toneVal) toneVal.textContent = `${tonePct}%`;
  audioEngine?.setDroneIntervalMix?.(pad, tone);
}

function setDroneMixValue(channel, mixNormalized) {
  if (channel !== "pad" && channel !== "tone") return;
  const cur = getActiveDroneMixSettings();
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile.droneMix = {
    ...cur,
    [channel]: sanitizeMetronomeMixValue(mixNormalized, cur[channel])
  };
  saveUserProfile(state.profile);
  syncDroneMixControls();
}

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const GERMAN_WHITE_LABELS = { 0: "C", 2: "D", 4: "E", 5: "F", 7: "G", 9: "A", 11: "H" };
const INTL_WHITE_LABELS   = { 0: "C", 2: "D", 4: "E", 5: "F", 7: "G", 9: "A", 11: "B" };
const INTL_KEY_NAMES = {
  "Bb": "Bb-Dur", "Eb": "Eb-Dur", "Ab": "Ab-Dur", "B": "B-Dur", "F#": "F#-Dur", "Db": "Db-Dur"
};
const SOLFEGE_DEGREE_NUMBERS = {
  "Do": "1", "Do_low": "1", "Do_high": "1", "Re": "2", "Mi": "3", "Fa": "4", "Sol": "5", "La": "6", "Ti": "7"
};

function getWhiteNoteLabel(pc) {
  const norm = ((pc % 12) + 12) % 12;
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  return (useIntl ? INTL_WHITE_LABELS[norm] : GERMAN_WHITE_LABELS[norm]) || "";
}

function getKeyDisplayName(keyCode) {
  if (typeof getLocalizedKeyName === "function") {
    const localized = getLocalizedKeyName(keyCode);
    if (localized) return localized;
  }
  if (typeof isEnglishLang === "function" && isEnglishLang() && typeof KEY_NAMES_EN !== "undefined") {
    return KEY_NAMES_EN[keyCode] || `${keyCode} Major`;
  }
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  if (useIntl) {
    return INTL_KEY_NAMES[keyCode] || HARMONIC_DATA.roots[keyCode]?.name || `${keyCode}-Dur`;
  }
  return HARMONIC_DATA.roots[keyCode]?.name || `${keyCode}-Dur`;
}

function getSolfegeDisplayLabel(syllableOrStep) {
  const useNums = typeof state !== "undefined" && state?.profile?.solfegeLabels === "numbers";
  if (useNums) {
    return SOLFEGE_DEGREE_NUMBERS[syllableOrStep] || syllableOrStep;
  }
  return syllableOrStep;
}
const WHITE_PITCH_CLASSES = new Set([0, 2, 4, 5, 7, 9, 11]);
const NON_C_KEYS = ["G", "D", "F", "Bb", "Eb", "Ab", "A", "E", "B", "F#", "Db"];

const ICON_LOOP_SVG = `
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
`;

const ICON_AUTO_NEXT_SVG = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="3 5 11 12 3 19 3 5"/>
    <polygon points="12 5 20 12 12 19 12 5"/>
    <circle cx="19.5" cy="5.5" r="2.2" fill="currentColor" stroke="none"/>
  </svg>
`;

function isWhiteMidi(midi) {
  return WHITE_PITCH_CLASSES.has(((midi % 12) + 12) % 12);
}

function prevWhiteMidi(midi) {
  if (!Number.isFinite(midi)) return 59;
  let m = midi - 1;
  while (!isWhiteMidi(m)) m--;
  return m;
}

function nextWhiteMidi(midi) {
  if (!Number.isFinite(midi)) return 74;
  let m = midi + 1;
  while (!isWhiteMidi(m)) m++;
  return m;
}

function pickRandomNonCKey(excludeKey = null) {
  const pool = NON_C_KEYS.filter(k => k !== excludeKey);
  return pool[Math.floor(Math.random() * pool.length)];
}

function pickRandomAnyKey(excludeKey = null) {
  const allKeys = Object.keys(HARMONIC_DATA.roots);
  const pool = allKeys.filter(k => k !== excludeKey);
  return pool[Math.floor(Math.random() * pool.length)];
}

/* =====================================================
   NOTATION (NOTENLESEN) • SCHLÜSSEL, HILFSLINIEN & SVG
   ===================================================== */
const NOTATION_LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const NOTATION_LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const NOTATION_GERMAN_SPELLED = {
  C: { "-1": "Ces", 0: "C", 1: "Cis" },
  D: { "-1": "Des", 0: "D", 1: "Dis" },
  E: { "-1": "Es",  0: "E", 1: "Eis" },
  F: { "-1": "Fes", 0: "F", 1: "Fis" },
  G: { "-1": "Ges", 0: "G", 1: "Gis" },
  A: { "-1": "As",  0: "A", 1: "Ais" },
  B: { "-1": "B",   0: "H", 1: "His" }
};
const NOTATION_SHARP_ELIGIBLE = new Set(["C", "D", "F", "G", "A"]);
const NOTATION_FLAT_ELIGIBLE  = new Set(["D", "E", "G", "A", "B"]);
const NOTATION_QUEUE_SIZE = 6;
const NOTATION_ACTIVE_CLEFS = ["treble", "bass", "alto"];

const NOTATION_CLEFS = {
  treble: {
    id: "treble",
    mode: "notation-treble",
    anchorDiatonicIndex: 32, // G4 = 4*7 + 4
    anchorStep: 2,           // 2. Linie von unten
    anchorMidi: 67,
    anchorNote: "G4",
    active: true
  },
  bass: {
    id: "bass",
    mode: "notation-bass",
    anchorDiatonicIndex: 24, // F3 = 3*7 + 3
    anchorStep: 6,           // 4. Linie von unten
    anchorMidi: 53,
    anchorNote: "F3",
    active: true
  },
  alto: {
    id: "alto",
    mode: "notation-alto",
    anchorDiatonicIndex: 28, // C4 = 4*7 + 0
    anchorStep: 4,           // 3. (mittlere) Linie
    anchorMidi: 60,
    anchorNote: "C4",
    active: true
  },
  tenor: {
    id: "tenor",
    mode: "notation-tenor",
    anchorDiatonicIndex: 28, // C4 = 4*7 + 0
    anchorStep: 6,           // 4. Linie von unten (Spezialschlüssel für Ausbau/Wissen)
    anchorMidi: 60,
    anchorNote: "C4",
    active: false
  }
};

const NOTATION_LEVELS = {
  1: { level: 1, minStep: -1, maxStep: 9,  maxLedgers: 0, allowAccidentals: false },
  2: { level: 2, minStep: -4, maxStep: 12, maxLedgers: 2, allowAccidentals: false },
  3: { level: 3, minStep: -7, maxStep: 15, maxLedgers: 3, allowAccidentals: false },
  4: { level: 4, minStep: -7, maxStep: 15, maxLedgers: 3, allowAccidentals: true }
};

const NOTATION_SHARP_ORDER = ["F", "C", "G", "D", "A", "E", "B"];
const NOTATION_FLAT_ORDER  = ["B", "E", "A", "D", "G", "C", "F"];
const NOTATION_KEY_PHRASE_LEN = 8;

const NOTATION_KEY_SIGNATURES = {
  none: { id: "none", rootKey: "C",  type: "none",  count: 0, tier: "base" },
  G:    { id: "G",    rootKey: "G",  type: "sharp", count: 1, tier: "easy" },
  D:    { id: "D",    rootKey: "D",  type: "sharp", count: 2, tier: "easy" },
  A:    { id: "A",    rootKey: "A",  type: "sharp", count: 3, tier: "medium" },
  E:    { id: "E",    rootKey: "E",  type: "sharp", count: 4, tier: "medium" },
  B:    { id: "B",    rootKey: "B",  type: "sharp", count: 5, tier: "hard" },
  "F#": { id: "F#",   rootKey: "F#", type: "sharp", count: 6, tier: "hard" },
  F:    { id: "F",    rootKey: "F",  type: "flat",  count: 1, tier: "easy" },
  Bb:   { id: "Bb",   rootKey: "Bb", type: "flat",  count: 2, tier: "easy" },
  Eb:   { id: "Eb",   rootKey: "Eb", type: "flat",  count: 3, tier: "medium" },
  Ab:   { id: "Ab",   rootKey: "Ab", type: "flat",  count: 4, tier: "medium" },
  Db:   { id: "Db",   rootKey: "Db", type: "flat",  count: 5, tier: "hard" },
  Gb:   { id: "Gb",   rootKey: "Gb", type: "flat",  count: 6, tier: "hard" }
};

const NOTATION_KEY_POOLS = {
  easy:   ["G", "D", "F", "Bb"],
  medium: ["A", "E", "Eb", "Ab"],
  hard:   ["B", "F#", "Db", "Gb"],
  all:    ["G", "D", "A", "E", "B", "F#", "F", "Bb", "Eb", "Ab", "Db", "Gb"]
};

const NOTATION_SHARP_KEY_ORDER = ["G", "D", "A", "E", "B", "F#"];
const NOTATION_FLAT_KEY_ORDER  = ["F", "Bb", "Eb", "Ab", "Db", "Gb"];

// Klassische Gravur-Positionen (staffStep) der Generalvorzeichen je Notenschlüssel
const NOTATION_KEY_SIG_STEPS = {
  treble: { sharps: [8, 5, 9, 6, 3, 7, 4], flats: [4, 7, 3, 6, 2, 5, 1] },
  bass:   { sharps: [6, 3, 7, 4, 1, 5, 2], flats: [2, 5, 1, 4, 0, 3, -1] },
  alto:   { sharps: [7, 4, 8, 5, 2, 6, 3], flats: [3, 6, 2, 5, 1, 4, 0] },
  tenor:  { sharps: [2, 6, 3, 7, 4, 8, 5], flats: [5, 8, 4, 7, 3, 6, 2] }
};

function normalizeNotationKeySigId(raw) {
  if (!raw || raw === "C" || raw === "none") return "none";
  return Object.prototype.hasOwnProperty.call(NOTATION_KEY_SIGNATURES, raw) ? raw : "none";
}

function normalizeNotationKeyMode(raw) {
  if (!raw || raw === "C" || raw === "none") return "none";
  if (Object.prototype.hasOwnProperty.call(NOTATION_KEY_POOLS, raw)) return raw;
  return normalizeNotationKeySigId(raw);
}

function isNotationKeyPoolMode(keyMode = "none") {
  return Object.prototype.hasOwnProperty.call(NOTATION_KEY_POOLS, keyMode);
}

function resolveNotationKeySignatureId(keyMode = "none", excludeId = null) {
  const safeMode = normalizeNotationKeyMode(keyMode);
  if (safeMode === "none") return "none";
  if (isNotationKeyPoolMode(safeMode)) {
    const pool = NOTATION_KEY_POOLS[safeMode];
    const filtered = excludeId && pool.length > 1 ? pool.filter(id => id !== excludeId) : pool;
    const pickFrom = filtered.length > 0 ? filtered : pool;
    return pickFrom[Math.floor(Math.random() * pickFrom.length)];
  }
  return safeMode;
}

function getKeySignatureDef(keySigId = "none") {
  const safeId = normalizeNotationKeySigId(keySigId);
  return NOTATION_KEY_SIGNATURES[safeId] || NOTATION_KEY_SIGNATURES.none;
}

function getKeySignatureAlteredLetters(keySigId = "none") {
  const def = getKeySignatureDef(keySigId);
  if (def.type === "sharp") return NOTATION_SHARP_ORDER.slice(0, def.count);
  if (def.type === "flat") return NOTATION_FLAT_ORDER.slice(0, def.count);
  return [];
}

function getKeySignatureAccidentalForLetter(keySigId = "none", letter = "C") {
  const def = getKeySignatureDef(keySigId);
  if (def.type === "none" || !letter) return 0;
  const altered = getKeySignatureAlteredLetters(def.id);
  if (!altered.includes(letter)) return 0;
  return def.type === "sharp" ? 1 : -1;
}

function getNotationKeySignatureSteps(clefId = "treble", keySigId = "none") {
  const def = getKeySignatureDef(keySigId);
  if (def.type === "none" || def.count <= 0) return [];
  const stepTbl = NOTATION_KEY_SIG_STEPS[clefId] || NOTATION_KEY_SIG_STEPS.treble;
  const steps = def.type === "sharp" ? stepTbl.sharps : stepTbl.flats;
  const letters = getKeySignatureAlteredLetters(def.id);
  const acc = def.type === "sharp" ? 1 : -1;
  return letters.map((lt, idx) => ({
    letter: lt,
    accidental: acc,
    staffStep: steps[idx]
  }));
}

function getLocalizedNotationKeySigName(keySigId = "none", shortZero = false) {
  const safeId = normalizeNotationKeySigId(keySigId);
  if (safeId === "none") {
    return shortZero ? tr("C-Dur (0)", "C Maj (0)") : tr("Ohne (C-Dur)", "None (C Major)");
  }
  if (safeId === "Gb") {
    const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
    return tr(useIntl ? "G♭-Dur" : "Ges-Dur", "G♭ Major", { fr: "Sol♭ majeur", pl: useIntl ? "G♭-dur" : "Ges-dur", uk: "Соль♭ мажор", ur: useIntl ? "G♭ میجر" : "Ges میجر" });
  }
  return getKeyDisplayName(safeId);
}

function getLocalizedNotationKeySigBadge(keySigId = "none", includeAccNames = false) {
  const def = getKeySignatureDef(keySigId);
  if (def.type === "none" || def.count === 0) return "0";
  const sym = def.type === "sharp" ? "♯" : "♭";
  const head = `${def.count}${sym}`;
  if (!includeAccNames) return head;
  const acc = def.type === "sharp" ? 1 : -1;
  const accList = getKeySignatureAlteredLetters(def.id)
    .map(lt => formatSpelledNotationNote(lt, acc, 4, false))
    .join(", ");
  return `${head}: ${accList}`;
}

function getLocalizedNotationKeyModeLabel(keyMode = "none", compact = false) {
  const mode = normalizeNotationKeyMode(keyMode);
  if (mode === "none") return getLocalizedNotationKeySigName("none", compact);
  if (mode === "easy") return compact ? tr("Tonarten 1–2 ♯/♭", "Keys 1–2 ♯/♭") : tr("Leicht (1–2 ♯/♭)", "Easy (1–2 ♯/♭)");
  if (mode === "medium") return compact ? tr("Tonarten 3–4 ♯/♭", "Keys 3–4 ♯/♭") : tr("Mittel (3–4 ♯/♭)", "Medium (3–4 ♯/♭)");
  if (mode === "hard") return compact ? tr("Tonarten 5–6 ♯/♭", "Keys 5–6 ♯/♭") : tr("Schwer (5–6 ♯/♭)", "Hard (5–6 ♯/♭)");
  if (mode === "all") return compact ? tr("Alle Tonarten", "All Keys") : tr("Alle 12 Tonarten (1–6 ♯/♭)", "All 12 Keys (1–6 ♯/♭)");
  return `${getLocalizedNotationKeySigName(mode)} (${getLocalizedNotationKeySigBadge(mode, false)})`;
}

function isNotationMode(mode = state?.settings?.mode) {
  return typeof mode === "string" && mode.startsWith("notation-");
}

function getNotationClefFromMode(mode = state?.settings?.mode) {
  if (mode === "notation-bass") return "bass";
  if (mode === "notation-alto") return "alto";
  if (mode === "notation-tenor") return "tenor";
  return "treble";
}

function getLocalizedNotationClefName(clefId) {
  const names = {
    treble: tr("Violinschlüssel", "Treble Clef"),
    bass:   tr("Bassschlüssel", "Bass Clef"),
    alto:   tr("Altschlüssel", "Alto Clef"),
    tenor:  tr("Tenorschlüssel", "Tenor Clef")
  };
  return names[clefId] || names.treble;
}

function getLocalizedNotationClefAnchorHint(clefId) {
  const hints = {
    treble: tr("G4 (g') • 2. Linie", "G4 • Line 2"),
    bass:   tr("F3 (f) • 4. Linie", "F3 • Line 4"),
    alto:   tr("C4 (c') • Mittellinie", "C4 • Center Line"),
    tenor:  tr("C4 (c') • 4. Linie", "C4 • Line 4")
  };
  return hints[clefId] || hints.treble;
}

function formatSpelledNotationNote(letter, accidental = 0, octave = 4, includeOctave = true) {
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  const safeLetter = NOTATION_LETTER_PC[letter] !== undefined ? letter : "C";
  const safeAcc = accidental > 0 ? 1 : (accidental < 0 ? -1 : 0);
  let base = "";
  if (useIntl) {
    const accSym = safeAcc === 1 ? "♯" : (safeAcc === -1 ? "♭" : "");
    base = `${safeLetter}${accSym}`;
  } else {
    base = (NOTATION_GERMAN_SPELLED[safeLetter] && NOTATION_GERMAN_SPELLED[safeLetter][String(safeAcc)]) || safeLetter;
  }
  return includeOctave ? `${base}${octave}` : base;
}

function getLedgerLinesForStep(staffStep) {
  if (!Number.isFinite(staffStep)) return [];
  if (staffStep <= -2) {
    return [-2, -4, -6].filter(s => s >= staffStep);
  }
  if (staffStep >= 10) {
    return [10, 12, 14].filter(s => s <= staffStep);
  }
  return [];
}

function getNotationLedgerDescription(staffStep) {
  const ledgers = getLedgerLinesForStep(staffStep);
  if (ledgers.length === 0) {
    if (staffStep === -1) return tr("Unter der 1. Linie", "Space below Line 1");
    if (staffStep === 9) return tr("Über der 5. Linie", "Space above Line 5");
    return tr("Im 5-Linien-System", "Inside the 5-line staff");
  }
  const n = ledgers.length;
  if (staffStep < 0) {
    return tf("{n}. Hilfslinie unten", "{n} ledger line(s) below", { n });
  }
  return tf("{n}. Hilfslinie oben", "{n} ledger line(s) above", { n });
}

function getNotationNoteFromStaffStep(clefId = "treble", staffStep = 4, accidental = 0, keySignatureId = "none", shownAccidental = undefined) {
  const clef = NOTATION_CLEFS[clefId] || NOTATION_CLEFS.treble;
  const clampedStep = Math.max(-7, Math.min(15, Math.round(staffStep)));
  const safeAcc = accidental > 0 ? 1 : (accidental < 0 ? -1 : 0);
  const safeKeySig = normalizeNotationKeySigId(keySignatureId);
  const diatonicIndex = clef.anchorDiatonicIndex + (clampedStep - clef.anchorStep);
  const octave = Math.floor(diatonicIndex / 7);
  const letterIdx = ((diatonicIndex % 7) + 7) % 7;
  const letter = NOTATION_LETTERS[letterIdx];
  const baseMidi = (octave + 1) * 12 + NOTATION_LETTER_PC[letter];
  const midi = baseMidi + safeAcc;
  const pc = ((midi % 12) + 12) % 12;
  const ledgerSteps = getLedgerLinesForStep(clampedStep);
  const keySigAcc = getKeySignatureAccidentalForLetter(safeKeySig, letter);

  let resolvedShownAcc = 0;
  if (shownAccidental !== undefined && shownAccidental !== null) {
    resolvedShownAcc = (shownAccidental === "nat" || shownAccidental === 2)
      ? "nat"
      : (shownAccidental > 0 ? 1 : (shownAccidental < 0 ? -1 : 0));
  } else if (safeKeySig === "none") {
    resolvedShownAcc = safeAcc;
  } else if (safeAcc === keySigAcc) {
    resolvedShownAcc = 0;
  } else if (safeAcc === 0 && keySigAcc !== 0) {
    resolvedShownAcc = "nat";
  } else {
    resolvedShownAcc = safeAcc;
  }

  return {
    clefId: clef.id,
    staffStep: clampedStep,
    letter: letter,
    accidental: safeAcc,
    keySignatureId: safeKeySig,
    keySigAccidental: keySigAcc,
    shownAccidental: resolvedShownAcc,
    octave: octave,
    midi: midi,
    pc: pc,
    noteName: midiToNote(midi),
    displayName: formatSpelledNotationNote(letter, safeAcc, octave, true),
    shortName: formatSpelledNotationNote(letter, safeAcc, octave, false),
    ledgerSteps: ledgerSteps,
    ledgerCount: ledgerSteps.length,
    ledgerDesc: getNotationLedgerDescription(clampedStep)
  };
}

function pickRandomNotationNoteItem(clefId, level = 1, prevItem = null, keySignatureId = "none") {
  const lvl = Math.max(1, Math.min(4, parseInt(level, 10) || 1));
  const cfg = NOTATION_LEVELS[lvl] || NOTATION_LEVELS[1];
  const safeKeySig = normalizeNotationKeySigId(keySignatureId);
  const hasKeySig = safeKeySig !== "none";
  const allSteps = [];
  for (let s = cfg.minStep; s <= cfg.maxStep; s++) {
    allSteps.push(s);
  }

  // Bei Stufe 3 & 4 die äußeren Hilfslinien etwas häufiger trainieren, statt fast immer in der Mitte zu bleiben
  let candidatePool = allSteps;
  if (lvl >= 3 && Math.random() < 0.56) {
    const outerSteps = allSteps.filter(s => s <= -2 || s >= 10);
    if (outerSteps.length > 0) candidatePool = outerSteps;
  }

  // Bei aktiver Tonart ~54% gezielt Töne wählen, die vom Generalvorzeichen verändert werden (sonst z. B. F# bei G-Dur zu selten)
  if (hasKeySig && Math.random() < 0.54) {
    const sigSteps = candidatePool.filter(s => {
      const probe = getNotationNoteFromStaffStep(clefId, s, 0);
      return getKeySignatureAccidentalForLetter(safeKeySig, probe.letter) !== 0;
    });
    if (sigSteps.length > 0) candidatePool = sigSteps;
  }

  for (let attempt = 0; attempt < 28; attempt++) {
    const step = candidatePool[Math.floor(Math.random() * candidatePool.length)];
    const probe = getNotationNoteFromStaffStep(clefId, step, 0);
    const keySigAcc = hasKeySig ? getKeySignatureAccidentalForLetter(safeKeySig, probe.letter) : 0;
    let acc = keySigAcc;

    if (hasKeySig) {
      if (cfg.allowAccidentals && Math.random() < 0.36) {
        if (keySigAcc !== 0) {
          acc = 0; // Auflösungszeichen (♮)
        } else {
          const accChoices = [];
          if (NOTATION_SHARP_ELIGIBLE.has(probe.letter)) accChoices.push(1);
          if (NOTATION_FLAT_ELIGIBLE.has(probe.letter)) accChoices.push(-1);
          if (accChoices.length > 0) {
            acc = accChoices[Math.floor(Math.random() * accChoices.length)];
          }
        }
      }
    } else if (cfg.allowAccidentals && Math.random() < 0.44) {
      const accChoices = [];
      if (NOTATION_SHARP_ELIGIBLE.has(probe.letter)) accChoices.push(1);
      if (NOTATION_FLAT_ELIGIBLE.has(probe.letter)) accChoices.push(-1);
      if (accChoices.length > 0) {
        acc = accChoices[Math.floor(Math.random() * accChoices.length)];
      }
    }

    const candidate = getNotationNoteFromStaffStep(clefId, step, acc, safeKeySig);
    const sameAsPrev = prevItem &&
      prevItem.clefId === candidate.clefId &&
      prevItem.staffStep === candidate.staffStep &&
      prevItem.accidental === candidate.accidental &&
      (prevItem.keySignatureId || "none") === candidate.keySignatureId;
    if (!sameAsPrev || attempt >= 22) {
      return candidate;
    }
  }
  const fbProbe = getNotationNoteFromStaffStep(clefId, 4, 0);
  const fbAcc = hasKeySig ? getKeySignatureAccidentalForLetter(safeKeySig, fbProbe.letter) : 0;
  return getNotationNoteFromStaffStep(clefId, 4, fbAcc, safeKeySig);
}

function getNotationClefGlyphSVG(clefId = "treble", x = 22, scale = 1, opacity = 1) {
  const opAttr = opacity < 1 ? ` opacity="${opacity}"` : "";
  if (clefId === "bass") {
    const by = scale === 1 ? "0" : (76 * (1 - scale)).toFixed(1);
    return `<g transform="translate(${(x - 22).toFixed(1)}, ${by}) scale(${scale})"${opAttr}>
      <circle cx="25" cy="76" r="4.1" fill="currentColor"/>
      <path d="M24.5 76 C23 67.5, 31 63.2, 37.5 66.2 C43.8 69.2, 43.2 84.5, 34 95 C28 102, 21.5 106, 17.5 108.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
      <circle cx="48" cy="70" r="2.4" fill="currentColor"/>
      <circle cx="48" cy="82" r="2.4" fill="currentColor"/>
    </g>`;
  }
  if (clefId === "alto" || clefId === "tenor") {
    const centerY = clefId === "tenor" ? 76 : 88;
    const cy = scale === 1 ? "0" : (centerY * (1 - scale)).toFixed(1);
    const topY = centerY - 24;
    const botY = centerY + 24;
    return `<g transform="translate(${(x - 20).toFixed(1)}, ${cy}) scale(${scale})"${opAttr}>
      <rect x="20" y="${topY}" width="4.4" height="48" rx="1" fill="currentColor"/>
      <line x1="27.5" y1="${topY}" x2="27.5" y2="${botY}" stroke="currentColor" stroke-width="1.7"/>
      <path d="M29 ${centerY} C32 ${centerY - 7}, 42.5 ${centerY - 6.5}, 43.5 ${centerY - 14.5} C44.5 ${centerY - 21}, 39 ${centerY - 24}, 33 ${centerY - 22.5} C30.5 ${centerY - 21.8}, 30 ${centerY - 19}, 32.5 ${centerY - 17.5}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M29 ${centerY} C32 ${centerY + 7}, 42.5 ${centerY + 6.5}, 43.5 ${centerY + 14.5} C44.5 ${centerY + 21}, 39 ${centerY + 24}, 33 ${centerY + 22.5} C30.5 ${centerY + 21.8}, 30 ${centerY + 19}, 32.5 ${centerY + 17.5}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
    </g>`;
  }
  // Violinschlüssel (G-Schlüssel: Spirale um 2. Linie G4 y = 100 / localY = 58, Bauch auf 1. Linie y = 112 / localY = 70, Bogendach an 3. Linie y = 88 / localY = 46, Kreuzung an 4. Linie y = 76 / localY = 34)
  const ty = scale === 1 ? "42" : (100 - 58 * scale).toFixed(1);
  return `<g transform="translate(${x.toFixed(1)}, ${ty}) scale(${scale})"${opAttr} fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17.6 59.2 C15.6 62.2, 12.0 61.8, 10.2 58.6 C8.0 54.2, 9.2 48.0, 13.6 46.8 C18.2 45.6, 23.2 49.2, 23.8 56.8 C24.4 64.2, 20.8 70.0, 14.4 70.0 C7.5 70.0, 2.9 63.2, 3.4 54.0 C3.8 44.2, 14.6 35.8, 18.8 21.0 C20.6 14.2, 20.0 4.8, 16.5 4.4 C13.7 4.0, 12.6 9.5, 12.8 17.5 L13.6 79.8 C13.8 86.0, 10.8 88.6, 7.8 88.0 C5.8 87.6, 4.8 85.6, 5.2 83.4" stroke-width="2.4"/>
    <circle cx="6.0" cy="82.8" r="2.35" fill="currentColor" stroke="none"/>
  </g>`;
}

function getNotationAccidentalGlyphSVG(accidental, x, y, scale = 1) {
  const scAttr = scale !== 1 ? ` scale(${scale})` : "";
  if (accidental === 1) {
    return `<g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})${scAttr}" stroke="currentColor" stroke-linecap="round">
      <line x1="-2.8" y1="-9" x2="-2.8" y2="9" stroke-width="1.5"/>
      <line x1="2.8" y1="-10" x2="2.8" y2="8" stroke-width="1.5"/>
      <line x1="-6" y1="-2.2" x2="6" y2="-4.2" stroke-width="2.3"/>
      <line x1="-6" y1="3.8" x2="6" y2="1.8" stroke-width="2.3"/>
    </g>`;
  }
  if (accidental === -1) {
    return `<g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})${scAttr}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <line x1="-2.5" y1="-13.5" x2="-2.5" y2="4.2" stroke-width="1.65"/>
      <path d="M-2.5 -0.8 C1.2 -3.6, 5.2 -1.8, 4.8 1.5 C4.3 4.2, 0.2 5.2, -2.5 4.2" stroke-width="1.9"/>
    </g>`;
  }
  if (accidental === "nat" || accidental === 2) {
    return `<g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})${scAttr}" stroke="currentColor" stroke-linecap="round">
      <line x1="-2.7" y1="-10.8" x2="-2.7" y2="5.4" stroke-width="1.55"/>
      <line x1="2.7" y1="-5.4" x2="2.7" y2="10.8" stroke-width="1.55"/>
      <line x1="-2.7" y1="-2.5" x2="2.7" y2="-4.1" stroke-width="2.15"/>
      <line x1="-2.7" y1="4.1" x2="2.7" y2="2.5" stroke-width="2.15"/>
    </g>`;
  }
  return "";
}

function notationStepToY(staffStep) {
  return 88 + (4 - staffStep) * 6;
}

/**
 * Gemeinsamer Notensystem-SVG-Renderer für Übungs-Warteschlange, Prüfungs-Rückschau und Wissensmodul.
 */
function buildNotationStaffSVG(notes, options = {}) {
  const list = Array.isArray(notes) ? notes : [notes].filter(Boolean);
  const firstClef = options.clefId || list[0]?.clefId || "treble";
  const keySigId = normalizeNotationKeySigId(options.keySignatureId !== undefined ? options.keySignatureId : (list[0]?.keySignatureId || "none"));
  const keySigItems = getNotationKeySignatureSteps(firstClef, keySigId);
  const keySigCount = keySigItems.length;
  const isExerciseStaff = options.level != null;
  const defaultWidth = isExerciseStaff
    ? (320 + (keySigCount > 0 ? Math.min(52, keySigCount * 8 + 4) : 0))
    : 360;
  const width = Number(options.width) || defaultWidth;
  const height = Number(options.height) || 176;
  const startX = Number(options.startX) || (isExerciseStaff ? 8 : 12);
  const endX = width - (isExerciseStaff ? 8 : 10);
  const highlightFirst = options.highlightFirst !== false;
  const highlightAll = Boolean(options.highlightAll);
  const showChangeClefs = options.showChangeClefs !== false;
  const didShift = Boolean(options.didShift);
  const clsName = options.className || "notation-staff-svg";

  const getClefYBounds = (cId, sc = 1) => {
    if (cId === "bass") return [62, 111];
    if (cId === "alto" || cId === "tenor") {
      return cId === "tenor" ? [51, 101] : [63, 113];
    }
    return [42 + 4 * sc, 42 + 88 * sc];
  };

  let [inkMinY, inkMaxY] = getClefYBounds(firstClef, 1);
  inkMinY = Math.min(inkMinY, 64);
  inkMaxY = Math.max(inkMaxY, 112);

  // Fünf Stammlinien (Schritt 0, 2, 4, 6, 8)
  const staffLinesHtml = [0, 2, 4, 6, 8].map(st => {
    const ly = notationStepToY(st);
    return `<line class="notation-staff-line" x1="${startX}" y1="${ly}" x2="${endX}" y2="${ly}"/>`;
  }).join("");

  // Optionale Anker-Linien-Betonung (z. B. für Erklärgrafiken im Wissensmodul)
  const anchorStep = (NOTATION_CLEFS[firstClef] || NOTATION_CLEFS.treble).anchorStep;
  const anchorHighlightHtml = options.highlightAnchorLine
    ? `<line x1="${startX}" y1="${notationStepToY(anchorStep)}" x2="${endX}" y2="${notationStepToY(anchorStep)}" stroke="var(--peach-strong)" stroke-width="2.1" opacity="0.68"/>`
    : "";

  const clefMarkup = getNotationClefGlyphSVG(firstClef, startX + (isExerciseStaff ? 8 : 10), 1, 1);

  // Generalvorzeichen direkt rechts neben dem Notenschlüssel rendern
  const keySigPitch = keySigCount > 4 ? 9.5 : 10.5;
  const keySigScale = isExerciseStaff || options.compact ? 0.88 : 0.92;
  const keySigStartX = startX + (isExerciseStaff ? 44 : 46);
  const keySigMarkup = keySigItems.map((ks, idx) => {
    const kx = keySigStartX + idx * keySigPitch;
    const ky = notationStepToY(ks.staffStep);
    inkMinY = Math.min(inkMinY, ks.accidental === -1 ? (ky - 13) : (ky - 10));
    inkMaxY = Math.max(inkMaxY, ky + 9);
    return getNotationAccidentalGlyphSVG(ks.accidental, kx, ky, keySigScale);
  }).join("");
  const keySigRightEdge = keySigCount > 0 ? (keySigStartX + (keySigCount - 1) * keySigPitch + 8) : (startX + 46);

  // X-Koordinaten pro Note berechnen
  let positions = Array.isArray(options.xPositions) ? options.xPositions : null;
  if (!positions && list.length > 0) {
    if (list.length === 1) {
      const minSingleX = keySigCount > 0 ? Math.round(keySigRightEdge + 22) : Math.round(width * 0.56);
      const baseSingleX = Number(options.firstNoteX) || Math.round(width * 0.56);
      positions = [Math.min(endX - 18, Math.max(baseSingleX, minSingleX))];
    } else {
      const minMultiX = keySigCount > 0 ? Math.round(keySigRightEdge + 20) : (startX + (isExerciseStaff ? 68 : 86));
      const firstNoteX = Math.max(Number(options.firstNoteX) || (startX + (isExerciseStaff ? 68 : 86)), minMultiX);
      const spacing = Number(options.noteSpacing) || (isExerciseStaff
        ? Math.min(46, Math.max(30, Math.floor((endX - firstNoteX - 14) / Math.max(1, list.length - 1))))
        : Math.min(48, Math.max(34, Math.floor((endX - firstNoteX - 18) / Math.max(1, list.length - 1)))));
      positions = list.map((_, i) => firstNoteX + i * spacing);
    }
  } else if (!positions) {
    positions = [];
  }

  const notesHtml = list.map((item, idx) => {
    if (!item) return "";
    const nx = positions[idx] || (startX + 86 + idx * 46);
    const ny = notationStepToY(item.staffStep);
    const isTarget = highlightAll || (highlightFirst && idx === 0);
    const prevClef = idx > 0 ? list[idx - 1]?.clefId : firstClef;

    let changeClefHtml = "";
    if (showChangeClefs && idx > 0 && item.clefId && prevClef && item.clefId !== prevClef) {
      changeClefHtml = getNotationClefGlyphSVG(item.clefId, nx - 27, 0.72, 0.78);
      const [cMin, cMax] = getClefYBounds(item.clefId, 0.72);
      inkMinY = Math.min(inkMinY, cMin);
      inkMaxY = Math.max(inkMaxY, cMax);
    }

    const ledgerHtml = getLedgerLinesForStep(item.staffStep).map(ls => {
      const ly = notationStepToY(ls);
      return `<line class="notation-ledger-line" x1="${nx - 12.5}" y1="${ly}" x2="${nx + 12.5}" y2="${ly}"/>`;
    }).join("");

    const drawnAcc = item.shownAccidental !== undefined ? item.shownAccidental : item.accidental;
    const accHtml = drawnAcc
      ? getNotationAccidentalGlyphSVG(drawnAcc, nx - 14.5, ny)
      : "";

    const stemDown = item.staffStep >= 4;
    const stemX = stemDown ? (nx - 6.3) : (nx + 6.3);
    const stemY1 = ny + (stemDown ? 1 : -1);
    const stemY2 = ny + (stemDown ? 28 : -28);

    const accTopY = drawnAcc === -1 ? (ny - 15) : (drawnAcc === 1 || drawnAcc === "nat" || drawnAcc === 2) ? (ny - 11) : (ny - 7);
    const accBotY = (drawnAcc === 1 || drawnAcc === "nat" || drawnAcc === 2) ? (ny + 11) : (ny + 7);
    inkMinY = Math.min(inkMinY, ny - 7, accTopY, stemDown ? stemY1 : stemY2 - 1);
    inkMaxY = Math.max(inkMaxY, ny + 7, accBotY, stemDown ? stemY2 + 1 : stemY1);

    // Realistische Notenschrift ohne Einrahmung: aktive Note vorn leicht klarer (1.0), Folge-Noten minimal ruhiger
    const fadeOp = isTarget ? 1 : Math.max(0.64, 0.78 - idx * 0.028);
    const grpClass = `notation-note-group ${isTarget ? "is-target" : "is-upcoming"}`;

    return `${changeClefHtml}
      <g class="${grpClass}" opacity="${fadeOp.toFixed(2)}">
        ${ledgerHtml}
        ${accHtml}
        <line x1="${stemX.toFixed(1)}" y1="${stemY1.toFixed(1)}" x2="${stemX.toFixed(1)}" y2="${stemY2.toFixed(1)}" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
        <ellipse cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" rx="7.0" ry="5.1" transform="rotate(-18 ${nx.toFixed(1)} ${ny.toFixed(1)})" fill="currentColor"/>
        ${options.showLabels ? `<text x="${nx.toFixed(1)}" y="170" text-anchor="middle" font-size="10.5" font-weight="800" fill="currentColor">${escapeHtml(options.labelShort ? item.shortName : item.displayName)}</text>` : ""}
      </g>`;
  }).join("");

  let vbTop = 0;
  let vbHeight = height;
  if (options.level != null || options.compact) {
    const isEmptyCompact = Boolean(options.compact && list.length === 0);
    const lvl = Number(options.level) || 1;
    const padY = isEmptyCompact ? 2 : 4;
    const baseTop = isEmptyCompact ? 44 : (lvl <= 1 ? 26 : lvl === 2 ? 18 : 6);
    const baseBottom = isEmptyCompact ? 132 : (lvl <= 1 ? 148 : lvl === 2 ? 156 : 168);
    vbTop = Math.min(baseTop, Math.floor(inkMinY - padY));
    const vbBottom = Math.max(baseBottom, Math.ceil(inkMaxY + padY), options.showLabels ? 176 : 0);
    vbHeight = vbBottom - vbTop;
  }

  return `<svg class="${clsName}" viewBox="0 ${vbTop} ${width} ${vbHeight}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(options.ariaLabel || tr("Notensystem", "Musical staff"))}">
    ${staffLinesHtml}
    ${anchorHighlightHtml}
    ${clefMarkup}
    ${keySigMarkup ? `<g class="notation-keysig-layer">${keySigMarkup}</g>` : ""}
    <g class="notation-notes-layer${didShift ? " did-shift" : ""}">
      ${notesHtml}
    </g>
  </svg>`;
}

function buildNotationMiniStaffSVG(snapshot) {
  if (!snapshot) return "";
  const snapKeySig = normalizeNotationKeySigId(snapshot.keySignatureId || "none");
  const item = getNotationNoteFromStaffStep(
    snapshot.clefId || "treble",
    Number.isFinite(Number(snapshot.staffStep)) ? Number(snapshot.staffStep) : 4,
    Number(snapshot.accidental) || 0,
    snapKeySig,
    snapshot.shownAccidental
  );
  return buildNotationStaffSVG([item], {
    clefId: item.clefId,
    keySignatureId: snapKeySig,
    width: 220,
    height: 176,
    firstNoteX: 132,
    highlightFirst: true,
    showChangeClefs: false,
    className: "notation-mini-staff-svg"
  });
}

function buildNotationKnowledgeStaffSVG(clefId, stepsOrSpecs, options = {}) {
  const keySigId = normalizeNotationKeySigId(options.keySignatureId || "none");
  const list = (Array.isArray(stepsOrSpecs) ? stepsOrSpecs : [stepsOrSpecs]).map(entry => {
    if (typeof entry === "number") {
      const defAcc = keySigId !== "none"
        ? getKeySignatureAccidentalForLetter(keySigId, getNotationNoteFromStaffStep(clefId, entry, 0).letter)
        : 0;
      return getNotationNoteFromStaffStep(clefId, entry, defAcc, keySigId);
    }
    return getNotationNoteFromStaffStep(clefId, entry.step ?? 4, entry.accidental ?? 0, keySigId, entry.shownAccidental);
  });
  return buildNotationStaffSVG(list, {
    clefId: clefId,
    keySignatureId: keySigId,
    width: options.width || 300,
    height: options.height || 176,
    startX: 10,
    firstNoteX: list.length === 1 ? 160 : (keySigId !== "none" ? 114 : 88),
    noteSpacing: options.noteSpacing || 48,
    highlightFirst: false,
    highlightAll: Boolean(options.highlightAll),
    highlightAnchorLine: Boolean(options.highlightAnchorLine),
    showLabels: options.showLabels !== false,
    labelShort: Boolean(options.labelShort),
    className: options.className || "notation-knowledge-svg"
  });
}

const SOLFEGE_SCALE_STEPS = [
  { key: "Do_low",  syllable: "Do",  label: "Grundton (Do)",       semitones: 0,  resolveOffsets: [0] },
  { key: "Re",      syllable: "Re",  label: "2. Stufe (Re → Do)",  semitones: 2,  resolveOffsets: [2, 0] },
  { key: "Mi",      syllable: "Mi",  label: "3. Stufe (Mi → Do)",  semitones: 4,  resolveOffsets: [4, 2, 0] },
  { key: "Fa",      syllable: "Fa",  label: "4. Stufe (Fa → Do)",  semitones: 5,  resolveOffsets: [5, 4, 2, 0] },
  { key: "Sol",     syllable: "Sol", label: "5. Stufe (Sol → Do)", semitones: 7,  resolveOffsets: [7, 9, 11, 12] },
  { key: "La",      syllable: "La",  label: "6. Stufe (La → Do)",  semitones: 9,  resolveOffsets: [9, 11, 12] },
  { key: "Ti",      syllable: "Ti",  label: "7. Stufe (Ti → Do)",  semitones: 11, resolveOffsets: [11, 12] },
  { key: "Do_high", syllable: "Do",  label: "Obere Tonika (Do)",   semitones: 12, resolveOffsets: [12] }
];

const MELODY_RANGE_CONFIG = {
  "do-fa":  { label: "Do–Fa",        semitones: [0, 2, 4, 5],               badge: "Do–Fa" },
  "sol-do": { label: "Sol–Do",       semitones: [7, 9, 11, 12],             badge: "Sol–Do" },
  "full":   { label: "Ganze Tonart", semitones: [0, 2, 4, 5, 7, 9, 11, 12], badge: "Do–Do" }
};

const MELODY_RHYTHM_VALUES = {
  eighth:        { key: "eighth",        beats: 0.5, short: "1/8",  symbol: "♪",  de: "Achtel",         en: "Eighth" },
  quarter:       { key: "quarter",       beats: 1.0, short: "1/4",  symbol: "♩",  de: "Viertel",        en: "Quarter" },
  dottedQuarter: { key: "dottedQuarter", beats: 1.5, short: "1/4.", symbol: "♩.", de: "Punkt. Viertel", en: "Dotted 1/4" },
  half:          { key: "half",          beats: 2.0, short: "1/2",  symbol: "𝅗𝅥",  de: "Halbe",          en: "Half" }
};

const MELODY_RHYTHM_ORDER = ["eighth", "quarter", "dottedQuarter", "half"];

function getLocalizedMelodyRhythmValue(key) {
  const def = MELODY_RHYTHM_VALUES[key] || MELODY_RHYTHM_VALUES.quarter;
  return { ...def, label: tr(def.de, def.en) };
}

function getMelodyNoteValueSVG(rhythmKey, width = 18, height = 18) {
  let body = "";
  const filledHead = `<ellipse cx="8" cy="14" rx="3.4" ry="2.3" transform="rotate(-18 8 14)" fill="currentColor"/>`;
  const hollowHead = `<ellipse cx="8" cy="14" rx="3.4" ry="2.3" transform="rotate(-18 8 14)" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
  const stem = `<line x1="11" y1="13.5" x2="11" y2="2.5" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/>`;
  if (rhythmKey === "eighth") {
    body = filledHead + stem + `<path d="M11 2.5 C15 4.2 16 7.5 14 10" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" fill="none"/>`;
  } else if (rhythmKey === "dottedQuarter") {
    body = filledHead + stem + `<circle cx="14.5" cy="14.2" r="1.55" fill="currentColor"/>`;
  } else if (rhythmKey === "half") {
    body = hollowHead + stem;
  } else {
    body = filledHead + stem;
  }
  return `<svg class="melody-note-svg" width="${width}" height="${height}" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
}

function getMelodyRestSVG(width = 11, height = 14) {
  return `<svg class="melody-note-svg" width="${width}" height="${height}" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 3 L9 7 L5 10.5 L9 14.5 C6 14.5 4.5 16 6.5 17.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
}

const MELODY_PHRASE_TEMPLATES = [
  // 4-Ton-Phrasen (ohne Pause, sowohl für Rhythmic als auch Dictation)
  { id: "p4_44_song1", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 1.5, rhythm: "dottedQuarter" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 3.0, beats: 1.0, rhythm: "quarter" }
  ] },
  { id: "p4_44_run1", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 1.0, rhythm: "quarter" },
    { offset: 1.0, beats: 0.5, rhythm: "eighth" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p4_44_lift1", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 0.5, rhythm: "eighth" },
    { offset: 0.5, beats: 0.5, rhythm: "eighth" },
    { offset: 1.0, beats: 1.0, rhythm: "quarter" },
    { offset: 2.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p4_44_sync1", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 0.5, rhythm: "eighth" },
    { offset: 0.5, beats: 1.0, rhythm: "quarter" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p4_44_breath1", meter: "4/4", beatsPerBar: 4, totalBeats: 8, hasRest: true, steps: [
    { offset: 0.0, beats: 1.0, rhythm: "quarter" },
    { offset: 1.0, beats: 2.0, rhythm: "half" },
    { offset: 4.0, beats: 2.0, rhythm: "half", restBefore: 1.0 },
    { offset: 6.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p4_34_sarabande", meter: "3/4", beatsPerBar: 3, totalBeats: 6, hasRest: false, steps: [
    { offset: 0.0, beats: 2.0, rhythm: "half" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 3.0, beats: 1.0, rhythm: "quarter" },
    { offset: 4.0, beats: 2.0, rhythm: "half" }
  ] },

  // 5-Ton-Phrasen
  { id: "p5_44_flow1", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 1.0, rhythm: "quarter" },
    { offset: 1.0, beats: 0.5, rhythm: "eighth" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 3.0, beats: 1.0, rhythm: "quarter" }
  ] },
  { id: "p5_44_drive", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 0.5, rhythm: "eighth" },
    { offset: 0.5, beats: 0.5, rhythm: "eighth" },
    { offset: 1.0, beats: 0.5, rhythm: "eighth" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p5_44_arc", meter: "4/4", beatsPerBar: 4, totalBeats: 8, hasRest: false, steps: [
    { offset: 0.0, beats: 1.5, rhythm: "dottedQuarter" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 2.0, rhythm: "half" },
    { offset: 4.0, beats: 2.0, rhythm: "half" },
    { offset: 6.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p5_44_pausePhrase", meter: "4/4", beatsPerBar: 4, totalBeats: 8, hasRest: true, steps: [
    { offset: 0.0, beats: 1.5, rhythm: "dottedQuarter" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 4.0, beats: 2.0, rhythm: "half", restBefore: 1.0 },
    { offset: 6.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p5_34_waltz", meter: "3/4", beatsPerBar: 3, totalBeats: 6, hasRest: false, steps: [
    { offset: 0.0, beats: 1.5, rhythm: "dottedQuarter" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 3.0, beats: 1.0, rhythm: "quarter" },
    { offset: 4.0, beats: 2.0, rhythm: "half" }
  ] },

  // 6-Ton-Phrasen
  { id: "p6_44_qa", meter: "4/4", beatsPerBar: 4, totalBeats: 8, hasRest: false, steps: [
    { offset: 0.0, beats: 1.0, rhythm: "quarter" },
    { offset: 1.0, beats: 0.5, rhythm: "eighth" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 2.0, rhythm: "half" },
    { offset: 4.0, beats: 2.0, rhythm: "half" },
    { offset: 6.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p6_44_chant", meter: "4/4", beatsPerBar: 4, totalBeats: 8, hasRest: true, steps: [
    { offset: 0.0, beats: 1.0, rhythm: "quarter" },
    { offset: 1.0, beats: 1.0, rhythm: "quarter" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 4.0, beats: 1.5, rhythm: "dottedQuarter", restBefore: 1.0 },
    { offset: 5.5, beats: 0.5, rhythm: "eighth" },
    { offset: 6.0, beats: 2.0, rhythm: "half" }
  ] },
  { id: "p6_44_eighths", meter: "4/4", beatsPerBar: 4, totalBeats: 4, hasRest: false, steps: [
    { offset: 0.0, beats: 1.0, rhythm: "quarter" },
    { offset: 1.0, beats: 0.5, rhythm: "eighth" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 0.5, rhythm: "eighth" },
    { offset: 2.5, beats: 0.5, rhythm: "eighth" },
    { offset: 3.0, beats: 1.0, rhythm: "quarter" }
  ] },
  { id: "p6_34_song", meter: "3/4", beatsPerBar: 3, totalBeats: 6, hasRest: false, steps: [
    { offset: 0.0, beats: 1.5, rhythm: "dottedQuarter" },
    { offset: 1.5, beats: 0.5, rhythm: "eighth" },
    { offset: 2.0, beats: 1.0, rhythm: "quarter" },
    { offset: 3.0, beats: 0.5, rhythm: "eighth" },
    { offset: 3.5, beats: 0.5, rhythm: "eighth" },
    { offset: 4.0, beats: 2.0, rhythm: "half" }
  ] }
];

function pickMelodyPhraseTemplate(range, style) {
  if (style === "steady") {
    return {
      id: "steady_4_half",
      meter: "4/4",
      beatsPerBar: 4,
      totalBeats: 8,
      hasRest: false,
      steps: [
        { offset: 0, beats: 2, rhythm: "half" },
        { offset: 2, beats: 2, rhythm: "half" },
        { offset: 4, beats: 2, rhythm: "half" },
        { offset: 6, beats: 2, rhythm: "half" }
      ]
    };
  }
  const allowedCounts = range === "do-fa" ? [4, 5] : [4, 5, 6];
  const allowRests = style !== "dictation";
  const candidates = MELODY_PHRASE_TEMPLATES.filter(t =>
    allowedCounts.includes(t.steps.length) && (allowRests || !t.hasRest)
  );
  const pool = candidates.length > 0 ? candidates : MELODY_PHRASE_TEMPLATES;
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateMusicalMelodySteps(pool, template, isMultiOctave, rootMidi) {
  const count = template.steps.length;
  const maxIdx = pool.length - 1;
  const pickWeightedIdx = (items) => {
    const totalW = items.reduce((s, x) => s + x.w, 0);
    let r = Math.random() * totalW;
    for (let i = 0; i < items.length; i++) {
      r -= items[i].w;
      if (r <= 0) return items[i].idx;
    }
    return items[items.length - 1].idx;
  };

  // Startton: stabiler Ruheton im Tonvorrat (Do, Mi, Sol, Do2) bevorzugt
  const anchorKeys = new Set(["Do", "Mi", "Sol", "Do2"]);
  const startCandidates = pool.map((st, idx) => ({
    idx,
    w: anchorKeys.has(st.key) ? 3.2 : 1.0
  }));
  const indices = [pickWeightedIdx(startCandidates)];
  let lastMove = 0;

  for (let i = 1; i < count; i++) {
    const prevIdx = indices[i - 1];
    const stepTiming = template.steps[i];
    const isLast = i === count - 1;
    const isFast = stepTiming.beats <= 0.5;
    const candidates = [];

    for (let cIdx = 0; cIdx <= maxIdx; cIdx++) {
      const diff = cIdx - prevIdx;
      const absDiff = Math.abs(diff);
      let w = 0.3;

      if (absDiff === 0) {
        // Tonwiederholungen besonders auf schnellen Achteln musikalisch natürlich, sonst sparsam
        w = isFast && i < count - 1 ? 1.8 : 0.45;
      } else if (absDiff === 1) {
        // Stufenweise Sekund-Bewegung bildet das Rückgrat singbarer Melodien
        w = 4.6;
        if (Math.abs(lastMove) >= 2 && Math.sign(diff) !== Math.sign(lastMove)) {
          w *= 1.85; // Gegenbewegung nach Sprung
        }
      } else if (absDiff === 2) {
        // Terzsprung
        w = 2.1;
        if (Math.abs(lastMove) >= 2 && Math.sign(diff) === Math.sign(lastMove)) {
          w *= 0.45;
        }
      } else if (absDiff === 3) {
        w = 0.9;
      } else {
        w = 0.35;
      }

      // Phrasenschluss: ruhende Endung (Do, Mi, Sol) oder offener Halbschluss (Re, Sol) bevorzugen
      if (isLast) {
        const key = pool[cIdx].key;
        if (key === "Do" || key === "Do2" || key === "Sol") w *= 2.4;
        else if (key === "Mi" || key === "Re") w *= 1.5;
        if (absDiff === 0 && stepTiming.beats >= 1.5) w *= 0.35;
      }

      candidates.push({ idx: cIdx, w });
    }

    const pickedIdx = pickWeightedIdx(candidates);
    lastMove = pickedIdx - prevIdx;
    indices.push(pickedIdx);
  }

  // Sicherstellen, dass nicht alle Töne identisch sind
  if (pool.length > 1 && indices.every(idx => idx === indices[0])) {
    indices[count - 1] = indices[0] > 0 ? indices[0] - 1 : 1;
  }

  // Mehr-Oktav-Modus: zusammenhängende Register-Abschnitte statt wildem Zickzack
  const octaveShifts = new Array(count).fill(0);
  if (isMultiOctave) {
    const regChoices = [-12, 0, 12];
    let curShift = regChoices[Math.floor(Math.random() * regChoices.length)];
    for (let i = 0; i < count; i++) {
      const valid = getValidOctaveShifts(rootMidi + pool[indices[i]].semitones);
      if (!valid.includes(curShift)) {
        curShift = valid.includes(0) ? 0 : valid[0];
      }
      // Optionale Register-Verlagerung an einer Phrasenmitte / Auftaktstelle
      if (i === Math.floor(count / 2) && Math.random() < 0.72) {
        const alt = valid.filter(s => s !== curShift);
        if (alt.length > 0) curShift = alt[Math.floor(Math.random() * alt.length)];
      }
      octaveShifts[i] = curShift;
    }
    if (octaveShifts.every(s => s === 0)) {
      const idx = Math.floor(Math.random() * count);
      const nonZero = getValidOctaveShifts(rootMidi + pool[indices[idx]].semitones).filter(s => s !== 0);
      if (nonZero.length > 0) {
        octaveShifts[idx] = nonZero[Math.floor(Math.random() * nonZero.length)];
      }
    }
  }

  return indices.map((poolIdx, i) => ({
    step: pool[poolIdx],
    octaveShift: octaveShifts[i]
  }));
}

function buildContextCadenceBars(rootMidi) {
  return ["I", "vi", "IV", "V"].map(degKey => {
    const def = getLocalizedDegreeDef(degKey);
    const n = buildChordNotes(rootMidi, def);
    return {
      key: degKey,
      symbol: def.roman,
      label: def.label,
      short: def.short,
      notes: n.chordNotes,
      bass: n.bassNote
    };
  });
}

function getValidOctaveShifts(keyboardMidi, minMidi = 45, maxMidi = 84) {
  return [-12, 0, 12].filter(shift => {
    const m = keyboardMidi + shift;
    return m >= minMidi && m <= maxMidi;
  });
}

function midiToNote(midi) {
  const octave = Math.floor(midi / 12) - 1;
  const name = NOTE_NAMES[((midi % 12) + 12) % 12];
  return `${name}${octave}`;
}

const GERMAN_SHARP_NAMES = ["C", "Cis", "D", "Dis", "E", "F", "Fis", "G", "Gis", "A", "B", "H"];
const GERMAN_FLAT_NAMES  = ["C", "Des", "D", "Es",  "E", "F", "Ges", "G", "As",  "A", "B", "H"];
const INTL_SHARP_NAMES   = ["C", "C#",  "D", "D#",  "E", "F", "F#",  "G", "G#",  "A", "A#", "B"];
const INTL_FLAT_NAMES    = ["C", "Db",  "D", "Eb",  "E", "F", "Gb",  "G", "Ab",  "A", "Bb", "B"];
const FLAT_KEYS = new Set(["F", "Bb", "Eb", "Ab", "Db"]);
const MINOR_INTERVAL_KEYS = new Set(["m2", "m3", "m6", "m7", "m9"]);

function midiToGermanNote(midi, preferFlat = false) {
  const octave = Math.floor(midi / 12) - 1;
  const pc = ((midi % 12) + 12) % 12;
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  const names = useIntl
    ? (preferFlat ? INTL_FLAT_NAMES : INTL_SHARP_NAMES)
    : (preferFlat ? GERMAN_FLAT_NAMES : GERMAN_SHARP_NAMES);
  return `${names[pc]}${octave}`;
}

const HARMONIC_DATA = {
  roots: {
    "C":  { midi: 60, name: "C-Dur" },
    "G":  { midi: 67, name: "G-Dur" },
    "D":  { midi: 62, name: "D-Dur" },
    "F":  { midi: 65, name: "F-Dur" },
    "Bb": { midi: 58, name: "B-Dur" },
    "Eb": { midi: 63, name: "Es-Dur" },
    "Ab": { midi: 56, name: "As-Dur" },
    "A":  { midi: 57, name: "A-Dur" },
    "E":  { midi: 64, name: "E-Dur" },
    "B":  { midi: 59, name: "H-Dur" },
    "F#": { midi: 66, name: "Fis-Dur" },
    "Db": { midi: 61, name: "Des-Dur" }
  },

  degrees: {
    "I":     { roman: "I",     label: "Tonika",           short: "Tonika",     semitones: 0,  type: "maj",  bassOffset: 0 },
    "I7":    { roman: "I7",    label: "Tonika-Dom.7",     short: "I7",         semitones: 0,  type: "dom7", bassOffset: 0 },
    "Imaj7": { roman: "Imaj7", label: "Tonika-Maj7",      short: "Imaj7",      semitones: 0,  type: "maj7", bassOffset: 0 },
    "ii":    { roman: "ii",    label: "Moll-Subdom.",     short: "ii (Moll)",  semitones: 2,  type: "min",  bassOffset: 2 },
    "iii":   { roman: "iii",   label: "Moll-Mediante",    short: "iii (Moll)", semitones: 4,  type: "min",  bassOffset: 4 },
    "III7":  { roman: "III7",  label: "Zwischendom. III", short: "III7",       semitones: 4,  type: "dom7", bassOffset: 4 },
    "IV":    { roman: "IV",    label: "Subdominante",     short: "Subdom.",    semitones: 5,  type: "maj",  bassOffset: 5 },
    "IV7":   { roman: "IV7",   label: "Subdom.-Dom.7",    short: "IV7",        semitones: 5,  type: "dom7", bassOffset: 5 },
    "iv":    { roman: "iv",    label: "Moll-Subdom.",     short: "iv (Moll)",  semitones: 5,  type: "min",  bassOffset: 5 },
    "V":     { roman: "V",     label: "Dominante",        short: "Dominante",  semitones: 7,  type: "maj",  bassOffset: 7 },
    "V7":    { roman: "V7",    label: "Dominant-7",       short: "Dom. 7",     semitones: 7,  type: "dom7", bassOffset: 7 },
    "Vsus4": { roman: "Vsus4", label: "Dom.-Vorhalt",     short: "Vsus4",      semitones: 7,  type: "sus4", bassOffset: 7 },
    "vi":    { roman: "vi",    label: "Moll-Parallele",   short: "Moll-Par.",  semitones: 9,  type: "min",  bassOffset: 9 },
    "bVI":   { roman: "bVI",   label: "Modal-bVI",        short: "bVI",        semitones: 8,  type: "maj",  bassOffset: 8 },
    "bVII":  { roman: "bVII",  label: "Modal-bVII",       short: "bVII",       semitones: 10, type: "maj",  bassOffset: 10 },
    "V/V":   { roman: "V/V",   label: "Doppeldom.",       short: "V/V",        semitones: 2,  type: "maj",  bassOffset: 2 },
    "bII7":  { roman: "bII7",  label: "Tritonussub.",     short: "bII7 (Sub)", semitones: 1,  type: "dom7", bassOffset: 1 }
  },

  intervals: {
    "P1": { symbol: "P1", label: "Reine Prime",     short: "Prime",     semitones: 0 },
    "m2": { symbol: "m2", label: "Kleine Sekunde",  short: "kl. Sek.",  semitones: 1 },
    "M2": { symbol: "M2", label: "Große Sekunde",   short: "gr. Sek.",  semitones: 2 },
    "m3": { symbol: "m3", label: "Kleine Terz",     short: "kl. Terz",  semitones: 3 },
    "M3": { symbol: "M3", label: "Große Terz",      short: "gr. Terz",  semitones: 4 },
    "P4": { symbol: "P4", label: "Reine Quarte",    short: "Quarte",    semitones: 5 },
    "TT": { symbol: "TT", label: "Tritonus",        short: "Tritonus",  semitones: 6 },
    "P5": { symbol: "P5", label: "Reine Quinte",    short: "Quinte",    semitones: 7 },
    "m6": { symbol: "m6", label: "Kleine Sexte",    short: "kl. Sexte", semitones: 8 },
    "M6": { symbol: "M6", label: "Große Sexte",     short: "gr. Sexte", semitones: 9 },
    "m7": { symbol: "m7", label: "Kleine Septime",  short: "kl. Sept.", semitones: 10 },
    "M7": { symbol: "M7", label: "Große Septime",   short: "gr. Sept.", semitones: 11 },
    "P8": { symbol: "P8", label: "Reine Oktave",    short: "Oktave",    semitones: 12 },
    "m9": { symbol: "m9", label: "Kleine None",     short: "kl. None",  semitones: 13 },
    "M9": { symbol: "M9", label: "Große None",      short: "gr. None",  semitones: 14 }
  },

  chords: {
    "maj":   { symbol: "maj",     label: "Dur-Dreiklang (1–3–5)",         short: "Dur",        offsets: [0, 4, 7] },
    "min":   { symbol: "m",       label: "Moll-Dreiklang (1–♭3–5)",       short: "Moll",       offsets: [0, 3, 7] },
    "dim":   { symbol: "dim",     label: "Verminderter Dreiklang (1–♭3–♭5)", short: "Vermindert", offsets: [0, 3, 6] },
    "aug":   { symbol: "aug",     label: "Übermäßiger Dreiklang (1–3–♯5)", short: "Übermäßig", offsets: [0, 4, 8] },
    "sus4":  { symbol: "sus4",    label: "Quartvorhalt (1–4–5)",          short: "Vorhalt",    offsets: [0, 5, 7] },
    "7":     { symbol: "7",       label: "Dominantseptakkord (1–3–5–♭7)", short: "Dom. 7",     offsets: [0, 4, 7, 10] },
    "maj7":  { symbol: "maj7",    label: "Großer Septakkord (1–3–5–7)",   short: "Major 7",    offsets: [0, 4, 7, 11] },
    "m7":    { symbol: "m7",      label: "Moll-Septakkord (1–♭3–5–♭7)",   short: "Moll 7",     offsets: [0, 3, 7, 10] },
    "sus2":  { symbol: "sus2",    label: "Sekundvorhalt (1–2–5)",         short: "Sus 2",      offsets: [0, 2, 7] },
    "m7b5":  { symbol: "m7♭5",    label: "Halbvermindert (1–♭3–♭5–♭7)",   short: "Halbverm.",  offsets: [0, 3, 6, 10] },
    "dim7":  { symbol: "°7",      label: "Vollvermindert (1–♭3–♭5–♭♭7)",  short: "Vollverm.",  offsets: [0, 3, 6, 9] },
    "mMaj7": { symbol: "m(maj7)", label: "Moll-Major-7 (1–♭3–5–7)",       short: "Moll-Maj7",  offsets: [0, 3, 7, 11] },
    "maj9":  { symbol: "maj9",    label: "Major-9 (1–3–5–7–9)",           short: "Major 9",    offsets: [0, 4, 7, 11, 14] },
    "7b9":   { symbol: "7♭9",     label: "Dominant-7♭9 (1–3–5–♭7–♭9)",   short: "Dom. 7♭9",   offsets: [0, 4, 7, 10, 13] },
    "7s9":   { symbol: "7♯9",     label: "Dominant-7♯9 (1–3–5–♭7–♯9)",   short: "Jazz 7♯9",   offsets: [0, 4, 7, 10, 15] }
  },

  chordInversions: {
    "inv0": { symbol: "Bass: 1", label: "Grundstellung (Grundton im Bass)", short: "Grundstellung", stepIndex: 0 },
    "inv1": { symbol: "Bass: 3", label: "1. Umkehrung (Terz im Bass)",      short: "1. Umkehrung",  stepIndex: 1 },
    "inv2": { symbol: "Bass: 5", label: "2. Umkehrung (Quinte im Bass)",    short: "2. Umkehrung",  stepIndex: 2 },
    "inv3": { symbol: "Bass: 7", label: "3. Umkehrung (Septime im Bass)",   short: "3. Umkehrung",  stepIndex: 3 }
  },

  // Solfège-Stufen für C-Dur (inklusive Auflösungsweg zur Tonika)
  solfegeScale: [
    { key: "Do_low",  syllable: "Do",  label: "Grundton (Do)",        midi: 60, semitones: 0,  resolveMidis: [60] },
    { key: "Re",      syllable: "Re",  label: "2. Stufe (Re → Do)",   midi: 62, semitones: 2,  resolveMidis: [62, 60] },
    { key: "Mi",      syllable: "Mi",  label: "3. Stufe (Mi → Do)",   midi: 64, semitones: 4,  resolveMidis: [64, 62, 60] },
    { key: "Fa",      syllable: "Fa",  label: "4. Stufe (Fa → Do)",   midi: 65, semitones: 5,  resolveMidis: [65, 64, 62, 60] },
    { key: "Sol",     syllable: "Sol", label: "5. Stufe (Sol → Do)",  midi: 67, semitones: 7,  resolveMidis: [67, 69, 71, 72] },
    { key: "La",      syllable: "La",  label: "6. Stufe (La → Do)",   midi: 69, semitones: 9,  resolveMidis: [69, 71, 72] },
    { key: "Ti",      syllable: "Ti",  label: "7. Stufe (Ti → Do)",   midi: 71, semitones: 11, resolveMidis: [71, 72] },
    { key: "Do_high", syllable: "Do",  label: "Obere Tonika (Do)",    midi: 72, semitones: 12, resolveMidis: [72] }
  ]
};

function buildChordNotes(rootMidi, degreeDef) {
  const rootNote = rootMidi + degreeDef.semitones;
  let offsets = [0, 4, 7];
  if (degreeDef.type === "min") offsets = [0, 3, 7];
  if (degreeDef.type === "dom7") offsets = [0, 4, 7, 10];
  if (degreeDef.type === "maj7") offsets = [0, 4, 7, 11];
  if (degreeDef.type === "sus4") offsets = [0, 5, 7];
  if (degreeDef.type === "dim") offsets = [0, 3, 6];

  const chordNotes = offsets.map(s => midiToNote(rootNote + s));
  const bassNote = midiToNote(rootMidi - 12 + degreeDef.bassOffset);
  return { chordNotes, bassNote };
}

const CHORD_LEVEL_POOLS = {
  1: ["maj", "min", "dim", "aug"],
  2: ["maj", "min", "dim", "aug", "sus4", "7", "maj7", "m7"],
  3: ["maj", "min", "dim", "aug", "sus4", "7", "maj7", "m7", "sus2", "m7b5", "dim7", "mMaj7"],
  4: ["maj", "min", "dim", "aug", "sus4", "7", "maj7", "m7", "sus2", "m7b5", "dim7", "mMaj7", "maj9", "7b9", "7s9"]
};

const CHORD_FLAT_SEMITONES = new Set([1, 3, 6, 10, 13]);
const CHORD_SHARP_SEMITONES = new Set([8, 15]);

function formatChordMidiNoteList(midis, rootMidi, rootKey) {
  const keyPreferFlat = FLAT_KEYS.has(rootKey);
  return midis.map(m => {
    const semi = ((m - rootMidi) % 12 + 12) % 12;
    let useFlat = keyPreferFlat;
    if (CHORD_SHARP_SEMITONES.has(semi)) useFlat = false;
    else if (CHORD_FLAT_SEMITONES.has(semi)) useFlat = true;
    return midiToGermanNote(m, useFlat);
  });
}

function formatChordGermanNotes(rootMidi, offsets, rootKey) {
  return formatChordMidiNoteList(offsets.map(semi => rootMidi + semi), rootMidi, rootKey).join(" · ");
}

const CHORD_INVERSION_LEVELS = {
  1: { chordKeys: ["maj"],             choices: ["inv0", "inv1", "inv2"] },
  2: { chordKeys: ["maj", "min"],      choices: ["inv0", "inv1", "inv2"] },
  3: { chordKeys: ["7", "maj7", "m7"], choices: ["inv0", "inv1", "inv2", "inv3"] }
};

function isChordArpeggioMode(mode) {
  return mode === "chord-arp-up" || mode === "chord-arp-down";
}

function isChordQualityMode(mode) {
  return mode === "interval-chords" || isChordArpeggioMode(mode);
}

function isChordMode(mode) {
  return isChordQualityMode(mode) || mode === "chord-inversions";
}

function formatInversionChordTitle(rootMidi, rootKey, chordKey, bassMidi, inversionStep) {
  const keyPreferFlat = FLAT_KEYS.has(rootKey);
  const rootName = midiToGermanNote(rootMidi, keyPreferFlat).replace(/[0-9]/g, "");
  const suffixMap = { maj: "", min: "m", "7": "7", maj7: "maj7", m7: "m7" };
  const suffix = Object.prototype.hasOwnProperty.call(suffixMap, chordKey) ? suffixMap[chordKey] : chordKey;
  if (inversionStep === 0) return `${rootName}${suffix}`;
  const bassSemi = ((bassMidi - rootMidi) % 12 + 12) % 12;
  let bassUseFlat = keyPreferFlat;
  if (CHORD_SHARP_SEMITONES.has(bassSemi)) bassUseFlat = false;
  else if (CHORD_FLAT_SEMITONES.has(bassSemi)) bassUseFlat = true;
  const bassName = midiToGermanNote(bassMidi, bassUseFlat).replace(/[0-9]/g, "");
  return `${rootName}${suffix}/${bassName}`;
}

function buildChordInversionNotes(rootMidi, chordKey, inversionStep, rootKey = "C") {
  const chordDef = HARMONIC_DATA.chords[chordKey] || HARMONIC_DATA.chords["maj"];
  const baseOffsets = chordDef.offsets;
  const len = baseOffsets.length;
  const step = ((inversionStep % len) + len) % len;
  const rotatedOffsets = [
    ...baseOffsets.slice(step),
    ...baseOffsets.slice(0, step).map(o => o + 12)
  ];
  let midis = rotatedOffsets.map(o => rootMidi + o);
  while (midis[0] > 63) midis = midis.map(m => m - 12);
  while (midis[0] < 52) midis = midis.map(m => m + 12);
  const bassMidi = midis[0];
  return {
    midis,
    bassMidi,
    bassNote: midiToNote(bassMidi),
    notes: midis.map(m => midiToNote(m)),
    noteDisplay: formatChordMidiNoteList(midis, rootMidi, rootKey).join(" · "),
    slashTitle: formatInversionChordTitle(rootMidi, rootKey, chordKey, bassMidi, step)
  };
}

const RHYTHM_METERS = {
  "4/4": { key: "4/4", symbol: "4/4", roman: "4/4", short: "4er-Takt",    label: "4/4-Takt (4 Viertel)",     stepUnit: "quarter", beats: 4 },
  "3/4": { key: "3/4", symbol: "3/4", roman: "3/4", short: "3er-Walzer",  label: "3/4-Takt (Walzer)",        stepUnit: "quarter", beats: 3 },
  "2/4": { key: "2/4", symbol: "2/4", roman: "2/4", short: "2er-Marsch",  label: "2/4-Takt (Marsch)",        stepUnit: "quarter", beats: 2 },
  "6/8": { key: "6/8", symbol: "6/8", roman: "6/8", short: "Wiegetakt",   label: "6/8-Takt (2×3 Achtel)",    stepUnit: "eighth",  beats: 6 },
  "5/4": { key: "5/4", symbol: "5/4", roman: "5/4", short: "3 + 2 Takt",  label: "5/4-Takt (Ungerade 3+2)",  stepUnit: "quarter", beats: 5 },
  "7/8": { key: "7/8", symbol: "7/8", roman: "7/8", short: "2+2+3 Takt",  label: "7/8-Takt (Ungerade 7/8)",  stepUnit: "eighth",  beats: 7 }
};

const RHYTHM_METER_LEVELS = {
  1: ["4/4", "3/4"],
  2: ["2/4", "3/4", "4/4", "6/8"],
  3: ["4/4", "3/4", "6/8", "5/4", "7/8"]
};

function getRhythmMeterTiming(meterKey, bpm) {
  const def = RHYTHM_METERS[meterKey] || RHYTHM_METERS["4/4"];
  const beatMs = 60000 / bpm;
  const stepMs = def.stepUnit === "eighth" ? beatMs * 0.52 : beatMs;
  const barMs = def.beats * stepMs;
  return { def, stepMs, barMs };
}

function buildRhythmMeterEvents(meterKey, bpm, barsCount = 2, accentOnly = false) {
  const { def, stepMs, barMs } = getRhythmMeterTiming(meterKey, bpm);
  const events = [];

  for (let bar = 0; bar < barsCount; bar++) {
    const barOffset = bar * barMs;
    for (let b = 0; b < def.beats; b++) {
      const t = Math.round(barOffset + b * stepMs);
      if (b === 0) {
        events.push([t, accentOnly ? "accent" : "kick", 0.95]);
        if (!accentOnly) events.push([t, "accent", 0.85]);
      } else if (accentOnly) {
        events.push([t, "tick", 0.55]);
      } else if (meterKey === "4/4") {
        if (b === 2) events.push([t, "snare", 0.72]);
        events.push([t, b === 2 ? "tick" : "hat", b === 2 ? 0.65 : 0.72]);
      } else if (meterKey === "3/4") {
        events.push([t, "hat", 0.68], [t, "tick", 0.58]);
      } else if (meterKey === "2/4") {
        events.push([t, "snare", 0.74], [t, "tick", 0.62]);
      } else if (meterKey === "6/8") {
        if (b === 3) {
          events.push([t, "snare", 0.68], [t, "tick", 0.7]);
        } else {
          events.push([t, "hat", 0.56]);
        }
      } else if (meterKey === "5/4") {
        if (b === 3) {
          events.push([t, "snare", 0.74], [t, "tick", 0.68]);
        } else {
          events.push([t, "hat", 0.62], [t, "tick", 0.52]);
        }
      } else if (meterKey === "7/8") {
        if (b === 2) events.push([t, "snare", 0.7]);
        else if (b === 4) events.push([t, "tick", 0.78]);
        else events.push([t, "hat", 0.56]);
      }
    }
  }
  return { events, barMs, totalMs: barsCount * barMs };
}

const RHYTHM_DICTATION_CELLS = {
  quarter:          { key: "quarter",          symbol: "♩",     short: "Viertel",       label: "Viertelnote (1 Schlag)",            offsets: [0] },
  eighth2:          { key: "eighth2",          symbol: "♫",     short: "2 Achtel",      label: "Achtelpaar (1-und)",                offsets: [0, 0.5] },
  rest:             { key: "rest",             symbol: "Pause", short: "Pause",         label: "Viertelpause (Stille)",             offsets: [] },
  offbeat:          { key: "offbeat",          symbol: "und",   short: "Offbeat",       label: "Achtelpause + Achtel („und“)",      offsets: [0.5] },
  triplet:          { key: "triplet",          symbol: "3×♪",   short: "Triole",        label: "Achteltriole (3 gleichmäßige)",     offsets: [0, 1 / 3, 2 / 3] },
  eighths16:        { key: "eighths16",        symbol: "♪♬",   short: "Lang-k-k",      label: "Achtel + zwei Sechzehntel",         offsets: [0, 0.5, 0.75] },
  sixteenths8:      { key: "sixteenths8",      symbol: "♬♪",   short: "K-k-lang",      label: "Zwei Sechzehntel + Achtel",         offsets: [0, 0.25, 0.5] },
  sixteenth4:       { key: "sixteenth4",       symbol: "♬",     short: "4×16tel",       label: "Vier Sechzehntel",                  offsets: [0, 0.25, 0.5, 0.75] },
  dotEighth16:      { key: "dotEighth16",      symbol: "♩.♬",  short: "Lang–kurz",     label: "Punktierte Achtel + Sechzehntel",   offsets: [0, 0.75] },
  sixteenDotEighth: { key: "sixteenDotEighth", symbol: "♬♩.",  short: "Kurz–lang",     label: "Sechzehntel + punktierte Achtel",   offsets: [0, 0.25] },
  sync16:           { key: "sync16",           symbol: "Synk.", short: "16.-Synkope",   label: "16tel-Pause + 16tel-Synkopen",      offsets: [0.25, 0.75] }
};

const RHYTHM_DICTATION_LEVELS = {
  1: ["quarter", "eighth2", "rest"],
  2: ["quarter", "eighth2", "rest", "offbeat", "triplet"],
  3: ["quarter", "eighth2", "rest", "triplet", "eighths16", "sixteenths8", "sixteenth4"],
  4: ["quarter", "eighth2", "rest", "offbeat", "triplet", "dotEighth16", "sixteenDotEighth", "sync16"]
};

const RHYTHM_TAP_LEVELS = {
  1: { label: "Puls-Anker",        toleranceMs: 115, meters: ["4/4"],       cells: ["quarter", "rest"],                               blind: false },
  2: { label: "Achtel & 3/4",      toleranceMs: 90,  meters: ["4/4", "3/4"], cells: ["quarter", "rest", "eighth2"],                   blind: false },
  3: { label: "Synkopen & Triolen", toleranceMs: 70, meters: ["4/4"],       cells: ["quarter", "rest", "eighth2", "offbeat", "triplet"], blind: false },
  4: { label: "Blindflug",         toleranceMs: 80,  meters: ["4/4"],       cells: ["quarter", "rest", "eighth2", "offbeat"],          blind: true  }
};

function getRhythmCellSVG(cellKey, width = 44, height = 26) {
  const head = (cx, cy = 21) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="3.4" ry="2.4" transform="rotate(-18 ${cx} ${cy})" fill="currentColor"/>`;
  const stem = (x, yBottom = 20.5, yTop = 5.5) =>
    `<line x1="${x}" y1="${yBottom}" x2="${x}" y2="${yTop}" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`;
  const quarterRestPath = (ox = 0, scale = 1) =>
    `<g transform="translate(${ox},0) scale(${scale})">
      <path d="M22 5.5 L26.5 10.5 L21.5 14.5 L26.5 19.5 C23 19.5 21 21.5 23.5 24" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </g>`;

  let body = "";
  switch (cellKey) {
    case "quarter":
      body = head(22) + stem(24.9);
      break;
    case "rest":
      body = quarterRestPath(0, 1);
      break;
    case "eighth2":
      body = head(14) + stem(16.9) + head(31) + stem(33.9) +
        `<line x1="16.9" y1="5.5" x2="33.9" y2="5.5" stroke="currentColor" stroke-width="3" stroke-linecap="butt"/>`;
      break;
    case "offbeat":
      body = `<circle cx="13" cy="11" r="1.8" fill="currentColor"/>
        <path d="M13 12.2 C16 12.8 18 11.2 19 10 L14.8 22.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" fill="none"/>` +
        head(30) + stem(32.9) +
        `<path d="M32.9 5.5 C36.5 7.5 37.5 10.5 35.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`;
      break;
    case "triplet":
      body = `<text x="24" y="7.5" text-anchor="middle" fill="currentColor" font-size="8.5" font-weight="900" font-family="sans-serif">3</text>` +
        head(10, 22) + stem(12.6, 21.5, 10) +
        head(22, 22) + stem(24.6, 21.5, 10) +
        head(34, 22) + stem(36.6, 21.5, 10) +
        `<line x1="12.6" y1="10" x2="36.6" y2="10" stroke="currentColor" stroke-width="2.8" stroke-linecap="butt"/>`;
      break;
    case "eighths16":
      body = head(9.5) + stem(12.1) + head(23.5) + stem(26.1) + head(35) + stem(37.6) +
        `<line x1="12.1" y1="5.5" x2="37.6" y2="5.5" stroke="currentColor" stroke-width="2.8"/>` +
        `<line x1="26.1" y1="10" x2="37.6" y2="10" stroke="currentColor" stroke-width="2.4"/>`;
      break;
    case "sixteenths8":
      body = head(9.5) + stem(12.1) + head(21) + stem(23.6) + head(35) + stem(37.6) +
        `<line x1="12.1" y1="5.5" x2="37.6" y2="5.5" stroke="currentColor" stroke-width="2.8"/>` +
        `<line x1="12.1" y1="10" x2="23.6" y2="10" stroke="currentColor" stroke-width="2.4"/>`;
      break;
    case "sixteenth4":
      body = head(8) + stem(10.5) + head(18) + stem(20.5) + head(28) + stem(30.5) + head(38) + stem(40.5) +
        `<line x1="10.5" y1="5.5" x2="40.5" y2="5.5" stroke="currentColor" stroke-width="2.8"/>` +
        `<line x1="10.5" y1="9.8" x2="40.5" y2="9.8" stroke="currentColor" stroke-width="2.4"/>`;
      break;
    case "dotEighth16":
      body = head(11.5) + stem(14.3) + `<circle cx="18.2" cy="21" r="1.6" fill="currentColor"/>` +
        head(33.5) + stem(36.3) +
        `<line x1="14.3" y1="5.5" x2="36.3" y2="5.5" stroke="currentColor" stroke-width="2.8"/>` +
        `<line x1="29.5" y1="10" x2="36.3" y2="10" stroke="currentColor" stroke-width="2.4"/>`;
      break;
    case "sixteenDotEighth":
      body = head(11) + stem(13.8) + head(28.5) + stem(31.3) + `<circle cx="35.6" cy="21" r="1.6" fill="currentColor"/>` +
        `<line x1="13.8" y1="5.5" x2="31.3" y2="5.5" stroke="currentColor" stroke-width="2.8"/>` +
        `<line x1="13.8" y1="10" x2="20.6" y2="10" stroke="currentColor" stroke-width="2.4"/>`;
      break;
    case "sync16":
      body = `<circle cx="10.5" cy="11" r="1.5" fill="currentColor"/>
        <circle cx="9.2" cy="15.5" r="1.5" fill="currentColor"/>
        <path d="M10.5 11.5 C13 12 14.5 10.8 15.2 9.8 L11.5 22.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/>` +
        head(22.5) + stem(25.2) + head(36) + stem(38.7) +
        `<line x1="25.2" y1="5.5" x2="38.7" y2="5.5" stroke="currentColor" stroke-width="2.8"/>`;
      break;
    default:
      body = head(22) + stem(24.9);
  }

  return `<svg class="rhythm-glyph-svg" width="${width}" height="${height}" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
}

const RHYTHM_GROOVE_STYLES = {
  march:       { key: "march",       symbol: "1 & 3",  roman: "Marsch",   short: "Betonung 1 & 3",     label: "Marsch (Snare auf 1 & 3)" },
  backbeat:    { key: "backbeat",    symbol: "2 & 4",  roman: "Backbeat", short: "Pop/Rock 2 & 4",     label: "Backbeat (Snare auf 2 & 4)" },
  syncopation: { key: "syncopation", symbol: "Off",    roman: "Synkope",  short: "Betonte „und“",      label: "Synkopen-Groove (Offbeats)" },
  swing:       { key: "swing",       symbol: "Swing",  roman: "Swing",    short: "Federnde Triole",    label: "Swing / Shuffle (triolisch)" },
  poly32:      { key: "poly32",      symbol: "3 : 2",  roman: "3 vs. 2",  short: "Polyrhythmus",       label: "Polyrhythmik (3 gegen 2)" }
};

const RHYTHM_OFFBEAT_POSITIONS = {
  "1":  { key: "1",  symbol: "1",   roman: "1",     short: "Onbeat 1",   label: "Schlag 1 (Onbeat)",     beatPos: 0 },
  "1+": { key: "1+", symbol: "1+",  roman: "1-und", short: "Offbeat",    label: "1-und (Offbeat)",       beatPos: 0.5 },
  "2":  { key: "2",  symbol: "2",   roman: "2",     short: "Onbeat 2",   label: "Schlag 2 (Onbeat)",     beatPos: 1 },
  "2+": { key: "2+", symbol: "2+",  roman: "2-und", short: "Offbeat",    label: "2-und (Offbeat)",       beatPos: 1.5 },
  "3":  { key: "3",  symbol: "3",   roman: "3",     short: "Onbeat 3",   label: "Schlag 3 (Onbeat)",     beatPos: 2 },
  "3+": { key: "3+", symbol: "3+",  roman: "3-und", short: "Offbeat",    label: "3-und (Offbeat)",       beatPos: 2.5 },
  "4":  { key: "4",  symbol: "4",   roman: "4",     short: "Onbeat 4",   label: "Schlag 4 (Onbeat)",     beatPos: 3 },
  "4+": { key: "4+", symbol: "4+",  roman: "4-und", short: "Offbeat",    label: "4-und (Offbeat)",       beatPos: 3.5 }
};

const RHYTHM_MICRO_TIMING_OPTIONS = {
  early:  { key: "early",  symbol: "↖", roman: "↖ Früh",  short: "Treibend",      label: "Zu früh (treibend vor dem Beat)" },
  pocket: { key: "pocket", symbol: "◎", roman: "◎ Exakt", short: "In the Pocket", label: "Exakt auf dem Beat („In the Pocket“)" },
  late:   { key: "late",   symbol: "↘", roman: "↘ Spät",  short: "Laid-back",     label: "Zu spät (zurückgelehnt / laid-back)" }
};

function buildRhythmGrooveEvents(ex, overrideKey = null, bpm = 90) {
  const beatMs = 60000 / bpm;
  const events = [];
  const subMode = ex.grooveKind; // 'style' | 'offbeat' | 'micro'
  const key = overrideKey || ex.targetItem.key;

  if (subMode === "style") {
    for (let bar = 0; bar < 2; bar++) {
      const bo = bar * 4 * beatMs;
      if (key === "march") {
        for (let b = 0; b < 4; b++) {
          events.push([Math.round(bo + b * beatMs), "hat", 0.5]);
          if (b === 0 || b === 2) events.push([Math.round(bo + b * beatMs), "snare", 0.85], [Math.round(bo + b * beatMs), "kick", 0.85]);
          else events.push([Math.round(bo + b * beatMs), "tick", 0.45]);
        }
      } else if (key === "backbeat") {
        for (let b = 0; b < 4; b++) {
          events.push([Math.round(bo + b * beatMs), "hat", 0.55]);
          events.push([Math.round(bo + (b + 0.5) * beatMs), "hat", 0.4]);
          if (b === 0 || b === 2) events.push([Math.round(bo + b * beatMs), "kick", 0.9]);
          else events.push([Math.round(bo + b * beatMs), "snare", 0.88]);
        }
      } else if (key === "syncopation") {
        for (let b = 0; b < 4; b++) {
          events.push([Math.round(bo + b * beatMs), b % 2 === 0 ? "kick" : "hat", 0.55]);
          events.push([Math.round(bo + (b + 0.5) * beatMs), "clave", 0.92]);
          if (b === 1 || b === 3) events.push([Math.round(bo + (b + 0.5) * beatMs), "snare", 0.72]);
        }
      } else if (key === "swing") {
        for (let b = 0; b < 4; b++) {
          events.push([Math.round(bo + b * beatMs), "hat", 0.78]);
          events.push([Math.round(bo + (b + 2 / 3) * beatMs), "hat", 0.58]);
          if (b === 0 || b === 2) events.push([Math.round(bo + b * beatMs), "kick", 0.82]);
          else events.push([Math.round(bo + b * beatMs), "snare", 0.68]);
        }
      } else if (key === "poly32") {
        // Pro Halbtakt (2 Beats): 2 Kicks vs 3 Claves
        for (let half = 0; half < 2; half++) {
          const ho = bo + half * 2 * beatMs;
          events.push([Math.round(ho), "kick", 0.9]);
          events.push([Math.round(ho + beatMs), "kick", 0.85]);
          events.push([Math.round(ho), "clave", 0.92]);
          events.push([Math.round(ho + (2 / 3) * beatMs), "clave", 0.85]);
          events.push([Math.round(ho + (4 / 3) * beatMs), "clave", 0.85]);
        }
      }
    }
    return { events, totalMs: 8 * beatMs, barMs: 4 * beatMs };
  }

  if (subMode === "offbeat") {
    const posDef = RHYTHM_OFFBEAT_POSITIONS[key] || RHYTHM_OFFBEAT_POSITIONS["1+"];
    // Takt 1 etabliert 1-2-3-4 Puls, Takt 2 spielt Groove + Cowbell-Akzent an Zielposition
    for (let bar = 0; bar < 2; bar++) {
      const bo = bar * 4 * beatMs;
      for (let b = 0; b < 4; b++) {
        events.push([Math.round(bo + b * beatMs), b % 2 === 0 ? "kick" : "hat", 0.6]);
        events.push([Math.round(bo + (b + 0.5) * beatMs), "hat", 0.32]);
        if (bar === 0 && b === 0) events.push([Math.round(bo), "accent", 0.55]);
      }
    }
    const targetMs = Math.round(4 * beatMs + posDef.beatPos * beatMs);
    events.push([targetMs, "cowbell", 1.0], [targetMs, "clave", 0.9]);
    return { events, totalMs: 8 * beatMs, barMs: 4 * beatMs };
  }

  // subMode === "micro" (Stufe 3 & 4)
  const sign = key === "early" ? -1 : (key === "late" ? 1 : 0);
  const mag = overrideKey ? (ex.microMagMs || 56) : ex.microMagMs;
  const shiftMs = sign * mag;

  for (let bar = 0; bar < 2; bar++) {
    const bo = bar * 4 * beatMs;
    for (let b = 0; b < 4; b++) {
      const t = bo + b * beatMs;
      events.push([Math.round(t), "hat", 0.45]);
      events.push([Math.round(t + 0.5 * beatMs), "hat", 0.34]);
      if (b === 0 || b === 2) {
        events.push([Math.round(t), "kick", 0.9]);
      } else {
        events.push([Math.round(Math.max(10, t + shiftMs)), "snare", 0.92]);
      }
    }
  }
  return { events, totalMs: 8 * beatMs, barMs: 4 * beatMs };
}

/**
 * Bewertet angetippte Zeitpunkte (ms relativ zum Start der Spieler-Zählzeit) gegen erwartete Zielzeitpunkte.
 * Nutzt Minimum-Distance-Matching, damit ein leicht verschobener Schlag keine Nachbarn verdrängt.
 */
function evaluateRhythmTaps(expectedEvents, actualTapsMs, toleranceMs) {
  const maxWindow = toleranceMs * 1.35;
  const exactWindow = toleranceMs * 0.65;
  const pairs = [];

  expectedEvents.forEach((ev, expIdx) => {
    actualTapsMs.forEach((tapMs, tapIdx) => {
      const diff = tapMs - ev.relMs;
      const absDiff = Math.abs(diff);
      if (absDiff <= maxWindow) {
        pairs.push({ expIdx, tapIdx, diff, absDiff });
      }
    });
  });

  pairs.sort((a, b) => a.absDiff - b.absDiff);

  const usedExp = new Set();
  const usedTaps = new Set();
  const expResults = expectedEvents.map(ev => ({
    ...ev,
    status: "missed",
    diffMs: null
  }));

  pairs.forEach(p => {
    if (usedExp.has(p.expIdx) || usedTaps.has(p.tapIdx)) return;
    usedExp.add(p.expIdx);
    usedTaps.add(p.tapIdx);
    expResults[p.expIdx].status = p.absDiff <= exactWindow ? "exact" : "close";
    expResults[p.expIdx].diffMs = Math.round(p.diff);
  });

  const extraTapsMs = actualTapsMs.filter((_, idx) => !usedTaps.has(idx));
  const exactCount = expResults.filter(r => r.status === "exact").length;
  const closeCount = expResults.filter(r => r.status === "close").length;
  const missedCount = expResults.filter(r => r.status === "missed").length;
  const extraCount = extraTapsMs.length;
  const matchedDiffs = expResults.filter(r => r.diffMs !== null).map(r => r.diffMs);
  const avgDiffMs = matchedDiffs.length > 0
    ? Math.round(matchedDiffs.reduce((s, v) => s + v, 0) / matchedDiffs.length)
    : null;

  return {
    expResults,
    extraCount,
    extraTapsMs,
    exactCount,
    closeCount,
    missedCount,
    avgDiffMs,
    passed: missedCount === 0 && extraCount === 0
  };
}

const PROD_FREQUENCIES = {
  "63":    { key: "63",    freqHz: 63,    symbol: "63 Hz",   roman: "63 Hz",   short: "Subbass",  label: "63 Hz – Subbass & Kick-Fundament" },
  "125":   { key: "125",   freqHz: 125,   symbol: "125 Hz",  roman: "125 Hz",  short: "Bass",     label: "125 Hz – Bass-Druck & Wärme" },
  "250":   { key: "250",   freqHz: 250,   symbol: "250 Hz",  roman: "250 Hz",  short: "Fülle",    label: "250 Hz – Tiefmitten („Matsch“-Zone)" },
  "500":   { key: "500",   freqHz: 500,   symbol: "500 Hz",  roman: "500 Hz",  short: "Holz",     label: "500 Hz – Untere Mitten („Karton“)" },
  "800":   { key: "800",   freqHz: 800,   symbol: "800 Hz",  roman: "800 Hz",  short: "Bauch",    label: "800 Hz – Nasale Mitten & Holz" },
  "1000":  { key: "1000",  freqHz: 1000,  symbol: "1 kHz",   roman: "1 kHz",   short: "Kern",     label: "1 kHz – Zentrales Mittelband" },
  "1600":  { key: "1600",  freqHz: 1600,  symbol: "1,6 kHz", roman: "1,6 kHz", short: "Attack",   label: "1,6 kHz – Obermitten & Ansprache" },
  "2000":  { key: "2000",  freqHz: 2000,  symbol: "2 kHz",   roman: "2 kHz",   short: "Präsenz",  label: "2 kHz – Stimm-Fokus & Präsenz" },
  "2500":  { key: "2500",  freqHz: 2500,  symbol: "2,5 kHz", roman: "2,5 kHz", short: "Kante",    label: "2,5 kHz – Biss & Durchsetzungskraft" },
  "4000":  { key: "4000",  freqHz: 4000,  symbol: "4 kHz",   roman: "4 kHz",   short: "Direkt",   label: "4 kHz – Direktheit & Konsonanten" },
  "6300":  { key: "6300",  freqHz: 6300,  symbol: "6,3 kHz", roman: "6,3 kHz", short: "S-Laute",  label: "6,3 kHz – Sibilanz & Definition" },
  "8000":  { key: "8000",  freqHz: 8000,  symbol: "8 kHz",   roman: "8 kHz",   short: "Brillanz", label: "8 kHz – Höhen-Glanz & Frische" },
  "12000": { key: "12000", freqHz: 12000, symbol: "12 kHz",  roman: "12 kHz",  short: "Luft",     label: "12 kHz – Super-Höhen & „Air“-Band" }
};

const PROD_TONE_LEVELS = {
  1: { label: "5 Bänder (Basis)", choices: ["125", "250", "1000", "2000", "4000"] },
  2: { label: "8 Oktavbänder",    choices: ["63", "125", "250", "500", "1000", "2000", "4000", "8000"] },
  3: { label: "12 Bänder",        choices: ["63", "125", "250", "500", "800", "1000", "1600", "2500", "4000", "6300", "8000", "12000"] }
};

const PROD_EQ_NOISE_LEVELS = {
  1: { label: "Breiter EQ",  boostDb: 10.0, q: 1.6, choices: ["125", "250", "500", "1000", "2000", "4000"] },
  2: { label: "Oktav-EQ",    boostDb: 8.5,  q: 2.6, choices: ["63", "125", "250", "500", "1000", "2000", "4000", "8000"] },
  3: { label: "Chirurgisch", boostDb: 7.0,  q: 4.2, choices: ["63", "125", "250", "500", "800", "1000", "1600", "2500", "4000", "8000"] }
};

const MODES_TRAINING_DATA = {
  "ionian": {
    key: "ionian", roman: "Ionisch", short: "Dur (1 2 3 4 5 6 7)",
    label: "Ionisch (Dur-Tonleiter)",
    intervals: [0, 2, 4, 5, 7, 9, 11, 12],
    charTurn: [0, 4, 5, 7, 11, 12],
    vampOffsets: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]]
  },
  "dorian": {
    key: "dorian", roman: "Dorisch", short: "Moll mit ♮6",
    label: "Dorisch (1 2 b3 4 5 6 b7)",
    intervals: [0, 2, 3, 5, 7, 9, 10, 12],
    charTurn: [0, 3, 7, 9, 10, 7],
    vampOffsets: [[0, 3, 7, 10], [5, 9, 12]]
  },
  "phrygian": {
    key: "phrygian", roman: "Phrygisch", short: "Moll mit b2",
    label: "Phrygisch (1 b2 b3 4 5 b6 b7)",
    intervals: [0, 1, 3, 5, 7, 8, 10, 12],
    charTurn: [0, 3, 7, 8, 1, 0],
    vampOffsets: [[0, 3, 7], [1, 5, 8]]
  },
  "lydian": {
    key: "lydian", roman: "Lydisch", short: "Dur mit #4",
    label: "Lydisch (1 2 3 #4 5 6 7)",
    intervals: [0, 2, 4, 6, 7, 9, 11, 12],
    charTurn: [0, 4, 7, 6, 7, 11],
    vampOffsets: [[0, 4, 7, 11], [2, 6, 9]]
  },
  "mixolydian": {
    key: "mixolydian", roman: "Mixolydisch", short: "Dur mit b7",
    label: "Mixolydisch (1 2 3 4 5 6 b7)",
    intervals: [0, 2, 4, 5, 7, 9, 10, 12],
    charTurn: [0, 4, 7, 10, 9, 7],
    vampOffsets: [[0, 4, 7], [-2, 2, 5]]
  },
  "aeolian": {
    key: "aeolian", roman: "Äolisch", short: "Natürliches Moll (b6, b7)",
    label: "Äolisch (1 2 b3 4 5 b6 b7)",
    intervals: [0, 2, 3, 5, 7, 8, 10, 12],
    charTurn: [0, 3, 7, 8, 7, 10],
    vampOffsets: [[0, 3, 7], [-4, 0, 3]]
  },
  "locrian": {
    key: "locrian", roman: "Lokrisch", short: "Moll mit b2 & b5",
    label: "Lokrisch (1 b2 b3 4 b5 b6 b7)",
    intervals: [0, 1, 3, 5, 6, 8, 10, 12],
    charTurn: [0, 3, 6, 1, 0],
    vampOffsets: [[0, 3, 6, 10], [1, 5, 8]]
  },
  "harm_minor": {
    key: "harm_minor", roman: "Harm. Moll", short: "Moll mit #7",
    label: "Harmonisch Moll (b6 & Leitton 7)",
    intervals: [0, 2, 3, 5, 7, 8, 11, 12],
    charTurn: [0, 3, 7, 8, 11, 12],
    vampOffsets: [[0, 3, 7], [7, 11, 14, 17]]
  }
};

const MODE_SCALE_LEVELS = {
  1: { label: "4 Grund-Modi",      randomRoot: false, choices: ["ionian", "aeolian", "dorian", "mixolydian"] },
  2: { label: "Alle 7 Modi (C)",   randomRoot: false, choices: ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"] },
  3: { label: "Alle 7 + Grundton", randomRoot: true,  choices: ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"] }
};

const MODE_CHAR_LEVELS = {
  1: { label: "Dur-Modi",           randomRoot: false, choices: ["ionian", "lydian", "mixolydian"] },
  2: { label: "Moll-Modi",          randomRoot: false, choices: ["aeolian", "dorian", "phrygian", "locrian"] },
  3: { label: "Alle + Harm. Moll",  randomRoot: true,  choices: ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian", "harm_minor"] }
};

const MODE_CADENCE_LEVELS = {
  1: { label: "4 Standard-Vamps",   randomRoot: false, choices: ["ionian", "dorian", "mixolydian", "aeolian"] },
  2: { label: "Alle 6 Modal-Vamps", randomRoot: true,  choices: ["ionian", "dorian", "mixolydian", "aeolian", "lydian", "phrygian"] }
};

function getChoiceItem(exType, choiceKey) {
  if (exType === "cadence") return getLocalizedDegreeDef(choiceKey);
  if (isChordQualityMode(exType)) return getLocalizedChordDef(choiceKey);
  if (exType === "chord-inversions") return getLocalizedChordInversionDef(choiceKey);
  if (exType === "rhythm-meter") return getLocalizedRhythmMeter(choiceKey);
  if (exType === "rhythm-dictation") return getLocalizedRhythmCell(choiceKey);
  if (exType === "rhythm-groove") {
    if (RHYTHM_GROOVE_STYLES[choiceKey]) return getLocalizedRhythmGroove(choiceKey);
    if (RHYTHM_OFFBEAT_POSITIONS[choiceKey]) return getLocalizedRhythmOffbeat(choiceKey);
    return getLocalizedRhythmMicroTiming(choiceKey);
  }
  if (exType === "prod-tone" || exType === "prod-eq-noise") {
    return getLocalizedProdFreq(choiceKey);
  }
  if (exType.startsWith("modes-")) {
    return getLocalizedModeDef(choiceKey);
  }
  return getLocalizedIntervalDef(choiceKey);
}

function computeBalancedRows(items) {
  const n = items.length;
  if (n <= 4) {
    return { rows: [items], maxCols: n };
  }
  if (n <= 8) {
    const r1 = Math.ceil(n / 2);
    return {
      rows: [items.slice(0, r1), items.slice(r1)],
      maxCols: r1
    };
  }
  const r1 = Math.ceil(n / 3);
  const rem = n - r1;
  const r2 = Math.ceil(rem / 2);
  return {
    rows: [
      items.slice(0, r1),
      items.slice(r1, r1 + r2),
      items.slice(r1 + r2)
    ],
    maxCols: r1
  };
}

function stopWaveAnimation() {
  if (state.waveAnimFrame) {
    cancelAnimationFrame(state.waveAnimFrame);
    state.waveAnimFrame = null;
  }
}

const appHistoryState = {
  idx: 0,
  isApplying: false
};

function canUseHistory() {
  return typeof window !== "undefined"
    && window.history
    && typeof window.history.pushState === "function"
    && typeof window.history.replaceState === "function";
}

function getOpenModalName() {
  const mixer = document.getElementById("mixerBackdrop");
  if (mixer && !mixer.classList.contains("modal-hidden")) return "mixer";
  const settings = document.getElementById("settingsBackdrop");
  if (settings && !settings.classList.contains("modal-hidden")) return "settings";
  const about = document.getElementById("aboutBackdrop");
  if (about && !about.classList.contains("modal-hidden")) return "about";
  const breakModal = document.getElementById("breakReminderBackdrop");
  if (breakModal && !breakModal.classList.contains("modal-hidden")) return "break";
  return null;
}

function renderAboutModalContent() {
  const mascotEl = document.getElementById("aboutMascotBadge");
  if (mascotEl && typeof getMascotSVG === "function") {
    mascotEl.innerHTML = getMascotSVG("happy", true);
  }
  document.getElementById("aboutPlaceholderNotice")?.classList.add("hidden");
}

function openAboutModal() {
  const prevModal = getOpenModalName();
  if (prevModal === "about") return;
  renderAboutModalContent();
  setModalVisibility("about");
  if (prevModal) {
    replaceAppHistory("about");
  } else {
    pushAppHistory("about");
  }
}

function setModalVisibility(modalName) {
  document.getElementById("mixerBackdrop")?.classList.toggle("modal-hidden", modalName !== "mixer");
  document.getElementById("settingsBackdrop")?.classList.toggle("modal-hidden", modalName !== "settings");
  document.getElementById("aboutBackdrop")?.classList.toggle("modal-hidden", modalName !== "about");
  if (modalName === "about") {
    renderAboutModalContent();
  }
  const breakModal = document.getElementById("breakReminderBackdrop");
  const wasBreakOpen = breakModal && !breakModal.classList.contains("modal-hidden");
  breakModal?.classList.toggle("modal-hidden", modalName !== "break");
  if (wasBreakOpen && modalName !== "break" && state?.breakReminder?.promptOpen) {
    state.breakReminder.promptOpen = false;
    state.breakReminder.elapsedSec = 0;
    if (!state.breakReminder.pausedOnBreak && state.profile?.breakReminderEnabled && state.currentView === "exercise") {
      state.breakReminder.lastActivityWallMs = Date.now();
      startBreakReminderTicker();
    }
  }
}

function closeTransientPopovers() {
  const volPop = document.getElementById("masterVolPopover");
  if (volPop && !volPop.classList.contains("hidden")) {
    volPop.classList.add("hidden");
    document.getElementById("masterVolBtn")?.classList.remove("btn-open");
  }
  [
    ["inlineBpmPopover", "moduleBpmBtn"],
    ["inlineKeyPopover", "moduleKeyBtn"],
    ["inlineNotationKeyPopover", "moduleNotationKeyBtn"],
    ["inlineNotationPacePopover", "moduleNotationPaceBtn"],
    ["inlineTimeSigPopover", "moduleTimeSigBtn"],
    ["warmupVoicePopover", "warmupVoiceBtn"],
    ["warmupSoundPopover", "warmupSoundBtn"],
    ["warmupBpmPopover", "warmupBpmBtn"]
  ].forEach(([popId, btnId]) => {
    if (popId === "inlineNotationPacePopover" && state?.listenOnly?.active && isNotationMode(state?.currentExercise?.type)) {
      return;
    }
    document.getElementById(popId)?.classList.add("hidden");
    document.getElementById(btnId)?.classList.remove("chip-open");
  });
}

function captureHistorySnapshot(modalName = getOpenModalName()) {
  return {
    idx: appHistoryState.idx,
    view: state.currentView,
    activeCategory: state.activeCategory,
    examSetupCategory: state.examSetupCategory,
    examResultReturnView: state.examResultReturnView,
    activeExamResultId: state.activeExamResultId,
    knowledgeTab: state.activeKnowledgeTab,
    knowledgeDetail: state.activeKnowledgeDetail ? { ...state.activeKnowledgeDetail } : null,
    exerciseReturnView: state.exerciseReturnView,
    warmupReturnView: state.warmupReturnView,
    metronomeReturnView: state.metronomeReturnView,
    modal: modalName
  };
}

function pushAppHistory(modalName = null) {
  if (!canUseHistory() || appHistoryState.isApplying) return;
  const nextIdx = appHistoryState.idx + 1;
  const snapshot = { ...captureHistorySnapshot(modalName), idx: nextIdx };
  try {
    window.history.pushState(snapshot, "");
    appHistoryState.idx = nextIdx;
  } catch (e) {
    // Fallback in stark eingeschränkten WebViews ohne History-Unterstützung
  }
}

function replaceAppHistory(modalName = getOpenModalName()) {
  if (!canUseHistory() || appHistoryState.isApplying) return;
  const snapshot = captureHistorySnapshot(modalName);
  try {
    window.history.replaceState(snapshot, "");
  } catch (e) {
    // Ignorieren, falls replaceState blockiert ist
  }
}

function applyHistorySnapshot(snapshot) {
  if (!snapshot || typeof snapshot.idx !== "number") return;
  appHistoryState.isApplying = true;
  try {
    appHistoryState.idx = snapshot.idx;
    if (snapshot.exerciseReturnView) {
      state.exerciseReturnView = snapshot.exerciseReturnView;
    }
    if (snapshot.warmupReturnView) {
      state.warmupReturnView = snapshot.warmupReturnView;
    }
    if (snapshot.metronomeReturnView) {
      state.metronomeReturnView = snapshot.metronomeReturnView;
    }
    if (snapshot.activeCategory) {
      state.activeCategory = snapshot.activeCategory;
    }
    if (snapshot.examSetupCategory) {
      state.examSetupCategory = snapshot.examSetupCategory;
    }
    if (snapshot.examResultReturnView) {
      state.examResultReturnView = snapshot.examResultReturnView;
    }
    if (snapshot.activeExamResultId !== undefined) {
      state.activeExamResultId = snapshot.activeExamResultId;
    }
    if (snapshot.knowledgeTab) {
      setKnowledgeTab(snapshot.knowledgeTab);
    }
    state.activeKnowledgeDetail = snapshot.knowledgeDetail || null;

    closeTransientPopovers();

    const targetView = snapshot.view || "home";
    const viewChanged = targetView !== state.currentView;
    const swipeDir = pendingSwipeDir;
    pendingSwipeDir = null;

    if (viewChanged) {
      if (targetView === "category" && snapshot.activeCategory) {
        openCategoryPage(snapshot.activeCategory);
      } else if (targetView === "category-help" && snapshot.activeCategory) {
        openCategoryHelpPage(snapshot.activeCategory);
      } else if (targetView === "exam-setup" && (snapshot.examSetupCategory || snapshot.activeCategory)) {
        openExamSetupPage(snapshot.examSetupCategory || snapshot.activeCategory, { fromHistory: true });
      } else if (targetView === "exam-result") {
        openExamResultView(snapshot.activeExamResultId, { fromHistory: true, returnView: snapshot.examResultReturnView });
      } else if (targetView === "knowledge-detail" && snapshot.knowledgeDetail) {
        if (snapshot.knowledgeDetail.kind === "article") {
          openKnowledgeArticle(snapshot.knowledgeDetail.id);
        } else {
          openKnowledgeRef(snapshot.knowledgeDetail.key);
        }
      } else {
        switchView(targetView, { skipHistoryPush: true, fromHistory: true, swipeDir });
      }
    }

    setModalVisibility(snapshot.modal || null);
  } finally {
    appHistoryState.isApplying = false;
  }
}

function closeActiveModal() {
  const openModal = getOpenModalName();
  if (!openModal) return;
  if (canUseHistory() && window.history.state?.modal === openModal && appHistoryState.idx > 0) {
    window.history.back();
    return;
  }
  setModalVisibility(null);
}

function navigateBackFromUI() {
  if (getOpenModalName()) {
    closeActiveModal();
    return;
  }
  if (state.currentView === "exercise" && state.exam?.active) {
    requestExamAbort();
    return;
  }
  if (canUseHistory() && appHistoryState.idx > 0 && window.history.state?.idx === appHistoryState.idx) {
    window.history.back();
    return;
  }
  if (state.currentView === "exercise") {
    switchView(state.exerciseReturnView || "home", { skipHistoryPush: true });
  } else if (state.currentView === "warmup") {
    switchView(state.warmupReturnView || "category", { skipHistoryPush: true });
  } else if (state.currentView === "metronome") {
    switchView(state.metronomeReturnView || "home", { skipHistoryPush: true });
  } else if (state.currentView === "exam-result") {
    switchView(state.examResultReturnView || "exam-setup", { skipHistoryPush: true });
  } else if (state.currentView === "exam-setup") {
    switchView("category", { skipHistoryPush: true });
  } else if (state.currentView === "knowledge-detail") {
    switchView("knowledge", { skipHistoryPush: true });
  } else if (state.currentView === "category-help") {
    switchView("category", { skipHistoryPush: true });
  } else {
    switchView("home", { skipHistoryPush: true });
  }
}

const MAIN_TAB_ORDER = ["home", "knowledge", "space"];
let pendingSwipeDir = null;
let activeViewLeaveState = null;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getTabForView(view) {
  if (view === "home" || view === "category" || view === "category-help" || view === "exam-setup") return "home";
  if (view === "exam-result") return state.examResultReturnView === "space" ? "space" : "home";
  if (view === "knowledge" || view === "knowledge-detail") return "knowledge";
  if (view === "space") return "space";
  return null;
}

function getViewOrderInfo(view) {
  const tab = getTabForView(view) || "home";
  const tabIdx = MAIN_TAB_ORDER.indexOf(tab);
  let depth = 0;
  if (view === "category" || view === "knowledge-detail" || view === "metronome") depth = 1;
  else if (view === "category-help" || view === "exam-setup") depth = 2;
  else if (view === "exercise" || view === "warmup") depth = 3;
  else if (view === "exam-result") depth = 4;
  return { tabIdx, depth };
}

function inferTransitionDirection(prevView, targetView) {
  if (!prevView || prevView === targetView) return null;
  const from = getViewOrderInfo(prevView);
  const to = getViewOrderInfo(targetView);
  if (from.tabIdx !== to.tabIdx) {
    return to.tabIdx > from.tabIdx ? "next" : "prev";
  }
  if (from.depth !== to.depth) {
    return to.depth > from.depth ? "next" : "prev";
  }
  return "next";
}

function finishActiveViewLeave() {
  if (!activeViewLeaveState) return;
  const { timer, el } = activeViewLeaveState;
  activeViewLeaveState = null;
  if (timer) clearTimeout(timer);
  if (el) {
    el.classList.remove("view-leaving", "view-leave-to-left", "view-leave-to-right");
    el.classList.add("hidden");
  }
}

function triggerTabEnterAnimation(viewEl, swipeDir) {
  if (!viewEl || !swipeDir) return;
  viewEl.classList.remove(
    "view-enter-from-right",
    "view-enter-from-left",
    "view-leaving",
    "view-leave-to-left",
    "view-leave-to-right"
  );
  if (prefersReducedMotion()) return;
  // Reflow anstoßen, damit aufeinanderfolgende Wechsel wieder sauber animieren
  if (typeof viewEl.offsetWidth === "number") {
    void viewEl.offsetWidth;
  }
  const isRtl = typeof document !== "undefined" && document.documentElement?.dir === "rtl";
  const visualDir = isRtl ? (swipeDir === "next" ? "prev" : "next") : swipeDir;
  viewEl.classList.add(visualDir === "next" ? "view-enter-from-right" : "view-enter-from-left");
}

function triggerTilePulse(tileEl) {
  if (!tileEl || prefersReducedMotion()) return;
  tileEl.classList.remove("tile-selected-pulse");
  if (typeof tileEl.offsetWidth === "number") {
    void tileEl.offsetWidth;
  }
  tileEl.classList.add("tile-selected-pulse");
  if (tileEl._pulseTimer) clearTimeout(tileEl._pulseTimer);
  tileEl._pulseTimer = setTimeout(() => {
    tileEl.classList.remove("tile-selected-pulse");
    tileEl._pulseTimer = null;
  }, 300);
}

function navigateToMainTab(targetTab, swipeDir = null) {
  if (!MAIN_TAB_ORDER.includes(targetTab)) return false;
  if (targetTab === state.currentView) return false;

  const activeTab = getTabForView(state.currentView);
  const canHistory = canUseHistory();

  if (
    targetTab === "home" &&
    (state.currentView === "knowledge" || state.currentView === "space" || state.currentView === "category") &&
    canHistory &&
    appHistoryState.idx === 1 &&
    window.history.state?.idx === 1
  ) {
    pendingSwipeDir = swipeDir;
    window.history.back();
    return true;
  }

  if (
    targetTab === "knowledge" &&
    state.currentView === "knowledge-detail" &&
    canHistory &&
    appHistoryState.idx >= 1 &&
    window.history.state?.idx >= 1
  ) {
    pendingSwipeDir = swipeDir;
    window.history.back();
    return true;
  }

  let resolvedDir = swipeDir;
  if (!resolvedDir && activeTab) {
    const curIdx = MAIN_TAB_ORDER.indexOf(activeTab);
    const nextIdx = MAIN_TAB_ORDER.indexOf(targetTab);
    if (curIdx !== -1 && nextIdx !== -1 && curIdx !== nextIdx) {
      resolvedDir = nextIdx > curIdx ? "next" : "prev";
    }
  }

  switchView(targetTab, { swipeDir: resolvedDir });
  return true;
}

function hasHorizontalScrollableAncestor(target) {
  let node = target;
  while (node && node !== document.body && node !== document.documentElement) {
    if (node.dataset?.noSwipe === "true") return true;
    const tag = (node.tagName || "").toUpperCase();
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || node.isContentEditable) {
      return true;
    }
    if (typeof window !== "undefined" && typeof window.getComputedStyle === "function" && node.nodeType === 1) {
      const style = window.getComputedStyle(node);
      if (style && (style.overflowX === "auto" || style.overflowX === "scroll")) {
        if (typeof node.scrollWidth === "number" && typeof node.clientWidth === "number") {
          if (node.scrollWidth > node.clientWidth + 2) return true;
        }
      }
    }
    node = node.parentElement || node.parentNode || null;
  }
  return false;
}

function handleHorizontalTabSwipe({ startX, startY, endX, endY, durationMs, viewportWidth, target }) {
  if (state.currentView === "exercise") return false;
  if (getOpenModalName() !== null) return false;

  const splash = document.getElementById("startupSplash");
  if (splash && !splash.classList.contains("splash-hidden")) return false;
  const welcome = document.getElementById("welcomeOnboarding");
  if (welcome && !welcome.classList.contains("hidden")) return false;

  if (target && hasHorizontalScrollableAncestor(target)) return false;

  const vw = typeof viewportWidth === "number" && viewportWidth > 0 ? viewportWidth : 390;
  // Bildschirmränder (28px) aussparen, damit Androids System-Zurück-Geste weiterhin Vorrang hat
  const edgeGuardPx = 28;
  if (startX < edgeGuardPx || startX > vw - edgeGuardPx) return false;

  const dx = endX - startX;
  const dy = endY - startY;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  if (durationMs > 650 || absDx < 56) return false;
  if (absDx <= absDy * 1.45) return false;

  const activeTab = getTabForView(state.currentView);
  if (!activeTab) return false;

  const curIdx = MAIN_TAB_ORDER.indexOf(activeTab);
  if (curIdx === -1) return false;

  const isRtl = typeof document !== "undefined" && document.documentElement?.dir === "rtl";
  const step = isRtl ? (dx > 0 ? 1 : -1) : (dx < 0 ? 1 : -1);
  const nextTab = MAIN_TAB_ORDER[curIdx + step];
  if (!nextTab) return false;

  const swipeDir = step > 0 ? "next" : "prev";
  return navigateToMainTab(nextTab, swipeDir);
}

function initTabSwipeNavigation() {
  const swipeSurface = document.querySelector(".app-shell") || document.body || document.documentElement;
  if (!swipeSurface || typeof swipeSurface.addEventListener !== "function") return;

  const edgeGuardPx = 28;
  let tracker = null;

  swipeSurface.addEventListener("touchstart", (e) => {
    const touches = e.touches;
    if (!touches || touches.length !== 1) {
      tracker = null;
      return;
    }
    if (state.currentView === "exercise" || state.currentView === "metronome" || getOpenModalName() !== null) {
      tracker = null;
      return;
    }
    const splash = document.getElementById("startupSplash");
    if (splash && !splash.classList.contains("splash-hidden")) {
      tracker = null;
      return;
    }
    const welcome = document.getElementById("welcomeOnboarding");
    if (welcome && !welcome.classList.contains("hidden")) {
      tracker = null;
      return;
    }

    const t = touches[0];
    const vw = window.innerWidth || document.documentElement?.clientWidth || 390;
    if (t.clientX < edgeGuardPx || t.clientX > vw - edgeGuardPx) {
      tracker = null;
      return;
    }
    if (hasHorizontalScrollableAncestor(e.target)) {
      tracker = null;
      return;
    }

    tracker = {
      startX: t.clientX,
      startY: t.clientY,
      startTime: Date.now(),
      viewportWidth: vw,
      target: e.target,
      aborted: false
    };
  }, { passive: true });

  swipeSurface.addEventListener("touchmove", (e) => {
    if (!tracker || tracker.aborted) return;
    if (!e.touches || e.touches.length !== 1) {
      tracker.aborted = true;
      return;
    }
    const t = e.touches[0];
    const dx = t.clientX - tracker.startX;
    const dy = t.clientY - tracker.startY;
    if (Math.abs(dy) > 28 && Math.abs(dy) > Math.abs(dx) * 1.1) {
      tracker.aborted = true;
    }
  }, { passive: true });

  swipeSurface.addEventListener("touchend", (e) => {
    if (!tracker) return;
    const current = tracker;
    tracker = null;
    if (current.aborted) return;

    const changed = e.changedTouches && e.changedTouches[0];
    if (!changed) return;

    handleHorizontalTabSwipe({
      startX: current.startX,
      startY: current.startY,
      endX: changed.clientX,
      endY: changed.clientY,
      durationMs: Date.now() - current.startTime,
      viewportWidth: current.viewportWidth,
      target: current.target
    });
  }, { passive: true });

  swipeSurface.addEventListener("touchcancel", () => {
    tracker = null;
  }, { passive: true });
}

function getDefaultExerciseBpm(mode = state?.settings?.mode) {
  const globalDefault = Number(state?.settings?.defaultBpm) || 90;
  // Kadenz- und Solfège-Übungen starten standardmäßig mit 120 BPM
  if (mode === "cadence") return CADENCE_DEFAULT_BPM;
  if (mode === "solfege") return SOLFEGE_DEFAULT_BPM;
  return globalDefault;
}

function switchView(targetView, options = {}) {
  const prevView = state.currentView;
  if (typeof state.listenOnly === "object" && state.listenOnly.active && (targetView !== "exercise" || prevView !== "exercise")) {
    setListenOnlyMode(false, { keepPlayback: true });
  }
  if (prevView === "exercise" && targetView !== "exercise" && state.exam?.active) {
    cleanupActiveExamState({ restoreSettings: !options.examCompletedTransition });
  }
  if (prevView === "warmup" && targetView !== "warmup" && typeof pauseWarmupSession === "function") {
    pauseWarmupSession({ keepPlayback: true });
  }
  if (prevView === "metronome" && targetView !== "metronome" && typeof stopMetronome === "function") {
    stopMetronome();
  }
  stopPlayback();
  stopWaveAnimation();
  closeTransientPopovers();
  state.currentView = targetView;
  if (targetView === "exercise" || targetView === "warmup") {
    markPracticeStarted();
  }

  // Beim Starten eines Übungsmoduls wird zunächst das modulspezifische Standardtempo übernommen
  // (Kadenz & Solfège: 120 BPM, übrige Module: defaultBpm), bis der Nutzer im Modul manuell anpasst (außer bei Mix-Direktstart mit eigenem BPM).
  if (targetView === "exercise" && prevView !== "exercise" && !options.preserveBpm && (!options.fromHistory || !state.currentExercise)) {
    const startBpm = getDefaultExerciseBpm(state.settings.mode);
    state.hasManualExerciseBpm = false;
    state.settings.randomBpm = false;
    state.settings.bpm = startBpm;
    state.activeBpm = startBpm;
    const inlineSlider = document.getElementById("inlineBpmSlider");
    if (inlineSlider) inlineSlider.value = startBpm;
    document.getElementById("inlineBpmRandomBtn")?.classList.remove("active");
  }

  const views = {
    home: document.getElementById("viewHome"),
    category: document.getElementById("viewCategory"),
    "category-help": document.getElementById("viewCategoryHelp"),
    "exam-setup": document.getElementById("viewExamSetup"),
    "exam-result": document.getElementById("viewExamResult"),
    knowledge: document.getElementById("viewKnowledge"),
    "knowledge-detail": document.getElementById("viewKnowledgeDetail"),
    space: document.getElementById("viewSpace"),
    exercise: document.getElementById("viewExercise"),
    warmup: document.getElementById("viewWarmup"),
    metronome: document.getElementById("viewMetronome")
  };

  finishActiveViewLeave();

  const prevEl = prevView ? views[prevView] : null;
  const nextEl = views[targetView];
  const animDir = options.swipeDir || inferTransitionDirection(prevView, targetView);
  const shouldAnimateLeave = Boolean(
    prevView &&
    prevEl &&
    nextEl &&
    prevEl !== nextEl &&
    animDir &&
    options.animate !== false &&
    !prefersReducedMotion()
  );

  Object.entries(views).forEach(([key, el]) => {
    if (!el) return;
    if (key === targetView) {
      el.classList.remove("hidden", "view-leaving", "view-leave-to-left", "view-leave-to-right");
      if (targetView !== prevView && !options.fromHistory && typeof el.scrollTop === "number") {
        el.scrollTop = 0;
      }
      return;
    }
    el.classList.remove("view-enter-from-right", "view-enter-from-left");
    if (shouldAnimateLeave && key === prevView) {
      el.classList.remove("hidden", "view-leave-to-left", "view-leave-to-right");
      const isRtlLeave = typeof document !== "undefined" && document.documentElement?.dir === "rtl";
      const visualLeaveDir = isRtlLeave ? (animDir === "next" ? "prev" : "next") : animDir;
      el.classList.add("view-leaving", visualLeaveDir === "next" ? "view-leave-to-left" : "view-leave-to-right");
    } else {
      el.classList.remove("view-leaving", "view-leave-to-left", "view-leave-to-right");
      el.classList.add("hidden");
    }
  });

  if (shouldAnimateLeave) {
    const leaveTimer = setTimeout(() => {
      if (activeViewLeaveState && activeViewLeaveState.el === prevEl) {
        finishActiveViewLeave();
      }
    }, 270);
    activeViewLeaveState = { timer: leaveTimer, el: prevEl };
  }

  if (nextEl && animDir && options.animate !== false) {
    triggerTabEnterAnimation(nextEl, animDir);
  }

  const isMainTabView = targetView === "home" || targetView === "knowledge" || targetView === "space";
  const activeTab = getTabForView(targetView);
  const showBottomNav = targetView !== "exercise" && targetView !== "warmup" && targetView !== "metronome";
  document.getElementById("bottomNav")?.classList.toggle("hidden", !showBottomNav);
  document.getElementById("backBtn")?.classList.toggle("hidden", isMainTabView);

  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.classList.toggle("active", Boolean(activeTab && tab.dataset.nav === activeTab));
  });

  state.updateHeaderSubtext();

  if (targetView === "home") {
    renderHomeProfileGreeting();
    renderHomeQuickMixBar();
  } else if (targetView === "space") {
    renderProfileAccountView();
  } else if (targetView === "exam-result" && typeof renderExamResultView === "function") {
    renderExamResultView();
  } else if (targetView === "warmup" && typeof renderWarmupView === "function") {
    renderWarmupView();
  } else if (targetView === "metronome" && typeof renderMetronomeView === "function") {
    renderMetronomeView();
  }

  if (targetView === "exercise") {
    if (state.exam?.active && !options.skipExamLoad) {
      loadCurrentExamQuestion();
    } else if (!options.fromHistory || !state.currentExercise) {
      generateExercise();
    } else if (state.profileDisplayDirty) {
      renderUI();
    }
    state.profileDisplayDirty = false;
    if (state.breakReminder) {
      state.breakReminder.pausedOnBreak = false;
      state.breakReminder.lastActivityWallMs = Date.now();
      startBreakReminderTicker();
    }
  } else {
    stopBreakReminderTicker();
  }

  if (!options.skipHistoryPush && !appHistoryState.isApplying && targetView !== prevView) {
    const isMainSwitchBetweenTabs =
      (prevView === "knowledge" && targetView === "space") ||
      (prevView === "space" && targetView === "knowledge");

    if (isMainSwitchBetweenTabs) {
      replaceAppHistory(null);
    } else {
      pushAppHistory(null);
    }
  }
}

/**
 * Baut die Artikel-Liste auf der Wissens-Übersichtsseite (#viewKnowledge) auf
 */
function renderKnowledgeHub() {
  const listEl = document.getElementById("articlesNavList");
  if (!listEl || typeof getLocalizedKnowledgeArticles !== "function") return;
  const articles = getLocalizedKnowledgeArticles();

  listEl.innerHTML = articles.map(art => `
    <button class="category-nav-card" data-open-article="${art.id}">
      <div class="cat-icon-box ${art.badgeClass}">${art.icon}</div>
      <div class="cat-text-box">
        <h3>${art.title}</h3>
        <p>${art.subtitle}</p>
      </div>
      <span class="cat-chevron">›</span>
    </button>
  `).join("");

  listEl.querySelectorAll("[data-open-article]").forEach(btn => {
    btn.addEventListener("click", () => {
      openKnowledgeArticle(btn.dataset.openArticle);
    });
  });
}

/**
 * Schaltet im Wissens-Bereich zwischen „Theorie & Artikel“ und „Instrumentenkunde“ um
 */
const KNOWLEDGE_TAB_ORDER = ["theory", "articles", "instruments"];

function setKnowledgeTab(tabKey) {
  const prevTab = state.activeKnowledgeTab;
  const nextTab = KNOWLEDGE_TAB_ORDER.includes(tabKey) ? tabKey : "theory";
  state.activeKnowledgeTab = nextTab;

  const tabEls = {
    theory: document.getElementById("knowledgeTabTheory"),
    articles: document.getElementById("knowledgeTabArticles"),
    instruments: document.getElementById("knowledgeTabInstruments")
  };
  Object.entries(tabEls).forEach(([k, el]) => {
    el?.classList.toggle("hidden", k !== nextTab);
    el?.classList.remove("view-enter-from-right", "view-enter-from-left");
  });

  if (prevTab !== nextTab && state.currentView === "knowledge") {
    const prevIdx = KNOWLEDGE_TAB_ORDER.indexOf(prevTab);
    const nextIdx = KNOWLEDGE_TAB_ORDER.indexOf(nextTab);
    triggerTabEnterAnimation(tabEls[nextTab], nextIdx >= prevIdx ? "next" : "prev");
  }

  document.querySelectorAll("[data-ktab]").forEach(btn => {
    const active = btn.dataset.ktab === nextTab;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });

  if (state.currentView === "knowledge") {
    state.updateHeaderSubtext();
    if (!appHistoryState.isApplying) replaceAppHistory(null);
  }
}

/**
 * Öffnet eine der Referenz- oder Instrumentenkunde-Unterseiten im Wissens-Bereich
 */
function openKnowledgeRef(refKey, options = {}) {
  const container = document.getElementById("knowledgeDetailContent");
  if (!container) return;

  state.activeKnowledgeDetail = { kind: "ref", key: refKey };

  if (refKey === "intervals") {
    state.knowledgeTitle = tr("Intervalle", "Intervals");
    state.knowledgeSub = tr(
      "Tippe auf „Frequenz“, um das Verhältnis einfach zu erklären",
      "Tap any ratio badge to see how the frequency proportion works"
    );

    container.innerHTML = `
      ${typeof getLocalizedIntervalNamingGuideHTML === "function" ? getLocalizedIntervalNamingGuideHTML() : ""}
      <div class="k-filter-row" id="intervalRefFilterRow">
        <button class="k-filter-pill active" data-ifilter="all">${tr("Alle (15)", "All (15)")}</button>
        <button class="k-filter-pill" data-ifilter="pure">${tr("Rein & Stabil", "Pure & Stable")}</button>
        <button class="k-filter-pill" data-ifilter="major">${tr("Dur & Hell", "Major & Bright")}</button>
        <button class="k-filter-pill" data-ifilter="minor">${tr("Moll & Warm", "Minor & Warm")}</button>
        <button class="k-filter-pill" data-ifilter="tension">${tr("Spannung & Reibung", "Tension & Grit")}</button>
      </div>
      <div class="knowledge-list" id="intervalRefCards"></div>
    `;

    function renderIntervalCards(filterCat) {
      const list = document.getElementById("intervalRefCards");
      if (!list) return;
      const items = getLocalizedIntervalEncyclopedia();
      const filtered = filterCat === "all"
        ? items
        : items.filter(item => item.category === filterCat);

      list.innerHTML = filtered.map((item, idx) => {
        const tagClass = item.category === "pure" ? "tag-sage"
          : (item.category === "minor" ? "tag-lilac" : "tag-peach");
        const semiUnit = item.semitones === 1 ? tr("Halbton", "Semitone") : tr("Halbtöne", "Semitones");
        const symLabel = typeof formatIntervalSymbol === "function" ? formatIntervalSymbol(item.symbol) : item.symbol;
        return `
          <article class="knowledge-card">
            <div class="k-card-top-row">
              <span class="k-card-tag is-interval-tag ${tagClass}">${symLabel} • ${item.semitones} ${semiUnit}</span>
              <button class="k-ratio-btn" data-toggle-ratio="${idx}" title="${item.ratioExplain}">
                <span>ⓘ ${tr("Frequenz", "Ratio")} ${item.ratio}</span>
              </button>
            </div>
            <div id="ratioExplainBox_${idx}" class="k-ratio-explain-box hidden">
              <strong>${tf("Was bedeutet {ratio}?", "What does {ratio} mean?", { ratio: item.ratio })}</strong><br>
              ${item.ratioExplain}
            </div>
            <h4>${item.name}</h4>
            <p><strong>${tr("Stimmung & Charakter:", "Character & Feel:")}</strong> ${item.mood}</p>
            <p><strong>${tr("Physik:", "Acoustics:")}</strong> ${item.physics}</p>
            <div class="k-meta-box">
              <div>🎵 <strong>${tr("Aufwärts:", "Ascending:")}</strong> ${item.songsAsc}</div>
              <div>🎵 <strong>${tr("Abwärts:", "Descending:")}</strong> ${item.songsDesc}</div>
            </div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-int-asc="${item.semitones}">▶ ${tr("Aufwärts", "Ascending")}</button>
              <button class="btn-tool" data-play-int-desc="${item.semitones}">▶ ${tr("Abwärts", "Descending")}</button>
              <button class="btn-tool" data-play-int-harm="${item.semitones}">▶ ${tr("Gleichzeitig", "Harmonic")}</button>
            </div>
          </article>
        `;
      }).join("");

      list.querySelectorAll("[data-toggle-ratio]").forEach(btn => {
        btn.addEventListener("click", () => {
          const box = document.getElementById(`ratioExplainBox_${btn.dataset.toggleRatio}`);
          if (box) {
            const isHidden = box.classList.toggle("hidden");
            btn.classList.toggle("active", !isHidden);
          }
        });
      });

      bindKnowledgeAudioButtons(list);
    }

    renderIntervalCards("all");

    container.querySelectorAll("[data-ifilter]").forEach(pill => {
      pill.addEventListener("click", () => {
        container.querySelectorAll("[data-ifilter]").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        renderIntervalCards(pill.dataset.ifilter);
      });
    });

  } else if (refKey === "cadences") {
    const cadList = getLocalizedCadenceEncyclopedia();
    state.knowledgeTitle = tr("Kadenzen & Harmonien", "Cadences & Harmonies");
    state.knowledgeSub = tr("Wie Akkordfolgen Geschichten erzählen", "How chord progressions tell musical stories");

    container.innerHTML = `
      <div class="k-filter-row">
        <button class="k-filter-pill active" data-cfilter="all">${tr("Alle", "All")} (${cadList.length})</button>
        <button class="k-filter-pill" data-cfilter="classic">${tr("Basis &amp; Klassisch", "Core &amp; Classic")}</button>
        <button class="k-filter-pill" data-cfilter="pop">${tr("Pop &amp; Evergreen", "Pop &amp; Classics")}</button>
        <button class="k-filter-pill" data-cfilter="epic">${tr("Film &amp; Epik", "Film &amp; Cinematic")}</button>
        <button class="k-filter-pill" data-cfilter="jazz">${tr("Jazz &amp; Blues", "Jazz &amp; Blues")}</button>
      </div>
      <div class="knowledge-list" id="cadenceRefCards"></div>
    `;

    function renderCadenceCards(filterCat) {
      const list = document.getElementById("cadenceRefCards");
      if (!list) return;
      const items = getLocalizedCadenceEncyclopedia();
      const filtered = filterCat === "all"
        ? items
        : items.filter(c => c.category === filterCat);

      list.innerHTML = filtered.map(cad => {
        const formattedText = cad.whyItWorks
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>");
        const stepAttr = cad.stepMs ? ` data-step-ms="${cad.stepMs}"` : "";
        const durAttr = cad.chordDur ? ` data-chord-dur="${cad.chordDur}"` : "";
        return `
          <article class="knowledge-card">
            <div class="k-card-top-row">
              <span class="k-card-tag ${cad.tagClass}">${cad.tag}</span>
              <span class="k-ratio-chip">${cad.formula}</span>
            </div>
            <h4>${cad.name}</h4>
            <p>${formattedText}</p>
            <div class="k-song-ref">
              <strong>${tr("Bekannte Song-Beispiele:", "Classic Song Examples:")}</strong>
              <ul class="k-physics-list" style="margin-top:0.25rem;">
                ${cad.songs.map(s => `<li>${s}</li>`).join("")}
              </ul>
            </div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-progression="${cad.bars.join(",")}"${stepAttr}${durAttr}>▶ ${tf("{f} in C-Dur anhören", "Hear {f} in C Major", { f: cad.formula })}</button>
            </div>
          </article>
        `;
      }).join("");

      bindKnowledgeAudioButtons(list);
    }

    renderCadenceCards("all");

    container.querySelectorAll("[data-cfilter]").forEach(pill => {
      pill.addEventListener("click", () => {
        container.querySelectorAll("[data-cfilter]").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        renderCadenceCards(pill.dataset.cfilter);
      });
    });

  } else if (refKey === "physics") {
    state.knowledgeTitle = tr("Physik & Klang", "Physics & Sound");
    state.knowledgeSub = tr("Schall, Obertöne, Schwebung & Stimmung", "Sound waves, overtones, beating & tuning");

    container.innerHTML = renderPhysicsReferenceHTML();

    bindKnowledgeAudioButtons(container);
    state.wavePaused = false;
    initWaveVisualizer(2, 1);

    const pauseBtn = document.getElementById("toggleWavePauseBtn");
    pauseBtn?.addEventListener("click", () => {
      state.wavePaused = !state.wavePaused;
      pauseBtn.textContent = state.wavePaused
        ? tr("▶ Welle bewegen", "▶ Animate Wave")
        : tr("⏸ Welle anhalten", "⏸ Pause Wave");
    });

    container.querySelectorAll("[data-wave-ratio]").forEach(btn => {
      btn.addEventListener("click", async () => {
        container.querySelectorAll("[data-wave-ratio]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const key = btn.dataset.waveRatio;
        const [num, den] = key.split(",").map(Number);
        const semi = parseInt(btn.dataset.waveSemi, 10);
        const banner = document.getElementById("waveExplainBanner");
        const expText = getLocalizedPhysicsWaveExplanation(key);
        if (banner && expText) {
          banner.innerHTML = expText;
        }
        initWaveVisualizer(num, den);
        await ensureAudioReady();
        audioEngine.stopPlayback();
        audioEngine.playStep(["C4", midiToNote(60 + semi)], 1.3, null, "interval-harmonic");
      });
    });

  } else if (refKey === "solfege") {
    state.knowledgeTitle = tr("Solfège & Tonstufen", "Solfège & Scale Degrees");
    state.knowledgeSub = tr(
      "Kadenz (I–vi–IV–V) + Stufe + Auflösung zur Tonika",
      "Cadence (I–vi–IV–V) + scale degree + resolution to tonic"
    );
    const steps = getLocalizedSolfegeSteps();

    container.innerHTML = `
      <div class="article-highlight-box" style="margin-bottom:0.2rem;">
        <h4>${tr("So funktionieren die Hörbeispiele hier:", "How these audio examples work:")}</h4>
        <p style="font-size:0.77rem; color:var(--raccoon-dark); line-height:1.38;">
          ${tr(
            "Jedes Beispiel spielt zuerst eine Kadenz (<strong>I – vi – IV – V</strong>), damit dein Ohr weiß, wo „zu Hause“ ist. Nach einer Pause hörst du die jeweilige Stufe – und danach ihre natürliche <strong>Auflösung zur Tonika (Do)</strong>: Von <em>Do bis Fa</em> abwärts, ab <em>Sol</em> aufwärts!",
            "Each example opens with a cadence (<strong>I – vi – IV – V</strong>) to anchor your ear in the key. After a short pause, you hear the scale degree followed by its natural <strong>resolution back to Do</strong> — downward from <em>Do–Fa</em> and upward from <em>Sol–Ti</em>!"
          )}
        </p>
      </div>
      <div class="knowledge-list">
        ${steps.map(step => `
          <article class="knowledge-card">
            <div class="k-card-top-row">
              <span class="k-card-tag tag-${step.color}">${step.degree}</span>
              <span class="k-ratio-chip">${step.syllable}</span>
            </div>
            <h4>${step.syllable} – ${step.character}</h4>
            <p>${step.desc}</p>
            <div class="k-song-ref">
              🧭 <strong>${tr("Auflösungsweg:", "Resolution path:")}</strong> ${step.resolveDesc}
            </div>
            <div class="k-btn-row">
              <button class="btn-tool" data-play-solfege-functional="${step.semitones}" data-resolve-path="${step.resolvePath.join(",")}">
                ▶ ${tf("Kadenz + „{s}“ + Auflösung hören", "Cadence + “{s}” + Resolution", { s: step.syllable })}
              </button>
            </div>
          </article>
        `).join("")}
      </div>
    `;

    bindKnowledgeAudioButtons(container);

  } else if (refKey === "rhythm") {
    state.knowledgeTitle = tr("Rhythmus & Takte", "Rhythm & Meter");
    state.knowledgeSub = tr("Puls, Notenwerte, Taktarten & Grooves", "Pulse, note values, time signatures & grooves");

    container.innerHTML = `<div class="knowledge-list">${renderRhythmReferenceHTML()}</div>`;
    bindKnowledgeAudioButtons(container);

  } else if (refKey === "rhythm-instruments") {
    const rInstList = getLocalizedRhythmInstrumentsData();
    state.knowledgeTitle = tr("Rhythmus-Instrumente", "Percussion & Drums");
    state.knowledgeSub = tr("Schlagzeug, Percussion & ihr Zusammenspiel", "Drum kit, world percussion & groove roles");

    container.innerHTML = `
      <div class="k-filter-row">
        <button class="k-filter-pill active" data-rfilter="all">${tr("Alle", "All")} (${rInstList.length})</button>
        <button class="k-filter-pill" data-rfilter="drumset">${tr("Schlagzeug-Set", "Drum Kit")}</button>
        <button class="k-filter-pill" data-rfilter="world">${tr("Hand- &amp; Weltpercussion", "Hand &amp; World Percussion")}</button>
        <button class="k-filter-pill" data-rfilter="small">${tr("Kleinpercussion &amp; Taktgeber", "Aux Percussion &amp; Clocks")}</button>
      </div>
      <div class="knowledge-list" id="rhythmInstCards"></div>
    `;

    function renderInstCards(filterCat) {
      const list = document.getElementById("rhythmInstCards");
      if (!list) return;
      list.innerHTML = renderRhythmInstrumentsHTML(filterCat);
      bindKnowledgeAudioButtons(list);
    }

    renderInstCards("all");

    container.querySelectorAll("[data-rfilter]").forEach(pill => {
      pill.addEventListener("click", () => {
        container.querySelectorAll("[data-rfilter]").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        renderInstCards(pill.dataset.rfilter);
      });
    });

  } else if (refKey === "vocals") {
    state.knowledgeTitle = tr("Gesang & Stimme", "Voice & Singing");
    state.knowledgeSub = tr("Anatomie, Register, Stimmfächer & Chorsatz", "Anatomy, vocal registers, voice types & SATB choir");

    container.innerHTML = `<div class="knowledge-list">${renderVocalsReferenceHTML()}</div>`;
    bindKnowledgeAudioButtons(container);

  } else if (refKey === "modes") {
    state.knowledgeTitle = tr("Modi & Tonleitern", "Modes & Scales");
    state.knowledgeSub = tr("Kirchentonarten, Charaktertöne & musikalische Funktion", "Church modes, color notes & musical function");

    const renderModeCards = (filter = "all") => {
      container.innerHTML = renderModesReferenceHTML(filter);
      bindKnowledgeAudioButtons(container);
      container.querySelectorAll("[data-mfilter]").forEach(pill => {
        pill.addEventListener("click", () => {
          renderModeCards(pill.dataset.mfilter);
        });
      });
    };
    renderModeCards("all");

  } else if (refKey === "keys") {
    state.knowledgeTitle = tr("Tonarten & Vorzeichen", "Keys & Signatures");
    state.knowledgeSub = tr("12 Tonarten, Vorzeichen, Parallelen & Moll-Varianten", "12 keys, key signatures, parallel/relative minor & minor forms");

    const renderKeyCards = (filter = "all") => {
      container.innerHTML = renderKeysReferenceHTML(filter);
      bindKnowledgeAudioButtons(container);
      container.querySelectorAll("[data-kfilter]").forEach(pill => {
        pill.addEventListener("click", () => {
          renderKeyCards(pill.dataset.kfilter);
        });
      });
    };
    renderKeyCards("all");

  } else if (refKey === "circle-of-fifths") {
    state.knowledgeTitle = tr("Quintenzirkel", "Circle of Fifths");
    state.knowledgeSub = tr(
      "Interaktives Klangrad, Nutzung, Akkord-Familien & Modulation",
      "Interactive key wheel, how to use it, chord families & modulation"
    );

    const renderCircleModule = () => {
      const cof = state.circleOfFifthsState || { idx: 0, ringMode: "major", tab: "chords" };
      container.innerHTML = renderCircleOfFifthsReferenceHTML(cof.idx, cof.ringMode, cof.tab);
      bindKnowledgeAudioButtons(container);

      container.querySelectorAll("[data-cof-idx]").forEach(el => {
        const activateWedge = () => {
          const nextIdx = parseInt(el.dataset.cofIdx || "0", 10);
          const targetRing = el.dataset.cofTargetRing === "minor" ? "minor" : "major";
          state.circleOfFifthsState = { ...cof, idx: nextIdx, ringMode: targetRing };
          renderCircleModule();
        };
        el.addEventListener("click", activateWedge);
        el.addEventListener("keydown", ev => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            activateWedge();
          }
        });
      });

      container.querySelectorAll("[data-cof-ring]").forEach(btn => {
        btn.addEventListener("click", () => {
          const targetRing = btn.dataset.cofRing === "minor" ? "minor" : "major";
          state.circleOfFifthsState = { ...cof, ringMode: targetRing };
          renderCircleModule();
        });
      });

      container.querySelectorAll("[data-cof-step]").forEach(btn => {
        btn.addEventListener("click", () => {
          const delta = parseInt(btn.dataset.cofStep || "0", 10);
          const nextIdx = ((cof.idx + delta) % 12 + 12) % 12;
          state.circleOfFifthsState = { ...cof, idx: nextIdx };
          renderCircleModule();
        });
      });

      container.querySelectorAll("[data-cof-tab]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.circleOfFifthsState = { ...cof, tab: btn.dataset.cofTab || "chords" };
          renderCircleModule();
        });
      });
    };
    renderCircleModule();

  } else if (refKey === "sing-and-play") {
    state.knowledgeTitle = tr("Singen & Spielen", "Sing & Play");
    state.knowledgeSub = tr("Koordination, Unabhängigkeit & effektive Praxis-Übungen", "Coordination, hand-voice independence & practical drills");

    container.innerHTML = `<div class="knowledge-list">${renderSingAndPlayReferenceHTML()}</div>`;
    bindKnowledgeAudioButtons(container);

  } else if (refKey === "notation") {
    state.knowledgeTitle = tr("Notation & Schlüssel", "Notation & Clefs");
    state.knowledgeSub = tr("Notensystem, Schlüssel, Hilfslinien & Vorzeichen sicher beherrschen", "Master the 5-line staff, clefs, ledger lines & accidentals");

    const html = typeof renderNotationReferenceHTML === "function" ? renderNotationReferenceHTML() : "";
    container.innerHTML = `<div class="knowledge-list">${html}</div>`;
    bindKnowledgeAudioButtons(container);

  } else if (refKey === "arranging") {
    state.knowledgeTitle = tr("Arrangieren", "Arranging", {
      fr: "Arrangement",
      pl: "Aranżacja",
      uk: "Аранжування",
      ur: "ارینجنگ (ترتیبِ موسیقی)"
    });
    state.knowledgeSub = tr(
      "Wie aus einer Skizze ein lebendiges Gesamtwerk für Band, Chor oder Orchester wird",
      "How a simple sketch turns into a living piece for band, choir, or orchestra",
      {
        fr: "Comment transformer une esquisse en œuvre vivante pour groupe, chœur ou orchestre",
        pl: "Jak zamienić prosty szkic w żywe brzmienie dla zespołu, chóru lub orkiestry",
        uk: "Як перетворити простий ескіз на живе звучання для гурту, хору чи оркестру",
        ur: "ایک سادہ خاکے کو بینڈ، کوائر یا آرکسٹرا کے لیے جاندار موسیقی میں کیسے بدلا جائے"
      }
    );

    const html = typeof renderArrangingReferenceHTML === "function" ? renderArrangingReferenceHTML() : "";
    container.innerHTML = `<div class="knowledge-list">${html}</div>`;
    bindKnowledgeAudioButtons(container);

  } else if (typeof getLocalizedInstrumentModule === "function" && getLocalizedInstrumentModule(refKey)) {
    const mod = getLocalizedInstrumentModule(refKey);
    state.knowledgeTitle = mod.title;
    state.knowledgeSub = mod.subtitle;

    container.innerHTML = `<div class="knowledge-list">${renderInstrumentModuleHTML(refKey)}</div>`;
    bindKnowledgeAudioButtons(container);
  }

  if (!options.refreshOnly) {
    switchView("knowledge-detail");
  }
}

function openKnowledgeArticle(articleId, options = {}) {
  const articles = getLocalizedKnowledgeArticles();
  const art = articles.find(a => a.id === articleId);
  const container = document.getElementById("knowledgeDetailContent");
  if (!art || !container) return;

  state.activeKnowledgeDetail = { kind: "article", id: articleId };
  state.knowledgeTitle = art.tag;
  state.knowledgeSub = art.title;

  container.innerHTML = art.render();
  bindKnowledgeAudioButtons(container);
  if (!options.refreshOnly) {
    switchView("knowledge-detail");
  }
}

/**
 * 3-spuriger Schwingungs-Visualizer:
 * Spur 1 (oben): Grundton mit exakt 2 vollen Wellenlängen + vertikalen Rasterlinien
 * Spur 2 (Mitte): Intervallton im direkten Maßstab (z. B. 4 Wellen bei Oktave 2:1, 3 Wellen bei Quinte 3:2)
 * Spur 3 (unten): Summenwelle im Ohr
 */
function initWaveVisualizer(num, den) {
  stopWaveAnimation();
  const canvas = document.getElementById("waveCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let phase = 0;

  // Wir zeigen in Spur 1 immer exakt 2 volle Wellen des Grundtons.
  // Dadurch sieht man sofort: Bei 2:1 sind es in Spur 2 genau 4 Wellen (2 pro Kästchen),
  // bei 3:2 sind es über die 2 Kästchen genau 3 Wellen!
  const baseWavesVisible = 2;
  const ratio = num / den;
  const topWavesVisible = baseWavesVisible * ratio;

  function draw() {
    if (state.currentView !== "knowledge-detail") return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const padLeft = 10;
    const padRight = 10;
    const plotW = w - padLeft - padRight;

    const yTrack1 = 38;  // Grundton
    const yTrack2 = 100; // 2. Ton
    const yTrack3 = 162; // Überlagerung

    const palette = getActivePaletteMeta();

    // 1. Vertikale Perioden-Rasterlinien (Ende von Welle 1 in der Mitte, Ende von Welle 2 rechts)
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = palette.grid;
    ctx.lineWidth = 1.2;
    [0, 0.5, 1].forEach(frac => {
      const x = padLeft + frac * plotW;
      ctx.beginPath();
      ctx.moveTo(x, 8);
      ctx.lineTo(x, h - 8);
      ctx.stroke();
    });
    ctx.restore();

    // Horizontale Nulllinien für alle 3 Spuren
    ctx.strokeStyle = palette.zeroLine;
    ctx.lineWidth = 1;
    [yTrack1, yTrack2, yTrack3].forEach(y => {
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(w - padRight, y);
      ctx.stroke();
    });

    // Spur-Beschriftungen oben links in jeder Spur
    ctx.font = "bold 11px -apple-system, sans-serif";
    ctx.fillStyle = palette.track1Label;
    ctx.fillText(tr("1. Grundton (2 lange Wellen)", "1. Root note (2 wave cycles)"), padLeft + 4, yTrack1 - 20);

    ctx.fillStyle = palette.track2Label;
    ctx.fillText(
      tf("2. Intervallton ({r}x so viele Wellen)", "2. Interval note ({r}x cycles)", {
        r: ratio.toFixed(2).replace(".00", "")
      }),
      padLeft + 4,
      yTrack2 - 20
    );

    ctx.fillStyle = palette.track3Label;
    ctx.fillText(tr("3. Zusammenklang im Ohr (Summenwelle)", "3. Combined waveform in your ear (sum)"), padLeft + 4, yTrack3 - 20);

    // Spur 1 zeichnen: Grundton (Grün)
    ctx.strokeStyle = palette.wave1;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    for (let i = 0; i <= plotW; i++) {
      const x = padLeft + i;
      const t = (i / plotW) * Math.PI * 2 * baseWavesVisible;
      const y = yTrack1 - Math.sin(t - phase) * 16;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Spur 2 zeichnen: Intervallton (Orange)
    ctx.strokeStyle = palette.wave2;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    for (let i = 0; i <= plotW; i++) {
      const x = padLeft + i;
      const t = (i / plotW) * Math.PI * 2 * topWavesVisible;
      const y = yTrack2 - Math.sin(t - phase * ratio) * 16;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Spur 3 zeichnen: Überlagerung
    ctx.strokeStyle = palette.wave3;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    for (let i = 0; i <= plotW; i++) {
      const x = padLeft + i;
      const t1 = (i / plotW) * Math.PI * 2 * baseWavesVisible;
      const t2 = (i / plotW) * Math.PI * 2 * topWavesVisible;
      const sum = (Math.sin(t1 - phase) + Math.sin(t2 - phase * ratio)) * 0.5;
      const y = yTrack3 - sum * 20;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    if (!state.wavePaused) {
      phase += 0.025;
    }
    state.waveAnimFrame = requestAnimationFrame(draw);
  }

  draw();
}

/**
 * Verbindet alle interaktiven Audio-Buttons im Wissens-Bereich
 */
function bindKnowledgeAudioButtons(rootEl) {
  rootEl.querySelectorAll("[data-open-warmup]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (typeof openWarmupView === "function") {
        openWarmupView("full-5min", { returnView: "knowledge-detail" });
      }
    });
  });

  rootEl.querySelectorAll("[data-jump-ref]").forEach(btn => {
    btn.addEventListener("click", () => {
      const refKey = btn.dataset.jumpRef;
      if (!refKey) return;
      const detailEl = document.getElementById("viewKnowledgeDetail");
      if (detailEl && typeof detailEl.scrollTop === "number") detailEl.scrollTop = 0;
      openKnowledgeRef(refKey);
    });
  });

  rootEl.querySelectorAll("[data-play-int-asc]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const semi = parseInt(btn.dataset.playIntAsc, 10);
      audioEngine.playStep(["C4"], 0.55, null, "interval");
      audioEngine.registerTimer(() => {
        audioEngine.playStep([midiToNote(60 + semi)], 0.95, null, "interval");
      }, 600);
    });
  });

  rootEl.querySelectorAll("[data-play-int-desc]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const semi = parseInt(btn.dataset.playIntDesc, 10);
      audioEngine.playStep(["C5"], 0.55, null, "interval");
      audioEngine.registerTimer(() => {
        audioEngine.playStep([midiToNote(72 - semi)], 0.95, null, "interval");
      }, 600);
    });
  });

  rootEl.querySelectorAll("[data-play-int-harm]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const semi = parseInt(btn.dataset.playIntHarm, 10);
      audioEngine.playStep(["C4", midiToNote(60 + semi)], 1.3, null, "interval-harmonic");
    });
  });

  rootEl.querySelectorAll("[data-play-interval-mel]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const def = HARMONIC_DATA.intervals[btn.dataset.playIntervalMel];
      if (!def) return;
      audioEngine.playStep(["C4"], 0.55, null, "interval");
      audioEngine.registerTimer(() => {
        audioEngine.playStep([midiToNote(60 + def.semitones)], 0.95, null, "interval");
      }, 600);
    });
  });

  rootEl.querySelectorAll("[data-play-interval-harm]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const def = HARMONIC_DATA.intervals[btn.dataset.playIntervalHarm];
      if (!def) return;
      audioEngine.playStep(["C4", midiToNote(60 + def.semitones)], 1.3, null, "interval-harmonic");
    });
  });

  rootEl.querySelectorAll("[data-play-progression]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const degrees = btn.dataset.playProgression.split(",");
      const customStepMs = parseInt(btn.dataset.stepMs || "", 10);
      const customDur = parseFloat(btn.dataset.chordDur || "");
      const stepMs = Number.isFinite(customStepMs) && customStepMs > 0
        ? customStepMs
        : (degrees.length >= 6 ? 880 : 1050);
      const chordDur = Number.isFinite(customDur) && customDur > 0
        ? customDur
        : (degrees.length >= 6 ? 0.80 : 0.95);
      degrees.forEach((degKey, idx) => {
        audioEngine.registerTimer(() => {
          const def = HARMONIC_DATA.degrees[degKey];
          if (!def) return;
          const n = buildChordNotes(60, def);
          audioEngine.playStep(n.chordNotes, chordDur, n.bassNote, "cadence");
        }, idx * stepMs);
      });
    });
  });

  rootEl.querySelectorAll("[data-play-note]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      audioEngine.playStep(["C2", btn.dataset.playNote], 1.15, "C2", "interval");
    });
  });

  rootEl.querySelectorAll("[data-play-solo-note]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const note = btn.dataset.playSoloNote;
      if (note) {
        audioEngine.playStep([note], 1.15, null, "interval");
      }
    });
  });

  rootEl.querySelectorAll("[data-play-freqs]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const freqs = btn.dataset.playFreqs.split(",").map(Number).filter(f => !Number.isNaN(f) && f > 0);
      if (!freqs.length) return;
      const osc = btn.dataset.osc || "sine";
      const dur = parseFloat(btn.dataset.dur) || 1.8;
      const seqStepMs = parseInt(btn.dataset.seqStep, 10);

      if (seqStepMs > 0) {
        freqs.forEach((f, idx) => {
          audioEngine.registerTimer(() => {
            audioEngine.playFrequencies([f], dur, osc);
          }, idx * seqStepMs);
        });
      } else {
        audioEngine.playFrequencies(freqs, dur, osc);
      }
    });
  });

  rootEl.querySelectorAll("[data-play-rhythm]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const pattern = typeof RHYTHM_KNOWLEDGE_PATTERNS !== "undefined"
        ? RHYTHM_KNOWLEDGE_PATTERNS[btn.dataset.playRhythm]
        : null;
      if (pattern) {
        audioEngine.playRhythmSequence(pattern);
      }
    });
  });

  // Funktionales Solfège-Hörbeispiel im Wissens-Modul (gekoppelt an die aktuelle Tempovorgabe state.settings.bpm):
  // 1. Ruhige Kadenz (I - vi - IV - V) -> 2. Deutliche Pause -> 3. Gesuchter Ton -> 4. Pause -> 5. Ruhige Auflösung zur Tonika
  rootEl.querySelectorAll("[data-play-solfege-functional]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();

      const semi = parseInt(btn.dataset.playSolfegeFunctional, 10);
      const resolvePath = btn.dataset.resolvePath.split(",").map(Number);
      const cadenceDegrees = ["I", "vi", "IV", "V"];

      const beatSec = 60 / (state.settings.bpm || 90);
      const chordSec = beatSec * 1.45;
      const chordStepMs = Math.round(chordSec * 1000);
      const pauseAfterCadenceMs = Math.round(beatSec * 1.35 * 1000);

      // 1. Kadenz I - vi - IV - V
      cadenceDegrees.forEach((degKey, idx) => {
        audioEngine.registerTimer(() => {
          const n = buildChordNotes(60, HARMONIC_DATA.degrees[degKey]);
          audioEngine.playStep(n.chordNotes, chordSec * 0.88, n.bassNote, "cadence");
        }, idx * chordStepMs);
      });

      // 2. Nach deutlicher Pause: der jeweilige Solfège-Ton
      const toneStartMs = cadenceDegrees.length * chordStepMs + pauseAfterCadenceMs;
      audioEngine.registerTimer(() => {
        audioEngine.playStep([midiToNote(60 + semi)], 1.05, null, "interval");
      }, toneStartMs);

      // 3. Nach kurzer Pause: Ruhige stufenweise Auflösung zur Tonika (Do-Fa abwärts, Sol-Ti aufwärts)
      const resolveStartMs = toneStartMs + 1450;
      const resolveStepMs = Math.round(beatSec * 0.92 * 1000);
      resolvePath.forEach((stepSemi, idx) => {
        audioEngine.registerTimer(() => {
          const isLast = idx === resolvePath.length - 1;
          audioEngine.playStep([midiToNote(60 + stepSemi)], isLast ? 1.15 : 0.52, null, "interval");
        }, resolveStartMs + idx * resolveStepMs);
      });
    });
  });

  rootEl.querySelectorAll("[data-play-custom]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const type = btn.dataset.playCustom;

      if (type === "scale-unresolved") {
        const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
        notes.forEach((n, i) => {
          audioEngine.registerTimer(() => {
            audioEngine.playStep([n], i === 6 ? 1.3 : 0.35, null, "interval");
          }, i * 380);
        });
      } else if (type === "leading-tone") {
        audioEngine.playStep(["B4"], 0.7, "G2", "cadence");
        audioEngine.registerTimer(() => {
          audioEngine.playStep(["C5"], 1.2, "C3", "cadence");
        }, 750);
      } else if (type === "tritone-collapse") {
        audioEngine.playStep(["F4", "B4"], 0.95, "G2", "cadence");
        audioEngine.registerTimer(() => {
          audioEngine.playStep(["E4", "C5"], 1.3, "C3", "cadence");
        }, 1000);
      } else if (type === "plagal-major") {
        const seq = [
          { notes: ["C4", "E4", "G4"], bass: "C3" },
          { notes: ["F4", "A4", "C5"], bass: "F2" },
          { notes: ["C4", "E4", "G4"], bass: "C3" }
        ];
        seq.forEach((s, i) => {
          audioEngine.registerTimer(() => audioEngine.playStep(s.notes, 1.0, s.bass, "cadence"), i * 1050);
        });
      } else if (type === "plagal-minor") {
        const seq = [
          { notes: ["C4", "E4", "G4"], bass: "C3" },
          { notes: ["F4", "A4", "C5"], bass: "F2" },
          { notes: ["F4", "G#4", "C5"], bass: "F2" },
          { notes: ["C4", "E4", "G4"], bass: "C3" }
        ];
        seq.forEach((s, i) => {
          audioEngine.registerTimer(() => audioEngine.playStep(s.notes, 1.0, s.bass, "cadence"), i * 1050);
        });
      } else if (type === "overtone-series") {
        const overtones = ["C2", "C3", "G3", "C4", "E4", "G4", "A#4", "C5"];
        overtones.forEach((n, i) => {
          audioEngine.registerTimer(() => {
            audioEngine.playStep([n], 0.55, i === 0 ? "C2" : null, "interval");
          }, i * 480);
        });
      } else if (type === "context-c") {
        const cMaj = buildChordNotes(60, HARMONIC_DATA.degrees["I"]);
        audioEngine.playStep(cMaj.chordNotes, 0.9, cMaj.bassNote, "cadence");
        audioEngine.registerTimer(() => audioEngine.playStep(["E4"], 1.2, null, "interval"), 1000);
      } else if (type === "context-f") {
        const fMaj = buildChordNotes(65, HARMONIC_DATA.degrees["I"]);
        audioEngine.playStep(fMaj.chordNotes, 0.9, fMaj.bassNote, "cadence");
        audioEngine.registerTimer(() => audioEngine.playStep(["E4"], 1.2, null, "interval"), 1000);
      } else if (type === "isol-maj7") {
        audioEngine.playStep(["C4", "B4"], 1.45, null, "interval");
      } else if (type === "chord-maj7") {
        audioEngine.playStep(["C4", "E4", "G4", "B4"], 1.75, "C3", "cadence");
      } else if (type === "key-variant") {
        const seq = [
          { notes: ["C4", "E4", "G4"], bass: "C3" },
          { notes: ["G3", "B3", "D4"], bass: "G2" },
          { notes: ["C4", "Eb4", "G4"], bass: "C3" },
          { notes: ["G3", "B3", "D4"], bass: "G2" }
        ];
        seq.forEach((s, i) => {
          audioEngine.registerTimer(() => audioEngine.playStep(s.notes, 0.9, s.bass, "cadence"), i * 850);
        });
      } else if (type === "key-mediant") {
        const seq = [
          { notes: ["C4", "E4", "G4"], bass: "C3" },
          { notes: ["Ab3", "C4", "Eb4"], bass: "Ab2" },
          { notes: ["C4", "E4", "G4"], bass: "C3" }
        ];
        seq.forEach((s, i) => {
          audioEngine.registerTimer(() => audioEngine.playStep(s.notes, 1.0, s.bass, "cadence"), i * 950);
        });
      } else if (type === "sp-drone") {
        audioEngine.playStep(["C3", "G3"], 3.8, "C2", "cadence");
        const mel = ["E4", "G4", "A4", "G4", "E4", "C4"];
        mel.forEach((n, idx) => {
          audioEngine.registerTimer(() => {
            audioEngine.playStep([n], idx === mel.length - 1 ? 1.0 : 0.45, null, "cadence");
          }, 500 + idx * 520);
        });
      } else if (type === "sp-syncopation") {
        const beatMs = 620;
        const clickEvts = [0, 1, 2, 3, 4, 5, 6, 7].map(i => [
          i * beatMs,
          i % 4 === 0 ? "accent" : "tick",
          i % 4 === 0 ? 0.9 : 0.65
        ]);
        audioEngine.playRhythmSequence(clickEvts);
        // Gesangseinsatz bewusst vorgezogen auf "und" (zwischen den Schlägen)
        [
          { ms: Math.round(beatMs * 3.5), notes: ["E4"], dur: 0.35 },
          { ms: Math.round(beatMs * 4.5), notes: ["G4"], dur: 0.45 },
          { ms: Math.round(beatMs * 5.5), notes: ["F4"], dur: 0.35 },
          { ms: Math.round(beatMs * 6.0), notes: ["E4"], dur: 0.65 }
        ].forEach(step => {
          audioEngine.registerTimer(() => {
            audioEngine.playStep(step.notes, step.dur, null, "cadence");
          }, step.ms);
        });
      } else if (type === "sp-poly") {
        const prog = [
          { bass: "C2", top: ["G4"] },
          { bass: "F2", top: ["G4"] },
          { bass: "G2", top: ["G4"] },
          { bass: "C2", top: ["G4"] }
        ];
        prog.forEach((s, idx) => {
          audioEngine.registerTimer(() => {
            audioEngine.playStep(s.top, 0.85, s.bass, "cadence");
          }, idx * 920);
        });
      } else if (type === "talk-dense") {
        audioEngine.playStep(["C3", "D3", "E3", "G3", "A3"], 1.55, "C3", "cadence");
      } else if (type === "talk-open") {
        audioEngine.playStep(["C3", "G3", "D4", "A4", "E5"], 1.85, "C2", "cadence");
      } else if (type === "talk-warm") {
        audioEngine.playStep(["F3", "A3", "C4", "E4"], 2.0, "F2", "cadence");
      } else if (type === "talk-sharp") {
        ["E5", "B5", "F5", "C6"].forEach((n, idx) => {
          audioEngine.registerTimer(() => {
            audioEngine.playStep([n], 0.16, null, "interval");
          }, idx * 170);
        });
      } else if (type === "talk-drive") {
        const driveEvts = [
          [0, "kick", 0.92], [180, "hat", 0.55], [360, "snare", 0.85], [540, "hat", 0.55],
          [720, "kick", 0.92], [900, "hat", 0.58], [1080, "snare", 0.88], [1260, "kick", 0.72], [1440, "hat", 0.65]
        ];
        audioEngine.playRhythmSequence(driveEvts);
        [
          { ms: 0, n: "C3" }, { ms: 360, n: "Eb3" }, { ms: 720, n: "G3" }, { ms: 1080, n: "Bb3" }, { ms: 1440, n: "C4" }
        ].forEach(p => {
          audioEngine.registerTimer(() => {
            audioEngine.playStep([p.n], 0.22, null, "interval");
          }, p.ms);
        });
      } else if (type === "talk-float") {
        audioEngine.playStep(["D4", "A4", "E5"], 1.75, null, "cadence");
        audioEngine.registerTimer(() => {
          audioEngine.playStep(["C4", "G4", "D5"], 1.95, null, "cadence");
        }, 1250);
      } else if (type === "arr-sketch") {
        // Nackte Skizze: nur einzelne Melodie + trockener Grundton
        const steps = [
          { ms: 0,    notes: ["E4"], bass: "C2", dur: 0.75 },
          { ms: 850,  notes: ["G4"], bass: null, dur: 0.75 },
          { ms: 1700, notes: ["A4"], bass: "F2", dur: 0.75 },
          { ms: 2550, notes: ["G4"], bass: "G2", dur: 1.15 }
        ];
        steps.forEach(s => {
          audioEngine.registerTimer(() => audioEngine.playStep(s.notes, s.dur, s.bass, "interval"), s.ms);
        });
      } else if (type === "arr-full-layers") {
        // Volles 4-Schichten-Arrangement: Groove + Bass + Harmonie-Polster + Melodie & Antwort-Fill
        const grooveEvts = [
          [0, "kick", 0.85], [425, "hat", 0.45], [850, "snare", 0.78], [1275, "hat", 0.45],
          [1700, "kick", 0.85], [2125, "hat", 0.45], [2550, "snare", 0.8], [2975, "hat", 0.5]
        ];
        audioEngine.playRhythmSequence(grooveEvts);
        const steps = [
          { ms: 0,    notes: ["G3", "C4", "E4", "E5"], bass: "C2", dur: 0.82 },
          { ms: 850,  notes: ["G3", "B3", "D4", "G5"], bass: "E2", dur: 0.82 },
          { ms: 1700, notes: ["A3", "C4", "F4", "A5"], bass: "F2", dur: 0.82 },
          { ms: 2550, notes: ["G3", "C4", "D4", "G5"], bass: "G2", dur: 0.52 },
          { ms: 3000, notes: ["G3", "B3", "D4", "F5"], bass: null, dur: 0.65 }
        ];
        steps.forEach(s => {
          audioEngine.registerTimer(() => audioEngine.playStep(s.notes, s.dur, s.bass, "cadence"), s.ms);
        });
      } else if (type === "arr-voicing-muddy") {
        // Matschiges Voicing: enge Terzen tief im Bassregister (C2-E2-G2-B2-C3)
        audioEngine.playStep(["C2", "E2", "G2", "B2", "C3"], 1.9, "C2", "cadence");
      } else if (type === "arr-voicing-open") {
        // Offenes Studio-Voicing: Oktave/Quinte unten, warme Terz & Septime luftig oben (C2-G2-E3-B3-D4-G4)
        audioEngine.playStep(["G3", "E4", "B4", "D5", "G5"], 2.1, "C2", "cadence");
      } else if (type === "arr-call-response") {
        // Call & Response: Melodie ruft (Takt 1), Begleit-Lick antwortet in der Gesangspause (Takt 2)
        [
          { ms: 0,    notes: ["E5"], bass: "C3", dur: 0.42 },
          { ms: 440,  notes: ["G5"], bass: null, dur: 0.42 },
          { ms: 880,  notes: ["A5"], bass: "F2", dur: 0.85 },
          // Antwort-Lick in der tieferen Lage während die Hauptstimme pausiert:
          { ms: 1850, notes: ["C4", "E4"], bass: null, dur: 0.32 },
          { ms: 2200, notes: ["D4", "F4"], bass: null, dur: 0.32 },
          { ms: 2550, notes: ["E4", "G4"], bass: "C3", dur: 0.95 }
        ].forEach(s => {
          audioEngine.registerTimer(() => audioEngine.playStep(s.notes, s.dur, s.bass, "cadence"), s.ms);
        });
      } else if (type === "arr-counterpoint") {
        // Gegenläufiger Kontrapunkt: Obere Melodie steigt (C5 -> D5 -> E5 -> G5), untere Gegenstimme fällt (E4 -> D4 -> C4 -> B3)
        [
          { ms: 0,    notes: ["E4", "C5"], bass: "C3", dur: 0.72 },
          { ms: 780,  notes: ["D4", "D5"], bass: "B2", dur: 0.72 },
          { ms: 1560, notes: ["C4", "E5"], bass: "A2", dur: 0.72 },
          { ms: 2340, notes: ["B3", "G5"], bass: "G2", dur: 1.15 }
        ].forEach(s => {
          audioEngine.registerTimer(() => audioEngine.playStep(s.notes, s.dur, s.bass, "cadence"), s.ms);
        });
      } else if (type === "arr-reharm-plain") {
        // Dieselbe Melodie (E5 - D5 - C5) über schlichten Grunddreiklängen (C - G - C)
        [
          { ms: 0,    notes: ["G3", "C4", "E5"], bass: "C3", dur: 0.9 },
          { ms: 980,  notes: ["G3", "B3", "D5"], bass: "G2", dur: 0.9 },
          { ms: 1960, notes: ["E3", "G3", "C5"], bass: "C3", dur: 1.35 }
        ].forEach(s => {
          audioEngine.registerTimer(() => audioEngine.playStep(s.notes, s.dur, s.bass, "cadence"), s.ms);
        });
      } else if (type === "arr-reharm-cinema") {
        // Exakt dieselbe Melodie (E5 - D5 - C5) über cineastischer Reharmonisation (Fmaj7 - Fm6 - Am9)
        [
          { ms: 0,    notes: ["A3", "C4", "E4", "E5"], bass: "F2", dur: 0.95 },
          { ms: 1020, notes: ["Ab3", "C4", "D4", "D5"], bass: "F2", dur: 0.95 },
          { ms: 2040, notes: ["G3", "B3", "E4", "C5"], bass: "A2", dur: 1.45 }
        ].forEach(s => {
          audioEngine.registerTimer(() => audioEngine.playStep(s.notes, s.dur, s.bass, "cadence"), s.ms);
        });
      } else if (type.startsWith("culture-")) {
        const playMicroSteps = (steps, oscType = "triangle", lvl = 0.24) => {
          steps.forEach(s => {
            audioEngine.registerTimer(() => {
              audioEngine.playFrequencies(
                Array.isArray(s.f) ? s.f : [s.f],
                s.dur || 0.52,
                s.osc || oscType,
                s.lvl || lvl
              );
            }, s.ms);
          });
        };
        if (type === "culture-maqam-rast") {
          // Grundton-Bordun C3 + Maqam Rast auf C mit echten 3/4-Tönen (Eb+ ~350 ct = 320.24 Hz, Bb+ ~1050 ct = 479.82 Hz)
          audioEngine.playFrequencies([130.81], 5.6, "triangle", 0.12);
          playMicroSteps([
            { ms: 0,    f: 261.63, dur: 0.55 }, // C4 (Rast)
            { ms: 380,  f: 293.66, dur: 0.42 }, // D4 (Dukah)
            { ms: 760,  f: 320.24, dur: 0.62 }, // Eb+ (Sikah ~350 ct)
            { ms: 1220, f: 349.23, dur: 0.42 }, // F4 (Jaharkah)
            { ms: 1600, f: 392.00, dur: 0.45 }, // G4 (Nawa)
            { ms: 1980, f: 440.00, dur: 0.42 }, // A4 (Husayni)
            { ms: 2360, f: 479.82, dur: 0.55 }, // Bb+ (~1050 ct)
            { ms: 2780, f: 523.25, dur: 0.68 }, // C5 (Kardan)
            { ms: 3400, f: 392.00, dur: 0.36 }, // G4
            { ms: 3740, f: 349.23, dur: 0.36 }, // F4
            { ms: 4080, f: 320.24, dur: 0.55 }, // Eb+ (neutral 3rd)
            { ms: 4540, f: 293.66, dur: 0.38 }, // D4
            { ms: 4920, f: 261.63, dur: 0.95 }  // C4
          ], "triangle", 0.25);
        } else if (type === "culture-maqam-contrast") {
          // Direkter Vergleich über C: 1) Westliche Durterz (400 ct), 2) Arabische neutrale Terz Eb+ (350 ct), 3) Westliche Mollterz (300 ct)
          playMicroSteps([
            { ms: 0,    f: [130.81, 261.63, 329.63], dur: 1.05, lvl: 0.26 },
            { ms: 1350, f: [130.81, 261.63, 320.24], dur: 1.15, lvl: 0.26 },
            { ms: 2800, f: [130.81, 261.63, 311.13], dur: 1.05, lvl: 0.26 }
          ], "triangle", 0.26);
        } else if (type === "culture-maqam-bayati") {
          // Maqam Bayati auf D4 mit ~150-ct-Sekunde Eb+ (320.24 Hz über 293.66 Hz)
          audioEngine.playFrequencies([146.83], 3.9, "triangle", 0.12);
          playMicroSteps([
            { ms: 0,    f: 293.66, dur: 0.48 },
            { ms: 380,  f: 320.24, dur: 0.55 },
            { ms: 820,  f: 349.23, dur: 0.42 },
            { ms: 1220, f: 392.00, dur: 0.58 },
            { ms: 1760, f: 349.23, dur: 0.38 },
            { ms: 2140, f: 320.24, dur: 0.62 },
            { ms: 2680, f: 293.66, dur: 0.95 }
          ], "triangle", 0.25);
        } else if (type === "culture-raga-bhairav") {
          // Tanpura-Drone C3 + G3 unter Raga Bhairav in reiner 22-Shruti-Intonation (Ati-Komal Re 275.62 Hz, Ga 5:4, Ma 4:3, Pa 3:2, Komal Dha 413.43 Hz, Ni 15:8)
          audioEngine.playFrequencies([130.81, 196.22], 5.9, "triangle", 0.14);
          playMicroSteps([
            { ms: 250,  f: 261.63, dur: 0.45 }, // Sa
            { ms: 650,  f: 275.62, dur: 0.55 }, // Komal Re (256:243)
            { ms: 1120, f: 327.03, dur: 0.45 }, // Shuddha Ga (5:4)
            { ms: 1520, f: 348.83, dur: 0.42 }, // Shuddha Ma (4:3)
            { ms: 1920, f: 392.44, dur: 0.52 }, // Pa (3:2)
            { ms: 2400, f: 413.43, dur: 0.52 }, // Komal Dha
            { ms: 2860, f: 490.55, dur: 0.42 }, // Shuddha Ni (15:8)
            { ms: 3260, f: 523.25, dur: 0.65 }, // Tar Sa
            { ms: 3880, f: 413.43, dur: 0.42 }, // Komal Dha
            { ms: 4280, f: 392.44, dur: 0.42 }, // Pa
            { ms: 4680, f: 327.03, dur: 0.42 }, // Ga
            { ms: 5060, f: 275.62, dur: 0.48 }, // Komal Re
            { ms: 5480, f: 261.63, dur: 0.95 }  // Sa
          ], "triangle", 0.24);
        } else if (type === "culture-gamelan-slendro") {
          // Indonesisches Slendro: ~5 gleichmäßige 240-Cent-Stufen pro Oktave
          playMicroSteps([
            { ms: 0,    f: 261.63, dur: 0.55 },
            { ms: 400,  f: 300.53, dur: 0.55 },
            { ms: 800,  f: 345.21, dur: 0.55 },
            { ms: 1200, f: 396.54, dur: 0.55 },
            { ms: 1600, f: 455.50, dur: 0.55 },
            { ms: 2000, f: 523.25, dur: 0.65 },
            { ms: 2560, f: 455.50, dur: 0.45 },
            { ms: 2940, f: 396.54, dur: 0.45 },
            { ms: 3320, f: 345.21, dur: 0.50 },
            { ms: 3740, f: 261.63, dur: 0.85 }
          ], "sine", 0.26);
        } else if (type === "culture-gamelan-ombak") {
          // Gamelan Ombak ("Welle"): paarweise ~7 Hz verstimmte Bronzeklänge erzeugen Schwebung
          playMicroSteps([
            { ms: 0,    f: [392.00, 399.00], dur: 1.55, osc: "sine", lvl: 0.27 },
            { ms: 1450, f: [440.00, 447.00], dur: 1.55, osc: "sine", lvl: 0.27 },
            { ms: 2900, f: [523.25, 530.25], dur: 1.85, osc: "sine", lvl: 0.27 }
          ], "sine", 0.27);
        } else if (type === "culture-westafrica-poly") {
          // 12/8 Standard-Glocken-Timeline (0,2,4,5,7,9,11) + 4-Beat-Fuss-Puls (0,3,6,9) + 3-Cross-Claps (0,4,8)
          const stepMs = 175;
          const evts = [];
          for (let bar = 0; bar < 2; bar++) {
            const offset = bar * 12 * stepMs;
            [0, 2, 4, 5, 7, 9, 11].forEach(p => evts.push([offset + p * stepMs, "cowbell", p === 0 ? 0.82 : 0.62]));
            [0, 3, 6, 9].forEach(p => evts.push([offset + p * stepMs, "kick", p === 0 ? 0.92 : 0.72]));
            [0, 4, 8].forEach(p => evts.push([offset + p * stepMs, "snare", 0.58]));
          }
          audioEngine.playRhythmSequence(evts);
          [
            { ms: 0,              n: ["C4"] },
            { ms: 4 * stepMs,     n: ["E4"] },
            { ms: 7 * stepMs,     n: ["G4"] },
            { ms: 12 * stepMs,    n: ["A4"] },
            { ms: 16 * stepMs,    n: ["G4"] },
            { ms: 19 * stepMs,    n: ["E4"] },
            { ms: 21 * stepMs,    n: ["C4", "G4"] }
          ].forEach(m => {
            audioEngine.registerTimer(() => {
              audioEngine.playStep(m.n, 0.34, null, "interval");
            }, m.ms);
          });
        }
      }
    });
  });

  rootEl.querySelectorAll("[data-play-inst]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const style = btn.dataset.style || "piano";
      const notes = (btn.dataset.notes || "").split(",").map(s => s.trim()).filter(Boolean);
      const dur = parseFloat(btn.dataset.dur || "1.35");
      const stepMs = parseInt(btn.dataset.step || "0", 10);
      audioEngine.playInstrumentSample(style, notes, dur, stepMs);
    });
  });

  rootEl.querySelectorAll("[data-play-mode-scale]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const modeObj = typeof MODES_ENCYCLOPEDIA !== "undefined"
        ? MODES_ENCYCLOPEDIA.find(m => m.id === btn.dataset.playModeScale)
        : null;
      if (!modeObj) return;
      const notes = modeObj.notes.split(",").map(s => s.trim()).filter(Boolean);
      const currentId = audioEngine.playbackId;
      audioEngine.playStep([], 2.9, "C3", "cadence");
      notes.forEach((n, idx) => {
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== currentId) return;
          const isLast = idx === notes.length - 1;
          audioEngine.playStep([n], isLast ? 0.95 : 0.34, null, "interval");
        }, idx * 320);
      });
    });
  });

  rootEl.querySelectorAll("[data-play-mode-vamp]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const modeObj = typeof MODES_ENCYCLOPEDIA !== "undefined"
        ? MODES_ENCYCLOPEDIA.find(m => m.id === btn.dataset.playModeVamp)
        : null;
      if (!modeObj?.vampChords?.length) return;
      const currentId = audioEngine.playbackId;
      modeObj.vampChords.forEach((ch, idx) => {
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== currentId) return;
          const bassNote = ch[0];
          const upper = ch.slice(1);
          audioEngine.playStep(upper, 0.88, bassNote, "cadence");
        }, idx * 920);
      });
    });
  });

  rootEl.querySelectorAll("[data-play-key-cadence]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const rootMidi = parseInt(btn.dataset.playKeyCadence || "60", 10);
      const keyMode = btn.dataset.keyMode === "minor" ? "minor" : "major";
      const prog = keyMode === "minor"
        ? [
            { rootOff: 0,  triad: [0, 3, 7] },
            { rootOff: 5,  triad: [5, 8, 12] },
            { rootOff: 7,  triad: [7, 11, 14] },
            { rootOff: 0,  triad: [0, 3, 7] }
          ]
        : [
            { rootOff: 0,  triad: [0, 4, 7] },
            { rootOff: 5,  triad: [5, 9, 12] },
            { rootOff: 7,  triad: [7, 11, 14] },
            { rootOff: 0,  triad: [0, 4, 7] }
          ];
      const currentId = audioEngine.playbackId;
      prog.forEach((step, idx) => {
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== currentId) return;
          const chordNotes = step.triad.map(off => midiToNote(rootMidi + off));
          const bassNote = midiToNote(rootMidi + step.rootOff - 12);
          audioEngine.playStep(chordNotes, idx === 3 ? 0.95 : 0.65, bassNote, "cadence");
        }, idx * 720);
      });
    });
  });

  rootEl.querySelectorAll("[data-play-cof-chord]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const midis = String(btn.dataset.playCofChord || "").split(",").map(Number).filter(n => !Number.isNaN(n));
      if (!midis.length) return;
      const bassMidi = parseInt(btn.dataset.cofBass || "", 10);
      const chordNotes = midis.map(midiToNote);
      const bassNote = !Number.isNaN(bassMidi) ? midiToNote(bassMidi) : null;
      audioEngine.playStep(chordNotes, 1.05, bassNote, "cadence");
    });
  });

  rootEl.querySelectorAll("[data-play-cof-scale]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const midis = String(btn.dataset.playCofScale || "").split(",").map(Number).filter(n => !Number.isNaN(n));
      if (!midis.length) return;
      const currentId = audioEngine.playbackId;
      midis.forEach((m, idx) => {
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== currentId) return;
          const isLast = idx === midis.length - 1;
          audioEngine.playStep([midiToNote(m)], isLast ? 0.9 : 0.34, null, "interval");
        }, idx * 290);
      });
    });
  });

  rootEl.querySelectorAll("[data-play-cof-mod]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const baseMidi = parseInt(btn.dataset.playCofMod || "60", 10);
      const keyMode = btn.dataset.keyMode === "minor" ? "minor" : "major";
      const bassFor = m => midiToNote(m >= 58 ? m - 12 : m);
      const prog = keyMode === "minor"
        ? [
            { chord: [0, 3, 7], bass: 0 },
            { chord: [5, 8, 12], bass: 5 },
            { chord: [5, 7, 11, 14], bass: 10 },
            { chord: [3, 7, 12], bass: 3 }
          ]
        : [
            { chord: [0, 4, 7], bass: 0 },
            { chord: [0, 4, 9], bass: 9 },
            { chord: [0, 2, 6, 9], bass: 2 },
            { chord: [-1, 2, 7], bass: 7 }
          ];
      const currentId = audioEngine.playbackId;
      prog.forEach((step, idx) => {
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== currentId) return;
          const chordNotes = step.chord.map(o => midiToNote(baseMidi + o));
          const bassNote = bassFor(baseMidi + step.bass);
          audioEngine.playStep(chordNotes, idx === 3 ? 1.05 : 0.68, bassNote, "cadence");
        }, idx * 780);
      });
    });
  });
}

/**
 * Baut die Auswahl-Unterseite (#viewCategory) für den gewählten Übungstyp auf
 */
// Einsteiger-Übungen (zentral gepflegt): Schlüssel siehe getExerciseNodeKey()
const BEGINNER_EXERCISES = new Set([
  "cadence:1:last",
  "interval-melodic:1",
  "interval-melodic-down:1",
  "interval-harmonic:1",
  "interval-drone:1",
  "chord-arp-up:1",
  "chord-arp-down:1",
  "interval-chords:1",
  "melody:do-fa:fixed:single",
  "solfege:1",
  "rhythm-meter:1",
  "rhythm-dictation:1",
  "rhythm-tap:1",
  "notation-treble:1"
]);

function getExerciseNodeKey(btn) {
  const d = btn?.dataset || {};
  if (d.launchCadence) return `cadence:${d.launchCadence}:${d.cadencePos}`;
  if (d.launchInt) return `${d.launchInt}:${d.intLvl}`;
  if (d.launchChord) return `${d.launchChord}:${d.chordLvl}`;
  if (d.launchMelody) return `melody:${d.launchMelody}:${d.melodyKey}:${d.melodyOctave}`;
  if (d.launchSolfege) return `solfege:${d.launchSolfege}`;
  if (d.launchRhythm) return `${d.launchRhythm}:${d.rhythmLvl}`;
  if (d.launchProd) return `${d.launchProd}:${d.prodLvl}`;
  if (d.launchModes) return `${d.launchModes}:${d.modesLvl}`;
  if (d.launchNotation) return `${d.launchNotation}:${d.notationLvl}`;
  return null;
}

function markBeginnerExerciseNodes(container) {
  if (!container) return;
  const label = escapeHtml(tr("Einsteiger", "Beginner"));
  container.querySelectorAll(".subpage-node-btn").forEach(btn => {
    if (!BEGINNER_EXERCISES.has(getExerciseNodeKey(btn))) return;
    if (btn.querySelector(".node-beginner-badge")) return;
    btn.classList.add("is-beginner");
    btn.insertAdjacentHTML("beforeend", `<span class="node-beginner-badge">${label}</span>`);
  });
}

function openCategoryPage(categoryKey, options = {}) {
  state.activeCategory = categoryKey;
  const container = document.getElementById("categoryPageContent");
  if (!container) return;

  if (categoryKey === "cadence") {
    const CADENCE_LEVELS = [
      { level: 1, circle: "circle-sage",  badge: "I–V",   title: tr("Stufe 1: Basis", "Level 1: Basics"),              sub: tr("I, IV, V und vi", "I, IV, V & vi") },
      { level: 2, circle: "circle-sage",  badge: "ii–vi", title: tr("Stufe 2: Diatonisch", "Level 2: Diatonic"),       sub: tr("Alle leitereigenen Stufen", "All diatonic scale degrees") },
      { level: 3, circle: "circle-peach", badge: "V/V",   title: tr("Stufe 3: Erweitert", "Level 3: Extended"),        sub: tr("Mit Sekundärdominante & V7", "With secondary dominant & V7") },
      { level: 4, circle: "circle-lilac", badge: "bII7",  title: tr("Stufe 4: Jazz & Tritone", "Level 4: Jazz & Tritone"), sub: tr("Inklusive Tritonussubstitution", "Including tritone substitution") }
    ];

    const renderCadenceSection = (posMode, title, desc) => `
      <div class="subpage-section">
        <h3 class="subpage-section-title">${title}</h3>
        <p class="subpage-section-desc">${desc}</p>
        <div class="subpage-nodes-grid">
          ${CADENCE_LEVELS.map(lv => `
            <button class="subpage-node-btn" data-launch-cadence="${lv.level}" data-cadence-pos="${posMode}">
              <div class="node-circle ${lv.circle}">
                ${lv.badge}
                ${posMode === "random" ? `<span class="node-random-badge" title="${tr("Zufälliger Takt", "Random Measure")}">?</span>` : ""}
              </div>
              <span class="node-title">${lv.title}</span>
              <span class="node-sub">${posMode === "random" ? `${lv.sub} ${tr("(Zufallstakt)", "(Random Bar)")}` : lv.sub}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    container.innerHTML =
      renderCadenceSection(
        "last",
        tr("Übungen zu Kadenzen • Ziel: Takt 4", "Cadence Exercises • Target: Bar 4"),
        tr("Höre drei Takte Kontext und bestimme die gesuchte 4. Stufe", "Listen to three bars of context and identify the missing 4th chord")
      ) +
      renderCadenceSection(
        "random",
        tr("Übungen zu Kadenzen • Zufälliger Takt", "Cadence Exercises • Random Bar"),
        tr("Die fehlende Stufe steht an einer zufälligen Stelle (Takt 1–4)", "The missing chord appears in a random position (Bars 1–4)")
      );

    container.querySelectorAll("[data-launch-cadence]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.setMode("cadence");
        state.setDifficulty(btn.dataset.launchCadence);
        state.setCadencePos(btn.dataset.cadencePos);
        state.exerciseReturnView = "category";
        switchView("exercise");
      });
    });

  } else if (categoryKey === "interval") {
    container.innerHTML = `
      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("Melodische Intervalle (Aufwärts)", "Melodic Intervals (Ascending)")}</h3>
        <p class="subpage-section-desc">${tr("Zwei Töne erklingen nacheinander vom zufälligen Ausgangston nach oben", "Two notes played sequentially upward from a random reference pitch")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-int="interval-melodic" data-int-lvl="1">
            <div class="node-circle circle-peach">1↗5</div>
            <span class="node-title">${tr("Stufe 1: Einsteiger", "Level 1: Beginner")}</span>
            <span class="node-sub">${tr("Prime, gr. Terz, Quinte, Oktave", "Unison, Maj 3rd, 5th & Octave")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-int="interval-melodic" data-int-lvl="2">
            <div class="node-circle circle-peach">${tr("Dur ↗", "Maj ↗")}</div>
            <span class="node-title">${tr("Stufe 2: Dur-Tonleiter", "Level 2: Major Scale")}</span>
            <span class="node-sub">${tr("8 diatonische Intervalle", "8 diatonic intervals")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-int="interval-melodic" data-int-lvl="3">
            <div class="node-circle circle-peach">${tr("Alle ↗", "All ↗")}</div>
            <span class="node-title">${tr("Stufe 3: Chromatisch", "Level 3: Chromatic")}</span>
            <span class="node-sub">${tr("Alle 15 Intervalle bis zur None", "All 15 intervals up to a 9th")}</span>
          </button>
        </div>
      </div>

      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("Melodische Intervalle (Abwärts)", "Melodic Intervals (Descending)")}</h3>
        <p class="subpage-section-desc">${tr("Zwei Töne erklingen nacheinander vom zufälligen Ausgangston nach unten", "Two notes played sequentially downward from a random reference pitch")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-int="interval-melodic-down" data-int-lvl="1">
            <div class="node-circle circle-peach">1↘5</div>
            <span class="node-title">${tr("Stufe 1: Einsteiger", "Level 1: Beginner")}</span>
            <span class="node-sub">${tr("Prime, gr. Terz, Quinte, Oktave", "Unison, Maj 3rd, 5th & Octave")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-int="interval-melodic-down" data-int-lvl="2">
            <div class="node-circle circle-peach">${tr("Dur ↘", "Maj ↘")}</div>
            <span class="node-title">${tr("Stufe 2: Dur-Tonleiter", "Level 2: Major Scale")}</span>
            <span class="node-sub">${tr("8 diatonische Intervalle abwärts", "8 descending diatonic intervals")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-int="interval-melodic-down" data-int-lvl="3">
            <div class="node-circle circle-peach">${tr("Alle ↘", "All ↘")}</div>
            <span class="node-title">${tr("Stufe 3: Chromatisch", "Level 3: Chromatic")}</span>
            <span class="node-sub">${tr("Alle 15 Intervalle bis zur None", "All 15 intervals up to a 9th")}</span>
          </button>
        </div>
      </div>

      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("Harmonische Intervalle", "Harmonic Intervals")}</h3>
        <p class="subpage-section-desc">${tr("Beide Töne erklingen gleichzeitig als Zusammenklang", "Both notes sounded simultaneously in harmony")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-int="interval-harmonic" data-int-lvl="1">
            <div class="node-circle circle-lilac">1+5</div>
            <span class="node-title">${tr("Stufe 1: Einsteiger", "Level 1: Beginner")}</span>
            <span class="node-sub">${tr("Prime, gr. Terz, Quinte, Oktave", "Unison, Maj 3rd, 5th & Octave")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-int="interval-harmonic" data-int-lvl="2">
            <div class="node-circle circle-lilac">${tr("Dur", "Maj")}</div>
            <span class="node-title">${tr("Stufe 2: Dur-Tonleiter", "Level 2: Major Scale")}</span>
            <span class="node-sub">${tr("8 diatonische Intervalle", "8 diatonic intervals")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-int="interval-harmonic" data-int-lvl="3">
            <div class="node-circle circle-lilac">${tr("Alle", "All")}</div>
            <span class="node-title">${tr("Stufe 3: Chromatisch", "Level 3: Chromatic")}</span>
            <span class="node-sub">${tr("Alle 15 Intervalle bis zur None", "All 15 intervals up to a 9th")}</span>
          </button>
        </div>
      </div>

      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("Intervalle über Grundton-Fläche", "Intervals Over Root Pad")}</h3>
        <p class="subpage-section-desc">${tr("Eine warme Streicher-Fläche hält den Grundton – nach kurzer Verzögerung erklingt der gesuchte Intervallton auf dem Klavier darüber", "A warm strings pad sustains the root pitch — after a short delay, piano plays the target interval tone above it")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-int="interval-drone" data-int-lvl="1">
            <div class="node-circle circle-sage">1+5</div>
            <span class="node-title">${tr("Stufe 1: Einsteiger", "Level 1: Beginner")}</span>
            <span class="node-sub">${tr("Prime, gr. Terz, Quinte, Oktave", "Unison, Maj 3rd, 5th & Octave")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-int="interval-drone" data-int-lvl="2">
            <div class="node-circle circle-sage">${tr("Dur", "Maj")}</div>
            <span class="node-title">${tr("Stufe 2: Dur-Tonleiter", "Level 2: Major Scale")}</span>
            <span class="node-sub">${tr("8 diatonische Intervalle auf Teppich", "8 diatonic intervals over pad")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-int="interval-drone" data-int-lvl="3">
            <div class="node-circle circle-sage">${tr("Alle", "All")}</div>
            <span class="node-title">${tr("Stufe 3: Chromatisch", "Level 3: Chromatic")}</span>
            <span class="node-sub">${tr("Alle 15 Intervalle bis zur None", "All 15 intervals up to a 9th")}</span>
          </button>
        </div>
      </div>
    `;

    container.querySelectorAll("[data-launch-int]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.setMode(btn.dataset.launchInt);
        state.setIntervalDifficulty(btn.dataset.intLvl);
        state.exerciseReturnView = "category";
        switchView("exercise");
      });
    });

  } else if (categoryKey === "chords") {
    const CHORD_QUALITY_SECTIONS = [
      {
        mode: "chord-arp-up",
        circleClass: "circle-sage",
        title: tr("Akkord-Arpeggio (Aufwärts ↗)", "Chord Arpeggio (Ascending ↗)"),
        desc: tr("Akkordtöne erklingen nacheinander von unten nach oben – ideal zum Heraushören einzelner Terzen &amp; Septimen", "Chord tones roll upward note by note — ideal for hearing every 3rd, 5th &amp; 7th clearly")
      },
      {
        mode: "chord-arp-down",
        circleClass: "circle-lilac",
        title: tr("Akkord-Arpeggio (Abwärts ↘)", "Chord Arpeggio (Descending ↘)"),
        desc: tr("Akkordtöne erklingen nacheinander von oben nach unten", "Chord tones cascade downward from top to bottom")
      },
      {
        mode: "interval-chords",
        circleClass: "circle-peach",
        title: tr("Akkorde (Gleichzeitig)", "Chords (Simultaneous)"),
        desc: tr("Drei bis fünf Töne gleichzeitig als Vollklang – von einfachen Dreiklängen bis zu Jazz-Akkorden", "Three to five notes sounded together as one chord — from simple triads to jazz voicings")
      }
    ];
    const CHORD_QUALITY_LEVELS = [
      { lvl: 1, badge: "Δ",   title: tr("Stufe 1: Dreiklänge", "Level 1: Triads"),                            sub: tr("Dur, Moll, Vermindert &amp; Übermäßig", "Major, Minor, Diminished &amp; Augmented") },
      { lvl: 2, badge: "7",   title: tr("Stufe 2: Sept &amp; Sus", "Level 2: 7ths &amp; Sus"),                 sub: "+ sus4, Dom. 7, maj7 &amp; m7" },
      { lvl: 3, badge: "7♭5", title: tr("Stufe 3: Erweitert", "Level 3: Extended"),                            sub: tr("+ sus2, Halb- &amp; Vollverm., m(maj7)", "+ sus2, Half- &amp; Full-Dim, m(maj7)") },
      { lvl: 4, badge: "7♯9", title: tr("Stufe 4: Jazz &amp; Optionstöne", "Level 4: Jazz &amp; Tensions"),   sub: "+ maj9, 7♭9 &amp; 7♯9" }
    ];
    const renderQualitySection = (sec) => `
      <div class="subpage-section">
        <h3 class="subpage-section-title">${sec.title}</h3>
        <p class="subpage-section-desc">${sec.desc}</p>
        <div class="subpage-nodes-grid">
          ${CHORD_QUALITY_LEVELS.map(lv => `
            <button class="subpage-node-btn" data-launch-chord="${sec.mode}" data-chord-lvl="${lv.lvl}">
              <div class="node-circle ${sec.circleClass}">${lv.badge}</div>
              <span class="node-title">${lv.title}</span>
              <span class="node-sub">${lv.sub}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    container.innerHTML = `
      ${CHORD_QUALITY_SECTIONS.map(renderQualitySection).join("")}
      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("Akkordumkehrungen", "Chord Inversions")}</h3>
        <p class="subpage-section-desc">${tr("Erkenne, welcher Akkordton ganz unten im Bass liegt (Grundstellung, 1., 2. oder 3. Umkehrung)", "Identify which chord tone sits lowest in the bass (Root Position, 1st, 2nd or 3rd Inversion)")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-chord="chord-inversions" data-chord-lvl="1">
            <div class="node-circle circle-sage">1/3/5</div>
            <span class="node-title">${tr("Stufe 1: Dur-Dreiklang", "Level 1: Major Triad")}</span>
            <span class="node-sub">${tr("Grundstellung, 1. &amp; 2. Umkehrung", "Root Pos., 1st &amp; 2nd Inversion")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-chord="chord-inversions" data-chord-lvl="2">
            <div class="node-circle circle-sage">${tr("D/m", "M/m")}</div>
            <span class="node-title">${tr("Stufe 2: Dur &amp; Moll", "Level 2: Major &amp; Minor")}</span>
            <span class="node-sub">${tr("Beide Dreiklangsfarben gemischt", "Major &amp; minor triads mixed")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-chord="chord-inversions" data-chord-lvl="3">
            <div class="node-circle circle-sage">1–7</div>
            <span class="node-title">${tr("Stufe 3: Septakkorde (4)", "Level 3: 7th Chords (4)")}</span>
            <span class="node-sub">${tr("Vierstimmig inkl. 3. Umkehrung (Bass: 7)", "Four-note chords incl. 3rd Inv. (Bass: 7)")}</span>
          </button>
        </div>
      </div>
    `;

    container.querySelectorAll("[data-launch-chord]").forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.launchChord;
        state.setMode(mode);
        if (mode === "chord-inversions") {
          state.setChordInversionDifficulty(btn.dataset.chordLvl);
        } else {
          state.setChordDifficulty(btn.dataset.chordLvl);
        }
        state.exerciseReturnView = "category";
        switchView("exercise");
      });
    });

  } else if (categoryKey === "melody") {
    const activeStyle = ["steady", "rhythmic", "dictation"].includes(state.settings.melodyStyle)
      ? state.settings.melodyStyle
      : "rhythmic";
    const styleDefs = [
      {
        id: "rhythmic",
        title: tr("Rhythmische Melodie", "Rhythmic Melody"),
        sub: tr("4–6 Töne • Rhythmus sichtbar", "4–6 notes • Rhythm visible")
      },
      {
        id: "dictation",
        title: tr("Kombi-Diktat", "Full Dictation"),
        sub: tr("Tonhöhe + Notenlänge hören", "Pitch + note length together")
      },
      {
        id: "steady",
        title: tr("Gleichmäßig (Basis)", "Steady (Basics)"),
        sub: tr("4 gleichlange Halbe", "4 steady half notes")
      }
    ];

    const getMelodyRangeDesc = (range, style) => {
      if (style === "steady") {
        if (range === "do-fa") return tr("4 halbe Noten aus Do, Re, Mi und Fa – ideal für den Einstieg", "4 half notes from Do, Re, Mi, and Fa — ideal for getting started");
        if (range === "sol-do") return tr("4 halbe Noten im oberen Spannungsraum (Sol, La, Ti, Do)", "4 half notes in the upper tetrachord (Sol, La, Ti, Do)");
        return tr("4 halbe Noten über alle sieben Solfège-Stufen (Do bis Do)", "4 half notes across all seven Solfège degrees (Do to Do)");
      }
      if (style === "dictation") {
        if (range === "do-fa") return tr("4–5 Töne (Do–Fa): Erkenne Tonstufe UND Notenlänge (♪, ♩, ♩., 𝅗𝅥)", "4–5 notes (Do–Fa): identify pitch AND note duration (♪, ♩, ♩., 𝅗𝅥)");
        if (range === "sol-do") return tr("4–6 Töne (Sol–Do): Rhythmus und Tonhöhe gemeinsam im Puls erfassen", "4–6 notes (Sol–Do): capture rhythm and pitch together in pulse");
        return tr("4–6 Töne über die ganze Tonart – vollständiges Melodiediktat", "4–6 notes across the full scale — complete melody dictation");
      }
      if (range === "do-fa") return tr("Musikalische 4–5-Ton-Phrasen aus Do, Re, Mi und Fa (4/4 & 3/4)", "Musical 4–5 note phrases from Do, Re, Mi, and Fa (4/4 & 3/4)");
      if (range === "sol-do") return tr("Rhythmische 4–6-Ton-Phrasen im oberen Raum (Sol, La, Ti, Do)", "Rhythmic 4–6 note phrases in the upper tetrachord (Sol, La, Ti, Do)");
      return tr("Ausdrucksstarke 4–6-Ton-Melodien über alle Stufen (Do bis Do)", "Expressive 4–6 note melodies across all scale degrees (Do to Do)");
    };

    const MELODY_SECTIONS = [
      { range: "do-fa",  title: tr("Stufe 1: Do – Fa", "Level 1: Do – Fa") },
      { range: "sol-do", title: tr("Stufe 2: Sol – Do", "Level 2: Sol – Do") },
      { range: "full",   title: tr("Stufe 3: Ganze Tonart", "Level 3: Full Key") }
    ];

    const MELODY_VARIANTS = [
      { keyMode: "fixed",  octave: "single", circle: "circle-sage",  badge: "C • 1", title: tr("C-Dur (1 Oktave)", "C Major (1 Octave)"),              sub: tr("Feste Tonart C-Dur, 1 Oktave", "Fixed key C Major, 1 octave") },
      { keyMode: "random", octave: "single", circle: "circle-sage",  badge: "? • 1", title: tr("Zufallstonarten (1 Oktave)", "Random Keys (1 Octave)"),  sub: tr("Wechselnde Tonarten, 1 Oktave", "Changing keys, 1 octave") },
      { keyMode: "fixed",  octave: "multi",  circle: "circle-peach", badge: "C • ∞", title: tr("C-Dur (Mehrere Oktaven)", "C Major (Multi-Octave)"),     sub: tr("Feste Tonart C-Dur, Oktavsprünge", "Fixed key C Major, octave leaps") },
      { keyMode: "random", octave: "multi",  circle: "circle-lilac", badge: "? • ∞", title: tr("Zufallstonarten (Mehrere Okt.)", "Random Keys (Multi-Octave)"), sub: tr("Wechselnde Tonarten & Oktaven", "Changing keys & octaves") }
    ];

    const renderMelodyBody = (selectedStyle) => `
      <div class="melody-style-card">
        <p class="melody-style-card-title">${tr("Rhythmus- & Trainingsart", "Rhythm & Exercise Mode")}</p>
        <div class="melody-style-tabs" role="tablist" aria-label="${escapeHtml(tr("Melodie-Modus wählen", "Select melody mode"))}">
          ${styleDefs.map(sd => `
            <button type="button" class="melody-style-tab ${selectedStyle === sd.id ? "active" : ""}" data-melody-style-pick="${sd.id}">
              <strong>${sd.title}</strong>
              <span>${sd.sub}</span>
            </button>
          `).join("")}
        </div>
      </div>
      ${MELODY_SECTIONS.map(sec => `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${sec.title}</h3>
          <p class="subpage-section-desc" data-melody-sec-desc="${sec.range}">${getMelodyRangeDesc(sec.range, selectedStyle)}</p>
          <div class="subpage-nodes-grid">
            ${MELODY_VARIANTS.map(v => `
              <button class="subpage-node-btn"
                data-launch-melody="${sec.range}"
                data-melody-key="${v.keyMode}"
                data-melody-octave="${v.octave}">
                <div class="node-circle ${v.circle}">${v.badge}</div>
                <span class="node-title">${v.title}</span>
                <span class="node-sub">${v.sub}</span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `;

    container.innerHTML = renderMelodyBody(activeStyle);

    container.querySelectorAll("[data-melody-style-pick]").forEach(btn => {
      btn.addEventListener("click", () => {
        const nextStyle = btn.dataset.melodyStylePick;
        state.settings.melodyStyle = ["steady", "rhythmic", "dictation"].includes(nextStyle) ? nextStyle : "rhythmic";
        container.querySelectorAll("[data-melody-style-pick]").forEach(b => {
          b.classList.toggle("active", b === btn);
        });
        MELODY_SECTIONS.forEach(sec => {
          const pEl = container.querySelector(`[data-melody-sec-desc="${sec.range}"]`);
          if (pEl) pEl.textContent = getMelodyRangeDesc(sec.range, state.settings.melodyStyle);
        });
      });
    });

    container.querySelectorAll("[data-launch-melody]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.setMode("melody");
        state.setMelodyConfig(
          btn.dataset.launchMelody,
          btn.dataset.melodyKey,
          btn.dataset.melodyOctave,
          state.settings.melodyStyle
        );
        state.exerciseReturnView = "category";
        switchView("exercise");
      });
    });

  } else if (categoryKey === "solfege") {
    container.innerHTML = `
      <div class="subpage-section">
        <h3 class="subpage-section-title">Solfège (Do, Re, Mi, Fa, Sol, La, Ti)</h3>
        <p class="subpage-section-desc">${tr("Höre die Kadenz (I–vi–IV–V) und erkenne die gespielte Tonstufe auf der Klaviatur", "Hear the cadence (I–vi–IV–V) and identify the target scale degree on the keyboard")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-solfege="1">
            <div class="node-circle circle-sage">C • 1</div>
            <span class="node-title">${tr("Stufe 1: C-Dur (1 Oktave)", "Level 1: C Major (1 Octave)")}</span>
            <span class="node-sub">${tr("Mittlere Höhe, feste Tonart C-Dur", "Middle register, fixed key C Major")}</span>
          </button>

          <button class="subpage-node-btn" data-launch-solfege="2">
            <div class="node-circle circle-sage">? • 1</div>
            <span class="node-title">${tr("Stufe 2: Zufällige Tonart (1 Okt.)", "Level 2: Random Key (1 Oct.)")}</span>
            <span class="node-sub">${tr("Nicht C-Dur, fest für diese Sitzung", "Non-C key, fixed for this session")}</span>
          </button>

          <button class="subpage-node-btn" data-launch-solfege="3">
            <div class="node-circle circle-peach">C • ∞</div>
            <span class="node-title">${tr("Stufe 3: C-Dur (Mehrere Oktaven)", "Level 3: C Major (Multi-Octave)")}</span>
            <span class="node-sub">${tr("Feste Tonart C-Dur, wechselnde Oktaven", "Fixed key C Major, shifting octaves")}</span>
          </button>

          <button class="subpage-node-btn" data-launch-solfege="4">
            <div class="node-circle circle-peach">? • ∞</div>
            <span class="node-title">${tr("Stufe 4: Zufällige Tonart (Mehrere Okt.)", "Level 4: Random Key (Multi-Oct.)")}</span>
            <span class="node-sub">${tr("Nicht C-Dur (fest), wechselnde Oktaven", "Non-C key (fixed), shifting octaves")}</span>
          </button>

          <button class="subpage-node-btn" data-launch-solfege="5">
            <div class="node-circle circle-lilac">↻ • 1</div>
            <span class="node-title">${tr("Stufe 5: Tonartwechsel (1 Oktave)", "Level 5: Key Changes (1 Octave)")}</span>
            <span class="node-sub">${tr("Neue Tonart nach jeder Antwort, 1 Okt.", "New key after every answer, 1 oct.")}</span>
          </button>

          <button class="subpage-node-btn" data-launch-solfege="6">
            <div class="node-circle circle-lilac">↻ • ∞</div>
            <span class="node-title">${tr("Stufe 6: Tonartwechsel (Mehrere Okt.)", "Level 6: Key Changes (Multi-Oct.)")}</span>
            <span class="node-sub">${tr("Neue Tonart & Oktave nach jeder Antwort", "New key & octave after every answer")}</span>
          </button>
        </div>
      </div>
    `;

    container.querySelectorAll("[data-launch-solfege]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.setMode("solfege");
        state.setSolfegeDifficulty(btn.dataset.launchSolfege);
        state.exerciseReturnView = "category";
        switchView("exercise");
      });
    });

  } else if (categoryKey === "rhythm") {
    container.innerHTML = `
      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("Taktart &amp; Metrum erkennen", "Time Signature &amp; Meter")}</h3>
        <p class="subpage-section-desc">${tr("Höre zwei Takte Percussion und erkenne den Grundschlag sowie die Takt-Betonung", "Hear two bars of percussion and identify the pulse and barline accent")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-meter" data-rhythm-lvl="1">
            <div class="node-circle circle-peach">3/4 · 4/4</div>
            <span class="node-title">${tr("Stufe 1: Basis", "Level 1: Basics")}</span>
            <span class="node-sub">${tr("4/4-Takt vs. 3/4-Walzer", "4/4 Common Time vs. 3/4 Waltz")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-meter" data-rhythm-lvl="2">
            <div class="node-circle circle-peach">6/8</div>
            <span class="node-title">${tr("Stufe 2: Unterteilung", "Level 2: Subdivisions")}</span>
            <span class="node-sub">${tr("2/4, 3/4, 4/4 &amp; 6/8-Wiegetakt", "2/4, 3/4, 4/4 &amp; compound 6/8")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-meter" data-rhythm-lvl="3">
            <div class="node-circle circle-peach">5/4 · 7/8</div>
            <span class="node-title">${tr("Stufe 3: Ungerade Takte", "Level 3: Odd Meters")}</span>
            <span class="node-sub">${tr("Inklusive 5/4 (3+2) &amp; 7/8", "Including 5/4 (3+2) &amp; 7/8")}</span>
          </button>
        </div>
      </div>

      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("Rhythmus-Diktat (4 Zählzeiten)", "Rhythm Dictation (4 Beats)")}</h3>
        <p class="subpage-section-desc">${tr("Wie bei den Melodien: Alle 4 Fragezeichen nach Gehör Baustein für Baustein lösen", "Just like melodies: solve all 4 question marks beat by beat by ear")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-dictation" data-rhythm-lvl="1">
            <div class="node-circle circle-sage">♩ · ♫</div>
            <span class="node-title">${tr("Stufe 1: Puls &amp; Pausen", "Level 1: Pulse &amp; Rests")}</span>
            <span class="node-sub">${tr("Viertel, Achtelpaar &amp; Pause", "Quarters, eighth-note pairs &amp; rests")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-dictation" data-rhythm-lvl="2">
            <div class="node-circle circle-sage">♪ · 3×</div>
            <span class="node-title">${tr("Stufe 2: Offbeat &amp; Triolen", "Level 2: Offbeats &amp; Triplets")}</span>
            <span class="node-sub">${tr("+ „und“-Offbeat &amp; Achteltriole", "+ “and” offbeats &amp; eighth triplets")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-dictation" data-rhythm-lvl="3">
            <div class="node-circle circle-sage">♬</div>
            <span class="node-title">${tr("Stufe 3: Sechzehntel", "Level 3: Sixteenth Notes")}</span>
            <span class="node-sub">${tr("Vierer-, Achtel- &amp; 16tel-Kombis", "Four-16ths, 8th &amp; 16th combinations")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-dictation" data-rhythm-lvl="4">
            <div class="node-circle circle-sage">♩. · Off</div>
            <span class="node-title">${tr("Stufe 4: Punkt. &amp; Synkopen", "Level 4: Dotted &amp; Syncopation")}</span>
            <span class="node-sub">${tr("Punktierte Achtel &amp; 16tel-Synkopen", "Dotted eighths &amp; 16th syncopations")}</span>
          </button>
        </div>
      </div>

      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("Rhythmus nachklopfen (Tap-Pad)", "Rhythm Tap-Back (Tap Pad)")}</h3>
        <p class="subpage-section-desc">${tr("1 Takt Vorzähler, 1 Takt Vorgabe – dann klopfst du den Rhythmus direkt auf dem Pad nach", "1 bar count-in, 1 bar prompt — then tap the rhythm back directly on the pad")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-lvl="1">
            <div class="node-circle circle-lilac">Tap 1</div>
            <span class="node-title">${tr("Stufe 1: Puls-Anker", "Level 1: Pulse Anchor")}</span>
            <span class="node-sub">${tr("Viertel &amp; Pausen im 4/4-Takt", "Quarter notes &amp; rests in 4/4 time")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-lvl="2">
            <div class="node-circle circle-lilac">3/4 · ♫</div>
            <span class="node-title">${tr("Stufe 2: Achtel &amp; 3/4", "Level 2: Eighths &amp; 3/4")}</span>
            <span class="node-sub">${tr("Achtelpaare im 4/4 &amp; 3/4-Walzer", "Eighth pairs in 4/4 &amp; 3/4 waltz")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-lvl="3">
            <div class="node-circle circle-lilac">3× · Off</div>
            <span class="node-title">${tr("Stufe 3: Synkopen &amp; Triolen", "Level 3: Syncopation &amp; Triplets")}</span>
            <span class="node-sub">${tr("Präzises Timing mit Offbeats &amp; Triolen", "Tight timing with offbeats &amp; triplets")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-lvl="4">
            <div class="node-circle circle-lilac">${tr("Blind", "Blind")}</div>
            <span class="node-title">${tr("Stufe 4: Blindflug", "Level 4: Blind Mode")}</span>
            <span class="node-sub">${tr("Klick verstummt während deiner Runde", "Metronome drops out during your turn")}</span>
          </button>
        </div>
      </div>

      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("Groove, Akzente &amp; Mikro-Timing", "Groove, Accents &amp; Micro-Timing")}</h3>
        <p class="subpage-section-desc">${tr("Spüre Groove-Stile, Offbeat-Akzente und feinste Verschiebungen im Band-Kontext", "Feel groove styles, offbeat accents, and subtle timing shifts in a band context")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-groove" data-rhythm-lvl="1">
            <div class="node-circle circle-peach">Groove</div>
            <span class="node-title">${tr("Stufe 1: Groove-Stile", "Level 1: Groove Styles")}</span>
            <span class="node-sub">${tr("Marsch, Backbeat, Swing &amp; 3 gegen 2", "March, Backbeat, Swing &amp; 3-against-2")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-groove" data-rhythm-lvl="2">
            <div class="node-circle circle-peach">1 + 2</div>
            <span class="node-title">${tr("Stufe 2: Offbeat-Spürsinn", "Level 2: Offbeat Radar")}</span>
            <span class="node-sub">${tr("Exakten Cowbell-Akzent lokalisieren", "Pinpoint the exact cowbell accent")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-groove" data-rhythm-lvl="3">
            <div class="node-circle circle-peach">±55 ms</div>
            <span class="node-title">${tr("Stufe 3: Mikro-Timing", "Level 3: Micro-Timing")}</span>
            <span class="node-sub">${tr("Zu früh, exakt („Pocket“) oder zu spät?", "Ahead, in the pocket, or laid back?")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-groove" data-rhythm-lvl="4">
            <div class="node-circle circle-peach">±28 ms</div>
            <span class="node-title">${tr("Stufe 4: Profi-Timing", "Level 4: Pro Timing")}</span>
            <span class="node-sub">${tr("Feinste Abweichungen sicher heraushören", "Hear the tiniest timing shifts cleanly")}</span>
          </button>
        </div>
      </div>
    `;

    container.querySelectorAll("[data-launch-rhythm]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.setRhythmLevel(btn.dataset.launchRhythm, btn.dataset.rhythmLvl);
        state.exerciseReturnView = "category";
        switchView("exercise");
      });
    });

  } else if (categoryKey === "production") {
    container.innerHTML = `
      <div class="prod-safety-banner">
        <strong>${tr("Gehörschutz &amp; Rosa Rauschen:", "Hearing Protection &amp; Pink Noise:")}</strong> ${tr("Alle Signale laufen über einen integrierten -14 dBFS Schutz-Limiter mit Lautheits-Ausgleich (insbesondere bei 2–4 kHz) und weichen Ein- und Ausblenden. Übe dennoch bei moderater Abhörlautstärke.", "All signals pass through a built-in -14 dBFS safety limiter with equal-loudness compensation (especially around 2–4 kHz) and smooth fades. Always practice at a comfortable listening level.")}
      </div>

      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("Frequenzen erkennen (Reinton / Sinus)", "Frequency Recognition (Sine Wave)")}</h3>
        <p class="subpage-section-desc">${tr("Trainiere dein absolutes Frequenz-Gefühl vom Subbass (63 Hz) bis in die Air-Höhen (12 kHz)", "Train absolute frequency recall from sub-bass (63 Hz) up to the air band (12 kHz)")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-prod="prod-tone" data-prod-lvl="1">
            <div class="node-circle circle-sage node-circle-compact">5× Hz</div>
            <span class="node-title">${tr("Stufe 1: Basis", "Level 1: Basics")}</span>
            <span class="node-sub">125 Hz, 250 Hz, 1k, 2k, 4k</span>
          </button>
          <button class="subpage-node-btn" data-launch-prod="prod-tone" data-prod-lvl="2">
            <div class="node-circle circle-sage node-circle-compact">${tr("8× Okt", "8× Oct")}</div>
            <span class="node-title">${tr("Stufe 2: Oktavbänder", "Level 2: Octave Bands")}</span>
            <span class="node-sub">${tr("63 Hz bis 8 kHz (Standard-EQ)", "63 Hz to 8 kHz (standard EQ)")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-prod="prod-tone" data-prod-lvl="3">
            <div class="node-circle circle-sage node-circle-compact">12× Hz</div>
            <span class="node-title">${tr("Stufe 3: Profi-Raster", "Level 3: Pro Grid")}</span>
            <span class="node-sub">${tr("12 Bänder inkl. 800 Hz, 1,6k &amp; 12k", "12 bands incl. 800 Hz, 1.6k &amp; 12k")}</span>
          </button>
        </div>
      </div>

      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("EQ-Boost im Pink Noise (Fortgeschritten)", "EQ Boost in Pink Noise (Advanced)")}</h3>
        <p class="subpage-section-desc">${tr("Erst erklingt neutrales Pink Noise („Flat“), dann hebt ein Peaking-EQ genau eine Frequenz gezielt an", "First you hear neutral pink noise (“Flat”), then a peaking EQ boosts one targeted frequency")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-prod="prod-eq-noise" data-prod-lvl="1">
            <div class="node-circle circle-lilac node-circle-compact">+10 dB</div>
            <span class="node-title">${tr("Stufe 1: Breiter EQ", "Level 1: Wide EQ")}</span>
            <span class="node-sub">${tr("Q 1,6 • 6 zentrale Mix-Bänder", "Q 1.6 • 6 core mix bands")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-prod="prod-eq-noise" data-prod-lvl="2">
            <div class="node-circle circle-lilac node-circle-compact">${tr("+8,5 dB", "+8.5 dB")}</div>
            <span class="node-title">${tr("Stufe 2: Oktav-EQ", "Level 2: Octave EQ")}</span>
            <span class="node-sub">${tr("Q 2,6 • 8 Bänder (63 Hz – 8 kHz)", "Q 2.6 • 8 bands (63 Hz – 8 kHz)")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-prod="prod-eq-noise" data-prod-lvl="3">
            <div class="node-circle circle-lilac node-circle-compact">+7 dB</div>
            <span class="node-title">${tr("Stufe 3: Chirurgisch", "Level 3: Surgical")}</span>
            <span class="node-sub">${tr("Q 4,2 • 10 schmale Resonanzen", "Q 4.2 • 10 narrow resonances")}</span>
          </button>
        </div>
      </div>
    `;

    container.querySelectorAll("[data-launch-prod]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.setProdLevel(btn.dataset.launchProd, btn.dataset.prodLvl);
        state.exerciseReturnView = "category";
        switchView("exercise");
      });
    });

  } else if (categoryKey === "modes") {
    container.innerHTML = `
      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("1. Modus / Tonleiter erkennen", "1. Mode / Scale Recognition")}</h3>
        <p class="subpage-section-desc">${tr("Erst hörst du die neutrale Anker-Quinte (ohne Terz), dann die 8-tönige Tonleiter aufwärts", "First you hear a neutral open-fifth anchor (no 3rd), then the 8-note ascending scale")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-modes="modes-scale" data-modes-lvl="1">
            <div class="node-circle circle-peach">4× C</div>
            <span class="node-title">${tr("Stufe 1: Basis-Modi", "Level 1: Core Modes")}</span>
            <span class="node-sub">${tr("Ionisch, Äolisch, Dorisch &amp; Mixolydisch", "Ionian, Aeolian, Dorian &amp; Mixolydian")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-scale" data-modes-lvl="2">
            <div class="node-circle circle-peach">7× C</div>
            <span class="node-title">${tr("Stufe 2: Kirchentonarten", "Level 2: All 7 Modes")}</span>
            <span class="node-sub">${tr("Alle 7 Modi (+ Lydisch, Phrygisch, Lokrisch)", "All 7 modes (+ Lydian, Phrygian, Locrian)")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-scale" data-modes-lvl="3">
            <div class="node-circle circle-peach node-circle-compact">7× Transp</div>
            <span class="node-title">${tr("Stufe 3: Transponiert", "Level 3: Transposed")}</span>
            <span class="node-sub">${tr("Alle 7 Modi über wechselnde Grundtöne", "All 7 modes across changing roots")}</span>
          </button>
        </div>
      </div>

      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("2. Charakterton &amp; Klangfarbe", "2. Characteristic Note &amp; Color")}</h3>
        <p class="subpage-section-desc">${tr("Erkenne den Modus direkt an seiner charakteristischen Reibung (#4, b7, ♮6, b2, b5 oder #7)", "Recognize each mode immediately by its color tone (#4, b7, ♮6, b2, b5, or #7)")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-modes="modes-char" data-modes-lvl="1">
            <div class="node-circle circle-sage">#4 / b7</div>
            <span class="node-title">${tr("Stufe 1: Dur-Modi", "Level 1: Major Modes")}</span>
            <span class="node-sub">${tr("Ionisch vs. Lydisch vs. Mixolydisch", "Ionian vs. Lydian vs. Mixolydian")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-char" data-modes-lvl="2">
            <div class="node-circle circle-sage">♮6 / b2</div>
            <span class="node-title">${tr("Stufe 2: Moll-Modi", "Level 2: Minor Modes")}</span>
            <span class="node-sub">${tr("Äolisch, Dorisch, Phrygisch &amp; Lokrisch", "Aeolian, Dorian, Phrygian &amp; Locrian")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-char" data-modes-lvl="3">
            <div class="node-circle circle-sage node-circle-compact">+Harm</div>
            <span class="node-title">${tr("Stufe 3: Gesamt-Spektrum", "Level 3: Full Spectrum")}</span>
            <span class="node-sub">${tr("Alle 7 Modi + Harmonisch Moll", "All 7 modes + Harmonic Minor")}</span>
          </button>
        </div>
      </div>

      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("3. Modale Kadenzen &amp; Vamps", "3. Modal Cadences &amp; Vamps")}</h3>
        <p class="subpage-section-desc">${tr("Typische Pendel-Akkorde (z. B. i–IV, I–bVII, I–II oder i–bII) am Klang erkennen", "Identify signature modal chord vamps (e.g. i–IV, I–bVII, I–II, or i–bII) by ear")}</p>
        <div class="subpage-nodes-grid">
          <button class="subpage-node-btn" data-launch-modes="modes-cadence" data-modes-lvl="1">
            <div class="node-circle circle-lilac">4× Vamp</div>
            <span class="node-title">${tr("Stufe 1: Standard-Vamps", "Level 1: Standard Vamps")}</span>
            <span class="node-sub">${tr("Ionisch, Dorisch, Mixolydisch &amp; Äolisch", "Ionian, Dorian, Mixolydian &amp; Aeolian")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-cadence" data-modes-lvl="2">
            <div class="node-circle circle-lilac">6× Vamp</div>
            <span class="node-title">${tr("Stufe 2: Alle 6 Modal-Vamps", "Level 2: All 6 Modal Vamps")}</span>
            <span class="node-sub">${tr("Inkl. Lydisch (I–II) &amp; Phrygisch (i–bII)", "Incl. Lydian (I–II) &amp; Phrygian (i–bII)")}</span>
          </button>
        </div>
      </div>
    `;

    container.querySelectorAll("[data-launch-modes]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.setModesLevel(btn.dataset.launchModes, btn.dataset.modesLvl);
        state.exerciseReturnView = "category";
        switchView("exercise");
      });
    });

  } else if (categoryKey === "notation") {
    const NOTATION_SECTIONS = [
      {
        mode: "notation-treble",
        circleClass: "circle-peach",
        title: tr("Violinschlüssel (G-Schlüssel)", "Treble Clef (G Clef)"),
        desc: tr(
          "Der G-Schlüssel markiert g' (G4) auf der 2. Linie von unten – die Basis für Klavier (rechte Hand), Gesang, Violine, Flöte &amp; Gitarre.",
          "Marks G4 on the 2nd line from the bottom — essential for piano right hand, vocals, violin, flute &amp; guitar."
        )
      },
      {
        mode: "notation-bass",
        circleClass: "circle-sage",
        title: tr("Bassschlüssel (F-Schlüssel)", "Bass Clef (F Clef)"),
        desc: tr(
          "Der F-Schlüssel markiert f (F3) auf der 4. Linie zwischen den beiden Punkten – Standard für Bass, Cello, Posaune &amp; Klavier (linke Hand).",
          "Marks F3 on the 4th line between its two dots — standard for bass, cello, trombone &amp; piano left hand."
        )
      },
      {
        mode: "notation-alto",
        circleClass: "circle-lilac",
        title: tr("Altschlüssel (C-Schlüssel)", "Alto Clef (C Clef)"),
        desc: tr(
          "Der C-Schlüssel legt das mittlere c' (C4) exakt auf die 3. (mittlere) Notenlinie – Pflichtschlüssel für Bratsche &amp; Partiturlesen.",
          "Places middle C4 right on the 3rd (center) line — standard clef for viola and full-score reading."
        )
      },
      {
        mode: "notation-mixed",
        circleClass: "circle-peach",
        title: tr("Alle Schlüssel gemischt", "Mixed Clefs"),
        desc: tr(
          "Wechselt in der Notenzeile flexibel zwischen Violin-, Bass- und Altschlüssel – ideal für flüssiges Blattlesen und Partituren.",
          "Alternates across Treble, Bass &amp; Alto clefs — great practice for agile sight-reading across systems."
        )
      }
    ];

    const KEY_POOL_CHIPS = [
      { id: "none",   label: tr("Ohne (C-Dur)", "None (C Major)") },
      { id: "easy",   label: tr("Leicht (1–2 ♯/♭)", "Easy (1–2 ♯/♭)") },
      { id: "medium", label: tr("Mittel (3–4 ♯/♭)", "Medium (3–4 ♯/♭)") },
      { id: "hard",   label: tr("Schwer (5–6 ♯/♭)", "Hard (5–6 ♯/♭)") },
      { id: "all",    label: tr("Alle (1–6 ♯/♭)", "All (1–6 ♯/♭)") }
    ];

    const TRAINER_CLEFS = [
      { mode: "notation-treble", label: tr("Violinschlüssel", "Treble") },
      { mode: "notation-bass",   label: tr("Bassschlüssel", "Bass") },
      { mode: "notation-alto",   label: tr("Altschlüssel", "Alto") },
      { mode: "notation-mixed",  label: tr("Schlüssel-Mix", "Mixed") }
    ];

    const TRAINER_RANGES = [
      { lvl: 1, label: tr("5 Linien", "5 Lines") },
      { lvl: 2, label: tr("±2 Hilfslinien", "±2 Ledgers") },
      { lvl: 3, label: tr("±3 Hilfslinien", "±3 Ledgers") }
    ];

    const renderNotationCategoryBody = () => {
      const selectedKeyMode = normalizeNotationKeyMode(state.settings.notationKeyMode);
      const hasSelectedKey = selectedKeyMode !== "none";
      const trainerClefMode = isNotationMode(state.settings.notationKeyTrainerClef)
        ? state.settings.notationKeyTrainerClef
        : "notation-treble";
      const trainerRangeLvl = Math.max(1, Math.min(3, parseInt(state.settings.notationKeyTrainerLevel, 10) || 2));
      const previewClefId = trainerClefMode === "notation-mixed" ? "treble" : getNotationClefFromMode(trainerClefMode);

      const previewKeySigId = isNotationKeyPoolMode(selectedKeyMode)
        ? (selectedKeyMode === "easy" ? "D" : selectedKeyMode === "medium" ? "Eb" : selectedKeyMode === "hard" ? "B" : "A")
        : selectedKeyMode;
      const previewSvg = buildNotationStaffSVG([], {
        clefId: previewClefId,
        keySignatureId: previewKeySigId,
        width: 210,
        compact: true
      });
      const previewTitle = isNotationKeyPoolMode(selectedKeyMode)
        ? tf("{mode} • Beispiel: {ex}", "{mode} • Example: {ex}", {
            mode: getLocalizedNotationKeyModeLabel(selectedKeyMode, false),
            ex: `${getLocalizedNotationKeySigName(previewKeySigId)} (${getLocalizedNotationKeySigBadge(previewKeySigId, true)})`
          })
        : (selectedKeyMode === "none"
            ? tr("Keine Generalvorzeichen (C-Dur)", "No key signature (C Major)")
            : `${getLocalizedNotationKeySigName(selectedKeyMode)} • ${getLocalizedNotationKeySigBadge(selectedKeyMode, true)}`);
      const previewDesc = selectedKeyMode === "none"
        ? tr(
            "Alle Noten gelten zunächst als Stammtöne (bei Stufe 4 mit ♯/♭ direkt vor einzelnen Noten).",
            "All notes read as naturals unless Level 4 places an accidental right before the note."
          )
        : tr(
            "Das Generalvorzeichen gilt für das ganze System: Achte bei betroffenen Stammlinien &amp; Räumen automatisch auf die schwarzen Tasten!",
            "This key signature applies across the whole staff: play sharps/flats automatically on altered letters!"
          );

      const renderSigChip = (sigId) => {
        const badge = getLocalizedNotationKeySigBadge(sigId, false);
        const shortName = getLocalizedNotationKeySigName(sigId, true).replace(/-Dur$| Major$| majeur$| мажор$/i, "");
        const activeCls = selectedKeyMode === sigId ? " active" : "";
        return `
          <button type="button" class="notation-key-sig-btn${activeCls}" data-notation-keymode="${sigId}">
            <span class="notation-key-sig-name">${escapeHtml(shortName)}</span>
            <span class="notation-key-sig-badge">${escapeHtml(badge)}</span>
          </button>
        `;
      };

      const NOTATION_DIFFICULTY_CARDS = [
        {
          lvl: 1,
          badge: "5 L",
          title: tr("Stufe 1: Im System", "Level 1: On Staff"),
          sub: hasSelectedKey
            ? tf("5 Linien • {key}", "5 lines • {key}", { key: getLocalizedNotationKeyModeLabel(selectedKeyMode, true) })
            : tr("5 Linien &amp; 4 Räume (Stammtöne)", "5 lines &amp; 4 spaces (naturals)")
        },
        {
          lvl: 2,
          badge: "±2",
          title: tr("Stufe 2: ±1–2 Hilfslinien", "Level 2: ±1–2 Ledgers"),
          sub: hasSelectedKey
            ? tf("±2 Hilfslinien • {key}", "±2 ledgers • {key}", { key: getLocalizedNotationKeyModeLabel(selectedKeyMode, true) })
            : tr("Erweiterter Umfang ohne Vorzeichen", "Extended range without accidentals")
        },
        {
          lvl: 3,
          badge: "±3",
          title: tr("Stufe 3: Bis 3 Hilfslinien", "Level 3: Up to 3 Ledgers"),
          sub: hasSelectedKey
            ? tf("±3 Hilfslinien • {key}", "±3 ledgers • {key}", { key: getLocalizedNotationKeyModeLabel(selectedKeyMode, true) })
            : tr("Voller Bereich nach oben &amp; unten", "Up to 3 ledger lines above &amp; below")
        },
        {
          lvl: 4,
          badge: hasSelectedKey ? "♮/♯" : "♯/♭",
          title: hasSelectedKey
            ? tr("Stufe 4: + Auflösungszeichen (♮)", "Level 4: + Naturals (♮)")
            : tr("Stufe 4: 3 Hilfsl. + Vorzeichen", "Level 4: 3 Ledgers + ♯/♭"),
          sub: hasSelectedKey
            ? tr("Tonart inkl. ♮ &amp; extra Vorzeichen", "Key sig. plus ♮ &amp; accidentals")
            : tr("Voller Umfang mit ♯ und ♭", "Full 3-ledger range with sharps &amp; flats")
        }
      ];

      const KEY_SIGNATURE_CARDS = [
        {
          id: "key_easy",
          keyMode: "easy",
          lvl: trainerRangeLvl,
          circle: "circle-sage",
          badge: "1–2",
          title: tr("Leichte Tonarten (1–2 ♯/♭)", "Easy Keys (1–2 ♯/♭)"),
          sub: tr("G-, D-, F- &amp; B-Dur am Systemanfang", "G, D, F &amp; Bb Major key signatures")
        },
        {
          id: "key_medium",
          keyMode: "medium",
          lvl: trainerRangeLvl,
          circle: "circle-peach",
          badge: "3–4",
          title: tr("Mittlere Tonarten (3–4 ♯/♭)", "Medium Keys (3–4 ♯/♭)"),
          sub: tr("A-, E-, Es- &amp; As-Dur im Wechsel", "A, E, Eb &amp; Ab Major rotating")
        },
        {
          id: "key_all",
          keyMode: "all",
          lvl: trainerRangeLvl,
          circle: "circle-lilac",
          badge: "1–6",
          title: tr("Alle 12 Tonarten (1–6 ♯/♭)", "All 12 Keys (1–6 ♯/♭)"),
          sub: tr("Kompletter Quintenzirkel bis Fis/Ges", "Full circle of fifths up to F♯ / G♭")
        },
        {
          id: "key_nat",
          keyMode: "all",
          lvl: 4,
          circle: "circle-peach",
          badge: "♯/♮",
          title: tr("Tonarten + Auflösungszeichen", "Key Signatures + Naturals (♮)"),
          sub: tr("Blattspiel-Profi mit ♮ &amp; Wechselvorzeichen", "Pro sight-reading with ♮ &amp; accidentals")
        }
      ];

      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${tr("1. Tonart / Generalvorzeichen wählen", "1. Choose Key Signature")}</h3>
          <p class="subpage-section-desc">${tr(
            "Lege fest, ob Tonarten mit Vorzeichen am Notenanfang stehen sollen – gilt für alle Schlüssel-Übungen darunter.",
            "Set a key signature at the start of the staff — applies to all clef exercises below."
          )}</p>
          <div class="notation-key-toolbar">
            <div class="notation-key-pool-row">
              ${KEY_POOL_CHIPS.map(ch => `
                <button type="button" class="k-filter-pill${selectedKeyMode === ch.id ? " active" : ""}" data-notation-keymode="${ch.id}">
                  ${escapeHtml(ch.label)}
                </button>
              `).join("")}
            </div>
            <div class="notation-key-groups">
              <div class="notation-key-group-row">
                ${NOTATION_SHARP_KEY_ORDER.map(renderSigChip).join("")}
              </div>
              <div class="notation-key-group-row">
                ${NOTATION_FLAT_KEY_ORDER.map(renderSigChip).join("")}
              </div>
            </div>
            <div class="notation-key-preview-box">
              <div class="notation-key-preview-svg">${previewSvg}</div>
              <div class="notation-key-preview-copy">
                <span class="notation-key-preview-title">${escapeHtml(previewTitle)}</span>
                <span class="notation-key-preview-desc">${previewDesc}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="subpage-section">
          <h3 class="subpage-section-title">${tr("2. Tonarten-Blattspiel (Generalvorzeichen)", "2. Key-Signature Sight-Reading")}</h3>
          <p class="subpage-section-desc">${tr(
            "Lies ganze 8-Noten-Phrasen mit vorgegebener Tonart im Notensystem und beachte die Vorzeichen vom Blatt!",
            "Read 8-note phrases with an active key signature on the staff and remember the sharps &amp; flats while playing!"
          )}</p>
          <div class="notation-key-quick-group">
            <span class="notation-key-quick-label">${tr("Schlüssel &amp; Umfang für diesen Direktstart:", "Clef &amp; range for quick-start cards:")}</span>
            <div class="notation-key-quick-row">
              ${TRAINER_CLEFS.map(tc => `
                <button type="button" class="k-filter-pill${trainerClefMode === tc.mode ? " active" : ""}" data-notation-trainer-clef="${tc.mode}">
                  ${escapeHtml(tc.label)}
                </button>
              `).join("")}
            </div>
            <div class="notation-key-quick-row">
              ${TRAINER_RANGES.map(trng => `
                <button type="button" class="k-filter-pill${trainerRangeLvl === trng.lvl ? " active" : ""}" data-notation-trainer-lvl="${trng.lvl}">
                  ${escapeHtml(trng.label)}
                </button>
              `).join("")}
            </div>
          </div>
          <div class="subpage-nodes-grid">
            ${KEY_SIGNATURE_CARDS.map(kc => `
              <button class="subpage-node-btn" data-launch-notation-key="${kc.id}" data-notation-keymode-launch="${kc.keyMode}" data-notation-mode="${trainerClefMode}" data-notation-lvl="${kc.lvl}">
                <div class="node-circle ${kc.circle}">${kc.badge}</div>
                <span class="node-title">${kc.title}</span>
                <span class="node-sub">${kc.sub}</span>
              </button>
            `).join("")}
          </div>
        </div>

        ${NOTATION_SECTIONS.map(sec => `
          <div class="subpage-section">
            <div class="subpage-section-head-row">
              <h3 class="subpage-section-title">${sec.title}</h3>
              <span class="subpage-section-key-pill">${escapeHtml(getLocalizedNotationKeyModeLabel(selectedKeyMode, true))}</span>
            </div>
            <p class="subpage-section-desc">${sec.desc}</p>
            <div class="subpage-nodes-grid">
              ${NOTATION_DIFFICULTY_CARDS.map(lv => `
                <button class="subpage-node-btn" data-launch-notation="${sec.mode}" data-notation-lvl="${lv.lvl}">
                  <div class="node-circle ${sec.circleClass}">${lv.badge}</div>
                  <span class="node-title">${lv.title}</span>
                  <span class="node-sub">${lv.sub}</span>
                </button>
              `).join("")}
            </div>
          </div>
        `).join("")}
      `;

      container.querySelectorAll("[data-notation-keymode]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setNotationKeyMode(btn.dataset.notationKeymode);
          renderNotationCategoryBody();
        });
      });

      container.querySelectorAll("[data-notation-trainer-clef]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.settings.notationKeyTrainerClef = isNotationMode(btn.dataset.notationTrainerClef)
            ? btn.dataset.notationTrainerClef
            : "notation-treble";
          renderNotationCategoryBody();
        });
      });

      container.querySelectorAll("[data-notation-trainer-lvl]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.settings.notationKeyTrainerLevel = Math.max(1, Math.min(3, parseInt(btn.dataset.notationTrainerLvl, 10) || 2));
          renderNotationCategoryBody();
        });
      });

      container.querySelectorAll("[data-launch-notation-key]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setNotationLevel(btn.dataset.notationMode, btn.dataset.notationLvl, btn.dataset.notationKeymodeLaunch);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });

      container.querySelectorAll("[data-launch-notation]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setNotationLevel(btn.dataset.launchNotation, btn.dataset.notationLvl);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    };

    renderNotationCategoryBody();

  } else if (categoryKey === "warmup") {
    const activeVoice = state.warmup?.voiceRange || "mixed";
    const voiceButtonsHtml = Object.values(WARMUP_VOICE_RANGES).map(vr => `
      <button class="warmup-range-btn ${vr.id === "mixed" ? "is-wide" : ""} ${vr.id === activeVoice ? "active" : ""}" type="button" data-select-warmup-voice="${vr.id}">
        <span class="warmup-range-name">${tr(vr.de, vr.en)}</span>
        <span class="warmup-range-notes">${tr(vr.subDe, vr.subEn)}</span>
      </button>
    `).join("");

    container.innerHTML = `
      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("1. Tonumfang wählen", "1. Choose Vocal Range")}</h3>
        <p class="subpage-section-desc">${tr("Passt Grundton und Modulationsbereich der Übungen an dich oder deinen Chor an", "Tailors starting pitch and modulation range to your voice or choir section")}</p>
        <div class="warmup-range-grid">${voiceButtonsHtml}</div>
      </div>

      <div class="subpage-section">
        <h3 class="subpage-section-title">${tr("2. Einsing-Programm starten", "2. Start Warmup Routine")}</h3>
        <p class="subpage-section-desc">${tr("Geführtes Einsingen mit Atem-Cues, Klavier-/Chor-Begleitung, Live-Klaviatur und Halbton-Steuerung", "Guided vocal warmup with breath cues, piano/choir accompaniment, live keyboard & semitone control")}</p>
        <div class="subpage-nodes-grid">
          ${WARMUP_PRESETS.map(p => `
            <button class="subpage-node-btn" type="button" data-launch-warmup="${p.id}">
              <div class="node-circle ${p.circle}">${p.badge}</div>
              <span class="node-title">${tr(p.titleDe, p.titleEn)}</span>
              <span class="node-sub">${tr(p.descDe, p.descEn)}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    container.querySelectorAll("[data-select-warmup-voice]").forEach(btn => {
      btn.addEventListener("click", () => {
        const voiceId = btn.dataset.selectWarmupVoice;
        if (WARMUP_VOICE_RANGES[voiceId]) {
          state.warmup.voiceRange = voiceId;
          container.querySelectorAll("[data-select-warmup-voice]").forEach(el => {
            el.classList.toggle("active", el.dataset.selectWarmupVoice === voiceId);
          });
        }
      });
    });

    container.querySelectorAll("[data-launch-warmup]").forEach(btn => {
      btn.addEventListener("click", () => {
        openWarmupView(btn.dataset.launchWarmup, { returnView: "category" });
      });
    });
  }

  // Prüfungs-Einstieg auf jeder Übungskategorie-Unterseite (nicht beim Einsing-Helfer)
  if (categoryKey !== "warmup" && EXAM_CATEGORY_LEVELS[categoryKey]) {
    const examCfg = EXAM_CATEGORY_LEVELS[categoryKey];
    const catBest = getCategoryBestExamPercent(categoryKey);
    const catBestHtml = catBest !== null
      ? `<span class="category-exam-best">${escapeHtml(tf("Dein Bestwert: {pct}%", "Personal Best: {pct}%", { pct: catBest }))}</span>`
      : "";
    container.insertAdjacentHTML("beforeend", `
      <button id="openCategoryExamBtn" class="category-exam-entry-card accent-${examCfg.accent || "sage"}" type="button">
        <span class="category-exam-entry-left">
          <span class="category-exam-icon" aria-hidden="true">🎓</span>
          <span class="category-exam-copy">
            <span class="category-exam-title">${escapeHtml(tr("Kategorie-Prüfung ablegen", "Take Category Exam"))}</span>
            <span class="category-exam-sub">${escapeHtml(tr("1 Versuch pro Frage • verschiedene Stufen & Hör-Auswertung", "1 try per question • selectable levels & audio review"))}</span>
            ${catBestHtml}
          </span>
        </span>
        <span class="category-exam-cta">${escapeHtml(tr("Prüfung →", "Exam →"))}</span>
      </button>
    `);
    document.getElementById("openCategoryExamBtn")?.addEventListener("click", () => {
      openExamSetupPage(categoryKey);
    });
  }

  markBeginnerExerciseNodes(container);

  // Mittiger Erklär-Button ganz unten auf jeder Übungs-Auswahlseite
  container.insertAdjacentHTML("beforeend", `
    <div class="category-help-footer">
      <button id="openCategoryHelpBtn" class="category-help-btn" type="button">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>${tr("So funktioniert’s", "How It Works")}</span>
      </button>
    </div>
  `);

  document.getElementById("openCategoryHelpBtn")?.addEventListener("click", () => {
    openCategoryHelpPage(categoryKey);
  });

  if (!options.refreshOnly) {
    switchView("category");
  }
}

/**
 * Baut die dedizierte Erklärseite („So funktioniert’s“) für die aktive Übungskategorie auf
 */
function openCategoryHelpPage(categoryKey, options = {}) {
  const container = document.getElementById("categoryHelpContent");
  const guide = typeof getLocalizedCategoryHelpGuide === "function"
    ? getLocalizedCategoryHelpGuide(categoryKey)
    : (typeof CATEGORY_HELP_GUIDES !== "undefined" ? CATEGORY_HELP_GUIDES[categoryKey] : null);
  if (!container || !guide) return;

  state.activeCategory = categoryKey;
  container.innerHTML = `
    <div class="article-body">
      <span class="k-card-tag ${guide.tagClass}">${guide.tag}</span>
      <h2>${guide.title}</h2>
      <p class="article-lead">${guide.lead}</p>
      ${guide.sections}
    </div>
    <div class="category-help-footer">
      <button id="closeCategoryHelpBtn" class="category-help-btn" type="button">
        <span>${tr("← Zurück zur Übungsauswahl", "← Back to Exercises")}</span>
      </button>
    </div>
  `;

  document.getElementById("closeCategoryHelpBtn")?.addEventListener("click", () => {
    navigateBackFromUI();
  });

  if (!options.refreshOnly) {
    switchView("category-help");
    window.scrollTo?.({ top: 0, behavior: "auto" });
  }
}

function refreshCurrentQuoteLocalization() {
  const quotes = getLocalizedQuotes();
  if (!quotes.length || state.currentQuoteIndex < 0 || !quotes[state.currentQuoteIndex]) return;
  const item = quotes[state.currentQuoteIndex];
  const badgeEl = document.getElementById("quoteCategoryBadge");
  const textEl = document.getElementById("heroQuoteText");
  if (badgeEl) badgeEl.textContent = item.cat;
  if (textEl) textEl.textContent = item.text;
}

function pickRandomQuote() {
  const quotes = getLocalizedQuotes();
  if (quotes.length === 0) return;
  let nextIdx = Math.floor(Math.random() * quotes.length);
  if (quotes.length > 1 && nextIdx === state.currentQuoteIndex) {
    nextIdx = (nextIdx + 1) % quotes.length;
  }
  state.currentQuoteIndex = nextIdx;
  refreshCurrentQuoteLocalization();
}

function generateExercise() {
  if (state.settings.mode === "solfege") {
    const sLvl = state.settings.solfegeDifficulty || 1;
    if (sLvl === 1 || sLvl === 3) {
      state.currentKey = "C";
    } else if (sLvl === 2 || sLvl === 4) {
      if (!state.solfegeSessionKey || state.solfegeSessionKey === "C") {
        state.solfegeSessionKey = pickRandomNonCKey();
      }
      state.currentKey = state.solfegeSessionKey;
    } else {
      // Stufe 5 & 6: Neue zufällige Nicht-C-Dur-Tonart nach jeder Antwort
      state.currentKey = pickRandomNonCKey(state.currentKey);
    }
  } else if (state.settings.mode === "melody") {
    state.currentKey = state.settings.melodyKeyMode === "random"
      ? pickRandomAnyKey(state.currentKey)
      : "C";
  } else if (state.settings.keyMode === "fixed") {
    state.currentKey = "C";
  } else if (state.settings.keyMode === "easy") {
    const pool = ["C", "G", "F", "D", "Bb"];
    state.currentKey = pool[Math.floor(Math.random() * pool.length)];
  } else {
    const keys = Object.keys(HARMONIC_DATA.roots);
    state.currentKey = keys[Math.floor(Math.random() * keys.length)];
  }

  if (state.settings.timeSig === "random") {
    const sigs = ["4/4", "3/4", "6/8", "odd"];
    state.activeTimeSig = sigs[Math.floor(Math.random() * sigs.length)];
  } else {
    state.activeTimeSig = state.settings.timeSig;
  }

  if (state.settings.randomBpm) {
    const steps = [65, 75, 85, 95, 105, 115, 125, 135];
    state.activeBpm = steps[Math.floor(Math.random() * steps.length)];
  } else {
    state.activeBpm = state.settings.bpm;
  }

  const rootMidi = HARMONIC_DATA.roots[state.currentKey].midi;

  if (state.settings.mode === "cadence") {
    generateCadenceExercise(rootMidi);
  } else if (state.settings.mode === "solfege") {
    generateSolfegeExercise(rootMidi);
  } else if (state.settings.mode === "melody") {
    generateMelodyExercise(rootMidi);
  } else if (state.settings.mode === "rhythm-meter") {
    generateRhythmMeterExercise();
  } else if (state.settings.mode === "rhythm-dictation") {
    generateRhythmDictationExercise();
  } else if (state.settings.mode === "rhythm-tap") {
    generateRhythmTapExercise();
  } else if (state.settings.mode === "rhythm-groove") {
    generateRhythmGrooveExercise();
  } else if (state.settings.mode === "prod-tone") {
    generateProdToneExercise();
  } else if (state.settings.mode === "prod-eq-noise") {
    generateProdEqNoiseExercise();
  } else if (state.settings.mode === "modes-scale") {
    generateModesScaleExercise();
  } else if (state.settings.mode === "modes-char") {
    generateModesCharExercise();
  } else if (state.settings.mode === "modes-cadence") {
    generateModesCadenceExercise();
  } else if (isNotationMode(state.settings.mode)) {
    generateNotationExercise(state.settings.mode);
  } else if (isChordQualityMode(state.settings.mode)) {
    generateChordExercise(rootMidi, state.settings.mode);
  } else if (state.settings.mode === "chord-inversions") {
    generateChordInversionExercise(rootMidi);
  } else {
    generateIntervalExercise(rootMidi, state.settings.mode);
  }

  state.solfegeAnswered = false;
  state.melodyCompleted = false;
  state.rhythmDictationCompleted = false;
  state.rhythmTapSession = null;
  state.exerciseSolved = false;
  state.lastAnswerWasWrong = false;
  state.wrongAnswerData = null;
  if (state.streakState) {
    state.streakState.activeNoticeMilestone = 0;
  }
  renderUI();
}

function generateCadenceExercise(rootMidi) {
  let available = ["I", "IV", "V", "vi"];
  if (state.settings.difficulty === 2) available = ["I", "ii", "iii", "IV", "V", "vi"];
  if (state.settings.difficulty === 3) available = ["I", "ii", "IV", "V", "V7", "vi", "V/V"];
  if (state.settings.difficulty >= 4) available = ["I", "ii", "iii", "IV", "V", "V7", "vi", "V/V", "bII7"];

  const isRandomPos = state.settings.cadencePos === "random";
  const targetIndex = isRandomPos ? Math.floor(Math.random() * 4) : 3;

  const cadencesL1 = [
    ["I", "IV", "V", "I"],
    ["I", "vi", "IV", "V"],
    ["I", "V", "vi", "IV"],
    ["I", "IV", "I", "V"]
  ];

  // Erweiterter L1-Pool für Zufallstakte: deckt an jeder Position 1–4 alle Stufen (I, IV, V, vi) gleichmäßig ab
  const cadencesL1RandomPool = [
    ...cadencesL1,
    ["I", "I", "IV", "V"],
    ["I", "V", "I", "vi"],
    ["I", "IV", "vi", "I"],
    ["I", "IV", "V", "vi"],
    ["vi", "IV", "I", "V"],
    ["IV", "V", "I", "I"],
    ["IV", "I", "V", "I"],
    ["V", "I", "IV", "I"],
    ["V", "vi", "IV", "I"]
  ];

  let raw;
  if (state.settings.difficulty === 1) {
    if (!isRandomPos) {
      raw = cadencesL1[Math.floor(Math.random() * cadencesL1.length)];
    } else {
      const wantedChord = available[Math.floor(Math.random() * available.length)];
      const matches = cadencesL1RandomPool.filter(p =>
        p[targetIndex] === wantedChord && (targetIndex > 0 || p.slice(1).includes("I"))
      );
      raw = matches.length
        ? matches[Math.floor(Math.random() * matches.length)]
        : cadencesL1RandomPool[Math.floor(Math.random() * cadencesL1RandomPool.length)];
    }
  } else if (!isRandomPos) {
    raw = ["I", ...Array.from({ length: 3 }, () => available[Math.floor(Math.random() * available.length)])];
  } else {
    raw = Array.from({ length: 4 }, () => available[Math.floor(Math.random() * available.length)]);
    if (targetIndex > 0) {
      raw[0] = "I";
    } else if (![1, 2, 3].some(i => raw[i] === "I")) {
      // Wenn Takt 1 gesucht ist, sorgt mindestens eine sichtbare Tonika (I) in Takt 2–4 für klaren Kontext
      raw[1 + Math.floor(Math.random() * 3)] = "I";
    }
  }

  const bars = raw.map(degKey => {
    const def = getLocalizedDegreeDef(degKey);
    const n = buildChordNotes(rootMidi, def);
    return {
      key: degKey,
      symbol: def.roman,
      label: def.label,
      short: def.short,
      notes: n.chordNotes,
      bass: n.bassNote
    };
  });

  state.currentExercise = {
    type: "cadence",
    keyName: getKeyDisplayName(state.currentKey),
    targetIndex: targetIndex,
    targetItem: bars[targetIndex],
    bars: bars,
    choices: available
  };
}

let lastMelodicRootMidi = null;
const MELODIC_FLAT_KEY_PCS = new Set([1, 3, 5, 8, 10]);
const DOWNWARD_FLAT_INTERVAL_KEYS = new Set(["M2", "M3", "TT", "M6", "M7", "M9"]);

function pickMelodicRootMidi(isDown) {
  // Sinnvoller mittlerer Tonraum (auf dem Handy & im Ensemble klar hörbar, max. None innerhalb E3–Fis5):
  // Aufwärts: F3 (53) – E4 (64), Abwärts: Fis4 (66) – F5 (77)
  const minMidi = isDown ? 66 : 53;
  const maxMidi = isDown ? 77 : 64;
  const candidates = [];
  for (let m = minMidi; m <= maxMidi; m++) {
    if (m !== lastMelodicRootMidi) candidates.push(m);
  }
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  lastMelodicRootMidi = picked;
  return picked;
}

function getMelodicIntervalTiming(bpm = state.activeBpm) {
  const safeBpm = Math.max(40, Math.min(220, Number(bpm) || 90));
  const beatSec = 60 / safeBpm;
  const stepMs = Math.round(beatSec * 1000);
  const note1DurSec = Math.max(0.22, beatSec * 0.86);
  const note2DurSec = Math.max(0.28, beatSec * 1.25);
  const cycleMs = Math.round(beatSec * 2.4 * 1000);
  return { beatSec, stepMs, note1DurSec, note2DurSec, cycleMs };
}

function getDroneIntervalTiming(bpm = state.activeBpm) {
  const safeBpm = Math.max(40, Math.min(220, Number(bpm) || 90));
  const beatSec = 60 / safeBpm;
  const delayMs = Math.max(680, Math.min(1850, Math.round(beatSec * 1.75 * 1000)));
  const pianoDurSec = Math.max(0.85, Math.min(2.2, beatSec * 2.15));
  const padDurSec = Math.max(2.0, Number((delayMs / 1000 + pianoDurSec * 0.92).toFixed(2)));
  const cycleMs = Math.round(padDurSec * 1000 + 380);
  return { beatSec, delayMs, pianoDurSec, padDurSec, cycleMs };
}

/**
 * Berechnet kompakte, musikalisch gebundene Schrittabstände und Kadenzdauern
 * (~1,5–2 Schläge je Stufe mit längerem Schlussakkord, skaliert über BPM & Taktart).
 */
function getCadenceStepTiming(bpm = state.activeBpm, timeSig = state.activeTimeSig) {
  const safeBpm = Math.max(40, Math.min(220, Number(bpm) || CADENCE_DEFAULT_BPM));
  const beatSec = 60 / safeBpm;
  let stepBeats = 1.8;
  let finalHoldBeats = 2.4;
  if (timeSig === "3/4" || timeSig === "6/8") {
    stepBeats = 1.5;
    finalHoldBeats = 2.1;
  } else if (timeSig === "odd") {
    stepBeats = 2.0;
    finalHoldBeats = 2.6;
  }
  const stepSec = stepBeats * beatSec;
  const stepMs = Math.round(stepSec * 1000);
  const finalHoldSec = finalHoldBeats * beatSec;
  const finalHoldMs = Math.round(finalHoldSec * 1000);
  const stepDurSec = Math.max(0.32, stepSec * 0.99);
  const finalDurSec = Math.max(0.55, finalHoldSec * 0.94);
  return { beatSec, stepBeats, finalHoldBeats, stepMs, finalHoldMs, stepDurSec, finalDurSec };
}

function generateIntervalExercise(rootMidi, intervalMode) {
  let pool = ["P1", "M3", "P5", "P8"];
  if (state.settings.intervalDifficulty === 2) {
    pool = ["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"];
  } else if (state.settings.intervalDifficulty >= 3) {
    pool = Object.keys(HARMONIC_DATA.intervals);
  }

  const chosenKey = pool[Math.floor(Math.random() * pool.length)];
  const targetDef = getLocalizedIntervalDef(chosenKey);

  const isMelodicUp = intervalMode === "interval-melodic";
  const isMelodicDown = intervalMode === "interval-melodic-down";
  const isMelodic = isMelodicUp || isMelodicDown;
  const isDrone = intervalMode === "interval-drone";

  const effectiveRootMidi = (isMelodic || isDrone) ? pickMelodicRootMidi(isMelodicDown) : rootMidi;
  const directionSign = isMelodicDown ? -1 : 1;
  const targetMidi = effectiveRootMidi + directionSign * targetDef.semitones;

  const refNoteName = midiToNote(effectiveRootMidi);
  const targetNoteName = midiToNote(targetMidi);
  const padLowNoteName = midiToNote(effectiveRootMidi - 12);
  const padNotes = [padLowNoteName, refNoteName];

  const rootPc = ((effectiveRootMidi % 12) + 12) % 12;
  const refPreferFlat = (isMelodic || isDrone)
    ? MELODIC_FLAT_KEY_PCS.has(rootPc)
    : FLAT_KEYS.has(state.currentKey);
  const targetPreferFlat = isMelodicDown
    ? (refPreferFlat || DOWNWARD_FLAT_INTERVAL_KEYS.has(chosenKey))
    : (refPreferFlat || MINOR_INTERVAL_KEYS.has(chosenKey));

  const refDisplayNote = midiToGermanNote(effectiveRootMidi, refPreferFlat);
  const targetDisplayNote = midiToGermanNote(targetMidi, targetPreferFlat);

  let bars = [];
  let targetIdx = 0;

  if (isMelodic) {
    bars = [
      {
        symbol: refDisplayNote,
        label: isMelodicDown ? tr("Ausgangston (Hoch)", "Root Note (High)") : tr("Ausgangston (Ton 1)", "Root Note (Note 1)"),
        short: tr("Ausgangston", "Root Note"),
        notes: [refNoteName],
        bass: null
      },
      {
        symbol: targetDisplayNote,
        label: targetDef.label,
        short: targetDef.short,
        notes: [targetNoteName],
        bass: null,
        key: chosenKey
      }
    ];
    targetIdx = 1;
  } else if (isDrone) {
    bars = [
      {
        symbol: refDisplayNote,
        label: tr("Grundton (Streicher-Fläche)", "Root (Strings Pad)"),
        short: tr("Streicher-Fläche", "Strings Pad"),
        notes: padNotes,
        bass: null
      },
      {
        symbol: targetDisplayNote,
        label: targetDef.label,
        short: targetDef.short,
        notes: [targetNoteName],
        bass: null,
        key: chosenKey
      }
    ];
    targetIdx = 1;
  } else {
    bars = [
      { symbol: `${refDisplayNote} + ${targetDisplayNote}`, label: targetDef.label, short: targetDef.short, notes: [refNoteName, targetNoteName], bass: null, key: chosenKey }
    ];
    targetIdx = 0;
  }

  state.currentExercise = {
    type: intervalMode,
    effectiveRootMidi: effectiveRootMidi,
    targetMidi: targetMidi,
    refPreferFlat: refPreferFlat,
    targetPreferFlat: targetPreferFlat,
    isMelodic: isMelodic,
    isMelodicDown: isMelodicDown,
    isDrone: isDrone,
    padNotes: padNotes,
    keyName: `${tr("Ausgangston", "Root")} ${refDisplayNote.replace(/[0-9]/g, "")}`,
    targetIndex: targetIdx,
    targetItem: {
      ...targetDef,
      key: chosenKey,
      rootMidi: effectiveRootMidi,
      directionSign: directionSign,
      refNote: refNoteName,
      targetNote: targetNoteName,
      padNotes: padNotes,
      displayMain: bars[targetIdx].symbol,
      notes: [refNoteName, targetNoteName]
    },
    bars: bars,
    choices: pool
  };
}

function generateChordExercise(rootMidi, chordMode = "interval-chords") {
  const lvl = state.settings.chordDifficulty || 1;
  const pool = CHORD_LEVEL_POOLS[lvl] || CHORD_LEVEL_POOLS[1];
  const chosenKey = pool[Math.floor(Math.random() * pool.length)];
  const targetDef = getLocalizedChordDef(chosenKey);

  const chordNotes = targetDef.offsets.map(s => midiToNote(rootMidi + s));
  const refNoteName = midiToNote(rootMidi);
  const notesDisplay = formatChordGermanNotes(rootMidi, targetDef.offsets, state.currentKey);
  const rootDisplay = midiToGermanNote(rootMidi, FLAT_KEYS.has(state.currentKey)).replace(/[0-9]/g, "");

  const bars = [
    {
      symbol: notesDisplay,
      label: targetDef.label,
      short: targetDef.short,
      notes: chordNotes,
      bass: null,
      key: chosenKey
    }
  ];

  state.currentExercise = {
    type: chordMode,
    offsets: targetDef.offsets,
    rootKey: state.currentKey,
    keyName: `${tr("Grundton", "Root")} ${rootDisplay}`,
    targetIndex: 0,
    targetItem: {
      ...targetDef,
      key: chosenKey,
      rootMidi: rootMidi,
      refNote: refNoteName,
      targetNote: chordNotes[1] || refNoteName,
      displayMain: notesDisplay,
      notes: chordNotes
    },
    bars: bars,
    choices: pool
  };
}

function generateChordInversionExercise(rootMidi) {
  const lvl = state.settings.chordInversionDifficulty || 1;
  const cfg = CHORD_INVERSION_LEVELS[lvl] || CHORD_INVERSION_LEVELS[1];
  const chordKey = cfg.chordKeys[Math.floor(Math.random() * cfg.chordKeys.length)];
  const chosenInvKey = cfg.choices[Math.floor(Math.random() * cfg.choices.length)];
  const invDef = getLocalizedChordInversionDef(chosenInvKey);
  const chordDef = getLocalizedChordDef(chordKey);
  const invData = buildChordInversionNotes(rootMidi, chordKey, invDef.stepIndex, state.currentKey);
  const rootDisplay = midiToGermanNote(rootMidi, FLAT_KEYS.has(state.currentKey)).replace(/[0-9]/g, "");
  const solvedShort = `${invData.slashTitle} • ${invDef.short}`;
  const fullLabel = `${invDef.label} • ${invData.slashTitle} (${chordDef.short})`;

  const bars = [
    {
      symbol: invData.noteDisplay,
      label: fullLabel,
      short: solvedShort,
      notes: invData.notes,
      bass: null,
      key: chosenInvKey
    }
  ];

  state.currentExercise = {
    type: "chord-inversions",
    chordKey: chordKey,
    inversionLevel: lvl,
    rootKey: state.currentKey,
    keyName: `${tr("Grundton", "Root")} ${rootDisplay}`,
    targetIndex: 0,
    targetItem: {
      ...invDef,
      label: fullLabel,
      key: chosenInvKey,
      chordKey: chordKey,
      rootMidi: rootMidi,
      bassMidi: invData.bassMidi,
      bassNote: invData.bassNote,
      refNote: midiToNote(rootMidi),
      displayMain: invData.noteDisplay,
      slashTitle: invData.slashTitle,
      notes: invData.notes,
      midis: invData.midis
    },
    bars: bars,
    choices: cfg.choices
  };
}

function generateRhythmMeterExercise() {
  const lvl = state.settings.rhythmMeterDifficulty || 1;
  const pool = RHYTHM_METER_LEVELS[lvl] || RHYTHM_METER_LEVELS[1];
  const chosenKey = pool[Math.floor(Math.random() * pool.length)];
  const targetDef = getLocalizedRhythmMeter(chosenKey) || getLocalizedRhythmMeter("4/4");

  const bars = [
    { symbol: targetDef.symbol, short: targetDef.short, label: targetDef.label, key: chosenKey },
    { symbol: targetDef.symbol, short: targetDef.short, label: targetDef.label, key: chosenKey }
  ];

  state.currentExercise = {
    type: "rhythm-meter",
    level: lvl,
    keyName: tr("Metrum", "Meter"),
    targetIndex: 0,
    targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.symbol },
    bars: bars,
    choices: pool
  };
}

function generateProdToneExercise() {
  const lvl = state.settings.prodToneDifficulty || 1;
  const cfg = PROD_TONE_LEVELS[lvl] || PROD_TONE_LEVELS[1];
  const prevKey = state.currentExercise?.type === "prod-tone" ? state.currentExercise.targetItem?.key : null;
  const candidates = cfg.choices.length > 1 ? cfg.choices.filter(k => k !== prevKey) : cfg.choices;
  const chosenKey = candidates[Math.floor(Math.random() * candidates.length)] || cfg.choices[0];
  const targetDef = getLocalizedProdFreq(chosenKey) || getLocalizedProdFreq("1000");

  state.currentExercise = {
    type: "prod-tone",
    level: lvl,
    levelLabel: getLocalizedProdLevelLabel("tone", lvl),
    keyName: tr("Sinuston", "Sine Wave"),
    targetIndex: 0,
    targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.symbol },
    bars: [
      { symbol: targetDef.symbol, short: targetDef.short, label: targetDef.label, key: chosenKey }
    ],
    choices: cfg.choices
  };
}

function formatEqParamsLabel(boostDb, q) {
  const commaLabel = `+${String(boostDb).replace(".", ",")} dB • Q ${String(q).replace(".", ",")}`;
  return tr(commaLabel, `+${boostDb} dB • Q ${q}`, { fr: commaLabel, uk: commaLabel });
}

function generateProdEqNoiseExercise() {
  const lvl = state.settings.prodEqNoiseDifficulty || 1;
  const cfg = PROD_EQ_NOISE_LEVELS[lvl] || PROD_EQ_NOISE_LEVELS[1];
  const prevKey = state.currentExercise?.type === "prod-eq-noise" ? state.currentExercise.targetItem?.key : null;
  const candidates = cfg.choices.length > 1 ? cfg.choices.filter(k => k !== prevKey) : cfg.choices;
  const chosenKey = candidates[Math.floor(Math.random() * candidates.length)] || cfg.choices[0];
  const targetDef = getLocalizedProdFreq(chosenKey) || getLocalizedProdFreq("1000");

  state.currentExercise = {
    type: "prod-eq-noise",
    level: lvl,
    levelLabel: getLocalizedProdLevelLabel("eq", lvl),
    boostDb: cfg.boostDb,
    q: cfg.q,
    noiseBypassed: false,
    keyName: formatEqParamsLabel(cfg.boostDb, cfg.q),
    targetIndex: 1,
    targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.symbol },
    bars: [
      { symbol: "Flat", short: tr("Original-Noise", "Original Noise"), label: tr("Klicken für Flat-Vergleich (Bypass)", "Click for Flat A/B comparison (Bypass)"), key: "ref" },
      { symbol: targetDef.symbol, short: targetDef.short, label: targetDef.label, key: chosenKey }
    ],
    choices: cfg.choices
  };
}

function buildModesExercise(exType, level, levelCfg) {
  const prevKey = state.currentExercise?.type === exType ? state.currentExercise.targetItem?.key : null;
  const candidates = levelCfg.choices.length > 1
    ? levelCfg.choices.filter(k => k !== prevKey)
    : levelCfg.choices;
  const chosenKey = candidates[Math.floor(Math.random() * candidates.length)] || levelCfg.choices[0];
  const targetDef = getLocalizedModeDef(chosenKey) || getLocalizedModeDef("ionian");

  const useRandomRoot = Boolean(levelCfg.randomRoot || state.settings.keyMode === "random");
  const rootPool = [55, 57, 58, 60, 62, 63, 64, 65];
  const rootMidi = useRandomRoot ? rootPool[Math.floor(Math.random() * rootPool.length)] : 60;
  const rootLabel = midiToNote(rootMidi).replace(/\d+$/, "");
  const preferFlat = ["dorian", "phrygian", "mixolydian", "aeolian", "locrian", "harm_minor"].includes(chosenKey)
    || [58, 63, 65].includes(rootMidi);
  const toNote = (semi) => midiToNote(rootMidi + semi, preferFlat);

  const modeKind = exType === "modes-char"
    ? "char"
    : (exType === "modes-cadence" ? "cadence" : "scale");
  const kindLabel = modeKind === "char"
    ? tr("Charakterton", "Color Tone")
    : (modeKind === "cadence" ? tr("Kadenz", "Vamp") : tr("Tonleiter", "Scale"));

  state.currentExercise = {
    type: exType,
    level: level,
    modeKind: modeKind,
    chosenKey: chosenKey,
    levelLabel: getLocalizedModeLevelLabel(modeKind, level),
    rootMidi: rootMidi,
    rootLabel: rootLabel,
    keyName: `${tr("Grundton", "Root")} ${rootLabel}`,
    anchorBass: midiToNote(rootMidi - 12, preferFlat),
    anchorNotes: [midiToNote(rootMidi - 12, preferFlat), toNote(0), toNote(7)],
    scaleNotes: targetDef.intervals.map(toNote),
    charNotes: targetDef.charTurn.map(toNote),
    vampChords: targetDef.vampOffsets.map(ch => ch.map(toNote)),
    targetIndex: 1,
    targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.roman },
    bars: [
      { symbol: `${rootLabel}5`, short: tr("Anker-Quinte", "Anchor Fifth"), label: tf("Neutraler Ausgangsklang ({root}5)", "Neutral open fifth ({root}5)", { root: rootLabel }), key: "ref" },
      { symbol: targetDef.roman, short: targetDef.short, label: `${kindLabel} (${rootLabel})`, key: chosenKey }
    ],
    choices: levelCfg.choices
  };
}

function generateModesScaleExercise() {
  const lvl = state.settings.modesScaleDifficulty || 1;
  buildModesExercise("modes-scale", lvl, MODE_SCALE_LEVELS[lvl] || MODE_SCALE_LEVELS[1]);
}

function generateModesCharExercise() {
  const lvl = state.settings.modesCharDifficulty || 1;
  buildModesExercise("modes-char", lvl, MODE_CHAR_LEVELS[lvl] || MODE_CHAR_LEVELS[1]);
}

function generateModesCadenceExercise() {
  const lvl = state.settings.modesCadenceDifficulty || 1;
  buildModesExercise("modes-cadence", lvl, MODE_CADENCE_LEVELS[lvl] || MODE_CADENCE_LEVELS[1]);
}

function generateRhythmDictationExercise() {
  const lvl = state.settings.rhythmDictationDifficulty || 1;
  const pool = RHYTHM_DICTATION_LEVELS[lvl] || RHYTHM_DICTATION_LEVELS[1];

  let pickedKeys = null;
  for (let attempt = 0; attempt < 24; attempt++) {
    const candidate = [];
    for (let i = 0; i < 4; i++) {
      let avail = pool;
      if (lvl === 1 && i === 0) {
        avail = pool.filter(k => k !== "rest");
      }
      candidate.push(avail[Math.floor(Math.random() * avail.length)]);
    }
    const distinct = new Set(candidate);
    const totalHits = candidate.reduce((sum, k) => sum + RHYTHM_DICTATION_CELLS[k].offsets.length, 0);
    if (distinct.size >= 2 && totalHits >= 2) {
      pickedKeys = candidate;
      break;
    }
  }
  if (!pickedKeys) {
    pickedKeys = [pool[0], pool[Math.min(1, pool.length - 1)], pool[pool.length - 1], pool[0]];
  }

  const rhythmSlots = pickedKeys.map((cellKey, idx) => {
    const cell = getLocalizedRhythmCell(cellKey);
    return {
      index: idx,
      cellKey: cellKey,
      cell: cell,
      solved: false
    };
  });

  state.currentExercise = {
    type: "rhythm-dictation",
    level: lvl,
    keyName: "4/4",
    targetIndex: 0,
    targetItem: rhythmSlots[0].cell,
    rhythmSlots: rhythmSlots,
    rhythmStep: 0,
    bars: rhythmSlots.map((_, i) => ({ symbol: "?", short: `${tr("Schlag", "Beat")} ${i + 1}`, label: `${tr("Schlag", "Beat")} ${i + 1}` })),
    choices: pool
  };
}

function generateRhythmTapExercise() {
  const lvl = state.settings.rhythmTapDifficulty || 1;
  const cfg = RHYTHM_TAP_LEVELS[lvl] || RHYTHM_TAP_LEVELS[1];
  const meterKey = cfg.meters[Math.floor(Math.random() * cfg.meters.length)];
  const beatsPerBar = meterKey === "3/4" ? 3 : 4;

  let pickedKeys = null;
  for (let attempt = 0; attempt < 24; attempt++) {
    const candidate = [];
    let tripletCount = 0;
    for (let i = 0; i < beatsPerBar; i++) {
      let avail = cfg.cells.slice();
      if (lvl === 1 && i === 0) avail = avail.filter(k => k !== "rest");
      if (tripletCount >= 1) avail = avail.filter(k => k !== "triplet");
      const k = avail[Math.floor(Math.random() * avail.length)];
      if (k === "triplet") tripletCount++;
      candidate.push(k);
    }
    const totalHits = candidate.reduce((s, k) => s + RHYTHM_DICTATION_CELLS[k].offsets.length, 0);
    if (totalHits >= 2 && totalHits <= 7) {
      pickedKeys = candidate;
      break;
    }
  }
  if (!pickedKeys) {
    pickedKeys = beatsPerBar === 3 ? ["quarter", "rest", "quarter"] : ["quarter", "rest", "quarter", "quarter"];
  }

  const tapSlots = pickedKeys.map((cellKey, idx) => ({
    index: idx,
    cellKey: cellKey,
    cell: getLocalizedRhythmCell(cellKey)
  }));

  state.currentExercise = {
    type: "rhythm-tap",
    level: lvl,
    levelLabel: getLocalizedRhythmTapLevel(lvl).label,
    meterKey: meterKey,
    beatsPerBar: beatsPerBar,
    toleranceMs: cfg.toleranceMs,
    blind: cfg.blind,
    tapSlots: tapSlots,
    tapEvaluated: false,
    lastEvaluation: null,
    targetIndex: 0,
    targetItem: tapSlots[0].cell,
    bars: tapSlots.map((s, i) => ({ symbol: String(i + 1), short: s.cell.short, label: s.cell.label })),
    choices: []
  };
}

function generateRhythmGrooveExercise() {
  const lvl = state.settings.rhythmGrooveDifficulty || 1;

  if (lvl === 1) {
    const pool = ["march", "backbeat", "syncopation", "swing", "poly32"];
    const chosenKey = pool[Math.floor(Math.random() * pool.length)];
    const targetDef = getLocalizedRhythmGroove(chosenKey);
    state.currentExercise = {
      type: "rhythm-groove",
      level: lvl,
      grooveKind: "style",
      keyName: tr("4/4 Groove", "4/4 Groove"),
      targetIndex: 0,
      targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.roman },
      bars: [
        { symbol: targetDef.roman, short: targetDef.short, label: targetDef.label, key: chosenKey },
        { symbol: targetDef.roman, short: targetDef.short, label: targetDef.label, key: chosenKey }
      ],
      choices: pool
    };
    return;
  }

  if (lvl === 2) {
    const pool = ["1", "1+", "2", "2+", "3", "3+", "4", "4+"];
    const chosenKey = pool[Math.floor(Math.random() * pool.length)];
    const targetDef = getLocalizedRhythmOffbeat(chosenKey);
    state.currentExercise = {
      type: "rhythm-groove",
      level: lvl,
      grooveKind: "offbeat",
      keyName: tr("Akzent-Takt", "Accent Bar"),
      targetIndex: 1,
      targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.roman },
      bars: [
        { symbol: "1–4", short: tr("Puls", "Pulse"), label: tr("Referenz-Takt", "Reference Bar"), key: "ref" },
        { symbol: targetDef.roman, short: targetDef.short, label: targetDef.label, key: chosenKey }
      ],
      choices: pool
    };
    return;
  }

  // Stufe 3 (Mittel: 48–66 ms) & Stufe 4 (Profi: 24–34 ms)
  const pool = ["early", "pocket", "late"];
  const chosenKey = pool[Math.floor(Math.random() * pool.length)];
  const targetDef = getLocalizedRhythmMicroTiming(chosenKey);
  const minMag = lvl >= 4 ? 24 : 48;
  const maxMag = lvl >= 4 ? 34 : 66;
  const microMagMs = chosenKey === "pocket"
    ? 0
    : minMag + Math.floor(Math.random() * (maxMag - minMag + 1));

  state.currentExercise = {
    type: "rhythm-groove",
    level: lvl,
    grooveKind: "micro",
    microMagMs: microMagMs,
    keyName: lvl >= 4 ? tr("Profi ±28 ms", "Pro ±28 ms") : tr("Pocket ±55 ms", "Pocket ±55 ms"),
    targetIndex: 0,
    targetItem: { ...targetDef, key: chosenKey, displayMain: targetDef.roman },
    bars: [
      { symbol: targetDef.roman, short: targetDef.short, label: targetDef.label, key: chosenKey }
    ],
    choices: pool
  };
}

/**
 * Erstellt eine Solfège-Aufgabe für alle 6 Schwierigkeitsstufen:
 * - Stufe 1: C-Dur, 1 Oktave (mittlere Höhe)
 * - Stufe 2: Nicht C-Dur (fest für Sitzung), 1 Oktave
 * - Stufe 3: C-Dur, mehrere Oktaven
 * - Stufe 4: Nicht C-Dur (fest für Sitzung), mehrere Oktaven
 * - Stufe 5: Nicht C-Dur (neu nach jeder Antwort), 1 Oktave
 * - Stufe 6: Nicht C-Dur (neu nach jeder Antwort), mehrere Oktaven
 */
function generateSolfegeExercise(rootMidi) {
  const sLvl = state.settings.solfegeDifficulty || 1;
  const isMultiOctave = sLvl === 3 || sLvl === 4 || sLvl === 6;

  const chosenStep = SOLFEGE_SCALE_STEPS[Math.floor(Math.random() * SOLFEGE_SCALE_STEPS.length)];
  const keyboardMidi = rootMidi + chosenStep.semitones;

  // Bei „Mehrere Oktaven“ (Stufe 3, 4, 6) wird der abgefragte Ton in einer willkürlichen Oktavlage
  // (-1 Oktave, mittlere Oktave oder +1 Oktave) abgespielt, während die Klaviatur 1 Oktave zeigt.
  let octaveShift = 0;
  if (isMultiOctave) {
    const validShifts = getValidOctaveShifts(keyboardMidi);
    octaveShift = validShifts[Math.floor(Math.random() * validShifts.length)];
  }

  const playedMidi = keyboardMidi + octaveShift;
  const keyboardResolveMidis = chosenStep.resolveOffsets.map(off => rootMidi + off);
  const audioResolveMidis = chosenStep.resolveOffsets.map(off => rootMidi + off + octaveShift);
  const cadenceBars = buildContextCadenceBars(rootMidi);

  const leftFrameMidi = prevWhiteMidi(rootMidi);
  const rightFrameMidi = nextWhiteMidi(rootMidi + 12);
  const leftFrameName = getWhiteNoteLabel(((leftFrameMidi % 12) + 12) % 12);
  const rightFrameName = getWhiteNoteLabel(((rightFrameMidi % 12) + 12) % 12);
  const keyBaseName = getKeyDisplayName(state.currentKey);

  state.currentExercise = {
    type: "solfege",
    rootMidi: rootMidi,
    keyCode: state.currentKey,
    keyName: `${keyBaseName} (${leftFrameName}–${rightFrameName})`,
    isMultiOctave: isMultiOctave,
    targetIndex: 4,
    targetItem: {
      ...chosenStep,
      label: getLocalizedSolfegeStepLabel(chosenStep.key, chosenStep.label),
      midi: keyboardMidi,
      playedMidi: playedMidi,
      noteName: midiToNote(playedMidi),
      resolveMidis: keyboardResolveMidis,
      audioResolveMidis: audioResolveMidis
    },
    bars: cadenceBars
  };
}

/**
 * Erstellt eine 4-Ton-Melodieübung auf demselben Grundgerüst wie Solfège:
 * - Vor jeder Aufgabe erklingt die Kontext-Kadenz (I–vi–IV–V)
 * - Danach erklingen (tempoabhängig) 4 halbe Noten aus dem gewählten Tonraum (Do–Fa, Sol–Do oder Ganze Tonart)
 * - Oben stehen 4 Fragezeichen (?), die Schritt für Schritt durch die erkannten Solfège-Namen ersetzt werden
 */
function generateMelodyExercise(rootMidi) {
  const melodyStyle = state.settings.melodyStyle || "rhythmic";
  const range = state.settings.melodyRange || "do-fa";
  const rangeCfg = getLocalizedMelodyRange(range) || getLocalizedMelodyRange("do-fa");
  const isMultiOctave = state.settings.melodyOctaveMode === "multi";
  const isRandomKey = state.settings.melodyKeyMode === "random";
  const allowedSemitones = new Set(rangeCfg.semitones);
  const pool = SOLFEGE_SCALE_STEPS.filter(step => allowedSemitones.has(step.semitones));

  const template = pickMelodyPhraseTemplate(range, melodyStyle);
  const generatedSteps = generateMusicalMelodySteps(pool, template, isMultiOctave, rootMidi);

  const preferFlat = FLAT_KEYS.has(state.currentKey);
  const beatsPerBar = template.beatsPerBar || 4;

  const melodySlots = generatedSteps.map((entry, idx) => {
    const step = entry.step;
    const stepTiming = template.steps[idx] || { offset: idx * 2, beats: 2, rhythm: "half" };
    const beatOffset = Number(stepTiming.offset) || 0;
    const durationBeats = Number(stepTiming.beats) || 2;
    const rhythmKey = stepTiming.rhythm || "half";
    const barIndex = Math.floor((beatOffset + 0.0001) / beatsPerBar);
    const prevBarIndex = idx > 0
      ? Math.floor(((template.steps[idx - 1]?.offset || 0) + 0.0001) / beatsPerBar)
      : 0;
    const beatInBar = beatOffset - barIndex * beatsPerBar;
    const isDownbeat = Math.abs(beatInBar) < 0.01;
    const isOnBeat = Math.abs(beatInBar - Math.round(beatInBar)) < 0.05;
    const velocity = isDownbeat ? 0.96 : (isOnBeat ? 0.84 : 0.72);

    const keyboardMidi = rootMidi + step.semitones;
    const playedMidi = keyboardMidi + (entry.octaveShift || 0);
    return {
      index: idx,
      key: step.key,
      syllable: step.syllable,
      label: getLocalizedSolfegeStepLabel(step.key, step.label),
      midi: keyboardMidi,
      playedMidi: playedMidi,
      noteName: midiToNote(playedMidi),
      germanNote: midiToGermanNote(playedMidi, preferFlat).replace(/[0-9]/g, ""),
      beatOffset: beatOffset,
      durationBeats: durationBeats,
      rhythmKey: rhythmKey,
      restBeforeBeats: Number(stepTiming.restBefore) || 0,
      barIndex: barIndex,
      barDivider: idx > 0 && barIndex > prevBarIndex,
      isDownbeat: isDownbeat,
      velocity: velocity,
      pitchSolved: false,
      rhythmSolved: melodyStyle !== "dictation",
      solved: false
    };
  });

  const leftFrameMidi = prevWhiteMidi(rootMidi);
  const rightFrameMidi = nextWhiteMidi(rootMidi + 12);
  const leftFrameName = getWhiteNoteLabel(((leftFrameMidi % 12) + 12) % 12);
  const rightFrameName = getWhiteNoteLabel(((rightFrameMidi % 12) + 12) % 12);
  const keyBaseName = getKeyDisplayName(state.currentKey);

  state.currentExercise = {
    type: "melody",
    melodyStyle: melodyStyle,
    templateId: template.id,
    meterKey: template.meter || "4/4",
    beatsPerBar: beatsPerBar,
    totalMelodyBeats: Number(template.totalBeats) || 8,
    totalSlots: melodySlots.length,
    rootMidi: rootMidi,
    keyCode: state.currentKey,
    range: range,
    rangeLabel: rangeCfg.label,
    isRandomKey: isRandomKey,
    isMultiOctave: isMultiOctave,
      keyName: `${keyBaseName} (${leftFrameName}–${rightFrameName})`,
      activeSemitones: rangeCfg.semitones,
      cadenceBars: buildContextCadenceBars(rootMidi),
      melodySlots: melodySlots,
      melodyStep: 0,
      bars: melodySlots
    };
  }

function buildNextNotationQueueNote(ex, prevNote = null) {
  let clefId = ex.baseClefId || "treble";
  if (ex.isMixedClef && !state.exam?.active) {
    // Im Schlüssel-Mix alle 3 Noten geordnet den Schlüssel wechseln (mit kleinem Wechsel-Schlüssel)
    ex.mixedCounter = (ex.mixedCounter || 0);
    if (prevNote && ex.mixedCounter > 0 && ex.mixedCounter % 3 === 0) {
      const nextIdx = ((ex.mixedClefCursor || 0) + 1) % NOTATION_ACTIVE_CLEFS.length;
      ex.mixedClefCursor = nextIdx;
    }
    clefId = NOTATION_ACTIVE_CLEFS[ex.mixedClefCursor || 0];
    ex.mixedCounter += 1;
  }
  return pickRandomNotationNoteItem(clefId, ex.level, prevNote, ex.keySignatureId || "none");
}

function populateNotationExerciseQueue(ex) {
  if (!ex) return;
  const queueLen = state.exam?.active ? 1 : NOTATION_QUEUE_SIZE;
  ex.notationQueue = [];
  ex.mixedCounter = 0;
  for (let i = 0; i < queueLen; i++) {
    const prev = i > 0 ? ex.notationQueue[i - 1] : null;
    ex.notationQueue.push(buildNextNotationQueueNote(ex, prev));
  }
  ex.targetItem = ex.notationQueue[0] || null;
  ex.keyName = getLocalizedNotationClefName(ex.targetItem?.clefId || ex.baseClefId || "treble");
}

function generateNotationExercise(modeOverride = state.settings.mode) {
  const mode = isNotationMode(modeOverride) ? modeOverride : "notation-treble";
  const lvl = Math.max(1, Math.min(4, parseInt(state.settings.notationDifficulty, 10) || 1));
  const keyMode = normalizeNotationKeyMode(state.settings.notationKeyMode);
  const initialKeySig = resolveNotationKeySignatureId(keyMode);
  const isMixed = mode === "notation-mixed";
  const initialClef = isMixed
    ? NOTATION_ACTIVE_CLEFS[Math.floor(Math.random() * NOTATION_ACTIVE_CLEFS.length)]
    : getNotationClefFromMode(mode);
  const lvlCfg = NOTATION_LEVELS[lvl] || NOTATION_LEVELS[1];

  const ex = {
    type: mode,
    level: lvl,
    notationKeyMode: keyMode,
    keySignatureId: initialKeySig,
    keySignaturePhraseProgress: 0,
    keySignaturePhraseLength: NOTATION_KEY_PHRASE_LEN,
    allowAccidentals: Boolean(lvlCfg.allowAccidentals || initialKeySig !== "none"),
    isMixedClef: isMixed,
    baseClefId: initialClef,
    mixedClefCursor: Math.max(0, NOTATION_ACTIVE_CLEFS.indexOf(initialClef)),
    mixedCounter: 0,
    rootMidi: 60,
    notationQueue: [],
    notationSolvedCount: 0,
    notationSkippedCount: 0,
    notationDidShift: false,
    notationPanelState: "",
    notationLastFeedback: null,
    targetItem: null,
    bars: []
  };

  populateNotationExerciseQueue(ex);
  state.currentExercise = ex;
}

function refreshNotationQueueLocalization(ex) {
  if (!ex || !Array.isArray(ex.notationQueue)) return;
  const exSig = normalizeNotationKeySigId(ex.keySignatureId || "none");
  ex.notationQueue = ex.notationQueue.map(n =>
    getNotationNoteFromStaffStep(n.clefId, n.staffStep, n.accidental, n.keySignatureId || exSig, n.shownAccidental)
  );
  ex.targetItem = ex.notationQueue[0] || null;
  if (ex.targetItem) {
    ex.keyName = getLocalizedNotationClefName(ex.targetItem.clefId);
  }
}

function refreshExerciseLocalization(ex) {
  if (typeof renderStageStreakUI === "function") renderStageStreakUI();
  if (!ex) return;

  if (ex.type === "cadence") {
    ex.keyName = getKeyDisplayName(state.currentKey);
    (ex.bars || []).forEach(bar => {
      const def = getLocalizedDegreeDef(bar.key);
      if (def) {
        bar.symbol = def.roman;
        bar.label = def.label;
        bar.short = def.short;
      }
    });
    return;
  }

  if (isChordQualityMode(ex.type)) {
    const def = getLocalizedChordDef(ex.targetItem?.key);
    if (!def) return;
    const rootMidi = ex.targetItem.rootMidi;
    const rootKey = ex.rootKey || state.currentKey;
    const notesDisplay = formatChordGermanNotes(rootMidi, ex.offsets || def.offsets, rootKey);
    const rootDisplay = midiToGermanNote(rootMidi, FLAT_KEYS.has(rootKey)).replace(/[0-9]/g, "");
    ex.keyName = `${tr("Grundton", "Root")} ${rootDisplay}`;
    Object.assign(ex.targetItem, def, { displayMain: notesDisplay });
    if (ex.bars?.[0]) {
      ex.bars[0].symbol = notesDisplay;
      ex.bars[0].label = def.label;
      ex.bars[0].short = def.short;
    }
    return;
  }

  if (ex.type === "chord-inversions") {
    const invDef = getLocalizedChordInversionDef(ex.targetItem?.key);
    const chordDef = getLocalizedChordDef(ex.chordKey);
    if (!invDef || !chordDef) return;
    const rootMidi = ex.targetItem.rootMidi;
    const rootKey = ex.rootKey || state.currentKey;
    const midis = ex.targetItem.midis || [];
    const noteDisplay = formatChordMidiNoteList(midis, rootMidi, rootKey).join(" · ");
    const slashTitle = formatInversionChordTitle(rootMidi, rootKey, ex.chordKey, ex.targetItem.bassMidi, invDef.stepIndex);
    const rootDisplay = midiToGermanNote(rootMidi, FLAT_KEYS.has(rootKey)).replace(/[0-9]/g, "");
    const solvedShort = `${slashTitle} • ${invDef.short}`;
    const fullLabel = `${invDef.label} • ${slashTitle} (${chordDef.short})`;
    ex.keyName = `${tr("Grundton", "Root")} ${rootDisplay}`;
    Object.assign(ex.targetItem, invDef, {
      label: fullLabel,
      displayMain: noteDisplay,
      slashTitle: slashTitle
    });
    if (ex.bars?.[0]) {
      ex.bars[0].symbol = noteDisplay;
      ex.bars[0].label = fullLabel;
      ex.bars[0].short = solvedShort;
    }
    return;
  }

  if (String(ex.type || "").startsWith("interval-")) {
    const def = getLocalizedIntervalDef(ex.targetItem?.key);
    if (!def) return;
    const refDisplayNote = midiToGermanNote(ex.effectiveRootMidi ?? ex.targetItem.rootMidi, Boolean(ex.refPreferFlat));
    const targetDisplayNote = ex.targetMidi != null
      ? midiToGermanNote(ex.targetMidi, Boolean(ex.targetPreferFlat))
      : ex.targetItem.displayMain;
    ex.keyName = `${tr("Ausgangston", "Root")} ${refDisplayNote.replace(/[0-9]/g, "")}`;
    if (ex.isMelodic && ex.bars?.length >= 2) {
      ex.bars[0].symbol = refDisplayNote;
      ex.bars[0].short = tr("Ausgangston", "Root Note");
      ex.bars[0].label = ex.isMelodicDown ? tr("Ausgangston (Hoch)", "Root Note (High)") : tr("Ausgangston (Ton 1)", "Root Note (Note 1)");
      ex.bars[1].symbol = targetDisplayNote;
      ex.bars[1].short = def.short;
      ex.bars[1].label = def.label;
    } else if (ex.type === "interval-drone" && ex.bars?.length >= 2) {
      ex.bars[0].symbol = refDisplayNote;
      ex.bars[0].short = tr("Streicher-Fläche", "Strings Pad");
      ex.bars[0].label = tr("Grundton (Streicher-Fläche)", "Root (Strings Pad)");
      ex.bars[1].symbol = targetDisplayNote;
      ex.bars[1].short = def.short;
      ex.bars[1].label = def.label;
    } else if (ex.bars?.[0]) {
      ex.bars[0].symbol = `${refDisplayNote} + ${targetDisplayNote}`;
      ex.bars[0].short = def.short;
      ex.bars[0].label = def.label;
    }
    Object.assign(ex.targetItem, def, { displayMain: ex.bars[ex.targetIndex]?.symbol || targetDisplayNote });
    if (state.wrongAnswerData && state.wrongAnswerData.target === ex.targetItem && state.wrongAnswerData.chosen?.key) {
      const refreshedChosen = getLocalizedIntervalDef(state.wrongAnswerData.chosen.key);
      if (refreshedChosen) {
        state.wrongAnswerData.chosen = { ...state.wrongAnswerData.chosen, ...refreshedChosen };
      }
    }
    return;
  }

  if (ex.type === "rhythm-meter") {
    const def = getLocalizedRhythmMeter(ex.targetItem?.key);
    if (!def) return;
    ex.keyName = tr("Metrum", "Meter");
    Object.assign(ex.targetItem, def, { displayMain: def.symbol });
    (ex.bars || []).forEach(b => {
      b.symbol = def.symbol;
      b.short = def.short;
      b.label = def.label;
    });
    return;
  }

  if (ex.type === "prod-tone") {
    const def = getLocalizedProdFreq(ex.targetItem?.key);
    if (!def) return;
    ex.levelLabel = getLocalizedProdLevelLabel("tone", ex.level);
    ex.keyName = tr("Sinuston", "Sine Wave");
    Object.assign(ex.targetItem, def, { displayMain: def.symbol });
    if (ex.bars?.[0]) {
      ex.bars[0].symbol = def.symbol;
      ex.bars[0].short = def.short;
      ex.bars[0].label = def.label;
    }
    return;
  }

  if (ex.type === "prod-eq-noise") {
    const def = getLocalizedProdFreq(ex.targetItem?.key);
    if (!def) return;
    ex.levelLabel = getLocalizedProdLevelLabel("eq", ex.level);
    ex.keyName = formatEqParamsLabel(ex.boostDb, ex.q);
    Object.assign(ex.targetItem, def, { displayMain: def.symbol });
    if (ex.bars?.[0]) {
      ex.bars[0].short = tr("Original-Noise", "Original Noise");
      ex.bars[0].label = tr("Klicken für Flat-Vergleich (Bypass)", "Click for Flat A/B comparison (Bypass)");
    }
    if (ex.bars?.[1]) {
      ex.bars[1].symbol = def.symbol;
      ex.bars[1].short = def.short;
      ex.bars[1].label = def.label;
    }
    return;
  }

  if (String(ex.type || "").startsWith("modes-")) {
    const key = ex.chosenKey || ex.targetItem?.key;
    const def = getLocalizedModeDef(key);
    if (!def) return;
    const modeKind = ex.modeKind || (ex.type === "modes-char" ? "char" : (ex.type === "modes-cadence" ? "cadence" : "scale"));
    const kindLabel = modeKind === "char"
      ? tr("Charakterton", "Color Tone")
      : (modeKind === "cadence" ? tr("Kadenz", "Vamp") : tr("Tonleiter", "Scale"));
    ex.levelLabel = getLocalizedModeLevelLabel(modeKind, ex.level);
    ex.keyName = `${tr("Grundton", "Root")} ${ex.rootLabel}`;
    Object.assign(ex.targetItem, def, { displayMain: def.roman });
    if (ex.bars?.[0]) {
      ex.bars[0].short = tr("Anker-Quinte", "Anchor Fifth");
      ex.bars[0].label = tf("Neutraler Ausgangsklang ({root}5)", "Neutral open fifth ({root}5)", { root: ex.rootLabel });
    }
    if (ex.bars?.[1]) {
      ex.bars[1].symbol = def.roman;
      ex.bars[1].short = def.short;
      ex.bars[1].label = `${kindLabel} (${ex.rootLabel})`;
    }
    return;
  }

  if (ex.type === "rhythm-dictation") {
    ex.keyName = "4/4";
    (ex.rhythmSlots || []).forEach((slot, i) => {
      const cell = getLocalizedRhythmCell(slot.cellKey);
      if (cell) slot.cell = cell;
      if (ex.bars?.[i]) {
        ex.bars[i].short = `${tr("Schlag", "Beat")} ${i + 1}`;
        ex.bars[i].label = `${tr("Schlag", "Beat")} ${i + 1}`;
      }
    });
    const curSlot = ex.rhythmSlots?.[ex.rhythmStep || 0];
    if (curSlot) ex.targetItem = curSlot.cell;
    return;
  }

  if (ex.type === "rhythm-tap") {
    ex.levelLabel = getLocalizedRhythmTapLevel(ex.level)?.label || ex.levelLabel;
    (ex.tapSlots || []).forEach((slot, i) => {
      const cell = getLocalizedRhythmCell(slot.cellKey);
      if (cell) {
        slot.cell = cell;
        if (ex.bars?.[i]) {
          ex.bars[i].short = cell.short;
          ex.bars[i].label = cell.label;
        }
      }
    });
    if (ex.tapSlots?.[0]) ex.targetItem = ex.tapSlots[0].cell;
    return;
  }

  if (ex.type === "rhythm-groove") {
    const key = ex.targetItem?.key;
    if (ex.grooveKind === "style") {
      const def = getLocalizedRhythmGroove(key);
      if (!def) return;
      ex.keyName = tr("4/4 Groove", "4/4 Groove");
      Object.assign(ex.targetItem, def, { displayMain: def.roman });
      (ex.bars || []).forEach(b => {
        b.symbol = def.roman;
        b.short = def.short;
        b.label = def.label;
      });
    } else if (ex.grooveKind === "offbeat") {
      const def = getLocalizedRhythmOffbeat(key);
      if (!def) return;
      ex.keyName = tr("Akzent-Takt", "Accent Bar");
      Object.assign(ex.targetItem, def, { displayMain: def.roman });
      if (ex.bars?.[0]) {
        ex.bars[0].short = tr("Puls", "Pulse");
        ex.bars[0].label = tr("Referenz-Takt", "Reference Bar");
      }
      if (ex.bars?.[1]) {
        ex.bars[1].symbol = def.roman;
        ex.bars[1].short = def.short;
        ex.bars[1].label = def.label;
      }
    } else {
      const def = getLocalizedRhythmMicroTiming(key);
      if (!def) return;
      ex.keyName = ex.level >= 4 ? tr("Profi ±28 ms", "Pro ±28 ms") : tr("Pocket ±55 ms", "Pocket ±55 ms");
      Object.assign(ex.targetItem, def, { displayMain: def.roman });
      if (ex.bars?.[0]) {
        ex.bars[0].symbol = def.roman;
        ex.bars[0].short = def.short;
        ex.bars[0].label = def.label;
      }
    }
    return;
  }

  if (ex.type === "solfege") {
    const keyCode = ex.keyCode || state.currentKey;
    const leftFrameName = getWhiteNoteLabel(((prevWhiteMidi(ex.rootMidi) % 12) + 12) % 12);
    const rightFrameName = getWhiteNoteLabel(((nextWhiteMidi(ex.rootMidi + 12) % 12) + 12) % 12);
    ex.keyName = `${getKeyDisplayName(keyCode)} (${leftFrameName}–${rightFrameName})`;
    if (ex.targetItem?.key) {
      const baseStep = SOLFEGE_SCALE_STEPS.find(s => s.key === ex.targetItem.key);
      ex.targetItem.label = getLocalizedSolfegeStepLabel(ex.targetItem.key, baseStep?.label || ex.targetItem.label);
    }
    ex.bars = buildContextCadenceBars(ex.rootMidi);
    return;
  }

  if (ex.type === "melody") {
    const keyCode = ex.keyCode || state.currentKey;
    const rangeCfg = getLocalizedMelodyRange(ex.range) || getLocalizedMelodyRange("do-fa");
    const preferFlat = FLAT_KEYS.has(keyCode);
    const leftFrameName = getWhiteNoteLabel(((prevWhiteMidi(ex.rootMidi) % 12) + 12) % 12);
    const rightFrameName = getWhiteNoteLabel(((nextWhiteMidi(ex.rootMidi + 12) % 12) + 12) % 12);
    ex.rangeLabel = rangeCfg.label;
    ex.keyName = `${getKeyDisplayName(keyCode)} (${leftFrameName}–${rightFrameName})`;
    ex.cadenceBars = buildContextCadenceBars(ex.rootMidi);
    (ex.melodySlots || []).forEach(slot => {
      const baseStep = SOLFEGE_SCALE_STEPS.find(s => s.key === slot.key);
      slot.label = getLocalizedSolfegeStepLabel(slot.key, baseStep?.label || slot.label);
      slot.germanNote = midiToGermanNote(slot.playedMidi, preferFlat).replace(/[0-9]/g, "");
    });
    return;
  }

  if (isNotationMode(ex.type)) {
    refreshNotationQueueLocalization(ex);
  }
}

/**
 * Baut die 1-Oktav-Klaviatur dynamisch für jede beliebige Tonart auf:
 * - Zeigt an beiden Enden jeweils eine weiße Rahmentaste nur halb breit (nicht in der Tonart benutzt); die gewonnene Breite wird proportional auf die Tasten dazwischen verteilt.
 * - Alle 8 Töne der aktuellen Dur-Tonleiter (egal ob weiße oder schwarze Taste) werden eindeutig über ihr mittiges Solfège-Kästchen (Do–Re–Mi–Fa–Sol–La–Ti–Do) markiert.
 * - Innere Tasten außerhalb der Tonart behalten ihre reguläre Klaviatur-Farbe (ohne Kästchen); nur die beiden äußeren halben Rahmentasten bleiben dezent abgesetzt.
 */
const NOTATION_BLACK_LABELS_DE = {
  1: "Cis\nDes",
  3: "Dis\nEs",
  6: "Fis\nGes",
  8: "Gis\nAs",
  10: "Ais\nB"
};
const NOTATION_BLACK_LABELS_INTL = {
  1: "C♯\nD♭",
  3: "D♯\nE♭",
  6: "F♯\nG♭",
  8: "G♯\nA♭",
  10: "A♯\nB♭"
};

function renderNotationKeyboard(wrap, ex) {
  wrap.classList.add("is-notation");
  const firstWhite = 59; // H3 / B3 als halbe linke Rahmentaste
  const lastWhite = 72;  // C5 als halbe rechte Rahmentaste
  const showBlackLabels = Boolean(ex?.allowAccidentals || (ex?.keySignatureId && ex.keySignatureId !== "none"));
  const useIntl = typeof state !== "undefined" && state?.profile?.notation === "intl";
  const blackLabelMap = useIntl ? NOTATION_BLACK_LABELS_INTL : NOTATION_BLACK_LABELS_DE;

  const whiteKeys = [];
  const blackKeys = [];

  for (let m = firstWhite; m <= lastWhite; m++) {
    const pc = ((m % 12) + 12) % 12;
    const isFrame = (m === firstWhite || m === lastWhite);
    if (isWhiteMidi(m)) {
      const noteLabel = getWhiteNoteLabel(pc);
      whiteKeys.push({
        midi: m,
        pc: pc,
        noteLabel: noteLabel,
        isFrame: isFrame,
        inScale: !isFrame
      });
    } else {
      blackKeys.push({
        midi: m,
        pc: pc,
        afterWhiteIdx: whiteKeys.length - 1,
        noteLabel: blackLabelMap[pc] || ""
      });
    }
  }

  const kb = document.createElement("div");
  kb.className = "piano-keyboard";

  whiteKeys.forEach(wk => {
    const keyBtn = document.createElement("button");
    keyBtn.type = "button";
    keyBtn.className = `piano-white-key ${wk.isFrame ? "piano-key-frame piano-key-inactive" : "piano-key-scale"}`;
    keyBtn.id = `solfegeKey_${wk.midi}`;
    keyBtn.dataset.midi = wk.midi;
    keyBtn.dataset.pc = wk.pc;

    if (wk.inScale) {
      const box = document.createElement("span");
      box.className = "solfege-key-box notation-key-box-white";
      box.textContent = wk.noteLabel;
      keyBtn.appendChild(box);
      keyBtn.addEventListener("click", (e) => handleNotationKeyClick(wk, keyBtn, { inputEvent: e }));
    } else {
      const hint = document.createElement("span");
      hint.className = "piano-note-hint";
      hint.textContent = wk.noteLabel;
      keyBtn.appendChild(hint);
    }

    kb.appendChild(keyBtn);
  });

  const numWhite = whiteKeys.length;
  const totalWeight = whiteKeys.reduce((sum, wk) => sum + (wk.isFrame ? 0.5 : 1), 0);
  const cumWeights = [];
  let runningWeight = 0;
  whiteKeys.forEach(wk => {
    runningWeight += wk.isFrame ? 0.5 : 1;
    cumWeights.push(runningWeight);
  });
  const totalDeductionPx = 10 + Math.max(0, numWhite - 1) * 3;

  blackKeys.forEach(bk => {
    const blackEl = document.createElement("button");
    blackEl.type = "button";
    blackEl.className = "piano-black-key notation-black-active";
    blackEl.id = `solfegeKey_${bk.midi}`;
    blackEl.dataset.midi = bk.midi;
    blackEl.dataset.pc = bk.pc;

    const k = bk.afterWhiteIdx;
    const weightFrac = cumWeights[k] / totalWeight;
    const gapOffsetPx = (5 + (k + 0.5) * 3).toFixed(1);
    blackEl.style.left = `calc(${gapOffsetPx}px + (100% - ${totalDeductionPx}px) * ${weightFrac.toFixed(6)})`;

    if (showBlackLabels && bk.noteLabel) {
      const box = document.createElement("span");
      box.className = "solfege-key-box solfege-key-box-black notation-key-box-black";
      box.textContent = bk.noteLabel;
      blackEl.appendChild(box);
    }
    blackEl.addEventListener("click", (e) => handleNotationKeyClick(bk, blackEl, { inputEvent: e }));
    kb.appendChild(blackEl);
  });

  wrap.innerHTML = "";
  wrap.appendChild(kb);
}

function renderSolfegeKeyboard() {
  const wrap = document.getElementById("solfegeKeyboardWrap");
  if (!wrap) return;

  if (isNotationMode(state.currentExercise?.type)) {
    renderNotationKeyboard(wrap, state.currentExercise);
    return;
  }

  wrap.classList.remove("is-notation");

  const rootMidi = (state.currentExercise && state.currentExercise.rootMidi)
    ? state.currentExercise.rootMidi
    : HARMONIC_DATA.roots[state.currentKey].midi;

  const firstWhite = prevWhiteMidi(rootMidi);
  const lastWhite = nextWhiteMidi(rootMidi + 12);

  // Zuordnung der 8 Tonleiter-Töne (Do bis Do) in dieser Oktave
  const allScaleEntries = [
    [rootMidi + 0,  "Do"],
    [rootMidi + 2,  "Re"],
    [rootMidi + 4,  "Mi"],
    [rootMidi + 5,  "Fa"],
    [rootMidi + 7,  "Sol"],
    [rootMidi + 9,  "La"],
    [rootMidi + 11, "Ti"],
    [rootMidi + 12, "Do"]
  ];
  const activeOffsets = state.currentExercise?.type === "melody" && Array.isArray(state.currentExercise.activeSemitones)
    ? new Set(state.currentExercise.activeSemitones)
    : null;
  const scaleMap = new Map(
    allScaleEntries.filter(([midi]) => !activeOffsets || activeOffsets.has(midi - rootMidi))
  );
  const onKeyboardKeyClick = state.currentExercise?.type === "melody"
    ? handleMelodyKeyClick
    : handleSolfegeKeyClick;

  const whiteKeys = [];
  const blackKeys = [];

  for (let m = firstWhite; m <= lastWhite; m++) {
    const pc = ((m % 12) + 12) % 12;
    const isFrame = (m === firstWhite || m === lastWhite);
    const syllable = !isFrame && scaleMap.has(m) ? scaleMap.get(m) : null;
    const inScale = Boolean(syllable);

    if (isWhiteMidi(m)) {
      whiteKeys.push({
        midi: m,
        noteLabel: getWhiteNoteLabel(pc),
        isFrame: isFrame,
        inScale: inScale,
        syllable: syllable
      });
    } else {
      // Schwarze Taste liegt unmittelbar rechts von der zuletzt hinzugefügten weißen Taste
      blackKeys.push({
        midi: m,
        afterWhiteIdx: whiteKeys.length - 1,
        inScale: inScale,
        syllable: syllable
      });
    }
  }

  const kb = document.createElement("div");
  kb.className = "piano-keyboard";

  whiteKeys.forEach(wk => {
    const keyBtn = document.createElement("button");
    keyBtn.type = "button";
    const scaleClass = wk.inScale ? "piano-key-scale" : "piano-key-inactive";
    keyBtn.className = `piano-white-key ${wk.isFrame ? "piano-key-frame" : ""} ${scaleClass}`;
    keyBtn.id = `solfegeKey_${wk.midi}`;
    keyBtn.dataset.midi = wk.midi;
    if (wk.syllable) keyBtn.dataset.syllable = wk.syllable;

    if (wk.inScale && wk.syllable) {
      const box = document.createElement("span");
      box.className = "solfege-key-box";
      box.textContent = getSolfegeDisplayLabel(wk.syllable);
      keyBtn.appendChild(box);
    }

    const hint = document.createElement("span");
    hint.className = "piano-note-hint";
    hint.textContent = wk.noteLabel;
    keyBtn.appendChild(hint);

    if (wk.inScale) {
      keyBtn.addEventListener("click", (e) => onKeyboardKeyClick(wk, keyBtn, { inputEvent: e }));
    } else {
      keyBtn.tabIndex = -1;
      keyBtn.setAttribute("aria-disabled", "true");
    }

    kb.appendChild(keyBtn);
  });

  const numWhite = whiteKeys.length;
  const totalWeight = whiteKeys.reduce((sum, wk) => sum + (wk.isFrame ? 0.5 : 1), 0);
  const cumWeights = [];
  let runningWeight = 0;
  whiteKeys.forEach(wk => {
    runningWeight += wk.isFrame ? 0.5 : 1;
    cumWeights.push(runningWeight);
  });
  const totalDeductionPx = 10 + Math.max(0, numWhite - 1) * 3;

  blackKeys.forEach(bk => {
    const blackEl = document.createElement(bk.inScale ? "button" : "div");
    if (bk.inScale) blackEl.type = "button";
    blackEl.className = `piano-black-key ${bk.inScale ? "key-in-scale" : "key-out-of-scale"}`;
    blackEl.id = `solfegeKey_${bk.midi}`;
    blackEl.dataset.midi = bk.midi;
    if (bk.syllable) blackEl.dataset.syllable = bk.syllable;

    // Position exakt in der Fuge zwischen den gewichteten weißen Tasten (CSS zentriert via translateX(-50%))
    const k = bk.afterWhiteIdx;
    const weightFrac = cumWeights[k] / totalWeight;
    const gapOffsetPx = (5 + (k + 0.5) * 3).toFixed(1);
    blackEl.style.left = `calc(${gapOffsetPx}px + (100% - ${totalDeductionPx}px) * ${weightFrac.toFixed(6)})`;

    if (bk.inScale && bk.syllable) {
      const box = document.createElement("span");
      box.className = "solfege-key-box solfege-key-box-black";
      box.textContent = getSolfegeDisplayLabel(bk.syllable);
      blackEl.appendChild(box);
      blackEl.addEventListener("click", (e) => onKeyboardKeyClick(bk, blackEl, { inputEvent: e }));
    }

    kb.appendChild(blackEl);
  });

  wrap.innerHTML = "";
  wrap.appendChild(kb);
}

function buildMelodySlotRhythmHTML(slot, ex) {
  if (!slot || ex?.melodyStyle === "steady") return "";
  const isDictation = ex.melodyStyle === "dictation";
  const showValue = !isDictation || Boolean(slot.rhythmSolved || slot.solved);
  const restChip = (!isDictation && slot.restBeforeBeats > 0)
    ? `<span class="melody-rest-chip" title="${escapeHtml(tr("Pause davor", "Rest before"))}">${getMelodyRestSVG(10, 12)}</span>`
    : "";
  if (!showValue) {
    return `${restChip}<span class="melody-rhythm-chip is-mystery">⏱ ?</span>`;
  }
  const rDef = getLocalizedMelodyRhythmValue(slot.rhythmKey);
  const partialCls = isDictation && slot.rhythmSolved && !slot.solved ? " is-partial-ok" : "";
  return `${restChip}<span class="melody-rhythm-chip${partialCls}" title="${escapeHtml(rDef.label)}">${getMelodyNoteValueSVG(slot.rhythmKey, 14, 14)}<span>${rDef.short}</span></span>`;
}

function syncMelodyHeaderAndPromptUI(ex = state.currentExercise) {
  if (!ex || ex.type !== "melody") return;
  const slots = ex.melodySlots || [];
  const tot = slots.length || 4;
  const isDictation = ex.melodyStyle === "dictation";
  const isSteady = ex.melodyStyle === "steady";
  const stepIdx = Math.min(ex.melodyStep || 0, tot - 1);
  const curStep = stepIdx + 1;

  const moduleTitleEl = document.getElementById("moduleTitleText");
  if (moduleTitleEl) {
    moduleTitleEl.textContent = isDictation
      ? tr("Melodiediktat", "Melody Dictation")
      : (isSteady ? tr("4-Ton-Folge", "4-Note Phrase") : tr("Melodie-Phrase", "Melody Phrase"));
  }

  const targetBadgeEl = document.getElementById("targetBarBadge");
  if (targetBadgeEl) {
    if (state.melodyCompleted) {
      targetBadgeEl.textContent = tf("{tot} / {tot} gelöst ✓", "{tot} / {tot} solved ✓", { tot });
    } else if (!isSteady && ex.meterKey) {
      targetBadgeEl.textContent = tf("{meter} • Ton {step} / {tot}", "{meter} • Note {step} / {tot}", { meter: ex.meterKey, step: curStep, tot });
    } else {
      targetBadgeEl.textContent = tf("Ton {step} / {tot}", "Note {step} / {tot}", { step: curStep, tot });
    }
  }

  const promptEl = document.getElementById("inputPromptText");
  if (promptEl) {
    if (state.melodyCompleted) {
      promptEl.textContent = tf("Alle {tot} Fragezeichen gelöst – weiter geht’s!", "All {tot} notes solved — moving on!", { tot });
    } else if (isDictation) {
      promptEl.textContent = tf("Wähle Tonhöhe & Notenwert für Ton {step} von {tot}:", "Pick pitch & note value for note {step} of {tot}:", { step: curStep, tot });
    } else {
      promptEl.textContent = tf("Tippe Ton {step} von {tot} auf der Klaviatur:", "Tap note {step} of {tot} on the keyboard:", { step: curStep, tot });
    }
  }
}

function syncMelodySlotCardUI(ex, idx) {
  const slot = ex?.melodySlots?.[idx];
  const card = document.getElementById(`barCard_${idx}`);
  if (!slot || !card) return;
  const isCurrentTarget = !state.melodyCompleted && idx === ex.melodyStep;
  const isDictation = ex.melodyStyle === "dictation";

  card.classList.remove("bar-target", "melody-slot-solved", "melody-slot-pending");
  card.classList.add(slot.solved ? "melody-slot-solved" : (isCurrentTarget ? "bar-target" : "melody-slot-pending"));
  card.classList.toggle("melody-bar-divider", Boolean(slot.barDivider));

  const chipsEl = card.querySelector(".melody-card-chips");
  if (chipsEl) {
    chipsEl.innerHTML = buildMelodySlotRhythmHTML(slot, ex);
  }

  const romanEl = card.querySelector(".bar-roman");
  if (romanEl) {
    romanEl.textContent = (slot.pitchSolved || slot.solved) ? getSolfegeDisplayLabel(slot.syllable) : "?";
  }

  const lblEl = card.querySelector(".bar-label");
  if (lblEl) {
    if (slot.solved) {
      lblEl.textContent = `✓ ${slot.germanNote}`;
    } else if (isDictation && slot.pitchSolved) {
      lblEl.textContent = tr("Ton ✓ • Wert?", "Pitch ✓ • Value?");
    } else if (isDictation && slot.rhythmSolved) {
      lblEl.textContent = tr("Wert ✓ • Ton?", "Value ✓ • Pitch?");
    } else {
      lblEl.textContent = isCurrentTarget ? tr("Gesucht", "Target") : tr("Offen", "Pending");
    }
  }
}

function renderMelodyRhythmPicker(ex = state.currentExercise) {
  const wrap = document.getElementById("melodyRhythmPicker");
  if (!wrap) return;
  if (!ex || ex.type !== "melody" || ex.melodyStyle !== "dictation") {
    wrap.classList.add("hidden");
    wrap.innerHTML = "";
    return;
  }

  wrap.classList.remove("hidden");
  const slots = ex.melodySlots || [];
  const tot = slots.length || 4;
  const idx = Math.min(ex.melodyStep || 0, tot - 1);
  const slot = slots[idx];
  const isExam = Boolean(state.exam?.active);
  const examLocked = isExam && Boolean(state.exam?.answered);
  const solvedAll = Boolean(state.melodyCompleted) || examLocked;

  let statusText = tf("Ton {n} / {tot}: Reihenfolge egal", "Note {n} / {tot}: Either order", { n: idx + 1, tot });
  if (solvedAll) {
    statusText = tr("Alle Töne erfasst ✓", "All notes recorded ✓");
  } else if (isExam && slot) {
    if (slot.examPendingRhythm) {
      const rDef = getLocalizedMelodyRhythmValue(slot.examPendingRhythm);
      statusText = tf("Notenwert: {val} — jetzt Tonhöhe wählen", "Note value: {val} — now pick pitch", { val: rDef.short });
    } else if (slot.examPendingSyllable) {
      statusText = tf("Ton: {syl} — jetzt Notenwert wählen", "Pitch: {syl} — now pick note value", { syl: getSolfegeDisplayLabel(slot.examPendingSyllable) });
    } else {
      statusText = tf("Ton {n} / {tot}: Tonhöhe + Notenwert", "Note {n} / {tot}: Pitch + Note value", { n: idx + 1, tot });
    }
  } else if (slot) {
    if (slot.rhythmSolved && !slot.solved) {
      const rDef = getLocalizedMelodyRhythmValue(slot.rhythmKey);
      statusText = tf("Notenwert ✓ ({val}) — jetzt Tonhöhe", "Note value ✓ ({val}) — now pick pitch", { val: rDef.short });
    } else if (slot.pitchSolved && !slot.solved) {
      statusText = tf("Tonhöhe ✓ ({syl}) — jetzt Notenwert", "Pitch ✓ ({syl}) — now pick note value", { syl: getSolfegeDisplayLabel(slot.syllable) });
    }
  }

  const wrongSet = slot?.wrongRhythms instanceof Set ? slot.wrongRhythms : null;

  wrap.innerHTML = "";
  const head = document.createElement("div");
  head.className = "melody-rhythm-picker-head";
  const headLbl = document.createElement("span");
  headLbl.textContent = tr("Notenwert wählen:", "Choose note value:");
  const stateEl = document.createElement("span");
  stateEl.id = "melodyRhythmPickerState";
  stateEl.className = "melody-rhythm-picker-state";
  stateEl.textContent = statusText;
  head.appendChild(headLbl);
  head.appendChild(stateEl);

  const grid = document.createElement("div");
  grid.className = "melody-rhythm-grid";

  MELODY_RHYTHM_ORDER.forEach(key => {
    const def = getLocalizedMelodyRhythmValue(key);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = `melodyRhythmBtn_${key}`;
    btn.dataset.rhythmKey = key;
    btn.className = "melody-rhythm-btn";
    btn.setAttribute("aria-label", `${def.label} (${def.short})`);

    if (!solvedAll && isExam && slot?.examPendingRhythm === key) btn.classList.add("is-selected");
    if (!solvedAll && !isExam && slot?.rhythmSolved && slot.rhythmKey === key) btn.classList.add("is-correct");
    if (!solvedAll && !isExam && wrongSet?.has(key)) btn.classList.add("is-wrong");
    if (solvedAll) btn.disabled = true;

    btn.innerHTML = `${getMelodyNoteValueSVG(key, 18, 18)}<strong style="font-size:0.73rem;line-height:1">${escapeHtml(def.short)}</strong><span class="melody-rhythm-btn-lbl">${escapeHtml(def.label)}</span>`;
    btn.addEventListener("click", (e) => handleMelodyRhythmClick(key, btn, { inputEvent: e }));
    grid.appendChild(btn);
  });

  wrap.appendChild(head);
  wrap.appendChild(grid);
}

function renderUI() {
  const ex = state.currentExercise;
  if (!ex) return;

  const isSolfege = ex.type === "solfege";
  const isMelody = ex.type === "melody";
  const isNotation = isNotationMode(ex.type);
  const isKeyboardMode = isSolfege || isMelody || isNotation;
  const isRhythmMeter = ex.type === "rhythm-meter";
  const isRhythmDict = ex.type === "rhythm-dictation";
  const isRhythmTap = ex.type === "rhythm-tap";
  const isRhythmGroove = ex.type === "rhythm-groove";
  const isProdTone = ex.type === "prod-tone";
  const isProdEqNoise = ex.type === "prod-eq-noise";
  const isProd = isProdTone || isProdEqNoise;
  const isModes = ex.type.startsWith("modes-");
  const isCadence = ex.type === "cadence";

  document.getElementById("exerciseModuleCard")?.classList.toggle("is-solfege", isSolfege || isMelody);
  document.getElementById("exerciseModuleCard")?.classList.toggle("is-melody", isMelody || isRhythmDict || isRhythmTap);
  document.getElementById("exerciseModuleCard")?.classList.toggle("is-notation", isNotation);
  document.getElementById("centralStageCard")?.classList.toggle("is-solfege", isSolfege || isMelody);
  document.getElementById("centralStageCard")?.classList.toggle("is-melody", isMelody);
  document.getElementById("centralStageCard")?.classList.toggle("is-notation", isNotation);

  // Im oberen Aufgabenmodul eingebettete Steuerungs-Buttons aktualisieren:
  // - Kadenzmodus: Tonart (Salbei) + Taktart (Pfirsich) + Tempo (Lila)
  // - Produktionsmodi: kein BPM-Tempo (stattdessen EQ-/Stufen-Badge)
  // - Alle übrigen Modi: Tempo (Lila) im oberen Modul
  const moduleKeyBtn = document.getElementById("moduleKeyBtn");
  const moduleNotationKeyBtn = document.getElementById("moduleNotationKeyBtn");
  const moduleNotationPaceBtn = document.getElementById("moduleNotationPaceBtn");
  const moduleTimeSigBtn = document.getElementById("moduleTimeSigBtn");
  const melodyPulseBtn = document.getElementById("melodyPulseBtn");
  const moduleBpmBtn = document.getElementById("moduleBpmBtn");

  if (moduleKeyBtn) {
    moduleKeyBtn.classList.toggle("hidden", !isCadence);
    moduleKeyBtn.textContent = ex.keyName;
  }

  if (moduleNotationKeyBtn) {
    moduleNotationKeyBtn.classList.toggle("hidden", !isNotation);
  }

  if (moduleNotationPaceBtn) {
    moduleNotationPaceBtn.classList.toggle("hidden", !isNotation);
  }
  if (isNotation) {
    syncNotationPaceUI();
  }

  if (moduleTimeSigBtn) {
    moduleTimeSigBtn.classList.toggle("hidden", !isCadence);
    moduleTimeSigBtn.textContent = state.activeTimeSig === "odd" ? "5/4" : state.activeTimeSig;
  }

  if (melodyPulseBtn) {
    melodyPulseBtn.classList.toggle("hidden", !isMelody);
    if (isMelody) {
      const pulseOn = Boolean(state.settings.melodyPulse);
      melodyPulseBtn.textContent = pulseOn ? tr("Puls: An", "Pulse: On") : tr("Puls: Aus", "Pulse: Off");
      melodyPulseBtn.classList.toggle("btn-active", pulseOn);
      melodyPulseBtn.classList.toggle("click-muted", !pulseOn);
    }
  }

  if (moduleBpmBtn) {
    moduleBpmBtn.classList.toggle("hidden", isProd || isModes || isNotation);
    moduleBpmBtn.textContent = `${state.activeBpm} BPM`;
  }

  const inlineBpmVal = document.getElementById("inlineBpmVal");
  if (inlineBpmVal && !state.settings.randomBpm) {
    inlineBpmVal.textContent = `${state.activeBpm} BPM`;
  }

  // Bei Moduswechsel offene nicht-relevante Inline-Popovers schließen
  if (!isCadence) {
    document.getElementById("inlineKeyPopover")?.classList.add("hidden");
    document.getElementById("inlineTimeSigPopover")?.classList.add("hidden");
    moduleKeyBtn?.classList.remove("chip-open");
    moduleTimeSigBtn?.classList.remove("chip-open");
  }
  if (!isNotation) {
    document.getElementById("inlineNotationKeyPopover")?.classList.add("hidden");
    moduleNotationKeyBtn?.classList.remove("chip-open");
    document.getElementById("inlineNotationPacePopover")?.classList.add("hidden");
    moduleNotationPaceBtn?.classList.remove("chip-open");
  }
  if (isProd || isModes || isNotation) {
    document.getElementById("inlineBpmPopover")?.classList.add("hidden");
    moduleBpmBtn?.classList.remove("chip-open");
  }

  const droneMixStrip = document.getElementById("droneMixStrip");
  if (droneMixStrip) {
    const isDroneEx = ex.type === "interval-drone";
    droneMixStrip.classList.toggle("hidden", !isDroneEx);
    if (isDroneEx) syncDroneMixControls();
  }

  const solfegeKeyBtn = document.getElementById("solfegeKeyBtn");
  const solfegeKeyBtnLabel = document.getElementById("solfegeKeyBtnLabel");
  if (solfegeKeyBtn) {
    solfegeKeyBtn.classList.toggle("hidden", !(isSolfege || isMelody));
  }
  if (solfegeKeyBtnLabel && (isSolfege || isMelody)) {
    const baseKeyName = getKeyDisplayName(state.currentKey);
    solfegeKeyBtnLabel.textContent = `🎹 ${baseKeyName}`;
  }

  const tonicRefRow = document.getElementById("tonicRefRow");
  const tonicRefBtn = document.getElementById("tonicRefBtn");
  const tonicRefLabel = document.getElementById("tonicRefLabel");
  if (tonicRefRow) {
    tonicRefRow.classList.toggle("hidden", isNotation);
  }
  if (tonicRefBtn) {
    tonicRefBtn.classList.toggle("hidden", isNotation);
    tonicRefBtn.classList.remove("click-muted");
    if (!isProdEqNoise) tonicRefBtn.classList.remove("btn-active");
  }

  if (isRhythmMeter) {
    if (tonicRefLabel) tonicRefLabel.textContent = tr("Viertel-Puls", "Quarter Pulse");
    if (tonicRefBtn) tonicRefBtn.title = tr("1 Takt Viertelpuls im aktuellen Tempo anhören", "Hear 1 bar of quarter-note pulse at the current tempo");
  } else if (isRhythmDict) {
    if (tonicRefLabel) tonicRefLabel.textContent = tr("Metronom (1–4)", "Metronome (1–4)");
    if (tonicRefBtn) tonicRefBtn.title = tr("1 Takt Zählpuls (1–2–3–4) als Tempo-Referenz anhören", "Hear 1 bar of 1–2–3–4 count as tempo reference");
  } else if (isRhythmTap) {
    if (ex.blind) {
      if (tonicRefLabel) tonicRefLabel.textContent = tr("Klick: Blind", "Click: Blind");
      if (tonicRefBtn) {
        tonicRefBtn.title = tr("Blindflug-Stufe: Während deiner Eingabe ist der Hilfs-Klick deaktiviert", "Blind mode: helper click is muted during your turn");
        tonicRefBtn.classList.add("click-muted");
      }
    } else {
      const clickOn = state.settings.rhythmTapClick;
      if (tonicRefLabel) tonicRefLabel.textContent = clickOn ? tr("Klick: An", "Click: On") : tr("Klick: Aus", "Click: Off");
      if (tonicRefBtn) {
        tonicRefBtn.title = tr("Hilfs-Klick in der Nachklopf-Phase ein- oder ausschalten", "Toggle helper click during the tap-back phase");
        tonicRefBtn.classList.toggle("click-muted", !clickOn);
      }
    }
  } else if (isRhythmGroove) {
    if (tonicRefLabel) tonicRefLabel.textContent = tr("Groove-Puls", "Groove Pulse");
    if (tonicRefBtn) tonicRefBtn.title = tr("1 Takt neutralen 4/4-Puls anhören", "Hear 1 bar of neutral 4/4 pulse");
  } else if (isProdEqNoise) {
    if (tonicRefLabel) tonicRefLabel.textContent = ex.noiseBypassed ? tr("Flat: AN", "Flat: ON") : tr("Flat-Bypass", "Flat Bypass");
    if (tonicRefBtn) {
      tonicRefBtn.title = tr("Zwischen EQ-Boost und neutralem Pink Noise (Bypass) fließend umschalten", "Switch smoothly between EQ boost and neutral pink noise (bypass)");
      tonicRefBtn.classList.toggle("btn-active", Boolean(ex.noiseBypassed));
    }
  } else if (isProdTone) {
    if (tonicRefLabel) tonicRefLabel.textContent = tr("Ref: 1 kHz", "Ref: 1 kHz");
    if (tonicRefBtn) tonicRefBtn.title = tr("1 kHz-Referenzton zur Orientierung anspielen", "Play a 1 kHz reference sine tone");
  } else if (isModes) {
    if (tonicRefLabel) tonicRefLabel.textContent = tr("Anker-Quinte", "Anchor Fifth");
    if (tonicRefBtn) tonicRefBtn.title = tr("Neutrale Grundton-Quinte (ohne Terz) anhören", "Hear the neutral root-fifth anchor (no 3rd)");
  } else if (!isNotation) {
    if (tonicRefLabel) {
      tonicRefLabel.textContent =
        isCadence
          ? tr("Tonika (I)", "Tonic (I)")
          : (isChordMode(ex.type)
              ? tr("Grundton", "Chord Root")
              : (ex.type.startsWith("interval") ? tr("Ausgangston", "Root Note") : tr("Tonika (Do)", "Tonic (Do)")));
    }
    if (tonicRefBtn) tonicRefBtn.title = tr("Tonika / Grundton anspielen", "Play tonic / root note");
  }

  // „🔊 Stufe nochmal“ / „Ton nochmal“ / „Schlag nochmal“ / „Nur anhören“
  const repeatBtn = document.getElementById("repeatToneBtn");
  if (repeatBtn) {
    const showRepeat = isCadence || isSolfege || isMelody || isRhythmDict || isRhythmTap;
    repeatBtn.classList.toggle("hidden", !showRepeat);
    const repeatSpan = repeatBtn.querySelector("span");
    if (isCadence) {
      if (repeatSpan) repeatSpan.textContent = tr("Stufe nochmal", "Replay Chord");
      repeatBtn.title = tr("Abgefragte Stufe nochmal abspielen", "Replay the queried chord degree");
    } else if (isRhythmDict) {
      if (repeatSpan) repeatSpan.textContent = tr("Schlag nochmal", "Replay Beat");
      repeatBtn.title = tr("Aktuellen Schlag (mit Vorpuls) nochmal anhören", "Replay current beat (with lead-in pulse)");
    } else if (isRhythmTap) {
      if (repeatSpan) repeatSpan.textContent = tr("Nur anhören", "Listen Only");
      repeatBtn.title = tr("Muster einmal ohne Eingabefenster anhören", "Listen to the pattern once without tapping");
    } else {
      if (repeatSpan) repeatSpan.textContent = tr("Ton nochmal", "Replay Tone");
      repeatBtn.title = tr("Gerade abgefragten Ton nochmal abspielen", "Replay the current target note");
    }
  }

  // Skip-Button in allen Modi kompakt als reines Symbol anzeigen
  const skipBtn = document.getElementById("skipBtn");
  const skipBtnLabel = document.getElementById("skipBtnLabel");
  if (skipBtn) {
    skipBtn.classList.remove("is-labeled");
    const skipHint = isNotation && !state.exam?.active
      ? tr("Aktuelle Note überspringen", "Skip current note")
      : tr("Nächste Abfrage", "Next Prompt");
    skipBtn.title = skipHint;
    skipBtn.setAttribute("aria-label", skipHint);
  }
  if (skipBtnLabel) {
    skipBtnLabel.classList.add("hidden");
  }

  // Links unten in der Transportleiste:
  // In Melodie, Rhythmus-Diktat & Nachklopfen schaltet der Button Auto-Weiter um; in Notation ausgeblendet.
  const loopBtn = document.getElementById("loopToggleBtn");
  if (loopBtn) {
    loopBtn.classList.toggle("hidden", isNotation || Boolean(state.exam?.active));
    if (isMelody) {
      loopBtn.innerHTML = ICON_AUTO_NEXT_SVG;
      loopBtn.title = tr("Nächste Melodie nach Lösung automatisch abspielen", "Automatically play the next melody after solving");
      loopBtn.setAttribute("aria-label", tr("Nächste Melodie automatisch abspielen", "Auto-play next melody"));
      loopBtn.classList.remove("btn-active-green");
      loopBtn.classList.toggle("btn-active", state.settings.melodyAutoNext);
    } else if (isRhythmDict) {
      loopBtn.innerHTML = ICON_AUTO_NEXT_SVG;
      loopBtn.title = tr("Nächstes Rhythmus-Diktat nach 4/4 Lösung automatisch abspielen", "Automatically play the next rhythm dictation after 4/4 solved");
      loopBtn.setAttribute("aria-label", tr("Nächstes Rhythmus-Diktat automatisch abspielen", "Auto-play next rhythm dictation"));
      loopBtn.classList.remove("btn-active-green");
      loopBtn.classList.toggle("btn-active", state.settings.rhythmDictationAutoNext);
    } else if (isRhythmTap) {
      loopBtn.innerHTML = ICON_AUTO_NEXT_SVG;
      loopBtn.title = tr("Nach bestandenem Nachklopfen automatisch nächste Runde starten", "Automatically start the next round after a passing tap-back");
      loopBtn.setAttribute("aria-label", tr("Nächste Klopfrunde automatisch starten", "Auto-start next tap round"));
      loopBtn.classList.remove("btn-active-green");
      loopBtn.classList.toggle("btn-active", state.settings.rhythmTapAutoNext);
    } else {
      loopBtn.innerHTML = ICON_LOOP_SVG;
      loopBtn.title = isSolfege
        ? tr("Zielton alle 3 Sekunden wiederholen (Loop)", "Repeat target note every 3 seconds (Loop)")
        : tr("Endlosschleife umschalten", "Toggle continuous loop");
      loopBtn.setAttribute(
        "aria-label",
        isSolfege
          ? tr("Zielton-Loop umschalten", "Toggle target note loop")
          : tr("Loop", "Loop")
      );
      loopBtn.classList.remove("btn-active-green");
      loopBtn.classList.toggle("btn-active", state.settings.loop);
    }
  }

  const barsGrid = document.getElementById("barsGrid");
  barsGrid.className = "bars-grid";
  barsGrid.style.gridTemplateColumns = "";

  const moduleTitleEl = document.getElementById("moduleTitleText");
  const targetBadgeEl = document.getElementById("targetBarBadge");
  moduleTitleEl?.classList.remove("hidden");

  if (ex.type === "cadence") {
    const barNum = ex.targetIndex + 1;
    const isRandomPos = state.settings.cadencePos === "random";
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Kadenz (Takt 1–4)", "Cadence (Bars 1–4)");
    if (targetBadgeEl) {
      targetBadgeEl.textContent = isRandomPos
        ? tf("Zufall • Takt {bar}", "Random • Bar {bar}", { bar: barNum })
        : tr("Ziel: Takt 4", "Target: Bar 4");
    }
    document.getElementById("inputPromptText").textContent = tf("Tippe die Stufe für Takt {bar}:", "Choose the chord degree for Bar {bar}:", { bar: barNum });
  } else if (ex.type === "solfege") {
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Kontext Kadenz", "Context Cadence");
    if (targetBadgeEl) {
      targetBadgeEl.textContent = ex.isMultiOctave ? tr("Einzelton (Mehrere Okt.)", "Single Note (Multi-Oct.)") : tr("Danach: Einzelton", "Then: Single Note");
    }
    document.getElementById("inputPromptText").textContent = tr("Tippe die gehörte Stufe auf der Klaviatur:", "Tap the heard scale degree on the keyboard:");
  } else if (ex.type === "melody") {
    const totSlots = ex.melodySlots?.length || 4;
    if (totSlots === 5) barsGrid.classList.add("cols-5");
    else if (totSlots >= 6) barsGrid.classList.add("cols-3");
    syncMelodyHeaderAndPromptUI(ex);
  } else if (isNotation) {
    barsGrid.classList.add("is-notation");
    syncNotationHeaderUI(ex);
  } else if (isRhythmMeter) {
    barsGrid.classList.add("cols-2");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("2-Takt-Puls", "2-Bar Pulse");
    if (targetBadgeEl) targetBadgeEl.textContent = tf("Stufe {lvl}", "Level {lvl}", { lvl: ex.level });
    document.getElementById("inputPromptText").textContent = tr("Welche Taktart hörst du?", "Which meter do you hear?");
  } else if (isRhythmDict) {
    if (moduleTitleEl) moduleTitleEl.textContent = tr("4-Schlag-Raster", "4-Beat Grid");
    if (targetBadgeEl) {
      targetBadgeEl.textContent = state.rhythmDictationCompleted
        ? tr("4 / 4 gelöst ✓", "4 / 4 solved ✓")
        : tf("Schlag {step} / 4", "Beat {step} / 4", { step: ex.rhythmStep + 1 });
    }
    document.getElementById("inputPromptText").textContent =
      tf("Tippe das Muster für Schlag {step} von 4:", "Select the pattern for Beat {step} of 4:", { step: Math.min(ex.rhythmStep + 1, 4) });
  } else if (isRhythmTap) {
    if (ex.beatsPerBar === 3) {
      barsGrid.style.gridTemplateColumns = "repeat(3, minmax(0, 1fr))";
    }
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Klopf-Raster", "Tap Grid");
    if (targetBadgeEl) {
      targetBadgeEl.textContent = ex.tapEvaluated
        ? (ex.lastEvaluation?.passed ? tr("Treffer ✓", "Hit ✓") : tr("Nochmal!", "Try Again!"))
        : `${ex.meterKey} • ±${ex.toleranceMs} ms`;
    }
    document.getElementById("inputPromptText").textContent = ex.blind
      ? tr("Blindflug: Vorzähler → Demo → Klopfe im Kopf weiter!", "Blind mode: Count-in → Demo → Keep the pulse in your head!")
      : tr("Vorzähler → Demo → Klopfe den Rhythmus direkt nach:", "Count-in → Demo → Tap the rhythm back directly:");
  } else if (isRhythmGroove) {
    if (ex.bars.length === 1) barsGrid.classList.add("cols-1");
    else if (ex.bars.length === 2) barsGrid.classList.add("cols-2");

    if (ex.grooveKind === "style") {
      if (moduleTitleEl) moduleTitleEl.textContent = tr("Pattern-Analyse", "Pattern Check");
      if (targetBadgeEl) targetBadgeEl.textContent = tr("4/4 Groove", "4/4 Groove");
      document.getElementById("inputPromptText").textContent = tr("Welchen Groove hörst du?", "Which groove do you hear?");
    } else if (ex.grooveKind === "offbeat") {
      if (moduleTitleEl) moduleTitleEl.textContent = tr("2-Takt-Groove", "2-Bar Groove");
      if (targetBadgeEl) targetBadgeEl.textContent = tr("Ziel: Takt 2", "Target: Bar 2");
      document.getElementById("inputPromptText").textContent = tr("Auf welchem Schlag liegt der Cowbell-Akzent?", "Which beat holds the cowbell accent?");
    } else {
      if (moduleTitleEl) moduleTitleEl.textContent = tr("Snare-Timing (2 & 4)", "Snare Timing (2 & 4)");
      if (targetBadgeEl) targetBadgeEl.textContent = ex.keyName;
      document.getElementById("inputPromptText").textContent = tr("Liegt die Snare zu früh, exakt oder zu spät?", "Is the snare early, in the pocket, or late?");
    }
  } else if (isProdTone) {
    barsGrid.classList.add("cols-1");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Sinus-Spektrum", "Sine Spectrum");
    if (targetBadgeEl) targetBadgeEl.textContent = tf("Stufe {lvl} • {lbl}", "Level {lvl} • {lbl}", { lvl: ex.level, lbl: ex.levelLabel });
    document.getElementById("inputPromptText").textContent = tr("Welcher Frequenzbereich erklingt?", "Which frequency band is playing?");
  } else if (isProdEqNoise) {
    barsGrid.classList.add("cols-2");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("A/B-Referenz (Noise)", "A/B Reference (Noise)");
    if (targetBadgeEl) targetBadgeEl.textContent = ex.keyName;
    document.getElementById("inputPromptText").textContent = tr("Welche Frequenz wird per EQ angehoben?", "Which frequency is boosted by the EQ?");
  } else if (ex.type === "interval-melodic") {
    barsGrid.classList.add("cols-2");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Tonfolge (2 Töne)", "2-Note Sequence");
    if (targetBadgeEl) targetBadgeEl.textContent = tr("Ziel: Ton 2 ↗", "Target: Note 2 ↗");
    document.getElementById("inputPromptText").textContent = tr("Welches Intervall erklingt aufwärts?", "Which ascending interval do you hear?");
  } else if (ex.type === "interval-melodic-down") {
    barsGrid.classList.add("cols-2");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Tonfolge (2 Töne)", "2-Note Sequence");
    if (targetBadgeEl) targetBadgeEl.textContent = tr("Ziel: Ton 2 ↘", "Target: Note 2 ↘");
    document.getElementById("inputPromptText").textContent = tr("Welches Intervall erklingt abwärts?", "Which descending interval do you hear?");
  } else if (ex.type === "interval-drone") {
    barsGrid.classList.add("cols-2");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Fläche + Intervall", "Pad + Interval");
    if (targetBadgeEl) targetBadgeEl.textContent = tr("Streicher ➔ Klavier", "Strings ➔ Piano");
    document.getElementById("inputPromptText").textContent = tr("Welches Intervall hörst du über der Fläche?", "Which interval do you hear over the pad?");
  } else if (ex.type === "chord-arp-up") {
    barsGrid.classList.add("cols-1");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Akkord-Töne", "Chord Notes");
    if (targetBadgeEl) targetBadgeEl.textContent = tr("Arpeggio ↗", "Arpeggio ↗");
    document.getElementById("inputPromptText").textContent = tr("Welcher Akkord erklingt?", "Which chord quality do you hear?");
  } else if (ex.type === "chord-arp-down") {
    barsGrid.classList.add("cols-1");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Akkord-Töne", "Chord Notes");
    if (targetBadgeEl) targetBadgeEl.textContent = tr("Arpeggio ↘", "Arpeggio ↘");
    document.getElementById("inputPromptText").textContent = tr("Welcher Akkord erklingt?", "Which chord quality do you hear?");
  } else if (ex.type === "interval-chords") {
    barsGrid.classList.add("cols-1");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Akkord-Klang", "Chord Voicing");
    if (targetBadgeEl) targetBadgeEl.textContent = tr("Mehrklang", "Chord");
    document.getElementById("inputPromptText").textContent = tr("Welcher Akkord erklingt?", "Which chord quality do you hear?");
  } else if (ex.type === "chord-inversions") {
    barsGrid.classList.add("cols-1");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Basston-Analyse", "Bass Note Check");
    if (targetBadgeEl) targetBadgeEl.textContent = tr("Umkehrung", "Inversion");
    document.getElementById("inputPromptText").textContent = tr("Welcher Akkordton liegt ganz unten im Bass?", "Which chord tone sits lowest in the bass?");
  } else if (isModes) {
    barsGrid.classList.add("cols-2");
    if (ex.type === "modes-char") {
      if (moduleTitleEl) moduleTitleEl.textContent = tr("Quinte → Tonfarbe", "Fifth → Color");
      if (targetBadgeEl) targetBadgeEl.textContent = tf("Grundton {root}", "Root {root}", { root: ex.rootLabel });
      document.getElementById("inputPromptText").textContent = tr("Welcher Modus steckt in diesem Charakterton?", "Which mode matches this characteristic tone?");
    } else if (ex.type === "modes-cadence") {
      if (moduleTitleEl) moduleTitleEl.textContent = tr("Quinte → Akkordfolge", "Fifth → Progression");
      if (targetBadgeEl) targetBadgeEl.textContent = tf("Grundton {root}", "Root {root}", { root: ex.rootLabel });
      document.getElementById("inputPromptText").textContent = tr("Welcher Modus prägt diese Akkordfolge?", "Which mode shapes this chord vamp?");
    } else {
      if (moduleTitleEl) moduleTitleEl.textContent = tr("Quinte → Klangfolge", "Fifth → Sequence");
      if (targetBadgeEl) targetBadgeEl.textContent = tf("Grundton {root}", "Root {root}", { root: ex.rootLabel });
      document.getElementById("inputPromptText").textContent = tr("Welche Kirchentonart erklingt aufwärts?", "Which ascending mode do you hear?");
    }
  } else {
    barsGrid.classList.add("cols-1");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Tonpaar (Gleichzeitig)", "2-Note Dyad");
    if (targetBadgeEl) targetBadgeEl.textContent = tr("Zusammenklang", "Dyad");
    document.getElementById("inputPromptText").textContent = tr("Welches Intervall erklingt?", "Which harmonic interval do you hear?");
  }

  barsGrid.innerHTML = "";
  if (isNotation) {
    renderNotationStaffPanel(ex, Boolean(ex.notationDidShift), barsGrid);
    ex.notationDidShift = false;
  } else if (isMelody) {
    ex.melodySlots.forEach((slot, idx) => {
      const card = document.createElement("div");
      card.className = "bar-card";
      card.id = `barCard_${idx}`;
      card.dataset.melodySlot = String(idx);

      const head = document.createElement("div");
      head.className = "melody-card-head";

      const tag = document.createElement("span");
      tag.className = "bar-tag";
      tag.textContent = tf("Ton {n}", "Note {n}", { n: idx + 1 });

      const chipsEl = document.createElement("span");
      chipsEl.className = "melody-card-chips";
      chipsEl.style.display = "inline-flex";
      chipsEl.style.alignItems = "center";
      chipsEl.style.gap = "3px";

      head.appendChild(tag);
      head.appendChild(chipsEl);

      const mainText = document.createElement("div");
      mainText.className = "bar-roman";

      const lbl = document.createElement("span");
      lbl.className = "bar-label";

      card.appendChild(head);
      card.appendChild(mainText);
      card.appendChild(lbl);
      barsGrid.appendChild(card);

      syncMelodySlotCardUI(ex, idx);

      card.addEventListener("click", () => {
        if (slot.solved || idx === ex.melodyStep) {
          repeatMelodySlotTone(idx);
        }
      });
    });
  } else if (isRhythmDict) {
    ex.rhythmSlots.forEach((slot, idx) => {
      const isCurrentTarget = !state.rhythmDictationCompleted && idx === ex.rhythmStep;
      const card = document.createElement("div");
      card.className = `bar-card ${slot.solved ? "melody-slot-solved rhythm-slot-clickable" : (isCurrentTarget ? "bar-target rhythm-slot-clickable" : "melody-slot-pending")}`;
      card.id = `barCard_${idx}`;
      card.dataset.rhythmSlot = String(idx);

      const tag = document.createElement("span");
      tag.className = "bar-tag";
      tag.textContent = tf("Schlag {n}", "Beat {n}", { n: idx + 1 });

      const mainText = document.createElement("div");
      mainText.className = "bar-roman";
      if (slot.solved) {
        mainText.innerHTML = getRhythmCellSVG(slot.cellKey, 40, 22);
      } else {
        mainText.textContent = "?";
      }

      const lbl = document.createElement("span");
      lbl.className = "bar-label";
      lbl.textContent = slot.solved ? `✓ ${slot.cell.short}` : (isCurrentTarget ? tr("Gesucht", "Target") : tr("Offen", "Pending"));

      card.appendChild(tag);
      card.appendChild(mainText);
      card.appendChild(lbl);
      card.addEventListener("click", () => {
        if (slot.solved || idx === ex.rhythmStep) {
          repeatRhythmDictationBeat(idx);
        }
      });
      barsGrid.appendChild(card);
    });
  } else if (isRhythmTap) {
    const beatMs = 60000 / (state.activeBpm || 90);
    ex.tapSlots.forEach((slot, idx) => {
      const card = document.createElement("div");
      let statusClass = "";
      let statusLabel = slot.cell.short;

      if (ex.tapEvaluated && ex.lastEvaluation) {
        const beatEvents = ex.lastEvaluation.expResults.filter(r => r.beatIdx === idx);
        if (beatEvents.length === 0) {
          const hitDuringRest = ex.lastEvaluation.extraTapsMs.some(
            t => t >= idx * beatMs - 60 && t < (idx + 1) * beatMs - 60
          );
          statusClass = hitDuringRest ? "rhythm-tap-missed" : "rhythm-tap-exact";
          statusLabel = hitDuringRest ? tr("Stille!", "Rest!") : tr("✓ Pause", "✓ Rest");
        } else {
          const hasMissed = beatEvents.some(r => r.status === "missed");
          const hasClose = beatEvents.some(r => r.status === "close");
          if (hasMissed) {
            statusClass = "rhythm-tap-missed";
            statusLabel = tr("Daneben", "Missed");
          } else if (hasClose) {
            const firstDiff = beatEvents.find(r => r.diffMs !== null)?.diffMs ?? 0;
            statusClass = "rhythm-tap-close";
            statusLabel = `~ ${firstDiff > 0 ? "+" : ""}${firstDiff}ms`;
          } else {
            statusClass = "rhythm-tap-exact";
            statusLabel = tr("✓ Exakt", "✓ Exact");
          }
        }
      }

      card.className = `bar-card${statusClass ? " " + statusClass : (ex.blind ? " melody-slot-pending" : "")}`;
      card.id = `barCard_${idx}`;

      const tag = document.createElement("span");
      tag.className = "bar-tag";
      tag.textContent = tf("Schlag {n}", "Beat {n}", { n: idx + 1 });

      const mainText = document.createElement("div");
      mainText.className = "bar-roman";
      mainText.innerHTML = getRhythmCellSVG(slot.cellKey, 36, 20);

      const lbl = document.createElement("span");
      lbl.className = "bar-label";
      lbl.textContent = statusLabel;

      card.appendChild(tag);
      card.appendChild(mainText);
      card.appendChild(lbl);
      barsGrid.appendChild(card);
    });
  } else {
    const hideAllNonRef = isRhythmMeter ||
      (isRhythmGroove && (ex.grooveKind === "style" || ex.grooveKind === "micro"));

    ex.bars.forEach((bar, idx) => {
      const isTarget = !isSolfege && (hideAllNonRef ? bar.key !== "ref" : idx === ex.targetIndex);
      const isDroneCard = ex.type === "interval-drone";
      const card = document.createElement("div");
      card.className = `bar-card ${isTarget ? "bar-target" : ""}${isProdEqNoise || ((isModes || isDroneCard) && idx === 0) ? " bar-card-clickable" : ""}`;
      card.id = `barCard_${idx}`;

      const tag = document.createElement("span");
      tag.className = "bar-tag";
      tag.textContent = isSolfege
        ? tf("Akkord {n}", "Chord {n}", { n: idx + 1 })
        : (isProdTone
            ? tr("Sinuston", "Sine Wave")
            : (isProdEqNoise
                ? (idx === 0 ? tr("Vergleich (Klick)", "Compare (Click)") : tr("Ziel-EQ (Klick)", "Target EQ (Click)"))
                : (isModes
                    ? (idx === 0 ? tr("Ausgangs-Quinte", "Anchor Fifth") : tr("Gesuchter Modus", "Target Mode"))
                    : (isDroneCard
                        ? (idx === 0 ? tr("Streicher-Fläche", "Strings Pad") : tr("Klavier-Intervall", "Piano Interval"))
                        : tf("Takt {n}", "Bar {n}", { n: idx + 1 })))));

      const mainText = document.createElement("div");
      mainText.className = "bar-roman";
      mainText.textContent = isTarget ? "?" : bar.symbol;

      const lbl = document.createElement("span");
      lbl.className = "bar-label";
      lbl.textContent = isTarget
        ? (ex.type === "cadence"
            ? tr("Gesucht", "Target")
            : (isChordQualityMode(ex.type)
                ? tr("Akkord ?", "Chord ?")
                : (ex.type === "chord-inversions"
                    ? tr("Umkehrung ?", "Inversion ?")
                    : (isRhythmMeter
                        ? tr("Taktart ?", "Meter ?")
                        : (isRhythmGroove
                            ? tr("Gesucht", "Target")
                            : (isProdTone
                                ? tr("Frequenz ?", "Freq ?")
                                : (isProdEqNoise
                                    ? ex.keyName
                                    : (isModes
                                        ? (ex.type === "modes-cadence" ? tr("Vamp ?", "Vamp ?") : (ex.type === "modes-char" ? tr("Farbe ?", "Color ?") : tr("Modus ?", "Mode ?")))
                                        : tr("Intervall ?", "Interval ?")))))))))
        : bar.short;

      card.appendChild(tag);
      card.appendChild(mainText);
      card.appendChild(lbl);

      if (isProdEqNoise) {
        card.addEventListener("click", () => {
          if (state.exam?.active && idx === 1 && !state.isPlaying) {
            triggerExamPlayAction();
            return;
          }
          triggerProdEqNoiseComparison(idx === 0);
        });
      } else if (isModes && idx === 0) {
        card.addEventListener("click", async () => {
          await ensureAudioReady();
          audioEngine.playStep(ex.anchorNotes, 1.15, null, "cadence");
        });
      } else if (isDroneCard && idx === 0) {
        card.addEventListener("click", async () => {
          await ensureAudioReady();
          audioEngine.playInstrumentSample("strings", ex.padNotes, 1.85, 0, audioEngine.dronePadGainScale, { attackSec: 0.14, releaseSec: 0.85 });
        });
      }

      barsGrid.appendChild(card);
    });
  }

  const btnGrid = document.getElementById("degreeButtonsGrid");
  const melodyRhythmPicker = document.getElementById("melodyRhythmPicker");
  const solfegeWrap = document.getElementById("solfegeKeyboardWrap");
  const tapPadWrap = document.getElementById("rhythmTapPadWrap");

  if (isKeyboardMode) {
    btnGrid.classList.add("hidden");
    tapPadWrap?.classList.add("hidden");
    if (melodyRhythmPicker) {
      const showPicker = isMelody && ex.melodyStyle === "dictation";
      melodyRhythmPicker.classList.toggle("hidden", !showPicker);
      if (showPicker) renderMelodyRhythmPicker(ex);
    }
    solfegeWrap.classList.remove("hidden");
    renderSolfegeKeyboard();
    if (isMelody && ex.melodyStyle === "dictation" && !state.melodyCompleted) {
      const curSlot = ex.melodySlots?.[ex.melodyStep];
      if (state.exam?.active && !state.exam?.currentAnswered && curSlot?.examPendingMidi) {
        document.getElementById(`solfegeKey_${curSlot.examPendingMidi}`)?.classList.add("key-pending-pair");
      } else if (!state.exam?.active && curSlot?.pitchSolved && !curSlot?.solved && curSlot?.midi) {
        document.getElementById(`solfegeKey_${curSlot.midi}`)?.classList.add("key-correct", "key-pending-pair");
      }
    }
  } else if (isRhythmTap) {
    btnGrid.classList.add("hidden");
    melodyRhythmPicker?.classList.add("hidden");
    solfegeWrap.classList.add("hidden");
    tapPadWrap?.classList.remove("hidden");
    renderRhythmTapPad();
  } else {
    melodyRhythmPicker?.classList.add("hidden");
    solfegeWrap.classList.add("hidden");
    tapPadWrap?.classList.add("hidden");
    btnGrid.classList.remove("hidden");
    btnGrid.innerHTML = "";
    const isInterval = !isCadence;
    btnGrid.classList.toggle("grid-intervals", isInterval);
    btnGrid.classList.toggle("grid-chords", isChordMode(ex.type) || isRhythmGroove || isProd || isModes);

    const layout = computeBalancedRows(ex.choices);
    btnGrid.style.setProperty("--max-cols", layout.maxCols);

    layout.rows.forEach(rowChoices => {
      const rowEl = document.createElement("div");
      rowEl.className = "degree-row";

      rowChoices.forEach(choiceKey => {
        const item = getChoiceItem(ex.type, choiceKey);
        const btn = document.createElement("button");
        btn.className = "degree-btn";
        btn.dataset.choice = choiceKey;

        const sym = document.createElement("div");
        sym.className = "degree-roman";
        if (isRhythmDict) {
          sym.innerHTML = getRhythmCellSVG(item.key, 42, 24);
        } else {
          sym.textContent = item.roman || item.symbol;
        }

        const l = document.createElement("span");
        l.className = "degree-label";
        l.textContent = item.short;

        btn.appendChild(sym);
        btn.appendChild(l);
        btn.addEventListener("click", (e) => handleAnswer(choiceKey, btn, { inputEvent: e }));
        rowEl.appendChild(btn);
      });

      btnGrid.appendChild(rowEl);
    });
  }

  resetCentralStage();
  updatePlayButtonUI(false);
  syncListenOnlyUI();
  document.getElementById("feedbackContainer").classList.add("hidden");
  syncExamExerciseControls();
}

const STREAK_MILESTONES = new Set([3, 5, 8, 10, 15, 20, 25, 30, 40, 50, 75, 100]);

function isStreakMilestone(count) {
  return STREAK_MILESTONES.has(count) || (count > 100 && count % 25 === 0);
}

function getStreakMilestoneText(count) {
  if (count === 3) return tr("3 in Folge – schöner Flow!", "3 in a row — nice flow!");
  if (count === 5) return tr("5 in Folge – dein Ohr ist voll da!", "5 in a row — your ear is dialed in!");
  if (count === 8) return tr("8 in Folge – eine ganze Oktave!", "8 in a row — a full octave!");
  if (count === 10) return tr("10 in Folge – beeindruckend sicher!", "10 in a row — remarkably sharp!");
  if (count === 15) return tr("15 in Folge – echtes Musiker-Gehör!", "15 in a row — true musician’s ear!");
  if (count === 20) return tr("20 in Folge – absolut souverän!", "20 in a row — effortless precision!");
  return tf("{n} in Folge – starker Fokus!", "{n} in a row — razor-sharp focus!", { n: count });
}

function renderStageStreakUI() {
  const isExam = Boolean(state?.exam?.active);
  const st = state?.streakState || { count: 0, activeNoticeMilestone: 0 };
  const count = isExam ? 0 : (Number(st.count) || 0);
  const milestone = isExam ? 0 : (Number(st.activeNoticeMilestone) || 0);

  const pillEl = document.getElementById("stageStreakPill");
  if (pillEl) {
    if (count >= 3) {
      pillEl.textContent = tf("✦ {n} in Folge", "✦ {n} in a row", { n: count });
      pillEl.classList.remove("hidden");
      pillEl.classList.toggle("is-high", count >= 8);
    } else {
      pillEl.textContent = "";
      pillEl.classList.add("hidden");
      pillEl.classList.remove("is-high");
    }
  }

  const noticeEl = document.getElementById("stageStreakNotice");
  if (noticeEl) {
    if (milestone >= 3) {
      noticeEl.textContent = `✦ ${getStreakMilestoneText(milestone)}`;
      noticeEl.classList.remove("hidden");
      noticeEl.classList.toggle("is-high", milestone >= 8);
    } else {
      noticeEl.textContent = "";
      noticeEl.classList.add("hidden");
      noticeEl.classList.remove("is-high");
    }
  }
}

function resetExerciseStreakOnAttempt(ex) {
  if (ex) ex.hadWrongAttempt = true;
  if (!state.streakState) state.streakState = { count: 0, activeNoticeMilestone: 0 };
  state.streakState.count = 0;
  state.streakState.activeNoticeMilestone = 0;
  renderStageStreakUI();
}

function recordExerciseStreakSuccess(ex) {
  if (!state.streakState) state.streakState = { count: 0, activeNoticeMilestone: 0 };
  if (!ex || ex.streakCounted) {
    return {
      count: state.streakState.count,
      isMilestone: state.streakState.activeNoticeMilestone > 0
    };
  }
  ex.streakCounted = true;
  if (ex.hadWrongAttempt) {
    state.streakState.count = 0;
    state.streakState.activeNoticeMilestone = 0;
  } else {
    state.streakState.count += 1;
    state.streakState.activeNoticeMilestone = isStreakMilestone(state.streakState.count)
      ? state.streakState.count
      : 0;
  }
  renderStageStreakUI();
  return {
    count: state.streakState.count,
    isMilestone: state.streakState.activeNoticeMilestone > 0
  };
}

const MUSIC_JUICE_SVGS = {
  // Violinschlüssel (G-Schlüssel)
  treble: `<svg viewBox="0 0 28 36" fill="none" aria-hidden="true"><path d="M15.8 25.5 C19.5 25.2 21.5 22.4 21 19 C20.4 15.5 17.2 14.3 14.3 15.4 C11.5 16.5 10.6 19.5 12.2 21.6 C13.2 22.9 14.9 23.2 16.1 22.4" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.8 25.5 C10.4 25.6 7.5 22.3 7.8 17.9 C8.2 13.2 13.5 10.5 16.6 7 C18.1 5.3 18.2 3.3 16.5 3.1 C14.8 2.9 14 4.8 14.2 7.5 L15.1 29.2 C15.2 31.6 13.6 33.2 11.4 33 C10.2 32.9 9.5 32.2 9.4 31.2" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.2" cy="30.8" r="2.1" fill="currentColor"/></svg>`,
  // Bassschlüssel (F-Schlüssel)
  bass: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6.6" cy="9.2" r="2.4" fill="currentColor"/><path d="M6.8 9.2 C6.5 5.4 10.2 4 13.4 4.8 C16.8 5.6 17.8 9.5 15.8 13.2 C13.9 16.6 9.8 18.6 5.8 19.8" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><circle cx="19.8" cy="7.6" r="1.5" fill="currentColor"/><circle cx="19.8" cy="12.6" r="1.5" fill="currentColor"/></svg>`,
  // C-Schlüssel (Alt-/Tenorschlüssel)
  alto: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><line x1="5.2" y1="3.8" x2="5.2" y2="20.2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="8.6" y1="3.8" x2="8.6" y2="20.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M9.6 4.8 C15 4.3 18.2 6.6 17.4 9.3 C16.7 11.1 13.2 11.8 10.4 12 C13.2 12.2 16.7 12.9 17.4 14.7 C18.2 17.4 15 19.7 9.6 19.2" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/><circle cx="14.6" cy="7.6" r="1.15" fill="currentColor"/><circle cx="14.6" cy="16.4" r="1.15" fill="currentColor"/></svg>`,
  // Viertelnote
  quarter: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="9.4" cy="18.2" rx="4.2" ry="2.9" transform="rotate(-22 9.4 18.2)" fill="currentColor"/><line x1="12.9" y1="17.2" x2="12.9" y2="4.2" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/></svg>`,
  // Halbe Note
  half: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="9.4" cy="18.2" rx="4.1" ry="2.8" transform="rotate(-22 9.4 18.2)" stroke="currentColor" stroke-width="2.2"/><line x1="13" y1="17.2" x2="13" y2="4.2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  // Achtelnote
  eighth: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="8.5" cy="18.2" rx="4" ry="2.8" transform="rotate(-22 8.5 18.2)" fill="currentColor"/><line x1="11.9" y1="17.2" x2="11.9" y2="4.2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M11.9 4.2 C16.5 6.6 18.6 9.8 16.6 13.8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  // Balken-Achtelpaar
  beamed: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="6.2" cy="18.6" rx="3.4" ry="2.4" transform="rotate(-20 6.2 18.6)" fill="currentColor"/><line x1="9.1" y1="18" x2="9.1" y2="6.2" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><ellipse cx="16.8" cy="16.6" rx="3.4" ry="2.4" transform="rotate(-20 16.8 16.6)" fill="currentColor"/><line x1="19.7" y1="16" x2="19.7" y2="4.2" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><line x1="9.1" y1="6.2" x2="19.7" y2="4.2" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  // Sechzehntelnote
  sixteenth: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="8.5" cy="18.5" rx="3.9" ry="2.7" transform="rotate(-22 8.5 18.5)" fill="currentColor"/><line x1="11.8" y1="17.6" x2="11.8" y2="3.8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M11.8 3.8 C16.3 5.8 18.2 8.3 16.4 11.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><path d="M11.8 8.3 C16.3 10.3 18.2 12.8 16.4 15.8" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>`
};

const JUICE_SYMBOL_ROTATION = ["treble", "beamed", "bass", "quarter", "alto", "eighth", "sixteenth", "half"];
const JUICE_THEME_COLORS = ["var(--sage-strong)", "var(--lilac-strong)", "var(--status-ok)", "var(--raccoon-dark)"];

const JUICE_PARTICLE_PRESETS = {
  micro: [
    { x: -17, y: -26, rot: -12, delay: 0,  size: 14 },
    { x: 0,   y: -32, rot: 0,   delay: 35, size: 17 },
    { x: 18,  y: -25, rot: 12,  delay: 65, size: 14 }
  ],
  standard: [
    { x: -24, y: -32, rot: -14, delay: 0,  size: 17 },
    { x: -10, y: -40, rot: -8,  delay: 30, size: 19 },
    { x: 12,  y: -39, rot: 10,  delay: 50, size: 18 },
    { x: 26,  y: -29, rot: 14,  delay: 75, size: 17 },
    { x: 2,   y: -28, rot: 4,   delay: 95, size: 15 }
  ],
  stage: [
    { x: -45, y: -26, rot: -14, delay: 0,  size: 18 },
    { x: -21, y: -42, rot: -10, delay: 35, size: 20 },
    { x: 0,   y: -45, rot: 2,   delay: 55, size: 19 },
    { x: 24,  y: -41, rot: 12,  delay: 75, size: 20 },
    { x: 46,  y: -25, rot: 15,  delay: 95, size: 18 }
  ]
};

let juiceBurstSeq = 0;
let lastPointerInputPoint = null;
let globalPointerTrackerBound = false;

function extractEventInputPoint(ev) {
  if (!ev || typeof ev !== "object") return null;
  if (ev.changedTouches && ev.changedTouches.length > 0) {
    const t = ev.changedTouches[0];
    if (Number.isFinite(t.clientX) && Number.isFinite(t.clientY) && (t.clientX !== 0 || t.clientY !== 0)) {
      return { x: t.clientX, y: t.clientY, atMs: Date.now() };
    }
  }
  if (ev.touches && ev.touches.length > 0) {
    const t = ev.touches[0];
    if (Number.isFinite(t.clientX) && Number.isFinite(t.clientY) && (t.clientX !== 0 || t.clientY !== 0)) {
      return { x: t.clientX, y: t.clientY, atMs: Date.now() };
    }
  }
  if (Number.isFinite(ev.clientX) && Number.isFinite(ev.clientY) && (ev.clientX !== 0 || ev.clientY !== 0)) {
    return { x: ev.clientX, y: ev.clientY, atMs: Date.now() };
  }
  return null;
}

function getFreshPointerInputPoint(maxAgeMs = 1800) {
  if (!lastPointerInputPoint) return null;
  if (Date.now() - lastPointerInputPoint.atMs > maxAgeMs) return null;
  return lastPointerInputPoint;
}

function resolveInputPointFromOptions(options = {}) {
  const fromOpt = options.inputPoint && Number.isFinite(options.inputPoint.x) && Number.isFinite(options.inputPoint.y)
    ? options.inputPoint
    : null;
  return fromOpt || extractEventInputPoint(options.inputEvent) || getFreshPointerInputPoint();
}

function bindGlobalPointerInputTracker() {
  if (globalPointerTrackerBound || typeof document === "undefined" || typeof document.addEventListener !== "function") return;
  globalPointerTrackerBound = true;
  const capturePoint = (ev) => {
    const pt = extractEventInputPoint(ev);
    if (pt) lastPointerInputPoint = pt;
  };
  document.addEventListener("pointerdown", capturePoint, { capture: true, passive: true });
  document.addEventListener("touchstart", capturePoint, { capture: true, passive: true });
  document.addEventListener("click", (ev) => {
    // Tastatur-Aktivierung (Enter/Space) sendet detail===0 & (0,0) — nur echte Zeiger-/Touch-Klicks übernehmen
    if (ev && ev.detail === 0 && ev.clientX === 0 && ev.clientY === 0) {
      if (!lastPointerInputPoint || (Date.now() - lastPointerInputPoint.atMs > 450)) {
        lastPointerInputPoint = null;
      }
      return;
    }
    capturePoint(ev);
  }, { capture: true, passive: true });
  document.addEventListener("keydown", () => {
    lastPointerInputPoint = null;
  }, { capture: true, passive: true });
}

function resolveJuiceOrigin(hostEl, options = {}) {
  const fallbackX = options.originX || "50%";
  const fallbackY = options.originY || "26%";
  const pt = resolveInputPointFromOptions(options);
  if (!pt || !hostEl || typeof hostEl.getBoundingClientRect !== "function") {
    return { originX: fallbackX, originY: fallbackY };
  }
  const rect = hostEl.getBoundingClientRect();
  if (!rect || !(rect.width > 0) || !(rect.height > 0)) {
    return { originX: fallbackX, originY: fallbackY };
  }
  const tol = options.containTolerancePx ?? 16;
  const inBounds =
    pt.x >= rect.left - tol &&
    pt.x <= rect.right + tol &&
    pt.y >= rect.top - tol &&
    pt.y <= rect.bottom + tol;
  if (!inBounds && !options.allowOutsideHost) {
    return { originX: fallbackX, originY: fallbackY };
  }
  const relX = Math.max(0, Math.min(rect.width, pt.x - rect.left));
  const relY = Math.max(0, Math.min(rect.height, pt.y - rect.top));
  return {
    originX: `${relX.toFixed(1)}px`,
    originY: `${relY.toFixed(1)}px`
  };
}

function shouldAnimateJuice() {
  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    } catch (_e) {}
  }
  return true;
}

function spawnJuiceBurst(hostEl, options = {}) {
  bindGlobalPointerInputTracker();
  if (!hostEl || typeof hostEl.appendChild !== "function" || typeof document?.createElement !== "function") return;
  if (!shouldAnimateJuice()) return;
  if (typeof hostEl.querySelectorAll === "function") {
    hostEl.querySelectorAll(".juice-particle").forEach(prev => {
      if (typeof prev.remove === "function") prev.remove();
      else if (prev.parentNode?.removeChild) prev.parentNode.removeChild(prev);
    });
  }
  const specs = JUICE_PARTICLE_PRESETS[options.intensity || "standard"] || JUICE_PARTICLE_PRESETS.standard;
  const { originX, originY } = resolveJuiceOrigin(hostEl, options);
  const seqOffset = juiceBurstSeq;
  juiceBurstSeq = (juiceBurstSeq + 1) % JUICE_SYMBOL_ROTATION.length;

  specs.forEach((spec, idx) => {
    const symbolKey = JUICE_SYMBOL_ROTATION[(seqOffset + idx) % JUICE_SYMBOL_ROTATION.length];
    const color = JUICE_THEME_COLORS[(seqOffset + idx) % JUICE_THEME_COLORS.length];
    const p = document.createElement("span");
    p.className = "juice-particle is-symbol";
    p.dataset.musicSymbol = symbolKey;
    p.innerHTML = MUSIC_JUICE_SVGS[symbolKey];
    p.setAttribute("aria-hidden", "true");
    p.style.setProperty("--jx0", originX);
    p.style.setProperty("--jy0", originY);
    p.style.setProperty("--jx", `${spec.x}px`);
    p.style.setProperty("--jy", `${spec.y}px`);
    p.style.setProperty("--jr", `${spec.rot}deg`);
    p.style.setProperty("--jdelay", `${spec.delay}ms`);
    p.style.setProperty("--jsize", `${spec.size}px`);
    p.style.color = color;
    p.addEventListener?.("animationend", () => {
      if (typeof p.remove === "function") p.remove();
      else if (p.parentNode?.removeChild) p.parentNode.removeChild(p);
    });
    hostEl.appendChild(p);
  });
}

function triggerMascotHappyHop() {
  if (!shouldAnimateJuice()) return;
  const wrap = document.getElementById("stageMascotWrap");
  if (!wrap) return;
  if (!wrap._hopAnimBound) {
    wrap._hopAnimBound = true;
    wrap.addEventListener?.("animationend", () => wrap.classList.remove("mascot-happy-hop"));
  }
  wrap.classList.remove("mascot-happy-hop");
  void wrap.offsetWidth;
  wrap.classList.add("mascot-happy-hop");
}

function triggerCelebrationFeedback(anchorEl, options = {}) {
  if (!shouldAnimateJuice()) return;
  const resolvedPoint = resolveInputPointFromOptions(options);
  const stage = document.getElementById("centralStageCard");
  if (stage) {
    if (!stage._celebrateAnimBound) {
      stage._celebrateAnimBound = true;
      stage.addEventListener?.("animationend", () => stage.classList.remove("stage-celebrate"));
    }
    stage.classList.remove("stage-celebrate");
    void stage.offsetWidth;
    stage.classList.add("stage-celebrate");
  }
  triggerMascotHappyHop();
  if (anchorEl && !options.skipAnchorBurst) {
    spawnJuiceBurst(anchorEl, { intensity: "standard", originY: "24%", inputPoint: resolvedPoint });
  }
  if (options.isMilestone || options.stageBurst || !anchorEl) {
    const burstLayer = document.getElementById("stageBurstLayer");
    spawnJuiceBurst(burstLayer, { intensity: "stage", originX: "50%", originY: "28%", inputPoint: resolvedPoint });
  }
}

function updateStageMascot(mood) {
  const wrap = document.getElementById("stageMascotWrap");
  if (!wrap) return;
  if (mood !== "happy") wrap.classList.remove("mascot-happy-hop");
  wrap.innerHTML = getMascotSVG(mood);
}

function setCentralStageMode(stageStateClass) {
  const stage = document.getElementById("centralStageCard");
  if (!stage) return;
  const exType = state.currentExercise?.type;
  if (isNotationMode(exType)) {
    stage.className = `central-stage ${stageStateClass} is-notation`;
    return;
  }
  const isKeyboardLayout = exType === "solfege" || exType === "melody";
  stage.className = isKeyboardLayout
    ? `central-stage ${stageStateClass} is-solfege${exType === "melody" ? " is-melody" : ""}`
    : `central-stage ${stageStateClass}`;
}

function resetCentralStage() {
  if (!document.getElementById("centralStageCard")) return;
  const burstLayer = document.getElementById("stageBurstLayer");
  if (burstLayer) burstLayer.innerHTML = "";
  setCentralStageMode("stage-idle");
  updateStageMascot("idle");
  const ex = state.currentExercise;
  const mode = ex?.type;
  if (isNotationMode(mode)) {
    const clefName = getLocalizedNotationClefName(ex?.targetItem?.clefId || ex?.baseClefId || "treble");
    document.getElementById("stageSubtext").textContent = tr("NOTENLESEN", "SIGHT-READING");
    document.getElementById("stageMainText").textContent = clefName;
    document.getElementById("stageFunctionText").textContent = state.exam?.active
      ? tr("Lies die Note im System und wähle die Taste unten.", "Read the note on the staff and tap the key below.")
      : tr("Lies die erste Note links — oder tippe „Überspringen“.", "Read the leftmost note — or tap “Skip”.");
    renderStageStreakUI();
    return;
  }
  document.getElementById("stageSubtext").textContent = tr("STATUS", "STATUS");
  document.getElementById("stageMainText").textContent = tr("Bereit", "Ready");
  document.getElementById("stageFunctionText").textContent =
    mode === "rhythm-tap"
      ? tr("Starte unten die Runde und klopfe danach im Takt mit!", "Press Play below and tap along in time!")
      : tr("Drücke unten auf Abspielen", "Press Play below to listen");
  renderStageStreakUI();
}

const AWAITING_STAGE_HEADLINES = [
  { de: "Na, was war’s?", en: "What’s your call?" },
  { de: "Ganz Ohr!",      en: "I’m all ears!" },
  { de: "Was meinst du?", en: "What do you hear?" },
  { de: "Und …?",         en: "Your hunch?" }
];
let awaitingPromptCounter = 0;

function getAwaitingStageHint(ex) {
  const type = ex?.type || "";
  if (type === "cadence") {
    return tr("Welche Stufe schwingt noch nach? Tippe sie unten an.", "Which chord degree lingers? Tap it below.");
  }
  if (isChordQualityMode(type)) {
    return tr("Welche Akkordfarbe ist hängengeblieben? Wähle unten aus.", "Which chord color stayed with you? Pick below.");
  }
  if (type === "chord-inversions") {
    return tr("Welcher Akkordton saß ganz unten im Bass? Wähle die Umkehrung.", "Which chord tone sat lowest in the bass? Pick the inversion below.");
  }
  if (type.startsWith("interval")) {
    return tr("Wie weit fühlte sich der Abstand an? Wähle das Intervall.", "How wide did that leap feel? Pick the interval below.");
  }
  if (type === "solfege") {
    return tr("Wo sitzt dieser Ton in der Tonleiter? Tippe auf die Taste.", "Where does that pitch sit? Tap the matching key.");
  }
  if (type === "melody") {
    const curStep = (ex.melodyStep || 0) + 1;
    if (ex.melodyStyle === "dictation") {
      return tf("Wie klingt Ton {n} und wie lang ist er? Wähle Tonhöhe & Notenwert.", "Which pitch and note value did Note {n} have? Pick both below.", { n: curStep });
    }
    return tf("Welche Silbe war Ton {n}? Tippe auf die Tasten (oder „Ton nochmal“).", "Which syllable was Note {n}? Tap the keys (or “Replay Tone”).", { n: curStep });
  }
  if (type === "rhythm-dictation") {
    return tf("Welches Muster lag auf Schlag {n}? Wähle unten (oder „Schlag nochmal“).", "Which pattern landed on Beat {n}? Pick below (or “Replay Beat”).", { n: (ex.rhythmStep || 0) + 1 });
  }
  if (type === "rhythm-meter") {
    return tr("Wo lag die betonte Eins? Wähle die passende Taktart.", "Where did the heavy beat land? Pick the meter below.");
  }
  if (type === "rhythm-groove") {
    return tr("Wie hat der Groove für dich geatmet? Wähle unten aus.", "How did that groove feel? Pick your answer below.");
  }
  if (type === "prod-tone" || type === "prod-eq-noise") {
    return tr("In welchem Band lag der Schwerpunkt? Tippe es unten an.", "Which band carried the focus? Tap it below.");
  }
  if (type.startsWith("modes-")) {
    return tr("Welche Klangfarbe schwang da mit? Wähle den Modus.", "Which modal color shone through? Pick the mode below.");
  }
  return tr("Wähle unten deine Antwort – oder hör’s dir noch einmal an.", "Pick your answer below — or replay anytime.");
}

function showAwaitingAnswerStage(ex = state.currentExercise) {
  if (!document.getElementById("centralStageCard")) return;
  if (!ex || isCurrentExerciseSolved(ex)) return;

  const headline = AWAITING_STAGE_HEADLINES[awaitingPromptCounter % AWAITING_STAGE_HEADLINES.length];
  awaitingPromptCounter += 1;

  setCentralStageMode("stage-awaiting");
  updateStageMascot("awaiting");

  let subtext = tr("DEIN TIPP", "YOUR PICK");
  if (ex.type === "melody") {
    const tot = ex.melodySlots?.length || 4;
    subtext = tf("TON {n} VON {tot} • DEIN TIPP", "NOTE {n} OF {tot} • YOUR PICK", { n: (ex.melodyStep || 0) + 1, tot });
  } else if (ex.type === "rhythm-dictation") {
    subtext = tf("SCHLAG {n} VON 4 • DEIN TIPP", "BEAT {n} OF 4 • YOUR PICK", { n: (ex.rhythmStep || 0) + 1 });
  }

  document.getElementById("stageSubtext").textContent = subtext;
  document.getElementById("stageMainText").textContent = tr(headline.de, headline.en);
  document.getElementById("stageFunctionText").textContent = getAwaitingStageHint(ex);
}

function completePromptPlayback(ex = state.currentExercise) {
  stopPlayback({ preserveStage: true });
  if (state.listenOnly?.active) {
    handleListenOnlyPromptEnded(ex);
  } else if (ex && state.currentExercise === ex && !isCurrentExerciseSolved(ex)) {
    showAwaitingAnswerStage(ex);
  }
}

const SOLFEGE_RESOLUTION_BEATS = {
  1: [2.0],
  2: [1.0, 3.0],
  3: [1.5, 0.5, 2.0],
  4: [1.0, 0.5, 0.5, 2.0]
};

/**
 * Berechnet ein takttreues Auflösungs-Timing zur Tonika innerhalb eines 4/4-Takts:
 * - 4 Töne (z. B. Fa/Sol → Do): Viertel, Achtel, Achtel, Halbe [1.0, 0.5, 0.5, 2.0]
 * - 3 Töne (z. B. Mi/La → Do): Punktierte Viertel, Achtel, Halbe [1.5, 0.5, 2.0]
 * - 2 Töne (z. B. Re/Ti → Do): Viertel, Punktierte Halbe [1.0, 3.0]
 * - 1 Ton  (Do):               Halbe [2.0]
 */
function buildSolfegeResolutionSchedule(noteCount, bpm) {
  const beatValues = SOLFEGE_RESOLUTION_BEATS[noteCount]
    || Array.from({ length: noteCount }, (_, i) => (i === noteCount - 1 ? 2.0 : 0.75));
  const clampedBpm = Math.max(55, Math.min(125, Number(bpm) || 90));
  const beatSec = 60 / clampedBpm;
  const startDelayMs = 240;

  let elapsedBeats = 0;
  const steps = beatValues.map((beats, idx) => {
    const delayMs = Math.round(startDelayMs + elapsedBeats * beatSec * 1000);
    const isLast = idx === beatValues.length - 1;
    const durationSec = isLast
      ? Math.max(1.05, Number((beats * beatSec * 0.95).toFixed(2)))
      : Math.max(0.11, Number((beats * beatSec * 0.90).toFixed(2)));
    elapsedBeats += beats;
    return { beats, delayMs, durationSec, isLast };
  });

  const totalEndMs = Math.round(startDelayMs + elapsedBeats * beatSec * 1000);
  return { steps, totalEndMs };
}

/**
 * Schließt einen gelösten Melodie-Slot im freien Training ab (bei 1-stufiger Eingabe
 * direkt über die Klaviatur oder bei Melodiediktat sobald Tonhöhe & Notenwert stimmen).
 */
function completeMelodyFreeSlot(ex, currentSlotIdx, triggerEl, options = {}) {
  const slots = ex.melodySlots || [];
  const slot = slots[currentSlotIdx];
  const tot = slots.length || 4;
  if (!slot) return;
  const resolvedPoint = resolveInputPointFromOptions(options);

  slot.pitchSolved = true;
  slot.rhythmSolved = true;
  slot.solved = true;

  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-wrong", "key-correct", "key-pending-pair");
  });
  const isKeyBtn = Boolean(triggerEl && (triggerEl.classList?.contains("piano-white-key") || triggerEl.classList?.contains("piano-black-key")));
  const keyToMark = isKeyBtn ? triggerEl : document.getElementById(`solfegeKey_${slot.midi}`);
  keyToMark?.classList.add("key-correct");

  syncMelodySlotCardUI(ex, currentSlotIdx);
  document.getElementById(`barCard_${currentSlotIdx}`)?.classList.add("tile-selected-pulse");

  const isLast = currentSlotIdx >= tot - 1;
  if (!isLast) {
    spawnJuiceBurst(triggerEl || keyToMark, { intensity: "micro", originY: "20%", inputPoint: resolvedPoint });
    ex.melodyStep = currentSlotIdx + 1;
    const nextIdx = ex.melodyStep;
    syncMelodySlotCardUI(ex, nextIdx);
    syncMelodyHeaderAndPromptUI(ex);
    if (ex.melodyStyle === "dictation") {
      renderMelodyRhythmPicker(ex);
    }

    if (!state.isPlaying) {
      setCentralStageMode("stage-playing");
      updateStageMascot("happy");
      triggerMascotHappyHop();
      document.getElementById("stageSubtext").textContent = tf("TON {n} RICHTIG", "NOTE {n} CORRECT", { n: currentSlotIdx + 1 });
      const solvedMain = ex.melodyStyle === "dictation"
        ? `${getSolfegeDisplayLabel(slot.syllable)} · ${getLocalizedMelodyRhythmValue(slot.rhythmKey).short}`
        : getSolfegeDisplayLabel(slot.syllable);
      document.getElementById("stageMainText").textContent = solvedMain;
      document.getElementById("stageFunctionText").textContent = tf("Jetzt gesucht: Ton {n} von {tot}", "Next target: Note {n} of {tot}", { n: nextIdx + 1, tot });
    }

    const clearId = audioEngine.playbackId;
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId === clearId && !state.melodyCompleted) {
        keyToMark?.classList.remove("key-correct");
      }
    }, 380);
    return;
  }

  // Alle Töne gelöst -> nächste Abfrage automatisch starten
  state.melodyCompleted = true;
  state.exerciseSolved = true;
  ex.isSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  syncMelodyHeaderAndPromptUI(ex);
  const streakRes = recordExerciseStreakSuccess(ex);
  setCentralStageMode("stage-playing");
  updateStageMascot("happy");
  triggerCelebrationFeedback(triggerEl || keyToMark, { isMilestone: streakRes.isMilestone, inputPoint: resolvedPoint });
  if (ex.melodyStyle === "dictation") {
    renderMelodyRhythmPicker(ex);
  }
  document.getElementById("stageSubtext").textContent = tf("MELODIE GELÖST! ({tot}/{tot})", "MELODY SOLVED! ({tot}/{tot})", { tot });
  document.getElementById("stageMainText").textContent = ex.melodySlots.map(s => getSolfegeDisplayLabel(s.syllable)).join(" – ");
  document.getElementById("stageFunctionText").textContent = tr("Nächste Aufgabe wird geladen…", "Loading next exercise…");

  const completionPlaybackId = audioEngine.playbackId;
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== completionPlaybackId) return;
    if (state.currentView !== "exercise" || state.settings.mode !== "melody") return;
    generateExercise();
    if (state.settings.melodyAutoNext) {
      playSequence();
    }
  }, 1150);
}

/**
 * Verarbeitet das Wählen eines Notenwerts im Melodiediktat (beliebige Reihenfolge zu Klaviatur).
 */
async function handleMelodyRhythmClick(rhythmKey, btn, options = {}) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "melody" || ex.melodyStyle !== "dictation" || state.melodyCompleted) return;
  const capturedInputPoint = resolveInputPointFromOptions(options);
  if (state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }

  await ensureAudioReady();

  if (state.exam?.active) {
    handleExamMelodyRhythmChoice(ex, rhythmKey, btn);
    return;
  }

  const currentSlotIdx = ex.melodyStep || 0;
  const slots = ex.melodySlots || [];
  const tot = slots.length || 4;
  const slot = slots[currentSlotIdx];
  if (!slot) return;

  if (slot.rhythmSolved) {
    document.getElementById("stageFunctionText").textContent = tr(
      "Notenwert stimmt schon — wähle noch die Tonhöhe auf der Klaviatur!",
      "Note value already matches — now pick the pitch on the keyboard!"
    );
    return;
  }

  const rDef = getLocalizedMelodyRhythmValue(rhythmKey);
  if (rhythmKey !== slot.rhythmKey) {
    resetExerciseStreakOnAttempt(ex);
    if (!(slot.wrongRhythms instanceof Set)) slot.wrongRhythms = new Set();
    slot.wrongRhythms.add(rhythmKey);
    btn?.classList.add("is-wrong");
    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tf("TON {n} VON {tot} • NOTENWERT NOCH NICHT", "NOTE {n} OF {tot} • WRONG VALUE", { n: currentSlotIdx + 1, tot });
    document.getElementById("stageMainText").textContent = `${rDef.short} (${rDef.label})? ${tr("Nein", "No")}`;
    document.getElementById("stageFunctionText").textContent = tr("Hör mit dem Puls genau hin oder probiere „Ton nochmal“!", "Listen closely with the pulse or tap “Replay Tone”!");
    return;
  }

  slot.rhythmSolved = true;
  if (!state.isPlaying && audioEngine.isInitialized) {
    audioEngine.triggerPercussion("accent", undefined, 0.45);
  }

  if (slot.pitchSolved) {
    completeMelodyFreeSlot(ex, currentSlotIdx, btn, { inputPoint: capturedInputPoint });
    return;
  }

  syncMelodySlotCardUI(ex, currentSlotIdx);
  renderMelodyRhythmPicker(ex);
  setCentralStageMode("stage-playing");
  updateStageMascot("happy");
  document.getElementById("stageSubtext").textContent = tf("TON {n} VON {tot} • NOTENWERT RICHTIG", "NOTE {n} OF {tot} • VALUE CORRECT", { n: currentSlotIdx + 1, tot });
  document.getElementById("stageMainText").textContent = `${rDef.short} • ${rDef.label}`;
  document.getElementById("stageFunctionText").textContent = tr("Jetzt noch die Tonhöhe unten auf der Klaviatur tippen!", "Now tap the matching pitch on the keyboard below!");
}

/**
 * Verarbeitet das Antippen einer Taste in der Melodieübung (4–6 Töne):
 * - Im Takt- & Basismodus reicht die richtige Silbe pro Position.
 * - Im Melodiediktat müssen Tonhöhe und Notenwert in beliebiger Reihenfolge stimmen.
 */
async function handleMelodyKeyClick(clickedKeyDef, keyBtn, options = {}) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "melody" || state.melodyCompleted) return;
  const capturedInputPoint = resolveInputPointFromOptions(options);
  if (state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }

  await ensureAudioReady();

  if (state.exam?.active) {
    handleExamMelodyAnswer(ex, clickedKeyDef, keyBtn);
    return;
  }

  const currentSlotIdx = ex.melodyStep || 0;
  const slots = ex.melodySlots || [];
  const tot = slots.length || 4;
  const slot = slots[currentSlotIdx];
  if (!slot) return;

  if (ex.melodyStyle === "dictation" && slot.pitchSolved) {
    if (!state.isPlaying && clickedKeyDef.syllable === slot.syllable) {
      const beatSec = 60 / (state.activeBpm || 90);
      const rawDur = Math.max(0.22, Math.min(0.95, (slot.durationBeats || 1) * beatSec * 0.86));
      audioEngine.playStep([slot.noteName], rawDur, null, "interval");
    }
    document.getElementById("stageFunctionText").textContent = tr(
      "Tonhöhe stimmt schon — wähle noch den Notenwert darüber!",
      "Pitch already matches — now choose the note value above!"
    );
    return;
  }

  const isCorrect = clickedKeyDef.syllable === slot.syllable;

  if (!isCorrect) {
    resetExerciseStreakOnAttempt(ex);
    keyBtn.classList.add("key-wrong");
    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tf("TON {n} VON {tot} • NOCH NICHT", "NOTE {n} OF {tot} • NOT QUITE", { n: currentSlotIdx + 1, tot });
    document.getElementById("stageMainText").textContent = `${getSolfegeDisplayLabel(clickedKeyDef.syllable)}? ${tr("Nein", "No")}`;
    document.getElementById("stageFunctionText").textContent = tr("Tippe weiter oder nutze „Ton nochmal“!", "Keep trying or tap “Replay Tone”!");
    return;
  }

  slot.pitchSolved = true;
  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-wrong", "key-correct", "key-pending-pair");
  });
  keyBtn.classList.add("key-correct");

  const isLast = currentSlotIdx >= tot - 1;
  if (!state.isPlaying) {
    const beatSec = 60 / (state.activeBpm || 90);
    const rawDur = Math.max(0.22, Math.min(0.95, (slot.durationBeats || 1) * beatSec * 0.86));
    audioEngine.playStep([slot.noteName], isLast ? Math.max(rawDur, 0.55) : rawDur, null, "interval");
  }

  if (slot.rhythmSolved || ex.melodyStyle !== "dictation") {
    completeMelodyFreeSlot(ex, currentSlotIdx, keyBtn, { inputPoint: capturedInputPoint });
    return;
  }

  // Im Melodiediktat wurde zuerst die Tonhöhe gelöst -> auf Notenwert warten
  keyBtn.classList.add("key-pending-pair");
  syncMelodySlotCardUI(ex, currentSlotIdx);
  renderMelodyRhythmPicker(ex);
  setCentralStageMode("stage-playing");
  updateStageMascot("happy");
  document.getElementById("stageSubtext").textContent = tf("TON {n} VON {tot} • TONHÖHE RICHTIG", "NOTE {n} OF {tot} • PITCH CORRECT", { n: currentSlotIdx + 1, tot });
  document.getElementById("stageMainText").textContent = getSolfegeDisplayLabel(slot.syllable);
  document.getElementById("stageFunctionText").textContent = tr("Jetzt noch den passenden Notenwert darüber wählen!", "Now pick the matching note value above!");
}

function getNotationLedgerLevelTag(ex) {
  const lvlCfg = NOTATION_LEVELS[ex?.level] || NOTATION_LEVELS[1];
  const hasKeySig = ex?.keySignatureId && ex.keySignatureId !== "none";
  if (lvlCfg.maxLedgers === 0) return tr("Stammlinien", "5-Line Staff");
  if (lvlCfg.maxLedgers <= 2) return tr("±2 Hilfslinien", "±2 Ledger Lines");
  return ex?.level >= 4
    ? (hasKeySig ? tr("±3 + ♮/♯/♭", "±3 + ♮/♯/♭") : tr("±3 Hilfsl. + ♯/♭", "±3 Ledger + ♯/♭"))
    : tr("±3 Hilfslinien", "±3 Ledger Lines");
}

function getNotationActiveKeyChipLabel(ex) {
  if (!ex) return getLocalizedNotationKeySigName("none", true);
  const sigId = normalizeNotationKeySigId(ex.keySignatureId || "none");
  if (sigId === "none") return getLocalizedNotationKeySigName("none", true);
  const name = getLocalizedNotationKeySigName(sigId, true);
  const badge = getLocalizedNotationKeySigBadge(sigId, false);
  const progress = isNotationKeyPoolMode(ex.notationKeyMode) && !state.exam?.active
    ? ` • ${(ex.keySignaturePhraseProgress || 0) + 1}/${ex.keySignaturePhraseLength || NOTATION_KEY_PHRASE_LEN}`
    : "";
  return `${name} (${badge})${progress}`;
}

function renderInlineNotationKeyPopover() {
  const pop = document.getElementById("inlineNotationKeyPopover");
  if (!pop) return;
  const activeKeyMode = normalizeNotationKeyMode(state.settings.notationKeyMode);
  const ex = state.currentExercise;
  const activeSig = ex && isNotationMode(ex.type) ? normalizeNotationKeySigId(ex.keySignatureId || "none") : "none";
  const showNextKeyBtn = Boolean(ex && isNotationMode(ex.type) && isNotationKeyPoolMode(activeKeyMode) && !state.exam?.active);

  const poolBtns = [
    { id: "none",   label: tr("Ohne (C-Dur)", "None (C)") },
    { id: "easy",   label: tr("1–2 ♯/♭", "1–2 ♯/♭") },
    { id: "medium", label: tr("3–4 ♯/♭", "3–4 ♯/♭") },
    { id: "hard",   label: tr("5–6 ♯/♭", "5–6 ♯/♭") },
    { id: "all",    label: tr("Alle 12", "All 12") }
  ].map(item => `
    <button type="button" class="popover-pill-btn${activeKeyMode === item.id ? " active" : ""}" data-inline-notation-key="${item.id}">
      ${escapeHtml(item.label)}
    </button>
  `).join("");

  const renderSigPopBtn = (sigId) => {
    const badge = getLocalizedNotationKeySigBadge(sigId, false);
    const shortName = getLocalizedNotationKeySigName(sigId, true).replace(/-Dur$| Major$| majeur$| мажор$/i, "");
    const isSel = activeKeyMode === sigId || (isNotationKeyPoolMode(activeKeyMode) && activeSig === sigId);
    return `
      <button type="button" class="popover-pill-btn${isSel ? " active" : ""}" data-inline-notation-key="${sigId}">
        ${escapeHtml(shortName)} ${escapeHtml(badge)}
      </button>
    `;
  };

  pop.innerHTML = `
    <div class="notation-key-pop-head">
      <span class="popover-label">${escapeHtml(tr("Tonart (Vorzeichen):", "Key Signature:"))}</span>
      ${showNextKeyBtn ? `
        <button type="button" class="popover-pill-btn" data-inline-notation-rotate="1">
          ${escapeHtml(tr("↻ Nächste Tonart", "↻ Next Key"))}
        </button>
      ` : ""}
    </div>
    <div class="popover-pills-row">${poolBtns}</div>
    <div class="notation-key-pop-grid">
      ${NOTATION_SHARP_KEY_ORDER.map(renderSigPopBtn).join("")}
      ${NOTATION_FLAT_KEY_ORDER.map(renderSigPopBtn).join("")}
    </div>
  `;

  pop.querySelectorAll("[data-inline-notation-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      applyInlineNotationKeyMode(btn.dataset.inlineNotationKey);
    });
  });
  pop.querySelector("[data-inline-notation-rotate]")?.addEventListener("click", () => {
    rotateNotationExerciseKeyNow();
  });
}

function applyInlineNotationKeyMode(nextKeyMode) {
  if (state.exam?.active) return;
  const normalized = normalizeNotationKeyMode(nextKeyMode);
  state.setNotationKeyMode(normalized);
  cancelListenOnlyTimers();
  stopPlayback();
  generateExercise();
  if (state.listenOnly?.active) {
    startListenOnlyCycle();
  }
}

function rotateNotationExerciseKeyNow() {
  const ex = state.currentExercise;
  if (!ex || !isNotationMode(ex.type) || state.exam?.active) return;
  const nextSig = resolveNotationKeySignatureId(ex.notationKeyMode, ex.keySignatureId);
  ex.keySignatureId = nextSig;
  ex.keySignaturePhraseProgress = 0;
  ex.allowAccidentals = Boolean((NOTATION_LEVELS[ex.level] || NOTATION_LEVELS[1]).allowAccidentals || nextSig !== "none");
  populateNotationExerciseQueue(ex);
  ex.notationPanelState = "";
  renderUI();
}

const DEFAULT_NOTATION_LISTEN_PACE = 50;

function clampNotationListenPace(val) {
  const num = Number(val);
  if (!Number.isFinite(num)) return DEFAULT_NOTATION_LISTEN_PACE;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function getLocalizedNotationPaceLabel(paceVal = state?.settings?.notationListenOnlyPace) {
  const p = clampNotationListenPace(paceVal);
  if (p <= 19) return tr("Sehr langsam", "Very slow", { fr: "Très lent", pl: "Bardzo wolno", uk: "Дуже повільно", ur: "بہت آہستہ" });
  if (p <= 39) return tr("Langsam", "Slow", { fr: "Lent", pl: "Wolno", uk: "Повільно", ur: "آہستہ" });
  if (p <= 60) return tr("Mittel", "Medium", { fr: "Moyen", pl: "Średnio", uk: "Середньо", ur: "درمیانہ" });
  if (p <= 80) return tr("Schnell", "Fast", { fr: "Rapide", pl: "Szybko", uk: "Швидко", ur: "تیز" });
  return tr("Sehr schnell", "Very fast", { fr: "Très rapide", pl: "Bardzo szybko", uk: "Дуже швидко", ur: "بہت تیز" });
}

function getNotationListenOnlyKeyRevealDelayMs(paceVal = state?.settings?.notationListenOnlyPace) {
  const p = clampNotationListenPace(paceVal);
  if (p <= 50) {
    return Math.round(1900 + (LISTEN_ONLY_NOTATION_KEY_REVEAL_DELAY_MS - 1900) * (p / 50));
  }
  return Math.round(LISTEN_ONLY_NOTATION_KEY_REVEAL_DELAY_MS + (380 - LISTEN_ONLY_NOTATION_KEY_REVEAL_DELAY_MS) * ((p - 50) / 50));
}

function getNotationListenOnlyAdvanceDelayMs(paceVal = state?.settings?.notationListenOnlyPace) {
  const p = clampNotationListenPace(paceVal);
  if (p <= 50) {
    return Math.round(2100 + (LISTEN_ONLY_NOTATION_ADVANCE_DELAY_MS - 2100) * (p / 50));
  }
  return Math.round(LISTEN_ONLY_NOTATION_ADVANCE_DELAY_MS + (480 - LISTEN_ONLY_NOTATION_ADVANCE_DELAY_MS) * ((p - 50) / 50));
}

function getNotationListenOnlyToneDurationSec(paceVal = state?.settings?.notationListenOnlyPace) {
  const p = clampNotationListenPace(paceVal);
  return Number((1.15 - (p / 100) * 0.4).toFixed(2));
}

function syncNotationPaceUI() {
  const p = clampNotationListenPace(state?.settings?.notationListenOnlyPace);
  const paceLabel = getLocalizedNotationPaceLabel(p);
  const paceBtn = document.getElementById("moduleNotationPaceBtn");
  const paceSlider = document.getElementById("inlineNotationPaceSlider");
  const paceVal = document.getElementById("inlineNotationPaceVal");
  if (paceBtn) {
    paceBtn.textContent = tf("Tempo: {p}", "Pace: {p}", { p: paceLabel });
  }
  if (paceSlider && String(paceSlider.value) !== String(p)) {
    paceSlider.value = String(p);
  }
  if (paceVal) {
    paceVal.textContent = paceLabel;
  }
  if (state?.listenOnly?.active && isNotationMode(state?.currentExercise?.type)) {
    document.getElementById("inlineNotationPacePopover")?.classList.remove("hidden");
    paceBtn?.classList.add("chip-open");
  }
}

function setNotationListenOnlyPace(nextVal) {
  const clamped = clampNotationListenPace(nextVal);
  if (state?.settings) {
    state.settings.notationListenOnlyPace = clamped;
  }
  syncNotationPaceUI();
}

function syncNotationHeaderUI(ex = state.currentExercise) {
  if (!ex || !isNotationMode(ex.type)) return;
  syncNotationPaceUI();
  const targetClefId = ex.targetItem?.clefId || ex.baseClefId || "treble";
  const targetClefName = getLocalizedNotationClefName(targetClefId);
  const moduleTitleEl = document.getElementById("moduleTitleText");
  const moduleNotationKeyBtn = document.getElementById("moduleNotationKeyBtn");
  const targetBadgeEl = document.getElementById("targetBarBadge");
  const tonicRefRow = document.getElementById("tonicRefRow");
  const tonicRefBtn = document.getElementById("tonicRefBtn");
  const inputPromptText = document.getElementById("inputPromptText");

  if (moduleTitleEl) {
    moduleTitleEl.textContent = ex.isMixedClef && !state.exam?.active
      ? tf("Schlüssel-Mix • {clef}", "Clef Mix • {clef}", { clef: targetClefName })
      : targetClefName;
  }
  if (moduleNotationKeyBtn) {
    moduleNotationKeyBtn.textContent = getNotationActiveKeyChipLabel(ex);
  }
  renderInlineNotationKeyPopover();
  if (targetBadgeEl) {
    targetBadgeEl.textContent = tf("Stufe {lvl} • {tag}", "Level {lvl} • {tag}", {
      lvl: ex.level || 1,
      tag: getNotationLedgerLevelTag(ex)
    });
  }
  tonicRefRow?.classList.add("hidden");
  tonicRefBtn?.classList.add("hidden");
  if (inputPromptText) {
    inputPromptText.textContent = ex.keySignatureId && ex.keySignatureId !== "none"
      ? tr("Note links (mit Vorzeichen) wählen:", "Play left note (mind key sig.):")
      : tr("Note links wählen:", "Play left note:");
  }
}

function renderNotationStaffPanel(ex, didShift = false, targetGrid = document.getElementById("barsGrid")) {
  if (!ex || !targetGrid) return;
  const target = ex.targetItem || ex.notationQueue?.[0];
  const clefId = target?.clefId || ex.baseClefId || "treble";
  const keySigId = normalizeNotationKeySigId(ex.keySignatureId || target?.keySignatureId || "none");
  const clefName = getLocalizedNotationClefName(clefId);
  const rightHint = state.exam?.active
    ? getLocalizedNotationClefAnchorHint(clefId)
    : (target?.ledgerDesc || getNotationLedgerDescription(target?.staffStep ?? 4));
  const showClefPill = Boolean(ex.isMixedClef && !state.exam?.active);
  const showKeySigPill = keySigId !== "none";
  const hasLeftPill = showClefPill || showKeySigPill;

  const keySigPillText = showKeySigPill
    ? `${getLocalizedNotationKeySigName(keySigId, true)} • ${getLocalizedNotationKeySigBadge(keySigId, true)}${
        isNotationKeyPoolMode(ex.notationKeyMode) && !state.exam?.active
          ? ` (${(ex.keySignaturePhraseProgress || 0) + 1}/${ex.keySignaturePhraseLength || NOTATION_KEY_PHRASE_LEN})`
          : ""
      }`
    : "";

  const panel = document.createElement("div");
  panel.className = `notation-staff-panel${ex.notationPanelState ? " " + ex.notationPanelState : ""}`;
  panel.id = "notationStaffPanel";

  const svg = buildNotationStaffSVG(ex.notationQueue, {
    clefId: clefId,
    keySignatureId: keySigId,
    level: ex.level || 1,
    highlightFirst: true,
    showChangeClefs: showClefPill,
    didShift: Boolean(didShift)
  });

  panel.innerHTML = `
    <div class="notation-queue-strip${hasLeftPill ? "" : " is-single-clef"}">
      ${hasLeftPill ? `
        <span class="notation-queue-pills" style="display:inline-flex;flex-wrap:wrap;gap:0.28rem;align-items:center;">
          ${showClefPill ? `<span class="notation-clef-pill">${escapeHtml(clefName)}</span>` : ""}
          ${showKeySigPill ? `<span class="notation-keysig-pill">${escapeHtml(keySigPillText)}</span>` : ""}
        </span>
      ` : ""}
      <span class="notation-ledger-hint">${escapeHtml(rightHint)}</span>
    </div>
    ${svg}
  `;

  targetGrid.innerHTML = "";
  targetGrid.appendChild(panel);
}

function advanceNotationPhraseKeyIfNeeded(ex) {
  if (!ex || !isNotationKeyPoolMode(ex.notationKeyMode) || state.exam?.active) return null;
  const len = ex.keySignaturePhraseLength || NOTATION_KEY_PHRASE_LEN;
  ex.keySignaturePhraseProgress = (ex.keySignaturePhraseProgress || 0) + 1;
  if (ex.keySignaturePhraseProgress < len) return null;

  const nextKeySig = resolveNotationKeySignatureId(ex.notationKeyMode, ex.keySignatureId);
  ex.keySignatureId = nextKeySig;
  ex.keySignaturePhraseProgress = 0;
  ex.allowAccidentals = Boolean((NOTATION_LEVELS[ex.level] || NOTATION_LEVELS[1]).allowAccidentals || nextKeySig !== "none");
  populateNotationExerciseQueue(ex);
  return nextKeySig;
}

function shiftAndAdvanceNotationQueue(ex, feedbackKind, stageSub, stageMain, stageDesc, keyBtn) {
  if (!ex) return;
  const rotatedKeySig = advanceNotationPhraseKeyIfNeeded(ex);
  if (!rotatedKeySig) {
    const queue = Array.isArray(ex.notationQueue) ? ex.notationQueue.slice(1) : [];
    const lastNote = queue[queue.length - 1] || ex.targetItem || null;
    queue.push(buildNextNotationQueueNote(ex, lastNote));
    ex.notationQueue = queue;
    ex.targetItem = queue[0] || null;
    ex.keyName = getLocalizedNotationClefName(ex.targetItem?.clefId || ex.baseClefId || "treble");
  }
  ex.notationPanelState = feedbackKind === "correct" ? "is-correct" : "";

  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-wrong", "key-correct");
  });
  if (feedbackKind === "correct" && keyBtn) {
    keyBtn.classList.add("key-correct");
    setTimeout(() => keyBtn.classList.remove("key-correct"), 230);
  }

  renderNotationStaffPanel(ex, true);
  syncNotationHeaderUI(ex);

  if (feedbackKind === "correct") {
    const panelEl = document.getElementById("notationStaffPanel");
    setTimeout(() => {
      if (ex.notationPanelState === "is-correct") ex.notationPanelState = "";
      panelEl?.classList.remove("is-correct");
    }, 240);
  }

  const finalDesc = rotatedKeySig
    ? tf("Neue Tonart: {key} ({acc})!", "New key: {key} ({acc})!", {
        key: getLocalizedNotationKeySigName(rotatedKeySig, true),
        acc: getLocalizedNotationKeySigBadge(rotatedKeySig, true)
      })
    : stageDesc;

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode(feedbackKind === "correct" ? "stage-playing" : "stage-target");
    updateStageMascot(feedbackKind === "correct" ? "happy" : "idle");
    document.getElementById("stageSubtext").textContent = stageSub;
    document.getElementById("stageMainText").textContent = stageMain;
    document.getElementById("stageFunctionText").textContent = finalDesc;
    renderStageStreakUI();
  }
}

async function handleNotationKeyClick(clickedKeyDef, keyBtn, options = {}) {
  const ex = state.currentExercise;
  if (!ex || !isNotationMode(ex.type) || !ex.targetItem) return;
  const capturedInputPoint = resolveInputPointFromOptions(options);
  const isListenOnly = Boolean(options.fromListenOnly && state.listenOnly?.active);
  const listenOnlyToken = isListenOnly ? state.listenOnly.token : null;
  if (!options.fromListenOnly && state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }

  await ensureAudioReady();
  if (isListenOnly && (!state.listenOnly?.active || state.listenOnly.token !== listenOnlyToken || state.currentView !== "exercise" || state.currentExercise !== ex)) {
    return;
  }

  if (state.exam?.active) {
    handleExamNotationAnswer(ex, clickedKeyDef, keyBtn);
    return;
  }

  const target = ex.targetItem;
  const isCorrect = Boolean(clickedKeyDef && Number(clickedKeyDef.pc) === Number(target.pc));

  if (!isCorrect) {
    if (!isListenOnly) resetExerciseStreakOnAttempt(ex);
    ex.notationPanelState = "is-wrong";
    keyBtn?.classList.add("key-wrong");
    const panelEl = document.getElementById("notationStaffPanel");
    panelEl?.classList.remove("is-correct");
    panelEl?.classList.add("is-wrong");

    if (document.getElementById("centralStageCard")) {
      setCentralStageMode("stage-wrong");
      updateStageMascot("thinking");
      const pickedLbl = clickedKeyDef?.noteLabel
        ? String(clickedKeyDef.noteLabel).replace(/\s*\n\s*/g, " / ")
        : "?";
      const activeKeySig = normalizeNotationKeySigId(ex.keySignatureId || "none");
      document.getElementById("stageSubtext").textContent = tr("NOCH NICHT GANZ", "NOT QUITE");
      document.getElementById("stageMainText").textContent = tf("{note}? Nein", "{note}? No", { note: pickedLbl });
      document.getElementById("stageFunctionText").textContent = activeKeySig !== "none"
        ? tf("Tonart {key} ({acc}) beachten – oder „Überspringen“.", "Watch {key} ({acc}) — or tap “Skip”.", {
            key: getLocalizedNotationKeySigName(activeKeySig, true),
            acc: getLocalizedNotationKeySigBadge(activeKeySig, true)
          })
        : tf("Schau genau in den {clef} — oder tippe „Überspringen“.", "Check the {clef} carefully — or tap “Skip”.", {
            clef: getLocalizedNotationClefName(target.clefId)
          });
    }
    return;
  }

  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);
  if (isListenOnly || shouldPlayCorrectAnswerAudio()) {
    audioEngine.playStep([target.noteName], 0.85, null, "interval");
  }

  const streakRes = isListenOnly
    ? { count: state.streakState?.count || 0, isMilestone: false }
    : recordExerciseStreakSuccess(ex);
  ex.notationSolvedCount = (ex.notationSolvedCount || 0) + 1;

  if (!isListenOnly) {
    triggerCelebrationFeedback(keyBtn, { isMilestone: streakRes.isMilestone, inputPoint: capturedInputPoint });
  }

  shiftAndAdvanceNotationQueue(
    ex,
    "correct",
    tr("RICHTIG GELESEN!", "READ CORRECTLY!"),
    target.displayName,
    tf("{clef} • {ledger}", "{clef} • {ledger}", {
      clef: getLocalizedNotationClefName(target.clefId),
      ledger: target.ledgerDesc
    }),
    keyBtn
  );
}

function skipNotationNote() {
  const ex = state.currentExercise;
  if (!ex || !isNotationMode(ex.type) || state.exam?.active || !ex.targetItem) return;
  const target = ex.targetItem;
  stopPlayback();
  if (state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }
  ex.notationSkippedCount = (ex.notationSkippedCount || 0) + 1;
  resetExerciseStreakOnAttempt(ex);

  if (shouldPlayCorrectAnswerAudio()) {
    ensureAudioReady().then(() => {
      if (state.currentView === "exercise" && state.currentExercise === ex && !state.exam?.active) {
        audioEngine.playStep([target.noteName], 0.72, null, "interval");
      }
    }).catch(() => {});
  }

  shiftAndAdvanceNotationQueue(
    ex,
    "skip",
    tr("ÜBERSPRUNGEN • DAS WAR:", "SKIPPED • THAT WAS:"),
    target.displayName,
    tf("{clef} • {ledger}", "{clef} • {ledger}", {
      clef: getLocalizedNotationClefName(target.clefId),
      ledger: target.ledgerDesc
    }),
    null
  );
}

function revealNotationListenOnly(ex, token) {
  if (!ex || !ex.targetItem || !state.listenOnly?.active || state.listenOnly.token !== token || state.currentView !== "exercise") {
    return;
  }
  const target = ex.targetItem;
  const keyBtn = document.getElementById(`solfegeKey_${60 + Number(target.pc)}`) ||
    Array.from(document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key:not(.piano-key-frame), #solfegeKeyboardWrap .piano-black-key"))
      .find(el => parseInt(el.dataset.pc, 10) === Number(target.pc)) || null;
  state.listenOnly.phase = "reveal";

  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-wrong", "key-correct");
  });
  keyBtn?.classList.add("key-correct");

  ex.notationPanelState = "is-correct";
  const panelEl = document.getElementById("notationStaffPanel");
  panelEl?.classList.remove("is-wrong");
  panelEl?.classList.add("is-correct");

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    document.getElementById("stageSubtext").textContent = tr("RICHTIG GELESEN!", "READ CORRECTLY!");
    document.getElementById("stageMainText").textContent = target.displayName;
    document.getElementById("stageFunctionText").textContent = tf("{clef} • {ledger}", "{clef} • {ledger}", {
      clef: getLocalizedNotationClefName(target.clefId),
      ledger: target.ledgerDesc
    });
  }

  scheduleListenOnlyStep((nextToken) => {
    if (!state.listenOnly?.active || state.listenOnly.token !== nextToken || state.currentView !== "exercise" || state.currentExercise !== ex) {
      return;
    }
    ex.notationSolvedCount = (ex.notationSolvedCount || 0) + 1;
    shiftAndAdvanceNotationQueue(
      ex,
      "listen-advance",
      tr("NUR HÖREN • NOTENLESEN", "LISTEN ONLY • SIGHT-READ"),
      getLocalizedNotationClefName(ex.targetItem?.clefId || ex.baseClefId || "treble"),
      tr("Höre den Ton & schau auf die erste Note links…", "Hear the tone & read the leftmost note…"),
      null
    );
    startListenOnlyCycle();
  }, getNotationListenOnlyAdvanceDelayMs(), token);
}

/**
 * Verarbeitet das Antippen einer Taste auf der Solfège-Klaviatur:
 * - Falsch: Taste wird rot, Nutzer kann weiter tippen.
 * - Richtig: Taste wird grün, Auflösung zur Tonika erklingt (Do-Fa abwärts, Sol-Ti aufwärts)
 *   mit rhythmisch sich verjüngenden Notenwerten hin zur Tonika.
 */
async function handleSolfegeKeyClick(clickedKeyDef, keyBtn, options = {}) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "solfege" || state.solfegeAnswered) return;
  const capturedInputPoint = resolveInputPointFromOptions(options);
  const isListenOnly = Boolean(options.fromListenOnly && state.listenOnly?.active);
  const listenOnlyToken = isListenOnly ? state.listenOnly.token : null;
  if (!options.fromListenOnly && state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }

  await ensureAudioReady();
  if (isListenOnly && (!state.listenOnly?.active || state.listenOnly.token !== listenOnlyToken || state.currentView !== "exercise" || state.currentExercise !== ex || state.solfegeAnswered)) {
    return;
  }

  if (state.exam?.active) {
    handleExamSolfegeAnswer(ex, clickedKeyDef, keyBtn);
    return;
  }

  const target = ex.targetItem;
  // Prüfe, ob die richtige Taste (oder bei Do eine der beiden Do-Tasten) getroffen wurde
  const isCorrect = clickedKeyDef.midi === target.midi ||
    (target.syllable === "Do" && clickedKeyDef.syllable === "Do");

  if (!isCorrect) {
    // Falsche Antwort: Taste nur rot färben (KEIN Ton erklingt, damit der gehörte Zielton im Ohr bleibt)
    if (!isListenOnly) resetExerciseStreakOnAttempt(ex);
    keyBtn?.classList.add("key-wrong");

    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tr("NOCH NICHT GANZ", "NOT QUITE");
    document.getElementById("stageMainText").textContent = `${getSolfegeDisplayLabel(clickedKeyDef.syllable)}? ${tr("Nein", "No")}`;
    document.getElementById("stageFunctionText").textContent = tr("Tippe weiter oder hör dir den Ton nochmal an!", "Keep trying or replay the tone!");
    return;
  }

  // Richtige Antwort!
  state.solfegeAnswered = true;
  state.exerciseSolved = true;
  ex.isSolved = true;
  if (isListenOnly) {
    state.listenOnly.phase = "reveal";
  }
  audioEngine.stopPlayback();
  state.isPlaying = false;

  const keyboardResolveSeq = target.resolveMidis;
  const audioResolveSeq = target.audioResolveMidis || target.resolveMidis;
  const currentId = audioEngine.playbackId;

  // Alle bisherigen Falsch-Markierungen aufheben (auf weißen & schwarzen Tonleiter-Tasten)
  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-wrong", "key-correct");
  });

  const initialGreenEl = document.getElementById(`solfegeKey_${target.midi}`) || keyBtn;
  initialGreenEl?.classList.add("key-correct");

  const streakRes = isListenOnly
    ? { count: state.streakState?.count || 0, isMilestone: false }
    : recordExerciseStreakSuccess(ex);
  setCentralStageMode("stage-playing");
  updateStageMascot("happy");
  if (!isListenOnly) {
    triggerCelebrationFeedback(keyBtn || initialGreenEl, { isMilestone: streakRes.isMilestone, inputPoint: capturedInputPoint });
  }
  document.getElementById("stageSubtext").textContent = tr("RICHTIG! AUFLÖSUNG ZUR TONIKA", "CORRECT! RESOLVING TO TONIC");
  document.getElementById("stageMainText").textContent = getSolfegeDisplayLabel(target.syllable);
  document.getElementById("stageFunctionText").textContent = target.label;

  updatePlayButtonUI(false);

  // Auflösung zur Tonika abspielen (takt-technisch gestaffelt & gekoppelt an state.activeBpm)
  const resolutionSchedule = buildSolfegeResolutionSchedule(keyboardResolveSeq.length, state.activeBpm);

  keyboardResolveSeq.forEach((kbMidi, idx) => {
    const soundMidi = audioResolveSeq[idx] !== undefined ? audioResolveSeq[idx] : kbMidi;
    const step = resolutionSchedule.steps[idx];
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== currentId) return;

      document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
        el.classList.toggle("key-correct", parseInt(el.dataset.midi, 10) === kbMidi);
      });

      audioEngine.playStep([midiToNote(soundMidi)], step.durationSec, null, "interval");
    }, step.delayMs);
  });

  // Falls Auto-Weiter oder der Nur-Hören-Modus aktiv ist:
  // Nach dem Ausklingen der Auflösung automatisch die nächste Abfrage starten!
  const autoNextDelayMs = resolutionSchedule.totalEndMs + 320;
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== currentId) return;
    if ((state.settings.solfegeAutoNext || isListenOnly) && state.currentView === "exercise" && state.settings.mode === "solfege") {
      if (isListenOnly) {
        if (!state.listenOnly.active || state.listenOnly.token !== listenOnlyToken) return;
        generateExercise();
        startListenOnlyCycle();
      } else {
        generateExercise();
        playSequence();
      }
    }
  }, autoNextDelayMs);
}

function getChordArpeggioTiming(noteCount, bpm = state.activeBpm) {
  const clampedBpm = Math.max(55, Math.min(160, Number(bpm) || 90));
  const beatSec = 60 / clampedBpm;
  const stepSec = beatSec * 0.5; // Achtel-Tempo: moderat schnell statt ganzer Noten
  const stepMs = Math.round(stepSec * 1000);
  const count = Math.max(1, noteCount || 1);
  const noteDurSec = Math.max(0.24, stepSec * 1.45);
  const lastNoteDurSec = Math.max(0.48, stepSec * 2.15);
  const lastOffsetMs = (count - 1) * stepMs;
  const lastNoteHoldMs = Math.max(580, Math.round(lastNoteDurSec * 1000));
  const postArpeggioPauseMs = 1000;
  const nextExerciseDelayMs = lastOffsetMs + lastNoteHoldMs + postArpeggioPauseMs;
  return { stepMs, noteDurSec, lastNoteDurSec, nextExerciseDelayMs };
}

function getChordArpeggioPromptTiming(noteCount, bpm = state.activeBpm) {
  const safeBpm = Math.max(55, Math.min(180, Number(bpm) || 90));
  const beatSec = 60 / safeBpm;
  const stepSec = beatSec * 0.55;
  const stepMs = Math.round(stepSec * 1000);
  const count = Math.max(1, noteCount || 1);
  const noteDurSec = Math.max(0.28, stepSec * 1.45);
  const lastNoteDurSec = Math.max(0.55, beatSec * 1.1);
  const cycleMs = (count - 1) * stepMs + Math.round(Math.max(0.65, lastNoteDurSec) * 1000) + 350;
  return { stepMs, noteDurSec, lastNoteDurSec, cycleMs };
}

function handleAnswer(selectedKey, btnElement, options = {}) {
  const ex = state.currentExercise;
  if (!ex) return;
  const capturedInputPoint = resolveInputPointFromOptions(options);

  if (ex.type === "rhythm-dictation") {
    return handleRhythmDictationChoice(selectedKey, btnElement, { ...options, inputPoint: capturedInputPoint });
  }
  if (state.exam?.active) {
    handleExamChoiceAnswer(ex, selectedKey, btnElement);
    return;
  }
  if (ex.isSolved) return;

  const isListenOnly = Boolean(options.fromListenOnly && state.listenOnly?.active);
  const listenOnlyToken = isListenOnly ? state.listenOnly.token : null;
  if (!options.fromListenOnly && state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }

  const isCorrect = selectedKey === ex.targetItem.key;

  if (isCorrect) {
    ex.isSolved = true;
    state.exerciseSolved = true;
    if (isListenOnly) {
      state.listenOnly.phase = "reveal";
    }
    // Wenn Auto-Weiter, Loop oder Nur-Hören aktiv ist, nach richtiger Antwort automatisch nächste Abfrage starten
    const shouldAutoContinue = isListenOnly || state.settings.autoNextAfterCorrect || state.settings.loop;
    audioEngine.stopPlayback();
    state.isPlaying = false;
    updatePlayButtonUI(false);

    btnElement?.classList.add("btn-correct");
    const streakRes = isListenOnly
      ? { count: state.streakState?.count || 0, isMilestone: false }
      : recordExerciseStreakSuccess(ex);
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    if (!isListenOnly) {
      triggerCelebrationFeedback(btnElement, { isMilestone: streakRes.isMilestone, inputPoint: capturedInputPoint });
    }
    document.getElementById("stageSubtext").textContent = tr("RICHTIG!", "CORRECT!");
    document.getElementById("stageMainText").textContent = ex.targetItem.roman || ex.targetItem.symbol;
    document.getElementById("stageFunctionText").textContent = ex.targetItem.label;

    const revealAllNonRef = ex.type === "rhythm-meter" ||
      (ex.type === "rhythm-groove" && ex.grooveKind === "style");
    ex.bars.forEach((bar, i) => {
      if (i === ex.targetIndex || (revealAllNonRef && bar.key !== "ref")) {
        const card = document.getElementById(`barCard_${i}`);
        if (card) {
          card.querySelector(".bar-roman").textContent = ex.targetItem.displayMain || ex.targetItem.roman || ex.targetItem.symbol;
          card.querySelector(".bar-label").textContent = ex.type === "chord-inversions" ? (bar.short || ex.targetItem.short) : ex.targetItem.short;
          card.classList.remove("bar-target");
          card.classList.add("bar-active");
        }
      }
    });

    const advanceToNextExercise = () => {
      if (state.currentView !== "exercise") return;
      if (isListenOnly) {
        if (!state.listenOnly.active || state.listenOnly.token !== listenOnlyToken) return;
        generateExercise();
        startListenOnlyCycle();
        return;
      }
      generateExercise();
      if (shouldAutoContinue) {
        playSequence();
      }
    };

    const runAudioRevealOrAdvance = (revealPlaybackId, startAudioRevealFn, onFallbackAdvance) => {
      if (audioEngine.isInitialized) {
        startAudioRevealFn();
        return;
      }
      ensureAudioReady().then(() => {
        if (audioEngine.playbackId !== revealPlaybackId || state.currentView !== "exercise") return;
        if (audioEngine.isInitialized) {
          startAudioRevealFn();
        } else {
          onFallbackAdvance();
        }
      }).catch(() => {
        if (audioEngine.playbackId === revealPlaybackId) {
          onFallbackAdvance();
        }
      });
    };

    const scheduleSimpleRevealAdvance = (delayPlaybackId, delayMs = 1050) => {
      if (isListenOnly) {
        scheduleListenOnlyStep(advanceToNextExercise, LISTEN_ONLY_POST_REVEAL_MS, listenOnlyToken);
      } else {
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== delayPlaybackId) return;
          advanceToNextExercise();
        }, delayMs);
      }
    };

    const chordNotes = (ex.type === "interval-chords" || ex.type === "chord-inversions") && Array.isArray(ex.targetItem?.notes)
      ? ex.targetItem.notes
      : null;
    const arpBlockNotes = isChordArpeggioMode(ex.type) && Array.isArray(ex.targetItem?.notes)
      ? ex.targetItem.notes
      : null;

    if (chordNotes && chordNotes.length > 0) {
      const { stepMs, noteDurSec, lastNoteDurSec, nextExerciseDelayMs } = getChordArpeggioTiming(
        chordNotes.length,
        state.activeBpm
      );
      const arpeggioPlaybackId = audioEngine.playbackId;
      runAudioRevealOrAdvance(
        arpeggioPlaybackId,
        () => {
          if (!audioEngine.isInitialized || audioEngine.playbackId !== arpeggioPlaybackId) return;
          chordNotes.forEach((note, idx) => {
            const isLast = idx === chordNotes.length - 1;
            const noteDur = isLast ? lastNoteDurSec : noteDurSec;
            const delayMs = idx * stepMs;
            if (delayMs === 0) {
              audioEngine.playStep([note], noteDur, null, "interval");
            } else {
              audioEngine.registerTimer(() => {
                if (audioEngine.playbackId !== arpeggioPlaybackId || state.currentView !== "exercise") return;
                audioEngine.playStep([note], noteDur, null, "interval");
              }, delayMs);
            }
          });
          audioEngine.registerTimer(() => {
            if (audioEngine.playbackId !== arpeggioPlaybackId) return;
            advanceToNextExercise();
          }, nextExerciseDelayMs);
        },
        () => scheduleSimpleRevealAdvance(arpeggioPlaybackId, 1050)
      );
    } else if (arpBlockNotes && arpBlockNotes.length > 0) {
      const confirmPlaybackId = audioEngine.playbackId;
      const blockDurSec = Math.max(0.85, Math.min(1.4, (60 / (state.activeBpm || 90)) * 1.4));
      runAudioRevealOrAdvance(
        confirmPlaybackId,
        () => {
          if (!audioEngine.isInitialized || audioEngine.playbackId !== confirmPlaybackId) return;
          audioEngine.playStep(arpBlockNotes, blockDurSec, null, "cadence");
          scheduleSimpleRevealAdvance(confirmPlaybackId, 1150);
        },
        () => scheduleSimpleRevealAdvance(confirmPlaybackId, 1050)
      );
    } else if (isListenOnly) {
      scheduleListenOnlyStep(advanceToNextExercise, LISTEN_ONLY_POST_REVEAL_MS, listenOnlyToken);
    } else {
      setTimeout(advanceToNextExercise, 1050);
    }

  } else {
    if (!isListenOnly) resetExerciseStreakOnAttempt(ex);
    btnElement.classList.add("btn-wrong");
    state.lastAnswerWasWrong = true;
    const chosenDef = getChoiceItem(ex.type, selectedKey);
    state.wrongAnswerData = { chosen: chosenDef, target: ex.targetItem };

    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tr("KNAPP DANEBEN", "NOT QUITE");
    document.getElementById("stageMainText").textContent = tr("Vergleichen hilft", "Compare Both");
    const isRhythmWrong = ex.type.startsWith("rhythm-");
    const isProdWrong = ex.type.startsWith("prod-");
    const isModesWrong = ex.type.startsWith("modes-");
    document.getElementById("stageFunctionText").textContent = isRhythmWrong
      ? tr("Hör dir beide Rhythmen direkt nacheinander an:", "Hear both rhythms back-to-back:")
      : (isProdWrong
          ? tr("Vergleiche deine Wahl direkt mit der Ziel-Frequenz:", "Compare your pick directly with the target frequency:")
          : (isModesWrong
              ? tr("Vergleiche beide Modi über demselben Grundton:", "Compare both modes over the same root:")
              : tr("Hör dir beide Klänge direkt nacheinander an:", "Hear both sounds back-to-back:")));

    const diagBassBtn = document.getElementById("btnDiagBass");
    if (diagBassBtn) {
      diagBassBtn.textContent = isRhythmWrong
        ? tr("Puls / Eins hören", "Hear Pulse / One")
        : (ex.type === "prod-eq-noise"
            ? tr("Flat → Ziel-EQ", "Flat → Target EQ")
            : (ex.type === "prod-tone"
                ? tr("Ref: 1 kHz", "Ref: 1 kHz")
                : (isModesWrong
                    ? tr("Anker-Quinte", "Anchor Fifth")
                    : (ex.type === "chord-inversions"
                        ? tr("Basston hören", "Hear Bass Note")
                        : (ex.type === "interval-drone"
                            ? tr("Fläche hören", "Hear Root Pad")
                            : tr("Bass / Grundton", "Bass / Root"))))));
    }

    const fb = document.getElementById("feedbackContainer");
    fb.classList.remove("hidden");
    document.getElementById("feedbackText").textContent =
      tf("Gewählt: {sym} ({lbl}).", "Selected: {sym} ({lbl}).", { sym: chosenDef.roman || chosenDef.symbol, lbl: chosenDef.label });
  }
}

/**
 * Verarbeitet die Auswahl eines Rhythmus-Bausteins im 4-Zählzeiten-Diktat.
 * Bereits gelöste Fragezeichen bleiben erhalten.
 */
async function handleRhythmDictationChoice(cellKey, btnElement, options = {}) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "rhythm-dictation" || state.rhythmDictationCompleted) return;
  const capturedInputPoint = resolveInputPointFromOptions(options);
  if (state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }

  await ensureAudioReady();

  if (state.exam?.active) {
    handleExamRhythmDictationAnswer(ex, cellKey, btnElement);
    return;
  }

  const currentIdx = ex.rhythmStep;
  const slot = ex.rhythmSlots[currentIdx];
  if (!slot) return;

  const isCorrect = cellKey === slot.cellKey;
  if (!isCorrect) {
    resetExerciseStreakOnAttempt(ex);
    btnElement?.classList.add("btn-wrong");
    const chosenCell = getChoiceItem("rhythm-dictation", cellKey);
    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tf("SCHLAG {n} VON 4 • NOCH NICHT", "BEAT {n} OF 4 • NOT QUITE", { n: currentIdx + 1 });
    document.getElementById("stageMainText").textContent = `${chosenCell?.short || cellKey}? ${tr("Nein", "No")}`;
    document.getElementById("stageFunctionText").textContent =
      tr("Tippe weiter oder nutze „Schlag nochmal“ (bzw. das ?-Feld).", "Keep trying or tap “Replay Beat” (or the ? card).");
    return;
  }

  slot.solved = true;
  document.querySelectorAll("#degreeButtonsGrid .degree-btn").forEach(el => {
    el.classList.remove("btn-wrong", "btn-correct");
  });
  btnElement?.classList.add("btn-correct");

  const card = document.getElementById(`barCard_${currentIdx}`);
  if (card) {
    card.className = "bar-card melody-slot-solved rhythm-slot-clickable tile-selected-pulse";
    const romanEl = card.querySelector(".bar-roman");
    const lblEl = card.querySelector(".bar-label");
    if (romanEl) romanEl.innerHTML = getRhythmCellSVG(slot.cellKey, 40, 22);
    if (lblEl) lblEl.textContent = `✓ ${slot.cell.short}`;
  }

  const isLast = currentIdx >= ex.rhythmSlots.length - 1;
  if (!state.isPlaying && slot.cell.offsets.length > 0) {
    const beatMs = 60000 / (state.activeBpm || 90);
    const beatEvents = slot.cell.offsets.map(off => [Math.round(off * beatMs), "clave", 0.92]);
    audioEngine.playRhythmSequence(beatEvents);
  }

  if (!isLast) {
    spawnJuiceBurst(btnElement, { intensity: "micro", inputPoint: capturedInputPoint });
    ex.rhythmStep = currentIdx + 1;
    ex.targetIndex = ex.rhythmStep;
    ex.targetItem = ex.rhythmSlots[ex.rhythmStep].cell;

    const nextIdx = ex.rhythmStep;
    const nextCard = document.getElementById(`barCard_${nextIdx}`);
    if (nextCard) {
      nextCard.classList.remove("melody-slot-pending");
      nextCard.classList.add("bar-target", "rhythm-slot-clickable");
      const nextLbl = nextCard.querySelector(".bar-label");
      if (nextLbl) nextLbl.textContent = tr("Gesucht", "Target");
    }

    const badge = document.getElementById("targetBarBadge");
    if (badge) badge.textContent = tf("Schlag {n} / 4", "Beat {n} / 4", { n: nextIdx + 1 });
    const promptEl = document.getElementById("inputPromptText");
    if (promptEl) promptEl.textContent = tf("Tippe das Muster für Schlag {n} von 4:", "Select the pattern for Beat {n} of 4:", { n: nextIdx + 1 });

    if (!state.isPlaying) {
      setCentralStageMode("stage-playing");
      updateStageMascot("happy");
      triggerMascotHappyHop();
      document.getElementById("stageSubtext").textContent = tf("SCHLAG {n} RICHTIG", "BEAT {n} CORRECT", { n: currentIdx + 1 });
      document.getElementById("stageMainText").textContent = slot.cell.short;
      document.getElementById("stageFunctionText").textContent = tf("Jetzt gesucht: Schlag {n} von 4", "Next target: Beat {n} of 4", { n: nextIdx + 1 });
    }

    const clearId = audioEngine.playbackId;
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId === clearId && !state.rhythmDictationCompleted) {
        btnElement?.classList.remove("btn-correct");
      }
    }, 380);
    return;
  }

  // Alle 4 Schläge gelöst -> nächste Aufgabe vorbereiten/starten
  state.rhythmDictationCompleted = true;
  state.exerciseSolved = true;
  ex.isSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  const badge = document.getElementById("targetBarBadge");
  if (badge) badge.textContent = tr("4 / 4 gelöst ✓", "4 / 4 solved ✓");
  const promptEl = document.getElementById("inputPromptText");
  if (promptEl) promptEl.textContent = tr("Alle 4 Zählzeiten gelöst – weiter geht’s!", "All 4 beats solved — moving on!");

  const streakRes = recordExerciseStreakSuccess(ex);
  setCentralStageMode("stage-playing");
  updateStageMascot("happy");
  triggerCelebrationFeedback(btnElement, { isMilestone: streakRes.isMilestone, inputPoint: capturedInputPoint });
  document.getElementById("stageSubtext").textContent = tr("RHYTHMUS GELÖST! (4/4)", "RHYTHM SOLVED! (4/4)");
  document.getElementById("stageMainText").textContent = ex.rhythmSlots.map(s => s.cell.short).join(" • ");
  document.getElementById("stageFunctionText").textContent = tr("Nächste Aufgabe wird geladen…", "Loading next exercise…");

  const completionPlaybackId = audioEngine.playbackId;
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== completionPlaybackId) return;
    if (state.currentView !== "exercise" || state.settings.mode !== "rhythm-dictation") return;
    generateExercise();
    if (state.settings.rhythmDictationAutoNext) {
      playSequence();
    }
  }, 1150);
}

/**
 * Spielt im Rhythmus-Diktat einen einzelnen Schlag mit kurzem Referenz-Vorpuls ab,
 * damit auch Pausen und Offbeats eindeutig einzuordnen sind.
 */
async function repeatRhythmDictationBeat(slotIdx = null) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "rhythm-dictation") return;
  if (state.exam?.active && !tryConsumeExamReplay()) return;
  if (state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }
  const idx = typeof slotIdx === "number" ? slotIdx : ex.rhythmStep;
  const slot = ex.rhythmSlots[idx];
  if (!slot) return;

  await ensureAudioReady();
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  ex.rhythmSlots.forEach((_, i) => {
    document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === idx);
  });

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode(slot.solved ? "stage-playing" : "stage-target");
    updateStageMascot(slot.solved ? "happy" : "question");
    document.getElementById("stageSubtext").textContent = tf("SCHLAG {n} VON 4 (EINZELN)", "BEAT {n} OF 4 (ISOLATED)", { n: idx + 1 });
    document.getElementById("stageMainText").textContent = slot.solved ? slot.cell.short : "?";
    document.getElementById("stageFunctionText").textContent = slot.solved
      ? tf("Gelöstes Muster ({lbl})", "Solved pattern ({lbl})", { lbl: slot.cell.label })
      : tr("Vorpuls + Schlag-Muster + Endpuls", "Lead-in pulse + beat pattern + closing pulse");
  }

  const beatMs = 60000 / (state.activeBpm || 90);
  const events = [
    [0, "tick", 0.56],
    [Math.round(beatMs), idx === 0 ? "accent" : "tick", 0.34]
  ];
  slot.cell.offsets.forEach(off => {
    events.push([Math.round((1 + off) * beatMs), "clave", 0.96]);
  });
  events.push([Math.round(2 * beatMs), "tick", 0.28]);

  audioEngine.playRhythmSequence(events);

  const singlePlaybackId = audioEngine.playbackId;
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== singlePlaybackId) return;
    document.getElementById(`barCard_${idx}`)?.classList.remove("bar-active");
    if (!slot.solved && !state.rhythmDictationCompleted && !state.isPlaying && !state.listenOnly?.active) {
      showAwaitingAnswerStage(ex);
    }
  }, Math.round(2 * beatMs + 140));
}

function getAudioClockSec() {
  if (typeof Tone !== "undefined" && typeof Tone.now === "function") {
    try {
      const t = Tone.now();
      if (Number.isFinite(t)) return t;
    } catch (_) {}
  }
  return Date.now() / 1000;
}

function renderRhythmTapPad() {
  const wrap = document.getElementById("rhythmTapPadWrap");
  const ex = state.currentExercise;
  if (!wrap || !ex || ex.type !== "rhythm-tap") return;

  wrap.innerHTML = `
    <button id="rhythmTapPadBtn" type="button" class="rhythm-tap-pad" aria-label="${tr("Rhythmus-Tap-Pad", "Rhythm Tap Pad")}">
      <div class="rhythm-pad-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="8"/>
          <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>
        </svg>
      </div>
      <div id="rhythmPadTitle" class="rhythm-pad-title">${tr("Bereit zum Klopfen", "Ready to Tap")}</div>
      <div id="rhythmPadSub" class="rhythm-pad-sub">${tr("Tippe „▶ Abspielen“ oder drücke die Leertaste", "Tap “▶ Play” or press Spacebar")}</div>
    </button>
  `;

  const padBtn = document.getElementById("rhythmTapPadBtn");
  if (!padBtn) return;

  let lastPointerDownWallMs = 0;

  padBtn.addEventListener("pointerdown", (e) => {
    const session = state.rhythmTapSession;
    if (!session || session.ended) return;
    lastPointerDownWallMs = Date.now();
    if (session.phase === "listen") {
      e.preventDefault();
      handleRhythmTapInput(null, extractEventInputPoint(e));
    } else if (session.phase === "counting" || session.phase === "demo") {
      e.preventDefault();
      const subEl = document.getElementById("rhythmPadSub");
      if (subEl) subEl.textContent = tr("Noch einen Moment – erst zu Ende hören!", "Hold on — listen to the whole demo first!");
    }
  });

  padBtn.addEventListener("click", (e) => {
    if (Date.now() - lastPointerDownWallMs < 350) return;
    const session = state.rhythmTapSession;
    if (session && !session.ended) {
      if (session.phase === "listen") {
        handleRhythmTapInput(null, extractEventInputPoint(e));
      } else {
        const subEl = document.getElementById("rhythmPadSub");
        if (subEl) subEl.textContent = tr("Noch einen Moment – erst zu Ende hören!", "Hold on — listen to the whole demo first!");
      }
      return;
    }
    if (state.listenOnly?.active) {
      setListenOnlyMode(false, { keepPlayback: true });
    }
    if (state.exam?.active) {
      if (state.exam.currentAnswered) return;
      triggerExamPlayAction();
      return;
    }
    playSequence();
  });
}

async function playRhythmTapDemoOnly(options = {}) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "rhythm-tap") return;
  if (state.exam?.active && !options.fromListenOnly && !tryConsumeExamReplay()) return;

  await ensureAudioReady();
  if (options.fromListenOnly && (!state.listenOnly?.active || state.listenOnly.token !== options.token || state.currentView !== "exercise" || state.currentExercise !== ex)) {
    return;
  }
  audioEngine.stopPlayback();
  state.rhythmTapSession = null;
  state.isPlaying = true;
  updatePlayButtonUI(true);

  const currentId = audioEngine.playbackId;
  const beatMs = 60000 / (state.activeBpm || 90);
  const beatsPerBar = ex.beatsPerBar;
  const barMs = beatsPerBar * beatMs;
  const audioEpochSec = getAudioClockSec();
  const baseAudioSec = audioEpochSec + 0.05;

  const events = [];
  for (let b = 0; b < beatsPerBar; b++) {
    events.push([Math.round(b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.92 : 0.7]);
  }
  for (let b = 0; b < beatsPerBar; b++) {
    events.push([Math.round(barMs + b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.55 : 0.36]);
  }
  ex.tapSlots.forEach((slot, beatIdx) => {
    slot.cell.offsets.forEach(off => {
      events.push([Math.round(barMs + (beatIdx + off) * beatMs), "clave", 0.96]);
    });
  });

  audioEngine.playRhythmSequence(events, baseAudioSec);

  const padBtn = document.getElementById("rhythmTapPadBtn");
  const titleEl = document.getElementById("rhythmPadTitle");
  const subEl = document.getElementById("rhythmPadSub");
  padBtn?.classList.remove("is-ready", "is-hit");
  padBtn?.classList.add("is-counting");

  for (let b = 0; b < beatsPerBar; b++) {
    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      setCentralStageMode("stage-playing");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tr("NUR ANHÖREN • VORZÄHLER", "LISTEN ONLY • COUNT-IN");
      document.getElementById("stageMainText").textContent = `${b + 1}`;
      document.getElementById("stageFunctionText").textContent = tr("Gleich erklingt das Muster…", "Pattern coming up…");
      if (titleEl) titleEl.textContent = tf("Vorzähler: {n}", "Count-in: {n}", { n: b + 1 });
      if (subEl) subEl.textContent = tr("Nur anhören (ohne Eingabe)", "Listen only (no input)");
    }, 50 + Math.round(b * beatMs));

    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      for (let i = 0; i < beatsPerBar; i++) {
        document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === b);
      }
      document.getElementById("stageSubtext").textContent = tf("MUSTER • SCHLAG {n}/{tot}", "PATTERN • BEAT {n}/{tot}", { n: b + 1, tot: beatsPerBar });
      document.getElementById("stageMainText").textContent = ex.tapSlots[b].cell.short;
      document.getElementById("stageFunctionText").textContent = tr("Hör dir den Rhythmus in Ruhe ein.", "Internalize the rhythm calmly.");
      if (titleEl) titleEl.textContent = tf("Muster: Schlag {n}", "Pattern: Beat {n}", { n: b + 1 });
    }, 50 + Math.round(barMs + b * beatMs));
  }

  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== currentId) return;
    stopPlayback();
    handleListenOnlyPromptEnded(ex);
  }, 50 + Math.round(2 * barMs + 140));
}

function handleRhythmTapInput(overrideRelMs = null, inputPoint = null) {
  const session = state.rhythmTapSession;
  const ex = state.currentExercise;
  if (!session || session.ended || session.phase !== "listen" || !ex || ex.type !== "rhythm-tap") {
    return null;
  }
  const tapPoint = (inputPoint && Number.isFinite(inputPoint.x) && Number.isFinite(inputPoint.y))
    ? inputPoint
    : (typeof overrideRelMs === "number" ? null : getFreshPointerInputPoint());
  session.lastTapClientPoint = tapPoint || null;

  let relMs;
  if (typeof overrideRelMs === "number" && Number.isFinite(overrideRelMs)) {
    relMs = overrideRelMs;
  } else {
    const nowAudioSec = getAudioClockSec();
    if (Math.abs(nowAudioSec - session.audioEpochSec) > 0.005) {
      relMs = (nowAudioSec - session.playerBarAudioStartSec) * 1000;
    } else {
      relMs = Date.now() - session.playerBarWallStartMs;
    }
  }

  const roundedMs = Math.round(relMs);
  session.tapsMs.push(roundedMs);

  audioEngine.triggerPercussion("clave", null, 0.92);

  const padBtn = document.getElementById("rhythmTapPadBtn");
  const subEl = document.getElementById("rhythmPadSub");
  if (padBtn) {
    padBtn.classList.remove("is-hit");
    void padBtn.offsetWidth;
    padBtn.classList.add("is-hit");
    setTimeout(() => {
      padBtn.classList.remove("is-hit");
    }, 115);
  }
  if (subEl) {
    const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
    if (lang === "uk") {
      const n = session.tapsMs.length;
      const mod100 = n % 100;
      const mod10 = n % 10;
      const unit = (mod100 >= 11 && mod100 <= 19)
        ? "ударів"
        : (mod10 === 1 ? "удар" : (mod10 >= 2 && mod10 <= 4 ? "удари" : "ударів"));
      subEl.textContent = `${n} ${unit} записано`;
    } else if (lang === "pl") {
      const n = session.tapsMs.length;
      const mod100 = n % 100;
      const mod10 = n % 10;
      if (n === 1) {
        subEl.textContent = "1 uderzenie zapisane";
      } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
        subEl.textContent = `${n} uderzenia zapisane`;
      } else {
        subEl.textContent = `${n} uderzeń zapisanych`;
      }
    } else if (lang === "ur") {
      const n = session.tapsMs.length;
      subEl.textContent = n === 1 ? "1 تھاپ ریکارڈ ہوئی" : `${n} تھاپیں ریکارڈ ہوئیں`;
    } else if (lang === "fr") {
      subEl.textContent = `${session.tapsMs.length} ${session.tapsMs.length === 1 ? "frappe enregistrée" : "frappes enregistrées"}`;
    } else if (lang === "en") {
      subEl.textContent = `${session.tapsMs.length} ${session.tapsMs.length === 1 ? "tap" : "taps"} recorded`;
    } else {
      subEl.textContent = `${session.tapsMs.length} ${session.tapsMs.length === 1 ? "Schlag" : "Schläge"} erfasst`;
    }
  }
  return roundedMs;
}

function finishRhythmTapRound() {
  const session = state.rhythmTapSession;
  const ex = state.currentExercise;
  if (!session || session.ended || !ex || ex.type !== "rhythm-tap") return null;

  session.ended = true;
  session.phase = "done";
  state.isPlaying = false;

  const res = evaluateRhythmTaps(session.expectedEvents, session.tapsMs, ex.toleranceMs);
  ex.tapEvaluated = true;
  ex.lastEvaluation = res;
  state.exerciseSolved = true;
  ex.isSolved = true;

  if (state.exam?.active) {
    handleExamRhythmTapFinished(ex, session, res);
    return res;
  }

  const padBtn = document.getElementById("rhythmTapPadBtn");
  padBtn?.classList.remove("is-counting", "is-ready", "is-hit");

  for (let i = 0; i < ex.beatsPerBar; i++) {
    const card = document.getElementById(`barCard_${i}`);
    if (!card) continue;
    card.classList.remove("bar-active", "rhythm-blind", "melody-slot-pending", "rhythm-tap-exact", "rhythm-tap-close", "rhythm-tap-missed");
    const lblEl = card.querySelector(".bar-label");
    const beatEvents = res.expResults.filter(r => r.beatIdx === i);

    if (beatEvents.length === 0) {
      const hitDuringRest = res.extraTapsMs.some(
        t => t >= i * session.beatMs - 60 && t < (i + 1) * session.beatMs - 60
      );
      card.classList.add(hitDuringRest ? "rhythm-tap-missed" : "rhythm-tap-exact");
      if (lblEl) lblEl.textContent = hitDuringRest ? tr("Stille!", "Rest!") : tr("✓ Pause", "✓ Rest");
    } else if (beatEvents.some(r => r.status === "missed")) {
      card.classList.add("rhythm-tap-missed");
      if (lblEl) lblEl.textContent = tr("Daneben", "Missed");
    } else if (beatEvents.some(r => r.status === "close")) {
      card.classList.add("rhythm-tap-close");
      const firstDiff = beatEvents.find(r => r.diffMs !== null)?.diffMs ?? 0;
      if (lblEl) lblEl.textContent = `~ ${firstDiff > 0 ? "+" : ""}${firstDiff}ms`;
    } else {
      card.classList.add("rhythm-tap-exact");
      if (lblEl) lblEl.textContent = tr("✓ Exakt", "✓ Exact");
    }
  }

  const totalExpected = session.expectedEvents.length;
  const hitCount = res.exactCount + res.closeCount;
  const badge = document.getElementById("targetBarBadge");
  if (badge) badge.textContent = res.passed ? tr("Treffer ✓", "Hit ✓") : tr("Nochmal!", "Try Again!");

  const streakRes = res.passed
    ? recordExerciseStreakSuccess(ex)
    : (resetExerciseStreakOnAttempt(ex), { count: 0, isMilestone: false });

  if (document.getElementById("centralStageCard")) {
    const tapPadBtn = document.getElementById("rhythmTapPadBtn");
    const tapCelebratePoint = session.lastTapClientPoint || null;
    if (res.passed && res.closeCount === 0 && res.extraCount === 0) {
      setCentralStageMode("stage-playing");
      updateStageMascot("happy");
      triggerCelebrationFeedback(tapPadBtn, {
        isMilestone: streakRes.isMilestone,
        stageBurst: !tapPadBtn,
        inputPoint: tapCelebratePoint
      });
      document.getElementById("stageSubtext").textContent = tr("PERFEKT GETROFFEN!", "NAILED IT!");
      document.getElementById("stageMainText").textContent = `${res.exactCount}/${totalExpected}`;
      document.getElementById("stageFunctionText").textContent =
        tf("Durchschnitt {avg} (Toleranz ±{tol} ms)", "Average {avg} (tolerance ±{tol} ms)", {
          avg: res.avgDiffMs !== null ? `${res.avgDiffMs > 0 ? "+" : ""}${res.avgDiffMs} ms` : "0 ms",
          tol: ex.toleranceMs
        });
    } else if (res.passed) {
      setCentralStageMode("stage-playing");
      updateStageMascot("happy");
      triggerCelebrationFeedback(tapPadBtn, {
        isMilestone: streakRes.isMilestone,
        stageBurst: !tapPadBtn,
        inputPoint: tapCelebratePoint
      });
      document.getElementById("stageSubtext").textContent = tr("SAUBER IM TAKT!", "SOLID TIMING!");
      document.getElementById("stageMainText").textContent = `${hitCount}/${totalExpected}`;
      document.getElementById("stageFunctionText").textContent =
        tf("{exact} exakt, {close} knapp • Avg {avg} ms", "{exact} exact, {close} close • Avg {avg} ms", {
          exact: res.exactCount,
          close: res.closeCount,
          avg: `${res.avgDiffMs > 0 ? "+" : ""}${res.avgDiffMs ?? 0}`
        });
    } else {
      setCentralStageMode("stage-wrong");
      updateStageMascot("thinking");
      document.getElementById("stageSubtext").textContent = tr("NOCHMAL VERSUCHEN", "TRY AGAIN");
      document.getElementById("stageMainText").textContent = tf("{hit}/{tot} Treffer", "{hit}/{tot} hits", { hit: hitCount, tot: totalExpected });
      document.getElementById("stageFunctionText").textContent =
        tf("Verfehlt: {missed} • Extraschläge: {extra} (Toleranz ±{tol} ms)", "Missed: {missed} • Extra taps: {extra} (tolerance ±{tol} ms)", {
          missed: res.missedCount,
          extra: res.extraCount,
          tol: ex.toleranceMs
        });
    }
  }

  const titleEl = document.getElementById("rhythmPadTitle");
  const subEl = document.getElementById("rhythmPadSub");
  if (titleEl) {
    titleEl.textContent = res.passed
      ? tf("Sauber! {hit}/{tot} Treffer", "Clean! {hit}/{tot} hits", { hit: hitCount, tot: totalExpected })
      : tf("Knapp ({hit}/{tot}) – nochmal tippen", "Close ({hit}/{tot}) — tap again", { hit: hitCount, tot: totalExpected });
  }
  if (subEl) {
    subEl.textContent = res.passed && state.settings.rhythmTapAutoNext
      ? tr("Nächste Runde startet gleich…", "Next round starting soon…")
      : tr("Tippe das Pad oder „▶ Abspielen“", "Tap the pad or press “▶ Play”");
  }

  updatePlayButtonUI(false);

  if (res.passed && state.settings.rhythmTapAutoNext) {
    const finishPlaybackId = audioEngine.playbackId;
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== finishPlaybackId) return;
      if (state.currentView !== "exercise" || state.settings.mode !== "rhythm-tap") return;
      generateExercise();
      playSequence();
    }, 1350);
  }

  return res;
}

function unlockWebAudioSync() {
  try {
    if (typeof Tone === "undefined") return;
    const ctx = typeof Tone.getContext === "function" ? Tone.getContext() : null;
    const rawCtx = ctx?.rawContext || ctx?._context || Tone.context?.rawContext || Tone.context?._context;
    if (rawCtx && rawCtx.state === "suspended" && typeof rawCtx.resume === "function") {
      Promise.resolve(rawCtx.resume()).catch(() => {});
    }
    if (typeof Tone.start === "function") {
      Promise.resolve(Tone.start()).catch(() => {});
    }
  } catch (_) {}
}

async function ensureAudioReady() {
  unlockWebAudioSync();
  const initialMixer = audioEngine.preparePromise ? null : state.mixer;
  const pianoPrefs = getActivePianoSoundSettings();
  const droneMix = getActiveDroneMixSettings();
  audioEngine?.setPianoSoundProfile?.(pianoPrefs.character, pianoPrefs.reverb);
  audioEngine?.setDroneIntervalMix?.(droneMix.pad, droneMix.tone);
  await audioEngine.init(state.master.volume, state.master.muted, initialMixer);
  audioEngine.setMasterVolume(state.master.volume, state.master.muted);
  audioEngine.setMixerGains(state.mixer);
  audioEngine?.setPianoSoundProfile?.(pianoPrefs.character, pianoPrefs.reverb);
  audioEngine?.setDroneIntervalMix?.(droneMix.pad, droneMix.tone);
}

/**
 * Spielt in der Melodieübung einen einzelnen Ton ab (standardmäßig den aktuell gesuchten Ton),
 * ohne die bisherigen Fortschritte zurückzusetzen.
 */
async function repeatMelodySlotTone(slotIdx = null) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "melody") return;
  if (state.exam?.active && !tryConsumeExamReplay()) return;
  if (state.listenOnly?.active) {
    setListenOnlyMode(false, { keepPlayback: true });
  }
  const slots = ex.melodySlots || [];
  const tot = slots.length || 4;
  const idx = typeof slotIdx === "number" ? slotIdx : ex.melodyStep;
  const slot = slots[idx];
  if (!slot) return;

  await ensureAudioReady();
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  slots.forEach((_, i) => {
    document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === idx);
  });

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode(slot.solved ? "stage-playing" : "stage-target");
    updateStageMascot(slot.solved ? "happy" : "question");
    document.getElementById("stageSubtext").textContent = tf("TON {n} VON {tot} (EINZELN)", "NOTE {n} OF {tot} (ISOLATED)", { n: idx + 1, tot });
    document.getElementById("stageMainText").textContent = (slot.pitchSolved || slot.solved)
      ? getSolfegeDisplayLabel(slot.syllable)
      : "?";
    document.getElementById("stageFunctionText").textContent = slot.solved
      ? tf("Gelöster Ton ({note})", "Solved note ({note})", { note: slot.germanNote })
      : (ex.melodyStyle === "dictation"
          ? tr("Höre Tonhöhe & Länge relativ zum Puls!", "Listen to pitch & duration against the beat!")
          : tr("Welche Solfège-Stufe hörst du hier?", "Which Solfège degree do you hear here?"));
  }

  const beatSec = 60 / (state.activeBpm || 90);
  const beatMs = Math.round(beatSec * 1000);
  const durBeats = Number(slot.durationBeats) || 2;
  const playDurSec = Math.max(0.18, durBeats * beatSec * 0.88);
  const usePulseCue = ex.melodyStyle !== "steady" && (Boolean(state.settings.melodyPulse) || ex.melodyStyle === "dictation");
  const singlePlaybackId = audioEngine.playbackId;

  if (usePulseCue) {
    const baseClock = getAudioClockSec() + 0.04;
    const cueClicks = [
      [0, "accent", 0.56],
      [beatMs, "tick", 0.44]
    ];
    if (durBeats >= 1.5) cueClicks.push([beatMs * 2, "tick", 0.36]);
    audioEngine.playRhythmSequence(cueClicks, baseClock);

    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== singlePlaybackId) return;
      audioEngine.playStep([slot.noteName], playDurSec, null, "melody-note", {
        atTime: baseClock + beatSec,
        velocity: slot.velocity || 0.9
      });
    }, Math.max(0, beatMs - 85));

    const totalWaitMs = Math.max(820, Math.round((1 + durBeats) * beatMs + 160));
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== singlePlaybackId) return;
      document.getElementById(`barCard_${idx}`)?.classList.remove("bar-active");
      if (!slot.solved && !state.melodyCompleted && !state.isPlaying && !state.listenOnly?.active) {
        showAwaitingAnswerStage(ex);
      }
    }, totalWaitMs);
  } else {
    audioEngine.playStep([slot.noteName], Math.max(0.32, playDurSec), null, "interval");
    const waitMs = Math.max(680, Math.round(durBeats * beatMs + 120));
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== singlePlaybackId) return;
      document.getElementById(`barCard_${idx}`)?.classList.remove("bar-active");
      if (!slot.solved && !state.melodyCompleted && !state.isPlaying && !state.listenOnly?.active) {
        showAwaitingAnswerStage(ex);
      }
    }, waitMs);
  }
}

/**
 * Spielt je nach Modus die gezielte Einzel-Referenz / Hörhilfe nochmal ab
 */
function applyProdEqNoiseComparisonUI(ex, isBypassed) {
  if (!ex || ex.type !== "prod-eq-noise") return;
  const bypass = Boolean(isBypassed);
  ex.noiseBypassed = bypass;

  document.getElementById("barCard_0")?.classList.toggle("bar-active", bypass);
  document.getElementById("barCard_1")?.classList.toggle("bar-active", !bypass);

  const refBtn = document.getElementById("tonicRefBtn");
  const refLbl = document.getElementById("tonicRefLabel");
  if (refBtn) refBtn.classList.toggle("btn-active", bypass);
  if (refLbl) refLbl.textContent = bypass ? tr("Flat: AN", "Flat: ON") : tr("Flat-Bypass", "Flat Bypass");

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode(bypass ? "stage-playing" : "stage-target");
    updateStageMascot(bypass ? "listening" : "question");
    document.getElementById("stageSubtext").textContent = bypass
      ? tr("FLAT / BYPASS (ORIGINAL)", "FLAT / BYPASS (ORIGINAL)")
      : tf("EQ-BOOST AKTIV ({info})", "EQ BOOST ACTIVE ({info})", { info: ex.keyName });
    document.getElementById("stageMainText").textContent = bypass ? "Flat" : "?";
    document.getElementById("stageFunctionText").textContent = bypass
      ? tr("Unbearbeitetes Rosa Rauschen – schalte zurück auf Ziel-EQ für den Kontrast", "Unprocessed pink noise — switch back to Target EQ to compare")
      : tr("Dauerbetrieb: Höre das angehobene Band heraus oder tippe „Flat-Bypass“", "Continuous playback: spot the boosted band or toggle “Flat Bypass”");
  }
}

async function triggerProdEqNoiseComparison(forceBypass = null) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "prod-eq-noise") return;
  await ensureAudioReady();

  if (state.isPlaying && audioEngine.activeNoiseSession) {
    const nextBypass = forceBypass === null ? !ex.noiseBypassed : Boolean(forceBypass);
    audioEngine.setProductionNoiseBypass(nextBypass);
    applyProdEqNoiseComparisonUI(ex, nextBypass);
    return;
  }

  // Wenn aktuell gestoppt: Ziel-EQ startet nahtlos im Dauerbetrieb; Flat spielt eine saubere Kurz-Referenz
  if (forceBypass === false) {
    playSequence();
    return;
  }

  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);
  applyProdEqNoiseComparisonUI(ex, true);
  document.getElementById("barCard_1")?.classList.remove("bar-active");

  audioEngine.playProductionNoiseEQ({ mode: "flat-only", durationSec: 1.4 });
  const flatId = audioEngine.playbackId;
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== flatId || state.isPlaying) return;
    document.getElementById("barCard_0")?.classList.remove("bar-active");
    document.getElementById("tonicRefBtn")?.classList.remove("btn-active");
    const refLbl = document.getElementById("tonicRefLabel");
    if (refLbl) refLbl.textContent = tr("Flat-Bypass", "Flat Bypass");
    ex.noiseBypassed = false;
    resetCentralStage();
  }, 1450);
}

function playModeExercisePattern(ex, modeDef, startDelayMs = 0) {
  if (!ex || !modeDef) return 0;
  const preferFlat = ["dorian", "phrygian", "mixolydian", "aeolian", "locrian", "harm_minor"].includes(modeDef.key)
    || [58, 63, 65].includes(ex.rootMidi);
  const toNote = (semi) => midiToNote(ex.rootMidi + semi, preferFlat);
  const currentId = audioEngine.playbackId;

  if (ex.type === "modes-cadence") {
    const chords = modeDef.vampOffsets || [[0, 4, 7], [5, 9, 12]];
    const stepMs = 880;
    chords.forEach((offsets, idx) => {
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== currentId) return;
        const notes = offsets.map(toNote);
        const bassNote = midiToNote(ex.rootMidi + offsets[0] - 12, preferFlat);
        audioEngine.playStep(notes, idx === chords.length - 1 ? 0.95 : 0.78, bassNote, "cadence");
      }, startDelayMs + idx * stepMs);
    });
    return chords.length * stepMs + 220;
  }

  const seqOffsets = ex.type === "modes-char"
    ? (modeDef.charTurn || modeDef.intervals)
    : (modeDef.intervals || [0, 2, 4, 5, 7, 9, 11, 12]);
  const stepMs = ex.type === "modes-char" ? 390 : 340;
  const totalNotesMs = seqOffsets.length * stepMs + 520;

  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== currentId) return;
    audioEngine.playStep([], (totalNotesMs + 200) / 1000, ex.anchorBass, "cadence");
  }, startDelayMs);

  seqOffsets.forEach((semi, idx) => {
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== currentId) return;
      const isLast = idx === seqOffsets.length - 1;
      audioEngine.playStep([toNote(semi)], isLast ? 0.92 : 0.36, null, "interval");
    }, startDelayMs + idx * stepMs);
  });

  return totalNotesMs;
}

function scheduleSolfegeTargetLoopTick(expectedEx, expectedPlaybackId, delayMs = SOLFEGE_LOOP_INTERVAL_MS) {
  audioEngine.registerTimer(() => {
    if (
      !state.isPlaying ||
      audioEngine.playbackId !== expectedPlaybackId ||
      state.currentExercise !== expectedEx ||
      state.solfegeAnswered ||
      !state.settings.loop
    ) {
      return;
    }
    audioEngine.playStep([expectedEx.targetItem.noteName], 1.1, null, "interval");
    scheduleSolfegeTargetLoopTick(expectedEx, expectedPlaybackId, SOLFEGE_LOOP_INTERVAL_MS);
  }, delayMs);
}

async function startSolfegeTargetLoop(playImmediately = true) {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "solfege" || state.solfegeAnswered) return;
  if (!audioEngine.isInitialized) await ensureAudioReady();
  audioEngine.stopPlayback();
  ex.solfegePromptPlayed = true;
  state.isPlaying = true;
  updatePlayButtonUI(true);

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-target");
    updateStageMascot("question");
    document.getElementById("stageSubtext").textContent = tr("GESUCHTER TON", "TARGET NOTE");
    document.getElementById("stageMainText").textContent = "?";
    document.getElementById("stageFunctionText").textContent = tr("Welche Stufe (Do bis Do) hörst du?", "Which scale degree (Do to Do) do you hear?");
  }

  const currentId = audioEngine.playbackId;
  if (playImmediately) {
    audioEngine.playStep([ex.targetItem.noteName], 1.1, null, "interval");
  }
  scheduleSolfegeTargetLoopTick(ex, currentId, SOLFEGE_LOOP_INTERVAL_MS);
}

/**
 * Spielt in den Kadenzübungen die aktuell abgefragte Akkordstufe isoliert erneut ab.
 */
async function repeatCadenceTargetChord() {
  const ex = state.currentExercise;
  if (!ex || ex.type !== "cadence" || !ex.targetItem) return;
  if (state.exam?.active && !tryConsumeExamReplay()) return;
  if (!audioEngine.isInitialized) await ensureAudioReady();
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  const totalBars = ex.bars?.length ?? 4;
  for (let i = 0; i < totalBars; i++) {
    document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === ex.targetIndex);
  }

  if (document.getElementById("centralStageCard") && !ex.isSolved) {
    setCentralStageMode("stage-target");
    updateStageMascot("question");
    document.getElementById("stageSubtext").textContent = tf("TAKT {n} • GESUCHT", "BAR {n} • TARGET", { n: ex.targetIndex + 1 });
    document.getElementById("stageMainText").textContent = "?";
    document.getElementById("stageFunctionText").textContent = tr("Welche Stufe erklingt jetzt?", "Which chord degree plays now?");
  }

  const playId = audioEngine.playbackId;
  audioEngine.playStep(ex.targetItem.notes, 1.2, ex.targetItem.bass, "cadence");
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== playId) return;
    document.getElementById(`barCard_${ex.targetIndex}`)?.classList.remove("bar-active");
    if (!ex.isSolved && !state.isPlaying && !state.listenOnly?.active) {
      showAwaitingAnswerStage(ex);
    }
  }, 1200);
}

async function repeatSolfegeTargetTone() {
  const ex = state.currentExercise;
  if (!ex) return;
  if (ex.type === "cadence") {
    await repeatCadenceTargetChord();
    return;
  }
  if (ex.type === "melody") {
    await repeatMelodySlotTone(ex.melodyStep);
    return;
  }
  if (ex.type === "rhythm-dictation") {
    await repeatRhythmDictationBeat(ex.rhythmStep);
    return;
  }
  if (ex.type === "rhythm-tap") {
    await playRhythmTapDemoOnly();
    return;
  }
  if (ex.type !== "solfege") return;
  if (state.exam?.active && !tryConsumeExamReplay()) return;
  await ensureAudioReady();
  if (state.settings.loop && !state.solfegeAnswered) {
    await startSolfegeTargetLoop(true);
    return;
  }
  audioEngine.stopPlayback();
  state.isPlaying = false;
  if (!state.solfegeAnswered) updatePlayButtonUI(false);

  if (document.getElementById("centralStageCard") && !state.solfegeAnswered) {
    setCentralStageMode("stage-target");
    updateStageMascot("question");
    document.getElementById("stageSubtext").textContent = tr("GESUCHTER TON", "TARGET NOTE");
    document.getElementById("stageMainText").textContent = "?";
    document.getElementById("stageFunctionText").textContent = tr("Welche Stufe (Do bis Do) hörst du?", "Which scale degree (Do to Do) do you hear?");
  }

  const playId = audioEngine.playbackId;
  audioEngine.playStep([ex.targetItem.noteName], 0.95, null, "interval");
  audioEngine.registerTimer(() => {
    if (audioEngine.playbackId !== playId) return;
    if (!state.solfegeAnswered && !state.isPlaying && !state.listenOnly?.active) {
      showAwaitingAnswerStage(ex);
    }
  }, 950);
}

const LISTEN_ONLY_REVEAL_DELAY_MS = 2000;
const LISTEN_ONLY_POST_REVEAL_MS = 1350;
const LISTEN_ONLY_MULTI_POST_REVEAL_MS = 1800;
const LISTEN_ONLY_EQ_NOISE_LISTEN_MS = 1600;
const LISTEN_ONLY_NOTATION_KEY_REVEAL_DELAY_MS = 950;
const LISTEN_ONLY_NOTATION_ADVANCE_DELAY_MS = 1150;
const LISTEN_ONLY_LOOP_MODE_EXCLUSIONS = new Set(["melody", "rhythm-dictation", "rhythm-tap"]);

function cancelListenOnlyTimers() {
  if (!state.listenOnly) return;
  state.listenOnly.token += 1;
  if (state.listenOnly.timerId !== null) {
    clearTimeout(state.listenOnly.timerId);
    state.listenOnly.timerId = null;
  }
  state.listenOnly.phase = "idle";
}

function isCurrentExerciseSolved(ex = state.currentExercise) {
  if (!ex) return false;
  return Boolean(
    state.exerciseSolved ||
    ex.isSolved ||
    state.solfegeAnswered ||
    state.melodyCompleted ||
    state.rhythmDictationCompleted ||
    ex.tapEvaluated
  );
}

function clearTransientExerciseWrongMarks() {
  document.querySelectorAll("#degreeButtonsGrid .degree-btn").forEach(el => {
    el.classList.remove("btn-wrong");
  });
  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-wrong", "key-correct");
  });
  document.getElementById("notationStaffPanel")?.classList.remove("is-wrong", "is-correct");
  document.getElementById("feedbackContainer")?.classList.add("hidden");
  state.lastAnswerWasWrong = false;
  state.wrongAnswerData = null;
}

function syncListenOnlyUI() {
  const btn = document.getElementById("listenOnlyBtn");
  const lbl = document.getElementById("listenOnlyBtnLabel");
  const active = Boolean(state.listenOnly?.active);
  if (btn) {
    btn.classList.toggle("btn-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
    btn.title = active
      ? tr("Nur-Hören-Modus läuft (Tippen zum Beenden)", "Listen-Only Mode active (tap to stop)")
      : tr("Nur-Hören-Modus ein-/ausschalten", "Toggle Listen-Only Mode");
  }
  if (lbl) {
    lbl.textContent = tr("Nur Hören", "Listen Only");
  }
  syncAnswerSoundToggleUI();
  updatePlayButtonUI(state.isPlaying);
}

function scheduleListenOnlyStep(fn, delayMs, expectedToken) {
  if (!state.listenOnly) return;
  if (state.listenOnly.timerId !== null) {
    clearTimeout(state.listenOnly.timerId);
    state.listenOnly.timerId = null;
  }
  state.listenOnly.timerId = setTimeout(() => {
    state.listenOnly.timerId = null;
    if (!state.listenOnly?.active || state.listenOnly.token !== expectedToken || state.currentView !== "exercise") {
      return;
    }
    fn(expectedToken);
  }, Math.max(0, Math.round(delayMs)));
}

function scheduleNextListenOnlyExercise(delayMs, token) {
  scheduleListenOnlyStep(() => {
    generateExercise();
    startListenOnlyCycle();
  }, delayMs, token);
}

function revealMelodyListenOnly(ex, token) {
  state.listenOnly.phase = "reveal";
  state.melodyCompleted = true;
  state.exerciseSolved = true;
  ex.isSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;

  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-wrong", "key-correct", "key-pending-pair");
  });

  const slots = ex.melodySlots || [];
  const tot = slots.length || 4;

  slots.forEach((slot, idx) => {
    slot.pitchSolved = true;
    slot.rhythmSolved = true;
    slot.solved = true;
    syncMelodySlotCardUI(ex, idx);
    document.getElementById(`barCard_${idx}`)?.classList.add("tile-selected-pulse");
    const keyEl = document.getElementById(`solfegeKey_${slot.midi}`) ||
      document.getElementById(`solfegeKey_${slot.playedMidi}`) ||
      document.querySelector(`#solfegeKeyboardWrap [data-syllable="${slot.syllable}"]`);
    keyEl?.classList.add("key-correct");
  });

  syncMelodyHeaderAndPromptUI(ex);
  if (ex.melodyStyle === "dictation") {
    renderMelodyRhythmPicker(ex);
  }

  setCentralStageMode("stage-playing");
  updateStageMascot("happy");
  document.getElementById("stageSubtext").textContent = tf("MELODIE GELÖST! ({tot}/{tot})", "MELODY SOLVED! ({tot}/{tot})", { tot });
  document.getElementById("stageMainText").textContent = slots.map(s => getSolfegeDisplayLabel(s.syllable)).join(" – ");
  document.getElementById("stageFunctionText").textContent = tr("Nächste Aufgabe wird geladen…", "Loading next exercise…");
  updatePlayButtonUI(false);

  scheduleNextListenOnlyExercise(LISTEN_ONLY_MULTI_POST_REVEAL_MS, token);
}

function revealRhythmDictationListenOnly(ex, token) {
  state.listenOnly.phase = "reveal";
  state.rhythmDictationCompleted = true;
  state.exerciseSolved = true;
  ex.isSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;

  document.querySelectorAll("#degreeButtonsGrid .degree-btn").forEach(el => {
    el.classList.remove("btn-wrong", "btn-correct");
  });

  ex.rhythmSlots.forEach((slot, idx) => {
    slot.solved = true;
    const card = document.getElementById(`barCard_${idx}`);
    if (card) {
      card.className = "bar-card melody-slot-solved rhythm-slot-clickable tile-selected-pulse";
      const romanEl = card.querySelector(".bar-roman");
      const lblEl = card.querySelector(".bar-label");
      if (romanEl) romanEl.innerHTML = getRhythmCellSVG(slot.cellKey, 40, 22);
      if (lblEl) lblEl.textContent = `✓ ${slot.cell.short}`;
    }
    const matchingChoice = Array.from(document.querySelectorAll("#degreeButtonsGrid .degree-btn"))
      .find(el => el.dataset.choice === slot.cellKey);
    matchingChoice?.classList.add("btn-correct");
  });

  const badge = document.getElementById("targetBarBadge");
  if (badge) badge.textContent = tr("4 / 4 gelöst ✓", "4 / 4 solved ✓");
  const promptEl = document.getElementById("inputPromptText");
  if (promptEl) promptEl.textContent = tr("Alle 4 Zählzeiten gelöst – weiter geht’s!", "All 4 beats solved — moving on!");

  setCentralStageMode("stage-playing");
  updateStageMascot("happy");
  document.getElementById("stageSubtext").textContent = tr("RHYTHMUS GELÖST! (4/4)", "RHYTHM SOLVED! (4/4)");
  document.getElementById("stageMainText").textContent = ex.rhythmSlots.map(s => s.cell.short).join(" • ");
  document.getElementById("stageFunctionText").textContent = tr("Nächste Aufgabe wird geladen…", "Loading next exercise…");
  updatePlayButtonUI(false);

  scheduleNextListenOnlyExercise(LISTEN_ONLY_MULTI_POST_REVEAL_MS, token);
}

function revealRhythmTapListenOnly(ex, token) {
  state.listenOnly.phase = "reveal";
  ex.tapEvaluated = true;
  ex.isSolved = true;
  state.exerciseSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;

  const padBtn = document.getElementById("rhythmTapPadBtn");
  padBtn?.classList.remove("is-counting", "is-ready", "is-hit");
  const padTitle = document.getElementById("rhythmPadTitle");
  const padSub = document.getElementById("rhythmPadSub");
  if (padTitle) padTitle.textContent = tr("Rhythmus-Muster ✓", "Rhythm Pattern ✓");
  if (padSub) padSub.textContent = tr("Nächste Runde startet gleich…", "Next round starting soon…");

  for (let i = 0; i < ex.beatsPerBar; i++) {
    const card = document.getElementById(`barCard_${i}`);
    if (!card) continue;
    card.classList.remove("bar-active", "rhythm-blind", "melody-slot-pending", "rhythm-tap-exact", "rhythm-tap-close", "rhythm-tap-missed");
    card.classList.add("rhythm-tap-exact");
    const lbl = card.querySelector(".bar-label");
    if (lbl && ex.tapSlots[i]?.cell) {
      lbl.textContent = `✓ ${ex.tapSlots[i].cell.short}`;
    }
  }

  const badge = document.getElementById("targetBarBadge");
  if (badge) badge.textContent = tr("Muster gezeigt ✓", "Pattern shown ✓");

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    document.getElementById("stageSubtext").textContent = tr("MUSTER • NUR HÖREN", "PATTERN • LISTEN ONLY");
    document.getElementById("stageMainText").textContent = ex.tapSlots.map(s => s.cell.short).join(" • ");
    document.getElementById("stageFunctionText").textContent = tr("Nächste Aufgabe wird geladen…", "Loading next exercise…");
  }
  updatePlayButtonUI(false);

  scheduleNextListenOnlyExercise(LISTEN_ONLY_MULTI_POST_REVEAL_MS, token);
}

function revealListenOnlyAnswer(token) {
  const ex = state.currentExercise;
  if (!ex || !state.listenOnly?.active || state.listenOnly.token !== token || state.currentView !== "exercise") {
    return;
  }
  if (isCurrentExerciseSolved(ex)) {
    scheduleNextListenOnlyExercise(LISTEN_ONLY_POST_REVEAL_MS, token);
    return;
  }

  if (ex.type === "solfege") {
    const target = ex.targetItem;
    const keyBtn = document.getElementById(`solfegeKey_${target.midi}`) ||
      document.querySelector(`#solfegeKeyboardWrap [data-syllable="${target.syllable}"]`);
    handleSolfegeKeyClick({ midi: target.midi, syllable: target.syllable }, keyBtn, { fromListenOnly: true });
    return;
  }

  if (ex.type === "melody") {
    revealMelodyListenOnly(ex, token);
    return;
  }

  if (ex.type === "rhythm-dictation") {
    revealRhythmDictationListenOnly(ex, token);
    return;
  }

  if (ex.type === "rhythm-tap") {
    revealRhythmTapListenOnly(ex, token);
    return;
  }

  if (isNotationMode(ex.type)) {
    revealNotationListenOnly(ex, token);
    return;
  }

  const targetKey = ex.targetItem?.key;
  const targetBtn = Array.from(document.querySelectorAll("#degreeButtonsGrid .degree-btn"))
    .find(el => el.dataset.choice === targetKey) || null;
  handleAnswer(targetKey, targetBtn, { fromListenOnly: true });
}

function handleListenOnlyPromptEnded(expectedEx) {
  if (!state.listenOnly?.active || state.currentView !== "exercise") return;
  if (!expectedEx || state.currentExercise !== expectedEx) return;
  if (state.listenOnly.phase !== "playing") return;

  const token = state.listenOnly.token;
  state.listenOnly.phase = "think";

  if (document.getElementById("centralStageCard") && !isCurrentExerciseSolved(expectedEx)) {
    setCentralStageMode("stage-target");
    updateStageMascot("question");
    document.getElementById("stageSubtext").textContent = tr("NUR HÖREN • DENKPAUSE", "LISTEN ONLY • THINK");
    document.getElementById("stageMainText").textContent = "?";
    document.getElementById("stageFunctionText").textContent =
      expectedEx.type === "prod-eq-noise"
        ? tr("EQ-Boost läuft – Auflösung folgt gleich…", "EQ boost playing — showing answer shortly…")
        : tr("Lösung wird gleich angezeigt…", "Showing answer shortly…");
  }

  scheduleListenOnlyStep(() => {
    if (state.currentExercise !== expectedEx) return;
    revealListenOnlyAnswer(token);
  }, LISTEN_ONLY_REVEAL_DELAY_MS, token);
}

async function startListenOnlyCycle() {
  if (!state.listenOnly?.active || state.currentView !== "exercise") return;
  cancelListenOnlyTimers();
  const token = state.listenOnly.token;
  state.listenOnly.phase = "playing";

  if (isCurrentExerciseSolved()) {
    generateExercise();
  } else {
    clearTransientExerciseWrongMarks();
    syncListenOnlyUI();
  }

  const targetEx = state.currentExercise;
  await ensureAudioReady();
  if (!state.listenOnly?.active || state.listenOnly.token !== token || state.currentView !== "exercise") {
    return;
  }
  if (state.currentExercise !== targetEx) return;

  await playSequence();
}

function setListenOnlyMode(enabled, options = {}) {
  const nextActive = Boolean(enabled);
  if (!state.listenOnly) {
    state.listenOnly = { active: false, token: 0, timerId: null, phase: "idle" };
  }
  if (nextActive === state.listenOnly.active && !options.restart) {
    syncListenOnlyUI();
    return;
  }

  cancelListenOnlyTimers();

  if (!nextActive || state.currentView !== "exercise") {
    state.listenOnly.active = false;
    clearTransientExerciseWrongMarks();
    document.getElementById("inlineNotationPacePopover")?.classList.add("hidden");
    document.getElementById("moduleNotationPaceBtn")?.classList.remove("chip-open");
    syncListenOnlyUI();
    if (!options.keepPlayback) {
      stopPlayback();
    }
    return;
  }

  state.listenOnly.active = true;
  if (isNotationMode(state.currentExercise?.type)) {
    syncNotationPaceUI();
    document.getElementById("inlineNotationKeyPopover")?.classList.add("hidden");
    document.getElementById("moduleNotationKeyBtn")?.classList.remove("chip-open");
    document.getElementById("inlineNotationPacePopover")?.classList.remove("hidden");
    document.getElementById("moduleNotationPaceBtn")?.classList.add("chip-open");
  }
  if (state.settings.loop && !LISTEN_ONLY_LOOP_MODE_EXCLUSIONS.has(state.settings.mode)) {
    state.settings.loop = false;
    document.getElementById("loopToggleBtn")?.classList.remove("btn-active");
  }
  syncListenOnlyUI();
  startListenOnlyCycle();
}

async function playSequence(options = {}) {
  if (state.exam?.active && !tryConsumeExamReplay({ isInitialAuto: Boolean(options.examAutoStart) })) {
    return;
  }
  const listenOnlyCycleToken = state.listenOnly?.active ? state.listenOnly.token : null;
  await ensureAudioReady();
  if (listenOnlyCycleToken !== null && (!state.listenOnly?.active || state.listenOnly.token !== listenOnlyCycleToken || state.currentView !== "exercise")) {
    return;
  }
  audioEngine.stopPlayback();
  state.rhythmTapSession = null;
  state.isPlaying = true;
  updatePlayButtonUI(true);

  const ex = state.currentExercise;
  const currentId = audioEngine.playbackId;
  const keepPromptLooping = () => Boolean(state.settings.loop && !state.listenOnly?.active);

  // Notation (Notenlesen):
  // - Im Nur-Hören-Modus: linke Note markieren & kurz Zeit zum Mitlesen lassen
  // - Im Prüfungs-Modus: nur Schlüssel-Ankerton spielen (niemals Zielton vorspielen!)
  // - Im freien Training: als optionale Hörhilfe die aktuelle Zielnote links anspielen
  if (isNotationMode(ex?.type)) {
    const target = ex.targetItem;
    const clefId = target?.clefId || ex.baseClefId || "treble";
    if (state.listenOnly?.active) {
      const targetNoteName = target?.noteName || "C4";
      setCentralStageMode("stage-target");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tr("NUR HÖREN • NOTENLESEN", "LISTEN ONLY • SIGHT-READ");
      document.getElementById("stageMainText").textContent = getLocalizedNotationClefName(clefId);
      document.getElementById("stageFunctionText").textContent = tr("Höre den Ton & schau auf die erste Note links…", "Hear the tone & read the leftmost note…");
      if (shouldPlayCorrectAnswerAudio()) {
        audioEngine.playStep([targetNoteName], getNotationListenOnlyToneDurationSec(), null, "interval");
      }
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        state.isPlaying = false;
        updatePlayButtonUI(false);
        if (!state.listenOnly?.active || state.listenOnly.token !== listenOnlyCycleToken || state.currentView !== "exercise" || state.currentExercise !== ex) {
          return;
        }
        revealNotationListenOnly(ex, listenOnlyCycleToken);
      }, getNotationListenOnlyKeyRevealDelayMs());
      return;
    }

    const previewNote = state.exam?.active
      ? (NOTATION_CLEFS[clefId]?.anchorNote || "G4")
      : (target?.noteName || "C4");
    audioEngine.playStep([previewNote], 0.95, null, "interval");
    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      state.isPlaying = false;
      updatePlayButtonUI(false);
    }, 980);
    return;
  }

  // Produktion 1: Isolierte Sinus-Frequenz erkennen
  if (ex.type === "prod-tone") {
    function runProdToneLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

      document.getElementById("barCard_0")?.classList.add("bar-active");
      setCentralStageMode("stage-target");
      updateStageMascot("question");
      document.getElementById("stageSubtext").textContent = tf("SINUSTON • STUFE {lvl}", "SINE WAVE • LEVEL {lvl}", { lvl: ex.level });
      document.getElementById("stageMainText").textContent = "?";
      document.getElementById("stageFunctionText").textContent =
        tr("Höre genau hin – zu welchem Frequenzband gehört dieser Ton?", "Listen closely — which frequency band does this tone belong to?");

      audioEngine.playProductionTone(ex.targetItem.freqHz, 1.45);

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        document.getElementById("barCard_0")?.classList.remove("bar-active");
        if (keepPromptLooping()) {
          audioEngine.registerTimer(() => {
            if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
            runProdToneLoopCycle();
          }, 380);
        } else {
          completePromptPlayback(ex);
        }
      }, 1520);
    }

    runProdToneLoopCycle();
    return;
  }

  // Produktion 2: EQ-Boost im Pink Noise (läuft konstant bis zur richtigen Antwort oder Stopp; fließender Live-Bypass)
  if (ex.type === "prod-eq-noise") {
    applyProdEqNoiseComparisonUI(ex, false);
    audioEngine.startProductionNoiseContinuous({
      freqHz: ex.targetItem.freqHz,
      q: ex.q,
      gainDb: ex.boostDb,
      startBypassed: false,
      maxDurationSec: 120,
      onAutoStop: () => {
        if (state.isPlaying && state.currentExercise?.type === "prod-eq-noise") {
          if (!state.listenOnly?.active) {
            completePromptPlayback(ex);
          } else {
            stopPlayback();
          }
        }
      }
    });
    if (state.listenOnly?.active) {
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        handleListenOnlyPromptEnded(ex);
      }, LISTEN_ONLY_EQ_NOISE_LISTEN_MS);
    }
    return;
  }

  // Tonleitern & Modi: Phase 1 Anker-Quinte -> Phase 2 Modus-Tonleiter / Charakterton / Modaler Vamp
  if (ex.type.startsWith("modes-")) {
    function runModeLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

      document.getElementById("barCard_0")?.classList.add("bar-active");
      document.getElementById("barCard_1")?.classList.remove("bar-active");
      setCentralStageMode("stage-playing");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tf("PHASE 1 • {k}", "PHASE 1 • {k}", { k: ex.keyName.toUpperCase() });
      document.getElementById("stageMainText").textContent = `${ex.rootLabel}5`;
      document.getElementById("stageFunctionText").textContent =
        tr("Neutrale Grundton-Quinte (ohne Terz) – gleich erklingt der Modus…", "Neutral open fifth (no 3rd) — target mode coming up…");

      audioEngine.playStep(ex.anchorNotes, 0.95, null, "cadence");

      const phase2DelayMs = 1620;
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        document.getElementById("barCard_0")?.classList.remove("bar-active");
        document.getElementById("barCard_1")?.classList.add("bar-active");
        setCentralStageMode("stage-target");
        updateStageMascot("question");
        document.getElementById("stageSubtext").textContent =
          ex.type === "modes-cadence" ? tr("MODALER VAMP", "MODAL VAMP") : (ex.type === "modes-char" ? tr("CHARAKTERTON", "COLOR TONE") : tr("KIRCHENTONART", "SCALE MODE"));
        document.getElementById("stageMainText").textContent = "?";
        document.getElementById("stageFunctionText").textContent =
          ex.type === "modes-cadence"
            ? tr("Welcher modale Klang prägt diese Akkordfolge?", "Which modal sound colors this progression?")
            : tr("Welche Tonleiter bzw. Klangfarbe hörst du?", "Which mode or tonal color do you hear?");
      }, phase2DelayMs);

      const patternDurMs = playModeExercisePattern(ex, ex.targetItem, phase2DelayMs);
      const cycleEndMs = phase2DelayMs + patternDurMs + 220;

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        document.getElementById("barCard_0")?.classList.remove("bar-active");
        document.getElementById("barCard_1")?.classList.remove("bar-active");
        if (keepPromptLooping()) {
          audioEngine.registerTimer(() => {
            if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
            runModeLoopCycle();
          }, 420);
        } else {
          completePromptPlayback(ex);
        }
      }, cycleEndMs);
    }

    runModeLoopCycle();
    return;
  }

  // 1. Taktart & Metrum (Rhythmus)
  if (ex.type === "rhythm-meter") {
    function runMeterLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      const { events, barMs, totalMs } = buildRhythmMeterEvents(ex.targetItem.key, state.activeBpm, 2, false);
      const audioEpochSec = getAudioClockSec();
      const baseAudioSec = audioEpochSec + 0.04;
      audioEngine.playRhythmSequence(events, baseAudioSec);

      for (let bar = 0; bar < 2; bar++) {
        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
          for (let i = 0; i < 2; i++) {
            document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === bar);
          }
          setCentralStageMode("stage-target");
          updateStageMascot("question");
          document.getElementById("stageSubtext").textContent = tf("METRUM • TAKT {n}/2", "METER • BAR {n}/2", { n: bar + 1 });
          document.getElementById("stageMainText").textContent = "?";
          document.getElementById("stageFunctionText").textContent = tr("Achte auf die betonte Eins – welche Taktart erklingt?", "Feel the accented downbeat — which meter do you hear?");
        }, 40 + Math.round(bar * barMs));
      }

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        if (keepPromptLooping()) {
          runMeterLoopCycle();
        } else {
          completePromptPlayback(ex);
        }
      }, 40 + Math.round(totalMs));
    }

    runMeterLoopCycle();
    return;
  }

  // 2. Rhythmus-Diktat (4 Zählzeiten nach 1 Takt Vorzähler)
  if (ex.type === "rhythm-dictation") {
    const beatMs = 60000 / (state.activeBpm || 90);
    const barMs = 4 * beatMs;
    const events = [];

    for (let b = 0; b < 4; b++) {
      events.push([Math.round(b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.92 : 0.7]);
    }
    for (let b = 0; b < 4; b++) {
      events.push([Math.round(barMs + b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.48 : 0.34]);
    }
    ex.rhythmSlots.forEach((slot, idx) => {
      slot.cell.offsets.forEach(off => {
        events.push([Math.round(barMs + (idx + off) * beatMs), "clave", 0.96]);
      });
    });

    const baseAudioSec = getAudioClockSec() + 0.04;
    audioEngine.playRhythmSequence(events, baseAudioSec);

    ex.rhythmSlots.forEach((_, i) => {
      document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
    });

    for (let b = 0; b < 4; b++) {
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("VORZÄHLER ({n}/4)", "COUNT-IN ({n}/4)", { n: b + 1 });
        document.getElementById("stageMainText").textContent = `${b + 1}`;
        document.getElementById("stageFunctionText").textContent = tf("Tempo {bpm} BPM – gleich folgt die Clave", "Tempo {bpm} BPM — clave entering next", { bpm: state.activeBpm });
      }, 40 + Math.round(b * beatMs));
    }

    ex.rhythmSlots.forEach((slot, idx) => {
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        for (let i = 0; i < ex.rhythmSlots.length; i++) {
          document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === idx);
        }
        setCentralStageMode(slot.solved ? "stage-playing" : "stage-target");
        updateStageMascot(slot.solved ? "listening" : "question");
        document.getElementById("stageSubtext").textContent = tf("RHYTHMUS • SCHLAG {n}/4", "RHYTHM • BEAT {n}/4", { n: idx + 1 });
        document.getElementById("stageMainText").textContent = slot.solved ? slot.cell.short : "?";
        document.getElementById("stageFunctionText").textContent = slot.solved
          ? tf("Bereits gelöst ({lbl})", "Already solved ({lbl})", { lbl: slot.cell.label })
          : tr("Welcher Rhythmus-Baustein erklingt auf diesem Schlag?", "Which rhythm cell plays on this beat?");
      }, 40 + Math.round(barMs + idx * beatMs));
    });

    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      for (let i = 0; i < ex.rhythmSlots.length; i++) {
        document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
      }
      state.isPlaying = false;
      updatePlayButtonUI(false);

      if (state.listenOnly?.active) {
        handleListenOnlyPromptEnded(ex);
      } else if (!state.rhythmDictationCompleted) {
        showAwaitingAnswerStage(ex);
      }
    }, 40 + Math.round(2 * barMs + 80));

    return;
  }

  // 3. Rhythmus nachklopfen (Tap-Pad): 1 Takt Vorzähler -> 1 Takt Demo -> 1 Takt Nachklopfen (im Nur-Hören-Modus nur Demo)
  if (ex.type === "rhythm-tap") {
    if (state.listenOnly?.active) {
      await playRhythmTapDemoOnly({ fromListenOnly: true, token: state.listenOnly.token });
      return;
    }
    ex.tapEvaluated = false;
    ex.lastEvaluation = null;

    const beatMs = 60000 / (state.activeBpm || 90);
    const beatsPerBar = ex.beatsPerBar;
    const barMs = beatsPerBar * beatMs;
    const badge = document.getElementById("targetBarBadge");
    if (badge) badge.textContent = `${ex.meterKey} • ±${ex.toleranceMs} ms`;

    ex.tapSlots.forEach((slot, i) => {
      const card = document.getElementById(`barCard_${i}`);
      if (card) {
        card.className = `bar-card${ex.blind ? " melody-slot-pending" : ""}`;
        const lbl = card.querySelector(".bar-label");
        if (lbl) lbl.textContent = slot.cell.short;
      }
    });

    const events = [];
    // Takt 1: Vorzähler
    for (let b = 0; b < beatsPerBar; b++) {
      events.push([Math.round(b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.94 : 0.72]);
    }
    // Takt 2: Demo (leiser Referenz-Puls + Clave-Muster)
    for (let b = 0; b < beatsPerBar; b++) {
      events.push([Math.round(barMs + b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.55 : 0.36]);
    }
    const expectedEvents = [];
    ex.tapSlots.forEach((slot, beatIdx) => {
      slot.cell.offsets.forEach(off => {
        const relMs = Math.round((beatIdx + off) * beatMs);
        expectedEvents.push({ relMs, beatIdx, offset: off, cellKey: slot.cellKey });
        events.push([Math.round(barMs + relMs), "clave", 0.96]);
      });
    });
    // Takt 3: Eingabe-Phase (Klick nur wenn aktiviert und NICHT Blindflug)
    if (!ex.blind && state.settings.rhythmTapClick) {
      for (let b = 0; b < beatsPerBar; b++) {
        events.push([Math.round(2 * barMs + b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.65 : 0.48]);
      }
    }

    const audioEpochSec = getAudioClockSec();
    const baseAudioSec = audioEpochSec + 0.05;
    const wallEpochMs = Date.now();

    state.rhythmTapSession = {
      playbackId: currentId,
      phase: "counting",
      audioEpochSec: audioEpochSec,
      baseAudioSec: baseAudioSec,
      playerBarAudioStartSec: baseAudioSec + (2 * barMs) / 1000,
      playerBarWallStartMs: wallEpochMs + Math.round(50 + 2 * barMs),
      barMs: barMs,
      beatMs: beatMs,
      beatsPerBar: beatsPerBar,
      expectedEvents: expectedEvents,
      tapsMs: [],
      ended: false
    };

    audioEngine.playRhythmSequence(events, baseAudioSec);

    const padBtn = document.getElementById("rhythmTapPadBtn");
    const padTitle = document.getElementById("rhythmPadTitle");
    const padSub = document.getElementById("rhythmPadSub");
    padBtn?.classList.remove("is-ready", "is-hit");
    padBtn?.classList.add("is-counting");

    for (let b = 0; b < beatsPerBar; b++) {
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("VORZÄHLER • {m}", "COUNT-IN • {m}", { m: ex.meterKey });
        document.getElementById("stageMainText").textContent = `${b + 1}`;
        document.getElementById("stageFunctionText").textContent = tr("Merke dir den Puls – gleich folgt die Demo", "Lock into the pulse — demo coming up next");
        if (padTitle) padTitle.textContent = tf("Vorzähler: {n}", "Count-in: {n}", { n: b + 1 });
        if (padSub) padSub.textContent = tr("Noch warten – erst zuhören", "Wait — listen first");
      }, 50 + Math.round(b * beatMs));

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        if (state.rhythmTapSession?.playbackId === currentId) {
          state.rhythmTapSession.phase = "demo";
        }
        for (let i = 0; i < beatsPerBar; i++) {
          document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === b);
        }
        document.getElementById("stageSubtext").textContent = tf("VORSPIEL • SCHLAG {n}/{tot}", "DEMO • BEAT {n}/{tot}", { n: b + 1, tot: beatsPerBar });
        document.getElementById("stageMainText").textContent = ex.tapSlots[b].cell.short;
        document.getElementById("stageFunctionText").textContent = tr("Höre zu und bereite deinen Einsatz vor…", "Listen closely and get ready to tap…");
        if (padTitle) padTitle.textContent = tf("Demo: Schlag {n}", "Demo: Beat {n}", { n: b + 1 });
        if (padSub) padSub.textContent = tr("Danach sofort nachklopfen!", "Tap right back after this!");
      }, 50 + Math.round(barMs + b * beatMs));
    }

    // Leicht vorgezogener Start der „listen“-Phase (-140 ms vor Takt 3), damit minimal verfrühte Schläge auf die 1 zählen
    const listenGateDelayMs = Math.max(20, 50 + Math.round(2 * barMs - 140));
    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      if (state.rhythmTapSession?.playbackId === currentId) {
        state.rhythmTapSession.phase = "listen";
      }
      padBtn?.classList.remove("is-counting");
      padBtn?.classList.add("is-ready");
      if (padTitle) padTitle.textContent = ex.blind ? tr("Blindflug: Jetzt klopfen!", "Blind Mode: Tap Now!") : tr("Jetzt nachklopfen!", "Tap It Back Now!");
      if (padSub) padSub.textContent = tr("Tippe auf das Pad oder die Leertaste", "Tap the pad or press Spacebar");

      setCentralStageMode("stage-target");
      updateStageMascot("question");
      document.getElementById("stageSubtext").textContent = ex.blind ? tr("BLINDFLUG • DEIN EINSATZ!", "BLIND MODE • YOUR TURN!") : tr("DEIN EINSATZ!", "YOUR TURN!");
      document.getElementById("stageMainText").textContent = tr("Klopfen!", "Tap!");
      document.getElementById("stageFunctionText").textContent = ex.blind
        ? tr("Kein Klick, keine Anzeige – zähle im Kopf weiter!", "No click, no display — keep counting silently!")
        : tf("Klopfe das Muster im {m}-Takt nach.", "Tap the pattern back in {m} time.", { m: ex.meterKey });

      if (ex.blind) {
        for (let i = 0; i < beatsPerBar; i++) {
          const card = document.getElementById(`barCard_${i}`);
          card?.classList.remove("bar-active");
          card?.classList.add("rhythm-blind");
        }
      }
    }, listenGateDelayMs);

    if (!ex.blind) {
      for (let b = 0; b < beatsPerBar; b++) {
        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
          for (let i = 0; i < beatsPerBar; i++) {
            document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === b);
          }
        }, 50 + Math.round(2 * barMs + b * beatMs));
      }
    }

    const roundEndMs = 50 + Math.round(3 * barMs + ex.toleranceMs * 1.45);
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== currentId) return;
      finishRhythmTapRound();
    }, roundEndMs);

    return;
  }

  // 4. Groove, Offbeat & Mikro-Timing (Rhythmus)
  if (ex.type === "rhythm-groove") {
    function runGrooveLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      const { events, totalMs, barMs } = buildRhythmGrooveEvents(ex, null, state.activeBpm);
      const baseAudioSec = getAudioClockSec() + 0.04;
      audioEngine.playRhythmSequence(events, baseAudioSec);

      const barCount = ex.bars.length;
      for (let bar = 0; bar < barCount; bar++) {
        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
          for (let i = 0; i < barCount; i++) {
            document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === bar);
          }
          if (ex.grooveKind === "offbeat" && bar === 0) {
            setCentralStageMode("stage-playing");
            updateStageMascot("listening");
            document.getElementById("stageSubtext").textContent = tr("TAKT 1 • REFERENZ-PULS", "BAR 1 • REFERENCE PULSE");
            document.getElementById("stageMainText").textContent = "1–4";
            document.getElementById("stageFunctionText").textContent = tr("Spüre die Zählzeiten – gleich kommt der Cowbell-Akzent", "Feel the beats — cowbell accent coming in Bar 2");
          } else {
            setCentralStageMode("stage-target");
            updateStageMascot("question");
            document.getElementById("stageSubtext").textContent =
              ex.grooveKind === "micro" ? tr("MIKRO-TIMING", "MICRO-TIMING") : (ex.grooveKind === "offbeat" ? tr("TAKT 2 • AKZENT", "BAR 2 • ACCENT") : tf("GROOVE • TAKT {n}/2", "GROOVE • BAR {n}/2", { n: bar + 1 }));
            document.getElementById("stageMainText").textContent = "?";
            document.getElementById("stageFunctionText").textContent =
              ex.grooveKind === "micro"
                ? tr("Höre genau auf die Snare (2 & 4): zu früh, exakt oder zu spät?", "Focus on the snare (2 & 4): ahead, in the pocket, or laid back?")
                : (ex.grooveKind === "offbeat"
                    ? tr("Wo sitzt der Cowbell-Schlag (1, 1-und … 4-und)?", "Where does the cowbell accent fall (1, 1-and … 4-and)?")
                    : tr("Welcher Groove-Charakter erklingt?", "Which groove feel do you hear?"));
          }
        }, 40 + Math.round(bar * barMs));
      }

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        if (keepPromptLooping()) {
          runGrooveLoopCycle();
        } else {
          completePromptPlayback(ex);
        }
      }, 40 + Math.round(totalMs));
    }

    runGrooveLoopCycle();
    return;
  }

  // Spezieller Ablauf für Melodieübungen (4-Akkord-Kadenz bleibt stabil, danach je nach Stil):
  // 1. Kontext-Kadenz (I - vi - IV - V)
  // 2. Im Basis-Stil: Pause + 4 halbe Noten; im Takt-/Diktat-Stil: 1 Takt Einzähler + samplegenaue rhythmische Phrasen-Noten
  if (ex.type === "melody") {
    const bpm = state.activeBpm || 90;
    const beatSec = 60 / bpm;
    const beatMs = Math.round(beatSec * 1000);
    const chordSec = beatSec * 1.45;
    const chordMs = Math.round(chordSec * 1000);
    const totalChords = ex.cadenceBars.length;
    const slots = ex.melodySlots || [];
    const tot = slots.length || 4;
    const isSteady = ex.melodyStyle === "steady";
    const isDictation = ex.melodyStyle === "dictation";
    const pulseEnabled = Boolean(state.settings.melodyPulse);

    slots.forEach((_, i) => {
      document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
    });

    ex.cadenceBars.forEach((bar, index) => {
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("KONTEXT-KADENZ ({n}/4)", "CONTEXT CADENCE ({n}/4)", { n: index + 1 });
        document.getElementById("stageMainText").textContent = bar.symbol;
        document.getElementById("stageFunctionText").textContent = bar.label;

        audioEngine.playStep(bar.notes, chordSec * 0.88, bar.bass, "cadence");
      }, index * chordMs);
    });

    if (isSteady) {
      const pauseAfterCadenceMs = Math.round(beatSec * 1.35 * 1000);
      const melodyStartMs = totalChords * chordMs + pauseAfterCadenceMs;
      const halfNoteSec = 2 * beatSec;
      const halfNoteMs = Math.round(halfNoteSec * 1000);
      const halfPlaySec = Math.max(0.32, halfNoteSec * 0.88);

      if (pulseEnabled) {
        const steadyClicks = [];
        for (let b = 0; b < tot * 2; b++) {
          steadyClicks.push([
            melodyStartMs + b * beatMs,
            b % 4 === 0 ? "accent" : "tick",
            b % 4 === 0 ? 0.52 : 0.34
          ]);
        }
        audioEngine.playRhythmSequence(steadyClicks, getAudioClockSec() + 0.04);
      }

      slots.forEach((slot, idx) => {
        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

          for (let i = 0; i < slots.length; i++) {
            document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === idx);
          }

          setCentralStageMode(slot.solved ? "stage-playing" : "stage-target");
          updateStageMascot(slot.solved ? "listening" : "question");
          document.getElementById("stageSubtext").textContent = tf("MELODIE • TON {n}/{tot}", "MELODY • NOTE {n}/{tot}", { n: idx + 1, tot });
          document.getElementById("stageMainText").textContent = slot.solved ? getSolfegeDisplayLabel(slot.syllable) : "?";
          document.getElementById("stageFunctionText").textContent = slot.solved
            ? tf("Bereits gelöst ({note})", "Already solved ({note})", { note: slot.germanNote })
            : tf("Halbe Note ({bpm} BPM) • Höre genau hin", "Half note ({bpm} BPM) • Listen closely", { bpm });

          audioEngine.playStep([slot.noteName], halfPlaySec, null, "interval");
        }, melodyStartMs + idx * halfNoteMs);
      });

      const melodyEndMs = melodyStartMs + slots.length * halfNoteMs;
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        for (let i = 0; i < slots.length; i++) {
          document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
        }
        state.isPlaying = false;
        updatePlayButtonUI(false);

        if (state.listenOnly?.active) {
          handleListenOnlyPromptEnded(ex);
        } else if (!state.melodyCompleted) {
          showAwaitingAnswerStage(ex);
        }
      }, melodyEndMs);

      return;
    }

    // Rhythmische Phrase oder Melodiediktat: 1 Takt Einzähler + samplegenaue WebAudio-Planung
    const beatsPerBar = ex.beatsPerBar || 4;
    const totalMelodyBeats = ex.totalMelodyBeats || 4;
    const pauseAfterCadenceMs = Math.round(beatSec * 0.9 * 1000);
    const countInStartMs = totalChords * chordMs + pauseAfterCadenceMs;
    const melodyStartMs = countInStartMs + beatsPerBar * beatMs;
    const baseAudioTime = getAudioClockSec() + 0.04;
    const lookaheadMs = 95;

    const pulseEvents = [];
    for (let b = 0; b < beatsPerBar; b++) {
      const clickDelayMs = countInStartMs + b * beatMs;
      pulseEvents.push([clickDelayMs, b === 0 ? "accent" : "tick", b === 0 ? 0.68 : 0.44]);
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("EINZÄHLER • {meter}", "COUNT-IN • {meter}", { meter: ex.meterKey || "4/4" });
        document.getElementById("stageMainText").textContent = String(b + 1);
        document.getElementById("stageFunctionText").textContent = tr("Fühle den Puls… gleich startet die Melodie", "Feel the pulse… melody enters on 1");
      }, clickDelayMs);
    }

    if (pulseEnabled) {
      const totalClicks = Math.ceil(totalMelodyBeats);
      for (let b = 0; b < totalClicks; b++) {
        pulseEvents.push([
          melodyStartMs + b * beatMs,
          b % beatsPerBar === 0 ? "accent" : "tick",
          b % beatsPerBar === 0 ? 0.56 : 0.36
        ]);
      }
    }

    audioEngine.playRhythmSequence(pulseEvents, baseAudioTime);

    slots.forEach((slot, idx) => {
      const offsetMs = Math.round((Number(slot.beatOffset) || 0) * beatMs);
      const noteDelayMs = melodyStartMs + offsetMs;
      const timerAudioDelayMs = Math.max(0, noteDelayMs - lookaheadMs);
      const targetAudioTime = baseAudioTime + noteDelayMs / 1000;
      const durSec = Math.max(0.16, (Number(slot.durationBeats) || 1) * beatSec * 0.86);
      const rDef = getLocalizedMelodyRhythmValue(slot.rhythmKey);

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        audioEngine.playStep([slot.noteName], durSec, null, "melody-note", {
          atTime: targetAudioTime,
          velocity: slot.velocity || 0.88
        });
      }, timerAudioDelayMs);

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        for (let i = 0; i < slots.length; i++) {
          document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === idx);
        }
        setCentralStageMode(slot.solved ? "stage-playing" : "stage-target");
        updateStageMascot(slot.solved ? "listening" : "question");
        document.getElementById("stageSubtext").textContent = tf("MELODIE • TON {n}/{tot}", "MELODY • NOTE {n}/{tot}", { n: idx + 1, tot });
        document.getElementById("stageMainText").textContent = (slot.pitchSolved || slot.solved)
          ? getSolfegeDisplayLabel(slot.syllable)
          : "?";
        document.getElementById("stageFunctionText").textContent = slot.solved
          ? tf("Bereits gelöst ({note})", "Already solved ({note})", { note: slot.germanNote })
          : (isDictation
              ? tf("Melodiediktat ({bpm} BPM) • Höre Tonhöhe & Länge", "Melody Dictation ({bpm} BPM) • Hear pitch & length", { bpm })
              : tf("{rhythm} ({bpm} BPM) • Höre genau hin", "{rhythm} ({bpm} BPM) • Listen closely", { rhythm: rDef.label, bpm }));
      }, noteDelayMs);
    });

    const melodyEndMs = melodyStartMs + Math.round(totalMelodyBeats * beatMs + 140);
    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      for (let i = 0; i < slots.length; i++) {
        document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
      }
      state.isPlaying = false;
      updatePlayButtonUI(false);

      if (state.listenOnly?.active) {
        handleListenOnlyPromptEnded(ex);
      } else if (!state.melodyCompleted) {
        showAwaitingAnswerStage(ex);
      }
    }, melodyEndMs);

    return;
  }

  // Spezieller Ablauf für Solfège (abhängig vom eingestellten Tempo state.activeBpm!):
  // 1. Ruhige Kadenz (I - vi - IV - V) -> 2. Deutliche Pause -> 3. Einzelner Zielton (optional alle 3 s im Loop)
  if (ex.type === "solfege") {
    ex.solfegePromptPlayed = false;
    const beatSec = 60 / state.activeBpm;
    // Jeder Akkord der Kadenz dauert 1,45 Schläge (bei 90 BPM ca. 970 ms pro Akkord)
    const chordSec = beatSec * 1.45;
    const chordMs = Math.round(chordSec * 1000);
    // Nach dem Ausklingen des 4. Akkords folgt eine deutliche Pause (bei 90 BPM ca. 900 ms echte Stille)
    const pauseAfterCadenceMs = Math.round(beatSec * 1.35 * 1000);
    const totalChords = ex.bars.length;

    ex.bars.forEach((bar, index) => {
      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

        for (let i = 0; i < totalChords; i++) {
          document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === index);
        }

        setCentralStageMode("stage-playing");
        updateStageMascot("listening");
        document.getElementById("stageSubtext").textContent = tf("KONTEXT-KADENZ ({n}/4)", "CONTEXT CADENCE ({n}/4)", { n: index + 1 });
        document.getElementById("stageMainText").textContent = bar.symbol;
        document.getElementById("stageFunctionText").textContent = bar.label;

        audioEngine.playStep(bar.notes, chordSec * 0.88, bar.bass, "cadence");
      }, index * chordMs);
    });

    // Nach deutlicher Pause: Einzelner abgefragter Ton (bei Loop alle 3 s nur Zielton wiederholen)
    const targetDelayMs = totalChords * chordMs + pauseAfterCadenceMs;
    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

      ex.solfegePromptPlayed = true;
      for (let i = 0; i < totalChords; i++) {
        document.getElementById(`barCard_${i}`)?.classList.remove("bar-active");
      }

      setCentralStageMode("stage-target");
      updateStageMascot("question");
      document.getElementById("stageSubtext").textContent = tr("GESUCHTER TON", "TARGET NOTE");
      document.getElementById("stageMainText").textContent = "?";
      document.getElementById("stageFunctionText").textContent = tr("Tippe die Stufe auf der Klaviatur an!", "Tap the scale degree on the keyboard!");

      audioEngine.playStep([ex.targetItem.noteName], 1.1, null, "interval");

      if (keepPromptLooping() && !state.solfegeAnswered) {
        scheduleSolfegeTargetLoopTick(ex, currentId, SOLFEGE_LOOP_INTERVAL_MS);
      } else {
        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
          if (keepPromptLooping() && !state.solfegeAnswered) {
            scheduleSolfegeTargetLoopTick(ex, currentId, Math.max(0, SOLFEGE_LOOP_INTERVAL_MS - 1150));
          } else {
            state.isPlaying = false;
            updatePlayButtonUI(false);
            if (state.listenOnly?.active) {
              handleListenOnlyPromptEnded(ex);
            } else if (!state.solfegeAnswered) {
              showAwaitingAnswerStage(ex);
            }
          }
        }, 1150);
      }
    }, targetDelayMs);

    return;
  }

  // Ablauf für Kadenzen, harmonische Intervalle & Akkordtypen — sowie schnelles, tempo-gesteuertes Spiel für melodische Intervalle
  if (ex.type === "interval-melodic" || ex.type === "interval-melodic-down") {
    function runMelodicIntervalLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      const { stepMs, note1DurSec, note2DurSec, cycleMs } = getMelodicIntervalTiming(state.activeBpm);

      ex.bars.forEach((bar, index) => {
        const delay = index === 0 ? 0 : stepMs;
        const noteDur = index === 0 ? note1DurSec : note2DurSec;

        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

          for (let i = 0; i < ex.bars.length; i++) {
            document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === index);
          }

          if (index === ex.targetIndex) {
            setCentralStageMode("stage-target");
            updateStageMascot("question");
            document.getElementById("stageSubtext").textContent = tf("TON {n} • GESUCHT", "NOTE {n} • TARGET", { n: index + 1 });
            document.getElementById("stageMainText").textContent = "?";
            document.getElementById("stageFunctionText").textContent = tr("Welches Intervall erklingt jetzt?", "Which interval plays now?");
          } else {
            setCentralStageMode("stage-playing");
            updateStageMascot("listening");
            document.getElementById("stageSubtext").textContent = tf("TON 1 • {bpm} BPM", "NOTE 1 • {bpm} BPM", { bpm: state.activeBpm });
            document.getElementById("stageMainText").textContent = bar.symbol;
            document.getElementById("stageFunctionText").textContent = bar.label;
          }

          audioEngine.playStep(bar.notes, noteDur, null, "cadence");
        }, delay);
      });

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        if (keepPromptLooping()) {
          runMelodicIntervalLoopCycle();
        } else {
          completePromptPlayback(ex);
        }
      }, cycleMs);
    }

    runMelodicIntervalLoopCycle();
    return;
  }

  if (ex.type === "interval-drone") {
    function runDroneIntervalLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      const { delayMs, pianoDurSec, padDurSec, cycleMs } = getDroneIntervalTiming(state.activeBpm);

      document.getElementById("barCard_0")?.classList.add("bar-active");
      document.getElementById("barCard_1")?.classList.remove("bar-active");
      setCentralStageMode("stage-playing");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tf("FLÄCHE • {bpm} BPM", "PAD • {bpm} BPM", { bpm: state.activeBpm });
      document.getElementById("stageMainText").textContent = ex.bars[0]?.symbol || "?";
      document.getElementById("stageFunctionText").textContent =
        tr("Streicher-Fläche hält den Grundton – gleich folgt das Klavier…", "Strings pad sustains the root — piano pitch coming up…");

      audioEngine.playDroneIntervalCue(ex.padNotes, [ex.targetItem.targetNote], {
        delayMs,
        padDurSec,
        pianoDurSec,
        onTargetStart: () => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
          document.getElementById("barCard_0")?.classList.remove("bar-active");
          document.getElementById("barCard_1")?.classList.add("bar-active");
          setCentralStageMode("stage-target");
          updateStageMascot("question");
          document.getElementById("stageSubtext").textContent = tr("KLAVIER • GESUCHT", "PIANO • TARGET");
          document.getElementById("stageMainText").textContent = "?";
          document.getElementById("stageFunctionText").textContent =
            tr("Welches Intervall erklingt über der Grundton-Fläche?", "Which interval plays over the root pad?");
        }
      });

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        document.getElementById("barCard_0")?.classList.remove("bar-active");
        document.getElementById("barCard_1")?.classList.remove("bar-active");
        if (keepPromptLooping()) {
          runDroneIntervalLoopCycle();
        } else {
          completePromptPlayback(ex);
        }
      }, cycleMs);
    }

    runDroneIntervalLoopCycle();
    return;
  }

  if (isChordArpeggioMode(ex.type)) {
    function runChordArpeggioLoopCycle() {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      const rawNotes = Array.isArray(ex.targetItem?.notes) ? ex.targetItem.notes : [];
      const seqNotes = ex.type === "chord-arp-down" ? [...rawNotes].reverse() : rawNotes;
      const { stepMs, noteDurSec, lastNoteDurSec, cycleMs } = getChordArpeggioPromptTiming(
        seqNotes.length,
        state.activeBpm
      );
      const dirArrow = ex.type === "chord-arp-down" ? "↘" : "↗";

      seqNotes.forEach((note, idx) => {
        const delay = idx * stepMs;
        const noteDur = idx === seqNotes.length - 1 ? lastNoteDurSec : noteDurSec;

        audioEngine.registerTimer(() => {
          if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
          for (let i = 0; i < ex.bars.length; i++) {
            document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === 0);
          }
          setCentralStageMode("stage-target");
          updateStageMascot("question");
          document.getElementById("stageSubtext").textContent = tf("ARPEGGIO {dir} • {bpm} BPM", "ARPEGGIO {dir} • {bpm} BPM", {
            dir: dirArrow,
            bpm: state.activeBpm
          });
          document.getElementById("stageMainText").textContent = "?";
          document.getElementById("stageFunctionText").textContent = tr("Welcher Akkord erklingt jetzt?", "Which chord quality plays now?");

          audioEngine.playStep([note], noteDur, null, "cadence");
        }, delay);
      });

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
        if (keepPromptLooping()) {
          runChordArpeggioLoopCycle();
        } else {
          completePromptPlayback(ex);
        }
      }, cycleMs);
    }

    runChordArpeggioLoopCycle();
    return;
  }

  // Ablauf für Kadenzen (kompakter Legato-Wechsel), harmonische Intervalle & Akkordtypen
  const totalBars = ex.bars.length;
  let stepScheduleMs;
  let stepDursSec;
  let totalDurationMs;

  if (ex.type === "cadence") {
    const cadTiming = getCadenceStepTiming(state.activeBpm, state.activeTimeSig);
    stepScheduleMs = ex.bars.map((_, index) => index * cadTiming.stepMs);
    stepDursSec = ex.bars.map((_, index) =>
      index === totalBars - 1 ? cadTiming.finalDurSec : cadTiming.stepDurSec
    );
    totalDurationMs = Math.max(0, totalBars - 1) * cadTiming.stepMs + cadTiming.finalHoldMs;
  } else {
    const beatSec = 60 / state.activeBpm;
    let beatsPerBar = 4;
    if (state.activeTimeSig === "3/4") beatsPerBar = 3;
    if (state.activeTimeSig === "6/8") beatsPerBar = 3;
    if (state.activeTimeSig === "odd") beatsPerBar = 5;

    const barSec = beatsPerBar * beatSec;
    const barMs = barSec * 1000;
    stepScheduleMs = ex.bars.map((_, index) => index * barMs);
    stepDursSec = ex.bars.map(() => barSec * 0.9);
    totalDurationMs = totalBars * barMs;
  }

  function runLoopCycle() {
    if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

    ex.bars.forEach((bar, index) => {
      const delay = stepScheduleMs[index];
      const stepDur = stepDursSec[index];

      audioEngine.registerTimer(() => {
        if (!state.isPlaying || audioEngine.playbackId !== currentId) return;

        for (let i = 0; i < totalBars; i++) {
          document.getElementById(`barCard_${i}`)?.classList.toggle("bar-active", i === index);
        }

        if (index === ex.targetIndex) {
          setCentralStageMode("stage-target");
          updateStageMascot("question");
          document.getElementById("stageSubtext").textContent = tf("TAKT {n} • GESUCHT", "BAR {n} • TARGET", { n: index + 1 });
          document.getElementById("stageMainText").textContent = "?";
          document.getElementById("stageFunctionText").textContent = ex.type === "cadence"
            ? tr("Welche Stufe erklingt jetzt?", "Which chord degree plays now?")
            : (ex.type === "chord-inversions"
                ? tr("Welcher Akkordton liegt im Bass?", "Which chord tone is in the bass?")
                : (isChordQualityMode(ex.type)
                    ? tr("Welcher Akkord erklingt jetzt?", "Which chord quality plays now?")
                    : tr("Welches Intervall erklingt jetzt?", "Which interval plays now?")));
        } else {
          setCentralStageMode("stage-playing");
          updateStageMascot("listening");
          document.getElementById("stageSubtext").textContent = tf("TAKT {n}", "BAR {n}", { n: index + 1 });
          document.getElementById("stageMainText").textContent = bar.symbol;
          document.getElementById("stageFunctionText").textContent = bar.label;
        }

        audioEngine.playStep(bar.notes, stepDur, bar.bass, ex.type === "interval-harmonic" ? "interval-harmonic" : "cadence");

      }, delay);
    });

    audioEngine.registerTimer(() => {
      if (!state.isPlaying || audioEngine.playbackId !== currentId) return;
      if (keepPromptLooping()) {
        runLoopCycle();
      } else {
        completePromptPlayback(ex);
      }
    }, totalDurationMs);
  }

  runLoopCycle();
}

function stopPlayback(options = {}) {
  state.isPlaying = false;
  state.rhythmTapSession = null;
  audioEngine.stopPlayback();
  updatePlayButtonUI(false);

  if (state.currentExercise?.type === "prod-eq-noise") {
    state.currentExercise.noiseBypassed = false;
    document.getElementById("tonicRefBtn")?.classList.remove("btn-active");
    const refLbl = document.getElementById("tonicRefLabel");
    if (refLbl) refLbl.textContent = tr("Flat-Bypass", "Flat Bypass");
  }

  const padBtn = document.getElementById("rhythmTapPadBtn");
  if (padBtn) {
    padBtn.classList.remove("is-counting", "is-ready", "is-hit");
    const padTitle = document.getElementById("rhythmPadTitle");
    const padSub = document.getElementById("rhythmPadSub");
    if (padTitle && !state.currentExercise?.tapEvaluated) {
      padTitle.textContent = tr("Bereit zum Klopfen", "Ready to Tap");
    }
    if (padSub && !state.currentExercise?.tapEvaluated) {
      padSub.textContent = tr("Tippe „▶ Abspielen“ oder drücke die Leertaste", "Tap “▶ Play” or press Spacebar");
    }
  }

  const tapFinished = state.currentExercise?.type === "rhythm-tap" && state.currentExercise?.tapEvaluated;
  if (!options?.preserveStage && !state.solfegeAnswered && !state.melodyCompleted && !state.rhythmDictationCompleted && !tapFinished) {
    resetCentralStage();
  }
  const totalBars = state.currentExercise?.bars?.length ?? 4;
  for (let i = 0; i < totalBars; i++) {
    const card = document.getElementById(`barCard_${i}`);
    if (card) {
      card.classList.remove("bar-active", "rhythm-blind");
    }
  }
}

function updatePlayButtonUI(isPlaying) {
  const btn = document.getElementById("playBtn");
  if (!btn) return;
  if (state.exam?.active && state.exam.currentAnswered && state.exam.feedbackMode === "instant") {
    const isLast = state.exam.currentIdx >= state.exam.totalQuestions - 1;
    btn.innerHTML = isLast ? tr("Auswertung →", "Results →") : tr("Nächste Frage →", "Next Question →");
    btn.classList.remove("btn-stop");
    return;
  }
  if (state.listenOnly?.active && state.currentView === "exercise") {
    btn.innerHTML = tr("■ Stopp", "■ Stop");
    btn.classList.add("btn-stop");
    return;
  }
  if (state.solfegeAnswered && !isPlaying && state.settings.mode === "solfege") {
    btn.innerHTML = tr("Nächste Abfrage ⏭", "Next Prompt ⏭");
    btn.classList.remove("btn-stop");
    return;
  }
  if (isPlaying) {
    btn.innerHTML = tr("■ Stopp", "■ Stop");
    btn.classList.add("btn-stop");
  } else if (isNotationMode(state.currentExercise?.type)) {
    btn.innerHTML = state.exam?.active
      ? tr("▶ Ankerton", "▶ Anchor Pitch")
      : tr("▶ Ton anhören", "▶ Hear Note");
    btn.classList.remove("btn-stop");
  } else {
    btn.innerHTML = tr("▶ Abspielen", "▶ Play");
    btn.classList.remove("btn-stop");
  }
}

function syncMixerSliders() {
  const map = { Piano: "piano", Guitar: "guitar", Strings: "strings", Brass: "brass", Voice: "voice", Bass: "bass" };
  Object.entries(map).forEach(([label, key]) => {
    const val = Number.isFinite(state.mixer[key]) ? state.mixer[key] : 0;
    const slider = document.getElementById(`mix${label}`);
    const valEl = document.getElementById(`val${label}`);
    if (slider) slider.value = val;
    if (valEl) valEl.textContent = `${Math.round(val * 100)}%`;
  });
}

/**
 * Markiert Nutzeraktivität für die automatische Inaktivitäts-Abschaltung des Session-Timers.
 */
function markSessionActivity() {
  if (typeof state === "undefined") return;
  const now = Date.now();
  if (state.sessionTimer) {
    state.sessionTimer.lastActivityWallMs = now;
    state.sessionTimer.hiddenSinceWallMs = null;
  }
  if (state.breakReminder) {
    state.breakReminder.lastActivityWallMs = now;
    if (state.currentView === "exercise" && !state.breakReminder.promptOpen && state.breakReminder.pausedOnBreak) {
      state.breakReminder.pausedOnBreak = false;
      startBreakReminderTicker();
    }
  }
}

function getLevelDisplayForMix(mode, level) {
  if (mode === "melody") {
    return (getLocalizedMelodyRange(level)?.label) || "Do–Fa";
  }
  if (mode === "rhythm-tap" && RHYTHM_TAP_LEVELS[level]) {
    return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", {
      lvl: level,
      lbl: getLocalizedRhythmTapLevel(level).label
    });
  }
  if (mode === "prod-tone" && PROD_TONE_LEVELS[level]) {
    return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", {
      lvl: level,
      lbl: getLocalizedProdLevelLabel("tone", level)
    });
  }
  if (mode === "prod-eq-noise" && PROD_EQ_NOISE_LEVELS[level]) {
    return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", {
      lvl: level,
      lbl: getLocalizedProdLevelLabel("eq", level)
    });
  }
  if (mode === "modes-scale" && MODE_SCALE_LEVELS[level]) {
    return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", {
      lvl: level,
      lbl: getLocalizedModeLevelLabel("scale", level)
    });
  }
  if (mode === "modes-char" && MODE_CHAR_LEVELS[level]) {
    return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", {
      lvl: level,
      lbl: getLocalizedModeLevelLabel("char", level)
    });
  }
  if (mode === "modes-cadence" && MODE_CADENCE_LEVELS[level]) {
    return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", {
      lvl: level,
      lbl: getLocalizedModeLevelLabel("cadence", level)
    });
  }
  if (isChordQualityMode(mode)) {
    const chordLvlLabels = {
      1: tr("Dreiklänge", "Triads"),
      2: tr("Sept & Sus", "7th & Sus"),
      3: tr("Erweitert", "Extended"),
      4: tr("Jazz & Optionstöne", "Jazz Tensions")
    };
    const lbl = chordLvlLabels[level];
    if (lbl) return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", { lvl: level, lbl });
  }
  if (mode === "chord-inversions") {
    const invLvlLabels = {
      1: tr("Dur-Dreiklang", "Major Triad"),
      2: tr("Dur & Moll", "Major & Minor"),
      3: tr("Septakkorde (4)", "7th Chords (4)")
    };
    const lbl = invLvlLabels[level];
    if (lbl) return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", { lvl: level, lbl });
  }
  if (isNotationMode(mode)) {
    const notationLvlLabels = {
      1: tr("Stammlinien", "5-Line Staff"),
      2: tr("±2 Hilfslinien", "±2 Ledger Lines"),
      3: tr("±3 Hilfslinien", "±3 Ledger Lines"),
      4: tr("±3 Hilfsl. + ♯/♭", "±3 Ledger + ♯/♭")
    };
    const lbl = notationLvlLabels[level];
    if (lbl) return tf("Stufe {lvl} ({lbl})", "Level {lvl} ({lbl})", { lvl: level, lbl });
  }
  return tf("Stufe {lvl}", "Level {lvl}", { lvl: level });
}

function formatMixSubtitle(mix) {
  const modeLabel = getLocalizedMixModeLabel(mix.mode);
  const lvlText = getLevelDisplayForMix(mix.mode, mix.level);
  const notKeyMode = isNotationMode(mix.mode) ? normalizeNotationKeyMode(mix.notationKeyMode) : "none";
  const notKeyText = notKeyMode !== "none" ? ` • ${getLocalizedNotationKeyModeLabel(notKeyMode, true)}` : "";
  const bpmText = !mix.mode.startsWith("prod-") && !mix.mode.startsWith("modes-") && !isNotationMode(mix.mode) && mix.bpm > 0 ? ` • ${mix.bpm} BPM` : "";
  return `${modeLabel} • ${lvlText}${notKeyText}${bpmText}`;
}

function applyModeAndLevelFromConfig(cfg) {
  const mode = cfg.mode;
  state.setMode(mode);
  if (mode === "cadence") {
    state.setDifficulty(cfg.level || 1);
  } else if (isChordQualityMode(mode)) {
    state.setChordDifficulty(cfg.level || 1);
  } else if (mode === "chord-inversions") {
    state.setChordInversionDifficulty(cfg.level || 1);
  } else if (mode === "solfege") {
    state.setSolfegeDifficulty(cfg.level || 1);
  } else if (isNotationMode(mode)) {
    state.setNotationLevel(mode, cfg.level || 1, cfg.notationKeyMode || "none");
  } else if (mode === "melody") {
    state.setMelodyConfig(
      cfg.melodyRange || cfg.level || "do-fa",
      cfg.melodyKeyMode || "fixed",
      cfg.melodyOctaveMode || "single",
      cfg.melodyStyle || null,
      typeof cfg.melodyPulse === "boolean" ? cfg.melodyPulse : null
    );
  } else if (mode.startsWith("rhythm-")) {
    state.setRhythmLevel(mode, cfg.level || 1);
  } else if (mode.startsWith("prod-")) {
    state.setProdLevel(mode, cfg.level || 1);
  } else if (mode.startsWith("modes-")) {
    state.setModesLevel(mode, cfg.level || 1);
  } else {
    state.setIntervalDifficulty(cfg.level || 1);
  }

  if (cfg.bpm && Number(cfg.bpm) >= 55) {
    const b = Number(cfg.bpm);
    state.settings.bpm = b;
    state.settings.randomBpm = false;
    state.activeBpm = b;
    state.hasManualExerciseBpm = true;
    const inlineSlider = document.getElementById("inlineBpmSlider");
    if (inlineSlider) inlineSlider.value = b;
    document.getElementById("inlineBpmRandomBtn")?.classList.remove("active");
  }
}

function launchProfileMix(mixId, returnView = state.currentView === "home" ? "home" : "space") {
  const mix = (state.profile?.mixes || []).find(m => m.id === mixId);
  if (!mix) return;
  markSessionActivity();
  const hasCustomBpm = Boolean(mix.bpm && Number(mix.bpm) >= 55);
  applyModeAndLevelFromConfig(mix);
  state.exerciseReturnView = returnView;
  switchView("exercise", { preserveBpm: hasCustomBpm });
}

function captureCurrentExerciseAsMix(customTitle = "") {
  const mode = state.settings.mode;
  let level = 1;
  if (mode === "cadence") level = state.settings.difficulty;
  else if (isChordQualityMode(mode)) level = state.settings.chordDifficulty;
  else if (mode === "chord-inversions") level = state.settings.chordInversionDifficulty;
  else if (mode === "solfege") level = state.settings.solfegeDifficulty;
  else if (mode === "melody") level = state.settings.melodyRange;
  else if (mode === "rhythm-meter") level = state.settings.rhythmMeterDifficulty;
  else if (mode === "rhythm-dictation") level = state.settings.rhythmDictationDifficulty;
  else if (mode === "rhythm-tap") level = state.settings.rhythmTapDifficulty;
  else if (mode === "rhythm-groove") level = state.settings.rhythmGrooveDifficulty;
  else if (mode === "prod-tone") level = state.settings.prodToneDifficulty;
  else if (mode === "prod-eq-noise") level = state.settings.prodEqNoiseDifficulty;
  else if (mode === "modes-scale") level = state.settings.modesScaleDifficulty;
  else if (mode === "modes-char") level = state.settings.modesCharDifficulty;
  else if (mode === "modes-cadence") level = state.settings.modesCadenceDifficulty;
  else if (isNotationMode(mode)) level = state.settings.notationDifficulty;
  else level = state.settings.intervalDifficulty;

  const mix = sanitizeMixEntry({
    id: `mix_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    title: customTitle || getLocalizedMixModeLabel(mode) || tr("Mein Mix", "My Mix"),
    mode: mode,
    level: level,
    melodyRange: state.settings.melodyRange,
    melodyKeyMode: state.settings.melodyKeyMode,
    melodyOctaveMode: state.settings.melodyOctaveMode,
    melodyStyle: state.settings.melodyStyle,
    melodyPulse: state.settings.melodyPulse,
    notationKeyMode: isNotationMode(mode) ? normalizeNotationKeyMode(state.settings.notationKeyMode) : "none",
    bpm: !mode.startsWith("prod-") && !mode.startsWith("modes-") && !isNotationMode(mode) && state.hasManualExerciseBpm ? state.activeBpm : 0
  });
  if (!mix) return null;

  state.profile.mixes = [mix, ...(state.profile.mixes || [])].slice(0, 16);
  saveUserProfile(state.profile);
  renderProfileMixes();
  return mix;
}

function deleteProfileMix(mixId) {
  state.profile.mixes = (state.profile.mixes || []).filter(m => m.id !== mixId);
  saveUserProfile(state.profile);
  renderProfileMixes();
}

function renderHomeQuickMixBar() {
  const wrap = document.getElementById("homeQuickMixBar");
  if (!wrap) return;

  const mixes = state.profile?.mixes || [];
  if (mixes.length === 0 || !state.profile?.showHomeQuickMixes) {
    wrap.classList.add("hidden");
    wrap.innerHTML = "";
    return;
  }

  wrap.classList.remove("hidden");
  wrap.innerHTML = `
    <span class="home-quick-mix-label">${tr("Schnellstart • Deine Mixe", "Quick Start • Your Mixes")}</span>
    <div class="home-quick-mix-chips">
      ${mixes.slice(0, 4).map(mix => `
        <button type="button" class="quick-mix-chip" data-home-launch-mix="${escapeHtml(mix.id)}" title="${escapeHtml(formatMixSubtitle(mix))}">
          <span class="quick-mix-play" aria-hidden="true">▶</span>
          <span class="quick-mix-name">${escapeHtml(getLocalizedMixTitle(mix))}</span>
        </button>
      `).join("")}
    </div>
  `;

  wrap.querySelectorAll("[data-home-launch-mix]").forEach(btn => {
    btn.addEventListener("click", () => launchProfileMix(btn.dataset.homeLaunchMix, "home"));
  });
}

function markPracticeStarted() {
  if (!state.profile || state.profile.hasPracticed !== false) return;
  state.profile.hasPracticed = true;
  saveUserProfile(state.profile);
  state.updateQuickStartLabel();
}

function syncHomeQuickMixToggle() {
  const enabled = Boolean(state.profile?.showHomeQuickMixes);
  document.querySelectorAll("[data-home-mixes]").forEach(btn => {
    const active = (btn.dataset.homeMixes === "on") === enabled;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

function setHomeQuickMixesEnabled(enabled) {
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile.showHomeQuickMixes = Boolean(enabled);
  saveUserProfile(state.profile);
  syncHomeQuickMixToggle();
  renderHomeQuickMixBar();
}

function renderHomeProfileGreeting() {
  state.updateQuickStartLabel();
  const heroSvg = document.getElementById("heroMascotSvg");
  if (heroSvg) heroSvg.innerHTML = getMascotSVG("idle", true);

  const bar = document.getElementById("homeProfileGreeting");
  if (!bar) {
    renderHomeQuickMixBar();
    return;
  }

  const p = state.profile || createDefaultProfile();
  const hasName = Boolean(p.name && p.name.length > 0);
  const focusKeys = getResolvedProfileFocuses(p);
  const focusDefs = focusKeys.map(getLocalizedProfileFocus);
  const showBar = hasName || focusKeys.some(k => k !== "allround");

  if (!showBar) {
    bar.classList.add("hidden");
    bar.innerHTML = "";
    renderHomeQuickMixBar();
    return;
  }

  bar.classList.remove("hidden");
  const instLabels = (p.instruments || []).slice(0, 2).map(getLocalizedProfileInstrumentLabel);
  const instList = instLabels.length > 0 ? ` • ${instLabels.join(", ")}` : "";
  const focusPrimary = focusDefs[0] || getLocalizedProfileFocus("allround");
  const greetingText = hasName
    ? tf("Hallo {name}!{inst}", "Hi {name}!{inst}", { name: p.name, inst: instList })
    : tf("Fokus: {focus}{inst}", "Focus: {focus}{inst}", { focus: focusDefs.map(d => d.label).join(", "), inst: instList });
  const badgesHtml = focusDefs.slice(0, 2).map(d => `<span class="home-profile-badge">${escapeHtml(d.label)}</span>`).join("")
    + (focusDefs.length > 2 ? `<span class="home-profile-badge">+${focusDefs.length - 2}</span>` : "");
  bar.innerHTML = `
    <span class="home-profile-text">${escapeHtml(greetingText)}</span>
    ${badgesHtml}
  `;
  renderHomeQuickMixBar();
}

function getSessionTimerLocalizedNote(st) {
  if (!st) return tr("Bereit für eine entspannte Session.", "Ready for a calm session.");
  const idleMins = state.profile?.inactivityMinutes || 3;
  if (st.noteKind === "custom" && st.statusNote) return st.statusNote;
  if (st.noteKind === "running") {
    return tf("Läuft (stoppt automatisch nach {mins} Min Inaktivität).", "Running (auto-stops after {mins} min idle).", { mins: idleMins });
  }
  if (st.noteKind === "paused") {
    return tr("Pausiert – tippe auf „Fortsetzen“, wenn es weitergeht.", "Paused — tap “Resume” whenever you’re ready.");
  }
  if (st.noteKind === "completed") {
    return tr("Session geschafft! Gönn deinen Ohren eine kurze Pause – hier wird nichts gezählt.", "Session complete! Give your ears a quick rest — nothing is tracked here.");
  }
  if (st.noteKind === "auto-stopped-idle") {
    return tf("Automatisch beendet nach {mins} Min Inaktivität.", "Auto-stopped after {mins} min of inactivity.", { mins: idleMins });
  }
  if (st.noteKind === "auto-stopped-pause") {
    return tf("Automatisch beendet nach {mins} Min Pause.", "Auto-stopped after {mins} min away.", { mins: idleMins });
  }
  return tr("Bereit für eine entspannte Session.", "Ready for a calm session.");
}

function renderSessionTimerUI() {
  const st = state.sessionTimer;
  if (!st) return;

  const displayEl = document.getElementById("spaceTimerDisplay");
  const badgeEl = document.getElementById("spaceTimerStatusBadge");
  const noteEl = document.getElementById("spaceTimerNote");
  const toggleBtn = document.getElementById("timerToggleBtn");

  if (displayEl) displayEl.textContent = formatSessionMMSS(st.remainingSec);
  const localizedNote = getSessionTimerLocalizedNote(st);
  if (st.noteKind !== "custom") st.statusNote = localizedNote;
  if (noteEl) noteEl.textContent = localizedNote;

  if (badgeEl) {
    const statusMap = {
      "idle": tr("Bereit", "Ready"),
      "running": tr("Läuft", "Running"),
      "paused": tr("Pausiert", "Paused"),
      "completed": tr("Geschafft", "Done"),
      "auto-stopped": tr("Auto-Stopp", "Auto-Stop")
    };
    badgeEl.textContent = statusMap[st.status] || tr("Bereit", "Ready");
  }

  if (toggleBtn) {
    if (st.status === "running") {
      toggleBtn.textContent = tr("⏸ Pausieren", "⏸ Pause");
    } else if (st.status === "paused") {
      toggleBtn.textContent = tr("▶ Fortsetzen", "▶ Resume");
    } else {
      toggleBtn.textContent = tr("▶ Session starten", "▶ Start Session");
    }
  }

  document.querySelectorAll("[data-timer-mins]").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.timerMins, 10) === state.profile.sessionMinutes);
  });
  document.querySelectorAll("[data-timer-idle]").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.timerIdle, 10) === state.profile.inactivityMinutes);
  });

  const summaryEl = document.getElementById("spaceTimerConfigSummary");
  if (summaryEl) {
    const dur = state.profile.sessionMinutes || 10;
    const idle = state.profile.inactivityMinutes || 3;
    summaryEl.textContent = tf("{dur} Min • Auto-Stopp {idle} Min", "{dur} min • Auto-stop {idle} min", { dur, idle });
  }
}

function stopSessionTimer(nextStatus = "idle", customNote = null, noteKind = null) {
  const st = state.sessionTimer;
  if (!st) return;
  if (st.intervalId !== null) {
    clearInterval(st.intervalId);
    st.intervalId = null;
  }
  st.status = nextStatus;
  st.hiddenSinceWallMs = null;
  st.totalSec = (state.profile.sessionMinutes || 10) * 60;
  st.remainingSec = st.totalSec;
  if (noteKind) {
    st.noteKind = noteKind;
    st.statusNote = customNote || getSessionTimerLocalizedNote(st);
  } else if (customNote) {
    st.noteKind = "custom";
    st.statusNote = customNote;
  } else if (nextStatus === "idle") {
    st.noteKind = "idle";
    st.statusNote = getSessionTimerLocalizedNote(st);
  }
  renderSessionTimerUI();
  state.updateHeaderSubtext();
}

function completeSessionTimer() {
  const st = state.sessionTimer;
  if (!st) return;
  if (st.intervalId !== null) {
    clearInterval(st.intervalId);
    st.intervalId = null;
  }
  st.status = "completed";
  st.remainingSec = 0;
  st.hiddenSinceWallMs = null;
  st.noteKind = "completed";
  st.statusNote = getSessionTimerLocalizedNote(st);

  if (typeof audioEngine !== "undefined" && audioEngine.isInitialized && !state.master.muted) {
    audioEngine.playStep(["C5"], 0.45, null, "interval");
    setTimeout(() => audioEngine.playStep(["E5", "G5"], 0.85, null, "interval"), 220);
  }

  renderSessionTimerUI();
  state.updateHeaderSubtext();
}

function tickSessionTimer(nowWallMs = Date.now()) {
  const st = state.sessionTimer;
  if (!st || st.status !== "running") return;

  if (state.isPlaying) {
    st.lastActivityWallMs = nowWallMs;
    st.hiddenSinceWallMs = null;
  }

  const idleMins = state.profile.inactivityMinutes || 3;
  const idleLimitMs = idleMins * 60 * 1000;
  const inactiveSinceWall = nowWallMs - st.lastActivityWallMs;
  const hiddenDuration = st.hiddenSinceWallMs !== null ? (nowWallMs - st.hiddenSinceWallMs) : 0;

  if (inactiveSinceWall >= idleLimitMs || hiddenDuration >= idleLimitMs) {
    stopSessionTimer("auto-stopped", null, "auto-stopped-idle");
    return;
  }

  st.remainingSec = Math.max(0, st.remainingSec - 1);
  if (st.remainingSec <= 0) {
    completeSessionTimer();
    return;
  }

  renderSessionTimerUI();
  state.updateHeaderSubtext();
}

function startOrResumeSessionTimer() {
  const st = state.sessionTimer;
  if (!st) return;
  markSessionActivity();

  if (st.status !== "paused") {
    st.totalSec = (state.profile.sessionMinutes || 10) * 60;
    st.remainingSec = st.totalSec;
  }
  st.status = "running";
  st.noteKind = "running";
  st.statusNote = getSessionTimerLocalizedNote(st);

  if (st.intervalId !== null) clearInterval(st.intervalId);
  st.intervalId = setInterval(() => tickSessionTimer(), 1000);

  renderSessionTimerUI();
  state.updateHeaderSubtext();
}

function pauseSessionTimer() {
  const st = state.sessionTimer;
  if (!st || st.status !== "running") return;
  if (st.intervalId !== null) {
    clearInterval(st.intervalId);
    st.intervalId = null;
  }
  st.status = "paused";
  st.noteKind = "paused";
  st.statusNote = getSessionTimerLocalizedNote(st);
  renderSessionTimerUI();
  state.updateHeaderSubtext();
}

function setSessionDurationMinutes(mins) {
  const parsed = [5, 10, 15, 20].includes(Number(mins)) ? Number(mins) : 10;
  state.profile.sessionMinutes = parsed;
  saveUserProfile(state.profile);
  if (state.sessionTimer.status === "idle" || state.sessionTimer.status === "completed" || state.sessionTimer.status === "auto-stopped") {
    state.sessionTimer.totalSec = parsed * 60;
    state.sessionTimer.remainingSec = parsed * 60;
    state.sessionTimer.status = "idle";
    state.sessionTimer.noteKind = "idle";
    state.sessionTimer.statusNote = getSessionTimerLocalizedNote(state.sessionTimer);
  }
  renderSessionTimerUI();
  state.updateHeaderSubtext();
}

function setSessionIdleMinutes(mins) {
  const parsed = [2, 3, 5].includes(Number(mins)) ? Number(mins) : 3;
  state.profile.inactivityMinutes = parsed;
  saveUserProfile(state.profile);
  if (state.sessionTimer.status === "running") {
    state.sessionTimer.noteKind = "running";
    state.sessionTimer.statusNote = getSessionTimerLocalizedNote(state.sessionTimer);
  }
  renderSessionTimerUI();
}

function getBreakReminderMinutes() {
  const raw = state?.profile?.breakReminderMinutes;
  return sanitizeBreakReminderMinutes(raw);
}

function syncBreakReminderControls() {
  const enabled = state?.profile?.breakReminderEnabled !== false;
  const mins = getBreakReminderMinutes();

  if (typeof document !== "undefined" && typeof document.querySelectorAll === "function") {
    document.querySelectorAll("[data-break-enabled]").forEach(btn => {
      const isOnBtn = btn.dataset?.breakEnabled !== "off";
      const active = isOnBtn === enabled;
      btn.classList?.toggle("active", active);
      btn.setAttribute?.("aria-pressed", String(active));
    });
    document.querySelectorAll("[data-break-preset]").forEach(btn => {
      const val = parseInt(btn.dataset?.breakPreset, 10);
      btn.classList?.toggle("active", val === mins);
      if (Number.isFinite(val)) {
        btn.textContent = tf("{mins} Min", "{mins} min", { mins: val });
      }
    });
  }

  const sliderEl = document.getElementById("breakReminderSlider");
  if (sliderEl) sliderEl.value = String(mins);
  const valEl = document.getElementById("breakReminderVal");
  if (valEl) valEl.textContent = tf("{mins} Min", "{mins} min", { mins });
  const rowEl = document.getElementById("breakReminderDurationRow");
  if (rowEl) rowEl.classList.toggle("is-disabled", !enabled);

  if (state?.breakReminder?.promptOpen) {
    renderBreakReminderModalContent();
  }
}

function renderBreakReminderModalContent() {
  const mins = getBreakReminderMinutes();
  const mascotEl = document.getElementById("breakReminderMascot");
  if (mascotEl) mascotEl.innerHTML = getMascotSVG("break", true);
  const bodyEl = document.getElementById("breakReminderBody");
  if (bodyEl) {
    bodyEl.textContent = tf(
      "Du übst schon seit {mins} Minuten am Stück. Eine kurze Verschnaufpause von 2–3 Minuten hält deine Ohren frisch!",
      "You’ve been practicing for {mins} minutes straight. A short 2–3 minute breather keeps your ears fresh!",
      { mins }
    );
  }
  const contEl = document.getElementById("breakContinueBtn");
  if (contEl) {
    contEl.textContent = tf("Weiterüben (+{mins} Min)", "Keep Practicing (+{mins} min)", { mins });
  }
}

function stopBreakReminderTicker() {
  const br = state?.breakReminder;
  if (!br) return;
  if (br.intervalId !== null) {
    clearInterval(br.intervalId);
    br.intervalId = null;
  }
}

function startBreakReminderTicker() {
  const br = state?.breakReminder;
  if (!br || !state?.profile?.breakReminderEnabled) return;
  if (state.currentView !== "exercise" || br.promptOpen) return;
  if (br.intervalId === null) {
    br.intervalId = setInterval(() => tickBreakReminder(), 1000);
  }
}

function resetBreakReminderTimer(options = {}) {
  const br = state?.breakReminder;
  if (!br) return;
  stopBreakReminderTicker();
  br.elapsedSec = 0;
  br.hiddenSinceWallMs = null;
  br.lastActivityWallMs = Date.now();
  br.promptOpen = false;
  br.pausedOnBreak = Boolean(options.pausedOnBreak);
  if (options.restartTicker !== false && !br.pausedOnBreak && state.currentView === "exercise" && state.profile?.breakReminderEnabled) {
    startBreakReminderTicker();
  }
}

function setBreakReminderEnabled(enabled) {
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile.breakReminderEnabled = Boolean(enabled);
  saveUserProfile(state.profile);
  if (!state.profile.breakReminderEnabled) {
    resetBreakReminderTimer();
  } else {
    state.breakReminder.pausedOnBreak = false;
    state.breakReminder.lastActivityWallMs = Date.now();
    if (state.currentView === "exercise") startBreakReminderTicker();
  }
  syncBreakReminderControls();
}

function setBreakReminderMinutes(mins) {
  if (!state.profile) state.profile = createDefaultProfile();
  const parsed = sanitizeBreakReminderMinutes(mins);
  state.profile.breakReminderMinutes = parsed;
  saveUserProfile(state.profile);
  if (state.breakReminder) {
    const targetSec = parsed * 60;
    if (state.breakReminder.elapsedSec >= targetSec) {
      state.breakReminder.elapsedSec = 0;
    }
  }
  syncBreakReminderControls();
}

function openBreakReminderModal() {
  const br = state?.breakReminder;
  if (!br || br.promptOpen) return;
  br.promptOpen = true;
  stopBreakReminderTicker();
  stopPlayback();
  renderBreakReminderModalContent();
  if (typeof audioEngine !== "undefined" && audioEngine.isInitialized && !state.master?.muted) {
    audioEngine.playStep(["E5"], 0.36, null, "interval");
    setTimeout(() => audioEngine.playStep(["G5"], 0.65, null, "interval"), 200);
  }
  setModalVisibility("break");
  pushAppHistory("break");
}

function dismissBreakReminder(action = "continue") {
  const br = state?.breakReminder;
  if (!br) return;
  if (action === "disable") {
    setBreakReminderEnabled(false);
    setModalVisibility(null);
    return;
  }
  if (action === "pause") {
    resetBreakReminderTimer({ pausedOnBreak: true, restartTicker: false });
    setModalVisibility(null);
    if (state.currentView === "exercise") {
      switchView("home");
    }
    return;
  }
  resetBreakReminderTimer({ pausedOnBreak: false, restartTicker: true });
  setModalVisibility(null);
}

/**
 * Zählt aktive Übezeit im Hintergrund ohne sichtbare Daueranzeige und meldet sich nach X Minuten.
 */
function tickBreakReminder(nowWallMs = Date.now()) {
  const br = state?.breakReminder;
  if (!br || !state?.profile?.breakReminderEnabled) {
    stopBreakReminderTicker();
    return;
  }
  if (state.currentView !== "exercise") {
    stopBreakReminderTicker();
    return;
  }
  if (br.promptOpen || br.pausedOnBreak) return;
  if (typeof document !== "undefined" && document.hidden) return;

  if (state.isPlaying) {
    br.lastActivityWallMs = nowWallMs;
  }
  const idleMs = nowWallMs - (br.lastActivityWallMs || nowWallMs);
  if (!state.isPlaying && idleMs >= 120000) {
    return;
  }

  br.elapsedSec += 1;
  const targetSec = getBreakReminderMinutes() * 60;
  if (br.elapsedSec >= targetSec) {
    if (state.exam?.active) return;
    openBreakReminderModal();
  }
}

function renderProfileMixes() {
  syncHomeQuickMixToggle();
  const listEl = document.getElementById("spaceMixList");
  if (!listEl) {
    renderHomeQuickMixBar();
    return;
  }

  const mixes = state.profile?.mixes || [];
  if (mixes.length === 0) {
    listEl.innerHTML = `<p class="account-card-sub">${tr("Noch keine eigenen Mixe gespeichert – erstelle oben einen Favoriten.", "No custom mixes saved yet — create a favorite above.")}</p>`;
    renderHomeQuickMixBar();
    return;
  }

  listEl.innerHTML = mixes.map(mix => `
    <div class="account-mix-item" data-mix-id="${escapeHtml(mix.id)}">
      <div class="account-mix-info">
        <div class="account-mix-title">${escapeHtml(getLocalizedMixTitle(mix))}</div>
        <div class="account-mix-meta">${escapeHtml(formatMixSubtitle(mix))}</div>
      </div>
      <div class="account-mix-actions">
        <button type="button" class="btn-tool" data-launch-mix="${escapeHtml(mix.id)}">${tr("▶ Starten", "▶ Start")}</button>
        <button type="button" class="account-mix-del" data-delete-mix="${escapeHtml(mix.id)}" title="${tr("Mix entfernen", "Remove mix")}" aria-label="${tr("Mix entfernen", "Remove mix")}">✕</button>
      </div>
    </div>
  `).join("");

  listEl.querySelectorAll("[data-launch-mix]").forEach(btn => {
    btn.addEventListener("click", () => launchProfileMix(btn.dataset.launchMix));
  });
  listEl.querySelectorAll("[data-delete-mix]").forEach(btn => {
    btn.addEventListener("click", () => deleteProfileMix(btn.dataset.deleteMix));
  });
  renderHomeQuickMixBar();
}

function populateMixCreatorControls(options = {}) {
  const modeSel = document.getElementById("mixModeSelect");
  const lvlSel = document.getElementById("mixLevelSelect");
  if (!modeSel || !lvlSel) return;

  const prevMode = modeSel.value;
  if (options.forceRepopulate || !modeSel.dataset.populated) {
    modeSel.innerHTML = Object.entries(MIX_MODE_CATALOG)
      .map(([k]) => `<option value="${k}">${escapeHtml(getLocalizedMixModeLabel(k))}</option>`)
      .join("");
    if (prevMode && MIX_MODE_CATALOG[prevMode]) {
      modeSel.value = prevMode;
    }
    modeSel.dataset.populated = "1";
  }

  const prevLvl = lvlSel.value;
  const chosenMode = MIX_MODE_CATALOG[modeSel.value] ? modeSel.value : "cadence";
  const levels = MIX_MODE_CATALOG[chosenMode].levels;
  lvlSel.innerHTML = levels.map(l => `
    <option value="${escapeHtml(l)}">${escapeHtml(getLevelDisplayForMix(chosenMode, l))}</option>
  `).join("");
  if (prevLvl && levels.map(String).includes(String(prevLvl))) {
    lvlSel.value = prevLvl;
  }
}

function applyProfileDisplayChanges() {
  state.profileDisplayDirty = true;
  const ex = state.currentExercise;
  if (ex) {
    refreshExerciseLocalization(ex);
    if (state.currentView === "exercise") {
      renderUI();
      if (ex.isSolved && (String(ex.type || "").startsWith("interval-") || isChordMode(ex.type)) && ex.targetItem) {
        const stageMain = document.getElementById("stageMainText");
        const stageFn = document.getElementById("stageFunctionText");
        if (stageMain) stageMain.textContent = ex.targetItem.roman || ex.targetItem.symbol;
        if (stageFn) stageFn.textContent = ex.targetItem.label;
        const targetCard = document.getElementById(`barCard_${ex.targetIndex}`);
        if (targetCard) {
          const romanEl = targetCard.querySelector(".bar-roman");
          const lblEl = targetCard.querySelector(".bar-label");
          if (romanEl) romanEl.textContent = ex.targetItem.displayMain || ex.targetItem.roman || ex.targetItem.symbol;
          if (lblEl) {
            lblEl.textContent = ex.type === "chord-inversions"
              ? (ex.bars?.[ex.targetIndex]?.short || ex.targetItem.short)
              : ex.targetItem.short;
          }
        }
      }
      if (state.lastAnswerWasWrong && state.wrongAnswerData?.chosen) {
        const chosenDef = state.wrongAnswerData.chosen;
        const fbText = document.getElementById("feedbackText");
        if (fbText) {
          fbText.textContent = tf("Gewählt: {sym} ({lbl}).", "Selected: {sym} ({lbl}).", {
            sym: chosenDef.roman || chosenDef.symbol,
            lbl: chosenDef.label
          });
        }
      }
      state.profileDisplayDirty = false;
    }
  }
  if (state.currentView === "category-help") {
    openCategoryHelpPage(state.activeCategory, { refreshOnly: true });
  } else if (state.currentView === "knowledge-detail" && state.activeKnowledgeDetail) {
    if (state.activeKnowledgeDetail.kind === "article") {
      openKnowledgeArticle(state.activeKnowledgeDetail.id, { refreshOnly: true });
    } else if (state.activeKnowledgeDetail.kind === "ref") {
      openKnowledgeRef(state.activeKnowledgeDetail.key, { refreshOnly: true });
    }
  }
}

let _openProfileDropdownKey = null;
let _profileDropdownOutsideBound = false;

function bindProfileDropdownOutsideCloser() {
  if (_profileDropdownOutsideBound || typeof document === "undefined" || typeof document.addEventListener !== "function") {
    return;
  }
  _profileDropdownOutsideBound = true;
  document.addEventListener("click", (e) => {
    if (!_openProfileDropdownKey) return;
    const host = typeof e?.target?.closest === "function"
      ? e.target.closest("[data-profile-dropdown-host]")
      : null;
    if (!host || host.dataset?.profileDropdownHost !== _openProfileDropdownKey) {
      _openProfileDropdownKey = null;
      renderProfileAccountView();
    }
  });
}

function buildDropdownChevronSVG() {
  return `<svg class="multi-dropdown-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;
}

function formatMultiDropdownSummary(selectedItems, placeholderText) {
  if (!selectedItems || selectedItems.length === 0) {
    return { text: placeholderText, isPlaceholder: true };
  }
  if (selectedItems.length <= 2) {
    return { text: selectedItems.map(it => it.label).join(", "), isPlaceholder: false };
  }
  return {
    text: `${selectedItems[0].label}, ${selectedItems[1].label} (+${selectedItems.length - 2})`,
    isPlaceholder: false
  };
}

function renderProfileMultiDropdown({
  containerEl,
  key,
  options,
  selectedKeys,
  placeholderText,
  emptyTagsText,
  resetOption = null,
  onToggle,
  onReset = null
}) {
  if (!containerEl || typeof document === "undefined") return;
  bindProfileDropdownOutsideCloser();
  containerEl.dataset.profileDropdownHost = key;
  containerEl.innerHTML = "";

  const isOpen = _openProfileDropdownKey === key;
  const selectedSet = new Set(selectedKeys || []);
  const selectedOptions = options.filter(opt => selectedSet.has(opt.key));
  const summaryInfo = formatMultiDropdownSummary(selectedOptions, placeholderText);

  if (typeof document.createElement !== "function") return;

  const wrap = document.createElement("div");
  wrap.className = "multi-dropdown-wrap";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = `account-select multi-dropdown-trigger${isOpen ? " is-open" : ""}`;
  trigger.dataset.dropdownTrigger = key;
  trigger.setAttribute?.("aria-haspopup", "listbox");
  trigger.setAttribute?.("aria-expanded", String(isOpen));
  const badgeHtml = selectedOptions.length > 0
    ? `<span class="multi-dropdown-count" title="${escapeHtml(tf("{n} ausgewählt", "{n} selected", { n: selectedOptions.length }))}">${selectedOptions.length}</span>`
    : "";
  trigger.innerHTML = `<span class="multi-dropdown-summary${summaryInfo.isPlaceholder ? " is-placeholder" : ""}">${escapeHtml(summaryInfo.text)}</span><span class="multi-dropdown-meta">${badgeHtml}${buildDropdownChevronSVG()}</span>`;
  trigger.addEventListener("click", (e) => {
    e?.stopPropagation?.();
    _openProfileDropdownKey = isOpen ? null : key;
    renderProfileAccountView();
  });
  wrap.appendChild(trigger);

  const menu = document.createElement("div");
  menu.className = `multi-dropdown-menu${isOpen ? "" : " hidden"}`;
  menu.setAttribute?.("role", "listbox");
  menu.setAttribute?.("aria-multiselectable", "true");

  if (resetOption && typeof onReset === "function") {
    const isResetActive = Boolean(resetOption.isActive);
    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = `multi-dropdown-option multi-dropdown-option-divider${isResetActive ? " is-selected" : ""}`;
    resetBtn.dataset.dropdownOption = resetOption.key;
    resetBtn.setAttribute?.("role", "option");
    resetBtn.setAttribute?.("aria-selected", String(isResetActive));
    resetBtn.innerHTML = `<span class="multi-dropdown-check" aria-hidden="true">${isResetActive ? "✓" : ""}</span><span class="multi-dropdown-opt-text"><span>${escapeHtml(resetOption.label)}</span></span>`;
    resetBtn.addEventListener("click", (e) => {
      e?.stopPropagation?.();
      onReset();
    });
    menu.appendChild(resetBtn);
  }

  options.forEach(opt => {
    const isSel = selectedSet.has(opt.key);
    const optBtn = document.createElement("button");
    optBtn.type = "button";
    optBtn.className = `multi-dropdown-option${isSel ? " is-selected" : ""}`;
    optBtn.dataset.dropdownOption = opt.key;
    optBtn.setAttribute?.("role", "option");
    optBtn.setAttribute?.("aria-selected", String(isSel));
    const hintHtml = opt.hint ? `<span class="multi-dropdown-opt-hint">${escapeHtml(opt.hint)}</span>` : "";
    optBtn.innerHTML = `<span class="multi-dropdown-check" aria-hidden="true">${isSel ? "✓" : ""}</span><span class="multi-dropdown-opt-text"><span>${escapeHtml(opt.label)}</span>${hintHtml}</span>`;
    optBtn.addEventListener("click", (e) => {
      e?.stopPropagation?.();
      onToggle(opt.key);
    });
    menu.appendChild(optBtn);
  });

  wrap.appendChild(menu);
  containerEl.appendChild(wrap);

  const tagsRow = document.createElement("div");
  tagsRow.className = "multi-selected-tags";
  if (selectedOptions.length === 0) {
    const emptyEl = document.createElement("span");
    emptyEl.className = "multi-empty-note";
    emptyEl.textContent = emptyTagsText;
    tagsRow.appendChild(emptyEl);
  } else {
    selectedOptions.forEach(opt => {
      if (opt.fixed) {
        const fixedEl = document.createElement("span");
        fixedEl.className = "k-filter-pill active";
        fixedEl.dataset.selectedBadge = opt.key;
        fixedEl.textContent = opt.label;
        tagsRow.appendChild(fixedEl);
        return;
      }
      const chipBtn = document.createElement("button");
      chipBtn.type = "button";
      chipBtn.className = "k-filter-pill active multi-selected-tag";
      chipBtn.dataset.dropdownRemove = opt.key;
      chipBtn.setAttribute?.("aria-label", tf("{item} entfernen", "Remove {item}", { item: opt.label }));
      chipBtn.innerHTML = `<span>${escapeHtml(opt.label)}</span><span class="multi-selected-remove" aria-hidden="true">×</span>`;
      chipBtn.addEventListener("click", (e) => {
        e?.stopPropagation?.();
        onToggle(opt.key);
      });
      tagsRow.appendChild(chipBtn);
    });
  }
  containerEl.appendChild(tagsRow);
}

function renderProfileAccountView() {
  const p = state.profile || createDefaultProfile();
  const spaceSvg = document.getElementById("spaceMascotSvg");
  if (spaceSvg) spaceSvg.innerHTML = getMascotSVG("idle", true);

  const titleEl = document.getElementById("spaceGreetingTitle");
  const subEl = document.getElementById("spaceGreetingSub");
  const focusKeys = getResolvedProfileFocuses(p);
  const focusDefs = focusKeys.map(getLocalizedProfileFocus);

  if (titleEl) {
    titleEl.textContent = p.name
      ? tf("Hallo, {name}!", "Hi, {name}!", { name: p.name })
      : tr("Dein Musiker-Profil", "Your Musician Profile");
  }
  if (subEl) {
    const instText = p.instruments && p.instruments.length > 0
      ? p.instruments.map(getLocalizedProfileInstrumentLabel).join(" • ")
      : tr("Kein Instrument gewählt", "No instrument selected");
    const focusSummary = focusDefs.length === 1
      ? focusDefs[0].hint
      : focusDefs.map(d => d.label).join(" • ");
    subEl.textContent = `${instText} — ${focusSummary}`;
  }

  const nameInput = document.getElementById("profileNameInput");
  if (nameInput && nameInput.value !== p.name) {
    nameInput.value = p.name;
  }

  const instWrap = document.getElementById("profileInstrumentsGroup");
  if (instWrap) {
    const activeInsts = p.instruments || [];
    const instOptions = PROFILE_INSTRUMENT_OPTIONS.map(inst => ({
      key: inst,
      label: getLocalizedProfileInstrumentLabel(inst)
    }));
    renderProfileMultiDropdown({
      containerEl: instWrap,
      key: "instruments",
      options: instOptions,
      selectedKeys: activeInsts,
      placeholderText: tr("Kein Instrument", "No instrument"),
      emptyTagsText: tr("Kein Instrument gewählt", "No instrument selected"),
      resetOption: {
        key: "none",
        label: tr("Kein Instrument", "No instrument"),
        isActive: activeInsts.length === 0
      },
      onReset: () => {
        state.profile.instruments = [];
        saveUserProfile(state.profile);
        renderProfileAccountView();
        renderHomeProfileGreeting();
        renderWelcomeProfileStep();
      },
      onToggle: (inst) => {
        const set = new Set(state.profile.instruments || []);
        if (set.has(inst)) set.delete(inst);
        else set.add(inst);
        state.profile.instruments = PROFILE_INSTRUMENT_OPTIONS.filter(i => set.has(i));
        saveUserProfile(state.profile);
        renderProfileAccountView();
        renderHomeProfileGreeting();
        renderWelcomeProfileStep();
      }
    });
  }

  const focusWrap = document.getElementById("profileFocusGroup");
  const focusSuggRow = document.getElementById("spaceFocusSuggestionRow");
  if (focusWrap) {
    const focusOptions = Object.values(PROFILE_FOCUS_OPTIONS).map(opt => {
      const def = getLocalizedProfileFocus(opt.key);
      return {
        key: opt.key,
        label: def.label,
        hint: def.hint,
        fixed: opt.key === "allround"
      };
    });
    renderProfileMultiDropdown({
      containerEl: focusWrap,
      key: "focus",
      options: focusOptions,
      selectedKeys: focusKeys,
      placeholderText: tr("Auswählen …", "Choose …"),
      emptyTagsText: getLocalizedProfileFocus("allround").label,
      onToggle: (focusKey) => {
        const nextList = toggleProfileFocusValue(getResolvedProfileFocuses(state.profile), focusKey);
        state.profile.focuses = nextList;
        state.profile.focus = nextList[0] || "allround";
        saveUserProfile(state.profile);
        renderProfileAccountView();
        renderHomeProfileGreeting();
      }
    });
  }
  if (focusSuggRow) {
    const specificDefs = focusKeys.filter(k => k !== "allround").map(getLocalizedProfileFocus);
    if (specificDefs.length > 0) {
      focusSuggRow.classList.remove("hidden");
      const primaryDef = specificDefs[0];
      const hintSummary = specificDefs.length === 1
        ? primaryDef.hint
        : specificDefs.map(d => d.label).join(" • ");
      focusSuggRow.innerHTML = `
        <span>${tf("Empfehlung: {hint}", "Suggested: {hint}", { hint: hintSummary })}</span>
        <div class="account-focus-actions">
          ${specificDefs.map((def, idx) => `
            <button type="button" ${idx === 0 ? 'id="launchFocusSuggestionBtn"' : ""} class="btn-tool" data-launch-focus-mode="${escapeHtml(def.mode)}">
              ${escapeHtml(specificDefs.length > 1 ? `${def.label} ▶` : tr("Jetzt üben ▶", "Practice Now ▶"))}
            </button>
          `).join("")}
        </div>
      `;
      focusSuggRow.querySelectorAll("[data-launch-focus-mode]").forEach(btn => {
        btn.addEventListener("click", () => {
          applyModeAndLevelFromConfig({ mode: btn.dataset.launchFocusMode, level: 1, melodyRange: "do-fa" });
          state.exerciseReturnView = "space";
          switchView("exercise");
        });
      });
    } else {
      focusSuggRow.classList.add("hidden");
      focusSuggRow.innerHTML = "";
    }
  }

  const accField = document.getElementById("profileAccessoryField");
  if (accField) accField.classList.toggle("hidden", !MASCOT_LOOKS_ENABLED);
  const accWrap = MASCOT_LOOKS_ENABLED ? document.getElementById("profileAccessoryGroup") : null;
  if (accWrap) {
    const activeAccs = getResolvedProfileAccessories(p);
    const accOptions = PROFILE_ACCESSORY_OPTIONS.map(opt => ({
      key: opt.key,
      label: getLocalizedProfileAccessoryLabel(opt)
    }));
    renderProfileMultiDropdown({
      containerEl: accWrap,
      key: "accessory",
      options: accOptions,
      selectedKeys: activeAccs,
      placeholderText: tr("Klassisch (ohne Extras)", "Classic (no extras)"),
      emptyTagsText: tr("Klassisch (ohne Extras)", "Classic (no extras)"),
      resetOption: {
        key: PROFILE_ACCESSORY_NONE_KEY,
        label: tr("Ohne Extras (Klassisch)", "No extras (Classic)"),
        isActive: activeAccs.length === 0
      },
      onReset: () => {
        state.profile.companionAccessories = [];
        state.profile.companionAccessory = PROFILE_ACCESSORY_NONE_KEY;
        saveUserProfile(state.profile);
        renderProfileAccountView();
        renderHomeProfileGreeting();
      },
      onToggle: (accKey) => {
        const nextAccs = toggleProfileAccessoryValue(getResolvedProfileAccessories(state.profile), accKey);
        state.profile.companionAccessories = nextAccs;
        state.profile.companionAccessory = nextAccs[0] || PROFILE_ACCESSORY_NONE_KEY;
        saveUserProfile(state.profile);
        renderProfileAccountView();
        renderHomeProfileGreeting();
      }
    });
  }

  document.querySelectorAll("[data-notation]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.notation === p.notation);
  });
  document.querySelectorAll("[data-interval-notation]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.intervalNotation === (p.intervalNotation === "intl" ? "intl" : "de"));
  });
  document.querySelectorAll("[data-solfege-labels]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.solfegeLabels === p.solfegeLabels);
  });
  syncLanguageControls(state.settings.language);

  renderExamHistoryCard();
  renderSessionTimerUI();
  renderProfileMixes();
  renderCustomThemeSection();
}

function getThemeEditorTemplateColors(templateKey) {
  const tpl = CUSTOM_THEME_TEMPLATES[templateKey] || CUSTOM_THEME_TEMPLATES["waldlichtung-light"];
  return sanitizeCustomThemeColors(tpl);
}

function getCustomThemeSlotLabel(slotIndex) {
  return tf("Platz {n}", "Slot {n}", { n: (Number(slotIndex) || 0) + 1 });
}

function renderCustomThemeStorageHint() {
  const el = document.getElementById("customThemeStorageHint");
  if (!el) return;
  const writable = isCustomThemeStorageWritable();
  el.textContent = writable
    ? tr(
        "Lokal im Browser gespeichert (3 Plätze + .json-Backup im Profil unten). Cloud-Synchronisation folgt in einer späteren Version.",
        "Saved locally in your browser (3 slots + .json backup below). Cross-device cloud sync is planned for a future version."
      )
    : tr(
        "Hinweis: Dauerhafter Browser-Speicher ist hier eingeschränkt – deine 3 Themes gelten für diese Sitzung (über .json unten sicherbar).",
        "Note: Persistent browser storage is restricted here — your 3 custom themes stay active for this session (back up via .json below)."
      );
}

function renderCustomThemeSlots() {
  const listEl = document.getElementById("spaceCustomThemeSlots");
  if (!listEl) return;

  const slots = Array.isArray(state.profile?.customThemes) ? state.profile.customThemes : [null, null, null];
  const activeTheme = state.settings.theme;

  listEl.innerHTML = CUSTOM_THEME_SLOT_IDS.map((slotId, idx) => {
    const entry = slots[idx];
    const slotBadge = getCustomThemeSlotLabel(idx);
    if (!entry) {
      return `
        <div class="custom-theme-slot-card is-empty" data-slot-card="${idx}">
          <div class="custom-theme-slot-main">
            <div class="custom-theme-slot-head">
              <span class="custom-theme-slot-badge">${escapeHtml(slotBadge)}</span>
              <span class="custom-theme-slot-name">${escapeHtml(tr("Freier Speicherplatz", "Empty Save Slot"))}</span>
            </div>
            <div class="custom-theme-slot-sub">${escapeHtml(tr("Noch kein eigenes Theme gespeichert", "No custom theme saved yet"))}</div>
          </div>
          <div class="custom-theme-slot-actions">
            <button type="button" class="btn-tool" data-edit-custom-slot="${idx}">${tr("+ Gestalten", "+ Design")}</button>
          </div>
        </div>
      `;
    }

    const isActive = activeTheme === entry.id;
    const sw = entry.paletteMeta?.swatches || [entry.colors.bgBase, entry.colors.sage, entry.colors.peach, entry.colors.lilac];
    return `
      <div class="custom-theme-slot-card ${isActive ? "active" : ""}" data-slot-card="${idx}">
        <div class="custom-theme-slot-main">
          <div class="custom-theme-slot-head">
            <span class="custom-theme-slot-badge">${escapeHtml(slotBadge)}</span>
            <span class="custom-theme-slot-name">${escapeHtml(entry.name)}</span>
          </div>
          <div class="theme-swatches">
            ${sw.map(col => `<span class="swatch-dot swatch-dot-checker"><span class="swatch-dot-fill" style="background:${escapeHtml(col)};"></span></span>`).join("")}
          </div>
        </div>
        <div class="custom-theme-slot-actions">
          <button type="button" class="btn-tool" data-activate-custom-slot="${idx}">${isActive ? tr("Aktiv", "Active") : tr("Aktivieren", "Apply")}</button>
          <button type="button" class="btn-tool" data-edit-custom-slot="${idx}" title="${escapeHtml(tr("Theme bearbeiten", "Edit theme"))}">${tr("Bearbeiten", "Edit")}</button>
          <button type="button" class="account-mix-del" data-delete-custom-slot="${idx}" title="${escapeHtml(tr("Theme löschen", "Delete theme"))}" aria-label="${escapeHtml(tr("Theme löschen", "Delete theme"))}">✕</button>
        </div>
      </div>
    `;
  }).join("");

  listEl.querySelectorAll("[data-activate-custom-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.activateCustomSlot, 10);
      if (state.profile?.customThemes?.[idx]) {
        setThemePreference(CUSTOM_THEME_SLOT_IDS[idx]);
      }
    });
  });
  listEl.querySelectorAll("[data-edit-custom-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      openCustomThemeEditor(parseInt(btn.dataset.editCustomSlot, 10) || 0);
    });
  });
  listEl.querySelectorAll("[data-delete-custom-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      deleteCustomThemeSlot(parseInt(btn.dataset.deleteCustomSlot, 10));
    });
  });
}

function renderSettingsCustomThemes() {
  const wrap = document.getElementById("settingsCustomThemeList");
  if (!wrap) return;
  const slots = Array.isArray(state.profile?.customThemes) ? state.profile.customThemes : [];
  const saved = slots.filter(Boolean);
  if (saved.length === 0) {
    wrap.classList.add("hidden");
    wrap.innerHTML = "";
    return;
  }

  wrap.classList.remove("hidden");
  const activeTheme = state.settings.theme;
  wrap.innerHTML = saved.map(entry => {
    const isSel = activeTheme === entry.id;
    const sw = entry.paletteMeta?.swatches || [entry.colors.bgBase, entry.colors.sage, entry.colors.peach, entry.colors.lilac];
    return `
      <button class="theme-preview-item ${isSel ? "active" : ""}" type="button" data-theme-choice="${escapeHtml(entry.id)}" aria-pressed="${String(isSel)}">
        <div class="theme-info">
          <span class="theme-name">${escapeHtml(entry.name)} (${escapeHtml(getCustomThemeSlotLabel(entry.slotIndex))})</span>
          <span class="theme-status">${isSel ? tr("Aktiv", "Active") : tr("Auswählen", "Select")}</span>
        </div>
        <div class="theme-swatches">
          ${sw.map((col, sIdx) => `<span class="swatch-dot swatch-dot-checker"><span class="swatch-dot-fill" data-swatch="${sIdx}" style="background:${escapeHtml(col)};"></span></span>`).join("")}
        </div>
      </button>
    `;
  }).join("");

  wrap.querySelectorAll("[data-theme-choice]").forEach(btn => {
    btn.addEventListener("click", () => setThemePreference(btn.dataset.themeChoice));
  });
}

function applyCustomThemeDraftPreview() {
  const ed = state.customThemeEditor;
  if (!ed?.open || !ed.livePreview) return;
  const built = buildDerivedCustomThemeVars(ed.colors);
  applyCustomThemeCssVars(built);
  if (typeof document !== "undefined" && document.documentElement) {
    document.documentElement.setAttribute("data-theme", CUSTOM_THEME_SLOT_IDS[ed.slotIndex] || "custom_1");
    document.documentElement.setAttribute("data-appearance", built.isDark ? "dark" : "light");
  }
  const metaEl = typeof document !== "undefined" ? document.getElementById("metaThemeColor") : null;
  if (metaEl && built.metaBg) {
    metaEl.setAttribute("content", built.metaBg);
  }
}

function renderCustomThemeMiniPreview() {
  const wrap = document.getElementById("customThemeMiniPreview");
  if (!wrap) return;
  const ed = state.customThemeEditor;
  const built = buildDerivedCustomThemeVars(ed.colors);
  const v = built.cssVars;
  const previewName = (ed.name || "").trim() || tr("Vorschau", "Preview", { fr: "Aperçu" });

  wrap.style.backgroundColor = v["--bg-base"];
  wrap.style.borderColor = v["--border-strong"];

  wrap.innerHTML = `
    <div class="theme-mini-card" style="background:${escapeHtml(v["--surface-white"])};border:1px solid ${escapeHtml(v["--border-soft"])};">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;">
        <strong style="font-size:0.8rem;color:${escapeHtml(v["--raccoon-dark"])};">${escapeHtml(previewName)}</strong>
        <span style="font-size:0.68rem;color:${escapeHtml(v["--raccoon-mid"])};">${tr("Live-Vorschau", "Live Preview", { fr: "Aperçu en direct" })}</span>
      </div>
      <div class="theme-mini-badges">
        <span class="theme-mini-pill" style="background:${escapeHtml(v["--sage"])};color:${escapeHtml(v["--sage-strong"])};">${tr("Tonika / Salbei", "Tonic / Sage")}</span>
        <span class="theme-mini-pill" style="background:${escapeHtml(v["--peach"])};color:${escapeHtml(v["--peach-strong"])};">${tr("Dominante", "Dominant")}</span>
        <span class="theme-mini-pill" style="background:${escapeHtml(v["--lilac"])};color:${escapeHtml(v["--lilac-strong"])};">${tr("Moll / Klang", "Minor / Color")}</span>
      </div>
      <div class="theme-mini-badges">
        <span class="theme-mini-pill" style="background:${escapeHtml(v["--surface-warm"])};color:${escapeHtml(v["--status-ok"])};border:1px solid ${escapeHtml(v["--status-ok"])};">✓ ${tr("OK", "OK")}</span>
        <span class="theme-mini-pill" style="background:${escapeHtml(v["--surface-warm"])};color:${escapeHtml(v["--status-warn"])};border:1px solid ${escapeHtml(v["--status-warn"])};">! ${tr("Warnung", "Warn")}</span>
        <span class="theme-mini-pill" style="background:${escapeHtml(v["--surface-warm"])};color:${escapeHtml(v["--status-err"])};border:1px solid ${escapeHtml(v["--status-err"])};">✕ ${tr("Fehler", "Err")}</span>
      </div>
    </div>
  `;
}

function rescueColorPickerToHost() {
  const pickerEl = document.getElementById("rgbaColorPicker");
  const hostEl = document.getElementById("customThemePickerHost");
  if (!pickerEl) return;
  pickerEl.classList?.add("hidden");
  if (hostEl && pickerEl.parentNode !== hostEl && typeof hostEl.appendChild === "function") {
    hostEl.appendChild(pickerEl);
  }
}

function syncActiveRoleDrawer() {
  const ed = state.customThemeEditor;
  const pickerEl = document.getElementById("rgbaColorPicker");
  const roleGrid = document.getElementById("customThemeRoleGrid");
  if (!pickerEl) return;

  roleGrid?.querySelectorAll?.("[data-role-item]")?.forEach(item => {
    const isAct = item.dataset?.roleItem === ed.activeRole;
    item.classList?.toggle("is-open", isAct);
  });
  roleGrid?.querySelectorAll?.("[data-theme-role]")?.forEach(btn => {
    const isAct = btn.dataset?.themeRole === ed.activeRole;
    btn.classList?.toggle("active", isAct);
    btn.setAttribute?.("aria-expanded", String(isAct));
  });

  if (!ed.activeRole) {
    rescueColorPickerToHost();
    return;
  }

  let targetDrawer = null;
  roleGrid?.querySelectorAll?.("[data-role-drawer]")?.forEach(dr => {
    if (dr.dataset?.roleDrawer === ed.activeRole) targetDrawer = dr;
  });
  if (targetDrawer && typeof targetDrawer.appendChild === "function" && pickerEl.parentNode !== targetDrawer) {
    targetDrawer.appendChild(pickerEl);
  }
  pickerEl.classList?.remove("hidden");
}

function syncColorPickerUI() {
  const ed = state.customThemeEditor;

  document.querySelectorAll("[data-theme-role]").forEach(chip => {
    const key = chip.dataset?.themeRole;
    chip.classList?.toggle("active", key === ed.activeRole);
    chip.setAttribute?.("aria-expanded", String(key === ed.activeRole));
    const dot = chip.querySelector?.(".theme-role-dot");
    if (dot?.style && ed.colors[key]) {
      dot.style.backgroundColor = ed.colors[key];
    }
    const valEl = chip.querySelector?.(".theme-role-val");
    if (valEl && ed.colors[key]) {
      valEl.textContent = ed.colors[key];
    }
  });

  if (!ed.activeRole) {
    renderCustomThemeMiniPreview();
    return;
  }

  const field = CUSTOM_THEME_COLOR_FIELDS.find(f => f.key === ed.activeRole) || CUSTOM_THEME_COLOR_FIELDS[0];
  const colorStr = ed.colors[field.key] || field.def;
  const rgba = parseCssColorToRgba(colorStr, field.def);
  const hsv = ed.pickerHsv || rgbToHsv(rgba);

  const roleNameEl = document.getElementById("cpActiveRoleName");
  if (roleNameEl) roleNameEl.textContent = tr(field.de, field.en);

  const swatchEl = document.getElementById("cpPreviewSwatch");
  if (swatchEl?.style) swatchEl.style.backgroundColor = rgbaToExplicitString(rgba);

  const rgbaReadout = document.getElementById("cpReadoutRgba");
  if (rgbaReadout) rgbaReadout.textContent = rgbaToExplicitString(rgba);

  const hexReadout = document.getElementById("cpReadoutHex");
  if (hexReadout) hexReadout.textContent = rgbaToHex(rgba, true);

  const nativeInput = document.getElementById("cpNativeColorInput");
  if (nativeInput) nativeInput.value = rgbaToHex(rgba, false);

  const svPad = document.getElementById("cpSvPad");
  if (svPad?.style) svPad.style.backgroundColor = `hsl(${hsv.h}, 100%, 50%)`;

  const svThumb = document.getElementById("cpSvThumb");
  if (svThumb?.style) {
    svThumb.style.left = `${Math.max(0, Math.min(100, hsv.s))}%`;
    svThumb.style.top = `${100 - Math.max(0, Math.min(100, hsv.v))}%`;
    svThumb.style.backgroundColor = `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
  }

  const hueSlider = document.getElementById("cpHueSlider");
  const hueVal = document.getElementById("cpHueVal");
  if (hueSlider) hueSlider.value = String(hsv.h);
  if (hueVal) hueVal.textContent = `${hsv.h}°`;

  const rRange = document.getElementById("cpRangeR");
  const rNum = document.getElementById("cpNumR");
  const gRange = document.getElementById("cpRangeG");
  const gNum = document.getElementById("cpNumG");
  const bRange = document.getElementById("cpRangeB");
  const bNum = document.getElementById("cpNumB");
  const aRange = document.getElementById("cpRangeA");
  const aNum = document.getElementById("cpNumA");
  const aTrack = document.getElementById("cpAlphaTrackFill");

  if (rRange) {
    rRange.value = String(rgba.r);
    if (rRange.style) rRange.style.background = `linear-gradient(to right, rgb(0, ${rgba.g}, ${rgba.b}), rgb(255, ${rgba.g}, ${rgba.b}))`;
  }
  if (rNum) rNum.value = String(rgba.r);

  if (gRange) {
    gRange.value = String(rgba.g);
    if (gRange.style) gRange.style.background = `linear-gradient(to right, rgb(${rgba.r}, 0, ${rgba.b}), rgb(${rgba.r}, 255, ${rgba.b}))`;
  }
  if (gNum) gNum.value = String(rgba.g);

  if (bRange) {
    bRange.value = String(rgba.b);
    if (bRange.style) bRange.style.background = `linear-gradient(to right, rgb(${rgba.r}, ${rgba.g}, 0), rgb(${rgba.r}, ${rgba.g}, 255))`;
  }
  if (bNum) bNum.value = String(rgba.b);

  if (aRange) aRange.value = String(Math.round(rgba.a * 100));
  if (aNum) aNum.value = rgba.a.toFixed(2);
  if (aTrack?.style) {
    aTrack.style.background = `linear-gradient(to right, rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0), rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 1))`;
  }

  renderCustomThemeMiniPreview();
}

function setCustomThemeRoleColorFromRgba(nextRgba, syncHsv = true) {
  const ed = state.customThemeEditor;
  if (!ed.activeRole) return;
  const rgba = {
    r: clampByte(nextRgba?.r),
    g: clampByte(nextRgba?.g),
    b: clampByte(nextRgba?.b),
    a: clampAlpha(nextRgba?.a)
  };
  ed.colors[ed.activeRole] = rgbaToCssString(rgba);
  if (syncHsv) {
    const computed = rgbToHsv(rgba);
    const keepHue = (rgba.r === rgba.g && rgba.g === rgba.b) ? (ed.pickerHsv?.h || 0) : computed.h;
    ed.pickerHsv = { h: keepHue, s: computed.s, v: computed.v };
  }
  syncColorPickerUI();
  if (ed.open && ed.livePreview) {
    applyCustomThemeDraftPreview();
  }
}

function toggleCustomThemeRole(roleKey) {
  const ed = state.customThemeEditor;
  if (!CUSTOM_THEME_COLOR_FIELDS.some(f => f.key === roleKey)) return;
  if (ed.activeRole === roleKey) {
    ed.activeRole = null;
    syncActiveRoleDrawer();
    return;
  }
  ed.activeRole = roleKey;
  const rgba = parseCssColorToRgba(ed.colors[roleKey]);
  ed.pickerHsv = rgbToHsv(rgba);
  syncActiveRoleDrawer();
  syncColorPickerUI();
}

function selectCustomThemeEditorSlot(slotIndex) {
  const idx = Math.max(0, Math.min(2, Number(slotIndex) || 0));
  const ed = state.customThemeEditor;
  ed.slotIndex = idx;
  ed.activeRole = null;
  const existing = state.profile?.customThemes?.[idx];
  if (existing) {
    ed.name = existing.name;
    ed.colors = sanitizeCustomThemeColors(existing.colors);
  } else {
    ed.name = tf("Eigenes Theme {n}", "Custom Theme {n}", { n: idx + 1 });
    const tplKey = state.settings.theme === "metal"
      ? "metal-dark"
      : (state.settings.theme === "morgentau"
          ? "morgentau-light"
          : (state.settings.theme === "abenddaemmerung" ? "abenddaemmerung-light" : "waldlichtung-light"));
    ed.colors = getThemeEditorTemplateColors(tplKey);
  }
  const activeRgba = parseCssColorToRgba(ed.colors.bgBase);
  ed.pickerHsv = rgbToHsv(activeRgba);
}

function renderCustomThemeEditor() {
  const edEl = document.getElementById("customThemeEditor");
  if (!edEl) return;
  const ed = state.customThemeEditor;
  edEl.classList.toggle("hidden", !ed.open);
  if (!ed.open) {
    rescueColorPickerToHost();
    return;
  }

  document.querySelectorAll("[data-editor-slot]").forEach(btn => {
    const idx = parseInt(btn.dataset?.editorSlot, 10);
    btn.classList?.toggle("active", idx === ed.slotIndex);
    btn.textContent = getCustomThemeSlotLabel(idx);
  });

  const nameInput = document.getElementById("customThemeNameInput");
  if (nameInput && nameInput.value !== ed.name) {
    nameInput.value = ed.name;
  }

  const liveChk = document.getElementById("customThemeLivePreviewChk");
  if (liveChk) liveChk.checked = Boolean(ed.livePreview);

  const roleGrid = document.getElementById("customThemeRoleGrid");
  if (roleGrid) {
    rescueColorPickerToHost();
    roleGrid.innerHTML = CUSTOM_THEME_COLOR_FIELDS.map(f => {
      const val = ed.colors[f.key] || f.def;
      const isAct = ed.activeRole === f.key;
      const label = tr(f.de, f.en);
      return `
        <div class="theme-role-item ${isAct ? "is-open" : ""}" data-role-item="${f.key}">
          <button type="button" class="theme-role-chip ${isAct ? "active" : ""}" data-theme-role="${f.key}" aria-expanded="${String(isAct)}">
            <span class="theme-role-dot-wrap swatch-dot-checker"><span class="swatch-dot-fill theme-role-dot" style="background:${escapeHtml(val)};"></span></span>
            <span class="theme-role-text">
              <span class="theme-role-label">${escapeHtml(label)}</span>
              <span class="theme-role-val">${escapeHtml(val)}</span>
            </span>
            <span class="theme-role-chevron" aria-hidden="true">▾</span>
          </button>
          <div class="theme-role-drawer" data-role-drawer="${f.key}"></div>
        </div>
      `;
    }).join("");

    let dragStartX = 0;
    let dragStartY = 0;
    let touchMoved = false;
    roleGrid.querySelectorAll("[data-theme-role]").forEach(btn => {
      btn.addEventListener("pointerdown", (e) => {
        dragStartX = e.clientX || 0;
        dragStartY = e.clientY || 0;
        touchMoved = false;
      });
      btn.addEventListener("pointermove", (e) => {
        if (Math.abs((e.clientX || 0) - dragStartX) > 8 || Math.abs((e.clientY || 0) - dragStartY) > 8) {
          touchMoved = true;
        }
      });
      btn.addEventListener("click", () => {
        if (touchMoved) {
          touchMoved = false;
          return;
        }
        toggleCustomThemeRole(btn.dataset.themeRole);
      });
    });
  }

  syncActiveRoleDrawer();
  syncColorPickerUI();
  if (ed.livePreview) {
    applyCustomThemeDraftPreview();
  }
}

function openCustomThemeEditor(slotIndex = 0) {
  selectCustomThemeEditorSlot(slotIndex);
  state.customThemeEditor.open = true;
  renderCustomThemeEditor();
  document.getElementById("customThemeEditor")?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
}

function closeCustomThemeEditor(revertPreview = true) {
  state.customThemeEditor.open = false;
  state.customThemeEditor.activeRole = null;
  rescueColorPickerToHost();
  document.getElementById("customThemeEditor")?.classList.add("hidden");
  if (revertPreview) {
    applyThemeAndAppearance();
  }
}

function saveCustomThemeSlot() {
  const ed = state.customThemeEditor;
  const idx = Math.max(0, Math.min(2, Number(ed.slotIndex) || 0));
  const rawName = (document.getElementById("customThemeNameInput")?.value ?? ed.name).trim();
  const entry = sanitizeCustomThemeEntry({
    id: CUSTOM_THEME_SLOT_IDS[idx],
    name: rawName || tf("Eigenes Theme {n}", "Custom Theme {n}", { n: idx + 1 }),
    colors: ed.colors,
    updatedAt: Date.now()
  }, idx);

  if (!Array.isArray(state.profile.customThemes)) {
    state.profile.customThemes = [null, null, null];
  }
  state.profile.customThemes[idx] = entry;
  saveUserProfile(state.profile);
  ed.open = false;
  ed.activeRole = null;
  rescueColorPickerToHost();
  document.getElementById("customThemeEditor")?.classList.add("hidden");
  setThemePreference(entry.id);
  return entry;
}

function deleteCustomThemeSlot(slotIndex) {
  const idx = Math.max(0, Math.min(2, Number(slotIndex) || 0));
  if (!Array.isArray(state.profile.customThemes)) return;
  state.profile.customThemes[idx] = null;
  saveUserProfile(state.profile);

  const deletedId = CUSTOM_THEME_SLOT_IDS[idx];
  if (state.settings.theme === deletedId) {
    setThemePreference("waldlichtung");
  } else {
    renderCustomThemeSlots();
    renderSettingsCustomThemes();
  }
}

function renderCustomThemeSection() {
  renderCustomThemeStorageHint();
  renderCustomThemeSlots();
  renderSettingsCustomThemes();
  if (state.customThemeEditor?.open) {
    renderCustomThemeEditor();
  }
}

function setSpaceBackupStatus(msg, isError = false) {
  const el = document.getElementById("spaceBackupStatus");
  if (!el) return;
  el.textContent = msg;
  el.style.color = isError ? "var(--status-err)" : "var(--sage-strong)";
  el.classList.toggle("hidden", !msg);
}

function setSettingsAppResetStatus(msg) {
  const el = document.getElementById("settingsAppResetStatus");
  if (!el) return;
  el.textContent = msg;
  el.style.color = "var(--status-err)";
  el.classList.toggle("hidden", !msg);
}

function exportUserProfileJSON() {
  const cleanProf = sanitizeUserProfile(state.profile);
  cleanProf.customThemes = cleanProf.customThemes.map(t => t ? {
    id: t.id,
    slotIndex: t.slotIndex,
    name: t.name,
    colors: t.colors,
    updatedAt: t.updatedAt
  } : null);
  const payload = {
    app: "Lauschebaer",
    version: 1,
    progressStored: false,
    profile: cleanProf
  };
  return JSON.stringify(payload, null, 2);
}

function importUserProfileJSON(rawText) {
  try {
    const parsed = JSON.parse(String(rawText || ""));
    const candidate = parsed && parsed.profile ? parsed.profile : parsed;
    if (!candidate || typeof candidate !== "object") {
      return { ok: false, error: tr("Ungültiges Profil-Format.", "Invalid profile format.") };
    }
    state.profile = sanitizeUserProfile(candidate);
    saveUserProfile(state.profile);
    if (state.customThemeEditor) state.customThemeEditor.open = false;
    stopSessionTimer("idle", null, "idle");
    applyThemeAndAppearance();
    applyProfileDisplayChanges();
    renderProfileAccountView();
    renderHomeProfileGreeting();
    if (typeof sanitizeMetronomeMix === "function" && state.metronome) {
      state.metronome.mix = sanitizeMetronomeMix(state.profile.metronomeMix);
    }
    if (typeof syncMetronomeVolumeUI === "function") syncMetronomeVolumeUI();
    syncPianoSoundControls();
    syncDroneMixControls();
    resetBreakReminderTimer();
    syncBreakReminderControls();
    if (typeof renderMetronomeProfiles === "function") renderMetronomeProfiles();
    setSpaceBackupStatus(tr("Profil erfolgreich geladen!", "Profile loaded successfully!"));
    return { ok: true };
  } catch (_err) {
    setSpaceBackupStatus(tr("Datei konnte nicht als Profil gelesen werden.", "Could not read file as a profile."), true);
    return { ok: false, error: "Parse error" };
  }
}

function resetUserProfile() {
  state.profile = createDefaultProfile();
  const langCfg = typeof getLanguageConfig === "function" ? getLanguageConfig(state.settings.language) : null;
  if (langCfg) {
    if (!state.profile.notationManual) state.profile.notation = langCfg.defaultNotation;
    if (!state.profile.intervalNotationManual) state.profile.intervalNotation = langCfg.defaultIntervalNotation;
  } else if (state.settings.language === "en") {
    if (!state.profile.notationManual) state.profile.notation = "intl";
    if (!state.profile.intervalNotationManual) state.profile.intervalNotation = "intl";
  }
  saveUserProfile(state.profile);
  if (state.customThemeEditor) state.customThemeEditor.open = false;
  if (CUSTOM_THEME_SLOT_IDS.includes(state.settings.theme)) {
    state.settings.theme = "waldlichtung";
    saveVisualPrefs(state.settings.appearance, state.settings.theme, state.settings.language);
  }
  state.resetConfirmArmed = false;
  state.appResetConfirmArmed = false;
  state.examHistoryClearArmed = false;
  state.streakState = { count: 0, activeNoticeMilestone: 0 };
  if (typeof renderStageStreakUI === "function") renderStageStreakUI();
  stopSessionTimer("idle", null, "idle");
  resetBreakReminderTimer();
  syncBreakReminderControls();
  if (typeof resetMetronomeStateToDefault === "function") resetMetronomeStateToDefault();
  syncPianoSoundControls();
  syncDroneMixControls();
  applyThemeAndAppearance();
  applyProfileDisplayChanges();
  renderProfileAccountView();
  renderHomeProfileGreeting();
  const resetBtn = document.getElementById("resetProfileBtn");
  if (resetBtn) {
    resetBtn.textContent = tr("Konto zurücksetzen", "Reset Account");
    resetBtn.classList.remove("is-confirm-armed");
  }
  const appResetBtn = document.getElementById("appResetBtn");
  if (appResetBtn) {
    appResetBtn.textContent = tr("App-Reset", "App Reset");
    appResetBtn.classList.remove("is-confirm-armed");
  }
  setSettingsAppResetStatus("");
  setSpaceBackupStatus(tr("Lokales Konto auf Standardwerte zurückgesetzt.", "Local account reset to defaults."));
}

function performFullAppReset() {
  if (typeof stopMetronome === "function") stopMetronome();
  audioEngine?.stopPlayback?.();
  state.isPlaying = false;
  updatePlayButtonUI?.(false);
  stopSessionTimer("idle", null, "idle");

  state.appResetConfirmArmed = false;
  state.resetConfirmArmed = false;
  state.examHistoryClearArmed = false;
  state.exam = null;
  state.streakState = { count: 0, activeNoticeMilestone: 0 };
  if (typeof renderStageStreakUI === "function") renderStageStreakUI();

  state.profile = createDefaultProfile();
  state.settings.appearance = "light";
  state.settings.theme = "waldlichtung";
  state.settings.language = "de";
  state.settings.autoNextAfterCorrect = true;
  state.settings.playCorrectAnswerAudio = true;
  state.settings.solfegeAutoNext = true;
  state.settings.melodyAutoNext = true;
  state.settings.rhythmDictationAutoNext = true;
  state.settings.rhythmTapAutoNext = true;
  state.settings.onboardingDone = false;
  if (state.customThemeEditor) state.customThemeEditor.open = false;

  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(VISUAL_PREFS_STORAGE_KEY);
      localStorage.removeItem(PERSONAL_PROFILE_STORAGE_KEY);
      localStorage.removeItem(CUSTOM_THEMES_STORAGE_KEY);
    }
  } catch (_err) {
    // Auf eingeschränkten WebViews ignorieren
  }

  clearCustomThemeCssVars();
  applyThemeAndAppearance();
  if (typeof applyStaticDomLanguage === "function") {
    applyStaticDomLanguage("de");
  }
  syncLanguageControls("de");
  syncAnswerSoundToggleUI();
  syncAutoNextControls();
  syncPianoSoundControls();
  syncDroneMixControls();

  const backupDisc = document.getElementById("spaceBackupDisclosure");
  if (backupDisc) {
    backupDisc.open = false;
    backupDisc.removeAttribute?.("open");
  }
  const resetBtn = document.getElementById("resetProfileBtn");
  if (resetBtn) {
    resetBtn.textContent = tr("Konto zurücksetzen", "Reset Account");
    resetBtn.classList.remove("is-confirm-armed");
  }
  const appResetBtn = document.getElementById("appResetBtn");
  if (appResetBtn) {
    appResetBtn.textContent = tr("App-Reset", "App Reset");
    appResetBtn.classList.remove("is-confirm-armed");
  }
  setSettingsAppResetStatus("");
  const statusEl = document.getElementById("spaceBackupStatus");
  if (statusEl) {
    statusEl.textContent = "";
    statusEl.classList.add("hidden");
  }

  renderProfileAccountView();
  renderHomeProfileGreeting();
  renderHomeQuickMixBar();
  if (typeof resetMetronomeStateToDefault === "function") resetMetronomeStateToDefault();
  state.updateQuickStartLabel();
  renderKnowledgeHub();
  pickRandomQuote();
  generateExercise();

  setModalVisibility(null);
  switchView("home", { animate: false, skipHistoryPush: true });
  replaceAppHistory(null);
  openFirstRunOnboarding();
}

// =====================================================
// MARKENNAME „Lauscher“: überall fett & kursiv
// Texte werden fast überall per textContent gesetzt. Ein MutationObserver
// umschließt deshalb jedes sichtbare „Lauscher“ automatisch mit
// <span class="brand-word"> (Stil in styles.css).
// =====================================================
const BRAND_WORD = "Lauscher";
const BRAND_WORD_SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT", "OPTION", "TITLE", "NOSCRIPT"]);

function isBrandWordSkippedNode(textNode) {
  let el = textNode.parentElement;
  while (el) {
    if (el.classList?.contains("brand-word")) return true;
    if (BRAND_WORD_SKIP_TAGS.has(el.tagName)) return true;
    if (el.isContentEditable) return true;
    if (el.namespaceURI === "http://www.w3.org/2000/svg") return true;
    el = el.parentElement;
  }
  return false;
}

function wrapBrandWordInTextNode(textNode) {
  const text = textNode.nodeValue;
  if (!text || !text.includes(BRAND_WORD) || !textNode.parentNode) return;
  if (isBrandWordSkippedNode(textNode)) return;
  const frag = document.createDocumentFragment();
  const parts = text.split(BRAND_WORD);
  parts.forEach((part, idx) => {
    if (part) frag.appendChild(document.createTextNode(part));
    if (idx < parts.length - 1) {
      const span = document.createElement("span");
      span.className = "brand-word";
      span.textContent = BRAND_WORD;
      frag.appendChild(span);
    }
  });
  textNode.parentNode.replaceChild(frag, textNode);
}

function wrapBrandWordsIn(root) {
  if (!root) return;
  if (root.nodeType === 3) {
    wrapBrandWordInTextNode(root);
    return;
  }
  if (root.nodeType !== 1 && root.nodeType !== 11) return;
  if (!root.textContent || !root.textContent.includes(BRAND_WORD)) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const hits = [];
  while (walker.nextNode()) {
    if (walker.currentNode.nodeValue.includes(BRAND_WORD)) hits.push(walker.currentNode);
  }
  hits.forEach(wrapBrandWordInTextNode);
}

function startBrandWordStyling() {
  if (typeof document === "undefined" || !document.body || typeof MutationObserver !== "function") return;
  wrapBrandWordsIn(document.body);
  const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
      if (m.type === "characterData") {
        wrapBrandWordsIn(m.target);
      } else {
        m.addedNodes.forEach(node => wrapBrandWordsIn(node));
      }
    }
  });
  observer.observe(document.body, { childList: true, characterData: true, subtree: true });
}

document.addEventListener("DOMContentLoaded", () => {
  startBrandWordStyling();
  bindGlobalPointerInputTracker();
  hydrateMascotStaticSlots();
  if (typeof applyStaticDomLanguage === "function") {
    applyStaticDomLanguage(state.settings.language);
  }
  syncLanguageControls(state.settings.language);
  renderHomeProfileGreeting();
  renderProfileAccountView();
  populateMixCreatorControls();

  pickRandomQuote();
  state.updateQuickStartLabel();
  renderKnowledgeHub();
  generateExercise();

  // Globale Aktivitätserfassung für den automatischen Inaktivitäts-Stopp des Session-Timers
  let lastActivitySampleMs = 0;
  const onAnyUserActivity = () => {
    const now = Date.now();
    if (now - lastActivitySampleMs < 1000) return;
    lastActivitySampleMs = now;
    markSessionActivity();
  };
  document.addEventListener("pointerdown", onAnyUserActivity);
  document.addEventListener("keydown", onAnyUserActivity);
  document.addEventListener("scroll", onAnyUserActivity);
  document.addEventListener("visibilitychange", () => {
    const st = state.sessionTimer;
    const br = state.breakReminder;
    if (document.hidden) {
      if (st && st.status === "running") st.hiddenSinceWallMs = Date.now();
      if (br) br.hiddenSinceWallMs = Date.now();
    } else {
      if (br) {
        br.hiddenSinceWallMs = null;
        br.lastActivityWallMs = Date.now();
      }
      if (st && st.status === "running" && st.hiddenSinceWallMs !== null) {
        const idleLimitMs = (state.profile.inactivityMinutes || 3) * 60 * 1000;
        if (Date.now() - st.hiddenSinceWallMs >= idleLimitMs) {
          stopSessionTimer("auto-stopped", null, "auto-stopped-pause");
        } else {
          st.hiddenSinceWallMs = null;
          markSessionActivity();
        }
      }
    }
  });

  // Konto-Steuerung: Profil, Session-Timer, Übe-Mixe, Notation & Backup
  document.getElementById("profileNameInput")?.addEventListener("input", (e) => {
    state.profile.name = String(e.target.value || "").trim().slice(0, 24);
    saveUserProfile(state.profile);
    const titleEl = document.getElementById("spaceGreetingTitle");
    if (titleEl) {
      titleEl.textContent = state.profile.name
        ? tf("Hallo, {name}!", "Hi, {name}!", { name: state.profile.name })
        : tr("Dein Musiker-Profil", "Your Musician Profile");
    }
    renderHomeProfileGreeting();
  });

  document.querySelectorAll("[data-timer-mins]").forEach(btn => {
    btn.addEventListener("click", () => setSessionDurationMinutes(btn.dataset.timerMins));
  });
  document.querySelectorAll("[data-timer-idle]").forEach(btn => {
    btn.addEventListener("click", () => setSessionIdleMinutes(btn.dataset.timerIdle));
  });
  document.getElementById("timerToggleBtn")?.addEventListener("click", () => {
    if (state.sessionTimer.status === "running") pauseSessionTimer();
    else startOrResumeSessionTimer();
  });
  document.getElementById("timerResetBtn")?.addEventListener("click", () => {
    stopSessionTimer("idle", null, "idle");
  });

  document.getElementById("mixModeSelect")?.addEventListener("change", () => {
    populateMixCreatorControls();
  });
  document.getElementById("mixToggleCreateBtn")?.addEventListener("click", () => {
    const form = document.getElementById("mixCreatorForm");
    if (!form) return;
    populateMixCreatorControls();
    form.classList.toggle("hidden");
  });
  document.getElementById("mixCreateCancelBtn")?.addEventListener("click", () => {
    document.getElementById("mixCreatorForm")?.classList.add("hidden");
  });
  document.getElementById("mixCreateSaveBtn")?.addEventListener("click", () => {
    const title = document.getElementById("mixNameInput")?.value || "";
    const mode = document.getElementById("mixModeSelect")?.value || "cadence";
    const level = document.getElementById("mixLevelSelect")?.value || 1;
    const bpm = parseInt(document.getElementById("mixBpmSelect")?.value || "0", 10);
    const created = sanitizeMixEntry({
      id: `mix_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      title: title,
      mode: mode,
      level: level,
      melodyRange: mode === "melody" ? level : "do-fa",
      bpm: bpm
    });
    if (created) {
      state.profile.mixes = [created, ...(state.profile.mixes || [])].slice(0, 16);
      saveUserProfile(state.profile);
      renderProfileMixes();
      if (document.getElementById("mixNameInput")) document.getElementById("mixNameInput").value = "";
      document.getElementById("mixCreatorForm")?.classList.add("hidden");
    }
  });
  document.getElementById("mixSaveCurrentBtn")?.addEventListener("click", () => {
    captureCurrentExerciseAsMix();
  });

  // Nutzer-Reiter: Eigene Themes (3 Speicherplätze) & RGBA Color-Picker
  document.getElementById("toggleCustomThemeEditorBtn")?.addEventListener("click", () => {
    if (state.customThemeEditor.open) {
      closeCustomThemeEditor(true);
      return;
    }
    const activeSlotIdx = CUSTOM_THEME_SLOT_IDS.indexOf(state.settings.theme);
    const firstEmptyIdx = (state.profile?.customThemes || []).findIndex(slot => !slot);
    const targetSlot = activeSlotIdx >= 0 ? activeSlotIdx : (firstEmptyIdx >= 0 ? firstEmptyIdx : 0);
    openCustomThemeEditor(targetSlot);
  });

  document.querySelectorAll("[data-editor-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.editorSlot, 10) || 0;
      selectCustomThemeEditorSlot(idx);
      renderCustomThemeEditor();
    });
  });

  document.getElementById("customThemeNameInput")?.addEventListener("input", (e) => {
    state.customThemeEditor.name = String(e.target.value || "").slice(0, 28);
    renderCustomThemeMiniPreview();
  });

  document.getElementById("customThemeLoadTemplateBtn")?.addEventListener("click", () => {
    const sel = document.getElementById("customThemeTemplateSelect");
    const tplKey = sel?.value || "waldlichtung-light";
    state.customThemeEditor.colors = getThemeEditorTemplateColors(tplKey);
    if (state.customThemeEditor.activeRole) {
      const activeRgba = parseCssColorToRgba(state.customThemeEditor.colors[state.customThemeEditor.activeRole]);
      state.customThemeEditor.pickerHsv = rgbToHsv(activeRgba);
    }
    syncColorPickerUI();
    if (state.customThemeEditor.open && state.customThemeEditor.livePreview) {
      applyCustomThemeDraftPreview();
    }
  });

  const bindRgbaChannelControl = (channelKey, rangeId, numId) => {
    const onChannelInput = (rawVal) => {
      const ed = state.customThemeEditor;
      if (!ed.activeRole) return;
      const cur = parseCssColorToRgba(ed.colors[ed.activeRole]);
      if (channelKey === "a") {
        cur.a = rangeId === numId ? clampAlpha(rawVal) : clampAlpha(parseFloat(rawVal));
      } else {
        cur[channelKey] = clampByte(rawVal);
      }
      setCustomThemeRoleColorFromRgba(cur, channelKey !== "a");
    };
    document.getElementById(rangeId)?.addEventListener("input", (e) => {
      const val = channelKey === "a" ? (parseFloat(e.target.value) / 100) : e.target.value;
      onChannelInput(val);
    });
    document.getElementById(numId)?.addEventListener("input", (e) => {
      onChannelInput(e.target.value);
    });
  };
  bindRgbaChannelControl("r", "cpRangeR", "cpNumR");
  bindRgbaChannelControl("g", "cpRangeG", "cpNumG");
  bindRgbaChannelControl("b", "cpRangeB", "cpNumB");
  bindRgbaChannelControl("a", "cpRangeA", "cpNumA");

  document.getElementById("cpHueSlider")?.addEventListener("input", (e) => {
    const ed = state.customThemeEditor;
    if (!ed.activeRole) return;
    const h = Math.max(0, Math.min(360, parseInt(e.target.value, 10) || 0));
    ed.pickerHsv = { ...(ed.pickerHsv || { h: 0, s: 100, v: 100 }), h };
    const rgb = hsvToRgb(ed.pickerHsv);
    const cur = parseCssColorToRgba(ed.colors[ed.activeRole]);
    setCustomThemeRoleColorFromRgba({ ...rgb, a: cur.a }, false);
  });

  document.getElementById("cpNativeColorInput")?.addEventListener("input", (e) => {
    const ed = state.customThemeEditor;
    if (!ed.activeRole) return;
    const parsed = parseCssColorToRgba(e.target.value);
    const cur = parseCssColorToRgba(ed.colors[ed.activeRole]);
    setCustomThemeRoleColorFromRgba({ r: parsed.r, g: parsed.g, b: parsed.b, a: cur.a }, true);
  });

  const svPad = document.getElementById("cpSvPad");
  if (svPad) {
    let svDragging = false;
    const updateSvFromPointer = (clientX, clientY) => {
      const ed = state.customThemeEditor;
      if (!ed.activeRole) return;
      const rect = svPad.getBoundingClientRect?.();
      if (!rect || !rect.width || !rect.height) return;
      const xRatio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const yRatio = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      const hue = ed.pickerHsv?.h || 0;
      ed.pickerHsv = { h: hue, s: Math.round(xRatio * 100), v: Math.round((1 - yRatio) * 100) };
      const rgb = hsvToRgb(ed.pickerHsv);
      const cur = parseCssColorToRgba(ed.colors[ed.activeRole]);
      setCustomThemeRoleColorFromRgba({ ...rgb, a: cur.a }, false);
    };
    svPad.addEventListener("pointerdown", (e) => {
      svDragging = true;
      svPad.setPointerCapture?.(e.pointerId);
      updateSvFromPointer(e.clientX, e.clientY);
    });
    svPad.addEventListener("pointermove", (e) => {
      if (svDragging) updateSvFromPointer(e.clientX, e.clientY);
    });
    const endSvDrag = () => { svDragging = false; };
    svPad.addEventListener("pointerup", endSvDrag);
    svPad.addEventListener("pointercancel", endSvDrag);
  }

  document.getElementById("customThemeLivePreviewChk")?.addEventListener("change", (e) => {
    state.customThemeEditor.livePreview = Boolean(e.target.checked);
    if (state.customThemeEditor.livePreview) {
      applyCustomThemeDraftPreview();
    } else {
      applyThemeAndAppearance();
    }
  });

  document.getElementById("customThemeSaveBtn")?.addEventListener("click", () => {
    saveCustomThemeSlot();
  });

  document.getElementById("customThemeCancelBtn")?.addEventListener("click", () => {
    closeCustomThemeEditor(true);
  });

  document.querySelectorAll("[data-notation]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.profile.notation = btn.dataset.notation === "intl" ? "intl" : "de";
      state.profile.notationManual = true;
      saveUserProfile(state.profile);
      applyProfileDisplayChanges();
      renderProfileAccountView();
    });
  });
  document.querySelectorAll("[data-interval-notation]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.profile.intervalNotation = btn.dataset.intervalNotation === "intl" ? "intl" : "de";
      state.profile.intervalNotationManual = true;
      saveUserProfile(state.profile);
      applyProfileDisplayChanges();
      renderProfileAccountView();
    });
  });
  document.querySelectorAll("[data-solfege-labels]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.profile.solfegeLabels = btn.dataset.solfegeLabels === "numbers" ? "numbers" : "syllables";
      saveUserProfile(state.profile);
      applyProfileDisplayChanges();
      renderProfileAccountView();
    });
  });

  document.getElementById("exportProfileBtn")?.addEventListener("click", () => {
    const json = exportUserProfileJSON();
    if (typeof Blob !== "undefined" && typeof URL !== "undefined" && typeof URL.createObjectURL === "function") {
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lauschebaer-profil.json";
      document.body?.appendChild?.(a);
      a.click?.();
      a.remove?.();
      URL.revokeObjectURL(url);
    }
    setSpaceBackupStatus(tr("Profil-Datei erstellt (kein Fortschritt enthalten).", "Profile file created (no progress data included)."));
  });
  document.getElementById("importProfileBtn")?.addEventListener("click", () => {
    document.getElementById("importProfileFile")?.click?.();
  });
  document.getElementById("importProfileFile")?.addEventListener("change", (e) => {
    const file = e.target?.files?.[0];
    if (!file || typeof FileReader === "undefined") return;
    const reader = new FileReader();
    reader.onload = () => {
      importUserProfileJSON(reader.result);
    };
    reader.readAsText(file);
    e.target.value = "";
  });
  document.getElementById("resetProfileBtn")?.addEventListener("click", () => {
    const btn = document.getElementById("resetProfileBtn");
    if (!state.resetConfirmArmed) {
      state.resetConfirmArmed = true;
      if (btn) {
        btn.textContent = tr("Wirklich leeren?", "Confirm reset?");
        btn.classList.add("is-confirm-armed");
      }
      setSpaceBackupStatus(tr("Tippe erneut auf „Wirklich leeren?“, um das Konto zurückzusetzen.", "Tap “Confirm reset?” again to reset your local account."), true);
      setTimeout(() => {
        state.resetConfirmArmed = false;
        const b = document.getElementById("resetProfileBtn");
        if (b) {
          b.textContent = tr("Konto zurücksetzen", "Reset Account");
          b.classList.remove("is-confirm-armed");
        }
      }, 4200);
      return;
    }
    resetUserProfile();
  });
  document.getElementById("appResetBtn")?.addEventListener("click", () => {
    const btn = document.getElementById("appResetBtn");
    if (!state.appResetConfirmArmed) {
      state.appResetConfirmArmed = true;
      if (btn) {
        btn.textContent = tr("App-Reset bestätigen?", "Confirm App Reset?");
        btn.classList.add("is-confirm-armed");
      }
      setSettingsAppResetStatus(tr("Tippe erneut auf „App-Reset bestätigen?“, um alle lokalen Daten zu löschen und das Willkommens-Intro neu zu starten.", "Tap “Confirm App Reset?” again to clear all local data and restart with the welcome intro."));
      setTimeout(() => {
        state.appResetConfirmArmed = false;
        const b = document.getElementById("appResetBtn");
        if (b) {
          b.textContent = tr("App-Reset", "App Reset");
          b.classList.remove("is-confirm-armed");
        }
        setSettingsAppResetStatus("");
      }, 4200);
      return;
    }
    performFullAppReset();
  });

  document.getElementById("refreshQuoteBtn")?.addEventListener("click", () => {
    pickRandomQuote();
  });

  // Untere 3-Icon Reiter-Navigation
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.nav;
      if (target) navigateToMainTab(target);
    });
  });

  // Zurück-Pfeil oben links
  document.getElementById("backBtn")?.addEventListener("click", () => {
    navigateBackFromUI();
  });

  // Startseite: Übungstyp-Karten öffnen die Kategorie-Unterseite
  document.querySelectorAll("[data-open-category]").forEach(card => {
    card.addEventListener("click", () => {
      openCategoryPage(card.dataset.openCategory);
    });
  });

  // Startseite: Metronom-Kachel öffnet das Praxis-Metronom
  document.getElementById("openMetronomeBtn")?.addEventListener("click", () => {
    openMetronomeView("home");
  });
  initMetronomeEventListeners();

  // Wissens-Hub: Reiter (Theorie & Artikel / Instrumentenkunde) & Kacheln
  document.querySelectorAll("[data-ktab]").forEach(btn => {
    btn.addEventListener("click", () => {
      setKnowledgeTab(btn.dataset.ktab);
    });
  });
  setKnowledgeTab(state.activeKnowledgeTab);

  document.querySelectorAll("[data-open-ref]").forEach(tile => {
    tile.addEventListener("click", () => {
      openKnowledgeRef(tile.dataset.openRef);
    });
  });

  // Hero-Karte: Weiterüben & Zufall
  document.getElementById("quickStartBtn")?.addEventListener("click", () => {
    state.exerciseReturnView = "home";
    switchView("exercise");
  });

  document.getElementById("surpriseStartBtn")?.addEventListener("click", () => {
    const modes = [
      "cadence", "interval-melodic", "interval-melodic-down", "interval-harmonic", "interval-drone",
      "chord-arp-up", "chord-arp-down", "interval-chords", "chord-inversions",
      "solfege", "melody",
      "rhythm-meter", "rhythm-dictation", "rhythm-tap", "rhythm-groove",
      "prod-tone", "prod-eq-noise",
      "modes-scale", "modes-char", "modes-cadence",
      "notation-treble", "notation-bass", "notation-alto", "notation-mixed"
    ];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    state.setMode(randomMode);
    if (randomMode === "cadence") {
      state.setDifficulty(Math.floor(Math.random() * 4) + 1);
      state.setCadencePos(Math.random() < 0.5 ? "last" : "random");
    } else if (isChordQualityMode(randomMode)) {
      state.setChordDifficulty(Math.floor(Math.random() * 4) + 1);
    } else if (randomMode === "chord-inversions") {
      state.setChordInversionDifficulty(Math.floor(Math.random() * 3) + 1);
    } else if (randomMode === "melody") {
      const ranges = ["do-fa", "sol-do", "full"];
      state.setMelodyConfig(
        ranges[Math.floor(Math.random() * ranges.length)],
        Math.random() < 0.5 ? "fixed" : "random",
        Math.random() < 0.5 ? "single" : "multi"
      );
    } else if (randomMode === "rhythm-meter") {
      state.setRhythmLevel("rhythm-meter", Math.floor(Math.random() * 3) + 1);
    } else if (randomMode.startsWith("rhythm-")) {
      state.setRhythmLevel(randomMode, Math.floor(Math.random() * 4) + 1);
    } else if (randomMode.startsWith("prod-")) {
      state.setProdLevel(randomMode, Math.floor(Math.random() * 3) + 1);
    } else if (randomMode === "modes-cadence") {
      state.setModesLevel(randomMode, Math.floor(Math.random() * 2) + 1);
    } else if (randomMode.startsWith("modes-")) {
      state.setModesLevel(randomMode, Math.floor(Math.random() * 3) + 1);
    } else if (isNotationMode(randomMode)) {
      state.setNotationLevel(Math.floor(Math.random() * 4) + 1);
    } else if (randomMode !== "solfege") {
      state.setIntervalDifficulty(Math.floor(Math.random() * 3) + 1);
    }
    state.exerciseReturnView = "home";
    switchView("exercise");
  });

  // Transport-Steuerung in der Übung
  syncAnswerSoundToggleUI();
  document.getElementById("answerSoundToggleBtn")?.addEventListener("click", () => {
    if (state.exam?.active || !isNotationMode(state.currentExercise?.type)) return;
    setPlayCorrectAnswerAudioPreference(!(state.settings.playCorrectAnswerAudio !== false));
  });
  document.getElementById("listenOnlyBtn")?.addEventListener("click", () => {
    if (state.exam?.active) return;
    setListenOnlyMode(!state.listenOnly.active);
  });

  document.getElementById("playBtn")?.addEventListener("click", () => {
    if (state.exam?.active) {
      if (state.exam.currentAnswered && state.exam.feedbackMode === "instant") {
        advanceExamQuestion();
        return;
      }
      if (state.isPlaying) stopPlayback();
      else triggerExamPlayAction();
      return;
    }
    if (state.listenOnly.active) {
      setListenOnlyMode(false);
      return;
    }
    if (state.settings.mode === "solfege" && state.solfegeAnswered) {
      generateExercise();
      playSequence();
      return;
    }
    if (state.isPlaying) stopPlayback();
    else playSequence();
  });

  document.getElementById("skipBtn")?.addEventListener("click", () => {
    if (state.exam?.active) {
      if (state.exam.currentAnswered) {
        advanceExamQuestion();
      } else {
        skipCurrentExamQuestion();
      }
      return;
    }
    if (isNotationMode(state.settings.mode)) {
      skipNotationNote();
      return;
    }
    if (state.listenOnly.active) {
      cancelListenOnlyTimers();
      stopPlayback();
      generateExercise();
      startListenOnlyCycle();
      return;
    }
    stopPlayback();
    generateExercise();
    if (state.settings.mode === "solfege" || state.settings.mode === "melody" || state.settings.mode === "rhythm-dictation") {
      playSequence();
    }
  });

  document.getElementById("repeatToneBtn")?.addEventListener("click", () => {
    if (state.listenOnly.active) {
      setListenOnlyMode(false, { keepPlayback: true });
    }
    repeatSolfegeTargetTone();
  });

  document.getElementById("examNextQuestionBtn")?.addEventListener("click", () => {
    if (state.exam?.active) advanceExamQuestion();
  });
  document.getElementById("examAbortBtn")?.addEventListener("click", () => {
    requestExamAbort();
  });
  document.getElementById("examContinueBtn")?.addEventListener("click", () => {
    cancelExamAbort();
  });
  document.getElementById("examConfirmAbortBtn")?.addEventListener("click", () => {
    abortCategoryExam();
  });
  document.getElementById("clearExamHistoryBtn")?.addEventListener("click", () => {
    handleClearExamHistoryClick();
  });
  document.getElementById("toggleAllExamHistoryBtn")?.addEventListener("click", () => {
    state.examHistoryShowAll = !state.examHistoryShowAll;
    renderExamHistoryCard();
  });

  const loopBtn = document.getElementById("loopToggleBtn");
  loopBtn?.addEventListener("click", () => {
    if (state.exam?.active) return;
    if (state.settings.mode === "melody") {
      state.settings.melodyAutoNext = !state.settings.melodyAutoNext;
      loopBtn.classList.toggle("btn-active", state.settings.melodyAutoNext);
    } else if (state.settings.mode === "rhythm-dictation") {
      state.settings.rhythmDictationAutoNext = !state.settings.rhythmDictationAutoNext;
      loopBtn.classList.toggle("btn-active", state.settings.rhythmDictationAutoNext);
    } else if (state.settings.mode === "rhythm-tap") {
      state.settings.rhythmTapAutoNext = !state.settings.rhythmTapAutoNext;
      loopBtn.classList.toggle("btn-active", state.settings.rhythmTapAutoNext);
    } else {
      state.settings.loop = !state.settings.loop;
      if (state.settings.loop && state.listenOnly.active) {
        setListenOnlyMode(false, { keepPlayback: true });
      }
      loopBtn.classList.toggle("btn-active", state.settings.loop);
      if (state.settings.mode === "solfege") {
        const ex = state.currentExercise;
        if (state.settings.loop) {
          if (!state.isPlaying && ex?.solfegePromptPlayed && !state.solfegeAnswered) {
            startSolfegeTargetLoop(true);
          }
        } else if (state.isPlaying && ex?.solfegePromptPlayed && !state.solfegeAnswered) {
          stopPlayback();
        }
      }
    }
  });

  // Tonart-Button links neben Tonika (spielt in Solfège den Tonika-Dreiklang der aktuellen Tonart an)
  document.getElementById("solfegeKeyBtn")?.addEventListener("click", async () => {
    await ensureAudioReady();
    const rootMidi = HARMONIC_DATA.roots[state.currentKey].midi;
    const tonicNotes = buildChordNotes(rootMidi, HARMONIC_DATA.degrees["I"]);
    audioEngine.playStep(tonicNotes.chordNotes, 1.15, tonicNotes.bassNote, "cadence");
  });

  // Tonika / Ausgangston / Rhythmus-Klick-Referenz
  document.getElementById("tonicRefBtn")?.addEventListener("click", async () => {
    await ensureAudioReady();
    const mode = state.settings.mode;
    const ex = state.currentExercise;

    if (mode === "rhythm-tap") {
      if (ex?.blind) return;
      state.settings.rhythmTapClick = !state.settings.rhythmTapClick;
      const btn = document.getElementById("tonicRefBtn");
      const lbl = document.getElementById("tonicRefLabel");
      if (lbl) lbl.textContent = state.settings.rhythmTapClick ? tr("Klick: An", "Click: On") : tr("Klick: Aus", "Click: Off");
      if (btn) btn.classList.toggle("click-muted", !state.settings.rhythmTapClick);
      if (state.settings.rhythmTapClick) {
        audioEngine.triggerPercussion("tick", null, 0.72);
      }
      return;
    }

    if (mode === "prod-tone") {
      if (state.listenOnly.active) {
        setListenOnlyMode(false, { keepPlayback: true });
      }
      audioEngine.stopPlayback();
      audioEngine.playProductionTone(1000, 1.05);
      return;
    }

    if (mode === "prod-eq-noise") {
      if (state.listenOnly.active && (!state.isPlaying || !audioEngine.activeNoiseSession)) {
        setListenOnlyMode(false, { keepPlayback: true });
      }
      await triggerProdEqNoiseComparison(null);
      return;
    }

    if (mode.startsWith("modes-") && ex?.anchorNotes) {
      audioEngine.playStep(ex.anchorNotes, 1.2, null, "cadence");
      return;
    }

    if (isNotationMode(mode)) return;

    if (mode.startsWith("rhythm-")) {
      const beatMs = 60000 / (state.activeBpm || 90);
      audioEngine.playRhythmSequence([
        [0, "accent", 0.92],
        [Math.round(beatMs), "tick", 0.68],
        [Math.round(2 * beatMs), "tick", 0.68],
        [Math.round(3 * beatMs), "tick", 0.68]
      ]);
      return;
    }

    const rootMidi = HARMONIC_DATA.roots[state.currentKey].midi;
    if (mode === "cadence") {
      const tonicNotes = buildChordNotes(rootMidi, HARMONIC_DATA.degrees["I"]);
      audioEngine.playStep(tonicNotes.chordNotes, 1.2, tonicNotes.bassNote, "cadence");
    } else if ((mode.startsWith("interval") || isChordMode(mode)) && ex?.targetItem?.refNote) {
      audioEngine.playStep([ex.targetItem.refNote], 1.1, null, "cadence");
    } else {
      const refNote = midiToNote(rootMidi);
      audioEngine.playStep([refNote], 1.1, null, "cadence");
    }
  });

  // Master-Lautstärke Popover & Mute
  const volBtn = document.getElementById("masterVolBtn");
  const volPopover = document.getElementById("masterVolPopover");
  const volSlider = document.getElementById("masterVolSlider");
  const volVal = document.getElementById("masterVolVal");
  const muteBtn = document.getElementById("masterMuteToggle");

  volBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = volPopover.classList.toggle("hidden");
    volBtn.classList.toggle("btn-open", !isHidden);
  });

  volPopover?.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("click", () => {
    if (volPopover && !volPopover.classList.contains("hidden")) {
      volPopover.classList.add("hidden");
      volBtn?.classList.remove("btn-open");
    }
  });

  volSlider?.addEventListener("input", async (e) => {
    state.master.volume = parseFloat(e.target.value);
    if (state.master.volume > 0 && state.master.muted) {
      state.master.muted = false;
      muteBtn.textContent = tr("An", "On");
      muteBtn.title = tr("Stummschalten", "Mute Audio");
      muteBtn.classList.remove("muted");
    }
    volVal.textContent = `${Math.round(state.master.volume * 100)}%`;
    await ensureAudioReady();
    audioEngine.setMasterVolume(state.master.volume, state.master.muted);
  });

  muteBtn?.addEventListener("click", async () => {
    state.master.muted = !state.master.muted;
    muteBtn.textContent = state.master.muted ? tr("Stumm", "Muted") : tr("An", "On");
    muteBtn.title = state.master.muted ? tr("Ton einschalten", "Unmute Audio") : tr("Stummschalten", "Mute Audio");
    muteBtn.classList.toggle("muted", state.master.muted);
    await ensureAudioReady();
    audioEngine.setMasterVolume(state.master.volume, state.master.muted);
  });

  // Modals öffnen & schließen
  const mixerModal = document.getElementById("mixerBackdrop");
  const settingsModal = document.getElementById("settingsBackdrop");
  const aboutModal = document.getElementById("aboutBackdrop");
  const breakModal = document.getElementById("breakReminderBackdrop");

  document.getElementById("openAboutFromSettingsBtn")?.addEventListener("click", () => {
    openAboutModal();
  });
  document.getElementById("closeAboutBtn")?.addEventListener("click", () => closeActiveModal());
  document.querySelectorAll("[data-about-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("aboutPlaceholderNotice")?.classList.remove("hidden");
    });
  });

  document.getElementById("openMixerBtn")?.addEventListener("click", () => {
    if (getOpenModalName() === "mixer") return;
    setModalVisibility("mixer");
    pushAppHistory("mixer");
  });
  document.getElementById("closeMixerBtn")?.addEventListener("click", () => closeActiveModal());

  document.getElementById("openSettingsBtn")?.addEventListener("click", () => {
    if (getOpenModalName() === "settings") return;
    setModalVisibility("settings");
    pushAppHistory("settings");
  });
  document.getElementById("closeSettingsBtn")?.addEventListener("click", () => closeActiveModal());
  document.getElementById("settingsManageMixesBtn")?.addEventListener("click", () => {
    setModalVisibility(null);
    switchView("space", { skipHistoryPush: true });
    replaceAppHistory(null);
    setTimeout(() => {
      document.getElementById("spaceMixesCard")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
    }, 60);
  });
  document.getElementById("settingsCustomizeThemesBtn")?.addEventListener("click", () => {
    setModalVisibility(null);
    switchView("space", { skipHistoryPush: true });
    replaceAppHistory(null);
    const activeSlotIdx = CUSTOM_THEME_SLOT_IDS.indexOf(state.settings.theme);
    const firstEmptyIdx = (state.profile?.customThemes || []).findIndex(slot => !slot);
    const targetSlot = activeSlotIdx >= 0 ? activeSlotIdx : (firstEmptyIdx >= 0 ? firstEmptyIdx : 0);
    openCustomThemeEditor(targetSlot);
    setTimeout(() => {
      document.getElementById("spaceThemesCard")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
    }, 60);
  });

  // Schnellstart-Mixe auf der Startseite ein-/ausblenden
  document.querySelectorAll("[data-home-mixes]").forEach(btn => {
    btn.addEventListener("click", () => {
      setHomeQuickMixesEnabled(btn.dataset.homeMixes === "on");
    });
  });

  // Pausen-Erinnerung bei Übungen: Einstellungen & Dialog-Aktionen
  document.querySelectorAll("[data-break-enabled]").forEach(btn => {
    btn.addEventListener("click", () => {
      setBreakReminderEnabled(btn.dataset.breakEnabled !== "off");
    });
  });
  document.getElementById("breakReminderSlider")?.addEventListener("input", (e) => {
    setBreakReminderMinutes(e.target.value);
  });
  document.querySelectorAll("[data-break-preset]").forEach(btn => {
    btn.addEventListener("click", () => {
      setBreakReminderMinutes(btn.dataset.breakPreset);
    });
  });
  document.getElementById("breakTakePauseBtn")?.addEventListener("click", () => {
    dismissBreakReminder("pause");
  });
  document.getElementById("breakContinueBtn")?.addEventListener("click", () => {
    dismissBreakReminder("continue");
  });
  document.getElementById("breakDisableBtn")?.addEventListener("click", () => {
    dismissBreakReminder("disable");
  });
  syncBreakReminderControls();

  [mixerModal, settingsModal, aboutModal, breakModal].forEach(backdrop => {
    backdrop?.addEventListener("click", (e) => {
      if (e.target === backdrop) closeActiveModal();
    });
  });

  // Direkt im oberen Aufgabenmodul ausklappbare Steuerungen (Tempo-Schieberegler, Tonart, Taktart)
  const moduleBpmBtn = document.getElementById("moduleBpmBtn");
  const moduleKeyBtn = document.getElementById("moduleKeyBtn");
  const moduleNotationKeyBtn = document.getElementById("moduleNotationKeyBtn");
  const moduleNotationPaceBtn = document.getElementById("moduleNotationPaceBtn");
  const moduleTimeSigBtn = document.getElementById("moduleTimeSigBtn");
  const melodyPulseBtn = document.getElementById("melodyPulseBtn");

  const inlineBpmPopover = document.getElementById("inlineBpmPopover");
  const inlineKeyPopover = document.getElementById("inlineKeyPopover");
  const inlineNotationKeyPopover = document.getElementById("inlineNotationKeyPopover");
  const inlineNotationPacePopover = document.getElementById("inlineNotationPacePopover");
  const inlineNotationPaceSlider = document.getElementById("inlineNotationPaceSlider");
  const inlineTimeSigPopover = document.getElementById("inlineTimeSigPopover");

  function closeAllInlinePopovers(exceptPopover = null) {
    const keepNotationPaceOpen = Boolean(
      isNotationMode(state?.currentExercise?.type) &&
      !state?.exam?.active &&
      exceptPopover !== inlineNotationKeyPopover
    );
    [
      [inlineBpmPopover, moduleBpmBtn],
      [inlineKeyPopover, moduleKeyBtn],
      [inlineNotationKeyPopover, moduleNotationKeyBtn],
      [inlineNotationPacePopover, moduleNotationPaceBtn],
      [inlineTimeSigPopover, moduleTimeSigBtn]
    ].forEach(([pop, btn]) => {
      if (pop === inlineNotationPacePopover && keepNotationPaceOpen) {
        return;
      }
      if (pop && pop !== exceptPopover) {
        pop.classList.add("hidden");
        btn?.classList.remove("chip-open");
      }
    });
  }

  moduleBpmBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllInlinePopovers(inlineBpmPopover);
    const isHidden = inlineBpmPopover.classList.toggle("hidden");
    moduleBpmBtn.classList.toggle("chip-open", !isHidden);
  });

  melodyPulseBtn?.addEventListener("click", (e) => {
    e?.stopPropagation?.();
    if (state.exam?.active) return;
    closeAllInlinePopovers();
    state.settings.melodyPulse = !state.settings.melodyPulse;
    const pulseOn = Boolean(state.settings.melodyPulse);
    melodyPulseBtn.textContent = pulseOn ? tr("Puls: An", "Pulse: On") : tr("Puls: Aus", "Pulse: Off");
    melodyPulseBtn.classList.toggle("btn-active", pulseOn);
    melodyPulseBtn.classList.toggle("click-muted", !pulseOn);
    if (pulseOn && audioEngine.isInitialized) {
      audioEngine.triggerPercussion("accent", undefined, 0.45);
    }
    state.updateQuickStartLabel();
  });

  moduleKeyBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllInlinePopovers(inlineKeyPopover);
    const isHidden = inlineKeyPopover.classList.toggle("hidden");
    moduleKeyBtn.classList.toggle("chip-open", !isHidden);
  });

  moduleNotationKeyBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (state.exam?.active) return;
    closeAllInlinePopovers(inlineNotationKeyPopover);
    renderInlineNotationKeyPopover();
    const isHidden = inlineNotationKeyPopover.classList.toggle("hidden");
    moduleNotationKeyBtn.classList.toggle("chip-open", !isHidden);
  });

  moduleNotationPaceBtn?.addEventListener("click", (e) => {
    e?.stopPropagation?.();
    if (state.exam?.active) return;
    closeAllInlinePopovers(inlineNotationPacePopover);
    syncNotationPaceUI();
    if (state.listenOnly?.active && isNotationMode(state.currentExercise?.type)) {
      inlineNotationPacePopover?.classList.remove("hidden");
      moduleNotationPaceBtn.classList.add("chip-open");
      return;
    }
    const isHidden = inlineNotationPacePopover.classList.toggle("hidden");
    moduleNotationPaceBtn.classList.toggle("chip-open", !isHidden);
  });

  inlineNotationPaceSlider?.addEventListener("input", (e) => {
    setNotationListenOnlyPace(e.target.value);
  });

  moduleTimeSigBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllInlinePopovers(inlineTimeSigPopover);
    const isHidden = inlineTimeSigPopover.classList.toggle("hidden");
    moduleTimeSigBtn.classList.toggle("chip-open", !isHidden);
  });

  [inlineBpmPopover, inlineKeyPopover, inlineNotationKeyPopover, inlineNotationPacePopover, inlineTimeSigPopover].forEach(pop => {
    pop?.addEventListener("click", (e) => e.stopPropagation());
  });

  document.addEventListener("click", (e) => {
    if (typeof e?.target?.closest === "function" && e.target.closest("#listenOnlyBtn")) {
      return;
    }
    closeAllInlinePopovers();
  });

  function setActivePresetButton(presetKey) {
    document.querySelectorAll("[data-preset]").forEach(b => {
      b.classList.toggle("active", b.dataset.preset === presetKey);
    });
  }

  // Mixer Sliders & Presets
  ["Piano", "Guitar", "Strings", "Brass", "Voice", "Bass"].forEach(ch => {
    document.getElementById(`mix${ch}`)?.addEventListener("input", async (e) => {
      const key = ch.toLowerCase();
      state.mixer[key] = parseFloat(e.target.value);
      document.getElementById(`val${ch}`).textContent = `${Math.round(state.mixer[key] * 100)}%`;
      // Sobald ein Preset manuell verändert wird, automatisch "Benutzerdefiniert" aktivieren & Stand sichern
      state.customMixer = { ...state.mixer };
      state.activePreset = "custom";
      setActivePresetButton("custom");
      await ensureAudioReady();
      audioEngine.setMixerGains(state.mixer);
    });
  });

  const MIX_PRESETS = {
    duo:       { piano: 0.90, guitar: 0.85, strings: 0.00, brass: 0.00, voice: 0.00, bass: 0.00 },
    ensemble:  { piano: 0.85, guitar: 0.70, strings: 0.45, brass: 0.00, voice: 0.00, bass: 0.80 },
    orchestra: { piano: 0.35, guitar: 0.00, strings: 0.85, brass: 0.65, voice: 0.00, bass: 0.85 },
    piano:     { piano: 1.00, guitar: 0.00, strings: 0.00, brass: 0.00, voice: 0.00, bass: 0.00 }
  };

  document.querySelectorAll("[data-preset]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const presetKey = btn.dataset.preset;
      const preset = presetKey === "custom" ? state.customMixer : MIX_PRESETS[presetKey];
      if (!preset) return;
      state.activePreset = presetKey;
      setActivePresetButton(presetKey);
      state.mixer = { voice: 0.00, ...preset };
      syncMixerSliders();
      await ensureAudioReady();
      audioEngine.setMixerGains(state.mixer);
    });
  });

  syncMixerSliders();
  setActivePresetButton(state.activePreset);

  // Einstellungen: Tonart, Tempo (Schieberegler inline & Modal), Taktart
  document.querySelectorAll("[data-keymode]").forEach(btn => {
    btn.addEventListener("click", () => {
      const chosenMode = btn.dataset.keymode;
      document.querySelectorAll("[data-keymode]").forEach(b => {
        b.classList.toggle("active", b.dataset.keymode === chosenMode);
      });
      state.settings.keyMode = chosenMode;
      cancelListenOnlyTimers();
      stopPlayback();
      generateExercise();
      if (state.listenOnly.active) {
        startListenOnlyCycle();
      }
    });
  });

  const defaultBpmSlider = document.getElementById("defaultBpmSlider");
  const defaultBpmDisplay = document.getElementById("defaultBpmDisplay");

  const inlineBpmSlider = document.getElementById("inlineBpmSlider");
  const inlineBpmVal = document.getElementById("inlineBpmVal");
  const inlineBpmRandomBtn = document.getElementById("inlineBpmRandomBtn");

  function syncExerciseBpmUI(newBpm, isManualInExercise = false) {
    if (isManualInExercise) {
      state.hasManualExerciseBpm = true;
    }
    state.settings.randomBpm = false;
    inlineBpmRandomBtn?.classList.remove("active");
    state.settings.bpm = newBpm;
    state.activeBpm = newBpm;

    if (inlineBpmSlider) inlineBpmSlider.value = newBpm;
    if (inlineBpmVal) inlineBpmVal.textContent = `${newBpm} BPM`;
    if (moduleBpmBtn) moduleBpmBtn.textContent = `${newBpm} BPM`;
  }

  // Standardtempo im Einstellungs-Modal:
  // Wird für alle Module übernommen, solange im laufenden Modul noch nicht manuell geregelt wurde.
  defaultBpmSlider?.addEventListener("input", (e) => {
    const newDefault = parseInt(e.target.value, 10);
    state.settings.defaultBpm = newDefault;
    if (defaultBpmDisplay) defaultBpmDisplay.textContent = `${newDefault} BPM`;
    if (!state.hasManualExerciseBpm) {
      syncExerciseBpmUI(getDefaultExerciseBpm(state.settings.mode), false);
    }
  });

  // Manueller Tempo-Schieberegler im Übungsmodul:
  inlineBpmSlider?.addEventListener("input", (e) => {
    syncExerciseBpmUI(parseInt(e.target.value, 10), true);
  });

  function toggleRandomBpm() {
    state.hasManualExerciseBpm = true;
    state.settings.randomBpm = !state.settings.randomBpm;
    inlineBpmRandomBtn?.classList.toggle("active", state.settings.randomBpm);

    if (state.settings.randomBpm) {
      if (inlineBpmVal) inlineBpmVal.textContent = tr("Zufall", "Random");
      cancelListenOnlyTimers();
      stopPlayback();
      generateExercise();
      if (state.listenOnly.active) {
        startListenOnlyCycle();
      }
    } else {
      syncExerciseBpmUI(state.settings.bpm, true);
    }
  }

  inlineBpmRandomBtn?.addEventListener("click", toggleRandomBpm);

  document.querySelectorAll("[data-timesig]").forEach(btn => {
    btn.addEventListener("click", () => {
      const chosenSig = btn.dataset.timesig;
      document.querySelectorAll("[data-timesig]").forEach(b => {
        b.classList.toggle("active", b.dataset.timesig === chosenSig);
      });
      state.settings.timeSig = chosenSig;
      cancelListenOnlyTimers();
      stopPlayback();
      generateExercise();
      if (state.listenOnly.active) {
        startListenOnlyCycle();
      }
    });
  });

  // Diagnose-Werkzeuge bei Fehlern
  document.getElementById("btnDiagBass")?.addEventListener("click", async () => {
    if (!state.wrongAnswerData) return;
    await ensureAudioReady();
    const ex = state.currentExercise;
    if (ex.type === "cadence") {
      audioEngine.playStep([], 1.2, state.wrongAnswerData.target.bass, "cadence");
    } else if (ex.type === "prod-tone") {
      stopPlayback();
      audioEngine.playProductionTone(1000, 0.95);
    } else if (ex.type === "prod-eq-noise") {
      stopPlayback();
      audioEngine.playProductionNoiseEQ({
        mode: "ab-switch",
        freqHz: state.wrongAnswerData.target.freqHz,
        q: ex.q,
        gainDb: ex.boostDb,
        flatDurationSec: 0.75,
        boostDurationSec: 1.30
      });
    } else if (ex.type.startsWith("modes-")) {
      stopPlayback();
      audioEngine.playStep(ex.anchorNotes, 1.2, null, "cadence");
    } else if (ex.type.startsWith("rhythm-")) {
      const bpm = state.activeBpm || 90;
      if (ex.type === "rhythm-meter") {
        const pulse = buildRhythmMeterEvents(ex.targetItem.key, bpm, 1, true);
        audioEngine.playRhythmSequence(pulse.events);
      } else {
        const beatMs = 60000 / bpm;
        audioEngine.playRhythmSequence([
          [0, "accent", 0.92],
          [Math.round(beatMs), "tick", 0.68],
          [Math.round(2 * beatMs), "tick", 0.68],
          [Math.round(3 * beatMs), "tick", 0.68]
        ]);
      }
    } else if (ex.type === "chord-inversions") {
      stopPlayback();
      audioEngine.playStep([state.wrongAnswerData.target.bassNote || state.wrongAnswerData.target.refNote], 1.3, null, "interval");
    } else if (ex.type === "interval-drone") {
      stopPlayback();
      const padNotes = ex.padNotes || state.wrongAnswerData.target.padNotes || [state.wrongAnswerData.target.refNote];
      audioEngine.playInstrumentSample("strings", padNotes, 1.85, 0, audioEngine.dronePadGainScale, { attackSec: 0.14, releaseSec: 0.85 });
    } else {
      audioEngine.playStep([state.wrongAnswerData.target.refNote], 1.3, null, "interval");
    }
  });

  document.getElementById("btnDiagCompare")?.addEventListener("click", async () => {
    if (!state.wrongAnswerData) return;
    await ensureAudioReady();
    const ex = state.currentExercise;
    const rootMidi = HARMONIC_DATA.roots[state.currentKey].midi;

    if (ex.type === "prod-tone") {
      stopPlayback();
      audioEngine.playProductionTone(state.wrongAnswerData.chosen.freqHz, 0.85);
      audioEngine.registerTimer(() => {
        audioEngine.playProductionTone(state.wrongAnswerData.target.freqHz, 1.05);
      }, 1100);
    } else if (ex.type === "prod-eq-noise") {
      stopPlayback();
      audioEngine.playProductionNoiseEQ({
        mode: "boost-only",
        freqHz: state.wrongAnswerData.chosen.freqHz,
        q: ex.q,
        gainDb: ex.boostDb,
        durationSec: 1.05
      });
      audioEngine.registerTimer(() => {
        audioEngine.playProductionNoiseEQ({
          mode: "boost-only",
          freqHz: state.wrongAnswerData.target.freqHz,
          q: ex.q,
          gainDb: ex.boostDb,
          durationSec: 1.25
        });
      }, 1350);
    } else if (ex.type.startsWith("modes-")) {
      stopPlayback();
      const dur1 = playModeExercisePattern(ex, state.wrongAnswerData.chosen, 0);
      playModeExercisePattern(ex, state.wrongAnswerData.target, dur1 + 420);
    } else if (ex.type === "rhythm-meter") {
      const bpm = state.activeBpm || 90;
      const chosenBar = buildRhythmMeterEvents(state.wrongAnswerData.chosen.key, bpm, 1, false);
      const targetBar = buildRhythmMeterEvents(state.wrongAnswerData.target.key, bpm, 1, false);
      audioEngine.stopPlayback();
      const baseSec = getAudioClockSec() + 0.04;
      audioEngine.playRhythmSequence(chosenBar.events, baseSec);
      const gapMs = Math.round(chosenBar.totalMs + 340);
      audioEngine.registerTimer(() => {
        audioEngine.playRhythmSequence(targetBar.events);
      }, gapMs);
    } else if (ex.type === "rhythm-groove") {
      const bpm = state.activeBpm || 90;
      const sliceBar = (key) => {
        const res = buildRhythmGrooveEvents(ex, key, bpm);
        if (ex.grooveKind === "offbeat") {
          const filtered = res.events
            .filter(([t]) => t >= res.barMs - 10)
            .map(([t, k, v]) => [Math.max(0, Math.round(t - res.barMs)), k, v]);
          return { events: filtered, barMs: res.barMs };
        }
        return {
          events: res.events.filter(([t]) => t < res.barMs - 10),
          barMs: res.barMs
        };
      };
      const chosenSlice = sliceBar(state.wrongAnswerData.chosen.key);
      const targetSlice = sliceBar(state.wrongAnswerData.target.key);
      audioEngine.stopPlayback();
      audioEngine.playRhythmSequence(chosenSlice.events);
      audioEngine.registerTimer(() => {
        audioEngine.playRhythmSequence(targetSlice.events);
      }, Math.round(chosenSlice.barMs + 360));
    } else if (ex.type === "cadence") {
      const chosen = buildChordNotes(rootMidi, state.wrongAnswerData.chosen);
      audioEngine.playStep(chosen.chordNotes, 0.9, chosen.bassNote, "cadence");
      setTimeout(() => {
        audioEngine.playStep(state.wrongAnswerData.target.notes, 1.2, state.wrongAnswerData.target.bass, "cadence");
      }, 1000);
    } else if (ex.type === "interval-melodic" || ex.type === "interval-melodic-down") {
      stopPlayback();
      const baseRootMidi = ex.targetItem.rootMidi ?? rootMidi;
      const dirSign = ex.type === "interval-melodic-down" ? -1 : 1;
      const refNote = ex.targetItem.refNote || midiToNote(baseRootMidi);
      const chosenTarget = midiToNote(baseRootMidi + dirSign * state.wrongAnswerData.chosen.semitones);
      const actualTarget = state.wrongAnswerData.target.targetNote;
      const { stepMs, note1DurSec, note2DurSec } = getMelodicIntervalTiming(state.activeBpm);
      const pauseBetweenPairsMs = Math.max(420, Math.round(stepMs * 0.75));
      const secondPairStartMs = stepMs + Math.round(note2DurSec * 1000) + pauseBetweenPairsMs;

      audioEngine.playStep([refNote], note1DurSec, null, "cadence");
      audioEngine.registerTimer(() => audioEngine.playStep([chosenTarget], note2DurSec, null, "cadence"), stepMs);
      audioEngine.registerTimer(() => audioEngine.playStep([refNote], note1DurSec, null, "cadence"), secondPairStartMs);
      audioEngine.registerTimer(() => audioEngine.playStep([actualTarget], note2DurSec, null, "cadence"), secondPairStartMs + stepMs);
    } else if (isChordQualityMode(ex.type)) {
      stopPlayback();
      const cmpId = audioEngine.playbackId;
      const baseRoot = ex.targetItem.rootMidi || rootMidi;
      const chosenNotes = (state.wrongAnswerData.chosen.offsets || [0, 4, 7]).map(s => midiToNote(baseRoot + s));
      const targetNotes = state.wrongAnswerData.target.notes || [];

      if (isChordArpeggioMode(ex.type)) {
        const reverse = ex.type === "chord-arp-down";
        const seqChosen = reverse ? [...chosenNotes].reverse() : chosenNotes;
        const seqTarget = reverse ? [...targetNotes].reverse() : targetNotes;
        const tChosen = getChordArpeggioPromptTiming(seqChosen.length, state.activeBpm);
        const tTarget = getChordArpeggioPromptTiming(seqTarget.length, state.activeBpm);
        const scheduleArp = (seq, timing, baseOffsetMs) => {
          seq.forEach((note, idx) => {
            const dur = idx === seq.length - 1 ? timing.lastNoteDurSec : timing.noteDurSec;
            const atMs = baseOffsetMs + idx * timing.stepMs;
            if (atMs === 0) {
              audioEngine.playStep([note], dur, null, "cadence");
            } else {
              audioEngine.registerTimer(() => {
                if (audioEngine.playbackId !== cmpId) return;
                audioEngine.playStep([note], dur, null, "cadence");
              }, atMs);
            }
          });
        };
        scheduleArp(seqChosen, tChosen, 0);
        scheduleArp(seqTarget, tTarget, tChosen.cycleMs);
      } else {
        audioEngine.playStep(chosenNotes, 1.05, null, "cadence");
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== cmpId) return;
          audioEngine.playStep(targetNotes, 1.25, null, "cadence");
        }, 1150);
      }
    } else if (ex.type === "chord-inversions") {
      stopPlayback();
      const cmpId = audioEngine.playbackId;
      const baseRoot = ex.targetItem.rootMidi ?? rootMidi;
      const chosenStep = state.wrongAnswerData.chosen.stepIndex ?? 0;
      const chosenInv = buildChordInversionNotes(baseRoot, ex.chordKey, chosenStep, ex.rootKey || state.currentKey);
      audioEngine.playStep(chosenInv.notes, 1.05, null, "cadence");
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== cmpId) return;
        audioEngine.playStep(state.wrongAnswerData.target.notes, 1.25, null, "cadence");
      }, 1150);
    } else if (ex.type === "interval-drone") {
      stopPlayback();
      const cmpId = audioEngine.playbackId;
      const baseRootMidi = ex.targetItem.rootMidi ?? rootMidi;
      const padNotes = ex.padNotes || [midiToNote(baseRootMidi - 12), ex.targetItem.refNote || midiToNote(baseRootMidi)];
      const chosenTarget = midiToNote(baseRootMidi + state.wrongAnswerData.chosen.semitones);
      const actualTarget = state.wrongAnswerData.target.targetNote;
      audioEngine.playDroneIntervalCue(padNotes, [chosenTarget], { delayMs: 650, padDurSec: 1.75, pianoDurSec: 0.95 });
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== cmpId) return;
        audioEngine.playDroneIntervalCue(padNotes, [actualTarget], { delayMs: 650, padDurSec: 1.9, pianoDurSec: 1.1 });
      }, 1950);
    } else {
      stopPlayback();
      const baseRootMidi = ex.targetItem.rootMidi ?? rootMidi;
      const refNote = ex.targetItem.refNote || midiToNote(baseRootMidi);
      const chosenTarget = midiToNote(baseRootMidi + state.wrongAnswerData.chosen.semitones);
      const stepMode = ex.type === "interval-harmonic" ? "interval-harmonic" : "cadence";

      audioEngine.playStep([refNote, chosenTarget], 1.15, null, stepMode);
      audioEngine.registerTimer(() => {
        audioEngine.playStep(state.wrongAnswerData.target.notes, 1.35, null, stepMode);
      }, 1250);
    }
  });

  // Browser- & Android-Zurück-Geste / Zurück-Taste via History API synchronisieren
  appHistoryState.idx = 0;
  replaceAppHistory(null);

  window.addEventListener("popstate", (e) => {
    if (e.state && typeof e.state.idx === "number") {
      applyHistorySnapshot(e.state);
    } else {
      applyHistorySnapshot({
        idx: 0,
        view: "home",
        activeCategory: state.activeCategory,
        knowledgeTab: state.activeKnowledgeTab,
        knowledgeDetail: null,
        exerciseReturnView: state.exerciseReturnView,
        modal: null
      });
    }
  });

  initStartupSplash();
  const initPianoPrefs = getActivePianoSoundSettings();
  const initDroneMix = getActiveDroneMixSettings();
  audioEngine?.setPianoSoundProfile?.(initPianoPrefs.character, initPianoPrefs.reverb);
  audioEngine?.setDroneIntervalMix?.(initDroneMix.pad, initDroneMix.tone);
  if (typeof audioEngine?.preload === "function") {
    Promise.resolve(audioEngine.preload(state.master.volume, state.master.muted, state.mixer)).catch(() => {});
  }
  let unlockedAudioGesture = false;
  const onFirstAudioGesture = () => {
    if (unlockedAudioGesture) return;
    unlockedAudioGesture = true;
    document.removeEventListener?.("pointerdown", onFirstAudioGesture, true);
    document.removeEventListener?.("touchstart", onFirstAudioGesture, true);
    document.removeEventListener?.("keydown", onFirstAudioGesture, true);
    unlockWebAudioSync();
    ensureAudioReady().catch(() => {});
  };
  document.addEventListener("pointerdown", onFirstAudioGesture, true);
  document.addEventListener("touchstart", onFirstAudioGesture, true);
  document.addEventListener("keydown", onFirstAudioGesture, true);
  initTabSwipeNavigation();
  applyThemeAndAppearance();
  syncAutoNextControls();
  syncPianoSoundControls();
  syncDroneMixControls();

  document.getElementById("dronePadVolSlider")?.addEventListener("input", (e) => {
    const pct = parseFloat(e.target.value);
    if (Number.isFinite(pct)) {
      setDroneMixValue("pad", pct / 100);
    }
  });

  document.getElementById("droneToneVolSlider")?.addEventListener("input", (e) => {
    const pct = parseFloat(e.target.value);
    if (Number.isFinite(pct)) {
      setDroneMixValue("tone", pct / 100);
    }
  });

  document.querySelectorAll("[data-mixer-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      switchMixerTab(btn.dataset.mixerTab);
    });
  });

  document.querySelectorAll("[data-piano-char]").forEach(btn => {
    btn.addEventListener("click", () => {
      setPianoCharacterPreference(btn.dataset.pianoChar);
    });
  });

  document.querySelectorAll("[data-reverb-slider]").forEach(slider => {
    slider.addEventListener("input", (e) => {
      const pct = parseFloat(e.target.value);
      if (Number.isFinite(pct)) {
        setInstrumentReverbPreference(slider.dataset.reverbSlider, pct / 100);
      }
    });
  });

  document.querySelectorAll("[data-reverb-preview]").forEach(btn => {
    btn.addEventListener("click", () => {
      previewInstrumentReverbSound(btn.dataset.reverbPreview);
    });
  });

  const languageSelectEl = document.getElementById("languageSelect");
  if (languageSelectEl) {
    languageSelectEl.addEventListener("change", () => {
      if (typeof isLanguageAvailable === "function" && !isLanguageAvailable(languageSelectEl.value)) {
        syncLanguageControls(state.settings.language);
        return;
      }
      setLanguagePreference(languageSelectEl.value);
    });
  }

  document.querySelectorAll("[data-auto-next]").forEach(btn => {
    btn.addEventListener("click", () => {
      setAutoNextPreference(btn.dataset.autoNext);
    });
  });

  document.querySelectorAll("[data-appearance]").forEach(btn => {
    btn.addEventListener("click", () => {
      setAppearancePreference(btn.dataset.appearance);
    });
  });

  document.querySelectorAll("[data-theme-choice]").forEach(card => {
    card.addEventListener("click", () => {
      setThemePreference(card.dataset.themeChoice);
    });
  });

  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    const colorSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemAppearanceChange = () => {
      if (state.settings.appearance === "system") {
        applyThemeAndAppearance();
      }
    };
    if (typeof colorSchemeMedia.addEventListener === "function") {
      colorSchemeMedia.addEventListener("change", onSystemAppearanceChange);
    } else if (typeof colorSchemeMedia.addListener === "function") {
      colorSchemeMedia.addListener(onSystemAppearanceChange);
    }
  }

  // Subtile Auswahl-/Tipp-Animation auf allen interaktiven Kacheln & Auswahlelementen
  document.addEventListener("click", (e) => {
    const tile = typeof e.target?.closest === "function"
      ? e.target.closest(
          ".category-nav-card, .subpage-node-btn, .warmup-range-btn, .ref-hub-card, .degree-btn, .opt-btn:not(:disabled), .theme-preview-item, .popover-pill-btn, .k-filter-pill, .knowledge-tab-btn, .tonic-btn, .answer-sound-btn, .listen-only-btn, .warmup-phase-pill, .overtone-btn, .category-help-btn, .btn-primary-action, .btn-secondary-action, .module-chip-btn, .btn-tool"
        )
      : null;
    if (tile) triggerTilePulse(tile);
  });

  // Transport-Steuerung im Einsing-Helfer (#viewWarmup)
  document.getElementById("warmupVoiceBtn")?.addEventListener("click", () => {
    toggleWarmupPopover("warmupVoicePopover", "warmupVoiceBtn");
  });
  document.getElementById("warmupSoundBtn")?.addEventListener("click", () => {
    toggleWarmupPopover("warmupSoundPopover", "warmupSoundBtn");
  });
  document.getElementById("warmupBpmBtn")?.addEventListener("click", () => {
    toggleWarmupPopover("warmupBpmPopover", "warmupBpmBtn");
  });

  document.querySelectorAll("[data-warmup-voice]").forEach(btn => {
    btn.addEventListener("click", () => {
      setWarmupVoiceRange(btn.dataset.warmupVoice);
    });
  });

  document.querySelectorAll("[data-warmup-sound]").forEach(btn => {
    btn.addEventListener("click", () => {
      setWarmupSoundMode(btn.dataset.warmupSound);
    });
  });

  document.getElementById("warmupBpmSlider")?.addEventListener("input", (e) => {
    setWarmupBpm(parseInt(e.target.value, 10) || WARMUP_DEFAULT_BPM);
  });

  document.getElementById("warmupKeyDownBtn")?.addEventListener("click", () => {
    shiftWarmupTranspose(-1);
  });
  document.getElementById("warmupReplayStepBtn")?.addEventListener("click", () => {
    replayWarmupRound();
  });
  document.getElementById("warmupKeyUpBtn")?.addEventListener("click", () => {
    shiftWarmupTranspose(1);
  });
  document.getElementById("warmupPrevBtn")?.addEventListener("click", () => {
    stepWarmupIndex(-1);
  });
  document.getElementById("warmupPlayBtn")?.addEventListener("click", () => {
    toggleWarmupPlayPause();
  });
  document.getElementById("warmupNextBtn")?.addEventListener("click", () => {
    stepWarmupIndex(1);
  });

  // Leertaste als Takt-/Tap-Taste (Rhythmus) bzw. Start/Pause (Einsing-Helfer)
  document.addEventListener("keydown", (e) => {
    if (e.code !== "Space" && e.key !== " ") return;
    if (e.repeat) return;
    const tag = e.target?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    const openModal = ["mixerBackdrop", "settingsBackdrop", "aboutBackdrop", "breakReminderBackdrop"].some(
      id => {
        const el = document.getElementById(id);
        return el && !el.classList.contains("modal-hidden") && !el.classList.contains("hidden");
      }
    );
    if (openModal) return;

    if (state.currentView === "warmup") {
      e.preventDefault();
      toggleWarmupPlayPause();
      return;
    }

    if (state.currentView === "metronome") {
      e.preventDefault();
      toggleMetronomePlayback();
      return;
    }

    if (state.currentView !== "exercise" || state.settings.mode !== "rhythm-tap" || state.listenOnly?.active) return;

    e.preventDefault();
    const session = state.rhythmTapSession;
    if (session && !session.ended) {
      if (session.phase === "listen") {
        handleRhythmTapInput();
      }
    } else if (!state.isPlaying) {
      if (state.exam?.active) {
        if (!state.exam.currentAnswered) triggerExamPlayAction();
      } else {
        playSequence();
      }
    }
  });
});

// =====================================================
// EINSING-HELFER / VOCAL WARMUP ENGINE (#viewWarmup)
// =====================================================

const WARMUP_KEY_CODES_BY_PC = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const WARMUP_FLAT_PITCH_CLASSES = new Set([1, 3, 5, 8, 10]);

const WARMUP_VOICE_RANGES = {
  mixed:   { id: "mixed",   baseMidi: 60, de: "Chor-Mitte", en: "Choir Mid", subDe: "c¹–e²", subEn: "C4–E5" },
  soprano: { id: "soprano", baseMidi: 62, de: "Sopran",     en: "Soprano",   subDe: "d¹–a²", subEn: "D4–A5" },
  alto:    { id: "alto",    baseMidi: 57, de: "Alt",        en: "Alto",      subDe: "a–d²",  subEn: "A3–D5" },
  tenor:   { id: "tenor",   baseMidi: 48, de: "Tenor",      en: "Tenor",     subDe: "c–g¹",  subEn: "C3–G4" },
  bass:    { id: "bass",    baseMidi: 43, de: "Bass",       en: "Bass",      subDe: "G–d¹",  subEn: "G2–D4" }
};

const WARMUP_SOUND_MODES = {
  piano:         { id: "piano",       de: "Klavier",         en: "Piano" },
  "piano-voice": { id: "piano-voice", de: "Klavier + Stimme",en: "Piano + Voice" },
  voice:         { id: "voice",       de: "Stimme",          en: "Voice" }
};

const WARMUP_PHASES = [
  { id: "breath",    num: 1, cls: "phase-breath",    shortDe: "1 Atem",     shortEn: "1 Breath",    labelDe: "PHASE 1 • ATEM & KÖRPER",       labelEn: "PHASE 1 • BREATH & BODY" },
  { id: "resonance", num: 2, cls: "phase-resonance", shortDe: "2 Summen",   shortEn: "2 Humming",   labelDe: "PHASE 2 • RESONANZ & STIMMSITZ", labelEn: "PHASE 2 • RESONANCE & TONE" },
  { id: "arpeggio",  num: 3, cls: "phase-arpeggio",  shortDe: "3 Arpeggio", shortEn: "3 Arpeggios", labelDe: "PHASE 3 • ARPEGGIOS & UMFANG",  labelEn: "PHASE 3 • ARPEGGIOS & RANGE" },
  { id: "choir",     num: 4, cls: "phase-choir",     shortDe: "4 Chorklang",shortEn: "4 Choir",     labelDe: "PHASE 4 • VOKALE & CHORKLANG",  labelEn: "PHASE 4 • VOWELS & BLEND" }
];

const WARMUP_STEP_CATALOG = {
  "breath-circle": {
    id: "breath-circle",
    phaseId: "breath",
    kind: "breath-orb",
    titleDe: "Ruhige Bauchatmung",
    titleEn: "Calm Diaphragmatic Breathing",
    syllableDe: "ffff · ssss",
    syllableEn: "ffff · ssss",
    hintDe: "Schultern entspannt lassen – sanft in den Bauch einatmen und gleichmäßig auf ffff/ssss ausströmen.",
    hintEn: "Keep shoulders relaxed — breathe low into the belly and exhale steadily on ffff/ssss.",
    cycles: 4,
    cyclePhases: [
      { cue: "inhale", sec: 4.0, cueNoteOffset: 0,    de: "Einatmen", en: "Inhale",  detailDe: "Tief in den Bauch einatmen…",         detailEn: "Inhale deeply into the belly…" },
      { cue: "hold",   sec: 1.5, cueNoteOffset: null, de: "Halten",   en: "Hold",    detailDe: "Kurz weich und offen halten",         detailEn: "Hold gently without tension" },
      { cue: "exhale", sec: 5.5, cueNoteOffset: 7,    de: "Ausatmen", en: "Exhale",  detailDe: "Gleichmäßig ausströmen: ffff / ssss", detailEn: "Exhale steadily: ffff / ssss" },
      { cue: "rest",   sec: 1.5, cueNoteOffset: null, de: "Lösen",    en: "Release", detailDe: "Bauchdecke lösen & nachspüren",       detailEn: "Release & soften between cycles" }
    ]
  },
  "diaphragm-pulse": {
    id: "diaphragm-pulse",
    phaseId: "breath",
    kind: "breath-pulse",
    titleDe: "Zwerchfell-Impulse",
    titleEn: "Diaphragm Pulses",
    syllableDe: "P – T – K – Sch!",
    syllableEn: "P – T – K – Sh!",
    hintDe: "Kurze, federnde Bauchimpulse im Puls setzen – zwischen den Takten locker einatmen.",
    hintEn: "Articulate crisp rhythmic pulses from the core — let breath drop back in between bars.",
    rounds: 5,
    pulseCount: 4,
    restBeats: 2.5
  },
  "humming-wave": {
    id: "humming-wave",
    phaseId: "resonance",
    kind: "vocal-pattern",
    titleDe: "Summen & Lippenflattern",
    titleEn: "Humming & Lip Trills",
    syllableDe: "Mmm / Brrrr",
    syllableEn: "Mmm / Brrrr",
    degreesText: "1 – 2 – 3 – 2 – 1",
    hintDe: "Weich nach vorne an die Lippen summen oder locker blubbern lassen (SOVT).",
    hintEn: "Hum gently forward to the lips or flutter with a relaxed lip trill (SOVT).",
    semitones: [0, 2, 4, 2, 0],
    noteBeats: [0.9, 0.9, 0.9, 0.9, 1.75],
    keyOffsets: [0, 1, 2, 3, 4, 5, 6],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.85,
    staccato: false
  },
  "fifth-sigh": {
    id: "fifth-sigh",
    phaseId: "resonance",
    kind: "vocal-pattern",
    titleDe: "Seufzer-Abgang (Quinte)",
    titleEn: "Descending 5th Sigh",
    syllableDe: "Mjaa – Nuu",
    syllableEn: "Myaa – Noo",
    degreesText: "5 – 4 – 3 – 2 – 1",
    hintDe: "Mit einem sanften Seufzer von oben weich durch das Register gleiten – Kiefer bleibt locker.",
    hintEn: "Glide gently downward like a relaxed sigh — keep the jaw soft and effortless.",
    semitones: [7, 5, 4, 2, 0],
    noteBeats: [1.0, 0.9, 0.9, 0.9, 1.85],
    keyOffsets: [5, 4, 3, 2, 1, 0],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.85,
    staccato: false
  },
  "triad-syllables": {
    id: "triad-syllables",
    phaseId: "arpeggio",
    kind: "vocal-pattern",
    titleDe: "Dreiklangs-Arpeggio",
    titleEn: "Triad Syllable Arpeggio",
    syllableDe: "Ma – Me – Mi – Mo – Mu",
    syllableEn: "Mah – Meh – Mee – Moh – Moo",
    degreesText: "1 – 3 – 5 – 3 – 1",
    hintDe: "Vokale auf demselben Stimmstrom verbinden, bei jedem Halbton frisch nach oben denken.",
    hintEn: "Link vowels on one steady airflow; think gently upward as each half-step rises.",
    semitones: [0, 4, 7, 4, 0],
    noteBeats: [0.85, 0.85, 0.9, 0.85, 1.7],
    keyOffsets: [0, 1, 2, 3, 4, 5, 6, 7],
    cueChordBeats: 1.25,
    breathGapBeats: 0.7,
    postRestBeats: 0.8,
    staccato: false
  },
  "octave-staccato": {
    id: "octave-staccato",
    phaseId: "arpeggio",
    kind: "vocal-pattern",
    titleDe: "Oktav-Arpeggio (federnd)",
    titleEn: "Bouncy Octave Arpeggio",
    syllableDe: "Ha – ha – ha – ha!",
    syllableEn: "Ha – ha – ha – ha!",
    degreesText: "1 – 3 – 5 – 8 – 5 – 3 – 1",
    hintDe: "Leicht und präzise aus dem Zwerchfell abfedern – oben offen und ohne Druck klingen.",
    hintEn: "Bounce lightly from the core — let the top octave ring open without pushing.",
    semitones: [0, 4, 7, 12, 7, 4, 0],
    noteBeats: [0.65, 0.65, 0.65, 0.95, 0.65, 0.65, 1.55],
    keyOffsets: [2, 3, 4, 5, 6, 7],
    cueChordBeats: 1.25,
    breathGapBeats: 0.75,
    postRestBeats: 0.85,
    staccato: true
  },
  "cool-down-arp": {
    id: "cool-down-arp",
    phaseId: "arpeggio",
    kind: "vocal-pattern",
    titleDe: "Lagen-Ausgleich (Abwärts)",
    titleEn: "Register Cool-Down (Descending)",
    syllableDe: "Joo – oo – ooh",
    syllableEn: "Yoh – oh – ooh",
    degreesText: "8 – 5 – 3 – 1",
    hintDe: "Kopfklang behutsam in die entspannte Mittellage mitnehmen und weich abrunden.",
    hintEn: "Carry head resonance smoothly back down into a relaxed middle voice.",
    semitones: [12, 7, 4, 0],
    noteBeats: [1.0, 0.9, 0.9, 1.85],
    keyOffsets: [6, 5, 4, 3, 2],
    cueChordBeats: 1.2,
    breathGapBeats: 0.7,
    postRestBeats: 0.85,
    staccato: false
  },
  "vowel-blend": {
    id: "vowel-blend",
    phaseId: "choir",
    kind: "vowel-blend",
    titleDe: "Vokal-Wandern (Chor-Blend)",
    titleEn: "Vowel Morph & Blend",
    syllableDe: "U → O → A → E → I",
    syllableEn: "Oo → Oh → Ah → Eh → Ee",
    degreesText: "1 • Vokalausgleich",
    hintDe: "Auf einem liegenden Ton weich von dunklem U bis hellem I übergehen, ohne dass der Klang abreißt.",
    hintEn: "Morph smoothly across all five vowels on one steady pitch without breaking the line.",
    vowelsDe: ["Uuuu…", "Oooo…", "Aaaa…", "Eeee…", "Iiii…"],
    vowelsEn: ["Oooo…", "Ohhh…", "Ahhh…", "Ehhh…", "Eeee…"],
    vowelsFr: ["Ouuu…", "Oooo…", "Aaaa…", "Éééé…", "Iiii…"],
    vowelsPl: ["Uuuu…", "Oooo…", "Aaaa…", "Eeee…", "Iiii…"],
    vowelsUk: ["Уууу…", "Оооо…", "Аааа…", "Ееее…", "Іііі…"],
    vowelsUr: ["اُووو…", "اووو…", "آااا…", "اےےے…", "اِییی…"],
    keyOffsets: [0, 2, 4, 5],
    cueChordBeats: 1.35,
    breathGapBeats: 0.8,
    vowelStepBeats: 1.9,
    postRestBeats: 1.0
  },
  "choir-cadence": {
    id: "choir-cadence",
    phaseId: "choir",
    kind: "choir-cadence",
    titleDe: "SATB Chor-Blend & Schlusskadenz",
    titleEn: "SATB Choir Blend & Cadence",
    syllableDe: "Nuu / Ahh (SATB)",
    syllableEn: "Noo / Ahh (SATB)",
    degreesText: "Bass → Tenor → Alt → Sopran",
    hintDe: "Jede Stimme rastet nacheinander in den reinen Schlussakkord ein – ruhig lauschen und einschwingen.",
    hintEn: "Hear each voice lock in from root up to 3rd and 8ve — blend smoothly into just intonation.",
    keyOffsets: [0, 2, 4],
    cadenceBeat: 1.35,
    stackStepBeats: 1.15,
    holdBeats: 4.5,
    postRestBeats: 1.4
  }
};

const WARMUP_PRESETS = [
  {
    id: "full-5min",
    badge: "5:00",
    circle: "circle-sage",
    titleDe: "5-Minuten Komplett-Einsingen",
    titleEn: "5-Min Complete Vocal Warmup",
    descDe: "Alle 4 Phasen: Bauchatmung, Summen, modulierte Arpeggios & SATB-Chorklang",
    descEn: "All 4 phases: deep breathing, humming, modulated arpeggios & SATB blend",
    steps: [
      { id: "breath-circle" },
      { id: "diaphragm-pulse" },
      { id: "humming-wave" },
      { id: "fifth-sigh" },
      { id: "triad-syllables" },
      { id: "octave-staccato" },
      { id: "cool-down-arp" },
      { id: "vowel-blend" },
      { id: "choir-cadence" }
    ]
  },
  {
    id: "quick-3min",
    badge: "3:00",
    circle: "circle-lilac",
    titleDe: "Kompakt-Warmup (ca. 3 Min.)",
    titleEn: "Compact Warmup (~3 Min.)",
    descDe: "Kurzer Start für die Unterrichtsstunde: Atem, Summen, Dreiklang & Chorklang",
    descEn: "Fast lesson opener: breathing, humming, triad syllables & closing choir blend",
    steps: [
      { id: "breath-circle", cycles: 3 },
      { id: "humming-wave", keyOffsets: [0, 1, 2, 3, 4, 5, 6] },
      { id: "fifth-sigh", keyOffsets: [5, 4, 3, 2, 1] },
      { id: "triad-syllables" },
      { id: "vowel-blend", keyOffsets: [0, 2] },
      { id: "choir-cadence", keyOffsets: [0, 2] }
    ]
  },
  {
    id: "arpeggio-focus",
    badge: "1–3–5–8",
    circle: "circle-peach",
    titleDe: "Arpeggio & Register-Training",
    titleEn: "Arpeggio & Register Drill",
    descDe: "Fokus auf Beweglichkeit, Staccato-Oktaven und sanften Lagen-Ausgleich",
    descEn: "Focused agility work: humming, triad vows, staccato octaves & cool-down",
    steps: [
      { id: "humming-wave", keyOffsets: [0, 2, 4] },
      { id: "triad-syllables" },
      { id: "octave-staccato" },
      { id: "cool-down-arp" },
      { id: "choir-cadence", keyOffsets: [0] }
    ]
  },
  {
    id: "breath-choir",
    badge: "SATB",
    circle: "circle-sage",
    titleDe: "Chor-Atem & Intonation",
    titleEn: "Choir Breath & Intonation",
    descDe: "Atemstütze, Zwerchfell-Impulse, Vokalausgleich und reiner Chorklang",
    descEn: "Breath support, core pulses, vowel morphing & pure choral chord tuning",
    steps: [
      { id: "breath-circle" },
      { id: "diaphragm-pulse" },
      { id: "humming-wave", keyOffsets: [0, 1, 2, 3] },
      { id: "vowel-blend" },
      { id: "choir-cadence" }
    ]
  }
];

function getLocalizedWarmupPreset(presetId = state?.warmup?.presetId) {
  const raw = WARMUP_PRESETS.find(p => p.id === presetId) || WARMUP_PRESETS[0];
  return {
    ...raw,
    title: tr(raw.titleDe, raw.titleEn),
    desc: tr(raw.descDe, raw.descEn)
  };
}

function getLocalizedWarmupVoiceRange(voiceId = state?.warmup?.voiceRange) {
  const raw = WARMUP_VOICE_RANGES[voiceId] || WARMUP_VOICE_RANGES.mixed;
  return {
    ...raw,
    label: tr(raw.de, raw.en),
    sub: tr(raw.subDe, raw.subEn)
  };
}

function getLocalizedWarmupSoundMode(soundId = state?.warmup?.soundMode) {
  const raw = WARMUP_SOUND_MODES[soundId] || WARMUP_SOUND_MODES["piano-voice"];
  return { ...raw, label: tr(raw.de, raw.en) };
}

function getWarmupStepsForPreset(presetId = state?.warmup?.presetId) {
  const preset = WARMUP_PRESETS.find(p => p.id === presetId) || WARMUP_PRESETS[0];
  return preset.steps.map(entry => {
    const base = WARMUP_STEP_CATALOG[entry.id];
    return { ...base, ...entry };
  });
}

function getWarmupPhaseInfo(phaseId) {
  const raw = WARMUP_PHASES.find(p => p.id === phaseId) || WARMUP_PHASES[0];
  return {
    ...raw,
    short: tr(raw.shortDe, raw.shortEn),
    label: tr(raw.labelDe, raw.labelEn)
  };
}

function getWarmupKeyNameFromMidi(midi) {
  const pc = ((midi % 12) + 12) % 12;
  const keyCode = WARMUP_KEY_CODES_BY_PC[pc] || "C";
  return {
    keyCode,
    keyName: getKeyDisplayName(keyCode),
    preferFlat: WARMUP_FLAT_PITCH_CLASSES.has(pc)
  };
}

function getWarmupStepRoundCount(step) {
  if (!step) return 1;
  if (step.kind === "breath-orb") return 1;
  if (step.kind === "breath-pulse") return step.rounds || 4;
  return Array.isArray(step.keyOffsets) && step.keyOffsets.length ? step.keyOffsets.length : 1;
}

function getWarmupRoundDurationSec(step, bpm = WARMUP_DEFAULT_BPM) {
  const beatSec = 60 / Math.max(60, Math.min(140, Number(bpm) || WARMUP_DEFAULT_BPM));
  if (step.kind === "breath-orb") {
    const oneCycle = (step.cyclePhases || []).reduce((sum, p) => sum + p.sec, 0);
    return (step.cycles || 3) * oneCycle;
  }
  if (step.kind === "breath-pulse") {
    return ((step.pulseCount || 4) + (step.restBeats || 2.5)) * beatSec;
  }
  if (step.kind === "vowel-blend") {
    const vowelsLen = (step.vowelsDe || []).length || 5;
    return ((step.cueChordBeats || 1.35) + (step.breathGapBeats || 0.8) + vowelsLen * (step.vowelStepBeats || 1.9) + (step.postRestBeats || 1.0)) * beatSec;
  }
  if (step.kind === "choir-cadence") {
    return (4 * (step.cadenceBeat || 1.35) + 4 * (step.stackStepBeats || 1.15) + (step.holdBeats || 4.5) + (step.postRestBeats || 1.4)) * beatSec;
  }
  const notesBeats = (step.noteBeats || []).reduce((sum, b) => sum + b, 0);
  return ((step.cueChordBeats || 1.25) + (step.breathGapBeats || 0.75) + notesBeats + (step.postRestBeats || 0.85)) * beatSec;
}

function getWarmupRemainingSec(w = state.warmup) {
  const steps = getWarmupStepsForPreset(w?.presetId);
  const bpm = w?.bpm || WARMUP_DEFAULT_BPM;
  const sIdx = Math.max(0, Math.min(steps.length, w?.stepIndex || 0));
  if (w?.status === "completed") return 0;

  let totalSec = 0;
  for (let i = sIdx; i < steps.length; i++) {
    const step = steps[i];
    const roundCount = getWarmupStepRoundCount(step);
    const roundSec = getWarmupRoundDurationSec(step, bpm);
    const startRound = i === sIdx ? Math.max(0, Math.min(roundCount - 1, w?.keyOffsetIndex || 0)) : 0;
    totalSec += (roundCount - startRound) * roundSec;
  }
  return Math.max(0, Math.round(totalSec));
}

function getWarmupTonicMidi(step, roundIdx = 0, w = state.warmup) {
  const voiceDef = getLocalizedWarmupVoiceRange(w?.voiceRange);
  const offset = Array.isArray(step?.keyOffsets) && step.keyOffsets.length > 0
    ? step.keyOffsets[Math.max(0, Math.min(step.keyOffsets.length - 1, roundIdx))]
    : 0;
  const rawMidi = voiceDef.baseMidi + offset + (w?.transposeShift || 0);
  return Math.max(36, Math.min(82, rawMidi));
}

function clearWarmupTimers() {
  const w = state.warmup;
  if (!w) return;
  w.token += 1;
  if (w.timerId !== null) {
    clearTimeout(w.timerId);
    w.timerId = null;
  }
  if (w.tickIntervalId !== null) {
    clearInterval(w.tickIntervalId);
    w.tickIntervalId = null;
  }
}

function scheduleWarmupCallback(fn, delayMs, expectedToken) {
  const w = state.warmup;
  if (!w) return;
  if (w.timerId !== null) {
    clearTimeout(w.timerId);
    w.timerId = null;
  }
  w.timerId = setTimeout(() => {
    w.timerId = null;
    if (!state.warmup || state.warmup.token !== expectedToken || state.warmup.status !== "running" || state.currentView !== "warmup") {
      return;
    }
    fn(expectedToken);
  }, Math.max(0, Math.round(delayMs)));
}

function toggleWarmupPopover(popoverId, btnId) {
  const target = document.getElementById(popoverId);
  if (!target) return;
  const wasHidden = target.classList.contains("hidden");
  closeTransientPopovers();
  if (wasHidden) {
    target.classList.remove("hidden");
    document.getElementById(btnId)?.classList.add("chip-open");
  }
}

function renderWarmupKeyboard(tonicMidi, activeMidis = []) {
  const wrap = document.getElementById("warmupKeyboardWrap");
  if (!wrap) return;

  const activeSet = new Set(Array.isArray(activeMidis) ? activeMidis : []);
  const startBase = Math.max(36, Math.min(72, (Number.isFinite(tonicMidi) ? tonicMidi : 60) - 2));
  const firstWhite = prevWhiteMidi(startBase);

  const whiteKeys = [];
  const blackKeys = [];
  let m = firstWhite;
  while (whiteKeys.length < 15 && m <= 96) {
    if (isWhiteMidi(m)) {
      whiteKeys.push({ midi: m, label: getWhiteNoteLabel(m % 12) });
    } else {
      blackKeys.push({ midi: m, afterWhiteIdx: whiteKeys.length - 1 });
    }
    m += 1;
  }

  const kb = document.createElement("div");
  kb.className = "warmup-kb";

  whiteKeys.forEach(wk => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "warmup-kb-white";
    btn.id = `warmupKey_${wk.midi}`;
    btn.dataset.midi = wk.midi;
    if (wk.midi === tonicMidi) btn.classList.add("is-tonic");
    if (activeSet.has(wk.midi)) btn.classList.add("is-active");

    const pc = ((wk.midi % 12) + 12) % 12;
    if (pc === 0 || wk.midi === tonicMidi) {
      const oct = Math.floor(wk.midi / 12) - 1;
      const lbl = document.createElement("span");
      lbl.className = "warmup-kb-note";
      lbl.textContent = pc === 0 ? `${wk.label}${oct}` : wk.label;
      btn.appendChild(lbl);
    }

    btn.addEventListener("click", () => auditionWarmupKeyboardNote(wk.midi));
    kb.appendChild(btn);
  });

  const whiteCount = whiteKeys.length || 15;
  const blackWidthPct = (100 / whiteCount) * 0.64;

  blackKeys.forEach(bk => {
    if (bk.afterWhiteIdx < 0 || bk.afterWhiteIdx >= whiteCount - 1) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "warmup-kb-black";
    btn.id = `warmupKey_${bk.midi}`;
    btn.dataset.midi = bk.midi;
    btn.style.left = `${((bk.afterWhiteIdx + 1) / whiteCount) * 100}%`;
    btn.style.width = `${blackWidthPct}%`;
    if (bk.midi === tonicMidi) btn.classList.add("is-tonic");
    if (activeSet.has(bk.midi)) btn.classList.add("is-active");

    btn.addEventListener("click", () => auditionWarmupKeyboardNote(bk.midi));
    kb.appendChild(btn);
  });

  wrap.innerHTML = "";
  wrap.appendChild(kb);
}

function updateWarmupKeyboardHighlights(tonicMidi, activeMidis = []) {
  const wrap = document.getElementById("warmupKeyboardWrap");
  if (!wrap) return;
  const hasTonicEl = document.getElementById(`warmupKey_${tonicMidi}`);
  const activeArr = Array.isArray(activeMidis) ? activeMidis : [];
  const missingActive = activeArr.some(m => !document.getElementById(`warmupKey_${m}`));
  if (!hasTonicEl || missingActive) {
    renderWarmupKeyboard(tonicMidi, activeArr);
    return;
  }
  const activeSet = new Set(activeArr);
  wrap.querySelectorAll("[data-midi]").forEach(el => {
    const midi = parseInt(el.dataset.midi, 10);
    el.classList.toggle("is-tonic", midi === tonicMidi);
    el.classList.toggle("is-active", activeSet.has(midi));
  });
}

async function auditionWarmupKeyboardNote(midi) {
  await ensureAudioReady();
  const w = state.warmup;
  audioEngine.playWarmupNotes(w.soundMode, [midiToNote(midi)], 0.85, false);
  w.activeMidis = [midi];
  updateWarmupKeyboardHighlights(w.currentTonicMidi, [midi]);
  const checkToken = w.token;
  setTimeout(() => {
    if (state.warmup.token === checkToken && state.warmup.status !== "running") {
      state.warmup.activeMidis = [];
      updateWarmupKeyboardHighlights(state.warmup.currentTonicMidi, []);
    }
  }, 550);
}

function syncWarmupCountdownDisplay(liveDecrementSec = 0) {
  const badge = document.getElementById("warmupRemainingBadge");
  if (!badge) return;
  const baseRem = getWarmupRemainingSec(state.warmup);
  const shown = Math.max(0, baseRem - Math.max(0, Math.floor(liveDecrementSec)));
  badge.textContent = `⏱ ${formatSessionMMSS(shown)}`;
}

function renderWarmupView() {
  const w = state.warmup;
  if (!w) return;
  const preset = getLocalizedWarmupPreset(w.presetId);
  const steps = getWarmupStepsForPreset(w.presetId);
  const safeIdx = Math.max(0, Math.min(steps.length - 1, w.stepIndex));
  const step = steps[safeIdx];
  const phaseInfo = getWarmupPhaseInfo(step.phaseId);
  const voiceRange = getLocalizedWarmupVoiceRange(w.voiceRange);
  const soundMode = getLocalizedWarmupSoundMode(w.soundMode);
  const tonicMidi = getWarmupTonicMidi(step, w.keyOffsetIndex, w);
  w.currentTonicMidi = tonicMidi;

  const titleEl = document.getElementById("warmupTitleText");
  if (titleEl) titleEl.textContent = preset.title;

  const voiceBtn = document.getElementById("warmupVoiceBtn");
  if (voiceBtn) voiceBtn.textContent = voiceRange.label;
  document.querySelectorAll("[data-warmup-voice]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.warmupVoice === w.voiceRange);
  });

  const soundBtn = document.getElementById("warmupSoundBtn");
  if (soundBtn) soundBtn.textContent = soundMode.label;
  document.querySelectorAll("[data-warmup-sound]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.warmupSound === w.soundMode);
  });

  const bpmBtn = document.getElementById("warmupBpmBtn");
  const bpmSlider = document.getElementById("warmupBpmSlider");
  const bpmVal = document.getElementById("warmupBpmVal");
  if (bpmBtn) bpmBtn.textContent = `${w.bpm} BPM`;
  if (bpmSlider) bpmSlider.value = w.bpm;
  if (bpmVal) bpmVal.textContent = `${w.bpm} BPM`;

  syncWarmupCountdownDisplay(0);

  const pillsWrap = document.getElementById("warmupPhasePills");
  if (pillsWrap) {
    const activePhaseNum = phaseInfo.num;
    pillsWrap.innerHTML = WARMUP_PHASES.map(p => {
      const hasPhaseSteps = steps.some(s => s.phaseId === p.id);
      if (!hasPhaseSteps) return "";
      const cls = p.num < activePhaseNum ? "is-done" : (p.num === activePhaseNum ? "is-active" : "");
      return `<button type="button" class="warmup-phase-pill ${cls}" data-warmup-phase="${p.id}">${tr(p.shortDe, p.shortEn)}</button>`;
    }).join("");
    pillsWrap.querySelectorAll("[data-warmup-phase]").forEach(pill => {
      pill.addEventListener("click", () => {
        jumpToWarmupPhase(pill.dataset.warmupPhase);
      });
    });
  }

  const pct = w.status === "completed"
    ? 100
    : Math.round(((safeIdx + (w.keyOffsetIndex / Math.max(1, getWarmupStepRoundCount(step)))) / Math.max(1, steps.length)) * 100);
  const progressEl = document.getElementById("warmupProgressFill");
  if (progressEl) progressEl.style.width = `${Math.max(0, Math.min(100, pct))}%`;

  const counterEl = document.getElementById("warmupStepCounter");
  if (counterEl) {
    counterEl.textContent = w.status === "completed"
      ? tr("Fertig ✓", "Done ✓")
      : `${safeIdx + 1} / ${steps.length}`;
  }

  const isBreath = step.kind === "breath-orb" || step.kind === "breath-pulse";
  const stageCard = document.getElementById("warmupStageCard");
  if (stageCard) {
    stageCard.className = `central-stage warmup-stage-card ${phaseInfo.cls}${isBreath && w.status !== "completed" ? " is-breath-step" : ""}`;
  }

  const mascotEl = document.getElementById("warmupMascotWrap");
  if (mascotEl) {
    const mood = w.status === "completed" ? "happy" : (w.status === "running" ? "idle" : "thinking");
    mascotEl.innerHTML = getMascotSVG(mood);
  }

  const phaseBadgeEl = document.getElementById("warmupPhaseBadge");
  if (phaseBadgeEl) {
    phaseBadgeEl.textContent = w.status === "completed"
      ? tr("EINSINGEN ABGESCHLOSSEN", "WARMUP COMPLETE")
      : phaseInfo.label;
  }

  const orbWrap = document.getElementById("warmupBreathOrbWrap");
  const orb = document.getElementById("warmupBreathOrb");
  const orbCue = document.getElementById("warmupBreathCue");
  if (orbWrap && orb && orbCue) {
    orbWrap.classList.toggle("hidden", !isBreath || w.status === "completed");
    orb.className = "warmup-breath-orb";
    if (w.breathCueKey === "inhale") orb.classList.add("is-inhale");
    else if (w.breathCueKey === "hold") orb.classList.add("is-hold");
    else if (w.breathCueKey === "exhale") orb.classList.add("is-exhale");
    else if (w.breathCueKey === "rest") orb.classList.add("is-rest");
    else if (w.breathCueKey === "pulse") orb.classList.add("is-pulse");
    orbCue.textContent = w.breathCueText || tr("Bereit", "Ready");
  }

  const titleStepEl = document.getElementById("warmupStepTitle");
  if (titleStepEl) {
    titleStepEl.textContent = w.status === "completed"
      ? tr("Stimme ist warm & bereit!", "Voice is warm & ready!")
      : tr(step.titleDe, step.titleEn);
  }

  const sylEl = document.getElementById("warmupSyllableMain");
  if (sylEl) {
    sylEl.textContent = w.status === "completed"
      ? tr("Bravo!", "Great job!")
      : (w.vowelLabel || tr(step.syllableDe, step.syllableEn));
  }

  const degEl = document.getElementById("warmupPatternDegrees");
  const showDeg = !isBreath && w.status !== "completed" && Boolean(step.degreesText);
  if (degEl) {
    degEl.classList.toggle("hidden", !showDeg);
    if (showDeg) degEl.textContent = step.degreesText;
  }

  const keyInfo = getWarmupKeyNameFromMidi(tonicMidi);
  const noteText = midiToGermanNote(tonicMidi, keyInfo.preferFlat);
  const keyBadgeEl = document.getElementById("warmupKeyNoteBadge");
  const roundTotal = getWarmupStepRoundCount(step);
  const showKeyBadge = !isBreath && w.status !== "completed";
  if (keyBadgeEl) {
    keyBadgeEl.classList.toggle("hidden", !showKeyBadge);
    if (showKeyBadge) {
      keyBadgeEl.textContent = `${keyInfo.keyName} (${noteText}) • ${w.keyOffsetIndex + 1}/${roundTotal}`;
    }
  }
  const metaRow = document.getElementById("warmupMetaRow");
  if (metaRow) {
    metaRow.classList.toggle("hidden", !showDeg && !showKeyBadge);
  }

  const hintEl = document.getElementById("warmupStageHint");
  if (hintEl) {
    if (w.status === "completed") {
      hintEl.textContent = tr(
        "Viel Freude beim Singen und Musizieren! Tippe unten auf Starten für eine neue Runde.",
        "Have a great rehearsal or practice session! Tap below to restart anytime."
      );
    } else if (w.hintText) {
      hintEl.textContent = w.hintText;
    } else {
      hintEl.textContent = tr(step.hintDe, step.hintEn);
    }
  }

  const manualBar = document.getElementById("warmupManualBar");
  const kbWrap = document.getElementById("warmupKeyboardWrap");
  const hideTonalTools = isBreath;
  if (manualBar) manualBar.classList.toggle("hidden", isBreath || w.status === "completed");
  if (kbWrap) {
    kbWrap.classList.toggle("hidden", hideTonalTools || w.status === "completed");
    if (!hideTonalTools && w.status !== "completed") {
      renderWarmupKeyboard(tonicMidi, w.activeMidis);
    }
  }

  const playBtn = document.getElementById("warmupPlayBtn");
  if (playBtn) {
    if (w.status === "running") {
      playBtn.textContent = tr("⏸ Pause", "⏸ Pause");
      playBtn.classList.add("btn-stop");
    } else if (w.status === "paused") {
      playBtn.textContent = tr("▶ Weiter", "▶ Resume");
      playBtn.classList.remove("btn-stop");
    } else if (w.status === "completed") {
      playBtn.textContent = tr("↻ Nochmal einsingen", "↻ Warmup Again");
      playBtn.classList.remove("btn-stop");
    } else {
      playBtn.textContent = tr("▶ Einsingen starten", "▶ Start Warmup");
      playBtn.classList.remove("btn-stop");
    }
  }

  const prevBtn = document.getElementById("warmupPrevBtn");
  const nextBtn = document.getElementById("warmupNextBtn");
  if (prevBtn) prevBtn.disabled = safeIdx <= 0 && w.keyOffsetIndex <= 0;
  if (nextBtn) nextBtn.disabled = safeIdx >= steps.length - 1 && w.status === "completed";

  state.updateHeaderSubtext();
}

function playWarmupMajorTriadCue(tonicMidi, durSec, soundMode) {
  const notes = [midiToNote(tonicMidi), midiToNote(tonicMidi + 4), midiToNote(tonicMidi + 7)];
  audioEngine.playWarmupNotes(soundMode, notes, durSec, true);
}

function runCurrentWarmupRound() {
  const w = state.warmup;
  if (!w || w.status !== "running" || state.currentView !== "warmup") return;

  const steps = getWarmupStepsForPreset(w.presetId);
  if (w.stepIndex >= steps.length) {
    finishWarmupSession();
    return;
  }

  const step = steps[w.stepIndex];
  const roundCount = getWarmupStepRoundCount(step);
  if (w.keyOffsetIndex >= roundCount) {
    w.stepIndex += 1;
    w.keyOffsetIndex = 0;
    w.transposeShift = 0;
    runCurrentWarmupRound();
    return;
  }

  const token = w.token;
  const beatSec = 60 / Math.max(60, Math.min(140, w.bpm || WARMUP_DEFAULT_BPM));
  const beatMs = beatSec * 1000;
  const tonicMidi = getWarmupTonicMidi(step, w.keyOffsetIndex, w);
  const keyInfo = getWarmupKeyNameFromMidi(tonicMidi);
  w.currentTonicMidi = tonicMidi;
  w.activeMidis = [];
  w.vowelLabel = "";
  w.breathCueKey = "idle";
  w.breathCueText = "";
  w.hintText = tr(step.hintDe, step.hintEn);
  w.roundStartedWallMs = Date.now();

  if (w.tickIntervalId !== null) clearInterval(w.tickIntervalId);
  w.tickIntervalId = setInterval(() => {
    if (!state.warmup || state.warmup.status !== "running" || state.warmup.token !== token) return;
    const elapsedSec = (Date.now() - state.warmup.roundStartedWallMs) / 1000;
    syncWarmupCountdownDisplay(elapsedSec);
  }, 500);

  renderWarmupView();

  const advanceRoundOrStep = () => {
    if (!state.warmup || state.warmup.token !== token || state.warmup.status !== "running") return;
    w.keyOffsetIndex += 1;
    if (w.keyOffsetIndex >= roundCount) {
      w.stepIndex += 1;
      w.keyOffsetIndex = 0;
      w.transposeShift = 0;
    }
    runCurrentWarmupRound();
  };

  if (step.kind === "breath-orb") {
    const cycles = step.cycles || 3;
    const oneCycleMs = (step.cyclePhases || []).reduce((sum, p) => sum + p.sec * 1000, 0);
    let cursorMs = 0;
    for (let c = 0; c < cycles; c++) {
      step.cyclePhases.forEach(p => {
        const atMs = cursorMs;
        cursorMs += p.sec * 1000;
        const cycleLabel = `${tr("Zyklus", "Cycle")} ${c + 1}/${cycles}`;
        audioEngine.registerTimer(() => {
          if (state.warmup.token !== token || state.warmup.status !== "running") return;
          w.breathCueKey = p.cue;
          w.breathCueText = tr(p.de, p.en);
          w.hintText = `${cycleLabel} • ${tr(p.detailDe || step.hintDe, p.detailEn || step.hintEn)}`;
          const orb = document.getElementById("warmupBreathOrb");
          const cueEl = document.getElementById("warmupBreathCue");
          const hintEl = document.getElementById("warmupStageHint");
          if (orb) {
            orb.className = "warmup-breath-orb";
            orb.classList.add(`is-${p.cue}`);
          }
          if (cueEl) cueEl.textContent = w.breathCueText;
          if (hintEl) hintEl.textContent = w.hintText;
          if (p.cueNoteOffset !== null && p.cueNoteOffset !== undefined) {
            audioEngine.playWarmupNotes("piano", [midiToNote(tonicMidi + p.cueNoteOffset)], 0.55, true);
          }
        }, atMs);
      });
    }
    scheduleWarmupCallback(advanceRoundOrStep, cycles * oneCycleMs + 220, token);
    return;
  }

  if (step.kind === "breath-pulse") {
    const pulses = step.pulseCount || 4;
    for (let i = 0; i < pulses; i++) {
      audioEngine.registerTimer(() => {
        if (state.warmup.token !== token || state.warmup.status !== "running") return;
        audioEngine.triggerPercussion(i === 0 ? "accent" : "clave", null, i === 0 ? 0.92 : 0.78);
        w.breathCueKey = "pulse";
        w.breathCueText = `${tr("Impuls", "Pulse")} ${i + 1}/${pulses}`;
        const orb = document.getElementById("warmupBreathOrb");
        const cueEl = document.getElementById("warmupBreathCue");
        if (orb) {
          orb.classList.add("is-pulse");
          setTimeout(() => orb.classList.remove("is-pulse"), Math.min(200, Math.round(beatMs * 0.4)));
        }
        if (cueEl) cueEl.textContent = w.breathCueText;
      }, i * beatMs);
    }
    audioEngine.registerTimer(() => {
      if (state.warmup.token !== token || state.warmup.status !== "running") return;
      w.breathCueKey = "inhale";
      w.breathCueText = tr("Einatmen", "Breathe in");
      const cueEl = document.getElementById("warmupBreathCue");
      const orb = document.getElementById("warmupBreathOrb");
      if (orb) orb.className = "warmup-breath-orb is-inhale";
      if (cueEl) cueEl.textContent = w.breathCueText;
    }, pulses * beatMs);
    scheduleWarmupCallback(advanceRoundOrStep, (pulses + (step.restBeats || 2.5)) * beatMs, token);
    return;
  }

  // Cue-Akkord + kurze Einatem-Lücke vor allen gesungenen Übungen
  const cueMs = (step.cueChordBeats || 1.25) * beatMs;
  const startVocalMs = cueMs + (step.breathGapBeats || 0.75) * beatMs;
  playWarmupMajorTriadCue(tonicMidi, Math.max(0.55, cueMs / 1000 * 0.92), w.soundMode);
  w.activeMidis = [tonicMidi, tonicMidi + 4, tonicMidi + 7];
  updateWarmupKeyboardHighlights(tonicMidi, w.activeMidis);

  if (step.kind === "vowel-blend") {
    const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
    const vowels = lang === "ur"
      ? (step.vowelsUr || step.vowelsEn)
      : lang === "uk"
        ? (step.vowelsUk || step.vowelsEn)
        : lang === "pl"
          ? (step.vowelsPl || step.vowelsEn)
          : lang === "fr"
            ? (step.vowelsFr || step.vowelsEn)
            : (lang === "en" ? step.vowelsEn : step.vowelsDe);
    const stepMs = (step.vowelStepBeats || 1.9) * beatMs;
    const tonicNote = midiToNote(tonicMidi);
    const subDomNotes = [midiToNote(tonicMidi), midiToNote(tonicMidi + 5), midiToNote(tonicMidi + 9)];
    const homeChordNotes = [midiToNote(tonicMidi), midiToNote(tonicMidi + 4), midiToNote(tonicMidi + 7)];

    audioEngine.registerTimer(() => {
      if (state.warmup.token !== token || state.warmup.status !== "running") return;
      audioEngine.playWarmupNotes(w.soundMode, [tonicNote], (vowels.length * stepMs) / 1000 * 0.96, false);
      w.activeMidis = [tonicMidi];
      updateWarmupKeyboardHighlights(tonicMidi, [tonicMidi]);
    }, startVocalMs);

    vowels.forEach((vLabel, vIdx) => {
      audioEngine.registerTimer(() => {
        if (state.warmup.token !== token || state.warmup.status !== "running") return;
        w.vowelLabel = vLabel;
        const sylEl = document.getElementById("warmupSyllableMain");
        if (sylEl) sylEl.textContent = vLabel;
        if (vIdx === 2) {
          audioEngine.playWarmupNotes("piano", subDomNotes, (stepMs * 2) / 1000, true);
        } else if (vIdx === 4) {
          audioEngine.playWarmupNotes("piano", homeChordNotes, (stepMs * 1.4) / 1000, true);
        }
      }, startVocalMs + vIdx * stepMs);
    });

    const endMs = startVocalMs + vowels.length * stepMs + (step.postRestBeats || 1.0) * beatMs;
    scheduleWarmupCallback(advanceRoundOrStep, endMs, token);
    return;
  }

  if (step.kind === "choir-cadence") {
    const cBeatMs = (step.cadenceBeat || 1.35) * beatMs;
    const sBeatMs = (step.stackStepBeats || 1.15) * beatMs;
    const holdMs = (step.holdBeats || 4.5) * beatMs;
    const bassMidi = Math.max(40, tonicMidi >= 48 ? tonicMidi - 12 : tonicMidi);
    const tenorMidi = bassMidi + 7;
    const altMidi = bassMidi + 12;
    const sopMidi = bassMidi + 16;

    const layers = [
      { midi: bassMidi, labelDe: "1. Bass: Grundton einstimmen",   labelEn: "1. Bass: Lock the root" },
      { midi: tenorMidi,labelDe: "2. Tenor: Reine Quinte darüber", labelEn: "2. Tenor: Pure 5th above" },
      { midi: altMidi,  labelDe: "3. Alt: Oktave einschwingen",    labelEn: "3. Alto: Blend the octave" },
      { midi: sopMidi,  labelDe: "4. Sopran: Strahlende Terz!",    labelEn: "4. Soprano: Shining major 3rd!" }
    ];

    const stackStartMs = cueMs + beatMs * 0.8;
    const accumulated = [];
    layers.forEach((layer, idx) => {
      audioEngine.registerTimer(() => {
        if (state.warmup.token !== token || state.warmup.status !== "running") return;
        accumulated.push(layer.midi);
        const isLast = idx === layers.length - 1;
        const holdNoteSec = ((layers.length - idx) * sBeatMs + holdMs) / 1000 * 0.94;
        audioEngine.playWarmupNotes(
          w.soundMode === "piano" ? "piano" : "voice",
          [midiToNote(layer.midi)],
          holdNoteSec,
          false
        );
        if (isLast && w.soundMode !== "voice") {
          audioEngine.playWarmupNotes(
            "piano-voice",
            accumulated.map(m => midiToNote(m)),
            holdMs / 1000 * 0.96,
            false,
            true
          );
        }
        w.activeMidis = accumulated.slice();
        w.hintText = `${tr(layer.labelDe, layer.labelEn)} (${keyInfo.keyName})`;
        const hintEl = document.getElementById("warmupStageHint");
        if (hintEl) hintEl.textContent = w.hintText;
        updateWarmupKeyboardHighlights(tonicMidi, w.activeMidis);
      }, stackStartMs + idx * sBeatMs);
    });

    const totalEndMs = stackStartMs + layers.length * sBeatMs + holdMs + (step.postRestBeats || 1.2) * beatMs;
    scheduleWarmupCallback(advanceRoundOrStep, totalEndMs, token);
    return;
  }

  // Standard vocal-pattern (Summen, Seufzer, Dreiklangs-Arpeggio, Oktav-Staccato, Cool-Down)
  let elapsedNoteMs = 0;
  (step.semitones || []).forEach((semi, nIdx) => {
    const noteBeatDur = (step.noteBeats?.[nIdx] || 0.9) * beatMs;
    const noteDurSec = step.staccato && nIdx < step.semitones.length - 1
      ? Math.max(0.22, (noteBeatDur / 1000) * 0.56)
      : Math.max(0.28, (noteBeatDur / 1000) * 0.94);
    const playMidi = tonicMidi + semi;
    const playAtMs = startVocalMs + elapsedNoteMs;
    elapsedNoteMs += noteBeatDur;

    audioEngine.registerTimer(() => {
      if (state.warmup.token !== token || state.warmup.status !== "running") return;
      audioEngine.playWarmupNotes(w.soundMode, [midiToNote(playMidi)], noteDurSec, false);
      w.activeMidis = [playMidi];
      updateWarmupKeyboardHighlights(tonicMidi, [playMidi]);
    }, playAtMs);
  });

  const roundEndMs = startVocalMs + elapsedNoteMs + (step.postRestBeats || 0.85) * beatMs;
  scheduleWarmupCallback(advanceRoundOrStep, roundEndMs, token);
}

async function startOrResumeWarmup() {
  const w = state.warmup;
  if (!w) return;
  if (w.status === "completed") {
    w.stepIndex = 0;
    w.keyOffsetIndex = 0;
    w.transposeShift = 0;
  }
  clearWarmupTimers();
  const entryToken = w.token;
  w.status = "running";
  renderWarmupView();

  await ensureAudioReady();
  if (!state.warmup || state.warmup.token !== entryToken || state.warmup.status !== "running" || state.currentView !== "warmup") {
    return;
  }
  runCurrentWarmupRound();
}

function pauseWarmupSession(options = {}) {
  const w = state.warmup;
  if (!w) return;
  clearWarmupTimers();
  if (!options.keepPlayback) {
    stopPlayback();
  }
  if (w.status === "running") {
    w.status = "paused";
  }
  w.activeMidis = [];
  if (state.currentView === "warmup") {
    renderWarmupView();
  }
}

function finishWarmupSession() {
  clearWarmupTimers();
  stopPlayback();
  const w = state.warmup;
  w.status = "completed";
  w.activeMidis = [];
  w.breathCueKey = "idle";
  w.vowelLabel = "";
  renderWarmupView();
}

function toggleWarmupPlayPause() {
  if (state.warmup?.status === "running") {
    pauseWarmupSession();
  } else {
    startOrResumeWarmup();
  }
}

function jumpToWarmupPhase(phaseId) {
  const steps = getWarmupStepsForPreset(state.warmup.presetId);
  const idx = steps.findIndex(s => s.phaseId === phaseId);
  if (idx < 0) return;
  const wasRunning = state.warmup.status === "running";
  clearWarmupTimers();
  stopPlayback();
  state.warmup.stepIndex = idx;
  state.warmup.keyOffsetIndex = 0;
  state.warmup.transposeShift = 0;
  state.warmup.activeMidis = [];
  state.warmup.vowelLabel = "";
  state.warmup.breathCueKey = "idle";
  if (wasRunning) {
    startOrResumeWarmup();
  } else {
    if (state.warmup.status === "completed") state.warmup.status = "idle";
    renderWarmupView();
  }
}

function stepWarmupIndex(delta) {
  const steps = getWarmupStepsForPreset(state.warmup.presetId);
  const nextIdx = Math.max(0, Math.min(steps.length - 1, state.warmup.stepIndex + delta));
  const wasRunning = state.warmup.status === "running";
  clearWarmupTimers();
  stopPlayback();
  state.warmup.stepIndex = nextIdx;
  state.warmup.keyOffsetIndex = 0;
  state.warmup.transposeShift = 0;
  state.warmup.activeMidis = [];
  state.warmup.vowelLabel = "";
  state.warmup.breathCueKey = "idle";
  if (wasRunning) {
    startOrResumeWarmup();
  } else {
    if (state.warmup.status === "completed") state.warmup.status = "idle";
    renderWarmupView();
  }
}

async function replayWarmupRound() {
  const w = state.warmup;
  if (!w) return;
  if (w.status === "running") {
    clearWarmupTimers();
    stopPlayback();
    runCurrentWarmupRound();
    return;
  }
  await ensureAudioReady();
  const steps = getWarmupStepsForPreset(w.presetId);
  const step = steps[Math.max(0, Math.min(steps.length - 1, w.stepIndex))];
  const tonicMidi = getWarmupTonicMidi(step, w.keyOffsetIndex, w);
  playWarmupMajorTriadCue(tonicMidi, 0.85, w.soundMode);
  w.activeMidis = [tonicMidi, tonicMidi + 4, tonicMidi + 7];
  renderWarmupView();
}

async function shiftWarmupTranspose(deltaSemitones) {
  const w = state.warmup;
  if (!w) return;
  const steps = getWarmupStepsForPreset(w.presetId);
  const step = steps[Math.max(0, Math.min(steps.length - 1, w.stepIndex))];
  const nextShift = Math.max(-12, Math.min(12, (w.transposeShift || 0) + deltaSemitones));
  const previewTonic = getWarmupTonicMidi(step, w.keyOffsetIndex, { ...w, transposeShift: nextShift });
  if (previewTonic < 36 || previewTonic > 82) return;

  w.transposeShift = nextShift;
  if (w.status === "running") {
    clearWarmupTimers();
    stopPlayback();
    runCurrentWarmupRound();
  } else {
    renderWarmupView();
    await ensureAudioReady();
    playWarmupMajorTriadCue(previewTonic, 0.75, w.soundMode);
  }
}

function setWarmupVoiceRange(voiceId) {
  if (!WARMUP_VOICE_RANGES[voiceId]) return;
  state.warmup.voiceRange = voiceId;
  state.warmup.transposeShift = 0;
  closeTransientPopovers();
  if (state.warmup.status === "running") {
    clearWarmupTimers();
    stopPlayback();
    runCurrentWarmupRound();
  } else {
    renderWarmupView();
  }
}

function setWarmupSoundMode(soundId) {
  if (!WARMUP_SOUND_MODES[soundId]) return;
  state.warmup.soundMode = soundId;
  closeTransientPopovers();
  renderWarmupView();
}

function setWarmupBpm(bpm) {
  const clamped = Math.max(65, Math.min(135, parseInt(bpm, 10) || WARMUP_DEFAULT_BPM));
  state.warmup.bpm = clamped;
  renderWarmupView();
}

function openWarmupView(presetId = "full-5min", options = {}) {
  clearWarmupTimers();
  stopPlayback();
  const validPreset = WARMUP_PRESETS.some(p => p.id === presetId) ? presetId : "full-5min";
  state.warmupReturnView = options.returnView || "category";
  state.warmup.presetId = validPreset;
  state.warmup.status = "idle";
  state.warmup.stepIndex = 0;
  state.warmup.keyOffsetIndex = 0;
  state.warmup.transposeShift = 0;
  state.warmup.activeMidis = [];
  state.warmup.breathCueKey = "idle";
  state.warmup.breathCueText = "";
  state.warmup.vowelLabel = "";
  state.warmup.hintText = "";
  switchView("warmup");
}

// =====================================================
// PRAXIS-METRONOM (#viewMetronome)
// =====================================================

const METRONOME_TAP_TIMEOUT_MS = 2200;
const METRONOME_TAP_MIN_INTERVAL_MS = 110;
const METRONOME_TAP_MAX_TIMESTAMPS = 9;

const _metroRuntime = {
  runToken: 0,
  intervalId: null,
  nextNoteTime: 0,
  currentBeatIndex: 0,
  currentSubIndex: 0,
  activeBeatIndex: -1,
  swingLeft: false,
  tapTimestamps: [],
  awaitingPointerClick: false,
  lastPointerUpMs: 0,
  tapPulseTimer: null,
  tapResetTimer: null,
  hitClearTimer: null,
  visualTimers: []
};

function getMetronomeTempoMarking(bpm) {
  const safe = clampMetronomeBpm(bpm);
  if (safe < 52) return tr("Largo (Sehr breit)", "Largo (Very slow)");
  if (safe < 68) return tr("Adagio (Ruhig)", "Adagio (Slow & expressive)");
  if (safe < 88) return tr("Andante (Gehend)", "Andante (Walking pace)");
  if (safe < 112) return tr("Moderato (Mäßig)", "Moderato (Moderate)");
  if (safe < 132) return tr("Allegretto (Beschwingt)", "Allegretto (Moderately fast)");
  if (safe < 164) return tr("Allegro (Lebhaft)", "Allegro (Fast & bright)");
  if (safe < 192) return tr("Vivace (Sehr lebhaft)", "Vivace (Lively)");
  return tr("Presto (Sehr schnell)", "Presto (Very fast)");
}

function cycleMetronomeBeatState(curState) {
  if (curState === "normal") return "accent";
  if (curState === "accent") return "muted";
  return "normal";
}

/**
 * Berechnet aus einer Zeitstempel-Historie ein geglättetes Tap-Tempo in BPM.
 * Reine Funktion für UI-Taps und automatisierte Tests.
 */
function computeTapTempoFromHistory(timestamps, nowMs) {
  const prev = Array.isArray(timestamps) ? timestamps : [];
  const tNow = Number.isFinite(Number(nowMs)) ? Number(nowMs) : Date.now();
  const last = prev.length > 0 ? prev[prev.length - 1] : null;

  if (last !== null && tNow - last < METRONOME_TAP_MIN_INTERVAL_MS) {
    return { timestamps: prev.slice(), bpm: null, tapCount: prev.length, ignoredBounce: true };
  }

  const base = (last !== null && tNow - last > METRONOME_TAP_TIMEOUT_MS) ? [] : prev.slice();
  base.push(tNow);
  const trimmed = base.slice(-METRONOME_TAP_MAX_TIMESTAMPS);

  if (trimmed.length < 2) {
    return { timestamps: trimmed, bpm: null, tapCount: trimmed.length, ignoredBounce: false };
  }

  const intervals = [];
  for (let i = 1; i < trimmed.length; i++) {
    const dt = trimmed[i] - trimmed[i - 1];
    if (dt >= METRONOME_TAP_MIN_INTERVAL_MS && dt <= METRONOME_TAP_TIMEOUT_MS) {
      intervals.push(dt);
    }
  }
  if (intervals.length === 0) {
    return { timestamps: [tNow], bpm: null, tapCount: 1, ignoredBounce: false };
  }

  // Bei 4+ Intervallen sanfte Ausreißer-Bereinigung (Min/Max verwerfen), sonst gerader Mittelwert
  const used = intervals.length >= 4
    ? intervals.slice().sort((a, b) => a - b).slice(1, -1)
    : intervals;
  const avgMs = used.reduce((sum, v) => sum + v, 0) / used.length;
  const bpm = clampMetronomeBpm(60000 / avgMs);
  return { timestamps: trimmed, bpm, tapCount: trimmed.length, ignoredBounce: false };
}

function resetMetronomeStateToDefault() {
  stopMetronome();
  state.metronome = {
    bpm: METRONOME_DEFAULT_BPM,
    beats: getDefaultMeterBeats(4),
    subdivision: 1,
    running: false,
    activeProfileId: "metro_default_4_4"
  };
  _metroRuntime.tapTimestamps = [];
  _metroRuntime.activeBeatIndex = -1;
  renderMetronomeView();
}

function syncMetronomeTransportUI() {
  const playBtn = document.getElementById("metroPlayStopBtn");
  const running = Boolean(state.metronome?.running);
  if (playBtn) {
    playBtn.textContent = running
      ? tr("■ Metronom stoppen", "■ Stop Metronome")
      : tr("▶ Metronom starten", "▶ Start Metronome");
    playBtn.classList.toggle("is-playing", running);
    playBtn.classList.toggle("btn-stop", running);
  }
  const track = document.getElementById("metroPendulumTrack");
  if (track) {
    track.classList.toggle("is-running", running);
    if (!running) {
      track.classList.remove("swing-left", "swing-right", "is-accent-hit", "is-muted-hit");
    }
  }
}

function clearMetronomeVisualPulseClasses() {
  if (_metroRuntime.hitClearTimer) {
    clearTimeout(_metroRuntime.hitClearTimer);
    _metroRuntime.hitClearTimer = null;
  }
  const grid = document.getElementById("metroBeatGrid");
  if (grid && Array.isArray(grid.children)) {
    grid.children.forEach(tile => {
      tile.classList?.remove?.("is-current", "is-beat-hit");
    });
  }
  const tapBtn = document.getElementById("metroTapCircle");
  tapBtn?.classList?.remove?.("is-beat-accent", "is-beat-normal", "is-beat-muted");
  const track = document.getElementById("metroPendulumTrack");
  track?.classList?.remove?.("swing-left", "swing-right", "is-accent-hit", "is-muted-hit");
}

function triggerMetronomeBeatVisual(beatIdx, beatState) {
  const beats = state.metronome?.beats || [];
  if (!state.metronome?.running || beatIdx < 0 || beatIdx >= beats.length) return;

  _metroRuntime.activeBeatIndex = beatIdx;
  const grid = document.getElementById("metroBeatGrid");
  if (grid && Array.isArray(grid.children)) {
    grid.children.forEach((tile, idx) => {
      if (!tile?.classList) return;
      tile.classList.toggle("is-current", idx === beatIdx);
      tile.classList.remove("is-beat-hit");
      if (idx === beatIdx) {
        tile.classList.add("is-beat-hit");
      }
    });
  }

  _metroRuntime.swingLeft = !_metroRuntime.swingLeft;
  const track = document.getElementById("metroPendulumTrack");
  if (track?.classList) {
    track.classList.add("is-running");
    track.classList.toggle("swing-left", _metroRuntime.swingLeft);
    track.classList.toggle("swing-right", !_metroRuntime.swingLeft);
    track.classList.toggle("is-accent-hit", beatState === "accent");
    track.classList.toggle("is-muted-hit", beatState === "muted");
  }

  const tapCircle = document.getElementById("metroTapCircle");
  if (tapCircle?.classList) {
    tapCircle.classList.toggle("is-beat-accent", beatState === "accent");
    tapCircle.classList.toggle("is-beat-normal", beatState === "normal");
    tapCircle.classList.toggle("is-beat-muted", beatState === "muted");
  }

  if (_metroRuntime.hitClearTimer) clearTimeout(_metroRuntime.hitClearTimer);
  const pulseMs = Math.max(90, Math.min(260, Math.round((60000 / clampMetronomeBpm(state.metronome.bpm)) * 0.45)));
  _metroRuntime.hitClearTimer = setTimeout(() => {
    _metroRuntime.hitClearTimer = null;
    if (grid && Array.isArray(grid.children)) {
      grid.children.forEach(tile => tile?.classList?.remove?.("is-beat-hit"));
    }
    tapCircle?.classList?.remove?.("is-beat-accent", "is-beat-normal", "is-beat-muted");
  }, pulseMs);
}

function clearPendingMetronomeVisualTimers() {
  if (Array.isArray(_metroRuntime.visualTimers)) {
    _metroRuntime.visualTimers.forEach(id => clearTimeout(id));
  }
  _metroRuntime.visualTimers = [];
}

function advanceMetronomePointer() {
  const beats = state.metronome.beats || ["accent", "normal", "normal", "normal"];
  const beatCount = Math.max(1, beats.length);
  const sub = METRONOME_VALID_SUBDIVISIONS.includes(state.metronome.subdivision) ? state.metronome.subdivision : 1;
  const secPerStep = (60 / clampMetronomeBpm(state.metronome.bpm)) / sub;

  _metroRuntime.nextNoteTime += secPerStep;
  _metroRuntime.currentSubIndex += 1;
  if (_metroRuntime.currentSubIndex >= sub) {
    _metroRuntime.currentSubIndex = 0;
    _metroRuntime.currentBeatIndex = (_metroRuntime.currentBeatIndex + 1) % beatCount;
  }
}

function scheduleSingleMetronomeStep(beatIdx, subIdx, whenSec, nowAudioSec, runToken) {
  const beats = state.metronome.beats || ["accent", "normal", "normal", "normal"];
  const beatCount = Math.max(1, beats.length);
  const safeIdx = ((beatIdx % beatCount) + beatCount) % beatCount;
  const beatState = beats[safeIdx] || "normal";

  if (beatState !== "muted" && audioEngine?.isInitialized) {
    const mix = getMetronomeMix();
    const masterVel = sanitizeMetronomeMixValue(mix.master, DEFAULT_METRONOME_MIX.master);
    const vel = subIdx === 0
      ? masterVel * sanitizeMetronomeMixValue(beatState === "accent" ? mix.accent : mix.normal, beatState === "accent" ? DEFAULT_METRONOME_MIX.accent : DEFAULT_METRONOME_MIX.normal)
      : masterVel * sanitizeMetronomeMixValue(mix.normal, DEFAULT_METRONOME_MIX.normal) * 0.38;
    if (vel > 0.001) {
      const kind = subIdx === 0 && beatState === "accent" ? "accent" : "tick";
      audioEngine.triggerPercussion(kind, whenSec, Math.min(1, vel));
    }
  }

  if (subIdx === 0) {
    const delayMs = Math.max(0, Math.round((whenSec - nowAudioSec) * 1000));
    if (delayMs <= 6) {
      if (state.metronome.running && _metroRuntime.runToken === runToken) {
        triggerMetronomeBeatVisual(safeIdx, beatState);
      }
    } else {
      const vtId = setTimeout(() => {
        _metroRuntime.visualTimers = _metroRuntime.visualTimers.filter(t => t !== vtId);
        if (state.metronome.running && _metroRuntime.runToken === runToken) {
          triggerMetronomeBeatVisual(safeIdx, beatState);
        }
      }, delayMs);
      _metroRuntime.visualTimers.push(vtId);
    }
  }
}

function scheduleMetronomeLoop() {
  if (!state.metronome?.running) return;
  const runToken = _metroRuntime.runToken;
  const nowAudio = (typeof Tone !== "undefined" && typeof Tone.now === "function") ? Tone.now() : 0;
  const lookaheadSec = 0.11;

  if (_metroRuntime.nextNoteTime < nowAudio - 0.5) {
    _metroRuntime.nextNoteTime = nowAudio + 0.02;
  }

  let guard = 0;
  while (state.metronome.running && _metroRuntime.nextNoteTime < nowAudio + lookaheadSec && guard < 16) {
    guard += 1;
    scheduleSingleMetronomeStep(_metroRuntime.currentBeatIndex, _metroRuntime.currentSubIndex, _metroRuntime.nextNoteTime, nowAudio, runToken);
    advanceMetronomePointer();
  }
}

async function startMetronome() {
  unlockWebAudioSync();
  stopPlayback();
  _metroRuntime.runToken += 1;
  const token = _metroRuntime.runToken;
  state.metronome.running = true;
  syncMetronomeTransportUI();

  await ensureAudioReady();
  if (!state.metronome.running || _metroRuntime.runToken !== token) return;

  if (_metroRuntime.intervalId) {
    clearInterval(_metroRuntime.intervalId);
    _metroRuntime.intervalId = null;
  }
  clearPendingMetronomeVisualTimers();

  const nowAudio = (typeof Tone !== "undefined" && typeof Tone.now === "function") ? Tone.now() : 0;
  _metroRuntime.nextNoteTime = nowAudio + 0.04;
  _metroRuntime.currentBeatIndex = 0;
  _metroRuntime.currentSubIndex = 0;
  _metroRuntime.activeBeatIndex = -1;
  _metroRuntime.swingLeft = false;

  scheduleMetronomeLoop();
  _metroRuntime.intervalId = setInterval(() => {
    scheduleMetronomeLoop();
  }, 25);
}

function stopMetronome() {
  _metroRuntime.runToken += 1;
  if (_metroRuntime.intervalId) {
    clearInterval(_metroRuntime.intervalId);
    _metroRuntime.intervalId = null;
  }
  clearPendingMetronomeVisualTimers();
  _metroRuntime.activeBeatIndex = -1;
  if (state?.metronome) {
    state.metronome.running = false;
  }
  clearMetronomeVisualPulseClasses();
  syncMetronomeTransportUI();
}

function toggleMetronomePlayback() {
  if (state.metronome?.running) {
    stopMetronome();
    return Promise.resolve(false);
  }
  return startMetronome().then(() => Boolean(state.metronome?.running));
}

function openMetronomeBpmEditor() {
  const valEl = document.getElementById("metroBpmValue");
  const inputEl = document.getElementById("metroBpmInput");
  if (!valEl || !inputEl) return;
  inputEl.value = String(clampMetronomeBpm(state.metronome?.bpm));
  valEl.classList.add("hidden");
  inputEl.classList.remove("hidden");
  inputEl.focus?.();
  inputEl.select?.();
}

function closeMetronomeBpmEditor(commit = true) {
  const valEl = document.getElementById("metroBpmValue");
  const inputEl = document.getElementById("metroBpmInput");
  if (!valEl || !inputEl) return;
  const wasOpen = !inputEl.classList.contains("hidden");
  inputEl.classList.add("hidden");
  valEl.classList.remove("hidden");
  if (commit && wasOpen) {
    const parsed = parseInt(String(inputEl.value || "").trim(), 10);
    if (Number.isFinite(parsed)) {
      setMetronomeBpm(parsed, { reschedule: true });
    } else {
      renderMetronomeBpmUI();
    }
  }
}

function renderMetronomeBpmUI() {
  const bpm = clampMetronomeBpm(state.metronome?.bpm);
  const valEl = document.getElementById("metroBpmValue");
  if (valEl) valEl.textContent = String(bpm);
  const inputEl = document.getElementById("metroBpmInput");
  if (inputEl && document?.activeElement !== inputEl) {
    inputEl.value = String(bpm);
    inputEl.classList.add("hidden");
    valEl?.classList.remove("hidden");
  }
  const sliderEl = document.getElementById("metroBpmSlider");
  if (sliderEl) sliderEl.value = String(bpm);
  const nameEl = document.getElementById("metroTempoName");
  if (nameEl) nameEl.textContent = getMetronomeTempoMarking(bpm);
  if (state.currentView === "metronome") {
    state.updateHeaderSubtext();
  }
}

function setMetronomeBpm(nextBpm, options = {}) {
  const clamped = clampMetronomeBpm(nextBpm);
  state.metronome.bpm = clamped;
  renderMetronomeBpmUI();

  // Wenn das Metronom bereits läuft, das nächste geplante Intervall direkt an das neue Tempo anpassen
  if (state.metronome?.running) {
    const nowAudio = (typeof Tone !== "undefined" && typeof Tone.now === "function") ? Tone.now() : 0;
    const sub = METRONOME_VALID_SUBDIVISIONS.includes(state.metronome.subdivision) ? state.metronome.subdivision : 1;
    const secPerStep = (60 / clamped) / sub;
    if (_metroRuntime.nextNoteTime > nowAudio + secPerStep) {
      _metroRuntime.nextNoteTime = nowAudio + secPerStep;
    }
    if (options.reschedule) {
      scheduleMetronomeLoop();
    }
  }
  return clamped;
}

function adjustMetronomeBpm(delta) {
  const step = parseInt(delta, 10) || 0;
  return setMetronomeBpm((state.metronome?.bpm || METRONOME_DEFAULT_BPM) + step);
}

function getCurrentMetronomeClockMs() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now();
  }
  return Date.now();
}

function handleMetronomeTap(customNowMs = null) {
  const hasExplicitNow =
    customNowMs !== null &&
    customNowMs !== undefined &&
    typeof customNowMs !== "boolean" &&
    Number.isFinite(Number(customNowMs));
  const nowMs = hasExplicitNow ? Number(customNowMs) : getCurrentMetronomeClockMs();
  const res = computeTapTempoFromHistory(_metroRuntime.tapTimestamps, nowMs);
  if (res.ignoredBounce) return null;

  _metroRuntime.tapTimestamps = res.timestamps;
  const tapBtn = document.getElementById("metroTapCircle");
  if (tapBtn?.classList) {
    tapBtn.classList.remove("is-tap-pulse");
    tapBtn.classList.add("is-tap-pulse");
    if (_metroRuntime.tapPulseTimer) clearTimeout(_metroRuntime.tapPulseTimer);
    _metroRuntime.tapPulseTimer = setTimeout(() => {
      _metroRuntime.tapPulseTimer = null;
      tapBtn.classList.remove("is-tap-pulse");
    }, 240);
  }

  if (res.bpm !== null) {
    setMetronomeBpm(res.bpm, { reschedule: true });
  }

  const tapSub = document.getElementById("metroTapSub");
  if (tapSub) {
    tapSub.textContent = res.bpm !== null
      ? tf("{n} Taps · {bpm}", "{n} taps · {bpm}", { n: res.tapCount, bpm: res.bpm })
      : tr("Weiter tippen …", "Keep tapping …");
  }

  if (_metroRuntime.tapResetTimer) clearTimeout(_metroRuntime.tapResetTimer);
  _metroRuntime.tapResetTimer = setTimeout(() => {
    _metroRuntime.tapResetTimer = null;
    _metroRuntime.tapTimestamps = [];
    const sub = document.getElementById("metroTapSub");
    if (sub) sub.textContent = tr("Tempo tippen", "Tap tempo");
  }, METRONOME_TAP_TIMEOUT_MS + 150);

  return res.bpm;
}

function syncMetronomeBeatTileAppearance(tile, beatIdx, beatState) {
  if (!tile) return;
  const stateClass = `state-${beatState}`;
  tile.classList.remove("state-normal", "state-accent", "state-muted");
  tile.classList.add(stateClass);
  tile.dataset.beatState = beatState;

  const getLabel = (key, deFallback, enFallback) =>
    (typeof getStaticI18nText === "function" && getStaticI18nText(key)) || tr(deFallback, enFallback);
  const num = beatIdx + 1;
  let glyphHtml = "●";
  let badgeText = getLabel("metro.stateNormal", "Normal", "Normal");
  let stateDesc = tr("Normal", "Normal");
  if (beatState === "accent") {
    glyphHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 17l2-9 6 4 6-4 2 9H4z"/></svg>`;
    badgeText = getLabel("metro.stateAccent", "Akzent", "Accent");
    stateDesc = tr("Akzentuiert", "Accented");
  } else if (beatState === "muted") {
    glyphHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>`;
    badgeText = getLabel("metro.stateMuted", "Stumm", "Mute");
    stateDesc = tr("Stumm geschaltet", "Muted");
  }

  tile.setAttribute?.("aria-label", tf("Zählzeit {n}: {state}", "Beat {n}: {state}", { n: num, state: stateDesc }));
  tile.setAttribute?.("title", tf("Zählzeit {n}: {state} (tippen zum Ändern)", "Beat {n}: {state} (tap to cycle)", { n: num, state: stateDesc }));
  tile.innerHTML = `<span class="metro-beat-num">${num}</span><span class="metro-beat-indicator">${glyphHtml}</span><span class="metro-beat-state-lbl">${escapeHtml(badgeText)}</span>`;
}

function renderMetronomeBeatGrid() {
  const beats = sanitizeMetronomeBeatsArray(state.metronome?.beats);
  state.metronome.beats = beats;
  const sub = METRONOME_VALID_SUBDIVISIONS.includes(state.metronome.subdivision) ? state.metronome.subdivision : 1;

  const countEl = document.getElementById("metroBeatCountVal");
  if (countEl) countEl.textContent = String(beats.length);

  document.querySelectorAll("[data-metro-meter]").forEach(btn => {
    const m = parseInt(btn.dataset.metroMeter, 10);
    btn.classList.toggle("active", m === beats.length);
  });

  document.querySelectorAll("[data-metro-subdiv]").forEach(btn => {
    const s = parseInt(btn.dataset.metroSubdiv, 10);
    btn.classList.toggle("active", s === sub);
  });

  const grid = document.getElementById("metroBeatGrid");
  if (!grid || typeof document.createElement !== "function") return;
  grid.innerHTML = "";

  beats.forEach((beatState, idx) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "metro-beat-tile";
    tile.dataset.metroBeat = String(idx);
    syncMetronomeBeatTileAppearance(tile, idx, beatState);
    if (state.metronome.running && _metroRuntime.activeBeatIndex === idx) {
      tile.classList.add("is-current");
    }
    tile.addEventListener("click", () => {
      toggleMetronomeBeatState(idx);
    });
    grid.appendChild(tile);
  });

  if (state.currentView === "metronome") {
    state.updateHeaderSubtext();
  }
}

function toggleMetronomeBeatState(index) {
  const beats = sanitizeMetronomeBeatsArray(state.metronome?.beats);
  if (index < 0 || index >= beats.length) return null;
  const nextState = cycleMetronomeBeatState(beats[index]);
  beats[index] = nextState;
  state.metronome.beats = beats;
  state.metronome.activeProfileId = null;

  const grid = document.getElementById("metroBeatGrid");
  const tile = grid && Array.isArray(grid.children) ? grid.children[index] : null;
  if (tile) {
    syncMetronomeBeatTileAppearance(tile, index, nextState);
  } else {
    renderMetronomeBeatGrid();
  }
  renderMetronomeProfiles();
  return nextState;
}

function setMetronomeBeatCount(nextCount) {
  const targetCount = Math.max(METRONOME_MIN_BEATS, Math.min(METRONOME_MAX_BEATS, parseInt(nextCount, 10) || 4));
  const cur = sanitizeMetronomeBeatsArray(state.metronome?.beats);
  if (targetCount > cur.length) {
    while (cur.length < targetCount) cur.push("normal");
  } else if (targetCount < cur.length) {
    cur.length = targetCount;
  }
  state.metronome.beats = cur;
  state.metronome.activeProfileId = null;
  if (_metroRuntime.currentBeatIndex >= targetCount) _metroRuntime.currentBeatIndex = 0;
  if (_metroRuntime.activeBeatIndex >= targetCount) _metroRuntime.activeBeatIndex = 0;
  renderMetronomeBeatGrid();
  renderMetronomeProfiles();
  return cur.length;
}

function applyMetronomeMeterPreset(beatCount) {
  const n = Math.max(METRONOME_MIN_BEATS, Math.min(METRONOME_MAX_BEATS, parseInt(beatCount, 10) || 4));
  state.metronome.beats = getDefaultMeterBeats(n);
  state.metronome.activeProfileId = null;
  _metroRuntime.currentBeatIndex = 0;
  _metroRuntime.activeBeatIndex = -1;
  renderMetronomeBeatGrid();
  renderMetronomeProfiles();
  return state.metronome.beats.slice();
}

function setMetronomeSubdivision(sub) {
  const num = parseInt(sub, 10);
  const valid = METRONOME_VALID_SUBDIVISIONS.includes(num) ? num : 1;
  state.metronome.subdivision = valid;
  _metroRuntime.currentSubIndex = 0;
  renderMetronomeBeatGrid();
  renderMetronomeProfiles();
  return valid;
}

function renderMetronomeProfiles() {
  const listEl = document.getElementById("metroProfileList");
  const countEl = document.getElementById("metroProfilesCount");
  const profiles = Array.isArray(state.profile?.metronomeProfiles) ? state.profile.metronomeProfiles : [];
  if (countEl) countEl.textContent = String(profiles.length);
  if (!listEl || typeof document.createElement !== "function") return;
  listEl.innerHTML = "";

  if (profiles.length === 0) {
    const empty = document.createElement("p");
    empty.className = "metro-sound-desc";
    empty.textContent = tr(
      "Noch keine Profile gespeichert. Lege oben ein eigenes Metronom-Preset ab!",
      "No profiles saved yet. Store your current metronome setup above!"
    );
    listEl.appendChild(empty);
    return;
  }

  profiles.forEach(prof => {
    const row = document.createElement("div");
    row.className = "metro-profile-row";
    const isActive = state.metronome?.activeProfileId === prof.id;
    row.classList.toggle("is-active", isActive);
    row.dataset.metroProfileId = prof.id;

    const loadBtn = document.createElement("button");
    loadBtn.type = "button";
    loadBtn.className = "metro-profile-load-btn";
    const dotsHtml = (prof.beats || []).map(st => `<span class="metro-pdot is-${st}"></span>`).join("");
    const subTag = prof.subdivision > 1 ? ` · ${prof.subdivision}×` : "";
    loadBtn.innerHTML = `
      <span class="metro-profile-name">${escapeHtml(prof.name)}</span>
      <span class="metro-profile-meta">
        <span>${prof.bpm} BPM</span>
        <span>·</span>
        <span>${tf("{n} Zählzeiten", "{n} beats", { n: (prof.beats || []).length })}${subTag}</span>
        <span class="metro-profile-dots" aria-hidden="true">${dotsHtml}</span>
      </span>
    `;
    loadBtn.addEventListener("click", () => {
      loadMetronomeProfile(prof.id);
    });

    const actions = document.createElement("div");
    actions.className = "metro-profile-actions";

    const updateBtn = document.createElement("button");
    updateBtn.type = "button";
    updateBtn.className = "metro-profile-icon-btn";
    updateBtn.textContent = "↻";
    updateBtn.title = tr("Aktuelle Werte in diesem Profil speichern", "Update profile with current settings");
    updateBtn.setAttribute?.("aria-label", tr("Profil aktualisieren", "Update profile"));
    updateBtn.addEventListener("click", () => {
      overwriteMetronomeProfile(prof.id);
    });

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "metro-profile-icon-btn is-delete";
    delBtn.textContent = "✕";
    delBtn.title = tr("Profil löschen", "Delete profile");
    delBtn.setAttribute?.("aria-label", tr("Profil löschen", "Delete profile"));
    delBtn.addEventListener("click", () => {
      deleteMetronomeProfile(prof.id);
    });

    actions.appendChild(updateBtn);
    actions.appendChild(delBtn);
    row.appendChild(loadBtn);
    row.appendChild(actions);
    listEl.appendChild(row);
  });
}

function saveCurrentMetronomeProfile(nameOverride = null) {
  if (!state.profile) return null;
  if (!Array.isArray(state.profile.metronomeProfiles)) {
    state.profile.metronomeProfiles = [];
  }
  const inputEl = document.getElementById("metroProfileNameInput");
  const rawName = nameOverride !== null && nameOverride !== undefined
    ? String(nameOverride)
    : String(inputEl?.value || "");
  const beats = sanitizeMetronomeBeatsArray(state.metronome?.beats);
  const bpm = clampMetronomeBpm(state.metronome?.bpm);
  const sub = METRONOME_VALID_SUBDIVISIONS.includes(state.metronome?.subdivision) ? state.metronome.subdivision : 1;
  const cleanName = rawName.trim().slice(0, 32) || `${beats.length}/4 · ${bpm} BPM`;

  const newEntry = sanitizeMetronomeProfileEntry({
    id: `metro_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name: cleanName,
    bpm,
    beats,
    subdivision: sub
  }, state.profile.metronomeProfiles.length);

  state.profile.metronomeProfiles = [newEntry, ...state.profile.metronomeProfiles].slice(0, 16);
  state.metronome.activeProfileId = newEntry.id;
  if (inputEl && nameOverride === null) inputEl.value = "";
  saveUserProfile(state.profile);
  renderMetronomeProfiles();
  return newEntry;
}

function loadMetronomeProfile(profileId) {
  const list = state.profile?.metronomeProfiles || [];
  const found = list.find(p => p.id === profileId);
  if (!found) return false;
  state.metronome.bpm = clampMetronomeBpm(found.bpm);
  state.metronome.beats = sanitizeMetronomeBeatsArray(found.beats);
  state.metronome.subdivision = METRONOME_VALID_SUBDIVISIONS.includes(found.subdivision) ? found.subdivision : 1;
  state.metronome.activeProfileId = found.id;
  _metroRuntime.currentBeatIndex = 0;
  _metroRuntime.currentSubIndex = 0;
  renderMetronomeView();
  return true;
}

function overwriteMetronomeProfile(profileId) {
  const list = state.profile?.metronomeProfiles || [];
  const idx = list.findIndex(p => p.id === profileId);
  if (idx === -1) return false;
  const existing = list[idx];
  list[idx] = sanitizeMetronomeProfileEntry({
    ...existing,
    bpm: clampMetronomeBpm(state.metronome?.bpm),
    beats: sanitizeMetronomeBeatsArray(state.metronome?.beats),
    subdivision: state.metronome?.subdivision || 1
  }, idx);
  state.metronome.activeProfileId = list[idx].id;
  saveUserProfile(state.profile);
  renderMetronomeProfiles();
  return true;
}

function deleteMetronomeProfile(profileId) {
  if (!state.profile || !Array.isArray(state.profile.metronomeProfiles)) return false;
  const before = state.profile.metronomeProfiles.length;
  state.profile.metronomeProfiles = state.profile.metronomeProfiles.filter(p => p.id !== profileId);
  if (state.metronome.activeProfileId === profileId) {
    state.metronome.activeProfileId = null;
  }
  saveUserProfile(state.profile);
  renderMetronomeProfiles();
  return state.profile.metronomeProfiles.length < before;
}

const METRONOME_MIX_SLIDERS = [
  { key: "master", sliderId: "metroMasterVolSlider", valId: "metroMasterVolVal" },
  { key: "accent", sliderId: "metroAccentVolSlider", valId: "metroAccentVolVal" },
  { key: "normal", sliderId: "metroNormalVolSlider", valId: "metroNormalVolVal" }
];

function getMetronomeMix() {
  if (!state.metronome.mix) {
    state.metronome.mix = sanitizeMetronomeMix(state.profile?.metronomeMix);
  }
  return state.metronome.mix;
}

function syncMetronomeVolumeUI() {
  const mix = getMetronomeMix();
  METRONOME_MIX_SLIDERS.forEach(({ key, sliderId, valId }) => {
    const val = sanitizeMetronomeMixValue(mix[key], DEFAULT_METRONOME_MIX[key]);
    const slider = document.getElementById(sliderId);
    if (slider) slider.value = String(val);
    const valEl = document.getElementById(valId);
    if (valEl) valEl.textContent = `${Math.round(val * 100)}%`;
  });
}

function setMetronomeMixValue(key, rawValue) {
  if (!Object.prototype.hasOwnProperty.call(DEFAULT_METRONOME_MIX, key)) return;
  const nextVal = sanitizeMetronomeMixValue(rawValue, DEFAULT_METRONOME_MIX[key]);
  const mix = { ...getMetronomeMix(), [key]: nextVal };
  state.metronome.mix = mix;
  if (state.profile) {
    state.profile.metronomeMix = { ...mix };
    saveUserProfile(state.profile);
  }
  syncMetronomeVolumeUI();
}

function renderMetronomeView() {
  renderMetronomeBpmUI();
  renderMetronomeBeatGrid();
  syncMetronomeVolumeUI();
  renderMetronomeProfiles();
  syncMetronomeTransportUI();
}

function openMetronomeView(returnView = "home") {
  state.metronomeReturnView = returnView;
  _metroRuntime.tapTimestamps = [];
  const tapSub = document.getElementById("metroTapSub");
  if (tapSub) tapSub.textContent = tr("Tempo tippen", "Tap tempo");
  const noticeEl = document.getElementById("metroSoundNotice");
  if (noticeEl) {
    noticeEl.textContent = "";
    noticeEl.classList.add("hidden");
  }
  switchView("metronome");
}

function initMetronomeEventListeners() {
  const tapCircle = document.getElementById("metroTapCircle");
  if (tapCircle && !tapCircle._metroBound) {
    tapCircle._metroBound = true;
    tapCircle.addEventListener("pointerdown", (e) => {
      if (e?.button !== undefined && e.button !== 0) return;
      _metroRuntime.awaitingPointerClick = true;
      handleMetronomeTap();
    });
    tapCircle.addEventListener("pointerup", () => {
      _metroRuntime.lastPointerUpMs = Date.now();
    });
    tapCircle.addEventListener("pointercancel", () => {
      _metroRuntime.awaitingPointerClick = false;
    });
    tapCircle.addEventListener("click", () => {
      if (_metroRuntime.awaitingPointerClick) {
        _metroRuntime.awaitingPointerClick = false;
        if (Date.now() - _metroRuntime.lastPointerUpMs < 400) return;
      }
      handleMetronomeTap();
    });
  }

  document.getElementById("metroBpmValue")?.addEventListener("click", () => {
    openMetronomeBpmEditor();
  });

  const bpmInputEl = document.getElementById("metroBpmInput");
  if (bpmInputEl) {
    bpmInputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault?.();
        closeMetronomeBpmEditor(true);
      } else if (e.key === "Escape") {
        e.preventDefault?.();
        closeMetronomeBpmEditor(false);
      }
    });
    bpmInputEl.addEventListener("blur", () => {
      closeMetronomeBpmEditor(true);
    });
  }

  document.getElementById("metroBpmSlider")?.addEventListener("input", (e) => {
    setMetronomeBpm(parseInt(e.target?.value, 10) || METRONOME_DEFAULT_BPM);
  });

  [
    ["metroBpmMinus5Btn", -5],
    ["metroBpmMinusBtn", -1],
    ["metroBpmPlusBtn", 1],
    ["metroBpmPlus5Btn", 5]
  ].forEach(([id, delta]) => {
    document.getElementById(id)?.addEventListener("click", () => adjustMetronomeBpm(delta));
  });

  document.getElementById("metroPlayStopBtn")?.addEventListener("click", () => {
    toggleMetronomePlayback();
  });

  document.getElementById("metroBeatDecBtn")?.addEventListener("click", () => {
    setMetronomeBeatCount((state.metronome?.beats?.length || 4) - 1);
  });
  document.getElementById("metroBeatIncBtn")?.addEventListener("click", () => {
    setMetronomeBeatCount((state.metronome?.beats?.length || 4) + 1);
  });

  document.querySelectorAll("[data-metro-meter]").forEach(btn => {
    btn.addEventListener("click", () => {
      applyMetronomeMeterPreset(parseInt(btn.dataset.metroMeter, 10));
    });
  });

  document.querySelectorAll("[data-metro-subdiv]").forEach(btn => {
    btn.addEventListener("click", () => {
      setMetronomeSubdivision(parseInt(btn.dataset.metroSubdiv, 10));
    });
  });

  METRONOME_MIX_SLIDERS.forEach(({ key, sliderId }) => {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    slider.addEventListener("input", (e) => {
      setMetronomeMixValue(key, parseFloat(e?.target?.value ?? slider.value));
    });
  });

  document.getElementById("metroProfileSaveForm")?.addEventListener("submit", (e) => {
    e?.preventDefault?.();
    saveCurrentMetronomeProfile();
  });
  document.getElementById("metroSaveProfileBtn")?.addEventListener("click", () => {
    saveCurrentMetronomeProfile();
  });

  document.querySelectorAll("[data-metro-sound-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      const slot = btn.dataset.metroSoundSlot;
      const noticeEl = document.getElementById("metroSoundNotice");
      if (!noticeEl) return;
      if (slot === "standard") {
        noticeEl.textContent = "";
        noticeEl.classList.add("hidden");
      } else {
        noticeEl.textContent = tr(
          "Eigene Klick- & Percussion-Sounds folgen in einem kommenden Update (im Masterplan vorgemerkt). Aktuell aktiv: Standard-Klick.",
          "Custom click & percussion sounds will follow in a future update (planned on the Masterplan). Currently active: Standard Click."
        );
        noticeEl.classList.remove("hidden");
      }
    });
  });
}

const WELCOME_WIZARD_STEPS = [
  "welcomeStepLang",
  "welcomeStepLook",
  "welcomeStepAutoNext",
  "welcomeStepProfile",
  "welcomeStepFocus",
  "welcomeStepGreet"
];

const BEGINNER_WELCOME_WIZARD_STEPS = [
  "welcomeStepLang",
  "welcomeStepLook",
  "welcomeStepAutoNext",
  "welcomeStepProfile",
  "welcomeStepFocus",
  "welcomeStepBeginner1",
  "welcomeStepBeginner2",
  "welcomeStepBeginner3",
  "welcomeStepGreet"
];

const _welcomeOnboardingState = {
  currentStep: 0,
  beginnerIntroOptIn: false,
  beginnerPresetApplied: false,
  selecting: false,
  exiting: false,
  stepTimer: null,
  autoTimer: null,
  exitTimer: null
};

function getActiveWelcomeWizardSteps() {
  return _welcomeOnboardingState.beginnerIntroOptIn
    ? BEGINNER_WELCOME_WIZARD_STEPS
    : WELCOME_WIZARD_STEPS;
}

function clearWelcomeOnboardingTimers() {
  if (_welcomeOnboardingState.stepTimer) {
    clearTimeout(_welcomeOnboardingState.stepTimer);
    _welcomeOnboardingState.stepTimer = null;
  }
  if (_welcomeOnboardingState.autoTimer) {
    clearTimeout(_welcomeOnboardingState.autoTimer);
    _welcomeOnboardingState.autoTimer = null;
  }
  if (_welcomeOnboardingState.exitTimer) {
    clearTimeout(_welcomeOnboardingState.exitTimer);
    _welcomeOnboardingState.exitTimer = null;
  }
}

function getWelcomeText(key, fallback) {
  const lang = state?.settings?.language || "de";
  return (typeof getStaticI18nText === "function" && getStaticI18nText(key, lang)) || fallback;
}

function syncWelcomeBeginnerOptInUI() {
  const optIn = Boolean(_welcomeOnboardingState.beginnerIntroOptIn);
  const noBtn = document.getElementById("welcomeBeginnerOptInNoBtn");
  const yesBtn = document.getElementById("welcomeBeginnerOptInYesBtn");
  if (noBtn) {
    noBtn.classList.toggle("active", !optIn);
    noBtn.setAttribute?.("aria-pressed", String(!optIn));
  }
  if (yesBtn) {
    yesBtn.classList.toggle("active", optIn);
    yesBtn.setAttribute?.("aria-pressed", String(optIn));
  }
  const presetBtn = document.getElementById("welcomeApplyBeginnerSetupBtn");
  if (presetBtn) {
    const applied = Boolean(_welcomeOnboardingState.beginnerPresetApplied);
    presetBtn.classList.toggle("is-applied", applied);
    presetBtn.textContent = applied
      ? getWelcomeText("welcome.begApplyPresetDone", "✓ Empfohlener Startpunkt (Intervalle • Stufe 1) ausgewählt")
      : getWelcomeText("welcome.begApplyPresetBtn", "✨ Empfohlenen Startpunkt (Intervalle • Stufe 1) auswählen");
  }
  const greetBegBtn = document.getElementById("welcomeGreetBeginnerBtn");
  if (greetBegBtn) {
    greetBegBtn.classList.toggle("hidden", optIn);
  }
}

function setWelcomeBeginnerIntroOptIn(enabled) {
  _welcomeOnboardingState.beginnerIntroOptIn = Boolean(enabled);
  syncWelcomeBeginnerOptInUI();
  renderWelcomeProgress(_welcomeOnboardingState.currentStep);
}

function applyWelcomeBeginnerPreset() {
  _welcomeOnboardingState.beginnerPresetApplied = true;
  if (state?.settings) {
    // Empfohlener Startpunkt: Intervalle melodisch aufwärts, Stufe 1
    state.settings.mode = "interval-melodic";
    state.settings.intervalDifficulty = 1;
  }
  if (!state.profile) state.profile = createDefaultProfile();
  // Lernschwerpunkt bleibt unverändert (es gibt keinen eigenen Intervall-Schwerpunkt)
  saveUserProfile(state.profile);
  renderProfileAccountView();
  renderHomeProfileGreeting();
  state.updateQuickStartLabel?.();
  syncWelcomeBeginnerOptInUI();
}

function renderWelcomeProgress(stepIdx = _welcomeOnboardingState.currentStep) {
  const activeSteps = getActiveWelcomeWizardSteps();
  const total = activeSteps.length;
  const idx = Math.max(0, Math.min(total - 1, Number(stepIdx) || 0));
  const textEl = document.getElementById("welcomeProgressText");
  const fillEl = document.getElementById("welcomeProgressFill");
  if (textEl) {
    textEl.textContent = getWelcomeText("welcome.stepProgress", "Schritt {n} von {total}")
      .replace("{n}", String(idx + 1))
      .replace("{total}", String(total));
  }
  if (fillEl?.style) {
    fillEl.style.width = `${Math.round(((idx + 1) / total) * 100)}%`;
  }
}

function renderWelcomeLanguageList() {
  const listEl = document.getElementById("welcomeLangList");
  if (!listEl || typeof document.createElement !== "function") return;
  const codes = typeof getAvailableLanguages === "function"
    ? getAvailableLanguages()
    : ["de", "en", "fr", "pl", "uk", "ur"];
  listEl.innerHTML = "";
  codes.forEach(code => {
    const cfg = typeof APP_LANGUAGES !== "undefined" ? (APP_LANGUAGES[code] || {}) : {};
    const nativeName = cfg.nativeName || code.toUpperCase();
    const tagline = typeof getStaticI18nText === "function"
      ? (getStaticI18nText("app.tagline", code) || "")
      : "";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "welcome-lang-btn";
    btn.dataset.welcomeLang = code;
    btn.setAttribute?.("role", "listitem");
    btn.innerHTML = `<span class="welcome-lang-text"><span class="welcome-lang-name">${escapeHtml(nativeName)}</span>${tagline ? `<span class="welcome-lang-tagline">${escapeHtml(tagline)}</span>` : ""}</span><span class="welcome-lang-arrow" aria-hidden="true">→</span>`;
    btn.addEventListener("click", () => selectWelcomeLanguage(code, btn));
    listEl.appendChild(btn);
  });
}

function renderWelcomeProfileStep() {
  const p = state.profile || createDefaultProfile();
  const nameInput = document.getElementById("welcomeProfileNameInput");
  if (nameInput && nameInput.value !== (p.name || "")) {
    nameInput.value = p.name || "";
  }
  const instWrap = document.getElementById("welcomeInstrumentsGroup");
  if (!instWrap || typeof document.createElement !== "function") return;
  instWrap.innerHTML = "";
  PROFILE_INSTRUMENT_OPTIONS.forEach(inst => {
    const active = (p.instruments || []).includes(inst);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `k-filter-pill${active ? " active" : ""}`;
    btn.dataset.welcomeInst = inst;
    btn.setAttribute?.("aria-pressed", String(active));
    btn.textContent = getLocalizedProfileInstrumentLabel(inst);
    btn.addEventListener("click", () => {
      if (!state.profile) state.profile = createDefaultProfile();
      const set = new Set(state.profile.instruments || []);
      if (set.has(inst)) set.delete(inst);
      else set.add(inst);
      state.profile.instruments = PROFILE_INSTRUMENT_OPTIONS.filter(i => set.has(i));
      saveUserProfile(state.profile);
      renderProfileAccountView();
      renderHomeProfileGreeting();
      renderWelcomeProfileStep();
    });
    instWrap.appendChild(btn);
  });

  const hasNone = (p.instruments || []).length === 0;
  const noneBtn = document.createElement("button");
  noneBtn.type = "button";
  noneBtn.className = `k-filter-pill${hasNone ? " active" : ""}`;
  noneBtn.dataset.welcomeInst = "none";
  noneBtn.setAttribute?.("aria-pressed", String(hasNone));
  noneBtn.textContent = tr("Kein Instrument", "No instrument");
  noneBtn.addEventListener("click", () => {
    if (!state.profile) state.profile = createDefaultProfile();
    state.profile.instruments = [];
    saveUserProfile(state.profile);
    renderProfileAccountView();
    renderHomeProfileGreeting();
    renderWelcomeProfileStep();
  });
  instWrap.appendChild(noneBtn);
}

function renderWelcomeFocusStep() {
  const p = state.profile || createDefaultProfile();
  const listEl = document.getElementById("welcomeFocusList");
  if (!listEl || typeof document.createElement !== "function") return;
  const activeFocuses = getResolvedProfileFocuses(p);
  listEl.innerHTML = "";
  Object.values(PROFILE_FOCUS_OPTIONS).forEach(opt => {
    const def = getLocalizedProfileFocus(opt.key);
    const isActive = activeFocuses.includes(opt.key);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `welcome-choice-card welcome-focus-card${isActive ? " active" : ""}`;
    btn.dataset.welcomeFocus = opt.key;
    btn.setAttribute?.("aria-pressed", String(isActive));
    btn.innerHTML = `<strong>${escapeHtml(def.label)}</strong><span>${escapeHtml(def.hint)}</span>`;
    btn.addEventListener("click", () => {
      if (!state.profile) state.profile = createDefaultProfile();
      const nextList = toggleProfileFocusValue(getResolvedProfileFocuses(state.profile), opt.key);
      state.profile.focuses = nextList;
      state.profile.focus = nextList[0] || "allround";
      saveUserProfile(state.profile);
      renderProfileAccountView();
      renderHomeProfileGreeting();
      renderWelcomeFocusStep();
    });
    listEl.appendChild(btn);
  });
}

function renderWelcomeGreetStep() {
  const greetMascot = document.getElementById("welcomeGreetMascot");
  const greetTitle = document.getElementById("welcomeGreetTitle");
  const greetBody = document.getElementById("welcomeGreetBody");
  const continueBtn = document.getElementById("welcomeContinueBtn");
  const redirectHint = document.getElementById("welcomeRedirectHint");

  if (greetMascot) {
    greetMascot.innerHTML = getMascotSVG("happy");
    greetMascot.classList.add("mascot-happy-hop");
  }
  const userName = String(state.profile?.name || "").trim();
  if (greetTitle) {
    greetTitle.textContent = userName
      ? getWelcomeText("welcome.greetNamedTitle", "Hallo, {name}! Schön, dass du da bist.").replace("{name}", userName)
      : getWelcomeText("welcome.greetTitle", "Hallo! Schön, dass du da bist.");
  }
  if (greetBody) {
    greetBody.textContent = getWelcomeText("welcome.greetBody", "Ich bin Lauscher und freue mich darauf, mit dir zu hören, Noten zu entdecken und Musik zu verstehen. Viel Freude und Erfolg beim Lernen!");
  }
  if (continueBtn) {
    continueBtn.textContent = getWelcomeText("welcome.continueBtn", "Los geht’s →");
  }
  if (redirectHint) {
    redirectHint.textContent = getWelcomeText("welcome.redirectHint", "Du wirst gleich zum Homescreen weitergeleitet …");
  }
  syncWelcomeBeginnerOptInUI();
}

function bindWelcomeOnboardingControls() {
  const overlay = document.getElementById("welcomeOnboarding");
  if (!overlay || overlay._welcomeWizardBound) return;
  overlay._welcomeWizardBound = true;

  document.querySelectorAll("[data-welcome-appearance]").forEach(btn => {
    btn.addEventListener("click", () => setAppearancePreference(btn.dataset.welcomeAppearance));
  });
  document.querySelectorAll("[data-welcome-theme]").forEach(btn => {
    btn.addEventListener("click", () => setThemePreference(btn.dataset.welcomeTheme));
  });
  document.querySelectorAll("[data-welcome-autonext]").forEach(btn => {
    btn.addEventListener("click", () => setAutoNextPreference(btn.dataset.welcomeAutonext));
  });
  document.getElementById("welcomeBeginnerOptInNoBtn")?.addEventListener("click", () => {
    setWelcomeBeginnerIntroOptIn(false);
  });
  document.getElementById("welcomeBeginnerOptInYesBtn")?.addEventListener("click", () => {
    setWelcomeBeginnerIntroOptIn(true);
  });
  document.getElementById("welcomeApplyBeginnerSetupBtn")?.addEventListener("click", () => {
    applyWelcomeBeginnerPreset();
  });
  document.getElementById("welcomeGreetBeginnerBtn")?.addEventListener("click", () => {
    setWelcomeBeginnerIntroOptIn(true);
    goToWelcomeStep(5);
  });

  const nameInput = document.getElementById("welcomeProfileNameInput");
  if (nameInput) {
    nameInput.addEventListener("input", () => {
      if (!state.profile) state.profile = createDefaultProfile();
      state.profile.name = String(nameInput.value || "").trim().slice(0, 24);
      saveUserProfile(state.profile);
      renderProfileAccountView();
      renderHomeProfileGreeting();
    });
  }

  document.getElementById("welcomeContinueBtn")?.addEventListener("click", () => {
    completeWelcomeOnboarding();
  });

  [
    "welcomeLookBackBtn", "welcomeLookNextBtn",
    "welcomeAutoNextBackBtn", "welcomeAutoNextNextBtn",
    "welcomeProfileBackBtn", "welcomeProfileNextBtn",
    "welcomeFocusBackBtn", "welcomeFocusNextBtn",
    "welcomeBeginner1BackBtn", "welcomeBeginner1NextBtn",
    "welcomeBeginner2BackBtn", "welcomeBeginner2NextBtn",
    "welcomeBeginner3BackBtn", "welcomeBeginner3NextBtn",
    "welcomeGreetBackBtn"
  ].forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener("click", () => {
      const dir = (btn.dataset?.welcomeNav === "prev" || btnId.endsWith("BackBtn")) ? -1 : 1;
      goToWelcomeStep(_welcomeOnboardingState.currentStep + dir);
    });
  });
}

function goToWelcomeStep(targetIdx, options = {}) {
  if (_welcomeOnboardingState.exiting) return;
  const activeSteps = getActiveWelcomeWizardSteps();
  const total = activeSteps.length;
  const nextIdx = Math.max(0, Math.min(total - 1, Number(targetIdx) || 0));
  const prevIdx = _welcomeOnboardingState.currentStep;
  const prevStepId = activeSteps[prevIdx] || WELCOME_WIZARD_STEPS[prevIdx];
  const nextStepId = activeSteps[nextIdx];

  clearWelcomeOnboardingTimers();
  _welcomeOnboardingState.currentStep = nextIdx;
  _welcomeOnboardingState.selecting = false;

  const autoFill = document.getElementById("welcomeAutoFill");
  autoFill?.classList.remove("is-counting");

  renderWelcomeProgress(nextIdx);
  if (nextStepId === "welcomeStepLook") applyThemeAndAppearance();
  if (nextStepId === "welcomeStepAutoNext") syncAutoNextControls();
  if (nextStepId === "welcomeStepProfile") renderWelcomeProfileStep();
  if (nextStepId === "welcomeStepFocus") {
    renderWelcomeFocusStep();
    syncWelcomeBeginnerOptInUI();
  }
  if (nextStepId === "welcomeStepBeginner2") syncWelcomeBeginnerOptInUI();
  if (nextStepId === "welcomeStepGreet") renderWelcomeGreetStep();

  const applyStepVisibility = () => {
    BEGINNER_WELCOME_WIZARD_STEPS.forEach((stepId) => {
      const el = document.getElementById(stepId);
      if (!el) return;
      el.classList.remove("is-step-exiting");
      el.classList.toggle("hidden", stepId !== nextStepId);
    });
    if (nextStepId === "welcomeStepGreet") {
      if (autoFill) autoFill.classList.add("is-counting");
      _welcomeOnboardingState.autoTimer = setTimeout(() => {
        completeWelcomeOnboarding();
      }, 9000);
    }
  };

  const prevEl = prevStepId && prevStepId !== nextStepId ? document.getElementById(prevStepId) : null;
  if (options.immediate || !prevEl) {
    applyStepVisibility();
    return;
  }

  const prefersReduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  prevEl.classList.add("is-step-exiting");
  _welcomeOnboardingState.stepTimer = setTimeout(() => {
    _welcomeOnboardingState.stepTimer = null;
    applyStepVisibility();
  }, prefersReduced ? 80 : 210);
}

function completeWelcomeOnboarding() {
  if (_welcomeOnboardingState.exiting) return;
  _welcomeOnboardingState.exiting = true;
  clearWelcomeOnboardingTimers();

  const overlay = document.getElementById("welcomeOnboarding");
  const homeView = document.getElementById("viewHome");
  const prefersReduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  state.settings.onboardingDone = true;
  saveVisualPrefs(
    state.settings.appearance,
    state.settings.theme,
    state.settings.language,
    state.settings.autoNextAfterCorrect,
    state.settings.playCorrectAnswerAudio,
    true
  );

  if (typeof document !== "undefined" && document.documentElement?.removeAttribute) {
    document.documentElement.removeAttribute("data-first-run");
  }
  if (state.currentView !== "home") {
    switchView("home", { animate: false, skipHistoryPush: true });
  }
  if (homeView) {
    homeView.classList.remove("home-welcome-enter");
    homeView.classList.add("home-welcome-enter");
  }
  if (overlay) {
    overlay.classList.add("welcome-out");
  }

  const exitDuration = prefersReduced ? 160 : 620;
  _welcomeOnboardingState.exitTimer = setTimeout(() => {
    if (overlay) {
      overlay.classList.add("hidden");
      overlay.classList.remove("welcome-out");
    }
    if (homeView) {
      homeView.classList.remove("home-welcome-enter");
    }
    _welcomeOnboardingState.selecting = false;
    _welcomeOnboardingState.exiting = false;
    _welcomeOnboardingState.exitTimer = null;
  }, exitDuration);
}

function selectWelcomeLanguage(lang, clickedBtn) {
  if (_welcomeOnboardingState.selecting || _welcomeOnboardingState.exiting) return;
  _welcomeOnboardingState.selecting = true;
  clearWelcomeOnboardingTimers();

  if (clickedBtn?.classList) clickedBtn.classList.add("is-selected");
  state.settings.onboardingDone = false;
  setLanguagePreference(lang);
  renderWelcomeProfileStep();
  renderWelcomeFocusStep();
  goToWelcomeStep(1);
}

function openFirstRunOnboarding() {
  const overlay = document.getElementById("welcomeOnboarding");
  if (!overlay) return false;
  clearWelcomeOnboardingTimers();
  _welcomeOnboardingState.currentStep = 0;
  _welcomeOnboardingState.beginnerIntroOptIn = false;
  _welcomeOnboardingState.beginnerPresetApplied = false;
  _welcomeOnboardingState.selecting = false;
  _welcomeOnboardingState.exiting = false;

  if (typeof document !== "undefined" && document.documentElement?.setAttribute) {
    document.documentElement.setAttribute("data-first-run", "1");
  }
  bindWelcomeOnboardingControls();
  const langMascot = document.getElementById("welcomeLangMascot");
  if (langMascot) langMascot.innerHTML = getMascotSVG("idle");
  renderWelcomeLanguageList();
  applyThemeAndAppearance();
  syncAutoNextControls();
  renderWelcomeProfileStep();
  renderWelcomeFocusStep();
  goToWelcomeStep(0, { immediate: true });

  overlay.classList.remove("hidden", "welcome-out");
  return true;
}

function initStartupSplash() {
  hydrateMascotStaticSlots();
  const splash = document.getElementById("startupSplash");
  const welcome = document.getElementById("welcomeOnboarding");

  if (isFirstRunOnboardingNeeded() && welcome) {
    if (splash) {
      splash.classList.add("splash-out");
      splash.classList.add("splash-hidden");
    }
    openFirstRunOnboarding();
    return;
  }

  if (welcome) {
    welcome.classList.add("hidden");
    welcome.classList.remove("welcome-out");
  }
  if (typeof document !== "undefined" && document.documentElement?.removeAttribute) {
    document.documentElement.removeAttribute("data-first-run");
  }
  if (!splash) return;

  splash.classList.remove("splash-out");
  splash.classList.remove("splash-hidden");

  let dismissed = false;
  let autoTimer = null;

  function dismissSplash() {
    if (dismissed) return;
    dismissed = true;
    if (autoTimer) clearTimeout(autoTimer);
    splash.classList.add("splash-out");
    setTimeout(() => {
      splash.classList.add("splash-hidden");
    }, 360);
  }

  const prefersReduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!splash._dismissSplashBound) {
    splash._dismissSplashBound = true;
    splash.addEventListener("click", () => {
      if (splash._activeDismissFn) splash._activeDismissFn();
    });
  }
  splash._activeDismissFn = dismissSplash;
  autoTimer = setTimeout(dismissSplash, prefersReduced ? 450 : 1200);
}

// =====================================================
// KATEGORIE-PRÜFUNGSMODUS, AUSWERTUNG & VERLAUF
// =====================================================

function getExamPresetById(categoryKey, levelId = null) {
  const cat = EXAM_CATEGORY_LEVELS[categoryKey];
  if (!cat || !Array.isArray(cat.presets) || cat.presets.length === 0) return null;
  if (!levelId) return cat.presets[0];
  return cat.presets.find(p => p.id === levelId) || cat.presets[0];
}

function getExamPresetTitle(categoryKey, levelId) {
  const preset = getExamPresetById(categoryKey, levelId);
  if (!preset) return tr("Prüfung", "Exam");
  return tr(preset.title.de, preset.title.en);
}

function getExamPresetDesc(preset) {
  if (!preset) return "";
  return tr(preset.desc.de, preset.desc.en);
}

function getLocalizedExamModeName(mode) {
  const names = {
    cadence: tr("Kadenzen", "Cadences"),
    "interval-melodic": tr("Intervalle (Aufwärts)", "Intervals (Ascending)"),
    "interval-melodic-down": tr("Intervalle (Abwärts)", "Intervals (Descending)"),
    "interval-harmonic": tr("Intervalle (Harmonisch)", "Intervals (Harmonic)"),
    "interval-drone": tr("Intervalle (Grundton-Fläche)", "Intervals (Root Pad)"),
    "chord-arp-up": tr("Akkord-Arpeggio (Aufwärts)", "Chord Arpeggio (Up)"),
    "chord-arp-down": tr("Akkord-Arpeggio (Abwärts)", "Chord Arpeggio (Down)"),
    "interval-chords": tr("Akkordtypen (Gleichzeitig)", "Chord Qualities (Block)"),
    "chord-inversions": tr("Akkord-Umkehrungen", "Chord Inversions"),
    solfege: "Solfège",
    melody: tr("Melodien (4–6 Töne)", "Melodies (4–6 Notes)"),
    "modes-scale": tr("Kirchentonarten (Tonleiter)", "Modes (Scale)"),
    "modes-char": tr("Charakterton (Modi)", "Modal Color Tone"),
    "modes-cadence": tr("Modaler Vamp", "Modal Vamp"),
    "rhythm-meter": tr("Taktarten & Metrum", "Meters & Time Sigs"),
    "rhythm-dictation": tr("Rhythmus-Diktat", "Rhythm Dictation"),
    "rhythm-tap": tr("Rhythmus nachklopfen", "Rhythm Tap-Back"),
    "rhythm-groove": tr("Grooves & Mikro-Timing", "Grooves & Micro-Timing"),
    "prod-tone": tr("Isolierte Frequenzen", "Isolated Frequencies"),
    "prod-eq-noise": tr("EQ-Boost im Pink Noise", "EQ Boost in Pink Noise"),
    "notation-treble": tr("Violinschlüssel", "Treble Clef"),
    "notation-bass": tr("Bassschlüssel", "Bass Clef"),
    "notation-alto": tr("Altschlüssel", "Alto Clef"),
    "notation-mixed": tr("Schlüssel-Mix", "Clef Mix")
  };
  return names[mode] || mode;
}

function getCategoryBestExamPercent(categoryKey, levelId = null) {
  const list = Array.isArray(state?.profile?.examHistory) ? state.profile.examHistory : [];
  let best = null;
  list.forEach(entry => {
    if (!entry || entry.categoryKey !== categoryKey) return;
    if (levelId && entry.levelId !== levelId) return;
    const pct = Number(entry.percent);
    if (Number.isFinite(pct) && (best === null || pct > best)) {
      best = pct;
    }
  });
  return best;
}

function formatExamDuration(sec) {
  const clean = Math.max(0, Math.round(Number(sec) || 0));
  const mins = Math.floor(clean / 60);
  const secs = clean % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function formatExamDate(ts) {
  const d = new Date(Number(ts) || Date.now());
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}.${mm}.${yyyy} • ${hh}:${min}`;
}

function formatExamScoreVal(val) {
  const rounded = Math.round((Number(val) || 0) * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/0$/, "");
}

function getLauschebaerExamBadge(percent) {
  const p = Number(percent) || 0;
  if (p >= 90) {
    return {
      tierCls: "tier-master",
      icon: "🏆",
      title: tr("Lauscher-Meister", "Lauscher Master"),
      sub: tr(
        "Souveränes Gehör! Du erkennst selbst feine Details ruhig und treffsicher.",
        "Commanding ear! You recognize even subtle details calmly and accurately."
      )
    };
  }
  if (p >= 75) {
    return {
      tierCls: "tier-good",
      icon: "✨",
      title: tr("Starker Lauscher", "Sharp Listener"),
      sub: tr(
        "Sehr starke Trefferquote! Hör dir in der Rückschau kurz die wenigen Wackler im Vergleich an.",
        "Very strong accuracy! Review the few tricky spots side-by-side below."
      )
    };
  }
  if (p >= 50) {
    return {
      tierCls: "tier-good",
      icon: "🌿",
      title: tr("Guter Kurs", "Solid Progress"),
      sub: tr(
        "Gute Grundlage! Ein gezielter Übe-Fokus auf das schwächste Modul hebt dich aufs nächste Niveau.",
        "Solid foundation! A quick focus session on your weakest module will level you right up."
      )
    };
  }
  return {
    tierCls: "",
    icon: "🎧",
    title: tr("Dranbleiben lohnt sich", "Keep Listening"),
    sub: tr(
      "Jede Prüfung schärft dein Ohr – vergleiche deine Antworten jetzt direkt in der Hör-Rückschau!",
      "Every exam sharpens your ear — compare your choices directly in the audio review below!"
    )
  };
}

function openExamSetupPage(categoryKey = state.activeCategory, options = {}) {
  if (!categoryKey || !EXAM_CATEGORY_LEVELS[categoryKey]) return;
  state.activeCategory = categoryKey;
  state.examSetupCategory = categoryKey;

  const container = document.getElementById("examSetupContent");
  if (!container) return;

  const catCfg = EXAM_CATEGORY_LEVELS[categoryKey];
  const cfg = state.examConfig || { count: 10, feedbackMode: "blind", maxReplays: 2 };
  const catBest = getCategoryBestExamPercent(categoryKey);
  const catBestPill = catBest !== null
    ? `<span class="exam-best-pill">★ ${escapeHtml(tf("Bestwert: {pct}%", "Best: {pct}%", { pct: catBest }))}</span>`
    : "";

  const levelsHtml = catCfg.presets.map(preset => {
    const levelBest = getCategoryBestExamPercent(categoryKey, preset.id);
    const bestHtml = levelBest !== null
      ? `<span class="exam-best-pill">${escapeHtml(tf("Bestwert: {pct}%", "Best: {pct}%", { pct: levelBest }))}</span>`
      : "";
    const modeChipsHtml = preset.modes.map(m =>
      `<span class="exam-mode-chip">${escapeHtml(getLocalizedExamModeName(m))}</span>`
    ).join("");

    return `
      <article class="exam-level-card" data-exam-level-card="${escapeHtml(preset.id)}">
        <div class="exam-level-top">
          <div>
            <div class="exam-level-badges">
              <span class="exam-level-pill">${escapeHtml(tf("Stufe {n}", "Level {n}", { n: preset.levelNumber }))}</span>
              ${bestHtml}
            </div>
            <h3 class="exam-level-title">${escapeHtml(tr(preset.title.de, preset.title.en))}</h3>
            <p class="exam-level-desc">${escapeHtml(tr(preset.desc.de, preset.desc.en))}</p>
          </div>
        </div>
        <div class="exam-level-modes">${modeChipsHtml}</div>
        <div class="exam-level-footer">
          <button type="button" class="btn-primary-action exam-start-btn" data-start-exam-level="${escapeHtml(preset.id)}">
            ${escapeHtml(tr("Prüfung starten →", "Start Exam →"))}
          </button>
        </div>
      </article>
    `;
  }).join("");

  container.innerHTML = `
    <div class="exam-setup-hero">
      <div class="exam-setup-hero-head">
        <h2 class="exam-setup-hero-title">${escapeHtml(tf("Prüfung • {cat}", "Exam • {cat}", { cat: getCategoryTitle(categoryKey) }))}</h2>
        ${catBestPill}
      </div>
      <p class="exam-setup-hero-desc">
        ${escapeHtml(tr(
          "1 Versuch pro Frage – prüfungsfest ohne Hilfsschleifen. Am Ende warten Lauscher-Bewertung, Modul-Aufschlüsselung und direkter Hör-Vergleich.",
          "1 try per question under exam conditions — no unlimited retries. Afterwards you’ll get a Lauscher summary, module breakdown, and instant audio comparison."
        ))}
      </p>
    </div>

    <section class="exam-config-panel" aria-label="${escapeHtml(tr("Prüfungsoptionen", "Exam options"))}">
      <div class="exam-config-row">
        <span class="exam-config-label">${escapeHtml(tr("Fragenanzahl", "Questions"))}</span>
        <div class="account-chip-group">
          ${[10, 20, 50].map(n => `
            <button type="button" class="k-filter-pill ${cfg.count === n ? "active" : ""}" data-exam-count="${n}">
              ${escapeHtml(tf("{n} Fragen", "{n} Questions", { n }))}
            </button>
          `).join("")}
        </div>
      </div>

      <div class="exam-config-row">
        <span class="exam-config-label">${escapeHtml(tr("Rückmeldung", "Feedback Mode"))}</span>
        <div class="account-chip-group">
          <button type="button" class="k-filter-pill ${cfg.feedbackMode === "blind" ? "active" : ""}" data-exam-feedback="blind">
            ${escapeHtml(tr("Auswertung am Ende (Blind)", "Evaluate at End (Blind)"))}
          </button>
          <button type="button" class="k-filter-pill ${cfg.feedbackMode === "instant" ? "active" : ""}" data-exam-feedback="instant">
            ${escapeHtml(tr("Sofort-Feedback", "Instant Feedback"))}
          </button>
        </div>
      </div>

      <div class="exam-config-row">
        <span class="exam-config-label">${escapeHtml(tr("Wiederholungs-Limit", "Replay Limit"))}</span>
        <div class="account-chip-group">
          <button type="button" class="k-filter-pill ${cfg.maxReplays === 2 ? "active" : ""}" data-exam-replays="2">
            ${escapeHtml(tr("Max. 2× anhören", "Max 2 Replays"))}
          </button>
          <button type="button" class="k-filter-pill ${cfg.maxReplays === 0 ? "active" : ""}" data-exam-replays="0">
            ${escapeHtml(tr("Unbegrenzt", "Unlimited"))}
          </button>
        </div>
      </div>
    </section>

    <div class="exam-level-grid">${levelsHtml}</div>
  `;

  container.querySelectorAll("[data-exam-count]").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = parseInt(btn.dataset.examCount, 10);
      if ([10, 20, 50].includes(val)) {
        state.examConfig.count = val;
        container.querySelectorAll("[data-exam-count]").forEach(b => b.classList.toggle("active", b === btn));
      }
    });
  });

  container.querySelectorAll("[data-exam-feedback]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.examConfig.feedbackMode = btn.dataset.examFeedback === "instant" ? "instant" : "blind";
      container.querySelectorAll("[data-exam-feedback]").forEach(b => b.classList.toggle("active", b === btn));
    });
  });

  container.querySelectorAll("[data-exam-replays]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.examConfig.maxReplays = btn.dataset.examReplays === "0" ? 0 : 2;
      container.querySelectorAll("[data-exam-replays]").forEach(b => b.classList.toggle("active", b === btn));
    });
  });

  container.querySelectorAll("[data-start-exam-level]").forEach(btn => {
    btn.addEventListener("click", () => {
      startCategoryExam(categoryKey, btn.dataset.startExamLevel);
    });
  });

  if (!options.refreshOnly) {
    switchView("exam-setup", { skipHistoryPush: Boolean(options.fromHistory) });
  }
}

function buildExamQuestionPlan(modes, count) {
  const pool = Array.isArray(modes) && modes.length > 0 ? modes : ["cadence"];
  const total = Math.max(1, Math.min(50, parseInt(count, 10) || 10));
  const plan = [];
  for (let i = 0; i < total; i++) {
    plan.push(pool[i % pool.length]);
  }
  for (let i = plan.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = plan[i];
    plan[i] = plan[j];
    plan[j] = tmp;
  }
  return plan;
}

function applyExamLevelSettings(preset, targetMode) {
  if (!state?.settings || !preset) return;
  state.settings.mode = targetMode;
  Object.assign(state.settings, preset.apply || {});
  state.settings.loop = false;
  state.settings.autoNextAfterCorrect = false;
  state.settings.solfegeAutoNext = false;
  state.settings.melodyAutoNext = false;
  state.settings.rhythmDictationAutoNext = false;
  state.settings.rhythmTapAutoNext = false;
  state.settings.randomBpm = false;
  const stdBpm = getDefaultExerciseBpm(targetMode);
  state.settings.bpm = stdBpm;
  state.activeBpm = stdBpm;
}

function clearExamTimers(examObj = state.exam) {
  if (!examObj) return;
  if (examObj.advanceTimerId !== null && examObj.advanceTimerId !== undefined) {
    clearTimeout(examObj.advanceTimerId);
    examObj.advanceTimerId = null;
  }
  if (examObj.autoPlayTimerId !== null && examObj.autoPlayTimerId !== undefined) {
    clearTimeout(examObj.autoPlayTimerId);
    examObj.autoPlayTimerId = null;
  }
}

function cleanupActiveExamState(options = {}) {
  const prevExam = state.exam;
  if (prevExam) {
    clearExamTimers(prevExam);
    if (options.restoreSettings !== false && prevExam.prevSettings) {
      state.settings = { ...prevExam.prevSettings };
      state.activeBpm = state.settings.bpm || getDefaultExerciseBpm(state.settings.mode);
      state.hasManualExerciseBpm = Boolean(prevExam.prevHasManualBpm);
      syncAutoNextControls();
      state.updateQuickStartLabel();
    }
  }
  state.exam = null;
  syncExamExerciseControls();
}

function startCategoryExam(categoryKey, levelId) {
  const preset = getExamPresetById(categoryKey, levelId);
  if (!preset) return;

  if (state.exam) {
    cleanupActiveExamState({ restoreSettings: true });
  }

  const cfg = state.examConfig || { count: 10, feedbackMode: "blind", maxReplays: 2 };
  const total = [10, 20, 50].includes(cfg.count) ? cfg.count : 10;
  const plan = buildExamQuestionPlan(preset.modes, total);

  state.activeCategory = categoryKey;
  state.examSetupCategory = categoryKey;
  state.exerciseReturnView = "exam-setup";

  state.exam = {
    active: true,
    categoryKey: categoryKey,
    levelId: preset.id,
    levelNumber: preset.levelNumber,
    feedbackMode: cfg.feedbackMode === "instant" ? "instant" : "blind",
    maxReplays: cfg.maxReplays === 0 ? 0 : 2,
    totalQuestions: total,
    currentIdx: 0,
    plan: plan,
    questions: [],
    currentAnswered: false,
    currentPromptPlayedOnce: false,
    currentReplaysUsed: 0,
    startedWallMs: Date.now(),
    advanceTimerId: null,
    autoPlayTimerId: null,
    prevSettings: { ...state.settings },
    prevHasManualBpm: Boolean(state.hasManualExerciseBpm)
  };

  applyExamLevelSettings(preset, plan[0]);
  switchView("exercise", { preserveBpm: true });
}

function syncExamExerciseControls() {
  const isExam = Boolean(state?.exam?.active);
  const statusEl = document.getElementById("examStatusBar");
  const abortBanner = document.getElementById("examAbortConfirmBanner");
  const postAnswerBar = document.getElementById("examPostAnswerBar");
  const answerSoundBtn = document.getElementById("answerSoundToggleBtn");
  const listenBtn = document.getElementById("listenOnlyBtn");
  const loopBtn = document.getElementById("loopToggleBtn");
  const keyBtn = document.getElementById("moduleKeyBtn");
  const notationKeyBtn = document.getElementById("moduleNotationKeyBtn");
  const notationPaceBtn = document.getElementById("moduleNotationPaceBtn");
  const timeBtn = document.getElementById("moduleTimeSigBtn");
  const bpmBtn = document.getElementById("moduleBpmBtn");
  const melodyPulseBtn = document.getElementById("melodyPulseBtn");

  statusEl?.classList.toggle("hidden", !isExam);
  if (!isExam) {
    abortBanner?.classList.add("hidden");
    postAnswerBar?.classList.add("hidden");
  }

  if (answerSoundBtn) answerSoundBtn.classList.toggle("hidden", isExam || !isNotationMode(state?.currentExercise?.type));
  if (listenBtn) listenBtn.classList.toggle("hidden", isExam);
  if (loopBtn) loopBtn.classList.toggle("hidden", isExam);

  [keyBtn, notationKeyBtn, notationPaceBtn, timeBtn, bpmBtn, melodyPulseBtn].forEach(btn => {
    if (!btn) return;
    btn.classList.toggle("exam-locked", isExam);
    btn.disabled = isExam;
  });

  if (isExam) {
    closeTransientPopovers();
    renderExamStatusBar();
  }
  renderStageStreakUI();
}

function renderExamStatusBar() {
  const exam = state?.exam;
  if (!exam || !exam.active) return;

  const modePill = document.getElementById("examModePill");
  const counterPill = document.getElementById("examCounterPill");
  const replayPill = document.getElementById("examReplayPill");
  const fillEl = document.getElementById("examProgressFill");

  const curNum = Math.min(exam.currentIdx + 1, exam.totalQuestions);
  const curMode = exam.plan[exam.currentIdx] || state.settings.mode;
  if (modePill) {
    modePill.textContent = getLocalizedExamModeName(curMode);
  }
  if (counterPill) {
    counterPill.textContent = tf("Frage {n} / {tot}", "Question {n} / {tot}", {
      n: curNum,
      tot: exam.totalQuestions
    });
  }
  if (replayPill) {
    replayPill.classList.remove("is-warn", "is-exhausted");
    if (exam.maxReplays === 0) {
      replayPill.textContent = tr("Hören: Unbegrenzt", "Audio: Unlimited");
    } else if (!exam.currentPromptPlayedOnce) {
      replayPill.textContent = tf("1× Start + {left}× nachhören", "1× Start + {left}× replay", { left: exam.maxReplays });
    } else {
      const left = Math.max(0, exam.maxReplays - exam.currentReplaysUsed);
      if (left === 0) {
        replayPill.textContent = tr("Kein Replay mehr", "No replays left");
        replayPill.classList.add("is-exhausted");
      } else {
        replayPill.textContent = tf("Noch {left}× anhören", "{left}× replay left", { left });
        if (left === 1) replayPill.classList.add("is-warn");
      }
    }
  }
  if (fillEl) {
    const done = exam.questions.length;
    const pct = Math.max(0, Math.min(100, Math.round((done / Math.max(1, exam.totalQuestions)) * 100)));
    fillEl.style.width = `${pct}%`;
  }
}

function tryConsumeExamReplay(options = {}) {
  const exam = state?.exam;
  if (!exam || !exam.active) return true;

  if (exam.currentAnswered && !options.isInitialAuto) {
    return false;
  }

  if (!exam.currentPromptPlayedOnce) {
    exam.currentPromptPlayedOnce = true;
    renderExamStatusBar();
    return true;
  }

  if (exam.maxReplays === 0) {
    exam.currentReplaysUsed += 1;
    renderExamStatusBar();
    return true;
  }

  if (exam.currentReplaysUsed >= exam.maxReplays) {
    renderExamStatusBar();
    const fnEl = document.getElementById("stageFunctionText");
    if (fnEl && !exam.currentAnswered) {
      fnEl.textContent = tr(
        "Wiederholungs-Limit erreicht – wähle jetzt deine Antwort.",
        "Replay limit reached — please choose your answer now."
      );
    }
    return false;
  }

  exam.currentReplaysUsed += 1;
  renderExamStatusBar();
  return true;
}

function triggerExamPlayAction() {
  const exam = state?.exam;
  if (!exam || !exam.active) {
    playSequence();
    return;
  }
  if (exam.currentAnswered) return;
  playSequence();
}

function loadCurrentExamQuestion() {
  const exam = state?.exam;
  if (!exam || !exam.active) return;

  clearExamTimers(exam);
  stopPlayback();
  document.getElementById("examAbortConfirmBanner")?.classList.add("hidden");
  document.getElementById("examPostAnswerBar")?.classList.add("hidden");

  const preset = getExamPresetById(exam.categoryKey, exam.levelId);
  const planMode = exam.plan[exam.currentIdx] || preset?.modes?.[0] || "cadence";
  applyExamLevelSettings(preset, planMode);

  exam.currentAnswered = false;
  exam.currentPromptPlayedOnce = false;
  exam.currentReplaysUsed = 0;

  generateExercise();
  state.updateHeaderSubtext();
  syncExamExerciseControls();

  // Rhythmus-Nachklopfen & Notation warten auf bewusste Nutzereingabe (kein automatisches Zielton-Audio!)
  if (planMode !== "rhythm-tap" && !isNotationMode(planMode)) {
    exam.autoPlayTimerId = setTimeout(() => {
      if (!state.exam || state.exam !== exam || !exam.active || state.currentView !== "exercise") return;
      if (exam.currentAnswered || exam.currentPromptPlayedOnce) return;
      playSequence({ examAutoStart: true });
    }, 150);
  }
}

function buildExamChoiceSnapshot(ex, chosenKey) {
  if (!ex) return null;
  const targetKey = ex.targetItem?.key || null;
  const type = ex.type;

  if (type === "cadence") {
    return {
      type: "cadence",
      rootMidi: ex.targetItem?.rootMidi || HARMONIC_DATA.roots[state.currentKey]?.midi || 60,
      currentKey: state.currentKey,
      activeBpm: state.activeBpm,
      activeTimeSig: state.activeTimeSig,
      targetIndex: ex.targetIndex,
      bars: (ex.bars || []).map(b => ({ symbol: b.symbol, notes: b.notes, bass: b.bass })),
      chosenKey: chosenKey,
      targetKey: targetKey
    };
  }
  if (type.startsWith("interval-")) {
    return {
      type: type,
      rootMidi: ex.effectiveRootMidi ?? ex.targetItem?.rootMidi ?? 60,
      directionSign: ex.isMelodicDown ? -1 : 1,
      refNote: ex.targetItem?.refNote || midiToNote(ex.effectiveRootMidi || 60),
      targetNote: ex.targetItem?.targetNote || ex.targetItem?.notes?.[1] || midiToNote(67),
      padNotes: Array.isArray(ex.padNotes) ? [...ex.padNotes] : undefined,
      activeBpm: state.activeBpm,
      chosenKey: chosenKey,
      targetKey: targetKey
    };
  }
  if (isChordQualityMode(type)) {
    return {
      type: type,
      rootMidi: ex.targetItem?.rootMidi || 60,
      targetNotes: Array.isArray(ex.targetItem?.notes) ? [...ex.targetItem.notes] : [],
      activeBpm: state.activeBpm,
      chosenKey: chosenKey,
      targetKey: targetKey
    };
  }
  if (type === "chord-inversions") {
    return {
      type: "chord-inversions",
      rootMidi: ex.targetItem?.rootMidi || 60,
      chordKey: ex.chordKey || ex.targetItem?.chordKey || "maj",
      currentKey: ex.rootKey || state.currentKey || "C",
      targetNotes: Array.isArray(ex.targetItem?.notes) ? [...ex.targetItem.notes] : [],
      chosenKey: chosenKey,
      targetKey: targetKey
    };
  }
  if (type.startsWith("modes-")) {
    return {
      type: type,
      rootMidi: ex.rootMidi || 60,
      anchorBass: ex.anchorBass || midiToNote((ex.rootMidi || 60) - 12),
      anchorNotes: Array.isArray(ex.anchorNotes) ? [...ex.anchorNotes] : [],
      chosenKey: chosenKey,
      targetKey: targetKey
    };
  }
  if (type === "rhythm-meter") {
    return {
      type: "rhythm-meter",
      activeBpm: state.activeBpm || 90,
      chosenKey: chosenKey,
      targetKey: targetKey
    };
  }
  if (type === "rhythm-groove") {
    return {
      type: "rhythm-groove",
      activeBpm: state.activeBpm || 90,
      grooveKind: ex.grooveKind || "style",
      bars: ex.bars || [],
      chosenKey: chosenKey,
      targetKey: targetKey
    };
  }
  if (type === "prod-tone") {
    const chosenDef = chosenKey ? getChoiceItem("prod-tone", chosenKey) : null;
    return {
      type: "prod-tone",
      targetFreqHz: ex.targetItem?.freqHz || 1000,
      chosenFreqHz: chosenDef?.freqHz || null,
      chosenKey: chosenKey,
      targetKey: targetKey
    };
  }
  if (type === "prod-eq-noise") {
    const chosenDef = chosenKey ? getChoiceItem("prod-eq-noise", chosenKey) : null;
    return {
      type: "prod-eq-noise",
      targetFreqHz: ex.targetItem?.freqHz || 1000,
      chosenFreqHz: chosenDef?.freqHz || null,
      q: ex.q || 2.8,
      boostDb: ex.boostDb || 4,
      chosenKey: chosenKey,
      targetKey: targetKey
    };
  }
  return null;
}

function getExamChoiceDisplayText(mode, key) {
  if (!key) return tr("Übersprungen", "Skipped");
  const item = getChoiceItem(mode, key);
  if (!item) return String(key);
  const sym = item.roman || item.symbol;
  return sym && item.label && sym !== item.label ? `${sym} • ${item.label}` : (item.label || sym || String(key));
}

function showExamPostAnswerNextBar() {
  const exam = state?.exam;
  const bar = document.getElementById("examPostAnswerBar");
  const nextBtn = document.getElementById("examNextQuestionBtn");
  if (!exam || !exam.active || !bar || !nextBtn) return;
  const isLast = exam.currentIdx >= exam.totalQuestions - 1;
  nextBtn.textContent = isLast ? tr("Auswertung ansehen →", "View Results →") : tr("Nächste Frage →", "Next Question →");
  bar.classList.remove("hidden");
  updatePlayButtonUI(false);
}

function scheduleExamAutoAdvance(delayMs = 260) {
  const exam = state?.exam;
  if (!exam || !exam.active) return;
  clearExamTimers(exam);
  exam.advanceTimerId = setTimeout(() => {
    if (!state.exam || state.exam !== exam || !exam.active || state.currentView !== "exercise") return;
    advanceExamQuestion();
  }, Math.max(80, delayMs));
}

function recordExamQuestionEntry(entry) {
  const exam = state?.exam;
  if (!exam || !exam.active) return;
  const idx = exam.questions.length;
  exam.questions.push({
    qIndex: idx + 1,
    mode: entry.mode,
    status: entry.status,
    score: Math.max(0, Math.min(1, Number(entry.score) || 0)),
    chosenKey: entry.chosenKey ?? null,
    targetKey: entry.targetKey ?? null,
    chosenLabel: entry.chosenLabel || "",
    targetLabel: entry.targetLabel || "",
    detailNote: entry.detailNote || "",
    audioSnapshot: entry.audioSnapshot || null
  });
  renderExamStatusBar();
}

function handleExamChoiceAnswer(ex, selectedKey, btnElement) {
  const exam = state?.exam;
  if (!exam || !exam.active || exam.currentAnswered) return;

  exam.currentAnswered = true;
  ex.isSolved = true;
  state.exerciseSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  const isCorrect = selectedKey === ex.targetItem?.key;
  const targetKey = ex.targetItem?.key || "";
  const chosenDef = getChoiceItem(ex.type, selectedKey);
  const snapshot = buildExamChoiceSnapshot(ex, selectedKey);

  recordExamQuestionEntry({
    mode: ex.type,
    status: isCorrect ? "correct" : "wrong",
    score: isCorrect ? 1 : 0,
    chosenKey: selectedKey,
    targetKey: targetKey,
    chosenLabel: getExamChoiceDisplayText(ex.type, selectedKey),
    targetLabel: getExamChoiceDisplayText(ex.type, targetKey),
    audioSnapshot: snapshot
  });

  if (exam.feedbackMode === "blind") {
    btnElement?.classList.add("exam-choice-recorded");
    if (document.getElementById("centralStageCard")) {
      setCentralStageMode("stage-playing");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tr("ANTWORT ERFASST", "ANSWER RECORDED");
      document.getElementById("stageMainText").textContent = "✓";
      document.getElementById("stageFunctionText").textContent = tr("Weiter zur nächsten Frage…", "Moving to the next question…");
    }
    scheduleExamAutoAdvance(260);
    return;
  }

  // Sofort-Feedback innerhalb der Prüfung (1 Versuch!)
  if (isCorrect) {
    btnElement?.classList.add("btn-correct");
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    document.getElementById("stageSubtext").textContent = tr("RICHTIG!", "CORRECT!");
  } else {
    btnElement?.classList.add("btn-wrong");
    document.querySelectorAll("#degreeButtonsGrid .degree-btn").forEach(el => {
      if (el.dataset.choice === targetKey) el.classList.add("btn-correct");
    });
    state.lastAnswerWasWrong = true;
    state.wrongAnswerData = { chosen: chosenDef, target: ex.targetItem };
    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tr("KNAPP DANEBEN", "NOT QUITE");
  }

  document.getElementById("stageMainText").textContent = ex.targetItem.roman || ex.targetItem.symbol;
  document.getElementById("stageFunctionText").textContent = ex.targetItem.label;

  const revealAllNonRef = ex.type === "rhythm-meter" || (ex.type === "rhythm-groove" && ex.grooveKind === "style");
  ex.bars.forEach((bar, i) => {
    if (i === ex.targetIndex || (revealAllNonRef && bar.key !== "ref")) {
      const card = document.getElementById(`barCard_${i}`);
      if (card) {
        card.querySelector(".bar-roman").textContent = ex.targetItem.displayMain || ex.targetItem.roman || ex.targetItem.symbol;
        card.querySelector(".bar-label").textContent = ex.type === "chord-inversions" ? (bar.short || ex.targetItem.short) : ex.targetItem.short;
        card.classList.remove("bar-target");
        card.classList.add("bar-active");
      }
    }
  });

  if (!isCorrect) {
    const fb = document.getElementById("feedbackContainer");
    const isRhythmWrong = ex.type.startsWith("rhythm-");
    const isModesWrong = ex.type.startsWith("modes-");
    const diagBassBtn = document.getElementById("btnDiagBass");
    if (diagBassBtn) {
      diagBassBtn.textContent = isRhythmWrong
        ? tr("Puls / Eins hören", "Hear Pulse / One")
        : (ex.type === "prod-eq-noise"
            ? tr("Flat → Ziel-EQ", "Flat → Target EQ")
            : (ex.type === "prod-tone"
                ? tr("Ref: 1 kHz", "Ref: 1 kHz")
                : (isModesWrong
                    ? tr("Anker-Quinte", "Anchor Fifth")
                    : (ex.type === "chord-inversions" ? tr("Basston hören", "Hear Bass Note") : tr("Bass / Grundton", "Bass / Root")))));
    }
    if (fb) {
      fb.classList.remove("hidden");
      document.getElementById("feedbackText").textContent = tf(
        "Gewählt: {sym} ({lbl}).",
        "Selected: {sym} ({lbl}).",
        { sym: chosenDef?.roman || chosenDef?.symbol || selectedKey, lbl: chosenDef?.label || selectedKey }
      );
    }
  }

  showExamPostAnswerNextBar();
}

function handleExamSolfegeAnswer(ex, clickedKeyDef, keyBtn) {
  const exam = state?.exam;
  if (!exam || !exam.active || exam.currentAnswered || state.solfegeAnswered) return;

  exam.currentAnswered = true;
  state.solfegeAnswered = true;
  state.exerciseSolved = true;
  ex.isSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  const target = ex.targetItem;
  const isCorrect = clickedKeyDef.midi === target.midi ||
    (target.syllable === "Do" && clickedKeyDef.syllable === "Do");
  const chosenNoteName = midiToNote(clickedKeyDef.midi);

  recordExamQuestionEntry({
    mode: "solfege",
    status: isCorrect ? "correct" : "wrong",
    score: isCorrect ? 1 : 0,
    chosenKey: clickedKeyDef.syllable,
    targetKey: target.syllable,
    chosenLabel: `${getSolfegeDisplayLabel(clickedKeyDef.syllable)} (${midiToGermanNote(clickedKeyDef.midi)})`,
    targetLabel: `${getSolfegeDisplayLabel(target.syllable)} (${target.germanNote || midiToGermanNote(target.midi)})`,
    audioSnapshot: {
      type: "solfege",
      rootMidi: HARMONIC_DATA.roots[state.currentKey]?.midi || 60,
      targetNoteName: target.noteName,
      targetSyllable: target.syllable,
      chosenNoteName: chosenNoteName,
      chosenSyllable: clickedKeyDef.syllable
    }
  });

  if (exam.feedbackMode === "blind") {
    keyBtn?.classList.add("key-exam-recorded");
    if (document.getElementById("centralStageCard")) {
      setCentralStageMode("stage-playing");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tr("ANTWORT ERFASST", "ANSWER RECORDED");
      document.getElementById("stageMainText").textContent = getSolfegeDisplayLabel(clickedKeyDef.syllable);
      document.getElementById("stageFunctionText").textContent = tr("Weiter zur nächsten Frage…", "Moving to the next question…");
    }
    scheduleExamAutoAdvance(260);
    return;
  }

  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-wrong", "key-correct");
  });
  const targetEl = document.getElementById(`solfegeKey_${target.midi}`);
  if (isCorrect) {
    (targetEl || keyBtn)?.classList.add("key-correct");
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    document.getElementById("stageSubtext").textContent = tr("RICHTIG!", "CORRECT!");
  } else {
    keyBtn?.classList.add("key-wrong");
    targetEl?.classList.add("key-correct");
    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tr("KNAPP DANEBEN", "NOT QUITE");
  }
  document.getElementById("stageMainText").textContent = getSolfegeDisplayLabel(target.syllable);
  document.getElementById("stageFunctionText").textContent = tf(
    "Gewählt: {ch} • Lösung: {tg}",
    "Picked: {ch} • Target: {tg}",
    { ch: getSolfegeDisplayLabel(clickedKeyDef.syllable), tg: getSolfegeDisplayLabel(target.syllable) }
  );
  showExamPostAnswerNextBar();
}

function handleExamNotationAnswer(ex, clickedKeyDef, keyBtn) {
  const exam = state?.exam;
  if (!exam || !exam.active || exam.currentAnswered || !ex?.targetItem) return;

  exam.currentAnswered = true;
  clearExamTimers(exam);
  stopPlayback();
  state.exerciseSolved = true;
  ex.isSolved = true;

  const target = ex.targetItem;
  const isCorrect = Boolean(clickedKeyDef && Number(clickedKeyDef.pc) === Number(target.pc));
  const rawPickedLabel = clickedKeyDef?.noteLabel
    ? String(clickedKeyDef.noteLabel).replace(/\s*\n\s*/g, " / ")
    : "?";
  const chosenDisplay = isCorrect ? target.displayName : rawPickedLabel;
  const chosenNoteName = isCorrect
    ? target.noteName
    : (Number.isFinite(Number(clickedKeyDef?.midi)) ? midiToNote(clickedKeyDef.midi) : null);

  const sigId = normalizeNotationKeySigId(target.keySignatureId || ex.keySignatureId || "none");
  const detailText = sigId !== "none"
    ? `${getLocalizedNotationClefName(target.clefId)} • ${getLocalizedNotationKeySigName(sigId, true)} (${getLocalizedNotationKeySigBadge(sigId, false)})`
    : getLocalizedNotationClefName(target.clefId);

  recordExamQuestionEntry({
    mode: ex.type,
    status: isCorrect ? "correct" : "wrong",
    score: isCorrect ? 1 : 0,
    chosenKey: chosenDisplay,
    targetKey: target.displayName,
    chosenLabel: chosenDisplay,
    targetLabel: target.displayName,
    detailNote: detailText,
    audioSnapshot: {
      type: ex.type,
      clefId: target.clefId,
      staffStep: target.staffStep,
      accidental: target.accidental,
      keySignatureId: sigId,
      shownAccidental: target.shownAccidental !== undefined ? target.shownAccidental : target.accidental,
      targetNoteName: target.noteName,
      chosenNoteName: chosenNoteName
    }
  });

  if (exam.feedbackMode === "blind") {
    keyBtn?.classList.add("key-exam-recorded");
    if (document.getElementById("centralStageCard")) {
      setCentralStageMode("stage-playing");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tr("ANTWORT ERFASST", "ANSWER RECORDED");
      document.getElementById("stageMainText").textContent = chosenDisplay;
      document.getElementById("stageFunctionText").textContent = tr("Weiter zur nächsten Frage…", "Moving to the next question…");
    }
    scheduleExamAutoAdvance(260);
    return;
  }

  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-wrong", "key-correct");
  });
  const targetEl = Array.from(document.querySelectorAll("#solfegeKeyboardWrap [data-pc]"))
    .find(el => parseInt(el.dataset.pc, 10) === target.pc) || null;
  const panelEl = document.getElementById("notationStaffPanel");
  panelEl?.classList.remove("is-wrong", "is-correct");

  if (isCorrect) {
    (targetEl || keyBtn)?.classList.add("key-correct");
    panelEl?.classList.add("is-correct");
    audioEngine.playStep([target.noteName], 0.9, null, "interval");
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    document.getElementById("stageSubtext").textContent = tr("RICHTIG GELESEN!", "READ CORRECTLY!");
  } else {
    keyBtn?.classList.add("key-wrong");
    targetEl?.classList.add("key-correct");
    panelEl?.classList.add("is-wrong");
    audioEngine.playStep([target.noteName], 0.9, null, "interval");
    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tr("NICHT GANZ", "NOT QUITE");
  }
  document.getElementById("stageMainText").textContent = target.displayName;
  document.getElementById("stageFunctionText").textContent = tf(
    "Gewählt: {ch} • Lösung: {tg}",
    "Picked: {ch} • Target: {tg}",
    { ch: chosenDisplay, tg: target.displayName }
  );
  showExamPostAnswerNextBar();
}

function finalizeExamMelodySlot(ex, idx) {
  const exam = state?.exam;
  const slots = ex?.melodySlots || [];
  const slot = slots[idx];
  const totalSlots = slots.length || 4;
  if (!exam || !slot) return;

  const isDictation = ex.melodyStyle === "dictation";
  const chosenSyl = slot.examPendingSyllable;
  const chosenNoteName = slot.examPendingNoteName || (slot.examPendingMidi ? midiToNote(slot.examPendingMidi) : slot.noteName);
  const chosenRhythm = slot.examPendingRhythm || slot.rhythmKey || "quarter";
  const pitchOk = chosenSyl === slot.syllable;
  const rhythmOk = isDictation ? (chosenRhythm === slot.rhythmKey) : true;

  slot.examAnswered = true;
  slot.examChosenSyllable = chosenSyl;
  slot.examChosenNoteName = chosenNoteName;
  slot.examChosenRhythm = chosenRhythm;
  slot.examPitchCorrect = pitchOk;
  slot.examRhythmCorrect = rhythmOk;
  slot.examCorrect = pitchOk && rhythmOk;
  slot.examSlotScore = isDictation ? ((pitchOk ? 0.5 : 0) + (rhythmOk ? 0.5 : 0)) : (pitchOk ? 1 : 0);

  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-pending-pair");
  });

  const keyBtn = slot.examPendingMidi ? document.getElementById(`solfegeKey_${slot.examPendingMidi}`) : null;
  const card = document.getElementById(`barCard_${idx}`);
  const divCls = slot.barDivider ? " melody-bar-divider" : "";

  if (exam.feedbackMode === "blind") {
    if (card) {
      card.className = `bar-card exam-slot-neutral tile-selected-pulse${divCls}`;
      const rEl = card.querySelector(".bar-roman");
      const lEl = card.querySelector(".bar-label");
      const chipsEl = card.querySelector(".melody-card-chips");
      if (rEl) rEl.textContent = getSolfegeDisplayLabel(chosenSyl);
      if (lEl) lEl.textContent = isDictation ? getLocalizedMelodyRhythmValue(chosenRhythm).short : tr("Erfasst", "Recorded");
      if (chipsEl && isDictation) {
        const cDef = getLocalizedMelodyRhythmValue(chosenRhythm);
        chipsEl.innerHTML = `<span class="melody-rhythm-chip">${getMelodyNoteValueSVG(chosenRhythm, 14, 14)}<span>${cDef.short}</span></span>`;
      }
    }
    keyBtn?.classList.add("key-exam-recorded");
    const cId = audioEngine.playbackId;
    setTimeout(() => {
      if (audioEngine.playbackId === cId) keyBtn?.classList.remove("key-exam-recorded");
    }, 240);
  } else {
    if (slot.examCorrect) slot.solved = true;
    keyBtn?.classList.add(pitchOk ? "key-correct" : "key-wrong");
    if (card) {
      card.className = `bar-card ${slot.examCorrect ? "melody-slot-solved" : "bar-target"} tile-selected-pulse${divCls}`;
      const rEl = card.querySelector(".bar-roman");
      const lEl = card.querySelector(".bar-label");
      const chipsEl = card.querySelector(".melody-card-chips");
      if (rEl) rEl.textContent = pitchOk ? getSolfegeDisplayLabel(slot.syllable) : `${getSolfegeDisplayLabel(chosenSyl)} → ${getSolfegeDisplayLabel(slot.syllable)}`;
      if (lEl) {
        lEl.textContent = slot.examCorrect
          ? `✓ ${slot.germanNote}`
          : (slot.examSlotScore > 0 ? `~ ${slot.germanNote}` : `✗ ${slot.germanNote}`);
      }
      if (chipsEl && isDictation) {
        const tDef = getLocalizedMelodyRhythmValue(slot.rhythmKey);
        const cDef = getLocalizedMelodyRhythmValue(chosenRhythm);
        chipsEl.innerHTML = rhythmOk
          ? `<span class="melody-rhythm-chip is-partial-ok">${getMelodyNoteValueSVG(slot.rhythmKey, 14, 14)}<span>✓ ${tDef.short}</span></span>`
          : `<span class="melody-rhythm-chip">${getMelodyNoteValueSVG(slot.rhythmKey, 14, 14)}<span>${cDef.short}→${tDef.short}</span></span>`;
      }
    }
  }

  if (idx < totalSlots - 1) {
    ex.melodyStep = idx + 1;
    const nextIdx = ex.melodyStep;
    const nextCard = document.getElementById(`barCard_${nextIdx}`);
    if (nextCard) {
      nextCard.classList.remove("melody-slot-pending");
      nextCard.classList.add("bar-target");
      const nl = nextCard.querySelector(".bar-label");
      if (nl) nl.textContent = tr("Gesucht", "Target");
    }
    syncMelodyHeaderAndPromptUI(ex);
    if (isDictation) {
      renderMelodyRhythmPicker(ex);
    }
    return;
  }

  // Alle Töne eingegeben -> Teilpunkte berechnen
  exam.currentAnswered = true;
  state.melodyCompleted = true;
  state.exerciseSolved = true;
  ex.isSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  syncMelodyHeaderAndPromptUI(ex);
  if (isDictation) {
    renderMelodyRhythmPicker(ex);
  }

  const totalScoreSum = slots.reduce((sum, s) => sum + (Number(s.examSlotScore) || 0), 0);
  const fullHits = slots.filter(s => s.examCorrect).length;
  const score = Math.round((totalScoreSum / totalSlots) * 100) / 100;
  const status = totalScoreSum >= totalSlots - 0.001 ? "correct" : (totalScoreSum > 0 ? "partial" : "wrong");

  const formatExamSeq = (isTarget) => slots.map(s => {
    const syl = getSolfegeDisplayLabel(isTarget ? s.syllable : (s.examChosenSyllable || "?"));
    if (!isDictation) return syl;
    const rk = isTarget ? s.rhythmKey : (s.examChosenRhythm || s.rhythmKey);
    return `${syl} (${getLocalizedMelodyRhythmValue(rk).short})`;
  }).join(" – ");

  const chosenSeqLabel = formatExamSeq(false);
  const targetSeqLabel = formatExamSeq(true);

  recordExamQuestionEntry({
    mode: "melody",
    status: status,
    score: score,
    chosenKey: chosenSeqLabel,
    targetKey: targetSeqLabel,
    chosenLabel: chosenSeqLabel,
    targetLabel: targetSeqLabel,
    detailNote: isDictation
      ? tf("{pts}/{tot} Pkt. ({hits} komplett)", "{pts}/{tot} pts ({hits} exact)", { pts: Number(totalScoreSum.toFixed(1)), tot: totalSlots, hits: fullHits })
      : tf("{hit}/{tot} Töne richtig", "{hit}/{tot} notes right", { hit: fullHits, tot: totalSlots }),
    audioSnapshot: {
      type: "melody",
      activeBpm: state.activeBpm || 90,
      melodyStyle: ex.melodyStyle || "rhythmic",
      melodyPulse: Boolean(state.settings.melodyPulse),
      beatsPerBar: ex.beatsPerBar || 4,
      totalMelodyBeats: ex.totalMelodyBeats || 8,
      targetSlots: slots.map(s => ({
        syllable: s.syllable,
        noteName: s.noteName,
        beatOffset: s.beatOffset,
        durationBeats: s.durationBeats,
        rhythmKey: s.rhythmKey,
        velocity: s.velocity
      })),
      chosenSlots: slots.map(s => {
        const cRhythm = s.examChosenRhythm || s.rhythmKey;
        const cDur = MELODY_RHYTHM_VALUES[cRhythm]?.beats || s.durationBeats || 1;
        return {
          syllable: s.examChosenSyllable || s.syllable,
          noteName: s.examChosenNoteName || s.noteName,
          beatOffset: s.beatOffset,
          durationBeats: isDictation ? cDur : (s.durationBeats || 1),
          rhythmKey: cRhythm,
          velocity: s.velocity
        };
      })
    }
  });

  if (exam.feedbackMode === "blind") {
    setCentralStageMode("stage-playing");
    updateStageMascot("listening");
    document.getElementById("stageSubtext").textContent = tf("{tot} / {tot} ERFASST", "{tot} / {tot} RECORDED", { tot: totalSlots });
    document.getElementById("stageMainText").textContent = "✓";
    document.getElementById("stageFunctionText").textContent = tr("Weiter zur nächsten Frage…", "Moving to the next question…");
    scheduleExamAutoAdvance(280);
    return;
  }

  setCentralStageMode(totalScoreSum >= totalSlots - 0.001 ? "stage-playing" : "stage-wrong");
  updateStageMascot(totalScoreSum >= totalSlots - 0.001 ? "happy" : "thinking");
  document.getElementById("stageSubtext").textContent = tf("ERGEBNIS: {hit} / {tot}", "RESULT: {hit} / {tot}", { hit: Number(totalScoreSum.toFixed(1)), tot: totalSlots });
  document.getElementById("stageMainText").textContent = targetSeqLabel;
  document.getElementById("stageFunctionText").textContent = tf("Deine Eingabe: {ch}", "Your entry: {ch}", { ch: chosenSeqLabel });
  showExamPostAnswerNextBar();
}

function handleExamMelodyRhythmChoice(ex, rhythmKey, btn) {
  const exam = state?.exam;
  if (!exam || !exam.active || exam.currentAnswered || state.melodyCompleted) return;
  if (!ex || ex.type !== "melody" || ex.melodyStyle !== "dictation") return;

  const idx = ex.melodyStep || 0;
  const slot = ex.melodySlots?.[idx];
  if (!slot) return;

  slot.examPendingRhythm = rhythmKey;
  if (slot.examPendingSyllable) {
    finalizeExamMelodySlot(ex, idx);
    return;
  }

  renderMelodyRhythmPicker(ex);
  const card = document.getElementById(`barCard_${idx}`);
  if (card) {
    const lEl = card.querySelector(".bar-label");
    if (lEl) lEl.textContent = tr("Wert ✓ • Ton?", "Value ✓ • Pitch?");
  }
}

function handleExamMelodyAnswer(ex, clickedKeyDef, keyBtn) {
  const exam = state?.exam;
  if (!exam || !exam.active || exam.currentAnswered || state.melodyCompleted) return;

  const idx = ex.melodyStep || 0;
  const slot = ex.melodySlots?.[idx];
  if (!slot) return;

  slot.examPendingSyllable = clickedKeyDef.syllable;
  slot.examPendingMidi = clickedKeyDef.midi;
  slot.examPendingNoteName = midiToNote(clickedKeyDef.midi);

  if (ex.melodyStyle !== "dictation") {
    slot.examPendingRhythm = slot.rhythmKey || "half";
    finalizeExamMelodySlot(ex, idx);
    return;
  }

  if (slot.examPendingRhythm) {
    finalizeExamMelodySlot(ex, idx);
    return;
  }

  document.querySelectorAll("#solfegeKeyboardWrap .piano-white-key, #solfegeKeyboardWrap .piano-black-key").forEach(el => {
    el.classList.remove("key-pending-pair");
  });
  keyBtn?.classList.add("key-pending-pair");

  const card = document.getElementById(`barCard_${idx}`);
  if (card) {
    const rEl = card.querySelector(".bar-roman");
    const lEl = card.querySelector(".bar-label");
    if (rEl) rEl.textContent = getSolfegeDisplayLabel(clickedKeyDef.syllable);
    if (lEl) lEl.textContent = tr("Ton ✓ • Wert?", "Pitch ✓ • Value?");
  }
  renderMelodyRhythmPicker(ex);
}

function handleExamRhythmDictationAnswer(ex, cellKey, btnElement) {
  const exam = state?.exam;
  if (!exam || !exam.active || exam.currentAnswered || state.rhythmDictationCompleted) return;

  const idx = ex.rhythmStep;
  const slot = ex.rhythmSlots?.[idx];
  if (!slot) return;

  const slotCorrect = cellKey === slot.cellKey;
  slot.examAnswered = true;
  slot.examChosenCellKey = cellKey;
  slot.examCorrect = slotCorrect;

  const chosenCell = getChoiceItem("rhythm-dictation", cellKey);
  const card = document.getElementById(`barCard_${idx}`);

  if (exam.feedbackMode === "blind") {
    if (card) {
      card.className = "bar-card exam-slot-neutral tile-selected-pulse";
      const rEl = card.querySelector(".bar-roman");
      const lEl = card.querySelector(".bar-label");
      if (rEl) rEl.innerHTML = getRhythmCellSVG(cellKey, 40, 22);
      if (lEl) lEl.textContent = tr("Erfasst", "Recorded");
    }
    btnElement?.classList.add("exam-choice-recorded");
    setTimeout(() => btnElement?.classList.remove("exam-choice-recorded"), 220);
  } else {
    if (slotCorrect) slot.solved = true;
    if (card) {
      card.className = `bar-card ${slotCorrect ? "melody-slot-solved" : "bar-target"} tile-selected-pulse`;
      const rEl = card.querySelector(".bar-roman");
      const lEl = card.querySelector(".bar-label");
      if (rEl) rEl.innerHTML = getRhythmCellSVG(slot.cellKey, 40, 22);
      if (lEl) lEl.textContent = slotCorrect ? `✓ ${slot.cell.short}` : `✗ ${chosenCell?.short || cellKey} → ${slot.cell.short}`;
    }
  }

  if (idx < ex.rhythmSlots.length - 1) {
    ex.rhythmStep = idx + 1;
    ex.targetIndex = ex.rhythmStep;
    ex.targetItem = ex.rhythmSlots[ex.rhythmStep].cell;
    const nextIdx = ex.rhythmStep;
    const nextCard = document.getElementById(`barCard_${nextIdx}`);
    if (nextCard) {
      nextCard.classList.remove("melody-slot-pending");
      nextCard.classList.add("bar-target", "rhythm-slot-clickable");
      const nl = nextCard.querySelector(".bar-label");
      if (nl) nl.textContent = tr("Gesucht", "Target");
    }
    const badge = document.getElementById("targetBarBadge");
    if (badge) badge.textContent = tf("Schlag {n} / 4", "Beat {n} / 4", { n: nextIdx + 1 });
    const promptEl = document.getElementById("inputPromptText");
    if (promptEl) promptEl.textContent = tf("Tippe das Muster für Schlag {n} von 4:", "Select the pattern for Beat {n} of 4:", { n: nextIdx + 1 });
    return;
  }

  exam.currentAnswered = true;
  state.rhythmDictationCompleted = true;
  state.exerciseSolved = true;
  ex.isSolved = true;
  audioEngine.stopPlayback();
  state.isPlaying = false;
  updatePlayButtonUI(false);

  const correctBeats = ex.rhythmSlots.filter(s => s.examCorrect).length;
  const totalBeats = ex.rhythmSlots.length || 4;
  const score = Math.round((correctBeats / totalBeats) * 100) / 100;
  const status = correctBeats === totalBeats ? "correct" : (correctBeats > 0 ? "partial" : "wrong");

  const chosenStr = ex.rhythmSlots.map(s => getChoiceItem("rhythm-dictation", s.examChosenCellKey || s.cellKey)?.short || "?").join(" • ");
  const targetStr = ex.rhythmSlots.map(s => s.cell.short).join(" • ");

  recordExamQuestionEntry({
    mode: "rhythm-dictation",
    status: status,
    score: score,
    chosenKey: ex.rhythmSlots.map(s => s.examChosenCellKey || "").join(","),
    targetKey: ex.rhythmSlots.map(s => s.cellKey).join(","),
    chosenLabel: chosenStr,
    targetLabel: targetStr,
    detailNote: tf("{hit}/{tot} Zählzeiten richtig", "{hit}/{tot} beats right", { hit: correctBeats, tot: totalBeats }),
    audioSnapshot: {
      type: "rhythm-dictation",
      activeBpm: state.activeBpm || 90,
      targetCellKeys: ex.rhythmSlots.map(s => s.cellKey),
      chosenCellKeys: ex.rhythmSlots.map(s => s.examChosenCellKey || s.cellKey)
    }
  });

  if (exam.feedbackMode === "blind") {
    setCentralStageMode("stage-playing");
    updateStageMascot("listening");
    document.getElementById("stageSubtext").textContent = tr("4 / 4 ERFASST", "4 / 4 RECORDED");
    document.getElementById("stageMainText").textContent = "✓";
    document.getElementById("stageFunctionText").textContent = tr("Weiter zur nächsten Frage…", "Moving to the next question…");
    scheduleExamAutoAdvance(280);
    return;
  }

  setCentralStageMode(correctBeats === totalBeats ? "stage-playing" : "stage-wrong");
  updateStageMascot(correctBeats === totalBeats ? "happy" : "thinking");
  document.getElementById("stageSubtext").textContent = tf("ERGEBNIS: {hit} / {tot}", "RESULT: {hit} / {tot}", { hit: correctBeats, tot: totalBeats });
  document.getElementById("stageMainText").textContent = targetStr;
  document.getElementById("stageFunctionText").textContent = tf("Deine Eingabe: {ch}", "Your entry: {ch}", { ch: chosenStr });
  showExamPostAnswerNextBar();
}

function handleExamRhythmTapFinished(ex, session, res) {
  const exam = state?.exam;
  if (!exam || !exam.active || exam.currentAnswered) return;

  exam.currentAnswered = true;
  const totalExpected = Math.max(1, session.expectedEvents.length);
  const rawScore = (res.exactCount + 0.65 * res.closeCount - 0.25 * res.extraCount) / totalExpected;
  const score = Math.max(0, Math.min(1, Math.round(rawScore * 100) / 100));
  const status = (res.passed && score >= 0.85) ? "correct" : (score >= 0.35 ? "partial" : "wrong");

  const padBtn = document.getElementById("rhythmTapPadBtn");
  padBtn?.classList.remove("is-counting", "is-ready", "is-hit");

  const patternShort = (ex.tapSlots || []).map(s => s.cell.short).join(" • ");
  const avgStr = res.avgDiffMs !== null ? `${res.avgDiffMs > 0 ? "+" : ""}${res.avgDiffMs} ms` : "–";

  recordExamQuestionEntry({
    mode: "rhythm-tap",
    status: status,
    score: score,
    chosenKey: `${res.exactCount + res.closeCount}/${totalExpected}`,
    targetKey: ex.meterKey || "4/4",
    chosenLabel: tf("{hit}/{tot} Treffer • Ø {avg} • Extra: {extra}", "{hit}/{tot} hits • Avg {avg} • Extra: {extra}", {
      hit: res.exactCount + res.closeCount,
      tot: totalExpected,
      avg: avgStr,
      extra: res.extraCount
    }),
    targetLabel: `${ex.meterKey} • ${patternShort}`,
    detailNote: tf("Toleranz ±{tol} ms", "Tolerance ±{tol} ms", { tol: ex.toleranceMs }),
    audioSnapshot: {
      type: "rhythm-tap",
      activeBpm: state.activeBpm || 90,
      beatsPerBar: ex.beatsPerBar || 4,
      expectedOffsets: session.expectedEvents.map(ev => ev.relMs),
      tapsMs: (session.tapsMs || []).slice(0, 24)
    }
  });

  if (exam.feedbackMode === "blind") {
    for (let i = 0; i < ex.beatsPerBar; i++) {
      const c = document.getElementById(`barCard_${i}`);
      if (c) {
        c.className = "bar-card exam-slot-neutral";
        const l = c.querySelector(".bar-label");
        if (l) l.textContent = tr("Erfasst", "Recorded");
      }
    }
    if (document.getElementById("centralStageCard")) {
      setCentralStageMode("stage-playing");
      updateStageMascot("listening");
      document.getElementById("stageSubtext").textContent = tr("KLOPFRUNDE ERFASST", "TAP ROUND RECORDED");
      document.getElementById("stageMainText").textContent = "✓";
      document.getElementById("stageFunctionText").textContent = tr("Weiter zur nächsten Frage…", "Moving to the next question…");
    }
    const titleEl = document.getElementById("rhythmPadTitle");
    if (titleEl) titleEl.textContent = tr("Runde erfasst ✓", "Round recorded ✓");
    updatePlayButtonUI(false);
    scheduleExamAutoAdvance(320);
    return;
  }

  for (let i = 0; i < ex.beatsPerBar; i++) {
    const card = document.getElementById(`barCard_${i}`);
    if (!card) continue;
    card.classList.remove("bar-active", "rhythm-blind", "melody-slot-pending", "rhythm-tap-exact", "rhythm-tap-close", "rhythm-tap-missed");
    const lblEl = card.querySelector(".bar-label");
    const beatEvents = res.expResults.filter(r => r.beatIdx === i);
    if (beatEvents.length === 0) {
      const hitRest = res.extraTapsMs.some(t => t >= i * session.beatMs - 60 && t < (i + 1) * session.beatMs - 60);
      card.classList.add(hitRest ? "rhythm-tap-missed" : "rhythm-tap-exact");
      if (lblEl) lblEl.textContent = hitRest ? tr("Stille!", "Rest!") : tr("✓ Pause", "✓ Rest");
    } else if (beatEvents.some(r => r.status === "missed")) {
      card.classList.add("rhythm-tap-missed");
      if (lblEl) lblEl.textContent = tr("Daneben", "Missed");
    } else if (beatEvents.some(r => r.status === "close")) {
      card.classList.add("rhythm-tap-close");
      if (lblEl) lblEl.textContent = tr("~ Knapp", "~ Close");
    } else {
      card.classList.add("rhythm-tap-exact");
      if (lblEl) lblEl.textContent = tr("✓ Exakt", "✓ Exact");
    }
  }

  if (document.getElementById("centralStageCard")) {
    setCentralStageMode(res.passed ? "stage-playing" : "stage-wrong");
    updateStageMascot(res.passed ? "happy" : "thinking");
    document.getElementById("stageSubtext").textContent = res.passed ? tr("SAUBER IM TAKT!", "SOLID TIMING!") : tr("KNAPP DANEBEN", "NOT QUITE");
    document.getElementById("stageMainText").textContent = `${res.exactCount + res.closeCount}/${totalExpected}`;
    document.getElementById("stageFunctionText").textContent = tf("Ø {avg} • Extra: {extra}", "Avg {avg} • Extra: {extra}", { avg: avgStr, extra: res.extraCount });
  }
  const titleEl = document.getElementById("rhythmPadTitle");
  if (titleEl) titleEl.textContent = tf("Runde beendet ({hit}/{tot})", "Round complete ({hit}/{tot})", { hit: res.exactCount + res.closeCount, tot: totalExpected });
  showExamPostAnswerNextBar();
}

function skipCurrentExamQuestion() {
  const exam = state?.exam;
  const ex = state?.currentExercise;
  if (!exam || !exam.active || exam.currentAnswered) return;

  exam.currentAnswered = true;
  clearExamTimers(exam);
  stopPlayback();

  const curMode = ex?.type || exam.plan[exam.currentIdx] || "cadence";
  let targetLabel = "";
  let snapshot = null;

  if (curMode === "solfege" && ex?.targetItem) {
    targetLabel = `${getSolfegeDisplayLabel(ex.targetItem.syllable)} (${ex.targetItem.germanNote || ""})`;
    snapshot = {
      type: "solfege",
      rootMidi: HARMONIC_DATA.roots[state.currentKey]?.midi || 60,
      targetNoteName: ex.targetItem.noteName,
      targetSyllable: ex.targetItem.syllable,
      chosenNoteName: null,
      chosenSyllable: null
    };
  } else if (curMode === "melody" && ex?.melodySlots) {
    const isDictation = ex.melodyStyle === "dictation";
    targetLabel = ex.melodySlots.map(s => {
      const syl = getSolfegeDisplayLabel(s.syllable);
      return isDictation ? `${syl} (${getLocalizedMelodyRhythmValue(s.rhythmKey).short})` : syl;
    }).join(" – ");
    snapshot = {
      type: "melody",
      activeBpm: state.activeBpm || 90,
      melodyStyle: ex.melodyStyle || "rhythmic",
      melodyPulse: Boolean(state.settings.melodyPulse),
      beatsPerBar: ex.beatsPerBar || 4,
      totalMelodyBeats: ex.totalMelodyBeats || 8,
      targetSlots: ex.melodySlots.map(s => ({
        syllable: s.syllable,
        noteName: s.noteName,
        beatOffset: s.beatOffset,
        durationBeats: s.durationBeats,
        rhythmKey: s.rhythmKey,
        velocity: s.velocity
      })),
      chosenSlots: null
    };
  } else if (curMode === "rhythm-dictation" && ex?.rhythmSlots) {
    targetLabel = ex.rhythmSlots.map(s => s.cell.short).join(" • ");
    snapshot = {
      type: "rhythm-dictation",
      activeBpm: state.activeBpm || 90,
      targetCellKeys: ex.rhythmSlots.map(s => s.cellKey),
      chosenCellKeys: null
    };
  } else if (curMode === "rhythm-tap" && ex?.tapSlots) {
    const beatMs = 60000 / (state.activeBpm || 90);
    const exp = [];
    ex.tapSlots.forEach((slot, beatIdx) => {
      slot.cell.offsets.forEach(off => exp.push(Math.round((beatIdx + off) * beatMs)));
    });
    targetLabel = `${ex.meterKey} • ${ex.tapSlots.map(s => s.cell.short).join(" • ")}`;
    snapshot = {
      type: "rhythm-tap",
      activeBpm: state.activeBpm || 90,
      beatsPerBar: ex.beatsPerBar || 4,
      expectedOffsets: exp,
      tapsMs: null
    };
  } else if (isNotationMode(curMode) && ex?.targetItem) {
    targetLabel = ex.targetItem.displayName;
    const sigId = normalizeNotationKeySigId(ex.targetItem.keySignatureId || ex.keySignatureId || "none");
    snapshot = {
      type: curMode,
      clefId: ex.targetItem.clefId,
      staffStep: ex.targetItem.staffStep,
      accidental: ex.targetItem.accidental,
      keySignatureId: sigId,
      shownAccidental: ex.targetItem.shownAccidental !== undefined ? ex.targetItem.shownAccidental : ex.targetItem.accidental,
      targetNoteName: ex.targetItem.noteName,
      chosenNoteName: null
    };
  } else if (ex) {
    targetLabel = getExamChoiceDisplayText(curMode, ex.targetItem?.key);
    snapshot = buildExamChoiceSnapshot(ex, null);
  }

  recordExamQuestionEntry({
    mode: curMode,
    status: "skipped",
    score: 0,
    chosenKey: null,
    targetKey: ex?.targetItem?.key || null,
    chosenLabel: tr("Übersprungen", "Skipped"),
    targetLabel: targetLabel,
    audioSnapshot: snapshot
  });

  advanceExamQuestion();
}

function advanceExamQuestion() {
  const exam = state?.exam;
  if (!exam || !exam.active) return;
  clearExamTimers(exam);
  stopPlayback();

  if (exam.currentIdx + 1 >= exam.totalQuestions) {
    completeCategoryExam();
    return;
  }

  exam.currentIdx += 1;
  loadCurrentExamQuestion();
}

function requestExamAbort() {
  if (!state?.exam?.active) return;
  const banner = document.getElementById("examAbortConfirmBanner");
  banner?.classList.remove("hidden");
}

function cancelExamAbort() {
  document.getElementById("examAbortConfirmBanner")?.classList.add("hidden");
}

function abortCategoryExam() {
  if (!state?.exam?.active) return;
  const cat = state.exam.categoryKey || state.examSetupCategory || "interval";
  stopPlayback();
  cleanupActiveExamState({ restoreSettings: true });
  openExamSetupPage(cat, { skipHistoryPush: true });
}

function completeCategoryExam() {
  const exam = state?.exam;
  if (!exam || !exam.active) return;

  clearExamTimers(exam);
  stopPlayback();

  const totalQuestions = Math.max(1, exam.questions.length || exam.totalQuestions);
  const earnedScore = Math.round(exam.questions.reduce((sum, q) => sum + (Number(q.score) || 0), 0) * 100) / 100;
  const percent = Math.max(0, Math.min(100, Math.round((earnedScore / totalQuestions) * 100)));
  const correctCount = exam.questions.filter(q => q.status === "correct").length;
  const partialCount = exam.questions.filter(q => q.status === "partial").length;
  const wrongCount = exam.questions.filter(q => q.status === "wrong" || q.status === "skipped").length;
  const durationSec = Math.max(1, Math.round((Date.now() - (exam.startedWallMs || Date.now())) / 1000));

  const byMode = new Map();
  exam.questions.forEach(q => {
    if (!byMode.has(q.mode)) {
      byMode.set(q.mode, { mode: q.mode, total: 0, earned: 0, correct: 0 });
    }
    const row = byMode.get(q.mode);
    row.total += 1;
    row.earned = Math.round((row.earned + (Number(q.score) || 0)) * 100) / 100;
    if (q.status === "correct") row.correct += 1;
  });

  const prevBest = getCategoryBestExamPercent(exam.categoryKey, exam.levelId);
  const isNewBest = prevBest === null || percent > prevBest;

  const entry = sanitizeExamHistoryEntry({
    id: `exam_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    categoryKey: exam.categoryKey,
    levelId: exam.levelId,
    levelNumber: exam.levelNumber,
    totalQuestions: totalQuestions,
    earnedScore: earnedScore,
    correctCount: correctCount,
    partialCount: partialCount,
    wrongCount: wrongCount,
    percent: percent,
    durationSec: durationSec,
    feedbackMode: exam.feedbackMode,
    maxReplays: exam.maxReplays,
    completedAt: Date.now(),
    moduleBreakdown: Array.from(byMode.values()),
    reviewItems: exam.questions
  });

  if (entry) {
    if (!Array.isArray(state.profile.examHistory)) state.profile.examHistory = [];
    state.profile.examHistory.unshift(entry);
    state.profile.examHistory = state.profile.examHistory.slice(0, 25);
    saveUserProfile(state.profile);
  }

  cleanupActiveExamState({ restoreSettings: true });
  openExamResultView(entry?.id || null, {
    entryObj: entry,
    isNewBest: isNewBest,
    returnView: "exam-setup"
  });
}

function openExamResultView(examId, options = {}) {
  const historyList = Array.isArray(state?.profile?.examHistory) ? state.profile.examHistory : [];
  const entry = options.entryObj || historyList.find(e => e.id === examId) || historyList[0] || null;
  if (!entry) return;

  state.activeExamResultId = entry.id;
  state.activeExamResultObj = entry;
  state.examSetupCategory = entry.categoryKey;
  state.examResultReturnView = options.returnView || state.examResultReturnView || "exam-setup";
  state.examResultReviewFilter = "all";
  state.activeExamIsNewBest = Boolean(options.isNewBest);

  renderExamResultView();
  switchView("exam-result", {
    skipHistoryPush: Boolean(options.fromHistory),
    fromHistory: Boolean(options.fromHistory),
    examCompletedTransition: true
  });
}

function renderExamResultView() {
  const container = document.getElementById("examResultContent");
  const entry = state.activeExamResultObj ||
    (Array.isArray(state.profile?.examHistory) ? state.profile.examHistory.find(e => e.id === state.activeExamResultId) : null);
  if (!container) return;

  if (!entry) {
    container.innerHTML = `<div class="exam-history-empty">${escapeHtml(tr("Kein Prüfungsergebnis gefunden.", "No exam result found."))}</div>`;
    return;
  }

  const badge = getLauschebaerExamBadge(entry.percent);
  const preset = getExamPresetById(entry.categoryKey, entry.levelId);
  const levelTitle = preset ? tr(preset.title.de, preset.title.en) : tf("Stufe {n}", "Level {n}", { n: entry.levelNumber });

  // Schwächstes Modul ermitteln
  let weakest = null;
  const breakdownRows = (entry.moduleBreakdown || []).map(b => {
    const pct = Math.max(0, Math.min(100, Math.round((b.earned / Math.max(1, b.total)) * 100)));
    if (!weakest || pct < weakest.pct) {
      weakest = { mode: b.mode, pct: pct };
    }
    const barCls = pct >= 80 ? "" : (pct >= 50 ? "is-mid" : "is-low");
    return `
      <div class="exam-breakdown-row">
        <div class="exam-breakdown-meta">
          <span>${escapeHtml(getLocalizedExamModeName(b.mode))}</span>
          <span>${escapeHtml(`${formatExamScoreVal(b.earned)} / ${b.total} (${pct}%)`)}</span>
        </div>
        <div class="exam-breakdown-bar">
          <div class="exam-breakdown-fill ${barCls}" style="width:${pct}%;"></div>
        </div>
      </div>
    `;
  }).join("");

  const hasImprovableWeakest = Boolean(weakest && entry.percent < 100);
  const errItemsCount = (entry.reviewItems || []).filter(r => r.status !== "correct").length;
  const filterMode = state.examResultReviewFilter === "wrong" && errItemsCount > 0 ? "wrong" : "all";
  const visibleReviewItems = filterMode === "wrong"
    ? (entry.reviewItems || []).filter(r => r.status !== "correct")
    : (entry.reviewItems || []);

  const reviewHtml = visibleReviewItems.map((item, visiblePos) => {
    const itemIdx = (entry.reviewItems || []).indexOf(item);
    const snap = item.audioSnapshot;
    const isOk = item.status === "correct";
    const isPartial = item.status === "partial";
    const cardCls = isOk ? "is-correct" : (isPartial ? "is-partial" : "is-wrong");
    const statusCls = isOk ? "is-ok" : (isPartial ? "is-warn" : "is-err");
    const statusText = isOk
      ? tr("✓ Richtig", "✓ Correct")
      : (isPartial
          ? tf("◐ {pts} Pkt.", "◐ {pts} pts", { pts: formatExamScoreVal(item.score) })
          : (item.status === "skipped" ? tr("⏭ Übersprungen", "⏭ Skipped") : tr("✗ Falsch", "✗ Wrong")));

    const targetDisplay = item.targetLabel || getExamChoiceDisplayText(item.mode, item.targetKey);
    const chosenDisplay = item.status === "skipped"
      ? tr("Übersprungen", "Skipped")
      : (item.chosenLabel || getExamChoiceDisplayText(item.mode, item.chosenKey));

    const canPlayTarget = Boolean(snap);
    const canPlayChosen = Boolean(
      snap && item.status !== "skipped" && (
        snap.chosenKey || snap.chosenNoteName || snap.chosenFreqHz ||
        (Array.isArray(snap.chosenSlots) && snap.chosenSlots.length > 0) ||
        (Array.isArray(snap.chosenCellKeys) && snap.chosenCellKeys.length > 0) ||
        Array.isArray(snap.tapsMs)
      )
    );
    const canCompareAB = Boolean(
      !isOk && canPlayChosen && canPlayTarget &&
      !["melody", "rhythm-dictation", "rhythm-tap"].includes(item.mode)
    );

    return `
      <article class="exam-review-item ${cardCls}" data-review-idx="${itemIdx}">
        <div class="exam-review-head">
          <span class="exam-review-q">${escapeHtml(tf("Frage {n} • {mod}", "Question {n} • {mod}", { n: item.qIndex || (visiblePos + 1), mod: getLocalizedExamModeName(item.mode) }))}</span>
          <span class="exam-review-status ${statusCls}">${escapeHtml(statusText)}</span>
        </div>
        ${isNotationMode(item.mode) && snap && Number.isFinite(Number(snap.staffStep)) ? `
          <div class="exam-notation-review-staff">${buildNotationMiniStaffSVG(snap)}</div>
        ` : ""}
        <div class="exam-review-answers">
          <div class="exam-review-line">
            <span class="exam-review-lbl">${escapeHtml(tr("Deine Wahl:", "Your pick:"))}</span>
            <span>${escapeHtml(chosenDisplay)}${item.detailNote ? ` (${escapeHtml(item.detailNote)})` : ""}</span>
          </div>
          ${!isOk ? `
            <div class="exam-review-line">
              <span class="exam-review-lbl">${escapeHtml(tr("Richtig:", "Target:"))}</span>
              <span>${escapeHtml(targetDisplay)}</span>
            </div>
          ` : ""}
        </div>
        ${canPlayTarget ? `
          <div class="exam-review-audio">
            ${canPlayChosen ? `<button type="button" class="btn-tool" data-review-play="${itemIdx}:chosen">${escapeHtml(tr("▶ Meine Wahl", "▶ My Choice"))}</button>` : ""}
            <button type="button" class="btn-tool" data-review-play="${itemIdx}:target">${escapeHtml(tr("▶ Richtige Lösung", "▶ Target Sound"))}</button>
            ${canCompareAB ? `<button type="button" class="btn-tool" data-review-play="${itemIdx}:compare">${escapeHtml(tr("⇄ A/B Vergleich", "⇄ A/B Compare"))}</button>` : ""}
          </div>
        ` : ""}
      </article>
    `;
  }).join("");

  const newBestBadge = state.activeExamIsNewBest
    ? `<span class="exam-new-best-pill">★ ${escapeHtml(tr("Neuer Bestwert!", "New Best!"))}</span>`
    : "";

  container.innerHTML = `
    <section class="exam-result-hero ${badge.tierCls}">
      <div class="exam-result-badge-row">
        <span class="exam-badge-pill">${badge.icon} ${escapeHtml(badge.title)}</span>
        ${newBestBadge}
      </div>
      <div class="exam-result-score">${entry.percent}%</div>
      <h2 class="exam-result-title">${escapeHtml(`${getCategoryTitle(entry.categoryKey)} • ${levelTitle}`)}</h2>
      <p class="exam-result-sub">${escapeHtml(badge.sub)}</p>
      <div class="exam-metrics-row">
        <div class="exam-metric-box">
          <span class="exam-metric-val">${escapeHtml(`${formatExamScoreVal(entry.earnedScore)} / ${entry.totalQuestions}`)}</span>
          <span class="exam-metric-lbl">${escapeHtml(tr("Punkte", "Points"))}</span>
        </div>
        <div class="exam-metric-box">
          <span class="exam-metric-val">${escapeHtml(formatExamDuration(entry.durationSec))}</span>
          <span class="exam-metric-lbl">${escapeHtml(tr("Dauer", "Duration"))}</span>
        </div>
        <div class="exam-metric-box">
          <span class="exam-metric-val">${escapeHtml(entry.feedbackMode === "instant" ? tr("Sofort", "Instant") : tr("Blind", "Blind"))}</span>
          <span class="exam-metric-lbl">${escapeHtml(entry.maxReplays === 0 ? tr("Unbegrenzt", "Unlimited") : tr("Max. 2× Replay", "Max 2× Replay"))}</span>
        </div>
      </div>
    </section>

    <section class="exam-result-actions">
      ${hasImprovableWeakest ? `
        <button id="examPracticeWeakestBtn" type="button" class="btn-primary-action">
          ${escapeHtml(tf("🎯 Schwächstes Modul üben: {mod}", "🎯 Practice Weakest: {mod}", { mod: getLocalizedExamModeName(weakest.mode) }))}
        </button>
      ` : ""}
      <div class="exam-result-actions-row">
        <button id="examRetryBtn" type="button" class="btn-secondary-action">${escapeHtml(tr("↻ Prüfung wiederholen", "↻ Retry Exam"))}</button>
        <button id="examMoreExamsBtn" type="button" class="btn-secondary-action">${escapeHtml(tr("Weitere Prüfungen", "More Exams"))}</button>
      </div>
    </section>

    ${breakdownRows ? `
      <section class="exam-result-card">
        <div class="exam-section-head">
          <h3>${escapeHtml(tr("Aufschlüsselung nach Modulen", "Module Breakdown"))}</h3>
        </div>
        <div class="exam-breakdown-list">${breakdownRows}</div>
      </section>
    ` : ""}

    <section class="exam-result-card">
      <div class="exam-section-head">
        <h3>${escapeHtml(tr("Fragen- & Fehler-Rückschau", "Question & Error Audio Review"))}</h3>
      </div>
      <div class="exam-review-filter-row">
        <button type="button" class="k-filter-pill ${filterMode === "all" ? "active" : ""}" data-review-filter="all">
          ${escapeHtml(tf("Alle ({tot})", "All ({tot})", { tot: (entry.reviewItems || []).length }))}
        </button>
        ${errItemsCount > 0 ? `
          <button type="button" class="k-filter-pill ${filterMode === "wrong" ? "active" : ""}" data-review-filter="wrong">
            ${escapeHtml(tf("Nur Fehler ({n})", "Errors Only ({n})", { n: errItemsCount }))}
          </button>
        ` : ""}
      </div>
      <div class="exam-review-list">${reviewHtml}</div>
    </section>
  `;

  document.getElementById("examPracticeWeakestBtn")?.addEventListener("click", () => {
    if (weakest) launchWeakestExamModule(entry, weakest.mode);
  });
  document.getElementById("examRetryBtn")?.addEventListener("click", () => {
    startCategoryExam(entry.categoryKey, entry.levelId);
  });
  document.getElementById("examMoreExamsBtn")?.addEventListener("click", () => {
    openExamSetupPage(entry.categoryKey);
  });

  container.querySelectorAll("[data-review-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.examResultReviewFilter = btn.dataset.reviewFilter === "wrong" ? "wrong" : "all";
      renderExamResultView();
    });
  });

  container.querySelectorAll("[data-review-play]").forEach(btn => {
    btn.addEventListener("click", () => {
      const [idxStr, side] = String(btn.dataset.reviewPlay || "").split(":");
      const idx = parseInt(idxStr, 10);
      if (Number.isInteger(idx)) {
        playExamReviewAudio(entry, idx, side || "target");
      }
    });
  });
}

function launchWeakestExamModule(entry, weakestMode) {
  if (!entry || !weakestMode) return;
  const preset = getExamPresetById(entry.categoryKey, entry.levelId);
  if (preset && preset.apply) {
    Object.assign(state.settings, preset.apply);
  }
  state.setMode(weakestMode);
  state.exerciseReturnView = "exam-result";
  switchView("exercise");
}

function playSingleExamReviewSnapshot(snap, side) {
  if (!snap) return 0;
  const key = side === "chosen" ? snap.chosenKey : snap.targetKey;
  const currentId = audioEngine.playbackId;
  const type = snap.type;

  if (type === "cadence") {
    const bpm = snap.activeBpm || 120;
    const timing = getCadenceStepTiming(bpm, snap.activeTimeSig || "4/4");
    const bars = Array.isArray(snap.bars) ? [...snap.bars] : [];
    if (side === "chosen" && key && HARMONIC_DATA.degrees[key] && Number.isInteger(snap.targetIndex) && bars[snap.targetIndex]) {
      const ch = buildChordNotes(snap.rootMidi || 60, HARMONIC_DATA.degrees[key]);
      bars[snap.targetIndex] = { notes: ch.chordNotes, bass: ch.bassNote };
    }
    bars.forEach((b, idx) => {
      const delay = idx * timing.stepMs;
      const dur = idx === bars.length - 1 ? timing.finalDurSec : timing.stepDurSec;
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== currentId) return;
        audioEngine.playStep(b.notes, dur, b.bass, "cadence");
      }, delay);
    });
    return Math.max(0, bars.length - 1) * timing.stepMs + timing.finalHoldMs;
  }

  if (type && type.startsWith("interval-")) {
    const def = key ? getLocalizedIntervalDef(key) : null;
    const semi = def ? def.semitones : 0;
    const targetMidi = (snap.rootMidi || 60) + (snap.directionSign || 1) * semi;
    const secondNote = side === "chosen" ? midiToNote(targetMidi) : snap.targetNote;
    const refNote = snap.refNote || midiToNote(snap.rootMidi || 60);
    if (type === "interval-harmonic") {
      audioEngine.playStep([refNote, secondNote], 1.15, null, "interval-harmonic");
      return 1200;
    }
    if (type === "interval-drone") {
      const { delayMs, pianoDurSec, padDurSec, cycleMs } = getDroneIntervalTiming(snap.activeBpm || 90);
      const padNotes = Array.isArray(snap.padNotes) && snap.padNotes.length > 0
        ? snap.padNotes
        : [midiToNote((snap.rootMidi || 60) - 12), refNote];
      audioEngine.playDroneIntervalCue(padNotes, [secondNote], { delayMs, padDurSec, pianoDurSec });
      return cycleMs;
    }
    const { stepMs, note1DurSec, note2DurSec } = getMelodicIntervalTiming(snap.activeBpm || 90);
    audioEngine.playStep([refNote], note1DurSec, null, "cadence");
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== currentId) return;
      audioEngine.playStep([secondNote], note2DurSec, null, "cadence");
    }, stepMs);
    return stepMs + Math.round(note2DurSec * 1000) + 120;
  }

  if (isChordQualityMode(type)) {
    const def = key ? getLocalizedChordDef(key) : null;
    const rawNotes = side === "chosen" && def
      ? def.offsets.map(s => midiToNote((snap.rootMidi || 60) + s))
      : (Array.isArray(snap.targetNotes) ? snap.targetNotes : []);
    if (isChordArpeggioMode(type)) {
      const seqNotes = type === "chord-arp-down" ? [...rawNotes].reverse() : rawNotes;
      const { stepMs, noteDurSec, lastNoteDurSec, cycleMs } = getChordArpeggioPromptTiming(seqNotes.length, snap.activeBpm || 90);
      seqNotes.forEach((n, idx) => {
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== currentId) return;
          audioEngine.playStep([n], idx === seqNotes.length - 1 ? lastNoteDurSec : noteDurSec, null, "cadence");
        }, idx * stepMs);
      });
      return cycleMs;
    }
    audioEngine.playStep(rawNotes, 1.2, null, "cadence");
    return 1250;
  }

  if (type === "chord-inversions") {
    let notes = snap.targetNotes || [];
    if (side === "chosen" && key) {
      const invDef = getLocalizedChordInversionDef(key);
      if (invDef) {
        notes = buildChordInversionNotes(snap.rootMidi || 60, snap.chordKey || "maj", invDef.stepIndex, snap.currentKey || "C").notes;
      }
    }
    audioEngine.playStep(notes, 1.2, null, "cadence");
    return 1250;
  }

  if (type === "solfege" || isNotationMode(type)) {
    const noteName = side === "chosen" ? snap.chosenNoteName : snap.targetNoteName;
    if (noteName) audioEngine.playStep([noteName], 1.05, null, "interval");
    return 1100;
  }

  if (type === "melody") {
    const rawSlots = side === "chosen" && Array.isArray(snap.chosenSlots) ? snap.chosenSlots : (snap.targetSlots || []);
    const bpm = snap.activeBpm || 90;
    const beatSec = 60 / bpm;
    const beatMs = beatSec * 1000;
    const isSteady = snap.melodyStyle === "steady" || !snap.melodyStyle;
    const isDictation = snap.melodyStyle === "dictation";
    const beatsPerBar = snap.beatsPerBar || 4;

    let accBeats = 0;
    const items = rawSlots.map((s, idx) => {
      const durBeats = Number(s.durationBeats) || (isSteady ? 2 : 1);
      const beatOffset = (side === "chosen" && isDictation)
        ? accBeats
        : (Number.isFinite(Number(s.beatOffset)) ? Number(s.beatOffset) : idx * 2);
      accBeats = beatOffset + durBeats;
      return {
        noteName: s.noteName,
        beatOffset: beatOffset,
        durationBeats: durBeats,
        velocity: s.velocity || 0.88
      };
    });

    const totalBeats = items.length > 0
      ? Math.max(snap.totalMelodyBeats || 0, ...items.map(it => it.beatOffset + it.durationBeats))
      : 4;
    const baseAudioTime = getAudioClockSec() + 0.04;
    const lookaheadMs = 95;

    if (!isSteady && snap.melodyPulse) {
      const clickEvents = [];
      const totalClicks = Math.ceil(totalBeats);
      for (let b = 0; b < totalClicks; b++) {
        clickEvents.push([
          Math.round(b * beatMs),
          b % beatsPerBar === 0 ? "accent" : "tick",
          b % beatsPerBar === 0 ? 0.56 : 0.36
        ]);
      }
      audioEngine.playRhythmSequence(clickEvents, baseAudioTime);
    }

    items.forEach(it => {
      const delayMs = Math.round(it.beatOffset * beatMs);
      const timerDelay = Math.max(0, delayMs - lookaheadMs);
      const durSec = Math.max(0.16, it.durationBeats * beatSec * 0.86);
      const targetAt = baseAudioTime + delayMs / 1000;
      audioEngine.registerTimer(() => {
        if (audioEngine.playbackId !== currentId) return;
        audioEngine.playStep([it.noteName], durSec, null, "melody-note", {
          atTime: targetAt,
          velocity: it.velocity
        });
      }, timerDelay);
    });

    return Math.round(totalBeats * beatMs) + 180;
  }

  if (type === "rhythm-meter") {
    const res = buildRhythmMeterEvents(key || "4/4", snap.activeBpm || 90, 1, false);
    audioEngine.playRhythmSequence(res.events, getAudioClockSec() + 0.04);
    return Math.round(res.totalMs) + 120;
  }

  if (type === "rhythm-dictation") {
    const keys = side === "chosen" && Array.isArray(snap.chosenCellKeys) ? snap.chosenCellKeys : (snap.targetCellKeys || []);
    const beatMs = 60000 / (snap.activeBpm || 90);
    const events = [];
    for (let b = 0; b < 4; b++) {
      events.push([Math.round(b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.52 : 0.36]);
      const cell = getChoiceItem("rhythm-dictation", keys[b]);
      if (cell && Array.isArray(cell.offsets)) {
        cell.offsets.forEach(off => events.push([Math.round((b + off) * beatMs), "clave", 0.96]));
      }
    }
    audioEngine.playRhythmSequence(events, getAudioClockSec() + 0.04);
    return Math.round(4 * beatMs) + 150;
  }

  if (type === "rhythm-tap") {
    const beatMs = 60000 / (snap.activeBpm || 90);
    const beatsPerBar = snap.beatsPerBar || 4;
    const events = [];
    for (let b = 0; b < beatsPerBar; b++) {
      events.push([Math.round(b * beatMs), b === 0 ? "accent" : "tick", b === 0 ? 0.56 : 0.38]);
    }
    if (side === "chosen" && Array.isArray(snap.tapsMs)) {
      snap.tapsMs.forEach(t => {
        events.push([Math.max(0, Math.round(t)), "clave", 0.96]);
      });
    } else if (Array.isArray(snap.expectedOffsets)) {
      snap.expectedOffsets.forEach(t => {
        events.push([Math.max(0, Math.round(t)), "clave", 0.96]);
      });
    }
    audioEngine.playRhythmSequence(events, getAudioClockSec() + 0.04);
    return Math.round(beatsPerBar * beatMs) + 220;
  }

  if (type === "rhythm-groove") {
    const res = buildRhythmGrooveEvents(
      { grooveKind: snap.grooveKind || "style", bars: snap.bars || [], targetItem: { key: key || "backbeat" } },
      key || "backbeat",
      snap.activeBpm || 90
    );
    audioEngine.playRhythmSequence(res.events, getAudioClockSec() + 0.04);
    return Math.round(res.totalMs) + 150;
  }

  if (type === "prod-tone") {
    const hz = side === "chosen" && snap.chosenFreqHz ? snap.chosenFreqHz : snap.targetFreqHz;
    if (hz) audioEngine.playProductionTone(hz, 1.1);
    return 1150;
  }

  if (type === "prod-eq-noise") {
    const hz = side === "chosen" && snap.chosenFreqHz ? snap.chosenFreqHz : snap.targetFreqHz;
    if (hz) {
      audioEngine.playProductionNoiseEQ({
        mode: "boost-only",
        freqHz: hz,
        q: snap.q || 2.8,
        gainDb: snap.boostDb || 4,
        durationSec: 1.15
      });
    }
    return 1220;
  }

  if (type && type.startsWith("modes-")) {
    const modeDef = key ? getLocalizedModeDef(key) : null;
    if (modeDef) {
      return playModeExercisePattern({ type: type, rootMidi: snap.rootMidi || 60, anchorBass: snap.anchorBass }, modeDef, 0);
    }
  }
  return 0;
}

async function playExamReviewAudio(entry, itemIdx, side = "target") {
  const item = entry?.reviewItems?.[itemIdx];
  const snap = item?.audioSnapshot;
  if (!snap) return;

  await ensureAudioReady();
  stopPlayback();
  const playId = audioEngine.playbackId;

  if (side === "compare") {
    const firstMs = playSingleExamReviewSnapshot(snap, "chosen");
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== playId) return;
      playSingleExamReviewSnapshot(snap, "target");
    }, Math.max(450, firstMs + 280));
    return;
  }

  playSingleExamReviewSnapshot(snap, side === "chosen" ? "chosen" : "target");
}

function renderExamHistoryCard() {
  const summaryEl = document.getElementById("spaceExamHistorySummary");
  const listEl = document.getElementById("spaceExamHistoryList");
  const footerEl = document.getElementById("spaceExamHistoryFooter");
  const toggleBtn = document.getElementById("toggleAllExamHistoryBtn");
  const clearBtn = document.getElementById("clearExamHistoryBtn");
  if (!listEl) return;

  const history = Array.isArray(state?.profile?.examHistory) ? state.profile.examHistory : [];
  if (clearBtn) {
    clearBtn.classList.toggle("hidden", history.length === 0);
    if (!state.examHistoryClearArmed) {
      clearBtn.textContent = tr("Verlauf löschen", "Clear History");
    }
  }

  if (history.length === 0) {
    if (summaryEl) summaryEl.innerHTML = "";
    footerEl?.classList.add("hidden");
    listEl.innerHTML = `
      <div class="exam-history-empty">
        ${escapeHtml(tr(
          "Noch keine Prüfung abgelegt. Öffne auf dem Startbildschirm eine Kategorie und wähle „Kategorie-Prüfung ablegen“.",
          "No exams completed yet. Open any category on Home and tap “Take Category Exam”."
        ))}
      </div>
    `;
    return;
  }

  const avgPct = Math.round(history.reduce((s, e) => s + (Number(e.percent) || 0), 0) / history.length);
  const bestPct = Math.max(...history.map(e => Number(e.percent) || 0));

  if (summaryEl) {
    summaryEl.innerHTML = `
      <span class="k-ratio-chip">${escapeHtml(tf("Prüfungen: {n}", "Exams: {n}", { n: history.length }))}</span>
      <span class="k-ratio-chip">${escapeHtml(tf("Ø {pct}%", "Avg {pct}%", { pct: avgPct }))}</span>
      <span class="k-ratio-chip">${escapeHtml(tf("Bestwert: {pct}%", "Best: {pct}%", { pct: bestPct }))}</span>
    `;
  }

  const showAll = Boolean(state.examHistoryShowAll);
  const visible = showAll ? history : history.slice(0, 5);

  listEl.innerHTML = visible.map(entry => {
    const preset = getExamPresetById(entry.categoryKey, entry.levelId);
    const levelShort = preset ? tr(preset.title.de, preset.title.en) : tf("Stufe {n}", "Level {n}", { n: entry.levelNumber });
    const badge = getLauschebaerExamBadge(entry.percent);
    const pctCls = entry.percent >= 80 ? "is-ok" : (entry.percent >= 50 ? "is-mid" : "is-low");
    return `
      <button type="button" class="exam-history-row" data-open-exam-result="${escapeHtml(entry.id)}">
        <span class="exam-history-main">
          <span class="exam-history-title">${escapeHtml(`${getCategoryTitle(entry.categoryKey)} • ${levelShort}`)}</span>
          <span class="exam-history-meta">${escapeHtml(`${formatExamDate(entry.completedAt)} • ${entry.totalQuestions} ${tr("Fragen", "Questions")} • ${formatExamDuration(entry.durationSec)} • ${badge.icon}`)}</span>
        </span>
        <span class="exam-history-score">
          <span class="exam-history-pct ${pctCls}">${entry.percent}%</span>
          <span class="exam-history-open-hint">${escapeHtml(tr("Details & Audio ›", "Details & Audio ›"))}</span>
        </span>
      </button>
    `;
  }).join("");

  listEl.querySelectorAll("[data-open-exam-result]").forEach(rowBtn => {
    rowBtn.addEventListener("click", () => {
      openExamResultView(rowBtn.dataset.openExamResult, { returnView: "space" });
    });
  });

  if (footerEl && toggleBtn) {
    if (history.length > 5) {
      footerEl.classList.remove("hidden");
      toggleBtn.textContent = showAll
        ? tr("Weniger anzeigen", "Show less")
        : tf("Alle {n} Prüfungen anzeigen", "Show all {n} exams", { n: history.length });
    } else {
      footerEl.classList.add("hidden");
    }
  }
}

function handleClearExamHistoryClick() {
  const clearBtn = document.getElementById("clearExamHistoryBtn");
  if (!state.examHistoryClearArmed) {
    state.examHistoryClearArmed = true;
    if (clearBtn) clearBtn.textContent = tr("Wirklich löschen?", "Confirm clear?");
    setTimeout(() => {
      state.examHistoryClearArmed = false;
      renderExamHistoryCard();
    }, 4000);
    return;
  }
  state.examHistoryClearArmed = false;
  state.examHistoryShowAll = false;
  if (state.profile) {
    state.profile.examHistory = [];
    saveUserProfile(state.profile);
  }
  renderExamHistoryCard();
}
