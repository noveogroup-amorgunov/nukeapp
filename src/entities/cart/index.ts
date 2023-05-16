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
} from './model/slice'
