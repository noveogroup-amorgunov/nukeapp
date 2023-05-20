import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'
import { SESSION_TAG, WISHLIST_TAG, CART_TAG } from './tags'

export const baseApi = createApi({
  tagTypes: [SESSION_TAG, WISHLIST_TAG, CART_TAG],
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
