import type { PayloadAction, WithSlice } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { Product, ProductId } from '@/entities/product/@x/wishlist'
import { rootReducer } from '@/shared/redux'
import { wishlistApi } from '../api/wishlistApi'

type WishlistSliceState = {
  products: Record<ProductId, boolean>
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
      (_: WishlistSliceState, productId: ProductId) => productId,
      (products: Record<ProductId, boolean>, productId: ProductId): boolean =>
        Boolean(products[productId]),
    ),
    productIdsInWishlist: createSelector(
      (state: WishlistSliceState) => state.products,
      (products: Record<ProductId, boolean>) =>
        Object.keys(products).filter(Boolean).map(Number) as ProductId[],
    ),
  },
  reducers: {
    reset: (state) => {
      state.products = {}
    },
    toggleProduct: (state, action: PayloadAction<ProductId>) => {
      state.products[action.payload] = !state.products[action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      wishlistApi.endpoints.wishlistProducts.matchFulfilled,
      (state: WishlistSliceState, { payload }) => {
        state.products = {}

        payload.forEach((product: Product) => {
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
