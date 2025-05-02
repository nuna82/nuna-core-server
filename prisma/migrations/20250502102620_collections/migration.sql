-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "collection_id" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "collection_count" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "post_count" INTEGER NOT NULL DEFAULT 0,
    "creator_id" INTEGER NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
