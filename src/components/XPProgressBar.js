import { StyleSheet, Text, View } from 'react-native';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function XPProgressBar({ current, max, showValues = true, style }) {
  const { theme } = useTheme();
  const ratio = Math.min(Math.max(current / max, 0), 1);

  return (
    <View style={[styles.wrap, style]}>
      <View style={[styles.track, { backgroundColor: theme.track }]}>
        <View style={[styles.fill, { width: `${ratio * 100}%`, backgroundColor: theme.accentPrimary }]} />
      </View>
      {showValues && (
        <Text style={[styles.value, { color: theme.textMuted }]}>
          {current.toLocaleString('fr-FR')} / {max.toLocaleString('fr-FR')} XP
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  track: { height: 4, borderRadius: 2, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 2 },
  value: { marginTop: 8, fontSize: 12, fontWeight: '500' },
});
