// lib/sources/letterboxd.ts
import Parser from 'rss-parser';
import { upsertFeedItem } from '../feed';

type LetterboxdRSSItem = {
  title: string;
  link: string;
  content?: string;
  pubDate?: string;
  'letterboxd:watchedDate'?: string;
  'letterboxd:filmTitle'?: string;
  'letterboxd:filmYear'?: string;
  'letterboxd:memberRating'?: string;
};

const parser: Parser<unknown, LetterboxdRSSItem> = new Parser({
  customFields: {
    item: [
      'letterboxd:watchedDate',
      'letterboxd:filmTitle',
      'letterboxd:filmYear',
      'letterboxd:memberRating',
    ],
  },
});

function extractFirstTextFromHtml(html?: string): string | null {
  if (!html) return null;
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text || null;
}

export async function syncLetterboxd() {
  const url = process.env.LETTERBOXD_RSS_URL;
  if (!url) {
    console.warn('LETTERBOXD_RSS_URL not set; skipping Letterboxd sync');
    return;
  }

  const feed = await parser.parseURL(url);
  const items = feed.items ?? [];

  for (const item of items) {
    const filmTitle =
      item['letterboxd:filmTitle'] || item.title || 'Unknown film';
    const filmYear = item['letterboxd:filmYear'];
    const rating = item['letterboxd:memberRating'];
    const link = item.link;

    const watchedAtStr =
      item['letterboxd:watchedDate'] ||
      item.pubDate ||
      new Date().toISOString();
    const watchedAt = new Date(watchedAtStr);

    const description = extractFirstTextFromHtml(item.content);
    const sourceItemId = link
      ? new URL(link).pathname.replace(/\/+$/g, '')
      : filmTitle;

    await upsertFeedItem({
      source: 'letterboxd',
      sourceItemId,
      title: filmTitle,
      subtitle: filmYear || null,
      description,
      url: link || null,
      imageUrl: null, // can add poster support later
      completedAt: watchedAt,
    });
  }
}
