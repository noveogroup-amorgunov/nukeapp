import { useNavigate } from 'react-router-dom'
import { logoutThunk } from '../../model/logout'
import { useAppDispatch } from '@/shared/model/hooks'

export function LogoutButton() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    dispatch(logoutThunk())
      .unwrap()
      .finally(() => {
        navigate('/')
      })
  }

  return (
    <a href="#" onClick={onLogout}>
      logout
    </a>
  )
}
