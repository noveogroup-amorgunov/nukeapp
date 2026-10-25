---
status: needs-triage
---

# Wishlist: спрятать механику мутации за маленьким интерфейсом

Reporter: @amorgunov (maintainer), 2026-09-17.
Источник: архитектурный обзор 2026-09-16, кандидат №4
(`/var/folders/.../T/architecture-review-20260916-arch.html`, HTML-отчёт во
временной директории — срок жизни ограничен, суть ниже).
Категория (предварительно): **enhancement**.

## Проблема

Модуль wishlist мелкий: entity экспортирует сырой объект slice (9 экспортов,
нулевое сокрытие), а страницы обязаны передавать
`fixedCacheKey: 'shared-add-to-wishlist'` — литерал, продублированный в двух
слоях, — только чтобы связать спиннер с мутацией:

- `src/features/wishlist/addToWishlist/model/toggleWishlistProduct.ts:35`
- `src/pages/wishlist/ui/Page/Page.tsx:21`

Интерфейс протекает механикой RTK Query: вызывающий знает про
`useUpdateWishlistProductsMutation`, магический ключ кэша и согласованность
строк в двух файлах. Контраст с корзиной после рефакторинга (#71): cart стал
глубоким модулем (3 thunk'а за маленьким интерфейсом), wishlist остался с
сырым slice'ом наружу.

## Предложение (из отчёта, к обсуждению на triage)

Завернуть мутацию в `useToggleWishlist()` внутри `entities/wishlist`;
`fixedCacheKey`, объект slice и обвязка мутации становятся реализацией.
Сырой `wishlistSlice` из public API убрать (см. близкий по духу рефакторинг
корзины: `docs/changes/archive/2026-09-17-deepen-cart-module/`).

## Открытые вопросы (на /triage)

- Симметрия слайсов: cart после #71 хранит optimistic-копию состояния
  (`cartSlice` + matchFulfilled-сверка), wishlist синхронизируется из ответа
  API через entity-адаптированный хук. Нужен ли wishlist'у зеркальный slice,
  или достаточно хука-обёртки над мутацией?
- `features/wishlist/addToWishlist` после этого: остаётся (логин-гейт?
  контекст?) или тоже растворяется, как cart в #71?
- `mapWishlist.ts` — однострочный файл `dto.map(mapProduct)`: inline'ить
  (продукт entity делает то же самое inline в `productApi.ts:30`)?
