import type { CSSProperties, HTMLAttributes } from 'react'
import { useAppSelector } from '@/shared/redux'
import { selectIsDebugModeEnabled } from '@/widgets/DebugModeToggler'

type CustomCSSProperties = {
  '--fsd-background-color': string
  '--fsd-color': string
} & CSSProperties

type CustomHTMLAttributes<T> = {
  'data-fsd'?: string
} & HTMLAttributes<T>

type Layer = 'widget' | 'feature' | 'entity'

type ModuleName = `${Layer}/${string}`

const colorMap: Record<Layer, string> = {
  widget: '#fa0ee9',
  feature: '#14a200',
  entity: '#2573e5',
} as const

// TODO: replace this component to plain css
export function useFeatureSlicedDebug<T extends HTMLElement = HTMLDivElement>(
  name: ModuleName,
) {
  const isDebugMode = useAppSelector(selectIsDebugModeEnabled)
  const rootAttributes: CustomHTMLAttributes<T> = {}
  const [layer] = name.split('/') as [Layer]

  if (isDebugMode) {
    rootAttributes['data-fsd'] = name
    rootAttributes.style = {
      '--fsd-color': `${colorMap[layer]}dd`,
      '--fsd-background-color': `${colorMap[layer]}07`,
    } as CustomCSSProperties
  }

  return {
    rootAttributes,
  }
}
