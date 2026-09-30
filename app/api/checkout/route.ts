import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const items = body?.items ?? [];

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid items format" }, { status: 400 });
    }

    const total = items.reduce((sum, item) => sum + (item?.price ?? 0) * (item?.quantity ?? 1), 0);

    return NextResponse.json({ success: true, total, itemCount: items.length });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
