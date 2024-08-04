/*
  Warnings:

  - You are about to drop the `_customerArtists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_customerArtists" DROP CONSTRAINT "_customerArtists_A_fkey";

-- DropForeignKey
ALTER TABLE "_customerArtists" DROP CONSTRAINT "_customerArtists_B_fkey";

-- DropTable
DROP TABLE "_customerArtists";

-- DropTable
DROP TABLE "customer";

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "mostRecentPin" TEXT,
    "mostRecentPinDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT DEFAULT '',
    "address1" TEXT DEFAULT '',
    "address2" TEXT DEFAULT '',
    "city" TEXT DEFAULT '',
    "state" TEXT DEFAULT '',
    "zip" TEXT DEFAULT '',
    "country" TEXT DEFAULT 'US',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CustomerArtists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerArtists_AB_unique" ON "_CustomerArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerArtists_B_index" ON "_CustomerArtists"("B");

-- AddForeignKey
ALTER TABLE "_CustomerArtists" ADD CONSTRAINT "_CustomerArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerArtists" ADD CONSTRAINT "_CustomerArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
