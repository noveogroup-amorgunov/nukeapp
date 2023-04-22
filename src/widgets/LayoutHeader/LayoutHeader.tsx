import { type ReactNode } from 'react'
import { useFeatureSlicedDebug } from '@/shared/modules/DebugMode/lib/useFeatureSlicedDebug'
import css from './LayoutHeader.module.css'

type Props = {
  logotypeSlot: ReactNode
  rightContentSlot: ReactNode
}

export function LayoutHeader(props: Props) {
  const { rootAttributes } = useFeatureSlicedDebug('widget/LayoutHeader')

  return (
    <header className={css.root} {...rootAttributes}>
      {props.logotypeSlot}
      <div className={css.right}>{props.rightContentSlot}</div>
    </header>
  )
}
