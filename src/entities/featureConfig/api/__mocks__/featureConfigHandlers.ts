import { rest } from 'msw'
import { z } from 'zod'
import { config } from '@/shared/lib'
import { mockFeatureConfigDto } from './mockFeatureConfigDto'

/**
 * Use enum+transform validation, coz can't use coerce.boolean for string
 * @see https://github.com/colinhacks/zod/issues/1630
 */
const featureSchema = z
  .enum(['1', '0'])
  .transform((value) => value === '1')
  .optional()

const featureConfigQuerySchema = z.object({
  canSortProducts: featureSchema,
  canTurnDarkMode: featureSchema,
})

export const featureConfigHandlers = [
  rest.get(`${config.API_ENDPOINT}/feature-config`, async (req, res, ctx) => {
    try {
      const params = Object.fromEntries(req.url.searchParams.entries())
      const query = featureConfigQuerySchema.parse(params)

      return await res(
        ctx.delay(config.API_DELAY),
        ctx.status(200),
        ctx.json(mockFeatureConfigDto(query))
      )
    } catch (error) {
      console.error(error)

      return await res(
        ctx.delay(config.API_DELAY),
        ctx.status(400),
        ctx.json('Bad request params')
      )
    }
  }),
]
