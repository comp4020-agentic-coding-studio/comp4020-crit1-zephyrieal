# Process overview

A reading-guide to how the work came together — a map to your process, not an
essay about it.

## What I built

**The Conspiracy Archive** — a GeoCities-style site of made-up conspiracies
(the moon is a disco ball, cats are staging a silent invasion, pigeons are
surveillance drones, and more). Neon-green terminal look, a huge blinking
"TOP SECRET" banner, CRT scanlines, fake-3D borders, grainy inline-SVG
"photos," and cluttered sidebars — twelve pages, no JavaScript anywhere.

## The moments that mattered

1. **I thought "no bundler" was the whole rule — the spec actually said "no
   JavaScript."** I'd already removed Vite, but a small `main.js` file was
   still linked in. I deleted it, and added a test that fails if any `.js`
   file ships or any page has a `<script>` tag, so this can't come back by
   accident.
   [`e682940...0112148`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/e682940...0112148) —
   ran `pnpm check` after to confirm it went from failing to passing.

2. **The brief later split one flat archive page into three tabs (Case
   Files, Classified, Evidence), each with its own tone.** Instead of just
   adding headings to one page, I made each a real page, and added a test
   that checks every page is actually reachable from the homepage — so a new
   tab can't get built without being linked.
   [`ee6206c...0e8aee4`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/ee6206c...0e8aee4) —
   checked all links resolved and screenshotted both marked viewports.

3. **UFO Sightings could have just lived inside Evidence.** I gave it its own
   tab instead, with witness quotes instead of photo captions, because the
   brief treated it as a separate thing, not a sub-case of the photo evidence.
   [`95f0297`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/commit/95f0297) —
   confirmed the reachability test still passed and reviewed the rendered
   page.

4. **The brief wanted the site to look like someone kept bolting features
   onto it for years** — table layout, sidebars, marquee, badges, a
   guestbook. Rather than editing all eight pages at once, I built the new
   chrome once on the homepage, checked it worked, then copied that one
   working version everywhere else.
   [`56fca77...072bd0c`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/56fca77...072bd0c) —
   `pnpm check` stayed green the whole way, and linkinator found 0 broken
   links across all 10 pages.

5. **A screenshot at 390px showed the marquee overflowing.** Before touching
   the CSS, I checked whether it was a real bug by screenshotting an
   unrelated, unchanged page — it had the same issue, so the problem was the
   screenshot tool, not my code. Switching tools also surfaced a real bug:
   the "TOP SECRET" stamp overlapping text on narrow screens.
   [`779a826`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/commit/779a826) —
   re-screenshotted both pages before and after the fix.

6. **The "JOIN THE TRUE BELIEVERS" button is supposed to go nowhere, as a
   joke — but a dead link just looks broken.** Instead of a link to nowhere, I
   built a real page that plays the joke straight: a permanent "under
   construction" page with no working signup form. I grepped the file to
   make sure there really was no form.
   [`6844114...ce6c85c`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/6844114...ce6c85c) —
   `pnpm check` passed and I screenshotted the new page at both sizes.

7. **Adding two more fake conspiracies could have been a quick paragraph
   each.** Instead I gave them the same full treatment as the existing cases
   — their own page, a teaser on Case Files, and a photo on Evidence — so
   they don't look like an afterthought.
   [`d8134aa...c858dd7`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/d8134aa...c858dd7) —
   linkinator found 0 broken links and I screenshotted both new pages at
   both marked viewports.

## Before you ship

`pnpm check:evidence` verifies your citations resolve to real commits, that the
current reflection entry is in `reflections/`, and that your `CLAUDE.md` is
there — before a marker ever opens the file. It checks that your map is
traceable, not that it is good: the marker judges whether your small,
deliberately chosen set of moments shows real judgement and reflection. A green
check is not a substitute for that curation.

Images are deliberately not checked, because whether one renders is visible the
moment you look. Open this file on GitHub and look at it before you ship.
