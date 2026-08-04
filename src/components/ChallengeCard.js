import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { NeonButton } from './Ui';

export function ChallengeCard({ challenge, onPress, expanded = false, disabled = false }) {
  const { theme } = useTheme();
  const border = disabled ? theme.line : theme.accentPrimary;
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.card, { backgroundColor: disabled ? theme.surface : theme.surfaceRaised, borderColor: border }, disabled && { opacity: 0.76 }]}
    >
      <View style={styles.topLine}>
        <Ionicons name={challenge.icon} size={34} color={disabled ? theme.textMuted : theme.accentPrimary} />
        <View style={styles.titleArea}>
          <Text style={[styles.title, { color: theme.text }]}>{challenge.title}</Text>
          {expanded && <Text style={[styles.description, { color: theme.text }]}>{challenge.shortDescription}</Text>}
        </View>
      </View>
      {expanded && (
        <View style={styles.actions}>
          <Text style={[styles.category, { color: theme.text }]}>{challenge.category}</Text>
          <NeonButton label={disabled ? 'PROCHAINEMENT' : 'JE PARTICIPE'} onPress={onPress} disabled={disabled} style={styles.join} />
          <Text style={[styles.points, { color: theme.text }]}>+ {challenge.points}</Text>
        </View>
      )}
      {!expanded && <Text style={[styles.timer, { color: theme.text }]}>Fin dans {challenge.timer}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1.5, borderRadius: 16, padding: 18, gap: 14 },
  topLine: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  titleArea: { flex: 1 },
  title: { fontFamily: 'Anton_400Regular', fontSize: 23, lineHeight: 26, letterSpacing: 0.2 },
  description: { marginTop: 9, fontSize: 14, lineHeight: 18, fontWeight: '700' },
  timer: { fontWeight: '800', fontSize: 15 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 2 },
  category: { fontFamily: 'Anton_400Regular', fontSize: 22, flex: 1 },
  join: { flex: 1.42 },
  points: { fontFamily: 'Anton_400Regular', fontSize: 22, textAlign: 'right', minWidth: 54 },
});
