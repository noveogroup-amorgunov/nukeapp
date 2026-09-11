import type { ReactNode } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { Link } from 'react-router-dom'
import { useCartQuery } from '@/entities/cart'
import { useFeatureToggle } from '@/entities/featureToggle'
import { selectIsAuthorized } from '@/entities/session'
import { ChangeTheme } from '@/entities/theme'
import { useWishlistProductsQuery } from '@/entities/wishlist'
import { useAppSelector } from '@/shared/redux'
import { LogoV2 } from '@/shared/ui'
import css from './LayoutHeader.module.css'

type Props = {
  rightContentSlot: ReactNode
}

export function LayoutHeader(props: Props) {
  const darkModeIsEnabled = useFeatureToggle('darkMode')
  const isAuthorized = useAppSelector(selectIsAuthorized)

  useWishlistProductsQuery(isAuthorized ? undefined : skipToken)
  useCartQuery(isAuthorized ? undefined : skipToken)

  return (
    <header data-fsd="widget/LayoutHeader" className={css.root}>
      <Link to="/">
        <LogoV2 />
      </Link>
      <div className={css.right}>
        {props.rightContentSlot}
        {darkModeIsEnabled && <ChangeTheme />}
      </div>
    </header>
  )
}
