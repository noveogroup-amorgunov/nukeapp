import { baseApi, USER_TAG } from '@/shared/api'
import { mapUser } from '../lib/mapUser'
import type { User } from '../model/types'
import { userDtoSchema } from './types'

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<User, void>({
      query: () => ({
        url: `/me`,
      }),
      providesTags: [USER_TAG],
      /**
       * ✅ DX Best practice (Type safe)
       *
       * By default response is any (see BaseQueryResult)
       * Set response as unknown and validate it by zod schema
       *
       * @see node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes.d.ts
       */
      transformResponse: (response: unknown) => mapUser(userDtoSchema.parse(response)),
    }),
  }),
})

export const { useMeQuery } = userApi
