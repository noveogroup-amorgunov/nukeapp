import { useCallback } from 'react'
import { type ProductId } from '@/entities/product'
import { useConfirmModal } from '@/shared/lib'
import { useAppDispatch } from '@/shared/model'
import { Icon } from '@/shared/ui'
import { removeCartItemThunk } from '../../model/actions'

type Props = {
  productId: ProductId
}

export function RemoveIcon(props: Props) {
  const dispatch = useAppDispatch()
  const confirmRemoveModal = useConfirmModal()

  const onClickToRemove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
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
    [props.productId]
  )

  return <Icon type="trash" onClick={onClickToRemove} />
}
