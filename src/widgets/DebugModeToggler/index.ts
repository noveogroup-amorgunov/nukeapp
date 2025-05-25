import { debugModeSlice } from './model/slice'

export { DebugModeToggler } from './ui/DebugModeToggler'
export { debugModeSlice } from './model/slice'

export const { isEnabled: selectIsDebugModeEnabled } = debugModeSlice.selectors
