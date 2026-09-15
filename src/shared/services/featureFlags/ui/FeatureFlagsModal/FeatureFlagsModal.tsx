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
  const values = useAppSelector(featureFlagsSlice.selectors.values)
  const overrides = useAppSelector(featureFlagsSlice.selectors.overrides)

  return (
    <Modal>
      <Text variant="BodyMedium" color="primary">
        Feature flags
      </Text>
      <ul className={css.list}>
        {(Object.keys(flags) as Keys<FeatureToggle>[]).map((flag) => {
          const isChecked = overrides[flag] ?? values?.[flag] ?? true

          return (
            <li key={flag} className={css.item}>
              <label className={css.label}>
                <input
                  type="checkbox"
                  checked={isChecked}
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
