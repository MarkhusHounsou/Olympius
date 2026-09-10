import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export function DifficultyStars({ level, max = 5, style }) {
  const { theme } = useTheme();
  const stars = Array.from({ length: max }, (_, index) => (index < level ? '★' : '☆'));

  return (
    <View style={[styles.wrap, style]}>
      <Text style={[styles.label, { color: theme.textMuted }]}>DIFFICULTÉ</Text>
      <Text style={[styles.stars, { color: theme.warning }]}>{stars.join('')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  label: { fontSize: 11, fontWeight: '800', letterSpacing: 0.6 },
  stars: { fontFamily: 'Anton_400Regular', fontSize: 28, marginTop: 4, letterSpacing: 2 },
});
