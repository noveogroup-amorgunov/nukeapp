import { generatedApi, isFetchBaseQueryError } from '@/shared/api'
import { createAppAsyncThunk } from '@/shared/redux'

type Params = {
  email: Email
  password: string
}

export const loginThunk = createAppAsyncThunk<void, Params>(
  'authentication/login',
  async (body: Params, { dispatch }) => {
    try {
      await dispatch(
        generatedApi.endpoints.login.initiate({ loginRequest: body }),
      ).unwrap()
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
