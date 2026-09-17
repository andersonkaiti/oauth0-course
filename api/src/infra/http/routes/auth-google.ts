import { makeGoogleAuth } from '@factories/google-auth.factory.ts'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export function authGoogleRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/auth/google',
    schema: {
      body: z.object({
        code: z.string().min(1),
      }),
      response: {
        200: z.object({
          accessToken: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { code } = request.body

      const authGoogleUseCase = makeGoogleAuth()

      const user = await authGoogleUseCase.execute({ code })

      const accessToken = await reply.jwtSign({
        sub: user.id,
      })

      reply.status(200).send({
        accessToken,
      })
    },
  })
}
