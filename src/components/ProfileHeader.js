import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export function ProfileHeader({ user, onPress, style }) {
  const { theme } = useTheme();
  const initial = (user.firstName || user.username || '?').slice(0, 1).toUpperCase();
  const name = user.firstName || user.username;

  return (
    <Pressable onPress={onPress} disabled={!onPress} style={[styles.wrap, style]}>
      <View style={styles.copy}>
        <Text style={[styles.greeting, { color: theme.textMuted }]}>Bonjour,</Text>
        <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
        <Text style={[styles.level, { color: theme.textMuted }]}>Niveau {user.level}</Text>
      </View>
      <View style={[styles.avatar, { backgroundColor: theme.surfaceRaised, borderColor: theme.track }]}>
        <Text style={[styles.avatarText, { color: theme.text }]}>{initial}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  copy: { flex: 1 },
  greeting: { fontSize: 14, fontWeight: '500' },
  name: { fontFamily: 'Anton_400Regular', fontSize: 28, marginTop: 2, letterSpacing: 0.3 },
  level: { marginTop: 4, fontSize: 14, fontWeight: '500' },
  avatar: { width: 48, height: 48, borderRadius: 24, borderWidth: StyleSheet.hairlineWidth, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Anton_400Regular', fontSize: 20 },
});
