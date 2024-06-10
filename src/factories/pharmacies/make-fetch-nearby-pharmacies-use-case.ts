import { PrismaPharmacyRepository } from '@/repositories/prisma/prisma-pharmacy-repository'
import { FetchNearbyPharmacies } from '@/services/fetch-nearby-pharmacies'

export function makeFetchNearbyPharmaciesUseCase() {
  const pharmacyRepository = new PrismaPharmacyRepository()
  const fetchNearbyPharmaciesUseCase = new FetchNearbyPharmacies(
    pharmacyRepository,
  )

  return fetchNearbyPharmaciesUseCase
}
