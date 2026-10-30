# Weekly cases

`fresh.json` holds **This week's cases**, a "New this week" dossier at the top of the Cases tab. Players on every track listed in `audience` see it. Built-in lessons stay in `index.html`.

## How a new week goes live

1. Every **Saturday morning (Singapore time)** a Claude scheduled task researches the past week's scams and threats and drafts a new `fresh.json`. **Nothing is pushed yet.**
2. It builds a private **test page**, the full app with the draft cases loaded (`scripts/build-preview.mjs`). It sends you the link, the questions and answers, and asks for your approval.
3. **You check it.** Play the "New this week" dossier on the test page and tap the source links. Then reply in that task's chat:
   - **Approve**: pushed to GitHub `main` and live on Vercel within about a minute
   - **Approve as PR**: pushed as a pull request so you can look again before merging
   - **Change: …**: edited as you say, with a new test page sent for another check
   - **Reject**: discarded, and last week's cases stay up
4. Nothing reaches GitHub until you approve. With no reply, nothing changes.

## Review checklist (2–5 minutes)

- [ ] Each fact, number and date matches its source link
- [ ] The correct answer really is correct, and the wrong options are clearly wrong
- [ ] Advice is safe: "hang up and call the official number", never "reply to check"
- [ ] No real person's or company's name used as the scammer (an invented name in quotes is fine)
- [ ] No runnable commands, real phishing links or real phone numbers belonging to scammers
- [ ] Reads well for the `audience` tracks (plain words for seniors)

## Format

```json
{
  "week": "2026-10-31",                 // Saturday the cases were made (YYYY-MM-DD)
  "title": "This week's cases",
  "sub": "Short summary of the themes",  // up to 90 characters
  "threat": 2,                           // 1 (everyday) to 5 (nation-state)
  "audience": ["teens", "adults", "seniors", "work"],   // also "kids"
  "lessons": [ { "name": "Case name", "ex": [ /* 3 to 8 exercises */ ] } ]
}
```

Exercise types (`why` is required on all of them; `flag` is a 1–3 word red-flag label; `source` is `{ "label", "url" }` with an https link and is required for any fact, number or date):

| `t` | Fields |
|---|---|
| `choice` | `q`, `opts` (2–4), `a` (index of the correct option) |
| `spot` | `msg: { ch, from, text }`, `scam: true / false` |
| `flags` | `q`, `msg: { ch, from }`, `segs: [ { text, flag: true/false } ]` (3–7, at least one of each) |
| `match` | `q`, `pairs: [ [left, right] ]` (3–5) |
| `order` | `q`, `steps` (3–6, written in the correct order. The app shuffles them) |

Check locally: `node scripts/validate-fresh.mjs` · Build a test page: `node scripts/build-preview.mjs content/fresh.json preview.html`

**Android:** the app uses the copy in `android/app/src/main/assets/content/`. To give the Android app live weekly cases, set your site's address in the `rfr-content` tag at the top of `android/app/src/main/assets/index.html`, for example `https://redflag.vercel.app/content/fresh.json`.
