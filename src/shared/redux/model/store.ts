import { configureStore, createDynamicMiddleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { rememberEnhancer, rememberReducer } from 'redux-remember'
import { rootReducer } from './rootReducer'

export const dynamicMiddleware = createDynamicMiddleware()

const rememberedKeys = ['session', 'theme', 'debugMode']

type MakeStoreOptions = {
  // Persist store to localStorage (disable for storybook/test stores)
  persisted?: boolean
}

export function makeStore({ persisted = true }: MakeStoreOptions = {}) {
  const store = configureStore({
    reducer: rememberReducer(rootReducer),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(dynamicMiddleware.middleware),
    enhancers: getDefaultEnhancers =>
      persisted
        ? getDefaultEnhancers().concat(
            rememberEnhancer(window.localStorage, rememberedKeys),
          )
        : getDefaultEnhancers(),
  })

  setupListeners(store.dispatch)

  return store
}

export const appStore = makeStore()

export type AppState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
