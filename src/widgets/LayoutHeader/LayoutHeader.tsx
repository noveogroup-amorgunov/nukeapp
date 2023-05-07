import { skipToken } from '@reduxjs/toolkit/dist/query'
import { type ReactNode } from 'react'
import { selectIsAuthorize } from '@/entities/session'
import { useWishlistProductsQuery } from '@/entities/wishlist'
import { ChangeTheme } from '@/features/theme/ChangeTheme'
import { useFeatureSlicedDebug } from '@/shared/lib'
import { useAppSelector } from '@/shared/model'
import css from './LayoutHeader.module.css'

type Props = {
  logotypeSlot: ReactNode
  rightContentSlot: ReactNode
}

export function LayoutHeader(props: Props) {
  const { rootAttributes } = useFeatureSlicedDebug('widget/LayoutHeader')
  const isAuthorized = useAppSelector(selectIsAuthorize)
  useWishlistProductsQuery(isAuthorized ? undefined : skipToken, {
    skip: !isAuthorized,
  })

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
