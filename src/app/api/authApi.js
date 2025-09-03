// src/app/api/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: "/api/auth/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
