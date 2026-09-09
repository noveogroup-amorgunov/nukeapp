import React, { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { Icon, IconButton } from '@/shared/ui'
import { themeSlice } from '../../model/slice'

export function ChangeTheme() {
  const currentTheme = useAppSelector(themeSlice.selectors.currentTheme)
  const dispatch = useAppDispatch()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      dispatch(themeSlice.actions.toggle(currentTheme === 'light' ? 'dark' : 'light'))
    },
    [currentTheme],
  )

  return (
    <div data-fsd="feature/theme/ChangeTheme">
      <IconButton onClick={onClick}>
        <Icon type={currentTheme === 'light' ? 'moon' : 'sun'} />
      </IconButton>
    </div>
  )
}
