import React, { useMemo } from 'react';
import { useTranslation } from '@/lib/i18n';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { useWorkoutLogStore } from '@/store/useWorkoutLogStore';
import { formatDisplayDate } from '@/lib/utils/dateFormat';

export default function WorkoutsScreen() {
  const { t } = useTranslation();
  const sessions = useWorkoutLogStore((s) => s.sessions);

  const sorted = useMemo(
    () => [...sessions].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)),
    [sessions]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('workouts.title')}</Text>
      <Text style={styles.subtitle}>{t('workouts.subtitle')}</Text>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {sorted.length === 0 ? (
          <Text style={styles.empty}>{t('workouts.empty')}</Text>
        ) : (
          sorted.map((s) => (
            <View key={s.id} style={styles.card}>
              <Text style={styles.cardTitle}>{s.title}</Text>
              <Text style={styles.cardDate}>{formatDisplayDate(s.date)}</Text>
              {s.durationMin != null ? (
                <Text style={styles.cardMeta}>{t('home.minutes', { n: s.durationMin })}</Text>
              ) : null}
            </View>
          ))
        )}
      </ScrollView>
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
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
  },
  cardDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  cardMeta: {
    fontSize: 13,
    color: Colors.yellow,
    marginTop: 6,
  },
  empty: {
    fontSize: 15,
    color: Colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
  },
});
