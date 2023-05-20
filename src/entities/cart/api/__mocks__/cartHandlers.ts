import { rest } from 'msw'
import { config, parseTokenFromRequest, verifyAccessToken } from '@/shared/lib'
import { mockCartDto } from './mockCartDto'

const cart = { items: [] }

export const cartHandlers = [
  rest.get(`${config.API_ENDPOINT}/cart`, async (req, res, ctx) => {
    try {
      await verifyAccessToken(parseTokenFromRequest(req))

      return await res(
        ctx.delay(config.API_DELAY),
        ctx.status(200),
        ctx.json(mockCartDto(cart.items))
      )
    } catch (err) {
      return await res(ctx.status(403), ctx.json('Forbidden'))
    }
  }),

  rest.patch(`${config.API_ENDPOINT}/cart`, async (req, res, ctx) => {
    try {
      await verifyAccessToken(parseTokenFromRequest(req))

      const apiDelay = req.url.searchParams.get('delay')
      const body = await req.json()

      // TODO: add validation
      cart.items = body

      return await res(
        ctx.delay(Number(apiDelay) || config.API_DELAY),
        ctx.status(200),
        ctx.json(mockCartDto(cart.items))
      )
    } catch (err) {
      return await res(ctx.status(403), ctx.json('Forbidden'))
    }
  }),
]