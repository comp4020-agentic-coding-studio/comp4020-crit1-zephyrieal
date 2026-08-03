# Process overview

A reading-guide to how the work came together — a map to your process, not an
essay about it.

## What I directed

**The Conspiracy Archive** — a GeoCities-style site of made-up conspiracies
(the moon is a disco ball, cats are staging a silent invasion, pigeons are
surveillance drones, and more). Neon-green terminal look, a huge blinking
"TOP SECRET" banner, CRT scanlines, fake-3D borders, grainy inline-SVG
"photos," and cluttered sidebars — twelve pages, no JavaScript anywhere. I
worked through Claude Code, deciding what to build and catching what it got
wrong, rather than writing every line myself.

## The moments that mattered

1. **I'd told the agent "no bundler," but the spec actually said "no
   JavaScript" at all.** Vite was already gone, but a small `main.js` file was
   still linked in — my read of the spec had been too loose. I had the agent
   delete it and add a test that fails if any `.js` file ships or any page
   has a `<script>` tag, so a looser reading like mine can't slip through
   again.
   [`e682940...0112148`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/e682940...0112148) —
   had it run `pnpm check` after to confirm it went from failing to passing.

2. **The brief later split one flat archive page into three tabs (Case
   Files, Classified, Evidence), each with its own tone.** Rather than let it
   just bolt headings onto the one page, I asked for each to become a real
   page, plus a test that checks every page is actually reachable from the
   homepage — so a new tab can't get built without being linked.
   [`ee6206c...0e8aee4`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/ee6206c...0e8aee4) —
   had it check all links resolved and screenshot both marked viewports.

3. **UFO Sightings could have just lived inside Evidence.** I asked for it as
   its own tab instead, with witness quotes rather than photo captions,
   because the brief treated it as a separate thing, not a sub-case of the
   photo evidence.
   [`95f0297`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/commit/95f0297) —
   confirmed the reachability test still passed and reviewed the rendered
   page myself.

4. **The brief wanted the site to look like someone kept bolting features
   onto it for years** — table layout, sidebars, marquee, badges, a
   guestbook. Instead of letting it edit all eight pages at once, I had it
   build the new chrome once on the homepage, check that worked, then copy
   that one working version everywhere else.
   [`56fca77...072bd0c`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/56fca77...072bd0c) —
   `pnpm check` stayed green the whole way, and linkinator found 0 broken
   links across all 10 pages.

5. **A screenshot at 390px showed the marquee overflowing.** Before letting
   it touch the CSS, I asked it to check whether the bug was real by
   screenshotting an unrelated, unchanged page — same artifact showed up, so
   the screenshot tool was at fault, not the code. Switching tools also
   surfaced a real bug I'd have otherwise missed: the "TOP SECRET" stamp
   overlapping text on narrow screens.
   [`779a826`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/commit/779a826) —
   had it re-screenshot both pages before and after the fix.

6. **The "JOIN THE TRUE BELIEVERS" button is supposed to go nowhere, as a
   joke — but a dead link just looks broken.** I pushed back on a plain
   link-to-nowhere and asked for a real page that plays the joke straight: a
   permanent "under construction" page with no working signup form. I had it
   grep the file to confirm there really was no form, rather than take its
   word for it.
   [`6844114...ce6c85c`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/6844114...ce6c85c) —
   `pnpm check` passed and I had it screenshot the new page at both sizes.

7. **Adding two more fake conspiracies could have been a quick paragraph
   each.** I asked for the same full treatment as the existing cases instead
   — their own page, a teaser on Case Files, a photo on Evidence — so they
   wouldn't read as an afterthought.
   [`d8134aa...c858dd7`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/d8134aa...c858dd7) —
   linkinator found 0 broken links and I had it screenshot both new pages at
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
