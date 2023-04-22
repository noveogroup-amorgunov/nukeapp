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
import { invalidateAccessToken } from './invalidateTokenEvent'

const AUTH_ERROR_CODES = new Set([401])

export async function baseQueryWithReauth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
  const result = await baseQuery(args, api, extraOptions)

  /**
   * 👇 ATTENTION: We can't use any thunk in direct mode,
   * coz it's FSD Violation:
   *
   * api.dispatch(logoutThunk()) // 👎
   *
   * So we dispatch shared event `invalidateAccessToken`,
   * which has subscribes via redux middleware in other layers.
   * See example in @/features/authentication/InvalidateAccessToken
   */
  if (
    typeof result.error?.status === 'number' &&
    AUTH_ERROR_CODES.has(result.error.status)
  ) {
    api.dispatch(invalidateAccessToken())
  }

  return result
}
