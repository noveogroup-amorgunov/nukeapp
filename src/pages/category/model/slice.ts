import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { ProductSortBy } from '@/features/product/sortBy'
import { rootReducer } from '@/shared/lib/store'

type CategoryPageSliceState = {
  sortBy: ProductSortBy
}

const initialState: CategoryPageSliceState = {
  sortBy: 'Featured',
}

export const categoryPageSlice = createSlice({
  name: 'categoryPage',
  initialState,
  selectors: {
    sortBy: (state: CategoryPageSliceState) => state.sortBy,
  },
  reducers: {
    change: (state, action: PayloadAction<ProductSortBy>) => {
      state.sortBy = action.payload
    },
  },
})

rootReducer.inject(categoryPageSlice)
