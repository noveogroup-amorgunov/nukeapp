import { rest } from 'msw'
import { config, jwt } from '@/shared/lib'

const MOCKED_USER_ID = 1

export const sessionHandlers = [
  rest.get(`${config.API_ENDPOINT}/me`, async (req, res, ctx) => {
    try {
      const payload = await jwt.verifyAccessToken(
        jwt.parseTokenFromRequest(req)
      )

      return await res(
        ctx.delay(config.API_DELAY),
        ctx.status(200),
        ctx.json({
          id: payload.userId,
          email: payload.email,
        })
      )
    } catch (err) {
      return await res(
        ctx.status(401),
        ctx.json('Token is expired or not valid')
      )
    }
  }),

  rest.post(`${config.API_ENDPOINT}/login`, async (req, res, ctx) => {
    const body = await req.json()
    const { email, password } = body

    if (
      email !== config.API_USER_EMAIL ||
      password !== config.API_USER_PASSWORD
    ) {
      return await res(ctx.status(400), ctx.json('Wrong email or password'))
    }

    const accessToken = await jwt.signAccessToken({
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
