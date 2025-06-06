import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useFeatureToggle } from '@/entities/featureToggle/@x/theme'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { themeSlice } from '../model/slice'
import type { Theme } from '../model/types'

type Props = {
  theme?: Theme
  children: ReactNode
}

export function ThemeProvider({ children, theme }: Props) {
  const currentTheme = useAppSelector(themeSlice.selectors.currentTheme)
  const darkModeIsEnabled = useFeatureToggle('darkMode')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!darkModeIsEnabled) {
      return
    }

    if (theme && theme !== currentTheme) {
      dispatch(themeSlice.actions.toggle(theme))

      return
    }

    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme, theme, darkModeIsEnabled])

  return <>{children}</>
}
