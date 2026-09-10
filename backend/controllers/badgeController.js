// backend/controllers/badgeController.js
// Simple badge evaluation logic using in‑memory store.
// Badge types: seniority, consistency, elite, prestige, legend.
// For repeatable badges (e.g., legend), we store a `count` field.

const store = require('../data/store');
const { v4: uuidv4 } = require('uuid');

// Helper to add or increment a badge for a user
function awardBadge(userId, type) {
  const existing = store.badges.find(b => b.userId === userId && b.type === type);
  const now = new Date();
  if (existing) {
    existing.count += 1;
    existing.unlockDate = now;
  } else {
    store.badges.push({
      id: uuidv4(),
      userId,
      type,
      count: 1,
      unlockDate: now,
    });
  }
}

// Get all badges for a given user
function getUserBadges(req, res) {
  const { userId } = req.params;
  const badges = store.badges.filter(b => b.userId === userId);
  res.json(badges);
}

// Evaluate badges for all users – called manually or via a cron job.
function evaluateBadges(req, res) {
  // Seniority badge – 30 days member
  const now = new Date();
  store.users.forEach(user => {
    const days = (now - new Date(user.registrationDate)) / (1000 * 60 * 60 * 24);
    if (days >= 30) awardBadge(user.id, 'seniority');
  });

  // Consistency badge – we don't have daily login data; placeholder
  // Elite badge – top 100 in any competition (based on leaderboard)
  store.competitions.forEach(comp => {
    const entries = comp.participants
      .map(id => store.entries.find(e => e.id === id))
      .filter(e => e && typeof e.performance === 'number')
      .sort((a, b) => b.performance - a.performance);
    entries.slice(0, 100).forEach(e => awardBadge(e.userId, 'elite'));
  });

  // Prestige badge – top 3 in any competition
  store.competitions.forEach(comp => {
    const entries = comp.participants
      .map(id => store.entries.find(e => e.id === id))
      .filter(e => e && typeof e.performance === 'number')
      .sort((a, b) => b.performance - a.performance);
    entries.slice(0, 3).forEach(e => awardBadge(e.userId, 'prestige'));
  });

  // Legend badge – first place in any competition
  store.competitions.forEach(comp => {
    const winner = comp.participants
      .map(id => store.entries.find(e => e.id === id))
      .filter(e => e && typeof e.performance === 'number')
      .sort((a, b) => b.performance - a.performance)[0];
    if (winner) awardBadge(winner.userId, 'legend');
  });

  res.json({ message: 'Badges evaluated', totalBadges: store.badges.length });
}

module.exports = { getUserBadges, evaluateBadges };
