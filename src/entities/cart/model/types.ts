import { type Product } from '@/entities/product/@x/cart'

export type CartItem = {
  product: Product
  quantity: number
}

export type Cart = {
  items: CartItem[]
  totalPrice: number
}
