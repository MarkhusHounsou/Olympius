import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export function LevelBadge({ level, size = 'md', style }) {
  const { theme } = useTheme();
  const sizes = { sm: 28, md: 36, lg: 48 };
  const fontSizes = { sm: 14, md: 18, lg: 24 };
  const dim = sizes[size] || sizes.md;

  return (
    <View style={[styles.badge, { width: dim, height: dim, borderRadius: dim / 2, backgroundColor: theme.accentGlow, borderColor: theme.accentPrimary }, style]}>
      <Text style={[styles.text, { color: theme.accentPrimary, fontSize: fontSizes[size] || fontSizes.md }]}>{level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  text: { fontFamily: 'Anton_400Regular' },
});
