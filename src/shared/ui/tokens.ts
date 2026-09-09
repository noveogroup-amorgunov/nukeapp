/* TS-side design tokens (subset mirrored from src/shared/ui/tokens.css).
   Keep names in sync with the CSS custom properties. */

export const textColors = {
  primary: 'var(--color-text-primary)',
  secondary: 'var(--color-text-secondary)',
  brand: 'var(--color-text-brand)',
  primaryInverse: 'var(--color-text-primary-inverse)',
} as const

export type TextColor = keyof typeof textColors
