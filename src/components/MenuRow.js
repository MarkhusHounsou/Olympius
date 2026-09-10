import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export function MenuRow({ label, onPress, chevron = true, style }) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { borderBottomColor: theme.track, opacity: pressed ? 0.7 : 1 },
        style,
      ]}
    >
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      {chevron && <Ionicons name="chevron-forward" size={18} color={theme.textDim} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: { fontSize: 15, fontWeight: '500' },
});
