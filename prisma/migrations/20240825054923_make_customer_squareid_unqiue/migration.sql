/*
  Warnings:

  - A unique constraint covering the columns `[squareId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_squareId_key" ON "Customer"("squareId");