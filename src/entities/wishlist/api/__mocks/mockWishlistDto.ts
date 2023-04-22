import products from '@/entities/product/api/__mocks__/products.json'
import { type WishlistDto } from '../types'

export function mockWishlistDto(productIds: number[]): WishlistDto {
  const productIdsSet = new Set(productIds)

  return products.filter((product) => productIdsSet.has(product.id))
}
