import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { sessionSlice } from '@/entities/session'
import { themeSlice } from '@/entities/theme'
import { logoutMiddleware } from '@/features/session/logout'
import { baseApi } from '@/shared/api'
import { rootReducer } from '@/shared/lib/store'
import { debugModeSlice } from '@/widgets/DebugModeToggler'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [sessionSlice.name, debugModeSlice.name, themeSlice.name],
}

export function makeStore() {
  const store = configureStore({
    reducer: persistReducer(
      persistConfig,
      rootReducer,
    ),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware, logoutMiddleware.middleware),
  })

  setupListeners(store.dispatch)

  return store
}

export const appStore = makeStore()
export const persistedStore = persistStore(appStore)
