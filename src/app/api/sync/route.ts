import { NextRequest, NextResponse } from "next/server";
import { syncStrava } from "@/lib/sources/strava";
import { syncGoodreads } from "@/lib/sources/goodreads";
import { syncLetterboxd } from "@/lib/sources/letterboxd";

type SourceResult =
  | { source: string; ok: true }
  | { source: string; ok: false; error: string };

async function runSync(): Promise<SourceResult[]> {
  const jobs = [
    { source: "goodreads", fn: syncGoodreads },
    { source: "letterboxd", fn: syncLetterboxd },
    { source: "strava", fn: syncStrava },
  ] as const;

  const settled = await Promise.allSettled(jobs.map((j) => j.fn()));

  return settled.map((s, idx) => {
    const source = jobs[idx].source;
    if (s.status === "fulfilled") return { source, ok: true as const };
    const msg =
      s.reason instanceof Error ? s.reason.message : String(s.reason);
    return { source, ok: false as const, error: msg };
  });
}

function isAuthorized(req: NextRequest) {
  const expectedToken = process.env.SYNC_TOKEN;
  if (!expectedToken) return true;

  const authHeader = req.headers.get("authorization");
  const tokenFromQuery = req.nextUrl.searchParams.get("token");
  return authHeader === `Bearer ${expectedToken}` || tokenFromQuery === expectedToken;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return new NextResponse("Unauthorized", { status: 401 });

  const results = await runSync();
  const anyFailed = results.some((r) => !r.ok);

  return NextResponse.json(
    { status: anyFailed ? "partial" : "ok", results },
    { status: anyFailed ? 207 : 200 } // 207 Multi-Status when partial
  );
}

export async function POST(req: NextRequest) {
  return GET(req);
}
