import { NextRequest, NextResponse } from "next/server";
import { createNote } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title } = body;
  
  // Defensive null check: validate title is provided and is a string
  if (!title || typeof title !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid title field" },
      { status: 400 }
    );
  }
  
  await createNote(title.trim());
  return NextResponse.json({ ok: true });
}
