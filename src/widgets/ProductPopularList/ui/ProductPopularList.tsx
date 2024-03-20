import { useFeatureSlicedDebug } from '@/shared/lib'
/**
 * 👇 ATTENTION (FSD Custom feature)
 *
 * By default cross imports on widgets level are not allowed.
 * In classic FSD you need move widget to entity level (entities/product/ui/BaseProduct),
 * but there approach have a lot of duplicate logic and prop-hell (dont forget DRY).
 *
 * So to solve this problem there is a new layer for base widgets (widgets/Base*),
 * which allow import them in other slices in this project.
 * For example you can import widgets/BaseProductList in other widgets
 *
 * @see https://github.com/noveogroup-amorgunov/nukeapp/blob/main/docs/en/architecture.md#widgets-cross-imports
 */
import { BaseProductList } from '@/widgets/BaseProductList'
import { usePopularProductsQuery } from '../api/widgetProductPopularListApi'
import css from './ProductPopularList.module.css'

export function ProductPopularList() {
  const { rootAttributes } = useFeatureSlicedDebug('widget/ProductPopularList')
  const { data = [], isFetching } = usePopularProductsQuery()

  if (data.length < 1) {
    return null
  }

  return (
    <div className={css.root} {...rootAttributes}>
      <h2>Featured products</h2>
      <BaseProductList isFetching={isFetching} products={data} />
    </div>
  )
}
