import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'

export const SESSION_TAG = 'SESSION_TAG'
export const WISHLIST_TAG = 'WISHLIST_TAG'
export const CART_TAG = 'CART_TAG'
export const USER_TAG = 'USER_TAG'

export type ApiTagTypes
  = | typeof SESSION_TAG
    | typeof WISHLIST_TAG
    | typeof CART_TAG
    | typeof USER_TAG

export type AppBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
>
