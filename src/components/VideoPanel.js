import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

export function VideoPanel({ onPress, label = 'APERÇU VIDÉO' }) {
  const { theme } = useTheme();
  return (
    <Pressable onPress={onPress} style={[styles.frame, { borderColor: theme.surfaceMuted }]}>
      <LinearGradient colors={[theme.surfaceRaised, theme.backgroundSoft]} style={styles.gradient}>
        <View style={[styles.play, { borderColor: theme.accentPrimary, shadowColor: theme.accentPrimary }]}>
          <Ionicons name="play" size={38} color={theme.accentPrimary} />
        </View>
      </LinearGradient>
      <View style={[styles.label, { backgroundColor: theme.backgroundSoft }]}>
        <Ionicons name="videocam-outline" size={15} color={theme.text} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  frame: { height: 320, borderRadius: 22, overflow: 'hidden', borderWidth: 1.5, position: 'relative' },
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  play: { width: 82, height: 82, paddingLeft: 4, borderWidth: 2, borderRadius: 45, alignItems: 'center', justifyContent: 'center', shadowOpacity: 0.7, shadowRadius: 15, elevation: 7 },
  label: { position: 'absolute', top: 14, right: 14, padding: 8, borderRadius: 14 },
});
