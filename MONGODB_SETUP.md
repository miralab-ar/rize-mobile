# MongoDB Atlas — Rize

1. Create a cluster (e.g. region **EU** if you prefer).
2. Create a database user and allow network access (IP allowlist or `0.0.0.0/0` for Vercel serverless).
3. **Database name:** `rizemobile` (see `api/lib/mongodb.ts`).
4. Create collections as needed by your app (this scaffold mirrors Matchpoint: `users`, `tournaments`, `teams`, `entries`, etc.).

Connection string example:

```
mongodb+srv://<user>:<pass>@cluster0.xxx.mongodb.net/rizemobile?retryWrites=true&w=majority
```

Set `MONGODB_URI` in Vercel for the API.
