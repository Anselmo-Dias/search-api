import { PharmacyRepository } from '@/repositories/pharmacy-repository'

interface CreatePharmacyUseCaseRequest {
  brand: string
  presentation: string
  pvd: string
  flag: string
  brick: string
  cep: string
  cnpj: number
  address: string
  state: string
  city: string
  latitude: number
  longitude: number
}

export class CreatePharmacyUseCase {
  constructor(private pharmacyRepository: PharmacyRepository) {}

  async execute(pharmacyData: CreatePharmacyUseCaseRequest) {
    const pharmacy = await this.pharmacyRepository.create(pharmacyData)

    return { pharmacy }
  }
}
