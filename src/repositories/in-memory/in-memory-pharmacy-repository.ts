import { Pharmacy, Prisma } from '@prisma/client'
import { FindManyNearbyProps, PharmacyRepository } from '../pharmacy-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryPharmacyRepository implements PharmacyRepository {
  public pharmacies: Pharmacy[] = []

  async findManyNearby(params: FindManyNearbyProps) {
    return this.pharmacies.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async searchMany(query: string, page: number) {
    return this.pharmacies
      .filter((item) => item.pvd.includes(query))
      .slice((page - 1) * 20, page * 40)
  }

  async findMany(page: number) {
    return this.pharmacies.slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.PharmacyCreateInput) {
    const pharmacy = {
      id: data.id ?? 'pharmacy-id',
      brand: data.brand,
      presentation: data.presentation,
      pvd: data.pvd,
      flag: data.flag,
      brick: data.brick,
      cep: data.cep,
      cnpj: data.cnpj,
      address: data.address,
      state: data.state,
      city: data.city,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.pharmacies.push(pharmacy)

    return pharmacy
  }
}
