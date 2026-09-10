export const LEAGUES = [
  { id: 'bronze', name: 'Bronze', icon: 'shield-outline', color: '#CD7F32', minLevel: 1, maxLevel: 9 },
  { id: 'silver', name: 'Argent', icon: 'shield-half-outline', color: '#C0C0C0', minLevel: 10, maxLevel: 18 },
  { id: 'gold', name: 'Or', icon: 'shield', color: '#FFD700', minLevel: 19, maxLevel: 27 },
  { id: 'platinum', name: 'Platine', icon: 'layers-outline', color: '#E5E4E2', minLevel: 28, maxLevel: 36 },
  { id: 'emerald', name: 'Émeraude', icon: 'leaf-outline', color: '#50C878', minLevel: 37, maxLevel: 45 },
  { id: 'diamond', name: 'Diamant', icon: 'diamond', color: '#B9F2FF', minLevel: 46, maxLevel: 54 },
  { id: 'olympian', name: 'Olympien', icon: 'trophy', color: '#B980FF', minLevel: 55, maxLevel: 63 },
];

const DIVISIONS = [
  { id: 'III', label: 'Division III' },
  { id: 'II', label: 'Division II' },
  { id: 'I', label: 'Division I' },
];

function getDivisionIndex(level, league) {
  const span = league.maxLevel - league.minLevel + 1;
  const chunk = Math.ceil(span / 3);
  const offset = level - league.minLevel;
  return Math.min(2, Math.floor(offset / chunk));
}

export function getLeagueInfo(level) {
  const league = LEAGUES.find((item) => level >= item.minLevel && level <= item.maxLevel) || LEAGUES[LEAGUES.length - 1];
  const divisionIndex = getDivisionIndex(level, league);
  const division = DIVISIONS[divisionIndex];
  const nextDivision = DIVISIONS[divisionIndex + 1];
  const nextLeague = LEAGUES[LEAGUES.indexOf(league) + 1];

  const span = league.maxLevel - league.minLevel + 1;
  const chunk = Math.ceil(span / 3);
  const divisionMin = league.minLevel + divisionIndex * chunk;
  const divisionMax = Math.min(league.maxLevel, divisionMin + chunk - 1);

  const isTopDivision = divisionIndex === 2;
  const nextThresholdLevel = isTopDivision
    ? (nextLeague?.minLevel ?? league.maxLevel + 1)
    : league.minLevel + (divisionIndex + 1) * chunk;

  return {
    league,
    division,
    divisionIndex,
    divisionMin,
    divisionMax,
    nextThresholdLevel,
    nextLeague: isTopDivision ? nextLeague : null,
    nextDivision: isTopDivision ? null : nextDivision,
    fullName: `${league.name} ${division.id}`,
  };
}

export function getXpToNextTier(level, xp, nextLevelXp) {
  const info = getLeagueInfo(level);
  const xpPerLevel = 450;
  const levelsToNext = Math.max(0, info.nextThresholdLevel - level);
  const xpNeededInLevel = nextLevelXp - xp;

  if (info.league.id === 'olympian' && info.divisionIndex === DIVISIONS.length - 1) {
    return { xpRemaining: 0, label: 'Ligue maximale atteinte' };
  }

  const xpRemaining = levelsToNext > 0
    ? xpNeededInLevel + (levelsToNext - 1) * xpPerLevel
    : xpNeededInLevel;

  const target = info.nextLeague
    ? `${info.nextLeague.name} ${DIVISIONS[0].id}`
    : `${info.league.name} ${info.nextDivision.id}`;

  return {
    xpRemaining: Math.max(0, xpRemaining),
    label: `Plus que ${Math.max(0, xpRemaining).toLocaleString('fr-FR')} XP pour ${target}`,
  };
}

export function filterRankingByLeague(players, level) {
  const info = getLeagueInfo(level);
  const uniquePlayers = new Map();

  players.forEach((player) => {
    const inLeague = player.level >= info.league.minLevel && player.level <= info.league.maxLevel;
    const previous = uniquePlayers.get(player.username);
    if (inLeague && (!previous || player.xp > previous.xp)) uniquePlayers.set(player.username, player);
  });

  return [...uniquePlayers.values()]
    .sort((a, b) => b.xp - a.xp || a.level - b.level)
    .map((p, index) => ({ ...p, rank: index + 1 }));
}
