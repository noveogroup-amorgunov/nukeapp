import { delay, http, HttpResponse } from 'msw'
import { env } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const productsHandlers = [
  http.get('/products', async ({ request }) => {
    const url = new URL(request.url)
    const productIds = url.searchParams.getAll('id').map(Number)
    const products = __serverDatabase.product.findMany(q =>
      q.where({ id: id => productIds.includes(id) }),
    )

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(products, { status: 200 })
  }),

  http.get('/products/popular', async () => {
    const products = __serverDatabase.product.findMany(q =>
      q.where({ popular: true }),
    )

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(products, { status: 200 })
  }),

  http.get('/products/:id', async ({ params }) => {
    const { id } = params

    const maybeProduct = __serverDatabase.product.findFirst(q =>
      q.where({ id: Number(id) }),
    )

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(
      maybeProduct ?? 'Not found',
      { status: maybeProduct ? 200 : 404 },
    )
  }),
]
