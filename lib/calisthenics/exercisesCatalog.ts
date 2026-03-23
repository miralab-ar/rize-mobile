import type { ExerciseItem } from '@/types/calisthenics';

export type ExerciseCategoryId = 'push' | 'pull' | 'legs' | 'core' | 'skills';

export const EXERCISE_CATEGORIES: { id: ExerciseCategoryId }[] = [
  { id: 'push' },
  { id: 'pull' },
  { id: 'legs' },
  { id: 'core' },
  { id: 'skills' },
];

const catalog: Record<ExerciseCategoryId, ExerciseItem[]> = {
  push: [
    { id: 'p1', name: 'Push-ups' },
    { id: 'p2', name: 'Diamond push-ups' },
    { id: 'p3', name: 'Dips (parallel bars)' },
    { id: 'p4', name: 'Pseudo planche push-ups' },
  ],
  pull: [
    { id: 'l1', name: 'Pull-ups' },
    { id: 'l2', name: 'Chin-ups' },
    { id: 'l3', name: 'Australian rows' },
    { id: 'l4', name: 'Front lever progressions' },
  ],
  legs: [
    { id: 'g1', name: 'Squats' },
    { id: 'g2', name: 'Bulgarian split squat' },
    { id: 'g3', name: 'Jump squats' },
    { id: 'g4', name: 'Calf raises' },
  ],
  core: [
    { id: 'c1', name: 'Hanging knee raises' },
    { id: 'c2', name: 'L-sit hold' },
    { id: 'c3', name: 'Plank' },
    { id: 'c4', name: 'Dead bug' },
  ],
  skills: [
    { id: 's1', name: 'Handstand hold' },
    { id: 's2', name: 'Muscle-up (progressions)' },
    { id: 's3', name: 'Back lever progressions' },
  ],
};

export function exercisesInCategory(cat: ExerciseCategoryId): ExerciseItem[] {
  return catalog[cat];
}
