import type { z } from 'zod'
import { getQueryParams } from './getQueryParams'

export function useTypedQueryParams<T extends z.ZodTypeAny>(
  schema: T,
): ReturnType<T['parse']> {
  const queryParams = getQueryParams()
  return schema.parse(queryParams)
}
