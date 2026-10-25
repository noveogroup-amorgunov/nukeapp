---
status: needs-triage
---

# Карта z-index-ов

Reporter: @amorgunov (maintainer), 2026-09-14.

Outgrowth of layout-refactor regression pass.

## Idea

Свести все z-index использования в единый слой-карту: сейчас значения раскиданы
вживую по компонентам (например, `z-index: 10` в DropdownMenu, backdrop в
Modal и т.д.), при появлении новых оверлеев (дропдауны, модалки, баннер,
debug-тогглер) легко получить перекрытия в неожиданном порядке.

## Scope / подход

1. Инвентаризация: `grep -rn "z-index" src` — где и какие значения.
2. Токенизация: переменные в tokens.css по фигминому неймингу
   (`--z-index/dropdown` → `--z-index-dropdown`), значения фиксированной
   шкалой (base → dropdown → modal → ...), без «магических» инкрементов.
3. Заменить литералы на токены во всех оверлеях; в tokens.css закомментировать
   порядок слоёв (who sits above whom).
