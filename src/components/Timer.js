import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export function Timer({ value, label = 'restantes', size = 'md', style }) {
  const { theme } = useTheme();
  const fontSize = size === 'lg' ? 28 : size === 'sm' ? 16 : 20;

  return (
    <View style={[styles.wrap, style]}>
      <Ionicons name="time-outline" size={fontSize - 2} color={theme.accentPrimary} />
      <Text style={[styles.text, { color: theme.text, fontSize }]}>
        {value} {label !== false && <Text style={{ color: theme.textMuted, fontSize: fontSize - 4 }}>{label}</Text>}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  text: { fontFamily: 'Anton_400Regular', letterSpacing: 0.3 },
});
