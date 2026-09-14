import { skipToken } from '@reduxjs/toolkit/query'
import { Link } from 'react-router-dom'
import { selectTotalQuantity } from '@/entities/cart'
import { selectIsAuthorized } from '@/entities/session'
import { selectProductIdsInWishlist } from '@/entities/wishlist'
import { LogoutButton } from '@/features/session/logout'
import { useGetMeQuery } from '@/shared/api'
import { useAppSelector } from '@/shared/redux'
import { Icon, IconButton } from '@/shared/ui'
import css from './LayoutProfileCard.module.css'

export function LayoutProfileCard() {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const productsInCartQuantity = useAppSelector(selectTotalQuantity)
  const productIdsInWishlist = useAppSelector(selectProductIdsInWishlist)
  const { data: profileData } = useGetMeQuery(isAuthorized ? undefined : skipToken)

  if (!isAuthorized) {
    return (
      <div data-fsd="widget/LayoutProfileCard">
        <Link to="/login">login</Link>
      </div>
    )
  }

  return (
    <div data-fsd="widget/LayoutProfileCard" className={css.root}>
      <div>
        Hey,
        {' '}
        <span className="text_bold">{profileData?.email}</span>
        !&nbsp;
        <LogoutButton />
      </div>
      {isAuthorized && (
        <IconButton asChild count={productIdsInWishlist.length}>
          <Link to="/user/wishlist">
            <Icon type="like" />
          </Link>
        </IconButton>
      )}
      {isAuthorized && (
        <IconButton asChild count={productsInCartQuantity}>
          <Link to="/user/cart">
            <Icon type="bag" />
          </Link>
        </IconButton>
      )}
    </div>
  )
}
