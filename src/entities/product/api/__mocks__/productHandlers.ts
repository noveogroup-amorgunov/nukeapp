import { rest } from 'msw'
import { config } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const productsHandlers = [
  rest.get(`${config.API_ENDPOINT}/products`, async (req, res, ctx) => {
    const productIds = req.url.searchParams.getAll('id')
    const products = __serverDatabase.product.findMany({
      where: { id: { in: productIds.map(Number) } },
    })

    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(200),
      ctx.json(products)
    )
  }),
]
