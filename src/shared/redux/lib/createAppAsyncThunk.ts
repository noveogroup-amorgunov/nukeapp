import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AppDispatch, AppState } from '../model/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState
  dispatch: AppDispatch
}>()
