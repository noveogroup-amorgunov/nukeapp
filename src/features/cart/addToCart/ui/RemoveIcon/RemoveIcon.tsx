import { useCallback } from 'react'
import type { ProductId } from '@/entities/product'
import { useAppDispatch } from '@/shared/redux'
import { Icon, ToggleIcon, useConfirmModal } from '@/shared/ui'
import { removeCartItemThunk } from '../../model/actions'

type Props = {
  productId: ProductId
}

export function RemoveIcon(props: Props) {
  const dispatch = useAppDispatch()
  const confirmRemoveModal = useConfirmModal()

  const onClickToRemove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault()

      confirmRemoveModal.show({
        title: 'Are you really want remove product from cart?',
        confirmText: 'Yes',
        cancelText: 'No',
        onConfirm: () => {
          confirmRemoveModal.remove()
          dispatch(removeCartItemThunk(props.productId))
        },
        onCancel: () => confirmRemoveModal.remove(),
      })
    },
    [props.productId],
  )

  return (
    <ToggleIcon onClick={onClickToRemove}>
      <Icon type="trash" />
    </ToggleIcon>
  )
}
