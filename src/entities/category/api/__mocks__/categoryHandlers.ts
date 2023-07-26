import { rest } from 'msw'
import { config } from '@/shared/lib'
import {
  type ProductDatabaseModel,
  __serverDatabase,
} from '@/shared/lib/server'
import { mockCategoryDto } from './mockCategoryDto'
import { mockCategoryWithProductsDto } from './mockCategoryWithProductsDto'

// Emulate sortBy product's feature
const productSortByCompareFunctionMap: Record<
  string,
  (productA: { price: number }, productB: { price: number }) => number
> = {
  Featured: (pA, pB) => 1,
  Newest: (pA, pB) => -1,
  PriceHighLow: (pA, pB) => pB.price - pA.price,
  PriceLowHigh: (pA, pB) => pA.price - pB.price,
} as const

export const categoriesHandlers = [
  rest.get(`${config.API_ENDPOINT}/categories/popular`, async (_, res, ctx) => {
    const categories = __serverDatabase.category.findMany({
      where: { popular: { equals: true } },
    })

    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(200),
      ctx.json(mockCategoryDto(categories))
    )
  }),

  rest.get(`${config.API_ENDPOINT}/categories/:id`, async (req, res, ctx) => {
    const { id } = req.params
    const sortBy = req.url.searchParams.get('sortBy')
    const apiDelay = req.url.searchParams.get('delay')

    const maybeCategory = __serverDatabase.category.findFirst({
      where: { id: { equals: Number(id) } },
    })

    if (!maybeCategory) {
      return await res(
        ctx.delay(Number(apiDelay) || config.API_DELAY),
        ctx.status(404),
        ctx.json('Not found')
      )
    }

    let maybeProducts: ProductDatabaseModel[] = []

    maybeProducts = __serverDatabase.product.findMany({
      where: { categoryId: { equals: maybeCategory.id } },
    })

    if (sortBy) {
      maybeProducts = maybeProducts.sort(
        productSortByCompareFunctionMap[sortBy]
      )
    }
    const categoryWithProductsDto = mockCategoryWithProductsDto(
      maybeCategory,
      maybeProducts
    )

    return await res(
      ctx.delay(Number(apiDelay) || config.API_DELAY),
      ctx.status(200),
      ctx.json(categoryWithProductsDto)
    )
  }),
]
