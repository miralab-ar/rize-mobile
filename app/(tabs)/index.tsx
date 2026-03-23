import React, { useMemo, useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { SimpleMonthGrid } from '@/components/calendar/SimpleMonthGrid';
import { useWorkoutLogStore } from '@/store/useWorkoutLogStore';
import { toISODate, formatDisplayDate } from '@/lib/utils/dateFormat';

export default function HomeScreen() {
  const { t } = useTranslation();
  const sessions = useWorkoutLogStore((s) => s.sessions);
  const sessionsOn = useWorkoutLogStore((s) => s.sessionsOn);

  const [selected, setSelected] = useState(() => toISODate(new Date()));

  const markedDates = useMemo(() => {
    const set = new Set<string>();
    for (const s of sessions) {
      set.add(s.date);
    }
    return set;
  }, [sessions]);

  const daySessions = sessionsOn(selected);
  const totalMin = daySessions.reduce((acc, s) => acc + (s.durationMin ?? 0), 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>{t('home.title')}</Text>

        <SimpleMonthGrid selected={selected} onSelectDay={setSelected} markedDates={markedDates} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{formatDisplayDate(selected)}</Text>
          <Text style={styles.summary}>
            {daySessions.length === 0
              ? t('home.noSessions')
              : `${t('home.summarySessions', { count: daySessions.length })}${
                  totalMin > 0 ? ` · ${t('home.minutesTotal', { n: totalMin })}` : ''
                }`}
          </Text>
          {daySessions.map((s) => (
            <View key={s.id} style={styles.sessionRow}>
              <Text style={styles.sessionTitle}>{s.title}</Text>
              {s.durationMin != null ? (
                <Text style={styles.sessionMeta}>{t('home.minutes', { n: s.durationMin })}</Text>
              ) : null}
            </View>
          ))}
        </View>

        <Text style={styles.hint}>{t('home.monthHint')}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    padding: 16,
    paddingBottom: 32,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.yellow,
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  sessionRow: {
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.surfaceLight,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  sessionMeta: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  hint: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 16,
    textAlign: 'center',
  },
});
