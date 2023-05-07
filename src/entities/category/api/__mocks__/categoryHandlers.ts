import { rest } from 'msw'
import { config } from '@/shared/lib'
import { mockCategoryDtoById } from './mockCategoryDtoById'
import { mockPopularCategoriesDto } from './mockPopularCategoriesDto'

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
    const categoryDto = mockCategoryDtoById(Number(id))

    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(categoryDto ? 200 : 404),
      ctx.json(categoryDto ?? 'Not found')
    )
  }),
]
