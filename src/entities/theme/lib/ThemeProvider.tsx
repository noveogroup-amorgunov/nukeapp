import { type ReactNode, useEffect } from 'react'
import { useAppSelector } from '@/shared/model/hooks'
import { selectCurrentTheme } from '../model/slice'

type Props = {
  children: ReactNode
}

export function ThemeProvider({ children }: Props) {
  const currentTheme = useAppSelector(selectCurrentTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  return <>{children}</>
}
