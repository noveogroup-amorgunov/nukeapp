import { skipToken } from '@reduxjs/toolkit/query'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { selectTotalQuantity } from '@/entities/cart'
import { selectIsAuthorized } from '@/entities/session'
import { useMeQuery } from '@/entities/user'
import { selectProductIdsInWishlist } from '@/entities/wishlist'
import { LogoutButton } from '@/features/session/logout'
import { useAppSelector } from '@/shared/redux'
import { Icon } from '@/shared/ui'
import css from './LayoutProfileCard.module.css'

export function LayoutProfileCard() {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const productsInCartQuantity = useAppSelector(selectTotalQuantity)
  const productIdsInWishlist = useAppSelector(selectProductIdsInWishlist)
  const { data: profileData } = useMeQuery(
    isAuthorized ? undefined : skipToken,
    {
      skip: !isAuthorized,
    },
  )

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
        <Link
          to="/user/wishlist"
          className={cn({ [css.icon]: productIdsInWishlist.length > 0 })}
          data-size={productIdsInWishlist.length}
        >
          <Icon type="like" />
        </Link>
      )}
      {isAuthorized && (
        <Link
          to="/user/cart"
          className={cn({ [css.icon]: productsInCartQuantity > 0 })}
          data-size={productsInCartQuantity}
        >
          <Icon type="bag" />
        </Link>
      )}
    </div>
  )
}
