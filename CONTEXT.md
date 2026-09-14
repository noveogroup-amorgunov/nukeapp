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

## Technical glossary

**DTO**:
The response type as it is defined in the OpenAPI spec; for endpoints without an adapter it doubles as the domain model. The spec is the naming authority for DTO fields.
_Avoid_: client model, response type

**Adapter**:
A function that turns a DTO into a domain type; it lives once in the entity that owns the domain type, or in the consuming slice for single-slice endpoints.
_Avoid_: mapper, transformer
