import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from '@/entities/session'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'

type Params = {
  email: Email
  password: string
}

export const loginThunk = createAsyncThunk<void, Params, { state: RootState }>(
  'authentication/login',
  async (body: Params, { dispatch }) => {
    try {
      await dispatch(sessionApi.endpoints.login.initiate(body)).unwrap()
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (typeof error.data === 'string') {
          throw new Error(error.data)
        }
      }

      throw new Error('Unknown error')
    }
  }
)
