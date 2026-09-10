// backend/models/userProfile.js
// Simple in‑memory model for a user profile. In a real app this would be a DB schema.

class UserProfile {
  constructor({ id, gender, age, height, weight, registrationDate }) {
    this.id = id; // unique identifier (e.g., UUID)
    this.gender = gender; // "male" | "female" | "other"
    this.age = age; // years
    this.height = height; // cm
    this.weight = weight; // kg
    this.registrationDate = registrationDate || new Date();
  }
}

module.exports = UserProfile;
