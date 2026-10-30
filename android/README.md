# Red Flag Run: Android MVP

**Vision:** cyber security awareness for everyone, regardless of age and where you are.

Red Flag Run is a case-file style learning game. Short daily lessons teach people to spot scams, from fake parcel texts to ransomware and nation-state cyber operations. Mascot: **Pip**, a little shield with a red flag.

---

## Build and run

1. Install **Android Studio** (Ladybug or newer) with Android SDK 36.
2. **File → Open** and choose this `RedFlagRun` folder.
3. Let Gradle sync. Android Studio downloads Gradle 8.11 and the Android plugin. Accept any upgrade suggestion it offers.
4. Plug in a phone with USB debugging on, or start an emulator, then press **Run ▶**.
5. To make an installable file for reviewers: **Build → Build App Bundle(s) / APK(s) → Build APK(s)**. The APK lands in `app/build/outputs/apk/debug/`. Share it, and reviewers install it by allowing "unknown sources".

No API keys or backend are needed. The game runs fully offline. Fonts load from Google Fonts when the phone is online, and the app falls back to system fonts otherwise.

## How it's built

| Part | What it is |
|---|---|
| `app/src/main/assets/index.html` | The whole game (HTML/CSS/JS, one file, no libraries) |
| `MainActivity.kt` | A native WebView shell. It serves the game from a secure local origin so progress persists, handles edge-to-edge insets and the back button, and opens outside links in the browser |
| `res/` | App name, theme and an adaptive launcher icon (Pip) |

Progress is saved on the device: XP, streak, shields, finished lessons and mistakes. Nothing is collected or sent anywhere.

To update the game content, edit `UNITS` in `index.html`. Every exercise is one line built with a small helper (`C`, `P`, `F`, `M`, `O`).

---

## What's in the MVP

**Learning loop (Duolingo-style)**
- Onboarding: choose an age group, country and daily goal
- Lesson path of units and lessons, which unlock in order with a START marker
- 5 shields. A wrong answer costs one. Practice refills them
- Daily streak, XP, daily-goal ring, perfect-lesson bonus
- Wrong answers come back at the end of the lesson and are saved for Practice
- A celebration screen showing XP, accuracy and streak
- Sound and haptic feedback (toggle in Profile)

**5 exercise types**
1. **Scam or legit?** A realistic message card
2. **Multiple choice**
3. **Spot the red flags.** Tap the suspicious parts of a message
4. **Match the pairs.** Terms and meanings
5. **Put in order.** Response steps

**Every age**

| Track | Path |
|---|---|
| Kids (8 to 12) | Basics, Game On, Texts & Calls, Feeds & AI |
| Teens (13 to 17) | Basics, Texts & Calls, Feeds & AI, Money, Work, Ransomware, Nation State |
| Adults (18 to 59) | Basics, Texts & Calls, Money, Work, Feeds & AI, Ransomware, Nation State |
| Seniors (60+) | Basics, Texts & Calls, Money, Feeds & AI. Large text is on by default |
| At work | Basics, Texts & Calls, At Work, Money, Feeds & AI, Ransomware. Team mode: no shields |

**Pilot-ready for SMEs and schools (v0.2)**
- An "At work" track with **team mode**: no shields, so staff can't get locked out of training
- A **completion certificate** with name and organisation, plus a preview with a watermark until the track is done
- A **source link** on every question that quotes a statistic or incident
- Country-neutral wording: Singapore figures are labelled as Singapore, and one Singapore-only question swaps for a neutral one in other countries
- A **Privacy & disclaimer** page (Profile). Replace the placeholder contact email before publishing

**Wherever you are**
- Country picker: Singapore, Malaysia, Philippines, India, Australia, UK, US, and "somewhere else"
- The **Report** tab shows that country's official scam hotline or site, its emergency number, and what to do if you've already paid
- Each lesson includes a country question, "Where do you report a scam?", built from the player's country

**Content**
- 8 units, 16 lessons, 80 exercises
- Built from public reports up to 29 Oct 2026, including Singapore Police and ScamShield, Sophos, KnowBe4 and US cyber agency advisories

---

## Review checklist

- [ ] First launch shows onboarding. Finishing it starts lesson 1 straight away
- [ ] Each of the 5 exercise types works and shows the right/wrong feedback panel
- [ ] A wrong answer costs a shield and the question comes back later in the lesson
- [ ] At 0 shields, the "out of shields" sheet offers Practice. Finishing Practice refills to 5
- [ ] Finishing a lesson unlocks the next node and updates XP, streak and daily goal
- [ ] Switching the age track in Profile changes the path
- [ ] Switching the country changes the Report tab and the country question
- [ ] Large text works for seniors. Dark mode follows the phone setting
- [ ] Android back button: closes dialogs, asks before quitting a lesson, returns to the Learn tab
- [ ] Source links open in the phone's browser
- [ ] "At work" track: no shields are shown or lost, and finishing the track offers the certificate
- [ ] Certificate shows a PREVIEW watermark until the track is complete, and updates as you type a name
- [ ] Privacy & disclaimer page opens from Profile and the back button returns
- [ ] Close and reopen the app: progress is still there

## Not in the MVP (suggested next)

1. **Live content feed.** A small backend pulls scam alerts (ScamShield, police, CISA, national CERTs) and turns them into a "daily drop" lesson
2. **Languages.** Start with Malay, Tagalog, Hindi, Tamil and Chinese. The content is already separated from the code, so this is mainly translation and review
3. **More countries and local examples,** such as local banks, delivery firms and payment apps
4. **Daily reminder notifications** to protect streaks
5. **Family mode.** A parent or grandchild links accounts and sees each other's streaks
6. **Leagues and friends.** Weekly XP leaderboards
7. **Accounts and cloud sync,** so progress moves between phones
8. **Accessibility pass:** screen-reader testing, colour-blind check and voice-over mode for seniors
9. **Content review by experts** in each country before public launch
10. **Play Store release:** signing key, privacy policy, store listing and a content rating (aim for "Everyone")
