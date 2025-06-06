import { create as createModal, useModal } from '@ebay/nice-modal-react'
import { Button } from './Button/Button'
import { Modal } from './Modal/Modal'

type Props = {
  title: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
}

function ConfirmModalPresenter(props: Props) {
  const {
    title,
    onConfirm,
    onCancel,
    confirmText = 'Yes',
    cancelText = 'No',
  } = props

  return (
    <Modal>
      <span className="text_base text_bold">{title}</span>
      <Button onClick={onConfirm}>{confirmText}</Button>
      <Button theme="secondary" onClick={onCancel}>
        {cancelText}
      </Button>
    </Modal>
  )
}

export const ConfirmModal = createModal(ConfirmModalPresenter)

export function useConfirmModal() {
  return useModal(ConfirmModal)
}
