import {
  addOneItem,
  cartApi,
  incVersion,
  mapCartItemDto,
  removeOneItem,
  removeProductFromCart,
  selectCart,
} from '@/entities/cart'
import type { CartItemDto } from '@/entities/cart'
import type { Product, ProductId } from '@/entities/product'
import { debounce } from '@/shared/lib'
import type { AppDispatch, AppState } from '@/shared/redux'
import { createAppAsyncThunk } from '@/shared/redux'

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
  const cart = selectCart(state)
  const cartItemsDto = mapCartItemDto(cart)
  return dispatch(
    updateCartThunk({ items: cartItemsDto, version: cart.version }),
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
    syncCart(dispatch, getState())
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
    syncCart(dispatch, getState())
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
    syncCart(dispatch, getState())
  },
)
