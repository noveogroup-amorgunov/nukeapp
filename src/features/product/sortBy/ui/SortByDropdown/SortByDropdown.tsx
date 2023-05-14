import Dropdown from 'rc-dropdown'
import { useState } from 'react'
import { useFeatureSlicedDebug } from '@/shared/lib'
import { Icon } from '@/shared/ui'
import { productSortByNamesMap } from '../../model/consts'
import { type ProductSortBy } from '../../model/types'
import { SortByOptions } from '../SortByOptions/SortByOptions'
import css from './SortByDropdown.module.css'

type Props = {
  defaultSortBy?: ProductSortBy
  onChange: (value: ProductSortBy) => void
}

export function SortByDropdown(props: Props) {
  const { rootAttributes } = useFeatureSlicedDebug(
    'feature/product/SortByDropdown'
  )
  const [isVisibleSortByDropdown, setIsVisibleSortByDropdown] = useState(false)
  const [sortBy, setSortBy] = useState<ProductSortBy>(
    props.defaultSortBy ?? 'Featured'
  )

  return (
    <Dropdown
      trigger={['click']}
      overlay={() => (
        <SortByOptions
          selected={sortBy}
          onChange={(sortBy: ProductSortBy) => {
            setSortBy(sortBy)
            props.onChange(sortBy)
            setIsVisibleSortByDropdown(false)
          }}
        />
      )}
      animation="slide-up"
      onVisibleChange={(isVisible) => setIsVisibleSortByDropdown(isVisible)}
    >
      <div {...rootAttributes} className={css.control}>
        <span className="">Sort By:</span>{' '}
        <span className={css.controlValue}>
          {productSortByNamesMap[sortBy]}
        </span>
        <Icon
          className={
            isVisibleSortByDropdown ? css.controlIconOpened : css.controlIcon
          }
          type="chevronDown"
        />
      </div>
    </Dropdown>
  )
}
