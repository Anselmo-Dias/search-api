import { makeGetUserProfileUseCase } from '@/factories/users/make-get-user-profile-use-case'
import { ResourceNotFoundError } from '@/services/errors/resource-not-exists-error'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { sub: userId } = request.user

    const getUserProfileUsecase = makeGetUserProfileUseCase()

    const { user } = await getUserProfileUsecase.execute({ userId })

    // eslint-disable-next-line
    const { password, ...userData } = user

    reply.status(200).send({ user: userData })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
