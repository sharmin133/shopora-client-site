import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create API slice for orders
export const orderApi = createApi({
  reducerPath: "orderApi", // unique name for this API
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }), // base API URL
  tagTypes: ["Orders"], // for cache invalidation
  endpoints: (builder) => ({

    // Create new order
    createOrder: builder.mutation({
      query: ({ order, token }) => ({
        url: "/orders",
        method: "POST",
        body: order,
        headers: { Authorization: `Bearer ${token}` }, // auth header
      }),
      invalidatesTags: ["Orders"], // refresh cache
    }),

    // Get all orders (admin)
    getOrders: builder.query({
      query: (token) => ({
        url: "/orders",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["Orders"],
    }),

    // Get logged-in user's orders
    getMyOrders: builder.query({
      query: (token) => ({
        url: "/orders/my-orders",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["Orders"],
    }),
  }),
});

// Export hooks for components
export const { useCreateOrderMutation, useGetOrdersQuery, useGetMyOrdersQuery } = orderApi;
