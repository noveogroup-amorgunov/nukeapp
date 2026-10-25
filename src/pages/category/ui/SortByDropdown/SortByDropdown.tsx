import { DropdownMenu, Icon } from '@/shared/ui'
import { productSortByNamesMap } from '../../model/consts'
import type { ProductSortBy } from '../../model/types'
import css from './SortByDropdown.module.css'

const sortByItems = Object.entries(productSortByNamesMap).map(
  ([value, label]) => ({ value, label }),
)

type Props = {
  sortBy: ProductSortBy
  onChange: (value: ProductSortBy) => void
}

export function SortByDropdown(props: Props) {
  return (
    <DropdownMenu
      items={sortByItems}
      onSelect={value => props.onChange(value as ProductSortBy)}
      selected={props.sortBy}
      trigger={(
        <div data-fsd="page/category/SortByDropdown" className={css.control}>
          <span>Sort By:</span>
          {' '}
          <span className={css.controlValue}>
            {productSortByNamesMap[props.sortBy]}
          </span>
          <Icon className={css.controlIcon} type="chevronDown" />
        </div>
      )}
    />
  )
}
