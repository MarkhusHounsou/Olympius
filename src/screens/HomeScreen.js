import { StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { ChallengeCard } from '../components/ChallengeCard';
import { ProfileHeader } from '../components/ProfileHeader';
import { StatPill } from '../components/StatPill';
import { XPProgressBar } from '../components/XPProgressBar';
import { Screen, TextLink } from '../components/Ui';
import { currentUser, getFeaturedChallenge } from '../mocks/data';
import { layout } from '../theme/layout';

export function HomeScreen({ navigation }) {
  const featured = getFeaturedChallenge();
  const open = (challenge) => navigation.navigate('ChallengeDetail', { challengeId: challenge.id });

  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} minimal />
      <ProfileHeader
        user={currentUser}
        onPress={() => navigation.navigate('App', { screen: 'Profile' })}
      />
      <XPProgressBar
        current={currentUser.xp}
        max={currentUser.nextLevelXp}
        style={styles.progress}
      />
      <View style={styles.stats}>
        <StatPill
          label="Série"
          value={`${currentUser.streak}j`}
          onPress={() => navigation.navigate('Streak')}
        />
        <StatPill
          label="Rang"
          value={`#${currentUser.rank}`}
          onPress={() => navigation.navigate('App', { screen: 'Ranking' })}
        />
        <StatPill label="XP" value={currentUser.xp.toLocaleString('fr-FR')} />
      </View>
      <ChallengeCard challenge={featured} featured onPress={() => open(featured)} />
      <TextLink
        label="Voir tous les défis"
        onPress={() => navigation.navigate('App', { screen: 'Challenges' })}
        style={styles.link}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  progress: { marginTop: 20 },
  stats: { flexDirection: 'row', gap: 10, marginTop: 20 },
  link: { marginTop: layout.sectionGap },
});
