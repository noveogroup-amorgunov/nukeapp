import type { PayloadAction, WithSlice } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { ProductSortBy } from '@/features/product/sortBy'
import { rootReducer } from '@/shared/redux'

type CategoryPageSliceState = {
  sortBy: ProductSortBy
}

const initialState: CategoryPageSliceState = {
  sortBy: 'Featured',
}

export const slice = createSlice({
  name: 'categoryPage',
  initialState,
  selectors: {
    sortBy: (state: CategoryPageSliceState) => state.sortBy,
  },
  reducers: {
    changeSortBy: (state, action: PayloadAction<ProductSortBy>) => {
      state.sortBy = action.payload
    },
  },
})

declare module '@/shared/redux/model/types' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface LazyLoadedReduxSlices extends WithSlice<typeof slice> {}
}

export const categoryPageSlice = slice.injectInto(rootReducer)
