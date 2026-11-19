/**
 * Lauscher • Rechtstexte (Datenschutzerklärung)
 *
 * Einzige Textquelle für die Datenschutzerklärung: Sie wird in der App im Über-Fenster
 * angezeigt (app.js → openAboutLegal) und auf der öffentlichen Seite datenschutz.html,
 * deren Adresse in Google Play Console / App Store Connect eingetragen wird.
 *
 * ⚠️ ENTWURF – nicht rechtsgeprüft. Vor Veröffentlichung juristisch prüfen lassen und:
 *  - Platzhalter in [eckigen Klammern] füllen (Verantwortlicher + Anschrift, Anbieter des
 *    Weiterleitungsdienstes passfwd.com, E-Mail-Anbieter, Speicherdauer, Aufsichtsbehörde, Stand).
 *  - Danach LAUSCHER_LEGAL_DRAFT auf false setzen (blendet den Entwurfs-Hinweis aus).
 *  - Beim Verknüpfen von „App bewerten“, „Teilen“ oder „Spenden“ die genutzten Dienste ergänzen.
 *  - Impressumspflicht (§ 5 DDG) für App und Website mitklären lassen.
 *  - Store-Formulare (Play „Datensicherheit“, Apple „App-Datenschutz“): voraussichtlich
 *    „Keine Daten erhoben“ – gegen die aktuellen Definitionen prüfen.
 * Deutsch ist die maßgebliche Fassung; andere App-Sprachen zeigen die englische Übersetzung.
 */

const LAUSCHER_LEGAL_DRAFT = true;
const LAUSCHER_PRIVACY_URL = "https://jbkstr.github.io/projekt-lauschebear/datenschutz.html";

const LAUSCHER_LEGAL_DOCS = {
  privacy: {
    de: {
      title: "Datenschutzerklärung",
      updated: "Stand: [TT.MM.JJJJ]",
      draftNotice: "Entwurf – noch nicht rechtlich geprüft.",
      html: `
<p>Diese Datenschutzerklärung gilt für die App <strong>Lauscher</strong>. Das umfasst die Android-App und die Web-Version unter <a href="https://jbkstr.github.io/projekt-lauschebear/" target="_blank" rel="noopener">jbkstr.github.io/projekt-lauschebear</a>. Sie erklärt, welche Daten anfallen, wo sie bleiben und welche Rechte du hast.</p>

<h3>Kurz gesagt</h3>
<ul>
  <li>Lauscher hat <strong>kein Benutzerkonto, keine Werbung, kein Tracking und keine Analyse-Werkzeuge</strong>.</li>
  <li>Lauscher betreibt <strong>keinen eigenen Server</strong>. Deine Einstellungen und dein Profil bleiben <strong>ausschließlich auf deinem Gerät</strong>. Ich als Entwickler habe darauf keinen Zugriff.</li>
  <li>Das <strong>Mikrofon</strong> wird nur im Stimmgerät (Tuner) genutzt, und nur, wenn du es startest. Der Ton wird in Echtzeit auf deinem Gerät ausgewertet, <strong>nicht aufgezeichnet, nicht gespeichert und nicht übertragen</strong>.</li>
  <li>Daten verlassen dein Gerät nur, wenn <strong>du</strong> es auslöst: wenn du eine Profil-Sicherung teilst oder mir eine E-Mail schreibst.</li>
</ul>

<h3>1. Verantwortlicher</h3>
<p>[Vor- und Nachname]<br>[Straße und Hausnummer]<br>[PLZ Ort]<br>[Land]</p>
<p>E-Mail: <a href="mailto:lauscher.privacy772@passfwd.com">lauscher.privacy772@passfwd.com</a></p>
<p>Einen Datenschutzbeauftragten gibt es nicht. Er ist hier gesetzlich nicht vorgeschrieben.</p>

<h3>2. Daten, die nur auf deinem Gerät gespeichert werden</h3>
<p>Damit Lauscher deine Einstellungen behält, speichert die App Folgendes im lokalen Speicher deines Geräts (Web-Speicher „localStorage“ des Browsers bzw. der App):</p>
<ul>
  <li><strong>Darstellung und Sprache:</strong> gewähltes Farbschema, hell/dunkel, App-Sprache.</li>
  <li><strong>Profil:</strong> optional ein Name oder Spitzname, mit dem dich die App anspricht; gewählte Instrumente bzw. Rollen und Trainingsschwerpunkte; Notations- und Anzeigeoptionen; Übungsdauer und Pausen-Erinnerung; Klang- und Mixer-Einstellungen; Metronom-Profile, eigene Übe-Mixe und Tuner-Einstellungen; eigene Farbschemata; die letzten Prüfungsergebnisse (höchstens 25 Einträge).</li>
</ul>
<p>Bewusst <strong>nicht</strong> gespeichert werden ein Lernverlauf oder Übungsstatistiken über einzelne Sitzungen hinaus. Die Merkhilfe für verwechselte Intervalle u. Ä. existiert nur, solange die App geöffnet ist.</p>
<p><strong>Zweck und Rechtsgrundlage:</strong> Die Speicherung ist technisch erforderlich, damit die von dir genutzten Funktionen so arbeiten, wie du sie eingestellt hast. Grundlage ist § 25 Abs. 2 Nr. 2 TDDDG und, soweit personenbezogene Daten betroffen sind (etwa dein freiwillig eingegebener Name), Art. 6 Abs. 1 lit. b DSGVO.</p>
<p><strong>Empfänger:</strong> keine. Diese Daten werden nicht an mich oder Dritte übertragen.</p>
<p><strong>Löschung:</strong> Du kannst die Daten jederzeit selbst löschen:</p>
<ul>
  <li>in der App unter <strong>Konto → Datensicherung &amp; Konto zurücksetzen → „Konto zurücksetzen“</strong>;</li>
  <li>in den <strong>App-Einstellungen über „App-Reset“</strong> (löscht alle lokalen Daten);</li>
  <li>durch Deinstallieren der App bzw. Löschen der Website-Daten im Browser.</li>
</ul>

<h3>3. Mikrofon (Stimmgerät / Tuner)</h3>
<p>Wenn du im Werkzeug „Tuner“ auf Start tippst, fragt dein Gerät nach der Erlaubnis für das Mikrofon. Mit deiner Erlaubnis wertet Lauscher das Mikrofonsignal <strong>in Echtzeit auf deinem Gerät</strong> aus, um die Tonhöhe anzuzeigen.</p>
<ul>
  <li>Es findet <strong>keine Aufnahme</strong> statt. Das Signal wird <strong>nicht gespeichert und nicht übertragen</strong>.</li>
  <li>Das Mikrofon wird beendet, sobald du den Tuner stoppst oder verlässt.</li>
  <li>Ohne Erlaubnis funktioniert die übrige App unverändert.</li>
  <li>Du kannst die Erlaubnis jederzeit in den Einstellungen deines Geräts bzw. Browsers widerrufen.</li>
</ul>
<p>Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG), die du über die Berechtigungsabfrage erteilst.</p>

<h3>4. Profil-Sicherung (Export und Import)</h3>
<p>Unter <strong>Konto → Datensicherung</strong> kannst du dein Profil als Datei („lauschebaer-profil-JJJJ-MM-TT.json“) sichern und später wieder laden. Die Datei enthält die in Abschnitt 2 genannten Profildaten, aber keinen Lernfortschritt.</p>
<ul>
  <li><strong>Lokal speichern:</strong> Die Datei wird auf deinem Gerät abgelegt. In der Android-App ist das der Ordner „Dokumente/Lauscher“, im Browser der Download-Ordner. Auf älteren Android-Versionen (bis Android 10) fragt die App dafür nach der Speicher-Berechtigung.</li>
  <li><strong>Teilen:</strong> Wenn du „Teilen“ wählst, öffnet sich das Teilen-Menü deines Geräts. Du entscheidest selbst, wohin die Datei geht, z. B. in einen Cloud-Speicher, per Messenger oder per E-Mail. Für diese Weitergabe gelten die Datenschutzbestimmungen des jeweils gewählten Dienstes. Lauscher selbst überträgt dabei nichts an mich.</li>
  <li><strong>Laden:</strong> Beim Import liest die App nur die von dir ausgewählte Datei.</li>
</ul>
<p>Die Sicherungsdatei ist <strong>nicht verschlüsselt</strong>. Bewahre sie deshalb so auf, wie du es für deinen Namen und deine Einstellungen für angemessen hältst.</p>

<h3>5. Kontakt per E-Mail</h3>
<p>Über <strong>App-Einstellungen → Über Lauscher → „Nachricht an den Entwickler / Kontakt“</strong> öffnet sich dein E-Mail-Programm mit einer vorbereiteten Nachricht. Die Nachricht enthält eine Infozeile mit App-Version, Plattform (Android-App oder Browser) und App-Sprache. Du kannst sie vor dem Senden löschen.</p>
<ul>
  <li><strong>Verarbeitete Daten:</strong> deine E-Mail-Adresse, ggf. dein Name, der Inhalt deiner Nachricht und die genannte Infozeile.</li>
  <li><strong>Zweck:</strong> Bearbeitung deiner Anfrage, Fehlerbehebung und Verbesserung der App.</li>
  <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse liegt darin, Anfragen zu beantworten.</li>
  <li><strong>Weiterleitungsdienst:</strong> Die Kontaktadresse ist eine Weiterleitungsadresse des Dienstes [Name, Anschrift und Sitz des Anbieters von passfwd.com]. Eingehende E-Mails werden über diesen Anbieter an mein privates Postfach bei [E-Mail-Anbieter] weitergeleitet. [Ggf.: Auftragsverarbeitungsvertrag nach Art. 28 DSGVO / Grundlage einer Drittlandübermittlung.]</li>
  <li><strong>Speicherdauer:</strong> Ich lösche deine E-Mail, sobald deine Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten bestehen, spätestens nach [12 Monaten].</li>
</ul>

<h3>6. Web-Version (Hosting über GitHub Pages)</h3>
<p>Die Web-Version von Lauscher wird über <strong>GitHub Pages</strong> bereitgestellt. Anbieter ist die GitHub B.V., Prins Bernhardplein 200, 1097 JB Amsterdam, Niederlande, eine Tochter der GitHub, Inc., USA. Beim Aufruf der Website verarbeitet GitHub technisch notwendige Verbindungsdaten, insbesondere deine <strong>IP-Adresse</strong>, Datum und Uhrzeit, die aufgerufene Datei sowie Browser- und Systeminformationen. Diese Daten dienen der Auslieferung und Sicherheit der Website.</p>
<ul>
  <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse ist die zuverlässige und sichere Bereitstellung der Web-Version.</li>
  <li><strong>Drittlandübermittlung:</strong> Eine Übermittlung in die USA ist möglich. GitHub ist nach dem EU-US Data Privacy Framework zertifiziert.</li>
  <li><strong>Weitere Informationen:</strong> in der <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">Datenschutzerklärung von GitHub</a>.</li>
</ul>
<p>Lauscher lädt <strong>keine</strong> externen Inhalte nach: keine Schriftarten von Drittanbietern, keine Skripte von CDNs, keine Werbung, keine Analyse. Alle Schriften, Klänge und Programmteile werden von derselben Adresse geladen bzw. sind in der App enthalten.</p>

<h3>7. Android-App und Google Play</h3>
<p>Die Android-App wird über <strong>Google Play</strong> (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) vertrieben. Für Download, Installation und Updates gelten die Datenschutzbestimmungen von Google; darauf habe ich keinen Einfluss.</p>
<p>Hast du in den Einstellungen deines Geräts der Übermittlung von Diagnosedaten zugestimmt, kann Google mir <strong>anonymisierte bzw. zusammengefasste</strong> Absturz- und Stabilitätsberichte in der Google Play Console bereitstellen. Daraus kann ich keine einzelnen Personen erkennen.</p>
<p>Die Android-App fordert folgende Berechtigungen an:</p>
<div class="legal-table-wrap"><table>
  <thead><tr><th>Berechtigung</th><th>Wofür</th><th>Wann</th></tr></thead>
  <tbody>
    <tr><td>Mikrofon</td><td>Tonhöhenerkennung im Tuner</td><td>nur nach deiner Zustimmung beim ersten Start des Tuners</td></tr>
    <tr><td>Speicher (nur bis Android 10)</td><td>Profil-Sicherung im Ordner „Dokumente/Lauscher“</td><td>nur beim lokalen Speichern einer Sicherung</td></tr>
    <tr><td>Internet</td><td>Standard-Berechtigung des verwendeten App-Rahmens (Capacitor); Lauscher nutzt sie nicht, um Daten zu senden oder Inhalte nachzuladen</td><td>wird nicht abgefragt</td></tr>
  </tbody>
</table></div>
<p>Die App sendet keine Daten an mich.</p>

<h3>8. Keine Weitergabe, kein Verkauf, keine Profilbildung</h3>
<p>Ich gebe keine Daten an Dritte weiter, verkaufe keine Daten und erstelle keine Nutzerprofile. Lauscher enthält keine Werbe-, Analyse- oder Tracking-Bibliotheken von Drittanbietern. Es findet keine automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO statt.</p>

<h3>9. Kinder</h3>
<p>Lauscher eignet sich auch für Kinder (etwa ab 8 Jahren). Die App erhebt keine Daten über Kinder, die an mich oder Dritte übermittelt werden. Ein im Profil eingetragener Name bleibt auf dem Gerät. Eltern können alle lokal gespeicherten Daten jederzeit über „App-Reset“ löschen. Kinder sollten mir nur mit Zustimmung ihrer Eltern schreiben.</p>

<h3>10. Datensicherheit</h3>
<p>Da Lauscher keine Daten an mich überträgt, liegt der Schutz deiner lokalen Daten vor allem beim Schutz deines Geräts, etwa durch eine Bildschirmsperre. Die Web-Version wird ausschließlich verschlüsselt über HTTPS ausgeliefert.</p>

<h3>11. Deine Rechte</h3>
<p>Soweit ich personenbezogene Daten von dir verarbeite, praktisch also nur bei E-Mail-Anfragen, hast du folgende Rechte:</p>
<ul>
  <li>Auskunft (Art. 15 DSGVO)</li>
  <li>Berichtigung (Art. 16 DSGVO)</li>
  <li>Löschung (Art. 17 DSGVO)</li>
  <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
  <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
  <li><strong>Widerspruch</strong> gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO)</li>
  <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO), z. B. der Mikrofon-Berechtigung</li>
</ul>
<p>Daten, die nur auf deinem Gerät liegen, kann ich weder einsehen noch löschen. Diese verwaltest du selbst (siehe Abschnitt 2).</p>
<p>Du hast außerdem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO), z. B. bei der für mich zuständigen Behörde: [Name und Anschrift der Landesdatenschutzbehörde].</p>

<h3>12. Änderungen dieser Datenschutzerklärung</h3>
<p>Ich passe diese Erklärung an, wenn sich die App oder die Rechtslage ändert. Es gilt die jeweils aktuelle Fassung, die in der App und unter <a href="https://jbkstr.github.io/projekt-lauschebear/datenschutz.html" target="_blank" rel="noopener">jbkstr.github.io/projekt-lauschebear/datenschutz.html</a> abrufbar ist.</p>
`
    },
    en: {
      title: "Privacy Policy",
      updated: "Last updated: [DD.MM.YYYY]",
      draftNotice: "Draft – not yet legally reviewed.",
      langNotice: "This is a translation. The German version is the legally binding one.",
      html: `
<p>This privacy policy applies to the app <strong>Lauscher</strong>, both the Android app and the web version at <a href="https://jbkstr.github.io/projekt-lauschebear/" target="_blank" rel="noopener">jbkstr.github.io/projekt-lauschebear</a>. It explains what data is involved, where it stays and what rights you have.</p>

<h3>In short</h3>
<ul>
  <li>Lauscher has <strong>no user account, no ads, no tracking and no analytics tools</strong>.</li>
  <li>Lauscher runs <strong>no server of its own</strong>. Your settings and your profile stay <strong>on your device only</strong>. As the developer, I have no access to them.</li>
  <li>The <strong>microphone</strong> is used only by the tuner, and only when you start it. The sound is analyzed in real time on your device and is <strong>not recorded, not stored and not transmitted</strong>.</li>
  <li>Data only leaves your device when <strong>you</strong> trigger it: when you share a profile backup or send me an email.</li>
</ul>

<h3>1. Controller</h3>
<p>[First and last name]<br>[Street and number]<br>[Postcode, city]<br>[Country]</p>
<p>Email: <a href="mailto:lauscher.privacy772@passfwd.com">lauscher.privacy772@passfwd.com</a></p>
<p>There is no data protection officer; one is not legally required here.</p>

<h3>2. Data stored only on your device</h3>
<p>So that Lauscher remembers your settings, the app stores the following in your device's local storage (the browser's or app's “localStorage”):</p>
<ul>
  <li><strong>Appearance and language:</strong> chosen color theme, light/dark mode, app language.</li>
  <li><strong>Profile:</strong> optionally a name or nickname the app uses to address you; selected instruments or roles and training focuses; notation and display options; practice duration and break reminder; sound and mixer settings; metronome profiles, your own practice mixes and tuner settings; custom color themes; your most recent exam results (at most 25 entries).</li>
</ul>
<p>Lauscher deliberately does <strong>not</strong> store a learning history or practice statistics beyond a single session. The helper that brings back confused intervals and the like only exists while the app is open.</p>
<p><strong>Purpose and legal basis:</strong> This storage is technically necessary so that the features you use work the way you set them up. The legal basis is Section 25(2) no. 2 TDDDG (German Telecommunications Digital Services Data Protection Act) and, where personal data is involved (such as a name you choose to enter), Art. 6(1)(b) GDPR.</p>
<p><strong>Recipients:</strong> none. This data is not transmitted to me or to third parties.</p>
<p><strong>Deletion:</strong> You can delete this data yourself at any time:</p>
<ul>
  <li>in the app under <strong>Account → Backup &amp; Reset Account → “Reset Account”</strong>;</li>
  <li>in the <strong>app settings via “App Reset”</strong> (deletes all local data);</li>
  <li>by uninstalling the app or clearing the website data in your browser.</li>
</ul>

<h3>3. Microphone (tuner)</h3>
<p>When you tap Start in the “Tuner” tool, your device asks for microphone permission. With your permission, Lauscher analyzes the microphone signal <strong>in real time on your device</strong> to display the pitch.</p>
<ul>
  <li>There is <strong>no recording</strong>. The signal is <strong>neither stored nor transmitted</strong>.</li>
  <li>The microphone is switched off as soon as you stop or leave the tuner.</li>
  <li>Without permission, the rest of the app works as usual.</li>
  <li>You can revoke the permission at any time in your device or browser settings.</li>
</ul>
<p>The legal basis is your consent (Art. 6(1)(a) GDPR, Section 25(1) TDDDG), which you give through the permission prompt.</p>

<h3>4. Profile backup (export and import)</h3>
<p>Under <strong>Account → Backup</strong> you can save your profile as a file (“lauschebaer-profil-YYYY-MM-DD.json”) and load it again later. The file contains the profile data listed in section 2, but no learning progress.</p>
<ul>
  <li><strong>Save locally:</strong> The file is stored on your device. In the Android app this is the folder “Documents/Lauscher”; in the browser it is your downloads folder. On older Android versions (up to Android 10) the app asks for storage permission for this.</li>
  <li><strong>Share:</strong> If you choose “Share”, your device's share menu opens. You decide where the file goes, e.g. to a cloud storage service, a messenger or email. The privacy terms of the service you choose apply to this. Lauscher itself does not send anything to me in the process.</li>
  <li><strong>Load:</strong> When importing, the app only reads the file you select.</li>
</ul>
<p>The backup file is <strong>not encrypted</strong>, so keep it in a place you consider appropriate for your name and settings.</p>

<h3>5. Contact by email</h3>
<p>Via <strong>App settings → About Lauscher → “Message the Developer / Contact”</strong>, your email app opens with a prepared message. It contains an info line with the app version, platform (Android app or browser) and app language, which you can delete before sending.</p>
<ul>
  <li><strong>Data processed:</strong> your email address, possibly your name, the content of your message and the info line mentioned above.</li>
  <li><strong>Purpose:</strong> handling your request, fixing bugs and improving the app.</li>
  <li><strong>Legal basis:</strong> Art. 6(1)(f) GDPR; my legitimate interest is answering requests.</li>
  <li><strong>Forwarding service:</strong> The contact address is a forwarding address provided by [name, address and registered office of the provider of passfwd.com]. Incoming emails are forwarded via this provider to my private mailbox at [email provider]. [If applicable: data processing agreement under Art. 28 GDPR / basis for transfers to third countries.]</li>
  <li><strong>Retention:</strong> I delete your email once your request has been dealt with and no legal retention obligations apply, at the latest after [12 months].</li>
</ul>

<h3>6. Web version (hosting via GitHub Pages)</h3>
<p>The web version of Lauscher is served via <strong>GitHub Pages</strong>, provided by GitHub B.V., Prins Bernhardplein 200, 1097 JB Amsterdam, Netherlands, a subsidiary of GitHub, Inc., USA. When you visit the website, GitHub processes technically necessary connection data, in particular your <strong>IP address</strong>, date and time, the requested file, and browser and system information, in order to deliver and secure the website.</p>
<ul>
  <li><strong>Legal basis:</strong> Art. 6(1)(f) GDPR; my legitimate interest is providing the web version reliably and securely.</li>
  <li><strong>Transfers to third countries:</strong> Data may be transferred to the USA. GitHub is certified under the EU-US Data Privacy Framework.</li>
  <li><strong>More information:</strong> in <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub's privacy statement</a>.</li>
</ul>
<p>Lauscher does <strong>not</strong> load any external content: no third-party fonts, no scripts from CDNs, no ads, no analytics. All fonts, sounds and code are loaded from the same address or are included in the app.</p>

<h3>7. Android app and Google Play</h3>
<p>The Android app is distributed via <strong>Google Play</strong> (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland). Google's privacy terms apply to downloading, installing and updating the app; I have no influence on them.</p>
<p>If you have allowed diagnostic data to be sent in your device settings, Google may provide me with <strong>anonymized or aggregated</strong> crash and stability reports in the Google Play Console. These do not allow me to identify individual people.</p>
<p>The Android app requests the following permissions:</p>
<div class="legal-table-wrap"><table>
  <thead><tr><th>Permission</th><th>Purpose</th><th>When</th></tr></thead>
  <tbody>
    <tr><td>Microphone</td><td>Pitch detection in the tuner</td><td>only after your consent when you first start the tuner</td></tr>
    <tr><td>Storage (up to Android 10 only)</td><td>Saving a profile backup to “Documents/Lauscher”</td><td>only when you save a backup locally</td></tr>
    <tr><td>Internet</td><td>Default permission of the app framework used (Capacitor); Lauscher does not use it to send data or load content</td><td>not requested</td></tr>
  </tbody>
</table></div>
<p>The app does not send any data to me.</p>

<h3>8. No sharing, no selling, no profiling</h3>
<p>I do not pass data on to third parties, do not sell data and do not build user profiles. Lauscher contains no third-party advertising, analytics or tracking libraries. There is no automated decision-making within the meaning of Art. 22 GDPR.</p>

<h3>9. Children</h3>
<p>Lauscher is also suitable for children (from about age 8). The app does not collect any data about children that is transmitted to me or to third parties. A name entered in the profile stays on the device. Parents can delete all locally stored data at any time via “App Reset”. Children should only write to me with their parents' permission.</p>

<h3>10. Data security</h3>
<p>Since Lauscher does not transmit any data to me, protecting your local data mainly means protecting your device, e.g. with a screen lock. The web version is served exclusively over encrypted HTTPS.</p>

<h3>11. Your rights</h3>
<p>Insofar as I process your personal data, which in practice only happens with email requests, you have the following rights:</p>
<ul>
  <li>Access (Art. 15 GDPR)</li>
  <li>Rectification (Art. 16 GDPR)</li>
  <li>Erasure (Art. 17 GDPR)</li>
  <li>Restriction of processing (Art. 18 GDPR)</li>
  <li>Data portability (Art. 20 GDPR)</li>
  <li><strong>Objection</strong> to processing based on legitimate interests (Art. 21 GDPR)</li>
  <li>Withdrawal of consent with effect for the future (Art. 7(3) GDPR), e.g. for the microphone permission</li>
</ul>
<p>I can neither see nor delete data that is stored only on your device; you manage it yourself (see section 2).</p>
<p>You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR), for example the authority responsible for me: [name and address of the state data protection authority].</p>

<h3>12. Changes to this privacy policy</h3>
<p>I update this policy when the app or the legal situation changes. The current version always applies; it is available in the app and at <a href="https://jbkstr.github.io/projekt-lauschebear/datenschutz.html" target="_blank" rel="noopener">jbkstr.github.io/projekt-lauschebear/datenschutz.html</a>.</p>
`
    }
  }
};

/**
 * Liefert ein Rechtsdokument in der passenden Sprache.
 * Deutsch für „de“, sonst Englisch (inkl. Hinweis, dass Deutsch maßgeblich ist).
 */
function getLegalDocument(kind = "privacy", lang = "de") {
  const doc = LAUSCHER_LEGAL_DOCS[kind];
  if (!doc) return null;
  const useDe = lang === "de" || !doc.en;
  const entry = useDe ? doc.de : doc.en;
  return { ...entry, lang: useDe ? "de" : "en", isDraft: LAUSCHER_LEGAL_DRAFT };
}
