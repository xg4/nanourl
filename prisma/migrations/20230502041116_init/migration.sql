-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "short_code" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_short_code_key" ON "links"("short_code");

-- CreateIndex
CREATE UNIQUE INDEX "links_original_url_key" ON "links"("original_url");

-- CreateIndex
CREATE UNIQUE INDEX "links_hash_key" ON "links"("hash");
