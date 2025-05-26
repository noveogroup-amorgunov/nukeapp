import { mapProduct } from '@/shared/api'
import type { EntitiesDomain } from '@/shared/domain'
import type { WishlistDto } from '../api/types'

export function mapWishlist(dto: WishlistDto): EntitiesDomain['Product'][] {
  return dto.map(product => mapProduct(product))
}
