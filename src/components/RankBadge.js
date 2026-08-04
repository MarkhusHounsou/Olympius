import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export function RankBadge({ rank }) {
  const { theme } = useTheme();
  const color = rank === 1 ? theme.warning : rank === 2 ? theme.textMuted : rank === 3 ? theme.sponsorEnd : theme.surfaceMuted;
  return <View style={[styles.badge, { backgroundColor: color }]}><Text style={[styles.number, { color: rank <= 3 ? theme.background : theme.text }]}>{rank}</Text></View>;
}

const styles = StyleSheet.create({
  badge: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  number: { fontFamily: 'Anton_400Regular', fontSize: 17 },
});
