/* Full-screen 16-bit world BEHIND the quiz (never covers text).
   - Endless level along the bottom: bricks, pits, pipes, hills, pollution critters.
   - The pixel engineer runs, jumps, stomps; falls when the trainee answers wrong.
   - Tap / click the scene (or press Space): the engineer jumps (double jump in the air),
     tap a critter to squash it, tap a ? block for a coin, tap a cloud to puff it.
   The quiz calls window.GBScene.correct(streak) and window.GBScene.wrong(). */
(function () {
  "use strict";
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let PX = 3;
  const SPEED = 0.15, G = 0.0021, JUMP = 0.58;

  // ---------- sprites ----------
  const HERO = window.PIXEL_ENGINEER;
  const heroRun2 = HERO.rows.slice(0, 13).concat(["...PPPP.PPPP..", "..PPPP...PPPP.", ".BBBB.....BBBB"]);
  const heroHurt = HERO.rows.map((r, i) => (i === 5 ? "...SWSSSSWS..." : i === 7 ? "....SMMMMS...." : r));
  const SMOG = { palette: { G: "#8a8f99", L: "#b9bec7", K: "#2b2b3a", W: "#ffffff", R: "#e52521" }, rows: [
    "....LLLL....", "..LLGGGGLL..", ".LGGGGGGGGL.", "LGGWWGGWWGGL", "LGGWKGGKWGGL", "LGGGGGGGGGGL", "LGGGRRRRGGGL", ".LGGGGGGGGL.", "..LL.LL.LL..", ".KK..KK..KK."] };
  const OIL = { palette: { K: "#1d1a24", D: "#3b3448", W: "#ffffff", Y: "#ffd23e" }, rows: [
    "....KK....", "...KKKK...", "..KKKKKK..", ".KDKKKKDK.", ".KWWKKWWK.", "KKWKKKKWKK", "KKKKKKKKKK", "KKKYYYYKKK", ".KKKKKKKK.", "..KK..KK.."] };
  const COIN = { palette: { Y: "#ffd23e", O: "#d4a017", W: "#fff6b0" }, rows: [".YYYY.", "YWWYOY", "YWYYOY", "YWYYOY", "YYYYOY", ".YYYY."] };
  const BLOCK = { palette: { Y: "#ffd23e", O: "#b8860b", K: "#6b4a00", E: "#c9a46a" }, rows: [
    "OOOOOOOOOO", "OYYYYYYYYO", "OYYKKKKYYO", "OYYYYYKYYO", "OYYYYKYYYO", "OYYYKKYYYO", "OYYYYYYYYO", "OYYYKKYYYO", "OYYYYYYYYO", "OOOOOOOOOO"] };
  const USED = { palette: { E: "#c9a46a", O: "#8a6508" }, rows: BLOCK.rows.map((r) => r.replace(/[YK]/g, "E")) };
  const CLOUD = { palette: { W: "#ffffff", B: "#d6ecff" }, rows: [
    "......WWWW..........", "....WWWWWWWW..WWW...", "..WWWWWWWWWWWWWWWWW.", ".WWWWWWWWWWWWWWWWWWW", "WWWWWWWWWWWWWWWWWWWW", "WWWWWWWWWWWWWWWWWWWW", ".BBBBBBBBBBBBBBBBBB."] };
  const LEAF = { palette: { G: "#43d14f", D: "#2a9d3a" }, rows: ["..GG", ".GGD", "GGD.", "GD.."] };

  let S = {};
  function bake(rows, palette, px) {
    const c = document.createElement("canvas");
    c.width = rows[0].length * px; c.height = rows.length * px;
    const x = c.getContext("2d");
    rows.forEach((row, j) => row.split("").forEach((ch, i) => { if (palette[ch]) { x.fillStyle = palette[ch]; x.fillRect(i * px, j * px, px, px); } }));
    return c;
  }
  function bakeAll() {
    S = {
      run1: bake(HERO.rows, HERO.palette, PX), run2: bake(heroRun2, HERO.palette, PX), hurt: bake(heroHurt, HERO.palette, PX),
      smog: bake(SMOG.rows, SMOG.palette, PX), oil: bake(OIL.rows, OIL.palette, PX), coin: bake(COIN.rows, COIN.palette, PX),
      block: bake(BLOCK.rows, BLOCK.palette, PX), used: bake(USED.rows, USED.palette, PX),
      cloud: bake(CLOUD.rows, CLOUD.palette, PX + 1), leaf: bake(LEAF.rows, LEAF.palette, PX)
    };
  }

  // ---------- canvas ----------
  const cv = document.createElement("canvas");
  cv.id = "scene";
  cv.setAttribute("aria-hidden", "true");
  document.body.insertBefore(cv, document.body.firstChild);
  const ctx = cv.getContext("2d");
  let W = 0, H = 0, GROUND = 64, groundY = 0;

  const hero = { x: 0, y: 0, vy: 0, w: 0, h: 0, onGround: true, state: "run", t: 0, blink: 0, jumps: 0 };
  let things = [], fx = [], scenery = [], clouds = [], sky = [];
  let nextSpawn = 500, worldX = 0, last = 0, starT = 0, idleT = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 600 ? 1.5 : 2);
    W = window.innerWidth; H = window.innerHeight;
    PX = W < 600 ? 3 : 3;
    GROUND = W < 600 ? 58 : 72;
    groundY = H - GROUND;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + "px"; cv.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    bakeAll();
    hero.w = S.run1.width; hero.h = S.run1.height;
    hero.x = Math.max(24, Math.min(W * 0.16, 220));
    if (hero.onGround) hero.y = groundY - hero.h;
    // sky decorations
    clouds = [];
    for (let i = 0; i < Math.max(3, Math.round(W / 260)); i++) clouds.push({ x: Math.random() * W, y: 20 + Math.random() * H * 0.35, s: 0.01 + Math.random() * 0.015, puff: 0 });
    sky = [];
    const n = Math.max(2, Math.round(W / 380));
    for (let i = 0; i < n; i++) sky.push({ x: (i + 0.5) * W / n + (Math.random() - 0.5) * 80, y: H * (0.2 + Math.random() * 0.4), hit: 0, phase: Math.random() * 6 });
  }
  window.addEventListener("resize", resize);
  resize();

  for (let x = 0; x < W + 400; x += 140 + Math.random() * 160) scenery.push(newScenery(x));
  function newScenery(x) { return Math.random() < 0.5 ? { kind: "hill", x, r: 44 + Math.random() * 50 } : { kind: "bush", x, r: 16 + Math.random() * 12 }; }

  function spawn() {
    const x = W + 40, r = Math.random();
    if (r < 0.3) things.push({ kind: "pipe", x, w: 14 * PX, h: 36 + Math.round(Math.random() * 3) * 10 });
    else if (r < 0.48) things.push({ kind: "gap", x, w: 50 + Math.random() * 16 });
    else if (r < 0.72) things.push({ kind: "enemy", sprite: "smog", x, w: S.smog.width, h: S.smog.height, vx: -0.04, bob: Math.random() * 6 });
    else if (r < 0.9) things.push({ kind: "enemy", sprite: "oil", x, w: S.oil.width, h: S.oil.height, vx: -0.06, bob: 0 });
    else things.push({ kind: "block", x, w: S.block.width, h: S.block.height, y: groundY - 100, hit: false });
    nextSpawn = 380 + Math.random() * 480;
  }

  function jump(power, air) {
    if (hero.state !== "run") return false;
    if (hero.onGround) { hero.vy = -(power || JUMP); hero.onGround = false; hero.jumps = 1; return true; }
    if (air && hero.jumps < 2) { hero.vy = -(power || JUMP) * 0.85; hero.jumps = 2; sparkle(hero.x + hero.w / 2, hero.y + hero.h); return true; }
    return false;
  }
  function coin(x, y, vy) { fx.push({ kind: "coin", x, y, vy: vy || -0.3, life: 700 }); }
  function sparkle(x, y) { for (let i = 0; i < 6; i++) fx.push({ kind: "spark", x, y, vx: (Math.random() - 0.5) * 0.25, vy: -Math.random() * 0.2, life: 400 }); }
  function squash(t) {
    t.dead = true;
    fx.push({ kind: "squash", sprite: t.sprite, x: t.x, y: groundY, w: t.w, h: t.h, life: 400 });
    coin(t.x + t.w / 2 - 9, groundY - t.h - 16, -0.32);
    blip(660, 0.06); blip(990, 0.08, 0.05);
  }

  // tiny sounds for taps (respect the quiz sound setting)
  let ac = null;
  function blip(f, d, at) {
    if (window.QUIZ_CONFIG && window.QUIZ_CONFIG.soundOn === false) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + (at || 0);
      o.type = "square"; o.frequency.value = f;
      g.gain.setValueAtTime(0.05, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + d);
      o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + d);
    } catch (e) { /* no audio */ }
  }

  // ---------- public hooks ----------
  window.GBScene = {
    correct(streak) {
      if (hero.state !== "run") return;
      jump(JUMP * 1.08);
      for (let i = 0; i < 3; i++) coin(hero.x + 6 + i * 12, hero.y - 10, -0.25 - i * 0.04);
      if (streak >= 3) starT = 2500;
    },
    wrong() {
      if (hero.state !== "run") return;
      if (Math.random() < 0.5) { hero.state = "dead"; hero.vy = -0.5; hero.onGround = false; }
      else things.push({ kind: "gap", x: hero.x + hero.w + 18, w: 64, forced: true });
    }
  };

  // ---------- interaction (taps only reach the canvas where no text/card is on top) ----------
  function tap(px, py) {
    idleT = 0;
    if (ac && ac.state === "suspended") ac.resume();
    for (const t of things) {
      if (t.kind === "enemy" && !t.dead && px > t.x - 10 && px < t.x + t.w + 10 && py > groundY - t.h - 20 && py < groundY + 6) return squash(t);
    }
    for (const b of sky) {
      if (px > b.x - 6 && px < b.x + S.block.width + 6 && py > b.y - 6 && py < b.y + S.block.height + 6) {
        if (b.hit <= 0) { b.hit = 6000; b.bump = 180; coin(b.x + S.block.width / 2 - 9, b.y - 22, -0.36); blip(988, 0.07); blip(1319, 0.12, 0.07); }
        return;
      }
    }
    for (const c of clouds) {
      if (px > c.x && px < c.x + S.cloud.width && py > c.y && py < c.y + S.cloud.height) { c.puff = 500; blip(520, 0.1); return; }
    }
    if (jump(JUMP, true)) blip(hero.jumps === 2 ? 700 : 440, 0.08);
  }
  cv.addEventListener("pointerdown", (e) => { tap(e.clientX, e.clientY); });
  document.addEventListener("keydown", (e) => {
    if (e.code !== "Space") return;
    const tag = (document.activeElement && document.activeElement.tagName) || "";
    if (/INPUT|SELECT|TEXTAREA|BUTTON/.test(tag)) return;
    e.preventDefault();
    tap(-999, -999);
  });

  // ---------- update ----------
  function step(dt) {
    const dx = SPEED * dt;
    worldX += dx; hero.t += dt; idleT += dt;
    if (starT > 0) starT -= dt;
    if (hero.blink > 0) hero.blink -= dt;

    clouds.forEach((c) => { c.x -= c.s * dt; if (c.x < -S.cloud.width) { c.x = W + 20; c.y = 20 + Math.random() * H * 0.35; } if (c.puff > 0) c.puff -= dt; });
    sky.forEach((b) => { if (b.hit > 0) b.hit -= dt; if (b.bump > 0) b.bump -= dt; });
    scenery.forEach((s) => { s.x -= dx * 0.4; });
    scenery = scenery.filter((s) => s.x + s.r > -10);
    const lastS = scenery[scenery.length - 1];
    if (!lastS || lastS.x < W + 100) scenery.push(newScenery((lastS ? lastS.x : W) + 140 + Math.random() * 180));

    nextSpawn -= dx;
    if (nextSpawn <= 0 && hero.state === "run") spawn();
    things.forEach((t) => { t.x -= dx + (t.vx ? -t.vx * dt : 0); });
    things = things.filter((t) => t.x + (t.w || 0) > -20 && !t.dead);

    // auto-pilot
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

    if (hero.state === "dead") {
      hero.vy += G * 0.8 * dt; hero.y += hero.vy * dt;
      if (hero.y > H + 20) respawn();
    } else {
      if (!hero.onGround) { hero.vy += G * dt; hero.y += hero.vy * dt; }
      const feet = hero.y + hero.h;
      const overGap = things.some((t) => t.kind === "gap" && hero.x + 10 > t.x && hero.x + hero.w - 10 < t.x + t.w);
      let floor = overGap ? Infinity : groundY;
      for (const t of things) if (t.kind === "pipe" && hero.x + hero.w - 6 > t.x && hero.x + 6 < t.x + t.w) floor = Math.min(floor, groundY - t.h);
      if (hero.vy >= 0 && feet >= floor && feet - hero.vy * dt <= floor + 4) { hero.y = floor - hero.h; hero.vy = 0; hero.onGround = true; hero.jumps = 0; }
      else if (feet < floor - 1) hero.onGround = false;
      if (hero.onGround && floor === Infinity) hero.onGround = false;
      if (hero.y > H + 10) respawn();
      for (const t of things) {
        if (t.kind !== "enemy" || t.dead) continue;
        const ey = groundY - t.h;
        const hit = hero.x + hero.w - 8 > t.x && hero.x + 8 < t.x + t.w && hero.y + hero.h > ey + 2 && hero.y < ey + t.h;
        if (hit && hero.vy > 0 && hero.y + hero.h - ey < 22) { squash(t); hero.vy = -JUMP * 0.75; hero.onGround = false; }
      }
      for (const t of things) {
        if (t.kind !== "block" || t.hit) continue;
        if (hero.vy < 0 && hero.x + hero.w - 8 > t.x && hero.x + 8 < t.x + t.w && hero.y < t.y + t.h && hero.y > t.y) { t.hit = true; hero.vy = 0.05; coin(t.x + t.w / 2 - 9, t.y - 20, -0.35); }
      }
    }
    fx.forEach((f) => {
      f.life -= dt;
      if (f.kind === "coin") { f.y += f.vy * dt; f.vy += 0.0008 * dt; }
      if (f.kind === "spark" || f.kind === "leaf") { f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 0.0004 * dt; }
    });
    fx = fx.filter((f) => f.life > 0);
    // gentle attention cue: leaves drift down now and then
    if (Math.random() < dt / 900) fx.push({ kind: "leaf", x: Math.random() * W, y: -10, vx: -0.02 + Math.random() * 0.04, vy: 0.03, life: 9000 });
  }

  function respawn() {
    things = things.filter((t) => !(t.kind === "gap" && t.x < hero.x + 200));
    hero.state = "run"; hero.vy = 0.1; hero.onGround = false; hero.y = -hero.h; hero.blink = 1200; hero.jumps = 2;
  }

  // ---------- draw ----------
  function draw(ts) {
    ctx.clearRect(0, 0, W, H);
    clouds.forEach((c) => {
      const k = c.puff > 0 ? 1 + 0.25 * Math.sin((500 - c.puff) / 500 * Math.PI) : 1;
      ctx.drawImage(S.cloud, c.x, c.y, S.cloud.width * k, S.cloud.height * k);
    });
    sky.forEach((b) => {
      const bob = Math.sin(ts / 600 + b.phase) * 6 - (b.bump > 0 ? Math.sin((180 - b.bump) / 180 * Math.PI) * 10 : 0);
      const glow = b.hit <= 0 && idleT > 8000 && Math.floor(ts / 300) % 2;
      if (glow) { ctx.shadowColor = "#fff6a8"; ctx.shadowBlur = 16; }
      ctx.drawImage(b.hit > 0 ? S.used : S.block, Math.round(b.x), Math.round(b.y + bob));
      ctx.shadowBlur = 0;
    });
    scenery.forEach((s) => {
      ctx.fillStyle = s.kind === "hill" ? "#43d14f" : "#2fb83c";
      ctx.beginPath(); ctx.arc(s.x, groundY, s.r, Math.PI, 0); ctx.fill();
      if (s.kind === "hill") { ctx.fillStyle = "#2a9d3a"; ctx.fillRect(s.x - 4, groundY - s.r * 0.55, 3, 3); ctx.fillRect(s.x + 8, groundY - s.r * 0.35, 3, 3); }
    });
    // taller brick ground with a grass edge
    ctx.fillStyle = "#c84c0c"; ctx.fillRect(0, groundY, W, GROUND);
    const off = worldX % 33;
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    let row = 0;
    for (let y = groundY + 16; y < H; y += 17, row++) {
      ctx.fillRect(0, y, W, 3);
      const shift = row % 2 ? 16 : 0;
      for (let x = -off + shift; x < W; x += 33) ctx.fillRect(x + 30, y - 14, 3, 14);
    }
    for (let x = -off; x < W; x += 33) ctx.fillRect(x + 30, groundY + 6, 3, 10);
    ctx.fillStyle = "#43d14f"; ctx.fillRect(0, groundY, W, 6);
    ctx.fillStyle = "#2a9d3a"; ctx.fillRect(0, groundY + 6, W, 2);
    things.filter((t) => t.kind === "gap").forEach((g) => ctx.clearRect(g.x, groundY, g.w, GROUND));
    things.filter((t) => t.kind === "pipe").forEach((p) => {
      const y = groundY - p.h;
      const grad = ctx.createLinearGradient(p.x, 0, p.x + p.w, 0);
      grad.addColorStop(0, "#1c6b28"); grad.addColorStop(0.25, "#7fe08a"); grad.addColorStop(0.55, "#43d14f"); grad.addColorStop(1, "#1c6b28");
      ctx.fillStyle = grad;
      ctx.fillRect(p.x + 4, y + 12, p.w - 8, p.h - 12); ctx.fillRect(p.x, y, p.w, 14);
      ctx.strokeStyle = "#14511e"; ctx.lineWidth = 3;
      ctx.strokeRect(p.x + 4, y + 12, p.w - 8, p.h - 12); ctx.strokeRect(p.x, y, p.w, 14);
    });
    things.filter((t) => t.kind === "block").forEach((b) => ctx.drawImage(b.hit ? S.used : S.block, Math.round(b.x), Math.round(b.y)));
    things.filter((t) => t.kind === "enemy").forEach((e) => {
      const bob = e.sprite === "smog" ? Math.sin((worldX + e.bob * 40) / 18) * 2 : 0;
      ctx.drawImage(S[e.sprite], Math.round(e.x), Math.round(groundY - e.h + bob));
    });
    fx.forEach((f) => {
      if (f.kind === "coin") ctx.drawImage(S.coin, Math.round(f.x), Math.round(f.y));
      else if (f.kind === "leaf") ctx.drawImage(S.leaf, Math.round(f.x), Math.round(f.y));
      else if (f.kind === "spark") { ctx.fillStyle = "#fff6a8"; ctx.fillRect(f.x, f.y, 3, 3); }
      else if (f.kind === "squash") { ctx.globalAlpha = Math.max(0, f.life / 400); ctx.drawImage(S[f.sprite], f.x, f.y - f.h * 0.35, f.w, f.h * 0.35); ctx.globalAlpha = 1; }
    });
    if (!(hero.blink > 0 && Math.floor(hero.blink / 100) % 2)) {
      const img = hero.state === "dead" ? S.hurt : (!hero.onGround ? S.run1 : (Math.floor(hero.t / 110) % 2 ? S.run1 : S.run2));
      if (starT > 0) { ctx.shadowColor = "#ffd23e"; ctx.shadowBlur = 14; }
      if (hero.state === "dead") { ctx.save(); ctx.translate(hero.x, hero.y + hero.h); ctx.scale(1, -1); ctx.drawImage(img, 0, 0); ctx.restore(); }
      else ctx.drawImage(img, Math.round(hero.x), Math.round(hero.y));
      ctx.shadowBlur = 0;
    }
  }

  function frame(ts) {
    const dt = Math.min(40, last ? ts - last : 16);
    last = ts;
    if (!document.hidden) { step(dt); draw(ts); }
    requestAnimationFrame(frame);
  }
  if (reduce) draw(0); else requestAnimationFrame(frame);
})();
