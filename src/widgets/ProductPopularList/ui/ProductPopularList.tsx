import { usePopularProductsQuery } from '@/entities/product/api/productApi'
import { useFeatureSlicedDebug } from '@/widgets/DebugMode/lib/useFeatureSlicedDebug'
import { ProductList } from '@/widgets/ProductList/ProductList'
import css from './ProductPopularList.module.css'

export function ProductPopularList() {
  const { rootAttributes } = useFeatureSlicedDebug('widget/ProductPopularList')
  const { data = [], isFetching } = usePopularProductsQuery()

  if (data.length < 1) {
    return null
  }

  return (
    <div className={css.root} {...rootAttributes}>
      <h2>Popular product list</h2>
      <ProductList isFetching={isFetching} products={data} />
    </div>
  )
}
