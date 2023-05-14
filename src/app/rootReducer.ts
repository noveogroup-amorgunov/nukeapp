import { combineReducers } from '@reduxjs/toolkit'
import { cartSlice } from '@/entities/cart'
import { sessionSlice } from '@/entities/session'
import { themeSlice } from '@/entities/theme'
import { wishlistSlice } from '@/entities/wishlist'
import { categoryPageSlice } from '@/pages/category'
import { baseApi } from '@/shared/api'
import { debugModeSlice } from '@/shared/model'

export const rootReducer = combineReducers({
  [cartSlice.name]: cartSlice.reducer,
  [wishlistSlice.name]: wishlistSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [sessionSlice.name]: sessionSlice.reducer,
  [debugModeSlice.name]: debugModeSlice.reducer,
  [categoryPageSlice.name]: categoryPageSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
})
