import { useModal } from '@ebay/nice-modal-react'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Icon } from '../Icon/Icon'
import css from './Modal.module.css'

type Props = {
  children: ReactNode
}

const BODY_MODAL_IS_OPENED_CLASS = 'modalIsOpened'

export function Modal(props: Props) {
  const modal = useModal()

  const onEscapeKeyClick = () => modal.remove()

  useEffect(() => {
    document.addEventListener('keydown', onEscapeKeyClick)
    document.body.classList.add(BODY_MODAL_IS_OPENED_CLASS)

    return () => {
      document.removeEventListener('keydown', onEscapeKeyClick)
      document.body.classList.remove(BODY_MODAL_IS_OPENED_CLASS)
    }
  }, [])

  return (
    <div className={css.root}>
      <div onClick={() => modal.remove()} className={css.overlay}></div>
      <div className={css.modal}>
        <Icon className={css.x} type="x" onClick={() => modal.remove()} />
        {props.children}
      </div>
    </div>
  )
}
