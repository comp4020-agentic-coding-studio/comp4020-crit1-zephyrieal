# Process overview

A reading-guide to how the work came together — a map to your process, not an
essay about it.

## What I built

**The Conspiracy Archive** — a GeoCities-style, X-Files-inspired site of
invented (not real) conspiracies: the moon is a disco ball, cats are staging a
silent invasion, goldfish never sleep. Black background, neon-green terminal
text, a blinking "TOP SECRET" banner, CRT scanlines, grainy inline-SVG
"photographs," and a pixel-art icon, spread across five tabs — Home, Case
Files, Classified, Evidence, and UFO Sightings — deliberately built to feel
like an amateur early-internet site, with no JavaScript anywhere.

## The moments that mattered

1. **The stack choice implied "no bundler," but the week's spec said "no
   JavaScript" at all** — a stricter constraint than the one I'd already
   satisfied. The obvious fix was to delete `main.js` and move on. Instead I
   also wrote a spec test that fails if any `.js`/`.mjs` ships in `dist/` or
   any page contains a `<script>` tag, so the constraint lives in the harness
   and can't quietly regress on a later page.
   [`e682940...0112148`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/e682940...0112148) —
   I ran `pnpm check` afterwards (68 tests) to confirm red-then-green, not just
   that the file was gone.

2. **The site started as one homepage plus a flat archive page.** Partway
   through, the brief I was given added CASE FILES / CLASSIFIED / EVIDENCE as
   separate tabs, each with a different register (tabloid blurb, redacted
   memo, exhibit caption). The obvious move was to keep one archive page and
   add headings; instead I split it into dedicated pages so each tab's content
   shape matches what it actually is, and backed the resulting fan-out with a
   BFS reachability test (`spec/crit-1.test.ts`) asserting every built page is
   reachable from `index.html` — so adding a tab without linking it from nav
   fails loudly instead of shipping a dead page.
   [`ee6206c...0e8aee4`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/ee6206c...0e8aee4) —
   confirmed with `pnpm dlx linkinator ./dist --silent` (7/7 links resolved)
   and a headless-Chrome screenshot at both marked viewports.

3. **UFO Sightings could have been folded into Evidence** — it was the
   obvious place to slot in "scary aliens," since Evidence already had an
   exhibit grid. I gave it a standalone tab instead, with its own
   witness-testimony format (blockquotes, not captions), because the brief
   called it out as its own thing, not a sub-case of the photo evidence.
   [`95f0297`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/commit/95f0297) —
   checked the reachability test still passed with the fifth nav node added,
   and looked at the rendered page before deciding the tone (witness quotes)
   was distinct enough to earn its own tab.

4. **The brief asked for the site to feel like six months of someone
   obsessively bolting features onto a GeoCities page** — table layout,
   sidebars, a marquee, a hit counter, badges, a guestbook. The obvious move
   was to restyle in place; instead I built the full new chrome once in
   `index.html`, verified it rendered correctly at both marked viewports, and
   only then hand-copied that exact block into the other seven pages plus a
   new `guestbook.html` — so one reference implementation got debugged
   instead of eight independent copies.
   [`56fca77...072bd0c`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/compare/56fca77...072bd0c) —
   `pnpm check` stayed green throughout (68 → 75 tests as pages were added),
   and `pnpm dlx linkinator ./dist --recurse` confirmed 0 broken links across
   all 10 pages.

5. **A headless-Chrome CLI screenshot at 390px looked like the new marquee
   was overflowing on mobile.** The obvious fix was to shrink the marquee;
   instead I first isolated whether the bug was real by stashing my changes
   and re-screenshotting the original, unmodified `evidence.html` — it showed
   the identical artifact, so the CLI's viewport handling, not my CSS, was at
   fault. I switched to Puppeteer with an explicit `page.setViewport()`, which
   rendered correctly, and while looking at those clean screenshots caught a
   second, real bug: the "TOP SECRET" stamp overlapped the first line of text
   on narrow viewports (visible on `moon-disco-ball.html` too, not just the
   new guestbook page).
   [`779a826`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit1-zephyrieal/commit/779a826) —
   confirmed by re-screenshotting both affected pages at 390×844 before and
   after the fix.

## Before you ship

`pnpm check:evidence` verifies your citations resolve to real commits, that the
current reflection entry is in `reflections/`, and that your `CLAUDE.md` is
there — before a marker ever opens the file. It checks that your map is
traceable, not that it is good: the marker judges whether your small,
deliberately chosen set of moments shows real judgement and reflection. A green
check is not a substitute for that curation.

Images are deliberately not checked, because whether one renders is visible the
moment you look. Open this file on GitHub and look at it before you ship.
