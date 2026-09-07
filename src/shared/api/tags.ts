import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'

// Tag names must match the OpenAPI `tags` used by `openapi-config.ts`
export const SESSION_TAG = 'session'
export const WISHLIST_TAG = 'wishlist'
export const CART_TAG = 'cart'
export const USER_TAG = 'user'

export type ApiTagTypes = typeof SESSION_TAG | typeof WISHLIST_TAG | typeof CART_TAG | typeof USER_TAG

export type AppBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
>
