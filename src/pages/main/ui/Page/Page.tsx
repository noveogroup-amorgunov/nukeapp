import { AdBlock } from '../../@fractal-widgets/AdBlock'
import { CategoryPopularList } from '../CategoryPopularList/CategoryPopularList'
import { ProductPopularList } from '../ProductPopularList/ProductPopularList'
import css from './Page.module.css'

export function MainPage() {
  return (
    <div className={css.container}>
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
