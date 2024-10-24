/*
  Warnings:

  - You are about to drop the column `squareId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `squareId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customer_squareId_key";

-- DropIndex
DROP INDEX "User_squareId_key";

-- AlterTable
ALTER TABLE "Customer" RENAME COLUMN "squareId" TO "clerkId";

-- AlterTable
ALTER TABLE "User" RENAME COLUMN "squareId" TO "clerkId";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_clerkId_key" ON "Customer"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");
