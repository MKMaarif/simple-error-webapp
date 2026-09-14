import { NextRequest, NextResponse } from "next/server";
import { createNote } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title } = body;
  const note = await createNote(title.trim());
  return NextResponse.json({ note });
}
