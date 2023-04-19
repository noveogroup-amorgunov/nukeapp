import { rest } from 'msw'
import { mockPopularProductsDto } from './mockPopularProductsDto'
import { mockProductDtoByIds } from './mockProductDtoByIds'
import { config } from '@/shared/lib/config'

export const productsHandlers = [
  rest.get(`${config.API_ENDPOINT}/products/popular`, async (_, res, ctx) => {
    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(200),
      ctx.json(mockPopularProductsDto())
    )
  }),
  rest.get(`${config.API_ENDPOINT}/products`, async (req, res, ctx) => {
    const productIds = req.url.searchParams.getAll('id')
    const products = mockProductDtoByIds(productIds.map(Number))

    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(200),
      ctx.json(products)
    )
  }),
]
