// backend/models/competition.js
// Simple in‑memory competition definition

class Competition {
  constructor({ id, title, description, startDate, endDate, maxParticipants, ticketPrice, prizePool, difficulty, videoRequired, challenge }) {
    this.id = id; // unique identifier
    this.title = title;
    this.description = description;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.maxParticipants = maxParticipants;
    this.ticketPrice = ticketPrice; // in euros
    this.prizePool = prizePool; // in euros
    this.difficulty = difficulty; // e.g., "easy", "medium", "hard"
    this.videoRequired = !!videoRequired;
    this.challenge = challenge; // description of the challenge (e.g., "Push‑ups 1 minute")
    this.participants = []; // array of competitionEntry ids
  }
}

module.exports = Competition;
