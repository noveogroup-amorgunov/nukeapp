import type { WishlistDto } from '../api/types'
import { mapProduct } from '@/entities/product/@x/wishlist'
import type { Product } from '@/entities/product/@x/wishlist'

export function mapWishlist(dto: WishlistDto): Product[] {
  return dto.map(product => mapProduct(product))
}
