import { createSelector, createSlice } from '@reduxjs/toolkit'
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

// ponytail: `true` fallback matches mock defaults; revisit if defaults move to config
const flagFallback: FeatureToggle = {
  darkMode: true,
  productsSort: true,
  debugMode: true,
}

const selectValues = (state: FeatureFlagsSlice) => state.values
const selectOverrides = (state: FeatureFlagsSlice) => state.overrides

const slice = createSlice({
  name: 'featureFlags',
  initialState,
  selectors: {
    values: selectValues,
    overrides: selectOverrides,
    effectiveFlags: createSelector(
      selectValues,
      selectOverrides,
      (values, overrides) => ({ ...flagFallback, ...values, ...overrides }),
    ),
  },
  reducers: {
    setFetched: (state, action: PayloadAction<FeatureToggle>) => {
      state.values = action.payload
    },
    toggleOverride: (state, action: PayloadAction<Keys<FeatureToggle>>) => {
      const flag = action.payload
      const current = state.overrides[flag] ?? state.values?.[flag] ?? flagFallback[flag]
      state.overrides[flag] = !current
    },
  },
})

declare module '@/shared/redux/model/types' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface LazyLoadedReduxSlices extends WithSlice<typeof slice> {}
}

export const featureFlagsSlice = slice.injectInto(rootReducer)
