import { z } from 'zod'

/**
 * ✅ DX Best practice (Type safe)
 *
 * Validate env variables with zod
 */
const envVariables = z.object({
  VITE_API_ENDPOINT: z.string().url(),
  VITE_API_DELAY: z.coerce.number().positive().optional(),
  VITE_API_USER_EMAIL: z.string().min(1).email(),
  VITE_API_USER_PASSWORD: z.string().min(6),
  VITE_JWT_SECRET: z.string().min(1),
})

const parsedEnv = envVariables.parse(import.meta.env)

export const config = {
  API_ENDPOINT: parsedEnv.VITE_API_ENDPOINT,
  API_DELAY: parsedEnv.VITE_API_DELAY ?? 100,
  API_USER_EMAIL: parsedEnv.VITE_API_USER_EMAIL,
  API_USER_PASSWORD: parsedEnv.VITE_API_USER_PASSWORD,
  JWT_SECRET: parsedEnv.VITE_JWT_SECRET,
} as const
