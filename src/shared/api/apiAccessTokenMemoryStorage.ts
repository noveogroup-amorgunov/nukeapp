// Internal function to store access token
// Attach in `@/app/appEntry.tsx`
let __internalAccessTokenStore: () => string | null

export function attachApiAccessToken(getToken: () => string | null) {
  __internalAccessTokenStore = getToken
}

export function getApiAccessToken() {
  return __internalAccessTokenStore()
}
