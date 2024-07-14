import { HttpResponse, delay, http } from 'msw'
import { env, parseTokenFromRequest, verifyAccessToken } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'
import type { CartItemDto } from '../types'
import { mockCartDto } from './mockCartDto'

export const cartHandlers = [
  http.get(`${env.VITE_API_ENDPOINT}/cart`, async ({ request }) => {
    try {
      const { userId } = await verifyAccessToken(parseTokenFromRequest(request))

      const maybeCart = __serverDatabase.cart.findFirst({
        where: {
          user: {
            id: { equals: userId },
          },
        },
      })

      if (!maybeCart) {
        return HttpResponse.json('Bad request', { status: 400 })
      }

      const products = __serverDatabase.product.findMany({
        where: {
          id: { in: maybeCart.itemsProductId ?? [] },
        },
      })

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

      __serverDatabase.cart.update({
        where: {
          user: {
            id: { equals: userId },
          },
        },
        data: {
          version: body.version,
          itemsProductQuantity: body.items.map(
            (item: CartItemDto) => item.quantity,
          ),
          itemsProductId: body.items.map((item: CartItemDto) => item.productId),
        },
      })

      await delay(Number(apiDelay) || env.VITE_API_DELAY)

      return HttpResponse.json({}, { status: 200 })
    }
    catch {
      return HttpResponse.json('Forbidden', { status: 403 })
    }
  }),
]
