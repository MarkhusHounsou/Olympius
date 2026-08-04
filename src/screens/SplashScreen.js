import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { OlympiusLogo } from '../components/OlympiusLogo';
import { NeonBackdrop } from '../components/NeonBackdrop';
import { Screen } from '../components/Ui';

export function SplashScreen({ navigation }) {
  useEffect(() => {
    const timeout = setTimeout(() => navigation.replace('Login'), 1500);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <Screen scroll={false} withBackdrop={false} contentStyle={styles.content}>
      <NeonBackdrop />
      <View style={styles.logo}><OlympiusLogo size={210} /></View>
    </Screen>
  );
}

const styles = StyleSheet.create({ content: { alignItems: 'center', justifyContent: 'center' }, logo: { marginTop: -34 } });
