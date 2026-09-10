import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { CategoryFilter } from '../components/CategoryFilter';
import { ChallengeCard } from '../components/ChallengeCard';
import { Screen, SectionLabel } from '../components/Ui';
import { CHALLENGE_CATEGORIES, challenges } from '../mocks/data';
import { layout } from '../theme/layout';

export function ChallengesScreen({ navigation }) {
  const [filter, setFilter] = useState('ALL');
  const open = (challenge) => navigation.navigate('ChallengeDetail', { challengeId: challenge.id });
  const filtered = filter === 'ALL' ? challenges : challenges.filter((item) => item.category === filter);
  const active = filtered.filter((item) => item.active);
  const upcoming = filtered.filter((item) => !item.active);

  return (
    <Screen scroll={false} contentStyle={styles.content}>
      <Header navigation={navigation} title="Défis" />
      <View style={styles.filterArea}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filters}
        >
          <CategoryFilter
            id="ALL"
            label="Tous"
            icon="grid-outline"
            active={filter === 'ALL'}
            onPress={() => setFilter('ALL')}
          />
          {CHALLENGE_CATEGORIES.map((category) => (
            <CategoryFilter
              key={category.id}
              id={category.id}
              label={category.label}
              icon={category.icon}
              active={filter === category.id}
              onPress={() => setFilter(category.id)}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView style={styles.listScroll} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {active.length > 0 && (
          <View style={styles.section}>
            <SectionLabel>En cours</SectionLabel>
            <View style={styles.cards}>
              {active.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} compact onPress={() => open(challenge)} />
              ))}
            </View>
          </View>
        )}
        {upcoming.length > 0 && (
          <View style={styles.section}>
            <SectionLabel>Prochainement</SectionLabel>
            <View style={styles.cards}>
              {upcoming.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} compact disabled />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingBottom: 0 },
  filterArea: { height: 136, flexShrink: 0 },
  filterScroll: { flex: 1 },
  filters: { gap: 12, paddingBottom: 28, paddingRight: layout.screenPaddingX },
  listScroll: { flex: 1 },
  list: { paddingBottom: layout.screenPaddingBottom },
  section: { marginBottom: layout.sectionGap },
  cards: { gap: 10 },
});
