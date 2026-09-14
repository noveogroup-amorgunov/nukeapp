import { cartSlice } from './model/slice'

export { mapCartItemsRequest } from './lib/mapCartItemsRequest'
export { selectProductInCart } from './model/slice'

export { type Cart, type CartItem } from './model/types'

export const {
  totalQuantity: selectTotalQuantity,
  totalPrice: selectCartTotalPrice,
  products: selectProductsInCart,
  quantityByProductId: selectCartQuantityByProductId,
  cart: selectCart,
} = cartSlice.selectors

export const {
  addOneItem,
  removeOneItem,
  removeItem: removeProductFromCart,
  reset: resetCartData,
  incVersion,
} = cartSlice.actions
