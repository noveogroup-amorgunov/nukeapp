import { delay, http, HttpResponse } from 'msw'
import { env } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'
import type { CategoryWithProductsDto } from '../types'

// Emulate sortBy product's feature
const productSortByCompareFunctionMap: Record<
  string,
  (productA: { price: number }, productB: { price: number }) => number
> = {
  Featured: () => 1,
  Newest: () => -1,
  PriceHighLow: (pA, pB) => pB.price - pA.price,
  PriceLowHigh: (pA, pB) => pA.price - pB.price,
} as const

export const categoriesHandlers = [
  http.get(`${env.VITE_API_ENDPOINT}/categories/popular`, async () => {
    const categories = __serverDatabase.category.findMany({
      where: { popular: { equals: true } },
    })

    await delay(env.VITE_API_DELAY)

    return HttpResponse.json(categories, { status: 200 })
  }),

  http.get(`${env.VITE_API_ENDPOINT}/categories/:id`, async ({ request, params }) => {
    const { id } = params
    const url = new URL(request.url)
    const sortBy = url.searchParams.get('sortBy')
    const apiDelay = url.searchParams.get('delay')

    const maybeCategory = __serverDatabase.category.findFirst({
      where: { id: { equals: Number(id) } },
    })

    if (!maybeCategory) {
      await delay(Number(apiDelay) || env.VITE_API_DELAY)
      return HttpResponse.json('Not found', { status: 404 })
    }

    const categoryDto: CategoryWithProductsDto = {
      ...maybeCategory,
      products: [],
    }

    categoryDto.products = __serverDatabase.product.findMany({
      where: { categoryId: { equals: maybeCategory.id } },
    })

    if (sortBy) {
      categoryDto.products = categoryDto.products.sort(
        productSortByCompareFunctionMap[sortBy],
      )
    }

    await delay(Number(apiDelay) || env.VITE_API_DELAY)
    return HttpResponse.json(categoryDto, { status: 200 })
  }),
]
