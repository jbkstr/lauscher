/**
 * Lauscher • Wissens-Hub, Artikel, Referenzen, Quintenzirkel & interaktive Theorie-Tools
 */

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
  // Querverweise wechseln die Seite ohne Ansichtswechsel – laufende Wellen-Animation hier beenden
  stopWaveAnimation();

  if (!options.refreshOnly) {
    state.knowledgeReturnView = options.returnView || (state.currentView === "circle" ? "circle" : "knowledge");
  }
  state.activeKnowledgeDetail = { kind: "ref", key: refKey };
  if (!options.refreshOnly && refKey && typeof recordAchievementEvent === "function") {
    recordAchievementEvent({ type: "knowledge-seen", key: `ref:${refKey}` });
  }

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
              <div><strong>${tr("Aufwärts:", "Ascending:")}</strong> ${item.songsAsc}</div>
              <div><strong>${tr("Abwärts:", "Descending:")}</strong> ${item.songsDesc}</div>
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
    initPhysicsSpectrumExplorer(container);
    state.wavePaused = false;
    // Wellen-Labor startet erst nach dem Ansichtswechsel (siehe Ende der Funktion)

    const pauseBtn = document.getElementById("toggleWavePauseBtn");
    pauseBtn?.addEventListener("click", () => {
      state.wavePaused = !state.wavePaused;
      pauseBtn.textContent = state.wavePaused
        ? tr("▶ Welle bewegen", "▶ Animate Wave")
        : tr("⏸ Welle anhalten", "⏸ Pause Wave");
      if (!state.wavePaused && typeof state.waveResume === "function") state.waveResume();
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
              <strong>${tr("Auflösungsweg:", "Resolution path:")}</strong> ${step.resolveDesc}
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
      "Grundidee, Leselogik, Nutzen & Praxis-Übungen",
      "Core idea, reading logic, benefits & practical drills"
    );

    container.innerHTML = renderCircleOfFifthsReferenceHTML();
    bindKnowledgeAudioButtons(container);

  } else if (refKey === "sing-and-play") {
    state.knowledgeTitle = tr("Singen & Spielen", "Sing & Play");
    state.knowledgeSub = tr("Koordination, Unabhängigkeit & effektive Praxis-Übungen", "Coordination, hand-voice independence & practical drills");

    container.innerHTML = `<div class="knowledge-list">${renderSingAndPlayReferenceHTML()}</div>`;
    bindKnowledgeAudioButtons(container);

  } else if (refKey === "notation") {
    state.knowledgeTitle = tr("Notation & Schlüssel", "Notation & Clefs");
    state.knowledgeSub = tr("Notensystem, Schlüssel, Hilfslinien & Vorzeichen sicher beherrschen", "Master the 5-line staff, clefs, ledger lines & accidentals");

    const html = typeof renderNotationReferenceHTML === "function" ? renderNotationReferenceHTML() : "";
    const crosslinkHtml = `
      <article class="knowledge-card nts-crosslink-card">
        <div class="k-card-top-row">
          <span class="k-card-tag tag-lilac">${escapeHtml(tr("Vortragszeichen & Symbole", "Expression Marks & Symbols"))}</span>
          <span class="k-ratio-chip" dir="ltr">pp • ff • rit. • Coda</span>
        </div>
        <h4>${escapeHtml(tr("Dynamik, Tempo, Artikulation & Ablauf nachschlagen", "Look up dynamics, tempo, articulation & score roadmaps"))}</h4>
        <p>${escapeHtml(tr("Alle wichtigen Spielanweisungen, Verzierungen und Sprungzeichen (Segno, Coda, Volten) mit Erklärungen und Hörbeispielen.", "All essential performance markings, ornaments and jump signs (Segno, Coda, voltas) with explanations and audio demos."))}</p>
        <div class="k-btn-row">
          <button type="button" class="btn-primary-action" data-open-ref-inline="notation-symbols">${escapeHtml(tr("Vortragszeichen & Symbole öffnen →", "Open Expression Marks & Symbols →"))}</button>
        </div>
      </article>
    `;
    container.innerHTML = `<div class="knowledge-list">${html}${crosslinkHtml}</div>`;
    container.querySelectorAll("[data-open-ref-inline]").forEach(btn => {
      btn.addEventListener("click", () => openKnowledgeDetail(btn.dataset.openRefInline));
    });
    bindKnowledgeAudioButtons(container);

  } else if (refKey === "notation-symbols") {
    state.knowledgeTitle = tr("Vortragszeichen & Symbole", "Expression Marks & Symbols");
    state.knowledgeSub = tr("Dynamik, Tempo, Artikulation, Verzierungen, Coda & Ablauf", "Dynamics, tempo, articulation, ornaments, Coda & roadmaps");

    const html = typeof renderNotationSymbolsReferenceHTML === "function" ? renderNotationSymbolsReferenceHTML() : "";
    container.innerHTML = `<div class="knowledge-list">${html}</div>`;
    if (typeof bindNotationSymbolsKnowledgeHandlers === "function") {
      bindNotationSymbolsKnowledgeHandlers(container);
    }

  } else if (refKey === "arranging") {
    state.knowledgeTitle = tr("Arrangieren", "Arranging", {
      fr: "Arrangement",
      es: "Arreglo",
      it: "Arrangiamento",
      pl: "Aranżacja",
      tr: "Aranjman",
      uk: "Аранжування",
      ur: "ارینجنگ (ترتیبِ موسیقی)",
      ar: "التوزيع الموسيقي"
    });
    state.knowledgeSub = tr(
      "Wie aus einer Skizze ein lebendiges Gesamtwerk für Band, Chor oder Orchester wird",
      "How a simple sketch turns into a living piece for band, choir, or orchestra",
      {
        fr: "Comment transformer une esquisse en œuvre vivante pour groupe, chœur ou orchestre",
        es: "Cómo un simple boceto se convierte en una obra viva para grupo, coro u orquesta",
        it: "Come un semplice schizzo diventa un brano vivo per band, coro o orchestra",
        pl: "Jak zamienić prosty szkic w żywe brzmienie dla zespołu, chóru lub orkiestry",
        tr: "Basit bir taslağın grup, koro veya orkestra için canlı bir esere dönüşmesi",
        uk: "Як перетворити простий ескіз на живе звучання для гурту, хору чи оркестру",
        ur: "ایک سادہ خاکے کو بینڈ، کوائر یا آرکسٹرا کے لیے جاندار موسیقی میں کیسے بدلا جائے",
        ar: "كيف تتحوّل فكرة موسيقية بسيطة إلى عمل حيّ لفرقة أو جوقة أو أوركسترا"
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
  // Erst jetzt ist die Detailansicht aktiv – vorher würde die Animation sofort abbrechen
  // bzw. von switchView() wieder gestoppt (das Wellenbild blieb leer)
  if (refKey === "physics") {
    initWaveVisualizer(2, 1);
  }
}

function openKnowledgeArticle(articleId, options = {}) {
  const articles = getLocalizedKnowledgeArticles();
  const art = articles.find(a => a.id === articleId);
  const container = document.getElementById("knowledgeDetailContent");
  if (!art || !container) {
    if (options.refreshOnly && state.currentView === "knowledge-detail") {
      switchView("knowledge");
    }
    return;
  }

  if (!options.refreshOnly) {
    state.knowledgeReturnView = options.returnView || "knowledge";
  }
  state.activeKnowledgeDetail = { kind: "article", id: articleId };
  if (!options.refreshOnly && articleId && typeof recordAchievementEvent === "function") {
    recordAchievementEvent({ type: "knowledge-seen", key: `article:${articleId}` });
  }
  state.knowledgeTitle = art.tag;
  state.knowledgeSub = art.title;

  container.innerHTML = art.render();
  bindKnowledgeAudioButtons(container);
  if (!options.refreshOnly) {
    switchView("knowledge-detail");
  }
}

function openCircleOfFifthsView(returnView = "tools") {
  state.circleReturnView = returnView;
  switchView("circle");
}

function renderCircleOfFifthsView() {
  const container = document.getElementById("circleToolContent");
  if (!container || typeof renderCircleOfFifthsToolHTML !== "function") return;
  const cof = state.circleOfFifthsState || { idx: 0, ringMode: "major", tab: "chords" };
  container.innerHTML = renderCircleOfFifthsToolHTML(cof.idx, cof.ringMode, cof.tab);
  bindKnowledgeAudioButtons(container);

  container.querySelectorAll("[data-cof-idx]").forEach(el => {
    const activateWedge = () => {
      const nextIdx = parseInt(el.dataset.cofIdx || "0", 10);
      const targetRing = el.dataset.cofTargetRing === "minor" ? "minor" : "major";
      state.circleOfFifthsState = { ...cof, idx: nextIdx, ringMode: targetRing };
      renderCircleOfFifthsView();
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
      renderCircleOfFifthsView();
    });
  });

  container.querySelectorAll("[data-cof-step]").forEach(btn => {
    btn.addEventListener("click", () => {
      const delta = parseInt(btn.dataset.cofStep || "0", 10);
      const nextIdx = ((cof.idx + delta) % 12 + 12) % 12;
      state.circleOfFifthsState = { ...cof, idx: nextIdx };
      renderCircleOfFifthsView();
    });
  });

  container.querySelectorAll("[data-cof-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.circleOfFifthsState = { ...cof, tab: btn.dataset.cofTab || "chords" };
      renderCircleOfFifthsView();
    });
  });
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
    // Nur zeichnen, solange die Physik-Seite mit diesem Canvas wirklich sichtbar ist
    if (state.currentView !== "knowledge-detail" || !canvas.isConnected) {
      state.waveAnimFrame = null;
      state.waveResume = null;
      return;
    }
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
    ctx.font = "bold 11px Andika, -apple-system, sans-serif";
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

    if (state.wavePaused) {
      // Angehalten: Standbild stehen lassen, keine weiteren Frames anfordern (spart Akku)
      state.waveAnimFrame = null;
      return;
    }
    phase += 0.025;
    state.waveAnimFrame = requestAnimationFrame(draw);
  }

  // Fortsetzen nach „Welle bewegen“
  state.waveResume = () => {
    if (!state.waveAnimFrame) state.waveAnimFrame = requestAnimationFrame(draw);
  };

  draw();
}

const PHYSICS_SPECTRUM_PROFILES = {
  sine:    [100, 0,  0,  0,  0,  0,  0,  0,  0,  0],
  piano:   [100, 58, 38, 28, 22, 14, 9,  6,  4,  2],
  guitar:  [86,  82, 68, 45, 36, 32, 24, 18, 12, 8],
  strings: [92,  72, 64, 54, 46, 40, 34, 28, 22, 18]
};

function initPhysicsSpectrumExplorer(rootEl) {
  if (!rootEl) return;
  const bars = Array.from(rootEl.querySelectorAll("[data-spec-bar]"));
  const captionEl = rootEl.querySelector("#freqSpecCaption");
  const btns = Array.from(rootEl.querySelectorAll("[data-spec-preset]"));
  if (!bars.length || !btns.length) return;

  const applyPreset = (btn) => {
    const key = btn.dataset.specPreset || "sine";
    const profile = PHYSICS_SPECTRUM_PROFILES[key] || PHYSICS_SPECTRUM_PROFILES.sine;
    btns.forEach(b => b.classList.toggle("active", b === btn));
    bars.forEach((bar, idx) => {
      const pct = Math.max(0, Math.min(100, profile[idx] ?? 0));
      bar.style.height = `${Math.max(3, pct)}%`;
      bar.classList.toggle("is-zero", pct === 0);
    });
    if (captionEl && btn.dataset.specDesc) {
      captionEl.innerHTML = btn.dataset.specDesc;
    }
  };

  btns.forEach(btn => {
    btn.addEventListener("click", () => applyPreset(btn));
  });
  const initialBtn = btns.find(b => b.classList.contains("active")) || btns[0];
  if (initialBtn) applyPreset(initialBtn);
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

  rootEl.querySelectorAll("[data-open-nashville-tool]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (typeof openNashvilleView === "function") {
        openNashvilleView("knowledge-detail");
      }
    });
  });

  rootEl.querySelectorAll("[data-open-capo-tool]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (typeof openCapoView === "function") {
        openCapoView("knowledge-detail");
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
      const baseAt = audioEngine.getAudioTime() + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
      audioEngine.playStep(["C4"], 0.64, null, "interval", { atTime: baseAt, legato: "melody" });
      audioEngine.registerTimer(() => {
        audioEngine.playStep([midiToNote(60 + semi)], 1.0, null, "interval", { atTime: baseAt + 0.6, legato: "melody" });
      }, 515);
    });
  });

  rootEl.querySelectorAll("[data-play-int-desc]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await ensureAudioReady();
      audioEngine.stopPlayback();
      const semi = parseInt(btn.dataset.playIntDesc, 10);
      const baseAt = audioEngine.getAudioTime() + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
      audioEngine.playStep(["C5"], 0.64, null, "interval", { atTime: baseAt, legato: "melody" });
      audioEngine.registerTimer(() => {
        audioEngine.playStep([midiToNote(72 - semi)], 1.0, null, "interval", { atTime: baseAt + 0.6, legato: "melody" });
      }, 515);
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
      const baseAt = audioEngine.getAudioTime() + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
      audioEngine.playStep(["C4"], 0.64, null, "interval", { atTime: baseAt, legato: "melody" });
      audioEngine.registerTimer(() => {
        audioEngine.playStep([midiToNote(60 + def.semitones)], 1.0, null, "interval", { atTime: baseAt + 0.6, legato: "melody" });
      }, 515);
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
      const stepSec = stepMs / 1000;
      const chordDur = Number.isFinite(customDur) && customDur > 0
        ? Math.max(customDur, stepSec * 1.04)
        : stepSec * 1.06;
      const baseAt = audioEngine.getAudioTime() + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
      degrees.forEach((degKey, idx) => {
        const delayMs = idx * stepMs;
        const isLast = idx === degrees.length - 1;
        audioEngine.registerTimer(() => {
          const def = HARMONIC_DATA.degrees[degKey];
          if (!def) return;
          const n = buildChordNotes(60, def);
          audioEngine.playStep(n.chordNotes, isLast ? Math.max(chordDur, stepSec * 1.1) : chordDur, n.bassNote, "cadence", {
            atTime: baseAt + delayMs / 1000,
            legato: "chord"
          });
        }, Math.max(0, delayMs - 85));
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
      const baseAt = audioEngine.getAudioTime() + (audioEngine.getScheduleLookaheadSec?.() || 0.045);

      // 1. Kadenz I - vi - IV - V
      cadenceDegrees.forEach((degKey, idx) => {
        const delayMs = idx * chordStepMs;
        const isLastChord = idx === cadenceDegrees.length - 1;
        audioEngine.registerTimer(() => {
          const n = buildChordNotes(60, HARMONIC_DATA.degrees[degKey]);
          audioEngine.playStep(n.chordNotes, chordSec * (isLastChord ? 0.98 : 1.06), n.bassNote, "cadence", {
            atTime: baseAt + delayMs / 1000,
            legato: "chord"
          });
        }, Math.max(0, delayMs - 85));
      });

      // 2. Nach deutlicher Pause: der jeweilige Solfège-Ton
      const toneStartMs = cadenceDegrees.length * chordStepMs + pauseAfterCadenceMs;
      audioEngine.registerTimer(() => {
        audioEngine.playStep([midiToNote(60 + semi)], 1.08, null, "interval", {
          atTime: baseAt + toneStartMs / 1000,
          legato: false
        });
      }, Math.max(0, toneStartMs - 85));

      // 3. Nach kurzer Pause: Ruhige stufenweise Auflösung zur Tonika (Do-Fa abwärts, Sol-Ti aufwärts)
      const resolveStartMs = toneStartMs + 1450;
      const resolveStepSec = beatSec * 0.92;
      const resolveStepMs = Math.round(resolveStepSec * 1000);
      resolvePath.forEach((stepSemi, idx) => {
        const delayMs = resolveStartMs + idx * resolveStepMs;
        const isLast = idx === resolvePath.length - 1;
        audioEngine.registerTimer(() => {
          audioEngine.playStep([midiToNote(60 + stepSemi)], isLast ? 1.2 : resolveStepSec * 1.06, null, "interval", {
            atTime: baseAt + delayMs / 1000,
            legato: "melody"
          });
        }, Math.max(0, delayMs - 85));
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
        const baseAt = audioEngine.getAudioTime() + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
        notes.forEach((n, i) => {
          const delayMs = i * 380;
          audioEngine.registerTimer(() => {
            audioEngine.playStep([n], i === 6 ? 1.3 : 0.41, null, "interval", {
              atTime: baseAt + delayMs / 1000,
              legato: "melody"
            });
          }, Math.max(0, delayMs - 85));
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
      const baseAt = audioEngine.getAudioTime() + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
      audioEngine.playStep([], 3.0, "C3", "cadence", { atTime: baseAt, legato: false });
      notes.forEach((n, idx) => {
        const delayMs = idx * 320;
        const isLast = idx === notes.length - 1;
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== currentId) return;
          audioEngine.playStep([n], isLast ? 1.0 : 0.35, null, "interval", {
            atTime: baseAt + delayMs / 1000,
            legato: "melody"
          });
        }, Math.max(0, delayMs - 85));
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
      const baseAt = audioEngine.getAudioTime() + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
      modeObj.vampChords.forEach((ch, idx) => {
        const delayMs = idx * 920;
        const isLast = idx === modeObj.vampChords.length - 1;
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== currentId) return;
          const bassNote = ch[0];
          const upper = ch.slice(1);
          audioEngine.playStep(upper, isLast ? 1.05 : 0.98, bassNote, "cadence", {
            atTime: baseAt + delayMs / 1000,
            legato: "chord"
          });
        }, Math.max(0, delayMs - 85));
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
      const baseAt = audioEngine.getAudioTime() + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
      prog.forEach((step, idx) => {
        const delayMs = idx * 720;
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== currentId) return;
          const chordNotes = step.triad.map(off => midiToNote(rootMidi + off));
          const bassNote = midiToNote(rootMidi + step.rootOff - 12);
          audioEngine.playStep(chordNotes, idx === 3 ? 1.05 : 0.77, bassNote, "cadence", {
            atTime: baseAt + delayMs / 1000,
            legato: "chord"
          });
        }, Math.max(0, delayMs - 85));
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
      const baseAt = audioEngine.getAudioTime() + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
      midis.forEach((m, idx) => {
        const delayMs = idx * 290;
        const isLast = idx === midis.length - 1;
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== currentId) return;
          audioEngine.playStep([midiToNote(m)], isLast ? 0.95 : 0.32, null, "interval", {
            atTime: baseAt + delayMs / 1000,
            legato: "melody"
          });
        }, Math.max(0, delayMs - 85));
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
      const baseAt = audioEngine.getAudioTime() + (audioEngine.getScheduleLookaheadSec?.() || 0.045);
      prog.forEach((step, idx) => {
        const delayMs = idx * 780;
        audioEngine.registerTimer(() => {
          if (audioEngine.playbackId !== currentId) return;
          const chordNotes = step.chord.map(o => midiToNote(baseMidi + o));
          const bassNote = bassFor(baseMidi + step.bass);
          audioEngine.playStep(chordNotes, idx === 3 ? 1.12 : 0.83, bassNote, "cadence", {
            atTime: baseAt + delayMs / 1000,
            legato: "chord"
          });
        }, Math.max(0, delayMs - 85));
      });
    });
  });
}
