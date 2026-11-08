/* Green Buildings Challenge — bilingual quiz (Arabic / English)
   Progress is saved per trainee (by email) in the browser, so a trainee can
   leave and continue later from the same question on the same device. */
(function () {
  "use strict";

  const CFG = window.QUIZ_CONFIG;
  const DATA = window.QUIZ_DATA;
  const LETTERS = ["A", "B", "C", "D"];
  const KEY_USERS = "gbquiz:v1:users";
  const KEY_CURRENT = "gbquiz:v1:current";
  const KEY_LANG = "gbquiz:v1:lang";

  // ---------- UI text ----------
  const T = {
    ar: {
      appTitle: "تحدي المباني الخضراء",
      welcome: "أهلًا بك في تحدي المباني الخضراء",
      welcomeSub: "أدخل بياناتك لتبدأ. إذا سبق أن بدأت، أدخل البريد نفسه لتكمل من حيث توقفت.",
      fName: "الاسم الكامل", fEmail: "البريد الإلكتروني", fPhone: "رقم الجوال (اختياري)",
      fOrg: "جهة العمل (اختياري)", fSpec: "التخصص",
      specArch: "معماري", specMech: "ميكانيكي", specElec: "كهربائي", specCivil: "مدني / إنشائي",
      specEnv: "بيئي", specOther: "أخرى",
      resumeHint: "يُحفظ تقدمك على هذا الجهاز. استخدم البريد نفسه للمتابعة.",
      start: "ابدأ", chooseDay: "اختر اليوم", switchUser: "تبديل المتدرب",
      howTitle: "كيف تُحسب النقاط؟",
      rules: [
        "لكل سؤال {s} ثانية. أربعة خيارات وإجابة واحدة صحيحة.",
        "الأسئلة تتدرج: سهل ثم متوسط ثم ذكي. السؤال المتوسط ×1.5 والذكي ×2.",
        "كلما أجبت أسرع حصلت على نقاط سرعة إضافية.",
        "الإجابة الصحيحة خلال {c} ثانية تبني سلسلة (كومبو) ترفع مضاعف النقاط حتى ×{m}.",
        "الإجابة الخاطئة أو البطيئة تكسر السلسلة.",
        "بعد كل سؤال يظهر السبب، فاقرأه قبل الانتقال."
      ],
      score: "النقاط", combo: "المضاعف", question: "السؤال", level: "المستوى",
      easy: "سهل", medium: "متوسط", hard: "ذكي",
      correct: "إجابة صحيحة", wrong: "إجابة خاطئة", timeout: "انتهى الوقت",
      correctWas: "الإجابة الصحيحة: ", points: "نقطة", speed: "سرعة", mult: "مضاعف",
      next: "التالي", finishBtn: "عرض النتيجة", seeOtherLang: "English", saveExit: "حفظ والخروج إلى الأيام",
      finished: "أحسنت! أنهيت اليوم", reviewWrong: "مراجعة الأخطاء", restartDay: "إعادة اليوم من البداية",
      otherDays: "الأيام الأخرى", day: "اليوم", questions: "سؤال", notStarted: "لم يبدأ",
      inProgress: "متابعة من السؤال {n}", done: "مكتمل — {p} نقطة", defaultTag: "الافتراضي",
      statCorrect: "صحيحة", statAccuracy: "الدقة", statBestCombo: "أطول سلسلة", statAvgTime: "متوسط الزمن",
      sec: "ث", confirmRestart: "سيُحذف تقدمك في هذا اليوم. هل تريد البدء من جديد؟",
      yourAnswer: "إجابتك: ", noAnswer: "لم تُجب", noWrong: "لا توجد أخطاء. ممتاز!",
      badges: ["مبتدئ أخضر", "مهندس واعٍ", "خبير استدامة", "بطل المباني الخضراء"],
      comboWord: "كومبو"
    },
    en: {
      appTitle: "Green Buildings Challenge",
      welcome: "Welcome to the Green Buildings Challenge",
      welcomeSub: "Enter your details to start. If you started before, use the same email to continue where you stopped.",
      fName: "Full name", fEmail: "Email", fPhone: "Mobile (optional)",
      fOrg: "Organization (optional)", fSpec: "Discipline",
      specArch: "Architectural", specMech: "Mechanical", specElec: "Electrical", specCivil: "Civil / Structural",
      specEnv: "Environmental", specOther: "Other",
      resumeHint: "Your progress is saved on this device. Use the same email to continue.",
      start: "Start", chooseDay: "Choose a day", switchUser: "Switch trainee",
      howTitle: "How scoring works",
      rules: [
        "Each question has {s} seconds. Four options, one correct answer.",
        "Questions get harder: easy, then medium, then smart. Medium counts x1.5, smart x2.",
        "The faster you answer, the more speed bonus you earn.",
        "A correct answer within {c} seconds builds a combo that raises your multiplier up to x{m}.",
        "A wrong or slow answer breaks the combo.",
        "After each question the reason is shown. Read it before moving on."
      ],
      score: "Score", combo: "Multiplier", question: "Question", level: "Level",
      easy: "Easy", medium: "Medium", hard: "Smart",
      correct: "Correct", wrong: "Wrong", timeout: "Time's up",
      correctWas: "Correct answer: ", points: "points", speed: "speed", mult: "multiplier",
      next: "Next", finishBtn: "See result", seeOtherLang: "عربي", saveExit: "Save and exit to days",
      finished: "Well done! Day completed", reviewWrong: "Review mistakes", restartDay: "Restart this day",
      otherDays: "Other days", day: "Day", questions: "questions", notStarted: "Not started",
      inProgress: "Continue from question {n}", done: "Completed — {p} points", defaultTag: "Default",
      statCorrect: "Correct", statAccuracy: "Accuracy", statBestCombo: "Best combo", statAvgTime: "Avg. time",
      sec: "s", confirmRestart: "Your progress for this day will be erased. Start again?",
      yourAnswer: "Your answer: ", noAnswer: "No answer", noWrong: "No mistakes. Excellent!",
      badges: ["Green Starter", "Aware Engineer", "Sustainability Expert", "Green Building Champion"],
      comboWord: "COMBO"
    }
  };

  // ---------- storage ----------
  function load(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage blocked: progress lives in memory only */ }
  }

  let users = load(KEY_USERS, {});
  let currentId = load(KEY_CURRENT, null);
  let lang = load(KEY_LANG, "ar");
  let activeDay = null;
  let timerHandle = null;
  let qStart = 0;
  let answered = false;
  let feedbackLang = null;

  const $ = (id) => document.getElementById(id);
  const t = (k) => T[lang][k];
  const fmt = (s, map) => s.replace(/\{(\w)\}/g, (_, k) => map[k]);

  function user() { return currentId ? users[currentId] : null; }
  function persist() { save(KEY_USERS, users); save(KEY_CURRENT, currentId); }

  function dayState(day) {
    const u = user();
    if (!u.days[day]) u.days[day] = { index: 0, score: 0, streak: 0, bestStreak: 0, answers: [], finished: false };
    return u.days[day];
  }

  // ---------- language ----------
  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t(el.getAttribute("data-i18n"));
      if (typeof v === "string") el.textContent = v;
    });
    $("langBtn").textContent = lang === "ar" ? "English" : "عربي";
    document.title = t("appTitle");
    const u = user();
    $("who").textContent = u ? u.profile.name : "";
    $("logoutBtn").classList.toggle("hidden", !u);
    renderRules();
    if (!$("screen-days").classList.contains("hidden")) renderDays();
    if (!$("screen-quiz").classList.contains("hidden")) renderQuestion(true);
    if (!$("screen-result").classList.contains("hidden")) renderResult();
  }

  function qText(q, l) { return (q[l] && q[l].question) ? q[l] : q.ar; }

  // ---------- screens ----------
  function show(id) {
    ["screen-login", "screen-days", "screen-quiz", "screen-result"].forEach((s) => $(s).classList.toggle("hidden", s !== id));
    window.scrollTo(0, 0);
  }

  function renderRules() {
    const list = $("rulesList");
    list.innerHTML = "";
    t("rules").forEach((r) => {
      const li = document.createElement("li");
      li.textContent = fmt(r, { s: CFG.secondsPerQuestion, c: CFG.comboWindowSeconds, m: CFG.comboMax });
      list.appendChild(li);
    });
  }

  function renderDays() {
    const box = $("dayCards");
    box.innerHTML = "";
    Object.keys(DATA.days).sort().forEach((d) => {
      const day = DATA.days[d];
      const st = user().days[d];
      const total = day.questions.length;
      const card = document.createElement("div");
      card.className = "day-card" + (Number(d) === CFG.defaultDay ? " default" : "");
      let status = t("notStarted");
      let pct = 0;
      if (st && st.finished) { status = fmt(t("done"), { p: st.score }); pct = 100; }
      else if (st && st.index > 0) { status = fmt(t("inProgress"), { n: st.index + 1 }); pct = Math.round(st.index / total * 100); }
      card.innerHTML =
        '<span class="day-tag"></span><h3></h3><div class="muted"></div>' +
        '<div class="day-meta"></div><div class="mini-bar"><div></div></div>';
      card.querySelector(".day-tag").textContent = t("day") + " " + d + (Number(d) === CFG.defaultDay ? " · " + t("defaultTag") : "");
      card.querySelector("h3").textContent = day.title[lang] || day.title.ar;
      card.querySelector(".muted").textContent = total + " " + t("questions");
      card.querySelector(".day-meta").textContent = status;
      card.querySelector(".mini-bar > div").style.width = pct + "%";
      card.addEventListener("click", () => openDay(d));
      box.appendChild(card);
    });
  }

  function openDay(d) {
    activeDay = d;
    const st = dayState(d);
    // a question answered just before leaving is not shown again
    if (st.answers.length > st.index) st.index = st.answers.length;
    persist();
    if (st.finished) { show("screen-result"); renderResult(); return; }
    show("screen-quiz");
    renderQuestion(false);
  }

  // ---------- quiz ----------
  function currentQuestion() { return DATA.days[activeDay].questions[dayState(activeDay).index]; }

  function multiplier(streak) {
    return Math.min(CFG.comboMax, 1 + CFG.comboStep * Math.max(0, streak - 1));
  }

  function renderHud() {
    const st = dayState(activeDay);
    const total = DATA.days[activeDay].questions.length;
    $("hudScore").textContent = st.score;
    $("hudCombo").textContent = "x" + (+multiplier(st.streak).toFixed(2));
    $("hudCount").textContent = Math.min(st.index + 1, total) + " / " + total;
    const q = currentQuestion();
    $("hudLevel").textContent = q ? t(q.level) : "";
    $("progressBar").style.width = (st.index / total * 100) + "%";
  }

  // rerender=true redraws text after a language switch without restarting the timer
  function renderQuestion(rerender) {
    const q = currentQuestion();
    if (!q) return finishDay();
    renderHud();
    const L = qText(q, lang);
    $("qText").textContent = L.question;
    const opts = $("options");
    opts.innerHTML = "";
    LETTERS.forEach((letter, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt";
      b.dataset.letter = letter;
      b.innerHTML = '<span class="key"></span><span class="txt"></span>';
      b.querySelector(".key").textContent = lang === "ar" ? "أبجد"[i] : letter;
      b.querySelector(".txt").textContent = L.options[letter];
      b.addEventListener("click", () => choose(letter));
      opts.appendChild(b);
    });
    if (rerender && answered) {
      markOptions(dayState(activeDay).answers.slice(-1)[0]);
      renderFeedback(dayState(activeDay).answers.slice(-1)[0]);
      return;
    }
    if (rerender) return;
    answered = false;
    feedbackLang = null;
    $("feedback").classList.add("hidden");
    startTimer();
  }

  function startTimer() {
    clearInterval(timerHandle);
    qStart = Date.now();
    const total = CFG.secondsPerQuestion * 1000;
    const tick = () => {
      const left = Math.max(0, total - (Date.now() - qStart));
      $("timerBar").style.width = (left / total * 100) + "%";
      $("timerBar").classList.toggle("low", left < 6000);
      $("timerText").textContent = Math.ceil(left / 1000) + t("sec");
      if (left <= 0) { clearInterval(timerHandle); choose(null); }
    };
    tick();
    timerHandle = setInterval(tick, 200);
  }

  function choose(letter) {
    if (answered) return;
    answered = true;
    clearInterval(timerHandle);
    const q = currentQuestion();
    const st = dayState(activeDay);
    const ms = Math.min(Date.now() - qStart, CFG.secondsPerQuestion * 1000);
    const isCorrect = letter === q.answer;
    let points = 0, speed = 0, mult = 1;
    if (isCorrect) {
      const fast = ms <= CFG.comboWindowSeconds * 1000;
      st.streak = fast ? st.streak + 1 : 0;
      st.bestStreak = Math.max(st.bestStreak, st.streak);
      const remaining = 1 - ms / (CFG.secondsPerQuestion * 1000);
      speed = Math.round(CFG.maxSpeedBonus * remaining);
      mult = multiplier(st.streak);
      const base = CFG.basePoints * (CFG.levelWeight[q.level] || 1);
      points = Math.round((base + speed) * mult);
      st.score += points;
      if (st.streak >= 2) comboPop(st.streak, mult);
    } else {
      st.streak = 0;
    }
    const rec = { id: q.id, chosen: letter, correct: isCorrect, ms, points, speed, mult };
    st.answers.push(rec);
    persist();
    renderHud();
    markOptions(rec);
    renderFeedback(rec);
  }

  function markOptions(rec) {
    const q = currentQuestion();
    document.querySelectorAll(".opt").forEach((b) => {
      b.disabled = true;
      if (b.dataset.letter === q.answer) b.classList.add("correct");
      else if (b.dataset.letter === rec.chosen) b.classList.add("wrong");
    });
  }

  function renderFeedback(rec) {
    const q = currentQuestion();
    const fl = feedbackLang || lang;
    const L = qText(q, fl);
    const title = $("fbTitle");
    title.className = "fb-title " + (rec.correct ? "good" : "bad");
    title.textContent = rec.correct ? t("correct") : (rec.chosen ? t("wrong") : t("timeout"));
    $("fbPoints").textContent = rec.correct
      ? "+" + rec.points + " " + t("points") + "  (" + t("speed") + " +" + rec.speed + ", " + t("mult") + " x" + rec.mult + ")"
      : t("correctWas") + (lang === "ar" ? "أبجد"[LETTERS.indexOf(q.answer)] : q.answer);
    const reasonBox = $("fbReason");
    reasonBox.textContent = L.reason;
    reasonBox.dir = fl === "ar" ? "rtl" : "ltr";
    const hasOther = q.en && q.en.reason;
    $("otherLangBtn").classList.toggle("hidden", !hasOther);
    $("otherLangBtn").textContent = fl === "ar" ? "English" : "عربي";
    const st = dayState(activeDay);
    $("nextBtn").textContent = st.index + 1 >= DATA.days[activeDay].questions.length ? t("finishBtn") : t("next");
    $("feedback").classList.remove("hidden");
    $("nextBtn").focus();
  }

  function nextQuestion() {
    const st = dayState(activeDay);
    st.index += 1;
    persist();
    if (st.index >= DATA.days[activeDay].questions.length) return finishDay();
    renderQuestion(false);
  }

  function comboPop(streak, mult) {
    const el = $("comboPop");
    el.innerHTML = "<div></div><div class='combo-mult'></div>";
    el.firstChild.textContent = t("comboWord") + " " + streak;
    el.lastChild.textContent = "×" + mult;
    el.classList.remove("hidden");
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
    clearTimeout(comboPop._h);
    comboPop._h = setTimeout(() => el.classList.add("hidden"), 1000);
  }

  // ---------- results ----------
  function finishDay() {
    clearInterval(timerHandle);
    const st = dayState(activeDay);
    const firstFinish = !st.finished;
    st.finished = true;
    st.finishedAt = new Date().toISOString();
    persist();
    show("screen-result");
    renderResult();
    if (firstFinish) { confetti(); sendResult(); }
  }

  function renderResult() {
    const st = dayState(activeDay);
    const n = st.answers.length || 1;
    const correct = st.answers.filter((a) => a.correct).length;
    const acc = Math.round(correct / n * 100);
    const avg = (st.answers.reduce((s, a) => s + a.ms, 0) / n / 1000).toFixed(1);
    $("finalScore").textContent = st.score;
    const badges = t("badges");
    $("finalBadge").textContent = badges[acc >= 90 ? 3 : acc >= 75 ? 2 : acc >= 50 ? 1 : 0];
    const stats = [
      [t("statCorrect"), correct + " / " + st.answers.length],
      [t("statAccuracy"), acc + "%"],
      [t("statBestCombo"), st.bestStreak],
      [t("statAvgTime"), avg + " " + t("sec")]
    ];
    const box = $("finalStats");
    box.innerHTML = "";
    stats.forEach(([k, v]) => {
      const d = document.createElement("div");
      d.className = "stat";
      d.innerHTML = '<span class="muted"></span><strong></strong>';
      d.querySelector("span").textContent = k;
      d.querySelector("strong").textContent = v;
      box.appendChild(d);
    });
    $("reviewList").classList.add("hidden");
  }

  function renderReview() {
    const st = dayState(activeDay);
    const byId = {};
    DATA.days[activeDay].questions.forEach((q) => { byId[q.id] = q; });
    const list = $("reviewList");
    list.innerHTML = "";
    const wrong = st.answers.filter((a) => !a.correct);
    if (!wrong.length) {
      const p = document.createElement("div");
      p.className = "review-item";
      p.textContent = t("noWrong");
      list.appendChild(p);
    }
    wrong.forEach((a) => {
      const q = byId[a.id];
      const L = qText(q, lang);
      const item = document.createElement("div");
      item.className = "review-item";
      item.innerHTML = "<strong></strong><p class='yours'></p><p class='ans'></p><p class='muted'></p>";
      item.querySelector("strong").textContent = L.question;
      item.querySelector(".yours").textContent = t("yourAnswer") + (a.chosen ? L.options[a.chosen] : t("noAnswer"));
      item.querySelector(".ans").textContent = t("correctWas") + L.options[q.answer];
      item.querySelector(".muted").textContent = L.reason;
      list.appendChild(item);
    });
    list.classList.toggle("hidden");
  }

  // ---------- optional Firebase (Firestore REST) ----------
  function sendResult() {
    const fb = CFG.firebase || {};
    if (!fb.apiKey || !fb.projectId) return;
    const u = user();
    const st = dayState(activeDay);
    const correct = st.answers.filter((a) => a.correct).length;
    const str = (v) => ({ stringValue: String(v == null ? "" : v) });
    const int = (v) => ({ integerValue: String(Math.round(v)) });
    const body = {
      fields: {
        name: str(u.profile.name), email: str(u.profile.email), phone: str(u.profile.phone),
        org: str(u.profile.org), spec: str(u.profile.spec), day: int(Number(activeDay)),
        score: int(st.score), correct: int(correct), total: int(st.answers.length),
        bestCombo: int(st.bestStreak), finishedAt: { timestampValue: st.finishedAt }
      }
    };
    const url = "https://firestore.googleapis.com/v1/projects/" + encodeURIComponent(fb.projectId) +
      "/databases/(default)/documents/" + encodeURIComponent(fb.collection) + "?key=" + encodeURIComponent(fb.apiKey);
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .catch(() => { /* offline: the result stays saved on the device */ });
  }

  function confetti() {
    const box = $("confetti");
    const colors = ["#2fbf7f", "#f5b62a", "#1f8a5b", "#ffffff", "#7fd6ff"];
    for (let i = 0; i < 90; i++) {
      const p = document.createElement("div");
      p.className = "confetti-piece";
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = 2 + Math.random() * 2.5 + "s";
      p.style.animationDelay = Math.random() * 0.6 + "s";
      box.appendChild(p);
      setTimeout(() => p.remove(), 5500);
    }
  }

  // ---------- events ----------
  $("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const email = String(f.get("email")).trim().toLowerCase();
    const profile = {
      name: String(f.get("name")).trim(), email,
      phone: String(f.get("phone") || "").trim(), org: String(f.get("org") || "").trim(),
      spec: String(f.get("spec") || "")
    };
    if (!users[email]) users[email] = { profile, days: {}, createdAt: new Date().toISOString() };
    else users[email].profile = Object.assign(users[email].profile, profile);
    currentId = email;
    persist();
    applyLang();
    show("screen-days");
    renderDays();
  });

  $("langBtn").addEventListener("click", () => {
    lang = lang === "ar" ? "en" : "ar";
    save(KEY_LANG, lang);
    feedbackLang = null;
    applyLang();
  });

  $("logoutBtn").addEventListener("click", () => {
    clearInterval(timerHandle);
    currentId = null;
    persist();
    $("loginForm").reset();
    applyLang();
    show("screen-login");
  });

  $("nextBtn").addEventListener("click", nextQuestion);
  $("otherLangBtn").addEventListener("click", () => {
    feedbackLang = (feedbackLang || lang) === "ar" ? "en" : "ar";
    renderFeedback(dayState(activeDay).answers.slice(-1)[0]);
  });
  $("backDaysBtn").addEventListener("click", () => {
    clearInterval(timerHandle);
    // an unanswered question restarts with a fresh timer when the trainee returns
    answered = false;
    show("screen-days");
    renderDays();
  });
  $("toDaysBtn").addEventListener("click", () => { show("screen-days"); renderDays(); });
  $("reviewBtn").addEventListener("click", renderReview);
  $("restartBtn").addEventListener("click", () => {
    if (!confirm(t("confirmRestart"))) return;
    delete user().days[activeDay];
    persist();
    openDay(activeDay);
  });

  document.addEventListener("keydown", (e) => {
    if ($("screen-quiz").classList.contains("hidden")) return;
    const k = e.key.toUpperCase();
    const map = { "1": "A", "2": "B", "3": "C", "4": "D", A: "A", B: "B", C: "C", D: "D" };
    if (!answered && map[k]) choose(map[k]);
    else if (answered && e.key === "Enter" && e.target.tagName !== "BUTTON") nextQuestion();
  });

  // ---------- boot ----------
  applyLang();
  if (user()) {
    // returning trainee: open the default day directly if untouched, otherwise show the day list
    show("screen-days");
    renderDays();
  } else {
    show("screen-login");
  }
})();
