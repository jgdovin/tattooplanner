/*
  Warnings:

  - You are about to drop the column `mostRecentPin` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `mostRecentPinDate` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "mostRecentPin",
DROP COLUMN "mostRecentPinDate",
DROP COLUMN "notes";

-- CreateTable
CREATE TABLE "CustomerArtistProfile" (
    "id" TEXT NOT NULL,
    "nickname" TEXT,
    "notes" TEXT,
    "customerId" TEXT NOT NULL,
    "alternatePhone" TEXT,
    "artistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerArtistProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerArtistProfile_customerId_artistId_key" ON "CustomerArtistProfile"("customerId", "artistId");

-- AddForeignKey
ALTER TABLE "CustomerArtistProfile" ADD CONSTRAINT "CustomerArtistProfile_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerArtistProfile" ADD CONSTRAINT "CustomerArtistProfile_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
