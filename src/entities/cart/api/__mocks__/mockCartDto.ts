import {
  type CartDatabaseModel,
  type ProductDatabaseModel,
} from '@/shared/lib/server'
import { type CartDto } from '../types'

export function mockCartDto(
  cart: CartDatabaseModel,
  products: ProductDatabaseModel[]
): CartDto {
  return {
    deliveryPrice: 0,
    version: cart.version,
    cartItems: cart.itemsProductId
      .map((productId, index) => ({
        product: products.find((product) => product.id === productId),
        quantity: cart.itemsProductQuantity[index],
      }))
      .filter((item) => Boolean(item.product)) as CartDto['cartItems'],
  }
}
