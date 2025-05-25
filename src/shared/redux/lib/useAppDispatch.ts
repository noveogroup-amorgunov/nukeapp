import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../model/store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
