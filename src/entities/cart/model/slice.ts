import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, WithSlice } from '@reduxjs/toolkit'
import type { EntitiesDomain } from '@/shared/domain'
import type { AppState } from '@/shared/redux'
import { rootReducer } from '@/shared/redux'
import { cartApi } from '../api/cartApi'
import type { Cart, CartItem } from './types'

type CartSliceState = Cart

const initialState: CartSliceState = {
  itemsMap: {},
  version: 0,
}

function createCartItem(product: EntitiesDomain['Product']): CartItem {
  return {
    quantity: 1,
    product,
  }
}

const slice = createSlice({
  name: 'cart',
  initialState,
  selectors: {
    cart: state => state,
    totalPrice: state => Object.values(state.itemsMap).reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
    products: createSelector(
      state => state.itemsMap,
      (itemsMap: Record<EntitiesDomain['ProductId'], CartItem>) => Object.values(itemsMap),
    ),
    totalQuantity: state => Object.values(state.itemsMap).reduce(
      (acc, item) => acc + item.quantity,
      0,
    ),
  },
  reducers: {
    reset: (state) => {
      state.itemsMap = {}
    },
    addOneItem: (state, action: PayloadAction<EntitiesDomain['Product']>) => {
      const productInCart = state.itemsMap[action.payload.id]

      if (productInCart) {
        productInCart.quantity += 1
      }
      else {
        state.itemsMap[action.payload.id] = createCartItem(action.payload)
      }
    },
    removeOneItem: (state, action: PayloadAction<EntitiesDomain['Product']>) => {
      const productInCart = state.itemsMap[action.payload.id]
      if (!productInCart) {
        return
      }

      if (productInCart.quantity > 1) {
        productInCart.quantity -= 1
      }
      else {
        delete state.itemsMap[action.payload.id]
      }
    },
    removeItem: (state, action: PayloadAction<EntitiesDomain['ProductId']>) => {
      const productInCart = state.itemsMap[action.payload]
      if (!productInCart) {
        return
      }
      delete state.itemsMap[action.payload]
    },
    incVersion: (state) => {
      state.version += 1
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.cart.matchFulfilled,
      (state: CartSliceState, { payload }) => {
        // update cart state if server sent actual version
        if (state.version <= payload.version) {
          state.itemsMap = payload.itemsMap
        }
      },
    )
  },
})

declare module '@/shared/redux/model/types' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface LazyLoadedReduxSlices extends WithSlice<typeof slice> {}
}

export const cartSlice = slice.injectInto(rootReducer)

export const selectProductInCart = createSelector(
  cartSlice.selectors.products,
  (_: AppState, productId: EntitiesDomain['ProductId']) => productId,
  (items: CartItem[], productId: EntitiesDomain['ProductId']): CartItem | undefined =>
    items.find(({ product }) => product.id === productId),
)
