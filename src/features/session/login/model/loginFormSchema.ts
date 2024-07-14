import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  password: z
    .string()
    .min(6, { message: 'Password must be atleast 6 characters' }),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
