// Quiz settings. Edit these values; no other file needs to change.
window.QUIZ_CONFIG = {
  // Day shown first. Trainees can switch to day 2 or 3.
  defaultDay: 1,

  // Seconds allowed per question.
  secondsPerQuestion: 30,

  // Points for a correct answer, before bonuses.
  basePoints: 100,

  // Extra points for speed: up to this much, scaled by the time left.
  maxSpeedBonus: 100,

  // An answer counts as "fast" (keeps the combo alive) if given within this many seconds.
  comboWindowSeconds: 12,

  // Combo multiplier: 1 + comboStep x (streak - 1), capped at comboMax.
  comboStep: 0.25,
  comboMax: 3,

  // Points by question level (multiplies basePoints).
  levelWeight: { easy: 1, medium: 1.5, hard: 2 },

  // Optional: send each finished result to Firebase Firestore (REST).
  // Leave apiKey empty to keep everything on the trainee's device only.
  firebase: {
    apiKey: "",
    projectId: "",
    collection: "gb_quiz_results"
  }
};
