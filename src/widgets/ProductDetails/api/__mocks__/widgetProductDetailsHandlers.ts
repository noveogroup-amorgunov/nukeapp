import { rest } from 'msw'
import { config } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const widgetProductDetailsHandlers = [
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
]
