import { useCallback } from 'react'
import { removeCartLine } from '@/entities/cart'
import type { ProductId } from '@/entities/product'
import { useAppDispatch } from '@/shared/lib/redux'
import { Icon, IconButton, useConfirmModal } from '@/shared/ui'

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
          dispatch(removeCartLine(props.productId))
        },
        onCancel: () => confirmRemoveModal.remove(),
      })
    },
    [props.productId],
  )

  return (
    <div data-fsd="page/cart/RemoveIcon">
      <IconButton onClick={onClickToRemove}>
        <Icon type="trash" />
      </IconButton>
    </div>
  )
}
