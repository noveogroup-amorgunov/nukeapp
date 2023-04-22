import { Link } from 'react-router-dom'
import { useFeatureSlicedDebug } from '@/shared/modules/DebugMode/lib/useFeatureSlicedDebug'
import css from './Logo.module.css'

export function Logo() {
  const { rootAttributes } =
    useFeatureSlicedDebug<HTMLAnchorElement>('widget/Logo')

  return (
    <Link to={'/'} {...rootAttributes}>
      <div className={css.root}></div>
    </Link>
  )
}
