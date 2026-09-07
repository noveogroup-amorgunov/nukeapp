import { resetCartData } from '@/entities/cart'
import { resetSessionData } from '@/entities/session'
import { resetWishlistData } from '@/entities/wishlist'
import { baseApi, CART_TAG, SESSION_TAG, USER_TAG, WISHLIST_TAG } from '@/shared/api'
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

    dispatch(baseApi.util.invalidateTags([SESSION_TAG, USER_TAG, WISHLIST_TAG, CART_TAG]))
  },
)
