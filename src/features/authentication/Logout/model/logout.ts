import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from '@/entities/session/api/sessionApi'
import { clearSessionData } from '@/entities/session/model/slice'
import { wishlistApi } from '@/entities/wishlist/api/wishlistApi'
import { clearWishlistData } from '@/entities/wishlist/model/slice'
import { SESSION_TAG, WISHLIST_TAG } from '@/shared/api/tags'
import { wait } from '@/shared/lib/wait'

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
  'authentication/logout',
  async (_: unknown, { dispatch }) => {
    dispatch(clearSessionData())
    dispatch(clearWishlistData())

    // Wait 10ms to invalidateTags in next event loop tick.
    // Otherwise after invalidate related requests with SESSION_TAG
    // will be started, but isAuthorized will still be equal to true
    await wait(10)

    // 👇 ATTENTION: This line clear all baseApi state instead of sessionApi
    // dispatch(sessionApi.util.resetApiState())

    dispatch(sessionApi.util.invalidateTags([SESSION_TAG]))
    dispatch(wishlistApi.util.invalidateTags([WISHLIST_TAG]))
  }
)
