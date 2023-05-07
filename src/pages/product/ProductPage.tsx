import { skipToken } from '@reduxjs/toolkit/dist/query'
import { Link, useParams } from 'react-router-dom'
import { type ProductId } from '@/entities/product'
import { useProductDetailsQuery } from '@/entities/product'
import { ProductDetails } from '@/widgets/ProductDetails'

export function ProductPage() {
  const { productId } = useParams<{ productId: string }>()

  // TODO: Add zod validation
  const { data, isFetching } = useProductDetailsQuery(
    productId ? (Number.parseInt(productId, 10) as ProductId) : skipToken,
    { skip: !productId }
  )

  if (!productId || (!isFetching && !data)) {
    return (
      <div>
        Product not found, go to <Link to="/">main page</Link>
      </div>
    )
  }

  return <ProductDetails productDetails={data} isFetching={isFetching} />
}
