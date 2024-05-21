/*
  Warnings:

  - You are about to drop the column `pharmacyId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_pharmacyId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "pharmacyId",
ADD COLUMN     "pharmacy_id" TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_pharmacy_id_fkey" FOREIGN KEY ("pharmacy_id") REFERENCES "pharmacies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
