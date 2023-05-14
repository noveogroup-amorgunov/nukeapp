import { createAsyncThunk } from '@reduxjs/toolkit'
import { addOneItem, removeOneItem } from '@/entities/cart'
import type { Product } from '@/entities/product'

// TODO Add server sync
export const removeProductToCartThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>(
  'cart/removeProductToCartThunk',
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
