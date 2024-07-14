import { HttpResponse, delay, http } from 'msw'
import { z } from 'zod'
import { env } from '@/shared/lib'
import { mockFeatureToggleDto } from './mockFeatureToggleDto'

/**
 * Use enum+transform validation,
 * coz can't use coerce.boolean for string
 * @see https://github.com/colinhacks/zod/issues/1630
 */
const featureSchema = z
  .enum(['false', 'true'])
  .transform(value => value === 'true')
  .optional()

const featureToggleQuerySchema = z.object({
  canSortProducts: featureSchema,
  canTurnDarkMode: featureSchema,
})

export const featureToggleHandlers = [
  http.get(`${env.VITE_API_ENDPOINT}/feature-toggle`, async ({ request }) => {
    try {
      const url = new URL(request.url)
      const params = Object.fromEntries(url.searchParams.entries())
      // silent validation
      const query = featureToggleQuerySchema.safeParse(params)

      await delay(env.VITE_API_DELAY)
      return HttpResponse.json(mockFeatureToggleDto(query.success ? query.data : {}), { status: 200 })
    }
    catch (error) {
      console.error(error)

      await delay(env.VITE_API_DELAY)
      return HttpResponse.json('Bad request params', { status: 400 })
    }
  }),
]
