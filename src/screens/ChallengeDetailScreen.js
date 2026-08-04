import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { NeonButton, Screen } from '../components/Ui';
import { challenges } from '../mocks/data';
import { useTheme } from '../theme/ThemeContext';

export function ChallengeDetailScreen({ navigation, route }) {
  const { theme } = useTheme();
  const challenge = challenges.find((item) => item.id === route.params?.challengeId) || challenges[0];
  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} back />
      <Text style={[styles.heading, { color: theme.text }]}>DÉFIS</Text>
      <View style={[styles.countdown, { borderColor: theme.accentPrimary, backgroundColor: theme.surface }]}><Text style={[styles.countdownText, { color: theme.text }]}>Fin du défi dans {challenge.timer}</Text></View>
      <Ionicons name={challenge.icon} size={100} color={theme.accentPrimary} style={styles.categoryIcon} />
      <View style={[styles.card, { backgroundColor: theme.surfaceRaised, borderColor: theme.accentPrimary }]}>
        <View style={styles.cardTop}><Text style={[styles.title, { color: theme.text }]}>{challenge.title}</Text><View style={styles.participants}><Ionicons name="person" size={22} color={theme.text} /><Text style={[styles.people, { color: theme.text }]}>{challenge.participants}</Text></View></View>
        <Text style={[styles.copy, { color: theme.text }]}>{challenge.shortDescription}</Text>
        <Text style={[styles.copy, { color: theme.text }]}>Pour valider ta performance et entrer dans la compétition, tu vas devoir te filmer directement depuis l’application : <Text style={{ color: theme.danger }}>assure-toi que ton mouvement soit bien visible !</Text></Text>
        <Text style={[styles.copy, { color: theme.text }]}>Une fois le temps imparti écoulé, les athlètes du club notent chaque participant de 1 à 5. La moyenne détermine ensuite le classement final.</Text>
        <View style={styles.bottom}><NeonButton label="GO" onPress={() => navigation.navigate('Recording', { challengeId: challenge.id })} style={styles.go} /><Text style={[styles.reward, { color: theme.text }]}>+ {challenge.points}</Text></View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 34 },
  heading: { marginTop: 43, fontFamily: 'Anton_400Regular', fontSize: 50, textAlign: 'center' },
  countdown: { marginTop: 58, height: 74, borderRadius: 18, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  countdownText: { fontFamily: 'Anton_400Regular', fontSize: 25, textAlign: 'center' },
  categoryIcon: { alignSelf: 'center', marginVertical: 28 },
  card: { borderWidth: 1.5, borderRadius: 16, padding: 24 },
  cardTop: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  title: { flex: 1, fontFamily: 'Anton_400Regular', fontSize: 23, textAlign: 'center', lineHeight: 27 },
  participants: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  people: { fontFamily: 'Anton_400Regular', fontSize: 23 },
  copy: { marginTop: 25, lineHeight: 20, fontSize: 14 },
  bottom: { marginTop: 31, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 52 },
  go: { width: 159 },
  reward: { fontFamily: 'Anton_400Regular', fontSize: 30 },
});
