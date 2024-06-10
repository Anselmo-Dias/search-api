import { Pharmacy, Prisma } from '@prisma/client'

export interface FindManyNearbyProps {
  latitude: number
  longitude: number
}

export interface PharmacyRepository {
  findMany(page: number): Promise<Pharmacy[]>
  findById(id: string): Promise<Pharmacy | null>
  create(data: Prisma.PharmacyCreateInput): Promise<Pharmacy>
  searchMany(query: string, page: number): Promise<Pharmacy[]>
  findManyNearby(params: FindManyNearbyProps): Promise<Pharmacy[]>
}
