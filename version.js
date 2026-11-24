/**
 * Lauscher • Versionsstand (einzige Quelle)
 *
 * - name:  sichtbare Version (SemVer, z. B. "0.9.0-beta") → Android versionName
 * - build: fortlaufende Build-Nummer, steigt mit JEDER veröffentlichten APK → Android versionCode
 *          (Android installiert Updates nur, wenn der versionCode größer ist als der installierte)
 * - date:  Datum des Builds (JJJJ-MM-TT)
 *
 * Nicht von Hand ändern, sondern mit:  python3 scripts/bump-version.py
 * scripts/sync-android.sh überträgt name/build automatisch in android/app/build.gradle.
 */
const LAUSCHER_VERSION = {
  name: "0.10.0-beta",
  build: 2,
  date: "2026-11-24"
};
