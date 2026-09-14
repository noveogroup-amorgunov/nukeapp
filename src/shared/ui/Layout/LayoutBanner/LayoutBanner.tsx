import { useState } from 'react'
import type { ReactNode } from 'react'
import { Icon } from '../../Icon/Icon'
import { IconButton } from '../../IconButton/IconButton'
import { Text } from '../../Text/Text'
import { textColors } from '../../tokens'
import css from './LayoutBanner.module.css'

type Props = {
  children: ReactNode
}

export function LayoutBanner({ children }: Props) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <div className={css.root}>
      <Text color="primaryInverse" variant="LabelSmall">{children}</Text>
      <div className={css.close}>
        <IconButton aria-label="Close banner" onClick={() => setIsVisible(false)} variant="ghost">
          <Icon type="x" color={textColors.primaryInverse} />
        </IconButton>
      </div>
    </div>
  )
}
