import { baseApi, USER_TAG } from '@/shared/api'
import { mapUser } from '../lib/mapUser'
import { type User } from '../model/types'
import { type UserDto } from './types'

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<User, void>({
      query: () => ({
        url: `/me`,
      }),
      providesTags: [USER_TAG],
      transformResponse: (response: UserDto) => mapUser(response),
    }),
  }),
})

export const { useMeQuery } = userApi
