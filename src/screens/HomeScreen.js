import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { ChallengeCard } from '../components/ChallengeCard';
import { LevelGauge } from '../components/LevelGauge';
import { DividerTitle, Display, NeonButton, Screen } from '../components/Ui';
import { challenges, currentUser } from '../mocks/data';
import { useTheme } from '../theme/ThemeContext';

export function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const [more, setMore] = useState(false);
  const active = challenges.filter((challenge) => challenge.active);
  const upcoming = challenges.filter((challenge) => !challenge.active);
  const open = (challenge) => navigation.navigate('ChallengeDetail', { challengeId: challenge.id });
  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} />
      <View style={[styles.hero, { borderColor: theme.accentPrimary, backgroundColor: theme.surface }]}> 
        <View style={styles.heroCopy}>
          <Text style={[styles.eyebrow, { color: theme.accentPrimary }]}>SESSION DU JOUR</Text>
          <Display size={28}>BONJOUR {currentUser.firstName.toUpperCase()}</Display>
          <Text style={[styles.heroText, { color: theme.textMuted }]}>Tu es à {currentUser.points.toLocaleString('fr-FR')} pts · niveau {currentUser.level}</Text>
        </View>
        <NeonButton label="PASS" variant="outline" onPress={() => navigation.navigate('Pass')} style={styles.heroButton} />
      </View>
      <LevelGauge />
      <DividerTitle>DÉFI EN COURS</DividerTitle>
      <View style={styles.cards}>
        {active.map((challenge) => <View key={challenge.id}><Text style={[styles.until, { color: theme.text }]}>Fin dans {challenge.timer}</Text><ChallengeCard challenge={challenge} onPress={() => open(challenge)} /></View>)}
      </View>
      <DividerTitle style={styles.tomorrow}>DEMAIN</DividerTitle>
      <View style={styles.cards}>{upcoming.slice(0, more ? 3 : 1).map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} disabled />)}</View>
      <Pressable onPress={() => setMore(!more)} style={styles.more}><Text style={[styles.chevron, { color: theme.text }]}>⌄</Text><Text style={[styles.moreText, { color: theme.text }]}>{more ? 'Voir moins' : 'Voir plus'}</Text></Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 26 },
  hero: { borderWidth: 1.2, borderRadius: 20, padding: 16, marginTop: 6, flexDirection: 'row', alignItems: 'center', gap: 12 },
  heroCopy: { flex: 1 },
  eyebrow: { fontFamily: 'Anton_400Regular', fontSize: 13, letterSpacing: 0.8, marginBottom: 4 },
  heroText: { marginTop: 6, fontSize: 13, lineHeight: 18 },
  heroButton: { minWidth: 94 },
  cards: { gap: 18, marginTop: 18 },
  until: { marginLeft: 6, marginBottom: 9, fontFamily: 'Anton_400Regular', fontSize: 21 },
  tomorrow: { marginTop: 52 },
  more: { marginTop: 23, alignItems: 'center' },
  chevron: { fontSize: 35, lineHeight: 28 },
  moreText: { fontWeight: '800', fontSize: 17 },
});
