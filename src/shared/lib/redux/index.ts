import type { createDynamicMiddleware } from '@reduxjs/toolkit'
import type { AppDispatch, AppState } from './store/store'
import { dynamicMiddleware as dynamicMiddlewareNotTyped } from './store/store'

export { createAppAsyncThunk } from './hooks/createAppAsyncThunk'
export { useAppDispatch } from './hooks/useAppDispatch'
export { useAppSelector } from './hooks/useAppSelector'
export { rootReducer } from './store/rootReducer'
export type { AppDispatch, AppState } from './store/store'
export { appStore } from './store/store'
export { makeStore } from './store/store'
export type { LazyLoadedReduxSlices } from './store/types'

// Can't not typing in place in `./store/store.ts`,
// bacause we get recursive type of AppState
export const dynamicMiddleware = dynamicMiddlewareNotTyped as ReturnType<typeof createDynamicMiddleware<AppState, AppDispatch>>
