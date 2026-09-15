import { appStore } from '@/shared/redux'
import { themeSlice } from '../model/slice'

/**
 * Applies the current Theme to the document via the `data-theme` attribute.
 *
 * ⚠️ Store subscription, not a middleware: `redux-remember` rehydration
 * dispatches bypass the middleware chain, so a persisted Theme would be
 * missed on reload. The subscription mirrors the access-token sync pattern.
 * @see https://github.com/zewish/redux-remember/blob/v6.0.2/src/rehydrate.ts#L44
 */
export function setupThemeSync() {
  const sync = () => {
    const currentTheme = themeSlice.selectors.currentTheme(appStore.getState())
    document.documentElement.setAttribute('data-theme', currentTheme)
  }

  sync()
  appStore.subscribe(sync)
}
