import { useAppDispatch } from '@/shared/redux'
import { useConfirmModal } from '@/shared/ui'
import { logoutThunk } from '../../model/logout'

export function LogoutButton() {
  const dispatch = useAppDispatch()
  const logoutModal = useConfirmModal()

  const onConfirmLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()

    logoutModal.show({
      title: 'Are you sure?',
      onConfirm: () => {
        dispatch(logoutThunk())
          .unwrap()
          .finally(() => {
            logoutModal.remove()
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
