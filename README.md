# Synapse Support (Dev) — Static Mirror

A cleaned-up static copy of the Synapse Support developer site (`dev.synapsesupport.io`)
Knowledgebase page.

All Wayback Machine and HTTrack artifacts have been stripped out:

- Removed the injected Wayback toolbar/banner, `__wm` playback scripts, `wombat.js`,
  `bundle-playback.js`, `ruffle`, `athena.js`, and archive analytics.
- Removed HTTrack cache/logs (`hts-cache/`, `hts-log.txt`, `cookies.txt`) and the
  local-index redirect stubs.
- Rewrote every asset reference from `web.archive.org` / `web-static.archive.org`
  URLs to clean relative local paths.

## Structure

```
index.html            Knowledgebase landing page
Knowledgebase.html    Same page (linked from the nav)
login.html            Log in page  (Firebase Auth)
register.html         Sign up page (Firebase Auth)
css/                  Bulma theme + overrides
js/                   site.js, auth.js, firebase-config.js, nolt, toastr, purify
lib/                  jQuery, Bootstrap, Font Awesome
fonts/  img/          Web fonts + logos
```

## Authentication (Firebase)

Sign up / Log in are wired to [Firebase Authentication](https://firebase.google.com/docs/auth)
(email + password, plus a "Continue with Google" button). The code lives in
`js/auth.js`; it also keeps the navbar in sync — signed-in users see their name
and a **Log out** button instead of the Sign up / Log in buttons.

Until it's connected it runs in **demo mode**: the pages render and the forms
show a friendly "auth isn't connected yet" notice instead of erroring.

To go live:

1. Create a project at <https://console.firebase.google.com> and add a **Web app**.
2. Copy the config values into **`js/firebase-config.js`** (replace the
   `YOUR_...` placeholders).
3. In the console, enable **Authentication → Sign-in method → Email/Password**
   (and **Google** if you want that button to work).
4. Add your domain (e.g. `fearisthebest.github.io`) under
   **Authentication → Settings → Authorized domains**.

That's it — no build step. Firebase is loaded from the official CDN as an ES
module, so the pages must be served over `http(s)://` (GitHub Pages works;
opening the file directly with `file://` will block the module import).

## Notes

The original Wayback capture did not include the binary web-font files
(`fonts/opensans/*`, `lib/fontawesome/webfonts/*`) or the search-hero background
images (`img/1.jpg`–`img/4.jpg`), so those paths are wired up correctly but the
files are absent. Text falls back to system fonts. Drop the originals into those
folders to restore them fully.
