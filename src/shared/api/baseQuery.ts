import type { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import type {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '../lib/env'
import type { AppState } from '../redux'

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: env.VITE_API_ENDPOINT,
  prepareHeaders: (headers, { getState }) => {
    // FIXME: Attach access token to api without linking to session store
    const { accessToken } = (getState() as AppState).session

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})
