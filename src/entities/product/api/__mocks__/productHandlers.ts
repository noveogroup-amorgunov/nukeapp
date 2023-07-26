import { rest } from 'msw'
import { config } from '@/shared/lib'
import {
  type ProductDatabaseModel,
  __serverDatabase,
} from '@/shared/lib/server'
import { type ProductDetailsDto, type ProductDto } from '../types'

function mockProductDto(product: ProductDatabaseModel): ProductDto {
  return {
    id: product.id,
    name: product.name,
    badge: product.badge,
    subtitle: product.subtitle,
    discountPrice: product.discountPrice,
    price: product.price,
    imageUrl: product.imageUrl,
  }
}

function mockProductDetailsDto(
  product: ProductDatabaseModel
): ProductDetailsDto {
  return {
    id: product.id,
    name: product.name,
    badge: product.badge,
    subtitle: product.subtitle,
    discountPrice: product.discountPrice,
    price: product.price,
    imageUrl: product.imageUrl,
    detailsImageUrl: product.detailsImageUrl ?? [],
    description: product.description ?? '',
  }
}

export const productsHandlers = [
  rest.get(`${config.API_ENDPOINT}/products/popular`, async (_, res, ctx) => {
    const products = __serverDatabase.product.findMany({
      where: { popular: { equals: true } },
    })

    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(200),
      ctx.json(products.map(mockProductDto))
    )
  }),
  rest.get(`${config.API_ENDPOINT}/products/:id`, async (req, res, ctx) => {
    const { id } = req.params

    const maybeProduct = __serverDatabase.product.findFirst({
      where: { id: { equals: Number(id) } },
    })

    if (!maybeProduct)
      return await res(
        ctx.delay(config.API_DELAY),
        ctx.status(404),
        ctx.json('Not found')
      )

    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(200),
      ctx.json(mockProductDetailsDto(maybeProduct))
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
      ctx.json(products.map(mockProductDto))
    )
  }),
]
