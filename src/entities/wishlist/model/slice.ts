import {
  type PayloadAction,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'
import { type Product, type ProductId } from '@/entities/product/model/types'
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
  reducers: {
    clearWishlistData: (state) => {
      state.products = {}
    },
    toggleWishlistProduct: (state, action: PayloadAction<ProductId>) => {
      if (state.products[action.payload]) {
        state.products[action.payload] = false
      } else {
        state.products[action.payload] = true
      }
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
      }
    )
  },
})

export const selectIsInWishlist = createSelector(
  (state: RootState) => state.wishlist.products,
  (_: RootState, productId: ProductId) => productId,
  (products: Record<ProductId, boolean>, productId: ProductId): boolean =>
    Boolean(products[productId])
)

export const selectProductIdsInWishlist = (state: RootState) =>
  Object.keys(state.wishlist.products)
    .filter(Boolean)
    .map(Number) as ProductId[]

export const { toggleWishlistProduct, clearWishlistData } =
  wishlistSlice.actions
