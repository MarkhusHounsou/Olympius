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
  hint: { marginTop: 8 },
  current: { marginTop: layout.blockGap, alignItems: 'center' },
  league: { fontFamily: 'Anton_400Regular', fontSize: 28 },
  points: { marginTop: 8, fontSize: 14, fontWeight: '500' },
  bar: { marginTop: 16, width: '100%' },
  promo: { marginTop: 12, fontSize: 13, fontWeight: '600' },
  section: { marginTop: layout.sectionGap },
  leagueRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  leagueName: { fontSize: 16, fontWeight: '500' },
  // Styles for season cards
  seasonCard: { marginTop: layout.blockGap, padding: 12, borderRadius: 8 },
  seasonHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  seasonMonth: { fontSize: 16, fontWeight: '600' },
  seasonRank: { fontSize: 16, fontWeight: '600' },
  seasonBar: { marginTop: 4 }
});
