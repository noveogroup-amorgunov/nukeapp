import { usePopularProductsQuery } from '@/entities/product'
import { useFeatureSlicedDebug } from '@/shared/lib'
import { ProductList } from '@/widgets/ProductList'
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
