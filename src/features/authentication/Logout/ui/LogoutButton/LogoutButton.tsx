import { useNavigate } from 'react-router-dom'
import { useConfirmModal } from '@/shared/lib'
import { useAppDispatch } from '@/shared/model'
import { logoutThunk } from '../../model/logout'

export function LogoutButton() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const logoutModal = useConfirmModal()

  const onConfirmLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()

    logoutModal.show({
      title: 'Are you sure?',
      onConfirm: () => {
        dispatch(logoutThunk())
          .unwrap()
          .finally(() => {
            logoutModal.remove()
            navigate('/')
          })
      },
      onCancel: () => logoutModal.remove(),
    })
  }

  return (
    <a href="#" onClick={onConfirmLogout}>
      logout
    </a>
  )
}
