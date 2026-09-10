// backend/controllers/competitionController.js
// Simple in‑memory competition controller for demo purposes.

const store = require('../data/store');
const { v4: uuidv4 } = require('uuid');

// List all competitions (basic info)
function listCompetitions(req, res) {
  res.json(store.competitions);
}

// Admin creates a new competition
function createCompetition(req, res) {
  const { title, description, startDate, endDate, maxParticipants, ticketPrice, prizePool, difficulty, videoRequired, challenge } = req.body;
  const newComp = {
    id: uuidv4(),
    title,
    description,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    maxParticipants: maxParticipants || 0,
    ticketPrice: ticketPrice || 0,
    prizePool: prizePool || 0,
    difficulty: difficulty || 'medium',
    videoRequired: !!videoRequired,
    challenge: challenge || '',
    participants: [], // list of entry ids
  };
  store.competitions.push(newComp);
  res.status(201).json(newComp);
}

// User joins a competition (creates a pending entry)
function joinCompetition(req, res) {
  const { id } = req.params; // competition id
  const { userId, videoUrl } = req.body; // videoUrl may be null if not required yet
  const comp = store.competitions.find(c => c.id === id);
  if (!comp) return res.status(404).json({ error: 'Competition not found' });

  // Capacity check
  if (comp.maxParticipants && comp.participants.length >= comp.maxParticipants) {
    return res.status(400).json({ error: 'Competition is full' });
  }

  const entry = {
    id: uuidv4(),
    userId,
    competitionId: comp.id,
    videoUrl: comp.videoRequired ? videoUrl || null : null,
    performance: null,
    status: 'pending',
  };
  store.entries.push(entry);
  comp.participants.push(entry.id);
  res.status(201).json(entry);
}

// User submits performance (and optional video) for an existing entry
function submitEntry(req, res) {
  const { id } = req.params; // entry id
  const { performance, videoUrl } = req.body;
  const entry = store.entries.find(e => e.id === id);
  if (!entry) return res.status(404).json({ error: 'Entry not found' });

  entry.performance = performance;
  if (videoUrl) entry.videoUrl = videoUrl;
  entry.status = 'submitted';
  res.json(entry);
}

// Get competition leaderboard sorted by performance (desc)
function getLeaderboard(req, res) {
  const { id } = req.params; // competition id
  const comp = store.competitions.find(c => c.id === id);
  if (!comp) return res.status(404).json({ error: 'Competition not found' });

  const entries = comp.participants
    .map(entryId => store.entries.find(e => e.id === entryId))
    .filter(e => e && typeof e.performance === 'number')
    .sort((a, b) => b.performance - a.performance)
    .map((e, index) => ({
      rank: index + 1,
      userId: e.userId,
      performance: e.performance,
      status: e.status,
    }));
  res.json({ competition: comp.title, leaderboard: entries });
}

module.exports = {
  listCompetitions,
  createCompetition,
  joinCompetition,
  submitEntry,
  getLeaderboard,
};
