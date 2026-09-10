import { neon } from "@neondatabase/serverless";

export type Note = {
  id: number;
  title: string;
  created_at: string;
};

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set. Please configure it in your Vercel project settings.");
  }
  return neon(url);
}

export async function getNotes(): Promise<Note[]> {
  const rows = await sql()`SELECT id, title, created_at FROM notes ORDER BY created_at DESC`;
  return rows as Note[];
}

export async function createNote(title: string): Promise<{ id: number }> {
  const rows = await sql()`INSERT INTO notes (title) VALUES (${title}) RETURNING id`;
  return rows[0] as { id: number };
}
