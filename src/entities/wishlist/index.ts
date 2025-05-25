import { wishlistSlice } from './model/slice'

export { wishlistApi, useWishlistProductsQuery } from './api/wishlistApi'
export { wishlistSlice } from './model/slice'

export const {
  productInWishlist: selectProductIsInWishlist,
  productIdsInWishlist: selectProductIdsInWishlist,
} = wishlistSlice.selectors

export const {
  toggleProduct: toggleWishlistProduct,
  reset: resetWishlistData,
} = wishlistSlice.actions
