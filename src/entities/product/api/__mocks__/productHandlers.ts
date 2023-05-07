import { rest } from 'msw'
import { config } from '@/shared/lib'
import { mockPopularProductsDto } from './mockPopularProductsDto'
import { mockProductDetailsDto } from './mockProductDetailsDto'
import { mockProductDtoByIds } from './mockProductDtoByIds'

export const productsHandlers = [
  rest.get(`${config.API_ENDPOINT}/products/popular`, async (_, res, ctx) => {
    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(200),
      ctx.json(mockPopularProductsDto())
    )
  }),
  rest.get(`${config.API_ENDPOINT}/products/:id`, async (req, res, ctx) => {
    const { id } = req.params
    const productDetailsDto = mockProductDetailsDto(Number(id))

    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(productDetailsDto ? 200 : 404),
      ctx.json(productDetailsDto ?? 'Not found')
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
