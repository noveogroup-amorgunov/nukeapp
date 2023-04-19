import { rest } from 'msw'
import { mockWishlistDto } from './mockWishlistDto'
import { config } from '@/shared/lib/config'
import { parseTokenFromRequest, verifyAccessToken } from '@/shared/lib/jwt'

let wishlistProductIdsStorage: Id[] = [3, 4, 5, 6, 7]

export const wishlistHandlers = [
  rest.get(
    `${config.API_ENDPOINT}/products/wishlist`,
    async (req, res, ctx) => {
      try {
        await verifyAccessToken(parseTokenFromRequest(req))

        return await res(
          ctx.delay(config.API_DELAY),
          ctx.status(200),
          ctx.json(mockWishlistDto(wishlistProductIdsStorage))
        )
      } catch (err) {
        return await res(ctx.status(403), ctx.json('Forbidden'))
      }
    }
  ),

  rest.patch(
    `${config.API_ENDPOINT}/products/wishlist`,
    async (req, res, ctx) => {
      try {
        await verifyAccessToken(parseTokenFromRequest(req))

        const body = await req.json()

        wishlistProductIdsStorage = body

        return await res(
          ctx.delay(config.API_DELAY),
          ctx.status(200),
          ctx.json({})
        )
      } catch (err) {
        return await res(ctx.status(403), ctx.json('Forbidden'))
      }
    }
  ),
]
