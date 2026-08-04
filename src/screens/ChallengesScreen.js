import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { ChallengeCard } from '../components/ChallengeCard';
import { DividerTitle, Display, Screen } from '../components/Ui';
import { challenges } from '../mocks/data';
import { useTheme } from '../theme/ThemeContext';

export function ChallengesScreen({ navigation }) {
  const { theme } = useTheme();
  const current = challenges.filter((item) => item.active);
  const future = challenges.filter((item) => !item.active);
  const open = (challenge) => navigation.navigate('ChallengeDetail', { challengeId: challenge.id });
  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} />
      <Display size={50} align="center" style={styles.title}>DÉFIS</Display>
      <DividerTitle style={styles.section}><Text>EN COURS</Text></DividerTitle>
      <View style={styles.filters}><Text style={[styles.until, { color: theme.text }]}>Fin dans 01 : 25 : 17</Text><View style={styles.filterSet}><Pressable style={[styles.listIcon, { borderColor: theme.line }]}><Ionicons name="list-outline" size={25} color={theme.text} /></Pressable><Pressable style={[styles.filter, { borderColor: theme.line }]}><Text style={[styles.filterText, { color: theme.text }]}>Filtrer</Text></Pressable></View></View>
      <View style={styles.cards}>{current.map((challenge) => <View key={challenge.id}><Text style={[styles.timer, { color: theme.text }]}>Fin dans {challenge.timer}</Text><ChallengeCard challenge={challenge} expanded onPress={() => open(challenge)} /></View>)}</View>
      <DividerTitle style={styles.tomorrow}>DEMAIN</DividerTitle>
      <Text style={[styles.timer, { color: theme.text }]}>Débute dans 14 : 49 : 05</Text>
      <ChallengeCard challenge={future[0]} expanded disabled />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 34 },
  title: { marginTop: 43 },
  section: { marginTop: 73 },
  filters: { marginTop: 10 },
  until: { marginTop: 12, fontFamily: 'Anton_400Regular', fontSize: 23 },
  filterSet: { flexDirection: 'row', gap: 10, alignSelf: 'flex-end', marginTop: -36 },
  listIcon: { borderWidth: 1.5, borderRadius: 10, height: 43, width: 64, alignItems: 'center', justifyContent: 'center' },
  filter: { height: 43, minWidth: 125, borderWidth: 1.5, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  filterText: { fontFamily: 'Anton_400Regular', fontSize: 20 },
  cards: { marginTop: 15, gap: 28 },
  timer: { margin: 8, fontFamily: 'Anton_400Regular', fontSize: 20 },
  tomorrow: { marginTop: 68 },
});
