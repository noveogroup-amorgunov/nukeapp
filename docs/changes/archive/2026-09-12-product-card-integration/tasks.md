# Tasks

Execution checklist (state resumes from the first unchecked item).
Each task is a tracer-bullet slice, verified by the automated gates and the
page behavior listed in `product.md`. Spec: `product.md` + `technical.md`
in this directory.

## 01. Cart page: CartProductListV2

Page owns mapping (CartItem → CartLineView), thunk dispatch via a
productId→Product Map, navigation and the actions slot.
Blocked by: none.

- [x] Page-local CartItem → CartLineView mapper in the cart page slice
- [x] CartProductListV2 replaces legacy CartProductList: onIncrease/onDecrease
      dispatch thunks, onProductClick navigates, actions slot composes
      wishlist icon + RemoveIcon
- [x] Empty/unauthorized cart screens unchanged; page renders the list only
      with data

## 02. ProductGrid: actions render-prop

Blocked by: none.

- [x] `actions?: (product: ProductCompactView) => ReactNode` forwarded to
      ProductCardV2's actionSlot; story covers the slot; registry mapping
      updated for the new prop

## 03. Catalog/main/wishlist grids

Page-local Product → ProductCompactView mapper (shared per-page-slice
pattern), quantity badge from cart selectors, navigation on click.
Blocked by: 02.

- [x] Category page renders ProductGrid (auto columns) with quantity badge
      and click-to-product; page-level fetching/empty kept
- [x] Main "Featured products" section renders ProductGrid (auto columns)
- [x] Wishlist page renders ProductGrid with actions = wishlist toggle icon;
      login/empty states unchanged

## 04. Product details: AddToCartButtonV2 + Price

Blocked by: none.

- [x] Price line is a Price instance (old price struck-through) + page-level
      "Only 1 left" badge; control hidden when Stock = 0
- [x] AddToCartButtonV2 (Size L) wired: quantity/maxQuantityIsReached from
      cart selectors; anonymous → login confirm modal + returnUrl; authorized
      → thunks + "was added to bag" alert with "View bag (n)"

## 05. Header: LogoV2

Blocked by: none.

- [x] Layout widget renders LogoV2 wrapped in Link to "/"; CSS-drawn logo
      widget removed

## 06. Legacy removal

Blocked by: 01, 03, 04, 05.

- [x] widgets/BaseProductList deleted (incl. stories)
- [x] entities ProductCard + ProductAvailability deleted (incl. ProductCard
      story); entity barrel pruned
- [x] features/cart AddToCartButton deleted; feature barrel keeps RemoveIcon
      and thunks
- [x] Gates green: tsc, eslint, steiger, dependency-cruiser
- [x] Integration commit: `feat: adopt product card V2 components in app code`

## 07. Rename commit: drop V2 suffixes

Blocked by: 06.

- [x] ProductCardV2 → ProductCard, CartProductListV2 → CartProductList,
      CartProductCardV2 → CartProductCard, AddToCartButtonV2 →
      AddToCartButton, LogoV2 → Logo: directories, names, stories, barrels,
      all internal usages
- [x] .design-system/figma-registry.yml and *.figma.yml mappings updated
      (node ids and figmaName unchanged)
- [x] Gates green; commit: `refactor: drop V2 suffixes from synced uikit
components`
