import { neon } from "@neondatabase/serverless";

export type Note = {
  id: number;
  title: string;
  created_at: string;
};

function sql() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error(
      "Missing DATABASE_URL environment variable. Set it to your Neon database connection string."
    );
  }
  return neon(dbUrl);
}

export async function getNotes(): Promise<Note[]> {
  const rows = await sql()`SELECT id, title, created_at FROM notes ORDER BY created_at DESC`;
  return rows as Note[];
}

export async function createNote(title: string): Promise<void> {
  await sql()`INSERT INTO notes (title) VALUES (${title})`;
}
