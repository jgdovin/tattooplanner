/*
  Warnings:

  - You are about to drop the `businessHours` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "businessHours" DROP CONSTRAINT "businessHours_locationId_fkey";

-- DropTable
DROP TABLE "businessHours";
