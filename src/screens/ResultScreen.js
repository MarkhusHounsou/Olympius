import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { BadgeCard } from '../components/BadgeCard';
import { XPProgressBar } from '../components/XPProgressBar';
import { Card, NeonButton, Screen, SectionLabel } from '../components/Ui';
import { badges, challenges, currentUser, formatMetricValue } from '../mocks/data';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function ResultScreen({ navigation, route }) {
  const { theme } = useTheme();
  const challenge = challenges.find((item) => item.id === route.params?.challengeId) || challenges[0];
  const rawValue = route.params?.value ?? Math.round(challenge.target * 0.74);
  const value = challenge.metricType === 'distance' ? rawValue / 10 : rawValue;
  const xpGained = challenge.points;
  const newXp = currentUser.xp + xpGained;
  const leveledUp = newXp >= currentUser.nextLevelXp;
  const newLevel = leveledUp ? currentUser.level + 1 : currentUser.level;
  const unlockedBadge = value >= challenge.target ? badges.find((item) => item.id === '50-pompes') : null;

  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} title="Résultat" />
      <View style={styles.hero}>
        <Text style={[styles.title, { color: theme.text }]}>Défi terminé</Text>
        <Text style={[styles.performance, { color: theme.textMuted }]}>{formatMetricValue(value, challenge)}</Text>
        <Text style={[styles.xpGain, { color: theme.accentPrimary }]}>+{xpGained} XP</Text>
      </View>

      <Card style={styles.progressCard}>
        <Text style={[styles.level, { color: theme.textMuted }]}>Niveau {newLevel}</Text>
        <XPProgressBar
          current={leveledUp ? newXp - currentUser.nextLevelXp : newXp}
          max={450}
          style={styles.bar}
        />
      </Card>

      {leveledUp && (
        <Card style={styles.banner}>
          <Text style={[styles.bannerTitle, { color: theme.accentPrimary }]}>Level up</Text>
          <Text style={[styles.bannerCopy, { color: theme.text }]}>
            Niveau {currentUser.level} → {newLevel}
          </Text>
        </Card>
      )}

      {unlockedBadge && (
        <View style={styles.badgeSection}>
          <SectionLabel>Nouveau badge</SectionLabel>
          <BadgeCard badge={unlockedBadge} unlocked style={styles.badge} />
        </View>
      )}

      <NeonButton
        label="Retour à l'accueil"
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'App', params: { screen: 'Home' } }] })}
        style={styles.cta}
      />
      <NeonButton
        label="Voir le classement"
        variant="outline"
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'App', params: { screen: 'Ranking' } }] })}
        style={styles.secondary}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  hero: { alignItems: 'center', marginTop: layout.sectionGap },
  title: { fontFamily: 'Anton_400Regular', fontSize: 32, letterSpacing: 0.3 },
  performance: { marginTop: 12, fontSize: 18, fontWeight: '500' },
  xpGain: { fontFamily: 'Anton_400Regular', fontSize: 40, marginTop: 16 },
  progressCard: { marginTop: layout.sectionGap },
  level: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  bar: { marginTop: 4 },
  banner: { marginTop: layout.blockGap, alignItems: 'center' },
  bannerTitle: { fontFamily: 'Anton_400Regular', fontSize: 22 },
  bannerCopy: { marginTop: 4, fontSize: 15, fontWeight: '500' },
  badgeSection: { marginTop: layout.sectionGap, alignItems: 'center' },
  badge: { marginTop: 8 },
  cta: { marginTop: layout.sectionGap },
  secondary: { marginTop: 12 },
});
