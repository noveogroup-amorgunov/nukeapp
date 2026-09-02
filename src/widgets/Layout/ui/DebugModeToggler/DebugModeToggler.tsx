import { debugModeSlice } from '../../model/debugModeSlice'
import css from './DebugModeToggler.module.css'
import { useAppDispatch, useAppSelector } from '@/shared/redux'

export function DebugModeToggler() {
  const isDebugModeEnabled = useAppSelector(debugModeSlice.selectors.isEnabled)
  const dispatch = useAppDispatch()

  return (
    <div className={css.root}>
      <button onClick={() => dispatch(debugModeSlice.actions.toggle())}>
        {isDebugModeEnabled ? '✅ debug mode' : '☑️ debug mode'}
      </button>
    </div>
  )
}
