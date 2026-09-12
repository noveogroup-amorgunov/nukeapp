import { delay, http, HttpResponse } from 'msw'
import type { ZodType } from 'zod'
import { z } from 'zod'
import { env, parseTokenFromRequest, signAccessToken, verifyAccessToken } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'
import type {
  Cart,
  CategoryWithProducts,
  FeatureToggle,
  Product,
  UpdateCartRequest,
} from './generated/api.generated'

type ProductDto = Product
type CartDto = Cart
type CategoryWithProductsDto = CategoryWithProducts

// ── Helpers ────────────────────────────────────────────────────────────

/**
 * Emulate sortBy product's feature
 */
const productSortByCompareFunctionMap: Record<
  string,
  (productA: { price: number }, productB: { price: number }) => number
> = {
  Featured: () => 1,
  Newest: () => -1,
  PriceHighLow: (pA, pB) => pB.price - pA.price,
  PriceLowHigh: (pA, pB) => pA.price - pB.price,
} as const

const featureSchema = z
  .enum(['false', 'true'])
  .transform(value => value === 'true')
  .optional()

/**
 * Use enum+transform validation,
 * coz can't use coerce.boolean for string
 * @see https://github.com/colinhacks/zod/issues/1630
 */
const featureToggleQuerySchema: ZodType<{
  productsSort?: boolean
  darkMode?: boolean
}> = z.object({
  productsSort: featureSchema,
  darkMode: featureSchema,
})

function mockFeatureToggleDto(
  fromQuery: Partial<FeatureToggle>,
): FeatureToggle {
  return {
    productsSort: fromQuery.productsSort ?? true,
    darkMode: fromQuery.darkMode ?? true,
  }
}

// TODO: infer type from database
type CartDatabaseModal = {
  version: number
  itemsProductId: number[]
  itemsProductQuantity: number[]
}

function mockCartDto(
  cart: CartDatabaseModal,
  products: ProductDto[],
): CartDto {
  return {
    deliveryPrice: 0,
    version: cart.version,
    cartItems: cart.itemsProductId
      .map((productId, index) => ({
        product: products.find(product => product.id === productId),
        quantity: cart.itemsProductQuantity[index],
      }))
      .filter(item => Boolean(item.product)) as CartDto['cartItems'],
  }
}

/**
 * Route order matters: MSW matches the first fitting handler, so specific
 * paths (`/products/popular`) must be registered before parameterized ones
 * (`/products/:id`).
 */
export const apiMockHandlers = [
  // ── Ad ────────────────────────────────────────────────────────────────

  http.get(`${env.VITE_API_ENDPOINT}/ad/offer`, async () => {
    // example ad offer for my another project
    const adOffer = {
      id: '2RanymhtqkD',
      text: 'Feature-Sliced Design architecture lessons. See a lot of examples in the github repository. Click now!',
      image: '/images/ad-demo-banner.jpg',
      link: 'https://github.com/noveogroup-amorgunov/fsd-lessons',
    }

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(
      adOffer,
      { status: 200 },
    )
  }),

  // ── Cart ──────────────────────────────────────────────────────────────

  http.get(`${env.VITE_API_ENDPOINT}/cart`, async ({ request }) => {
    try {
      const { userId } = await verifyAccessToken(parseTokenFromRequest(request))

      const maybeCart = __serverDatabase.cart.findFirst(q =>
        q.where({ user: { id: userId } }),
      )

      if (!maybeCart) {
        return HttpResponse.json('Bad request', { status: 400 })
      }

      const productIds = maybeCart.itemsProductId
      const products = __serverDatabase.product.findMany(q =>
        q.where({ id: id => productIds.includes(id) }),
      )

      await delay(env.VITE_API_DELAY)

      return HttpResponse.json(mockCartDto(maybeCart, products), { status: 200 })
    }
    catch {
      return HttpResponse.json('Forbidden', { status: 403 })
    }
  }),

  http.patch<object, { version: number, items: UpdateCartRequest['items'] }>(`${env.VITE_API_ENDPOINT}/cart`, async ({ request }) => {
    try {
      const { userId } = await verifyAccessToken(parseTokenFromRequest(request))
      const body = await request.json()

      await __serverDatabase.cart.update(
        q => q.where({ user: { id: userId } }),
        {
          data(cart) {
            cart.version = body.version
            cart.itemsProductQuantity = body.items.map(
              (item: UpdateCartRequest['items'][number]) => item.quantity,
            )
            cart.itemsProductId = body.items.map(
              (item: UpdateCartRequest['items'][number]) => item.productId,
            )
          },
        },
      )

      await delay(env.VITE_API_DELAY)

      return HttpResponse.json({}, { status: 200 })
    }
    catch {
      return HttpResponse.json('Forbidden', { status: 403 })
    }
  }),

  // ── Categories ────────────────────────────────────────────────────────

  http.get(`${env.VITE_API_ENDPOINT}/categories/popular`, async () => {
    const categories = __serverDatabase.category.findMany(q =>
      q.where({ popular: true }),
    )

    await delay(env.VITE_API_DELAY)

    return HttpResponse.json(categories, { status: 200 })
  }),

  http.get(`${env.VITE_API_ENDPOINT}/categories/:id`, async ({ request, params }) => {
    const { id } = params
    const url = new URL(request.url)
    const sortBy = url.searchParams.get('sortBy')

    const maybeCategory = __serverDatabase.category.findFirst(q =>
      q.where({ id: Number(id) }),
    )

    if (!maybeCategory) {
      await delay(env.VITE_API_DELAY)
      return HttpResponse.json('Not found', { status: 404 })
    }

    const categoryDto: CategoryWithProductsDto = {
      ...maybeCategory,
      products: [],
    }

    categoryDto.products = __serverDatabase.product.findMany(q =>
      q.where({ categoryId: maybeCategory.id }),
    )

    if (sortBy) {
      categoryDto.products = categoryDto.products.sort(
        productSortByCompareFunctionMap[sortBy],
      )
    }

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(categoryDto, { status: 200 })
  }),

  // ── Feature toggle ────────────────────────────────────────────────────

  http.get(`${env.VITE_API_ENDPOINT}/feature-toggle`, async ({ request }) => {
    try {
      const url = new URL(request.url)
      const params = Object.fromEntries(url.searchParams.entries())
      // silent validation
      const query = featureToggleQuerySchema.safeParse(params)

      await delay(env.VITE_API_DELAY)
      return HttpResponse.json(mockFeatureToggleDto(query.success ? query.data : {}), { status: 200 })
    }
    catch (error) {
      console.error(error)

      await delay(env.VITE_API_DELAY)
      return HttpResponse.json('Bad request params', { status: 400 })
    }
  }),

  // ── Products (specific paths before `/products/:id`) ──────────────────

  http.get(`${env.VITE_API_ENDPOINT}/products/popular`, async () => {
    const products = __serverDatabase.product.findMany(q =>
      q.where({ popular: true }),
    )

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(
      products,
      { status: 200 },
    )
  }),

  http.get(`${env.VITE_API_ENDPOINT}/products`, async ({ request }) => {
    const url = new URL(request.url)
    const productIds = url.searchParams.getAll('id').map(Number)
    const products = __serverDatabase.product.findMany(q =>
      q.where({ id: id => productIds.includes(id) }),
    )

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(products, { status: 200 })
  }),

  http.get(`${env.VITE_API_ENDPOINT}/products/:id`, async ({ params }) => {
    const { id } = params

    const maybeProduct = __serverDatabase.product.findFirst(q =>
      q.where({ id: Number(id) }),
    )

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(
      maybeProduct ?? 'Not found',
      { status: maybeProduct ? 200 : 404 },
    )
  }),

  // ── Session ───────────────────────────────────────────────────────────

  http.post<object, { email: string, password: string }>(`${env.VITE_API_ENDPOINT}/login`, async ({ request }) => {
    const body = await request.json()
    const { email, password } = body

    const maybeUser = __serverDatabase.user.findFirst(q =>
      q.where({ email, password }),
    )

    if (!maybeUser) {
      await delay(env.VITE_API_DELAY)
      return HttpResponse.json('Wrong email or password', { status: 400 })
    }

    const accessToken = await signAccessToken({
      userId: maybeUser.id,
      email,
    })

    const responseData = {
      accessToken,
      user: {
        email,
        id: maybeUser.id,
      },
    }

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(responseData, { status: 200 })
  }),

  // ── User ──────────────────────────────────────────────────────────────

  http.get(`${env.VITE_API_ENDPOINT}/me`, async ({ request }) => {
    try {
      const payload = await verifyAccessToken(parseTokenFromRequest(request))

      await delay(env.VITE_API_DELAY)
      return HttpResponse.json(
        {
          id: payload.userId,
          email: payload.email,
        },
        { status: 200 },
      )
    }
    catch {
      await delay(env.VITE_API_DELAY)
      return HttpResponse.json('Token is expired or not valid', { status: 401 },
      )
    }
  }),

  // ── Wishlist ──────────────────────────────────────────────────────────

  http.get(
    `${env.VITE_API_ENDPOINT}/wishlist/products`,
    async ({ request }) => {
      try {
        const { userId } = await verifyAccessToken(parseTokenFromRequest(request))

        const maybeWishlist = __serverDatabase.wishlist.findFirst(q =>
          q.where({ user: { id: userId } }),
        )

        const wishlistProductIds = maybeWishlist?.productIds ?? []
        const products = __serverDatabase.product.findMany(q =>
          q.where({ id: id => wishlistProductIds.includes(id) }),
        )

        await delay(env.VITE_API_DELAY)
        return HttpResponse.json(products, { status: 200 })
      }
      catch {
        await delay(env.VITE_API_DELAY)
        return HttpResponse.json('Forbidden', { status: 403 })
      }
    },
  ),

  http.patch<object, number[]>(
    `${env.VITE_API_ENDPOINT}/wishlist/products`,
    async ({ request }) => {
      try {
        const { userId } = await verifyAccessToken(parseTokenFromRequest(request))
        const body = await request.json()

        await __serverDatabase.wishlist.update(
          q => q.where({ user: { id: userId } }),
          {
            data(wishlist) {
              wishlist.productIds = body
            },
          },
        )

        await delay(env.VITE_API_DELAY)
        return HttpResponse.json({}, { status: 200 })
      }
      catch {
        await delay(env.VITE_API_DELAY)
        return HttpResponse.json('Forbidden', { status: 403 })
      }
    },
  ),
]
