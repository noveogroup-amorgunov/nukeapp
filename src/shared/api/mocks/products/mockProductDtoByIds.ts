import type { Product } from '@/shared/api'
import { productsMock } from '@/shared/lib/server'

export function mockProductDtoByIds(ids: number[]): Product[] {
  return productsMock.filter(product =>
    ids.includes(product.id),
  ) as Product[]
}
