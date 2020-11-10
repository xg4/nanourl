-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "origin" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "url_expires" TIMESTAMP(3),
    "click_count" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links.origin_unique" ON "links"("origin");

-- CreateIndex
CREATE UNIQUE INDEX "links.hash_unique" ON "links"("hash");
