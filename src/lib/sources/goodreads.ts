// lib/sources/goodreads.ts
import Parser from 'rss-parser';
import { upsertFeedItem } from '../feed';

type GoodreadsRSSItem = {
  title: string;
  link: string;
  guid?: string;
  'book_title'?: string;
  'book_author'?: string;
  'book_image_url'?: string;
  'user_read_at'?: string;
  'user_review'?: string;
  'user_rating'?: string;
  pubDate?: string;
};

const parser: Parser<unknown, GoodreadsRSSItem> = new Parser({
  customFields: {
    item: [
      'book_title',
      'book_author',
      'book_image_url',
      'user_read_at',
      'user_review',
      'user_rating',
    ],
  },
});

export async function syncGoodreads() {
  const url = process.env.GOODREADS_RSS_URL;
  if (!url) {
    console.warn('GOODREADS_RSS_URL not set; skipping Goodreads sync');
    return;
  }

  const feed = await parser.parseURL(url);
  const items = feed.items ?? [];

  for (const item of items) {
    const bookTitle = item['book_title'] || item.title || 'Unknown title';
    const author = item['book_author'] || '';
    const review = item['user_review']?.trim();
    const rating = item['user_rating'];
    const cover = item['book_image_url'];
    const link = item.link;

    const completedAtStr =
      item['user_read_at'] || item.pubDate || new Date().toISOString();
    const completedAt = new Date(completedAtStr);

    const sourceItemId =
      item.guid ||
      (link ? new URL(link).searchParams.get('id') : null) ||
      bookTitle;

    await upsertFeedItem({
      source: 'goodreads',
      // non-null assertion because we always fall back to bookTitle
      sourceItemId: sourceItemId!,
      title: bookTitle,
      subtitle: author || null,
      description: review || null,
      url: link || null,
      imageUrl: cover || null,
      completedAt,
    });
  }
}
