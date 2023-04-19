import { combineReducers } from '@reduxjs/toolkit'
import { sessionSlice } from '@/entities/session/model/slice'
import { wishlistSlice } from '@/entities/wishlist/model/slice'
import { baseApi } from '@/shared/api/baseApi'
import { widgetSlice } from '@/widgets/DebugMode/model/slice'

export const rootReducer = combineReducers({
  [wishlistSlice.name]: wishlistSlice.reducer,
  [sessionSlice.name]: sessionSlice.reducer,
  [widgetSlice.name]: widgetSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
})
