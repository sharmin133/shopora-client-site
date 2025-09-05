import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Auth API slice
export const authApi = createApi({
  reducerPath: "authApi", // unique key
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }), // base URL
  endpoints: (builder) => ({

    // Login mutation
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Register mutation
    register: builder.mutation({
      query: (user) => ({
        url: "/api/auth/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

// Export hooks
export const { useLoginMutation, useRegisterMutation } = authApi;
