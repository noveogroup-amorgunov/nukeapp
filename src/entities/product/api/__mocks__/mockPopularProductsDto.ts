import { type ProductDto } from '../types'
import products from './products.json'

export function mockPopularProductsDto() {
  return products.filter((product) => product.popular) as ProductDto[]
}
