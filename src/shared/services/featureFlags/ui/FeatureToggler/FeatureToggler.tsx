import { useModal } from '@ebay/nice-modal-react'
import { Icon, IconButton } from '@/shared/ui'
import { FeatureFlagsModal } from '../FeatureFlagsModal/FeatureFlagsModal'
import css from './FeatureToggler.module.css'

export function FeatureToggler() {
  const modal = useModal(FeatureFlagsModal)

  return (
    <div className={css.root}>
      <IconButton
        className={css.button}
        aria-label="Open feature flags"
        variant="secondary"
        onClick={() => modal.show()}
      >
        <Icon type="cpu" />
      </IconButton>
    </div>
  )
}
