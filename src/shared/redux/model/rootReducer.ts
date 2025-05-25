import { combineSlices } from '@reduxjs/toolkit'
import type { LazyLoadedReduxSlices } from './types'

export const rootReducer
  = combineSlices().withLazyLoadedSlices<LazyLoadedReduxSlices>()
