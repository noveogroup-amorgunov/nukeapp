import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { Icon, IconButton } from '@/shared/ui'
import { debugModeSlice } from '../../model/debugModeSlice'
import css from './DebugModeToggler.module.css'

export function DebugModeToggler() {
  const isDebugModeEnabled = useAppSelector(debugModeSlice.selectors.isEnabled)
  const dispatch = useAppDispatch()

  return (
    <div className={css.root}>
      <IconButton
        className={css.button}
        aria-label={isDebugModeEnabled ? 'Disable debug mode' : 'Enable debug mode'}
        variant={isDebugModeEnabled ? 'primary' : 'secondary'}
        onClick={() => dispatch(debugModeSlice.actions.toggle())}
      >
        <Icon type="cpu" />
      </IconButton>
    </div>
  )
}
