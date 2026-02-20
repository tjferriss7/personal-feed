// src/lib/sources/strava.ts
import { upsertFeedItem } from "../feed";

type StravaActivity = {
  id: number;
  name: string;
  type: string; // "Run", "Ride", etc.
  start_date_local: string;
  distance: number; // meters
  moving_time: number; // seconds
};

async function getStravaAccessToken() {
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Strava token error:", res.status, text);
    throw new Error(`Failed to refresh Strava token (status ${res.status})`);
  }

  const data = await res.json();
  return data.access_token as string;
}

export async function syncStrava() {
  const accessToken = await getStravaAccessToken();

  const res = await fetch(
    "https://www.strava.com/api/v3/athlete/activities?per_page=50&page=1",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    }
  );

  if (!res.ok) {
  const text = await res.text();
  console.error("Strava activities error:", res.status, text);
  throw new Error(`Failed to fetch Strava activities (status ${res.status})`);
  }

  const activities = (await res.json()) as StravaActivity[];

  // Only include runs
  const runs = activities.filter(
    (a) => a.type === "Run" || a.type === "TrailRun"
  );

  for (const run of runs) {
    const distanceMiles = run.distance / 1609.34;
    const date = new Date(run.start_date_local);

    const minutes = Math.floor(run.moving_time / 60);
    const seconds = String(run.moving_time % 60).padStart(2, "0");

    await upsertFeedItem({
      source: "strava",
      sourceItemId: String(run.id),
      title: `${run.name || "Run"} · ${distanceMiles.toFixed(1)} mi`,
      subtitle: `Time ${minutes}:${seconds}`,
      description: null,
      url: `https://www.strava.com/activities/${run.id}`,
      imageUrl: null,
      completedAt: date,
    });
  }
}
