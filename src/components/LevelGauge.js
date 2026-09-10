import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { currentUser } from '../mocks/data';
import { OlympiusLogo } from './OlympiusLogo';
import { useTheme } from '../theme/ThemeContext';

export function LevelGauge({ user = currentUser }) {
  const { theme } = useTheme();
  const progress = (user.xp - (user.nextLevelXp - 450)) / 450;
  const dashLength = 300 * Math.min(Math.max(progress, 0.08), 1);

  return (
    <View style={styles.wrap}>
      <Svg width="100%" height="238" viewBox="0 0 360 238">
        <Path d="M41 194 A139 139 0 0 1 319 194" fill="none" stroke={theme.track} strokeWidth="12" />
        <Path
          d="M41 194 A139 139 0 0 1 319 194"
          fill="none"
          stroke={theme.accentPrimary}
          strokeWidth="12"
          strokeDasharray={`${dashLength} 450`}
          strokeLinecap="butt"
        />
      </Svg>
      <View style={styles.center}>
        <LinearGradient colors={[theme.backgroundSoft, theme.accentGlow]} style={styles.glowDisc}>
          <OlympiusLogo size={112} showWord={false} compact />
          <Text style={[styles.level, { color: theme.text }]}>NIV. {user.level}</Text>
        </LinearGradient>
      </View>
      <View style={[styles.endpoint, styles.left]}>
        <Text style={[styles.endpointLabel, { color: theme.text }]}>NIV. {user.level}</Text>
        <Text style={[styles.endpointValue, { color: theme.text }]}>{user.xp.toLocaleString('fr-FR')}</Text>
      </View>
      <View style={[styles.endpoint, styles.right]}>
        <Text style={[styles.endpointLabel, { color: theme.text }]}>NIV. {user.level + 1}</Text>
        <Text style={[styles.endpointValue, { color: theme.text }]}>{user.nextLevelXp.toLocaleString('fr-FR')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: 258, position: 'relative', justifyContent: 'flex-end' },
  center: { position: 'absolute', alignSelf: 'center', top: 47 },
  glowDisc: { width: 182, height: 174, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  level: { fontFamily: 'Anton_400Regular', fontSize: 40, marginTop: -2, letterSpacing: 0.4 },
  endpoint: { position: 'absolute', top: 190, alignItems: 'center' },
  left: { left: 8 },
  right: { right: 8 },
  endpointLabel: { fontFamily: 'Anton_400Regular', fontSize: 21 },
  endpointValue: { fontFamily: 'Anton_400Regular', fontSize: 15 },
});
