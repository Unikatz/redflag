#!/usr/bin/env node
// Builds a single-file test page of the app with a draft content/fresh.json baked in,
// so the owner can play the new weekly cases before anything is pushed.
// Usage: node scripts/build-preview.mjs [fresh.json] [out.html]
import { readFileSync, writeFileSync } from "node:fs";

const freshPath = process.argv[2] || "content/fresh.json";
const out = process.argv[3] || "preview.html";

const fresh = JSON.parse(readFileSync(freshPath, "utf8"));
let html = readFileSync("index.html", "utf8");

// 1. No service worker in a preview.
html = html.replace(/<script>\s*if\("serviceWorker" in navigator[\s\S]*?<\/script>/, "");

// 2. Bake the draft cases in. The app tries content/fresh.json first; when that
//    can't load (as on a preview page) it falls back to this embedded copy.
const seed = JSON.stringify(fresh).replace(/</g, "\\u003c");
const banner = `<div style="font:600 12px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.06em;text-transform:uppercase;background:#FFD84D;color:#1A1600;padding:8px 16px;text-align:center">Test page · draft cases for week of ${fresh.week} · not live yet</div>`;
html = html.replace(
  '<div class="app" id="app"></div>',
  `${banner}\n<div class="app" id="app"></div>\n<script type="application/json" id="fresh-seed">${seed}</script>`
);
if (!html.includes('id="fresh-seed"')) {
  console.error("✗ Could not find the app container in index.html");
  process.exit(1);
}

// 3. Distinct title so the preview isn't mistaken for the live app.
html = html.replace(/<title>[^<]*<\/title>/, `<title>Red Flag Run test ${fresh.week}</title>`);

writeFileSync(out, html);
console.log(`✓ ${out}: test page with draft cases for week ${fresh.week}`);
