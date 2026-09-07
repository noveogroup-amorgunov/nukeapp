export { apiAccessTokenIsBrokenEvent } from './apiAccessTokenIsBrokenEvent'
export { getApiAccessToken, setApiAccessToken } from './apiAccessTokenMemoryStorage'
export { baseApi } from './baseApi'
export { generatedApi } from './generated/api.generated'
// Hooks with client models (Product/Category) are re-exported
// from `@/entities/product` and `@/entities/category` (enhanceEndpoints).
// Here — only hooks that work with raw DTO.
export {
  useGetAdOfferQuery,
  useGetCartQuery,
  useGetFeatureToggleQuery,
  useGetMeQuery,
  useGetWishlistProductsQuery,
  useLoginMutation,
  useUpdateCartMutation,
  useUpdateWishlistProductsMutation,
} from './generated/api.generated'

export type {
  AdOffer,
  BooleanAsString,
  Cart,
  Category,
  CategoryWithProducts,
  FeatureToggle,
  Id,
  LoginRequest,
  Penny,
  Product,
  ProductDetails,
  Session,
  SortBy,
  UpdateCartRequest,
  User,
  WishlistUpdateRequest,
} from './generated/api.generated'

// ApiArg types for `enhanceEndpoints` overrides
export type {
  GetCategoryDetailsApiArg,
  GetPopularCategoriesApiArg,
  GetPopularProductsApiArg,
  GetProductDetailsApiArg,
  GetProductsApiArg,
  GetWishlistProductsApiArg,
} from './generated/api.generated'
export { isFetchBaseQueryError } from './isFetchBaseQueryError'
export { CART_TAG, SESSION_TAG, USER_TAG, WISHLIST_TAG } from './tags'
export type { ApiTagTypes, AppBaseQuery } from './tags'
