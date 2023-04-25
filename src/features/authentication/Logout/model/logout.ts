import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi, clearSessionData } from '@/entities/session'
import { wishlistApi, clearWishlistData } from '@/entities/wishlist'
import { SESSION_TAG, WISHLIST_TAG } from '@/shared/api'
import { wait } from '@/shared/lib'

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
