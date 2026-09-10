import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const CHIP_WIDTH = 106;
const CHIP_HEIGHT = 108;

export function CategoryFilter({ id, label, icon, active, onPress }) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          borderColor: active ? theme.accentPrimary : theme.track,
          backgroundColor: active ? theme.surfaceRaised : theme.surface,
        },
        active && { shadowColor: theme.accentPrimary },
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`${label}${active ? ', sélectionné' : ''}`}
    >
      <View style={[styles.iconWrap, { backgroundColor: active ? theme.accentGlow : theme.backgroundSoft }]}>
        <Ionicons name={icon} size={25} color={active ? theme.accentPrimary : theme.textMuted} />
      </View>
      <Text
        style={[styles.label, { color: active ? theme.text : theme.textMuted }]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    width: CHIP_WIDTH,
    height: CHIP_HEIGHT,
    borderWidth: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    gap: 9,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  pressed: { opacity: 0.76 },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});
