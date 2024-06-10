/*
  Warnings:

  - Added the required column `city` to the `pharmacies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pharmacies" ADD COLUMN     "city" TEXT NOT NULL;
