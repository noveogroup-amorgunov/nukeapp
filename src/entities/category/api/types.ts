import { z } from 'zod'
import { productDtoSchema } from '@/entities/product/@x/category'

export const categoryDtoSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  imageUrl: z.array(z.string()),
})

export type CategoryDto = z.infer<typeof categoryDtoSchema>

export const categoryWithProductsDtoSchema = categoryDtoSchema.extend({
  products: z.array(productDtoSchema),
})

export type CategoryWithProductsDto = z.infer<
  typeof categoryWithProductsDtoSchema
>

export type CategoryDetailsRequestArgs = {
  categoryId: number
  sortBy?: string
}
