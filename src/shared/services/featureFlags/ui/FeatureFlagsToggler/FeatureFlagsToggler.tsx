import { useModal } from '@ebay/nice-modal-react'
import { Icon, IconButton } from '@/shared/ui'
import { FeatureFlagsModal } from '../FeatureFlagsModal/FeatureFlagsModal'
import css from './FeatureFlagsToggler.module.css'

export function FeatureFlagsToggler() {
  const modal = useModal(FeatureFlagsModal)

  return (
    <div className={css.root}>
      <IconButton
        className={css.button}
        aria-label="Open feature flags"
        variant="primary"
        onClick={() => modal.show()}
      >
        <Icon type="cpu" />
      </IconButton>
    </div>
  )
}
