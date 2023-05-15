import { rest } from 'msw'
import { z } from 'zod'
import { config } from '@/shared/lib'
import { mockFeatureToggleDto } from './mockFeatureToggleDto'

/**
 * Use enum+transform validation, coz can't use coerce.boolean for string
 * @see https://github.com/colinhacks/zod/issues/1630
 */
const featureSchema = z
  .enum(['1', '0'])
  .transform((value) => value === '1')
  .optional()

const featureToggleQuerySchema = z.object({
  canSortProducts: featureSchema,
  canTurnDarkMode: featureSchema,
})

export const featureToggleHandlers = [
  rest.get(`${config.API_ENDPOINT}/feature-toggle`, async (req, res, ctx) => {
    try {
      const params = Object.fromEntries(req.url.searchParams.entries())
      const query = featureToggleQuerySchema.parse(params)

      return await res(
        ctx.delay(config.API_DELAY),
        ctx.status(200),
        ctx.json(mockFeatureToggleDto(query))
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
