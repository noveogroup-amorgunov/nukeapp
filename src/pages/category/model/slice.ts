import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { ProductSortBy } from '@/features/product/sortBy'

type CategoryPageSliceState = {
  sortBy: ProductSortBy
}

const initialState: CategoryPageSliceState = {
  sortBy: 'Featured',
}

export const categoryPageSlice = createSlice({
  name: 'categoryPage',
  initialState,
  reducers: {
    changeSortBy: (state, action: PayloadAction<ProductSortBy>) => {
      state.sortBy = action.payload
    },
  },
})

export const { changeSortBy } = categoryPageSlice.actions

export const selectSortBy = (state: RootState) => state.categoryPage.sortBy
