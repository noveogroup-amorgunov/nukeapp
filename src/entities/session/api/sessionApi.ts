import { baseApi, SESSION_TAG, WISHLIST_TAG } from '@/shared/api'
import { mapSession } from '../lib/mapSession'
import type { Session } from '../model/types'
import type { RequestLoginBody, SessionDto } from './types'

export const sessionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: body => ({
        url: `/login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [SESSION_TAG, WISHLIST_TAG],
      transformResponse: (response: SessionDto) => mapSession(response),
    }),
  }),
})

export const { useLoginMutation } = sessionApi
