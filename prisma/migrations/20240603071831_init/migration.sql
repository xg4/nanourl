-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "original" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_logs" (
    "id" SERIAL NOT NULL,
    "url_id" INTEGER NOT NULL,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "access_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_key" ON "urls"("short");

-- CreateIndex
CREATE INDEX "urls_short_original_idx" ON "urls"("short", "original");

-- CreateIndex
CREATE INDEX "access_logs_url_id_idx" ON "access_logs"("url_id");

-- AddForeignKey
ALTER TABLE "access_logs" ADD CONSTRAINT "access_logs_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
