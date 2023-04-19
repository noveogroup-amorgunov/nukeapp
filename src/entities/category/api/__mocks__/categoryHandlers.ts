import { rest } from 'msw'
import { mockCategoryDtoById } from './mockCategoryDtoById'
import { mockPopularCategoriesDto } from './mockPopularCategoriesDto'
import { config } from '@/shared/lib/config'

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

    if (!categoryDto) {
      return await res(ctx.status(404), ctx.json('Not found'))
    }

    return await res(
      ctx.delay(config.API_DELAY),
      ctx.status(200),
      ctx.json(categoryDto)
    )
  }),
]
