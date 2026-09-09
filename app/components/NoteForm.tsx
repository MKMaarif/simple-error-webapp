"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
