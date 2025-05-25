import type { ProductId } from '@/entities/product'
import {
  selectProductIdsInWishlist,
  selectProductIsInWishlist,
  toggleWishlistProduct,
  wishlistApi,
} from '@/entities/wishlist'
import { createAppAsyncThunk } from '@/shared/redux'

export const toggleWishlistProductThunk = createAppAsyncThunk<
  void,
  ProductId
>(
  'wishlist/toggleWishlistProduct',
  async (productId: ProductId, { dispatch, getState }) => {
    const state = getState()
    const productsIds = selectProductIdsInWishlist(state)
    const isInWishlish = selectProductIsInWishlist(state, productId)

    /**
     * ✅ UX Best practice
     *
     * Use client optimistic update for wishlist status
     */
    dispatch(toggleWishlistProduct(productId))

    try {
      const nextProductsInWishlistIds = isInWishlish
        ? productsIds.filter(id => id !== productId)
        : productsIds.concat(productId)

      await dispatch(
        wishlistApi.endpoints.addToWishlist.initiate(
          nextProductsInWishlistIds,
          { fixedCacheKey: 'shared-add-to-wishlist' },
        ),
      ).unwrap()
    }
    catch {
      // can show error state with repeat action button
      dispatch(toggleWishlistProduct(productId))
    }
  },
)
