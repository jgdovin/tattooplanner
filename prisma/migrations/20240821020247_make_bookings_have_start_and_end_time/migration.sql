/*
  Warnings:

  - You are about to drop the column `date` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Booking` table. All the data in the column will be lost.
  - The `start` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "date",
DROP COLUMN "duration",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "start",
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
