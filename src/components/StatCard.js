import { StyleSheet, Text, View } from 'react-native';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function StatCard({ label, value, style }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.track }, style]}>
      <Text style={[styles.value, { color: theme.text }]} numberOfLines={1}>{value}</Text>
      <Text style={[styles.label, { color: theme.textMuted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '46%',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: layout.cardRadiusSm,
    paddingVertical: 18,
    paddingHorizontal: 14,
  },
  value: { fontFamily: 'Anton_400Regular', fontSize: 22 },
  label: { marginTop: 6, fontSize: 11, fontWeight: '600', letterSpacing: 0.3, textTransform: 'uppercase' },
});
