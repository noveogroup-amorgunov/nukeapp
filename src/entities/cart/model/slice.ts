import {
  type PayloadAction,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'
import type { Product, ProductId } from '@/entities/product/@x/cart'
import { cartApi } from '../api/cartApi'
import { type CartItem, type Cart } from './types'

type CartSliceState = Cart

const initialState: CartSliceState = {
  itemsMap: {},
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
      state.itemsMap = {}
    },
    addOneItem: (state, action: PayloadAction<Product>) => {
      const productInCart = state.itemsMap[action.payload.id]

      if (productInCart) {
        productInCart.quantity += 1
      } else {
        state.itemsMap[action.payload.id] = createCartItem(action.payload)
      }
    },
    removeOneItem: (state, action: PayloadAction<Product>) => {
      const productInCart = state.itemsMap[action.payload.id]
      if (!productInCart) {
        return
      }

      if (productInCart.quantity > 1) {
        productInCart.quantity -= 1
      } else {
        delete state.itemsMap[action.payload.id]
      }
    },
    removeItem: (state, action: PayloadAction<ProductId>) => {
      const productInCart = state.itemsMap[action.payload]
      if (!productInCart) {
        return
      }
      delete state.itemsMap[action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.cart.matchFulfilled,
      (state: CartSliceState, { payload }) => {
        // actual cart by server state
        state.itemsMap = payload.itemsMap
      }
    )
  },
})

export const selectCartTotalPrice = (state: RootState) =>
  Object.values(state.cart.itemsMap).reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  )

export const selectProductsInCart = (state: RootState) =>
  Object.values(state.cart.itemsMap)

export const selectTotalQuantity = (state: RootState) =>
  Object.values(state.cart.itemsMap).reduce(
    (acc, item) => acc + item.quantity,
    0
  )

export const selectProductInCart = createSelector(
  selectProductsInCart,
  (_: RootState, productId: ProductId) => productId,
  (items: CartItem[], productId: ProductId): CartItem | undefined =>
    items.find(({ product }) => product.id === productId)
)

export const { addOneItem, removeOneItem, removeItem, clearCartData } =
  cartSlice.actions
