import { type ReactNode, useEffect } from 'react'
import { useFeatureToggle } from '@/entities/featureToggle/@x/theme'
import { useAppDispatch, useAppSelector } from '@/shared/model/hooks'
import { changeTheme, selectCurrentTheme } from '../model/slice'
import { type Theme } from '../model/types'

type Props = {
  theme?: Theme
  children: ReactNode
}

export function ThemeProvider({ children, theme }: Props) {
  const currentTheme = useAppSelector(selectCurrentTheme)
  const darkModeIsEnabled = useFeatureToggle('darkMode')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!darkModeIsEnabled) {
      return
    }

    if (theme && theme !== currentTheme) {
      dispatch(changeTheme(theme))

      return
    }

    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme, theme, darkModeIsEnabled])

  return <>{children}</>
}
