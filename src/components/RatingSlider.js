import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export function RatingSlider({ value, onChange }) {
  const { theme } = useTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.score, { color: theme.text }]}>{value}<Text style={[styles.outOf, { color: theme.textMuted }]}>/5</Text></Text>
      <View style={styles.steps}>
        {[0, 1, 2, 3, 4, 5].map((step) => (
          <Pressable
            key={step}
            onPress={() => onChange(step)}
            style={[
              styles.step,
              {
                borderColor: theme.track,
                backgroundColor: step === value ? theme.accentPrimary : theme.surface,
              },
            ]}
          >
            <Text style={[styles.stepText, { color: step === value ? theme.background : theme.textMuted }]}>{step}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 28 },
  score: { fontFamily: 'Anton_400Regular', fontSize: 48, textAlign: 'center' },
  outOf: { fontSize: 24 },
  steps: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, gap: 6 },
  step: {
    flex: 1,
    height: 44,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: { fontSize: 14, fontWeight: '600' },
});
