import { rest } from 'msw'
import { env, signAccessToken } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const sessionHandlers = [
  rest.post(`${env.VITE_API_ENDPOINT}/login`, async (req, res, ctx) => {
    const body = await req.json()
    const { email, password } = body

    const maybeUser = __serverDatabase.user.findFirst({
      where: {
        email: { equals: email },
        password: { equals: password },
      },
    })

    if (!maybeUser) {
      return await res(ctx.status(400), ctx.json('Wrong email or password'))
    }

    const accessToken = await signAccessToken({
      userId: maybeUser.id,
      email,
    })

    return await res(
      ctx.delay(env.VITE_API_DELAY),
      ctx.status(200),
      ctx.json({
        accessToken,
        user: {
          email,
          id: maybeUser.id,
        },
      }),
    )
  }),
]
