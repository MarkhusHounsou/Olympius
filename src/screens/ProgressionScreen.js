import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { XPProgressBar } from '../components/XPProgressBar';
import { Card, Screen, SectionLabel } from '../components/Ui';
import { currentUser } from '../mocks/data';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

const upcomingLevels = [13, 14, 15];

export function ProgressionScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} back title="Progression" />
      <Text style={[styles.level, { color: theme.text }]}>Niveau {currentUser.level}</Text>
      <XPProgressBar current={currentUser.xp} max={currentUser.nextLevelXp} style={styles.bar} />
      <SectionLabel style={styles.section}>Prochains niveaux</SectionLabel>
      {upcomingLevels.map((level) => (
        <Card key={level} style={styles.row} muted>
          <Text style={[styles.rowTitle, { color: theme.text }]}>Niveau {level}</Text>
          <Text style={[styles.rowReward, { color: theme.textMuted }]}>
            {level === 13 ? '+150 XP' : level === 14 ? 'Badge mobilité' : 'Récompense Pass'}
          </Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  level: { fontFamily: 'Anton_400Regular', fontSize: 36, marginTop: 16, letterSpacing: 0.3 },
  bar: { marginTop: 16 },
  section: { marginTop: layout.sectionGap },
  row: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  rowTitle: { fontFamily: 'Anton_400Regular', fontSize: 18 },
  rowReward: { fontSize: 13, fontWeight: '500' },
});
