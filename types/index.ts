/**
 * Rize data types
 */

export type Gender = 'male' | 'female';

export interface User {
  _id: string;
  email: string;
  username?: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  phone?: string;
  gender?: Gender;
  authProvider: 'google' | 'apple' | 'email';
  createdAt: string;
  updatedAt: string;
  /** Client-only: when the session expires (ms since epoch) */
  sessionExpiresAt?: number;
}

export type { WorkoutSession, ExerciseItem } from './calisthenics';
