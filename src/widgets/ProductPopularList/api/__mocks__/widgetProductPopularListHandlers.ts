import { rest } from 'msw'
import { env } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const widgetProductPopularListHandlers = [
  rest.get(`${env.VITE_API_ENDPOINT}/products/popular`, async (_, res, ctx) => {
    const products = __serverDatabase.product.findMany({
      where: { popular: { equals: true } },
    })

    return await res(
      ctx.delay(env.VITE_API_DELAY),
      ctx.status(200),
      ctx.json(products)
    )
  }),
]
