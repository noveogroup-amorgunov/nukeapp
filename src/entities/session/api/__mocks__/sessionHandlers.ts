import { rest } from 'msw'
import { config, signAccessToken } from '@/shared/lib'

const MOCKED_USER_ID = 1

export const sessionHandlers = [
  rest.post(`${config.API_ENDPOINT}/login`, async (req, res, ctx) => {
    const body = await req.json()
    const { email, password } = body

    if (
      email !== config.API_USER_EMAIL ||
      password !== config.API_USER_PASSWORD
    ) {
      return await res(ctx.status(400), ctx.json('Wrong email or password'))
    }

    const accessToken = await signAccessToken({
      userId: MOCKED_USER_ID,
      email,
    })

    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(200),
      ctx.json({
        accessToken,
        user: {
          email,
          id: MOCKED_USER_ID,
        },
      })
    )
  }),
]
