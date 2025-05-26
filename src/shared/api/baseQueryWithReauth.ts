import type {
  BaseQueryApi,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query'
import { apiAccessTokenIsBrokenEvent } from './apiAccessTokenIsBrokenEvent'
import { baseQuery } from './baseQuery'

const AUTH_ERROR_CODES = new Set([401])

export async function baseQueryWithReauth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
  const result = await baseQuery(args, api, extraOptions)

  // There could be logic for updating the access token via refresh token in the future
  // Now if the access token is invalid, logout session
  // @see https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#preventing-multiple-unauthorized-errors

  /**
   * 👇 ATTENTION: We can't use any thunk in direct mode,
   * coz it's FSD Violation:
   *
   * api.dispatch(logoutThunk()) // 👎
   *
   * So we dispatch shared event `apiAccessTokenIsBrokenEvent`,
   * which has subscribes via redux middleware in other layers.
   * See example in `@/features/session/logout/*`
   */
  if (
    typeof result.error?.status === 'number'
    && AUTH_ERROR_CODES.has(result.error.status)
  ) {
    api.dispatch(apiAccessTokenIsBrokenEvent())
  }

  return result
}
