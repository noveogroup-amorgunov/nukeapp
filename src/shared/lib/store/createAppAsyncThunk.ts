import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AppDispatch, AppState } from './types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState
  dispatch: AppDispatch
}>()
