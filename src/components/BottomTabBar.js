// src/components/BottomTabBar.js
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OlympiusLogo } from './OlympiusLogo';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

const icons = {
  Home: 'home-outline',
  Challenges: 'flash-outline',
  Ranking: 'podium-outline',
  Rewards: 'gift-outline',
  Competition: 'trophy-outline', // placeholder, will be replaced by logo
  Profile: 'person-outline',
};

const iconsActive = {
  Home: 'home',
  Challenges: 'flash',
  Ranking: 'podium',
  Rewards: 'gift',
  Competition: 'trophy', // placeholder
  Profile: 'person',
};

export function BottomTabBar({ state, navigation }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.bar, { backgroundColor: theme.background, borderTopColor: theme.track }]}>
      {state.routes.map((route, index) => {
        const active = state.index === index;
        const isCompetition = route.name === 'Competition';
        return (
          <Pressable
            accessibilityLabel={route.name}
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.item}
          >
            <View style={[styles.iconWrap, active && { backgroundColor: theme.surfaceRaised }]}>
              {isCompetition ? (
                <OlympiusLogo size={36} showWord={false} compact={true} />
              ) : (
                <Ionicons
                  name={active ? iconsActive[route.name] : icons[route.name]}
                  size={22}
                  color={active ? theme.accentPrimary : theme.textDim}
                />
              )}
            </View>
            {active && <View style={[styles.indicator, { backgroundColor: theme.accentPrimary }]} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: layout.tabBarHeight,
    paddingBottom: 8,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: { alignItems: 'center', justifyContent: 'center', minWidth: 56 },
  iconWrap: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  indicator: { width: 4, height: 4, borderRadius: 2, marginTop: 4 },
});
