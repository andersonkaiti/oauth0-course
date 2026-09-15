import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.url(),
})

export const env = envSchema.parse(process.env)
