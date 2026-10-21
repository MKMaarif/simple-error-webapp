import { NextRequest, NextResponse } from "next/server";
import { createNote } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const title = body?.title;
    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    await createNote(title.trim());
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[API] Error creating note:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
