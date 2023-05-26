import { Link } from 'react-router-dom'
import css from './Logo.module.css'

export function Logo() {
  return (
    <Link to={'/'}>
      <div className={css.root}></div>
    </Link>
  )
}
