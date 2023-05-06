import { matchRoutes, useLocation } from 'react-router-dom'
import { selectIsAuthorize } from '@/entities/session'
import { useFeatureSlicedDebug } from '@/shared/lib'
import { useAppSelector } from '@/shared/model'
import { ProductWishlistList } from '@/widgets/ProductWishlistList'
import css from './LayoutSidebar.module.css'

const routes = [{ path: '/product/:productId' }]

// TODO: Seperate layout
const useIsProductPage = () => {
  const location = useLocation()
  const result = matchRoutes(routes, location)

  if (!result) {
    return false
  }

  return true
}

export function LayoutSidebar() {
  const { rootAttributes } = useFeatureSlicedDebug('widget/LayoutSidebar')
  const isAuthorize = useAppSelector(selectIsAuthorize)
  const isProductPage = useIsProductPage()

  if (!isAuthorize || isProductPage) {
    return null
  }

  return (
    <aside className={css.root} {...rootAttributes}>
      <ProductWishlistList />
    </aside>
  )
}
