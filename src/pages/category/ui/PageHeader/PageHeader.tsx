import { type Category } from '@/entities/category'
import 'rc-dropdown/assets/index.css'
import { type ProductSortBy, SortByDropdown } from '@/features/product/sortBy'
import { useAppDispatch, useAppSelector } from '@/shared/model'
import { changeSortBy, selectSortBy } from '../../model/slice'
import css from './PageHeader.module.css'

type Props = {
  category: Category
}

export function PageHeader(props: Props) {
  const dispatch = useAppDispatch()
  const sortBy = useAppSelector(selectSortBy)

  return (
    <div className={css.root}>
      <h1 className="text_2xl">{props.category.name}</h1>
      <div className={css.actions}>
        <SortByDropdown
          defaultSortBy={sortBy}
          onChange={(sortBy: ProductSortBy) => dispatch(changeSortBy(sortBy))}
        />
      </div>
    </div>
  )
}
