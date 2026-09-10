import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { BodyText, Card, NeonButton, Screen, ScreenFooter, SectionLabel } from '../components/Ui';
import { challenges, getCategoryMeta } from '../mocks/data';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function ChallengeDetailScreen({ navigation, route }) {
  const { theme } = useTheme();
  const challenge = challenges.find((item) => item.id === route.params?.challengeId) || challenges[0];
  const category = getCategoryMeta(challenge.category);
  const stars = '★'.repeat(challenge.difficulty) + '☆'.repeat(5 - challenge.difficulty);

  return (
    <Screen
      scroll
      contentStyle={styles.content}
      footer={(
        <ScreenFooter>
          <NeonButton
            label="Commencer le défi"
            onPress={() => navigation.navigate('Validation', { challengeId: challenge.id })}
          />
        </ScreenFooter>
      )}
    >
      <Header navigation={navigation} back />
      <Text style={[styles.title, { color: theme.text }]}>{challenge.shortTitle || challenge.title}</Text>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>
        {category.label} · {stars}
      </Text>

      <View style={styles.infoRow}>
        <InfoCell label="Récompense" value={`+${challenge.points} XP`} accent theme={theme} />
        <InfoCell label="Temps restant" value={challenge.timer} theme={theme} />
      </View>

      <Card style={styles.block}>
        <SectionLabel style={styles.blockLabel}>Objectif</SectionLabel>
        <BodyText>{challenge.shortDescription}</BodyText>
      </Card>

      <Card style={styles.block} muted>
        <SectionLabel style={styles.blockLabel}>Instructions</SectionLabel>
        <BodyText muted>{challenge.instructions}</BodyText>
      </Card>
    </Screen>
  );
}

function InfoCell({ label, value, accent, theme }) {
  return (
    <View style={[styles.infoCell, { backgroundColor: theme.surface, borderColor: theme.track }]}>
      <Text style={[styles.infoLabel, { color: theme.textMuted }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: accent ? theme.accentPrimary : theme.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  title: { fontFamily: 'Anton_400Regular', fontSize: 34, letterSpacing: 0.3, marginTop: 8 },
  subtitle: { marginTop: 8, fontSize: 14, fontWeight: '500' },
  infoRow: { flexDirection: 'row', gap: 10, marginTop: layout.sectionGap },
  infoCell: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: layout.cardRadiusSm,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  infoLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' },
  infoValue: { fontFamily: 'Anton_400Regular', fontSize: 20, marginTop: 6 },
  block: { marginTop: layout.blockGap },
  blockLabel: { marginBottom: 8 },
});
