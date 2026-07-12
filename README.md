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
category.html         Article list for a category  (?id=...)
article.html          A single article             (?id=...)
login.html            Log in page  (Firebase Auth)
register.html         Sign up page (Firebase Auth)
css/                  Bulma theme + overrides
js/                   site.js, auth.js, firebase-config.js,
                      kb-data.js, knowledgebase.js, nolt, toastr, purify
lib/                  jQuery, Bootstrap, Font Awesome (+ vendored webfonts)
fonts/  img/          Web fonts, logos, favicon set
```

## Knowledgebase content

The category cards, article lists and article pages are all rendered from one
file: **`js/kb-data.js`**. Edit that to add/remove categories or articles — the
card counts, category pages (`category.html?id=…`) and article pages
(`article.html?id=…`) update automatically. Article `body` may contain simple
HTML and is sanitised with DOMPurify before rendering. The starter articles are
placeholders — swap in your real content (or, later, load it from Firestore
using the same shape).

## Icons & favicon

The original Wayback capture never included the Font Awesome **6.2.0** webfonts,
so every icon was blank. The real webfonts are now vendored under
`lib/fontawesome/webfonts/`, so all icons render. The site favicon (the Synapse
"S") lives in `img/favicon/` and is wired into every page.

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
