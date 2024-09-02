/*
  Warnings:

  - Made the column `notes` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address1` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zip` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "notes" SET NOT NULL,
ALTER COLUMN "address1" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "zip" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL;
