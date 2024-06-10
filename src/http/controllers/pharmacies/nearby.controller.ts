import { makeFetchNearbyPharmaciesUseCase } from '@/factories/pharmacies/make-fetch-nearby-pharmacies-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyPharmaciesQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyPharmaciesQuerySchema.parse(
    request.body,
  )

  const PharmacyUseCase = makeFetchNearbyPharmaciesUseCase()

  const { pharmacies } = await PharmacyUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({ pharmacies })
}
