import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// Crit 1 (Forgotten web): https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/crits/01-forgotten-web/
// Only the mechanically checkable spec lines live here. "The look commits to
// a forgotten web era" and "you can account for how you directed the agent"
// are judged at the crit, not by a test.
const DIST = resolve("dist");

function htmlFiles(dir: string = DIST): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

const pages = htmlFiles().map((path) => ({
  name: relative(DIST, path),
  doc: new JSDOM(readFileSync(path, "utf8")).window.document,
}));

describe("spec: no JavaScript", () => {
  it("ships no .js or .mjs files", () => {
    const scripts = htmlFiles().length; // sanity: htmlFiles walk works
    expect(scripts).toBeGreaterThan(0);
    const jsFiles = readdirSync(DIST, { recursive: true } as never) as string[];
    const shipped = jsFiles.filter((f) => f.endsWith(".js") || f.endsWith(".mjs"));
    expect(shipped, `found ${shipped.join(", ")}`).toHaveLength(0);
  });

  for (const { name, doc } of pages) {
    it(`${name} has no <script> tag`, () => {
      expect(doc.querySelectorAll("script")).toHaveLength(0);
    });
  }
});

describe("spec: a real site", () => {
  it("has a handful of pages, not just one", () => {
    expect(pages.length).toBeGreaterThanOrEqual(3);
  });

  it("every page is reachable from the home page", () => {
    const byName = new Map(pages.map((p) => [p.name, p]));
    const seen = new Set<string>();
    const queue = ["index.html"];
    while (queue.length > 0) {
      const name = queue.shift() as string;
      if (seen.has(name)) continue;
      seen.add(name);
      const page = byName.get(name);
      if (!page) continue;
      for (const a of page.doc.querySelectorAll("a[href]")) {
        const href = a.getAttribute("href") ?? "";
        if (!href.endsWith(".html")) continue;
        const target = href.replace(/^\.\//, "");
        if (byName.has(target)) queue.push(target);
      }
    }
    const unreachable = pages.map((p) => p.name).filter((n) => !seen.has(n));
    expect(unreachable, `unreachable from index.html: ${unreachable.join(", ")}`).toHaveLength(0);
  });
});
