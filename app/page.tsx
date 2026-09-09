import { getNotes } from "@/lib/db";
import NoteForm from "@/app/components/NoteForm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const notes = await getNotes();

  return (
    <main style={{ maxWidth: 480, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Notes</h1>
      <NoteForm />
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </main>
  );
}
