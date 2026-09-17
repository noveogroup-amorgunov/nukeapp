import { cartSlice } from './model/slice'

export {
  addProductToCart,
  decrementProductQuantity,
  removeCartLine,
} from './model/actions'

export { selectProductInCart } from './model/slice'

export { type Cart, type CartLine } from './model/types'

export const {
  totalQuantity: selectTotalQuantity,
  totalPrice: selectCartTotalPrice,
  products: selectProductsInCart,
  quantityByProductId: selectCartQuantityByProductId,
  cart: selectCart,
} = cartSlice.selectors

export const { reset: resetCartData } = cartSlice.actions
