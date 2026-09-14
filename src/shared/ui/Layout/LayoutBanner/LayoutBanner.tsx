import { useState } from 'react'
import type { ReactNode } from 'react'
import { Icon } from '../../Icon/Icon'
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
      <span className="text_sm text_bold">{children}</span>
      <button
        aria-label="Close banner"
        className={css.close}
        onClick={() => setIsVisible(false)}
        type="button"
      >
        <Icon type="x" />
      </button>
    </div>
  )
}
