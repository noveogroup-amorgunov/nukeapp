import type { ThunkAction, UnknownAction } from '@reduxjs/toolkit'

// eslint-disable-next-line ts/no-explicit-any
export type AppState = any

// eslint-disable-next-line ts/no-explicit-any
export type AppDispatch = any

export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  void,
  UnknownAction
>
