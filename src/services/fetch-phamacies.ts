import { PharmacyRepository } from '@/repositories/pharmacy-repository'
import { Pharmacy } from '@prisma/client'

interface FetchPharmaciesUseCaseRequest {
  page: number
}

interface FetchPharmaciesUseCaseResponse {
  pharmacies: Pharmacy[]
}

export class FetchPharmaciesUseCase {
  constructor(private pharmacyRepository: PharmacyRepository) {}

  public async execute({
    page,
  }: FetchPharmaciesUseCaseRequest): Promise<FetchPharmaciesUseCaseResponse> {
    const pharmacies = await this.pharmacyRepository.findMany(page)

    return { pharmacies }
  }
}
