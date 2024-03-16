import { rest } from 'msw'
import { config } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const widgetProductPopularListHandlers = [
  rest.get(`${config.API_ENDPOINT}/products/popular`, async (_, res, ctx) => {
    const products = __serverDatabase.product.findMany({
      where: { popular: { equals: true } },
    })

    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(200),
      ctx.json(products)
    )
  }),
]
