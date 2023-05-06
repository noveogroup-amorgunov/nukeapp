// import { useParams } from 'react-router-dom'
// import { useCategoryDetailsQuery } from '@/entities/category'
// import { ProductList } from '@/widgets/ProductList'
import css from './css.module.css'

export function ProductPage() {
  // const { productId } = useParams<{ productId: string }>()

  // const { data, isFetching } = useProductDetailsQuery(
  //   Number.parseInt(categoryId ?? '1', 10)
  // )

  // if (isFetching) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   )
  // }

  // if (!data?.products) {
  //   return null
  // }

  return (
    <div className={css.root}>
      <div className={css.images}>
        <img
          src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f655b4fb-35e9-4a63-acf8-c02dfd78cfda/zoom-fly-5-road-running-shoes-hTNv2r.png"
          alt="Nike Zoom Fly 5 Men's Road Running Shoes"
        />
        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/a14cc209-7260-4d40-9256-cff0ad068580/zoom-fly-5-road-running-shoes-hTNv2r.png" />
        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ea348977-3c45-499a-81ac-65faed5a7a65/zoom-fly-5-road-running-shoes-hTNv2r.png" />
        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/a905ed37-b430-4cb1-876f-b57ec1563f0c/zoom-fly-5-road-running-shoes-hTNv2r.png" />
      </div>
      <div className={css.content}>
        <div className="text_2xl text_bold">Nike Zoom Fly 5</div>
        <div className="text_base text_bold">Mens Road Running Shoes</div>
        <div className="text_bold">$210</div>
      </div>
    </div>
  )
}
