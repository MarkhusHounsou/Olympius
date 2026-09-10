export const CHALLENGE_CATEGORIES = [
  { id: 'FORCE', label: 'Force', emoji: '💪', icon: 'barbell-outline' },
  { id: 'CARDIO', label: 'Cardio', emoji: '🏃', icon: 'heart-outline' },
  { id: 'MOBILITE', label: 'Mobilité', emoji: '🧘', icon: 'body-outline' },
  { id: 'ENDURANCE', label: 'Endurance', emoji: '🔥', icon: 'flame-outline' },
  { id: 'RAPIDE', label: 'Rapide', emoji: '⚡', icon: 'flash-outline' },
  { id: 'MUSCULATION', label: 'Musculation', emoji: '🏋️', icon: 'fitness-outline' },
];

export const currentUser = {
  firstName: 'Markhus',
  username: 'markhus',
  memberSince: '14 mai 2026',
  level: 12,
  xp: 2550,
  nextLevelXp: 3000,
  rank: 248,
  totalRanked: 1250,
  streak: 7,
  stats: {
    completed: 47,
    succeeded: 38,
    totalXp: 12450,
    bestPerformance: '52 pompes',
    streak: 7,
  },
  earnedBadgeIds: ['member', 'consistency', 'elite', 'prestige', 'legend', '50-pompes'],
  bestChallenges: [
    { title: '50 Pompes', result: '52 pompes', xp: 100, date: 'Hier', icon: 'barbell-outline' },
    { title: '5 KM', result: '5,2 km parcourus', xp: 700, date: '3 j', icon: 'heart-outline' },
    { title: 'Planche 2 min', result: '2:04 tenu', xp: 600, date: '5 j', icon: 'flame-outline' },
    { title: '500 kcal', result: '518 kcal brûlées', xp: 550, date: '1 sem.', icon: 'flame-outline' },
  ],
};

export const challenges = [
  {
    id: 'pushups-daily',
    title: '50 POMPES',
    shortTitle: '50 POMPES',
    shortDescription: 'Réaliser 50 pompes avant la fin du défi.',
    instructions: 'Garde le corps aligné, descends jusqu\'à ce que ta poitrine frôle le sol, puis pousse fort. Chaque répétition doit être complète.',
    category: 'FORCE',
    icon: 'barbell-outline',
    timer: '14h32',
    points: 100,
    participants: 312,
    active: true,
    featured: true,
    difficulty: 3,
    metricType: 'reps',
    target: 50,
    unit: 'pompes',
  },
  {
    id: 'squats',
    title: '30 SQUATS EN 1 MINUTE',
    shortTitle: '30 SQUATS',
    shortDescription: 'Réalise 30 squats dans une limite de 1 minute.',
    instructions: 'Descends jusqu\'à ce que tes cuisses soient parallèles au sol. Garde le dos droit et le regard devant.',
    category: 'FORCE',
    icon: 'barbell-outline',
    timer: '01h25',
    points: 500,
    participants: 112,
    active: true,
    difficulty: 2,
    metricType: 'reps',
    target: 30,
    unit: 'squats',
  },
  {
    id: 'run',
    title: 'COURIR 5 KM',
    shortTitle: '5 KM',
    shortDescription: 'Cours une distance de 5 km avant la fin du défi.',
    instructions: 'Tu peux courir ou marcher vite. Enregistre ta distance totale parcourue.',
    category: 'CARDIO',
    icon: 'heart-half-outline',
    timer: '02h13',
    points: 700,
    participants: 86,
    active: true,
    difficulty: 4,
    metricType: 'distance',
    target: 5,
    unit: 'km',
  },
  {
    id: 'plank',
    title: 'PLANCHE 2 MINUTES',
    shortTitle: 'PLANCHE 2 MIN',
    shortDescription: 'Tiens une planche complète et stable pendant 2 minutes.',
    instructions: 'Corps aligné, abdos engagés. Ne laisse pas les hanches s\'affaisser.',
    category: 'ENDURANCE',
    icon: 'body-outline',
    timer: '18h32',
    points: 600,
    participants: 49,
    active: true,
    difficulty: 3,
    metricType: 'time',
    target: 120,
    unit: 'sec',
  },
  {
    id: 'pullups',
    title: 'MAX TRACTIONS EN 1 MINUTE',
    shortTitle: 'MAX TRACTIONS',
    shortDescription: 'Réalise un maximum de tractions en 1 minute.',
    instructions: 'Mouvement complet : menton au-dessus de la barre, bras tendus en bas.',
    category: 'MUSCULATION',
    icon: 'barbell-outline',
    timer: '14h49',
    points: 700,
    participants: 64,
    active: false,
    difficulty: 4,
    metricType: 'reps',
    target: 20,
    unit: 'tractions',
  },
  {
    id: 'burpees',
    title: '20 BURPEES SANS PAUSE',
    shortTitle: '20 BURPEES',
    shortDescription: 'Enchaîne 20 burpees contrôlés, avec une amplitude complète.',
    instructions: 'Pompes, saut, enchaînement fluide. Pas de pause entre les répétitions.',
    category: 'RAPIDE',
    icon: 'flash-outline',
    timer: '1 jour',
    points: 900,
    participants: 95,
    active: false,
    difficulty: 5,
    metricType: 'reps',
    target: 20,
    unit: 'burpees',
  },
  {
    id: 'stretch',
    title: '15 MIN DE MOBILITÉ',
    shortTitle: '15 MIN MOBILITÉ',
    shortDescription: 'Réalise 15 minutes de travail de mobilité.',
    instructions: 'Étirements dynamiques et statiques. Couvre hanches, épaules et chevilles.',
    category: 'MOBILITE',
    icon: 'body-outline',
    timer: '2 jours',
    points: 400,
    participants: 41,
    active: false,
    difficulty: 1,
    metricType: 'time',
    target: 900,
    unit: 'sec',
  },
  {
    id: 'calories',
    title: 'BRÛLER 500 KCAL',
    shortTitle: '500 KCAL',
    shortDescription: 'Brûle 500 calories lors de ta séance.',
    instructions: 'Toute activité cardio ou HIIT compte. Indique les calories estimées.',
    category: 'CARDIO',
    icon: 'flame-outline',
    timer: '6h00',
    points: 550,
    participants: 73,
    active: true,
    difficulty: 3,
    metricType: 'calories',
    target: 500,
    unit: 'kcal',
  },
];

export const badges = [
  { id: '50-pompes', name: '50 Pompes', emoji: '🏅', category: 'performance', description: 'Réalise 50 pompes en un défi.' },
  { id: '100-pompes', name: '100 Pompes', emoji: '🏅', category: 'performance', description: 'Réalise 100 pompes en un défi.' },
  { id: '500-pompes', name: '500 Pompes', emoji: '🏅', category: 'performance', description: 'Réalise 500 pompes cumulées.' },
  { id: 'member', name: 'Ancienneté', emoji: '🏅', category: 'anciennete', description: 'Membre depuis le 14 mai 2026.', detail: 'Membre depuis le 14 mai 2026' },
  { id: 'consistency', name: 'Constance', emoji: '🔥', category: 'regularite', description: 'Maintiens une série active de défis.', detail: '7 jours consécutifs' },
  { id: '7-jours', name: '7 Jours', emoji: '🔥', category: 'regularite', description: '7 jours consécutifs de défis.' },
  { id: '30-jours', name: '30 Jours', emoji: '🔥', category: 'regularite', description: '30 jours consécutifs de défis.' },
  { id: '100-jours', name: '100 Jours', emoji: '🔥', category: 'regularite', description: '100 jours consécutifs de défis.' },
  { id: 'top-100', name: 'Top 100', emoji: '⭐', category: 'competition', description: 'Atteins le top 100 du classement.' },
  { id: 'top-3', name: 'Top 3', emoji: '🏆', category: 'competition', description: 'Termine sur le podium.' },
  { id: 'first', name: '1er', emoji: '👑', category: 'competition', description: 'Termine premier d\'un défi.' },
  { id: 'elite', name: 'Elite', emoji: '⭐', category: 'prestige', description: 'Atteins le Top 100 au moins une fois.', count: 1, detail: 'Top 100 atteint' },
  { id: 'prestige', name: 'Prestige', emoji: '🏆', category: 'prestige', description: 'Termine Top 3 au moins une fois.', count: 2, detail: 'Podium × 2' },
  { id: 'legend', name: 'Legend', emoji: '👑', category: 'prestige', description: 'Termine premier d\'un défi ou d\'une compétition.', count: 7, detail: 'Victoires × 7' },
];

export const streakDays = [
  { day: 'L', active: true },
  { day: 'M', active: true },
  { day: 'M', active: true },
  { day: 'J', active: true },
  { day: 'V', active: true },
  { day: 'S', active: true },
  { day: 'D', active: true },
];

export const passLevels = [
  { level: 15, xp: 3500, reward: '+200 XP' },
  { level: 14, xp: 3200, reward: 'Badge Mobilité' },
  { level: 13, xp: 3000, reward: '+150 XP', current: true },
  { level: 12, xp: 2550, reward: 'Débloqué', unlocked: true },
  { level: 11, xp: 2200, reward: '+100 XP', unlocked: true },
  { level: 10, xp: 1800, reward: 'Badge Force', unlocked: true, sponsor: 'GYMSHARK' },
];

export const ranking = [
  { rank: 1, username: 'Kai_Gold', level: 15, xp: 2980 },
  { rank: 2, username: 'NinaLift', level: 14, xp: 2850 },
  { rank: 3, username: 'RomainFit', level: 13, xp: 2720 },
  { rank: 4, username: 'LéaPower', level: 13, xp: 2680 },
  { rank: 5, username: 'AxelRun', level: 12, xp: 2610 },
  { rank: 6, username: 'markhus', level: 12, xp: 2550 },
  { rank: 7, username: 'ChloéMove', level: 12, xp: 2490 },
  { rank: 8, username: 'YanForce', level: 11, xp: 2380 },
  { rank: 9, username: 'EmmaSprint', level: 11, xp: 2310 },
  { rank: 10, username: 'LucasHybrid', level: 11, xp: 2250 },
  { rank: 11, username: 'MayaRush', level: 42, xp: 9800 },
  { rank: 2, username: 'Noah.fit', level: 41, xp: 9000 },
  { rank: 3, username: 'LinaPower', level: 40, xp: 8600 },
  { rank: 4, username: 'Sami_Paris', level: 40, xp: 8200 },
  { rank: 5, username: 'Juleslift', level: 39, xp: 7900 },
  { rank: 6, username: 'AnaMove', level: 39, xp: 7600 },
  { rank: 7, username: 'Tom_Hybrid', level: 38, xp: 7300 },
  { rank: 8, username: 'LeaStrong', level: 38, xp: 6800 },
  { rank: 9, username: 'ClemSprint', level: 37, xp: 6400 },
  { rank: 10, username: 'Milo.training', level: 37, xp: 6200 },
  { rank: 11, username: 'Mia.run', level: 36, xp: 6000 },
  { rank: 12, username: 'OwenForce', level: 36, xp: 5800 },
  { rank: 13, username: 'ZoeActive', level: 35, xp: 5400 },
  { rank: 14, username: 'HugoMotion', level: 35, xp: 5100 },
  { rank: 248, username: 'markhus', level: 12, xp: 2550 },
];

export const competitions = [
  {
    id: 'pushup-cup',
    title: 'OLYMPIUS PUSH-UP CUP',
    shortTitle: 'PUSH-UP CUP',
    category: 'Force',
    icon: 'barbell-outline',
    active: true,
    endsIn: '2 jours 14 h',
    startsIn: null,
    participants: 52,
    maxParticipants: 100,
    ticket: '9,99 €',
    prizePool: '1 000 €',
    rewards: '500 € · 300 € · 200 €',
    difficulty: 4,
    challenge: 'Maximum de pompes en 1 minute',
    validation: 'Preuve vidéo obligatoire',
    rules: 'Mouvement complet, caméra fixe de profil, corps entier visible pendant toute la minute.',
    userPerformance: '48 pompes',
    userRank: 18,
    potentialReward: 'Top 25 · Promotion ligue',
  },
  {
    id: 'hyrox-sprint',
    title: 'HYBRID SPRINT',
    shortTitle: 'HYBRID SPRINT',
    category: 'Endurance',
    icon: 'flash-outline',
    active: true,
    endsIn: '5 jours',
    startsIn: null,
    participants: 37,
    maxParticipants: 80,
    ticket: '4,99 €',
    prizePool: '500 €',
    rewards: 'Équipement partenaire · bons d’achat',
    difficulty: 5,
    challenge: 'Circuit 400 m + 40 burpees',
    validation: 'Preuve vidéo obligatoire',
    rules: 'Départ et arrivée doivent rester visibles ; le chronomètre doit être lisible.',
    userPerformance: null,
    userRank: null,
    potentialReward: 'Top 10 · lot exclusif',
  },
  {
    id: 'mobility-open',
    title: 'MOBILITY OPEN',
    shortTitle: 'MOBILITY OPEN',
    category: 'Mobilité',
    icon: 'body-outline',
    active: false,
    endsIn: null,
    startsIn: 'Dans 8 jours',
    participants: 0,
    maxParticipants: 60,
    ticket: 'Gratuit',
    prizePool: 'Badge exclusif',
    rewards: 'Accès au défi final des champions',
    difficulty: 3,
    challenge: 'Flow mobilité de 8 minutes',
    validation: 'Vidéo évaluée par OLYMPIUS',
    rules: 'Les mouvements doivent suivre l’ordre indiqué lors de l’ouverture.',
    userPerformance: null,
    userRank: null,
    potentialReward: 'Top 10 · accès anticipé',
  },
];

export const competitionRankings = {
  'pushup-cup': [
    { rank: 1, username: 'AlexPower', performance: '74 pompes', status: 'Validé', reward: '500 €' },
    { rank: 2, username: 'NinaLift', performance: '71 pompes', status: 'Validé', reward: '300 €' },
    { rank: 3, username: 'LucasStrong', performance: '69 pompes', status: 'Validé', reward: '200 €' },
    { rank: 17, username: 'MaëlleFit', performance: '49 pompes', status: 'Validé', reward: 'Top 25' },
    { rank: 18, username: 'markhus', performance: '48 pompes', status: 'En validation', reward: 'Top 25' },
    { rank: 19, username: 'TomHybrid', performance: '47 pompes', status: 'Validé', reward: '—' },
  ],
  'hyrox-sprint': [
    { rank: 1, username: 'HugoMotion', performance: '08:24', status: 'Validé', reward: '250 €' },
    { rank: 2, username: 'LéaPower', performance: '08:31', status: 'Validé', reward: '150 €' },
    { rank: 3, username: 'Noah.fit', performance: '08:46', status: 'Validé', reward: '100 €' },
  ],
};

export const leagueSeason = {
  name: 'SAISON 1 — ÉTÉ 2026',
  duration: '3 mois',
  endsIn: '4 jours 12 h',
  currentLeague: 'Argent III',
  currentLeagueId: 'silver',
  position: 18,
  totalPlayers: 100,
  points: 1842,
  targetPoints: 2500,
  promotion: { range: 'Top 1–25', label: 'Promotion', detail: 'Reste dans le Top 25 pour passer en Argent II.' },
  stable: { range: 'Top 26–75', label: 'Maintien', detail: 'Ta ligue actuelle est conservée.' },
  relegation: { range: 'Top 76–100', label: 'Relégation', detail: 'Tu descendras d’une division.' },
  nearbyPlayers: [
    { rank: 16, username: 'LénaMove', points: 1918 },
    { rank: 17, username: 'MaëlleFit', points: 1870 },
    { rank: 18, username: 'markhus', points: 1842 },
    { rank: 19, username: 'TomHybrid', points: 1815 },
    { rank: 20, username: 'NoraRun', points: 1792 },
  ],
};

export const performanceBenchmarks = {
  'pushups-daily': {
    average: 41,
    unit: 'pompes',
    sampleSize: 124,
    profileLabel: 'hommes · 25–29 ans · morphologie similaire',
  },
};

export const notifications = [
  { id: 'challenge', title: 'Un nouveau défi commence !', detail: '50 pompes est ouvert pendant encore 14 h 32.' },
  { id: 'streak', title: 'Continue ta série !', detail: 'Plus qu\'un défi pour atteindre 8 jours consécutifs.' },
];

export function getCategoryMeta(categoryId) {
  return CHALLENGE_CATEGORIES.find((item) => item.id === categoryId) || CHALLENGE_CATEGORIES[0];
}

export function getFeaturedChallenge() {
  return challenges.find((item) => item.featured) || challenges[0];
}

export function getCompetition(competitionId) {
  return competitions.find((item) => item.id === competitionId) || competitions[0];
}

export function formatMetricValue(value, challenge) {
  if (challenge.metricType === 'distance') return `${value.toFixed(1).replace('.', ',')} / ${challenge.target} km`;
  if (challenge.metricType === 'time') {
    const fmt = (sec) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
    return `${fmt(value)} / ${fmt(challenge.target)}`;
  }
  if (challenge.metricType === 'calories') return `${value} / ${challenge.target} kcal`;
  return `${value} / ${challenge.target}`;
}

export function formatMetricDisplay(value, challenge) {
  if (challenge.metricType === 'distance') return `${value.toFixed(1).replace('.', ',')} KM`;
  if (challenge.metricType === 'time') {
    const mins = Math.floor(value / 60);
    const secs = value % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  if (challenge.metricType === 'calories') return `${value} KCAL`;
  return `${value} ${challenge.unit.toUpperCase()}`;
}
