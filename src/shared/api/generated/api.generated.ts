import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<GetCartApiResponse, GetCartApiArg>({
      query: () => ({ url: `/cart` }),
      providesTags: ["CART_TAG"],
    }),
    updateCart: build.mutation<UpdateCartApiResponse, UpdateCartApiArg>({
      query: (queryArg) => ({
        url: `/cart`,
        method: "PATCH",
        body: queryArg.updateCartRequest,
      }),
      invalidatesTags: ["CART_TAG"],
    }),
    getPopularCategories: build.query<
      GetPopularCategoriesApiResponse,
      GetPopularCategoriesApiArg
    >({
      query: () => ({ url: `/categories/popular` }),
    }),
    getCategoryDetails: build.query<
      GetCategoryDetailsApiResponse,
      GetCategoryDetailsApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.id}`,
        params: {
          sortBy: queryArg.sortBy,
        },
      }),
    }),
    getProducts: build.query<GetProductsApiResponse, GetProductsApiArg>({
      query: (queryArg) => ({
        url: `/products`,
        params: {
          id: queryArg.id,
        },
      }),
    }),
    getPopularProducts: build.query<
      GetPopularProductsApiResponse,
      GetPopularProductsApiArg
    >({
      query: () => ({ url: `/products/popular` }),
    }),
    getProductDetails: build.query<
      GetProductDetailsApiResponse,
      GetProductDetailsApiArg
    >({
      query: (queryArg) => ({ url: `/products/${queryArg.id}` }),
    }),
    getWishlistProducts: build.query<
      GetWishlistProductsApiResponse,
      GetWishlistProductsApiArg
    >({
      query: () => ({ url: `/wishlist/products` }),
      providesTags: ["WISHLIST_TAG"],
    }),
    updateWishlistProducts: build.mutation<
      UpdateWishlistProductsApiResponse,
      UpdateWishlistProductsApiArg
    >({
      query: (queryArg) => ({
        url: `/wishlist/products`,
        method: "PATCH",
        body: queryArg.wishlistUpdateRequest,
      }),
      invalidatesTags: ["WISHLIST_TAG"],
    }),
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/login`,
        method: "POST",
        body: queryArg.loginRequest,
      }),
      invalidatesTags: ["SESSION_TAG", "WISHLIST_TAG"],
    }),
    getMe: build.query<GetMeApiResponse, GetMeApiArg>({
      query: () => ({ url: `/me` }),
      providesTags: ["USER_TAG"],
    }),
    getFeatureToggle: build.query<
      GetFeatureToggleApiResponse,
      GetFeatureToggleApiArg
    >({
      query: (queryArg) => ({
        url: `/feature-toggle`,
        params: {
          darkMode: queryArg.darkMode,
          productsSort: queryArg.productsSort,
        },
      }),
    }),
    getAdOffer: build.query<GetAdOfferApiResponse, GetAdOfferApiArg>({
      query: () => ({ url: `/ad/offer` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
export type GetCartApiResponse =
  /** status 200 Cart of the current user */ Cart;
export type GetCartApiArg = void;
export type UpdateCartApiResponse = /** status 200 Cart updated */ EmptyObject;
export type UpdateCartApiArg = {
  updateCartRequest: UpdateCartRequest;
};
export type GetPopularCategoriesApiResponse =
  /** status 200 Popular categories */ Category[];
export type GetPopularCategoriesApiArg = void;
export type GetCategoryDetailsApiResponse =
  /** status 200 Category with products */ CategoryWithProducts;
export type GetCategoryDetailsApiArg = {
  id: Id;
  sortBy?: SortBy;
};
export type GetProductsApiResponse = /** status 200 Products list */ Product[];
export type GetProductsApiArg = {
  /** Repeatable parameter: ?id=1&id=2 */
  id?: Id[];
};
export type GetPopularProductsApiResponse =
  /** status 200 Popular products */ Product[];
export type GetPopularProductsApiArg = void;
export type GetProductDetailsApiResponse =
  /** status 200 Product details */ ProductDetails;
export type GetProductDetailsApiArg = {
  id: Id;
};
export type GetWishlistProductsApiResponse =
  /** status 200 Wishlist products */ Product[];
export type GetWishlistProductsApiArg = void;
export type UpdateWishlistProductsApiResponse =
  /** status 200 Wishlist updated */ EmptyObject;
export type UpdateWishlistProductsApiArg = {
  wishlistUpdateRequest: WishlistUpdateRequest;
};
export type LoginApiResponse =
  /** status 200 Session of the authenticated user */ Session;
export type LoginApiArg = {
  loginRequest: LoginRequest;
};
export type GetMeApiResponse = /** status 200 Current user */ User;
export type GetMeApiArg = void;
export type GetFeatureToggleApiResponse =
  /** status 200 Feature toggles */ FeatureToggle;
export type GetFeatureToggleApiArg = {
  darkMode?: BooleanAsString;
  productsSort?: BooleanAsString;
};
export type GetAdOfferApiResponse = /** status 200 Ad offer */ AdOffer;
export type GetAdOfferApiArg = void;
export type Id = number;
export type Penny = number;
export type Product = {
  id: Id;
  /** Number of units available for ordering */
  stock: number;
  name: string;
  badge: string;
  subtitle: string;
  price: Penny;
  discountPrice?: Penny;
  imageUrl: string[];
};
export type Cart = {
  cartItems: {
    product: Product;
    quantity: number;
  }[];
  deliveryPrice: Penny;
  version: number;
};
export type EmptyObject = object;
export type UpdateCartRequest = {
  items: {
    productId: Id;
    quantity: number;
  }[];
  version: number;
};
export type Category = {
  id: Id;
  name: string;
  imageUrl: string[];
};
export type CategoryWithProducts = Category & {
  products: Product[];
};
export type SortBy = "Featured" | "Newest" | "PriceHighLow" | "PriceLowHigh";
export type ProductDetails = Product & {
  detailsImageUrl: string[];
  description: string;
};
export type WishlistUpdateRequest = Id[];
export type Session = {
  accessToken: string;
  user: {
    id: Id;
    email: string;
  };
};
export type LoginRequest = {
  email: string;
  password: string;
};
export type User = {
  id: Id;
  email: string;
};
export type FeatureToggle = {
  darkMode: boolean;
  productsSort: boolean;
};
export type BooleanAsString = "true" | "false";
export type AdOffer = {
  id: string;
  text: string;
  image: string;
  link: string;
};
export const {
  useGetCartQuery,
  useUpdateCartMutation,
  useGetPopularCategoriesQuery,
  useGetCategoryDetailsQuery,
  useGetProductsQuery,
  useGetPopularProductsQuery,
  useGetProductDetailsQuery,
  useGetWishlistProductsQuery,
  useUpdateWishlistProductsMutation,
  useLoginMutation,
  useGetMeQuery,
  useGetFeatureToggleQuery,
  useGetAdOfferQuery,
} = injectedRtkApi;
