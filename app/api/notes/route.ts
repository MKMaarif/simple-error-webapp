import { NextRequest, NextResponse } from "next/server";
import { createNote, getNotes } from "@/lib/db";

const DEFAULT_LIMIT = 20;

export async function GET(request: NextRequest) {
  const limit = Number.parseInt(request.nextUrl.searchParams.get("limit")!.trim(), 10) || DEFAULT_LIMIT;
  const notes = await getNotes();
  return NextResponse.json(notes.slice(0, limit));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title } = body;
  await createNote(title.trim());
  return NextResponse.json({ ok: true });
}
