import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { BodyText, Card, NeonButton, Screen } from '../components/Ui';
import { currentUser } from '../mocks/data';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function DuelsScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} back title="Duels" />
      <BodyText muted style={styles.hint}>Interface visuelle — logique non implémentée.</BodyText>
      <Card style={styles.card}>
        <View style={styles.player}>
          <Text style={[styles.name, { color: theme.text }]}>{currentUser.firstName}</Text>
          <Text style={[styles.score, { color: theme.accentPrimary }]}>48</Text>
        </View>
        <Text style={[styles.vs, { color: theme.textMuted }]}>vs</Text>
        <View style={styles.player}>
          <Text style={[styles.name, { color: theme.text }]}>John</Text>
          <Text style={[styles.score, { color: theme.text }]}>52</Text>
        </View>
        <Text style={[styles.timer, { color: theme.textMuted }]}>18h restantes</Text>
      </Card>
      <View style={styles.actions}>
        <NeonButton label="Inviter" disabled style={styles.action} />
        <NeonButton label="Accepter" variant="outline" disabled style={styles.action} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  hint: { marginTop: 8 },
  card: { marginTop: layout.sectionGap, alignItems: 'center', paddingVertical: 28 },
  player: { alignItems: 'center', marginVertical: 8 },
  name: { fontSize: 18, fontWeight: '600' },
  score: { fontFamily: 'Anton_400Regular', fontSize: 32, marginTop: 4 },
  vs: { fontSize: 13, fontWeight: '600', marginVertical: 8 },
  timer: { marginTop: 16, fontSize: 13, fontWeight: '500' },
  actions: { flexDirection: 'row', gap: 10, marginTop: layout.sectionGap },
  action: { flex: 1 },
});
