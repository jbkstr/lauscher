/**
 * Lauscher • Rechtstexte (Datenschutzerklärung, Nutzungsbedingungen & Lizenzen)
 *
 * Einzige Textquelle für Datenschutzerklärung, Nutzungsbedingungen und Open-Source-Lizenzen:
 * Alle drei werden in der App im Über-Fenster angezeigt (app.js → openAboutLegal) sowie auf den
 * öffentlichen Seiten privacy.html, terms.html und licenses.html.
 *
 * ⚠️ ENTWURF (Datenschutz & Nutzungsbedingungen) – nicht rechtsgeprüft. Vor Veröffentlichung
 * juristisch prüfen lassen und:
 *  - Datenschutz: Platzhalter in [eckigen Klammern] füllen (Anbieter des Weiterleitungsdienstes
 *    passfwd.com, E-Mail-Anbieter, Speicherdauer). Bei Änderungen das Datum („Stand“) anpassen.
 *  - Nutzungsbedingungen: Haftungsklausel für unentgeltliche Überlassung (§§ 521, 523, 524 BGB)
 *    sowie Nutzungsumfang (privat / Musikunterricht) prüfen lassen; bei künftigen Spenden oder
 *    Käufen entsprechend ergänzen.
 *  - Lizenzen: Bei neuen Bibliotheken, Schriftarten, Plugins oder Klang-Samples nachpflegen.
 *  - Danach LAUSCHER_LEGAL_DRAFT auf false setzen (blendet den Entwurfs-Hinweis bei Datenschutz
 *    und Nutzungsbedingungen aus).
 *  - Beim Verknüpfen von „App bewerten“ den jeweiligen App-Store ergänzen.
 *  - Impressumspflicht (§ 5 DDG) für App und Website mitklären lassen.
 *  - Store-Formulare (Play „Datensicherheit“, Apple „App-Datenschutz“): voraussichtlich
 *    „Keine Daten erhoben“ – gegen die aktuellen Definitionen prüfen.
 * Deutsch ist die maßgebliche Fassung; andere App-Sprachen zeigen die englische Übersetzung.
 */

const LAUSCHER_LEGAL_DRAFT = true;
const LAUSCHER_PRIVACY_URL = "https://jbkstr.github.io/lauscher/privacy.html";
const LAUSCHER_TERMS_URL = "https://jbkstr.github.io/lauscher/terms.html";
const LAUSCHER_LICENSES_URL = "https://jbkstr.github.io/lauscher/licenses.html";
const LAUSCHER_LEGAL_URLS = {
  privacy: LAUSCHER_PRIVACY_URL,
  terms: LAUSCHER_TERMS_URL,
  licenses: LAUSCHER_LICENSES_URL
};

const LAUSCHER_MIT_BODY = `Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;

const LAUSCHER_OFL_1_1_TEXT = `Copyright (c) 2004-2022 SIL International (http://www.sil.org/)
with Reserved Font Names "Andika" and "SIL".

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org

-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide development of collaborative font projects, to support the font creation efforts of academic and linguistic communities, and to provide a free and open framework in which fonts may be shared and improved in partnership with others.

The OFL allows the licensed fonts to be used, studied, modified and redistributed freely as long as they are not sold by themselves. The fonts, including any derivative works, can be bundled, embedded, redistributed and/or sold with any software provided that any reserved names are not used by derivative works. The fonts and derivatives, however, cannot be released under any other type of license. The requirement for fonts to remain under this license does not apply to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright Holder(s) under this license and clearly marked as such. This may include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the copyright statement(s).

"Original Version" refers to the collection of Font Software components as distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting, or substituting -- in part or in whole -- any of the components of the Original Version, by changing formats or by porting the Font Software to a new environment.

"Author" refers to any designer, engineer, programmer, technical writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining a copy of the Font Software, to use, study, copy, merge, embed, modify, redistribute, and sell modified and unmodified copies of the Font Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components, in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled, redistributed and/or sold with any software, provided that each copy contains the above copyright notice and this license. These can be included either as stand-alone text files, human-readable headers or in the appropriate machine-readable metadata fields within text or binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font Name(s) unless explicit written permission is granted by the corresponding Copyright Holder. This restriction only applies to the primary font name as presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font Software shall not be used to promote, endorse or advertise any Modified Version, except to acknowledge the contribution(s) of the Copyright Holder(s) and the Author(s) or with their explicit written permission.

5) The Font Software, modified or unmodified, in part or in whole, must be distributed entirely under this license, and must not be distributed under any other license. The requirement for fonts to remain under this license does not apply to any document created using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE FONT SOFTWARE.`;

const LAUSCHER_APACHE_2_0_NOTICE = `Copyright (c) The Android Open Source Project

Licensed under the Apache License, Version 2.0 (the "License"); you may not use these libraries except in compliance with the License. You may obtain a copy of the License at:

https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.`;

const LAUSCHER_LEGAL_DOCS = {
  privacy: {
    de: {
      title: "Datenschutzerklärung",
      updated: "Stand: 19.11.2026",
      draftNotice: "Entwurf – noch nicht rechtlich geprüft.",
      html: `
<p>Diese Datenschutzerklärung gilt für die App <strong>Lauscher</strong>. Das umfasst die Android-App und die Web-Version unter <a href="https://jbkstr.github.io/lauscher/" target="_blank" rel="noopener">jbkstr.github.io/lauscher</a>. Sie erklärt, welche Daten anfallen, wo sie bleiben und welche Rechte du hast.</p>

<h3>Kurz gesagt</h3>
<ul>
  <li>Lauscher hat <strong>kein Benutzerkonto, keine Werbung, kein Tracking und keine Analyse-Werkzeuge</strong>.</li>
  <li>Lauscher betreibt <strong>keinen eigenen Server</strong>. Deine Einstellungen und dein Profil bleiben <strong>ausschließlich auf deinem Gerät</strong>. Ich als Entwickler habe darauf keinen Zugriff.</li>
  <li>Das <strong>Mikrofon</strong> wird nur im Stimmgerät (Tuner) genutzt, und nur, wenn du es startest. Der Ton wird in Echtzeit auf deinem Gerät ausgewertet, <strong>nicht aufgezeichnet, nicht gespeichert und nicht übertragen</strong>.</li>
  <li>Daten verlassen dein Gerät nur, wenn <strong>du</strong> es auslöst: wenn du eine Profil-Sicherung teilst, mir eine E-Mail schreibst oder den externen Unterstützungs-Link (Ko-fi) öffnest.</li>
</ul>

<h3>1. Verantwortlicher</h3>
<p>Jens Strauch<br>Merveldtstraße 255<br>45663 Recklinghausen<br>Deutschland</p>
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
<p><strong>Empfänger:</strong> keine. Diese Daten werden nicht an mich oder Dritte übertragen. Auch die automatische Android-Datensicherung in dein Google-Konto ist für Lauscher abgeschaltet; zum Umzug auf ein neues Gerät nutzt du die Profil-Sicherung (Abschnitt 4).</p>
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
<p>Unter <strong>Konto → Datensicherung</strong> kannst du dein Profil als Datei („lauscher-profil-JJJJ-MM-TT.json“) sichern und später wieder laden. Die Datei enthält die in Abschnitt 2 genannten Profildaten, aber keinen Lernfortschritt.</p>
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

<h3>7. Android-App (GitHub und Google Play)</h3>
<p>Die Android-App kann als Installationsdatei (APK) über die <strong>Releases-Seite auf GitHub</strong> heruntergeladen werden (GitHub B.V., siehe Abschnitt 6). Beim Download verarbeitet GitHub wie beim Aufruf der Website technisch notwendige Verbindungsdaten, insbesondere deine IP-Adresse; Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Eine so installierte App aktualisiert sich nicht automatisch und meldet sich nicht bei mir.</p>
<p>Wird die App künftig (auch) über <strong>Google Play</strong> (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) vertrieben, gelten für Download, Installation und Updates die Datenschutzbestimmungen von Google; darauf habe ich keinen Einfluss.</p>
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

<h3>8. Freiwillige Unterstützung (Ko-fi)</h3>
<p>Im Über-Fenster gibt es den freiwilligen Link „Lauscher unterstützen“. Erst wenn du ihn aktiv antippst, öffnet sich im Browser die externe Seite <a href="https://ko-fi.com/lauscher" target="_blank" rel="noopener">ko-fi.com/lauscher</a> (Anbieter: Ko-fi Labs Limited, Großbritannien). Solange du den Link nicht öffnest, wird keine Verbindung zu Ko-fi hergestellt und es werden keine Daten übertragen.</p>
<p>Auf der Website von Ko-fi sowie bei dort gewählten Zahlungsdienstleistern gelten ausschließlich deren jeweilige Datenschutzbestimmungen. Wenn du das Projekt dort unterstützt, erhalte ich je nach deiner Eingabe den angegebenen Namen, eine optionale Nachricht sowie den Betrag; ich nutze diese Angaben ausschließlich zur Kenntnisnahme und im Rahmen gesetzlicher Aufbewahrungspflichten (Art. 6 Abs. 1 lit. b, c bzw. f DSGVO).</p>

<h3>9. Keine Weitergabe, kein Verkauf, keine Profilbildung</h3>
<p>Ich gebe keine Daten an Dritte weiter, verkaufe keine Daten und erstelle keine Nutzerprofile. Lauscher enthält keine Werbe-, Analyse- oder Tracking-Bibliotheken von Drittanbietern. Es findet keine automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO statt.</p>

<h3>10. Kinder</h3>
<p>Lauscher eignet sich auch für Kinder (etwa ab 8 Jahren). Die App erhebt keine Daten über Kinder, die an mich oder Dritte übermittelt werden. Ein im Profil eingetragener Name bleibt auf dem Gerät. Eltern können alle lokal gespeicherten Daten jederzeit über „App-Reset“ löschen. Kinder sollten mir nur mit Zustimmung ihrer Eltern schreiben.</p>

<h3>11. Datensicherheit</h3>
<p>Da Lauscher keine Daten an mich überträgt, liegt der Schutz deiner lokalen Daten vor allem beim Schutz deines Geräts, etwa durch eine Bildschirmsperre. Die Web-Version wird ausschließlich verschlüsselt über HTTPS ausgeliefert.</p>

<h3>12. Deine Rechte</h3>
<p>Soweit ich personenbezogene Daten von dir verarbeite, praktisch also nur bei E-Mail-Anfragen oder freiwilligen Nachrichten über Ko-fi, hast du folgende Rechte:</p>
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
<p>Du hast außerdem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO), z. B. bei der für mich zuständigen Behörde: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW), Kavalleriestraße 2–4, 40213 Düsseldorf.</p>

<h3>13. Änderungen dieser Datenschutzerklärung</h3>
<p>Ich passe diese Erklärung an, wenn sich die App oder die Rechtslage ändert. Es gilt die jeweils aktuelle Fassung, die in der App und unter <a href="https://jbkstr.github.io/lauscher/privacy.html" target="_blank" rel="noopener">jbkstr.github.io/lauscher/privacy.html</a> abrufbar ist.</p>
`
    },
    en: {
      title: "Privacy Policy",
      updated: "Last updated: 19 November 2026",
      draftNotice: "Draft – not yet legally reviewed.",
      langNotice: "This is a translation. The German version is the legally binding one.",
      html: `
<p>This privacy policy applies to the app <strong>Lauscher</strong>, both the Android app and the web version at <a href="https://jbkstr.github.io/lauscher/" target="_blank" rel="noopener">jbkstr.github.io/lauscher</a>. It explains what data is involved, where it stays and what rights you have.</p>

<h3>In short</h3>
<ul>
  <li>Lauscher has <strong>no user account, no ads, no tracking and no analytics tools</strong>.</li>
  <li>Lauscher runs <strong>no server of its own</strong>. Your settings and your profile stay <strong>on your device only</strong>. As the developer, I have no access to them.</li>
  <li>The <strong>microphone</strong> is used only by the tuner, and only when you start it. The sound is analyzed in real time on your device and is <strong>not recorded, not stored and not transmitted</strong>.</li>
  <li>Data only leaves your device when <strong>you</strong> trigger it: when you share a profile backup, send me an email or open the external support link (Ko-fi).</li>
</ul>

<h3>1. Controller</h3>
<p>Jens Strauch<br>Merveldtstraße 255<br>45663 Recklinghausen<br>Germany</p>
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
<p><strong>Recipients:</strong> none. This data is not transmitted to me or to third parties. Android’s automatic backup to your Google account is also switched off for Lauscher; to move to a new device, use the profile backup (section 4).</p>
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
<p>Under <strong>Account → Backup</strong> you can save your profile as a file (“lauscher-profil-YYYY-MM-DD.json”) and load it again later. The file contains the profile data listed in section 2, but no learning progress.</p>
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

<h3>7. Android app (GitHub and Google Play)</h3>
<p>The Android app can be downloaded as an installation file (APK) from the <strong>Releases page on GitHub</strong> (GitHub B.V., see section 6). As with visits to the website, GitHub processes technically necessary connection data during the download, in particular your IP address; the legal basis is Art. 6(1)(f) GDPR. An app installed this way does not update itself automatically and does not report back to me.</p>
<p>If the app is (also) distributed via <strong>Google Play</strong> (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland) in the future, Google's privacy terms apply to downloading, installing and updating the app; I have no influence on them.</p>
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

<h3>8. Voluntary support (Ko-fi)</h3>
<p>The About window contains an optional “Support Lauscher” link. Only when you actively tap it does your browser open the external page <a href="https://ko-fi.com/lauscher" target="_blank" rel="noopener">ko-fi.com/lauscher</a> (provided by Ko-fi Labs Limited, United Kingdom). As long as you do not open the link, no connection to Ko-fi is made and no data is transmitted.</p>
<p>On Ko-fi's website and with any payment provider you select there, only their respective privacy policies apply. If you choose to support the project there, depending on what you enter I receive your chosen name, an optional message and the amount; I use this information solely to acknowledge your support and to meet statutory retention obligations (Art. 6(1)(b), (c) or (f) GDPR).</p>

<h3>9. No sharing, no selling, no profiling</h3>
<p>I do not pass data on to third parties, do not sell data and do not build user profiles. Lauscher contains no third-party advertising, analytics or tracking libraries. There is no automated decision-making within the meaning of Art. 22 GDPR.</p>

<h3>10. Children</h3>
<p>Lauscher is also suitable for children (from about age 8). The app does not collect any data about children that is transmitted to me or to third parties. A name entered in the profile stays on the device. Parents can delete all locally stored data at any time via “App Reset”. Children should only write to me with their parents' permission.</p>

<h3>11. Data security</h3>
<p>Since Lauscher does not transmit any data to me, protecting your local data mainly means protecting your device, e.g. with a screen lock. The web version is served exclusively over encrypted HTTPS.</p>

<h3>12. Your rights</h3>
<p>Insofar as I process your personal data, which in practice only happens with email requests or voluntary messages via Ko-fi, you have the following rights:</p>
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
<p>You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR), for example the authority responsible for me: the State Commissioner for Data Protection and Freedom of Information of North Rhine-Westphalia (LDI NRW), Kavalleriestraße 2–4, 40213 Düsseldorf, Germany.</p>

<h3>13. Changes to this privacy policy</h3>
<p>I update this policy when the app or the legal situation changes. The current version always applies; it is available in the app and at <a href="https://jbkstr.github.io/lauscher/privacy.html" target="_blank" rel="noopener">jbkstr.github.io/lauscher/privacy.html</a>.</p>
`
    }
  },
  terms: {
    de: {
      title: "Nutzungsbedingungen",
      updated: "Stand: 19.11.2026",
      draftNotice: "Entwurf – noch nicht rechtlich geprüft.",
      html: `
<p>Diese Nutzungsbedingungen regeln die Nutzung der App <strong>Lauscher</strong>. Sie gelten für die Android-App sowie für die Web-Version unter <a href="https://jbkstr.github.io/lauscher/" target="_blank" rel="noopener">jbkstr.github.io/lauscher</a> (einschließlich der Einzeldatei-Fassung „lauscher-mobile.html“). Mit der Nutzung von Lauscher erklärst du dich mit diesen Bedingungen einverstanden.</p>

<h3>Kurz gesagt</h3>
<ul>
  <li>Lauscher ist <strong>kostenlos, werbefrei und ohne Benutzerkonto</strong> nutzbar.</li>
  <li>Du darfst die App frei zum eigenen Üben und Lernen sowie im nicht-kommerziellen Musikunterricht verwenden.</li>
  <li>Lauscher ist derzeit eine <strong>Beta-Version</strong> und ein privates Projekt: Funktionsumfang und Inhalte können sich jederzeit ändern, ohne Anspruch auf dauerhafte Verfügbarkeit.</li>
  <li>Schütze dein <strong>Gehör und deine Stimme</strong>: Starte Audio- und Einsingübungen stets mit moderater Lautstärke.</li>
  <li>Alle Einstellungen bleiben <strong>lokal auf deinem Gerät</strong> – erstelle bei Bedarf selbst eine Profil-Sicherung.</li>
</ul>

<h3>1. Anbieter und Geltungsbereich</h3>
<p>Anbieter von Lauscher ist:</p>
<p>Jens Strauch<br>Merveldtstraße 255<br>45663 Recklinghausen<br>Deutschland</p>
<p>E-Mail: <a href="mailto:lauscher.privacy772@passfwd.com">lauscher.privacy772@passfwd.com</a></p>
<p>Diese Bedingungen gelten für alle Funktionen der Web-Version und der Android-App (bezogen über GitHub-Releases oder künftig über App-Stores wie Google Play).</p>

<h3>2. Leistungsbeschreibung und Beta-Status</h3>
<p>Lauscher bietet Übungen zur Gehörbildung, Musiktheorie, zum Notenlesen, Einsingen und Studio-Hören (Frequenzen &amp; EQ) sowie musikalische Werkzeuge (Metronom, chromatisches Stimmgerät, Freies Spiel und Gitarren-Griffbrett). Die Bereitstellung erfolgt unentgeltlich und ohne Registrierung oder Cloud-Speicher. Über das Über-Fenster kannst du das Projekt auf Wunsch freiwillig über den externen Dienst Ko-fi (<a href="https://ko-fi.com/lauscher" target="_blank" rel="noopener">ko-fi.com/lauscher</a>) unterstützen; alle Funktionen von Lauscher bleiben unabhängig davon vollständig kostenlos nutzbar.</p>
<p>Die App befindet sich derzeit in der <strong>Beta-Phase</strong>. Sie wird im jeweils aktuellen Zustand („wie besehen“) bereitgestellt. Ich behalte mir vor, Funktionen, Übungsstufen, Klangbibliotheken oder das Design jederzeit zu ändern, zu ergänzen oder die App ganz oder teilweise einzustellen. Ein Anspruch auf bestimmte Funktionen, Fehlerfreiheit, Updates oder eine dauerhafte, unterbrechungsfreie Verfügbarkeit besteht nicht.</p>

<h3>3. Nutzungsrechte und erlaubte Nutzung</h3>
<p>Ich räume dir ein einfaches, nicht übertragbares, widerrufliches Recht ein, Lauscher kostenlos für private Zwecke sowie im nicht-kommerziellen Musikunterricht (z. B. in Schulen, Musikschulen, Chören oder im Einzelunterricht) zu nutzen.</p>
<p>Ohne meine vorherige schriftliche Zustimmung ist es nicht gestattet:</p>
<ul>
  <li>die App oder Teile davon zu verkaufen, zu vermieten oder als eigenes kommerzielles Produkt weiterzuverbreiten;</li>
  <li>Urheber-, Marken- oder Lizenzhinweise zu entfernen oder zu verändern;</li>
  <li>veränderte Installationsdateien (APKs) oder abgeänderte Fassungen unter dem Namen „Lauscher“ zu verbreiten.</li>
</ul>
<p>Soweit einzelne Bestandteile von Lauscher unter freien Open-Source-Lizenzen stehen (z. B. verwendete Bibliotheken oder die Schriftart Andika), gelten für diese Bestandteile vorrangig deren jeweilige Lizenzbedingungen (einsehbar unter <a href="https://jbkstr.github.io/lauscher/licenses.html" data-legal-nav="licenses">Lizenzen</a>).</p>

<h3>4. Urheberrecht und Inhalte</h3>
<p>Die Gestaltung, Texte, Übungslogik, Klang-Samples, Grafiken und das Maskottchen („Lauschebär“) sind urheberrechtlich geschützt, sofern sie nicht gesonderten Open-Source-Lizenzen unterliegen. Alle Rechte daran liegen bei mir bzw. den jeweiligen Rechteinhabern.</p>
<p>Daten, die du selbst in der App anlegst (z. B. dein Profilname, eigene Übe-Mixe oder eigene Farbschemata), bleiben ausschließlich bei dir auf deinem Gerät.</p>

<h3>5. Hinweise zu Gehör, Stimme und Werkzeugen</h3>
<ul>
  <li><strong>Gehörschutz:</strong> Lauscher erzeugt musikalische Klänge, Akkorde, reine Sinustöne und rosa Rauschen (insbesondere im Bereich Studio-Hören / Frequenzen &amp; EQ). Zwar begrenzt ein eingebauter Limiter Pegelspitzen, die tatsächliche Lautstärke hängt jedoch von deinem Gerät, deinem Betriebssystem und deinen Kopfhörern bzw. Lautsprechern ab. Prüfe vor dem Abspielen – besonders bei Kopfhörern – stets die eingestellte Lautstärke und beginne moderat.</li>
  <li><strong>Einsing-Helfer:</strong> Die Einsing-Übungen dienen der allgemeinen musikalischen Vorbereitung und ersetzen keine professionelle Gesangspädagogik, Logopädie oder medizinische Behandlung. Singe entspannt, lege Pausen ein und brich Übungen sofort ab, wenn sich deine Stimme angestrengt oder schmerzhaft anfühlt.</li>
  <li><strong>Stimmgerät und Metronom:</strong> Tuner und Metronom sind Übungshilfen und keine geeichten Messgeräte. Mikrofonqualität, Raumakustik, Hintergrundgeräusche und Geräte-Latenz können die Mess- und Zeitgenauigkeit beeinflussen.</li>
</ul>

<h3>6. Lokale Daten und eigene Verantwortung für Sicherungen</h3>
<p>Deine Einstellungen, Übe-Mixe, eigenen Farbschemata und Prüfungsergebnisse werden ausschließlich lokal im Speicher deines Geräts abgelegt. Es findet keine automatische Cloud-Sicherung statt.</p>
<p>Durch das Löschen von Browser-Daten, ein Zurücksetzen („App-Reset“ oder „Konto zurücksetzen“), eine Deinstallation oder einen Gerätedefekt gehen diese Daten unwiderruflich verloren. Für regelmäßige Sicherungen über <strong>Konto → Datensicherung → „Profil sichern“</strong> bist du selbst verantwortlich.</p>

<h3>7. Bezug über GitHub-Releases und App-Stores</h3>
<p>Wenn du die Android-App als APK über die Releases-Seite auf GitHub herunterlädst, bist du selbst dafür verantwortlich, ausschließlich offizielle, signierte Veröffentlichungen unter <a href="https://github.com/jbkstr/lauscher/releases" target="_blank" rel="noopener">github.com/jbkstr/lauscher/releases</a> zu installieren und Updates bei Bedarf selbst einzuspielen.</p>
<p>Wird Lauscher künftig zusätzlich über einen App-Store (z. B. Google Play) bereitgestellt, gelten für Download, Installation und Aktualisierung ergänzend die jeweiligen Nutzungsbedingungen des Store-Betreibers.</p>

<h3>8. Haftung</h3>
<p>Lauscher wird unentgeltlich zur Verfügung gestellt. Meine Haftung richtet sich nach den gesetzlichen Vorschriften:</p>
<ul>
  <li>Ich hafte unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit und nach zwingenden gesetzlichen Vorschriften (insbesondere dem Produkthaftungsgesetz).</li>
  <li>Im Übrigen ist die Haftung bei unentgeltlicher Bereitstellung – insbesondere für leichte Fahrlässigkeit, mittelbare Schäden, entgangenen Nutzen oder den Verlust lokal gespeicherter Einstellungen – im gesetzlich zulässigen Umfang ausgeschlossen (insbesondere entsprechend §§ 521, 523, 524 BGB).</li>
</ul>
<p>Für Inhalte externer Websites, auf die in der App verlinkt wird (z. B. GitHub, Ko-fi), sind ausschließlich deren jeweilige Betreiber verantwortlich.</p>

<h3>9. Datenschutz</h3>
<p>Informationen dazu, welche Daten anfallen und wie sie verarbeitet werden, findest du in der <a href="https://jbkstr.github.io/lauscher/privacy.html" data-legal-nav="privacy">Datenschutzerklärung</a>.</p>

<h3>10. Änderungen dieser Nutzungsbedingungen</h3>
<p>Ich kann diese Nutzungsbedingungen anpassen, wenn sich die App, der Funktionsumfang oder die Rechtslage ändert. Es gilt jeweils die aktuelle Fassung, abrufbar in der App sowie unter <a href="https://jbkstr.github.io/lauscher/terms.html" target="_blank" rel="noopener">jbkstr.github.io/lauscher/terms.html</a>.</p>

<h3>11. Anwendbares Recht und Schlussbestimmungen</h3>
<p>Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Wenn du Verbraucher mit gewöhnlichem Aufenthalt in einem anderen Staat der Europäischen Union bist, bleiben zwingende Verbraucherschutzvorschriften deines Wohnsitzstaates unberührt.</p>
<p><strong>Hinweis nach § 36 VSBG:</strong> Ich bin weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<p>Sollten einzelne Bestimmungen dieser Nutzungsbedingungen ganz oder teilweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen davon unberührt.</p>
`
    },
    en: {
      title: "Terms of Use",
      updated: "Last updated: 19 November 2026",
      draftNotice: "Draft – not yet legally reviewed.",
      langNotice: "This is a translation. The German version is the legally binding one.",
      html: `
<p>These Terms of Use govern your use of the app <strong>Lauscher</strong>, including the Android app and the web version at <a href="https://jbkstr.github.io/lauscher/" target="_blank" rel="noopener">jbkstr.github.io/lauscher</a> (including the single-file bundle “lauscher-mobile.html”). By using Lauscher, you agree to these terms.</p>

<h3>In short</h3>
<ul>
  <li>Lauscher is <strong>free, ad-free and requires no user account</strong>.</li>
  <li>You may freely use the app for personal practice and learning as well as in non-commercial music education.</li>
  <li>Lauscher is currently a <strong>beta version</strong> and a private project: features and content may change at any time, with no guarantee of continuous availability.</li>
  <li>Protect your <strong>hearing and voice</strong>: always start audio and vocal warmup exercises at a moderate volume.</li>
  <li>All settings stay <strong>locally on your device</strong> – you are responsible for backing up your own profile.</li>
</ul>

<h3>1. Provider and scope</h3>
<p>Lauscher is provided by:</p>
<p>Jens Strauch<br>Merveldtstraße 255<br>45663 Recklinghausen<br>Germany</p>
<p>Email: <a href="mailto:lauscher.privacy772@passfwd.com">lauscher.privacy772@passfwd.com</a></p>
<p>These terms apply to all features of the web version and the Android app (whether obtained via GitHub Releases or in the future via app stores such as Google Play).</p>

<h3>2. Description of the app and beta status</h3>
<p>Lauscher offers exercises for ear training, music theory, sight-reading, vocal warmup and studio listening (frequencies &amp; EQ), along with musical tools (metronome, chromatic tuner, free play and guitar fretboard). It is provided free of charge without registration or cloud storage. Via the About window, you may optionally support the project voluntarily through the external service Ko-fi (<a href="https://ko-fi.com/lauscher" target="_blank" rel="noopener">ko-fi.com/lauscher</a>); all features of Lauscher remain completely free to use regardless.</p>
<p>The app is currently in <strong>beta</strong> and is provided “as is”. I reserve the right to modify, expand or discontinue features, difficulty levels, sound libraries or the design at any time, in whole or in part. There is no entitlement to specific features, error-free operation, updates or uninterrupted availability.</p>

<h3>3. License and permitted use</h3>
<p>I grant you a non-exclusive, non-transferable, revocable right to use Lauscher free of charge for personal purposes and in non-commercial music teaching (e.g. in schools, music schools, choirs or private lessons).</p>
<p>Without my prior written consent, you may not:</p>
<ul>
  <li>sell, rent or redistribute the app or parts of it as your own commercial product;</li>
  <li>remove or alter copyright, brand or license notices;</li>
  <li>distribute modified installation files (APKs) or altered builds under the name “Lauscher”.</li>
</ul>
<p>Where individual components of Lauscher are provided under open-source licenses (such as third-party libraries or the Andika font), their respective license terms take precedence for those components (see <a href="https://jbkstr.github.io/lauscher/licenses.html?lang=en" data-legal-nav="licenses">Licenses</a>).</p>

<h3>4. Copyright and content</h3>
<p>The design, texts, exercise logic, audio samples, graphics and mascot (“Lauschebär”) are protected by copyright unless covered by separate open-source licenses. All rights remain with me or the respective rights holders.</p>
<p>Data that you create yourself within the app (such as your profile name, custom practice mixes or custom color themes) remains solely with you on your device.</p>

<h3>5. Hearing, voice and tool safety</h3>
<ul>
  <li><strong>Hearing protection:</strong> Lauscher generates musical tones, chords, pure sine waves and pink noise (especially in the Studio / Frequency &amp; EQ module). Although a built-in limiter caps output peaks, actual loudness depends on your device, operating system and headphones or speakers. Always check your volume before playback – especially when wearing headphones – and start at a moderate level.</li>
  <li><strong>Vocal warmup:</strong> The warmup exercises are intended for general musical preparation and do not replace professional vocal coaching, speech therapy or medical advice. Sing comfortably, take breaks and stop immediately if your voice feels strained or painful.</li>
  <li><strong>Tuner and metronome:</strong> The tuner and metronome are practice aids, not calibrated measuring instruments. Microphone quality, room acoustics, ambient noise and device latency can affect pitch and timing accuracy.</li>
</ul>

<h3>6. Local data and responsibility for backups</h3>
<p>Your settings, practice mixes, custom color themes and exam results are stored solely in your device's local storage. There is no automatic cloud backup.</p>
<p>Clearing browser data, performing a reset (“App Reset” or “Reset Account”), uninstalling the app or device failure will permanently erase this data. You are responsible for creating regular backups via <strong>Account → Backup → “Back Up Profile”</strong>.</p>

<h3>7. Distribution via GitHub Releases and app stores</h3>
<p>If you download the Android APK manually from GitHub Releases, you are responsible for installing only official, signed releases from <a href="https://github.com/jbkstr/lauscher/releases" target="_blank" rel="noopener">github.com/jbkstr/lauscher/releases</a> and installing updates yourself when available.</p>
<p>If Lauscher is also distributed via an app store (such as Google Play) in the future, the respective store operator's terms additionally apply to downloading, installing and updating the app.</p>

<h3>8. Liability</h3>
<p>Lauscher is provided free of charge. Liability is governed by statutory law:</p>
<ul>
  <li>I am fully liable for intent and gross negligence, for injury to life, body or health, and under mandatory statutory provisions (in particular the German Product Liability Act).</li>
  <li>In all other respects, liability for gratuitous provision – in particular for slight negligence, indirect damages, lost utility or loss of locally stored settings – is excluded to the extent permitted by law (in particular in accordance with Sections 521, 523, 524 of the German Civil Code, BGB).</li>
</ul>
<p>The operators of external websites linked from the app (such as GitHub or Ko-fi) are solely responsible for their content.</p>

<h3>9. Privacy</h3>
<p>Information on what data is involved and how it is handled can be found in the <a href="https://jbkstr.github.io/lauscher/privacy.html?lang=en" data-legal-nav="privacy">Privacy Policy</a>.</p>

<h3>10. Changes to these terms</h3>
<p>I may update these Terms of Use when the app, its features or the legal situation changes. The current version always applies and is available in the app and at <a href="https://jbkstr.github.io/lauscher/terms.html?lang=en" target="_blank" rel="noopener">jbkstr.github.io/lauscher/terms.html</a>.</p>

<h3>11. Governing law and final provisions</h3>
<p>The laws of the Federal Republic of Germany apply, excluding the UN Convention on Contracts for the International Sale of Goods (CISG). If you are a consumer habitually resident in another EU member state, mandatory consumer protection provisions of your country of residence remain unaffected.</p>
<p><strong>Notice under Section 36 VSBG:</strong> I am neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.</p>
<p>If any provision of these Terms of Use is or becomes invalid in whole or in part, the validity of the remaining provisions remains unaffected.</p>
`
    }
  },
  licenses: {
    de: {
      title: "Lizenzen",
      updated: "Stand: 19.11.2026",
      html: `
<p><strong>Lauscher</strong> kommt mit sehr wenigen externen Bestandteilen aus und lädt keine Bibliotheken, Schriftarten oder Dienste von fremden Servern nach. Alle genutzten Open-Source-Komponenten sind vollständig lokal eingebunden und unten mit ihren Lizenzhinweisen aufgeführt.</p>

<h3>Drittanbieter-Komponenten</h3>
<div class="legal-license-list">
  <article class="legal-license-card">
    <div class="legal-license-head">
      <strong class="legal-license-name">Andika (Schriftart)</strong>
      <span class="legal-license-badge">SIL OFL 1.1</span>
    </div>
    <p class="legal-license-meta">App-Schriftart (Regular, Bold, Italic, Bold Italic) · Web &amp; Android-App</p>
    <p class="legal-license-copy">Copyright © 2004–2022 SIL International (<a href="https://software.sil.org/andika/" target="_blank" rel="noopener">software.sil.org/andika</a>), mit geschützten Schriftartnamen „Andika“ und „SIL“.</p>
    <details class="legal-license-details">
      <summary>Vollständigen Lizenztext anzeigen (SIL OFL 1.1)</summary>
      <div class="legal-license-text">${LAUSCHER_OFL_1_1_TEXT}</div>
    </details>
  </article>

  <article class="legal-license-card">
    <div class="legal-license-head">
      <strong class="legal-license-name">Capacitor &amp; Plugins</strong>
      <span class="legal-license-badge">MIT</span>
    </div>
    <p class="legal-license-meta">App-Rahmen &amp; native Schnittstellen · Android-App</p>
    <p class="legal-license-copy">Verwendete Pakete: <em>@capacitor/core</em> 8.6.2, <em>@capacitor/android</em> 8.6.2 (Copyright © 2017–heute Drifty Co.), <em>@capacitor/app</em> 8.1.2, <em>@capacitor/share</em> 8.0.3 (Copyright © 2020–heute Ionic) und <em>@capacitor/filesystem</em> 8.1.5 (Copyright © 2025 Ionic) – <a href="https://capacitorjs.com/" target="_blank" rel="noopener">capacitorjs.com</a>.</p>
    <details class="legal-license-details">
      <summary>Vollständigen Lizenztext anzeigen (MIT)</summary>
      <div class="legal-license-text">MIT License

Copyright (c) 2017-present Drifty Co. (@capacitor/core, @capacitor/android)
Copyright 2020-present Ionic (@capacitor/app, @capacitor/share)
Copyright (c) 2025 Ionic (@capacitor/filesystem)

${LAUSCHER_MIT_BODY}</div>
    </details>
  </article>

  <article class="legal-license-card">
    <div class="legal-license-head">
      <strong class="legal-license-name">AndroidX / Android Jetpack</strong>
      <span class="legal-license-badge">Apache 2.0</span>
    </div>
    <p class="legal-license-meta">Android-Systembibliotheken (AppCompat, CoordinatorLayout, Core SplashScreen) · Android-App</p>
    <p class="legal-license-copy">Copyright © The Android Open Source Project (<a href="https://developer.android.com/jetpack/androidx" target="_blank" rel="noopener">developer.android.com/jetpack/androidx</a>).</p>
    <details class="legal-license-details">
      <summary>Lizenzhinweis anzeigen (Apache 2.0)</summary>
      <div class="legal-license-text">${LAUSCHER_APACHE_2_0_NOTICE}</div>
    </details>
  </article>
</div>

<h3>Lauscher – Eigene Inhalte &amp; Klang-Samples</h3>
<p>Quellcode, Übungslogik, Texte, Übersetzungen, Gestaltung, Grafiken, das Maskottchen („Lauschebär“) sowie die eingebetteten Instrumenten- und Perkussions-Samples stammen aus dem Projekt Lauscher (© 2026 Jens Strauch). Alle Rechte vorbehalten, soweit nicht anders angegeben. Einzelheiten zur erlaubten Nutzung findest du in den <a href="https://jbkstr.github.io/lauscher/terms.html" data-legal-nav="terms">Nutzungsbedingungen</a>.</p>
<p>Vielen Dank an alle Entwicklerinnen, Entwickler und Gemeinschaften hinter den oben genannten freien Projekten.</p>
`
    },
    en: {
      title: "Licenses",
      updated: "Last updated: 19 November 2026",
      langNotice: "Original license texts of third-party components are binding in their English wording.",
      html: `
<p><strong>Lauscher</strong> relies on very few external components and never loads libraries, fonts or services from third-party servers. All open-source components used are bundled locally and listed below with their license notices.</p>

<h3>Third-party components</h3>
<div class="legal-license-list">
  <article class="legal-license-card">
    <div class="legal-license-head">
      <strong class="legal-license-name">Andika (Font)</strong>
      <span class="legal-license-badge">SIL OFL 1.1</span>
    </div>
    <p class="legal-license-meta">App typeface (Regular, Bold, Italic, Bold Italic) · Web &amp; Android app</p>
    <p class="legal-license-copy">Copyright © 2004–2022 SIL International (<a href="https://software.sil.org/andika/" target="_blank" rel="noopener">software.sil.org/andika</a>), with Reserved Font Names “Andika” and “SIL”.</p>
    <details class="legal-license-details">
      <summary>Show full license text (SIL OFL 1.1)</summary>
      <div class="legal-license-text">${LAUSCHER_OFL_1_1_TEXT}</div>
    </details>
  </article>

  <article class="legal-license-card">
    <div class="legal-license-head">
      <strong class="legal-license-name">Capacitor &amp; Plugins</strong>
      <span class="legal-license-badge">MIT</span>
    </div>
    <p class="legal-license-meta">Native app container &amp; plugins · Android app</p>
    <p class="legal-license-copy">Packages used: <em>@capacitor/core</em> 8.6.2, <em>@capacitor/android</em> 8.6.2 (Copyright © 2017–present Drifty Co.), <em>@capacitor/app</em> 8.1.2, <em>@capacitor/share</em> 8.0.3 (Copyright © 2020–present Ionic) and <em>@capacitor/filesystem</em> 8.1.5 (Copyright © 2025 Ionic) – <a href="https://capacitorjs.com/" target="_blank" rel="noopener">capacitorjs.com</a>.</p>
    <details class="legal-license-details">
      <summary>Show full license text (MIT)</summary>
      <div class="legal-license-text">MIT License

Copyright (c) 2017-present Drifty Co. (@capacitor/core, @capacitor/android)
Copyright 2020-present Ionic (@capacitor/app, @capacitor/share)
Copyright (c) 2025 Ionic (@capacitor/filesystem)

${LAUSCHER_MIT_BODY}</div>
    </details>
  </article>

  <article class="legal-license-card">
    <div class="legal-license-head">
      <strong class="legal-license-name">AndroidX / Android Jetpack</strong>
      <span class="legal-license-badge">Apache 2.0</span>
    </div>
    <p class="legal-license-meta">Android support libraries (AppCompat, CoordinatorLayout, Core SplashScreen) · Android app</p>
    <p class="legal-license-copy">Copyright © The Android Open Source Project (<a href="https://developer.android.com/jetpack/androidx" target="_blank" rel="noopener">developer.android.com/jetpack/androidx</a>).</p>
    <details class="legal-license-details">
      <summary>Show license notice (Apache 2.0)</summary>
      <div class="legal-license-text">${LAUSCHER_APACHE_2_0_NOTICE}</div>
    </details>
  </article>
</div>

<h3>Lauscher – Original content &amp; audio samples</h3>
<p>Source code, exercise logic, texts, translations, visual design, artwork, the mascot (“Lauschebär”) and the embedded instrument and percussion samples are part of the Lauscher project (© 2026 Jens Strauch). All rights reserved unless stated otherwise. For permitted uses, see the <a href="https://jbkstr.github.io/lauscher/terms.html?lang=en" data-legal-nav="terms">Terms of Use</a>.</p>
<p>Many thanks to all developers and communities behind the free and open-source projects listed above.</p>
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
  const onlineUrl = (typeof LAUSCHER_LEGAL_URLS === "object" && LAUSCHER_LEGAL_URLS[kind]) || "";
  return {
    ...entry,
    kind,
    lang: useDe ? "de" : "en",
    isDraft: Boolean(LAUSCHER_LEGAL_DRAFT && entry.draftNotice),
    onlineUrl
  };
}
