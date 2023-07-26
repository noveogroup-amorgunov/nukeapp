import { type ProductDatabaseModel } from '@/shared/lib/server'
import { type WishlistDto } from '../types'

export function mockWishlistDto(products: ProductDatabaseModel[]): WishlistDto {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    badge: product.badge,
    subtitle: product.subtitle,
    discountPrice: product.discountPrice,
    price: product.price,
    imageUrl: product.imageUrl,
  }))
}
