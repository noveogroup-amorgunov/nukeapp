import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '../lib/env'
import { getApiAccessToken } from './apiAccessTokenMemoryStorage'

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: env.VITE_API_ENDPOINT,
  prepareHeaders: (headers) => {
    const accessToken = getApiAccessToken()

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})
