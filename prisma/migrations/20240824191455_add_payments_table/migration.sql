-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "squareAmount" DOUBLE PRECISION NOT NULL,
    "squareTotalAmount" DOUBLE PRECISION NOT NULL,
    "squareApprovedAmount" DOUBLE PRECISION NOT NULL,
    "squareSourceType" TEXT NOT NULL,
    "squareOrderId" TEXT NOT NULL,
    "squareId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
