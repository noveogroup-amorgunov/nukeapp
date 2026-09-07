import { cartSlice } from './model/slice'

export { selectProductInCart } from './model/slice'
export { type Cart, type CartItem } from './model/types'

export { useGetCartQuery } from '@/shared/api'

export const {
  totalQuantity: selectTotalQuantity,
  totalPrice: selectCartTotalPrice,
  products: selectProductsInCart,
  cart: selectCart,
} = cartSlice.selectors

export const {
  addOneItem,
  removeOneItem,
  removeItem: removeProductFromCart,
  reset: resetCartData,
  incVersion,
} = cartSlice.actions
