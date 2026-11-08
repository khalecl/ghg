# Green Buildings Challenge | تحدي المباني الخضراء

A bilingual (Arabic / English) quiz for the 3-day course **Green Buildings: Renewable Energy and Sustainability** (Saudi Council of Engineers). 300 questions: 100 per day, each day ordered 30 easy → 30 medium → 40 smart.

## What trainees get

- **Registration:** name, email, mobile, organization, discipline.
- **Resume:** progress is saved in the browser by email. Entering the same email on the same device continues from the next question.
- **Days:** Day 1 is the default (highlighted). Trainees can pick Day 2 or Day 3 at any time.
- **Arabic / English:** one button switches the whole app, including the questions. After each answer, the reason can also be read in the other language.
- **Scoring:**
  - 30 seconds per question.
  - Base points × level weight (easy ×1, medium ×1.5, smart ×2).
  - Speed bonus up to +100, based on time left.
  - **Combo:** each correct answer within 12 seconds raises the multiplier by 0.25 (up to ×3). A wrong, slow or timed-out answer breaks it.
- **Feedback:** correct answer and reason after every question; review of mistakes at the end; badge and stats.
- Keyboard: 1–4 or A–D to answer, Enter for next.

All numbers are in `config.js`.

## Run it

Open `index.html` in a browser. No server or build step is needed to play.

To publish: enable **GitHub Pages** (Settings → Pages → Deploy from branch → `main` / root). The quiz will be at `https://<user>.github.io/<repo>/`.

## Question format (to add or edit questions)

Questions live in `questions/` as Markdown, one file per day and language:

```
questions/day1.ar.md   Arabic text + level, section, answer   (required)
questions/day1.en.md   English text for the same IDs           (optional)
```

Arabic file, one block per question:

```
### D1-Q001
- level: easy            # easy | medium | hard
- section: 1.1
- question: نص السؤال
- A: الخيار أ
- B: الخيار ب
- C: الخيار ج
- D: الخيار د
- answer: B              # A | B | C | D
- reason: سبب الإجابة الصحيحة
```

English file, same ID, text fields only (level, section and answer are taken from the Arabic file):

```
### D1-Q001
- question: Question text
- A: Option A
- B: Option B
- C: Option C
- D: Option D
- reason: Why the answer is correct
```

Rules:
- One field per line, starting with `- name: `.
- IDs must match between the two languages. A question without English shows in Arabic in both modes.
- Option order must be the same in both languages, since the answer letter is shared.

After editing, rebuild the data file the app reads:

```
python3 tools/build_questions.py
```

This checks every question (missing fields, bad level or answer letter, duplicate or unmatched IDs) and writes `data/questions.js`. Commit both the `.md` files and `data/questions.js`.

To add a Day 4, add `questions/day4.ar.md` and a title for day 4 in `DAYS` inside `tools/build_questions.py`.

## Collecting results (optional)

By default nothing leaves the trainee's device. To collect finished results in Firebase Firestore, fill `firebase.apiKey` and `firebase.projectId` in `config.js`. Each finished day is posted to the `gb_quiz_results` collection with name, email, phone, organization, discipline, day, score, correct count and best combo. Your Firestore rules must allow create on that collection.

## Files

| Path | Purpose |
|---|---|
| `index.html`, `styles.css`, `app.js` | The quiz app |
| `config.js` | Timing, scoring, default day, optional Firebase |
| `questions/*.md` | Question banks (source of truth) |
| `tools/build_questions.py` | Converts the banks into `data/questions.js` |
| `data/questions.js` | Generated data loaded by the app |
