import React, { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux'
import { Icon, IconButton } from '@/shared/ui'
import { themeSlice } from '../../model/slice'
import css from './ChangeThemeIconButton.module.css'

export function ChangeThemeIconButton() {
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
    <div data-fsd="entity/theme/ChangeThemeIconButton" className={css.root}>
      <IconButton onClick={onClick}>
        <Icon type={currentTheme === 'light' ? 'moon' : 'sun'} />
      </IconButton>
    </div>
  )
}
