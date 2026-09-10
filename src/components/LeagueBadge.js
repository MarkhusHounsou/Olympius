import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { layout } from '../theme/layout';

export function LeagueBadge({ league, division, size = 'md', style }) {
  const dim = size === 'lg' ? 56 : 44;
  const iconSize = size === 'lg' ? 28 : 22;

  return (
    <View style={[styles.wrap, style]}>
      <View style={[styles.icon, { width: dim, height: dim, borderRadius: dim / 2, backgroundColor: `${league.color}22`, borderColor: league.color }]}>
        <Ionicons name={league.icon} size={iconSize} color={league.color} />
      </View>
      <Text style={[styles.name, { color: league.color }]}>{league.name}</Text>
      <Text style={[styles.division, { color: league.color }]}>{division.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  icon: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Anton_400Regular',
    fontSize: 18,
    marginTop: 10,
    letterSpacing: 0.3,
  },
  division: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    opacity: 0.85,
  },
});
