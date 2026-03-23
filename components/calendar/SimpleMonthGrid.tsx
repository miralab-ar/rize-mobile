import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { i18n } from '@/lib/i18n';
import Colors from '@/constants/Colors';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function toIso(y: number, monthIndex: number, day: number) {
  return `${y}-${pad2(monthIndex + 1)}-${pad2(day)}`;
}

type Props = {
  selected: string;
  onSelectDay: (iso: string) => void;
  /** YYYY-MM-DD that have at least one session */
  markedDates: Set<string>;
};

const WEEK_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function SimpleMonthGrid({ selected, onSelectDay, markedDates }: Props) {
  const [cursor, setCursor] = useState(() => {
    const parts = selected.split('-').map(Number);
    const y = parts[0] || new Date().getFullYear();
    const mo = parts[1] || 1;
    return new Date(y, mo - 1, 1);
  });

  useEffect(() => {
    const parts = selected.split('-').map(Number);
    const y = parts[0];
    const mo = parts[1];
    if (!y || !mo) return;
    setCursor(new Date(y, mo - 1, 1));
  }, [selected]);

  const { title, rows, y, m } = useMemo(() => {
    const year = cursor.getFullYear();
    const monthIndex = cursor.getMonth();
    const firstDow = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const titleStr = new Date(year, monthIndex, 1).toLocaleDateString(i18n.locale || 'en', {
      month: 'long',
      year: 'numeric',
    });

    const rowList: (number | null)[][] = [];
    let row: (number | null)[] = [];
    for (let i = 0; i < firstDow; i++) row.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      row.push(d);
      if (row.length === 7) {
        rowList.push(row);
        row = [];
      }
    }
    if (row.length) {
      while (row.length < 7) row.push(null);
      rowList.push(row);
    }

    return { title: titleStr, rows: rowList, y: year, m: monthIndex };
  }, [cursor]);

  const todayIso = useMemo(() => {
    const t = new Date();
    return toIso(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);

  function prevMonth() {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.monthRow}>
        <Pressable onPress={prevMonth} hitSlop={12} accessibilityRole="button" accessibilityLabel="Previous month">
          <Ionicons name="chevron-back" size={22} color={Colors.yellow} />
        </Pressable>
        <Text style={styles.monthTitle}>{title}</Text>
        <Pressable onPress={nextMonth} hitSlop={12} accessibilityRole="button" accessibilityLabel="Next month">
          <Ionicons name="chevron-forward" size={22} color={Colors.yellow} />
        </Pressable>
      </View>

      <View style={styles.weekHeader}>
        {WEEK_LETTERS.map((letter, i) => (
          <Text key={i} style={styles.weekLetter}>
            {letter}
          </Text>
        ))}
      </View>

      {rows.map((r, ri) => (
        <View key={ri} style={styles.weekRow}>
          {r.map((d, di) => {
            if (d == null) {
              return <View key={di} style={styles.cell} />;
            }
            const iso = toIso(y, m, d);
            const isSel = selected === iso;
            const hasMark = markedDates.has(iso);
            const isToday = iso === todayIso;
            return (
              <Pressable
                key={di}
                onPress={() => onSelectDay(iso)}
                style={[
                  styles.cell,
                  isSel && styles.cellSelected,
                  isToday && !isSel && styles.cellToday,
                ]}
              >
                <Text style={[styles.dayNum, isSel && styles.dayNumSelected]}>{d}</Text>
                {hasMark ? <View style={styles.dot} /> : <View style={styles.dotPlaceholder} />}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 4,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  monthTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  weekLetter: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    borderRadius: 8,
  },
  cellSelected: {
    backgroundColor: Colors.violet,
  },
  cellToday: {
    borderWidth: 1,
    borderColor: Colors.yellow,
  },
  dayNum: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  dayNumSelected: {
    color: '#fff',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.yellow,
    marginTop: 3,
  },
  dotPlaceholder: {
    height: 8,
    marginTop: 3,
  },
});
