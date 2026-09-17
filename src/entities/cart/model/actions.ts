import type { Product, ProductId } from '@/entities/product/@x/cart'
import type { UpdateCartRequest } from '@/shared/api'
import { generatedApi } from '@/shared/api'
import { debounce } from '@/shared/lib'
import type { AppDispatch, AppState } from '@/shared/lib/redux'
import { createAppAsyncThunk } from '@/shared/lib/redux'
import { mapCartLinesRequest } from '../lib/mapCartLinesRequest'
import { cartSlice, selectProductInCart } from './slice'

const { addOneItem, incVersion, removeItem, removeOneItem } = cartSlice.actions
const { cart: selectCart } = cartSlice.selectors

const SYNC_CART_WITH_SERVER_TIMEOUT_MS = 1500

/**
 * ✅ UX Best practice
 *
 * Use client optimistic update for cart and
 * send request by debounce
 */
const updateCartThunk = createAppAsyncThunk<
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
  const cartLinesRequest = mapCartLinesRequest(Object.values(cart.itemsMap))
  return dispatch(
    updateCartThunk({ items: cartLinesRequest, version: cart.version }),
  )
}, SYNC_CART_WITH_SERVER_TIMEOUT_MS)

/**
 * The single place where a cart mutation is committed: apply the reducer
 * action, bump the version, schedule the debounced server sync.
 * Every cart mutation must go through it — a missed `incVersion`
 * silently breaks server version reconciliation.
 */
function commitCartMutation(
  dispatch: AppDispatch,
  getState: () => AppState,
  action: Parameters<AppDispatch>[0],
) {
  dispatch(action)
  dispatch(incVersion())
  syncCart(dispatch, getState())
}

export const removeCartLine = createAppAsyncThunk<
  void,
  ProductId
>(
  'cart/removeCartLine',
  async (productId: ProductId, { dispatch, getState }) => {
    commitCartMutation(dispatch, getState, removeItem(productId))
  },
)

export const decrementProductQuantity = createAppAsyncThunk<
  void,
  Product
>(
  'cart/decrementProductQuantity',
  async (product: Product, { dispatch, getState }) => {
    commitCartMutation(dispatch, getState, removeOneItem(product))
  },
)

export const addProductToCart = createAppAsyncThunk<
  void,
  Product
>(
  'cart/addProductToCart',
  async (product: Product, { dispatch, getState }) => {
    // Quantity must never exceed the product Stock
    const productInCart = selectProductInCart(getState(), product.id)
    if ((productInCart?.quantity ?? 0) >= product.stock) {
      return
    }

    commitCartMutation(dispatch, getState, addOneItem(product))
  },
)
