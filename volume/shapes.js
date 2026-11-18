// Isometric SVG figures for the five questions. No external assets.
(function () {
  const C30 = Math.cos(Math.PI / 6), S30 = 0.5;
  const INK = "#1F2D4D", BLUE = "#4F86B5", BLUE_D = "#2F6690", BLUE_L = "#8DB6D9",
        OR = "#E07A1F", OR_D = "#B65F14", OR_L = "#F4B27A", GREY = "#B9C1CC", GREY_D = "#8A94A3", GREY_L = "#DCE1E8";

  function P(x, y, z, s) { return [(x - y) * C30 * s, (x + y) * S30 * s - z * s]; }
  function poly(pts, fill, extra) {
    return `<polygon points="${pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round" ${extra || ""}/>`;
  }
  function label(x, y, t, anchor, size, color) {
    return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${size || 12}" font-weight="600" fill="${color || INK}" text-anchor="${anchor || "middle"}" font-family="Inter,Segoe UI,Arial,sans-serif">${t}</text>`;
  }
  // Iso box with its three visible faces plus dimension labels.
  function box(dx, dy, dz, s, cols, dims) {
    const top = [P(0, 0, dz, s), P(dx, 0, dz, s), P(dx, dy, dz, s), P(0, dy, dz, s)];
    const right = [P(dx, 0, 0, s), P(dx, dy, 0, s), P(dx, dy, dz, s), P(dx, 0, dz, s)];
    const left = [P(0, dy, 0, s), P(dx, dy, 0, s), P(dx, dy, dz, s), P(0, dy, dz, s)];
    let g = poly(left, cols[0]) + poly(right, cols[1]) + poly(top, cols[2]);
    if (dims) {
      const a = P(dx / 2, dy, 0, s), b = P(dx, dy / 2, 0, s), c = P(dx, 0, dz / 2, s);
      g += label(a[0] - 8, a[1] + 16, dims[0], "end");
      g += label(b[0] + 8, b[1] + 16, dims[1], "start");
      g += label(c[0] + 8, c[1] + 4, dims[2], "start");
    }
    return g;
  }
  function cyl(cx, by, r, h, ry, cols, extraTop) {
    const ty = by - h;
    return `<path d="M${cx - r},${ty} L${cx - r},${by} A${r},${ry} 0 0 0 ${cx + r},${by} L${cx + r},${ty} Z" fill="${cols[0]}" stroke="${INK}" stroke-width="1.2"/>` +
      `<ellipse cx="${cx}" cy="${ty}" rx="${r}" ry="${ry}" fill="${cols[1]}" stroke="${INK}" stroke-width="1.2"/>` + (extraTop || "");
  }
  function svg(w, h, body) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
  }
  const ground = (w, y) => `<line x1="10" y1="${y}" x2="${w - 10}" y2="${y}" stroke="${GREY_L}" stroke-width="2"/>`;

  window.FIGURES = {
    cabins: () => svg(380, 230,
      ground(380, 214) +
      `<g transform="translate(100,160)">${box(10, 10, 10, 5, [BLUE, BLUE_D, BLUE_L], ["10 m", "10 m", "10 m"])}</g>` +
      label(100, 85, "A", "middle", 20) +
      `<g transform="translate(250,135)">${box(20, 10, 5, 5, [OR, OR_D, OR_L], ["20 m", "10 m", "5 m"])}</g>` +
      label(230, 85, "B", "middle", 20)),

    tanks: () => svg(380, 240,
      ground(380, 226) +
      cyl(100, 210, 40.5, 72, 13, [BLUE, BLUE_L]) +
      `<line x1="59.5" y1="138" x2="140.5" y2="138" stroke="${INK}" stroke-dasharray="4 3"/>` +
      label(100, 133, "9 m") + label(150, 180, "8 m", "start") + label(100, 108, "A", "middle", 20) +
      `<g transform="translate(250,172)">${box(10, 3, 16, 8, [OR, OR_D, OR_L], ["10 m", "3 m", "16 m"])}</g>` +
      label(235, 22, "B", "middle", 20)),

    tower: () => svg(380, 260,
      ground(380, 246) +
      cyl(190, 228, 70, 175, 22, [GREY, GREY_L],
        `<ellipse cx="190" cy="53" rx="22.5" ry="7" fill="${OR}" stroke="${INK}" stroke-width="1.2"/>`) +
      `<line x1="120" y1="53" x2="260" y2="53" stroke="${INK}" stroke-dasharray="4 3"/>` +
      label(305, 40, "14 m", "middle") + label(300, 64, "core 4.5 m", "middle", 12, OR_D) +
      `<line x1="212" y1="56" x2="262" y2="64" stroke="${OR_D}"/>` +
      label(272, 150, "28 m", "start")),

    columns: () => svg(380, 240,
      ground(380, 226) +
      cyl(110, 205, 42, 150, 13, [GREY, GREY_L]) +
      `<line x1="68" y1="55" x2="152" y2="55" stroke="${INK}" stroke-dasharray="4 3"/>` +
      label(110, 48, "1.5 m") + label(162, 140, "3 m", "start") + label(110, 24, "Round", "middle", 15) +
      `<g transform="translate(270,205)">${box(1.5, 1.5, 3, 47, [GREY, GREY_D, GREY_L], ["1.5 m", "1.5 m", "3 m"])}</g>` +
      label(270, 24, "Square", "middle", 15)),

    cone: (reveal) => svg(380, 260,
      ground(380, 246) +
      `<path d="M120,226 L190,30 L260,226 A70,18 0 0 1 120,226 Z" fill="${GREY_L}" stroke="${INK}" stroke-width="1.2"/>` +
      `<path d="M155,128 L190,30 L225,128 A35,9 0 0 1 155,128 Z" fill="${reveal ? OR : OR_L}" stroke="${INK}" stroke-width="1.2"/>` +
      `<line x1="120" y1="128" x2="260" y2="128" stroke="${INK}" stroke-dasharray="5 4"/>` +
      `<line x1="120" y1="226" x2="260" y2="226" stroke="${INK}" stroke-dasharray="4 3"/>` +
      label(190, 242, "6 m") + label(290, 132, "10 m", "start") +
      `<line x1="280" y1="30" x2="280" y2="226" stroke="${INK}"/>` +
      `<line x1="100" y1="30" x2="100" y2="128" stroke="${OR_D}"/>` + label(92, 84, "5 m", "end", 12, OR_D) +
      (reveal ? label(190, 105, "⅛", "middle", 22, "#fff") + label(190, 190, "⅞", "middle", 26, INK) : ""))
  };
  window.FIGURES.gable = () => svg(380, 240, ground(380, 226) +
    `<g transform="translate(170,150)">` +
      poly([P(0,15,0,6),P(11,15,0,6),P(11,15,14,6),P(5.5,15,19,6),P(0,15,14,6)], BLUE) +
      poly([P(11,0,0,6),P(11,15,0,6),P(11,15,14,6),P(11,0,14,6)], BLUE_D) +
      poly([P(11,0,14,6),P(11,15,14,6),P(5.5,15,19,6),P(5.5,0,19,6)], OR_L) +
    `</g>` + label(118, 222, "11 m") + label(300, 205, "15 m", "start") + label(90, 160, "14 m", "end") + label(110, 70, "roof +5 m", "end", 12, OR_D));
  window.FIGURES.vault = () => svg(380, 240, ground(380, 226) +
    `<rect x="110" y="140" width="160" height="86" fill="${BLUE}" stroke="${INK}" stroke-width="1.2"/>` +
    `<path d="M110,140 A80,80 0 0 1 270,140 Z" fill="${OR_L}" stroke="${INK}" stroke-width="1.2"/>` +
    `<line x1="190" y1="140" x2="270" y2="140" stroke="${OR_D}" stroke-dasharray="4 3"/>` +
    label(230, 134, "r = 3 m", "middle", 12, OR_D) + label(190, 244, "6 m") + label(100, 188, "5 m", "end") +
    label(190, 190, "length 12 m", "middle", 13, "#fff"));
  window.FIGURES.silo = () => svg(380, 260, ground(380, 246) +
    cyl(190, 230, 50, 130, 14, [BLUE, BLUE_L]) +
    `<path d="M140,100 L190,30 L240,100 A50,14 0 0 1 140,100 Z" fill="${OR}" stroke="${INK}" stroke-width="1.2"/>` +
    `<line x1="190" y1="100" x2="240" y2="100" stroke="#fff" stroke-dasharray="4 3"/>` +
    label(215, 95, "3 m", "middle", 12, "#fff") + label(252, 170, "10 m", "start") + label(250, 64, "4 m", "start", 12, OR_D));
  window.FIGURES.cubetower = () => svg(380, 260, ground(380, 246) +
    `<g transform="translate(110,190)">${box(10, 10, 10, 4.4, [BLUE, BLUE_D, BLUE_L], ["10 m", "10 m", "10 m"])}</g>` +
    `<g transform="translate(275,218)">${box(5, 5, 40, 4.4, [OR, OR_D, OR_L], ["5 m", "5 m", "40 m"])}</g>` +
    label(110, 120, "Cube", "middle", 15) + label(275, 30, "", "middle", 15));

})();
