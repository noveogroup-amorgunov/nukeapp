import type { ProductDto } from '@/entities/product/@x/category'

export type CategoryDto = {
  id: number
  name: string
  imageUrl: string[]
}

export type CategoryWithProductsDto = CategoryDto & {
  products: ProductDto[]
}
