import { appStore } from '@/shared/lib/redux'
import { themeSlice } from '../model/slice'

/**
 * Applies the current Theme to the document via the `data-theme` attribute.
 *
 * ⚠️ Store subscription, not a middleware: `redux-remember` rehydration
 * dispatches bypass the middleware chain, so a persisted Theme would be
 * missed on reload. The subscription mirrors the access-token sync pattern.
 * @see https://github.com/zewish/redux-remember/blob/v6.0.2/src/rehydrate.ts#L44
 */
export function setupThemeSync(targetStore: typeof appStore = appStore) {
  const sync = () => {
    const currentTheme = themeSlice.selectors.currentTheme(targetStore.getState())
    document.documentElement.setAttribute('data-theme', currentTheme)
  }

  sync()
  targetStore.subscribe(sync)
}
