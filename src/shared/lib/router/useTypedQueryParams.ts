import { useMemo } from 'react'
import type { z } from 'zod'
import { getQueryParams } from './getQueryParams'

function useQueryParams() {
  return useMemo(() => getQueryParams(), [window.location.search])
}

export function useTypedQueryParams<T extends z.ZodTypeAny>(
  schema: T,
): ReturnType<T['parse']> {
  const queryParams = useQueryParams()
  return useMemo(() => schema.parse(queryParams), [queryParams])
}
