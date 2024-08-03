/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ArtistToCustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArtistToCustomer" DROP CONSTRAINT "ArtistToCustomer_artistId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistToCustomer" DROP CONSTRAINT "ArtistToCustomer_customerId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropTable
DROP TABLE "ArtistToCustomer";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_customerArtists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_customerArtists_AB_unique" ON "_customerArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_customerArtists_B_index" ON "_customerArtists"("B");

-- AddForeignKey
ALTER TABLE "_customerArtists" ADD CONSTRAINT "_customerArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_customerArtists" ADD CONSTRAINT "_customerArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
