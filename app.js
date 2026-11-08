/* Green Buildings Challenge — bilingual quiz with live leaderboard.
   Progress is saved on the device and in Firebase, so a trainee can continue
   from where they stopped, even on another device (same email). */
(function () {
  "use strict";

  const CFG = window.QUIZ_CONFIG;
  const DATA = window.QUIZ_DATA;
  const LETTERS = ["A", "B", "C", "D"];
  const AR_KEYS = ["أ", "ب", "ج", "د"];
  const KEY = { users: "gbq2:users", current: "gbq2:current", lang: "gbq2:lang", sound: "gbq2:sound" };

  // ---------------- text ----------------
  const T = {
    ar: {
      title: "تحدي المباني الخضراء", sub: "أجب بسرعة وبدقة، واجمع العملات، وتصدّر القائمة!",
      name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الجوال (اختياري)", org: "جهة العمل (اختياري)",
      spec: "التخصص الهندسي", nat: "الجنسية", city: "المدينة",
      go: "هيا بنا!", hint: "استخدم البريد نفسه لتكمل من حيث توقفت.",
      hello: "أهلًا", pickDay: "اختر اليوم", day: "اليوم", start: "ابدأ", resume: "أكمل من السؤال", replay: "عرض النتيجة",
      notStarted: "لم يبدأ", done: "مكتمل", rules: "30 ثانية لكل سؤال • الأسرع يربح أكثر • 3 إجابات سريعة صحيحة = كومبو",
      q: "سؤال", easy: "سهل", medium: "متوسط", hard: "ذكي",
      right: ["ممتاز!", "إجابة صحيحة!", "رائع!", "أحسنت!"], wrong: "إجابة خاطئة", timeout: "انتهى الوقت!",
      correctIs: "الصحيح: ", next: "التالي ←", finish: "النتيجة 🏁", seeAlt: "اقرأ السبب بالإنجليزية",
      combo: "كومبو", home: "الأيام", resultTitle: "انتهى اليوم!", correct: "صحيحة", accuracy: "الدقة",
      bestCombo: "أطول كومبو", avg: "متوسط الزمن", sec: "ث", review: "مراجعة أخطائي", again: "إعادة اليوم",
      confirmAgain: "سيُحذف تقدمك في هذا اليوم ونقاطه. متأكد؟", noMistakes: "لا أخطاء، ممتاز!", you: "أنت",
      yours: "إجابتك: ", none: "لم تُجب",
      board: "قائمة المتصدرين", live: "مباشر", offline: "غير متصل", connecting: "جارٍ الاتصال…", denied: "غير متصل (تحقق من صلاحيات قاعدة البيانات)",
      empty: "لا يوجد متسابقون بعد. كن الأول!", myRank: "ترتيبك {r} من {n}", answered: "سؤال", pts: "نقطة",
      badges: ["🌱 مبتدئ أخضر", "🌿 مهندس واعٍ", "🌳 خبير استدامة", "🏆 بطل المباني الخضراء"],
      logout: "تبديل المتدرب", langBtn: "English"
    },
    en: {
      title: "Green Buildings Challenge", sub: "Answer fast and right, collect coins, and top the board!",
      name: "Full name", email: "Email", phone: "Mobile (optional)", org: "Organization (optional)",
      spec: "Engineering discipline", nat: "Nationality", city: "City",
      go: "Let's go!", hint: "Use the same email to continue where you stopped.",
      hello: "Hi", pickDay: "Pick a day", day: "Day", start: "Start", resume: "Continue from question", replay: "See result",
      notStarted: "Not started", done: "Done", rules: "30 s per question • faster = more points • 3 quick correct answers = combo",
      q: "Question", easy: "Easy", medium: "Medium", hard: "Smart",
      right: ["Excellent!", "Correct!", "Great!", "Well done!"], wrong: "Wrong answer", timeout: "Time's up!",
      correctIs: "Correct: ", next: "Next →", finish: "Result 🏁", seeAlt: "Read the reason in Arabic",
      combo: "COMBO", home: "Days", resultTitle: "Day complete!", correct: "Correct", accuracy: "Accuracy",
      bestCombo: "Best combo", avg: "Avg. time", sec: "s", review: "Review my mistakes", again: "Replay day",
      confirmAgain: "Your progress and points for this day will be erased. Sure?", noMistakes: "No mistakes. Excellent!", you: "you",
      yours: "Your answer: ", none: "No answer",
      board: "Leaderboard", live: "Live", offline: "Offline", connecting: "Connecting…", denied: "Offline (check database rules)",
      empty: "No players yet. Be the first!", myRank: "Your rank {r} of {n}", answered: "answered", pts: "pts",
      badges: ["🌱 Green Starter", "🌿 Aware Engineer", "🌳 Sustainability Expert", "🏆 Green Building Champion"],
      logout: "Switch trainee", langBtn: "عربي"
    }
  };

  // ---------------- state ----------------
  const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } };

  let users = load(KEY.users, {});
  let uid = load(KEY.current, null);
  let lang = load(KEY.lang, "ar");
  let soundOn = load(KEY.sound, CFG.soundOn);
  let selectedDay = String(CFG.defaultDay);
  let boardDay = selectedDay;
  let screen = "login";
  let timer = null, qStart = 0, answered = false, altReason = false, reviewOpen = false;

  const $ = (id) => document.getElementById(id);
  const t = (k) => T[lang][k];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const me = () => (uid ? users[uid] : null);
  const persist = () => { save(KEY.users, users); save(KEY.current, uid); };
  const days = () => Object.keys(DATA.days).sort();
  const qs = (d) => DATA.days[d].questions;

  // short stable id from email, so emails never appear in database keys
  function hashId(s) {
    let h1 = 0x811c9dc5, h2 = 0x1b873593;
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 16777619);
      h2 = Math.imul(h2 ^ c, 2246822507);
    }
    return "u" + (h1 >>> 0).toString(36) + (h2 >>> 0).toString(36);
  }

  function dayState(d) {
    const u = me();
    if (!u.days[d]) u.days[d] = { index: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, answers: [], finished: false };
    return u.days[d];
  }

  // ---------------- sound (Web Audio, no files) ----------------
  let ctx = null;
  function tone(freq, start, dur, type, vol) {
    if (!soundOn) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type || "triangle";
      o.frequency.value = freq;
      const t0 = ctx.currentTime + start;
      g.gain.setValueAtTime(vol || 0.12, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      o.connect(g).connect(ctx.destination);
      o.start(t0); o.stop(t0 + dur);
    } catch (e) { /* audio unavailable */ }
  }
  const SFX = {
    tap() {},
    right() { tone(784, 0, 0.09); tone(1175, 0.08, 0.28); },
    wrong() { tone(260, 0, 0.16, "sawtooth", 0.08); tone(196, 0.15, 0.3, "sawtooth", 0.08); },
    // only correct / wrong make a sound
    combo() {}, tick() {}, start() {}, rankUp() {}, fanfare() {}
  };

  // ---------------- optional background music (original chiptune loop, off by default) ----------------
  const MELODY = [
    [523,.5],[659,.5],[784,.5],[659,.5],[698,1],[0,.5],[587,.5],
    [523,.5],[587,.5],[659,.5],[523,.5],[440,1],[0,1],
    [392,.5],[523,.5],[659,.5],[784,.5],[880,.75],[784,.25],[698,.5],[659,.5],
    [587,.5],[659,.5],[698,.5],[587,.5],[523,1.5],[0,.5],
    [659,.5],[698,.5],[784,1],[880,.5],[784,.5],[659,1],
    [587,.5],[523,.5],[587,.5],[659,.5],[587,1],[0,1],
    [523,.5],[659,.5],[784,.5],[1047,.5],[988,.5],[784,.5],[659,.5],[587,.5],
    [523,1.5],[0,1.5]
  ];
  const BASS = [[131,2],[175,2],[147,2],[110,2],[131,2],[175,2],[196,2],[131,2],[165,2],[196,2],[147,2],[196,2],[131,2],[196,2],[131,3]];
  const DRUM = 0.5; // hi-hat every half beat
  const BEAT = 0.26;
  let musicOn = false, musicTimer = null;
  function playLoop() {
    if (!musicOn) return;
    let tm = 0;
    MELODY.forEach(([f, b]) => { if (f) tone(f, tm, BEAT * b * 0.9, "square", 0.035); tm += BEAT * b; });
    let bt = 0;
    BASS.forEach(([f, b]) => { tone(f, bt, BEAT * b * 0.9, "triangle", 0.07); bt += BEAT * b; });
    for (let h = 0; h < Math.max(tm, bt); h += BEAT * DRUM) tone(7000 + Math.random() * 1500, h, 0.03, "square", 0.012);
    musicTimer = setTimeout(playLoop, Math.max(tm, bt) * 1000);
  }
  function setMusic(on) {
    musicOn = on;
    clearTimeout(musicTimer);
    if (on) playLoop();
    $("musicBtn").textContent = on ? "🎵 ON" : "🎵 OFF";
    $("musicBtn").classList.toggle("on", on);
  }

  // ---------------- pixel engineer ----------------
  function pixelEngineer(scale) {
    const P = window.PIXEL_ENGINEER, px = P.size * (scale || 1), shadows = [];
    P.rows.forEach((row, y) => row.split("").forEach((ch, x) => {
      if (P.palette[ch]) shadows.push((x * px) + "px " + (y * px) + "px 0 " + P.palette[ch]);
    }));
    return '<span class="pixel-eng" style="width:' + px + "px;height:" + px + "px;box-shadow:" + shadows.join(",") +
      ";margin-right:" + (P.rows[0].length - 1) * px + "px;margin-bottom:" + (P.rows.length - 1) * px + 'px"></span>';
  }
  document.querySelectorAll(".runner span").forEach((el) => { el.innerHTML = pixelEngineer(1); });

  // ---------------- Firebase ----------------
  let db = null, boardRef = null, boardData = {}, lastRank = null, sync = "connecting";
  const root = CFG.rootPath || "gbquiz";
  function initDb() {
    try {
      if (typeof firebase === "undefined" || !CFG.firebase || !CFG.firebase.databaseURL) { sync = "offline"; return renderBoard(); }
      if (!firebase.apps.length) firebase.initializeApp(CFG.firebase);
      db = firebase.database();
      db.ref(".info/connected").on("value", (s) => { if (sync !== "denied") { sync = s.val() ? "live" : "connecting"; renderSync(); } });
      watchBoard();
    } catch (e) { sync = "offline"; renderBoard(); }
  }
  function watchBoard() {
    if (!db) return renderBoard();
    if (boardRef) boardRef.off();
    boardData = {};
    lastRank = null;
    boardRef = db.ref(root + "/day" + boardDay + "/board");
    boardRef.on("value",
      (s) => { boardData = s.val() || {}; renderBoard(); },
      () => { sync = "denied"; renderBoard(); });
  }
  function pushProgress(d) {
    const u = me();
    renderBoard(); // update at once with local data, before the database answers
    if (!db || !u) return;
    const st = dayState(d);
    const row = {
      name: u.profile.name, org: u.profile.org || "", spec: u.profile.spec || "",
      nationality: u.profile.nationality || "", city: u.profile.city || "",
      score: st.score, answered: st.index + (answered ? 1 : 0), correct: st.correct,
      bestCombo: st.bestStreak, finished: !!st.finished, updatedAt: new Date().toISOString()
    };
    db.ref(root + "/day" + d + "/board/" + uid).set(row).catch(() => {});
    db.ref(root + "/progress/" + uid + "/day" + d).set({
      index: st.index, score: st.score, streak: st.streak, bestStreak: st.bestStreak,
      correct: st.correct, answeredCount: st.answers.length, finished: !!st.finished
    }).catch(() => {});
  }
  function pushProfile() {
    const u = me();
    if (!db || !u) return;
    const p = { name: u.profile.name, org: u.profile.org || "", spec: u.profile.spec || "",
      nationality: u.profile.nationality || "", city: u.profile.city || "", lastSeen: new Date().toISOString() };
    if (CFG.sendContactDetails) { p.email = u.profile.email; p.phone = u.profile.phone || ""; }
    db.ref(root + "/trainees/" + uid).update(p).catch(() => {});
  }
  // continue on another device: take the remote progress if it is further along
  function pullProgress() {
    if (!db || !uid) return Promise.resolve();
    return db.ref(root + "/progress/" + uid).once("value").then((s) => {
      const remote = s.val() || {};
      days().forEach((d) => {
        const r = remote["day" + d];
        if (!r) return;
        const st = dayState(d);
        if ((r.index || 0) > st.index || (r.finished && !st.finished)) {
          Object.assign(st, { index: r.index || 0, score: r.score || 0, streak: r.streak || 0, bestStreak: r.bestStreak || 0, correct: r.correct || 0, finished: !!r.finished });
        }
      });
      persist();
    }).catch(() => {});
  }

  // ---------------- board rendering ----------------
  function renderSync() {
    $("syncDot").className = "dot" + (sync === "live" ? " live" : "");
    $("syncLabel").textContent = { live: t("live"), offline: t("offline"), connecting: t("connecting"), denied: t("denied") }[sync];
  }
  function renderBoard() {
    renderSync();
    $("boardTitle").textContent = t("board");
    const tabs = $("boardTabs");
    tabs.innerHTML = days().map((d) => '<button type="button" data-d="' + d + '" class="' + (d === boardDay ? "active" : "") + '">' + esc(t("day")) + " " + d + "</button>").join("");
    tabs.querySelectorAll("button").forEach((b) => b.onclick = () => { boardDay = b.dataset.d; watchBoard(); renderBoard(); });

    const rows = Object.keys(boardData).map((k) => Object.assign({ id: k }, boardData[k]));
    // show yourself even before the first save reaches the database
    if (me() && me().days[boardDay] && !boardData[uid]) {
      const st = me().days[boardDay];
      rows.push({ id: uid, name: me().profile.name, org: me().profile.org, score: st.score, answered: st.index, correct: st.correct });
    }
    rows.sort((a, b) => (b.score || 0) - (a.score || 0) || (b.correct || 0) - (a.correct || 0));
    const total = qs(boardDay).length;
    const list = $("boardList");
    if (!rows.length) { list.innerHTML = '<li class="empty">' + esc(t("empty")) + "</li>"; $("myRank").textContent = ""; return; }
    const medal = ["🥇", "🥈", "🥉"];
    list.innerHTML = rows.slice(0, CFG.leaderboardSize).map((r, i) => {
      const mine = r.id === uid;
      return '<li class="board-item ' + (i < 3 ? "t" + (i + 1) : "") + (mine ? " me" : "") + '">' +
        '<span class="rank">' + (medal[i] || i + 1) + "</span>" +
        '<span class="who"><b>' + esc(r.name) + (mine ? " (" + esc(t("you")) + ")" : "") + "</b>" +
        "<span>" + (r.finished ? "🏁 " : "") + Math.min(r.answered || 0, total) + "/" + total + "</span></span>" +
        '<span class="pts">' + (r.score || 0) + "</span></li>";
    }).join("");
    const rank = rows.findIndex((r) => r.id === uid) + 1;
    $("myRank").textContent = rank ? "#" + rank + " / " + rows.length : "";
    if (rank && lastRank && rank < lastRank) {
      SFX.rankUp();
      const el = list.querySelector(".me");
      if (el) el.classList.add("bump");
    }
    if (rank) lastRank = rank;
  }

  // ---------------- screens ----------------
  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t("title");
    $("langBtn").textContent = t("langBtn");
    $("logoutBtn").textContent = t("logout");
    $("logoutBtn").classList.toggle("hidden", !me());
    render(true);
    renderBoard();
  }

  function render(keepTimer) {
    const c = $("card");
    if (screen === "login") return renderLogin(c);
    if (screen === "home") return renderHome(c);
    if (screen === "quiz") return renderQuiz(c, keepTimer);
    if (screen === "result") return renderResult(c);
  }

  function options(list, val) {
    const i = lang === "ar" ? 1 : 2;
    return list.map((o) => '<option value="' + o[0] + '"' + (val === o[0] ? " selected" : "") + ">" + esc(o[i]) + "</option>").join("");
  }
  function labelOf(list, key) {
    const o = list.find((x) => x[0] === key);
    return o ? o[lang === "ar" ? 1 : 2] : "";
  }

  function renderLogin(c) {
    const p = (me() && me().profile) || {};
    const LS = window.QUIZ_LISTS;
    const sel = (name, label, list) => '<select name="' + name + '" required><option value="" disabled' + (p[name] ? "" : " selected") + ">" + esc(label) + "</option>" + options(list, p[name]) + "</select>";
    c.innerHTML =
      '<div class="mario-buddy">' + pixelEngineer(1.5) + "</div><h1>" + esc(t("title")) + "</h1>" +
      '<form id="f">' +
      '<input name="name" required maxlength="60" placeholder="' + esc(t("name")) + '" value="' + esc(p.name) + '">' +
      '<input name="email" type="email" required maxlength="120" placeholder="' + esc(t("email")) + '" value="' + esc(p.email) + '">' +
      '<div class="row2">' + sel("nationality", t("nat"), LS.nationalities) + sel("city", t("city"), LS.cities) + "</div>" +
      sel("spec", t("spec"), LS.disciplines) +
      '<div class="row2"><input name="phone" type="tel" maxlength="30" placeholder="' + esc(t("phone")) + '" value="' + esc(p.phone) + '">' +
      '<input name="org" maxlength="80" placeholder="' + esc(t("org")) + '" value="' + esc(p.org) + '"></div>' +
      '<div style="text-align:center"><button class="big-btn" type="submit">' + esc(t("go")) + "</button></div></form>";
    $("f").onsubmit = (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const email = String(f.get("email")).trim().toLowerCase();
      const id = hashId(email);
      const profile = {
        name: String(f.get("name")).trim(), email, phone: String(f.get("phone") || "").trim(), org: String(f.get("org") || "").trim(),
        spec: String(f.get("spec") || ""), nationality: String(f.get("nationality") || ""), city: String(f.get("city") || "")
      };
      users[id] = users[id] || { profile, days: {} };
      users[id].profile = profile;
      uid = id;
      persist();
      pushProfile();
      screen = "home";
      pullProgress().then(() => { if (screen === "home") render(); renderBoard(); });
      applyLang();
    };
  }

  function renderHome(c) {
    const u = me();
    const st = u.days[selectedDay];
    const total = qs(selectedDay).length;
    let label = t("start");
    if (st && st.finished) label = t("replay");
    else if (st && st.index > 0) label = t("resume") + " " + (st.index + 1);
    c.innerHTML =
      '<div class="mario-buddy">' + pixelEngineer(1.5) + "</div><h1>" + esc(t("hello")) + " " + esc(u.profile.name.split(" ")[0]) + "!</h1>" +
      '<div class="days">' + days().map((d) => {
        const s = u.days[d];
        const status = s && s.finished ? "✅ " + s.score : s && s.index ? s.index + "/" + qs(d).length : t("notStarted");
        return '<button type="button" class="answer-btn day-btn' + (d === selectedDay ? " active" : "") + '" data-d="' + d + '"><span class="num">' + esc(t("day")) + " " + d + '</span><span class="st">' + esc(status) + "</span></button>";
      }).join("") + "</div>" +
      '<div class="day-title">' + esc(DATA.days[selectedDay].title[lang]) + "</div>" +
      '<button class="big-btn" id="goBtn" type="button">' + esc(label) + "</button>";
    c.querySelectorAll(".day-btn").forEach((b) => b.onclick = () => {
      SFX.tap();
      selectedDay = b.dataset.d;
      if (boardDay !== selectedDay) { boardDay = selectedDay; watchBoard(); }
      render();
      renderBoard();
    });
    $("goBtn").onclick = () => {
      const s = dayState(selectedDay);
      persist();
      if (s.answers.length > s.index) s.index = s.answers.length; // answered before leaving
      if (s.finished) { screen = "result"; reviewOpen = false; }
      else { screen = "quiz"; answered = false; SFX.start(); }
      render();
    };
  }

  function multiplier(streak) { return Math.min(CFG.comboMax, 1 + CFG.comboStep * Math.max(0, streak - 1)); }
  function L(q, l) { return q[l] && q[l].question ? q[l] : q.ar; }

  function renderQuiz(c, keepTimer) {
    const st = dayState(selectedDay);
    const list = qs(selectedDay);
    const q = list[st.index];
    if (!q) return finishDay();
    const txt = L(q, lang);
    const mult = multiplier(st.streak);
    c.innerHTML =
      '<div class="hud"><span>' + esc(t("q")) + " " + (st.index + 1) + "/" + list.length + ' <span class="lvl lvl-' + q.level + '">' + esc(t(q.level)) + "</span></span>" +
      '<span class="combo' + (st.streak >= 2 ? " hot" : "") + '">×' + (+mult.toFixed(2)) + "</span>" +
      '<span class="coin-counter" id="coins">🪙 ' + st.score + "</span></div>" +
      '<div class="progress-track"><div class="progress-fill" style="width:' + (st.index / list.length * 100) + '%"></div></div>' +
      '<div class="timer-track" id="timer"><div class="timer-fill" id="timerFill"></div></div>' +
      '<div class="question">' + esc(txt.question) + "</div>" +
      '<div class="answers">' + LETTERS.map((k, i) =>
        '<button class="answer-btn" type="button" data-k="' + k + '"><span class="k">' + (lang === "ar" ? AR_KEYS[i] : k) + "</span><span>" + esc(txt.options[k]) + "</span></button>").join("") + "</div>" +
      '<div id="fb"></div>';
    c.querySelectorAll(".answer-btn").forEach((b) => b.onclick = (e) => choose(b.dataset.k, e));
    if (answered) { showFeedback(st.answers[st.answers.length - 1]); return; }
    if (!keepTimer || !timer) startTimer();
  }

  function startTimer() {
    clearInterval(timer);
    qStart = Date.now();
    const total = CFG.secondsPerQuestion * 1000;
    let lastSec = null;
    const tick = () => {
      const left = Math.max(0, total - (Date.now() - qStart));
      const bar = $("timerFill");
      if (bar) bar.style.width = (left / total * 100) + "%";
      const tw = $("timer");
      if (tw) tw.classList.toggle("low", left < 6000);
      const sec = Math.ceil(left / 1000);
      if (left < 5500 && sec !== lastSec && left > 0) SFX.tick();
      lastSec = sec;
      if (left <= 0) { clearInterval(timer); timer = null; choose(null); }
    };
    tick();
    timer = setInterval(tick, 200);
  }

  function choose(k, ev) {
    if (answered) return;
    answered = true;
    altReason = false;
    clearInterval(timer); timer = null;
    const st = dayState(selectedDay);
    const q = qs(selectedDay)[st.index];
    const ms = Math.min(Date.now() - qStart, CFG.secondsPerQuestion * 1000);
    const ok = k === q.answer;
    let points = 0, mult = 1;
    if (ok) {
      st.streak = ms <= CFG.comboWindowSeconds * 1000 ? st.streak + 1 : 0;
      st.bestStreak = Math.max(st.bestStreak, st.streak);
      mult = multiplier(st.streak);
      const speed = Math.round(CFG.maxSpeedBonus * (1 - ms / (CFG.secondsPerQuestion * 1000)));
      points = Math.round((CFG.basePoints * (CFG.levelWeight[q.level] || 1) + speed) * mult);
      st.score += points;
      st.correct += 1;
      SFX.right();
      if (window.GBScene) window.GBScene.correct(st.streak);
      if (ev) coinBurst(ev.clientX, ev.clientY);
      if (st.streak >= 2) { setTimeout(SFX.combo, 180); popText(t("combo") + " " + st.streak, "×" + (+mult.toFixed(2))); }
    } else {
      st.streak = 0;
      SFX.wrong();
      if (window.GBScene) window.GBScene.wrong();
      if (navigator.vibrate) navigator.vibrate(120);
    }
    st.answers.push({ id: q.id, chosen: k, correct: ok, ms, points, mult });
    if (db && uid) db.ref(root + "/answers/day" + selectedDay + "/" + uid + "/" + q.id).set({ chosen: k || "", correct: ok ? 1 : 0, ms, level: q.level }).catch(() => {});
    persist();
    pushProgress(selectedDay);
    render(true);
  }

  function showFeedback(rec) {
    const st = dayState(selectedDay);
    const list = qs(selectedDay);
    const q = list[st.index];
    document.querySelectorAll(".answer-btn").forEach((b) => {
      b.disabled = true;
      if (b.dataset.k === q.answer) b.classList.add("correct");
      else if (b.dataset.k === rec.chosen) b.classList.add("wrong");
      else b.classList.add("dim");
    });
    const rl = altReason ? (lang === "ar" ? "en" : "ar") : lang;
    const txt = L(q, rl);
    const hasAlt = q.en && q.en.reason;
    const head = rec.correct ? "✅ +" + rec.points + " 🪙" : (rec.chosen ? "❌" : "⏰") + " " + t("correctIs") + (lang === "ar" ? AR_KEYS[LETTERS.indexOf(q.answer)] : q.answer);
    const last = st.index + 1 >= list.length;
    $("fb").innerHTML =
      '<div class="feedback ' + (rec.correct ? "good" : "bad") + '">' + esc(head) + "</div>" +
      '<div class="why-box" dir="' + (rl === "ar" ? "rtl" : "ltr") + '">💡 ' + esc(txt.reason) +
      (hasAlt ? '<span class="alt" id="altBtn">' + (rl === "ar" ? "EN" : "ع") + "</span>" : "") + "</div>" +
      '<div class="actions"><button class="big-btn" id="nextBtn" type="button">' + esc(last ? t("finish") : t("next")) + "</button></div>";
    if (hasAlt) $("altBtn").onclick = () => { altReason = !altReason; showFeedback(rec); };
    $("nextBtn").onclick = next;
    $("nextBtn").focus({ preventScroll: true });
  }

  function next() {
    const st = dayState(selectedDay);
    st.index += 1;
    answered = false;
    persist();
    if (st.index >= qs(selectedDay).length) return finishDay();
    pushProgress(selectedDay);
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finishDay() {
    clearInterval(timer); timer = null;
    const st = dayState(selectedDay);
    const first = !st.finished;
    st.finished = true;
    persist();
    pushProgress(selectedDay);
    screen = "result";
    reviewOpen = false;
    render();
    if (first) {
      SFX.fanfare();
      if (window.confetti) { confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } }); setTimeout(() => confetti({ particleCount: 90, spread: 120, origin: { y: 0.4 } }), 400); }
    }
  }

  function renderResult(c) {
    const st = dayState(selectedDay);
    const n = st.answers.length || st.index || 1;
    const acc = Math.round(st.correct / n * 100);
    const avg = st.answers.length ? (st.answers.reduce((s, a) => s + a.ms, 0) / st.answers.length / 1000).toFixed(1) : "—";
    const b = t("badges")[acc >= 90 ? 3 : acc >= 75 ? 2 : acc >= 50 ? 1 : 0];
    const byId = {};
    qs(selectedDay).forEach((q) => { byId[q.id] = q; });
    const wrong = st.answers.filter((a) => !a.correct);
    c.innerHTML =
      '<div class="result-emoji">' + (acc >= 75 ? "🏆" : acc >= 50 ? "🌿" : "🌱") + "</div>" +
      "<h1>" + esc(t("resultTitle")) + "</h1>" +
      '<div class="result-score">🪙 ' + st.score + '</div><div class="badge">' + esc(b) + "</div>" +
      '<div class="stats">' +
      '<div class="stat">' + esc(t("correct")) + "<b>" + st.correct + "/" + n + "</b></div>" +
      '<div class="stat">' + esc(t("accuracy")) + "<b>" + acc + "%</b></div>" +
      '<div class="stat">' + esc(t("bestCombo")) + "<b>" + st.bestStreak + "</b></div>" +
      '<div class="stat">' + esc(t("avg")) + "<b>" + avg + " " + esc(t("sec")) + "</b></div></div>" +
      '<div class="actions"><button class="big-btn" id="homeBtn" type="button">' + esc(t("home")) + "</button>" +
      '<button class="big-btn ghost" id="revBtn" type="button">' + esc(t("review")) + "</button>" +
      '<button class="big-btn ghost" id="againBtn" type="button">' + esc(t("again")) + "</button></div>" +
      (reviewOpen ? '<div class="breakdown">' + (wrong.length ? wrong.map((a) => {
        const q = byId[a.id], x = L(q, lang);
        return '<div class="breakdown-item"><b>' + esc(x.question) + '</b><div class="no">' + esc(t("yours")) + esc(a.chosen ? x.options[a.chosen] : t("none")) +
          '</div><div class="ok">' + esc(t("correctIs")) + esc(x.options[q.answer]) + "</div><div>💡 " + esc(x.reason) + "</div></div>";
      }).join("") : '<div class="breakdown-item">' + esc(t("noMistakes")) + "</div>") + "</div>" : "");
    $("homeBtn").onclick = () => { screen = "home"; render(); };
    $("revBtn").onclick = () => { reviewOpen = !reviewOpen; render(); };
    $("againBtn").onclick = () => {
      if (!confirm(t("confirmAgain"))) return;
      delete me().days[selectedDay];
      dayState(selectedDay);
      persist();
      pushProgress(selectedDay);
      screen = "quiz"; answered = false;
      render();
    };
  }

  // ---------------- effects ----------------
  function coinBurst(x, y) {
    for (let i = 0; i < 4; i++) {
      const el = document.createElement("div");
      el.className = "coin";
      el.textContent = "🪙";
      el.style.left = (x - 16 + (i - 1.5) * 26) + "px";
      el.style.top = (y - 20) + "px";
      el.style.animationDelay = i * 0.06 + "s";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1100);
    }
  }
  function popText(big, small) {
    const el = document.createElement("div");
    el.className = "pop";
    el.innerHTML = esc(big) + "<small>" + esc(small) + "</small>";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  // ---------------- controls ----------------
  $("musicBtn").onclick = () => setMusic(!musicOn);
  $("langBtn").onclick = () => { lang = lang === "ar" ? "en" : "ar"; save(KEY.lang, lang); SFX.tap(); applyLang(); };
  $("logoutBtn").onclick = () => {
    clearInterval(timer); timer = null;
    uid = null; persist();
    screen = "login"; answered = false;
    applyLang();
  };
  document.addEventListener("keydown", (e) => {
    if (screen !== "quiz") return;
    const map = { "1": "A", "2": "B", "3": "C", "4": "D", a: "A", b: "B", c: "C", d: "D" };
    const k = map[e.key.toLowerCase()];
    if (!answered && k) choose(k);
  });

  // ---------------- boot ----------------
  setTimeout(() => setMusic(false), 0);
  if (me()) { screen = "home"; pullProgress().then(() => { if (screen === "home") render(); renderBoard(); }); }
  applyLang();
  setTimeout(initDb, 300);
  if (me()) setTimeout(() => pullProgress().then(() => { if (screen === "home") render(); renderBoard(); }), 1200);
})();
