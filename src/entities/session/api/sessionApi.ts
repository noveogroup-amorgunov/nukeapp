import { type UserDto, type RequestLoginBody, type SessionDto } from './types'
import { mapSession } from '../lib/mapSession'
import { mapUser } from '../lib/mapUser'
import { type User, type Session } from '../model/types'
import { baseApi } from '@/shared/api/baseApi'
import { SESSION_TAG, WISHLIST_TAG } from '@/shared/api/tags'

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [SESSION_TAG, WISHLIST_TAG],
      transformResponse: (response: SessionDto) => mapSession(response),
    }),
    // TODO: Move to entities/user/api/userApi.ts
    me: build.query<User, void>({
      query: () => ({
        url: `/me`,
      }),
      providesTags: [SESSION_TAG],
      transformResponse: (response: UserDto) => mapUser(response),
    }),
  }),
})

export const { useLoginMutation, useMeQuery } = sessionApi
