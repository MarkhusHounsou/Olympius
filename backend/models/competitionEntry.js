// backend/models/competitionEntry.js
// Represents a user's entry in a competition.

class CompetitionEntry {
  constructor({ id, userId, competitionId, videoUrl, performance, status = 'pending' }) {
    this.id = id; // unique identifier
    this.userId = userId;
    this.competitionId = competitionId;
    this.videoUrl = videoUrl; // may be null if video not required
    this.performance = performance; // numeric metric (e.g., repetitions)
    this.status = status; // 'pending', 'validated', 'rejected'
  }
}

module.exports = CompetitionEntry;
