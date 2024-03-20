import { type ReactNode } from 'react'
import css from './PageHeader.module.css'

type Props = {
  title: string
  rightSlot?: ReactNode
}

export function PageHeader(props: Props) {
  return (
    <div className={css.root}>
      <h1 className="text_2xl">{props.title}</h1>
      {props.rightSlot && <div className={css.actions}>{props.rightSlot}</div>}
    </div>
  )
}
