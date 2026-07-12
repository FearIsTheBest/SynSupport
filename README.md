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
css/                  Bulma theme + overrides
js/                   site.js, nolt, toastr, purify
lib/                  jQuery, Bootstrap, Font Awesome
fonts/  img/          Web fonts + logos
```

## Notes

The original Wayback capture did not include the binary web-font files
(`fonts/opensans/*`, `lib/fontawesome/webfonts/*`) or the search-hero background
images (`img/1.jpg`–`img/4.jpg`), so those paths are wired up correctly but the
files are absent. Text falls back to system fonts. Drop the originals into those
folders to restore them fully.
