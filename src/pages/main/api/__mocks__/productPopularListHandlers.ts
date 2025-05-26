import { HttpResponse, delay, http } from 'msw'
import { env } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const productPopularListHandlers = [
  http.get(`${env.VITE_API_ENDPOINT}/products/popular`, async () => {
    const products = __serverDatabase.product.findMany({
      where: { popular: { equals: true } },
    })

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(
      products,
      { status: 200 },
    )
  }),
]
