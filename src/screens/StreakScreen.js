import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { BodyText, Card, Screen } from '../components/Ui';
import { currentUser, streakDays } from '../mocks/data';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function StreakScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} back title="Série" />
      <View style={styles.hero}>
        <Text style={[styles.count, { color: theme.text }]}>{currentUser.streak}</Text>
        <Text style={[styles.label, { color: theme.textMuted }]}>jours consécutifs</Text>
      </View>
      <BodyText muted style={styles.hint}>
        Continue demain pour atteindre {currentUser.streak + 1} jours.
      </BodyText>
      <View style={styles.calendar}>
        {streakDays.map((day, index) => (
          <View key={`${day.day}-${index}`} style={styles.dayCol}>
            <Text style={[styles.dayLabel, { color: theme.textMuted }]}>{day.day}</Text>
            <View
              style={[
                styles.dayDot,
                { backgroundColor: day.active ? theme.accentPrimary : theme.track },
              ]}
            />
          </View>
        ))}
      </View>
      <Card style={styles.tip} muted>
        <BodyText muted>Relève un défi par jour pour maintenir ta série.</BodyText>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  hero: { alignItems: 'center', marginTop: layout.sectionGap },
  count: { fontFamily: 'Anton_400Regular', fontSize: 64, letterSpacing: 0.3 },
  label: { marginTop: 4, fontSize: 15, fontWeight: '500' },
  hint: { textAlign: 'center', marginTop: 16 },
  calendar: { flexDirection: 'row', justifyContent: 'space-between', marginTop: layout.sectionGap, paddingHorizontal: 4 },
  dayCol: { alignItems: 'center', gap: 10 },
  dayLabel: { fontSize: 12, fontWeight: '600' },
  dayDot: { width: 32, height: 32, borderRadius: 16 },
  tip: { marginTop: layout.sectionGap },
});
