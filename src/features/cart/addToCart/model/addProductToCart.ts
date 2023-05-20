import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  cartApi,
  addOneItem,
  removeOneItem,
  removeProductFromCart,
  mapCartItemDto,
  type CartItemDto,
} from '@/entities/cart'
import type { Product, ProductId } from '@/entities/product'
import { debounce } from '@/shared/lib'

/**
 * ✅ UX Best practice
 *
 * Use client optimistic update for cart and
 * send request by debounce
 */
export const updateCartThunk = createAsyncThunk<
  void,
  CartItemDto[],
  { state: RootState }
>('cart/updateCartThunk', async (cartItemsDto, { dispatch }) => {
  // TODO: Cancel request if user changed cart while request is processing
  await dispatch(cartApi.endpoints.updateCart.initiate(cartItemsDto)).unwrap()
})

const syncCart = debounce((dispatch: AppDispatch, state: RootState) => {
  const cartItemsDto = mapCartItemDto(state.cart)
  return dispatch(updateCartThunk(cartItemsDto))
}, 600)

// TODO: naming
export const removeAllProductFromCartThunk = createAsyncThunk<
  void,
  ProductId,
  { state: RootState }
>(
  'cart/removeAllProductFromCartThunk',
  async (productId: ProductId, { dispatch, getState }) => {
    dispatch(removeProductFromCart(productId))
    setTimeout(() => syncCart(dispatch as AppDispatch, getState()), 1)
  }
)

export const removeProductFromCartThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>(
  'cart/removeProductFromCartThunk',
  async (product: Product, { dispatch, getState }) => {
    dispatch(removeOneItem(product))
    setTimeout(() => syncCart(dispatch as AppDispatch, getState()), 1)
  }
)

export const addProductToCartThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>('cart/addProductToCart', async (product: Product, { dispatch, getState }) => {
  dispatch(addOneItem(product))
  setTimeout(() => syncCart(dispatch as AppDispatch, getState()), 1)
})
