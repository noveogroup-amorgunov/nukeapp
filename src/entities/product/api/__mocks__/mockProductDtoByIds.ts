import products from './products.json'
import { type ProductDto } from '../types'

export function mockProductDtoByIds(ids: number[]) {
  return products.filter((product) => ids.includes(product.id)) as ProductDto[]
}
