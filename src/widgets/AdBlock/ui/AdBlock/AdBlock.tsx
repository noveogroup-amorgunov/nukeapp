import { useFeatureSlicedDebug } from '@/shared/lib'
import css from './AdBlock.module.css'

export function AdBlock() {
  const { rootAttributes } = useFeatureSlicedDebug('widget/AdBlock')

  return (
    <div {...rootAttributes} className={css.root}>
      ad widget
    </div>
  )
}
