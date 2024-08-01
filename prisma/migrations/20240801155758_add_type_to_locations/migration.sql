-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('PHYSICAL', 'MOBILE');

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "type" "LocationType" NOT NULL DEFAULT 'PHYSICAL';
