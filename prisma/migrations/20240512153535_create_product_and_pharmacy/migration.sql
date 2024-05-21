-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "pharmacyId" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pharmacies" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "presentation" TEXT NOT NULL,
    "pvd" TEXT NOT NULL,
    "brick" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cnpj" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "pharmacies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "pharmacies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
