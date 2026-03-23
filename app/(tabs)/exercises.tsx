import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { EXERCISE_CATEGORIES, exercisesInCategory } from '@/lib/calisthenics/exercisesCatalog';
import type { ExerciseCategoryId } from '@/lib/calisthenics/exercisesCatalog';

function categoryTitle(t: (k: string) => string, id: ExerciseCategoryId): string {
  switch (id) {
    case 'push':
      return t('exercises.catPush');
    case 'pull':
      return t('exercises.catPull');
    case 'legs':
      return t('exercises.catLegs');
    case 'core':
      return t('exercises.catCore');
    case 'skills':
      return t('exercises.catSkills');
    default:
      return id;
  }
}

export default function ExercisesScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('exercises.title')}</Text>
      <Text style={styles.subtitle}>{t('exercises.subtitle')}</Text>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {EXERCISE_CATEGORIES.map((cat) => (
          <CategoryBlock key={cat.id} categoryId={cat.id} label={categoryTitle(t, cat.id)} />
        ))}
      </ScrollView>
    </View>
  );
}

function CategoryBlock({ categoryId, label }: { categoryId: ExerciseCategoryId; label: string }) {
  const items = exercisesInCategory(categoryId);
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{label}</Text>
      {items.map((ex) => (
        <View key={ex.id} style={styles.row}>
          <Text style={styles.rowText}>{ex.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 12,
  },
  scroll: {
    paddingBottom: 32,
  },
  block: {
    marginBottom: 20,
  },
  blockTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.yellow,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  rowText: {
    fontSize: 16,
    color: Colors.text,
  },
});
