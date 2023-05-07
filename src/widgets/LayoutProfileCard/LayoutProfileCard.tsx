import { skipToken } from '@reduxjs/toolkit/dist/query'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { selectIsAuthorize, useMeQuery } from '@/entities/session'
import { selectProductIdsInWishlist } from '@/entities/wishlist'
import { LogoutButton } from '@/features/authentication/Logout'
import { useFeatureSlicedDebug } from '@/shared/lib'
import { useAppSelector } from '@/shared/model'
import { Icon } from '@/shared/ui'
import css from './LayoutProfileCard.module.css'

export function LayoutProfileCard() {
  const { rootAttributes } = useFeatureSlicedDebug('widget/LayoutProfileCard')
  const isAuthorized = useAppSelector(selectIsAuthorize)
  const productIdsInWishlist = useAppSelector(selectProductIdsInWishlist)
  const { data: profileData } = useMeQuery(
    isAuthorized ? undefined : skipToken,
    {
      skip: !isAuthorized,
    }
  )

  if (!isAuthorized) {
    return (
      <div {...rootAttributes}>
        <Link to="/login">login</Link>
      </div>
    )
  }

  return (
    <div className={css.root} {...rootAttributes}>
      <div>
        Hello, <span className="text_bold">{profileData?.email}</span>!&nbsp;
        <LogoutButton />
      </div>
      {/* TODO: Change to Link and add wishlist page */}
      {isAuthorized && (
        <div
          className={cn({ [css.icon]: productIdsInWishlist.length > 0 })}
          data-size={productIdsInWishlist.length}
        >
          <Icon type="like" />
        </div>
      )}
    </div>
  )
}
