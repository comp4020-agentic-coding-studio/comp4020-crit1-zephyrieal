# Crit 1 reflection

**The breakthrough that moved the work forward.** Early on I removed Vite and
switched to a plain copy-script, reading the spec as "keep the stack simple."
That part was right, but I stopped too early — the actual spec line was "no
JavaScript at all," not just "no bundler." I still had a small `main.js` file
linked in with a `<script>` tag. Once I noticed the stricter rule, I deleted
the JavaScript entirely and wrote a test that fails if any `.js` file ships or
any page has a `<script>` tag — so that rule can't quietly break later without
me noticing.

**What this changed about who I want to be as a developer.** I realised I'd
been checking my own paraphrase of the spec, not the spec itself, and a test
caught that faster than re-reading the text did. Going forward, I want to
turn spec lines into tests early, instead of trusting my memory of what they
said.
