# Crit 1 reflection

**The breakthrough that moved the work forward.** I'd read the week's spec as
"keep the stack simple," and had already stripped out Vite in favour of a
plain copy-script. When I checked more carefully, the actual line was "no
JavaScript" — a stricter, different constraint I'd have kept violating with a
half-attentive read. The fix itself was one deleted file, but the thing that
actually mattered was not stopping there: I wrote a spec test asserting no
`.js`/`.mjs` ships and no page carries a `<script>` tag, so that constraint is
now something the build checks for me instead of something I have to remember
on every new page. That's the pattern I want to keep: when I catch myself
correcting the same kind of mistake, the fix isn't the correction, it's a
sensor that makes the mistake impossible to ship quietly.

**What this changed about who I want to be as a developer.** I noticed how
easy it was to satisfy my own paraphrase of a requirement instead of the
requirement itself, and how much better a failing test caught that than my
own re-reading did. I want to get in the habit of turning a spec line into a
check before I start trusting my memory of it — not as extra ceremony, but
because the check is the only version of the constraint that can't quietly
drift as the site grows.
