import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../theme/ThemeContext';

export function OlympiusLogo({ size = 88, showWord = true, compact = false }) {
  const { theme } = useTheme();
  const logoHeight = size * 0.62;
  const mountain = 'M17 112 L52 42 L66 69 L94 12 L120 71 L133 45 L166 112 Z M52 112 L77 62 L89 83 L99 73 L99 99 L81 112 M111 112 L126 83 L142 112';

  return (
    <View style={[styles.wrapper, compact && styles.compact]}>
      <Svg width={size} height={logoHeight} viewBox="0 0 184 124">
        <Path d={mountain} fill="none" stroke={theme.accentPrimary} strokeWidth="9" opacity={0.15} />
        <Path d={mountain} fill="none" stroke={theme.accentPrimary} strokeWidth="3.5" strokeLinejoin="miter" />
      </Svg>
      {showWord && <Text style={[styles.word, { color: theme.text, fontSize: Math.max(18, size * 0.25) }]}>OLYMPIUS</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center' },
  compact: { justifyContent: 'center' },
  word: { marginTop: 4, fontFamily: 'Anton_400Regular', letterSpacing: 0.6 },
});
