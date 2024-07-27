import {
  type CartItemDto,
  addOneItem,
  cartApi,
  incVersion,
  mapCartItemDto,
  removeOneItem,
  removeProductFromCart,
} from '@/entities/cart'
import type { Product, ProductId } from '@/entities/product'
import { debounce } from '@/shared/lib'
import { createAppAsyncThunk } from '@/shared/lib/store/createAppAsyncThunk'
import type { AppDispatch, AppState } from '@/shared/lib/store/types'

const SYNC_CART_WITH_SERVER_TIMEOUT_MS = 1500

/**
 * ✅ UX Best practice
 *
 * Use client optimistic update for cart and
 * send request by debounce
 */
export const updateCartThunk = createAppAsyncThunk<
  void,
  { items: CartItemDto[], version: number }
>('cart/updateCartThunk', async (payload, { dispatch }) => {
  await dispatch(cartApi.endpoints.updateCart.initiate(payload)).unwrap()
})

const syncCart = debounce((dispatch: AppDispatch, state: AppState) => {
  // TODO: fix it
  const cartItemsDto = mapCartItemDto(state.cart)
  return dispatch(
    updateCartThunk({ items: cartItemsDto, version: state.cart.version }),
  )
}, SYNC_CART_WITH_SERVER_TIMEOUT_MS)

// TODO: Fix naming (thunk for remove product from cart with any quantity)
export const removeCartItemThunk = createAppAsyncThunk<
  void,
  ProductId
>(
  'cart/removeCartItemThunk',
  async (productId: ProductId, { dispatch, getState }) => {
    dispatch(removeProductFromCart(productId))
    dispatch(incVersion())
    syncCart(dispatch as AppDispatch, getState())
  },
)

export const removeCartProductThunk = createAppAsyncThunk<
  void,
  Product
>(
  'cart/removeCartProductThunk',
  async (product: Product, { dispatch, getState }) => {
    dispatch(removeOneItem(product))
    dispatch(incVersion())
    syncCart(dispatch as AppDispatch, getState())
  },
)

export const addCartProductThunk = createAppAsyncThunk<
  void,
  Product
>(
  'cart/addCartProductThunk',
  async (product: Product, { dispatch, getState }) => {
    dispatch(addOneItem(product))
    dispatch(incVersion())
    syncCart(dispatch as AppDispatch, getState())
  },
)
