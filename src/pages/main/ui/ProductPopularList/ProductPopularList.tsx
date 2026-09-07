import { useGetPopularProductsQuery } from '@/entities/product'
import { BaseProductList } from '@/widgets/BaseProductList'
import css from './ProductPopularList.module.css'

export function ProductPopularList() {
  const { data = [], isFetching } = useGetPopularProductsQuery()

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
