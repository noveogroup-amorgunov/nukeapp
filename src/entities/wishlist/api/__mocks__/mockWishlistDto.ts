import { productsMock } from '@/entities/product/@x/wishlist'
import { type WishlistDto } from '../types'

export function mockWishlistDto(productIds: number[]): WishlistDto {
  const productIdsSet = new Set(productIds)

  return productsMock.filter((product) => productIdsSet.has(product.id))
}
