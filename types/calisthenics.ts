/**
 * Calisthenics domain — kept minimal for local-first MVP.
 */

export interface WorkoutSession {
  id: string;
  /** Local calendar day YYYY-MM-DD */
  date: string;
  title: string;
  durationMin?: number;
}

export interface ExerciseItem {
  id: string;
  name: string;
}
