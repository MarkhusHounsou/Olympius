import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Header } from '../components/Header';
import { RatingSlider } from '../components/RatingSlider';
import { VideoPanel } from '../components/VideoPanel';
import { Display, NeonButton, Screen } from '../components/Ui';
import { useTheme } from '../theme/ThemeContext';

export function ReviewScreen({ navigation }) {
  const { theme } = useTheme();
  const [rating, setRating] = useState(4);
  const [video, setVideo] = useState(1);
  const next = () => video < 3 ? setVideo(video + 1) : navigation.reset({ index: 0, routes: [{ name: 'App', params: { screen: 'Ranking' } }] });
  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} back title="NOTATION" />
      <Display size={40} align="center" style={styles.title}>NOTE LE MOUVEMENT</Display>
      <Text style={[styles.counter, { color: theme.textMuted }]}>VIDÉO {video} / 3 · NOTATION ENTRE ATHLÈTES</Text>
      <VideoPanel />
      <RatingSlider value={rating} onChange={setRating} />
      <NeonButton label={video < 3 ? 'SUIVANT' : 'VOIR LE CLASSEMENT'} onPress={next} style={styles.next} />
    </Screen>
  );
}

const styles = StyleSheet.create({ content: { paddingBottom: 34 }, title: { marginTop: 45 }, counter: { marginTop: 12, textAlign: 'center', fontSize: 12, fontWeight: '800', letterSpacing: 0.6, marginBottom: 27 }, next: { marginTop: 34, alignSelf: 'center', width: '65%' } });
