import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { RankBadge } from '../components/RankBadge';
import { Display, NeonButton, Screen } from '../components/Ui';
import { currentUser, ranking } from '../mocks/data';
import { useTheme } from '../theme/ThemeContext';

export function RankingScreen({ navigation }) {
  const { theme } = useTheme();
  const [limit, setLimit] = useState(10);
  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} />
      <Display size={39} align="center" style={styles.title}>CLASSEMENT</Display>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>30 SQUATS EN 1 MINUTE</Text>
      <View style={[styles.position, { borderColor: theme.accentPrimary, backgroundColor: theme.surface }]}><Text style={[styles.positionNumber, { color: theme.accentPrimary }]}>{currentUser.rank}/{currentUser.totalRanked}</Text><Text style={[styles.positionLabel, { color: theme.text }]}>TA POSITION ACTUELLE</Text><NeonButton label="VOIR MA POSITION" variant="outline" onPress={() => setLimit(Math.max(limit, 10))} style={styles.positionButton} /></View>
      <View style={styles.list}>{ranking.slice(0, limit).map((item) => <RankRow key={item.rank} item={item} theme={theme} />)}</View>
      {limit < ranking.length && <Pressable onPress={() => setLimit(ranking.length)}><Text style={[styles.more, { color: theme.accentPrimary }]}>VOIR PLUS</Text></Pressable>}
    </Screen>
  );
}

function RankRow({ item, theme }) {
  const current = item.username === currentUser.username;
  return <View style={[styles.rankRow, { borderColor: current ? theme.accentPrimary : theme.track, backgroundColor: current ? theme.surfaceRaised : theme.surface }]}><RankBadge rank={item.rank} /><View style={[styles.avatar, { backgroundColor: current ? theme.accentGlow : theme.surfaceMuted }]}><Text style={[styles.avatarText, { color: theme.text }]}>{item.username.slice(0, 1).toUpperCase()}</Text></View><View style={styles.name}><Text style={[styles.username, { color: theme.text }]}>{item.username}</Text><Text style={[styles.level, { color: theme.textMuted }]}>NIV. {item.level}</Text></View><Text style={[styles.earned, { color: theme.text }]}>+{item.points}</Text></View>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 35 }, title: { marginTop: 39 }, subtitle: { marginTop: 7, textAlign: 'center', fontSize: 12, fontWeight: '800', letterSpacing: 0.8 },
  position: { marginTop: 31, padding: 20, borderWidth: 1.5, borderRadius: 19, alignItems: 'center' }, positionNumber: { fontFamily: 'Anton_400Regular', fontSize: 48 }, positionLabel: { marginTop: -2, fontWeight: '800', fontSize: 13 }, positionButton: { marginTop: 17, width: '76%' },
  list: { marginTop: 25, gap: 10 }, rankRow: { minHeight: 66, padding: 10, paddingHorizontal: 14, borderWidth: 1, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 37, height: 37, borderRadius: 19, alignItems: 'center', justifyContent: 'center' }, avatarText: { fontFamily: 'Anton_400Regular', fontSize: 20 }, name: { flex: 1 }, username: { fontWeight: '800', fontSize: 15 }, level: { fontSize: 11, marginTop: 2, fontWeight: '700' }, earned: { fontFamily: 'Anton_400Regular', fontSize: 21 }, more: { marginTop: 27, fontFamily: 'Anton_400Regular', fontSize: 24, textAlign: 'center' },
});
