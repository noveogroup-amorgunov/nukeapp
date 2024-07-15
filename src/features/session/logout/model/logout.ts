import { createAsyncThunk } from '@reduxjs/toolkit'
import { cartApi, clearCartData } from '@/entities/cart'
import { clearSessionData, sessionApi } from '@/entities/session'
import { userApi } from '@/entities/user/api/userApi'
import { clearWishlistData, wishlistApi } from '@/entities/wishlist'
import { CART_TAG, SESSION_TAG, USER_TAG, WISHLIST_TAG } from '@/shared/api'
import { wait } from '@/shared/lib'

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
  'authentication/logout',
  async (_: unknown, { dispatch }) => {
    dispatch(clearSessionData())
    dispatch(clearWishlistData())
    dispatch(clearCartData())

    // Wait 10ms to invalidateTags in next event loop tick.
    // Otherwise after invalidate related requests with SESSION_TAG
    // will be started, but isAuthorized will still be equal to true
    await wait(10)

    // 👇 ATTENTION: This line clear all baseApi state instead of sessionApi
    // dispatch(sessionApi.util.resetApiState())

    dispatch(sessionApi.util.invalidateTags([SESSION_TAG]))
    dispatch(userApi.util.invalidateTags([USER_TAG]))
    dispatch(wishlistApi.util.invalidateTags([WISHLIST_TAG]))
    dispatch(cartApi.util.invalidateTags([CART_TAG]))
  },
)
