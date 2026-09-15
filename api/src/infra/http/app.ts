import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import { authGoogleRoute } from '@routes/auth-google.ts'
import fastifyApiReference from '@scalar/fastify-api-reference'
import Fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

export const app = Fastify({
  logger: true,
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

app.register(cors, {
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
})

app.register(authGoogleRoute)

app.get('/', (_request, reply) => reply.send({ message: 'OAuth2 API Flow' }))
