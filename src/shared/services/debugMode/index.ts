import { debugModeSlice } from './model/debugModeSlice'

export { DebugModeProvider } from './ui/DebugModeProvider/DebugModeProvider'
export { DebugModeToggler } from './ui/DebugModeToggler/DebugModeToggler'
export { debugModeSlice }

export const { isEnabled: selectIsDebugModeEnabled } = debugModeSlice.selectors
export const { toggle: toggleDebugMode } = debugModeSlice.actions
