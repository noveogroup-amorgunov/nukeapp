import products from './products.json'
import { type ProductDto } from '../types'

export function mockPopularProductsDto() {
  return products.filter((product) => product.popular) as ProductDto[]
}
