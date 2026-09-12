import { delay, http, HttpResponse } from 'msw'
import { env, parseTokenFromRequest, verifyAccessToken } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const wishlistHandlers = [
  http.get(
    `${env.VITE_API_ENDPOINT}/wishlist/products`,
    async ({ request }) => {
      try {
        const { userId } = await verifyAccessToken(parseTokenFromRequest(request))

        const maybeWishlist = __serverDatabase.wishlist.findFirst(q =>
          q.where({ user: { id: userId } }),
        )

        const wishlistProductIds = maybeWishlist?.productIds ?? []
        const products = __serverDatabase.product.findMany(q =>
          q.where({ id: id => wishlistProductIds.includes(id) }),
        )

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

        await __serverDatabase.wishlist.update(
          q => q.where({ user: { id: userId } }),
          {
            data(wishlist) {
              wishlist.productIds = body
            },
          },
        )

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
