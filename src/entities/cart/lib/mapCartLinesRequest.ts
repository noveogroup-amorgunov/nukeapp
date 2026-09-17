import type { UpdateCartRequest } from '@/shared/api'
import type { CartLine } from '../model/types'

export function mapCartLinesRequest(
  items: CartLine[],
): UpdateCartRequest['items'] {
  return items.map(item => ({
    productId: item.product.id,
    quantity: item.quantity,
  }))
}
