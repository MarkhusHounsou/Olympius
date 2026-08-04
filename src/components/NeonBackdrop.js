import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../theme/ThemeContext';

export function NeonBackdrop({ subtle = false }) {
  const { theme } = useTheme();
  const opacity = subtle ? 0.11 : 0.29;
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" viewBox="0 0 400 900" preserveAspectRatio="none">
        <Path d="M-35 110 L24 49 L54 86 L203 -70" stroke={theme.accentPrimary} strokeWidth="8" fill="none" opacity={opacity} />
        <Path d="M-35 793 L42 863 L-13 871" stroke={theme.accentPrimary} strokeWidth="7" fill="none" opacity={opacity} />
        <Path d="M422 635 L355 752 L322 704 L260 907" stroke={theme.accentPrimary} strokeWidth="8" fill="none" opacity={opacity} />
        <Path d="M322 -30 L430 37 L354 96" stroke={theme.accentPrimary} strokeWidth="7" fill="none" opacity={opacity} />
      </Svg>
    </View>
  );
}
