import { type ProductDto } from '@/entities/product/@x/cart'

export type CartDto = {
  cartItems: Array<{
    product: ProductDto
    quantity: number
  }>
  deliveryPrice: Penny
}

export type CartItemDto = {
  productId: Id
  quantity: number
}
