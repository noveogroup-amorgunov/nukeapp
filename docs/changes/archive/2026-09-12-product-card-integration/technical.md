# Technical design

Pattern: pages compose; shared/ui renders. Mirrors the sibling-project
conventions (frontend-lite): pages own redux, routing, modals, loading/empty
branching and view-model mapping; shared/ui components receive view models +
`onXxx` callbacks only. No new test seams — the Storybook stories of the V2
components remain the executable spec for visuals; integration is verified by
the automated gates and page behavior.

## Composition decisions (grilling, this change)

- **ProductGrid gains an `actions` render-prop**: `actions?: (product:
ProductCompactView) => ReactNode`, forwarded per card to `ProductCardV2`'s
  existing `actionSlot`. Same seam as `CartProductListV2`'s `actions` — one
  place per list to attach per-card business behavior. Registry mapping
  updated accordingly (the Figma component itself is unchanged).
- **Loading/empty ownership stays at pages.** No loading/empty branches are
  added to `ProductGrid`/`CartProductListV2`; pages keep their current
  "Fetching..."/login/empty screens and render the lists only with data.
- **Cart thunks keep entity-Product signatures.** The cart page builds a
  `Map<productId, Product>` from the `CartItem[]` it already holds and
  resolves ids back in `onIncrease`/`onDecrease`. (A productId-based selector
  is a possible future refactor, deliberately not now.)
- **ProductAvailability is deleted.** Product details render the price line
  as a `Price` instance and keep "Only 1 left" as a page-level badge; the
  add-to-cart control renders only when Stock > 0 (unchanged rule).

## Page wiring

- **View-model mapping is one entity-level adapter**: `mapProductToCompactView`
  lives in the product entity (entities may import shared types; the shared/ui
  component stays decoupled from the entity model). The cart page maps
  `CartItem → CartLineView` locally on top of it. (Originally considered
  per-page mappers; one shared adapter avoids four copies of the same
  field-rename.)
- **Category / main / wishlist**: `ProductGrid` with `columns="auto"`,
  `quantityByProductId` from cart selectors (quantity badge on cards),
  `onProductClick={(id) => navigate(`/product/${id}`)}`; wishlist fills
  `actions` with the wishlist toggle icon feature component.
- **Cart**: `CartProductListV2` with `lines` mapped from cart items,
  `onIncrease`/`onDecrease` dispatching the existing thunks, `onProductClick`
  navigating to the product page, `actions` = wishlist toggle icon + remove
  icon (remove keeps its confirm modal — it is a feature-level component and
  stays smart by design).
- **Product details**: `AddToCartButtonV2` size `l`; `quantity` from the cart
  selector, `maxQuantityIsReached = quantity >= stock`; page-level handlers
  reproduce the legacy behaviors: anonymous → login confirm modal + navigate
  with `returnUrl`, authorized → add/remove thunk + "was added to bag" alert
  modal ("View bag (n)") on increase; decrease dispatches the remove thunk.
- **Header**: the Layout widget wraps `LogoV2` in `Link to="/"`, replacing
  the hand-drawn CSS logo widget.

## Legacy removal (after all usages are replaced)

- `widgets/BaseProductList` (incl. its stories).
- `entities/product/ui/ProductCard` (incl. its stories) and
  `entities/product/ui/ProductAvailability`; entity barrel exports pruned.
- `features/cart/addToCart/ui/AddToCartButton` (feature barrel keeps
  `RemoveIcon`; thunks untouched).
- `widgets/Layout/ui/Logo`.
- `data-fsd` markers of deleted components go with them.

## Rename commit (separate, after the integration commit)

Drop the transitional `V2` suffixes so production names equal Figma names
(ADR-0002: registry `component`/`import`/`mapping` must resolve unambiguously):

| Current             | New                                                |
| ------------------- | -------------------------------------------------- |
| `ProductCardV2`     | `ProductCard`                                      |
| `CartProductListV2` | `CartProductList`                                  |
| `CartProductCardV2` | `CartProductCard` (internal, stays off the barrel) |
| `AddToCartButtonV2` | `AddToCartButton`                                  |
| `LogoV2`            | `Logo`                                             |

Scope: directories, component names, stories, barrel exports, all internal
usages (`ProductGrid` → card import, `CartProductCardV2` → stepper import),
`.design-system/figma-registry.yml` (`component`, `import`, `mapping` paths)
and colocated `*.figma.yml` filenames/references. Figma node ids and
`figmaName` values are unchanged. Conventional commits: integration as
`feat:`, rename as `refactor:`.

## Testing decisions

- No new seams: dumb components are already covered by variant-enumerating
  stories (verified visually against Figma during the sync change); pages are
  composition only.
- Automated gates stay green: typecheck, eslint, steiger (FSD boundaries),
  dependency-cruiser (shared must not import entities/features).
- Manual check per page: category, main, wishlist (incl. login/empty), cart
  (incl. stepper limits, remove confirm, navigation), product details (incl.
  login modal, alert modal, out-of-stock), header logo navigation.

## Out of scope

- Checkout flow and `CartSummary` visuals (still legacy, untouched).
- Category loading spinner redesign (page keeps "Loading..."/"Fetching...").
- Cart thunk signature refactor to productId-based actions.
- Dark-theme values, button spinner and radius tokens (existing `.scratch`
  ideas), wishlist button on details page redesign.
- Any Figma-side changes: this change only consumes the synced components.
