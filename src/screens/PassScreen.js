import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '../components/Header';
import { XPProgressBar } from '../components/XPProgressBar';
import { Screen, SectionLabel } from '../components/Ui';
import { currentUser, passLevels } from '../mocks/data';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function PassScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} back={navigation.canGoBack()} title="Olympius Pass" />
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>Débloque des récompenses en progressant.</Text>
      <XPProgressBar current={currentUser.xp} max={currentUser.nextLevelXp} style={styles.bar} />
      <SectionLabel style={styles.section}>Paliers</SectionLabel>
      <View style={styles.route}>
        {passLevels.map((item) => (
          <LevelCard key={item.level} item={item} theme={theme} />
        ))}
      </View>
    </Screen>
  );
}

function LevelCard({ item, theme }) {
  const highlighted = item.current;
  const content = (
    <>
      <View>
        <Text style={[styles.cardLevel, { color: item.sponsor ? theme.sponsorText : highlighted ? theme.text : theme.textDim }]}>
          Niveau {item.level}
        </Text>
        <Text style={[styles.cardReward, { color: item.sponsor ? theme.sponsorText : theme.textMuted }]}>
          {item.reward || `${item.xp.toLocaleString('fr-FR')} XP`}
        </Text>
      </View>
      {item.sponsor && <Text style={[styles.sponsor, { color: theme.sponsorText }]}>{item.sponsor}</Text>}
      {item.unlocked && !item.sponsor && <Text style={[styles.check, { color: theme.accentPrimary }]}>✓</Text>}
    </>
  );

  if (item.sponsor) {
    return <LinearGradient colors={[theme.sponsorStart, theme.sponsorEnd]} style={styles.levelCard}>{content}</LinearGradient>;
  }

  return (
    <View
      style={[
        styles.levelCard,
        {
          backgroundColor: highlighted ? theme.surfaceRaised : theme.surface,
          borderColor: highlighted ? theme.accentPrimary : theme.track,
        },
      ]}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  subtitle: { marginTop: 8, fontSize: 14, fontWeight: '500', lineHeight: 20 },
  bar: { marginTop: 20 },
  section: { marginTop: layout.sectionGap },
  route: { gap: 10 },
  levelCard: {
    minHeight: 72,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: layout.cardRadiusSm,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLevel: { fontFamily: 'Anton_400Regular', fontSize: 20 },
  cardReward: { marginTop: 2, fontSize: 13, fontWeight: '500' },
  sponsor: { fontFamily: 'Anton_400Regular', fontSize: 16, letterSpacing: 0.5 },
  check: { fontSize: 20, fontWeight: '700' },
});
