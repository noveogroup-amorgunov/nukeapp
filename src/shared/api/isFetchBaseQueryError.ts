import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}
