import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NeonBackdrop } from './NeonBackdrop';
import { useTheme } from '../theme/ThemeContext';

export function Screen({ children, scroll = true, withBackdrop = true, contentStyle, style }) {
  const { theme } = useTheme();
  const body = scroll ? (
    <ScrollView contentContainerStyle={[styles.scroll, contentStyle]} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : <View style={[styles.fill, contentStyle]}>{children}</View>;

  return (
    <SafeAreaView className="flex-1" style={[styles.safe, { backgroundColor: theme.background }, style]}>
      {withBackdrop && <NeonBackdrop subtle />}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        {body}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function Display({ children, size = 34, style, align = 'left' }) {
  const { theme } = useTheme();
  return <Text style={[styles.display, { color: theme.text, fontSize: size, textAlign: align, lineHeight: size * 1.06 }, style]}>{children}</Text>;
}

export function BodyText({ children, style, muted = false }) {
  const { theme } = useTheme();
  return <Text style={[styles.body, { color: muted ? theme.textMuted : theme.text }, style]}>{children}</Text>;
}

export function NeonButton({ label, onPress, variant = 'solid', icon, disabled = false, style }) {
  const { theme } = useTheme();
  const solid = variant === 'solid';
  const colors = solid ? [theme.accentPrimary, theme.accentPrimary] : [theme.surfaceRaised, theme.surfaceRaised];
  return (
    <Pressable disabled={disabled} onPress={onPress} style={[styles.buttonWrap, disabled && { opacity: 0.48 }, style]}>
      <LinearGradient
        colors={colors}
        style={[
          styles.button,
          !solid && { borderWidth: 1.5, borderColor: theme.accentPrimary },
          solid && { shadowColor: theme.accentPrimary },
        ]}
      >
        <Text style={[styles.buttonText, { color: solid ? theme.background : theme.text }]}>{label}</Text>
        {icon}
      </LinearGradient>
    </Pressable>
  );
}

export function DividerTitle({ children, style }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.dividerTitle, style]}>
      <Display size={28}>{children}</Display>
      <View style={[styles.divider, { backgroundColor: theme.accentPrimary }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  keyboardView: { flex: 1 },
  fill: { flex: 1 },
  scroll: { width: '100%', maxWidth: 620, alignSelf: 'center', paddingHorizontal: 22, paddingBottom: 112 },
  display: { fontFamily: 'Anton_400Regular', letterSpacing: 0.4 },
  body: { fontSize: 15, lineHeight: 21, fontFamily: 'System' },
  buttonWrap: { borderRadius: 16, overflow: 'visible' },
  button: { minHeight: 56, paddingHorizontal: 24, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, shadowOpacity: 0.58, shadowRadius: 16, shadowOffset: { width: 0, height: 0 }, elevation: 8 },
  buttonText: { fontFamily: 'Anton_400Regular', fontSize: 22, letterSpacing: 0.35 },
  dividerTitle: { marginTop: 25, flexDirection: 'row', gap: 18, alignItems: 'center' },
  divider: { flex: 1, height: 3, marginTop: 7 },
});
