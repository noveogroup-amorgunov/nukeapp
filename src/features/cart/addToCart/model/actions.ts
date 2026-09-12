import {
  addOneItem,
  incVersion,
  mapCartItemsRequest,
  removeOneItem,
  removeProductFromCart,
  selectCart,
  selectProductInCart,
} from '@/entities/cart'
import type { Product, ProductId } from '@/entities/product'
import type { UpdateCartRequest } from '@/shared/api'
import { generatedApi } from '@/shared/api'
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
  { items: UpdateCartRequest['items'], version: number }
>('cart/updateCartThunk', async (payload, { dispatch }) => {
  await dispatch(
    generatedApi.endpoints.updateCart.initiate({
      updateCartRequest: { items: payload.items, version: payload.version },
    }),
  ).unwrap()
})

const syncCart = debounce((dispatch: AppDispatch, state: AppState) => {
  const cart = selectCart(state)
  const cartItemsRequest = mapCartItemsRequest(Object.values(cart.itemsMap))
  return dispatch(
    updateCartThunk({ items: cartItemsRequest, version: cart.version }),
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
    // Quantity must never exceed the product Stock
    const productInCart = selectProductInCart(getState(), product.id)
    if ((productInCart?.quantity ?? 0) >= product.stock) {
      return
    }

    dispatch(addOneItem(product))
    dispatch(incVersion())
    syncCart(dispatch, getState())
  },
)
