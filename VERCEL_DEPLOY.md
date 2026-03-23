# Deploy Rize API to Vercel

The `api/` folder is deployed as Vercel serverless functions. Configure the same project for the Expo web export if you use the `vercel.json` build.

## Environment variables (Vercel)

| Variable | Example |
|----------|---------|
| `MONGODB_URI` | `mongodb+srv://.../rizemobile?retryWrites=true&w=majority` |
| `GOOGLE_CLIENT_ID` | Web client ID (same as `EXPO_PUBLIC_GOOGLE_CLIENT_ID`) |
| `GOOGLE_ANDROID_CLIENT_ID` | Optional; Android OAuth client |
| `JWT_SECRET` | Strong random string (production) |
| `APP_URL` | Your Vercel origin, e.g. `https://rize-mobile-xxx.vercel.app` |

After deploy, set `EXPO_PUBLIC_API_URL` in `.env` and in EAS to the same API URL.

```bash
EXPO_PUBLIC_API_URL=https://rize-mobile-xxx.vercel.app
```

## Local API

```bash
npm run api:dev
```
