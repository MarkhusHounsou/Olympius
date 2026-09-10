import { StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { BadgeCard } from '../components/BadgeCard';
import { Screen, SectionLabel } from '../components/Ui';
import { badges, currentUser } from '../mocks/data';
import { layout } from '../theme/layout';

const sections = [
  { id: 'performance', title: 'Performance' },
  { id: 'regularite', title: 'Régularité' },
  { id: 'competition', title: 'Compétition' },
  { id: 'prestige', title: 'Prestige' },
];

export function BadgesScreen({ navigation }) {
  return (
    <Screen contentStyle={styles.content}>
      <Header navigation={navigation} back title="Badges" />
      {sections.map((section) => {
        const items = badges.filter((item) => item.category === section.id);
        return (
          <View key={section.id} style={styles.section}>
            <SectionLabel>{section.title}</SectionLabel>
            <View style={styles.grid}>
              {items.map((badge) => (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  unlocked={currentUser.earnedBadgeIds.includes(badge.id)}
                />
              ))}
            </View>
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  section: { marginTop: layout.sectionGap },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});
