import { productsMock } from '@/shared/lib/server'
import type { ProductDto } from '../types'

export function mockProductDtoByIds(ids: number[]) {
  return productsMock.filter(product =>
    ids.includes(product.id),
  ) as ProductDto[]
}
