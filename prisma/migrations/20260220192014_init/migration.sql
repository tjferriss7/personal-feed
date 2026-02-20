-- CreateTable
CREATE TABLE "FeedItem" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sourceItemId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "url" TEXT,
    "imageUrl" TEXT,
    "completedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedItem_source_sourceItemId_key" ON "FeedItem"("source", "sourceItemId");
