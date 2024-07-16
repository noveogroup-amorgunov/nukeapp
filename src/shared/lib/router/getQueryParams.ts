export function getQueryParams() {
  const urlSearchParams = new URLSearchParams(window.location.search)

  return Object.fromEntries(urlSearchParams.entries())
}
