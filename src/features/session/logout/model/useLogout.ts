import { useAppDispatch } from '@/shared/redux'
import { useConfirmModal } from '@/shared/ui'
import { logoutThunk } from './logout'

export function useLogout() {
  const dispatch = useAppDispatch()
  const logoutModal = useConfirmModal()

  return () => {
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
}
