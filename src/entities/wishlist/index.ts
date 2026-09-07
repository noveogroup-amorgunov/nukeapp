import { wishlistSlice } from './model/slice'

export { useGetWishlistProductsQuery } from './api/wishlistApi'
export { wishlistSlice } from './model/slice'
export { useUpdateWishlistProductsMutation } from '@/shared/api'

export const {
  productInWishlist: selectProductIsInWishlist,
  productIdsInWishlist: selectProductIdsInWishlist,
} = wishlistSlice.selectors

export const {
  toggleProduct: toggleWishlistProduct,
  reset: resetWishlistData,
} = wishlistSlice.actions
