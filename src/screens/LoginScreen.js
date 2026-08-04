import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OlympiusLogo } from '../components/OlympiusLogo';
import { NeonButton, Screen } from '../components/Ui';
import { useTheme } from '../theme/ThemeContext';

function LoginInput({ placeholder, secure, keyboardType = 'default' }) {
  const { theme } = useTheme();
  return <TextInput autoCapitalize="none" autoCorrect={false} keyboardType={keyboardType} placeholder={placeholder} placeholderTextColor={theme.textDim} secureTextEntry={secure} style={[styles.input, { color: theme.text, borderBottomColor: theme.line }]} />;
}

export function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const enter = () => navigation.reset({ index: 0, routes: [{ name: 'App' }] });
  return (
    <Screen contentStyle={styles.content}>
      <OlympiusLogo size={95} showWord={false} />
      <Text style={[styles.heading, { color: theme.text }]}>CONNEXION</Text>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>Accède à la salle et débloque les prochains défis.</Text>
      <View style={styles.form}>
        <LoginInput placeholder="Nom d’utilisateur" keyboardType="email-address" />
        <View>
          <LoginInput placeholder="Mot de passe" secure={!showPassword} />
          <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eye}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={theme.textMuted} />
          </Pressable>
        </View>
        <Pressable><Text style={[styles.forgot, { color: theme.text }]}>Mot de passe oublié ?</Text></Pressable>
        <NeonButton label="CONNEXION" onPress={enter} style={styles.button} />
        <NeonButton label="INSCRIPTION" variant="outline" onPress={() => navigation.navigate('Signup')} />
      </View>
      <Pressable onPress={enter} style={[styles.google, { backgroundColor: theme.text, borderColor: theme.textMuted }]}> 
        <Text style={[styles.googleG, { color: theme.accentPrimary }]}>G</Text>
        <Text style={[styles.googleText, { color: theme.background }]}>Connexion via Google</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 34, alignItems: 'center' },
  heading: { marginTop: 108, fontFamily: 'Anton_400Regular', fontSize: 50, letterSpacing: 0.7, textShadowColor: '#FFFFFF', textShadowRadius: 8 },
  subtitle: { marginTop: 10, fontSize: 14, textAlign: 'center' },
  form: { width: '100%', marginTop: 72, gap: 27 },
});
