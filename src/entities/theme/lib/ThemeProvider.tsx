import { type ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/model/hooks'
import { changeTheme, selectCurrentTheme } from '../model/slice'
import { type Theme } from '../model/types'

type Props = {
  theme?: Theme
  children: ReactNode
}

export function ThemeProvider({ children, theme }: Props) {
  const currentTheme = useAppSelector(selectCurrentTheme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (theme && theme !== currentTheme) {
      dispatch(changeTheme(theme))

      return
    }

    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme, theme])

  return <>{children}</>
}
