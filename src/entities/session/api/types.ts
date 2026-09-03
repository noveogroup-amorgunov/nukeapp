import { z } from 'zod'

export const sessionDtoSchema = z.object({
  accessToken: z.string().min(1),
  user: z.object({
    email: z.email(),
    id: z.number().positive(),
  }),
})

export type SessionDto = z.infer<typeof sessionDtoSchema>

export type RequestLoginBody = {
  email: string
  password: string
}
