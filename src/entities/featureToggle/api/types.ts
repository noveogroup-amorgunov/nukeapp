import { z } from 'zod'

export const featureToggleDtoSchema = z.object({
  canTurnDarkMode: z.boolean().optional(),
  canSortProducts: z.boolean().optional(),
})

export type FeatureToggleDto = z.infer<typeof featureToggleDtoSchema>
