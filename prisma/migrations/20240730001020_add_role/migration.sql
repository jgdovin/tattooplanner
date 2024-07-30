-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ARTIST', 'CUSTOMER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER';
