import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { VideoPanel } from '../components/VideoPanel';
import { BodyText, Screen } from '../components/Ui';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function RecordingScreen({ navigation, route }) {
  const { theme } = useTheme();
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (!recording) return undefined;
    const timeout = setTimeout(() => navigation.replace('Review', { challengeId: route.params?.challengeId }), 2200);
    return () => clearTimeout(timeout);
  }, [navigation, recording, route.params?.challengeId]);

  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} back title="Enregistrement" />
      <Text style={[styles.title, { color: theme.text }]}>{recording ? 'En cours…' : 'Filme ton défi'}</Text>
      <BodyText muted style={styles.hint}>
        {recording ? 'Garde le mouvement au centre du cadre.' : 'Place-toi de profil, mouvement entièrement visible.'}
      </BodyText>
      <VideoPanel />
      <View style={[styles.progressTrack, { backgroundColor: theme.track }]}>
        <View style={[styles.progress, { backgroundColor: theme.accentPrimary, width: recording ? '72%' : '4%' }]} />
      </View>
      <Pressable
        onPress={() => setRecording(true)}
        disabled={recording}
        style={[styles.record, { backgroundColor: theme.surfaceRaised, borderColor: theme.track }]}
      >
        <Ionicons name={recording ? 'stop' : 'radio-button-on'} size={32} color={theme.danger} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  title: { fontFamily: 'Anton_400Regular', fontSize: 28, marginTop: layout.blockGap, letterSpacing: 0.3 },
  hint: { marginTop: 8, textAlign: 'center' },
  progressTrack: { height: 4, borderRadius: 2, marginTop: 24, overflow: 'hidden' },
  progress: { height: '100%' },
  record: {
    alignSelf: 'center',
    marginTop: 40,
    width: 72,
    height: 72,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
