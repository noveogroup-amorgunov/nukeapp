import type { ProductDto } from '@/shared/api'

export type CategoryDto = {
  id: number
  name: string
  imageUrl: string[]
}

export type CategoryWithProductsDto = CategoryDto & {
  products: ProductDto[]
}

export type CategoryDetailsRequestArgs = {
  categoryId: number
  sortBy?: string
}
