import { selectIsAuthorize } from '@/entities/session'
import { useAppSelector } from '@/shared/model/hooks'
import { useFeatureSlicedDebug } from '@/shared/modules/DebugMode/lib/useFeatureSlicedDebug'
import { ProductWishlistList } from '@/widgets/ProductWishlistList'
import css from './LayoutSidebar.module.css'

export function LayoutSidebar() {
  const { rootAttributes } = useFeatureSlicedDebug('widget/LayoutSidebar')
  const isAuthorize = useAppSelector(selectIsAuthorize)

  if (!isAuthorize) {
    return null
  }

  return (
    <aside className={css.root} {...rootAttributes}>
      <ProductWishlistList />
    </aside>
  )
}
