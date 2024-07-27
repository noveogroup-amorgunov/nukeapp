import { useAppDispatch, useAppSelector } from '@/shared/lib/store'
import { debugModeSlice } from '../model/slice'
import css from './DebugModeToggler.module.css'

export function DebugModeToggler() {
  const isDebugMode = useAppSelector(debugModeSlice.selectors.isEnabled)
  const dispatch = useAppDispatch()

  return (
    <div className={css.root}>
      <button onClick={() => dispatch(debugModeSlice.actions.toggle())}>
        {isDebugMode ? '✅ debug mode' : '☑️ debug mode'}
      </button>
    </div>
  )
}
