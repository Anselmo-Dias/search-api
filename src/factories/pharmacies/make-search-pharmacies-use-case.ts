import { PrismaPharmacyRepository } from '@/repositories/prisma/prisma-pharmacy-repository'
import { SearchPharmaciesUseCase } from '@/services/search-pharmacies'

export function makeSearchPharmaciesUseCase() {
  const pharmacyRepository = new PrismaPharmacyRepository()
  const searchPharmaciesUseCase = new SearchPharmaciesUseCase(
    pharmacyRepository,
  )

  return searchPharmaciesUseCase
}
