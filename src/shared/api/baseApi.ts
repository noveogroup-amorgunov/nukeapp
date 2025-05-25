import type { Middleware, WithSlice } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'
import { dynamicMiddleware, rootReducer } from '../redux'
import { baseQueryWithReauth } from './baseQueryWithReauth'
import { CART_TAG, SESSION_TAG, USER_TAG, WISHLIST_TAG } from './tags'

export const baseApi = createApi({
  tagTypes: [SESSION_TAG, WISHLIST_TAG, CART_TAG, USER_TAG],
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})

declare module '@/shared/redux/model/types' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface LazyLoadedReduxSlices extends WithSlice<typeof baseApi> {}
}

rootReducer.inject(baseApi)

dynamicMiddleware.addMiddleware(baseApi.middleware as Middleware)
