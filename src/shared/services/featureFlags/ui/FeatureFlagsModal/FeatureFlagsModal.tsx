import { create as createModal } from '@ebay/nice-modal-react'
import type { FeatureToggle } from '@/shared/api'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { Modal, Text } from '@/shared/ui'
import { featureFlagsSlice } from '../../model/featureFlagsSlice'
import css from './FeatureFlagsModal.module.css'

const flags: Record<Keys<FeatureToggle>, string> = {
  darkMode: 'Dark mode',
  productsSort: 'Products sort',
  debugMode: 'Debug mode',
}

function FeatureFlagsModalPresenter() {
  const dispatch = useAppDispatch()
  const effectiveFlags = useAppSelector(featureFlagsSlice.selectors.effectiveFlags)

  return (
    <Modal>
      <Text variant="BodyMedium" color="primary">
        Feature flags
      </Text>
      <ul className={css.list}>
        {(Object.keys(flags) as Keys<FeatureToggle>[]).map((flag) => {
          return (
            <li key={flag}>
              <label className={css.label}>
                <input
                  type="checkbox"
                  checked={effectiveFlags[flag]}
                  onChange={() => dispatch(featureFlagsSlice.actions.toggleOverride(flag))}
                />
                {flags[flag]}
              </label>
            </li>
          )
        })}
      </ul>
    </Modal>
  )
}

export const FeatureFlagsModal = createModal(FeatureFlagsModalPresenter)
