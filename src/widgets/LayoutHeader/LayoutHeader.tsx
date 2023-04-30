import { type ReactNode } from 'react'
import { ChangeTheme } from '@/features/theme/ChangeTheme'
import { useFeatureSlicedDebug } from '@/shared/lib'
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
      <div className={css.right}>
        {props.rightContentSlot}
        <ChangeTheme />
      </div>
    </header>
  )
}
