/*
  Warnings:

  - The `friClosed` column on the `Location` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `monClosed` column on the `Location` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `satClosed` column on the `Location` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sunClosed` column on the `Location` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `thuClosed` column on the `Location` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tueClosed` column on the `Location` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `wedClosed` column on the `Location` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "friClosed",
ADD COLUMN     "friClosed" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "monClosed",
ADD COLUMN     "monClosed" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "satClosed",
ADD COLUMN     "satClosed" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "sunClosed",
ADD COLUMN     "sunClosed" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "thuClosed",
ADD COLUMN     "thuClosed" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "tueClosed",
ADD COLUMN     "tueClosed" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "wedClosed",
ADD COLUMN     "wedClosed" BOOLEAN NOT NULL DEFAULT false;
