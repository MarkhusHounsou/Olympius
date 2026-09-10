import { Pressable, StyleSheet, Text } from 'react-native';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function StatPill({ label, value, onPress, style }) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.pill, { backgroundColor: theme.surface, borderColor: theme.track }, style]}
    >
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.textMuted }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: layout.cardRadiusSm,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  value: { fontFamily: 'Anton_400Regular', fontSize: 18, letterSpacing: 0.2 },
  label: { marginTop: 4, fontSize: 10, fontWeight: '600', letterSpacing: 0.4, textTransform: 'uppercase' },
});
