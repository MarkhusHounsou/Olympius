import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Header } from '../components/Header';
import { RatingSlider } from '../components/RatingSlider';
import { VideoPanel } from '../components/VideoPanel';
import { NeonButton, Screen, ScreenFooter } from '../components/Ui';
import { useTheme } from '../theme/ThemeContext';

export function ReviewScreen({ navigation }) {
  const { theme } = useTheme();
  const [rating, setRating] = useState(4);
  const [video, setVideo] = useState(1);
  const next = () => (
    video < 3
      ? setVideo(video + 1)
      : navigation.reset({ index: 0, routes: [{ name: 'App', params: { screen: 'Ranking' } }] })
  );

  return (
    <Screen
      contentStyle={styles.content}
      footer={(
        <ScreenFooter>
          <NeonButton label={video < 3 ? 'Suivant' : 'Voir le classement'} onPress={next} />
        </ScreenFooter>
      )}
    >
      <Header navigation={navigation} back title="Notation" />
      <Text style={[styles.title, { color: theme.text }]}>Note le mouvement</Text>
      <Text style={[styles.counter, { color: theme.textMuted }]}>Vidéo {video} / 3</Text>
      <VideoPanel />
      <RatingSlider value={rating} onChange={setRating} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24, paddingTop: 4 },
  title: { fontFamily: 'Anton_400Regular', fontSize: 26, marginTop: 16, letterSpacing: 0.3 },
  counter: { marginTop: 6, fontSize: 13, fontWeight: '500' },
});
