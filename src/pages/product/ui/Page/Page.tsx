import { Link } from 'react-router-dom'
import { z } from 'zod'
import type { ProductId } from '@/entities/product'
import { useTypedParams } from '@/shared/lib/useTypedParams'
import {
  ProductDetails,
  useProductDetailsQuery,
} from '@/widgets/ProductDetails'

const pageParamsSchema = z.object({
  productId: z.coerce
    .number()
    .positive()
    .transform(value => value as ProductId),
})

export function ProductPage() {
  const { productId } = useTypedParams(pageParamsSchema)
  const { data, isFetching } = useProductDetailsQuery(productId)

  const isNotFound = !isFetching && !data

  if (isNotFound) {
    return (
      <div>
        Product not found, go to
        {' '}
        <Link to="/">main page</Link>
      </div>
    )
  }

  return <ProductDetails productDetails={data} isFetching={isFetching} />
}
