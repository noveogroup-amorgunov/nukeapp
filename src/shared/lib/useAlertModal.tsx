import { useModal, create as createModal } from '@ebay/nice-modal-react'
import { type ReactNode } from 'react'
import { Modal } from '../ui'

type Props = {
  children: ReactNode
}

function AlertModalPresenter(props: Props) {
  return <Modal>{props.children}</Modal>
}

export const AlertModal = createModal(AlertModalPresenter)

export const useAlertModal = () => {
  return useModal(AlertModal)
}
