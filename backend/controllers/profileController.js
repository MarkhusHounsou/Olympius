// backend/controllers/profileController.js
// Handles user profile and statistical comparison (average) for a demographic bucket.

const store = require('../data/store');
const { v4: uuidv4 } = require('uuid');

// Helper to find a user profile by id
function getProfile(req, res) {
  const { id } = req.params;
  const user = store.users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}

// Create or update a profile (id is optional – if provided, update; else create new)
function upsertProfile(req, res) {
  const { id, gender, age, height, weight } = req.body;
  if (id) {
    const existing = store.users.find(u => u.id === id);
    if (!existing) return res.status(404).json({ error: 'User not found' });
    existing.gender = gender ?? existing.gender;
    existing.age = age ?? existing.age;
    existing.height = height ?? existing.height;
    existing.weight = weight ?? existing.weight;
    return res.json(existing);
  }
  const newUser = {
    id: uuidv4(),
    gender,
    age,
    height,
    weight,
    registrationDate: new Date(),
  };
  store.users.push(newUser);
  res.status(201).json(newUser);
}

// Compute the average performance for a given challenge across a demographic bucket.
// bucketKey = {gender, ageRange, heightRange, weightRange}
function getStatComparison(req, res) {
  const { userId, challenge } = req.query; // challenge identifier (e.g., "pushup-1min")
  const user = store.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  // Simple bucket: same gender, +/- 2 years age, +/- 5 cm height, +/- 5 kg weight
  const bucket = store.entries.filter(e => {
    const entryUser = store.users.find(u => u.id === e.userId);
    if (!entryUser) return false;
    if (entryUser.gender !== user.gender) return false;
    if (Math.abs(entryUser.age - user.age) > 2) return false;
    if (Math.abs(entryUser.height - user.height) > 5) return false;
    if (Math.abs(entryUser.weight - user.weight) > 5) return false;
    // Assume entry.performance relates to the same challenge; in a real app we'd store challenge id.
    return true;
  }).map(e => e.performance).filter(p => typeof p === 'number');

  if (bucket.length < 20) {
    return res.json({ message: 'Not enough data for statistical comparison' });
  }
  const sum = bucket.reduce((a, b) => a + b, 0);
  const avg = sum / bucket.length;
  const userEntry = store.entries.find(e => e.userId === userId && e.competitionId === challenge);
  const userPerf = userEntry ? userEntry.performance : null;
  const diffPct = userPerf !== null ? ((userPerf - avg) / avg) * 100 : null;
  res.json({ average: avg, userPerformance: userPerf, diffPercent: diffPct });
}

module.exports = { getProfile, upsertProfile, getStatComparison };
