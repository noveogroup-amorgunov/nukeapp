import { rest } from 'msw'
import { env, parseTokenFromRequest, verifyAccessToken } from '@/shared/lib'

export const userHandlers = [
  rest.get(`${env.VITE_API_ENDPOINT}/me`, async (req, res, ctx) => {
    try {
      const payload = await verifyAccessToken(parseTokenFromRequest(req))

      return await res(
        ctx.delay(env.VITE_API_DELAY),
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
]
