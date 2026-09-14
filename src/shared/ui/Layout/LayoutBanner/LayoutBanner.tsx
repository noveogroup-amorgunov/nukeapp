import type { ReactNode } from 'react'
import { Icon } from '../../Icon/Icon'
import { IconButton } from '../../IconButton/IconButton'
import { Text } from '../../Text/Text'
import { textColors } from '../../tokens'
import css from './LayoutBanner.module.css'

type Props = {
  children: ReactNode
  onClose: () => void
}

export function LayoutBanner({ children, onClose }: Props) {
  return (
    <div className={css.root}>
      <Text color="primaryInverse" variant="BodySmall">{children}</Text>
      <div className={css.close}>
        <IconButton aria-label="Close banner" onClick={onClose} variant="ghost">
          <Icon type="x" color={textColors.primaryInverse} />
        </IconButton>
      </div>
    </div>
  )
}
