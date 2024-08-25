/*
  Warnings:

  - You are about to drop the column `artists` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "artists";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "customerId" TEXT;

-- CreateTable
CREATE TABLE "_UserCustomers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserCustomers_AB_unique" ON "_UserCustomers"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCustomers_B_index" ON "_UserCustomers"("B");

-- AddForeignKey
ALTER TABLE "_UserCustomers" ADD CONSTRAINT "_UserCustomers_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCustomers" ADD CONSTRAINT "_UserCustomers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
