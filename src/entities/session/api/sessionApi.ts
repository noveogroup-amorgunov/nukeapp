import { baseApi, SESSION_TAG, WISHLIST_TAG } from '@/shared/api'
import { mapSession } from '../lib/mapSession'
import type { Session } from '../model/types'
import type { RequestLoginBody } from './types'
import { sessionDtoSchema } from './types'

export const sessionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: body => ({
        url: `/login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [SESSION_TAG, WISHLIST_TAG],
      /**
       * ✅ DX Best practice (Type safe)
       *
       * By default response is any (see BaseQueryResult)
       * Set response as unknown and validate it by zod schema
       *
       * @see node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes.d.ts
       */
      transformResponse: (response: unknown) =>
        mapSession(sessionDtoSchema.parse(response)),
    }),
  }),
})

export const { useLoginMutation } = sessionApi
