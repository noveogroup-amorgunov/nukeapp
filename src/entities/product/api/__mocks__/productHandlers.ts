import { HttpResponse, delay, http } from 'msw'
import { env } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const productsHandlers = [
  http.get(`${env.VITE_API_ENDPOINT}/products`, async ({ request }) => {
    const url = new URL(request.url)
    const productIds = url.searchParams.getAll('id')
    const products = __serverDatabase.product.findMany({
      where: { id: { in: productIds.map(Number) } },
    })

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(products, { status: 200 })
  }),
]
