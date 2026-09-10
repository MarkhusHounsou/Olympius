import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppDemo } from '../context/AppDemoContext';
import { Header } from '../components/Header';
import { BodyText, Card, Display, NeonButton, Screen, SectionLabel } from '../components/Ui';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

const sexLabels = { female: 'Femme', male: 'Homme', other: 'Autre' };

export default function ProfileScreen({ navigation }) {
  const { theme } = useTheme();
  const { sportProfile } = useAppDemo();
  const editProfile = () => navigation.navigate('SportProfile', { editing: true });

  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} minimal />
      <Display size={42} style={styles.title}>MON PROFIL</Display>
      <BodyText muted style={styles.subtitle}>Tes données sportives et ton profil de comparaison.</BodyText>
      {sportProfile ? (
        <>
          <Card style={styles.profileCard}>
            <View style={styles.profileIntro}>
              <View style={[styles.avatar, { backgroundColor: theme.accentGlow, borderColor: theme.accentPrimary }]}>
                <Ionicons name="body-outline" size={30} color={theme.accentPrimary} />
              </View>
              <View style={styles.introCopy}>
                <Text style={[styles.profileName, { color: theme.text }]}>Profil sportif</Text>
                <Text style={[styles.profileSex, { color: theme.textMuted }]}>{sexLabels[sportProfile.sex] || sportProfile.sex}</Text>
              </View>
              <Pressable onPress={editProfile} style={[styles.editButton, { borderColor: theme.track }]} accessibilityLabel="Modifier le profil sportif">
                <Ionicons name="create-outline" size={19} color={theme.textMuted} />
              </Pressable>
            </View>
            <SectionLabel style={styles.metricsLabel}>MES MESURES</SectionLabel>
            <View style={styles.metrics}>
              <Metric label="Âge" value={sportProfile.age} suffix="ans" theme={theme} />
              <Metric label="Taille" value={sportProfile.height} suffix="cm" theme={theme} />
              <Metric label="Poids" value={sportProfile.weight} suffix="kg" theme={theme} />
            </View>
          </Card>
          <View style={[styles.info, { borderColor: theme.track, backgroundColor: theme.backgroundSoft }]}>
            <Ionicons name="analytics-outline" size={19} color={theme.accentPrimary} />
            <BodyText muted size={13} style={styles.infoText}>Ces informations servent à comparer tes performances à des athlètes au profil proche.</BodyText>
          </View>
          <NeonButton label="Modifier mon profil" variant="outline" onPress={editProfile} style={styles.editCta} />
        </>
      ) : (
        <Card style={styles.emptyCard}>
          <Ionicons name="body-outline" size={34} color={theme.accentPrimary} />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>Profil sportif incomplet</Text>
          <BodyText muted style={styles.emptyCopy}>Ajoute tes mesures pour personnaliser tes comparaisons.</BodyText>
          <NeonButton label="Créer mon profil" onPress={editProfile} style={styles.editCta} />
        </Card>
      )}
    </Screen>
  );
}

function Metric({ label, value, suffix, theme }) {
  return (
    <View style={[styles.metric, { backgroundColor: theme.surfaceMuted }]}>
      <Text style={[styles.metricValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.metricSuffix, { color: theme.accentPrimary }]}>{suffix}</Text>
      <Text style={[styles.metricLabel, { color: theme.textMuted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  title: { marginTop: 34 },
  subtitle: { marginTop: 8 },
  profileCard: { marginTop: 28 },
  profileIntro: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 58, height: 58, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  introCopy: { flex: 1, marginLeft: 14 },
  profileName: { fontFamily: 'Anton_400Regular', fontSize: 22 },
  profileSex: { marginTop: 3, fontSize: 14 },
  editButton: { width: 40, height: 40, borderWidth: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  metricsLabel: { marginTop: 28, marginBottom: 12 },
  metrics: { flexDirection: 'row', gap: 8 },
  metric: { flex: 1, minHeight: 92, borderRadius: layout.cardRadiusSm, padding: 12, justifyContent: 'center' },
  metricValue: { fontFamily: 'Anton_400Regular', fontSize: 25 },
  metricSuffix: { position: 'absolute', right: 10, top: 14, fontSize: 11, fontWeight: '700' },
  metricLabel: { marginTop: 4, fontSize: 12, fontWeight: '600' },
  info: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: StyleSheet.hairlineWidth, borderRadius: layout.cardRadiusSm, padding: 14, marginTop: 18 },
  infoText: { flex: 1 },
  editCta: { marginTop: 20 },
  emptyCard: { marginTop: 28, alignItems: 'center' },
  emptyTitle: { fontFamily: 'Anton_400Regular', fontSize: 24, marginTop: 14 },
  emptyCopy: { textAlign: 'center', marginTop: 8 },
});
