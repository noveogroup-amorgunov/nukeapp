import { type FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import {
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import {
  type BaseQueryApi,
  type QueryReturnValue,
} from '@reduxjs/toolkit/src/query/baseQueryTypes'
import { baseQuery } from './baseQuery'
// import { logoutThunk } from '@/features/authentication/Logout/model/logout'

const AUTH_ERROR_CODES = new Set([401])

export async function baseQueryWithReauth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
  const result = await baseQuery(args, api, extraOptions)

  // TODO: Move session to shared/api
  if (
    typeof result.error?.status === 'number' &&
    AUTH_ERROR_CODES.has(result.error.status)
  ) {
    // TODO: Violation FSD
    // api.dispatch(logoutThunk())
  }

  return result
}
