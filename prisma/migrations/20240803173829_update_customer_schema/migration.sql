/*
  Warnings:

  - You are about to drop the column `userId` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "userId",
ALTER COLUMN "address1" DROP NOT NULL,
ALTER COLUMN "address2" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "zip" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL;
