import React, { useCallback } from 'react'
import { changeTheme, selectCurrentTheme } from '@/entities/theme'
import { useFeatureSlicedDebug } from '@/shared/lib'
import { useAppDispatch, useAppSelector } from '@/shared/model'
import { Icon } from '@/shared/ui'

export function ChangeTheme() {
  const { rootAttributes } = useFeatureSlicedDebug('feature/ChangeTheme')
  const currentTheme = useAppSelector(selectCurrentTheme)
  const dispatch = useAppDispatch()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      dispatch(changeTheme(currentTheme === 'light' ? 'dark' : 'light'))
    },
    [currentTheme]
  )

  return (
    <div {...rootAttributes}>
      <Icon
        onClick={onClick}
        type={currentTheme === 'light' ? 'moon' : 'sun'}
      />
    </div>
  )
}
