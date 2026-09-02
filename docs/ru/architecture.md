# Архитектура

Этот проект разработан согласно архитектурной методологии Feature-Sliced Design (FSD). Данная методология объединяет лучшие паттерны проектирования (такие, как чистая архитектура, архитектура вертикальных слайсов, feature driven подход и другие). Вы можете почитать больше на официальном сайте методологии: https://feature-sliced.design/.

## Содержание

Решенные типичные проблемы:

- [Авторизация](#Авторизация)
- [Шаблон страницы](#Шаблон-страницы)
- [Использование фичей в сущностях](#Использование-фичей-в-сущностях)
- [Связи между сущностями](#Связи-между-сущностями)
- [Правила в ESLint](#Правила-в-ESLint)

Ограничения (или расширение каноничной FSD):

- [Кросс-импорты на уровне сущностей](#Кросс-импорты-на-уровне-сущностей)
- [Кросс-импорты на уровне виджетов](#Кросс-импорты-на-уровне-виджетов)

## Решенные типичные проблемы

В проекте есть довольно много примеров, как можно разрешить различные ситуации, с которыми вы определенно встретитесь, работая с FSD.

### Авторизация

Команда разработчиков FSD рекомендует выносить всю логику по обновление access-токена и авторизации пользователя в `shared/api` и хранить access-токен в `entity/session`. Это решает две проблемы: кросс-импорты и дублирование кода.

Но в данном проекте используется продвинутый подход, в котором обновление access-токена и авторизации пользователя вынесены в фичу `features/authorization`. Когда токен протухает, эмитится специальное событие [apiAccessTokenIsBrokenEvent](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/src/shared/api/baseQueryWithReauth.ts#L36) из `shared/api`, которое слушают другие слои (в том числе фича обновление access-токена).

Смотрите пример реализации в [entities/session/\*](https://github.com/noveogroup-amorgunov/nukeapp/tree/main/src/entities/session), [features/authorization/\*](https://github.com/noveogroup-amorgunov/nukeapp/tree/main/src/features/authentication) и [shared/api/\*](https://github.com/noveogroup-amorgunov/nukeapp/tree/main/src/shared/api).

### Шаблон страницы

Шаблон (layout) разделен на две части:

- 1️⃣ Глупый компонент с версткой, которой лежит в `share/ui/Layout`;
- 2️⃣ Умный компонент, в котором происходит композиция виджетов (`app/layouts/baseLayout.tsx`).

Смотрите пример реализации в [app/layouts/baseLayout.tsx](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/src/app/layouts/baseLayout.tsx) и [shared/ui/Layout/\*](https://github.com/noveogroup-amorgunov/nukeapp/tree/main/src/shared/ui/Layout).

### Использование фичей в сущностях

Напрямую импорты фичей из сущностей запрещены методологии. Для того чтобы решить проблему, используется паттерн рендер-пропов (или рендер слотов), в котором фичи прокидываются в UI сущности через пропсы.

Смотрите пример реализации в [widgets/BaseProductList/BaseProductList.tsx](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/src/widgets/BaseProductList/ui/BaseProductList.tsx). UI сегмент сущности `entity/product/ProductCard` отображает внутри себя действия над товаром, а именно добавление товара в избранное - `feature/AddToWishlist`. Это действие получено через пропсы на уровне виджета `widget/BaseProductList`. Таким образом мы не нарушаем FSD и можем использовать фичи внутри сущностей.

### Связи между сущностями

Смотрите далее раздел «[Кросс-импорты на уровне сущностей](#Кросс-импорты-на-уровне-сущностей)».

### Правила в ESLint

Используется https://www.npmjs.com/package/@feature-sliced/eslint-config

## Ограничения

FSD is a great solution, but every great solution tries to find harmony between correctness and productivity (for example, [see TypeScript non goals](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals)). FSD is strict and some cases in real project can't be solved without workarounds.

### Кросс-импорты на уровне сущностей

В ~~реальном мире~~ реальных приложениях, сущности (наш домен) имеют большое количество взаимосвязей и не могут использоваться в изоляции друг от друга. Мы не можем написать хороший домен без взаимосвязей. Но FSD запрещает использовать кросс-импорты в рамках одного слоя. Например, моделька товара использует в себе брендированный тип `CategoryId`:

```ts
// 📁 entities/product/model/types.ts

// 👇 FSD запрещает этот импорт
import type { CategoryId } from 'entities/category'

type Product = {
  id: ProductId
  category: CategoryId
}
```

Что мы можем сделать? В проекте используется экспериментальная фича ([в статусе RFC](https://github.com/feature-sliced/documentation/discussions/390#discussioncomment-5570073)), которая разрешает делать кросс-импорты связанных сущностей через специальное API.

```ts
// 📁 entities/category/@x/product

// 👇 Это публичный API для связанной сущности `product`
export type { CategoryId } from '../model/types'
```

```ts
// 📁 entities/product/model/types.ts

// 👇 Импортируем `CategoryId` из специального публичного API для товара
import type { CategoryId } from 'entities/category/@x/product'

type Product = {
  id: ProductId
  category: CategoryId
}
```

Если нам нужно использовать `CategoryId` в другой сущности, то нужно создать `@x/{entity}` и экспортировать нужные зависимости. Достоинства этого подхода над обычными кросс импортами описаны в RFC, но если кратко:

- Написание таких индексных файлов немного громоздко, что заставляет разработчиков искать аьтернативные решения, не требующие кросс-импортов;
- Список интерфейсов и объектов, которые расшарены для связанного слайса является явным;
- Такой подход хорошо читается достовно - «импортировать что-то из сущности товара для категории».

Вы можете посмотреть пример реализации в [entities/product/@x/\*](https://github.com/noveogroup-amorgunov/nukeapp/tree/main/src/entities/product/%40x).

Дополнительно, в проекте патчится ESLint-правило "boundaries/element-types" (_feature-sliced/layers-slices_) из плагина _@feature-sliced/eslint-config_. Смотрите пример в [patches/@feature-sliced+eslint-config+0.1.0-beta.6.patch](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/patches/%40feature-sliced%2Beslint-config%2B0.1.0-beta.6.patch).

### Кросс-импорты на уровне виджетов

> Можете посмтреть пул реквест https://github.com/noveogroup-amorgunov/nukeapp/pull/21 , в котором ввиден кастомный подслой базовых виджетов.

Я думаю, вы согласитесь, что сегодня пользовательские интерфейсы зачастую очень сложные. И в рамках FSD обычно недостаточно слоев для композиции UI. Например, у нас есть виджет `BaseProductList`, который использует различные фичи и сущности. В тоже время у нас есть N виджетов типа `{Any}ProductList` (например, `PopularProductList` или `CartProductList`), которые используют `BaseProductList`:

![Cross-imports example, dark theme](../example-cross-imports@dark.jpg#gh-dark-mode-only) ![Cross-imports example, light theme](../example-cross-imports@light.jpg#gh-light-mode-only)

Конечно, мы можем создать глупый компонент `ProductList` и положить его внутрь слайса `entities/product`, прокинув все свойства как пропсы. Иногда паттерн рендер-пропсов очень мощный инструмент и это работает. Но в данном примере это не так (получаем много дублирующей логике и prop-hell в компонентах, потому что каждый из N виджетов будет дублировать логику друг друга):

```tsx
// 📁 widgets/PopularProductList/ui/PopularProductList.tsx

function PopularProductList() {
  return (
    <ProductList
      // 👎 Много дублирования для подготовки пропсов в каждом N виджете
      // которые используют ProductList
      cardItemSlot={/* ... */}
      actionCardItemSlot={/* ... */}
      onAddToWishlist={/* ... */}
      onAddToCart={}
      onRemoveFromCart={}
      // Куча других пропсов .....
      products={products}
    />
  )
}
```

Итак, у нас есть несколько решений:

- 1️⃣ Следовать классическому FSD и переместить виджет на слой сущностей (привет проп-дриллинг и кучу дублирования 👎);
- 2️⃣ Разрешить кросс-импорты между виджетами (просто решение, но будет нарушен принцип Low Coupling 👎);
- 3️⃣ Добавить новый слой типа `page-widgets` или `entity-widgets` (усложняет архитектуру и структуру проекта 👎);
- 4️⃣ Добавить новый подслой для базовых виджетов (похоже на предыдущий пункт, но мы не будет вводить новый глобальный слой 🤔).

Изначально в этом проекте использовать второй подход 2️⃣ (мы используем этот подход на рабочем проекте), когда кросс-импорты разрешены между виджетами. Но эта опция нарушает принцип Low Coupling, что может привести к проблемам в больших проектах.

Поэтому в этом проекте реализован четвертый вариант: 4️⃣ новый слой для базовых сущностей, которые могут быть импортированы другими виджетами. Если имя виджета начинается с `widget/Base*`, то он считается базовым.

Это показательный пример того, как можно расширять архитектуру FSD будет добавления новых подслоев. Вы можете посмотреть пример в [widgets/PopularProductList/\*](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/src/widgets/ProductPopularList/ui/ProductPopularList.tsx#L10).

Дополнительно, в проекте патчится ESLint-правило "boundaries/element-types" (_feature-sliced/layers-slices_) из плагина _@feature-sliced/eslint-config_. Смотрите пример в [patches/@feature-sliced+eslint-config+0.1.0-beta.6.patch](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/patches/%40feature-sliced%2Beslint-config%2B0.1.0-beta.6.patch).
