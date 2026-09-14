import { skipToken } from '@reduxjs/toolkit/query'
import { Link } from 'react-router-dom'
import { selectTotalQuantity } from '@/entities/cart'
import { useFeatureToggle } from '@/entities/featureToggle'
import { selectIsAuthorized } from '@/entities/session'
import { ChangeTheme } from '@/entities/theme'
import {
  selectProductIdsInWishlist,
  useGetWishlistProductsQuery,
} from '@/entities/wishlist'
import { useGetCartQuery } from '@/shared/api'
import { useAppSelector } from '@/shared/redux'
import { Icon, IconButton } from '@/shared/ui'
import { LayoutUserProfile } from '../LayoutUserProfile/LayoutUserProfile'
import css from './LayoutHeaderIcons.module.css'

export function LayoutHeaderIcons() {
  const darkModeIsEnabled = useFeatureToggle('darkMode')
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const productsInCartQuantity = useAppSelector(selectTotalQuantity)
  const productIdsInWishlist = useAppSelector(selectProductIdsInWishlist)

  useGetWishlistProductsQuery(isAuthorized ? undefined : skipToken)
  useGetCartQuery(isAuthorized ? undefined : skipToken)

  return (
    <div data-fsd="app/LayoutHeaderIcons" className={css.root}>
      {isAuthorized && (
        <IconButton asChild count={productsInCartQuantity}>
          <Link to="/user/cart">
            <Icon type="bag" />
          </Link>
        </IconButton>
      )}
      {isAuthorized && (
        <IconButton asChild count={productIdsInWishlist.length}>
          <Link to="/user/wishlist">
            <Icon type="like" />
          </Link>
        </IconButton>
      )}
      <LayoutUserProfile />
      {darkModeIsEnabled && <ChangeTheme />}
    </div>
  )
}
