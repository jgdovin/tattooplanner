/*
  Warnings:

  - You are about to drop the column `projectId` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_projectId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "projectId";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "notes" TEXT;

-- CreateTable
CREATE TABLE "Assets" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT,

    CONSTRAINT "Assets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
