import { NextRequest, NextResponse } from "next/server";
import { createNote } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title } = body;
  await createNote(name.trim());
  return NextResponse.json({ ok: true });
}
