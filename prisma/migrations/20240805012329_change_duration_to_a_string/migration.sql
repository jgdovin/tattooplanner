/*
  Warnings:

  - You are about to drop the column `end` on the `Booking` table. All the data in the column will be lost.
  - Made the column `duration` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "end",
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "duration" SET DEFAULT '00:00',
ALTER COLUMN "duration" SET DATA TYPE TEXT;
