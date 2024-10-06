import { makeRegisterUseCase } from '@/factories/users/make-resgister-use-case'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists.error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const resgiterBodySchema = z.object({
    name: z.string(),
    email: z.string().email().endsWith('@gmail.com'),
    password: z.string().min(6),
  })

  const { name, email, password } = resgiterBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send({ message: 'User created successfully' })
}
