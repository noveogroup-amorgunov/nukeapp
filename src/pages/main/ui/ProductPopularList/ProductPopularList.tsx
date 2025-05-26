import { BaseProductList } from '@/widgets/BaseProductList'
import { usePopularProductsQuery } from '../../api/productPopularListApi'
import css from './ProductPopularList.module.css'

export function ProductPopularList() {
  const { data = [], isFetching } = usePopularProductsQuery()

  if (data.length < 1) {
    return null
  }

  return (
    <div className={css.root}>
      <h2>Featured products</h2>
      <BaseProductList isFetching={isFetching} products={data} />
    </div>
  )
}
