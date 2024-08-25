/*
  Warnings:

  - You are about to drop the `_CustomerArtists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CustomerArtists" DROP CONSTRAINT "_CustomerArtists_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerArtists" DROP CONSTRAINT "_CustomerArtists_B_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "artists" TEXT[];

-- DropTable
DROP TABLE "_CustomerArtists";
