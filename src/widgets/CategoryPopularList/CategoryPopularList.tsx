import { useMemo } from 'react'
import { usePopularCategoriesQuery } from '@/entities/category/api/categoryApi'
import { CategoryCard } from '@/entities/category/ui/CategoryCard/CategoryCard'
import { useFeatureSlicedDebug } from '@/shared/modules/DebugMode/lib/useFeatureSlicedDebug'
import css from './CategoryPopularList.module.css'

export function CategoryPopularList() {
  const { rootAttributes } = useFeatureSlicedDebug('widget/CategoryPopularList')

  const { data: categories = [], isLoading } = usePopularCategoriesQuery()
  const items = useMemo(() => categories.slice(0, 3), [categories])

  if (isLoading) {
    return <div className={css.root}>isloading</div>
  }

  if (items.length < 3) {
    return null
  }

  return (
    <div className={css.root} {...rootAttributes}>
      <h2>New Collections</h2>
      <div className={css.content}>
        {items.map((category) => (
          <div key={category.id} className={css.item}>
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  )
}
