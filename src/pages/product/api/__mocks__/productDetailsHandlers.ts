import { delay, http, HttpResponse } from 'msw'
import { env } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const productDetailsHandlers = [
  http.get(`${env.VITE_API_ENDPOINT}/products/:id`, async ({ params }) => {
    const { id } = params

    const maybeProduct = __serverDatabase.product.findFirst({
      where: { id: { equals: Number(id) } },
    })

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(
      maybeProduct ?? 'Not found',
      { status: maybeProduct ? 200 : 404 },
    )
  }),
]
