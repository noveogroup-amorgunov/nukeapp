import { debugModeSlice } from '../Layout/model/debugModeSlice'

export { Layout } from './ui/Layout/Layout'
export { DebugModeProvider } from './ui/DebugModeProvider/DebugModeProvider'

export const { isEnabled: selectIsDebugModeEnabled } = debugModeSlice.selectors
export const { toggle: toggleDebugMode } = debugModeSlice.actions
