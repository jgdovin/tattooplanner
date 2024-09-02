/*
  Warnings:

  - Made the column `address1` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address2` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zip` on table `Location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "address1" SET NOT NULL,
ALTER COLUMN "address2" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "zip" SET NOT NULL;
