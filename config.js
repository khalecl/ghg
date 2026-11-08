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

  // A correct answer within this many seconds keeps the combo going.
  comboWindowSeconds: 12,

  // Combo multiplier: 1 + comboStep x (streak - 1), capped at comboMax.
  comboStep: 0.25,
  comboMax: 3,

  // Points by question level (multiplies basePoints).
  levelWeight: { easy: 1, medium: 1.5, hard: 2 },

  // Sound effects on by default (trainees can mute).
  soundOn: true,

  // Live leaderboard and cross-device resume (Firebase Realtime Database).
  // Same project as the Env activities; this quiz uses its own folder (rootPath).
  firebase: {
    apiKey: "AIzaSyBAqogoxcPUGH2F0ENLzsBhhkuIZ6m6Phk",
    authDomain: "test-7f3ce.firebaseapp.com",
    databaseURL: "https://test-7f3ce-default-rtdb.firebaseio.com",
    projectId: "test-7f3ce",
    storageBucket: "test-7f3ce.firebasestorage.app",
    messagingSenderId: "839624642570",
    appId: "1:839624642570:web:93e195012ffe4ee5374ff3"
  },
  rootPath: "gbquiz",

  // Email and mobile are kept on the trainee's device only.
  // Set to true to also save them in the database (readable by anyone who has the database link if its rules are open).
  sendContactDetails: false,

  // How many rows the leaderboard shows.
  leaderboardSize: 10
};
