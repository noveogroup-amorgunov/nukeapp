import type { WishlistDto } from '../api/types'
import { mapProduct } from '@/entities/product/lib/mapProduct'
import type { Product } from '@/entities/product/model/types'

export function mapWishlist(dto: WishlistDto): Product[] {
  return dto.map((product) => mapProduct(product))
}
