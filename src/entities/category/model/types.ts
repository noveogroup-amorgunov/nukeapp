import type { Product } from '@/entities/product/@x/category'

export type CategoryId = Brand<Id, 'CategoryId'>

export type Category = {
  id: CategoryId
  name: string
  image: Url
}

export type CategoryWithProducts = Category & {
  products: Product[]
}
