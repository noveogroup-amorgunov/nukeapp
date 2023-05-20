import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addOneItem,
  removeOneItem,
  removeProductFromCart,
} from '@/entities/cart'
import type { Product, ProductId } from '@/entities/product'

export const removeAllProductFromCartThunk = createAsyncThunk<
  void,
  ProductId,
  { state: RootState }
>(
  // TODO: naming
  'cart/removeAllProductFromCartThunk',
  async (productId: ProductId, { dispatch, getState }) => {
    dispatch(removeProductFromCart(productId))
  }
)

// TODO Add server sync
export const removeProductFromCartThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>(
  'cart/removeProductFromCartThunk',
  async (product: Product, { dispatch, getState }) => {
    dispatch(removeOneItem(product))
  }
)

// TODO Add server sync
export const addProductToCartThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>('cart/addProductToCart', async (product: Product, { dispatch, getState }) => {
  dispatch(addOneItem(product))
})
