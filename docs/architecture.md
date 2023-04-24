# Architecture

The project is developed by Feature Sliced Design (FSD) methodology. It combines the best architecture patterns (like domain driven design, vertical slice architecture, public API, layout isolation and so on). You can read more in the official documentation on https://feature-sliced.design/ .

## Solved common problems

The project has a lot of example how we can solve different cases with methodology which you will definitely meet on your way.

### Authorization

Core team recommends move all logic with updating access tokens and authorization in `shared/api` and store access token in `entity/session`. It solves two problems: cross imports and code duplication.

But I use advanced approach and move authorization/invalidating tokens in `features/authorization`. When token is expired, we emit special action [invalidateAccessToken](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/src/shared/api/baseQueryWithReauth.ts#L36) from shared api, which listen in other layers.

See [entities/session/\*](https://github.com/noveogroup-amorgunov/nukeapp/tree/main/src/entities/session), [features/authorization/\*](https://github.com/noveogroup-amorgunov/nukeapp/tree/main/src/features/authentication) and [shared/api/\*](https://github.com/noveogroup-amorgunov/nukeapp/tree/main/src/shared/api) in code.

### Page Layout

Split layout to dumb component (with markup) and smart component for widget compositions. Dumb layout can be placed in `share/ui/Layout`, smart - `app/Layout`.

See [app/appLayout.tsx](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/src/app/appLayout.tsx) and [shared/ui/Layout/\*](https://github.com/noveogroup-amorgunov/nukeapp/tree/main/src/shared/ui/Layout) in code.

### Using features into entity

Use render prop pattern (render slot) and pass features via props.

See [widgets/ProductList/ProductList.tsx](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/src/widgets/ProductList/ProductList.tsx) in code. `entity/ProductCard` has `feature/AddToWishlist` and get it in props from `widget/ProductList`. So we don't violate FSD and can use features into entity.

### Relations between entities

See below «[Entities cross imports](#Entities-cross-imports)».

### ESLint rules

Use https://www.npmjs.com/package/@feature-sliced/eslint-config

## Limitation

FSD is a great solution, but every great solution tries to find harmony between correctness and productivity (for example, [see TypeScript non goals](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals)). FSD is strict and some cases in real project can't be solved without workarounds.

### Entities cross imports

In real ~~world~~ application, entities (our domain) has a lot of relations and can't use in isolation from each other. So we can write a good domain layer without relationships.

But FSD tell us that we can't use cross imports for same layer. For example, every product has a certain category:

```ts
// 📁 entities/product/model/types.ts

// 👇 FSD disallow this import
import type { CategoryId } from 'entities/category'

type Product = {
  id: ProductId
  category: CategoryId
}
```

What can we do? We can use advanced pattern "meta-categories" (only [in RFC](https://github.com/feature-sliced/documentation/discussions/390#discussioncomment-5570073)), which allow us to create special public API for related entity.

```ts
// 📁 entities/category/@x/product

// 👇 It's a Public API for `product` entity
export type { CategoryId } from '../model/types'
```

```ts
// 📁 entities/product/model/types.ts

// 👇 Import `CategoryId` from special public API for product
import type { CategoryId } from 'entities/category/@x/product'

type Product = {
  id: ProductId
  category: CategoryId
}
```

If we need to use CategoryId in other entity, we create `@x/{entity}` and export required dependencies as well.

Advantages over plain cross imports are described in RFC, but the main of them:

- Writing such index files is a little bulky, which discourages cross-imports and encourages the search for alternative solutions that do not require cross-imports
- The list of types and objects that are shared between slices is explicit and predictable
- It reads nice in the import string like «import something from (entity product)-x-category»

You can see an example in this project in [entities/product/@x/\*](https://github.com/noveogroup-amorgunov/nukeapp/tree/main/src/entities/product/%40x)

Additionally, you can fix rule "boundaries/element-types" (feature-sliced/layers-slices) from eslint plugin @feature-sliced/eslint-config. See example in [patches/@feature-sliced+eslint-config+0.1.0-beta.6.patch](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/patches/%40feature-sliced%2Beslint-config%2B0.1.0-beta.6.patch).

### Widgets cross imports

I think you agree with me, that user interfaces are very complex nowadays. In FSD our interface is represented by `entities`, `features` and `widgets` layers. But usually we don't have enough layers to composite UI.

For example, we have widget `ProductList` which use different entities and features. At the same time we have N widgets like `{Any}ProductList` (for example `PopularProductList`) which use `ProductList`:

![](./example-cross-imports@dark.png#gh-dark-mode-only) ![](./example-cross-imports@light.png#gh-light-mode-only)

Of course, we can make dumb `ProductList` and place it on `entities/product` level and pass all data as props, but every of N widgets will duplicate each other's logic:

```ts
// 📁 widgets/PopularProductList/ui/PopularProductList.tsx

function PopularProductList() {
  return (
    <ProductList
      // 👎 A lot duplicated props in every N widget
      // which use ProductList
      cardItemSlot={...}
      actionCardItemSlot={...}
      onAddToWishlist={...}
      onAddToCart={}
      onRemoveFromCart={}
      {/* ... */}
      products={products}
    />
  )
}
```

Sometimes render-props is a very powerful pattern and it works. But in this example it's a wrong way (a lot of duplicate logic and prop-hell components). So many people introduce new layers like `page-widgets` or `entity-widgets` but it complicates architecture and module communication in general.

So I propose a pretty simple workaround: **just allow cross imports on widget layer**. Core team thinking about target solution. But now, just use cross imports in widgets.

```ts
// 📁 widgets/PopularProductList/ui/PopularProductList.tsx

function PopularProductList() {
  return (
    // 👍 We encapsulate logic for all ProductList into widget
    <ProductList products={products} />
  )
}
```

You can see example in [widgets/PopularProductList/\*](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/src/widgets/ProductPopularList/ui/ProductPopularList.tsx#L17)

It also works for layout composition problems:

![](./example-cross-imports-2@dark.png#gh-dark-mode-only) ![](./example-cross-imports-2@light.png#gh-light-mode-only)

Additionally, you can fix rule "boundaries/element-types" (feature-sliced/layers-slices) from eslint plugin @feature-sliced/eslint-config. See example in [patches/@feature-sliced+eslint-config+0.1.0-beta.6.patch](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/patches/%40feature-sliced%2Beslint-config%2B0.1.0-beta.6.patch#L26-L29).
