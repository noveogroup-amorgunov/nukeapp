import { productsMock } from '@/entities/product/@x/cart'
import { type CartDto, type CartItemDto } from '../types'

export function mockCartDto(items: CartItemDto[]): CartDto {
  return {
    deliveryPrice: 0,
    cartItems: items
      .map((item) => ({
        product: productsMock.find((product) => product.id === item.productId),
        quantity: item.quantity,
      }))
      .filter((item) => Boolean(item.product)) as CartDto['cartItems'],
  }
}
