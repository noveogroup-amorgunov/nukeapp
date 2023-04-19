import type { ProductDto } from '@/entities/product/api/types'

export type CategoryDto = {
  id: number
  name: string
  imageUrl: string[]
}

export type CategoryWithProductsDto = CategoryDto & {
  products: ProductDto[]
}
