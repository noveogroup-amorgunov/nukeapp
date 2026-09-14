import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../../Logo/Logo'
import css from './LayoutHeader.module.css'

type Props = {
  rightContentSlot?: ReactNode
}

export function LayoutHeader(props: Props) {
  return (
    <header className={css.root}>
      <Link to="/">
        <Logo />
      </Link>
      {props.rightContentSlot && (
        <div className={css.right}>{props.rightContentSlot}</div>
      )}
    </header>
  )
}
