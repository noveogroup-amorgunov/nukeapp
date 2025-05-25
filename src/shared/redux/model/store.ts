import { configureStore, createDynamicMiddleware } from '@reduxjs/toolkit'
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
import { baseApi } from '@/shared/api'
import { rootReducer } from './rootReducer'

export const dynamicMiddleware = createDynamicMiddleware()

const persistConfig = {
  key: 'root',
  storage,
  // FIXME: inject to makeStore from @/app/appEntry.tsx
  whitelist: ['session', 'theme', 'debugMode'],
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
      }).concat(
        baseApi.middleware,
        dynamicMiddleware.middleware,
      ),
  })

  setupListeners(store.dispatch)

  return store
}

export const appStore = makeStore()
export const persistedStore = persistStore(appStore)

export type AppState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
