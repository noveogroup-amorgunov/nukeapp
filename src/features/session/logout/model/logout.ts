import { cartApi, resetCartData } from '@/entities/cart'
import { resetSessionData, sessionApi } from '@/entities/session'
import { userApi } from '@/entities/user'
import { resetWishlistData, wishlistApi } from '@/entities/wishlist'
import { CART_TAG, SESSION_TAG, USER_TAG, WISHLIST_TAG } from '@/shared/api'
import { wait } from '@/shared/lib'
import { createAppAsyncThunk } from '@/shared/redux'

export const logoutThunk = createAppAsyncThunk<void, void>(
  'authentication/logout',
  async (_: unknown, { dispatch }) => {
    dispatch(resetSessionData())
    dispatch(resetWishlistData())
    dispatch(resetCartData())

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
