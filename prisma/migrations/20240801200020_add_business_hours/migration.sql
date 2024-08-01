-- CreateTable
CREATE TABLE "businessHours" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "open" INTEGER NOT NULL DEFAULT 900,
    "close" INTEGER NOT NULL DEFAULT 1700,
    "closed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "businessHours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "businessHours_locationId_day_key" ON "businessHours"("locationId", "day");

-- AddForeignKey
ALTER TABLE "businessHours" ADD CONSTRAINT "businessHours_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
