import { z } from 'zod'

export const userDtoSchema = z.object({
  id: z.number().positive(),
  email: z.email(),
})

export type UserDto = z.infer<typeof userDtoSchema>
