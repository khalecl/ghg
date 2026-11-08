# Green Buildings Challenge | تحدي المباني الخضراء

A bilingual (Arabic / English) quiz for the 3-day course **Green Buildings: Renewable Energy and Sustainability** (Saudi Council of Engineers). 300 questions: 100 per day, each day ordered 30 easy → 30 medium → 40 smart.

## What trainees get

- **Registration:** name, email, nationality, city, engineering discipline (Saudi list), mobile and organization (optional). Lists are in `lists.js`.
- **Resume:** progress is saved on the device and in Firebase. The same email continues from the next question, even on another device.
- **Days:** Day 1 is selected by default; Day 2 and Day 3 are one tap away.
- **Arabic / English:** one button switches everything, including questions. The reason after each answer can be read in the other language.
- **Scoring:** 30 s per question; base points × level weight (easy ×1, medium ×1.5, smart ×2) + speed bonus. Correct answers within 12 s build a combo (×0.25 each, up to ×3). Wrong, slow or timed-out answers break it.
- **Live leaderboard:** always visible under the question, one tab per day, top 10 with medals, the trainee's own row highlighted, and "your rank #N of M".
- **Fun bits:** pixel engineer, coins, combo pop-ups, confetti. Sounds only for correct and wrong answers.
- Keyboard: 1–4 or A–D to answer.

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

## Analytics page (for trainees)

`analytics.html` (e.g. `https://khalecl.github.io/ghg/analytics.html`, also the 📊 button in the quiz) shows each day separately, live from Firebase:

- KPIs: players, finishers, average accuracy, answers, average time, top score
- **Your performance** (when opened on the trainee's own device): rank, score, accuracy vs the group, per-section bars and the sections to review first
- Key insights written from the data (weakest section, biggest trap, speed vs accuracy, where people dropped off)
- Leaderboard, progress funnel, score distribution, accuracy by level and by answer time
- **Manual section mastery**: % correct per section of the trainee manual; tap a section to see its questions
- **Questions that caught most of us**: each with the share that picked every option, the correct answer and the reason
- Searchable list of all questions, filter by section and level
- Who's playing: discipline, city, nationality

No emails or phone numbers are shown. Section titles are in `sections.js`.

## Results for analysis

Open `results.html` (same site, e.g. `https://khalecl.github.io/ghg/results.html`). It shows counts by day, discipline, city and nationality, the hardest questions, and three CSV downloads:

- `gb_quiz_trainees.csv`: one row per trainee per day (score, accuracy, nationality, city, discipline…)
- `gb_quiz_answers.csv`: every single answer
- `gb_quiz_question_analysis.csv`: % correct, average time and option picks per question

The CSVs open directly in Excel with Arabic intact.

## Leaderboard and database

The quiz uses the same Firebase Realtime Database as the Env activities (`test-7f3ce`), under its own folder `gbquiz/`:

| Path | Content |
|---|---|
| `gbquiz/day{N}/board/{id}` | Leaderboard row: name, organization, discipline, score, answered, correct, best combo, finished |
| `gbquiz/progress/{id}/day{N}` | Where the trainee stopped (for resume on another device) |
| `gbquiz/trainees/{id}` | Name, nationality, city, discipline, organization, last seen |
| `gbquiz/answers/day{N}/{id}/{questionId}` | Each answer: option chosen, correct (1/0), time in ms, level |

`{id}` is a code made from the email, so emails do not appear in the database. Email and mobile stay on the trainee's device unless `sendContactDetails` is set to `true` in `config.js`.

The database rules must allow read and write on `gbquiz`. If they don't, the leaderboard shows "Offline (check database rules)". Example rule to add next to the existing ones:

```json
"gbquiz": { ".read": true, ".write": true }
```

To clear the board between groups, delete the `gbquiz` node in the Firebase console.

## Files

| Path | Purpose |
|---|---|
| `index.html`, `styles.css`, `app.js` | The quiz app |
| `config.js` | Timing, scoring, default day, optional Firebase |
| `questions/*.md` | Question banks (source of truth) |
| `tools/build_questions.py` | Converts the banks into `data/questions.js` |
| `data/questions.js` | Generated data loaded by the app |
