import type { Product, ProductId } from '@/entities/product/@x/cart'

export type CartLine = {
  product: Product
  quantity: number
}

export type Cart = {
  itemsMap: Record<ProductId, CartLine>
  version: number
}
