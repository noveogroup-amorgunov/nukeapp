import { type ProductId, mapProduct } from '@/entities/product/@x/cart'
import type { CartDto } from '../api/types'
import { type Cart } from '../model/types'

export function mapCart(dto: CartDto): Cart {
  const itemsMap = dto.cartItems.reduce((acc: Cart['itemsMap'], item) => {
    acc[item.product.id as ProductId] = {
      product: mapProduct(item.product),
      quantity: item.quantity,
    }

    return acc
  }, {})

  return { itemsMap }
}
