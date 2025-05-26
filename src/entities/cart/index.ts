import { cartSlice } from './model/slice'

export { type Cart, type CartItem } from './model/types'
export { mapCartItemDto } from './lib/mapCartItemDto'
export { cartApi, useCartQuery } from './api/cartApi'
export { type CartItemDto } from './api/types'

export { selectProductInCart } from './model/slice'

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
