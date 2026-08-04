import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '../components/Header';
import { OlympiusLogo } from '../components/OlympiusLogo';
import { Display, Screen } from '../components/Ui';
import { currentUser, passLevels } from '../mocks/data';
import { useTheme } from '../theme/ThemeContext';

export function PassScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} back title="MON OLYMPE" />
      <View style={[styles.summary, { borderBottomColor: theme.accentPrimary }]}>
        <OlympiusLogo size={85} showWord={false} />
        <View style={styles.progressRow}><Text style={[styles.level, { color: theme.accentPrimary }]}>NIV. 38</Text><View style={[styles.bar, { borderColor: theme.accentPrimary }]}><View style={[styles.fill, { width: '72%', backgroundColor: theme.accentPrimary }]} /></View><Text style={[styles.level, { color: theme.text }]}>NIV. 39</Text></View>
        <View style={styles.pointRow}><Text style={[styles.points, { color: theme.text }]}>47 500</Text><Text style={[styles.points, { color: theme.text }]}>50 000</Text></View>
      </View>
      <View style={styles.route}>
        {passLevels.map((item) => <LevelCard key={item.level} item={item} theme={theme} />)}
      </View>
    </Screen>
  );
}

function LevelCard({ item, theme }) {
  const highlighted = item.current;
  const content = <><View><Text style={[styles.cardLevel, { color: item.sponsor ? theme.sponsorText : highlighted ? theme.text : theme.textDim }]}>NIV. {item.level}</Text><Text style={[styles.cardPoints, { color: item.sponsor ? theme.sponsorText : theme.textMuted }]}>{item.points.toLocaleString('fr-FR')} PTS</Text></View>{item.sponsor && <Text style={[styles.sponsor, { color: theme.sponsorText }]}>{item.sponsor}</Text>}</>;
  if (item.sponsor) return <LinearGradient colors={[theme.sponsorStart, theme.sponsorEnd]} style={styles.levelCard}>{content}</LinearGradient>;
  return <View style={[styles.levelCard, { backgroundColor: highlighted ? theme.surfaceRaised : theme.surface, borderColor: highlighted ? theme.accentPrimary : theme.track }, highlighted && { shadowColor: theme.accentPrimary }]}>{content}</View>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 35 },
  summary: { alignItems: 'center', paddingTop: 16, paddingBottom: 24, borderBottomWidth: 2 },
  progressRow: { width: '100%', marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 11 },
  level: { fontFamily: 'Anton_400Regular', fontSize: 22 },
  bar: { flex: 1, height: 13, borderWidth: 1, padding: 2 },
  fill: { height: '100%' },
  pointRow: { width: '100%', paddingHorizontal: 41, flexDirection: 'row', justifyContent: 'space-between' },
  points: { fontFamily: 'Anton_400Regular', fontSize: 15 },
  route: { gap: 23, marginTop: 36 },
  levelCard: { minHeight: 106, borderWidth: 1.5, borderRadius: 20, padding: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowOpacity: 0.55, shadowRadius: 17, elevation: 7 },
  cardLevel: { fontFamily: 'Anton_400Regular', fontSize: 34 },
  cardPoints: { fontFamily: 'Anton_400Regular', marginTop: 2, fontSize: 16 },
  sponsor: { fontFamily: 'Anton_400Regular', fontSize: 26, letterSpacing: 0.8 },
});
