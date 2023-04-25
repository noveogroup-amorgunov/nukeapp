import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './appStore'

/**
 * ✅ DX Best practice
 *
 * Example how use can say for developer
 * that variable or module is deprecated
 * (1) Add @deprecated to folder
 * (2) Add @deprecated tag in jsdoc
 * (3) Add eslint-rule to forbidden import by path
 */

/**
 * @deprecated use same hook from @/shared/model
 */
export const useAppDispatch: () => AppDispatch = useDispatch

/**
 * @deprecated use same hook from @/shared/model
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
