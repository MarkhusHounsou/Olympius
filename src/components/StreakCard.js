import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export function StreakCard({ days, onPress, compact = false, style }) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.card,
        compact && styles.compact,
        { backgroundColor: theme.surface, borderColor: theme.accentPrimary },
        style,
      ]}
    >
      <Text style={styles.emoji}>🔥</Text>
      <View style={styles.copy}>
        <Text style={[styles.count, { color: theme.text }]}>{days} JOUR{days > 1 ? 'S' : ''}</Text>
        <Text style={[styles.hint, { color: theme.textMuted }]}>
          {compact ? 'Série active' : 'Consécutifs — continue demain !'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1.2, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
  compact: { padding: 12 },
  emoji: { fontSize: 28 },
  copy: { flex: 1 },
  count: { fontFamily: 'Anton_400Regular', fontSize: 22, letterSpacing: 0.3 },
  hint: { marginTop: 2, fontSize: 13, fontWeight: '700' },
});
