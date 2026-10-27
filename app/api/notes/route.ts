import { NextRequest, NextResponse } from "next/server";
import { createNote } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title } = body;
  if (!title || typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  await createNote(title.trim());
  return NextResponse.json({ ok: true });
}
