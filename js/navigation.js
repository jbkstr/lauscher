/**
 * Lauscher • Routing, History, Capacitor-Bridge, Über/Rechtliches & Startseiten-Zitate
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
  const themeUnlock = document.getElementById("themeUnlockBackdrop");
  if (themeUnlock && !themeUnlock.classList.contains("modal-hidden")) return "themeUnlock";
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
  setText("aboutLegalBackBtn", `← ${tr("Zurück", "Back", { fr: "Retour", es: "Volver", it: "Indietro", pl: "Wstecz", tr: "Geri", uk: "Назад", ur: "واپس", ar: "رجوع" })}`);
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
    onlineLink.textContent = `${tr("Online-Fassung öffnen", "Open online version", { fr: "Ouvrir la version en ligne", es: "Abrir la versión en línea", it: "Apri la versione online", pl: "Otwórz wersję online", tr: "Çevrimiçi sürümü aç", uk: "Відкрити онлайн-версію", ur: "آن لائن ورژن کھولیں", ar: "فتح النسخة عبر الإنترنت" })} ↗`;
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
    it: "Lauscher – Messaggio",
    pl: "Lauscher – Wiadomość",
    tr: "Lauscher – Mesaj",
    uk: "Lauscher – Повідомлення",
    ur: "Lauscher – پیغام",
    ar: "Lauscher – رسالة"
  });
  const greeting = tr("Hallo,", "Hi,", { fr: "Bonjour,", es: "Hola:", it: "Ciao,", pl: "Cześć,", tr: "Merhaba,", uk: "Привіт,", ur: "السلام علیکم،", ar: "مرحباً،" });
  const isNativeApp = Boolean(getCapacitorNativePlugin("App"));
  const platform = isNativeApp
    ? tr("Android-App", "Android app", { fr: "Application Android", es: "App de Android", it: "App Android", pl: "Aplikacja Android", tr: "Android uygulaması", uk: "Android-застосунок", ur: "اینڈرائیڈ ایپ", ar: "تطبيق أندرويد" })
    : tr("Browser", "Browser", { fr: "Navigateur", es: "Navegador", it: "Browser", pl: "Przeglądarka", tr: "Tarayıcı", uk: "Браузер", ur: "براؤزر", ar: "المتصفح" });
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
        it: "Se non si è aperta nessuna app di posta, scrivi semplicemente a:",
        pl: "Jeśli nie otworzyła się aplikacja pocztowa, napisz po prostu na:",
        tr: "E-posta uygulaması açılmadıysa doğrudan şu adrese yaz:",
        uk: "Якщо поштовий застосунок не відкрився, просто напиши на:",
        ur: "اگر کوئی میل ایپ نہیں کھلی تو اس پتے پر لکھیں:",
        ar: "إذا لم يُفتح تطبيق البريد، اكتب مباشرةً إلى:"
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
    return tr("✓ Kopiert", "✓ Copied", { fr: "✓ Copié", es: "✓ Copiado", it: "✓ Copiato", pl: "✓ Skopiowano", tr: "✓ Kopyalandı", uk: "✓ Скопійовано", ur: "✓ کاپی ہو گیا", ar: "✓ تم النسخ" });
  }
  return kind === "link"
    ? tr("Link kopieren", "Copy link", { fr: "Copier le lien", es: "Copiar enlace", it: "Copia link", pl: "Kopiuj link", tr: "Bağlantıyı kopyala", uk: "Копіювати посилання", ur: "لنک کاپی کریں", ar: "نسخ الرابط" })
    : tr("Adresse kopieren", "Copy address", { fr: "Copier l’adresse", es: "Copiar dirección", it: "Copia indirizzo", pl: "Kopiuj adres", tr: "Adresi kopyala", uk: "Копіювати адресу", ur: "پتہ کاپی کریں", ar: "نسخ العنوان" });
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
      it: "Lauscher – allenamento dell’orecchio in tranquillità, senza pubblicità né tracciamento. Ecco l’app Android:",
      pl: "Lauscher – spokojny trening słuchu bez reklam i śledzenia. Aplikacja na Androida jest tutaj:",
      tr: "Lauscher – reklamsız ve izlemesiz, sakin kulak eğitimi. Android uygulamasını burada bulabilirsin:",
      uk: "Lauscher – спокійне тренування слуху без реклами й стеження. Застосунок для Android тут:",
      ur: "Lauscher – اشتہارات اور ٹریکنگ کے بغیر پُرسکون سماعتی تربیت۔ اینڈرائیڈ ایپ یہاں ملے گی:",
      ar: "Lauscher – تدريب سمعي هادئ بلا إعلانات أو تتبّع. احصل على تطبيق أندرويد من هنا:"
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
    mail.textContent = tr("E-Mail", "Email", { fr: "E-mail", es: "Correo", it: "E-mail", pl: "E-mail", tr: "E-posta", uk: "Ел. пошта", ur: "ای میل", ar: "البريد الإلكتروني" });
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
      await sharePlugin.share({ title, text, url: LAUSCHER_SHARE_URL, dialogTitle: tr("Lauscher teilen", "Share Lauscher", { fr: "Partager Lauscher", es: "Compartir Lauscher", it: "Condividi Lauscher", pl: "Udostępnij Lauscher", tr: "Lauscher'ı paylaş", uk: "Поділитися Lauscher", ur: "Lauscher شیئر کریں", ar: "مشاركة Lauscher" }) });
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
    showAppToast(`✓ ${tr("Link zu Lauscher kopiert", "Link to Lauscher copied", { fr: "Lien vers Lauscher copié", es: "Enlace a Lauscher copiado", it: "Link di Lauscher copiato", pl: "Skopiowano link do Lauscher", tr: "Lauscher bağlantısı kopyalandı", uk: "Посилання на Lauscher скопійовано", ur: "Lauscher کا لنک کاپی ہو گیا", ar: "تم نسخ رابط Lauscher" })}`, "success");
  }
  showAboutCopyFallback({
    message: tr(
      "Dein Gerät bietet hier kein Teilen-Fenster an. Schick den Link direkt weiter oder kopiere ihn:",
      "Your device doesn’t offer a share window here. Send the link directly or copy it:",
      {
        fr: "Ton appareil ne propose pas de fenêtre de partage ici. Envoie le lien directement ou copie-le :",
        es: "Tu dispositivo no ofrece aquí una ventana para compartir. Envía el enlace directamente o cópialo:",
        it: "Il tuo dispositivo non offre qui una finestra di condivisione. Invia direttamente il link o copialo:",
        pl: "Twoje urządzenie nie oferuje tu okna udostępniania. Wyślij link bezpośrednio albo go skopiuj:",
        tr: "Cihazın burada bir paylaşım penceresi sunmuyor. Bağlantıyı doğrudan gönder veya kopyala:",
        uk: "Твій пристрій тут не пропонує вікна «Поділитися». Надішли посилання напряму або скопіюй його:",
        ur: "آپ کا آلہ یہاں شیئر کرنے کی ونڈو نہیں دیتا۔ لنک سیدھا بھیجیں یا کاپی کریں:",
        ar: "لا يوفر جهازك نافذة مشاركة هنا. أرسل الرابط مباشرةً أو انسخه:"
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
        it: "Se la pagina di supporto non si è aperta automaticamente, la trovi qui:",
        pl: "Jeśli strona wsparcia nie otworzyła się automatycznie, znajdziesz ją tutaj:",
        tr: "Destek sayfası otomatik olarak açılmadıysa burada bulabilirsin:",
        uk: "Якщо сторінка підтримки не відкрилася автоматично, її можна знайти тут:",
        ur: "اگر سپورٹ صفحہ خودکار طور پر نہیں کھلا تو آپ اسے یہاں کھول سکتے ہیں:",
        ar: "إذا لم تُفتح صفحة الدعم تلقائياً، يمكنك العثور عليها هنا:"
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
        it: "Se la versione web non si è aperta automaticamente, la trovi qui:",
        pl: "Jeśli wersja przeglądarkowa nie otworzyła się automatycznie, znajdziesz ją tutaj:",
        tr: "Web sürümü otomatik olarak açılmadıysa burada bulabilirsin:",
        uk: "Якщо вебверсія не відкрилася автоматично, її можна знайти тут:",
        ur: "اگر ویب ورژن خودکار طور پر نہیں کھلا تو آپ اسے یہاں کھول سکتے ہیں:",
        ar: "إذا لم تُفتح نسخة الويب تلقائياً، يمكنك العثور عليها هنا:"
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
  document.getElementById("themeUnlockBackdrop")?.classList.toggle("modal-hidden", modalName !== "themeUnlock");
  if (modalName !== "settings") {
    if (typeof cancelTapLatencyCalibration === "function") cancelTapLatencyCalibration("");
    if (state.appResetConfirmArmed && typeof disarmAppResetConfirm === "function") {
      disarmAppResetConfirm();
    }
    if (typeof _openProfileDropdownKey !== "undefined" && _openProfileDropdownKey === "settings-language") {
      _openProfileDropdownKey = null;
      if (typeof renderSettingsLanguageDropdown === "function") renderSettingsLanguageDropdown();
    }
  } else {
    if (typeof renderSettingsLanguageDropdown === "function") renderSettingsLanguageDropdown();
    if (typeof renderTapLatencySettings === "function") {
      if (typeof setTapLatencyCalibStatus === "function") setTapLatencyCalibStatus("");
      renderTapLatencySettings();
    }
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

  // Offenes Übungs-Tutorial zuerst schließen (wie Escape), statt die Übung zu verlassen
  if (typeof dismissExerciseTutorialByUser === "function" && dismissExerciseTutorialByUser()) {
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
      stopAllAudioSessionsForBackground();
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

/**
 * Stoppt alle laufenden Klang-Sitzungen, wenn die App in den Hintergrund geht (Android-App über
 * appStateChange, iOS-Safari/Home-Bildschirm-App über visibilitychange). iOS unterbricht WebAudio im
 * Hintergrund ohnehin; ohne Stopp blieben Metronom & Co. als „läuft“ markiert, aber stumm.
 */
function stopAllAudioSessionsForBackground() {
  stopPlayback();
  if (typeof stopMetronome === "function") stopMetronome();
  if (typeof pauseWarmupSession === "function") pauseWarmupSession({ keepPlayback: false });
  if (typeof stopTunerSession === "function") stopTunerSession();
  if (typeof stopFreeplaySession === "function") stopFreeplaySession();
  if (typeof stopFretboardSession === "function") stopFretboardSession();
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
  if (!options.refreshOnly && typeof recordAchievementEvent === "function" && typeof ACHIEVEMENT_TOOL_VIEWS !== "undefined" && ACHIEVEMENT_TOOL_VIEWS.has(targetView)) {
    recordAchievementEvent({ type: "tool-used", tool: targetView });
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
