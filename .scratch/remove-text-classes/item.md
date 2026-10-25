---
status: needs-triage
---

# Выпилить глобальные text_* классы, заменить на компонент Text

Reporter: @amorgunov (maintainer), 2026-09-14.

Outgrowth of layout-refactor regression pass: баннер перешёл на
`<Text variant="BodySmall">` вместо `span.text_sm.text_bold`.

## Idea

Глобальные классы типографики в `src/shared/base.css`
(`text_sm`, `text_base`, `text_bold`, ...) выпилить и заменить все
использования на компонент `Text` (`shared/ui/Text`) с вариантами и color-токенами.

## Notes

- Scope: все `text_*` использования в src (grep `-rn "text_sm\|text_bold\|text_2xl\|text_base" src`).
- Возможно понадобится новый вариант(ы) Text (например 16px Medium для меню
  дропдауна из фигмы — сейчас BodyMedium 16/400, фигма 16/500).
- text_bold меняет weight по data-theme (700 → 600 в dark) — учесть при замене.
- Удалить сами классы из base.css в конце (contract-шаг).
