# CI Smoke Test — Green Path Verification

## Summary

Verified that the CI workflow's smoke test (`.github/workflows/ci.yml`) correctly
follows the green (happy) path for the `POST /api/notes` endpoint.

## Analysis

| Component | Field sent/read |
|-----------|----------------|
| Frontend (`NoteForm.tsx`) | `{"title": ...}` |
| API route (`app/api/notes/route.ts`) | `const { title } = body` |
| CI smoke test (`.github/workflows/ci.yml`) | `{"title": "Test Note"}` |

All three layers are consistent — the field name `"title"` is used
end-to-end. The CI smoke test sends a valid payload matching the
frontend contract, and the API handler correctly destructures it.

The CI workflow also correctly sets `DATABASE_URL` from secrets and
`NEXT_PUBLIC_APP_URL` as `http://localhost:3000`.

## Verdict

Green path is correctly configured. No changes needed to the CI
workflow or API route for the happy path.
