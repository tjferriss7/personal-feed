// lib/feed.ts
import { prisma } from './db';
import type { FeedItem } from '@prisma/client';

export type FeedItemInput = Omit<
  FeedItem,
  'id' | 'createdAt' | 'updatedAt'
>;

export async function upsertFeedItem(input: FeedItemInput) {
  return prisma.feedItem.upsert({
    where: {
      // Uses the @@unique([source, sourceItemId]) from schema.prisma
      source_sourceItemId: {
        source: input.source,
        sourceItemId: input.sourceItemId,
      },
    },
    create: input,
    update: {
      title: input.title,
      subtitle: input.subtitle,
      description: input.description,
      url: input.url,
      imageUrl: input.imageUrl,
      completedAt: input.completedAt,
    },
  });
}
