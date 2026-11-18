// Five "trust your eyes?" questions. Edit text or numbers here only.
window.VQ_CONFIG = {
  seconds: 25,
  basePoints: 100,
  maxSpeedBonus: 100,
  rootPath: "volquiz",
  firebase: {
    apiKey: "AIzaSyBAqogoxcPUGH2F0ENLzsBhhkuIZ6m6Phk",
    authDomain: "test-7f3ce.firebaseapp.com",
    databaseURL: "https://test-7f3ce-default-rtdb.firebaseio.com",
    projectId: "test-7f3ce",
    storageBucket: "test-7f3ce.firebasestorage.app",
    messagingSenderId: "839624642570",
    appId: "1:839624642570:web:93e195012ffe4ee5374ff3"
  }
};

// trap = the answer the eye usually picks.
window.VQ_QUESTIONS = [
  {
    id: "q1", fig: "cabins", topic: "Site cabins",
    q: "Cabin A is 10 × 10 × 10 m. Cabin B is 20 × 10 × 5 m. Which statement is true?",
    options: ["B holds more space", "Same space, same cladding", "Same space, but B needs more cladding", "A needs more cladding"],
    answer: 2, trap: 0,
    why: "Both hold 1,000 m³. But A's skin is 600 m² and B's is 700 m²: the same space costs 17% more cladding and lets in more heat."
  },
  {
    id: "q2", fig: "tanks", topic: "Water tanks",
    q: "Tank A: cylinder, 9 m wide, 8 m high. Tank B: box, 10 × 3 × 16 m. Which holds more water?",
    options: ["A, the wide cylinder", "B, the tall box", "They hold the same"],
    answer: 0, trap: 1,
    why: "A: π × 4.5² × 8 ≈ 509 m³. B: 10 × 3 × 16 = 480 m³. Height fools the eye; width counts twice."
  },
  {
    id: "q3", fig: "tower", topic: "Tower core",
    q: "The tower is 14 m across with a 4.5 m hollow core. What share of the tower's volume is the core?",
    options: ["About 10%", "About 20%", "About a third", "About half"],
    answer: 0, trap: 2,
    why: "(4.5 ÷ 14)² ≈ 0.10. The core looks like a third of the width, but area grows with the square, so it takes only about 10%."
  },
  {
    id: "q4", fig: "columns", topic: "Columns",
    q: "A round column 1.5 m across and a square column 1.5 × 1.5 m, both 3 m high. How much less concrete does the round one use?",
    options: ["Almost the same", "About 10% less", "About 21% less", "About 50% less"],
    answer: 2, trap: 0,
    why: "Square: 6.75 m³. Round: π × 0.75² × 3 ≈ 5.3 m³. A circle fills only π/4 ≈ 79% of its square."
  },
  {
    id: "q5", fig: "cone", topic: "Cone roof",
    q: "Cut the conical roof halfway up its height. What fraction of the roof's volume is in the top half?",
    options: ["½", "⅓", "¼", "⅛"],
    answer: 3, trap: 0,
    why: "The top half is a cone at half the size: ½ × ½ × ½ = ⅛ of the volume (11.8 of 94.2 m³). The bottom half holds ⅞."
  }
];
