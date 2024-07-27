import { combineSlices } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api'

export const rootReducer = combineSlices(baseApi)
