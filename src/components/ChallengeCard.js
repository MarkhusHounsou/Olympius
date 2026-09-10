import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCategoryMeta } from '../mocks/data';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';
import { NeonButton } from './Ui';

export function ChallengeCard({ challenge, onPress, disabled = false, featured = false, compact = false }) {
  const { theme } = useTheme();
  const category = getCategoryMeta(challenge.category);

  if (featured) {
    return (
      <View style={[styles.featured, { backgroundColor: theme.surfaceRaised, borderColor: theme.track }]}>
        <Text style={[styles.featuredTag, { color: theme.textMuted }]}>Défi du jour</Text>
        <Text style={[styles.featuredTitle, { color: theme.text }]}>{challenge.shortTitle || challenge.title}</Text>
        <View style={styles.featuredMeta}>
          <Text style={[styles.metaText, { color: theme.accentPrimary }]}>+{challenge.points} XP</Text>
          <Text style={[styles.metaText, { color: theme.textMuted }]}>{challenge.timer} restantes</Text>
        </View>
        <NeonButton label="Relever le défi" onPress={onPress} style={styles.featuredButton} />
      </View>
    );
  }

  if (compact) {
    return (
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.compact,
          { backgroundColor: theme.surface, borderColor: theme.track, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        ]}
      >
        <View style={styles.compactCopy}>
          <Text style={[styles.compactTitle, { color: theme.text }]}>{challenge.shortTitle || challenge.title}</Text>
          <Text style={[styles.compactMeta, { color: theme.textMuted }]}>
            {category.label} · +{challenge.points} XP · {challenge.timer}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.textDim} />
      </Pressable>
    );
  }

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.surfaceRaised, borderColor: theme.track, opacity: disabled ? 0.5 : pressed ? 0.9 : 1 },
      ]}
    >
      <View style={styles.cardTop}>
        <Text style={[styles.title, { color: theme.text }]}>{challenge.shortTitle || challenge.title}</Text>
        <Text style={[styles.category, { color: theme.textMuted }]}>{category.label}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={[styles.xp, { color: theme.accentPrimary }]}>+{challenge.points} XP</Text>
        <Text style={[styles.timer, { color: theme.textMuted }]}>{challenge.timer}</Text>
      </View>
      {!disabled && (
        <NeonButton label="Relever" onPress={onPress} compact style={styles.cardButton} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  featured: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: layout.cardRadius,
    padding: layout.cardPadding,
    marginTop: layout.sectionGap,
  },
  featuredTag: { fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  featuredTitle: { fontFamily: 'Anton_400Regular', fontSize: 32, marginTop: 8, letterSpacing: 0.3 },
  featuredMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  metaText: { fontSize: 14, fontWeight: '600' },
  featuredButton: { marginTop: 24 },
  compact: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: layout.cardRadiusSm,
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 12,
  },
  compactCopy: { flex: 1 },
  compactTitle: { fontSize: 16, fontWeight: '600' },
  compactMeta: { marginTop: 4, fontSize: 13 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: layout.cardRadius,
    padding: layout.cardPadding,
    gap: 16,
  },
  cardTop: { gap: 4 },
  title: { fontFamily: 'Anton_400Regular', fontSize: 22, letterSpacing: 0.2 },
  category: { fontSize: 13, fontWeight: '500' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  xp: { fontFamily: 'Anton_400Regular', fontSize: 16 },
  timer: { fontSize: 13, fontWeight: '500' },
  cardButton: { alignSelf: 'flex-start', minWidth: 120 },
});
