import { z } from 'zod'
import { productDtoSchema } from '@/entities/product'

export const productDetailsDtoSchema = productDtoSchema.extend({
  detailsImageUrl: z.array(z.string()),
  description: z.string(),
})

export type ProductDetailsDto = z.infer<typeof productDetailsDtoSchema>
