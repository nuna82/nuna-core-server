-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "comment_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "support_count" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "PostImage" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "original" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
