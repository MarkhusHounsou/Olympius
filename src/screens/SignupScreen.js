import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OlympiusLogo } from '../components/OlympiusLogo';
import { NeonButton, Screen } from '../components/Ui';
import { useTheme } from '../theme/ThemeContext';

const fields = ['Nom', 'Prénom', 'Nom d’utilisateur', 'Adresse mail', 'Mot de passe', 'Confirmer le mot de passe'];

export function SignupScreen({ navigation }) {
  const { theme } = useTheme();
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const enter = () => navigation.reset({ index: 0, routes: [{ name: 'App' }] });
  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.top}><Pressable onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={35} color={theme.text} /></Pressable><OlympiusLogo size={76} showWord={false} /></View>
      <Text style={[styles.heading, { color: theme.text }]}>INSCRIPTION</Text>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>Crée ton profil pour rejoindre la compétition.</Text>
      <View style={styles.inputs}>
        <View style={styles.row}>
          {fields.slice(0, 2).map((field) => <TextInput key={field} placeholder={field} placeholderTextColor={theme.textMuted} style={[styles.smallInput, { color: theme.text, backgroundColor: theme.surfaceMuted }]} />)}
        </View>
        {fields.slice(2).map((field) => <TextInput key={field} autoCapitalize="none" autoCorrect={false} placeholder={field} placeholderTextColor={theme.textMuted} secureTextEntry={field.includes('passe')} style={[styles.input, { color: theme.text, backgroundColor: theme.surfaceMuted }]} />)}
      </View>
      <CheckLine checked={terms} onPress={() => setTerms(!terms)} text="J’accepte les Conditions Générales d’utilisation et je confirme avoir lu la Politique de Confidentialité décrivant le traitement de mes données personnelles conformément au RGPD." />
      <CheckLine checked={marketing} onPress={() => setMarketing(!marketing)} text="J’accepte de recevoir des notifications et des offres exclusives de la part de l’application et de ma salle de sport partenaire." />
      <NeonButton label="INSCRIPTION" onPress={enter} style={styles.submit} />
    </Screen>
  );
}

function CheckLine({ checked, onPress, text }) {
  const { theme } = useTheme();
  return <Pressable onPress={onPress} style={styles.checkLine}><View style={[styles.box, { borderColor: theme.text, backgroundColor: checked ? theme.accentPrimary : 'transparent' }]}>{checked && <Ionicons name="checkmark" size={15} color={theme.background} />}</View><Text style={[styles.checkText, { color: theme.text }]}>{text}</Text></Pressable>;
}

const styles = StyleSheet.create({
  content: { paddingTop: 18 },
  top: { height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 3 },
  heading: { marginTop: 92, fontFamily: 'Anton_400Regular', fontSize: 49, textAlign: 'center', letterSpacing: 0.8 },
  subtitle: { marginTop: 10, textAlign: 'center', fontSize: 13 },
  inputs: { gap: 20, marginTop: 60 },
  row: { flexDirection: 'row', gap: 18 },
  smallInput: { flex: 1, minWidth: 0, height: 70, borderRadius: 20, fontSize: 19, paddingHorizontal: 20 },
  input: { height: 70, borderRadius: 20, fontSize: 19, paddingHorizontal: 20 },
  checkLine: { marginTop: 25, flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  box: { width: 20, height: 20, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  checkText: { flex: 1, fontSize: 12.5, lineHeight: 18 },
  submit: { marginTop: 36, alignSelf: 'center', width: '48%' },
});
