import { PharmacyRepository } from '@/repositories/pharmacy-repository'
import { Pharmacy } from '@prisma/client'

interface SearchPharmaciesUseCaseRequest {
  query: string
  page: number
}

interface SearchPharmaciesUseCaseResponse {
  pharmacies: Pharmacy[]
}

export class SearchPharmaciesUseCase {
  constructor(private pharmacyRepository: PharmacyRepository) {}

  async execute({
    page,
    query,
  }: SearchPharmaciesUseCaseRequest): Promise<SearchPharmaciesUseCaseResponse> {
    const pharmacies = await this.pharmacyRepository.searchMany(query, page)

    return { pharmacies }
  }
}
