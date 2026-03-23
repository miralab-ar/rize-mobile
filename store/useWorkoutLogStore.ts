import { create } from 'zustand';
import type { WorkoutSession } from '@/types/calisthenics';
import { toISODate } from '@/lib/utils/dateFormat';

function seedSessions(): WorkoutSession[] {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = (day: number) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const today = now.getDate();

  const rows: WorkoutSession[] = [
    { id: '1', date: d(Math.max(1, today - 5)), title: 'Push & core', durationMin: 32 },
    { id: '2', date: d(Math.max(1, today - 3)), title: 'Pull session', durationMin: 45 },
    { id: '3', date: d(Math.max(1, today - 3)), title: 'Stretch', durationMin: 12 },
    { id: '4', date: d(Math.min(28, today + 1)), title: 'Skills — handstand', durationMin: 25 },
    { id: '5', date: toISODate(now), title: 'Full body', durationMin: 40 },
  ];
  return rows;
}

type State = {
  sessions: WorkoutSession[];
  sessionsOn: (date: string) => WorkoutSession[];
  addSession: (session: Omit<WorkoutSession, 'id'>) => void;
};

export const useWorkoutLogStore = create<State>((set, get) => ({
  sessions: seedSessions(),
  sessionsOn: (date) => get().sessions.filter((s) => s.date === date),
  addSession: (session) =>
    set((state) => ({
      sessions: [...state.sessions, { ...session, id: `w-${Date.now()}` }],
    })),
}));
