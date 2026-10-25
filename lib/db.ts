import { Pool } from "pg";

export type Note = {
  id: number;
  title: string;
  created_at: string;
};

let pool: Pool | undefined;

function db() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set. Please configure it in your Vercel project settings.");
  }
  return (pool ??= new Pool({ connectionString: url }));
}

export async function getNotes(): Promise<Note[]> {
  const { rows } = await db().query("SELECT id, title, created_at FROM notes ORDER BY created_at DESC");
  return rows as Note[];
}

export async function createNote(title: string): Promise<void> {
  await db().query("INSERT INTO notes (title) VALUES ($1)", [title]);
}
