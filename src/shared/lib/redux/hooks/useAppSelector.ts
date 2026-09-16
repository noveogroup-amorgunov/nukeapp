import { useSelector } from 'react-redux'
import type { AppState } from '../store/store'

export const useAppSelector = useSelector.withTypes<AppState>()
