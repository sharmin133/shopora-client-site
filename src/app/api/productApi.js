import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Product API slice
export const productApi = createApi({
  reducerPath: "productApi", // unique key
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }), // base URL
  tagTypes: ["Products"], // cache tag
  endpoints: (builder) => ({

    // Get all products
    getProducts: builder.query({
      query: (token) => ({
        url: "/products",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["Products"],
    }),

    // Add product
    addProduct: builder.mutation({
      query: ({ product, token }) => ({
        url: "/products",
        method: "POST",
        body: product,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Products"],
    }),

    // Get single product by id
    getProductById: builder.query({
      query: ({ id, token }) => ({
        url: `/products/${id}`,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
      providesTags: (result, error, arg) => [{ type: "Products", id: arg.id }],
    }),

    // Get products of logged-in user
    getMyProducts: builder.query({
      query: (token) => ({
        url: "/products/my-products",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["Products"],
    }),
  }),
});

// Export hooks
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useGetProductByIdQuery, 
  useGetMyProductsQuery,
} = productApi;
