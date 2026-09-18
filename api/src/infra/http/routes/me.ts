import { authMiddleware } from '@middlewares/auth.middleware.ts'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeMe } from '../factories/me.factory.ts'

export function meRoute(app: FastifyInstance) {
  app.addHook('preHandler', authMiddleware)

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/me',
    schema: {
      response: {
        200: z.object({
          id: z.string(),
          first_name: z.string(),
          last_name: z.string().nullable(),
          avatar: z.string().nullable(),
          email: z.string(),
          google_id: z.string().nullable().optional(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { sub: id } = request.user

      const meUseCase = makeMe()

      const user = await meUseCase.execute(id)

      reply.status(200).send(user)
    },
  })
}
