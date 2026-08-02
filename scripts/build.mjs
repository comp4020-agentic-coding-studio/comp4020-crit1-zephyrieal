#!/usr/bin/env node
// Bare build: no bundler, no transpile. Every .html/.css/.js file in the repo
// is a site asset (same "every .html file is a page" rule the Vite config
// used), copied verbatim into dist/ with its relative path preserved.
import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";

const SKIP = new Set([
  "node_modules",
  "dist",
  ".git",
  ".github",
  ".githooks",
  "spec",
  "scripts",
  "reflections",
]);

const SITE_EXTENSIONS = new Set([".html", ".css", ".js", ".mjs"]);

function siteFiles(dir = ".") {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".") || SKIP.has(entry.name)) return [];
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return siteFiles(path);
    return SITE_EXTENSIONS.has(entry.name.slice(entry.name.lastIndexOf("."))) ? [path] : [];
  });
}

rmSync("dist", { recursive: true, force: true });
for (const file of siteFiles()) {
  const dest = join("dist", file);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(file, dest);
}
