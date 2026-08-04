import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { VideoPanel } from '../components/VideoPanel';
import { Display, Screen } from '../components/Ui';
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
      <Header navigation={navigation} back title="ENREGISTREMENT" />
      <Display size={39} align="center" style={styles.title}>{recording ? 'ÇA TOURNE !' : 'FILME TON DÉFI'}</Display>
      <Text style={[styles.hint, { color: theme.textMuted }]}>{recording ? 'Garde le mouvement au centre du cadre…' : 'Place-toi de profil, ton mouvement doit être entièrement visible.'}</Text>
      <VideoPanel />
      <View style={[styles.progressTrack, { backgroundColor: theme.track }]}><View style={[styles.progress, { backgroundColor: recording ? theme.danger : theme.accentPrimary, width: recording ? '72%' : '4%' }]} /></View>
      <Pressable onPress={() => setRecording(true)} disabled={recording} style={[styles.record, { backgroundColor: theme.danger, borderColor: theme.text, shadowColor: theme.danger }]}>
        <Ionicons name={recording ? 'stop' : 'radio-button-on'} size={36} color={theme.text} />
      </Pressable>
      <Text style={[styles.recordText, { color: theme.text }]}>{recording ? 'ENREGISTREMENT…' : 'TOUCHE POUR DÉMARRER'}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 45 },
  title: { marginTop: 52 },
  hint: { marginTop: 14, marginBottom: 35, textAlign: 'center', fontSize: 15, lineHeight: 20 },
  progressTrack: { height: 5, borderRadius: 3, marginTop: 17, overflow: 'hidden' },
  progress: { height: '100%' },
  record: { alignSelf: 'center', marginTop: 47, width: 84, height: 84, borderWidth: 5, borderRadius: 45, alignItems: 'center', justifyContent: 'center', shadowOpacity: 0.75, shadowRadius: 15, elevation: 8 },
  recordText: { marginTop: 14, textAlign: 'center', fontFamily: 'Anton_400Regular', fontSize: 20 },
});
