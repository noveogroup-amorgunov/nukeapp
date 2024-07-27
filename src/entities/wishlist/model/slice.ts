import {
  type PayloadAction,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit'
import type { Product, ProductId } from '@/entities/product/@x/wishlist'
import { rootReducer } from '@/shared/lib/store/rootReducer'
import { wishlistApi } from '../api/wishlistApi'

type WishlistSliceState = {
  products: Record<ProductId, boolean>
}

const initialState: WishlistSliceState = {
  products: {},
}

export const wishlistSlice = createSlice({
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
    clear: (state) => {
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

wishlistSlice.injectInto(rootReducer)
