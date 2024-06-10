import { PharmacyRepository } from '@/repositories/pharmacy-repository'
import { Pharmacy } from '@prisma/client'

interface FetchNearbyPharmaciesRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyPharmaciesResponse {
  pharmacies: Pharmacy[]
}

export class FetchNearbyPharmacies {
  constructor(private pharmacyRepository: PharmacyRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyPharmaciesRequest): Promise<FetchNearbyPharmaciesResponse> {
    const pharmacies = await this.pharmacyRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { pharmacies }
  }
}
