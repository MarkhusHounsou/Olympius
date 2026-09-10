import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { OlympiusLogo } from '../components/OlympiusLogo';
import { useAppDemo } from '../context/AppDemoContext';
import { BodyText, NeonButton, Screen } from '../components/Ui';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const { hasSportProfile } = useAppDemo();
  const [showPassword, setShowPassword] = useState(false);
  const enter = () => navigation.reset({ index: 0, routes: [{ name: hasSportProfile ? 'App' : 'SportProfile' }] });

  return (
    <Screen contentStyle={styles.content}>
      <OlympiusLogo size={80} showWord={false} />
      <Text style={[styles.heading, { color: theme.text }]}>Connexion</Text>
      <BodyText muted style={styles.subtitle}>Accède à ton espace et relève ton prochain défi.</BodyText>

      <View style={styles.form}>
        <View style={[styles.field, { borderColor: theme.track, backgroundColor: theme.surface }]}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="Nom d'utilisateur"
            placeholderTextColor={theme.textDim}
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        <View style={[styles.field, styles.passwordField, { borderColor: theme.track, backgroundColor: theme.surface }]}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Mot de passe"
            placeholderTextColor={theme.textDim}
            secureTextEntry={!showPassword}
            style={[styles.input, styles.passwordInput, { color: theme.text }]}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={({ pressed }) => [styles.eyeButton, pressed && styles.eyeButtonPressed]}
            hitSlop={8}
            accessibilityLabel={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={theme.textMuted} />
          </Pressable>
        </View>

        <Pressable style={styles.forgotWrap}>
          <Text style={[styles.forgot, { color: theme.textMuted }]}>Mot de passe oublié ?</Text>
        </Pressable>

        <NeonButton label="Connexion" onPress={enter} style={styles.primaryButton} />
        <NeonButton label="Créer un compte" variant="outline" onPress={() => navigation.navigate('Signup')} />
      </View>

      <View style={styles.dividerRow}>
        <View style={[styles.dividerLine, { backgroundColor: theme.track }]} />
        <Text style={[styles.dividerText, { color: theme.textDim }]}>ou</Text>
        <View style={[styles.dividerLine, { backgroundColor: theme.track }]} />
      </View>

      <Pressable
        onPress={enter}
        style={({ pressed }) => [
          styles.googleButton,
          { borderColor: theme.track, backgroundColor: theme.surfaceRaised },
          pressed && styles.googleButtonPressed,
        ]}
      >
        <View style={styles.googleMarkWrap}><GoogleMark /></View>
        <Text style={[styles.googleText, { color: theme.text }]}>Continuer avec Google</Text>
      </Pressable>
    </Screen>
  );
}

function GoogleMark() {
  return (
    <Svg width={19} height={19} viewBox="0 0 18 18" accessibilityLabel="Google">
      <Path fill="#EA4335" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.483h4.844a4.14 4.14 0 0 1-1.797 2.716v2.259h2.909c1.702-1.567 2.684-3.875 2.684-6.617Z" />
      <Path fill="#4285F4" d="M9 18c2.43 0 4.467-.806 5.956-2.178l-2.909-2.259c-.806.54-1.837.858-3.047.858-2.344 0-4.328-1.584-5.036-3.71H.957v2.333A9 9 0 0 0 9 18Z" />
      <Path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.957H.957A9 9 0 0 0 0 9c0 1.452.348 2.827.957 4.043l3.007-2.333Z" />
      <Path fill="#34A853" d="M9 3.58c1.322 0 2.507.455 3.44 1.348l2.58-2.58C13.463.897 11.426 0 9 0A9 9 0 0 0 .957 4.957l3.007 2.333C4.672 5.164 6.656 3.58 9 3.58Z" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 40, alignItems: 'stretch' },
  heading: {
    marginTop: 32,
    fontFamily: 'Anton_400Regular',
    fontSize: 32,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  subtitle: { marginTop: 8, textAlign: 'center' },
  form: { width: '100%', marginTop: 36, gap: 12 },
  field: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: layout.buttonRadius,
    minHeight: layout.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  passwordField: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  input: { fontSize: 16, paddingVertical: 14 },
  passwordInput: { flex: 1, paddingRight: 52 },
  eyeButton: {
    position: 'absolute',
    right: 4,
    top: 4,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  eyeButtonPressed: { opacity: 0.62 },
  forgotWrap: { alignSelf: 'flex-end', paddingVertical: 4 },
  forgot: { fontSize: 13, fontWeight: '500' },
  primaryButton: { marginTop: 8 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 28,
    marginBottom: 20,
  },
  dividerLine: { flex: 1, height: StyleSheet.hairlineWidth },
  dividerText: { fontSize: 13, fontWeight: '500' },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    minHeight: 58,
    borderWidth: 1,
    borderRadius: layout.buttonRadius,
    paddingHorizontal: 16,
  },
  googleButtonPressed: { opacity: 0.82 },
  googleMarkWrap: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleText: { fontSize: 15, fontWeight: '700' },
});
