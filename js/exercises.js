/**
 * Lauscher • Übungs-UI, Klaviaturen, Melodie-Notensystem, Mitsingen, renderUI & Antwort-Kacheln
 */

/**
 * Einheitliche Klaviatur-Geometrie für alle Übungen mit Klaviatur-Eingabe (Solfège, Melodie, Notenlesen):
 * - Alle regulären weißen Tasten besitzen exakt dieselbe Breite (Gewicht 1.0).
 * - Beide äußeren inaktiven Rahmentasten sind einheitlich schmaler (ca. 1/3 einer Taste statt 1/2),
 *   lassen aber genügend Raum, damit angrenzende schwarze Tasten nie am Rand abgeschnitten werden.
 * - Bei Tonarten auf schwarzen Tasten (Des, Es, Fis, As, B) bleiben die weißen Träger-Tasten
 *   links und rechts der beiden Do-Tasten volle weiße Tasten.
 */
const PIANO_FRAME_KEY_WEIGHT = 0.36;
const PIANO_BLACK_KEY_RATIO = 0.62;

function applyPianoKeyboardGeometry(whiteKeyEls, whiteKeys, blackKeyEls, blackKeys) {
  const weights = whiteKeys.map(wk => (wk.isFrame ? PIANO_FRAME_KEY_WEIGHT : 1));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0) || 1;
  const cumWeights = [];
  let runningWeight = 0;

  weights.forEach((w, idx) => {
    runningWeight += w;
    cumWeights.push(runningWeight);
    const el = whiteKeyEls[idx];
    if (el) {
      el.style.flex = "0 0 auto";
      el.style.width = `${(w / totalWeight) * 100}%`;
      el.classList.toggle("is-last-white", idx === whiteKeys.length - 1);
    }
  });

  const blackWidthPct = (100 / totalWeight) * PIANO_BLACK_KEY_RATIO;
  blackKeys.forEach((bk, idx) => {
    const blackEl = blackKeyEls[idx];
    if (!blackEl) return;
    const k = bk.afterWhiteIdx;
    blackEl.style.left = `${(cumWeights[k] / totalWeight) * 100}%`;
    blackEl.style.width = `${blackWidthPct}%`;
  });
}

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
  const firstWhite = 59; // H3 / B3 als schmale linke Rahmentaste
  const lastWhite = 72;  // C5 als schmale rechte Rahmentaste
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
  const whiteKeyEls = [];
  const blackKeyEls = [];

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
      keyBtn.tabIndex = -1;
      keyBtn.setAttribute("aria-disabled", "true");
    }

    whiteKeyEls.push(keyBtn);
    kb.appendChild(keyBtn);
  });

  blackKeys.forEach(bk => {
    const blackEl = document.createElement("button");
    blackEl.type = "button";
    blackEl.className = "piano-black-key notation-black-active";
    blackEl.id = `solfegeKey_${bk.midi}`;
    blackEl.dataset.midi = bk.midi;
    blackEl.dataset.pc = bk.pc;

    if (showBlackLabels && bk.noteLabel) {
      const box = document.createElement("span");
      box.className = "solfege-key-box solfege-key-box-black notation-key-box-black";
      box.textContent = bk.noteLabel;
      blackEl.appendChild(box);
    }
    blackEl.addEventListener("click", (e) => handleNotationKeyClick(bk, blackEl, { inputEvent: e }));
    blackKeyEls.push(blackEl);
    kb.appendChild(blackEl);
  });

  applyPianoKeyboardGeometry(whiteKeyEls, whiteKeys, blackKeyEls, blackKeys);

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

  const { firstWhite, lastWhite } = getSolfegeKeyboardBounds(rootMidi);

  // Zuordnung der 8 Tonleiter-Töne (Dur: Do–Ti–Do, Moll: Do–Re–Me–Fa–Sol–Le–Te–Do) in dieser Oktave
  const scaleSteps = getSolfegeScaleSteps(state.currentExercise?.tonality || "major");
  const allScaleEntries = scaleSteps.map(st => [rootMidi + st.semitones, st.syllable]);
  const activeOffsets = Array.isArray(state.currentExercise?.activeSemitones)
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
  const whiteKeyEls = [];
  const blackKeyEls = [];

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

    whiteKeyEls.push(keyBtn);
    kb.appendChild(keyBtn);
  });

  blackKeys.forEach(bk => {
    const blackEl = document.createElement(bk.inScale ? "button" : "div");
    if (bk.inScale) blackEl.type = "button";
    blackEl.className = `piano-black-key ${bk.inScale ? "key-in-scale" : "key-out-of-scale"}`;
    blackEl.id = `solfegeKey_${bk.midi}`;
    blackEl.dataset.midi = bk.midi;
    if (bk.syllable) blackEl.dataset.syllable = bk.syllable;

    if (bk.inScale && bk.syllable) {
      const box = document.createElement("span");
      box.className = "solfege-key-box solfege-key-box-black";
      box.textContent = getSolfegeDisplayLabel(bk.syllable);
      blackEl.appendChild(box);
      blackEl.addEventListener("click", (e) => onKeyboardKeyClick(bk, blackEl, { inputEvent: e }));
    }

    blackKeyEls.push(blackEl);
    kb.appendChild(blackEl);
  });

  applyPianoKeyboardGeometry(whiteKeyEls, whiteKeys, blackKeyEls, blackKeys);

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
    return `${restChip}<span class="melody-rhythm-chip is-mystery">?</span>`;
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

// ---------- MELODIE IM NOTENSYSTEM ----------
// Die Aufgabe steht als echtes Notensystem (Schlüssel, Tonart, Taktart, Taktstriche) im oberen Modul.
// Ungelöste Töne verraten keine Tonhöhe: Sie stehen als Rhythmus-Notenköpfe (Schrägstrich) auf der
// Mittellinie – im Diktat sogar ohne Hals, bis der Notenwert gelöst ist. Erst gelöste Töne rücken an
// ihre echte Position, darunter erscheint die Solfège-Silbe.
const MELODY_DEGREE_INDEX = { Do_low: 0, Re: 1, Mi: 2, Fa: 3, Sol: 4, La: 5, Ti: 6, Do_high: 7 };
const MELODY_SYLLABLE_DEGREE = { Do: 0, Re: 1, Mi: 2, Fa: 3, Sol: 4, So: 4, La: 5, Ti: 6, Si: 6 };
const MELODY_STAFF_WIDTH = 360;

// Tonhöhe tonartgerecht buchstabieren (Stufe → Notenname) und im gewählten Schlüssel verorten
function spellMelodyPitch(midi, degreeIdx, keyCode, clefId = "treble") {
  const keySig = normalizeNotationKeySigId(keyCode || "C");
  const tonicLetter = String(keyCode || "C").charAt(0).toUpperCase();
  let letter;
  let acc;
  if (Number.isFinite(degreeIdx) && NOTATION_LETTERS.includes(tonicLetter)) {
    letter = NOTATION_LETTERS[(NOTATION_LETTERS.indexOf(tonicLetter) + degreeIdx) % 7];
    acc = getKeySignatureAccidentalForLetter(keySig, letter);
  } else {
    const pc = ((midi % 12) + 12) % 12;
    const natural = NOTATION_LETTERS.find(l => NOTATION_LETTER_PC[l] === pc);
    if (natural) {
      letter = natural;
      acc = 0;
    } else {
      const flatKey = getKeySignatureDef(keySig).type === "flat";
      letter = NOTATION_LETTERS.find(l => NOTATION_LETTER_PC[l] === (flatKey ? (pc + 1) % 12 : (pc + 11) % 12));
      acc = flatKey ? -1 : 1;
    }
  }
  const octave = Math.round((midi - acc - NOTATION_LETTER_PC[letter]) / 12) - 1;
  const clef = NOTATION_CLEFS[clefId] || NOTATION_CLEFS.treble;
  const diatonicIndex = octave * 7 + NOTATION_LETTERS.indexOf(letter);
  const staffStep = clef.anchorStep + (diatonicIndex - clef.anchorDiatonicIndex);
  return getNotationNoteFromStaffStep(clef.id, staffStep, acc, keySig);
}

// Violin- oder Bassschlüssel – je nachdem, wo die Melodie mit weniger Hilfslinien auskommt
function pickMelodyClef(ex) {
  const slots = ex?.melodySlots || [];
  if (!slots.length) return "treble";
  const worst = (clefId) => Math.max(...slots.map(sl => {
    const it = spellMelodyPitch(sl.playedMidi, MELODY_DEGREE_INDEX[sl.key], ex.keyCode, clefId);
    const rawStep = it.staffStep;
    return it.ledgerCount + ((rawStep <= -7 || rawStep >= 15) ? 9 : 0);
  }));
  return worst("bass") < worst("treble") ? "bass" : "treble";
}

// Was zeigt ein Ton gerade? (Übung, Prüfung blind/mit Feedback)
function getMelodySlotView(ex, slot, idx) {
  const isDictation = ex.melodyStyle === "dictation";
  const exam = state.exam?.active ? state.exam : null;
  const isCurrent = !state.melodyCompleted && idx === (ex.melodyStep || 0);
  const octaveShift = (Number(slot.playedMidi) || 0) - (Number(slot.midi) || 0);
  const view = { midi: null, degree: null, rhythmKey: null, tone: "pending", label: "" };

  if (exam) {
    const chosenDegree = MELODY_SYLLABLE_DEGREE[slot.examChosenSyllable || slot.examPendingSyllable];
    if (slot.examAnswered && exam.feedbackMode === "blind") {
      if (Number.isFinite(slot.examPendingMidi)) {
        view.midi = slot.examPendingMidi + octaveShift;
        view.degree = chosenDegree;
      }
      view.rhythmKey = slot.examChosenRhythm || slot.rhythmKey;
      view.tone = "recorded";
      view.label = getSolfegeDisplayLabel(slot.examChosenSyllable || "?");
    } else if (slot.examAnswered) {
      view.midi = slot.playedMidi;
      view.degree = MELODY_DEGREE_INDEX[slot.key];
      view.rhythmKey = slot.rhythmKey;
      view.tone = slot.examCorrect ? "solved" : "wrong";
      view.label = getSolfegeDisplayLabel(slot.syllable);
    } else {
      if (Number.isFinite(slot.examPendingMidi)) {
        view.midi = slot.examPendingMidi + octaveShift;
        view.degree = chosenDegree;
        view.label = getSolfegeDisplayLabel(slot.examPendingSyllable);
      }
      view.rhythmKey = isDictation ? (slot.examPendingRhythm || null) : slot.rhythmKey;
      view.tone = isCurrent ? "current" : "pending";
    }
    return view;
  }

  if (slot.pitchSolved || slot.solved) {
    view.midi = slot.playedMidi;
    view.degree = MELODY_DEGREE_INDEX[slot.key];
    view.label = getSolfegeDisplayLabel(slot.syllable);
  }
  if (!isDictation || slot.rhythmSolved || slot.solved) view.rhythmKey = slot.rhythmKey;
  view.tone = slot.solved ? "solved" : (isCurrent ? "current" : "pending");
  return view;
}

function buildMelodyRestGlyphSVG(beats, x) {
  if (beats >= 2) {
    return `<rect x="${(x - 7).toFixed(1)}" y="82" width="14" height="6" fill="currentColor"/>`;
  }
  if (beats <= 0.5) {
    return `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <circle cx="${(x - 3).toFixed(1)}" cy="82" r="2.4" fill="currentColor" stroke="none"/>
      <path d="M${(x - 3).toFixed(1)} 83.5 C${(x + 0.5).toFixed(1)} 84.5, ${(x + 3).toFixed(1)} 83, ${(x + 4).toFixed(1)} 80 L${(x - 1).toFixed(1)} 99"/>
    </g>`;
  }
  return `<path d="M${(x - 2.5).toFixed(1)} 74 L${(x + 3.5).toFixed(1)} 81.5 L${(x - 2).toFixed(1)} 88 L${(x + 3.5).toFixed(1)} 95 C${(x - 2.5).toFixed(1)} 93.5, ${(x - 4).toFixed(1)} 98.5, ${(x + 0.5).toFixed(1)} 102.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
}

// Ein Ton: Notenkopf (oval an echter Höhe oder Schrägstrich auf der Mittellinie), Hals, Fähnchen, Punkt
function buildMelodyNoteGlyphSVG(view, x, clefId, keyCode, opts = {}) {
  const pitchKnown = Number.isFinite(view.midi);
  const item = pitchKnown ? spellMelodyPitch(view.midi, view.degree, keyCode, clefId) : null;
  const step = item ? item.staffStep : 4;
  const y = notationStepToY(step);
  const rk = view.rhythmKey;
  const hollow = rk === "half";
  let html = "";
  let minY = y - 7;
  let maxY = y + 7;

  if (item) {
    getLedgerLinesForStep(step).forEach(ls => {
      const ly = notationStepToY(ls);
      html += `<line class="notation-ledger-line" x1="${(x - 12).toFixed(1)}" y1="${ly}" x2="${(x + 12).toFixed(1)}" y2="${ly}"/>`;
    });
    if (item.shownAccidental) {
      html += getNotationAccidentalGlyphSVG(item.shownAccidental, x - 14.5, y);
    }
    html += hollow
      ? `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6.6" ry="4.6" transform="rotate(-18 ${x.toFixed(1)} ${y.toFixed(1)})" fill="none" stroke="currentColor" stroke-width="2.1"/>`
      : `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="7.0" ry="5.1" transform="rotate(-18 ${x.toFixed(1)} ${y.toFixed(1)})" fill="currentColor"/>`;
  } else if (hollow) {
    html += `<path d="M${(x - 8).toFixed(1)} ${y + 3.5} L${(x + 2.5).toFixed(1)} ${y - 7} L${(x + 8).toFixed(1)} ${y - 3.5} L${(x - 2.5).toFixed(1)} ${y + 7} Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`;
  } else {
    html += `<path d="M${(x - 8).toFixed(1)} ${y + 3.5} L${(x + 2.5).toFixed(1)} ${y - 7} L${(x + 8).toFixed(1)} ${y - 3.5} L${(x - 2.5).toFixed(1)} ${y + 7} Z" fill="currentColor"${rk ? "" : ' opacity="0.55"'}/>`;
  }

  if (rk) {
    const stemUp = opts.stemUp !== undefined ? opts.stemUp : (!item || step < 4);
    const stemX = stemUp ? x + (item ? 6.3 : 7.4) : x - 6.3;
    const tipY = opts.tipY !== undefined ? opts.tipY : (stemUp ? y - 28 : y + 28);
    html += `<line x1="${stemX.toFixed(1)}" y1="${(stemUp ? y - 1 : y + 1).toFixed(1)}" x2="${stemX.toFixed(1)}" y2="${tipY.toFixed(1)}" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`;
    minY = Math.min(minY, tipY - 1);
    maxY = Math.max(maxY, tipY + 1);
    if (rk === "eighth" && !opts.beamed) {
      html += stemUp
        ? `<path d="M${stemX.toFixed(1)} ${tipY.toFixed(1)} C${(stemX + 1).toFixed(1)} ${(tipY + 7).toFixed(1)}, ${(stemX + 10).toFixed(1)} ${(tipY + 9).toFixed(1)}, ${(stemX + 6).toFixed(1)} ${(tipY + 19).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`
        : `<path d="M${stemX.toFixed(1)} ${tipY.toFixed(1)} C${(stemX + 1).toFixed(1)} ${(tipY - 7).toFixed(1)}, ${(stemX + 10).toFixed(1)} ${(tipY - 9).toFixed(1)}, ${(stemX + 6).toFixed(1)} ${(tipY - 19).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`;
    }
    if (rk === "dottedQuarter") {
      const dotY = step % 2 === 0 ? y - 3 : y;
      html += `<circle cx="${(x + 11.5).toFixed(1)}" cy="${dotY.toFixed(1)}" r="2.1" fill="currentColor"/>`;
    }
  }
  return { html, minY, maxY, y, step, stemX: rk ? (opts.stemUp !== undefined ? (opts.stemUp ? x + 6.3 : x - 6.3) : null) : null };
}

function buildMelodyStaffSVG(ex) {
  const slots = ex.melodySlots || [];
  const clefId = ex.melodyClef || (ex.melodyClef = pickMelodyClef(ex));
  const keyCode = ex.keyCode || "C";
  const keySig = normalizeNotationKeySigId(keyCode);
  const bpb = ex.beatsPerBar || 4;
  const [meterTop, meterBottom] = String(ex.meterKey || "4/4").split("/");
  const width = MELODY_STAFF_WIDTH;
  const startX = 6;
  const endX = width - 6;

  const sigItems = getNotationKeySignatureSteps(clefId, keySig);
  const sigPitch = sigItems.length > 4 ? 9.5 : 10.5;
  const sigStartX = startX + 44;
  const sigHtml = sigItems.map((ks, i) =>
    getNotationAccidentalGlyphSVG(ks.accidental, sigStartX + i * sigPitch, notationStepToY(ks.staffStep), 0.88)
  ).join("");
  const sigRight = sigItems.length ? sigStartX + (sigItems.length - 1) * sigPitch + 8 : startX + 40;
  const timeX = sigRight + 11;
  const timeHtml = `<g class="melody-time-sig" font-family="Andika, sans-serif" font-weight="700" font-size="21" text-anchor="middle" fill="currentColor">
      <text x="${timeX}" y="83.5">${escapeHtml(meterTop || "4")}</text>
      <text x="${timeX}" y="107.5">${escapeHtml(meterBottom || "4")}</text>
    </g>`;

  // Ereignisfolge: Pausen, Noten, Taktstriche
  const items = [];
  let curBar = 0;
  slots.forEach((slot, idx) => {
    const view = getMelodySlotView(ex, slot, idx);
    const restBeats = Number(slot.restBeforeBeats) || 0;
    const events = [];
    if (restBeats > 0 && view.rhythmKey) {
      events.push({ type: "rest", beats: restBeats, offset: (Number(slot.beatOffset) || 0) - restBeats });
    }
    events.push({ type: "note", idx, slot, view, offset: Number(slot.beatOffset) || 0 });
    events.forEach(ev => {
      const bar = Math.floor((ev.offset + 0.001) / bpb);
      if (bar > curBar) {
        items.push({ type: "bar" });
        curBar = bar;
      }
      items.push(ev);
    });
  });

  const weight = { note: 1, rest: 0.72, bar: 0.42 };
  const contentStart = timeX + 18;
  const contentEnd = endX - 14;
  const totalW = items.reduce((sum, it) => sum + weight[it.type], 0) || 1;
  const unit = (contentEnd - contentStart) / totalW;
  let cursor = contentStart;
  items.forEach(it => {
    it.x = cursor + (unit * weight[it.type]) / 2;
    cursor += unit * weight[it.type];
  });

  // Achtelpaare innerhalb eines Schlags balken (nur wenn beide Notenwerte bekannt sind)
  const beamPairs = new Map();
  for (let i = 0; i < items.length - 1; i++) {
    const a = items[i];
    const b = items[i + 1];
    if (a.type !== "note" || b.type !== "note") continue;
    if (a.view.rhythmKey !== "eighth" || b.view.rhythmKey !== "eighth") continue;
    if (Math.abs(a.offset - Math.round(a.offset)) > 0.01 || Math.abs(b.offset - a.offset - 0.5) > 0.01) continue;
    if (beamPairs.has(a.idx) || beamPairs.has(b.idx)) continue;
    beamPairs.set(a.idx, b);
    beamPairs.set(b.idx, a);
  }

  let inkMinY = clefId === "bass" ? 60 : 44;
  let inkMaxY = clefId === "bass" ? 116 : 132;
  sigItems.forEach(ks => {
    const ky = notationStepToY(ks.staffStep);
    inkMinY = Math.min(inkMinY, ks.accidental === -1 ? (ky - 14) : (ky - 10));
    inkMaxY = Math.max(inkMaxY, ky + 9);
  });
  const labelEntries = [];
  let labelBaseline = 132;
  const noteHtml = items.map(it => {
    if (it.type === "bar") {
      return `<line class="melody-barline" x1="${it.x.toFixed(1)}" y1="64" x2="${it.x.toFixed(1)}" y2="112" stroke="currentColor" stroke-width="1.4"/>`;
    }
    if (it.type === "rest") {
      return `<g class="melody-staff-rest">${buildMelodyRestGlyphSVG(it.beats, it.x)}</g>`;
    }
    const partner = beamPairs.get(it.idx);
    let opts = {};
    let beamHtml = "";
    if (partner) {
      const first = partner.idx > it.idx ? it : partner;
      const second = first === it ? partner : it;
      const stepOf = (n) => Number.isFinite(n.view.midi)
        ? spellMelodyPitch(n.view.midi, n.view.degree, keyCode, clefId).staffStep
        : 4;
      const s1 = stepOf(first);
      const s2 = stepOf(second);
      const bothSlash = !Number.isFinite(first.view.midi) && !Number.isFinite(second.view.midi);
      const stemUp = bothSlash || (s1 + s2) / 2 < 4;
      const y1 = notationStepToY(s1);
      const y2 = notationStepToY(s2);
      const tipY = stemUp ? Math.min(y1, y2) - 27 : Math.max(y1, y2) + 27;
      opts = { stemUp, tipY, beamed: true };
      if (it === first) {
        const stemOff = (n) => (stemUp ? (Number.isFinite(n.view.midi) ? 6.3 : 7.4) : -6.3);
        const x1 = first.x + stemOff(first);
        const x2 = second.x + stemOff(second);
        beamHtml = `<line class="melody-beam" x1="${x1.toFixed(1)}" y1="${tipY.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${tipY.toFixed(1)}" stroke="currentColor" stroke-width="4.6" stroke-linecap="butt" data-beam="${first.idx}-${second.idx}"/>`;
      }
    }
    const glyph = buildMelodyNoteGlyphSVG(it.view, it.x, clefId, keyCode, opts);
    inkMinY = Math.min(inkMinY, glyph.minY);
    inkMaxY = Math.max(inkMaxY, glyph.maxY);
    let extra = beamHtml;
    if (it.view.tone === "current") {
      extra += `<text class="melody-staff-question" x="${it.x.toFixed(1)}" y="${Math.min(52, glyph.minY - 6).toFixed(1)}" text-anchor="middle" font-family="Andika, sans-serif" font-weight="700" font-size="16" fill="currentColor">?</text>`;
      inkMinY = Math.min(inkMinY, Math.min(52, glyph.minY - 6) - 14);
    }
    if (it.view.label) {
      labelEntries.push({ x: it.x, tone: it.view.tone, text: it.view.label });
      labelBaseline = Math.max(labelBaseline, glyph.maxY + 13);
    }
    return `<g id="barCard_${it.idx}" class="melody-staff-note is-${it.view.tone}" data-melody-slot="${it.idx}">
        <rect class="melody-staff-hit" x="${(it.x - 15).toFixed(1)}" y="40" width="30" height="100" fill="transparent"/>
        ${glyph.html}${extra}
      </g>`;
  }).join("");

  // Silben unter den Noten auf einer gemeinsamen Grundlinie
  const labelsHtml = labelEntries.map(l =>
    `<text class="melody-staff-label is-${l.tone}" x="${l.x.toFixed(1)}" y="${labelBaseline.toFixed(1)}" text-anchor="middle" font-family="Andika, sans-serif" font-weight="700" font-size="11">${escapeHtml(l.text)}</text>`
  ).join("");
  if (labelEntries.length) inkMaxY = Math.max(inkMaxY, labelBaseline + 3);

  // Balken liegen in der Gruppe des ersten Achtels und übernehmen dessen Farbe
  const staffLines = [0, 2, 4, 6, 8].map(st => {
    const ly = notationStepToY(st);
    return `<line class="notation-staff-line" x1="${startX}" y1="${ly}" x2="${endX}" y2="${ly}"/>`;
  }).join("");
  const finalBar = `<line x1="${endX - 5}" y1="64" x2="${endX - 5}" y2="112" stroke="currentColor" stroke-width="1.3"/>
    <line x1="${endX - 1.5}" y1="64" x2="${endX - 1.5}" y2="112" stroke="currentColor" stroke-width="3.4"/>`;

  const vbTop = Math.floor(Math.min(inkMinY, 42) - 3);
  const vbBottom = Math.ceil(Math.max(inkMaxY, clefId === "bass" ? 118 : 132) + 4);
  return `<svg class="notation-staff-svg melody-staff-svg" viewBox="0 ${vbTop} ${width} ${vbBottom - vbTop}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(tr("Melodie im Notensystem", "Melody on the staff"))}">
    ${staffLines}
    ${getNotationClefGlyphSVG(clefId, startX + 8, 1, 1)}
    ${sigHtml ? `<g class="notation-keysig-layer">${sigHtml}</g>` : ""}
    ${timeHtml}
    ${finalBar}
    ${noteHtml}
    <g class="melody-label-layer">${labelsHtml}</g>
  </svg>`;
}

function renderMelodyStaffPanel(ex = state.currentExercise, targetGrid = document.getElementById("barsGrid")) {
  if (!ex || ex.type !== "melody" || !targetGrid) return;
  targetGrid.classList.remove("cols-2", "cols-3", "cols-4", "cols-5");
  targetGrid.classList.add("cols-1", "is-melody-staff");
  const panel = document.createElement("div");
  panel.className = "notation-staff-panel melody-staff-panel";
  panel.id = "melodyStaffPanel";
  panel.innerHTML = buildMelodyStaffSVG(ex);
  panel.addEventListener("click", (e) => {
    const g = e.target.closest?.("[data-melody-slot]");
    if (!g) return;
    const idx = parseInt(g.dataset.melodySlot, 10);
    const slot = ex.melodySlots?.[idx];
    if (slot && (slot.solved || idx === ex.melodyStep)) repeatMelodySlotTone(idx);
  });
  targetGrid.innerHTML = "";
  targetGrid.appendChild(panel);
}

function syncMelodySlotCardUI(ex, idx) {
  // Melodien stehen im Notensystem: bei jeder Änderung neu zeichnen (idx bleibt für Aufrufer kompatibel)
  if (ex && ex.type === "melody" && document.getElementById("melodyStaffPanel")) {
    renderMelodyStaffPanel(ex);
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

/**
 * Einladung zum Mitsingen/-summen für Intervall-, Kadenz- und Solfège-Übungen.
 * Liefert null für alle anderen Übungstypen (Hinweis bleibt dann ausgeblendet).
 */
function getSingAlongHintText(type) {
  switch (type) {
    case "interval-melodic":
      return tr("Summ beide Töne nach, bevor du antwortest – deine Stimme spürt den Abstand oft schneller als der Kopf.",
        "Hum both notes back before you answer — your voice often feels the distance faster than your head.");
    case "interval-melodic-down":
      return tr("Sing beide Töne abwärts nach – stell dir dabei eine Treppe nach unten vor.",
        "Sing both notes back going down — picture yourself walking down a staircase.");
    case "interval-harmonic":
      return tr("Summ erst den tiefen, dann den hohen Ton heraus – so wird aus dem Zusammenklang ein Schritt, den du singen kannst.",
        "Hum the low note first, then the high one — that turns the chord into a step you can sing.");
    case "interval-drone":
      return tr("Summ den Grundton der Fläche mit und sing dann den Klavierton darüber – spür, wie weit deine Stimme springen muss.",
        "Hum along with the pad’s root, then sing the piano note above it — feel how far your voice has to leap.");
    case "cadence":
      return tr("Summ den Basston des gesuchten Akkords und sing von dort zurück zum Grundton der Tonart – die Zahl der Schritte verrät dir die Stufe.",
        "Hum the bass note of the chord in question, then sing from there back to the key’s root — the number of steps tells you the degree.");
    case "solfege":
      return state?.profile?.solfegeLabels === "numbers"
        ? tr("Sing jeden Ton mit seiner Stufenzahl mit (1, 2, 3 …) – so verankert sich jede Stufe fest in deinem Ohr.",
          "Sing each note with its degree number (1, 2, 3 …) — that anchors every degree firmly in your ear.")
        : tr("Sing jeden Ton mit seinem Namen mit (Do, Re, Mi …) – so verankert sich jede Stufe fest in deinem Ohr.",
          "Sing each note with its name (Do, Re, Mi …) — that anchors every degree firmly in your ear.");
    default:
      return null;
  }
}

function syncModesPadButton(btn) {
  if (!btn) return;
  const padOn = Boolean(state.settings.modesRootPad);
  btn.textContent = `${padOn ? tr("Grundton-Fläche: An", "Root Pad: On") : tr("Grundton-Fläche: Aus", "Root Pad: Off")} ▾`;
  btn.classList.toggle("btn-active", padOn);
  btn.classList.toggle("click-muted", !padOn);
  btn.setAttribute("aria-haspopup", "true");
  btn.removeAttribute("aria-pressed");
  btn.title = tr("Grundton des Modus als Streicher-Fläche unterlegen", "Play the mode's root as a sustained strings pad");
}

let _modesRootHintTimer = null;

function dismissModesRootHint(markSeen = true) {
  if (_modesRootHintTimer) {
    clearTimeout(_modesRootHintTimer);
    _modesRootHintTimer = null;
  }
  document.getElementById("targetBarBadge")?.classList.remove("is-root-hint-pulse");
  document.getElementById("modesRootHintBubble")?.remove();
  if (markSeen) {
    if (!state.profile) state.profile = createDefaultProfile();
    if (!state.profile.modesRootHintSeen) {
      state.profile.modesRootHintSeen = true;
      saveUserProfile(state.profile);
    }
  }
}

function maybeShowModesRootHint(badgeEl) {
  if (!badgeEl || typeof document === "undefined") return;
  if (state.profile?.modesRootHintSeen) return;
  if (document.getElementById("modesRootHintBubble")) return;
  const headerEl = badgeEl.closest?.(".module-header") || badgeEl.parentElement;
  if (!headerEl) return;

  badgeEl.classList.add("is-root-hint-pulse");
  const bubble = document.createElement("button");
  bubble.id = "modesRootHintBubble";
  bubble.type = "button";
  bubble.className = "modes-root-hint-bubble";
  bubble.textContent = tr("Grundton wählbar", "Tap to choose root", {
    fr: "Tonique réglable",
    es: "Tónica ajustable",
    it: "Tonica regolabile",
    pl: "Wybierz dźwięk",
    tr: "Kök ses seçilebilir",
    uk: "Тоніку можна змінити",
    ur: "بنیادی سُر منتخب کریں",
    ar: "يمكن تغيير النغمة الأساسية"
  });
  bubble.addEventListener("click", (e) => {
    e.stopPropagation();
    dismissModesRootHint(true);
    badgeEl.click();
  });
  headerEl.appendChild(bubble);

  _modesRootHintTimer = setTimeout(() => {
    dismissModesRootHint(true);
  }, 6000);
}

let _cadenceKeyHintTimer = null;

function dismissCadenceKeyHint(markSeen = true) {
  if (_cadenceKeyHintTimer) {
    clearTimeout(_cadenceKeyHintTimer);
    _cadenceKeyHintTimer = null;
  }
  document.getElementById("moduleKeyBtn")?.classList.remove("is-root-hint-pulse");
  document.getElementById("cadenceKeyHintBubble")?.remove();
  if (markSeen) {
    if (!state.profile) state.profile = createDefaultProfile();
    if (!state.profile.cadenceKeyHintSeen) {
      state.profile.cadenceKeyHintSeen = true;
      saveUserProfile(state.profile);
    }
  }
}

function maybeShowCadenceKeyHint(keyBtn) {
  if (!keyBtn || typeof document === "undefined") return;
  if (state.currentView !== "exercise" || state.exam?.active) return;
  if (state.profile?.cadenceKeyHintSeen) return;
  if (document.getElementById("cadenceKeyHintBubble")) return;
  const headerEl = keyBtn.closest?.(".module-header") || keyBtn.parentElement;
  if (!headerEl) return;

  keyBtn.classList.add("is-root-hint-pulse");
  const bubble = document.createElement("button");
  bubble.id = "cadenceKeyHintBubble";
  bubble.type = "button";
  bubble.className = "modes-root-hint-bubble is-inline-start";
  bubble.textContent = tr("Tonart anpassbar", "Tap to change key", {
    fr: "Tonalité réglable",
    es: "Tonalidad ajustable",
    it: "Tonalità regolabile",
    pl: "Tonacja do wyboru",
    tr: "Ton ayarlanabilir",
    uk: "Тональність можна змінити",
    ur: "کلید تبدیل کریں",
    ar: "يمكن تغيير الطبقة الموسيقية"
  });
  bubble.addEventListener("click", (e) => {
    e.stopPropagation();
    dismissCadenceKeyHint(true);
    keyBtn.click();
  });
  headerEl.appendChild(bubble);

  _cadenceKeyHintTimer = setTimeout(() => {
    dismissCadenceKeyHint(true);
  }, 6000);
}

/** Kurze Hörprobe der Grundton-Fläche (nur wenn gerade nichts läuft). */
function previewModesRootPad(durSec = 1.4) {
  const ex = state.currentExercise;
  if (!String(ex?.type || "").startsWith("modes-") || !state.settings.modesRootPad || state.isPlaying) return;
  if (!audioEngine?.isInitialized || !ex?.rootMidi) return;
  audioEngine.playRootPad([midiToNote(ex.rootMidi - 12), midiToNote(ex.rootMidi)], durSec);
}

/**
 * Popover der Grundton-Fläche (Tonleitern & Modi): An/Aus und – nur bei aktiver Fläche – die Lautstärke.
 * Der Regler steht damit nicht dauerhaft in der Übung, sondern nur, wenn man ihn aufruft.
 */
function renderModesPadPopover() {
  const pop = document.getElementById("inlineModesPadPopover");
  if (!pop) return;
  const padOn = Boolean(state.settings.modesRootPad);
  const padPct = Math.round(getActiveDroneMixSettings().pad * 100);
  const volLabel = tr("Lautstärke:", "Volume:", { fr: "Volume :", es: "Volumen:", it: "Volume:", pl: "Głośność:", tr: "Ses seviyesi:", uk: "Гучність:", ur: "آواز کی سطح:", ar: "مستوى الصوت:" });
  const onLabel = tr("An", "On", { fr: "Oui", es: "Sí", it: "Sì", pl: "Wł.", tr: "Açık", uk: "Увімк.", ur: "آن", ar: "تشغيل" });
  const offLabel = tr("Aus", "Off", { fr: "Non", es: "No", it: "No", pl: "Wył.", tr: "Kapalı", uk: "Вимк.", ur: "آف", ar: "إيقاف" });
  pop.innerHTML = `
    <div class="popover-pills-row">
      <button type="button" class="popover-pill-btn${padOn ? " active" : ""}" data-modes-pad="on" aria-pressed="${padOn}">${escapeHtml(onLabel)}</button>
      <button type="button" class="popover-pill-btn${!padOn ? " active" : ""}" data-modes-pad="off" aria-pressed="${!padOn}">${escapeHtml(offLabel)}</button>
    </div>
    ${padOn ? `
    <div class="modes-pad-vol-row">
      <span class="popover-label">${escapeHtml(volLabel)}</span>
      <input type="range" id="modesPadVolSlider" min="0" max="100" step="2" value="${padPct}" aria-label="${escapeHtml(tr("Lautstärke der Grundton-Fläche", "Root pad volume", { fr: "Volume de la nappe de fondamentale", es: "Volumen del colchón de tónica", it: "Volume del tappeto di tonica", pl: "Głośność plamy dźwięku podstawowego", tr: "Kök ses pedi seviyesi", uk: "Гучність фону тоніки", ur: "بنیادی سُر کی تہہ کی آواز", ar: "مستوى صوت خلفية النغمة الأساسية" }))}">
      <span id="modesPadVolVal" class="popover-val">${padPct}%</span>
    </div>` : ""}`;
  pop.querySelectorAll("[data-modes-pad]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const next = btn.dataset.modesPad === "on";
      if (next === Boolean(state.settings.modesRootPad)) return;
      state.settings.modesRootPad = next;
      syncModesPadButton(document.getElementById("modesPadBtn"));
      renderModesPadPopover();
      if (typeof queueFitExerciseLayout === "function") queueFitExerciseLayout(true);
      if (next) previewModesRootPad(1.6);
    });
  });
  const slider = pop.querySelector("#modesPadVolSlider");
  slider?.addEventListener("input", (e) => {
    const pct = parseFloat(e.target.value);
    if (!Number.isFinite(pct)) return;
    setDroneMixValue("pad", pct / 100);
    const val = pop.querySelector("#modesPadVolVal");
    if (val) val.textContent = `${Math.round(pct)}%`;
  });
  slider?.addEventListener("change", () => previewModesRootPad());
}

/**
 * Rhythmus-Diktat & Tap: Die Schlag-Kacheln werden als Einlinien-Notensystem dargestellt
 * (Schlagzeug-Schlüssel + Taktangabe vorne, durchgehende Linie, Schlusstaktstrich).
 */
function applyRhythmStaffLayout(grid, ex) {
  if (!grid || !ex) return;
  const beats = ex.type === "rhythm-tap" ? (ex.beatsPerBar || ex.tapSlots?.length || 4) : (ex.rhythmSlots?.length || 4);
  const meter = ex.type === "rhythm-tap" ? (ex.meterKey || `${beats}/4`) : "4/4";
  const [num, den] = String(meter).split("/");
  grid.classList.add("rhythm-staff-grid");
  grid.style.gridTemplateColumns = `auto repeat(${beats}, minmax(0, 1fr))`;
  const head = document.createElement("div");
  head.className = "rhythm-staff-head";
  head.setAttribute("aria-hidden", "true");
  head.innerHTML = `
    <svg class="rhythm-staff-clef" viewBox="0 0 14 30" width="14" height="30"><rect x="2" y="4" width="3.2" height="22" fill="currentColor"/><rect x="8.8" y="4" width="3.2" height="22" fill="currentColor"/></svg>
    <span class="rhythm-staff-meter"><span>${escapeHtml(num || "4")}</span><span>${escapeHtml(den || "4")}</span></span>`;
  grid.insertBefore(head, grid.firstChild);
  const cards = grid.querySelectorAll(".bar-card");
  if (cards.length) cards[cards.length - 1].dataset.lastBeat = "1";
  if (ex.type === "rhythm-tap" && ex.tapEvaluated && ex.lastEvaluation) {
    renderRhythmTapTimeline(ex, ex.lastEvaluation, 60000 / (state.activeBpm || 90));
  }
}

/**
 * Zeitstrahl unter dem Rhythmus: Soll-Noten (●) farbig nach Ergebnis, eigene Extra-Taps als ×.
 * grün = exakt, orange = knapp (früh/spät), rot = verpasst / zu viel.
 */
function renderRhythmTapTimeline(ex, res, beatMs) {
  const grid = document.getElementById("barsGrid");
  if (!grid || !ex || !res) return;
  document.getElementById("rhythmTapTimeline")?.remove();
  const beats = ex.beatsPerBar || 4;
  const barMs = beats * (beatMs || 666);
  const W = 300;
  const x0 = 10;
  const span = W - 20;
  const xOf = (ms) => (x0 + Math.max(-0.04, Math.min(1.04, ms / barMs)) * span).toFixed(1);
  const colorOf = (st) => st === "exact" ? "var(--sage-strong)" : (st === "close" ? "var(--peach-strong)" : "var(--status-err)");

  let marks = "";
  for (let b = 0; b <= beats; b++) {
    const x = (x0 + (b / beats) * span).toFixed(1);
    marks += `<line x1="${x}" y1="${b === 0 || b === beats ? 9 : 12}" x2="${x}" y2="${b === 0 || b === beats ? 27 : 24}" stroke="currentColor" stroke-width="${b === 0 || b === beats ? 1.4 : 0.9}" opacity="0.45"/>`;
    if (b < beats) marks += `<text x="${(x0 + ((b + 0.5) / beats) * span).toFixed(1)}" y="38" text-anchor="middle" font-size="8" font-weight="800" fill="currentColor" opacity="0.55">${b + 1}</text>`;
  }
  res.expResults.forEach(r => {
    marks += `<circle cx="${xOf(r.relMs)}" cy="18" r="4.4" fill="${r.status === "missed" ? "none" : colorOf(r.status)}" stroke="${colorOf(r.status)}" stroke-width="1.8"/>`;
    if (r.status === "close" && r.diffMs !== null) {
      marks += `<line x1="${xOf(r.relMs)}" y1="18" x2="${xOf(r.relMs + r.diffMs)}" y2="18" stroke="${colorOf("close")}" stroke-width="2"/>`;
    }
  });
  (res.extraTapsMs || []).forEach(t => {
    const x = Number(xOf(t));
    marks += `<path d="M ${x - 4} 14 L ${x + 4} 22 M ${x + 4} 14 L ${x - 4} 22" stroke="var(--status-err)" stroke-width="2.2" stroke-linecap="round"/>`;
  });

  const legend = `
    <span style="color:var(--sage-strong)">● ${escapeHtml(tr("exakt", "exact"))}</span>
    <span style="color:var(--peach-strong)">● ${escapeHtml(tr("knapp", "close"))}</span>
    <span style="color:var(--status-err)">○ ${escapeHtml(tr("verpasst", "missed"))}</span>
    <span style="color:var(--status-err)">× ${escapeHtml(tr("zu viel", "extra"))}</span>
    <span>• ${escapeHtml(tf("Toleranz ±{tol} ms", "Tolerance ±{tol} ms", { tol: ex.toleranceMs }))}</span>`;
  const row = document.createElement("div");
  row.id = "rhythmTapTimeline";
  row.className = "rhythm-tap-timeline";
  row.innerHTML = `
    <svg viewBox="0 0 ${W} 42" preserveAspectRatio="none" role="img" aria-label="${escapeHtml(tr("Zeitstrahl deiner Taps", "Timeline of your taps"))}">
      <line x1="${x0}" y1="18" x2="${x0 + span}" y2="18" stroke="currentColor" stroke-width="1" opacity="0.35"/>
      ${marks}
    </svg>
    <span class="rhythm-tap-timeline-legend">${legend}</span>`;
  grid.appendChild(row);
}

// ---------- Mitsingen: Einführungskarte, Chip, Tipp im richtigen Moment & Summ-Pause ----------
const SING_ALONG_INTRO_LIMIT = 2;   // ausführliche Karte pro Übungsart höchstens 2× automatisch
const HUM_PAUSE_MS = 3000;          // Dauer der optionalen Summ-Pause
let singAlongPromptCounter = 0;
let humPauseTimer = null;

function isSingAlongTipsEnabled() {
  return state?.profile?.singAlongTips !== false;
}

function isSingAlongExerciseType(type) {
  return Boolean(getSingAlongHintText(type));
}

/** Kurze, wechselnde Mitsing-Aufforderung für den Tipp-Bereich nach dem Abspielen. */
function getSingAlongShortPrompt(type) {
  const nums = state?.profile?.solfegeLabels === "numbers";
  const variants = {
    "interval-melodic": [
      tr("Summ beide Töne nach – dann tippen.", "Hum both notes back — then tap."),
      tr("Sing die Töne nach: Wie weit springt deine Stimme?", "Sing the notes back: how far does your voice jump?")
    ],
    "interval-melodic-down": [
      tr("Sing beide Töne abwärts nach – dann tippen.", "Sing both notes back going down — then tap."),
      tr("Summ den Abstieg nach: kleiner Schritt oder großer Sprung?", "Hum the descent: small step or big leap?")
    ],
    "interval-harmonic": [
      tr("Summ erst den tiefen, dann den hohen Ton.", "Hum the low note first, then the high one."),
      tr("Zerleg den Klang: unten summen, dann oben.", "Split the sound: hum the bottom, then the top.")
    ],
    "interval-drone": [
      tr("Summ den Grundton mit, dann den Klavierton.", "Hum the root, then the piano note."),
      tr("Halte den Grundton mit der Stimme – wie weit liegt der Klavierton darüber?", "Hold the root with your voice — how far above is the piano note?")
    ],
    "cadence": [
      tr("Summ den Basston des gesuchten Akkords – dann tippen.", "Hum the bass note of the chord in question — then tap."),
      tr("Sing vom gesuchten Basston zurück zum Grundton: Wie viele Schritte?", "Sing from that bass note back to the root: how many steps?")
    ],
    "solfege": nums
      ? [
          tr("Sing den Ton mit seiner Stufenzahl (1, 2, 3 …).", "Sing the note with its degree number (1, 2, 3 …)."),
          tr("Sing vom Ton zurück zur 1 – welche Stufe war’s?", "Sing from the note back to 1 — which degree was it?")
        ]
      : [
          tr("Sing den Ton mit seinem Namen (Do, Re, Mi …).", "Sing the note with its name (Do, Re, Mi …)."),
          tr("Sing vom Ton zurück zum Do – welche Stufe war’s?", "Sing from the note back to Do — which degree was it?")
        ]
  };
  const list = variants[type];
  if (!list) return null;
  const text = list[singAlongPromptCounter % list.length];
  singAlongPromptCounter += 1;
  return text;
}

/** Nach dem Erzeugen einer Übung: Einführungskarte nur bei den ersten Durchgängen einer Übungsart zeigen. */
function markSingAlongIntroForExercise(ex) {
  if (!ex || state.exam?.active || !isSingAlongTipsEnabled() || !isSingAlongExerciseType(ex.type)) return;
  const p = state.profile;
  if (!p || p.singAlongIntroDone) return;
  if (!p.singAlongIntroCounts || typeof p.singAlongIntroCounts !== "object") p.singAlongIntroCounts = {};
  const seen = Number(p.singAlongIntroCounts[ex.type]) || 0;
  if (seen >= SING_ALONG_INTRO_LIMIT) return;
  p.singAlongIntroCounts[ex.type] = seen + 1;
  ex.singIntroShown = true;
  saveUserProfile(p);
}

/** Karte, Chip und Summ-Pause-Schalter im Übungskopf synchronisieren. */
function syncSingAlongUI(ex = state.currentExercise) {
  const card = document.getElementById("singAlongHint");
  const chip = document.getElementById("singAlongChipBtn");
  const singText = ex ? getSingAlongHintText(ex.type) : null;
  const available = Boolean(singText) && isSingAlongTipsEnabled() && !state.exam?.active;
  const expanded = available && Boolean(state.singAlongExpanded);
  const showCard = available && (expanded || Boolean(ex?.singIntroShown));

  if (chip) {
    chip.classList.toggle("hidden", !available);
    chip.classList.toggle("chip-open", showCard);
    chip.setAttribute("aria-expanded", String(showCard));
    chip.textContent = tr("Mitsingen", "Sing along");
    chip.title = tr("Mitsing-Tipp ein- oder ausklappen", "Show or hide the sing-along tip");
  }
  if (!card) return;
  card.classList.toggle("hidden", !showCard);
  if (!showCard) return;
  const titleEl = document.getElementById("singAlongTitle");
  const textEl = document.getElementById("singAlongText");
  if (titleEl) titleEl.textContent = tr("Sing mit!", "Sing along!");
  if (textEl) textEl.textContent = singText;
  const pauseBtn = document.getElementById("singAlongPauseToggle");
  if (pauseBtn) {
    const pauseOn = Boolean(state.profile?.singAlongPause);
    pauseBtn.textContent = pauseOn ? tr("Summ-Pause: An", "Hum pause: On") : tr("Summ-Pause: Aus", "Hum pause: Off");
    pauseBtn.classList.toggle("is-on", pauseOn);
    pauseBtn.setAttribute("aria-pressed", String(pauseOn));
  }
  const dismissBtn = document.getElementById("singAlongDismissBtn");
  if (dismissBtn) {
    dismissBtn.textContent = (ex?.singIntroShown && !expanded) ? tr("Verstanden", "Got it") : tr("Schließen", "Close");
  }
}

function syncSingAlongSettingsControls() {
  const tipsOn = isSingAlongTipsEnabled();
  const pauseOn = Boolean(state?.profile?.singAlongPause);
  document.querySelectorAll("[data-sing-tips]").forEach(btn => {
    const active = (btn.dataset.singTips === "on") === tipsOn;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-sing-pause]").forEach(btn => {
    const active = (btn.dataset.singPause === "on") === pauseOn;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

function setSingAlongPreference(key, value) {
  if (!state.profile) state.profile = createDefaultProfile();
  state.profile[key] = Boolean(value);
  saveUserProfile(state.profile);
  syncSingAlongSettingsControls();
  syncSingAlongUI();
  if (key === "singAlongPause" && !value) cancelHumPause(true);
}

function shouldRunHumPause(ex) {
  return Boolean(ex && state.profile?.singAlongPause && isSingAlongTipsEnabled()
    && isSingAlongExerciseType(ex.type) && !state.exam?.active && !state.listenOnly?.active);
}

function cancelHumPause(showAwaiting = false) {
  const wasActive = Boolean(humPauseTimer);
  if (humPauseTimer) {
    clearTimeout(humPauseTimer);
    humPauseTimer = null;
  }
  document.body?.classList.remove("is-hum-pause");
  document.getElementById("humPauseBar")?.remove();
  if (wasActive && showAwaiting) showAwaitingAnswerStage(state.currentExercise);
}

/** Optionale Summ-Pause: kurze Phase nach dem Abspielen, in der erst gesummt und dann geantwortet wird. */
/** Bühne für die Summ-Pause: Hinweis, kurze Mitsing-Aufforderung und ablaufender Balken. */
function renderHumPauseStage(ex, subtext = tr("SUMM-PAUSE", "HUM PAUSE")) {
  const stageCard = document.getElementById("centralStageCard");
  if (!stageCard) return null;
  document.getElementById("humPauseBar")?.remove();
  setCentralStageMode("stage-awaiting");
  updateStageMascot("listening");
  document.getElementById("stageSubtext").textContent = subtext;
  document.getElementById("stageMainText").textContent = tr("Jetzt summen…", "Hum it now…");
  document.getElementById("stageFunctionText").textContent = getSingAlongShortPrompt(ex.type) || "";
  document.body.classList.add("is-hum-pause");
  const bar = document.createElement("div");
  bar.id = "humPauseBar";
  bar.className = "hum-pause-bar";
  bar.style.setProperty("--hum-ms", `${HUM_PAUSE_MS}ms`);
  bar.innerHTML = "<span></span>";
  stageCard.appendChild(bar);
  return bar;
}

function startHumPause(ex) {
  cancelHumPause();
  const bar = renderHumPauseStage(ex);
  if (!bar) {
    showAwaitingAnswerStage(ex);
    return;
  }
  humPauseTimer = setTimeout(() => {
    humPauseTimer = null;
    document.body.classList.remove("is-hum-pause");
    bar.remove();
    if (state.currentView === "exercise" && state.currentExercise === ex && !isCurrentExerciseSolved(ex)) {
      showAwaitingAnswerStage(ex);
    }
  }, HUM_PAUSE_MS);
}

function renderUI() {
  const ex = state.currentExercise;
  if (!ex) return;

  const isSolfege = ex.type === "solfege";
  const isMelody = ex.type === "melody";
  const isNotation = isNotationMode(ex.type);
  const isNotationSymbols = isNotationSymbolsMode(ex.type);
  const isNotationChordChoice = isNotationChordMode(ex.type);
  const isKeyboardMode = isSolfege || isMelody || (isNotation && !isNotationChordChoice && !isNotationSymbols);
  syncAnswerCueState();
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
  document.getElementById("exerciseModuleCard")?.classList.toggle("is-notation-symbols", isNotationSymbols);
  document.getElementById("centralStageCard")?.classList.toggle("is-solfege", isSolfege || isMelody);
  document.getElementById("centralStageCard")?.classList.toggle("is-melody", isMelody);
  document.getElementById("centralStageCard")?.classList.toggle("is-notation", isNotation);
  document.getElementById("centralStageCard")?.classList.toggle("is-notation-symbols", isNotationSymbols);
  document.getElementById("centralStageCard")?.classList.toggle("is-rhythm-tap", isRhythmTap);

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
    if (isCadence && !state.exam?.active) {
      maybeShowCadenceKeyHint(moduleKeyBtn);
    } else {
      dismissCadenceKeyHint(false);
    }
  }

  if (moduleNotationKeyBtn) {
    moduleNotationKeyBtn.classList.toggle("hidden", !isNotation || isNotationSymbols);
  }

  syncNotationPaceVisibility(ex);
  if (isNotation && !isNotationSymbols) {
    syncNotationPaceUI();
  }

  if (moduleTimeSigBtn) {
    moduleTimeSigBtn.classList.toggle("hidden", !isCadence || !CADENCE_TIME_SIG_PICKER_ENABLED);
    moduleTimeSigBtn.textContent = state.activeTimeSig === "odd" ? "5/4" : state.activeTimeSig;
  }

  const modesPadBtn = document.getElementById("modesPadBtn");
  if (modesPadBtn) {
    const showPadBtn = isModes && !state.exam?.active;
    modesPadBtn.classList.toggle("hidden", !showPadBtn);
    if (showPadBtn) syncModesPadButton(modesPadBtn);
    else {
      modesPadBtn.classList.remove("chip-open");
      document.getElementById("inlineModesPadPopover")?.classList.add("hidden");
    }
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

  // Akkord-Arpeggien: statt BPM-Knopf ein dauerhaft sichtbarer Tempo-Schieberegler (außer in Prüfungen);
  // gleichzeitige Akkorde & Umkehrungen haben keine Tempo-Auswahl.
  const isBlockChord = isBlockChordMode(ex.type);
  const isChordTempoPinned = isChordArpeggioMode(ex.type) && !state.exam?.active;
  if (moduleBpmBtn) {
    moduleBpmBtn.classList.toggle("hidden", isProd || isModes || isNotation || isBlockChord || isChordTempoPinned);
    moduleBpmBtn.textContent = `${state.activeBpm} BPM`;
    if (isChordTempoPinned || isBlockChord) moduleBpmBtn.classList.remove("chip-open");
  }
  const pinnedBpmPopover = document.getElementById("inlineBpmPopover");
  if (pinnedBpmPopover) {
    if (isChordTempoPinned) {
      pinnedBpmPopover.classList.add("is-pinned");
      pinnedBpmPopover.classList.remove("hidden");
      pinnedBpmPopover.style.top = "";
      pinnedBpmPopover.style.maxHeight = "";
    } else if (pinnedBpmPopover.classList.contains("is-pinned")) {
      pinnedBpmPopover.classList.remove("is-pinned");
      pinnedBpmPopover.classList.add("hidden");
    }
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
  if (!isNotation || isNotationSymbols) {
    document.getElementById("inlineNotationKeyPopover")?.classList.add("hidden");
    moduleNotationKeyBtn?.classList.remove("chip-open");
    document.getElementById("inlineNotationPacePopover")?.classList.add("hidden");
    moduleNotationPaceBtn?.classList.remove("chip-open");
  }
  if (isProd || isModes || isNotation || isBlockChord) {
    document.getElementById("inlineBpmPopover")?.classList.add("hidden");
    moduleBpmBtn?.classList.remove("chip-open");
  }

  const droneMixStrip = document.getElementById("droneMixStrip");
  if (droneMixStrip) {
    const isDroneEx = ex.type === "interval-drone";
    // Modi: Lautstärke der Grundton-Fläche steht im Popover des Flächen-Chips, nicht dauerhaft in der Übung
    droneMixStrip.classList.toggle("hidden", !isDroneEx);
    droneMixStrip.classList.remove("is-pad-only");
    if (isDroneEx) syncDroneMixControls();
  }
  const badgeEl = document.getElementById("targetBarBadge");
  const isCustomIntervalEx = String(ex.type || "").startsWith("interval-") && ex.type !== "interval-chords" && parseInt(state.settings.intervalDifficulty, 10) === 10 && !state.exam?.active;
  const isCustomSolfegeEx = ex.type === "solfege" && parseInt(state.settings.solfegeDifficulty, 10) === 17 && !state.exam?.active;
  if (badgeEl) {
    const rootSelectable = (String(ex.type || "").startsWith("modes-") && !state.exam?.active) || isCustomIntervalEx || isCustomSolfegeEx;
    badgeEl.classList.toggle("module-badge-btn", rootSelectable);
    if (rootSelectable) {
      badgeEl.setAttribute("role", "button");
      badgeEl.setAttribute("tabindex", "0");
      badgeEl.title = isCustomSolfegeEx
        ? tr("Tonart, Dur/Moll & Tonraum wählen", "Choose key, major/minor & range")
        : (isCustomIntervalEx
            ? tr("Grundton & Modus wählen", "Choose root & mode")
            : tr("Grundton wählen", "Choose root", { fr: "Choisir la tonique", es: "Elegir tónica", it: "Scegli tonica", pl: "Wybierz dźwięk podstawowy", tr: "Kök ses seç", uk: "Обрати тоніку", ur: "بنیادی سُر چنیں", ar: "اختر النغمة الأساسية" }));
      if (!isCustomIntervalEx && !isCustomSolfegeEx) maybeShowModesRootHint(badgeEl);
    } else {
      badgeEl.removeAttribute("role");
      badgeEl.removeAttribute("tabindex");
      badgeEl.removeAttribute("title");
      badgeEl.classList.remove("chip-open");
      dismissModesRootHint(false);
      document.getElementById("inlineModesRootPopover")?.classList.add("hidden");
    }
  }

  syncSingAlongUI(ex);

  const solfegeKeyBtn = document.getElementById("solfegeKeyBtn");
  const solfegeKeyBtnLabel = document.getElementById("solfegeKeyBtnLabel");
  if (solfegeKeyBtn) {
    solfegeKeyBtn.classList.toggle("hidden", !(isSolfege || isMelody));
  }
  if (solfegeKeyBtnLabel && (isSolfege || isMelody)) {
    const baseKeyName = getKeyDisplayName(state.currentKey, ex.tonality || "major");
    solfegeKeyBtnLabel.textContent = `${baseKeyName}`;
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
          ? (ex.tonality === "minor" ? tr("Tonika (i)", "Tonic (i)") : tr("Tonika (I)", "Tonic (I)"))
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
      ? (isNotationSymbols
          ? tr("Aktuelle Frage überspringen", "Skip current question")
          : (ex?.isChordReading
              ? tr("Aktuellen Akkord überspringen", "Skip current chord")
              : tr("Aktuelle Note überspringen", "Skip current note")))
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
      if (isCustomSolfegeEx) {
        targetBadgeEl.textContent = getSolfegeCustomBadgeLabel();
      } else if (ex.solfegeRange === "do-fa") {
        targetBadgeEl.textContent = ex.isMultiOctave
          ? tr("Do–Fa (Mehrere Okt.)", "Do–Fa (Multi-Oct.)")
          : tr("Untere Hälfte (Do–Fa)", "Lower Half (Do–Fa)");
      } else if (ex.solfegeRange === "sol-do") {
        targetBadgeEl.textContent = ex.isMultiOctave
          ? tr("Sol–Do (Mehrere Okt.)", "Sol–Do (Multi-Oct.)")
          : tr("Obere Hälfte (Sol–Do)", "Upper Half (Sol–Do)");
      } else {
        targetBadgeEl.textContent = ex.isMultiOctave
          ? tr("Einzelton (Mehrere Okt.)", "Single Note (Multi-Oct.)")
          : tr("Danach: Einzelton", "Then: Single Note");
      }
    }
    document.getElementById("inputPromptText").textContent = tr("Tippe die gehörte Stufe auf der Klaviatur:", "Tap the heard scale degree on the keyboard:");
  } else if (ex.type === "melody") {
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
      tf("Muster für Schlag {step}/4:", "Pattern for beat {step}/4:", { step: Math.min(ex.rhythmStep + 1, 4) }, {
        fr: "Motif pour le temps {step}/4 :",
        es: "Patrón para el pulso {step}/4:",
        it: "Motivo per il battito {step}/4:",
        pl: "Wzór na miarę {step}/4:",
        tr: "{step}/4 vuruş için desen:",
        uk: "Малюнок для долі {step}/4:",
        ur: "دھڑکن {step}/4 کا نمونہ:",
        ar: "نمط النبضة {step}/4:"
      });
  } else if (isRhythmTap) {
    if (ex.beatsPerBar === 3) {
      barsGrid.style.gridTemplateColumns = "repeat(3, minmax(0, 1fr))";
    }
    if (moduleTitleEl) moduleTitleEl.textContent = ex.readMode ? tr("Vom Blatt tappen", "Tap from Notation") : tr("Klopf-Raster", "Tap Grid");
    if (targetBadgeEl) {
      targetBadgeEl.textContent = ex.tapEvaluated
        ? (ex.lastEvaluation?.passed ? tr("Treffer ✓", "Hit ✓") : tr("Nochmal!", "Try Again!"))
        : `${ex.meterKey} • ±${ex.toleranceMs} ms`;
    }
    document.getElementById("inputPromptText").textContent = ex.readMode
      ? (ex.blind
          ? tr("Vom Blatt tappen (ohne Klick):", "Tap from notation (no click):", {
              fr: "Frapper à vue (sans clic) :",
              es: "Marcar a vista (sin clic):",
              it: "Batti a prima vista (senza clic):",
              pl: "Wystukaj z nut (bez kliku):",
              tr: "Notadan vur (tıklamasız):",
              uk: "Простукай з нот (без кліку):",
              ur: "نوٹیشن دیکھ کر تھپکیں (بغیر کلک):",
              ar: "انقر من التدوين الموسيقي (بلا نقر متزامن):"
            })
          : tr("Rhythmus vom Blatt tappen:", "Tap rhythm from notation:", {
              fr: "Frapper le rythme à vue :",
              es: "Marcar ritmo a vista:",
              it: "Batti il ritmo a prima vista:",
              pl: "Wystukaj rytm z nut:",
              tr: "Ritmi notadan vur:",
              uk: "Простукай ритм із нот:",
              ur: "نوٹیشن سے تال تھپکیں:",
              ar: "انقر الإيقاع من التدوين الموسيقي:"
            }))
      : (ex.blind
          ? tr("Blindflug: im Takt weiterklopfen:", "Blind mode: keep tapping in time:", {
              fr: "À l’aveugle : garde la pulsation :",
              es: "A ciegas: sigue el pulso:",
              it: "Alla cieca: mantieni la pulsazione:",
              pl: "Na ślepo: utrzymaj puls:",
              tr: "Kör mod: tempoyu koru:",
              uk: "Наосліп: тримай пульс:",
              ur: "بلائنڈ موڈ: تال برقرار رکھیں:",
              ar: "الوضع الأعمى: واصل النقر على الإيقاع:"
            })
          : tr("Rhythmus direkt nachklopfen:", "Tap the rhythm back:", {
              fr: "Reproduis le rythme :",
              es: "Repite el ritmo:",
              it: "Ripeti il ritmo:",
              pl: "Wystukaj rytm:",
              tr: "Ritmi aynen vur:",
              uk: "Повтори ритм:",
              ur: "تال کو دوبارہ تھپکیں:",
              ar: "أعد نقر الإيقاع:"
            }));
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
      document.getElementById("inputPromptText").textContent = tr("Wo liegt der Cowbell-Akzent?", "Where is the cowbell accent?", {
        fr: "Où est l’accent de cloche ?",
        es: "¿Dónde cae el acento de cencerro?",
        it: "Dove cade l’accento di campanaccio?",
        pl: "Gdzie pada akcent cowbella?",
        tr: "Cowbell vurgusu nerede?",
        uk: "Де акцент ковбела?",
        ur: "کاؤ بیل کا زور کہاں ہے؟",
        ar: "أين تقع نبرة الجرس (Cowbell)؟"
      });
    } else {
      if (moduleTitleEl) moduleTitleEl.textContent = tr("Snare-Timing (2 & 4)", "Snare Timing (2 & 4)");
      if (targetBadgeEl) targetBadgeEl.textContent = ex.keyName;
      document.getElementById("inputPromptText").textContent = tr("Snare: früh, exakt oder spät?", "Snare: early, on beat, or late?", {
        fr: "Caisse claire : tôt, juste ou tard ?",
        es: "Caja: ¿pronto, exacta o tarde?",
        it: "Rullante: anticipato, esatto o ritardato?",
        pl: "Werbel: za wcześnie, równo czy za późno?",
        tr: "Trampet: erken, tam vuruşta mı yoksa geç mi?",
        uk: "Малий барабан: рано, точно чи пізно?",
        ur: "سنیئر: جلدی، عین وقت پر یا دیر سے؟",
        ar: "الطبل الجانبي (Snare): مبكر أم في الوقت تماماً أم متأخر؟"
      });
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
    if (targetBadgeEl) targetBadgeEl.textContent = isCustomIntervalEx ? `${getIntervalCustomBadgeLabel()} ▾` : tr("Ziel: Ton 2 ↗", "Target: Note 2 ↗");
    document.getElementById("inputPromptText").textContent = tr("Welches Intervall erklingt aufwärts?", "Which ascending interval do you hear?");
  } else if (ex.type === "interval-melodic-down") {
    barsGrid.classList.add("cols-2");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Tonfolge (2 Töne)", "2-Note Sequence");
    if (targetBadgeEl) targetBadgeEl.textContent = isCustomIntervalEx ? `${getIntervalCustomBadgeLabel()} ▾` : tr("Ziel: Ton 2 ↘", "Target: Note 2 ↘");
    document.getElementById("inputPromptText").textContent = tr("Welches Intervall erklingt abwärts?", "Which descending interval do you hear?");
  } else if (ex.type === "interval-drone") {
    barsGrid.classList.add("cols-2");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Fläche + Intervall", "Pad + Interval");
    if (targetBadgeEl) targetBadgeEl.textContent = isCustomIntervalEx ? `${getIntervalCustomBadgeLabel()} ▾` : tr("Streicher ➔ Klavier", "Strings ➔ Piano");
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
      if (targetBadgeEl) targetBadgeEl.textContent = `${tf("Grundton {root}", "Root {root}", { root: ex.rootLabel })} ▾`;
      document.getElementById("inputPromptText").textContent = tr("Welcher Modus steckt in diesem Charakterton?", "Which mode matches this characteristic tone?");
    } else if (ex.type === "modes-cadence") {
      if (moduleTitleEl) moduleTitleEl.textContent = tr("Quinte → Akkordfolge", "Fifth → Progression");
      if (targetBadgeEl) targetBadgeEl.textContent = `${tf("Grundton {root}", "Root {root}", { root: ex.rootLabel })} ▾`;
      document.getElementById("inputPromptText").textContent = tr("Welcher Modus prägt diese Akkordfolge?", "Which mode shapes this chord loop?");
    } else {
      if (moduleTitleEl) moduleTitleEl.textContent = tr("Quinte → Klangfolge", "Fifth → Sequence");
      if (targetBadgeEl) targetBadgeEl.textContent = `${tf("Grundton {root}", "Root {root}", { root: ex.rootLabel })} ▾`;
      document.getElementById("inputPromptText").textContent = tr("Welche Kirchentonart erklingt aufwärts?", "Which ascending mode do you hear?");
    }
  } else {
    barsGrid.classList.add("cols-1");
    if (moduleTitleEl) moduleTitleEl.textContent = tr("Tonpaar (Gleichzeitig)", "2-Note Dyad");
    if (targetBadgeEl) targetBadgeEl.textContent = isCustomIntervalEx ? `${getIntervalCustomBadgeLabel()} ▾` : tr("Zusammenklang", "Dyad");
    document.getElementById("inputPromptText").textContent = tr("Welches Intervall erklingt?", "Which harmonic interval do you hear?");
  }

  barsGrid.innerHTML = "";
  if (isNotationSymbols) {
    renderNotationSymbolPromptPanel(ex, barsGrid);
  } else if (isNotation) {
    renderNotationStaffPanel(ex, Boolean(ex.notationDidShift), barsGrid);
    ex.notationDidShift = false;
  } else if (isMelody) {
    renderMelodyStaffPanel(ex, barsGrid);
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
    applyRhythmStaffLayout(barsGrid, ex);
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
            const firstDiff = (beatEvents.find(r => r.status === "close") || beatEvents.find(r => r.diffMs !== null))?.diffMs ?? 0;
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
    applyRhythmStaffLayout(barsGrid, ex);
  } else {
    const hideAllNonRef = isRhythmMeter ||
      (isRhythmGroove && (ex.grooveKind === "style" || ex.grooveKind === "micro"));

    ex.bars.forEach((bar, idx) => {
      const isTarget = !isSolfege && (hideAllNonRef ? bar.key !== "ref" : idx === ex.targetIndex);
      const isDroneCard = ex.type === "interval-drone";
      // Intervalle: melodisch „Ton 1 / Ton 2“ statt „Takt“, harmonisch (gleichzeitig) ohne Überschrift
      const isMelodicIntervalCard = ex.type === "interval-melodic" || ex.type === "interval-melodic-down";
      const hideBarTag = ex.type === "interval-harmonic";
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
                        : (isMelodicIntervalCard
                            ? tf("Ton {n}", "Note {n}", { n: idx + 1 })
                            : tf("Takt {n}", "Bar {n}", { n: idx + 1 }))))));

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
                                        ? (ex.type === "modes-cadence" ? tr("Pendel ?", "Loop ?") : (ex.type === "modes-char" ? tr("Farbe ?", "Color ?") : tr("Modus ?", "Mode ?")))
                                        : tr("Intervall ?", "Interval ?")))))))))
        : bar.short;

      if (!hideBarTag) card.appendChild(tag);
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
    renderExerciseChoiceButtonsGrid(ex, btnGrid);
  }

  resetCentralStage();
  updatePlayButtonUI(false);
  syncListenOnlyUI();
  if (typeof syncExerciseDemoButtonUI === "function") {
    syncExerciseDemoButtonUI();
  }
  document.getElementById("feedbackContainer").classList.add("hidden");
  syncExamExerciseControls();
  fitExerciseLayout();
}

function renderExerciseChoiceButtonsGrid(ex, btnGrid = document.getElementById("degreeButtonsGrid")) {
  if (!ex || !btnGrid) return;
  const isCadence = ex.type === "cadence";
  const isRhythmDict = ex.type === "rhythm-dictation";
  const isRhythmGroove = ex.type === "rhythm-groove";
  const isProd = ex.type === "prod-tone" || ex.type === "prod-eq-noise";
  const isModes = ex.type.startsWith("modes-");
  const isNotationChordChoice = isNotationChordMode(ex.type);
  const isNotationSymbols = isNotationSymbolsMode(ex.type);
  const useCompactNames = isModes || isNotationChordChoice;

  btnGrid.classList.remove("hidden");
  btnGrid.innerHTML = "";
  const isInterval = !isCadence;
  btnGrid.classList.toggle("grid-intervals", isInterval && !isNotationSymbols);
  btnGrid.classList.toggle("grid-chords", isChordMode(ex.type) || isNotationChordChoice || isRhythmGroove || isProd || isModes);
  btnGrid.classList.toggle("grid-notation-symbols", isNotationSymbols);
  btnGrid.classList.toggle("is-svg-choices", isNotationSymbols && ex.promptKind === "meaning-to-symbol");
  btnGrid.classList.toggle("is-flow-choices", isNotationSymbols && ex.promptKind === "flow-order");

  if (isNotationSymbols) {
    const choices = Array.isArray(ex.choices) ? ex.choices : [];
    btnGrid.style.removeProperty("--max-cols");
    const gridWrap = document.createElement("div");
    gridWrap.className = `nts-choices-grid${ex.promptKind === "flow-order" ? " is-flow" : ""}${ex.promptKind === "meaning-to-symbol" ? " is-svg" : ""}`;
    choices.forEach(choiceKey => {
      const meta = ex.symbolChoiceMeta?.[choiceKey] || { key: choiceKey, short: choiceKey };
      const btn = document.createElement("button");
      btn.className = "degree-btn nts-choice-btn";
      btn.dataset.choice = choiceKey;

      if (meta.isSvgChoice) {
        btn.classList.add("is-svg-tile");
        btn.innerHTML = `<div class="nts-choice-svg-wrap" dir="ltr">${buildNotationSymbolSVG(meta.svgKey, { compact: true })}</div>`;
        btn.setAttribute("aria-label", meta.term || choiceKey);
      } else if (meta.isFlowOrder) {
        btn.classList.add("is-flow-tile");
        const span = document.createElement("span");
        span.className = "nts-choice-flow-text";
        span.setAttribute("dir", "ltr");
        span.textContent = meta.text || choiceKey;
        btn.appendChild(span);
      } else {
        btn.classList.add("is-text-tile");
        const span = document.createElement("span");
        span.className = "nts-choice-meaning-text";
        span.textContent = meta.short || choiceKey;
        btn.appendChild(span);
      }

      btn.addEventListener("click", (e) => handleAnswer(choiceKey, btn, { inputEvent: e }));
      gridWrap.appendChild(btn);
    });
    btnGrid.appendChild(gridWrap);
    return;
  }

  const choices = Array.isArray(ex.choices) ? ex.choices : [];
  const layout = computeBalancedRows(choices);
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
        sym.textContent = item.degreeTag ? item.baseRoman : (item.roman || item.symbol);
      }

      const l = document.createElement("span");
      l.className = "degree-label";
      l.textContent = item.short;

      btn.appendChild(sym);
      if (item.degreeTag) {
        // Modi: Stufe als eigene Zeile, damit lange Namen die Kachel nicht sprengen
        const step = document.createElement("span");
        step.className = "degree-step";
        step.textContent = item.degreeTag;
        btn.appendChild(step);
      }
      btn.appendChild(l);
      btn.addEventListener("click", (e) => handleAnswer(choiceKey, btn, { inputEvent: e }));
      rowEl.appendChild(btn);
    });

    btnGrid.appendChild(rowEl);
  });
  if (useCompactNames) fitChoiceNamesToTiles(btnGrid);
}

// Lange Namen (z. B. Modi auf Ukrainisch oder Akkordsymbole) einheitlich verkleinern
function fitChoiceNamesToTiles(grid) {
  if (!grid) return;
  const names = [...grid.querySelectorAll(".degree-btn .degree-roman")];
  names.forEach(name => { name.style.fontSize = ""; });
  let scale = 1;
  names.forEach(name => {
    const avail = name.closest(".degree-btn").clientWidth - 6;
    if (avail > 0 && name.scrollWidth > avail) scale = Math.min(scale, avail / name.scrollWidth);
  });
  if (scale >= 1 || !names.length) return;
  const base = parseFloat(getComputedStyle(names[0]).fontSize) || 14;
  const size = `${Math.max(9, Math.floor(base * scale * 10) / 10)}px`;
  names.forEach(name => { name.style.fontSize = size; });
}

window.addEventListener("resize", () => {
  const grid = document.getElementById("degreeButtonsGrid");
  if (grid && !grid.classList.contains("hidden") && (grid.querySelector(".degree-step") || grid.classList.contains("grid-chords"))) fitChoiceNamesToTiles(grid);
});


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

  prepareAudioNonBlocking();

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

  prepareAudioNonBlocking();

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

/** Liefert die kontextabhängige Beschriftung des zweiten Diagnose-Buttons bei Fehlern. */
function getDiagBassButtonLabel(ex) {
  const type = ex?.type || "";
  if (type.startsWith("rhythm-")) return tr("Puls / Eins hören", "Hear Pulse / One");
  if (type === "prod-eq-noise") return tr("Flat → Ziel-EQ", "Flat → Target EQ");
  if (type === "prod-tone") return tr("Ref: 1 kHz", "Ref: 1 kHz");
  if (type.startsWith("modes-")) return tr("Anker-Quinte", "Anchor Fifth");
  if (type === "chord-inversions") return tr("Basston hören", "Hear Bass Note");
  if (type === "interval-drone") return tr("Fläche hören", "Hear Root Pad");
  return tr("Bass / Grundton", "Bass / Root");
}

/** Aktualisiert Text, Werkzeug-Button, Sichtbarkeit und Fit-Layout der „Gewählt“-Feedbackkarte. */
function renderWrongChoiceFeedbackCard(ex, chosenDef, fallbackKey = "?", showCard = true) {
  const diagBassBtn = document.getElementById("btnDiagBass");
  if (diagBassBtn) {
    diagBassBtn.textContent = getDiagBassButtonLabel(ex);
  }
  const fbText = document.getElementById("feedbackText");
  if (fbText && chosenDef) {
    fbText.textContent = tf("Gewählt: {sym} ({lbl}).", "Selected: {sym} ({lbl}).", {
      sym: chosenDef.roman || chosenDef.symbol || fallbackKey,
      lbl: chosenDef.label || fallbackKey
    });
  }
  const fb = document.getElementById("feedbackContainer");
  if (fb && showCard) {
    fb.classList.remove("hidden");
  }
  if (typeof fitExerciseLayout === "function") {
    fitExerciseLayout(false);
  }
}
