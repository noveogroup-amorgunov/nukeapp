import { type WishlistDto } from '../types'
import products from '@/entities/product/api/__mocks__/products.json'

export function mockWishlistDto(productIds: number[]): WishlistDto {
  const productIdsSet = new Set(productIds)

  return products.filter((product) => productIdsSet.has(product.id))
}
