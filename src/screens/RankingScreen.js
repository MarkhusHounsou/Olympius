import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { LeaderboardRow } from '../components/LeaderboardRow';
import { LeagueBadge } from '../components/LeagueBadge';
import { XPProgressBar } from '../components/XPProgressBar';
import { Card, Screen, SectionLabel } from '../components/Ui';
import { currentUser, ranking } from '../mocks/data';
import { layout } from '../theme/layout';
import { filterRankingByLeague, getLeagueInfo, getXpToNextTier, LEAGUES } from '../utils/leagues';
import { useTheme } from '../theme/ThemeContext';

export function RankingScreen({ navigation }) {
  const { theme } = useTheme();
  const leagueInfo = useMemo(() => getLeagueInfo(currentUser.level), []);
  const xpProgress = useMemo(
    () => getXpToNextTier(currentUser.level, currentUser.xp, currentUser.nextLevelXp),
    [],
  );
  const leagueRanking = useMemo(
    () => filterRankingByLeague(ranking, currentUser.level),
    [],
  );
  const userEntry = useMemo(
    () => leagueRanking.find((item) => item.username === currentUser.username)
      || { rank: leagueRanking.length + 1, username: currentUser.username, level: currentUser.level, xp: currentUser.xp },
    [leagueRanking],
  );
  const topThree = leagueRanking.slice(0, 3);
  const rest = leagueRanking.slice(3, 8);

  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} title="Classement" />

      <Card style={styles.leagueCard}>
        <View style={styles.leagueTopline}>
          <View style={[styles.levelPill, { backgroundColor: theme.backgroundSoft, borderColor: theme.track }]}>
            <Ionicons name="stats-chart-outline" size={15} color={theme.textMuted} />
            <Text style={[styles.levelPillText, { color: theme.textMuted }]}>Niveau {currentUser.level}</Text>
          </View>
          <Text style={[styles.rankText, { color: theme.textMuted }]}>#{userEntry.rank} dans ta ligue</Text>
        </View>
        <LeagueBadge league={leagueInfo.league} division={leagueInfo.division} size="lg" />
        <Text style={[styles.levelRange, { color: theme.textMuted }]}>
          Niveaux {leagueInfo.league.minLevel}–{leagueInfo.league.maxLevel}
        </Text>
        <View style={styles.divisionTrack}>
          {[0, 1, 2].map((index) => {
            const isActive = index === leagueInfo.divisionIndex;
            const isUnlocked = index < leagueInfo.divisionIndex;
            const min = leagueInfo.league.minLevel + index * 3;
            const max = Math.min(leagueInfo.league.maxLevel, min + 2);
            return (
              <View
                key={index}
                style={[
                  styles.divisionCell,
                  {
                    backgroundColor: isActive ? `${leagueInfo.league.color}20` : theme.backgroundSoft,
                    borderColor: isActive ? leagueInfo.league.color : theme.track,
                  },
                ]}
              >
                <Ionicons
                  name={isUnlocked ? 'checkmark-circle' : isActive ? leagueInfo.league.icon : 'ellipse-outline'}
                  size={16}
                  color={isActive || isUnlocked ? leagueInfo.league.color : theme.textDim}
                />
                <Text style={[styles.divisionName, { color: isActive ? leagueInfo.league.color : theme.textMuted }]}>
                  {['III', 'II', 'I'][index]}
                </Text>
                <Text style={[styles.divisionLevels, { color: theme.textDim }]}>{min}–{max}</Text>
              </View>
            );
          })}
        </View>
        <XPProgressBar
          current={currentUser.xp}
          max={currentUser.nextLevelXp}
          style={styles.leagueBar}
        />
        <View style={[styles.promotionNote, { backgroundColor: theme.accentGlow }]}>
          <Ionicons name="arrow-up-circle-outline" size={18} color={theme.accentPrimary} />
          <Text style={[styles.promoText, { color: theme.accentPrimary }]}>{xpProgress.label}</Text>
        </View>
      </Card>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.leagueTrack}>
        {LEAGUES.map((league) => {
          const active = league.id === leagueInfo.league.id;
          return (
            <View
              key={league.id}
              style={[
                styles.leagueTile,
                {
                  borderColor: active ? league.color : theme.track,
                  backgroundColor: active ? `${league.color}18` : theme.surface,
                },
              ]}
            >
              <View style={[styles.leagueTileIcon, { backgroundColor: active ? `${league.color}24` : theme.backgroundSoft }]}>
                <Ionicons name={league.icon} size={20} color={active ? league.color : theme.textDim} />
              </View>
              <Text style={[styles.leaguePillText, { color: active ? league.color : theme.textDim }]}>
                {league.name}
              </Text>
              <Text style={[styles.leagueTileLevels, { color: theme.textDim }]}>
                Niv. {league.minLevel}–{league.maxLevel}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {topThree.length > 0 && (
        <>
          <SectionLabel style={styles.section}>Podium · {leagueInfo.fullName}</SectionLabel>
          <View style={styles.podium}>
            {topThree.map((item, index) => (
              <View key={item.username} style={styles.podiumSlot}>
                <Text style={styles.medal}>{['🥇', '🥈', '🥉'][index]}</Text>
                <Text style={[styles.podiumName, { color: theme.text }]} numberOfLines={1}>{item.username}</Text>
                <Text style={[styles.podiumXp, { color: theme.textMuted }]}>Niv. {item.level}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      <SectionLabel style={styles.section}>Classement ligue</SectionLabel>
      <View style={styles.list}>
        {rest.map((item) => (
          <LeaderboardRow key={item.username} item={item} isCurrent={item.username === currentUser.username} />
        ))}
      </View>

      <Card style={styles.userCard} muted>
        <SectionLabel style={styles.userLabel}>Ta position</SectionLabel>
        <LeaderboardRow item={userEntry} isCurrent />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  leagueCard: { alignItems: 'center', paddingTop: 16, paddingBottom: 20 },
  leagueTopline: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  levelPill: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: StyleSheet.hairlineWidth, borderRadius: 14, paddingHorizontal: 9, paddingVertical: 6 },
  levelPillText: { fontSize: 11, fontWeight: '700' },
  rankText: { fontSize: 11, fontWeight: '600' },
  levelRange: { marginTop: 8, fontSize: 13, fontWeight: '500' },
  divisionTrack: { flexDirection: 'row', alignSelf: 'stretch', gap: 7, marginTop: 18 },
  divisionCell: { flex: 1, minHeight: 62, borderWidth: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  divisionName: { fontFamily: 'Anton_400Regular', fontSize: 15, marginTop: 2 },
  divisionLevels: { fontSize: 10, fontWeight: '600', marginTop: 1 },
  leagueBar: { marginTop: 20, width: '100%' },
  promotionNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch', gap: 8, marginTop: 14, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  promoText: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  leagueTrack: { gap: 8, marginTop: layout.blockGap, paddingBottom: 4 },
  leagueTile: {
    width: 112,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  leagueTileIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 7 },
  leaguePillText: { fontSize: 12, fontWeight: '600' },
  leagueTileLevels: { marginTop: 3, fontSize: 9, fontWeight: '600' },
  section: { marginTop: layout.sectionGap },
  podium: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  podiumSlot: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  medal: { fontSize: 24 },
  podiumName: { marginTop: 8, fontSize: 13, fontWeight: '600' },
  podiumXp: { marginTop: 2, fontSize: 12 },
  list: { gap: 8 },
  userCard: { marginTop: layout.sectionGap, paddingVertical: 16 },
  userLabel: { marginBottom: 4, textAlign: 'center' },
});
