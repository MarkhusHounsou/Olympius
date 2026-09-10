import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { CompetitionCard } from '../components/CompetitionCard';
import { Screen, SectionLabel } from '../components/Ui';
import { competitions } from '../mocks/data';
import { layout } from '../theme/layout';
import { useAppDemo } from '../context/AppDemoContext';
import { useTheme } from '../theme/ThemeContext';

export function CompetitionScreen({ navigation }) {
  const { theme } = useTheme();
  const { hasJoinedCompetition } = useAppDemo();
  const active = competitions.filter((competition) => competition.active);
  const upcoming = competitions.filter((competition) => !competition.active);
  const open = (competition) => navigation.navigate('CompetitionDetail', { competitionId: competition.id });

  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} title="Compétition" />
      <View style={styles.intro}>
        <View style={[styles.titleIcon, { backgroundColor: theme.accentGlow }]}><Text style={styles.trophy}>🏆</Text></View>
        <View style={styles.introCopy}>
          <Text style={[styles.title, { color: theme.text }]}>Événements officiels</Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>Des défis rares, des places limitées et des récompenses à gagner.</Text>
        </View>
      </View>

      <SectionLabel style={styles.section}>Disponibles maintenant</SectionLabel>
      <View style={styles.list}>
        {active.map((competition) => (
          <CompetitionCard
            key={competition.id}
            competition={competition}
            joined={hasJoinedCompetition(competition.id)}
            onPress={() => open(competition)}
          />
        ))}
      </View>

      <SectionLabel style={styles.section}>À venir</SectionLabel>
      <View style={styles.list}>
        {upcoming.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} upcoming onPress={() => open(competition)} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  intro: { flexDirection: 'row', alignItems: 'center', gap: 13, marginTop: 8 },
  titleIcon: { width: 50, height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  trophy: { fontSize: 24 },
  introCopy: { flex: 1 },
  title: { fontFamily: 'Anton_400Regular', fontSize: 26, letterSpacing: 0.25 },
  subtitle: { fontSize: 13, fontWeight: '500', lineHeight: 19, marginTop: 3 },
  section: { marginTop: layout.sectionGap },
  list: { gap: 12 },
});
