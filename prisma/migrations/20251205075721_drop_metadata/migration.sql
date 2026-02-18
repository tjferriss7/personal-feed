/*
  Warnings:

  - You are about to drop the column `metadata` on the `FeedItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FeedItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "source" TEXT NOT NULL,
    "sourceItemId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "url" TEXT,
    "imageUrl" TEXT,
    "completedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_FeedItem" ("completedAt", "createdAt", "description", "id", "imageUrl", "source", "sourceItemId", "subtitle", "title", "updatedAt", "url") SELECT "completedAt", "createdAt", "description", "id", "imageUrl", "source", "sourceItemId", "subtitle", "title", "updatedAt", "url" FROM "FeedItem";
DROP TABLE "FeedItem";
ALTER TABLE "new_FeedItem" RENAME TO "FeedItem";
CREATE UNIQUE INDEX "FeedItem_source_sourceItemId_key" ON "FeedItem"("source", "sourceItemId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
