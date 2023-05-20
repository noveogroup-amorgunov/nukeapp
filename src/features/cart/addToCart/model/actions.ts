import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  cartApi,
  addOneItem,
  removeOneItem,
  removeProductFromCart,
  mapCartItemDto,
  type CartItemDto,
  incVersion,
} from '@/entities/cart'
import type { Product, ProductId } from '@/entities/product'
import { debounce } from '@/shared/lib'

const SYNC_CART_WITH_SERVER_TIMEOUT_MS = 1500

/**
 * ✅ UX Best practice
 *
 * Use client optimistic update for cart and
 * send request by debounce
 */
export const updateCartThunk = createAsyncThunk<
  void,
  { items: CartItemDto[]; version: number },
  { state: RootState }
>('cart/updateCartThunk', async (payload, { dispatch }) => {
  await dispatch(cartApi.endpoints.updateCart.initiate(payload)).unwrap()
})

const syncCart = debounce((dispatch: AppDispatch, state: RootState) => {
  const cartItemsDto = mapCartItemDto(state.cart)
  return dispatch(
    updateCartThunk({ items: cartItemsDto, version: state.cart.version })
  )
}, SYNC_CART_WITH_SERVER_TIMEOUT_MS)

// TODO: Fix naming (thunk for remove product from cart with any quantity)
export const removeCartItemThunk = createAsyncThunk<
  void,
  ProductId,
  { state: RootState }
>(
  'cart/removeCartItemThunk',
  async (productId: ProductId, { dispatch, getState }) => {
    dispatch(removeProductFromCart(productId))
    dispatch(incVersion())
    syncCart(dispatch as AppDispatch, getState())
  }
)

export const removeCartProductThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>(
  'cart/removeCartProductThunk',
  async (product: Product, { dispatch, getState }) => {
    dispatch(removeOneItem(product))
    dispatch(incVersion())
    syncCart(dispatch as AppDispatch, getState())
  }
)

export const addCartProductThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>(
  'cart/addCartProductThunk',
  async (product: Product, { dispatch, getState }) => {
    dispatch(addOneItem(product))
    dispatch(incVersion())
    syncCart(dispatch as AppDispatch, getState())
  }
)
