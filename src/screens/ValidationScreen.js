import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Header } from '../components/Header';
import { SliderValidation } from '../components/SliderValidation';
import { BodyText, NeonButton, Screen, ScreenFooter } from '../components/Ui';
import { challenges } from '../mocks/data';
import { useTheme } from '../theme/ThemeContext';

export function ValidationScreen({ navigation, route }) {
  const { theme } = useTheme();
  const challenge = challenges.find((item) => item.id === route.params?.challengeId) || challenges[0];
  const scale = challenge.metricType === 'distance' ? 10 : 1;
  const defaultValue = Math.round(challenge.target * scale * 0.74);
  const [value, setValue] = useState(defaultValue);

  return (
    <Screen
      contentStyle={styles.content}
      footer={(
        <ScreenFooter>
          <NeonButton
            label="Valider mon défi"
            onPress={() => navigation.replace('Result', { challengeId: challenge.id, value })}
          />
        </ScreenFooter>
      )}
    >
      <Header navigation={navigation} back title="Validation" />
      <Text style={[styles.title, { color: theme.text }]}>{challenge.shortTitle || challenge.title}</Text>
      <BodyText muted style={styles.hint}>Indique ta performance réalisée.</BodyText>
      <SliderValidation challenge={challenge} value={value} onChange={setValue} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  title: { fontFamily: 'Anton_400Regular', fontSize: 28, marginTop: 16, letterSpacing: 0.3 },
  hint: { marginTop: 8 },
});
