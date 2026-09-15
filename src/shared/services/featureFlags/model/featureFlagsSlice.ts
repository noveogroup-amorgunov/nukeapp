import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, WithSlice } from '@reduxjs/toolkit'
import type { FeatureToggle } from '@/shared/api'
import { rootReducer } from '@/shared/redux'

type FeatureFlagsSlice = {
  values: FeatureToggle | null
  overrides: Partial<FeatureToggle>
}

const initialState: FeatureFlagsSlice = {
  values: null,
  overrides: {},
}

const slice = createSlice({
  name: 'featureFlags',
  initialState,
  selectors: {
    values: state => state.values,
    overrides: state => state.overrides,
  },
  reducers: {
    setFetched: (state, action: PayloadAction<FeatureToggle>) => {
      state.values = action.payload
    },
    toggleOverride: (state, action: PayloadAction<Keys<FeatureToggle>>) => {
      const flag = action.payload
      // ponytail: `true` fallback matches mock defaults; revisit if defaults move to config
      state.overrides[flag] = !(state.overrides[flag] ?? state.values?.[flag] ?? true)
    },
  },
})

declare module '@/shared/redux/model/types' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface LazyLoadedReduxSlices extends WithSlice<typeof slice> {}
}

export const featureFlagsSlice = slice.injectInto(rootReducer)
