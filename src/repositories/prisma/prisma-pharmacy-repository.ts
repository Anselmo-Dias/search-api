import { Pharmacy, Prisma } from '@prisma/client'
import { FindManyNearbyProps, PharmacyRepository } from '../pharmacy-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPharmacyRepository implements PharmacyRepository {
  async findMany(page: number) {
    const pharmacies = await prisma.pharmacy.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })

    return pharmacies
  }

  async findById(id: string) {
    const pharmacy = await prisma.pharmacy.findUnique({
      where: {
        id,
      },
    })

    return pharmacy
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyProps) {
    const pharmacies = await prisma.$queryRaw<Pharmacy[]>`
      SELECT * from pharmacies
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return pharmacies
  }

  async searchMany(query: string, page: number) {
    const pharmacies = await prisma.pharmacy.findMany({
      where: {
        pvd: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pharmacies
  }

  async create(data: Prisma.PharmacyCreateInput) {
    const pharmacy = await prisma.pharmacy.create({
      data,
    })

    return pharmacy
  }
}
