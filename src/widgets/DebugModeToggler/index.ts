import { debugModeSlice } from './model/slice'

export { DebugModeProvider } from './ui/DebugModeProvider'
export { DebugModeToggler } from './ui/DebugModeToggler'
export { debugModeSlice } from './model/slice'

export const { isEnabled: selectIsDebugModeEnabled } = debugModeSlice.selectors
export const { toggle: toggleDebugMode } = debugModeSlice.actions
