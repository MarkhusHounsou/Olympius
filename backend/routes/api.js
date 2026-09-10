// backend/routes/api.js
// Central API router for Olympius backend.

const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/profileController');
const competitionCtrl = require('../controllers/competitionController');
const badgeCtrl = require('../controllers/badgeController');
const leagueCtrl = require('../controllers/leagueController');

// ----- Profile routes -----
router.get('/profile/:id', profileCtrl.getProfile);
router.post('/profile', profileCtrl.upsertProfile); // create new profile
router.put('/profile/:id', profileCtrl.upsertProfile); // update existing profile
router.get('/profile/:id/comparison', profileCtrl.getStatComparison);

// ----- Competition routes -----
router.get('/competitions', competitionCtrl.listCompetitions);
router.post('/competitions', competitionCtrl.createCompetition); // admin create
router.post('/competitions/:id/join', competitionCtrl.joinCompetition);
router.post('/competitions/:id/submit', competitionCtrl.submitEntry);
router.get('/competitions/:id/leaderboard', competitionCtrl.getLeaderboard);

// ----- Badge routes -----
router.get('/badges/:userId', badgeCtrl.getUserBadges);
router.post('/badges/evaluate', badgeCtrl.evaluateBadges); // trigger evaluation (admin or cron)

// ----- League routes -----
router.get('/league/:userId', leagueCtrl.getUserLeague);
router.post('/league/evaluate', leagueCtrl.evaluateLeagues);

module.exports = router;
