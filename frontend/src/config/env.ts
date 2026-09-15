import { z } from 'zod'

const envSchema = z.object({
  VITE_GOOGLE_CLIENT_ID: z.string(),
  VITE_GOOGLE_CALLBACK_URL: z.url(),
  VITE_API_URL: z.url(),
})

export const env = envSchema.parse(import.meta.env)
