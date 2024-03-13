import { useFeatureSlicedDebug } from '@/shared/lib'
/**
 * 👇 ATTENTION (FSD)
 *
 * By default cross imports on widgets level are not allowed
 * But there approach have a lot of duplicate logic and prop-hell
 * So cross imports on widgets are сonscious action in this project
 * @see https://github.com/noveogroup-amorgunov/nukeapp/blob/main/docs/architecture.md#widgets-cross-imports
 */
import { ProductList } from '@/widgets/ProductList'
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
      <ProductList isFetching={isFetching} products={data} />
    </div>
  )
}
