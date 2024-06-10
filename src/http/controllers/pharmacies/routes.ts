import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/middleware/verify-jwt'

import { search } from './search.controller'
import { nearby } from './nearby.controller'
import { create } from './create.controller'
import { verifyUserRole } from '@/middleware/verify-user-role'

export async function pharmaciesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/pharmacies/search', search)
  app.get('/pharmacies/nearby', nearby)

  app.post('/pharmacies', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
