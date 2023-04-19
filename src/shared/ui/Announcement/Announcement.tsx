import cn from 'classnames'
import { type ReactNode } from 'react'
import css from './Announcement.module.css'

type Props = {
  children: ReactNode
}

export function Announcement({ children }: Props) {
  return (
    <div className={cn(css.root, 'text_base', 'text_bold')}>{children}</div>
  )
}
