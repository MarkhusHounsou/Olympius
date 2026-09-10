import { StyleSheet, Text, View } from 'react-native';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function Podium({ topThree, style }) {
  const { theme } = useTheme();
  const ordered = [topThree[1], topThree[0], topThree[2]].filter(Boolean);

  return (
    <View style={[styles.wrap, style]}>
      {ordered.map((item) => (
        <View key={item.rank} style={styles.slot}>
          <Text style={[styles.rank, { color: item.rank === 1 ? theme.accentPrimary : theme.textMuted }]}>
            #{item.rank}
          </Text>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>{item.username}</Text>
          <Text style={[styles.xp, { color: theme.textMuted }]}>{item.xp.toLocaleString('fr-FR')} XP</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: layout.blockGap,
    paddingVertical: 8,
  },
  slot: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  rank: { fontFamily: 'Anton_400Regular', fontSize: 22 },
  name: { marginTop: 8, fontSize: 13, fontWeight: '600', textAlign: 'center' },
  xp: { marginTop: 4, fontSize: 12, fontWeight: '500' },
});
