import { useState } from 'react'
import { DropdownMenu, Icon } from '@/shared/ui'
import { productSortByNamesMap } from '../../model/consts'
import type { ProductSortBy } from '../../model/types'
import css from './SortByDropdown.module.css'

const sortByItems = Object.entries(productSortByNamesMap).map(
  ([value, label]) => ({ value, label }),
)

type Props = {
  defaultSortBy?: ProductSortBy
  onChange: (value: ProductSortBy) => void
}

export function SortByDropdown(props: Props) {
  const [sortBy, setSortBy] = useState<ProductSortBy>(
    props.defaultSortBy ?? 'Featured',
  )

  return (
    <DropdownMenu
      items={sortByItems}
      onSelect={(value) => {
        const sortBy = value as ProductSortBy
        setSortBy(sortBy)
        props.onChange(sortBy)
      }}
      selected={sortBy}
      trigger={(
        <div data-fsd="feature/product/SortByDropdown" className={css.control}>
          <span>Sort By:</span>
          {' '}
          <span className={css.controlValue}>
            {productSortByNamesMap[sortBy]}
          </span>
          <Icon className={css.controlIcon} type="chevronDown" />
        </div>
      )}
    />
  )
}
