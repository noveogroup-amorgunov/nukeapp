import { sessionApi } from '@/entities/session'
import { isFetchBaseQueryError } from '@/shared/api'
import { createAppAsyncThunk } from '@/shared/lib/store'

type Params = {
  email: Email
  password: string
}

export const loginThunk = createAppAsyncThunk<void, Params>(
  'authentication/login',
  async (body: Params, { dispatch }) => {
    try {
      await dispatch(sessionApi.endpoints.login.initiate(body)).unwrap()
    }
    catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (typeof error.data === 'string') {
          throw new TypeError(error.data)
        }
      }

      throw new Error('Unknown error')
    }
  },
)
