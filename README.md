# Red Flag Run

**Cyber security awareness for everyone, regardless of age and where you are.**

Red Flag Run is a free learning game. Players work through short daily *cases* built from real scam reports. The cases range from fake parcel texts and deepfakes to ransomware and nation-state cyber operations. There are no ads, no tracking and no accounts. Progress stays on the device.

## What's in this repo

| Path | What it is |
|---|---|
| `index.html` | The game: one self-contained HTML file with no libraries |
| `privacy.html` | Public privacy policy at `/privacy`, for Google Play |
| `manifest.webmanifest`, `sw.js`, `icons/`, `favicon.svg` | Make it installable ("Add to Home screen") and playable offline |
| `vercel.json` | Clean URLs, security headers, caching |
| `android/` | Android Studio project that wraps the game for Google Play. See `android/README.md` |

## Deploy the website (Vercel)

Import this repo at **vercel.com → Add New → Project**. Keep the defaults (Framework **Other**, no build command, root `./`) and click **Deploy**. Every push to `main` redeploys automatically. Details are in `WEB-DEPLOY.md`.

## Before going public

- [ ] Replace `hello@[your-domain]` in `index.html`, `privacy.html` and `android/app/src/main/assets/index.html`
- [ ] Bump `VERSION` in `sw.js` on every content update
- [ ] For the first Play Store release (13+), hide the Kids track

## Content

There are 8 dossiers, 16 cases and 80 exercises across 5 formats: scam-or-legit, multiple choice, spot the red flags, match, and put in order. Age tracks are Kids, Teens, Adults, Seniors and At work (team mode). Official reporting channels are included for SG, MY, PH, IN, AU, UK and US. Content was checked against public sources up to 30 Oct 2026, with a source link on each question that quotes a statistic.
