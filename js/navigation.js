/**
 * Lauscher • Navigation, History, Capacitor-Bridge, Über-Fenster, Wissens-Hub & Kategorienseiten
 */

function stopWaveAnimation() {
  if (state.waveAnimFrame) {
    cancelAnimationFrame(state.waveAnimFrame);
    state.waveAnimFrame = null;
  }
  state.waveResume = null;
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

function isRunningInNativeApp() {
  if (typeof window !== "undefined" && window.Capacitor) {
    if (typeof window.Capacitor.isNativePlatform === "function") {
      return Boolean(window.Capacitor.isNativePlatform());
    }
    if (window.Capacitor.isNative) return true;
  }
  return Boolean(typeof getCapacitorNativePlugin === "function" && getCapacitorNativePlugin("App"));
}

function renderAboutModalContent() {
  // Kopf zeigt das App-Icon (Squircle, reines CSS) – nichts zu rendern
  document.getElementById("aboutPlaceholderNotice")?.classList.add("hidden");
  document.getElementById("aboutContactFallback")?.classList.add("hidden");
  document.querySelector('[data-about-action="rate"]')?.classList.toggle("hidden", !ABOUT_RATE_ENABLED);
  document.querySelector('[data-about-action="donate"]')?.classList.toggle("hidden", !ABOUT_SUPPORT_ENABLED);
  const isNative = isRunningInNativeApp();
  document.querySelector('[data-about-action="web-version"]')?.classList.toggle("hidden", !isNative);
  document.querySelector('[data-about-action="get-app"]')?.classList.toggle("hidden", isNative);
  renderAboutVersionBadge();
  showAboutMainPane();
}

// ---------- Über-Fenster: Rechtstexte (Datenschutz, Nutzungsbedingungen & Lizenzen) ----------
// Texte kommen aus legal.js (gleiche Quelle wie privacy.html, terms.html & licenses.html).
// Die Ansicht ersetzt im Über-Fenster Kopf und Link-Liste; „Zurück“ (Knopf, Android-Taste)
// führt zur Übersicht, das ✕ schließt das ganze Fenster.

function isAboutLegalOpen() {
  const pane = document.getElementById("aboutLegalPane");
  return Boolean(pane && !pane.classList.contains("hidden") && getOpenModalName() === "about");
}

function showAboutMainPane() {
  document.getElementById("aboutLegalPane")?.classList.add("hidden");
  document.querySelector("#aboutBackdrop .about-modal-body")?.classList.remove("is-legal-open");
}

function openAboutLegal(kind = "privacy") {
  if (typeof getLegalDocument !== "function") return;
  const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
  const doc = getLegalDocument(kind, lang);
  if (!doc) return;
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text || "";
  };
  setText("aboutLegalBackBtn", `← ${tr("Zurück", "Back", { fr: "Retour", es: "Volver", pl: "Wstecz", uk: "Назад", ur: "واپس" })}`);
  setText("aboutLegalTitle", doc.title);
  setText("aboutLegalMeta", doc.updated);
  const draftEl = document.getElementById("aboutLegalDraft");
  if (draftEl) {
    draftEl.textContent = doc.draftNotice || "";
    draftEl.classList.toggle("hidden", !doc.isDraft);
  }
  const langEl = document.getElementById("aboutLegalLangNotice");
  if (langEl) {
    langEl.textContent = doc.langNotice || "";
    langEl.classList.toggle("hidden", !doc.langNotice);
  }
  const content = document.getElementById("aboutLegalContent");
  if (content) {
    content.innerHTML = doc.html;
    content.setAttribute("lang", doc.lang);
    content.setAttribute("dir", "ltr");
    content.querySelectorAll("[data-legal-nav]").forEach(link => {
      link.addEventListener("click", (e) => {
        const targetKind = link.dataset.legalNav;
        if (!targetKind) return;
        e.preventDefault();
        openAboutLegal(targetKind);
      });
    });
  }
  const onlineLink = document.getElementById("aboutLegalOnlineLink");
  const onlineRow = onlineLink?.closest(".about-legal-link-row");
  const baseUrl = doc.onlineUrl || (kind === "privacy" && typeof LAUSCHER_PRIVACY_URL === "string" ? LAUSCHER_PRIVACY_URL : "");
  if (onlineLink && baseUrl) {
    onlineLink.href = doc.lang === "en" ? `${baseUrl}?lang=en` : baseUrl;
    onlineLink.textContent = `${tr("Online-Fassung öffnen", "Open online version", { fr: "Ouvrir la version en ligne", es: "Abrir la versión en línea", pl: "Otwórz wersję online", uk: "Відкрити онлайн-версію", ur: "آن لائن ورژن کھولیں" })} ↗`;
    onlineRow?.classList.remove("hidden");
  } else {
    onlineRow?.classList.add("hidden");
  }

  document.getElementById("aboutPlaceholderNotice")?.classList.add("hidden");
  document.getElementById("aboutContactFallback")?.classList.add("hidden");
  const body = document.querySelector("#aboutBackdrop .about-modal-body");
  body?.classList.add("is-legal-open");
  document.getElementById("aboutLegalPane")?.classList.remove("hidden");
  if (body) body.scrollTop = 0;
}

function closeAboutLegal() {
  if (!isAboutLegalOpen()) return;
  showAboutMainPane();
  const body = document.querySelector("#aboutBackdrop .about-modal-body");
  if (body) body.scrollTop = 0;
}

// ---------- Über-Fenster: Aktionen ----------
// Kontakt läuft über eine Weiterleitungs-Adresse (Alias), damit die private Adresse verborgen bleibt.
const LAUSCHER_CONTACT_EMAIL = "lauscher.privacy772@passfwd.com";
// „App bewerten“ erst einblenden, wenn Lauscher in den App-Stores ist (dann Store-Link in handleAboutAction ergänzen).
const ABOUT_RATE_ENABLED = false;
// Freiwillige Unterstützung (Ko-fi). Bei späterer Store-Einreichung prüfen, ob externe Links zulässig sind.
const LAUSCHER_SUPPORT_URL = "https://ko-fi.com/lauscher";
const ABOUT_SUPPORT_ENABLED = true;

function handleAboutAction(action) {
  document.getElementById("aboutPlaceholderNotice")?.classList.add("hidden");
  document.getElementById("aboutContactFallback")?.classList.add("hidden");
  if (action === "contact") {
    openContactMail();
    return;
  }
  if (action === "donate") {
    openSupportPage();
    return;
  }
  if (action === "privacy") {
    openAboutLegal("privacy");
    return;
  }
  if (action === "terms") {
    openAboutLegal("terms");
    return;
  }
  if (action === "licenses") {
    openAboutLegal("licenses");
    return;
  }
  if (action === "share") {
    shareLauscherApp();
    return;
  }
  if (action === "web-version") {
    openWebVersionPage();
    return;
  }
  // Noch nicht verknüpfte Einträge (u. a. "get-app" als Platzhalter für spätere App-Store-Links)
  document.getElementById("aboutPlaceholderNotice")?.classList.remove("hidden");
}

function getAppVersionInfo() {
  const v = typeof LAUSCHER_VERSION !== "undefined" ? LAUSCHER_VERSION : null;
  return {
    name: String(v?.name || ""),
    build: Number.isFinite(Number(v?.build)) ? Number(v.build) : 0,
    date: String(v?.date || "")
  };
}

// z. B. "0.9.0-beta (Build 1)"
function getAppVersionLabel() {
  const { name, build } = getAppVersionInfo();
  if (!name) return "";
  return build ? `${name} (Build ${build})` : name;
}

function renderAboutVersionBadge() {
  const badge = document.getElementById("aboutVersionBadge");
  if (!badge) return;
  const word = (typeof getStaticI18nText === "function" ? getStaticI18nText("about.version") : "") || "Version";
  const label = getAppVersionLabel();
  badge.textContent = label ? `${word} ${label}` : word;
}

function buildContactMailUrl() {
  const subject = tr("Lauscher – Nachricht", "Lauscher – Message", {
    fr: "Lauscher – Message",
    es: "Lauscher – Mensaje",
    pl: "Lauscher – Wiadomość",
    uk: "Lauscher – Повідомлення",
    ur: "Lauscher – پیغام"
  });
  const greeting = tr("Hallo,", "Hi,", { fr: "Bonjour,", es: "Hola:", pl: "Cześć,", uk: "Привіт,", ur: "السلام علیکم،" });
  const isNativeApp = Boolean(getCapacitorNativePlugin("App"));
  const platform = isNativeApp
    ? tr("Android-App", "Android app", { fr: "Application Android", es: "App de Android", pl: "Aplikacja Android", uk: "Android-застосунок", ur: "اینڈرائیڈ ایپ" })
    : tr("Browser", "Browser", { fr: "Navigateur", es: "Navegador", pl: "Przeglądarka", uk: "Браузер", ur: "براؤزر" });
  const version = getAppVersionLabel();
  const lang = typeof getAppLanguage === "function" ? getAppLanguage() : "de";
  const infoLine = [version ? `Lauscher ${version}` : "Lauscher", platform, lang.toUpperCase()].join(" · ");
  const body = `${greeting}\n\n\n\n—\n${infoLine}`;
  return `mailto:${LAUSCHER_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function openContactMail() {
  const url = buildContactMailUrl();
  // Android-App: Capacitor leitet mailto: als Intent an das Mail-Programm weiter; Browser öffnen den Standard-Mailer.
  const a = document.createElement("a");
  a.href = url;
  a.rel = "noopener";
  document.body?.appendChild?.(a);
  a.click?.();
  a.remove?.();
  showContactFallback();
}

function showContactFallback() {
  showAboutCopyFallback({
    message: tr(
      "Falls sich kein Mail-Programm geöffnet hat, schreib einfach an:",
      "If no mail app opened, just write to:",
      {
        fr: "Si aucune application de messagerie ne s’est ouverte, écris simplement à :",
        es: "Si no se ha abierto ninguna app de correo, escribe a:",
        pl: "Jeśli nie otworzyła się aplikacja pocztowa, napisz po prostu na:",
        uk: "Якщо поштовий застосунок не відкрився, просто напиши на:",
        ur: "اگر کوئی میل ایپ نہیں کھلی تو اس پتے پر لکھیں:"
      }
    ),
    value: LAUSCHER_CONTACT_EMAIL,
    kind: "address"
  });
}

// Hinweis-Box unter der Link-Liste: Text + kopierbarer Wert (Mail-Adresse oder Link)
function showAboutCopyFallback({ message = "", value = "", kind = "address" } = {}) {
  const box = document.getElementById("aboutContactFallback");
  if (!box) return;
  box.dataset.copyValue = value;
  box.dataset.copyKind = kind;
  const text = document.getElementById("aboutContactFallbackText");
  if (text) text.textContent = message;
  const addr = document.getElementById("aboutContactAddress");
  if (addr) addr.textContent = value;
  const copyBtn = document.getElementById("aboutCopyContactBtn");
  if (copyBtn) copyBtn.textContent = getCopyContactLabel(false, kind);
  document.getElementById("aboutShareTargets")?.classList.add("hidden");
  box.classList.remove("hidden");
}

function getCopyContactLabel(copied, kind = "address") {
  if (copied) {
    return tr("✓ Kopiert", "✓ Copied", { fr: "✓ Copié", es: "✓ Copiado", pl: "✓ Skopiowano", uk: "✓ Скопійовано", ur: "✓ کاپی ہو گیا" });
  }
  return kind === "link"
    ? tr("Link kopieren", "Copy link", { fr: "Copier le lien", es: "Copiar enlace", pl: "Kopiuj link", uk: "Копіювати посилання", ur: "لنک کاپی کریں" })
    : tr("Adresse kopieren", "Copy address", { fr: "Copier l’adresse", es: "Copiar dirección", pl: "Kopiuj adres", uk: "Копіювати адресу", ur: "پتہ کاپی کریں" });
}

async function copyTextToClipboard(value, selectEl = null) {
  let ok = false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      ok = true;
    }
  } catch (_e) {}
  if (!ok && selectEl) {
    // Rückfall: Text markieren, damit er per Systemmenü kopiert werden kann
    const sel = window.getSelection?.();
    if (sel && document.createRange) {
      const range = document.createRange();
      range.selectNodeContents(selectEl);
      sel.removeAllRanges();
      sel.addRange(range);
      try { ok = document.execCommand?.("copy") || false; } catch (_e) {}
    }
  }
  return ok;
}

async function copyContactAddressToClipboard() {
  const box = document.getElementById("aboutContactFallback");
  const btn = document.getElementById("aboutCopyContactBtn");
  const value = box?.dataset.copyValue || LAUSCHER_CONTACT_EMAIL;
  const kind = box?.dataset.copyKind || "address";
  const ok = await copyTextToClipboard(value, document.getElementById("aboutContactAddress"));
  if (btn && ok) {
    btn.textContent = getCopyContactLabel(true, kind);
    setTimeout(() => { btn.textContent = getCopyContactLabel(false, kind); }, 1800);
  }
}

// ---------- Über-Fenster: Lauscher teilen ----------
// Solange Lauscher nicht in den App-Stores ist, zeigt der Link auf die GitHub-Releases (Android-APK).
// Bewusst /releases statt /releases/latest: „latest“ ignoriert Vorabversionen (Beta) und wäre dann leer.
const LAUSCHER_SHARE_URL = "https://github.com/jbkstr/lauscher/releases";

function getShareLauscherText() {
  return tr(
    "Lauscher – ruhiges Gehörtraining ohne Werbung und Tracking. Hier gibt es die Android-App:",
    "Lauscher – calm ear training without ads or tracking. Get the Android app here:",
    {
      fr: "Lauscher – un entraînement de l’oreille au calme, sans pub ni pistage. L’application Android est ici :",
      es: "Lauscher: entrenamiento auditivo tranquilo, sin anuncios ni rastreo. Aquí tienes la app para Android:",
      pl: "Lauscher – spokojny trening słuchu bez reklam i śledzenia. Aplikacja na Androida jest tutaj:",
      uk: "Lauscher – спокійне тренування слуху без реклами й стеження. Застосунок для Android тут:",
      ur: "Lauscher – اشتہارات اور ٹریکنگ کے بغیر پُرسکون سماعتی تربیت۔ اینڈرائیڈ ایپ یہاں ملے گی:"
    }
  );
}

// Direkte Ziele (E-Mail, WhatsApp, Telegram) für Geräte ohne eigenes Teilen-Fenster
function renderAboutShareTargets(text, url) {
  const wrap = document.getElementById("aboutShareTargets");
  if (!wrap) return;
  const message = `${text} ${url}`;
  const mail = document.getElementById("aboutShareMail");
  if (mail) {
    mail.textContent = tr("E-Mail", "Email", { fr: "E-mail", es: "Correo", pl: "E-mail", uk: "Ел. пошта", ur: "ای میل" });
    mail.href = `mailto:?subject=${encodeURIComponent("Lauscher")}&body=${encodeURIComponent(message)}`;
    mail.removeAttribute("target");
  }
  const wa = document.getElementById("aboutShareWhatsApp");
  if (wa) wa.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const tg = document.getElementById("aboutShareTelegram");
  if (tg) tg.href = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  wrap.classList.remove("hidden");
}

async function shareLauscherApp() {
  const title = "Lauscher";
  const text = getShareLauscherText();
  const sharePlugin = getCapacitorNativePlugin("Share");
  try {
    if (sharePlugin) {
      await sharePlugin.share({ title, text, url: LAUSCHER_SHARE_URL, dialogTitle: tr("Lauscher teilen", "Share Lauscher", { fr: "Partager Lauscher", es: "Compartir Lauscher", pl: "Udostępnij Lauscher", uk: "Поділитися Lauscher", ur: "Lauscher شیئر کریں" }) });
      return;
    }
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      await navigator.share({ title, text, url: LAUSCHER_SHARE_URL });
      return;
    }
  } catch (err) {
    if (isShareCancelError(err)) return; // Nutzer hat das Teilen-Menü geschlossen
  }
  // Kein Teilen-Menü (z. B. Desktop-Browser): Link kopieren und anzeigen
  const copied = await copyTextToClipboard(LAUSCHER_SHARE_URL);
  if (copied) {
    showAppToast(`✓ ${tr("Link zu Lauscher kopiert", "Link to Lauscher copied", { fr: "Lien vers Lauscher copié", es: "Enlace a Lauscher copiado", pl: "Skopiowano link do Lauscher", uk: "Посилання на Lauscher скопійовано", ur: "Lauscher کا لنک کاپی ہو گیا" })}`, "success");
  }
  showAboutCopyFallback({
    message: tr(
      "Dein Gerät bietet hier kein Teilen-Fenster an. Schick den Link direkt weiter oder kopiere ihn:",
      "Your device doesn’t offer a share window here. Send the link directly or copy it:",
      {
        fr: "Ton appareil ne propose pas de fenêtre de partage ici. Envoie le lien directement ou copie-le :",
        es: "Tu dispositivo no ofrece aquí una ventana para compartir. Envía el enlace directamente o cópialo:",
        pl: "Twoje urządzenie nie oferuje tu okna udostępniania. Wyślij link bezpośrednio albo go skopiuj:",
        uk: "Твій пристрій тут не пропонує вікна «Поділитися». Надішли посилання напряму або скопіюй його:",
        ur: "آپ کا آلہ یہاں شیئر کرنے کی ونڈو نہیں دیتا۔ لنک سیدھا بھیجیں یا کاپی کریں:"
      }
    ),
    value: LAUSCHER_SHARE_URL,
    kind: "link"
  });
  renderAboutShareTargets(text, LAUSCHER_SHARE_URL);
}

// ---------- Über-Fenster: Lauscher unterstützen (Ko-fi) ----------
function openSupportPage() {
  const a = document.createElement("a");
  a.href = LAUSCHER_SUPPORT_URL;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body?.appendChild?.(a);
  a.click?.();
  a.remove?.();
  showAboutCopyFallback({
    message: tr(
      "Falls sich die Unterstützungs-Seite nicht automatisch geöffnet hat, findest du sie hier:",
      "If the support page didn’t open automatically, you can find it here:",
      {
        fr: "Si la page de soutien ne s’est pas ouverte automatiquement, tu la trouveras ici :",
        es: "Si la página de apoyo no se abrió automáticamente, la encontrarás aquí:",
        pl: "Jeśli strona wsparcia nie otworzyła się automatycznie, znajdziesz ją tutaj:",
        uk: "Якщо сторінка підтримки не відкрилася автоматично, її можна знайти тут:",
        ur: "اگر سپورٹ صفحہ خودکار طور پر نہیں کھلا تو آپ اسے یہاں کھول سکتے ہیں:"
      }
    ),
    value: LAUSCHER_SUPPORT_URL,
    kind: "link"
  });
}

const LAUSCHER_WEB_URL = "https://jbkstr.github.io/lauscher/";

function openWebVersionPage() {
  const a = document.createElement("a");
  a.href = LAUSCHER_WEB_URL;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body?.appendChild?.(a);
  a.click?.();
  a.remove?.();
  showAboutCopyFallback({
    message: tr(
      "Falls sich die Webversion nicht automatisch geöffnet hat, findest du sie hier:",
      "If the web version didn’t open automatically, you can find it here:",
      {
        fr: "Si la version web ne s’est pas ouverte automatiquement, tu la trouveras ici :",
        es: "Si la versión web no se abrió automáticamente, la encontrarás aquí:",
        pl: "Jeśli wersja przeglądarkowa nie otworzyła się automatycznie, znajdziesz ją tutaj:",
        uk: "Якщо вебверсія не відкрилася автоматично, її можна знайти тут:",
        ur: "اگر ویب ورژن خودکار طور پر نہیں کھلا تو آپ اسے یہاں کھول سکتے ہیں:"
      }
    ),
    value: LAUSCHER_WEB_URL,
    kind: "link"
  });
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
  if (modalName !== "settings") {
    if (state.appResetConfirmArmed && typeof disarmAppResetConfirm === "function") {
      disarmAppResetConfirm();
    }
    if (typeof _openProfileDropdownKey !== "undefined" && _openProfileDropdownKey === "settings-language") {
      _openProfileDropdownKey = null;
      if (typeof renderSettingsLanguageDropdown === "function") renderSettingsLanguageDropdown();
    }
  } else if (typeof renderSettingsLanguageDropdown === "function") {
    renderSettingsLanguageDropdown();
  }
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
    ["inlineModesRootPopover", "targetBarBadge"],
    ["inlineModesPadPopover", "modesPadBtn"],
    ["warmupVoicePopover", "warmupVoiceBtn"],
    ["warmupSoundPopover", "warmupSoundBtn"],
    ["warmupBpmPopover", "warmupBpmBtn"]
  ].forEach(([popId, btnId]) => {
    if (document.getElementById(popId)?.classList.contains("is-pinned")) return;
    document.getElementById(popId)?.classList.add("hidden");
    document.getElementById(btnId)?.classList.remove("chip-open");
  });
  if (typeof closeTunerDropdowns === "function") closeTunerDropdowns();
  if (typeof closeCapoDropdowns === "function") closeCapoDropdowns();
  if (_openProfileDropdownKey) {
    const prevKey = _openProfileDropdownKey;
    _openProfileDropdownKey = null;
    if (typeof renderProfileAccountView === "function") renderProfileAccountView();
    if (typeof renderMixCreatorDropdowns === "function") renderMixCreatorDropdowns();
    if (prevKey === "settings-language" && typeof renderSettingsLanguageDropdown === "function") {
      renderSettingsLanguageDropdown();
    }
  }
}

function captureHistorySnapshot(modalName = getOpenModalName()) {
  return {
    idx: appHistoryState.idx,
    view: state.currentView,
    activeCategory: state.activeCategory,
    activeCategorySection: state.activeCategorySection || null,
    examSetupCategory: state.examSetupCategory,
    examResultReturnView: state.examResultReturnView,
    activeExamResultId: state.activeExamResultId,
    knowledgeTab: state.activeKnowledgeTab,
    knowledgeDetail: state.activeKnowledgeDetail ? { ...state.activeKnowledgeDetail } : null,
    exerciseReturnView: state.exerciseReturnView,
    warmupReturnView: state.warmupReturnView,
    metronomeReturnView: state.metronomeReturnView,
    tunerReturnView: state.tunerReturnView,
    freeplayReturnView: state.freeplayReturnView,
    fretboardReturnView: state.fretboardReturnView,
    circleReturnView: state.circleReturnView,
    capoReturnView: state.capoReturnView,
    nashvilleReturnView: state.nashvilleReturnView,
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
    if (snapshot.tunerReturnView) {
      state.tunerReturnView = snapshot.tunerReturnView;
    }
    if (snapshot.freeplayReturnView) {
      state.freeplayReturnView = snapshot.freeplayReturnView;
    }
    if (snapshot.fretboardReturnView) {
      state.fretboardReturnView = snapshot.fretboardReturnView;
    }
    if (snapshot.circleReturnView) {
      state.circleReturnView = snapshot.circleReturnView;
    }
    if (snapshot.capoReturnView) {
      state.capoReturnView = snapshot.capoReturnView;
    }
    if (snapshot.nashvilleReturnView) {
      state.nashvilleReturnView = snapshot.nashvilleReturnView;
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
    const targetSection = snapshot.activeCategorySection || null;
    const categoryStateChanged = targetView === "category" &&
      (snapshot.activeCategory !== state.activeCategory || targetSection !== (state.activeCategorySection || null));
    const swipeDir = pendingSwipeDir;
    pendingSwipeDir = null;

    if (viewChanged || categoryStateChanged) {
      if (targetView === "category" && snapshot.activeCategory) {
        openCategoryPage(snapshot.activeCategory, { sectionId: targetSection, skipHistoryPush: true });
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
  const examBanner = document.getElementById("examAbortConfirmBanner");
  if (state.currentView === "exercise" && state.exam?.active) {
    if (examBanner && !examBanner.classList.contains("hidden")) {
      cancelExamAbort();
      return;
    }
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
    switchView(state.metronomeReturnView || "tools", { skipHistoryPush: true });
  } else if (state.currentView === "tuner") {
    switchView(state.tunerReturnView || "tools", { skipHistoryPush: true });
  } else if (state.currentView === "freeplay") {
    switchView(state.freeplayReturnView || "tools", { skipHistoryPush: true });
  } else if (state.currentView === "fretboard") {
    switchView(state.fretboardReturnView || "tools", { skipHistoryPush: true });
  } else if (state.currentView === "circle") {
    switchView(state.circleReturnView || "tools", { skipHistoryPush: true });
  } else if (state.currentView === "capo") {
    switchView(state.capoReturnView || "tools", { skipHistoryPush: true });
  } else if (state.currentView === "nashville") {
    switchView(state.nashvilleReturnView || "tools", { skipHistoryPush: true });
  } else if (state.currentView === "exam-result") {
    switchView(state.examResultReturnView || "exam-setup", { skipHistoryPush: true });
  } else if (state.currentView === "exam-setup") {
    openCategoryPage(state.examSetupCategory || state.activeCategory, { sectionId: null, skipHistoryPush: true });
  } else if (state.currentView === "knowledge-detail") {
    switchView(state.knowledgeReturnView || "knowledge", { skipHistoryPush: true });
  } else if (state.currentView === "category-help") {
    openCategoryPage(state.activeCategory, { sectionId: null, skipHistoryPush: true });
  } else if (state.currentView === "category" && state.activeCategorySection) {
    openCategoryPage(state.activeCategory, { sectionId: null, skipHistoryPush: true });
  } else {
    switchView("home", { skipHistoryPush: true });
  }
}

function hasOpenTransientPopover() {
  return [
    "masterVolPopover",
    "inlineBpmPopover",
    "inlineKeyPopover",
    "inlineNotationKeyPopover",
    "inlineNotationPacePopover",
    "inlineTimeSigPopover",
    "inlineModesRootPopover",
    "inlineModesPadPopover",
    "warmupVoicePopover",
    "warmupSoundPopover",
    "warmupBpmPopover"
  ].some(id => {
    const el = document.getElementById(id);
    return Boolean(el && !el.classList.contains("hidden") && !el.classList.contains("is-pinned"));
  }) || Boolean(typeof _tuner !== "undefined" && _tuner.openDropdown) || Boolean(typeof _capoOpenDropdown !== "undefined" && _capoOpenDropdown) || Boolean(typeof _openProfileDropdownKey !== "undefined" && _openProfileDropdownKey);
}

function minimizeOrExitNativeApp() {
  stopPlayback();
  if (typeof syncNativeStorageMirror === "function") {
    syncNativeStorageMirror(true);
  }
  const capApp = typeof window !== "undefined" ? window.Capacitor?.Plugins?.App : null;
  if (!capApp) return false;
  // minimizeApp() nutzt Androids moveTaskToBack(true) statt Activity.finish():
  // Die WebView bleibt intakt und Chromium flusht localStorage sauber auf Disk,
  // statt bei schnellem Beenden einen ungewollten App-Reset auszulösen.
  if (typeof capApp.minimizeApp === "function") {
    Promise.resolve(capApp.minimizeApp()).catch(() => {});
    return true;
  }
  if (typeof capApp.exitApp === "function") {
    capApp.exitApp();
    return true;
  }
  return false;
}

function handleNativeBackButton() {
  const welcome = document.getElementById("welcomeOnboarding");
  if (welcome && !welcome.classList.contains("hidden")) {
    if (_welcomeOnboardingState.currentStep > 0) {
      goToWelcomeStep(_welcomeOnboardingState.currentStep - 1);
      return true;
    }
    return minimizeOrExitNativeApp();
  }

  if (getOpenModalName()) {
    if (getOpenModalName() === "settings" && typeof _openProfileDropdownKey !== "undefined" && _openProfileDropdownKey === "settings-language") {
      _openProfileDropdownKey = null;
      if (typeof renderSettingsLanguageDropdown === "function") renderSettingsLanguageDropdown();
      return true;
    }
    if (getOpenModalName() === "about" && isAboutLegalOpen()) {
      closeAboutLegal();
      return true;
    }
    closeActiveModal();
    return true;
  }

  if (hasOpenTransientPopover()) {
    closeTransientPopovers();
    return true;
  }

  const examBanner = document.getElementById("examAbortConfirmBanner");
  if (examBanner && !examBanner.classList.contains("hidden")) {
    cancelExamAbort();
    return true;
  }

  if (state.currentView !== "home") {
    navigateBackFromUI();
    return true;
  }

  return minimizeOrExitNativeApp();
}

function syncNativeSystemBars(effectiveAppearance = null) {
  const sysBars = typeof window !== "undefined" ? window.Capacitor?.Plugins?.SystemBars : null;
  if (!sysBars || typeof sysBars.setStyle !== "function") return;
  const resolved = effectiveAppearance
    || (typeof document !== "undefined" ? document.documentElement?.getAttribute("data-appearance") : null)
    || "light";
  // Capacitor SystemBars: "LIGHT" = helle App-Oberfläche (dunkle Indikatoren), "DARK" = dunkle App (helle Indikatoren)
  const targetStyle = resolved === "dark" ? "DARK" : "LIGHT";
  Promise.resolve(sysBars.setStyle({ style: targetStyle })).catch(() => {});
}

function initCapacitorNativeBridge() {
  syncNativeSystemBars();
  const capApp = typeof window !== "undefined" ? window.Capacitor?.Plugins?.App : null;
  if (!capApp || typeof capApp.addListener !== "function") return;
  if (initCapacitorNativeBridge._bound) return;
  initCapacitorNativeBridge._bound = true;

  // Android Hardware-Zurück-Button & System-Zurück-Wischgeste über @capacitor/app abfangen
  capApp.addListener("backButton", () => {
    handleNativeBackButton();
  });

  // Laufende Audio-Sessions beim Wechseln der App pausieren/stoppen und Systemleiste abgleichen
  capApp.addListener("appStateChange", ({ isActive } = {}) => {
    if (isActive === false) {
      if (typeof syncNativeStorageMirror === "function") syncNativeStorageMirror(true);
      stopPlayback();
      if (typeof stopMetronome === "function") stopMetronome();
      if (typeof pauseWarmupSession === "function") pauseWarmupSession({ keepPlayback: false });
      if (typeof stopTunerSession === "function") stopTunerSession();
      if (typeof stopFreeplaySession === "function") stopFreeplaySession();
      if (typeof stopFretboardSession === "function") stopFretboardSession();
      stopBreakReminderTicker();
    } else if (isActive === true) {
      syncNativeSystemBars();
      if (state?.currentView === "exercise" && state.breakReminder?.pausedOnBreak === false && state.profile?.breakReminderEnabled) {
        state.breakReminder.lastActivityWallMs = Date.now();
        startBreakReminderTicker();
      }
    }
  });
}

const MAIN_TAB_ORDER = ["home", "tools", "knowledge", "space"];
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
  if (view === "tools" || view === "metronome" || view === "tuner" || view === "freeplay" || view === "fretboard" || view === "circle" || view === "capo" || view === "nashville") return "tools";
  if (view === "exam-result") return state.examResultReturnView === "space" ? "space" : "home";
  if (view === "knowledge" || view === "knowledge-detail") return "knowledge";
  if (view === "space") return "space";
  return null;
}

function getViewOrderInfo(view) {
  const tab = getTabForView(view) || "home";
  const tabIdx = MAIN_TAB_ORDER.indexOf(tab);
  let depth = 0;
  if (view === "category" || view === "knowledge-detail" || view === "metronome" || view === "tuner" || view === "freeplay" || view === "fretboard" || view === "circle" || view === "capo" || view === "nashville") depth = 1;
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
  if (viewEl._enterAnimCleanup) {
    viewEl._enterAnimCleanup();
  }
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
  const enterClass = visualDir === "next" ? "view-enter-from-right" : "view-enter-from-left";
  viewEl.classList.add(enterClass);
  const cleanup = () => {
    if (viewEl._enterAnimCleanup !== cleanup) return;
    viewEl._enterAnimCleanup = null;
    clearTimeout(fallbackTimer);
    viewEl.removeEventListener?.("animationend", onEnd);
    viewEl.classList.remove("view-enter-from-right", "view-enter-from-left");
  };
  const onEnd = (ev) => {
    if (ev && ev.target !== viewEl) return;
    cleanup();
  };
  const fallbackTimer = setTimeout(cleanup, 360);
  viewEl._enterAnimCleanup = cleanup;
  viewEl.addEventListener?.("animationend", onEnd);
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
    (state.currentView === "tools" || state.currentView === "knowledge" || state.currentView === "space" || state.currentView === "category") &&
    canHistory &&
    appHistoryState.idx === 1 &&
    window.history.state?.idx === 1
  ) {
    pendingSwipeDir = swipeDir;
    window.history.back();
    return true;
  }

  if (
    targetTab === "tools" &&
    (state.currentView === "metronome" || state.currentView === "tuner" || state.currentView === "freeplay" || state.currentView === "fretboard" || state.currentView === "circle" || state.currentView === "capo" || state.currentView === "nashville") &&
    canHistory &&
    appHistoryState.idx >= 1 &&
    window.history.state?.idx >= 1
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
    if (node.id === "masterVolPopover" || node.classList?.contains("master-vol-popover")) {
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

function isTabSwipeBlockedView(view) {
  return view === "exercise" || view === "warmup" || view === "metronome" || view === "tuner" || view === "freeplay" || view === "fretboard" || view === "circle" || view === "capo" || view === "nashville";
}

function handleHorizontalTabSwipe({ startX, startY, endX, endY, durationMs, viewportWidth, target }) {
  if (isTabSwipeBlockedView(state.currentView)) return false;
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
    if (isTabSwipeBlockedView(state.currentView) || getOpenModalName() !== null) {
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
  // Feste Standardtempi je Übungsart:
  // Kadenz & Solfège: 120 BPM, Akkord-Arpeggien: 80 BPM, übrige Übungen: 90 BPM
  if (isCadenceMode(mode)) return CADENCE_DEFAULT_BPM;
  if (mode === "solfege") return SOLFEGE_DEFAULT_BPM;
  if (isChordArpeggioMode(mode)) return CHORD_ARPEGGIO_DEFAULT_BPM;
  return EXERCISE_DEFAULT_BPM;
}

function switchView(targetView, options = {}) {
  const prevView = state.currentView;
  if (typeof state.listenOnly === "object" && state.listenOnly.active && (targetView !== "exercise" || prevView !== "exercise")) {
    setListenOnlyMode(false, { keepPlayback: true });
  }
  if (prevView === "exercise" && targetView !== "exercise" && typeof stopExerciseTutorial === "function") {
    stopExerciseTutorial({ keepPlayback: true });
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
  if (prevView === "tuner" && targetView !== "tuner" && typeof stopTunerSession === "function") {
    stopTunerSession();
  }
  if (prevView === "freeplay" && targetView !== "freeplay" && typeof stopFreeplaySession === "function") {
    stopFreeplaySession();
  }
  if (prevView === "fretboard" && targetView !== "fretboard" && typeof stopFretboardSession === "function") {
    stopFretboardSession();
  }
  if (prevView === "space" && targetView !== "space") {
    state.examHistoryClearArmed = false;
  }
  stopPlayback();
  if (typeof stopNashvillePlayback === "function") {
    stopNashvillePlayback(true);
  }
  stopWaveAnimation();
  closeTransientPopovers();
  dismissModesRootHint(false);
  dismissCadenceKeyHint(false);
  cancelHumPause();
  if (typeof cancelNotationChordAdvance === "function" && state.currentExercise?.isChordReading) {
    cancelNotationChordAdvance(state.currentExercise);
  }
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
    tools: document.getElementById("viewTools"),
    category: document.getElementById("viewCategory"),
    "category-help": document.getElementById("viewCategoryHelp"),
    "exam-setup": document.getElementById("viewExamSetup"),
    "exam-result": document.getElementById("viewExamResult"),
    knowledge: document.getElementById("viewKnowledge"),
    "knowledge-detail": document.getElementById("viewKnowledgeDetail"),
    space: document.getElementById("viewSpace"),
    exercise: document.getElementById("viewExercise"),
    warmup: document.getElementById("viewWarmup"),
    metronome: document.getElementById("viewMetronome"),
    tuner: document.getElementById("viewTuner"),
    freeplay: document.getElementById("viewFreeplay"),
    fretboard: document.getElementById("viewFretboard"),
    circle: document.getElementById("viewCircle"),
    capo: document.getElementById("viewCapo"),
    nashville: document.getElementById("viewNashville")
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

  const isMainTabView = targetView === "home" || targetView === "tools" || targetView === "knowledge" || targetView === "space";
  const activeTab = getTabForView(targetView);
  const showBottomNav = !isTabSwipeBlockedView(targetView);
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
  } else if (targetView === "tuner" && typeof renderTunerPreviewView === "function") {
    renderTunerPreviewView();
  } else if (targetView === "freeplay" && typeof renderFreeplayView === "function") {
    renderFreeplayView();
  } else if (targetView === "fretboard" && typeof renderFretboardView === "function") {
    renderFretboardView();
  } else if (targetView === "circle" && typeof renderCircleOfFifthsView === "function") {
    renderCircleOfFifthsView();
  } else if (targetView === "capo" && typeof renderCapoView === "function") {
    renderCapoView();
  } else if (targetView === "nashville" && typeof renderNashvilleView === "function") {
    renderNashvilleView();
  }

  if (prevView === "exercise" && targetView !== "exercise" && typeof resetExerciseStreakState === "function") {
    resetExerciseStreakState(null);
  }

  if (targetView === "exercise") {
    if (prevView !== "exercise" && !options.fromHistory && typeof resetExerciseStreakState === "function") {
      resetExerciseStreakState(null);
    }
    if (state.exam?.active && !options.skipExamLoad) {
      loadCurrentExamQuestion();
    } else if (!options.fromHistory || !state.currentExercise) {
      generateExercise();
      if (!state.exam?.active && typeof maybeOfferExerciseTutorial === "function") {
        maybeOfferExerciseTutorial(state.currentExercise);
      }
    } else if (state.profileDisplayDirty) {
      renderUI();
    } else if (state.currentExercise?.type === "cadence" && !state.exam?.active) {
      maybeShowCadenceKeyHint(document.getElementById("moduleKeyBtn"));
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
    const secondaryMainTabs = new Set(["tools", "knowledge", "space"]);
    const isMainSwitchBetweenTabs =
      secondaryMainTabs.has(prevView) &&
      secondaryMainTabs.has(targetView) &&
      prevView !== targetView;

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
  // Querverweise wechseln die Seite ohne Ansichtswechsel – laufende Wellen-Animation hier beenden
  stopWaveAnimation();

  if (!options.refreshOnly) {
    state.knowledgeReturnView = options.returnView || (state.currentView === "circle" ? "circle" : "knowledge");
  }
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
    container.innerHTML = `<div class="knowledge-list">${html}</div>`;
    bindKnowledgeAudioButtons(container);

  } else if (refKey === "arranging") {
    state.knowledgeTitle = tr("Arrangieren", "Arranging", {
      fr: "Arrangement",
      es: "Arreglo",
      pl: "Aranżacja",
      uk: "Аранжування",
      ur: "ارینجنگ (ترتیبِ موسیقی)"
    });
    state.knowledgeSub = tr(
      "Wie aus einer Skizze ein lebendiges Gesamtwerk für Band, Chor oder Orchester wird",
      "How a simple sketch turns into a living piece for band, choir, or orchestra",
      {
        fr: "Comment transformer une esquisse en œuvre vivante pour groupe, chœur ou orchestre",
        es: "Cómo un simple boceto se convierte en una obra viva para grupo, coro u orquesta",
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
  "interval-melodic:6",
  "interval-melodic-down:6",
  "interval-harmonic:6",
  "interval-drone:6",
  "chord-arp-up:1",
  "chord-arp-down:1",
  "interval-chords:1",
  "melody:do-fa:fixed:single",
  "solfege:1",
  "solfege:2",
  "solfege:9",
  "rhythm-meter:1",
  "rhythm-dictation:1",
  "rhythm-tap:1",
  "notation-treble:1"
]);

function getExerciseNodeKey(btn) {
  const d = btn?.dataset || {};
  if (d.launchCadence) return `${d.cadenceTonality === "minor" ? "cadence-minor" : "cadence"}:${d.launchCadence}:${d.cadencePos}`;
  if (d.launchInt) return `${d.launchInt}:${d.intLvl}`;
  if (d.launchChord) return `${d.launchChord}:${d.chordLvl}`;
  if (d.launchMelody) return `melody:${d.launchMelody}:${d.melodyKey}:${d.melodyOctave}`;
  if (d.launchSolfege) return `solfege:${d.launchSolfege}`;
  if (d.launchRhythm) return `${d.launchRhythm}${d.rhythmRead === "1" ? "-read" : ""}:${d.rhythmLvl}`;
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

const CATEGORY_CHEVRON_SVG = `<svg class="category-type-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>`;

function getCategoryBadgeSVG(kind) {
  let body = "";
  if (kind === "treble") {
    body = `
      <g opacity="0.24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
        <line x1="9" y1="15" x2="39" y2="15"/>
        <line x1="9" y1="20" x2="39" y2="20"/>
        <line x1="9" y1="25" x2="39" y2="25"/>
        <line x1="9" y1="30" x2="39" y2="30"/>
      </g>
      <g transform="translate(18.4, 5.0) scale(0.41)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.6 59.2 C15.6 62.2, 12.0 61.8, 10.2 58.6 C8.0 54.2, 9.2 48.0, 13.6 46.8 C18.2 45.6, 23.2 49.2, 23.8 56.8 C24.4 64.2, 20.8 70.0, 14.4 70.0 C7.5 70.0, 2.9 63.2, 3.4 54.0 C3.8 44.2, 14.6 35.8, 18.8 21.0 C20.6 14.2, 20.0 4.8, 16.5 4.4 C13.7 4.0, 12.6 9.5, 12.8 17.5 L13.6 79.8 C13.8 86.0, 10.8 88.6, 7.8 88.0 C5.8 87.6, 4.8 85.6, 5.2 83.4" stroke-width="5.2"/>
        <circle cx="6.0" cy="82.8" r="3.2" fill="currentColor" stroke="none"/>
      </g>`;
  } else if (kind === "bass") {
    body = `
      <g opacity="0.24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
        <line x1="9" y1="15" x2="39" y2="15"/>
        <line x1="9" y1="20" x2="39" y2="20"/>
        <line x1="9" y1="25" x2="39" y2="25"/>
        <line x1="9" y1="30" x2="39" y2="30"/>
      </g>
      <g transform="translate(3.6, -27.7) scale(0.60)">
        <circle cx="25" cy="76" r="4.2" fill="currentColor"/>
        <path d="M24.5 76 C23 67.5, 31 63.2, 37.5 66.2 C43.8 69.2, 43.2 84.5, 34 95 C28 102, 21.5 106, 17.5 108.5" fill="none" stroke="currentColor" stroke-width="3.8" stroke-linecap="round"/>
        <circle cx="48" cy="70" r="2.7" fill="currentColor"/>
        <circle cx="48" cy="82" r="2.7" fill="currentColor"/>
      </g>`;
  } else if (kind === "alto") {
    body = `
      <g opacity="0.24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
        <line x1="9" y1="15" x2="39" y2="15"/>
        <line x1="9" y1="20" x2="39" y2="20"/>
        <line x1="9" y1="25" x2="39" y2="25"/>
        <line x1="9" y1="30" x2="39" y2="30"/>
      </g>
      <g transform="translate(5.4, -27.0) scale(0.58)">
        <rect x="20" y="64" width="4.8" height="48" rx="1.2" fill="currentColor"/>
        <line x1="28" y1="64" x2="28" y2="112" stroke="currentColor" stroke-width="2.1"/>
        <path d="M29.5 88 C32.5 81, 43 81.5, 44 73.5 C45 67, 39.5 64, 33.5 65.5 C31 66.2, 30.5 69, 33 70.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M29.5 88 C32.5 95, 43 94.5, 44 102.5 C45 109, 39.5 112, 33.5 110.5 C31 109.8, 30.5 107, 33 105.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
      </g>`;
  } else if (kind === "mixed") {
    body = `
      <g transform="translate(10.0, 9.2) scale(0.32)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.6 59.2 C15.6 62.2, 12.0 61.8, 10.2 58.6 C8.0 54.2, 9.2 48.0, 13.6 46.8 C18.2 45.6, 23.2 49.2, 23.8 56.8 C24.4 64.2, 20.8 70.0, 14.4 70.0 C7.5 70.0, 2.9 63.2, 3.4 54.0 C3.8 44.2, 14.6 35.8, 18.8 21.0 C20.6 14.2, 20.0 4.8, 16.5 4.4 C13.7 4.0, 12.6 9.5, 12.8 17.5 L13.6 79.8 C13.8 86.0, 10.8 88.6, 7.8 88.0 C5.8 87.6, 4.8 85.6, 5.2 83.4" stroke-width="6.2"/>
        <circle cx="6.0" cy="82.8" r="3.6" fill="currentColor" stroke="none"/>
      </g>
      <g transform="translate(13.2, -16.8) scale(0.47)">
        <circle cx="25" cy="76" r="4.4" fill="currentColor"/>
        <path d="M24.5 76 C23 67.5, 31 63.2, 37.5 66.2 C43.8 69.2, 43.2 84.5, 34 95 C28 102, 21.5 106, 17.5 108.5" fill="none" stroke="currentColor" stroke-width="4.4" stroke-linecap="round"/>
        <circle cx="48" cy="70" r="2.9" fill="currentColor"/>
        <circle cx="48" cy="82" r="2.9" fill="currentColor"/>
      </g>`;
  } else if (kind === "grand") {
    body = `
      <path d="M14.5 12 C11.5 12.5, 12.2 21, 9.5 24 C12.2 27, 11.5 35.5, 14.5 36" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="17" y1="12.5" x2="17" y2="35.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <g stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity="0.65">
        <line x1="17" y1="13" x2="37" y2="13"/>
        <line x1="17" y1="17" x2="37" y2="17"/>
        <line x1="17" y1="21" x2="37" y2="21"/>
        <line x1="17" y1="27" x2="37" y2="27"/>
        <line x1="17" y1="31" x2="37" y2="31"/>
        <line x1="17" y1="35" x2="37" y2="35"/>
      </g>
      <ellipse cx="29" cy="17" rx="3.1" ry="2.2" transform="rotate(-18 29 17)" fill="currentColor"/>
      <line x1="31.8" y1="16.5" x2="31.8" y2="9.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
      <ellipse cx="24.5" cy="31" rx="3.1" ry="2.2" transform="rotate(-18 24.5 31)" fill="currentColor"/>
      <line x1="21.7" y1="31.5" x2="21.7" y2="38.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`;
  } else if (kind === "keysig") {
    body = `
      <g transform="translate(15.5, 22) scale(0.95)" stroke="currentColor" stroke-linecap="round">
        <line x1="-2.8" y1="-9" x2="-2.8" y2="9" stroke-width="1.9"/>
        <line x1="2.8" y1="-10" x2="2.8" y2="8" stroke-width="1.9"/>
        <line x1="-6" y1="-2.2" x2="6" y2="-4.2" stroke-width="2.6"/>
        <line x1="-6" y1="3.8" x2="6" y2="1.8" stroke-width="2.6"/>
      </g>
      <line x1="22" y1="31.5" x2="26.5" y2="16.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" opacity="0.45"/>
      <g transform="translate(33, 27.5) scale(1.05)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <line x1="-2.5" y1="-13.5" x2="-2.5" y2="4.2" stroke-width="2.0"/>
        <path d="M-2.5 -0.8 C1.2 -3.6, 5.2 -1.8, 4.8 1.5 C4.3 4.2, 0.2 5.2, -2.5 4.2" stroke-width="2.2"/>
      </g>`;
  } else if (kind === "keysig-nat") {
    body = `
      <g transform="translate(16.2, 23.8) scale(0.92)" stroke="currentColor" stroke-linecap="round">
        <line x1="-2.8" y1="-9" x2="-2.8" y2="9" stroke-width="1.95"/>
        <line x1="2.8" y1="-10" x2="2.8" y2="8" stroke-width="1.95"/>
        <line x1="-6" y1="-2.2" x2="6" y2="-4.2" stroke-width="2.65"/>
        <line x1="-6" y1="3.8" x2="6" y2="1.8" stroke-width="2.65"/>
      </g>
      <line x1="23.0" y1="31.5" x2="27.2" y2="16.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" opacity="0.45"/>
      <g transform="translate(33.8, 24.0) scale(0.96)" stroke="currentColor" stroke-linecap="round">
        <line x1="-3.0" y1="-10.5" x2="-3.0" y2="4.6" stroke-width="1.95"/>
        <line x1="3.0" y1="-4.6" x2="3.0" y2="10.5" stroke-width="1.95"/>
        <line x1="-3.0" y1="-2.6" x2="3.0" y2="-4.4" stroke-width="2.55"/>
        <line x1="-3.0" y1="4.4" x2="3.0" y2="2.6" stroke-width="2.55"/>
      </g>`;
  } else if (kind === "nat-sharp") {
    body = `
      <g transform="translate(14.8, 24.0) scale(0.96)" stroke="currentColor" stroke-linecap="round">
        <line x1="-3.0" y1="-10.5" x2="-3.0" y2="4.6" stroke-width="1.95"/>
        <line x1="3.0" y1="-4.6" x2="3.0" y2="10.5" stroke-width="1.95"/>
        <line x1="-3.0" y1="-2.6" x2="3.0" y2="-4.4" stroke-width="2.55"/>
        <line x1="-3.0" y1="4.4" x2="3.0" y2="2.6" stroke-width="2.55"/>
      </g>
      <line x1="21.0" y1="31.5" x2="25.2" y2="16.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" opacity="0.45"/>
      <g transform="translate(32.0, 23.8) scale(0.92)" stroke="currentColor" stroke-linecap="round">
        <line x1="-2.8" y1="-9" x2="-2.8" y2="9" stroke-width="1.95"/>
        <line x1="2.8" y1="-10" x2="2.8" y2="8" stroke-width="1.95"/>
        <line x1="-6" y1="-2.2" x2="6" y2="-4.2" stroke-width="2.65"/>
        <line x1="-6" y1="3.8" x2="6" y2="1.8" stroke-width="2.65"/>
      </g>`;
  } else if (kind === "melody-dict") {
    body = `
      <ellipse cx="14.5" cy="32" rx="4.2" ry="3.0" transform="rotate(-18 14.5 32)" fill="currentColor"/>
      <line x1="18.2" y1="31.2" x2="18.2" y2="15" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>
      <ellipse cx="29.5" cy="27.5" rx="4.2" ry="3.0" transform="rotate(-18 29.5 27.5)" fill="currentColor"/>
      <line x1="33.2" y1="26.7" x2="33.2" y2="11.5" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>
      <path d="M18.2 15 L33.2 11.5" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/>
      <circle cx="38" cy="27.5" r="2.1" fill="currentColor"/>`;
  }
  return `<svg class="node-rhythm-icon" width="46" height="46" viewBox="0 0 48 48" aria-hidden="true">${body}</svg>`;
}

function formatStackedParenTitle(title) {
  const s = String(title || "").trim();
  const m = s.match(/^(.+?)\s+(\([^)]+\))$/);
  if (!m) return s;
  return `<span class="stacked-title-main">${m[1]}</span><span class="stacked-title-paren">${m[2]}</span>`;
}

function renderCategoryTypeMenu(container, categoryKey, items, options = {}) {
  container.innerHTML = `
    ${options.introHtml || ""}
    <div class="category-types-list">
      ${items.map(item => `
        <button type="button" class="category-type-card" data-open-cat-section="${escapeHtml(item.id)}">
          <span class="category-type-badge-wrap" aria-hidden="true">${item.badgeHtml}</span>
          <span class="category-type-body">
            <span class="category-type-title">${item.titleHtml || item.title}</span>
            <span class="category-type-desc">${item.desc}</span>
            ${item.meta ? `<span class="category-type-meta">${escapeHtml(item.meta)}</span>` : ""}
          </span>
          ${CATEGORY_CHEVRON_SVG}
        </button>
      `).join("")}
    </div>
  `;

  container.querySelectorAll("[data-open-cat-section]").forEach(btn => {
    btn.addEventListener("click", () => {
      openCategoryPage(categoryKey, { sectionId: btn.dataset.openCatSection });
    });
  });
}

function openCategoryPage(categoryKey, options = {}) {
  const container = document.getElementById("categoryPageContent");
  if (!container) return;

  const wasSameView = state.currentView === "category";
  const prevCat = state.activeCategory;
  const prevSec = state.activeCategorySection || null;
  const activeSection = categoryKey === "warmup" ? null : (options.sectionId || null);

  state.activeCategory = categoryKey;
  state.activeCategorySection = activeSection;
  state.activeCategorySectionTitle = "";

  if (categoryKey === "cadence") {
    const CADENCE_LEVELS = [
      { level: 1, circle: "circle-sage",  badge: "I–V",   title: tr("Stufe 1: Basis", "Level 1: Basics"),              sub: tr("I, IV, V und vi", "I, IV, V & vi") },
      { level: 2, circle: "circle-sage",  badge: "ii–vi", title: tr("Stufe 2: Diatonisch", "Level 2: Diatonic"),       sub: tr("Alle leitereigenen Stufen", "All diatonic scale degrees") },
      { level: 3, circle: "circle-peach", badge: "V/V",   title: tr("Stufe 3: Erweitert", "Level 3: Extended"),        sub: tr("Mit Sekundärdominante & V7", "With secondary dominant & V7") },
      { level: 4, circle: "circle-lilac", badge: "bII7",  title: tr("Stufe 4: Jazz & Tritone", "Level 4: Jazz & Tritone"), sub: tr("Inklusive Tritonussubstitution", "Including tritone substitution") }
    ];

    const MINOR_CADENCE_LEVELS = [
      { level: 1, circle: "circle-sage",  badge: "i–V",     title: tr("Stufe 1: Basis", "Level 1: Basics"),              sub: tr("i, iv, V und VI", "i, iv, V & VI") },
      { level: 2, circle: "circle-sage",  badge: "ii°–VII", nodeClass: "node-circle-nowrap", title: tr("Stufe 2: Diatonisch", "Level 2: Diatonic"),     sub: tr("Alle leitereigenen Stufen inkl. v und V", "All diatonic degrees incl. v & V") },
      { level: 3, circle: "circle-peach", badge: "N6",      title: tr("Stufe 3: Erweitert", "Level 3: Extended"),        sub: tr("Mit V7, V/V & Neapolitaner", "With V7, V/V & Neapolitan") },
      { level: 4, circle: "circle-lilac", badge: "iiø7",    title: tr("Stufe 4: Jazz & Tritone", "Level 4: Jazz & Tritone"), sub: tr("Moll-ii–V & Tritonussubstitution", "Minor ii–V & tritone substitution") }
    ];

    const CADENCE_TYPES = [
      {
        id: "major-last",
        posMode: "last",
        tonality: "major",
        isBeginner: true,
        badgeHtml: `<div class="node-circle circle-sage">I–V</div>`,
        title: tr("Dur • Ziel: Takt 4", "Major • Target: Bar 4"),
        sectionTitle: tr("Übungen zu Kadenzen • Ziel: Takt 4", "Cadence Exercises • Target: Bar 4"),
        desc: tr("Höre drei Takte Kontext und bestimme die gesuchte 4. Stufe", "Listen to three bars of context and identify the missing 4th chord"),
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 })
      },
      {
        id: "major-random",
        posMode: "random",
        tonality: "major",
        isBeginner: false,
        badgeHtml: `<div class="node-circle circle-peach has-random-badge">I–V<span class="node-random-badge">?</span></div>`,
        title: tr("Dur • Zufälliger Takt", "Major • Random Bar"),
        sectionTitle: tr("Übungen zu Kadenzen • Zufälliger Takt", "Cadence Exercises • Random Bar"),
        desc: tr("Die fehlende Stufe steht an einer zufälligen Stelle (Takt 1–4)", "The missing chord appears in a random position (Bars 1–4)"),
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 })
      },
      {
        id: "minor-last",
        posMode: "last",
        tonality: "minor",
        isBeginner: true,
        badgeHtml: `<div class="node-circle circle-lilac">i–V</div>`,
        title: tr("Moll • Ziel: Takt 4", "Minor • Target: Bar 4"),
        sectionTitle: tr("Moll-Kadenzen • Ziel: Takt 4", "Minor Cadences • Target: Bar 4"),
        desc: tr("Dieselben Übungen in Moll-Tonarten: Höre drei Takte Kontext und bestimme die gesuchte 4. Stufe", "The same exercises in minor keys: listen to three bars of context and identify the missing 4th chord"),
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 })
      },
      {
        id: "minor-random",
        posMode: "random",
        tonality: "minor",
        isBeginner: false,
        badgeHtml: `<div class="node-circle circle-lilac has-random-badge">i–V<span class="node-random-badge">?</span></div>`,
        title: tr("Moll • Zufälliger Takt", "Minor • Random Bar"),
        sectionTitle: tr("Moll-Kadenzen • Zufälliger Takt", "Minor Cadences • Random Bar"),
        desc: tr("Die fehlende Moll-Stufe steht an einer zufälligen Stelle (Takt 1–4)", "The missing minor-key chord appears in a random position (Bars 1–4)"),
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 })
      }
    ];

    const selectedCad = activeSection ? CADENCE_TYPES.find(t => t.id === activeSection) : null;
    if (!selectedCad) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, CADENCE_TYPES);
    } else {
      state.activeCategorySectionTitle = selectedCad.title;
      const levels = selectedCad.tonality === "minor" ? MINOR_CADENCE_LEVELS : CADENCE_LEVELS;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${selectedCad.sectionTitle}</h3>
          <p class="subpage-section-desc">${selectedCad.desc}</p>
          <div class="subpage-nodes-grid">
            ${levels.map(lv => `
              <button class="subpage-node-btn" data-launch-cadence="${lv.level}" data-cadence-pos="${selectedCad.posMode}" data-cadence-tonality="${selectedCad.tonality}">
                <div class="node-circle ${lv.circle}${lv.nodeClass ? ` ${lv.nodeClass}` : ""}${selectedCad.posMode === "random" ? " has-random-badge" : ""}">${lv.badge}${selectedCad.posMode === "random" ? `<span class="node-random-badge" title="${tr("Zufälliger Takt", "Random Measure")}">?</span>` : ""}</div>
                <span class="node-title">${lv.title}</span>
                <span class="node-sub">${selectedCad.posMode === "random" ? `${lv.sub} ${tr("(Zufallstakt)", "(Random Bar)")}` : lv.sub}</span>
              </button>
            `).join("")}
          </div>
        </div>
      `;

      container.querySelectorAll("[data-launch-cadence]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setMode(btn.dataset.cadenceTonality === "minor" ? "cadence-minor" : "cadence");
          state.setDifficulty(btn.dataset.launchCadence);
          state.setCadencePos(btn.dataset.cadencePos);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    }

  } else if (categoryKey === "interval") {
    const INTERVAL_PLAY_SECTIONS = [
      {
        mode: "interval-melodic",
        title: tr("Melodische Intervalle (Aufwärts)", "Melodic Intervals (Ascending)"),
        desc: tr("Zwei Töne erklingen nacheinander vom Ausgangston nach oben", "Two notes played sequentially upward from the reference pitch"),
        circle: "circle-peach",
        dir: "up",
        badgeHtml: renderDirectionNodeCircle("1–5", "up", "circle-peach"),
        isBeginner: true
      },
      {
        mode: "interval-melodic-down",
        title: tr("Melodische Intervalle (Abwärts)", "Melodic Intervals (Descending)"),
        desc: tr("Zwei Töne erklingen nacheinander vom Ausgangston nach unten", "Two notes played sequentially downward from the reference pitch"),
        circle: "circle-peach",
        dir: "down",
        badgeHtml: renderDirectionNodeCircle("1–5", "down", "circle-peach"),
        isBeginner: true
      },
      {
        mode: "interval-harmonic",
        title: tr("Harmonische Intervalle", "Harmonic Intervals"),
        desc: tr("Beide Töne erklingen gleichzeitig als Zusammenklang", "Both notes sounded simultaneously in harmony"),
        circle: "circle-lilac",
        dir: null,
        badgeHtml: `<div class="node-circle circle-lilac">1+5</div>`,
        isBeginner: true
      },
      {
        mode: "interval-drone",
        title: tr("Intervalle über Grundton-Fläche", "Intervals Over Root Pad"),
        desc: tr("Eine warme Streicher-Fläche hält den Grundton – nach kurzer Verzögerung erklingt der gesuchte Intervallton auf dem Klavier darüber", "A warm strings pad sustains the root pitch — after a short delay, piano plays the target interval tone above it"),
        circle: "circle-sage",
        dir: null,
        badgeHtml: `<div class="node-circle circle-sage node-circle-compact">Pad</div>`,
        isBeginner: true
      }
    ];

    const INTERVAL_TYPE_ITEMS = [
      ...INTERVAL_PLAY_SECTIONS.map(sec => ({
        id: sec.mode,
        title: sec.title,
        desc: sec.desc,
        badgeHtml: sec.badgeHtml,
        meta: tr("9 Stufen • Dur, Moll & Chromatisch", "9 Levels • Major, Minor & Chromatic"),
        isBeginner: sec.isBeginner
      })),
      {
        id: "interval-custom",
        title: tr("Freie Tonart & Modi", "Custom Key & Modes"),
        desc: tr(
          "Wähle deinen festen Grundton (oder Zufall), eine Tonleiter bzw. Kirchentonart und passe die abgefragten Intervalle beliebig an.",
          "Choose a fixed root key (or random), pick any scale or church mode, and customize which intervals are tested."
        ),
        badgeHtml: `<div class="node-circle circle-peach node-circle-compact">${tr("Frei", "Free")}</div>`,
        meta: tr("Frei wählbar • alle 4 Spielarten", "Custom • all 4 playback modes"),
        isBeginner: false
      }
    ];

    const renderIntBadge = (sec, text) => {
      if (sec.dir) {
        return renderDirectionNodeCircle(text, sec.dir, sec.circle);
      }
      const cls = String(text).length > 3 ? " node-circle-compact node-circle-nowrap" : "";
      return `<div class="node-circle ${sec.circle}${cls}">${text}</div>`;
    };

    const getSectionCardGroups = (sec) => {
      const begCircleHtml = sec.dir
        ? renderDirectionNodeCircle("1–5", sec.dir, sec.circle)
        : `<div class="node-circle ${sec.circle}">1+5</div>`;
      const begMinCircleHtml = sec.dir
        ? renderDirectionNodeCircle("1–♭3", sec.dir, sec.circle)
        : `<div class="node-circle ${sec.circle} node-circle-compact node-circle-nowrap">1+♭3</div>`;
      return {
        major: [
          {
            lvl: 1,
            circleHtml: begCircleHtml,
            title: tr("Stufe 1: Einsteiger", "Level 1: Beginner"),
            sub: tr("Prime, gr. Terz, Quinte, Oktave", "Unison, Maj 3rd, 5th & Octave")
          },
          {
            lvl: 2,
            circleHtml: renderIntBadge(sec, "1–4"),
            title: tr("Stufe 2: Dur 1–4", "Level 2: Major 1–4"),
            sub: tr("Untere Hälfte: Prime, gr. Sek., gr. Terz, Quarte", "Lower half: Unison, Maj 2nd, Maj 3rd, 4th")
          },
          {
            lvl: 3,
            circleHtml: renderIntBadge(sec, "5–8"),
            title: tr("Stufe 3: Dur 5–8", "Level 3: Major 5–8"),
            sub: tr("Obere Hälfte: Quinte, gr. Sexte, gr. Sept., Oktave", "Upper half: 5th, Maj 6th, Maj 7th, Octave")
          },
          {
            lvl: 4,
            circleHtml: renderIntBadge(sec, tr("Dur", "Maj")),
            title: tr("Stufe 4: Dur-Tonleiter", "Level 4: Major Scale"),
            sub: tr("Alle 8 diatonischen Dur-Intervalle", "All 8 diatonic major intervals")
          }
        ],
        minor: [
          {
            lvl: 6,
            circleHtml: begMinCircleHtml,
            title: tr("Moll 1: Einsteiger", "Minor 1: Beginner"),
            sub: tr("Prime, kl. Terz, Quinte, Oktave", "Unison, Min 3rd, 5th & Octave")
          },
          {
            lvl: 7,
            circleHtml: renderIntBadge(sec, "1–4m"),
            title: tr("Moll 2: Moll 1–4", "Minor 2: Minor 1–4"),
            sub: tr("Untere Hälfte: Prime, gr. Sek., kl. Terz, Quarte", "Lower half: Unison, Maj 2nd, Min 3rd, 4th")
          },
          {
            lvl: 8,
            circleHtml: renderIntBadge(sec, "5–8m"),
            title: tr("Moll 3: Moll 5–8", "Minor 3: Minor 5–8"),
            sub: tr("Obere Hälfte: Quinte, kl. Sexte, kl. Sept., Oktave", "Upper half: 5th, Min 6th, Min 7th, Octave")
          },
          {
            lvl: 9,
            circleHtml: renderIntBadge(sec, tr("Moll", "Min")),
            title: tr("Moll 4: Moll-Tonleiter", "Minor 4: Minor Scale"),
            sub: tr("Alle 8 Intervalle in natürlichem Moll", "All 8 natural minor intervals")
          }
        ],
        chromatic: [
          {
            lvl: 5,
            circleHtml: renderIntBadge(sec, tr("Alle", "All")),
            title: tr("Stufe 5: Chromatisch", "Level 5: Chromatic"),
            sub: tr("Alle 15 Intervalle bis zur None", "All 15 intervals up to a 9th")
          }
        ]
      };
    };

    const selectedIntItem = activeSection ? INTERVAL_TYPE_ITEMS.find(t => t.id === activeSection) : null;
    if (!selectedIntItem) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, INTERVAL_TYPE_ITEMS);
    } else if (selectedIntItem.id === "interval-custom") {
      state.activeCategorySectionTitle = selectedIntItem.title;
      const renderCustomIntervalSubpage = () => {
        const curRoot = String(state.settings.intervalCustomRoot ?? "random");
        const curScale = String(state.settings.intervalCustomScale || "ionian");
        const curScope = String(state.settings.intervalCustomScope || "full");
        const activePool = getActiveIntervalCustomPool();
        const hasManualPool = Array.isArray(state.settings.intervalCustomPool) && state.settings.intervalCustomPool.length >= 2;
        const rootOptions = ["random", ...Array.from({ length: 12 }, (_, pc) => String(pc))];
        const scaleIds = Object.keys(INTERVAL_SCALE_PRESETS);
        const scopeIds = ["triad", "lower", "upper", "full"];
        const allIntervals = Object.keys(HARMONIC_DATA.intervals);
        const summaryBadge = getIntervalCustomBadgeLabel();

        container.innerHTML = `
          <div class="subpage-section">
            <div class="subpage-section-head-row">
              <h3 class="subpage-section-title">${tr("Freie Tonart & Modi (Eigenes Intervall-Training)", "Custom Key & Modes (Custom Interval Trainer)")}</h3>
              <span class="subpage-section-key-pill">${escapeHtml(summaryBadge)}</span>
            </div>
            <p class="subpage-section-desc">${tr(
              "Wähle deinen festen Grundton (oder Zufall), eine Tonleiter bzw. Kirchentonart und passe die abgefragten Intervalle beliebig an.",
              "Choose a fixed root key (or random), pick any scale or church mode, and customize which intervals are tested."
            )}</p>
            <div class="notation-key-toolbar">
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("1. Grundton / Tonart:", "1. Root / Key:")}</span>
                <div class="notation-key-quick-row">
                  ${rootOptions.map(opt => `
                    <button type="button" class="k-filter-pill${curRoot === opt ? " active" : ""}" data-int-custom-root="${opt}">
                      ${escapeHtml(getIntervalCustomRootLabel(opt))}
                    </button>
                  `).join("")}
                </div>
              </div>
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("2. Tonleiter / Modus:", "2. Scale / Mode:")}</span>
                <div class="notation-key-quick-row">
                  ${scaleIds.map(sid => `
                    <button type="button" class="k-filter-pill${curScale === sid ? " active" : ""}" data-int-custom-scale="${sid}">
                      ${escapeHtml(getLocalizedIntervalCustomScaleLabel(sid))}
                    </button>
                  `).join("")}
                </div>
              </div>
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("3. Umfang / Ausschnitt:", "3. Scale Range:")}</span>
                <div class="notation-key-quick-row">
                  ${scopeIds.map(sc => `
                    <button type="button" class="k-filter-pill${curScope === sc && !hasManualPool ? " active" : ""}" data-int-custom-scope="${sc}">
                      ${escapeHtml(getLocalizedIntervalCustomScopeLabel(sc))}
                    </button>
                  `).join("")}
                </div>
              </div>
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("4. Aktive Intervalle (antippen zum An-/Abwählen, mind. 2):", "4. Active Intervals (tap to toggle, min. 2):")}</span>
                <div class="notation-key-quick-row">
                  ${allIntervals.map(intKey => {
                    const def = getLocalizedIntervalDef(intKey);
                    const isOn = activePool.includes(intKey);
                    return `
                      <button type="button" class="k-filter-pill${isOn ? " active" : ""}" data-int-custom-toggle="${intKey}" aria-pressed="${isOn}">
                        ${escapeHtml(def.short)}
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>
            </div>

            <div class="subpage-nodes-grid" style="margin-top: 0.7rem;">
              <button class="subpage-node-btn" data-launch-int="interval-melodic" data-int-lvl="10">
                ${renderDirectionNodeCircle(tr("Frei", "Free"), "up")}
                <span class="node-title">${tr("Aufwärts (Eigene Auswahl)", "Ascending (Custom)")}</span>
                <span class="node-sub">${escapeHtml(summaryBadge)} • ${activePool.length} ${tr("Intervalle", "Intervals")}</span>
              </button>
              <button class="subpage-node-btn" data-launch-int="interval-melodic-down" data-int-lvl="10">
                ${renderDirectionNodeCircle(tr("Frei", "Free"), "down")}
                <span class="node-title">${tr("Abwärts (Eigene Auswahl)", "Descending (Custom)")}</span>
                <span class="node-sub">${escapeHtml(summaryBadge)} • ${activePool.length} ${tr("Intervalle", "Intervals")}</span>
              </button>
              <button class="subpage-node-btn" data-launch-int="interval-harmonic" data-int-lvl="10">
                <div class="node-circle circle-lilac node-circle-compact">${tr("Frei", "Free")}</div>
                <span class="node-title">${tr("Harmonisch (Eigene Auswahl)", "Harmonic (Custom)")}</span>
                <span class="node-sub">${escapeHtml(summaryBadge)} • ${activePool.length} ${tr("Intervalle", "Intervals")}</span>
              </button>
              <button class="subpage-node-btn" data-launch-int="interval-drone" data-int-lvl="10">
                <div class="node-circle circle-sage node-circle-compact">${tr("Frei", "Free")}</div>
                <span class="node-title">${tr("Grundton-Fläche (Eigene Auswahl)", "Root Pad (Custom)")}</span>
                <span class="node-sub">${escapeHtml(summaryBadge)} • ${activePool.length} ${tr("Intervalle", "Intervals")}</span>
              </button>
            </div>
          </div>
        `;

        container.querySelectorAll("[data-int-custom-root]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.intervalCustomRoot = btn.dataset.intCustomRoot;
            renderCustomIntervalSubpage();
          });
        });

        container.querySelectorAll("[data-int-custom-scale]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.intervalCustomScale = btn.dataset.intCustomScale;
            state.settings.intervalCustomPool = null;
            renderCustomIntervalSubpage();
          });
        });

        container.querySelectorAll("[data-int-custom-scope]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.intervalCustomScope = btn.dataset.intCustomScope;
            state.settings.intervalCustomPool = null;
            renderCustomIntervalSubpage();
          });
        });

        container.querySelectorAll("[data-int-custom-toggle]").forEach(btn => {
          btn.addEventListener("click", () => {
            const key = btn.dataset.intCustomToggle;
            const cur = getActiveIntervalCustomPool();
            let next;
            if (cur.includes(key)) {
              if (cur.length <= 2) return;
              next = cur.filter(k => k !== key);
            } else {
              next = Object.keys(HARMONIC_DATA.intervals).filter(k => cur.includes(k) || k === key);
            }
            state.settings.intervalCustomPool = next;
            renderCustomIntervalSubpage();
          });
        });

        container.querySelectorAll("[data-launch-int]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.setMode(btn.dataset.launchInt);
            state.setIntervalDifficulty(btn.dataset.intLvl);
            state.exerciseReturnView = "category";
            switchView("exercise");
          });
        });
      };
      renderCustomIntervalSubpage();
    } else {
      const sec = INTERVAL_PLAY_SECTIONS.find(s => s.mode === selectedIntItem.id);
      state.activeCategorySectionTitle = sec.title;
      const groups = getSectionCardGroups(sec);
      const renderIntCards = (cards) => cards.map(card => `
        <button class="subpage-node-btn" data-launch-int="${sec.mode}" data-int-lvl="${card.lvl}">
          ${card.circleHtml}
          <span class="node-title">${card.title}</span>
          <span class="node-sub">${card.sub}</span>
        </button>
      `).join("");

      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${tr("Dur-Intervalle", "Major Intervals")}</h3>
          <p class="subpage-section-desc">${sec.desc}</p>
          <div class="subpage-nodes-grid">${renderIntCards(groups.major)}</div>
        </div>
        <div class="subpage-section">
          <h3 class="subpage-section-title">${tr("Moll-Intervalle", "Minor Intervals")}</h3>
          <p class="subpage-section-desc">${tr("Derselbe Aufbau in Natürlich Moll (mit kl. Terz, kl. Sexte & kl. Septime)", "The same progression in Natural Minor (with min 3rd, min 6th & min 7th)")}</p>
          <div class="subpage-nodes-grid">${renderIntCards(groups.minor)}</div>
        </div>
        <div class="subpage-section">
          <h3 class="subpage-section-title">${tr("Chromatisch (Alle 15 Intervalle)", "Chromatic (All 15 Intervals)")}</h3>
          <p class="subpage-section-desc">${tr("Volles Spektrum inkl. kl. Sekunde, Tritonus, kl./gr. Intervalle & Nonen", "Full spectrum incl. min 2nd, tritone, minor/major intervals & ninths")}</p>
          <div class="subpage-nodes-grid">${renderIntCards(groups.chromatic)}</div>
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
    }

  } else if (categoryKey === "chords") {
    const CHORD_QUALITY_SECTIONS = [
      {
        mode: "chord-arp-up",
        circleClass: "circle-sage",
        badgeHtml: renderDirectionNodeCircle("Δ", "up", "circle-sage"),
        isBeginner: true,
        title: tr("Akkord-Arpeggio (Aufwärts ↗)", "Chord Arpeggio (Ascending ↗)"),
        desc: tr("Akkordtöne erklingen nacheinander von unten nach oben – ideal zum Heraushören einzelner Terzen &amp; Septimen", "Chord tones roll upward note by note — ideal for hearing every 3rd, 5th &amp; 7th clearly")
      },
      {
        mode: "chord-arp-down",
        circleClass: "circle-lilac",
        badgeHtml: renderDirectionNodeCircle("Δ", "down", "circle-lilac"),
        isBeginner: true,
        title: tr("Akkord-Arpeggio (Abwärts ↘)", "Chord Arpeggio (Descending ↘)"),
        desc: tr("Akkordtöne erklingen nacheinander von oben nach unten", "Chord tones cascade downward from top to bottom")
      },
      {
        mode: "interval-chords",
        circleClass: "circle-peach",
        badgeHtml: `<div class="node-circle circle-peach node-circle-compact node-circle-nowrap">Δ/7</div>`,
        isBeginner: true,
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

    const CHORD_TYPE_ITEMS = [
      ...CHORD_QUALITY_SECTIONS.map(sec => ({
        id: sec.mode,
        title: sec.title,
        desc: sec.desc,
        badgeHtml: sec.badgeHtml,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: sec.isBeginner
      })),
      {
        id: "chord-inversions",
        title: tr("Akkordumkehrungen", "Chord Inversions"),
        desc: tr("Erkenne, welcher Akkordton ganz unten im Bass liegt (Grundstellung, 1., 2. oder 3. Umkehrung)", "Identify which chord tone sits lowest in the bass (Root Position, 1st, 2nd or 3rd Inversion)"),
        badgeHtml: `<div class="node-circle circle-sage node-circle-compact node-circle-nowrap">1/3/5</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 3 }),
        isBeginner: false
      }
    ];

    const selectedChordType = activeSection ? CHORD_TYPE_ITEMS.find(t => t.id === activeSection) : null;
    if (!selectedChordType) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, CHORD_TYPE_ITEMS);
    } else if (selectedChordType.id === "chord-inversions") {
      state.activeCategorySectionTitle = selectedChordType.title;
      container.innerHTML = `
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
    } else {
      const sec = CHORD_QUALITY_SECTIONS.find(s => s.mode === selectedChordType.id);
      state.activeCategorySectionTitle = sec.title;
      container.innerHTML = `
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
    }

    if (selectedChordType) {
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
    }

  } else if (categoryKey === "melody") {
    const MELODY_TYPE_ITEMS = [
      {
        id: "steady",
        title: tr("Gleichmäßig (Basis)", "Steady (Basics)"),
        desc: tr("4 gleichlange halbe Noten – voller Fokus auf Tonhöhen & Solfège-Stufen", "4 steady half notes — full focus on pitch & Solfège degrees"),
        badgeHtml: `<div class="node-circle circle-sage node-circle-compact">${tr("Basis", "Basic")}</div>`,
        meta: tr("3 Tonräume • Do–Fa, Sol–Do & Ganze Tonart", "3 Ranges • Do–Fa, Sol–Do & Full Key"),
        isBeginner: true
      },
      {
        id: "rhythmic",
        title: tr("Rhythmische Melodie", "Rhythmic Melody"),
        desc: tr("4–6 Töne in echten Phrasen (4/4 & 3/4) – der Rhythmus ist sichtbar vorgegeben", "4–6 notes in musical phrases (4/4 & 3/4) — rhythm is shown as a guide"),
        badgeHtml: `<div class="node-circle circle-peach">4–6</div>`,
        meta: tr("3 Tonräume • Do–Fa, Sol–Do & Ganze Tonart", "3 Ranges • Do–Fa, Sol–Do & Full Key"),
        isBeginner: true
      },
      {
        id: "dictation",
        title: tr("Kombi-Diktat", "Full Dictation"),
        desc: tr("Tonhöhe UND Notenlänge (♪, ♩, ♩., 𝅗𝅥) gemeinsam nach Gehör heraushören", "Identify both pitch AND note duration (♪, ♩, ♩., 𝅗𝅥) together by ear"),
        badgeHtml: `<div class="node-circle circle-lilac node-circle-icon">${getCategoryBadgeSVG("melody-dict")}</div>`,
        meta: tr("3 Tonräume • Do–Fa, Sol–Do & Ganze Tonart", "3 Ranges • Do–Fa, Sol–Do & Full Key"),
        isBeginner: false
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

    const selectedMelType = activeSection ? MELODY_TYPE_ITEMS.find(t => t.id === activeSection) : null;
    if (!selectedMelType) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, MELODY_TYPE_ITEMS);
    } else {
      state.settings.melodyStyle = selectedMelType.id;
      state.activeCategorySectionTitle = selectedMelType.title;
      container.innerHTML = MELODY_SECTIONS.map(sec => `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${sec.title}</h3>
          <p class="subpage-section-desc">${getMelodyRangeDesc(sec.range, selectedMelType.id)}</p>
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
      `).join("");

      container.querySelectorAll("[data-launch-melody]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setMode("melody");
          state.setMelodyConfig(
            btn.dataset.launchMelody,
            btn.dataset.melodyKey,
            btn.dataset.melodyOctave,
            selectedMelType.id
          );
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    }

  } else if (categoryKey === "solfege") {
    const SOLFEGE_TYPE_ITEMS = [
      {
        id: "major",
        title: tr("Solfège • Dur", "Solfège • Major"),
        desc: tr("Höre die Dur-Kadenz (I–vi–IV–V) und erkenne die gespielte Tonstufe auf der Klaviatur", "Hear the major cadence (I–vi–IV–V) and identify the target scale degree on the keyboard"),
        badgeHtml: `<div class="node-circle circle-sage">${tr("Dur", "Maj")}</div>`,
        meta: tr("8 Stufen • Do–Fa, Sol–Do bis Tonartwechsel", "8 Levels • Do–Fa, Sol–Do to Key Changes"),
        isBeginner: true
      },
      {
        id: "minor",
        title: tr("Solfège • Moll", "Solfège • Minor"),
        desc: tr("Höre die Moll-Kadenz (i–VI–iv–V) und erkenne die gespielte Tonstufe in Natürlich Moll", "Hear the minor cadence (i–VI–iv–V) and identify the target degree in Natural Minor"),
        badgeHtml: `<div class="node-circle circle-lilac">${tr("Moll", "Min")}</div>`,
        meta: tr("8 Stufen • Do–Fa, Sol–Do bis Tonartwechsel", "8 Levels • Do–Fa, Sol–Do to Key Changes"),
        isBeginner: true
      },
      {
        id: "custom",
        title: tr("Eigene Tonart (Dur & Moll)", "Custom Key (Major & Minor)"),
        titleHtml: formatStackedParenTitle(tr("Eigene Tonart (Dur & Moll)", "Custom Key (Major & Minor)")),
        desc: tr("Wähle beliebige Dur- oder Moll-Tonart, Tonraum & Oktavlage frei – auch direkt in der Übung jederzeit anpassbar", "Choose any major or minor key, scale half & octave register freely — also adjustable anytime inside the exercise"),
        badgeHtml: `<div class="node-circle circle-peach node-circle-compact">${tr("Frei", "Free")}</div>`,
        meta: tr("Frei wählbar • Dur & Moll", "Custom • Major & Minor"),
        isBeginner: false
      }
    ];

    const bindSolfegeLaunchButtons = (root) => {
      root.querySelectorAll("[data-launch-solfege]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setMode("solfege");
          state.setSolfegeDifficulty(btn.dataset.launchSolfege);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    };

    const selectedSolfType = activeSection ? SOLFEGE_TYPE_ITEMS.find(t => t.id === activeSection) : null;
    if (!selectedSolfType) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, SOLFEGE_TYPE_ITEMS);
    } else if (selectedSolfType.id === "major") {
      state.activeCategorySectionTitle = selectedSolfType.title;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title subpage-section-title-tones">
            <span class="subpage-section-title-main">${tr("Solfège • Dur", "Solfège • Major")}</span>
            <span class="subpage-section-tones" dir="ltr">Do · Re · Mi · Fa · Sol · La · Ti</span>
          </h3>
          <p class="subpage-section-desc">${tr("Höre die Dur-Kadenz (I–vi–IV–V) und erkenne die gespielte Tonstufe auf der Klaviatur", "Hear the major cadence (I–vi–IV–V) and identify the target scale degree on the keyboard")}</p>
          <div class="subpage-nodes-grid">
            <button class="subpage-node-btn" data-launch-solfege="1">
              <div class="node-circle circle-sage node-circle-compact">Do–Fa</div>
              <span class="node-title">${tr("Stufe 1: Do–Fa (C-Dur)", "Level 1: Do–Fa (C Major)")}</span>
              <span class="node-sub">${tr("Untere Hälfte (4 Töne), feste Tonart C-Dur", "Lower half (4 notes), fixed key C Major")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="2">
              <div class="node-circle circle-sage node-circle-compact">Sol–Do</div>
              <span class="node-title">${tr("Stufe 2: Sol–Do (C-Dur)", "Level 2: Sol–Do (C Major)")}</span>
              <span class="node-sub">${tr("Obere Hälfte (4 Töne), feste Tonart C-Dur", "Upper half (4 notes), fixed key C Major")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="3">
              <div class="node-circle circle-sage">C • 1</div>
              <span class="node-title">${tr("Stufe 3: C-Dur (1 Oktave)", "Level 3: C Major (1 Octave)")}</span>
              <span class="node-sub">${tr("Ganze Tonleiter, mittlere Höhe, feste Tonart C-Dur", "Full scale, middle register, fixed key C Major")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="4">
              <div class="node-circle circle-sage">? • 1</div>
              <span class="node-title">${tr("Stufe 4: Zufällige Tonart (1 Okt.)", "Level 4: Random Key (1 Oct.)")}</span>
              <span class="node-sub">${tr("Nicht C-Dur, fest für diese Sitzung", "Non-C key, fixed for this session")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="5">
              <div class="node-circle circle-peach">C • ∞</div>
              <span class="node-title">${tr("Stufe 5: C-Dur (Mehrere Oktaven)", "Level 5: C Major (Multi-Octave)")}</span>
              <span class="node-sub">${tr("Feste Tonart C-Dur, wechselnde Oktaven", "Fixed key C Major, shifting octaves")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="6">
              <div class="node-circle circle-peach">? • ∞</div>
              <span class="node-title">${tr("Stufe 6: Zufällige Tonart (Mehrere Okt.)", "Level 6: Random Key (Multi-Oct.)")}</span>
              <span class="node-sub">${tr("Nicht C-Dur (fest), wechselnde Oktaven", "Non-C key (fixed), shifting octaves")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="7">
              <div class="node-circle circle-lilac">${REFRESH_ICON_SVG} • 1</div>
              <span class="node-title">${tr("Stufe 7: Tonartwechsel (1 Oktave)", "Level 7: Key Changes (1 Octave)")}</span>
              <span class="node-sub">${tr("Neue Tonart nach jeder Antwort, 1 Okt.", "New key after every answer, 1 oct.")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="8">
              <div class="node-circle circle-lilac">${REFRESH_ICON_SVG} • ∞</div>
              <span class="node-title">${tr("Stufe 8: Tonartwechsel (Mehrere Okt.)", "Level 8: Key Changes (Multi-Oct.)")}</span>
              <span class="node-sub">${tr("Neue Tonart & Oktave nach jeder Antwort", "New key & octave after every answer")}</span>
            </button>
          </div>
        </div>
      `;
      bindSolfegeLaunchButtons(container);
    } else if (selectedSolfType.id === "minor") {
      state.activeCategorySectionTitle = selectedSolfType.title;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title subpage-section-title-tones">
            <span class="subpage-section-title-main">${tr("Solfège • Moll", "Solfège • Minor")}</span>
            <span class="subpage-section-tones" dir="ltr">Do · Re · Me · Fa · Sol · Le · Te</span>
          </h3>
          <p class="subpage-section-desc">${tr("Höre die Moll-Kadenz (i–VI–iv–V) und erkenne die gespielte Tonstufe in Natürlich Moll", "Hear the minor cadence (i–VI–iv–V) and identify the target degree in Natural Minor")}</p>
          <div class="subpage-nodes-grid">
            <button class="subpage-node-btn" data-launch-solfege="9">
              <div class="node-circle circle-lilac node-circle-compact">Do–Fa</div>
              <span class="node-title">${tr("Moll 1: Do–Fa (c-Moll)", "Minor 1: Do–Fa (C Minor)")}</span>
              <span class="node-sub">${tr("Untere Hälfte (Do, Re, Me, Fa), feste Tonart c-Moll", "Lower half (Do, Re, Me, Fa), fixed key C Minor")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="10">
              <div class="node-circle circle-lilac node-circle-compact">Sol–Do</div>
              <span class="node-title">${tr("Moll 2: Sol–Do (c-Moll)", "Minor 2: Sol–Do (C Minor)")}</span>
              <span class="node-sub">${tr("Obere Hälfte (Sol, Le, Te, Do), feste Tonart c-Moll", "Upper half (Sol, Le, Te, Do), fixed key C Minor")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="11">
              <div class="node-circle circle-lilac">c • 1</div>
              <span class="node-title">${tr("Moll 3: c-Moll (1 Oktave)", "Minor 3: C Minor (1 Octave)")}</span>
              <span class="node-sub">${tr("Ganze Moll-Tonleiter, mittlere Höhe, feste Tonart c-Moll", "Full minor scale, middle register, fixed key C Minor")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="12">
              <div class="node-circle circle-lilac">? • 1</div>
              <span class="node-title">${tr("Moll 4: Zufällige Tonart (1 Okt.)", "Minor 4: Random Key (1 Oct.)")}</span>
              <span class="node-sub">${tr("Nicht c-Moll, fest für diese Sitzung", "Non-C minor key, fixed for this session")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="13">
              <div class="node-circle circle-peach">c • ∞</div>
              <span class="node-title">${tr("Moll 5: c-Moll (Mehrere Oktaven)", "Minor 5: C Minor (Multi-Octave)")}</span>
              <span class="node-sub">${tr("Feste Tonart c-Moll, wechselnde Oktaven", "Fixed key C Minor, shifting octaves")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="14">
              <div class="node-circle circle-peach">? • ∞</div>
              <span class="node-title">${tr("Moll 6: Zufällige Tonart (Mehrere Okt.)", "Minor 6: Random Key (Multi-Oct.)")}</span>
              <span class="node-sub">${tr("Nicht c-Moll (fest), wechselnde Oktaven", "Non-C minor key (fixed), shifting octaves")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="15">
              <div class="node-circle circle-sage">${REFRESH_ICON_SVG} • 1</div>
              <span class="node-title">${tr("Moll 7: Tonartwechsel (1 Oktave)", "Minor 7: Key Changes (1 Octave)")}</span>
              <span class="node-sub">${tr("Neue Moll-Tonart nach jeder Antwort, 1 Okt.", "New minor key after every answer, 1 oct.")}</span>
            </button>

            <button class="subpage-node-btn" data-launch-solfege="16">
              <div class="node-circle circle-sage">${REFRESH_ICON_SVG} • ∞</div>
              <span class="node-title">${tr("Moll 8: Tonartwechsel (Mehrere Okt.)", "Minor 8: Key Changes (Multi-Oct.)")}</span>
              <span class="node-sub">${tr("Neue Moll-Tonart & Oktave nach jeder Antwort", "New minor key & octave after every answer")}</span>
            </button>
          </div>
        </div>
      `;
      bindSolfegeLaunchButtons(container);
    } else {
      state.activeCategorySectionTitle = selectedSolfType.title;
      const renderSolfegeCustomSection = () => {
        const curTonality = state.settings.solfegeCustomTonality === "minor" ? "minor" : "major";
        const curKey = String(state.settings.solfegeCustomKey || "C");
        const curRange = ["do-fa", "sol-do", "full"].includes(state.settings.solfegeCustomRange)
          ? state.settings.solfegeCustomRange
          : "full";
        const curOct = state.settings.solfegeCustomOctave === "multi" ? "multi" : "single";
        const keyOrder = ["random", "C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"];
        const rangeDefs = [
          { id: "do-fa",  label: tr("Do–Fa (Untere Hälfte)", "Do–Fa (Lower Half)") },
          { id: "sol-do", label: tr("Sol–Do (Obere Hälfte)", "Sol–Do (Upper Half)") },
          { id: "full",   label: tr("Ganze Tonart (Do–Do)", "Full Scale (Do–Do)") }
        ];
        const summaryKey = curKey === "random"
          ? `${tr("Zufall", "Random")} (${curTonality === "minor" ? tr("Moll", "Minor") : tr("Dur", "Major")})`
          : getKeyDisplayName(curKey, curTonality);
        const summaryRange = curRange === "do-fa" ? "Do–Fa" : (curRange === "sol-do" ? "Sol–Do" : "Do–Do");
        const summaryOct = curOct === "multi" ? tr("Mehrere Okt.", "Multi-Oct.") : tr("1 Oktave", "1 Octave");
        const customToneStrip = curTonality === "minor"
          ? (curRange === "do-fa" ? "Do · Re · Me · Fa" : (curRange === "sol-do" ? "Sol · Le · Te · Do" : "Do · Re · Me · Fa · Sol · Le · Te"))
          : (curRange === "do-fa" ? "Do · Re · Mi · Fa" : (curRange === "sol-do" ? "Sol · La · Ti · Do" : "Do · Re · Mi · Fa · Sol · La · Ti"));

        container.innerHTML = `
          <div class="subpage-section">
            <h3 class="subpage-section-title subpage-section-title-tones">
              <span class="subpage-section-title-main">${tr("Eigene Tonart (Dur & Moll)", "Custom Key (Major & Minor)")}</span>
              <span class="subpage-section-tones" dir="ltr">${customToneStrip}</span>
            </h3>
            <p class="subpage-section-desc">${tr("Wähle beliebige Dur- oder Moll-Tonart, Tonraum & Oktavlage frei – auch direkt in der Übung jederzeit anpassbar", "Choose any major or minor key, scale half & octave register freely — also adjustable anytime inside the exercise")}</p>
            <div class="notation-key-toolbar">
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("1. Tongeschlecht:", "1. Tonality:")}</span>
                <div class="notation-key-quick-row">
                  <button type="button" class="k-filter-pill${curTonality === "major" ? " active" : ""}" data-solf-custom-tonality="major">${tr("Dur", "Major")}</button>
                  <button type="button" class="k-filter-pill${curTonality === "minor" ? " active" : ""}" data-solf-custom-tonality="minor">${tr("Moll", "Minor")}</button>
                </div>
              </div>
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("2. Tonart:", "2. Key:")}</span>
                <div class="notation-key-quick-row">
                  ${keyOrder.map(k => {
                    const lbl = k === "random" ? tr("Zufall", "Random") : getKeyDisplayName(k, curTonality);
                    return `<button type="button" class="k-filter-pill${k === curKey ? " active" : ""}" data-solf-custom-key="${k}">${escapeHtml(lbl)}</button>`;
                  }).join("")}
                </div>
              </div>
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("3. Tonraum:", "3. Scale Range:")}</span>
                <div class="notation-key-quick-row">
                  ${rangeDefs.map(r => `
                    <button type="button" class="k-filter-pill${r.id === curRange ? " active" : ""}" data-solf-custom-range="${r.id}">${escapeHtml(r.label)}</button>
                  `).join("")}
                </div>
              </div>
              <div class="notation-key-quick-group">
                <span class="notation-key-quick-label">${tr("4. Oktavlage:", "4. Octave Register:")}</span>
                <div class="notation-key-quick-row">
                  <button type="button" class="k-filter-pill${curOct === "single" ? " active" : ""}" data-solf-custom-oct="single">${tr("1 Oktave", "1 Octave")}</button>
                  <button type="button" class="k-filter-pill${curOct === "multi" ? " active" : ""}" data-solf-custom-oct="multi">${tr("Mehrere Oktaven", "Multi-Octave")}</button>
                </div>
              </div>
            </div>
            <div class="subpage-nodes-grid" style="margin-top: 0.7rem;">
              <button class="subpage-node-btn" data-launch-solfege="17">
                <div class="node-circle circle-peach node-circle-compact">${tr("Frei", "Free")}</div>
                <span class="node-title">${tr("Solfège mit eigener Tonart starten", "Start Custom Key Solfège")}</span>
                <span class="node-sub">${escapeHtml(`${summaryKey} • ${summaryRange} • ${summaryOct}`)}</span>
              </button>
            </div>
          </div>
        `;

        container.querySelectorAll("[data-solf-custom-tonality]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.solfegeCustomTonality = btn.dataset.solfCustomTonality === "minor" ? "minor" : "major";
            renderSolfegeCustomSection();
          });
        });
        container.querySelectorAll("[data-solf-custom-key]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.solfegeCustomKey = btn.dataset.solfCustomKey;
            renderSolfegeCustomSection();
          });
        });
        container.querySelectorAll("[data-solf-custom-range]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.solfegeCustomRange = btn.dataset.solfCustomRange;
            renderSolfegeCustomSection();
          });
        });
        container.querySelectorAll("[data-solf-custom-oct]").forEach(btn => {
          btn.addEventListener("click", () => {
            state.settings.solfegeCustomOctave = btn.dataset.solfCustomOct === "multi" ? "multi" : "single";
            renderSolfegeCustomSection();
          });
        });
        bindSolfegeLaunchButtons(container);
      };
      renderSolfegeCustomSection();
    }

  } else if (categoryKey === "rhythm") {
    const RHYTHM_SECTIONS = [
      {
        id: "rhythm-meter",
        title: tr("Taktart &amp; Metrum erkennen", "Time Signature &amp; Meter"),
        plainTitle: tr("Taktart & Metrum erkennen", "Time Signature & Meter"),
        desc: tr("Höre zwei Takte Percussion und erkenne den Grundschlag sowie die Takt-Betonung", "Hear two bars of percussion and identify the pulse and barline accent"),
        badgeHtml: `<div class="node-circle circle-peach node-circle-icon">${getRhythmNodeIconSVG("meter-34-44")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 3 }),
        isBeginner: true,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-meter" data-rhythm-lvl="1">
            <div class="node-circle circle-peach node-circle-icon">${getRhythmNodeIconSVG("meter-34-44")}</div>
            <span class="node-title">${tr("Stufe 1: Basis", "Level 1: Basics")}</span>
            <span class="node-sub">${tr("4/4-Takt vs. 3/4-Walzer", "4/4 Common Time vs. 3/4 Waltz")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-meter" data-rhythm-lvl="2">
            <div class="node-circle circle-peach node-circle-icon">${getRhythmNodeIconSVG("meter-68")}</div>
            <span class="node-title">${tr("Stufe 2: Unterteilung", "Level 2: Subdivisions")}</span>
            <span class="node-sub">${tr("2/4, 3/4, 4/4 &amp; 6/8-Wiegetakt", "2/4, 3/4, 4/4 &amp; compound 6/8")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-meter" data-rhythm-lvl="3">
            <div class="node-circle circle-peach node-circle-icon">${getRhythmNodeIconSVG("meter-54-78")}</div>
            <span class="node-title">${tr("Stufe 3: Ungerade Takte", "Level 3: Odd Meters")}</span>
            <span class="node-sub">${tr("Inklusive 5/4 (3+2) &amp; 7/8", "Including 5/4 (3+2) &amp; 7/8")}</span>
          </button>
        `
      },
      {
        id: "rhythm-dictation",
        title: tr("Rhythmus-Diktat (4 Zählzeiten)", "Rhythm Dictation (4 Beats)"),
        plainTitle: tr("Rhythmus-Diktat (4 Zählzeiten)", "Rhythm Dictation (4 Beats)"),
        desc: tr("Wie bei den Melodien: Alle 4 Fragezeichen nach Gehör Baustein für Baustein lösen", "Just like melodies: solve all 4 question marks beat by beat by ear"),
        badgeHtml: `<div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("quarter-eighths")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: true,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-dictation" data-rhythm-lvl="1">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("quarter-eighths")}</div>
            <span class="node-title">${tr("Stufe 1: Puls &amp; Pausen", "Level 1: Pulse &amp; Rests")}</span>
            <span class="node-sub">${tr("Viertel, Achtelpaar &amp; Pause", "Quarters, eighth-note pairs &amp; rests")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-dictation" data-rhythm-lvl="2">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("triplet")}</div>
            <span class="node-title">${tr("Stufe 2: Offbeat &amp; Triolen", "Level 2: Offbeats &amp; Triplets")}</span>
            <span class="node-sub">${tr("+ „und“-Offbeat &amp; Achteltriole", "+ “and” offbeats &amp; eighth triplets")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-dictation" data-rhythm-lvl="3">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("sixteenths")}</div>
            <span class="node-title">${tr("Stufe 3: Sechzehntel", "Level 3: Sixteenth Notes")}</span>
            <span class="node-sub">${tr("Vierer-, Achtel- &amp; 16tel-Kombis", "Four-16ths, 8th &amp; 16th combinations")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-dictation" data-rhythm-lvl="4">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("syncopation")}</div>
            <span class="node-title">${tr("Stufe 4: Punkt. &amp; Synkopen", "Level 4: Dotted &amp; Syncopation")}</span>
            <span class="node-sub">${tr("Punktierte Achtel &amp; 16tel-Synkopen", "Dotted eighths &amp; 16th syncopations")}</span>
          </button>
        `
      },
      {
        id: "rhythm-tap",
        title: tr("Rhythmus nachklopfen (Tap-Pad)", "Rhythm Tap-Back (Tap Pad)"),
        plainTitle: tr("Rhythmus nachklopfen (Tap-Pad)", "Rhythm Tap-Back (Tap Pad)"),
        desc: tr("1 Takt Vorzähler, 1 Takt Vorgabe – dann klopfst du den Rhythmus direkt auf dem Pad nach", "1 bar count-in, 1 bar prompt — then tap the rhythm back directly on the pad"),
        badgeHtml: `<div class="node-circle circle-lilac node-circle-icon">${getRhythmNodeIconSVG("tap")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: true,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-lvl="1">
            <div class="node-circle circle-lilac node-circle-icon">${getRhythmNodeIconSVG("tap")}</div>
            <span class="node-title">${tr("Stufe 1: Puls-Anker", "Level 1: Pulse Anchor")}</span>
            <span class="node-sub">${tr("Viertel &amp; Pausen im 4/4-Takt", "Quarter notes &amp; rests in 4/4 time")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-lvl="2">
            <div class="node-circle circle-lilac node-circle-icon">${getRhythmNodeIconSVG("meter-eighths")}</div>
            <span class="node-title">${tr("Stufe 2: Achtel &amp; 3/4", "Level 2: Eighths &amp; 3/4")}</span>
            <span class="node-sub">${tr("Achtelpaare im 4/4 &amp; 3/4-Walzer", "Eighth pairs in 4/4 &amp; 3/4 waltz")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-lvl="3">
            <div class="node-circle circle-lilac node-circle-icon">${getRhythmNodeIconSVG("triplet")}</div>
            <span class="node-title">${tr("Stufe 3: Synkopen &amp; Triolen", "Level 3: Syncopation &amp; Triplets")}</span>
            <span class="node-sub">${tr("Präzises Timing mit Offbeats &amp; Triolen", "Tight timing with offbeats &amp; triplets")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-lvl="4">
            <div class="node-circle circle-lilac node-circle-icon">${getRhythmNodeIconSVG("blind")}</div>
            <span class="node-title">${tr("Stufe 4: Blindflug", "Level 4: Blind Mode")}</span>
            <span class="node-sub">${tr("Klick verstummt während deiner Runde", "Metronome drops out during your turn")}</span>
          </button>
        `
      },
      {
        id: "rhythm-tap-read",
        title: tr("Rhythmus vom Blatt tappen", "Tap Rhythms from Notation"),
        plainTitle: tr("Rhythmus vom Blatt tappen", "Tap Rhythms from Notation"),
        desc: tr("Der Rhythmus steht im Notensystem – ohne Vorspielen. Nach 1 Takt Vorzähler tippst du ihn zum Metronom auf das Pad.", "The rhythm is written on the staff — no demo. After a 1-bar count-in, tap it on the pad along with the metronome."),
        badgeHtml: `<div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("quarter-rest")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-read="1" data-rhythm-lvl="1">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("quarter-rest")}</div>
            <span class="node-title">${tr("Stufe 1: Viertel &amp; Pausen", "Level 1: Quarters &amp; Rests")}</span>
            <span class="node-sub">${tr("Vom Blatt im 4/4-Takt", "Sight-read in 4/4 time")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-read="1" data-rhythm-lvl="2">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("meter-eighths")}</div>
            <span class="node-title">${tr("Stufe 2: Achtel &amp; 3/4", "Level 2: Eighths &amp; 3/4")}</span>
            <span class="node-sub">${tr("Achtelpaare im 4/4 &amp; 3/4", "Eighth pairs in 4/4 &amp; 3/4")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-read="1" data-rhythm-lvl="3">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("triplet")}</div>
            <span class="node-title">${tr("Stufe 3: Synkopen &amp; Triolen", "Level 3: Syncopation &amp; Triplets")}</span>
            <span class="node-sub">${tr("Offbeats &amp; Triolen lesen und tappen", "Read and tap offbeats &amp; triplets")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-tap" data-rhythm-read="1" data-rhythm-lvl="4">
            <div class="node-circle circle-sage node-circle-icon">${getRhythmNodeIconSVG("blind")}</div>
            <span class="node-title">${tr("Stufe 4: Ohne Metronom", "Level 4: No Metronome")}</span>
            <span class="node-sub">${tr("Nach dem Vorzähler hältst du das Tempo allein", "After the count-in you keep the tempo yourself")}</span>
          </button>
        `
      },
      {
        id: "rhythm-groove",
        title: tr("Groove, Akzente &amp; Mikro-Timing", "Groove, Accents &amp; Micro-Timing"),
        plainTitle: tr("Groove, Akzente & Mikro-Timing", "Groove, Accents & Micro-Timing"),
        desc: tr("Spüre Groove-Stile, Offbeat-Akzente und feinste Verschiebungen im Band-Kontext", "Feel groove styles, offbeat accents, and subtle timing shifts in a band context"),
        badgeHtml: `<div class="node-circle circle-peach node-circle-compact node-circle-nowrap">Groove</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-groove" data-rhythm-lvl="1">
            <div class="node-circle circle-peach node-circle-compact">Groove</div>
            <span class="node-title">${tr("Stufe 1: Groove-Stile", "Level 1: Groove Styles")}</span>
            <span class="node-sub">${tr("Marsch, Backbeat, Swing &amp; 3 gegen 2", "March, Backbeat, Swing &amp; 3-against-2")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-groove" data-rhythm-lvl="2">
            <div class="node-circle circle-peach">1 + 2</div>
            <span class="node-title">${tr("Stufe 2: Offbeat-Spürsinn", "Level 2: Offbeat Radar")}</span>
            <span class="node-sub">${tr("Exakten Cowbell-Akzent lokalisieren", "Pinpoint the exact cowbell accent")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-groove" data-rhythm-lvl="3">
            <div class="node-circle circle-peach node-circle-stack"><span>±55</span><span class="node-stack-sub">ms</span></div>
            <span class="node-title">${tr("Stufe 3: Mikro-Timing", "Level 3: Micro-Timing")}</span>
            <span class="node-sub">${tr("Zu früh, exakt („Pocket“) oder zu spät?", "Ahead, in the pocket, or laid back?")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-rhythm="rhythm-groove" data-rhythm-lvl="4">
            <div class="node-circle circle-peach node-circle-stack"><span>±28</span><span class="node-stack-sub">ms</span></div>
            <span class="node-title">${tr("Stufe 4: Profi-Timing", "Level 4: Pro Timing")}</span>
            <span class="node-sub">${tr("Feinste Abweichungen sicher heraushören", "Hear the tiniest timing shifts cleanly")}</span>
          </button>
        `
      }
    ].map(item => ({ ...item, titleHtml: formatStackedParenTitle(item.title) }));

    const selectedRhythm = activeSection ? RHYTHM_SECTIONS.find(s => s.id === activeSection) : null;
    if (!selectedRhythm) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, RHYTHM_SECTIONS);
    } else {
      state.activeCategorySectionTitle = selectedRhythm.plainTitle;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${selectedRhythm.titleHtml || selectedRhythm.title}</h3>
          <p class="subpage-section-desc">${selectedRhythm.desc}</p>
          <div class="subpage-nodes-grid">${selectedRhythm.cardsHtml}</div>
        </div>
      `;

      container.querySelectorAll("[data-launch-rhythm]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setRhythmLevel(btn.dataset.launchRhythm, btn.dataset.rhythmLvl, btn.dataset.rhythmRead === "1");
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    }

  } else if (categoryKey === "production") {
    const safetyBannerHtml = `
      <div class="prod-safety-banner">
        <strong>${tr("Gehörschutz &amp; Rosa Rauschen:", "Hearing Protection &amp; Pink Noise:")}</strong> ${tr("Alle Signale laufen über einen integrierten -14 dBFS Schutz-Limiter mit Lautheits-Ausgleich (insbesondere bei 2–4 kHz) und weichen Ein- und Ausblenden. Übe dennoch bei moderater Abhörlautstärke.", "All signals pass through a built-in -14 dBFS safety limiter with equal-loudness compensation (especially around 2–4 kHz) and smooth fades. Always practice at a comfortable listening level.")}
      </div>
    `;
    const PROD_SECTIONS = [
      {
        id: "prod-tone",
        title: tr("Frequenzen erkennen (Reinton / Sinus)", "Frequency Recognition (Sine Wave)"),
        plainTitle: tr("Frequenzen erkennen (Sinus)", "Frequency Recognition (Sine)"),
        desc: tr("Trainiere dein absolutes Frequenz-Gefühl vom Subbass (63 Hz) bis in die Air-Höhen (12 kHz)", "Train absolute frequency recall from sub-bass (63 Hz) up to the air band (12 kHz)"),
        badgeHtml: `<div class="node-circle circle-sage">Hz</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 3 }),
        isBeginner: true,
        cardsHtml: `
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
        `
      },
      {
        id: "prod-eq-noise",
        title: tr("EQ-Boost im Pink Noise (Fortgeschritten)", "EQ Boost in Pink Noise (Advanced)"),
        plainTitle: tr("EQ-Boost im Pink Noise", "EQ Boost in Pink Noise"),
        desc: tr("Erst erklingt neutrales Pink Noise („Flat“), dann hebt ein Peaking-EQ genau eine Frequenz gezielt an", "First you hear neutral pink noise (“Flat”), then a peaking EQ boosts one targeted frequency"),
        badgeHtml: `<div class="node-circle circle-lilac">EQ</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 3 }),
        isBeginner: false,
        cardsHtml: `
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
        `
      }
    ];

    const selectedProd = activeSection ? PROD_SECTIONS.find(s => s.id === activeSection) : null;
    if (!selectedProd) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, PROD_SECTIONS, { introHtml: safetyBannerHtml });
    } else {
      state.activeCategorySectionTitle = selectedProd.plainTitle;
      container.innerHTML = `
        ${safetyBannerHtml}
        <div class="subpage-section">
          <h3 class="subpage-section-title">${selectedProd.title}</h3>
          <p class="subpage-section-desc">${selectedProd.desc}</p>
          <div class="subpage-nodes-grid">${selectedProd.cardsHtml}</div>
        </div>
      `;

      container.querySelectorAll("[data-launch-prod]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setProdLevel(btn.dataset.launchProd, btn.dataset.prodLvl);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    }

  } else if (categoryKey === "modes") {
    const MODES_SECTIONS = [
      {
        id: "modes-scale",
        title: tr("1. Modus / Tonleiter erkennen", "1. Mode / Scale Recognition"),
        plainTitle: tr("Modus / Tonleiter erkennen", "Mode / Scale Recognition"),
        desc: tr("Erst hörst du die neutrale Anker-Quinte (ohne Terz), dann die 8-tönige Tonleiter aufwärts", "First you hear a neutral open-fifth anchor (no 3rd), then the 8-note ascending scale"),
        badgeHtml: `<div class="node-circle circle-peach node-circle-compact node-circle-nowrap">7× C</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 3 }),
        isBeginner: true,
        cardsHtml: `
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
            <div class="node-circle circle-peach node-circle-stack"><span>7×</span><span class="node-stack-sub">Transp.</span></div>
            <span class="node-title">${tr("Stufe 3: Transponiert", "Level 3: Transposed")}</span>
            <span class="node-sub">${tr("Alle 7 Modi über wechselnde Grundtöne", "All 7 modes across changing roots")}</span>
          </button>
        `
      },
      {
        id: "modes-char",
        title: tr("2. Charakterton &amp; Klangfarbe", "2. Characteristic Note &amp; Color"),
        plainTitle: tr("Charakterton & Klangfarbe", "Characteristic Note & Color"),
        desc: tr("Erkenne den Modus direkt an seiner charakteristischen Reibung (#4, b7, ♮6, b2, b5 oder #7)", "Recognize each mode immediately by its color tone (#4, b7, ♮6, b2, b5, or #7)"),
        badgeHtml: `<div class="node-circle circle-sage node-circle-compact node-circle-nowrap">#4/b7</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 3 }),
        isBeginner: false,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-modes="modes-char" data-modes-lvl="1">
            <div class="node-circle circle-sage node-circle-compact node-circle-nowrap">#4/b7</div>
            <span class="node-title">${tr("Stufe 1: Dur-Modi", "Level 1: Major Modes")}</span>
            <span class="node-sub">${tr("Ionisch vs. Lydisch vs. Mixolydisch", "Ionian vs. Lydian vs. Mixolydian")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-char" data-modes-lvl="2">
            <div class="node-circle circle-sage node-circle-compact node-circle-nowrap">♮6/b2</div>
            <span class="node-title">${tr("Stufe 2: Moll-Modi", "Level 2: Minor Modes")}</span>
            <span class="node-sub">${tr("Äolisch, Dorisch, Phrygisch &amp; Lokrisch", "Aeolian, Dorian, Phrygian &amp; Locrian")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-char" data-modes-lvl="3">
            <div class="node-circle circle-sage node-circle-compact node-circle-nowrap">+Harm</div>
            <span class="node-title">${tr("Stufe 3: Gesamt-Spektrum", "Level 3: Full Spectrum")}</span>
            <span class="node-sub">${tr("Alle 7 Modi + Harmonisch Moll", "All 7 modes + Harmonic Minor")}</span>
          </button>
        `
      },
      {
        id: "modes-cadence",
        title: tr("3. Modale Kadenzen &amp; Akkordpendel", "3. Modal Cadences &amp; Chord Loops"),
        plainTitle: tr("Modale Kadenzen & Akkordpendel", "Modal Cadences & Chord Loops"),
        desc: tr("Akkordpendel: Zwei Akkorde wechseln sich immer wieder ab und machen so die Farbe eines Modus hörbar (z. B. i–IV, I–bVII, I–II oder i–bII).", "Chord loops: two chords alternate again and again, revealing the color of a mode (e.g. i–IV, I–bVII, I–II or i–bII)."),
        badgeHtml: `<div class="node-circle circle-lilac node-circle-stack"><span>6×</span><span class="node-stack-sub">${tr("Pendel", "Loop")}</span></div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 2 }),
        isBeginner: false,
        cardsHtml: `
          <button class="subpage-node-btn" data-launch-modes="modes-cadence" data-modes-lvl="1">
            <div class="node-circle circle-lilac node-circle-stack"><span>4×</span><span class="node-stack-sub">${tr("Pendel", "Loop")}</span></div>
            <span class="node-title">${tr("Stufe 1: Standard-Akkordpendel", "Level 1: Standard Chord Loops")}</span>
            <span class="node-sub">${tr("Ionisch, Dorisch, Mixolydisch &amp; Äolisch", "Ionian, Dorian, Mixolydian &amp; Aeolian")}</span>
          </button>
          <button class="subpage-node-btn" data-launch-modes="modes-cadence" data-modes-lvl="2">
            <div class="node-circle circle-lilac node-circle-stack"><span>6×</span><span class="node-stack-sub">${tr("Pendel", "Loop")}</span></div>
            <span class="node-title">${tr("Stufe 2: Alle 6 modalen Akkordpendel", "Level 2: All 6 Modal Chord Loops")}</span>
            <span class="node-sub">${tr("Inkl. Lydisch (I–II) &amp; Phrygisch (i–bII)", "Incl. Lydian (I–II) &amp; Phrygian (i–bII)")}</span>
          </button>
        `
      }
    ];

    const selectedModes = activeSection ? MODES_SECTIONS.find(s => s.id === activeSection) : null;
    if (!selectedModes) {
      state.activeCategorySection = null;
      renderCategoryTypeMenu(container, categoryKey, MODES_SECTIONS);
    } else {
      state.activeCategorySectionTitle = selectedModes.plainTitle;
      container.innerHTML = `
        <div class="subpage-section">
          <h3 class="subpage-section-title">${selectedModes.title}</h3>
          <p class="subpage-section-desc">${selectedModes.desc}</p>
          <div class="subpage-nodes-grid">${selectedModes.cardsHtml}</div>
        </div>
      `;

      container.querySelectorAll("[data-launch-modes]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.setModesLevel(btn.dataset.launchModes, btn.dataset.modesLvl);
          state.exerciseReturnView = "category";
          switchView("exercise");
        });
      });
    }

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
      },
      {
        mode: "notation-grand",
        circleClass: "circle-sage",
        title: tr("Doppelsystem (Violin- &amp; Bassschlüssel)", "Grand Staff (Treble &amp; Bass)"),
        desc: tr(
          "Klaviersystem mit beiden Schlüsseln gleichzeitig: Die Noten springen zwischen oberem und unterem System – wie beim Klavierspielen mit zwei Händen.",
          "Piano-style grand staff with both clefs at once: notes jump between the upper and lower staff — just like reading for two hands."
        )
      },
      {
        mode: "notation-chords",
        circleClass: "circle-lilac",
        title: tr("Akkorde lesen", "Chord Reading"),
        desc: tr(
          "Mehrere Noten übereinander: Lies Grundton und Akkordaufbau im Notensystem und wähle das passende Akkordsymbol (z. B. E, Em, E7, Esus4).",
          "Stacked notes: read root and chord structure on the staff and pick the matching chord symbol (e.g. E, Em, E7, Esus4)."
        ),
        levels: [
          { lvl: 1, badge: "E/Em",   nodeClass: "node-circle-compact node-circle-nowrap", title: tr("Stufe 1: Dreiklänge (Violin)", "Level 1: Triads (Treble)"), sub: tr("Dur, Moll, Vermindert, Übermäßig & Sus", "Major, minor, dim, aug & sus (root pos.)") },
          { lvl: 2, badge: `<span>Em</span><span class="node-stack-sub">${tr("Bass", "Bass")}</span>`, nodeClass: "node-circle-stack", title: tr("Stufe 2: Dreiklänge (Bass)", "Level 2: Triads (Bass)"),     sub: tr("Alle Grundtypen im Bassschlüssel", "Basic chord types in bass clef") },
          { lvl: 3, badge: "6/64",   nodeClass: "node-circle-compact node-circle-nowrap", title: tr("Stufe 3: Umkehrungen", "Level 3: Inversions"),             sub: tr("Dreiklänge & Sus in allen Lagen, beide Schlüssel", "Triads & sus in all inversions, both clefs") },
          { lvl: 4, badge: "E7",     title: tr("Stufe 4: Alle Typen & Septakkorde", "Level 4: All Types & 7th Chords"), sub: tr("E, Em, E7, Emaj7, Esus4 u. v. m. inkl. Umkehrungen", "E, Em, E7, Emaj7, Esus4 & more + inversions") }
        ]
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
      { mode: "notation-mixed",  label: tr("Schlüssel-Mix", "Mixed") },
      { mode: "notation-grand",  label: tr("Doppelsystem", "Grand Staff") }
    ];

    const TRAINER_RANGES = [
      { lvl: 1, label: tr("5 Linien", "5 Lines") },
      { lvl: 2, label: tr("±2 Hilfslinien", "±2 Ledgers") },
      { lvl: 3, label: tr("±3 Hilfslinien", "±3 Ledgers") }
    ];

    const NOTATION_TYPE_ITEMS = [
      {
        id: "notation-treble",
        title: tr("Violinschlüssel (G-Schlüssel)", "Treble Clef (G Clef)"),
        desc: tr(
          "Der G-Schlüssel markiert g' (G4) auf der 2. Linie von unten – die Basis für Klavier (rechte Hand), Gesang, Violine, Flöte &amp; Gitarre.",
          "Marks G4 on the 2nd line from the bottom — essential for piano right hand, vocals, violin, flute &amp; guitar."
        ),
        badgeHtml: `<div class="node-circle circle-peach node-circle-icon">${getCategoryBadgeSVG("treble")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: true
      },
      {
        id: "notation-bass",
        title: tr("Bassschlüssel (F-Schlüssel)", "Bass Clef (F Clef)"),
        desc: tr(
          "Der F-Schlüssel markiert f (F3) auf der 4. Linie zwischen den beiden Punkten – Standard für Bass, Cello, Posaune &amp; Klavier (linke Hand).",
          "Marks F3 on the 4th line between its two dots — standard for bass, cello, trombone &amp; piano left hand."
        ),
        badgeHtml: `<div class="node-circle circle-sage node-circle-icon">${getCategoryBadgeSVG("bass")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false
      },
      {
        id: "notation-alto",
        title: tr("Altschlüssel (C-Schlüssel)", "Alto Clef (C Clef)"),
        desc: tr(
          "Der C-Schlüssel legt das mittlere c' (C4) exakt auf die 3. (mittlere) Notenlinie – Pflichtschlüssel für Bratsche &amp; Partiturlesen.",
          "Places middle C4 right on the 3rd (center) line — standard clef for viola and full-score reading."
        ),
        badgeHtml: `<div class="node-circle circle-lilac node-circle-icon">${getCategoryBadgeSVG("alto")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false
      },
      {
        id: "notation-mixed",
        title: tr("Alle Schlüssel gemischt", "Mixed Clefs"),
        desc: tr(
          "Wechselt in der Notenzeile flexibel zwischen Violin-, Bass- und Altschlüssel – ideal für flüssiges Blattlesen und Partituren.",
          "Alternates across Treble, Bass &amp; Alto clefs — great practice for agile sight-reading across systems."
        ),
        badgeHtml: `<div class="node-circle circle-peach node-circle-icon">${getCategoryBadgeSVG("mixed")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false
      },
      {
        id: "notation-grand",
        title: tr("Doppelsystem (Violin- &amp; Bassschlüssel)", "Grand Staff (Treble &amp; Bass)"),
        desc: tr(
          "Klaviersystem mit beiden Schlüsseln gleichzeitig: Die Noten springen zwischen oberem und unterem System – wie beim Klavierspielen mit zwei Händen.",
          "Piano-style grand staff with both clefs at once: notes jump between the upper and lower staff — just like reading for two hands."
        ),
        badgeHtml: `<div class="node-circle circle-sage node-circle-icon">${getCategoryBadgeSVG("grand")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false
      },
      {
        id: "notation-chords",
        title: tr("Akkorde lesen", "Chord Reading"),
        desc: tr(
          "Mehrere Noten übereinander: Lies Grundton und Akkordaufbau im Notensystem und wähle das passende Akkordsymbol (z. B. E, Em, E7, Esus4).",
          "Stacked notes: read root and chord structure on the staff and pick the matching chord symbol (e.g. E, Em, E7, Esus4)."
        ),
        badgeHtml: `<div class="node-circle circle-lilac node-circle-compact node-circle-nowrap">E/Em</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false
      },
      {
        id: "notation-keys",
        title: tr("Tonarten-Blattspiel (Generalvorzeichen)", "Key-Signature Sight-Reading"),
        desc: tr(
          "Lies ganze 8-Noten-Phrasen mit vorgegebener Tonart im Notensystem und beachte die Vorzeichen vom Blatt!",
          "Read 8-note phrases with an active key signature on the staff and remember the sharps &amp; flats while playing!"
        ),
        badgeHtml: `<div class="node-circle circle-peach node-circle-icon">${getCategoryBadgeSVG("keysig")}</div>`,
        meta: tf("{n} Stufen", "{n} Levels", { n: 4 }),
        isBeginner: false
      }
    ].map(item => ({ ...item, titleHtml: formatStackedParenTitle(item.title) }));

    const selectedNotType = activeSection ? NOTATION_TYPE_ITEMS.find(t => t.id === activeSection) : null;
    let notationKeyDrawerOpen = false;

    const renderNotationCategoryBody = () => {
      if (!selectedNotType) {
        state.activeCategorySection = null;
        renderCategoryTypeMenu(container, categoryKey, NOTATION_TYPE_ITEMS);
        return;
      }
      state.activeCategorySectionTitle = selectedNotType.title.replace(/&amp;/g, "&");
      const selectedKeyMode = normalizeNotationKeyMode(state.settings.notationKeyMode);
      const hasSelectedKey = selectedKeyMode !== "none";
      const trainerClefMode = isNotationMode(state.settings.notationKeyTrainerClef)
        ? state.settings.notationKeyTrainerClef
        : "notation-treble";
      const trainerRangeLvl = Math.max(1, Math.min(3, parseInt(state.settings.notationKeyTrainerLevel, 10) || 2));
      const effectiveClefForPreview = selectedNotType.id === "notation-keys" ? trainerClefMode : selectedNotType.id;
      const previewClefId = (effectiveClefForPreview === "notation-mixed" || effectiveClefForPreview === "notation-grand" || effectiveClefForPreview === "notation-chords")
        ? "treble"
        : getNotationClefFromMode(effectiveClefForPreview);

      const previewKeySigId = isNotationKeyPoolMode(selectedKeyMode)
        ? (selectedKeyMode === "easy" ? "D" : selectedKeyMode === "medium" ? "Eb" : selectedKeyMode === "hard" ? "B" : "A")
        : selectedKeyMode;
      // Breite passend zur Zahl der Vorzeichen, damit kein leerer Linienrest übrig bleibt
      const previewSigCount = getNotationKeySignatureSteps(previewClefId, normalizeNotationKeySigId(previewKeySigId)).length;
      const previewSvg = buildNotationStaffSVG([], {
        clefId: previewClefId,
        keySignatureId: previewKeySigId,
        width: Math.max(140, 118 + previewSigCount * 10),
        compact: true
      });
      // Bei Tonart-Gruppen: Schwierigkeitsgrad in der ersten Zeile, das Beispiel immer in einer eigenen Zeile darunter
      const previewExample = isNotationKeyPoolMode(selectedKeyMode)
        ? tf("Beispiel: {ex}", "Example: {ex}", {
            ex: `${getLocalizedNotationKeySigName(previewKeySigId)} (${getLocalizedNotationKeySigBadge(previewKeySigId, true)})`
          })
        : "";
      const previewTitle = isNotationKeyPoolMode(selectedKeyMode)
        ? getLocalizedNotationKeyModeLabel(selectedKeyMode, false)
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
          badge: hasSelectedKey ? getCategoryBadgeSVG("nat-sharp") : getCategoryBadgeSVG("keysig"),
          nodeClass: "node-circle-icon",
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
          nodeClass: "node-circle-icon",
          badge: getCategoryBadgeSVG("keysig-nat"),
          title: tr("Tonarten + Auflösungszeichen", "Key Signatures + Naturals (♮)"),
          sub: tr("Blattspiel-Profi mit ♮ &amp; Wechselvorzeichen", "Pro sight-reading with ♮ &amp; accidentals")
        }
      ];

      const keyToolbarHtml = `
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
              ${previewExample ? `<span class="notation-key-preview-example">${escapeHtml(previewExample)}</span>` : ""}
              <span class="notation-key-preview-desc">${previewDesc}</span>
            </div>
          </div>
        </div>
      `;

      if (selectedNotType.id === "notation-keys") {
        container.innerHTML = `
          <div class="subpage-section">
            <h3 class="subpage-section-title">${formatStackedParenTitle(tr("Tonarten-Blattspiel (Generalvorzeichen)", "Key-Signature Sight-Reading"))}</h3>
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
                  <div class="node-circle ${kc.circle}${kc.nodeClass ? ` ${kc.nodeClass}` : ""}">${kc.badge}</div>
                  <span class="node-title">${kc.title}</span>
                  <span class="node-sub">${kc.sub}</span>
                </button>
              `).join("")}
            </div>
          </div>

          <div class="subpage-section">
            <h3 class="subpage-section-title">${tr("Tonart / Generalvorzeichen wählen", "Choose Key Signature")}</h3>
            <p class="subpage-section-desc">${tr(
              "Lege fest, ob Tonarten mit Vorzeichen am Notenanfang stehen sollen – gilt auch für alle Schlüssel-Übungen.",
              "Set a key signature at the start of the staff — also applies to all clef exercises."
            )}</p>
            ${keyToolbarHtml}
          </div>
        `;
      } else {
        const sec = NOTATION_SECTIONS.find(s => s.mode === selectedNotType.id);
        container.innerHTML = `
          <div class="subpage-section">
            <div class="subpage-section-head-row">
              <h3 class="subpage-section-title">${formatStackedParenTitle(sec.title)}</h3>
              <span class="subpage-section-key-pill">${escapeHtml(getLocalizedNotationKeyModeLabel(selectedKeyMode, true))}</span>
            </div>
            <p class="subpage-section-desc">${sec.desc}</p>
            <div class="subpage-nodes-grid">
              ${(sec.levels || NOTATION_DIFFICULTY_CARDS).map(lv => `
                <button class="subpage-node-btn" data-launch-notation="${sec.mode}" data-notation-lvl="${lv.lvl}">
                  <div class="node-circle ${sec.circleClass}${lv.nodeClass ? ` ${lv.nodeClass}` : ""}">${lv.badge}</div>
                  <span class="node-title">${lv.title}</span>
                  <span class="node-sub">${lv.sub}</span>
                </button>
              `).join("")}
            </div>
          </div>

          <details class="notation-key-collapse"${notationKeyDrawerOpen ? " open" : ""}>
            <summary class="notation-key-collapse-summary">
              <span>${escapeHtml(tr("Tonart / Generalvorzeichen anpassen", "Customize Key Signature"))}</span>
              <span class="subpage-section-key-pill">${escapeHtml(getLocalizedNotationKeyModeLabel(selectedKeyMode, true))}</span>
            </summary>
            <div class="notation-key-collapse-body">${keyToolbarHtml}</div>
          </details>
        `;

        const detailsEl = container.querySelector(".notation-key-collapse");
        detailsEl?.addEventListener("toggle", () => {
          notationKeyDrawerOpen = Boolean(detailsEl.open);
        });
      }

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

      markBeginnerExerciseNodes(container);
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

  const isCategoryMainPage = !state.activeCategorySection;

  // Prüfungs-Einstieg nur auf der Hauptseite der Übungskategorie (nicht beim Einsing-Helfer, nicht auf Aufgabentyp-Unterseiten)
  if (isCategoryMainPage && categoryKey !== "warmup" && EXAM_CATEGORY_LEVELS[categoryKey]) {
    const examCfg = EXAM_CATEGORY_LEVELS[categoryKey];
    const catBest = getCategoryBestExamPercent(categoryKey);
    const catBestHtml = catBest !== null
      ? `<span class="category-exam-best">${escapeHtml(tf("Dein Bestwert: {pct}%", "Personal Best: {pct}%", { pct: catBest }))}</span>`
      : "";
    container.insertAdjacentHTML("beforeend", `
      <button id="openCategoryExamBtn" class="category-exam-entry-card accent-${examCfg.accent || "sage"}" type="button">
        <span class="category-exam-entry-left">
          <span class="category-exam-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="4.5" width="14" height="16.5" rx="2.6"/>
              <path d="M9.2 4.5V3.6c0-.6.5-1.1 1.1-1.1h3.4c.6 0 1.1.5 1.1 1.1v.9"/>
              <path d="M9 12.6l2.2 2.2 4-4.3"/>
              <path d="M9 18h6"/>
            </svg>
          </span>
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

  // „So funktioniert’s“-Button bleibt auf der Hauptseite der jeweiligen Übungskategorie
  if (isCategoryMainPage) {
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
  }

  if (!options.refreshOnly) {
    if (wasSameView) {
      state.updateHeaderSubtext();
      const nextSec = state.activeCategorySection || null;
      if (!options.skipHistoryPush && !appHistoryState.isApplying && (prevCat !== categoryKey || prevSec !== nextSec)) {
        pushAppHistory(null);
      }
      const viewEl = document.getElementById("viewCategory");
      if (viewEl) viewEl.scrollTop = 0;
      window.scrollTo?.(0, 0);
    } else {
      switchView("category", { skipHistoryPush: Boolean(options.skipHistoryPush) });
    }
  } else {
    state.updateHeaderSubtext();
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

function getProfileUserName(shortForStage = false) {
  const raw = String(state.profile?.name || "").trim();
  if (!raw) return "";
  if (shortForStage && raw.length > 16) {
    const firstWord = raw.split(/\s+/)[0] || raw;
    return firstWord.slice(0, 16);
  }
  return raw;
}

function formatHeroQuoteWithProfileName(quoteText, quoteIndex) {
  const text = String(quoteText || "");
  const name = getProfileUserName(true);
  if (!text || !name || !(quoteIndex >= 0)) return text;
  const step = Number(state.quotePersonalizeStep || 0);
  // Hin und wieder (etwa jeder zweite bis dritte Spruch) den Nutzer direkt mit Namen ansprechen
  const shouldPersonalize = step > 0 ? (step % 2 === 1) : (quoteIndex % 2 === 0);
  if (!shouldPersonalize) return text;

  const rawQuote = LAUSCHEBAER_QUOTES[quoteIndex];
  const rawCat = rawQuote?.cat || "";
  if (rawCat === "Wusstest du?") {
    return `${tf("{name}, wusstest du schon?", "{name}, did you know?", { name })} ${text}`;
  }
  if (rawCat === "Praxis-Tipp") {
    return `${tf("Tipp für dich, {name}:", "Tip for you, {name}:", { name })} ${text}`;
  }
  if (rawCat === "Mutmacher" || rawCat === "Hinweis") {
    return `${tf("{name}, denk dran:", "{name}, remember:", { name })} ${text}`;
  }
  if (quoteIndex % 3 === 0) {
    return `${tf("Für dein Ohr, {name}:", "For your ear, {name}:", { name })} ${text}`;
  }
  return `${tf("Hey {name}:", "Hey {name}:", { name })} ${text}`;
}

function getQuoteWeight(quoteIndex) {
  const raw = LAUSCHEBAER_QUOTES[quoteIndex];
  const w = Number(raw?.weight);
  return Number.isFinite(w) && w > 0 ? w : 1;
}

function isPriorityNoticeQuote(quoteIndex) {
  return getQuoteWeight(quoteIndex) > 1;
}

function pickWeightedQuoteIndex(candidates) {
  if (!candidates.length) return -1;
  let totalWeight = 0;
  for (const idx of candidates) totalWeight += getQuoteWeight(idx);
  let r = Math.random() * totalWeight;
  for (const idx of candidates) {
    r -= getQuoteWeight(idx);
    if (r <= 0) return idx;
  }
  return candidates[candidates.length - 1];
}

function refreshCurrentQuoteLocalization() {
  const quotes = getLocalizedQuotes();
  if (!quotes.length || state.currentQuoteIndex < 0 || !quotes[state.currentQuoteIndex]) return;
  const item = quotes[state.currentQuoteIndex];
  const badgeEl = document.getElementById("quoteCategoryBadge");
  const textEl = document.getElementById("heroQuoteText");
  if (badgeEl) badgeEl.textContent = item.cat;
  if (textEl) textEl.textContent = formatHeroQuoteWithProfileName(item.text, state.currentQuoteIndex);
}

function pickRandomQuote() {
  const quotes = getLocalizedQuotes();
  if (quotes.length === 0) return;

  const priorityIndices = [];
  const regularIndices = [];
  for (let i = 0; i < quotes.length; i++) {
    if (isPriorityNoticeQuote(i)) priorityIndices.push(i);
    else regularIndices.push(i);
  }

  const prevIdx = state.currentQuoteIndex;
  const prevWasPriority = prevIdx >= 0 && isPriorityNoticeQuote(prevIdx);
  const sincePriority = Number(state.quotesSincePriorityNotice || 0);
  const lastPriorityIdx = Number.isInteger(state.lastPriorityQuoteIndex) ? state.lastPriorityQuoteIndex : -1;

  let nextIdx = -1;
  if (quotes.length === 1) {
    nextIdx = 0;
  } else if (priorityIndices.length > 0 && sincePriority >= 4 && !prevWasPriority) {
    const pool = priorityIndices.length > 1
      ? priorityIndices.filter(i => i !== lastPriorityIdx)
      : priorityIndices;
    nextIdx = pickWeightedQuoteIndex(pool);
  } else if (prevWasPriority && regularIndices.length > 0) {
    nextIdx = pickWeightedQuoteIndex(regularIndices);
  } else {
    const pool = [];
    for (let i = 0; i < quotes.length; i++) {
      if (i === prevIdx) continue;
      if (isPriorityNoticeQuote(i) && priorityIndices.length > 1 && i === lastPriorityIdx) continue;
      pool.push(i);
    }
    nextIdx = pickWeightedQuoteIndex(pool.length ? pool : [0]);
  }

  state.currentQuoteIndex = nextIdx;
  if (isPriorityNoticeQuote(nextIdx)) {
    state.quotesSincePriorityNotice = 0;
    state.lastPriorityQuoteIndex = nextIdx;
  } else {
    state.quotesSincePriorityNotice = sincePriority + 1;
  }
  state.quotePersonalizeStep = Number(state.quotePersonalizeStep || 0) + 1;
  refreshCurrentQuoteLocalization();
}
