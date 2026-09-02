import type { ProductDto } from '../types'
import { productsMock } from '@/shared/lib/server'

export function mockProductDtoByIds(ids: number[]) {
  return productsMock.filter(product =>
    ids.includes(product.id),
  ) as ProductDto[]
}
