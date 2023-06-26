/*
  Warnings:

  - You are about to drop the column `hash` on the `links` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "links_hash_key";

-- DropIndex
DROP INDEX "links_original_url_key";

-- AlterTable
ALTER TABLE "links" DROP COLUMN "hash";

-- CreateIndex
CREATE INDEX "links_original_url_idx" ON "links"("original_url");
