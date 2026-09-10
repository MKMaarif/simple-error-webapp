"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function trackNoteCreated(noteId: number) {
  console.log(`note_created: ${noteId}`);
}

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      setError(`Request failed: ${res.status}`);
      return;
    }
    const data = await res.json();
    try {
      if (data?.note?.id) {
        trackNoteCreated(data.note.id);
      }
    } catch (err) {
      console.error("[Sentry] captureException:", err);
    }
    setTitle("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New note title"
        required
      />
      <button type="submit">Add</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
