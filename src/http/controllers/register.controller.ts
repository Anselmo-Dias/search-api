import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists.error'
import { RegisterUseCase } from '@/services/resgister'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const resgiterBodySchema = z.object({
    name: z.string(),
    email: z.string().email().endsWith('@eurofarma.com'),
    password: z.string().min(6),
  })

  const { name, email, password } = resgiterBodySchema.parse(req.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send({ message: 'User created successfully' })
}
