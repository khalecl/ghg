#!/usr/bin/env python3
"""Build data/questions.js from the Markdown question banks.

Reads, for each day N listed in DAYS:
  questions/dayN.ar.md   (required)  Arabic text + level, section, answer
  questions/dayN.en.md   (optional)  English text for the same IDs

Writes data/questions.js, which the quiz loads (works offline and on GitHub Pages).

Usage:  python3 tools/build_questions.py
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
QDIR = ROOT / "questions"
OUT = ROOT / "data" / "questions.js"

DAYS = {
    "1": {"ar": "لماذا نبني أخضر؟ وكيف نعرف أننا نجحنا؟", "en": "Why build green, and how do we know we succeeded?"},
    "2": {"ar": "الطاقة: الكفاءة أولًا ثم المتجددة", "en": "Energy: efficiency first, then renewables"},
    "3": {"ar": "المواد والمياه والقرار الاقتصادي", "en": "Materials, water and the economic decision"},
}

LEVELS = {"easy", "medium", "hard"}
LETTERS = ["A", "B", "C", "D"]
FIELD = re.compile(r"^- (\w+): (.*)$")


def parse(path):
    """Return {id: {field: value}} from a bank file."""
    text = path.read_text(encoding="utf-8")
    blocks = re.split(r"^### ", text, flags=re.M)[1:]
    out = {}
    for b in blocks:
        lines = b.strip().splitlines()
        qid = lines[0].strip()
        fields = {}
        for line in lines[1:]:
            m = FIELD.match(line.strip())
            if m:
                fields[m.group(1)] = m.group(2).strip()
        if qid in out:
            sys.exit(f"{path.name}: duplicate id {qid}")
        out[qid] = fields
    return out


def lang_block(f, qid, src):
    missing = [k for k in ["question", *LETTERS, "reason"] if not f.get(k)]
    if missing:
        sys.exit(f"{src}: {qid} is missing {', '.join(missing)}")
    return {"question": f["question"], "options": {k: f[k] for k in LETTERS}, "reason": f["reason"]}


def main():
    data = {"days": {}}
    for day, title in DAYS.items():
        ar_path = QDIR / f"day{day}.ar.md"
        en_path = QDIR / f"day{day}.en.md"
        if not ar_path.exists():
            continue
        ar = parse(ar_path)
        en = parse(en_path) if en_path.exists() else {}
        extra = set(en) - set(ar)
        if extra:
            sys.exit(f"{en_path.name}: ids not in Arabic file: {sorted(extra)[:5]}")
        questions = []
        for qid, f in ar.items():
            if f.get("level") not in LEVELS:
                sys.exit(f"{ar_path.name}: {qid} has bad level {f.get('level')!r}")
            if f.get("answer") not in LETTERS:
                sys.exit(f"{ar_path.name}: {qid} has bad answer {f.get('answer')!r}")
            q = {
                "id": qid,
                "level": f["level"],
                "section": f.get("section", ""),
                "answer": f["answer"],
                "ar": lang_block(f, qid, ar_path.name),
                "en": lang_block(en[qid], qid, en_path.name) if qid in en else None,
            }
            questions.append(q)
        data["days"][day] = {"title": title, "questions": questions}
        print(f"Day {day}: {len(questions)} questions, English for {sum(1 for q in questions if q['en'])}")
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text("window.QUIZ_DATA = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    print(f"Wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
