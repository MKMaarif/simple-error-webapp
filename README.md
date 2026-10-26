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

## Local Docker stack (SYN-63)

Local-only stack (app + Postgres + Vector log shipper to OpenObserve); Vercel is unaffected.

```bash
docker compose --env-file ../../openobserve-local/.env up -d --build
```

- App on http://localhost:3100. Its Postgres is internal to the compose network (no host port).
- `ENABLE_BOOM=1` is set only by this compose file; without it `GET /api/boom` returns 404.
- Error triggers (each reaches OpenObserve `app_logs` as level=error):
  1. `GET /api/boom` (deterministic error)
  2. `POST /api/notes` with `{"name":"x"}` (wrong field, TypeError)
  3. `docker compose stop db`, then `GET /` (database down)
- The two intentional bugs (wrong field in `POST /api/notes`, DB connection error) are Fix-Issue targets: do not fix them.

<!-- UAT Phase 10 REL-04 kill-switch live check note -->
