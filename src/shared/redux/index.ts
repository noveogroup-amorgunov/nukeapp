import type { createDynamicMiddleware } from '@reduxjs/toolkit'
import type { AppDispatch, AppState } from './model/store'
import { dynamicMiddleware as dynamicMiddlewareNotTyped } from './model/store'

export { useAppDispatch } from './lib/useAppDispatch'
export { useAppSelector } from './lib/useAppSelector'
export type { AppState, AppDispatch } from './model/store'
export { rootReducer } from './model/rootReducer'
export type { LazyLoadedReduxSlices } from './model/types'
export { createAppAsyncThunk } from './lib/createAppAsyncThunk'
export { appStore, persistedStore } from './model/store'
export { makeStore } from './model/store'

export const dynamicMiddleware = dynamicMiddlewareNotTyped as ReturnType<typeof createDynamicMiddleware<AppState, AppDispatch>>
