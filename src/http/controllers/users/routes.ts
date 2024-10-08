import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { authenticate } from './authenticate.controller'
import { profile } from './profile.controller'
import { verifyJwt } from '@/middleware/verify-jwt'
import { refresh } from './refresh.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/session', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
