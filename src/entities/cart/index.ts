import { cartSlice } from './model/slice'

export { cartApi, useCartQuery } from './api/cartApi'
export { type CartItemDto } from './api/types'
export { mapCartItemDto } from './lib/mapCartItemDto'
export { selectProductInCart } from './model/slice'

export { type Cart, type CartItem } from './model/types'

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
