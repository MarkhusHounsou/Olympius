import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Display, DividerTitle, Screen } from '../components/Ui';
import { useTheme } from '../theme/ThemeContext';

export function SettingsScreen({ navigation }) {
  const { theme, themeKey, setThemeKey, palettes } = useTheme();
  const logout = () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} back title="RÉGLAGES" />
      <Display size={43} align="center" style={styles.title}>RÉGLAGES</Display>
      <DividerTitle style={styles.appearance}>APPARENCE</DividerTitle>
      <Text style={[styles.note, { color: theme.textMuted }]}>Change de direction artistique en direct pour la démo.</Text>
      <View style={styles.themeList}>{Object.values(palettes).map((palette) => <ThemeOption key={palette.id} palette={palette} active={themeKey === palette.id} onPress={() => setThemeKey(palette.id)} />)}</View>
      <DividerTitle style={styles.other}>MON ESPACE</DividerTitle>
      <SettingRow icon="person-outline" label="Mon profil" />
      <SettingRow icon="notifications-outline" label="Notifications" />
      <SettingRow icon="document-text-outline" label="Règles d’utilisation" onPress={() => navigation.navigate('Rules')} />
      <SettingRow icon="log-out-outline" label="Déconnexion" destructive onPress={logout} />
    </Screen>
  );
}

function ThemeOption({ palette, active, onPress }) {
  const { theme } = useTheme();
  return <Pressable onPress={onPress} style={[styles.themeOption, { borderColor: active ? theme.accentPrimary : theme.track, backgroundColor: palette.surface }, active && { shadowColor: theme.accentPrimary }]}><View style={styles.preview}><View style={[styles.swatch, { backgroundColor: palette.background }]} /><View style={[styles.swatch, { backgroundColor: palette.accentPrimary }]} /><View style={[styles.swatch, { backgroundColor: palette.sponsorStart }]} /></View><View style={styles.optionCopy}><Text style={[styles.optionName, { color: palette.text }]}>{palette.name}</Text><Text style={[styles.optionDesc, { color: palette.textMuted }]}>{palette.description}</Text></View>{active && <Ionicons name="checkmark-circle" size={26} color={theme.accentPrimary} />}</Pressable>;
}

function SettingRow({ icon, label, onPress, destructive }) {
  const { theme } = useTheme();
  return <Pressable onPress={onPress} style={[styles.setting, { borderBottomColor: theme.track }]}><Ionicons name={icon} size={23} color={destructive ? theme.danger : theme.text} /><Text style={[styles.settingText, { color: destructive ? theme.danger : theme.text }]}>{label}</Text><Ionicons name="chevron-forward" size={19} color={theme.textMuted} /></Pressable>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 36 }, title: { marginTop: 39 }, appearance: { marginTop: 49 }, note: { marginTop: 12, fontSize: 14 }, themeList: { gap: 12, marginTop: 21 },
  themeOption: { minHeight: 88, borderWidth: 1.5, borderRadius: 16, flexDirection: 'row', alignItems: 'center', padding: 13, gap: 14, shadowOpacity: 0.5, shadowRadius: 12, elevation: 5 }, preview: { flexDirection: 'row', gap: 4 }, swatch: { width: 15, height: 50, borderRadius: 7 }, optionCopy: { flex: 1 }, optionName: { fontFamily: 'Anton_400Regular', fontSize: 20 }, optionDesc: { marginTop: 3, fontSize: 12 }, other: { marginTop: 46 },
  setting: { height: 61, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 13 }, settingText: { flex: 1, fontWeight: '700', fontSize: 16 },
});
