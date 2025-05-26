import type { PayloadAction, WithSlice } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { EntitiesDomain } from '@/shared/domain'
import { rootReducer } from '@/shared/redux'
import { wishlistApi } from '../api/wishlistApi'

type WishlistSliceState = {
  products: Record<EntitiesDomain['ProductId'], boolean>
}

const initialState: WishlistSliceState = {
  products: {},
}

const slice = createSlice({
  name: 'wishlist',
  initialState,
  selectors: {
    productInWishlist: createSelector(
      (state: WishlistSliceState) => state.products,
      (_: WishlistSliceState, productId: EntitiesDomain['ProductId']) => productId,
      (products: Record<EntitiesDomain['ProductId'], boolean>, productId: EntitiesDomain['ProductId']): boolean =>
        Boolean(products[productId]),
    ),
    productIdsInWishlist: createSelector(
      (state: WishlistSliceState) => state.products,
      (products: Record<EntitiesDomain['ProductId'], boolean>) =>
        Object.keys(products).filter(Boolean).map(Number) as EntitiesDomain['ProductId'][],
    ),
  },
  reducers: {
    reset: (state) => {
      state.products = {}
    },
    toggleProduct: (state, action: PayloadAction<EntitiesDomain['ProductId']>) => {
      state.products[action.payload] = !state.products[action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      wishlistApi.endpoints.wishlistProducts.matchFulfilled,
      (state: WishlistSliceState, { payload }) => {
        state.products = {}

        payload.forEach((product: EntitiesDomain['Product']) => {
          state.products[product.id] = true
        })
      },
    )
  },
})

declare module '@/shared/redux/model/types' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface LazyLoadedReduxSlices extends WithSlice<typeof slice> {}
}

export const wishlistSlice = slice.injectInto(rootReducer)
