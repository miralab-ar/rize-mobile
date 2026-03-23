# Rize Mobile

Mobile app (Expo + React Native) with a Vercel serverless API and MongoDB — scaffolded from the same structure as [Matchpoint](https://github.com/octapf/matchpoint) (Miralab).

**By [Miralab](https://miralab.ar)**

---

## Overview

Rize is a **calisthenics** app scaffold: **Home** (month calendar + per-day workout summary), **Workouts** (session list), **Exercises** (reference catalog), **Profile**. Workout data is local sample data in `store/useWorkoutLogStore.ts` until you wire MongoDB or another backend.

Targets **Android** and **iOS** (Expo prebuild / EAS).

---

## Tech stack

| Layer | Stack |
|-------|--------|
| **Mobile** | Expo, Expo Router, NativeWind (Tailwind) |
| **State** | Zustand, TanStack Query |
| **Auth** | Google, Apple, email (API routes in `api/auth/`) |
| **Backend** | Vercel serverless (`api/`) |
| **Database** | MongoDB Atlas (`rizemobile` database name) |

---

## Prerequisites

- Node.js 18+
- MongoDB Atlas cluster
- Google OAuth credentials (Web + Android clients for Android sign-in)
- Apple Developer account (for Sign in with Apple on iOS)

---

## Setup

1. **Install**

   ```bash
   cd rize-mobile
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and fill in values (API URL, Google client IDs, invite base URL).

3. **Native projects** (after clone)

   ```bash
   npx expo prebuild
   ```

   This generates `android/` and `ios/` with bundle ID `com.miralab.rizemobile`.

4. **Run**

   ```bash
   npm run start
   ```

   Press `a` (Android), `i` (iOS), or `w` (web).

5. **API locally**

   ```bash
   npm run api:dev
   ```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Expo dev server |
| `npm run start:tunnel` | Expo with tunnel |
| `npm run android` / `ios` | Run native build |
| `npm run web` | Web |
| `npm run api:dev` | Vercel API locally |

---

## EAS / Play Store / App Store

```bash
npx eas init
```

Configure `eas.json` and add environment variables in the EAS dashboard. Use a Play Console service account JSON only locally or via CI secrets — do not commit keys.

---

## License

Private — Miralab.
