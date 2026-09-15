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
    },
    handler: async (request, reply) => {
      const { code } = request.body

      console.log({ code })

      reply.status(200).send()
    },
  })
}
