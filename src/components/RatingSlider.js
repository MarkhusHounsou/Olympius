import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

export function RatingSlider({ value, onChange }) {
  const { theme } = useTheme();
  const label = value <= 1 ? 'INCOMPLET — Mouvement initié, amplitude insuffisante.' : value <= 3 ? 'CORRECT — Exécution solide, quelques ajustements possibles.' : 'TRÈS PROPRE — Bonne maîtrise et belle intensité.';
  const labelColor = value <= 1 ? theme.danger : value <= 3 ? theme.warning : theme.success;
  return (
    <View style={styles.wrap}>
      <View style={styles.scoreLine}>
        <Text style={[styles.score, { color: theme.text }]}>{value}</Text>
        <Text style={[styles.outOf, { color: theme.textMuted }]}>/5</Text>
      </View>
      <LinearGradient colors={[theme.danger, theme.warning, theme.success]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.track} />
      <View style={styles.steps}>
        {[0, 1, 2, 3, 4, 5].map((step) => (
          <Pressable key={step} onPress={() => onChange(step)} style={[styles.step, { borderColor: theme.background, backgroundColor: step === value ? theme.text : theme.surfaceRaised }]}>
            <Text style={[styles.stepText, { color: step === value ? theme.background : theme.text }]}>{step}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={[styles.feedback, { color: labelColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 20 },
  scoreLine: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' },
  score: { fontFamily: 'Anton_400Regular', fontSize: 54 },
  outOf: { fontFamily: 'Anton_400Regular', fontSize: 24 },
  track: { height: 8, borderRadius: 6, marginHorizontal: 5, marginTop: 6 },
  steps: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -20 },
  step: { width: 34, height: 34, borderWidth: 3, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  stepText: { fontWeight: '900', fontSize: 13 },
  feedback: { marginTop: 25, fontWeight: '800', textAlign: 'center', lineHeight: 20 },
});
