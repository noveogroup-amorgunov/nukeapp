import { AdBlock } from '../../@fractal-widgets/AdBlock'
import { CategoryPopularList } from '../CategoryPopularList/CategoryPopularList'
import { ProductPopularList } from '../ProductPopularList/ProductPopularList'
import css from './Page.module.css'

export function MainPage() {
  return (
    <div className={css.container} data-fsd="page/main/Page">
      <div className={css.content}>
        <CategoryPopularList />
        <ProductPopularList />
      </div>
      <aside className={css.sidebar}>
        <AdBlock />
      </aside>
    </div>
  )
}
