/*
  Warnings:

  - Added the required column `flag` to the `pharmacies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pharmacies" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "flag" TEXT NOT NULL;
