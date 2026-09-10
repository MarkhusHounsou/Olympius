import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDemo } from '../context/AppDemoContext';
import { Header } from '../components/Header';
import { BodyText, NeonButton, Screen } from '../components/Ui';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

const sexOptions = [
  { id: 'female', label: 'Femme', icon: 'female-outline' },
  { id: 'male', label: 'Homme', icon: 'male-outline' },
  { id: 'other', label: 'Autre', icon: 'person-outline' },
];

export function SportProfileScreen({ navigation, route }) {
  const { theme } = useTheme();
  const { sportProfile, saveSportProfile } = useAppDemo();
  const [sex, setSex] = useState(sportProfile?.sex || 'male');
  const [age, setAge] = useState(sportProfile?.age ? String(sportProfile.age) : '');
  const [height, setHeight] = useState(sportProfile?.height ? String(sportProfile.height) : '');
  const [weight, setWeight] = useState(sportProfile?.weight ? String(sportProfile.weight) : '');
  const isComplete = sex && age.trim() && height.trim() && weight.trim();
  const editing = route.params?.editing;

  const submit = () => {
    if (!isComplete) return;
    saveSportProfile({ sex, age: Number(age), height: Number(height), weight: Number(weight) });
    if (editing) navigation.goBack();
    else navigation.reset({ index: 0, routes: [{ name: 'App', params: { screen: 'Home' } }] });
  };

  return (
    <Screen contentStyle={styles.content}>
      {editing ? <Header navigation={navigation} back title="Profil sportif" /> : <View style={styles.topSpacer} />}
      <View style={styles.iconWrap}>
        <Ionicons name="body-outline" size={28} color={theme.accentPrimary} />
      </View>
      <Text style={[styles.title, { color: theme.text }]}>Ton profil sportif</Text>
      <BodyText muted style={styles.copy}>
        Ces données permettent de comparer tes performances à des athlètes au profil proche.
      </BodyText>

      <Text style={[styles.label, { color: theme.textMuted }]}>Sexe</Text>
      <View style={styles.sexOptions}>
        {sexOptions.map((option) => {
          const active = sex === option.id;
          return (
            <Pressable
              key={option.id}
              onPress={() => setSex(option.id)}
              style={[
                styles.sexOption,
                { borderColor: active ? theme.accentPrimary : theme.track, backgroundColor: active ? theme.accentGlow : theme.surface },
              ]}
              accessibilityRole="radio"
              accessibilityState={{ checked: active }}
            >
              <Ionicons name={option.icon} size={20} color={active ? theme.accentPrimary : theme.textMuted} />
              <Text style={[styles.sexLabel, { color: active ? theme.text : theme.textMuted }]}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.fields}>
        <MetricField label="Âge" value={age} onChangeText={setAge} suffix="ans" theme={theme} />
        <MetricField label="Taille" value={height} onChangeText={setHeight} suffix="cm" theme={theme} />
        <MetricField label="Poids" value={weight} onChangeText={setWeight} suffix="kg" theme={theme} />
      </View>

      <View style={[styles.note, { backgroundColor: theme.backgroundSoft, borderColor: theme.track }]}>
        <Ionicons name="analytics-outline" size={18} color={theme.accentPrimary} />
        <Text style={[styles.noteText, { color: theme.textMuted }]}>Les comparaisons s’affichent uniquement lorsqu’un échantillon fiable est disponible.</Text>
      </View>
      <NeonButton label={editing ? 'Enregistrer' : 'Continuer'} onPress={submit} disabled={!isComplete} style={styles.cta} />
    </Screen>
  );
}

function MetricField({ label, value, onChangeText, suffix, theme }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={[styles.label, { color: theme.textMuted }]}>{label}</Text>
      <View style={[styles.field, { backgroundColor: theme.surface, borderColor: theme.track }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          editable={true}
          pointerEvents="auto"
          placeholder="—"
          placeholderTextColor={theme.textDim}
          style={[styles.input, { color: theme.text }]}
          maxLength={5}
        />
        <Text style={[styles.suffix, { color: theme.textMuted }]}>{suffix}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 16 },
  topSpacer: { height: 32 },
  iconWrap: { width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#0D7210' },
  title: { fontFamily: 'Anton_400Regular', fontSize: 32, letterSpacing: 0.3, textAlign: 'center', marginTop: 20 },
  copy: { marginTop: 10, textAlign: 'center' },
  label: { fontSize: 12, fontWeight: '700', letterSpacing: 0.7, textTransform: 'uppercase', marginTop: layout.sectionGap, marginBottom: 10 },
  sexOptions: { flexDirection: 'row', gap: 8 },
  sexOption: { flex: 1, minHeight: 76, borderWidth: 1, borderRadius: layout.cardRadiusSm, alignItems: 'center', justifyContent: 'center', gap: 7 },
  sexLabel: { fontSize: 12, fontWeight: '700' },
  fields: { gap: 16 },
  fieldGroup: { marginTop: 2 },
  field: { borderWidth: StyleSheet.hairlineWidth, borderRadius: layout.buttonRadius, minHeight: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  input: { flex: 1, fontSize: 17, fontWeight: '600', paddingVertical: 12 },
  suffix: { fontSize: 14, fontWeight: '600' },
  note: { flexDirection: 'row', gap: 10, borderWidth: StyleSheet.hairlineWidth, borderRadius: layout.cardRadiusSm, padding: 14, marginTop: layout.sectionGap },
  noteText: { flex: 1, fontSize: 12, fontWeight: '500', lineHeight: 18 },
  cta: { marginTop: 20 },
});
