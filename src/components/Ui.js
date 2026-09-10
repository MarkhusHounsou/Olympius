import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NeonBackdrop } from './NeonBackdrop';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function Screen({ children, scroll = true, withBackdrop = true, contentStyle, style, footer }) {
  const { theme } = useTheme();
  const body = scroll ? (
    <ScrollView contentContainerStyle={[styles.scroll, contentStyle]} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.fill, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView className="flex-1" style={[styles.safe, { backgroundColor: theme.background }, style]}>
      {withBackdrop && <NeonBackdrop subtle />}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView} pointerEvents="box-none">
        {body}
        {footer}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function ScreenFooter({ children, style }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.track }, style]}>
      {children}
    </View>
  );
}

export function Display({ children, size = 28, style, align = 'left' }) {
  const { theme } = useTheme();
  return (
    <Text style={[styles.display, { color: theme.text, fontSize: size, textAlign: align, lineHeight: size * 1.12 }, style]}>
      {children}
    </Text>
  );
}

export function SectionLabel({ children, style }) {
  const { theme } = useTheme();
  return <Text style={[styles.sectionLabel, { color: theme.textMuted }, style]}>{children}</Text>;
}

export function BodyText({ children, style, muted = false, size = 15 }) {
  const { theme } = useTheme();
  return (
    <Text style={[styles.body, { color: muted ? theme.textMuted : theme.text, fontSize: size, lineHeight: size * 1.45 }, style]}>
      {children}
    </Text>
  );
}

export function TextLink({ label, onPress, style }) {
  const { theme } = useTheme();
  return (
    <Pressable onPress={onPress} style={[styles.textLink, style]}>
      <Text style={[styles.textLinkLabel, { color: theme.accentPrimary }]}>{label}</Text>
    </Pressable>
  );
}

export function Card({ children, style, muted = false }) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: muted ? theme.surface : theme.surfaceRaised,
          borderColor: theme.track,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function NeonButton({ label, onPress, variant = 'solid', icon, disabled = false, style, compact = false }) {
  const { theme } = useTheme();
  const solid = variant === 'solid';
  const colors = solid ? [theme.accentPrimary, theme.accentPrimary] : ['transparent', 'transparent'];

  return (
    <Pressable disabled={disabled} onPress={onPress} style={[styles.buttonWrap, disabled && { opacity: 0.4 }, style]}>
      <LinearGradient
        colors={colors}
        style={[
          styles.button,
          compact && styles.buttonCompact,
          !solid && { borderWidth: 1, borderColor: theme.line },
        ]}
      >
        <Text style={[styles.buttonText, compact && styles.buttonTextCompact, { color: solid ? theme.background : theme.text }]}>
          {label}
        </Text>
        {icon}
      </LinearGradient>
    </Pressable>
  );
}

export function DividerTitle({ children, style }) {
  return <SectionLabel style={[{ marginTop: layout.sectionGap }, style]}>{children}</SectionLabel>;
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  keyboardView: { flex: 1, zIndex: 1 },
  fill: {
    flex: 1,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.screenPaddingX,
  },
  scroll: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.screenPaddingX,
    paddingBottom: layout.screenPaddingBottom,
  },
  footer: {
    paddingHorizontal: layout.screenPaddingX,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  display: { fontFamily: 'Anton_400Regular', letterSpacing: 0.3 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  body: { fontFamily: 'System' },
  textLink: { alignItems: 'center', paddingVertical: 14 },
  textLinkLabel: { fontSize: 14, fontWeight: '700', letterSpacing: 0.2 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: layout.cardRadius,
    padding: layout.cardPadding,
  },
  buttonWrap: { borderRadius: layout.buttonRadius, overflow: 'hidden' },
  button: {
    minHeight: layout.buttonHeight,
    paddingHorizontal: 24,
    borderRadius: layout.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonCompact: { minHeight: 44, paddingHorizontal: 18 },
  buttonText: { fontFamily: 'Anton_400Regular', fontSize: 17, letterSpacing: 0.4 },
  buttonTextCompact: { fontSize: 15 },
});
