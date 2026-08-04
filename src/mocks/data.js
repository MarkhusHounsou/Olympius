export const currentUser = {
  firstName: 'Alex',
  username: 'alex_olympe',
  level: 38,
  points: 47500,
  nextLevelPoints: 50000,
  rank: 8,
  totalRanked: 78,
};

export const challenges = [
  {
    id: 'squats',
    title: 'Faire 30 squats en 1 minute',
    shortDescription: 'Réalise le nombre de 30 squats dans une limite de temps impartie de 1 minute.',
    category: 'FORCE',
    icon: 'barbell-outline',
    timer: '01 : 25 : 17',
    points: 500,
    participants: 112,
    active: true,
  },
  {
    id: 'run',
    title: 'Courir 2 km en 45 minutes',
    shortDescription: 'Cours une distance de 2 km dans une limite de temps impartie de 45 minutes.',
    category: 'CARDIO',
    icon: 'heart-half-outline',
    timer: '02 : 13 : 17',
    points: 700,
    participants: 86,
    active: true,
  },
  {
    id: 'pullups',
    title: 'Maximum traction en 1 minute',
    shortDescription: 'Réalise un maximum de répétitions dans une limite de temps de 1 minute.',
    category: 'FORCE',
    icon: 'barbell-outline',
    timer: '14 : 49 : 05',
    points: 700,
    participants: 64,
    active: false,
  },
  {
    id: 'plank',
    title: 'Planche statique 2 minutes',
    shortDescription: 'Tiens une planche complète et stable pendant 2 minutes.',
    category: 'FORCE',
    icon: 'body-outline',
    timer: '1 jour',
    points: 600,
    participants: 49,
    active: false,
  },
  {
    id: 'burpees',
    title: '20 burpees sans pause',
    shortDescription: 'Enchaîne 20 burpees contrôlés, avec une amplitude complète.',
    category: 'CARDIO',
    icon: 'flash-outline',
    timer: '2 jours',
    points: 900,
    participants: 95,
    active: false,
  },
];

export const passLevels = [
  { level: 42, points: 65000 },
  { level: 41, points: 57500 },
  { level: 40, points: 55000, sponsor: 'GYMSHARK' },
  { level: 39, points: 50000 },
  { level: 38, points: 47500, current: true },
  { level: 37, points: 42500 },
  { level: 36, points: 39000, sponsor: 'NIKE TRAINING' },
  { level: 35, points: 35000 },
];

export const ranking = [
  ['1', 'MayaRush', 42, 980], ['2', 'Noah.fit', 41, 900], ['3', 'LinaPower', 40, 860],
  ['4', 'Sami_Paris', 40, 820], ['5', 'Juleslift', 39, 790], ['6', 'AnaMove', 39, 760],
  ['7', 'Tom_Hybrid', 38, 730], ['8', 'alex_olympe', 38, 700], ['9', 'LeaStrong', 38, 680],
  ['10', 'ClemSprint', 37, 640], ['11', 'Milo.training', 37, 620], ['12', 'Mia.run', 36, 600],
  ['13', 'OwenForce', 36, 580], ['14', 'ZoeActive', 35, 540], ['15', 'HugoMotion', 35, 510],
].map(([rank, username, level, points]) => ({ rank: Number(rank), username, level, points }));

export const notifications = [
  { id: 'challenge', title: 'Un nouveau défi commence !', detail: 'Les 30 squats sont ouverts pendant encore 1 h 25.' },
  { id: 'profile', title: 'Complétez votre profil', detail: 'Ajoutez votre salle partenaire pour gagner en visibilité.' },
];
