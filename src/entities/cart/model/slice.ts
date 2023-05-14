import {
  type PayloadAction,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'
import type { Product, ProductId } from '@/entities/product/@x/cart'
import { type CartItem, type Cart } from './types'

type CartSliceState = Cart

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
}

function createCartItem(product: Product): CartItem {
  return {
    quantity: 1,
    product,
  }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartData: (state) => {
      state.items = []
      state.totalPrice = 0
    },
    addOneItem: (state, action: PayloadAction<Product>) => {
      const productInCart = state.items.find(
        ({ product }) => product.id === action.payload.id
      )
      if (productInCart) {
        productInCart.quantity += 1
        state.totalPrice += productInCart.product.price
      } else {
        state.items.push(createCartItem(action.payload))
        state.totalPrice += action.payload.price
      }
    },
    removeOneItem: (state, action: PayloadAction<Product>) => {
      const productInCart = state.items.find(
        ({ product }) => product.id === action.payload.id
      )
      if (!productInCart) {
        return
      }

      if (productInCart.quantity > 1) {
        productInCart.quantity -= 1
        state.totalPrice -= productInCart.product.price
      } else {
        state.items = state.items.filter(
          ({ product }) => product.id !== action.payload.id
        )
        state.totalPrice -= productInCart.product.price
      }
    },
    removeItem: (state, action: PayloadAction<Product>) => {},
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     wishlistApi.endpoints.wishlistProducts.matchFulfilled,
  //     (state: WishlistSliceState, { payload }) => {
  //       state.products = {}

  //       payload.forEach((product: Product) => {
  //         state.products[product.id] = true
  //       })
  //     }
  //   )
  // },
})

export const selectProductsInCart = (state: RootState) => state.cart.items

export const selectProductInCartCount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0)

export const selectProductInCart = createSelector(
  selectProductsInCart,
  (_: RootState, productId: ProductId) => productId,
  (items: CartItem[], productId: ProductId): CartItem | undefined =>
    items.find(({ product }) => product.id === productId)
)

export const { addOneItem, removeOneItem, removeItem, clearCartData } =
  cartSlice.actions
