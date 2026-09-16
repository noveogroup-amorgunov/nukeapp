# Nukeapp

A ecommerce shop SPA: browsing the catalog, add to shopping cart, checkout and orders —
built with Feature-Sliced Design.

## Language

<!-- Terms are added lazily by /domain-modeling as they are resolved.
     Format per term:

**Term**:
One or two sentences defining what it IS, not what it does.
_Avoid_: synonym, alternative-name
-->

**Product**:
A good offered for sale in the catalog; the unit that Stock and Quantity refer to.
_Avoid_: item, good, position

**Cart line**:
One entry of the shopping cart: a Product together with its Quantity in the cart.
_Avoid_: cart item, position

**Quantity**:
The number of units of a single product currently in the shopping cart.
_Avoid_: count, amount, stocks

**Stock**:
The number of units of a product available for ordering.
_Avoid_: inStock, availability, quantity

**Theme**:
The color scheme of the whole app (dark or light); switched via the html data-theme attribute.
_Avoid_: variant, mode, color scheme

**User**:
A person who browses the shop and authorizes into it; identified by an active session.
_Avoid_: shopper, customer, session

**Layout**:
The skeleton surrounding every route: banner, header, content area and footer; the route content renders inside it.
_Avoid_: shell, wrapper, page frame

## Technical glossary

**DTO**:
The response type as it is defined in the OpenAPI spec; for endpoints without an adapter it doubles as the domain model. The spec is the naming authority for DTO fields.
_Avoid_: client model, response type

**Adapter**:
A function that turns a DTO into a domain type; it lives once in the entity that owns the domain type, or in the consuming slice for single-slice endpoints.
_Avoid_: mapper, transformer

**Debug mode**:
A development-only mode that visually highlights FSD slice boundaries on rendered components; enabled by the debugMode Feature flag.
_Avoid_: dev mode, fsd debug

**Feature flag**:
A boolean delivered by the backend that controls optional app behavior; locally overridable at runtime via the feature flags service.
_Avoid_: feature toggle, switch

**Infrastructure service**:
A slice in `shared/services` that provides a technical capability supporting business logic (feature flags, debug mode), not business data itself.
_Avoid_: infra, service slice, util

**Fractal sub-slice**:
A slice nested inside another slice under a `@fractal-<layer>` folder; private to its owning slice until promoted to the global layer.
_Avoid_: local widget, sub-widget, nested slice
