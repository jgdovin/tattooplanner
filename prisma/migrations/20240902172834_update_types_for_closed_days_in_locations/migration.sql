/*
  Warnings:

  - Made the column `friClosed` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `monClosed` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `satClosed` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sunClosed` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thuClosed` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tueClosed` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wedClosed` on table `Location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "friClosed" SET NOT NULL,
ALTER COLUMN "friClosed" SET DEFAULT 'false',
ALTER COLUMN "friClosed" SET DATA TYPE TEXT,
ALTER COLUMN "monClosed" SET NOT NULL,
ALTER COLUMN "monClosed" SET DEFAULT 'false',
ALTER COLUMN "monClosed" SET DATA TYPE TEXT,
ALTER COLUMN "satClosed" SET NOT NULL,
ALTER COLUMN "satClosed" SET DEFAULT 'false',
ALTER COLUMN "satClosed" SET DATA TYPE TEXT,
ALTER COLUMN "sunClosed" SET NOT NULL,
ALTER COLUMN "sunClosed" SET DEFAULT 'false',
ALTER COLUMN "sunClosed" SET DATA TYPE TEXT,
ALTER COLUMN "thuClosed" SET NOT NULL,
ALTER COLUMN "thuClosed" SET DEFAULT 'false',
ALTER COLUMN "thuClosed" SET DATA TYPE TEXT,
ALTER COLUMN "tueClosed" SET NOT NULL,
ALTER COLUMN "tueClosed" SET DEFAULT 'false',
ALTER COLUMN "tueClosed" SET DATA TYPE TEXT,
ALTER COLUMN "wedClosed" SET NOT NULL,
ALTER COLUMN "wedClosed" SET DEFAULT 'false',
ALTER COLUMN "wedClosed" SET DATA TYPE TEXT;
