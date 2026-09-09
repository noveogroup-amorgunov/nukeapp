import { skipToken } from '@reduxjs/toolkit/query'
import { Link } from 'react-router-dom'
import { selectTotalQuantity } from '@/entities/cart'
import { selectIsAuthorized } from '@/entities/session'
import { useMeQuery } from '@/entities/user'
import { selectProductIdsInWishlist } from '@/entities/wishlist'
import { LogoutButton } from '@/features/session/logout'
import { useAppSelector } from '@/shared/redux'
import { Icon, ToggleIcon } from '@/shared/ui'
import css from './LayoutProfileCard.module.css'

export function LayoutProfileCard() {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const productsInCartQuantity = useAppSelector(selectTotalQuantity)
  const productIdsInWishlist = useAppSelector(selectProductIdsInWishlist)
  const { data: profileData } = useMeQuery(isAuthorized ? undefined : skipToken)

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
        <ToggleIcon asChild count={productIdsInWishlist.length}>
          <Link to="/user/wishlist">
            <Icon type="like" />
          </Link>
        </ToggleIcon>
      )}
      {isAuthorized && (
        <ToggleIcon asChild count={productsInCartQuantity}>
          <Link to="/user/cart">
            <Icon type="bag" />
          </Link>
        </ToggleIcon>
      )}
    </div>
  )
}
