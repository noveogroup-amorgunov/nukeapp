import type { Product, ProductId } from '@/entities/product/@x/cart'

export type CartItem = {
  product: Product
  quantity: number
}

export type Cart = {
  itemsMap: Record<ProductId, CartItem>
  version: number
}
