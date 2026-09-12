import { mapProduct } from '@/entities/product/@x/wishlist'
import type { Product } from '@/entities/product/@x/wishlist'
import type { Product as ProductDto } from '@/shared/api'

export function mapWishlist(dto: ProductDto[]): Product[] {
  return dto.map(product => mapProduct(product))
}
