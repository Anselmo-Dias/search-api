import { PrismaPharmacyRepository } from '@/repositories/prisma/prisma-pharmacy-repository'
import { CreatePharmacyUseCase } from '@/services/create-pharmacy'

export function makeCreatePharmacyUseCase() {
  const pharmacyRepository = new PrismaPharmacyRepository()
  const createPharmacyUseCase = new CreatePharmacyUseCase(pharmacyRepository)

  return createPharmacyUseCase
}
