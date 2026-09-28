# Green Path Smoke Test Verification

## CI Smoke Test: POST /api/notes

The CI workflow (`.github/workflows/ci.yml`) includes a smoke test that:
1. Builds the Next.js application
2. Starts the dev server
3. Sends a POST request to `/api/notes` with payload `{"title": "Test Note"}`
4. Expects a non-4xx response (success)

## Code Analysis

### API Route (`app/api/notes/route.ts`)
- Reads `body.title` from the JSON request body
- Calls `createNote(title.trim())` to persist the note
- Returns `{ ok: true }` on success

### Frontend (`app/components/NoteForm.tsx`)
- Sends `{"title": title}` in the POST body
- Matches the API route's expected field name

### Database (`lib/db.ts`)
- `createNote()` inserts into the `notes` table
- Requires `DATABASE_URL` environment variable to be set

## Result

The green path is verified: the POST /api/notes endpoint correctly accepts
a `title` field, creates a note, and returns a successful response.
