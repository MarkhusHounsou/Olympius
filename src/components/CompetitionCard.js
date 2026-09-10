import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NeonButton } from './Ui';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function CompetitionCard({ competition, onPress, joined = false, upcoming = false }) {
  const { theme } = useTheme();
  const places = competition.maxParticipants - competition.participants;
  const stars = '★'.repeat(competition.difficulty) + '☆'.repeat(5 - competition.difficulty);

  return (
    <View style={[styles.card, { backgroundColor: theme.surfaceRaised, borderColor: competition.active ? theme.track : theme.track, opacity: upcoming ? 0.72 : 1 }]}>
      <Pressable onPress={onPress} style={styles.top}>
        <View style={styles.titleRow}>
          <View style={[styles.icon, { backgroundColor: competition.active ? theme.accentGlow : theme.backgroundSoft }]}>
            <Ionicons name={competition.icon} size={22} color={competition.active ? theme.accentPrimary : theme.textMuted} />
          </View>
          <View style={styles.titleCopy}>
            <Text style={[styles.tag, { color: competition.active ? theme.accentPrimary : theme.textMuted }]}>
              {competition.active ? 'COMPÉTITION OFFICIELLE' : 'BIENTÔT'}
            </Text>
            <Text style={[styles.title, { color: theme.text }]}>{competition.shortTitle}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.textDim} />
        </View>
        <Text style={[styles.challenge, { color: theme.textMuted }]}>{competition.challenge}</Text>
      </Pressable>

      <View style={styles.metrics}>
        <Metric icon="time-outline" value={competition.active ? competition.endsIn : competition.startsIn} label={competition.active ? 'restantes' : ''} />
        <Metric icon="people-outline" value={competition.active ? `${places} places` : `${competition.maxParticipants} places`} label={competition.active ? 'disponibles' : ''} />
      </View>
      <View style={styles.financeRow}>
        <Text style={[styles.ticket, { color: theme.text }]}>🎟 {competition.ticket}</Text>
        <Text style={[styles.prize, { color: theme.warning }]}>🏆 {competition.prizePool}</Text>
        <Text style={[styles.stars, { color: theme.textMuted }]}>{stars}</Text>
      </View>
      <NeonButton
        label={joined ? 'Voir ma participation' : upcoming ? 'Me prévenir' : 'Participer'}
        variant={joined || upcoming ? 'outline' : 'solid'}
        onPress={onPress}
        compact
        style={styles.cta}
      />
    </View>
  );
}

function Metric({ icon, value, label }) {
  const { theme } = useTheme();
  return (
    <View style={styles.metric}>
      <Ionicons name={icon} size={15} color={theme.textMuted} />
      <Text style={[styles.metricText, { color: theme.textMuted }]}>{value}{label ? ` ${label}` : ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: StyleSheet.hairlineWidth, borderRadius: layout.cardRadius, padding: 18 },
  top: { paddingBottom: 14 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  icon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  titleCopy: { flex: 1 },
  tag: { fontSize: 10, fontWeight: '800', letterSpacing: 0.7 },
  title: { marginTop: 3, fontFamily: 'Anton_400Regular', fontSize: 22, letterSpacing: 0.3 },
  challenge: { marginTop: 12, fontSize: 13, fontWeight: '500' },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingTop: 14, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#FFFFFF18' },
  metric: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metricText: { fontSize: 12, fontWeight: '600' },
  financeRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginTop: 14 },
  ticket: { fontSize: 13, fontWeight: '700' },
  prize: { fontSize: 13, fontWeight: '700' },
  stars: { marginLeft: 'auto', fontSize: 12, letterSpacing: 1 },
  cta: { marginTop: 18 },
});
