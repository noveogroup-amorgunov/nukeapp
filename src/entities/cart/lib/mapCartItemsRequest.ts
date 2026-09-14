import type { UpdateCartRequest } from '@/shared/api'
import type { CartItem } from '../model/types'

export function mapCartItemsRequest(
  items: CartItem[],
): UpdateCartRequest['items'] {
  return items.map(item => ({
    productId: item.product.id,
    quantity: item.quantity,
  }))
}
