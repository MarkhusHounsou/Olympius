import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function BestChallengeRow({ item, style }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.row, { backgroundColor: theme.surface, borderColor: theme.track }, style]}>
      <View style={[styles.iconWrap, { backgroundColor: theme.accentGlow }]}>
        <Ionicons name={item.icon || 'flash-outline'} size={20} color={theme.accentPrimary} />
      </View>
      <View style={styles.copy}>
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.result, { color: theme.textMuted }]}>{item.result}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.xp, { color: theme.accentPrimary }]}>+{item.xp}</Text>
        <Text style={[styles.date, { color: theme.textDim }]}>{item.date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: layout.cardRadiusSm,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600' },
  result: { marginTop: 3, fontSize: 13, fontWeight: '500' },
  right: { alignItems: 'flex-end' },
  xp: { fontFamily: 'Anton_400Regular', fontSize: 16 },
  date: { marginTop: 2, fontSize: 11, fontWeight: '500' },
});
