/*
  Warnings:

  - You are about to alter the column `squareAmount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `squareTotalAmount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `squareApprovedAmount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "squareAmount" SET DATA TYPE BIGINT,
ALTER COLUMN "squareTotalAmount" SET DATA TYPE BIGINT,
ALTER COLUMN "squareApprovedAmount" SET DATA TYPE BIGINT;
