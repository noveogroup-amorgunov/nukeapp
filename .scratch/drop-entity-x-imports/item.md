---
status: needs-triage
---

# Выпилить `@x` у сущностей

Убрать паттерн `@x` (cross-import public APIs между сущностями,
`src/entities/*/@x/*`) — выпилить его использование из кодовой базы.

## Контекст

Сегодня `@x` нужен только ради `mapProduct`: cart / wishlist / category
импортируют его через `src/entities/product/@x/*`, чтобы мапить `ProductDto`
в доменный `Product` внутри своих DTO.

## Референс: PR #34 (май 2025, не мержился)

<https://github.com/noveogroup-amorgunov/nukeapp/pull/34> — `feature/fix-entities-cross-imports`.

Механизм там:

1. `src/shared/domain.ts` — пустой `export interface EntitiesDomain {}`.
2. Сущности через `declare module '@/shared/domain'` (module augmentation)
   «лениво» регистрируют свои домен-типы (`Product`, `ProductId`).
3. Маппер уезжает в `shared/api/globalMappers/mapProduct.ts`, возвращает
   `EntitiesDomain['Product']` — shared формально не импортирует из entities
   (augmentation type-only), восходящего импорта нет.
4. Все `@x/*` удаляются; потребители берут `mapProduct` из `@/shared/api`,
   типы — как `EntitiesDomain['Product']`.

Минусы приёма:

- строковый реестр: тип спрятан за ключом, провенанс не виден; переименование
  `Product` роняет компиляцию в точках использования, а не в декларации;
- домен-знание (`badge → label`, брендированный `id`) механически легализовано
  в shared — правило FSD «no business logic in shared» обходится трюком, а не
  снято; нужно фиксировать как deviation;
- шум на вызовах: `PayloadAction<EntitiesDomain['Product']>` вместо
  `PayloadAction<Product>`.
- PR устарел: написан против до-кодгеновой кодовой базы (ручные
  `injectEndpoints`-слайсы), в текущую main не переносится как есть.

## Предлагаемый вариант (проще PR #34)

Augmentation-трюк нужен только ради того, чтобы _определения_ типов остались
внутри сущностей. Если от этого отказаться:

1. Положить `Product` / `ProductId` как обычные определения в
   `src/shared/domain.ts` (или сразу в `shared/api`).
2. `mapProduct` — в `shared/api` рядом с DTO.
3. `@x/*` удалить; cart / wishlist / category импортируют plain-импортом из
   shared.
4. `entities/product` сохраняет UI (ProductCard), `formatPrice`,
   `mapProductToCompactView` и модельную логику.

Основание: FSD прямо разрешает «keeping types in shared/api and logic in the
current slice's model/» — Product здесь де-факто cross-slice домен-тип с
пятью потребителями (product, cart, wishlist, category, pages).

## Импликации

- Частичный откат ADR-0003 («cross-slice domain types: one adapter in the
  entity owner») — правка ADR-0003 + `docs/architecture.md` (раздел API и
  список deviations, если выберем augmentation-вариант).
- Коллизия имён: `shared/api` уже экспортирует DTO-тип `Product` из кодгена;
  на границе сделать `export type { Product as ProductDto }` из generated и
  поправить импорты (productApi и др.).
- Остаётся решить, что делать с другими cross-slice мапперами, если есть
  (`mapCategoryWithProducts` внутри category — same-slice, не @x; проверки по
  grep).

## Открытые вопросы

- Вариант A (plain типы в shared/domain) vs вариант B (augmentation, PR #34) —
  решить при триаже.
- Судьба `ProductId`-брендирования в shared (сейчас `Brand` из app-типов).
