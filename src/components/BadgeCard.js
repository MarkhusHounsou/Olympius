import { Pressable, StyleSheet, Text } from 'react-native';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function BadgeCard({ badge, unlocked = false, onPress, style }) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.card,
        {
          borderColor: unlocked ? theme.track : theme.track,
          backgroundColor: unlocked ? theme.surfaceRaised : theme.surface,
          opacity: unlocked ? 1 : 0.4,
        },
        style,
      ]}
    >
      <Text style={styles.emoji}>{unlocked ? badge.emoji : '·'}</Text>
      <Text style={[styles.name, { color: unlocked ? theme.text : theme.textDim }]} numberOfLines={2}>
        {badge.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 80,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: layout.cardRadiusSm,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  emoji: { fontSize: 24, marginBottom: 6 },
  name: { fontSize: 10, fontWeight: '600', textAlign: 'center', lineHeight: 13 },
});
