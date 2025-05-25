import { combineSlices } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api'
import type { LazyLoadedReduxSlices } from './types'

export const rootReducer = combineSlices(baseApi).withLazyLoadedSlices<LazyLoadedReduxSlices>()
