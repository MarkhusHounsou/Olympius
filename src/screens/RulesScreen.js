import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { Display, Screen } from '../components/Ui';
import { useTheme } from '../theme/ThemeContext';

const rules = [
  ['FAIR-PLAY', 'Chaque performance doit être réalisée par la personne inscrite au défi. Les vidéos sont notées avec bienveillance, objectivité et respect de l’effort fourni.'],
  ['INTÉGRITÉ DES VIDÉOS', 'Filme ton mouvement dans son intégralité, dans un lieu suffisamment éclairé. Toute vidéo incomplète, accélérée ou modifiée peut être écartée de la compétition.'],
  ['NOTATION PAR LES PAIRS', 'Après chaque défi, les membres attribuent une note de 1 à 5 à plusieurs performances. La moyenne obtenue détermine les points et la place dans le classement.'],
  ['RESPECT DE LA COMMUNAUTÉ', 'Les commentaires et les échanges restent constructifs. OLYMPIUS ne tolère aucun contenu humiliant, dangereux ou discriminatoire.'],
];

export function RulesScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} back title="RÈGLES" />
      <Display size={42} align="center" style={styles.title}>RÈGLES D’UTILISATION</Display>
      <Text style={[styles.lead, { color: theme.textMuted }]}>Les principes qui permettent à la compétition de rester saine, utile et motivante.</Text>
      <View style={styles.items}>{rules.map(([heading, body]) => <View key={heading} style={[styles.item, { borderColor: theme.accentPrimary, backgroundColor: theme.surface }]}><Text style={[styles.heading, { color: theme.accentPrimary }]}>{heading}</Text><Text style={[styles.copy, { color: theme.text }]}>{body}</Text></View>)}</View>
    </Screen>
  );
}

const styles = StyleSheet.create({ content: { paddingBottom: 34 }, title: { marginTop: 42 }, lead: { marginTop: 16, textAlign: 'center', lineHeight: 21 }, items: { marginTop: 35, gap: 15 }, item: { padding: 20, borderLeftWidth: 3, borderRadius: 15 }, heading: { fontFamily: 'Anton_400Regular', fontSize: 23 }, copy: { marginTop: 9, lineHeight: 20, fontSize: 14 } });
