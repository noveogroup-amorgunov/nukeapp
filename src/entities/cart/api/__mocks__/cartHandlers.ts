import { rest } from 'msw'
import { env, parseTokenFromRequest, verifyAccessToken } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'
import type { CartItemDto } from '../types'
import { mockCartDto } from './mockCartDto'

export const cartHandlers = [
  rest.get(`${env.VITE_API_ENDPOINT}/cart`, async (req, res, ctx) => {
    try {
      const { userId } = await verifyAccessToken(parseTokenFromRequest(req))

      const maybeCart = __serverDatabase.cart.findFirst({
        where: {
          user: {
            id: { equals: userId },
          },
        },
      })

      if (!maybeCart) {
        return await res(ctx.status(400), ctx.json('Bad request'))
      }

      const products = __serverDatabase.product.findMany({
        where: {
          id: { in: maybeCart.itemsProductId ?? [] },
        },
      })

      return await res(
        ctx.delay(env.VITE_API_DELAY),
        ctx.status(200),
        ctx.json(mockCartDto(maybeCart, products))
      )
    } catch (err) {
      return await res(ctx.status(403), ctx.json('Forbidden'))
    }
  }),

  rest.patch(`${env.VITE_API_ENDPOINT}/cart`, async (req, res, ctx) => {
    try {
      const { userId } = await verifyAccessToken(parseTokenFromRequest(req))

      // TODO: add validation
      const apiDelay = req.url.searchParams.get('delay')
      const body = await req.json()

      __serverDatabase.cart.update({
        where: {
          user: {
            id: { equals: userId },
          },
        },
        data: {
          version: body.version,
          itemsProductQuantity: body.items.map(
            (item: CartItemDto) => item.quantity
          ),
          itemsProductId: body.items.map((item: CartItemDto) => item.productId),
        },
      })

      return await res(
        ctx.delay(Number(apiDelay) || env.VITE_API_DELAY),
        ctx.status(200),
        ctx.json({})
      )
    } catch (err) {
      return await res(ctx.status(403), ctx.json('Forbidden'))
    }
  }),
]
