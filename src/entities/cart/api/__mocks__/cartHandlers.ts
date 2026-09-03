import { delay, http, HttpResponse } from 'msw'
import { env, parseTokenFromRequest, verifyAccessToken } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'
import type { CartItemDto } from '../types'
import { mockCartDto } from './mockCartDto'

export const cartHandlers = [
  http.get(`${env.VITE_API_ENDPOINT}/cart`, async ({ request }) => {
    try {
      const { userId } = await verifyAccessToken(parseTokenFromRequest(request))

      const maybeCart = __serverDatabase.cart.findFirst(q =>
        q.where({ user: { id: userId } }),
      )

      if (!maybeCart) {
        return HttpResponse.json('Bad request', { status: 400 })
      }

      const productIds = maybeCart.itemsProductId
      const products = __serverDatabase.product.findMany(q =>
        q.where({ id: id => productIds.includes(id) }),
      )

      await delay(env.VITE_API_DELAY)

      return HttpResponse.json(mockCartDto(maybeCart, products), { status: 200 })
    }
    catch {
      return HttpResponse.json('Forbidden', { status: 403 })
    }
  }),

  http.patch<object, { version: number, items: CartItemDto[] }>(`${env.VITE_API_ENDPOINT}/cart`, async ({ request }) => {
    try {
      const { userId } = await verifyAccessToken(parseTokenFromRequest(request))
      const url = new URL(request.url)

      // TODO: add validation
      const apiDelay = url.searchParams.get('delay')
      const body = await request.json()

      await __serverDatabase.cart.update(
        q => q.where({ user: { id: userId } }),
        {
          data(cart) {
            cart.version = body.version
            cart.itemsProductQuantity = body.items.map(
              (item: CartItemDto) => item.quantity,
            )
            cart.itemsProductId = body.items.map(
              (item: CartItemDto) => item.productId,
            )
          },
        },
      )

      await delay(Number(apiDelay) || env.VITE_API_DELAY)

      return HttpResponse.json({}, { status: 200 })
    }
    catch {
      return HttpResponse.json('Forbidden', { status: 403 })
    }
  }),
]
