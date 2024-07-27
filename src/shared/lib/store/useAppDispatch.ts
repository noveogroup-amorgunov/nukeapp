import { useDispatch } from 'react-redux'
import type { AppDispatch } from './types'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
