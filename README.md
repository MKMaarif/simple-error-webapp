# Simple Error Web App

Deliberately buggy notes app — target for the [gh_resolve_error_mcp](https://github.com/MKMaarif/error-handling-gh-agent) agent.

Next.js (App Router) + Vercel Postgres. Lists notes, lets you add one.

Ships with two intentional bugs:
- DB connection error (Postgres env vars not wired to Production)
- Backend endpoint error (`POST /api/notes` reads the wrong field name)

## Dev

```bash
npm install
npm run dev
```

Needs `POSTGRES_URL` set (see Vercel Postgres dashboard → `.env.local`).
