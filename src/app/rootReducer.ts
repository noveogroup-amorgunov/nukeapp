import { combineReducers } from '@reduxjs/toolkit'
import { sessionSlice } from '@/entities/session'
import { wishlistSlice } from '@/entities/wishlist'
import { baseApi } from '@/shared/api/baseApi'
import { debugModeSlice } from '@/shared/modules/DebugMode/model/slice'

export const rootReducer = combineReducers({
  [wishlistSlice.name]: wishlistSlice.reducer,
  [sessionSlice.name]: sessionSlice.reducer,
  [debugModeSlice.name]: debugModeSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
})
