import { FastifyRequest, FastifyReply } from 'fastify'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const { role } = request.user

    if (role !== roleToVerify) {
      console.log(role)
      return reply.status(401).send({ message: 'unauthorized' })
    }
  }
}
