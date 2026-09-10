// backend/data/store.js
// In‑memory data store for demo purposes. In production, replace with a real DB.

const store = {
  users: [], // array of UserProfile instances
  competitions: [], // array of Competition instances
  entries: [], // array of CompetitionEntry instances
  badges: [], // array of badge records {userId, type, count, unlockDate}
  leagues: [], // array of league season records {userId, seasonId, tier, points, rank}
};

module.exports = store;
