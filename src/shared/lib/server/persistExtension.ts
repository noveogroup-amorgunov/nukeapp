import { defineExtension } from '@msw/data/extensions'
import type { Extension } from '@msw/data/extensions'
import {
  createFromSerializedRecord,
  serializeRecord,
} from '@msw/data/extensions/persist'
import type { SerializedRecord } from '@msw/data/extensions/persist'

const STORAGE_KEY = 'msw/data/storage'
const STORAGE_VERSION = 2

/**
 * Storage key prefix of the custom persist extension
 * from the legacy "@mswjs/data" fork.
 * @see https://github.com/noveogroup-amorgunov/mswjs-data/tree/feat-persist
 */
const LEGACY_STORAGE_KEY_PREFIX = 'mswjs-data/'

let isLegacyStorageCleanedUp = false

function cleanupLegacyStorage() {
  if (isLegacyStorageCleanedUp || typeof window === 'undefined') {
    return
  }
  isLegacyStorageCleanedUp = true

  for (const storage of [localStorage, sessionStorage]) {
    for (const key of Object.keys(storage)) {
      if (key.startsWith(LEGACY_STORAGE_KEY_PREFIX)) {
        storage.removeItem(key)
      }
    }
  }
}

type SerializedCollection = {
  version: number
  records: Array<SerializedRecord>
}

export type PersistExtensionOptions = {
  /**
   * Unique name of the collection, used as a part of the storage key.
   */
  name: string
  /**
   * Storage implementation, e.g. `localStorage` or `sessionStorage`.
   */
  storage: Storage
}

export type PersistExtensionResult = {
  extension: Extension
  /**
   * Resolves when the collection is hydrated from the storage.
   * Await it before reading or seeding the collection.
   *
   * @note This is a getter, because the actual hydration promise is
   * assigned later, when the collection constructor applies the extension.
   */
  readonly hydration: Promise<void>
}

/**
 * Custom version of the `@msw/data/extensions/persist` extension.
 * Unlike the upstream one, allows to configure the storage
 * (localStorage vs sessionStorage) and uses a predictable storage key.
 *
 * @see https://github.com/mswjs/data/issues/343
 */
export function persist(
  options: PersistExtensionOptions,
): PersistExtensionResult {
  let hydration: Promise<void> = Promise.resolve()

  const extension = defineExtension({
    name: `persist:${options.name}`,
    extend(collection) {
      if (typeof window === 'undefined') {
        return
      }

      cleanupLegacyStorage()

      const collectionKey = `${STORAGE_KEY}/${options.name}`

      /**
       * Flush the collection whenever the page becomes hidden.
       * This covers reloads, navigations, and closing the page.
       */
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState !== 'hidden') {
          return
        }

        options.storage.setItem(
          collectionKey,
          JSON.stringify({
            version: STORAGE_VERSION,
            records: collection.all().map(serializeRecord),
          } satisfies SerializedCollection),
        )
      })

      const rawPersistedData = options.storage.getItem(collectionKey)

      if (!rawPersistedData) {
        return
      }

      hydration = new Promise<void>((resolve) => {
        /**
         * Defer the hydration by a macrotask so the relations
         * defined right after the collection construction
         * apply to the hydrated records.
         */
        setTimeout(() => {
          const persistedData = JSON.parse(
            rawPersistedData,
          ) as SerializedCollection

          if (persistedData.version !== STORAGE_VERSION) {
            console.warn(
              `[persist:${options.name}] Skipping hydration: persisted data version (${persistedData.version}) is incompatible with the current version (${STORAGE_VERSION})`,
            )
            resolve()
            return
          }

          Promise.all(
            persistedData.records.map(record =>
              createFromSerializedRecord(collection, record),
            ),
          )
            .then(() => resolve())
            .catch((error) => {
              console.error(
                `[persist:${options.name}] Failed to hydrate the collection`,
                error,
              )
              resolve()
            })
        }, 0)
      })
    },
  })

  return {
    extension,
    get hydration() {
      return hydration
    },
  }
}
