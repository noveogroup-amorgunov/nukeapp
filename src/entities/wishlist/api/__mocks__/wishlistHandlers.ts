import { rest } from 'msw'
import { config, parseTokenFromRequest, verifyAccessToken } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const wishlistHandlers = [
  rest.get(
    `${config.API_ENDPOINT}/wishlist/products`,
    async (req, res, ctx) => {
      try {
        const { userId } = await verifyAccessToken(parseTokenFromRequest(req))

        const maybeWishlist = __serverDatabase.wishlist.findFirst({
          where: {
            user: {
              id: { equals: userId },
            },
          },
        })

        const products = __serverDatabase.product.findMany({
          where: {
            id: { in: maybeWishlist?.productIds ?? [] },
          },
        })

        return await res(
          ctx.delay(config.API_DELAY),
          ctx.status(200),
          ctx.json(products)
        )
      } catch (err) {
        return await res(ctx.status(403), ctx.json('Forbidden'))
      }
    }
  ),

  rest.patch(
    `${config.API_ENDPOINT}/wishlist/products`,
    async (req, res, ctx) => {
      try {
        const { userId } = await verifyAccessToken(parseTokenFromRequest(req))

        const apiDelay = req.url.searchParams.get('delay')
        const body = await req.json()

        __serverDatabase.wishlist.update({
          where: {
            user: {
              id: { equals: userId },
            },
          },
          data: {
            productIds: body,
          },
        })

        return await res(
          ctx.delay(Number(apiDelay) || config.API_DELAY),
          ctx.status(200),
          ctx.json({})
        )
      } catch (err) {
        return await res(ctx.status(403), ctx.json('Forbidden'))
      }
    }
  ),
]
