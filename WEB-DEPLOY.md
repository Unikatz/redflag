# Red Flag Run: website for Vercel

This folder is a ready-to-deploy static site. There's no build step and no server code.

| File | What it is |
|---|---|
| `index.html` | The game |
| `privacy.html` | Public privacy policy, served at `/privacy`. Use this link in Google Play Console |
| `manifest.webmanifest`, `sw.js`, `icons/` | Make it installable: Android users can tap "Add to Home screen" and play offline |
| `vercel.json` | Clean URLs (`/privacy`), security headers and caching |

## Before you deploy

1. In `index.html` and `privacy.html`, search for `hello@[your-domain]` and replace it with a real contact email.
2. When you deploy new content later, change `VERSION` at the top of `sw.js`, for example `rfr-v0.3.1`, so returning players get the update.

## Option A: GitHub + Vercel (no command line)

1. Create a free account at **github.com**, then click **New repository**. Name it `red-flag-run` and make it **Public** or **Private**.
2. In the new repo, click **Add file → Upload files**. Drag in **everything inside this folder**, including the `icons` folder. `index.html` must be at the top level, not inside a sub-folder. Then click **Commit changes**.
3. Go to **vercel.com** and sign up with GitHub. Click **Add New… → Project**, then **Import** your `red-flag-run` repo.
4. Leave the settings as they are: Framework Preset **Other**, no build command, root directory `./`. Click **Deploy**.
5. In about a minute you'll get a link like `red-flag-run.vercel.app`. Each time you upload changed files to GitHub, Vercel redeploys automatically.

## Option B: Vercel command line

```bash
npm install -g vercel
cd red-flag-run-web        # this folder
vercel                     # first time: log in and accept the defaults
vercel --prod              # publish to your live link
```

## After it's live

- **Custom domain (optional).** Go to Vercel → Project → **Settings → Domains** and add, for example, `redflagrun.app`. Buy the domain anywhere, and Vercel shows the DNS records to add.
- **Check the install prompt.** Open the link in Chrome on Android, then tap **⋮ → Add to Home screen** (or **Install app**).
- **Google Play.** Paste `https://<your-link>/privacy` into Play Console under **App content → Privacy policy**.
- **Test with pilots.** Share the link with your 12+ testers now. They can give feedback during the Play Store's 14-day closed test.
