import { rest } from 'msw'
import { config } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const productsHandlers = [
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
  rest.get(`${config.API_ENDPOINT}/products/:id`, async (req, res, ctx) => {
    const { id } = req.params

    const maybeProduct = __serverDatabase.product.findFirst({
      where: { id: { equals: Number(id) } },
    })

    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(maybeProduct ? 200 : 404),
      ctx.json(maybeProduct ?? 'Not found')
    )
  }),
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
