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
    "cadence-minor": tr("Kadenzen (Moll)", "Cadences (Minor)"),
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
    "modes-cadence": tr("Modales Akkordpendel", "Modal Chord Loop"),
    "rhythm-meter": tr("Taktarten & Metrum", "Meters & Time Sigs"),
    "rhythm-dictation": tr("Rhythmus-Diktat", "Rhythm Dictation"),
    "rhythm-tap": tr("Rhythmus nachklopfen", "Rhythm Tap-Back"),
    "rhythm-groove": tr("Grooves & Mikro-Timing", "Grooves & Micro-Timing"),
    "prod-tone": tr("Isolierte Frequenzen", "Isolated Frequencies"),
    "prod-eq-noise": tr("EQ-Boost im Pink Noise", "EQ Boost in Pink Noise"),
    "notation-treble": tr("Violinschlüssel", "Treble Clef"),
    "notation-bass": tr("Bassschlüssel", "Bass Clef"),
    "notation-alto": tr("Altschlüssel", "Alto Clef"),
    "notation-mixed": tr("Schlüssel-Mix", "Clef Mix"),
    "notation-grand": tr("Doppelsystem", "Grand Staff"),
    "notation-chords": tr("Akkorde lesen", "Chord Reading"),
    "notation-symbols": tr("Symbole & Begriffe", "Symbols & Markings")
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

// Datum & Uhrzeit im Format der App-Sprache (z. B. „19.11.2026, 14:30“ / „19 Nov 2026, 14:30“)
function formatExamDate(ts) {
  const d = new Date(Number(ts) || Date.now());
  try {
    const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
    const locale = (typeof getLanguageConfig === "function" && getLanguageConfig(lang)?.htmlLang) || lang || "de";
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(d);
  } catch (_e) {
    // Rückfall für sehr alte WebViews ohne Intl-Unterstützung
  }
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

function getExamIconSVG(kind, size = 16) {
  const s = Number(size) || 16;
  const open = `<svg class="exam-svg-icon" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">`;
  if (kind === "trophy") {
    return `${open}<path d="M7 4.5h10v4.8a5 5 0 0 1-10 0V4.5Z" fill="currentColor" fill-opacity="0.16"/><path d="M7 6.5H4.8a1.8 1.8 0 0 0-1.8 1.8v.4a3.4 3.4 0 0 0 3.4 3.4h.9"/><path d="M17 6.5h2.2a1.8 1.8 0 0 1 1.8 1.8v.4a3.4 3.4 0 0 1-3.4 3.4h-.9"/><path d="M12 14.3v4.2"/><path d="M8.5 19.5h7"/><path d="M9.6 18.5h4.8"/></svg>`;
  }
  if (kind === "medal") {
    return `${open}<path d="M8.5 3.5 10.6 9"/><path d="M15.5 3.5 13.4 9"/><path d="M7 3.5h10"/><circle cx="12" cy="14.5" r="5.5" fill="currentColor" fill-opacity="0.16"/><path d="M12 11.9l.8 1.7 1.8.2-1.3 1.3.3 1.8-1.6-.9-1.6.9.3-1.8-1.3-1.3 1.8-.2.8-1.7Z" stroke-width="1.5"/></svg>`;
  }
  if (kind === "leaf") {
    return `${open}<path d="M19.5 4.8C13.4 4.8 7 8.4 6.2 15.2c-.2 1.7.7 3.1 2.4 3.2 6.8.3 10.9-5.8 10.9-13.6Z" fill="currentColor" fill-opacity="0.16"/><path d="M5.5 19.5c2.4-2.8 5.6-5.7 9.6-8.2"/></svg>`;
  }
  if (kind === "headphones") {
    return `${open}<path d="M4.5 14v-1.5a7.5 7.5 0 0 1 15 0V14"/><rect x="3.5" y="13.5" width="3.8" height="6" rx="1.8" fill="currentColor" fill-opacity="0.18"/><rect x="16.7" y="13.5" width="3.8" height="6" rx="1.8" fill="currentColor" fill-opacity="0.18"/></svg>`;
  }
  if (kind === "star") {
    return `${open}<path d="M12 3.4l2.55 5.18 5.72.83-4.14 4.03.98 5.7L12 16.45l-5.11 2.69.98-5.7-4.14-4.03 5.72-.83L12 3.4Z" fill="currentColor" fill-opacity="0.22"/></svg>`;
  }
  if (kind === "check") {
    return `${open}<path d="M5 12.6l4.6 4.6L19 7.5" stroke-width="2.4"/></svg>`;
  }
  if (kind === "partial") {
    return `${open}<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" stroke="none"/></svg>`;
  }
  if (kind === "cross") {
    return `${open}<path d="M7 7l10 10M17 7L7 17" stroke-width="2.3"/></svg>`;
  }
  if (kind === "skip") {
    return `${open}<path d="M5.5 6.8 13.8 12l-8.3 5.2V6.8Z" fill="currentColor" fill-opacity="0.18"/><path d="M17.5 6.8v10.4" stroke-width="2.2"/></svg>`;
  }
  if (kind === "play") {
    return `${open}<path d="M7.5 5.8 18.2 12 7.5 18.2V5.8Z" fill="currentColor" fill-opacity="0.22"/></svg>`;
  }
  if (kind === "compare") {
    return `${open}<path d="M15.8 4.8 19.5 8.5l-3.7 3.7"/><path d="M19.2 8.5H5.5"/><path d="M8.2 19.2 4.5 15.5l3.7-3.7"/><path d="M4.8 15.5h13.7"/></svg>`;
  }
  return "";
}

function getLauschebaerExamBadge(percent) {
  const p = Number(percent) || 0;
  if (p >= 90) {
    return {
      tierCls: "tier-master",
      emblemCls: "is-master",
      iconKey: "trophy",
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
      emblemCls: "is-medal",
      iconKey: "medal",
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
      emblemCls: "is-good",
      iconKey: "leaf",
      title: tr("Guter Kurs", "Solid Progress"),
      sub: tr(
        "Gute Grundlage! Ein gezielter Übe-Fokus auf das schwächste Modul hebt dich aufs nächste Niveau.",
        "Solid foundation! A quick focus session on your weakest module will level you right up."
      )
    };
  }
  return {
    tierCls: "",
    emblemCls: "is-keep",
    iconKey: "headphones",
    title: tr("Dranbleiben lohnt sich", "Keep Listening"),
    sub: tr(
      "Jede Prüfung schärft dein Ohr – vergleiche deine Antworten jetzt direkt in der Hör-Rückschau!",
      "Every exam sharpens your ear — compare your choices directly in the audio review below!"
    )
  };
}

function buildExamCustomIntervalControlsHtml() {
  const curRoot = String(state?.settings?.intervalCustomRoot ?? "random");
  const curScale = String(state?.settings?.intervalCustomScale || "ionian");
  const curScope = String(state?.settings?.intervalCustomScope || "full");

  const rootOptions = [
    `<option value="random" ${curRoot === "random" ? "selected" : ""}>${escapeHtml(tr("Zufall (alle 12)", "Random (all 12)"))}</option>`,
    ...MODES_ROOT_MIDI_BY_PC.map((midi, pc) => {
      const val = String(pc);
      return `<option value="${val}" ${curRoot === val ? "selected" : ""}>${escapeHtml(getModesRootDisplayName(midi))}</option>`;
    })
  ].join("");

  const scaleOptions = Object.keys(INTERVAL_SCALE_PRESETS).map(scaleId =>
    `<option value="${escapeHtml(scaleId)}" ${curScale === scaleId ? "selected" : ""}>${escapeHtml(getLocalizedIntervalCustomScaleLabel(scaleId))}</option>`
  ).join("");

  const scopeOptions = ["triad", "lower", "upper", "full"].map(scope =>
    `<option value="${escapeHtml(scope)}" ${curScope === scope ? "selected" : ""}>${escapeHtml(getLocalizedIntervalCustomScopeLabel(scope))}</option>`
  ).join("");

  const activePool = getActiveIntervalCustomPool();
  const poolText = activePool.map(k => getLocalizedIntervalDef(k)?.symbol || k).join(" • ");

  return `
    <div class="exam-custom-config" data-exam-custom-box>
      <div class="exam-custom-grid">
        <label class="exam-custom-field">
          <span>${escapeHtml(tr("Grundton", "Root Key"))}</span>
          <select class="account-select exam-custom-select" data-exam-custom-select="root">${rootOptions}</select>
        </label>
        <label class="exam-custom-field">
          <span>${escapeHtml(tr("Tonleiter / Modus", "Scale / Mode"))}</span>
          <select class="account-select exam-custom-select" data-exam-custom-select="scale">${scaleOptions}</select>
        </label>
        <label class="exam-custom-field">
          <span>${escapeHtml(tr("Umfang", "Range"))}</span>
          <select class="account-select exam-custom-select" data-exam-custom-select="scope">${scopeOptions}</select>
        </label>
      </div>
      <div class="exam-custom-preview" data-exam-custom-preview>${escapeHtml(tf("Intervall-Auswahl ({n}): {list}", "Interval Pool ({n}): {list}", { n: activePool.length, list: poolText }))}</div>
    </div>
  `;
}

function buildExamCustomSolfegeControlsHtml() {
  const curTonality = state?.settings?.solfegeCustomTonality === "minor" ? "minor" : "major";
  const curKey = String(state?.settings?.solfegeCustomKey || "C");
  const curRange = ["do-fa", "sol-do", "full"].includes(state?.settings?.solfegeCustomRange)
    ? state.settings.solfegeCustomRange
    : "full";
  const curOct = state?.settings?.solfegeCustomOctave === "multi" ? "multi" : "single";
  const keyOrder = ["random", "C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"];

  const keyOptions = keyOrder.map(k => {
    const lbl = k === "random" ? tr("Zufall (alle 12)", "Random (all 12)") : getKeyDisplayName(k, curTonality);
    return `<option value="${escapeHtml(k)}" ${curKey === k ? "selected" : ""}>${escapeHtml(lbl)}</option>`;
  }).join("");

  const scaleSteps = getSolfegeScaleSteps(curTonality);
  const activeSteps = curRange === "do-fa"
    ? scaleSteps.slice(0, 4)
    : (curRange === "sol-do" ? scaleSteps.slice(4, 8) : scaleSteps);
  const stepText = activeSteps.map(st => getSolfegeDisplayLabel(st.syllable)).join(" • ");

  return `
    <div class="exam-custom-config" data-exam-solfege-custom-box>
      <div class="exam-custom-grid is-cols-2">
        <label class="exam-custom-field">
          <span>${escapeHtml(tr("Tongeschlecht", "Tonality"))}</span>
          <select class="account-select exam-custom-select" data-exam-solf-custom="tonality">
            <option value="major" ${curTonality === "major" ? "selected" : ""}>${escapeHtml(tr("Dur", "Major"))}</option>
            <option value="minor" ${curTonality === "minor" ? "selected" : ""}>${escapeHtml(tr("Moll", "Minor"))}</option>
          </select>
        </label>
        <label class="exam-custom-field">
          <span>${escapeHtml(tr("Tonart", "Key"))}</span>
          <select class="account-select exam-custom-select" data-exam-solf-custom="key">${keyOptions}</select>
        </label>
        <label class="exam-custom-field">
          <span>${escapeHtml(tr("Tonraum", "Scale Range"))}</span>
          <select class="account-select exam-custom-select" data-exam-solf-custom="range">
            <option value="do-fa" ${curRange === "do-fa" ? "selected" : ""}>${escapeHtml(tr("Do–Fa (Untere Hälfte)", "Do–Fa (Lower Half)"))}</option>
            <option value="sol-do" ${curRange === "sol-do" ? "selected" : ""}>${escapeHtml(tr("Sol–Do (Obere Hälfte)", "Sol–Do (Upper Half)"))}</option>
            <option value="full" ${curRange === "full" ? "selected" : ""}>${escapeHtml(tr("Ganze Tonart (Do–Do)", "Full Scale (Do–Do)"))}</option>
          </select>
        </label>
        <label class="exam-custom-field">
          <span>${escapeHtml(tr("Oktave", "Octave"))}</span>
          <select class="account-select exam-custom-select" data-exam-solf-custom="oct">
            <option value="single" ${curOct === "single" ? "selected" : ""}>${escapeHtml(tr("1 Oktave", "1 Octave"))}</option>
            <option value="multi" ${curOct === "multi" ? "selected" : ""}>${escapeHtml(tr("Mehrere Oktaven", "Multi-Octave"))}</option>
          </select>
        </label>
      </div>
      <div class="exam-custom-preview" data-exam-solf-custom-preview>${escapeHtml(tf("Aktive Stufen ({n}): {list}", "Active Degrees ({n}): {list}", { n: activeSteps.length, list: stepText }))}</div>
    </div>
  `;
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
    ? `<span class="exam-best-pill">${getExamIconSVG("star", 12)}<span>${escapeHtml(tf("Bestwert: {pct}%", "Best: {pct}%", { pct: catBest }))}</span></span>`
    : "";

  const levelsHtml = catCfg.presets.map(preset => {
    const levelBest = getCategoryBestExamPercent(categoryKey, preset.id);
    const bestHtml = levelBest !== null
      ? `<span class="exam-best-pill">${getExamIconSVG("star", 12)}<span>${escapeHtml(tf("Bestwert: {pct}%", "Best: {pct}%", { pct: levelBest }))}</span></span>`
      : "";
    const pillText = preset.badge
      ? tr(preset.badge.de, preset.badge.en)
      : tf("Stufe {n}", "Level {n}", { n: preset.levelNumber });
    const modeChipsHtml = preset.modes.map(m =>
      `<span class="exam-mode-chip">${escapeHtml(getLocalizedExamModeName(m))}</span>`
    ).join("");
    const customBoxHtml = preset.isCustomIntervalExam
      ? buildExamCustomIntervalControlsHtml()
      : (preset.isCustomSolfegeExam ? buildExamCustomSolfegeControlsHtml() : "");

    return `
      <article class="exam-level-card" data-exam-level-card="${escapeHtml(preset.id)}">
        <div class="exam-level-top">
          <div>
            <div class="exam-level-badges">
              <span class="exam-level-pill">${escapeHtml(pillText)}</span>
              ${bestHtml}
            </div>
            <h3 class="exam-level-title">${escapeHtml(tr(preset.title.de, preset.title.en))}</h3>
            <p class="exam-level-desc">${escapeHtml(tr(preset.desc.de, preset.desc.en))}</p>
          </div>
        </div>
        ${customBoxHtml}
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

  container.querySelectorAll("[data-exam-custom-select]").forEach(sel => {
    sel.addEventListener("change", () => {
      const kind = sel.dataset.examCustomSelect;
      if (kind === "root") {
        state.settings.intervalCustomRoot = sel.value;
      } else if (kind === "scale") {
        state.settings.intervalCustomScale = sel.value;
        state.settings.intervalCustomPool = null;
      } else if (kind === "scope") {
        state.settings.intervalCustomScope = sel.value;
        state.settings.intervalCustomPool = null;
      }
      const previewEl = container.querySelector("[data-exam-custom-preview]");
      if (previewEl) {
        const pool = getActiveIntervalCustomPool();
        const poolText = pool.map(k => getLocalizedIntervalDef(k)?.symbol || k).join(" • ");
        previewEl.textContent = tf("Intervall-Auswahl ({n}): {list}", "Interval Pool ({n}): {list}", { n: pool.length, list: poolText });
      }
    });
  });

  container.querySelectorAll("[data-exam-solf-custom]").forEach(sel => {
    sel.addEventListener("change", () => {
      const kind = sel.dataset.examSolfCustom;
      if (kind === "tonality") {
        state.settings.solfegeCustomTonality = sel.value === "minor" ? "minor" : "major";
        const keySel = container.querySelector('[data-exam-solf-custom="key"]');
        if (keySel) {
          const curTonality = state.settings.solfegeCustomTonality;
          Array.from(keySel.options).forEach(opt => {
            opt.textContent = opt.value === "random"
              ? tr("Zufall (alle 12)", "Random (all 12)")
              : getKeyDisplayName(opt.value, curTonality);
          });
        }
      } else if (kind === "key") {
        state.settings.solfegeCustomKey = sel.value;
      } else if (kind === "range") {
        state.settings.solfegeCustomRange = sel.value;
      } else if (kind === "oct") {
        state.settings.solfegeCustomOctave = sel.value === "multi" ? "multi" : "single";
      }
      const previewEl = container.querySelector("[data-exam-solf-custom-preview]");
      if (previewEl) {
        const curTonality = state.settings.solfegeCustomTonality === "minor" ? "minor" : "major";
        const curRange = state.settings.solfegeCustomRange || "full";
        const steps = getSolfegeScaleSteps(curTonality);
        const activeSteps = curRange === "do-fa" ? steps.slice(0, 4) : (curRange === "sol-do" ? steps.slice(4, 8) : steps);
        const stepText = activeSteps.map(st => getSolfegeDisplayLabel(st.syllable)).join(" • ");
        previewEl.textContent = tf("Aktive Stufen ({n}): {list}", "Active Degrees ({n}): {list}", { n: activeSteps.length, list: stepText });
      }
    });
  });

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

function buildExamDifficultyPlan(cycle, count) {
  if (!Array.isArray(cycle) || cycle.length === 0) return null;
  const total = Math.max(1, Math.min(50, parseInt(count, 10) || 10));
  const plan = [];
  for (let i = 0; i < total; i++) {
    plan.push(cycle[i % cycle.length]);
  }
  for (let i = plan.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = plan[i];
    plan[i] = plan[j];
    plan[j] = tmp;
  }
  return plan;
}

function applyExamLevelSettings(preset, targetMode, overrideDifficulty = null) {
  if (!state?.settings || !preset) return;
  state.settings.mode = targetMode;
  state.settings.rhythmTapReadMode = false;
  Object.assign(state.settings, preset.apply || {});
  if (Number.isInteger(overrideDifficulty)) {
    if (targetMode === "solfege") {
      state.settings.solfegeDifficulty = overrideDifficulty;
    } else {
      state.settings.intervalDifficulty = overrideDifficulty;
    }
  }
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
  const difficultyPlan = buildExamDifficultyPlan(preset.difficultyCycle, total);

  if (categoryKey === "solfege" && typeof getSolfegeLevelConfig === "function") {
    const firstDiff = difficultyPlan ? difficultyPlan[0] : (preset.apply?.solfegeDifficulty || 1);
    if (getSolfegeLevelConfig(firstDiff).keyMode === "session") {
      state.solfegeSessionKey = pickRandomNonCKey(state.solfegeSessionKey);
    }
  }

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
    difficultyPlan: difficultyPlan,
    fixedIntervalPool: Array.isArray(preset.fixedIntervalPool) ? [...preset.fixedIntervalPool] : null,
    useCustomIntervalRoot: Boolean(preset.isCustomIntervalExam),
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

  applyExamLevelSettings(preset, plan[0], difficultyPlan ? difficultyPlan[0] : null);
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

  if (answerSoundBtn) answerSoundBtn.classList.toggle("hidden", isExam || !isNotationStaffMode(state?.currentExercise?.type));
  if (listenBtn) listenBtn.classList.toggle("hidden", isExam || isNotationSymbolsMode(state?.currentExercise?.type) || isSingMatchMode(state?.currentExercise?.type) || isMidiPlayMode(state?.currentExercise?.type));
  if (loopBtn) loopBtn.classList.toggle("hidden", isExam);

  [keyBtn, notationKeyBtn, notationPaceBtn, timeBtn, bpmBtn, melodyPulseBtn].forEach(btn => {
    if (!btn) return;
    btn.classList.toggle("exam-locked", isExam);
    btn.disabled = isExam;
  });

  if (isExam) {
    closeTransientPopovers();
    if (typeof dismissCadenceKeyHint === "function") dismissCadenceKeyHint(false);
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
    if (isNotationSymbolsMode(curMode)) {
      replayPill.textContent = tr("Ohne Audio", "Visual");
    } else if (exam.maxReplays === 0) {
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

// Doppeltipp-Schutz: Bis der Ton tatsächlich startet (Audio-Bereitschaft), ist state.isPlaying noch false –
// ein zweiter Tipp in diesem Moment würde sonst eine weitere der begrenzten Wiederholungen verbrauchen.
const EXAM_PLAY_DEBOUNCE_MS = 600;

function triggerExamPlayAction() {
  const exam = state?.exam;
  if (!exam || !exam.active) {
    playSequence();
    return;
  }
  if (exam.currentAnswered) return;
  const now = Date.now();
  if (now - (exam.lastPlayTriggerAt || 0) < EXAM_PLAY_DEBOUNCE_MS) return;
  exam.lastPlayTriggerAt = now;
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
  const planDiff = Array.isArray(exam.difficultyPlan) ? exam.difficultyPlan[exam.currentIdx] : null;
  applyExamLevelSettings(preset, planMode, Number.isInteger(planDiff) ? planDiff : null);

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
      exam.lastPlayTriggerAt = Date.now(); // ein Tipp direkt beim Autostart zählt nicht als Wiederholung
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
    renderWrongChoiceFeedbackCard(ex, chosenDef, selectedKey, true);
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
  const preferFlat = FLAT_KEYS.has(state.currentKey) || ex.tonality === "minor";

  recordExamQuestionEntry({
    mode: "solfege",
    status: isCorrect ? "correct" : "wrong",
    score: isCorrect ? 1 : 0,
    chosenKey: clickedKeyDef.syllable,
    targetKey: target.syllable,
    chosenLabel: `${getSolfegeDisplayLabel(clickedKeyDef.syllable)} (${midiToGermanNote(clickedKeyDef.midi, preferFlat)})`,
    targetLabel: `${getSolfegeDisplayLabel(target.syllable)} (${target.germanNote || midiToGermanNote(target.midi, preferFlat)})`,
    audioSnapshot: {
      type: "solfege",
      rootMidi: ex.rootMidi || HARMONIC_DATA.roots[state.currentKey]?.midi || 60,
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
  const isCorrect = clickedKeyDef?.fromMidi && typeof clickedKeyDef.midiExactOk === "boolean"
    ? clickedKeyDef.midiExactOk
    : Boolean(clickedKeyDef && Number(clickedKeyDef.pc) === Number(target.pc));
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

function handleExamNotationChordAnswer(ex, selectedKey, btnElement) {
  const exam = state?.exam;
  if (!exam || !exam.active || exam.currentAnswered || !ex?.targetItem) return;

  exam.currentAnswered = true;
  clearExamTimers(exam);
  stopPlayback();
  state.exerciseSolved = true;
  ex.isSolved = true;

  const target = ex.targetItem;
  const isCorrect = selectedKey === target.key;
  const chosenDef = getNotationChordChoiceItem(selectedKey);
  const chosenDisplay = chosenDef?.symbol || selectedKey || "?";
  const sigId = normalizeNotationKeySigId(target.keySignatureId || ex.keySignatureId || "none");
  const baseDetail = `${getLocalizedNotationClefName(target.clefId)}${target.inversionDesc ? ` • ${target.inversionDesc}` : ""}`;
  const detailText = sigId !== "none"
    ? `${baseDetail} • ${getLocalizedNotationKeySigName(sigId, true)} (${getLocalizedNotationKeySigBadge(sigId, false)})`
    : baseDetail;

  recordExamQuestionEntry({
    mode: ex.type,
    status: isCorrect ? "correct" : "wrong",
    score: isCorrect ? 1 : 0,
    chosenKey: selectedKey,
    targetKey: target.key,
    chosenLabel: chosenDisplay,
    targetLabel: target.displayName,
    detailNote: detailText,
    audioSnapshot: {
      type: ex.type,
      clefId: target.clefId,
      staffStep: target.staffStep,
      accidental: target.accidental,
      keySignatureId: sigId,
      isChord: true,
      chordTonesSpec: (target.chordTones || []).map(t => ({
        step: t.staffStep,
        acc: t.accidental,
        shownAcc: t.shownAccidental !== undefined ? t.shownAccidental : t.accidental
      })),
      targetNotes: getNotationPlayNotes(target),
      chosenNotes: chosenDef?.notes || null
    }
  });

  if (exam.feedbackMode === "blind") {
    btnElement?.classList.add("exam-choice-recorded");
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

  document.querySelectorAll("#degreeButtonsGrid .degree-btn").forEach(el => {
    el.classList.remove("btn-wrong", "btn-correct");
    if (el.dataset.choice === target.key) el.classList.add("btn-correct");
  });
  const panelEl = document.getElementById("notationStaffPanel");
  panelEl?.classList.remove("is-wrong", "is-correct");

  if (isCorrect) {
    btnElement?.classList.add("btn-correct");
    panelEl?.classList.add("is-correct");
    audioEngine.playStep(getNotationPlayNotes(target), 1.15, null, "interval");
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    document.getElementById("stageSubtext").textContent = tr("RICHTIG GELESEN!", "READ CORRECTLY!");
  } else {
    btnElement?.classList.add("btn-wrong");
    panelEl?.classList.add("is-wrong");
    audioEngine.playStep(getNotationPlayNotes(target), 1.15, null, "interval");
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

function handleExamNotationSymbolAnswer(ex, selectedKey, btnElement) {
  const exam = state?.exam;
  if (!exam || !exam.active || exam.currentAnswered || !ex?.targetItem) return;

  exam.currentAnswered = true;
  clearExamTimers(exam);
  stopPlayback({ preserveStage: true });
  state.exerciseSolved = true;
  ex.isSolved = true;

  const target = ex.targetItem;
  const isCorrect = selectedKey === target.key;
  const chosenMeta = ex.symbolChoiceMeta?.[selectedKey];
  const chosenDisplay = ex.promptKind === "flow-order"
    ? (chosenMeta?.text || selectedKey || "?")
    : (ex.promptKind === "meaning-to-symbol"
        ? (chosenMeta ? `${chosenMeta.term} (${chosenMeta.abbr})` : selectedKey)
        : (chosenMeta?.short || selectedKey || "?"));
  const detailText = ex.promptKind === "flow-order"
    ? (target.termLabel || "")
    : `${target.termLabel || ""}${target.abbr ? ` (${target.abbr})` : ""}`;

  recordExamQuestionEntry({
    mode: ex.type,
    status: isCorrect ? "correct" : "wrong",
    score: isCorrect ? 1 : 0,
    chosenKey: selectedKey,
    targetKey: target.key,
    chosenLabel: chosenDisplay,
    targetLabel: target.displayName,
    detailNote: detailText,
    audioSnapshot: {
      type: "notation-symbols",
      isVisualOnly: true,
      promptKind: ex.promptKind,
      svgKey: ex.svgKey || target.svgKey || null,
      flowScenarioId: ex.flowScenarioId || null,
      promptText: ex.promptKind === "meaning-to-symbol" ? (ex.promptQuestion || "") : (ex.promptTitle || "")
    }
  });

  if (exam.feedbackMode === "blind") {
    btnElement?.classList.add("exam-choice-recorded");
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

  document.querySelectorAll("#degreeButtonsGrid .degree-btn").forEach(el => {
    el.classList.remove("btn-wrong", "btn-correct");
    if (el.dataset.choice === target.key) el.classList.add("btn-correct");
  });
  const panelEl = document.getElementById("notationStaffPanel");
  panelEl?.classList.remove("is-wrong", "is-correct");

  if (isCorrect) {
    btnElement?.classList.add("btn-correct");
    panelEl?.classList.add("is-correct");
    setCentralStageMode("stage-playing");
    updateStageMascot("happy");
    document.getElementById("stageSubtext").textContent = tr("RICHTIG!", "CORRECT!");
  } else {
    btnElement?.classList.add("btn-wrong");
    panelEl?.classList.add("is-wrong");
    setCentralStageMode("stage-wrong");
    updateStageMascot("thinking");
    document.getElementById("stageSubtext").textContent = tr("NICHT GANZ", "NOT QUITE");
  }
  document.getElementById("stageMainText").textContent = ex.promptKind === "flow-order"
    ? target.displayName
    : `${target.termLabel} (${target.abbr})`;
  document.getElementById("stageFunctionText").textContent = target.explanation || target.shortMeaning || "";
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
  const card = null; // Melodie steht im Notensystem → unten per renderMelodyStaffPanel neu zeichnen
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
    renderMelodyStaffPanel(ex);
    document.getElementById(`barCard_${idx}`)?.classList.add("tile-selected-pulse");
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

  renderMelodyStaffPanel(ex);
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
  renderMelodyStaffPanel(ex);
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

  renderMelodyStaffPanel(ex);
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
    if (promptEl) promptEl.textContent = tf("Muster für Schlag {step}/4:", "Pattern for beat {step}/4:", { step: nextIdx + 1 }, {
      fr: "Motif pour le temps {step}/4 :",
      es: "Patrón para el pulso {step}/4:",
      it: "Motivo per il battito {step}/4:",
      pl: "Wzór na miarę {step}/4:",
      tr: "{step}/4 vuruş için desen:",
      uk: "Малюнок для долі {step}/4:",
      ur: "دھڑکن {step}/4 کا نمونہ:",
      ar: "نمط النبضة {step}/4:"
    });
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
  } else if (isNotationSymbolsMode(curMode) && ex?.targetItem) {
    targetLabel = ex.targetItem.displayName;
    snapshot = {
      type: "notation-symbols",
      isVisualOnly: true,
      promptKind: ex.promptKind,
      svgKey: ex.svgKey || ex.targetItem.svgKey || null,
      flowScenarioId: ex.flowScenarioId || null,
      promptText: ex.promptKind === "meaning-to-symbol" ? (ex.promptQuestion || "") : (ex.promptTitle || "")
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
      isChord: Boolean(ex.targetItem.isChord),
      chordTonesSpec: ex.targetItem.isChord && Array.isArray(ex.targetItem.chordTones)
        ? ex.targetItem.chordTones.map(t => ({
            step: t.staffStep,
            acc: t.accidental,
            shownAcc: t.shownAccidental !== undefined ? t.shownAccidental : t.accidental
          }))
        : undefined,
      targetNotes: ex.targetItem.isChord ? getNotationPlayNotes(ex.targetItem) : undefined,
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
  if (typeof queueFitExerciseLayout === "function") queueFitExerciseLayout(true);
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
  if (typeof recordAchievementEvent === "function") {
    recordAchievementEvent({
      type: "exam-completed",
      categoryKey: exam.categoryKey,
      levelId: exam.levelId,
      percent
    });
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
    const statusIconKey = isOk
      ? "check"
      : (isPartial ? "partial" : (item.status === "skipped" ? "skip" : "cross"));
    const statusText = isOk
      ? tr("Richtig", "Correct")
      : (isPartial
          ? tf("{pts} Pkt.", "{pts} pts", { pts: formatExamScoreVal(item.score) })
          : (item.status === "skipped" ? tr("Übersprungen", "Skipped") : tr("Falsch", "Wrong")));

    const targetDisplay = item.targetLabel || getExamChoiceDisplayText(item.mode, item.targetKey);
    const chosenDisplay = item.status === "skipped"
      ? tr("Übersprungen", "Skipped")
      : (item.chosenLabel || getExamChoiceDisplayText(item.mode, item.chosenKey));

    const canPlayTarget = Boolean(snap && !snap.isVisualOnly);
    const canPlayChosen = Boolean(
      snap && !snap.isVisualOnly && item.status !== "skipped" && (
        snap.chosenKey || snap.chosenNoteName || snap.chosenFreqHz ||
        (Array.isArray(snap.chosenNotes) && snap.chosenNotes.length > 0) ||
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
          <span class="exam-review-status ${statusCls}">${getExamIconSVG(statusIconKey, 12)}<span>${escapeHtml(statusText)}</span></span>
        </div>
        ${isNotationSymbolsMode(item.mode) && snap && typeof buildNotationSymbolReviewHTML === "function" ? buildNotationSymbolReviewHTML(snap) : ""}
        ${isNotationStaffMode(item.mode) && snap && Number.isFinite(Number(snap.staffStep)) ? `
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
            ${canPlayChosen ? `<button type="button" class="btn-tool exam-review-audio-btn" data-review-play="${itemIdx}:chosen">${getExamIconSVG("play", 12)}<span>${escapeHtml(tr("Meine Wahl", "My Choice"))}</span></button>` : ""}
            <button type="button" class="btn-tool exam-review-audio-btn" data-review-play="${itemIdx}:target">${getExamIconSVG("play", 12)}<span>${escapeHtml(tr("Richtige Lösung", "Target Sound"))}</span></button>
            ${canCompareAB ? `<button type="button" class="btn-tool exam-review-audio-btn" data-review-play="${itemIdx}:compare">${getExamIconSVG("compare", 12)}<span>${escapeHtml(tr("A/B Vergleich", "A/B Compare"))}</span></button>` : ""}
          </div>
        ` : ""}
      </article>
    `;
  }).join("");

  const newBestBadge = state.activeExamIsNewBest
    ? `<span class="exam-new-best-pill">${getExamIconSVG("star", 13)}<span>${escapeHtml(tr("Neuer Bestwert!", "New Best!"))}</span></span>`
    : "";

  container.innerHTML = `
    <section class="exam-result-hero ${badge.tierCls}">
      <h2 class="exam-result-hero-heading">${escapeHtml(tr("Prüfungsübersicht", "Exam Overview"))}</h2>
      <div class="exam-result-emblem ${badge.emblemCls}" aria-hidden="true">${getExamIconSVG(badge.iconKey, 28)}</div>
      <div class="exam-result-badge-row">
        <span class="exam-badge-pill ${badge.emblemCls}">${escapeHtml(badge.title)}</span>
        ${newBestBadge}
      </div>
      <div class="exam-result-score">${entry.percent}%</div>
      <h3 class="exam-result-title">${escapeHtml(`${getCategoryTitle(entry.categoryKey)} • ${levelTitle}`)}</h3>
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
          ${escapeHtml(tf("Schwächstes Modul üben: {mod}", "Practice Weakest: {mod}", { mod: getLocalizedExamModeName(weakest.mode) }))}
        </button>
      ` : ""}
      <div class="exam-result-actions-row">
        <button id="examRetryBtn" type="button" class="btn-secondary-action exam-retry-btn">${escapeHtml(tr("Prüfung wiederholen", "Retry Exam"))}</button>
        <button id="examMoreExamsBtn" type="button" class="btn-secondary-action exam-more-btn">${escapeHtml(tr("Weitere Prüfungen", "More Exams"))}</button>
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

  if (type && type.startsWith("interval-")) {
    const def = key ? getLocalizedIntervalDef(key) : null;
    const semi = def ? def.semitones : 0;
    const rootMidi = snap.rootMidi || 60;
    const targetMidi = rootMidi + (snap.directionSign || 1) * semi;
    const secondNote = (side !== "chosen" && snap.targetNote) ? snap.targetNote : midiToNote(targetMidi);
    const refNote = snap.refNote || midiToNote(rootMidi);
    const { stepMs, note1DurSec, note2DurSec } = getMelodicIntervalTiming(snap.activeBpm || 90);
    audioEngine.playStep([refNote], note1DurSec, null, "cadence");
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== currentId) return;
      audioEngine.playStep([secondNote], note2DurSec, null, "cadence");
    }, stepMs);
    return stepMs + Math.round(note2DurSec * 1000) + 120;
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

  if (type === "solfege") {
    const refNote = snap.refNote || midiToNote(snap.rootMidi || 60);
    const noteName = side === "chosen" ? snap.chosenNoteName : snap.targetNoteName;
    if (!noteName) return 0;
    const { stepMs, note1DurSec, note2DurSec } = getMelodicIntervalTiming(snap.activeBpm || 90);
    audioEngine.playStep([refNote], note1DurSec, null, "interval");
    audioEngine.registerTimer(() => {
      if (audioEngine.playbackId !== currentId) return;
      audioEngine.playStep([noteName], note2DurSec, null, "interval");
    }, stepMs);
    return stepMs + Math.round(note2DurSec * 1000) + 120;
  }

  if (isNotationMode(type)) {
    if (snap.isChord) {
      const notes = side === "chosen" ? snap.chosenNotes : snap.targetNotes;
      if (Array.isArray(notes) && notes.length > 0) {
        audioEngine.playStep(notes, 1.15, null, "interval");
        return 1200;
      }
    }
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

function playExamReviewAudio(entry, itemIdx, side = "target") {
  const item = entry?.reviewItems?.[itemIdx];
  const snap = item?.audioSnapshot;
  if (!snap) return;

  prepareAudioNonBlocking();
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
  const confirmBox = document.getElementById("examHistoryClearConfirm");
  if (!listEl) return;

  const history = Array.isArray(state?.profile?.examHistory) ? state.profile.examHistory : [];
  if (history.length === 0) {
    state.examHistoryClearArmed = false;
  }
  if (clearBtn) {
    clearBtn.classList.toggle("hidden", history.length === 0);
    clearBtn.classList.toggle("is-armed", Boolean(state.examHistoryClearArmed && history.length > 0));
    clearBtn.setAttribute("aria-expanded", state.examHistoryClearArmed && history.length > 0 ? "true" : "false");
    clearBtn.textContent = tr("Verlauf löschen", "Clear History");
  }
  if (confirmBox) {
    confirmBox.classList.toggle("hidden", !(state.examHistoryClearArmed && history.length > 0));
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
          <span class="exam-history-meta">
            <span>${escapeHtml(`${formatExamDate(entry.completedAt)} • ${entry.totalQuestions} ${tr("Fragen", "Questions")} • ${formatExamDuration(entry.durationSec)}`)}</span>
            <span class="exam-history-badge-ico ${badge.emblemCls}" title="${escapeHtml(badge.title)}" aria-hidden="true">${getExamIconSVG(badge.iconKey, 13)}</span>
          </span>
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
  const history = Array.isArray(state?.profile?.examHistory) ? state.profile.examHistory : [];
  if (history.length === 0) return;
  // Öffnet bzw. schließt den abgesetzten Bestätigungs-Banner – doppeltes Klicken an derselben Stelle löscht nie versehentlich
  state.examHistoryClearArmed = !state.examHistoryClearArmed;
  renderExamHistoryCard();
}

function cancelClearExamHistory() {
  state.examHistoryClearArmed = false;
  renderExamHistoryCard();
}

function confirmClearExamHistory() {
  state.examHistoryClearArmed = false;
  state.examHistoryShowAll = false;
  if (state.profile) {
    state.profile.examHistory = [];
    saveUserProfile(state.profile);
  }
  renderExamHistoryCard();
}
