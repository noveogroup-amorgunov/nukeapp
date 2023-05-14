import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ProductId } from '@/entities/product'
import {
  wishlistApi,
  selectIsInWishlist,
  selectProductIdsInWishlist,
  toggleWishlistProduct,
} from '@/entities/wishlist'

export const toggleWishlistProductThunk = createAsyncThunk<
  void,
  ProductId,
  { state: RootState }
>(
  'wishlist/toggleWishlistProduct',
  async (productId: ProductId, { dispatch, getState }) => {
    const state = getState()
    const productsIds = selectProductIdsInWishlist(state)
    const isInWishlish = selectIsInWishlist(state, productId)

    /**
     * ✅ UX Best practice
     *
     * Use client optimistic update for wishlist status
     */
    dispatch(toggleWishlistProduct(productId))

    try {
      const nextProductsInWishlistIds = isInWishlish
        ? productsIds.filter((id) => id !== productId)
        : productsIds.concat(productId)

      await dispatch(
        wishlistApi.endpoints.addToWishlist.initiate(
          nextProductsInWishlistIds,
          { fixedCacheKey: 'shared-add-to-wishlist' }
        )
      ).unwrap()
    } catch (error) {
      // can show error state with repeat action button
      dispatch(toggleWishlistProduct(productId))
    }
  }
)
