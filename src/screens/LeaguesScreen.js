import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { XPProgressBar } from '../components/XPProgressBar';
import { BodyText, Card, Screen, SectionLabel } from '../components/Ui';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

const leagues = ['Bronze', 'Argent', 'Or', 'Platine', 'Diamant', 'Olympe'];

// Exemple de données de saison (progression mensuelle)
const seasons = [
  { month: 'Janvier', rank: 1, points: 45, max: 100 },
  { month: 'Février', rank: 2, points: 70, max: 100 },
  { month: 'Mars', rank: 3, points: 30, max: 100 },
  { month: 'Avril', rank: 4, points: 85, max: 100 },
];

export function LeaguesScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} back title="Ligues" />
      <BodyText muted style={styles.hint}>Interface visuelle — système non connecté.</BodyText>
      <Card style={styles.current}>
        <Text style={[styles.league, { color: theme.text }]}>Olympe</Text>
        <Text style={[styles.points, { color: theme.textMuted }]}>1 240 points</Text>
        <XPProgressBar current={1240} max={1500} style={styles.bar} />
        <Text style={[styles.promo, { color: theme.accentPrimary }]}>Encore 260 points pour atteindre le palier supérieur</Text>
      </Card>

      <SectionLabel style={styles.section}>PROGRESSION DES LIGUES</SectionLabel>
      {leagues.map((league, index) => (
        <View key={league} style={styles.leagueRow}>
          <View style={[styles.dot, { backgroundColor: index <= 5 ? theme.accentPrimary : theme.track }]} />
          <Text style={[styles.leagueName, { color: theme.text }]}>{league}</Text>
        </View>
      ))}

      <SectionLabel style={styles.section}>SAISON EN COURS</SectionLabel>
      {seasons.map((season) => (
        <Card key={season.month} style={styles.seasonCard}>
          <View style={styles.seasonHeader}>
            <Text style={[styles.seasonMonth, { color: theme.text }]}>{season.month}</Text>
            <Text style={[styles.seasonRank, { color: theme.accentPrimary }]}>#{season.rank}</Text>
          </View>
          <Text style={[styles.seasonPoints, { color: theme.textMuted }]}>{season.points} / {season.max} points</Text>
          <XPProgressBar current={season.points} max={season.max} showValues={false} style={styles.seasonBar} />
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  hint: { marginTop: 8 },
  current: { marginTop: layout.blockGap, alignItems: 'center' },
  league: { fontFamily: 'Anton_400Regular', fontSize: 28 },
  points: { marginTop: 8, fontSize: 14, fontWeight: '500' },
  bar: { marginTop: 16, width: '100%' },
  promo: { marginTop: 12, fontSize: 13, fontWeight: '600', textAlign: 'center' },
  section: { marginTop: layout.sectionGap },
  leagueRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  leagueName: { fontSize: 16, fontWeight: '500' },
  seasonCard: { marginTop: layout.blockGap, padding: 12, borderRadius: 8 },
  seasonHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  seasonMonth: { fontSize: 16, fontWeight: '600' },
  seasonRank: { fontSize: 16, fontWeight: '600' },
  seasonPoints: { fontSize: 13 },
  seasonBar: { marginTop: 8 },
});
