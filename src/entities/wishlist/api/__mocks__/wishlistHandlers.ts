import { delay, http, HttpResponse } from 'msw'
import { env, parseTokenFromRequest, verifyAccessToken } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const wishlistHandlers = [
  http.get(
    `${env.VITE_API_ENDPOINT}/wishlist/products`,
    async ({ request }) => {
      try {
        const { userId } = await verifyAccessToken(parseTokenFromRequest(request))

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

        await delay(env.VITE_API_DELAY)
        return HttpResponse.json(products, { status: 200 })
      }
      catch {
        await delay(env.VITE_API_DELAY)
        return HttpResponse.json('Forbidden', { status: 403 })
      }
    },
  ),

  http.patch<object, number[]>(
    `${env.VITE_API_ENDPOINT}/wishlist/products`,
    async ({ request }) => {
      try {
        const { userId } = await verifyAccessToken(parseTokenFromRequest(request))
        const url = new URL(request.url)

        const apiDelay = url.searchParams.get('delay')
        const body = await request.json()

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

        await delay(Number(apiDelay) || env.VITE_API_DELAY)
        return HttpResponse.json({}, { status: 200 })
      }
      catch {
        await delay(env.VITE_API_DELAY)
        return HttpResponse.json('Forbidden', { status: 403 })
      }
    },
  ),
]
