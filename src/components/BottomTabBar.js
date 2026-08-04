import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const icons = { Home: 'home-outline', Challenges: 'flash-outline', Ranking: 'podium-outline' };
const labels = { Home: 'ACCUEIL', Challenges: 'DÉFIS', Ranking: 'CLASSEMENT' };

export function BottomTabBar({ state, navigation }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.bar, { backgroundColor: theme.background, borderTopColor: theme.track }]}> 
      {state.routes.map((route, index) => {
        const active = state.index === index;
        return (
          <Pressable
            accessibilityLabel={route.name}
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={[styles.item, active && { backgroundColor: theme.surfaceRaised }]}
          >
            <Ionicons
              name={icons[route.name]}
              size={24}
              color={active ? theme.accentPrimary : theme.text}
              style={active ? { textShadowColor: theme.accentPrimary, textShadowRadius: 12 } : null}
            />
            <Text style={[styles.label, { color: active ? theme.accentPrimary : theme.textMuted }]}>{labels[route.name]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { height: 84, paddingBottom: 10, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  item: { minWidth: 92, height: 58, justifyContent: 'center', alignItems: 'center', borderRadius: 16, paddingHorizontal: 8 },
  label: { marginTop: 4, fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
});
