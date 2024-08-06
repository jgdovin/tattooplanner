-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" TEXT NOT NULL,
    "cancellationFee" DOUBLE PRECISION NOT NULL,
    "hidePriceFromCustomers" BOOLEAN NOT NULL DEFAULT false,
    "bookableByCustomers" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LocationServices" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LocationServices_AB_unique" ON "_LocationServices"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationServices_B_index" ON "_LocationServices"("B");

-- AddForeignKey
ALTER TABLE "_LocationServices" ADD CONSTRAINT "_LocationServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationServices" ADD CONSTRAINT "_LocationServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
