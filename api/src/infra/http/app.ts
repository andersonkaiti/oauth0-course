import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import { authGoogleRoute } from '@routes/auth-google.ts'
import { meRoute } from '@routes/me.ts'
import fastifyApiReference from '@scalar/fastify-api-reference'
import { env } from '@shared/env.ts'
import Fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

export const app = Fastify({
  logger: {
    level: 'error',
  },
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'OAuth2 Flow API',
      version: '0.1.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifyApiReference, {
  routePrefix: '/docs',
  configuration: {
    theme: 'kepler',
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d',
  },
})

app.register(cors, {
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
})

app.register(authGoogleRoute)
app.register(meRoute)

app.get('/', (_request, reply) => reply.send({ message: 'OAuth2 API Flow' }))
