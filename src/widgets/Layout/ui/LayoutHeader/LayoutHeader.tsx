import type { ReactNode } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetCartQuery } from '@/entities/cart'
import { useFeatureToggle } from '@/entities/featureToggle'
import { selectIsAuthorized } from '@/entities/session'
import { ChangeTheme } from '@/entities/theme'
import { useGetWishlistProductsQuery } from '@/entities/wishlist'
import { useAppSelector } from '@/shared/redux'
import { Logo } from '../Logo/Logo'
import css from './LayoutHeader.module.css'

type Props = {
  rightContentSlot: ReactNode
}

export function LayoutHeader(props: Props) {
  const darkModeIsEnabled = useFeatureToggle('canTurnDarkMode')
  const isAuthorized = useAppSelector(selectIsAuthorized)

  useGetWishlistProductsQuery(isAuthorized ? undefined : skipToken)
  useGetCartQuery(isAuthorized ? undefined : skipToken)

  return (
    <header data-fsd="widget/LayoutHeader" className={css.root}>
      <Logo />
      <div className={css.right}>
        {props.rightContentSlot}
        {darkModeIsEnabled && <ChangeTheme />}
      </div>
    </header>
  )
}
