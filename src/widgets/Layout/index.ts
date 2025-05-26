import { debugModeSlice } from '../Layout/model/debugModeSlice'

export { DebugModeProvider } from './ui/DebugModeProvider/DebugModeProvider'
export { Layout } from './ui/Layout/Layout'

export const { isEnabled: selectIsDebugModeEnabled } = debugModeSlice.selectors
export const { toggle: toggleDebugMode } = debugModeSlice.actions
