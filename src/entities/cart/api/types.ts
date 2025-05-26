import type { ProductDto } from '@/shared/api'

export type CartDto = {
  cartItems: Array<{
    product: ProductDto
    quantity: number
  }>
  deliveryPrice: Penny
  version: number
}

export type CartItemDto = {
  productId: Id
  quantity: number
}
