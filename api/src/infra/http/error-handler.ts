import { Unauthorized } from '@errors/unauthorized.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'

export function errorHandler(
  error: Error,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply.status(401).send({
      error: z.treeifyError(error),
    })
  }

  if (error instanceof Unauthorized) {
    return reply.status(401).send({
      error: error.message,
    })
  }

  return reply.status(500).send({
    error: 'Internal server error',
  })
}
