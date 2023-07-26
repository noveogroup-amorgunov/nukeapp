import {
  type ProductDatabaseModel,
  type CategoryDatabaseModel,
} from '@/shared/lib/server'
import { type CategoryWithProductsDto } from '../types'

export function mockCategoryWithProductsDto(
  category: CategoryDatabaseModel,
  products: ProductDatabaseModel[]
): CategoryWithProductsDto {
  return {
    id: category.id,
    name: category.name,
    imageUrl: category.imageUrl,
    products: products.map((product) => ({
      id: product.id,
      name: product.name,
      badge: product.badge,
      subtitle: product.subtitle,
      discountPrice: product.discountPrice,
      price: product.price,
      imageUrl: product.imageUrl,
    })),
  }
}
