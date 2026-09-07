# API-слой: OpenAPI-спецификация + нативный кодген RTK Query

> **Статус:** реализовано (ручная проверка сценариев в браузере с моками — отдельно)
> **Референс:** ~/pets/frontend-lite — там используется @hey-api/openapi-ts. В nukeapp выбран **нативный** кодген RTK Query (`@rtk-query/codegen-openapi`): не нужен SDK-клиент, zod-плагин и слой репозиториев.

## 1. Цель

Контракт-first подход к API-слою:

- единая локальная OpenAPI-спецификация (`src/shared/api/openapi.json`) описывает все ручки бэкенда;
- RTK Query эндпоинты, типы и хуки **генерируются** из неё в `src/shared/api/generated/api.generated.ts`;
- для **Product** и **Category** (и всего, что их рендерит: product details, wishlist) — клиентские модели с брендированными id через `enhanceEndpoints` + `transformResponse` + адаптеры `map*`;
- остальные ручки отдают DTO из генерата напрямую (без адаптеров);
- все MSW-моки живут в `shared/api/mocks`.

Принятые компромиссы (осознанно):

- **без рантайм-валидации** — у нативного кодгена нет zod-плагина; контракт проверяется типами;
- `transformResponse` недоступен в конфиге кодгена — поэтому маппинг DTO → клиентская модель делается **после** генерации через `enhanceEndpoints` (см. §4.1);
- `getCart` остаётся DTO на уровне эндпоинта — клиентская модель `Cart` (`itemsMap`) собирается в слайсе через `mapCart` (состояние клиента, не API-адаптер).

## 2. Инвентаризация ручек

| Метод | Путь                  | Query / Body                                            | Ответ                         | Использование          | Auth   |
| ----- | --------------------- | ------------------------------------------------------- | ----------------------------- | ---------------------- | ------ |
| GET   | `/cart`               | —                                                       | `Cart`                        | LayoutHeader, CartPage | Bearer |
| PATCH | `/cart`               | body: `UpdateCartRequest`, query: `delay`               | `200 {}`                      | features/cart          | Bearer |
| GET   | `/categories/popular` | —                                                       | `Category[]`                  | main                   | нет    |
| GET   | `/categories/{id}`    | `sortBy` (enum), `delay`                                | `CategoryWithProducts`, `404` | category page          | нет    |
| GET   | `/products`           | `id` (multi: `?id=1&id=2`)                              | `Product[]`                   | —                      | нет    |
| GET   | `/products/popular`   | —                                                       | `Product[]`                   | main                   | нет    |
| GET   | `/products/{id}`      | —                                                       | `ProductDetails`, `404`       | product page           | нет    |
| GET   | `/wishlist/products`  | —                                                       | `Product[]`, `403`            | wishlist               | Bearer |
| PATCH | `/wishlist/products`  | body: `number[]`, query: `delay`                        | `200 {}`                      | features/wishlist      | Bearer |
| POST  | `/login`              | body: `LoginRequest`                                    | `Session`, `400` (text)       | features/session       | нет    |
| GET   | `/me`                 | —                                                       | `User`, `401`                 | LayoutProfileCard      | Bearer |
| GET   | `/feature-toggle`     | `canTurnDarkMode`, `canSortProducts` (`'true'/'false'`) | `FeatureToggle`               | theme, category        | нет    |
| GET   | `/ad/offer`           | —                                                       | `AdOffer`                     | AdBlock                | нет    |

Спека: OpenAPI **3.1**, `servers` не описывается (baseUrl из `env.VITE_API_ENDPOINT`), `operationId` camelCase → имена эндпоинтов/хуков (`getCart` → `getCart` / `useGetCartQuery`), теги по доменам, `security: bearerAuth` на защищённых ручках, `delay` — optional query с пометкой mock-only, `sortBy` — enum `Featured | Newest | PriceHighLow | PriceLowHigh`, multi-`id` — array + `explode: true`.

## 3. To-be: структура

```
src/shared/api/
├── openapi.json                  # контракт (руки, коммитится)
├── generated/
│   └── api.generated.ts          # 🤖 эндпоинты + хуки + типы (коммитится)
├── baseApi.ts                    # createApi: fetchBaseQuery + reauth, tagTypes
├── baseQuery.ts                  # fetchBaseQuery: baseUrl, Bearer из memory storage
├── baseQueryWithReauth.ts        # 401 → apiAccessTokenIsBrokenEvent
├── apiAccessTokenMemoryStorage.ts
├── apiAccessTokenIsBrokenEvent.ts
├── isFetchBaseQueryError.ts
├── tags.ts                       # 'cart' | 'wishlist' | 'session' | 'user'
├── index.ts                      # public API: baseApi, generatedApi, хуки, типы
└── mocks/<domain>/               # MSW-хендлеры + фикстуры (типы из генерата)

# клиенты модели Product/Category — через enhanceEndpoints
src/entities/product/api/productApi.ts        # getProducts, getPopularProducts → Product[]
src/entities/category/api/categoryApi.ts      # getPopularCategories, getCategoryDetails
src/entities/wishlist/api/wishlistApi.ts      # getWishlistProducts → Product[]
src/pages/product/api/productDetailsApi.ts    # getProductDetails → ProductDetails
```

Поток данных: `hook (generated/enhanced) → fetchBaseQuery → transformResponse (map*)`. RTK Query — единственный транспорт, слоя репозиториев над SDK нет.

## 4. Кодген

**Зависимости:** `@rtk-query/codegen-openapi` (dev) + `esbuild-runner` (для ts-конфига).

**Конфиг** — `openapi-config.ts` в корне:

- `apiFile: './src/shared/api/baseApi.ts'`, `apiImport: 'baseApi'` — эндпоинты инжектятся в пустой `baseApi`;
- `exportName: 'generatedApi'` — типизированный инстанс (`baseApi.endpoints` остаётся пустым на уровне типов, эндпоинты доступны через `generatedApi`);
- `hooks: true`;
- `tag: false` + `endpointOverrides` — теги задаются явно:
  - `getCart` → `providesTags: ['cart']`, `updateCart` → `invalidatesTags: ['cart']`
  - `getWishlistProducts` → `['wishlist']`, `updateWishlistProducts` → `['wishlist']`
  - `login` → `invalidatesTags: ['session', 'wishlist']`
  - `getMe` → `providesTags: ['user']`.

**Скрипты** (в `package.json`): `api:generate` → `rtk-query-codegen-openapi openapi-config.ts`, `api:check` → `api:generate && git diff --exit-code -- src/shared/api/generated`. `generated/` коммитится.

**Линт:** `src/shared/api/generated/**` исключён из eslint; импорты `@/shared/api/generated` запрещены снаружи — только через `@/shared/api` public API. dependency-cruiser не следует в generated.

## 4.1. Клиентские модели через `enhanceEndpoints`

RTK Query позволяет переопределить `transformResponse` у уже сгенерированного эндпоинта через `enhanceEndpoints` — при этом ResultType эндпоинта (и хуков) подменяется на возвращаемый тип маппера (`UpdateDefinitions`/`TransformedResponse` в типах RTK).

Нюансы, из-за которых выглядит многословно:

- **вывод `NewDefinitions` из partial-объекта не работает** (схлопывается в исходный DTO-тип), поэтому дженерик задаётся явно: `enhanceEndpoints<never, { getProducts: QueryDefinition<GetProductsApiArg, AppBaseQuery, ApiTagTypes, Product[], 'api'> }>`;
- `ApiArg`-типы генерата реэкспортируются через `@/shared/api` (снаружи `generated/` импортировать нельзя);
- параметр `transformResponse` типизирован как `unknown` (результат `fetchBaseQuery`), поэтому внутри — cast `(response as ProductDto[])`;
- хуки экспортируются из enhanced-инстанса (`productApi`, `categoryApi`, `wishlistApi`, `productDetailsApi`), где типы уже доменные.

Модели:

- `entities/product`: `Product { id: ProductId (Brand), name, subname, label, image, price (effective = discountPrice ?? price), oldPrice }`, маппер `lib/mapProduct`;
- `entities/category`: `Category { id: CategoryId, name, image }` / `CategoryWithProducts`, мапперы `lib/mapCategory`, `lib/mapCategoryWithProducts` (товары маппятся через `@x/category`);
- `entities/wishlist`: вишлист отдаёт доменные `Product[]` (маппер `lib/mapWishlist`);
- `pages/product`: `ProductDetails` (branded id, `mainImage`, `images` с fallback), маппер `lib/mapProductDetails`;
- `entities/cart`: эндпоинт DTO, но слайс собирает клиентскую `Cart { itemsMap: Record<ProductId, CartItem> }` через `mapCart` в `matchFulfilled`.

## 5. Интеграция со слайсами и фичами

- Слайсы подписываются на кэш через `.matchFulfilled` и нормализуют ответ в своё состояние (cart → `mapCart`, wishlist → `Record<ProductId, boolean>`); для enhaced-эндпоинтов подписка идёт на их инстанс (`wishlistApi.endpoints...`), чтобы payload был доменным.
- Тгики `SESSION_TAG/WISHLIST_TAG/CART_TAG/USER_TAG` теперь `'session'/'wishlist'/'cart'/'user'` — совпадают с OpenAPI-тегами, поэтому `invalidateTags` в logout и кодгене дают одну картину.
- Хуки переэкспортируются через индексы сущностей (`entities/cart` → `useGetCartQuery`); `me` и `feature-toggle` импортируются из `@/shared/api` напрямую.
- `featureToggleLoader` прокидывает `canTurnDarkMode`/`canSortProducts` из URL (`'true'/'false'`).

## 6. MSW-моки

- `src/shared/api/mocks/<domain>/handlers.ts` — пути без `env.VITE_API_ENDPOINT` в префиксе (msw матчит по пути);
- фикстуры (`mockCartDto`, `mockProductDto`, `mockProductDtoByIds`, `mockFeatureToggleDto`) типизированы сгенерированными типами; compile-time проверка дрейфа: поменяли спеку → `api:generate` → сломалась сборка фикстур;
- `shared/lib/server` (`@msw/data`, миграции, JWT) остаётся на месте;
- семантика ошибок сохранена: cart `400/403`, wishlist `403`, me `401` (reauth-поток), login `400` текстом.

## 7. Критерии готовности

- [x] `openapi.json` покрывает все 13 ручек из таблицы
- [x] `pnpm api:generate` воспроизводим, `pnpm api:check` зелёный, `generated/` коммитится
- [x] все запросы идут через сгенерированные эндпоинты (ручных `url:` в `injectEndpoints` нет)
- [x] адаптеры/модели вернулись для Product/Category (+ details, wishlist) через `enhanceEndpoints`; остальные ручки отдают DTO
- [x] MSW-хендлеры живут только в `shared/api/mocks`, фикстуры типизированы генератом
- [x] `pnpm lint` (eslint, types, steiger, dependency-cruiser) зелёный
- [ ] ручная проверка сценариев в dev-режиме с моками: login → cart → wishlist → 401-logout

## 8. Out of scope

- реальный бэкенд и fetch спеки с сервера (спека — локальная, hand-written);
- refresh-token flow (остаётся 401 → logout);
- рантайм-валидация ответов (zod) — выпадает вместе с hey-api, при необходимости можно вернуть точечно.
