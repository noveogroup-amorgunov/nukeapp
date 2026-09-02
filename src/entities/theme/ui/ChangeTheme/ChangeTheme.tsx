import React, { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { Icon } from '@/shared/ui'
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
      <Icon
        onClick={onClick}
        type={currentTheme === 'light' ? 'moon' : 'sun'}
      />
    </div>
  )
}
