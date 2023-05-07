import { type ProductDetailsDto } from '../types'
import products from './products.json'

export function mockProductDetailsDto(id: number) {
  return products.find(
    (product) => product.id === id
  ) as ProductDetailsDto | null
}
