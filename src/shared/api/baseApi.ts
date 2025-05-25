import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'
import { CART_TAG, SESSION_TAG, USER_TAG, WISHLIST_TAG } from './tags'

export const baseApi = createApi({
  tagTypes: [SESSION_TAG, WISHLIST_TAG, CART_TAG, USER_TAG],
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
