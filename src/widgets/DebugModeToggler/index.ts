import { debugModeSlice } from './model/slice'

export { DebugModeToggler } from './ui/DebugModeToggler'
export { debugModeSlice } from './model/slice'

export const selectIsEnabledDebugMode = debugModeSlice.selectors.isEnabled
export const toggleDebugMode = debugModeSlice.actions.toggle
