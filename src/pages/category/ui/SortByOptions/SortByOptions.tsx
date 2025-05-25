import cn from 'classnames'
import { productSortByNamesMap } from '../../model/consts'
import type { ProductSortBy } from '../../model/types'
import css from './SortByOptions.module.css'

type Prop = {
  onChange: (value: ProductSortBy) => void
  selected?: ProductSortBy
}

const OPTIONS = Object.keys(productSortByNamesMap) as ProductSortBy[]

export function SortByOptions({ selected, onChange }: Prop) {
  return (
    <div className={css.root}>
      {OPTIONS.map(key => (
        <div
          key={key}
          className={cn(
            css.option,
            selected === key && css.optionSelected,
            'text_base',
          )}
          onClick={() => onChange(key)}
        >
          {productSortByNamesMap[key]}
        </div>
      ))}
    </div>
  )
}
