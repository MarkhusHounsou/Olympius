// backend/controllers/leagueController.js
// Simple league and season logic using in‑memory store.
// Tiers: Bronze, Silver, Gold, Platinum, Diamond, Olympus
// Points are accumulated from competition performances (e.g., performance value).

const store = require('../data/store');
const { v4: uuidv4 } = require('uuid');

// Tier thresholds (points needed to reach tier). Adjust as needed.
const TIER_ORDER = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Olympus'];
const TIER_THRESHOLDS = {
  Bronze: 0,
  Silver: 500,
  Gold: 1500,
  Platinum: 3000,
  Diamond: 6000,
  Olympus: 10000,
};

function getTierForPoints(points) {
  // Find highest tier where points >= threshold
  let tier = 'Bronze';
  for (const t of TIER_ORDER) {
    if (points >= TIER_THRESHOLDS[t]) tier = t;
  }
  return tier;
}

// Get league info for a user (current tier, points, rank)
function getUserLeague(req, res) {
  const { userId } = req.params;
  const record = store.leagues.find(l => l.userId === userId);
  if (!record) return res.status(404).json({ error: 'League record not found' });
  res.json(record);
}

// Evaluate leagues – compute points from competition entries and update tiers.
function evaluateLeagues(req, res) {
  // Reset points
  store.leagues = [];

  // Aggregate points per user from entries (simple: performance value as points)
  const pointsMap = {};
  store.entries.forEach(entry => {
    if (typeof entry.performance === 'number') {
      pointsMap[entry.userId] = (pointsMap[entry.userId] || 0) + entry.performance;
    }
  });

  // Create/Update league records
  Object.entries(pointsMap).forEach(([userId, points]) => {
    const tier = getTierForPoints(points);
    const record = {
      id: uuidv4(),
      userId,
      seasonId: 'current', // placeholder; in a real app you'd manage seasons
      tier,
      points,
      rank: null, // will be set after sorting
    };
    store.leagues.push(record);
  });

  // Compute ranks within each tier (overall ranking by points desc)
  const sorted = [...store.leagues].sort((a, b) => b.points - a.points);
  sorted.forEach((rec, idx) => {
    rec.rank = idx + 1;
  });

  res.json({ message: 'Leagues evaluated', totalUsers: sorted.length });
}

module.exports = { getUserLeague, evaluateLeagues };
