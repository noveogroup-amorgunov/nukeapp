import { create as createModal, useModal } from '@ebay/nice-modal-react'
import { Button } from './Button/Button'
import { Modal } from './Modal/Modal'

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

export function useAlertModal() {
  return useModal(AlertModal)
}
