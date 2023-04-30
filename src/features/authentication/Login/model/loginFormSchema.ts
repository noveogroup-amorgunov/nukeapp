import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().min(1).email('Should be valid email'),
  password: z.string().min(6, 'Should contains more than 6 letters'),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
