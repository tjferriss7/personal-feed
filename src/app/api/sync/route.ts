// src/app/api/sync/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { syncStrava } from "@/lib/sources/strava";
import { syncGoodreads } from '@/lib/sources/goodreads';
import { syncLetterboxd } from '@/lib/sources/letterboxd';

export async function POST(req: NextRequest) {
  const expectedToken = process.env.SYNC_TOKEN;
  const authHeader = req.headers.get('authorization');

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  await Promise.all([
  syncGoodreads(),
  syncLetterboxd(),
  syncStrava(),
]);

  return NextResponse.json({ status: 'ok' });
}
