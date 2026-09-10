import { StyleSheet, Text, View } from 'react-native';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function LeaderboardRow({ item, isCurrent = false, style }) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.row,
        {
          borderColor: isCurrent ? theme.accentPrimary : theme.track,
          backgroundColor: isCurrent ? theme.surfaceRaised : 'transparent',
        },
        style,
      ]}
    >
      <Text style={[styles.rank, { color: isCurrent ? theme.accentPrimary : theme.textMuted }]}>#{item.rank}</Text>
      <Text style={[styles.username, { color: theme.text }]} numberOfLines={1}>{item.username}</Text>
      <Text style={[styles.xp, { color: theme.textMuted }]}>{item.xp.toLocaleString('fr-FR')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 52,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: layout.cardRadiusSm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rank: { width: 36, fontFamily: 'Anton_400Regular', fontSize: 16 },
  username: { flex: 1, fontSize: 15, fontWeight: '500' },
  xp: { fontSize: 13, fontWeight: '500' },
});
