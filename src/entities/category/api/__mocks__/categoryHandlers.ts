import { rest } from 'msw'
import { config } from '@/shared/lib'
import { mockCategoryDtoById } from './mockCategoryDtoById'
import { mockPopularCategoriesDto } from './mockPopularCategoriesDto'

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
    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(200),
      ctx.json(mockPopularCategoriesDto())
    )
  }),

  rest.get(`${config.API_ENDPOINT}/categories/:id`, async (req, res, ctx) => {
    const { id } = req.params
    const sortBy = req.url.searchParams.get('sortBy')
    const apiDelay = req.url.searchParams.get('delay')

    const categoryDto = mockCategoryDtoById(Number(id))

    if (!categoryDto) {
      return await res(
        ctx.delay(Number(apiDelay) || config.API_DELAY),
        ctx.status(404),
        ctx.json('Not found')
      )
    }

    if (sortBy) {
      categoryDto.products = categoryDto.products.sort(
        productSortByCompareFunctionMap[sortBy]
      )
    }

    return await res(
      ctx.delay(Number(apiDelay) || config.API_DELAY),
      ctx.status(200),
      ctx.json(categoryDto)
    )
  }),
]
