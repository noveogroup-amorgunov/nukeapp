import type { CartItemDto } from '../api/types'
import type { Cart } from '../model/types'

export function mapCartItemDto(cart: Cart): CartItemDto[] {
  return Object.values(cart.itemsMap).map(item => ({
    productId: item.product.id,
    quantity: item.quantity,
  }))
}
