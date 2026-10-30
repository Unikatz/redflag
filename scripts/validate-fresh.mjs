#!/usr/bin/env node
// Checks content/fresh.json before it goes live. No dependencies.
// Usage: node scripts/validate-fresh.mjs [path]
import { readFileSync } from "node:fs";

const file = process.argv[2] || "content/fresh.json";
const errors = [];
const warn = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);

let d;
try { d = JSON.parse(readFileSync(file, "utf8")); }
catch (e) { console.error(`✗ ${file} is not valid JSON: ${e.message}`); process.exit(1); }

const TRACKS = ["kids", "teens", "adults", "seniors", "work"];
const str = (v, min = 1, max = 600) => typeof v === "string" && v.trim().length >= min && v.length <= max;

if (!/^\d{4}-\d{2}-\d{2}$/.test(d.week || "")) err("week", "must be YYYY-MM-DD");
else if (Number.isNaN(Date.parse(d.week))) err("week", "is not a real date");
if (!str(d.title, 3, 60)) err("title", "3 to 60 characters");
if (!str(d.sub, 3, 90)) err("sub", "3 to 90 characters");
if (d.threat !== undefined && !(Number.isInteger(d.threat) && d.threat >= 1 && d.threat <= 5)) err("threat", "integer 1 to 5");
if (!Array.isArray(d.audience) || !d.audience.length || d.audience.some((a) => !TRACKS.includes(a)))
  err("audience", `non-empty list from ${TRACKS.join(", ")}`);
if (!Array.isArray(d.lessons) || !d.lessons.length || d.lessons.length > 3) err("lessons", "1 to 3 lessons");

let total = 0;
(d.lessons || []).forEach((l, li) => {
  const L = `lessons[${li}]`;
  if (!str(l.name, 3, 40)) err(`${L}.name`, "3 to 40 characters");
  if (!Array.isArray(l.ex) || l.ex.length < 3 || l.ex.length > 8) err(`${L}.ex`, "3 to 8 exercises");
  (l.ex || []).forEach((e, i) => {
    total++;
    const W = `${L}.ex[${i}] (${e && e.t})`;
    if (!e || typeof e !== "object") return err(W, "not an object");
    if (!str(e.why, 20, 500)) err(W, "why: 20 to 500 characters explaining the answer");
    if (e.flag !== undefined && !str(e.flag, 2, 40)) err(W, "flag: 2 to 40 characters");
    if (e.source !== undefined) {
      if (!e.source || !str(e.source.label, 3, 120)) err(W, "source.label missing");
      if (!e.source || typeof e.source.url !== "string" || !/^https:\/\/[^\s]+$/.test(e.source.url)) err(W, "source.url must be an https:// link");
    }
    switch (e.t) {
      case "choice": {
        if (!str(e.q, 10, 220)) err(W, "q: 10 to 220 characters");
        if (!Array.isArray(e.opts) || e.opts.length < 2 || e.opts.length > 4 || e.opts.some((o) => !str(o, 1, 140))) err(W, "opts: 2 to 4 non-empty strings");
        else if (new Set(e.opts.map((o) => o.trim().toLowerCase())).size !== e.opts.length) err(W, "opts must be different from each other");
        if (!(Number.isInteger(e.a) && e.a >= 0 && e.a < (e.opts || []).length)) err(W, "a: index of the correct option");
        if (!e.source) warn.push(`${W}: no source. Fine for general advice, add one for any fact, number or date`);
        break;
      }
      case "spot":
        if (!e.msg || !str(e.msg.text, 10, 400) || !str(e.msg.ch, 2, 40) || !str(e.msg.from, 1, 80)) err(W, "msg needs ch, from, text");
        if (typeof e.scam !== "boolean") err(W, "scam: true or false");
        break;
      case "flags":
        if (!str(e.q, 5, 120)) err(W, "q needed");
        if (!e.msg || !str(e.msg.ch, 2, 40) || !str(e.msg.from, 1, 80)) err(W, "msg needs ch and from");
        if (!Array.isArray(e.segs) || e.segs.length < 3 || e.segs.length > 7) err(W, "segs: 3 to 7 parts");
        else {
          if (!e.segs.some((s) => s.flag === true)) err(W, "at least one segment with flag: true");
          if (!e.segs.some((s) => s.flag === false)) err(W, "at least one segment with flag: false");
          if (e.segs.some((s) => !str(s.text, 2, 200))) err(W, "every segment needs text");
        }
        break;
      case "match":
        if (!Array.isArray(e.pairs) || e.pairs.length < 3 || e.pairs.length > 5 || e.pairs.some((p) => !Array.isArray(p) || p.length !== 2 || !str(p[0], 1, 60) || !str(p[1], 1, 80)))
          err(W, "pairs: 3 to 5 [left, right] string pairs");
        else if (new Set(e.pairs.map((p) => p[0])).size !== e.pairs.length || new Set(e.pairs.map((p) => p[1])).size !== e.pairs.length)
          err(W, "left and right sides must each be unique");
        break;
      case "order":
        if (!str(e.q, 10, 160)) err(W, "q needed");
        if (!Array.isArray(e.steps) || e.steps.length < 3 || e.steps.length > 6 || e.steps.some((s) => !str(s, 2, 120))) err(W, "steps: 3 to 6 strings in the correct order");
        break;
      default:
        err(W, "t must be choice, spot, flags, match or order");
    }
    // Safety: never ship working attack material or live-looking credentials.
    const blob = JSON.stringify(e).toLowerCase();
    if (/powershell|cmd\.exe|curl\s+-|wget\s|base64\s+-d|\biex\b|rm\s+-rf/.test(blob)) err(W, "looks like a runnable command. Describe it, don't include it");
    if (/\b\d{13,19}\b/.test(blob)) err(W, "contains a long number that could be a card or account number");
  });
});

if (total < 3) err("lessons", "at least 3 exercises in total");

warn.forEach((w) => console.log(`! ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`✗ ${e}`));
  console.error(`\n${errors.length} problem(s) in ${file}`);
  process.exit(1);
}
console.log(`✓ ${file}: week ${d.week}, ${d.lessons.length} lesson(s), ${total} exercises`);
