-- CreateTable
CREATE TABLE "ArtistToCustomer" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "ArtistToCustomer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArtistToCustomer" ADD CONSTRAINT "ArtistToCustomer_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistToCustomer" ADD CONSTRAINT "ArtistToCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
