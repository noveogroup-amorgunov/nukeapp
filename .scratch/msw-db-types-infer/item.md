---
status: needs-triage
---

# Автовывод типов msw-базы из типов базы (по мотивам PR #19)

Reporter: @amorgunov (maintainer), 2026-09-14.

Reference: https://github.com/noveogroup-amorgunov/nukeapp/pull/19
(«mswjs/data infer type from database», ветка yurisldk:feature/database-types, не смержена).

## Idea

Типы строк msw-базы (`shared/api/mocks.ts` — `@msw/data`) сейчас описываются
или руками, или у обработчиков нет типизированных мапперов DB → DTO.
По мотивам PR #19: вывести типы записей базы автоматически из инстанса `db`
(`typeof db['findFirst']` → `NonNullable<ReturnType<...>>`), экспортировать
`*DatabaseModel` из серверного модуля и типизировать адаптеры DB → DTO в
handlers (mockProductDto, mockCartDto и т.п. вместо ad-hoc JSON).

## Из PR #19

- `types.ts`: `CartDatabaseModel` / `ProductDatabaseModel` / `CategoryDatabaseModel` /
  `UserDatabaseModel` / `WishlistDatabaseModel` через
  `NonNullable<ReturnType<typeof db[entity]['findFirst']>>`.
- Мапперы `mock*Dto(databaseModel...)` в `api/__mocks__` сущностей,
  handlers используют их вместо прямого `ctx.json(dbResult)`.
- Заодно в PR: 404-ветка продукта с явным body, вынос сортировки из handler'а.

## Notes

- Актуальный код сильно отличается от 2023 года: база живёт в едином
  `shared/api/mocks.ts` (`@msw/data` + faker), API — сгенерированный RTK Query
  из OpenAPI-спеки (ADR-0003), DTO — authority по неймингу.
- Решить: где живут DatabaseModel-типы и мапперы (см. глоссарий Adapter:
  адаптер DB→DTO — это то же место, где живут DTO-адаптеры сущностей).
