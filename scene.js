/* Endless 16-bit side-scroller along the bottom of the page.
   Original sprites: pixel engineer vs. pollution critters (smog cloud, oil blob).
   The quiz calls window.GBScene.correct(streak) and window.GBScene.wrong(). */
(function () {
  "use strict";
  const PX = 3;                 // size of one sprite pixel on screen
  const H = window.innerWidth < 520 ? 125 : 150; // canvas height (css px)
  const GROUND = 34;            // brick ground height
  const SPEED = 0.16;           // scroll speed, px per ms
  const G = 0.0021;             // gravity
  const JUMP = 0.56;            // jump velocity
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- sprites (letters → palette) ----------
  const HERO = window.PIXEL_ENGINEER;
  const heroRun2 = HERO.rows.slice(0, 13).concat(["...PPPP.PPPP..", "..PPPP...PPPP.", ".BBBB.....BBBB"]);
  const heroHurt = HERO.rows.map((r, i) => (i === 5 ? "...SWSSSSWS..." : i === 7 ? "....SMMMMS...." : r));
  const SMOG = {
    palette: { G: "#8a8f99", L: "#b9bec7", K: "#2b2b3a", W: "#ffffff", R: "#e52521" },
    rows: [
      "....LLLL....",
      "..LLGGGGLL..",
      ".LGGGGGGGGL.",
      "LGGWWGGWWGGL",
      "LGGWKGGKWGGL",
      "LGGGGGGGGGGL",
      "LGGGRRRRGGGL",
      ".LGGGGGGGGL.",
      "..LL.LL.LL..",
      ".KK..KK..KK."
    ]
  };
  const OIL = {
    palette: { K: "#1d1a24", D: "#3b3448", W: "#ffffff", Y: "#ffd23e" },
    rows: [
      "....KK....",
      "...KKKK...",
      "..KKKKKK..",
      ".KDKKKKDK.",
      ".KWWKKWWK.",
      "KKWKKKKWKK",
      "KKKKKKKKKK",
      "KKKYYYYKKK",
      ".KKKKKKKK.",
      "..KK..KK.."
    ]
  };
  const COIN = { palette: { Y: "#ffd23e", O: "#d4a017", W: "#fff6b0" }, rows: [".YYYY.", "YWWYOY", "YWYYOY", "YWYYOY", "YYYYOY", ".YYYY."] };
  const BLOCK = { palette: { Y: "#ffd23e", O: "#b8860b", K: "#6b4a00" }, rows: [
    "OOOOOOOOOO", "OYYYYYYYYO", "OYYKKKKYYO", "OYYYYYKYYO", "OYYYYKYYYO", "OYYYKKYYYO", "OYYYYYYYYO", "OYYYKKYYYO", "OYYYYYYYYO", "OOOOOOOOOO"] };

  // pre-render sprites to small canvases for speed
  function bake(rows, palette) {
    const c = document.createElement("canvas");
    c.width = rows[0].length * PX;
    c.height = rows.length * PX;
    const x = c.getContext("2d");
    rows.forEach((row, j) => row.split("").forEach((ch, i) => {
      if (palette[ch]) { x.fillStyle = palette[ch]; x.fillRect(i * PX, j * PX, PX, PX); }
    }));
    return c;
  }
  const S = {
    run1: bake(HERO.rows, HERO.palette), run2: bake(heroRun2, HERO.palette), hurt: bake(heroHurt, HERO.palette),
    smog: bake(SMOG.rows, SMOG.palette), oil: bake(OIL.rows, OIL.palette), coin: bake(COIN.rows, COIN.palette), block: bake(BLOCK.rows, BLOCK.palette)
  };

  // ---------- canvas ----------
  const cv = document.createElement("canvas");
  cv.id = "scene";
  cv.setAttribute("aria-hidden", "true");
  document.body.appendChild(cv);
  const ctx = cv.getContext("2d");
  let W = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    cv.style.width = W + "px";
    cv.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
  }
  window.addEventListener("resize", resize);
  resize();

  const groundY = H - GROUND;
  const hero = { x: 0, y: 0, vy: 0, w: S.run1.width, h: S.run1.height, onGround: true, state: "run", t: 0, blink: 0, plan: null };
  let things = [];     // pipes, gaps, enemies, blocks
  let fx = [];         // coins, squashed enemies, sparkles
  let scenery = [];    // background hills / bushes
  let nextSpawn = 600, worldX = 0, last = 0, forcePit = false, starT = 0;

  function heroX() { return Math.max(40, Math.min(W * 0.18, 220)); }
  hero.x = heroX();
  hero.y = groundY - hero.h;

  for (let x = 0; x < W + 400; x += 160 + Math.random() * 160) scenery.push(newScenery(x));
  function newScenery(x) {
    return Math.random() < 0.5 ? { kind: "hill", x, r: 40 + Math.random() * 40 } : { kind: "bush", x, r: 14 + Math.random() * 10 };
  }

  function spawn() {
    const x = W + 40;
    const r = Math.random();
    if (r < 0.32) things.push({ kind: "pipe", x, w: 42, h: 36 + Math.round(Math.random() * 3) * 10 });
    else if (r < 0.52) things.push({ kind: "gap", x, w: 50 + Math.random() * 16 });
    else if (r < 0.74) things.push({ kind: "enemy", sprite: "smog", x, w: S.smog.width, h: S.smog.height, vx: -0.04, bob: Math.random() * 6 });
    else if (r < 0.92) things.push({ kind: "enemy", sprite: "oil", x, w: S.oil.width, h: S.oil.height, vx: -0.06, bob: 0 });
    else things.push({ kind: "block", x, w: S.block.width, h: S.block.height, y: groundY - 92, hit: false });
    nextSpawn = 420 + Math.random() * 520;
  }

  function jump(power) {
    if (!hero.onGround || hero.state !== "run") return;
    hero.vy = -(power || JUMP);
    hero.onGround = false;
  }

  // ---------- public hooks ----------
  window.GBScene = {
    correct(streak) {
      if (hero.state !== "run") return;
      jump(JUMP * 1.08);
      for (let i = 0; i < 3; i++) fx.push({ kind: "coin", x: hero.x + 6 + i * 12, y: hero.y - 10, vy: -0.25 - i * 0.04, life: 700 });
      if (streak >= 3) starT = 2500;
    },
    wrong() {
      if (hero.state !== "run") return;
      if (Math.random() < 0.5) {
        // knocked out: hop up, then fall through the floor
        hero.state = "dead"; hero.vy = -0.5; hero.onGround = false; hero.t = 0;
      } else {
        // trip into a pit just ahead
        forcePit = true;
        things.push({ kind: "gap", x: hero.x + hero.w + 18, w: 64, forced: true });
      }
    }
  };

  // ---------- loop ----------
  function step(dt) {
    const dx = SPEED * dt;
    worldX += dx;
    hero.t += dt;
    if (starT > 0) starT -= dt;
    if (hero.blink > 0) hero.blink -= dt;

    scenery.forEach((s) => { s.x -= dx * 0.4; });
    scenery = scenery.filter((s) => s.x + s.r > -10);
    const lastS = scenery[scenery.length - 1];
    if (!lastS || lastS.x < W + 100) scenery.push(newScenery((lastS ? lastS.x : W) + 160 + Math.random() * 180));

    nextSpawn -= dx;
    if (nextSpawn <= 0 && hero.state === "run") spawn();
    things.forEach((t) => { t.x -= dx + (t.vx ? -t.vx * dt : 0); });
    things = things.filter((t) => t.x + (t.w || 0) > -20 && !t.dead);

    // auto-pilot: jump over pipes, gaps and some enemies; time others to stomp
    if (hero.state === "run" && hero.onGround) {
      const front = hero.x + hero.w;
      for (const t of things) {
        if (t.kind === "block" || t.forced) continue;
        const d = t.x - front;
        if (d < -4 || d > 140) continue;
        if (!t.plan) t.plan = t.kind === "enemy" ? (Math.random() < 0.6 ? 34 + Math.random() * 18 : 70 + Math.random() * 20) : (t.kind === "gap" ? 8 + Math.random() * 14 : 14 + Math.random() * 16);
        if (d <= t.plan) { jump(t.kind === "gap" ? JUMP * 1.15 : t.kind === "pipe" && t.h > 50 ? JUMP * 1.12 : JUMP); break; }
      }
    }

    // physics
    if (hero.state === "dead") {
      hero.vy += G * 0.8 * dt;
      hero.y += hero.vy * dt;
      if (hero.y > H + 20) respawn();
    } else {
      if (!hero.onGround) { hero.vy += G * dt; hero.y += hero.vy * dt; }
      const feet = hero.y + hero.h;
      const overGap = things.some((t) => t.kind === "gap" && hero.x + 10 > t.x && hero.x + hero.w - 10 < t.x + t.w);
      let floor = overGap ? Infinity : groundY;
      // stand on pipes
      for (const t of things) if (t.kind === "pipe" && hero.x + hero.w - 6 > t.x && hero.x + 6 < t.x + t.w) floor = Math.min(floor, groundY - t.h);
      if (hero.vy >= 0 && feet >= floor && feet - hero.vy * dt <= floor + 4) { hero.y = floor - hero.h; hero.vy = 0; hero.onGround = true; }
      else if (feet < floor - 1) hero.onGround = false;
      if (hero.onGround && floor === Infinity) hero.onGround = false;
      if (hero.y > H + 10) { hero.state = "fell"; respawn(); }

      // enemies: stomp when landing on them; otherwise pass (auto-pilot never hurts the hero)
      for (const t of things) {
        if (t.kind !== "enemy" || t.squashed) continue;
        const ey = groundY - t.h;
        const hit = hero.x + hero.w - 8 > t.x && hero.x + 8 < t.x + t.w && hero.y + hero.h > ey + 2 && hero.y < ey + t.h;
        if (hit && hero.vy > 0 && hero.y + hero.h - ey < 22) {
          t.squashed = true; t.dead = true;
          fx.push({ kind: "squash", sprite: t.sprite, x: t.x, y: groundY, w: t.w, h: t.h, life: 400 });
          fx.push({ kind: "coin", x: t.x + t.w / 2 - 9, y: ey - 16, vy: -0.3, life: 650 });
          hero.vy = -JUMP * 0.75; hero.onGround = false;
        }
      }
      // head-bump ? blocks
      for (const t of things) {
        if (t.kind !== "block" || t.hit) continue;
        if (hero.vy < 0 && hero.x + hero.w - 8 > t.x && hero.x + 8 < t.x + t.w && hero.y < t.y + t.h && hero.y > t.y) {
          t.hit = true; hero.vy = 0.05;
          fx.push({ kind: "coin", x: t.x + t.w / 2 - 9, y: t.y - 20, vy: -0.35, life: 700 });
        }
      }
    }

    fx.forEach((f) => { f.life -= dt; if (f.kind === "coin") { f.y += f.vy * dt; f.vy += 0.0008 * dt; } });
    fx = fx.filter((f) => f.life > 0);
  }

  function respawn() {
    things = things.filter((t) => !(t.kind === "gap" && t.x < hero.x + 200));
    hero.state = "run"; hero.vy = 0.1; hero.onGround = false; hero.y = -hero.h; hero.blink = 1200;
    forcePit = false;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // hills and bushes (parallax)
    scenery.forEach((s) => {
      ctx.fillStyle = s.kind === "hill" ? "#43d14f" : "#2fb83c";
      ctx.beginPath();
      ctx.arc(s.x, groundY, s.r, Math.PI, 0);
      ctx.fill();
      if (s.kind === "hill") { ctx.fillStyle = "#2a9d3a"; ctx.fillRect(s.x - 4, groundY - s.r * 0.55, 3, 3); ctx.fillRect(s.x + 8, groundY - s.r * 0.35, 3, 3); }
    });
    // ground bricks with gaps
    const gaps = things.filter((t) => t.kind === "gap");
    ctx.fillStyle = "#c84c0c";
    ctx.fillRect(0, groundY, W, GROUND);
    const off = worldX % 33;
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    for (let y = groundY + 14; y < H; y += 17) ctx.fillRect(0, y, W, 3);
    for (let x = -off; x < W; x += 33) ctx.fillRect(x + 30, groundY, 3, GROUND);
    ctx.fillStyle = "#5e2004";
    ctx.fillRect(0, groundY, W, 5);
    gaps.forEach((g) => { ctx.clearRect(g.x, groundY, g.w, GROUND); });
    // pipes
    things.filter((t) => t.kind === "pipe").forEach((p) => {
      const y = groundY - p.h;
      const grad = ctx.createLinearGradient(p.x, 0, p.x + p.w, 0);
      grad.addColorStop(0, "#1c6b28"); grad.addColorStop(0.25, "#7fe08a"); grad.addColorStop(0.55, "#43d14f"); grad.addColorStop(1, "#1c6b28");
      ctx.fillStyle = grad;
      ctx.fillRect(p.x + 4, y + 12, p.w - 8, p.h - 12);
      ctx.fillRect(p.x, y, p.w, 14);
      ctx.strokeStyle = "#14511e"; ctx.lineWidth = 3;
      ctx.strokeRect(p.x + 4, y + 12, p.w - 8, p.h - 12);
      ctx.strokeRect(p.x, y, p.w, 14);
    });
    // ? blocks
    things.filter((t) => t.kind === "block").forEach((b) => {
      ctx.globalAlpha = b.hit ? 0.55 : 1;
      ctx.drawImage(S.block, Math.round(b.x), Math.round(b.y));
      ctx.globalAlpha = 1;
    });
    // enemies
    things.filter((t) => t.kind === "enemy").forEach((e) => {
      const bob = e.sprite === "smog" ? Math.sin((worldX + e.bob * 40) / 18) * 2 : 0;
      ctx.drawImage(S[e.sprite], Math.round(e.x), Math.round(groundY - e.h + bob));
    });
    // fx
    fx.forEach((f) => {
      if (f.kind === "coin") ctx.drawImage(S.coin, Math.round(f.x), Math.round(f.y));
      if (f.kind === "squash") { ctx.globalAlpha = Math.max(0, f.life / 400); ctx.drawImage(S[f.sprite], f.x, f.y - f.h * 0.35, f.w, f.h * 0.35); ctx.globalAlpha = 1; }
    });
    // hero
    if (!(hero.blink > 0 && Math.floor(hero.blink / 100) % 2)) {
      let img = hero.state === "dead" ? S.hurt : (!hero.onGround ? S.run1 : (Math.floor(hero.t / 110) % 2 ? S.run1 : S.run2));
      if (starT > 0) { ctx.shadowColor = "#ffd23e"; ctx.shadowBlur = 14; }
      if (hero.state === "dead") {
        ctx.save(); ctx.translate(hero.x, hero.y + hero.h); ctx.scale(1, -1); ctx.drawImage(img, 0, 0); ctx.restore();
      } else ctx.drawImage(img, Math.round(hero.x), Math.round(hero.y));
      ctx.shadowBlur = 0;
    }
  }

  function frame(ts) {
    const dt = Math.min(40, last ? ts - last : 16);
    last = ts;
    if (!document.hidden) { step(dt); draw(); }
    requestAnimationFrame(frame);
  }
  if (reduce) { draw(); } else requestAnimationFrame(frame);
})();
