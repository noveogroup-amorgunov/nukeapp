import { wishlistSlice } from './model/slice'

export { wishlistApi, useWishlistProductsQuery } from './api/wishlistApi'
export { wishlistSlice } from './model/slice'

export const {
  productInWishlist: selectIsInWishlist,
  productIdsInWishlist: selectProductIdsInWishlist,
} = wishlistSlice.selectors

export const {
  toggleProduct: toggleWishlistProduct,
  clear: clearWishlistData,
} = wishlistSlice.actions
