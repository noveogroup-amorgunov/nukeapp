import { useModal, create as createModal } from '@ebay/nice-modal-react'
import { Button, Modal } from '../ui'

type Props = {
  title: string
  onButtonClick: () => void
  buttonText?: string
}

function AlertModalPresenter(props: Props) {
  const { title, onButtonClick, buttonText = 'Okay' } = props

  return (
    <Modal>
      <span className="text_base text_bold">{title}</span>
      <Button onClick={onButtonClick}>{buttonText}</Button>
    </Modal>
  )
}

export const AlertModal = createModal(AlertModalPresenter)

export const useAlertModal = () => {
  return useModal(AlertModal)
}
