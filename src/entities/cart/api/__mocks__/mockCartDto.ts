import { type ProductDto } from '@/entities/product/@x/cart'
import { type CartDto } from '../types'

// TODO: infer type from database
type CartDatabaseModal = {
  version: number
  itemsProductId: number[]
  itemsProductQuantity: number[]
}

export function mockCartDto(
  cart: CartDatabaseModal,
  products: ProductDto[]
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
