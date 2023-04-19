export function formatPrice(value: Penny, withSign = true) {
  return `${withSign ? '$' : ''}${Number(value / 100).toFixed(0)}`
}
