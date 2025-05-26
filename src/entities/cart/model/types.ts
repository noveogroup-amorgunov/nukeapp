import type { EntitiesDomain } from '@/shared/domain'

export type CartItem = {
  product: EntitiesDomain['Product']
  quantity: number
}

export type Cart = {
  itemsMap: Record<EntitiesDomain['ProductId'], CartItem>
  version: number
}
