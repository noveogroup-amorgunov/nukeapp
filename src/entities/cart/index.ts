export { type Cart, type CartItem } from './model/types'
export {
  cartSlice,
  selectProductsInCart,
  selectProductInCart,
  selectTotalQuantity,
  selectCartTotalPrice,
  addOneItem,
  removeOneItem,
  removeItem as removeProductFromCart,
  clearCartData,
  incVersion,
} from './model/slice'
export { mapCartItemDto } from './lib/mapCartItemDto'
export { cartApi } from './api/cartApi'
export { type CartItemDto } from './api/types'
