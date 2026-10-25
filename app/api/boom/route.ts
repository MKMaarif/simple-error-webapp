export const dynamic = "force-dynamic";

// Local-only trigger, gated so the Vercel deploy keeps exactly its two intentional bugs (SYN-63 D-18).
export async function GET() {
  if (process.env.ENABLE_BOOM !== "1") {
    return new Response(null, { status: 404 });
  }
  throw new Error("Boom: deterministic log-pipeline test error (SYN-63)");
}
