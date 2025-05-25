import { useSelector } from 'react-redux'
import type { AppState } from '../model/store'

export const useAppSelector = useSelector.withTypes<AppState>()
