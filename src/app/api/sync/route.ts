// src/app/api/sync/route.ts
import { NextRequest, NextResponse } from "next/server";
import { syncStrava } from "@/lib/sources/strava";
import { syncGoodreads } from "@/lib/sources/goodreads";
import { syncLetterboxd } from "@/lib/sources/letterboxd";

async function runSync() {
  await Promise.all([syncGoodreads(), syncLetterboxd(), syncStrava()]);
}

function isAuthorized(req: NextRequest) {
  const expectedToken = process.env.SYNC_TOKEN;
  if (!expectedToken) return true; // if you haven't set a token yet, allow

  const authHeader = req.headers.get("authorization");
  const tokenFromQuery = req.nextUrl.searchParams.get("token");

  return authHeader === `Bearer ${expectedToken}` || tokenFromQuery === expectedToken;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await runSync();
  return NextResponse.json({ status: "ok" });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await runSync();
  return NextResponse.json({ status: "ok" });
}
