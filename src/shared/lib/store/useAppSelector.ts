import { useSelector } from 'react-redux'
import type { AppState } from './types'

export const useAppSelector = useSelector.withTypes<AppState>()
