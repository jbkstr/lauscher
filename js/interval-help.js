// =====================================================
// INTERVALL-ABSTANDSHILFE & MINI-VISUALISIERUNG (js/interval-help.js)
// =====================================================
// Macht Intervall-Abstände für Einsteiger und Kinder greifbar:
// - Zusatzangabe auf Kacheln (Halbtöne / Klaviertasten / Gitarrenbünde) + proportionaler Balken
// - Klartext-Fragen & vereinfachte Kachel-Überschrift im Entdecker-Modus
// - Kompakte Mini-Klaviatur bzw. Mini-Griffbrett-Auflösung auf der zentralen Bühne
"use strict";

const INTERVAL_HELP_BLACK_PCS = new Set([1, 3, 6, 8, 10]);
const INTERVAL_HELP_FRET_INLAYS = new Set([3, 5, 7, 9, 12]);
const INTERVAL_HELP_STRING_INSTRUMENTS = new Set(["Gitarre", "E-Gitarre", "Bass", "E-Bass", "Ukulele"]);
const INTERVAL_HELP_KEY_INSTRUMENTS = new Set(["Klavier", "Keyboard", "Synthesizer", "Orgel", "Akkordeon"]);

function isIntervalRecognitionType(exType) {
  return exType === "interval-melodic"
    || exType === "interval-melodic-down"
    || exType === "interval-harmonic"
    || exType === "interval-drone";
}

function getDefaultExplorerIntervalDistanceHelp() {
  const instruments = Array.isArray(state?.profile?.instruments) ? state.profile.instruments : [];
  const hasStrings = instruments.some(i => INTERVAL_HELP_STRING_INSTRUMENTS.has(i));
  const hasKeys = instruments.some(i => INTERVAL_HELP_KEY_INSTRUMENTS.has(i));
  if (hasStrings && !hasKeys) return "frets";
  return "keys";
}

function getEffectiveIntervalDistanceHelp(options = {}) {
  if (!options.ignoreExam && typeof state !== "undefined" && state?.exam?.active) {
    return "off";
  }
  const p = typeof state !== "undefined" ? state?.profile : null;
  if (p?.intervalDistanceHelpManual) {
    return sanitizeIntervalDistanceHelp(p.intervalDistanceHelp);
  }
  if (typeof isExplorerModeEnabled === "function" && isExplorerModeEnabled()) {
    return getDefaultExplorerIntervalDistanceHelp();
  }
  return sanitizeIntervalDistanceHelp(p?.intervalDistanceHelp);
}

function isIntervalPlainLanguageActive() {
  return Boolean(typeof isExplorerModeEnabled === "function" && isExplorerModeEnabled());
}

function setIntervalDistanceHelpPreference(mode) {
  const next = sanitizeIntervalDistanceHelp(mode);
  if (typeof state !== "undefined" && state?.profile) {
    state.profile.intervalDistanceHelp = next;
    state.profile.intervalDistanceHelpManual = true;
    if (typeof saveUserProfile === "function") {
      saveUserProfile(state.profile);
    }
  }
  syncIntervalHelpSettingsUI();
  if (typeof state !== "undefined" && state?.currentExercise) {
    syncIntervalHelpChipUI(state.currentExercise);
  }
  if (typeof applyProfileDisplayChanges === "function") {
    applyProfileDisplayChanges();
  }
  if (typeof renderProfileAccountView === "function") {
    renderProfileAccountView();
  }
}

function syncIntervalHelpSettingsUI() {
  const effective = getEffectiveIntervalDistanceHelp({ ignoreExam: true });
  document.querySelectorAll("[data-interval-distance-help]").forEach(btn => {
    const isActive = btn.dataset.intervalDistanceHelp === effective;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function formatIntervalUnitCount(semitones, helpMode, options = {}) {
  const n = Math.max(0, Math.round(Number(semitones) || 0));
  const compact = Boolean(options.compact);
  if (n === 0) return tr("Gleicher Ton", "Same note");
  if (helpMode === "keys") {
    return n === 1 ? tr("1 Taste", "1 key") : tf("{n} Tasten", "{n} keys", { n });
  }
  if (helpMode === "frets") {
    return n === 1 ? tr("1 Bund", "1 fret") : tf("{n} Bünde", "{n} frets", { n });
  }
  if (compact) {
    return tf("{n} HT", "{n} st", { n });
  }
  return n === 1 ? tr("1 Halbton", "1 semitone") : tf("{n} Halbtöne", "{n} semitones", { n });
}

function formatIntervalSignedStep(semitones, exType) {
  const n = Math.max(0, Math.round(Number(semitones) || 0));
  if (n === 0) return "= 0";
  const sign = exType === "interval-melodic-down" ? "−" : "+";
  return `${sign}${n}`;
}

function formatIntervalTileDistance(semitones, exType, helpMode, useSimpleHeadline) {
  const n = Math.max(0, Math.round(Number(semitones) || 0));
  const signed = formatIntervalSignedStep(n, exType);
  const unitText = formatIntervalUnitCount(n, helpMode, { compact: true });
  if (n === 0) {
    return {
      headline: signed,
      subline: unitText,
      isZero: true
    };
  }
  const sign = exType === "interval-melodic-down" ? "−" : "+";
  return {
    headline: signed,
    subline: useSimpleHeadline ? unitText : `${sign}${unitText}`,
    isZero: false
  };
}

function getIntervalDistanceBarPercent(semitones, maxPoolSemitones = 12) {
  const n = Math.max(0, Number(semitones) || 0);
  if (n <= 0) return 0;
  const maxRef = Math.max(12, Number(maxPoolSemitones) || 12);
  return Math.max(10, Math.min(100, Math.round((n / maxRef) * 100)));
}

function getIntervalPlainPromptText(exType) {
  if (exType === "interval-melodic") {
    return tr("Wie weit springt der 2. Ton nach oben?", "How far does the 2nd note jump up?");
  }
  if (exType === "interval-melodic-down") {
    return tr("Wie weit fällt der 2. Ton nach unten?", "How far does the 2nd note drop down?");
  }
  if (exType === "interval-drone") {
    return tr("Wie weit liegt der Klavierton über der Fläche?", "How far above the pad is the piano note?");
  }
  return tr("Wie weit liegen die beiden Töne auseinander?", "How far apart are the two notes?");
}

function getIntervalPlainStageHintText(name = "") {
  if (name) {
    return tf("{name}, wie weit springt der 2. Ton? Tippe den Abstand an.", "{name}, how far did the 2nd note jump? Pick the distance below.", { name });
  }
  return tr("Wie weit springt der 2. Ton? Tippe den Abstand an.", "How far did the 2nd note jump? Pick the distance below.");
}

function formatIntervalRevealDescription(ex, helpMode = getEffectiveIntervalDistanceHelp()) {
  const target = ex?.targetItem;
  if (!target) return "";
  if (!isIntervalRecognitionType(ex?.type) || helpMode === "off") {
    return target.label || "";
  }
  const n = Math.max(0, Math.round(Number(target.semitones) || 0));
  const rootMidi = Number.isFinite(ex.effectiveRootMidi) ? ex.effectiveRootMidi : target.rootMidi;
  const targetMidi = Number.isFinite(ex.targetMidi) ? ex.targetMidi : (rootMidi + (target.directionSign || 1) * n);
  const fromNote = Number.isFinite(rootMidi)
    ? midiToGermanNote(rootMidi, Boolean(ex.refPreferFlat))
    : "";
  const toNote = Number.isFinite(targetMidi)
    ? midiToGermanNote(targetMidi, Boolean(ex.targetPreferFlat))
    : "";
  const label = target.label || target.short || "";

  if (n === 0) {
    return fromNote
      ? tf("{label} • Gleicher Ton ({note})", "{label} • Same note ({note})", { label, note: fromNote })
      : `${label} • ${tr("Gleicher Ton", "Same note")}`;
  }

  const dist = formatIntervalUnitCount(n, helpMode, { compact: false });
  if (ex.type === "interval-harmonic") {
    return tf("{label} • {dist} auseinander ({from} + {to})", "{label} • {dist} apart ({from} + {to})", {
      label,
      dist,
      from: fromNote,
      to: toNote
    });
  }
  if (helpMode === "keys") {
    if (ex.type === "interval-melodic-down") {
      return tf("{label} • {dist} nach links ({from} → {to})", "{label} • {dist} to the left ({from} → {to})", {
        label,
        dist,
        from: fromNote,
        to: toNote
      });
    }
    return tf("{label} • {dist} nach rechts ({from} → {to})", "{label} • {dist} to the right ({from} → {to})", {
      label,
      dist,
      from: fromNote,
      to: toNote
    });
  }
  if (helpMode === "frets") {
    if (ex.type === "interval-melodic-down") {
      return tf("{label} • {dist} tiefer ({from} → {to})", "{label} • {dist} lower ({from} → {to})", {
        label,
        dist,
        from: fromNote,
        to: toNote
      });
    }
    return tf("{label} • {dist} höher ({from} → {to})", "{label} • {dist} higher ({from} → {to})", {
      label,
      dist,
      from: fromNote,
      to: toNote
    });
  }
  return tf("{label} • {dist} ({from} → {to})", "{label} • {dist} ({from} → {to})", {
    label,
    dist,
    from: fromNote,
    to: toNote
  });
}

function formatIntervalWrongChoiceFeedback(ex, chosenDef, helpMode = getEffectiveIntervalDistanceHelp()) {
  if (!ex || !chosenDef || !isIntervalRecognitionType(ex.type) || helpMode === "off" || state?.exam?.active) {
    return "";
  }
  const chosenSemi = Number(chosenDef.semitones);
  const targetSemi = Number(ex.targetItem?.semitones);
  if (!Number.isFinite(chosenSemi) || !Number.isFinite(targetSemi)) return "";
  const lbl = chosenDef.short || chosenDef.label || chosenDef.symbol || "?";
  const dist = formatIntervalUnitCount(chosenSemi, helpMode, { compact: false });
  if (chosenSemi > targetSemi) {
    return tf("Gewählt: {lbl} ({dist}) – der gesuchte Sprung war kleiner.", "Selected: {lbl} ({dist}) — the target leap was smaller.", {
      lbl,
      dist
    });
  }
  if (chosenSemi < targetSemi) {
    return tf("Gewählt: {lbl} ({dist}) – der gesuchte Sprung war größer.", "Selected: {lbl} ({dist}) — the target leap was larger.", {
      lbl,
      dist
    });
  }
  return "";
}

function getIntervalHelpChipLabel(helpMode) {
  if (helpMode === "keys") return tr("Hilfe: Tasten", "Help: Keys");
  if (helpMode === "frets") return tr("Hilfe: Bünde", "Help: Frets");
  if (helpMode === "semitones") return tr("Hilfe: Halbtöne", "Help: Semitones");
  return tr("Hilfe: Aus", "Help: Off");
}

function syncIntervalHelpChipUI(ex) {
  const chipBtn = document.getElementById("intervalHelpChipBtn");
  const popover = document.getElementById("inlineIntervalHelpPopover");
  const isApplicable = Boolean(ex && isIntervalRecognitionType(ex.type) && !state?.exam?.active);
  if (chipBtn) {
    chipBtn.classList.toggle("hidden", !isApplicable);
    if (isApplicable) {
      const mode = getEffectiveIntervalDistanceHelp();
      const isActive = mode !== "off";
      chipBtn.textContent = getIntervalHelpChipLabel(mode);
      chipBtn.classList.toggle("btn-active", isActive);
      chipBtn.classList.toggle("click-muted", !isActive);
      chipBtn.setAttribute("aria-expanded", String(Boolean(popover && !popover.classList.contains("hidden"))));
    } else {
      chipBtn.classList.remove("chip-open");
      chipBtn.setAttribute("aria-expanded", "false");
    }
  }
  if (popover) {
    if (!isApplicable) popover.classList.add("hidden");
    const effective = getEffectiveIntervalDistanceHelp({ ignoreExam: true });
    popover.querySelectorAll("[data-inline-interval-help]").forEach(btn => {
      const active = btn.dataset.inlineIntervalHelp === effective;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }
}

// ---------- MINI-KLAVIATUR & MINI-GRIFFBRETT (SVG) ----------

function escapeIntervalSvgText(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getIntervalShortNoteName(midi, preferFlat = false) {
  if (!Number.isFinite(midi)) return "";
  return midiToGermanNote(midi, preferFlat).replace(/-?\d+$/, "");
}

function isBlackMidiPitch(midi) {
  return INTERVAL_HELP_BLACK_PCS.has(((midi % 12) + 12) % 12);
}

function buildIntervalAnchorMarkerSvgMarkup(opts) {
  const startX = opts.startX;
  const badgeText = opts.badgeText || "";
  const variant = opts.variant || "anchor";
  const pillW = Math.max(46, Math.min(148, badgeText.length * 6.4 + 14));
  const pillX = Math.max(4, Math.min(316 - pillW, startX - pillW / 2));
  return `
    <line class="ivis-stem is-${variant}" x1="${startX.toFixed(1)}" y1="17" x2="${startX.toFixed(1)}" y2="24.5" />
    <rect class="ivis-pill is-${variant}" x="${pillX.toFixed(1)}" y="1.5" width="${pillW.toFixed(1)}" height="15.5" rx="7.75" />
    <text class="ivis-pill-text is-${variant}" x="${(pillX + pillW / 2).toFixed(1)}" y="12.2" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(badgeText)}</text>
  `;
}

function buildIntervalArcSvgMarkup(opts) {
  const startX = opts.startX;
  const endX = opts.endX;
  const badgeText = opts.badgeText || "";
  const variant = opts.variant || "reveal";
  const showArrow = opts.showArrow !== false;
  const yBase = 24;
  if (Math.abs(endX - startX) < 3) {
    // Gleicher Ton (Prime): kleiner Bogen über dem Startpunkt
    const pillW = Math.max(46, Math.min(136, badgeText.length * 6.4 + 14));
    const pillX = Math.max(4, Math.min(316 - pillW, startX - pillW / 2));
    return `
      <path class="ivis-arc is-${variant}" d="M ${(startX - 7).toFixed(1)} ${yBase} C ${(startX - 7).toFixed(1)} 13, ${(startX + 7).toFixed(1)} 13, ${(startX + 7).toFixed(1)} ${yBase}" fill="none" />
      <rect class="ivis-pill is-${variant}" x="${pillX.toFixed(1)}" y="1.5" width="${pillW.toFixed(1)}" height="15.5" rx="7.75" />
      <text class="ivis-pill-text is-${variant}" x="${(pillX + pillW / 2).toFixed(1)}" y="12.2" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(badgeText)}</text>
    `;
  }

  const midX = (startX + endX) / 2;
  const span = Math.abs(endX - startX);
  const ctrlY = Math.max(8, 22 - Math.min(13, span * 0.08));
  const pillW = Math.max(44, Math.min(150, badgeText.length * 6.2 + 14));
  const pillX = Math.max(4, Math.min(316 - pillW, midX - pillW / 2));

  let arrowMarkup = "";
  if (showArrow) {
    const dir = endX >= startX ? 1 : -1;
    const tipX = endX;
    const tipY = yBase;
    arrowMarkup = `<polygon class="ivis-arrow is-${variant}" points="${tipX.toFixed(1)},${tipY.toFixed(1)} ${(tipX - dir * 5.2).toFixed(1)},${(tipY - 5.2).toFixed(1)} ${(tipX - dir * 1.4).toFixed(1)},${(tipY - 6.6).toFixed(1)}" />`;
  }

  return `
    <path class="ivis-arc is-${variant}" d="M ${startX.toFixed(1)} ${yBase} Q ${midX.toFixed(1)} ${ctrlY.toFixed(1)} ${endX.toFixed(1)} ${yBase}" fill="none" />
    ${arrowMarkup}
    <rect class="ivis-pill is-${variant}" x="${pillX.toFixed(1)}" y="1.5" width="${pillW.toFixed(1)}" height="15.5" rx="7.75" />
    <text class="ivis-pill-text is-${variant}" x="${(pillX + pillW / 2).toFixed(1)}" y="12.2" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(badgeText)}</text>
  `;
}

function buildIntervalMiniKeyboardSVG(params) {
  const rootMidi = params.rootMidi;
  const endMidi = params.endMidi !== undefined ? params.endMidi : null;
  const directionSign = params.directionSign !== undefined ? params.directionSign : 1;
  const refPreferFlat = Boolean(params.refPreferFlat);
  const targetPreferFlat = Boolean(params.targetPreferFlat);
  const variant = params.variant || "reveal";
  const badgeText = params.badgeText || "";
  const showArrow = params.showArrow !== false;
  const isAnchorOnly = Boolean(params.isAnchorOnly);
  const isCompareMystery = Boolean(params.isCompareMystery);

  const isDown = directionSign < 0;
  const hasEnd = !isAnchorOnly && !isCompareMystery && Number.isFinite(endMidi);
  const semitones = hasEnd ? Math.abs(endMidi - rootMidi) : 0;

  let lowRef = rootMidi;
  let highRef = rootMidi;
  if (hasEnd) {
    lowRef = Math.min(rootMidi, endMidi);
    highRef = Math.max(rootMidi, endMidi);
  } else if (isDown) {
    lowRef = rootMidi - 12;
    highRef = rootMidi;
  } else {
    lowRef = rootMidi;
    highRef = rootMidi + 12;
  }

  let winStart = lowRef;
  if (isBlackMidiPitch(winStart)) winStart -= 1;
  let winEnd = Math.max(highRef, winStart + 12);
  if (isBlackMidiPitch(winEnd)) winEnd += 1;

  // Bei abwärts-Anker ggf. rechts/links etwas Luft lassen
  if (!hasEnd && isDown && (rootMidi - winStart) < 12) {
    winStart = rootMidi - 12;
    if (isBlackMidiPitch(winStart)) winStart -= 1;
  }

  const whiteMidis = [];
  const blackMidis = [];
  for (let m = winStart; m <= winEnd; m++) {
    if (isBlackMidiPitch(m)) blackMidis.push(m);
    else whiteMidis.push(m);
  }

  const padX = 4;
  const totalW = 312;
  const kbTop = 26;
  const whiteH = 46;
  const blackH = 28;
  const wkW = totalW / Math.max(1, whiteMidis.length);
  const bkW = wkW * 0.62;

  const whiteIndexByMidi = new Map();
  const keyCenterX = new Map();
  whiteMidis.forEach((m, idx) => {
    whiteIndexByMidi.set(m, idx);
    keyCenterX.set(m, padX + (idx + 0.5) * wkW);
  });
  blackMidis.forEach(m => {
    const prevIdx = whiteIndexByMidi.get(m - 1);
    if (prevIdx !== undefined) {
      const boundaryX = padX + (prevIdx + 1) * wkW;
      keyCenterX.set(m, boundaryX);
    }
  });

  // Schritte zwischen Start und Ziel sammeln (1 .. semitones - 1)
  const stepOrderByMidi = new Map();
  if (hasEnd && semitones > 1) {
    const stepDir = endMidi > rootMidi ? 1 : -1;
    for (let s = 1; s < semitones; s++) {
      stepOrderByMidi.set(rootMidi + stepDir * s, s);
    }
  }

  const showStepNumbers = hasEnd && semitones > 1 && semitones <= 6;
  const isSameTone = hasEnd && semitones === 0;
  const rootLabel = getIntervalShortNoteName(rootMidi, refPreferFlat);
  const endLabel = hasEnd ? getIntervalShortNoteName(endMidi, targetPreferFlat) : "";

  const whiteRects = [];
  const whiteDecor = [];
  whiteMidis.forEach((m, idx) => {
    const x = padX + idx * wkW;
    const cx = x + wkW / 2;
    let cls = "ikb-white";
    if (isSameTone && m === rootMidi) cls += ` is-same is-${variant}`;
    else if (m === rootMidi) cls += " is-root";
    else if (hasEnd && m === endMidi) cls += ` is-end is-${variant}`;
    else if (stepOrderByMidi.has(m)) cls += ` is-step is-${variant}`;

    whiteRects.push(
      `<rect class="${cls}" x="${x.toFixed(2)}" y="${kbTop}" width="${(wkW - 0.6).toFixed(2)}" height="${whiteH}" rx="3" />`
    );

    if (m === rootMidi) {
      whiteDecor.push(
        `<text class="ikb-key-lbl is-on-fill" x="${cx.toFixed(1)}" y="${kbTop + whiteH - 6}" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(rootLabel)}</text>`
      );
    } else if (hasEnd && m === endMidi) {
      whiteDecor.push(
        `<text class="ikb-key-lbl is-on-fill" x="${cx.toFixed(1)}" y="${kbTop + whiteH - 6}" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(endLabel)}</text>`
      );
    } else if (stepOrderByMidi.has(m)) {
      const stepNum = stepOrderByMidi.get(m);
      const cy = kbTop + whiteH - 9;
      if (showStepNumbers) {
        whiteDecor.push(`<circle class="ikb-step-dot is-${variant}" cx="${cx.toFixed(1)}" cy="${cy}" r="5.5" />`);
        whiteDecor.push(`<text class="ikb-step-num" x="${cx.toFixed(1)}" y="${cy + 2.8}" text-anchor="middle" font-family="Andika, sans-serif">${stepNum}</text>`);
      } else {
        whiteDecor.push(`<circle class="ikb-step-dot is-${variant}" cx="${cx.toFixed(1)}" cy="${cy}" r="3.2" />`);
      }
    }
  });

  const blackRects = [];
  const blackDecor = [];
  blackMidis.forEach(m => {
    const cx = keyCenterX.get(m);
    if (cx === undefined) return;
    const x = cx - bkW / 2;
    let cls = "ikb-black";
    if (isSameTone && m === rootMidi) cls += ` is-same is-${variant}`;
    else if (m === rootMidi) cls += " is-root";
    else if (hasEnd && m === endMidi) cls += ` is-end is-${variant}`;
    else if (stepOrderByMidi.has(m)) cls += ` is-step is-${variant}`;

    blackRects.push(
      `<rect class="${cls}" x="${x.toFixed(2)}" y="${kbTop}" width="${bkW.toFixed(2)}" height="${blackH}" rx="2.4" />`
    );

    if (m === rootMidi) {
      blackDecor.push(
        `<text class="ikb-key-lbl is-black-lbl is-on-fill" x="${cx.toFixed(1)}" y="${kbTop + blackH - 5}" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(rootLabel)}</text>`
      );
    } else if (hasEnd && m === endMidi) {
      blackDecor.push(
        `<text class="ikb-key-lbl is-black-lbl is-on-fill" x="${cx.toFixed(1)}" y="${kbTop + blackH - 5}" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(endLabel)}</text>`
      );
    } else if (stepOrderByMidi.has(m)) {
      const stepNum = stepOrderByMidi.get(m);
      const cy = kbTop + blackH - 8;
      if (showStepNumbers) {
        blackDecor.push(`<circle class="ikb-step-dot is-on-black is-${variant}" cx="${cx.toFixed(1)}" cy="${cy}" r="4.8" />`);
        blackDecor.push(`<text class="ikb-step-num is-on-black" x="${cx.toFixed(1)}" y="${cy + 2.6}" text-anchor="middle" font-family="Andika, sans-serif">${stepNum}</text>`);
      } else {
        blackDecor.push(`<circle class="ikb-step-dot is-on-black is-${variant}" cx="${cx.toFixed(1)}" cy="${cy}" r="2.8" />`);
      }
    }
  });

  const startX = keyCenterX.get(rootMidi) ?? (padX + totalW * 0.25);
  let arcMarkup = "";
  if (hasEnd) {
    const endX = keyCenterX.get(endMidi) ?? startX;
    arcMarkup = buildIntervalArcSvgMarkup({
      startX,
      endX,
      directionSign,
      badgeText,
      variant,
      showArrow
    });
  } else {
    // Anker- oder A/B-B-Zustand: markiert ausschließlich den Startton ohne irreführenden Ziel-Bogen
    arcMarkup = buildIntervalAnchorMarkerSvgMarkup({
      startX,
      badgeText: badgeText || `${tr("Start", "Start")}: ${rootLabel}`,
      variant: isCompareMystery ? "mystery" : "anchor"
    });
  }

  return `<svg class="interval-visual-svg is-keyboard" viewBox="0 0 320 76" role="img" aria-hidden="true">${arcMarkup}${whiteRects.join("")}${whiteDecor.join("")}${blackRects.join("")}${blackDecor.join("")}</svg>`;
}

function buildIntervalMiniFretboardSVG(params) {
  const rootMidi = params.rootMidi;
  const endMidi = params.endMidi !== undefined ? params.endMidi : null;
  const directionSign = params.directionSign !== undefined ? params.directionSign : 1;
  const refPreferFlat = Boolean(params.refPreferFlat);
  const targetPreferFlat = Boolean(params.targetPreferFlat);
  const variant = params.variant || "reveal";
  const badgeText = params.badgeText || "";
  const showArrow = params.showArrow !== false;
  const isAnchorOnly = Boolean(params.isAnchorOnly);
  const isCompareMystery = Boolean(params.isCompareMystery);

  const isDown = directionSign < 0;
  const hasEnd = !isAnchorOnly && !isCompareMystery && Number.isFinite(endMidi);
  const semitones = hasEnd ? Math.abs(endMidi - rootMidi) : 0;
  const maxFret = semitones > 12 ? Math.max(14, semitones) : 12;

  const startFret = isDown ? maxFret : 0;
  const endFret = hasEnd ? (isDown ? Math.max(0, startFret - semitones) : Math.min(maxFret, startFret + semitones)) : startFret;

  const boardX = 24;
  const boardY = 28;
  const boardW = 288;
  const boardH = 30;
  const fretCount = maxFret;
  const fretW = boardW / fretCount;
  const stringY = boardY + boardH / 2;

  const fretCenterX = (fretIdx) => {
    if (fretIdx <= 0) return boardX - 10;
    return boardX + (fretIdx - 0.5) * fretW;
  };

  const elements = [];
  // Griffbrett-Körper & Sattel
  elements.push(`<rect class="ifb-board" x="${boardX}" y="${boardY}" width="${boardW}" height="${boardH}" rx="4" />`);
  elements.push(`<rect class="ifb-nut" x="${boardX - 2.5}" y="${boardY - 1}" width="4" height="${boardH + 2}" rx="1.5" />`);

  // Bundstäbchen & klassische Punkt-Inlays (3, 5, 7, 9, 12)
  for (let f = 1; f <= fretCount; f++) {
    const wireX = boardX + f * fretW;
    if (f < fretCount) {
      elements.push(`<line class="ifb-wire" x1="${wireX.toFixed(1)}" y1="${boardY}" x2="${wireX.toFixed(1)}" y2="${boardY + boardH}" />`);
    }
    if (INTERVAL_HELP_FRET_INLAYS.has(f)) {
      const cx = fretCenterX(f);
      if (f === 12) {
        elements.push(`<circle class="ifb-inlay" cx="${cx.toFixed(1)}" cy="${(boardY + 8).toFixed(1)}" r="2" />`);
        elements.push(`<circle class="ifb-inlay" cx="${cx.toFixed(1)}" cy="${(boardY + boardH - 8).toFixed(1)}" r="2" />`);
      } else {
        elements.push(`<circle class="ifb-inlay" cx="${cx.toFixed(1)}" cy="${stringY.toFixed(1)}" r="2.3" />`);
      }
    }
  }

  // Saite
  elements.push(`<line class="ifb-string" x1="${boardX - 16}" y1="${stringY}" x2="${boardX + boardW}" y2="${stringY}" />`);

  // Markierter Sprung-Streifen auf der Saite
  const startX = fretCenterX(startFret);
  const endX = hasEnd ? fretCenterX(endFret) : startX;
  if (hasEnd && semitones > 0) {
    const spanLeft = Math.min(startX, endX);
    const spanW = Math.abs(endX - startX);
    elements.push(`<rect class="ifb-span is-${variant}" x="${spanLeft.toFixed(1)}" y="${(stringY - 5).toFixed(1)}" width="${spanW.toFixed(1)}" height="10" rx="5" />`);

    const stepDir = endFret > startFret ? 1 : -1;
    const showStepNumbers = semitones > 1 && semitones <= 6;
    for (let s = 1; s < semitones; s++) {
      const fx = fretCenterX(startFret + stepDir * s);
      if (showStepNumbers) {
        elements.push(`<circle class="ifb-step-dot is-${variant}" cx="${fx.toFixed(1)}" cy="${stringY}" r="5.2" />`);
        elements.push(`<text class="ifb-step-num" x="${fx.toFixed(1)}" y="${stringY + 2.8}" text-anchor="middle" font-family="Andika, sans-serif">${s}</text>`);
      } else {
        elements.push(`<circle class="ifb-step-dot is-${variant}" cx="${fx.toFixed(1)}" cy="${stringY}" r="2.8" />`);
      }
    }
  }

  // Start- und Ziel-Punkt
  const rootLabel = getIntervalShortNoteName(rootMidi, refPreferFlat);
  const endLabel = hasEnd ? getIntervalShortNoteName(endMidi, targetPreferFlat) : "";
  const isSameTone = hasEnd && semitones === 0;

  if (isSameTone) {
    elements.push(`<circle class="ifb-dot is-same is-${variant}" cx="${startX.toFixed(1)}" cy="${stringY}" r="8.5" />`);
    elements.push(`<text class="ifb-dot-lbl" x="${startX.toFixed(1)}" y="${stringY + 3.1}" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(rootLabel)}</text>`);
  } else {
    elements.push(`<circle class="ifb-dot is-root" cx="${startX.toFixed(1)}" cy="${stringY}" r="8.2" />`);
    elements.push(`<text class="ifb-dot-lbl" x="${startX.toFixed(1)}" y="${stringY + 3.1}" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(rootLabel)}</text>`);
    if (hasEnd) {
      elements.push(`<circle class="ifb-dot is-end is-${variant}" cx="${endX.toFixed(1)}" cy="${stringY}" r="8.2" />`);
      elements.push(`<text class="ifb-dot-lbl" x="${endX.toFixed(1)}" y="${stringY + 3.1}" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(endLabel)}</text>`);
    }
  }

  // Bundnummern darunter (0 .. maxFret)
  for (let f = 0; f <= fretCount; f++) {
    const cx = fretCenterX(f);
    const isHighlightNum = f === startFret || (hasEnd && f === endFret);
    elements.push(`<text class="ifb-fret-num${isHighlightNum ? " is-active" : ""}" x="${cx.toFixed(1)}" y="71.5" text-anchor="middle" font-family="Andika, sans-serif">${f}</text>`);
  }

  // Bogen oben
  let arcMarkup = "";
  if (hasEnd) {
    arcMarkup = buildIntervalArcSvgMarkup({
      startX,
      endX,
      directionSign,
      badgeText,
      variant,
      showArrow
    });
  } else {
    // Anker- oder A/B-B-Zustand: markiert ausschließlich den Startbund ohne irreführenden Ziel-Bogen
    arcMarkup = buildIntervalAnchorMarkerSvgMarkup({
      startX,
      badgeText: badgeText || `${tr("Start", "Start")}: ${rootLabel}`,
      variant: isCompareMystery ? "mystery" : "anchor"
    });
  }

  return `<svg class="interval-visual-svg is-fretboard" viewBox="0 0 320 76" role="img" aria-hidden="true">${arcMarkup}${elements.join("")}</svg>`;
}

function clearStageIntervalVisual() {
  const wrap = document.getElementById("stageIntervalVisual");
  const stageCard = document.getElementById("centralStageCard");
  if (wrap) {
    wrap.innerHTML = "";
    wrap.classList.add("hidden");
  }
  if (stageCard) {
    stageCard.classList.remove("has-interval-visual");
  }
}

function renderStageIntervalVisual(ex, options = {}) {
  const wrap = document.getElementById("stageIntervalVisual");
  const stageCard = document.getElementById("centralStageCard");
  if (!wrap || !stageCard) return false;

  const helpMode = getEffectiveIntervalDistanceHelp();
  if (!ex || !isIntervalRecognitionType(ex.type) || helpMode === "off" || state?.exam?.active) {
    clearStageIntervalVisual();
    return false;
  }

  const visualMode = options.mode || "anchor";
  // Harmonische Intervalle blenden den Grundton vor dem Tipp nicht ein (kein Spoiler)
  if (visualMode === "anchor" && ex.type === "interval-harmonic") {
    clearStageIntervalVisual();
    return false;
  }

  const rootMidi = Number.isFinite(ex.effectiveRootMidi) ? ex.effectiveRootMidi : ex.targetItem?.rootMidi;
  if (!Number.isFinite(rootMidi)) {
    clearStageIntervalVisual();
    return false;
  }

  const directionSign = ex.type === "interval-melodic-down" ? -1 : 1;
  const showArrow = ex.type !== "interval-harmonic";
  let endMidi = null;
  let targetPreferFlat = Boolean(ex.targetPreferFlat);
  let variant = "reveal";
  let badgeText = "";
  let isAnchorOnly = false;
  let isCompareMystery = false;

  if (visualMode === "anchor") {
    isAnchorOnly = true;
    variant = "anchor";
    const startName = getIntervalShortNoteName(rootMidi, Boolean(ex.refPreferFlat));
    badgeText = `${tr("Start", "Start")}: ${startName}`;
  } else if (visualMode === "wrong" || visualMode === "compare-a") {
    const chosen = options.chosenDef;
    if (!chosen || !Number.isFinite(Number(chosen.semitones))) {
      clearStageIntervalVisual();
      return false;
    }
    const chosenSemi = Math.max(0, Math.round(Number(chosen.semitones)));
    endMidi = rootMidi + directionSign * chosenSemi;
    targetPreferFlat = Boolean(ex.refPreferFlat || (typeof MINOR_INTERVAL_KEYS !== "undefined" && MINOR_INTERVAL_KEYS.has(chosen.key)));
    variant = "wrong";
    const signPrefix = chosenSemi === 0 ? "" : (directionSign < 0 ? "−" : "+");
    const distStr = `${signPrefix}${formatIntervalUnitCount(chosenSemi, helpMode, { compact: helpMode === "semitones" })}`;
    badgeText = tf("Dein Tipp: {dist}", "Your pick: {dist}", { dist: distStr });
  } else if (visualMode === "compare-b") {
    isCompareMystery = true;
    variant = "mystery";
    badgeText = tr("Gesucht (?)", "Target (?)");
  } else {
    // "reveal": vollständige Auflösung
    const targetSemi = Math.max(0, Math.round(Number(ex.targetItem?.semitones) || 0));
    endMidi = Number.isFinite(ex.targetMidi) ? ex.targetMidi : (rootMidi + directionSign * targetSemi);
    variant = "reveal";
    if (targetSemi === 0) {
      badgeText = tr("Gleicher Ton", "Same note");
    } else {
      const signPrefix = directionSign < 0 ? "−" : "+";
      badgeText = `${signPrefix}${formatIntervalUnitCount(targetSemi, helpMode, { compact: helpMode === "semitones" })}`;
    }
  }

  const svgParams = {
    rootMidi,
    endMidi,
    directionSign,
    refPreferFlat: Boolean(ex.refPreferFlat),
    targetPreferFlat,
    variant,
    badgeText,
    showArrow,
    isAnchorOnly,
    isCompareMystery
  };

  wrap.innerHTML = helpMode === "frets"
    ? buildIntervalMiniFretboardSVG(svgParams)
    : buildIntervalMiniKeyboardSVG(svgParams);
  wrap.classList.remove("hidden");
  stageCard.classList.add("has-interval-visual");
  return true;
}

// =====================================================
// LERNHILFEN FÜR AKKORDE, KADENZEN, TAKTARTEN & SOLFÈGE
// =====================================================
// Einheitlicher Schalter „Lernhilfen in Übungen“ (im Entdecker-Modus automatisch aktiv,
// in Prüfungen immer aus) + kompakter Chip im Modul-Header.

function isExerciseHintsSupportedType(exType) {
  return exType === "interval-chords"
    || exType === "chord-arp-up"
    || exType === "chord-arp-down"
    || exType === "cadence"
    || exType === "rhythm-meter"
    || exType === "solfege";
}

function isExerciseHintsActive(options = {}) {
  if (!options.ignoreExam && typeof state !== "undefined" && state?.exam?.active) {
    return false;
  }
  const p = typeof state !== "undefined" ? state?.profile : null;
  if (p?.exerciseHintsManual) {
    return Boolean(p.exerciseHints);
  }
  if (typeof isExplorerModeEnabled === "function" && isExplorerModeEnabled()) {
    return true;
  }
  return Boolean(p?.exerciseHints);
}

function setExerciseHintsPreference(enabled) {
  const next = Boolean(enabled);
  if (typeof state !== "undefined" && state?.profile) {
    state.profile.exerciseHints = next;
    state.profile.exerciseHintsManual = true;
    if (typeof saveUserProfile === "function") {
      saveUserProfile(state.profile);
    }
  }
  syncExerciseHintsSettingsUI();
  if (typeof state !== "undefined" && state?.currentExercise) {
    syncExerciseHintsChipUI(state.currentExercise);
  }
  if (typeof applyProfileDisplayChanges === "function") {
    applyProfileDisplayChanges();
  }
  if (typeof renderProfileAccountView === "function") {
    renderProfileAccountView();
  }
}

function syncExerciseHintsSettingsUI() {
  const active = isExerciseHintsActive({ ignoreExam: true });
  document.querySelectorAll("[data-exercise-hints]").forEach(btn => {
    const isMatch = (btn.dataset.exerciseHints === "on") === active;
    btn.classList.toggle("active", isMatch);
    btn.setAttribute("aria-pressed", String(isMatch));
  });
}

function syncExerciseHintsChipUI(ex) {
  const chipBtn = document.getElementById("exerciseHintsChipBtn");
  const isApplicable = Boolean(ex && isExerciseHintsSupportedType(ex.type) && !state?.exam?.active);
  if (!chipBtn) return;
  chipBtn.classList.toggle("hidden", !isApplicable);
  if (isApplicable) {
    const active = isExerciseHintsActive();
    chipBtn.textContent = active ? tr("Hilfe: An", "Help: On") : tr("Hilfe: Aus", "Help: Off");
    chipBtn.classList.toggle("btn-active", active);
    chipBtn.classList.toggle("click-muted", !active);
    chipBtn.setAttribute("aria-pressed", String(active));
  }
}

function getChordMoodHint(chordKey) {
  switch (chordKey) {
    case "maj":   return tr("Hell • Offen", "Bright • Open");
    case "min":   return tr("Weich • Warm", "Soft • Warm");
    case "dim":   return tr("Gespannt", "Tense");
    case "aug":   return tr("Schwebend", "Floating");
    case "sus4":  return tr("Wartend", "Waiting");
    case "sus2":  return tr("Luftig", "Airy");
    case "7":     return tr("Drängend", "Driving");
    case "maj7":  return tr("Verträumt", "Dreamy");
    case "m7":    return tr("Samtig", "Velvety");
    case "m7b5":  return tr("Düster", "Dark");
    case "dim7":  return tr("Dramatisch", "Dramatic");
    case "mMaj7": return tr("Geheimnisv.", "Mysterious");
    case "maj9":  return tr("Strahlend", "Radiant");
    case "7b9":   return tr("Würzig", "Spicy");
    case "7s9":   return tr("Jazzig", "Jazzy");
    default:      return "";
  }
}

function getCadenceFeelHint(degreeKey) {
  switch (degreeKey) {
    case "I":
    case "i":     return tr("Zuhause", "Home");
    case "IV":
    case "iv":    return tr("Aufbruch", "Lift-off");
    case "V":
    case "V7":
    case "v":     return tr("Spannung", "Tension");
    case "vi":    return tr("Weich", "Soft");
    case "III":   return tr("Hell", "Bright");
    case "ii":
    case "iio":
    case "ii7b5": return tr("Anlauf", "Step-up");
    case "iii":   return tr("Schwebend", "Floating");
    case "Vsus4": return tr("Wartend", "Waiting");
    case "bVI":
    case "VI":    return tr("Episch", "Epic");
    case "bVII":
    case "VII":   return tr("Rockig", "Rock");
    case "I7":    return tr("Bluesig", "Bluesy");
    case "Imaj7": return tr("Verträumt", "Dreamy");
    case "IV7":   return tr("Funky", "Funky");
    case "III7":
    case "V/V":   return tr("Zugkraft", "Pull");
    case "bII7":
    case "N6":    return tr("Dramatisch", "Dramatic");
    default:      return "";
  }
}

const METER_PULSE_PATTERNS = {
  "2/4": { dots: ["accent", "weak"], count: "1 – 2" },
  "3/4": { dots: ["accent", "weak", "weak"], count: "1 – 2 – 3" },
  "4/4": { dots: ["accent", "weak", "mid", "weak"], count: "1 – 2 – 3 – 4" },
  "6/8": { dots: ["accent", "weak", "weak", "gap", "mid", "weak", "weak"], count: "1-2-3 · 4-5-6" },
  "5/4": { dots: ["accent", "weak", "weak", "gap", "mid", "weak"], count: "1-2-3 · 4-5" },
  "7/8": { dots: ["accent", "weak", "gap", "mid", "weak", "gap", "mid", "weak", "weak"], count: "2 + 2 + 3" }
};

function getMeterPulsePattern(meterKey) {
  return METER_PULSE_PATTERNS[meterKey] || null;
}

function getPlainExercisePromptText(ex) {
  if (!ex) return "";
  if (ex.type === "interval-chords" || ex.type === "chord-arp-up" || ex.type === "chord-arp-down") {
    return tr("Welche Akkord-Farbe hörst du?", "Which chord color do you hear?");
  }
  if (ex.type === "cadence") {
    return tf("Wie fühlt sich Takt {bar} an?", "How does Bar {bar} feel?", { bar: (ex.targetIndex || 0) + 1 });
  }
  if (ex.type === "rhythm-meter") {
    return tr("Bis wie viel zählst du bis zur starken Eins?", "How high do you count to the next strong beat?");
  }
  if (ex.type === "solfege") {
    return tr("Wo sitzt der Ton? Do (1) ist dein Start-Anker:", "Where is the note? Do (1) is your home anchor:");
  }
  return "";
}

function formatExerciseHintRevealDescription(ex) {
  if (!ex || !ex.targetItem || !isExerciseHintsActive()) return "";
  if (ex.type === "interval-chords" || ex.type === "chord-arp-up" || ex.type === "chord-arp-down") {
    const mood = getChordMoodHint(ex.targetItem.key);
    return mood ? `${ex.targetItem.label} • ${mood}` : ex.targetItem.label;
  }
  if (ex.type === "cadence") {
    const feel = getCadenceFeelHint(ex.targetItem.key || ex.targetItem.roman);
    return feel ? `${ex.targetItem.label} • ${feel}` : ex.targetItem.label;
  }
  if (ex.type === "rhythm-meter") {
    const pat = getMeterPulsePattern(ex.targetItem.key);
    return pat
      ? tf("{label} • Zählen: {count}", "{label} • Count: {count}", { label: ex.targetItem.label, count: pat.count })
      : ex.targetItem.label;
  }
  return "";
}

function formatExerciseHintWrongFeedback(ex, chosenDef, fallbackKey = "") {
  if (!ex || !chosenDef || !isExerciseHintsActive() || state?.exam?.active) return "";
  const chosenKey = chosenDef.key || fallbackKey || "";
  if (ex.type === "interval-chords" || ex.type === "chord-arp-up" || ex.type === "chord-arp-down") {
    const mood = getChordMoodHint(chosenKey);
    if (!mood) return "";
    return tf("Gewählt: {lbl} ({hint}).", "Selected: {lbl} ({hint}).", {
      lbl: chosenDef.short || chosenDef.label || chosenDef.symbol || "?",
      hint: mood
    });
  }
  if (ex.type === "cadence") {
    const feel = getCadenceFeelHint(chosenKey || chosenDef.roman);
    if (!feel) return "";
    return tf("Gewählt: {lbl} ({hint}).", "Selected: {lbl} ({hint}).", {
      lbl: `${chosenDef.roman || chosenDef.symbol || "?"} ${chosenDef.short || ""}`.trim(),
      hint: feel
    });
  }
  if (ex.type === "rhythm-meter") {
    const pat = getMeterPulsePattern(chosenKey);
    if (!pat) return "";
    return tf("Gewählt: {lbl} ({hint}).", "Selected: {lbl} ({hint}).", {
      lbl: chosenDef.symbol || chosenDef.short || "?",
      hint: pat.count
    });
  }
  return "";
}

function getSolfegeDegreeBadgeText(semitoneOffset, tonality = "major") {
  const off = Number(semitoneOffset);
  if (!Number.isFinite(off)) return "";
  if (off === 0) return "1";
  if (off === 12) return "8";
  const pc = ((off % 12) + 12) % 12;
  if (tonality === "minor") {
    switch (pc) {
      case 0:  return "1";
      case 2:  return "2";
      case 3:  return "♭3";
      case 5:  return "4";
      case 7:  return "5";
      case 8:  return "♭6";
      case 10: return "♭7";
      default: return "";
    }
  }
  switch (pc) {
    case 0:  return "1";
    case 2:  return "2";
    case 4:  return "3";
    case 5:  return "4";
    case 7:  return "5";
    case 9:  return "6";
    case 11: return "7";
    default: return "";
  }
}

function getSolfegeWrongDirectionInfo(clickedMidi, targetMidi, ex = null) {
  if (!isExerciseHintsActive() || state?.exam?.active) return null;
  if (!Number.isFinite(clickedMidi) || !Number.isFinite(targetMidi)) return null;

  // Bei Ziel „Do“ die nähere Oktave (unteres oder oberes Do) als Referenz nehmen,
  // damit Richtung & Nähe immer fair bleiben.
  let effectiveTargetMidi = targetMidi;
  if (ex?.targetItem?.syllable === "Do" && Number.isFinite(ex.rootMidi)) {
    const lowDo = ex.rootMidi;
    const highDo = ex.rootMidi + 12;
    const activeSet = Array.isArray(ex.activeSemitones) ? new Set(ex.activeSemitones) : null;
    const candidates = [];
    if (!activeSet || activeSet.has(0)) candidates.push(lowDo);
    if (!activeSet || activeSet.has(12)) candidates.push(highDo);
    if (candidates.length > 0) {
      candidates.sort((a, b) => Math.abs(a - clickedMidi) - Math.abs(b - clickedMidi));
      effectiveTargetMidi = candidates[0];
    }
  }

  if (clickedMidi === effectiveTargetMidi) return null;
  const direction = effectiveTargetMidi > clickedMidi ? 1 : -1;

  // Abstand in Tonleiter-Stufen ermitteln (ohne die exakte Zahl als Rechen-Spoiler zu verraten)
  let stepDiff = Math.abs(effectiveTargetMidi - clickedMidi) <= 2 ? 1 : 2;
  if (ex && Number.isFinite(ex.rootMidi) && typeof getSolfegeScaleSteps === "function") {
    const steps = getSolfegeScaleSteps(ex.tonality || "major");
    const clickedIdx = steps.findIndex(st => ex.rootMidi + st.semitones === clickedMidi);
    const targetIdx = steps.findIndex(st => ex.rootMidi + st.semitones === effectiveTargetMidi);
    if (clickedIdx >= 0 && targetIdx >= 0) {
      stepDiff = Math.abs(targetIdx - clickedIdx);
    }
  }

  const isClose = stepDiff <= 1;
  let text = "";
  if (direction > 0) {
    text = isClose
      ? tr("Ganz nah – etwas höher (weiter rechts).", "Very close — a bit higher (to the right).")
      : tr("Zu tief – deutlich höher (weiter rechts).", "Too low — noticeably higher (to the right).");
  } else {
    text = isClose
      ? tr("Ganz nah – etwas tiefer (weiter links).", "Very close — a bit lower (to the left).")
      : tr("Zu hoch – deutlich tiefer (weiter links).", "Too high — noticeably lower (to the left).");
  }
  return { direction, isClose, stepDiff, text };
}

function getSolfegeWrongDirectionHint(clickedMidi, targetMidi, ex = null) {
  const info = getSolfegeWrongDirectionInfo(clickedMidi, targetMidi, ex);
  return info ? info.text : "";
}

// ---------- MINI-KLAVIATUR FÜR AKKORDE (SVG) ----------

function buildChordMiniKeyboardSVG(params) {
  const rootMidi = params.rootMidi;
  const offsets = Array.isArray(params.offsets) && params.offsets.length > 0 ? params.offsets : [0];
  const preferFlat = Boolean(params.preferFlat);
  const variant = params.variant || "reveal";
  const badgeText = params.badgeText || "";
  const isCompareMystery = Boolean(params.isCompareMystery);

  const chordMidis = isCompareMystery ? [rootMidi] : offsets.map(off => rootMidi + off);
  const chordSet = new Set(chordMidis);
  const minMidi = Math.min(...chordMidis);
  const maxMidi = Math.max(...chordMidis);

  let winStart = minMidi;
  if (isBlackMidiPitch(winStart)) winStart -= 1;
  let winEnd = Math.max(maxMidi, winStart + 12);
  if (isBlackMidiPitch(winEnd)) winEnd += 1;

  const whiteMidis = [];
  const blackMidis = [];
  for (let m = winStart; m <= winEnd; m++) {
    if (isBlackMidiPitch(m)) blackMidis.push(m);
    else whiteMidis.push(m);
  }

  const padX = 4;
  const totalW = 312;
  const kbTop = 26;
  const whiteH = 46;
  const blackH = 28;
  const wkW = totalW / Math.max(1, whiteMidis.length);
  const bkW = wkW * 0.62;

  const whiteIndexByMidi = new Map();
  const keyCenterX = new Map();
  whiteMidis.forEach((m, idx) => {
    whiteIndexByMidi.set(m, idx);
    keyCenterX.set(m, padX + (idx + 0.5) * wkW);
  });
  blackMidis.forEach(m => {
    const prevIdx = whiteIndexByMidi.get(m - 1);
    if (prevIdx !== undefined) {
      keyCenterX.set(m, padX + (prevIdx + 1) * wkW);
    }
  });

  const whiteRects = [];
  const whiteDecor = [];
  whiteMidis.forEach((m, idx) => {
    const x = padX + idx * wkW;
    const cx = x + wkW / 2;
    let cls = "ikb-white";
    const isRoot = m === rootMidi;
    const isChordTone = !isRoot && chordSet.has(m);
    if (isRoot) cls += " is-root";
    else if (isChordTone) cls += ` is-end is-${variant}`;

    whiteRects.push(
      `<rect class="${cls}" x="${x.toFixed(2)}" y="${kbTop}" width="${(wkW - 0.6).toFixed(2)}" height="${whiteH}" rx="3" />`
    );

    if (isRoot || isChordTone) {
      const lbl = getIntervalShortNoteName(m, preferFlat);
      whiteDecor.push(
        `<text class="ikb-key-lbl is-on-fill" x="${cx.toFixed(1)}" y="${kbTop + whiteH - 6}" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(lbl)}</text>`
      );
    }
  });

  const blackRects = [];
  const blackDecor = [];
  blackMidis.forEach(m => {
    const cx = keyCenterX.get(m);
    if (cx === undefined) return;
    const x = cx - bkW / 2;
    let cls = "ikb-black";
    const isRoot = m === rootMidi;
    const isChordTone = !isRoot && chordSet.has(m);
    if (isRoot) cls += " is-root";
    else if (isChordTone) cls += ` is-end is-${variant}`;

    blackRects.push(
      `<rect class="${cls}" x="${x.toFixed(2)}" y="${kbTop}" width="${bkW.toFixed(2)}" height="${blackH}" rx="2.4" />`
    );

    if (isRoot || isChordTone) {
      const lbl = getIntervalShortNoteName(m, preferFlat);
      blackDecor.push(
        `<text class="ikb-key-lbl is-black-lbl is-on-fill" x="${cx.toFixed(1)}" y="${kbTop + blackH - 5}" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(lbl)}</text>`
      );
    }
  });

  // Oben zentriertes Akkord-Pill (oder Start-Anker bei A/B Phase B)
  let topMarkup = "";
  const rootX = keyCenterX.get(rootMidi) ?? (padX + totalW * 0.25);
  if (isCompareMystery) {
    topMarkup = buildIntervalAnchorMarkerSvgMarkup({
      startX: rootX,
      badgeText: badgeText || tr("Gesucht (?)", "Target (?)"),
      variant: "mystery"
    });
  } else {
    const endX = keyCenterX.get(maxMidi) ?? rootX;
    const midX = (rootX + endX) / 2;
    const pillW = Math.max(66, Math.min(250, badgeText.length * 6.0 + 18));
    const pillX = Math.max(4, Math.min(316 - pillW, midX - pillW / 2));
    topMarkup = `
      <line class="ivis-chord-bracket is-${variant}" x1="${rootX.toFixed(1)}" y1="22.5" x2="${endX.toFixed(1)}" y2="22.5" />
      <rect class="ivis-pill is-${variant}" x="${pillX.toFixed(1)}" y="1.5" width="${pillW.toFixed(1)}" height="15.5" rx="7.75" />
      <text class="ivis-pill-text is-${variant}" x="${(pillX + pillW / 2).toFixed(1)}" y="12.2" text-anchor="middle" font-family="Andika, sans-serif">${escapeIntervalSvgText(badgeText)}</text>
    `;
  }

  return `<svg class="interval-visual-svg is-keyboard is-chord-kb" viewBox="0 0 320 76" role="img" aria-hidden="true">${topMarkup}${whiteRects.join("")}${whiteDecor.join("")}${blackRects.join("")}${blackDecor.join("")}</svg>`;
}

function renderStageChordVisual(ex, options = {}) {
  const wrap = document.getElementById("stageIntervalVisual");
  const stageCard = document.getElementById("centralStageCard");
  if (!wrap || !stageCard) return false;

  const isChordEx = ex && (ex.type === "interval-chords" || ex.type === "chord-arp-up" || ex.type === "chord-arp-down");
  if (!isChordEx || !isExerciseHintsActive() || state?.exam?.active) {
    return false;
  }

  const rootMidi = ex.targetItem?.rootMidi;
  if (!Number.isFinite(rootMidi)) return false;

  const visualMode = options.mode || "reveal";
  const preferFlat = typeof FLAT_KEYS !== "undefined" && FLAT_KEYS.has(ex.rootKey || state?.currentKey);

  let offsets = Array.isArray(ex.targetItem?.offsets) ? ex.targetItem.offsets : (ex.offsets || [0, 4, 7]);
  let variant = "reveal";
  let badgeText = "";
  let isCompareMystery = false;

  if (visualMode === "wrong" || visualMode === "compare-a") {
    const chosen = options.chosenDef;
    if (!chosen || !Array.isArray(chosen.offsets)) return false;
    offsets = chosen.offsets;
    variant = "wrong";
    const noteNames = offsets.map(o => getIntervalShortNoteName(rootMidi + o, preferFlat || (chosen.key === "min" || chosen.key === "dim" || chosen.key === "m7" || chosen.key === "m7b5" || chosen.key === "dim7"))).join(" · ");
    badgeText = tf("Dein Tipp: {dist}", "Your pick: {dist}", { dist: `${chosen.short || chosen.symbol} (${noteNames})` });
  } else if (visualMode === "compare-b") {
    isCompareMystery = true;
    variant = "mystery";
    badgeText = tr("Gesucht (?)", "Target (?)");
  } else {
    const targetKey = ex.targetItem?.key || "";
    const minorish = targetKey === "min" || targetKey === "dim" || targetKey === "m7" || targetKey === "m7b5" || targetKey === "dim7" || targetKey === "7" || targetKey === "7b9";
    const noteNames = offsets.map(o => getIntervalShortNoteName(rootMidi + o, preferFlat || minorish)).join(" · ");
    badgeText = `${ex.targetItem?.short || ex.targetItem?.symbol || ""} • ${noteNames}`;
    variant = "reveal";
  }

  const useFlatForKeys = preferFlat || (variant === "reveal"
    ? ["min", "dim", "m7", "m7b5", "dim7", "7", "7b9"].includes(ex.targetItem?.key)
    : ["min", "dim", "m7", "m7b5", "dim7", "7", "7b9"].includes(options.chosenDef?.key));

  wrap.innerHTML = buildChordMiniKeyboardSVG({
    rootMidi,
    offsets,
    preferFlat: useFlatForKeys,
    variant,
    badgeText,
    isCompareMystery
  });
  wrap.classList.remove("hidden");
  stageCard.classList.add("has-interval-visual");
  return true;
}
