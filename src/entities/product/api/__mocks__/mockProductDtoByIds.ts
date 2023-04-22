import { type ProductDto } from '../types'
import products from './products.json'

export function mockProductDtoByIds(ids: number[]) {
  return products.filter((product) => ids.includes(product.id)) as ProductDto[]
}
