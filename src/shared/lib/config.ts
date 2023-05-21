import { z } from 'zod'

/**
 * ✅ DX Best practice (Type safe)
 *
 * Validate env variables with zod
 */
const envVariables = z.object({
  VITE_API_ENDPOINT: z.string().url(),
  VITE_API_STORAGE_MODE: z.enum(['session', 'local']).optional(),
  VITE_API_DELAY: z
    .string()
    .regex(/^\d+$/, { message: 'Must be a positive number' })
    .optional(),
  VITE_API_USER_EMAIL: z.string().min(1).email(),
  VITE_API_USER_PASSWORD: z.string().min(6),
  VITE_JWT_SECRET: z.string().min(1),
})

envVariables.parse(import.meta.env)

declare global {
  interface ImportMetaEnv extends z.infer<typeof envVariables> {}
}

export const config = {
  API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
  API_STORAGE_MODE: import.meta.env.VITE_API_STORAGE_MODE,
  API_DELAY: Number(import.meta.env.VITE_API_DELAY) || 100,
  API_USER_EMAIL: import.meta.env.VITE_API_USER_EMAIL,
  API_USER_PASSWORD: import.meta.env.VITE_API_USER_PASSWORD,
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET,
} as const
