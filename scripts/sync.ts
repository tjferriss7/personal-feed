// scripts/sync.ts
import "dotenv/config";
import { syncGoodreads } from "../src/lib/sources/goodreads";
import { syncLetterboxd } from "../src/lib/sources/letterboxd";
import { syncStrava } from "../src/lib/sources/strava";

async function main() {
  try {
    console.log("Starting sync…");

    await Promise.all([
      syncGoodreads(),
      syncLetterboxd(),
      syncStrava(),
    ]);

    console.log("✅ Sync completed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Sync failed");
    console.error(err);
    process.exit(1);
  }
}

main();
