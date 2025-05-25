import type { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import type {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { SessionSliceState } from '@/entities/session/model/slice'
import { env } from '../lib/env'

// FIXME: remove this import
// type StateWithSession = { session: SessionSliceState }

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: env.VITE_API_ENDPOINT,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as unknown as any).session

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})
