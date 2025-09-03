import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (token) => ({
        url: "/products",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: ({ product, token }) => ({
        url: "/products",
        method: "POST",
        body: product,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Products"],
    }),
    // ✅ নতুন endpoint: get single product by id
    getProductById: builder.query({
      query: ({ id, token }) => ({
        url: `/products/${id}`,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
      providesTags: (result, error, arg) => [{ type: "Products", id: arg.id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useGetProductByIdQuery, // <-- Export করতে হবে
} = productApi;
