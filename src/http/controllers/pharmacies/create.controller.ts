import { makeCreatePharmacyUseCase } from '@/factories/pharmacies/make-create-pharmacy'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    brand: z.string(),
    presentation: z.string(),
    flag: z.string(),
    city: z.string(),
    pvd: z.string(),
    brick: z.string(),
    cep: z.string(),
    cnpj: z.number(),
    address: z.string(),
    state: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const pharmacyData = createBodySchema.parse(request.body)

  const createPharmacyUseCase = makeCreatePharmacyUseCase()

  const { pharmacy } = await createPharmacyUseCase.execute(pharmacyData)

  return reply.status(201).send({ pharmacy })
}
